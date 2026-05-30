param(
    [Parameter(Mandatory = $true, Position = 0)]
    [string[]]$Id,

    [string[]]$Catalog = @("UnitData.xml", "AbilData.xml"),

    [string]$ScenarioRoot = ""
)

$ErrorActionPreference = "Stop"

$normalizedIds = New-Object System.Collections.Generic.List[string]
foreach ($item in @($Id)) {
    foreach ($part in ($item -split '\s*,\s*')) {
        if (-not [string]::IsNullOrWhiteSpace($part)) {
            $normalizedIds.Add($part.Trim()) | Out-Null
        }
    }
}

if ($normalizedIds.Count -eq 0) {
    throw "At least one non-empty id is required."
}

$Id = @($normalizedIds)

$normalizedCatalogs = New-Object System.Collections.Generic.List[string]
foreach ($item in @($Catalog)) {
    foreach ($part in ($item -split '\s*,\s*')) {
        if (-not [string]::IsNullOrWhiteSpace($part)) {
            $normalizedCatalogs.Add($part.Trim()) | Out-Null
        }
    }
}

if ($normalizedCatalogs.Count -eq 0) {
    throw "At least one non-empty catalog file name is required."
}

$Catalog = @($normalizedCatalogs)

$scriptRoot = if ($PSScriptRoot) { $PSScriptRoot } else { Split-Path -Parent $MyInvocation.MyCommand.Path }
$workspaceRoot = (Resolve-Path -LiteralPath (Join-Path $scriptRoot "..\..")).Path

function Resolve-ScenarioRoot {
    param([string]$Preferred)

    if (-not [string]::IsNullOrWhiteSpace($Preferred)) {
        $resolved = (Resolve-Path -LiteralPath $Preferred).Path
        if (-not (Test-Path -LiteralPath (Join-Path $resolved "Mods\XM\XMFinal.SC2Mod"))) {
            throw "Scenario root does not contain Mods\XM\XMFinal.SC2Mod: $resolved"
        }
        return $resolved
    }

    foreach ($candidate in @(
        (Join-Path $workspaceRoot "合作指挥官版起义狂潮"),
        (Join-Path $workspaceRoot "原始mod")
    )) {
        if (Test-Path -LiteralPath (Join-Path $candidate "Mods\XM\XMFinal.SC2Mod")) {
            return (Resolve-Path -LiteralPath $candidate).Path
        }
    }

    $match = Get-ChildItem -LiteralPath $workspaceRoot -Directory | Where-Object {
        Test-Path -LiteralPath (Join-Path $_.FullName "Mods\XM\XMFinal.SC2Mod")
    } | Select-Object -First 1

    if (-not $match) {
        throw "Unable to locate a scenario root containing Mods\XM\XMFinal.SC2Mod under $workspaceRoot"
    }

    return $match.FullName
}

