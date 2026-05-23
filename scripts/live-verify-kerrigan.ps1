param(
    [string]$MapName = "thanson03b.SC2Map",
    [switch]$Prepare = $true,
    [switch]$LaunchGame = $true,
    [switch]$RestartExisting = $true,
    [switch]$CloseGame = $true,
    [int]$InitialLoadWaitMs = 12000,
    [int]$MapEntryTimeoutSec = 180,
    [int]$PollIntervalMs = 2000,
    [int]$EscapeCount = 12,
    [switch]$ClickCommandCard = $true,
    [string]$CommandCardSlots = "7,9,11,15",
    [int]$PostEntryWaitMs = 2000,
    [string]$WorkspaceRoot = (Split-Path -Parent $PSScriptRoot),
    [string]$LiveRoot = "E:\SC2\SC2new\StarCraft II",
    [string]$Sc2SwitcherPath = "E:\SC2\SC2new\StarCraft II\Support64\SC2Switcher_x64.exe"
)

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "live-verify-alarak.ps1") `
    -MapName $MapName `
    -Commander "Kerrigan" `
    -OutputPrefix "kerrigan" `
    -Prepare:$Prepare `
    -LaunchGame:$LaunchGame `
    -RestartExisting:$RestartExisting `
    -CloseGame:$CloseGame `
    -InitialLoadWaitMs $InitialLoadWaitMs `
    -MapEntryTimeoutSec $MapEntryTimeoutSec `
    -PollIntervalMs $PollIntervalMs `
    -EscapeCount $EscapeCount `
    -ClickCommandCard:$ClickCommandCard `
    -CommandCardSlots $CommandCardSlots `
    -PostEntryWaitMs $PostEntryWaitMs `
    -WorkspaceRoot $WorkspaceRoot `
    -LiveRoot $LiveRoot `
    -Sc2SwitcherPath $Sc2SwitcherPath
