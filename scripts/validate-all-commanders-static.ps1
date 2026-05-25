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

    Test-Contains -Path $scriptPath -Pattern "const int gv_commanderNum = 18;" -Simple
    Test-XmlParse -Path $userDataPath
    Test-Contains -Path $userDataPath -Pattern '<Fields Id="Commander" Type="String" Count="19"/>' -Simple
    Test-Contains -Path $userDataPath -Pattern '<Fields Id="Por" Type="Text" Count="19"/>' -Simple
    Test-Contains -Path $userDataPath -Pattern '<Fields Id="CommanderPortrait" Type="Image" Count="19"/>' -Simple

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
        [string[]]$GameStringsPaths
    )

    Test-XmlParse -Path $UserDataPath
    if (-not (Test-Path $UserDataPath)) {
        return
    }

    $existingStringPaths = @($GameStringsPaths | Where-Object { Test-Path -LiteralPath $_ })
    if ($existingStringPaths.Count -eq 0) {
        Add-Error "Missing GameStrings files for CommanderAch localization."
        return
    }

    $keys = Select-String -Path $UserDataPath -Pattern 'Text="(UserData/CommanderAch/[^"]+)"' -AllMatches |
        ForEach-Object { $_.Matches } |
        ForEach-Object { $_.Groups[1].Value } |
        Sort-Object -Unique

    foreach ($key in $keys) {
        $found = $false
        foreach ($path in $existingStringPaths) {
            if (Select-String -LiteralPath $path -Pattern "$key=" -SimpleMatch -Quiet) {
                $found = $true
                break
            }
        }
        if (-not $found) {
            Add-Error "Missing CommanderAch localization key '$key=' in loaded GameStrings."
        }
    }
}

function Get-CommanderAchInstance {
    param(
        [string]$Commander,
        [string[]]$UserDataPaths
    )

    foreach ($path in $UserDataPaths) {
        if (-not (Test-Path -LiteralPath $path)) {
            continue
        }

        [xml]$doc = Get-Content -LiteralPath $path -Raw -Encoding UTF8
        $node = $doc.SelectSingleNode("//CUser[@id='CommanderAch']/Instances[@Id='$Commander']")
        if ($node) {
            return [pscustomobject]@{
                Path = $path
                Node = $node
            }
        }
    }

    return $null
}

function Get-CommanderAchFieldValue {
    param(
        [System.Xml.XmlElement]$Node,
        [string]$ElementName,
        [string]$ValueAttribute,
        [string]$FieldId
    )

    $fieldNode = $Node.SelectSingleNode("$ElementName[Field[@Id='$FieldId']]")
    if (-not $fieldNode) {
        return ""
    }

    return $fieldNode.GetAttribute($ValueAttribute)
}

