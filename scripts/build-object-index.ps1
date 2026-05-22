param(
    [string]$ModRoot,
    [string]$OutputDir
)

$ErrorActionPreference = "Stop"

$scriptRoot = if ($PSScriptRoot) { $PSScriptRoot } else { Split-Path -Parent $MyInvocation.MyCommand.Path }
if ([string]::IsNullOrWhiteSpace($ModRoot)) {
    $ModRoot = Join-Path $scriptRoot "..\合作指挥官版起义狂潮\Mods\XM\XMFinal.SC2Mod"
}
if ([string]::IsNullOrWhiteSpace($OutputDir)) {
    $OutputDir = Join-Path $scriptRoot "..\references\index"
}

$gameDataRoot = Join-Path $ModRoot "Base.SC2Data\GameData"
$stringsPath = Join-Path $ModRoot "zhCN.SC2Data\LocalizedData\GameStrings.txt"

$catalogPlan = @(
    @{ File = "UnitData.xml"; Node = "CUnit"; Out = "units-index.json"; Kind = "unit" }
    @{ File = "AbilData.xml"; Node = "*"; Out = "abilities-index.json"; Kind = "ability" }
    @{ File = "EffectData.xml"; Node = "*"; Out = "effects-index.json"; Kind = "effect" }
    @{ File = "BehaviorData.xml"; Node = "*"; Out = "behaviors-index.json"; Kind = "behavior" }
    @{ File = "WeaponData.xml"; Node = "*"; Out = "weapons-index.json"; Kind = "weapon" }
    @{ File = "ButtonData.xml"; Node = "CButton"; Out = "buttons-index.json"; Kind = "button" }
    @{ File = "RequirementData.xml"; Node = "CRequirement"; Out = "requirements-index.json"; Kind = "requirement" }
    @{ File = "ValidatorData.xml"; Node = "*"; Out = "validators-index.json"; Kind = "validator" }
    @{ File = "UpgradeData.xml"; Node = "CUpgrade"; Out = "upgrades-index.json"; Kind = "upgrade" }
)

$textTablePlan = @(
    @{ Locale = "zhCN"; RelativePath = "zhCN.SC2Data\LocalizedData\GameStrings.txt"; Out = "zhCN-game-strings.json"; Table = "GameStrings" }
    @{ Locale = "zhCN"; RelativePath = "zhCN.SC2Data\LocalizedData\ObjectStrings.txt"; Out = "zhCN-object-strings.json"; Table = "ObjectStrings" }
    @{ Locale = "zhCN"; RelativePath = "zhCN.SC2Data\LocalizedData\TriggerStrings.txt"; Out = "zhCN-trigger-strings.json"; Table = "TriggerStrings" }
    @{ Locale = "enUS"; RelativePath = "enUS.SC2Data\LocalizedData\GameStrings.txt"; Out = "enUS-game-strings.json"; Table = "GameStrings" }
    @{ Locale = "enUS"; RelativePath = "enUS.SC2Data\LocalizedData\ObjectStrings.txt"; Out = "enUS-object-strings.json"; Table = "ObjectStrings" }
    @{ Locale = "enUS"; RelativePath = "enUS.SC2Data\LocalizedData\TriggerStrings.txt"; Out = "enUS-trigger-strings.json"; Table = "TriggerStrings" }
)

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

function Read-KeyValueEntries {
    param([string]$Path)

    $entries = New-Object System.Collections.Generic.List[object]
    if (-not (Test-Path $Path)) {
        return $entries
    }

    foreach ($line in Get-Content -Encoding UTF8 $Path) {
        if ([string]::IsNullOrWhiteSpace($line)) { continue }
        if ($line.StartsWith("#")) { continue }

        $parts = $line -split "=", 2
        if ($parts.Count -ne 2) { continue }

        $entries.Add([pscustomobject]@{
            key   = $parts[0]
            value = $parts[1]
        })
    }

    return $entries
}

