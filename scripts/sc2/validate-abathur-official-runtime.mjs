import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const xmRoot = path.join(repoRoot, '合作指挥官版起义狂潮', 'Mods', 'XM');
const xmFinalRoot = path.join(xmRoot, 'XMFinal.SC2Mod');
const xmAbathurRoot = path.join(xmRoot, 'XMAbathur.SC2Mod');
const gameDataRoot = path.join(xmAbathurRoot, 'Base.SC2Data', 'GameData');

const errors = [];

const files = {
  documentInfo: path.join(xmFinalRoot, 'DocumentInfo'),
  documentHeader: path.join(xmFinalRoot, 'DocumentHeader'),
  runtime: path.join(xmFinalRoot, 'Base.SC2Data', 'LibE0EAE146_AbathurRuntime.galaxy'),
  finalGalaxy: path.join(xmFinalRoot, 'Base.SC2Data', 'LibE0EAE146.galaxy'),
  finalHeader: path.join(xmFinalRoot, 'Base.SC2Data', 'LibE0EAE146_h.galaxy'),
  userData: path.join(gameDataRoot, 'UserData.xml'),
  unitData: path.join(gameDataRoot, 'UnitData.xml'),
  abilData: path.join(gameDataRoot, 'AbilData.xml'),
  behaviorData: path.join(gameDataRoot, 'BehaviorData.xml'),
  upgradeData: path.join(gameDataRoot, 'UpgradeData.xml'),
};

const texts = Object.fromEntries(Object.entries(files).map(([key, filePath]) => [key, readText(filePath)]));

validateDependencyGate();
validateCommanderAch();
validatePrivateLarvaClosure();
validateWorkerBuildClosure();
validateLarvaTrainClosure();
validateRavagerClosure();
validateToxicNestClosure();
validateRuntimeFullLevelClosure();
validateRuntimePollutionGuard();

