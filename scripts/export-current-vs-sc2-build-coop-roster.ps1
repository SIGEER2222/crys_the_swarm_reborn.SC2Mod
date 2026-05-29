param(
    [string]$OutputPath,
    [string]$Sc2BuildExportRoot,
    [string]$ScenarioRoot
)

$ErrorActionPreference = "Stop"

$scriptRoot = if ($PSScriptRoot) { $PSScriptRoot } else { Split-Path -Parent $MyInvocation.MyCommand.Path }
$repoRoot = Split-Path -Parent $scriptRoot

if ([string]::IsNullOrWhiteSpace($OutputPath)) {
    $OutputPath = Join-Path $repoRoot "docs\指挥官\当前实际兵种建筑对比-SC2Build96883-2026-05-25.md"
}

if ([string]::IsNullOrWhiteSpace($Sc2BuildExportRoot)) {
    $Sc2BuildExportRoot = Join-Path $repoRoot "游戏数据\官方SC2原始文本镜像"
}

if ([string]::IsNullOrWhiteSpace($ScenarioRoot)) {
    $ScenarioRoot = Join-Path $repoRoot "合作指挥官版起义狂潮"
}

$wikiRosterPath = Join-Path $repoRoot "docs\维基指挥官\兵种\all_commanders_data.json"
$modsRoot = Join-Path $ScenarioRoot "Mods\XM"

$commanderModules = [ordered]@{
    "阿巴瑟 Abathur" = "XMAbathurReborn.SC2Mod"
    "阿塔尼斯 Artanis" = "XMArtanis.SC2Mod"
    "德哈卡 Dehaka" = "XMDehaka.SC2Mod"
    "菲尼克斯 Fenix" = "XMFenix.SC2Mod"
    "霍纳与汉 Han & Horner" = "XMMira.SC2Mod"
    "凯拉克斯 Karax" = "XMKarax.SC2Mod"
    "凯瑞甘 Kerrigan" = "XMKerrigan.SC2Mod"
    "雷诺 Raynor" = "XMRaynor.SC2Mod"
    "蒙斯克 Mengsk" = "XMMengsk.SC2Mod"
    "诺娃 Nova" = "XMNova.SC2Mod"
    "斯台特曼 Stetmann" = "XMStetmann.SC2Mod"
    "斯托科夫 Stukov" = "XMStukov.SC2Mod"
    "斯旺 Swann" = "XMSwann.SC2Mod"
    "泰凯斯 Tychus" = "XMTychus.SC2Mod"
    "沃拉尊 Vorazun" = "XMVorazun.SC2Mod"
    "泽拉图 Zeratul" = "XMZeratul.SC2Mod"
    "扎加拉 Zagara" = "XMZagara.SC2Mod"
    "阿拉纳克 Alarak" = "XMAlarak.SC2Mod"
}

$commanderPlayerIds = @{
    "阿巴瑟 Abathur" = @("ZergAbathur")
    "阿塔尼斯 Artanis" = @("ProtossArtanis")
    "德哈卡 Dehaka" = @("ZergDehaka")
    "菲尼克斯 Fenix" = @("ProtossFenix")
    "霍纳与汉 Han & Horner" = @("TerranHorner")
    "凯拉克斯 Karax" = @("ProtossKarax")
    "凯瑞甘 Kerrigan" = @("ZergKerrigan")
    "雷诺 Raynor" = @("TerranRaynor")
    "蒙斯克 Mengsk" = @("TerranMengsk")
    "诺娃 Nova" = @("TerranNova")
    "斯台特曼 Stetmann" = @("ZergStetmann")
    "斯托科夫 Stukov" = @("ZergStukov")
    "斯旺 Swann" = @("TerranSwann")
    "泰凯斯 Tychus" = @("TerranTychus")
    "沃拉尊 Vorazun" = @("ProtossVorazun")
    "泽拉图 Zeratul" = @("ProtossZeratul")
    "扎加拉 Zagara" = @("ZergZagara")
    "阿拉纳克 Alarak" = @("ProtossAlarak")
}

$officialAliasCandidates = @{
    "阿拉纳克 Alarak|先锋" = @("ImmortalTaldarim")
    "菲尼克斯 Fenix|军团士兵" = @("ZealotPurifier")
    "凯拉克斯 Karax|幻影战机" = @("PhoenixPurifier")
    "凯拉克斯 Karax|警戒者" = @("ZealotPurifier")
    "凯瑞甘 Kerrigan|潜伏者" = @("HydraliskLurker", "HydraliskLurkerBurrowed")
}

function New-Set {
    return ,([System.Collections.Generic.HashSet[string]]::new([System.StringComparer]::OrdinalIgnoreCase))
}

function Add-ToSet {
    param(
        [System.Collections.Generic.HashSet[string]]$Set,
        [string]$Value
    )

    if (-not [string]::IsNullOrWhiteSpace($Value)) {
        [void]$Set.Add($Value)
    }
}

