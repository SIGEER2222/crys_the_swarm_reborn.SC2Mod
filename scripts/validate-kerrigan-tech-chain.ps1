param(
    [string]$WorkspaceRoot = (Split-Path -Parent $PSScriptRoot)
)

$ErrorActionPreference = "Stop"

$projectRoot = Get-Item -LiteralPath $WorkspaceRoot
$scenarioRoot = Get-ChildItem -LiteralPath $projectRoot.FullName -Directory | Where-Object {
    Test-Path -LiteralPath (Join-Path $_.FullName "Mods\XM\XMKerrigan.SC2Mod")
} | Select-Object -First 1

if (-not $scenarioRoot) {
    throw "Unable to locate scenario root containing Mods\XM\XMKerrigan.SC2Mod under $($projectRoot.FullName)"
}

$gameDataRoot = Join-Path $scenarioRoot.FullName "Mods\XM\XMKerrigan.SC2Mod\Base.SC2Data\GameData"
$unitPath = Join-Path $gameDataRoot "UnitData.xml"
$abilPath = Join-Path $gameDataRoot "AbilData.xml"
$buttonPath = Join-Path $gameDataRoot "ButtonData.xml"
$requirementPath = Join-Path $gameDataRoot "RequirementData.xml"

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

$unitDoc = Read-Catalog $unitPath
$abilDoc = Read-Catalog $abilPath
$buttonDoc = Read-Catalog $buttonPath
$requirementDoc = Read-Catalog $requirementPath

function Get-NodeById {
    param($Doc, [string]$Id)
    if (-not $Doc) { return $null }
    return $Doc.Catalog.ChildNodes | Where-Object { $_.NodeType -eq "Element" -and $_.id -eq $Id } | Select-Object -First 1
}

$coreUnits = @(
    "K5Kerrigan", "K5KerriganBurrowed", "KerriganReviveCocoon",
    "Drone", "Overlord", "Overseer", "Zergling", "HotSRaptor", "Queen", "Roach", "RoachVile",
    "Hydralisk", "HydraliskImpaler", "Mutalisk", "MutaliskBroodlord", "MutaliskViper",
    "SwarmHost", "SwarmHostMP", "Ultralisk", "HotSTorrasque", "Baneling"
)

$coreBuildings = @(
    "Hatchery", "Lair", "Hive", "Extractor", "SpawningPool", "EvolutionChamber",
    "RoachWarren", "GreaterRoachWarren", "HydraliskDen", "LurkerDen", "Spire", "GreaterSpire",
    "UltraliskCavern", "BanelingNest", "NydusNetwork", "GreaterNydusWorm"
)

foreach ($id in $coreUnits + $coreBuildings) {
    if (-not (Get-NodeById $unitDoc $id)) {
        Add-Error "Missing unit/building catalog object: $id"
    }
}

$hero = Get-NodeById $unitDoc "K5Kerrigan"
if ($hero) {
    foreach ($abil in @("PrimalSlash", "MindBolt", "PsiStrike", "PsionicLift", "KerriganAssimilation")) {
        $hasAbil = $hero.AbilArray | Where-Object { $_.Link -eq $abil }
        $hasButton = $hero.CardLayouts.LayoutButtons | Where-Object { $_.AbilCmd -like "$abil,*" -or $_.Face -eq $abil }
        if (-not $hasAbil -and -not $hasButton) {
            Add-Error "K5Kerrigan missing expected hero ability/card reference: $abil"
        }
    }
}

$productionBuildings = @("Hatchery", "Lair", "Hive", "SpawningPool", "RoachWarren", "GreaterRoachWarren", "HydraliskDen", "LurkerDen", "Spire", "GreaterSpire", "UltraliskCavern", "NydusNetwork")
foreach ($building in $productionBuildings) {
    $node = Get-NodeById $unitDoc $building
    if (-not $node) { continue }
    $layoutCount = @($node.CardLayouts.LayoutButtons).Count
    if ($layoutCount -eq 0) {
        Add-Error "$building has no command card buttons in XMKerrigan UnitData.xml"
    }
}

foreach ($button in @("GreaterRoachWarren", "GreaterSpireViper", "KerriganAssimilation", "KerriganMaelstrom")) {
    if (-not (Get-NodeById $buttonDoc $button)) {
        Add-Error "Missing button catalog object for Kerrigan tech unit: $button"
    }
}

if ($errors.Count -gt 0) {
    $errors | ForEach-Object { Write-Host $_ }
    throw "Kerrigan tech chain validation failed with $($errors.Count) issue(s)."
}

Write-Host "Kerrigan tech chain validation passed."
