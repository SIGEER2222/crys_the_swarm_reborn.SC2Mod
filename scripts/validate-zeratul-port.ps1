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
$xmZeratulDocInfo = Join-Path $repoRoot '合作指挥官版起义狂潮\Mods\XM\XMZeratul.SC2Mod\DocumentInfo'
$xmZeratulAbilData = Join-Path $repoRoot '合作指挥官版起义狂潮\Mods\XM\XMZeratul.SC2Mod\Base.SC2Data\GameData\AbilData.xml'
$xmZeratulUnitData = Join-Path $repoRoot '合作指挥官版起义狂潮\Mods\XM\XMZeratul.SC2Mod\Base.SC2Data\GameData\UnitData.xml'
$xmZeratulUserData = Join-Path $repoRoot '合作指挥官版起义狂潮\Mods\XM\XMZeratul.SC2Mod\Base.SC2Data\GameData\UserData.xml'
$xmZeratulStrings = Join-Path $repoRoot '合作指挥官版起义狂潮\Mods\XM\XMZeratul.SC2Mod\zhCN.SC2Data\LocalizedData\GameStrings.txt'
$xmRaynorStrings = Join-Path $repoRoot '合作指挥官版起义狂潮\Mods\XM\XMRaynor.SC2Mod\zhCN.SC2Data\LocalizedData\GameStrings.txt'
$launcherSourceUserData = Join-Path $repoRoot 'tools\launcher_mpq\Base.SC2Data\GameData\UserData.xml'
$launcherSourceScript = Join-Path $repoRoot 'tools\launcher_mpq\MapScript.galaxy'
$launcherSourceStrings = Join-Path $repoRoot 'tools\launcher_mpq\zhCN.SC2Data\LocalizedData\GameStrings.txt'
$launcherAutoUserData = Join-Path $repoRoot '合作指挥官版起义狂潮\Maps\XM\LauncherAuto.SC2Map\Base.SC2Data\GameData\UserData.xml'
$launcherAutoScript = Join-Path $repoRoot '合作指挥官版起义狂潮\Maps\XM\LauncherAuto.SC2Map\MapScript.galaxy'
$launcherAutoStrings = Join-Path $repoRoot '合作指挥官版起义狂潮\Maps\XM\LauncherAuto.SC2Map\zhCN.SC2Data\LocalizedData\GameStrings.txt'
$ttychus03 = Join-Path $repoRoot '合作指挥官版起义狂潮\Maps\XM\ttychus03.SC2Map\MapScript.galaxy'
$xmMapsRoot = Join-Path $repoRoot '合作指挥官版起义狂潮\Maps\XM'

