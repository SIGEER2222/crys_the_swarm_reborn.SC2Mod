import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const xmRoot = path.join(repoRoot, '合作指挥官版起义狂潮', 'Mods', 'XM');
const xmFinalRoot = path.join(xmRoot, 'XMFinal.SC2Mod');
const welcomeToJungleMapRoot = path.join(repoRoot, '合作指挥官版起义狂潮', 'Maps', 'XM', 'ttosh02.SC2Map');

const targetDependencies = [
  'file:Mods\\XM\\XMAbathur.SC2Mod',
  'file:Mods\\XM\\XMAlarak.SC2Mod',
  'file:Mods\\XM\\XMArtanis.SC2Mod',
  'file:Mods\\XM\\XMFenix.SC2Mod',
  'file:Mods\\XM\\XMKarax.SC2Mod',
  'file:Mods\\XM\\XMKerrigan.SC2Mod',
  'file:Mods\\XM\\XMSwann.SC2Mod',
  'file:Mods\\XM\\XMVorazun.SC2Mod',
  'file:Mods\\XM\\XMZagara.SC2Mod',
  'file:Mods\\XM\\XMZeratul.SC2Mod',
  'file:Mods\\XM\\XMRaynor.SC2Mod',
];

const expectedOpeners = {
  Abathur: {
    CommandCenter: 'HatcheryAbathur',
    Worker: 'DroneAbathur',
    SecondUnit: 'OverlordAbathur',
  },
  Alarak: {
    CommandCenter: 'NexusAlarak',
    Worker: 'ProbeAlarak',
    SecondUnit: 'PylonAlarak',
  },
  Artanis: {
    CommandCenter: 'NexusArtanis',
    Worker: 'ProbeArtanis',
    SecondUnit: 'PylonArtanis',
  },
  Fenix: {
    CommandCenter: 'NexusFenix',
    Worker: 'ProbeFenix',
    SecondUnit: 'PylonFenix',
  },
  Karax: {
    CommandCenter: 'NexusKarax',
    Worker: 'ProbeKarax',
    SecondUnit: 'PylonKarax',
  },
  Kerrigan: {
    CommandCenter: 'HatcheryKerrigan',
    Worker: 'DroneKerrigan',
    SecondUnit: 'OverlordKerrigan',
  },
  Raynor: {
    CommandCenter: 'CommandCenterRaynor',
    Worker: 'SCVRaynor',
    SecondUnit: 'SupplyDepotRaynor',
  },
  Swann: {
    CommandCenter: 'CommandCenterSwann',
    Worker: 'SCVSwann',
    SecondUnit: 'UnfinishedDrakkenLaserDrillCoop',
  },
  Vorazun: {
    CommandCenter: 'NexusVorazun',
    Worker: 'ProbeVorazun',
    SecondUnit: 'PylonVorazun',
  },
  Zagara: {
    CommandCenter: 'HatcheryZagara',
    Worker: 'DroneZagara',
    SecondUnit: 'OverlordZagara',
  },
  Zeratul: {
    CommandCenter: 'NexusZeratul',
    Worker: 'ProbeZeratul',
    SecondUnit: 'VoidPylon',
  },
};

const zergClosures = {
  Abathur: {
    spawn: 'SpawnLarvaAbathur',
    larva: 'LarvaAbathur',
    larvaTrains: ['LarvaTrainAbathur', 'LarvaTrainSwarmAbathur'],
    townHalls: ['HatcheryAbathur', 'LairAbathur', 'HiveAbathur'],
    upgradeRefs: {
      AbathurCommander: ['Behavior,SpawnLarvaAbathur,InfoArray[0].Delay', 'Behavior,SpawnLarvaAbathur,InfoArray[0].MaxCount'],
    },
  },
  Kerrigan: {
    spawn: 'SpawnLarvaKerrigan',
    larva: 'LarvaKerrigan',
    larvaTrains: ['LarvaTrainKerrigan'],
    townHalls: ['HatcheryKerrigan', 'LairKerrigan', 'HiveKerrigan'],
    upgradeRefs: {
      MasteryKerriganLarvaRate: ['Behavior,SpawnLarvaKerrigan,InfoArray[0].Delay'],
    },
  },
  Zagara: {
    spawn: 'SpawnLarvaZagara',
    larva: 'LarvaZagara',
    larvaTrains: ['LarvaTrainZagara', 'LarvaTrainSwarmZagara'],
    townHalls: ['HatcheryZagara', 'LairZagara', 'HiveZagara'],
    upgradeRefs: {
      MasteryZagaraLarvaRate: ['Behavior,SpawnLarvaZagara,InfoArray[0].Delay'],
      MasteryZagaraLarvaRatePassive: ['Behavior,SpawnLarvaZagara,InfoArray[0].Delay'],
    },
  },
};

