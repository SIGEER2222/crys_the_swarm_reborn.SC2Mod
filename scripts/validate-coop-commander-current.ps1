param(
    [string]$WorkspaceRoot = (Split-Path -Parent $PSScriptRoot),
    [Parameter(Mandatory)]
    [string]$Commander,
    [switch]$RequireLauncherCandidate,
    [switch]$RequireXMFinalDependency
)

$ErrorActionPreference = "Stop"

function New-CommanderConfig {
    param(
        [string]$Module,
        [string[]]$RuntimePatterns,
        [string[]]$ModulePatterns,
        [string[]]$CorePatterns,
        [string[]]$LocalizedPatterns,
        [string]$OfficialDir,
        [string]$LauncherPortraitKey,
        [string]$LauncherPortraitImage,
        [string]$MasteryUserDataOwner = "Core",
        [switch]$SkipLauncher
    )

    @{
        Module                = $Module
        RuntimePatterns       = @($RuntimePatterns)
        ModulePatterns        = @($ModulePatterns)
        CorePatterns          = @($CorePatterns)
        LocalizedPatterns     = @($LocalizedPatterns)
        OfficialDir           = $OfficialDir
        LauncherPortraitKey   = $LauncherPortraitKey
        LauncherPortraitImage = $LauncherPortraitImage
        MasteryUserDataOwner  = $MasteryUserDataOwner
        SkipLauncher          = [bool]$SkipLauncher
    }
}

