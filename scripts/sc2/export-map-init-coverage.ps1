param(
    [string]$ProjectRoot,
    [string]$OutputDir
)

$ErrorActionPreference = "Stop"

if ([string]::IsNullOrWhiteSpace($ProjectRoot)) {
    $ProjectRoot = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path
}
else {
    $ProjectRoot = (Resolve-Path $ProjectRoot).Path
}

if ([string]::IsNullOrWhiteSpace($OutputDir)) {
    $OutputDir = Join-Path $ProjectRoot "tmp\2026-05-26-commander-map-static-analysis"
}

$mapsRoot = Join-Path $ProjectRoot "合作指挥官版起义狂潮\Maps\XM"
$targetCommanders = @(
    "Abathur",
    "AbathurReborn",
    "Alarak",
    "Artanis",
    "Fenix",
    "Karax",
    "Kerrigan",
    "Raynor",
    "Vorazun",
    "Zagara",
    "Zeratul"
)

$mapNames = @{
    "LauncherAuto.SC2Map" = "Launcher"
    "thanson01.SC2Map" = "大撤离"
    "thanson02.SC2Map" = "大爆发"
    "thanson03a.SC2Map" = "拯救海文"
    "thanson03b.SC2Map" = "海文的陷落"
    "thorner01.SC2Map" = "火车大劫案"
    "thorner02.SC2Map" = "博弈"
    "thorner03.SC2Map" = "毁灭引擎"
    "thorner04.SC2Map" = "媒体轰炸"
    "thorner05s.SC2Map" = "揭露黑幕"
    "traynor01.SC2Map" = "自由日"
    "traynor02.SC2Map" = "不法之徒"
    "traynor03.SC2Map" = "零点行动"
    "ttosh01.SC2Map" = "恶魔游乐场"
    "ttosh02.SC2Map" = "欢迎来到丛林"
    "ttosh03a.SC2Map" = "营救"
    "ttosh03b.SC2Map" = "幽灵一击"
    "ttychus01.SC2Map" = "来之不易"
    "ttychus02.SC2Map" = "挖宝行动"
    "ttychus03.SC2Map" = "莫比斯代理人"
    "ttychus04.SC2Map" = "超新星"
    "ttychus05.SC2Map" = "虚空巨口"
    "tvalerian01.SC2Map" = "地狱之门"
    "tvalerian02a.SC2Map" = "野兽之腹"
    "tvalerian02b.SC2Map" = "天崩地坼"
    "tvalerian03.SC2Map" = "背水一战"
    "tzeratul02.SC2Map" = "恶兆"
    "tzeratul03.SC2Map" = "未来回响"
    "tzeratul04.SC2Map" = "究极黑暗"
}

$knownVariableBindingRisk = @{
    "thorner03.SC2Map" = "地图仍有本地英雄/剧情变量语义，不能只按 helper 机械替换"
    "ttosh03b.SC2Map" = "地图仍有本地英雄/剧情变量语义，不能只按 helper 机械替换"
    "traynor01.SC2Map" = "RPG/无基地图存在多段救援、货舱和玩家初始单位分支，需要逐段确认"
}

function Get-RegexCount {
    param(
        [string]$Text,
        [string]$Pattern
    )

    return ([regex]::Matches($Text, $Pattern)).Count
}

function Get-CallArgs {
    param(
        [string]$Text,
        [string]$FunctionName
    )

    $pattern = [regex]::Escape($FunctionName) + '\((?<args>.*)\);'
    $matches = [regex]::Matches($Text, $pattern)
    $args = @()
    foreach ($match in $matches) {
        $args += $match.Groups["args"].Value.Trim()
    }
    return $args
}

function Format-Counts {
    param([hashtable]$Counts)

    $items = @()
    foreach ($commander in $targetCommanders) {
        if ($Counts.ContainsKey($commander) -and $Counts[$commander] -gt 0) {
            $items += ("{0}:{1}" -f $commander, $Counts[$commander])
        }
    }
    return ($items -join "; ")
}

