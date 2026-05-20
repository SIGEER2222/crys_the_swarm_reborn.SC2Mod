param(
    [Parameter(Mandatory = $true)]
    [string]$UnitId,

    [string]$ModRoot,

    [int]$EffectDepth = 3
)

$ErrorActionPreference = "Stop"

$scriptRoot = if ($PSScriptRoot) { $PSScriptRoot } else { Split-Path -Parent $MyInvocation.MyCommand.Path }
if ([string]::IsNullOrWhiteSpace($ModRoot)) {
    $ModRoot = Join-Path $scriptRoot "..\crys_the_swarm_reborn.SC2Mod"
}

$gameDataRoot = Join-Path $ModRoot "Base.SC2Data\GameData"
$stringsPath = Join-Path $ModRoot "zhCN.SC2Data\LocalizedData\GameStrings.txt"

$xmlCache = @{}
$stringsCache = $null

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

function Get-Strings {
    if ($null -eq $stringsCache) {
        $map = @{}
        if (Test-Path $stringsPath) {
            foreach ($line in Get-Content -Encoding UTF8 $stringsPath) {
                if ([string]::IsNullOrWhiteSpace($line)) { continue }
                if ($line.StartsWith("#")) { continue }
                $parts = $line -split "=", 2
                if ($parts.Count -eq 2) {
                    $map[$parts[0]] = $parts[1]
                }
            }
        }
        $script:stringsCache = $map
    }

    return $stringsCache
}

function Get-LocalizedValue {
    param([string]$Key)

    $strings = Get-Strings
    if ($strings.ContainsKey($Key)) {
        return $strings[$Key]
    }
    return $null
}

