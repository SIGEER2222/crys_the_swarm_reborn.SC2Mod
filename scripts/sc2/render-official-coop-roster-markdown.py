from __future__ import annotations

import json
from pathlib import Path


COMMANDER_ORDER = [
    "Raynor",
    "Kerrigan",
    "Artanis",
    "Swann",
    "Zagara",
    "Vorazun",
    "Karax",
    "Abathur",
    "Alarak",
    "Nova",
    "Stukov",
    "Fenix",
    "Dehaka",
    "Horner",
    "Tychus",
    "Zeratul",
    "Stetmann",
    "Mengsk",
]


MANUAL_CHAIN_OVERRIDES = {
    "Kerrigan": {
        "Zergling": "腾跃虫",
        "MutaliskBroodlord": "异龙 / 可升级为巢虫领主",
    },
    "Abathur": {
        "Roach": "蟑螂系基础体",
        "RoachCorpser": "尸毒蟑螂",
        "RoachVile": "恶毒蟑螂",
        "RavagerAbathur": "秽形虫",
        "Mutalisk": "异龙 / 可升级为守护者、吞噬者",
        "GuardianMP": "守护者",
        "DevourerMP": "吞噬者",
        "Brutalisk": "莽兽（地面终极进化）",
        "Leviathan": "利维坦（空中终极进化）",
    },
    "Swann": {
        "Hellion": "恶火",
        "HellionTank": "恶蝠（形态切换）",
    },
    "Horner": {
        "HHHellion": "恶火",
        "HHHellionTank": "恶蝠（形态切换）",
    },
    "Mengsk": {
        "SiegeTankMengskSieged": "冲击分队（攻城模式）",
        "VikingMengskAssault": "天空之怒（突击模式）",
        "RavenMengskSieged": "帝国见证者（架设模式）",
    },
    "Dehaka": {
        "DehakaCreeperFlying": "爆裂掘地虫（升级形态）",
        "DehakaHydraliskLevel2": "原始刺蛇（升级后形态）",
        "DehakaMutaliskLevel3": "原始异龙（顶级形态）",
        "DehakaRoachLevel2": "原始蟑螂（升级后形态）",
        "DehakaRoachLevel3": "原始点火虫（顶级形态）",
        "DehakaUltraliskLevel2": "原始雷兽（升级后形态）",
        "DehakaUltraliskLevel3": "暴龙兽（顶级形态）",
        "DehakaZerglingLevel2": "原始跳虫（升级后形态）",
        "DehakaAirTownHall": "原始主巢（空投/空中形态）",
    },
}

MANUAL_HIDE_UNITS = {
    "Abathur": {"Roach", "RoachCorpser", "RoachVile", "GuardianMP", "DevourerMP"},
    "Stetmann": {
        "LurkerStetmannBurrowed",
        "OverseerStetmannSiegeMode",
        "SpineCrawlerUprootedStetmann",
        "SporeCrawlerUprootedStetmann",
    },
    "Swann": {"HellionTank"},
    "Horner": {"HHHellionTank"},
    "Mengsk": {"SiegeTankMengskSieged", "VikingMengskAssault", "RavenMengskSieged"},
}

MANUAL_HIDE_EVOLUTION_TARGETS = {
    "Abathur": {("RavagerAbathur", "Brutalisk")},
}


def load_json(path: Path):
    return json.loads(path.read_text(encoding="utf-8"))


def normalized_name(entry: dict, commander_short_id: str) -> str:
    unit_id = entry.get("unit_id") or entry.get("id") or ""
    override = MANUAL_CHAIN_OVERRIDES.get(commander_short_id, {}).get(unit_id)
    if override:
        return f"{override} (`{unit_id}`)"
    name = entry.get("name") or unit_id or entry.get("id") or "未命名"
    if unit_id and unit_id != name:
        return f"{name} (`{unit_id}`)"
    return name


def commander_hidden_units(commander_short_id: str) -> set[str]:
    return MANUAL_HIDE_UNITS.get(commander_short_id, set())


