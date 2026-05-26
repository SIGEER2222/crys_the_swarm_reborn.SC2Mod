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

USERDATA_RELATIVE_PATHS = [
    "mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/userdata.xml",
    "mods/starcoop/commanders/egonstetmann.sc2mod/base.sc2data/gamedata/userdata.xml",
    "mods/starcoop/commanders/arcturusmengsk.sc2mod/base.sc2data/gamedata/userdata.xml",
]


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
    text = text.replace("<n/>", "<br>")
    text = re.sub(r"<d\s+ref=\"([^\"]+)\"[^/]*/>", r"{\1}", text)
    text = re.sub(r"<d\s+time=\"([^\"]+)\"[^/]*/>", r"{time:\1}", text)
    text = re.sub(r"</?(?:c|s)(?:\s+[^>]*)?>", "", text)
    text = re.sub(r"<[^>]+>", "", text)
    text = re.sub(r"\s+", " ", text)
    return text.strip()


def md_cell(value: object) -> str:
    text = "" if value is None else str(value)
    text = clean_markup(text)
    text = text.replace("|", r"\|")
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


def collect_text_by_field(instance: ET.Element, expected_field: str, zh: dict[str, str], en: dict[str, str]) -> tuple[str, str]:
    for text in instance.findall("Text"):
        if field_id(text) != expected_field:
            continue
        key = text.get("Text")
        return key or "", localize(key, zh, en)
    return "", ""


