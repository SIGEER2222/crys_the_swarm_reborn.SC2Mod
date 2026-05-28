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


def load_json(path: Path):
    return json.loads(path.read_text(encoding="utf-8"))


def entry_name(entry: dict) -> str:
    name = entry.get("name") or entry.get("id") or entry.get("unit_id") or "未命名"
    unit_id = entry.get("unit_id") or ""
    if unit_id and unit_id != name:
        return f"{name} (`{unit_id}`)"
    return name


def collect_names(entries: list[dict]) -> list[str]:
    return [entry_name(entry) for entry in entries]


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
    lines.append("- 整理口径：按指挥官分组展示兵种、建筑、英雄。")
    lines.append("- 名称优先使用中文；括号中保留单位 ID，方便你回查。")
    lines.append("")

    for short_id in COMMANDER_ORDER:
        commander_dir = commanders_root / short_id
        commander = load_json(commander_dir / "commander.json")
        units = load_json(commander_dir / "units.json")
        buildings = load_json(commander_dir / "buildings.json")
        heroes = load_json(commander_dir / "heroes.json")

        lines.append(f"## {commander['name']} / `{short_id}`")
        lines.append("")
        if commander.get("description"):
            lines.append(f"> {commander['description']}")
            lines.append("")
        lines.append(
            f"- 数量统计：兵种 {len(units)}，建筑 {len(buildings)}，英雄 {len(heroes)}"
        )
        lines.append("")

        render_list(lines, "兵种", collect_names(units))
        render_list(lines, "建筑", collect_names(buildings))
        render_list(lines, "英雄", collect_names(heroes))

    out_path.write_text("\n".join(lines), encoding="utf-8", newline="\n")
    print(out_path)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
