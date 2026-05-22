param(
    [Parameter(Position = 0)]
    [string]$Command = "help",

    [string]$Id,
    [string]$ModRoot,
    [string]$OutputDir,
    [string]$ReportPath,
    [int]$EffectDepth = 3,
    [int]$MaxHitsPerFile = 20
)

$ErrorActionPreference = "Stop"

$scriptRoot = if ($PSScriptRoot) { $PSScriptRoot } else { Split-Path -Parent $MyInvocation.MyCommand.Path }
if ([string]::IsNullOrWhiteSpace($ModRoot)) {
    $ModRoot = Join-Path $scriptRoot "..\合作指挥官版起义狂潮\Mods\XM\XMFinal.SC2Mod"
}
if ([string]::IsNullOrWhiteSpace($OutputDir)) {
    $OutputDir = Join-Path $scriptRoot "..\references\index"
}
if ([string]::IsNullOrWhiteSpace($ReportPath)) {
    $ReportPath = Join-Path $scriptRoot "..\references\latest-validate-report.md"
}

$buildScript = Join-Path $scriptRoot "build-object-index.ps1"
$exportScript = Join-Path $scriptRoot "export-unit-index.ps1"
$unitChainScript = Join-Path $scriptRoot "find-unit-chain.ps1"
$upgradeChainScript = Join-Path $scriptRoot "find-upgrade-chain.ps1"
$validateScript = Join-Path $scriptRoot "validate-common-refs.ps1"
$lookupIndexPath = Join-Path $OutputDir "lookup-index.json"
$searchManifestPath = Join-Path $OutputDir "lookup-search-files.json"

function Show-Help {
    Write-Host "mod-index.ps1 用法"
    Write-Host ""
    Write-Host "  build              重建索引、文本缓存和单位 TSV 索引"
    Write-Host "  lookup -Id <ID>    查任意 ID：定义、引用、本地化、原始文本命中"
    Write-Host "  unit -Id <UnitId>  查单位主链路（沿用现有 unit chain 脚本）"
    Write-Host "  upgrade -Id <ID>   查升级/按钮/效果等对象引用（沿用现有 upgrade chain 脚本）"
    Write-Host "  validate           跑常见断链校验"
    Write-Host "  export             仅导出单位中文索引 TSV"
    Write-Host ""
    Write-Host "示例："
    Write-Host "  powershell -ExecutionPolicy Bypass -File .\scripts\mod-index.ps1 build"
    Write-Host "  powershell -ExecutionPolicy Bypass -File .\scripts\mod-index.ps1 lookup -Id SwarmHost"
    Write-Host "  powershell -ExecutionPolicy Bypass -File .\scripts\mod-index.ps1 unit -Id Queen"
    Write-Host "  powershell -ExecutionPolicy Bypass -File .\scripts\mod-index.ps1 upgrade -Id QueenNornQueenPurchase"
}

function Ensure-Index {
    if (-not (Test-Path $lookupIndexPath)) {
        Write-Host "未找到 lookup 索引，正在自动构建..."
        Invoke-Build
    }
}

function Invoke-Build {
    & $buildScript -ModRoot $ModRoot -OutputDir $OutputDir
    & $exportScript -ModRoot $ModRoot
}

function Get-SearchFiles {
    $paths = New-Object System.Collections.Generic.List[string]

    if (Test-Path $searchManifestPath) {
        $manifest = Get-Content -Raw -Encoding UTF8 $searchManifestPath | ConvertFrom-Json
        foreach ($row in $manifest) {
            $fullPath = Join-Path $ModRoot $row.relativePath
            if (Test-Path $fullPath) {
                $paths.Add($fullPath)
            }
        }
        return $paths
    }

    foreach ($file in Get-ChildItem -Path (Join-Path $ModRoot "Base.SC2Data\GameData") -Filter *.xml -File -ErrorAction SilentlyContinue) {
        $paths.Add($file.FullName)
    }
    foreach ($file in Get-ChildItem -Path (Join-Path $ModRoot "Base.SC2Data") -Filter *.galaxy -File -ErrorAction SilentlyContinue) {
        $paths.Add($file.FullName)
    }
    foreach ($localeDir in @("zhCN.SC2Data\LocalizedData", "enUS.SC2Data\LocalizedData")) {
        $fullDir = Join-Path $ModRoot $localeDir
        foreach ($file in Get-ChildItem -Path $fullDir -File -ErrorAction SilentlyContinue) {
            $paths.Add($file.FullName)
        }
    }
    $triggersPath = Join-Path $ModRoot "Triggers"
    if (Test-Path $triggersPath) {
        $paths.Add($triggersPath)
    }

    return $paths
}

