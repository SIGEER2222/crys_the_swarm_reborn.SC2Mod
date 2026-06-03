import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

const targetRoot = path.join(
  repoRoot,
  '合作指挥官版起义狂潮',
  'Mods',
  'XM',
  'XMAbathurReborn.SC2Mod',
  'Base.SC2Data',
  'GameData',
);
const sourceRoot = path.join(repoRoot, 'crys_the_swarm_reborn.SC2Mod', 'Base.SC2Data', 'GameData');

const files = {
  user: path.join(targetRoot, 'UserData.xml'),
  targetUnit: path.join(targetRoot, 'UnitData.xml'),
  targetAbil: path.join(targetRoot, 'AbilData.xml'),
  targetEffect: path.join(targetRoot, 'EffectData.xml'),
  doc: path.join(repoRoot, 'docs', 'newdocs', '额外指挥官', '03-重生阿巴瑟-兵种融入设计.md'),
  sourceUnit: path.join(sourceRoot, 'UnitData.xml'),
};

const expectedLineages = [
  {
    id: 'Zergling',
    lineage: 'Zergling',
    bankKey: 'Evolutions/Zergling',
    baseUnit: 'Zergling',
    techStructure: 'SpawningPool',
    candidates: [
      ['Raptorling', 'HotSRaptor', 'ready'],
      ['Swarmling', 'HotSSwarmling', 'ready'],
      ['Pygalisk', 'Pygalisk', 'planned'],
      ['Toxic', 'ZerglingToxic', 'planned'],
    ],
  },
  {
    id: 'Baneling',
    lineage: 'Baneling',
    bankKey: 'Evolutions/Baneling',
    baseUnit: 'Baneling',
    techStructure: 'BanelingNest',
    candidates: [
      ['Hunter', 'HotSHunter', 'ready'],
      ['Splitter', 'HotSSplitterlingBig', 'ready'],
      ['Frost Fiend', 'FrostFiend', 'planned'],
      ['Bile Titan', 'BileTitan', 'planned'],
    ],
  },
  {
    id: 'Roach',
    lineage: 'Roach',
    bankKey: 'Evolutions/Roach',
    baseUnit: 'Roach',
    techStructure: 'RoachWarren',
    candidates: [
      ['Vile', 'RoachVile', 'ready'],
      ['Corpser', 'RoachCorpser', 'ready'],
      ['Igniter', 'Igniter', 'planned'],
      ['Ravager', 'Ravager', 'ready'],
    ],
  },
  {
    id: 'Hydralisk',
    lineage: 'Hydralisk',
    bankKey: 'Evolutions/Hydralisk',
    baseUnit: 'Hydralisk',
    techStructure: 'HydraliskDen',
    candidates: [
      ['Lurker', 'HydraliskLurker', 'ready'],
      ['Impaler', 'HydraliskImpaler', 'ready'],
      ['Hunter-Killer', 'HunterKiller', 'ready'],
      ['Toxic', 'Hydralisk2', 'planned'],
    ],
  },
  {
    id: 'Mutalisk',
    lineage: 'Mutalisk',
    bankKey: 'Evolutions/Mutalisk',
    baseUnit: 'Mutalisk',
    techStructure: 'Spire',
    candidates: [
      ['Char', 'MutaliskChar', 'planned'],
      ['Mamba', 'Mamba', 'planned'],
      ['Ankylos', 'MutaliskAnkylos', 'planned'],
      ['Mesmer', 'Mesmer', 'planned'],
    ],
  },
  {
    id: 'SwarmHost',
    lineage: 'SwarmHost',
    bankKey: 'Evolutions/Swarm Host',
    baseUnit: 'SwarmHost',
    techStructure: 'InfestationPit',
    candidates: [
      ['Carrion', 'SwarmHostSplitA', 'ready'],
      ['Creeper', 'SwarmHostSplitB', 'ready'],
      ['Bane', 'BaneHost', 'planned'],
      ['Vespid', 'VespidHost', 'planned'],
    ],
  },
  {
    id: 'Ultralisk',
    lineage: 'Ultralisk',
    bankKey: 'Evolutions/Ultralisk',
    baseUnit: 'Ultralisk',
    techStructure: 'UltraliskCavern',
    candidates: [
      ['Torrasque', 'HotSTorrasque', 'ready'],
      ['Noxious', 'HotSNoxious', 'planned'],
      ['Savage', 'UltraliskSavage', 'planned'],
      ['Indra', 'UltraliskKaldir', 'planned'],
    ],
  },
  {
    id: 'MonstrousFlier',
    lineage: 'Monstrous Flier',
    bankKey: 'Evolutions/Monstrous Flier',
    baseUnit: 'BroodLord',
    techStructure: 'GreaterSpire',
    candidates: [
      ['Brood Lord', 'BroodLord', 'ready'],
      ['Guardian', 'IzshaGuardian', 'planned'],
      ['Devourer', 'Devourer', 'ready'],
      ['Kraken', 'Kraken', 'planned'],
    ],
  },
  {
    id: 'Caster',
    lineage: 'Caster',
    bankKey: 'Evolutions/Caster',
    baseUnit: 'Infestor',
    techStructure: 'InfestationPit',
    candidates: [
      ['Infestor', 'Infestor', 'ready'],
      ['Viper', 'Viper', 'ready'],
      ['Defiler', 'DefilerMP', 'ready'],
    ],
  },
];

