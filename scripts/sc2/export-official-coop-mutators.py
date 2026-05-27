from __future__ import annotations

import argparse
import json
import re
import shutil
import subprocess
from pathlib import Path


DEFAULT_STORAGE_CANDIDATES = [
    Path(r"E:\SC2\SC2new\StarCraft II\SC2Data"),
    Path(r"C:\Program Files (x86)\StarCraft II\SC2Data"),
    Path(r"C:\Program Files\StarCraft II\SC2Data"),
]

LIVE_EXPORT_RELATIVE_PATH = Path("游戏数据/官方合作突变因子/_source-cache/live-casc-export")
OUTPUT_RELATIVE_PATH = Path("游戏数据/官方合作突变因子")
LOCAL_MUTATOR_TRIGGER_STRINGS = Path(
    "合作指挥官版起义狂潮/Mods/XM/XMMutator.SC2Mod/zhCN.SC2Data/LocalizedData/TriggerStrings.txt"
)

OFFICIAL_TRIGGER_FILES = [
    "mods/starcoop/starcoop.sc2mod/zhcn.sc2data/localizeddata/triggerstrings.txt",
    "mods/starcoop/starcoop.sc2mod/enus.sc2data/localizeddata/triggerstrings.txt",
]

OFFICIAL_INIT_PATTERN = re.compile(r"^Trigger/Name/(lib_COMU_[0-9A-F]+)=(CT_Initialize[^\s]+)")
OFFICIAL_QUICK_PATTERN = re.compile(r"^PresetValue/Name/(lib_COMU_[0-9A-F]+)=(CT_Quick[^\s]+)")
LOCAL_INIT_PATTERN = re.compile(r"^Trigger/Name/(lib_COMU_[0-9A-F]+)=初始化-(.+)$")


def detect_storage_path() -> Path:
    for candidate in DEFAULT_STORAGE_CANDIDATES:
        if candidate.exists():
            return candidate
    raise FileNotFoundError("No SC2Data CASC storage found in default locations.")


def casc_dump_command(repo_root: Path) -> list[str]:
    exe_path = repo_root / "tools" / "casc" / "CascDump" / "bin" / "Debug" / "net9.0" / "CascDump.exe"
    dll_path = repo_root / "tools" / "casc" / "CascDump" / "bin" / "Debug" / "net9.0" / "CascDump.dll"
    if exe_path.exists():
        return [str(exe_path)]
    if dll_path.exists():
        return ["dotnet", str(dll_path)]
    raise FileNotFoundError("CascDump executable not found. Build tools/casc/CascDump first.")


def build_live_export_file_list(casc_cmd: list[str], storage_path: Path) -> list[str]:
    process = subprocess.Popen(
        [*casc_cmd, "list", str(storage_path), "1000000"],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
        encoding="utf-8",
        errors="ignore",
    )
    assert process.stdout is not None
    assert process.stderr is not None

    wanted = {path.lower(): path for path in OFFICIAL_TRIGGER_FILES}
    results: list[str] = []
    for raw_line in process.stdout:
        line = raw_line.rstrip("\r\n")
        if not line or "\t" not in line:
            continue
        storage_rel, _, _, _ = line.split("\t", 3)
        normalized = storage_rel.replace("\\", "/")
        lowered = normalized.lower()
        if lowered in wanted:
            results.append(normalized)

    stderr_output = process.stderr.read()
    return_code = process.wait()
    if return_code != 0:
        raise RuntimeError(f"CascDump list failed: {stderr_output.strip()}")
    return sorted(set(results))


