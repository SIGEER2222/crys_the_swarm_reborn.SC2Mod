param(
    [string]$WorkspaceRoot = (Split-Path -Parent $PSScriptRoot),
    [string]$OfficialGameDataRoot = "references\official-casc-export\mods\starcoop\starcoop.sc2mod\base.sc2data\gamedata",
    [string]$TargetGameDataRoot = "",
    [string]$SummaryPath = "references\official-fenix-import-summary.tsv"
)

$ErrorActionPreference = "Stop"

$projectRoot = Get-Item -LiteralPath $WorkspaceRoot
if (-not [System.IO.Path]::IsPathRooted($OfficialGameDataRoot)) {
    $OfficialGameDataRoot = Join-Path $projectRoot.FullName $OfficialGameDataRoot
}
if (-not [System.IO.Path]::IsPathRooted($SummaryPath)) {
    $SummaryPath = Join-Path $projectRoot.FullName $SummaryPath
}
if ([string]::IsNullOrWhiteSpace($TargetGameDataRoot)) {
    $scenarioRoot = Get-ChildItem -LiteralPath $projectRoot.FullName -Directory | Where-Object {
        Test-Path -LiteralPath (Join-Path $_.FullName "Mods\XM\XMFenix.SC2Mod")
    } | Select-Object -First 1
    if (-not $scenarioRoot) {
        throw "Unable to locate scenario root containing Mods\XM\XMFenix.SC2Mod under $($projectRoot.FullName)"
    }
    $TargetGameDataRoot = Join-Path $scenarioRoot.FullName "Mods\XM\XMFenix.SC2Mod\Base.SC2Data\GameData"
}

if (-not (Test-Path -LiteralPath $OfficialGameDataRoot)) {
    throw "Official GameData root not found: $OfficialGameDataRoot"
}

New-Item -ItemType Directory -Path $TargetGameDataRoot -Force | Out-Null

$seedIds = @(
    "Fenix", "ProtossFenix", "FenixCommander", "FenixResearchCostReduction",
    "SoACasterFenix", "FenixAltarOfPsiStorms", "FenixAltarOfPsiStormsBroken", "FenixAltarOfPsiStormsBrokenStage2",
    "FenixCoop", "FenixDragoon", "FenixArbiter", "FenixSOA",
    "FenixProbiusProbe", "Probe", "Nexus", "Pylon", "Assimilator", "Gateway", "WarpGate", "CyberneticsCore",
    "Forge", "TwilightCouncil", "RoboticsFacility", "RoboticsBay", "Stargate", "FleetBeacon", "PhotonCannon", "ShieldBattery",
    "ZealotPurifier", "AdeptFenix", "SentryFenix", "SentryPurifier", "StalkerPurifier", "Immortal", "ColossusPurifier",
    "Scout", "PhoenixPurifier", "Carrier",
    "FenixKaldalisZealot", "FenixTalisAdept", "FenixTaldarinImmortal", "FenixWarbringerColossus", "FenixMojoScout", "FenixClolarionCarrier",
    "SOASummonFenix", "SOASummonFenixDragoon", "SOASummonFenixArbiter", "FenixPurificationNova",
    "FenixThunderousChargeCoop", "FenixSoAWhirlwind", "FenixDragoonChargedBlast", "FenixDragoonBattleShout",
    "FenixArbiterStasisField", "FenixArbiterCloakingField",
    "CommanderPrestigeFenixSuitSwap", "CommanderPrestigeFenixDataWeb", "CommanderPrestigeFenixAvenger",
    "FenixChampionKaldalisZealot", "FenixChampionTalisAdept", "FenixChampionTaldarinImmortal",
    "FenixChampionWarbringerColossus", "FenixChampionMojoScout", "FenixChampionClolarionCarrier",
    "FenixChampionCarrierBombers", "FenixChampionScoutAOEMissiles", "FenixChampionTalisAdeptBounceShotUpgrade",
    "FenixKaldalisCleave", "FenixImmortalDetonationShot", "FenixWarbringerColossusPowerShot",
    "FenixSuitAttackDamage", "FenixArbiterDetection", "FenixSentryGuardianZoneUpgrade",
    "FenixSentryNullShieldReflect", "FenixSentryPhotonOvercharge", "FenixScoutWeaponRange",
    "FenixOfflineSuitRegen", "FenixChampionSwapBoost", "FenixNetworkedSuperiority",
    "MasteryFenixSuitAttackSpeed", "MasteryFenixSuitEnergyRegen", "MasteryFenixChampionAttackSpeed",
    "MasteryFenixChampionLifeShieldBuff", "MasteryFenixChronoBoostExtra", "MasteryFenixReducedResearchCosts",
    "MasteryFenixExtraStartingSupply"
)

