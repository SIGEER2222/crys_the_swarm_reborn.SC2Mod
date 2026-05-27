from __future__ import annotations

import argparse
import json
import re
import xml.etree.ElementTree as ET
from collections import defaultdict
from pathlib import Path


COMMANDERS = [
    ("TerranRaynor", "Raynor"),
    ("ZergKerrigan", "Kerrigan"),
    ("ProtossArtanis", "Artanis"),
    ("TerranSwann", "Swann"),
    ("ZergZagara", "Zagara"),
    ("ProtossVorazun", "Vorazun"),
    ("ProtossKarax", "Karax"),
    ("ZergAbathur", "Abathur"),
    ("ProtossAlarak", "Alarak"),
    ("TerranNova", "Nova"),
    ("ZergStukov", "Stukov"),
    ("ProtossFenix", "Fenix"),
    ("ZergDehaka", "Dehaka"),
    ("TerranHorner", "Horner"),
    ("TerranTychus", "Tychus"),
    ("ProtossZeratul", "Zeratul"),
    ("ZergStetmann", "Stetmann"),
    ("TerranMengsk", "Mengsk"),
]

COMMANDER_ALIAS = dict(COMMANDERS)
COMMANDER_ID_BY_SHORT = {short_id: commander_id for commander_id, short_id in COMMANDERS}

MOD_SOURCES = [
    ("mods/starcoop/starcoop.sc2mod", "starcoop"),
    ("mods/starcoop/commanders/egonstetmann.sc2mod", "stetmann"),
    ("mods/starcoop/commanders/arcturusmengsk.sc2mod", "mengsk"),
]

DEPENDENCY_UNIT_SOURCES = [
    ("mods/voidmulti.sc2mod", "voidmulti"),
    ("mods/void.sc2mod", "void"),
    ("mods/swarmmulti.sc2mod", "swarmmulti"),
    ("mods/swarm.sc2mod", "swarm"),
    ("mods/libertymulti.sc2mod", "libertymulti"),
    ("mods/liberty.sc2mod", "liberty"),
    ("mods/core.sc2mod", "core"),
]

SOURCE_BY_COMMANDER = {
    "Mengsk": "mengsk",
    "Stetmann": "stetmann",
}

CURATED_COMMANDER_UNIT_IDS = {
    "Dehaka": [
        "DehakaCoop",
        "DehakaDrone",
        "DehakaHatchery",
        "DehakaAirTownHall",
        "DehakaBarracks",
        "DehakaCreeper",
        "DehakaCreeperFlying",
        "DehakaGlevig",
        "DehakaGlevigStructure",
        "DehakaMurvar",
        "DehakaMurvarStructure",
        "DehakaDakrun",
        "DehakaDakrunStructure",
        "DehakaHydraliskLevel2",
        "DehakaMutaliskLevel3",
        "DehakaNydusDestroyer",
        "DehakaPrimalSwarmHost",
        "DehakaRavasaur",
        "DehakaRoachLevel2",
        "DehakaRoachLevel3",
        "DehakaSwarmHost",
        "DehakaUltraliskLevel2",
        "DehakaUltraliskLevel3",
        "DehakaZerglingLevel2",
        "ImpalerDehaka",
    ],
    "Mengsk": [
        "SCVMengsk",
        "CommandCenterMengsk",
        "OrbitalCommandMengsk",
        "SupplyDepotMengsk",
        "BunkerDepotMengsk",
        "MissileTurretMengsk",
        "BarracksMengsk",
        "FactoryMengsk",
        "StarportMengsk",
        "EngineeringBayMengsk",
        "ArmoryMengsk",
        "FusionCoreMengsk",
        "GhostAcademyMengsk",
        "ArtilleryMengsk",
        "TrooperMengsk",
        "TrooperMengskAA",
        "TrooperMengskFlamethrower",
        "TrooperMengskImproved",
        "MarauderMengsk",
        "GhostMengsk",
        "MedivacMengsk",
        "SiegeTankMengsk",
        "SiegeTankMengskSieged",
        "ThorMengsk",
        "VikingMengskFighter",
        "VikingMengskAssault",
        "BattlecruiserMengsk",
        "RavenMengsk",
        "RavenMengskSieged",
    ],
    "Stetmann": [
        "DroneStetmann",
        "HatcheryStetmann",
        "LairStetmann",
        "HiveStetmann",
        "ExtractorStetmann",
        "SpawningPoolStetmann",
        "EvolutionChamberStetmann",
        "BanelingNestStetmann",
        "HydraliskDenStetmann",
        "LurkerDenStetmann",
        "InfestationPitStetmann",
        "SpireStetmann",
        "GreaterSpireStetmann",
        "UltraliskCavernStetmann",
        "SpineCrawlerStetmann",
        "SpineCrawlerUprootedStetmann",
        "SporeCrawlerStetmann",
        "SporeCrawlerUprootedStetmann",
        "PowerTowerStetmann",
        "GaryStetmann",
        "SuperGaryStetmann",
        "ZerglingStetmann",
        "BanelingStetmann",
        "RoachStetmann",
        "RavagerStetmann",
        "HydraliskStetmann",
        "LurkerStetmann",
        "LurkerBurrowedStetmann",
        "InfestorStetmann",
        "UltraliskStetmann",
        "CorruptorStetmann",
        "BroodLordStetmann",
        "OverseerStetmann",
        "OverseerStetmannSiegeMode",
    ],
}

TECH_UNIT_UNIT_OVERRIDES = {
    "Zeratul": {
        "DisruptorZeratul": "ZeratulDisruptor",
        "ImmortalZeratul": "ZeratulImmortal",
        "ObserverZeratul": "ZeratulObserver",
        "RoboticsWarp": "ZeratulRoboticsFacility",
        "SentryZeratul": "ZeratulSentry",
        "StalkerZeratul": "ZeratulStalker",
        "WarpPrismZeratul": "ZeratulWarpPrism",
        "ZealotZeratul": "ZeratulSummonZealot",
    }
}

