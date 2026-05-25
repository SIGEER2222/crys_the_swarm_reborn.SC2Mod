param(
    [string]$OutputPath,
    [string]$Sc2BuildExportRoot,
    [string]$ScenarioRoot
)

$ErrorActionPreference = "Stop"

$scriptRoot = if ($PSScriptRoot) { $PSScriptRoot } else { Split-Path -Parent $MyInvocation.MyCommand.Path }
$repoRoot = Split-Path -Parent $scriptRoot

if ([string]::IsNullOrWhiteSpace($OutputPath)) {
    $OutputPath = Join-Path $repoRoot "docs\指挥官\官方合作指挥官对当前XM落地差异-SC2Build96883-2026-05-25.md"
}

if ([string]::IsNullOrWhiteSpace($Sc2BuildExportRoot)) {
    $Sc2BuildExportRoot = Join-Path $repoRoot "references\sc2-build-96883-casc-export"
}

if ([string]::IsNullOrWhiteSpace($ScenarioRoot)) {
    $ScenarioRoot = Join-Path $repoRoot "合作指挥官版起义狂潮"
}

$modsRoot = Join-Path $ScenarioRoot "Mods\XM"

$commanderDefs = @(
    [pscustomobject]@{ Key = "Abathur"; Display = "阿巴瑟 Abathur"; PlayerId = "ZergAbathur"; Module = "XMAbathurReborn.SC2Mod"; Source = "TechUnit+AbilityChain" },
    [pscustomobject]@{ Key = "Alarak"; Display = "阿拉纳克 Alarak"; PlayerId = "ProtossAlarak"; Module = "XMAlarak.SC2Mod"; Source = "TechUnit" },
    [pscustomobject]@{ Key = "Artanis"; Display = "阿塔尼斯 Artanis"; PlayerId = "ProtossArtanis"; Module = "XMArtanis.SC2Mod"; Source = "TechUnit" },
    [pscustomobject]@{ Key = "Dehaka"; Display = "德哈卡 Dehaka"; PlayerId = "ZergDehaka"; Module = "XMDehaka.SC2Mod"; Source = "CuratedOfficialIds" },
    [pscustomobject]@{ Key = "Fenix"; Display = "菲尼克斯 Fenix"; PlayerId = "ProtossFenix"; Module = "XMFenix.SC2Mod"; Source = "TechUnit" },
    [pscustomobject]@{ Key = "Horner"; Display = "霍纳与汉 Han & Horner"; PlayerId = "TerranHorner"; Module = "XMMira.SC2Mod"; Source = "TechUnit+AbilityChain" },
    [pscustomobject]@{ Key = "Karax"; Display = "凯拉克斯 Karax"; PlayerId = "ProtossKarax"; Module = "XMKarax.SC2Mod"; Source = "TechUnit" },
    [pscustomobject]@{ Key = "Kerrigan"; Display = "凯瑞甘 Kerrigan"; PlayerId = "ZergKerrigan"; Module = "XMKerrigan.SC2Mod"; Source = "TechUnit" },
    [pscustomobject]@{ Key = "Mengsk"; Display = "蒙斯克 Mengsk"; PlayerId = "TerranMengsk"; Module = "XMMengsk.SC2Mod"; Source = "CuratedOfficialIds" },
    [pscustomobject]@{ Key = "Nova"; Display = "诺娃 Nova"; PlayerId = "TerranNova"; Module = "XMNova.SC2Mod"; Source = "TechUnit" },
    [pscustomobject]@{ Key = "Raynor"; Display = "雷诺 Raynor"; PlayerId = "TerranRaynor"; Module = "XMRaynor.SC2Mod"; Source = "TechUnit" },
    [pscustomobject]@{ Key = "Stetmann"; Display = "斯台特曼 Stetmann"; PlayerId = "ZergStetmann"; Module = "XMStetmann.SC2Mod"; Source = "CuratedOfficialIds" },
    [pscustomobject]@{ Key = "Stukov"; Display = "斯托科夫 Stukov"; PlayerId = "ZergStukov"; Module = "XMStukov.SC2Mod"; Source = "TechUnit" },
    [pscustomobject]@{ Key = "Swann"; Display = "斯旺 Swann"; PlayerId = "TerranSwann"; Module = "XMSwann.SC2Mod"; Source = "TechUnit" },
    [pscustomobject]@{ Key = "Tychus"; Display = "泰凯斯 Tychus"; PlayerId = "TerranTychus"; Module = "XMTychus.SC2Mod"; Source = "CommanderXml" },
    [pscustomobject]@{ Key = "Vorazun"; Display = "沃拉尊 Vorazun"; PlayerId = "ProtossVorazun"; Module = "XMVorazun.SC2Mod"; Source = "TechUnit" },
    [pscustomobject]@{ Key = "Zagara"; Display = "扎加拉 Zagara"; PlayerId = "ZergZagara"; Module = "XMZagara.SC2Mod"; Source = "TechUnit" },
    [pscustomobject]@{ Key = "Zeratul"; Display = "泽拉图 Zeratul"; PlayerId = "ProtossZeratul"; Module = "XMZeratul.SC2Mod"; Source = "TechUnit" }
)

