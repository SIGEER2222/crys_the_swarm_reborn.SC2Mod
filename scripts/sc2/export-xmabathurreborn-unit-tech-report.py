from __future__ import annotations

import argparse
import copy
import json
import re
from collections import defaultdict, deque
from dataclasses import dataclass
from datetime import date
from pathlib import Path
from typing import Dict, Iterable, List, Optional, Tuple
import xml.etree.ElementTree as ET


SCRIPT_DIR = Path(__file__).resolve().parent
REPO_ROOT = SCRIPT_DIR.parent.parent
DEFAULT_MODULE_ROOT = REPO_ROOT / "合作指挥官版起义狂潮" / "Mods" / "XM" / "XMAbathurReborn.SC2Mod"
DEFAULT_OUTPUT_MD = REPO_ROOT / "docs" / "每日进度" / "2026-05-28-XMAbathurReborn兵种与科技中文清单.md"
DEFAULT_OUTPUT_JSON = REPO_ROOT / "tmp" / "2026-05-28-xmabathurreborn-unit-tech-report" / "xmabathurreborn-unit-tech-report.json"

COMMON_IGNORE_ABILS = {
    "move",
    "stop",
    "attack",
    "Rally",
    "RallyHatchery",
    "RallyNydus",
    "que1",
    "que5",
    "que5Passive",
    "que5CancelToSelection",
    "BuildInProgress",
    "MapObjectInteract",
    "SprayZerg",
    "MutatorRemoveWorkerSleep",
    "BurrowQueenDownCoop",
    "BurrowBrutaliskDown",
    "AbathurRebornDeepTunnel",
    "AbathurRebornDeepTunnelImproved",
    "LocustLaunch",
    "Transfusion",
    "SpawnLarva",
    "CreepTumorBuild",
    "OverseerMorphtoOverseerSiege",
    "DamagedEvolutionPit",
    "ZerglingRespawn",
    "StukovInfestedWildMutation",
}

COMMON_IGNORE_FACES = {
    "Move",
    "Stop",
    "MoveHoldPosition",
    "MovePatrol",
    "Attack",
    "Cancel",
    "CancelBuilding",
    "RallyEgg",
    "BuildCreepTumor",
    "BurrowDown",
    "Spray",
    "MapObjectInteract",
    "MutatorWorkerSleep",
    "RespawnZergling",
    "CommanderPrestigeAbathurRebornLeviathanLocked",
    "CommanderPrestigeAbathurRebornBrutaliskLocked",
    "DeepTunnelLocked",
}

MORPH_ABILITY_TARGETS = {
    "UpgradeToLair": "Lair",
    "UpgradeToLairInstantFree": "Lair",
    "UpgradeToHive": "Hive",
    "UpgradeToGreaterSpireBroodlord": "GreaterSpire",
    "UpgradeToImpalerDen": "ImpalerDen",
    "MorphRoachToImpaler": "ImpalerAbathur",
    "MorphRoachVileToRavager": "RavagerAbathur",
    "MutaliskMorphToGuardian": "Guardian",
    "MutaliskMorphToDevourer": "Devourer",
    "EvolveToBrutalisk": "Brutalisk",
    "EvolveToBrutaliskRoachVile": "Brutalisk",
    "EvolveToBrutaliskSwarmHost": "Brutalisk",
    "EvolveToLeviathan": "Leviathan",
    "EvolveToLeviathanMutalisk": "Leviathan",
    "EvolveToLeviathanDevourer": "Leviathan",
    "MorphOverlordToOverseer": "Overseer",
}

MANUAL_ZH = {
    "HatcheryAbathurReborn": "重生阿巴瑟孵化场",
    "OverlordAbathurReborn": "重生阿巴瑟王虫",
    "DroneAbathurReborn": "重生阿巴瑟工蜂",
    "Hatchery": "孵化场",
    "Lair": "虫穴",
    "Hive": "主巢",
    "Drone": "工蜂",
    "Overlord": "王虫",
    "Overseer": "眼虫",
    "Larva": "幼虫",
    "Queen": "虫后",
    "QueenCoop": "虫后",
    "SpawningPool": "孵化池",
    "EvolutionChamber": "进化腔",
    "EvolutionPit": "进化坑",
    "RoachWarren": "蟑螂巢穴",
    "GreaterRoachWarren": "强化蟑螂巢穴",
    "HydraliskDen": "刺蛇巢穴",
    "ImpalerDen": "穿刺者兽穴",
    "Spire": "尖塔",
    "GreaterSpire": "巨型尖塔",
    "NydusNetwork": "虫道网络",
    "SpineCrawler": "脊针爬虫",
    "SporeCrawler": "孢子爬虫",
    "Roach": "蟑螂",
    "RoachVile": "邪恶蟑螂",
    "Ravager": "破坏者",
    "RavagerAbathur": "破坏者",
    "ImpalerAbathur": "穿刺者",
    "Hydralisk": "刺蛇",
    "SwarmHost": "虫群宿主",
    "Mutalisk": "异龙",
    "Guardian": "守护者",
    "Devourer": "吞噬者",
    "Viper": "飞蛇",
    "Brutalisk": "莽兽",
    "Leviathan": "利维坦",
    "ResearchAbathurRebornImprovedToxicNest": "强化毒巢",
    "ResearchAbathurRebornHiddenToxicNest": "隐匿毒巢",
    "ResearchAbathurRebornLocustAirAttack": "蝗虫可对空",
    "ResearchAbathurRebornNetworkedCarapace": "联网甲壳",
    "AbathurLocustAirAttack": "蝗虫可对空",
    "AbathurNetworkedCarapace": "联网甲壳",
    "HotSRapidRegeneration": "快速再生",
    "HotSViciousGlaive": "残暴龙爪",
    "SeismicSpines": "震地脊刺",
    "EvolveGroovedSpines": "进化深槽脊刺",
    "MorphToHydraliskImpaler": "变异为穿刺者",
    "MorphToMutaliskViper": "变异为飞蛇",
    "MorphToSwarmHostSplitA": "变异为虫群宿主",
    "MorphToSwarmHostSplitB": "变异为虫群宿主",
    "MorphtoDevourer": "变异为吞噬者",
}

