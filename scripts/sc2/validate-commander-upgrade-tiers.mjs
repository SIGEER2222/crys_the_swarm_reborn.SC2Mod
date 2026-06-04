#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const repoRoot = process.cwd();
const modsRoot = path.join(repoRoot, '合作指挥官版起义狂潮', 'Mods', 'XM');

const targets = [
  { commander: 'Raynor', module: 'XMRaynor.SC2Mod', units: ['EngineeringBayRaynor', 'ArmoryRaynor'] },
  { commander: 'Kerrigan', module: 'XMKerrigan.SC2Mod', units: ['EvolutionChamberKerrigan', 'SpireKerrigan', 'GreaterSpireKerrigan'] },
  { commander: 'Zagara', module: 'XMZagara.SC2Mod', units: ['EvolutionChamberZagara', 'SpireZagara'] },
  { commander: 'Abathur', module: 'XMAbathur.SC2Mod', units: ['EvolutionChamberAbathur', 'SpireAbathur', 'GreaterSpireAbathur'] },
  { commander: 'Alarak', module: 'XMAlarak.SC2Mod', units: ['ForgeAlarak', 'CyberneticsCoreAlarak'] },
  { commander: 'Artanis', module: 'XMArtanis.SC2Mod', units: ['ForgeArtanis', 'CyberneticsCoreArtanis'] },
  { commander: 'Fenix', module: 'XMFenix.SC2Mod', units: ['ForgeFenix', 'CyberneticsCoreFenix'] },
  { commander: 'Karax', module: 'XMKarax.SC2Mod', units: ['ForgeKarax', 'CyberneticsCoreKarax'] },
  { commander: 'Vorazun', module: 'XMVorazun.SC2Mod', units: ['ForgeVorazun', 'CyberneticsCoreVorazun'] },
  { commander: 'Zeratul', module: 'XMZeratul.SC2Mod', units: ['Forge', 'CyberneticsCore'] },
  { commander: 'Nova', module: 'XMNova.SC2Mod', units: ['EngineeringBayNova', 'ArmoryNova'] },
  { commander: 'Swann', module: 'XMSwann.SC2Mod', units: ['ArmorySwann', 'EngineeringBay'] },
  { commander: 'Stukov', module: 'XMStukov.SC2Mod', units: ['SIEngineeringBay', 'SIArmory'] },
  { commander: 'Tychus', module: 'XMTychus.SC2Mod', units: ['TychusEngineeringBay'] },
  { commander: 'Horner', module: 'XMMira.SC2Mod', units: ['ArmoryMira'] },
  { commander: 'Mengsk', module: 'XMMengsk.SC2Mod', units: ['EngineeringBayMengsk'] },
  { commander: 'Dehaka', module: 'XMDehaka.SC2Mod', units: ['DehakaHatchery'] },
  { commander: 'Stetmann', module: 'XMStetmann.SC2Mod', units: ['EvolutionChamberStetmann', 'SpireStetmann', 'GreaterSpireStetmann'] },
];

function readCatalog(module, fileName) {
  const filePath = path.join(modsRoot, module, 'Base.SC2Data', 'GameData', fileName);
  if (!fs.existsSync(filePath)) {
    return '';
  }
  return fs.readFileSync(filePath, 'utf8');
}

function attrs(text) {
  const result = {};
  for (const match of text.matchAll(/\s([A-Za-z_][\w:.-]*)="([^"]*)"/g)) {
    result[match[1]] = match[2];
  }
  return result;
}

function childValue(block, tag, attr = 'value') {
  const pattern = new RegExp(`<${tag}\\b([^>]*)\\/?>`, 'i');
  const match = block.match(pattern);
  if (!match) {
    return undefined;
  }
  return attrs(match[1])[attr];
}

function blocks(xml, tagName) {
  const result = [];
  const pattern = new RegExp(`<${tagName}\\b([^>]*)\\/>|<${tagName}\\b([^>]*)>([\\s\\S]*?)<\\/${tagName}>`, 'g');
  for (const match of xml.matchAll(pattern)) {
    result.push({ attrs: attrs(match[1] ?? match[2] ?? ''), body: match[3] ?? '' });
  }
  return result;
}

function mapById(xml, tagName) {
  const result = new Map();
  for (const block of blocks(xml, tagName)) {
    if (block.attrs.id) {
      result.set(block.attrs.id, block);
    }
  }
  return result;
}

function layoutState(unitBlock) {
  const buttons = [];
  let clearsInherited = false;
  for (const card of blocks(unitBlock.body, 'CardLayouts')) {
    if (card.attrs.removed === '1') {
      clearsInherited = true;
      buttons.length = 0;
      continue;
    }
    for (const button of blocks(card.body, 'LayoutButtons')) {
      if (button.attrs.removed === '1') {
        continue;
      }
      buttons.push({
        face: button.attrs.Face ?? childValue(button.body, 'Face'),
        type: button.attrs.Type ?? childValue(button.body, 'Type'),
        abilCmd: button.attrs.AbilCmd ?? childValue(button.body, 'AbilCmd'),
        requirements: button.attrs.Requirements ?? childValue(button.body, 'Requirements'),
      });
    }
  }
  return { buttons, clearsInherited };
}

