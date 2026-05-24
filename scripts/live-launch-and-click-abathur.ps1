param(
    [string]$Commander = 'Abathur',
    [string]$MapClick = '1',
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
    -Commander $Commander `
    -MapClick $MapClick `
    -InitialLoadWaitMs $InitialLoadWaitMs `
    -EscapeCount $EscapeCount
