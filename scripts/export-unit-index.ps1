param(
    [string]$ModRoot,
    [string]$OutputPath
)

$ErrorActionPreference = "Stop"

$scriptRoot = if ($PSScriptRoot) { $PSScriptRoot } else { Split-Path -Parent $MyInvocation.MyCommand.Path }
if ([string]::IsNullOrWhiteSpace($ModRoot)) {
    $ModRoot = Join-Path $scriptRoot "..\合作指挥官版起义狂潮\Mods\XM\XMFinal.SC2Mod"
}
if ([string]::IsNullOrWhiteSpace($OutputPath)) {
    $OutputPath = Join-Path $scriptRoot "..\references\unit-index.tsv"
}

$unitDataPath = Join-Path $ModRoot "Base.SC2Data\GameData\UnitData.xml"
$stringsPath = Join-Path $ModRoot "zhCN.SC2Data\LocalizedData\GameStrings.txt"

if (-not (Test-Path $unitDataPath)) {
    throw "UnitData not found: $unitDataPath"
}

[xml]$unitXml = Get-Content -Raw -Encoding UTF8 $unitDataPath

$strings = @{}
if (Test-Path $stringsPath) {
    foreach ($line in Get-Content -Encoding UTF8 $stringsPath) {
        if ([string]::IsNullOrWhiteSpace($line)) { continue }
        if ($line.StartsWith("#")) { continue }
        $parts = $line -split "=", 2
        if ($parts.Count -eq 2) {
            $strings[$parts[0]] = $parts[1]
        }
    }
}

$rows = New-Object System.Collections.Generic.List[string]
$rows.Add("UnitId`tNameZh`tSubtitle")

$units = $unitXml.SelectNodes("/Catalog/CUnit") | Sort-Object { $_.Attributes["id"].Value }
foreach ($unit in $units) {
    $id = $unit.Attributes["id"].Value
    $nameKey = "Unit/Name/$id"
    $subtitleKey = "UnitSubtitle/$id"
    $name = if ($strings.ContainsKey($nameKey)) { $strings[$nameKey] } else { "" }
    $subtitle = if ($strings.ContainsKey($subtitleKey)) { $strings[$subtitleKey] } else { "" }

    $rows.Add(("{0}`t{1}`t{2}" -f $id, $name, $subtitle))
}

$rows | Set-Content -Encoding UTF8 $OutputPath
Write-Host "Exported unit index to $OutputPath"
