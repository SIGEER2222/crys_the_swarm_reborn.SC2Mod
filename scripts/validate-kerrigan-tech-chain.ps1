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

$gameDataRoot = Join-Path $scenarioRoot.FullName "Mods\XM\XMKerrigan.SC2Mod\Base.SC2Data\GameData"
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
    return $Doc.Catalog.ChildNodes |
        Where-Object { $_.NodeType -eq "Element" -and $_.id -eq $Id } |
        Select-Object -First 1
}

function Get-Buttons {
    param($Node)

    if (-not $Node) { return @() }
    return @($Node.CardLayouts.LayoutButtons)
}

function Get-FieldValue {
    param($Node, [string]$Name)

    if (-not $Node) { return "" }
    $attr = $Node.Attributes[$Name]
    if ($attr) { return [string]$attr.Value }
    $child = $Node.$Name
    if ($child -is [string]) { return [string]$child }
    if ($child -and $child.value) { return [string]$child.value }
    return ""
}

function Get-FaceValue {
    param($Button)
    return Get-FieldValue $Button "Face"
}

function Get-AbilCmdValue {
    param($Button)
    return Get-FieldValue $Button "AbilCmd"
}

function Get-AbilLinks {
    param($Node)

    if (-not $Node) { return @() }
    return @($Node.AbilArray | ForEach-Object { [string]$_.Link } | Where-Object { $_ })
}

function Assert-AbilLinks {
    param(
        $Node,
        [string]$NodeName,
        [string[]]$ExpectedLinks
    )

    $links = @(Get-AbilLinks $Node)
    foreach ($link in $ExpectedLinks) {
        if ($links -notcontains $link) {
            Add-Error "$NodeName missing ability link: $link"
        }
    }
}

function Get-AbilIdFromAbilCmd {
    param([string]$AbilCmd)

    if ([string]::IsNullOrWhiteSpace($AbilCmd)) { return "" }
    return ($AbilCmd -split ",", 2)[0]
}

