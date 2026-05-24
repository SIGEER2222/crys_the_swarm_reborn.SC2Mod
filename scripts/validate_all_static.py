#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
指挥官静态验证脚本
检查所有指挥官模块的关键文件是否完整
"""

import os
import sys
from pathlib import Path

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

# 指挥官列表
COMMANDERS = [
    "XMAbathur",
    "XMAlarak",
    "XMArtanis",
    "XMDehaka",
    "XMFenix",
    "XMKarax",
    "XMKerrigan",
    "XMMengsk",
    "XMMira",
    "XMNova",
    "XMRaynor",
    "XMStetmann",
    "XMStukov",
    "XMSwann",
    "XMTychus",
    "XMVorazun",
    "XMZagara",
    "XMZeratul",
]

# 核心模块
CORE_MODULES = [
    "XMCore",
    "XMFinal",
]

# 必需的GameData文件
REQUIRED_GAMEDATA = [
    "UnitData.xml",
    "AbilData.xml",
    "ButtonData.xml",
    "BehaviorData.xml",
    "EffectData.xml",
    "WeaponData.xml",
    "ActorData.xml",
]

# 必需的目录
REQUIRED_DIRS = [
    "Base.SC2Data",
    "Base.SC2Data/GameData",
    "zhCN.SC2Data",
    "zhCN.SC2Data/LocalizedData",
]


def check_commander_mod(mod_path: Path, commander_name: str) -> dict:
    """检查单个指挥官模块"""
    result = {
        "name": commander_name,
        "exists": False,
        "dirs_ok": False,
        "gamedata_files": [],
        "gamestrings_ok": False,
        "triggers_ok": False,
        "all_ok": False,
        "missing_files": [],
        "extra_files": [],
    }

    if not mod_path.exists():
        result["missing_files"].append(f"{commander_name} 目录不存在")
        return result

    result["exists"] = True

    # 检查必需目录
    dirs_ok = True
    for req_dir in REQUIRED_DIRS:
        req_path = mod_path / req_dir
        if not req_path.exists():
            result["missing_files"].append(f"缺少目录: {req_dir}")
            dirs_ok = False
    result["dirs_ok"] = dirs_ok

    # 检查GameData文件
    gamedata_ok = True
    gamedata_path = mod_path / "Base.SC2Data" / "GameData"
    if gamedata_path.exists():
        for req_file in REQUIRED_GAMEDATA:
            req_path = gamedata_path / req_file
            if req_path.exists():
                result["gamedata_files"].append(req_file)
            else:
                result["missing_files"].append(f"缺少GameData: {req_file}")
                gamedata_ok = False
    else:
        gamedata_ok = False
        result["missing_files"].append("GameData目录不存在")

    # 检查GameStrings
    gs_path = mod_path / "zhCN.SC2Data" / "LocalizedData" / "GameStrings.txt"
    if gs_path.exists():
        result["gamestrings_ok"] = True
    else:
        result["missing_files"].append("缺少: GameStrings.txt")

    # 检查触发器文件
    doc_header = mod_path / "DocumentHeader"
    doc_info = mod_path / "DocumentInfo"
    triggers_ver = mod_path / "Triggers.version"
    if doc_header.exists() and doc_info.exists() and triggers_ver.exists():
        result["triggers_ok"] = True

    result["all_ok"] = (result["exists"] and 
                      result["dirs_ok"] and 
                      len(result["missing_files"]) == 0 and
                      result["gamestrings_ok"])

    return result


def main():
    print("=" * 80)
    print("重生虫心 - 指挥官静态验证")
    print("=" * 80)
    print()

    base_path = Path(__file__).parent.parent
    mods_dir = base_path / "合作指挥官版起义狂潮" / "Mods" / "XM"

    print(f"检查目录: {mods_dir}")
    print()

    results = []

    # 检查核心模块
    print("-" * 80)
    print("核心模块:")
    print("-" * 80)
    for core_mod in CORE_MODULES:
        mod_path = mods_dir / f"{core_mod}.SC2Mod"
        result = check_commander_mod(mod_path, core_mod)
        results.append(result)
        status = "✅ 完整" if result["all_ok"] else "⚠️ 有问题"
        print(f"  {core_mod:<15}: {status}")
        if result["missing_files"]:
            missing_str = "\n    ".join(result["missing_files"])
            print(f"    缺少: {missing_str}")

    print()
    print("-" * 80)
    print("指挥官模块:")
    print("-" * 80)

    for commander in COMMANDERS:
        mod_path = mods_dir / f"{commander}.SC2Mod"
        result = check_commander_mod(mod_path, commander)
        results.append(result)
        status = "✅ 完整" if result["all_ok"] else "⚠️ 有问题"
        print(f"  {commander:<15}: {status}")
        if result["missing_files"]:
            missing_str = "\n    ".join(result["missing_files"])
            print(f"    缺少: {missing_str}")

    print()
    print("-" * 80)
    print("总结:")
    print("-" * 80)

    ok_count = sum(1 for r in results if r["all_ok"])
    total_count = len(results)
    print(f"完整模块: {ok_count}/{total_count}")

    if ok_count == total_count:
        print("✅ 所有模块静态验证通过!")
        return 0
    else:
        print("⚠️ 有模块存在问题!")
        return 1


if __name__ == "__main__":
    sys.exit(main())