const protossClosures = {
  Alarak: { nexusTrain: 'NexusTrainAlarak', build: 'ProtossBuildAlarak' },
  Artanis: { nexusTrain: 'NexusTrainArtanis', build: 'ProtossBuildArtanis' },
  Fenix: { nexusTrain: 'NexusTrainFenix', build: 'ProtossBuildFenix' },
  Karax: { nexusTrain: 'NexusTrainKarax', build: 'ProtossBuildKarax' },
  Vorazun: { nexusTrain: 'NexusTrainVorazun', build: 'ProtossBuildVorazun' },
  Zeratul: { nexusTrain: 'NexusTrainZeratul', build: 'ZeratulBuild' },
};

const terranClosures = {
  Raynor: {
    commandCenterTrain: 'CommandCenterTrainRaynor',
    workerBuild: 'TerranBuildRaynor',
    requiredBuildUnits: ['CommandCenterRaynor', 'SupplyDepotRaynor'],
  },
};

const targetRuntimeInitializers = {
  Abathur: {
    include: 'include "LibE0EAE146_AbathurRuntime"',
    declaration: 'void libE0EAE146_gf_AbathurRuntimeInit',
    dispatch: 'libE0EAE146_gf_AbathurRuntimeInit(1, lp_secondUnit, lp_createHero);',
    runtimeFile: 'LibE0EAE146_AbathurRuntime.galaxy',
    runtimeStrings: [
      '"CoopCasterAbathur"',
      'lib67C0F0E7_gf_CU_GPInit(lp_player, "Abathur"',
      'libE0EAE146_gf_InitializeAbathurBiomass(lp_player, "BiomassPickupDummy");',
    ],
  },
  Alarak: {
    include: 'include "LibE0EAE146_AlarakRuntime"',
    declaration: 'void libE0EAE146_gf_AlarakRuntimeInit',
    dispatch: 'libE0EAE146_gf_AlarakRuntimeInit(1, lp_secondUnit, lp_createHero);',
    runtimeFile: 'LibE0EAE146_AlarakRuntime.galaxy',
    runtimeStrings: ['lib67C0F0E7_gf_CU_GPInit(lp_player, "Alarak"'],
  },
  Artanis: {
    include: 'include "LibE0EAE146_ArtanisRuntime"',
    declaration: 'void libE0EAE146_gf_ArtanisRuntimeInit',
    dispatch: 'libE0EAE146_gf_ArtanisRuntimeInit(1, lp_secondUnit, lp_createHero);',
    runtimeFile: 'LibE0EAE146_ArtanisRuntime.galaxy',
    runtimeStrings: ['lib67C0F0E7_gf_CU_GPInit(lp_player, "Artanis"', '"ArtanisVoid"'],
  },
  Fenix: {
    include: 'include "LibE0EAE146_FenixRuntime"',
    declaration: 'void libE0EAE146_gf_FenixRuntimeInit',
    dispatch: 'libE0EAE146_gf_FenixRuntimeInit(1, lp_secondUnit, lp_createHero);',
    runtimeFile: 'LibE0EAE146_FenixRuntime.galaxy',
    runtimeStrings: ['lib67C0F0E7_gf_CU_GPInit(lp_player, "Fenix"'],
  },
  Karax: {
    include: 'include "LibE0EAE146_KaraxRuntime"',
    declaration: 'void libE0EAE146_gf_KaraxRuntimeInit',
    dispatch: 'libE0EAE146_gf_KaraxRuntimeInit(1, lp_secondUnit, lp_createHero);',
    runtimeFile: 'LibE0EAE146_KaraxRuntime.galaxy',
    runtimeStrings: ['lib67C0F0E7_gf_CU_GPInit(lp_player, "Karax"', '"KaraxChampion"'],
  },
  Kerrigan: {
    include: 'include "LibE0EAE146_KerriganRuntime"',
    declaration: 'void libE0EAE146_gf_KerriganRuntimeInit',
    dispatch: 'libE0EAE146_gf_KerriganRuntimeInit(1, lp_secondUnit, lp_createHero);',
    runtimeFile: 'LibE0EAE146_KerriganRuntime.galaxy',
    runtimeStrings: ['"K5Kerrigan"', 'lib67C0F0E7_gf_CU_GPInit(lp_player, "Kerrigan"'],
  },
  Swann: {
    dispatch: 'auto09490B45_val == "Swann"',
    mainStrings: ['"CasterSwann"', 'lib67C0F0E7_gf_CU_GPInit(1, "Swann"', 'lib4B62E36B_gf_DrakkenLaserDrillUnit'],
  },
  Vorazun: {
    include: 'include "LibE0EAE146_VorazunRuntime"',
    declaration: 'void libE0EAE146_gf_VorazunRuntimeInit',
    dispatch: 'libE0EAE146_gf_VorazunRuntimeInit(1, lp_secondUnit, lp_createHero);',
    runtimeFile: 'LibE0EAE146_VorazunRuntime.galaxy',
    runtimeStrings: ['lib67C0F0E7_gf_CU_GPInit(lp_player, "Vorazun"', '"VorazunChampion"'],
  },
  Zagara: {
    include: 'include "LibE0EAE146_ZagaraRuntime"',
    declaration: 'void libE0EAE146_gf_ZagaraRuntimeInit',
    dispatch: 'libE0EAE146_gf_ZagaraRuntimeInit(1, lp_secondUnit, lp_createHero);',
    runtimeFile: 'LibE0EAE146_ZagaraRuntime.galaxy',
    runtimeStrings: ['lib67C0F0E7_gf_CU_GPInit(lp_player, "Zagara"', '"ZagaraVoidCoop"'],
  },
  Zeratul: {
    include: 'include "LibE0EAE146_ZeratulRuntime"',
    declaration: 'void libE0EAE146_gf_ZeratulRuntimeInit',
    dispatch: 'libE0EAE146_gf_ZeratulRuntimeInit(1, lp_secondUnit, lp_createHero);',
    runtimeFile: 'LibE0EAE146_ZeratulRuntime.galaxy',
    runtimeStrings: ['lib67C0F0E7_gf_CU_GPInit(lp_player, "Zeratul"', '"ZeratulCoop"'],
  },
};