TYCHUS_IGNORE_PATTERN = re.compile(r"(Missile|Weapon|Beacon|Placement|Dummy)")


def field_id(element: ET.Element) -> str | None:
    field = element.find("Field")
    return field.get("Id") if field is not None else None


def field_index(element: ET.Element) -> int:
    field = element.find("Field")
    if field is None:
        return 0
    raw = field.get("Index")
    if raw is None:
        return 0
    try:
        return int(raw)
    except ValueError:
        return 0


def source_label(path: Path, export_root: Path) -> str:
    return path.relative_to(export_root).as_posix()


def strip_auto_suffix(value: str) -> str:
    text = re.sub(r"\s*///Auto - Copied from enUS Locale\s*$", "", value).strip()
    return re.sub(r"\s+///\s+.*$", "", text).strip()


def clean_markup(value: str | None) -> str:
    if not value:
        return ""
    text = strip_auto_suffix(value)
    text = text.replace("<n/>", "\n")
    text = re.sub(r"<d\s+ref=\"([^\"]+)\"[^/]*/>", r"{\1}", text)
    text = re.sub(r"<d\s+time=\"([^\"]+)\"[^/]*/>", r"{time:\1}", text)
    text = re.sub(r"</?(?:c|s)(?:\s+[^>]*)?>", "", text)
    text = re.sub(r"<[^>]+>", "", text)
    text = re.sub(r"\r?\n\s*", "\n", text)
    text = re.sub(r"[ \t]+", " ", text)
    return text.strip()


def md_cell(value: object) -> str:
    text = "" if value is None else str(value)
    text = clean_markup(text)
    text = text.replace("|", r"\|").replace("\n", "<br>")
    return text


def load_strings(export_root: Path, locale: str) -> dict[str, str]:
    result: dict[str, str] = {}
    locale_dir = f"{locale.lower()}.sc2data"
    for path in sorted(export_root.rglob("*.txt")):
        parts = [part.lower() for part in path.parts]
        if locale_dir not in parts:
            continue
        if path.name.lower() not in {
            "gamestrings.txt",
            "objectstrings.txt",
            "triggerstrings.txt",
            "conversationstrings.txt",
        }:
            continue
        for line in path.read_text(encoding="utf-8", errors="ignore").splitlines():
            if not line or "=" not in line:
                continue
            key, value = line.split("=", 1)
            key = key.strip()
            if not key:
                continue
            result[key] = strip_auto_suffix(value)
    return result


def localize(key: str | None, zh: dict[str, str], en: dict[str, str]) -> str:
    if not key:
        return ""
    value = zh.get(key) or en.get(key)
    return clean_markup(value) if value else ""


def collect_indexed_values(instance: ET.Element, tag: str, attr: str, expected_field: str) -> list[str]:
    values: list[tuple[int, str]] = []
    for child in instance.findall(tag):
        if field_id(child) != expected_field:
            continue
        value = child.get(attr)
        if value:
            values.append((field_index(child), value))
    return [value for _, value in sorted(values, key=lambda item: item[0])]


def collect_indexed_children(instance: ET.Element, tag: str, expected_field: str) -> list[ET.Element]:
    values: list[tuple[int, ET.Element]] = []
    for child in instance.findall(tag):
        if field_id(child) != expected_field:
            continue
        values.append((field_index(child), child))
    return [value for _, value in sorted(values, key=lambda item: item[0])]


def collect_text_by_field(instance: ET.Element, expected_field: str, zh: dict[str, str], en: dict[str, str]) -> tuple[str, str]:
    for text in instance.findall("Text"):
        if field_id(text) != expected_field:
            continue
        key = text.get("Text")
        return key or "", localize(key, zh, en)
    return "", ""


def parse_editor_categories(value: str | None) -> dict[str, str]:
    result: dict[str, str] = {}
    if not value:
        return result
    for part in value.split(","):
        token = part.strip()
        if ":" in token:
            key, raw = token.split(":", 1)
            result[key] = raw
    return result


def child_value(node: ET.Element, tag: str) -> str:
    child = node.find(tag)
    if child is None:
        return ""
    return child.get("value") or ""


def chain_value(chain: list[tuple[str, ET.Element]], tag: str) -> str:
    for _, node in chain:
        value = child_value(node, tag)
        if value:
            return value
    return ""


def chain_cost_value(chain: list[tuple[str, ET.Element]], index_name: str) -> str:
    for _, node in chain:
        child = node.find(f"./CostResource[@index='{index_name}']")
        if child is not None and child.get("value"):
            return child.get("value") or ""
    return ""


def chain_array_values(chain: list[tuple[str, ET.Element]], tag: str) -> list[str]:
    for _, node in chain:
        values = [child.get("index") for child in node.findall(tag) if child.get("value") == "1" and child.get("index")]
        if values:
            return sorted(set(values))
    return []


