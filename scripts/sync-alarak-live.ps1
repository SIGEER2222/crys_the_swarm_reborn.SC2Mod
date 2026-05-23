param(
    [string]$WorkspaceRoot = (Split-Path -Parent $PSScriptRoot),
    [string]$ScenarioName = "",
    [string]$LiveRoot = "E:\SC2\SC2new\StarCraft II",
    [string[]]$Maps = @("thanson01.SC2Map"),
    [switch]$PreserveXMFinalDocumentMeta = $true
)

$ErrorActionPreference = "Stop"

function Resolve-ScenarioRoot {
    param(
        [string]$Root,
        [string]$Name
    )

    if (-not [string]::IsNullOrWhiteSpace($Name)) {
        $namedRoot = Join-Path $Root $Name
        if (Test-Path -LiteralPath (Join-Path $namedRoot "Mods\\XM\\XMFinal.SC2Mod")) {
            return $namedRoot
        }
        throw "Scenario root not found for ScenarioName='$Name'."
    }

    $match = Get-ChildItem -LiteralPath $Root -Directory |
        Where-Object { Test-Path -LiteralPath (Join-Path $_.FullName "Mods\\XM\\XMFinal.SC2Mod") } |
        Select-Object -First 1
    if (-not $match) {
        throw "Could not auto-detect scenario root under '$Root'."
    }
    return $match.FullName
}

$scenarioRoot = Resolve-ScenarioRoot -Root $WorkspaceRoot -Name $ScenarioName
$sourceModsRoot = Join-Path $scenarioRoot "Mods\XM"
$sourceMapsRoot = Join-Path $scenarioRoot "Maps\XM"
$targetModsRoot = Join-Path $LiveRoot "Mods\XM"
$targetMapsRoot = Join-Path $LiveRoot "Maps\XM"

$modNames = @(
    "XMCore.SC2Mod",
    "XMFinal.SC2Mod",
    "XMAlarak.SC2Mod",
    "XMAbathur.SC2Mod",
    "XMKerrigan.SC2Mod"
)

function Sync-Directory {
    param(
        [string]$Source,
        [string]$Target,
        [string[]]$ExcludeFiles = @()
    )

    if (-not (Test-Path -LiteralPath $Source)) {
        throw "Source path not found: $Source"
    }
    if (-not (Test-Path -LiteralPath $Target)) {
        New-Item -ItemType Directory -Force -Path $Target | Out-Null
    }

    $robocopy = Get-Command robocopy -ErrorAction SilentlyContinue
    if ($robocopy) {
        $args = @($Source, $Target, "/E", "/R:1", "/W:1", "/NFL", "/NDL", "/NP", "/MT:8")
        foreach ($name in $ExcludeFiles) {
            $args += "/XF"
            $args += $name
        }
        & $robocopy.Source @args | Out-Null
        $exitCode = $LASTEXITCODE
        if ($exitCode -ge 8) {
            throw "robocopy failed while syncing '$Source' to '$Target' with exit code $exitCode"
        }
    }
    else {
        Get-ChildItem -LiteralPath $Source -Recurse -File | Where-Object { $_.Name -notin $ExcludeFiles } | ForEach-Object {
            $relative = $_.FullName.Substring($Source.Length).TrimStart('\')
            $destination = Join-Path $Target $relative
            $destinationDir = Split-Path -Parent $destination
            if (-not (Test-Path -LiteralPath $destinationDir)) {
                New-Item -ItemType Directory -Force -Path $destinationDir | Out-Null
            }
            Copy-Item -LiteralPath $_.FullName -Destination $destination -Force
        }
    }
}

foreach ($modName in $modNames) {
    $source = Join-Path $sourceModsRoot $modName
    $target = Join-Path $targetModsRoot $modName
    $excludeFiles = @()
    if ($PreserveXMFinalDocumentMeta -and $modName -eq "XMFinal.SC2Mod") {
        $excludeFiles = @("DocumentHeader", "DocumentInfo")
    }
    Sync-Directory -Source $source -Target $target -ExcludeFiles $excludeFiles
    Write-Output "SYNCED_MOD=$modName"
}

foreach ($mapName in $Maps) {
    $source = Join-Path $sourceMapsRoot $mapName
    $target = Join-Path $targetMapsRoot $mapName
    Sync-Directory -Source $source -Target $target
    Write-Output "SYNCED_MAP=$mapName"
}
