import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const xmRoot = path.join(repoRoot, '合作指挥官版起义狂潮', 'Mods', 'XM');
const xmFinalRoot = path.join(xmRoot, 'XMFinal.SC2Mod');
const xmZagaraRoot = path.join(xmRoot, 'XMZagara.SC2Mod');
const zagaraGameDataRoot = path.join(xmZagaraRoot, 'Base.SC2Data', 'GameData');

const files = {
  documentInfo: path.join(xmFinalRoot, 'DocumentInfo'),
  documentHeader: path.join(xmFinalRoot, 'DocumentHeader'),
  runtime: path.join(xmFinalRoot, 'Base.SC2Data', 'LibE0EAE146_ZagaraRuntime.galaxy'),
  finalGalaxy: path.join(xmFinalRoot, 'Base.SC2Data', 'LibE0EAE146.galaxy'),
  finalHeader: path.join(xmFinalRoot, 'Base.SC2Data', 'LibE0EAE146_h.galaxy'),
  finalUserData: path.join(xmFinalRoot, 'Base.SC2Data', 'GameData', 'UserData.xml'),
  finalRosters: path.join(xmFinalRoot, 'Base.SC2Data', 'LibE0EAE146_CommanderRosters.galaxy'),
  finalBuildings: path.join(xmFinalRoot, 'Base.SC2Data', 'LibE0EAE146_CommanderBuildings.galaxy'),
  finalUnitAbilities: path.join(xmFinalRoot, 'Base.SC2Data', 'LibE0EAE146_CommanderUnitAbilities.galaxy'),
  finalHeroAbilities: path.join(xmFinalRoot, 'Base.SC2Data', 'LibE0EAE146_CommanderHeroAbilities.galaxy'),
  unitData: path.join(zagaraGameDataRoot, 'UnitData.xml'),
  abilData: path.join(zagaraGameDataRoot, 'AbilData.xml'),
  upgradeData: path.join(zagaraGameDataRoot, 'UpgradeData.xml'),
  officialUpgradeData: path.join(
    repoRoot,
    '游戏数据',
    '官方SC2原始文本镜像',
    'mods',
    'starcoop',
    'starcoop.sc2mod',
    'base.sc2data',
    'gamedata',
    'upgradedata.xml',
  ),
};

const texts = Object.fromEntries(Object.entries(files).map(([key, filePath]) => [key, readText(filePath)]));
const errors = [];

const expectedFullLevelUpgrades = [
  ['CommanderLevel', 16],
  ['ZagaraCommander', 1],
  ['K5TwoDrones', 1],
  ['MasteryZagaraLarvaRatePassive', 1],
  ['QueenDoubleInjectLarva', 1],
  ['ZagaraBileLaunchers', 1],
  ['ZagaraVoidCoopBanelingSpawner', 1],
  ['ZagaraVoidCoopAberrationBanelingIncubation', 1],
  ['ZagaraVoidCoopImprovedMassRoachDrop', 1],
  ['CoopZerglingSwarmling', 1],
  ['CoopBanelingSplitterling', 1],
  ['ZagaraVoidCoopImprovedAbilities', 1],
];

const expectedMasteries = [
  'MasteryZagaraHealthAndEnergyRegen',
  'MasteryZagaraAutoAttackDamage',
  'MasteryZagaraMassFrenzySpeedBoost',
  'MasteryZagaraZerglingDodgeChance',
  'MasteryZagaraRoachDropDamageAndHealth',
  'MasteryZagaraBanelingsDamage',
];

const expectedPositivePrestigeSupplements = [
  'CommanderPrestigeZagaraMaxSupply',
  'CommanderPrestigeZagaraMaxSupplyScourgeCostUpgrade',
  'CommanderPrestigeZagaraCorruptorsAberrations',
  'CommanderPrestigeZagaraZagara',
  'CommanderPrestigeZagaraZagaraMastery',
];

const publicBlockedUnits = [
  'Drone',
  'Larva',
  'Overlord',
  'Hatchery',
  'Lair',
  'Hive',
  'Extractor',
  'SpawningPool',
  'EvolutionChamber',
  'Spire',
  'BanelingNest',
  'ScourgeNest',
  'SpineCrawler',
  'SporeCrawler',
  'Queen',
  'QueenCoop',
  'Zergling',
  'Baneling',
  'HotSHunter',
  'HotSSplitterlingBig',
  'Roach',
  'HunterKiller',
  'HunterKillerBurrowed',
  'InfestedAbomination',
  'Scourge',
  'Overseer',
  'OverseerSiegeMode',
];

