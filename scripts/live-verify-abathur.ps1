param(
    [string]$MapClick = '自由日',
    [switch]$CloseGame = $true,
    [switch]$LaunchGame = $true,
    [switch]$RestartExisting = $true,
    [int]$InitialLoadWaitMs = 12000,
    [int]$EscapeCount = 18,
    [string]$Sc2SwitcherPath = 'E:\SC2\SC2new\StarCraft II\Support64\SC2Switcher_x64.exe',
    [string]$LauncherMapPath = 'E:\SC2\SC2new\StarCraft II\Maps\XM\Launcher.SC2Map'
)

$ErrorActionPreference = 'Stop'

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

$workspace = Split-Path -Parent $PSScriptRoot
$stamp = Get-Date -Format 'yyyyMMdd-HHmmss'

function Get-Sc2Process {
    $proc = Get-Process SC2_x64 -ErrorAction SilentlyContinue | Select-Object -First 1
    if (-not $proc) {
        throw 'SC2_x64 is not running.'
    }
    return $proc
}

function Start-LauncherGame {
    if ($RestartExisting) {
        Get-Process | Where-Object { $_.ProcessName -match 'SC2|StarCraft' } | Stop-Process -Force -ErrorAction SilentlyContinue
        Start-Sleep -Seconds 2
    }
    & $Sc2SwitcherPath $LauncherMapPath
}

function Wait-Sc2Window {
    param([int]$TimeoutSec = 60)
    $deadline = (Get-Date).AddSeconds($TimeoutSec)
    do {
        $proc = Get-Process SC2_x64 -ErrorAction SilentlyContinue | Select-Object -First 1
        if ($proc -and $proc.MainWindowHandle -ne 0 -and $proc.MainWindowTitle) {
            return $proc
        }
        Start-Sleep -Seconds 1
    } while ((Get-Date) -lt $deadline)
    throw 'SC2_x64 window did not become ready in time.'
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
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.CopyFromScreen($bounds.Location, [System.Drawing.Point]::Empty, $bounds.Size)
    $path = Join-Path $workspace ("tmp_{0}_{1}.png" -f $Name, $stamp)
    $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bmp.Dispose()
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

function Send-Escape {
    param([int]$DelayMs = 500)
    [Sc2Live]::keybd_event(0x1B, 0, 0, [UIntPtr]::Zero)
    Start-Sleep -Milliseconds 50
    [Sc2Live]::keybd_event(0x1B, 0, [Sc2Live]::KEYUP, [UIntPtr]::Zero)
    Start-Sleep -Milliseconds $DelayMs
}

$mapPoints = @{
    '自由日' = @{ X = 248; Y = 430 }
}

$difficultyPoint = @{ X = 1644; Y = 1118 }

$proc = $null
if ($LaunchGame) {
    Start-LauncherGame
    $proc = Wait-Sc2Window
}
else {
    $proc = Get-Sc2Process
}

$rect = Focus-Sc2Window -Process $proc

if (-not $mapPoints.ContainsKey($MapClick)) {
    throw "Unknown map click preset: $MapClick"
}

$target = $mapPoints[$MapClick]

$before = Save-Screenshot -Name 'sc2_before'
Click-BattleNetLogin -Rect $rect
Start-Sleep -Seconds 8

# single-click launcher flow: map -> difficulty -> map again, then skip opening sequences
Click-Absolute -X $target.X -Y $target.Y -DelayMs 450
Click-Absolute -X $difficultyPoint.X -Y $difficultyPoint.Y -DelayMs 300
Click-Absolute -X $target.X -Y $target.Y -DelayMs $InitialLoadWaitMs

for ($i = 0; $i -lt $EscapeCount; $i++) {
    $proc = Get-Sc2Process
    Focus-Sc2Window -Process $proc | Out-Null
    Send-Escape -DelayMs 900
}

$after = Save-Screenshot -Name 'sc2_after'

Write-Output "PID=$($proc.Id)"
Write-Output "WINDOW_RECT=$($rect.Left),$($rect.Top),$($rect.Right - $rect.Left),$($rect.Bottom - $rect.Top)"
Write-Output "BEFORE_SCREENSHOT=$before"
Write-Output "AFTER_SCREENSHOT=$after"

if ($CloseGame) {
    Get-Process | Where-Object { $_.ProcessName -match 'SC2|StarCraft' } | Stop-Process -Force
    Write-Output "GAME_CLOSED=1"
}
