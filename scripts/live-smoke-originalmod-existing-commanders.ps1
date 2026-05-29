param(
    [string]$WorkspaceRoot = (Split-Path -Parent $PSScriptRoot),
    [string]$ScenarioRoot = "",
    [string]$LiveRoot = "E:\SC2\SC2new\StarCraft II",
    [string]$Sc2SwitcherPath = "",
    [string]$MapPath = "",
    [string]$OutputRoot = "",
    [string[]]$Commanders = @("Nova", "Dehaka"),
    [int]$MapLoadWaitSec = 18,
    [int]$CommanderSettleMs = 400,
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

    if (-not $Process) {
        return
    }

    $hwnd = [IntPtr]$Process.MainWindowHandle

    if ($hwnd -eq [IntPtr]::Zero) {
        return
    }

    # 不再使用：
    # ShowWindowAsync
    # BringWindowToTop
    # 避免 SC2 DX11 全屏反复重建

    [XmUiSmoke]::SetForegroundWindow($hwnd) | Out-Null

    Start-Sleep -Milliseconds 100

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
        [System.Diagnostics.Process]$Process,
        [string]$Command,
        [int]$DelayMs = 200
    )

    # 仅输入前激活一次窗口
    Focus-Window -Process $Process | Out-Null

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

    $proc = Start-Process `
        -FilePath $AutoHotkeyPath `
        -ArgumentList @(
            $helperScript,
            $Command,
            "$DelayMs"
        ) `
        -RedirectStandardOutput $stdoutPath `
        -RedirectStandardError $stderrPath `
        -PassThru `
        -Wait `
        -WindowStyle Hidden

    if ($proc.ExitCode -ne 0) {

        $stdout = ""
        $stderr = ""

        if (Test-Path $stdoutPath) {
            $stdout = (Get-Content $stdoutPath -Raw).Trim()
        }

        if (Test-Path $stderrPath) {
            $stderr = (Get-Content $stderrPath -Raw).Trim()
        }

        throw "AutoHotkey failed. stdout=$stdout stderr=$stderr"
    }
}

function Get-CommanderChatCommand {
    param([string]$Commander)

    switch ($Commander.ToLowerInvariant()) {
        "abathur" { return "-tbabathur" }
        "abathurreborn" { return "-tbabathurreborn" }
        "alarak" { return "-tbalarak" }
        "artanis" { return "-tbartanis" }
        "dehaka" { return "-tbdehaka" }
        "fenix" { return "-tbfenix" }
        "karax" { return "-tbkarax" }
        "kerrigan" { return "-tbkerrigan" }
        "nova" { return "-tbnova" }
        "raynor" { return "-tbraynor" }
        "vorazun" { return "-tbvorazun" }
        "zagara" { return "-tbzagara" }
        "zeratul" { return "-tbzeratul" }
        default { throw "No direct chat trigger is defined for commander '$Commander'." }
    }
}

function Get-TestBenchBankPath {
    return (Join-Path $env:USERPROFILE "Documents\StarCraft II\Banks\CampaignXCore.SC2Bank")
}

function Get-TestBenchBankSection {
    param(
        [string]$Commander,
        [string]$Scenario
    )

    return ("TestBench_{0}_{1}" -f $Commander, $Scenario)
}

function Get-TestBenchBankReport {
    param(
        [string]$BankPath,
        [string]$Commander,
        [string]$Scenario
    )

    if (-not (Test-Path -LiteralPath $BankPath)) {
        return $null
    }

    [xml]$bankXml = Get-Content -LiteralPath $BankPath -Raw
    $sectionName = Get-TestBenchBankSection -Commander $Commander -Scenario $Scenario
    $section = @($bankXml.Bank.Section | Where-Object { $_.name -eq $sectionName }) | Select-Object -First 1
    if (-not $section) {
        return $null
    }

    $keyMap = @{}
    foreach ($key in @($section.Key)) {
        if ($key.Value.string) {
            $keyMap[$key.name] = [string]$key.Value.string
            continue
        }
        if ($key.Value.int) {
            $keyMap[$key.name] = [int]$key.Value.int
            continue
        }
        $keyMap[$key.name] = ""
    }

    $requested = @()
    $actual = @()
    $missing = @()
    if (-not [string]::IsNullOrWhiteSpace($keyMap["RequestedIds"])) {
        $requested = @($keyMap["RequestedIds"].Split(',') | Where-Object { $_ -ne "" })
    }
    if (-not [string]::IsNullOrWhiteSpace($keyMap["ActualIds"])) {
        $actual = @($keyMap["ActualIds"].Split(',') | Where-Object { $_ -ne "" })
    }
    if (-not [string]::IsNullOrWhiteSpace($keyMap["MissingIds"])) {
        $missing = @($keyMap["MissingIds"].Split(',') | Where-Object { $_ -ne "" })
    }

    $pairs = @()
    $maxCount = [Math]::Max($requested.Count, $actual.Count)
    for ($i = 0; $i -lt $maxCount; $i++) {
        $expectedId = if ($i -lt $requested.Count) { $requested[$i] } else { "" }
        $actualId = if ($i -lt $actual.Count) { $actual[$i] } else { "" }
        $pairs += [pscustomobject]@{
            序号 = $i + 1
            预期单位ID = $expectedId
            实际创建对象 = $actualId
            是否一致 = [bool]($expectedId -ne "" -and $expectedId -eq $actualId)
        }
    }

    return [pscustomobject]@{
        SectionName = $sectionName
        Commander = [string]$keyMap["Commander"]
        Normalized = [string]$keyMap["Normalized"]
        Scenario = [string]$keyMap["Scenario"]
        Summary = [string]$keyMap["Summary"]
        Trace = [string]$keyMap["Trace"]
        RequestedIds = $requested
        ActualIds = $actual
        MissingIds = $missing
        Created = [int]$keyMap["Created"]
        Missing = [int]$keyMap["Missing"]
        Warnings = [int]$keyMap["Warnings"]
        Errors = [int]$keyMap["Errors"]
        LastEvent = [string]$keyMap["LastEvent"]
        Pairs = $pairs
    }
}

function Export-TestBenchBankReport {
    param(
        [string]$CommanderRoot,
        [pscustomobject]$Report
    )

    if (-not $Report) {
        return $null
    }

    $jsonPath = Join-Path $CommanderRoot ("testbench-{0}.json" -f $Report.Scenario)
    $csvPath = Join-Path $CommanderRoot ("testbench-{0}.csv" -f $Report.Scenario)
    $mdPath = Join-Path $CommanderRoot ("testbench-{0}.md" -f $Report.Scenario)

    $payload = [pscustomobject]@{
        指挥官 = $Report.Commander
        归一化指挥官 = $Report.Normalized
        场景 = $Report.Scenario
        摘要 = $Report.Summary
        追踪 = $Report.Trace
        创建数 = $Report.Created
        缺失数 = $Report.Missing
        警告数 = $Report.Warnings
        错误数 = $Report.Errors
        最后事件 = $Report.LastEvent
        缺失ID = @($Report.MissingIds)
        对照 = @($Report.Pairs)
    }
    $payload | ConvertTo-Json -Depth 6 | Set-Content -LiteralPath $jsonPath -Encoding UTF8
    @($Report.Pairs) | Export-Csv -LiteralPath $csvPath -NoTypeInformation -Encoding UTF8

    $lines = New-Object System.Collections.Generic.List[string]
    $lines.Add("# $($Report.Commander) - $($Report.Scenario)") | Out-Null
    $lines.Add("") | Out-Null
    $lines.Add("- 摘要：$($Report.Summary)") | Out-Null
    if (-not [string]::IsNullOrWhiteSpace($Report.Trace)) {
        $lines.Add("- 追踪：$($Report.Trace)") | Out-Null
    }
    $lines.Add("- 创建数：$($Report.Created)") | Out-Null
    $lines.Add("- 缺失数：$($Report.Missing)") | Out-Null
    $lines.Add("- 警告数：$($Report.Warnings)") | Out-Null
    $lines.Add("- 错误数：$($Report.Errors)") | Out-Null
    if ($Report.MissingIds.Count -gt 0) {
        $lines.Add("- 缺失ID：$([string]::Join(', ', $Report.MissingIds))") | Out-Null
    }
    $lines.Add("") | Out-Null
    $lines.Add("| 序号 | 预期单位ID | 实际创建对象 | 是否一致 |") | Out-Null
    $lines.Add("| --- | --- | --- | --- |") | Out-Null
    foreach ($pair in @($Report.Pairs)) {
        $matchText = if ($pair.是否一致) { "是" } else { "否" }
        $lines.Add("| $($pair.序号) | $($pair.预期单位ID) | $($pair.实际创建对象) | $matchText |") | Out-Null
    }
    Set-Content -LiteralPath $mdPath -Value $lines -Encoding UTF8

    return [pscustomobject]@{
        JsonPath = $jsonPath
        CsvPath = $csvPath
        MarkdownPath = $mdPath
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
$BankPath = Get-TestBenchBankPath

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
    $cleanupNeeded = $false

    try {
        Stop-Sc2

        & $Sc2SwitcherPath $MapPath
        $cleanupNeeded = $true
        Start-Sleep -Seconds 2

        $sc2Process = Wait-Sc2Window -TimeoutSec 80
        Focus-Window -Process $sc2Process | Out-Null
        Start-Sleep -Seconds $MapLoadWaitSec

        $beforeShot = Join-Path $commanderRoot ("{0}_before.png" -f $safeName)
        Focus-Window -Process $sc2Process | Out-Null
        Save-Screenshot -Path $beforeShot -Process $sc2Process

        Focus-Window -Process $sc2Process | Out-Null
        $commanderCommand = Get-CommanderChatCommand -Commander $commander
        Send-ChatCommand -Process $sc2Process -Command $commanderCommand -DelayMs $CommanderSettleMs

        $selectedShot = Join-Path $commanderRoot ("{0}_selected.png" -f $safeName)
        Focus-Window -Process $sc2Process | Out-Null
        Save-Screenshot -Path $selectedShot -Process $sc2Process

        $afterSmokeShot = Join-Path $commanderRoot ("{0}_after_smoke.png" -f $safeName)
        $afterBuildingsShot = Join-Path $commanderRoot ("{0}_after_full_buildings.png" -f $safeName)
        $afterUnitsShot = Join-Path $commanderRoot ("{0}_after_full_units.png" -f $safeName)

        $commandPlan = @(
            @{ Name = "smoke"; Command = $SmokeCommand; DelayMs = 200; WaitSec = $SmokeWaitSec; Screenshot = $afterSmokeShot },
            @{ Name = "full_buildings"; Command = $FullBuildingsCommand; DelayMs = 200; WaitSec = $FullRosterWaitSec; Screenshot = $afterBuildingsShot },
            @{ Name = "full_units"; Command = $FullUnitsCommand; DelayMs = 200; WaitSec = $FullRosterWaitSec; Screenshot = $afterUnitsShot }
        )

        foreach ($step in $commandPlan) {
            Send-ChatCommand `
                -Process $sc2Process `
                -Command $step.Command `
                -DelayMs $step.DelayMs

            Start-Sleep -Seconds $step.WaitSec

            Save-Screenshot `
                -Path $step.Screenshot `
                -Process $sc2Process
        }

        if (-not $KeepOpen) {
            Stop-Sc2
            $cleanupNeeded = $false
            Start-Sleep -Seconds 2
        }

        $graphicsLog = Copy-LatestLog -Since $startTime -Filter "*Graphics.txt" -TargetPath (Join-Path $commanderRoot "Graphics.txt")
        $systemInfoLog = Copy-LatestLog -Since $startTime -Filter "*SystemInfo.txt" -TargetPath (Join-Path $commanderRoot "SystemInfo.txt")
        $alertsLog = Copy-LatestLog -Since $startTime -Filter "*Alerts.txt" -TargetPath (Join-Path $commanderRoot "Alerts.txt")
        $scriptErrorLog = Copy-LatestLog -Since $startTime -Filter "*ScriptError.txt" -TargetPath (Join-Path $commanderRoot "ScriptError.txt")
        $xmlAlertsLog = Copy-LatestLog -Since $startTime -Filter "*XMLAlerts.txt" -TargetPath (Join-Path $commanderRoot "XMLAlerts.txt")

        if (Test-Path -LiteralPath $BankPath) {
            Copy-Item -LiteralPath $BankPath -Destination (Join-Path $commanderRoot "CampaignXCore.SC2Bank") -Force
        }

        $buildingReport = Get-TestBenchBankReport -BankPath $BankPath -Commander $commander -Scenario "full_buildings"
        $unitReport = Get-TestBenchBankReport -BankPath $BankPath -Commander $commander -Scenario "full_units"
        $buildingReportFiles = Export-TestBenchBankReport -CommanderRoot $commanderRoot -Report $buildingReport
        $unitReportFiles = Export-TestBenchBankReport -CommanderRoot $commanderRoot -Report $unitReport

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
            XmlAlertsLog = $(if ($xmlAlertsLog) { $xmlAlertsLog } else { "" })
            SmokeCommand = $SmokeCommand
            FullBuildingsCommand = $FullBuildingsCommand
            FullUnitsCommand = $FullUnitsCommand
            FullBuildingsMarkdown = $(if ($buildingReportFiles) { $buildingReportFiles.MarkdownPath } else { "" })
            FullBuildingsJson = $(if ($buildingReportFiles) { $buildingReportFiles.JsonPath } else { "" })
            FullBuildingsCsv = $(if ($buildingReportFiles) { $buildingReportFiles.CsvPath } else { "" })
            FullUnitsMarkdown = $(if ($unitReportFiles) { $unitReportFiles.MarkdownPath } else { "" })
            FullUnitsJson = $(if ($unitReportFiles) { $unitReportFiles.JsonPath } else { "" })
            FullUnitsCsv = $(if ($unitReportFiles) { $unitReportFiles.CsvPath } else { "" })
        }) | Out-Null
    }
    finally {
        if ($cleanupNeeded -and (-not $KeepOpen)) {
            Stop-Sc2
        }
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
    Write-Output ("XML_ALERTS_LOG={0}" -f $result.XmlAlertsLog)
    Write-Output ("FULL_BUILDINGS_MD={0}" -f $result.FullBuildingsMarkdown)
    Write-Output ("FULL_BUILDINGS_JSON={0}" -f $result.FullBuildingsJson)
    Write-Output ("FULL_BUILDINGS_CSV={0}" -f $result.FullBuildingsCsv)
    Write-Output ("FULL_UNITS_MD={0}" -f $result.FullUnitsMarkdown)
    Write-Output ("FULL_UNITS_JSON={0}" -f $result.FullUnitsJson)
    Write-Output ("FULL_UNITS_CSV={0}" -f $result.FullUnitsCsv)
}

Write-Output "VERIFICATION_READY=1"
