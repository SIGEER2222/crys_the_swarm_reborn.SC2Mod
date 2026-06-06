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
  runtimeSafety: path.join(xmFinalRoot, 'Base.SC2Data', 'LibE0EAE146_RuntimeSafety.galaxy'),
  commanderPanels: path.join(xmFinalRoot, 'Base.SC2Data', 'LibE0EAE146_CommanderPanels.galaxy'),
  commanderStartSquads: path.join(xmFinalRoot, 'Base.SC2Data', 'LibE0EAE146_CommanderStartSquads.galaxy'),
  commanderUnitAbilities: path.join(xmFinalRoot, 'Base.SC2Data', 'LibE0EAE146_CommanderUnitAbilities.galaxy'),
  finalGalaxy: path.join(xmFinalRoot, 'Base.SC2Data', 'LibE0EAE146.galaxy'),
  finalHeader: path.join(xmFinalRoot, 'Base.SC2Data', 'LibE0EAE146_h.galaxy'),
  ttosh03bMap: path.join(repoRoot, '合作指挥官版起义狂潮', 'Maps', 'XM', 'ttosh03b.SC2Map', 'MapScript.galaxy'),
  tvalerian01Map: path.join(repoRoot, '合作指挥官版起义狂潮', 'Maps', 'XM', 'tvalerian01.SC2Map', 'MapScript.galaxy'),
  userData: path.join(gameDataRoot, 'UserData.xml'),
  unitData: path.join(gameDataRoot, 'UnitData.xml'),
  buttonData: path.join(gameDataRoot, 'ButtonData.xml'),
  abilData: path.join(gameDataRoot, 'AbilData.xml'),
  effectData: path.join(gameDataRoot, 'EffectData.xml'),
  behaviorData: path.join(gameDataRoot, 'BehaviorData.xml'),
  actorData: path.join(gameDataRoot, 'ActorData.xml'),
  upgradeData: path.join(gameDataRoot, 'UpgradeData.xml'),
  requirementData: path.join(gameDataRoot, 'RequirementData.xml'),
  requirementNodeData: path.join(gameDataRoot, 'RequirementNodeData.xml'),
  finalEffectData: path.join(xmFinalRoot, 'Base.SC2Data', 'GameData', 'EffectData.xml'),
  finalRequirementData: path.join(xmFinalRoot, 'Base.SC2Data', 'GameData', 'RequirementData.xml'),
  finalRequirementNodeData: path.join(xmFinalRoot, 'Base.SC2Data', 'GameData', 'RequirementNodeData.xml'),
};

const texts = Object.fromEntries(Object.entries(files).map(([key, filePath]) => [key, readText(filePath)]));

validateDependencyGate();
validateCommanderAch();
validateRuntimeEntryPoints();
validatePrivateLarvaClosure();
validateWorkerBuildClosure();
validatePrivateTechResearchClosure();
validateLarvaTrainClosure();
validateRavagerClosure();
validatePrivateCombatAndEvolutionClosure();
validateViperSkillAndResearchClosure();
validateToxicNestClosure();
validateRuntimeFullLevelClosure();
validateBiomassRuntimeClosure();
validateRuntimePollutionGuard();
validateRuntimeSquadClosure();
validateTestBenchAbilitySmoke();

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
  const activeDocumentInfo = stripXmlComments(texts.documentInfo);
  assertIncludes(activeDocumentInfo, 'XMFinal DocumentInfo', `<Value>${dependency}</Value>`, 'XMAbathur dependency is not active');

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

