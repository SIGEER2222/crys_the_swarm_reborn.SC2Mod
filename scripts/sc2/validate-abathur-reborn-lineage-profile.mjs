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
  targetButton: path.join(targetRoot, 'ButtonData.xml'),
  targetUnit: path.join(targetRoot, 'UnitData.xml'),
  targetAbil: path.join(targetRoot, 'AbilData.xml'),
  targetEffect: path.join(targetRoot, 'EffectData.xml'),
  targetRequirement: path.join(targetRoot, 'RequirementData.xml'),
  targetRequirementNode: path.join(targetRoot, 'RequirementNodeData.xml'),
  targetUpgrade: path.join(targetRoot, 'UpgradeData.xml'),
  targetGameStrings: path.join(
    repoRoot,
    '合作指挥官版起义狂潮',
    'Mods',
    'XM',
    'XMAbathurReborn.SC2Mod',
    'zhCN.SC2Data',
    'LocalizedData',
    'GameStrings.txt',
  ),
  targetRuntime: path.join(repoRoot, '合作指挥官版起义狂潮', 'Mods', 'XM', 'XMAbathurReborn.SC2Mod', 'Base.SC2Data', 'LibA1BA7A9F.galaxy'),
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

const expectedLarvaTrainButtons = [
  { command: 'Train1', face: 'Drone', unit: 'DroneAbathurReborn' },
  { command: 'Train2', face: 'Overlord', unit: 'OverlordAbathurReborn' },
  { command: 'Train3', face: 'Zergling', unit: 'Zergling' },
  { command: 'Train4', face: 'Baneling', unit: 'Baneling' },
  { command: 'Train5', face: 'Roach', unit: 'Roach' },
  { command: 'Train6', face: 'Hydralisk', unit: 'Hydralisk' },
  { command: 'Train7', face: 'Mutalisk', unit: 'Mutalisk' },
  { command: 'Train8', face: 'SwarmHostMP', unit: 'SwarmHost' },
  { command: 'Train9', face: 'Ultralisk', unit: 'Ultralisk' },
  { command: 'Train10', face: 'Infestor', unit: 'Infestor' },
  { command: 'Train11', face: 'BroodLord', unit: 'BroodLord' },
];

const expectedWorkerBuildButtons = [
  { command: 'Build1', face: 'Hatchery', unit: 'HatcheryAbathurReborn' },
  { command: 'Build2', face: 'Extractor', unit: 'Extractor' },
  { command: 'Build3', face: 'SpawningPool', unit: 'SpawningPool' },
  { command: 'Build4', face: 'EvolutionChamber', unit: 'EvolutionChamber' },
  { command: 'Build5', face: 'BanelingNest', unit: 'BanelingNest' },
  { command: 'Build6', face: 'RoachWarren', unit: 'RoachWarren' },
  { command: 'Build7', face: 'HydraliskDen', unit: 'HydraliskDen' },
  { command: 'Build8', face: 'InfestationPit', unit: 'InfestationPit' },
  { command: 'Build9', face: 'Spire', unit: 'Spire' },
  { command: 'Build10', face: 'UltraliskCavern', unit: 'UltraliskCavern' },
  { command: 'Build11', face: 'SpineCrawler', unit: 'SpineCrawler' },
  { command: 'Build12', face: 'SporeCrawler', unit: 'SporeCrawler' },
];

const forbiddenLarvaPositiveTokens = new Set([
  'Aberration',
  'BuildViperLocked',
  'Corruptor',
  'Defiler',
  'DefilerMP',
  'HotSLeviathan',
  'LarvaTrainSwarm',
  'LarvaTrainSwarm2',
  'Leviathan',
  'MorphBrutalisk',
  'MorphToHydraliskImpaler',
  'MorphToHydraliskLurker',
  'MorphToHotSTorrasque',
  'MorphToHotSNoxious',
  'MorphToSwarmHostSplitA',
  'MorphToSwarmHostSplitB',
  'MorphToMutaliskViper',
  'QueenClassic',
  'Scourge',
  'SwarmHostMPUnit',
  'Viper',
]);

