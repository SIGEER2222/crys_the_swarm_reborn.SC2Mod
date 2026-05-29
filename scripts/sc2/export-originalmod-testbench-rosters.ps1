param(
    [string[]]$Commander,
    [ValidateSet('All', 'Units', 'Buildings')]
    [string]$Kind = 'All',
    [string]$Keyword,
    [ValidateSet('All', 'Markdown', 'Csv', 'Json')]
    [string]$OutputFormat = 'All',
    [string]$OutputDir,
    [string]$OutputBaseName,
    [switch]$SkipPerCommanderFiles
)

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

if ([string]::IsNullOrWhiteSpace($OutputDir)) {
    $OutputDir = Join-Path $originalRoot 'docs\每日进度'
}

$hasFilters = ($Commander.Count -gt 0) -or ($Kind -ne 'All') -or (-not [string]::IsNullOrWhiteSpace($Keyword))
if ([string]::IsNullOrWhiteSpace($OutputBaseName)) {
    if ($hasFilters) {
        $OutputBaseName = '2026-05-29-原始mod-CommanderTestBench兵种建筑筛选结果'
    }
    else {
        $OutputBaseName = '2026-05-29-原始mod-CommanderTestBench兵种建筑总表'
    }
}

$legacyMarkdownPath = Join-Path $OutputDir '2026-05-28-原始mod-CommanderTestBench兵种与建筑清单.md'
$markdownPath = Join-Path $OutputDir ($OutputBaseName + '.md')
$csvPath = Join-Path $OutputDir ($OutputBaseName + '.csv')
$jsonPath = Join-Path $OutputDir ($OutputBaseName + '.json')

New-Item -ItemType Directory -Path $OutputDir -Force | Out-Null

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

function Get-DisplayName {
    param([string]$UnitId)

    if ($manualNameMap.Contains($UnitId)) {
        return $manualNameMap[$UnitId]
    }
    if ($nameMap.ContainsKey($UnitId)) {
        return $nameMap[$UnitId]
    }
    return $UnitId
}

function Write-MarkdownReport {
    param(
        [System.Collections.IEnumerable]$Rows,
        [string]$Path,
        [string]$Title,
        [string]$Description
    )

    $rowsByCommander = $Rows | Group-Object Commander
    $lines = New-Object System.Collections.Generic.List[string]
    $lines.Add("# $Title")
    $lines.Add('')
    $lines.Add('## 说明')
    $lines.Add('')
    $lines.Add('- 来源：`原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146_CommanderRosters.galaxy` 与 `LibE0EAE146_CommanderBuildings.galaxy`。')
    $lines.Add('- 目的：作为 `CommanderTestBench` 的 `full_units` 与 `full_buildings` 测试输入对照表。')
    $lines.Add('- 中文名优先读取 `原始mod/Mods/XM/*/zhCN.SC2Data/LocalizedData/GameStrings.txt`，缺失时回退到官方 `zhCN` GameStrings；仍缺失则保留原始 UnitId。')
    $lines.Add('- 筛选方法：可改用脚本参数 `-Commander`、`-Kind`、`-Keyword`，并配合 `-OutputFormat Csv/Json` 生成可继续筛选的本地文件。')
    if (-not [string]::IsNullOrWhiteSpace($Description)) {
        $lines.Add("- 当前条件：$Description")
    }
    $lines.Add('')

    foreach ($group in $rowsByCommander) {
        $unitRows = @($group.Group | Where-Object { $_.Kind -eq '兵种' })
        $buildingRows = @($group.Group | Where-Object { $_.Kind -eq '建筑' })

        $lines.Add("## $($group.Name)")
        $lines.Add('')
        $lines.Add(('兵种数量：{0}' -f $unitRows.Count))
        foreach ($row in $unitRows) {
            $lines.Add(('- [' + $row.Index + '] `' + $row.UnitId + '`：' + $row.NameZh + '  `(' + $row.SourceFile + ':' + $row.SourceLine + ')`'))
        }
        if ($unitRows.Count -eq 0) {
            $lines.Add('- 无')
        }
        $lines.Add('')
        $lines.Add(('建筑数量：{0}' -f $buildingRows.Count))
        foreach ($row in $buildingRows) {
            $lines.Add(('- [' + $row.Index + '] `' + $row.UnitId + '`：' + $row.NameZh + '  `(' + $row.SourceFile + ':' + $row.SourceLine + ')`'))
        }
        if ($buildingRows.Count -eq 0) {
            $lines.Add('- 无')
        }
        $lines.Add('')
    }

    Set-Content -LiteralPath $Path -Value $lines -Encoding UTF8
}

