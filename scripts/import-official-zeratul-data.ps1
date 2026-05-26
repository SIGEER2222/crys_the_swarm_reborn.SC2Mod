param(
    [string]$WorkspaceRoot = (Split-Path -Parent $PSScriptRoot),
    [string]$OfficialGameDataRoot = "references\official-casc-export\mods\starcoop\starcoop.sc2mod\base.sc2data\gamedata",
    [string]$TargetGameDataRoot = "",
    [string]$SummaryPath = "references\official-zeratul-import-summary.tsv",
    [string[]]$SeedIds = @(),
    [switch]$DisablePatternExpansion,
    [string[]]$ExcludeIdPatterns = @(),
    [string[]]$KeepIdPatterns = @()
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
        Test-Path -LiteralPath (Join-Path $_.FullName "Mods\XM\XMZeratul.SC2Mod")
    } | Select-Object -First 1
    if (-not $scenarioRoot) {
        throw "Unable to locate scenario root containing Mods\XM\XMZeratul.SC2Mod under $($projectRoot.FullName)"
    }
    $TargetGameDataRoot = Join-Path $scenarioRoot.FullName "Mods\XM\XMZeratul.SC2Mod\Base.SC2Data\GameData"
}

if (-not (Test-Path -LiteralPath $OfficialGameDataRoot)) {
    throw "Official GameData root not found: $OfficialGameDataRoot"
}

New-Item -ItemType Directory -Path $TargetGameDataRoot -Force | Out-Null

$defaultSeedIds = @(
    "Zeratul", "ProtossZeratul", "ZeratulCommander",
    "CoopCasterZeratul", "ZeratulCoop", "ZeratulACArtifact", "ZeratulCoopReviveBeacon",
    "ZeratulInitialReviveTimer", "ZeratulReviveTimer", "ZeratulRevive",
    "ZeratulBuild", "ZeratulTopBarBuild", "ZeratulTopBarWarpTrain", "ZeratulTopBarUltimateWarpTrain",
    "ZeratulMapWideStasis", "ZeratulMapWideStasisIssueOrder",
    "ZeratulTopBarZealotSquad", "ZeratulTopBarVoidRaySquad", "TemplarCallDown",
    "ZealotZeratul", "ZeratulSummonZealot",
    "AutomatedAssimilatorZeratul", "DarkPylon",
    "CommanderPrestigeZeratulVoidSeeker", "CommanderPrestigeZeratulArtifactFragments", "CommanderPrestigeZeratulTornadoes",
    "MasteryZeratulArtifactFragmentSpawnRate", "MasteryZeratulLegendaryLegionCost",
    "MasteryZeratulSupportCalldownCooldownReduction", "MasteryZeratulAvatarCooldown",
    "MasteryZeratulZeratulAttackSpeed", "MasteryZeratulCombatUnitAttackSpeed",
    "ZeratulGateway", "ZeratulCyberneticsCore", "ZeratulPhotonCannon", "ZeratulDarkShrine",
    "ZeratulRoboticsBay", "ZeratulRoboticsFacility",
    "ZeratulXelNagaConstructCyan", "ZeratulXelNagaConstructPsiBlast", "ZeratulXelNagaConstructPsiStorm",
    "ZeratulKhaydarinMonolith", "VoidArray", "VoidArrayArtifactSearch", "VoidArrayWarpIn"
)

$seedPattern = "^(Zeratul|CoopCasterZeratul|ProtossZeratul|CommanderPrestigeZeratul|MasteryZeratul|HaveMasteryZeratul|HaveZeratul|CountUpgradeZeratul|EqCountUpgradeZeratul|LTECountUpgradeZeratul|AutomatedAssimilatorZeratul|VoidArray|XelNaga)"
$seedPatternEnd = "(Zeratul|VoidArray|XelNaga|Monolith|Artifact|Seeker)$"
$skipFiles = @("armycategorydata.xml", "conversationdata.xml", "soundtrackdata.xml", "voiceoverdata.xml")
$skipFileSet = [System.Collections.Generic.HashSet[string]]::new([StringComparer]::OrdinalIgnoreCase)
$skipFiles | ForEach-Object { [void]$skipFileSet.Add($_) }

$sourceDocs = @{}
$sourceNodes = @{}
$idToSourceFile = @{}
$sourceFileOriginalByKey = @{}
$allIds = [System.Collections.Generic.HashSet[string]]::new([StringComparer]::Ordinal)

