param(
    [string]$MapName = "thanson01.SC2Map",
    [switch]$Prepare = $true,
    [switch]$LaunchGame = $true,
    [switch]$RestartExisting = $true,
    [switch]$CloseGame = $true,
    [int]$InitialLoadWaitMs = 16000,
    [int]$MapEntryTimeoutSec = 180,
    [int]$PollIntervalMs = 2000,
    [int]$EscapeCount = 12,
    [switch]$SelectHero = $true,
    [double[]]$HeroSelectRatio = @(0.974, 0.683),
    [string]$KeySequence = "",
    [switch]$ClickCommandCard = $true,
    [string]$CommandCardSlots = "7",
    [string]$TargetClicks = "0.50,0.50",
    [int]$PostEntryWaitMs = 3500,
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
    -SelectHero:$SelectHero `
    -HeroSelectRatio $HeroSelectRatio `
    -KeySequence $KeySequence `
    -ClickCommandCard:$ClickCommandCard `
    -CommandCardSlots $CommandCardSlots `
    -TargetClicks $TargetClicks `
    -PostEntryWaitMs $PostEntryWaitMs `
    -WorkspaceRoot $WorkspaceRoot `
    -LiveRoot $LiveRoot `
    -Sc2SwitcherPath $Sc2SwitcherPath