const forbiddenPositiveUnits = new Set(['NydusNetwork', 'Naktul', 'Leviathan']);
const expectedStatuses = new Set(['ready', 'planned']);
const requiredRavagerEffects = [
  'RavagerCorrosiveBileAoeCP',
  'RavagerCorrosiveBileAoeDamage',
  'RavagerCorrosiveBileAoeLaunchSet',
  'RavagerCorrosiveBileAoeSearch',
  'RavagerCorrosiveBileAoeWarningDummySearch',
];

const errors = [];
const warnings = [];

const userText = readRequired(files.user);
const targetUnitText = readRequired(files.targetUnit);
const targetAbilText = readRequired(files.targetAbil);
const targetEffectText = readRequired(files.targetEffect);
const sourceUnitText = readRequired(files.sourceUnit);
const docText = readOptional(files.doc);

const targetUnits = collectCatalogIds(targetUnitText, /<CUnit\s+id="([^"]+)"/g);
const sourceUnits = collectCatalogIds(sourceUnitText, /<CUnit\s+id="([^"]+)"/g);
const targetAbilities = collectCatalogIds(targetAbilText, /<CAbil[A-Za-z]*\s+id="([^"]+)"/g);
const targetEffects = collectCatalogIds(targetEffectText, /<CEffect[A-Za-z]*\s+id="([^"]+)"/g);

const profile = parseUserProfile(userText, 'AbathurRebornLineageProfile');
validateProfile(profile);
validateNoAllLarvaPool();
validateRavagerClosure(profile);
validateDocSurface();
printSummary(profile);

if (errors.length > 0) {
  console.error('FAIL: 重生阿巴瑟族系配置校验失败');
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  if (warnings.length > 0) {
    console.error('Warnings:');
    for (const warning of warnings) {
      console.error(`- ${warning}`);
    }
  }
  process.exit(1);
}

console.log('PASS: 重生阿巴瑟族系配置校验通过');
if (warnings.length > 0) {
  console.log('Warnings:');
  for (const warning of warnings) {
    console.log(`- ${warning}`);
  }
}

