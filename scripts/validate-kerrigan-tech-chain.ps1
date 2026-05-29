param(
    [string]$WorkspaceRoot = (Split-Path -Parent $PSScriptRoot)
)

$ErrorActionPreference = "Stop"

$projectRoot = Get-Item -LiteralPath $WorkspaceRoot
$scenarioRoot = Get-ChildItem -LiteralPath $projectRoot.FullName -Directory | Where-Object {
    Test-Path -LiteralPath (Join-Path $_.FullName "Mods\XM\XMKerrigan.SC2Mod")
} | Select-Object -First 1

if (-not $scenarioRoot) {
    throw "Unable to locate scenario root containing Mods\XM\XMKerrigan.SC2Mod under $($projectRoot.FullName)"
}

$xmzGameDataRoot = Join-Path $scenarioRoot.FullName "Mods\XM\XMZeratul.SC2Mod\Base.SC2Data\GameData"
$xmrGameDataRoot = Join-Path $scenarioRoot.FullName "Mods\XM\XMRaynor.SC2Mod\Base.SC2Data\GameData"
$xmkGameDataRoot = Join-Path $scenarioRoot.FullName "Mods\XM\XMKerrigan.SC2Mod\Base.SC2Data\GameData"

$errors = [System.Collections.Generic.List[string]]::new()

function Add-Error {
    param([string]$Message)
    $errors.Add($Message) | Out-Null
}

function Read-Catalog {
    param([string]$Path)

    if (-not (Test-Path -LiteralPath $Path)) {
        Add-Error "Missing file: $Path"
        return $null
    }

    return [xml](Get-Content -LiteralPath $Path -Raw -Encoding UTF8)
}

function Get-NodeById {
    param($Doc, [string]$Id)

    if (-not $Doc) { return $null }
    return $Doc.Catalog.ChildNodes | Where-Object { $_.NodeType -eq "Element" -and $_.id -eq $Id } | Select-Object -First 1
}

function Get-Buttons {
    param($Node)

    if (-not $Node) { return @() }
    return @($Node.CardLayouts.LayoutButtons)
}

function Get-FaceValue {
    param($Button)

    if (-not $Button) { return "" }
    if ($Button.Face -is [string]) { return [string]$Button.Face }
    if ($Button.Face) { return [string]$Button.Face.value }
    return ""
}

function Get-AbilCmdValue {
    param($Button)

    if (-not $Button) { return "" }
    if ($Button.AbilCmd -is [string]) { return [string]$Button.AbilCmd }
    if ($Button.AbilCmd) { return [string]$Button.AbilCmd.value }
    return ""
}

function Get-AbilLinks {
    param($Node)

    if (-not $Node) { return @() }
    return @($Node.AbilArray | ForEach-Object { [string]$_.Link } | Where-Object { $_ })
}

function Test-HasAbilLink {
    param($Node, [string]$AbilId)

    return (Get-AbilLinks $Node) -contains $AbilId
}

function Test-HasButton {
    param(
        $Node,
        [string]$Face,
        [string]$AbilCmd
    )

    foreach ($button in Get-Buttons $Node) {
        if ((Get-FaceValue $button) -eq $Face -and (Get-AbilCmdValue $button) -eq $AbilCmd) {
            return $true
        }
    }

    return $false
}

function Test-LacksButtons {
    param(
        $Node,
        [string[]]$Faces = @(),
        [string[]]$AbilCmds = @()
    )

    foreach ($button in Get-Buttons $Node) {
        if ($Faces -contains (Get-FaceValue $button)) { return $false }
        if ($AbilCmds -contains (Get-AbilCmdValue $button)) { return $false }
    }

    return $true
}

function Get-InfoNode {
    param($Node, [string]$Index)

    if (-not $Node) { return $null }
    return $Node.InfoArray | Where-Object { $_.index -eq $Index } | Select-Object -First 1
}

$xmzUnitDoc = Read-Catalog (Join-Path $xmzGameDataRoot "UnitData.xml")
$xmzAbilDoc = Read-Catalog (Join-Path $xmzGameDataRoot "AbilData.xml")
$xmrUnitDoc = Read-Catalog (Join-Path $xmrGameDataRoot "UnitData.xml")
$xmkUnitDoc = Read-Catalog (Join-Path $xmkGameDataRoot "UnitData.xml")

$heroChecks = @(
    @{ Node = Get-NodeById $xmzUnitDoc "K5Kerrigan"; Name = "K5Kerrigan"; Abils = @("K5DropPods","MindBolt","PrimalHeal","PrimalSlash","PsiStrikeWalk","PsionicLift","SpawnBanelings","WildMutation","Apocalypse") },
    @{ Node = Get-NodeById $xmrUnitDoc "K5KerriganBurrowed"; Name = "K5KerriganBurrowed"; Abils = @("K5DropPods","MindBolt","PrimalHeal","PrimalSlash","PsiStrikeWalk","PsionicLift","SpawnBanelings","WildMutation","Apocalypse","K5KerriganUnburrow","K5Leviathan") },
    @{ Node = Get-NodeById $xmrUnitDoc "K5KerriganPsiStrike"; Name = "K5KerriganPsiStrike"; Abils = @("K5DropPods","KerriganVoidCoopEconDrop","KerriganVoidCoopCrushingGripWave","PrimalHeal","WildMutation","SpawnBanelings","Apocalypse","MindBolt","PrimalSlash","PsionicLift","PsiStrikeWalk","K5Leviathan") }
)