RELEVANT_UNIT_IDS = {
    "HatcheryAbathurReborn",
    "DroneAbathurReborn",
    "OverlordAbathurReborn",
    "Hatchery",
    "Lair",
    "Hive",
    "Extractor",
    "SpawningPool",
    "EvolutionChamber",
    "EvolutionPit",
    "RoachWarren",
    "GreaterRoachWarren",
    "HydraliskDen",
    "ImpalerDen",
    "Spire",
    "GreaterSpire",
    "NydusNetwork",
    "SpineCrawler",
    "SporeCrawler",
    "Larva",
    "Overseer",
    "QueenCoop",
    "Roach",
    "RoachVile",
    "RavagerAbathur",
    "ImpalerAbathur",
    "Hydralisk",
    "SwarmHost",
    "Mutalisk",
    "Guardian",
    "Devourer",
    "Viper",
    "Brutalisk",
    "Leviathan",
}

RELEVANT_STRUCTURE_IDS = {
    "HatcheryAbathurReborn",
    "Hatchery",
    "Lair",
    "Hive",
    "Extractor",
    "SpawningPool",
    "EvolutionChamber",
    "EvolutionPit",
    "RoachWarren",
    "GreaterRoachWarren",
    "HydraliskDen",
    "ImpalerDen",
    "Spire",
    "GreaterSpire",
    "NydusNetwork",
    "SpineCrawler",
    "SporeCrawler",
}

NORMALIZED_TARGETS = {
    "Queen": "QueenCoop",
    "QueenClassic": None,
    "SwarmHostMP": "SwarmHost",
    "MorphToSwarmHost": "SwarmHost",
    "MorphToSwarmHostSplitA": "SwarmHost",
    "MorphToSwarmHostSplitB": "SwarmHost",
    "MorphToHydraliskImpaler": "ImpalerAbathur",
    "MorphToMutaliskViper": "Viper",
    "MorphRoachToRavager": "RavagerAbathur",
    "Ravager": "RavagerAbathur",
}

FOREIGN_TOKENS = (
    "zagara",
    "kerrigan",
    "stukov",
    "torrasque",
    "noxious",
    "aberration",
    "defiler",
    "scourge",
    "bilelauncher",
    "lurker",
    "ultralisk",
    "infestor",
    "corruptor",
    "broodlord",
    "broodlord",
    "baneling",
    "zergling",
    "k5",
)


def strip_markup(text: str) -> str:
    text = text or ""
    text = text.replace("<n/>", "\n")
    text = re.sub(r"<c val=\"[^\"]*\">", "", text)
    text = text.replace("</c>", "")
    text = re.sub(r"<img [^>]+/>", "", text)
    text = re.sub(r"<[^>]+>", "", text)
    normalized_lines: List[str] = []
    for raw_line in text.splitlines():
        line = raw_line.strip()
        if "///" in line:
            line = line.split("///", 1)[0].rstrip()
        if not line:
            normalized_lines.append("")
            continue
        if re.fullmatch(r"[-A-Za-z0-9 ,.:'()+/%]+", line):
            continue
        normalized_lines.append(line)
    text = "\n".join(normalized_lines)
    return re.sub(r"\n{3,}", "\n\n", text).strip()


def parse_gamestrings(path: Path) -> Dict[str, str]:
    result: Dict[str, str] = {}
    if not path.exists():
        return result
    for raw_line in path.read_text(encoding="utf-8", errors="ignore").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        result[key.strip()] = value.strip()
    return result


def merge_dict(base: Dict[str, str], incoming: Dict[str, str]) -> Dict[str, str]:
    merged = dict(base)
    merged.update(incoming)
    return merged