function validateProfile(instances) {
  const expectedIds = new Set(expectedLineages.map((lineage) => lineage.id));
  const actualIds = new Set(instances.keys());

  for (const id of expectedIds) {
    if (!actualIds.has(id)) {
      errors.push(`缺少族系实例: ${id}`);
    }
  }
  for (const id of actualIds) {
    if (!expectedIds.has(id)) {
      errors.push(`发现未登记族系实例: ${id}`);
    }
  }

  for (const expected of expectedLineages) {
    const actual = instances.get(expected.id);
    if (!actual) {
      continue;
    }

    expectScalar(actual, 'Lineage', expected.lineage, expected.id);
    expectScalar(actual, 'BankKey', expected.bankKey, expected.id);
    expectScalar(actual, 'BaseUnit', expected.baseUnit, expected.id);
    expectScalar(actual, 'TrainUnit', expected.baseUnit, expected.id);
    expectScalar(actual, 'ProductionMode', 'BaseOnly', expected.id);
    expectScalar(actual, 'DefaultSelection', 'Base', expected.id);
    expectScalar(actual, 'TechStructure', expected.techStructure, expected.id);

    if (!targetUnits.has(expected.baseUnit)) {
      errors.push(`${expected.id}: BaseUnit ${expected.baseUnit} 不在当前 XMAbathurReborn UnitData 中`);
    }

    const selections = indexedValues(actual, 'Selection');
    const candidateUnits = indexedValues(actual, 'CandidateUnit');
    const candidateStatuses = indexedValues(actual, 'CandidateStatus');

    if (selections.length !== expected.candidates.length) {
      errors.push(`${expected.id}: Selection 数量 ${selections.length} 与期望 ${expected.candidates.length} 不一致`);
    }
    if (candidateUnits.length !== expected.candidates.length) {
      errors.push(`${expected.id}: CandidateUnit 数量 ${candidateUnits.length} 与期望 ${expected.candidates.length} 不一致`);
    }
    if (candidateStatuses.length !== expected.candidates.length) {
      errors.push(`${expected.id}: CandidateStatus 数量 ${candidateStatuses.length} 与期望 ${expected.candidates.length} 不一致`);
    }

    expected.candidates.forEach(([selection, unitId, status], index) => {
      expectIndexed(actual, 'Selection', index, selection, expected.id);
      expectIndexed(actual, 'CandidateUnit', index, unitId, expected.id);
      expectIndexed(actual, 'CandidateStatus', index, status, expected.id);

      if (forbiddenPositiveUnits.has(unitId)) {
        errors.push(`${expected.id}: 禁止把 ${unitId} 放入正向候选`);
      }
      if (!expectedStatuses.has(valueAt(actual, 'CandidateStatus', index))) {
        errors.push(`${expected.id}: CandidateStatus[${index}] 只能是 ready/planned`);
      }
      if (status === 'ready' && !targetUnits.has(unitId)) {
        errors.push(`${expected.id}: ready 候选 ${unitId} 不在当前 XMAbathurReborn UnitData 中`);
      }
      if (status === 'planned' && !sourceUnits.has(unitId) && !targetUnits.has(unitId)) {
        errors.push(`${expected.id}: planned 候选 ${unitId} 在源 Mod 和当前模块中都未找到`);
      }
    });
  }
}

function validateNoAllLarvaPool() {
  if (/<CAbilTrain\s+id="LarvaTrainSwarm2"/.test(targetAbilText)) {
    errors.push('当前 XMAbathurReborn 不应直接引入 LarvaTrainSwarm2 全量候选池');
  }
}