$commanderConfigs = @{
    "Abathur" = New-CommanderConfig `
        -Module "XMAbathur.SC2Mod" `
        -OfficialDir "Abathur" `
        -LauncherPortraitKey "ID_Por_015" `
        -LauncherPortraitImage "ui_btn_commanderportrait_abathur.dds" `
        -RuntimePatterns @(
            'libE0EAE146_gf_CommanderPanelInit("CoopCasterAbathur", "Abathur")',
            'libE0EAE146_gf_AbathurCreateMapStartSquad',
            'libE0EAE146_gf_AbathurCreateCargoSquad'
        ) `
        -ModulePatterns @(
            '<Instances Id="Abathur">',
            'CoopCasterAbathur',
            'BiomassPickup',
            'AbathurCollectBiomass',
            'RavagerAbathur'
        ) `
        -CorePatterns @() `
        -LocalizedPatterns @(
            'UserData/CommanderAch/Abathur_TitU='
        ) `
        -MasteryUserDataOwner "Module"
    "AbathurReborn" = New-CommanderConfig `
        -Module "XMAbathurReborn.SC2Mod" `
        -SkipLauncher `
        -RuntimePatterns @(
            'libE0EAE146_gf_CommanderPanelInit("CoopCasterAbathurReborn", "AbathurReborn")',
            'libE0EAE146_gf_AbathurCreateMapStartSquad',
            'libE0EAE146_gf_AbathurCreateCargoSquad'
        ) `
        -ModulePatterns @(
            'ImpalerAbathur',
            'RavagerAbathur'
        ) `
        -CorePatterns @() `
        -LocalizedPatterns @(
            'Unit/Name/ImpalerAbathur=',
            'Unit/Name/RavagerAbathur='
        )
    "Alarak" = New-CommanderConfig `
        -Module "XMAlarak.SC2Mod" `
        -OfficialDir "Alarak" `
        -SkipLauncher `
        -RuntimePatterns @(
            'else if (auto09490B45_val == "Alarak")',
            'libNtve_gf_CreateUnitsWithDefaultFacing(1, "CoopCasterAlarak"',
            'lib67C0F0E7_gf_CU_GPInit(1, "Alarak"',
            'libNtve_gf_CreateUnitsWithDefaultFacing(1, "AlarakCoop"',
            'libE0EAE146_gf_AlarakCreateMapStartSquad',
            'libE0EAE146_gf_AlarakCreateCargoSquad'
        ) `
        -ModulePatterns @(
            'CoopCasterAlarak',
            'AlarakCoop',
            'Supplicant',
            'Monitor',
            'HighTemplarTaldarim',
            'ImmortalTaldarim'
        ) `
        -CorePatterns @(
            '<Instances Id="Alarak">'
        ) `
        -LocalizedPatterns @(
            'UserData/CommanderAch/Alarak_TitU='
        )
    "Artanis" = New-CommanderConfig `
        -Module "XMArtanis.SC2Mod" `
        -OfficialDir "Artanis" `
        -LauncherPortraitKey "ID_Por_012" `
        -LauncherPortraitImage "ui_btn_commanderportrait_artanis.dds" `
        -RuntimePatterns @(
            'libE0EAE146_gf_CommanderPanelInit("SoACasterArtanis", "Artanis")',
            'libE0EAE146_gf_ArtanisCreateMapStartSquad',
            'libE0EAE146_gf_ArtanisCreateCargoSquad'
        ) `
        -ModulePatterns @(
            'SoACasterArtanis',
            'ZealotAiur',
            'Dragoon',
            'Reaver',
            'Tempest'
        ) `
        -CorePatterns @(
            '<Instances Id="Artanis">'
        ) `
        -LocalizedPatterns @(
            'UserData/CommanderAch/Artanis_TitU='
        )
    "Fenix" = New-CommanderConfig `
        -Module "XMFenix.SC2Mod" `
        -OfficialDir "Fenix" `
        -LauncherPortraitKey "ID_Por_009" `
        -LauncherPortraitImage "ui_btn_commanderportrait_fenix.dds" `
        -RuntimePatterns @(
            'libE0EAE146_gf_CommanderPanelInit("SoACasterFenix", "Fenix")',
            'libE0EAE146_gf_FenixCreateMapStartSquad',
            'libE0EAE146_gf_FenixCreateCargoSquad'
        ) `
        -ModulePatterns @(
            'SoACasterFenix',
            'FenixCoop',
            'FenixKaldalisZealot',
            'FenixClolarionCarrier',
            'MasteryFenixExtraStartingSupply'
        ) `
        -CorePatterns @(
            '<Instances Id="Fenix">'
        ) `
        -LocalizedPatterns @(
            'UserData/CommanderAch/Fenix_TitU='
        )
    "Karax" = New-CommanderConfig `
        -Module "XMKarax.SC2Mod" `
        -OfficialDir "Karax" `
        -LauncherPortraitKey "ID_Por_013" `
        -LauncherPortraitImage "ui_btn_commanderportrait_karax.dds" `
        -RuntimePatterns @(
            'libE0EAE146_gf_CommanderPanelInit("SoACasterKarax", "Karax")',
            'libE0EAE146_gf_KaraxCreateMapStartSquad',
            'libE0EAE146_gf_KaraxCreateCargoSquad'
        ) `
        -ModulePatterns @(
            'SoACasterKarax',
            'SolarForge',
            'KhaydarinMonolith',
            'EnergizerReclamation',
            'SOARepairBeam'
        ) `
        -CorePatterns @(
            '<Instances Id="Karax">'
        ) `
        -LocalizedPatterns @(
            'UserData/CommanderAch/Karax_TitU='
        )
    "Kerrigan" = New-CommanderConfig `
        -Module "XMKerrigan.SC2Mod" `
        -OfficialDir "Kerrigan" `
        -LauncherPortraitKey "ID_Por_017" `
        -LauncherPortraitImage "ui_btn_commanderportrait_kerrigan.dds" `
        -RuntimePatterns @(
            'else if (auto09490B45_val == "Kerrigan")',
            'TechTreeUpgradeAddLevel(1, "KerriganCommander", 1);',
            'libNtve_gf_CreateUnitsWithDefaultFacing(1, "K5Kerrigan"',
            'libE0EAE146_gf_KerriganCreateMapStartSquad',
            'libE0EAE146_gf_KerriganCreateCargoSquad'
        ) `
        -ModulePatterns @(
            'K5Kerrigan',
            'HotSRaptor',
            'QueenCoop',
            'MorphHydraliskToLurker',
            'LurkerDenResearch',
            'KerriganVoidCoopCrushingGripWave'
        ) `
        -CorePatterns @(
            '<Instances Id="Kerrigan">'
        ) `
        -LocalizedPatterns @(
            'UserData/CommanderAch/Kerrigan_TitU='
        )
    "Raynor" = New-CommanderConfig `
        -Module "XMRaynor.SC2Mod" `
        -OfficialDir "Raynor" `
        -LauncherPortraitKey "ID_Por_008" `
        -LauncherPortraitImage "ui_btn_commanderportrait_raynor.dds" `
        -RuntimePatterns @(
            'libE0EAE146_gf_CommanderPanelInit("CoopCasterRaynor", "Raynor")',
            'libE0EAE146_gf_RaynorCreateMapStartSquad',
            'libE0EAE146_gf_RaynorCreateCargoSquad'
        ) `
        -ModulePatterns @(
            'CoopCasterRaynor',
            'HyperionVoidCoop',
            'DuskWing',
            'Battlecruiser',
            'MasteryRaynorResearchCost',
            'MasteryRaynorMedicSecondaryHeal'
        ) `
        -CorePatterns @(
            '<Instances Id="Raynor">'
        ) `
        -LocalizedPatterns @(
            'UserData/CommanderAch/Raynor_TitU='
        )
    "Vorazun" = New-CommanderConfig `
        -Module "XMVorazun.SC2Mod" `
        -OfficialDir "Vorazun" `
        -LauncherPortraitKey "ID_Por_011" `
        -LauncherPortraitImage "vorazun" `
        -RuntimePatterns @(
            'libE0EAE146_gf_CommanderPanelInit("SoACasterVorazun", "Vorazun")',
            'libE0EAE146_gf_VorazunCreateMapStartSquad',
            'libE0EAE146_gf_VorazunCreateCargoSquad'
        ) `
        -ModulePatterns @(
            'SoACasterVorazun',
            'CorsairMP',
            'Oracle',
            'DarkTemplarShakuras',
            'VoidPylonRecall'
        ) `
        -CorePatterns @(
            '<Instances Id="Vorazun">'
        ) `
        -LocalizedPatterns @(
            'UserData/CommanderAch/Vorazun_TitU='
        )
    "Zagara" = New-CommanderConfig `
        -Module "XMZagara.SC2Mod" `
        -OfficialDir "Zagara" `
        -LauncherPortraitKey "ID_Por_010" `
        -LauncherPortraitImage "zagara" `
        -RuntimePatterns @(
            'libE0EAE146_gf_CommanderPanelInit("CoopCasterZagara", "Zagara")',
            'libNtve_gf_CreateUnitsWithDefaultFacing(1, "ZagaraVoidCoop"',
            'libE0EAE146_gf_ZagaraCreateMapStartSquad',
            'libE0EAE146_gf_ZagaraCreateCargoSquad'
        ) `
        -ModulePatterns @(
            'ZagaraVoidCoop',
            'QueenCoop',
            'K5TwoDrones',
            'MasteryZagaraMassFrenzySpeedBoost',
            'MasteryZagaraBanelingsDamage'
        ) `
        -CorePatterns @(
            '<Instances Id="Zagara">'
        ) `
        -LocalizedPatterns @(
            'UserData/CommanderAch/Zagara_TitU='
        )
    "Zeratul" = New-CommanderConfig `
        -Module "XMZeratul.SC2Mod" `
        -OfficialDir "Zeratul" `
        -LauncherPortraitKey "ID_Por_014" `
        -LauncherPortraitImage "zeratul" `
        -RuntimePatterns @(
            'libE0EAE146_gf_CommanderPanelInit("CoopCasterZeratul", "Zeratul")',
            'libE0EAE146_gf_ZeratulCreateMapStartSquad',
            'libE0EAE146_gf_ZeratulCreateCargoSquad'
        ) `
        -ModulePatterns @(
            'CoopCasterZeratul',
            'ZeratulCoop',
            'ZeratulHeroDarkArchon',
            'ZeratulTopBarWarpTrain'
        ) `
        -CorePatterns @(
            '<Instances Id="Zeratul">'
        ) `
        -LocalizedPatterns @(
            'UserData/CommanderAch/Zeratul_TitU=',
            'UserData/PlayerCommanders/ProtossZeratul_Name='
        )
}