class CatalogResolver:
    def __init__(self, export_root: Path):
        self.export_root = export_root
        self.unit_catalogs: dict[str, dict[str, ET.Element]] = {}
        self.upgrade_catalogs: dict[str, dict[str, ET.Element]] = {}
        self.source_roots: dict[str, Path] = {}
        mod_labels = {label for _, label in MOD_SOURCES}
        for relative, label in MOD_SOURCES + DEPENDENCY_UNIT_SOURCES:
            mod_root = export_root / relative
            self.source_roots[label] = mod_root
            gamedata_dir = mod_root / "base.sc2data" / "gamedata"
            self.unit_catalogs[label] = self._load_catalog_dir(gamedata_dir, {"CUnit"})
            if label in mod_labels:
                self.upgrade_catalogs[label] = self._load_catalog_dir(gamedata_dir, {"CUpgrade"})

    @staticmethod
    def _load_catalog_dir(gamedata_dir: Path, element_tags: set[str]) -> dict[str, ET.Element]:
        if not gamedata_dir.exists():
            return {}
        result: dict[str, ET.Element] = {}
        for path in sorted(gamedata_dir.rglob("*.xml")):
            root = ET.parse(path).getroot()
            for child in root:
                if child.tag not in element_tags:
                    continue
                item_id = child.get("id")
                if item_id and item_id not in result:
                    result[item_id] = child
        return result

    def _lookup(self, catalogs: dict[str, dict[str, ET.Element]], source: str, item_id: str) -> tuple[str, ET.Element] | tuple[None, None]:
        search_order = self.search_order(source)
        for label in search_order:
            node = catalogs.get(label, {}).get(item_id)
            if node is not None:
                return label, node
        return None, None

    @staticmethod
    def search_order(source: str) -> list[str]:
        order = [source]
        if source != "starcoop":
            order.append("starcoop")
        order.extend(label for _, label in DEPENDENCY_UNIT_SOURCES)
        seen: set[str] = set()
        result: list[str] = []
        for item in order:
            if item in seen:
                continue
            seen.add(item)
            result.append(item)
        return result

    def unit_node(self, source: str, unit_id: str) -> tuple[str, ET.Element] | tuple[None, None]:
        return self._lookup(self.unit_catalogs, source, unit_id)

    def upgrade_node(self, source: str, upgrade_id: str) -> tuple[str, ET.Element] | tuple[None, None]:
        return self._lookup(self.upgrade_catalogs, source, upgrade_id)

    def unit_chain(self, source: str, unit_id: str) -> list[tuple[str, ET.Element]]:
        chain: list[tuple[str, ET.Element]] = []
        seen_pairs: set[tuple[str, str]] = set()
        seen_ids: set[str] = set()
        current_id = unit_id
        while current_id and current_id not in seen_ids:
            seen_ids.add(current_id)
            nodes_for_id: list[tuple[str, ET.Element]] = []
            for label in self.search_order(source):
                node = self.unit_catalogs.get(label, {}).get(current_id)
                if node is None:
                    continue
                pair = (label, current_id)
                if pair in seen_pairs:
                    continue
                seen_pairs.add(pair)
                nodes_for_id.append((label, node))
            if not nodes_for_id:
                break
            chain.extend(nodes_for_id)
            parent_id = ""
            for _, node in nodes_for_id:
                parent_id = node.get("parent", "")
                if parent_id:
                    break
            current_id = parent_id
        return chain


def parse_unit(chain: list[tuple[str, ET.Element]], unit_id: str, source: str) -> dict[str, object]:
    if not chain:
        return {
            "id": unit_id,
            "source_catalog": "",
            "parent": "",
            "object_type": "Unknown",
            "object_family": "",
            "race": "",
            "mob": "",
            "planes": [],
            "attributes": [],
            "flags": [],
            "minerals": "",
            "vespene": "",
            "terrazine": "",
            "supply": "",
            "build_time": "",
            "life": "",
            "shields": "",
            "energy": "",
            "sight": "",
            "editor_categories": {},
            "inheritance": [],
        }
    node = chain[0][1]
    editor_categories = parse_editor_categories(chain_value(chain, "EditorCategories"))
    object_type = editor_categories.get("ObjectType", "Unknown")
    return {
        "id": unit_id,
        "source_catalog": source or chain[0][0],
        "parent": node.get("parent", ""),
        "object_type": object_type,
        "object_family": editor_categories.get("ObjectFamily", ""),
        "race": chain_value(chain, "Race"),
        "mob": chain_value(chain, "Mob"),
        "planes": chain_array_values(chain, "PlaneArray"),
        "attributes": chain_array_values(chain, "Attributes"),
        "flags": chain_array_values(chain, "FlagArray"),
        "minerals": chain_cost_value(chain, "Minerals"),
        "vespene": chain_cost_value(chain, "Vespene"),
        "terrazine": chain_cost_value(chain, "Terrazine"),
        "supply": chain_value(chain, "Food"),
        "build_time": chain_value(chain, "Time"),
        "life": chain_value(chain, "LifeMax"),
        "shields": chain_value(chain, "ShieldsMax"),
        "energy": chain_value(chain, "EnergyMax"),
        "sight": chain_value(chain, "Sight"),
        "editor_categories": editor_categories,
        "inheritance": [{"source": item_source, "id": item_node.get("id", ""), "parent": item_node.get("parent", "")} for item_source, item_node in chain],
    }


def parse_upgrade(node: ET.Element, upgrade_id: str, source: str, zh: dict[str, str], en: dict[str, str]) -> dict[str, object]:
    effect_count = len(node.findall("EffectArray"))
    return {
        "id": upgrade_id,
        "source_catalog": source,
        "parent": node.get("parent", ""),
        "name": localize(f"Upgrade/Name/{upgrade_id}", zh, en) or localize(f"Button/Name/{upgrade_id}", zh, en),
        "tooltip": localize(f"Upgrade/Tooltip/{upgrade_id}", zh, en) or localize(f"Button/Tooltip/{upgrade_id}", zh, en),
        "effect_count": effect_count,
    }


