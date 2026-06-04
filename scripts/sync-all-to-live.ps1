<#
.SYNOPSIS
Synchronize the current XM scenario tree to the live StarCraft II installation.

.DESCRIPTION
Copies the checked-in `合作指挥官版起义狂潮` mod/map tree into the live game
directory. By default this keeps `XMFinal.SC2Mod\DocumentHeader` and
`XMFinal.SC2Mod\DocumentInfo` out of the sync path so the live metadata files
you asked not to touch stay unchanged.

.EXAMPLE
  pwsh -NoProfile -ExecutionPolicy Bypass -File .\scripts\sync-all-to-live.ps1

.EXAMPLE
  pwsh -NoProfile -ExecutionPolicy Bypass -File .\scripts\sync-all-to-live.ps1 -DryRun
#>
[CmdletBinding()]
param(
    [string]$WorkspaceRoot = (Split-Path -Parent $PSScriptRoot),
    [string]$ScenarioRoot = "",
    [string]$LiveRoot = "E:\SC2\SC2new\StarCraft II",
    [string[]]$Mods = @(),
    [string[]]$Maps = @(),
    [switch]$MutateXMFinalDocumentMeta,
    [switch]$SkipMods,
    [switch]$SkipMaps,
    [switch]$SkipLauncher = $true,
    [switch]$ReplacePackedLauncher,
    [switch]$DryRun
)

$ErrorActionPreference = "Stop"

function Resolve-ScenarioRoot {
    param(
        [string]$Root,
        [string]$Preferred
    )

    if (-not [string]::IsNullOrWhiteSpace($Preferred)) {
        $full = [System.IO.Path]::GetFullPath($Preferred)
        if (Test-Path -LiteralPath (Join-Path $full "Mods\XM")) {
            return $full
        }
        throw "Scenario root not found: $Preferred"
    }

    $default = Join-Path $Root "合作指挥官版起义狂潮"
    if (Test-Path -LiteralPath (Join-Path $default "Mods\XM")) {
        return $default
    }

    $match = Get-ChildItem -LiteralPath $Root -Directory |
        Where-Object { Test-Path -LiteralPath (Join-Path $_.FullName "Mods\XM") } |
        Select-Object -First 1

    if (-not $match) {
        throw "Could not auto-detect scenario root under '$Root'."
    }

    return $match.FullName
}

function Ensure-Directory {
    param([string]$Path)

    if (-not (Test-Path -LiteralPath $Path)) {
        New-Item -ItemType Directory -Force -Path $Path | Out-Null
    }
}

function Resolve-Names {
    param(
        [string]$Root,
        [string[]]$Requested
    )

    if ($Requested.Count -gt 0) {
        return $Requested
    }

    return @(Get-ChildItem -LiteralPath $Root -Directory | Select-Object -ExpandProperty Name)
}

function Get-ExcludedFiles {
    param([string]$Source)

    if ($MutateXMFinalDocumentMeta) {
        return @()
    }

    if ($Source -match '[\\/ ]XMFinal\.SC2Mod([\\/]|$)') {
        return @("DocumentHeader", "DocumentInfo")
    }

    return @()
}

function Test-FileMatches {
    param(
        [string]$Source,
        [string]$Target
    )

    if (-not (Test-Path -LiteralPath $Source)) {
        throw "Source metadata file not found: $Source"
    }

    if (-not (Test-Path -LiteralPath $Target)) {
        return $false
    }

    $sourceHash = (Get-FileHash -LiteralPath $Source -Algorithm SHA256).Hash
    $targetHash = (Get-FileHash -LiteralPath $Target -Algorithm SHA256).Hash
    return $sourceHash -eq $targetHash
}

function Assert-XMFinalDocumentMetaIsSafeToSkip {
    param(
        [string]$SourceModsRoot,
        [string]$TargetModsRoot
    )

    if ($MutateXMFinalDocumentMeta) {
        return
    }

    $sourceFinalRoot = Join-Path $SourceModsRoot "XMFinal.SC2Mod"
    $targetFinalRoot = Join-Path $TargetModsRoot "XMFinal.SC2Mod"
    $metaFiles = @("DocumentHeader", "DocumentInfo")
    $staleFiles = New-Object System.Collections.Generic.List[string]

    foreach ($fileName in $metaFiles) {
        $sourceFile = Join-Path $sourceFinalRoot $fileName
        $targetFile = Join-Path $targetFinalRoot $fileName
        if (-not (Test-FileMatches -Source $sourceFile -Target $targetFile)) {
            $staleFiles.Add($fileName)
        }
    }

    if ($staleFiles.Count -eq 0) {
        return
    }

    $files = $staleFiles -join ", "
    throw "XMFinal.SC2Mod metadata differs from the live copy ($files), but this sync would skip it. Stale XMFinal metadata can make MapScript include resolution fail, for example missing LibA1BA7A9F. Rerun with -MutateXMFinalDocumentMeta to copy the checked-in DocumentHeader/DocumentInfo, or exclude XMFinal.SC2Mod intentionally."
}