def build_evolution_lines(units: list[dict], commander_short_id: str) -> list[str]:
    visible_unit_ids = {entry.get("unit_id") for entry in units if entry.get("unit_id")}
    hidden_unit_ids = commander_hidden_units(commander_short_id)
    hidden_links = MANUAL_HIDE_EVOLUTION_TARGETS.get(commander_short_id, set())
    lines: list[str] = []
    seen: set[tuple[str, str]] = set()

    for entry in units:
        unit_id = entry.get("unit_id") or ""
        prod = entry.get("production") or {}
        base_id = prod.get("base_unit_id") or ""
        if not base_id:
            continue
        if unit_id in hidden_unit_ids:
            continue
        key = (base_id, unit_id)
        if key in hidden_links:
            continue
        if key in seen:
            continue
        seen.add(key)

        base_name = MANUAL_CHAIN_OVERRIDES.get(commander_short_id, {}).get(base_id)
        if not base_name:
            base_entry = next((item for item in units if item.get("unit_id") == base_id), None)
            base_name = base_entry.get("name") if base_entry else base_id
        target_name = MANUAL_CHAIN_OVERRIDES.get(commander_short_id, {}).get(unit_id) or entry.get("name") or unit_id
        lines.append(f"{base_name} (`{base_id}`) -> {target_name} (`{unit_id}`)")

    if commander_short_id == "Kerrigan" and "Zergling" in visible_unit_ids:
        lines.append("跳虫 (`Zergling`) -> 腾跃虫（等级升级后的最终作战形态）")
    if commander_short_id == "Abathur":
        lines.extend(
            [
                "蟑螂 (`Roach`) -> 尸毒蟑螂 (`RoachCorpser`) / 恶毒蟑螂 (`RoachVile`) -> 秽形虫 (`RavagerAbathur`)",
                "异龙 (`Mutalisk`) -> 守护者 (`GuardianMP`) / 吞噬者 (`DevourerMP`)",
                "任意满生物质地面作战单位 -> 莽兽 (`Brutalisk`)",
                "任意满生物质空中作战单位 -> 利维坦 (`Leviathan`)",
            ]
        )
    if commander_short_id == "Dehaka":
        lines.extend(
            [
                "掘地虫 (`DehakaCreeper`) -> 爆裂掘地虫 (`DehakaCreeperFlying`)",
                "原始蟑螂系 (`DehakaRoachLevel2`) -> 原始点火虫 (`DehakaRoachLevel3`)",
                "原始雷兽系 (`DehakaUltraliskLevel2`) -> 暴龙兽 (`DehakaUltraliskLevel3`)",
            ]
        )
    return lines


def build_final_unit_names(units: list[dict], commander_short_id: str) -> list[str]:
    hidden_unit_ids = commander_hidden_units(commander_short_id)
    names: list[str] = []
    seen: set[str] = set()

    for entry in units:
        unit_id = entry.get("unit_id") or ""
        if unit_id in hidden_unit_ids:
            continue
        label = normalized_name(entry, commander_short_id)
        if label in seen:
            continue
        seen.add(label)
        names.append(label)

    return names


def collect_names(entries: list[dict], commander_short_id: str) -> list[str]:
    names: list[str] = []
    seen: set[str] = set()
    for entry in entries:
        label = normalized_name(entry, commander_short_id)
        if label in seen:
            continue
        seen.add(label)
        names.append(label)
    return names


def render_list(lines: list[str], title: str, names: list[str]) -> None:
    lines.append(f"### {title}")
    if not names:
        lines.append("- 无")
        lines.append("")
        return
    for name in names:
        lines.append(f"- {name}")
    lines.append("")


def main() -> int:
    repo_root = Path(__file__).resolve().parents[2]
    commanders_root = repo_root / "游戏数据" / "官方合作指挥官" / "commanders"
    out_path = repo_root / "游戏数据" / "官方合作指挥官" / "官方合作指挥官兵种建筑总表-中文.md"

    lines: list[str] = []
    lines.append("# 官方合作指挥官兵种建筑总表")
    lines.append("")
    lines.append("- 数据源：`游戏数据/官方合作指挥官/_source-cache/live-casc-export`")
    lines.append("- 整理口径：按指挥官分组展示最终兵种、建筑、英雄。")
    lines.append("- 对存在升级替换、进化分支的单位，优先按最终可玩形态整理，不再机械平铺基础体和中间态。")
    lines.append("")

    for short_id in COMMANDER_ORDER:
        commander_dir = commanders_root / short_id
        commander = load_json(commander_dir / "commander.json")
        units = load_json(commander_dir / "units.json")
        buildings = load_json(commander_dir / "buildings.json")
        heroes = load_json(commander_dir / "heroes.json")

        final_units = build_final_unit_names(units, short_id)
        evolution_lines = build_evolution_lines(units, short_id)

        lines.append(f"## {commander['name']} / `{short_id}`")
        lines.append("")
        if commander.get("description"):
            lines.append(f"> {commander['description']}")
            lines.append("")
        lines.append(
            f"- 数量统计：最终兵种 {len(final_units)}，建筑 {len(collect_names(buildings, short_id))}，英雄 {len(collect_names(heroes, short_id))}"
        )
        lines.append("")

        render_list(lines, "最终兵种", final_units)
        render_list(lines, "建筑", collect_names(buildings, short_id))
        render_list(lines, "英雄", collect_names(heroes, short_id))
        if evolution_lines:
            render_list(lines, "进化 / 升级链", evolution_lines)

    out_path.write_text("\n".join(lines), encoding="utf-8", newline="\n")
    print(out_path)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