function Add-MapSet {
    param(
        [hashtable]$Map,
        [string]$Key,
        [string]$Value
    )

    if ([string]::IsNullOrWhiteSpace($Key) -or [string]::IsNullOrWhiteSpace($Value)) {
        return
    }

    if (-not $Map.ContainsKey($Key)) {
        $Map[$Key] = New-Set
    }

    [void]$Map[$Key].Add($Value)
}

function Set-ToArray {
    param([object]$Set)

    if ($null -eq $Set) {
        return @()
    }

    return @($Set | Sort-Object -Unique)
}

function Join-Values {
    param(
        [object[]]$Values,
        [string]$Separator = " / "
    )

    $items = @($Values | Where-Object { -not [string]::IsNullOrWhiteSpace([string]$_) } | Sort-Object -Unique)
    if ($items.Count -eq 0) {
        return "-"
    }

    return ($items -join $Separator)
}

function Get-StatusDiagnosis {
    param([string]$Status)

    switch ($Status) {
        "SameId" { return "已直接对齐" }
        "Ambiguous" { return "有共享 ID，但当前或官方侧存在多个形态/候选，需要按训练链裁剪主对象" }
        "DifferentId" { return "当前有落地，但 ID 与 Build 96883 官方对象不一致" }
        "LocalizedOnly" { return "当前只有本地化命名，未发现 CUnit 或 Unit 引用落地" }
        "Missing" { return "当前缺少命名与落地证据" }
        "OfficialUnresolved" { return "官方侧有命名候选，但未解析到 CUnit" }
        "NoOfficialCandidate" { return "官方侧未找到该中文名或别名候选" }
        default { return $Status }
    }
}

function Normalize-StringValue {
    param([string]$Value)

    if ($null -eq $Value) {
        return ""
    }

    $normalized = $Value
    $commentIndex = $normalized.IndexOf(" ///", [StringComparison]::Ordinal)
    if ($commentIndex -ge 0) {
        $normalized = $normalized.Substring(0, $commentIndex)
    }

    return $normalized.Trim()
}

function Get-StringEntries {
    param([string]$Root)

    $rows = New-Object System.Collections.Generic.List[object]
    if (-not (Test-Path -LiteralPath $Root)) {
        return $rows
    }

    $files = @(Get-ChildItem -LiteralPath $Root -Recurse -File -Include "*.txt" |
        Where-Object { $_.FullName -match '\\zhcn\.sc2data\\localizeddata\\' -and $_.Name -match '(game|object)strings\.txt$' })

    foreach ($file in $files) {
        foreach ($line in Get-Content -LiteralPath $file.FullName -Encoding UTF8) {
            if ([string]::IsNullOrWhiteSpace($line) -or $line.StartsWith("#")) {
                continue
            }

            $parts = $line -split "=", 2
            if ($parts.Count -ne 2) {
                continue
            }

            $rows.Add([pscustomobject]@{
                Key = $parts[0].Trim()
                Value = Normalize-StringValue $parts[1]
                Source = $file.FullName
            })
        }
    }

    return $rows
}

function Get-NameCandidates {
    param(
        [object[]]$Entries,
        [string]$DisplayName
    )

    $rows = New-Object System.Collections.Generic.List[object]
    foreach ($entry in $Entries) {
        if ($entry.Value -ne $DisplayName) {
            continue
        }

        $kind = $null
        $id = $null

        if ($entry.Key -match '^Unit/Name/(.+)$') {
            $kind = "UnitName"
            $id = $Matches[1]
        } elseif ($entry.Key -match '^UserData/TechUnit/(.+?)_Name$') {
            $kind = "TechUnit"
            $id = $Matches[1]
        } elseif ($entry.Key -match '^ArmyCategory/Name/(.+)$') {
            $kind = "ArmyCategory"
            $id = $Matches[1]
        } elseif ($entry.Key -match '^Button/Name/(.+)$') {
            $kind = "Button"
            $id = $Matches[1]
        }

        if ([string]::IsNullOrWhiteSpace($id)) {
            continue
        }

        $rows.Add([pscustomobject]@{
            Id = $id
            Kind = $kind
            Key = $entry.Key
            Source = $entry.Source
        })
    }

    return @($rows | Sort-Object Kind, Id, Key -Unique)
}

function Get-AliasCandidates {
    param(
        [hashtable]$Map,
        [string]$Commander,
        [string]$DisplayName
    )

    $rows = New-Object System.Collections.Generic.List[object]
    $key = "$Commander|$DisplayName"
    if (-not $Map.ContainsKey($key)) {
        return @()
    }

    foreach ($id in @($Map[$key])) {
        $rows.Add([pscustomobject]@{
            Id = $id
            Kind = "ManualAlias"
            Key = "ManualAlias/$key/$id"
            Source = "scripts/export-current-vs-sc2-build-coop-roster.ps1"
        })
    }

    return @($rows | Sort-Object Kind, Id, Key -Unique)
}

