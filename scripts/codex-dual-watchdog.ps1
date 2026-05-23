param(
    [string]$ExecutorHeartbeatPath = (Join-Path $PSScriptRoot "..\runtime\codex\executor-heartbeat.json"),
    [string]$ReviewerHeartbeatPath = (Join-Path $PSScriptRoot "..\runtime\codex\reviewer-heartbeat.json"),
    [int]$StaleAfterMinutes = 12,
    [int]$ReviewerLagMinutes = 20,
    [int]$PollIntervalSeconds = 60,
    [switch]$Once,
    [switch]$Popup
)

$ErrorActionPreference = 'Stop'

$executorPath = [System.IO.Path]::GetFullPath($ExecutorHeartbeatPath)
$reviewerPath = [System.IO.Path]::GetFullPath($ReviewerHeartbeatPath)
$runtimeDir = Split-Path -Parent $executorPath
New-Item -ItemType Directory -Force -Path $runtimeDir | Out-Null

$statusPath = Join-Path $runtimeDir "dual-watchdog-status.json"
$logPath = Join-Path $runtimeDir "dual-watchdog.log"
$recoveryJsonPath = Join-Path $runtimeDir "recovery-context.json"
$recoveryMdPath = Join-Path $runtimeDir "recovery-note.md"

function Write-WatchdogLog {
    param([string]$Message)
    $line = "[{0}] {1}" -f (Get-Date -Format "yyyy-MM-dd HH:mm:ss"), $Message
    Add-Content -LiteralPath $logPath -Value $line -Encoding UTF8
    Write-Output $line
}

function Show-Alert {
    param([string]$Message)
    if (-not $Popup) { return }
    try {
        Add-Type -AssemblyName System.Windows.Forms
        [System.Windows.Forms.MessageBox]::Show($Message, "Codex Dual Watchdog") | Out-Null
    }
    catch {
        Write-WatchdogLog "Popup failed: $($_.Exception.Message)"
    }
}

function Read-HeartbeatInfo {
    param([string]$Path, [string]$Role)

    $info = [ordered]@{
        role = $Role
        path = $Path
        exists = $false
        level = "missing"
        ageMinutes = $null
        owner = ""
        task = ""
        stage = ""
        state = ""
        note = ""
        updatedAt = ""
    }

    if (-not (Test-Path -LiteralPath $Path)) {
        return [pscustomobject]$info
    }

    $file = Get-Item -LiteralPath $Path
    $info.exists = $true
    $info.ageMinutes = [math]::Round(((Get-Date) - $file.LastWriteTime).TotalMinutes, 2)
    $info.updatedAt = $file.LastWriteTime.ToString("o")

    try {
        $json = Get-Content -LiteralPath $Path -Raw -Encoding UTF8 | ConvertFrom-Json
        $info.owner = [string]$json.owner
        $info.task = [string]$json.task
        $info.stage = [string]$json.stage
        $info.state = [string]$json.state
        $info.note = [string]$json.note
        if ($json.updatedAt) {
            $info.updatedAt = [string]$json.updatedAt
        }
    }
    catch {
        $info.level = "invalid"
        $info.note = "parse failed: $($_.Exception.Message)"
        return [pscustomobject]$info
    }

    if ($info.ageMinutes -ge $StaleAfterMinutes) {
        $info.level = "stale"
    }
    else {
        $info.level = "healthy"
    }

    return [pscustomobject]$info
}

function Save-Status {
    param(
        [string]$Level,
        [string]$Message,
        $Executor,
        $Reviewer
    )

    $payload = [ordered]@{
        level = $Level
        message = $Message
        checkedAt = (Get-Date).ToString("o")
        executor = $Executor
        reviewer = $Reviewer
    }
    $json = $payload | ConvertTo-Json -Depth 8
    [System.IO.File]::WriteAllText($statusPath, $json, (New-Object System.Text.UTF8Encoding($false)))
}

