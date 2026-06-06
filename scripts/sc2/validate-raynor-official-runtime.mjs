import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const xmRoot = path.join(repoRoot, '合作指挥官版起义狂潮', 'Mods', 'XM');
const xmFinalRoot = path.join(xmRoot, 'XMFinal.SC2Mod');
const xmRaynorRoot = path.join(xmRoot, 'XMRaynor.SC2Mod');
const raynorGameDataRoot = path.join(xmRaynorRoot, 'Base.SC2Data', 'GameData');

const files = {
  documentInfo: path.join(xmFinalRoot, 'DocumentInfo'),
  documentHeader: path.join(xmFinalRoot, 'DocumentHeader'),
  runtime: path.join(xmFinalRoot, 'Base.SC2Data', 'LibE0EAE146_RaynorRuntime.galaxy'),
  finalGalaxy: path.join(xmFinalRoot, 'Base.SC2Data', 'LibE0EAE146.galaxy'),
  finalHeader: path.join(xmFinalRoot, 'Base.SC2Data', 'LibE0EAE146_h.galaxy'),
  finalUserData: path.join(xmFinalRoot, 'Base.SC2Data', 'GameData', 'UserData.xml'),
  welcomeMap: path.join(repoRoot, '合作指挥官版起义狂潮', 'Maps', 'XM', 'ttosh02.SC2Map', 'MapScript.galaxy'),
  unitData: path.join(raynorGameDataRoot, 'UnitData.xml'),
  abilData: path.join(raynorGameDataRoot, 'AbilData.xml'),
  upgradeData: path.join(raynorGameDataRoot, 'UpgradeData.xml'),
};

const texts = Object.fromEntries(Object.entries(files).map(([key, filePath]) => [key, readText(filePath)]));
const errors = [];

const expectedFullLevelUpgrades = [
  ['CommanderLevel', 16],
  ['RaynorCommander', 1],
  ['RaynorCommanderStimUpgrade', 1],
  ['Stimpack', 1],
  ['RaynorCommanderMechCostReduction', 1],
  ['RaynorBansheeAirstrike', 1],
  ['RaynorFirebatMedicRange', 1],
  ['RaynorUnlockBattlecruiser', 1],
  ['ShrikeTurret', 1],
  ['FortifiedBunkerCarapace', 1],
  ['OrbitalStrike', 1],
  ['RaynorCommanderArmorVanadium', 1],
  ['SupplyDepotDrop', 1],
  ['RaynorCommanderHyperionAdvancedTargetingSystems', 1],
  ['RaynorCommanderTerranWeaponAttackSpeed', 1],
];

const expectedMasteries = [
  'MasteryRaynorResearchCost',
  'MasteryRaynorDropPodHaste',
  'MasteryRaynorHyperionCooldown',
  'MasteryRaynorDuskWingCooldown',
  'MasteryRaynorMedicSecondaryHeal',
  'MasteryRaynorMechAttackSpeed',
];

const expectedPositivePrestigeSupplements = [
  'CommanderPrestigeRaynorBioMarineUpgrade',
  'CommanderPrestigeRaynorBioFirebatUpgrade',
  'CommanderPrestigeRaynorBioUpgradeTerranInfantryArmorLevel1',
  'CommanderPrestigeRaynorBioUpgradeTerranInfantryArmorLevel2',
  'CommanderPrestigeRaynorBioUpgradeTerranInfantryArmorLevel3',
];

const publicBlockedUnits = [
  'SCV',
  'CommandCenter',
  'CommandCenterFlying',
  'OrbitalCommand',
  'OrbitalCommandFlying',
  'Barracks',
  'BarracksFlying',
  'Factory',
  'FactoryFlying',
  'Starport',
  'StarportFlying',
  'SupplyDepot',
  'Refinery',
  'EngineeringBay',
  'Armory',
  'FusionCore',
  'SensorTower',
  'Bunker',
  'MissileTurret',
  'TechLab',
  'BarracksTechLab',
  'FactoryTechLab',
  'StarportTechLab',
  'Reactor',
  'BarracksReactor',
  'FactoryReactor',
  'StarportReactor',
  'TechReactor',
  'BarracksTechReactor',
  'FactoryTechReactor',
  'StarportTechReactor',
  'Marine',
  'Medic',
  'Firebat',
  'Marauder',
  'Vulture',
  'SiegeTank',
  'SiegeTankSieged',
  'VikingFighter',
  'VikingAssault',
  'Banshee',
  'Battlecruiser',
];