New-Item -ItemType Directory -Force -Path $OutputDir | Out-Null

$scanRows = @()
$coverageRows = @()

foreach ($mapDir in Get-ChildItem -LiteralPath $mapsRoot -Directory -Filter "*.SC2Map" | Sort-Object Name) {
    $mapName = $mapDir.Name
    $mapScript = Join-Path $mapDir.FullName "MapScript.galaxy"
    $documentInfo = Join-Path $mapDir.FullName "DocumentInfo"
    $hasMapScript = Test-Path -LiteralPath $mapScript
    $hasXMFinalDep = (Test-Path -LiteralPath $documentInfo) -and
        (Select-String -LiteralPath $documentInfo -Pattern "XMFinal.SC2Mod" -SimpleMatch -Quiet)

    $text = ""
    if ($hasMapScript) {
        $text = Get-Content -LiteralPath $mapScript -Raw
    }

    $initializeArgs = @(Get-CallArgs -Text $text -FunctionName "libE0EAE146_gf_Initialize")
    $initializeBaseArgs = @(Get-CallArgs -Text $text -FunctionName "libE0EAE146_gf_InitializeBase")

    $branchCounts = @{}
    $startCounts = @{}
    $cargoCounts = @{}
    $forcedCounts = @{}
    foreach ($commander in $targetCommanders) {
        $branchCounts[$commander] = Get-RegexCount -Text $text -Pattern ('==\s*"{0}"' -f [regex]::Escape($commander))
        $startCounts[$commander] = Get-RegexCount -Text $text -Pattern ('libE0EAE146_gf_{0}CreateMapStartSquad\s*\(' -f [regex]::Escape($commander))
        $cargoCounts[$commander] = Get-RegexCount -Text $text -Pattern ('libE0EAE146_gf_{0}CreateCargoSquad\s*\(' -f [regex]::Escape($commander))
        $forcedCounts[$commander] = Get-RegexCount -Text $text -Pattern ('libE0EAE146_gv_commander\s*=\s*"{0}"' -f [regex]::Escape($commander))
    }

    $hasAnyStartHelper = ($startCounts.Values | Where-Object { $_ -gt 0 } | Measure-Object).Count -gt 0
    $hasAnyCargoHelper = ($cargoCounts.Values | Where-Object { $_ -gt 0 } | Measure-Object).Count -gt 0
    $hasAnyTargetBranch = ($branchCounts.Values | Where-Object { $_ -gt 0 } | Measure-Object).Count -gt 0
    $isRpgInit = ($initializeArgs -contains "true") -and ($initializeBaseArgs.Count -eq 0)
    $createsHeroInBase = $false
    if ($initializeBaseArgs.Count -gt 0) {
        $createsHeroInBase = (($initializeBaseArgs -join "; ") -match ',\s*true\s*$')
    }

    $notes = @()
    if ($isRpgInit) {
        $notes += "RPG/无基地初始化"
    }
    elseif ($initializeBaseArgs.Count -gt 0) {
        $notes += "基地初始化"
    }
    if ($initializeBaseArgs.Count -gt 0 -and -not $createsHeroInBase) {
        $notes += "InitializeBase 不创建英雄/第二单位"
    }
    if ($knownVariableBindingRisk.ContainsKey($mapName)) {
        $notes += $knownVariableBindingRisk[$mapName]
    }

    $scanRows += [pscustomobject]@{
        Map = $mapName
        ChineseName = $mapNames[$mapName]
        HasMapScript = $hasMapScript
        HasXMFinalDep = $hasXMFinalDep
        InitializeCalls = $initializeArgs.Count
        InitializeArgs = ($initializeArgs -join "; ")
        InitializeBaseCount = $initializeBaseArgs.Count
        InitializeBaseArgs = ($initializeBaseArgs -join "; ")
        IsRpgInit = $isRpgInit
        CreatesHeroInBase = $createsHeroInBase
        Branches = Format-Counts -Counts $branchCounts
        StartSquadHelpers = Format-Counts -Counts $startCounts
        CargoHelpers = Format-Counts -Counts $cargoCounts
        ForcedCommander = Format-Counts -Counts $forcedCounts
        Notes = ($notes -join "；")
    }

    foreach ($commander in $targetCommanders) {
        $hasBranch = $branchCounts[$commander] -gt 0
        $hasStartHelper = $startCounts[$commander] -gt 0
        $hasCargoHelper = $cargoCounts[$commander] -gt 0
        $usesAbathurAlias = $false

        if ($commander -eq "AbathurReborn") {
            $usesAbathurAlias = $hasBranch -and (($startCounts["Abathur"] -gt 0) -or ($cargoCounts["Abathur"] -gt 0))
            if (-not $hasStartHelper -and $hasBranch) {
                $hasStartHelper = $startCounts["Abathur"] -gt 0
            }
            if (-not $hasCargoHelper -and $hasBranch) {
                $hasCargoHelper = $cargoCounts["Abathur"] -gt 0
            }
        }

        $missing = @()
        if ($hasAnyTargetBranch -and -not $hasBranch) {
            $missing += "branch"
        }
        if ($hasAnyStartHelper -and -not $hasStartHelper) {
            $missing += "start"
        }
        if ($hasAnyCargoHelper -and -not $hasCargoHelper) {
            $missing += "cargo"
        }

        $coverageRows += [pscustomobject]@{
            Map = $mapName
            ChineseName = $mapNames[$mapName]
            Commander = $commander
            HasXMFinalDep = $hasXMFinalDep
            HasInitialize = $initializeArgs.Count -gt 0
            HasInitializeBase = $initializeBaseArgs.Count -gt 0
            IsRpgInit = $isRpgInit
            HasLocalBranch = $hasBranch
            HasStartSquadHelper = $hasStartHelper
            HasCargoHelper = $hasCargoHelper
            UsesAbathurAlias = $usesAbathurAlias
            MissingLocalPieces = ($missing -join "+")
            Notes = ($notes -join "；")
        }
    }
}

