param(
    [string]$WorkspaceRoot = (Split-Path -Parent $PSScriptRoot),
    [switch]$RequireLauncherCandidate
)

$ErrorActionPreference = "Stop"

$projectRoot = Get-Item -LiteralPath $WorkspaceRoot
$scenarioRoot = Get-ChildItem -LiteralPath $projectRoot.FullName -Directory | Where-Object {
    Test-Path -LiteralPath (Join-Path $_.FullName "Mods\XM\XMAlarak.SC2Mod")
} | Select-Object -First 1

if (-not $scenarioRoot) {
    throw "Unable to locate scenario root containing Mods\XM\XMAlarak.SC2Mod under $($projectRoot.FullName)"
}

$xmRoot = Join-Path $scenarioRoot.FullName "Mods\XM"
$mapsRoot = Join-Path $scenarioRoot.FullName "Maps\XM"
$launcherRoot = Join-Path $mapsRoot "LauncherAuto.SC2Map"
$xmAlarak = Join-Path $xmRoot "XMAlarak.SC2Mod"
$xmCore = Join-Path $xmRoot "XMCore.SC2Mod"
$xmFinal = Join-Path $xmRoot "XMFinal.SC2Mod"
$docPath = Join-Path $projectRoot.FullName "docs\指挥官\Alarak当前状态.md"

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

Test-Contains -Path (Join-Path $xmAlarak "Base.SC2Data\GameData\UnitData.xml") -Pattern "AlarakCoop" -Simple
Test-Contains -Path (Join-Path $xmAlarak "Base.SC2Data\GameData\AbilData.xml") -Pattern "AlarakACDeadlyCharge" -Simple
Test-Contains -Path (Join-Path $xmAlarak "Base.SC2Data\GameData\ButtonData.xml") -Pattern "AlarakACSummonDeathfleet" -Simple
Test-Contains -Path (Join-Path $xmAlarak "Base.SC2Data\GameData\UpgradeData.xml") -Pattern "CommanderPrestigeAlarakDeathFleet" -Simple
Test-Contains -Path (Join-Path $xmAlarak "Base.SC2Data\GameData\UpgradeData.xml") -Pattern "AlarakSupplicantSacrificeLightningStrikes" -Simple
foreach ($masteryUpgrade in @(
    "MasteryAlarakAutoAttackDamage",
    "MasteryAlarakUnitAttackSpeed",
    "MasteryAlarakEmpowerMeSlavesDuration",
    "MasteryAlarakDeathFleetCDR",
    "MasteryAlarakOverchargeShieldsDamage",
    "MasteryAlarakChronoBoost"
)) {
    Test-Contains -Path (Join-Path $xmAlarak "Base.SC2Data\GameData\UpgradeData.xml") -Pattern $masteryUpgrade -Simple
}

Test-Contains -Path (Join-Path $xmCore "Base.SC2Data\GameData\UserData.xml") -Pattern '<Instances Id="Alarak">' -Simple
Test-Contains -Path (Join-Path $xmCore "Base.SC2Data\GameData\UserData.xml") -Pattern 'Upgrade Upgrade="AlarakSupplicantSacrificeLightningStrikes"' -Simple
foreach ($masteryUpgrade in @(
    'Upgrade Upgrade="MasteryAlarakAutoAttackDamage"',
    'Upgrade Upgrade="MasteryAlarakUnitAttackSpeed"',
    'Upgrade Upgrade="MasteryAlarakEmpowerMeSlavesDuration"',
    'Upgrade Upgrade="MasteryAlarakDeathFleetCDR"',
    'Upgrade Upgrade="MasteryAlarakOverchargeShieldsDamage"',
    'Upgrade Upgrade="MasteryAlarakChronoBoost"'
)) {
    Test-Contains -Path (Join-Path $xmCore "Base.SC2Data\GameData\UserData.xml") -Pattern $masteryUpgrade -Simple
}
Test-Contains -Path (Join-Path $xmCore "Base.SC2Data\Lib67C0F0E7.galaxy") -Pattern 'lib67C0F0E7_gf_CU_GPInitAlarak' -Simple
Test-Contains -Path (Join-Path $xmCore "Base.SC2Data\Lib67C0F0E7_h.galaxy") -Pattern 'lib67C0F0E7_gf_CU_GPInitAlarak' -Simple