foreach ($check in $heroChecks) {
    if (-not $check.Node) {
        Add-Error "Missing hero node: $($check.Name)"
        continue
    }

    foreach ($abil in $check.Abils) {
        if (-not (Test-HasAbilLink $check.Node $abil)) {
            Add-Error "$($check.Name) missing AbilArray link: $abil"
        }
    }
}

$psiStrikeNode = Get-NodeById $xmrUnitDoc "K5KerriganPsiStrike"
foreach ($button in @(
    @{ Face = "PrimalSlash"; AbilCmd = "PrimalSlash,Execute" },
    @{ Face = "MindBolt"; AbilCmd = "MindBolt,Execute" },
    @{ Face = "PsiStrike"; AbilCmd = "PsiStrikeWalk,Execute" },
    @{ Face = "PsionicLift"; AbilCmd = "PsionicLift,Execute" },
    @{ Face = "PrimalHeal"; AbilCmd = "PrimalHeal,Execute" },
    @{ Face = "WildMutation"; AbilCmd = "WildMutation,Execute" },
    @{ Face = "SpawnBanelings"; AbilCmd = "SpawnBanelings,Execute" },
    @{ Face = "Apocalypse"; AbilCmd = "Apocalypse,Execute" },
    @{ Face = "K5DropPods"; AbilCmd = "K5DropPods,Execute" }
)) {
    if (-not (Test-HasButton $psiStrikeNode $button.Face $button.AbilCmd)) {
        Add-Error "K5KerriganPsiStrike missing button: $($button.Face)"
    }
}

$larvaTrain = Get-NodeById $xmzAbilDoc "LarvaTrain"
foreach ($check in @(
    @{ Index = "Train1"; State = "Restricted"; Face = ""; Unit = "" },
    @{ Index = "Train2"; State = "Available"; Face = "Zergling"; Unit = "Zergling" },
    @{ Index = "Train4"; State = "Available"; Face = "Hydralisk"; Unit = "Hydralisk" },
    @{ Index = "Train5"; State = "Restricted"; Face = ""; Unit = "" },
    @{ Index = "Train7"; State = "Available"; Face = "Ultralisk"; Unit = "Ultralisk" },
    @{ Index = "Train11"; State = "Available"; Face = "Mutalisk"; Unit = "Mutalisk" },
    @{ Index = "Train15"; State = "Restricted"; Face = "MorphToSwarmHost"; Unit = "" },
    @{ Index = "Train16"; State = "Restricted"; Face = "SwarmHostMP"; Unit = "SwarmHostMP" }
)) {
    $info = Get-InfoNode $larvaTrain $check.Index
    if (-not $info) {
        Add-Error "LarvaTrain missing entry: $($check.Index)"
        continue
    }

    if ($info.Button.State -ne $check.State) {
        Add-Error "LarvaTrain $($check.Index) expected state $($check.State), got $($info.Button.State)"
    }

    if ($check.Face -and $info.Button.DefaultButtonFace -ne $check.Face) {
        Add-Error "LarvaTrain $($check.Index) expected face $($check.Face), got $($info.Button.DefaultButtonFace)"
    }

    if ($check.Unit -and $info.Unit.value -ne $check.Unit) {
        Add-Error "LarvaTrain $($check.Index) expected unit $($check.Unit), got $($info.Unit.value)"
    }
}

$larvaTrainSwarm = Get-NodeById $xmzAbilDoc "LarvaTrainSwarm"
foreach ($index in @("Train3","Train17","Train19","Train22","Train29","Train30")) {
    $info = Get-InfoNode $larvaTrainSwarm $index
    if (-not $info) {
        Add-Error "LarvaTrainSwarm missing entry: $index"
        continue
    }

    if ($info.Button.State -ne "Restricted") {
        Add-Error "LarvaTrainSwarm $index should be Restricted, got $($info.Button.State)"
    }
}

$zergBuild = Get-NodeById $xmzAbilDoc "ZergBuild"
foreach ($check in @(
    @{ Index = "Build4"; State = "Available" },
    @{ Index = "Build6"; State = "Available" },
    @{ Index = "Build11"; State = "Restricted" },
    @{ Index = "Build14"; State = "Restricted" },
    @{ Index = "Build25"; State = "Restricted" },
    @{ Index = "Build26"; State = "Restricted" },
    @{ Index = "Build27"; State = "Restricted" }
)) {
    $info = Get-InfoNode $zergBuild $check.Index
    if (-not $info) {
        Add-Error "ZergBuild missing entry: $($check.Index)"
        continue
    }

    if ($info.Button.State -ne $check.State) {
        Add-Error "ZergBuild $($check.Index) expected state $($check.State), got $($info.Button.State)"
    }
}