function validateRavagerClosure(instances) {
  const roach = instances.get('Roach');
  if (!roach) {
    return;
  }

  const requiredAbilities = new Set(indexedValues(roach, 'RequiredAbility'));
  const requiredEffects = new Set(indexedValues(roach, 'RequiredEffect'));
  const forbiddenUnits = new Set(indexedValues(roach, 'ForbiddenUnit'));
  const forbiddenAbilities = new Set(indexedValues(roach, 'ForbiddenAbility'));

  if (!requiredAbilities.has('RavagerCorrosiveBile')) {
    errors.push('Roach/Ravager 分支必须声明 RequiredAbility=RavagerCorrosiveBile');
  }
  if (!requiredEffects.has('RavagerCorrosiveBileAoeLaunchSet')) {
    errors.push('Roach/Ravager 分支必须声明 RequiredEffect=RavagerCorrosiveBileAoeLaunchSet');
  }
  if (!forbiddenUnits.has('RavagerAbathur')) {
    errors.push('Roach/Ravager 分支必须显式排除 ForbiddenUnit=RavagerAbathur');
  }
  if (!forbiddenAbilities.has('RavagerAbathurCorrosiveBile')) {
    errors.push('Roach/Ravager 分支必须显式排除 ForbiddenAbility=RavagerAbathurCorrosiveBile');
  }

  if (!targetAbilities.has('RavagerCorrosiveBile')) {
    errors.push('当前 AbilData 缺少 RavagerCorrosiveBile');
  }
  for (const effectId of requiredRavagerEffects) {
    if (!targetEffects.has(effectId)) {
      errors.push(`当前 EffectData 缺少破坏者胆汁核心效果: ${effectId}`);
    }
  }

  const ravagerUnitBlock = extractCatalogBlock(targetUnitText, 'CUnit', 'Ravager');
  if (!ravagerUnitBlock) {
    errors.push('当前 UnitData 缺少 CUnit id="Ravager"');
  } else {
    if (!/AbilArray\s+Link="RavagerCorrosiveBile"/.test(ravagerUnitBlock)) {
      errors.push('Ravager 单位卡缺少 AbilArray Link="RavagerCorrosiveBile"');
    }
    if (!/AbilCmd="RavagerCorrosiveBile,Execute"/.test(ravagerUnitBlock)) {
      errors.push('Ravager 单位卡缺少 RavagerCorrosiveBile,Execute 按钮命令');
    }
    if (/RavagerAbathur/.test(ravagerUnitBlock)) {
      errors.push('普通 Ravager 单位卡不应引用 RavagerAbathur*');
    }
  }

  const bileBlock = extractCatalogBlock(targetAbilText, 'CAbilEffectTarget', 'RavagerCorrosiveBile');
  if (!bileBlock) {
    errors.push('当前 AbilData 缺少 CAbilEffectTarget id="RavagerCorrosiveBile"');
  } else {
    if (!/Effect\s+index="0"\s+value="RavagerCorrosiveBileAoeLaunchSet"/.test(bileBlock)) {
      errors.push('RavagerCorrosiveBile 未指向 RavagerCorrosiveBileAoeLaunchSet');
    }
    if (!/Cooldown\s+Link="Abil\/RavagerCorrosiveBile"\s+TimeUse="15"/.test(bileBlock)) {
      errors.push('RavagerCorrosiveBile 冷却不是 15 秒或未显式绑定自身冷却');
    }
  }

  for (const abilityId of ['MorphRoachToRavager', 'MorphRoachVileToRavager']) {
    const block = extractCatalogBlock(targetAbilText, 'CAbilTrain', abilityId);
    if (!block) {
      errors.push(`当前 AbilData 缺少 ${abilityId}`);
      continue;
    }
    if (!/<Unit\s+value="Ravager"\s*\/>/.test(block)) {
      errors.push(`${abilityId} 产出目标必须是 Ravager`);
    }
    if (/<Unit\s+value="RavagerAbathur"\s*\/>/.test(block)) {
      errors.push(`${abilityId} 不能产出 RavagerAbathur`);
    }
  }

  const launchSetBlock = extractCatalogBlock(targetEffectText, 'CEffectSet', 'RavagerCorrosiveBileAoeLaunchSet');
  if (launchSetBlock) {
    for (const ref of ['RavagerCorrosiveBileAoeCP', 'RavagerCorrosiveBileAoeWarningDummySearch']) {
      if (!launchSetBlock.includes(`value="${ref}"`)) {
        errors.push(`RavagerCorrosiveBileAoeLaunchSet 未引用 ${ref}`);
      }
    }
  }
}

function validateDocSurface() {
  if (!docText) {
    warnings.push('未找到 03-重生阿巴瑟-兵种融入设计.md，跳过文档表面检查');
    return;
  }

  const requiredDocTokens = [
    '首版建议采用“只生产基础形态”',
    '`RavagerCorrosiveBile`',
    '`NydusNetwork`',
    '`Leviathan`',
    '每个族系只有一个基础可造单位',
  ];
  for (const token of requiredDocTokens) {
    if (!docText.includes(token)) {
      warnings.push(`设计文档缺少关键口径: ${token}`);
    }
  }

  for (const expected of expectedLineages) {
    if (!docText.includes(`\`${expected.baseUnit}\``)) {
      warnings.push(`设计文档未显式出现基础单位: ${expected.baseUnit}`);
    }
    for (const [, unitId] of expected.candidates) {
      if (!docText.includes(`\`${unitId}\``)) {
        warnings.push(`设计文档未显式出现候选单位: ${unitId}`);
      }
    }
  }
}