function ConvertTo-XPathLiteral {
    param([string]$Value)

    if ($Value -notmatch "'") {
        return "'$Value'"
    }

    if ($Value -notmatch '"') {
        return '"' + $Value + '"'
    }

    throw "Cannot build XPath literal for value containing both quote types: $Value"
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

function Read-DocumentDependencies {
    param(
        [string]$ScenarioRoot,
        [string]$ProjectRoot
    )

    $documentInfoPath = Join-Path $ProjectRoot "DocumentInfo"
    if (-not (Test-Path -LiteralPath $documentInfoPath)) {
        return @()
    }

    [xml]$documentInfo = Get-Content -LiteralPath $documentInfoPath -Raw -Encoding UTF8
    $dependencies = New-Object System.Collections.Generic.List[string]

    foreach ($valueNode in @($documentInfo.DocInfo.Dependencies.Value)) {
        $value = [string]$valueNode
        if ([string]::IsNullOrWhiteSpace($value)) {
            continue
        }

        foreach ($match in [regex]::Matches($value, 'file:([^,<\r\n]+)')) {
            $relative = $match.Groups[1].Value.Trim().Replace("/", "\")
            if ([string]::IsNullOrWhiteSpace($relative)) {
                continue
            }

            $fullPath = Join-Path $ScenarioRoot $relative
            if (Test-Path -LiteralPath $fullPath) {
                $dependencies.Add((Resolve-Path -LiteralPath $fullPath).Path) | Out-Null
            }
        }
    }

    $seen = New-Object System.Collections.Generic.HashSet[string] ([System.StringComparer]::OrdinalIgnoreCase)
    $unique = New-Object System.Collections.Generic.List[string]
    foreach ($dependency in $dependencies) {
        if ($seen.Add($dependency)) {
            $unique.Add($dependency) | Out-Null
        }
    }

    return $unique
}

function Get-DependencyOrder {
    param(
        [string]$ScenarioRoot,
        [string]$EntryRoot
    )

    $ordered = New-Object System.Collections.Generic.List[string]
    $seen = New-Object System.Collections.Generic.HashSet[string] ([System.StringComparer]::OrdinalIgnoreCase)

    function Visit {
        param([string]$Root)

        if ([string]::IsNullOrWhiteSpace($Root)) {
            return
        }

        if (-not (Test-Path -LiteralPath $Root)) {
            return
        }

        $resolved = (Resolve-Path -LiteralPath $Root).Path
        if (-not $seen.Add($resolved)) {
            return
        }

        foreach ($dependency in Read-DocumentDependencies -ScenarioRoot $ScenarioRoot -ProjectRoot $resolved) {
            Visit $dependency
        }

        $ordered.Add($resolved) | Out-Null
    }

    Visit $EntryRoot
    return $ordered
}

function Get-GlobalModuleRoots {
    param([string]$ScenarioRoot)

    $modsRoot = Join-Path $ScenarioRoot "Mods\XM"
    if (-not (Test-Path -LiteralPath $modsRoot)) {
        return @()
    }

    return @(Get-ChildItem -LiteralPath $modsRoot -Directory | Where-Object {
        $_.Name -like "*.SC2Mod"
    } | Sort-Object Name | ForEach-Object { $_.FullName })
}

function Get-CatalogDocument {
    param(
        [string]$Root,
        [string]$CatalogName
    )

    $catalogPath = Join-Path $Root "Base.SC2Data\GameData\$CatalogName"
    if (-not (Test-Path -LiteralPath $catalogPath)) {
        return $null
    }

    return [xml](Get-Content -LiteralPath $catalogPath -Raw -Encoding UTF8)
}

function Get-CatalogNode {
    param(
        [string]$Root,
        [string]$CatalogName,
        [string]$NodeId,
        [hashtable]$DocumentCache
    )

    $cacheKey = ($Root.ToLowerInvariant() + "|" + $CatalogName.ToLowerInvariant())
    if (-not $DocumentCache.ContainsKey($cacheKey)) {
        $DocumentCache[$cacheKey] = Get-CatalogDocument -Root $Root -CatalogName $CatalogName
    }

    $document = $DocumentCache[$cacheKey]
    if ($null -eq $document) {
        return $null
    }

    $xpathId = ConvertTo-XPathLiteral $NodeId
    return $document.SelectSingleNode("/Catalog/*[@id=$xpathId]")
}

function Get-NodeSummary {
    param(
        [System.Xml.XmlNode]$Node,
        [string]$CatalogName
    )

    $parts = New-Object System.Collections.Generic.List[string]

    switch ($CatalogName) {
        "UnitData.xml" {
            $abils = New-Object System.Collections.Generic.List[string]
            foreach ($entry in @($Node.SelectNodes("./AbilArray"))) {
                $value = Get-AttrValue $entry "Link"
                if (-not [string]::IsNullOrWhiteSpace($value)) {
                    $abils.Add($value) | Out-Null
                }
            }
            if ($abils.Count -gt 0) {
                $parts.Add("AbilArray=" + ($abils -join ", ")) | Out-Null
            }

            $behaviors = New-Object System.Collections.Generic.List[string]
            foreach ($entry in @($Node.SelectNodes("./BehaviorArray"))) {
                $value = Get-AttrValue $entry "Link"
                if (-not [string]::IsNullOrWhiteSpace($value)) {
                    $behaviors.Add($value) | Out-Null
                }
            }
            if ($behaviors.Count -gt 0) {
                $parts.Add("BehaviorArray=" + ($behaviors -join ", ")) | Out-Null
            }

            $weapons = New-Object System.Collections.Generic.List[string]
            foreach ($entry in @($Node.SelectNodes("./WeaponArray"))) {
                $value = Get-AttrValue $entry "Link"
                if (-not [string]::IsNullOrWhiteSpace($value)) {
                    $weapons.Add($value) | Out-Null
                }
            }
            if ($weapons.Count -gt 0) {
                $parts.Add("WeaponArray=" + ($weapons -join ", ")) | Out-Null
            }

            $buttons = New-Object System.Collections.Generic.List[string]
            foreach ($entry in @($Node.SelectNodes("./CardLayouts/LayoutButtons"))) {
                $face = Get-AttrValue $entry "Face"
                $abilCmd = Get-AttrValue $entry "AbilCmd"
                $type = Get-AttrValue $entry "Type"
                $requirements = Get-AttrValue $entry "Requirements"

                if ([string]::IsNullOrWhiteSpace($face) -and [string]::IsNullOrWhiteSpace($abilCmd)) {
                    continue
                }

                $buttonBits = New-Object System.Collections.Generic.List[string]
                if (-not [string]::IsNullOrWhiteSpace($face)) { $buttonBits.Add("Face=$face") | Out-Null }
                if (-not [string]::IsNullOrWhiteSpace($abilCmd)) { $buttonBits.Add("AbilCmd=$abilCmd") | Out-Null }
                if (-not [string]::IsNullOrWhiteSpace($type)) { $buttonBits.Add("Type=$type") | Out-Null }
                if (-not [string]::IsNullOrWhiteSpace($requirements)) { $buttonBits.Add("Req=$requirements") | Out-Null }
                $buttons.Add(($buttonBits -join "; ")) | Out-Null
            }
            if ($buttons.Count -gt 0) {
                $parts.Add("LayoutButtons=" + ($buttons -join " | ")) | Out-Null
            }
        }
        "AbilData.xml" {
            $infoRows = New-Object System.Collections.Generic.List[string]
            foreach ($entry in @($Node.SelectNodes("./InfoArray"))) {
                $index = Get-AttrValue $entry "index"
                $buttonNode = $entry.SelectSingleNode("./Button")
                $unitNode = $entry.SelectSingleNode("./Unit")

                $state = Get-AttrValue $buttonNode "State"
                $face = Get-AttrValue $buttonNode "DefaultButtonFace"
                $unit = Get-AttrValue $unitNode "value"

                $bits = New-Object System.Collections.Generic.List[string]
                if (-not [string]::IsNullOrWhiteSpace($index)) { $bits.Add("index=$index") | Out-Null }
                if (-not [string]::IsNullOrWhiteSpace($state)) { $bits.Add("state=$state") | Out-Null }
                if (-not [string]::IsNullOrWhiteSpace($face)) { $bits.Add("face=$face") | Out-Null }
                if (-not [string]::IsNullOrWhiteSpace($unit)) { $bits.Add("unit=$unit") | Out-Null }
                if ($bits.Count -gt 0) {
                    $infoRows.Add(($bits -join "; ")) | Out-Null
                }
            }
            if ($infoRows.Count -gt 0) {
                $parts.Add("InfoArray=" + ($infoRows -join " | ")) | Out-Null
            }

            $buttonRows = New-Object System.Collections.Generic.List[string]
            foreach ($entry in @($Node.SelectNodes("./CmdButtonArray"))) {
                $face = Get-AttrValue $entry "DefaultButtonFace"
                $requirements = Get-AttrValue $entry "Requirements"
                if ([string]::IsNullOrWhiteSpace($face) -and [string]::IsNullOrWhiteSpace($requirements)) {
                    continue
                }

                $bits = New-Object System.Collections.Generic.List[string]
                if (-not [string]::IsNullOrWhiteSpace($face)) { $bits.Add("face=$face") | Out-Null }
                if (-not [string]::IsNullOrWhiteSpace($requirements)) { $bits.Add("req=$requirements") | Out-Null }
                $buttonRows.Add(($bits -join "; ")) | Out-Null
            }
            if ($buttonRows.Count -gt 0) {
                $parts.Add("CmdButtonArray=" + ($buttonRows -join " | ")) | Out-Null
            }
        }
        default {
            $parts.Add("NodeType=$($Node.Name)") | Out-Null
        }
    }

    if ($parts.Count -eq 0) {
        return "（无额外摘要）"
    }

    return ($parts -join " | ")
}

$scenarioRootResolved = Resolve-ScenarioRoot -Preferred $ScenarioRoot
$entryRoot = Join-Path $scenarioRootResolved "Mods\XM\XMFinal.SC2Mod"
$dependencyOrder = Get-DependencyOrder -ScenarioRoot $scenarioRootResolved -EntryRoot $entryRoot
$globalRoots = Get-GlobalModuleRoots -ScenarioRoot $scenarioRootResolved
$catalogCache = @{}

Write-Output "SCENARIO_ROOT=$scenarioRootResolved"
Write-Output "ENTRY_ROOT=$entryRoot"
Write-Output "DEPENDENCY_ORDER=$($dependencyOrder.Count)"
Write-Output "GLOBAL_MODULES=$($globalRoots.Count)"

for ($idIndex = 0; $idIndex -lt $Id.Count; $idIndex += 1) {
    $targetId = $Id[$idIndex]
    Write-Output ""
    Write-Output "=== $targetId ==="

    $catalogMatched = $false
    foreach ($catalogName in $Catalog) {
        $hits = New-Object System.Collections.Generic.List[object]

        foreach ($root in $dependencyOrder) {
            $node = Get-CatalogNode -Root $root -CatalogName $catalogName -NodeId $targetId -DocumentCache $catalogCache
            if ($null -ne $node) {
                $hits.Add([pscustomobject]@{
                    Root = $root
                    Node = $node
                }) | Out-Null
            }
        }

        if ($hits.Count -eq 0) {
            continue
        }

        $catalogMatched = $true
        $owner = $hits[$hits.Count - 1]
        $hitRoots = @($hits | ForEach-Object { Split-Path -Leaf $_.Root }) -join " -> "
        $catalogPath = Join-Path $owner.Root "Base.SC2Data\GameData\$catalogName"
        $summary = Get-NodeSummary -Node $owner.Node -CatalogName $catalogName

        Write-Output "[$catalogName] 最终 owner: $(Split-Path -Leaf $owner.Root)"
        Write-Output "[$catalogName] 命中链: $hitRoots"
        Write-Output "[$catalogName] 目录: $catalogPath"
        Write-Output "[$catalogName] 摘要: $summary"
    }

    if (-not $catalogMatched) {
        Write-Output "当前闭包未命中，改扫全局模块。"
        $globalMatched = $false
        foreach ($catalogName in $Catalog) {
            $hits = New-Object System.Collections.Generic.List[object]

            foreach ($root in $globalRoots) {
                $node = Get-CatalogNode -Root $root -CatalogName $catalogName -NodeId $targetId -DocumentCache $catalogCache
                if ($null -ne $node) {
                    $hits.Add([pscustomobject]@{
                        Root = $root
                        Node = $node
                    }) | Out-Null
                }
            }

            if ($hits.Count -eq 0) {
                continue
            }

            $globalMatched = $true
            $globalOwner = $hits[$hits.Count - 1]
            $hitRoots = @($hits | ForEach-Object { Split-Path -Leaf $_.Root }) -join " -> "
            $candidateRoots = @($hits | ForEach-Object { Split-Path -Leaf $_.Root }) -join ", "
            $summary = Get-NodeSummary -Node $globalOwner.Node -CatalogName $catalogName

            Write-Output "[$catalogName] 全局命中候选: $candidateRoots"
            Write-Output "[$catalogName] 全局命中链: $hitRoots"
            Write-Output "[$catalogName] 全局末位候选: $(Split-Path -Leaf $globalOwner.Root)"
            Write-Output "[$catalogName] 全局摘要: $summary"
        }

        if (-not $globalMatched) {
            Write-Output "全局模块里也没找到该 id。"
        }
    }
}