function Get-GameDataRoots {
    param([string]$Root)

    if (-not (Test-Path -LiteralPath $Root)) {
        return @()
    }

    return @(Get-ChildItem -LiteralPath $Root -Recurse -Directory |
        Where-Object { $_.FullName -match '\\base\.sc2data\\gamedata$' } |
        ForEach-Object { $_.FullName } |
        Sort-Object -Unique)
}

function Get-CatalogIndex {
    param(
        [string]$Root,
        [string]$Label
    )

    $gameDataRoots = Get-GameDataRoots $Root
    $unitIds = New-Set
    $unitParents = @{}
    $unitSources = @{}
    $unitNames = @{}
    $abilRefs = @{}
    $gameDataRefs = @{}
    $actorIds = @{}
    $modelAssets = @{}
    $armyCategoryUnits = @{}
    $unitNameRefs = @{}
    $techUnitEntries = New-Object System.Collections.Generic.List[object]
    $techUnitCommanders = @{}
    $techUnitUnits = @{}
    $unitCommanders = @{}

    foreach ($gameDataRoot in $gameDataRoots) {
        $xmlFiles = @(Get-ChildItem -LiteralPath $gameDataRoot -Recurse -File -Filter "*.xml")

        foreach ($xmlFile in $xmlFiles) {
            try {
                [xml]$catalogXml = Get-Content -LiteralPath $xmlFile.FullName -Raw -Encoding UTF8
            } catch {
                continue
            }

            foreach ($node in $catalogXml.SelectNodes('/Catalog/CUnit[@id]')) {
                $id = $node.GetAttribute("id")
                if ([string]::IsNullOrWhiteSpace($id)) {
                    continue
                }
                Add-ToSet $unitIds $id
                Add-MapSet $unitSources $id $xmlFile.FullName
                if ($node.HasAttribute("parent")) {
                    $unitParents[$id] = $node.GetAttribute("parent")
                }
                $nameNode = $node.SelectSingleNode('./Name')
                if ($nameNode -and $nameNode.HasAttribute("value")) {
                    $unitNames[$id] = $nameNode.GetAttribute("value")
                }
            }

            foreach ($node in $catalogXml.SelectNodes('/Catalog/CArmyCategory[@id]')) {
                $id = $node.GetAttribute("id")
                if ([string]::IsNullOrWhiteSpace($id)) {
                    continue
                }

                foreach ($unitNode in $node.SelectNodes('./Unit[@value]')) {
                    Add-MapSet $armyCategoryUnits $id $unitNode.GetAttribute("value")
                }
            }

            foreach ($techUser in $catalogXml.SelectNodes('/Catalog/CUser[@id="TechUnit"]')) {
                foreach ($node in $techUser.SelectNodes('./Instances[@Id]')) {
                    $id = $node.GetAttribute("Id")
                    if ([string]::IsNullOrWhiteSpace($id) -or $id -eq "[Default]") {
                        continue
                    }

                    $commanders = New-Set
                    foreach ($commanderNode in $node.SelectNodes('./User[@Type="PlayerCommanders"]')) {
                        $commanderId = $commanderNode.GetAttribute("Instance")
                        if ($commanderId -ne "[Default]") {
                            Add-ToSet $commanders $commanderId
                        }
                    }

                    $armyCategories = New-Set
                    Add-ToSet $armyCategories $id
                    foreach ($gameLinkNode in $node.SelectNodes('./GameLink[@GameLink]')) {
                        $fieldNode = $gameLinkNode.SelectSingleNode('./Field[@Id="ArmyCategoryOn" or @Id="ArmyCategoryOff"]')
                        if ($fieldNode) {
                            Add-ToSet $armyCategories $gameLinkNode.GetAttribute("GameLink")
                        }
                    }

                    $techUnitEntries.Add([pscustomobject]@{
                        Id = $id
                        Commanders = Set-ToArray $commanders
                        ArmyCategories = Set-ToArray $armyCategories
                    })
                }
            }
        }

        foreach ($xmlFile in $xmlFiles) {
            $raw = Get-Content -LiteralPath $xmlFile.FullName -Raw -Encoding UTF8
            foreach ($match in [regex]::Matches($raw, 'Unit="([^"]+)"')) {
                $unitRef = $match.Groups[1].Value
                if ($xmlFile.Name -ieq "AbilData.xml") {
                    Add-MapSet $abilRefs $unitRef $xmlFile.FullName
                } else {
                    Add-MapSet $gameDataRefs $unitRef $xmlFile.FullName
                }
            }

            foreach ($match in [regex]::Matches($raw, 'Reference="Unit,([^,"]+),Name"\s+Value="Unit/Name/([^"]+)"')) {
                $unitId = $match.Groups[1].Value
                $nameId = $match.Groups[2].Value
                Add-MapSet $unitNameRefs $nameId $unitId
            }
        }

        $actorPath = Join-Path $gameDataRoot "ActorData.xml"
        if (Test-Path -LiteralPath $actorPath) {
            [xml]$actorXml = Get-Content -LiteralPath $actorPath -Raw -Encoding UTF8
            foreach ($actorNode in $actorXml.SelectNodes('/Catalog/*[@id]')) {
                $actorId = $actorNode.GetAttribute("id")
                if ([string]::IsNullOrWhiteSpace($actorId)) {
                    continue
                }
                $unitName = $null
                if ($actorNode.HasAttribute("unitName")) {
                    $unitName = $actorNode.GetAttribute("unitName")
                } elseif ($unitIds.Contains($actorId)) {
                    $unitName = $actorId
                }

                if ([string]::IsNullOrWhiteSpace($unitName)) {
                    continue
                }

                Add-MapSet $actorIds $unitName $actorId
                foreach ($modelNode in $actorNode.SelectNodes('./Model[@value]')) {
                    Add-MapSet $modelAssets $unitName $modelNode.GetAttribute("value")
                }
            }
        }

        $modelPath = Join-Path $gameDataRoot "ModelData.xml"
        if (Test-Path -LiteralPath $modelPath) {
            [xml]$modelXml = Get-Content -LiteralPath $modelPath -Raw -Encoding UTF8
            foreach ($unitId in Set-ToArray $unitIds) {
                if (-not $actorIds.ContainsKey($unitId)) {
                    continue
                }

                foreach ($actorId in Set-ToArray $actorIds[$unitId]) {
                    $modelNode = $modelXml.SelectSingleNode("/Catalog/*[@id='$actorId']")
                    if (-not $modelNode) {
                        continue
                    }

                    foreach ($valueNode in $modelNode.SelectNodes('./Model[@value]')) {
                        Add-MapSet $modelAssets $unitId $valueNode.GetAttribute("value")
                    }
                }
            }
        }
    }

    foreach ($entry in $techUnitEntries) {
        foreach ($commanderId in @($entry.Commanders)) {
            Add-MapSet $techUnitCommanders $entry.Id $commanderId
        }

        $entryUnits = New-Set
        foreach ($categoryId in @($entry.ArmyCategories)) {
            if ($armyCategoryUnits.ContainsKey($categoryId)) {
                foreach ($unitId in Set-ToArray $armyCategoryUnits[$categoryId]) {
                    Add-ToSet $entryUnits $unitId
                }
            }
        }

        if ($unitIds.Contains($entry.Id)) {
            Add-ToSet $entryUnits $entry.Id
        }

        foreach ($unitId in Set-ToArray $entryUnits) {
            Add-MapSet $techUnitUnits $entry.Id $unitId
            foreach ($commanderId in @($entry.Commanders)) {
                Add-MapSet $unitCommanders $unitId $commanderId
            }
        }
    }

    return [pscustomobject]@{
        Label = $Label
        Root = $Root
        GameDataRoots = $gameDataRoots
        UnitIds = $unitIds
        UnitParents = $unitParents
        UnitSources = $unitSources
        UnitNames = $unitNames
        AbilRefs = $abilRefs
        GameDataRefs = $gameDataRefs
        ActorIds = $actorIds
        ModelAssets = $modelAssets
        ArmyCategoryUnits = $armyCategoryUnits
        UnitNameRefs = $unitNameRefs
        TechUnitCommanders = $techUnitCommanders
        TechUnitUnits = $techUnitUnits
        UnitCommanders = $unitCommanders
    }
}

