param(
    [string]$WorkspaceRoot = (Split-Path -Parent $PSScriptRoot),
    [string]$ScenarioRoot = "",
    [string]$LiveRoot = "E:\SC2\SC2new\StarCraft II",
    [string]$Sc2SwitcherPath = "",
    [string]$MapPath = "",
    [string]$OutputRoot = "",
    [int]$LoadWaitSec = 40,
    [switch]$SkipSync,
    [switch]$KeepOpen
)

$ErrorActionPreference = "Stop"

Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing
Add-Type @"
using System;
using System.Runtime.InteropServices;
public static class XmUiDirect {
  [StructLayout(LayoutKind.Sequential)]
  public struct RECT { public int Left; public int Top; public int Right; public int Bottom; }
  [DllImport("user32.dll")] public static extern bool ShowWindowAsync(IntPtr hWnd, int nCmdShow);
  [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr hWnd);
  [DllImport("user32.dll")] public static extern bool BringWindowToTop(IntPtr hWnd);
  [DllImport("user32.dll")] public static extern bool GetWindowRect(IntPtr hWnd, out RECT rect);
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

function Get-Sc2Process {
    Get-Process -Name "SC2_x64" -ErrorAction SilentlyContinue | Select-Object -First 1
}

function Wait-Sc2Window {
    param([int]$TimeoutSec = 120)

    $deadline = (Get-Date).AddSeconds($TimeoutSec)
    do {
        $proc = Get-Sc2Process
        if ($proc) {
            if ($proc.MainWindowHandle -ne 0) {
                $rect = New-Object XmUiDirect+RECT
                if ([XmUiDirect]::GetWindowRect([IntPtr]$proc.MainWindowHandle, [ref]$rect)) {
                    $width = $rect.Right - $rect.Left
                    $height = $rect.Bottom - $rect.Top
                    if ($width -ge 1000 -and $height -ge 700) {
                        return $proc
                    }
                }
            }
            else {
                return $proc
            }
        }
        Start-Sleep -Seconds 1
    } while ((Get-Date) -lt $deadline)

    throw "SC2 window did not become ready within $TimeoutSec seconds."
}

function Focus-Window {
    param([System.Diagnostics.Process]$Process)

    $hwnd = [IntPtr]$Process.MainWindowHandle
    [XmUiDirect]::ShowWindowAsync($hwnd, 9) | Out-Null
    Start-Sleep -Milliseconds 200
    [XmUiDirect]::BringWindowToTop($hwnd) | Out-Null
    [XmUiDirect]::SetForegroundWindow($hwnd) | Out-Null
    Start-Sleep -Milliseconds 500
}

function Save-Screenshot {
    param(
        [string]$Name,
        [System.Diagnostics.Process]$Process
    )

    $path = Join-Path $OutputRoot ("{0}_{1}.png" -f $Name, (Get-Date -Format "yyyyMMdd-HHmmss"))
    $rect = New-Object XmUiDirect+RECT
    $hasRect = $false

    if ($Process -and $Process.MainWindowHandle -ne 0) {
        $hasRect = [XmUiDirect]::GetWindowRect([IntPtr]$Process.MainWindowHandle, [ref]$rect)
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
    catch {
        return ""
    }
    finally {
        $graphics.Dispose()
        $bmp.Dispose()
    }

    return $path
}

function Get-LatestLogFiles {
    param(
        [datetime]$Since,
        [string]$Filter = "*"
    )

    if (-not (Test-Path -LiteralPath $script:GameLogsRoot)) {
        return @()
    }

    return @(Get-ChildItem -LiteralPath $script:GameLogsRoot -File -Filter $Filter |
        Where-Object { $_.LastWriteTime -ge $Since.AddSeconds(-2) } |
        Sort-Object LastWriteTime)
}

function Copy-LatestLog {
    param(
        [datetime]$Since,
        [string]$Filter,
        [string]$Prefix
    )

    $latest = Get-LatestLogFiles -Since $Since -Filter $Filter | Select-Object -Last 1
    if (-not $latest) {
        return $null
    }

    $target = Join-Path $OutputRoot ($Prefix + "_" + $latest.Name)
    Copy-Item -LiteralPath $latest.FullName -Destination $target -Force
    return [pscustomobject]@{
        Source = $latest.FullName
        Copy = $target
        Name = $latest.Name
    }
}

$scenarioRootResolved = Resolve-ScenarioRoot -Root $WorkspaceRoot -Preferred $ScenarioRoot
$GameLogsRoot = Join-Path $env:USERPROFILE "Documents\StarCraft II\GameLogs"

if ([string]::IsNullOrWhiteSpace($Sc2SwitcherPath)) {
    $Sc2SwitcherPath = Join-Path $LiveRoot "Support64\SC2Switcher_x64.exe"
}
if ([string]::IsNullOrWhiteSpace($MapPath)) {
    $MapPath = Join-Path $LiveRoot "Maps\XM\CommanderTestBench.SC2Map"
}
if ([string]::IsNullOrWhiteSpace($OutputRoot)) {
    $OutputRoot = Join-Path $WorkspaceRoot "tmp\live-direct-originalmod-testbench"
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
}

if (-not (Test-Path -LiteralPath $MapPath)) {
    throw "Direct launch map not found after sync: $MapPath"
}

$startTime = Get-Date
Stop-Sc2

# Use the same direct map invocation pattern as existing live smoke scripts.
& $Sc2SwitcherPath $MapPath
Start-Sleep -Seconds 2

$sc2Process = Wait-Sc2Window -TimeoutSec 120
Focus-Window -Process $sc2Process
Start-Sleep -Seconds $LoadWaitSec

$entryScreenshot = Save-Screenshot -Name "direct_entry" -Process $sc2Process
$graphicsLog = Copy-LatestLog -Since $startTime -Filter "*Graphics.txt" -Prefix "direct"
$systemInfoLog = Copy-LatestLog -Since $startTime -Filter "*SystemInfo.txt" -Prefix "direct"
$alertsLog = Copy-LatestLog -Since $startTime -Filter "*Alerts.txt" -Prefix "direct"
$scriptErrorLog = Copy-LatestLog -Since $startTime -Filter "*ScriptError.txt" -Prefix "direct"

Write-Output "SCENARIO_ROOT=$scenarioRootResolved"
Write-Output "LIVE_ROOT=$LiveRoot"
Write-Output "DIRECT_MAP=$MapPath"
Write-Output "ENTRY_SCREENSHOT=$entryScreenshot"
Write-Output "GRAPHICS_LOG=$(if ($graphicsLog) { $graphicsLog.Copy } else { '' })"
Write-Output "SYSTEMINFO_LOG=$(if ($systemInfoLog) { $systemInfoLog.Copy } else { '' })"
Write-Output "ALERTS_LOG=$(if ($alertsLog) { $alertsLog.Copy } else { '' })"
Write-Output "SCRIPT_ERROR_LOG=$(if ($scriptErrorLog) { $scriptErrorLog.Copy } else { '' })"
Write-Output "VERIFICATION_READY=1"

if (-not $KeepOpen) {
    Stop-Sc2
    Write-Output "SC2_CLOSED=1"
}
