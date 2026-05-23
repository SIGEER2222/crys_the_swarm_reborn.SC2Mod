param(
    [string]$WorkspaceRoot = (Split-Path -Parent $PSScriptRoot),
    [switch]$RequireLauncherCandidate
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
$launcherRoot = Join-Path $mapsRoot "LauncherAuto.SC2Map"
$xmFinal = Join-Path $xmRoot "XMFinal.SC2Mod"
$xmCore = Join-Path $xmRoot "XMCore.SC2Mod"
$xmKerrigan = Join-Path $xmRoot "XMKerrigan.SC2Mod"
$docPath = Join-Path $projectRoot.FullName "docs\指挥官\凯瑞甘当前状态.md"

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

if (-not (Test-Path -LiteralPath $xmKerrigan)) {
    Add-Error "Missing XMKerrigan module: $xmKerrigan"
}

Test-Contains -Path (Join-Path $xmKerrigan "Base.SC2Data\GameData\UnitData.xml") -Pattern "K5Kerrigan" -Simple
Test-Contains -Path (Join-Path $xmKerrigan "Base.SC2Data\GameData\UnitData.xml") -Pattern "CoopCasterKerrigan" -Simple
Test-Contains -Path (Join-Path $xmKerrigan "Base.SC2Data\GameData\AbilData.xml") -Pattern "PsiStrike" -Simple
foreach ($upgradeId in @(
    "VoidCoopHeroicFortitude",
    "K5Cooldowns",
    "K5Fury",
    "CommanderPrestigeKerriganAbilities",
    "CommanderPrestigeKerriganAssimilationAura",
    "CommanderPrestigeKerriganCreep",
    "KerriganVoidCoopEnergyRegen",
    "MasteryKerriganEnergyRegen",
    "MasteryKerriganAutoAttackDamage",
    "MasteryKerriganArmyGasCost",
    "MasteryKerriganImmobilizationWaveDamage",
    "MasteryKerriganResearchSpeedandCost",
    "MasteryKerriganPrimarySpeedDamage"
)) {
    Test-Contains -Path (Join-Path $xmKerrigan "Base.SC2Data\GameData\UpgradeData.xml") -Pattern $upgradeId -Simple
}
Test-Contains -Path (Join-Path $xmKerrigan "Base.SC2Data\GameData\UserData.xml") -Pattern "KerriganLevel15" -Simple
Test-Contains -Path (Join-Path $xmKerrigan "Base.SC2Data\GameData\CommanderData.xml") -Pattern '<CCommander id="Kerrigan">' -Simple
Test-Contains -Path (Join-Path $xmKerrigan "DocumentInfo") -Pattern 'file:Mods\XM\XMCore.SC2Mod' -Simple
Test-Contains -Path (Join-Path $xmFinal "DocumentInfo") -Pattern 'file:Mods\XM\XMKerrigan.SC2Mod' -Simple

Test-Contains -Path (Join-Path $xmCore "Base.SC2Data\GameData\UserData.xml") -Pattern '<Instances Id="Kerrigan">' -Simple
foreach ($pattern in @(
    'Upgrade Upgrade="VoidCoopHeroicFortitude"',
    'Upgrade Upgrade="K5Cooldowns"',
    'Upgrade Upgrade="K5Fury"',
    'Upgrade Upgrade="CommanderPrestigeKerriganAbilities"',
    'Upgrade Upgrade="CommanderPrestigeKerriganAssimilationAura"',
    'Upgrade Upgrade="CommanderPrestigeKerriganCreep"',
    'Upgrade Upgrade="KerriganVoidCoopEnergyRegen"',
    'Upgrade Upgrade="MasteryKerriganEnergyRegen"',
    'Upgrade Upgrade="MasteryKerriganAutoAttackDamage"',
    'Upgrade Upgrade="MasteryKerriganArmyGasCost"',
    'Upgrade Upgrade="MasteryKerriganImmobilizationWaveDamage"',
    'Upgrade Upgrade="MasteryKerriganResearchSpeedandCost"',
    'Upgrade Upgrade="MasteryKerriganPrimarySpeedDamage"'
)) {
    Test-Contains -Path (Join-Path $xmCore "Base.SC2Data\GameData\UserData.xml") -Pattern $pattern -Simple
}
Test-Contains -Path (Join-Path $xmCore "Base.SC2Data\Lib67C0F0E7.galaxy") -Pattern 'lib67C0F0E7_gf_CU_GPInitKerrigan' -Simple
Test-Contains -Path (Join-Path $xmCore "Base.SC2Data\Lib67C0F0E7_h.galaxy") -Pattern 'lib67C0F0E7_gf_CU_GPInitKerrigan' -Simple
Test-Contains -Path (Join-Path $xmFinal "Base.SC2Data\LibE0EAE146.galaxy") -Pattern 'autoC0933116_val == "Kerrigan"' -Simple
Test-Contains -Path (Join-Path $xmFinal "Base.SC2Data\LibE0EAE146.galaxy") -Pattern 'libE0EAE146_gf_ApplyKerriganCommanderRuntime();' -Simple
Test-Contains -Path (Join-Path $xmFinal "Base.SC2Data\LibE0EAE146.galaxy") -Pattern 'lv_playerCommander = "ZergKerrigan";' -Simple
Test-Contains -Path (Join-Path $xmFinal "Base.SC2Data\LibE0EAE146.galaxy") -Pattern 'K5Kerrigan' -Simple

$requiredMaps = @(
    "traynor01",
    "ttosh03b",
    "tvalerian01",
    "thanson01",
    "thorner02",
    "thorner03",
    "thorner05s",
    "ttychus02",
    "ttychus03",
    "ttychus04",
    "ttychus05"
)

foreach ($map in $requiredMaps) {
    Test-Contains -Path (Join-Path $mapsRoot "$map.SC2Map\MapScript.galaxy") -Pattern '== "Kerrigan"' -Simple
}

if ($RequireLauncherCandidate) {
    Test-Contains -Path (Join-Path $launcherRoot "Base.SC2Data\GameData\UserData.xml") -Pattern 'String="Kerrigan"' -Simple
}

Test-Contains -Path $docPath -Pattern "XMKerrigan.SC2Mod" -Simple
Test-Contains -Path $docPath -Pattern "K5Kerrigan" -Simple
Test-Contains -Path $docPath -Pattern "Kerrigan" -Simple

$xmCoreUserData = Join-Path $xmCore "Base.SC2Data\GameData\UserData.xml"
if (Test-Path -LiteralPath $xmCoreUserData) {
    foreach ($obsoletePattern in @(
        'Upgrade Upgrade="KerriganHeroicFortitude"',
        'Upgrade Upgrade="KerriganLevel10"',
        'Upgrade Upgrade="CommanderPrestigeKerriganMalignantCreep"',
        'Upgrade Upgrade="KerriganLevel15"',
        'Upgrade Upgrade="MasteryKerriganAttackDamage"',
        'Upgrade Upgrade="MasteryKerriganAssimilationAuraDuration"',
        'Upgrade Upgrade="MasteryKerriganLarvaRate"',
        'Upgrade Upgrade="MasteryKerriganCocoonTimer"'
    )) {
        if (Select-String -LiteralPath $xmCoreUserData -Pattern $obsoletePattern -SimpleMatch -Quiet) {
            Add-Error "CommanderAch/Kerrigan still points to obsolete id $obsoletePattern in $xmCoreUserData"
        }
    }
}

if ($errors.Count -gt 0) {
    $errors | ForEach-Object { Write-Host $_ }
    throw "Kerrigan port validation failed with $($errors.Count) issue(s)."
}

if (-not $RequireLauncherCandidate) {
    $launcherUserData = Join-Path $launcherRoot "Base.SC2Data\GameData\UserData.xml"
    $launcherHasCandidate = $false
    if (Test-Path -LiteralPath $launcherUserData) {
        $launcherHasCandidate = Select-String -LiteralPath $launcherUserData -Pattern 'String="Kerrigan"' -SimpleMatch -Quiet
    }
    if (-not $launcherHasCandidate) {
        Write-Host "NOTE: LauncherAuto.SC2Map does not currently expose a Kerrigan candidate."
    }
}

Write-Host "Kerrigan port validation passed."
