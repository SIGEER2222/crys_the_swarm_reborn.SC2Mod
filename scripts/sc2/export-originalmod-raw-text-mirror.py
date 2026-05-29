from __future__ import annotations

import argparse
import json
import shutil
from collections import Counter, defaultdict
from pathlib import Path


DEFAULT_SOURCE_DIR = Path("原始mod/Mods/XM")
DEFAULT_OUTPUT_DIR = Path("游戏数据/原始mod原始文本镜像")
DEFAULT_EXTENSIONS = (
    ".xml",
    ".txt",
    ".galaxy",
    ".sc2locale",
    ".sc2components",
    ".json",
    ".sc2layout",
    ".sc2style",
    ".sc2cutscene",
    ".version",
)
TEXT_FILE_NAMES = {
    "documentinfo",
}
SKIPPED_FILE_NAMES = {
    "documentheader",
}


def normalize_extensions(values: list[str]) -> tuple[str, ...]:
    normalized = []
    for value in values:
        ext = value if value.startswith(".") else f".{value}"
        normalized.append(ext.lower())
    return tuple(normalized)


def iter_source_files(source_root: Path):
    for path in sorted(source_root.rglob("*")):
        if path.is_file():
            yield path


def should_copy(file_path: Path, extensions: tuple[str, ...]) -> bool:
    if file_path.name.lower() in TEXT_FILE_NAMES:
        return True
    return file_path.suffix.lower() in extensions


def lowered_relative_path(source_root: Path, file_path: Path) -> Path:
    parts = [part.lower() for part in file_path.relative_to(source_root).parts]
    return Path("mods", "xm", *parts)


def module_name_from_relative(relative_path: Path) -> str:
    parts = relative_path.parts
    if len(parts) >= 3:
        return parts[2]
    return "(unknown)"


def build_summary(
    source_root: Path,
    output_root: Path,
    extensions: tuple[str, ...],
    copied_rows: list[dict],
    skipped_rows: list[dict],
) -> dict:
    ext_counter: Counter[str] = Counter()
    ext_sizes: defaultdict[str, int] = defaultdict(int)
    module_counter: Counter[str] = Counter()
    module_sizes: defaultdict[str, int] = defaultdict(int)

    for row in copied_rows:
        ext = row["extension"]
        ext_counter[ext] += 1
        ext_sizes[ext] += row["bytes"]
        module_counter[row["module"]] += 1
        module_sizes[row["module"]] += row["bytes"]

    total_bytes = sum(row["bytes"] for row in copied_rows)
    summary = {
        "source_root": str(source_root),
        "output_root": str(output_root),
        "selected_extensions": list(extensions),
        "included_extensionless_names": sorted(TEXT_FILE_NAMES),
        "skipped_binary_names": sorted(SKIPPED_FILE_NAMES),
        "file_count": len(copied_rows),
        "skipped_count": len(skipped_rows),
        "total_bytes": total_bytes,
        "total_mb": round(total_bytes / (1024 * 1024), 2),
        "by_extension": [
            {
                "extension": ext,
                "count": ext_counter[ext],
                "bytes": ext_sizes[ext],
                "mb": round(ext_sizes[ext] / (1024 * 1024), 2),
            }
            for ext in sorted(ext_counter.keys(), key=lambda item: (-ext_counter[item], item))
        ],
        "by_module": [
            {
                "module": module,
                "count": module_counter[module],
                "bytes": module_sizes[module],
                "mb": round(module_sizes[module] / (1024 * 1024), 2),
            }
            for module in sorted(module_counter.keys(), key=lambda item: (-module_counter[item], item))
        ],
    }
    return summary


def write_support_files(output_root: Path, copied_rows: list[dict], skipped_rows: list[dict], summary: dict) -> None:
    (output_root / "mirror-file-list.txt").write_text(
        "\n".join(row["mirror_path"] for row in copied_rows) + "\n",
        encoding="utf-8",
    )
    (output_root / "source-file-list.txt").write_text(
        "\n".join(row["source_path"] for row in copied_rows) + "\n",
        encoding="utf-8",
    )
    (output_root / "skipped-binary-files.txt").write_text(
        "".join(f"{row['reason']}\t{row['source_path']}\n" for row in skipped_rows),
        encoding="utf-8",
    )
    (output_root / "export-summary.json").write_text(
        json.dumps(summary, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )


def export_mirror(source_root: Path, output_root: Path, extensions: tuple[str, ...]) -> tuple[list[dict], list[dict]]:
    copied_rows: list[dict] = []
    skipped_rows: list[dict] = []

    for source_file in iter_source_files(source_root):
        lower_name = source_file.name.lower()
        if lower_name in SKIPPED_FILE_NAMES:
            skipped_rows.append(
                {
                    "source_path": str(source_file),
                    "reason": "skipped_known_binary",
                }
            )
            continue
        if not should_copy(source_file, extensions):
            continue

        mirror_relative = lowered_relative_path(source_root, source_file)
        target_file = output_root / mirror_relative
        target_file.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source_file, target_file)

        stat = source_file.stat()
        copied_rows.append(
            {
                "source_path": str(source_file),
                "mirror_path": str(mirror_relative).replace("\\", "/"),
                "module": module_name_from_relative(mirror_relative),
                "extension": source_file.suffix.lower() if source_file.suffix else "(no extension)",
                "bytes": stat.st_size,
            }
        )

    return copied_rows, skipped_rows


def main() -> None:
    parser = argparse.ArgumentParser(description="Export a raw text-only mirror from 原始mod/Mods/XM while preserving a mirror-friendly directory structure.")
    parser.add_argument("--repo-root", default=".", help="Repository root")
    parser.add_argument("--source-dir", default=str(DEFAULT_SOURCE_DIR), help="Source XM mods root")
    parser.add_argument("--output-dir", default=str(DEFAULT_OUTPUT_DIR), help="Output mirror directory")
    parser.add_argument("--clean-output", action="store_true", help="Remove output directory before export")
    parser.add_argument(
        "--extensions",
        nargs="*",
        default=list(DEFAULT_EXTENSIONS),
        help="File extensions to export, e.g. .xml .txt .galaxy",
    )
    args = parser.parse_args()

    repo_root = Path(args.repo_root).resolve()
    source_root = (repo_root / args.source_dir).resolve()
    output_root = (repo_root / args.output_dir).resolve()
    extensions = normalize_extensions(args.extensions)

    if not source_root.exists():
        raise FileNotFoundError(f"Source directory not found: {source_root}")

    if args.clean_output and output_root.exists():
        shutil.rmtree(output_root)
    output_root.mkdir(parents=True, exist_ok=True)

    copied_rows, skipped_rows = export_mirror(source_root, output_root, extensions)
    if not copied_rows:
        raise RuntimeError(f"No files matched extensions {extensions} in {source_root}")

    summary = build_summary(source_root, output_root, extensions, copied_rows, skipped_rows)
    write_support_files(output_root, copied_rows, skipped_rows, summary)

    print(f"Source: {source_root}")
    print(f"Output: {output_root}")
    print(f"Files: {summary['file_count']}")
    print(f"Skipped binary markers: {summary['skipped_count']}")
    print(f"Total MB: {summary['total_mb']}")
    for item in summary["by_extension"]:
        print(f"{item['extension']}: count={item['count']}, mb={item['mb']}")


if __name__ == "__main__":
    main()
