param(
    [string]$HeartbeatPath = (Join-Path $PSScriptRoot "..\runtime\codex\heartbeat.json"),
    [string]$Task = "",
    [string]$Stage = "",
    [string]$State = "working",
    [string]$Note = "",
    [string]$Owner = "codex"
)

$ErrorActionPreference = 'Stop'

$resolved = [System.IO.Path]::GetFullPath($HeartbeatPath)
$dir = Split-Path -Parent $resolved
New-Item -ItemType Directory -Force -Path $dir | Out-Null

$payload = [ordered]@{
    owner      = $Owner
    task       = $Task
    stage      = $Stage
    state      = $State
    note       = $Note
    updatedAt  = (Get-Date).ToString("o")
    machine    = $env:COMPUTERNAME
    user       = $env:USERNAME
    pid        = $PID
    cwd        = (Get-Location).Path
}

$json = $payload | ConvertTo-Json -Depth 4
[System.IO.File]::WriteAllText($resolved, $json, (New-Object System.Text.UTF8Encoding($false)))

Write-Output "HEARTBEAT_UPDATED=$resolved"
Write-Output "STATE=$State"
if ($Task) { Write-Output "TASK=$Task" }
if ($Stage) { Write-Output "STAGE=$Stage" }
if ($Note) { Write-Output "NOTE=$Note" }