def build_supplemental_roster_entries(
    export_root: Path,
    short_id: str,
    commander_id: str,
    source_name: str,
    zh: dict[str, str],
    en: dict[str, str],
) -> list[dict[str, object]]:
    entries: list[dict[str, object]] = []

    for unit_id in CURATED_COMMANDER_UNIT_IDS.get(short_id, []):
        entries.append(
            {
                "id": unit_id,
                "unit_id": unit_id,
                "commanders": [short_id],
                "commander_ids": [commander_id],
                "ui_order": 1000 + len(entries),
                "prefix": "",
                "prefix_key": "",
                "suffix": "",
                "suffix_key": "",
                "name": localize(f"Unit/Name/{unit_id}", zh, en),
                "name_key": f"Unit/Name/{unit_id}",
                "tooltip": localize(f"Unit/Tooltip/{unit_id}", zh, en),
                "tooltip_key": f"Unit/Tooltip/{unit_id}",
                "source": "supplemental curated roster",
                "source_name": source_name,
            }
        )

    if short_id != "Tychus":
        return entries

    tychus_path = export_root / "mods" / "starcoop" / "starcoop.sc2mod" / "base.sc2data" / "gamedata" / "commanders" / "commandertychus.xml"
    if not tychus_path.exists():
        return entries

    root = ET.parse(tychus_path).getroot()
    seen_tychus_ids: set[str] = set()
    tychus_ids: list[str] = []
    for node in root.findall(".//Unit"):
        candidate = node.get("Unit") or ""
        if not candidate:
            value = node.get("value") or ""
            if value.startswith("Tychus"):
                candidate = value
        if not candidate or candidate in seen_tychus_ids or TYCHUS_IGNORE_PATTERN.search(candidate):
            continue
        seen_tychus_ids.add(candidate)
        tychus_ids.append(candidate)

    for unit_id in tychus_ids:
        entries.append(
            {
                "id": unit_id,
                "unit_id": unit_id,
                "commanders": [short_id],
                "commander_ids": [commander_id],
                "ui_order": 1000 + len(entries),
                "prefix": "",
                "prefix_key": "",
                "suffix": "",
                "suffix_key": "",
                "name": localize(f"Unit/Name/{unit_id}", zh, en),
                "name_key": f"Unit/Name/{unit_id}",
                "tooltip": localize(f"Unit/Tooltip/{unit_id}", zh, en),
                "tooltip_key": f"Unit/Tooltip/{unit_id}",
                "source": "supplemental commandertychus.xml",
                "source_name": source_name,
            }
        )

    return entries


