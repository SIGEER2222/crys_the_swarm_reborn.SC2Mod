param(
    [string]$WorkspaceRoot = (Split-Path -Parent $PSScriptRoot),
    [string]$ScenarioRoot = "",
    [string]$LiveRoot = "E:\SC2\SC2new\StarCraft II",
    [string]$Sc2SwitcherPath = "",
    [string]$LauncherMapPath = "",
    [string]$OutputRoot = "",
    [int]$LoadWaitSec = 55,
    [int]$PostOfflineWaitSec = 20,
    [switch]$SkipSync,
    [switch]$DismissOfflinePrompt,
    [switch]$KeepOpen
)

$ErrorActionPreference = "Stop"

Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing
Add-Type @"
using System;
using System.Runtime.InteropServices;
public static class XmUi {
  [StructLayout(LayoutKind.Sequential)]
  public struct RECT { public int Left; public int Top; public int Right; public int Bottom; }
  [DllImport("user32.dll")] public static extern bool ShowWindowAsync(IntPtr hWnd, int nCmdShow);
  [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr hWnd);
  [DllImport("user32.dll")] public static extern bool BringWindowToTop(IntPtr hWnd);
  [DllImport("user32.dll")] public static extern bool GetWindowRect(IntPtr hWnd, out RECT rect);
  [DllImport("user32.dll")] public static extern bool SetCursorPos(int X, int Y);
  [DllImport("user32.dll")] public static extern void mouse_event(uint dwFlags, uint dx, uint dy, uint dwData, UIntPtr dwExtraInfo);
  public const uint LEFTDOWN = 0x0002;
  public const uint LEFTUP = 0x0004;
}
"@

function Resolve-ScenarioRoot {
    param(
        [string]$Root,
        [string]$Preferred
    )

    if (-not [string]::IsNullOrWhiteSpace($Preferred)) {
        $full = [System.IO.Path]::GetFullPath($Preferred)
        if (Test-Path -LiteralPath (Join-Path $full "Mods\XM\XMFinal.SC2Mod")) {
            return $full
        }
        throw "Scenario root not found or missing XMFinal.SC2Mod: $Preferred"
    }

    $preferredName = -join ([char[]](0x539F, 0x59CB, 0x6D, 0x6F, 0x64))
    $default = Join-Path $Root $preferredName
    if (Test-Path -LiteralPath (Join-Path $default "Mods\XM\XMFinal.SC2Mod")) {
        return $default
    }

    throw "Could not locate the preferred scenario root under '$Root'."
}

function Ensure-Directory {
    param([string]$Path)

    if (-not (Test-Path -LiteralPath $Path)) {
        New-Item -ItemType Directory -Force -Path $Path | Out-Null
    }
}

function Stop-Sc2 {
    Stop-Process -Name "SC2_x64" -Force -ErrorAction SilentlyContinue
    Stop-Process -Name "SC2Switcher_x64" -Force -ErrorAction SilentlyContinue
    Start-Sleep -Seconds 2
}

function Get-Sc2WindowProcess {
    $candidates = @(
        Get-Process -Name "SC2_x64" -ErrorAction SilentlyContinue
        Get-Process -Name "SC2Switcher_x64" -ErrorAction SilentlyContinue
    ) | Where-Object { $_ -and $_.MainWindowHandle -ne 0 }

    return $candidates | Select-Object -First 1
}

function Wait-Sc2Window {
    param([int]$TimeoutSec = 120)

    $deadline = (Get-Date).AddSeconds($TimeoutSec)
    do {
        $proc = Get-Sc2WindowProcess
        if ($proc) {
            $rect = New-Object XmUi+RECT
            if ([XmUi]::GetWindowRect([IntPtr]$proc.MainWindowHandle, [ref]$rect)) {
                $width = $rect.Right - $rect.Left
                $height = $rect.Bottom - $rect.Top
                if ($width -ge 1000 -and $height -ge 700) {
                    return $proc
                }
            }
        }
        Start-Sleep -Seconds 1
    } while ((Get-Date) -lt $deadline)

    throw "SC2 window did not become ready within $TimeoutSec seconds."
}

function Focus-Window {
    param([System.Diagnostics.Process]$Process)

    $hwnd = [IntPtr]$Process.MainWindowHandle
    [XmUi]::ShowWindowAsync($hwnd, 9) | Out-Null
    Start-Sleep -Milliseconds 200
    [XmUi]::BringWindowToTop($hwnd) | Out-Null
    [XmUi]::SetForegroundWindow($hwnd) | Out-Null
    Start-Sleep -Milliseconds 500
}

function Save-Screenshot {
    param(
        [string]$Name,
        [System.Diagnostics.Process]$Process
    )

    $path = Join-Path $OutputRoot ("{0}_{1}.png" -f $Name, (Get-Date -Format "yyyyMMdd-HHmmss"))
    $rect = New-Object XmUi+RECT
    $hasRect = $false

    if ($Process -and $Process.MainWindowHandle -ne 0) {
        $hasRect = [XmUi]::GetWindowRect([IntPtr]$Process.MainWindowHandle, [ref]$rect)
    }

    if ($hasRect) {
        $width = [Math]::Max(1, $rect.Right - $rect.Left)
        $height = [Math]::Max(1, $rect.Bottom - $rect.Top)
        $sourcePoint = [System.Drawing.Point]::new($rect.Left, $rect.Top)
        $size = [System.Drawing.Size]::new($width, $height)
    }
    else {
        $bounds = [System.Windows.Forms.Screen]::PrimaryScreen.Bounds
        $width = $bounds.Width
        $height = $bounds.Height
        $sourcePoint = $bounds.Location
        $size = $bounds.Size
    }

    $bmp = New-Object System.Drawing.Bitmap $width, $height
    $graphics = [System.Drawing.Graphics]::FromImage($bmp)
    try {
        $graphics.CopyFromScreen($sourcePoint, [System.Drawing.Point]::Empty, $size)
        $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
    }
    finally {
        $graphics.Dispose()
        $bmp.Dispose()
    }

    return $path
}