$scanPath = Join-Path $OutputDir "map-init-scan.csv"
$coveragePath = Join-Path $OutputDir "map-init-coverage.csv"
$scanRows | Export-Csv -LiteralPath $scanPath -NoTypeInformation -Encoding UTF8
$coverageRows | Export-Csv -LiteralPath $coveragePath -NoTypeInformation -Encoding UTF8

$missingRows = @($coverageRows | Where-Object { -not [string]::IsNullOrWhiteSpace($_.MissingLocalPieces) })
$summaryPath = Join-Path $OutputDir "map-init-coverage-summary.md"
$summary = @()
$summary += "# 地图初始化覆盖扫描"
$summary += ""
$summary += "- 生成时间：$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
$summary += "- 地图数：$($scanRows.Count)"
$summary += "- 目标指挥官数：$($targetCommanders.Count)"
$summary += "- 本地分支缺口行数：$($missingRows.Count)"
$summary += ""
$summary += "## 文件"
$summary += ""
$summary += "- `map-init-scan.csv`：地图级初始化、依赖、helper 汇总。"
$summary += "- `map-init-coverage.csv`：地图 x 指挥官级覆盖表。"
$summary += ""
$summary += "## 本地分支缺口"
$summary += ""
if ($missingRows.Count -eq 0) {
    $summary += "未发现目标指挥官在已有本地特化分支中的静态缺口。"
}
else {
    foreach ($row in $missingRows | Sort-Object Map, Commander) {
        $summary += ('- `{0}`（{1}）/ `{2}`：{3}' -f $row.Map, $row.ChineseName, $row.Commander, $row.MissingLocalPieces)
    }
}
$summary | Set-Content -LiteralPath $summaryPath -Encoding UTF8

Write-Host "Wrote $scanPath"
Write-Host "Wrote $coveragePath"
Write-Host "Wrote $summaryPath"
if ($missingRows.Count -gt 0) {
    Write-Host "Missing local coverage rows: $($missingRows.Count)"
}