def ensure_live_export(repo_root: Path, storage_path: Path, export_root: Path, force_refresh: bool) -> Path:
    required_paths = [export_root / path.replace("/", "\\") for path in OFFICIAL_TRIGGER_FILES]
    manifest_path = export_root / "LIVE-MANIFEST.json"
    if not force_refresh and all(path.exists() for path in required_paths) and manifest_path.exists():
        return export_root

    casc_cmd = casc_dump_command(repo_root)
    file_list = build_live_export_file_list(casc_cmd, storage_path)
    if not file_list:
        raise RuntimeError(f"No official coop triggerstrings found in {storage_path}")

    if export_root.exists():
        shutil.rmtree(export_root)
    export_root.mkdir(parents=True, exist_ok=True)

    file_list_path = export_root / "casc-export-file-list.txt"
    file_list_path.write_text("\n".join(file_list) + "\n", encoding="utf-8", newline="\n")
    extract_run = subprocess.run(
        [*casc_cmd, "extract", str(storage_path), str(export_root), str(file_list_path)],
        check=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
        encoding="utf-8",
        errors="ignore",
    )
    manifest = {
        "storage_path": str(storage_path),
        "export_root": str(export_root),
        "file_count": len(file_list),
        "files": file_list,
        "extract_stdout_tail": extract_run.stdout.strip().splitlines()[-3:],
        "extract_stderr_tail": extract_run.stderr.strip().splitlines()[-3:],
    }
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8", newline="\n")
    return export_root


def read_lines(path: Path) -> list[str]:
    return path.read_text(encoding="utf-8", errors="ignore").splitlines()


def parse_official_initializers(lines: list[str]) -> list[dict[str, str]]:
    items: list[dict[str, str]] = []
    for line in lines:
        match = OFFICIAL_INIT_PATTERN.match(line)
        if not match:
            continue
        items.append(
            {
                "id": match.group(1),
                "official_init_trigger": match.group(2),
                "official_internal_name": match.group(2).removeprefix("CT_Initialize"),
            }
        )
    return items


def parse_official_quick_presets(lines: list[str]) -> list[dict[str, str]]:
    items: list[dict[str, str]] = []
    for line in lines:
        match = OFFICIAL_QUICK_PATTERN.match(line)
        if not match:
            continue
        items.append(
            {
                "id": match.group(1),
                "official_quick_preset": match.group(2),
                "official_internal_name": match.group(2).removeprefix("CT_Quick"),
            }
        )
    return items


def parse_local_initializers(lines: list[str]) -> dict[str, dict[str, str]]:
    result: dict[str, dict[str, str]] = {}
    for line in lines:
        match = LOCAL_INIT_PATTERN.match(line)
        if not match:
            continue
        result[match.group(1)] = {
            "id": match.group(1),
            "local_init_trigger": f"初始化-{match.group(2)}",
            "local_display_name": match.group(2).strip(),
        }
    return result


def build_markdown(
    storage_path: Path,
    export_root: Path,
    official_initializers: list[dict[str, str]],
    official_quick_presets: list[dict[str, str]],
    local_init_by_id: dict[str, dict[str, str]],
    local_only: list[dict[str, str]],
    official_without_local: list[dict[str, str]],
) -> str:
    lines: list[str] = []
    lines.append("# 官方合作突变因子直出清单")
    lines.append("")
    lines.append("## 数据来源")
    lines.append("")
    lines.append(f"- 直接游戏目录：`{storage_path}`")
    lines.append(f"- 本次 live 导出缓存：`{export_root}`")
    lines.append(f"- 当前项目中文映射参考：`{LOCAL_MUTATOR_TRIGGER_STRINGS.as_posix()}`")
    lines.append("")
    lines.append("## 概览")
    lines.append("")
    lines.append(f"- 官方 `CT_Initialize*` 因子数：`{len(official_initializers)}`")
    lines.append(f"- 官方 `CT_Quick*` 快捷预设数：`{len(official_quick_presets)}`")
    lines.append(f"- 当前项目 `初始化-*` 数：`{len(local_init_by_id)}`")
    lines.append(f"- 当前项目存在、官方 live 未找到的初始化项：`{len(local_only)}`")
    lines.append(f"- 官方 live 存在、当前项目未映射中文初始化项：`{len(official_without_local)}`")
    lines.append("")
    lines.append("## 官方初始化主表")
    lines.append("")
    lines.append("| ID | 官方初始化触发 | 当前项目中文名 |")
    lines.append("| --- | --- | --- |")
    for item in official_initializers:
        local_name = local_init_by_id.get(item["id"], {}).get("local_display_name", "")
        lines.append(f"| `{item['id']}` | `{item['official_init_trigger']}` | {local_name or '-'} |")

    if local_only:
        lines.append("")
        lines.append("## 当前项目多出、官方 live 未找到")
        lines.append("")
        lines.append("| ID | 当前项目中文名 |")
        lines.append("| --- | --- |")
        for item in local_only:
            lines.append(f"| `{item['id']}` | {item['local_display_name']} |")

    if official_without_local:
        lines.append("")
        lines.append("## 官方 live 有、当前项目没映射中文名")
        lines.append("")
        lines.append("| ID | 官方初始化触发 |")
        lines.append("| --- | --- |")
        for item in official_without_local:
            lines.append(f"| `{item['id']}` | `{item['official_init_trigger']}` |")

    return "\n".join(lines) + "\n"