function Click-WindowRatio {
    param(
        [System.Diagnostics.Process]$Process,
        [double]$XRatio,
        [double]$YRatio
    )

    $rect = New-Object XmUi+RECT
    if (-not [XmUi]::GetWindowRect([IntPtr]$Process.MainWindowHandle, [ref]$rect)) {
        throw "Could not read SC2 window bounds for offline prompt dismissal."
    }

    $width = $rect.Right - $rect.Left
    $height = $rect.Bottom - $rect.Top
    $x = [int]($rect.Left + ($width * $XRatio))
    $y = [int]($rect.Top + ($height * $YRatio))

    [XmUi]::SetCursorPos($x, $y) | Out-Null
    Start-Sleep -Milliseconds 80
    [XmUi]::mouse_event([XmUi]::LEFTDOWN, 0, 0, 0, [UIntPtr]::Zero)
    Start-Sleep -Milliseconds 40
    [XmUi]::mouse_event([XmUi]::LEFTUP, 0, 0, 0, [UIntPtr]::Zero)
}

$scenarioRootResolved = Resolve-ScenarioRoot -Root $WorkspaceRoot -Preferred $ScenarioRoot

if ([string]::IsNullOrWhiteSpace($Sc2SwitcherPath)) {
    $Sc2SwitcherPath = Join-Path $LiveRoot "Support64\SC2Switcher_x64.exe"
}
if ([string]::IsNullOrWhiteSpace($LauncherMapPath)) {
    $LauncherMapPath = Join-Path $LiveRoot "Maps\XM\Launcher.SC2Map"
}
if ([string]::IsNullOrWhiteSpace($OutputRoot)) {
    $OutputRoot = Join-Path $WorkspaceRoot "tmp\live-launch-originalmod-testbench"
}

Ensure-Directory -Path $OutputRoot

if (-not (Test-Path -LiteralPath $Sc2SwitcherPath)) {
    throw "SC2Switcher not found: $Sc2SwitcherPath"
}

if (-not $SkipSync) {
    & (Join-Path $PSScriptRoot "deploy-originalmod-testbench.ps1") `
        -WorkspaceRoot $WorkspaceRoot `
        -ScenarioRoot $scenarioRootResolved `
        -LiveRoot $LiveRoot

    & (Join-Path $PSScriptRoot "sync-all-to-live.ps1") `
        -WorkspaceRoot $WorkspaceRoot `
        -ScenarioRoot $scenarioRootResolved `
        -LiveRoot $LiveRoot `
        -SkipMods `
        -SkipMaps `
        -ReplacePackedLauncher
}

if (-not (Test-Path -LiteralPath $LauncherMapPath)) {
    throw "Launcher map not found after sync: $LauncherMapPath"
}

$liveTestBenchMap = Join-Path $LiveRoot "Maps\XM\CommanderTestBench.SC2Map"
if (-not (Test-Path -LiteralPath $liveTestBenchMap)) {
    throw "CommanderTestBench map not found after sync: $liveTestBenchMap"
}

Stop-Sc2

$launchProcess = Start-Process -FilePath $Sc2SwitcherPath -ArgumentList @($LauncherMapPath) -PassThru
Start-Sleep -Seconds 2

$sc2Process = Wait-Sc2Window -TimeoutSec 120
Focus-Window -Process $sc2Process
Start-Sleep -Seconds $LoadWaitSec

$entryScreenshot = Save-Screenshot -Name "launcher_entry" -Process $sc2Process
$postOfflineScreenshot = ""

if ($DismissOfflinePrompt) {
    Click-WindowRatio -Process $sc2Process -XRatio 0.43 -YRatio 0.67
    Start-Sleep -Seconds $PostOfflineWaitSec
    $postOfflineScreenshot = Save-Screenshot -Name "launcher_after_offline" -Process $sc2Process
}

Write-Output "SCENARIO_ROOT=$scenarioRootResolved"
Write-Output "LIVE_ROOT=$LiveRoot"
Write-Output "LIVE_LAUNCHER_MAP=$LauncherMapPath"
Write-Output "LIVE_TESTBENCH_MAP=$liveTestBenchMap"
Write-Output "LAUNCH_PROCESS_ID=$($launchProcess.Id)"
Write-Output "SC2_WINDOW_PROCESS=$($sc2Process.ProcessName)"
Write-Output "ENTRY_SCREENSHOT=$entryScreenshot"
Write-Output "POST_OFFLINE_SCREENSHOT=$postOfflineScreenshot"
Write-Output "LOAD_WAIT_SEC=$LoadWaitSec"
Write-Output "POST_OFFLINE_WAIT_SEC=$PostOfflineWaitSec"
Write-Output "VERIFICATION_READY=1"

if (-not $KeepOpen) {
    Stop-Sc2
    Write-Output "SC2_CLOSED=1"
}
