param(
    [string]$OfficialGameDataRoot = "references\official-casc-export\mods\starcoop\starcoop.sc2mod\base.sc2data\gamedata",
    [string]$TargetGameDataRoot = "合作指挥官版起义狂潮\Mods\XM\XMAbathur.SC2Mod\Base.SC2Data\GameData",
    [string]$SummaryPath = "references\official-abathur-import-summary.tsv"
)

$ErrorActionPreference = "Stop"

if (-not (Test-Path -LiteralPath $OfficialGameDataRoot)) {
    throw "Official GameData root not found: $OfficialGameDataRoot"
}

if (-not (Test-Path -LiteralPath $TargetGameDataRoot)) {
    New-Item -ItemType Directory -Path $TargetGameDataRoot | Out-Null
}

$seedIds = @(
    "CoopCasterAbathur", "SpawnToxicNest", "AbathurMend", "AbathurImprovedMend", "AbathurCreepMend",
    "BiomassPickup", "BiomassPickupWeapon", "AbathurCollectBiomass", "AbathurCollectBiomassSet",
    "AbathurBiomassRefund", "BiomassCreated", "BiomassTimedLife", "AbathurBiomassLifeLeech",
    "BiomassPassive", "BiomassPassiveEmpty",
    "ToxicNest", "ToxicNestBurrowed", "AbathurHiddenToxicNest", "AbathurImprovedToxicNest",
    "ToxicNestWeapon", "ToxicNestAttack",
    "AbathurSymbioteBrutalisk", "AbathurSymbioteLeviathan", "AbathurCreateSymbiote",
    "AbathurEnableSymbiote", "AbathurSymbioteHangerBrutalisk", "AbathurSymbioteHangerLeviathan",
    "SymbioteCarapace",
    "Brutalisk", "BrutaliskBurrowed", "BrutaliskCocoon", "BrutaliskCocoonRoach",
    "BrutaliskCocoonRoachVile", "BrutaliskCocoonQueen", "BrutaliskCocoonRavager",
    "BrutaliskCocoonSwarmhost", "BrutaliskPlacement",
    "Leviathan", "LeviathanCocoon", "HotSLeviathan",
    "EvolveToBrutaliskRoach", "EvolveToBrutaliskQueen", "EvolveToBrutaliskRavager",
    "EvolveToBrutaliskSwarmhost", "EvolveToLeviathanGuardianMP", "AbabthurUltimateEvolutionFullEnergy",
    "Roach", "RoachVile", "Queen", "RavagerAbathur", "SwarmHost", "SwarmHostSplitB",
    "Mutalisk", "GuardianMP", "Devourer", "Viper", "DefilerMP",
    "Drone", "Larva", "Hatchery", "Overlord", "SpawningPool", "RoachWarren", "HydraliskDen",
    "Lair", "Hive", "Spire", "GreaterSpire", "EvolutionChamber", "EvolutionPit", "InfestationPit", "ImpalerDen",
    "AbathurLevel02", "AbathurLevel03", "AbathurLevel04", "AbathurLevel05", "AbathurLevel06",
    "AbathurLevel07", "AbathurLevel08", "AbathurLevel09", "AbathurLevel09DeepTunnelImproved",
    "AbathurLevel10", "AbathurLevel11", "AbathurLevel12", "AbathurLevel13", "AbathurLevel14", "AbathurLevel15",
    "Abathur",
    "CommanderPrestigeAbathurUltEvo",
    "CountUnitAlias_BrutaliskQueuedOrBetter",
    "CountUpgradeAbathurBioMechanicalTransfusionQueuedOrBetter",
    "CountUpgradeAbathurHatcheryDoubleQueueQueuedOrBetter",
    "CountUpgradeAbathurMutaliskHealthScalingUpgradeCompleteOnly",
    "CountUpgradeAbathurMutaliskHealthScalingUpgradeInProgressOnly",
    "CountUpgradeAbathurRoachRangeScalingUpgradeCompleteOnly",
    "CountUpgradeAbathurRoachRangeScalingUpgradeInProgressOnly",
    "CountUpgradeSymbioteSpikeBurstRankTwoQueuedOrBetter",
    "CountUpgradeSymbioteStabRankTwoQueuedOrBetter",
    "CreateSymbioteAB",
    "CreateSymbioteCarapaceAB",
    "EvolveBrutaliskFinalSet",
    "GTCountBehaviorBiomassBuff100CompleteOnlyAtUnit1",
    "MasteryAbathurBiomassRefundonDeathDisplayDummy",
    "MasteryAbathurSymbioteCarapaceAbsorbtionDisplayDummy",
    "MasteryAbathurSymbioteCDRDisplayDummy",
    "NotCountUpgradeAbathurLocustAirAttackQueuedOrBetter",
    "NotCountUpgradeCommanderPrestigeAbathurUltEvoCompleteOnly",
    "NotCountUpgradeSymbioteStabUpgradeQueuedOrBetter"
)

