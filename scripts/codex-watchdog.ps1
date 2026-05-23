param(
    [string]$HeartbeatPath = (Join-Path $PSScriptRoot "..\runtime\codex\heartbeat.json"),
    [int]$StaleAfterMinutes = 12,
    [int]$PollIntervalSeconds = 60,
    [int]$MissingGraceMinutes = 5,
    [switch]$Once,
    [switch]$Popup
)

$ErrorActionPreference = 'Stop'

$resolvedHeartbeat = [System.IO.Path]::GetFullPath($HeartbeatPath)
$runtimeDir = Split-Path -Parent $resolvedHeartbeat
New-Item -ItemType Directory -Force -Path $runtimeDir | Out-Null

$statusPath = Join-Path $runtimeDir "watchdog-status.json"
$logPath = Join-Path $runtimeDir "watchdog.log"

function Write-WatchdogLog {
    param([string]$Message)
    $line = "[{0}] {1}" -f (Get-Date -Format "yyyy-MM-dd HH:mm:ss"), $Message
    Add-Content -LiteralPath $logPath -Value $line -Encoding UTF8
    Write-Output $line
}

function Save-Status {
    param(
        [string]$Level,
        [string]$Message,
        [hashtable]$Extra = @{}
    )
    $payload = [ordered]@{
        level      = $Level
        message    = $Message
        checkedAt  = (Get-Date).ToString("o")
        heartbeat  = $resolvedHeartbeat
    }
    foreach ($key in $Extra.Keys) {
        $payload[$key] = $Extra[$key]
    }
    $json = $payload | ConvertTo-Json -Depth 6
    [System.IO.File]::WriteAllText($statusPath, $json, (New-Object System.Text.UTF8Encoding($false)))
}

function Show-Alert {
    param([string]$Message)
    if (-not $Popup) { return }
    try {
        Add-Type -AssemblyName System.Windows.Forms
        [System.Windows.Forms.MessageBox]::Show($Message, "Codex Watchdog") | Out-Null
    }
    catch {
        Write-WatchdogLog "Popup failed: $($_.Exception.Message)"
    }
}

function Read-Heartbeat {
    if (-not (Test-Path -LiteralPath $resolvedHeartbeat)) {
        return $null
    }
    try {
        return (Get-Content -LiteralPath $resolvedHeartbeat -Raw -Encoding UTF8 | ConvertFrom-Json)
    }
    catch {
        Write-WatchdogLog "Heartbeat parse failed: $($_.Exception.Message)"
        return $null
    }
}

function Check-Heartbeat {
    $now = Get-Date

    if (-not (Test-Path -LiteralPath $resolvedHeartbeat)) {
        $msg = "heartbeat missing: $resolvedHeartbeat"
        Save-Status -Level "missing" -Message $msg -Extra @{
            staleMinutes = $null
            state = $null
        }
        Write-WatchdogLog $msg
        return "missing"
    }

    $file = Get-Item -LiteralPath $resolvedHeartbeat
    $ageMinutes = [math]::Round(($now - $file.LastWriteTime).TotalMinutes, 2)
    $heartbeat = Read-Heartbeat
    $state = if ($heartbeat -and $heartbeat.state) { [string]$heartbeat.state } else { "" }
    $task = if ($heartbeat -and $heartbeat.task) { [string]$heartbeat.task } else { "" }
    $stage = if ($heartbeat -and $heartbeat.stage) { [string]$heartbeat.stage } else { "" }
    $note = if ($heartbeat -and $heartbeat.note) { [string]$heartbeat.note } else { "" }

    if ($ageMinutes -ge $StaleAfterMinutes) {
        $msg = "heartbeat stale: age=${ageMinutes}m state=$state task=$task stage=$stage"
        Save-Status -Level "stale" -Message $msg -Extra @{
            staleMinutes = $ageMinutes
            state = $state
            task = $task
            stage = $stage
            note = $note
            updatedAt = $file.LastWriteTime.ToString("o")
        }
        Write-WatchdogLog $msg
        Show-Alert "Codex heartbeat stale`n$task`n$stage`n$note"
        return "stale"
    }

    $msg = "heartbeat healthy: age=${ageMinutes}m state=$state task=$task stage=$stage"
    Save-Status -Level "healthy" -Message $msg -Extra @{
        staleMinutes = $ageMinutes
        state = $state
        task = $task
        stage = $stage
        note = $note
        updatedAt = $file.LastWriteTime.ToString("o")
    }
    Write-WatchdogLog $msg
    return "healthy"
}

Write-WatchdogLog "watchdog started: heartbeat=$resolvedHeartbeat staleAfter=${StaleAfterMinutes}m interval=${PollIntervalSeconds}s"

$lastState = ""
$missingSince = $null
while ($true) {
    $state = Check-Heartbeat

    if ($state -eq "missing") {
        if ($null -eq $missingSince) {
            $missingSince = Get-Date
        }
        if (((Get-Date) - $missingSince).TotalMinutes -ge $MissingGraceMinutes) {
            Show-Alert "Codex heartbeat still missing after ${MissingGraceMinutes}m`n$resolvedHeartbeat"
        }
    }
    else {
        $missingSince = $null
    }

    if ($state -ne $lastState -and $lastState -eq "stale" -and $state -eq "healthy") {
        Write-WatchdogLog "heartbeat recovered"
    }
    $lastState = $state

    if ($Once) { break }
    Start-Sleep -Seconds $PollIntervalSeconds
}
