param(
    [string]$MapName = "thanson01.SC2Map",
    [string]$Commander = "Alarak",
    [string]$OutputPrefix = "",
    [switch]$Prepare = $true,
    [switch]$LaunchGame = $true,
    [switch]$RestartExisting = $true,
    [switch]$CloseGame = $true,
    [int]$InitialLoadWaitMs = 0,
    [int]$MapEntryTimeoutSec = 180,
    [int]$PollIntervalMs = 2000,
    [int]$EscapeCount = 12,
    [switch]$SelectHero = $false,
    [int[]]$HeroSelectPoint = @(0, 0),
    [switch]$ClickTopBarButtons = $false,
    [string]$TopBarButtons = "",
    [string]$TargetClicks = "",
    [switch]$ClickCommandCard = $false,
    [string]$CommandCardSlots = "",
    [int]$PostEntryWaitMs = 1500,
    [string]$WorkspaceRoot = (Split-Path -Parent $PSScriptRoot),
    [string]$LiveRoot = "E:\SC2\SC2new\StarCraft II",
    [string]$Sc2SwitcherPath = "E:\SC2\SC2new\StarCraft II\Support64\SC2Switcher_x64.exe"
)

$ErrorActionPreference = "Stop"

if ([string]::IsNullOrWhiteSpace($OutputPrefix)) {
    $OutputPrefix = $Commander.ToLowerInvariant()
}

Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing
Add-Type @"
using System;
using System.Runtime.InteropServices;
public static class Sc2Live {
  [StructLayout(LayoutKind.Sequential)]
  public struct RECT { public int Left; public int Top; public int Right; public int Bottom; }
  [DllImport("user32.dll")] public static extern bool ShowWindowAsync(IntPtr hWnd, int nCmdShow);
  [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr hWnd);
  [DllImport("user32.dll")] public static extern bool BringWindowToTop(IntPtr hWnd);
  [DllImport("user32.dll")] public static extern bool GetWindowRect(IntPtr hWnd, out RECT rect);
  [DllImport("user32.dll")] public static extern bool SetCursorPos(int X, int Y);
  [DllImport("user32.dll")] public static extern void mouse_event(uint dwFlags, uint dx, uint dy, uint dwData, UIntPtr dwExtraInfo);
  [DllImport("user32.dll")] public static extern void keybd_event(byte bVk, byte bScan, uint dwFlags, UIntPtr dwExtraInfo);
  public const uint LEFTDOWN = 0x0002;
  public const uint LEFTUP = 0x0004;
  public const uint KEYUP = 0x0002;
}
"@

$mapPath = Join-Path (Join-Path $LiveRoot "Maps\XM") $MapName
$bankPath = "$env:USERPROFILE\Documents\StarCraft II\Banks\CampaignXCore.SC2Bank"
$logRoot = "$env:USERPROFILE\Documents\StarCraft II\GameLogs"
$stamp = Get-Date -Format "yyyyMMdd-HHmmss"

function Get-Sc2Process {
    $proc = Get-Process SC2_x64 -ErrorAction SilentlyContinue | Select-Object -First 1
    if (-not $proc) {
        throw "SC2_x64 is not running."
    }
    return $proc
}

function Wait-Sc2Window {
    param([int]$TimeoutSec = 90)
    $deadline = (Get-Date).AddSeconds($TimeoutSec)
    do {
        $proc = Get-Process SC2_x64 -ErrorAction SilentlyContinue | Select-Object -First 1
        if ($proc -and $proc.MainWindowHandle -ne 0) {
            return $proc
        }
        Start-Sleep -Seconds 1
    } while ((Get-Date) -lt $deadline)
    throw "SC2_x64 window did not become ready in time."
}

function Focus-Sc2Window {
    param([System.Diagnostics.Process]$Process)
    $hwnd = [IntPtr]$Process.MainWindowHandle
    if ($hwnd -eq [IntPtr]::Zero) {
        throw "SC2_x64 pid=$($Process.Id) has no main window handle."
    }
    [Sc2Live]::ShowWindowAsync($hwnd, 9) | Out-Null
    Start-Sleep -Milliseconds 250
    [Sc2Live]::BringWindowToTop($hwnd) | Out-Null
    [Sc2Live]::SetForegroundWindow($hwnd) | Out-Null
    Start-Sleep -Milliseconds 500
    $rect = New-Object Sc2Live+RECT
    [Sc2Live]::GetWindowRect($hwnd, [ref]$rect) | Out-Null
    return $rect
}