function Test-CatalogIdExists {
    param(
        [string]$Id,
        [string[]]$CatalogPaths
    )

    if ($script:CatalogIdLookup) {
        return $script:CatalogIdLookup.ContainsKey($Id)
    }

    foreach ($path in $CatalogPaths) {
        if (Select-String -LiteralPath $path -Pattern "id=`"$Id`"" -SimpleMatch -Quiet) {
            return $true
        }
    }

    return $false
}

function Test-CommanderAchRuntimeData {
    param(
        [string]$XmRoot,
        [hashtable]$ModuleByCommander,
        [string[]]$Commanders
    )

    $catalogPaths = Get-ChildItem -LiteralPath $XmRoot -Recurse -Filter "*.xml" -File |
        Where-Object { $_.FullName -match "\\Base\.SC2Data\\GameData\\" } |
        Select-Object -ExpandProperty FullName
    $script:CatalogIdLookup = @{}
    foreach ($path in $catalogPaths) {
        $text = Get-Content -LiteralPath $path -Raw -Encoding UTF8
        foreach ($match in [regex]::Matches($text, '\bid="([^"]+)"')) {
            $script:CatalogIdLookup[$match.Groups[1].Value] = $true
        }
    }

    $coreUserData = Join-Path $XmRoot "XMCore.SC2Mod\Base.SC2Data\GameData\UserData.xml"
    foreach ($commander in $Commanders) {
        $moduleUserData = Join-Path $XmRoot ($ModuleByCommander[$commander] + ".SC2Mod\Base.SC2Data\GameData\UserData.xml")
        $instance = Get-CommanderAchInstance -Commander $commander -UserDataPaths @($coreUserData, $moduleUserData)
        if (-not $instance) {
            Add-Error "Missing CommanderAch instance for $commander in XMCore or $($ModuleByCommander[$commander])."
            continue
        }

        foreach ($field in @("CommandCenter", "Worker", "SecondUnit")) {
            $unitId = Get-CommanderAchFieldValue -Node $instance.Node -ElementName "Unit" -ValueAttribute "Unit" -FieldId $field
            if ([string]::IsNullOrWhiteSpace($unitId)) {
                Add-Error "CommanderAch/$commander missing $field in $($instance.Path)."
                continue
            }
            if (-not (Test-CatalogIdExists -Id $unitId -CatalogPaths $catalogPaths)) {
                Add-Error "CommanderAch/$commander $field points to missing Unit id '$unitId'."
            }
        }

        foreach ($field in @("Upg", "Poi")) {
            $nodes = @($instance.Node.SelectNodes("Upgrade[Field[@Id='$field']]"))
            if ($nodes.Count -eq 0) {
                Add-Error "CommanderAch/$commander missing $field upgrades in $($instance.Path)."
                continue
            }
            foreach ($node in $nodes) {
                $upgradeId = $node.GetAttribute("Upgrade")
                if ([string]::IsNullOrWhiteSpace($upgradeId)) {
                    Add-Error "CommanderAch/$commander has blank $field upgrade in $($instance.Path)."
                }
                elseif (-not (Test-CatalogIdExists -Id $upgradeId -CatalogPaths $catalogPaths)) {
                    Add-Error "CommanderAch/$commander $field points to missing Upgrade id '$upgradeId'."
                }
            }
        }
    }
}

function Test-PlayerCommanderReviveData {
    param(
        [string]$XmRoot,
        [hashtable]$ModuleByCommander,
        [string[]]$Commanders
    )

    foreach ($commander in $Commanders) {
        $moduleUserData = Join-Path $XmRoot ($ModuleByCommander[$commander] + ".SC2Mod\Base.SC2Data\GameData\UserData.xml")
        if (-not (Test-Path -LiteralPath $moduleUserData)) {
            continue
        }

        [xml]$doc = Get-Content -LiteralPath $moduleUserData -Raw -Encoding UTF8
        $instances = @($doc.SelectNodes("//CUser[@id='PlayerCommanders']/Instances"))
        foreach ($instance in $instances) {
            $instanceId = $instance.GetAttribute("Id")

            foreach ($abilNode in @($instance.SelectNodes("AbilCmd[Field[@Id='ReviveAbilityCommand']]"))) {
                $abilId = $abilNode.GetAttribute("Abil")
                if ([string]::IsNullOrWhiteSpace($abilId)) {
                    Add-Error "PlayerCommanders/$instanceId has blank ReviveAbilityCommand in $moduleUserData."
                }
                elseif (-not (Test-CatalogIdExists -Id $abilId -CatalogPaths @())) {
                    Add-Error "PlayerCommanders/$instanceId ReviveAbilityCommand points to missing Ability id '$abilId'."
                }
            }

            foreach ($linkNode in @($instance.SelectNodes("String[Field[@Id='HeroReviveLink']]"))) {
                $link = $linkNode.GetAttribute("String")
                $abilId = $link -replace '^Abil/', ''
                if ([string]::IsNullOrWhiteSpace($abilId)) {
                    Add-Error "PlayerCommanders/$instanceId has blank HeroReviveLink in $moduleUserData."
                }
                elseif (-not (Test-CatalogIdExists -Id $abilId -CatalogPaths @())) {
                    Add-Error "PlayerCommanders/$instanceId HeroReviveLink points to missing Ability id '$abilId'."
                }
            }

            foreach ($unitNode in @($instance.SelectNodes("GameLink[Field[@Id='HeroReviveUnit']]"))) {
                $unitId = $unitNode.GetAttribute("GameLink")
                if ([string]::IsNullOrWhiteSpace($unitId)) {
                    Add-Error "PlayerCommanders/$instanceId has blank HeroReviveUnit in $moduleUserData."
                }
                elseif (-not (Test-CatalogIdExists -Id $unitId -CatalogPaths @())) {
                    Add-Error "PlayerCommanders/$instanceId HeroReviveUnit points to missing Unit id '$unitId'."
                }
            }
        }
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
$xmGameStrings = Get-ChildItem -LiteralPath $xmRoot -Recurse -Filter "GameStrings.txt" -File |
    Where-Object { $_.FullName -match "\\zhCN\.SC2Data\\LocalizedData\\" } |
    Select-Object -ExpandProperty FullName
$manifestPath = Join-Path $WorkspaceRoot "docs\official-abathur-import-manifest.md"

foreach ($commander in $commanders) {
    $modulePath = Join-Path $xmRoot ($moduleByCommander[$commander] + ".SC2Mod")
    if (-not (Test-Path $modulePath)) {
        Add-Error "Missing commander module: $modulePath"
    }

}

foreach ($launcherRoot in @(
    (Join-Path $WorkspaceRoot "tools\launcher_mpq"),
    (Join-Path $WorkspaceRoot "合作指挥官版起义狂潮\Maps\XM\LauncherAuto.SC2Map")
)) {
    Test-LauncherCommanderPreset -Root $launcherRoot -Commanders $commanders
}

Test-CommanderAchLocalization -UserDataPath $xmCoreUserData -GameStringsPaths $xmGameStrings
Test-CommanderAchRuntimeData -XmRoot $xmRoot -ModuleByCommander $moduleByCommander -Commanders $commanders
Test-PlayerCommanderReviveData -XmRoot $xmRoot -ModuleByCommander $moduleByCommander -Commanders $commanders

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
