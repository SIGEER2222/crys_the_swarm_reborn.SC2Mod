param(
    [string]$WorkspaceRoot = (Split-Path -Parent $PSScriptRoot)
)

$ErrorActionPreference = "Stop"

$projectRoot = Get-Item -LiteralPath $WorkspaceRoot
$outDir = Join-Path $projectRoot.FullName "docs\指挥官"
$out = Join-Path $outDir "已移植指挥官资源清单-2026-05-23.md"
$modsRoot = Join-Path $projectRoot.FullName "合作指挥官版起义狂潮\Mods\XM"
$commanders = @("Abathur", "Alarak", "Dehaka", "Kerrigan", "Mengsk", "Mira", "Nova", "Stetmann", "Stukov", "Swann", "Tychus")

New-Item -ItemType Directory -Path $outDir -Force | Out-Null

function Get-CatalogIds {
    param([string]$Path)
    if (-not (Test-Path -LiteralPath $Path)) {
        return @()
    }
    [xml]$doc = Get-Content -LiteralPath $Path -Raw
    return @($doc.Catalog.ChildNodes | Where-Object { $_.NodeType -eq "Element" -and $_.id } | ForEach-Object { [string]$_.id } | Sort-Object -Unique)
}

$lines = [System.Collections.Generic.List[string]]::new()
$lines.Add("# 已移植指挥官资源清单")
$lines.Add("")
$lines.Add("生成日期：2026-05-23")
$lines.Add("")
$lines.Add("本文从当前工作区 `Mods/XM/XM*.SC2Mod/Base.SC2Data/GameData` 扫描已移植或正在移植的指挥官模块，输出单位、建筑、技能、升级、行为、效果、面板/英雄入口等清单。")
$lines.Add("")
$lines.Add("注意：本清单表示 catalog 数据当前存在，不等于所有对象已经完成实机验证。")
$lines.Add("")

$buildingPattern = "Nexus|CommandCenter|Hatchery|Lair|Hive|Barracks|Factory|Starport|Gateway|WarpGate|Robotics|Stargate|Forge|Pylon|Depot|Bunker|Turret|SpawningPool|EvolutionChamber|RoachWarren|HydraliskDen|Spire|UltraliskCavern|Nydus|Extractor|Assimilator|Refinery|Armory|EngineeringBay|Twilight|Cybernetics|FleetBeacon|RoboticsBay|TemplarArchive|DarkShrine|BanelingNest|LurkerDen|Infestation|Colonist|Omega|Worm|Cannon|Monolith|MissileTurret|SupplyDepot"
$heroPattern = "Alarak|Kerrigan|Dehaka|Abathur|Stukov|Tychus|Nova|Mengsk|Swann|Stetmann|Mira|Horner|Hyperion|Leviathan|Brutalisk|Apocalisk|Odin|Hercules|DeathFleet|Mothership|SOAMothership|CoopCaster|Caster|Placeholder|Revive|Cocoon|Champion"
$panelPattern = "TopBar|Global|Summon|Calldown|Deathfleet|DeathFleet|StructureOvercharge|Hyperion|Banshee|Odin|Nuke|Drop|Panel|Caster|Ultimate|Mend|Toxic|Symbiote|Biomass|Apocalisk|Leviathan|Brutalisk"
$heroAbilityPattern = "Leap|Charge|Knock|Slash|Strike|Psi|Storm|Heal|Consume|Roar|Mend|Dash|Snipe|Shot|Grenade|Turret|Revive|Empower|Wave|Assimilation|Primal|Spawn|Call|Deploy"

foreach ($commander in $commanders) {
    $mod = Join-Path $modsRoot "XM$commander.SC2Mod"
    if (-not (Test-Path -LiteralPath $mod)) {
        continue
    }

    $gameData = Join-Path $mod "Base.SC2Data\GameData"
    $unitIds = Get-CatalogIds (Join-Path $gameData "UnitData.xml")
    $abilIds = Get-CatalogIds (Join-Path $gameData "AbilData.xml")
    $buttonIds = Get-CatalogIds (Join-Path $gameData "ButtonData.xml")
    $upgradeIds = Get-CatalogIds (Join-Path $gameData "UpgradeData.xml")
    $behaviorIds = Get-CatalogIds (Join-Path $gameData "BehaviorData.xml")
    $effectIds = Get-CatalogIds (Join-Path $gameData "EffectData.xml")

    $buildings = @($unitIds | Where-Object { $_ -match $buildingPattern } | Select-Object -First 80)
    $heroes = @($unitIds | Where-Object { $_ -match $heroPattern } | Select-Object -First 80)
    $units = @($unitIds | Where-Object { $_ -notmatch $buildingPattern -and $_ -notmatch "MISSILE|Missile|Weapon|Placeholder|Dummy|Caster|Beacon|Egg|Cocoon" } | Select-Object -First 120)
    $panelAbilities = @($abilIds | Where-Object { $_ -match $panelPattern } | Select-Object -First 80)
    $heroAbilities = @($abilIds | Where-Object { $_ -match $commander -or $_ -match $heroAbilityPattern } | Select-Object -First 100)
    $commanderUpgrades = @($upgradeIds | Where-Object { $_ -match $commander -or $_ -match "CommanderPrestige|Mastery" } | Select-Object -First 120)

    $lines.Add("---")
    $lines.Add("")
    $lines.Add("# $commander")
    $lines.Add("")
    $lines.Add("模块：``XM$commander.SC2Mod``")
    $lines.Add("")
    $lines.Add("## 数据量")
    $lines.Add("")
    $lines.Add("| 类型 | 数量 |")
    $lines.Add("|---|---:|")
    $lines.Add("| UnitData | $($unitIds.Count) |")
    $lines.Add("| AbilData | $($abilIds.Count) |")
    $lines.Add("| ButtonData | $($buttonIds.Count) |")
    $lines.Add("| UpgradeData | $($upgradeIds.Count) |")
    $lines.Add("| BehaviorData | $($behaviorIds.Count) |")
    $lines.Add("| EffectData | $($effectIds.Count) |")
    $lines.Add("")

    $sections = @(
        @{ Title = "## 英雄 / 面板 / 特殊单位"; Items = $heroes },
        @{ Title = "## 建筑 / 科技建筑"; Items = $buildings },
        @{ Title = "## 兵种 / 可用单位"; Items = $units },
        @{ Title = "## 面板 / 全局技能候选"; Items = $panelAbilities },
        @{ Title = "## 英雄 / 单位技能候选"; Items = $heroAbilities },
        @{ Title = "## 指挥官升级 / 威望 / 精通候选"; Items = $commanderUpgrades }
    )

    foreach ($section in $sections) {
        $lines.Add($section.Title)
        $lines.Add("")
        if ($section.Items.Count -eq 0) {
            $lines.Add("- 未扫描到明显对象。")
        }
        else {
            foreach ($id in $section.Items) {
                $lines.Add("- ``$id``")
            }
        }
        $lines.Add("")
    }

    $lines.Add("## 备注")
    $lines.Add("")
    if ($commander -in @("Abathur", "Kerrigan", "Alarak")) {
        $lines.Add("- 该指挥官包含近期官方导入数据，清单较大；仍需以对应 port/tech-chain 验证脚本和实机结果为准。")
    }
    else {
        $lines.Add("- 该指挥官为原有模块，当前清单仅做 catalog 存量扫描；完整度需后续逐项审计。")
    }
    $lines.Add("")
}

$lines | Set-Content -LiteralPath $out -Encoding utf8NoBOM
Write-Host "Wrote $out"
