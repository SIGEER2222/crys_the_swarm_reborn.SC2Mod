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
const xmFinalDataRoot = path.join(
  repoRoot,
  '合作指挥官版起义狂潮',
  'Mods',
  'XM',
  'XMFinal.SC2Mod',
  'Base.SC2Data',
);
const sourceRoot = path.join(repoRoot, 'crys_the_swarm_reborn.SC2Mod', 'Base.SC2Data', 'GameData');

const files = {
  user: path.join(targetRoot, 'UserData.xml'),
  targetButton: path.join(targetRoot, 'ButtonData.xml'),
  targetUnit: path.join(targetRoot, 'UnitData.xml'),
  targetWeapon: path.join(targetRoot, 'WeaponData.xml'),
  targetAbil: path.join(targetRoot, 'AbilData.xml'),
  targetEffect: path.join(targetRoot, 'EffectData.xml'),
  targetBehavior: path.join(targetRoot, 'BehaviorData.xml'),
  targetActor: path.join(targetRoot, 'ActorData.xml'),
  targetModel: path.join(targetRoot, 'ModelData.xml'),
  targetMover: path.join(targetRoot, 'MoverData.xml'),
  targetSound: path.join(targetRoot, 'SoundData.xml'),
  targetValidator: path.join(targetRoot, 'ValidatorData.xml'),
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
  xmFinalLib: path.join(xmFinalDataRoot, 'LibE0EAE146.galaxy'),
  xmFinalLibHeader: path.join(xmFinalDataRoot, 'LibE0EAE146_h.galaxy'),
  xmFinalAbathurRebornRuntime: path.join(xmFinalDataRoot, 'LibE0EAE146_AbathurRebornRuntime.galaxy'),
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
      ['Pygalisk', 'Pygalisk', 'ready'],
      ['Toxic', 'ZerglingToxic', 'ready'],
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
      ['Frost Fiend', 'FrostFiend', 'ready'],
      ['Bile Titan', 'BileTitan', 'ready'],
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
      ['Igniter', 'Igniter', 'ready'],
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
      ['Toxic', 'Hydralisk2', 'ready'],
    ],
  },
  {
    id: 'Mutalisk',
    lineage: 'Mutalisk',
    bankKey: 'Evolutions/Mutalisk',
    baseUnit: 'Mutalisk',
    techStructure: 'Spire',
    candidates: [
      ['Char', 'MutaliskChar', 'ready'],
      ['Mamba', 'Mamba', 'ready'],
      ['Ankylos', 'MutaliskAnkylos', 'ready'],
      ['Mesmer', 'Mesmer', 'ready'],
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
      ['Bane', 'BaneHost', 'ready'],
      ['Vespid', 'VespidHost', 'ready'],
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
      ['Noxious', 'HotSNoxious', 'ready'],
      ['Savage', 'UltraliskSavage', 'ready'],
      ['Indra', 'UltraliskKaldir', 'ready'],
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
      ['Guardian', 'IzshaGuardian', 'ready'],
      ['Devourer', 'Devourer', 'ready'],
      ['Kraken', 'Kraken', 'ready'],
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

const expectedRuntimeReplacements = [
  ['Zergling', 'Raptorling', 'HotSRaptor'],
  ['Zergling', 'Swarmling', 'HotSSwarmling'],
  ['Zergling', 'Pygalisk', 'Pygalisk'],
  ['Zergling', 'Toxic', 'ZerglingToxic'],
  ['Baneling', 'Hunter', 'HotSHunter'],
  ['Baneling', 'Splitter', 'HotSSplitterlingBig'],
  ['Baneling', 'Frost Fiend', 'FrostFiend'],
  ['Baneling', 'Bile Titan', 'BileTitan'],
  ['Roach', 'Vile', 'RoachVile'],
  ['Roach', 'Corpser', 'RoachCorpser'],
  ['Roach', 'Igniter', 'Igniter'],
  ['Roach', 'Ravager', 'Ravager'],
  ['Hydralisk', 'Lurker', 'HydraliskLurker'],
  ['Hydralisk', 'Impaler', 'HydraliskImpaler'],
  ['Hydralisk', 'Hunter-Killer', 'HunterKiller'],
  ['Hydralisk', 'Toxic', 'Hydralisk2'],
  ['Mutalisk', 'Char', 'MutaliskChar'],
  ['Mutalisk', 'Mamba', 'Mamba'],
  ['Mutalisk', 'Ankylos', 'MutaliskAnkylos'],
  ['Mutalisk', 'Mesmer', 'Mesmer'],
  ['SwarmHost', 'Carrion', 'SwarmHostSplitA'],
  ['SwarmHost', 'Creeper', 'SwarmHostSplitB'],
  ['SwarmHost', 'Bane', 'BaneHost'],
  ['SwarmHost', 'Vespid', 'VespidHost'],
  ['Ultralisk', 'Torrasque', 'HotSTorrasque'],
  ['Ultralisk', 'Noxious', 'HotSNoxious'],
  ['Ultralisk', 'Savage', 'UltraliskSavage'],
  ['Ultralisk', 'Indra', 'UltraliskKaldir'],
  ['BroodLord', 'Guardian', 'IzshaGuardian'],
  ['BroodLord', 'Devourer', 'Devourer'],
  ['BroodLord', 'Kraken', 'Kraken'],
  ['Infestor', 'Viper', 'Viper'],
  ['Infestor', 'Defiler', 'DefilerMP'],
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
const targetWeaponText = readRequired(files.targetWeapon);
const targetAbilText = readRequired(files.targetAbil);
const targetEffectText = readRequired(files.targetEffect);
const targetBehaviorText = readRequired(files.targetBehavior);
const targetActorText = readRequired(files.targetActor);
const targetModelText = readRequired(files.targetModel);
const targetMoverText = readRequired(files.targetMover);
const targetSoundText = readRequired(files.targetSound);
const targetValidatorText = readRequired(files.targetValidator);
const targetRequirementText = readRequired(files.targetRequirement);
const targetRequirementNodeText = readRequired(files.targetRequirementNode);
const targetUpgradeText = readRequired(files.targetUpgrade);
const targetGameStringsText = readRequired(files.targetGameStrings);
const targetRuntimeText = readRequired(files.targetRuntime);
const xmFinalLibText = readRequired(files.xmFinalLib);
const xmFinalLibHeaderText = readRequired(files.xmFinalLibHeader);
const xmFinalAbathurRebornRuntimeText = readRequired(files.xmFinalAbathurRebornRuntime);
const sourceUnitText = readRequired(files.sourceUnit);
const docText = readOptional(files.doc);

const targetUnits = collectCatalogIds(targetUnitText, /<CUnit\s+id="([^"]+)"/g);
const sourceUnits = collectCatalogIds(sourceUnitText, /<CUnit\s+id="([^"]+)"/g);
const targetButtons = collectCatalogIds(targetButtonText, /<CButton\s+id="([^"]+)"/g);
const targetWeapons = collectCatalogIds(targetWeaponText, /<CWeapon[A-Za-z]*\s+id="([^"]+)"/g);
const targetAbilities = collectCatalogIds(targetAbilText, /<CAbil[A-Za-z]*\s+id="([^"]+)"/g);
const targetEffects = collectCatalogIds(targetEffectText, /<CEffect[A-Za-z]*\s+id="([^"]+)"/g);
const targetBehaviors = collectCatalogIds(targetBehaviorText, /<CBehavior[A-Za-z]*\s+id="([^"]+)"/g);
const targetActors = collectCatalogIds(targetActorText, /<CActor[A-Za-z]*\s+id="([^"]+)"/g);
const targetModels = collectCatalogIds(targetModelText, /<CModel\s+id="([^"]+)"/g);
const targetMovers = collectCatalogIds(targetMoverText, /<CMover[A-Za-z]*\s+id="([^"]+)"/g);
const targetSounds = collectCatalogIds(targetSoundText, /<CSound\s+id="([^"]+)"/g);
const targetValidators = collectCatalogIds(targetValidatorText, /<CValidator[A-Za-z]*\s+id="([^"]+)"/g);
const targetRequirements = collectCatalogIds(targetRequirementText, /<CRequirement\s+id="([^"]+)"/g);
const targetRequirementNodes = collectCatalogIds(targetRequirementNodeText, /<CRequirement[A-Za-z]*\s+id="([^"]+)"/g);

const profile = parseUserProfile(userText, 'AbathurRebornLineageProfile');
validateProfile(profile);
validateNoAllLarvaPool();
validateLarvaBaseProduction(profile);
validateWorkerBuildWhitelist();
validateNoBiomassGameplayEntrypoints();
validateCommanderAchNoBiomassGrants();
validateXmFinalRuntimeClosure(profile);
validateRavagerClosure(profile);
validateUnitPurchaseClosure();
validateMutaliskVariantClosure();
validateFinalFourVariantClosure();
validateNoxiousUltraliskClosure();
validateFrostFiendClosure();
validateBileTitanClosure();
validateAbathurRebornSwarmHostVariantClosure();
validateAbathurRebornUltraliskVariantClosure();
validateAbathurRebornMonstrousFlierVariantClosure();
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
  if (/<CUnit\s+id="Larva"/.test(targetUnitText)) {
    errors.push('当前 XMAbathurReborn 不能覆盖共享 CUnit id="Larva"，必须使用 LarvaAbathurReborn');
  }

  const larvaBlock = extractCatalogBlock(targetUnitText, 'CUnit', 'LarvaAbathurReborn');
  if (!larvaBlock) {
    errors.push('当前 UnitData 缺少 CUnit id="LarvaAbathurReborn"');
    return;
  }

  if (!/parent="Larva"/.test(larvaBlock)) {
    errors.push('LarvaAbathurReborn 必须继承 Larva 后重载专属训练能力');
  }
  if (!/AbilArray\s+index="0"\s+Link="LarvaTrainAbathurReborn"/.test(larvaBlock)) {
    errors.push('LarvaAbathurReborn 必须显式挂载 AbilArray index="0" Link="LarvaTrainAbathurReborn"');
  }
  for (const forbidden of forbiddenLarvaPositiveTokens) {
    if (larvaBlock.includes(forbidden)) {
      errors.push(`LarvaAbathurReborn 本地卡面不能正向引用 ${forbidden}`);
    }
  }

  const layoutButtons = parseLayoutButtons(larvaBlock);
  const visibleLarvaTrainButtons = layoutButtons.filter((button) => button.AbilCmd?.startsWith('LarvaTrainAbathurReborn,'));
  if (visibleLarvaTrainButtons.length !== expectedLarvaTrainButtons.length) {
    errors.push(`LarvaAbathurReborn 本地 LarvaTrainAbathurReborn 按钮数 ${visibleLarvaTrainButtons.length} 与期望 ${expectedLarvaTrainButtons.length} 不一致`);
  }

  for (const expected of expectedLarvaTrainButtons) {
    const abilCmd = `LarvaTrainAbathurReborn,${expected.command}`;
    const button = visibleLarvaTrainButtons.find((candidate) => candidate.AbilCmd === abilCmd);
    if (!button) {
      errors.push(`LarvaAbathurReborn 本地卡面缺少 ${abilCmd}`);
      continue;
    }
    if (button.Face !== expected.face) {
      errors.push(`LarvaAbathurReborn ${abilCmd} Face=${button.Face || '<missing>'}, expected ${expected.face}`);
    }
  }

  const trainBlock = extractCatalogBlock(targetAbilText, 'CAbilTrain', 'LarvaTrainAbathurReborn');
  if (!trainBlock) {
    errors.push('当前 AbilData 缺少 CAbilTrain id="LarvaTrainAbathurReborn"');
    return;
  }
  if (!/parent="LarvaTrain"/.test(trainBlock)) {
    errors.push('LarvaTrainAbathurReborn 应继承 LarvaTrain 后显式收敛基础入口');
  }

  for (const forbidden of ['Scourge', 'QueenClassic', 'Corruptor', 'DefilerMP', 'Viper', 'SwarmHostMP', 'Brutalisk', 'Leviathan']) {
    if (trainBlock.includes(`value="${forbidden}"`)) {
      errors.push(`LarvaTrainAbathurReborn 不应产出 ${forbidden}`);
    }
  }

  for (const expected of expectedLarvaTrainButtons) {
    const info = extractInfoArrayBlock(trainBlock, expected.command);
    if (!info) {
      errors.push(`LarvaTrainAbathurReborn 缺少 ${expected.command}`);
      continue;
    }
    const units = collectTagValues(info, 'Unit');
    if (!units.includes(expected.unit)) {
      errors.push(`LarvaTrainAbathurReborn ${expected.command} 产出 ${units.join(', ') || '<none>'}, expected includes ${expected.unit}`);
    }
  }

  for (let index = 12; index <= 30; index += 1) {
    const info = extractInfoArrayBlock(trainBlock, `Train${index}`);
    if (!/removed="1"/.test(info)) {
      errors.push(`LarvaTrainAbathurReborn 必须显式移除继承 Train${index}，防止全量候选池外露`);
    }
  }

  validatePrivateTownHallLarvaClosure();

  const baseUnits = new Set([...instances.values()].map((fields) => scalarValue(fields, 'BaseUnit')).filter(Boolean));
  const trainedUnits = new Set(expectedLarvaTrainButtons.map((button) => button.unit));
  for (const baseUnit of baseUnits) {
    if (!trainedUnits.has(baseUnit)) {
      errors.push(`族系 BaseUnit ${baseUnit} 没有对应 LarvaTrain 基础入口`);
    }
  }
}

