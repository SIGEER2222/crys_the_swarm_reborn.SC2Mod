param(
    [string]$ModRoot,
    [string]$ReportPath,
    [int]$MaxDetailRows = 250
)

$ErrorActionPreference = "Stop"

$scriptRoot = if ($PSScriptRoot) { $PSScriptRoot } else { Split-Path -Parent $MyInvocation.MyCommand.Path }
if ([string]::IsNullOrWhiteSpace($ModRoot)) {
    $ModRoot = Join-Path $scriptRoot "..\合作指挥官版起义狂潮\Mods\XM\XMFinal.SC2Mod"
}
if ([string]::IsNullOrWhiteSpace($ReportPath)) {
    $ReportPath = Join-Path $scriptRoot "..\references\latest-validate-report.md"
}

$gameDataRoot = Join-Path $ModRoot "Base.SC2Data\GameData"
$xmlCache = @{}

function Get-CatalogXml {
    param([string]$FileName)

    if (-not $xmlCache.ContainsKey($FileName)) {
        $path = Join-Path $gameDataRoot $FileName
        if (-not (Test-Path $path)) {
            return $null
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

function Get-CatalogNodeId {
    param([System.Xml.XmlNode]$Node)

    $id = Get-AttrValue $Node "id"
    if ($id) { return $id }
    return Get-AttrValue $Node "default"
}

function New-IdSet {
    param([string]$FileName)

    $set = New-Object System.Collections.Generic.HashSet[string]
    $xml = Get-CatalogXml $FileName
    if ($null -eq $xml) {
        return $set
    }
    foreach ($node in $xml.SelectNodes("/Catalog/*[@id]")) {
        $id = Get-CatalogNodeId $node
        if ($id) { $set.Add($id) | Out-Null }
    }
    foreach ($node in $xml.SelectNodes("/Catalog/*[@default]")) {
        $id = Get-CatalogNodeId $node
        if ($id) { $set.Add($id) | Out-Null }
    }
    return $set
}

$catalogIds = @{
    ability         = New-IdSet "AbilData.xml"
    behavior        = New-IdSet "BehaviorData.xml"
    button          = New-IdSet "ButtonData.xml"
    effect          = New-IdSet "EffectData.xml"
    requirement     = New-IdSet "RequirementData.xml"
    requirementNode = New-IdSet "RequirementNodeData.xml"
    unit            = New-IdSet "UnitData.xml"
    validator       = New-IdSet "ValidatorData.xml"
    upgrade         = New-IdSet "UpgradeData.xml"
    weapon          = New-IdSet "WeaponData.xml"
}

$problems = New-Object System.Collections.Generic.List[object]

function Add-Problem {
    param(
        [string]$Severity,
        [string]$SourceFile,
        [string]$SourceId,
        [string]$RefType,
        [string]$TargetCatalog,
        [string]$TargetId,
        [string]$Message
    )

    $problems.Add([pscustomobject]@{
        severity      = $Severity
        sourceFile    = $SourceFile
        sourceId      = $SourceId
        refType       = $RefType
        targetCatalog = $TargetCatalog
        targetId      = $TargetId
        message       = $Message
    })
}

function Test-Ref {
    param(
        [string]$SourceFile,
        [string]$SourceId,
        [string]$RefType,
        [string]$TargetCatalog,
        [string]$TargetId
    )

    if ([string]::IsNullOrWhiteSpace($TargetId)) {
        return
    }

    $targetSet = $catalogIds[$TargetCatalog]
    if ($null -eq $targetSet) {
        Add-Problem "warning" $SourceFile $SourceId $RefType $TargetCatalog $TargetId "Target catalog missing in local catalog set."
        return
    }

    if (-not $targetSet.Contains($TargetId)) {
        Add-Problem "warning" $SourceFile $SourceId $RefType $TargetCatalog $TargetId "Not found in local work copy. Could still come from dependencies."
    }
}

function Validate-UnitRefs {
    $xml = Get-CatalogXml "UnitData.xml"
    if ($null -eq $xml) { return }
    foreach ($node in $xml.SelectNodes("/Catalog/CUnit[@id]")) {
        $id = Get-CatalogNodeId $node

        foreach ($child in $node.SelectNodes("./AbilArray")) {
            Test-Ref "UnitData.xml" $id "AbilArray" "ability" (Get-AttrValue $child "Link")
        }
        foreach ($child in $node.SelectNodes("./BehaviorArray")) {
            Test-Ref "UnitData.xml" $id "BehaviorArray" "behavior" (Get-AttrValue $child "Link")
        }
        foreach ($child in $node.SelectNodes("./WeaponArray")) {
            Test-Ref "UnitData.xml" $id "WeaponArray" "weapon" (Get-AttrValue $child "Link")
        }
        foreach ($child in $node.SelectNodes("./CardLayouts/LayoutButtons")) {
            Test-Ref "UnitData.xml" $id "LayoutButtons.Face" "button" (Get-AttrValue $child "Face")
            Test-Ref "UnitData.xml" $id "LayoutButtons.Requirements" "requirement" (Get-AttrValue $child "Requirements")
        }
    }
}

function Validate-AbilityRefs {
    $xml = Get-CatalogXml "AbilData.xml"
    if ($null -eq $xml) { return }
    foreach ($node in $xml.SelectNodes("/Catalog/*[@id]")) {
        $id = Get-CatalogNodeId $node
        foreach ($child in $node.SelectNodes("./Effect")) {
            Test-Ref "AbilData.xml" $id "Effect" "effect" (Get-AttrValue $child "value")
        }
        foreach ($child in $node.SelectNodes("./CmdButtonArray")) {
            Test-Ref "AbilData.xml" $id "CmdButtonArray.DefaultButtonFace" "button" (Get-AttrValue $child "DefaultButtonFace")
            Test-Ref "AbilData.xml" $id "CmdButtonArray.Requirements" "requirement" (Get-AttrValue $child "Requirements")
        }
    }
}

function Validate-EffectRefs {
    $xml = Get-CatalogXml "EffectData.xml"
    if ($null -eq $xml) { return }
    foreach ($node in $xml.SelectNodes("/Catalog/*[@id]")) {
        $id = Get-CatalogNodeId $node
        foreach ($xpath in @("./Effect", "./EffectArray", "./ImpactEffect", "./InitialEffect", "./PeriodicEffect", "./PeriodicEffectArray")) {
            foreach ($child in $node.SelectNodes($xpath)) {
                Test-Ref "EffectData.xml" $id $xpath "effect" (Get-AttrValue $child "value")
            }
        }
        foreach ($child in $node.SelectNodes("./AreaArray")) {
            Test-Ref "EffectData.xml" $id "AreaArray.Effect" "effect" (Get-AttrValue $child "Effect")
        }
        foreach ($child in $node.SelectNodes("./Behavior | ./BehaviorLink")) {
            Test-Ref "EffectData.xml" $id $child.Name "behavior" (Get-AttrValue $child "value")
        }
        foreach ($child in $node.SelectNodes("./ValidatorArray | ./PeriodicValidator")) {
            Test-Ref "EffectData.xml" $id $child.Name "validator" (Get-AttrValue $child "value")
        }
    }
}

function Validate-BehaviorRefs {
    $xml = Get-CatalogXml "BehaviorData.xml"
    if ($null -eq $xml) { return }
    foreach ($node in $xml.SelectNodes("/Catalog/*[@id]")) {
        $id = Get-CatalogNodeId $node
        foreach ($child in $node.SelectNodes("./InitialEffect | ./PeriodicEffect | ./ExpireEffect | ./FinalEffect")) {
            Test-Ref "BehaviorData.xml" $id $child.Name "effect" (Get-AttrValue $child "value")
        }
        foreach ($child in $node.SelectNodes("./Requirements")) {
            Test-Ref "BehaviorData.xml" $id "Requirements" "requirement" (Get-AttrValue $child "value")
        }
        foreach ($child in $node.SelectNodes("./DisableValidatorArray | ./RemoveValidatorArray | ./ValidatorArray")) {
            Test-Ref "BehaviorData.xml" $id $child.Name "validator" (Get-AttrValue $child "value")
        }
    }
}

function Validate-WeaponRefs {
    $xml = Get-CatalogXml "WeaponData.xml"
    if ($null -eq $xml) { return }
    foreach ($node in $xml.SelectNodes("/Catalog/*[@id]")) {
        $id = Get-CatalogNodeId $node
        foreach ($child in $node.SelectNodes("./Effect | ./DisplayEffect")) {
            Test-Ref "WeaponData.xml" $id $child.Name "effect" (Get-AttrValue $child "value")
        }
    }
}

function Validate-RequirementRefs {
    $xml = Get-CatalogXml "RequirementData.xml"
    if ($null -eq $xml) { return }
    foreach ($node in $xml.SelectNodes("/Catalog/CRequirement[@id]")) {
        $id = Get-CatalogNodeId $node
        foreach ($child in $node.SelectNodes("./NodeArray")) {
            Test-Ref "RequirementData.xml" $id "NodeArray.Link" "requirementNode" (Get-AttrValue $child "Link")
        }
    }
}

Validate-UnitRefs
Validate-AbilityRefs
Validate-EffectRefs
Validate-BehaviorRefs
Validate-WeaponRefs
Validate-RequirementRefs

$reportLines = New-Object System.Collections.Generic.List[string]
$reportLines.Add("# Common Reference Validation Report")
$reportLines.Add("")
$reportLines.Add(("Generated at: {0}" -f (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")))
$reportLines.Add(("Mod root: {0}" -f ([System.IO.Path]::GetFullPath($ModRoot))))
$reportLines.Add("")
$reportLines.Add(("Local unresolved refs: **{0}**" -f $problems.Count))
$reportLines.Add("")
$reportLines.Add("Note: this validator only checks objects present in the current work copy.")
$reportLines.Add("Refs that are satisfied by Blizzard or external dependencies may still appear here.")
$reportLines.Add("")

if ($problems.Count -eq 0) {
    $reportLines.Add("No local unresolved refs found in the checked categories.")
}
else {
    $reportLines.Add("## Summary")
    $reportLines.Add("")
    $reportLines.Add("| File | Ref Type | Count |")
    $reportLines.Add("|---|---|---|")
    foreach ($group in ($problems | Group-Object sourceFile, refType | Sort-Object Count -Descending)) {
        $parts = $group.Name -split ", "
        $fileName = $parts[0]
        $refTypeName = if ($parts.Count -gt 1) { $parts[1] } else { "" }
        $reportLines.Add(("| {0} | {1} | {2} |" -f $fileName, $refTypeName, $group.Count))
    }
    $reportLines.Add("")
    $reportLines.Add(("## Details (first {0})" -f $MaxDetailRows))
    $reportLines.Add("")
    $reportLines.Add("| Severity | File | Source ID | Ref Type | Target | Message |")
    $reportLines.Add("|---|---|---|---|---|---|")
    $shown = 0
    foreach ($problem in $problems | Sort-Object sourceFile, sourceId, refType, targetId) {
        $target = "{0}:{1}" -f $problem.targetCatalog, $problem.targetId
        $reportLines.Add(("| {0} | {1} | {2} | {3} | {4} | {5} |" -f $problem.severity, $problem.sourceFile, $problem.sourceId, $problem.refType, $target, $problem.message))
        $shown++
        if ($shown -ge $MaxDetailRows) {
            break
        }
    }
    if ($problems.Count -gt $MaxDetailRows) {
        $reportLines.Add("")
        $reportLines.Add(("Omitted rows: {0}" -f ($problems.Count - $MaxDetailRows)))
    }
}

$reportDir = Split-Path -Parent $ReportPath
New-Item -ItemType Directory -Force -Path $reportDir | Out-Null
$reportLines | Set-Content -Encoding UTF8 $ReportPath

Write-Host "Validation completed."
Write-Host "Problems:" $problems.Count
Write-Host "Report:" ([System.IO.Path]::GetFullPath($ReportPath))