$seedPattern = "^(Abathur|Biomass|ToxicNest|Brutalisk|Leviathan|EvolveToBrutalisk|EvolveToLeviathan|Symbiote|SpawnToxicNest)"
$seedPatternEnd = "(Abathur|Biomass|ToxicNest|Brutalisk|Leviathan|Symbiote)$"
$skipFiles = @(
    "armycategorydata.xml",
    "conversationdata.xml",
    "soundtrackdata.xml",
    "userdata.xml",
    "voiceoverdata.xml"
)
$skipFileSet = [System.Collections.Generic.HashSet[string]]::new([StringComparer]::OrdinalIgnoreCase)
$skipFiles | ForEach-Object { [void]$skipFileSet.Add($_) }

$sourceDocs = @{}
$sourceNodes = @{}
$idToSourceFile = @{}
$allIds = [System.Collections.Generic.HashSet[string]]::new([StringComparer]::Ordinal)

Get-ChildItem -LiteralPath $OfficialGameDataRoot -Filter "*.xml" | ForEach-Object {
    [xml]$doc = Get-Content -LiteralPath $_.FullName -Raw
    $sourceDocs[$_.Name.ToLowerInvariant()] = $doc

    foreach ($node in $doc.Catalog.ChildNodes) {
        if ($node.NodeType -ne "Element" -or -not $node.id) {
            continue
        }

        $id = [string]$node.id
        if (-not $sourceNodes.ContainsKey($id)) {
            $sourceNodes[$id] = $node
            $idToSourceFile[$id] = $_.Name.ToLowerInvariant()
        }
        [void]$allIds.Add($id)
    }
}

$selected = [System.Collections.Generic.HashSet[string]]::new([StringComparer]::Ordinal)

foreach ($seed in $seedIds) {
    if ($allIds.Contains($seed)) {
        [void]$selected.Add($seed)
    }
}

foreach ($id in $allIds) {
    $file = $idToSourceFile[$id]
    if ($skipFileSet.Contains($file)) {
        continue
    }

    if ($id -match $seedPattern -or $id -match $seedPatternEnd) {
        [void]$selected.Add($id)
    }
}

for ($pass = 1; $pass -le 3; $pass++) {
    $snapshot = @($selected)

    foreach ($id in $snapshot) {
        if (-not $sourceNodes.ContainsKey($id)) {
            continue
        }

        $node = $sourceNodes[$id]
        $file = $idToSourceFile[$id]

        if ($node.parent -and $allIds.Contains([string]$node.parent)) {
            $parentFile = $idToSourceFile[[string]$node.parent]
            if (-not $skipFileSet.Contains($parentFile)) {
                [void]$selected.Add([string]$node.parent)
            }
        }

        foreach ($attr in $node.SelectNodes(".//@*")) {
            foreach ($match in [regex]::Matches([string]$attr.Value, "[A-Za-z][A-Za-z0-9_]*")) {
                $token = $match.Value
                if (-not $allIds.Contains($token)) {
                    continue
                }

                $tokenFile = $idToSourceFile[$token]
                if ($skipFileSet.Contains($tokenFile)) {
                    continue
                }

                [void]$selected.Add($token)
            }
        }
    }
}

# Keep only Abathur from CommanderData; other commanders enter the closure through shared UI/user fields.
foreach ($id in @($selected)) {
    if ($idToSourceFile[$id] -eq "commanderdata.xml" -and $id -ne "Abathur") {
        [void]$selected.Remove($id)
    }
}