function Save-Screenshot {
    param([string]$Name)
    $bounds = [System.Windows.Forms.Screen]::PrimaryScreen.Bounds
    $bmp = New-Object System.Drawing.Bitmap $bounds.Width, $bounds.Height
    $graphics = [System.Drawing.Graphics]::FromImage($bmp)
    $graphics.CopyFromScreen($bounds.Location, [System.Drawing.Point]::Empty, $bounds.Size)
    $path = Join-Path $WorkspaceRoot ("tmp_{0}_{1}.png" -f $Name, $stamp)
    try {
        Start-Sleep -Milliseconds 120
        $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
    }
    catch {
        Start-Sleep -Milliseconds 400
        $retryPath = Join-Path $WorkspaceRoot ("tmp_{0}_{1}_retry.png" -f $Name, $stamp)
        $bmp.Save($retryPath, [System.Drawing.Imaging.ImageFormat]::Png)
        $path = $retryPath
    }
    finally {
        $graphics.Dispose()
        $bmp.Dispose()
    }
    return $path
}

function Click-Absolute {
    param(
        [int]$X,
        [int]$Y,
        [int]$DelayMs = 500
    )
    [Sc2Live]::SetCursorPos($X, $Y) | Out-Null
    Start-Sleep -Milliseconds 120
    [Sc2Live]::mouse_event([Sc2Live]::LEFTDOWN, 0, 0, 0, [UIntPtr]::Zero)
    Start-Sleep -Milliseconds 45
    [Sc2Live]::mouse_event([Sc2Live]::LEFTUP, 0, 0, 0, [UIntPtr]::Zero)
    Start-Sleep -Milliseconds $DelayMs
}

function Click-BattleNetLogin {
    param([Sc2Live+RECT]$Rect)

    $width = $Rect.Right - $Rect.Left
    $height = $Rect.Bottom - $Rect.Top
    $x = $Rect.Left + [math]::Round($width * 0.618)
    $y = $Rect.Top + [math]::Round($height * 0.395)
    Click-Absolute -X $x -Y $y -DelayMs 1500
}

function Invoke-TargetClicks {
    param(
        [string]$Spec,
        [int]$DelayMs = 900
    )

    if ([string]::IsNullOrWhiteSpace($Spec)) {
        return
    }

    foreach ($token in ($Spec -split ';' | ForEach-Object { $_.Trim() } | Where-Object { $_ -ne "" })) {
        $pair = $token -split ','
        if ($pair.Count -lt 2) {
            continue
        }

        $x = [int]$pair[0].Trim()
        $y = [int]$pair[1].Trim()
        Click-Absolute -X $x -Y $y -DelayMs $DelayMs
    }
}

function Get-TopBarButtonPoint {
    param(
        [Sc2Live+RECT]$Rect,
        [int]$Index
    )
    $width = $Rect.Right - $Rect.Left
    $height = $Rect.Bottom - $Rect.Top
    $x = $Rect.Left + [math]::Round($width * (0.455 + (0.075 * $Index)))
    $y = $Rect.Top + [math]::Round($height * 0.04)
    return @([int]$x, [int]$y)
}

function Get-CommandCardPoint {
    param(
        [Sc2Live+RECT]$Rect,
        [int]$Slot
    )
    $width = $Rect.Right - $Rect.Left
    $height = $Rect.Bottom - $Rect.Top
    $baseX = $Rect.Left + [math]::Round($width * 0.805)
    $baseY = $Rect.Top + [math]::Round($height * 0.82)
    $col = ($Slot - 1) % 4
    $row = [math]::Floor(($Slot - 1) / 4)
    $stepX = [math]::Round($width * 0.034)
    $stepY = [math]::Round($height * 0.06)
    return @([int]($baseX + ($stepX * $col)), [int]($baseY + ($stepY * $row)))
}