const expectedHeroStructures = {
  Fenix: {
    officialUnit: 'FenixAltarOfPsiStorms',
    runtimeUnit: 'FenixAltarOfPsiStorms',
    runtimeFile: 'LibE0EAE146_FenixRuntime.galaxy',
    runtimeCall: 'libE0EAE146_gf_CreateCommanderHeroStructure(lp_player, "Fenix");',
  },
  Karax: {
    officialUnit: 'SolarForge',
    runtimeUnit: 'SolarForgeKarax',
    runtimeFile: 'LibE0EAE146_KaraxRuntime.galaxy',
    runtimeCall: 'libE0EAE146_gf_CreateCommanderHeroStructure(lp_player, "Karax");',
  },
  Swann: {
    officialUnit: 'UnfinishedDrakkenLaserDrillCoop',
    runtimeUnit: 'UnfinishedDrakkenLaserDrillCoop',
    mainCall: 'libE0EAE146_gf_CreateCommanderHeroStructure(1, "Swann");',
  },
  Zeratul: {
    officialUnit: 'ZeratulACArtifact',
    runtimeUnit: 'ZeratulACArtifact',
    runtimeFile: 'LibE0EAE146_ZeratulRuntime.galaxy',
    runtimeCall: 'libE0EAE146_gf_CreateCommanderHeroStructure(lp_player, "Zeratul");',
  },
};

