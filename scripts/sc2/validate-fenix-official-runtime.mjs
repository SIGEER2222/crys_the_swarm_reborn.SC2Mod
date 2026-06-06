import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const xmRoot = path.join(repoRoot, '合作指挥官版起义狂潮', 'Mods', 'XM');
const xmFinalRoot = path.join(xmRoot, 'XMFinal.SC2Mod');
const xmFenixRoot = path.join(xmRoot, 'XMFenix.SC2Mod');
const fenixGameDataRoot = path.join(xmFenixRoot, 'Base.SC2Data', 'GameData');

const files = {
  documentInfo: path.join(xmFinalRoot, 'DocumentInfo'),
  documentHeader: path.join(xmFinalRoot, 'DocumentHeader'),
  runtime: path.join(xmFinalRoot, 'Base.SC2Data', 'LibE0EAE146_FenixRuntime.galaxy'),
  finalUserData: path.join(xmFinalRoot, 'Base.SC2Data', 'GameData', 'UserData.xml'),
  finalGalaxy: path.join(xmFinalRoot, 'Base.SC2Data', 'LibE0EAE146.galaxy'),
  finalHeader: path.join(xmFinalRoot, 'Base.SC2Data', 'LibE0EAE146_h.galaxy'),
  unitData: path.join(fenixGameDataRoot, 'UnitData.xml'),
  abilData: path.join(fenixGameDataRoot, 'AbilData.xml'),
  buttonData: path.join(fenixGameDataRoot, 'ButtonData.xml'),
  requirementData: path.join(fenixGameDataRoot, 'RequirementData.xml'),
  requirementNodeData: path.join(fenixGameDataRoot, 'RequirementNodeData.xml'),
  effectData: path.join(fenixGameDataRoot, 'EffectData.xml'),
  strings: path.join(xmFenixRoot, 'zhCN.SC2Data', 'LocalizedData', 'GameStrings.txt'),
};

const texts = Object.fromEntries(Object.entries(files).map(([key, filePath]) => [key, readText(filePath)]));
const errors = [];

const privateRuntimeUnits = [
  'NexusFenix',
  'ProbeFenix',
  'PylonFenix',
  'GatewayFenix',
  'WarpGateFenix',
  'PhotonCannonFenix',
  'ForgeFenix',
  'TwilightCouncilFenix',
  'RoboticsFacilityFenix',
  'RoboticsBayFenix',
  'StargateFenix',
  'FleetBeaconFenix',
  'ZealotPurifier',
  'AdeptFenix',
  'SentryFenix',
  'SentryFenixPhasing',
  'ObserverFenix',
  'ObserverSiegeModeFenix',
  'ImmortalFenix',
  'ScoutFenix',
  'CarrierFenix',
  'DisruptorFenix',
  'ColossusPurifier',
  'FenixKaldalisZealot',
  'FenixTalisAdept',
  'FenixTaldarinImmortal',
  'FenixWarbringerColossus',
  'FenixMojoScout',
  'FenixClolarionCarrier',
  'FenixCoop',
  'FenixDragoon',
  'FenixArbiter',
  'SoACasterFenix',
  'FenixAltarOfPsiStorms',
];

const publicBlockedUnits = [
  'Nexus',
  'Probe',
  'Pylon',
  'Gateway',
  'WarpGate',
  'PhotonCannon',
  'RoboticsBay',
  'TwilightCouncil',
  'Adept',
  'Immortal',
  'Scout',
  'Carrier',
  'Disruptor',
];

const fullLevelUpgrades = [
  ['CommanderLevel', 16],
  ['FenixCommander', 1],
  ['FenixResearchCostReduction', 1],
  ['FenixNoTechNoGas', 1],
  ['FenixOfflineSuitRegen', 1],
  ['FenixChampionSwapBoost', 1],
  ['FenixNetworkedSuperiority', 1],
  ['FenixNetworkedSuperiorityAdept', 1],
  ['FenixNetworkedSuperiorityCarrier', 1],
  ['FenixNetworkedSuperiorityColossus', 1],
  ['FenixNetworkedSuperiorityImmortal', 1],
  ['FenixNetworkedSuperiorityScout', 1],
  ['FenixNetworkedSuperiorityZealot', 1],
  ['FenixUnlockDisruptor', 1],
  ['FenixWarbringerColossusIceBeam', 1],
];