function Save-RecoveryContext {
    param(
        [string]$Level,
        [string]$Message,
        $Executor,
        $Reviewer
    )

    $nextAction = if ($Reviewer.note) {
        [string]$Reviewer.note
    }
    elseif ($Executor.note) {
        [string]$Executor.note
    }
    else {
        "Inspect latest executor and reviewer heartbeat notes, then resume the main task from the last concrete stage."
    }

    $payload = [ordered]@{
        level = $Level
        message = $Message
        generatedAt = (Get-Date).ToString("o")
        executor = $Executor
        reviewer = $Reviewer
        suggestedNextAction = $nextAction
        resumeChecklist = @(
            "Read runtime/codex/executor-heartbeat.json",
            "Read runtime/codex/reviewer-heartbeat.json",
            "Read runtime/codex/dual-watchdog.log",
            "Resume the main task from executor.stage",
            "Verify the reviewer concern before declaring progress"
        )
    }
    $json = $payload | ConvertTo-Json -Depth 8
    [System.IO.File]::WriteAllText($recoveryJsonPath, $json, (New-Object System.Text.UTF8Encoding($false)))

    $lines = @(
        "# Codex Recovery Note",
        "",
        "- Generated: $((Get-Date).ToString('yyyy-MM-dd HH:mm:ss zzz'))",
        "- Level: $Level",
        "- Message: $Message",
        "",
        "## Executor",
        "- Task: $($Executor.task)",
        "- Stage: $($Executor.stage)",
        "- State: $($Executor.state)",
        "- Note: $($Executor.note)",
        "- Updated: $($Executor.updatedAt)",
        "",
        "## Reviewer",
        "- Task: $($Reviewer.task)",
        "- Stage: $($Reviewer.stage)",
        "- State: $($Reviewer.state)",
        "- Note: $($Reviewer.note)",
        "- Updated: $($Reviewer.updatedAt)",
        "",
        "## Suggested Next Action",
        $nextAction,
        "",
        "## Resume Checklist",
        "1. Read runtime/codex/executor-heartbeat.json",
        "2. Read runtime/codex/reviewer-heartbeat.json",
        "3. Read runtime/codex/dual-watchdog.log",
        "4. Resume from the executor stage above",
        "5. Prove the next step with fresh evidence, not just planning"
    )
    [System.IO.File]::WriteAllLines($recoveryMdPath, $lines, (New-Object System.Text.UTF8Encoding($false)))
}

function Evaluate-Status {
    $executor = Read-HeartbeatInfo -Path $executorPath -Role "executor"
    $reviewer = Read-HeartbeatInfo -Path $reviewerPath -Role "reviewer"

    $level = "healthy"
    $reasons = New-Object System.Collections.Generic.List[string]

    if ($executor.level -ne "healthy") {
        $level = "error"
        $reasons.Add("executor=$($executor.level)")
    }

    if ($reviewer.level -eq "invalid" -or $reviewer.level -eq "stale" -or $reviewer.level -eq "missing") {
        if ($level -ne "error") { $level = "warning" }
        $reasons.Add("reviewer=$($reviewer.level)")
    }

    if ($executor.task -and $reviewer.task -and $executor.task -ne $reviewer.task) {
        if ($level -eq "healthy") { $level = "warning" }
        $reasons.Add("task-mismatch")
    }

    if ($reviewer.state -in @("drift", "blocked", "escalate", "attention")) {
        if ($level -ne "error") { $level = "warning" }
        $reasons.Add("reviewer-state=$($reviewer.state)")
    }

    if ($executor.exists -and $reviewer.exists -and $reviewer.level -eq "healthy") {
        $executorTime = Get-Date $executor.updatedAt
        $reviewerTime = Get-Date $reviewer.updatedAt
        $lag = [math]::Round(($executorTime - $reviewerTime).TotalMinutes, 2)
        if ($lag -gt $ReviewerLagMinutes) {
            if ($level -eq "healthy") { $level = "warning" }
            $reasons.Add("reviewer-lag=${lag}m")
        }
    }

    if ($reasons.Count -eq 0) {
        $message = "healthy executor=$($executor.state)/$($executor.stage) reviewer=$($reviewer.state)/$($reviewer.stage)"
    }
    else {
        $message = ($reasons -join "; ")
    }

    Save-Status -Level $level -Message $message -Executor $executor -Reviewer $reviewer
    Write-WatchdogLog ("dual status {0}: {1}" -f $level, $message)

    if ($level -ne "healthy") {
        Save-RecoveryContext -Level $level -Message $message -Executor $executor -Reviewer $reviewer
        $alert = @(
            "Codex dual watchdog alert"
            "level: $level"
            "executor: $($executor.level) $($executor.task) $($executor.stage) $($executor.state)"
            "reviewer: $($reviewer.level) $($reviewer.task) $($reviewer.stage) $($reviewer.state)"
            "message: $message"
        ) -join "`n"
        Show-Alert $alert
    }
}

Write-WatchdogLog "dual watchdog started: executor=$executorPath reviewer=$reviewerPath staleAfter=${StaleAfterMinutes}m"

while ($true) {
    Evaluate-Status
    if ($Once) { break }
    Start-Sleep -Seconds $PollIntervalSeconds
}