$curatedOfficialIds = @{
    Abathur = @(
        "Roach",
        "RavagerAbathur",
        "QueenCoop",
        "SwarmHost",
        "Mutalisk",
        "GuardianMP",
        "Devourer",
        "Brutalisk",
        "HotSLeviathan",
        "ImpalerAbathur",
        "Viper",
        "OverseerSiegeMode",
        "NydusNetwork",
        "SpineCrawler",
        "SporeCrawler"
    )
    Dehaka = @(
        "DehakaCoop",
        "DehakaDrone",
        "DehakaHatchery",
        "DehakaAirTownHall",
        "DehakaBarracks",
        "DehakaCreeper",
        "DehakaCreeperFlying",
        "DehakaGlevig",
        "DehakaGlevigStructure",
        "DehakaMurvar",
        "DehakaMurvarStructure",
        "DehakaDakrun",
        "DehakaDakrunStructure",
        "DehakaHydraliskLevel2",
        "DehakaMutaliskLevel3",
        "DehakaNydusDestroyer",
        "DehakaPrimalSwarmHost",
        "DehakaRavasaur",
        "DehakaRoachLevel2",
        "DehakaRoachLevel3",
        "DehakaSwarmHost",
        "DehakaUltraliskLevel2",
        "DehakaUltraliskLevel3",
        "DehakaZerglingLevel2",
        "ImpalerDehaka"
    )
    Mengsk = @(
        "SCVMengsk",
        "CommandCenterMengsk",
        "OrbitalCommandMengsk",
        "SupplyDepotMengsk",
        "BunkerDepotMengsk",
        "MissileTurretMengsk",
        "BarracksMengsk",
        "FactoryMengsk",
        "StarportMengsk",
        "EngineeringBayMengsk",
        "ArmoryMengsk",
        "FusionCoreMengsk",
        "GhostAcademyMengsk",
        "ArtilleryMengsk",
        "TrooperMengsk",
        "TrooperMengskAA",
        "TrooperMengskFlamethrower",
        "TrooperMengskImproved",
        "MarauderMengsk",
        "GhostMengsk",
        "MedivacMengsk",
        "SiegeTankMengsk",
        "SiegeTankMengskSieged",
        "ThorMengsk",
        "VikingMengskFighter",
        "VikingMengskAssault",
        "BattlecruiserMengsk",
        "RavenMengsk",
        "RavenMengskSieged"
    )
    Stetmann = @(
        "DroneStetmann",
        "HatcheryStetmann",
        "LairStetmann",
        "HiveStetmann",
        "ExtractorStetmann",
        "SpawningPoolStetmann",
        "EvolutionChamberStetmann",
        "BanelingNestStetmann",
        "HydraliskDenStetmann",
        "LurkerDenStetmann",
        "InfestationPitStetmann",
        "SpireStetmann",
        "GreaterSpireStetmann",
        "UltraliskCavernStetmann",
        "SpineCrawlerStetmann",
        "SpineCrawlerUprootedStetmann",
        "SporeCrawlerStetmann",
        "SporeCrawlerUprootedStetmann",
        "PowerTowerStetmann",
        "GaryStetmann",
        "SuperGaryStetmann",
        "ZerglingStetmann",
        "BanelingStetmann",
        "RoachStetmann",
        "RavagerStetmann",
        "HydraliskStetmann",
        "LurkerStetmann",
        "LurkerBurrowedStetmann",
        "InfestorStetmann",
        "UltraliskStetmann",
        "CorruptorStetmann",
        "BroodLordStetmann",
        "OverseerStetmann",
        "OverseerStetmannSiegeMode"
    )
}

$sourceRootsByCommander = @{
    Mengsk = Join-Path $Sc2BuildExportRoot "mods\starcoop\commanders\arcturusmengsk.sc2mod"
    Stetmann = Join-Path $Sc2BuildExportRoot "mods\starcoop\commanders\egonstetmann.sc2mod"
}