function Get-UnitEvidence {
    param(
        [object]$Index,
        [string]$UnitId
    )

    $tags = New-Set
    if ($Index.UnitIds.Contains($UnitId)) {
        Add-ToSet $tags "CUnit"
    }
    if ($Index.AbilRefs.ContainsKey($UnitId)) {
        Add-ToSet $tags "AbilData.UnitRef"
    }
    if ($Index.GameDataRefs.ContainsKey($UnitId)) {
        Add-ToSet $tags "GameData.UnitRef"
    }

    return Set-ToArray $tags
}

function Get-EvidenceIds {
    param(
        [object]$Index,
        [string[]]$CandidateIds
    )

    $ids = New-Set
    foreach ($id in $CandidateIds) {
        $evidence = @(Get-UnitEvidence $Index $id)
        if ($evidence.Count -gt 0) {
            Add-ToSet $ids $id
        }
    }

    return Set-ToArray $ids
}

function Get-EvidenceIdsFromCandidates {
    param(
        [object]$Index,
        [object[]]$Candidates,
        [string[]]$CommanderIds = @()
    )

    $candidateIds = New-Set
    $candidateIdsWithCommander = New-Set
    foreach ($candidate in $Candidates) {
        $id = $candidate.Id
        if ([string]::IsNullOrWhiteSpace($id)) {
            continue
        }

        $directEvidence = @(Get-UnitEvidence $Index $id)
        if ($directEvidence.Count -gt 0) {
            Add-ToSet $candidateIds $id
            if ($Index.UnitCommanders.ContainsKey($id)) {
                $unitCommanderIds = @(Set-ToArray $Index.UnitCommanders[$id])
                if (@(Intersect-Values $unitCommanderIds $CommanderIds).Count -gt 0) {
                    Add-ToSet $candidateIdsWithCommander $id
                }
            }
            continue
        }

        if ($candidate.Kind -in @("TechUnit", "ArmyCategory", "ManualAlias") -and $Index.ArmyCategoryUnits.ContainsKey($id)) {
            foreach ($unitId in Set-ToArray $Index.ArmyCategoryUnits[$id]) {
                Add-ToSet $candidateIds $unitId
                if ($Index.UnitCommanders.ContainsKey($unitId)) {
                    $unitCommanderIds = @(Set-ToArray $Index.UnitCommanders[$unitId])
                    if (@(Intersect-Values $unitCommanderIds $CommanderIds).Count -gt 0) {
                        Add-ToSet $candidateIdsWithCommander $unitId
                    }
                }
            }
        }

        if ($candidate.Kind -in @("UnitName", "ManualAlias") -and $Index.UnitNameRefs.ContainsKey($id)) {
            foreach ($unitId in Set-ToArray $Index.UnitNameRefs[$id]) {
                Add-ToSet $candidateIds $unitId
                if ($Index.UnitCommanders.ContainsKey($unitId)) {
                    $unitCommanderIds = @(Set-ToArray $Index.UnitCommanders[$unitId])
                    if (@(Intersect-Values $unitCommanderIds $CommanderIds).Count -gt 0) {
                        Add-ToSet $candidateIdsWithCommander $unitId
                    }
                }
            }
        }

        if ($candidate.Kind -in @("TechUnit", "ArmyCategory", "ManualAlias") -and $Index.TechUnitUnits.ContainsKey($id)) {
            foreach ($unitId in Set-ToArray $Index.TechUnitUnits[$id]) {
                Add-ToSet $candidateIds $unitId
                if ($Index.TechUnitCommanders.ContainsKey($id)) {
                    $techCommanders = @(Set-ToArray $Index.TechUnitCommanders[$id])
                    if (@(Intersect-Values $techCommanders $CommanderIds).Count -gt 0) {
                        Add-ToSet $candidateIdsWithCommander $unitId
                    }
                }
            }
        }
    }

    if ($CommanderIds.Count -gt 0 -and $candidateIdsWithCommander.Count -gt 0) {
        return Get-EvidenceIds $Index (Set-ToArray $candidateIdsWithCommander)
    }

    return Get-EvidenceIds $Index (Set-ToArray $candidateIds)
}