Get-ChildItem -LiteralPath $OfficialGameDataRoot -Recurse -Filter "*.xml" | ForEach-Object {
    $relativePath = [System.IO.Path]::GetRelativePath($OfficialGameDataRoot, $_.FullName).Replace("\", "/")
    $sourceKey = $relativePath.ToLowerInvariant()
    [xml]$sourceDoc = Get-Content -LiteralPath $_.FullName -Raw
    $sourceDocs[$sourceKey] = $sourceDoc
    $sourceFileOriginalByKey[$sourceKey] = $relativePath
    foreach ($node in $sourceDoc.Catalog.ChildNodes) {
        if ($node.NodeType -ne "Element") { continue }
        $id = $node.GetAttribute("id")
        if ([string]::IsNullOrWhiteSpace($id)) {
            $id = $node.GetAttribute("Id")
        }
        if ([string]::IsNullOrWhiteSpace($id)) { continue }
        if (-not $sourceNodes.ContainsKey($id)) {
            $sourceNodes[$id] = $node
            $idToSourceFile[$id] = $sourceKey
        }
        [void]$allIds.Add($id)
    }
}

$selected = [System.Collections.Generic.HashSet[string]]::new([StringComparer]::Ordinal)
if ($SeedIds.Count -gt 0) {
    $seedIds = @($SeedIds | Where-Object { -not [string]::IsNullOrWhiteSpace($_) } | Sort-Object -Unique)
}
else {
    $seedIds = $defaultSeedIds
}

foreach ($seed in $seedIds) {
    if ($allIds.Contains($seed)) { [void]$selected.Add($seed) }
}
if (-not $DisablePatternExpansion) {
    foreach ($id in $allIds) {
        $file = $idToSourceFile[$id]
        if ($skipFileSet.Contains([System.IO.Path]::GetFileName($file))) { continue }
        if ($id -match $seedPattern -or $id -match $seedPatternEnd) { [void]$selected.Add($id) }
    }
}

for ($pass = 1; $pass -le 5; $pass++) {
    $snapshot = @($selected)
    foreach ($id in $snapshot) {
        if (-not $sourceNodes.ContainsKey($id)) { continue }
        $node = $sourceNodes[$id]
        if ($node.parent -and $allIds.Contains([string]$node.parent)) {
            $parentFile = $idToSourceFile[[string]$node.parent]
            if (-not $skipFileSet.Contains([System.IO.Path]::GetFileName($parentFile))) { [void]$selected.Add([string]$node.parent) }
        }
        foreach ($attr in $node.SelectNodes(".//@*")) {
            foreach ($match in [regex]::Matches([string]$attr.Value, "[A-Za-z][A-Za-z0-9_]*")) {
                $token = $match.Value
                if (-not $allIds.Contains($token)) { continue }
                $tokenFile = $idToSourceFile[$token]
                if ($skipFileSet.Contains([System.IO.Path]::GetFileName($tokenFile))) { continue }
                [void]$selected.Add($token)
            }
        }
    }
}

foreach ($id in @($selected)) {
    if ($idToSourceFile[$id] -eq "commanderdata.xml" -and $id -ne "Zeratul") {
        [void]$selected.Remove($id)
    }
}

if ($ExcludeIdPatterns.Count -gt 0) {
    foreach ($id in @($selected)) {
        foreach ($pattern in $ExcludeIdPatterns) {
            if ([string]::IsNullOrWhiteSpace($pattern)) {
                continue
            }

            if ($id -match $pattern) {
                [void]$selected.Remove($id)
                break
            }
        }
    }
}

if ($KeepIdPatterns.Count -gt 0) {
    $pinnedIds = [System.Collections.Generic.HashSet[string]]::new([StringComparer]::Ordinal)
    foreach ($seed in $seedIds) {
        if (-not [string]::IsNullOrWhiteSpace($seed)) {
            [void]$pinnedIds.Add($seed)
        }
    }

    foreach ($id in @($selected)) {
        if ($pinnedIds.Contains($id)) {
            continue
        }

        $keep = $false
        foreach ($pattern in $KeepIdPatterns) {
            if ([string]::IsNullOrWhiteSpace($pattern)) {
                continue
            }

            if ($id -match $pattern) {
                $keep = $true
                break
            }
        }

        if (-not $keep) {
            [void]$selected.Remove($id)
        }
    }
}

$canonicalFileNames = @{
    "abildata.xml" = "AbilData.xml"; "accumulatordata.xml" = "AccumulatorData.xml"; "actordata.xml" = "ActorData.xml"; "alertdata.xml" = "AlertData.xml"; "behaviordata.xml" = "BehaviorData.xml"; "buttondata.xml" = "ButtonData.xml"; "commanderdata.xml" = "CommanderData.xml"; "effectdata.xml" = "EffectData.xml"; "modeldata.xml" = "ModelData.xml"; "moddata.xml" = "ModData.xml"; "moverdata.xml" = "MoverData.xml"; "requirementdata.xml" = "RequirementData.xml"; "requirementnodedata.xml" = "RequirementNodeData.xml"; "skindata.xml" = "skindata.xml"; "sounddata.xml" = "SoundData.xml"; "turretdata.xml" = "TurretData.xml"; "unitdata.xml" = "UnitData.xml"; "upgradedata.xml" = "UpgradeData.xml"; "userdata.xml" = "UserData.xml"; "validatordata.xml" = "ValidatorData.xml"; "weapondata.xml" = "WeaponData.xml"
}

$idsByTargetFile = @{}
foreach ($file in ($sourceDocs.Keys | Sort-Object)) {
    if ($skipFileSet.Contains([System.IO.Path]::GetFileName($file))) { continue }
    $currentSourceDoc = $sourceDocs[$file]
    foreach ($node in $currentSourceDoc.Catalog.ChildNodes) {
        if ($node.NodeType -ne "Element") { continue }
        $id = $node.GetAttribute("id")
        if ([string]::IsNullOrWhiteSpace($id)) {
            $id = $node.GetAttribute("Id")
        }
        if ([string]::IsNullOrWhiteSpace($id)) { continue }
        if (-not $selected.Contains($id)) { continue }
        if ($file -eq "commanderdata.xml" -and $id -ne "Zeratul") { continue }
        if (-not $idsByTargetFile.ContainsKey($file)) {
            $idsByTargetFile[$file] = [System.Collections.Generic.List[System.Xml.XmlElement]]::new()
        }
        $idsByTargetFile[$file].Add($node)
    }
}

$summaryRows = [System.Collections.Generic.List[string]]::new()
$summaryRows.Add("ObjectId`tCatalogType`tOfficialSource`tTargetFile")
foreach ($file in ($idsByTargetFile.Keys | Sort-Object)) {
    $fileName = [System.IO.Path]::GetFileName($file)
    $targetRelativePath = if ($file.Contains("/")) {
        $sourceFileOriginalByKey[$file].Replace("/", "\")
    }
    elseif ($canonicalFileNames.ContainsKey($fileName)) {
        $canonicalFileNames[$fileName]
    }
    else {
        $sourceFileOriginalByKey[$file]
    }
    $targetPath = Join-Path $TargetGameDataRoot $targetRelativePath
    New-Item -ItemType Directory -Force -Path (Split-Path -Parent $targetPath) | Out-Null
    $targetDoc = [xml]'<?xml version="1.0" encoding="utf-8"?><Catalog></Catalog>'
    foreach ($sourceNode in ($idsByTargetFile[$file] | Sort-Object id, Name)) {
        $id = [string]$sourceNode.id
        [void]$targetDoc.DocumentElement.AppendChild($targetDoc.ImportNode($sourceNode, $true))
        $summaryRows.Add("$id`t$($sourceNode.Name)`tmods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/$($sourceFileOriginalByKey[$file].Replace('\','/'))`t$targetPath")
    }
    $settings = [System.Xml.XmlWriterSettings]::new()
    $settings.Encoding = [System.Text.UTF8Encoding]::new($false)
    $settings.Indent = $true
    $settings.NewLineChars = "`r`n"
    $writer = [System.Xml.XmlWriter]::Create($targetPath, $settings)
    try { $targetDoc.Save($writer) } finally { $writer.Dispose() }
}

New-Item -ItemType Directory -Path (Split-Path -Parent $SummaryPath) -Force | Out-Null
$summaryRows | Set-Content -LiteralPath $SummaryPath -Encoding UTF8
Write-Host "Imported $($summaryRows.Count - 1) official Zeratul-related catalog objects."
Write-Host "Summary: $SummaryPath"