def parse_userdata_file(path: Path, export_root: Path, source_name: str, zh: dict[str, str], en: dict[str, str]) -> dict[str, object]:
    tree = ET.parse(path)
    root = tree.getroot()
    source = source_label(path, export_root)

    commanders: dict[str, dict[str, object]] = {}
    player_commanders = root.find("./CUser[@id='PlayerCommanders']")
    if player_commanders is not None:
        for instance in player_commanders.findall("Instances"):
            commander_id = instance.get("Id")
            if not commander_id or commander_id == "[Default]" or commander_id not in COMMANDER_ALIAS:
                continue
            name_key, name = collect_text_by_field(instance, "Name", zh, en)
            description_key, description = collect_text_by_field(instance, "Description", zh, en)
            commanders[commander_id] = {
                "id": commander_id,
                "short_id": COMMANDER_ALIAS[commander_id],
                "name": name,
                "name_key": name_key,
                "description": description,
                "description_key": description_key,
                "default_upgrades": collect_indexed_values(instance, "Upgrade", "Upgrade", "DefaultUpgrades"),
                "default_ability_commands": [
                    {
                        "abil": child.get("Abil") or "",
                        "cmd": child.get("Cmd") or "",
                    }
                    for child in collect_indexed_children(instance, "AbilCmd", "DefaultAbilityCommands")
                ],
                "prestige_ids": collect_indexed_values(instance, "User", "Instance", "Prestige"),
                "source": source,
                "source_name": source_name,
            }

    levels: dict[str, dict[str, object]] = {}
    player_levels = root.find("./CUser[@id='PlayerLevels']")
    if player_levels is not None:
        for instance in player_levels.findall("Instances"):
            instance_id = instance.get("Id")
            if not instance_id or instance_id == "[Default]":
                continue
            level = None
            commander_id = None
            for child in instance:
                child_field = field_id(child)
                if child.tag == "Int" and child_field == "Level":
                    raw = child.get("Int")
                    level = int(raw) if raw and raw.isdigit() else None
                elif child.tag == "User" and child.get("Type") == "PlayerCommanders" and child_field == "Commander":
                    commander_id = child.get("Instance")
            if level is None:
                match = re.search(r"Level0?(\d+)$", instance_id)
                level = int(match.group(1)) if match else None
            levels[instance_id] = {
                "id": instance_id,
                "level": level,
                "commander_id": commander_id,
                "source": source,
            }

    perks: list[dict[str, object]] = []
    campaign_perk = root.find("./CUser[@id='CampaignPerk']")
    if campaign_perk is not None:
        for instance in campaign_perk.findall("Instances"):
            instance_id = instance.get("Id")
            if not instance_id or instance_id == "[Default]":
                continue
            button = ""
            commander_id = None
            level_id = None
            ui_slot = None
            for child in instance:
                child_field = field_id(child)
                if child.tag == "GameLink" and child_field == "Button":
                    button = child.get("GameLink") or ""
                elif child.tag == "User" and child.get("Type") == "PlayerCommanders" and child_field == "Commander":
                    commander_id = child.get("Instance")
                elif child.tag == "User" and child.get("Type") == "PlayerLevels" and child_field == "Level":
                    level_id = child.get("Instance")
                elif child.tag == "Int" and child_field == "UISlot":
                    raw = child.get("Int")
                    ui_slot = int(raw) if raw and raw.isdigit() else raw
            level_info = levels.get(level_id or "", {})
            if not commander_id:
                commander_id = level_info.get("commander_id") if level_info else None
            if commander_id not in COMMANDER_ALIAS:
                continue
            button_name_key = f"Button/Name/{button}" if button else ""
            button_tooltip_key = f"Button/Tooltip/{button}" if button else ""
            explicit_name_key, explicit_name = collect_text_by_field(instance, "Name", zh, en)
            explicit_tooltip_key, explicit_tooltip = collect_text_by_field(instance, "Tooltip", zh, en)
            explicit_description_key, explicit_description = collect_text_by_field(instance, "Description", zh, en)
            perks.append(
                {
                    "id": instance_id,
                    "commander_id": commander_id,
                    "commander": COMMANDER_ALIAS[commander_id],
                    "level_id": level_id,
                    "level": level_info.get("level"),
                    "ui_slot": ui_slot,
                    "button": button,
                    "name": explicit_name or localize(button_name_key, zh, en),
                    "name_key": explicit_name_key or button_name_key,
                    "tooltip": explicit_tooltip or localize(button_tooltip_key, zh, en),
                    "tooltip_key": explicit_tooltip_key or button_tooltip_key,
                    "description": explicit_description,
                    "description_key": explicit_description_key,
                    "upgrades": collect_indexed_values(instance, "Upgrade", "Upgrade", "Upgrade"),
                    "ability_commands": [
                        {
                            "abil": child.get("Abil") or "",
                            "cmd": child.get("Cmd") or "",
                        }
                        for child in collect_indexed_children(instance, "AbilCmd", "AbilityCommand")
                    ],
                    "effects": collect_indexed_values(instance, "GameLink", "GameLink", "Effect"),
                    "source": source,
                    "source_name": source_name,
                }
            )

    masteries: list[dict[str, object]] = []
    mastery_upgrades = root.find("./CUser[@id='MasteryUpgrades']")
    if mastery_upgrades is not None:
        for instance in mastery_upgrades.findall("Instances"):
            instance_id = instance.get("Id")
            if not instance_id or instance_id == "[Default]":
                continue
            commander_id = None
            category = None
            talent = ""
            upgrade = ""
            point_increments: list[tuple[int, str]] = []
            for child in instance:
                child_field = field_id(child)
                if child.tag == "User" and child.get("Type") == "PlayerCommanders" and child_field == "Commander":
                    commander_id = child.get("Instance")
                elif child.tag == "Int" and child_field == "Category":
                    raw = child.get("Int")
                    category = int(raw) if raw and raw.isdigit() else raw
                elif child.tag == "GameLink" and child_field == "TalentData":
                    talent = child.get("GameLink") or ""
                elif child.tag == "Upgrade" and child_field == "Upgrade":
                    upgrade = child.get("Upgrade") or ""
                elif child.tag == "Fixed" and child_field == "PointIncrement":
                    value = child.get("Fixed")
                    if value:
                        point_increments.append((field_index(child), value))
            if commander_id not in COMMANDER_ALIAS:
                continue
            name_key, name = collect_text_by_field(instance, "Name", zh, en)
            value_key, value_format = collect_text_by_field(instance, "ValueFormat", zh, en)
            masteries.append(
                {
                    "id": instance_id,
                    "commander_id": commander_id,
                    "commander": COMMANDER_ALIAS[commander_id],
                    "category": category,
                    "name": name,
                    "name_key": name_key,
                    "upgrade": upgrade,
                    "talent_data": talent,
                    "point_increments": [value for _, value in sorted(point_increments, key=lambda item: item[0])],
                    "value_format": value_format,
                    "value_format_key": value_key,
                    "source": source,
                    "source_name": source_name,
                }
            )

    tech_units: list[dict[str, object]] = []
    tech_unit_user = root.find("./CUser[@id='TechUnit']")
    if tech_unit_user is not None:
        for instance in tech_unit_user.findall("Instances"):
            instance_id = instance.get("Id")
            if not instance_id or instance_id == "[Default]":
                continue
            commander_ids = collect_indexed_values(instance, "User", "Instance", "Commander")
            commander_ids = [value for value in commander_ids if value in COMMANDER_ALIAS]
            if not commander_ids:
                continue
            ui_order = None
            for child in instance.findall("Int"):
                if field_id(child) == "UIOrder":
                    raw = child.get("Int")
                    ui_order = int(raw) if raw and raw.isdigit() else raw
                    break
            prefix_key, prefix = collect_text_by_field(instance, "Prefix", zh, en)
            suffix_key, suffix = collect_text_by_field(instance, "Suffix", zh, en)
            name_key, name = collect_text_by_field(instance, "Name", zh, en)
            tooltip_key, tooltip = collect_text_by_field(instance, "TechnologyTooltip", zh, en)
            unit_ref = instance_id
            for child in instance.findall("Unit"):
                if field_id(child) in {"Unit", "HeroUnit"}:
                    unit_ref = child.get("Unit") or unit_ref
                    break
            tech_units.append(
                {
                    "id": instance_id,
                    "unit_id": unit_ref,
                    "commanders": [COMMANDER_ALIAS[item] for item in commander_ids],
                    "commander_ids": commander_ids,
                    "ui_order": ui_order,
                    "prefix": prefix,
                    "prefix_key": prefix_key,
                    "suffix": suffix,
                    "suffix_key": suffix_key,
                    "name": name,
                    "name_key": name_key,
                    "tooltip": tooltip,
                    "tooltip_key": tooltip_key,
                    "source": source,
                    "source_name": source_name,
                }
            )

    prestige_details: dict[str, dict[str, object]] = {}
    prestige_user = root.find("./CUser[@id='PlayerPrestige']")
    if prestige_user is not None:
        for instance in prestige_user.findall("Instances"):
            prestige_id = instance.get("Id")
            if not prestige_id or prestige_id == "[Default]":
                continue
            primary_upgrade = ""
            secondary_shared: list[str] = []
            secondary_self: list[str] = []
            suppress_upgrade: list[str] = []
            disable_units = collect_indexed_values(instance, "Unit", "Unit", "DisableUnit")
            enable_units = collect_indexed_values(instance, "Unit", "Unit", "EnableUnit")
            disable_abils = [
                {"abil": child.get("Abil") or "", "cmd": child.get("Cmd") or ""}
                for child in collect_indexed_children(instance, "AbilCmd", "DisableAbil")
            ]
            enable_abils = [
                {"abil": child.get("Abil") or "", "cmd": child.get("Cmd") or ""}
                for child in collect_indexed_children(instance, "AbilCmd", "EnableAbil")
            ]
            for child in instance.findall("GameLink"):
                child_field = field_id(child)
                value = child.get("GameLink") or ""
                if not value:
                    continue
                if child_field == "PrimaryUpgrade":
                    primary_upgrade = value
                elif child_field == "SecondaryUpgradesShared":
                    secondary_shared.append(value)
                elif child_field == "SecondaryUpgradesSelf":
                    secondary_self.append(value)
                elif child_field == "SuppressUpgrade":
                    suppress_upgrade.append(value)
            prestige_details[prestige_id] = {
                "id": prestige_id,
                "name": localize(f"UserData/PlayerPrestige/{prestige_id}_Name", zh, en),
                "description": localize(f"UserData/PlayerPrestige/{prestige_id}_Description", zh, en),
                "primary_upgrade": primary_upgrade,
                "secondary_upgrades_shared": secondary_shared,
                "secondary_upgrades_self": secondary_self,
                "suppress_upgrades": suppress_upgrade,
                "disable_units": disable_units,
                "enable_units": enable_units,
                "disable_abils": disable_abils,
                "enable_abils": enable_abils,
                "upgrade_supplement_ids": collect_indexed_values(instance, "User", "Instance", "UpgradeSupplements"),
                "source": source,
                "source_name": source_name,
            }

    prestige_supplements: dict[str, dict[str, object]] = {}
    supplements_user = root.find("./CUser[@id='PlayerPrestigeUpgradeSupplements']")
    if supplements_user is not None:
        for instance in supplements_user.findall("Instances"):
            item_id = instance.get("Id")
            if not item_id or item_id == "[Default]":
                continue
            upgrades = collect_indexed_values(instance, "GameLink", "GameLink", "Upgrade")
            supplement = collect_indexed_values(instance, "GameLink", "GameLink", "Supplement")
            prestige_supplements[item_id] = {
                "id": item_id,
                "upgrade": upgrades[0] if upgrades else "",
                "supplement_upgrades": supplement,
                "source": source,
                "source_name": source_name,
            }

    return {
        "commanders": commanders,
        "perks": perks,
        "masteries": masteries,
        "tech_units": tech_units,
        "prestiges": prestige_details,
        "prestige_supplements": prestige_supplements,
    }


