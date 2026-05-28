param(
    [string]$WorkspaceRoot = (Split-Path -Parent $PSScriptRoot),
    [string]$ScenarioRoot = "",
    [string]$LiveRoot = "E:\SC2\SC2new\StarCraft II",
    [string]$Sc2SwitcherPath = "",
    [string]$MapPath = "",
    [string]$OutputRoot = "",
    [string[]]$Commanders = @("Nova", "Dehaka"),
    [int]$MapLoadWaitSec = 18,
    [int]$CommanderSettleMs = 1800,
    [int]$SmokeWaitSec = 18,
    [string]$SmokeCommand = "-tbsmoke",
    [switch]$SkipSync,
    [switch]$KeepOpen
)

$ErrorActionPreference = "Stop"

Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing
Add-Type @"
using System;
using System.Runtime.InteropServices;
public static class XmUiSmoke {
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

function Get-Sc2Process {
    Get-Process -Name "SC2_x64" -ErrorAction SilentlyContinue | Select-Object -First 1
}

function Wait-Sc2Window {
    param([int]$TimeoutSec = 120)

    $deadline = (Get-Date).AddSeconds($TimeoutSec)
    do {
        $proc = Get-Sc2Process
        if ($proc -and $proc.MainWindowHandle -ne 0) {
            $rect = New-Object XmUiSmoke+RECT
            if ([XmUiSmoke]::GetWindowRect([IntPtr]$proc.MainWindowHandle, [ref]$rect)) {
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

function Get-WindowRect {
    param([System.Diagnostics.Process]$Process)

    $rect = New-Object XmUiSmoke+RECT
    if ($Process -and $Process.MainWindowHandle -ne 0 -and [XmUiSmoke]::GetWindowRect([IntPtr]$Process.MainWindowHandle, [ref]$rect)) {
        return $rect
    }

    $bounds = [System.Windows.Forms.Screen]::PrimaryScreen.Bounds
    $rect.Left = $bounds.Left
    $rect.Top = $bounds.Top
    $rect.Right = $bounds.Right
    $rect.Bottom = $bounds.Bottom
    return $rect
}

function Focus-Window {
    param([System.Diagnostics.Process]$Process)

    $hwnd = [IntPtr]$Process.MainWindowHandle
    [XmUiSmoke]::ShowWindowAsync($hwnd, 9) | Out-Null
    Start-Sleep -Milliseconds 200
    [XmUiSmoke]::BringWindowToTop($hwnd) | Out-Null
    [XmUiSmoke]::SetForegroundWindow($hwnd) | Out-Null
    Start-Sleep -Milliseconds 400
    return (Get-WindowRect -Process $Process)
}

function Save-Screenshot {
    param(
        [string]$Path,
        [System.Diagnostics.Process]$Process
    )

    $rect = Get-WindowRect -Process $Process
    $width = [Math]::Max(1, $rect.Right - $rect.Left)
    $height = [Math]::Max(1, $rect.Bottom - $rect.Top)
    $bmp = New-Object System.Drawing.Bitmap $width, $height
    $graphics = [System.Drawing.Graphics]::FromImage($bmp)
    try {
        $graphics.CopyFromScreen(
            [System.Drawing.Point]::new($rect.Left, $rect.Top),
            [System.Drawing.Point]::Empty,
            [System.Drawing.Size]::new($width, $height)
        )
        $bmp.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)
    }
    finally {
        $graphics.Dispose()
        $bmp.Dispose()
    }
}

function Send-ChatCommand {
    param(
        [string]$Command,
        [int]$DelayMs = 1200
    )

    $clipboardReady = $false
    for ($attempt = 1; $attempt -le 5; $attempt += 1) {
        try {
            Set-Clipboard -Value $Command
            $clipboardReady = $true
            break
        }
        catch {
            if ($attempt -eq 5) {
                throw "Failed to write chat command '$Command' to the clipboard after $attempt attempts. $($_.Exception.Message)"
            }
            Start-Sleep -Milliseconds 300
        }
    }

    if (-not $clipboardReady) {
        throw "Clipboard did not become available for chat command '$Command'."
    }

    [System.Windows.Forms.SendKeys]::SendWait("{ESC}")
    Start-Sleep -Milliseconds 120
    [System.Windows.Forms.SendKeys]::SendWait("{ESC}")
    Start-Sleep -Milliseconds 120
    [System.Windows.Forms.SendKeys]::SendWait("{ENTER}")
    Start-Sleep -Milliseconds 150
    [System.Windows.Forms.SendKeys]::SendWait("^v")
    Start-Sleep -Milliseconds 150
    [System.Windows.Forms.SendKeys]::SendWait("{ENTER}")
    Start-Sleep -Milliseconds 120
    [System.Windows.Forms.SendKeys]::SendWait("{ESC}")
    Start-Sleep -Milliseconds $DelayMs
}

function Get-CommanderChatCommand {
    param([string]$Commander)

    switch ($Commander.ToLowerInvariant()) {
        "abathur" { return "-tbabathur" }
        "abathurreborn" { return "-tbabathurreborn" }
        "alarak" { return "-tbalarak" }
        "artanis" { return "-tbartanis" }
        "fenix" { return "-tbfenix" }
        "karax" { return "-tbkarax" }
        "kerrigan" { return "-tbkerrigan" }
        "raynor" { return "-tbraynor" }
        "vorazun" { return "-tbvorazun" }
        "zagara" { return "-tbzagara" }
        "zeratul" { return "-tbzeratul" }
        "nova" { return "-tbnova" }
        "dehaka" { return "-tbdehaka" }
        default { throw "No direct chat trigger is defined for commander '$Commander'." }
    }
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
        [string]$TargetPath
    )

    $latest = Get-LatestLogFiles -Since $Since -Filter $Filter | Select-Object -Last 1
    if (-not $latest) {
        return $null
    }

    Copy-Item -LiteralPath $latest.FullName -Destination $TargetPath -Force
    return $TargetPath
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
    $OutputRoot = Join-Path $WorkspaceRoot "tmp\live-smoke-originalmod-existing-commanders"
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

$results = New-Object System.Collections.Generic.List[object]

foreach ($commander in $Commanders) {
    $safeName = ($commander -replace '[^A-Za-z0-9_-]', '_')
    $commanderRoot = Join-Path $OutputRoot $safeName
    Ensure-Directory -Path $commanderRoot

    $startTime = Get-Date
    Stop-Sc2

    & $Sc2SwitcherPath $MapPath
    Start-Sleep -Seconds 2

    $sc2Process = Wait-Sc2Window -TimeoutSec 120
    Focus-Window -Process $sc2Process | Out-Null
    Start-Sleep -Seconds $MapLoadWaitSec

    $beforeShot = Join-Path $commanderRoot ("{0}_before.png" -f $safeName)
    Focus-Window -Process $sc2Process | Out-Null
    Save-Screenshot -Path $beforeShot -Process $sc2Process

    Focus-Window -Process $sc2Process | Out-Null
    $commanderCommand = Get-CommanderChatCommand -Commander $commander
    Send-ChatCommand -Command $commanderCommand -DelayMs $CommanderSettleMs

    $selectedShot = Join-Path $commanderRoot ("{0}_selected.png" -f $safeName)
    Focus-Window -Process $sc2Process | Out-Null
    Save-Screenshot -Path $selectedShot -Process $sc2Process

    Focus-Window -Process $sc2Process | Out-Null
    Send-ChatCommand -Command $SmokeCommand -DelayMs 800
    Start-Sleep -Seconds $SmokeWaitSec

    $afterShot = Join-Path $commanderRoot ("{0}_after_smoke.png" -f $safeName)
    Focus-Window -Process $sc2Process | Out-Null
    Save-Screenshot -Path $afterShot -Process $sc2Process

    $graphicsLog = Copy-LatestLog -Since $startTime -Filter "*Graphics.txt" -TargetPath (Join-Path $commanderRoot "Graphics.txt")
    $systemInfoLog = Copy-LatestLog -Since $startTime -Filter "*SystemInfo.txt" -TargetPath (Join-Path $commanderRoot "SystemInfo.txt")
    $alertsLog = Copy-LatestLog -Since $startTime -Filter "*Alerts.txt" -TargetPath (Join-Path $commanderRoot "Alerts.txt")
    $scriptErrorLog = Copy-LatestLog -Since $startTime -Filter "*ScriptError.txt" -TargetPath (Join-Path $commanderRoot "ScriptError.txt")

    $results.Add([pscustomobject]@{
        Commander = $commander
        BeforeScreenshot = $beforeShot
        SelectedScreenshot = $selectedShot
        AfterSmokeScreenshot = $afterShot
        GraphicsLog = $(if ($graphicsLog) { $graphicsLog } else { "" })
        SystemInfoLog = $(if ($systemInfoLog) { $systemInfoLog } else { "" })
        AlertsLog = $(if ($alertsLog) { $alertsLog } else { "" })
        ScriptErrorLog = $(if ($scriptErrorLog) { $scriptErrorLog } else { "" })
        SmokeCommand = $SmokeCommand
    }) | Out-Null

    if (-not $KeepOpen) {
        Stop-Sc2
    }
}

foreach ($result in $results) {
    Write-Output ("SUMMARY commander={0}" -f $result.Commander)
    Write-Output ("SMOKE_COMMAND={0}" -f $result.SmokeCommand)
    Write-Output ("BEFORE_SCREENSHOT={0}" -f $result.BeforeScreenshot)
    Write-Output ("SELECTED_SCREENSHOT={0}" -f $result.SelectedScreenshot)
    Write-Output ("AFTER_SMOKE_SCREENSHOT={0}" -f $result.AfterSmokeScreenshot)
    Write-Output ("GRAPHICS_LOG={0}" -f $result.GraphicsLog)
    Write-Output ("SYSTEMINFO_LOG={0}" -f $result.SystemInfoLog)
    Write-Output ("ALERTS_LOG={0}" -f $result.AlertsLog)
    Write-Output ("SCRIPT_ERROR_LOG={0}" -f $result.ScriptErrorLog)
}

Write-Output "VERIFICATION_READY=1"
