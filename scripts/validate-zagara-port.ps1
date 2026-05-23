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
$launcherSourceRoot = Join-Path $projectRoot.FullName "tools\launcher_mpq"
$xmFinal = Join-Path $xmRoot "XMFinal.SC2Mod"
$xmCore = Join-Path $xmRoot "XMCore.SC2Mod"
$xmAlarak = Join-Path $xmRoot "XMAlarak.SC2Mod"
$docPath = Join-Path $projectRoot.FullName "docs\指挥官\Zagara\2026-05-23-初始盘点.md"

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

if (-not (Test-Path -LiteralPath $xmAlarak)) {
    Add-Error "Missing XMAlarak module used as Zagara data owner: $xmAlarak"
}

$xmCoreUserData = Join-Path $xmCore "Base.SC2Data\GameData\UserData.xml"
$xmCoreStrings = Join-Path $xmCore "zhCN.SC2Data\LocalizedData\GameStrings.txt"
$xmFinalGalaxy = Join-Path $xmFinal "Base.SC2Data\LibE0EAE146.galaxy"
$xmAlarakUpgrade = Join-Path $xmAlarak "Base.SC2Data\GameData\UpgradeData.xml"
$xmAlarakEffect = Join-Path $xmAlarak "Base.SC2Data\GameData\EffectData.xml"
$xmAlarakBehavior = Join-Path $xmAlarak "Base.SC2Data\GameData\BehaviorData.xml"
$xmAlarakUnit = Join-Path $xmAlarak "Base.SC2Data\GameData\UnitData.xml"
$xmAlarakAbil = Join-Path $xmAlarak "Base.SC2Data\GameData\AbilData.xml"

Test-Contains -Path $xmCoreUserData -Pattern '<Instances Id="Zagara">' -Simple
foreach ($pattern in @(
    'Upgrade Upgrade="ZagaraCommander"',
    'Upgrade Upgrade="K5TwoDrones"',
    'Upgrade Upgrade="ZagaraVoidCoopAttackUpgrade"',
    'Upgrade Upgrade="ZagaraVoidCoopBanelingSpawner"',
    'Upgrade Upgrade="ZagaraBileLaunchers"',
    'Upgrade Upgrade="ZagaraGroundAttacksLevel1"',
    'Upgrade Upgrade="ZagaraGroundAttacksLevel2"',
    'Upgrade Upgrade="ZagaraGroundAttacksLevel3"',
    'Upgrade Upgrade="MasteryZagaraHealthAndEnergyRegen"',
    'Upgrade Upgrade="MasteryZagaraAutoAttackDamage"',
    'Upgrade Upgrade="MasteryZagaraMassFrenzySpeedBoost"',
    'Upgrade Upgrade="MasteryZagaraZerglingDodgeChance"',
    'Upgrade Upgrade="MasteryZagaraRoachDropDamageAndHealth"',
    'Upgrade Upgrade="MasteryZagaraBanelingsDamage"'
)) {
    Test-Contains -Path $xmCoreUserData -Pattern $pattern -Simple
}

foreach ($pattern in @(
    'UserData/CommanderAch/Zagara_TitU=',
    'UserData/CommanderAch/Zagara_TitP=生命值和能量恢复',
    'UserData/CommanderAch/Zagara_TitP_001=自动攻击伤害',
    'UserData/CommanderAch/Zagara_TitP_002=群体狂暴速度提升',
    'UserData/CommanderAch/Zagara_TitP_003=跳虫躲闪几率',
    'UserData/CommanderAch/Zagara_TitP_004=空投蟑螂伤害和生命值',
    'UserData/CommanderAch/Zagara_TitP_005=爆虫伤害'
)) {
    Test-Contains -Path $xmCoreStrings -Pattern $pattern -Simple
}

foreach ($pattern in @(
    'libE0EAE146_gf_ApplyZagaraCommanderRuntime',
    'lv_playerCommander = "ZergZagara";',
    'libE0EAE146_gf_ApplyZagaraCommanderRuntime();',
    'autoC0933116_val == "Zagara"',
    'ConsoleZerg_Zagara',
    'auto09490B45_val == "Zagara"',
    'CreateUnitsWithDefaultFacing(1, "ZagaraVoidCoop"',
    'libE0EAE146_gf_ZagaraCreateMapStartSquad',
    'libE0EAE146_gf_ZagaraCreateCargoSquad'
)) {
    Test-Contains -Path $xmFinalGalaxy -Pattern $pattern -Simple
}

foreach ($pattern in @(
    'id="ZagaraVoidCoop"',
    'id="ZagaraVoidCoopBurrowed"',
    'id="ZagaraReviveCocoon"'
)) {
    Test-Contains -Path $xmAlarakUnit -Pattern $pattern -Simple
}

