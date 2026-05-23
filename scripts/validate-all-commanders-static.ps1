param(
    [string]$WorkspaceRoot = (Split-Path -Parent $PSScriptRoot)
)

$ErrorActionPreference = "Stop"

$errors = New-Object System.Collections.Generic.List[string]

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

    if (-not (Test-Path $Path)) {
        Add-Error "Missing file: $Path"
        return
    }

    $match = if ($Simple) {
        Select-String -Path $Path -Pattern $Pattern -SimpleMatch -Quiet
    }
    else {
        Select-String -Path $Path -Pattern $Pattern -Quiet
    }

    if (-not $match) {
        Add-Error "Missing pattern '$Pattern' in $Path"
    }
}

function Test-XmlParse {
    param([string]$Path)

    if (-not (Test-Path $Path)) {
        Add-Error "Missing XML file: $Path"
        return
    }

    try {
        [xml](Get-Content -Path $Path -Raw -Encoding UTF8) | Out-Null
    }
    catch {
        Add-Error "Invalid XML: $Path :: $($_.Exception.Message)"
    }
}

function Test-LauncherCommanderPreset {
    param(
        [string]$Root,
        [string[]]$Commanders
    )

    $scriptPath = Join-Path $Root "MapScript.galaxy"
    $userDataPath = Join-Path $Root "Base.SC2Data\GameData\UserData.xml"
    $gameStringsPath = Join-Path $Root "zhCN.SC2Data\LocalizedData\GameStrings.txt"

    Test-Contains -Path $scriptPath -Pattern "const int gv_commanderNum = 17;" -Simple
    Test-XmlParse -Path $userDataPath
    Test-Contains -Path $userDataPath -Pattern '<Fields Id="Commander" Type="String" Count="18"/>' -Simple
    Test-Contains -Path $userDataPath -Pattern '<Fields Id="Por" Type="Text" Count="18"/>' -Simple
    Test-Contains -Path $userDataPath -Pattern '<Fields Id="CommanderPortrait" Type="Image" Count="18"/>' -Simple

    foreach ($commander in $Commanders) {
        Test-Contains -Path $userDataPath -Pattern "<String String=`"$commander`">" -Simple
    }

    foreach ($key in @("ID_Por_015", "ID_Por_016", "ID_Por_017")) {
        Test-Contains -Path $userDataPath -Pattern "UserData/CommanderPreset/$key" -Simple
        Test-Contains -Path $gameStringsPath -Pattern "UserData/CommanderPreset/$key=" -Simple
    }

    foreach ($portrait in @(
        "Assets\Textures\ui_btn_commanderportrait_abathur.dds",
        "Assets\Textures\ui_btn_commanderportrait_alarak.dds",
        "Assets\Textures\ui_btn_commanderportrait_kerrigan.dds"
    )) {
        Test-Contains -Path $userDataPath -Pattern $portrait -Simple
        Test-Contains -Path $gameStringsPath -Pattern $portrait -Simple
    }
}

function Test-CommanderAchLocalization {
    param(
        [string]$UserDataPath,
        [string]$GameStringsPath
    )

    Test-XmlParse -Path $UserDataPath
    if (-not (Test-Path $UserDataPath) -or -not (Test-Path $GameStringsPath)) {
        if (-not (Test-Path $GameStringsPath)) {
            Add-Error "Missing GameStrings file: $GameStringsPath"
        }
        return
    }

    $keys = Select-String -Path $UserDataPath -Pattern 'Text="(UserData/CommanderAch/[^"]+)"' -AllMatches |
        ForEach-Object { $_.Matches } |
        ForEach-Object { $_.Groups[1].Value } |
        Sort-Object -Unique

    foreach ($key in $keys) {
        Test-Contains -Path $GameStringsPath -Pattern "$key=" -Simple
    }
}

$commanders = @(
    "Abathur",
    "Alarak",
    "Artanis",
    "Dehaka",
    "Fenix",
    "Karax",
    "Kerrigan",
    "Mengsk",
    "Mira",
    "Nova",
    "Raynor",
    "Stetmann",
    "Stukov",
    "Swann",
    "Tychus",
    "Vorazun",
    "Zagara",
    "Zeratul"
)

$moduleByCommander = @{
    Abathur = "XMAbathur"
    Alarak = "XMAlarak"
    Artanis = "XMArtanis"
    Dehaka = "XMDehaka"
    Fenix = "XMFenix"
    Karax = "XMKarax"
    Kerrigan = "XMKerrigan"
    Mengsk = "XMMengsk"
    Mira = "XMMira"
    Nova = "XMNova"
    Raynor = "XMRaynor"
    Stetmann = "XMStetmann"
    Stukov = "XMStukov"
    Swann = "XMSwann"
    Tychus = "XMTychus"
    Vorazun = "XMVorazun"
    Zagara = "XMZagara"
    Zeratul = "XMZeratul"
}

$xmRoot = Join-Path $WorkspaceRoot "合作指挥官版起义狂潮\Mods\XM"
$xmFinalScript = Join-Path $xmRoot "XMFinal.SC2Mod\Base.SC2Data\LibE0EAE146.galaxy"
$xmCoreUserData = Join-Path $xmRoot "XMCore.SC2Mod\Base.SC2Data\GameData\UserData.xml"
$xmCoreGameStrings = Join-Path $xmRoot "XMCore.SC2Mod\zhCN.SC2Data\LocalizedData\GameStrings.txt"
$manifestPath = Join-Path $WorkspaceRoot "docs\official-abathur-import-manifest.md"

foreach ($commander in $commanders) {
    $modulePath = Join-Path $xmRoot ($moduleByCommander[$commander] + ".SC2Mod")
    if (-not (Test-Path $modulePath)) {
        Add-Error "Missing commander module: $modulePath"
    }

    Test-Contains -Path $xmFinalScript -Pattern "`"$commander`"" -Simple
}

foreach ($launcherRoot in @(
    (Join-Path $WorkspaceRoot "tools\launcher_mpq"),
    (Join-Path $WorkspaceRoot "合作指挥官版起义狂潮\Maps\XM\LauncherAuto.SC2Map")
)) {
    Test-LauncherCommanderPreset -Root $launcherRoot -Commanders $commanders
}

Test-CommanderAchLocalization -UserDataPath $xmCoreUserData -GameStringsPath $xmCoreGameStrings

if (-not (Test-Path $manifestPath)) {
    Add-Error "Missing manifest: $manifestPath"
}
else {
    Test-Contains -Path $manifestPath -Pattern 'Disallowed source: `crys_the_swarm_reborn.SC2Mod`' -Simple
    Test-Contains -Path $manifestPath -Pattern 'Status: official SC2 export extracted from local install and imported into `XMAbathur.SC2Mod`.' -Simple
}

if ($errors.Count -gt 0) {
    $errors | ForEach-Object { Write-Host $_ }
    throw "All-commanders static validation failed with $($errors.Count) issue(s)."
}

Write-Host "All-commanders static validation passed."