@dataclass
class Record:
    tag: str
    elem: ET.Element
    source: str


class Catalog:
    def __init__(self, record_index: Dict[Tuple[str, str], List[Record]], strings: Dict[str, str]):
        self.record_index = record_index
        self.strings = strings

    @staticmethod
    def load(module_root: Path, repo_root: Path) -> "Catalog":
        game_data_dirs = [
            ("module", module_root / "Base.SC2Data" / "GameData"),
            ("starcoop", repo_root / "references" / "sc2-build-96883-casc-export" / "mods" / "starcoop" / "starcoop.sc2mod" / "base.sc2data" / "gamedata"),
            ("swarmmulti", repo_root / "references" / "sc2-build-96883-casc-export" / "mods" / "swarmmulti.sc2mod" / "base.sc2data" / "gamedata"),
            ("swarm", repo_root / "references" / "sc2-build-96883-casc-export" / "mods" / "swarm.sc2mod" / "base.sc2data" / "gamedata"),
            ("voidmulti", repo_root / "references" / "sc2-build-96883-casc-export" / "mods" / "voidmulti.sc2mod" / "base.sc2data" / "gamedata"),
            ("void", repo_root / "references" / "sc2-build-96883-casc-export" / "mods" / "void.sc2mod" / "base.sc2data" / "gamedata"),
            ("libertymulti", repo_root / "references" / "sc2-build-96883-casc-export" / "mods" / "libertymulti.sc2mod" / "base.sc2data" / "gamedata"),
            ("liberty", repo_root / "references" / "sc2-build-96883-casc-export" / "mods" / "liberty.sc2mod" / "base.sc2data" / "gamedata"),
            ("core", repo_root / "references" / "sc2-build-96883-casc-export" / "mods" / "core.sc2mod" / "base.sc2data" / "gamedata"),
        ]
        locale_files = [
            repo_root / "references" / "sc2-build-96883-casc-export" / "mods" / "core.sc2mod" / "zhcn.sc2data" / "localizeddata" / "gamestrings.txt",
            repo_root / "references" / "sc2-build-96883-casc-export" / "mods" / "liberty.sc2mod" / "zhcn.sc2data" / "localizeddata" / "gamestrings.txt",
            repo_root / "references" / "sc2-build-96883-casc-export" / "mods" / "swarm.sc2mod" / "zhcn.sc2data" / "localizeddata" / "gamestrings.txt",
            repo_root / "references" / "sc2-build-96883-casc-export" / "mods" / "void.sc2mod" / "zhcn.sc2data" / "localizeddata" / "gamestrings.txt",
            repo_root / "references" / "sc2-build-96883-casc-export" / "mods" / "alliedcommanders.sc2mod" / "zhcn.sc2data" / "localizeddata" / "gamestrings.txt",
            repo_root / "references" / "sc2-build-96883-casc-export" / "mods" / "starcoop" / "starcoop.sc2mod" / "zhcn.sc2data" / "localizeddata" / "gamestrings.txt",
            repo_root / "crys_the_swarm_reborn.SC2Mod" / "zhCN.SC2Data" / "LocalizedData" / "GameStrings.txt",
            module_root / "zhCN.SC2Data" / "LocalizedData" / "GameStrings.txt",
        ]
        record_index: Dict[Tuple[str, str], List[Record]] = defaultdict(list)
        strings: Dict[str, str] = {}

        for path in locale_files:
            strings = merge_dict(strings, parse_gamestrings(path))

        for source_name, game_data_dir in game_data_dirs:
            if not game_data_dir.exists():
                continue
            for xml_path in sorted(game_data_dir.glob("*.xml")):
                try:
                    root = ET.parse(xml_path).getroot()
                except ET.ParseError:
                    continue
                for child in root:
                    obj_id = child.attrib.get("id")
                    if not obj_id:
                        continue
                    key = (child.tag, obj_id)
                    record_index[key].append(Record(tag=child.tag, elem=copy.deepcopy(child), source=source_name))
        return Catalog(record_index, strings)

    def has(self, tag: str, obj_id: str) -> bool:
        return (tag, obj_id) in self.record_index

    def layers(self, tag: str, obj_id: str) -> List[Record]:
        return self.record_index.get((tag, obj_id), [])

    def primary_record(self, tag: str, obj_id: str) -> Optional[Record]:
        layers = self.layers(tag, obj_id)
        return layers[-1] if layers else None

    def parent_id(self, tag: str, obj_id: str) -> Optional[str]:
        for record in reversed(self.layers(tag, obj_id)):
            parent = record.elem.attrib.get("parent")
            if parent:
                return parent
        return None

    def find_child(self, tag: str, obj_id: str, child_tag: str, index: Optional[str] = None) -> Optional[ET.Element]:
        seen = set()
        current = obj_id
        while current and current not in seen:
            seen.add(current)
            for record in reversed(self.layers(tag, current)):
                for child in record.elem:
                    if child.tag != child_tag:
                        continue
                    if index is not None and child.attrib.get("index") != index:
                        continue
                    return child
            current = self.parent_id(tag, current)
        return None

    def merged_children_by_index(self, tag: str, obj_id: str, child_tag: str) -> Dict[str, ET.Element]:
        merged: Dict[str, ET.Element] = {}
        parent = self.parent_id(tag, obj_id)
        if parent:
            merged.update(self.merged_children_by_index(tag, parent, child_tag))
        for record in self.layers(tag, obj_id):
            for child in record.elem:
                if child.tag != child_tag:
                    continue
                index = child.attrib.get("index")
                if index is None:
                    continue
                if index in merged:
                    base = ET.Element(child_tag, dict(merged[index].attrib))
                    base.attrib.update(child.attrib)
                    merged[index] = base
                else:
                    merged[index] = ET.Element(child_tag, dict(child.attrib))
        return merged

    def merged_info_entries(self, abil_tag: str, abil_id: str) -> Dict[str, Dict[str, str]]:
        merged: Dict[str, Dict[str, str]] = {}
        parent = self.parent_id(abil_tag, abil_id)
        if parent and self.has(abil_tag, parent):
            merged.update(self.merged_info_entries(abil_tag, parent))
        for record in self.layers(abil_tag, abil_id):
            for child in record.elem:
                if child.tag != "InfoArray":
                    continue
                index = child.attrib.get("index")
                if not index:
                    continue
                entry = dict(merged.get(index, {}))
                entry.update(child.attrib)
                for grandchild in child:
                    if grandchild.tag == "Button":
                        if grandchild.attrib.get("DefaultButtonFace"):
                            entry["ButtonFace"] = grandchild.attrib["DefaultButtonFace"]
                        if grandchild.attrib.get("Requirements"):
                            entry["Requirements"] = grandchild.attrib["Requirements"]
                        if grandchild.attrib.get("State"):
                            entry["ButtonState"] = grandchild.attrib["State"]
                    elif grandchild.tag == "Unit":
                        value = grandchild.attrib.get("value", "")
                        if value:
                            entry["Unit"] = value
                    elif grandchild.tag == "Upgrade":
                        value = grandchild.attrib.get("value", "")
                        if value:
                            entry["Upgrade"] = value
                    elif grandchild.tag == "Resource":
                        resource_index = grandchild.attrib.get("index")
                        resource_value = grandchild.attrib.get("value")
                        if resource_index and resource_value is not None:
                            entry[f"Resource_{resource_index}"] = resource_value
                merged[index] = entry
        return merged

    def merged_layout_buttons(self, unit_id: str) -> List[ET.Element]:
        seen_chain = set()

        def collect(current_id: str) -> List[ET.Element]:
            if current_id in seen_chain:
                return []
            seen_chain.add(current_id)
            buttons: List[ET.Element] = []
            parent = self.parent_id("CUnit", current_id)
            if parent and self.has("CUnit", parent):
                buttons.extend(collect(parent))
            for record in self.layers("CUnit", current_id):
                for child in record.elem:
                    if child.tag != "CardLayouts":
                        continue
                    for layout_button in child:
                        if layout_button.tag == "LayoutButtons":
                            buttons.append(ET.Element("LayoutButtons", dict(layout_button.attrib)))
            return buttons

        raw = collect(unit_id)
        by_slot: Dict[Tuple[str, str, str], ET.Element] = {}
        ordered_slots: List[Tuple[str, str, str]] = []
        fallback_unique: List[ET.Element] = []
        fallback_seen = set()

        for btn in raw:
            slot_key = (btn.attrib.get("index", ""), btn.attrib.get("Row", ""), btn.attrib.get("Column", ""))
            if all(slot_key):
                if slot_key not in by_slot:
                    ordered_slots.append(slot_key)
                by_slot[slot_key] = btn
                continue
            fallback_key = tuple(btn.attrib.get(field, "") for field in ("Face", "Type", "AbilCmd", "Requirements", "index"))
            if fallback_key in fallback_seen:
                continue
            fallback_seen.add(fallback_key)
            fallback_unique.append(btn)

        merged = [by_slot[slot_key] for slot_key in ordered_slots]
        merged.extend(fallback_unique)
        return merged

    def merged_costs(self, tag: str, obj_id: str) -> Dict[str, str]:
        costs: Dict[str, str] = {}
        parent = self.parent_id(tag, obj_id)
        if parent and self.has(tag, parent):
            costs.update(self.merged_costs(tag, parent))
        for record in self.layers(tag, obj_id):
            for child in record.elem:
                if child.tag == "CostResource":
                    index = child.attrib.get("index")
                    value = child.attrib.get("value")
                    if index and value is not None:
                        costs[index] = value
        return costs

    def resolved_attr(self, tag: str, obj_id: str, child_tag: str, attr_name: str) -> Optional[str]:
        seen = set()
        current = obj_id
        while current and current not in seen:
            seen.add(current)
            for record in reversed(self.layers(tag, current)):
                for child in record.elem:
                    if child.tag == child_tag and attr_name in child.attrib:
                        return child.attrib[attr_name]
            current = self.parent_id(tag, current)
        return None

    def resolved_scalar(self, tag: str, obj_id: str, child_tag: str) -> Optional[str]:
        return self.resolved_attr(tag, obj_id, child_tag, "value")

    def resolve_info(self, abil_id: str, cmd_index: str) -> Dict[str, str]:
        for abil_tag in ("CAbilTrain", "CAbilResearch", "CAbilBuild"):
            if not self.has(abil_tag, abil_id):
                continue
            info = self.merged_info_entries(abil_tag, abil_id)
            if cmd_index in info:
                return dict(info[cmd_index])
        return {}

    def ability_tag(self, abil_id: str) -> Optional[str]:
        for key_tag in ("CAbilTrain", "CAbilMorph", "CAbilResearch", "CAbilBuild", "CAbilEffectInstant", "CAbilEffectTarget"):
            if self.has(key_tag, abil_id):
                return key_tag
        return None

    def localize(self, obj_id: str, prefixes: Iterable[str]) -> Optional[str]:
        for prefix in prefixes:
            key = f"{prefix}/{obj_id}"
            if key in self.strings:
                return strip_markup(self.strings[key])
        if obj_id in MANUAL_ZH:
            return MANUAL_ZH[obj_id]
        return None

    def unit_name(self, unit_id: str) -> str:
        return self.localize(unit_id, ("Unit/Name", "Button/Name", "Upgrade/Name")) or unit_id

    def button_name(self, button_id: str) -> str:
        return self.localize(button_id, ("Button/Name", "Unit/Name", "Upgrade/Name")) or MANUAL_ZH.get(button_id, button_id)

    def upgrade_name(self, upgrade_id: str) -> str:
        return self.localize(upgrade_id, ("Upgrade/Name", "Button/Name", "Unit/Name")) or MANUAL_ZH.get(upgrade_id, upgrade_id)

    def tooltip(self, obj_id: str) -> str:
        text = self.localize(
            obj_id,
            ("Button/Tooltip", "Unit/Description", "Upgrade/Tooltip", "Abil/Tooltip", "Behavior/Tooltip"),
        )
        return text or ""

    def is_structure(self, unit_id: str) -> bool:
        if unit_id in RELEVANT_STRUCTURE_IDS:
            return True
        editor_categories = self.resolved_scalar("CUnit", unit_id, "EditorCategories") or ""
        if "ObjectType:Structure" in editor_categories:
            return True
        if self.find_child("CUnit", unit_id, "Footprint") is not None:
            return True
        parent = self.parent_id("CUnit", unit_id)
        return bool(parent and parent in {"Hatchery", "Lair", "Hive", "Spire", "GreaterSpire", "EvolutionPit", "SpawningPool", "RoachWarren", "GreaterRoachWarren", "HydraliskDen", "ImpalerDen", "EvolutionChamber", "NydusNetwork", "SpineCrawler", "SporeCrawler"})


