param(
    [string]$GameLogsPath = (Join-Path $env:USERPROFILE 'Documents\StarCraft II\GameLogs'),
    [int]$RecentFiles = 8,
    [switch]$AsJson
)

$ErrorActionPreference = 'Stop'

if (-not (Test-Path -LiteralPath $GameLogsPath)) {
    throw "GameLogs path not found: $GameLogsPath"
}

$latestWithDebug = Get-ChildItem -LiteralPath $GameLogsPath -File -ErrorAction SilentlyContinue |
    Sort-Object LastWriteTime -Descending |
    Select-Object -First $RecentFiles |
    Where-Object { Select-String -LiteralPath $_.FullName -Pattern '\[XM_ABA\]' -Quiet } |
    Select-Object -First 1

if (-not $latestWithDebug) {
    Write-Output "No [XM_ABA] debug lines found in latest $RecentFiles GameLogs files. Launch an Abathur mission once, then rerun this script."
    exit 2
}

& "$PSScriptRoot\parse-abathur-debug-log.ps1" -LogPath $latestWithDebug.FullName -AsJson:$AsJson
