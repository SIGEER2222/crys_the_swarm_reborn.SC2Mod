$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$originalRoot = Join-Path $repoRoot '原始mod'
$xmFinalDir = Join-Path $originalRoot 'Mods\XM\XMFinal.SC2Mod\Base.SC2Data'
$rostersFile = Join-Path $xmFinalDir 'LibE0EAE146_CommanderRosters.galaxy'
$buildingsFile = Join-Path $xmFinalDir 'LibE0EAE146_CommanderBuildings.galaxy'
$modsRoot = Join-Path $originalRoot 'Mods\XM'
$legacyXmRoot = Join-Path $repoRoot '合作指挥官版起义狂潮\Mods\XM'
$officialStrings = @(
    (Join-Path $repoRoot 'references\sc2-build-96883-casc-export\mods\liberty.sc2mod\zhcn.sc2data\localizeddata\gamestrings.txt'),
    (Join-Path $repoRoot 'references\sc2-build-96883-casc-export\mods\swarm.sc2mod\zhcn.sc2data\localizeddata\gamestrings.txt'),
    (Join-Path $repoRoot 'references\sc2-build-96883-casc-export\mods\void.sc2mod\zhcn.sc2data\localizeddata\gamestrings.txt'),
    (Join-Path $repoRoot 'references\sc2-build-96883-casc-export\mods\starcoop\starcoop.sc2mod\zhcn.sc2data\localizeddata\gamestrings.txt'),
    (Join-Path $repoRoot 'references\official-casc-export\mods\starcoop\starcoop.sc2mod\zhcn.sc2data\localizeddata\gamestrings.txt')
)
$outputDir = Join-Path $originalRoot 'docs\每日进度'
$outputFile = Join-Path $outputDir '2026-05-28-原始mod-CommanderTestBench兵种与建筑清单.md'

New-Item -ItemType Directory -Path $outputDir -Force | Out-Null

$nameMap = @{}
$manualNameMap = [ordered]@{
    'SwarmQueen' = '虫群女王'
    'RoachCorpser' = '腐化蟑螂'
    'ColossusTaldarim' = '毁灭者'
    'HighTemplarTaldarim' = '晋升者'
    'ImmortalTaldarim' = '先锋'
    'Monitor' = '监视者'
    'RoboticsFacilityWarp' = '机械台'
    'DehakaAirTownHall' = '原始空巢'
    'ColossusPurifier' = '巨像'
    'Predator' = '掠袭者'
    'MutaliskBroodlord' = '巢虫领主异龙'
    'VikingMengskAssault' = '维京战机'
    'RavenMengskSieged' = '铁鸦'
    'MercReaper' = '佣兵收割者'
    'SCV' = 'SCV'
    'Medic' = '医疗兵'
    'Firebat' = '火蝠'
    'Viking' = '维京战机'
    'LurkerStetmannBurrowed' = '机械潜伏者'
    'PerditionTurret' = '炼狱炮台'
    'ZealotShakuras' = '黑暗狂热者'
    'InfestedAbomination' = '被感染的畸变体'
    'Scourge' = '爆蚊'
}
function Import-UnitNamesFromGameStrings {
    param([string]$Path)

    if (-not (Test-Path -LiteralPath $Path)) {
        return
    }

    Get-Content -LiteralPath $Path -Encoding UTF8 | ForEach-Object {
        if ($_ -match '^Unit/Name/([^=]+)=(.*)$') {
            $id = $matches[1].Trim()
            $name = (($matches[2] -split '\s+///\s+', 2)[0]).Trim()
            if (-not [string]::IsNullOrWhiteSpace($id) -and -not [string]::IsNullOrWhiteSpace($name)) {
                $shouldReplace = (-not $nameMap.ContainsKey($id)) -or [string]::IsNullOrWhiteSpace($nameMap[$id]) -or ($nameMap[$id] -eq $id)
                if ($shouldReplace) {
                    $nameMap[$id] = $name
                }
            }
        }
    }
}

Get-ChildItem -Path $modsRoot -Directory | ForEach-Object {
    $gameStrings = Join-Path $_.FullName 'zhCN.SC2Data\LocalizedData\GameStrings.txt'
    Import-UnitNamesFromGameStrings -Path $gameStrings
}