def parse_userdata_file(path: Path, export_root: Path, zh: dict[str, str], en: dict[str, str]) -> dict[str, object]:
    tree = ET.parse(path)
    root = tree.getroot()
    source = source_label(path, export_root)

    levels: dict[str, dict[str, object]] = {}
    player_levels = root.find("./CUser[@id='PlayerLevels']")
    if player_levels is not None:
        for instance in player_levels.findall("Instances"):
            instance_id = instance.get("Id")
            if not instance_id or instance_id == "[Default]":
                continue
            level = None
            commander = None
            for child in instance:
                if child.tag == "Int" and field_id(child) == "Level":
                    raw = child.get("Int")
                    level = int(raw) if raw and raw.isdigit() else None
                elif child.tag == "User" and child.get("Type") == "PlayerCommanders" and field_id(child) == "Commander":
                    commander = child.get("Instance")
            if level is None:
                match = re.search(r"Level0?(\d+)$", instance_id)
                level = int(match.group(1)) if match else None
            levels[instance_id] = {
                "id": instance_id,
                "level": level,
                "commander_id": commander,
                "source": source,
            }

    commanders: dict[str, dict[str, object]] = {}
    player_commanders = root.find("./CUser[@id='PlayerCommanders']")
    if player_commanders is not None:
        for instance in player_commanders.findall("Instances"):
            instance_id = instance.get("Id")
            if not instance_id or instance_id == "[Default]":
                continue
            name_key, name = collect_text_by_field(instance, "Name", zh, en)
            description_key, description = collect_text_by_field(instance, "Description", zh, en)
            commanders[instance_id] = {
                "id": instance_id,
                "short_id": COMMANDER_ALIAS.get(instance_id, instance_id),
                "name": name,
                "name_key": name_key,
                "description": description,
                "description_key": description_key,
                "default_upgrades": collect_indexed_values(instance, "Upgrade", "Upgrade", "DefaultUpgrades"),
                "prestige": collect_indexed_values(instance, "User", "Instance", "Prestige"),
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
            effects: list[str] = []
            commander_id = None
            level_id = None
            ui_slot = None
            for child in instance:
                child_field = field_id(child)
                if child.tag == "GameLink" and child_field == "Button":
                    button = child.get("GameLink") or ""
                elif child.tag == "GameLink" and child_field == "Effect":
                    value = child.get("GameLink")
                    if value:
                        effects.append(value)
                elif child.tag == "User" and child.get("Type") == "PlayerCommanders" and child_field == "Commander":
                    commander_id = child.get("Instance")
                elif child.tag == "User" and child.get("Type") == "PlayerLevels" and child_field == "Level":
                    level_id = child.get("Instance")
                elif child.tag == "Int" and child_field == "UISlot":
                    raw = child.get("Int")
                    ui_slot = int(raw) if raw and raw.isdigit() else raw
            if not button:
                continue
            level_info = levels.get(level_id or "", {})
            if not commander_id:
                commander_id = level_info.get("commander_id") if level_info else None
            if commander_id not in COMMANDER_ALIAS:
                continue
            level = level_info.get("level")
            explicit_name_key, explicit_name = collect_text_by_field(instance, "Name", zh, en)
            explicit_tooltip_key, explicit_tooltip = collect_text_by_field(instance, "Tooltip", zh, en)
            explicit_description_key, explicit_description = collect_text_by_field(instance, "Description", zh, en)
            button_name_key = f"Button/Name/{button}" if button else ""
            button_tooltip_key = f"Button/Tooltip/{button}" if button else ""
            name = explicit_name or localize(button_name_key, zh, en)
            tooltip = explicit_tooltip or localize(button_tooltip_key, zh, en)
            perks.append(
                {
                    "id": instance_id,
                    "commander_id": commander_id,
                    "commander": COMMANDER_ALIAS[commander_id],
                    "level_id": level_id,
                    "level": level,
                    "ui_slot": ui_slot,
                    "button": button,
                    "name": name,
                    "name_key": explicit_name_key or button_name_key,
                    "tooltip": tooltip,
                    "tooltip_key": explicit_tooltip_key or button_tooltip_key,
                    "description": explicit_description,
                    "description_key": explicit_description_key,
                    "upgrades": collect_indexed_values(instance, "Upgrade", "Upgrade", "Upgrade"),
                    "ability_commands": [
                        {
                            "abil": child.get("Abil"),
                            "cmd": child.get("Cmd"),
                        }
                        for child in instance.findall("AbilCmd")
                        if field_id(child) == "AbilityCommand"
                    ],
                    "effects": effects,
                    "source": source,
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
                }
            )

    return {
        "levels": levels,
        "commanders": commanders,
        "perks": perks,
        "masteries": masteries,
    }


def group_data(parsed_files: list[dict[str, object]]) -> dict[str, object]:
    commanders: dict[str, dict[str, object]] = {}
    perks: dict[str, list[dict[str, object]]] = defaultdict(list)
    masteries: dict[str, list[dict[str, object]]] = defaultdict(list)
    sources: set[str] = set()

    for parsed in parsed_files:
        for commander_id, info in parsed["commanders"].items():  # type: ignore[index, union-attr]
            if commander_id in COMMANDER_ALIAS:
                commanders[commander_id] = info  # type: ignore[assignment]
        for item in parsed["perks"]:  # type: ignore[index, union-attr]
            typed = item  # type: ignore[assignment]
            perks[typed["commander_id"]].append(typed)
            sources.add(typed["source"])
        for item in parsed["masteries"]:  # type: ignore[index, union-attr]
            typed = item  # type: ignore[assignment]
            masteries[typed["commander_id"]].append(typed)
            sources.add(typed["source"])

    for items in perks.values():
        items.sort(key=lambda item: ((item.get("level") or 0), (item.get("ui_slot") or 0), str(item.get("id"))))
    for items in masteries.values():
        items.sort(key=lambda item: ((item.get("category") or 0), str(item.get("id"))))

    return {
        "commanders": commanders,
        "perks": dict(perks),
        "masteries": dict(masteries),
        "sources": sorted(sources),
    }


def render_markdown(data: dict[str, object], export_root: Path) -> str:
    commanders: dict[str, dict[str, object]] = data["commanders"]  # type: ignore[assignment]
    perks: dict[str, list[dict[str, object]]] = data["perks"]  # type: ignore[assignment]
    masteries: dict[str, list[dict[str, object]]] = data["masteries"]  # type: ignore[assignment]

    lines: list[str] = []
    lines.append("# 2026-05-26 官方合作指挥官原始加点与精通")
    lines.append("")
    lines.append("## 口径")
    lines.append("")
    lines.append(f"- 官方源：`{export_root.as_posix()}`。")
    lines.append("- 导出说明：`references/sc2-build-96883-casc-export-MANIFEST.md`，来源为本机 SC2 Build 96883 的 CASC 文本/目录资源导出。")
    lines.append("- 等级加点来自官方 `CUser id=\"CampaignPerk\"`：按 `PlayerLevels` 的 1-15 级、`Button`、`Upgrade`、`AbilityCommand` 整理。")
    lines.append("- 精通来自官方 `CUser id=\"MasteryUpgrades\"`：按 `Category`、`PointIncrement`、`TalentData`、`Upgrade`、`Name`、`ValueFormat` 整理。")
    lines.append("- 斯台特曼和蒙斯克在官方导出中位于单独指挥官模块：`egonstetmann.sc2mod`、`arcturusmengsk.sc2mod`。")
    lines.append("- 中文文本优先读取 `zhCN.SC2Data/LocalizedData/*.txt`，缺失时回退 `enUS`；按钮缺失本地化时保留官方内部 Button ID。")
    lines.append("- 本文是官方静态资源提取，不使用 `合作指挥官版起义狂潮/Mods/XM` 的 Mod 内数据。")
    lines.append("")
    lines.append("## 总览")
    lines.append("")
    lines.append("| 指挥官 | 官方内部 ID | 等级加点 | 精通 | 数据源 |")
    lines.append("|---|---|---:|---:|---|")
    for commander_id, short_id in COMMANDERS:
        info = commanders.get(commander_id, {})
        display_name = info.get("name") or short_id
        source_names = sorted(
            {
                item["source"]
                for item in perks.get(commander_id, []) + masteries.get(commander_id, [])
                if item.get("source")
            }
        )
        source_text = "<br>".join(f"`{source}`" for source in source_names)
        lines.append(
            f"| {md_cell(display_name)} / `{short_id}` | `{commander_id}` | {len(perks.get(commander_id, []))} | {len(masteries.get(commander_id, []))} | {source_text} |"
        )
    lines.append("")
    lines.append("## 明细")
    lines.append("")

    for commander_id, short_id in COMMANDERS:
        info = commanders.get(commander_id, {})
        display_name = info.get("name") or short_id
        lines.append(f"### {md_cell(display_name)} / {short_id}")
        lines.append("")
        lines.append(f"- 官方内部 ID：`{commander_id}`")
        if info.get("default_upgrades"):
            lines.append("- 默认升级：" + "；".join(f"`{item}`" for item in info["default_upgrades"]))  # type: ignore[index]
        if info.get("prestige"):
            lines.append("- 威望实例：" + "；".join(f"`{item}`" for item in info["prestige"]))  # type: ignore[index]
        lines.append("")
        lines.append("#### 等级加点 / CampaignPerk")
        lines.append("")
        lines.append("| 等级 | UI槽 | 实例 | 名称 | Button | Upgrade | AbilityCommand | 说明/提示 |")
        lines.append("|---:|---:|---|---|---|---|---|---|")
        for item in perks.get(commander_id, []):
            upgrades = "<br>".join(f"`{value}`" for value in item.get("upgrades", []))
            abilities = "<br>".join(
                f"`{entry.get('abil')}{',' + entry.get('cmd') if entry.get('cmd') else ''}`"
                for entry in item.get("ability_commands", [])
            )
            display = item.get("name") or ""
            tooltip = item.get("tooltip") or item.get("description") or ""
            lines.append(
                "| {level} | {slot} | `{id}` | {name} | `{button}` | {upgrades} | {abilities} | {tooltip} |".format(
                    level=md_cell(item.get("level")),
                    slot=md_cell(item.get("ui_slot")),
                    id=md_cell(item.get("id")),
                    name=md_cell(display),
                    button=md_cell(item.get("button")),
                    upgrades=upgrades,
                    abilities=abilities,
                    tooltip=md_cell(tooltip),
                )
            )
        lines.append("")
        lines.append("#### 精通 / MasteryUpgrades")
        lines.append("")
        lines.append("| 组 | 实例 | 名称 | Upgrade | TalentData | 每点增量 | 显示格式 |")
        lines.append("|---:|---|---|---|---|---|---|")
        for item in masteries.get(commander_id, []):
            increments = " / ".join(item.get("point_increments", []))
            lines.append(
                "| {category} | `{id}` | {name} | `{upgrade}` | `{talent}` | {increments} | {fmt} |".format(
                    category=md_cell(item.get("category")),
                    id=md_cell(item.get("id")),
                    name=md_cell(item.get("name")),
                    upgrade=md_cell(item.get("upgrade")),
                    talent=md_cell(item.get("talent_data")),
                    increments=md_cell(increments),
                    fmt=md_cell(item.get("value_format")),
                )
            )
        lines.append("")

    lines.append("## 静态校验")
    lines.append("")
    total_perks = sum(len(items) for items in perks.values())
    total_masteries = sum(len(items) for items in masteries.values())
    missing_perk = [short_id for commander_id, short_id in COMMANDERS if len(perks.get(commander_id, [])) != 15]
    missing_mastery = [short_id for commander_id, short_id in COMMANDERS if len(masteries.get(commander_id, [])) != 6]
    lines.append(f"- 提取官方指挥官：`{len(COMMANDERS)}` 个。")
    lines.append(f"- 等级加点：`{total_perks}` 条，预期 `18 * 15 = 270`。")
    lines.append(f"- 精通：`{total_masteries}` 条，预期 `18 * 6 = 108`。")
    lines.append(f"- 等级加点数量异常：`{', '.join(missing_perk) if missing_perk else '无'}`。")
    lines.append(f"- 精通数量异常：`{', '.join(missing_mastery) if missing_mastery else '无'}`。")
    lines.append("- 解析源不包含当前 Mod 的 `CommanderAch` 自定义数据。")
    lines.append("")
    return "\n".join(lines)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--repo-root", default=".", help="Repository root")
    parser.add_argument("--export-root", default="references/sc2-build-96883-casc-export", help="Official CASC export root")
    parser.add_argument(
        "--output-dir",
        default="docs/每日进度/2026-05-26官方合作指挥官原始精通加点",
        help="Output directory",
    )
    args = parser.parse_args()

    repo_root = Path(args.repo_root).resolve()
    export_root = (repo_root / args.export_root).resolve()
    output_dir = (repo_root / args.output_dir).resolve()
    output_dir.mkdir(parents=True, exist_ok=True)

    zh = load_strings(export_root, "zhcn")
    en = load_strings(export_root, "enus")
    parsed = []
    for relative in USERDATA_RELATIVE_PATHS:
        path = export_root / relative
        if not path.exists():
            raise FileNotFoundError(path)
        parsed.append(parse_userdata_file(path, export_root, zh, en))

    grouped = group_data(parsed)
    payload = {
        "source_export_root": export_root.relative_to(repo_root).as_posix(),
        "source_manifest": "references/sc2-build-96883-casc-export-MANIFEST.md",
        "commander_order": [{"id": commander_id, "short_id": short_id} for commander_id, short_id in COMMANDERS],
        **grouped,
    }

    markdown = render_markdown(grouped, export_root.relative_to(repo_root))
    md_path = output_dir / "官方合作指挥官原始加点与精通汇总.md"
    json_path = output_dir / "official-coop-progression.json"
    md_path.write_text(markdown, encoding="utf-8", newline="\n")
    json_path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8", newline="\n")

    total_perks = sum(len(items) for items in grouped["perks"].values())  # type: ignore[index, union-attr]
    total_masteries = sum(len(items) for items in grouped["masteries"].values())  # type: ignore[index, union-attr]
    print(f"Markdown: {md_path}")
    print(f"JSON: {json_path}")
    print(f"Commanders: {len(COMMANDERS)}")
    print(f"CampaignPerk rows: {total_perks}")
    print(f"Mastery rows: {total_masteries}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
