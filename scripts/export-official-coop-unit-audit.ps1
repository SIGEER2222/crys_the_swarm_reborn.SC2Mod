param(
    [string]$OutputPath
)

$ErrorActionPreference = "Stop"

$scriptRoot = if ($PSScriptRoot) { $PSScriptRoot } else { Split-Path -Parent $MyInvocation.MyCommand.Path }
$repoRoot = Split-Path -Parent $scriptRoot

if ([string]::IsNullOrWhiteSpace($OutputPath)) {
    $OutputPath = Join-Path $repoRoot "docs\指挥官\合作指挥官官方单位ID模型对照审计-2026-05-25.md"
}

$referencePath = Join-Path $repoRoot "docs\维基指挥官\兵种\all_commanders_data.json"
$officialDataRoot = Join-Path $repoRoot "references\official-casc-export\mods\starcoop\starcoop.sc2mod"
$modsRoot = Join-Path $repoRoot "合作指挥官版起义狂潮\Mods\XM"

$commanderMap = [ordered]@{
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
}

$catalogCache = @{}

function Get-CatalogXml {
    param(
        [string]$CatalogRoot,
        [string]$RelativePath
    )

    $cacheKey = "$CatalogRoot|$RelativePath"
    if (-not $catalogCache.ContainsKey($cacheKey)) {
        $fullPath = Join-Path $CatalogRoot $RelativePath
        if (-not (Test-Path -LiteralPath $fullPath)) {
            throw "Catalog file not found: $fullPath"
        }

        $catalogCache[$cacheKey] = [xml](Get-Content -LiteralPath $fullPath -Raw -Encoding UTF8)
    }

    $catalogCache[$cacheKey]
}

function Get-CommanderContext {
    param([string]$ModPath)

    return [pscustomobject]@{
        StringsPath = Join-Path $ModPath "zhCN.SC2Data\LocalizedData\GameStrings.txt"
        GameDataRoot = Join-Path $ModPath "Base.SC2Data\GameData"
    }
}

function Get-StringEntries {
    param([string]$Path)

    $rows = New-Object System.Collections.Generic.List[object]
    if (-not (Test-Path -LiteralPath $Path)) {
        return $rows
    }

    foreach ($line in Get-Content -LiteralPath $Path -Encoding UTF8) {
        if ([string]::IsNullOrWhiteSpace($line)) { continue }
        if ($line.StartsWith("#")) { continue }

        $parts = $line -split "=", 2
        if ($parts.Count -ne 2) { continue }

        $rows.Add([pscustomobject]@{
            Key = $parts[0]
            Value = $parts[1]
        })
    }

    return $rows
}

function Get-NameCandidates {
    param(
        [System.Collections.Generic.List[object]]$Entries,
        [string]$DisplayName
    )

    $result = New-Object System.Collections.Generic.List[object]
    foreach ($entry in $Entries) {
        if ($entry.Value -ne $DisplayName) { continue }

        $kind = $null
        $id = $null

        if ($entry.Key -match '^Unit/Name/(.+)$') {
            $kind = "Unit"
            $id = $Matches[1]
        } elseif ($entry.Key -match '^UserData/TechUnit/(.+?)_Name$') {
            $kind = "TechUnit"
            $id = $Matches[1]
        } elseif ($entry.Key -match '^Button/Name/(.+)$') {
            $kind = "Button"
            $id = $Matches[1]
        }

        if ($null -eq $id) { continue }

        $result.Add([pscustomobject]@{
            Key = $entry.Key
            Kind = $kind
            Id = $id
        })
    }

    return @($result | Sort-Object Kind, Id, Key -Unique)
}

function Get-UnitNode {
    param(
        [string]$GameDataRoot,
        [string]$UnitId
    )

    $unitXml = Get-CatalogXml $GameDataRoot "UnitData.xml"
    return $unitXml.SelectSingleNode("/Catalog/*[@id='$UnitId']")
}

function Get-ActorNodes {
    param(
        [string]$GameDataRoot,
        [string]$UnitId
    )

    $actorXml = Get-CatalogXml $GameDataRoot "ActorData.xml"
    return $actorXml.SelectNodes("/Catalog/*[@unitName='$UnitId' or @id='$UnitId']")
}

