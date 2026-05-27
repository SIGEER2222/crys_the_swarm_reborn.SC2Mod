from __future__ import annotations

import argparse
import json
import shutil
import subprocess
from collections import defaultdict
from pathlib import Path, PureWindowsPath


DEFAULT_STORAGE_CANDIDATES = [
    Path(r"E:\SC2\SC2new\StarCraft II\SC2Data"),
    Path(r"C:\Program Files (x86)\StarCraft II\SC2Data"),
    Path(r"C:\Program Files\StarCraft II\SC2Data"),
]

PREFERENCE_PREFIXES = [
    "mods\\starcoop\\commanders\\arcturusmengsk.sc2mod\\base.sc2assets\\",
    "mods\\starcoop\\commanders\\egonstetmann.sc2mod\\base.sc2assets\\",
    "mods\\starcoop\\starcoop.sc2mod\\base.sc2assets\\",
    "mods\\core.sc2mod\\base.sc2assets\\",
    "mods\\voidmulti.sc2mod\\base.sc2assets\\",
    "mods\\void.sc2mod\\base.sc2assets\\",
    "mods\\swarmmulti.sc2mod\\base.sc2assets\\",
    "mods\\swarm.sc2mod\\base.sc2assets\\",
    "mods\\libertymulti.sc2mod\\base.sc2assets\\",
    "mods\\liberty.sc2mod\\base.sc2assets\\",
]


def normalize_windows_path(value: str) -> str:
    return str(PureWindowsPath(value.replace("/", "\\")))


def detect_storage_path() -> Path:
    for candidate in DEFAULT_STORAGE_CANDIDATES:
        if candidate.exists():
            return candidate
    raise FileNotFoundError("No SC2Data CASC storage found in default locations.")


def collect_icon_refs(output_dir: Path) -> list[str]:
    refs_by_lower: dict[str, str] = {}
    for path in sorted(output_dir.rglob("*.json")):
        try:
            data = json.loads(path.read_text(encoding="utf-8"))
        except Exception:
            continue
        stack = [data]
        while stack:
            current = stack.pop()
            if isinstance(current, dict):
                for key, value in current.items():
                    if key in {"icon", "alert_icon"} and isinstance(value, str) and value:
                        ref = normalize_windows_path(value)
                        refs_by_lower.setdefault(ref.lower(), ref)
                    else:
                        stack.append(value)
            elif isinstance(current, list):
                stack.extend(current)
    return sorted(refs_by_lower.values())


def casc_dump_command(repo_root: Path) -> list[str]:
    exe_path = repo_root / "tools" / "casc" / "CascDump" / "bin" / "Debug" / "net9.0" / "CascDump.exe"
    dll_path = repo_root / "tools" / "casc" / "CascDump" / "bin" / "Debug" / "net9.0" / "CascDump.dll"
    if exe_path.exists():
        return [str(exe_path)]
    if dll_path.exists():
        return ["dotnet", str(dll_path)]
    raise FileNotFoundError("CascDump executable not found. Build tools/casc/CascDump first.")


def build_match_index(casc_cmd: list[str], storage_path: Path, refs: list[str]) -> dict[str, list[str]]:
    refs_lower = {ref.lower(): ref for ref in refs}
    refs_by_basename: dict[str, list[str]] = defaultdict(list)
    for ref in refs:
        refs_by_basename[PureWindowsPath(ref).name.lower()].append(ref.lower())

    matches: dict[str, list[str]] = {ref: [] for ref in refs}
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

    for raw_line in process.stdout:
        line = raw_line.rstrip("\r\n")
        if not line or "\t" not in line:
            continue
        storage_rel, _, _, _ = line.split("\t", 3)
        storage_rel = normalize_windows_path(storage_rel)
        storage_rel_lower = storage_rel.lower()
        if not storage_rel_lower.endswith(".dds"):
            continue
        basename = PureWindowsPath(storage_rel).name.lower()
        for ref_lower in refs_by_basename.get(basename, []):
            if storage_rel_lower.endswith(ref_lower):
                matches[refs_lower[ref_lower]].append(storage_rel)

    stderr_output = process.stderr.read()
    return_code = process.wait()
    if return_code != 0:
        raise RuntimeError(f"CascDump list failed: {stderr_output.strip()}")
    if stderr_output.strip():
        print(stderr_output.strip())
    for ref, paths in matches.items():
        matches[ref] = sorted(set(paths))
    return matches