$drone = Get-NodeById $xmzUnitDoc "Drone"
if (-not (Test-LacksButtons $drone @("ZagaraBileLauncher","BuildBileLauncherLocked","ScourgeNest") @("ZergBuild,Build25","ZergBuild,Build27"))) {
    Add-Error "Drone still exposes BileLauncher or ScourgeNest build buttons."
}

$spawningPool = Get-NodeById $xmzUnitDoc "SpawningPool"
if (-not (Test-LacksButtons $spawningPool @(
    "EvolveBileLauncherIncreasedRange",
    "EvolveBileLauncherIncreasedRangeLocked",
    "EvolveBileLauncherBombardmentCooldown",
    "EvolveBileLauncherBombardmentCooldownLocked",
    "PassiveBileLauncher",
    "PassiveBileLauncherLocked"
))) {
    Add-Error "SpawningPool still exposes BileLauncher research."
}

$hydraliskDen = Get-NodeById $xmkUnitDoc "HydraliskDen"
if (-not (Test-LacksButtons $hydraliskDen @(
    "LurkerDen",
    "ImpalerDen",
    "MutateintoLurkerDenLocked",
    "HydraliskDenImpalerPassive",
    "HydraliskDenLurkerPassive",
    "ResearchLurkerRange",
    "EvolveSeismicSpinesLocked"
) @(
    "UpgradeToLurkerDen,Execute",
    "UpgradeToLurkerDen,Cancel",
    "UpgradeToImpalerDen,Execute",
    "UpgradeToImpalerDen,Cancel",
    "LurkerDenResearch,Research1"
))) {
    Add-Error "HydraliskDen still exposes Lurker or Impaler tech."
}

if (Test-HasAbilLink $hydraliskDen "LurkerDenResearch") {
    Add-Error "HydraliskDen still carries LurkerDenResearch."
}

$spire = Get-NodeById $xmzUnitDoc "Spire"
if (-not (Test-LacksButtons $spire @(
    "MutaliskViperPassive",
    "ViperPassive",
    "GuardianPassive",
    "EvolveGuardianAttackRangeIncrease",
    "EvolveGuardianAttackRangeIncreaseLocked",
    "EvolveDevourerAoEDamage",
    "EvolveDevourerAoEDamageLocked",
    "DevourerPassive"
) @(
    "SpireResearch,Research11",
    "SpireResearch,Research12"
))) {
    Add-Error "Spire still exposes Guardian, Devourer, or Viper tech."
}

$larva = Get-NodeById $xmkUnitDoc "Larva"
$larvaAbilCmds = @(Get-Buttons $larva | ForEach-Object { Get-AbilCmdValue $_ } | Where-Object { $_ })
$expectedLarvaAbilCmds = @(
    "LarvaTrain,Train2",
    "LarvaTrain,Train4",
    "LarvaTrain,Train7",
    "LarvaTrain,Train11",
    "que1,CancelLast"
)

foreach ($expected in $expectedLarvaAbilCmds) {
    if ($larvaAbilCmds -notcontains $expected) {
        Add-Error "Larva missing command card entry: $expected"
    }
}

foreach ($actual in $larvaAbilCmds) {
    if ($expectedLarvaAbilCmds -notcontains $actual) {
        Add-Error "Larva still exposes unexpected command card entry: $actual"
    }
}

foreach ($unitCheck in @(
    @{ Node = Get-NodeById $xmkUnitDoc "Zergling"; Name = "Zergling" },
    @{ Node = Get-NodeById $xmzUnitDoc "HotSRaptor"; Name = "HotSRaptor" }
)) {
    if (-not $unitCheck.Node) {
        Add-Error "Missing combat unit node: $($unitCheck.Name)"
        continue
    }

    if (-not (Test-HasAbilLink $unitCheck.Node "MorphZerglingToBaneling")) {
        Add-Error "$($unitCheck.Name) missing MorphZerglingToBaneling."
    }

    if (-not (Test-HasButton $unitCheck.Node "Baneling" "MorphZerglingToBaneling,Train1")) {
        Add-Error "$($unitCheck.Name) missing Baneling morph button."
    }
}

$zergling = Get-NodeById $xmkUnitDoc "Zergling"
foreach ($abil in @("BurrowUltraliskDown","BurrowUltraliskUp")) {
    if (-not (Test-HasAbilLink $zergling $abil)) {
        Add-Error "Zergling missing burrow ability: $abil"
    }
}

foreach ($button in @(
    @{ Face = "BurrowDown"; AbilCmd = "BurrowUltraliskDown,Execute" },
    @{ Face = "BurrowUp"; AbilCmd = "BurrowUltraliskUp,Execute" }
)) {
    if (-not (Test-HasButton $zergling $button.Face $button.AbilCmd)) {
        Add-Error "Zergling missing burrow button: $($button.Face)"
    }
}

if ($errors.Count -gt 0) {
    $errors | ForEach-Object { Write-Host $_ }
    throw "Kerrigan tech chain validation failed with $($errors.Count) issue(s)."
}

Write-Host "Kerrigan tech chain validation passed."
