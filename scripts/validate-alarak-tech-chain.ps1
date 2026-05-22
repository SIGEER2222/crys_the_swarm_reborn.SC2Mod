param(
    [string]$WorkspaceRoot = (Split-Path -Parent $PSScriptRoot)
)

$ErrorActionPreference = "Stop"

$projectRoot = Get-Item -LiteralPath $WorkspaceRoot
$scenarioRoot = Get-ChildItem -LiteralPath $projectRoot.FullName -Directory | Where-Object {
    Test-Path -LiteralPath (Join-Path $_.FullName "Mods\XM\XMAlarak.SC2Mod")
} | Select-Object -First 1

if (-not $scenarioRoot) {
    throw "Unable to locate scenario root containing Mods\XM\XMAlarak.SC2Mod under $($projectRoot.FullName)"
}

$gameDataRoot = Join-Path $scenarioRoot.FullName "Mods\XM\XMAlarak.SC2Mod\Base.SC2Data\GameData"
$unitPath = Join-Path $gameDataRoot "UnitData.xml"
$abilPath = Join-Path $gameDataRoot "AbilData.xml"
$buttonPath = Join-Path $gameDataRoot "ButtonData.xml"
$upgradePath = Join-Path $gameDataRoot "UpgradeData.xml"

$errors = [System.Collections.Generic.List[string]]::new()
function Add-Error { param([string]$Message) $errors.Add($Message) | Out-Null }

function Read-Catalog {
    param([string]$Path)
    if (-not (Test-Path -LiteralPath $Path)) {
        Add-Error "Missing file: $Path"
        return $null
    }
    return [xml](Get-Content -LiteralPath $Path -Raw)
}

function Get-NodeById {
    param($Doc, [string]$Id)
    if (-not $Doc) { return $null }
    return $Doc.Catalog.ChildNodes | Where-Object { $_.NodeType -eq "Element" -and $_.id -eq $Id } | Select-Object -First 1
}

$unitDoc = Read-Catalog $unitPath
$abilDoc = Read-Catalog $abilPath
$buttonDoc = Read-Catalog $buttonPath
$upgradeDoc = Read-Catalog $upgradePath

$coreUnits = @(
    "AlarakCoop", "AlarakRushPlaceholder", "AlarakSupplicantWarpTrainCreator", "HighTemplarTaldarim", "ImmortalTaldarim", "ColossusTaldarim", "CarrierTaldarim", "SOAMothership"
)
$coreBuildings = @(
    "Nexus", "Probe", "Pylon", "Gateway", "WarpGate", "CyberneticsCore", "TwilightCouncil", "RoboticsFacility", "Stargate", "Forge"
)
$coreAbilities = @(
    "AlarakACDeadlyCharge", "AlarakKnockback", "AlarakEmpower", "AlarakACSummonDeathfleet", "AlarakStructureOvercharge"
)
$coreButtons = @(
    "AlarakDeadlyCharge", "AlarakKnockback", "AlarakEmpower", "AlarakACSummonDeathfleet", "AlarakStructureOvercharge"
)
$coreUpgrades = @(
    "CommanderPrestigeAlarakMech", "CommanderPrestigeAlarakEmpowerMe", "CommanderPrestigeAlarakDeathFleet", "AlarakHavocAbilityRange", "AlarakACSupplicantAttackAir", "AlarakDestructionWaveDistance", "AlarakSupplicantSacrificeLightningStrikes", "AlarakAreaDamageUpgrade"
)

foreach ($id in $coreUnits + $coreBuildings) {
    if (-not (Get-NodeById $unitDoc $id)) {
        Add-Error "Missing unit/building catalog object: $id"
    }
}
foreach ($id in $coreAbilities) {
    if (-not (Get-NodeById $abilDoc $id)) {
        Add-Error "Missing ability catalog object: $id"
    }
}
foreach ($id in $coreButtons) {
    if (-not (Get-NodeById $buttonDoc $id)) {
        Add-Error "Missing button catalog object: $id"
    }
}
foreach ($id in $coreUpgrades) {
    if (-not (Get-NodeById $upgradeDoc $id)) {
        Add-Error "Missing upgrade catalog object: $id"
    }
}

$hero = Get-NodeById $unitDoc "AlarakCoop"
if ($hero) {
    foreach ($abil in @("AlarakACDeadlyCharge", "AlarakKnockback")) {
        $hasAbil = $hero.AbilArray | Where-Object { $_.Link -eq $abil }
        $hasButton = $hero.CardLayouts.LayoutButtons | Where-Object { $_.AbilCmd -like "$abil,*" -or $_.Face -eq $abil }
        if (-not $hasAbil -and -not $hasButton) {
            Add-Error "AlarakCoop missing expected hero ability/card reference: $abil"
        }
    }
}

if ($errors.Count -gt 0) {
    $errors | ForEach-Object { Write-Host $_ }
    throw "Alarak tech chain validation failed with $($errors.Count) issue(s)."
}

Write-Host "Alarak tech chain validation passed."