function resolvedButtons(unitMap, unitId, seen = new Set()) {
  if (seen.has(unitId)) {
    return [];
  }
  seen.add(unitId);

  const unit = unitMap.get(unitId);
  if (!unit) {
    return [];
  }

  const inherited = unit.attrs.parent ? resolvedButtons(unitMap, unit.attrs.parent, seen) : [];
  const own = layoutState(unit);
  if (own.clearsInherited) {
    return own.buttons;
  }
  return own.buttons.length > 0 ? [...inherited, ...own.buttons] : inherited;
}

function researchInfo(abilMap, abilId, index) {
  const abil = abilMap.get(abilId);
  if (!abil) {
    return undefined;
  }
  for (const info of blocks(abil.body, 'InfoArray')) {
    if (info.attrs.index !== index) {
      continue;
    }
    const button = blocks(info.body, 'Button')[0];
    return {
      upgrade: info.attrs.Upgrade,
      face: button?.attrs.DefaultButtonFace,
      requirement: button?.attrs.Requirements,
    };
  }
  return undefined;
}

function isUpgradeSeries(value) {
  return Boolean(value
    && !/BuildingArmor/i.test(value)
    && /(Weapon|Weapons|Armor|Armors|Attack|Attacks|Carapace|Plating|Shield|Shields|Melee|Missile|Flyer|Ground|VehicleAndShip|Infantry|Primal).*?(?:Level|Lv)\d|(?:Level|Lv)\d.*?(Weapon|Weapons|Armor|Armors|Attack|Attacks|Carapace|Plating|Shield|Shields|Melee|Missile|Flyer|Ground|VehicleAndShip|Infantry|Primal)/i.test(value));
}

function levelOf(value) {
  const match = value?.match(/(?:Level|Lv)(\d+)/i);
  return match ? Number(match[1]) : undefined;
}

function seriesOf(value) {
  return value
    ?.replace(/(?:Level|Lv)\d+(?:Nova|Swann|Mira|Mengsk|Stukov|Raynor|Pr)?/i, 'Level#')
    .replace(/(Armor|Weapons|Plating)Level#(Nova|Swann|Mira|Mengsk|Stukov|Raynor|Pr)/i, '$1Level#');
}

function commandParts(abilCmd) {
  const match = abilCmd?.match(/^([^,]+),([^,]+)$/);
  if (!match) {
    return undefined;
  }
  return { abil: match[1], index: match[2] };
}

const commanderResults = [];

for (const target of targets) {
  const unitXml = readCatalog(target.module, 'UnitData.xml');
  const abilXml = readCatalog(target.module, 'AbilData.xml');
  const upgradeXml = readCatalog(target.module, 'UpgradeData.xml') || readCatalog(target.module, 'upgradedata.xml');

  const unitMap = mapById(unitXml, 'CUnit');
  const abilMap = mapById(abilXml, 'CAbilResearch');
  const upgradeMap = mapById(upgradeXml, 'CUpgrade');
  const series = new Map();

  for (const unitId of target.units) {
    for (const button of resolvedButtons(unitMap, unitId)) {
      const command = commandParts(button.abilCmd);
      if (!command) {
        continue;
      }

      const info = researchInfo(abilMap, command.abil, command.index);
      const candidates = [info?.upgrade, info?.face, button.face].filter(Boolean);
      const visible = candidates.find(isUpgradeSeries);
      if (!visible) {
        continue;
      }

      const level = levelOf(visible);
      const key = seriesOf(visible);
      if (!level || !key) {
        continue;
      }

      if (!series.has(key)) {
        series.set(key, []);
      }
      series.get(key).push({
        level,
        unit: unitId,
        face: button.face,
        abil: command.abil,
        index: command.index,
        upgrade: info?.upgrade,
        defaultFace: info?.face,
        requirement: info?.requirement,
        upgradeDefined: info?.upgrade ? upgradeMap.has(info.upgrade) : undefined,
      });

    }
  }

  const issues = [];
  for (const [key, rows] of series) {
    const levels = [...new Set(rows.map((row) => row.level))].sort((a, b) => a - b);
    const missing = [1, 2, 3, 4, 5].filter((level) => !levels.includes(level));
    if (missing.length > 0) {
      issues.push({ key, levels, missing, rows });
    }
  }

  commanderResults.push({
    commander: target.commander,
    module: target.module,
    issues,
    seriesCount: series.size,
  });
}

let issueCount = 0;
for (const result of commanderResults) {
  if (result.issues.length === 0) {
    console.log(`[PASS] ${result.commander}: upgrade_series=${result.seriesCount}`);
    continue;
  }

  console.log(`[FAIL] ${result.commander}: upgrade_series=${result.seriesCount}`);
  for (const issue of result.issues) {
    issueCount += 1;
    console.log(`  - ${issue.key}: levels=${issue.levels.join(',') || '-'} missing=${issue.missing.join(',') || '-'}`);
    for (const row of issue.rows.sort((a, b) => a.level - b.level)) {
      const upgradeState = row.upgrade ? ` upgrade=${row.upgrade}` : '';
      console.log(`    ${row.unit}: ${row.abil},${row.index} face=${row.face ?? '-'}${upgradeState}`);
    }
  }
}

if (issueCount > 0) {
  process.exitCode = 1;
}