if (-not $commanderConfigs.ContainsKey($Commander)) {
    throw "Unsupported commander '$Commander'. Supported: $($commanderConfigs.Keys -join ', ')"
}

$projectRoot = Get-Item -LiteralPath $WorkspaceRoot
$scenarioRoot = if (Test-Path -LiteralPath (Join-Path $projectRoot.FullName "Mods\XM\XMCore.SC2Mod")) {
    $projectRoot
}
else {
    Get-ChildItem -LiteralPath $projectRoot.FullName -Directory | Where-Object {
        Test-Path -LiteralPath (Join-Path $_.FullName "Mods\XM\XMCore.SC2Mod")
    } | Select-Object -First 1
}

if (-not $scenarioRoot) {
    throw "Unable to locate scenario root containing Mods\XM\XMCore.SC2Mod under $($projectRoot.FullName)"
}

$config = $commanderConfigs[$Commander]
$xmRoot = Join-Path $scenarioRoot.FullName "Mods\XM"
$xmCore = Join-Path $xmRoot "XMCore.SC2Mod"
$xmFinal = Join-Path $xmRoot "XMFinal.SC2Mod"
$moduleRoot = Join-Path $xmRoot $config.Module
$moduleGameData = Join-Path $moduleRoot "Base.SC2Data\GameData"
$moduleXmlPaths = if (Test-Path -LiteralPath $moduleGameData) {
    @(Get-ChildItem -LiteralPath $moduleGameData -Filter "*.xml" -File -Recurse | Select-Object -ExpandProperty FullName)
}
else {
    @()
}
$allXmXmlPaths = @(Get-ChildItem -LiteralPath $xmRoot -Filter "*.xml" -File -Recurse | Select-Object -ExpandProperty FullName)
$modsStringPaths = @(Get-ChildItem -LiteralPath $xmRoot -Recurse -Filter "GameStrings.txt" -File | Select-Object -ExpandProperty FullName)
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

    $matched = if ($Simple) {
        Select-String -LiteralPath $Path -Pattern $Pattern -SimpleMatch -Quiet
    }
    else {
        Select-String -LiteralPath $Path -Pattern $Pattern -Quiet
    }

    if (-not $matched) {
        Add-Error "Missing pattern '$Pattern' in $Path"
    }
}