const forbiddenWorkerBuildTokens = new Set([
  'Armory',
  'AshWorm2',
  'BileLauncherZagara',
  'Bunker',
  'CreepColony',
  'EngineeringBay',
  'GreaterNydusWorm',
  'InfestedBarracks2',
  'LeaperDrone',
  'MercCompound',
  'Naktul',
  'NydusNetwork',
  'PrimalHive',
  'PrimalSunkenColony',
  'PrimalTownHall',
  'ScourgeNest',
]);

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
const targetButtonText = readRequired(files.targetButton);
const targetUnitText = readRequired(files.targetUnit);
const targetAbilText = readRequired(files.targetAbil);
const targetEffectText = readRequired(files.targetEffect);
const targetRequirementText = readRequired(files.targetRequirement);
const targetRequirementNodeText = readRequired(files.targetRequirementNode);
const targetUpgradeText = readRequired(files.targetUpgrade);
const targetGameStringsText = readRequired(files.targetGameStrings);
const targetRuntimeText = readRequired(files.targetRuntime);
const sourceUnitText = readRequired(files.sourceUnit);
const docText = readOptional(files.doc);

const targetUnits = collectCatalogIds(targetUnitText, /<CUnit\s+id="([^"]+)"/g);
const sourceUnits = collectCatalogIds(sourceUnitText, /<CUnit\s+id="([^"]+)"/g);
const targetAbilities = collectCatalogIds(targetAbilText, /<CAbil[A-Za-z]*\s+id="([^"]+)"/g);
const targetEffects = collectCatalogIds(targetEffectText, /<CEffect[A-Za-z]*\s+id="([^"]+)"/g);

const profile = parseUserProfile(userText, 'AbathurRebornLineageProfile');
validateProfile(profile);
validateNoAllLarvaPool();
validateLarvaBaseProduction(profile);
validateWorkerBuildWhitelist();
validateNoBiomassGameplayEntrypoints();
validateRavagerClosure(profile);
validateFiveTierUpgradeClosure();
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

function validateLarvaBaseProduction(instances) {
  const larvaBlock = extractCatalogBlock(targetUnitText, 'CUnit', 'Larva');
  if (!larvaBlock) {
    errors.push('当前 UnitData 缺少 CUnit id="Larva"');
    return;
  }

  if (!/AbilArray\s+Link="LarvaTrain"/.test(larvaBlock)) {
    errors.push('Larva 必须显式挂载 AbilArray Link="LarvaTrain"');
  }
  for (const forbidden of forbiddenLarvaPositiveTokens) {
    if (larvaBlock.includes(forbidden)) {
      errors.push(`Larva 本地卡面不能正向引用 ${forbidden}`);
    }
  }

  const layoutButtons = parseLayoutButtons(larvaBlock);
  const visibleLarvaTrainButtons = layoutButtons.filter((button) => button.AbilCmd?.startsWith('LarvaTrain,'));
  if (visibleLarvaTrainButtons.length !== expectedLarvaTrainButtons.length) {
    errors.push(`Larva 本地 LarvaTrain 按钮数 ${visibleLarvaTrainButtons.length} 与期望 ${expectedLarvaTrainButtons.length} 不一致`);
  }

  for (const expected of expectedLarvaTrainButtons) {
    const abilCmd = `LarvaTrain,${expected.command}`;
    const button = visibleLarvaTrainButtons.find((candidate) => candidate.AbilCmd === abilCmd);
    if (!button) {
      errors.push(`Larva 本地卡面缺少 ${abilCmd}`);
      continue;
    }
    if (button.Face !== expected.face) {
      errors.push(`Larva ${abilCmd} Face=${button.Face || '<missing>'}, expected ${expected.face}`);
    }
  }

  const trainBlock = extractCatalogBlock(targetAbilText, 'CAbilTrain', 'LarvaTrain');
  if (!trainBlock) {
    errors.push('当前 AbilData 缺少 CAbilTrain id="LarvaTrain"');
    return;
  }

  for (const forbidden of ['Scourge', 'QueenClassic', 'Corruptor', 'DefilerMP', 'Viper', 'SwarmHostMP', 'Brutalisk', 'Leviathan']) {
    if (trainBlock.includes(`value="${forbidden}"`)) {
      errors.push(`LarvaTrain 不应产出 ${forbidden}`);
    }
  }

  for (const expected of expectedLarvaTrainButtons) {
    const info = extractInfoArrayBlock(trainBlock, expected.command);
    if (!info) {
      errors.push(`LarvaTrain 缺少 ${expected.command}`);
      continue;
    }
    const units = collectTagValues(info, 'Unit');
    if (!units.includes(expected.unit)) {
      errors.push(`LarvaTrain ${expected.command} 产出 ${units.join(', ') || '<none>'}, expected includes ${expected.unit}`);
    }
  }

  const baseUnits = new Set([...instances.values()].map((fields) => scalarValue(fields, 'BaseUnit')).filter(Boolean));
  const trainedUnits = new Set(expectedLarvaTrainButtons.map((button) => button.unit));
  for (const baseUnit of baseUnits) {
    if (!trainedUnits.has(baseUnit)) {
      errors.push(`族系 BaseUnit ${baseUnit} 没有对应 LarvaTrain 基础入口`);
    }
  }
}