function Get-UnitShortSummary {
    param(
        [object]$Index,
        [string[]]$UnitIds
    )

    $rows = New-Object System.Collections.Generic.List[string]
    foreach ($id in @($UnitIds | Sort-Object -Unique)) {
        $parts = New-Object System.Collections.Generic.List[string]
        $parts.Add($id)
        if ($Index.UnitParents.ContainsKey($id)) {
            $parts.Add("parent=$($Index.UnitParents[$id])")
        }
        $evidence = @(Get-UnitEvidence $Index $id)
        if ($evidence.Count -gt 0) {
            $parts.Add("evidence=$(Join-Values $evidence ',')")
        }
        if ($Index.ActorIds.ContainsKey($id)) {
            $actors = @(Set-ToArray $Index.ActorIds[$id] | Select-Object -First 3)
            $parts.Add("actor=$(Join-Values $actors ',')")
        }
        if ($Index.ModelAssets.ContainsKey($id)) {
            $models = @(Set-ToArray $Index.ModelAssets[$id] | Select-Object -First 2)
            $parts.Add("model=$(Join-Values $models ',')")
        }

        $rows.Add(($parts -join "; "))
    }

    return Join-Values $rows "<br>"
}

function Intersect-Values {
    param(
        [string[]]$Left,
        [string[]]$Right
    )

    $rightSet = New-Set
    foreach ($value in $Right) {
        Add-ToSet $rightSet $value
    }

    $result = New-Set
    foreach ($value in $Left) {
        if ($rightSet.Contains($value)) {
            Add-ToSet $result $value
        }
    }

    return Set-ToArray $result
}

function New-RosterEntry {
    param(
        [string]$Commander,
        [string]$Name,
        [string]$Kind,
        [string]$Source
    )

    return [pscustomobject]@{
        Commander = $Commander
        Name = $Name
        Kind = $Kind
        Source = $Source
    }
}