const masteries = [
  'MasteryFenixSuitAttackSpeed',
  'MasteryFenixSuitEnergyRegen',
  'MasteryFenixChampionAttackSpeed',
  'MasteryFenixChampionLifeShieldBuff',
  'MasteryFenixChronoBoostExtra',
  'MasteryFenixExtraStartingSupply',
];

const positivePrestigeUpgrades = [
  'CommanderPrestigeFenixSuitSwap',
  'CommanderPrestigeFenixSuitSwapMastery',
  'CommanderPrestigeFenixDataWeb',
  'CommanderPrestigeFenixAvenger',
  'CommanderPrestigeFenixAvengerMastery',
];

const championChains = [
  {
    name: 'Kaldalis',
    research: 'Research1',
    upgrade: 'FenixChampionKaldalisZealot',
    researchRequirement: 'UpgradeFenixKaldalisZealot',
    host: 'ZealotPurifier',
    morph: 'FenixKaldalisZealotMorph',
    morphRequirement: 'FenixKaldalisZealotCount',
    morphGate: 'AndCountUpgradeFenixChampionKaldalisZealotCompleteOnlyEqCountUnitFenixKaldalisZealotCompleteOnly0',
    output: 'FenixKaldalisZealot',
    finishEffect: 'FenixChampionSwapImpactSetZealot',
    inactiveRequirement: 'HaveFenixKaldalisZealot',
    activeRequirement: 'HaveFenixKaldalisZealotActive',
  },
  {
    name: 'Talis',
    research: 'Research2',
    upgrade: 'FenixChampionTalisAdept',
    researchRequirement: 'UpgradeFenixTalisAdept',
    host: 'AdeptFenix',
    morph: 'FenixTalisAdeptMorph',
    morphRequirement: 'FenixTalisAdeptCount',
    morphGate: 'AndCountUpgradeFenixChampionTalisAdeptCompleteOnlyEqCountUnitFenixTalisAdeptCompleteOnly0',
    output: 'FenixTalisAdept',
    finishEffect: 'FenixChampionSwapImpactSetAdept',
    inactiveRequirement: 'HaveFenixTalisAdept',
    activeRequirement: 'HaveFenixTalisAdeptActive',
  },
  {
    name: 'Mojo',
    research: 'Research3',
    upgrade: 'FenixChampionMojoScout',
    researchRequirement: 'UpgradeFenixMojoScout',
    host: 'ScoutFenix',
    morph: 'FenixMojoScoutMorph',
    morphRequirement: 'FenixMojoScoutCount',
    morphGate: 'AndCountUpgradeFenixChampionMojoScoutCompleteOnlyEqCountUnitFenixMojoScoutCompleteOnly0',
    output: 'FenixMojoScout',
    finishEffect: 'FenixChampionSwapImpactSetScout',
    inactiveRequirement: 'HaveFenixMojoScout',
    activeRequirement: 'HaveFenixMojoScoutActive',
  },
  {
    name: 'Taldarin',
    research: 'Research4',
    upgrade: 'FenixChampionTaldarinImmortal',
    researchRequirement: 'UpgradeFenixTaldarinImmortal',
    host: 'ImmortalFenix',
    morph: 'FenixTaldarinImmortalMorph',
    morphRequirement: 'FenixChampionImmortalCount',
    morphGate: 'AndCountUpgradeFenixChampionTaldarinImmortalCompleteOnlyEqCountUnitFenixTaldarinImmortalCompleteOnly0',
    output: 'FenixTaldarinImmortal',
    finishEffect: 'FenixChampionSwapImpactSetImmortal',
    inactiveRequirement: 'HaveFenixTaldarinImmortal',
    activeRequirement: 'HaveFenixTaldarinImmortalActive',
  },
  {
    name: 'Warbringer',
    research: 'Research5',
    upgrade: 'FenixChampionWarbringerColossus',
    researchRequirement: 'UpgradeFenixWarbringerColossus',
    host: 'ColossusPurifier',
    morph: 'FenixWarbringerColossusMorph',
    morphRequirement: 'FenixWarbringerColossusCount',
    morphGate: 'AndCountUpgradeFenixChampionWarbringerColossusCompleteOnlyEqCountUnitFenixWarbringerColossusCompleteOnly0',
    output: 'FenixWarbringerColossus',
    finishEffect: 'FenixChampionSwapImpactSetColossus',
    inactiveRequirement: 'HaveFenixWarbringerColossus',
    activeRequirement: 'HaveFenixWarbringerColossusActive',
  },
  {
    name: 'Clolarion',
    research: 'Research6',
    upgrade: 'FenixChampionClolarionCarrier',
    researchRequirement: 'UpgradeFenixClolarionCarrier',
    host: 'CarrierFenix',
    morph: 'FenixClolarionCarrierMorph',
    morphRequirement: 'FenixClolarionCarrierCount',
    morphGate: 'AndCountUpgradeFenixChampionClolarionCarrierCompleteOnlyEqCountUnitFenixClolarionCarrierCompleteOnly0',
    output: 'FenixClolarionCarrier',
    finishEffect: 'FenixChampionSwapImpactSetCarrier',
    inactiveRequirement: 'HaveFenixClolarionCarrier',
    activeRequirement: 'HaveFenixClolarionCarrierActive',
  },
];