function Write-CommanderMarkdown {
    param(
        [System.Collections.IEnumerable]$Rows,
        [string]$Path,
        [string]$CommanderName
    )

    $unitRows = @($Rows | Where-Object { $_.Kind -eq '兵种' })
    $buildingRows = @($Rows | Where-Object { $_.Kind -eq '建筑' })
    $lines = New-Object System.Collections.Generic.List[string]
    $lines.Add("# $CommanderName CommanderTestBench 面板清单")
    $lines.Add('')
    $lines.Add('- 来源：`LibE0EAE146_CommanderRosters.galaxy` / `LibE0EAE146_CommanderBuildings.galaxy`。')
    $lines.Add('- 用途：人工校对当前指挥官的兵种/建筑面板项。')
    $lines.Add('')
    $lines.Add('## 兵种')
    $lines.Add('')
    foreach ($row in $unitRows) {
        $lines.Add(('- [' + $row.Index + '] `' + $row.UnitId + '`：' + $row.NameZh + '  `(' + $row.SourceFile + ':' + $row.SourceLine + ')`'))
    }
    if ($unitRows.Count -eq 0) {
        $lines.Add('- 无')
    }
    $lines.Add('')
    $lines.Add('## 建筑')
    $lines.Add('')
    foreach ($row in $buildingRows) {
        $lines.Add(('- [' + $row.Index + '] `' + $row.UnitId + '`：' + $row.NameZh + '  `(' + $row.SourceFile + ':' + $row.SourceLine + ')`'))
    }
    if ($buildingRows.Count -eq 0) {
        $lines.Add('- 无')
    }

    Set-Content -LiteralPath $Path -Value $lines -Encoding UTF8
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

$unitEntries = Get-CommanderEntries -Path $rostersFile -FunctionPrefix 'libE0EAE146_gf_XMTestBench' -CommanderSuffix 'Roster'
$buildingEntries = Get-CommanderEntries -Path $buildingsFile -FunctionPrefix 'libE0EAE146_gf_XMTestBench' -CommanderSuffix 'Buildings'

$commanderOrder = @(
    'Abathur', 'Alarak', 'Artanis', 'Dehaka', 'Fenix', 'Horner', 'Karax', 'Kerrigan',
    'Mengsk', 'Nova', 'Raynor', 'Stetmann', 'Stukov', 'Swann', 'Tychus', 'Vorazun',
    'Zagara', 'Zeratul'
)

$allRows = New-Object System.Collections.Generic.List[object]

foreach ($commanderName in $commanderOrder) {
    $unitList = if ($unitEntries.Keys -contains $commanderName) { $unitEntries[$commanderName] } else { @() }
    $buildingList = if ($buildingEntries.Keys -contains $commanderName) { $buildingEntries[$commanderName] } else { @() }

    foreach ($entry in $unitList) {
        $allRows.Add([pscustomobject]@{
            Commander = $commanderName
            Kind = '兵种'
            Index = $entry.Index
            UnitId = $entry.UnitId
            NameZh = Get-DisplayName -UnitId $entry.UnitId
            SourceFile = $entry.SourceFile
            SourceLine = $entry.SourceLine
        })
    }

    foreach ($entry in $buildingList) {
        $allRows.Add([pscustomobject]@{
            Commander = $commanderName
            Kind = '建筑'
            Index = $entry.Index
            UnitId = $entry.UnitId
            NameZh = Get-DisplayName -UnitId $entry.UnitId
            SourceFile = $entry.SourceFile
            SourceLine = $entry.SourceLine
        })
    }
}

$filteredRows = @($allRows | ForEach-Object { $_ })
if ($Commander.Count -gt 0) {
    $commanderSet = [System.Collections.Generic.HashSet[string]]::new([System.StringComparer]::OrdinalIgnoreCase)
    foreach ($name in $Commander) {
        if (-not [string]::IsNullOrWhiteSpace($name)) {
            [void]$commanderSet.Add($name.Trim())
        }
    }
    $filteredRows = @($filteredRows | Where-Object { $commanderSet.Contains($_.Commander) })
}

if ($Kind -eq 'Units') {
    $filteredRows = @($filteredRows | Where-Object { $_.Kind -eq '兵种' })
}
elseif ($Kind -eq 'Buildings') {
    $filteredRows = @($filteredRows | Where-Object { $_.Kind -eq '建筑' })
}

if (-not [string]::IsNullOrWhiteSpace($Keyword)) {
    $keywordPattern = [regex]::Escape($Keyword.Trim())
    $filteredRows = @($filteredRows | Where-Object {
        $_.Commander -match $keywordPattern -or
        $_.UnitId -match $keywordPattern -or
        $_.NameZh -match $keywordPattern -or
        $_.Kind -match $keywordPattern
    })
}

$descriptionParts = New-Object System.Collections.Generic.List[string]
if ($Commander.Count -gt 0) {
    $descriptionParts.Add(('指挥官=' + (($Commander | Where-Object { -not [string]::IsNullOrWhiteSpace($_) }) -join ',')))
}
if ($Kind -ne 'All') {
    $descriptionParts.Add(('类型=' + $Kind))
}
if (-not [string]::IsNullOrWhiteSpace($Keyword)) {
    $descriptionParts.Add(('关键词=' + $Keyword.Trim()))
}
if ($descriptionParts.Count -eq 0) {
    $descriptionParts.Add('无筛选，导出全量结果')
}
$description = $descriptionParts -join '；'

$writtenFiles = New-Object System.Collections.Generic.List[string]

if (($OutputFormat -eq 'All') -or ($OutputFormat -eq 'Markdown')) {
    $markdownTitle = if ($hasFilters) { '原始mod CommanderTestBench 兵种与建筑筛选结果' } else { '原始mod CommanderTestBench 兵种与建筑清单' }
    Write-MarkdownReport -Rows $filteredRows -Path $markdownPath -Title $markdownTitle -Description $description
    $writtenFiles.Add($markdownPath)

    if (-not $hasFilters) {
        Write-MarkdownReport -Rows $filteredRows -Path $legacyMarkdownPath -Title '原始mod CommanderTestBench 兵种与建筑清单' -Description $description
        $writtenFiles.Add($legacyMarkdownPath)
    }

    if (-not $SkipPerCommanderFiles) {
        foreach ($commanderGroup in ($filteredRows | Group-Object Commander)) {
            $singleFile = Join-Path $OutputDir ("2026-05-28-原始mod-CommanderTestBench-{0}-面板清单.md" -f $commanderGroup.Name)
            Write-CommanderMarkdown -Rows $commanderGroup.Group -Path $singleFile -CommanderName $commanderGroup.Name
            $writtenFiles.Add($singleFile)
        }
    }
}

if (($OutputFormat -eq 'All') -or ($OutputFormat -eq 'Csv')) {
    $filteredRows |
        Select-Object Commander, Kind, Index, UnitId, NameZh, SourceFile, SourceLine |
        Export-Csv -LiteralPath $csvPath -NoTypeInformation -Encoding UTF8
    $writtenFiles.Add($csvPath)
}

if (($OutputFormat -eq 'All') -or ($OutputFormat -eq 'Json')) {
    $filteredRows |
        Select-Object Commander, Kind, Index, UnitId, NameZh, SourceFile, SourceLine |
        ConvertTo-Json -Depth 3 |
        Set-Content -LiteralPath $jsonPath -Encoding UTF8
    $writtenFiles.Add($jsonPath)
}

$writtenFiles | Sort-Object -Unique | ForEach-Object { Write-Output $_ }