function Assert-ButtonsHaveAbilityLinks {
    param(
        $Node,
        [string]$NodeName,
        [string[]]$IgnoredAbilityIds = @()
    )

    $links = @(Get-AbilLinks $Node)
    foreach ($button in Get-Buttons $Node) {
        $abilId = Get-AbilIdFromAbilCmd (Get-AbilCmdValue $button)
        if ([string]::IsNullOrWhiteSpace($abilId)) { continue }
        if ($IgnoredAbilityIds -contains $abilId) { continue }
        if ($links -notcontains $abilId) {
            Add-Error "$NodeName command-card button uses $abilId but AbilArray does not link it."
        }
    }
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

function Assert-ButtonPosition {
    param(
        $Node,
        [string]$NodeName,
        [string]$Face,
        [string]$AbilCmd,
        [string]$ExpectedRow,
        [string]$ExpectedColumn
    )

    $match = $null
    foreach ($button in Get-Buttons $Node) {
        if ((Get-FaceValue $button) -eq $Face -and (Get-AbilCmdValue $button) -eq $AbilCmd) {
            $match = $button
            break
        }
    }

    if (-not $match) {
        Add-Error "$NodeName missing command card button: $Face -> $AbilCmd"
        return
    }

    $row = Get-FieldValue $match "Row"
    $column = Get-FieldValue $match "Column"
    if ($row -ne $ExpectedRow -or $column -ne $ExpectedColumn) {
        Add-Error "$NodeName button $Face -> $AbilCmd should be at row=$ExpectedRow column=$ExpectedColumn, got row=$row column=$column."
    }
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
    return $Node.InfoArray |
        Where-Object { $_.index -eq $Index -or ($Index -eq "0" -and -not $_.index) } |
        Select-Object -First 1
}

function Get-InfoUnitValue {
    param($Info)

    if (-not $Info) { return "" }
    $attr = $Info.Attributes["Unit"]
    if ($attr) { return [string]$attr.Value }
    if (-not $Info.Unit) { return "" }
    if ($Info.Unit -is [array]) {
        return [string]$Info.Unit[0].value
    }
    return [string]$Info.Unit.value
}

function Test-HasNode {
    param($Doc, [string]$Id)
    return $null -ne (Get-NodeById $Doc $Id)
}

function Assert-InfoUnit {
    param(
        $Node,
        [string]$NodeName,
        [string]$Index,
        [string]$ExpectedUnit
    )

    $info = Get-InfoNode $Node $Index
    if (-not $info) {
        Add-Error "$NodeName missing InfoArray entry: $Index"
        return
    }

    $actualUnit = Get-InfoUnitValue $info
    if ($actualUnit -ne $ExpectedUnit) {
        Add-Error "$NodeName $Index should produce/morph to $ExpectedUnit, got $actualUnit."
    }
}

function Assert-InfoState {
    param(
        $Node,
        [string]$NodeName,
        [string]$Index,
        [string]$ExpectedState
    )

    $info = Get-InfoNode $Node $Index
    if (-not $info) {
        Add-Error "$NodeName missing InfoArray entry: $Index"
        return
    }

    $actualState = Get-FieldValue $info.Button "State"
    if ($actualState -ne $ExpectedState) {
        Add-Error "$NodeName $Index should be $ExpectedState, got $actualState."
    }
}

$unitDoc = Read-Catalog (Join-Path $gameDataRoot "UnitData.xml")
$abilDoc = Read-Catalog (Join-Path $gameDataRoot "AbilData.xml")
$buttonDoc = Read-Catalog (Join-Path $gameDataRoot "ButtonData.xml")

foreach ($id in @("K5Kerrigan", "K5KerriganBurrowed", "K5KerriganPsiStrike")) {
    if (-not (Get-NodeById $unitDoc $id)) {
        Add-Error "Missing Kerrigan hero unit node: $id"
    }
}

foreach ($id in @(
    "PrimalSlash",
    "K5KerriganPsiStrikeMorph",
    "K5KerriganMorph",
    "MindBolt",
    "PsiStrikeWalk",
    "PsionicLift",
    "PrimalHeal",
    "WildMutation",
    "SpawnBanelings",
    "Apocalypse",
    "K5DropPods",
    "KerriganVoidCoopEconDrop",
    "KerriganVoidCoopCrushingGripWave"
)) {
    if (-not (Test-HasNode $abilDoc $id)) {
        Add-Error "Missing Kerrigan hero ability catalog node: $id"
    }
}

foreach ($id in @(
    "BuildNydusCanal",
    "NydusCanalTransport",
    "RallyNydus",
    "BurrowTorrasqueDown",
    "BurrowTorrasqueUp",
    "UpgradeToLurkerDen",
    "MutaliskMorphToBroodLord",
    "SpineCrawlerUproot",
    "SporeCrawlerUproot",
    "SpineCrawlerRoot",
    "SporeCrawlerRoot",
    "TrainQueen",
    "LarvaTrainSwarmling"
)) {
    if (-not (Test-HasNode $abilDoc $id)) {
        Add-Error "Missing local Kerrigan tech-chain ability catalog node: $id"
    }
}

$kerrigan = Get-NodeById $unitDoc "K5Kerrigan"
foreach ($button in @(
    @{ Face = "PrimalSlash"; AbilCmd = "PrimalSlash,Execute" },
    @{ Face = "MindBolt"; AbilCmd = "MindBolt,Execute" },
    @{ Face = "PsiStrike"; AbilCmd = "PsiStrikeWalk,Execute" },
    @{ Face = "PsionicLift"; AbilCmd = "PsionicLift,Execute" },
    @{ Face = "KerriganVoidCoopEconDrop"; AbilCmd = "KerriganVoidCoopEconDrop,Execute" },
    @{ Face = "KerriganVoidCoopCrushingGripWave"; AbilCmd = "KerriganVoidCoopCrushingGripWave,Execute" },
    @{ Face = "BurrowDown"; AbilCmd = "K5KerriganBurrow,Execute" }
)) {
    if (-not (Test-HasButton $kerrigan $button.Face $button.AbilCmd)) {
        Add-Error "K5Kerrigan missing command card button: $($button.Face) -> $($button.AbilCmd)"
    }
}

foreach ($button in @(
    @{ Face = "PrimalSlash"; AbilCmd = "PrimalSlash,Execute"; Row = "2"; Column = "0" },
    @{ Face = "MindBolt"; AbilCmd = "MindBolt,Execute"; Row = "2"; Column = "0" },
    @{ Face = "PsiStrike"; AbilCmd = "PsiStrikeWalk,Execute"; Row = "2"; Column = "1" },
    @{ Face = "PsionicLift"; AbilCmd = "PsionicLift,Execute"; Row = "2"; Column = "1" },
    @{ Face = "KerriganVoidCoopEconDrop"; AbilCmd = "KerriganVoidCoopEconDrop,Execute"; Row = "2"; Column = "2" },
    @{ Face = "KerriganVoidCoopCrushingGripWave"; AbilCmd = "KerriganVoidCoopCrushingGripWave,Execute"; Row = "2"; Column = "3" },
    @{ Face = "BurrowDown"; AbilCmd = "K5KerriganBurrow,Execute"; Row = "2"; Column = "4" }
)) {
    Assert-ButtonPosition $kerrigan "K5Kerrigan" $button.Face $button.AbilCmd $button.Row $button.Column
}

Assert-AbilLinks $kerrigan "K5Kerrigan" @(
    "attack",
    "move",
    "stop",
    "Apocalypse",
    "K5DropPods",
    "K5KerriganBurrow",
    "K5Leviathan",
    "KerriganMaelstrom",
    "KerriganVoidCoopCrushingGripWave",
    "KerriganVoidCoopEconDrop",
    "K5KerriganPsiStrikeMorph",
    "MindBolt",
    "PrimalHeal",
    "PrimalSlash",
    "PsiStrikeWalk",
    "PsionicLift",
    "SpawnBanelings",
    "WildMutation"
)
Assert-ButtonsHaveAbilityLinks $kerrigan "K5Kerrigan"

$kerriganBurrowed = Get-NodeById $unitDoc "K5KerriganBurrowed"
foreach ($button in @(
    @{ Face = "PrimalSlash"; AbilCmd = "PrimalSlash,Execute"; Row = "2"; Column = "0" },
    @{ Face = "MindBolt"; AbilCmd = "MindBolt,Execute"; Row = "2"; Column = "0" },
    @{ Face = "PsiStrike"; AbilCmd = "PsiStrikeWalk,Execute"; Row = "2"; Column = "1" },
    @{ Face = "PsionicLift"; AbilCmd = "PsionicLift,Execute"; Row = "2"; Column = "1" },
    @{ Face = "KerriganVoidCoopEconDrop"; AbilCmd = "KerriganVoidCoopEconDrop,Execute"; Row = "2"; Column = "2" },
    @{ Face = "KerriganVoidCoopCrushingGripWave"; AbilCmd = "KerriganVoidCoopCrushingGripWave,Execute"; Row = "2"; Column = "3" },
    @{ Face = "BurrowUp"; AbilCmd = "K5KerriganUnburrow,Execute"; Row = "2"; Column = "4" }
)) {
    Assert-ButtonPosition $kerriganBurrowed "K5KerriganBurrowed" $button.Face $button.AbilCmd $button.Row $button.Column
}

Assert-AbilLinks $kerriganBurrowed "K5KerriganBurrowed" @(
    "Apocalypse",
    "K5DropPods",
    "K5KerriganUnburrow",
    "K5Leviathan",
    "K5KerriganPsiStrikeMorph",
    "KerriganMaelstrom",
    "KerriganVoidCoopCrushingGripWave",
    "KerriganVoidCoopEconDrop",
    "MindBolt",
    "PrimalHeal",
    "PrimalSlash",
    "PsiStrikeWalk",
    "PsionicLift",
    "SpawnBanelings",
    "WildMutation"
)
Assert-ButtonsHaveAbilityLinks $kerriganBurrowed "K5KerriganBurrowed"

$kerriganPsiStrike = Get-NodeById $unitDoc "K5KerriganPsiStrike"
foreach ($button in @(
    @{ Face = "PrimalHeal"; AbilCmd = "PrimalHeal,Execute"; Row = "2"; Column = "2" },
    @{ Face = "WildMutation"; AbilCmd = "WildMutation,Execute"; Row = "2"; Column = "2" },
    @{ Face = "SpawnBanelings"; AbilCmd = "SpawnBanelings,Execute"; Row = "2"; Column = "2" },
    @{ Face = "KerriganVoidCoopEconDrop"; AbilCmd = "KerriganVoidCoopEconDrop,Execute"; Row = "2"; Column = "2" },
    @{ Face = "KerriganVoidCoopCrushingGripWave"; AbilCmd = "KerriganVoidCoopCrushingGripWave,Execute"; Row = "2"; Column = "3" },
    @{ Face = "Apocalypse"; AbilCmd = "Apocalypse,Execute"; Row = "2"; Column = "3" },
    @{ Face = "K5DropPods"; AbilCmd = "K5DropPods,Execute"; Row = "2"; Column = "3" }
)) {
    Assert-ButtonPosition $kerriganPsiStrike "K5KerriganPsiStrike" $button.Face $button.AbilCmd $button.Row $button.Column
}

Assert-AbilLinks $kerriganPsiStrike "K5KerriganPsiStrike" @(
    "attack",
    "move",
    "stop",
    "Apocalypse",
    "K5DropPods",
    "K5KerriganPsiStrikeMorph",
    "K5KerriganMorph",
    "K5Leviathan",
    "KerriganVoidCoopCrushingGripWave",
    "KerriganVoidCoopEconDrop",
    "MindBolt",
    "PrimalHeal",
    "PrimalSlash",
    "PsiStrikeWalk",
    "PsionicLift",
    "SpawnBanelings",
    "WildMutation"
)
Assert-ButtonsHaveAbilityLinks $kerriganPsiStrike "K5KerriganPsiStrike"

Assert-InfoUnit (Get-NodeById $abilDoc "K5KerriganPsiStrikeMorph") "K5KerriganPsiStrikeMorph" "0" "K5KerriganPsiStrike"
Assert-InfoUnit (Get-NodeById $abilDoc "K5KerriganMorph") "K5KerriganMorph" "0" "K5Kerrigan"

$larva = Get-NodeById $unitDoc "Larva"
$expectedLarvaAbilCmds = @(
    "LarvaTrainSwarmling,Train1",
    "LarvaTrain,Train4",
    "LarvaTrain,Train7",
    "LarvaTrain,Train11",
    "que1,CancelLast"
)
$larvaAbilCmds = @(Get-Buttons $larva | ForEach-Object { Get-AbilCmdValue $_ } | Where-Object { $_ })

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

$larvaTrainSwarmling = Get-NodeById $abilDoc "LarvaTrainSwarmling"
Assert-InfoUnit $larvaTrainSwarmling "LarvaTrainSwarmling" "Train1" "HotSRaptor"

foreach ($unitCheck in @(
    @{ Node = Get-NodeById $unitDoc "Zergling"; Name = "Zergling" },
    @{ Node = Get-NodeById $unitDoc "HotSRaptor"; Name = "HotSRaptor" }
)) {
    if (-not $unitCheck.Node) {
        Add-Error "Missing Kerrigan combat unit node: $($unitCheck.Name)"
        continue
    }

    if ((Get-AbilLinks $unitCheck.Node) -contains "MorphZerglingToBaneling") {
        Add-Error "$($unitCheck.Name) must not carry MorphZerglingToBaneling."
    }

    if (-not (Test-LacksButtons $unitCheck.Node @("Baneling") @("MorphZerglingToBaneling,Train1", "MorphHotSRaptorToBaneling,Train1"))) {
        Add-Error "$($unitCheck.Name) still exposes a Baneling morph button."
    }
}

$zergling = Get-NodeById $unitDoc "Zergling"
foreach ($abil in @("BurrowUltraliskDown", "BurrowUltraliskUp")) {
    if ((Get-AbilLinks $zergling) -contains $abil) {
        Add-Error "Zergling must not carry ultralisk burrow ability: $abil"
    }
}

if (-not (Test-LacksButtons $zergling @("BurrowDown", "BurrowUp") @("BurrowUltraliskDown,Execute", "BurrowUltraliskUp,Execute"))) {
    Add-Error "Zergling still exposes ultralisk burrow buttons."
}

$drone = Get-NodeById $unitDoc "Drone"
if ((Get-AbilLinks $drone) -notcontains "ZergBuild") {
    Add-Error "Drone missing ZergBuild ability link."
}

foreach ($button in @(
    @{ Face = "SpawningPool"; AbilCmd = "ZergBuild,Build4" },
    @{ Face = "HydraliskDen"; AbilCmd = "ZergBuild,Build6" },
    @{ Face = "Spire"; AbilCmd = "ZergBuild,Build7" },
    @{ Face = "UltraliskCavern"; AbilCmd = "ZergBuild,Build8" },
    @{ Face = "NydusNetwork"; AbilCmd = "ZergBuild,Build10" },
    @{ Face = "SpineCrawler"; AbilCmd = "ZergBuild,Build15" },
    @{ Face = "SporeCrawler"; AbilCmd = "ZergBuild,Build16" }
)) {
    if (-not (Test-HasButton $drone $button.Face $button.AbilCmd)) {
        Add-Error "Drone missing Kerrigan build button: $($button.Face) -> $($button.AbilCmd)"
    }
}

if (-not (Test-LacksButtons $drone @("AbathurSpawningPool", "ZagaraBileLauncher", "BuildBileLauncherLocked", "ScourgeNest") @("ZergBuild,Build25", "ZergBuild,Build27"))) {
    Add-Error "Drone still exposes Abathur/Zagara-only build buttons."
}

$zergBuild = Get-NodeById $abilDoc "ZergBuild"
foreach ($build in @(
    @{ Index = "Build4"; Unit = "SpawningPool" },
    @{ Index = "Build6"; Unit = "HydraliskDen" },
    @{ Index = "Build7"; Unit = "Spire" },
    @{ Index = "Build8"; Unit = "UltraliskCavern" },
    @{ Index = "Build10"; Unit = "NydusNetwork" },
    @{ Index = "Build15"; Unit = "SpineCrawler" },
    @{ Index = "Build16"; Unit = "SporeCrawler" }
)) {
    Assert-InfoUnit $zergBuild "ZergBuild" $build.Index $build.Unit
    Assert-InfoState $zergBuild "ZergBuild" $build.Index "Available"
}

foreach ($index in @("Build5", "Build9", "Build11", "Build14", "Build17", "Build25", "Build26", "Build27")) {
    Assert-InfoState $zergBuild "ZergBuild" $index "Restricted"
}

foreach ($id in @(
    "SpineCrawlerUproot",
    "SporeCrawlerUproot",
    "SpineCrawlerRoot",
    "SporeCrawlerRoot",
    "SpineCrawlerRootCancel",
    "SporeCrawlerRootCancel",
    "SwarmSeeds",
    "BurrowChargeCampaign",
    "BurrowChargeLocked",
    "EvolveAnabolicSynthesis2",
    "EvolveChitinousPlating",
    "Frenzied",
    "TissueAssimilation"
)) {
    if (-not (Get-NodeById $buttonDoc $id)) {
        Add-Error "Missing Kerrigan command-card button catalog node: $id"
    }
}

$broodLord = Get-NodeById $unitDoc "BroodLord"
if (-not (Test-HasButton $broodLord "SwarmSeeds" "")) {
    Add-Error "BroodLord missing official SwarmSeeds passive button."
}
if (-not (Test-HasButton $broodLord "BroodlordSpeed" "")) {
    Add-Error "BroodLord missing Kerrigan BroodlordSpeed passive button."
}

foreach ($crawler in @(
    @{
        RootedUnit = "SpineCrawler"
        UprootedUnit = "SpineCrawlerUprooted"
        UprootAbil = "SpineCrawlerUproot"
        RootAbil = "SpineCrawlerRoot"
        UprootFace = "SpineCrawlerUproot"
        RootFace = "SpineCrawlerRoot"
    },
    @{
        RootedUnit = "SporeCrawler"
        UprootedUnit = "SporeCrawlerUprooted"
        UprootAbil = "SporeCrawlerUproot"
        RootAbil = "SporeCrawlerRoot"
        UprootFace = "SporeCrawlerUproot"
        RootFace = "SporeCrawlerRoot"
    }
)) {
    $rooted = Get-NodeById $unitDoc $crawler.RootedUnit
    $uprooted = Get-NodeById $unitDoc $crawler.UprootedUnit
    if (-not $rooted) {
        Add-Error "Missing crawler rooted unit node: $($crawler.RootedUnit)"
        continue
    }
    if (-not $uprooted) {
        Add-Error "Missing crawler uprooted unit node: $($crawler.UprootedUnit)"
        continue
    }
    Assert-AbilLinks $rooted $crawler.RootedUnit @("BuildInProgress", "stop", "attack", $crawler.UprootAbil)
    Assert-AbilLinks $uprooted $crawler.UprootedUnit @("stop", "move", $crawler.RootAbil)
    if (-not (Test-HasButton $rooted $crawler.UprootFace "$($crawler.UprootAbil),Execute")) {
        Add-Error "$($crawler.RootedUnit) missing official uproot button: $($crawler.UprootAbil),Execute"
    }
    if (-not (Test-HasButton $uprooted $crawler.RootFace "$($crawler.RootAbil),Execute")) {
        Add-Error "$($crawler.UprootedUnit) missing official root button: $($crawler.RootAbil),Execute"
    }
    Assert-InfoUnit (Get-NodeById $abilDoc $crawler.UprootAbil) $crawler.UprootAbil "0" $crawler.UprootedUnit
    Assert-InfoUnit (Get-NodeById $abilDoc $crawler.RootAbil) $crawler.RootAbil "0" $crawler.RootedUnit
}

$hydralisk = Get-NodeById $unitDoc "Hydralisk"
if (-not (Test-HasButton $hydralisk "BuildLurkerLocked" "")) {
    Add-Error "Hydralisk missing Kerrigan locked Lurker command-card hint."
}
foreach ($button in @(
    @{ Face = "HydraliskFrenzy"; AbilCmd = "HydraliskFrenzy,Execute"; Row = "2"; Column = "1" },
    @{ Face = "MorphToHydraliskLurker"; AbilCmd = "MorphHydraliskToLurker,Train1"; Row = "2"; Column = "0" },
    @{ Face = "BurrowDown"; AbilCmd = "BurrowUltraliskDown,Execute"; Row = "2"; Column = "3" },
    @{ Face = "BurrowUp"; AbilCmd = "BurrowUltraliskUp,Execute"; Row = "2"; Column = "4" }
)) {
    Assert-ButtonPosition $hydralisk "Hydralisk" $button.Face $button.AbilCmd $button.Row $button.Column
}
Assert-AbilLinks $hydralisk "Hydralisk" @(
    "HydraliskFrenzy",
    "MorphHydraliskToLurker",
    "BurrowUltraliskDown",
    "BurrowUltraliskUp"
)

$hydraliskDen = Get-NodeById $unitDoc "HydraliskDen"
foreach ($button in @(
    @{ Face = "LurkerDen"; AbilCmd = "UpgradeToLurkerDen,Execute" },
    @{ Face = "ResearchLurkerRange"; AbilCmd = "LurkerDenResearch,Research1" },
    @{ Face = "EvolveMuscularAugments"; AbilCmd = "HydraliskDenResearch,Research3" },
    @{ Face = "EvolveAncillaryCarapace"; AbilCmd = "HydraliskDenResearch,Research5" },
    @{ Face = "EvolveFrenzy"; AbilCmd = "HydraliskDenResearch,Research6" }
)) {
    if (-not (Test-HasButton $hydraliskDen $button.Face $button.AbilCmd)) {
        Add-Error "HydraliskDen missing Kerrigan tech button: $($button.Face) -> $($button.AbilCmd)"
    }
}

if ((Get-AbilLinks $hydraliskDen) -notcontains "LurkerDenResearch") {
    Add-Error "HydraliskDen missing LurkerDenResearch ability link."
}

if ((Get-AbilLinks $hydraliskDen) -notcontains "UpgradeToLurkerDen") {
    Add-Error "HydraliskDen missing UpgradeToLurkerDen ability link."
}

$upgradeToLurkerDen = Get-NodeById $abilDoc "UpgradeToLurkerDen"
Assert-InfoUnit $upgradeToLurkerDen "UpgradeToLurkerDen" "0" "LurkerDen"

if (-not (Test-LacksButtons $hydraliskDen @("ImpalerDen", "HydraliskDenImpalerPassive") @("UpgradeToImpalerDen,Execute", "UpgradeToImpalerDen,Cancel"))) {
    Add-Error "HydraliskDen still exposes Abathur Impaler tech."
}

foreach ($id in @("HydraliskLurker", "HydraliskLurkerBurrowed", "HydraliskLurkerEgg")) {
    if (-not (Get-NodeById $unitDoc $id)) {
        Add-Error "Missing Kerrigan lurker chain unit node: $id"
    }
}

foreach ($id in @("Ultralisk", "HotSTorrasque", "HotSTorrasqueBurrowed", "TorrasqueChrysalis")) {
    if (-not (Get-NodeById $unitDoc $id)) {
        Add-Error "Missing Kerrigan ultralisk/torrasque chain unit node: $id"
    }
}

$ultralisk = Get-NodeById $unitDoc "Ultralisk"
foreach ($button in @(
    @{ Face = "EvolveChitinousPlating"; AbilCmd = ""; Row = "1"; Column = "0" },
    @{ Face = "EvolveAnabolicSynthesis2"; AbilCmd = ""; Row = "1"; Column = "1" },
    @{ Face = "TissueAssimilation"; AbilCmd = ""; Row = "1"; Column = "2" },
    @{ Face = "BurrowChargeCampaign"; AbilCmd = "UltraliskBurrowCharge,Execute"; Row = "2"; Column = "2" },
    @{ Face = "BurrowDown"; AbilCmd = "BurrowUltraliskDown,Execute"; Row = "2"; Column = "3" },
    @{ Face = "BurrowUp"; AbilCmd = "BurrowUltraliskUp,Execute"; Row = "2"; Column = "4" }
)) {
    Assert-ButtonPosition $ultralisk "Ultralisk" $button.Face $button.AbilCmd $button.Row $button.Column
}
Assert-AbilLinks $ultralisk "Ultralisk" @(
    "BurrowUltraliskDown",
    "BurrowUltraliskUp",
    "UltraliskBurrowCharge"
)

$torrasque = Get-NodeById $unitDoc "HotSTorrasque"
$torrasqueBurrowed = Get-NodeById $unitDoc "HotSTorrasqueBurrowed"
if ((Get-AbilLinks $torrasque) -notcontains "BurrowTorrasqueDown") {
    Add-Error "HotSTorrasque missing BurrowTorrasqueDown ability link."
}
if ((Get-AbilLinks $torrasqueBurrowed) -notcontains "BurrowTorrasqueUp") {
    Add-Error "HotSTorrasqueBurrowed missing BurrowTorrasqueUp ability link."
}
Assert-InfoUnit (Get-NodeById $abilDoc "BurrowTorrasqueDown") "BurrowTorrasqueDown" "0" "HotSTorrasqueBurrowed"
Assert-InfoUnit (Get-NodeById $abilDoc "BurrowTorrasqueUp") "BurrowTorrasqueUp" "0" "HotSTorrasque"

$spawningPool = Get-NodeById $unitDoc "SpawningPool"
if (-not (Test-LacksButtons $spawningPool @(
    "EvolveHardenedCarapaceZagaraLocked",
    "EvolveZerglingArmorShredZagaraLocked",
    "EvolveBileLauncherIncreasedRange",
    "EvolveBileLauncherIncreasedRangeLocked",
    "EvolveBileLauncherBombardmentCooldown",
    "EvolveBileLauncherBombardmentCooldownLocked",
    "PassiveBileLauncher",
    "PassiveBileLauncherLocked"
) @(
    "SpawningPoolResearch,Research5",
    "SpawningPoolResearch,Research6"
))) {
    Add-Error "SpawningPool still exposes Zagara-only Bile Launcher tech."
}

$spire = Get-NodeById $unitDoc "Spire"
$greaterSpire = Get-NodeById $unitDoc "GreaterSpire"
foreach ($spireNode in @(
    @{ Node = $spire; Name = "Spire" },
    @{ Node = $greaterSpire; Name = "GreaterSpire" }
)) {
    if (-not (Test-LacksButtons $spireNode.Node @(
        "MutaliskViperPassive",
        "ViperPassive",
        "GuardianPassive",
        "EvolveGuardianAttackRangeIncrease",
        "EvolveGuardianAttackRangeIncreaseLocked",
        "EvolveSunderingGlave",
        "EvolveSunderingGlaveLocked",
        "EvolveDevourerAoEDamage",
        "EvolveDevourerAoEDamageLocked",
        "DevourerPassive"
    ) @(
        "SpireResearch,Research9",
        "SpireResearch,Research11",
        "SpireResearch,Research12"
    ))) {
        Add-Error "$($spireNode.Name) still exposes Abathur-only Guardian, Devourer, or Viper tech."
    }
}

foreach ($button in @(
    @{ Face = "GreaterSpireBroodlord"; AbilCmd = "UpgradeToGreaterSpireBroodlord,Execute" },
    @{ Face = "EvolveKerriganViciousGlaive"; AbilCmd = "SpireResearch,Research14" },
    @{ Face = "EvolveViciousGlaive"; AbilCmd = "SpireResearch,Research7" },
    @{ Face = "EvolveBroodLordSpeed"; AbilCmd = "SpireResearch,Research8" },
    @{ Face = "EvolveSeveringGlave"; AbilCmd = "SpireResearch,Research15" }
)) {
    if (-not (Test-HasButton $spire $button.Face $button.AbilCmd)) {
        Add-Error "Spire missing Kerrigan tech button: $($button.Face) -> $($button.AbilCmd)"
    }
}

$mutalisk = Get-NodeById $unitDoc "Mutalisk"
if ((Get-AbilLinks $mutalisk) -notcontains "MutaliskMorphToBroodLord") {
    Add-Error "Mutalisk missing MutaliskMorphToBroodLord ability link."
}
if (-not (Test-HasButton $mutalisk "BroodLord" "MutaliskMorphToBroodLord,Train1")) {
    Add-Error "Mutalisk missing Brood Lord morph button."
}
Assert-InfoUnit (Get-NodeById $abilDoc "MutaliskMorphToBroodLord") "MutaliskMorphToBroodLord" "Train1" "BroodLord"

$nydusNetwork = Get-NodeById $unitDoc "NydusNetwork"
foreach ($button in @(
    @{ Face = "SummonNydusWorm"; AbilCmd = "BuildNydusCanal,Build1" },
    @{ Face = "SummonNydusCanalAttacker"; AbilCmd = "BuildNydusCanal,Build2" },
    @{ Face = "SummonNydusCanalCreeper"; AbilCmd = "BuildNydusCanal,Build3" },
    @{ Face = "SetRallyPoint"; AbilCmd = "Rally,Rally1" },
    @{ Face = "NydusCanalLoad"; AbilCmd = "NydusCanalTransport,Load" },
    @{ Face = "NydusWormIncreasedArmorPassive"; AbilCmd = "" }
)) {
    if (-not (Test-HasButton $nydusNetwork $button.Face $button.AbilCmd)) {
        Add-Error "NydusNetwork missing Kerrigan command-card button: $($button.Face) -> $($button.AbilCmd)"
    }
}
foreach ($abil in @("BuildNydusCanal", "NydusCanalTransport", "Rally", "RallyNydus")) {
    if ((Get-AbilLinks $nydusNetwork) -notcontains $abil) {
        Add-Error "NydusNetwork missing ability link: $abil"
    }
}
$buildNydusCanal = Get-NodeById $abilDoc "BuildNydusCanal"
foreach ($build in @("Build1", "Build2", "Build3")) {
    Assert-InfoUnit $buildNydusCanal "BuildNydusCanal" $build "NydusCanal"
}
if (-not (Test-LacksButtons $nydusNetwork @("ZagaraVoidCoopNydusWorm"))) {
    Add-Error "NydusNetwork still exposes Zagara Nydus button face."
}

$trainQueen = Get-NodeById $abilDoc "TrainQueen"
Assert-InfoUnit $trainQueen "TrainQueen" "Train4" "QueenCoop"
foreach ($townHallId in @("Hatchery", "Lair", "Hive")) {
    $townHall = Get-NodeById $unitDoc $townHallId
    if ((Get-AbilLinks $townHall) -notcontains "TrainQueen") {
        Add-Error "$townHallId missing TrainQueen ability link."
    }
    if (-not (Test-HasButton $townHall "QueenCoop" "TrainQueen,Train4")) {
        Add-Error "$townHallId missing QueenCoop train button."
    }
    if (-not (Test-LacksButtons $townHall @("Queen", "QueenClassic", "Niadra") @("TrainQueen,Train1", "TrainQueen,Train3"))) {
        Add-Error "$townHallId still exposes non-Kerrigan Queen/Niadra training."
    }
}

$queenCoop = Get-NodeById $unitDoc "QueenCoop"
if (-not (Test-LacksButtons $queenCoop @("ZagaraQueenInjectLarvaLocked"))) {
    Add-Error "QueenCoop still exposes Zagara-only inject-larva lock."
}

$queenCoopBurrowed = Get-NodeById $unitDoc "QueenCoopBurrowed"
if (-not (Test-LacksButtons $queenCoopBurrowed @("ZagaraQueenInjectLarvaLocked"))) {
    Add-Error "QueenCoopBurrowed still exposes Zagara-only inject-larva lock."
}

if ($errors.Count -gt 0) {
    $errors | ForEach-Object { Write-Host $_ }
    throw "Kerrigan tech chain validation failed with $($errors.Count) issue(s)."
}

Write-Host "Kerrigan tech chain validation passed."