function Test-AnyContains {
    param(
        [string[]]$Paths,
        [string]$Pattern,
        [switch]$Simple
    )

    foreach ($path in $Paths) {
        if (-not (Test-Path -LiteralPath $path)) {
            continue
        }

        $matched = if ($Simple) {
            Select-String -LiteralPath $path -Pattern $Pattern -SimpleMatch -Quiet
        }
        else {
            Select-String -LiteralPath $path -Pattern $Pattern -Quiet
        }

        if ($matched) {
            return
        }
    }

    Add-Error "Pattern '$Pattern' was not found in any of: $($Paths -join ', ')"
}

function Test-XmlParse {
    param([string]$Path)

    if (-not (Test-Path -LiteralPath $Path)) {
        Add-Error "Missing XML file: $Path"
        return
    }

    try {
        [xml](Get-Content -LiteralPath $Path -Raw) | Out-Null
    }
    catch {
        Add-Error "Invalid XML: $Path :: $($_.Exception.Message)"
    }
}

function Get-OfficialMasteryUpgrades {
    param([string]$CommanderDir)

    if ([string]::IsNullOrWhiteSpace($CommanderDir)) {
        return @()
    }

    $progressionPath = Join-Path $projectRoot.FullName ("游戏数据\官方合作指挥官\commanders\{0}\progression.json" -f $CommanderDir)
    if (-not (Test-Path -LiteralPath $progressionPath)) {
        Add-Error "Missing official progression file: $progressionPath"
        return @()
    }

    try {
        $progression = Get-Content -LiteralPath $progressionPath -Raw | ConvertFrom-Json
    }
    catch {
        Add-Error "Failed to parse official progression JSON: $progressionPath :: $($_.Exception.Message)"
        return @()
    }

    if ($null -eq $progression.masteries) {
        return @()
    }

    return @(
        $progression.masteries |
            Where-Object { -not [string]::IsNullOrWhiteSpace($_.upgrade) } |
            ForEach-Object { $_.upgrade } |
            Select-Object -Unique
    )
}

