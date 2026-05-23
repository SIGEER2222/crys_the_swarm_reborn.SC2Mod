param(
    [string]$WorkspaceRoot = (Split-Path -Parent $PSScriptRoot)
)

$ErrorActionPreference = "Stop"

$projectRoot = Get-Item -LiteralPath $WorkspaceRoot
$scenarioRoot = Get-ChildItem -LiteralPath $projectRoot.FullName -Directory | Where-Object {
    Test-Path -LiteralPath (Join-Path $_.FullName "Mods\XM\XMKarax.SC2Mod")
} | Select-Object -First 1

if (-not $scenarioRoot) {
    throw "Unable to locate scenario root containing Mods\XM\XMKarax.SC2Mod under $($projectRoot.FullName)"
}

$xmRoot = Join-Path $scenarioRoot.FullName "Mods\XM"
$mapsRoot = Join-Path $scenarioRoot.FullName "Maps\XM"
$launcherRoot = Join-Path $mapsRoot "LauncherAuto.SC2Map"
$xmKarax = Join-Path $xmRoot "XMKarax.SC2Mod"
$xmCore = Join-Path $xmRoot "XMCore.SC2Mod"
$xmFinal = Join-Path $xmRoot "XMFinal.SC2Mod"

$errors = [System.Collections.Generic.List[string]]::new()
function Add-Error { param([string]$Message) $errors.Add($Message) | Out-Null }
function Test-Contains {
    param([string]$Path, [string]$Pattern, [switch]$Simple)
    if (-not (Test-Path -LiteralPath $Path)) {
        Add-Error "Missing file: $Path"
        return
    }
    $match = if ($Simple) { Select-String -LiteralPath $Path -Pattern $Pattern -SimpleMatch -Quiet } else { Select-String -LiteralPath $Path -Pattern $Pattern -Quiet }
    if (-not $match) { Add-Error "Missing pattern '$Pattern' in $Path" }
}

Write-Host "=== Karax Module Structure ==="
Test-Contains -Path (Join-Path $xmKarax "DocumentInfo") -Pattern "XMCore.SC2Mod" -Simple
Test-Contains -Path (Join-Path $xmKarax "GameData.version") -Pattern "cdesadag" -Simple
Test-Contains -Path (Join-Path $xmKarax "GameText.version") -Pattern "cdestxet" -Simple
Test-Contains -Path (Join-Path $xmKarax "zhCN.SC2Data\LocalizedData\GameStrings.txt") -Pattern "GameStrings/Karax" -Simple

Write-Host "=== Karax GameData Entries ==="
Test-Contains -Path (Join-Path $xmKarax "Base.SC2Data\GameData\UnitData.xml") -Pattern "SoACasterKarax" -Simple
Test-Contains -Path (Join-Path $xmKarax "Base.SC2Data\GameData\UnitData.xml") -Pattern "SolarForge" -Simple
Test-Contains -Path (Join-Path $xmKarax "Base.SC2Data\GameData\UnitData.xml") -Pattern "KhaydarinMonolith" -Simple
Test-Contains -Path (Join-Path $xmKarax "Base.SC2Data\GameData\UnitData.xml") -Pattern "Energizer" -Simple
Test-Contains -Path (Join-Path $xmKarax "Base.SC2Data\GameData\AbilData.xml") -Pattern "SOAOrbitalStrikeKarax" -Simple
Test-Contains -Path (Join-Path $xmKarax "Base.SC2Data\GameData\AbilData.xml") -Pattern "SOAThermalLanceActivate" -Simple
Test-Contains -Path (Join-Path $xmKarax "Base.SC2Data\GameData\AbilData.xml") -Pattern "SOAMapWideChrono" -Simple
Test-Contains -Path (Join-Path $xmKarax "Base.SC2Data\GameData\AbilData.xml") -Pattern "SolarForgeResearch" -Simple
Test-Contains -Path (Join-Path $xmKarax "Base.SC2Data\GameData\UpgradeData.xml") -Pattern "KaraxCommander" -Simple
Test-Contains -Path (Join-Path $xmKarax "Base.SC2Data\GameData\UpgradeData.xml") -Pattern "SOASolarLanceUpgrade" -Simple
Test-Contains -Path (Join-Path $xmKarax "Base.SC2Data\GameData\UpgradeData.xml") -Pattern "KaraxTurretRange" -Simple
Test-Contains -Path (Join-Path $xmKarax "Base.SC2Data\GameData\UpgradeData.xml") -Pattern "KaraxTurretAttackSpeed" -Simple
Test-Contains -Path (Join-Path $xmKarax "Base.SC2Data\GameData\UpgradeData.xml") -Pattern "KaraxEnergyRegenUpgrade" -Simple
Test-Contains -Path (Join-Path $xmKarax "Base.SC2Data\GameData\CommanderData.xml") -Pattern "ProtossKarax" -Simple

Write-Host "=== XMFinal DocumentInfo ==="
Test-Contains -Path (Join-Path $xmFinal "DocumentInfo") -Pattern "XMKarax.SC2Mod" -Simple

