$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $PSScriptRoot
$checks = @()

function Add-Check {
    param(
        [string]$Name,
        [bool]$Passed,
        [string]$Detail
    )
    $script:checks += [pscustomobject]@{
        Name   = $Name
        Passed = $Passed
        Detail = $Detail
    }
}

function Test-Contains {
    param(
        [string]$Path,
        [string]$Pattern
    )
    if (-not (Test-Path -LiteralPath $Path)) {
        return $false
    }
    return [bool](Select-String -Path $Path -Pattern $Pattern -SimpleMatch)
}

$xmCoreUserData = Join-Path $repoRoot '合作指挥官版起义狂潮\Mods\XM\XMCore.SC2Mod\Base.SC2Data\GameData\UserData.xml'
$xmCoreStrings = Join-Path $repoRoot '合作指挥官版起义狂潮\Mods\XM\XMCore.SC2Mod\zhCN.SC2Data\LocalizedData\GameStrings.txt'
$xmFinalGalaxy = Join-Path $repoRoot '合作指挥官版起义狂潮\Mods\XM\XMFinal.SC2Mod\Base.SC2Data\LibE0EAE146.galaxy'
$xmFinalHeader = Join-Path $repoRoot '合作指挥官版起义狂潮\Mods\XM\XMFinal.SC2Mod\Base.SC2Data\LibE0EAE146_h.galaxy'
$futureCommanders = Join-Path $repoRoot '合作指挥官版起义狂潮\Mods\XM\XMRaynor.SC2Mod\Base.SC2Data\GameData\commanders\futurecommanders.xml'
$xmRaynorStrings = Join-Path $repoRoot '合作指挥官版起义狂潮\Mods\XM\XMRaynor.SC2Mod\zhCN.SC2Data\LocalizedData\GameStrings.txt'
$launcherSourceUserData = Join-Path $repoRoot 'tools\launcher_mpq\Base.SC2Data\GameData\UserData.xml'
$launcherSourceScript = Join-Path $repoRoot 'tools\launcher_mpq\MapScript.galaxy'
$launcherSourceStrings = Join-Path $repoRoot 'tools\launcher_mpq\zhCN.SC2Data\LocalizedData\GameStrings.txt'
$launcherAutoUserData = Join-Path $repoRoot '合作指挥官版起义狂潮\Maps\XM\LauncherAuto.SC2Map\Base.SC2Data\GameData\UserData.xml'
$launcherAutoScript = Join-Path $repoRoot '合作指挥官版起义狂潮\Maps\XM\LauncherAuto.SC2Map\MapScript.galaxy'
$launcherAutoStrings = Join-Path $repoRoot '合作指挥官版起义狂潮\Maps\XM\LauncherAuto.SC2Map\zhCN.SC2Data\LocalizedData\GameStrings.txt'
$ttychus03 = Join-Path $repoRoot '合作指挥官版起义狂潮\Maps\XM\ttychus03.SC2Map\MapScript.galaxy'

Add-Check 'XMCore CommanderAch/Zeratul' (Test-Contains $xmCoreUserData '<Instances Id="Zeratul">') $xmCoreUserData
Add-Check 'XMCore Zeratul localized achievements' (Test-Contains $xmCoreStrings 'UserData/CommanderAch/Zeratul_TitU=') $xmCoreStrings
Add-Check 'XMFinal runtime function' (Test-Contains $xmFinalGalaxy 'void libE0EAE146_gf_ApplyZeratulCommanderRuntime ()') $xmFinalGalaxy
Add-Check 'XMFinal helper declarations' ((Test-Contains $xmFinalHeader 'libE0EAE146_gf_ZeratulCreateMapStartSquad') -and (Test-Contains $xmFinalHeader 'libE0EAE146_gf_ZeratulCreateCargoSquad')) $xmFinalHeader
Add-Check 'XMFinal initialize branch' ((Test-Contains $xmFinalGalaxy 'else if ((libE0EAE146_gv_commander == "Zeratul"))') -and (Test-Contains $xmFinalGalaxy 'CoopCasterZeratul')) $xmFinalGalaxy
Add-Check 'Official Zeratul objects imported' ((Test-Contains $futureCommanders 'CoopCasterZeratul') -and (Test-Contains $futureCommanders 'ZeratulCommander') -and (Test-Contains $futureCommanders 'ZeratulTopBarWarpTrain')) $futureCommanders
Add-Check 'XMRaynor localized commander text' ((Test-Contains $xmRaynorStrings 'UserData/PlayerCommanders/ProtossZeratul_Name=泽拉图') -and (Test-Contains $xmRaynorStrings 'Button/Tooltip/ZeratulMapWideStasis=')) $xmRaynorStrings
Add-Check 'Launcher source count' (Test-Contains $launcherSourceScript 'const int gv_commanderNum = 17;') $launcherSourceScript
Add-Check 'Launcher source candidate' ((Test-Contains $launcherSourceUserData '<String String="Zeratul">') -and (Test-Contains $launcherSourceStrings 'UserData/CommanderPreset/ID_Por_014=')) $launcherSourceUserData
Add-Check 'Launcher auto count' (Test-Contains $launcherAutoScript 'const int gv_commanderNum = 17;') $launcherAutoScript
Add-Check 'Launcher auto candidate' ((Test-Contains $launcherAutoUserData '<String String="Zeratul">') -and (Test-Contains $launcherAutoStrings 'UserData/CommanderPreset/ID_Por_014=')) $launcherAutoUserData
Add-Check 'ttychus03 Zeratul branch' (Test-Contains $ttychus03 'else if (autoBEEAC669_val == "Zeratul")') $ttychus03

$failed = $checks | Where-Object { -not $_.Passed }
$checks | ForEach-Object {
    $status = if ($_.Passed) { 'PASS' } else { 'FAIL' }
    Write-Output ("[{0}] {1} :: {2}" -f $status, $_.Name, $_.Detail)
}

if ($failed.Count -gt 0) {
    exit 1
}
