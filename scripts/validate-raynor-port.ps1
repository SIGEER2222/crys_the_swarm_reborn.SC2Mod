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
$xmRaynor = Join-Path $xmRoot "XMRaynor.SC2Mod"
$docPath = Join-Path $projectRoot.FullName "docs\指挥官\Raynor\当前状态.md"

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

function Test-RaynorLauncherCandidate {
    param([switch]$Required)

    if (-not (Test-Path -LiteralPath $launcherMap)) {
        if ($Required) {
            Add-Error "Missing packed Launcher.SC2Map: $launcherMap"
        }
        else {
            Write-Host "NOTE: packed Launcher.SC2Map not found; launcher candidate check skipped."
        }
        return
    }

    $mpqEditor = Join-Path $projectRoot.FullName "tools\mpq\mpqeditor\x64\MPQEditor.exe"
    if (-not (Test-Path -LiteralPath $mpqEditor)) {
        if ($Required) {
            Add-Error "Missing MPQEditor needed to inspect packed Launcher.SC2Map: $mpqEditor"
        }
        else {
            Write-Host "NOTE: MPQEditor missing; packed Launcher.SC2Map candidate check skipped."
        }
        return
    }

    $tempRoot = Join-Path ([IO.Path]::GetTempPath()) ("raynor-launcher-validate-" + [Guid]::NewGuid().ToString("N"))
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
e Launcher.SC2Map Assets\Textures\ui_btn_commanderportrait_raynor.dds extract /fp
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
            @{ Path = Join-Path $extractRoot "MapScript.galaxy"; Pattern = 'gv_commanderNum = 8'; Label = 'Launcher Raynor loop count' },
            @{ Path = Join-Path $extractRoot "Base.SC2Data\GameData\UserData.xml"; Pattern = 'Count="9"'; Label = 'Launcher Raynor candidate count' },
            @{ Path = Join-Path $extractRoot "Base.SC2Data\GameData\UserData.xml"; Pattern = 'String="Raynor"'; Label = 'Launcher Raynor commander id' },
            @{ Path = Join-Path $extractRoot "Base.SC2Data\GameData\UserData.xml"; Pattern = 'ID_Por_008'; Label = 'Launcher Raynor portrait text link' },
            @{ Path = Join-Path $extractRoot "Base.SC2Data\GameData\UserData.xml"; Pattern = 'ui_btn_commanderportrait_raynor.dds'; Label = 'Launcher Raynor button image link' },
            @{ Path = Join-Path $extractRoot "zhCN.SC2Data\LocalizedData\GameStrings.txt"; Pattern = 'UserData/CommanderPreset/ID_Por_008='; Label = 'Launcher Raynor portrait string' }
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

        $raynorPortrait = Join-Path $extractRoot "Assets\Textures\ui_btn_commanderportrait_raynor.dds"
        if (-not (Test-Path -LiteralPath $raynorPortrait)) {
            if ($Required) {
                Add-Error "Launcher Raynor portrait asset missing in packed Launcher.SC2Map"
            }
            else {
                Write-Host "NOTE: Launcher Raynor portrait asset is not present in packed Launcher.SC2Map."
            }
            return
        }
    }
    finally {
        if (Test-Path -LiteralPath $tempRoot) {
            Remove-Item -LiteralPath $tempRoot -Recurse -Force
        }
    }
}

if (-not (Test-Path -LiteralPath $xmRaynor)) {
    Add-Error "Missing XMRaynor module: $xmRaynor"
}

$unitData = Join-Path $xmRaynor "Base.SC2Data\GameData\UnitData.xml"
foreach ($unitId in @(
    "CommandCenter",
    "SCV",
    "Marine",
    "Medic",
    "Marauder",
    "Firebat",
    "SiegeTank",
    "VikingFighter",
    "Banshee",
    "Battlecruiser",
    "Raynor",
    "RaynorCommando",
    "CoopCasterRaynor",
    "DuskWing",
    "HyperionVoidCoop"
)) {
    Test-Contains -Path $unitData -Pattern "id=`"$unitId`"" -Simple
}

$abilData = Join-Path $xmRaynor "Base.SC2Data\GameData\AbilData.xml"
foreach ($abilId in @(
    "VoidCoopSummonHyperion",
    "BansheeAirstrike",
    "CalldownMULE"
)) {
    Test-Contains -Path $abilData -Pattern "id=`"$abilId`"" -Simple
}

