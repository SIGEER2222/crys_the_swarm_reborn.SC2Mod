param(
    [string]$WorkspaceRoot = (Split-Path -Parent $PSScriptRoot),
    [string]$ScenarioRoot = "",
    [string]$LiveRoot = "E:\SC2\SC2new\StarCraft II",
    [string[]]$Maps = @("CommanderTestBench.SC2Map"),
    [switch]$SyncAllMaps,
    [switch]$XMFinalOnly,
    [switch]$SkipPreflight,
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
        if (Test-Path -LiteralPath (Join-Path $full "Mods\XM\XMFinal.SC2Mod")) {
            return $full
        }
        throw "Scenario root not found or missing XMFinal.SC2Mod: $Preferred"
    }

    $preferredName = -join ([char[]](0x539F, 0x59CB, 0x6D, 0x6F, 0x64))
    $default = Join-Path $Root $preferredName
    if (Test-Path -LiteralPath (Join-Path $default "Mods\XM\XMFinal.SC2Mod")) {
        return $default
    }

    throw "Could not locate the preferred scenario root under '$Root'."
}

function Ensure-Directory {
    param([string]$Path)

    if (-not (Test-Path -LiteralPath $Path)) {
        New-Item -ItemType Directory -Force -Path $Path | Out-Null
    }
}

function Assert-Path {
    param(
        [string]$Path,
        [string]$Label
    )

    if (-not (Test-Path -LiteralPath $Path)) {
        throw "$Label not found: $Path"
    }
}

function Assert-FileContains {
    param(
        [string]$Path,
        [string]$Pattern,
        [switch]$Simple
    )

    Assert-Path -Path $Path -Label "Required file"

    $matched = if ($Simple) {
        Select-String -LiteralPath $Path -Pattern $Pattern -SimpleMatch -Quiet
    }
    else {
        Select-String -LiteralPath $Path -Pattern $Pattern -Quiet
    }

    if (-not $matched) {
        throw "Missing pattern '$Pattern' in $Path"
    }
}

function Get-ModNames {
    param([string]$SourceModsRoot)

    if ($XMFinalOnly) {
        return @("XMFinal.SC2Mod")
    }

    return @(Get-ChildItem -LiteralPath $SourceModsRoot -Directory | Select-Object -ExpandProperty Name)
}

function Get-MapNames {
    param([string]$SourceMapsRoot)

    if ($SyncAllMaps) {
        return @(Get-ChildItem -LiteralPath $SourceMapsRoot -Directory | Select-Object -ExpandProperty Name)
    }

    foreach ($mapName in $Maps) {
        Assert-Path -Path (Join-Path $SourceMapsRoot $mapName) -Label "Source map"
    }
    return $Maps
}