$wikiData = Get-Content -LiteralPath $wikiRosterPath -Raw -Encoding UTF8 | ConvertFrom-Json
$roster = New-Object System.Collections.Generic.List[object]
foreach ($commander in $wikiData) {
    foreach ($unit in @($commander.units)) {
        $roster.Add((New-RosterEntry $commander.commander $unit.name "兵种" "wiki"))
    }
    foreach ($building in @($commander.buildings)) {
        $roster.Add((New-RosterEntry $commander.commander $building.name "建筑" "wiki"))
    }
}

$alarakUnits = @("死徒", "杀戮者", "浩劫", "晋升者", "先锋", "天罚行者", "战争棱镜")
foreach ($name in $alarakUnits) {
    $roster.Add((New-RosterEntry "阿拉纳克 Alarak" $name "兵种" "docs/指挥官威望/阿拉纳克.md"))
}
$roster.Add((New-RosterEntry "阿拉纳克 Alarak" "光子炮台" "建筑" "docs/指挥官威望/阿拉纳克.md"))

$roster = @($roster | Sort-Object Commander, Kind, Name -Unique)

$officialStrings = Get-StringEntries $Sc2BuildExportRoot
$officialIndex = Get-CatalogIndex $Sc2BuildExportRoot "SC2 Build 96883"
$currentIndexCache = @{}
$currentStringCache = @{}

$rows = New-Object System.Collections.Generic.List[object]

foreach ($entry in $roster) {
    $moduleName = $commanderModules[$entry.Commander]
    if ([string]::IsNullOrWhiteSpace($moduleName)) {
        continue
    }

    $modRoot = Join-Path $modsRoot $moduleName
    if (-not $currentIndexCache.ContainsKey($moduleName)) {
        $currentIndexCache[$moduleName] = Get-CatalogIndex $modRoot $moduleName
        $currentStringCache[$moduleName] = Get-StringEntries $modRoot
    }

    $currentIndex = $currentIndexCache[$moduleName]
    $currentStrings = $currentStringCache[$moduleName]

    $officialCandidates = @(
        @(Get-NameCandidates $officialStrings $entry.Name)
        @(Get-AliasCandidates $officialAliasCandidates $entry.Commander $entry.Name)
    )
    $currentCandidates = @(Get-NameCandidates $currentStrings $entry.Name)
    $officialCandidateIds = @($officialCandidates | ForEach-Object Id | Sort-Object -Unique)
    $currentCandidateIds = @($currentCandidates | ForEach-Object Id | Sort-Object -Unique)
    $officialCommanderIds = @()
    if ($commanderPlayerIds.ContainsKey($entry.Commander)) {
        $officialCommanderIds = @($commanderPlayerIds[$entry.Commander])
    }

    $officialEvidenceIds = @(Get-EvidenceIdsFromCandidates $officialIndex $officialCandidates $officialCommanderIds)
    $currentEvidenceFromCurrentIds = @(Get-EvidenceIdsFromCandidates $currentIndex $currentCandidates)
    $currentEvidenceFromOfficialIds = @(Get-EvidenceIds $currentIndex $officialEvidenceIds)
    $currentEvidenceIds = @($currentEvidenceFromCurrentIds + $currentEvidenceFromOfficialIds | Sort-Object -Unique)
    $sharedIds = @(Intersect-Values $currentEvidenceIds $officialEvidenceIds)

    $status = "SameId"
    if ($officialEvidenceIds.Count -eq 0 -and $currentEvidenceIds.Count -eq 0) {
        if ($officialCandidateIds.Count -eq 0) {
            $status = "NoOfficialCandidate"
        } elseif ($currentCandidateIds.Count -gt 0) {
            $status = "LocalizedOnly"
        } else {
            $status = "Missing"
        }
    } elseif ($officialEvidenceIds.Count -eq 0) {
        $status = "OfficialUnresolved"
    } elseif ($currentEvidenceIds.Count -eq 0) {
        if ($currentCandidateIds.Count -gt 0) {
            $status = "LocalizedOnly"
        } else {
            $status = "Missing"
        }
    } elseif ($sharedIds.Count -eq 0) {
        $status = "DifferentId"
    } elseif ($officialEvidenceIds.Count -gt 1 -or $currentEvidenceIds.Count -gt 1) {
        $status = "Ambiguous"
    }

    $rows.Add([pscustomobject]@{
        Commander = $entry.Commander
        Module = $moduleName
        Kind = $entry.Kind
        Name = $entry.Name
        Source = $entry.Source
        Status = $status
        CurrentLocalizedIds = $currentCandidateIds
        CurrentEvidenceIds = $currentEvidenceIds
        OfficialCandidateIds = $officialCandidateIds
        OfficialEvidenceIds = $officialEvidenceIds
        SharedIds = $sharedIds
        CurrentSummary = Get-UnitShortSummary $currentIndex $currentEvidenceIds
        OfficialSummary = Get-UnitShortSummary $officialIndex $officialEvidenceIds
        CurrentKeys = @($currentCandidates | ForEach-Object Key | Sort-Object -Unique)
        OfficialKeys = @($officialCandidates | ForEach-Object Key | Sort-Object -Unique)
    })
}