def parse_abil_cmd(raw: str) -> Tuple[str, str]:
    if not raw or "," not in raw:
        return raw or "", ""
    abil_id, cmd = raw.split(",", 1)
    return abil_id.strip(), cmd.strip()


def format_cost(costs: Dict[str, str], time_value: Optional[str], food: Optional[str] = None) -> str:
    parts: List[str] = []
    if costs.get("Minerals"):
        parts.append(f"{costs['Minerals']} 矿")
    if costs.get("Vespene"):
        parts.append(f"{costs['Vespene']} 气")
    if food and food not in {"0", "-0"}:
        parts.append(f"{food} 补给")
    if time_value and time_value not in {"0", "0.0", "0.000000"}:
        parts.append(f"{time_value} 秒")
    return " / ".join(parts) if parts else "未静态解析到"


def infer_target_from_face(face: str, catalog: Catalog) -> Optional[str]:
    if face in NORMALIZED_TARGETS:
        return NORMALIZED_TARGETS[face]
    if catalog.has("CUnit", face):
        return face
    face_map = {
        "QueenCoop": "QueenCoop",
        "Queen": "QueenCoop",
        "MorphToGuardian": "Guardian",
        "MorphtoDevourer": "Devourer",
        "Ravager": "RavagerAbathur",
        "ImpalerDen": "ImpalerDen",
        "GreaterSpireBroodlord": "GreaterSpire",
        "Hydralisk": "Hydralisk",
        "Mutalisk": "Mutalisk",
        "Viper": "Viper",
        "SwarmHostMP": "SwarmHost",
        "SpawningPool": "SpawningPool",
        "EvolutionChamber": "EvolutionChamber",
        "EvolutionPit": "EvolutionPit",
        "RoachWarren": "RoachWarren",
        "HydraliskDen": "HydraliskDen",
        "Spire": "Spire",
        "NydusNetwork": "NydusNetwork",
        "Extractor": "Extractor",
        "SpineCrawler": "SpineCrawler",
        "SporeCrawler": "SporeCrawler",
        "overlordspeed": None,
    }
    return face_map.get(face)


