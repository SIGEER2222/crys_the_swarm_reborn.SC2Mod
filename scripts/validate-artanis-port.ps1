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
$xmArtanis = Join-Path $xmRoot "XMArtanis.SC2Mod"
$docPath = Join-Path $projectRoot.FullName "docs\指挥官\Artanis\当前状态.md"

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

function Test-ArtanisLauncherCandidate {
    param([switch]$Required)

    $sourceLauncherFiles = @(
        @{ Path = Join-Path $projectRoot.FullName "tools\launcher_mpq\MapScript.galaxy"; Pattern = 'gv_commanderNum = 12'; Label = 'launcher source Artanis loop max index' },
        @{ Path = Join-Path $projectRoot.FullName "tools\launcher_mpq\Base.SC2Data\GameData\UserData.xml"; Pattern = 'Count="13"'; Label = 'launcher source Artanis candidate count' },
        @{ Path = Join-Path $projectRoot.FullName "tools\launcher_mpq\Base.SC2Data\GameData\UserData.xml"; Pattern = 'String="Artanis"'; Label = 'launcher source Artanis commander id' },
        @{ Path = Join-Path $projectRoot.FullName "tools\launcher_mpq\Base.SC2Data\GameData\UserData.xml"; Pattern = 'ID_Por_012'; Label = 'launcher source Artanis portrait text link' },
        @{ Path = Join-Path $projectRoot.FullName "tools\launcher_mpq\Base.SC2Data\GameData\UserData.xml"; Pattern = 'ui_btn_commanderportrait_artanis.dds'; Label = 'launcher source Artanis button image link' },
        @{ Path = Join-Path $projectRoot.FullName "tools\launcher_mpq\zhCN.SC2Data\LocalizedData\GameStrings.txt"; Pattern = 'UserData/CommanderPreset/ID_Por_012='; Label = 'launcher source Artanis portrait string' }
    )

    foreach ($check in $sourceLauncherFiles) {
        if (-not (Test-Path -LiteralPath $check.Path) -or -not (Select-String -LiteralPath $check.Path -Pattern $check.Pattern -SimpleMatch -Quiet)) {
            if ($Required) {
                Add-Error "$($check.Label) missing pattern '$($check.Pattern)'"
            }
            else {
                Write-Host "NOTE: $($check.Label) is not present in tools\launcher_mpq."
            }
            return
        }
    }

    if (-not (Test-Path -LiteralPath (Join-Path $xmCore "Assets\Textures\ui_btn_commanderportrait_artanis.dds"))) {
        Add-Error "XMCore Artanis portrait asset is missing"
    }

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

    $tempRoot = Join-Path ([IO.Path]::GetTempPath()) ("artanis-launcher-validate-" + [Guid]::NewGuid().ToString("N"))
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
            @{ Path = Join-Path $extractRoot "MapScript.galaxy"; Pattern = 'gv_commanderNum = 12'; Label = 'packed Launcher Artanis loop max index' },
            @{ Path = Join-Path $extractRoot "Base.SC2Data\GameData\UserData.xml"; Pattern = 'Count="13"'; Label = 'packed Launcher Artanis candidate count' },
            @{ Path = Join-Path $extractRoot "Base.SC2Data\GameData\UserData.xml"; Pattern = 'String="Artanis"'; Label = 'packed Launcher Artanis commander id' },
            @{ Path = Join-Path $extractRoot "Base.SC2Data\GameData\UserData.xml"; Pattern = 'ID_Por_012'; Label = 'packed Launcher Artanis portrait text link' },
            @{ Path = Join-Path $extractRoot "Base.SC2Data\GameData\UserData.xml"; Pattern = 'ui_btn_commanderportrait_artanis.dds'; Label = 'packed Launcher Artanis button image link' },
            @{ Path = Join-Path $extractRoot "zhCN.SC2Data\LocalizedData\GameStrings.txt"; Pattern = 'UserData/CommanderPreset/ID_Por_012='; Label = 'packed Launcher Artanis portrait string' }
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
    }
    finally {
        if (Test-Path -LiteralPath $tempRoot) {
            Remove-Item -LiteralPath $tempRoot -Recurse -Force
        }
    }
}

if (-not (Test-Path -LiteralPath $xmArtanis)) {
    Add-Error "Missing XMArtanis module: $xmArtanis"
}

foreach ($xmlPath in Get-ChildItem -LiteralPath (Join-Path $xmArtanis "Base.SC2Data\GameData") -Filter "*.xml") {
    [xml](Get-Content -LiteralPath $xmlPath.FullName -Raw) | Out-Null
}
[xml](Get-Content -LiteralPath (Join-Path $xmCore "Base.SC2Data\GameData\UserData.xml") -Raw) | Out-Null