function validatePrivateTownHallLarvaClosure() {
  for (const [unitId, morphAbility] of [
    ['HatcheryAbathurReborn', 'UpgradeToLairAbathurReborn'],
    ['LairAbathurReborn', 'UpgradeToHiveAbathurReborn'],
    ['HiveAbathurReborn', ''],
  ]) {
    const block = extractCatalogBlock(targetUnitText, 'CUnit', unitId);
    if (!block) {
      errors.push(`当前 UnitData 缺少私有基地 ${unitId}`);
      continue;
    }
    if (!block.includes('BehaviorArray index="1" Link="SpawnLarvaAbathurReborn"')) {
      errors.push(`${unitId} 必须挂载 SpawnLarvaAbathurReborn，不能继承共享 SpawnLarva`);
    }
    if (morphAbility && !block.includes(`AbilArray Link="${morphAbility}"`)) {
      errors.push(`${unitId} 必须挂载私有升级能力 ${morphAbility}`);
    }
  }

  const spawnBlock = extractCatalogBlock(targetBehaviorText, 'CBehaviorSpawn', 'SpawnLarvaAbathurReborn');
  if (!spawnBlock) {
    errors.push('当前 BehaviorData 缺少 SpawnLarvaAbathurReborn');
  } else if (!spawnBlock.includes('Unit="LarvaAbathurReborn"')) {
    errors.push('SpawnLarvaAbathurReborn 必须产出 LarvaAbathurReborn');
  }

  for (const [abilityId, unitId] of [
    ['UpgradeToLairAbathurReborn', 'LairAbathurReborn'],
    ['UpgradeToHiveAbathurReborn', 'HiveAbathurReborn'],
  ]) {
    const abilityBlock = extractCatalogBlock(targetAbilText, 'CAbilMorph', abilityId);
    if (!abilityBlock) {
      errors.push(`当前 AbilData 缺少 ${abilityId}`);
    } else if (!abilityBlock.includes(`InfoArray Unit="${unitId}"`)) {
      errors.push(`${abilityId} 必须升级为 ${unitId}`);
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

function validateCommanderAchNoBiomassGrants() {
  const commanderAchBlock = extractUserBlock(userText, 'CommanderAch');
  const rebornBlock = extractInstanceBlock(commanderAchBlock, 'AbathurReborn');
  if (!rebornBlock) {
    errors.push('CommanderAch 缺少 AbathurReborn 实例，无法验证正向加点');
    return;
  }

  for (const match of rebornBlock.matchAll(/<Upgrade\s+Upgrade="([^"]+)"[^>]*>\s*<Field\s+Id="(Upg|Poi)"(?:\s+Index="[^"]+")?\s*\/>\s*<\/Upgrade>/g)) {
    const [, upgradeId, fieldId] = match;
    if (/Biomass/i.test(upgradeId)) {
      errors.push(`CommanderAch/AbathurReborn ${fieldId} 不允许正向授予 Biomass 升级: ${upgradeId}`);
    }
    if (!targetUpgradeText.includes(`id="${upgradeId}"`)) {
      errors.push(`CommanderAch/AbathurReborn ${fieldId} 指向不存在的 Upgrade: ${upgradeId}`);
    }
  }
}

function validateXmFinalRuntimeClosure(instances) {
  if (!xmFinalLibText.includes('include "LibE0EAE146_AbathurRebornRuntime"')) {
    errors.push('XMFinal LibE0EAE146.galaxy 缺少 include "LibE0EAE146_AbathurRebornRuntime"');
  }
  if (!xmFinalLibHeaderText.includes('bool libE0EAE146_gv_abathurRebornRuntimeInitialized;')) {
    errors.push('XMFinal LibE0EAE146_h.galaxy 缺少 abathurRebornRuntimeInitialized 声明');
  }
  if (!xmFinalLibHeaderText.includes('bool libE0EAE146_gv_abathurRebornEvolutionTriggersReady;')) {
    errors.push('XMFinal LibE0EAE146_h.galaxy 缺少 abathurRebornEvolutionTriggersReady 声明');
  }
  if (!xmFinalLibHeaderText.includes('int libE0EAE146_gv_abathurRebornRuntimePlayer;')) {
    errors.push('XMFinal LibE0EAE146_h.galaxy 缺少 abathurRebornRuntimePlayer 声明');
  }
  if (!xmFinalLibHeaderText.includes('void libE0EAE146_gf_AbathurRebornRuntimeInit')) {
    errors.push('XMFinal LibE0EAE146_h.galaxy 缺少 AbathurRebornRuntimeInit 声明');
  }
  if (!xmFinalLibText.includes('libE0EAE146_gv_abathurRebornRuntimeInitialized = false;')) {
    errors.push('XMFinal LibE0EAE146.galaxy 初始化时必须重置 abathurRebornRuntimeInitialized');
  }
  if (!xmFinalLibText.includes('libE0EAE146_gv_abathurRebornEvolutionTriggersReady = false;')) {
    errors.push('XMFinal LibE0EAE146.galaxy 初始化时必须重置 abathurRebornEvolutionTriggersReady');
  }
  if (!xmFinalLibText.includes('libE0EAE146_gv_abathurRebornRuntimePlayer = 0;')) {
    errors.push('XMFinal LibE0EAE146.galaxy 初始化时必须重置 abathurRebornRuntimePlayer');
  }
  if (!/auto09490B45_val\s*==\s*"AbathurReborn"[\s\S]{0,180}libE0EAE146_gf_AbathurRebornRuntimeInit\(1,\s*lp_secondUnit,\s*lp_createHero\)/.test(xmFinalLibText)) {
    errors.push('XMFinal InitializeBase 缺少 AbathurReborn -> AbathurRebornRuntimeInit 分支');
  }

  const runtimeText = xmFinalAbathurRebornRuntimeText;
  const requiredRuntimeTokens = [
    'void libE0EAE146_gf_AbathurRebornRuntimeInit',
    'libE0EAE146_gv_abathurRebornRuntimeInitialized',
    '"CoopCasterAbathurReborn"',
    'lib67C0F0E7_gf_CU_GPInit(lp_player, "AbathurReborn"',
    '"AbathurRebornCommander", 1',
    '"CommanderLevel", 16',
    'libE0EAE146_gf_AbathurRebornApplyTechWhitelist',
    'libE0EAE146_gf_AbathurRebornReplacementUnitForBase',
    'libE0EAE146_gf_AbathurRebornReplaceUnitIfNeeded',
    'libE0EAE146_gf_AbathurRebornReplaceExistingUnits',
    'libNtve_gf_ReplaceUnit',
    'TriggerAddEventUnitRegion',
    'TriggerAddEventTimePeriodic',
    'libE0EAE146_gv_commander == "AbathurReborn"',
    'libE0EAE146_gv_abathurRebornRuntimePlayer',
  ];
  for (const token of requiredRuntimeTokens) {
    if (!runtimeText.includes(token)) {
      errors.push(`AbathurRebornRuntime 缺少关键运行时片段: ${token}`);
    }
  }

  for (const forbidden of ['InitializeAbathurBiomass', 'BiomassPickup', 'AbathurRebornCollectBiomass', 'UnitAddCustomValue']) {
    if (runtimeText.includes(forbidden)) {
      errors.push(`AbathurRebornRuntime 不允许包含生物质运行时入口: ${forbidden}`);
    }
  }

  for (const match of runtimeText.matchAll(/AbilityCommand\("([^"]+)",\s*0\)/g)) {
    const abilityId = match[1];
    if (!targetAbilities.has(abilityId)) {
      errors.push(`AbathurRebornRuntime 不应 TechTreeAbilityAllow 未在 XMAbathurReborn 定义的 Ability: ${abilityId}`);
    }
  }

  for (const unitId of expectedLarvaTrainButtons.map((button) => button.unit)) {
    if (!runtimeText.includes(`TechTreeUnitAllow(lp_player, "${unitId}", true)`)) {
      errors.push(`AbathurRebornRuntime 必须开放基础生产单位: ${unitId}`);
    }
  }

  for (const expected of expectedLineages) {
    const actual = instances.get(expected.id);
    if (!actual) {
      continue;
    }

    expected.candidates.forEach(([, unitId, status]) => {
      const allowTrue = `TechTreeUnitAllow(lp_player, "${unitId}", true)`;
      if (status === 'ready') {
        if (!runtimeText.includes(allowTrue)) {
          errors.push(`AbathurRebornRuntime 必须在选择闭包中开放 ready 候选: ${expected.id}/${unitId}`);
        }
      } else if (runtimeText.includes(allowTrue)) {
        errors.push(`AbathurRebornRuntime 不允许开放 planned 候选: ${expected.id}/${unitId}`);
      }
    });
  }

  for (const forbiddenUnit of ['NydusNetwork', 'GreaterNydusWorm', 'Brutalisk', 'Omegalisk', 'Blightbringer', 'HotSLeviathan', 'Leviathan', 'Naktul']) {
    if (runtimeText.includes(`TechTreeUnitAllow(lp_player, "${forbiddenUnit}", true)`)) {
      errors.push(`AbathurRebornRuntime 不允许开放负例单位: ${forbiddenUnit}`);
    }
    if (!runtimeText.includes(`TechTreeUnitAllow(lp_player, "${forbiddenUnit}", false)`)) {
      errors.push(`AbathurRebornRuntime 必须显式禁用负例单位: ${forbiddenUnit}`);
    }
  }

  for (const abilityId of [
    'RavagerCorrosiveBile',
    'MorphRoachToRavager',
    'MorphRoachVileToRavager',
  ]) {
    if (!runtimeText.includes(`AbilityCommand("${abilityId}", 0)`)) {
      errors.push(`AbathurRebornRuntime 缺少破坏者能力白名单: ${abilityId}`);
    }
  }

  validateRuntimeReplacementClosure(runtimeText, instances);
}

function validateRuntimeReplacementClosure(runtimeText, instances) {
  const readyUnits = new Set();
  const plannedUnits = new Set();
  for (const expected of expectedLineages) {
    const actual = instances.get(expected.id);
    if (!actual) {
      continue;
    }
    const units = indexedValues(actual, 'CandidateUnit');
    const statuses = indexedValues(actual, 'CandidateStatus');
    units.forEach((unitId, index) => {
      if (statuses[index] === 'ready') {
        readyUnits.add(unitId);
      } else if (statuses[index] === 'planned') {
        plannedUnits.add(unitId);
      }
    });
  }

  for (const [baseUnit, selection, replacementUnit] of expectedRuntimeReplacements) {
    if (!readyUnits.has(replacementUnit)) {
      errors.push(`运行时替换表引用的 ready 单位未在 profile 中标记 ready: ${baseUnit}/${selection} -> ${replacementUnit}`);
    }
    const replacementPattern = new RegExp(
      `lp_baseUnit\\s*==\\s*"${escapeRegExp(baseUnit)}"[\\s\\S]{0,700}lv_selection\\s*==\\s*"${escapeRegExp(selection)}"[\\s\\S]{0,180}return\\s+"${escapeRegExp(replacementUnit)}"`,
    );
    if (!replacementPattern.test(runtimeText)) {
      errors.push(`AbathurRebornRuntime 缺少单位替换映射: ${baseUnit}/${selection} -> ${replacementUnit}`);
    }
  }

  for (const baseUnit of new Set(expectedRuntimeReplacements.map(([baseUnit]) => baseUnit))) {
    if (!runtimeText.includes(`libE0EAE146_gf_AbathurRebornReplaceUnitsOfType(lp_player, "${baseUnit}")`)) {
      errors.push(`AbathurRebornRuntime 周期扫描缺少基础单位: ${baseUnit}`);
    }
  }

  for (const unitId of plannedUnits) {
    if (runtimeText.includes(`return "${unitId}"`)) {
      errors.push(`AbathurRebornRuntime 不允许把 planned 候选作为替换产物: ${unitId}`);
    }
  }

  if (!runtimeText.includes('libE0EAE146_gf_AbathurRebornReplaceExistingUnits(lp_player);')) {
    errors.push('AbathurRebornRuntime 初始化后必须立即扫描已有基础单位，避免开局单位漏替换');
  }
}

function validateUnitPurchaseClosure() {
  const purchaseAbilityIds = new Set(
    [...targetUnitText.matchAll(/AbilCmd="([^"]+Purchase),Execute"/g)].map((match) => match[1]),
  );

  for (const match of targetUnitText.matchAll(/<CUnit\s+id="([^"]+)"[^>]*>[\s\S]*?<\/CUnit>/g)) {
    const [, unitId] = match;
    const unitBlock = match[0];
    const unitAbilities = new Set([...unitBlock.matchAll(/<AbilArray[^>]*\bLink="([^"]+)"/g)].map((abilityMatch) => abilityMatch[1]));
    const unitPurchaseButtons = [...unitBlock.matchAll(/AbilCmd="([^"]+Purchase),Execute"/g)].map((buttonMatch) => buttonMatch[1]);
    for (const abilityId of unitPurchaseButtons) {
      if (!unitAbilities.has(abilityId)) {
        errors.push(`${unitId}: 购买按钮 ${abilityId},Execute 所在单位缺少 AbilArray Link="${abilityId}"`);
      }
    }
  }

  for (const abilityId of purchaseAbilityIds) {
    if (!targetAbilities.has(abilityId)) {
      errors.push(`单位购买按钮 ${abilityId},Execute 缺少对应 AbilData 定义`);
      continue;
    }

    const abilityBlock = extractCatalogBlockByPrefix(targetAbilText, 'CAbil', abilityId);
    const effectIds = collectAttributeValues(abilityBlock, 'Effect', 'value');
    const requirementIds = collectInlineAttributeValues(abilityBlock, 'Requirements');
    if (effectIds.length === 0) {
      errors.push(`${abilityId}: 购买能力缺少 Effect`);
    }
    if (requirementIds.length === 0) {
      errors.push(`${abilityId}: 购买能力缺少 NotPurchased Requirement，可能允许重复购买`);
    }

    for (const effectId of effectIds) {
      validateEffectClosure(effectId, `${abilityId}`);
    }
    for (const requirementId of requirementIds) {
      validateRequirementClosure(requirementId, `${abilityId}`);
    }
  }
}

function validateEffectClosure(effectId, context, seen = new Set()) {
  if (seen.has(effectId)) {
    return;
  }
  seen.add(effectId);

  if (!targetEffects.has(effectId)) {
    errors.push(`${context}: 缺少 Effect=${effectId}`);
    return;
  }

  const effectBlock = extractCatalogBlockByPrefix(targetEffectText, 'CEffect', effectId);
  for (const nestedEffectId of collectEffectReferenceValues(effectBlock)) {
    validateEffectClosure(nestedEffectId, `${context} -> ${effectId}`, seen);
  }
  for (const behaviorId of collectBehaviorReferenceValues(effectBlock)) {
    if (!targetBehaviors.has(behaviorId)) {
      errors.push(`${context} -> ${effectId}: 缺少 Behavior=${behaviorId}`);
    }
  }
}

function validateRequirementClosure(requirementId, context) {
  if (!targetRequirements.has(requirementId)) {
    errors.push(`${context}: 缺少 Requirement=${requirementId}`);
    return;
  }

  const requirementBlock = extractCatalogBlock(targetRequirementText, 'CRequirement', requirementId);
  for (const nodeId of collectInlineAttributeValues(requirementBlock, 'Link')) {
    validateRequirementNodeClosure(nodeId, `${context} -> ${requirementId}`);
  }
}

function validateRequirementNodeClosure(nodeId, context, seen = new Set()) {
  if (seen.has(nodeId)) {
    return;
  }
  seen.add(nodeId);

  if (!targetRequirementNodes.has(nodeId)) {
    errors.push(`${context}: 缺少 RequirementNode=${nodeId}`);
    return;
  }

  const nodeBlock = extractCatalogBlockByPrefix(targetRequirementNodeText, 'CRequirement', nodeId);
  if (/^<CRequirementCountBehavior\b/.test(nodeBlock)) {
    const behaviorIds = collectAttributeValues(nodeBlock, 'Count', 'Link');
    for (const behaviorId of behaviorIds) {
      if (!targetBehaviors.has(behaviorId)) {
        errors.push(`${context} -> ${nodeId}: CountBehavior 指向不存在的 Behavior=${behaviorId}`);
      }
    }
  }

  for (const operandId of collectOperandValues(nodeBlock)) {
    if (isRequirementLiteral(operandId)) {
      continue;
    }
    validateRequirementNodeClosure(operandId, `${context} -> ${nodeId}`, seen);
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

function validateMutaliskVariantClosure() {
  expectIdsPresent('飞龙变体 ButtonData', targetButtons, [
    'AcidSplash',
    'Blink2',
    'ChargeGlaives',
    'Enshroud',
    'Unveiled',
    'MutaliskRapidRegeneration',
    'OsteodermPlating',
    'Recuperation',
    'SynapticDisintegration',
    'Incinerate',
    'MorphtoMutaliskChar',
    'MorphtoMamba',
    'MorphtoAnkylos',
    'MorphtoMesmer',
  ]);
  expectIdsPresent('飞龙变体 WeaponData', targetWeapons, ['Fireball', 'DegenerationRay', 'CorrosiveStream']);
  expectIdsPresent('飞龙变体 EffectData', targetEffects, [
    'FireballDamage',
    'FireballLM',
    'DegenerationRay',
    'DegenerationRayBounceSet',
    'MambaSet',
    'MambaChain',
    'ApplySynapticDisintegration',
    'SynapticDisintegration',
    'AnkylosDamage',
    'AnkylosLM',
  ]);
  expectIdsPresent('飞龙变体 BehaviorData', targetBehaviors, [
    'MutaliskBaseRegeneration',
    'ChargedGlaives',
    'Enshrouded',
    'SynapticDisintegration',
    'AbathurMutaliskExplosiveGlaiveBuff',
    'AbathurMutaliskViciousGlaiveBuff',
    'AbathurMutaliskRapidRegenerationBuff',
  ]);
  expectIdsPresent('飞龙变体 AbilData', targetAbilities, [
    'ChargedGlaives',
    'NeuralCamouflage',
    'Teleport',
    'AbathurMutaliskExplosiveGlaivePurchase',
    'AbathurMutaliskViciousGlaivePurchase',
    'AbathurMutaliskRapidRegenerationPurchase',
  ]);
  expectIdsPresent('飞龙变体 ActorData', targetActors, [
    'DegenerationRayAttack',
    'DegenerationRayBeam',
    'FireballAttackMissile',
    'AnkylosAttack',
    'AnkylosAttackMissile',
    'Mutalisk2',
    'Mamba',
    'MutaliskMesmer',
    'MutaliskAnkylos',
  ]);
  expectIdsPresent('飞龙变体 ModelData', targetModels, [
    'DegenerationRay',
    'Mamba',
    'MambaPortrait',
    'Mutalisk2',
    'MutaliskPortrait2',
    'MutaliskAnkylos',
    'MutaliskAnkylosPortrait',
    'MutaliskMesmer',
    'MutaliskMesmerPortrait',
  ]);
  expectIdsPresent('飞龙变体 ValidatorData', targetValidators, [
    'CasterNotInCombat5',
    'HaveAbathurMutaliskViciousGlaiveBuff',
  ]);

  const variantSpecs = [
    {
      unit: 'MutaliskChar',
      weapon: 'Fireball',
      buttons: ['Incinerate', 'Recuperation'],
    },
    {
      unit: 'Mamba',
      weapon: 'DegenerationRay',
      behaviors: ['MutaliskBaseRegeneration'],
      buttons: ['SynapticDisintegration', 'Recuperation'],
    },
    {
      unit: 'Mesmer',
      weapon: 'GlaiveWurm',
      abilities: ['NeuralCamouflage', 'Teleport', 'ChargedGlaives'],
      behaviors: ['MutaliskBaseRegeneration'],
      buttons: ['Enshroud', 'Unveiled', 'Blink2', 'ChargeGlaives', 'Cancel', 'Recuperation'],
    },
    {
      unit: 'MutaliskAnkylos',
      weapon: 'CorrosiveStream',
      behaviors: ['MutaliskBaseRegeneration'],
      buttons: ['OsteodermPlating', 'AcidSplash', 'Recuperation'],
    },
  ];

  for (const spec of variantSpecs) {
    const block = extractCatalogBlock(targetUnitText, 'CUnit', spec.unit);
    if (!block) {
      errors.push(`飞龙变体缺少 CUnit id="${spec.unit}"`);
      continue;
    }

    for (const abilityId of [
      'AbathurMutaliskExplosiveGlaivePurchase',
      'AbathurMutaliskViciousGlaivePurchase',
      'AbathurMutaliskRapidRegenerationPurchase',
    ]) {
      if (!block.includes(`AbilArray Link="${abilityId}"`)) {
        errors.push(`${spec.unit}: 缺少兵种科技购买 AbilArray ${abilityId}`);
      }
      if (!block.includes(`AbilCmd="${abilityId},Execute"`)) {
        errors.push(`${spec.unit}: 缺少兵种科技购买按钮 ${abilityId},Execute`);
      }
    }

    if (spec.weapon && !block.includes(`WeaponArray`) && spec.weapon !== 'GlaiveWurm') {
      errors.push(`${spec.unit}: 缺少 WeaponArray`);
    }
    if (spec.weapon && !block.includes(`Link="${spec.weapon}"`)) {
      errors.push(`${spec.unit}: 未挂载武器 ${spec.weapon}`);
    }
    for (const abilityId of spec.abilities ?? []) {
      if (!block.includes(`AbilArray Link="${abilityId}"`)) {
        errors.push(`${spec.unit}: 缺少 AbilArray ${abilityId}`);
      }
    }
    for (const behaviorId of spec.behaviors ?? []) {
      if (!block.includes(`BehaviorArray Link="${behaviorId}"`)) {
        errors.push(`${spec.unit}: 缺少 BehaviorArray ${behaviorId}`);
      }
    }
    for (const face of spec.buttons ?? []) {
      if (!block.includes(`Face="${face}"`)) {
        errors.push(`${spec.unit}: 单位面板缺少按钮 Face=${face}`);
      }
    }

    if (/Link="MutaliskRapidRegen"|Requirements="HaveHotS(ExplosiveGlaive|ViciousGlaive|RapidRegeneration)"/.test(block)) {
      errors.push(`${spec.unit}: 不应继承 source 的 HotS 升级型飞龙科技口径，应使用当前兵种购买 Buff`);
    }

    expectGameString(spec.unit, `Unit/Name/${spec.unit}`);
  }

  const mambaSet = extractCatalogBlock(targetEffectText, 'CEffectSet', 'MambaSet');
  for (const ref of ['DegenerationRay', 'MambaChain', 'ApplySynapticDisintegration']) {
    if (!mambaSet.includes(`value="${ref}"`)) {
      errors.push(`MambaSet 未引用 ${ref}`);
    }
  }

  const mambaChain = extractCatalogBlock(targetEffectText, 'CEffectEnumArea', 'MambaChain');
  if (!mambaChain.includes('ValidatorArray value="HaveAbathurMutaliskViciousGlaiveBuff"')) {
    errors.push('MambaChain 必须由 AbathurMutaliskViciousGlaiveBuff 购买行为驱动');
  }
  if (!mambaChain.includes('Effect="DegenerationRayBounceSet"')) {
    errors.push('MambaChain 未指向 DegenerationRayBounceSet');
  }

  const synapticBehavior = extractCatalogBlock(targetBehaviorText, 'CBehaviorBuff', 'SynapticDisintegration');
  if (!synapticBehavior.includes('PeriodicEffect value="SynapticDisintegration"')) {
    errors.push('SynapticDisintegration Behavior 未周期性触发同名伤害效果');
  }

  const neuralCamouflage = extractCatalogBlock(targetAbilText, 'CAbilBehavior', 'NeuralCamouflage');
  if (!neuralCamouflage.includes('BehaviorArray value="Enshrouded"')) {
    errors.push('NeuralCamouflage 未挂载 Enshrouded 行为');
  }
  const chargedGlaives = extractCatalogBlock(targetAbilText, 'CAbilBehavior', 'ChargedGlaives');
  if (!chargedGlaives.includes('BehaviorArray value="ChargedGlaives"')) {
    errors.push('ChargedGlaives Ability 未挂载同名行为');
  }

  for (const key of [
    'Button/Name/Incinerate',
    'Button/Name/SynapticDisintegration',
    'Button/Name/Enshroud',
    'Button/Name/Blink2',
    'Button/Name/ChargeGlaives',
    'Button/Tooltip/Mamba',
    'Button/Tooltip/Mesmer',
    'Button/Tooltip/MutaliskAnkylos',
    'Button/Tooltip/MutaliskChar',
  ]) {
    expectGameString('飞龙变体本地化', key);
  }
}

function validateFinalFourVariantClosure() {
  const zerglingPurchases = [
    'AbathurZerglingStealthlingPurchase',
    'AbathurZerglingKetamineInfusionPurchase',
    'AbathurZerglingKleptomaniaPurchase',
    'AbathurZerglingMoonragePurchase',
    'AbathurZerglingArmoredCarapacePurchase',
  ];
  const roachPurchases = [
    'AbathurRoachMeleeStrainPurchase',
    'AbathurRoachBanelingGestationPurchase',
    'AbathurRoachRoachlingInfestationPurchase',
    'AbathurRoachBileShieldPurchase',
    'AbathurRoachAdrenalineOverdosePurchase',
  ];
  const hydraliskPurchases = [
    'AbathurHydraliskCripplePurchase',
    'AbathurHydraliskBroodlingsPurchase',
    'AbathurHydraliskMechanicalPurchase',
    'AbathurHydraliskRangePurchase',
    'AbathurHydraliskMeleePurchase',
  ];

  expectIdsPresent('重生阿巴瑟最终四变体 UnitData', targetUnits, [
    'Pygalisk',
    'ZerglingToxic',
    'ToxicZerglingBurrowed',
    'Igniter',
    'IgniterBurrowed',
    'Hydralisk2',
    'HydraliskParalyticBurrowed',
  ]);
  expectIdsPresent('重生阿巴瑟最终四变体 AbilData', targetAbilities, [
    ...zerglingPurchases,
    ...roachPurchases,
    ...hydraliskPurchases,
    'AbathurToxicZerglingBurrow',
    'AbathurUnburrowToxicZergling',
    'AbathurBurrowIgniter',
    'AbathurUnburrowIgniter',
    'AbathurBurrowParalyticHydralisk',
    'AbathurUnburrowToxicHydralisk',
  ]);
  expectIdsPresent('重生阿巴瑟最终四变体 WeaponData', targetWeapons, [
    'AbathurZerglingPoisonedFangs',
    'AbathurIgniterFireBreath',
    'AbathurHydraliskParalyticSpines',
  ]);
  expectIdsPresent('重生阿巴瑟最终四变体 EffectData', targetEffects, [
    'AbathurZerglingPoisonClawsSet',
    'AbathurZerglingPoisonClawsApply',
    'AbathurZerglingPoisonClawsDamage',
    'AbathurIgniterAttackSet',
    'AbathurIgniterEffectSet',
    'AbathurIgniterAttackSearch',
    'AbathurIgniterAttackDamage',
    'AbathurIgniterApplyScorch',
    'AbathurIgniterApplyMolten',
    'AbathurIgniterBurnDamage',
    'AbathurRebornRoachlingSpawn',
    'AbathurRebornRoachlingTimedLifeAB',
    'AbathurHydraliskParalyticSet',
    'AbathurHydraliskParalyticSpinesLM',
    'AbathurHydraliskParalyticSpinesDamage',
    'AbathurHydraliskInfestBroodlingsApply',
    'AbathurHydraliskInfestBroodlingsDeathCU',
    'AbathurHydraliskCrippledApply',
  ]);
  expectIdsPresent('重生阿巴瑟最终四变体 BehaviorData', targetBehaviors, [
    'AbathurPygaliskResistanceBuff',
    'AbathurZerglingEvasionBuff',
    'AbathurZerglingStealthlingBuff',
    'AbathurZerglingPoisonFangBuff',
    'AbathurRoachRoachlingInfestationBuff',
    'AbathurRebornRoachlingTimedLife',
    'AbathurIgniterScorchingBreathBuff',
    'AbathurIgniterMoltenBreathBuff',
    'AbathurHydraliskBroodlingsBuff',
    'AbathurHydraliskInfestBroodlings',
    'AbathurHydraliskCrippleBuff',
    'AbathurHydraliskCrippledBuff',
  ]);
  expectIdsPresent('重生阿巴瑟最终四变体 ValidatorData', targetValidators, [
    'AbathurHydraliskCripplePurchased',
    'AbathurHydraliskBroodlingsPurchased',
  ]);
  expectIdsPresent('重生阿巴瑟最终四变体 ActorData', targetActors, [
    'ToxicZergling',
    'ZerglingAttack2',
    'ParalyticHydralisk',
    'ParalyticHydraliskAttack',
    'Igniter',
    'AbathurIgniterAttackImpact',
    'AbathurIgniterAttackLaunch',
  ]);
  expectIdsPresent('重生阿巴瑟最终四变体 ModelData', targetModels, [
    'ParalyticHydralisk',
    'ParalyticHydraliskDeath',
    'ParalyticHydraliskPortrait',
    'AbathurIgniterAttackImpactModel',
    'AbathurIgniterAttackLaunchModel',
  ]);

  const unitSpecs = [
    {
      unit: 'Pygalisk',
      purchases: zerglingPurchases,
      behaviors: ['AbathurPygaliskResistanceBuff', 'AbathurZerglingEvasionBuff'],
      buttons: ['AbathurZerglingStealthling', 'AbathurZerglingArmoredCarapace', 'AbathurPygaliskMinorSplash'],
    },
    {
      unit: 'ZerglingToxic',
      purchases: zerglingPurchases,
      abilities: ['AbathurToxicZerglingBurrow'],
      behaviors: ['AbathurZerglingEvasionBuff'],
      weapon: 'AbathurZerglingPoisonedFangs',
      buttons: ['AbathurZerglingPoisonedFangs', 'AbathurZerglingEvasion', 'BurrowDown'],
    },
    {
      unit: 'Igniter',
      purchases: roachPurchases,
      abilities: ['AbathurBurrowIgniter'],
      behaviors: ['AbathurRoachAdaptivePlatingLowBuff', 'AbathurRoachAdaptivePlatingHighBuff'],
      weapon: 'AbathurIgniterFireBreath',
      buttons: ['AbathurIgniterScorchingBreath', 'AbathurRoachPlatedExoskeleton', 'BurrowDown'],
    },
    {
      unit: 'Hydralisk2',
      purchases: hydraliskPurchases,
      abilities: ['AbathurBurrowParalyticHydralisk', 'HydraliskFrenzy'],
      weapon: 'AbathurHydraliskParalyticSpines',
      buttons: ['AbathurHydraliskVenomSpines', 'HydraliskFrenzy', 'BurrowDown'],
    },
  ];

  for (const spec of unitSpecs) {
    const block = extractCatalogBlock(targetUnitText, 'CUnit', spec.unit);
    if (!block) {
      continue;
    }
    for (const abilityId of [...(spec.purchases ?? []), ...(spec.abilities ?? [])]) {
      if (!block.includes(`AbilArray Link="${abilityId}"`)) {
        errors.push(`${spec.unit}: 缺少 AbilArray Link="${abilityId}"`);
      }
    }
    for (const abilityId of spec.purchases ?? []) {
      if (!block.includes(`AbilCmd="${abilityId},Execute"`)) {
        errors.push(`${spec.unit}: 单位面板缺少购买按钮 ${abilityId},Execute`);
      }
    }
    if (spec.weapon && !block.includes(`WeaponArray Link="${spec.weapon}"`)) {
      errors.push(`${spec.unit}: 未挂载武器 ${spec.weapon}`);
    }
    for (const behaviorId of spec.behaviors ?? []) {
      if (!block.includes(`BehaviorArray`) || !block.includes(`Link="${behaviorId}"`)) {
        errors.push(`${spec.unit}: 缺少 BehaviorArray ${behaviorId}`);
      }
    }
    for (const face of spec.buttons ?? []) {
      if (!block.includes(`Face="${face}"`)) {
        errors.push(`${spec.unit}: 单位面板缺少按钮 Face=${face}`);
      }
    }
    if (/Requirements="Zagara"|HaveDehakaGlevigRoachFireBreath|K5InfestBroodlings/.test(block)) {
      errors.push(`${spec.unit}: 不应保留 Zagara/Dehaka/Kerrigan 跨指挥官依赖`);
    }
    if (/HotSRoachDamage|HotSRoachShield|HotSRedundantMembranes|HotSZerglingFrenzy|HotSMetabolicBoost|HaveHotSGroovedSpines|HaveHotSHydraliskHealth/.test(block)) {
      errors.push(`${spec.unit}: 不应保留 source/HotS 升级显示口径，应使用本地购买 Buff`);
    }
  }

  const burrowChecks = [
    ['ToxicZerglingBurrowed', 'AbathurUnburrowToxicZergling'],
    ['IgniterBurrowed', 'AbathurUnburrowIgniter'],
    ['HydraliskParalyticBurrowed', 'AbathurUnburrowToxicHydralisk'],
  ];
  for (const [unitId, abilityId] of burrowChecks) {
    const block = extractCatalogBlock(targetUnitText, 'CUnit', unitId);
    if (!block.includes(`AbilArray Link="${abilityId}"`) || !block.includes(`AbilCmd="${abilityId},Execute"`)) {
      errors.push(`${unitId}: 潜地形态缺少反潜 Ability/Button ${abilityId}`);
    }
    if (/HotSRoachDamage|HotSRoachShield|HotSRedundantMembranes|HotSZerglingFrenzy|HotSMetabolicBoost/.test(block)) {
      errors.push(`${unitId}: 潜地形态不应保留 source/HotS 升级显示口径`);
    }
  }

  const poisonWeapon = extractCatalogBlockByPrefix(targetWeaponText, 'CWeapon', 'AbathurZerglingPoisonedFangs');
  if (!poisonWeapon.includes('Effect value="AbathurZerglingPoisonClawsSet"')) {
    errors.push('AbathurZerglingPoisonedFangs 未指向 AbathurZerglingPoisonClawsSet');
  }
  const poisonSet = extractCatalogBlock(targetEffectText, 'CEffectSet', 'AbathurZerglingPoisonClawsSet');
  for (const ref of ['AbathurZerglingPoisonClawsApply', 'AbathurZerglingPoisonClawsDamage']) {
    if (!poisonSet.includes(`value="${ref}"`)) {
      errors.push(`AbathurZerglingPoisonClawsSet 未引用 ${ref}`);
    }
  }

  const igniterWeapon = extractCatalogBlockByPrefix(targetWeaponText, 'CWeapon', 'AbathurIgniterFireBreath');
  if (!igniterWeapon.includes('Effect value="AbathurIgniterAttackSet"')) {
    errors.push('AbathurIgniterFireBreath 未指向 AbathurIgniterAttackSet');
  }
  const igniterSet = extractCatalogBlock(targetEffectText, 'CEffectSet', 'AbathurIgniterEffectSet');
  for (const ref of ['AbathurIgniterAttackDamage', 'AbathurIgniterApplyMolten', 'AbathurIgniterApplyScorch']) {
    if (!igniterSet.includes(`value="${ref}"`)) {
      errors.push(`AbathurIgniterEffectSet 未引用 ${ref}`);
    }
  }
  if (/HaveDehakaGlevigRoachFireBreath/.test(targetActorText) || /HaveDehakaGlevigRoachFireBreath/.test(targetEffectText)) {
    errors.push('Igniter 链路不允许引入 Dehaka/Glevig 火焰吐息 Validator');
  }

  const hydraWeapon = extractCatalogBlockByPrefix(targetWeaponText, 'CWeapon', 'AbathurHydraliskParalyticSpines');
  if (!hydraWeapon.includes('Effect value="AbathurHydraliskParalyticSpinesLM"')) {
    errors.push('AbathurHydraliskParalyticSpines 未指向 AbathurHydraliskParalyticSpinesLM');
  }
  const hydraSet = extractCatalogBlock(targetEffectText, 'CEffectSet', 'AbathurHydraliskParalyticSet');
  for (const ref of ['AbathurHydraliskParalyticSpinesDamage', 'AbathurHydraliskVenomStrikeApply', 'AbathurHydraliskInfestBroodlingsApply', 'AbathurHydraliskCrippledApply']) {
    if (!hydraSet.includes(`value="${ref}"`)) {
      errors.push(`AbathurHydraliskParalyticSet 未引用 ${ref}`);
    }
  }
  const broodlingApply = extractCatalogBlock(targetEffectText, 'CEffectApplyBehavior', 'AbathurHydraliskInfestBroodlingsApply');
  if (!broodlingApply.includes('Behavior value="AbathurHydraliskInfestBroodlings"')) {
    errors.push('AbathurHydraliskInfestBroodlingsApply 未挂本地 AbathurHydraliskInfestBroodlings 行为');
  }
  const broodlingBehavior = extractCatalogBlock(targetBehaviorText, 'CBehaviorBuff', 'AbathurHydraliskInfestBroodlings');
  if (!broodlingBehavior.includes('DeathResponse Chance="1" Effect="AbathurHydraliskInfestBroodlingsDeathCU"')) {
    errors.push('AbathurHydraliskInfestBroodlings 未在目标死亡时触发本地 DeathCU');
  }
  const broodlingDeath = extractCatalogBlock(targetEffectText, 'CEffectCreateUnit', 'AbathurHydraliskInfestBroodlingsDeathCU');
  if (!broodlingDeath.includes('SpawnUnit value="Broodling"')) {
    errors.push('AbathurHydraliskInfestBroodlingsDeathCU 未产出 Broodling');
  }
  if (/K5InfestBroodlings/.test(targetEffectText) || /K5InfestBroodlings/.test(targetBehaviorText)) {
    errors.push('Hydralisk2 巢虫链不应直接引用 Kerrigan K5InfestBroodlings');
  }

  const roachlingBuff = extractCatalogBlock(targetBehaviorText, 'CBehaviorBuff', 'AbathurRoachRoachlingInfestationBuff');
  if (!roachlingBuff.includes('DamageResponse Handled="AbathurRebornRoachlingSpawn"')) {
    errors.push('AbathurRoachRoachlingInfestationBuff 未通过 DamageResponse 生成小蟑螂');
  }
  const roachlingSpawn = extractCatalogBlock(targetEffectText, 'CEffectCreateUnit', 'AbathurRebornRoachlingSpawn');
  if (!roachlingSpawn.includes('SpawnUnit value="Roachling"') || !roachlingSpawn.includes('SpawnEffect value="AbathurRebornRoachlingTimedLifeAB"')) {
    errors.push('AbathurRebornRoachlingSpawn 必须产出 Roachling 并挂本地 TimedLife');
  }
}

function validateNoxiousUltraliskClosure() {
  expectIdsPresent('Noxious 雷兽 ButtonData', targetButtons, ['Strider']);

  const unitBlock = extractCatalogBlock(targetUnitText, 'CUnit', 'HotSNoxious');
  if (!unitBlock) {
    errors.push('Noxious 雷兽缺少 CUnit id="HotSNoxious"');
    return;
  }

  for (const token of [
    'Collide index="Ground" value="0"',
    'Collide index="Structure" value="1"',
    'Collide index="Small" value="0"',
    'LayoutButtons Face="Strider" Type="Passive"',
  ]) {
    if (!unitBlock.includes(token)) {
      errors.push(`HotSNoxious 单位覆盖缺少源 Mod 关键字段: ${token}`);
    }
  }

  expectGameString('Noxious 雷兽本地化', 'Button/Name/Strider');
  expectGameString('Noxious 雷兽本地化', 'Button/Tooltip/Strider');
}

function validateBileTitanClosure() {
  expectIdsPresent('BileTitan UnitData', targetUnits, ['BileTitan', 'SpewMissile']);
  expectIdsPresent('BileTitan ButtonData', targetButtons, ['Spew', 'Suicide', 'Strider']);
  expectIdsPresent('BileTitan WeaponData', targetWeapons, ['Spew']);
  expectIdsPresent('BileTitan BehaviorData', targetBehaviors, ['Explode', 'ImmobilizeBileTitan', 'ToxicAcid']);
  expectIdsPresent('BileTitan EffectData', targetEffects, [
    'Dummy',
    'ExplodeRemoveBehavior',
    'ExplodeSearchArea',
    'ExplodeSet',
    'BileTitanAcidDamage',
    'SpewApplyDebuff',
    'SpewApplyImmobilizeBehavior',
    'SpewCreatePersistent',
    'SpewLaunchMissile',
    'SpewRemoveImmobilizeBehavior',
    'SpewSearchArea',
  ]);
  expectIdsPresent('BileTitan ValidatorData', targetValidators, ['CasterNotDeadandTargetNotInvulnerable']);
  expectIdsPresent('BileTitan ModelData', targetModels, [
    'AcidPool',
    'BileTitan',
    'BileTitanAcidDebuff',
    'BileTitanDeath',
    'BileTitanPortrait',
    'SpewMissile',
  ]);
  expectIdsPresent('BileTitan ActorData', targetActors, [
    'AcidDebuff',
    'AcidPool',
    'AcidPoolSound',
    'BileTitan',
    'Left2Die_Kaboomer_Ambience',
    'Spew',
    'SpewInitialLaunch',
    'SpewMissile',
  ]);
  expectIdsPresent('BileTitan MoverData', targetMovers, ['Spew']);
  expectIdsPresent('BileTitan SoundData', targetSounds, [
    'Kaboomer_Suicide',
    'Left2Die_Kaboomer_Ambience',
    'Left2Die_Kaboomer_Attack',
    'SpewImpact',
  ]);

  const unitBlock = extractCatalogBlock(targetUnitText, 'CUnit', 'BileTitan');
  if (!unitBlock) {
    errors.push('BileTitan 缺少 CUnit id="BileTitan"');
    return;
  }
  for (const token of [
    'BehaviorArray Link="Explode"',
    'WeaponArray Link="Spew"',
    'Face="Spew" Type="Passive"',
    'Face="Suicide" Type="Passive"',
    'Face="Strider" Type="Passive"',
  ]) {
    if (!unitBlock.includes(token)) {
      errors.push(`BileTitan 单位面板/能力闭包缺少: ${token}`);
    }
  }

  const spewWeapon = extractCatalogBlock(targetWeaponText, 'CWeaponLegacy', 'Spew');
  if (!spewWeapon.includes('Effect value="SpewCreatePersistent"')) {
    errors.push('BileTitan/Spew 武器必须指向 SpewCreatePersistent');
  }
  if (!spewWeapon.includes('DisplayEffect value="BileTitanAcidDamage"')) {
    errors.push('BileTitan/Spew 武器必须显示 BileTitanAcidDamage');
  }

  const persistent = extractCatalogBlock(targetEffectText, 'CEffectCreatePersistent', 'SpewCreatePersistent');
  for (const token of [
    'PeriodicValidator value="CasterNotDeadandTargetNotInvulnerable"',
    'PeriodicEffectArray value="SpewLaunchMissile"',
    'PeriodicEffectArray value="SpewSearchArea"',
  ]) {
    if (!persistent.includes(token)) {
      errors.push(`SpewCreatePersistent 缺少: ${token}`);
    }
  }

  const missileEffect = extractCatalogBlock(targetEffectText, 'CEffectLaunchMissile', 'SpewLaunchMissile');
  if (!missileEffect.includes('AmmoUnit value="SpewMissile"')) {
    errors.push('SpewLaunchMissile 必须发射 SpewMissile');
  }

  const search = extractCatalogBlock(targetEffectText, 'CEffectEnumArea', 'SpewSearchArea');
  if (!search.includes('AreaArray Radius="1.2" Effect="SpewApplyDebuff"')) {
    errors.push('SpewSearchArea 必须在范围内应用 SpewApplyDebuff');
  }

  const debuff = extractCatalogBlock(targetBehaviorText, 'CBehaviorBuff', 'ToxicAcid');
  if (!debuff.includes('PeriodicEffect value="BileTitanAcidDamage"')) {
    errors.push('ToxicAcid 必须周期性触发 BileTitanAcidDamage');
  }

  const explodeSet = extractCatalogBlock(targetEffectText, 'CEffectSet', 'ExplodeSet');
  for (const ref of ['ExplodeRemoveBehavior', 'ExplodeSearchArea', 'Suicide']) {
    if (!explodeSet.includes(`value="${ref}"`)) {
      errors.push(`ExplodeSet 未引用 ${ref}`);
    }
  }

  expectGameString('BileTitan 本地化', 'Unit/Name/BileTitan');
  expectGameString('BileTitan 本地化', 'Unit/Name/SpewMissile');
  expectGameString('BileTitan 本地化', 'Button/Name/Spew');
  expectGameString('BileTitan 本地化', 'Button/Tooltip/Spew');
  expectGameString('BileTitan 本地化', 'Button/Tooltip/BileTitan');
  expectGameString('BileTitan 本地化', 'Behavior/Name/ToxicAcid');
}

function validateFrostFiendClosure() {
  expectIdsPresent('FrostFiend UnitData', targetUnits, ['FrostFiend', 'FrostFiendBurrowed', 'FrozenShards']);
  expectIdsPresent('FrostFiend AbilData', targetAbilities, ['FrostFiendBurrow', 'FrostFiendUnburrow']);
  expectIdsPresent('FrostFiend WeaponData', targetWeapons, ['FrozenShards']);
  expectIdsPresent('FrostFiend EffectData', targetEffects, [
    'FrostFiendBoltLM',
    'FrozenShardsDamage',
    'FrozenShardsMissile',
  ]);
  expectIdsPresent('FrostFiend BehaviorData', targetBehaviors, ['BanelingLifesteal']);
  expectIdsPresent('FrostFiend ButtonData', targetButtons, ['PiercingShards']);
  expectIdsPresent('FrostFiend ModelData', targetModels, [
    'FrostFiend',
    'FrostFiendBolt',
    'FrostFiendDeath',
    'FrostFiendPortrait',
  ]);
  expectIdsPresent('FrostFiend ActorData', targetActors, ['FrostFiend', 'FrostFiendBolt']);

  const unitBlock = extractCatalogBlock(targetUnitText, 'CUnit', 'FrostFiend');
  if (!unitBlock) {
    errors.push('FrostFiend 缺少 CUnit id="FrostFiend"');
    return;
  }
  for (const token of [
    'AbilArray Link="FrostFiendBurrow"',
    'BehaviorArray Link="BanelingLifesteal"',
    'WeaponArray Link="FrozenShards"',
    'Face="PiercingShards" Type="Passive"',
  ]) {
    if (!unitBlock.includes(token)) {
      errors.push(`FrostFiend 单位闭包缺少: ${token}`);
    }
  }

  const burrow = extractCatalogBlock(targetAbilText, 'CAbilMorph', 'FrostFiendBurrow');
  if (!burrow.includes('InfoArray Unit="FrostFiendBurrowed"')) {
    errors.push('FrostFiendBurrow 必须变形为 FrostFiendBurrowed');
  }
  const unburrow = extractCatalogBlock(targetAbilText, 'CAbilMorph', 'FrostFiendUnburrow');
  if (!unburrow.includes('InfoArray Unit="FrostFiend"')) {
    errors.push('FrostFiendUnburrow 必须变回 FrostFiend');
  }

  const weapon = extractCatalogBlock(targetWeaponText, 'CWeaponLegacy', 'FrozenShards');
  if (!weapon.includes('Effect value="FrostFiendBoltLM"')) {
    errors.push('FrozenShards 武器必须指向 FrostFiendBoltLM');
  }
  const persistent = extractCatalogBlock(targetEffectText, 'CEffectCreatePersistent', 'FrostFiendBoltLM');
  if (!persistent.includes('PeriodicEffectArray value="FrozenShardsMissile"')) {
    errors.push('FrostFiendBoltLM 必须周期性发射 FrozenShardsMissile');
  }
  const missile = extractCatalogBlock(targetEffectText, 'CEffectLaunchMissile', 'FrozenShardsMissile');
  if (!missile.includes('AmmoUnit value="FrozenShards"')) {
    errors.push('FrozenShardsMissile 必须使用 FrozenShards 弹体');
  }

  expectGameString('FrostFiend 本地化', 'Unit/Name/FrostFiend');
  expectGameString('FrostFiend 本地化', 'Unit/Name/FrozenShards');
  expectGameString('FrostFiend 本地化', 'Button/Name/PiercingShards');
  expectGameString('FrostFiend 本地化', 'Button/Tooltip/FrostFiend');
  expectGameString('FrostFiend 本地化', 'Button/Tooltip/PiercingShards');
  expectGameString('FrostFiend 本地化', 'Weapon/Name/FrozenShards');
}

function validateAbathurRebornSwarmHostVariantClosure() {
  expectIdsPresent('重生阿巴瑟宿主变体 UnitData', targetUnits, [
    'BaneHost',
    'BaneHostBurrowed',
    'VespidHost',
    'Vespid',
    'VespidWeapon',
  ]);
  expectIdsPresent('重生阿巴瑟宿主变体 AbilData', targetAbilities, [
    'BanelingLaunch',
    'BurrowBaneHost',
    'UnburrowBaneHost',
    'VespidHangar',
  ]);
  expectIdsPresent('重生阿巴瑟宿主变体 WeaponData', targetWeapons, [
    'BanelingSpawn',
    'VespidAcid',
    'AcidSpit',
  ]);
  expectIdsPresent('重生阿巴瑟宿主变体 EffectData', targetEffects, [
    'BaneHostCreateSet',
    'BaneHostEggAnimationAB',
    'BaneHostCreateUnitA',
    'BaneHostCreateUnitB',
    'BaneHostCreateSetA',
    'BaneHostCreateSetB',
    'BaneHostMakePrecursorBaneling',
    'BaneHostSpawnerActive',
    'BaneHostCreateLMA',
    'BaneHostCreateLMB',
    'BaneHostCreateLMImpactSetA',
    'BaneHostCreateLMImpactSetB',
    'BaneHostRemovePrecursorBaneling',
    'BaneHostIssueOrder',
    'BaneHostCollisionNegate',
    'BaneHostTimedLife',
    'VespidDamage',
    'VespidLaunchMissile',
  ]);
  expectIdsPresent('重生阿巴瑟宿主变体 ButtonData', targetButtons, [
    'BaneMobileSpawner',
    'UnburrowBaneHost',
  ]);
  expectIdsPresent('重生阿巴瑟宿主变体 RequirementData', targetRequirements, ['ArmVespidEscort']);
  expectIdsPresent('重生阿巴瑟宿主变体 RequirementNodeData', targetRequirementNodes, [
    'CountUnitVespidQueuedOrBetterAtUnit',
    'LTCountUnitVespidQueuedOrBetterAtUnit2',
  ]);
  expectIdsPresent('重生阿巴瑟宿主变体 ActorData', targetActors, [
    'BaneHost',
    'BanelingEggAAttack',
    'BanelingEggBAttack',
    'VespidHost',
    'VespidWeapon',
    'VespidAttack',
  ]);
  expectIdsPresent('重生阿巴瑟宿主变体 ModelData', targetModels, [
    'BaneHost',
    'BaneHostDeath',
    'BaneHostPortrait',
    'VespidHost',
    'VespidHostPortrait',
  ]);

  const baneHost = extractCatalogBlock(targetUnitText, 'CUnit', 'BaneHost');
  const baneHostBurrowed = extractCatalogBlock(targetUnitText, 'CUnit', 'BaneHostBurrowed');
  const vespidHost = extractCatalogBlock(targetUnitText, 'CUnit', 'VespidHost');
  const vespid = extractCatalogBlock(targetUnitText, 'CUnit', 'Vespid');
  for (const [unitId, block] of [
    ['BaneHost', baneHost],
    ['BaneHostBurrowed', baneHostBurrowed],
    ['VespidHost', vespidHost],
    ['Vespid', vespid],
  ]) {
    if (/Requirements="(?:HaveHotS|ShowHeavyAir|Zagara)/.test(block)) {
      errors.push(`${unitId}: 不应保留 source-only Requirement`);
    }
  }

  for (const token of [
    'AbilArray Link="BanelingLaunch"',
    'AbilArray Link="BurrowBaneHost"',
    'AbilArray Link="AbathurHostRapidIncubationPurchase"',
    'AbilArray Link="AbathurHostLocustSpeedPurchase"',
    'AbilArray Link="AbathurHostPressurizedGlandsPurchase"',
    'WeaponArray Link="BanelingSpawn"',
    'Face="BaneMobileSpawner" Type="Passive"',
  ]) {
    if (!baneHost.includes(token)) {
      errors.push(`BaneHost 单位闭包缺少: ${token}`);
    }
  }

  const burrow = extractCatalogBlock(targetAbilText, 'CAbilMorph', 'BurrowBaneHost');
  if (burrow.includes('HaveHotSBurrowSwarmHost')) {
    errors.push('BurrowBaneHost 不应继续依赖 HaveHotSBurrowSwarmHost');
  }
  if (!burrow.includes('InfoArray Unit="BaneHostBurrowed"')) {
    errors.push('BurrowBaneHost 必须变形为 BaneHostBurrowed');
  }
  const unburrow = extractCatalogBlock(targetAbilText, 'CAbilMorph', 'UnburrowBaneHost');
  if (!unburrow.includes('InfoArray Unit="BaneHost"')) {
    errors.push('UnburrowBaneHost 必须变回 BaneHost');
  }

  const banelingLaunch = extractCatalogBlock(targetAbilText, 'CAbilEffectTarget', 'BanelingLaunch');
  if (!banelingLaunch.includes('Effect index="0" value="BaneHostCreateSet"')) {
    errors.push('BanelingLaunch 必须指向 BaneHostCreateSet');
  }
  const baneSet = extractCatalogBlock(targetEffectText, 'CEffectSet', 'BaneHostCreateSet');
  for (const ref of ['BaneHostEggAnimationAB', 'BaneHostCreateUnitA', 'BaneHostCreateUnitB']) {
    if (!baneSet.includes(`value="${ref}"`)) {
      errors.push(`BaneHostCreateSet 未引用 ${ref}`);
    }
  }
  const baneSetA = extractCatalogBlock(targetEffectText, 'CEffectSet', 'BaneHostCreateSetA');
  for (const ref of ['BaneHostMakePrecursorBaneling', 'BaneHostSpawnerActive', 'BaneHostCreateLMA']) {
    if (!baneSetA.includes(`value="${ref}"`)) {
      errors.push(`BaneHostCreateSetA 未引用 ${ref}`);
    }
  }
  const baneSetB = extractCatalogBlock(targetEffectText, 'CEffectSet', 'BaneHostCreateSetB');
  for (const ref of ['BaneHostMakePrecursorBaneling', 'BaneHostCreateLMB']) {
    if (!baneSetB.includes(`value="${ref}"`)) {
      errors.push(`BaneHostCreateSetB 未引用 ${ref}`);
    }
  }
  const launchA = extractCatalogBlock(targetEffectText, 'CEffectLaunchMissile', 'BaneHostCreateLMA');
  if (!launchA.includes('AmmoUnit value="AbathurRebornLocustEggAMissileWeapon"')) {
    errors.push('BaneHostCreateLMA 必须使用 AbathurRebornLocustEggAMissileWeapon');
  }
  const launchB = extractCatalogBlock(targetEffectText, 'CEffectLaunchMissile', 'BaneHostCreateLMB');
  if (!launchB.includes('AmmoUnit value="AbathurRebornLocustEggBMissileWeapon"')) {
    errors.push('BaneHostCreateLMB 必须使用 AbathurRebornLocustEggBMissileWeapon');
  }

  for (const token of [
    'AbilArray Link="VespidHangar"',
    'AbilArray Link="AbathurHostRapidIncubationPurchase"',
    'AbilArray Link="AbathurHostLocustSpeedPurchase"',
    'AbilArray Link="AbathurHostPressurizedGlandsPurchase"',
    'WeaponArray Link="VespidAcid"',
  ]) {
    if (!vespidHost.includes(token)) {
      errors.push(`VespidHost 单位闭包缺少: ${token}`);
    }
  }
  const hangar = extractCatalogBlock(targetAbilText, 'CAbilArmMagazine', 'VespidHangar');
  if (!hangar.includes('InfoArray index="Ammo1"') || !hangar.includes('Unit="Vespid"')) {
    errors.push('VespidHangar 必须挂载 Ammo1=Vespid');
  }
  if (!hangar.includes('Requirements="ArmVespidEscort"')) {
    errors.push('VespidHangar 必须使用 ArmVespidEscort 限制护航弹药数量');
  }
  const vespidLaunch = extractCatalogBlock(targetEffectText, 'CEffectLaunchMissile', 'VespidLaunchMissile');
  if (!vespidLaunch.includes('ImpactEffect value="VespidDamage"')) {
    errors.push('VespidLaunchMissile 必须指向 VespidDamage');
  }
  if (!vespidLaunch.includes('AmmoUnit value="VespidWeapon"')) {
    errors.push('VespidLaunchMissile 必须使用本地 VespidWeapon 弹体');
  }

  for (const key of [
    'Unit/Name/BaneHost',
    'Unit/Name/BaneHostBurrowed',
    'Unit/Name/VespidHost',
    'Unit/Name/Vespid',
    'Button/Name/BaneMobileSpawner',
    'Button/Name/UnburrowBaneHost',
    'Button/Tooltip/BaneMobileSpawner',
    'Button/Tooltip/VespidHost',
    'Weapon/Name/BanelingSpawn',
    'Weapon/Name/VespidAcid',
  ]) {
    expectGameString('重生阿巴瑟宿主变体本地化', key);
  }
}

function validateAbathurRebornUltraliskVariantClosure() {
  expectIdsPresent('重生阿巴瑟雷兽变体 UnitData', targetUnits, [
    'UltraliskSavage',
    'SavageBurrowed',
    'UltraliskKaldir',
  ]);
  expectIdsPresent('重生阿巴瑟雷兽变体 AbilData', targetAbilities, [
    'SavageBurrow',
    'SavageUnburrow',
    'ElectromagneticImplosion',
  ]);
  expectIdsPresent('重生阿巴瑟雷兽变体 EffectData', targetEffects, [
    'IndraSearch',
    'IndraPullBy2',
    'IndraPull2PHSet',
    'IndraPull2AB',
    'IndraPull2LM',
    'IndraPull2CP',
    'IndraPull2RB',
    'IndraSlow',
    'IndraStun',
  ]);
  expectIdsPresent('重生阿巴瑟雷兽变体 BehaviorData', targetBehaviors, [
    'FirstbornStrain',
    'IndraSlow',
    'IndraStun',
  ]);
  expectIdsPresent('重生阿巴瑟雷兽变体 ButtonData', targetButtons, [
    'SavageStrain',
    'ElectromagneticImplosion',
  ]);
  expectIdsPresent('重生阿巴瑟雷兽变体 ActorData', targetActors, [
    'Ultralisk2',
    'Indra',
    'IndraExplosion',
    'IndraExplosionImpactModel',
  ]);
  expectIdsPresent('重生阿巴瑟雷兽变体 ModelData', targetModels, [
    'Indra',
    'IndraPortrait',
    'IndraExplosion',
  ]);
  expectIdsPresent('重生阿巴瑟雷兽变体 MoverData', targetMovers, ['TychusShredderGrenadeUnitKnockbackMover']);

  const savage = extractCatalogBlock(targetUnitText, 'CUnit', 'UltraliskSavage');
  const kaldir = extractCatalogBlock(targetUnitText, 'CUnit', 'UltraliskKaldir');
  for (const [unitId, block] of [
    ['UltraliskSavage', savage],
    ['UltraliskKaldir', kaldir],
  ]) {
    if (/Requirements="(?:HaveHotS|ShowHeavyAir|Zagara)/.test(block)) {
      errors.push(`${unitId}: 不应保留 source-only Requirement`);
    }
  }
  for (const token of [
    'AbilArray Link="SavageBurrow"',
    'BehaviorArray Link="FirstbornStrain"',
    'WeaponArray Link="KaiserBlades"',
    'Face="SavageStrain" Type="Passive"',
  ]) {
    if (!savage.includes(token)) {
      errors.push(`UltraliskSavage 单位闭包缺少: ${token}`);
    }
  }
  const savageBurrow = extractCatalogBlock(targetAbilText, 'CAbilMorph', 'SavageBurrow');
  if (!savageBurrow.includes('InfoArray Unit="SavageBurrowed"')) {
    errors.push('SavageBurrow 必须变形为 SavageBurrowed');
  }
  const savageUnburrow = extractCatalogBlock(targetAbilText, 'CAbilMorph', 'SavageUnburrow');
  if (!savageUnburrow.includes('InfoArray Unit="UltraliskSavage"')) {
    errors.push('SavageUnburrow 必须变回 UltraliskSavage');
  }

  if (!kaldir.includes('AbilArray Link="ElectromagneticImplosion"')) {
    errors.push('UltraliskKaldir 必须挂载 ElectromagneticImplosion');
  }
  const implosion = extractCatalogBlock(targetAbilText, 'CAbilAugment', 'ElectromagneticImplosion');
  if (!implosion.includes('Effect value="IndraSearch"')) {
    errors.push('ElectromagneticImplosion 必须指向 IndraSearch');
  }
  const indraSearch = extractCatalogBlock(targetEffectText, 'CEffectEnumArea', 'IndraSearch');
  if (!indraSearch.includes('AreaArray Radius="4" Effect="IndraPullBy2"')) {
    errors.push('IndraSearch 必须在 4 范围内触发 IndraPullBy2');
  }
  const indraPull = extractCatalogBlock(targetEffectText, 'CEffectCreateUnit', 'IndraPullBy2');
  if (!indraPull.includes('SpawnEffect value="IndraPull2PHSet"')) {
    errors.push('IndraPullBy2 必须通过 IndraPull2PHSet 继续拉拽闭包');
  }
  const indraSet = extractCatalogBlock(targetEffectText, 'CEffectSet', 'IndraPull2PHSet');
  for (const ref of ['PrecursorUnitKnockbackAB', 'IndraStun', 'IndraSlow', 'IndraPull2AB', 'IndraPull2LM']) {
    if (!indraSet.includes(`value="${ref}"`)) {
      errors.push(`IndraPull2PHSet 未引用 ${ref}`);
    }
  }
  const indraLm = extractCatalogBlock(targetEffectText, 'CEffectLaunchMissile', 'IndraPull2LM');
  if (!indraLm.includes('ImpactEffect value="IndraPull2CP"')) {
    errors.push('IndraPull2LM 必须命中 IndraPull2CP');
  }
  if (!indraLm.includes('Movers Link="TychusShredderGrenadeUnitKnockbackMover"')) {
    errors.push('IndraPull2LM 必须使用 TychusShredderGrenadeUnitKnockbackMover');
  }
  if (indraLm.includes('TychusSGPullBy2PHLMNotDead')) {
    errors.push('IndraPull2LM 不应保留源 Mod 中未定义的 TychusSGPullBy2PHLMNotDead validator');
  }
  const indraCp = extractCatalogBlock(targetEffectText, 'CEffectCreatePersistent', 'IndraPull2CP');
  if (!indraCp.includes('PeriodicEffectArray value="IndraPull2RB"')) {
    errors.push('IndraPull2CP 必须周期性触发 IndraPull2RB');
  }

  for (const key of [
    'Unit/Name/UltraliskSavage',
    'Unit/Name/SavageBurrowed',
    'Unit/Name/UltraliskKaldir',
    'Button/Name/SavageStrain',
    'Button/Tooltip/SavageStrain',
    'Button/Name/ElectromagneticImplosion',
    'Button/Tooltip/ElectromagneticImplosion',
  ]) {
    expectGameString('重生阿巴瑟雷兽变体本地化', key);
  }
}

function validateAbathurRebornMonstrousFlierVariantClosure() {
  expectIdsPresent('重生阿巴瑟巨型飞行变体 UnitData', targetUnits, [
    'IzshaGuardian',
    'Kraken',
    'AcidBarrage',
  ]);
  expectIdsPresent('重生阿巴瑟巨型飞行变体 WeaponData', targetWeapons, [
    'AcidSpores',
    'AcidBarrage',
  ]);
  expectIdsPresent('重生阿巴瑟巨型飞行变体 AbilData', targetAbilities, [
    'AbathurKrakenAcidBarragePurchase',
    'AbathurKrakenOsteolyticAcidPurchase',
    'AbathurKrakenTitanicCarapacePurchase',
  ]);
  expectIdsPresent('重生阿巴瑟巨型飞行变体 EffectData', targetEffects, [
    'AbathurKrakenAcidBarragePurchaseEffect',
    'AbathurKrakenOsteolyticAcidPurchaseEffect',
    'AbathurKrakenTitanicCarapacePurchaseEffect',
    'AcidBarrageDamage',
    'AcidBarrageLaunchMissile',
    'AcidBarragePersistent',
  ]);
  expectIdsPresent('重生阿巴瑟巨型飞行变体 BehaviorData', targetBehaviors, [
    'AbathurKrakenAcidBarrageBuff',
    'AbathurKrakenOsteolyticAcidBuff',
    'AbathurKrakenTitanicCarapaceBuff',
  ]);
  expectIdsPresent('重生阿巴瑟巨型飞行变体 RequirementData', targetRequirements, [
    'NotAbathurKrakenAcidBarragePurchased',
    'NotAbathurKrakenOsteolyticAcidPurchased',
    'NotAbathurKrakenTitanicCarapacePurchased',
  ]);
  expectIdsPresent('重生阿巴瑟巨型飞行变体 RequirementNodeData', targetRequirementNodes, [
    'CountBehaviorAbathurKrakenAcidBarrageBuffCompleteOnlyAtUnit',
    'CountBehaviorAbathurKrakenOsteolyticAcidBuffCompleteOnlyAtUnit',
    'CountBehaviorAbathurKrakenTitanicCarapaceBuffCompleteOnlyAtUnit',
    'Eq2852615412CountBehaviorAbathurKrakenAcidBarrageBuffCompleteOnlyAtUnit0',
    'Eq2852615412CountBehaviorAbathurKrakenOsteolyticAcidBuffCompleteOnlyAtUnit0',
    'Eq2852615412CountBehaviorAbathurKrakenTitanicCarapaceBuffCompleteOnlyAtUnit0',
  ]);
  expectIdsPresent('重生阿巴瑟巨型飞行变体 ActorData', targetActors, [
    'GuardianIzsha',
    'Kraken',
    'SwarmGuardianAttack',
    'SwarmGuardianAttackMissile',
  ]);
  expectIdsPresent('重生阿巴瑟巨型飞行变体 ModelData', targetModels, [
    'IzshaGuardianDeath',
    'IzshaGuardianModel',
    'IzshaGuardianPortrait',
    'SwarmGuardian',
    'SwarmGuardianMissile',
    'SwarmGuardianPortrait',
  ]);

  const guardian = extractCatalogBlock(targetUnitText, 'CUnit', 'IzshaGuardian');
  const kraken = extractCatalogBlock(targetUnitText, 'CUnit', 'Kraken');
  for (const [unitId, block] of [
    ['IzshaGuardian', guardian],
    ['Kraken', kraken],
  ]) {
    if (/Requirements="(?:HaveHotS|ShowHeavyAir|Zagara)/.test(block)) {
      errors.push(`${unitId}: 不应保留 source-only Requirement`);
    }
  }
  for (const token of [
    'AbilArray Link="AbathurGuardianExtendedSpinesPurchase"',
    'AbilArray Link="AbathurGuardianCorrosiveBombardmentPurchase"',
    'AbilArray Link="AbathurGuardianRegenerativeSacsPurchase"',
    'WeaponArray Link="AcidSpores"',
    'WeaponArray Link="AcidSporesAir"',
  ]) {
    if (!guardian.includes(token)) {
      errors.push(`IzshaGuardian 单位闭包缺少: ${token}`);
    }
  }
  for (const token of [
    'AbilArray Link="AbathurKrakenAcidBarragePurchase"',
    'AbilArray Link="AbathurKrakenOsteolyticAcidPurchase"',
    'AbilArray Link="AbathurKrakenTitanicCarapacePurchase"',
    'WeaponArray Link="AcidBarrage"',
  ]) {
    if (!kraken.includes(token)) {
      errors.push(`Kraken 单位闭包缺少: ${token}`);
    }
  }

  for (const [abilityId, effectId, requirementId, behaviorId] of [
    ['AbathurKrakenAcidBarragePurchase', 'AbathurKrakenAcidBarragePurchaseEffect', 'NotAbathurKrakenAcidBarragePurchased', 'AbathurKrakenAcidBarrageBuff'],
    ['AbathurKrakenOsteolyticAcidPurchase', 'AbathurKrakenOsteolyticAcidPurchaseEffect', 'NotAbathurKrakenOsteolyticAcidPurchased', 'AbathurKrakenOsteolyticAcidBuff'],
    ['AbathurKrakenTitanicCarapacePurchase', 'AbathurKrakenTitanicCarapacePurchaseEffect', 'NotAbathurKrakenTitanicCarapacePurchased', 'AbathurKrakenTitanicCarapaceBuff'],
  ]) {
    const ability = extractCatalogBlockByPrefix(targetAbilText, 'CAbil', abilityId);
    if (!ability.includes(`Effect index="0" value="${effectId}"`)) {
      errors.push(`${abilityId}: 未指向 ${effectId}`);
    }
    if (!ability.includes(`Requirements="${requirementId}"`)) {
      errors.push(`${abilityId}: 未绑定 ${requirementId}`);
    }
    const effect = extractCatalogBlock(targetEffectText, 'CEffectApplyBehavior', effectId);
    if (!effect.includes(`Behavior value="${behaviorId}"`)) {
      errors.push(`${effectId}: 未应用 ${behaviorId}`);
    }
  }

  const barrageWeapon = extractCatalogBlock(targetWeaponText, 'CWeaponLegacy', 'AcidBarrage');
  if (!barrageWeapon.includes('Effect value="AcidBarragePersistent"')) {
    errors.push('AcidBarrage 武器必须指向 AcidBarragePersistent');
  }
  const barragePersistent = extractCatalogBlock(targetEffectText, 'CEffectCreatePersistent', 'AcidBarragePersistent');
  if (!barragePersistent.includes('PeriodicEffectArray value="AcidBarrageLaunchMissile"')) {
    errors.push('AcidBarragePersistent 必须发射 AcidBarrageLaunchMissile');
  }
  const barrageLaunch = extractCatalogBlock(targetEffectText, 'CEffectLaunchMissile', 'AcidBarrageLaunchMissile');
  if (!barrageLaunch.includes('AmmoUnit value="AcidBarrage"')) {
    errors.push('AcidBarrageLaunchMissile 必须使用 AcidBarrage 弹体');
  }

  for (const key of [
    'Unit/Name/IzshaGuardian',
    'Unit/Name/Kraken',
    'Unit/Name/AcidBarrage',
    'Button/Tooltip/IzshaGuardian',
    'Button/Tooltip/Kraken',
    'Button/Name/AbathurKrakenAcidBarrage',
    'Button/Tooltip/AbathurKrakenAcidBarrage',
    'Button/Name/AbathurKrakenOsteolyticAcid',
    'Button/Tooltip/AbathurKrakenOsteolyticAcid',
    'Button/Name/AbathurKrakenTitanicCarapace',
    'Button/Tooltip/AbathurKrakenTitanicCarapace',
    'Weapon/Name/AcidBarrage',
  ]) {
    expectGameString('重生阿巴瑟巨型飞行变体本地化', key);
  }
}

function expectIdsPresent(label, idSet, ids) {
  for (const id of ids) {
    if (!idSet.has(id)) {
      errors.push(`${label}: 缺少 ${id}`);
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
  const re = new RegExp(`<InfoArray\\s+index="${escapeRegExp(index)}"[^>]*(?:\\/>|>[\\s\\S]*?<\\/InfoArray>)`);
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

function extractInstanceBlock(userBlock, instanceId) {
  const instanceRe = new RegExp(`<Instances\\s+Id="${escapeRegExp(instanceId)}"[^>]*>[\\s\\S]*?<\\/Instances>`);
  return userBlock.match(instanceRe)?.[0] ?? '';
}

function extractCatalogBlock(text, tagName, id) {
  const re = new RegExp(`<${tagName}\\s+id="${escapeRegExp(id)}"[^>]*>[\\s\\S]*?<\\/${tagName}>`);
  return text.match(re)?.[0] ?? '';
}

function extractCatalogBlockByPrefix(text, tagPrefix, id) {
  const re = new RegExp(`<${tagPrefix}[A-Za-z]*\\s+id="${escapeRegExp(id)}"[^>]*>[\\s\\S]*?<\\/${tagPrefix}[A-Za-z]*>`);
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

function collectAttributeValues(block, tagName, attrName) {
  const values = [];
  const re = new RegExp(`<${tagName}[^>]*\\s${attrName}="([^"]+)"`, 'g');
  for (const match of block.matchAll(re)) {
    values.push(match[1]);
  }
  return values;
}

function collectInlineAttributeValues(block, attrName) {
  const values = [];
  const re = new RegExp(`\\s${attrName}="([^"]+)"`, 'g');
  for (const match of block.matchAll(re)) {
    values.push(match[1]);
  }
  return values.filter(Boolean);
}

function collectOperandValues(block) {
  return [...block.matchAll(/<OperandArray\b[^>]*\svalue="([^"]+)"/g)]
    .map((match) => match[1])
    .filter(Boolean);
}

function isRequirementLiteral(value) {
  return /^-?\d+(?:\.\d+)?$/.test(value);
}

function collectEffectReferenceValues(effectBlock) {
  return collectInlineAttributeValues(effectBlock, 'value')
    .filter((value) => targetEffects.has(value));
}

function collectBehaviorReferenceValues(effectBlock) {
  const values = [];
  for (const match of effectBlock.matchAll(/Behavior(?:Link)?\s+value="([^"]+)"|Behavior="([^"]+)"|BehaviorLink="([^"]+)"/g)) {
    values.push(match[1] || match[2] || match[3]);
  }
  return values.filter(Boolean);
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
