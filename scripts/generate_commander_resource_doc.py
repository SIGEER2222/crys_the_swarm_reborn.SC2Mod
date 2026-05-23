# -*- coding: gbk -*-
from __future__ import annotations

import re
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DOC_DIR = ROOT / "docs" / "指挥官"
MODS_ROOT = ROOT / "合作指挥官版起义狂潮" / "Mods" / "XM"
OUT = DOC_DIR / "已移植指挥官资源清单-2026-05-23.md"

COMMANDERS = [
    "Abathur",
    "Alarak",
    "Dehaka",
    "Kerrigan",
    "Mengsk",
    "Mira",
    "Nova",
    "Stetmann",
    "Stukov",
    "Swann",
    "Tychus",
]

BUILDING_PATTERN = re.compile(
    r"Nexus|CommandCenter|Hatchery|Lair|Hive|Barracks|Factory|Starport|Gateway|WarpGate|Robotics|Stargate|Forge|Pylon|Depot|Bunker|Turret|SpawningPool|EvolutionChamber|RoachWarren|HydraliskDen|Spire|UltraliskCavern|Nydus|Extractor|Assimilator|Refinery|Armory|EngineeringBay|Twilight|Cybernetics|FleetBeacon|RoboticsBay|TemplarArchive|DarkShrine|BanelingNest|LurkerDen|Infestation|Colonist|Omega|Worm|Cannon|Monolith|MissileTurret|SupplyDepot"
)
HERO_PATTERN = re.compile(
    r"Alarak|Kerrigan|Dehaka|Abathur|Stukov|Tychus|Nova|Mengsk|Swann|Stetmann|Mira|Horner|Hyperion|Leviathan|Brutalisk|Apocalisk|Odin|Hercules|DeathFleet|Mothership|SOAMothership|CoopCaster|Caster|Placeholder|Revive|Cocoon|Champion"
)
PANEL_PATTERN = re.compile(
    r"TopBar|Global|Summon|Calldown|Deathfleet|DeathFleet|StructureOvercharge|Hyperion|Banshee|Odin|Nuke|Drop|Panel|Caster|Ultimate|Mend|Toxic|Symbiote|Biomass|Apocalisk|Leviathan|Brutalisk"
)
HERO_ABILITY_PATTERN = re.compile(
    r"Leap|Charge|Knock|Slash|Strike|Psi|Storm|Heal|Consume|Roar|Mend|Dash|Snipe|Shot|Grenade|Turret|Revive|Empower|Wave|Assimilation|Primal|Spawn|Call|Deploy"
)
UNIT_EXCLUDE_PATTERN = re.compile(r"MISSILE|Missile|Weapon|Placeholder|Dummy|Caster|Beacon|Egg|Cocoon")


def catalog_ids(path: Path) -> list[str]:
    if not path.exists():
        return []
    try:
        root = ET.parse(path).getroot()
    except ET.ParseError:
        return []
    ids = [node.attrib["id"] for node in list(root) if "id" in node.attrib]
    return sorted(set(ids))


def add_section(lines: list[str], title: str, items: list[str]) -> None:
    lines.append(title)
    lines.append("")
    if not items:
        lines.append("- 未扫描到明显对象。")
    else:
        for item in items:
            lines.append(f"- `{item}`")
    lines.append("")


def main() -> None:
    DOC_DIR.mkdir(parents=True, exist_ok=True)
    lines: list[str] = []
    lines.extend(
        [
            "# 已移植指挥官资源清单",
            "",
            "生成日期：2026-05-23",
            "",
            "本文从当前工作区 `Mods/XM/XM*.SC2Mod/Base.SC2Data/GameData` 扫描已移植或正在移植的指挥官模块，输出单位、建筑、技能、升级、行为、效果、面板/英雄入口等清单。",
            "",
            "注意：本清单表示 catalog 数据当前存在，不等于所有对象已经完成实机验证。",
            "",
        ]
    )

    for commander in COMMANDERS:
        mod = MODS_ROOT / f"XM{commander}.SC2Mod"
        if not mod.exists():
            continue
        game_data = mod / "Base.SC2Data" / "GameData"
        unit_ids = catalog_ids(game_data / "UnitData.xml")
        abil_ids = catalog_ids(game_data / "AbilData.xml")
        button_ids = catalog_ids(game_data / "ButtonData.xml")
        upgrade_ids = catalog_ids(game_data / "UpgradeData.xml")
        behavior_ids = catalog_ids(game_data / "BehaviorData.xml")
        effect_ids = catalog_ids(game_data / "EffectData.xml")

        buildings = [item for item in unit_ids if BUILDING_PATTERN.search(item)][:80]
        heroes = [item for item in unit_ids if HERO_PATTERN.search(item)][:80]
        units = [
            item
            for item in unit_ids
            if not BUILDING_PATTERN.search(item) and not UNIT_EXCLUDE_PATTERN.search(item)
        ][:120]
        panel_abilities = [item for item in abil_ids if PANEL_PATTERN.search(item)][:80]
        hero_abilities = [
            item
            for item in abil_ids
            if commander in item or HERO_ABILITY_PATTERN.search(item)
        ][:100]
        commander_upgrades = [
            item
            for item in upgrade_ids
            if commander in item or "CommanderPrestige" in item or "Mastery" in item
        ][:120]

        lines.extend(
            [
                "---",
                "",
                f"# {commander}",
                "",
                f"模块：`XM{commander}.SC2Mod`",
                "",
                "## 数据量",
                "",
                "| 类型 | 数量 |",
                "|---|---:|",
                f"| UnitData | {len(unit_ids)} |",
                f"| AbilData | {len(abil_ids)} |",
                f"| ButtonData | {len(button_ids)} |",
                f"| UpgradeData | {len(upgrade_ids)} |",
                f"| BehaviorData | {len(behavior_ids)} |",
                f"| EffectData | {len(effect_ids)} |",
                "",
            ]
        )

        add_section(lines, "## 英雄 / 面板 / 特殊单位", heroes)
        add_section(lines, "## 建筑 / 科技建筑", buildings)
        add_section(lines, "## 兵种 / 可用单位", units)
        add_section(lines, "## 面板 / 全局技能候选", panel_abilities)
        add_section(lines, "## 英雄 / 单位技能候选", hero_abilities)
        add_section(lines, "## 指挥官升级 / 威望 / 精通候选", commander_upgrades)

        lines.extend(["## 备注", ""])
        if commander in {"Abathur", "Kerrigan", "Alarak"}:
            lines.append("- 该指挥官包含近期官方导入数据，清单较大；仍需以对应 port/tech-chain 验证脚本和实机结果为准。")
        else:
            lines.append("- 该指挥官为原有模块，当前清单仅做 catalog 存量扫描；完整度需后续逐项审计。")
        lines.append("")

    OUT.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"Wrote {OUT}")


if __name__ == "__main__":
    main()
