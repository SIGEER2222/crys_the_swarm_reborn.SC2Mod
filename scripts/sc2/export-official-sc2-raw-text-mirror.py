from __future__ import annotations

import argparse
import json
import shutil
import subprocess
from collections import Counter, defaultdict
from pathlib import Path


DEFAULT_OUTPUT_DIR = Path("游戏数据/官方SC2原始文本镜像")
DEFAULT_EXTENSIONS = (
    ".xml",
    ".txt",
    ".galaxy",
    ".sc2locale",
    ".sc2components",
    ".json",
    ".sc2layout",
    ".sc2style",
    ".version",
)


def detect_storage_path() -> Path:
    candidates = [
        Path(r"E:\SC2\SC2new\StarCraft II\SC2Data"),
        Path(r"E:\SC2\StarCraft II\SC2Data"),
        Path(r"C:\Program Files (x86)\StarCraft II\SC2Data"),
    ]
    for candidate in candidates:
        if candidate.exists():
            return candidate.resolve()
    raise FileNotFoundError("No SC2Data CASC storage found in default locations.")


def resolve_casc_cmd(repo_root: Path) -> list[str]:
    exe_path = repo_root / "tools" / "casc" / "CascDump" / "bin" / "Debug" / "net9.0" / "CascDump.exe"
    dll_path = repo_root / "tools" / "casc" / "CascDump" / "bin" / "Debug" / "net9.0" / "CascDump.dll"
    if exe_path.exists():
        return [str(exe_path)]
    if dll_path.exists():
        return ["dotnet", str(dll_path)]
    raise FileNotFoundError("CascDump executable not found. Build tools/casc/CascDump first.")


def iter_casc_rows(casc_cmd: list[str], storage_path: Path):
    process = subprocess.Popen(
        [*casc_cmd, "list", str(storage_path), "1000000"],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
        encoding="utf-8",
        errors="replace",
    )

    assert process.stdout is not None
    for line in process.stdout:
        line = line.rstrip("\r\n")
        if not line:
            continue
        parts = line.split("\t")
        if len(parts) < 2:
            continue
        file_name = parts[0].strip()
        try:
            file_size = int(parts[1].strip())
        except ValueError:
            continue
        yield file_name, file_size

    stderr_output = ""
    if process.stderr is not None:
        stderr_output = process.stderr.read()
    return_code = process.wait()
    if return_code != 0:
        raise RuntimeError(f"CascDump list failed: {stderr_output.strip()}")


def build_text_file_list(casc_cmd: list[str], storage_path: Path, extensions: tuple[str, ...]):
    lowered_exts = tuple(ext.lower() for ext in extensions)
    selected: list[str] = []
    ext_counter: Counter[str] = Counter()
    ext_sizes: defaultdict[str, int] = defaultdict(int)

    for file_name, file_size in iter_casc_rows(casc_cmd, storage_path):
        suffix = Path(file_name).suffix.lower()
        if suffix not in lowered_exts:
            continue
        selected.append(file_name)
        ext_counter[suffix] += 1
        ext_sizes[suffix] += file_size

    return selected, ext_counter, ext_sizes


def write_summary(
    output_root: Path,
    storage_path: Path,
    extensions: tuple[str, ...],
    file_list: list[str],
    ext_counter: Counter[str],
    ext_sizes: dict[str, int],
):
    summary = {
        "storage_path": str(storage_path),
        "output_root": str(output_root),
        "selected_extensions": list(extensions),
        "file_count": len(file_list),
        "total_bytes": sum(ext_sizes.values()),
        "total_mb": round(sum(ext_sizes.values()) / (1024 * 1024), 2),
        "by_extension": [
            {
                "extension": ext,
                "count": ext_counter[ext],
                "bytes": ext_sizes[ext],
                "mb": round(ext_sizes[ext] / (1024 * 1024), 2),
            }
            for ext in sorted(ext_counter.keys(), key=lambda item: (-ext_counter[item], item))
        ],
    }
    (output_root / "export-summary.json").write_text(
        json.dumps(summary, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )


def extract_files(casc_cmd: list[str], storage_path: Path, output_root: Path, file_list_path: Path):
    extract_run = subprocess.run(
        [*casc_cmd, "extract", str(storage_path), str(output_root), str(file_list_path)],
        text=True,
        encoding="utf-8",
        errors="replace",
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        check=False,
    )
    if extract_run.returncode != 0:
        raise RuntimeError(
            "CascDump extract failed:\n"
            + extract_run.stderr[-4000:]
        )


def main() -> None:
    parser = argparse.ArgumentParser(description="Export a raw text-only mirror from official SC2Data while preserving CASC path structure.")
    parser.add_argument("--repo-root", default=".", help="Repository root")
    parser.add_argument("--storage-path", default="", help="SC2Data CASC storage root")
    parser.add_argument("--output-dir", default=str(DEFAULT_OUTPUT_DIR), help="Output directory")
    parser.add_argument("--clean-output", action="store_true", help="Remove output directory before export")
    parser.add_argument(
        "--extensions",
        nargs="*",
        default=list(DEFAULT_EXTENSIONS),
        help="File extensions to export, e.g. .xml .txt .galaxy",
    )
    args = parser.parse_args()

    repo_root = Path(args.repo_root).resolve()
    storage_path = Path(args.storage_path).resolve() if args.storage_path else detect_storage_path()
    output_root = (repo_root / args.output_dir).resolve()
    extensions = tuple(ext if ext.startswith(".") else f".{ext}" for ext in args.extensions)

    casc_cmd = resolve_casc_cmd(repo_root)

    if args.clean_output and output_root.exists():
        shutil.rmtree(output_root)
    output_root.mkdir(parents=True, exist_ok=True)

    file_list, ext_counter, ext_sizes = build_text_file_list(casc_cmd, storage_path, extensions)
    if not file_list:
        raise RuntimeError(f"No files matched extensions {extensions} in {storage_path}")

    file_list_path = output_root / "casc-export-file-list.txt"
    file_list_path.write_text("\n".join(file_list) + "\n", encoding="utf-8")

    extract_files(casc_cmd, storage_path, output_root, file_list_path)
    write_summary(output_root, storage_path, extensions, file_list, ext_counter, ext_sizes)

    print(f"Output: {output_root}")
    print(f"Files: {len(file_list)}")
    print(f"Total MB: {round(sum(ext_sizes.values()) / (1024 * 1024), 2)}")
    for ext in sorted(ext_counter.keys(), key=lambda item: (-ext_counter[item], item)):
        print(
            f"{ext}: count={ext_counter[ext]}, mb={round(ext_sizes[ext] / (1024 * 1024), 2)}"
        )


if __name__ == "__main__":
    main()