validateDependencyGate();
validateRuntime();
validateRuntimeRoster();
validatePrivateProduction();
validateForgePanel();
validateChampionChains();

if (errors.length > 0) {
  console.error('FAIL: Fenix official runtime validation failed');
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log('PASS: Fenix official runtime validation passed');

function validateDependencyGate() {
  const dependency = 'file:Mods\\XM\\XMFenix.SC2Mod';
  assertIncludes(stripXmlComments(texts.documentInfo), 'XMFinal DocumentInfo', `<Value>${dependency}</Value>`, 'XMFenix dependency is not active');
  assertIncludes(texts.documentHeader, 'XMFinal DocumentHeader', dependency, 'XMFenix dependency is not in live DocumentHeader');
  assertIncludes(texts.finalGalaxy, 'XMFinal LibE0EAE146.galaxy', 'include "LibE0EAE146_FenixRuntime"', 'missing Fenix runtime include');
  assertIncludes(texts.finalHeader, 'XMFinal LibE0EAE146_h.galaxy', 'void libE0EAE146_gf_FenixRuntimeInit', 'missing Fenix runtime declaration');
}

function validateRuntime() {
  for (const [upgrade, level] of fullLevelUpgrades) {
    assertIncludes(texts.runtime, 'Fenix runtime', `libE0EAE146_gf_FenixSetUpgradeAtLeast(lp_player, "${upgrade}", ${level});`, `missing full-level upgrade grant ${upgrade}=${level}`);
  }

  for (const upgrade of masteries) {
    assertIncludes(texts.runtime, 'Fenix runtime', `libE0EAE146_gf_FenixSetUpgradeAtLeast(lp_player, "${upgrade}", 30);`, `missing mastery grant ${upgrade}=30`);
  }

  for (const upgrade of positivePrestigeUpgrades) {
    assertIncludes(texts.runtime, 'Fenix runtime', `libE0EAE146_gf_FenixSetUpgradeAtLeast(lp_player, "${upgrade}", 1);`, `missing positive prestige grant ${upgrade}`);
  }

  for (const unit of publicBlockedUnits) {
    assertIncludes(texts.runtime, 'Fenix runtime', `libE0EAE146_gf_FenixBlockUnitIfPresent(lp_player, "${unit}");`, `runtime must block public ${unit}`);
  }

  for (const unit of privateRuntimeUnits) {
    assertIncludes(texts.runtime, 'Fenix runtime', `libE0EAE146_gf_FenixAllowUnitIfPresent(lp_player, "${unit}");`, `runtime must allow private ${unit}`);
  }

  for (const ability of ['ProtossBuildFenix', 'NexusTrainFenix', 'GatewayTrainFenix', 'WarpGateTrainFenix', 'RoboticsFacilityTrainFenix', 'StargateTrainFenix', 'FenixAltarOfPsiStormsResearch']) {
    assertIncludes(texts.runtime, 'Fenix runtime', `libE0EAE146_gf_FenixAllowAbilityIfPresent(lp_player, "${ability}", 0);`, `runtime must allow ${ability}`);
  }
}

function validateRuntimeRoster() {
  const block = getXmlBlock(texts.finalUserData, 'Instances', 'Fenix');
  if (!block) {
    errors.push('XMFinal UserData.xml: missing CommanderRuntimeRoster/Fenix');
    return;
  }

  for (const unit of privateRuntimeUnits) {
    assertIncludes(block, 'CommanderRuntimeRoster/Fenix', `<Unit Unit="${unit}">`, `runtime roster missing ${unit}`);
  }

  for (const unit of publicBlockedUnits) {
    assertNotIncludes(block, 'CommanderRuntimeRoster/Fenix', `<Unit Unit="${unit}">`, `runtime roster must not use public ${unit}`);
  }
}

function validatePrivateProduction() {
  const expectedTrainOutputs = {
    GatewayTrainFenix: ['ZealotPurifier', 'AdeptFenix', 'SentryFenix'],
    WarpGateTrainFenix: ['ZealotPurifier', 'AdeptFenix', 'SentryFenix'],
    RoboticsFacilityTrainFenix: ['ObserverFenix', 'ColossusPurifier', 'ImmortalFenix', 'DisruptorFenix'],
    StargateTrainFenix: ['ScoutFenix', 'CarrierFenix'],
  };

  for (const [ability, units] of Object.entries(expectedTrainOutputs)) {
    const block = getXmlBlockById(texts.abilData, ability);
    if (!block) {
      errors.push(`XMFenix AbilData.xml: missing ${ability}`);
      continue;
    }

    for (const unit of units) {
      assertIncludes(block, ability, `<Unit value="${unit}"`, `${ability} must produce ${unit}`);
    }

    for (const unit of ['Adept', 'Immortal', 'Scout', 'Carrier', 'Disruptor', 'Observer']) {
      assertNotIncludes(block, ability, `<Unit value="${unit}"`, `${ability} must not produce public ${unit}`);
    }
  }
}

function validateForgePanel() {
  const forge = getXmlBlock(texts.unitData, 'CUnit', 'ForgeFenix');
  if (!forge) {
    errors.push('XMFenix UnitData.xml: missing ForgeFenix');
    return;
  }

  for (let level = 1; level <= 5; level += 1) {
    assertIncludes(texts.abilData, 'XMFenix AbilData.xml', `DefaultButtonFace="ProtossFenixWeaponsLevel${level}"`, `ForgeResearch must use Fenix weapon button ${level}`);
    assertIncludes(texts.abilData, 'XMFenix AbilData.xml', `DefaultButtonFace="ProtossFenixArmorLevel${level}"`, `ForgeResearch must use Fenix armor button ${level}`);
    assertIncludes(forge, 'ForgeFenix', `Face="ProtossFenixWeaponsLevel${level}"`, `ForgeFenix must show Fenix weapon button ${level}`);
    assertIncludes(forge, 'ForgeFenix', `Face="ProtossFenixArmorLevel${level}"`, `ForgeFenix must show Fenix armor button ${level}`);
    assertXmlBlock(texts.buttonData, 'CButton', `ProtossFenixWeaponsLevel${level}`, 'XMFenix ButtonData.xml', `missing ProtossFenixWeaponsLevel${level}`);
    assertXmlBlock(texts.buttonData, 'CButton', `ProtossFenixArmorLevel${level}`, 'XMFenix ButtonData.xml', `missing ProtossFenixArmorLevel${level}`);
    assertIncludes(texts.strings, 'XMFenix GameStrings.txt', `Button/Name/ProtossFenixWeaponsLevel${level}=`, `missing zhCN name for ProtossFenixWeaponsLevel${level}`);
    assertIncludes(texts.strings, 'XMFenix GameStrings.txt', `Button/Name/ProtossFenixArmorLevel${level}=`, `missing zhCN name for ProtossFenixArmorLevel${level}`);
  }

  assertNotIncludes(texts.abilData, 'XMFenix AbilData.xml', 'DefaultButtonFace="ProtossAlarak', 'Fenix ForgeResearch must not use Alarak button faces');
  assertNotIncludes(forge, 'ForgeFenix', 'Face="ProtossAlarak', 'ForgeFenix must not expose Alarak button faces');
}

function validateChampionChains() {
  const research = getXmlBlock(texts.abilData, 'CAbilResearch', 'FenixAltarOfPsiStormsResearch');
  if (!research) {
    errors.push('XMFenix AbilData.xml: missing FenixAltarOfPsiStormsResearch');
    return;
  }

  for (const chain of championChains) {
    assertIncludes(research, 'FenixAltarOfPsiStormsResearch', `index="${chain.research}"`, `${chain.name} research slot missing`);
    assertIncludes(research, 'FenixAltarOfPsiStormsResearch', `Upgrade="${chain.upgrade}"`, `${chain.name} research must grant ${chain.upgrade}`);
    assertIncludes(research, 'FenixAltarOfPsiStormsResearch', `Requirements="${chain.researchRequirement}"`, `${chain.name} research requirement missing`);

    const host = getXmlBlock(texts.unitData, 'CUnit', chain.host);
    assertIncludes(host, `host ${chain.host}`, `AbilArray Link="${chain.morph}"`, `${chain.host} must explicitly mount ${chain.morph}`);

    const morph = getXmlBlock(texts.abilData, 'CAbilMorph', chain.morph);
    assertIncludes(morph, chain.morph, `Requirements="${chain.morphRequirement}"`, `${chain.morph} must use ${chain.morphRequirement}`);
    assertIncludes(morph, chain.morph, `Unit="${chain.output}"`, `${chain.morph} must output ${chain.output}`);
    assertIncludes(morph, chain.morph, `value="${chain.finishEffect}"`, `${chain.morph} must finish with ${chain.finishEffect}`);

    const morphRequirement = getXmlBlock(texts.requirementData, 'CRequirement', chain.morphRequirement);
    assertIncludes(morphRequirement, chain.morphRequirement, `Link="${chain.morphGate}"`, `${chain.morphRequirement} must gate on completed download upgrade and zero champion count`);
    assertXmlBlock(texts.requirementNodeData, 'CRequirementAnd', chain.morphGate, 'XMFenix RequirementNodeData.xml', `missing morph gate ${chain.morphGate}`);
    assertXmlBlock(texts.effectData, 'CEffectSet', chain.finishEffect, 'XMFenix EffectData.xml', `missing champion finish effect ${chain.finishEffect}`);
    assertXmlBlock(texts.requirementData, 'CRequirement', chain.inactiveRequirement, 'XMFenix RequirementData.xml', `missing inactive panel requirement ${chain.inactiveRequirement}`);
    assertXmlBlock(texts.requirementData, 'CRequirement', chain.activeRequirement, 'XMFenix RequirementData.xml', `missing active panel requirement ${chain.activeRequirement}`);
  }
}

function getXmlBlock(text, tagName, id) {
  const pattern = new RegExp(`<${tagName}[^>]*\\b(?:id|Id)="${escapeRegExp(id)}"[\\s\\S]*?</${tagName}>`);
  return text.match(pattern)?.[0] ?? '';
}

function getXmlBlockById(text, id) {
  const pattern = new RegExp(`<([A-Za-z0-9_]+)[^>]*\\b(?:id|Id)="${escapeRegExp(id)}"[\\s\\S]*?</\\1>`);
  return text.match(pattern)?.[0] ?? '';
}

function assertXmlBlock(text, tagName, id, owner, message) {
  if (!getXmlBlock(text, tagName, id)) {
    errors.push(`${owner}: ${message}`);
  }
}

function assertIncludes(text, owner, needle, message) {
  if (!text.includes(needle)) {
    errors.push(`${owner}: ${message}`);
  }
}

function assertNotIncludes(text, owner, needle, message) {
  if (text.includes(needle)) {
    errors.push(`${owner}: ${message}`);
  }
}

function stripXmlComments(text) {
  return text.replace(/<!--[\s\S]*?-->/g, '');
}

function readText(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