def classify_action(abil_tag: Optional[str], abil_id: str, face: str) -> Optional[str]:
    if abil_id in COMMON_IGNORE_ABILS or face in COMMON_IGNORE_FACES:
        return None
    if abil_tag == "CAbilBuild":
        return "建造"
    if abil_tag == "CAbilResearch":
        return "研究"
    if abil_tag == "CAbilMorph":
        return "建筑变异"
    if abil_tag == "CAbilTrain":
        if abil_id.startswith("EvolveTo") or abil_id.startswith("Morph"):
            return "单位变异"
        return "生产"
    purchase_hints = ("Purchase", "Research", "Evolve", "Upgrade")
    if any(hint.lower() in abil_id.lower() for hint in purchase_hints) or any(hint.lower() in face.lower() for hint in purchase_hints):
        return "购买强化"
    return None


def normalize_target_id(target_id: Optional[str]) -> Optional[str]:
    if not target_id:
        return target_id
    return NORMALIZED_TARGETS.get(target_id, target_id)


def should_keep_action(
    action_type: str,
    producer_id: str,
    target_unit: Optional[str],
    target_upgrade: Optional[str],
    ability_id: str,
    face: str,
    cmd_index: str,
    button_name: str,
    tooltip: str,
) -> bool:
    if producer_id not in RELEVANT_UNIT_IDS:
        return False
    if cmd_index.lower() == "cancel":
        return False
    if producer_id == "ImpalerDen" and ability_id == "HydraliskDenResearch":
        return False
    text_bucket = " ".join(
        filter(None, [producer_id, target_unit or "", target_upgrade or "", ability_id, face, button_name, tooltip])
    ).lower()
    if any(token in text_bucket for token in FOREIGN_TOKENS):
        return False
    if action_type in {"生产", "建造", "单位变异", "建筑变异"}:
        return bool(target_unit and target_unit in RELEVANT_UNIT_IDS)
    return True