function Send-Escape {
    param([int]$DelayMs = 900)
    [Sc2Live]::keybd_event(0x1B, 0, 0, [UIntPtr]::Zero)
    Start-Sleep -Milliseconds 50
    [Sc2Live]::keybd_event(0x1B, 0, [Sc2Live]::KEYUP, [UIntPtr]::Zero)
    Start-Sleep -Milliseconds $DelayMs
}

function Get-LatestLogSince {
    param(
        [string]$Filter,
        [datetime]$Since
    )

    if (-not (Test-Path -LiteralPath $logRoot)) {
        return $null
    }

    return Get-ChildItem -LiteralPath $logRoot -Filter $Filter -Recurse -ErrorAction SilentlyContinue |
        Where-Object { $_.LastWriteTime -ge $Since } |
        Sort-Object LastWriteTime -Descending |
        Select-Object -First 1
}

function Wait-ForMapEntryEvidence {
    param(
        [datetime]$Since,
        [int]$TimeoutSec,
        [int]$SleepMs
    )

    $deadline = (Get-Date).AddSeconds($TimeoutSec)
    do {
        $alerts = Get-LatestLogSince -Filter "*Alerts.txt" -Since $Since
        if ($alerts) {
            return [pscustomobject]@{
                Signal = "alerts"
                Path = $alerts.FullName
                UpdatedAt = $alerts.LastWriteTime
            }
        }

        $scriptError = Get-LatestLogSince -Filter "*ScriptError.txt" -Since $Since
        if ($scriptError) {
            return [pscustomobject]@{
                Signal = "script-error"
                Path = $scriptError.FullName
                UpdatedAt = $scriptError.LastWriteTime
            }
        }

        Start-Sleep -Milliseconds $SleepMs
    } while ((Get-Date) -lt $deadline)

    return [pscustomobject]@{
        Signal = "timeout"
        Path = ""
        UpdatedAt = $null
    }
}

if ($Prepare) {
    & (Join-Path $PSScriptRoot "sync-alarak-live.ps1") -WorkspaceRoot $WorkspaceRoot -LiveRoot $LiveRoot -Maps @($MapName)
    & (Join-Path $PSScriptRoot "set-campaignxcore-commander.ps1") -Commander $Commander -BankPath $bankPath
}

if (-not (Test-Path -LiteralPath $mapPath)) {
    throw "Live map path not found: $mapPath"
}
if (-not (Test-Path -LiteralPath $Sc2SwitcherPath)) {
    throw "SC2Switcher not found: $Sc2SwitcherPath"
}

$startTime = Get-Date

if ($LaunchGame) {
    if ($RestartExisting) {
        Get-Process | Where-Object { $_.ProcessName -match "SC2|StarCraft" } | Stop-Process -Force -ErrorAction SilentlyContinue
        Start-Sleep -Seconds 2
    }
    & $Sc2SwitcherPath $mapPath
}

$proc = Wait-Sc2Window
$rect = Focus-Sc2Window -Process $proc
$before = Save-Screenshot -Name "${OutputPrefix}_before"
if ($LaunchGame) {
    Click-BattleNetLogin -Rect $rect
    Start-Sleep -Seconds 8
}

$entryEvidence = $null
if ($InitialLoadWaitMs -gt 0) {
    Start-Sleep -Milliseconds $InitialLoadWaitMs
}
$entryEvidence = Wait-ForMapEntryEvidence -Since $startTime -TimeoutSec $MapEntryTimeoutSec -SleepMs $PollIntervalMs

if ($entryEvidence.Signal -ne "timeout") {
    for ($i = 0; $i -lt $EscapeCount; $i++) {
        $proc = Get-Sc2Process
        Focus-Sc2Window -Process $proc | Out-Null
        Send-Escape
    }
    Start-Sleep -Milliseconds $PostEntryWaitMs
}

