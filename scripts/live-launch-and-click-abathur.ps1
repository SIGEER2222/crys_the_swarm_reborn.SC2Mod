param(
    [string]$MapClick = '自由日',
    [int]$InitialLoadWaitMs = 15000,
    [int]$EscapeCount = 20
)

$ErrorActionPreference = 'Stop'

$scriptDir = Split-Path -Parent $PSCommandPath
$target = Join-Path $scriptDir 'live-verify-abathur.ps1'

& $target `
    -LaunchGame `
    -RestartExisting `
    -CloseGame `
    -MapClick $MapClick `
    -InitialLoadWaitMs $InitialLoadWaitMs `
    -EscapeCount $EscapeCount
