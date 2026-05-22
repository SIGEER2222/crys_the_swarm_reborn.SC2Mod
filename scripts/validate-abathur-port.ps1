param(
    [string]$WorkspaceRoot = (Split-Path -Parent $PSScriptRoot)
)

$ErrorActionPreference = "Stop"

$xmRoot = Join-Path $WorkspaceRoot "合作指挥官版起义狂潮\Mods\XM"
$xmFinal = Join-Path $xmRoot "XMFinal.SC2Mod"
$xmCore = Join-Path $xmRoot "XMCore.SC2Mod"
$xmAbathur = Join-Path $xmRoot "XMAbathur.SC2Mod"
$manifestPath = Join-Path $WorkspaceRoot "docs\official-abathur-import-manifest.md"

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
        return
    }
}

function Test-AnyContains {
    param(
        [string[]]$Paths,
        [string]$Pattern,
        [switch]$Simple
    )

    foreach ($path in $Paths) {
        if (Test-Path $path) {
            $match = if ($Simple) {
                Select-String -Path $path -Pattern $Pattern -SimpleMatch -Quiet
            }
            else {
                Select-String -Path $path -Pattern $Pattern -Quiet
            }
            if ($match) { return $true }
        }
    }

    Add-Error "Pattern '$Pattern' was not found in any of: $($Paths -join ', ')"
    return $false
}

if (-not (Test-Path $manifestPath)) {
    Add-Error "Missing manifest: $manifestPath"
}
else {
    Test-Contains -Path $manifestPath -Pattern 'Disallowed source: `crys_the_swarm_reborn.SC2Mod`' -Simple
    Test-Contains -Path $manifestPath -Pattern 'Status: official SC2 export extracted from local install and imported into `XMAbathur.SC2Mod`.' -Simple
}

Test-Contains -Path (Join-Path $xmFinal "Base.SC2Data\LibE0EAE146.galaxy") -Pattern "libE0EAE146_gf_AbathurCreateMapStartSquad" -Simple
Test-Contains -Path (Join-Path $xmFinal "Base.SC2Data\LibE0EAE146.galaxy") -Pattern "libE0EAE146_gv_abathurDebugEnabled = false" -Simple
Test-Contains -Path (Join-Path $xmFinal "Base.SC2Data\LibE0EAE146.galaxy") -Pattern "libE0EAE146_gv_allowAbathurDebugBank = false" -Simple
Test-Contains -Path (Join-Path $xmFinal "Base.SC2Data\LibE0EAE146.galaxy") -Pattern "libE0EAE146_gf_AbathurDebugIsEnabled" -Simple
Test-Contains -Path (Join-Path $xmFinal "Base.SC2Data\LibE0EAE146.galaxy") -Pattern "libE0EAE146_gf_AbathurCreateCargoSquad" -Simple
Test-Contains -Path (Join-Path $xmFinal "Base.SC2Data\LibE0EAE146.galaxy") -Pattern "libE0EAE146_gv_allowAbathurDebugBank == false" -Simple
Test-Contains -Path (Join-Path $xmFinal "Base.SC2Data\LibE0EAE146.galaxy") -Pattern "libE0EAE146_gf_AbathurDebugRefresh" -Simple

Test-Contains -Path (Join-Path $xmAbathur "Base.SC2Data\GameData\UnitData.xml") -Pattern "CoopCasterAbathur" -Simple
Test-Contains -Path (Join-Path $xmAbathur "Base.SC2Data\GameData\UnitData.xml") -Pattern "BiomassPickup" -Simple
Test-Contains -Path (Join-Path $xmAbathur "Base.SC2Data\GameData\BehaviorData.xml") -Pattern "AbathurCollectBiomass" -Simple
Test-Contains -Path (Join-Path $xmAbathur "Base.SC2Data\GameData\EffectData.xml") -Pattern "AbathurCollectBiomass" -Simple

Test-Contains -Path (Join-Path $xmCore "Base.SC2Data\GameData\UserData.xml") -Pattern '<CUser id="CommanderAch">' -Simple
Test-Contains -Path (Join-Path $xmCore "Base.SC2Data\GameData\UserData.xml") -Pattern '<Instances Id="Abathur">' -Simple
Test-Contains -Path (Join-Path $xmCore "Base.SC2Data\GameData\UserData.xml") -Pattern '<Count value="8" />' -Simple
Test-Contains -Path (Join-Path $xmCore "Base.SC2Data\GameData\UserData.xml") -Pattern '<Count value="6" />' -Simple

$requiredMaps = @(
    "traynor01",
    "ttosh03b",
    "tvalerian01",
    "thanson01",
    "thanson02",
    "thorner02",
    "thorner03",
    "thorner05s",
    "ttychus02",
    "ttychus03",
    "ttychus04",
    "ttychus05"
)

foreach ($map in $requiredMaps) {
    $path = Join-Path $WorkspaceRoot "合作指挥官版起义狂潮\Maps\XM\$map.SC2Map\MapScript.galaxy"
    Test-Contains -Path $path -Pattern '== "Abathur"' -Simple
}

Test-Contains -Path (Join-Path $WorkspaceRoot "合作指挥官版起义狂潮\Maps\XM\traynor01.SC2Map\MapScript.galaxy") -Pattern 'libE0EAE146_gf_AbathurDebugIsEnabled() == true' -Simple
Test-Contains -Path (Join-Path $WorkspaceRoot "合作指挥官版起义狂潮\Maps\XM\traynor01.SC2Map\MapScript.galaxy") -Pattern 'XMAbathurDebug' -Simple

if ($errors.Count -gt 0) {
    $errors | ForEach-Object { Write-Host $_ }
    throw "Abathur port validation failed with $($errors.Count) issue(s)."
}

Write-Host "Abathur port validation passed."