function Invoke-RobocopySync {
    param(
        [string]$Source,
        [string]$Target
    )

    Assert-Path -Path $Source -Label "Source path"

    if ($DryRun) {
        Write-Output "DRYRUN_SYNC=$Source -> $Target"
        return
    }

    Ensure-Directory -Path $Target

    $robocopy = Get-Command robocopy -ErrorAction SilentlyContinue
    if ($robocopy) {
        $args = @($Source, $Target, "/E", "/R:1", "/W:1", "/NFL", "/NDL", "/NP", "/MT:8")
        & $robocopy.Source @args | Out-Null
        if ($LASTEXITCODE -ge 8) {
            throw "robocopy failed while syncing '$Source' to '$Target' with exit code $LASTEXITCODE"
        }
        return
    }

    Get-ChildItem -LiteralPath $Source -Recurse -File | ForEach-Object {
        $relative = $_.FullName.Substring($Source.Length).TrimStart('\')
        $destination = Join-Path $Target $relative
        $destinationDir = Split-Path -Parent $destination
        Ensure-Directory -Path $destinationDir
        Copy-Item -LiteralPath $_.FullName -Destination $destination -Force
    }
}

function Invoke-Preflight {
    param(
        [string]$SourceModsRoot,
        [string]$SourceMapsRoot
    )

    $xmFinalRoot = Join-Path $SourceModsRoot "XMFinal.SC2Mod"
    $xmFinalGalaxy = Join-Path $xmFinalRoot "Base.SC2Data\LibE0EAE146.galaxy"
    $xmFinalHeader = Join-Path $xmFinalRoot "Base.SC2Data\LibE0EAE146_h.galaxy"
    $testBenchRoot = Join-Path $SourceMapsRoot "CommanderTestBench.SC2Map"
    $testBenchDocInfo = Join-Path $testBenchRoot "DocumentInfo"
    $testBenchScript = Join-Path $testBenchRoot "MapScript.galaxy"

    Assert-Path -Path $xmFinalRoot -Label "XMFinal source root"
    Assert-Path -Path $testBenchRoot -Label "CommanderTestBench source root"

    Assert-FileContains -Path $testBenchDocInfo -Pattern 'file:Mods\XM\XMFinal.SC2Mod' -Simple
    Assert-FileContains -Path $testBenchScript -Pattern 'XMTestBench_SetCommander(' -Simple
    Assert-FileContains -Path $testBenchScript -Pattern 'XMTestBench_RunScenario(' -Simple

    Assert-FileContains -Path $xmFinalHeader -Pattern 'void XMTestBench_SetCommander (int lp_player, string lp_commander);' -Simple
    Assert-FileContains -Path $xmFinalHeader -Pattern 'void XMTestBench_RunScenario (int lp_player, string lp_scenarioKind);' -Simple
    Assert-FileContains -Path $xmFinalHeader -Pattern 'bool XM_InvokeCommanderPanelAbility (int lp_player, string lp_commander, string lp_panelAbilityId, point lp_targetPoint);' -Simple

    Assert-FileContains -Path $xmFinalGalaxy -Pattern 'libE0EAE146_gf_XMRuntime_ApplyCommanderProgression' -Simple
    Assert-FileContains -Path $xmFinalGalaxy -Pattern 'libE0EAE146_gf_XMRuntime_RunCommanderBaseHook' -Simple
    Assert-FileContains -Path $xmFinalGalaxy -Pattern 'void XMTestBench_SetCommander (int lp_player, string lp_commander)' -Simple
    Assert-FileContains -Path $xmFinalGalaxy -Pattern 'void XMTestBench_RunScenario (int lp_player, string lp_scenarioKind)' -Simple
    Assert-FileContains -Path $xmFinalGalaxy -Pattern 'bool XM_InvokeCommanderPanelAbility (int lp_player, string lp_commander, string lp_panelAbilityId, point lp_targetPoint)' -Simple
}

$scenarioRootResolved = Resolve-ScenarioRoot -Root $WorkspaceRoot -Preferred $ScenarioRoot
$sourceModsRoot = Join-Path $scenarioRootResolved "Mods\XM"
$sourceMapsRoot = Join-Path $scenarioRootResolved "Maps\XM"
$targetModsRoot = Join-Path $LiveRoot "Mods\XM"
$targetMapsRoot = Join-Path $LiveRoot "Maps\XM"

Assert-Path -Path $sourceModsRoot -Label "Source mods root"
Assert-Path -Path $sourceMapsRoot -Label "Source maps root"

if (-not $SkipPreflight) {
    Invoke-Preflight -SourceModsRoot $sourceModsRoot -SourceMapsRoot $sourceMapsRoot
    Write-Output "PREFLIGHT_OK=1"
}
else {
    Write-Output "PREFLIGHT_SKIPPED=1"
}

$modNames = Get-ModNames -SourceModsRoot $sourceModsRoot
$mapNames = Get-MapNames -SourceMapsRoot $sourceMapsRoot

Write-Output "SCENARIO_ROOT=$scenarioRootResolved"
Write-Output "LIVE_ROOT=$LiveRoot"
Write-Output "SYNC_MODE_MODS=$(if ($XMFinalOnly) { 'xmfinal_only' } else { 'all_available_mods' })"
Write-Output "SYNC_MODE_MAPS=$(if ($SyncAllMaps) { 'all_maps' } else { ($mapNames -join ',') })"
Write-Output "DRY_RUN=$([int][bool]$DryRun)"

foreach ($modName in $modNames) {
    $source = Join-Path $sourceModsRoot $modName
    $target = Join-Path $targetModsRoot $modName
    Invoke-RobocopySync -Source $source -Target $target
    Write-Output "SYNCED_MOD=$modName"
}

foreach ($mapName in $mapNames) {
    $source = Join-Path $sourceMapsRoot $mapName
    $target = Join-Path $targetMapsRoot $mapName
    Invoke-RobocopySync -Source $source -Target $target
    Write-Output "SYNCED_MAP=$mapName"
}

Write-Output "EDITOR_MAP_SOURCE=$(Join-Path $sourceMapsRoot 'CommanderTestBench.SC2Map')"
Write-Output "LIVE_MAP_TARGET=$(Join-Path $targetMapsRoot 'CommanderTestBench.SC2Map')"
Write-Output "SYNC_COMPLETED=1"
