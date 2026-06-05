import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const xmRoot = path.join(repoRoot, '合作指挥官版起义狂潮', 'Mods', 'XM');
const xmFinalRoot = path.join(xmRoot, 'XMFinal.SC2Mod');

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
  for (const commander of Object.keys(expectedOpeners)) {
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

validateDependencies();
validateCommanderAch();
validateZergClosures();
validateNoActiveGlobalLarvaUpgradeRefs();
validateProtossClosures();
validateSwannClosure();

if (errors.length > 0) {
  console.error('FAIL: private commander opener validation failed');
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(`PASS: private commander opener validation passed commanders=${Object.keys(expectedOpeners).length}`);