def commander_profile(catalog: Catalog, module_root: Path) -> Dict[str, object]:
    user_path = module_root / "Base.SC2Data" / "GameData" / "UserData.xml"
    root = ET.parse(user_path).getroot()
    commander = root.find(".//Instances[@Id='AbathurReborn']")
    if commander is None:
        raise RuntimeError("未找到 CommanderAch/AbathurReborn")

    start_units: Dict[str, str] = {}
    progression: List[Dict[str, str]] = []
    masteries: List[Dict[str, str]] = []

    for child in commander:
        if child.tag == "Unit":
            field = child.find("Field")
            if field is not None:
                start_units[field.attrib.get("Id", "")] = child.attrib.get("Unit", "")
        if child.tag == "Upgrade":
            field = child.find("Field")
            if field is None:
                continue
            field_id = field.attrib.get("Id", "")
            index = field.attrib.get("Index", "0")
            upgrade_id = child.attrib.get("Upgrade", "")
            entry = {
                "field_id": field_id,
                "index": index,
                "upgrade_id": upgrade_id,
            }
            if field_id == "Upg":
                progression.append(entry)
            elif field_id == "Poi":
                masteries.append(entry)

    for entry in progression:
        index = entry["index"]
        suffix = "" if index == "0" else f"_{int(index):03d}"
        entry["title"] = catalog.strings.get(f"UserData/CommanderAch/AbathurReborn_TitU{suffix}", "")
        entry["description"] = strip_markup(catalog.strings.get(f"UserData/CommanderAch/AbathurReborn_DesU{suffix}", ""))
        entry["upgrade_name"] = catalog.upgrade_name(entry["upgrade_id"])

    for entry in masteries:
        index = entry["index"]
        suffix = "" if index == "0" else f"_{int(index):03d}"
        entry["title"] = catalog.strings.get(f"UserData/CommanderAch/AbathurReborn_TitP{suffix}", "")
        entry["description"] = strip_markup(catalog.strings.get(f"UserData/CommanderAch/AbathurReborn_DesP{suffix}", ""))
        entry["upgrade_name"] = catalog.upgrade_name(entry["upgrade_id"])

    return {
        "start_units": start_units,
        "progression": progression,
        "masteries": masteries,
    }