const privateAllowedUnits = [
  'SCVRaynor',
  'CommandCenterRaynor',
  'CommandCenterFlyingRaynor',
  'OrbitalCommandRaynor',
  'OrbitalCommandFlyingRaynor',
  'BarracksRaynor',
  'BarracksFlyingRaynor',
  'FactoryRaynor',
  'FactoryFlyingRaynor',
  'StarportRaynor',
  'StarportFlyingRaynor',
  'SupplyDepotRaynor',
  'RefineryRaynor',
  'EngineeringBayRaynor',
  'ArmoryRaynor',
  'FusionCoreRaynor',
  'SensorTowerRaynor',
  'BunkerRaynor',
  'MissileTurretRaynor',
  'TechLabRaynor',
  'BarracksTechLabRaynor',
  'FactoryTechLabRaynor',
  'StarportTechLabRaynor',
  'ReactorRaynor',
  'BarracksReactorRaynor',
  'FactoryReactorRaynor',
  'StarportReactorRaynor',
  'MarineRaynor',
  'MedicRaynor',
  'FirebatRaynor',
  'MarauderRaynor',
  'VultureRaynor',
  'SiegeTankRaynor',
  'SiegeTankSiegedRaynor',
  'VikingRaynor',
  'VikingAssaultRaynor',
  'BansheeRaynor',
  'BattlecruiserRaynor',
  'CoopCasterRaynor',
  'CoopAssistCasterRaynor',
  'DuskWing',
  'HyperionVoidCoop',
];

const privateAllowedAbilities = [
  'TerranBuildRaynor',
  'CommandCenterTrainRaynor',
  'CommandCenterLiftOffRaynor',
  'CommandCenterLandRaynor',
  'OrbitalLiftOffRaynor',
  'OrbitalCommandLandRaynor',
  'BarracksTrainRaynor',
  'BarracksLiftOffRaynor',
  'BarracksLandRaynor',
  'FactoryTrainRaynor',
  'FactoryLiftOffRaynor',
  'FactoryLandRaynor',
  'StarportTrainRaynor',
  'StarportLiftOffRaynor',
  'StarportLandRaynor',
  'EngineeringBayResearchRaynor',
  'ArmoryResearchRaynor',
  'BarracksAddOnsRaynor',
  'FactoryAddOnsRaynor',
  'StarportAddOnsRaynor',
  'RaynorTechLabMorphToBarracks',
  'RaynorTechLabMorphToDetached',
  'RaynorTechLabMorphToFactory',
  'RaynorTechLabMorphToStarport',
  'RaynorReactorMorphToBarracks',
  'RaynorReactorMorphToDetached',
  'RaynorReactorMorphToFactory',
  'RaynorReactorMorphToStarport',
  'UpgradeToOrbitalRaynor',
  'OrbitalCommandSupplyDepotDropRaynor',
  'SiegeModeRaynor',
  'UnsiegeRaynor',
  'AssaultModeRaynor',
  'FighterModeRaynor',
  'VoidCoopSummonHyperion',
  'BansheeAirstrike',
];

const privateAllowedAbilityCommands = [
  ['BarracksAddOnsRaynor', 1],
  ['FactoryAddOnsRaynor', 1],
  ['StarportAddOnsRaynor', 1],
  ['BarracksTechLabResearchRaynor', 3],
  ['BarracksTechLabResearchRaynor', 5],
  ['BarracksTechLabResearchRaynor', 6],
  ['FactoryTechLabResearchRaynor', 10],
  ['FactoryTechLabResearchRaynor', 15],
  ['StarportTechLabResearchRaynor', 9],
  ['StarportTechLabResearchRaynor', 18],
];

validateDependencyGate();
validateMapEntry();
validateRuntimeRoster();
validateRuntime();
validatePrivateProduction();
validateUpgradePrivateEffects();