function Get-Strings {
    if ($null -eq $stringsCache) {
        $map = @{}
        foreach ($entry in Read-KeyValueEntries -Path $stringsPath) {
            $map[$entry.key] = $entry.value
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

function Resolve-UpgradeReference {
    param([string]$Reference)

    if ([string]::IsNullOrWhiteSpace($Reference)) {
        return $null
    }

    $parts = $Reference -split ","
    if ($parts.Count -lt 2) {
        return $null
    }

    $catalogMap = @{
        Abil        = "ability"
        Ability     = "ability"
        Behavior    = "behavior"
        Button      = "button"
        Effect      = "effect"
        Requirement = "requirement"
        Unit        = "unit"
        Upgrade     = "upgrade"
        Validator   = "validator"
        Weapon      = "weapon"
    }

    $rawType = $parts[0].Trim()
    $id = $parts[1].Trim()
    if ([string]::IsNullOrWhiteSpace($id)) {
        return $null
    }
    if (-not $catalogMap.ContainsKey($rawType)) {
        return $null
    }

    return [pscustomobject]@{
        catalog = $catalogMap[$rawType]
        id      = $id
        rawType = $rawType
    }
}

function Add-Reference {
    param(
        [System.Collections.Generic.List[object]]$RefList,
        [string]$FromCatalog,
        [string]$FromId,
        [string]$RefType,
        [string]$ToCatalog,
        [string]$ToId,
        [string]$SourceFile
    )

    if ([string]::IsNullOrWhiteSpace($ToId)) {
        return
    }

    $RefList.Add([pscustomobject]@{
        fromCatalog = $FromCatalog
        fromId      = $FromId
        refType     = $RefType
        toCatalog   = $ToCatalog
        toId        = $ToId
        sourceFile  = $SourceFile
    })
}

function New-LookupBucket {
    return @{
        definitions = New-Object System.Collections.Generic.List[object]
        incomingRefs = New-Object System.Collections.Generic.List[object]
        outgoingRefs = New-Object System.Collections.Generic.List[object]
        localizations = New-Object System.Collections.Generic.List[object]
    }
}

function Ensure-LookupBucket {
    param(
        [hashtable]$LookupMap,
        [string]$Id
    )

    if ([string]::IsNullOrWhiteSpace($Id)) {
        return $null
    }

    if (-not $LookupMap.ContainsKey($Id)) {
        $LookupMap[$Id] = New-LookupBucket
    }

    return $LookupMap[$Id]
}

function Add-LookupEntry {
    param(
        [hashtable]$LookupMap,
        [string]$Id,
        [string]$BucketName,
        [object]$Entry
    )

    $bucket = Ensure-LookupBucket -LookupMap $LookupMap -Id $Id
    if ($null -eq $bucket) {
        return
    }

    $bucket[$BucketName].Add($Entry)
}

function Get-ObjectPropertyValue {
    param(
        [object]$InputObject,
        [string]$Name
    )

    $property = $InputObject.PSObject.Properties[$Name]
    if ($null -eq $property) {
        return $null
    }

    return $property.Value
}

function Get-NodeSnapshot {
    param(
        [System.Xml.XmlNode]$Node,
        [string]$Kind,
        [System.Collections.Generic.List[object]]$RefList,
        [string]$SourceFile
    )

    $id = Get-AttrValue $Node "id"
    $result = [ordered]@{
        id   = $id
        type = $Node.Name
    }

    switch ($Kind) {
        "unit" {
            $abilities = @()
            foreach ($child in $Node.SelectNodes("./AbilArray")) {
                $link = Get-AttrValue $child "Link"
                if ($link) {
                    $abilities += $link
                    Add-Reference $RefList "unit" $id "abilArray" "ability" $link $SourceFile
                }
            }

            $behaviors = @()
            foreach ($child in $Node.SelectNodes("./BehaviorArray")) {
                $link = Get-AttrValue $child "Link"
                if ($link) {
                    $behaviors += $link
                    Add-Reference $RefList "unit" $id "behaviorArray" "behavior" $link $SourceFile
                }
            }

            $weapons = @()
            foreach ($child in $Node.SelectNodes("./WeaponArray")) {
                $link = Get-AttrValue $child "Link"
                if ($link) {
                    $weapons += $link
                    Add-Reference $RefList "unit" $id "weaponArray" "weapon" $link $SourceFile
                }
            }

            $buttons = @()
            foreach ($child in $Node.SelectNodes("./CardLayouts/LayoutButtons")) {
                $face = Get-AttrValue $child "Face"
                $abilCmd = Get-AttrValue $child "AbilCmd"
                $requirements = Get-AttrValue $child "Requirements"
                $buttons += [ordered]@{
                    face         = $face
                    abilCmd      = $abilCmd
                    type         = Get-AttrValue $child "Type"
                    requirements = $requirements
                }

                if ($face) {
                    Add-Reference $RefList "unit" $id "layoutFace" "button" $face $SourceFile
                }
                if ($requirements) {
                    Add-Reference $RefList "unit" $id "layoutRequirement" "requirement" $requirements $SourceFile
                }
            }

            $result.nameZh = Get-LocalizedValue ("Unit/Name/{0}" -f $id)
            $result.subtitleZh = Get-LocalizedValue ("UnitSubtitle/{0}" -f $id)
            $result.abilities = $abilities
            $result.behaviors = $behaviors
            $result.weapons = $weapons
            $result.buttons = $buttons
        }
        "ability" {
            $effects = @()
            foreach ($child in $Node.SelectNodes("./Effect")) {
                $value = Get-AttrValue $child "value"
                if ($value) {
                    $effects += $value
                    Add-Reference $RefList "ability" $id "effect" "effect" $value $SourceFile
                }
            }

            $cmdButtons = @()
            foreach ($child in $Node.SelectNodes("./CmdButtonArray")) {
                $face = Get-AttrValue $child "DefaultButtonFace"
                $requirements = Get-AttrValue $child "Requirements"
                $cmdButtons += [ordered]@{
                    face         = $face
                    requirements = $requirements
                }

                if ($face) {
                    Add-Reference $RefList "ability" $id "defaultButtonFace" "button" $face $SourceFile
                }
                if ($requirements) {
                    Add-Reference $RefList "ability" $id "buttonRequirement" "requirement" $requirements $SourceFile
                }
            }

            $result.effects = $effects
            $result.buttons = $cmdButtons
            $result.nameZh = Get-LocalizedValue ("Abil/Name/{0}" -f $id)
        }
        "effect" {
            $nextEffects = @()
            foreach ($path in @(
                "./Effect", "./EffectArray", "./ImpactEffect", "./InitialEffect",
                "./PeriodicEffect", "./PeriodicEffectArray", "./AreaArray"
            )) {
                foreach ($child in $Node.SelectNodes($path)) {
                    $value = Get-AttrValue $child "value"
                    if (-not $value) {
                        $value = Get-AttrValue $child "Effect"
                    }
                    if ($value) {
                        $nextEffects += $value
                        Add-Reference $RefList "effect" $id "effectRef" "effect" $value $SourceFile
                    }
                }
            }

            $behaviors = @()
            foreach ($child in $Node.SelectNodes("./Behavior | ./BehaviorLink")) {
                $value = Get-AttrValue $child "value"
                if ($value) {
                    $behaviors += $value
                    Add-Reference $RefList "effect" $id "behaviorRef" "behavior" $value $SourceFile
                }
            }

            $validators = @()
            foreach ($child in $Node.SelectNodes("./ValidatorArray | ./PeriodicValidator")) {
                $value = Get-AttrValue $child "value"
                if ($value) {
                    $validators += $value
                    Add-Reference $RefList "effect" $id "validatorRef" "validator" $value $SourceFile
                }
            }

            $result.nextEffects = $nextEffects
            $result.behaviors = $behaviors
            $result.validators = $validators
            $result.nameZh = Get-LocalizedValue ("Effect/Name/{0}" -f $id)
        }
        "behavior" {
            $effects = @()
            foreach ($child in $Node.SelectNodes("./InitialEffect | ./PeriodicEffect | ./ExpireEffect | ./FinalEffect")) {
                $value = Get-AttrValue $child "value"
                if ($value) {
                    $effects += $value
                    Add-Reference $RefList "behavior" $id "effectRef" "effect" $value $SourceFile
                }
            }

            $requirements = @()
            foreach ($child in $Node.SelectNodes("./Requirements")) {
                $value = Get-AttrValue $child "value"
                if ($value) {
                    $requirements += $value
                    Add-Reference $RefList "behavior" $id "requirementRef" "requirement" $value $SourceFile
                }
            }

            $validators = @()
            foreach ($child in $Node.SelectNodes("./DisableValidatorArray | ./RemoveValidatorArray | ./ValidatorArray")) {
                $value = Get-AttrValue $child "value"
                if ($value) {
                    $validators += $value
                    Add-Reference $RefList "behavior" $id "validatorRef" "validator" $value $SourceFile
                }
            }

            $result.effects = $effects
            $result.requirements = $requirements
            $result.validators = $validators
            $result.nameZh = Get-LocalizedValue ("Behavior/Name/{0}" -f $id)
        }
        "weapon" {
            $effects = @()
            foreach ($child in $Node.SelectNodes("./Effect | ./DisplayEffect")) {
                $value = Get-AttrValue $child "value"
                if ($value) {
                    $effects += $value
                    Add-Reference $RefList "weapon" $id "effectRef" "effect" $value $SourceFile
                }
            }
            $result.effects = $effects
            $result.nameZh = Get-LocalizedValue ("Weapon/Name/{0}" -f $id)
        }
        "button" {
            $result.nameZh = Get-LocalizedValue ("Button/Name/{0}" -f $id)
            $result.tooltipZh = Get-LocalizedValue ("Button/Tooltip/{0}" -f $id)
        }
        "requirement" {
            $nodeLinks = @()
            foreach ($child in $Node.SelectNodes("./NodeArray")) {
                $value = Get-AttrValue $child "Link"
                if ($value) {
                    $nodeLinks += [ordered]@{
                        index = Get-AttrValue $child "index"
                        link  = $value
                    }
                    Add-Reference $RefList "requirement" $id "nodeLink" "requirementNode" $value $SourceFile
                }
            }
            $result.nodes = $nodeLinks
        }
        "validator" {
            $behaviors = @()
            foreach ($child in $Node.SelectNodes("./Behavior")) {
                $value = Get-AttrValue $child "value"
                if ($value) {
                    $behaviors += $value
                    Add-Reference $RefList "validator" $id "behaviorRef" "behavior" $value $SourceFile
                }
            }
            $result.behaviors = $behaviors
        }
        "upgrade" {
            $modifiers = @()
            foreach ($child in $Node.SelectNodes("./EffectArray")) {
                $reference = Get-AttrValue $child "Reference"
                $modifier = [ordered]@{
                    index     = Get-AttrValue $child "index"
                    operation = Get-AttrValue $child "Operation"
                    reference = $reference
                    value     = Get-AttrValue $child "Value"
                }
                $modifiers += $modifier

                $resolvedRef = Resolve-UpgradeReference -Reference $reference
                if ($null -ne $resolvedRef) {
                    Add-Reference $RefList "upgrade" $id ("effectArray:{0}" -f $resolvedRef.rawType) $resolvedRef.catalog $resolvedRef.id $SourceFile
                }
            }

            $result.nameZh = Get-LocalizedValue ("Upgrade/Name/{0}" -f $id)
            $result.tooltipZh = Get-LocalizedValue ("Upgrade/Tooltip/{0}" -f $id)
            $result.effects = $modifiers
        }
    }

    return [pscustomobject]$result
}

New-Item -ItemType Directory -Force -Path $OutputDir | Out-Null

$references = New-Object System.Collections.Generic.List[object]
$summaryRows = New-Object System.Collections.Generic.List[object]
$textSummaryRows = New-Object System.Collections.Generic.List[object]
$allItems = New-Object System.Collections.Generic.List[object]
$lookupMap = @{}

foreach ($plan in $catalogPlan) {
    $xml = Get-CatalogXml $plan.File
    $xpath = if ($plan.Node -eq "*") { "/Catalog/*[@id]" } else { "/Catalog/$($plan.Node)" }
    $nodes = $xml.SelectNodes($xpath)
    $items = New-Object System.Collections.Generic.List[object]

    foreach ($node in $nodes) {
        $id = Get-AttrValue $node "id"
        if ([string]::IsNullOrWhiteSpace($id)) { continue }

        $snapshot = Get-NodeSnapshot -Node $node -Kind $plan.Kind -RefList $references -SourceFile $plan.File
        $items.Add($snapshot)
        $allItems.Add([pscustomobject]@{
            catalog = $plan.Kind
            file    = $plan.File
            item    = $snapshot
        })
    }

    $items | ConvertTo-Json -Depth 12 | Set-Content -Encoding UTF8 (Join-Path $OutputDir $plan.Out)
    $summaryRows.Add([pscustomobject]@{
        kind  = $plan.Kind
        file  = $plan.File
        count = $items.Count
    })
}

foreach ($itemRow in $allItems) {
    $item = $itemRow.item
    Add-LookupEntry -LookupMap $lookupMap -Id $item.id -BucketName "definitions" -Entry ([pscustomobject]@{
        catalog    = $itemRow.catalog
        file       = $itemRow.file
        type       = $item.type
        nameZh     = Get-ObjectPropertyValue -InputObject $item -Name "nameZh"
        subtitleZh = Get-ObjectPropertyValue -InputObject $item -Name "subtitleZh"
        tooltipZh  = Get-ObjectPropertyValue -InputObject $item -Name "tooltipZh"
    })
}

foreach ($ref in $references) {
    Add-LookupEntry -LookupMap $lookupMap -Id $ref.fromId -BucketName "outgoingRefs" -Entry ([pscustomobject]@{
        refType    = $ref.refType
        toCatalog  = $ref.toCatalog
        toId       = $ref.toId
        sourceFile = $ref.sourceFile
    })
    Add-LookupEntry -LookupMap $lookupMap -Id $ref.toId -BucketName "incomingRefs" -Entry ([pscustomobject]@{
        refType     = $ref.refType
        fromCatalog = $ref.fromCatalog
        fromId      = $ref.fromId
        sourceFile  = $ref.sourceFile
    })
}

foreach ($plan in $textTablePlan) {
    $path = Join-Path $ModRoot $plan.RelativePath
    $entries = Read-KeyValueEntries -Path $path
    $entries | ConvertTo-Json -Depth 4 | Set-Content -Encoding UTF8 (Join-Path $OutputDir $plan.Out)

    $textSummaryRows.Add([pscustomobject]@{
        locale = $plan.Locale
        table  = $plan.Table
        file   = $plan.RelativePath
        count  = $entries.Count
    })

    foreach ($entry in $entries) {
        if ($entry.key -match "/([^/=]+)$") {
            Add-LookupEntry -LookupMap $lookupMap -Id $Matches[1] -BucketName "localizations" -Entry ([pscustomobject]@{
                locale = $plan.Locale
                table  = $plan.Table
                key    = $entry.key
                value  = $entry.value
            })
        }
    }
}

$references | ConvertTo-Json -Depth 6 | Set-Content -Encoding UTF8 (Join-Path $OutputDir "references-index.json")

$lookupRows = foreach ($id in ($lookupMap.Keys | Sort-Object)) {
    $bucket = $lookupMap[$id]
    [pscustomobject]@{
        id            = $id
        definitions   = $bucket.definitions.ToArray()
        incomingRefs  = $bucket.incomingRefs.ToArray()
        outgoingRefs  = $bucket.outgoingRefs.ToArray()
        localizations = $bucket.localizations.ToArray()
    }
}

$lookupRows | ConvertTo-Json -Depth 10 | Set-Content -Encoding UTF8 (Join-Path $OutputDir "lookup-index.json")

$searchFiles = New-Object System.Collections.Generic.List[object]
foreach ($plan in $catalogPlan) {
    $searchFiles.Add([pscustomobject]@{
        kind         = "catalog"
        relativePath = (Join-Path "Base.SC2Data\GameData" $plan.File)
    })
}
foreach ($plan in $textTablePlan) {
    $searchFiles.Add([pscustomobject]@{
        kind         = "localizedText"
        relativePath = $plan.RelativePath
    })
}
foreach ($galaxyFile in Get-ChildItem -Path (Join-Path $ModRoot "Base.SC2Data") -Filter *.galaxy -File -ErrorAction SilentlyContinue) {
    $searchFiles.Add([pscustomobject]@{
        kind         = "galaxy"
        relativePath = [System.IO.Path]::GetRelativePath($ModRoot, $galaxyFile.FullName)
    })
}
$triggersPath = Join-Path $ModRoot "Triggers"
if (Test-Path $triggersPath) {
    $searchFiles.Add([pscustomobject]@{
        kind         = "triggers"
        relativePath = "Triggers"
    })
}

$searchFiles | ConvertTo-Json -Depth 4 | Set-Content -Encoding UTF8 (Join-Path $OutputDir "lookup-search-files.json")

[pscustomobject]@{
    generatedAtUtc = (Get-Date).ToUniversalTime().ToString("s") + "Z"
    modRoot        = [System.IO.Path]::GetFullPath($ModRoot)
    outputDir      = [System.IO.Path]::GetFullPath($OutputDir)
    catalogs       = $summaryRows
    textTables     = $textSummaryRows
    referenceCount = $references.Count
    lookupEntryCount = $lookupRows.Count
    searchFileCount  = $searchFiles.Count
} | ConvertTo-Json -Depth 6 | Set-Content -Encoding UTF8 (Join-Path $OutputDir "catalog-summary.json")

Write-Host "Index build completed."
Write-Host "Output:" ([System.IO.Path]::GetFullPath($OutputDir))