function Invoke-RobocopySync {
    param(
        [string]$Source,
        [string]$Target
    )

    if (-not (Test-Path -LiteralPath $Source)) {
        throw "Source path not found: $Source"
    }

    $excludeFiles = Get-ExcludedFiles -Source $Source

    if ($DryRun) {
        $excludeText = if ($excludeFiles.Count -gt 0) { " EXCLUDE=$($excludeFiles -join ',')" } else { "" }
        Write-Output "DRYRUN_SYNC=$Source -> $Target$excludeText"
        return
    }

    Ensure-Directory -Path $Target

    $robocopy = Get-Command robocopy -ErrorAction SilentlyContinue
    if ($robocopy) {
        $args = @($Source, $Target, "/E", "/R:1", "/W:1", "/NFL", "/NDL", "/NP", "/MT:8")
        foreach ($name in $excludeFiles) {
            $args += "/XF"
            $args += $name
        }

        & $robocopy.Source @args | Out-Null
        $exitCode = $LASTEXITCODE
        if ($exitCode -ge 8) {
            throw "robocopy failed while syncing '$Source' to '$Target' with exit code $exitCode"
        }
        return
    }

    Get-ChildItem -LiteralPath $Source -Recurse -File | ForEach-Object {
        if ($_.Name -in $excludeFiles) {
            return
        }

        $relative = $_.FullName.Substring($Source.Length).TrimStart('\')
        $destination = Join-Path $Target $relative
        $destinationDir = Split-Path -Parent $destination
        Ensure-Directory -Path $destinationDir
        Copy-Item -LiteralPath $_.FullName -Destination $destination -Force
    }
}

function Prepare-LauncherTarget {
    param([string]$Path)

    if (-not (Test-Path -LiteralPath $Path)) {
        Ensure-Directory -Path $Path
        return
    }

    $item = Get-Item -LiteralPath $Path
    if ($item.PSIsContainer) {
        return
    }

    if (-not $ReplacePackedLauncher) {
        throw "Launcher target is a packed file: $Path. Rerun with -ReplacePackedLauncher to back it up and replace it with a directory-style Launcher.SC2Map."
    }

    $backupPath = "$Path.bak.$(Get-Date -Format 'yyyyMMdd-HHmmss')"
    if ($DryRun) {
        Write-Output "DRYRUN_BACKUP_LAUNCHER=$Path -> $backupPath"
        Write-Output "DRYRUN_REPLACE_LAUNCHER_WITH_DIRECTORY=$Path"
        return
    }

    Move-Item -LiteralPath $Path -Destination $backupPath -Force
    New-Item -ItemType Directory -Force -Path $Path | Out-Null
    Write-Output "BACKED_UP_LAUNCHER=$backupPath"
}

$scenarioRoot = Resolve-ScenarioRoot -Root $WorkspaceRoot -Preferred $ScenarioRoot
$sourceModsRoot = Join-Path $scenarioRoot "Mods\XM"
$sourceMapsRoot = Join-Path $scenarioRoot "Maps\XM"
$sourceLauncherRoot = Join-Path $WorkspaceRoot "tools\launcher_mpq"
$targetModsRoot = Join-Path $LiveRoot "Mods\XM"
$targetMapsRoot = Join-Path $LiveRoot "Maps\XM"
$targetLauncherRoot = Join-Path $targetMapsRoot "Launcher.SC2Map"

if (-not (Test-Path -LiteralPath $sourceModsRoot)) {
    throw "Source mods root not found: $sourceModsRoot"
}

if (-not (Test-Path -LiteralPath $sourceMapsRoot)) {
    throw "Source maps root not found: $sourceMapsRoot"
}

if (-not $SkipLauncher -and -not (Test-Path -LiteralPath $sourceLauncherRoot)) {
    throw "Source launcher root not found: $sourceLauncherRoot"
}

$modNames = Resolve-Names -Root $sourceModsRoot -Requested $Mods
$mapNames = Resolve-Names -Root $sourceMapsRoot -Requested $Maps

Write-Output "SCENARIO_ROOT=$scenarioRoot"
Write-Output "LIVE_ROOT=$LiveRoot"
Write-Output "DRY_RUN=$([int][bool]$DryRun)"

if (-not $SkipMods) {
    foreach ($modName in $modNames) {
        $source = Join-Path $sourceModsRoot $modName
        $target = Join-Path $targetModsRoot $modName
        Invoke-RobocopySync -Source $source -Target $target
        Write-Output "SYNCED_MOD=$modName"
    }
}

if (-not $SkipMaps) {
    foreach ($mapName in $mapNames) {
        $source = Join-Path $sourceMapsRoot $mapName
        $target = Join-Path $targetMapsRoot $mapName
        Invoke-RobocopySync -Source $source -Target $target
        Write-Output "SYNCED_MAP=$mapName"
    }
}

if (-not $SkipLauncher) {
    Prepare-LauncherTarget -Path $targetLauncherRoot
    Invoke-RobocopySync -Source $sourceLauncherRoot -Target $targetLauncherRoot
    Write-Output "SYNCED_LAUNCHER=Launcher.SC2Map"
}

Write-Output "SYNC_COMPLETED=1"
