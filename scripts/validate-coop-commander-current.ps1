param(
    [string]$WorkspaceRoot = '',
    [Parameter(Mandatory)]
    [string]$Commander,
    [switch]$RequireLauncherCandidate,
    [switch]$RequireXMFinalDependency
)

$ErrorActionPreference = "Stop"

if ([string]::IsNullOrWhiteSpace($WorkspaceRoot)) {
    $scriptRoot = $PSScriptRoot
    if ([string]::IsNullOrWhiteSpace($scriptRoot) -and -not [string]::IsNullOrWhiteSpace($PSCommandPath)) {
        $scriptRoot = Split-Path -Parent $PSCommandPath
    }
    if ([string]::IsNullOrWhiteSpace($scriptRoot) -and $MyInvocation.MyCommand.Path) {
        $scriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
    }
    if ([string]::IsNullOrWhiteSpace($scriptRoot)) {
        throw "Unable to resolve script root. Pass -WorkspaceRoot explicitly."
    }
    $WorkspaceRoot = Split-Path -Parent $scriptRoot
}

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

function Resolve-ScenarioRoot {
    param([string]$Root)

    $rootItem = Get-Item -LiteralPath $Root
    if (Test-Path -LiteralPath (Join-Path $rootItem.FullName "Mods\XM\XMCore.SC2Mod")) {
        return $rootItem
    }

    foreach ($preferredName in @("合作指挥官版起义狂潮", "原始mod", "originalmod")) {
        $preferredRoot = Join-Path $rootItem.FullName $preferredName
        if (Test-Path -LiteralPath (Join-Path $preferredRoot "Mods\XM\XMCore.SC2Mod")) {
            return Get-Item -LiteralPath $preferredRoot
        }
    }

    $candidates = @(
        Get-ChildItem -LiteralPath $rootItem.FullName -Directory -ErrorAction SilentlyContinue |
            Where-Object { Test-Path -LiteralPath (Join-Path $_.FullName "Mods\XM\XMCore.SC2Mod") }
    )

    if ($candidates.Count -eq 1) {
        return $candidates[0]
    }

    if ($candidates.Count -gt 1) {
        $withoutTestBench = @(
            $candidates |
                Where-Object { -not (Test-Path -LiteralPath (Join-Path $_.FullName "Maps\XM\CommanderTestBench.SC2Map")) }
        )
        if ($withoutTestBench.Count -eq 1) {
            return $withoutTestBench[0]
        }

        $candidateList = ($candidates | Select-Object -ExpandProperty FullName) -join "; "
        throw "Multiple scenario roots found under $($rootItem.FullName). Pass a narrower -WorkspaceRoot. Candidates: $candidateList"
    }

    return $null
}

$projectRoot = Get-Item -LiteralPath $WorkspaceRoot
$scenarioRoot = Resolve-ScenarioRoot -Root $projectRoot.FullName

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
$xmFinalGalaxyPaths = @(Get-ChildItem -LiteralPath (Join-Path $xmFinal "Base.SC2Data") -Filter "*.galaxy" -File | Select-Object -ExpandProperty FullName)
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
        [switch]$Simple,
        [string]$Label = "candidate files"
    )

    if (($null -eq $Paths) -or ($Paths.Count -eq 0)) {
        Add-Error "Pattern '$Pattern' could not be validated because there are no $Label."
        return
    }

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

    $preview = ($Paths | Select-Object -First 3) -join ', '
    if ($Paths.Count -gt 3) {
        $preview += ", ..."
    }

    Add-Error "Pattern '$Pattern' was not found in $Label ($($Paths.Count) files). Sample: $preview"
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

function Test-H2CSDocumentHeaderDependency {
    param(
        [string]$Path,
        [string]$Dependency
    )

    if (-not (Test-Path -LiteralPath $Path)) {
        Add-Error "Missing DocumentHeader: $Path"
        return
    }

    try {
        $bytes = [IO.File]::ReadAllBytes($Path)
        if ($bytes.Length -lt 0x30) {
            Add-Error "DocumentHeader is too short: $Path"
            return
        }

        $magic = [Text.Encoding]::ASCII.GetString($bytes, 0, 4)
        if ($magic -ne "H2CS") {
            return
        }

        $count = [BitConverter]::ToInt32($bytes, 0x2C)
        $cursor = 0x30
        for ($i = 0; $i -lt $count; $i++) {
            $start = $cursor
            while ($cursor -lt $bytes.Length -and $bytes[$cursor] -ne 0) {
                $cursor++
            }
            if ($cursor -ge $bytes.Length) {
                Add-Error "DocumentHeader dependency table is truncated: $Path"
                return
            }

            $value = [Text.Encoding]::UTF8.GetString($bytes, $start, $cursor - $start)
            if ($value -eq $Dependency) {
                return
            }
            $cursor++
        }

        Add-Error "DocumentHeader '$Path' does not contain dependency '$Dependency'. Run scripts/sync-sc2-documentheader-deps.ps1 for XMFinal."
    }
    catch {
        Add-Error "Failed to inspect DocumentHeader '$Path': $($_.Exception.Message)"
    }
}