def gather_roster(catalog: Catalog, start_units: List[str]) -> Tuple[Dict[str, Dict[str, object]], List[Dict[str, object]]]:
    roster: Dict[str, Dict[str, object]] = {}
    actions: List[Dict[str, object]] = []
    candidate_units = set(start_units)
    candidate_units.add("Larva")
    candidate_units.update(unit_id for unit_id in RELEVANT_UNIT_IDS if catalog.has("CUnit", unit_id))

    for unit_id in sorted(candidate_units):
        if not catalog.has("CUnit", unit_id):
            continue
        roster[unit_id] = {
            "id": unit_id,
            "name_zh": catalog.unit_name(unit_id),
            "tooltip": catalog.tooltip(unit_id),
            "is_structure": catalog.is_structure(unit_id),
        }
        for button in catalog.merged_layout_buttons(unit_id):
            abil_id, cmd_index = parse_abil_cmd(button.attrib.get("AbilCmd", ""))
            face = button.attrib.get("Face", "")
            if not abil_id or abil_id == "255":
                continue
            abil_tag = catalog.ability_tag(abil_id)
            action_type = classify_action(abil_tag, abil_id, face)
            if not action_type:
                continue

            info = catalog.resolve_info(abil_id, cmd_index)
            target_unit = normalize_target_id(info.get("Unit") or MORPH_ABILITY_TARGETS.get(abil_id) or infer_target_from_face(face, catalog))
            target_upgrade = info.get("Upgrade")
            button_label = catalog.button_name(face or info.get("ButtonFace") or abil_id)
            requirement = info.get("Requirements") or button.attrib.get("Requirements") or ""
            time_value = info.get("Time")
            tooltip = catalog.tooltip(face) or catalog.tooltip(target_unit or target_upgrade or abil_id)

            if not should_keep_action(
                action_type,
                unit_id,
                target_unit,
                target_upgrade,
                abil_id,
                face,
                cmd_index,
                button_label,
                tooltip,
            ):
                continue

            if action_type in {"生产", "单位变异", "建造", "建筑变异"} and target_unit and catalog.has("CUnit", target_unit):
                costs = catalog.merged_costs("CUnit", target_unit)
                food = catalog.resolved_scalar("CUnit", target_unit, "Food")
                target_name = catalog.unit_name(target_unit)
            elif action_type == "研究" and target_upgrade and catalog.has("CUpgrade", target_upgrade):
                costs = catalog.merged_costs("CUpgrade", target_upgrade)
                food = None
                target_name = catalog.upgrade_name(target_upgrade)
            else:
                costs = {}
                for resource_name in ("Minerals", "Vespene"):
                    resource_value = info.get(f"Resource_{resource_name}")
                    if resource_value is not None:
                        costs[resource_name] = resource_value
                food = None
                target_name = button_label

            actions.append(
                {
                    "producer_id": unit_id,
                    "producer_name": catalog.unit_name(unit_id),
                    "type": action_type,
                    "button_face": face,
                    "button_name": button_label,
                    "ability_id": abil_id,
                    "cmd_index": cmd_index,
                    "target_unit": target_unit,
                    "target_upgrade": target_upgrade,
                    "target_name": target_name,
                    "requirements": requirement,
                    "time": time_value or "",
                    "costs": costs,
                    "food": food,
                    "tooltip": tooltip,
                }
            )

    def action_score(action: Dict[str, object]) -> Tuple[int, int, int, int]:
        button_name = str(action["button_name"])
        target_name = str(action["target_name"])
        tooltip = str(action["tooltip"])
        return (
            int(bool(re.search(r"[\u4e00-\u9fff]", button_name))),
            -int("///" in button_name),
            int(bool(re.search(r"[\u4e00-\u9fff]", target_name))),
            len(tooltip),
        )

    unique_actions: List[Dict[str, object]] = []
    action_index: Dict[Tuple[object, ...], int] = {}
    for action in actions:
        key = (
            action["producer_id"],
            action["type"],
            action["ability_id"],
            action["cmd_index"],
            action["target_unit"],
            action["target_upgrade"],
        )
        existing_idx = action_index.get(key)
        if existing_idx is None:
            action_index[key] = len(unique_actions)
            unique_actions.append(action)
            continue
        if action_score(action) > action_score(unique_actions[existing_idx]):
            unique_actions[existing_idx] = action

    return roster, unique_actions


def sort_units(roster: Dict[str, Dict[str, object]], want_structures: bool) -> List[Dict[str, object]]:
    items = [item for item in roster.values() if bool(item["is_structure"]) == want_structures]
    return sorted(items, key=lambda item: (item["name_zh"], item["id"]))