function validateWorkerBuildWhitelist() {
  const droneBlock = extractCatalogBlock(targetUnitText, 'CUnit', 'DroneAbathurReborn');
  if (!droneBlock) {
    errors.push('当前 UnitData 缺少 CUnit id="DroneAbathurReborn"');
    return;
  }

  if (!/AbilArray\s+Link="ZergBuildAbathurReborn"/.test(droneBlock)) {
    errors.push('DroneAbathurReborn 必须显式挂载 AbilArray Link="ZergBuildAbathurReborn"');
  }
  if (/<AbilArray\s+Link="ZergBuild"\s*\/>/.test(droneBlock)) {
    errors.push('DroneAbathurReborn 不能直接挂载共享 ZergBuild');
  }
  if (/AbilCmd="ZergBuild,/.test(droneBlock)) {
    errors.push('DroneAbathurReborn 卡面不能直接引用共享 ZergBuild 命令');
  }
  for (const forbidden of ['TerranBuild', 'ProtossBuild']) {
    if (droneBlock.includes(forbidden)) {
      errors.push(`DroneAbathurReborn 卡面不能引用 ${forbidden}`);
    }
  }
  if (/AbilCmd="ZergBuildAbathur,/.test(droneBlock) || /<AbilArray\s+Link="ZergBuildAbathur"\s*\/>/.test(droneBlock)) {
    errors.push('DroneAbathurReborn 卡面不能引用旧阿巴瑟 ZergBuildAbathur');
  }
  for (const forbidden of forbiddenWorkerBuildTokens) {
    if (droneBlock.includes(forbidden)) {
      errors.push(`DroneAbathurReborn 卡面不能出现非白名单对象 ${forbidden}`);
    }
  }

  const layoutButtons = parseLayoutButtons(droneBlock);
  const buildButtons = layoutButtons.filter((button) => button.AbilCmd?.startsWith('ZergBuildAbathurReborn,'));
  if (buildButtons.length !== expectedWorkerBuildButtons.length) {
    errors.push(`DroneAbathurReborn 本地建造按钮数 ${buildButtons.length} 与期望 ${expectedWorkerBuildButtons.length} 不一致`);
  }

  for (const expected of expectedWorkerBuildButtons) {
    const abilCmd = `ZergBuildAbathurReborn,${expected.command}`;
    const button = buildButtons.find((candidate) => candidate.AbilCmd === abilCmd);
    if (!button) {
      errors.push(`DroneAbathurReborn 本地卡面缺少 ${abilCmd}`);
      continue;
    }
    if (button.Face !== expected.face) {
      errors.push(`DroneAbathurReborn ${abilCmd} Face=${button.Face || '<missing>'}, expected ${expected.face}`);
    }
  }

  const buildBlock = extractCatalogBlock(targetAbilText, 'CAbilBuild', 'ZergBuildAbathurReborn');
  if (!buildBlock) {
    errors.push('当前 AbilData 缺少 CAbilBuild id="ZergBuildAbathurReborn"');
    return;
  }
  if (!/parent="ZergBuild"/.test(buildBlock)) {
    errors.push('ZergBuildAbathurReborn 应继承 ZergBuild 后再显式白名单覆盖');
  }
  for (const forbidden of forbiddenWorkerBuildTokens) {
    if (buildBlock.includes(forbidden)) {
      errors.push(`ZergBuildAbathurReborn 不能产出非白名单对象 ${forbidden}`);
    }
  }

  const infoArrays = parseInfoArrays(buildBlock);
  const byIndex = new Map(infoArrays.map((info) => [info.index, info]));
  const expectedUnits = new Set(expectedWorkerBuildButtons.map((button) => button.unit));
  const activeUnits = infoArrays.filter((info) => info.unit && !info.removed).map((info) => info.unit);

  for (const unitId of activeUnits) {
    if (!expectedUnits.has(unitId)) {
      errors.push(`ZergBuildAbathurReborn 出现非白名单建造单位: ${unitId}`);
    }
  }

  for (const expected of expectedWorkerBuildButtons) {
    const info = byIndex.get(expected.command);
    if (!info) {
      errors.push(`ZergBuildAbathurReborn 缺少 ${expected.command}`);
      continue;
    }
    if (info.removed) {
      errors.push(`ZergBuildAbathurReborn ${expected.command} 被 removed，但应为白名单建筑`);
    }
    if (info.unit !== expected.unit) {
      errors.push(`ZergBuildAbathurReborn ${expected.command} Unit=${info.unit || '<missing>'}, expected ${expected.unit}`);
    }
    if (info.button.DefaultButtonFace && info.button.DefaultButtonFace !== expected.face) {
      errors.push(
        `ZergBuildAbathurReborn ${expected.command} ButtonFace=${info.button.DefaultButtonFace}, expected ${expected.face}`,
      );
    }
  }

  for (let index = 13; index <= 30; index += 1) {
    const command = `Build${index}`;
    const info = byIndex.get(command);
    if (!info?.removed) {
      errors.push(`ZergBuildAbathurReborn 必须显式移除继承项 ${command}`);
    }
  }
}