function printSummary(instances) {
  let candidateCount = 0;
  const ready = [];
  const planned = [];

  for (const expected of expectedLineages) {
    const actual = instances.get(expected.id);
    if (!actual) {
      continue;
    }
    const units = indexedValues(actual, 'CandidateUnit');
    const statuses = indexedValues(actual, 'CandidateStatus');
    candidateCount += units.length;
    units.forEach((unitId, index) => {
      const status = statuses[index];
      if (status === 'ready') {
        ready.push(`${expected.id}/${unitId}`);
      } else if (status === 'planned') {
        planned.push(`${expected.id}/${unitId}`);
      }
    });
  }

  console.log(`lineages=${instances.size}, candidates=${candidateCount}, ready=${ready.length}, planned=${planned.length}`);
  if (planned.length > 0) {
    console.log(`planned candidates: ${planned.map((item) => item.split('/')[1]).join(', ')}`);
  }
}

function parseUserProfile(text, userId) {
  const block = extractUserBlock(text, userId);
  if (!block) {
    errors.push(`UserData.xml 缺少 CUser id="${userId}"`);
    return new Map();
  }

  const instances = new Map();
  const instanceRe = /<Instances\s+Id="([^"]+)"[^>]*>([\s\S]*?)<\/Instances>/g;
  for (const match of block.matchAll(instanceRe)) {
    const [, id, body] = match;
    instances.set(id, parseFields(body));
  }
  return instances;
}

function parseFields(body) {
  const fields = new Map();
  const fieldRe = /<([A-Za-z]+)\s+([^>]*)>\s*<Field\s+Id="([^"]+)"(?:\s+Index="([^"]+)")?\s*\/>\s*<\/\1>/g;
  for (const match of body.matchAll(fieldRe)) {
    const [, tag, attrsText, fieldId, index] = match;
    const attrs = parseAttrs(attrsText);
    const value = attrs[tag] ?? attrs.value ?? attrs.id ?? '';
    if (!fields.has(fieldId)) {
      fields.set(fieldId, new Map());
    }
    fields.get(fieldId).set(index ?? '__scalar', value);
  }
  return fields;
}

function parseAttrs(attrsText) {
  const attrs = {};
  const attrRe = /([A-Za-z0-9_:-]+)="([^"]*)"/g;
  for (const match of attrsText.matchAll(attrRe)) {
    attrs[match[1]] = match[2];
  }
  return attrs;
}

function extractUserBlock(text, userId) {
  const userRe = new RegExp(`<CUser\\s+id="${escapeRegExp(userId)}"[^>]*>[\\s\\S]*?<\\/CUser>`);
  return text.match(userRe)?.[0] ?? '';
}

function extractCatalogBlock(text, tagName, id) {
  const re = new RegExp(`<${tagName}\\s+id="${escapeRegExp(id)}"[^>]*>[\\s\\S]*?<\\/${tagName}>`);
  return text.match(re)?.[0] ?? '';
}

function expectScalar(fields, fieldId, expected, context) {
  const actual = scalarValue(fields, fieldId);
  if (actual !== expected) {
    errors.push(`${context}: ${fieldId}=${actual || '<missing>'}, expected ${expected}`);
  }
}

function expectIndexed(fields, fieldId, index, expected, context) {
  const actual = valueAt(fields, fieldId, index);
  if (actual !== expected) {
    errors.push(`${context}: ${fieldId}[${index}]=${actual || '<missing>'}, expected ${expected}`);
  }
}

function scalarValue(fields, fieldId) {
  return fields.get(fieldId)?.get('__scalar') ?? '';
}

function valueAt(fields, fieldId, index) {
  return fields.get(fieldId)?.get(String(index)) ?? '';
}

function indexedValues(fields, fieldId) {
  const field = fields.get(fieldId);
  if (!field) {
    return [];
  }
  return [...field.entries()]
    .filter(([index]) => index !== '__scalar')
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([, value]) => value);
}

function collectCatalogIds(text, re) {
  const ids = new Set();
  for (const match of text.matchAll(re)) {
    ids.add(match[1]);
  }
  return ids;
}

function readRequired(filePath) {
  if (!fs.existsSync(filePath)) {
    errors.push(`缺少必要文件: ${path.relative(repoRoot, filePath)}`);
    return '';
  }
  return fs.readFileSync(filePath, 'utf8');
}

function readOptional(filePath) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '';
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
