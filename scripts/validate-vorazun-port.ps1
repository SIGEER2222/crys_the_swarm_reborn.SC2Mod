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
$docPath = Join-Path $projectRoot.FullName "docs\指挥官\Vorazun\2026-05-23-初始盘点.md"

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
    Add-Error "Missing XMAlarak module used as Vorazun data owner: $xmAlarak"
}

$xmCoreUserData = Join-Path $xmCore "Base.SC2Data\GameData\UserData.xml"
$xmCoreStrings = Join-Path $xmCore "zhCN.SC2Data\LocalizedData\GameStrings.txt"
$xmFinalGalaxy = Join-Path $xmFinal "Base.SC2Data\LibE0EAE146.galaxy"
$xmAlarakUpgrade = Join-Path $xmAlarak "Base.SC2Data\GameData\UpgradeData.xml"
$xmAlarakEffect = Join-Path $xmAlarak "Base.SC2Data\GameData\EffectData.xml"
$xmAlarakBehavior = Join-Path $xmAlarak "Base.SC2Data\GameData\BehaviorData.xml"
$xmAlarakRequirement = Join-Path $xmAlarak "Base.SC2Data\GameData\RequirementData.xml"
$xmAlarakRequirementNode = Join-Path $xmAlarak "Base.SC2Data\GameData\RequirementNodeData.xml"
$xmAlarakValidator = Join-Path $xmAlarak "Base.SC2Data\GameData\ValidatorData.xml"

Test-Contains -Path $xmCoreUserData -Pattern '<Instances Id="Vorazun">' -Simple
foreach ($pattern in @(
    'Upgrade Upgrade="VorazunCommander"',
    'Upgrade Upgrade="SOARecall"',
    'Upgrade Upgrade="VoidPylonRecall"',
    'Upgrade Upgrade="DarkPylonMorph"',
    'Upgrade Upgrade="OracleWormhole"',
    'Upgrade Upgrade="OracleStasisWardUpgrade"',
    'Upgrade Upgrade="CorsairDisruptionWeb"',
    'Upgrade Upgrade="CorsairPermanentCloak"',
    'Upgrade Upgrade="MasteryVorazunStartingAndMaxSoAEnergy"',
    'Upgrade Upgrade="MasteryVorazunShadowGuardDuration"',
    'Upgrade Upgrade="MasteryVorazunDarkPylonRadius"',
    'Upgrade Upgrade="MasteryVorazunBlackHoleDuration"',
    'Upgrade Upgrade="MasteryVorazunTimeStopHaste"',
    'Upgrade Upgrade="MasteryVorazunChronoBoostSpeed"'
)) {
    Test-Contains -Path $xmCoreUserData -Pattern $pattern -Simple
}

foreach ($pattern in @(
    'UserData/CommanderAch/Vorazun_TitU=',
    'UserData/CommanderAch/Vorazun_TitP=初始与最大面板能量',
    'UserData/CommanderAch/Vorazun_TitP_001=暗影卫队持续时间',
    'UserData/CommanderAch/Vorazun_TitP_002=黑暗水晶塔半径',
    'UserData/CommanderAch/Vorazun_TitP_003=黑洞持续时间',
    'UserData/CommanderAch/Vorazun_TitP_004=时间停止强化',
    'UserData/CommanderAch/Vorazun_TitP_005=时空提速效率',
    'UserData/CommanderAch/Vorazun_DesU=启用沃拉尊合作指挥官基础升级、奈拉齐姆兵种体系和顶部面板。',
    'UserData/CommanderAch/Vorazun_DesP=提高沃拉尊顶部面板的初始与最大能量。'
)) {
    Test-Contains -Path $xmCoreStrings -Pattern $pattern -Simple
}

foreach ($pattern in @(
    'libE0EAE146_gf_ApplyVorazunCommanderRuntime',
    'lv_playerCommander = "ProtossVorazun";',
    'libE0EAE146_gf_ApplyVorazunCommanderRuntime();',
    'autoC0933116_val == "Vorazun"',
    'ConsoleProtoss_Nerazim',
    'auto09490B45_val == "Vorazun"',
    'CreateUnitsWithDefaultFacing(1, "SoACasterVorazun"',
    'libE0EAE146_gf_VorazunCreateMapStartSquad',
    'libE0EAE146_gf_VorazunCreateCargoSquad'
)) {
    Test-Contains -Path $xmFinalGalaxy -Pattern $pattern -Simple
}

foreach ($pattern in @(
    'id="MasteryVorazunStartingAndMaxSoAEnergy"',
    'id="MasteryVorazunChronoBoostSpeed"',
    'id="MasteryVorazunShadowGuardDuration"',
    'id="MasteryVorazunBlackHoleDuration"',
    'id="MasteryVorazunDarkPylonRadius"',
    'id="MasteryVorazunTimeStopHaste"'
)) {
    Test-Contains -Path $xmAlarakUpgrade -Pattern $pattern -Simple
}