function Resolve-OfficialCommandersRoot {
    param([string]$Root)

    $current = Get-Item -LiteralPath $Root
    while ($current) {
        $preferred = Join-Path $current.FullName "游戏数据\官方合作指挥官\commanders"
        if (Test-Path -LiteralPath $preferred) {
            return $preferred
        }

        $ancestorCandidates = Get-ChildItem -LiteralPath $current.FullName -Directory -Recurse -ErrorAction SilentlyContinue |
            Where-Object { $_.Name -eq "commanders" }
        foreach ($candidate in $ancestorCandidates) {
            if (Test-Path -LiteralPath (Join-Path $candidate.FullName "Abathur\progression.json")) {
                return $candidate.FullName
            }
        }

        $current = $current.Parent
    }

    $candidates = Get-ChildItem -LiteralPath $Root -Directory -Recurse -ErrorAction SilentlyContinue |
        Where-Object { $_.Name -eq "commanders" }

    foreach ($candidate in $candidates) {
        if (Test-Path -LiteralPath (Join-Path $candidate.FullName "Abathur\progression.json")) {
            return $candidate.FullName
        }
    }

    return $null
}

function Get-OfficialMasteryUpgrades {
    param([string]$CommanderDir)

    if ([string]::IsNullOrWhiteSpace($CommanderDir)) {
        return @()
    }

    if ([string]::IsNullOrWhiteSpace($script:officialCommandersRoot)) {
        Add-Error "Unable to locate official commanders root under $($projectRoot.FullName)"
        return @()
    }

    $progressionPath = Join-Path $script:officialCommandersRoot ("{0}\progression.json" -f $CommanderDir)
    if (-not (Test-Path -LiteralPath $progressionPath)) {
        Add-Error "Missing official progression file: $progressionPath"
        return @()
    }

    try {
        $progression = Get-Content -LiteralPath $progressionPath -Raw -Encoding UTF8 | ConvertFrom-Json
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

$script:officialCommandersRoot = Resolve-OfficialCommandersRoot -Root $projectRoot.FullName

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
    Test-AnyContains -Paths $xmFinalGalaxyPaths -Pattern $pattern -Simple -Label "XMFinal galaxy files"
}

if ($RequireXMFinalDependency -or (Test-Path -LiteralPath (Join-Path $xmFinal "DocumentInfo"))) {
    $xmFinalDependency = "file:Mods\XM\{0}" -f $config.Module
    Test-Contains -Path (Join-Path $xmFinal "DocumentInfo") -Pattern $xmFinalDependency -Simple
    Test-H2CSDocumentHeaderDependency -Path (Join-Path $xmFinal "DocumentHeader") -Dependency $xmFinalDependency
}

foreach ($pattern in $config.ModulePatterns) {
    Test-AnyContains -Paths $moduleXmlPaths -Pattern $pattern -Simple -Label "$($config.Module) XML files"
}

foreach ($pattern in $config.CorePatterns) {
    Test-Contains -Path $xmCoreUserData -Pattern $pattern -Simple
}

foreach ($pattern in $config.LocalizedPatterns) {
    Test-AnyContains -Paths $modsStringPaths -Pattern $pattern -Simple -Label "localized string files"
}

$officialMasteries = Get-OfficialMasteryUpgrades -CommanderDir $config.OfficialDir
foreach ($masteryUpgrade in $officialMasteries) {
    Test-Contains -Path $masteryUserDataPath -Pattern ("Upgrade Upgrade=`"{0}`"" -f $masteryUpgrade) -Simple
    Test-AnyContains -Paths $allXmXmlPaths -Pattern $masteryUpgrade -Simple -Label "all XM XML files"
}

if ($RequireLauncherCandidate -and -not $config.SkipLauncher) {
    $launcherRoots = @(
        (Join-Path $projectRoot.FullName "tools\launcher_mpq"),
        (Join-Path $scenarioRoot.FullName "Maps\XM\LauncherAuto.SC2Map")
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