$placeholderIds = [System.Collections.Generic.HashSet[string]]::new([StringComparer]::Ordinal)
@(
    "AbathurBiomass",
    "BiomassTimedLifeAbathur",
    "GrantBiomassAbathur",
    "CreateBiomassPickupAbathur",
    "BiomassPickupAbathur",
    "HasNoBiomassDrop"
) | ForEach-Object { [void]$placeholderIds.Add($_) }

$canonicalFileNames = @{
    "abildata.xml" = "AbilData.xml"
    "actordata.xml" = "ActorData.xml"
    "alertdata.xml" = "AlertData.xml"
    "behaviordata.xml" = "BehaviorData.xml"
    "buttondata.xml" = "ButtonData.xml"
    "commanderdata.xml" = "CommanderData.xml"
    "effectdata.xml" = "EffectData.xml"
    "modeldata.xml" = "ModelData.xml"
    "moverdata.xml" = "MoverData.xml"
    "requirementdata.xml" = "RequirementData.xml"
    "requirementnodedata.xml" = "RequirementNodeData.xml"
    "sounddata.xml" = "SoundData.xml"
    "turretdata.xml" = "TurretData.xml"
    "unitdata.xml" = "UnitData.xml"
    "upgradedata.xml" = "UpgradeData.xml"
    "validatordata.xml" = "ValidatorData.xml"
    "weapondata.xml" = "WeaponData.xml"
}

$idsByTargetFile = @{}
foreach ($file in ($sourceDocs.Keys | Sort-Object)) {
    if ($skipFileSet.Contains($file)) {
        continue
    }

    $doc = $sourceDocs[$file]
    foreach ($node in $doc.Catalog.ChildNodes) {
        if ($node.NodeType -ne "Element" -or -not $node.id) {
            continue
        }

        $id = [string]$node.id
        if (-not $selected.Contains($id)) {
            continue
        }

        if ($file -eq "commanderdata.xml" -and $id -ne "Abathur") {
            continue
        }

        if (-not $idsByTargetFile.ContainsKey($file)) {
            $idsByTargetFile[$file] = [System.Collections.Generic.List[System.Xml.XmlElement]]::new()
        }

        $idsByTargetFile[$file].Add($node)
    }
}

$summaryRows = [System.Collections.Generic.List[string]]::new()
$summaryRows.Add("ObjectId`tCatalogType`tOfficialSource`tTargetFile")

foreach ($file in ($idsByTargetFile.Keys | Sort-Object)) {
    $targetFileName = if ($canonicalFileNames.ContainsKey($file)) { $canonicalFileNames[$file] } else { $file }
    $targetPath = Join-Path $TargetGameDataRoot $targetFileName
    $targetDoc = [xml]'<?xml version="1.0" encoding="utf-8"?><Catalog></Catalog>'

    if (Test-Path -LiteralPath $targetPath) {
        [xml]$existingDoc = Get-Content -LiteralPath $targetPath -Raw
        foreach ($node in $existingDoc.Catalog.ChildNodes) {
            if ($node.NodeType -ne "Element") {
                continue
            }

            $id = [string]$node.id
            if ($placeholderIds.Contains($id)) {
                continue
            }

            if ($id -and $selected.Contains($id)) {
                continue
            }

            [void]$targetDoc.DocumentElement.AppendChild($targetDoc.ImportNode($node, $true))
        }
    }

    foreach ($sourceNode in ($idsByTargetFile[$file] | Sort-Object id, Name)) {
        $id = [string]$sourceNode.id
        [void]$targetDoc.DocumentElement.AppendChild($targetDoc.ImportNode($sourceNode, $true))
        $summaryRows.Add("$id`t$($sourceNode.Name)`tmods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/$file`t$targetPath")
    }

    $settings = [System.Xml.XmlWriterSettings]::new()
    $settings.Encoding = [System.Text.UTF8Encoding]::new($false)
    $settings.Indent = $true
    $settings.NewLineChars = "`r`n"

    $writer = [System.Xml.XmlWriter]::Create($targetPath, $settings)
    try {
        $targetDoc.Save($writer)
    }
    finally {
        $writer.Dispose()
    }
}

New-Item -ItemType Directory -Path (Split-Path -Parent $SummaryPath) -Force | Out-Null
$summaryRows | Set-Content -LiteralPath $SummaryPath -Encoding utf8NoBOM

Write-Host "Imported $($summaryRows.Count - 1) official Abathur-related catalog objects."
Write-Host "Summary: $SummaryPath"
