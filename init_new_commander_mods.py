#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Initialize the structure for the 3 new commander modules (XMZagara, XMVorazun, XMZeratul)
"""

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

    # List of GameData XML files (from XMKarax)
    gamedata_files = [
        "AbilData.xml", "ActorData.xml", "AlertData.xml", "BehaviorData.xml",
        "ButtonData.xml", "CommanderData.xml", "EffectData.xml", "ModelData.xml",
        "MoverData.xml", "RequirementData.xml", "RequirementNodeData.xml",
        "SoundData.xml", "TurretData.xml", "UnitData.xml", "UpgradeData.xml",
        "UserData.xml", "ValidatorData.xml", "WeaponData.xml", "skindata.xml"
    ]

    for mod_name, commander_name in commanders:
        mod_path = mods_dir / f"{mod_name}.SC2Mod"

        print(f"\n=== Initializing {mod_name}.SC2Mod ===")

        # Base.SC2Data/GameData directory
        gamedata_dir = mod_path / "Base.SC2Data" / "GameData"
        gamedata_dir.mkdir(parents=True, exist_ok=True)
        print(f"  Created: {gamedata_dir}")

        # Create empty XML files in GameData
        for xml_file in gamedata_files:
            xml_path = gamedata_dir / xml_file
            # Create minimal valid XML catalog
            if not xml_path.exists():
                with open(xml_path, "w", encoding="utf-8") as f:
                    f.write('<?xml version="1.0" encoding="utf-8"?>\n')
                    f.write("<Catalog>\n</Catalog>\n")
                print(f"  Created: {xml_file}")

        # zhCN.SC2Data/LocalizedData directory
        localized_dir = mod_path / "zhCN.SC2Data" / "LocalizedData"
        localized_dir.mkdir(parents=True, exist_ok=True)
        print(f"  Created: {localized_dir}")

        # Create empty GameStrings.txt
        game_strings = localized_dir / "GameStrings.txt"
        if not game_strings.exists():
            with open(game_strings, "w", encoding="utf-8") as f:
                pass
            print(f"  Created: GameStrings.txt")

        print(f"  {mod_name} folder structure complete!")

    print("\n✅ All 3 new commander module structures are initialized!")


if __name__ == "__main__":
    main()
