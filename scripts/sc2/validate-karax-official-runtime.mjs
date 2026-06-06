import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const xmRoot = path.join(repoRoot, '合作指挥官版起义狂潮', 'Mods', 'XM');
const xmFinalRoot = path.join(xmRoot, 'XMFinal.SC2Mod');
const xmKaraxRoot = path.join(xmRoot, 'XMKarax.SC2Mod');
const karaxGameDataRoot = path.join(xmKaraxRoot, 'Base.SC2Data', 'GameData');

const files = {
  documentInfo: path.join(xmFinalRoot, 'DocumentInfo'),
  documentHeader: path.join(xmFinalRoot, 'DocumentHeader'),
  runtime: path.join(xmFinalRoot, 'Base.SC2Data', 'LibE0EAE146_KaraxRuntime.galaxy'),
  finalUserData: path.join(xmFinalRoot, 'Base.SC2Data', 'GameData', 'UserData.xml'),
  finalGalaxy: path.join(xmFinalRoot, 'Base.SC2Data', 'LibE0EAE146.galaxy'),
  finalHeader: path.join(xmFinalRoot, 'Base.SC2Data', 'LibE0EAE146_h.galaxy'),
  finalRosters: path.join(xmFinalRoot, 'Base.SC2Data', 'LibE0EAE146_CommanderRosters.galaxy'),
  finalBuildings: path.join(xmFinalRoot, 'Base.SC2Data', 'LibE0EAE146_CommanderBuildings.galaxy'),
  finalUnitAbilities: path.join(xmFinalRoot, 'Base.SC2Data', 'LibE0EAE146_CommanderUnitAbilities.galaxy'),
  unitData: path.join(karaxGameDataRoot, 'UnitData.xml'),
  abilData: path.join(karaxGameDataRoot, 'AbilData.xml'),
  actorData: path.join(karaxGameDataRoot, 'ActorData.xml'),
  behaviorData: path.join(karaxGameDataRoot, 'BehaviorData.xml'),
  effectData: path.join(karaxGameDataRoot, 'EffectData.xml'),
  validatorData: path.join(karaxGameDataRoot, 'ValidatorData.xml'),
  requirementNodeData: path.join(karaxGameDataRoot, 'RequirementNodeData.xml'),
  upgradeData: path.join(karaxGameDataRoot, 'UpgradeData.xml'),
  strings: path.join(xmKaraxRoot, 'zhCN.SC2Data', 'LocalizedData', 'GameStrings.txt'),
};

const texts = Object.fromEntries(Object.entries(files).map(([key, filePath]) => [key, readText(filePath)]));
const errors = [];

const privateRuntimeUnits = [
  'NexusKarax',
  'ProbeKarax',
  'PylonKarax',
  'AssimilatorKarax',
  'GatewayKarax',
  'WarpGateKarax',
  'ForgeKarax',
  'PhotonCannonKarax',
  'CyberneticsCoreKarax',
  'TwilightCouncilKarax',
  'ShieldBatteryKarax',
  'SolarForgeKarax',
  'DamagedSolarForgeKarax',
  'RoboticsFacilityKarax',
  'RoboticsBayKarax',
  'StargateKarax',
  'FleetBeaconKarax',
  'KhaydarinMonolithKarax',
  'ObserverKarax',
  'ObserverSiegeModeKarax',
  'PhoenixPurifierKarax',
  'ScoutKarax',
  'ColossusKarax',
  'CarrierKarax',
  'ImmortalAiur',
  'SentryPurifier',
  'ZealotPurifier',
  'SoACasterKarax',
  'KaraxChampion',
];

const publicBlockedUnits = [
  'Nexus',
  'Probe',
  'Pylon',
  'Assimilator',
  'Gateway',
  'WarpGate',
  'Forge',
  'PhotonCannon',
  'CyberneticsCore',
  'TwilightCouncil',
  'ShieldBattery',
  'SolarForge',
  'DamagedSolarForge',
  'RoboticsFacility',
  'RoboticsBay',
  'Stargate',
  'FleetBeacon',
  'KhaydarinMonolith',
  'Zealot',
  'Sentry',
  'Immortal',
  'Observer',
  'ObserverSiegeMode',
  'PhoenixPurifier',
  'Phoenix',
  'Scout',
  'Colossus',
  'Carrier',
];