const privateAllowedUnits = [
  'CoopCasterZagara',
  'ZagaraVoidCoop',
  'ZagaraVoidCoopBurrowed',
  'DroneZagara',
  'LarvaZagara',
  'OverlordZagara',
  'HatcheryZagara',
  'LairZagara',
  'HiveZagara',
  'ExtractorZagara',
  'SpawningPoolZagara',
  'EvolutionChamberZagara',
  'SpireZagara',
  'BanelingNestZagara',
  'ScourgeNestZagara',
  'SpineCrawlerZagara',
  'SporeCrawlerZagara',
  'BileLauncherZagara',
  'QueenZagara',
  'SwarmQueenZagara',
  'ZerglingZagara',
  'BanelingZagara',
  'HotSHunterZagara',
  'HotSSplitterlingBigZagara',
  'RoachZagara',
  'HunterKillerZagara',
  'HunterKillerBurrowedZagara',
  'InfestedAbominationZagara',
  'ScourgeZagara',
  'OverseerZagara',
  'OverseerSiegeModeZagara',
  'ZagaraCorruptor',
  'ZagaraReviveCocoon',
  'RoachMassDropDummy',
];

const privateAllowedAbilities = [
  'ZergBuildZagara',
  'LarvaTrainZagara',
  'LarvaTrainSwarmZagara',
  'TrainQueenZagara',
  'UpgradeToLairZagara',
  'UpgradeToHiveZagara',
  'MorphToOverseerZagara',
  'OverseerMorphtoOverseerSiegeZagara',
  'OverseerSiegeMorphtoOverseerZagara',
  'MorphZerglingToBanelingZagara',
  'MorphZerglingToHunterZagara',
  'MorphZerglingToSplitterlingZagara',
  'ScourgeNestResearch',
  'BanelingNestResearch',
  'evolutionchamberresearch',
  'ZagaraVoidCoopBanelingBarrage',
  'ZagaraVoidCoopSpawnHunterKillers',
  'ZagaraVoidCoopMassFrenzy',
  'ZagaraVoidCoopMassRoachDrop',
  'CommanderPrestigeZagaraZagaraDeepTunnel',
  'ZagaraVoidCoopBurrow',
  'BurrowHunterKillerZagaraUp',
];

validateDependencyGate();
validateRuntime();
validateRuntimeRoster();
validatePrivateProduction();
validateSmokeProfiles();
validatePrestigeReferenceGap();