foreach ($gameStrings in $officialStrings) {
    Import-UnitNamesFromGameStrings -Path $gameStrings
}

if (Test-Path -LiteralPath $legacyXmRoot) {
    Get-ChildItem -Path $legacyXmRoot -Recurse -File | Where-Object {
        $_.Name -ieq 'GameStrings.txt' -and $_.FullName -match 'zhCN\.SC2Data\\LocalizedData\\'
    } | ForEach-Object {
        Import-UnitNamesFromGameStrings -Path $_.FullName
    }
}

foreach ($entry in $manualNameMap.GetEnumerator()) {
    if (-not $nameMap.ContainsKey($entry.Key) -or [string]::IsNullOrWhiteSpace($nameMap[$entry.Key]) -or ($nameMap[$entry.Key] -eq $entry.Key)) {
        $nameMap[$entry.Key] = $entry.Value
    }
}

function Get-CommanderEntries {
    param(
        [string]$Path,
        [string]$FunctionPrefix,
        [string]$CommanderSuffix
    )

    $result = [ordered]@{}
    $currentCommander = $null
    $currentList = $null
    $braceDepth = 0
    $lineNumber = 0

    foreach ($line in Get-Content -LiteralPath $Path -Encoding UTF8) {
        $lineNumber += 1
        if ($line -match ('^bool\s+' + [regex]::Escape($FunctionPrefix) + '_([A-Za-z0-9]+)' + [regex]::Escape($CommanderSuffix) + '\s*\(')) {
            $currentCommander = $matches[1]
            $currentList = New-Object System.Collections.Generic.List[object]
            $result[$currentCommander] = $currentList
            $braceDepth = 1
            continue
        }
        if ($null -eq $currentCommander) {
            continue
        }

        $openCount = ([regex]::Matches($line, '\{')).Count
        $closeCount = ([regex]::Matches($line, '\}')).Count
        $braceDepth += $openCount

        if ($line -match 'Create(?:Building)?RosterUnit(?:Alias)?\(lp_player,\s*"([^"]+)"(?:,\s*"([^"]+)")?') {
            $unitId = if ($matches[2]) { $matches[2] } else { $matches[1] }
            if (-not [string]::IsNullOrWhiteSpace($unitId)) {
                $currentList.Add([pscustomobject]@{
                    Index = $currentList.Count + 1
                    UnitId = $unitId
                    SourceFile = [System.IO.Path]::GetFileName($Path)
                    SourceLine = $lineNumber
                })
            }
        }

        $braceDepth -= $closeCount
        if ($braceDepth -le 0 -and $closeCount -gt 0) {
            $currentCommander = $null
            $currentList = $null
            $braceDepth = 0
        }
    }

    return $result
}

$unitEntries = Get-CommanderEntries -Path $rostersFile -FunctionPrefix 'libE0EAE146_gf_XMTestBench' -CommanderSuffix 'Roster'
$buildingEntries = Get-CommanderEntries -Path $buildingsFile -FunctionPrefix 'libE0EAE146_gf_XMTestBench' -CommanderSuffix 'Buildings'

$commanderOrder = @(
    'Abathur', 'Alarak', 'Artanis', 'Dehaka', 'Fenix', 'Horner', 'Karax', 'Kerrigan',
    'Mengsk', 'Nova', 'Raynor', 'Stetmann', 'Stukov', 'Swann', 'Tychus', 'Vorazun',
    'Zagara', 'Zeratul'
)

$lines = New-Object System.Collections.Generic.List[string]
$lines.Add('# 原始mod CommanderTestBench 兵种与建筑清单')
$lines.Add('')
$lines.Add('## 说明')
$lines.Add('')
$lines.Add('- 来源：`原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146_CommanderRosters.galaxy` 与 `LibE0EAE146_CommanderBuildings.galaxy`。')
$lines.Add('- 目的：作为 `CommanderTestBench` 的 `full_units` 与 `full_buildings` 测试输入对照表。')
$lines.Add('- 中文名优先读取 `原始mod/Mods/XM/*/zhCN.SC2Data/LocalizedData/GameStrings.txt`，缺失时回退到 `references/sc2-build-96883-casc-export` 的官方 `zhcn` GameStrings。')
$lines.Add('- 若中文名缺失，则保留原始 UnitId。')
$lines.Add('- 每条记录附带来源文件与行号，便于人工纠正后回写到 Galaxy roster。')
$lines.Add('')

