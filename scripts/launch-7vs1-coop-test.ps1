<#
.SYNOPSIS
Install and launch the replay-derived 7vs1 coop commander test map.

.EXAMPLE
  pwsh -NoProfile -ExecutionPolicy Bypass -File .\scripts\launch-7vs1-coop-test.ps1

.EXAMPLE
  pwsh -NoProfile -ExecutionPolicy Bypass -File .\scripts\launch-7vs1-coop-test.ps1 -Commanders @("TerranRaynor")

.EXAMPLE
  pwsh -NoProfile -ExecutionPolicy Bypass -File .\scripts\launch-7vs1-coop-test.ps1 -Commanders @("TerranRaynor","ZergKerrigan","ProtossArtanis","ZergAbathur","ProtossFenix","TerranTychus","TerranNova")
#>
[CmdletBinding()]
param(
    [string]$SourceRoot = "",
    [string]$Sc2Root = "E:\SC2\SC2new\StarCraft II",
    [string]$SwitcherPath = "",
    [string[]]$Commanders = @(),
    [string]$Preset = "Default",
    [switch]$NoLaunch
)

$ErrorActionPreference = "Stop"

function Get-WorkspaceRoot {
    return (Split-Path -Parent $PSScriptRoot)
}

function Resolve-DefaultSourceRoot {
    $workspaceRoot = Get-WorkspaceRoot
    return Join-Path $workspaceRoot "游戏数据\其他mod数据\7vs1母巢之战合作指挥官bate版_SC2Replay_94137"
}

function Resolve-CommanderPreset {
    param([string]$Name)

    $presets = @{
        Default = @(
            "TerranRaynor",
            "ZergKerrigan",
            "ProtossArtanis",
            "TerranNova",
            "ZergAbathur",
            "ProtossFenix",
            "ProtossVorazun"
        )
        Batch1 = @(
            "TerranRaynor",
            "ZergKerrigan",
            "ProtossArtanis",
            "TerranNova",
            "ZergAbathur",
            "ProtossFenix",
            "ProtossVorazun"
        )
        Batch2 = @(
            "TerranSwann",
            "ZergZagara",
            "ProtossKarax",
            "TerranHorner",
            "ZergDehaka",
            "ProtossAlarak",
            "ZergStukov"
        )
        Batch3 = @(
            "ProtossZeratul",
            "ZergStetmann",
            "TerranMengsk",
            "ProtossArtanis",
            "TerranRaynor",
            "ZergKerrigan",
            "ProtossVorazun"
        )
        TychusP1 = @(
            "TerranTychus",
            "TerranRaynor",
            "ZergKerrigan",
            "ProtossArtanis",
            "TerranNova",
            "ZergAbathur",
            "ProtossFenix"
        )
    }

    if (-not $presets.ContainsKey($Name)) {
        throw "Unknown preset '$Name'. Known presets: $($presets.Keys -join ', ')"
    }

    return @($presets[$Name])
}

function Copy-DirectoryClean {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Source,
        [Parameter(Mandatory = $true)]
        [string]$Destination
    )

    if (-not (Test-Path -LiteralPath $Source)) {
        throw "Source directory not found: $Source"
    }

    if (Test-Path -LiteralPath $Destination) {
        Remove-Item -LiteralPath $Destination -Recurse -Force
    }

    $parent = Split-Path -Parent $Destination
    if (-not (Test-Path -LiteralPath $parent)) {
        New-Item -ItemType Directory -Path $parent -Force | Out-Null
    }

    Copy-Item -LiteralPath $Source -Destination $Destination -Recurse -Force
}