def build_commander_payload(
    export_root: Path,
    parsed_files: list[dict[str, object]],
    resolver: CatalogResolver,
    zh: dict[str, str],
    en: dict[str, str],
) -> dict[str, dict[str, object]]:
    payload: dict[str, dict[str, object]] = {}
    prestige_lookup: dict[str, dict[str, object]] = {}
    supplement_lookup: dict[str, dict[str, object]] = {}
    for parsed in parsed_files:
        prestige_lookup.update(parsed["prestiges"])  # type: ignore[arg-type]
        supplement_lookup.update(parsed["prestige_supplements"])  # type: ignore[arg-type]

    for commander_id, short_id in COMMANDERS:
        source_name = SOURCE_BY_COMMANDER.get(short_id, "starcoop")
        commander_info: dict[str, object] = {}
        perks: list[dict[str, object]] = []
        masteries: list[dict[str, object]] = []
        tech_entries: list[dict[str, object]] = []
        for parsed in parsed_files:
            if commander_id in parsed["commanders"]:  # type: ignore[operator]
                commander_info = parsed["commanders"][commander_id]  # type: ignore[index]
            perks.extend([item for item in parsed["perks"] if item["commander_id"] == commander_id])  # type: ignore[index]
            masteries.extend([item for item in parsed["masteries"] if item["commander_id"] == commander_id])  # type: ignore[index]
            tech_entries.extend([item for item in parsed["tech_units"] if commander_id in item["commander_ids"]])  # type: ignore[index]

        overrides = TECH_UNIT_UNIT_OVERRIDES.get(short_id, {})
        normalized_tech_entries: list[dict[str, object]] = []
        for entry in tech_entries:
            normalized_entry = dict(entry)
            override_unit_id = overrides.get(str(normalized_entry["id"]))
            if override_unit_id:
                normalized_entry["unit_id"] = override_unit_id
            normalized_tech_entries.append(normalized_entry)
        tech_entries = normalized_tech_entries
        tech_entries.extend(build_supplemental_roster_entries(export_root, short_id, commander_id, source_name, zh, en))

        perks.sort(key=lambda item: ((item.get("level") or 0), (item.get("ui_slot") or 0), str(item.get("id"))))
        masteries.sort(key=lambda item: ((item.get("category") or 0), str(item.get("id"))))
        tech_entries.sort(key=lambda item: ((item.get("ui_order") or 0), str(item.get("id"))))

        prestige_ids = commander_info.get("prestige_ids", []) if commander_info else []
        prestige_entries: list[dict[str, object]] = []
        referenced_upgrade_ids: set[str] = set()
        for upgrade_id in commander_info.get("default_upgrades", []) if commander_info else []:
            if upgrade_id:
                referenced_upgrade_ids.add(upgrade_id)
        for perk in perks:
            referenced_upgrade_ids.update([item for item in perk.get("upgrades", []) if item])
        for mastery in masteries:
            if mastery.get("upgrade"):
                referenced_upgrade_ids.add(str(mastery["upgrade"]))

        for prestige_id in prestige_ids:
            detail = dict(prestige_lookup.get(prestige_id, {}))
            if not detail:
                detail = {
                    "id": prestige_id,
                    "name": localize(f"UserData/PlayerPrestige/{prestige_id}_Name", zh, en),
                    "description": localize(f"UserData/PlayerPrestige/{prestige_id}_Description", zh, en),
                    "primary_upgrade": "",
                    "secondary_upgrades_shared": [],
                    "secondary_upgrades_self": [],
                    "suppress_upgrades": [],
                    "disable_units": [],
                    "enable_units": [],
                    "disable_abils": [],
                    "enable_abils": [],
                    "upgrade_supplement_ids": [],
                    "source_name": source_name,
                }
            supplement_entries = []
            for supplement_id in detail.get("upgrade_supplement_ids", []):
                supplement = supplement_lookup.get(supplement_id)
                if not supplement:
                    continue
                supplement_entries.append(supplement)
                if supplement.get("upgrade"):
                    referenced_upgrade_ids.add(str(supplement["upgrade"]))
                referenced_upgrade_ids.update(str(item) for item in supplement.get("supplement_upgrades", []) if item)
            detail["upgrade_supplements"] = supplement_entries
            if detail.get("primary_upgrade"):
                referenced_upgrade_ids.add(str(detail["primary_upgrade"]))
            referenced_upgrade_ids.update(str(item) for item in detail.get("secondary_upgrades_shared", []) if item)
            referenced_upgrade_ids.update(str(item) for item in detail.get("secondary_upgrades_self", []) if item)
            referenced_upgrade_ids.update(str(item) for item in detail.get("suppress_upgrades", []) if item)
            prestige_entries.append(detail)

        roster: list[dict[str, object]] = []
        units: list[dict[str, object]] = []
        buildings: list[dict[str, object]] = []
        heroes: list[dict[str, object]] = []
        other_entries: list[dict[str, object]] = []
        seen_roster_keys: set[tuple[str, str]] = set()
        for entry in tech_entries:
            roster_key = (str(entry["id"]), str(entry["unit_id"]))
            if roster_key in seen_roster_keys:
                continue
            seen_roster_keys.add(roster_key)
            unit_chain = resolver.unit_chain(entry["source_name"], str(entry["unit_id"]))
            catalog_source = unit_chain[0][0] if unit_chain else ""
            unit_meta = parse_unit(unit_chain, str(entry["unit_id"]), catalog_source)
            if not entry.get("name"):
                entry["name"] = localize(f"Unit/Name/{entry['unit_id']}", zh, en)
            if not entry.get("tooltip"):
                entry["tooltip"] = localize(f"Unit/Tooltip/{entry['unit_id']}", zh, en)
            item = {
                **entry,
                "unit": unit_meta,
            }
            roster.append(item)
            object_type = str(unit_meta.get("object_type") or "Unknown")
            if object_type == "Structure":
                buildings.append(item)
            elif object_type == "Hero":
                heroes.append(item)
            elif object_type == "Unit":
                units.append(item)
            else:
                other_entries.append(item)

        upgrades: list[dict[str, object]] = []
        for upgrade_id in sorted(referenced_upgrade_ids):
            catalog_source, upgrade_node = resolver.upgrade_node(source_name, upgrade_id)
            if upgrade_node is not None:
                upgrades.append(parse_upgrade(upgrade_node, upgrade_id, catalog_source, zh, en))
            else:
                upgrades.append(
                    {
                        "id": upgrade_id,
                        "source_catalog": "",
                        "parent": "",
                        "name": localize(f"Upgrade/Name/{upgrade_id}", zh, en) or localize(f"Button/Name/{upgrade_id}", zh, en),
                        "tooltip": localize(f"Upgrade/Tooltip/{upgrade_id}", zh, en) or localize(f"Button/Tooltip/{upgrade_id}", zh, en),
                        "effect_count": 0,
                    }
                )

        payload[short_id] = {
            "commander": {
                "id": commander_id,
                "short_id": short_id,
                "name": commander_info.get("name") or short_id,
                "description": commander_info.get("description") or "",
                "default_upgrades": commander_info.get("default_upgrades", []),
                "default_ability_commands": commander_info.get("default_ability_commands", []),
                "prestige_ids": prestige_ids,
                "source": commander_info.get("source", ""),
                "source_name": source_name,
            },
            "roster": roster,
            "units": units,
            "buildings": buildings,
            "heroes": heroes,
            "other_entries": other_entries,
            "progression": {
                "perks": perks,
                "masteries": masteries,
            },
            "prestiges": prestige_entries,
            "upgrades": upgrades,
        }

    return payload