function Get-NodeById {
    param(
        [string]$FileName,
        [string]$Id
    )

    $xml = Get-CatalogXml $FileName
    return $xml.SelectSingleNode("/Catalog/*[@id='$Id']")
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

function Get-NodeValues {
    param(
        [System.Xml.XmlNode]$Node,
        [string]$ChildName,
        [string]$AttrName = "value"
    )

    $values = @()
    if ($null -eq $Node) {
        return $values
    }

    foreach ($child in $Node.SelectNodes("./$ChildName")) {
        $value = Get-AttrValue $child $AttrName
        if (-not [string]::IsNullOrWhiteSpace($value)) {
            $values += $value
        }
    }

    return $values
}

function Get-UnitRefs {
    param([System.Xml.XmlNode]$UnitNode)

    $result = [ordered]@{
        Abilities = @()
        Behaviors = @()
        Weapons   = @()
        Buttons   = @()
    }

    foreach ($node in $UnitNode.SelectNodes("./AbilArray")) {
        $link = Get-AttrValue $node "Link"
        if (-not [string]::IsNullOrWhiteSpace($link)) {
            $result.Abilities += $link
        }
    }

    foreach ($node in $UnitNode.SelectNodes("./BehaviorArray")) {
        $link = Get-AttrValue $node "Link"
        if (-not [string]::IsNullOrWhiteSpace($link)) {
            $result.Behaviors += $link
        }
    }

    foreach ($node in $UnitNode.SelectNodes("./WeaponArray")) {
        $link = Get-AttrValue $node "Link"
        if (-not [string]::IsNullOrWhiteSpace($link)) {
            $result.Weapons += $link
        }
    }

    foreach ($node in $UnitNode.SelectNodes("./CardLayouts/LayoutButtons")) {
        $face = Get-AttrValue $node "Face"
        $abilCmd = Get-AttrValue $node "AbilCmd"
        $type = Get-AttrValue $node "Type"
        $requirements = Get-AttrValue $node "Requirements"

        if (-not [string]::IsNullOrWhiteSpace($face) -or -not [string]::IsNullOrWhiteSpace($abilCmd)) {
            $result.Buttons += [pscustomobject]@{
                Face         = $face
                AbilCmd      = $abilCmd
                Type         = $type
                Requirements = $requirements
            }
        }
    }

    return $result
}

function Get-AbilitySummary {
    param([string]$Id)

    $node = Get-NodeById "AbilData.xml" $Id
    if ($null -eq $node) {
        return $null
    }

    $effects = @()
    foreach ($effectNode in $node.SelectNodes("./Effect")) {
        $value = Get-AttrValue $effectNode "value"
        if (-not [string]::IsNullOrWhiteSpace($value)) {
            $effects += $value
        }
    }

    $buttons = @()
    foreach ($buttonNode in $node.SelectNodes("./CmdButtonArray")) {
        $buttons += [pscustomobject]@{
            Face         = Get-AttrValue $buttonNode "DefaultButtonFace"
            Requirements = Get-AttrValue $buttonNode "Requirements"
        }
    }

    $costParts = @()
    foreach ($resource in $node.SelectNodes("./Cost/Resource")) {
        $costParts += ("{0}={1}" -f (Get-AttrValue $resource "index"), (Get-AttrValue $resource "value"))
    }
    foreach ($charge in $node.SelectNodes("./Cost/Charge")) {
        $costParts += ("ChargeUse={0}" -f (Get-AttrValue $charge "CountUse"))
    }

    return [pscustomobject]@{
        Id      = $Id
        Type    = $node.Name
        Effects = $effects
        Buttons = $buttons
        Cost    = $costParts
    }
}

function Get-WeaponSummary {
    param([string]$Id)

    $node = Get-NodeById "WeaponData.xml" $Id
    if ($null -eq $node) {
        return $null
    }

    return [pscustomobject]@{
        Id            = $Id
        Type          = $node.Name
        Range         = @(Get-NodeValues $node "Range")
        Period        = @(Get-NodeValues $node "Period")
        Effect        = @(Get-NodeValues $node "Effect")
        DisplayEffect = @(Get-NodeValues $node "DisplayEffect")
    }
}

function Get-BehaviorSummary {
    param([string]$Id)

    $node = Get-NodeById "BehaviorData.xml" $Id
    if ($null -eq $node) {
        return $null
    }

    $parts = @()
    $duration = Get-NodeValues $node "Duration"
    $period = Get-NodeValues $node "Period"
    $requirements = Get-NodeValues $node "Requirements"
    $initialEffect = Get-NodeValues $node "InitialEffect"
    $periodicEffect = Get-NodeValues $node "PeriodicEffect"

    if ($duration.Count -gt 0) { $parts += ("Duration={0}" -f ($duration -join ",")) }
    if ($period.Count -gt 0) { $parts += ("Period={0}" -f ($period -join ",")) }
    if ($requirements.Count -gt 0) { $parts += ("Requirements={0}" -f ($requirements -join ",")) }
    if ($initialEffect.Count -gt 0) { $parts += ("InitialEffect={0}" -f ($initialEffect -join ",")) }
    if ($periodicEffect.Count -gt 0) { $parts += ("PeriodicEffect={0}" -f ($periodicEffect -join ",")) }

    return [pscustomobject]@{
        Id    = $Id
        Type  = $node.Name
        Extra = $parts
    }
}

function Get-EffectSummary {
    param([string]$Id)

    $node = Get-NodeById "EffectData.xml" $Id
    if ($null -eq $node) {
        return $null
    }

    $nextEffects = @()
    $behaviors = @()
    $details = @()

    foreach ($child in $node.ChildNodes) {
        switch ($child.Name) {
            "EffectArray" {
                $value = Get-AttrValue $child "value"
                if ($value) { $nextEffects += $value }
            }
            "Effect" {
                $value = Get-AttrValue $child "value"
                if ($value) { $nextEffects += $value }
            }
            "ImpactEffect" {
                $value = Get-AttrValue $child "value"
                if ($value) { $nextEffects += $value }
            }
            "InitialEffect" {
                $value = Get-AttrValue $child "value"
                if ($value) { $nextEffects += $value }
            }
            "PeriodicEffect" {
                $value = Get-AttrValue $child "value"
                if ($value) { $nextEffects += $value }
            }
            "PeriodicEffectArray" {
                $value = Get-AttrValue $child "value"
                if ($value) { $nextEffects += $value }
            }
            "Behavior" {
                $value = Get-AttrValue $child "value"
                if ($value) { $behaviors += $value }
            }
            "AreaArray" {
                $value = Get-AttrValue $child "Effect"
                if ($value) { $nextEffects += $value }
            }
            "Amount" {
                $value = Get-AttrValue $child "value"
                if ($value) { $details += ("Amount={0}" -f $value) }
            }
            "Range" {
                $value = Get-AttrValue $child "value"
                if ($value) { $details += ("Range={0}" -f $value) }
            }
        }
    }

    foreach ($bonus in $node.SelectNodes("./AttributeBonus")) {
        $details += ("Attr[{0}]={1}" -f (Get-AttrValue $bonus "index"), (Get-AttrValue $bonus "value"))
    }

    return [pscustomobject]@{
        Id          = $Id
        Type        = $node.Name
        Details     = $details
        Behaviors   = $behaviors
        NextEffects = $nextEffects
    }
}

function Show-EffectTree {
    param(
        [string[]]$EffectIds,
        [int]$MaxDepth
    )

    $queue = New-Object System.Collections.Generic.Queue[object]
    $visited = New-Object System.Collections.Generic.HashSet[string]

    foreach ($id in $EffectIds | Sort-Object -Unique) {
        if (-not [string]::IsNullOrWhiteSpace($id)) {
            $queue.Enqueue([pscustomobject]@{ Id = $id; Depth = 0 })
        }
    }

    while ($queue.Count -gt 0) {
        $item = $queue.Dequeue()
        $id = $item.Id
        $depth = $item.Depth

        if ($visited.Contains($id)) { continue }
        $visited.Add($id) | Out-Null

        $summary = Get-EffectSummary $id
        if ($null -eq $summary) { continue }

        $indent = ("  " * $depth)
        $detailText = if ($summary.Details.Count -gt 0) { " | " + ($summary.Details -join ", ") } else { "" }
        Write-Output ("{0}- {1} [{2}]{3}" -f $indent, $summary.Id, $summary.Type, $detailText)

        foreach ($behaviorId in $summary.Behaviors | Sort-Object -Unique) {
            $behavior = Get-BehaviorSummary $behaviorId
            if ($null -ne $behavior) {
                $extra = if ($behavior.Extra.Count -gt 0) { " | " + ($behavior.Extra -join ", ") } else { "" }
                Write-Output ("{0}  -> Behavior {1} [{2}]{3}" -f $indent, $behavior.Id, $behavior.Type, $extra)
            }
            else {
                Write-Output ("{0}  -> Behavior {1}" -f $indent, $behaviorId)
            }
        }

        if ($depth -ge $MaxDepth) { continue }

        foreach ($nextId in $summary.NextEffects | Sort-Object -Unique) {
            if (-not [string]::IsNullOrWhiteSpace($nextId)) {
                $queue.Enqueue([pscustomobject]@{ Id = $nextId; Depth = $depth + 1 })
            }
        }
    }
}

$unitNode = Get-NodeById "UnitData.xml" $UnitId
if ($null -eq $unitNode) {
    throw "Unit not found: $UnitId"
}

$unitName = Get-LocalizedValue ("Unit/Name/{0}" -f $UnitId)
$unitSubtitle = Get-LocalizedValue ("UnitSubtitle/{0}" -f $UnitId)
$unitRefs = Get-UnitRefs $unitNode

Write-Output ("Unit: {0}" -f $UnitId)
if ($unitName) {
    Write-Output ("Name: {0}" -f $unitName)
}
if ($unitSubtitle) {
    Write-Output ("Subtitle: {0}" -f $unitSubtitle)
}
Write-Output "Note: this script shows explicit refs on the current unit node. Inherited refs may live on parent data objects."
Write-Output ""

Write-Output "Abilities:"
$abilityList = $unitRefs.Abilities | Sort-Object -Unique
if ($abilityList.Count -eq 0) {
    Write-Output "- <none on this override node>"
}
foreach ($abilityId in $abilityList) {
    $summary = Get-AbilitySummary $abilityId
    if ($null -eq $summary) {
        Write-Output ("- {0}" -f $abilityId)
        continue
    }

    $costText = if ($summary.Cost.Count -gt 0) { " | Cost: " + ($summary.Cost -join ", ") } else { "" }
    Write-Output ("- {0} [{1}]{2}" -f $summary.Id, $summary.Type, $costText)

    foreach ($button in $summary.Buttons) {
        $buttonName = if ($button.Face) { Get-LocalizedValue ("Button/Name/{0}" -f $button.Face) } else { $null }
        $buttonText = if ($buttonName) { "{0} ({1})" -f $button.Face, $buttonName } else { $button.Face }
        $reqText = if ($button.Requirements) { " | Requirements: $($button.Requirements)" } else { "" }
        if ($buttonText) {
            Write-Output ("  -> Button {0}{1}" -f $buttonText, $reqText)
        }
    }

    foreach ($effectId in $summary.Effects) {
        Write-Output ("  -> Effect {0}" -f $effectId)
    }
}
Write-Output ""

Write-Output "Weapons:"
$rootEffects = @()
$weaponList = $unitRefs.Weapons | Sort-Object -Unique
if ($weaponList.Count -eq 0) {
    Write-Output "- <none on this override node>"
}
foreach ($weaponId in $weaponList) {
    $summary = Get-WeaponSummary $weaponId
    if ($null -eq $summary) {
        Write-Output ("- {0}" -f $weaponId)
        continue
    }

    $extras = @()
    if ($summary.Range.Count -gt 0) { $extras += ("Range={0}" -f ($summary.Range -join ",")) }
    if ($summary.Period.Count -gt 0) { $extras += ("Period={0}" -f ($summary.Period -join ",")) }
    $extraText = if ($extras.Count -gt 0) { " | " + ($extras -join ", ") } else { "" }

    Write-Output ("- {0} [{1}]{2}" -f $summary.Id, $summary.Type, $extraText)
    foreach ($displayEffectId in $summary.DisplayEffect) {
        Write-Output ("  -> DisplayEffect {0}" -f $displayEffectId)
    }
    foreach ($effectId in $summary.Effect) {
        Write-Output ("  -> Effect {0}" -f $effectId)
        $rootEffects += $effectId
    }
}
Write-Output ""

Write-Output "Behaviors:"
$behaviorList = $unitRefs.Behaviors | Sort-Object -Unique
if ($behaviorList.Count -eq 0) {
    Write-Output "- <none on this override node>"
}
foreach ($behaviorId in $behaviorList) {
    $summary = Get-BehaviorSummary $behaviorId
    if ($null -eq $summary) {
        Write-Output ("- {0}" -f $behaviorId)
        continue
    }

    $name = Get-LocalizedValue ("Behavior/Name/{0}" -f $behaviorId)
    $extra = if ($summary.Extra.Count -gt 0) { " | " + ($summary.Extra -join ", ") } else { "" }
    if ($name) {
        Write-Output ("- {0} ({1}) [{2}]{3}" -f $summary.Id, $name, $summary.Type, $extra)
    }
    else {
        Write-Output ("- {0} [{1}]{2}" -f $summary.Id, $summary.Type, $extra)
    }
}
Write-Output ""

Write-Output "Buttons:"
if ($unitRefs.Buttons.Count -eq 0) {
    Write-Output "- <none>"
}
foreach ($button in $unitRefs.Buttons) {
    $faceName = if ($button.Face) { Get-LocalizedValue ("Button/Name/{0}" -f $button.Face) } else { $null }
    $left = if ($faceName) { "{0} ({1})" -f $button.Face, $faceName } elseif ($button.Face) { $button.Face } else { "<empty>" }
    $right = @()
    if ($button.Type) { $right += $button.Type }
    if ($button.AbilCmd) { $right += $button.AbilCmd }
    if ($button.Requirements) { $right += ("Requirements={0}" -f $button.Requirements) }
    if ($right.Count -gt 0) {
        Write-Output ("- {0} | {1}" -f $left, ($right -join " | "))
    }
    else {
        Write-Output ("- {0}" -f $left)
    }
}
Write-Output ""

if ($rootEffects.Count -gt 0) {
    Write-Output ("Effect Tree (Depth={0}):" -f $EffectDepth)
    Show-EffectTree -EffectIds $rootEffects -MaxDepth $EffectDepth
}