$report = New-Object System.Collections.Generic.List[string]
$report.Add("# 当前实际兵种建筑对比：SC2 Build 96883")
$report.Add("")
$report.Add("日期：2026-05-25")
$report.Add("")
$report.Add("## 口径")
$report.Add("")
$report.Add("- 当前侧：只读取 合作指挥官版起义狂潮/Mods/XM/<Commander>.SC2Mod 当前实际文件。")
$report.Add("- 参考侧：读取 游戏数据/官方SC2原始文本镜像；旧 references/sc2-build-96883-casc-export 已废弃，不再作为官方事实源。")
$report.Add("- 条目集合：17 位指挥官沿用 docs/维基指挥官/兵种/all_commanders_data.json 作为待检查清单；阿拉纳克因该 JSON 缺失，沿用 docs/指挥官威望/阿拉纳克.md 的主战单位/光子炮台清单。")
$report.Add("- 官方 ID、模型、actor、能力引用均从 Build 96883 导出解析；不再使用旧 references/official-casc-export。")
$report.Add("- 官方候选解析会穿透 ArmyCategory.Unit 和升级中的 Unit 名称改写，例如 CarrierPurifier -> Tempest、ACAlarakSlayer -> Stalker。")
$report.Add("- 对带 TechUnit.PlayerCommanders 归属的官方条目，优先按当前指挥官过滤官方候选，以减少其他指挥官同名单位造成的假歧义。")
$report.Add("- 少量 Wiki 中文名与官方 zhCN 文本不完全一致的条目使用脚本内显式别名，只用于官方侧候选，不作为当前模块落地证据。")
$report.Add("- 本轮是静态文件对比，没有进图验证，没有修改 XMFinal.SC2Mod/DocumentHeader / DocumentInfo。")
$report.Add("")
$report.Add("## 状态定义")
$report.Add("")
$report.Add("- SameId：当前模块落地 ID 与 Build 96883 官方落地 ID 有交集。")
$report.Add("- Ambiguous：有交集，但任一侧同名落到多个 ID，需要结合训练/建造链或实机卡片继续裁剪。")
$report.Add("- DifferentId：当前模块有落地证据，但与 Build 96883 官方落地 ID 没有交集，属于同名异体风险。")
$report.Add("- LocalizedOnly：当前模块只有本地化命名，没有 CUnit 定义或 Unit 属性引用落地。")
$report.Add("- Missing：当前模块没有命名，也没有官方 ID 的落地证据。")
$report.Add("- OfficialUnresolved / NoOfficialCandidate：Build 96883 侧未能把该中文条目解析到 CUnit，需要单独查训练链或条目名称。")
$report.Add("")

$summary = @($rows | Group-Object Commander | ForEach-Object {
    $groupRows = @($_.Group)
    [pscustomobject]@{
        Commander = $_.Name
        Total = $groupRows.Count
        SameId = @($groupRows | Where-Object Status -eq "SameId").Count
        Ambiguous = @($groupRows | Where-Object Status -eq "Ambiguous").Count
        DifferentId = @($groupRows | Where-Object Status -eq "DifferentId").Count
        LocalizedOnly = @($groupRows | Where-Object Status -eq "LocalizedOnly").Count
        Missing = @($groupRows | Where-Object Status -eq "Missing").Count
        OfficialUnresolved = @($groupRows | Where-Object { $_.Status -in @("OfficialUnresolved", "NoOfficialCandidate") }).Count
    }
} | Sort-Object Commander)

$report.Add("## 总览")
$report.Add("")
$report.Add("| 指挥官 | 条目 | 直接对齐 | 未直接对齐 | Ambiguous | DifferentId | LocalizedOnly | Missing | 官方未解析 |")
$report.Add("|---|---:|---:|---:|---:|---:|---:|---:|---:|")
foreach ($item in $summary) {
    $nonDirect = $item.Total - $item.SameId
    $report.Add("| $($item.Commander) | $($item.Total) | $($item.SameId) | $nonDirect | $($item.Ambiguous) | $($item.DifferentId) | $($item.LocalizedOnly) | $($item.Missing) | $($item.OfficialUnresolved) |")
}
$report.Add("")