$manualNameFallback = @{
    "DehakaAirTownHall" = "原始空中主巢"
    "DehakaCreeperFlying" = "爆裂掘地虫"
    "RavenMengskSieged" = "帝国见证者"
    "VikingMengskAssault" = "天空之怒"
    "LurkerBurrowedStetmann" = "机械潜伏者"
    "OverseerStetmannSiegeMode" = "机械眼虫"
    "SpineCrawlerUprootedStetmann" = "机械脊针爬虫"
    "SporeCrawlerUprootedStetmann" = "机械孢子爬虫"
    "HotSLeviathan" = "利维坦"
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

function Escape-MarkdownCell {
    param([object]$Value)

    if ($null -eq $Value) {
        return "-"
    }

    $text = [string]$Value
    if ([string]::IsNullOrWhiteSpace($text)) {
        return "-"
    }

    return (($text -replace '\|', '\|') -replace "`r?`n", "<br>")
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

function Get-StringMap {
    param([object[]]$Entries)

    $map = @{}
    foreach ($entry in $Entries) {
        if (-not $map.ContainsKey($entry.Key)) {
            $map[$entry.Key] = $entry.Value
        }
    }

    return $map
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
    $unitIsStructure = @{}
    $abilRefs = @{}
    $gameDataRefs = @{}
    $actorIds = @{}
    $modelAssets = @{}
    $armyCategoryUnits = @{}
    $armyCategoryCommands = @{}
    $abilCommandUnits = @{}
    $unitBehaviors = @{}
    $behaviorInitialEffects = @{}
    $effectChildren = @{}
    $effectSpawnUnits = @{}
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
                if ($node.SelectSingleNode('./Attributes[@index="Structure" and (not(@value) or @value!="0")]') -or
                    $node.SelectSingleNode('./EditorCategories[contains(@value,"ObjectType:Structure")]')) {
                    $unitIsStructure[$id] = $true
                }
                foreach ($behaviorNode in $node.SelectNodes('./BehaviorArray[@Link]')) {
                    Add-MapSet $unitBehaviors $id $behaviorNode.GetAttribute("Link")
                }
            }

            foreach ($node in $catalogXml.SelectNodes('/Catalog/*[starts-with(name(),"CBehavior") and @id]')) {
                $id = $node.GetAttribute("id")
                if ([string]::IsNullOrWhiteSpace($id)) {
                    continue
                }
                foreach ($effectNode in $node.SelectNodes('./InitialEffect[@value]')) {
                    Add-MapSet $behaviorInitialEffects $id $effectNode.GetAttribute("value")
                }
            }

            foreach ($node in $catalogXml.SelectNodes('/Catalog/*[starts-with(name(),"CEffect") and @id]')) {
                $id = $node.GetAttribute("id")
                if ([string]::IsNullOrWhiteSpace($id)) {
                    continue
                }
                foreach ($effectNode in $node.SelectNodes('./EffectArray[@value]')) {
                    Add-MapSet $effectChildren $id $effectNode.GetAttribute("value")
                }
                foreach ($spawnNode in $node.SelectNodes('./SpawnUnit[@value]')) {
                    Add-MapSet $effectSpawnUnits $id $spawnNode.GetAttribute("value")
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
                foreach ($commandNode in $node.SelectNodes('./AbilCommandArray[@value]')) {
                    Add-MapSet $armyCategoryCommands $id $commandNode.GetAttribute("value")
                }
            }

            foreach ($node in $catalogXml.SelectNodes('/Catalog/*[starts-with(name(),"CAbil") and @id]')) {
                $abilId = $node.GetAttribute("id")
                if ([string]::IsNullOrWhiteSpace($abilId)) {
                    continue
                }

                foreach ($infoNode in $node.SelectNodes('./InfoArray[@index]')) {
                    $index = $infoNode.GetAttribute("index")
                    if ([string]::IsNullOrWhiteSpace($index)) {
                        continue
                    }

                    $cmd = "$abilId,$index"
                    if ($infoNode.HasAttribute("Unit")) {
                        Add-MapSet $abilCommandUnits $cmd $infoNode.GetAttribute("Unit")
                    }
                    foreach ($unitNode in $infoNode.SelectNodes('./Unit[@value]')) {
                        Add-MapSet $abilCommandUnits $cmd $unitNode.GetAttribute("value")
                    }
                }

                foreach ($infoNode in $node.SelectNodes('./Info[@Unit]')) {
                    Add-MapSet $abilCommandUnits "$abilId,Info" $infoNode.GetAttribute("Unit")
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

            foreach ($match in [regex]::Matches($raw, '<Unit\s+value="([^"]+)"')) {
                Add-MapSet $gameDataRefs $match.Groups[1].Value $xmlFile.FullName
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

    $resolvedSpawnerUnits = New-Object System.Collections.Generic.List[object]
    foreach ($unitId in Set-ToArray $unitIds) {
        if (-not $unitBehaviors.ContainsKey($unitId)) {
            continue
        }

        $spawnUnits = New-Set
        $effectsToVisit = New-Object System.Collections.Generic.Queue[string]
        $visitedEffects = New-Set
        foreach ($behavior in Set-ToArray $unitBehaviors[$unitId]) {
            if ($behaviorInitialEffects.ContainsKey($behavior)) {
                foreach ($effect in Set-ToArray $behaviorInitialEffects[$behavior]) {
                    $effectsToVisit.Enqueue($effect)
                }
            }
        }

        while ($effectsToVisit.Count -gt 0) {
            $effect = $effectsToVisit.Dequeue()
            if ($visitedEffects.Contains($effect)) {
                continue
            }
            Add-ToSet $visitedEffects $effect

            if ($effectSpawnUnits.ContainsKey($effect)) {
                foreach ($spawnUnit in Set-ToArray $effectSpawnUnits[$effect]) {
                    Add-ToSet $spawnUnits $spawnUnit
                }
            }
            if ($effectChildren.ContainsKey($effect)) {
                foreach ($childEffect in Set-ToArray $effectChildren[$effect]) {
                    $effectsToVisit.Enqueue($childEffect)
                }
            }
        }

        foreach ($spawnUnit in Set-ToArray $spawnUnits) {
            $resolvedSpawnerUnits.Add([pscustomobject]@{
                SpawnerUnit = $unitId
                SpawnUnit = $spawnUnit
            })
        }
    }

    foreach ($entry in $techUnitEntries) {
        foreach ($commanderId in @($entry.Commanders)) {
            Add-MapSet $techUnitCommanders $entry.Id $commanderId
        }

        $entryUnits = New-Set
        foreach ($categoryId in @($entry.ArmyCategories)) {
            $commandUnits = New-Set
            if ($armyCategoryUnits.ContainsKey($categoryId)) {
                foreach ($unitId in Set-ToArray $armyCategoryUnits[$categoryId]) {
                    Add-ToSet $entryUnits $unitId
                }
            }
            if ($armyCategoryCommands.ContainsKey($categoryId)) {
                foreach ($command in Set-ToArray $armyCategoryCommands[$categoryId]) {
                    if ($abilCommandUnits.ContainsKey($command)) {
                        foreach ($unitId in Set-ToArray $abilCommandUnits[$command]) {
                            Add-ResolvedUnitOrSpawn ([pscustomobject]@{ ResolvedSpawnerUnits = $resolvedSpawnerUnits }) $commandUnits $unitId
                        }
                    }
                }
            }
            if ($commandUnits.Count -gt 0) {
                $entryUnits = $commandUnits
            }
        }

        if ($unitIds.Contains($entry.Id)) {
            Add-ResolvedUnitOrSpawn ([pscustomobject]@{ ResolvedSpawnerUnits = $resolvedSpawnerUnits }) $entryUnits $entry.Id
        }

        if ($unitNameRefs.ContainsKey($entry.Id)) {
            foreach ($unitId in Set-ToArray $unitNameRefs[$entry.Id]) {
                Add-ResolvedUnitOrSpawn ([pscustomobject]@{ ResolvedSpawnerUnits = $resolvedSpawnerUnits }) $entryUnits $unitId
            }
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
        UnitIsStructure = $unitIsStructure
        AbilRefs = $abilRefs
        GameDataRefs = $gameDataRefs
        ActorIds = $actorIds
        ModelAssets = $modelAssets
        ArmyCategoryUnits = $armyCategoryUnits
        ArmyCategoryCommands = $armyCategoryCommands
        AbilCommandUnits = $abilCommandUnits
        ResolvedSpawnerUnits = $resolvedSpawnerUnits
        UnitNameRefs = $unitNameRefs
        TechUnitEntries = $techUnitEntries
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
    foreach ($id in @($CandidateIds)) {
        $evidence = @(Get-UnitEvidence $Index $id)
        if ($evidence.Count -gt 0) {
            Add-ToSet $ids $id
        }
    }

    return Set-ToArray $ids
}

function Get-NameCandidates {
    param(
        [object[]]$Entries,
        [string]$DisplayName
    )

    $rows = New-Object System.Collections.Generic.List[object]
    if ([string]::IsNullOrWhiteSpace($DisplayName)) {
        return @()
    }

    foreach ($entry in @($Entries)) {
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

function Resolve-CandidateIds {
    param(
        [object]$Index,
        [string[]]$Ids
    )

    $resolved = New-Set
    foreach ($id in @($Ids)) {
        if ([string]::IsNullOrWhiteSpace($id)) {
            continue
        }
        if ($Index.UnitIds.Contains($id)) {
            $spawns = @($Index.ResolvedSpawnerUnits | Where-Object SpawnerUnit -eq $id | ForEach-Object SpawnUnit | Sort-Object -Unique)
            if ($spawns.Count -gt 0) {
                foreach ($spawn in $spawns) {
                    Add-ToSet $resolved $spawn
                }
            } else {
                Add-ToSet $resolved $id
            }
        }
        if ($Index.ArmyCategoryUnits.ContainsKey($id)) {
            foreach ($unitId in Set-ToArray $Index.ArmyCategoryUnits[$id]) {
                Add-ToSet $resolved $unitId
            }
        }
        if ($Index.ArmyCategoryCommands.ContainsKey($id)) {
            foreach ($command in Set-ToArray $Index.ArmyCategoryCommands[$id]) {
                if ($Index.AbilCommandUnits.ContainsKey($command)) {
                    foreach ($unitId in Set-ToArray $Index.AbilCommandUnits[$command]) {
                        Add-ToSet $resolved $unitId
                    }
                }
            }
        }
        if ($Index.TechUnitUnits.ContainsKey($id)) {
            foreach ($unitId in Set-ToArray $Index.TechUnitUnits[$id]) {
                Add-ToSet $resolved $unitId
            }
        }
        if ($Index.UnitNameRefs.ContainsKey($id)) {
            foreach ($unitId in Set-ToArray $Index.UnitNameRefs[$id]) {
                Add-ToSet $resolved $unitId
            }
        }
    }

    return Get-EvidenceIds $Index (Set-ToArray $resolved)
}

function Add-ResolvedUnitOrSpawn {
    param(
        [object]$Index,
        [System.Collections.Generic.HashSet[string]]$Set,
        [string]$UnitId
    )

    if ([string]::IsNullOrWhiteSpace($UnitId)) {
        return
    }

    $spawnUnits = @($Index.ResolvedSpawnerUnits | Where-Object SpawnerUnit -eq $UnitId | ForEach-Object SpawnUnit | Sort-Object -Unique)
    if ($spawnUnits.Count -gt 0) {
        foreach ($spawnUnit in $spawnUnits) {
            Add-ToSet $Set $spawnUnit
        }
        return
    }

    Add-ToSet $Set $UnitId
}

function Get-UnitDisplayName {
    param(
        [string]$UnitId,
        [hashtable]$StringMap,
        [object]$Index
    )

    if ($StringMap.ContainsKey("Unit/Name/$UnitId") -and -not [string]::IsNullOrWhiteSpace($StringMap["Unit/Name/$UnitId"])) {
        return $StringMap["Unit/Name/$UnitId"]
    }

    if ($Index.UnitNames.ContainsKey($UnitId)) {
        $nameRef = $Index.UnitNames[$UnitId]
        if ($StringMap.ContainsKey($nameRef) -and -not [string]::IsNullOrWhiteSpace($StringMap[$nameRef])) {
            return $StringMap[$nameRef]
        }
    }

    if ($manualNameFallback.ContainsKey($UnitId)) {
        return $manualNameFallback[$UnitId]
    }

    return $UnitId
}

function Test-UnitIsStructure {
    param(
        [object]$Index,
        [string[]]$UnitIds
    )

    foreach ($unitId in @($UnitIds)) {
        if ($Index.UnitIsStructure.ContainsKey($unitId)) {
            return $true
        }
        if ($unitId -match '(CommandCenter|Orbital|Hatchery|Lair|Hive|Gateway|Barracks|Factory|Starport|Depot|Bunker|Turret|Cannon|Crawler|Bay|Forge|Council|Core|Armory|Academy|Depot|Refinery|Extractor|Nest|Den|Cavern|Spire|Pit|Pool|Battery|Monolith|Tower|Structure|Hall|Drill|Artillery)') {
            return $true
        }
    }

    return $false
}

function Get-PrimaryOfficialIds {
    param([string[]]$UnitIds)

    $ids = @($UnitIds | Where-Object { -not [string]::IsNullOrWhiteSpace($_) } | Sort-Object -Unique)
    $filtered = @($ids | Where-Object {
        $_ -notmatch '(_SpawnerUnit|SpawnerUnit$|Cocoon|Egg|Burrowed$|Uprooted$|Sieged$|SiegeMode$|Weapon|Missile|Placeholder|Placement|Dummy)'
    })

    if ($filtered.Count -gt 0) {
        return $filtered
    }

    return $ids
}

function New-OfficialEntry {
    param(
        [string]$Commander,
        [string]$Module,
        [string]$Name,
        [string]$Kind,
        [string[]]$OfficialIds,
        [string]$Source
    )

    return [pscustomobject]@{
        Commander = $Commander
        Module = $Module
        Name = $Name
        Kind = $Kind
        OfficialIds = @($OfficialIds | Where-Object { -not [string]::IsNullOrWhiteSpace($_) } | Sort-Object -Unique)
        Source = $Source
    }
}

function Add-OrMergeOfficialEntry {
    param(
        [System.Collections.Generic.List[object]]$Entries,
        [object]$Entry
    )

    if ([string]::IsNullOrWhiteSpace($Entry.Name) -or $Entry.OfficialIds.Count -eq 0) {
        return
    }

    $existing = @($Entries | Where-Object { $_.Commander -eq $Entry.Commander -and $_.Name -eq $Entry.Name -and $_.Kind -eq $Entry.Kind } | Select-Object -First 1)
    if ($existing.Count -gt 0) {
        $merged = @($existing[0].OfficialIds + $Entry.OfficialIds | Sort-Object -Unique)
        $existing[0].OfficialIds = $merged
        if ($existing[0].Source -notmatch [regex]::Escape($Entry.Source)) {
            $existing[0].Source = "$($existing[0].Source); $($Entry.Source)"
        }
        return
    }

    $Entries.Add($Entry)
}

function Get-TechUnitOfficialEntries {
    param(
        [object]$CommanderDef,
        [object]$OfficialIndex,
        [hashtable]$OfficialStringMap
    )

    $entries = New-Object System.Collections.Generic.List[object]
    $techEntries = @($OfficialIndex.TechUnitEntries | ForEach-Object { $_ })
    foreach ($tech in $techEntries) {
        if (@($tech.Commanders | Where-Object { $_ -eq $CommanderDef.PlayerId }).Count -eq 0) {
            continue
        }

        $ids = Get-PrimaryOfficialIds (Resolve-CandidateIds $OfficialIndex @($tech.Id))
        if ($ids.Count -eq 0) {
            continue
        }

        $name = $null
        if ($OfficialStringMap.ContainsKey("UserData/TechUnit/$($tech.Id)_Name")) {
            $name = $OfficialStringMap["UserData/TechUnit/$($tech.Id)_Name"]
        }
        if ([string]::IsNullOrWhiteSpace($name)) {
            $unitNames = @($ids | ForEach-Object { Get-UnitDisplayName $_ $OfficialStringMap $OfficialIndex } | Where-Object { -not [string]::IsNullOrWhiteSpace($_) } | Sort-Object -Unique)
            if ($unitNames.Count -gt 0) {
                $name = $unitNames[0]
            }
        }
        if ([string]::IsNullOrWhiteSpace($name)) {
            $name = $tech.Id
        }

        $kind = if (Test-UnitIsStructure $OfficialIndex $ids) { "建筑" } else { "兵种" }
        Add-OrMergeOfficialEntry $entries (New-OfficialEntry $CommanderDef.Display $CommanderDef.Module $name $kind $ids "official TechUnit:$($tech.Id)")
    }

    return @($entries | Sort-Object Kind, Name)
}

function Get-CuratedOfficialEntries {
    param(
        [object]$CommanderDef,
        [object]$OfficialIndex,
        [hashtable]$OfficialStringMap,
        [string[]]$UnitIds
    )

    $entries = New-Object System.Collections.Generic.List[object]
    foreach ($unitId in @($UnitIds)) {
        $ids = Get-PrimaryOfficialIds (Resolve-CandidateIds $OfficialIndex @($unitId))
        if ($ids.Count -eq 0) {
            continue
        }

        $name = Get-UnitDisplayName $unitId $OfficialStringMap $OfficialIndex
        if ([string]::IsNullOrWhiteSpace($name)) {
            $name = $unitId
        }

        $kind = if (Test-UnitIsStructure $OfficialIndex $ids) { "建筑" } else { "兵种" }
        Add-OrMergeOfficialEntry $entries (New-OfficialEntry $CommanderDef.Display $CommanderDef.Module $name $kind $ids "official commander CUnit:$unitId")
    }

    return @($entries | Sort-Object Kind, Name)
}

function Get-AbilityCommandOfficialEntries {
    param(
        [object]$CommanderDef,
        [object]$OfficialIndex,
        [hashtable]$OfficialStringMap
    )

    $entries = New-Object System.Collections.Generic.List[object]
    $playerUserData = $null
    foreach ($gameDataRoot in @($OfficialIndex.GameDataRoots)) {
        $path = Join-Path $gameDataRoot "UserData.xml"
        if (-not (Test-Path -LiteralPath $path)) {
            $path = Join-Path $gameDataRoot "userdata.xml"
        }
        if (Test-Path -LiteralPath $path) {
            try {
                [xml]$xml = Get-Content -LiteralPath $path -Raw -Encoding UTF8
                $playerUserData = $xml.SelectSingleNode("/Catalog/CUser[@id='PlayerCommanders']/Instances[@Id='$($CommanderDef.PlayerId)']")
                if ($playerUserData) {
                    break
                }
            } catch {
                continue
            }
        }
    }

    if (-not $playerUserData) {
        return @()
    }

    foreach ($cmdNode in $playerUserData.SelectNodes('./AbilCmd')) {
        $abil = $cmdNode.GetAttribute("Abil")
        if ([string]::IsNullOrWhiteSpace($abil)) {
            continue
        }

        $cmd = if ($cmdNode.HasAttribute("Cmd")) { $cmdNode.GetAttribute("Cmd") } else { "Train1" }
        $commandKey = "$abil,$cmd"
        if (-not $OfficialIndex.AbilCommandUnits.ContainsKey($commandKey)) {
            continue
        }

        foreach ($unitId in Set-ToArray $OfficialIndex.AbilCommandUnits[$commandKey]) {
            $ids = Get-PrimaryOfficialIds (Resolve-CandidateIds $OfficialIndex @($unitId))
            if ($ids.Count -eq 0) {
                continue
            }

            $name = Get-UnitDisplayName $unitId $OfficialStringMap $OfficialIndex
            if ([string]::IsNullOrWhiteSpace($name)) {
                $name = $unitId
            }

            $kind = if (Test-UnitIsStructure $OfficialIndex $ids) { "建筑" } else { "兵种" }
            Add-OrMergeOfficialEntry $entries (New-OfficialEntry $CommanderDef.Display $CommanderDef.Module $name $kind $ids "official PlayerCommanders.DefaultAbilityCommands:$commandKey")
        }
    }

    return @($entries | Sort-Object Kind, Name)
}

function Get-TychusOfficialEntries {
    param(
        [object]$CommanderDef,
        [object]$OfficialIndex,
        [hashtable]$OfficialStringMap
    )

    $entries = New-Object System.Collections.Generic.List[object]
    $path = Join-Path $OfficialIndex.Root "mods\starcoop\starcoop.sc2mod\base.sc2data\gamedata\commanders\commandertychus.xml"
    if (-not (Test-Path -LiteralPath $path)) {
        return @()
    }

    [xml]$xml = Get-Content -LiteralPath $path -Raw -Encoding UTF8
    $ids = New-Set
    foreach ($node in $xml.SelectNodes('//Unit[@Unit]')) {
        Add-ToSet $ids $node.GetAttribute("Unit")
    }
    foreach ($node in $xml.SelectNodes('//Unit[@value]')) {
        $value = $node.GetAttribute("value")
        if ($value -match '^Tychus') {
            Add-ToSet $ids $value
        }
    }

    foreach ($unitId in Set-ToArray $ids) {
        if ($unitId -match '(Missile|Weapon|Beacon|Placement|Dummy)') {
            continue
        }
        $resolved = Resolve-CandidateIds $OfficialIndex @($unitId)
        if ($resolved.Count -eq 0) {
            continue
        }

        $name = Get-UnitDisplayName $unitId $OfficialStringMap $OfficialIndex
        $kind = if (Test-UnitIsStructure $OfficialIndex $resolved) { "建筑" } else { "兵种" }
        Add-OrMergeOfficialEntry $entries (New-OfficialEntry $CommanderDef.Display $CommanderDef.Module $name $kind $resolved "official commandertychus.xml:$unitId")
    }

    return @($entries | Sort-Object Kind, Name)
}

function Intersect-Values {
    param(
        [string[]]$Left,
        [string[]]$Right
    )

    $rightSet = New-Set
    foreach ($value in @($Right)) {
        Add-ToSet $rightSet $value
    }

    $result = New-Set
    foreach ($value in @($Left)) {
        if ($rightSet.Contains($value)) {
            Add-ToSet $result $value
        }
    }

    return Set-ToArray $result
}

function Get-CurrentIdsForOfficialEntry {
    param(
        [object]$CurrentIndex,
        [object[]]$CurrentStrings,
        [object]$OfficialEntry
    )

    $sameIds = @(Get-EvidenceIds $CurrentIndex $OfficialEntry.OfficialIds)
    $nameCandidates = @(Get-NameCandidates $CurrentStrings $OfficialEntry.Name)
    $candidateIds = @($nameCandidates | ForEach-Object { $_.Id } | Sort-Object -Unique)
    $nameIds = @(Resolve-CandidateIds $CurrentIndex $candidateIds)
    $allIds = @($sameIds + $nameIds | Sort-Object -Unique)

    return [pscustomobject]@{
        SameIds = $sameIds
        NameCandidateIds = $candidateIds
        NameEvidenceIds = $nameIds
        CurrentIds = $allIds
    }
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
        $evidence = @(Get-UnitEvidence $Index $id)
        if ($evidence.Count -gt 0) {
            $parts.Add("evidence=$(Join-Values $evidence ',')")
        }
        if ($Index.ActorIds.ContainsKey($id)) {
            $actors = @(Set-ToArray $Index.ActorIds[$id] | Select-Object -First 2)
            $parts.Add("actor=$(Join-Values $actors ',')")
        }
        if ($Index.ModelAssets.ContainsKey($id)) {
            $models = @(Set-ToArray $Index.ModelAssets[$id] | Select-Object -First 1)
            $parts.Add("model=$(Join-Values $models ',')")
        }

        $rows.Add(($parts -join "; "))
    }

    return Join-Values $rows "<br>"
}

function Get-StatusDiagnosis {
    param([string]$Status)

    switch ($Status) {
        "ImplementedSameId" { return "当前 XM 已落到官方同 ID" }
        "ShapeAmbiguous" { return "当前与官方有同 ID 交集，但存在多形态/变形/潜地/攻城等形态，需要按训练链裁剪主形态" }
        "ImplementedDifferentId" { return "当前 XM 有同名落地，但单位 ID 与官方合作数据不同" }
        "LocalizedOnly" { return "当前 XM 只有同名本地化，没有 CUnit 或 Unit 引用证据" }
        "Missing" { return "当前 XM 未发现同名落地，也未发现官方同 ID" }
        default { return $Status }
    }
}

function Get-CurrentLocalizedUnitRows {
    param(
        [object]$CurrentIndex,
        [object[]]$CurrentStrings
    )

    $rows = New-Object System.Collections.Generic.List[object]
    foreach ($entry in @($CurrentStrings)) {
        if ($entry.Key -notmatch '^Unit/Name/(.+)$') {
            continue
        }

        $id = $Matches[1]
        if ([string]::IsNullOrWhiteSpace($entry.Value)) {
            continue
        }

        $evidence = @(Resolve-CandidateIds $CurrentIndex @($id))
        if ($evidence.Count -eq 0) {
            continue
        }

        $rows.Add([pscustomobject]@{
            Name = $entry.Value
            LocalizedId = $id
            EvidenceIds = $evidence
        })
    }

    return @($rows | Sort-Object Name, LocalizedId -Unique)
}

$officialStrings = @(Get-StringEntries $Sc2BuildExportRoot)
$officialStringMap = Get-StringMap $officialStrings
$officialIndex = Get-CatalogIndex $Sc2BuildExportRoot "SC2 Build 96883"

$sourceIndexCache = @{}
$sourceStringMapCache = @{}
$officialRoster = New-Object System.Collections.Generic.List[object]

foreach ($commander in $commanderDefs) {
    if ($commander.Source -like "TechUnit*") {
        foreach ($entry in Get-TechUnitOfficialEntries $commander $officialIndex $officialStringMap) {
            Add-OrMergeOfficialEntry $officialRoster $entry
        }
        foreach ($entry in Get-AbilityCommandOfficialEntries $commander $officialIndex $officialStringMap) {
            Add-OrMergeOfficialEntry $officialRoster $entry
        }
        if ($curatedOfficialIds.ContainsKey($commander.Key)) {
            foreach ($entry in Get-CuratedOfficialEntries $commander $officialIndex $officialStringMap $curatedOfficialIds[$commander.Key]) {
                Add-OrMergeOfficialEntry $officialRoster $entry
            }
        }
        continue
    }

    if ($commander.Source -eq "CommanderXml") {
        foreach ($entry in Get-TychusOfficialEntries $commander $officialIndex $officialStringMap) {
            Add-OrMergeOfficialEntry $officialRoster $entry
        }
        continue
    }

    $sourceRoot = $Sc2BuildExportRoot
    $sourceStringMap = $officialStringMap
    $sourceIndex = $officialIndex
    if ($sourceRootsByCommander.ContainsKey($commander.Key)) {
        $sourceRoot = $sourceRootsByCommander[$commander.Key]
        if (-not $sourceIndexCache.ContainsKey($commander.Key)) {
            $sourceIndexCache[$commander.Key] = Get-CatalogIndex $sourceRoot "SC2 Build 96883 $($commander.Key)"
            $sourceStringMapCache[$commander.Key] = Get-StringMap @(Get-StringEntries $sourceRoot)
        }
        $sourceIndex = $sourceIndexCache[$commander.Key]
        $sourceStringMap = $sourceStringMapCache[$commander.Key]
    }

    foreach ($entry in Get-CuratedOfficialEntries $commander $sourceIndex $sourceStringMap $curatedOfficialIds[$commander.Key]) {
        Add-OrMergeOfficialEntry $officialRoster $entry
    }
}

$currentIndexCache = @{}
$currentStringCache = @{}
$rows = New-Object System.Collections.Generic.List[object]
$extraRows = New-Object System.Collections.Generic.List[object]

foreach ($commander in $commanderDefs) {
    $modRoot = Join-Path $modsRoot $commander.Module
    $currentIndexCache[$commander.Module] = Get-CatalogIndex $modRoot $commander.Module
    $currentStringCache[$commander.Module] = @(Get-StringEntries $modRoot)

    $currentIndex = $currentIndexCache[$commander.Module]
    $currentStrings = $currentStringCache[$commander.Module]
    $commanderOfficialRows = @($officialRoster | Where-Object Commander -eq $commander.Display)
    $officialNames = New-Set
    $officialIds = New-Set
    foreach ($entry in $commanderOfficialRows) {
        Add-ToSet $officialNames $entry.Name
        foreach ($id in @($entry.OfficialIds)) {
            Add-ToSet $officialIds $id
        }
    }

    foreach ($entry in $commanderOfficialRows) {
        $current = Get-CurrentIdsForOfficialEntry $currentIndex $currentStrings $entry
        $shared = @(Intersect-Values $current.CurrentIds $entry.OfficialIds)

        $status = "ImplementedSameId"
        if ($shared.Count -gt 0) {
            if ($entry.OfficialIds.Count -gt 1 -or $current.CurrentIds.Count -gt 1 -or $shared.Count -lt $entry.OfficialIds.Count) {
                $status = "ShapeAmbiguous"
            }
        } elseif ($current.NameEvidenceIds.Count -gt 0) {
            $status = "ImplementedDifferentId"
        } elseif ($current.NameCandidateIds.Count -gt 0) {
            $status = "LocalizedOnly"
        } else {
            $status = "Missing"
        }

        $rows.Add([pscustomobject]@{
            Commander = $entry.Commander
            Module = $entry.Module
            Name = $entry.Name
            Kind = $entry.Kind
            Status = $status
            OfficialIds = $entry.OfficialIds
            CurrentIds = $current.CurrentIds
            CurrentNameIds = $current.NameCandidateIds
            SharedIds = $shared
            Source = $entry.Source
            OfficialSummary = Get-UnitShortSummary $officialIndex $entry.OfficialIds
            CurrentSummary = Get-UnitShortSummary $currentIndex $current.CurrentIds
        })
    }

    foreach ($currentUnit in Get-CurrentLocalizedUnitRows $currentIndex $currentStrings) {
        $nameKnown = $officialNames.Contains($currentUnit.Name)
        $idKnown = @(Intersect-Values $currentUnit.EvidenceIds (Set-ToArray $officialIds)).Count -gt 0
        if ($nameKnown -or $idKnown) {
            continue
        }

        $extraRows.Add([pscustomobject]@{
            Commander = $commander.Display
            Module = $commander.Module
            Name = $currentUnit.Name
            LocalizedId = $currentUnit.LocalizedId
            EvidenceIds = $currentUnit.EvidenceIds
        })
    }
}

$report = New-Object System.Collections.Generic.List[string]
$report.Add("# 官方合作指挥官对当前 XM 落地差异：SC2 Build 96883")
$report.Add("")
$report.Add("日期：2026-05-25")
$report.Add("")
$report.Add("## 口径")
$report.Add("")
$report.Add("- 主表：以本机 SC2 Build 96883 的官方合作指挥官数据为主，不再以维基 JSON 或当前 XM 已实现内容作为主清单。")
$report.Add("- 官方来源：references/sc2-build-96883-casc-export，来自本机 E:\SC2\SC2new\StarCraft II\SC2Data 的 CASC 抽取，Product=s2，Build=96883。")
$report.Add("- 普通指挥官优先读取官方 TechUnit 的 PlayerCommanders 归属，并穿透 ArmyCategory.Unit、Unit/Name 改写与 CUnit。")
$report.Add("- 泰凯斯读取官方 commandertychus.xml 的单位条目；德哈卡、蒙斯克、斯台特曼读取官方数据中可命名、可训练/建造/英雄相关的 CUnit ID 白名单。")
$report.Add("- 当前侧只读取 合作指挥官版起义狂潮/Mods/XM/<Commander>.SC2Mod 的当前文件。")
$report.Add("- 本报告是静态文件对比，没有进图验证，也没有修改 XMFinal.SC2Mod/DocumentHeader 或 DocumentInfo。")
$report.Add("")
$report.Add("## 状态定义")
$report.Add("")
$report.Add("- ImplementedSameId：当前 XM 找到官方同 ID 的 CUnit 或 Unit 引用。")
$report.Add("- ShapeAmbiguous：当前与官方有同 ID 交集，但存在多形态、潜地、攻城、起飞、变形等多个 ID，后续需要按训练/建造链裁剪主对象。")
$report.Add("- ImplementedDifferentId：当前 XM 有同名落地，但实际 ID 与官方合作数据不同，属于模型/机制可能不一致的重点风险。")
$report.Add("- LocalizedOnly：当前 XM 只有同名本地化，没有 CUnit 或 Unit 引用证据。")
$report.Add("- Missing：官方主表存在，但当前 XM 没有同名落地，也没有官方同 ID。")
$report.Add("- ExtraCurrent：当前 XM 有本地化且有落地证据，但不在官方主表中；可能是额外建筑、测试对象、投射体、旧实现残留或本项目自定义对象。")
$report.Add("")

$summary = @($commanderDefs | ForEach-Object {
    $commanderRows = @($rows | Where-Object Commander -eq $_.Display)
    $commanderExtras = @($extraRows | Where-Object Commander -eq $_.Display)
    [pscustomobject]@{
        Commander = $_.Display
        Module = $_.Module
        OfficialTotal = $commanderRows.Count
        ImplementedSameId = @($commanderRows | Where-Object Status -eq "ImplementedSameId").Count
        ShapeAmbiguous = @($commanderRows | Where-Object Status -eq "ShapeAmbiguous").Count
        ImplementedDifferentId = @($commanderRows | Where-Object Status -eq "ImplementedDifferentId").Count
        LocalizedOnly = @($commanderRows | Where-Object Status -eq "LocalizedOnly").Count
        Missing = @($commanderRows | Where-Object Status -eq "Missing").Count
        ExtraCurrent = $commanderExtras.Count
    }
})

$report.Add("## 总览")
$report.Add("")
$report.Add("| 指挥官 | 当前模块 | 官方条目 | 同 ID | 多形态待裁剪 | 异 ID | 仅本地化 | 缺失 | 当前额外 |")
$report.Add("|---|---|---:|---:|---:|---:|---:|---:|---:|")
foreach ($item in $summary) {
    $report.Add("| $($item.Commander) | $($item.Module) | $($item.OfficialTotal) | $($item.ImplementedSameId) | $($item.ShapeAmbiguous) | $($item.ImplementedDifferentId) | $($item.LocalizedOnly) | $($item.Missing) | $($item.ExtraCurrent) |")
}
$report.Add("")

$focusRows = @($rows | Where-Object { $_.Status -in @("Missing", "LocalizedOnly", "ImplementedDifferentId") } | Sort-Object Commander, Status, Kind, Name)
$report.Add("## 当前缺口与异 ID")
$report.Add("")
if ($focusRows.Count -eq 0) {
    $report.Add("- 没有发现 Missing、LocalizedOnly 或 ImplementedDifferentId。")
} else {
    $report.Add("| 指挥官 | 条目 | 类型 | 状态 | 结论 | 官方 ID | 当前 ID | 当前命名 ID |")
    $report.Add("|---|---|---|---|---|---|---|---|")
    foreach ($row in $focusRows) {
        $report.Add("| $($row.Commander) | $(Escape-MarkdownCell $row.Name) | $($row.Kind) | $($row.Status) | $(Get-StatusDiagnosis $row.Status) | $(Escape-MarkdownCell (Join-Values $row.OfficialIds)) | $(Escape-MarkdownCell (Join-Values $row.CurrentIds)) | $(Escape-MarkdownCell (Join-Values $row.CurrentNameIds)) |")
    }
}
$report.Add("")

$shapeRows = @($rows | Where-Object Status -eq "ShapeAmbiguous" | Sort-Object Commander, Kind, Name)
$report.Add("## 多形态待裁剪")
$report.Add("")
if ($shapeRows.Count -eq 0) {
    $report.Add("- 没有发现 ShapeAmbiguous。")
} else {
    $report.Add("- 这些不是优先硬缺口，但要继续对齐官方时，需要按训练、建造、变形链确认哪个是主形态。")
    $report.Add("")
    $report.Add("| 指挥官 | 条目 | 类型 | 官方 ID | 当前 ID | 共享 ID |")
    $report.Add("|---|---|---|---|---|---|")
    foreach ($row in $shapeRows) {
        $report.Add("| $($row.Commander) | $(Escape-MarkdownCell $row.Name) | $($row.Kind) | $(Escape-MarkdownCell (Join-Values $row.OfficialIds)) | $(Escape-MarkdownCell (Join-Values $row.CurrentIds)) | $(Escape-MarkdownCell (Join-Values $row.SharedIds)) |")
    }
}
$report.Add("")

$report.Add("## 官方主表明细")
$report.Add("")
foreach ($commander in $commanderDefs) {
    $commanderRows = @($rows | Where-Object Commander -eq $commander.Display | Sort-Object Kind, Name)
    if ($commanderRows.Count -eq 0) {
        continue
    }

    $report.Add("### $($commander.Display)")
    $report.Add("")
    $report.Add("- 当前模块：$($commander.Module)")
    $report.Add("- 官方主表来源：$($commander.Source)")
    $report.Add("")
    $report.Add("| 官方条目 | 类型 | 状态 | 官方 ID | 当前 ID | 共享 ID | 官方来源 |")
    $report.Add("|---|---|---|---|---|---|---|")
    foreach ($row in $commanderRows) {
        $report.Add("| $(Escape-MarkdownCell $row.Name) | $($row.Kind) | $($row.Status) | $(Escape-MarkdownCell (Join-Values $row.OfficialIds)) | $(Escape-MarkdownCell (Join-Values $row.CurrentIds)) | $(Escape-MarkdownCell (Join-Values $row.SharedIds)) | $(Escape-MarkdownCell $row.Source) |")
    }
    $report.Add("")
}

$report.Add("## 当前额外条目")
$report.Add("")
$report.Add("- 这里只列当前 XM 有本地化且有落地证据、但没有落入官方主表的条目；数量较大时每个指挥官最多列 30 条。")
$report.Add("")
foreach ($commander in $commanderDefs) {
    $commanderExtras = @($extraRows | Where-Object Commander -eq $commander.Display | Sort-Object Name, LocalizedId)
    if ($commanderExtras.Count -eq 0) {
        continue
    }

    $report.Add("### $($commander.Display)")
    $report.Add("")
    $report.Add("- 当前额外条目数：$($commanderExtras.Count)")
    $report.Add("")
    $report.Add("| 当前名称 | 本地化 ID | 当前落地 ID |")
    $report.Add("|---|---|---|")
    foreach ($row in @($commanderExtras | Select-Object -First 30)) {
        $report.Add("| $(Escape-MarkdownCell $row.Name) | $(Escape-MarkdownCell $row.LocalizedId) | $(Escape-MarkdownCell (Join-Values $row.EvidenceIds)) |")
    }
    if ($commanderExtras.Count -gt 30) {
        $report.Add("")
        $report.Add("- 其余 $($commanderExtras.Count - 30) 条已省略，脚本内可调整上限。")
    }
    $report.Add("")
}

$hardCount = @($rows | Where-Object { $_.Status -in @("Missing", "LocalizedOnly") }).Count
$differentCount = @($rows | Where-Object Status -eq "ImplementedDifferentId").Count
$shapeCount = @($rows | Where-Object Status -eq "ShapeAmbiguous").Count
$extraCount = $extraRows.Count
$sameCount = @($rows | Where-Object Status -eq "ImplementedSameId").Count
$totalCount = $rows.Count

$report.Add("## 直接结论")
$report.Add("")
$report.Add("1. 这版报告的主方向已经改为官方合作模式主表 -> 当前 XM 反查。")
$report.Add("2. 官方主表共 $totalCount 条；当前同 ID 直接落地 $sameCount 条；多形态待裁剪 $shapeCount 条。")
$report.Add("3. 当前硬缺口（Missing + LocalizedOnly）共 $hardCount 条；异 ID 落地共 $differentCount 条。")
$report.Add("4. 当前 XM 额外命名落地共 $extraCount 条；这些不等于错误，但后续需要区分自定义内容、辅助对象和旧实现残留。")
$report.Add("5. 下一步如果要改数据，优先顺序建议是 Missing / LocalizedOnly -> ImplementedDifferentId -> ShapeAmbiguous。")

$outputDir = Split-Path -Parent $OutputPath
if (-not (Test-Path -LiteralPath $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir | Out-Null
}

[System.IO.File]::WriteAllLines($OutputPath, $report, [System.Text.UTF8Encoding]::new($false))
Write-Output "Wrote $OutputPath"
