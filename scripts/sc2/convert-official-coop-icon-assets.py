from __future__ import annotations

import argparse
import json
from pathlib import Path

from PIL import Image


def parse_hex_color(value: str) -> tuple[int, int, int]:
    text = value.strip().lstrip("#")
    if len(text) != 6:
        raise ValueError(f"Expected RRGGBB hex color, got: {value}")
    return (int(text[0:2], 16), int(text[2:4], 16), int(text[4:6], 16))


def convert_rgba_to_jpg(image: Image.Image, background_rgb: tuple[int, int, int]) -> Image.Image:
    rgba = image.convert("RGBA")
    background = Image.new("RGBA", rgba.size, (*background_rgb, 255))
    composited = Image.alpha_composite(background, rgba)
    return composited.convert("RGB")


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--repo-root", default=".", help="Repository root")
    parser.add_argument(
        "--input-dir",
        default="游戏数据/官方合作指挥官/icon-assets/short-path",
        help="DDS icon root directory",
    )
    parser.add_argument(
        "--png-dir",
        default="游戏数据/官方合作指挥官/icon-assets/preview-png",
        help="PNG preview output root",
    )
    parser.add_argument(
        "--jpg-dir",
        default="游戏数据/官方合作指挥官/icon-assets/preview-jpg",
        help="JPG preview output root",
    )
    parser.add_argument("--jpg-background", default="#202020", help="Background color for JPG alpha flattening")
    args = parser.parse_args()

    repo_root = Path(args.repo_root).resolve()
    input_dir = (repo_root / args.input_dir).resolve()
    png_dir = (repo_root / args.png_dir).resolve()
    jpg_dir = (repo_root / args.jpg_dir).resolve()
    background_rgb = parse_hex_color(args.jpg_background)

    png_dir.mkdir(parents=True, exist_ok=True)
    jpg_dir.mkdir(parents=True, exist_ok=True)

    converted = 0
    failures: list[dict[str, str]] = []
    for dds_path in sorted(input_dir.rglob("*.dds")):
        relative = dds_path.relative_to(input_dir)
        png_path = (png_dir / relative).with_suffix(".png")
        jpg_path = (jpg_dir / relative).with_suffix(".jpg")
        png_path.parent.mkdir(parents=True, exist_ok=True)
        jpg_path.parent.mkdir(parents=True, exist_ok=True)
        try:
            with Image.open(dds_path) as image:
                image.load()
                image.save(png_path, format="PNG")
                convert_rgba_to_jpg(image, background_rgb).save(jpg_path, format="JPEG", quality=95)
            converted += 1
        except Exception as exc:
            failures.append(
                {
                    "dds": dds_path.as_posix(),
                    "error": f"{type(exc).__name__}: {exc}",
                }
            )

    manifest = {
        "input_dir": input_dir.as_posix(),
        "png_dir": png_dir.as_posix(),
        "jpg_dir": jpg_dir.as_posix(),
        "jpg_background": args.jpg_background,
        "converted": converted,
        "failed": failures,
    }
    manifest_path = input_dir.parent / "preview-manifest.json"
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8", newline="\n")

    print(f"input_dir={input_dir}")
    print(f"png_dir={png_dir}")
    print(f"jpg_dir={jpg_dir}")
    print(f"converted={converted}")
    print(f"failed={len(failures)}")
    return 0 if not failures else 1


if __name__ == "__main__":
    raise SystemExit(main())