const fullLevelUpgrades = [
  ['CommanderLevel', 16],
  ['KaraxCommander', 1],
  ['KaraxSOAChronoPassive', 1],
  ['KaraxKhaydarinMonolithUnlock', 1],
  ['SOAMapWideChronoUpgrade', 1],
  ['SOARepairBeam', 1],
  ['KaraxInstantStructureWarp', 1],
  ['SOAThermalLance', 1],
  ['KaraxUnitSpawnBarrier', 1],
  ['KaraxCarrierUpgrade', 1],
];

const researchUnlocks = [
  'KaraxTurretRange',
  'KaraxTurretAttackSpeed',
  'ShieldBatteryStructureBarrier',
  'ZealotResearchReconstruction',
  'EnergizerReclamation',
  'KaraxEnergyRegenUpgrade',
  'ImmortalResearchBarrierAdvanced',
  'ImmortalResearchShadowCannon',
  'ColossusFireBeam',
  'SolarEfficiencyLevel1',
  'SolarEfficiencyLevel2',
  'SolarEfficiencyLevel3',
  'SOARepairBeamExtraTarget',
  'SOAOrbitalStrikeUpgrade',
  'SOASolarLanceUpgrade',
  'MiragePhaseArmor',
  'CarrierRepairDrones',
  'KaraxCarrierInterceptorLaunchSpeed',
];

const masteries = [
  'MasteryKaraxUnitVital',
  'MasteryKaraxBuildingVital',
  'MasteryKaraxRepairBeamHeal',
  'MasteryKaraxSoAChronoRegen',
  'MasteryKaraxChronoBoostSpeed',
  'MasteryKaraxStartingAndMaxSoAEnergy',
];

const positivePrestigeUpgrades = [
  'CommanderPrestigeKaraxStructures',
  'CommanderPrestigeKaraxStructuresPerk',
  'CommanderPrestigeKaraxStructuresMastery',
  'CommanderPrestigeKaraxStructuresMasteryChronoBoostSpeed',
  'CommanderPrestigeKaraxArmy',
  'CommanderPrestigeKaraxTopBar',
];

validateDependencyGate();
validateRuntime();
validateRuntimeRoster();
validatePrivateProduction();
validateSolarForgeRequirement();
validateSolarForgeDamageRepairChain();
validateTechBuildingPanels();
validateSmokeProfiles();
validatePrivateAssets();

