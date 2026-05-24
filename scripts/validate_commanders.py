#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
指挥官单位数据验证脚本
用于验证指挥官模组单位数据与官方数据的一致性
"""

import xml.etree.ElementTree as ET
import os
from collections import defaultdict
import re
from pathlib import Path


def parse_unitdata(xml_path):
    """解析unitdata.xml文件，提取单位属性"""
    units = {}
    try:
        tree = ET.parse(xml_path)
        root = tree.getroot()
        
        for unit in root.findall('.//CUnit'):
            unit_id = unit.get('id')
            if not unit_id:
                continue
                
            unit_data = {'id': unit_id}
            
            # 提取关键属性
            life_start = unit.find('.//LifeStart')
            if life_start is not None:
                unit_data['LifeStart'] = life_start.get('value')
                
            life_max = unit.find('.//LifeMax')
            if life_max is not None:
                unit_data['LifeMax'] = life_max.get('value')
                
            life_armor = unit.find('.//LifeArmor')
            if life_armor is not None:
                unit_data['LifeArmor'] = life_armor.get('value')
                
            shields_start = unit.find('.//ShieldsStart')
            if shields_start is not None:
                unit_data['ShieldsStart'] = shields_start.get('value')
                
            shields_max = unit.find('.//ShieldsMax')
            if shields_max is not None:
                unit_data['ShieldsMax'] = shields_max.get('value')
                
            shield_regen_delay = unit.find('.//ShieldRegenDelay')
            if shield_regen_delay is not None:
                unit_data['ShieldRegenDelay'] = shield_regen_delay.get('value')
                
            speed = unit.find('.//Speed')
            if speed is not None:
                unit_data['Speed'] = speed.get('value')
                
            sight = unit.find('.//Sight')
            if sight is not None:
                unit_data['Sight'] = sight.get('value')
                
            food = unit.find('.//Food')
            if food is not None:
                unit_data['Food'] = food.get('value')
                
            # 提取成本
            cost_minerals = unit.find('.//CostResource[@index="Minerals"]')
            if cost_minerals is not None:
                unit_data['Minerals'] = cost_minerals.get('value')
                
            cost_vespene = unit.find('.//CostResource[@index="Vespene"]')
            if cost_vespene is not None:
                unit_data['Vespene'] = cost_vespene.get('value')
                
            # 提取种族和编辑器分类
            editor_cat = unit.find('.//EditorCategories')
            if editor_cat is not None:
                unit_data['EditorCategories'] = editor_cat.get('value')
                
            race = unit.find('.//Race')
            if race is not None:
                unit_data['Race'] = race.get('value')
                
            # 提取属性
            attributes = []
            for attr in unit.findall('.//Attributes'):
                attr_index = attr.get('index')
                if attr_index and attr.get('value') == '1':
                    attributes.append(attr_index)
            if attributes:
                unit_data['Attributes'] = attributes
                
            units[unit_id] = unit_data
            
    except Exception as e:
        print(f"  错误解析 {xml_path}: {e}")
        
    return units


def compare_units(official_units, mod_units, commander_name):
    """比较官方单位数据"""
    report = []
    differences = []
    
    report.append(f"\n{'='*80}")
    report.append(f"{commander_name} 指挥官单位数据验证")
    report.append(f"{'='*80}")
    
    common_units = set(official_units.keys()) & set(mod_units.keys())
    report.append(f"共找到 {len(common_units)} 个共同单位")
    
    for unit_id in sorted(common_units):
        official = official_units[unit_id]
        mod = mod_units[unit_id]
        
        unit_diff = {
            'unit_id': unit_id,
            'differences': []
        }
        
        # 比较属性差异
        for key in ['LifeStart', 'LifeMax', 'LifeArmor', 'ShieldsStart', 'ShieldsMax', 
                    'Speed', 'Sight', 'Food', 'Minerals', 'Vespene']:
            off_val = official.get(key)
            mod_val = mod.get(key)
            if off_val != mod_val:
                unit_diff['differences'].append({
                    'key': key,
                    'official': off_val,
                    'mod': mod_val
                })
                
        if unit_diff['differences']:
            differences.append(unit_diff)
    
    report.append(f"\n发现 {len(differences)} 个单位有差异")
    
    for diff in differences:
        report.append(f"\n单位: {diff['unit_id']}")
        for item in diff['differences']:
            report.append(f"  {item['key']}: 官方={item['official']}, 模组={item['mod']}")
    
    # 检查只在官方或只在模组中的单位
    only_official = set(official_units.keys()) - set(mod_units.keys())
    only_mod = set(mod_units.keys()) - set(official_units.keys())
    
    if only_official:
        report.append(f"\n仅在官方数据中的单位 ({len(only_official)}:")
        for unit in sorted(only_official):
            report.append(f"  - {unit}")
    
    if only_mod:
        report.append(f"\n仅在模组数据中的单位 ({len(only_mod)}):")
        for unit in sorted(only_mod):
            report.append(f"  - {unit}")
    
    return report


def main():
    base_path = Path(r"c:\Users\22448\Downloads\重生虫心0.71汉化版（新）\reborn_workrepo")
    
    # 官方数据路径
    official_path = base_path / "references" / "official-casc-export" / "mods" / "starcoop" / "starcoop.sc2mod" / "base.sc2data" / "gamedata" / "unitdata.xml"
    
    # 指挥官模组路径
    mods_path = base_path / "合作指挥官版起义狂潮" / "Mods" / "XM"
    
    # 指挥官列表
    commanders = [
        # Protoss
        ('XMVorazun', 'Vorazun'),
        ('XMZeratul', 'Zeratul'),
        ('XMArtanis', 'Artanis'),
        ('XMKarax', 'Karax'),
        ('XMAlarak', 'Alarak'),
        # Terran
        ('XMNova', 'Nova'),
        ('XMSwann', 'Swann'),
        ('XMMengsk', 'Mengsk'),
        ('XMRaynor', 'Raynor'),
    ]
    
    print("读取官方单位数据...")
    official_units = parse_unitdata(official_path)
    print(f"  共读取 {len(official_units)} 个官方单位")
    
    full_report = []
    full_report.append("="*80)
    full_report.append("星际争霸2 合作指挥官单位数据验证报告")
    full_report.append("="*80)
    
    for mod_name, commander_name in commanders:
        print(f"\n验证 {commander_name}...")
        mod_unitdata = mods_path / f"{mod_name}.SC2Mod" / "Base.SC2Data" / "GameData" / "UnitData.xml"
        
        if mod_unitdata.exists():
            mod_units = parse_unitdata(mod_unitdata)
            print(f"  共读取 {len(mod_units)} 个单位")
            
            report = compare_units(official_units, mod_units, commander_name)
            full_report.extend(report)
        else:
            print(f"  警告: {mod_unitdata} 不存在")
            full_report.append(f"\n警告: {commander_name} 模组单位数据文件不存在")
    
    # 保存报告
    report_path = base_path / "docs" / "指挥官" / "Protoss_Terran_验证报告.txt"
    report_path.parent.mkdir(exist_ok=True)
    
    with open(report_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(full_report))
    
    print(f"\n验证报告已保存到: {report_path}")
    print("\n验证完成！")


if __name__ == "__main__":
    main()
