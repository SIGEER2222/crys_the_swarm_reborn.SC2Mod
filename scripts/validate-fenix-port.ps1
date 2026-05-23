param(
    [string]$WorkspaceRoot = (Split-Path -Parent $PSScriptRoot),
    [switch]$RequireLauncherCandidate,
    [switch]$RequireXMFinalDependency
)

$ErrorActionPreference = "Stop"

$projectRoot = Get-Item -LiteralPath $WorkspaceRoot
$scenarioRoot = Get-ChildItem -LiteralPath $projectRoot.FullName -Directory | Where-Object {
    Test-Path -LiteralPath (Join-Path $_.FullName "Mods\XM\XMCore.SC2Mod")
} | Select-Object -First 1

if (-not $scenarioRoot) {
    throw "Unable to locate scenario root containing Mods\XM\XMCore.SC2Mod under $($projectRoot.FullName)"
}

$xmRoot = Join-Path $scenarioRoot.FullName "Mods\XM"
$mapsRoot = Join-Path $scenarioRoot.FullName "Maps\XM"
$launcherMap = Join-Path $mapsRoot "Launcher.SC2Map"
$xmFinal = Join-Path $xmRoot "XMFinal.SC2Mod"
$xmCore = Join-Path $xmRoot "XMCore.SC2Mod"
$xmFenix = Join-Path $xmRoot "XMFenix.SC2Mod"
$docPath = Join-Path $projectRoot.FullName "docs\指挥官\Fenix\当前状态.md"

$errors = [System.Collections.Generic.List[string]]::new()

function Add-Error {
    param([string]$Message)
    $errors.Add($Message) | Out-Null
}

function Test-Contains {
    param(
        [string]$Path,
        [string]$Pattern,
        [switch]$Simple
    )

    if (-not (Test-Path -LiteralPath $Path)) {
        Add-Error "Missing file: $Path"
        return
    }

    $match = if ($Simple) {
        Select-String -LiteralPath $Path -Pattern $Pattern -SimpleMatch -Quiet
    }
    else {
        Select-String -LiteralPath $Path -Pattern $Pattern -Quiet
    }

    if (-not $match) {
        Add-Error "Missing pattern '$Pattern' in $Path"
    }
}

function Test-FenixLauncherCandidate {
    param([switch]$Required)

    if (-not (Test-Path -LiteralPath $launcherMap)) {
        if ($Required) {
            Add-Error "Missing packed Launcher.SC2Map: $launcherMap"
        }
        return
    }

    $mpqEditor = Join-Path $projectRoot.FullName "tools\mpq\mpqeditor\x64\MPQEditor.exe"
    if (-not (Test-Path -LiteralPath $mpqEditor)) {
        if ($Required) {
            Add-Error "Missing MPQEditor needed to inspect packed Launcher.SC2Map: $mpqEditor"
        }
        return
    }

    $tempRoot = Join-Path ([IO.Path]::GetTempPath()) ("fenix-launcher-validate-" + [Guid]::NewGuid().ToString("N"))
    $tempMap = Join-Path $tempRoot "Launcher.SC2Map"
    $extractRoot = Join-Path $tempRoot "extract"
    $scriptPath = Join-Path $tempRoot "extract.txt"

    try {
        New-Item -ItemType Directory -Path $extractRoot -Force | Out-Null
        Copy-Item -LiteralPath $launcherMap -Destination $tempMap -Force

        $mpqScript = @"
e Launcher.SC2Map MapScript.galaxy extract /fp
e Launcher.SC2Map Base.SC2Data\GameData\UserData.xml extract /fp
e Launcher.SC2Map zhCN.SC2Data\LocalizedData\GameStrings.txt extract /fp
e Launcher.SC2Map Assets\Textures\ui_btn_commanderportrait_fenix.dds extract /fp
x
"@
        [IO.File]::WriteAllText($scriptPath, $mpqScript, [Text.Encoding]::ASCII)

        Push-Location $tempRoot
        try {
            & $mpqEditor /console $scriptPath | Out-Null
        }
        finally {
            Pop-Location
        }

        $launcherChecks = @(
            @{ Path = Join-Path $extractRoot "Base.SC2Data\GameData\UserData.xml"; Pattern = 'String="Fenix"'; Label = 'Launcher Fenix commander id' },
            @{ Path = Join-Path $extractRoot "Base.SC2Data\GameData\UserData.xml"; Pattern = 'ID_Por_009'; Label = 'Launcher Fenix portrait text link' },
            @{ Path = Join-Path $extractRoot "Base.SC2Data\GameData\UserData.xml"; Pattern = 'ui_btn_commanderportrait_fenix.dds'; Label = 'Launcher Fenix button image link' },
            @{ Path = Join-Path $extractRoot "zhCN.SC2Data\LocalizedData\GameStrings.txt"; Pattern = 'UserData/CommanderPreset/ID_Por_009='; Label = 'Launcher Fenix portrait string' }
        )

        foreach ($check in $launcherChecks) {
            if (-not (Test-Path -LiteralPath $check.Path) -or -not (Select-String -LiteralPath $check.Path -Pattern $check.Pattern -SimpleMatch -Quiet)) {
                if ($Required) {
                    Add-Error "$($check.Label) missing pattern '$($check.Pattern)' in packed Launcher.SC2Map"
                }
                else {
                    Write-Host "NOTE: $($check.Label) is not present in packed Launcher.SC2Map."
                }
                return
            }
        }

        if (Select-String -LiteralPath (Join-Path $extractRoot "Base.SC2Data\GameData\UserData.xml"), (Join-Path $extractRoot "zhCN.SC2Data\LocalizedData\GameStrings.txt") -Pattern '`r`n' -SimpleMatch -Quiet) {
            Add-Error "Packed Launcher.SC2Map contains literal backtick newline escape text."
        }

        $fenixPortrait = Join-Path $extractRoot "Assets\Textures\ui_btn_commanderportrait_fenix.dds"
        if (-not (Test-Path -LiteralPath $fenixPortrait)) {
            if ($Required) {
                Add-Error "Launcher Fenix portrait asset missing in packed Launcher.SC2Map"
            }
        }
    }
    finally {
        if (Test-Path -LiteralPath $tempRoot) {
            Remove-Item -LiteralPath $tempRoot -Recurse -Force
        }
    }
}

