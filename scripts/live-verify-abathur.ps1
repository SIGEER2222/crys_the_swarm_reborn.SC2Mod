param(
    [string]$Commander = "Abathur",
    [string]$MapClick = '1',
    [string]$OutputPrefix = "",
    [switch]$CloseGame = $true,
    [switch]$LaunchGame = $true,
    [switch]$RestartExisting = $true,
    [int]$InitialLoadWaitMs = 12000,
    [int]$LoadWaitMinSec = 60,
    [int]$LoadWaitMaxSec = 180,
    [int]$LoadPollIntervalSec = 5,
    [int]$EscapeCount = 18,
    [string]$ProbeTopBarButtons = "0,1,2,3",
    [string]$ProbeCommandCardSlots = "7,9,11,15",
    [switch]$CaptureLogEvidence = $true,
    [string]$Sc2SwitcherPath = 'E:\SC2\SC2new\StarCraft II\Support64\SC2Switcher_x64.exe',
    [string]$LauncherMapPath = 'E:\SC2\SC2new\StarCraft II\Maps\XM\Launcher.SC2Map',
    [int]$LauncherReadyWaitMs = 30000,
    [switch]$ClickLogin = $false
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
$logRoot = Join-Path $env:USERPROFILE 'Documents\StarCraft II\GameLogs'
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
            $rect = New-Object Sc2Live+RECT
            if ([Sc2Live]::GetWindowRect([IntPtr]$proc.MainWindowHandle, [ref]$rect)) {
                $width = $rect.Right - $rect.Left
                $height = $rect.Bottom - $rect.Top
                if ($width -ge 1000 -and $height -ge 700) {
                    return $proc
                }
            }
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
    # 登录弹层点击：默认点 Launcher 里 BNet 按钮的位置。
    Click-Absolute -X $x -Y $y -DelayMs 1500
}

