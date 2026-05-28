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

function Test-NodeReference {
    param(
        $Node,
        [string[]]$AbilityIds = @(),
        [string[]]$FaceIds = @()
    )

    if (-not $Node) { return $false }

    foreach ($abilityId in $AbilityIds) {
        if ($Node.AbilArray | Where-Object { $_.Link -eq $abilityId }) {
            return $true
        }

        if ($Node.CardLayouts.LayoutButtons | Where-Object { $_.AbilCmd -like "$abilityId,*" }) {
            return $true
        }
    }

    foreach ($faceId in $FaceIds) {
        if ($Node.CardLayouts.LayoutButtons | Where-Object { $_.Face -eq $faceId }) {
            return $true
        }
    }

    return $false
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
    $expectedHeroReferences = @(
        @{ Name = "PrimalSlash"; AbilityIds = @("PrimalSlash"); FaceIds = @("PrimalSlash") }
        @{ Name = "MindBolt"; AbilityIds = @("MindBolt"); FaceIds = @("MindBolt") }
        @{ Name = "PsiStrike"; AbilityIds = @("PsiStrikeWalk"); FaceIds = @("PsiStrike") }
        @{ Name = "PsionicLift"; AbilityIds = @("PsionicLift"); FaceIds = @("PsionicLift") }
        @{ Name = "KerriganAssimilation"; AbilityIds = @(); FaceIds = @("KerriganAssimilation") }
        @{ Name = "KerriganVoidCoopEconDrop"; AbilityIds = @("KerriganVoidCoopEconDrop"); FaceIds = @("KerriganVoidCoopEconDrop") }
        @{ Name = "PrimalHeal"; AbilityIds = @("PrimalHeal"); FaceIds = @("PrimalHeal") }
        @{ Name = "WildMutation"; AbilityIds = @("WildMutation"); FaceIds = @("WildMutation") }
        @{ Name = "KerriganVoidCoopCrushingGripWave"; AbilityIds = @("KerriganVoidCoopCrushingGripWave"); FaceIds = @("KerriganVoidCoopCrushingGripWave") }
        @{ Name = "SpawnBanelings"; AbilityIds = @("SpawnBanelings"); FaceIds = @("SpawnBanelings") }
        @{ Name = "Apocalypse"; AbilityIds = @("Apocalypse"); FaceIds = @("Apocalypse") }
        @{ Name = "K5DropPods"; AbilityIds = @("K5DropPods"); FaceIds = @("K5DropPods") }
    )

    foreach ($entry in $expectedHeroReferences) {
        if (-not (Test-NodeReference -Node $hero -AbilityIds $entry.AbilityIds -FaceIds $entry.FaceIds)) {
            Add-Error "K5Kerrigan missing expected hero ability/card reference: $($entry.Name)"
        }
    }
}

$expectedMorphUnits = @("Zergling", "HotSRaptor")
foreach ($unitId in $expectedMorphUnits) {
    $unitNode = Get-NodeById $unitDoc $unitId
    if (-not $unitNode) { continue }

    if (-not (Test-NodeReference -Node $unitNode -AbilityIds @("MorphToBaneling", "MorphZerglingToBaneling") -FaceIds @("Baneling"))) {
        Add-Error "$unitId missing expected baneling morph chain (MorphToBaneling / MorphZerglingToBaneling / Baneling button)"
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