def write_json(path: Path, data: object) -> None:
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8", newline="\n")


def main() -> int:
    parser = argparse.ArgumentParser(description="Export official coop mutators directly from live SC2Data.")
    parser.add_argument("--repo-root", type=Path, default=Path.cwd(), help="Repository root")
    parser.add_argument("--output-dir", type=Path, default=None, help="Output directory")
    parser.add_argument("--storage-path", type=Path, default=None, help="SC2Data CASC storage path")
    parser.add_argument("--live-export-dir", type=Path, default=None, help="Direct live export cache directory")
    parser.add_argument("--force-live-refresh", action="store_true", help="Re-extract triggerstrings from live SC2Data")
    args = parser.parse_args()

    repo_root = args.repo_root.resolve()
    output_dir = (args.output_dir or (repo_root / OUTPUT_RELATIVE_PATH)).resolve()
    storage_path = (args.storage_path or detect_storage_path()).resolve()
    export_root = (args.live_export_dir or (repo_root / LIVE_EXPORT_RELATIVE_PATH)).resolve()

    export_root = ensure_live_export(repo_root, storage_path, export_root, args.force_live_refresh)

    official_trigger_lines = []
    for relative in OFFICIAL_TRIGGER_FILES:
        official_trigger_lines.extend(read_lines(export_root / relative.replace("/", "\\")))

    official_initializers = parse_official_initializers(official_trigger_lines)
    official_quick_presets = parse_official_quick_presets(official_trigger_lines)

    local_trigger_path = repo_root / LOCAL_MUTATOR_TRIGGER_STRINGS
    local_init_by_id = parse_local_initializers(read_lines(local_trigger_path))

    official_ids = {item["id"] for item in official_initializers}
    local_ids = set(local_init_by_id)

    merged_initializers: list[dict[str, str]] = []
    for item in official_initializers:
        merged = dict(item)
        merged.update(local_init_by_id.get(item["id"], {}))
        merged_initializers.append(merged)

    local_only = [local_init_by_id[item_id] for item_id in sorted(local_ids - official_ids)]
    official_without_local = [item for item in merged_initializers if item["id"] not in local_ids]

    output_dir.mkdir(parents=True, exist_ok=True)

    summary = {
        "storage_path": str(storage_path),
        "live_export_dir": str(export_root),
        "official_initializer_count": len(official_initializers),
        "official_quick_preset_count": len(official_quick_presets),
        "local_initializer_count": len(local_init_by_id),
        "local_only_count": len(local_only),
        "official_without_local_count": len(official_without_local),
    }

    write_json(output_dir / "summary.json", summary)
    write_json(output_dir / "official-initializers.json", merged_initializers)
    write_json(output_dir / "official-quick-presets.json", official_quick_presets)
    write_json(output_dir / "local-only-initializers.json", local_only)
    write_json(output_dir / "official-without-local.json", official_without_local)
    (output_dir / "README.md").write_text(
        build_markdown(
            storage_path,
            export_root,
            merged_initializers,
            official_quick_presets,
            local_init_by_id,
            local_only,
            official_without_local,
        ),
        encoding="utf-8",
        newline="\n",
    )

    print(json.dumps(summary, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