function Set-DocumentInfoDependencies {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Path,
        [Parameter(Mandatory = $true)]
        [string[]]$Dependencies
    )

    if (-not (Test-Path -LiteralPath $Path)) {
        throw "DocumentInfo not found: $Path"
    }

    [xml]$xml = Get-Content -LiteralPath $Path -Raw
    $doc = $xml.SelectSingleNode("/DocInfo")
    if (-not $doc) {
        throw "Invalid DocumentInfo: missing /DocInfo in $Path"
    }

    $old = $xml.SelectSingleNode("/DocInfo/Dependencies")
    if ($old) {
        $null = $doc.RemoveChild($old)
    }

    $dependenciesNode = $xml.CreateElement("Dependencies")
    foreach ($dependency in $Dependencies) {
        $valueNode = $xml.CreateElement("Value")
        $valueNode.InnerText = $dependency
        $null = $dependenciesNode.AppendChild($valueNode)
    }

    $insertBefore = $doc.SelectSingleNode("Screenshot|PatchNote|Preload|HowToPlayBasic|HowToPlayAdvanced")
    if ($insertBefore) {
        $null = $doc.InsertBefore($dependenciesNode, $insertBefore)
    }
    else {
        $null = $doc.AppendChild($dependenciesNode)
    }

    $settings = New-Object System.Xml.XmlWriterSettings
    $settings.Encoding = New-Object System.Text.UTF8Encoding($false)
    $settings.Indent = $true
    $settings.NewLineChars = "`r`n"
    $writer = [System.Xml.XmlWriter]::Create($Path, $settings)
    try {
        $xml.Save($writer)
    }
    finally {
        $writer.Close()
    }
}

function Test-ByteSequenceAt {
    param(
        [byte[]]$Bytes,
        [int]$Offset,
        [byte[]]$Needle
    )

    if ($Offset + $Needle.Length -gt $Bytes.Length) {
        return $false
    }

    for ($i = 0; $i -lt $Needle.Length; $i++) {
        if ($Bytes[$Offset + $i] -ne $Needle[$i]) {
            return $false
        }
    }

    return $true
}

function Find-DocumentHeaderDependencyStart {
    param([byte[]]$Bytes)

    $markers = @(
        [System.Text.Encoding]::UTF8.GetBytes("file:"),
        [System.Text.Encoding]::UTF8.GetBytes("bnet:")
    )

    for ($offset = 4; $offset -lt $Bytes.Length; $offset++) {
        foreach ($marker in $markers) {
            if (-not (Test-ByteSequenceAt -Bytes $Bytes -Offset $offset -Needle $marker)) {
                continue
            }

            $count = [System.BitConverter]::ToUInt32($Bytes, $offset - 4)
            if (($count -gt 0) -and ($count -lt 128)) {
                return $offset
            }
        }
    }

    throw "DocumentHeader dependency table not found."
}

function Get-DocumentHeaderDependencyEndOffset {
    param(
        [byte[]]$Bytes,
        [int]$Start,
        [uint32]$Count
    )

    $offset = $Start
    for ($index = 0; $index -lt $Count; $index++) {
        while (($offset -lt $Bytes.Length) -and ($Bytes[$offset] -ne 0)) {
            $offset++
        }
        if ($offset -ge $Bytes.Length) {
            throw "DocumentHeader dependency string is not null-terminated."
        }
        $offset++
    }

    return $offset
}

function Set-DocumentHeaderDependencies {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Path,
        [Parameter(Mandatory = $true)]
        [string[]]$Dependencies
    )

    if (-not (Test-Path -LiteralPath $Path)) {
        throw "DocumentHeader not found: $Path"
    }

    [byte[]]$bytes = [System.IO.File]::ReadAllBytes($Path)
    $dependencyStart = Find-DocumentHeaderDependencyStart -Bytes $bytes
    $countOffset = $dependencyStart - 4
    $currentCount = [System.BitConverter]::ToUInt32($bytes, $countOffset)
    $dependencyEnd = Get-DocumentHeaderDependencyEndOffset -Bytes $bytes -Start $dependencyStart -Count $currentCount
    $dependencyBytes = [System.Text.Encoding]::UTF8.GetBytes((($Dependencies -join "`0") + "`0"))
    $countBytes = [System.BitConverter]::GetBytes([uint32]$Dependencies.Count)
    $stream = New-Object System.IO.MemoryStream

    $stream.Write($bytes, 0, $countOffset)
    $stream.Write($countBytes, 0, $countBytes.Length)
    $stream.Write($dependencyBytes, 0, $dependencyBytes.Length)
    $stream.Write($bytes, $dependencyEnd, $bytes.Length - $dependencyEnd)

    [System.IO.File]::WriteAllBytes($Path, $stream.ToArray())
}