function validateNoBiomassGameplayEntrypoints() {
  const visibleBiomassButtons = [
    ...targetUnitText.matchAll(/<LayoutButtons[^>]*(?:Biomass|CommanderPrestigeAbathurReborn[^>]*Biomass)[^>]*>/g),
  ].map((match) => match[0]);
  if (visibleBiomassButtons.length > 0) {
    errors.push(`UnitData 不允许暴露 Biomass 可见按钮，发现 ${visibleBiomassButtons.length} 处`);
  }

  const biomassAbilityLinks = [...targetUnitText.matchAll(/<AbilArray\s+Link="(?:Biomass|AbathurRebornCollectBiomass|AbathurRebornBiomassCollection)[^"]*"\s*\/>/g)]
    .map((match) => match[0]);
  if (biomassAbilityLinks.length > 0) {
    errors.push(`UnitData 不允许挂载 Biomass 交互能力，发现 ${biomassAbilityLinks.length} 处`);
  }

  const pickupBlock = extractCatalogBlock(targetUnitText, 'CUnit', 'BiomassPickup');
  if (pickupBlock) {
    if (/<AbilArray\s+Link="[^"]*Biomass[^"]*"\s*\/>/.test(pickupBlock)) {
      errors.push('BiomassPickup 残留单位必须保持不可交互，不能挂载 Biomass 拾取能力');
    }
    if (/<LayoutButtons[^>]*Biomass[^>]*>/.test(pickupBlock)) {
      errors.push('BiomassPickup 残留单位不能暴露 Biomass 按钮');
    }
  }

  if (/CreateUnitsWithDefaultFacing\([^;\n]*"BiomassPickup"/.test(targetRuntimeText)) {
    errors.push('LibA1BA7A9F.galaxy 不允许创建 BiomassPickup');
  }
  if (/UnitCreateEffectUnit\([^;\n]*"AbathurRebornCollectBiomass"/.test(targetRuntimeText)) {
    errors.push('LibA1BA7A9F.galaxy 不允许触发 AbathurRebornCollectBiomass');
  }
  if (/UnitAddCustomValue\([^;\n]*,\s*62\s*,/.test(targetRuntimeText)) {
    errors.push('LibA1BA7A9F.galaxy 不允许用 custom value 62 记录生物质');
  }

  const canDropBlock = extractGalaxyFunction(
    targetRuntimeText,
    'bool libA1BA7A9F_gf_AbathurRebornCanDropBiomass',
  );
  if (!/\breturn\s+false\s*;/.test(canDropBlock)) {
    errors.push('AbathurRebornCanDropBiomass 必须显式 return false');
  }

  const amountBlock = extractGalaxyFunction(
    targetRuntimeText,
    'fixed libA1BA7A9F_gf_AbathurRebornBiomassAmount',
  );
  if (!/\breturn\s+0\.0\s*;/.test(amountBlock)) {
    errors.push('AbathurRebornBiomassAmount 必须显式 return 0.0');
  }

  for (const functionName of [
    'bool libA1BA7A9F_gt_AbathurRebornBiomassDrop_Func',
    'bool libA1BA7A9F_gt_AbathurRebornBiomassPickup_Func',
  ]) {
    const block = extractGalaxyFunction(targetRuntimeText, functionName);
    if (!/\breturn\s+false\s*;/.test(block)) {
      errors.push(`${functionName} 必须显式 return false`);
    }
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

function validateFiveTierUpgradeClosure() {
  const seriesSpecs = [
    {
      label: '重生阿巴瑟地面攻击',
      units: ['EvolutionChamber'],
      ability: 'evolutionchamberresearch',
      levels: [
        ['Research13', 'ZergGroundAttacksLevel1', 'ZagaraGroundAttacksLevel1', 'LearnZagaraGroundAttack1'],
        ['Research14', 'ZergGroundAttacksLevel2', 'ZagaraGroundAttacksLevel2', 'LearnZagaraGroundAttack2'],
        ['Research15', 'ZergGroundAttacksLevel3', 'ZagaraGroundAttacksLevel3', 'LearnZagaraGroundAttack3'],
        ['Research16', 'ZergGroundAttacksLevel4', 'ZagaraGroundAttacksLevel4', 'LearnZagaraGroundAttack4'],
        ['Research17', 'ZergGroundAttacksLevel5', 'ZagaraGroundAttacksLevel5', 'LearnZagaraGroundAttack5'],
      ],
      localButtonLevels: [1, 2, 3, 4, 5],
      localRequirementLevels: [1, 2, 3, 4, 5],
      localUpgradeLevels: [1, 2, 3, 4, 5],
      requirementLinks: new Map([
        [4, ['ZergFiveTierGroundAttacksLevel4Use', 'ZergFiveTierGroundAttacksLevel4NotQueued']],
        [5, ['ZergFiveTierGroundAttacksLevel5Use', 'ZergFiveTierGroundAttacksLevel5NotQueued']],
      ]),
    },
    {
      label: '重生阿巴瑟空军攻击',
      units: ['Spire', 'GreaterSpire'],
      ability: 'SpireResearch',
      levels: [
        ['Research1', 'zergflyerattack1', 'ZergFlyerWeaponsLevel1', 'LearnZergFlyerAttack1'],
        ['Research2', 'zergflyerattack2', 'ZergFlyerWeaponsLevel2', 'LearnZergFlyerAttack2'],
        ['Research3', 'zergflyerattack3', 'ZergFlyerWeaponsLevel3', 'LearnZergFlyerAttack3'],
        ['Research16', 'zergflyerattack4', 'ZergFlyerWeaponsLevel4', 'LearnZergFlyerAttack4'],
        ['Research17', 'zergflyerattack5', 'ZergFlyerWeaponsLevel5', 'LearnZergFlyerAttack5'],
      ],
      localButtonLevels: [4, 5],
      localRequirementLevels: [4, 5],
      localUpgradeLevels: [4, 5],
      requirementLinks: new Map([
        [4, ['ZergFiveTierFlyerWeaponsLevel4Use', 'ZergFiveTierFlyerWeaponsLevel4NotQueued']],
        [5, ['ZergFiveTierFlyerWeaponsLevel5Use', 'ZergFiveTierFlyerWeaponsLevel5NotQueued']],
      ]),
    },
    {
      label: '重生阿巴瑟空军护甲',
      units: ['Spire', 'GreaterSpire'],
      ability: 'SpireResearch',
      levels: [
        ['Research4', 'zergflyerarmor1', 'ZergFlyerArmorsLevel1', 'LearnZergFlyerArmor1'],
        ['Research5', 'zergflyerarmor2', 'ZergFlyerArmorsLevel2', 'LearnZergFlyerArmor2'],
        ['Research6', 'zergflyerarmor3', 'ZergFlyerArmorsLevel3', 'LearnZergFlyerArmor3'],
        ['Research18', 'zergflyerarmor4', 'ZergFlyerArmorsLevel4', 'LearnZergFlyerArmor4'],
        ['Research19', 'zergflyerarmor5', 'ZergFlyerArmorsLevel5', 'LearnZergFlyerArmor5'],
      ],
      localButtonLevels: [4, 5],
      localRequirementLevels: [4, 5],
      localUpgradeLevels: [4, 5],
      requirementLinks: new Map([
        [4, ['ZergFiveTierFlyerArmorsLevel4Use', 'ZergFiveTierFlyerArmorsLevel4NotQueued']],
        [5, ['ZergFiveTierFlyerArmorsLevel5Use', 'ZergFiveTierFlyerArmorsLevel5NotQueued']],
      ]),
    },
  ];

  for (const spec of seriesSpecs) {
    const abilityBlock = extractCatalogBlock(targetAbilText, 'CAbilResearch', spec.ability);
    if (!abilityBlock) {
      errors.push(`${spec.label}: 缺少研究能力 ${spec.ability}`);
      continue;
    }

    spec.levels.forEach(([command, face, upgrade, requirement], index) => {
      const level = index + 1;
      const abilCmd = `${spec.ability},${command}`;

      for (const unitId of spec.units) {
        const unitBlocks = extractCatalogBlocks(targetUnitText, 'CUnit', unitId);
        if (unitBlocks.length === 0) {
          errors.push(`${spec.label}: 缺少科技建筑 ${unitId}`);
          continue;
        }
        if (!unitBlocks.some((block) => hasLayoutButton(block, abilCmd, face))) {
          errors.push(`${spec.label}: ${unitId} 缺少卡面按钮 ${face} -> ${abilCmd}`);
        }
      }

      const infoBlock = extractInfoArrayBlock(abilityBlock, command);
      if (!infoBlock) {
        errors.push(`${spec.label}: ${spec.ability} 缺少 ${command}`);
      } else {
        if (!infoBlock.includes(`Upgrade="${upgrade}"`)) {
          errors.push(`${spec.label}: ${spec.ability},${command} 未绑定 Upgrade=${upgrade}`);
        }
        if (!infoBlock.includes(`DefaultButtonFace="${face}"`)) {
          errors.push(`${spec.label}: ${spec.ability},${command} 未绑定按钮 ${face}`);
        }
        if (!infoBlock.includes(`Requirements="${requirement}"`)) {
          errors.push(`${spec.label}: ${spec.ability},${command} 未绑定 Requirement=${requirement}`);
        }
      }

      if (spec.localButtonLevels.includes(level) && !extractCatalogBlock(targetButtonText, 'CButton', face)) {
        errors.push(`${spec.label}: 本地 ButtonData 缺少 ${face}`);
      }
      if (spec.localButtonLevels.includes(level)) {
        expectGameString(`${spec.label}: 按钮名称文本`, `Button/Name/${face}`);
        expectGameString(`${spec.label}: 按钮提示文本`, `Button/Tooltip/${face}`);
      }
      if (spec.localUpgradeLevels.includes(level) && !extractCatalogBlock(targetUpgradeText, 'CUpgrade', upgrade)) {
        errors.push(`${spec.label}: 本地 UpgradeData 缺少 ${upgrade}`);
      }
      if (spec.localUpgradeLevels.includes(level) && upgrade.startsWith('ZergFlyer')) {
        expectGameString(`${spec.label}: 升级名称文本`, `Upgrade/Name/${upgrade}`);
      }
      if (spec.localRequirementLevels.includes(level)) {
        const requirementBlock = extractCatalogBlock(targetRequirementText, 'CRequirement', requirement);
        if (!requirementBlock) {
          errors.push(`${spec.label}: 本地 RequirementData 缺少 ${requirement}`);
        }
        const links = spec.requirementLinks.get(level);
        if (links && requirementBlock) {
          const [useLink, showLink] = links;
          if (!requirementBlock.includes(`index="Use" Link="${useLink}"`)) {
            errors.push(`${spec.label}: ${requirement} 未绑定 Use=${useLink}`);
          }
          if (!requirementBlock.includes(`index="Show" Link="${showLink}"`)) {
            errors.push(`${spec.label}: ${requirement} 未绑定 Show=${showLink}`);
          }
          for (const link of links) {
            if (!targetRequirementNodeText.includes(`id="${link}"`)) {
              errors.push(`${spec.label}: RequirementNodeData 缺少 ${link}`);
            }
          }
        }
      }
    });
  }

  for (const forbidden of ['RavagerAbathurCorrosiveBile', 'RavagerAbathur,Execute']) {
    const positiveBlocks = [
      ...extractCatalogBlocks(targetUnitText, 'CUnit', 'Ravager'),
      ...extractCatalogBlocks(targetAbilText, 'CAbilTrain', 'MorphRoachToRavager'),
      ...extractCatalogBlocks(targetAbilText, 'CAbilTrain', 'MorphRoachVileToRavager'),
    ];
    if (positiveBlocks.some((block) => block.includes(forbidden))) {
      errors.push(`破坏者正向链不能引用遗留对象 ${forbidden}`);
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
    '`DroneAbathurReborn`',
    '`ZergBuildAbathurReborn`',
    '`HatcheryAbathurReborn`',
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

function parseLayoutButtons(block) {
  const buttons = [];
  const buttonRe = /<LayoutButtons\s+([^>]*?)(?:\/>|><\/LayoutButtons>)/g;
  for (const match of block.matchAll(buttonRe)) {
    buttons.push(parseAttrs(match[1]));
  }
  return buttons;
}

function parseInfoArrays(block) {
  const infoArrays = [];
  const infoRe = /<InfoArray\s+([^>]*?)(?:\/>|>([\s\S]*?)<\/InfoArray>)/g;
  for (const match of block.matchAll(infoRe)) {
    const attrs = parseAttrs(match[1]);
    const body = match[2] ?? '';
    const buttonAttrs = body.match(/<Button\s+([^>]*?)(?:\/>|>)/)?.[1] ?? '';
    infoArrays.push({
      index: attrs.index ?? '',
      unit: attrs.Unit ?? '',
      removed: attrs.removed === '1',
      attrs,
      body,
      button: buttonAttrs ? parseAttrs(buttonAttrs) : {},
    });
  }
  return infoArrays;
}

function extractInfoArrayBlock(trainBlock, index) {
  const re = new RegExp(`<InfoArray\\s+index="${escapeRegExp(index)}"[^>]*>[\\s\\S]*?<\\/InfoArray>`);
  return trainBlock.match(re)?.[0] ?? '';
}

function collectTagValues(block, tagName) {
  const values = [];
  const re = new RegExp(`<${tagName}(?:\\s+index="[^"]+")?\\s+value="([^"]*)"`, 'g');
  for (const match of block.matchAll(re)) {
    values.push(match[1]);
  }
  return values;
}

function extractUserBlock(text, userId) {
  const userRe = new RegExp(`<CUser\\s+id="${escapeRegExp(userId)}"[^>]*>[\\s\\S]*?<\\/CUser>`);
  return text.match(userRe)?.[0] ?? '';
}

function extractCatalogBlock(text, tagName, id) {
  const re = new RegExp(`<${tagName}\\s+id="${escapeRegExp(id)}"[^>]*>[\\s\\S]*?<\\/${tagName}>`);
  return text.match(re)?.[0] ?? '';
}

function extractCatalogBlocks(text, tagName, id) {
  const blocks = [];
  const re = new RegExp(`<${tagName}\\s+id="${escapeRegExp(id)}"[^>]*>[\\s\\S]*?<\\/${tagName}>`, 'g');
  for (const match of text.matchAll(re)) {
    blocks.push(match[0]);
  }
  return blocks;
}

function hasLayoutButton(unitBlock, abilCmd, face) {
  return parseLayoutButtons(unitBlock).some((button) => button.AbilCmd === abilCmd && button.Face === face);
}

function expectGameString(label, key) {
  const pattern = new RegExp(`^${escapeRegExp(key)}=`, 'm');
  if (!pattern.test(targetGameStringsText)) {
    errors.push(`${label}: GameStrings.txt 缺少 ${key}`);
  }
}

function extractGalaxyFunction(text, signaturePrefix) {
  const start = text.indexOf(signaturePrefix);
  if (start < 0) {
    return '';
  }
  const nextFunction = text.indexOf('\n\n', start);
  return text.slice(start, nextFunction < 0 ? text.length : nextFunction);
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