if (-not (Test-Path -LiteralPath $xmFenix)) {
    Add-Error "Missing XMFenix module: $xmFenix"
}

foreach ($xmlPath in Get-ChildItem -LiteralPath (Join-Path $xmFenix "Base.SC2Data\GameData") -Filter "*.xml") {
    [xml](Get-Content -LiteralPath $xmlPath.FullName -Raw) | Out-Null
}
[xml](Get-Content -LiteralPath (Join-Path $xmCore "Base.SC2Data\GameData\UserData.xml") -Raw) | Out-Null

$unitData = Join-Path $xmFenix "Base.SC2Data\GameData\UnitData.xml"
foreach ($unitId in @(
    "Nexus", "Probe", "Pylon", "Gateway", "CyberneticsCore", "RoboticsFacility", "Stargate",
    "SoACasterFenix", "FenixAltarOfPsiStorms", "FenixCoop", "FenixDragoon", "FenixArbiter",
    "ZealotPurifier", "AdeptFenix", "SentryFenix", "StalkerPurifier", "Immortal", "ColossusPurifier", "Scout", "Carrier",
    "FenixKaldalisZealot", "FenixTalisAdept", "FenixTaldarinImmortal", "FenixWarbringerColossus", "FenixMojoScout", "FenixClolarionCarrier"
)) {
    Test-Contains -Path $unitData -Pattern "id=`"$unitId`"" -Simple
}

$abilData = Join-Path $xmFenix "Base.SC2Data\GameData\AbilData.xml"
foreach ($abilId in @(
    "SOASummonFenix", "SOASummonFenixDragoon", "SOASummonFenixArbiter",
    "FenixAltarOfPsiStormsResearch", "FenixAltarOfPsiStormsTrain"
)) {
    Test-Contains -Path $abilData -Pattern "id=`"$abilId`"" -Simple
}
foreach ($pattern in @(
    'Unit value="ZealotPurifier"',
    'Unit value="AdeptFenix"',
    'Unit value="SentryFenix"',
    'Unit value="ColossusPurifier"',
    'Unit value="Scout"',
    '<CmdButtonArray index="Execute" DefaultButtonFace="SOASummonFenixArbiter" />'
)) {
    Test-Contains -Path $abilData -Pattern $pattern -Simple
}