function Set-PackageDependencies {
    param(
        [Parameter(Mandatory = $true)]
        [string]$PackageRoot,
        [Parameter(Mandatory = $true)]
        [string[]]$Dependencies
    )

    Set-DocumentInfoDependencies -Path (Join-Path $PackageRoot "DocumentInfo") -Dependencies $Dependencies
    Set-DocumentHeaderDependencies -Path (Join-Path $PackageRoot "DocumentHeader") -Dependencies $Dependencies
}

function Get-CodexStartPointFunction {
    param(
        [Parameter(Mandatory = $true)]
        [string]$FunctionName
    )

    return @"
point $FunctionName (int lp_player) {
    if (lp_player == 1) { return Point(17.2722, 167.6455); }
    if (lp_player == 2) { return Point(61.2580, 177.7963); }
    if (lp_player == 3) { return Point(180.3906, 176.9645); }
    if (lp_player == 4) { return Point(179.5000, 85.5000); }
    if (lp_player == 5) { return Point(175.0556, 12.0603); }
    if (lp_player == 6) { return Point(112.8891, 12.5356); }
    if (lp_player == 7) { return Point(32.5000, 12.5000); }
    if (lp_player == 8) { return Point(11.5000, 90.5000); }
    return Point(0.0, 0.0);
}

"@
}

function Add-SafeStartPointOverride {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Path,
        [Parameter(Mandatory = $true)]
        [string]$FunctionName,
        [Parameter(Mandatory = $true)]
        [string]$InsertionAnchor
    )

    $text = Get-Content -LiteralPath $Path -Raw
    $definitionPattern = "point\s+$([regex]::Escape($FunctionName))\s*\("
    if ($text -notmatch $definitionPattern) {
        $anchorIndex = $text.IndexOf($InsertionAnchor, [System.StringComparison]::Ordinal)
        if ($anchorIndex -lt 0) {
            throw "Could not find insertion anchor '$InsertionAnchor' in $Path"
        }

        $text = $text.Insert($anchorIndex, (Get-CodexStartPointFunction -FunctionName $FunctionName))
    }

    $text = [regex]::Replace($text, 'PlayerStartLocation\(', "$FunctionName(")
    Set-Content -LiteralPath $Path -Value $text -NoNewline -Encoding UTF8
}

function Disable-LiveRewardGrants {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Path
    )

    $text = Get-Content -LiteralPath $Path -Raw
    $text = [regex]::Replace(
        $text,
        '(?m)^\s*PlayerAddReward\([^\r\n]*\);\s*$',
        '    // Codex local smoke test: PlayerAddReward omitted because SC2Switcher has no reward authority.'
    )
    Set-Content -LiteralPath $Path -Value $text -NoNewline -Encoding UTF8
}