$upgradeData = Join-Path $xmRaynor "Base.SC2Data\GameData\UpgradeData.xml"
foreach ($upgradeId in @(
    "RaynorCommander",
    "RaynorBansheeAirstrike",
    "RaynorCommanderHyperionAdvancedTargetingSystems",
    "RaynorUnlockBattlecruiser",
    "RaynorCommanderStimUpgrade",
    "RaynorFirebatMedicRange",
    "RaynorCommanderTerranInfantryWeaponRange",
    "RaynorCommanderTerranWeaponAttackSpeed",
    "MasteryRaynorStimDuration",
    "MasteryRaynorMechAttackSpeed",
    "MasteryRaynorHyperionCooldown",
    "MasteryRaynorDuskWingCooldown",
    "MasteryRaynorDropPodHaste",
    "MasteryRaynorStartingSupply"
)) {
    Test-Contains -Path $upgradeData -Pattern "id=`"$upgradeId`"" -Simple
}

Test-Contains -Path (Join-Path $xmRaynor "Base.SC2Data\GameData\CommanderData.xml") -Pattern '<CCommander id="Raynor">' -Simple
Test-Contains -Path (Join-Path $xmRaynor "Base.SC2Data\GameData\UserData.xml") -Pattern '<Instances Id="TerranRaynor">' -Simple
Test-Contains -Path (Join-Path $xmRaynor "DocumentInfo") -Pattern 'file:Mods\XM\XMCore.SC2Mod' -Simple

$xmCoreUserData = Join-Path $xmCore "Base.SC2Data\GameData\UserData.xml"
Test-Contains -Path $xmCoreUserData -Pattern '<Instances Id="Raynor">' -Simple
foreach ($pattern in @(
    'Unit Unit="CommandCenter"',
    'Unit Unit="SCV"',
    'Unit Unit="Marine"',
    'Upgrade Upgrade="RaynorCommander"',
    'Upgrade Upgrade="RaynorBansheeAirstrike"',
    'Upgrade Upgrade="RaynorCommanderHyperionAdvancedTargetingSystems"',
    'Upgrade Upgrade="RaynorUnlockBattlecruiser"',
    'Upgrade Upgrade="RaynorCommanderStimUpgrade"',
    'Upgrade Upgrade="RaynorFirebatMedicRange"',
    'Upgrade Upgrade="RaynorCommanderTerranInfantryWeaponRange"',
    'Upgrade Upgrade="RaynorCommanderTerranWeaponAttackSpeed"',
    'Upgrade Upgrade="MasteryRaynorStimDuration"',
    'Upgrade Upgrade="MasteryRaynorMechAttackSpeed"',
    'Upgrade Upgrade="MasteryRaynorHyperionCooldown"',
    'Upgrade Upgrade="MasteryRaynorDuskWingCooldown"',
    'Upgrade Upgrade="MasteryRaynorDropPodHaste"',
    'Upgrade Upgrade="MasteryRaynorStartingSupply"'
)) {
    Test-Contains -Path $xmCoreUserData -Pattern $pattern -Simple
}

Test-Contains -Path (Join-Path $xmCore "Base.SC2Data\Lib67C0F0E7.galaxy") -Pattern 'lib67C0F0E7_gf_CU_GPInitRaynor' -Simple
Test-Contains -Path (Join-Path $xmCore "Base.SC2Data\Lib67C0F0E7_h.galaxy") -Pattern 'lib67C0F0E7_gf_CU_GPInitRaynor' -Simple

$xmFinalGalaxy = Join-Path $xmFinal "Base.SC2Data\LibE0EAE146.galaxy"
$xmFinalHeaderGalaxy = Join-Path $xmFinal "Base.SC2Data\LibE0EAE146_h.galaxy"
foreach ($pattern in @(
    'autoC0933116_val == "Raynor"',
    'auto09490B45_val == "Raynor"',
    'CoopCasterRaynor',
    'lib67C0F0E7_gf_CU_GPInit(1, "Raynor"',
    'RaynorCommando',
    'libE0EAE146_gf_RaynorCreateMapStartSquad',
    'libE0EAE146_gf_RaynorCreateCargoSquad'
)) {
    Test-Contains -Path $xmFinalGalaxy -Pattern $pattern -Simple
}
Test-Contains -Path $xmFinalHeaderGalaxy -Pattern 'libE0EAE146_gf_RaynorCreateMapStartSquad' -Simple
Test-Contains -Path $xmFinalHeaderGalaxy -Pattern 'libE0EAE146_gf_RaynorCreateCargoSquad' -Simple

Test-Contains -Path (Join-Path $mapsRoot "traynor01.SC2Map\MapScript.galaxy") -Pattern 'auto440B2AF1_val == "Raynor"' -Simple
Test-Contains -Path (Join-Path $mapsRoot "traynor01.SC2Map\MapScript.galaxy") -Pattern 'autoACB5ADFA_val == "Raynor"' -Simple
Test-Contains -Path (Join-Path $mapsRoot "traynor01.SC2Map\MapScript.galaxy") -Pattern 'libE0EAE146_gf_RaynorCreateCargoSquad' -Simple
Test-Contains -Path (Join-Path $mapsRoot "traynor01.SC2Map\MapScript.galaxy") -Pattern 'libE0EAE146_gf_RaynorCreateMapStartSquad' -Simple

Test-Contains -Path (Join-Path $xmCore "zhCN.SC2Data\LocalizedData\GameStrings.txt") -Pattern 'UserData/CommanderAch/Raynor_TitU=' -Simple
Test-Contains -Path (Join-Path $xmRaynor "zhCN.SC2Data\LocalizedData\GameStrings.txt") -Pattern 'UserData/CommanderAch/Raynor_TitU=' -Simple
Test-Contains -Path $docPath -Pattern "XMRaynor.SC2Mod" -Simple
Test-Contains -Path $docPath -Pattern "CoopCasterRaynor" -Simple

if ($RequireXMFinalDependency) {
    Test-Contains -Path (Join-Path $xmFinal "DocumentInfo") -Pattern 'file:Mods\XM\XMRaynor.SC2Mod' -Simple
}
else {
    $xmFinalDocInfo = Join-Path $xmFinal "DocumentInfo"
    if (Test-Path -LiteralPath $xmFinalDocInfo) {
        if (-not (Select-String -LiteralPath $xmFinalDocInfo -Pattern 'file:Mods\XM\XMRaynor.SC2Mod' -SimpleMatch -Quiet)) {
            Write-Host "NOTE: XMFinal.SC2Mod DocumentInfo does not currently depend on XMRaynor.SC2Mod."
        }
    }
}

if ($RequireLauncherCandidate) {
    Test-RaynorLauncherCandidate -Required
}
else {
    Test-RaynorLauncherCandidate
}

foreach ($xmlPath in @(
    $unitData,
    $abilData,
    $upgradeData,
    $xmCoreUserData,
    (Join-Path $xmRaynor "Base.SC2Data\GameData\CommanderData.xml"),
    (Join-Path $xmRaynor "Base.SC2Data\GameData\UserData.xml")
)) {
    if (Test-Path -LiteralPath $xmlPath) {
        try {
            [xml](Get-Content -LiteralPath $xmlPath -Raw) | Out-Null
        }
        catch {
            Add-Error "Invalid XML: $xmlPath :: $($_.Exception.Message)"
        }
    }
}

if ($errors.Count -gt 0) {
    $errors | ForEach-Object { Write-Host $_ }
    throw "Raynor port validation failed with $($errors.Count) issue(s)."
}

Write-Host "Raynor port validation passed."
