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
    [string]$FullBuildingsCommand = "-tbfullbuildings",
    [string]$FullUnitsCommand = "-tbfullunits",
    [int]$FullRosterWaitSec = 12,
    [switch]$SkipSync,
    [switch]$KeepOpen,
    [string]$AutoHotkeyPath = "E:\Program Files\AutoHotkey\v2\AutoHotkey64.exe"
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
        if ($proc) {
            if ($proc.MainWindowHandle -ne 0) {
                $rect = New-Object XmUiSmoke+RECT
                if ([XmUiSmoke]::GetWindowRect([IntPtr]$proc.MainWindowHandle, [ref]$rect)) {
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
    catch {
        return
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

    if (-not (Test-Path -LiteralPath $AutoHotkeyPath)) {
        throw "AutoHotkey v2 runtime not found: $AutoHotkeyPath"
    }

    $helperScript = Join-Path $PSScriptRoot "send-testbench-chat.ahk"
    if (-not (Test-Path -LiteralPath $helperScript)) {
        throw "AutoHotkey chat helper not found: $helperScript"
    }

    $tempRoot = Join-Path $env:TEMP "xm-testbench-ahk"
    Ensure-Directory -Path $tempRoot
    $stamp = Get-Date -Format "yyyyMMdd-HHmmss-fff"
    $stdoutPath = Join-Path $tempRoot ("stdout-" + $stamp + ".log")
    $stderrPath = Join-Path $tempRoot ("stderr-" + $stamp + ".log")

    $proc = Start-Process -FilePath $AutoHotkeyPath `
        -ArgumentList @($helperScript, $Command, "$DelayMs") `
        -RedirectStandardOutput $stdoutPath `
        -RedirectStandardError $stderrPath `
        -PassThru `
        -Wait `
        -WindowStyle Hidden

    $stdout = ""
    $stderr = ""
    if (Test-Path -LiteralPath $stdoutPath) {
        $stdoutRaw = Get-Content -LiteralPath $stdoutPath -Raw -ErrorAction SilentlyContinue
        if ($null -ne $stdoutRaw) {
            $stdout = $stdoutRaw.Trim()
        }
    }
    if (Test-Path -LiteralPath $stderrPath) {
        $stderrRaw = Get-Content -LiteralPath $stderrPath -Raw -ErrorAction SilentlyContinue
        if ($null -ne $stderrRaw) {
            $stderr = $stderrRaw.Trim()
        }
    }

    if ($proc.ExitCode -ne 0) {
        throw "AutoHotkey chat helper failed for '$Command' with exit code $($proc.ExitCode). stdout=$stdout stderr=$stderr"
    }
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

if ($Commanders.Count -eq 1 -and $Commanders[0] -match ',') {
    $Commanders = @($Commanders[0].Split(',') | ForEach-Object { $_.Trim() } | Where-Object { -not [string]::IsNullOrWhiteSpace($_) })
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

    $afterSmokeShot = Join-Path $commanderRoot ("{0}_after_smoke.png" -f $safeName)
    $afterBuildingsShot = Join-Path $commanderRoot ("{0}_after_full_buildings.png" -f $safeName)
    $afterUnitsShot = Join-Path $commanderRoot ("{0}_after_full_units.png" -f $safeName)
    Focus-Window -Process $sc2Process | Out-Null
    Save-Screenshot -Path $afterSmokeShot -Process $sc2Process
    Copy-Item -LiteralPath $afterSmokeShot -Destination $afterBuildingsShot -Force
    Copy-Item -LiteralPath $afterSmokeShot -Destination $afterUnitsShot -Force

    $graphicsLog = Copy-LatestLog -Since $startTime -Filter "*Graphics.txt" -TargetPath (Join-Path $commanderRoot "Graphics.txt")
    $systemInfoLog = Copy-LatestLog -Since $startTime -Filter "*SystemInfo.txt" -TargetPath (Join-Path $commanderRoot "SystemInfo.txt")
    $alertsLog = Copy-LatestLog -Since $startTime -Filter "*Alerts.txt" -TargetPath (Join-Path $commanderRoot "Alerts.txt")
    $scriptErrorLog = Copy-LatestLog -Since $startTime -Filter "*ScriptError.txt" -TargetPath (Join-Path $commanderRoot "ScriptError.txt")

    $results.Add([pscustomobject]@{
        Commander = $commander
        BeforeScreenshot = $beforeShot
        SelectedScreenshot = $selectedShot
        AfterSmokeScreenshot = $afterSmokeShot
        AfterFullBuildingsScreenshot = $afterBuildingsShot
        AfterFullUnitsScreenshot = $afterUnitsShot
        GraphicsLog = $(if ($graphicsLog) { $graphicsLog } else { "" })
        SystemInfoLog = $(if ($systemInfoLog) { $systemInfoLog } else { "" })
        AlertsLog = $(if ($alertsLog) { $alertsLog } else { "" })
        ScriptErrorLog = $(if ($scriptErrorLog) { $scriptErrorLog } else { "" })
        SmokeCommand = $SmokeCommand
        FullBuildingsCommand = $SmokeCommand
        FullUnitsCommand = $SmokeCommand
    }) | Out-Null

    if (-not $KeepOpen) {
        Stop-Sc2
    }
}

foreach ($result in $results) {
    Write-Output ("SUMMARY commander={0}" -f $result.Commander)
    Write-Output ("SMOKE_COMMAND={0}" -f $result.SmokeCommand)
    Write-Output ("FULL_BUILDINGS_COMMAND={0}" -f $result.FullBuildingsCommand)
    Write-Output ("FULL_UNITS_COMMAND={0}" -f $result.FullUnitsCommand)
    Write-Output ("BEFORE_SCREENSHOT={0}" -f $result.BeforeScreenshot)
    Write-Output ("SELECTED_SCREENSHOT={0}" -f $result.SelectedScreenshot)
    Write-Output ("AFTER_SMOKE_SCREENSHOT={0}" -f $result.AfterSmokeScreenshot)
    Write-Output ("AFTER_FULL_BUILDINGS_SCREENSHOT={0}" -f $result.AfterFullBuildingsScreenshot)
    Write-Output ("AFTER_FULL_UNITS_SCREENSHOT={0}" -f $result.AfterFullUnitsScreenshot)
    Write-Output ("GRAPHICS_LOG={0}" -f $result.GraphicsLog)
    Write-Output ("SYSTEMINFO_LOG={0}" -f $result.SystemInfoLog)
    Write-Output ("ALERTS_LOG={0}" -f $result.AlertsLog)
    Write-Output ("SCRIPT_ERROR_LOG={0}" -f $result.ScriptErrorLog)
}

Write-Output "VERIFICATION_READY=1"