const expectedHeroRevives = {
  Kerrigan: {
    heroUnits: ['K5Kerrigan', 'K5KerriganBurrowed'],
    reviveUnit: 'KerriganReviveCocoon',
    firstBehavior: 'KerriganFirstReviveTimer',
    normalBehavior: 'KerriganNormalReviveTimer',
    runtimeFile: 'LibE0EAE146_KerriganRuntime.galaxy',
  },
  Zagara: {
    heroUnits: ['ZagaraVoidCoop'],
    reviveUnit: 'ZagaraReviveCocoon',
    firstBehavior: 'ZagaraFirstReviveTimer',
    normalBehavior: 'ZagaraNormalReviveTimer',
    runtimeFile: 'LibE0EAE146_ZagaraRuntime.galaxy',
  },
  Alarak: {
    heroUnits: ['AlarakCoop'],
    reviveUnit: 'AlarakReviveBeacon',
    firstBehavior: 'AlarakInitialReviveTimer',
    normalBehavior: 'AlarakReviveTimer',
    runtimeFile: 'LibE0EAE146_AlarakRuntime.galaxy',
  },
  Zeratul: {
    heroUnits: ['ZeratulCoop'],
    reviveUnit: 'ZeratulCoopReviveBeacon',
    firstBehavior: 'ZeratulInitialReviveTimer',
    normalBehavior: 'ZeratulReviveTimer',
    runtimeFile: 'LibE0EAE146_ZeratulRuntime.galaxy',
  },
};

const errors = [];