def match_priority(storage_rel: str) -> tuple[int, int, str]:
    storage_rel_lower = storage_rel.lower()
    for index, prefix in enumerate(PREFERENCE_PREFIXES):
        if storage_rel_lower.startswith(prefix):
            return (index, len(storage_rel), storage_rel_lower)
    return (len(PREFERENCE_PREFIXES), len(storage_rel), storage_rel_lower)


def choose_storage_paths(matches: dict[str, list[str]]) -> dict[str, str]:
    chosen: dict[str, str] = {}
    for ref, paths in matches.items():
        if not paths:
            continue
        chosen[ref] = sorted(paths, key=match_priority)[0]
    return chosen


def write_lines(path: Path, lines: list[str]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text("\n".join(lines) + ("\n" if lines else ""), encoding="utf-8", newline="\n")


def extract_files(casc_cmd: list[str], storage_path: Path, extract_root: Path, file_list_path: Path) -> None:
    subprocess.run(
        [*casc_cmd, "extract", str(storage_path), str(extract_root), str(file_list_path)],
        check=True,
    )


def copy_short_path_variants(
    extract_root: Path,
    short_root: Path,
    chosen_paths: dict[str, str],
) -> list[dict[str, str]]:
    copied: list[dict[str, str]] = []
    for ref, storage_rel in sorted(chosen_paths.items()):
        source = extract_root / Path(storage_rel.replace("\\", "/"))
        target = short_root / Path(ref.replace("\\", "/"))
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(source, target)
        copied.append(
            {
                "ref": ref,
                "storage_path": storage_rel,
                "short_path": target.as_posix(),
            }
        )
    return copied


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--repo-root", default=".", help="Repository root")
    parser.add_argument("--output-dir", default="游戏数据/官方合作指挥官", help="Official coop data directory")
    parser.add_argument("--storage-path", default="", help="SC2Data CASC storage root")
    parser.add_argument("--asset-dir", default="icon-assets", help="Asset output directory name under output-dir")
    args = parser.parse_args()

    repo_root = Path(args.repo_root).resolve()
    output_dir = (repo_root / args.output_dir).resolve()
    storage_path = Path(args.storage_path).resolve() if args.storage_path else detect_storage_path()
    asset_dir = output_dir / args.asset_dir
    extract_root = asset_dir / "files"
    short_root = asset_dir / "short-path"

    refs = collect_icon_refs(output_dir)
    if not refs:
        raise RuntimeError(f"No icon refs found under {output_dir}")

    casc_cmd = casc_dump_command(repo_root)
    matches = build_match_index(casc_cmd, storage_path, refs)
    chosen_paths = choose_storage_paths(matches)

    refs_path = asset_dir / "icon-references.txt"
    file_list_path = asset_dir / "casc-file-list.txt"
    write_lines(refs_path, refs)
    write_lines(file_list_path, sorted(set(chosen_paths.values())))

    if extract_root.exists():
        shutil.rmtree(extract_root)
    if short_root.exists():
        shutil.rmtree(short_root)
    extract_root.mkdir(parents=True, exist_ok=True)
    short_root.mkdir(parents=True, exist_ok=True)

    if chosen_paths:
        extract_files(casc_cmd, storage_path, extract_root, file_list_path)
    copied = copy_short_path_variants(extract_root, short_root, chosen_paths)

    manifest = {
        "storage_path": str(storage_path),
        "refs_total": len(refs),
        "resolved_refs": len(chosen_paths),
        "missing_refs": sorted(ref for ref in refs if ref not in chosen_paths),
        "ambiguous_refs": {
            ref: sorted(paths)
            for ref, paths in matches.items()
            if len(paths) > 1
        },
        "unique_storage_files": len(set(chosen_paths.values())),
        "refs": [
            {
                "ref": ref,
                "chosen_storage_path": chosen_paths.get(ref, ""),
                "matches": sorted(matches.get(ref, [])),
            }
            for ref in refs
        ],
        "copied_short_paths": copied,
    }
    manifest_path = asset_dir / "manifest.json"
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8", newline="\n")

    print(f"Output: {asset_dir}")
    print(f"refs_total={len(refs)}")
    print(f"resolved_refs={len(chosen_paths)}")
    print(f"missing_refs={len(manifest['missing_refs'])}")
    print(f"ambiguous_refs={len(manifest['ambiguous_refs'])}")
    print(f"unique_storage_files={len(set(chosen_paths.values()))}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