if (errors.length > 0) {
  console.error('FAIL: Raynor official runtime validation failed');
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log('PASS: Raynor official runtime validation passed');

function validateDependencyGate() {
  const dependency = 'file:Mods\\XM\\XMRaynor.SC2Mod';
  assertIncludes(stripXmlComments(texts.documentInfo), 'XMFinal DocumentInfo', `<Value>${dependency}</Value>`, 'XMRaynor dependency is not active');

  const dependencies = parseDocumentHeaderDependencies(files.documentHeader);
  if (!dependencies.includes(dependency)) {
    errors.push(`XMFinal DocumentHeader: missing live dependency ${dependency}`);
  }

  assertIncludes(texts.finalGalaxy, 'XMFinal LibE0EAE146.galaxy', 'include "LibE0EAE146_RaynorRuntime"', 'missing Raynor runtime include');
  assertIncludes(texts.finalGalaxy, 'XMFinal LibE0EAE146.galaxy', 'libE0EAE146_gf_RaynorRuntimeInit(1, lp_secondUnit, lp_createHero);', 'InitializeBase does not dispatch to Raynor runtime');
  assertIncludes(texts.finalHeader, 'XMFinal LibE0EAE146_h.galaxy', 'void libE0EAE146_gf_RaynorRuntimeInit', 'missing Raynor runtime declaration');
}

function validateMapEntry() {
  assertIncludes(texts.welcomeMap, 'ttosh02 MapScript.galaxy', 'libE0EAE146_gf_SeedDefaultCommanderBankIfEmpty("Raynor");', 'Welcome to the Jungle must seed Raynor for direct launch');
  assertMatches(texts.welcomeMap, 'ttosh02 MapScript.galaxy', /libE0EAE146_gf_InitializeBase\(PointFromId\(\d+\),\s*7,\s*null,\s*true\);/, 'Welcome to the Jungle must call InitializeBase');
}

function validateRuntimeRoster() {
  for (const unitId of privateAllowedUnits) {
    if (unitId === 'CoopCasterRaynor' || unitId === 'CoopAssistCasterRaynor' || unitId === 'DuskWing' || unitId === 'HyperionVoidCoop') {
      continue;
    }

    assertIncludes(
      texts.finalUserData,
      'XMFinal UserData.xml',
      `<Unit Unit="${unitId}"><Field Id="RuntimeUnit"`,
      `Raynor runtime roster must include ${unitId}`,
    );
  }
}

function validateRuntime() {
  const setUpgradeBlock = getFunctionBlock(texts.runtime, 'void libE0EAE146_gf_RaynorSetUpgradeAtLeast');
  assertIncludes(setUpgradeBlock, 'Raynor runtime', 'CatalogEntryIsValid(c_gameCatalogUpgrade, lp_upgrade)', 'upgrade helper must guard missing Catalog upgrades');

  for (const [upgrade, level] of expectedFullLevelUpgrades) {
    assertIncludes(
      texts.runtime,
      'Raynor runtime',
      `libE0EAE146_gf_RaynorSetUpgradeAtLeast(lp_player, "${upgrade}", ${level});`,
      `runtime must grant ${upgrade} at ${level}`,
    );
  }

  for (const mastery of expectedMasteries) {
    assertIncludes(
      texts.runtime,
      'Raynor runtime',
      `libE0EAE146_gf_RaynorSetUpgradeAtLeast(lp_player, "${mastery}", 30);`,
      `runtime must grant ${mastery} at 30`,
    );
  }

  for (const supplement of expectedPositivePrestigeSupplements) {
    assertIncludes(
      texts.runtime,
      'Raynor runtime',
      `libE0EAE146_gf_RaynorSetUpgradeAtLeast(lp_player, "${supplement}", 1);`,
      `runtime must grant positive prestige supplement ${supplement}`,
    );
  }

  const positivePrestigeBlock = getFunctionBlock(texts.runtime, 'void libE0EAE146_gf_RaynorApplyPositivePrestigeEffects');
  assertNotMatches(positivePrestigeBlock, 'Raynor runtime', /"CommanderPrestigeRaynorBio"\s*,\s*1/, 'runtime must not grant P1 primary because it disables MULE');
  assertNotMatches(positivePrestigeBlock, 'Raynor runtime', /"CommanderPrestigeRaynorMechAfterburners"\s*,\s*1/, 'runtime must not grant P2 primary because it suppresses mech cost reduction');
  assertNotMatches(positivePrestigeBlock, 'Raynor runtime', /"CommanderPrestigeRaynorAir"\s*,\s*1/, 'runtime must not grant P3 primary as a positive-fusion default');

  for (const unitId of publicBlockedUnits) {
    assertIncludes(
      texts.runtime,
      'Raynor runtime',
      `libE0EAE146_gf_RaynorBlockUnitIfPresent(lp_player, "${unitId}");`,
      `runtime must block public ${unitId}`,
    );
  }

  for (const unitId of privateAllowedUnits) {
    assertIncludes(
      texts.runtime,
      'Raynor runtime',
      `libE0EAE146_gf_RaynorAllowUnitIfPresent(lp_player, "${unitId}");`,
      `runtime must allow private/support ${unitId}`,
    );
  }

  for (const abilityId of privateAllowedAbilities) {
    assertIncludes(
      texts.runtime,
      'Raynor runtime',
      `libE0EAE146_gf_RaynorAllowAbilityIfPresent(lp_player, "${abilityId}", 0);`,
      `runtime must allow ${abilityId}`,
    );
  }

  for (const [abilityId, commandIndex] of privateAllowedAbilityCommands) {
    assertIncludes(
      texts.runtime,
      'Raynor runtime',
      `libE0EAE146_gf_RaynorAllowAbilityIfPresent(lp_player, "${abilityId}", ${commandIndex});`,
      `runtime must allow ${abilityId} command ${commandIndex}`,
    );
  }

  for (const call of [
    'libE0EAE146_gf_RaynorApplyFullLevelUpgrades(lp_player);',
    'libE0EAE146_gf_RaynorApplyFullMasteries(lp_player);',
    'libE0EAE146_gf_RaynorApplyPositivePrestigeEffects(lp_player);',
    'libE0EAE146_gf_RaynorApplyTechFilter(lp_player);',
  ]) {
    assertIncludes(texts.runtime, 'Raynor runtime', call, `runtime init must call ${call}`);
  }
}

function validatePrivateProduction() {
  const unitAbilitySlots = [
    ['SCVRaynor', '5', 'TerranBuildRaynor'],
    ['CommandCenterRaynor', '2', 'CommandCenterTrainRaynor'],
    ['CommandCenterRaynor', '5', 'CommandCenterLiftOffRaynor'],
    ['CommandCenterFlyingRaynor', '0', 'CommandCenterLandRaynor'],
    ['OrbitalCommandRaynor', '5', 'CommandCenterTrainRaynor'],
    ['OrbitalCommandRaynor', '7', 'OrbitalLiftOffRaynor'],
    ['OrbitalCommandFlyingRaynor', '2', 'OrbitalCommandLandRaynor'],
    ['BarracksRaynor', '2', 'BarracksTrainRaynor'],
    ['BarracksRaynor', '4', 'BarracksAddOnsRaynor'],
    ['BarracksRaynor', '5', 'BarracksLiftOffRaynor'],
    ['BarracksFlyingRaynor', '0', 'BarracksLandRaynor'],
    ['FactoryRaynor', '2', 'FactoryTrainRaynor'],
    ['FactoryRaynor', '3', 'FactoryAddOnsRaynor'],
    ['FactoryRaynor', '5', 'FactoryLiftOffRaynor'],
    ['FactoryFlyingRaynor', '1', 'FactoryLandRaynor'],
    ['StarportRaynor', '2', 'StarportTrainRaynor'],
    ['StarportRaynor', '3', 'StarportAddOnsRaynor'],
    ['StarportRaynor', '5', 'StarportLiftOffRaynor'],
    ['StarportFlyingRaynor', '1', 'StarportLandRaynor'],
    ['EngineeringBayRaynor', '2', 'EngineeringBayResearchRaynor'],
    ['ArmoryRaynor', '2', 'ArmoryResearchRaynor'],
  ];

  for (const [unitId, index, ability] of unitAbilitySlots) {
    const block = getXmlBlock(texts.unitData, 'CUnit', unitId);
    assertMatches(
      block,
      'XMRaynor UnitData.xml',
      new RegExp(`<AbilArray(?=[^>]*\\bindex="${escapeRegExp(index)}")(?=[^>]*\\bLink="${escapeRegExp(ability)}")[^>]*>`),
      `${unitId} must replace ability slot ${index} with ${ability}`,
    );
  }

  const trainExpectations = {
    CommandCenterTrainRaynor: ['SCVRaynor'],
    BarracksTrainRaynor: ['MarineRaynor', 'MarauderRaynor', 'MedicRaynor', 'FirebatRaynor'],
    FactoryTrainRaynor: ['SiegeTankRaynor', 'VultureRaynor'],
    StarportTrainRaynor: ['BansheeRaynor', 'BattlecruiserRaynor', 'VikingRaynor'],
  };

  for (const [abilityId, units] of Object.entries(trainExpectations)) {
    const block = getXmlBlock(texts.abilData, 'CAbilTrain', abilityId);
    for (const unitId of units) {
      assertIncludes(block, 'XMRaynor AbilData.xml', `<Unit value="${unitId}" />`, `${abilityId} must produce ${unitId}`);
    }
  }

  const buildBlock = getXmlBlock(texts.abilData, 'CAbilBuild', 'TerranBuildRaynor');
  for (const unitId of [
    'CommandCenterRaynor',
    'SupplyDepotRaynor',
    'RefineryRaynor',
    'BarracksRaynor',
    'EngineeringBayRaynor',
    'MissileTurretRaynor',
    'BunkerRaynor',
    'SensorTowerRaynor',
    'FactoryRaynor',
    'StarportRaynor',
    'ArmoryRaynor',
    'FusionCoreRaynor',
  ]) {
    assertMatches(buildBlock, 'XMRaynor AbilData.xml', new RegExp(`<InfoArray[^>]*Unit="${escapeRegExp(unitId)}"`), `TerranBuildRaynor must build ${unitId}`);
  }

  for (const publicUnit of ['CommandCenter', 'SupplyDepot', 'Barracks', 'Factory', 'Starport', 'Armory', 'FusionCore']) {
    assertNotMatches(buildBlock, 'XMRaynor AbilData.xml', new RegExp(`<InfoArray[^>]*Unit="${escapeRegExp(publicUnit)}"`), `TerranBuildRaynor must not build public ${publicUnit}`);
  }

  const morphExpectations = {
    RaynorTechLabMorphToBarracks: 'BarracksTechLabRaynor',
    RaynorTechLabMorphToDetached: 'TechLabRaynor',
    RaynorTechLabMorphToFactory: 'FactoryTechLabRaynor',
    RaynorTechLabMorphToStarport: 'StarportTechLabRaynor',
    RaynorReactorMorphToBarracks: 'BarracksReactorRaynor',
    RaynorReactorMorphToDetached: 'ReactorRaynor',
    RaynorReactorMorphToFactory: 'FactoryReactorRaynor',
    RaynorReactorMorphToStarport: 'StarportReactorRaynor',
    UpgradeToOrbitalRaynor: 'OrbitalCommandRaynor',
    CommandCenterLiftOffRaynor: 'CommandCenterFlyingRaynor',
    OrbitalLiftOffRaynor: 'OrbitalCommandFlyingRaynor',
    BarracksLiftOffRaynor: 'BarracksFlyingRaynor',
    FactoryLiftOffRaynor: 'FactoryFlyingRaynor',
    StarportLiftOffRaynor: 'StarportFlyingRaynor',
    SiegeModeRaynor: 'SiegeTankSiegedRaynor',
    UnsiegeRaynor: 'SiegeTankRaynor',
    AssaultModeRaynor: 'VikingAssaultRaynor',
    FighterModeRaynor: 'VikingRaynor',
  };

  for (const [abilityId, unitId] of Object.entries(morphExpectations)) {
    const block = getXmlBlock(texts.abilData, 'CAbilMorph', abilityId);
    assertMatches(block, 'XMRaynor AbilData.xml', new RegExp(`<InfoArray[^>]*Unit="${escapeRegExp(unitId)}"`), `${abilityId} must morph to ${unitId}`);
  }

  const landExpectations = {
    CommandCenterLandRaynor: 'CommandCenterRaynor',
    OrbitalCommandLandRaynor: 'OrbitalCommandRaynor',
    BarracksLandRaynor: 'BarracksRaynor',
    FactoryLandRaynor: 'FactoryRaynor',
    StarportLandRaynor: 'StarportRaynor',
  };

  for (const [abilityId, unitId] of Object.entries(landExpectations)) {
    const block = getXmlBlock(texts.abilData, 'CAbilMorphPlacement', abilityId);
    assertMatches(block, 'XMRaynor AbilData.xml', new RegExp(`<CAbilMorphPlacement[^>]*\\bunit="${escapeRegExp(unitId)}"`), `${abilityId} must land as ${unitId}`);
  }

  const supplyDropBlock = getXmlBlock(texts.abilData, 'CAbilBuild', 'OrbitalCommandSupplyDepotDropRaynor');
  assertIncludes(supplyDropBlock, 'XMRaynor AbilData.xml', 'Unit="SupplyDepotRaynor"', 'OrbitalCommandSupplyDepotDropRaynor must create SupplyDepotRaynor');

  const addOnExpectations = {
    BarracksAddOnsRaynor: ['BarracksTechLabRaynor', 'BarracksReactorRaynor'],
    FactoryAddOnsRaynor: ['FactoryTechLabRaynor', 'FactoryReactorRaynor'],
    StarportAddOnsRaynor: ['StarportTechLabRaynor', 'StarportReactorRaynor'],
  };

  for (const [abilityId, unitIds] of Object.entries(addOnExpectations)) {
    const block = getXmlBlock(texts.abilData, 'CAbilBuild', abilityId);
    for (const unitId of unitIds) {
      assertMatches(block, 'XMRaynor AbilData.xml', new RegExp(`<InfoArray[^>]*Unit="${escapeRegExp(unitId)}"`), `${abilityId} must build ${unitId}`);
    }
    assertNotMatches(block, 'XMRaynor AbilData.xml', /TechReactor/, `${abilityId} must not expose generic Tech Reactor commands`);
  }
}

function validateUpgradePrivateEffects() {
  const raynorCommanderBlock = getXmlBlock(texts.upgradeData, 'CUpgrade', 'RaynorCommander');
  for (const reference of [
    'Abil,BarracksTrainRaynor,InfoArray[Train1].Time',
    'Abil,BarracksTrainRaynor,InfoArray[Train4].Time',
    'Abil,BarracksTrainRaynor,InfoArray[Train5].Time',
    'Abil,BarracksTrainRaynor,InfoArray[Train6].Time',
    'Abil,FactoryTrainRaynor,InfoArray[Train2].Time',
    'Abil,FactoryTrainRaynor,InfoArray[Train10].Time',
    'Abil,StarportTrainRaynor,InfoArray[Train2].Time',
    'Abil,StarportTrainRaynor,InfoArray[Train4].Time',
    'Abil,StarportTrainRaynor,InfoArray[Train5].Time',
    'Abil,TerranBuildRaynor,InfoArray[Build4].Time',
    'Unit,BattlecruiserRaynor,EnergyStart',
    'Unit,BattlecruiserRaynor,EnergyMax',
  ]) {
    assertIncludes(raynorCommanderBlock, 'XMRaynor UpgradeData.xml', `Reference="${reference}"`, `RaynorCommander must affect private ${reference}`);
  }

  const bioSupplementChecks = {
    CommanderPrestigeRaynorBio: ['MarineRaynor', 'MedicRaynor', 'MarauderRaynor', 'FirebatRaynor'],
    CommanderPrestigeRaynorBioMarineUpgrade: ['MarineRaynor'],
    CommanderPrestigeRaynorBioFirebatUpgrade: ['FirebatRaynor'],
    CommanderPrestigeRaynorBioUpgradeTerranInfantryArmorLevel1: ['MarineRaynor', 'MarauderRaynor', 'FirebatRaynor', 'MedicRaynor'],
    CommanderPrestigeRaynorBioUpgradeTerranInfantryArmorLevel2: ['MarineRaynor', 'MarauderRaynor', 'FirebatRaynor', 'MedicRaynor'],
    CommanderPrestigeRaynorBioUpgradeTerranInfantryArmorLevel3: ['MarineRaynor', 'MarauderRaynor', 'FirebatRaynor', 'MedicRaynor'],
  };

  for (const [upgradeId, unitIds] of Object.entries(bioSupplementChecks)) {
    const block = getXmlBlock(texts.upgradeData, 'CUpgrade', upgradeId);
    for (const unitId of unitIds) {
      assertIncludes(block, 'XMRaynor UpgradeData.xml', `Reference="Unit,${unitId},`, `${upgradeId} must affect ${unitId}`);
    }
  }

  const infantryPrivateUnits = ['SCVRaynor', 'MarineRaynor', 'MarauderRaynor', 'FirebatRaynor', 'MedicRaynor'];
  for (const level of [1, 2, 3, 4, 5]) {
    const block = getXmlBlock(texts.upgradeData, 'CUpgrade', `RaynorTalentedTerranInfantryArmorLevel${level}`);
    for (const unitId of infantryPrivateUnits) {
      assertIncludes(block, 'XMRaynor UpgradeData.xml', `Reference="Unit,${unitId},LifeArmor`, `Raynor infantry armor level ${level} must affect ${unitId}`);
      assertIncludes(block, 'XMRaynor UpgradeData.xml', `Reference="Unit,${unitId},LifeMax`, `Raynor infantry armor level ${level} must add life to ${unitId}`);
    }
  }

  const vehiclePrivateUnits = ['SiegeTankRaynor', 'SiegeTankSiegedRaynor', 'BansheeRaynor', 'BattlecruiserRaynor', 'VikingAssaultRaynor', 'VikingRaynor', 'VultureRaynor'];
  for (const level of [1, 2, 3, 4, 5]) {
    const block = getXmlBlock(texts.upgradeData, 'CUpgrade', `RaynorTalentedTerranVehicleAndShipPlatingLevel${level}`);
    for (const unitId of vehiclePrivateUnits) {
      assertIncludes(block, 'XMRaynor UpgradeData.xml', `Reference="Unit,${unitId},Life`, `Raynor vehicle/ship plating level ${level} must affect ${unitId}`);
    }
  }

  const masteryCostBlock = getXmlBlock(texts.upgradeData, 'CUpgrade', 'MasteryRaynorResearchCost');
  for (const abilityId of ['ArmoryResearchRaynor', 'EngineeringBayResearchRaynor', 'BarracksTechLabResearchRaynor', 'FactoryTechLabResearchRaynor', 'StarportTechLabResearchRaynor']) {
    assertIncludes(masteryCostBlock, 'XMRaynor UpgradeData.xml', `<AffectedUnitArray value="${abilityId}" />`, `MasteryRaynorResearchCost must affect ${abilityId}`);
  }

  const masterySpeedBlock = getXmlBlock(texts.upgradeData, 'CUpgrade', 'MasteryRaynorResearchSpeed');
  for (const reference of [
    'Abil,ArmoryResearchRaynor,InfoArray[Research1].Time',
    'Abil,EngineeringBayResearchRaynor,InfoArray[Research1].Time',
    'Abil,BarracksTechLabResearchRaynor,InfoArray[Research4].Time',
    'Abil,FactoryTechLabResearchRaynor,InfoArray[Research11].Time',
    'Abil,StarportTechLabResearchRaynor,InfoArray[Research10].Time',
  ]) {
    assertIncludes(masterySpeedBlock, 'XMRaynor UpgradeData.xml', `Reference="${reference}"`, `MasteryRaynorResearchSpeed must affect private ${reference}`);
  }
}

function readText(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function stripXmlComments(text) {
  return text.replace(/<!--[\s\S]*?-->/g, '');
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

function getXmlBlock(text, tag, id) {
  const pattern = new RegExp(`<${tag}\\s+id="${escapeRegExp(id)}"[^>]*>[\\s\\S]*?<\\/${tag}>`);
  return text.match(pattern)?.[0] ?? '';
}

function getFunctionBlock(text, signature) {
  const start = text.indexOf(signature);
  if (start < 0) {
    return '';
  }

  const firstBrace = text.indexOf('{', start);
  if (firstBrace < 0) {
    return '';
  }

  let depth = 0;
  for (let index = firstBrace; index < text.length; index += 1) {
    const char = text[index];
    if (char === '{') {
      depth += 1;
    } else if (char === '}') {
      depth -= 1;
      if (depth === 0) {
        return text.slice(start, index + 1);
      }
    }
  }

  return '';
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function assertIncludes(text, source, needle, message) {
  if (!text.includes(needle)) {
    errors.push(`${source}: ${message}`);
  }
}

function assertMatches(text, source, pattern, message) {
  if (!pattern.test(text)) {
    errors.push(`${source}: ${message}`);
  }
}

function assertNotMatches(text, source, pattern, message) {
  if (pattern.test(text)) {
    errors.push(`${source}: ${message}`);
  }
}