Test-Contains -Path (Join-Path $xmFinal "Base.SC2Data\LibE0EAE146.galaxy") -Pattern 'autoC0933116_val == "Alarak"' -Simple
Test-Contains -Path (Join-Path $xmFinal "Base.SC2Data\LibE0EAE146.galaxy") -Pattern 'AlarakCoop' -Simple
Test-Contains -Path (Join-Path $xmFinal "Base.SC2Data\LibE0EAE146.galaxy") -Pattern 'CU_GPInit(1, "Alarak"' -Simple

$requiredMaps = @(
    "traynor01",
    "ttosh03b",
    "tvalerian01",
    "thanson01",
    "thorner02",
    "thorner03",
    "thorner05s",
    "ttychus02",
    "ttychus04",
    "ttychus05"
)
foreach ($map in $requiredMaps) {
    Test-Contains -Path (Join-Path $mapsRoot "$map.SC2Map\DocumentInfo") -Pattern 'file:Mods\XM\XMAlarak.SC2Mod' -Simple
    Test-Contains -Path (Join-Path $mapsRoot "$map.SC2Map\MapScript.galaxy") -Pattern '== "Alarak"' -Simple
}

if ($RequireLauncherCandidate) {
    Test-Contains -Path (Join-Path $launcherRoot "Base.SC2Data\GameData\UserData.xml") -Pattern 'String="Alarak"' -Simple
    Test-Contains -Path (Join-Path $launcherRoot "zhCN.SC2Data\LocalizedData\GameStrings.txt") -Pattern 'Alarak_TitU' -Simple
}

Test-Contains -Path $docPath -Pattern "Alarak" -Simple
Test-Contains -Path $docPath -Pattern "XMAlarak.SC2Mod" -Simple

$xmCoreUserData = Join-Path $xmCore "Base.SC2Data\GameData\UserData.xml"
if (Test-Path -LiteralPath $xmCoreUserData) {
    if (Select-String -LiteralPath $xmCoreUserData -Pattern 'Upgrade Upgrade="AlarakLightningStrikes"' -SimpleMatch -Quiet) {
        Add-Error "CommanderAch/Alarak still points to obsolete upgrade id AlarakLightningStrikes in $xmCoreUserData"
    }
    foreach ($obsoleteMastery in @(
        'Upgrade Upgrade="MasteryAlarakAbilityDamage"',
        'Upgrade Upgrade="MasteryAlarakDeathfleetCooldown"',
        'Upgrade Upgrade="MasteryAlarakChronoBoostEfficiency"',
        'Upgrade Upgrade="MasteryAlarakStructureOverchargeShieldAndAttackSpeed"',
        'Upgrade Upgrade="MasteryAlarakAttackSpeed"'
    )) {
        if (Select-String -LiteralPath $xmCoreUserData -Pattern $obsoleteMastery -SimpleMatch -Quiet) {
            Add-Error "CommanderAch/Alarak still points to obsolete mastery id $obsoleteMastery in $xmCoreUserData"
        }
    }
}

if ($errors.Count -gt 0) {
    $errors | ForEach-Object { Write-Host $_ }
    throw "Alarak port validation failed with $($errors.Count) issue(s)."
}

if (-not $RequireLauncherCandidate) {
    $launcherUserData = Join-Path $launcherRoot "Base.SC2Data\GameData\UserData.xml"
    $launcherHasCandidate = $false
    if (Test-Path -LiteralPath $launcherUserData) {
        $launcherHasCandidate = Select-String -LiteralPath $launcherUserData -Pattern 'String="Alarak"' -SimpleMatch -Quiet
    }
    if (-not $launcherHasCandidate) {
        Write-Host "NOTE: LauncherAuto.SC2Map does not currently expose an Alarak candidate."
    }
}

Write-Host "Alarak port validation passed."