$unitData = Join-Path $xmArtanis "Base.SC2Data\GameData\UnitData.xml"
foreach ($unitId in @(
    "Nexus", "Probe", "Pylon", "Gateway", "CyberneticsCore", "RoboticsFacility", "Stargate",
    "SoACasterArtanis", "ZealotAiur", "Dragoon", "HighTemplar", "ImmortalAiur", "Reaver",
    "PhoenixAiur", "Tempest", "CarrierAiur", "SMX2ProtossArtanis"
)) {
    Test-Contains -Path $unitData -Pattern "id=`"$unitId`"" -Simple
}
foreach ($pattern in @(
    '<CUnit id="SMX2ProtossArtanis" parent="Zealot">',
    '<Attributes index="Heroic" value="1" />',
    '<BehaviorArray Link="AllUnitBehaviorController" />',
    '<LayoutButtons Face="SOAHeroicShield" Type="Passive" Requirements="HaveSOAHeroicShield"'
)) {
    Test-Contains -Path $unitData -Pattern $pattern -Simple
}

$abilData = Join-Path $xmArtanis "Base.SC2Data\GameData\AbilData.xml"
foreach ($abilId in @(
    "SOAPylonPower", "SOAStrafeAttackActivate", "CommanderPrestigeArtanisOrbitalStrikeShieldOverchargeTargeted"
)) {
    Test-Contains -Path $abilData -Pattern "id=`"$abilId`"" -Simple
}

$buttonData = Join-Path $xmArtanis "Base.SC2Data\GameData\ButtonData.xml"
foreach ($buttonId in @(
    "SOAPylonPower", "SOAOrbitalStrike", "SOAStrafeAttack", "SOASuperShield",
    "ResearchReaverIncreasedScarabCount", "ResearchTempestDisintegration", "Tempest"
)) {
    Test-Contains -Path $buttonData -Pattern "id=`"$buttonId`"" -Simple
}

$upgradeData = Join-Path $xmArtanis "Base.SC2Data\GameData\UpgradeData.xml"
foreach ($upgradeId in @(
    "ArtanisCommander", "SOAOrbitalStrike", "SOAHeroicShield", "SOAWarpTech", "SOAWarpGateCharges",
    "ArtanisUnlockHighArchon", "ArtanisUnlockReaver", "ArtanisUnlockTempest",
    "MasteryArtanisShieldOvercharge", "MasteryArtanisShieldOverchargeCDR",
    "MasteryArtanisSoAPowerFieldHaste", "MasteryArtanisWarpChargeCooldown",
    "MasteryArtanisGuardianShellHeal", "MasteryArtanisStartingAndMaxSoAEnergy"
)) {
    Test-Contains -Path $upgradeData -Pattern "id=`"$upgradeId`"" -Simple
}

$behaviorData = Join-Path $xmArtanis "Base.SC2Data\GameData\BehaviorData.xml"
foreach ($pattern in @(
    '<CBehaviorBuff id="SOAHeroicShieldImmunity">',
    '<Duration value="5" />',
    '<StateFlags index="Invulnerable" value="1" />',
    '<ExpireEffect value="SOAHeroicShieldWeaknessApply" />',
    '<CBehaviorBuff id="SOARecallOnDeath">',
    '<DamageResponse Fatal="1" Handled="SOARecallOnDeathSearch" ModifyFraction="0">'
)) {
    Test-Contains -Path $behaviorData -Pattern $pattern -Simple
}

$effectData = Join-Path $xmArtanis "Base.SC2Data\GameData\EffectData.xml"
foreach ($pattern in @(
    '<CaseArray Validator="OnDeathArtanisGuardianShell" Effect="SOAHeroicShieldInvulnerableApply" />',
    '<CEffectApplyBehavior id="SOAHeroicShieldInvulnerableApply">',
    '<Behavior value="SOAHeroicShieldImmunity" />',
    '<CEffectApplyBehavior id="SOAHeroicShieldWeaknessApply">',
    '<Behavior value="SOAHeroicShieldWeakness" />'
)) {
    Test-Contains -Path $effectData -Pattern $pattern -Simple
}

$actorData = Join-Path $xmArtanis "Base.SC2Data\GameData\ActorData.xml"
foreach ($pattern in @(
    '<CActorUnit id="SMX2ProtossArtanis"',
    '<HeroIcon value="Assets\Textures\btn-unit-protoss-artanishero.dds" />',
    '<Wireframe>',
    '<StatusBarFlags index="Life" value="1" />'
)) {
    Test-Contains -Path $actorData -Pattern $pattern -Simple
}

