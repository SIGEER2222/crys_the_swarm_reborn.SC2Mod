<#
.SYNOPSIS
按指挥官对比官方合作指挥官 JSON 与当前 Mod 的 ID 覆盖差异。

.DESCRIPTION
这是 Windows/PowerShell 入口包装器，核心实现位于同目录的
compare-official-commanders-vs-mod.mjs。

默认读取：
- 官方数据：游戏数据\官方合作指挥官\commanders
- Mod 数据：合作指挥官版起义狂潮
- 输出目录：docs\每日进度\<yyyy-MM-dd>-官方指挥官与mod差异对比

对比口径：
- 逐个指挥官读取官方 units/buildings/heroes/upgrades/progression/prestiges/command_cards JSON。
- 扫描对应 XM<Commander>.SC2Mod，并合并公共 XMCore.SC2Mod、XMFinal.SC2Mod。
- 判断官方 ID 是否在 Mod 文本中出现，输出 Markdown 汇总和 JSON 明细。
- -IncludeCatalogDiff 会额外解析 Mod XML Catalog ID，但不会把官方 JSON 还原成完整官方 XML。

.PARAMETER OfficialCommandersRoot
官方合作指挥官 JSON 根目录。默认是仓库内 游戏数据\官方合作指挥官\commanders。

.PARAMETER ModRoot
当前 Mod 根目录。默认是仓库内 合作指挥官版起义狂潮。

.PARAMETER OutputDir
报告输出目录。默认写到 docs\每日进度\<yyyy-MM-dd>-官方指挥官与mod差异对比。

.PARAMETER Commanders
只对比指定指挥官。支持数组，也支持逗号分隔字符串，例如 Abathur,Raynor。

.PARAMETER IncludeCatalogDiff
额外解析 Mod XML Catalog ID，并输出官方 ID 对 Catalog ID 的缺失情况。

.EXAMPLE
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\sc2\compare-official-commanders-vs-mod.ps1

对比官方目录下所有指挥官，并输出默认报告。

.EXAMPLE
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\sc2\compare-official-commanders-vs-mod.ps1 -Commanders Abathur,Raynor

只对比 Abathur 和 Raynor。

.EXAMPLE
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\sc2\compare-official-commanders-vs-mod.ps1 -Commanders Abathur -IncludeCatalogDiff

对 Abathur 额外输出 Mod XML Catalog ID 缺失统计。
#>
param(
    [string]$OfficialCommandersRoot,
    [string]$ModRoot,
    [string]$OutputDir,
    [string[]]$Commanders,
    [switch]$IncludeCatalogDiff
)

$ErrorActionPreference = "Stop"

$scriptRoot = if ($PSScriptRoot) { $PSScriptRoot } else { Split-Path -Parent $MyInvocation.MyCommand.Path }
$nodeScript = Join-Path $scriptRoot "compare-official-commanders-vs-mod.mjs"

if (-not (Test-Path -LiteralPath $nodeScript -PathType Leaf)) {
    throw "Node script not found: $nodeScript"
}

$node = Get-Command node -ErrorAction SilentlyContinue
if (-not $node) {
    throw "Node.js is required to run $nodeScript"
}

$nodeArgs = @($nodeScript)

if (-not [string]::IsNullOrWhiteSpace($OfficialCommandersRoot)) {
    $nodeArgs += @("--official-root", $OfficialCommandersRoot)
}

if (-not [string]::IsNullOrWhiteSpace($ModRoot)) {
    $nodeArgs += @("--mod-root", $ModRoot)
}

if (-not [string]::IsNullOrWhiteSpace($OutputDir)) {
    $nodeArgs += @("--output-dir", $OutputDir)
}

if ($Commanders -and $Commanders.Count -gt 0) {
    $expandedCommanders = @()
    foreach ($commander in $Commanders) {
        $expandedCommanders += @($commander.Split(",") | ForEach-Object { $_.Trim() } | Where-Object { $_ })
    }

    if ($expandedCommanders.Count -gt 0) {
        $nodeArgs += @("--commanders", ($expandedCommanders -join ","))
    }
}

if ($IncludeCatalogDiff) {
    $nodeArgs += "--include-catalog-diff"
}

& $node.Source @nodeArgs
if ($LASTEXITCODE -ne 0) {
    exit $LASTEXITCODE
}