Write-Host "=== XMCore UserData Karax Instances ==="
Test-Contains -Path (Join-Path $xmCore "Base.SC2Data\GameData\UserData.xml") -Pattern "<Instances Id=`"Karax`">" -Simple
Test-Contains -Path (Join-Path $xmCore "Base.SC2Data\GameData\UserData.xml") -Pattern "Karax_TitU" -Simple
Test-Contains -Path (Join-Path $xmCore "Base.SC2Data\GameData\UserData.xml") -Pattern "Karax_TitP" -Simple
Test-Contains -Path (Join-Path $xmCore "Base.SC2Data\GameData\UserData.xml") -Pattern "Karax_DesU" -Simple
Test-Contains -Path (Join-Path $xmCore "Base.SC2Data\GameData\UserData.xml") -Pattern "Karax_DesP" -Simple
Test-Contains -Path (Join-Path $xmCore "Base.SC2Data\GameData\UserData.xml") -Pattern "MasteryKaraxBuildingVital" -Simple
Test-Contains -Path (Join-Path $xmCore "Base.SC2Data\GameData\UserData.xml") -Pattern "SOASolarLanceUpgrade" -Simple

Write-Host "=== XMFinal Galaxy Karax Runtime ==="
Test-Contains -Path (Join-Path $xmFinal "Base.SC2Data\LibE0EAE146.galaxy") -Pattern "libE0EAE146_gf_ApplyKaraxCommanderRuntime" -Simple
Test-Contains -Path (Join-Path $xmFinal "Base.SC2Data\LibE0EAE146.galaxy") -Pattern "libE0EAE146_gf_KaraxCreateMapStartSquad" -Simple
Test-Contains -Path (Join-Path $xmFinal "Base.SC2Data\LibE0EAE146.galaxy") -Pattern "libE0EAE146_gf_KaraxCreateMapStartSquadInRegion" -Simple
Test-Contains -Path (Join-Path $xmFinal "Base.SC2Data\LibE0EAE146.galaxy") -Pattern 'libE0EAE146_gv_commander == "Karax"' -Simple
Test-Contains -Path (Join-Path $xmFinal "Base.SC2Data\LibE0EAE146.galaxy") -Pattern 'auto09490B45_val == "Karax"' -Simple
Test-Contains -Path (Join-Path $xmFinal "Base.SC2Data\LibE0EAE146.galaxy") -Pattern "SoACasterKarax" -Simple
Test-Contains -Path (Join-Path $xmFinal "Base.SC2Data\LibE0EAE146.galaxy") -Pattern 'KaraxCreateMapStartSquad("light"' -Simple
Test-Contains -Path (Join-Path $xmFinal "Base.SC2Data\LibE0EAE146.galaxy") -Pattern 'autoC0933116_val == "Karax"' -Simple
Test-Contains -Path (Join-Path $xmFinal "Base.SC2Data\LibE0EAE146.galaxy") -Pattern "ConsoleProtoss_Karax" -Simple
Test-Contains -Path (Join-Path $xmFinal "Base.SC2Data\LibE0EAE146.galaxy") -Pattern "SOAOrbitalStrikeActivate" -Simple
Test-Contains -Path (Join-Path $xmFinal "Base.SC2Data\LibE0EAE146.galaxy") -Pattern "SOAThermalLanceActivate" -Simple
Test-Contains -Path (Join-Path $xmFinal "Base.SC2Data\LibE0EAE146.galaxy") -Pattern "SOAMapWideChrono" -Simple
Test-Contains -Path (Join-Path $xmFinal "Base.SC2Data\LibE0EAE146.galaxy") -Pattern "KaraxCommander" -Simple

Write-Host "=== LauncherAuto Karax Candidate ==="
Test-Contains -Path (Join-Path $launcherRoot "Base.SC2Data\GameData\UserData.xml") -Pattern 'String="Karax"' -Simple
Test-Contains -Path (Join-Path $launcherRoot "Base.SC2Data\GameData\UserData.xml") -Pattern "ui_btn_commanderportrait_karax" -Simple
Test-Contains -Path (Join-Path $launcherRoot "Base.SC2Data\GameData\UserData.xml") -Pattern "ID_Por_013" -Simple
Test-Contains -Path (Join-Path $launcherRoot "zhCN.SC2Data\LocalizedData\GameStrings.txt") -Pattern "ID_Por_013" -Simple
Test-Contains -Path (Join-Path $launcherRoot "zhCN.SC2Data\LocalizedData\GameStrings.txt") -Pattern "Karax_TitU" -Simple
Test-Contains -Path (Join-Path $launcherRoot "zhCN.SC2Data\LocalizedData\GameStrings.txt") -Pattern "Karax_TitP" -Simple
Test-Contains -Path (Join-Path $launcherRoot "zhCN.SC2Data\LocalizedData\GameStrings.txt") -Pattern "Karax_DesU" -Simple
Test-Contains -Path (Join-Path $launcherRoot "zhCN.SC2Data\LocalizedData\GameStrings.txt") -Pattern "Karax_DesP" -Simple

if ($errors.Count -gt 0) {
    Write-Host ""
    Write-Host "Validation failed with $($errors.Count) issue(s):"
    $errors | ForEach-Object { Write-Host "  [ERROR] $_" }
    throw "Karax port validation failed."
}

Write-Host ""
Write-Host "Karax port validation passed."