$nonDirectRows = @($rows | Where-Object Status -ne "SameId" | Sort-Object Commander, Status, Name)
$report.Add("## 全量未直接对齐清单")
$report.Add("")
if ($nonDirectRows.Count -eq 0) {
    $report.Add("- 所有条目均为 SameId。")
} else {
    $report.Add('- 这里包含 Ambiguous。Ambiguous 不一定是错误，但不是[完全裁剪到单一官方对象]的直接对齐。')
    $report.Add("")
    $report.Add("| 指挥官 | 条目 | 类型 | 状态 | 结论 | 当前落地 ID | Build 96883 官方落地 ID | 共享 ID |")
    $report.Add("|---|---|---|---|---|---|---|---|")
    foreach ($row in $nonDirectRows) {
        $report.Add("| $($row.Commander) | $($row.Name) | $($row.Kind) | $($row.Status) | $(Get-StatusDiagnosis $row.Status) | $(Join-Values $row.CurrentEvidenceIds) | $(Join-Values $row.OfficialEvidenceIds) | $(Join-Values $row.SharedIds) |")
    }
}
$report.Add("")

$focusRows = @($rows | Where-Object { $_.Status -in @("DifferentId", "LocalizedOnly", "Missing", "OfficialUnresolved", "NoOfficialCandidate") } | Sort-Object Commander, Status, Name)
$report.Add("## 需要优先复核")
$report.Add("")
if ($focusRows.Count -eq 0) {
    $report.Add("- 未发现硬缺口或 ID 漂移。")
} else {
    $report.Add("| 指挥官 | 条目 | 类型 | 状态 | 当前落地 ID | Build 96883 官方落地 ID | 当前命名 ID |")
    $report.Add("|---|---|---|---|---|---|---|")
    foreach ($row in $focusRows) {
        $report.Add("| $($row.Commander) | $($row.Name) | $($row.Kind) | $($row.Status) | $(Join-Values $row.CurrentEvidenceIds) | $(Join-Values $row.OfficialEvidenceIds) | $(Join-Values $row.CurrentLocalizedIds) |")
    }
}
$report.Add("")

$report.Add("## 明细")
$report.Add("")
foreach ($commanderName in @($commanderModules.Keys)) {
    $commanderRows = @($rows | Where-Object Commander -eq $commanderName | Sort-Object Kind, Name)
    if ($commanderRows.Count -eq 0) {
        continue
    }

    $moduleName = $commanderModules[$commanderName]
    $report.Add("### $commanderName")
    $report.Add("")
    $report.Add("- 当前模块：$moduleName")
    $report.Add("")
    $report.Add("| 条目 | 类型 | 状态 | 当前落地 ID | Build 96883 官方 ID | 共享 ID | 当前摘要 | 官方摘要 |")
    $report.Add("|---|---|---|---|---|---|---|---|")
    foreach ($row in $commanderRows) {
        $report.Add("| $($row.Name) | $($row.Kind) | $($row.Status) | $(Join-Values $row.CurrentEvidenceIds) | $(Join-Values $row.OfficialEvidenceIds) | $(Join-Values $row.SharedIds) | $($row.CurrentSummary) | $($row.OfficialSummary) |")
    }
    $report.Add("")
}

$report.Add("## 直接结论")
$report.Add("")
$hardCount = @($rows | Where-Object { $_.Status -in @("Missing", "LocalizedOnly") }).Count
$differentCount = @($rows | Where-Object Status -eq "DifferentId").Count
$ambiguousCount = @($rows | Where-Object Status -eq "Ambiguous").Count
$unresolvedCount = @($rows | Where-Object { $_.Status -in @("OfficialUnresolved", "NoOfficialCandidate") }).Count
$nonDirectCount = @($rows | Where-Object Status -ne "SameId").Count
$nonDirectCommanders = @($rows | Where-Object Status -ne "SameId" | Select-Object -ExpandProperty Commander -Unique | Sort-Object)
$report.Add("1. 当前硬缺口（Missing + LocalizedOnly）共 $hardCount 条。")
$report.Add("2. 同名但 ID 不同（DifferentId）共 $differentCount 条，优先级高于普通本地化补漏，因为它们可能已经接了错误模型或错误机制。")
$report.Add("3. 多候选（Ambiguous）共 $ambiguousCount 条，通常来自普通/潜地/攻城/投射体/英雄人格等多形态，需要后续按训练能力链裁剪主对象。")
$report.Add("4. 官方未解析（OfficialUnresolved + NoOfficialCandidate）共 $unresolvedCount 条；剩余重点已经转为当前侧缺失、仅本地化、或 ID 漂移。")
$report.Add("5. 如果把 Ambiguous 也算未完全对齐，全量未直接对齐共 $nonDirectCount 条，涉及：$(Join-Values $nonDirectCommanders '、')。")
$report.Add("6. 如果后续要逐步对齐，建议顺序是：Missing / LocalizedOnly -> DifferentId -> Ambiguous 主对象裁剪。")

$outputDir = Split-Path -Parent $OutputPath
if (-not (Test-Path -LiteralPath $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir | Out-Null
}

[System.IO.File]::WriteAllLines($OutputPath, $report, [System.Text.UTF8Encoding]::new($false))
Write-Output "Wrote $OutputPath"