def write_commander_files(output_dir: Path, commanders: dict[str, dict[str, object]]) -> None:
    commanders_dir = output_dir / "commanders"
    commanders_dir.mkdir(parents=True, exist_ok=True)
    for short_id, data in commanders.items():
        target = commanders_dir / short_id
        target.mkdir(parents=True, exist_ok=True)
        (target / "commander.json").write_text(
            json.dumps(data["commander"], ensure_ascii=False, indent=2),
            encoding="utf-8",
            newline="\n",
        )
        (target / "roster.json").write_text(
            json.dumps(data["roster"], ensure_ascii=False, indent=2),
            encoding="utf-8",
            newline="\n",
        )
        (target / "units.json").write_text(
            json.dumps(data["units"], ensure_ascii=False, indent=2),
            encoding="utf-8",
            newline="\n",
        )
        (target / "buildings.json").write_text(
            json.dumps(data["buildings"], ensure_ascii=False, indent=2),
            encoding="utf-8",
            newline="\n",
        )
        (target / "heroes.json").write_text(
            json.dumps(data["heroes"], ensure_ascii=False, indent=2),
            encoding="utf-8",
            newline="\n",
        )
        (target / "other-tech-entries.json").write_text(
            json.dumps(data["other_entries"], ensure_ascii=False, indent=2),
            encoding="utf-8",
            newline="\n",
        )
        (target / "progression.json").write_text(
            json.dumps(data["progression"], ensure_ascii=False, indent=2),
            encoding="utf-8",
            newline="\n",
        )
        (target / "prestiges.json").write_text(
            json.dumps(data["prestiges"], ensure_ascii=False, indent=2),
            encoding="utf-8",
            newline="\n",
        )
        (target / "upgrades.json").write_text(
            json.dumps(data["upgrades"], ensure_ascii=False, indent=2),
            encoding="utf-8",
            newline="\n",
        )


