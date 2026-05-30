param(
    [string]$WorkspaceRoot = (Split-Path -Parent $PSScriptRoot),
    [string]$ScenarioRoot = "",
    [string]$LiveRoot = "E:\SC2\SC2new\StarCraft II",
    [string[]]$Maps = @("ttosh02.SC2Map"),
    [switch]$SyncMaps,
    [switch]$DryRun
)

$ErrorActionPreference = "Stop"

function Resolve-ScenarioRoot {
    param([string]$Root, [string]$Preferred)

    if (-not [string]::IsNullOrWhiteSpace($Preferred)) {
        $full = [System.IO.Path]::GetFullPath($Preferred)
        if (Test-Path -LiteralPath (Join-Path $full "Mods\XM\XMFinal.SC2Mod\Base.SC2Data")) {
            return $full
        }
        throw "Scenario root not found or missing XMFinal Base.SC2Data: $Preferred"
    }

    $default = Join-Path $Root "合作指挥官版起义狂潮"
    if (Test-Path -LiteralPath (Join-Path $default "Mods\XM\XMFinal.SC2Mod\Base.SC2Data")) {
        return $default
    }

    throw "Could not locate 合作指挥官版起义狂潮 under '$Root'."
}

function Ensure-Directory {
    param([string]$Path)
    if (-not (Test-Path -LiteralPath $Path)) {
        New-Item -ItemType Directory -Force -Path $Path | Out-Null
    }
}

function Copy-Tree {
    param([string]$Source, [string]$Target)

    if (-not (Test-Path -LiteralPath $Source)) {
        throw "Source not found: $Source"
    }

    if ($DryRun) {
        Write-Output "DRYRUN_COPY=$Source -> $Target"
        return
    }

    Ensure-Directory -Path $Target
    Get-ChildItem -LiteralPath $Source -Recurse -File | ForEach-Object {
        $relative = $_.FullName.Substring($Source.Length).TrimStart('\')
        $destination = Join-Path $Target $relative
        Ensure-Directory -Path (Split-Path -Parent $destination)
        Copy-Item -LiteralPath $_.FullName -Destination $destination -Force
    }
}

$scenarioRootResolved = Resolve-ScenarioRoot -Root $WorkspaceRoot -Preferred $ScenarioRoot
$sourceBase = Join-Path $scenarioRootResolved "Mods\XM\XMFinal.SC2Mod\Base.SC2Data"
$targetBase = Join-Path $LiveRoot "Mods\XM\XMFinal.SC2Mod\Base.SC2Data"
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$backupRoot = Join-Path $WorkspaceRoot "游戏数据\live-backups\$timestamp"

Write-Output "SCENARIO_ROOT=$scenarioRootResolved"
Write-Output "LIVE_ROOT=$LiveRoot"
Write-Output "SOURCE_BASE=$sourceBase"
Write-Output "TARGET_BASE=$targetBase"
Write-Output "BACKUP_ROOT=$backupRoot"
Write-Output "DRY_RUN=$([int][bool]$DryRun)"

if (-not $DryRun) {
    if (Test-Path -LiteralPath $targetBase) {
        Copy-Tree -Source $targetBase -Target (Join-Path $backupRoot "XMFinal.SC2Mod\Base.SC2Data")
        Write-Output "BACKUP_OK=XMFinal.SC2Mod\\Base.SC2Data"
    }
}

Copy-Tree -Source $sourceBase -Target $targetBase
Write-Output "SYNCED_RUNTIME=XMFinal.SC2Mod\\Base.SC2Data"

if ($SyncMaps) {
    foreach ($mapName in $Maps) {
        $sourceMap = Join-Path $scenarioRootResolved "Maps\XM\$mapName"
        $targetMap = Join-Path $LiveRoot "Maps\XM\$mapName"
        Copy-Tree -Source $sourceMap -Target $targetMap
        Write-Output "SYNCED_MAP=$mapName"
    }
}

Write-Output "SYNC_COMPLETED=1"