function Set-LiveCommanderTestOverride {
    param(
        [Parameter(Mandatory = $true)]
        [string]$LibPath,
        [Parameter(Mandatory = $true)]
        [string[]]$SelectedCommanders
    )

    if (($SelectedCommanders.Count -lt 1) -or ($SelectedCommanders.Count -gt 7)) {
        throw "Expected 1-7 commanders. Got $($SelectedCommanders.Count)."
    }

    $known = @(
        "ZergAbathur",
        "ProtossAlarak",
        "ProtossArtanis",
        "ZergDehaka",
        "ProtossFenix",
        "TerranHorner",
        "ProtossKarax",
        "ZergKerrigan",
        "TerranMengsk",
        "TerranNova",
        "TerranRaynor",
        "ZergStetmann",
        "ZergStukov",
        "TerranSwann",
        "TerranTychus",
        "ProtossVorazun",
        "ZergZagara",
        "ProtossZeratul"
    )

    foreach ($commander in $SelectedCommanders) {
        if ($known -notcontains $commander) {
            throw "Unknown commander '$commander'. Known commanders: $($known -join ', ')"
        }
    }

    $text = Get-Content -LiteralPath $LibPath -Raw
    if ($text -match "libKPVP_gf_codex_init_7vs1_test_commanders") {
        return
    }

    $functionBlock = New-Object System.Text.StringBuilder
    [void]$functionBlock.AppendLine("")
    [void]$functionBlock.AppendLine("//--------------------------------------------------------------------------------------------------")
    [void]$functionBlock.AppendLine("// Codex live test override: initialize seven local test commanders without Battle.net lobby attrs.")
    [void]$functionBlock.AppendLine("//--------------------------------------------------------------------------------------------------")
    [void]$functionBlock.AppendLine("void libKPVP_gf_codex_add_special_groups (string lp_commander, int lp_player) {")
    [void]$functionBlock.AppendLine("    if (lp_commander == `"ZergAbathur`") {")
    [void]$functionBlock.AppendLine("        PlayerGroupAdd(libKPVP_gv_abathur_players, lp_player);")
    [void]$functionBlock.AppendLine("    }")
    [void]$functionBlock.AppendLine("    else if (lp_commander == `"ZergDehaka`") {")
    [void]$functionBlock.AppendLine("        PlayerGroupAdd(libKPVP_gv_dehaka_players, lp_player);")
    [void]$functionBlock.AppendLine("    }")
    [void]$functionBlock.AppendLine("    else if (lp_commander == `"TerranHorner`") {")
    [void]$functionBlock.AppendLine("        libNtve_gf_AddPlayerGroupToPlayerGroup(libNtve_gf_AlliesEnemiesOfPlayerCountInactiveAndSelf(libNtve_ge_PlayerRelation_AllyMutual, lp_player), libKPVP_gv_han_allies);")
    [void]$functionBlock.AppendLine("    }")
    [void]$functionBlock.AppendLine("    else if (lp_commander == `"TerranMengsk`") {")
    [void]$functionBlock.AppendLine("        PlayerGroupAdd(libKPVP_gv_mengsk_players, lp_player);")
    [void]$functionBlock.AppendLine("    }")
    [void]$functionBlock.AppendLine("    else if (lp_commander == `"TerranTychus`") {")
    [void]$functionBlock.AppendLine("        PlayerGroupAdd(libKPVP_gv_tychus_players, lp_player);")
    [void]$functionBlock.AppendLine("    }")
    [void]$functionBlock.AppendLine("}")
    [void]$functionBlock.AppendLine("")
    [void]$functionBlock.AppendLine("void libKPVP_gf_codex_ensure_start_units (int lp_player, string lp_commander) {")
    [void]$functionBlock.AppendLine("    point lv_start;")
    [void]$functionBlock.AppendLine("    point lv_workerPoint;")
    [void]$functionBlock.AppendLine("    string lv_race;")
    [void]$functionBlock.AppendLine("    string lv_townHall;")
    [void]$functionBlock.AppendLine("    string lv_worker;")
    [void]$functionBlock.AppendLine("    unitgroup lv_structures;")
    [void]$functionBlock.AppendLine("    unit lv_primary;")
    [void]$functionBlock.AppendLine("")
    [void]$functionBlock.AppendLine("    lv_start = libKPVP_gf_codex_start_point(lp_player);")
    [void]$functionBlock.AppendLine("    lv_workerPoint = Point(PointGetX(lv_start) + 4.0, PointGetY(lv_start) - 2.0);")
    [void]$functionBlock.AppendLine("    lv_race = libKCOR_gf_CC_CommanderSpawnRace(lp_commander);")
    [void]$functionBlock.AppendLine("    lv_townHall = `"CommandCenter`";")
    [void]$functionBlock.AppendLine("    lv_worker = `"SCV`";")
    [void]$functionBlock.AppendLine("    if (lv_race == `"Zerg`") {")
    [void]$functionBlock.AppendLine("        lv_townHall = `"Hatchery`";")
    [void]$functionBlock.AppendLine("        lv_worker = `"Drone`";")
    [void]$functionBlock.AppendLine("    }")
    [void]$functionBlock.AppendLine("    else if (lv_race == `"Prot`") {")
    [void]$functionBlock.AppendLine("        lv_townHall = `"Nexus`";")
    [void]$functionBlock.AppendLine("        lv_worker = `"Probe`";")
    [void]$functionBlock.AppendLine("    }")
    [void]$functionBlock.AppendLine("    if (lp_commander == `"TerranHorner`") {")
    [void]$functionBlock.AppendLine("        lv_townHall = `"HHCommandCenter`";")
    [void]$functionBlock.AppendLine("        lv_worker = `"HHSCV`";")
    [void]$functionBlock.AppendLine("    }")
    [void]$functionBlock.AppendLine("    else if (lp_commander == `"TerranTychus`") {")
    [void]$functionBlock.AppendLine("        lv_townHall = `"TychusCommandCenter`";")
    [void]$functionBlock.AppendLine("        lv_worker = `"TychusSCV`";")
    [void]$functionBlock.AppendLine("    }")
    [void]$functionBlock.AppendLine("    else if (lp_commander == `"TerranMengsk`") {")
    [void]$functionBlock.AppendLine("        lv_townHall = `"CommandCenterMengsk`";")
    [void]$functionBlock.AppendLine("        lv_worker = `"SCVMengsk`";")
    [void]$functionBlock.AppendLine("    }")
    [void]$functionBlock.AppendLine("    else if (lp_commander == `"ZergStukov`") {")
    [void]$functionBlock.AppendLine("        lv_townHall = `"SICommandCenter`";")
    [void]$functionBlock.AppendLine("        lv_worker = `"SISCV`";")
    [void]$functionBlock.AppendLine("    }")
    [void]$functionBlock.AppendLine("    else if (lp_commander == `"ZergDehaka`") {")
    [void]$functionBlock.AppendLine("        lv_townHall = `"DehakaHatchery`";")
    [void]$functionBlock.AppendLine("        lv_worker = `"DehakaDrone`";")
    [void]$functionBlock.AppendLine("    }")
    [void]$functionBlock.AppendLine("    else if (lp_commander == `"ZergStetmann`") {")
    [void]$functionBlock.AppendLine("        lv_townHall = `"HatcheryStetmann`";")
    [void]$functionBlock.AppendLine("        lv_worker = `"DroneStetmann`";")
    [void]$functionBlock.AppendLine("    }")
    [void]$functionBlock.AppendLine("")
    [void]$functionBlock.AppendLine("    lv_structures = UnitGroup(null, lp_player, RegionCircle(lv_start, 12.0), UnitFilter((1 << c_targetFilterStructure), 0, (1 << c_targetFilterMissile), (1 << (c_targetFilterDead - 32)) | (1 << (c_targetFilterHidden - 32))), 0);")
    [void]$functionBlock.AppendLine("    if (UnitGroupCount(lv_structures, c_unitCountAlive) <= 0) {")
    [void]$functionBlock.AppendLine("        libNtve_gf_CreateUnitsWithDefaultFacing(1, lv_townHall, c_unitCreateIgnorePlacement, lp_player, lv_start);")
    [void]$functionBlock.AppendLine("        lv_primary = UnitLastCreated();")
    [void]$functionBlock.AppendLine("        libNtve_gf_CreateUnitsWithDefaultFacing(5, lv_worker, c_unitCreateIgnorePlacement, lp_player, lv_workerPoint);")
    [void]$functionBlock.AppendLine("    }")
    [void]$functionBlock.AppendLine("    else {")
    [void]$functionBlock.AppendLine("        lv_primary = UnitGroupClosestToPoint(lv_structures, lv_start);")
    [void]$functionBlock.AppendLine("    }")
    [void]$functionBlock.AppendLine("    libKMIS_gv_cM_PrimaryTownHall[lp_player] = lv_primary;")
    [void]$functionBlock.AppendLine("}")
    [void]$functionBlock.AppendLine("")
    [void]$functionBlock.AppendLine("void libKPVP_gf_codex_init_test_player (int lp_player, string lp_commander) {")
    [void]$functionBlock.AppendLine("    libKPVP_gf_reset_skins_for_player(lp_player);")
    [void]$functionBlock.AppendLine("    libKPVP_gv_players_names[lp_player] = PlayerName(lp_player);")
    [void]$functionBlock.AppendLine("    libKPVP_gf_set_commander_for_player(lp_commander, lp_player);")
    [void]$functionBlock.AppendLine("    libKPVP_gf_codex_add_special_groups(lp_commander, lp_player);")
    [void]$functionBlock.AppendLine("    libKPVP_gf_codex_ensure_start_units(lp_player, lp_commander);")
    [void]$functionBlock.AppendLine("}")
    [void]$functionBlock.AppendLine("")
    [void]$functionBlock.AppendLine("void libKPVP_gf_codex_init_7vs1_test_commanders () {")
    for ($i = 0; $i -lt 7; $i++) {
        $player = $i + 1
        [void]$functionBlock.AppendLine("    libKPVP_gf_codex_init_test_player($player, `"$($SelectedCommanders[$i])`");")
    }
    [void]$functionBlock.AppendLine("}")

    $insertBefore = "//--------------------------------------------------------------------------------------------------`r`nvoid libKPVP_gt_player_defeated_Init"
    if ($text -notlike "*$insertBefore*") {
        $insertBefore = "//--------------------------------------------------------------------------------------------------`nvoid libKPVP_gt_player_defeated_Init"
    }
    if ($text -notlike "*$insertBefore*") {
        throw "Could not find insertion point for test commander function in $LibPath"
    }
    $text = $text.Replace($insertBefore, ($functionBlock.ToString() + $insertBefore))

    $pattern = '(?s)autoEE3370AE_g = PlayerGroupActive\(\);\s+lv_player = -1;\s+while \(true\) \{.*?\n\s+\}\s+UnitEventSetNullVariableInvalid\(true\);'
    $replacement = "lv_with_random_ai = false;`r`n    autoEE3370AE_g = PlayerGroupActive();`r`n    libKPVP_gf_codex_init_7vs1_test_commanders();`r`n    UnitEventSetNullVariableInvalid(true);"
    $newText = [regex]::Replace($text, $pattern, $replacement, 1)
    if ($newText -eq $text) {
        throw "Could not replace original commander selection loop in $LibPath"
    }

    Set-Content -LiteralPath $LibPath -Value $newText -NoNewline -Encoding UTF8
}

function Stop-RunningSc2 {
    $processNames = @("SC2_x64", "SC2Switcher_x64")

    foreach ($processName in $processNames) {
        $running = Get-Process -Name $processName -ErrorAction SilentlyContinue
        if (-not $running) {
            continue
        }

        foreach ($proc in $running) {
            try {
                Stop-Process -Id $proc.Id -Force -ErrorAction Stop
            }
            catch {
                Write-Warning "Could not stop $processName (PID $($proc.Id)): $($_.Exception.Message)"
            }
        }
    }

    Start-Sleep -Seconds 2
}

if ([string]::IsNullOrWhiteSpace($SourceRoot)) {
    $SourceRoot = Resolve-DefaultSourceRoot
}

if ([string]::IsNullOrWhiteSpace($SwitcherPath)) {
    $SwitcherPath = Join-Path $Sc2Root "Support64\SC2Switcher_x64.exe"
}

$mapSource = Join-Path $SourceRoot "s2ma_packages\pkg02\extract"
$extensionSource = Join-Path $SourceRoot "s2ma_packages\pkg03\extract"
$mapLive = Join-Path $Sc2Root "Maps\7vs1\7vs1CoopTest.SC2Map"
$extensionLive = Join-Path $Sc2Root "Mods\7vs1\CoopZeroPop.SC2Mod"

if (-not (Test-Path -LiteralPath $SwitcherPath)) {
    throw "SwitcherPath not found: $SwitcherPath"
}

$defaultCommanderSlots = Resolve-CommanderPreset -Name $Preset

if ($Commanders.Count -eq 0) {
    $Commanders = @($defaultCommanderSlots)
}

if (($Commanders.Count -lt 1) -or ($Commanders.Count -gt 7)) {
    throw "Expected 1-7 commanders. Got $($Commanders.Count)."
}

$effectiveCommanders = @($Commanders)
for ($i = $effectiveCommanders.Count; $i -lt 7; $i++) {
    $effectiveCommanders += $defaultCommanderSlots[$i]
}

Copy-DirectoryClean -Source $mapSource -Destination $mapLive
Copy-DirectoryClean -Source $extensionSource -Destination $extensionLive

$extensionDependencies = @(
    "bnet:Void Multi (Mod)/0.0/999,file:Mods/VoidMulti.SC2Mod",
    "bnet:Co-op Mission/0.0/999,file:Mods/StarCoop/StarCoop.SC2Mod"
)
$mapDependencies = @(
    "bnet:自由之翼剧情 (战役)/0.0/999,file:Campaigns/LibertyStory.SC2Campaign",
    "bnet:自由之翼 (Mod)/0.0/999,file:Mods/Liberty.SC2Mod",
    "file:Mods/7vs1/CoopZeroPop.SC2Mod"
)

Set-PackageDependencies -PackageRoot $extensionLive -Dependencies $extensionDependencies
Set-PackageDependencies -PackageRoot $mapLive -Dependencies $mapDependencies

$liveLibKPVP = Join-Path $extensionLive "Base.SC2Data\LibKPVP.galaxy"
Set-LiveCommanderTestOverride -LibPath $liveLibKPVP -SelectedCommanders $effectiveCommanders
Add-SafeStartPointOverride -Path $liveLibKPVP -FunctionName "libKPVP_gf_codex_start_point" -InsertionAnchor "void libKPVP_gf_apply_peace_time"

$liveLibKCOR = Join-Path $extensionLive "Base.SC2Data\LibKCOR.galaxy"
Add-SafeStartPointOverride -Path $liveLibKCOR -FunctionName "libKCOR_gf_codex_start_point" -InsertionAnchor "void libKCOR_gf_CC_ApplyRaceTechZerg"

$liveLibKMIS = Join-Path $extensionLive "Base.SC2Data\LibKMIS.galaxy"
Add-SafeStartPointOverride -Path $liveLibKMIS -FunctionName "libKMIS_gf_codex_start_point" -InsertionAnchor "void libKMIS_gf_CM_Zeratul_GiveProphecyHint"
Disable-LiveRewardGrants -Path $liveLibKMIS

Write-Host "Installed map: $mapLive"
Write-Host "Installed extension mod: $extensionLive"
Write-Host "Requested commanders: $($Commanders -join ', ')"
Write-Host "Test commanders P1-P7: $($effectiveCommanders -join ', ')"

if (-not $NoLaunch) {
    Stop-RunningSc2
    Write-Host "Launching map: $mapLive"
    & $SwitcherPath $mapLive
}