foreach ($pattern in @(
    'id="MasteryVorazunStartingAndMaxSoAEnergyDisplayDummy"',
    'id="MasteryVorazunChronoBoostSpeedDisplayDummy"',
    'id="MasteryVorazunShadowGuardDurationDisplayDummy"',
    'id="MasteryVorazunBlackHoleDurationDisplayDummy"',
    'id="MasteryVorazunDarkPylonRadiusDisplayDummy"',
    'id="MasteryVorazunTimeStopHasteDisplayDummy"'
)) {
    Test-Contains -Path $xmAlarakEffect -Pattern $pattern -Simple
}

foreach ($pattern in @(
    'HaveMasteryVorazunChronoBoostSpeed',
    'HaveMasteryVorazunDarkPylonCloakRadius',
    'HaveMasteryVorazunTimeStopHaste'
)) {
    Test-Contains -Path $xmAlarakRequirement -Pattern $pattern -Simple
    Test-Contains -Path $xmAlarakValidator -Pattern $pattern -Simple
}

foreach ($pattern in @(
    'CountUpgradeMasteryVorazunChronoBoostSpeedCompleteOnly',
    'CountUpgradeMasteryVorazunDarkPylonCloakRadiusCompleteOnly',
    'CountUpgradeMasteryVorazunTimeStopHasteCompleteOnly'
)) {
    Test-Contains -Path $xmAlarakRequirementNode -Pattern $pattern -Simple
}

Test-Contains -Path $xmAlarakBehavior -Pattern 'id="TimeStopHaste"' -Simple
Test-Contains -Path $xmAlarakBehavior -Pattern 'id="VoidSentryBlackHole"' -Simple

foreach ($mapCheck in @(
    @{ Path = 'traynor01.SC2Map\MapScript.galaxy'; Pattern = 'libE0EAE146_gf_VorazunCreateMapStartSquad("light"' },
    @{ Path = 'ttosh03b.SC2Map\MapScript.galaxy'; Pattern = 'libE0EAE146_gf_VorazunCreateMapStartSquad("heavy"' },
    @{ Path = 'tvalerian01.SC2Map\MapScript.galaxy'; Pattern = 'libE0EAE146_gf_VorazunCreateMapStartSquad("heavy"' },
    @{ Path = 'thorner03.SC2Map\MapScript.galaxy'; Pattern = 'libE0EAE146_gf_VorazunCreateMapStartSquad("hero"' },
    @{ Path = 'thorner05s.SC2Map\MapScript.galaxy'; Pattern = 'libE0EAE146_gf_VorazunCreateMapStartSquad("heavy"' },
    @{ Path = 'ttychus03.SC2Map\MapScript.galaxy'; Pattern = 'libE0EAE146_gf_VorazunCreateMapStartSquad("air"' },
    @{ Path = 'ttychus04.SC2Map\MapScript.galaxy'; Pattern = 'libE0EAE146_gf_VorazunCreateMapStartSquad("air"' },
    @{ Path = 'ttychus05.SC2Map\MapScript.galaxy'; Pattern = 'libE0EAE146_gf_VorazunCreateMapStartSquad("air"' },
    @{ Path = 'thanson01.SC2Map\MapScript.galaxy'; Pattern = 'libE0EAE146_gf_VorazunCreateCargoSquad' },
    @{ Path = 'thorner02.SC2Map\MapScript.galaxy'; Pattern = 'libE0EAE146_gf_VorazunCreateCargoSquad' },
    @{ Path = 'ttychus02.SC2Map\MapScript.galaxy'; Pattern = 'libE0EAE146_gf_VorazunCreateCargoSquad' },
    @{ Path = 'thanson02.SC2Map\MapScript.galaxy'; Pattern = 'libE0EAE146_gf_VorazunCreateMapStartSquad("hero"' }
)) {
    Test-Contains -Path (Join-Path $mapsRoot $mapCheck.Path) -Pattern $mapCheck.Pattern -Simple
}

if ($RequireLauncherCandidate) {
    foreach ($launcherDir in @($launcherRoot, $launcherSourceRoot)) {
        $launcherUserData = Join-Path $launcherDir "Base.SC2Data\GameData\UserData.xml"
        $launcherStrings = Join-Path $launcherDir "zhCN.SC2Data\LocalizedData\GameStrings.txt"
        $launcherMapScript = Join-Path $launcherDir "MapScript.galaxy"

        Test-Contains -Path $launcherMapScript -Pattern 'gv_commanderNum = 12' -Simple
        Test-Contains -Path $launcherUserData -Pattern 'String="Vorazun"' -Simple
        Test-Contains -Path $launcherUserData -Pattern 'btn-commander-vorazun.dds' -Simple
        Test-Contains -Path $launcherStrings -Pattern 'UserData/CommanderPreset/ID_Por_011=<img path="Assets\Textures\btn-commander-vorazun.dds"' -Simple
    }
}

Test-Contains -Path $docPath -Pattern "Vorazun" -Simple
Test-Contains -Path $docPath -Pattern "XMFinal" -Simple

if ($errors.Count -gt 0) {
    $errors | ForEach-Object { Write-Host $_ }
    throw "Vorazun port validation failed with $($errors.Count) issue(s)."
}

if (-not $RequireLauncherCandidate) {
    Write-Host "NOTE: Launcher candidate check skipped. Use -RequireLauncherCandidate to enforce LauncherAuto.SC2Map and source launcher coverage."
}

Write-Host "Vorazun port validation passed."