function Get-ModelNode {
    param(
        [string]$GameDataRoot,
        [string]$ModelId
    )

    $modelXml = Get-CatalogXml $GameDataRoot "ModelData.xml"
    return $modelXml.SelectSingleNode("/Catalog/*[@id='$ModelId']")
}

function Get-UnitSummary {
    param(
        [string]$GameDataRoot,
        [string]$UnitId
    )

    $unitNode = Get-UnitNode $GameDataRoot $UnitId
    $exists = $null -ne $unitNode
    $parent = if ($exists -and $unitNode.Attributes["parent"]) { $unitNode.Attributes["parent"].Value } else { $null }

    $actorNodes = @(Get-ActorNodes $GameDataRoot $UnitId)
    $actorIds = New-Object System.Collections.Generic.List[string]
    $modelKeys = New-Object System.Collections.Generic.List[string]
    $modelAssets = New-Object System.Collections.Generic.List[string]

    foreach ($actorNode in $actorNodes) {
        if ($actorNode.Attributes["id"]) {
            $actorId = $actorNode.Attributes["id"].Value
            if (-not [string]::IsNullOrWhiteSpace($actorId)) {
                $actorIds.Add($actorId)
                $modelKeys.Add($actorId)
            }
        }

        foreach ($modelNode in $actorNode.SelectNodes("./Model")) {
            if ($modelNode.Attributes["value"]) {
                $modelKeys.Add($modelNode.Attributes["value"].Value)
            }
        }
    }

    foreach ($modelKey in ($modelKeys | Sort-Object -Unique)) {
        $resolvedNode = Get-ModelNode $GameDataRoot $modelKey
        if ($null -eq $resolvedNode) { continue }

        foreach ($valueNode in $resolvedNode.SelectNodes("./Model")) {
            if ($valueNode.Attributes["value"]) {
                $asset = $valueNode.Attributes["value"].Value
                if (-not [string]::IsNullOrWhiteSpace($asset)) {
                    $modelAssets.Add($asset)
                }
            }
        }
    }

    return [pscustomobject]@{
        UnitId = $UnitId
        Exists = $exists
        Parent = $parent
        ActorIds = @($actorIds | Sort-Object -Unique)
        ModelAssets = @($modelAssets | Sort-Object -Unique)
    }
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

function Compare-NameRow {
    param(
        [string]$DisplayName,
        [object[]]$CurrentCandidates,
        [object[]]$OfficialCandidates,
        [string]$CurrentGameDataRoot,
        [string]$OfficialGameDataRoot
    )

    $currentSummaries = @()
    foreach ($candidate in $CurrentCandidates) {
        $currentSummaries += Get-UnitSummary $CurrentGameDataRoot $candidate.Id
    }

    $officialSummaries = @()
    foreach ($candidate in $OfficialCandidates) {
        $officialSummaries += Get-UnitSummary $OfficialGameDataRoot $candidate.Id
    }

    $currentUnitIds = @($currentSummaries | Where-Object Exists | ForEach-Object UnitId | Sort-Object -Unique)
    $officialUnitIds = @($officialSummaries | Where-Object Exists | ForEach-Object UnitId | Sort-Object -Unique)

    $sharedIds = @($currentUnitIds | Where-Object { $officialUnitIds -contains $_ } | Sort-Object -Unique)
    $currentModels = @($currentSummaries | ForEach-Object ModelAssets | ForEach-Object { $_ } | Sort-Object -Unique)
    $officialModels = @($officialSummaries | ForEach-Object ModelAssets | ForEach-Object { $_ } | Sort-Object -Unique)
    $sharedModels = @($currentModels | Where-Object { $officialModels -contains $_ } | Sort-Object -Unique)

    $verdict = "SameUnitId"
    if ($currentUnitIds.Count -eq 0) {
        $verdict = "CurrentNoUnitId"
    } elseif ($officialUnitIds.Count -eq 0) {
        $verdict = "OfficialNoUnitId"
    } elseif ($sharedIds.Count -eq 0) {
        $verdict = "DifferentUnitId"
    } elseif ($currentModels.Count -gt 0 -and $officialModels.Count -gt 0 -and $sharedModels.Count -eq 0) {
        $verdict = "SameIdDifferentModel"
    } elseif ($currentUnitIds.Count -gt 1 -or $officialUnitIds.Count -gt 1) {
        $verdict = "AmbiguousUnitId"
    }

    return [pscustomobject]@{
        DisplayName = $DisplayName
        Verdict = $verdict
        CurrentKeys = @($CurrentCandidates | ForEach-Object { $_.Key } | Sort-Object -Unique)
        CurrentUnitIds = $currentUnitIds
        CurrentActors = @($currentSummaries | ForEach-Object ActorIds | ForEach-Object { $_ } | Sort-Object -Unique)
        CurrentModels = $currentModels
        OfficialKeys = @($OfficialCandidates | ForEach-Object { $_.Key } | Sort-Object -Unique)
        OfficialUnitIds = $officialUnitIds
        OfficialActors = @($officialSummaries | ForEach-Object ActorIds | ForEach-Object { $_ } | Sort-Object -Unique)
        OfficialModels = $officialModels
        SharedIds = $sharedIds
        SharedModels = $sharedModels
    }
}

$referenceData = Get-Content -LiteralPath $referencePath -Raw -Encoding UTF8 | ConvertFrom-Json
$officialContext = Get-CommanderContext $officialDataRoot
$officialStrings = Get-StringEntries $officialContext.StringsPath

$reportLines = New-Object System.Collections.Generic.List[string]
$reportLines.Add("# 合作指挥官官方单位ID模型对照审计")
$reportLines.Add("")
$reportLines.Add("日期：2026-05-25")
$reportLines.Add("")
$reportLines.Add("## 口径")
$reportLines.Add("")
$reportLines.Add("- 参考条目仍取自 docs/维基指挥官/兵种/all_commanders_data.json，仅用来确定要检查哪些合作模式兵种/建筑名。")
$reportLines.Add("- 官方侧改为直接读取 references/official-casc-export/mods/starcoop/starcoop.sc2mod，不再只看维基中文展示。")
$reportLines.Add("- 每个条目同时记录：中文名 -> 当前模块 unit id / actor / 模型，以及 中文名 -> 官方 coop unit id / actor / 模型。")
$reportLines.Add("- 本报告重点抓两类问题：同名但 unit id 不同，以及 unit id 相同但 actor/model 已漂移。")
$reportLines.Add("")

$summaryRows = New-Object System.Collections.Generic.List[object]

foreach ($commanderEntry in $referenceData) {
    $moduleName = $commanderMap[$commanderEntry.commander]
    if ([string]::IsNullOrWhiteSpace($moduleName)) { continue }

    $modPath = Join-Path $modsRoot $moduleName
    $currentContext = Get-CommanderContext $modPath
    $currentStrings = Get-StringEntries $currentContext.StringsPath

    $names = @()
    if ($commanderEntry.units) { $names += @($commanderEntry.units | ForEach-Object name) }
    if ($commanderEntry.buildings) { $names += @($commanderEntry.buildings | ForEach-Object name) }
    $names = @($names | Where-Object { -not [string]::IsNullOrWhiteSpace($_) } | Sort-Object -Unique)

    $rows = New-Object System.Collections.Generic.List[object]
    foreach ($name in $names) {
        $currentCandidates = Get-NameCandidates $currentStrings $name
        $officialCandidates = Get-NameCandidates $officialStrings $name
        $rows.Add((Compare-NameRow -DisplayName $name -CurrentCandidates $currentCandidates -OfficialCandidates $officialCandidates -CurrentGameDataRoot $currentContext.GameDataRoot -OfficialGameDataRoot $officialContext.GameDataRoot))
    }

    $sameId = @($rows | Where-Object Verdict -eq "SameUnitId").Count
    $diffId = @($rows | Where-Object Verdict -eq "DifferentUnitId").Count
    $modelDrift = @($rows | Where-Object Verdict -eq "SameIdDifferentModel").Count
    $ambiguous = @($rows | Where-Object Verdict -eq "AmbiguousUnitId").Count
    $unresolved = @($rows | Where-Object { $_.Verdict -in @("CurrentNoUnitId", "OfficialNoUnitId") }).Count

    $summaryRows.Add([pscustomobject]@{
        Commander = $commanderEntry.commander
        Total = $names.Count
        SameId = $sameId
        DifferentId = $diffId
        SameIdDifferentModel = $modelDrift
        Ambiguous = $ambiguous
        Unresolved = $unresolved
    })

    $reportLines.Add("## $($commanderEntry.commander)")
    $reportLines.Add("")
    $reportLines.Add("- 当前模块：$moduleName")
    $reportLines.Add("- 参考条目数：$($names.Count)")
    $reportLines.Add("- 结果统计：SameUnitId=$sameId，DifferentUnitId=$diffId，SameIdDifferentModel=$modelDrift，Ambiguous=$ambiguous，Unresolved=$unresolved")
    $reportLines.Add("")

    $focusRows = @($rows | Where-Object Verdict -ne "SameUnitId")
    if ($focusRows.Count -eq 0) {
        $reportLines.Add("- 这一位当前没有发现同名异体或明显模型漂移；至少按官方 coop 导出数据与当前模块本地化映射，名字落到的 unit id 一致。")
        $reportLines.Add("")
        continue
    }

    foreach ($row in $focusRows) {
        $reportLines.Add("### $($row.DisplayName)")
        $reportLines.Add("")
        $reportLines.Add("- 结论：$($row.Verdict)")
        $reportLines.Add("- 当前 key：$(Join-Values $row.CurrentKeys)")
        $reportLines.Add("- 当前 unit id：$(Join-Values $row.CurrentUnitIds)")
        $reportLines.Add("- 当前 actor：$(Join-Values $row.CurrentActors)")
        $reportLines.Add("- 当前模型：$(Join-Values $row.CurrentModels)")
        $reportLines.Add("- 官方 key：$(Join-Values $row.OfficialKeys)")
        $reportLines.Add("- 官方 unit id：$(Join-Values $row.OfficialUnitIds)")
        $reportLines.Add("- 官方 actor：$(Join-Values $row.OfficialActors)")
        $reportLines.Add("- 官方模型：$(Join-Values $row.OfficialModels)")
        if ($row.SharedIds.Count -gt 0) {
            $reportLines.Add("- 共享 unit id：$(Join-Values $row.SharedIds)")
        }
        if ($row.SharedModels.Count -gt 0) {
            $reportLines.Add("- 共享模型：$(Join-Values $row.SharedModels)")
        }
        $reportLines.Add("")
    }
}

$reportLines.Add("## 汇总表")
$reportLines.Add("")
$reportLines.Add("| 指挥官 | 参考条目数 | SameUnitId | DifferentUnitId | SameIdDifferentModel | Ambiguous | Unresolved |")
$reportLines.Add("|---|---:|---:|---:|---:|---:|---:|")
foreach ($row in $summaryRows) {
    $reportLines.Add("| $($row.Commander) | $($row.Total) | $($row.SameId) | $($row.DifferentId) | $($row.SameIdDifferentModel) | $($row.Ambiguous) | $($row.Unresolved) |")
}
$reportLines.Add("")
$reportLines.Add("## 说明")
$reportLines.Add("")
$reportLines.Add("- SameUnitId：当前模块与官方 coop 至少有一个相同的 unit id。")
$reportLines.Add("- DifferentUnitId：当前模块中文名落到的 unit id 与官方 coop 中文名落到的 unit id 没有交集，这是最需要优先复核的同名异体风险。")
$reportLines.Add("- SameIdDifferentModel：unit id 一样，但当前和官方找到的模型资源没有交集，说明视觉或 actor 继承链可能已漂移。")
$reportLines.Add("- Ambiguous：任一侧同名对应多个 unit id，需要继续结合能力链或实机卡片判断主对象。")
$reportLines.Add("- Unresolved：至少有一侧只命中了字符串，但没有顺利落到 UnitData.xml 对象。")

$reportDir = Split-Path -Parent $OutputPath
if (-not (Test-Path -LiteralPath $reportDir)) {
    New-Item -ItemType Directory -Path $reportDir | Out-Null
}

[System.IO.File]::WriteAllLines($OutputPath, $reportLines, [System.Text.UTF8Encoding]::new($false))
Write-Output "Wrote $OutputPath"
