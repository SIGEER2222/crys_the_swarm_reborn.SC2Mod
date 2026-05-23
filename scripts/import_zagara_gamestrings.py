
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import os

def main():
    # Hardcoded paths
    game_strings_source = r"C:\Users\22448\Downloads\重生虫心0.71汉化版（新）\reborn_workrepo\references\official-casc-export\mods\starcoop\starcoop.sc2mod\zhcn.sc2data\localizeddata\gamestrings.txt"
    game_strings_target = r"C:\Users\22448\Downloads\重生虫心0.71汉化版（新）\reborn_workrepo\合作指挥官版起义狂潮\Mods\XM\XMZagara.SC2Mod\zhCN.SC2Data\LocalizedData\GameStrings.txt"
    summary_path = r"C:\Users\22448\Downloads\重生虫心0.71汉化版（新）\reborn_workrepo\references\official-zagara-import-summary.tsv"
    
    print("Reading import summary...")
    object_ids = set()
    with open(summary_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        for line in lines[1:]:  # Skip header
            parts = line.strip().split('\t')
            if parts and parts[0]:
                object_ids.add(parts[0])
    
    print(f"Collected {len(object_ids)} unique ObjectIds")
    
    # Define patterns for Zagara-related content
    zag_patterns = [
        "Zagara",
        "Baneling", 
        "Scourge", 
        "SwarmHost",
        "Locust",
        "Corruptor",
        "BroodLord",
        "Hydralisk",
        "Viper",
        "Infestor",
        "Roach",
        "Ravager",
        "Lurker",
        "Overseer",
        "Overlord",
        "Mutalisk",
        "Guardian",
        "Devourer",
        "CreepTumor",
        "InfestedTerran"
    ]
    
    print("Reading game strings...")
    selected_lines = []
    with open(game_strings_source, 'r', encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if not line or ('=' in line and line.split('=')[0].isdigit()):
                continue
            
            key = ""
            if '=' in line:
                key = line.split('=')[0]
            
            is_related = False
            
            # Check ObjectId pattern in the key
            for obj_id in object_ids:
                if obj_id in key:
                    is_related = True
                    break
            
            # Check Zagara-related patterns
            if not is_related:
                for pattern in zag_patterns:
                    if pattern in key:
                        is_related = True
                        break
            
            if is_related:
                selected_lines.append(line)
    
    print(f"Writing {len(selected_lines)} lines...")
    with open(game_strings_target, 'w', encoding='utf-8') as f:
        for line in selected_lines:
            f.write(line + '\n')
    
    print(f"Done! Successfully imported {len(selected_lines)} Zagara-related game strings.")

if __name__ == "__main__":
    main()
