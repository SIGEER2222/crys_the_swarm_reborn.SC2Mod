#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Create and populate the three new commander modules: XMZagara, XMVorazun, XMZeratul
"""

import os
import shutil
import xml.etree.ElementTree as ET
from pathlib import Path

def main():
    repo_root = Path(__file__).parent
    scenario_root = repo_root / "合作指挥官版起义狂潮"
    mods_dir = scenario_root / "Mods" / "XM"
    
    commanders = [
        ("XMZagara", "Zagara"),
        ("XMVorazun", "Vorazun"),
        ("XMZeratul", "Zeratul"),
    ]
    
    for mod_name, commander_name in commanders:
        create_commander_mod(mods_dir, mod_name, commander_name, repo_root)
    
    update_xmfinal_dependencies(mods_dir)
    
    print("\n✅ All done!")


def create_commander_mod(mods_dir: Path, mod_name: str, commander_name: str, repo_root: Path):
    print(f"\n🔧 Creating {mod_name}...")
    mod_dir = mods_dir / f"{mod_name}.SC2Mod"
    mod_dir.mkdir(parents=True, exist_ok=True)
    
    # 1. Create basic mod files
    create_basic_mod_files(mod_dir)
    
    # 2. Create GameData directory
    gamedata_dir = mod_dir / "Base.SC2Data" / "GameData"
    gamedata_dir.mkdir(parents=True, exist_ok=True)
    
    # 3. Create LocalizedData directory and GameStrings.txt
    localized_dir = mod_dir / "zhCN.SC2Data" / "LocalizedData"
    localized_dir.mkdir(parents=True, exist_ok=True)
    
    # 4. Create empty GameStrings.txt (we can populate it later)
    game_strings = localized_dir / "GameStrings.txt"
    game_strings.touch(exist_ok=True)
    
    print(f"   ✅ Created directory structure for {mod_name}")


def create_basic_mod_files(mod_dir: Path):
    # DocumentInfo
    doc_info = mod_dir / "DocumentInfo"
    with open(doc_info, "w", encoding="utf-8") as f:
        f.write('<?xml version="1.0" encoding="utf-8"?>\n')
        f.write('<DocInfo>\n')
        f.write('    <Dependencies>\n')
        f.write('        <Value>file:Mods\\XM\\XMCore.SC2Mod</Value>\n')
        f.write('    </Dependencies>\n')
        f.write('</DocInfo>\n')
    
    # DocumentHeader
    doc_header = mod_dir / "DocumentHeader"
    with open(doc_header, "w", encoding="utf-8") as f:
        f.write("cdesadag\n")
    
    # GameData.version
    game_data_ver = mod_dir / "GameData.version"
    with open(game_data_ver, "w", encoding="utf-8") as f:
        f.write("cdesadag\n")
    
    # GameText.version
    game_text_ver = mod_dir / "GameText.version"
    with open(game_text_ver, "w", encoding="utf-8") as f:
        f.write("cdestxet\n")
    
    # PreloadAssetDB.txt
    preload = mod_dir / "PreloadAssetDB.txt"
    with open(preload, "w", encoding="utf-8") as f:
        pass
    
    # Triggers.version
    triggers_ver = mod_dir / "Triggers.version"
    with open(triggers_ver, "w", encoding="utf-8") as f:
        pass


def update_xmfinal_dependencies(mods_dir: Path):
    print("\n🔧 Updating XMFinal.SC2Mod DocumentInfo...")
    xmfinal_docinfo = mods_dir / "XMFinal.SC2Mod" / "DocumentInfo"
    
    tree = ET.parse(xmfinal_docinfo)
    root = tree.getroot()
    dependencies = root.find("Dependencies")
    
    existing_deps = set()
    for val in dependencies.findall("Value"):
        existing_deps.add(val.text.strip())
    
    # Add the three new mod dependencies if not already present
    new_deps = [
        "file:Mods\\XM\\XMZagara.SC2Mod",
        "file:Mods\\XM\\XMVorazun.SC2Mod", 
        "file:Mods\\XM\\XMZeratul.SC2Mod",
    ]
    
    for dep in new_deps:
        if dep not in existing_deps:
            elem = ET.Element("Value")
            elem.text = dep
            dependencies.append(elem)
            print(f"   ✅ Added dependency: {dep}")
    
    # Write back
    tree.write(xmfinal_docinfo, encoding="utf-8", xml_declaration=True)
    
    # Fix indentation
    with open(xmfinal_docinfo, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Beautify the XML
    lines = content.splitlines()
    pretty_lines = []
    for line in lines:
        stripped = line.strip()
        if stripped:
            if stripped.startswith("<DocInfo") or stripped.startswith("<?xml"):
                pretty_lines.append(stripped)
            elif stripped.startswith("<Dependencies>") or stripped.startswith("</Dependencies>"):
                pretty_lines.append("    " + stripped)
            elif stripped.startswith("<Value>") or stripped.startswith("</Value>"):
                pretty_lines.append("        " + stripped)
            else:
                pretty_lines.append("    " + stripped)
    
    with open(xmfinal_docinfo, "w", encoding="utf-8") as f:
        for line in pretty_lines:
            f.write(line + "\n")
    
    print("   ✅ XMFinal DocumentInfo updated!")


if __name__ == "__main__":
    main()