$buttonData = Join-Path $xmFenix "Base.SC2Data\GameData\ButtonData.xml"
foreach ($buttonId in @(
    "SOASummonFenix", "SOASummonFenixDragoon", "SOASummonFenixArbiter",
    "FenixAltarOfPsiStorms", "FenixKaldalisZealot", "FenixClolarionCarrier"
)) {
    Test-Contains -Path $buttonData -Pattern "id=`"$buttonId`"" -Simple
}

$upgradeData = Join-Path $xmFenix "Base.SC2Data\GameData\UpgradeData.xml"
foreach ($upgradeId in @(
    "FenixCommander", "FenixResearchCostReduction",
    "FenixChampionKaldalisZealot", "FenixChampionTalisAdept", "FenixChampionTaldarinImmortal",
    "FenixChampionWarbringerColossus", "FenixChampionMojoScout", "FenixChampionClolarionCarrier",
    "MasteryFenixSuitAttackSpeed", "MasteryFenixSuitEnergyRegen", "MasteryFenixChampionAttackSpeed",
    "MasteryFenixChampionLifeShieldBuff", "MasteryFenixChronoBoostExtra", "MasteryFenixReducedResearchCosts"
)) {
    Test-Contains -Path $upgradeData -Pattern "id=`"$upgradeId`"" -Simple
}

Test-Contains -Path (Join-Path $xmFenix "Base.SC2Data\GameData\CommanderData.xml") -Pattern '<CCommander id="Fenix">' -Simple
Test-Contains -Path (Join-Path $xmFenix "Base.SC2Data\GameData\UserData.xml") -Pattern '<Instances Id="ProtossFenix">' -Simple
Test-Contains -Path (Join-Path $xmFenix "DocumentInfo") -Pattern 'file:Mods\XM\XMCore.SC2Mod' -Simple

$xmCoreUserData = Join-Path $xmCore "Base.SC2Data\GameData\UserData.xml"
Test-Contains -Path $xmCoreUserData -Pattern '<Instances Id="Fenix">' -Simple
foreach ($pattern in @(
    'Unit Unit="Nexus"',
    'Unit Unit="Probe"',
    'Unit Unit="Pylon"',
    'Upgrade Upgrade="FenixCommander"',
    'Upgrade Upgrade="FenixResearchCostReduction"',
    'Upgrade Upgrade="FenixChampionKaldalisZealot"',
    'Upgrade Upgrade="FenixChampionClolarionCarrier"',
    'Upgrade Upgrade="MasteryFenixSuitAttackSpeed"',
    'Upgrade Upgrade="MasteryFenixReducedResearchCosts"'
)) {
    Test-Contains -Path $xmCoreUserData -Pattern $pattern -Simple
}

Test-Contains -Path (Join-Path $xmCore "Base.SC2Data\Lib67C0F0E7.galaxy") -Pattern 'lib67C0F0E7_gf_CU_GPInitFenix' -Simple
Test-Contains -Path (Join-Path $xmCore "Base.SC2Data\Lib67C0F0E7_h.galaxy") -Pattern 'lib67C0F0E7_gf_CU_GPInitFenix' -Simple

$xmFinalGalaxy = Join-Path $xmFinal "Base.SC2Data\LibE0EAE146.galaxy"
$xmFinalHeaderGalaxy = Join-Path $xmFinal "Base.SC2Data\LibE0EAE146_h.galaxy"
foreach ($pattern in @(
    'libE0EAE146_gf_ApplyFenixCommanderRuntime',
    'ProtossFenix',
    'autoC0933116_val == "Fenix"',
    'ConsoleProtoss_Fenix',
    'auto09490B45_val == "Fenix"',
    'SoACasterFenix',
    'lib67C0F0E7_gf_CU_GPInit(1, "Fenix"',
    'FenixCoop',
    'libE0EAE146_gf_FenixRuntimeInit',
    'libE0EAE146_gt_FenixHeroSpawn',
    'libE0EAE146_gt_FenixHeroKilled',
    'libNtve_gf_PlayerRemoveCooldown(lp_player, "SOASummonFenixArbiter")',
    'libE0EAE146_gf_FenixCreateMapStartSquad',
    'libE0EAE146_gf_FenixCreateCargoSquad'
)) {
    Test-Contains -Path $xmFinalGalaxy -Pattern $pattern -Simple
}
Test-Contains -Path $xmFinalHeaderGalaxy -Pattern 'libE0EAE146_gf_ApplyFenixCommanderRuntime' -Simple
Test-Contains -Path $xmFinalHeaderGalaxy -Pattern 'libE0EAE146_gf_FenixCreateMapStartSquad' -Simple
Test-Contains -Path $xmFinalHeaderGalaxy -Pattern 'libE0EAE146_gf_FenixCreateCargoSquad' -Simple
Test-Contains -Path $xmFinalHeaderGalaxy -Pattern 'libE0EAE146_gf_FenixRuntimeInit' -Simple