function readText(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function stripXmlComments(text) {
  return text.replace(/<!--[\s\S]*?-->/g, '');
}

function commanderRoot(commander) {
  return path.join(xmRoot, `XM${commander}.SC2Mod`);
}

function gameDataPath(commander, fileName) {
  return path.join(commanderRoot(commander), 'Base.SC2Data', 'GameData', fileName);
}

function listXmlFiles(rootPath) {
  const entries = fs.readdirSync(rootPath, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(rootPath, entry.name);
    if (entry.isDirectory()) {
      files.push(...listXmlFiles(fullPath));
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.xml')) {
      files.push(fullPath);
    }
  }

  return files;
}

function commanderGameDataText(commander) {
  const gameDataRoot = path.join(commanderRoot(commander), 'Base.SC2Data', 'GameData');
  return listXmlFiles(gameDataRoot).map((filePath) => readText(filePath)).join('\n');
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

function validateDependencies() {
  const activeDocumentInfo = stripXmlComments(readText(path.join(xmFinalRoot, 'DocumentInfo')));
  const documentHeaderDependencies = parseDocumentHeaderDependencies(path.join(xmFinalRoot, 'DocumentHeader'));

  for (const dependency of targetDependencies) {
    assertIncludes(
      activeDocumentInfo,
      'XMFinal DocumentInfo',
      `<Value>${dependency}</Value>`,
      `missing active dependency ${dependency}`,
    );

    if (!documentHeaderDependencies.includes(dependency)) {
      errors.push(`XMFinal DocumentHeader: missing live dependency ${dependency}`);
    }
  }
}

function validateCommanderAch() {
  for (const [commander, expected] of Object.entries(expectedOpeners)) {
    const userData = readText(gameDataPath(commander, 'UserData.xml'));
    const instance = getUserInstance(userData, 'CommanderAch', commander);
    if (!instance) {
      errors.push(`XM${commander} UserData.xml: missing CommanderAch/${commander}`);
      continue;
    }

    for (const [field, expectedUnit] of Object.entries(expected)) {
      const actual = openerField(instance, field);
      if (actual !== expectedUnit) {
        errors.push(`XM${commander} UserData.xml: CommanderAch/${commander} ${field} expected ${expectedUnit}, actual ${actual || '<empty>'}`);
      }
    }

    const unitData = readText(gameDataPath(commander, 'UnitData.xml'));
    for (const unitId of Object.values(expected)) {
      assertMatches(
        unitData,
        `XM${commander} UnitData.xml`,
        new RegExp(`<CUnit\\s+id="${escapeRegExp(unitId)}"`),
        `opener unit ${unitId} is not defined in the commander module`,
      );
    }
  }
}

function validateZergClosures() {
  for (const [commander, closure] of Object.entries(zergClosures)) {
    const unitData = readText(gameDataPath(commander, 'UnitData.xml'));
    const behaviorData = readText(gameDataPath(commander, 'BehaviorData.xml'));
    const upgradeData = stripXmlComments(readText(gameDataPath(commander, 'UpgradeData.xml')));

    assertMatches(
      unitData,
      `XM${commander} UnitData.xml`,
      new RegExp(`<CUnit\\s+id="${escapeRegExp(closure.larva)}"\\s+parent="Larva"`),
      `missing private larva ${closure.larva}`,
    );

    if (/<CUnit\s+id="Larva"/.test(unitData)) {
      errors.push(`XM${commander} UnitData.xml: must not override global CUnit id="Larva"`);
    }

    if (/<CBehaviorSpawn\s+id="SpawnLarva"/.test(behaviorData)) {
      errors.push(`XM${commander} BehaviorData.xml: must not override global CBehaviorSpawn id="SpawnLarva"`);
    }

    const spawnBlock = getXmlBlock(behaviorData, 'CBehaviorSpawn', closure.spawn);
    if (!spawnBlock) {
      errors.push(`XM${commander} BehaviorData.xml: missing private ${closure.spawn}`);
    } else {
      assertMatches(
        spawnBlock,
        `XM${commander} BehaviorData.xml`,
        new RegExp(`(<Unit\\s+value="${escapeRegExp(closure.larva)}"\\s*/>|Unit="${escapeRegExp(closure.larva)}")`),
        `${closure.spawn} must produce ${closure.larva}`,
      );
    }

    const larvaBlock = getXmlBlock(unitData, 'CUnit', closure.larva);
    for (const larvaTrain of closure.larvaTrains) {
      assertMatches(
        larvaBlock,
        `XM${commander} UnitData.xml`,
        new RegExp(`<AbilArray[^>]*Link="${escapeRegExp(larvaTrain)}"`),
        `${closure.larva} must mount ${larvaTrain}`,
      );
    }

    for (const townHallId of closure.townHalls) {
      const townHallBlock = getXmlBlock(unitData, 'CUnit', townHallId);
      assertMatches(
        townHallBlock,
        `XM${commander} UnitData.xml`,
        new RegExp(`<BehaviorArray[^>]*Link="${escapeRegExp(closure.spawn)}"`),
        `${townHallId} must mount ${closure.spawn}`,
      );
    }

    for (const [upgradeId, references] of Object.entries(closure.upgradeRefs)) {
      const upgradeBlock = getXmlBlock(upgradeData, 'CUpgrade', upgradeId);
      if (!upgradeBlock) {
        errors.push(`XM${commander} UpgradeData.xml: missing ${upgradeId}`);
        continue;
      }

      for (const reference of references) {
        assertIncludes(
          upgradeBlock,
          `XM${commander} UpgradeData.xml`,
          `Reference="${reference}"`,
          `${upgradeId} must adjust private ${reference}`,
        );
      }
    }
  }
}

function validateNoActiveGlobalLarvaUpgradeRefs() {
  for (const commander of Object.keys(zergClosures)) {
    const upgradeDataPath = gameDataPath(commander, 'UpgradeData.xml');
    if (!fs.existsSync(upgradeDataPath)) {
      continue;
    }

    const upgradeData = stripXmlComments(readText(upgradeDataPath));
    if (/Reference="Behavior,SpawnLarva,/.test(upgradeData)) {
      errors.push(`XM${commander} UpgradeData.xml: active upgrades must not reference global Behavior,SpawnLarva`);
    }
  }
}

function validateProtossClosures() {
  for (const [commander, closure] of Object.entries(protossClosures)) {
    const opener = expectedOpeners[commander];
    const unitData = readText(gameDataPath(commander, 'UnitData.xml'));
    const abilData = readText(gameDataPath(commander, 'AbilData.xml'));

    const nexusBlock = getXmlBlock(unitData, 'CUnit', opener.CommandCenter);
    assertMatches(
      nexusBlock,
      `XM${commander} UnitData.xml`,
      new RegExp(`<AbilArray[^>]*Link="${escapeRegExp(closure.nexusTrain)}"`),
      `${opener.CommandCenter} must mount ${closure.nexusTrain}`,
    );

    const nexusTrainBlock = getXmlBlock(abilData, 'CAbilTrain', closure.nexusTrain);
    assertMatches(
      nexusTrainBlock,
      `XM${commander} AbilData.xml`,
      new RegExp(`<Unit\\s+value="${escapeRegExp(opener.Worker)}"\\s*/>`),
      `${closure.nexusTrain} must train ${opener.Worker}`,
    );

    const workerBlock = getXmlBlock(unitData, 'CUnit', opener.Worker);
    assertMatches(
      workerBlock,
      `XM${commander} UnitData.xml`,
      new RegExp(`<AbilArray[^>]*Link="${escapeRegExp(closure.build)}"`),
      `${opener.Worker} must mount ${closure.build}`,
    );
  }
}

function validateSwannClosure() {
  const opener = expectedOpeners.Swann;
  const unitData = readText(gameDataPath('Swann', 'UnitData.xml'));
  const abilData = readText(gameDataPath('Swann', 'AbilData.xml'));
  const commandCenterBlock = getXmlBlock(unitData, 'CUnit', opener.CommandCenter);

  assertMatches(
    commandCenterBlock,
    'XMSwann UnitData.xml',
    /<AbilArray[^>]*Link="CommandCenterTrainSwann"/,
    `${opener.CommandCenter} must mount CommandCenterTrainSwann`,
  );

  const trainBlock = getXmlBlock(abilData, 'CAbilTrain', 'CommandCenterTrainSwann');
  assertMatches(
    trainBlock,
    'XMSwann AbilData.xml',
    new RegExp(`<Unit\\s+value="${escapeRegExp(opener.Worker)}"`),
    `CommandCenterTrainSwann must train ${opener.Worker}`,
  );
}

function validateTerranClosures() {
  for (const [commander, closure] of Object.entries(terranClosures)) {
    const opener = expectedOpeners[commander];
    const unitData = readText(gameDataPath(commander, 'UnitData.xml'));
    const abilData = readText(gameDataPath(commander, 'AbilData.xml'));
    const commandCenterBlock = getXmlBlock(unitData, 'CUnit', opener.CommandCenter);

    assertMatches(
      commandCenterBlock,
      `XM${commander} UnitData.xml`,
      new RegExp(`<AbilArray[^>]*Link="${escapeRegExp(closure.commandCenterTrain)}"`),
      `${opener.CommandCenter} must mount ${closure.commandCenterTrain}`,
    );

    const trainBlock = getXmlBlock(abilData, 'CAbilTrain', closure.commandCenterTrain);
    assertMatches(
      trainBlock,
      `XM${commander} AbilData.xml`,
      new RegExp(`<Unit\\s+value="${escapeRegExp(opener.Worker)}"`),
      `${closure.commandCenterTrain} must train ${opener.Worker}`,
    );

    const workerBlock = getXmlBlock(unitData, 'CUnit', opener.Worker);
    assertMatches(
      workerBlock,
      `XM${commander} UnitData.xml`,
      new RegExp(`<AbilArray[^>]*Link="${escapeRegExp(closure.workerBuild)}"`),
      `${opener.Worker} must mount ${closure.workerBuild}`,
    );

    const buildBlock = getXmlBlock(abilData, 'CAbilBuild', closure.workerBuild);
    for (const requiredBuildUnit of closure.requiredBuildUnits) {
      assertMatches(
        buildBlock,
        `XM${commander} AbilData.xml`,
        new RegExp(`<InfoArray[^>]*Unit="${escapeRegExp(requiredBuildUnit)}"`),
        `${closure.workerBuild} must build ${requiredBuildUnit}`,
      );
    }
  }
}

function validateWelcomeToJungleMapInit() {
  const documentInfo = stripXmlComments(readText(path.join(welcomeToJungleMapRoot, 'DocumentInfo')));
  const documentHeaderDependencies = parseDocumentHeaderDependencies(path.join(welcomeToJungleMapRoot, 'DocumentHeader'));
  const mapScript = readText(path.join(welcomeToJungleMapRoot, 'MapScript.galaxy'));

  assertIncludes(
    documentInfo,
    'ttosh02 DocumentInfo',
    '<Value>file:Mods\\XM\\XMFinal.SC2Mod</Value>',
    'Welcome to the Jungle must depend on XMFinal',
  );

  if ((documentHeaderDependencies.length !== 1) || (documentHeaderDependencies[0] !== 'file:Mods\\XM\\XMFinal.SC2Mod')) {
    errors.push(`ttosh02 DocumentHeader: expected only XMFinal dependency, actual ${documentHeaderDependencies.join(', ')}`);
  }

  assertIncludes(
    mapScript,
    'ttosh02 MapScript.galaxy',
    'include "LibE0EAE146"',
    'Welcome to the Jungle must include XMFinal runtime library',
  );
  assertIncludes(
    mapScript,
    'ttosh02 MapScript.galaxy',
    'libE0EAE146_gf_SeedDefaultCommanderBankIfEmpty("Raynor");',
    'direct-launch default commander seed must be Raynor',
  );
  assertIncludes(
    mapScript,
    'ttosh02 MapScript.galaxy',
    'libE0EAE146_gf_Initialize(false);',
    'Welcome to the Jungle must initialize XMFinal before map setup',
  );
  assertMatches(
    mapScript,
    'ttosh02 MapScript.galaxy',
    /libE0EAE146_gf_InitializeBase\(PointFromId\(922334820\), 7, null, true\);/,
    'Welcome to the Jungle must create the commander opener through InitializeBase',
  );
}

function validateTargetRuntimeInitializers() {
  const xmFinalGalaxy = readText(path.join(xmFinalRoot, 'Base.SC2Data', 'LibE0EAE146.galaxy'));
  const xmFinalHeader = readText(path.join(xmFinalRoot, 'Base.SC2Data', 'LibE0EAE146_h.galaxy'));

  for (const [commander, initializer] of Object.entries(targetRuntimeInitializers)) {
    if (initializer.include) {
      assertIncludes(
        xmFinalGalaxy,
        'XMFinal LibE0EAE146.galaxy',
        initializer.include,
        `${commander} runtime include is missing`,
      );
    }

    if (initializer.declaration) {
      assertIncludes(
        xmFinalHeader,
        'XMFinal LibE0EAE146_h.galaxy',
        initializer.declaration,
        `${commander} runtime declaration is missing`,
      );
    }

    assertIncludes(
      xmFinalGalaxy,
      'XMFinal LibE0EAE146.galaxy',
      initializer.dispatch,
      `${commander} InitializeBase dispatch is missing`,
    );

    for (const mainString of initializer.mainStrings ?? []) {
      assertIncludes(
        xmFinalGalaxy,
        'XMFinal LibE0EAE146.galaxy',
        mainString,
        `${commander} runtime main branch must include ${mainString}`,
      );
    }

    if (initializer.runtimeFile) {
      const runtimeText = readText(path.join(xmFinalRoot, 'Base.SC2Data', initializer.runtimeFile));
      for (const runtimeString of initializer.runtimeStrings ?? []) {
        assertIncludes(
          runtimeText,
          `XMFinal ${initializer.runtimeFile}`,
          runtimeString,
          `${commander} runtime helper must include ${runtimeString}`,
        );
      }
    }
  }
}

function validateHeroStructureRuntime() {
  const xmFinalBase = path.join(xmFinalRoot, 'Base.SC2Data');
  const xmFinalGalaxy = readText(path.join(xmFinalBase, 'LibE0EAE146.galaxy'));
  const xmFinalHeader = readText(path.join(xmFinalBase, 'LibE0EAE146_h.galaxy'));
  const helperText = readText(path.join(xmFinalBase, 'LibE0EAE146_HeroStructures.galaxy'));
  const playerCommandersEvidence = readText(gameDataPath('Artanis', 'UserData.xml'));

  assertIncludes(
    xmFinalGalaxy,
    'XMFinal LibE0EAE146.galaxy',
    'include "LibE0EAE146_HeroStructures"',
    'hero-structure runtime include is missing',
  );
  assertIncludes(
    xmFinalHeader,
    'XMFinal LibE0EAE146_h.galaxy',
    'unit libE0EAE146_gf_CreateCommanderHeroStructure',
    'hero-structure create declaration is missing',
  );
  assertIncludes(
    xmFinalHeader,
    'XMFinal LibE0EAE146_h.galaxy',
    'string libE0EAE146_gf_CommanderHeroStructureUnitType',
    'hero-structure unit-type declaration is missing',
  );

  for (const [commander, expected] of Object.entries(expectedHeroStructures)) {
    assertIncludes(
      playerCommandersEvidence,
      'XMArtanis UserData.xml',
      `<GameLink GameLink="${expected.officialUnit}">`,
      `official PlayerCommanders HeroStructure ${expected.officialUnit} is missing`,
    );

    assertIncludes(
      helperText,
      'XMFinal LibE0EAE146_HeroStructures.galaxy',
      `"${expected.runtimeUnit}"`,
      `${commander} runtime hero structure ${expected.runtimeUnit} is not mapped`,
    );

    const commanderData = commanderGameDataText(commander);
    assertMatches(
      commanderData,
      `XM${commander} GameData`,
      new RegExp(`<CUnit\\s+id="${escapeRegExp(expected.runtimeUnit)}"`),
      `${commander} runtime hero structure ${expected.runtimeUnit} is not defined in loaded commander GameData`,
    );

    if (expected.runtimeFile) {
      const runtimeText = readText(path.join(xmFinalBase, expected.runtimeFile));
      assertIncludes(
        runtimeText,
        `XMFinal ${expected.runtimeFile}`,
        expected.runtimeCall,
        `${commander} runtime must create or find its hero structure near the main base`,
      );
    }

    if (expected.mainCall) {
      assertIncludes(
        xmFinalGalaxy,
        'XMFinal LibE0EAE146.galaxy',
        expected.mainCall,
        `${commander} main runtime branch must create or find its hero structure near the main base`,
      );
    }
  }
}

function validateHeroReviveRuntime() {
  const xmFinalBase = path.join(xmFinalRoot, 'Base.SC2Data');
  const xmFinalGalaxy = readText(path.join(xmFinalBase, 'LibE0EAE146.galaxy'));
  const xmFinalHeader = readText(path.join(xmFinalBase, 'LibE0EAE146_h.galaxy'));
  const helperText = readText(path.join(xmFinalBase, 'LibE0EAE146_HeroRevive.galaxy'));
  const playerCommandersEvidence = readText(gameDataPath('Artanis', 'UserData.xml'));

  assertIncludes(
    xmFinalGalaxy,
    'XMFinal LibE0EAE146.galaxy',
    'include "LibE0EAE146_HeroRevive"',
    'hero-revive runtime include is missing',
  );
  assertIncludes(
    xmFinalHeader,
    'XMFinal LibE0EAE146_h.galaxy',
    'void libE0EAE146_gt_CommanderHeroDied_Init',
    'hero-revive trigger declaration is missing',
  );
  assertIncludes(
    helperText,
    'XMFinal LibE0EAE146_HeroRevive.galaxy',
    'TriggerAddEventUnitDied(libE0EAE146_gt_CommanderHeroDied, null);',
    'hero-revive death event hook is missing',
  );
  assertIncludes(
    helperText,
    'XMFinal LibE0EAE146_HeroRevive.galaxy',
    'UnitRevive(lp_hero);',
    'hero-revive completion must revive the original hero unit',
  );

  for (const [commander, expected] of Object.entries(expectedHeroRevives)) {
    const commanderData = commanderGameDataText(commander);
    const runtimeText = readText(path.join(xmFinalBase, expected.runtimeFile));

    for (const heroUnit of expected.heroUnits) {
      assertIncludes(
        helperText,
        'XMFinal LibE0EAE146_HeroRevive.galaxy',
        `"${heroUnit}"`,
        `${commander} hero-revive matcher must include ${heroUnit}`,
      );
    }

    for (const fieldValue of [expected.reviveUnit, expected.firstBehavior, expected.normalBehavior]) {
      assertIncludes(
        playerCommandersEvidence,
        'XMArtanis UserData.xml',
        `<GameLink GameLink="${fieldValue}">`,
        `official PlayerCommanders revive field ${fieldValue} is missing`,
      );
      assertIncludes(
        helperText,
        'XMFinal LibE0EAE146_HeroRevive.galaxy',
        `"${fieldValue}"`,
        `${commander} hero-revive helper must map ${fieldValue}`,
      );
    }

    assertMatches(
      commanderData,
      `XM${commander} GameData`,
      new RegExp(`<CUnit\\s+id="${escapeRegExp(expected.reviveUnit)}"`),
      `${commander} revive unit ${expected.reviveUnit} is not defined in loaded commander GameData`,
    );
    for (const behaviorId of [expected.firstBehavior, expected.normalBehavior]) {
      assertMatches(
        commanderData,
        `XM${commander} GameData`,
        new RegExp(`<CBehaviorBuff\\s+id="${escapeRegExp(behaviorId)}"`),
        `${commander} revive timer behavior ${behaviorId} is not defined in loaded commander GameData`,
      );
    }

    assertIncludes(
      runtimeText,
      `XMFinal ${expected.runtimeFile}`,
      'libE0EAE146_gt_CommanderHeroDied_Init();',
      `${commander} runtime must initialize the hero-death revive trigger when creating its hero`,
    );
  }
}

validateDependencies();
validateCommanderAch();
validateZergClosures();
validateNoActiveGlobalLarvaUpgradeRefs();
validateProtossClosures();
validateSwannClosure();
validateTerranClosures();
validateWelcomeToJungleMapInit();
validateTargetRuntimeInitializers();
validateHeroStructureRuntime();
validateHeroReviveRuntime();

if (errors.length > 0) {
  console.error('FAIL: private commander opener validation failed');
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(`PASS: private commander opener validation passed commanders=${Object.keys(expectedOpeners).length}`);