foreach ($commander in $commanderOrder) {
    $unitList = if ($unitEntries.Keys -contains $commander) { $unitEntries[$commander] } else { New-Object System.Collections.Generic.List[object] }
    $buildingList = if ($buildingEntries.Keys -contains $commander) { $buildingEntries[$commander] } else { New-Object System.Collections.Generic.List[object] }

    $lines.Add("## $commander")
    $lines.Add('')
    $lines.Add(('兵种数量：{0}' -f $unitList.Count))
    foreach ($unitEntry in $unitList) {
        $unitId = $unitEntry.UnitId
        $displayName = if ($manualNameMap.Contains($unitId)) { $manualNameMap[$unitId] } elseif ($nameMap.ContainsKey($unitId)) { $nameMap[$unitId] } else { $unitId }
        $lines.Add(('- [' + $unitEntry.Index + '] `' + $unitId + '`：' + $displayName + '  `(' + $unitEntry.SourceFile + ':' + $unitEntry.SourceLine + ')`'))
    }
    if ($unitList.Count -eq 0) {
        $lines.Add('- 无')
    }
    $lines.Add('')
    $lines.Add(('建筑数量：{0}' -f $buildingList.Count))
    foreach ($buildingEntry in $buildingList) {
        $buildingId = $buildingEntry.UnitId
        $displayName = if ($manualNameMap.Contains($buildingId)) { $manualNameMap[$buildingId] } elseif ($nameMap.ContainsKey($buildingId)) { $nameMap[$buildingId] } else { $buildingId }
        $lines.Add(('- [' + $buildingEntry.Index + '] `' + $buildingId + '`：' + $displayName + '  `(' + $buildingEntry.SourceFile + ':' + $buildingEntry.SourceLine + ')`'))
    }
    if ($buildingList.Count -eq 0) {
        $lines.Add('- 无')
    }
    $lines.Add('')

    $singleLines = New-Object System.Collections.Generic.List[string]
    $singleLines.Add("# $commander CommanderTestBench 面板清单")
    $singleLines.Add('')
    $singleLines.Add('- 来源：`LibE0EAE146_CommanderRosters.galaxy` / `LibE0EAE146_CommanderBuildings.galaxy`。')
    $singleLines.Add('- 用途：人工校对当前指挥官的兵种/建筑面板项。')
    $singleLines.Add('')
    $singleLines.Add('## 兵种')
    $singleLines.Add('')
    foreach ($unitEntry in $unitList) {
        $unitId = $unitEntry.UnitId
        $displayName = if ($manualNameMap.Contains($unitId)) { $manualNameMap[$unitId] } elseif ($nameMap.ContainsKey($unitId)) { $nameMap[$unitId] } else { $unitId }
        $singleLines.Add(('- [' + $unitEntry.Index + '] `' + $unitId + '`：' + $displayName + '  `(' + $unitEntry.SourceFile + ':' + $unitEntry.SourceLine + ')`'))
    }
    if ($unitList.Count -eq 0) {
        $singleLines.Add('- 无')
    }
    $singleLines.Add('')
    $singleLines.Add('## 建筑')
    $singleLines.Add('')
    foreach ($buildingEntry in $buildingList) {
        $buildingId = $buildingEntry.UnitId
        $displayName = if ($manualNameMap.Contains($buildingId)) { $manualNameMap[$buildingId] } elseif ($nameMap.ContainsKey($buildingId)) { $nameMap[$buildingId] } else { $buildingId }
        $singleLines.Add(('- [' + $buildingEntry.Index + '] `' + $buildingId + '`：' + $displayName + '  `(' + $buildingEntry.SourceFile + ':' + $buildingEntry.SourceLine + ')`'))
    }
    if ($buildingList.Count -eq 0) {
        $singleLines.Add('- 无')
    }

    $singleFile = Join-Path $outputDir ("2026-05-28-原始mod-CommanderTestBench-{0}-面板清单.md" -f $commander)
    Set-Content -LiteralPath $singleFile -Value $singleLines -Encoding UTF8
}

Set-Content -LiteralPath $outputFile -Value $lines -Encoding UTF8
Write-Output $outputFile