if (errors.length > 0) {
  console.error('FAIL: Abathur official runtime validation failed');
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log('PASS: Abathur official runtime validation passed');

function validateDependencyGate() {
  const dependency = 'file:Mods\\XM\\XMAbathur.SC2Mod';
  assertIncludes(texts.documentInfo, 'XMFinal DocumentInfo', `<Value>${dependency}</Value>`, 'XMAbathur dependency is not active');

  const dependencies = parseDocumentHeaderDependencies(files.documentHeader);
  if (!dependencies.includes(dependency)) {
    errors.push(`XMFinal DocumentHeader: missing live dependency ${dependency}`);
  }

  assertIncludes(texts.finalGalaxy, 'XMFinal LibE0EAE146.galaxy', 'include "LibE0EAE146_AbathurRuntime"', 'missing Abathur runtime include');
  assertIncludes(texts.finalGalaxy, 'XMFinal LibE0EAE146.galaxy', 'libE0EAE146_gf_AbathurRuntimeInit(1, lp_secondUnit, lp_createHero);', 'InitializeBase does not dispatch to Abathur runtime');
  assertIncludes(texts.finalHeader, 'XMFinal LibE0EAE146_h.galaxy', 'void libE0EAE146_gf_AbathurRuntimeInit', 'missing Abathur runtime declaration');
}

function validateCommanderAch() {
  const instance = getUserInstance(texts.userData, 'CommanderAch', 'Abathur');
  if (!instance) {
    errors.push('XMAbathur UserData.xml: missing CommanderAch/Abathur');
    return;
  }

  const expectedFields = {
    CommandCenter: 'HatcheryAbathur',
    Worker: 'DroneAbathur',
    SecondUnit: 'OverlordAbathur',
  };

  for (const [field, expectedUnit] of Object.entries(expectedFields)) {
    const actual = openerField(instance, field);
    if (actual !== expectedUnit) {
      errors.push(`XMAbathur UserData.xml: CommanderAch/Abathur ${field} expected ${expectedUnit}, actual ${actual || '<empty>'}`);
    }
    assertXmlBlock(texts.unitData, 'CUnit', expectedUnit, 'XMAbathur UnitData.xml', `missing opener unit ${expectedUnit}`);
  }
}

function validatePrivateLarvaClosure() {
  assertXmlBlock(texts.unitData, 'CUnit', 'LarvaAbathur', 'XMAbathur UnitData.xml', 'missing private LarvaAbathur');
  assertNoMatch(texts.unitData, /<CUnit\s+id="Larva"(\s|>)/, 'XMAbathur UnitData.xml: must not override global CUnit id="Larva"');
  assertNoMatch(texts.behaviorData, /<CBehaviorSpawn\s+id="SpawnLarva"(\s|>)/, 'XMAbathur BehaviorData.xml: must not override global CBehaviorSpawn id="SpawnLarva"');

  const spawnBlock = getXmlBlock(texts.behaviorData, 'CBehaviorSpawn', 'SpawnLarvaAbathur');
  assertBlockIncludes(spawnBlock, 'XMAbathur BehaviorData.xml', 'Unit value="LarvaAbathur"', 'SpawnLarvaAbathur must produce LarvaAbathur');

  for (const townHall of ['HatcheryAbathur', 'LairAbathur', 'HiveAbathur']) {
    const block = getXmlBlock(texts.unitData, 'CUnit', townHall);
    assertBlockIncludes(block, 'XMAbathur UnitData.xml', 'BehaviorArray index="1" Link="SpawnLarvaAbathur"', `${townHall} must mount SpawnLarvaAbathur`);
  }

  const larvaBlock = getXmlBlock(texts.unitData, 'CUnit', 'LarvaAbathur');
  assertBlockIncludes(larvaBlock, 'XMAbathur UnitData.xml', 'AbilArray index="0" Link="LarvaTrainAbathur"', 'LarvaAbathur must mount LarvaTrainAbathur');
  assertBlockIncludes(larvaBlock, 'XMAbathur UnitData.xml', 'AbilArray index="1" Link="LarvaTrainSwarmAbathur"', 'LarvaAbathur must mount LarvaTrainSwarmAbathur');
  assertBlockIncludes(larvaBlock, 'XMAbathur UnitData.xml', 'AbilCmd="LarvaTrainSwarmAbathur,Train1"', 'LarvaAbathur card must train RoachVile through LarvaTrainSwarmAbathur,Train1');
}

function validateWorkerBuildClosure() {
  const droneBlock = getXmlBlock(texts.unitData, 'CUnit', 'DroneAbathur');
  assertBlockIncludes(droneBlock, 'XMAbathur UnitData.xml', 'AbilArray Link="ZergBuildAbathur"', 'DroneAbathur must use private ZergBuildAbathur');
  assertBlockNotIncludes(droneBlock, 'XMAbathur UnitData.xml', 'ZergBuildAbathur,Build10', 'DroneAbathur card must not expose removed Build10');

  const buildBlock = getXmlBlock(texts.abilData, 'CAbilBuild', 'ZergBuildAbathur');
  assertBlockIncludes(buildBlock, 'XMAbathur AbilData.xml', 'InfoArray index="Build10" removed="1"', 'ZergBuildAbathur must remove Build10');
  assertBlockNotIncludes(buildBlock, 'XMAbathur AbilData.xml', 'Unit="NydusNetwork"', 'ZergBuildAbathur must not build NydusNetwork');
  assertBlockNotIncludes(buildBlock, 'XMAbathur AbilData.xml', 'Unit="GreaterNydusWorm"', 'ZergBuildAbathur must not build GreaterNydusWorm');

  for (const expected of [
    'HatcheryAbathur',
    'ExtractorAbathur',
    'SpawningPoolAbathur',
    'EvolutionChamberAbathur',
    'RoachWarrenAbathur',
    'InfestationPitAbathur',
    'SpireAbathur',
    'SpineCrawlerAbathur',
    'SporeCrawlerAbathur',
  ]) {
    assertBlockIncludes(buildBlock, 'XMAbathur AbilData.xml', `Unit="${expected}"`, `ZergBuildAbathur must build ${expected}`);
  }
}

function validateLarvaTrainClosure() {
  const larvaTrain = getXmlBlock(texts.abilData, 'CAbilTrain', 'LarvaTrainAbathur');
  assertBlockIncludes(larvaTrain, 'XMAbathur AbilData.xml', 'Unit value="DroneAbathur"', 'LarvaTrainAbathur Train1 must produce DroneAbathur');
  assertBlockIncludes(larvaTrain, 'XMAbathur AbilData.xml', 'Unit value="OverlordAbathur"', 'LarvaTrainAbathur Train3 must produce OverlordAbathur');
  assertBlockIncludes(larvaTrain, 'XMAbathur AbilData.xml', 'Unit value="MutaliskAbathur"', 'LarvaTrainAbathur Train5 must produce MutaliskAbathur');
  assertBlockIncludes(larvaTrain, 'XMAbathur AbilData.xml', 'Unit value="ViperAbathur"', 'LarvaTrainAbathur Train13 must produce ViperAbathur');
  assertBlockIncludes(larvaTrain, 'XMAbathur AbilData.xml', 'Unit value="SwarmHostAbathur"', 'LarvaTrainAbathur Train16 must produce SwarmHostAbathur');

  const swarmTrain = getXmlBlock(texts.abilData, 'CAbilTrain', 'LarvaTrainSwarmAbathur');
  assertBlockIncludes(swarmTrain, 'XMAbathur AbilData.xml', 'InfoArray index="Train1"', 'LarvaTrainSwarmAbathur must define Train1');
  assertBlockIncludes(swarmTrain, 'XMAbathur AbilData.xml', 'Unit value="RoachVile"', 'LarvaTrainSwarmAbathur Train1 must produce RoachVile');
  assertBlockNotIncludes(swarmTrain, 'XMAbathur AbilData.xml', 'Unit value="Roach"', 'LarvaTrainSwarmAbathur must not produce global Roach');
  assertBlockNotIncludes(swarmTrain, 'XMAbathur AbilData.xml', 'Unit value="RoachCorpser"', 'LarvaTrainSwarmAbathur must not produce RoachCorpser');
}

function validateRavagerClosure() {
  const roachVileBlock = getXmlBlock(texts.unitData, 'CUnit', 'RoachVile');
  assertBlockIncludes(roachVileBlock, 'XMAbathur UnitData.xml', 'AbilArray Link="MorphRoachVileToRavager"', 'RoachVile must mount MorphRoachVileToRavager');
  assertBlockIncludes(roachVileBlock, 'XMAbathur UnitData.xml', 'AbilCmd="MorphRoachVileToRavager,Train1"', 'RoachVile card must use MorphRoachVileToRavager,Train1');
  assertBlockNotIncludes(roachVileBlock, 'XMAbathur UnitData.xml', 'AbilArray Link="MorphRoachToRavager"', 'RoachVile must not use global MorphRoachToRavager');

  const morphBlock = getXmlBlock(texts.abilData, 'CAbilTrain', 'MorphRoachVileToRavager');
  assertBlockIncludes(morphBlock, 'XMAbathur AbilData.xml', 'MorphUnit value="RavagerVileAbathurCocoon"', 'MorphRoachVileToRavager must use RavagerVileAbathurCocoon');
  assertBlockIncludes(morphBlock, 'XMAbathur AbilData.xml', 'Unit value="RavagerAbathur"', 'MorphRoachVileToRavager must produce RavagerAbathur');

  const ravagerBlock = getXmlBlock(texts.unitData, 'CUnit', 'RavagerAbathur');
  assertBlockIncludes(ravagerBlock, 'XMAbathur UnitData.xml', 'AbilArray Link="RavagerAbathurCorrosiveBile"', 'RavagerAbathur must mount RavagerAbathurCorrosiveBile');
  assertBlockIncludes(ravagerBlock, 'XMAbathur UnitData.xml', 'AbilArray Link="BurrowRavagerAbathurDown"', 'RavagerAbathur must mount BurrowRavagerAbathurDown');
  assertBlockIncludes(ravagerBlock, 'XMAbathur UnitData.xml', 'AbilCmd="RavagerAbathurCorrosiveBile,Execute"', 'RavagerAbathur card must use RavagerAbathurCorrosiveBile,Execute');
  assertBlockNotIncludes(ravagerBlock, 'XMAbathur UnitData.xml', 'RavagerCorrosiveBile,Execute', 'RavagerAbathur must not use global RavagerCorrosiveBile');

  const ravagerBurrowedBlock = getXmlBlock(texts.unitData, 'CUnit', 'RavagerAbathurBurrowed');
  assertBlockIncludes(ravagerBurrowedBlock, 'XMAbathur UnitData.xml', 'AbilArray Link="BurrowRavagerAbathurUp"', 'RavagerAbathurBurrowed must mount BurrowRavagerAbathurUp');
  assertBlockIncludes(ravagerBurrowedBlock, 'XMAbathur UnitData.xml', 'AbilCmd="BurrowRavagerAbathurUp,Execute"', 'RavagerAbathurBurrowed card must use BurrowRavagerAbathurUp,Execute');

  const bileBlock = getXmlBlock(texts.abilData, 'CAbilEffectTarget', 'RavagerAbathurCorrosiveBile');
  assertBlockIncludes(bileBlock, 'XMAbathur AbilData.xml', 'DefaultButtonFace="RavagerAbathurCorrosiveBile"', 'RavagerAbathurCorrosiveBile must use Abathur button face');
  assertBlockIncludes(bileBlock, 'XMAbathur AbilData.xml', 'Cooldown TimeUse=', 'RavagerAbathurCorrosiveBile must define cooldown');
  assertBlockIncludes(bileBlock, 'XMAbathur AbilData.xml', 'Effect index="0"', 'RavagerAbathurCorrosiveBile must trigger an effect');
}

function validateToxicNestClosure() {
  assertXmlBlock(texts.unitData, 'CUnit', 'ToxicNest', 'XMAbathur UnitData.xml', 'missing ToxicNest');
  assertXmlBlock(texts.unitData, 'CUnit', 'ToxicNestBurrowed', 'XMAbathur UnitData.xml', 'missing ToxicNestBurrowed');
  assertXmlBlock(texts.abilData, 'CAbilBuild', 'SpawnToxicNest', 'XMAbathur AbilData.xml', 'missing SpawnToxicNest ability');
  assertXmlBlock(texts.upgradeData, 'CUpgrade', 'AbathurToxicNestIcreasedBiomass', 'XMAbathur UpgradeData.xml', 'missing AbathurToxicNestIcreasedBiomass');
  assertXmlBlock(texts.upgradeData, 'CUpgrade', 'AbathurHiddenToxicNest', 'XMAbathur UpgradeData.xml', 'missing AbathurHiddenToxicNest');
  assertXmlBlock(texts.upgradeData, 'CUpgrade', 'AbathurToxicNestRespawnTalent', 'XMAbathur UpgradeData.xml', 'missing AbathurToxicNestRespawnTalent');
}

function validateRuntimeFullLevelClosure() {
  const requiredUpgrades = [
    ['CommanderLevel', 16],
    ['AbathurCommander', 1],
    ['SwarmQueenVisual', 1],
    ['AbathurToxicNestIcreasedBiomass', 1],
    ['AbathurHiddenToxicNest', 1],
    ['AbathurToxicNestRespawnTalent', 1],
    ['AbathurImprovedToxicNest', 1],
    ['AbathurImprovedMend', 1],
    ['AbathurBiomassRefund', 1],
    ['AbathurEnableSymbiote', 1],
    ['AbathurSymbiote', 1],
    ['AbathurMorphTimeCostReduced', 1],
    ['AbathurEnemyDeathCreateLocusts', 1],
    ['AbathurBiomassLifeLeech', 1],
    ['MasteryAbathurToxicNestDamageAndRespawn', 30],
    ['MasteryAbathurMendHeal', 30],
    ['MasteryAbathurSymbioteCarapace', 30],
    ['MasteryAbathurDoubleBiomass', 30],
    ['MasteryAbathurToxicNestCharge', 30],
    ['MasteryAbathurTechFastBuild', 30],
  ];

  assertIncludes(texts.runtime, 'XMFinal LibE0EAE146_AbathurRuntime.galaxy', 'CatalogEntryIsValid(c_gameCatalogUpgrade, lp_upgrade)', 'Abathur runtime upgrade helper must guard missing catalogs');
  assertIncludes(texts.runtime, 'XMFinal LibE0EAE146_AbathurRuntime.galaxy', 'libE0EAE146_gf_AbathurApplyFullLevelUpgrades(lp_player);', 'Abathur runtime must apply full-level upgrades');
  assertIncludes(texts.runtime, 'XMFinal LibE0EAE146_AbathurRuntime.galaxy', 'libE0EAE146_gf_AbathurApplyFullMasteries(lp_player);', 'Abathur runtime must apply full masteries');
  assertIncludes(texts.runtime, 'XMFinal LibE0EAE146_AbathurRuntime.galaxy', 'libE0EAE146_gf_InitializeAbathurBiomass(lp_player, "BiomassPickupDummy");', 'Abathur runtime must initialize biomass');

  for (const [upgrade, level] of requiredUpgrades) {
    assertIncludes(
      texts.runtime,
      'XMFinal LibE0EAE146_AbathurRuntime.galaxy',
      `libE0EAE146_gf_AbathurSetUpgradeAtLeast(lp_player, "${upgrade}", ${level});`,
      `Abathur runtime must set ${upgrade} at least ${level}`,
    );
  }

  assertNoMatch(texts.runtime, /SetUpgradeAtLeast\([^)]*"CommanderPrestigeAbathur/, 'Abathur runtime must not directly enable CommanderPrestigeAbathur* primary upgrades');
  assertNoMatch(texts.runtime, /TechTreeUpgradeAddLevel\([^)]*"CommanderPrestigeAbathur/, 'Abathur runtime must not directly add CommanderPrestigeAbathur* primary upgrades');
}

function validateRuntimePollutionGuard() {
  for (const unitId of ['NydusNetwork', 'GreaterNydusWorm', 'Roach', 'RoachCorpser', 'Ravager']) {
    assertIncludes(
      texts.runtime,
      'XMFinal LibE0EAE146_AbathurRuntime.galaxy',
      `TechTreeUnitAllow(lp_player, "${unitId}", false);`,
      `Abathur runtime must block shared/non-effective ${unitId}`,
    );
  }

  for (const unitId of ['HatcheryAbathur', 'LarvaAbathur', 'DroneAbathur', 'RoachVile', 'RavagerAbathur', 'RavagerAbathurBurrowed', 'ToxicNest', 'ToxicNestBurrowed']) {
    assertIncludes(
      texts.runtime,
      'XMFinal LibE0EAE146_AbathurRuntime.galaxy',
      `TechTreeUnitAllow(lp_player, "${unitId}", true);`,
      `Abathur runtime must allow ${unitId}`,
    );
  }

  for (const abilityId of ['MorphRoachVileToRavager', 'RavagerAbathurCorrosiveBile', 'BurrowRavagerAbathurDown', 'BurrowRavagerAbathurUp']) {
    assertIncludes(
      texts.runtime,
      'XMFinal LibE0EAE146_AbathurRuntime.galaxy',
      `TechTreeAbilityAllow(lp_player, AbilityCommand("${abilityId}", 0), true);`,
      `Abathur runtime must allow ${abilityId}`,
    );
  }
}

function readText(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function stripXmlComments(text) {
  return text.replace(/<!--[\s\S]*?-->/g, '');
}

function getXmlBlock(text, tag, id) {
  const activeText = stripXmlComments(text);
  const escapedId = escapeRegExp(id);
  return (
    activeText.match(new RegExp(`<${tag}\\s+[^>]*id="${escapedId}"[^>]*/\\s*>`))?.[0] ??
    activeText.match(new RegExp(`<${tag}\\s+[^>]*id="${escapedId}"[^>]*>[\\s\\S]*?<\\/${tag}>`))?.[0] ??
    ''
  );
}

function getUserInstance(text, userId, instanceId) {
  const userBlock = getXmlBlock(text, 'CUser', userId);
  if (!userBlock) {
    return '';
  }

  return userBlock.match(new RegExp(`<Instances\\s+Id="${escapeRegExp(instanceId)}"[\\s\\S]*?<\\/Instances>`))?.[0] ?? '';
}

function openerField(instanceBlock, field) {
  for (const unitBlockMatch of instanceBlock.matchAll(/<Unit\s+Unit="([^"]+)"\s*>[\s\S]*?<\/Unit>/g)) {
    const [, unitId] = unitBlockMatch;
    if (new RegExp(`<Field\\s+Id="${escapeRegExp(field)}"`).test(unitBlockMatch[0])) {
      return unitId;
    }
  }

  return '';
}

function assertXmlBlock(text, tag, id, source, message) {
  if (!getXmlBlock(text, tag, id)) {
    errors.push(`${source}: ${message}`);
  }
}

function assertBlockIncludes(block, source, needle, message) {
  if (!block) {
    errors.push(`${source}: ${message}; source block is missing`);
    return;
  }
  assertIncludes(block, source, needle, message);
}

function assertBlockNotIncludes(block, source, needle, message) {
  if (!block) {
    errors.push(`${source}: ${message}; source block is missing`);
    return;
  }
  if (block.includes(needle)) {
    errors.push(`${source}: ${message}`);
  }
}

function assertIncludes(text, source, needle, message) {
  if (!text.includes(needle)) {
    errors.push(`${source}: ${message}`);
  }
}

function assertNoMatch(text, pattern, message) {
  if (pattern.test(text)) {
    errors.push(message);
  }
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function findFirstDependencyOffset(bytes) {
  const fileOffset = bytes.indexOf(Buffer.from('file:', 'utf8'));
  const bnetOffset = bytes.indexOf(Buffer.from('bnet:', 'utf8'));

  if (fileOffset < 0) {
    return bnetOffset;
  }
  if (bnetOffset < 0) {
    return fileOffset;
  }
  return Math.min(fileOffset, bnetOffset);
}

function parseDocumentHeaderDependencies(filePath) {
  const bytes = fs.readFileSync(filePath);
  const dependencyStartOffset = findFirstDependencyOffset(bytes);
  if (dependencyStartOffset < 4) {
    throw new Error(`${filePath}: no dependency string table was found`);
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