$seedPattern = "^(Fenix|CommanderPrestigeFenix|MasteryFenix|HaveMasteryFenix|HaveFenix|SoACasterFenix|SOASummonFenix|SOAPurifierBeam|Purifier|ZealotPurifier|AdeptFenix|SentryFenix|SentryPurifier|StalkerPurifier|ColossusPurifier|PhoenixPurifier|FenixChampion|FenixNetworked|FenixKaldalis|FenixTalis|FenixTaldarin|FenixWarbringer|FenixMojo|FenixClolarion)"
$seedPatternEnd = "(Fenix|Purifier|Purifier_COOP|Purifier_Coop)$"
$skipFiles = @("armycategorydata.xml", "conversationdata.xml", "soundtrackdata.xml", "voiceoverdata.xml")
$skipFileSet = [System.Collections.Generic.HashSet[string]]::new([StringComparer]::OrdinalIgnoreCase)
$skipFiles | ForEach-Object { [void]$skipFileSet.Add($_) }

$sourceDocs = @{}
$sourceNodes = @{}
$idToSourceFile = @{}
$allIds = [System.Collections.Generic.HashSet[string]]::new([StringComparer]::Ordinal)

Get-ChildItem -LiteralPath $OfficialGameDataRoot -Filter "*.xml" | ForEach-Object {
    [xml]$sourceDoc = Get-Content -LiteralPath $_.FullName -Raw
    $sourceDocs[$_.Name.ToLowerInvariant()] = $sourceDoc
    foreach ($node in $sourceDoc.Catalog.ChildNodes) {
        if ($node.NodeType -ne "Element" -or -not $node.id) { continue }
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
    if ($allIds.Contains($seed)) { [void]$selected.Add($seed) }
}
foreach ($id in $allIds) {
    $file = $idToSourceFile[$id]
    if ($skipFileSet.Contains($file)) { continue }
    if ($id -match $seedPattern -or $id -match $seedPatternEnd) { [void]$selected.Add($id) }
}

for ($pass = 1; $pass -le 5; $pass++) {
    $snapshot = @($selected)
    foreach ($id in $snapshot) {
        if (-not $sourceNodes.ContainsKey($id)) { continue }
        $node = $sourceNodes[$id]
        if ($node.parent -and $allIds.Contains([string]$node.parent)) {
            $parentFile = $idToSourceFile[[string]$node.parent]
            if (-not $skipFileSet.Contains($parentFile)) { [void]$selected.Add([string]$node.parent) }
        }
        foreach ($attr in $node.SelectNodes(".//@*")) {
            foreach ($match in [regex]::Matches([string]$attr.Value, "[A-Za-z][A-Za-z0-9_]*")) {
                $token = $match.Value
                if (-not $allIds.Contains($token)) { continue }
                $tokenFile = $idToSourceFile[$token]
                if ($skipFileSet.Contains($tokenFile)) { continue }
                [void]$selected.Add($token)
            }
        }
    }
}

foreach ($id in @($selected)) {
    if ($idToSourceFile[$id] -eq "commanderdata.xml" -and $id -ne "Fenix") {
        [void]$selected.Remove($id)
    }
}

$canonicalFileNames = @{
    "abildata.xml" = "AbilData.xml"; "accumulatordata.xml" = "AccumulatorData.xml"; "actordata.xml" = "ActorData.xml"; "alertdata.xml" = "AlertData.xml"; "behaviordata.xml" = "BehaviorData.xml"; "buttondata.xml" = "ButtonData.xml"; "commanderdata.xml" = "CommanderData.xml"; "effectdata.xml" = "EffectData.xml"; "modeldata.xml" = "ModelData.xml"; "moddata.xml" = "ModData.xml"; "moverdata.xml" = "MoverData.xml"; "requirementdata.xml" = "RequirementData.xml"; "requirementnodedata.xml" = "RequirementNodeData.xml"; "skindata.xml" = "skindata.xml"; "sounddata.xml" = "SoundData.xml"; "turretdata.xml" = "TurretData.xml"; "unitdata.xml" = "UnitData.xml"; "upgradedata.xml" = "UpgradeData.xml"; "userdata.xml" = "UserData.xml"; "validatordata.xml" = "ValidatorData.xml"; "weapondata.xml" = "WeaponData.xml"
}

$idsByTargetFile = @{}
foreach ($file in ($sourceDocs.Keys | Sort-Object)) {
    if ($skipFileSet.Contains($file)) { continue }
    $currentSourceDoc = $sourceDocs[$file]
    foreach ($node in $currentSourceDoc.Catalog.ChildNodes) {
        if ($node.NodeType -ne "Element" -or -not $node.id) { continue }
        $id = [string]$node.id
        if (-not $selected.Contains($id)) { continue }
        if ($file -eq "commanderdata.xml" -and $id -ne "Fenix") { continue }
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
    try { $targetDoc.Save($writer) } finally { $writer.Dispose() }
}

New-Item -ItemType Directory -Path (Split-Path -Parent $SummaryPath) -Force | Out-Null
$summaryRows | Set-Content -LiteralPath $SummaryPath -Encoding utf8NoBOM
Write-Host "Imported $($summaryRows.Count - 1) official Fenix-related catalog objects."
Write-Host "Summary: $SummaryPath"