def render_markdown(
    profile: Dict[str, object],
    roster: Dict[str, Dict[str, object]],
    actions: List[Dict[str, object]],
    output_path: Path,
) -> str:
    lines: List[str] = []
    lines.append("# XMAbathurReborn 兵种与科技中文清单")
    lines.append("")
    lines.append(f"- 生成时间：{date.today().isoformat()}")
    lines.append("- 数据来源：`合作指挥官版起义狂潮/Mods/XM/XMAbathurReborn.SC2Mod`，并以官方 `sc2-build-96883-casc-export` 做基础 Catalog fallback。")
    lines.append("- 说明：本表按静态命令卡与 Catalog 抽取，可能包含等级/需求锁定项，也可能遗漏运行时动态注入按钮。")
    lines.append("")

    start_units = profile["start_units"]
    lines.append("## 开局基础单位")
    lines.append("")
    for field_id in ("CommandCenter", "SecondUnit", "Worker"):
        unit_id = start_units.get(field_id, "")
        if not unit_id:
            continue
        lines.append(f"- `{field_id}`：{roster.get(unit_id, {}).get('name_zh', MANUAL_ZH.get(unit_id, unit_id))}（`{unit_id}`）")
    lines.append("")

    lines.append("## 兵种总表")
    lines.append("")
    for item in sort_units(roster, want_structures=False):
        tooltip = f"：{item['tooltip']}" if item["tooltip"] else ""
        lines.append(f"- {item['name_zh']}（`{item['id']}`）{tooltip}")
    lines.append("")

    lines.append("## 建筑总表")
    lines.append("")
    for item in sort_units(roster, want_structures=True):
        tooltip = f"：{item['tooltip']}" if item["tooltip"] else ""
        lines.append(f"- {item['name_zh']}（`{item['id']}`）{tooltip}")
    lines.append("")

    lines.append("## 生产、建造、变异与研究")
    lines.append("")
    grouped: Dict[str, List[Dict[str, object]]] = defaultdict(list)
    for action in actions:
        grouped[action["producer_id"]].append(action)
    for producer_id in sorted(grouped, key=lambda unit_id: roster.get(unit_id, {}).get("name_zh", unit_id)):
        producer_name = roster.get(producer_id, {}).get("name_zh", producer_id)
        lines.append(f"### {producer_name}（`{producer_id}`）")
        lines.append("")
        for action in sorted(grouped[producer_id], key=lambda entry: (entry["type"], entry["target_name"], entry["button_name"])):
            cost_text = format_cost(action["costs"], action["time"], action["food"])
            req = f"；需求 `{action['requirements']}`" if action["requirements"] else ""
            target = action["target_name"]
            tooltip = f"；说明：{action['tooltip']}" if action["tooltip"] else ""
            lines.append(
                f"- `{action['type']}`：{target}（按钮 `{action['button_name']}`，命令 `{action['ability_id']},{action['cmd_index']}`，成本 {cost_text}{req}{tooltip}）"
            )
        lines.append("")

    lines.append("## 指挥官解锁项")
    lines.append("")
    for entry in sorted(profile["progression"], key=lambda row: int(row["index"])):
        title = entry["title"] or entry["upgrade_name"] or entry["upgrade_id"]
        desc = f"：{entry['description']}" if entry["description"] else ""
        lines.append(f"- {title}（`{entry['upgrade_id']}`）{desc}")
    lines.append("")

    lines.append("## 精通")
    lines.append("")
    for entry in sorted(profile["masteries"], key=lambda row: int(row["index"])):
        title = entry["title"] or entry["upgrade_name"] or entry["upgrade_id"]
        desc = f"：{entry['description']}" if entry["description"] else ""
        lines.append(f"- {title}（`{entry['upgrade_id']}`）{desc}")
    lines.append("")

    lines.append("## 备注")
    lines.append("")
    lines.append("- 单位与建筑总表按阿巴瑟重生命令链递归抽取，不是把整个 `XMAbathurReborn` 模块的全部对象原样平铺。")
    lines.append("- `购买强化` 和 `研究` 都保留了原始按钮名与 `AbilCmd`，后续要回查 XML 或做自动化校验时更方便。")
    lines.append("- 如果后面还要补“精确成本已应用指挥官默认升级后的最终值”，建议在这份脚本上继续叠加 `AbathurRebornCommander` 的 Upgrade Effect 求值。")
    lines.append("")

    return "\n".join(lines)


def main() -> None:
    parser = argparse.ArgumentParser(description="导出 XMAbathurReborn 中文兵种与科技清单")
    parser.add_argument("--module-root", type=Path, default=DEFAULT_MODULE_ROOT)
    parser.add_argument("--output-md", type=Path, default=DEFAULT_OUTPUT_MD)
    parser.add_argument("--output-json", type=Path, default=DEFAULT_OUTPUT_JSON)
    args = parser.parse_args()

    catalog = Catalog.load(args.module_root, REPO_ROOT)
    profile = commander_profile(catalog, args.module_root)
    start_units = [unit_id for unit_id in profile["start_units"].values() if unit_id]
    roster, actions = gather_roster(catalog, start_units)

    args.output_md.parent.mkdir(parents=True, exist_ok=True)
    args.output_json.parent.mkdir(parents=True, exist_ok=True)

    markdown = render_markdown(profile, roster, actions, args.output_md)
    args.output_md.write_text(markdown, encoding="utf-8")
    payload = {
        "module_root": str(args.module_root),
        "start_units": profile["start_units"],
        "roster": sorted(roster.values(), key=lambda item: item["id"]),
        "actions": actions,
        "progression": profile["progression"],
        "masteries": profile["masteries"],
    }
    args.output_json.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")

    print(str(args.output_md))
    print(str(args.output_json))
    print(f"roster={len(roster)} actions={len(actions)}")


if __name__ == "__main__":
    main()
