param(
    [ValidateSet("install", "uninstall", "status", "run-dual-once", "run-single-once")]
    [string]$Action = "status",
    [ValidateSet("dual", "single")]
    [string]$Mode = "dual",
    [string]$TaskName = "CodexDualWatchdog",
    [int]$IntervalMinutes = 5,
    [int]$StaleAfterMinutes = 12,
    [int]$ReviewerLagMinutes = 20,
    [int]$MissingGraceMinutes = 5,
    [switch]$Popup,
    [string]$HeartbeatPath = (Join-Path $PSScriptRoot "..\runtime\codex\heartbeat.json"),
    [string]$ExecutorHeartbeatPath = (Join-Path $PSScriptRoot "..\runtime\codex\executor-heartbeat.json"),
    [string]$ReviewerHeartbeatPath = (Join-Path $PSScriptRoot "..\runtime\codex\reviewer-heartbeat.json")
)

$ErrorActionPreference = "Stop"
$script:SelfPath = if ($PSCommandPath) {
    [System.IO.Path]::GetFullPath($PSCommandPath)
}
else {
    [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot "codex-watchdog-task.ps1"))
}

function Resolve-PowerShellPath {
    $pwsh = Get-Command pwsh -ErrorAction SilentlyContinue
    if ($pwsh) {
        return $pwsh.Source
    }

    $powershell = Get-Command powershell.exe -ErrorAction SilentlyContinue
    if ($powershell) {
        return $powershell.Source
    }

    throw "Neither pwsh nor powershell.exe was found."
}

function Get-QuotedArgument {
    param([string]$Value)

    if ($null -eq $Value) {
        return '""'
    }

    return '"' + $Value.Replace('"', '\"') + '"'
}

function New-WatchdogArgumentList {
    param(
        [ValidateSet("dual", "single")]
        [string]$Mode
    )

    if ($Mode -eq "dual") {
        $scriptPath = Join-Path $PSScriptRoot "codex-dual-watchdog.ps1"
        $parts = @(
            "-NoProfile"
            "-ExecutionPolicy", "Bypass"
            "-File", (Get-QuotedArgument $scriptPath)
            "-ExecutorHeartbeatPath", (Get-QuotedArgument ([System.IO.Path]::GetFullPath($ExecutorHeartbeatPath)))
            "-ReviewerHeartbeatPath", (Get-QuotedArgument ([System.IO.Path]::GetFullPath($ReviewerHeartbeatPath)))
            "-StaleAfterMinutes", $StaleAfterMinutes
            "-ReviewerLagMinutes", $ReviewerLagMinutes
            "-Once"
        )
    }
    else {
        $scriptPath = Join-Path $PSScriptRoot "codex-watchdog.ps1"
        $parts = @(
            "-NoProfile"
            "-ExecutionPolicy", "Bypass"
            "-File", (Get-QuotedArgument $scriptPath)
            "-HeartbeatPath", (Get-QuotedArgument ([System.IO.Path]::GetFullPath($HeartbeatPath)))
            "-StaleAfterMinutes", $StaleAfterMinutes
            "-MissingGraceMinutes", $MissingGraceMinutes
            "-Once"
        )
    }

    if ($Popup) {
        $parts += "-Popup"
    }

    return ($parts -join " ")
}

function New-ScheduledTaskCommandLine {
    param(
        [ValidateSet("dual", "single")]
        [string]$Mode
    )

    $psPath = Resolve-PowerShellPath
    $actionName = if ($Mode -eq "dual") { "run-dual-once" } else { "run-single-once" }

    $parts = @(
        Get-QuotedArgument $psPath
        "-NoProfile"
        "-ExecutionPolicy", "Bypass"
        "-File", (Get-QuotedArgument $script:SelfPath)
        "-Action", $actionName
    )

    if ($Popup) {
        $parts += "-Popup"
    }

    return ($parts -join " ")
}

function Install-ScheduledWatchdog {
    param(
        [ValidateSet("dual", "single")]
        [string]$Mode
    )

    if ($IntervalMinutes -lt 1) {
        throw "IntervalMinutes must be at least 1."
    }

    $taskFullName = "Codex\$TaskName"
    $commandLine = New-ScheduledTaskCommandLine -Mode $Mode

    $createArgs = @(
        "/Create"
        "/F"
        "/SC", "MINUTE"
        "/MO", $IntervalMinutes
        "/TN", $taskFullName
        "/TR", $commandLine
        "/RL", "LIMITED"
    )

    $createOutput = & schtasks.exe @createArgs 2>&1
    if ($LASTEXITCODE -ne 0) {
        throw "schtasks create failed: $($createOutput -join [Environment]::NewLine)"
    }

    $runOutput = & schtasks.exe /Run /TN $taskFullName 2>&1
    if ($LASTEXITCODE -ne 0) {
        throw "schtasks run failed: $($runOutput -join [Environment]::NewLine)"
    }

    Write-Output "Installed scheduled task $taskFullName"
}

function Remove-ScheduledWatchdog {
    $taskFullName = "Codex\$TaskName"
    $queryOutput = & schtasks.exe /Query /TN $taskFullName 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Output "Scheduled task not found: $taskFullName"
        return
    }

    $deleteOutput = & schtasks.exe /Delete /TN $taskFullName /F 2>&1
    if ($LASTEXITCODE -ne 0) {
        throw "schtasks delete failed: $($deleteOutput -join [Environment]::NewLine)"
    }
    Write-Output "Removed scheduled task $taskFullName"
}

function Show-ScheduledWatchdogStatus {
    $taskFullName = "Codex\$TaskName"
    $queryOutput = & schtasks.exe /Query /TN $taskFullName /V /FO LIST 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Output "Scheduled task not found: Codex\$TaskName"
        return
    }

    $queryOutput | Write-Output
}

switch ($Action) {
    "install" {
        Install-ScheduledWatchdog -Mode $Mode
    }
    "uninstall" {
        Remove-ScheduledWatchdog
    }
    "status" {
        Show-ScheduledWatchdogStatus
    }
    "run-dual-once" {
        & (Join-Path $PSScriptRoot "codex-dual-watchdog.ps1") `
            -ExecutorHeartbeatPath $ExecutorHeartbeatPath `
            -ReviewerHeartbeatPath $ReviewerHeartbeatPath `
            -StaleAfterMinutes $StaleAfterMinutes `
            -ReviewerLagMinutes $ReviewerLagMinutes `
            -Once `
            -Popup:$Popup
    }
    "run-single-once" {
        & (Join-Path $PSScriptRoot "codex-watchdog.ps1") `
            -HeartbeatPath $HeartbeatPath `
            -StaleAfterMinutes $StaleAfterMinutes `
            -MissingGraceMinutes $MissingGraceMinutes `
            -Once `
            -Popup:$Popup
    }
}