Add-Check 'XMCore CommanderAch/Zeratul' (Test-Contains $xmCoreUserData '<Instances Id="Zeratul">') $xmCoreUserData
Add-Check 'XMCore Zeratul localized achievements' (Test-Contains $xmCoreStrings 'UserData/CommanderAch/Zeratul_TitU=') $xmCoreStrings
Add-Check 'XMFinal runtime function' (Test-Contains $xmFinalGalaxy 'void libE0EAE146_gf_ApplyZeratulCommanderRuntime ()') $xmFinalGalaxy
Add-Check 'XMFinal helper declarations' ((Test-Contains $xmFinalHeader 'libE0EAE146_gf_ZeratulCreateMapStartSquad') -and (Test-Contains $xmFinalHeader 'libE0EAE146_gf_ZeratulCreateCargoSquad')) $xmFinalHeader
Add-Check 'XMFinal initialize branch' ((Test-Contains $xmFinalGalaxy 'else if ((libE0EAE146_gv_commander == "Zeratul"))') -and (Test-Contains $xmFinalGalaxy 'CoopCasterZeratul')) $xmFinalGalaxy
Add-Check 'Official Zeratul objects imported' ((Test-Contains $futureCommanders 'CoopCasterZeratul') -and (Test-Contains $futureCommanders 'ZeratulCommander') -and (Test-Contains $futureCommanders 'ZeratulTopBarWarpTrain')) $futureCommanders
Add-Check 'XMZeratul dependency chain' ((Test-Contains $xmZeratulDocInfo 'file:Mods\XM\XMCore.SC2Mod') -and (Test-Contains $xmZeratulDocInfo 'file:Mods\XM\XMRaynor.SC2Mod')) $xmZeratulDocInfo
Add-Check 'XMZeratul topbar abilities present' ((Test-Contains $xmZeratulAbilData 'id="ZeratulTopBarWarpTrain"') -and (Test-Contains $xmZeratulAbilData 'id="ZeratulMapWideStasisIssueOrder"') -and (Test-Contains $xmZeratulAbilData 'id="ZeratulTopBarUltimateWarpTrain"') -and (Test-Contains $xmZeratulAbilData 'id="ZeratulTopBarBuild"')) $xmZeratulAbilData
Add-Check 'XMZeratul hero shell present' ((Test-Contains $xmZeratulUnitData 'id="CoopCasterZeratul"') -and (Test-Contains $xmZeratulUnitData 'id="ZeratulCoop"') -and (Test-Contains $xmZeratulUnitData 'id="ZeratulCoopReviveBeacon"')) $xmZeratulUnitData
Add-Check 'XMZeratul commander metadata available' ((Test-Contains $xmZeratulUserData '<Instances Id="ProtossZeratul">') -or (Test-Contains $xmZeratulDocInfo 'file:Mods\XM\XMRaynor.SC2Mod')) "$xmZeratulUserData or $xmZeratulDocInfo"
Add-Check 'XMZeratul localized commander text available' ((Test-Contains $xmZeratulStrings 'UserData/PlayerCommanders/ProtossZeratul_Name=') -or (Test-Contains $xmRaynorStrings 'UserData/PlayerCommanders/ProtossZeratul_Name=泽拉图')) "$xmZeratulStrings or $xmRaynorStrings"
Add-Check 'XMRaynor localized commander text' ((Test-Contains $xmRaynorStrings 'UserData/PlayerCommanders/ProtossZeratul_Name=泽拉图') -and (Test-Contains $xmRaynorStrings 'Button/Tooltip/ZeratulMapWideStasis=')) $xmRaynorStrings
Add-Check 'Launcher source count' (Test-Contains $launcherSourceScript 'const int gv_commanderNum = 18;') $launcherSourceScript
Add-Check 'Launcher source candidate' ((Test-Contains $launcherSourceUserData '<String String="Zeratul">') -and (Test-Contains $launcherSourceStrings 'UserData/CommanderPreset/ID_Por_014=')) $launcherSourceUserData
Add-Check 'Launcher auto count' (Test-Contains $launcherAutoScript 'const int gv_commanderNum = 18;') $launcherAutoScript
Add-Check 'Launcher auto candidate' ((Test-Contains $launcherAutoUserData '<String String="Zeratul">') -and (Test-Contains $launcherAutoStrings 'UserData/CommanderPreset/ID_Por_014=')) $launcherAutoUserData
Add-Check 'Zeratul map bank override' ((Test-Contains (Join-Path $repoRoot '合作指挥官版起义狂潮\Maps\XM\tzeratul02.SC2Map\MapScript.galaxy') 'BankValueSetFromString(BankLastCreated(), "Ach", "Commander", "Zeratul");') -and (Test-Contains (Join-Path $repoRoot '合作指挥官版起义狂潮\Maps\XM\tzeratul03.SC2Map\MapScript.galaxy') 'BankValueSetFromString(BankLastCreated(), "Ach", "Commander", "Zeratul");') -and (Test-Contains (Join-Path $repoRoot '合作指挥官版起义狂潮\Maps\XM\tzeratul04.SC2Map\MapScript.galaxy') 'BankValueSetFromString(BankLastCreated(), "Ach", "Commander", "Zeratul");')) 'tzeratul02/03/04 map init'
Add-Check 'ttosh02 loads XMZeratul and forces commander' ((Test-Contains (Join-Path $repoRoot '合作指挥官版起义狂潮\Maps\XM\ttosh02.SC2Map\DocumentInfo') 'file:Mods\XM\XMZeratul.SC2Mod') -and (Test-Contains (Join-Path $repoRoot '合作指挥官版起义狂潮\Maps\XM\ttosh02.SC2Map\MapScript.galaxy') 'BankValueSetFromString(BankLastCreated(), "Ach", "Commander", "Zeratul");')) 'ttosh02 map chain'
Add-Check 'ttychus03 Zeratul branch' (Test-Contains $ttychus03 'else if (autoBEEAC669_val == "Zeratul")') $ttychus03

$missingGenericZeratulDeps = @(
    Get-ChildItem -LiteralPath $xmMapsRoot -Directory |
        Where-Object { Test-Path (Join-Path $_.FullName 'DocumentInfo') } |
        Where-Object {
            $docPath = Join-Path $_.FullName 'DocumentInfo'
            $text = Get-Content -LiteralPath $docPath -Raw
            ($text.Contains('file:Mods\XM\XMFinal.SC2Mod')) -and
            ($text.Contains('file:Mods\XM\XMAlarak.SC2Mod')) -and
            (-not $text.Contains('file:Mods\XM\XMZeratul.SC2Mod'))
        } |
        ForEach-Object { $_.Name }
)
Add-Check 'Generic campaign maps load XMZeratul' ($missingGenericZeratulDeps.Count -eq 0) ((($missingGenericZeratulDeps | Sort-Object) -join ', '), 'none' | Where-Object { $_ -ne '' } | Select-Object -First 1)

$failed = $checks | Where-Object { -not $_.Passed }
$checks | ForEach-Object {
    $status = if ($_.Passed) { 'PASS' } else { 'FAIL' }
    Write-Output ("[{0}] {1} :: {2}" -f $status, $_.Name, $_.Detail)
}

if ($failed.Count -gt 0) {
    exit 1
}
