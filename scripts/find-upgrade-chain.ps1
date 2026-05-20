param(
    [Parameter(Mandatory = $true)]
    [string]$Id,

    [string]$ModRoot,

    [int]$MaxHitsPerFile = 20
)

$ErrorActionPreference = "Stop"

$scriptRoot = if ($PSScriptRoot) { $PSScriptRoot } else { Split-Path -Parent $MyInvocation.MyCommand.Path }
if ([string]::IsNullOrWhiteSpace($ModRoot)) {
    $ModRoot = Join-Path $scriptRoot "..\crys_the_swarm_reborn.SC2Mod"
}

$gameDataRoot = Join-Path $ModRoot "Base.SC2Data\GameData"
$stringsPath = Join-Path $ModRoot "zhCN.SC2Data\LocalizedData\GameStrings.txt"

$catalogFiles = @(
    "AbilData.xml",
    "BehaviorData.xml",
    "ButtonData.xml",
    "EffectData.xml",
    "RequirementData.xml",
    "RequirementNodeData.xml",
    "UnitData.xml",
    "ValidatorData.xml",
    "WeaponData.xml"
)

$xmlCache = @{}

function Get-CatalogXml {
    param([string]$FileName)

    if (-not $xmlCache.ContainsKey($FileName)) {
        $path = Join-Path $gameDataRoot $FileName
        if (-not (Test-Path $path)) {
            throw "Catalog file not found: $path"
        }
        $xmlCache[$FileName] = [xml](Get-Content -Raw -Encoding UTF8 $path)
    }

    return $xmlCache[$FileName]
}

function Get-AttrValue {
    param(
        [System.Xml.XmlNode]$Node,
        [string]$Name
    )

    if ($null -eq $Node -or $null -eq $Node.Attributes) {
        return $null
    }

    $attr = $Node.Attributes[$Name]
    if ($null -eq $attr) {
        return $null
    }

    return $attr.Value
}

function Get-MainNodeSummary {
    param([System.Xml.XmlNode]$Node)

    $parts = @()

    foreach ($childName in @(
        "Effect", "Behavior", "BehaviorLink", "ImpactEffect", "InitialEffect",
        "PeriodicEffect", "Requirements", "DefaultButtonFace", "Range", "Period", "Amount"
    )) {
        foreach ($child in $Node.SelectNodes("./$childName")) {
            $value = Get-AttrValue $child "value"
            if (-not [string]::IsNullOrWhiteSpace($value)) {
                $parts += ("{0}={1}" -f $childName, $value)
            }
        }
    }

    foreach ($arrayName in @("EffectArray", "PeriodicEffectArray", "AbilArray", "BehaviorArray", "WeaponArray")) {
        $values = @()
        foreach ($child in $Node.SelectNodes("./$arrayName")) {
            $value = Get-AttrValue $child "value"
            if (-not [string]::IsNullOrWhiteSpace($value)) {
                $values += $value
            }
            $link = Get-AttrValue $child "Link"
            if (-not [string]::IsNullOrWhiteSpace($link)) {
                $values += $link
            }
        }
        if ($values.Count -gt 0) {
            $parts += ("{0}={1}" -f $arrayName, ($values -join ","))
        }
    }

    return $parts
}

Write-Output ("Search ID: {0}" -f $Id)
Write-Output ""
Write-Output "=== Exact Objects ==="

$exactFound = $false
foreach ($file in $catalogFiles) {
    $xml = Get-CatalogXml $file
    $nodes = $xml.SelectNodes("/Catalog/*[@id='$Id']")
    foreach ($node in $nodes) {
        $exactFound = $true
        $summary = Get-MainNodeSummary $node
        Write-Output ("[{0}] {1} id={2}" -f $file, $node.Name, $Id)
        if ($summary.Count -gt 0) {
            foreach ($line in $summary) {
                Write-Output ("  - {0}" -f $line)
            }
        }
    }
}

if (-not $exactFound) {
    Write-Output "No exact catalog objects found."
}

Write-Output ""
Write-Output "=== Text References ==="

$searchPaths = @((Get-ChildItem -Path $gameDataRoot -Filter *.xml | ForEach-Object { $_.FullName }))
if (Test-Path $stringsPath) {
    $searchPaths += $stringsPath
}

$matches = Select-String -Path $searchPaths -Pattern $Id -SimpleMatch

if (-not $matches) {
    Write-Output "No text references found."
    exit 0
}

$grouped = $matches | Group-Object Path | Sort-Object Name

foreach ($group in $grouped) {
    Write-Output ("[{0}]" -f (Split-Path $group.Name -Leaf))
    $shown = 0
    foreach ($match in $group.Group | Sort-Object LineNumber) {
        Write-Output ("  {0}: {1}" -f $match.LineNumber, $match.Line.Trim())
        $shown++
        if ($shown -ge $MaxHitsPerFile) {
            $remaining = $group.Count - $shown
            if ($remaining -gt 0) {
                Write-Output ("  ... {0} more hits omitted" -f $remaining)
            }
            break
        }
    }
}