function Get-CommanderIndex {
    param([string]$Name)

    $userDataPath = Join-Path $PSScriptRoot "..\tools\launcher_mpq\Base.SC2Data\GameData\UserData.xml"
    if (-not (Test-Path -LiteralPath $userDataPath)) {
        return $null
    }

    [xml]$doc = Get-Content -LiteralPath $userDataPath -Raw -Encoding UTF8
    $node = $doc.SelectSingleNode("//CUser[@id='CommanderPreset']//String[@String='$Name']/Field[@Id='Commander']")
    if ($node -and $node.Attributes["Index"]) {
        return [int]$node.Attributes["Index"].Value
    }
    if ($node) {
        return 0
    }

    return $null
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

function Get-CommanderButtonPoint {
    param(
        [Sc2Live+RECT]$Rect,
        [int]$Index
    )

    $commanderXs = @(168, 266, 364, 462, 560, 658, 756, 854, 952)
    # 指挥官按钮的有效点击区更靠上，避开下方文字与边缘。
    $commanderYs = @(322, 421)

    $col = $Index % 9
    $row = [math]::Floor($Index / 9)
    if ($row -ge $commanderYs.Count) {
        throw "Commander row out of range: $row"
    }

    return @(
        [int]($Rect.Left + $commanderXs[$col]),
        [int]($Rect.Top + $commanderYs[$row])
    )
}

function Get-TopBarButtonPoint {
    param(
        [Sc2Live+RECT]$Rect,
        [int]$Index
    )

    $width = $Rect.Right - $Rect.Left
    $x = $Rect.Left + [math]::Round($width * (0.455 + (0.075 * $Index)))
    $y = $Rect.Top + [math]::Round(($Rect.Bottom - $Rect.Top) * 0.04)
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

function Get-MapButtonPoint {
    param(
        [Sc2Live+RECT]$Rect,
        [int]$Index
    )

    if ($Index -lt 1) {
        throw "Map index must be >= 1."
    }

    $mapXs = @(328, 647, 965, 1283, 1601)
    $mapYs = @(461, 630, 768, 906, 1045, 1182)

    $col = ($Index - 1) % $mapXs.Count
    $row = [math]::Floor(($Index - 1) / $mapXs.Count)
    if ($row -ge $mapYs.Count) {
        throw "Map row out of range: $row"
    }

    return @(
        [int]($Rect.Left + $mapXs[$col]),
        [int]($Rect.Top + $mapYs[$row])
    )
}

function Get-DifficultyButtonPoint {
    param(
        [Sc2Live+RECT]$Rect,
        [int]$Index = 0
    )

    if ($Index -lt 0 -or $Index -gt 3) {
        throw "Difficulty index must be between 0 and 3."
    }

    $width = $Rect.Right - $Rect.Left
    $x = $Rect.Right - 100 - 520 + 39 + 50 + (114 * $Index)
    $y = $Rect.Top + 430 + 25
    return @([int]$x, [int]$y)
}

function Send-Escape {
    param([int]$DelayMs = 500)
    [Sc2Live]::keybd_event(0x1B, 0, 0, [UIntPtr]::Zero)
    Start-Sleep -Milliseconds 50
    [Sc2Live]::keybd_event(0x1B, 0, [Sc2Live]::KEYUP, [UIntPtr]::Zero)
    Start-Sleep -Milliseconds $DelayMs
}

function Get-LoadWaitSeconds {
    param(
        [int]$MinSec,
        [int]$MaxSec
    )

    if ($MaxSec -lt $MinSec) {
        $MaxSec = $MinSec
    }

    if ($MaxSec -le $MinSec) {
        return $MinSec
    }

    return (Get-Random -Minimum $MinSec -Maximum ($MaxSec + 1))
}

function Wait-ForLoadWindow {
    param(
        [datetime]$Since,
        [int]$MinSec,
        [int]$MaxSec,
        [int]$PollIntervalSec
    )

    $target = Get-LoadWaitSeconds -MinSec $MinSec -MaxSec $MaxSec
    $elapsed = 0
    $signal = "timeout"
    $latestAlerts = $null
    $latestScriptError = $null

    while ($elapsed -lt $target) {
        $sleepSec = [math]::Min([math]::Max($PollIntervalSec, 1), $target - $elapsed)
        Start-Sleep -Seconds $sleepSec
        $elapsed += $sleepSec

        $latestScriptError = Get-LatestLogSince -Filter "*ScriptError.txt" -Since $Since
        if ($latestScriptError) {
            $signal = "script-error"
            break
        }
    }

    $latestAlerts = Get-LatestLogSince -Filter "*Alerts.txt" -Since $Since

    return [pscustomobject]@{
        TargetSec = $target
        ElapsedSec = $elapsed
        Signal = $signal
        Alerts = $latestAlerts
        ScriptError = $latestScriptError
    }
}

function Get-GameLogEvidence {
    param(
        [datetime]$Since,
        [string]$Pattern = 'Unit|Structure|Hero|Panel|Ability|Commander|Building|Caster|TopBar|CommandCard'
    )

    if (-not (Test-Path -LiteralPath $logRoot)) {
        return [pscustomobject]@{
            Files = @()
            Lines = @()
        }
    }

    $files = Get-ChildItem -LiteralPath $logRoot -File -Recurse -ErrorAction SilentlyContinue |
        Where-Object { $_.LastWriteTime -ge $Since } |
        Sort-Object LastWriteTime -Descending |
        Select-Object -First 6

    $lines = New-Object System.Collections.Generic.List[string]
    foreach ($file in $files) {
        $tail = Get-Content -LiteralPath $file.FullName -ErrorAction SilentlyContinue | Select-Object -Last 800
        foreach ($line in $tail) {
            if ($line -match $Pattern -or $line -match '\[XM_' -or $line -match 'ScriptError' -or $line -match 'Alerts') {
                [void]$lines.Add($line)
            }
        }
    }

    return [pscustomobject]@{
        Files = @($files.FullName)
        Lines = $lines.ToArray()
    }
}

function Save-TextReport {
    param(
        [string]$Name,
        [string[]]$Lines
    )

    $path = Join-Path $workspace ("{0}_{1}.txt" -f $Name, $stamp)
    $Lines | Set-Content -LiteralPath $path -Encoding UTF8
    return $path
}

$proc = $null
if ($LaunchGame) {
    Start-LauncherGame
    $proc = Wait-Sc2Window
}
else {
    $proc = Get-Sc2Process
}

$rect = Focus-Sc2Window -Process $proc

$mapIndex = 1
if ($MapClick -eq '1') {
    $mapIndex = 1
}
else {
    $parsedMapIndex = 0
    if (-not [int]::TryParse($MapClick, [ref]$parsedMapIndex)) {
        throw "Unknown map click preset: $MapClick"
    }
    $mapIndex = [int]$parsedMapIndex
}

$beforeName = 'sc2_before'
$mapSelectedName = 'sc2_mapselected'
$afterName = 'sc2_after'
if (-not [string]::IsNullOrWhiteSpace($OutputPrefix)) {
    $beforeName = "${OutputPrefix}_before"
    $mapSelectedName = "${OutputPrefix}_mapselected"
    $afterName = "${OutputPrefix}_after"
}
$startTime = Get-Date

if ($ClickLogin) {
    # 1) 可选：先点一次登录提示，避免 Launcher 停在 BNet 弹层。
    Click-BattleNetLogin -Rect $rect
}
Start-Sleep -Milliseconds $LauncherReadyWaitMs
$before = Save-Screenshot -Name $beforeName

$commanderIndex = Get-CommanderIndex -Name $Commander
if ($commanderIndex -eq $null) {
    throw "Commander not found in Launcher UserData: $Commander"
}
# 2) 点击指挥官头像：这里是候选指挥官页，改这里就能换进哪个指挥官。
$commanderPoint = Get-CommanderButtonPoint -Rect $rect -Index $commanderIndex
Click-Absolute -X $commanderPoint[0] -Y $commanderPoint[1] -DelayMs 900
Start-Sleep -Milliseconds 1200

$selectionName = 'sc2_selection'
if (-not [string]::IsNullOrWhiteSpace($OutputPrefix)) {
    $selectionName = "${OutputPrefix}_selection"
}
$selection = Save-Screenshot -Name $selectionName

# 3) 点击关卡按钮：这里决定进哪张地图，`MapClick` 的坐标就是从这里算出来的。
$mapPoint = Get-MapButtonPoint -Rect $rect -Index $mapIndex
Click-Absolute -X $mapPoint[0] -Y $mapPoint[1] -DelayMs 450

# 4) 点击难度按钮：先选难度，再确认进图。
$difficultyPoint = Get-DifficultyButtonPoint -Rect $rect -Index 0
Click-Absolute -X $difficultyPoint[0] -Y $difficultyPoint[1] -DelayMs 300

# 5) 再点一次关卡按钮：这是正式确认进图的那一下。
Click-Absolute -X $mapPoint[0] -Y $mapPoint[1] -DelayMs $InitialLoadWaitMs

# 6) 记录“已点关卡后”的截图，用来确认是否离开候选页。
$mapSelected = Save-Screenshot -Name $mapSelectedName

$loadWindow = Wait-ForLoadWindow -Since $startTime -MinSec $LoadWaitMinSec -MaxSec $LoadWaitMaxSec -PollIntervalSec $LoadPollIntervalSec
Start-Sleep -Milliseconds $InitialLoadWaitMs

$probeLog = $null
if ($CaptureLogEvidence) {
    $probeEvidence = Get-GameLogEvidence -Since $startTime
    $probeLines = @()
    if ($probeEvidence.Lines.Count -gt 0) {
        $probeLines += "LOG_EVIDENCE_FILES:"
        $probeLines += $probeEvidence.Files
        $probeLines += ""
        $probeLines += "LOG_EVIDENCE_LINES:"
        $probeLines += $probeEvidence.Lines
    }
    else {
        $probeLines += "LOG_EVIDENCE: none found since launch"
    }

    $probeName = $Commander.ToLowerInvariant()
    if (-not [string]::IsNullOrWhiteSpace($OutputPrefix)) {
        $probeName = $OutputPrefix
    }
    $probeLog = Save-TextReport -Name ("tmp_{0}_probe" -f $probeName) -Lines $probeLines
}

if (-not [string]::IsNullOrWhiteSpace($ProbeTopBarButtons)) {
    $probeRect = Focus-Sc2Window -Process (Get-Sc2Process)
    foreach ($token in ($ProbeTopBarButtons -split ',' | ForEach-Object { $_.Trim() } | Where-Object { $_ -ne "" })) {
        $index = [int]$token
        # Probe 顶部面板按钮：这里的 index 可以直接改，逐个测试按钮是否可点。
        $point = Get-TopBarButtonPoint -Rect $probeRect -Index $index
        Click-Absolute -X $point[0] -Y $point[1] -DelayMs 900
    }
}

if (-not [string]::IsNullOrWhiteSpace($ProbeCommandCardSlots)) {
    $probeRect = Focus-Sc2Window -Process (Get-Sc2Process)
    foreach ($token in ($ProbeCommandCardSlots -split ',' | ForEach-Object { $_.Trim() } | Where-Object { $_ -ne "" })) {
        $slot = [int]$token
        # Probe 指令卡槽位：这里的 slot 可以直接改，逐个测试技能键是否可点。
        $point = Get-CommandCardPoint -Rect $probeRect -Slot $slot
        Click-Absolute -X $point[0] -Y $point[1] -DelayMs 900
    }
}

# 7) 连续按 Esc：这里是退出当前局面或回到安全状态。
for ($i = 0; $i -lt $EscapeCount; $i++) {
    $proc = Get-Sc2Process
    Focus-Sc2Window -Process $proc | Out-Null
    Send-Escape -DelayMs 900
}

$after = Save-Screenshot -Name $afterName

Write-Output "PID=$($proc.Id)"
Write-Output "WINDOW_RECT=$($rect.Left),$($rect.Top),$($rect.Right - $rect.Left),$($rect.Bottom - $rect.Top)"
Write-Output "BEFORE_SCREENSHOT=$before"
Write-Output "SELECTION_SCREENSHOT=$selection"
Write-Output "MAP_SELECTED_SCREENSHOT=$mapSelected"
Write-Output "AFTER_SCREENSHOT=$after"
Write-Output "COMMANDER=$Commander"
if ($commanderIndex -ne $null) {
    Write-Output "COMMANDER_INDEX=$commanderIndex"
}
Write-Output "MAP_INDEX=$mapIndex"
Write-Output "MAP_POINT=$($mapPoint[0]),$($mapPoint[1])"
Write-Output "DIFFICULTY_POINT=$($difficultyPoint[0]),$($difficultyPoint[1])"
Write-Output "LOAD_WAIT_TARGET_SEC=$($loadWindow.TargetSec)"
Write-Output "LOAD_WAIT_ELAPSED_SEC=$($loadWindow.ElapsedSec)"
Write-Output "LOAD_WAIT_SIGNAL=$($loadWindow.Signal)"
if ($probeLog) {
    Write-Output "LOG_EVIDENCE_REPORT=$probeLog"
}

if ($CaptureLogEvidence -and $Commander -eq 'Abathur') {
    $probeName = $Commander.ToLowerInvariant()
    if (-not [string]::IsNullOrWhiteSpace($OutputPrefix)) {
        $probeName = $OutputPrefix
    }
    $abathurJson = Join-Path $workspace ("tmp_{0}_abathur_debug_{1}.json" -f $probeName, $stamp)
    try {
        & (Join-Path $PSScriptRoot 'parse-latest-abathur-debug-log.ps1') -AsJson | Set-Content -LiteralPath $abathurJson -Encoding UTF8
        Write-Output "ABATHUR_DEBUG_JSON=$abathurJson"
    }
    catch {
        $abathurNote = Save-TextReport -Name ("tmp_{0}_abathur_debug_note" -f $probeName) -Lines @("parse-latest-abathur-debug-log.ps1 failed: $($_.Exception.Message)")
        Write-Output "ABATHUR_DEBUG_NOTE=$abathurNote"
    }
}

if ($CloseGame) {
    Get-Process | Where-Object { $_.ProcessName -like 'SC2*' -or $_.ProcessName -like 'StarCraft*' } | Stop-Process -Force
    Write-Output "GAME_CLOSED=1"
}