if (errors.length > 0) {
  console.error('FAIL: Zagara official runtime validation failed');
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log('PASS: Zagara official runtime validation passed');

function validateDependencyGate() {
  const dependency = 'file:Mods\\XM\\XMZagara.SC2Mod';
  assertIncludes(stripXmlComments(texts.documentInfo), 'XMFinal DocumentInfo', `<Value>${dependency}</Value>`, 'XMZagara dependency is not active');

  const dependencies = parseDocumentHeaderDependencies(files.documentHeader);
  if (!dependencies.includes(dependency)) {
    errors.push(`XMFinal DocumentHeader: missing live dependency ${dependency}`);
  }

  assertIncludes(texts.finalGalaxy, 'XMFinal LibE0EAE146.galaxy', 'include "LibE0EAE146_ZagaraRuntime"', 'missing Zagara runtime include');
  assertIncludes(texts.finalGalaxy, 'XMFinal LibE0EAE146.galaxy', 'libE0EAE146_gf_ZagaraRuntimeInit(1, lp_secondUnit, lp_createHero);', 'InitializeBase does not dispatch to Zagara runtime');
  assertIncludes(texts.finalHeader, 'XMFinal LibE0EAE146_h.galaxy', 'void libE0EAE146_gf_ZagaraRuntimeInit', 'missing Zagara runtime declaration');
}

function validateRuntime() {
  for (const [upgrade, level] of expectedFullLevelUpgrades) {
    assertIncludes(texts.runtime, 'Zagara runtime', `libE0EAE146_gf_ZagaraSetUpgradeAtLeast(lp_player, "${upgrade}", ${level});`, `missing full-level upgrade grant ${upgrade}=${level}`);
  }

  for (const mastery of expectedMasteries) {
    assertIncludes(texts.runtime, 'Zagara runtime', `libE0EAE146_gf_ZagaraSetUpgradeAtLeast(lp_player, "${mastery}", 30);`, `missing mastery grant ${mastery}=30`);
  }

  for (const upgrade of expectedPositivePrestigeSupplements) {
    assertIncludes(texts.runtime, 'Zagara runtime', `libE0EAE146_gf_ZagaraSetUpgradeAtLeast(lp_player, "${upgrade}", 1);`, `missing positive prestige grant ${upgrade}`);
  }

  for (const unit of publicBlockedUnits) {
    assertIncludes(texts.runtime, 'Zagara runtime', `libE0EAE146_gf_ZagaraBlockUnitIfPresent(lp_player, "${unit}");`, `runtime must block public ${unit}`);
  }

  for (const unit of privateAllowedUnits) {
    assertIncludes(texts.runtime, 'Zagara runtime', `libE0EAE146_gf_ZagaraAllowUnitIfPresent(lp_player, "${unit}");`, `runtime must allow private ${unit}`);
  }

  for (const ability of privateAllowedAbilities) {
    assertIncludes(texts.runtime, 'Zagara runtime', `libE0EAE146_gf_ZagaraAllowAbilityIfPresent(lp_player, "${ability}", 0);`, `runtime must allow ${ability}`);
  }
}

function validateRuntimeRoster() {
  const block = getXmlBlock(texts.finalUserData, 'Instances', 'Zagara');
  if (!block) {
    errors.push('XMFinal UserData.xml: missing CommanderRuntimeRoster/Zagara');
    return;
  }

  assertIncludes(block, 'CommanderRuntimeRoster/Zagara', '<Int Int="34"><Field Id="Count"/></Int>', 'Zagara runtime roster count must match private closure');
  for (const unitId of privateAllowedUnits) {
    assertIncludes(block, 'CommanderRuntimeRoster/Zagara', `<Unit Unit="${unitId}"><Field Id="RuntimeUnit"`, `runtime roster missing ${unitId}`);
  }

  assertIncludes(block, 'CommanderRuntimeRoster/Zagara', '<Unit Unit="QueenZagara"><Field Id="RuntimeUnit" Index="6"/></Unit>', 'runtime roster must include QueenZagara');
}

function validatePrivateProduction() {
  const larvaTrain = getXmlBlock(texts.abilData, 'CAbilTrain', 'LarvaTrainZagara') ?? '';
  const larvaTrainSwarm = getXmlBlock(texts.abilData, 'CAbilTrain', 'LarvaTrainSwarmZagara') ?? '';
  const zergling = getXmlBlock(texts.unitData, 'CUnit', 'ZerglingZagara') ?? '';
  const overseer = getXmlBlock(texts.unitData, 'CUnit', 'OverseerZagara') ?? '';
  const overseerSiege = getXmlBlock(texts.unitData, 'CUnit', 'OverseerSiegeModeZagara') ?? '';

  assertIncludes(larvaTrain, 'LarvaTrainZagara', '<Unit value="DroneZagara" />', 'LarvaTrainZagara must produce DroneZagara');
  assertIncludes(larvaTrain, 'LarvaTrainZagara', '<Unit value="OverlordZagara" />', 'LarvaTrainZagara must produce OverlordZagara');
  assertIncludes(larvaTrain, 'LarvaTrainZagara', '<Unit value="ZerglingZagara" />', 'LarvaTrainZagara must produce ZerglingZagara');
  assertIncludes(larvaTrain, 'LarvaTrainZagara', '<Unit value="ZagaraCorruptor" />', 'LarvaTrainZagara must produce ZagaraCorruptor');
  assertIncludes(larvaTrainSwarm, 'LarvaTrainSwarmZagara', '<Unit value="InfestedAbominationZagara" />', 'LarvaTrainSwarmZagara must produce InfestedAbominationZagara');
  assertIncludes(larvaTrainSwarm, 'LarvaTrainSwarmZagara', '<Unit value="ScourgeZagara" />', 'LarvaTrainSwarmZagara must produce ScourgeZagara');

  for (const token of [
    'AbilCmd="MorphZerglingToBanelingZagara,Train1"',
    'AbilCmd="MorphZerglingToHunterZagara,Train1"',
    'AbilCmd="MorphZerglingToSplitterlingZagara,Train1"',
  ]) {
    assertIncludes(zergling, 'ZerglingZagara', token, `ZerglingZagara missing private morph card ${token}`);
  }

  assertIncludes(overseer, 'OverseerZagara', 'AbilCmd="OverseerMorphtoOverseerSiegeZagara,Execute"', 'OverseerZagara must use private siege morph');
  assertIncludes(overseerSiege, 'OverseerSiegeModeZagara', 'AbilCmd="OverseerSiegeMorphtoOverseerZagara,Execute"', 'OverseerSiegeModeZagara must use private normal morph');
}

function validateSmokeProfiles() {
  for (const expected of [
    'libE0EAE146_gf_XMTestBench_CreateBuildingRosterUnit(lp_player, "ExtractorZagara", 4, lp_rosterKind);',
    'libE0EAE146_gf_XMTestBench_CreateBuildingRosterUnit(lp_player, "SpireZagara", 7, lp_rosterKind);',
    'libE0EAE146_gf_XMTestBench_CreateBuildingRosterUnit(lp_player, "ScourgeNestZagara", 9, lp_rosterKind);',
    'libE0EAE146_gf_XMTestBench_CreateRosterUnit(lp_player, "QueenZagara", 7, lp_rosterKind);',
    'libE0EAE146_gf_XMTestBench_CheckAbilityProfileEntry(lp_player, "Zagara", lp_scenarioKind, "ZerglingZagara", "BanelingZagara", "MorphZerglingToBanelingZagara", "", "evolution");',
    'libE0EAE146_gf_XMTestBench_CheckAbilityProfileEntry(lp_player, "Zagara", lp_scenarioKind, "ZerglingZagara", "HotSHunterZagara", "MorphZerglingToHunterZagara", "CoopHunterRequirements", "evolution");',
    'libE0EAE146_gf_XMTestBench_CheckAbilityProfileEntry(lp_player, "Zagara", lp_scenarioKind, "OverseerSiegeModeZagara", "MorphtoOverseerNormal", "OverseerSiegeMorphtoOverseerZagara", "", "evolution");',
    'libE0EAE146_gf_XMTestBench_CheckAbilityProfileEntry(lp_player, "Zagara", lp_scenarioKind, "ZagaraVoidCoopBurrowed", "BurrowUp", "ZagaraVoidCoopUnburrow", "", "evolution");',
  ]) {
    const sourceName = expected.includes('CreateBuildingRosterUnit') ? 'CommanderBuildings' : expected.includes('CreateRosterUnit') ? 'CommanderRosters' : expected.includes('ZagaraVoidCoopBurrowed') ? 'CommanderHeroAbilities' : 'CommanderUnitAbilities';
    const sourceText = sourceName == 'CommanderBuildings' ? texts.finalBuildings : sourceName == 'CommanderRosters' ? texts.finalRosters : sourceName == 'CommanderHeroAbilities' ? texts.finalHeroAbilities : texts.finalUnitAbilities;
    assertIncludes(sourceText, sourceName, expected, `missing smoke coverage: ${expected}`);
  }
}

function validatePrestigeReferenceGap() {
  const official = getXmlBlock(texts.officialUpgradeData, 'CUpgrade', 'CommanderPrestigeZagaraZagara') ?? '';
  const local = getXmlBlock(texts.upgradeData, 'CUpgrade', 'CommanderPrestigeZagaraZagara') ?? '';

  assertIncludes(official, 'official CommanderPrestigeZagaraZagara', 'LarvaTrainSwarmling,InfoArray[Train1].Resource[Minerals]', 'official data no longer has LarvaTrainSwarmling mineral override; re-audit local mapping');
  assertIncludes(local, 'local CommanderPrestigeZagaraZagara', 'LarvaTrainZagara,InfoArray[Train2].Resource[Minerals]', 'local prestige block missing private larva-train mineral override');

  const duplicateMatches = local.match(/LarvaTrainZagara,InfoArray\[Train2\]\.Resource\[Minerals\]/g) ?? [];
  if (duplicateMatches.length < 2) {
    errors.push('local CommanderPrestigeZagaraZagara: expected duplicated LarvaTrainZagara mineral overrides are missing; re-audit prestige mapping');
  }
}

function readText(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function stripXmlComments(text) {
  return text.replace(/<!--[\s\S]*?-->/g, '');
}

function assertIncludes(text, sourceName, expectedText, message) {
  if (!text.includes(expectedText)) {
    errors.push(`${sourceName}: ${message}`);
  }
}

function getXmlBlock(text, tagName, id) {
  const pattern = new RegExp(`<${tagName}[^>]*\\b(?:id|Id)="${id}"[\\s\\S]*?<\\/${tagName}>`);
  return text.match(pattern)?.[0] ?? '';
}

function parseDocumentHeaderDependencies(filePath) {
  const bytes = fs.readFileSync(filePath);
  const fileOffset = bytes.indexOf(Buffer.from('file:', 'utf8'));
  const bnetOffset = bytes.indexOf(Buffer.from('bnet:', 'utf8'));
  const dependencyStartOffset = fileOffset < 0 ? bnetOffset : bnetOffset < 0 ? fileOffset : Math.min(fileOffset, bnetOffset);
  if (dependencyStartOffset < 4) {
    return [];
  }

  const dependencyCount = bytes.readUInt32LE(dependencyStartOffset - 4);
  const dependencies = [];
  let offset = dependencyStartOffset;
  for (let index = 0; index < dependencyCount && offset < bytes.length; index += 1) {
    const end = bytes.indexOf(0, offset);
    const valueEnd = end >= 0 ? end : bytes.length;
    dependencies.push(bytes.subarray(offset, valueEnd).toString('utf8'));
    offset = end >= 0 ? end + 1 : valueEnd;
  }
  return dependencies;
}