foreach ($pattern in @(
    'id="ZagaraVoidCoopBanelingBarrage"',
    'id="ZagaraVoidCoopSpawnHunterKillers"',
    'id="ZagaraVoidCoopMassFrenzy"',
    'id="ZagaraVoidCoopMassRoachDrop"',
    'id="ZagaraVoidCoopTransfusionWave"',
    'id="ZagaraVoidCoopDeepTunnel"',
    'id="ZagaraVoidCoopNydusWorm"'
)) {
    Test-Contains -Path $xmAlarakAbil -Pattern $pattern -Simple
}

foreach ($pattern in @(
    'id="MasteryZagaraHealthAndEnergyRegen"',
    'id="MasteryZagaraAutoAttackDamage"',
    'id="MasteryZagaraMassFrenzySpeedBoost"',
    'id="MasteryZagaraZerglingDodgeChance"',
    'id="MasteryZagaraRoachDropDamageAndHealth"',
    'id="MasteryZagaraBanelingsDamage"'
)) {
    Test-Contains -Path $xmAlarakUpgrade -Pattern $pattern -Simple
}

foreach ($pattern in @(
    'id="MasteryZagaraHealthAndEnergyRegenDisplayDummy"',
    'id="MasteryZagaraAutoAttackDamageDisplayDummy"',
    'id="MasteryZagaraMassFrenzySpeedBoostDisplayDummy"',
    'id="MasteryZagaraZerglingDodgeChanceDisplayDummy"',
    'id="MasteryZagaraRoachDropDamageAndHealthImpactDisplayDummy"',
    'id="MasteryZagaraRoachDropDamageAndHealthLifeDisplayDummy"',
    'id="MasteryZagaraRoachDropDamageAndHealthAttackDamageDisplayDummy"',
    'id="MasteryZagaraBanelingsDamageDisplayDummy"'
)) {
    Test-Contains -Path $xmAlarakEffect -Pattern $pattern -Simple
}

Test-Contains -Path $xmAlarakBehavior -Pattern 'id="MasteryZagaraZerglingDodgeChance"' -Simple
Test-Contains -Path $xmAlarakBehavior -Pattern 'RemoveValidatorArray value="HaveMasteryZagaraZerglingDodgeChance"' -Simple

if ($RequireLauncherCandidate) {
    foreach ($launcherDir in @($launcherRoot, $launcherSourceRoot)) {
        $launcherUserData = Join-Path $launcherDir "Base.SC2Data\GameData\UserData.xml"
        $launcherStrings = Join-Path $launcherDir "zhCN.SC2Data\LocalizedData\GameStrings.txt"
        $launcherMapScript = Join-Path $launcherDir "MapScript.galaxy"

        foreach ($pattern in @(
            'gv_commanderNum = 17',
            'String="Zagara"',
            'ID_Por_010',
            'btn-commander-zagara.dds'
        )) {
            if ($pattern -eq 'gv_commanderNum = 17') {
                Test-Contains -Path $launcherMapScript -Pattern $pattern -Simple
            }
            else {
                Test-Contains -Path $launcherUserData -Pattern $pattern -Simple
            }
        }
        Test-Contains -Path $launcherStrings -Pattern 'UserData/CommanderPreset/ID_Por_010=<img path="Assets\Textures\ui_commanderportrait_zagara.dds"' -Simple
    }
}

foreach ($mapCheck in @(
    @{ Path = 'traynor01.SC2Map\MapScript.galaxy'; Pattern = 'libE0EAE146_gf_ZagaraCreateMapStartSquad("light"' },
    @{ Path = 'thorner03.SC2Map\MapScript.galaxy'; Pattern = 'CreateUnitsWithDefaultFacing(1, "ZagaraVoidCoop"' },
    @{ Path = 'ttosh03b.SC2Map\MapScript.galaxy'; Pattern = 'libE0EAE146_gf_ZagaraCreateMapStartSquad("heavy"' },
    @{ Path = 'ttychus03.SC2Map\MapScript.galaxy'; Pattern = 'libE0EAE146_gf_ZagaraCreateMapStartSquad("air"' },
    @{ Path = 'ttychus02.SC2Map\MapScript.galaxy'; Pattern = 'libE0EAE146_gf_ZagaraCreateCargoSquad' }
)) {
    Test-Contains -Path (Join-Path $mapsRoot $mapCheck.Path) -Pattern $mapCheck.Pattern -Simple
}

Test-Contains -Path $docPath -Pattern "Zagara" -Simple
Test-Contains -Path $docPath -Pattern "XMFinal" -Simple

if ($errors.Count -gt 0) {
    $errors | ForEach-Object { Write-Host $_ }
    throw "Zagara port validation failed with $($errors.Count) issue(s)."
}

if (-not $RequireLauncherCandidate) {
    Write-Host "NOTE: Launcher candidate check skipped. Use -RequireLauncherCandidate to enforce LauncherAuto.SC2Map coverage."
}

Write-Host "Zagara port validation passed."