function Show-Lookup {
    param([string]$LookupId)

    if ([string]::IsNullOrWhiteSpace($LookupId)) {
        throw "lookup 需要提供 -Id。"
    }

    Ensure-Index

    $lookupIndex = Get-Content -Raw -Encoding UTF8 $lookupIndexPath | ConvertFrom-Json
    $entry = $lookupIndex | Where-Object { $_.id -eq $LookupId } | Select-Object -First 1

    Write-Host ("ID: {0}" -f $LookupId)
    Write-Host ""

    if ($null -eq $entry) {
        Write-Host "索引里没有这个 ID 的结构化条目。"
    }
    else {
        Write-Host "=== 精确对象 ==="
        if ($entry.definitions.Count -eq 0) {
            Write-Host "无"
        }
        else {
            foreach ($def in $entry.definitions) {
                $nameParts = @()
                if ($def.nameZh) { $nameParts += ("名称={0}" -f $def.nameZh) }
                if ($def.subtitleZh) { $nameParts += ("副标题={0}" -f $def.subtitleZh) }
                if ($def.tooltipZh) { $nameParts += ("提示={0}" -f $def.tooltipZh) }

                Write-Host ("[{0}] {1} ({2})" -f $def.catalog, $def.file, $def.type)
                if ($nameParts.Count -gt 0) {
                    Write-Host ("  " + ($nameParts -join " | "))
                }
            }
        }

        Write-Host ""
        Write-Host "=== 出站引用 ==="
        if ($entry.outgoingRefs.Count -eq 0) {
            Write-Host "无"
        }
        else {
            foreach ($ref in $entry.outgoingRefs) {
                Write-Host ("- {0} -> [{1}] {2} ({3})" -f $ref.refType, $ref.toCatalog, $ref.toId, $ref.sourceFile)
            }
        }

        Write-Host ""
        Write-Host "=== 入站引用 ==="
        if ($entry.incomingRefs.Count -eq 0) {
            Write-Host "无"
        }
        else {
            foreach ($ref in $entry.incomingRefs) {
                Write-Host ("- [{0}] {1} --{2}--> ({3})" -f $ref.fromCatalog, $ref.fromId, $ref.refType, $ref.sourceFile)
            }
        }

        Write-Host ""
        Write-Host "=== 本地化 ==="
        if ($entry.localizations.Count -eq 0) {
            Write-Host "无"
        }
        else {
            foreach ($text in $entry.localizations) {
                Write-Host ("- [{0}/{1}] {2} = {3}" -f $text.locale, $text.table, $text.key, $text.value)
            }
        }
    }

    Write-Host ""
    Write-Host "=== 原始文本命中 ==="
    $searchFiles = Get-SearchFiles
    $matches = Select-String -Path $searchFiles -Pattern $LookupId -SimpleMatch
    if (-not $matches) {
        Write-Host "无"
        return
    }

    foreach ($group in ($matches | Group-Object Path | Sort-Object Name)) {
        Write-Host ("[{0}]" -f ([System.IO.Path]::GetRelativePath($ModRoot, $group.Name)))
        $shown = 0
        foreach ($match in ($group.Group | Sort-Object LineNumber)) {
            Write-Host ("  {0}: {1}" -f $match.LineNumber, $match.Line.Trim())
            $shown++
            if ($shown -ge $MaxHitsPerFile) {
                $remaining = $group.Count - $shown
                if ($remaining -gt 0) {
                    Write-Host ("  ... 省略 {0} 条更多命中" -f $remaining)
                }
                break
            }
        }
    }
}

switch ($Command.ToLowerInvariant()) {
    "build" {
        Invoke-Build
    }
    "rebuild" {
        Invoke-Build
    }
    "lookup" {
        Show-Lookup -LookupId $Id
    }
    "id" {
        Show-Lookup -LookupId $Id
    }
    "unit" {
        if ([string]::IsNullOrWhiteSpace($Id)) {
            throw "unit 需要提供 -Id。"
        }
        & $unitChainScript -UnitId $Id -ModRoot $ModRoot -EffectDepth $EffectDepth
    }
    "upgrade" {
        if ([string]::IsNullOrWhiteSpace($Id)) {
            throw "upgrade 需要提供 -Id。"
        }
        & $upgradeChainScript -Id $Id -ModRoot $ModRoot -MaxHitsPerFile $MaxHitsPerFile
    }
    "validate" {
        & $validateScript -ModRoot $ModRoot -ReportPath $ReportPath
    }
    "export" {
        & $exportScript -ModRoot $ModRoot
    }
    "help" {
        Show-Help
    }
    default {
        throw "未知命令：$Command。可用命令：build / lookup / unit / upgrade / validate / export / help"
    }
}
