param(
    [Parameter(Mandatory = $true)]
    [string]$SourceGameDataRoot,
    [Parameter(Mandatory = $true)]
    [string]$TargetGameDataRoot,
    [switch]$ReplaceExisting
)

$ErrorActionPreference = "Stop"

function New-EmptyCatalogDocument {
    $doc = New-Object System.Xml.XmlDocument
    $decl = $doc.CreateXmlDeclaration("1.0", "utf-8", $null)
    [void]$doc.AppendChild($decl)
    $catalog = $doc.CreateElement("Catalog")
    [void]$doc.AppendChild($catalog)
    return $doc
}

function Get-CatalogNodesById {
    param([xml]$Document)

    $map = @{}
    if ($null -eq $Document.DocumentElement) {
        return $map
    }

    foreach ($node in @($Document.DocumentElement.ChildNodes)) {
        if ($node.NodeType -ne [System.Xml.XmlNodeType]::Element) {
            continue
        }

        $id = $node.GetAttribute("id")
        if ([string]::IsNullOrWhiteSpace($id)) {
            $id = $node.GetAttribute("Id")
        }
        if ([string]::IsNullOrWhiteSpace($id)) {
            continue
        }

        $map["$($node.Name)|$id"] = $node
    }

    return $map
}

if (-not [System.IO.Path]::IsPathRooted($SourceGameDataRoot)) {
    $SourceGameDataRoot = Join-Path (Split-Path -Parent $PSScriptRoot) $SourceGameDataRoot
}
if (-not [System.IO.Path]::IsPathRooted($TargetGameDataRoot)) {
    $TargetGameDataRoot = Join-Path (Split-Path -Parent $PSScriptRoot) $TargetGameDataRoot
}

if (-not (Test-Path -LiteralPath $SourceGameDataRoot)) {
    throw "Source GameData root not found: $SourceGameDataRoot"
}

New-Item -ItemType Directory -Force -Path $TargetGameDataRoot | Out-Null

$results = [System.Collections.Generic.List[object]]::new()

foreach ($sourceFile in Get-ChildItem -LiteralPath $SourceGameDataRoot -Recurse -Filter "*.xml" | Sort-Object FullName) {
    $relativePath = [System.IO.Path]::GetRelativePath($SourceGameDataRoot, $sourceFile.FullName)
    $targetPath = Join-Path $TargetGameDataRoot $relativePath
    New-Item -ItemType Directory -Force -Path (Split-Path -Parent $targetPath) | Out-Null
    [xml]$sourceDoc = Get-Content -LiteralPath $sourceFile.FullName -Raw
    [xml]$targetDoc = if (Test-Path -LiteralPath $targetPath) {
        Get-Content -LiteralPath $targetPath -Raw
    } else {
        New-EmptyCatalogDocument
    }

    $targetNodesById = Get-CatalogNodesById $targetDoc
    $added = 0
    $replaced = 0
    $skipped = 0

    foreach ($sourceNode in @($sourceDoc.DocumentElement.ChildNodes)) {
        if ($sourceNode.NodeType -ne [System.Xml.XmlNodeType]::Element) {
            continue
        }

        $id = $sourceNode.GetAttribute("id")
        if ([string]::IsNullOrWhiteSpace($id)) {
            $id = $sourceNode.GetAttribute("Id")
        }
        if ([string]::IsNullOrWhiteSpace($id)) {
            continue
        }

        $nodeKey = "$($sourceNode.Name)|$id"

        if ($targetNodesById.ContainsKey($nodeKey)) {
            if (-not $ReplaceExisting) {
                $skipped++
                continue
            }

            $oldNode = $targetNodesById[$nodeKey]
            $newNode = $targetDoc.ImportNode($sourceNode, $true)
            [void]$targetDoc.DocumentElement.ReplaceChild($newNode, $oldNode)
            $targetNodesById[$nodeKey] = $newNode
            $replaced++
            continue
        }

        $newNode = $targetDoc.ImportNode($sourceNode, $true)
        [void]$targetDoc.DocumentElement.AppendChild($newNode)
        $targetNodesById[$nodeKey] = $newNode
        $added++
    }

    if ($added -gt 0 -or $replaced -gt 0 -or -not (Test-Path -LiteralPath $targetPath)) {
        $settings = [System.Xml.XmlWriterSettings]::new()
        $settings.Encoding = [System.Text.UTF8Encoding]::new($false)
        $settings.Indent = $true
        $settings.NewLineChars = "`r`n"
        $writer = [System.Xml.XmlWriter]::Create($targetPath, $settings)
        try {
            $targetDoc.Save($writer)
        } finally {
            $writer.Dispose()
        }
    }

    $results.Add([pscustomobject]@{
        File = $relativePath
        Added = $added
        Replaced = $replaced
        Skipped = $skipped
    }) | Out-Null
}

$results | Sort-Object File | Format-Table -AutoSize