foreach ($mapCheck in @(
    @{ File = "thanson01.SC2Map\MapScript.galaxy"; Pattern = 'FenixCreateCargoSquad(UnitFromId(290), "hero")' },
    @{ File = "thanson02.SC2Map\MapScript.galaxy"; Pattern = 'FenixCreateMapStartSquad("hero", 1, PointFromId(930))' },
    @{ File = "thorner02.SC2Map\MapScript.galaxy"; Pattern = 'FenixCreateCargoSquad(UnitLastCreated(), "hero")' },
    @{ File = "thorner03.SC2Map\MapScript.galaxy"; Pattern = 'FenixCreateMapStartSquad("hero", 1, UnitGetPosition(UnitFromId(4)))' },
    @{ File = "thorner05s.SC2Map\MapScript.galaxy"; Pattern = 'FenixCreateMapStartSquad("heavy", 1, PointFromId(163))' },
    @{ File = "traynor01.SC2Map\MapScript.galaxy"; Pattern = 'FenixCreateMapStartSquad("light", gv_p1_USER, PointFromId(415))' },
    @{ File = "ttosh03b.SC2Map\MapScript.galaxy"; Pattern = 'FenixCreateMapStartSquad("heavy", 1, PointFromId(29))' },
    @{ File = "ttychus02.SC2Map\MapScript.galaxy"; Pattern = 'FenixCreateCargoSquad(UnitLastCreated(), "heavy")' },
    @{ File = "ttychus03.SC2Map\MapScript.galaxy"; Pattern = 'FenixCreateMapStartSquad("air", gv_p01_USER, PointFromId(618516690))' },
    @{ File = "ttychus04.SC2Map\MapScript.galaxy"; Pattern = 'FenixCreateMapStartSquad("air", 1, PointFromId(394))' },
    @{ File = "ttychus05.SC2Map\MapScript.galaxy"; Pattern = 'FenixCreateMapStartSquad("air", 1, PointFromId(1709600040))' },
    @{ File = "tvalerian01.SC2Map\MapScript.galaxy"; Pattern = 'FenixCreateMapStartSquad("heavy", gv_p12_MOEBIUS, PointFromId(385406063))' }
)) {
    Test-Contains -Path (Join-Path $mapsRoot $mapCheck.File) -Pattern $mapCheck.Pattern -Simple
}

Test-Contains -Path (Join-Path $xmCore "zhCN.SC2Data\LocalizedData\GameStrings.txt") -Pattern 'UserData/CommanderAch/Fenix_TitU=' -Simple
Test-Contains -Path (Join-Path $xmFenix "zhCN.SC2Data\LocalizedData\GameStrings.txt") -Pattern 'UserData/CommanderAch/Fenix_TitU=' -Simple
Test-Contains -Path (Join-Path $xmFenix "zhCN.SC2Data\LocalizedData\GameStrings.txt") -Pattern 'UserData/PlayerCommanders/ProtossFenix_Name=菲尼克斯' -Simple

if ($RequireXMFinalDependency) {
    Test-Contains -Path (Join-Path $xmFinal "DocumentInfo") -Pattern 'file:Mods\XM\XMFenix.SC2Mod' -Simple
    $headerBytes = [IO.File]::ReadAllBytes((Join-Path $xmFinal "DocumentHeader"))
    $headerText = [Text.Encoding]::UTF8.GetString($headerBytes)
    if ($headerText -notmatch [regex]::Escape('file:Mods\XM\XMFenix.SC2Mod')) {
        Add-Error "XMFinal DocumentHeader does not contain XMFenix dependency"
    }
}

Test-FenixLauncherCandidate -Required:$RequireLauncherCandidate

Test-Contains -Path $docPath -Pattern "XMFenix.SC2Mod" -Simple
Test-Contains -Path $docPath -Pattern "SoACasterFenix" -Simple

if ($errors.Count -gt 0) {
    Write-Error (($errors | ForEach-Object { "- $_" }) -join "`n")
}

Write-Host "Fenix port validation passed."