def render_summary_markdown(export_root: Path, output_dir: Path, commanders: dict[str, dict[str, object]]) -> str:
    lines = []
    lines.append("# 官方合作指挥官数据导出")
    lines.append("")
    lines.append("## 口径")
    lines.append("")
    lines.append(f"- 官方源：`{export_root.as_posix()}`")
    lines.append(f"- 输出目录：`{output_dir.as_posix()}`")
    lines.append("- 指挥官范围：18 个官方合作指挥官。")
    lines.append("- 包含：科技面板兵种/建筑、英雄条目、等级加点、威望、精通、关联升级。")
    lines.append("- 中文文本优先读取 `zhCN`，缺失时回退 `enUS`。")
    lines.append("")
    lines.append("## 总览")
    lines.append("")
    lines.append("| 指挥官 | 兵种 | 建筑 | 英雄 | 其他 Tech 条目 | 等级加点 | 威望 | 精通 | 关联升级 |")
    lines.append("|---|---:|---:|---:|---:|---:|---:|---:|---:|")
    for _, short_id in COMMANDERS:
        data = commanders[short_id]
        commander_name = data["commander"]["name"] if data.get("commander") else short_id
        lines.append(
            f"| {md_cell(commander_name)} / `{short_id}` | "
            f"{len(data['units'])} | {len(data['buildings'])} | {len(data['heroes'])} | {len(data['other_entries'])} | "
            f"{len(data['progression']['perks'])} | {len(data['prestiges'])} | {len(data['progression']['masteries'])} | {len(data['upgrades'])} |"
        )
    lines.append("")
    lines.append("## 目录")
    lines.append("")
    lines.append("- `commanders/<Commander>/commander.json`：指挥官基础信息、默认升级、默认能力命令。")
    lines.append("- `commanders/<Commander>/roster.json`：官方 TechUnit 全量名册，含单位分类与单位元数据。")
    lines.append("- `commanders/<Commander>/units.json` / `buildings.json` / `heroes.json`：按 `UnitData.EditorCategories.ObjectType` 切分。")
    lines.append("- `commanders/<Commander>/progression.json`：15 级加点与 6 组精通。")
    lines.append("- `commanders/<Commander>/prestiges.json`：3 个威望及其主升级、补充升级、禁用单位/技能。")
    lines.append("- `commanders/<Commander>/upgrades.json`：默认升级、加点、精通、威望引用到的升级详情。")
    lines.append("")
    return "\n".join(lines)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--repo-root", default=".", help="Repository root")
    parser.add_argument("--export-root", default="references/sc2-build-96883-casc-export", help="Official CASC export root")
    parser.add_argument("--output-dir", default="游戏数据/官方合作指挥官", help="Output directory")
    args = parser.parse_args()

    repo_root = Path(args.repo_root).resolve()
    export_root = (repo_root / args.export_root).resolve()
    output_dir = (repo_root / args.output_dir).resolve()
    output_dir.mkdir(parents=True, exist_ok=True)

    zh = load_strings(export_root, "zhcn")
    en = load_strings(export_root, "enus")
    resolver = CatalogResolver(export_root)
    parsed_files = []
    for relative, label in MOD_SOURCES:
        path = export_root / relative / "base.sc2data" / "gamedata" / "userdata.xml"
        if not path.exists():
            raise FileNotFoundError(path)
        parsed_files.append(parse_userdata_file(path, export_root, label, zh, en))

    commanders = build_commander_payload(export_root, parsed_files, resolver, zh, en)
    write_commander_files(output_dir, commanders)

    index_payload = {
        "source_export_root": export_root.relative_to(repo_root).as_posix(),
        "commander_order": [{"id": commander_id, "short_id": short_id} for commander_id, short_id in COMMANDERS],
        "commanders": {
            short_id: {
                "commander": data["commander"],
                "counts": {
                    "units": len(data["units"]),
                    "buildings": len(data["buildings"]),
                    "heroes": len(data["heroes"]),
                    "other_entries": len(data["other_entries"]),
                    "perks": len(data["progression"]["perks"]),
                    "prestiges": len(data["prestiges"]),
                    "masteries": len(data["progression"]["masteries"]),
                    "upgrades": len(data["upgrades"]),
                },
            }
            for short_id, data in commanders.items()
        },
    }
    (output_dir / "official-coop-index.json").write_text(
        json.dumps(index_payload, ensure_ascii=False, indent=2),
        encoding="utf-8",
        newline="\n",
    )
    (output_dir / "README.md").write_text(
        render_summary_markdown(export_root.relative_to(repo_root), output_dir.relative_to(repo_root), commanders),
        encoding="utf-8",
        newline="\n",
    )

    print(f"Output: {output_dir}")
    for _, short_id in COMMANDERS:
        data = commanders[short_id]
        print(
            f"{short_id}: "
            f"units={len(data['units'])}, "
            f"buildings={len(data['buildings'])}, "
            f"heroes={len(data['heroes'])}, "
            f"perks={len(data['progression']['perks'])}, "
            f"prestiges={len(data['prestiges'])}, "
            f"masteries={len(data['progression']['masteries'])}, "
            f"upgrades={len(data['upgrades'])}"
        )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