function validateRuntimeEntryPoints() {
  const openerSafetyBlock = getFunctionBlock(texts.runtimeSafety, 'libE0EAE146_gf_CommanderAchUnit');

  assertIncludes(
    openerSafetyBlock,
    'XMFinal LibE0EAE146_RuntimeSafety.galaxy',
    'libE0EAE146_gv_commander == "Abathur"',
    'CommanderAchUnit must harden ordinary Abathur before UserData lookup',
  );

  for (const unitId of ['HatcheryAbathur', 'DroneAbathur', 'OverlordAbathur']) {
    assertIncludes(
      openerSafetyBlock,
      'XMFinal LibE0EAE146_RuntimeSafety.galaxy',
      `libE0EAE146_gf_CatalogUnitOrEmpty("${unitId}")`,
      `CommanderAchUnit must prefer private ${unitId}`,
    );
  }

  const ttosh03bAbathurBranch = getBranchBlock(
    texts.ttosh03bMap,
    'else if (auto2F29E444_val == "Abathur") {',
    'ttosh03b MapScript.galaxy',
  );
  assertIncludes(
    ttosh03bAbathurBranch,
    'ttosh03b MapScript.galaxy',
    'libE0EAE146_gf_AbathurRuntimeInit(1, PointFromId(29), true);',
    'ordinary Abathur branch must run Abathur runtime init',
  );

  assertNoMatch(
    texts.tvalerian01Map,
    /UserDataGetUnit\("CommanderAch"/,
    'tvalerian01 MapScript.galaxy: opener creation must use CommanderAchUnit runtime safety wrapper',
  );
  for (const field of ['CommandCenter', 'Worker', 'SecondUnit']) {
    assertIncludes(
      texts.tvalerian01Map,
      'tvalerian01 MapScript.galaxy',
      `libE0EAE146_gf_CommanderAchUnit("${field}")`,
      `tvalerian01 opener must use CommanderAchUnit for ${field}`,
    );
  }

  const tvalerian01AbathurBranch = getBranchBlock(
    texts.tvalerian01Map,
    'else if ((libE0EAE146_gv_commander == "Abathur")) {',
    'tvalerian01 MapScript.galaxy',
  );
  assertIncludes(
    tvalerian01AbathurBranch,
    'tvalerian01 MapScript.galaxy',
    'libE0EAE146_gf_AbathurRuntimeInit(1, PointFromId(2061979945), true);',
    'ordinary Abathur branch must run Abathur runtime init in tvalerian01',
  );
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

function validatePrivateTechResearchClosure() {
  const privateResearchAbilities = {
    EvolutionChamberResearchAbathur: [
      'InfoArray index="Research10" Upgrade="AberrationArmorAura"',
      'InfoArray index="Research11" Time="60" Upgrade="AbathurHatcheryDoubleQueue"',
      'InfoArray index="Research12" Time="60" Upgrade="AbathurBioMechanicalTransfusion"',
      'InfoArray index="Research13" Time="160" Upgrade="ZagaraGroundAttacksLevel1"',
      'InfoArray index="Research17" Time="220" Upgrade="ZagaraGroundAttacksLevel5"',
    ],
    RoachWarrenResearchAbathur: [
      'InfoArray index="Research5" Time="110" Upgrade="HotSRoachDamage"',
      'InfoArray index="Research7" Time="90" Upgrade="RavagerCorrosiveBileRadiusIncrease"',
      'InfoArray index="Research8" Time="120" Upgrade="RavagerCorrosiveBileDamageIncrease"',
      'InfoArray index="Research10" Time="60" Upgrade="AbathurRoachRangeScalingUpgrade"',
    ],
    InfestationPitResearchAbathur: [
      'InfoArray index="Research9" Time="60" Upgrade="ViperImprovedCastRange"',
      'InfoArray index="Research10" Time="60" Upgrade="ViperAbductImprovedStun"',
      'InfoArray index="Research11" Time="60" Upgrade="HotSCreepGeneration"',
      'InfoArray index="Research12" Time="120" Upgrade="AbathurDeepTunnel"',
    ],
    SpireResearchAbathur: [
      'InfoArray index="Research7" Time="90" Upgrade="HotSViciousGlaive"',
      'InfoArray index="Research10" Time="60" Upgrade="HotSRapidRegeneration"',
      'InfoArray index="Research11" Time="90" Upgrade="GuardianAttackRangeIncrease"',
      'InfoArray index="Research12" Time="90" Upgrade="DevourerAoEDamage"',
      'InfoArray index="Research13" Time="60" Upgrade="AbathurMutaliskHealthScalingUpgrade"',
    ],
  };

  for (const [abilityId, tokens] of Object.entries(privateResearchAbilities)) {
    const block = getXmlBlock(texts.abilData, 'CAbilResearch', abilityId);
    for (const token of tokens) {
      assertBlockIncludes(block, 'XMAbathur AbilData.xml', token, `${abilityId} must define ${token}`);
    }
  }

  const buildingResearchLinks = [
    {
      unitId: 'EvolutionChamberAbathur',
      abilityId: 'EvolutionChamberResearchAbathur',
      sharedAbilityId: 'evolutionchamberresearch',
      command: 'EvolutionChamberResearchAbathur,Research11',
    },
    {
      unitId: 'RoachWarrenAbathur',
      abilityId: 'RoachWarrenResearchAbathur',
      sharedAbilityId: 'RoachWarrenResearch',
      command: 'RoachWarrenResearchAbathur,Research10',
    },
    {
      unitId: 'InfestationPitAbathur',
      abilityId: 'InfestationPitResearchAbathur',
      sharedAbilityId: 'InfestationPitResearch',
      command: 'InfestationPitResearchAbathur,Research9',
    },
    {
      unitId: 'SpireAbathur',
      abilityId: 'SpireResearchAbathur',
      sharedAbilityId: 'SpireResearch',
      command: 'SpireResearchAbathur,Research13',
    },
    {
      unitId: 'GreaterSpireAbathur',
      abilityId: 'SpireResearchAbathur',
      sharedAbilityId: 'SpireResearch',
      command: 'SpireResearchAbathur,Research13',
    },
  ];

  for (const { unitId, abilityId, sharedAbilityId, command } of buildingResearchLinks) {
    const block = getXmlBlock(texts.unitData, 'CUnit', unitId);
    assertBlockIncludes(block, 'XMAbathur UnitData.xml', `AbilArray Link="${abilityId}"`, `${unitId} must mount private ${abilityId}`);
    assertBlockIncludes(block, 'XMAbathur UnitData.xml', `AbilCmd="${command}"`, `${unitId} command card must use ${command}`);
    assertBlockNotIncludes(block, 'XMAbathur UnitData.xml', `AbilArray Link="${sharedAbilityId}"`, `${unitId} must not mount shared ${sharedAbilityId}`);
    assertBlockNotIncludes(block, 'XMAbathur UnitData.xml', `AbilCmd="${sharedAbilityId},`, `${unitId} command card must not use shared ${sharedAbilityId}`);
  }

  const masteryBlock = getXmlBlock(texts.upgradeData, 'CUpgrade', 'MasteryAbathurTechFastBuild');
  for (const reference of [
    'Abil,UpgradeToLairAbathur,InfoArray[0].SectionArray[0].DurationArray[0]',
    'Abil,UpgradeToHiveAbathur,InfoArray[0].SectionArray[0].DurationArray[0]',
    'Abil,UpgradeToGreaterSpireAbathur,InfoArray[0].SectionArray[0].DurationArray[0]',
    'Abil,ZergBuildAbathur,InfoArray[Build1].Time',
    'Abil,ZergBuildAbathur,InfoArray[Build14].Time',
    'Abil,EvolutionChamberResearchAbathur,InfoArray[Research11].Time',
    'Abil,RoachWarrenResearchAbathur,InfoArray[Research10].Time',
    'Abil,InfestationPitResearchAbathur,InfoArray[Research9].Time',
    'Abil,SpireResearchAbathur,InfoArray[Research13].Time',
  ]) {
    assertBlockIncludes(masteryBlock, 'XMAbathur UpgradeData.xml', `Reference="${reference}"`, `MasteryAbathurTechFastBuild must affect private ${reference}`);
  }

  const mutaliskScaling = getXmlBlock(texts.upgradeData, 'CUpgrade', 'AbathurMutaliskHealthScalingUpgrade');
  for (const token of [
    'Reference="Unit,MutaliskAbathur,LifeMax" Value="25"',
    'Reference="Unit,MutaliskAbathur,LifeStart" Value="25"',
    'Reference="Unit,AbathurGuardian,LifeMax" Value="25"',
    'Reference="Unit,DevourerAbathur,LifeMax" Value="25"',
    'Reference="Abil,SpireResearchAbathur,InfoArray[Research13].Time" Value="30.000000"',
    'AffectedUnitArray value="MutaliskAbathur"',
    'AffectedUnitArray value="AbathurGuardian"',
    'AffectedUnitArray value="DevourerAbathur"',
  ]) {
    assertBlockIncludes(mutaliskScaling, 'XMAbathur UpgradeData.xml', token, `AbathurMutaliskHealthScalingUpgrade must affect private chain via ${token}`);
  }

  const roachScaling = getXmlBlock(texts.upgradeData, 'CUpgrade', 'AbathurRoachRangeScalingUpgrade');
  for (const token of [
    'Reference="Abil,RoachWarrenResearchAbathur,InfoArray[Research10].Resource[Minerals]" Value="50"',
    'Reference="Abil,RoachWarrenResearchAbathur,InfoArray[Research10].Resource[Vespene]" Value="50"',
    'Reference="Abil,RoachWarrenResearchAbathur,InfoArray[Research10].Time" Value="30.000000"',
    'AffectedUnitArray value="RoachVile"',
    'AffectedUnitArray value="RoachVileBurrowed"',
  ]) {
    assertBlockIncludes(roachScaling, 'XMAbathur UpgradeData.xml', token, `AbathurRoachRangeScalingUpgrade must affect private chain via ${token}`);
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

function validatePrivateCombatAndEvolutionClosure() {
  const privateUnitChecks = [
    {
      unitId: 'MutaliskAbathur',
      required: [
        'AbilArray Link="MutaliskMorphToGuardian"',
        'AbilArray Link="MutaliskMorphToDevourer"',
        'AbilArray Link="EvolveToLeviathanMutalisk"',
        'AbilCmd="MutaliskMorphToDevourer,Train1"',
        'AbilCmd="MutaliskMorphToGuardian,Train1"',
        'AbilCmd="EvolveToLeviathanMutalisk,Train1"',
      ],
    },
    {
      unitId: 'AbathurGuardian',
      required: [
        'AbilArray Link="EvolveToLeviathanGuardianMP"',
        'AbilCmd="EvolveToLeviathanGuardianMP,Train1"',
        'Face="GuardianAttackRangeIncrease" Type="Passive" Requirements="HaveGuardianAttackRangeIncrease"',
      ],
    },
    {
      unitId: 'DevourerAbathur',
      required: [
        'AbilArray Link="CorrosiveAcid"',
        'AbilArray Link="EvolveToLeviathanDevourer"',
        'AbilCmd="CorrosiveAcid,Execute"',
        'AbilCmd="EvolveToLeviathanDevourer,Train1"',
        'Face="DevourerAoEDamage" Type="Passive" Requirements="HaveDevourerAoEDamage"',
      ],
    },
    {
      unitId: 'SwarmHostAbathur',
      required: [
        'AbilArray Link="AbathurDeepTunnel"',
        'AbilArray Link="AbathurDeepTunnelImproved"',
        'AbilArray Link="LocustLaunch"',
        'AbilArray Link="EvolveToBrutaliskSwarmHost"',
        'AbilArray Link="MorphToSwarmHostBurrowedAbathur"',
        'AbilCmd="LocustLaunch,Execute"',
        'AbilCmd="AbathurDeepTunnel,Execute"',
        'AbilCmd="AbathurDeepTunnelImproved,Execute"',
        'AbilCmd="EvolveToBrutaliskSwarmHost,Train1"',
        'AbilCmd="MorphToSwarmHostBurrowedAbathur,Execute"',
      ],
    },
    {
      unitId: 'SwarmHostAbathurBurrowed',
      required: [
        'AbilArray Link="AbathurDeepTunnel"',
        'AbilArray Link="AbathurDeepTunnelImproved"',
        'AbilArray Link="EvolveToBrutaliskSwarmHost"',
        'AbilArray Link="MorphToSwarmHostAbathur"',
        'AbilCmd="AbathurDeepTunnel,Execute"',
        'AbilCmd="AbathurDeepTunnelImproved,Execute"',
        'AbilCmd="EvolveToBrutaliskSwarmHost,Train1"',
        'AbilCmd="MorphToSwarmHostAbathur,Execute"',
      ],
    },
    {
      unitId: 'BrutaliskAbathur',
      required: [
        'AbilArray Link="BrutaliskDeepTunnel"',
        'AbilArray Link="SymbioteCarapace"',
        'AbilArray Link="BurrowBrutaliskAbathurDown"',
        'AbilArray Link="AbathurSymbioteHangerBrutalisk"',
        'AbilCmd="BrutaliskDeepTunnel,Execute"',
        'AbilCmd="SymbioteCarapace,Execute"',
        'AbilCmd="BurrowBrutaliskAbathurDown,Execute"',
      ],
      forbidden: ['AbilCmd="BurrowBrutaliskDown,Execute"'],
    },
    {
      unitId: 'BrutaliskAbathurBurrowed',
      required: [
        'AbilArray Link="BurrowBrutaliskAbathurUp"',
        'AbilArray Link="AbathurSymbioteHangerBrutalisk"',
        'AbilCmd="BurrowBrutaliskAbathurUp,Execute"',
      ],
      forbidden: ['AbilCmd="BurrowBrutaliskUp,Execute"'],
    },
    {
      unitId: 'LeviathanAbathur',
      required: [
        'AbilArray Link="SymbioteCarapace"',
        'AbilArray Link="AbathurSymbioteHangerLeviathan"',
        'AbilCmd="SymbioteCarapace,Execute"',
        'Face="AbathurBrutaliskLeviathanSymbiote" Type="Passive" Requirements="HaveBrutaliskLeviathanSymbiote"',
      ],
    },
  ];

  for (const check of privateUnitChecks) {
    const block = getXmlBlock(texts.unitData, 'CUnit', check.unitId);
    for (const token of check.required) {
      assertBlockIncludes(block, 'XMAbathur UnitData.xml', token, `${check.unitId} must explicitly close ${token}`);
    }
    for (const token of check.forbidden ?? []) {
      assertBlockNotIncludes(block, 'XMAbathur UnitData.xml', token, `${check.unitId} must not keep public ${token}`);
    }
  }

  const outputChecks = [
    ['CAbilTrain', 'MutaliskMorphToDevourer', 'Unit value="DevourerAbathur"'],
    ['CAbilTrain', 'MutaliskMorphToGuardian', 'Unit value="AbathurGuardian"'],
    ['CAbilTrain', 'EvolveToBrutalisk', 'Unit value="BrutaliskAbathur"'],
    ['CAbilTrain', 'EvolveToBrutaliskRoachVile', 'Unit value="BrutaliskAbathur"'],
    ['CAbilTrain', 'EvolveToBrutaliskRavager', 'Unit value="BrutaliskAbathur"'],
    ['CAbilTrain', 'EvolveToBrutaliskSwarmHost', 'Unit value="BrutaliskAbathur"'],
    ['CAbilTrain', 'EvolveToLeviathan', 'Unit value="LeviathanAbathur"'],
    ['CAbilTrain', 'EvolveToLeviathanMutalisk', 'Unit value="LeviathanAbathur"'],
    ['CAbilTrain', 'EvolveToLeviathanGuardianMP', 'Unit value="LeviathanAbathur"'],
    ['CAbilTrain', 'EvolveToLeviathanDevourer', 'Unit value="LeviathanAbathur"'],
    ['CAbilTrain', 'EvolveToLeviathanViper', 'Unit value="LeviathanAbathur"'],
    ['CAbilMorph', 'MorphToSwarmHostBurrowedAbathur', 'InfoArray Unit="SwarmHostAbathurBurrowed"'],
    ['CAbilMorph', 'MorphToSwarmHostAbathur', 'InfoArray Unit="SwarmHostAbathur"'],
    ['CAbilMorph', 'BurrowBrutaliskAbathurDown', 'InfoArray Unit="BrutaliskAbathurBurrowed"'],
    ['CAbilMorph', 'BurrowBrutaliskAbathurUp', 'InfoArray Unit="BrutaliskAbathur"'],
  ];

  for (const [tag, id, token] of outputChecks) {
    const block = getXmlBlock(texts.abilData, tag, id);
    assertBlockIncludes(block, 'XMAbathur AbilData.xml', token, `${id} must produce private target via ${token}`);
  }

  const publicBurrowDown = getXmlBlock(texts.abilData, 'CAbilMorph', 'BurrowBrutaliskDown');
  assertBlockIncludes(publicBurrowDown, 'XMAbathur AbilData.xml', 'InfoArray Unit="BrutaliskBurrowed"', 'public BurrowBrutaliskDown remains public baseline');
  const privateBurrowDown = getXmlBlock(texts.abilData, 'CAbilMorph', 'BurrowBrutaliskAbathurDown');
  assertBlockNotIncludes(privateBurrowDown, 'XMAbathur AbilData.xml', 'InfoArray Unit="BrutaliskBurrowed"', 'private Brutalisk burrow must not produce public BrutaliskBurrowed');

  const actorBlock = getXmlBlock(texts.actorData, 'CActorUnit', 'BrutaliskAbathurBurrowed');
  assertBlockIncludes(actorBlock, 'XMAbathur ActorData.xml', 'unitName="BrutaliskAbathurBurrowed"', 'BrutaliskAbathurBurrowed must have a private actor');
  assertBlockIncludes(actorBlock, 'XMAbathur ActorData.xml', 'UnitBirth.BrutaliskAbathurBurrowed', 'BrutaliskAbathurBurrowed actor must listen to private unit birth');

  const upgradeChecks = [
    ['AbathurDeepTunnel', 'AffectedUnitArray value="SwarmHostAbathur"'],
    ['AbathurDeepTunnel', 'AffectedUnitArray value="SwarmHostAbathurBurrowed"'],
    ['AbathurEnableSymbiote', 'AffectedUnitArray value="BrutaliskAbathur"'],
    ['AbathurEnableSymbiote', 'AffectedUnitArray value="BrutaliskAbathurBurrowed"'],
    ['AbathurEnableSymbiote', 'AffectedUnitArray value="LeviathanAbathur"'],
    ['AbathurMorphTimeCostReduced', 'Reference="Abil,MorphRoachVileToRavager,InfoArray[Train1].Time"'],
    ['AbathurMorphTimeCostReduced', 'AffectedUnitArray value="RavagerAbathur"'],
    ['AbathurMorphTimeCostReduced', 'AffectedUnitArray value="RavagerAbathurBurrowed"'],
    ['AbathurMorphTimeCostReduced', 'Reference="Unit,DevourerAbathur,CostResource[Minerals]"'],
    ['AbathurMorphTimeCostReduced', 'Reference="Unit,AbathurGuardian,CostResource[Minerals]"'],
    ['AbathurMorphTimeCostReduced', 'AffectedUnitArray value="MutaliskAbathur"'],
    ['AbathurMorphTimeCostReduced', 'AffectedUnitArray value="DevourerAbathur"'],
    ['AbathurMorphTimeCostReduced', 'AffectedUnitArray value="AbathurGuardian"'],
    ['MutaliskSunderingGlave', 'AffectedUnitArray value="MutaliskAbathur"'],
  ];

  for (const [upgradeId, token] of upgradeChecks) {
    const block = getXmlBlock(texts.upgradeData, 'CUpgrade', upgradeId);
    assertBlockIncludes(block, 'XMAbathur UpgradeData.xml', token, `${upgradeId} must affect private Abathur chain via ${token}`);
  }
}

function validateViperSkillAndResearchClosure() {
  const viperBlock = getXmlBlock(texts.unitData, 'CUnit', 'ViperAbathur');
  for (const abilityId of ['ViperConsumeStructure', 'Yoink', 'ParasiticBomb']) {
    assertBlockIncludes(viperBlock, 'XMAbathur UnitData.xml', `AbilArray${abilityId === 'ParasiticBomb' ? ' index="3"' : ''} Link="${abilityId}"`, `ViperAbathur must mount ${abilityId}`);
  }

  const cardChecks = [
    ['ViperConsume', 'ViperConsumeStructure,Execute'],
    ['FaceEmbrace', 'Yoink,Execute'],
    ['ParasiticBomb', 'ParasiticBomb,Execute'],
  ];
  for (const [face, command] of cardChecks) {
    assertBlockIncludes(viperBlock, 'XMAbathur UnitData.xml', `Face="${face}" Type="AbilCmd" AbilCmd="${command}"`, `ViperAbathur card must expose ${face} -> ${command}`);
  }
  assertBlockIncludes(viperBlock, 'XMAbathur UnitData.xml', 'Face="ViperImprovedCastRangePassive" Type="Passive" Requirements="HaveViperImprovedCastRange"', 'ViperAbathur must show improved cast range passive after research');
  assertBlockIncludes(viperBlock, 'XMAbathur UnitData.xml', 'Face="ViperAbductImprovedStunPassive" Type="Passive" Requirements="HaveViperAbductImprovedStun"', 'ViperAbathur must show improved abduct stun passive after research');

  for (const forbiddenToken of [
    'AbilArray Link="DisablingCloud"',
    'AbilArray Link="BlindingCloud"',
    'AbilArray Link="ViperConsumption"',
    'Face="DisablingCloud"',
    'Face="BlindingCloud"',
    'AbilCmd="DisablingCloud',
    'AbilCmd="BlindingCloud',
    'AbilCmd="ViperConsumption',
  ]) {
    assertBlockNotIncludes(viperBlock, 'XMAbathur UnitData.xml', forbiddenToken, `ViperAbathur must not expose non-Abathur Viper chain token ${forbiddenToken}`);
  }

  const sharedViperBlock = getXmlBlock(texts.unitData, 'CUnit', 'Viper');
  assertBlockNotIncludes(sharedViperBlock, 'XMAbathur UnitData.xml', 'Face="ViperConsume" Type="AbilCmd" AbilCmd="ViperConsumeStructure,Execute"', 'shared Viper must not be the Abathur consume command-card owner');
  assertBlockNotIncludes(sharedViperBlock, 'XMAbathur UnitData.xml', 'Face="FaceEmbrace" Type="AbilCmd" AbilCmd="Yoink,Execute"', 'shared Viper must not be the Abathur abduct command-card owner');
  assertBlockNotIncludes(sharedViperBlock, 'XMAbathur UnitData.xml', 'AbilArray Link="Yoink"', 'shared Viper must not mount Yoink for Abathur-specific closure');

  for (const buttonId of [
    'ViperConsume',
    'FaceEmbrace',
    'ParasiticBomb',
    'EvolveViperImprovedCastRange',
    'EvolveViperImprovedCastRangeLocked',
    'EvolveViperAbductImprovedStun',
    'EvolveViperAbductImprovedStunLocked',
    'ViperImprovedCastRangePassive',
    'ViperAbductImprovedStunPassive',
  ]) {
    assertXmlBlock(texts.buttonData, 'CButton', buttonId, 'XMAbathur ButtonData.xml', `missing Viper button ${buttonId}`);
  }

  const consumeAbility = getXmlBlock(texts.abilData, 'CAbilEffectTarget', 'ViperConsumeStructure');
  assertBlockIncludes(consumeAbility, 'XMAbathur AbilData.xml', 'Effect index="0" value="ViperConsumeStructureLaunchMissile"', 'ViperConsumeStructure must launch its consume effect');
  assertBlockIncludes(consumeAbility, 'XMAbathur AbilData.xml', 'CmdButtonArray index="Execute" DefaultButtonFace="ViperConsume"', 'ViperConsumeStructure must use ViperConsume button');

  const yoinkAbility = getXmlBlock(texts.abilData, 'CAbilEffectTarget', 'Yoink');
  assertBlockIncludes(yoinkAbility, 'XMAbathur AbilData.xml', 'Effect index="0" value="YoinkStartSwitch"', 'Yoink must trigger YoinkStartSwitch');
  assertBlockIncludes(yoinkAbility, 'XMAbathur AbilData.xml', 'CmdButtonArray index="Execute" DefaultButtonFace="FaceEmbrace"', 'Yoink must use FaceEmbrace button');

  const parasiticAbility = getXmlBlock(texts.abilData, 'CAbilEffectTarget', 'ParasiticBomb');
  assertBlockIncludes(parasiticAbility, 'XMAbathur AbilData.xml', 'Effect index="0" value="ParasiticBombLM"', 'ParasiticBomb must launch its missile/effect chain');
  assertBlockIncludes(parasiticAbility, 'XMAbathur AbilData.xml', 'Vital index="Energy" value="125"', 'ParasiticBomb must use the StarCoop energy cost');
  assertBlockIncludes(parasiticAbility, 'XMAbathur AbilData.xml', 'TargetFilters value="Air,Visible;Self,Player,Ally,Neutral,Structure,Stasis,Invulnerable"', 'ParasiticBomb must keep the StarCoop air-target filter');
  assertBlockIncludes(parasiticAbility, 'XMAbathur AbilData.xml', 'CmdButtonArray index="Execute" DefaultButtonFace="ParasiticBomb"', 'ParasiticBomb must use ParasiticBomb button');

  for (const effectId of [
    'ViperConsumeStructureLaunchMissile',
    'ViperConsumeStructureCreatePersistent',
    'ViperConsumeStructureApplyBehavior',
    'ViperConsumeStructureRemoveBehavior',
    'ViperConsumeStructurePeriodicSet',
    'ViperConsumeStructureModifyTarget',
    'ViperConsumeStructureModifyCaster',
    'YoinkStartSwitch',
    'YoinkStartCreatePlaceholder',
    'YoinkStartSet',
    'YoinkTeleport',
    'YoinkEnemyStun',
    'ParasiticBombLM',
    'ParasiticBombInitialSet',
    'ParasiticBombApplyBehavior',
    'ParasiticBombTimerApplyBehavior',
    'ParasiticBombSearchEffect',
    'ParasiticBombDotDamage',
  ]) {
    assertAnyXmlBlock(texts.effectData, effectId, 'XMAbathur EffectData.xml', `missing Viper effect ${effectId}`);
  }
  assertBlockIncludes(getAnyXmlBlock(texts.effectData, 'ViperConsumeStructureCreatePersistent'), 'XMAbathur EffectData.xml', 'PeriodicEffectArray value="ViperConsumeStructurePeriodicSet"', 'Viper consume persistent must periodically damage target and restore caster energy');
  assertBlockIncludes(getAnyXmlBlock(texts.effectData, 'YoinkStartSwitch'), 'XMAbathur EffectData.xml', 'EffectArray value="YoinkTeleport"', 'Yoink chain must move the target');
  assertBlockIncludes(getAnyXmlBlock(texts.effectData, 'YoinkStartSwitch'), 'XMAbathur EffectData.xml', 'EffectArray value="YoinkEnemyStun"', 'Yoink chain must apply stun support behavior');
  assertBlockIncludes(getAnyXmlBlock(texts.effectData, 'ParasiticBombInitialSet'), 'XMAbathur EffectData.xml', 'EffectArray value="ParasiticBombApplyBehavior"', 'ParasiticBomb must apply its damage behavior');

  for (const behaviorId of ['ViperConsumeStructure', 'YoinkEnemyStun', 'ParasiticBomb', 'ParasiticBombTimer']) {
    assertXmlBlock(texts.behaviorData, 'CBehaviorBuff', behaviorId, 'XMAbathur BehaviorData.xml', `missing Viper behavior ${behaviorId}`);
  }

  for (const unitId of ['ViperConsumeStructureWeapon', 'ParasiticBombMissile']) {
    assertXmlBlock(texts.unitData, 'CUnit', unitId, 'XMAbathur UnitData.xml', `missing Viper support unit ${unitId}`);
  }

  const infestationPitResearch = getXmlBlock(texts.abilData, 'CAbilResearch', 'InfestationPitResearchAbathur');
  assertBlockIncludes(infestationPitResearch, 'XMAbathur AbilData.xml', 'InfoArray index="Research9" Time="60" Upgrade="ViperImprovedCastRange"', 'InfestationPitResearchAbathur Research9 must research ViperImprovedCastRange');
  assertBlockIncludes(infestationPitResearch, 'XMAbathur AbilData.xml', 'DefaultButtonFace="EvolveViperImprovedCastRange" State="Restricted" Requirements="LearnViperImprovedCastRange"', 'ViperImprovedCastRange research must use the Learn requirement');
  assertBlockIncludes(infestationPitResearch, 'XMAbathur AbilData.xml', 'InfoArray index="Research10" Time="60" Upgrade="ViperAbductImprovedStun"', 'InfestationPitResearchAbathur Research10 must research ViperAbductImprovedStun');
  assertBlockIncludes(infestationPitResearch, 'XMAbathur AbilData.xml', 'DefaultButtonFace="EvolveViperAbductImprovedStun" State="Restricted" Requirements="LearnViperAbductImprovedStun"', 'ViperAbductImprovedStun research must use the Learn requirement');

  const castRangeUpgrade = getXmlBlock(texts.upgradeData, 'CUpgrade', 'ViperImprovedCastRange');
  for (const abilityReference of ['Abil,Yoink,Range[0]', 'Abil,ViperConsumeStructure,Range[0]', 'Abil,ParasiticBomb,Range[0]']) {
    assertBlockIncludes(castRangeUpgrade, 'XMAbathur UpgradeData.xml', `Reference="${abilityReference}" Value="4"`, `ViperImprovedCastRange must affect ${abilityReference}`);
  }

  const stunUpgrade = getXmlBlock(texts.upgradeData, 'CUpgrade', 'ViperAbductImprovedStun');
  assertBlockIncludes(stunUpgrade, 'XMAbathur UpgradeData.xml', 'Reference="Behavior,YoinkEnemyStun,Duration" Value="5.000000"', 'ViperAbductImprovedStun must extend YoinkEnemyStun duration');

  for (const requirementId of ['LearnViperImprovedCastRange', 'LearnViperAbductImprovedStun']) {
    assertXmlBlock(texts.requirementData, 'CRequirement', requirementId, 'XMAbathur RequirementData.xml', `missing Viper learn requirement ${requirementId}`);
  }
  for (const requirementId of ['HaveViperImprovedCastRange', 'HaveViperAbductImprovedStun']) {
    if (!getXmlBlock(texts.requirementData, 'CRequirement', requirementId) && !getXmlBlock(texts.finalRequirementData, 'CRequirement', requirementId)) {
      errors.push(`XMAbathur/XMFinal RequirementData.xml: missing Viper passive requirement ${requirementId}`);
    }
  }
  for (const nodeId of [
    'CountUpgradeViperImprovedCastRangeQueuedOrBetter',
    'CountUpgradeViperAbductImprovedStunQueuedOrBetter',
    'NotCountUpgradeViperImprovedCastRangeQueuedOrBetter',
    'NotCountUpgradeViperAbductImprovedStunQueuedOrBetter',
  ]) {
    assertAnyXmlBlock(texts.requirementNodeData, nodeId, 'XMAbathur RequirementNodeData.xml', `missing Viper learn requirement node ${nodeId}`);
  }
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

function validateBiomassRuntimeClosure() {
  assertXmlBlock(texts.unitData, 'CUnit', 'BiomassPickup', 'XMAbathur UnitData.xml', 'missing BiomassPickup unit');
  const biomassPickupUnit = getXmlBlock(texts.unitData, 'CUnit', 'BiomassPickup');
  assertBlockIncludes(biomassPickupUnit, 'XMAbathur UnitData.xml', 'AbilArray Link="BiomassPickup"', 'BiomassPickup unit must mount BiomassPickup ability');
  assertBlockIncludes(biomassPickupUnit, 'XMAbathur UnitData.xml', 'AbilArray Link="BiomassPickupMarked"', 'BiomassPickup unit must mount marked pickup ability');
  assertBlockIncludes(biomassPickupUnit, 'XMAbathur UnitData.xml', 'BehaviorArray Link="BiomassCreated"', 'BiomassPickup unit must disable pickup briefly after creation');

  const biomassPickupAbility = getXmlBlock(texts.abilData, 'CAbilEffectTarget', 'BiomassPickup');
  assertBlockIncludes(biomassPickupAbility, 'XMAbathur AbilData.xml', 'AINotifyEffect value="BiomassBuffPickup"', 'BiomassPickup ability must notify pickup usage');
  assertBlockIncludes(biomassPickupAbility, 'XMAbathur AbilData.xml', 'AutoCastRange value="0.5"', 'BiomassPickup ability must autocast at melee pickup range');
  assertXmlBlock(texts.abilData, 'CAbilEffectTarget', 'BiomassPickupMarked', 'XMAbathur AbilData.xml', 'missing BiomassPickupMarked ability');

  const biomassPickupEffect = getXmlBlock(texts.effectData, 'CEffectSet', 'BiomassPickup');
  assertBlockIncludes(biomassPickupEffect, 'XMAbathur EffectData.xml', 'EffectArray value="BiomassPickupDummy"', 'BiomassPickup effect must route to BiomassPickupDummy');
  assertXmlBlock(texts.effectData, 'CEffectModifyUnit', 'BiomassPickupDummy', 'XMAbathur EffectData.xml', 'missing XMAbathur BiomassPickupDummy effect');
  assertXmlBlock(texts.finalEffectData, 'CEffectModifyUnit', 'BiomassPickupDummy', 'XMFinal EffectData.xml', 'missing XMFinal BiomassPickupDummy compatibility shell');

  for (const behaviorId of ['BiomassBuff1', 'BiomassBuff10', 'BiomassBuff100']) {
    assertXmlBlock(texts.behaviorData, 'CBehaviorBuff', behaviorId, 'XMAbathur BehaviorData.xml', `missing ${behaviorId}`);
  }
  assertXmlBlock(texts.behaviorData, 'CBehaviorBuff', 'BiomassTravelling', 'XMAbathur BehaviorData.xml', 'missing BiomassTravelling cleanup marker');

  for (const needle of [
    'libE0EAE146_gv_abathurBiomassEnabled = true;',
    'TriggerAddEventUnitDied(libE0EAE146_gt_AbathurBiomassDrop, null);',
    'libE0EAE146_gf_CreateAbathurBiomassPickup(UnitGetPosition(EventUnit()), lv_stack);',
    'TriggerAddEventPlayerEffectUsed(libE0EAE146_gt_AbathurBiomassPickup, c_playerAny, libE0EAE146_gv_abathurBiomassEffect);',
    'lv_pickup = EventPlayerEffectUsedUnit(c_effectUnitCaster);',
    'if ((UnitGetType(lv_pickup) != "BiomassPickup"))',
    'lv_applied = libE0EAE146_gf_AbathurAddBiomassStacks(lv_target, lv_stored);',
    'UnitBehaviorAdd(lv_pickup, "BiomassTravelling", lv_pickup, 1);',
    'UnitKill(lv_pickup);',
    'TriggerAddEventUnitDied(libE0EAE146_gt_AbathurBiomassRefund, null);',
    'TriggerAddEventUnitTrainProgress(libE0EAE146_gt_AbathurBiomassTrain, null, c_unitProgressStageComplete);',
    'TriggerAddEventUnitBehaviorChange(libE0EAE146_gt_AbathurBiomassScaler, null, "BiomassBuff1", c_unitBehaviorChangeIncrease);',
  ]) {
    assertIncludes(texts.runtime, 'XMFinal LibE0EAE146_AbathurRuntime.galaxy', needle, `Abathur runtime biomass closure missing ${needle}`);
  }

  assertNotIncludes(texts.runtime, 'XMFinal LibE0EAE146_AbathurRuntime.galaxy', 'AbilityCommand("BiomassTargetMark", 0)', 'BiomassTargetMark must not be runtime-whitelisted as a visible positive ability');
  assertNotIncludes(texts.commanderPanels, 'XMFinal LibE0EAE146_CommanderPanels.galaxy', 'biomass_mark', 'BiomassTargetMark must not be exposed as an Abathur test/top-panel profile');
  assertNotIncludes(texts.commanderPanels, 'XMFinal LibE0EAE146_CommanderPanels.galaxy', 'BiomassTargetMark', 'BiomassTargetMark raw catalog must stay hidden from Abathur panel smoke');
}

function validateRuntimePollutionGuard() {
  const blockedPublicUnits = [
    'NydusNetwork',
    'GreaterNydusWorm',
    'Roach',
    'RoachCorpser',
    'Ravager',
    'SwarmHost',
    'SwarmHostBurrowed',
    'Mutalisk',
    'GuardianMP',
    'Devourer',
    'Viper',
    'Brutalisk',
    'BrutaliskBurrowed',
    'HotSLeviathan',
  ];

  for (const unitId of blockedPublicUnits) {
    assertIncludes(
      texts.runtime,
      'XMFinal LibE0EAE146_AbathurRuntime.galaxy',
      `TechTreeUnitAllow(lp_player, "${unitId}", false);`,
      `Abathur runtime must block shared/non-effective ${unitId}`,
    );
  }

  const allowedPrivateUnits = [
    'HatcheryAbathur',
    'LairAbathur',
    'HiveAbathur',
    'LarvaAbathur',
    'DroneAbathur',
    'OverlordAbathur',
    'ExtractorAbathur',
    'SpawningPoolAbathur',
    'EvolutionChamberAbathur',
    'RoachWarrenAbathur',
    'InfestationPitAbathur',
    'SpireAbathur',
    'GreaterSpireAbathur',
    'SpineCrawlerAbathur',
    'SporeCrawlerAbathur',
    'QueenCoopAbathur',
    'MutaliskAbathur',
    'DevourerAbathur',
    'AbathurGuardian',
    'SwarmHostAbathur',
    'SwarmHostAbathurBurrowed',
    'ViperAbathur',
    'RoachVile',
    'RavagerAbathur',
    'RavagerAbathurBurrowed',
    'BrutaliskAbathur',
    'BrutaliskAbathurBurrowed',
    'LeviathanAbathur',
    'ToxicNest',
    'ToxicNestBurrowed',
  ];

  for (const unitId of allowedPrivateUnits) {
    assertIncludes(
      texts.runtime,
      'XMFinal LibE0EAE146_AbathurRuntime.galaxy',
      `TechTreeUnitAllow(lp_player, "${unitId}", true);`,
      `Abathur runtime must allow ${unitId}`,
    );
  }

  const allowedPrivateAbilities = [
    'MorphRoachVileToRavager',
    'RavagerAbathurCorrosiveBile',
    'BurrowRavagerAbathurDown',
    'BurrowRavagerAbathurUp',
    'MutaliskMorphToDevourer',
    'MutaliskMorphToGuardian',
    'MorphToSwarmHostBurrowedAbathur',
    'MorphToSwarmHostAbathur',
    'EvolveToBrutaliskRoachVile',
    'EvolveToBrutaliskRavager',
    'EvolveToBrutaliskSwarmHost',
    'EvolveToLeviathanMutalisk',
    'EvolveToLeviathanGuardianMP',
    'EvolveToLeviathanDevourer',
    'EvolveToLeviathanViper',
    'AbathurDeepTunnel',
    'AbathurDeepTunnelImproved',
    'BrutaliskDeepTunnel',
    'SymbioteCarapace',
    'BurrowBrutaliskAbathurDown',
    'BurrowBrutaliskAbathurUp',
    'CorrosiveAcid',
    'LocustLaunch',
    'ViperConsumeStructure',
    'Yoink',
    'ParasiticBomb',
    'SpawnToxicNest',
    'AbathurMend',
  ];

  for (const abilityId of allowedPrivateAbilities) {
    assertIncludes(
      texts.runtime,
      'XMFinal LibE0EAE146_AbathurRuntime.galaxy',
      `TechTreeAbilityAllow(lp_player, AbilityCommand("${abilityId}", 0), true);`,
      `Abathur runtime must allow ${abilityId}`,
    );
  }
}

function validateRuntimeSquadClosure() {
  const abathurStartSquads = getFunctionBlock(texts.commanderStartSquads, 'libE0EAE146_gf_AbathurCreateMapStartSquad');
  const abathurCargoSquads = getFunctionBlock(texts.commanderStartSquads, 'libE0EAE146_gf_AbathurCreateCargoSquad');
  const combined = `${abathurStartSquads}\n${abathurCargoSquads}`;

  for (const unitId of [
    'RoachVile',
    'RavagerAbathur',
    'SwarmHostAbathur',
    'QueenCoopAbathur',
    'MutaliskAbathur',
    'AbathurGuardian',
    'DevourerAbathur',
    'ViperAbathur',
    'BrutaliskAbathur',
    'LeviathanAbathur',
  ]) {
    assertIncludes(combined, 'XMFinal LibE0EAE146_CommanderStartSquads.galaxy', `"${unitId}"`, `Abathur start/cargo squads must reference ${unitId}`);
  }

  for (const unitId of ['"Roach"', '"RoachCorpser"', '"Viper"', '"Brutalisk"', '"HotSLeviathan"', '"SwarmHost"', '"QueenCoop"', '"Mutalisk"', '"GuardianMP"', '"DevourerMP"']) {
    assertNotIncludes(combined, 'XMFinal LibE0EAE146_CommanderStartSquads.galaxy', unitId, `Abathur start/cargo squads must not create shared ${unitId}`);
  }
}

function validateTestBenchAbilitySmoke() {
  const abathurSmoke = getFunctionBlock(texts.commanderUnitAbilities, 'libE0EAE146_gf_XMTestBench_AbathurUnitAbilities');

  const smokeEntryCount = countOccurrences(abathurSmoke, 'XMTestBench_CheckAbilityProfileEntry');
  if (smokeEntryCount !== 67) {
    errors.push(`XMFinal LibE0EAE146_CommanderUnitAbilities.galaxy: Abathur smoke expected 67 entries, actual ${smokeEntryCount}`);
  }

  assertIncludes(abathurSmoke, 'XMFinal LibE0EAE146_CommanderUnitAbilities.galaxy', 'XMTestBench_LogAbilityProfileDone(lp_player, "Abathur", lp_scenarioKind, 67)', 'Abathur smoke done count must match the private-chain entry count');
  assertIncludes(abathurSmoke, 'XMFinal LibE0EAE146_CommanderUnitAbilities.galaxy', '"DevourerAbathur", "CorrosiveAcidDevourer", "CorrosiveAcid"', 'Abathur Devourer smoke must check CorrosiveAcid');
  assertIncludes(abathurSmoke, 'XMFinal LibE0EAE146_CommanderUnitAbilities.galaxy', '"DevourerAbathur", "EvolveToLeviathan", "EvolveToLeviathanDevourer"', 'Abathur Devourer smoke must check private Leviathan evolution');
  assertIncludes(abathurSmoke, 'XMFinal LibE0EAE146_CommanderUnitAbilities.galaxy', '"AbathurGuardian", "EvolveToLeviathan", "EvolveToLeviathanGuardianMP"', 'Abathur Guardian smoke must check private Leviathan evolution');
  assertIncludes(abathurSmoke, 'XMFinal LibE0EAE146_CommanderUnitAbilities.galaxy', '"MutaliskAbathur", "MorphToGuardian", "MutaliskMorphToGuardian"', 'Abathur Mutalisk smoke must check Guardian morph');
  assertIncludes(abathurSmoke, 'XMFinal LibE0EAE146_CommanderUnitAbilities.galaxy', '"MutaliskAbathur", "EvolveToLeviathan", "EvolveToLeviathanMutalisk"', 'Abathur Mutalisk smoke must check private Leviathan evolution');
  assertIncludes(abathurSmoke, 'XMFinal LibE0EAE146_CommanderUnitAbilities.galaxy', '"SwarmHostAbathur", "EvolveToBrutalisk", "EvolveToBrutaliskSwarmHost"', 'Abathur SwarmHost smoke must check private Brutalisk evolution');
  assertIncludes(abathurSmoke, 'XMFinal LibE0EAE146_CommanderUnitAbilities.galaxy', '"SwarmHostAbathurBurrowed", "EvolveToBrutalisk", "EvolveToBrutaliskSwarmHost"', 'Abathur burrowed SwarmHost smoke must check private Brutalisk evolution');
  assertIncludes(abathurSmoke, 'XMFinal LibE0EAE146_CommanderUnitAbilities.galaxy', '"RoachVile", "EvolveToBrutalisk", "EvolveToBrutaliskRoachVile"', 'Abathur RoachVile smoke must check private Brutalisk evolution');
  assertIncludes(abathurSmoke, 'XMFinal LibE0EAE146_CommanderUnitAbilities.galaxy', '"RavagerAbathur", "EvolveToBrutalisk", "EvolveToBrutaliskRavager"', 'Abathur Ravager smoke must check private Brutalisk evolution');
  assertIncludes(abathurSmoke, 'XMFinal LibE0EAE146_CommanderUnitAbilities.galaxy', '"ViperAbathur", "ViperConsume", "ViperConsumeStructure"', 'Abathur Viper smoke must check ViperConsumeStructure');
  assertIncludes(abathurSmoke, 'XMFinal LibE0EAE146_CommanderUnitAbilities.galaxy', '"ViperAbathur", "EvolveToLeviathan", "EvolveToLeviathanViper"', 'Abathur Viper smoke must check private Leviathan evolution');
  assertIncludes(abathurSmoke, 'XMFinal LibE0EAE146_CommanderUnitAbilities.galaxy', '"BrutaliskAbathur", "BurrowDown", "BurrowBrutaliskAbathurDown"', 'Abathur Brutalisk smoke must check private burrow down');
  assertIncludes(abathurSmoke, 'XMFinal LibE0EAE146_CommanderUnitAbilities.galaxy', '"BrutaliskAbathurBurrowed", "BurrowUp", "BurrowBrutaliskAbathurUp"', 'Abathur burrowed Brutalisk smoke must check private burrow up');
  assertIncludes(abathurSmoke, 'XMFinal LibE0EAE146_CommanderUnitAbilities.galaxy', '"LeviathanAbathur", "SymbioteCarapace", "SymbioteCarapace"', 'Abathur Leviathan smoke must check SymbioteCarapace');
  assertIncludes(abathurSmoke, 'XMFinal LibE0EAE146_CommanderUnitAbilities.galaxy', '"LeviathanAbathur", "AbathurBrutaliskLeviathanSymbiote", "", "HaveBrutaliskLeviathanSymbiote"', 'Abathur Leviathan smoke must check symbiote passive');
  assertNotIncludes(abathurSmoke, 'XMFinal LibE0EAE146_CommanderUnitAbilities.galaxy', '"DevourerAbathur", "", "", "", "unit_card_no_specials"', 'Abathur Devourer smoke must not claim no special card entries');
  assertNotIncludes(abathurSmoke, 'XMFinal LibE0EAE146_CommanderUnitAbilities.galaxy', '"BrutaliskAbathur", "BurrowDown", "BurrowBrutaliskDown"', 'Abathur Brutalisk smoke must not check public BurrowBrutaliskDown');
  assertNotIncludes(abathurSmoke, 'XMFinal LibE0EAE146_CommanderUnitAbilities.galaxy', '"BrutaliskAbathur", "CommanderAbathurBrutaliskSymbiote"', 'Abathur Brutalisk smoke must not use missing CommanderAbathurBrutaliskSymbiote button');
  assertNotIncludes(abathurSmoke, 'XMFinal LibE0EAE146_CommanderUnitAbilities.galaxy', '"ViperAbathur", "ViperConsume", "ViperConsumption"', 'Abathur Viper smoke must not check the obsolete ViperConsumption chain');
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
    activeText.match(new RegExp(`<${tag}\\s+[^>]*id="${escapedId}"[^>]*>[\\s\\S]*?<\\/${tag}>`))?.[0] ??
    activeText.match(new RegExp(`<${tag}\\s+[^>]*id="${escapedId}"[^>]*/\\s*>`))?.[0] ??
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

function getFunctionBlock(text, functionName) {
  const start = text.indexOf(`${functionName} `);
  if (start === -1) {
    errors.push(`Galaxy source: missing function ${functionName}`);
    return '';
  }

  const bodyStart = text.indexOf('{', start);
  if (bodyStart === -1) {
    errors.push(`Galaxy source: missing function body for ${functionName}`);
    return '';
  }

  let depth = 0;
  for (let index = bodyStart; index < text.length; index += 1) {
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

  errors.push(`Galaxy source: unterminated function body for ${functionName}`);
  return '';
}

function getBranchBlock(text, branchStart, source) {
  const start = text.indexOf(branchStart);
  if (start === -1) {
    errors.push(`${source}: missing branch ${branchStart}`);
    return '';
  }

  const bodyStart = text.indexOf('{', start);
  if (bodyStart === -1) {
    errors.push(`${source}: missing branch body ${branchStart}`);
    return '';
  }

  let depth = 0;
  for (let index = bodyStart; index < text.length; index += 1) {
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

  errors.push(`${source}: unterminated branch ${branchStart}`);
  return '';
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

function getAnyXmlBlock(text, id) {
  for (const tag of [
    'CAbilEffectTarget',
    'CEffectLaunchMissile',
    'CEffectCreatePersistent',
    'CEffectApplyBehavior',
    'CEffectRemoveBehavior',
    'CEffectSet',
    'CEffectModifyUnit',
    'CEffectCreateUnit',
    'CEffectTeleport',
    'CEffectEnumArea',
    'CEffectDamage',
    'CBehaviorBuff',
    'CUnit',
    'CUpgrade',
    'CRequirement',
    'CRequirementCountUpgrade',
    'CRequirementNot',
    'CButton',
  ]) {
    const block = getXmlBlock(text, tag, id);
    if (block) {
      return block;
    }
  }

  return '';
}

function assertAnyXmlBlock(text, id, source, message) {
  if (!getAnyXmlBlock(text, id)) {
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

function assertNotIncludes(text, source, needle, message) {
  if (text.includes(needle)) {
    errors.push(`${source}: ${message}`);
  }
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

function countOccurrences(text, needle) {
  return text.split(needle).length - 1;
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