function Test-LauncherCandidate {
    param(
        [string]$Root,
        [string]$CommanderName,
        [string]$PortraitKey,
        [string]$PortraitImage
    )

    $userDataPath = Join-Path $Root "Base.SC2Data\GameData\UserData.xml"
    $stringsPath = Join-Path $Root "zhCN.SC2Data\LocalizedData\GameStrings.txt"

    if (-not (Test-Path -LiteralPath $userDataPath)) {
        Add-Error "Missing launcher user data: $userDataPath"
        return
    }

    Test-Contains -Path $userDataPath -Pattern ("String=`"{0}`"" -f $CommanderName) -Simple

    if (-not [string]::IsNullOrWhiteSpace($PortraitKey)) {
        Test-Contains -Path $userDataPath -Pattern $PortraitKey -Simple
        Test-Contains -Path $stringsPath -Pattern ("UserData/CommanderPreset/{0}=" -f $PortraitKey) -Simple
    }

    if (-not [string]::IsNullOrWhiteSpace($PortraitImage)) {
        Test-Contains -Path $userDataPath -Pattern $PortraitImage -Simple
    }
}

if (-not (Test-Path -LiteralPath $moduleRoot)) {
    Add-Error "Missing module: $moduleRoot"
}
else {
    Test-Contains -Path (Join-Path $moduleRoot "DocumentInfo") -Pattern 'file:Mods\XM\XMCore.SC2Mod' -Simple
    foreach ($xmlPath in $moduleXmlPaths) {
        Test-XmlParse -Path $xmlPath
    }
}

$xmCoreUserData = Join-Path $xmCore "Base.SC2Data\GameData\UserData.xml"
$xmFinalGalaxy = Join-Path $xmFinal "Base.SC2Data\LibE0EAE146.galaxy"
$xmFinalHeader = Join-Path $xmFinal "Base.SC2Data\LibE0EAE146_h.galaxy"
$masteryUserDataPath = if ($config.MasteryUserDataOwner -eq "Module") {
    Join-Path $moduleRoot "Base.SC2Data\GameData\UserData.xml"
}
else {
    $xmCoreUserData
}

Test-XmlParse -Path $xmCoreUserData
if ($masteryUserDataPath -ne $xmCoreUserData) {
    Test-XmlParse -Path $masteryUserDataPath
}

foreach ($pattern in $config.RuntimePatterns) {
    Test-Contains -Path $xmFinalGalaxy -Pattern $pattern -Simple
}

$helperName = if ($Commander -eq "AbathurReborn") { "Abathur" } else { $Commander }
foreach ($headerPattern in @(
    "libE0EAE146_gf_${helperName}CreateMapStartSquad",
    "libE0EAE146_gf_${helperName}CreateCargoSquad"
)) {
    Test-Contains -Path $xmFinalHeader -Pattern $headerPattern -Simple
}

if ($RequireXMFinalDependency -or (Test-Path -LiteralPath (Join-Path $xmFinal "DocumentInfo"))) {
    Test-Contains -Path (Join-Path $xmFinal "DocumentInfo") -Pattern ("file:Mods\XM\{0}" -f $config.Module) -Simple
}

foreach ($pattern in $config.ModulePatterns) {
    Test-AnyContains -Paths $moduleXmlPaths -Pattern $pattern -Simple
}

foreach ($pattern in $config.CorePatterns) {
    Test-Contains -Path $xmCoreUserData -Pattern $pattern -Simple
}

foreach ($pattern in $config.LocalizedPatterns) {
    Test-AnyContains -Paths $modsStringPaths -Pattern $pattern -Simple
}

$officialMasteries = Get-OfficialMasteryUpgrades -CommanderDir $config.OfficialDir
foreach ($masteryUpgrade in $officialMasteries) {
    Test-Contains -Path $masteryUserDataPath -Pattern ("Upgrade Upgrade=`"{0}`"" -f $masteryUpgrade) -Simple
    Test-AnyContains -Paths $allXmXmlPaths -Pattern $masteryUpgrade -Simple
}

if ($RequireLauncherCandidate -and -not $config.SkipLauncher) {
    $launcherRoots = @(
        Join-Path $projectRoot.FullName "tools\launcher_mpq",
        Join-Path $scenarioRoot.FullName "Maps\XM\LauncherAuto.SC2Map"
    )

    foreach ($launcherRoot in $launcherRoots) {
        Test-LauncherCandidate -Root $launcherRoot -CommanderName $Commander -PortraitKey $config.LauncherPortraitKey -PortraitImage $config.LauncherPortraitImage
    }
}

if ($errors.Count -gt 0) {
    Write-Host ""
    Write-Host "Validation failed for $Commander with $($errors.Count) issue(s):"
    $errors | ForEach-Object { Write-Host "  [ERROR] $_" }
    throw "$Commander current-architecture validation failed."
}

Write-Host "$Commander current-architecture validation passed."