if (errors.length > 0) {
  console.error('FAIL: Karax official runtime validation failed');
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log('PASS: Karax official runtime validation passed');

function validateDependencyGate() {
  const dependency = 'file:Mods\\XM\\XMKarax.SC2Mod';
  assertIncludes(stripXmlComments(texts.documentInfo), 'XMFinal DocumentInfo', `<Value>${dependency}</Value>`, 'XMKarax dependency is not active');
  assertIncludes(texts.documentHeader, 'XMFinal DocumentHeader', dependency, 'XMKarax dependency is not in live DocumentHeader');
  assertIncludes(texts.finalGalaxy, 'XMFinal LibE0EAE146.galaxy', 'include "LibE0EAE146_KaraxRuntime"', 'missing Karax runtime include');
  assertIncludes(texts.finalHeader, 'XMFinal LibE0EAE146_h.galaxy', 'void libE0EAE146_gf_KaraxRuntimeInit', 'missing Karax runtime declaration');
}

function validateRuntime() {
  for (const [upgrade, level] of fullLevelUpgrades) {
    assertIncludes(texts.runtime, 'Karax runtime', `libE0EAE146_gf_KaraxSetUpgradeAtLeast(lp_player, "${upgrade}", ${level});`, `missing full-level upgrade grant ${upgrade}=${level}`);
  }

  for (const upgrade of researchUnlocks) {
    assertIncludes(texts.runtime, 'Karax runtime', `libE0EAE146_gf_KaraxSetUpgradeAtLeast(lp_player, "${upgrade}", 1);`, `missing research unlock grant ${upgrade}`);
  }

  for (const upgrade of masteries) {
    assertIncludes(texts.runtime, 'Karax runtime', `libE0EAE146_gf_KaraxSetUpgradeAtLeast(lp_player, "${upgrade}", 30);`, `missing mastery grant ${upgrade}=30`);
  }

  for (const upgrade of positivePrestigeUpgrades) {
    assertIncludes(texts.runtime, 'Karax runtime', `libE0EAE146_gf_KaraxSetUpgradeAtLeast(lp_player, "${upgrade}", 1);`, `missing positive prestige grant ${upgrade}`);
  }

  for (const unit of publicBlockedUnits) {
    assertIncludes(texts.runtime, 'Karax runtime', `libE0EAE146_gf_KaraxBlockUnitIfPresent(lp_player, "${unit}");`, `runtime must block public ${unit}`);
  }

  for (const unit of privateRuntimeUnits) {
    assertIncludes(texts.runtime, 'Karax runtime', `libE0EAE146_gf_KaraxAllowUnitIfPresent(lp_player, "${unit}");`, `runtime must allow private ${unit}`);
  }

  for (const ability of ['ProtossBuildKarax', 'NexusTrainKarax', 'GatewayTrainKarax', 'WarpGateTrainKarax', 'RoboticsFacilityTrainKarax', 'StargateTrainKarax', 'SolarForgeResearch', 'BrokenSolarForgeKarax', 'RepairSolarForgeKarax']) {
    assertIncludes(texts.runtime, 'Karax runtime', `libE0EAE146_gf_KaraxAllowAbilityIfPresent(lp_player, "${ability}", 0);`, `runtime must allow ${ability}`);
  }
}

function validateRuntimeRoster() {
  const block = getXmlBlock(texts.finalUserData, 'Instances', 'Karax');
  if (!block) {
    errors.push('XMFinal UserData.xml: missing CommanderRuntimeRoster/Karax');
    return;
  }

  assertIncludes(block, 'CommanderRuntimeRoster/Karax', '<Int Int="29"><Field Id="Count"/></Int>', 'Karax runtime roster count must include private opener, buildings, damaged Solar Forge form, caster, hero');
  for (const unit of privateRuntimeUnits) {
    assertIncludes(block, 'CommanderRuntimeRoster/Karax', `<Unit Unit="${unit}">`, `runtime roster missing ${unit}`);
  }

  for (const unit of ['Scout', 'Colossus', 'Carrier']) {
    assertNotIncludes(block, 'CommanderRuntimeRoster/Karax', `<Unit Unit="${unit}">`, `runtime roster must not use public ${unit}`);
  }
}

function validatePrivateProduction() {
  const robotics = getXmlBlock(texts.abilData, 'CAbilTrain', 'RoboticsFacilityTrainKarax') ?? '';
  const stargate = getXmlBlock(texts.abilData, 'CAbilTrain', 'StargateTrainKarax') ?? '';
  const roboticsFacility = getXmlBlock(texts.unitData, 'CUnit', 'RoboticsFacilityKarax') ?? '';
  const stargateUnit = getXmlBlock(texts.unitData, 'CUnit', 'StargateKarax') ?? '';

  assertIncludes(texts.unitData, 'Karax UnitData', '<CUnit id="ScoutKarax" parent="Scout">', 'missing ScoutKarax private shell');
  assertIncludes(texts.unitData, 'Karax UnitData', '<CUnit id="PhoenixPurifierKarax">', 'missing PhoenixPurifierKarax private shell');
  assertIncludes(texts.unitData, 'Karax UnitData', '<CUnit id="CarrierKarax" parent="Carrier">', 'missing CarrierKarax private shell');
  assertIncludes(texts.unitData, 'Karax UnitData', '<CUnit id="ColossusKarax" parent="Colossus">', 'missing ColossusKarax private shell');
  assertIncludes(texts.actorData, 'Karax ActorData', 'id="ScoutKarax" parent="Scout" unitName="ScoutKarax"', 'missing ScoutKarax actor');
  assertIncludes(texts.actorData, 'Karax ActorData', 'id="PhoenixPurifierKarax" parent="PhoenixPurifier" unitName="PhoenixPurifierKarax"', 'missing PhoenixPurifierKarax actor');
  assertIncludes(texts.actorData, 'Karax ActorData', 'id="CarrierKarax" parent="Carrier" unitName="CarrierKarax"', 'missing CarrierKarax actor');
  assertIncludes(texts.actorData, 'Karax ActorData', 'id="ColossusKarax" parent="Colossus" unitName="ColossusKarax"', 'missing ColossusKarax actor');
  assertIncludes(texts.strings, 'Karax GameStrings', 'Unit/Name/ScoutKarax=', 'missing ScoutKarax localized name');
  assertIncludes(texts.strings, 'Karax GameStrings', 'Unit/Name/PhoenixPurifierKarax=', 'missing PhoenixPurifierKarax localized name');
  assertIncludes(texts.strings, 'Karax GameStrings', 'Unit/Name/CarrierKarax=', 'missing CarrierKarax localized name');
  assertIncludes(texts.strings, 'Karax GameStrings', 'Unit/Name/ColossusKarax=', 'missing ColossusKarax localized name');

  assertIncludes(robotics, 'RoboticsFacilityTrainKarax', '<Unit value="ColossusKarax" />', 'robotics facility must train ColossusKarax');
  assertNotIncludes(robotics, 'RoboticsFacilityTrainKarax', '<Unit value="Colossus" />', 'robotics facility must not train public Colossus');
  assertIncludes(stargate, 'StargateTrainKarax', '<Unit value="ScoutKarax" />', 'stargate must train ScoutKarax');
  assertIncludes(stargate, 'StargateTrainKarax', '<Unit value="PhoenixPurifierKarax" />', 'stargate must train PhoenixPurifierKarax');
  assertIncludes(stargate, 'StargateTrainKarax', '<Unit value="CarrierKarax" />', 'stargate must train CarrierKarax');
  assertNotIncludes(stargate, 'StargateTrainKarax', '<Unit value="PhoenixPurifier" />', 'stargate must not train public PhoenixPurifier');
  assertNotIncludes(stargate, 'StargateTrainKarax', '<Unit value="Scout" />', 'stargate must not train public Scout');
  assertNotIncludes(stargate, 'StargateTrainKarax', '<Unit value="Carrier" />', 'stargate must not train public Carrier');
  assertIncludes(roboticsFacility, 'RoboticsFacilityKarax', '<TechTreeProducedUnitArray value="ColossusKarax" />', 'RoboticsFacilityKarax tech tree must unlock ColossusKarax');
  assertIncludes(stargateUnit, 'StargateKarax', '<TechTreeProducedUnitArray value="ScoutKarax" />', 'StargateKarax tech tree must unlock ScoutKarax');
  assertIncludes(stargateUnit, 'StargateKarax', '<TechTreeProducedUnitArray value="PhoenixPurifierKarax" />', 'StargateKarax tech tree must unlock PhoenixPurifierKarax');
  assertIncludes(stargateUnit, 'StargateKarax', '<TechTreeProducedUnitArray value="CarrierKarax" />', 'StargateKarax tech tree must unlock CarrierKarax');
  assertNotIncludes(stargateUnit, 'StargateKarax', '<TechTreeProducedUnitArray value="PhoenixPurifier" />', 'StargateKarax tech tree must not unlock public PhoenixPurifier');
}

function validateSolarForgeRequirement() {
  const countNode = getXmlBlock(texts.requirementNodeData, 'CRequirementCountUnit', 'CountUnitSolarForgeQueuedOrBetter') ?? '';
  assertIncludes(countNode, 'CountUnitSolarForgeQueuedOrBetter', '<Count Link="SolarForgeKarax" State="QueuedOrBetter" />', 'SolarForge requirement must count SolarForgeKarax');
  assertNotIncludes(countNode, 'CountUnitSolarForgeQueuedOrBetter', '<Count Link="SolarForge" State="QueuedOrBetter" />', 'SolarForge requirement must not count public SolarForge');
}

function validateSolarForgeDamageRepairChain() {
  const solarForge = getXmlBlock(texts.unitData, 'CUnit', 'SolarForgeKarax') ?? '';
  const damagedSolarForge = getXmlBlock(texts.unitData, 'CUnit', 'DamagedSolarForgeKarax') ?? '';
  const brokenAbility = getXmlBlock(texts.abilData, 'CAbilMorph', 'BrokenSolarForgeKarax') ?? '';
  const repairAbility = getXmlBlock(texts.abilData, 'CAbilMorph', 'RepairSolarForgeKarax') ?? '';
  const beamBehavior = getXmlBlock(texts.behaviorData, 'CBehaviorBuff', 'SolarForgeBeamKarax') ?? '';
  const preventDestroyBehavior = getXmlBlock(texts.behaviorData, 'CBehaviorBuff', 'SolarForgePreventDestroyKarax') ?? '';
  const repairBehavior = getXmlBlock(texts.behaviorData, 'CBehaviorBuff', 'SolarForgeRepairKarax') ?? '';
  const brokenEffect = getXmlBlock(texts.effectData, 'CEffectIssueOrder', 'BrokenSolarForgeIssueOrderKarax') ?? '';
  const repairEffect = getXmlBlock(texts.effectData, 'CEffectApplyBehavior', 'SolarForgeRepairABKarax') ?? '';
  const isSolarForge = getXmlBlock(texts.validatorData, 'CValidatorUnitType', 'IsSolarForgeKarax') ?? '';
  const isDamagedSolarForge = getXmlBlock(texts.validatorData, 'CValidatorUnitType', 'IsDamagedSolarForgeKarax') ?? '';
  const actor = getXmlBlock(texts.actorData, 'CActorUnit', 'SolarForgeKarax') ?? '';
  const damagedActor = getXmlBlock(texts.actorData, 'CActorUnit', 'DamagedSolarForgeKarax') ?? '';

  assertIncludes(solarForge, 'SolarForgeKarax', '<AbilArray index="3" removed="1" />', 'SolarForgeKarax must remove inherited public BrokenSolarForge ability');
  assertIncludes(solarForge, 'SolarForgeKarax', '<AbilArray Link="BrokenSolarForgeKarax" />', 'SolarForgeKarax must use private broken morph ability');
  assertIncludes(solarForge, 'SolarForgeKarax', '<BehaviorArray index="0" removed="1" />', 'SolarForgeKarax must remove inherited public prevent-destroy behavior');
  assertIncludes(solarForge, 'SolarForgeKarax', '<BehaviorArray index="1" removed="1" />', 'SolarForgeKarax must remove inherited public beam behavior');
  assertIncludes(solarForge, 'SolarForgeKarax', '<BehaviorArray Link="SolarForgePreventDestroyKarax" />', 'SolarForgeKarax must use private prevent-destroy behavior');
  assertIncludes(solarForge, 'SolarForgeKarax', '<BehaviorArray Link="SolarForgeBeamKarax" />', 'SolarForgeKarax must use private beam behavior');
  assertIncludes(solarForge, 'SolarForgeKarax', 'AbilCmd="BrokenSolarForgeKarax,Execute"', 'SolarForgeKarax damaged card must call private broken morph');

  assertIncludes(damagedSolarForge, 'DamagedSolarForgeKarax', '<AbilArray index="1" removed="1" />', 'DamagedSolarForgeKarax must remove inherited public RepairSolarForge ability');
  assertIncludes(damagedSolarForge, 'DamagedSolarForgeKarax', '<AbilArray Link="RepairSolarForgeKarax" />', 'DamagedSolarForgeKarax must use private repair ability');
  assertIncludes(damagedSolarForge, 'DamagedSolarForgeKarax', '<BehaviorArray index="1" removed="1" />', 'DamagedSolarForgeKarax must remove inherited public prevent-destroy behavior');
  assertIncludes(damagedSolarForge, 'DamagedSolarForgeKarax', '<BehaviorArray Link="SolarForgePreventDestroyKarax" />', 'DamagedSolarForgeKarax must use private prevent-destroy behavior');

  assertIncludes(brokenAbility, 'BrokenSolarForgeKarax', '<InfoArray Score="1" Unit="DamagedSolarForgeKarax" />', 'broken morph must produce DamagedSolarForgeKarax');
  assertNotIncludes(brokenAbility, 'BrokenSolarForgeKarax', 'Unit="DamagedSolarForge"', 'broken morph must not produce public DamagedSolarForge');
  assertIncludes(repairAbility, 'RepairSolarForgeKarax', '<InfoArray Score="1" Unit="SolarForgeKarax">', 'repair morph must produce SolarForgeKarax');
  assertNotIncludes(repairAbility, 'RepairSolarForgeKarax', 'Unit="SolarForge">', 'repair morph must not produce public SolarForge');
  assertIncludes(repairAbility, 'RepairSolarForgeKarax', 'value="SolarForgeRepairABKarax"', 'repair morph must apply private repair behavior');

  assertIncludes(beamBehavior, 'SolarForgeBeamKarax', '<DisableValidatorArray index="0" removed="1" />', 'private beam must remove inherited public IsSolarForge validator');
  assertIncludes(beamBehavior, 'SolarForgeBeamKarax', '<DisableValidatorArray value="IsSolarForgeKarax" />', 'private beam must validate SolarForgeKarax');
  assertIncludes(preventDestroyBehavior, 'SolarForgePreventDestroyKarax', 'Handled="BrokenSolarForgeIssueOrderKarax"', 'private prevent-destroy must issue private broken morph');
  assertIncludes(repairBehavior, 'SolarForgeRepairKarax', 'parent="SolarForgeRepair"', 'private repair behavior must exist');
  assertIncludes(brokenEffect, 'BrokenSolarForgeIssueOrderKarax', '<Abil value="BrokenSolarForgeKarax" />', 'private fatal effect must issue private broken morph ability');
  assertIncludes(repairEffect, 'SolarForgeRepairABKarax', '<Behavior value="SolarForgeRepairKarax" />', 'private repair apply effect must apply private repair behavior');
  assertIncludes(isSolarForge, 'IsSolarForgeKarax', '<Value value="SolarForgeKarax" />', 'private Solar Forge validator must target SolarForgeKarax');
  assertIncludes(isDamagedSolarForge, 'IsDamagedSolarForgeKarax', '<Value value="DamagedSolarForgeKarax" />', 'private damaged Solar Forge validator must target DamagedSolarForgeKarax');

  assertIncludes(actor, 'SolarForgeKarax actor', 'MorphTo DamagedSolarForgeKarax; MorphFrom SolarForgeKarax', 'private actor must handle private damaged morph');
  assertIncludes(damagedActor, 'DamagedSolarForgeKarax actor', 'unitName="DamagedSolarForgeKarax"', 'private damaged Solar Forge actor must exist');
}

function validateTechBuildingPanels() {
  const panelExpectations = [
    ['ForgeKarax', ['ForgeResearch,Research18', 'ForgeResearch,Research21', 'ForgeResearch,Research10', 'ForgeResearch,Research11', 'ForgeResearch,Research12'], ['Alarak', 'Fenix', 'Zeratul', 'DarkPylon']],
    ['TwilightCouncilKarax', ['TwilightCouncilResearch,Research10', 'TwilightCouncilResearch,Research13', 'TwilightCouncilResearch,Research14'], ['Alarak', 'Fenix', 'Adept', 'Stalker']],
    ['RoboticsBayKarax', ['RoboticsBayResearch,Research9', 'RoboticsBayResearch,Research10', 'RoboticsBayResearch,Research12'], ['Alarak', 'Fenix', 'Zeratul', 'Disruptor', 'Reaver']],
    ['FleetBeaconKarax', ['FleetBeaconResearch,Research17', 'FleetBeaconResearch,Research10', 'FleetBeaconResearch,Research18'], ['Fenix', 'VoidRay', 'Oracle', 'Corsair', 'Tempest']],
    ['SolarForgeKarax', ['SolarForgeResearch,Research1', 'SolarForgeResearch,Research2', 'SolarForgeResearch,Research3', 'SolarForgeResearch,Research4', 'SolarForgeResearch,Research5', 'SolarForgeResearch,Research6'], ['Alarak', 'Fenix', 'Zeratul']],
  ];

  for (const [unit, requiredCommands, forbiddenTokens] of panelExpectations) {
    const block = getXmlBlock(texts.unitData, 'CUnit', unit);
    if (!block) {
      errors.push(`Karax UnitData: missing ${unit}`);
      continue;
    }

    assertIncludes(block, unit, '<CardLayouts index="0" removed="1" />', `${unit} must remove inherited panel`);
    for (const command of requiredCommands) {
      assertIncludes(block, unit, `AbilCmd="${command}"`, `${unit} missing panel command ${command}`);
    }
    for (const token of forbiddenTokens) {
      assertNotIncludes(block, unit, token, `${unit} panel still exposes cross-commander token ${token}`);
    }
  }
}

function validateSmokeProfiles() {
  assertIncludes(texts.finalRosters, 'CommanderRosters Karax', '"ScoutKarax"', 'Karax roster smoke must create ScoutKarax');
  assertIncludes(texts.finalRosters, 'CommanderRosters Karax', '"PhoenixPurifierKarax"', 'Karax roster smoke must create PhoenixPurifierKarax');
  assertIncludes(texts.finalRosters, 'CommanderRosters Karax', '"ColossusKarax"', 'Karax roster smoke must create ColossusKarax');
  assertIncludes(texts.finalRosters, 'CommanderRosters Karax', '"CarrierKarax"', 'Karax roster smoke must create CarrierKarax');
  assertNotIncludes(getFunctionBlock(texts.finalRosters, 'libE0EAE146_gf_XMTestBench_KaraxRoster') ?? '', 'CommanderRosters Karax', '"PhoenixPurifier"', 'Karax roster smoke must not create public PhoenixPurifier');
  assertNotIncludes(getFunctionBlock(texts.finalRosters, 'libE0EAE146_gf_XMTestBench_KaraxRoster') ?? '', 'CommanderRosters Karax', '"Scout"', 'Karax roster smoke must not create public Scout');
  assertNotIncludes(getFunctionBlock(texts.finalRosters, 'libE0EAE146_gf_XMTestBench_KaraxRoster') ?? '', 'CommanderRosters Karax', '"Colossus"', 'Karax roster smoke must not create public Colossus');
  assertNotIncludes(getFunctionBlock(texts.finalRosters, 'libE0EAE146_gf_XMTestBench_KaraxRoster') ?? '', 'CommanderRosters Karax', '"Carrier"', 'Karax roster smoke must not create public Carrier');

  const buildings = getFunctionBlock(texts.finalBuildings, 'libE0EAE146_gf_XMTestBench_KaraxBuildings') ?? '';
  for (const building of ['NexusKarax', 'PylonKarax', 'AssimilatorKarax', 'ForgeKarax', 'CyberneticsCoreKarax', 'RoboticsFacilityKarax', 'RoboticsBayKarax', 'StargateKarax', 'FleetBeaconKarax']) {
    assertIncludes(buildings, 'CommanderBuildings Karax', `"${building}"`, `Karax building smoke missing ${building}`);
  }
  assertIncludes(buildings, 'CommanderBuildings Karax', 'libE0EAE146_gf_XMTestBench_LogBuildingRosterDone(lp_player, "Karax", lp_rosterKind, 15);', 'Karax building smoke should log 15 buildings');

  const unitAbilities = getFunctionBlock(texts.finalUnitAbilities, 'libE0EAE146_gf_XMTestBench_KaraxUnitAbilities') ?? '';
  assertIncludes(unitAbilities, 'CommanderUnitAbilities Karax', '"ScoutKarax"', 'Karax ability smoke must use ScoutKarax');
  assertIncludes(unitAbilities, 'CommanderUnitAbilities Karax', '"PhoenixPurifierKarax"', 'Karax ability smoke must use PhoenixPurifierKarax');
  assertIncludes(unitAbilities, 'CommanderUnitAbilities Karax', '"ColossusKarax"', 'Karax ability smoke must use ColossusKarax');
  assertIncludes(unitAbilities, 'CommanderUnitAbilities Karax', '"CarrierKarax"', 'Karax ability smoke must use CarrierKarax');
  for (const publicUnit of ['"PhoenixPurifier"', '"Scout"', '"Colossus"', '"Carrier"']) {
    assertNotIncludes(unitAbilities, 'CommanderUnitAbilities Karax', publicUnit, `Karax ability smoke must not use public ${publicUnit}`);
  }
}

function validatePrivateAssets() {
  const prestigeArmy = getXmlBlock(texts.upgradeData, 'CUpgrade', 'CommanderPrestigeKaraxArmy') ?? '';
  assertIncludes(prestigeArmy, 'CommanderPrestigeKaraxArmy', 'Unit,ColossusKarax,CostResource[Minerals]', 'army prestige must affect ColossusKarax minerals');
  assertIncludes(prestigeArmy, 'CommanderPrestigeKaraxArmy', 'Unit,PhoenixPurifierKarax,CostResource[Minerals]', 'army prestige must affect PhoenixPurifierKarax minerals');
  assertIncludes(prestigeArmy, 'CommanderPrestigeKaraxArmy', 'Unit,CarrierKarax,CostResource[Minerals]', 'army prestige must affect CarrierKarax minerals');
  assertNotIncludes(prestigeArmy, 'CommanderPrestigeKaraxArmy', 'Unit,PhoenixPurifier,CostResource[Minerals]', 'army prestige should not target public PhoenixPurifier');
  assertNotIncludes(prestigeArmy, 'CommanderPrestigeKaraxArmy', 'Unit,Colossus,CostResource[Minerals]', 'army prestige should not target public Colossus');
  assertNotIncludes(prestigeArmy, 'CommanderPrestigeKaraxArmy', 'Unit,Carrier,CostResource[Minerals]', 'army prestige should not target public Carrier');
}

function readText(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function stripXmlComments(text) {
  return text.replace(/<!--[\s\S]*?-->/g, '');
}

function getXmlBlock(text, tag, id) {
  const escaped = escapeRegExp(id);
  const re = new RegExp(`<${tag}[^>]*(?:id|Id)="${escaped}"[^>]*>[\\s\\S]*?<\\/${tag}>`);
  return text.match(re)?.[0] ?? null;
}

function getFunctionBlock(text, functionName) {
  const start = text.indexOf(`bool ${functionName}`);
  if (start < 0) {
    return null;
  }

  let depth = 0;
  let sawOpen = false;
  for (let index = start; index < text.length; index += 1) {
    const char = text[index];
    if (char === '{') {
      depth += 1;
      sawOpen = true;
    } else if (char === '}') {
      depth -= 1;
      if (sawOpen && depth === 0) {
        return text.slice(start, index + 1);
      }
    }
  }

  return null;
}

function assertIncludes(text, label, needle, message) {
  if (!text.includes(needle)) {
    errors.push(`${label}: ${message}`);
  }
}

function assertNotIncludes(text, label, needle, message) {
  if (text.includes(needle)) {
    errors.push(`${label}: ${message}`);
  }
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