if ($SelectHero -and $HeroSelectPoint.Count -ge 2 -and $HeroSelectPoint[0] -gt 0 -and $HeroSelectPoint[1] -gt 0) {
    $proc = Get-Sc2Process
    $rect = Focus-Sc2Window -Process $proc
    Click-Absolute -X $HeroSelectPoint[0] -Y $HeroSelectPoint[1] -DelayMs 700
}

if ($ClickTopBarButtons -and -not [string]::IsNullOrWhiteSpace($TopBarButtons)) {
    $proc = Get-Sc2Process
    $rect = Focus-Sc2Window -Process $proc
    foreach ($token in ($TopBarButtons -split ',' | ForEach-Object { $_.Trim() } | Where-Object { $_ -ne "" })) {
        $index = [int]$token
        $point = Get-TopBarButtonPoint -Rect $rect -Index $index
        Click-Absolute -X $point[0] -Y $point[1] -DelayMs 900
    }
}

if (-not [string]::IsNullOrWhiteSpace($TargetClicks)) {
    $proc = Get-Sc2Process
    $rect = Focus-Sc2Window -Process $proc
    Invoke-TargetClicks -Spec $TargetClicks -DelayMs 900
}

if ($ClickCommandCard -and -not [string]::IsNullOrWhiteSpace($CommandCardSlots)) {
    $proc = Get-Sc2Process
    $rect = Focus-Sc2Window -Process $proc
    foreach ($token in ($CommandCardSlots -split ',' | ForEach-Object { $_.Trim() } | Where-Object { $_ -ne "" })) {
        $slot = [int]$token
        $point = Get-CommandCardPoint -Rect $rect -Slot $slot
        Click-Absolute -X $point[0] -Y $point[1] -DelayMs 900
    }
}

$postClick = $null
if ($ClickTopBarButtons -or $ClickCommandCard -or $SelectHero -or -not [string]::IsNullOrWhiteSpace($TargetClicks)) {
    Start-Sleep -Milliseconds 1200
    $postClick = Save-Screenshot -Name "${OutputPrefix}_postclick"
}

$after = Save-Screenshot -Name "${OutputPrefix}_after"

$latestScriptError = $null
if ($entryEvidence.Signal -eq "script-error" -and $entryEvidence.Path) {
    $latestScriptError = $entryEvidence.Path
}
else {
    $scriptErrorFile = Get-LatestLogSince -Filter "*ScriptError.txt" -Since $startTime
    if ($scriptErrorFile) {
        $latestScriptError = $scriptErrorFile.FullName
    }
}

$latestAlerts = Get-LatestLogSince -Filter "*Alerts.txt" -Since $startTime

$commanderValue = ""
if (Test-Path -LiteralPath $bankPath) {
    [xml]$bank = Get-Content -LiteralPath $bankPath -Raw
    $node = $bank.SelectSingleNode("/Bank/Section[@name='Ach']/Key[@name='Commander']/Value")
    if ($node -and $node.Attributes["string"]) {
        $commanderValue = $node.Attributes["string"].Value
    }
}

Write-Output "MAP=$mapPath"
Write-Output "PID=$($proc.Id)"
Write-Output "WINDOW_RECT=$($rect.Left),$($rect.Top),$($rect.Right - $rect.Left),$($rect.Bottom - $rect.Top)"
Write-Output "COMMANDER_BANK=$commanderValue"
Write-Output "MAP_ENTRY_SIGNAL=$($entryEvidence.Signal)"
if ($entryEvidence.Path) {
    Write-Output "MAP_ENTRY_LOG=$($entryEvidence.Path)"
}
Write-Output "BEFORE_SCREENSHOT=$before"
Write-Output "AFTER_SCREENSHOT=$after"
if ($postClick) {
    Write-Output "POSTCLICK_SCREENSHOT=$postClick"
}
if ($latestAlerts) {
    Write-Output "LATEST_ALERTS=$($latestAlerts.FullName)"
}
if ($latestScriptError) {
    Write-Output "LATEST_SCRIPT_ERROR=$latestScriptError"
}

if ($CloseGame) {
    Get-Process | Where-Object { $_.ProcessName -match "SC2|StarCraft" } | Stop-Process -Force -ErrorAction SilentlyContinue
    Write-Output "GAME_CLOSED=1"
}