$validatorData = Join-Path $xmArtanis "Base.SC2Data\GameData\ValidatorData.xml"
foreach ($pattern in @(
    '<CombineArray value="OnDeathArtanisGuardianShell" />',
    '<CValidatorPlayerRequirement id="IsArtanisCoopCommander">',
    '<Value value="HaveCoopArtanisUpgrade" />'
)) {
    Test-Contains -Path $validatorData -Pattern $pattern -Simple
}

$requirementData = Join-Path $xmArtanis "Base.SC2Data\GameData\RequirementData.xml"
foreach ($requirementId in @(
    "HaveCoopArtanisUpgrade", "HaveSOAOrbitalStrikeUpgrade", "ArtanisLevel10",
    "HaveMasteryArtanisShieldOverchargeDurationandStrength", "HaveMasteryArtanisSoAPowerFieldWarpInHaste"
)) {
    Test-Contains -Path $requirementData -Pattern "id=`"$requirementId`"" -Simple
}

Test-Contains -Path (Join-Path $xmArtanis "Base.SC2Data\GameData\CommanderData.xml") -Pattern '<CCommander id="Artanis">' -Simple
Test-Contains -Path (Join-Path $xmArtanis "Base.SC2Data\GameData\UserData.xml") -Pattern '<Instances Id="ProtossArtanis">' -Simple
Test-Contains -Path (Join-Path $xmArtanis "Base.SC2Data\GameData\UserData.xml") -Pattern 'SOAOrbitalStrikeActivate' -Simple
Test-Contains -Path (Join-Path $xmArtanis "DocumentInfo") -Pattern 'file:Mods\XM\XMCore.SC2Mod' -Simple

$xmCoreUserData = Join-Path $xmCore "Base.SC2Data\GameData\UserData.xml"
Test-Contains -Path $xmCoreUserData -Pattern '<Instances Id="Artanis">' -Simple
foreach ($pattern in @(
    'Unit Unit="Nexus"',
    'Unit Unit="Probe"',
    'Unit Unit="Pylon"',
    'Upgrade Upgrade="ArtanisCommander"',
    'Upgrade Upgrade="SOAOrbitalStrike"',
    'Upgrade Upgrade="SOAHeroicShield"',
    'Upgrade Upgrade="SOAWarpTech"',
    'Upgrade Upgrade="SOAWarpGateCharges"',
    'Upgrade Upgrade="ArtanisUnlockHighArchon"',
    'Upgrade Upgrade="ArtanisUnlockReaver"',
    'Upgrade Upgrade="ArtanisUnlockTempest"',
    'Upgrade Upgrade="MasteryArtanisShieldOvercharge"',
    'Upgrade Upgrade="MasteryArtanisStartingAndMaxSoAEnergy"'
)) {
    Test-Contains -Path $xmCoreUserData -Pattern $pattern -Simple
}

Test-Contains -Path (Join-Path $xmCore "Base.SC2Data\Lib67C0F0E7.galaxy") -Pattern 'auto1CC9623D_val == "Artanis"' -Simple
Test-Contains -Path (Join-Path $xmCore "Base.SC2Data\Lib67C0F0E7.galaxy") -Pattern 'lib67C0F0E7_gf_CU_GPInitProtoss(lp_player)' -Simple
Test-Contains -Path (Join-Path $xmCore "Base.SC2Data\Lib67C0F0E7_h.galaxy") -Pattern 'lib67C0F0E7_gf_CU_GPInitProtoss' -Simple

$xmFinalGalaxy = Join-Path $xmFinal "Base.SC2Data\LibE0EAE146.galaxy"
$xmFinalHeaderGalaxy = Join-Path $xmFinal "Base.SC2Data\LibE0EAE146_h.galaxy"
foreach ($pattern in @(
    'libE0EAE146_gf_ApplyArtanisCommanderRuntime',
    'ProtossArtanis',
    'libE0EAE146_gv_commander == "Artanis"',
    'autoC0933116_val == "Artanis"',
    'ConsoleProtoss_Classic',
    'auto09490B45_val == "Artanis"',
    'SoACasterArtanis',
    'SMX2ProtossArtanis',
    'lib67C0F0E7_gf_CU_GPInit(1, "Artanis"',
    'ArtanisCommander',
    'libE0EAE146_gf_ArtanisCreateMapStartSquad',
    'libE0EAE146_gf_ArtanisCreateCargoSquad'
)) {
    Test-Contains -Path $xmFinalGalaxy -Pattern $pattern -Simple
}
Test-Contains -Path $xmFinalHeaderGalaxy -Pattern 'libE0EAE146_gf_ApplyArtanisCommanderRuntime' -Simple
Test-Contains -Path $xmFinalHeaderGalaxy -Pattern 'libE0EAE146_gf_ArtanisCreateMapStartSquad' -Simple
Test-Contains -Path $xmFinalHeaderGalaxy -Pattern 'libE0EAE146_gf_ArtanisCreateCargoSquad' -Simple

foreach ($mapCheck in @(
    @{ File = "thanson01.SC2Map\MapScript.galaxy"; Pattern = 'ArtanisCreateCargoSquad(UnitFromId(290), "hero")' },
    @{ File = "thanson02.SC2Map\MapScript.galaxy"; Pattern = 'ArtanisCreateMapStartSquad("hero", 1, PointFromId(930))' },
    @{ File = "thorner02.SC2Map\MapScript.galaxy"; Pattern = 'ArtanisCreateCargoSquad(UnitLastCreated(), "hero")' },
    @{ File = "thorner03.SC2Map\MapScript.galaxy"; Pattern = 'ArtanisCreateMapStartSquad("hero", 1, UnitGetPosition(UnitFromId(4)))' },
    @{ File = "thorner05s.SC2Map\MapScript.galaxy"; Pattern = 'ArtanisCreateMapStartSquad("heavy", 1, PointFromId(163))' },
    @{ File = "traynor01.SC2Map\MapScript.galaxy"; Pattern = 'ArtanisCreateMapStartSquad("light", gv_p1_USER, PointFromId(415))' },
    @{ File = "ttosh03b.SC2Map\MapScript.galaxy"; Pattern = 'ArtanisCreateMapStartSquad("heavy", 1, PointFromId(29))' },
    @{ File = "ttychus02.SC2Map\MapScript.galaxy"; Pattern = 'ArtanisCreateCargoSquad(UnitLastCreated(), "heavy")' },
    @{ File = "ttychus03.SC2Map\MapScript.galaxy"; Pattern = 'ArtanisCreateMapStartSquad("air", gv_p01_USER, PointFromId(618516690))' },
    @{ File = "ttychus04.SC2Map\MapScript.galaxy"; Pattern = 'ArtanisCreateMapStartSquad("air", 1, PointFromId(394))' },
    @{ File = "ttychus05.SC2Map\MapScript.galaxy"; Pattern = 'ArtanisCreateMapStartSquad("air", 1, PointFromId(1709600040))' },
    @{ File = "tvalerian01.SC2Map\MapScript.galaxy"; Pattern = 'ArtanisCreateMapStartSquad("heavy", gv_p12_MOEBIUS, PointFromId(385406063))' }
)) {
    Test-Contains -Path (Join-Path $mapsRoot $mapCheck.File) -Pattern $mapCheck.Pattern -Simple
}

Test-Contains -Path (Join-Path $xmCore "zhCN.SC2Data\LocalizedData\GameStrings.txt") -Pattern 'UserData/CommanderAch/Artanis_TitU=' -Simple
Test-Contains -Path (Join-Path $xmArtanis "zhCN.SC2Data\LocalizedData\GameStrings.txt") -Pattern 'UserData/CommanderAch/Artanis_TitU=' -Simple
Test-Contains -Path (Join-Path $xmArtanis "zhCN.SC2Data\LocalizedData\GameStrings.txt") -Pattern 'UserData/PlayerCommanders/ProtossArtanis_Name=阿塔尼斯' -Simple
Test-Contains -Path (Join-Path $xmArtanis "zhCN.SC2Data\LocalizedData\GameStrings.txt") -Pattern 'Unit/Name/SMX2ProtossArtanis=阿塔尼斯英雄' -Simple

if ($RequireXMFinalDependency) {
    Test-Contains -Path (Join-Path $xmFinal "DocumentInfo") -Pattern 'file:Mods\XM\XMArtanis.SC2Mod' -Simple
    $headerBytes = [IO.File]::ReadAllBytes((Join-Path $xmFinal "DocumentHeader"))
    $headerText = [Text.Encoding]::UTF8.GetString($headerBytes)
    if ($headerText -notmatch [regex]::Escape('file:Mods\XM\XMArtanis.SC2Mod')) {
        Add-Error "XMFinal DocumentHeader does not contain XMArtanis dependency"
    }
}

Test-ArtanisLauncherCandidate -Required:$RequireLauncherCandidate

Test-Contains -Path $docPath -Pattern "XMArtanis.SC2Mod" -Simple
Test-Contains -Path $docPath -Pattern "SoACasterArtanis" -Simple

if ($errors.Count -gt 0) {
    Write-Error (($errors | ForEach-Object { "- $_" }) -join "`n")
}

Write-Host "Artanis port validation passed."
