from __future__ import annotations

import argparse
import json
import re
from collections import defaultdict
from pathlib import Path
from typing import Iterable
import xml.etree.ElementTree as ET


COMMANDER_TO_MODULE = {
    "Abathur": "XMAbathur.SC2Mod",
    "Alarak": "XMAlarak.SC2Mod",
    "Artanis": "XMArtanis.SC2Mod",
    "Fenix": "XMFenix.SC2Mod",
    "Karax": "XMKarax.SC2Mod",
    "Kerrigan": "XMKerrigan.SC2Mod",
    "Raynor": "XMRaynor.SC2Mod",
    "Vorazun": "XMVorazun.SC2Mod",
    "Zagara": "XMZagara.SC2Mod",
    "Zeratul": "XMZeratul.SC2Mod",
}


ABIL_TOKEN_RE = re.compile(r"^[A-Za-z][A-Za-z0-9_]*$")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Sync resolved official command-card ability closures into XM commander UnitData.xml files."
    )
    parser.add_argument(
        "--workspace-root",
        default=str(Path(__file__).resolve().parents[2]),
        help="Repository root.",
    )
    parser.add_argument(
        "--official-root",
        default="游戏数据/官方合作指挥官/commanders",
        help="Directory containing exported official commander JSON folders.",
    )
    parser.add_argument(
        "--commanders",
        nargs="*",
        default=list(COMMANDER_TO_MODULE.keys()),
        help="Commander names to sync.",
    )
    return parser.parse_args()


def load_json(path: Path) -> object:
    with path.open("r", encoding="utf-8") as handle:
        return json.load(handle)


def collect_owned_unit_ids(commander_dir: Path) -> set[str]:
    owned: set[str] = set()
    for name in ("units.json", "buildings.json", "heroes.json"):
        path = commander_dir / name
        if not path.exists():
            continue
        data = load_json(path)
        if not isinstance(data, list):
            continue
        for item in data:
            if not isinstance(item, dict):
                continue
            unit_id = item.get("unit_id") or item.get("id")
            if isinstance(unit_id, str) and unit_id:
                owned.add(unit_id)
    return owned


def collect_card_abilities(commander_dir: Path, owned_unit_ids: set[str]) -> dict[str, set[str]]:
    result: dict[str, set[str]] = defaultdict(set)
    path = commander_dir / "command_cards.json"
    if not path.exists():
        return result

    data = load_json(path)
    if not isinstance(data, list):
        return result

    for entry in data:
        if not isinstance(entry, dict):
            continue
        unit_id = entry.get("unit_id") or entry.get("id")
        if not isinstance(unit_id, str) or unit_id not in owned_unit_ids:
            continue
        for card in entry.get("cards", []):
            if not isinstance(card, dict):
                continue
            for button in card.get("buttons", []):
                if not isinstance(button, dict):
                    continue
                abil_cmd = button.get("abil_cmd")
                if not isinstance(abil_cmd, str) or not abil_cmd:
                    continue
                abil_id = abil_cmd.split(",", 1)[0].strip()
                if abil_id and ABIL_TOKEN_RE.match(abil_id):
                    result[unit_id].add(abil_id)
    return result


def find_unit_nodes(unit_root: ET.Element) -> dict[str, ET.Element]:
    nodes: dict[str, ET.Element] = {}
    for child in unit_root:
        node_id = child.attrib.get("id")
        if child.tag == "CUnit" and node_id:
            nodes[node_id] = child
    return nodes


def ensure_abil_arrays(node: ET.Element, desired: Iterable[str]) -> list[str]:
    existing = {
        child.attrib.get("Link")
        for child in node.findall("./AbilArray")
        if child.attrib.get("Link")
    }
    added: list[str] = []
    for abil_id in desired:
        if abil_id in existing:
            continue
        ET.SubElement(node, "AbilArray", {"Link": abil_id})
        existing.add(abil_id)
        added.append(abil_id)
    return added


def indent_xml(elem: ET.Element, level: int = 0) -> None:
    indent = "\r\n" + ("  " * level)
    child_indent = "\r\n" + ("  " * (level + 1))
    children = list(elem)
    if children:
        if not elem.text or not elem.text.strip():
            elem.text = child_indent
        for index, child in enumerate(children):
            indent_xml(child, level + 1)
            if not child.tail or not child.tail.strip():
                child.tail = child_indent if index < len(children) - 1 else indent
    elif level and (not elem.tail or not elem.tail.strip()):
        elem.tail = indent


def sync_commander(
    workspace_root: Path,
    commander: str,
    official_root: Path,
) -> tuple[int, int, list[str]]:
    module_name = COMMANDER_TO_MODULE[commander]
    commander_dir = official_root / commander
    if not commander_dir.exists():
        raise FileNotFoundError(f"Official commander directory not found: {commander_dir}")

    scenario_root = workspace_root / "合作指挥官版起义狂潮"
    unit_path = scenario_root / "Mods" / "XM" / module_name / "Base.SC2Data" / "GameData" / "UnitData.xml"
    if not unit_path.exists():
        raise FileNotFoundError(f"Target UnitData.xml not found: {unit_path}")

    owned_unit_ids = collect_owned_unit_ids(commander_dir)
    card_abilities = collect_card_abilities(commander_dir, owned_unit_ids)

    tree = ET.parse(unit_path)
    root = tree.getroot()
    unit_nodes = find_unit_nodes(root)

    changed_units: list[str] = []
    added_count = 0

    for unit_id in sorted(owned_unit_ids):
        node = unit_nodes.get(unit_id)
        if node is None:
            continue

        desired = sorted(card_abilities.get(unit_id, set()))

        added = ensure_abil_arrays(node, desired)
        if added:
            added_count += len(added)
            changed_units.append(f"{unit_id}: {', '.join(added)}")

    if added_count > 0:
        indent_xml(root)
        tree.write(unit_path, encoding="utf-8", xml_declaration=True, short_empty_elements=False)

    return added_count, len(changed_units), changed_units


def main() -> int:
    args = parse_args()
    workspace_root = Path(args.workspace_root).resolve()
    official_root = (workspace_root / args.official_root).resolve()

    total_added = 0
    for commander in args.commanders:
        if commander not in COMMANDER_TO_MODULE:
            raise KeyError(f"Unsupported commander: {commander}")
        added_count, changed_count, changed_units = sync_commander(
            workspace_root=workspace_root,
            commander=commander,
            official_root=official_root,
        )
        total_added += added_count
        print(f"[{commander}] added abil refs: {added_count} across {changed_count} unit(s)")
        for line in changed_units[:12]:
            print(f"  - {line}")
        if len(changed_units) > 12:
            print(f"  - ... {len(changed_units) - 12} more unit(s)")

    print(f"TOTAL_ADDED_ABIL_REFS={total_added}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
