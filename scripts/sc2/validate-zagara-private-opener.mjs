import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const scenarioRoot = path.join(repoRoot, '合作指挥官版起义狂潮');
const xmRoot = path.join(scenarioRoot, 'Mods', 'XM');
const xmFinalRoot = path.join(xmRoot, 'XMFinal.SC2Mod');
const xmCoreUserData = path.join(xmRoot, 'XMCore.SC2Mod', 'Base.SC2Data', 'GameData', 'UserData.xml');
const xmZagaraUserData = path.join(xmRoot, 'XMZagara.SC2Mod', 'Base.SC2Data', 'GameData', 'UserData.xml');
const xmZagaraGameData = path.join(xmRoot, 'XMZagara.SC2Mod', 'Base.SC2Data', 'GameData');
const xmZagaraLocalizedData = path.join(xmRoot, 'XMZagara.SC2Mod', 'zhCN.SC2Data', 'LocalizedData');
const runtimeSafety = path.join(xmFinalRoot, 'Base.SC2Data', 'LibE0EAE146_RuntimeSafety.galaxy');
const documentInfo = path.join(xmFinalRoot, 'DocumentInfo');
const documentHeader = path.join(xmFinalRoot, 'DocumentHeader');
const unitData = path.join(xmZagaraGameData, 'UnitData.xml');
const abilData = path.join(xmZagaraGameData, 'AbilData.xml');
const buttonData = path.join(xmZagaraGameData, 'ButtonData.xml');
const actorData = path.join(xmZagaraGameData, 'ActorData.xml');
const gameStrings = path.join(xmZagaraLocalizedData, 'GameStrings.txt');
const requiredXmZagaraDependency = 'file:Mods\\XM\\XMZagara.SC2Mod';
const shouldFixDocumentHeader = process.argv.includes('--fix-document-header');

const expected = {
  CommandCenter: 'HatcheryZagara',
  Worker: 'DroneZagara',
  SecondUnit: 'OverlordZagara',
};

const genericXmCore = {
  CommandCenter: 'Hatchery',
  Worker: 'Drone',
  SecondUnit: 'Overlord',
};

const errors = [];

function readText(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function stripXmlComments(text) {
  return text.replace(/<!--[\s\S]*?-->/g, '');
}

function commanderAchBlock(userDataText, instanceId) {
  const match = userDataText.match(new RegExp(`<Instances\\s+Id="${instanceId}"[\\s\\S]*?<\\/Instances>`));
  return match ? match[0] : '';
}

function openerField(block, field) {
  const match = block.match(new RegExp(`<Unit\\s+Unit="([^"]+)"\\s*>\\s*<Field\\s+Id="${field}"`));
  return match ? match[1] : '';
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
  return parseDocumentHeader(filePath).dependencies;
}

function parseDocumentHeader(filePath) {
  const bytes = fs.readFileSync(filePath);
  const dependencyStartOffset = findFirstDependencyOffset(bytes);
  if (dependencyStartOffset < 4) {
    throw new Error(`${filePath}: no dependency string table was found`);
  }

  const dependencyCountOffset = dependencyStartOffset - 4;
  const dependencyCount = bytes.readUInt32LE(dependencyStartOffset - 4);
  const dependencies = [];
  let offset = dependencyStartOffset;

  for (let index = 0; index < dependencyCount && offset < bytes.length; index += 1) {
    const end = bytes.indexOf(0, offset);
    const valueEnd = end >= 0 ? end : bytes.length;
    dependencies.push(bytes.subarray(offset, valueEnd).toString('utf8'));
    offset = end >= 0 ? end + 1 : valueEnd;
  }

  return {
    bytes,
    dependencyCountOffset,
    dependencyStartOffset,
    dependencyEndOffset: offset,
    dependencies,
  };
}

function writeDocumentHeaderDependencies(filePath, headerInfo, dependencies) {
  const dependencyBytes = Buffer.from(`${dependencies.join('\0')}\0`, 'utf8');
  const countBytes = Buffer.alloc(4);
  countBytes.writeUInt32LE(dependencies.length, 0);

  const updatedBytes = Buffer.concat([
    headerInfo.bytes.subarray(0, headerInfo.dependencyCountOffset),
    countBytes,
    dependencyBytes,
    headerInfo.bytes.subarray(headerInfo.dependencyEndOffset),
  ]);

  fs.writeFileSync(filePath, updatedBytes);
}

function ensureDocumentHeaderDependency(filePath, requiredDependency) {
  const headerInfo = parseDocumentHeader(filePath);
  if (headerInfo.dependencies.includes(requiredDependency)) {
    return headerInfo.dependencies;
  }

  if (!shouldFixDocumentHeader) {
    return headerInfo.dependencies;
  }

  const dependencies = [...headerInfo.dependencies, requiredDependency];
  writeDocumentHeaderDependencies(filePath, headerInfo, dependencies);
  return dependencies;
}

function assertOpener(block, sourceName, expectedValues) {
  for (const [field, unitId] of Object.entries(expectedValues)) {
    const actual = openerField(block, field);
    if (actual !== unitId) {
      errors.push(`${sourceName}: CommanderAch/Zagara ${field} expected ${unitId}, actual ${actual || '<empty>'}`);
    }
  }
}

function assertIncludes(text, sourceName, expectedText, message) {
  if (!text.includes(expectedText)) {
    errors.push(`${sourceName}: ${message}`);
  }
}

function assertMatches(text, sourceName, pattern, message) {
  if (!pattern.test(text)) {
    errors.push(`${sourceName}: ${message}`);
  }
}

const coreBlock = commanderAchBlock(readText(xmCoreUserData), 'Zagara');
assertOpener(coreBlock, 'XMCore UserData.xml', genericXmCore);

const zagaraBlock = commanderAchBlock(readText(xmZagaraUserData), 'Zagara');
assertOpener(zagaraBlock, 'XMZagara UserData.xml', expected);

const runtimeSafetyText = readText(runtimeSafety);
for (const unitId of Object.values(expected)) {
  if (!runtimeSafetyText.includes(`libE0EAE146_gf_CatalogUnitOrEmpty("${unitId}")`)) {
    errors.push(`LibE0EAE146_RuntimeSafety.galaxy: missing catalog-guarded Zagara opener fallback ${unitId}`);
  }
}

if (!runtimeSafetyText.includes('CatalogEntryIsValid(c_gameCatalogUnit, lp_unitType)')) {
  errors.push('LibE0EAE146_RuntimeSafety.galaxy: private opener fallback must validate catalog unit IDs before returning them');
}

const zagaraBranchIndex = runtimeSafetyText.indexOf('libE0EAE146_gv_commander == "Zagara"');
const userDataReadIndex = runtimeSafetyText.indexOf('UserDataGetUnit("CommanderAch"');
if (zagaraBranchIndex < 0 || (userDataReadIndex >= 0 && zagaraBranchIndex > userDataReadIndex)) {
  errors.push('LibE0EAE146_RuntimeSafety.galaxy: Zagara direct opener fallback must run before CommanderAch UserDataGetUnit');
}

const activeDocumentInfo = stripXmlComments(readText(documentInfo));
assertIncludes(
  activeDocumentInfo,
  'XMFinal DocumentInfo',
  '<Value>file:Mods\\XM\\XMZagara.SC2Mod</Value>',
  'missing active file:Mods\\XM\\XMZagara.SC2Mod dependency value',
);

const unitDataText = readText(unitData);
assertIncludes(unitDataText, 'XMZagara UnitData.xml', '<CUnit id="DroneZagara" parent="Drone">', 'missing private DroneZagara unit shell');
assertIncludes(unitDataText, 'XMZagara UnitData.xml', '<CUnit id="LarvaZagara" parent="Larva">', 'missing private LarvaZagara unit shell');
assertIncludes(unitDataText, 'XMZagara UnitData.xml', '<CUnit id="OverlordZagara" parent="Overlord">', 'missing private OverlordZagara unit shell');
assertIncludes(unitDataText, 'XMZagara UnitData.xml', '<CUnit id="HatcheryZagara" parent="Hatchery">', 'missing private HatcheryZagara unit shell');
assertIncludes(unitDataText, 'XMZagara UnitData.xml', '<CUnit id="LairZagara" parent="Lair">', 'missing private LairZagara unit shell');
assertIncludes(unitDataText, 'XMZagara UnitData.xml', '<CUnit id="HiveZagara" parent="Hive">', 'missing private HiveZagara unit shell');
assertIncludes(unitDataText, 'XMZagara UnitData.xml', 'Face="HatcheryZagara" Type="AbilCmd" AbilCmd="ZergBuildZagara,Build1"', 'DroneZagara build card must use HatcheryZagara face');
assertIncludes(unitDataText, 'XMZagara UnitData.xml', 'Face="DroneZagara" Type="AbilCmd" AbilCmd="LarvaTrainZagara,Train1"', 'LarvaZagara train card must use DroneZagara face');
assertIncludes(unitDataText, 'XMZagara UnitData.xml', 'Face="OverlordZagara" Type="AbilCmd" AbilCmd="LarvaTrainZagara,Train4"', 'LarvaZagara train card must use OverlordZagara face');
assertIncludes(unitDataText, 'XMZagara UnitData.xml', 'Face="LairZagara" Type="AbilCmd" AbilCmd="UpgradeToLairZagara,Execute"', 'HatcheryZagara morph card must use LairZagara face');
assertIncludes(unitDataText, 'XMZagara UnitData.xml', 'Face="HiveZagara" Type="AbilCmd" AbilCmd="UpgradeToHiveZagara,Execute"', 'LairZagara morph card must use HiveZagara face');

const abilDataText = readText(abilData);
assertMatches(
  abilDataText,
  'XMZagara AbilData.xml',
  /<InfoArray\s+index="Build1"\s+Unit="HatcheryZagara">[\s\S]*?<Button\s+DefaultButtonFace="HatcheryZagara"\s+State="Available"\s*\/>/,
  'ZergBuildZagara Build1 must produce and display HatcheryZagara',
);
assertMatches(
  abilDataText,
  'XMZagara AbilData.xml',
  /<InfoArray\s+index="Train1">[\s\S]*?<Button\s+DefaultButtonFace="DroneZagara"\s+State="Available"\s*\/>[\s\S]*?<Unit\s+value="DroneZagara"\s*\/>/,
  'LarvaTrainZagara Train1 must produce and display DroneZagara',
);
assertMatches(
  abilDataText,
  'XMZagara AbilData.xml',
  /<InfoArray\s+index="Train4">[\s\S]*?<Button\s+DefaultButtonFace="OverlordZagara"\s+State="Available"\s*\/>[\s\S]*?<Unit\s+value="OverlordZagara"\s*\/>/,
  'LarvaTrainZagara Train4 must produce and display OverlordZagara',
);

const buttonDataText = readText(buttonData);
for (const buttonId of ['DroneZagara', 'OverlordZagara', 'HatcheryZagara', 'LairZagara', 'HiveZagara']) {
  assertIncludes(buttonDataText, 'XMZagara ButtonData.xml', `<CButton id="${buttonId}">`, `missing private ${buttonId} button`);
}

const actorDataText = readText(actorData);
for (const unitId of ['DroneZagara', 'LarvaZagara', 'OverlordZagara', 'HatcheryZagara', 'LairZagara', 'HiveZagara']) {
  assertMatches(
    actorDataText,
    'XMZagara ActorData.xml',
    new RegExp(`<CActorUnit\\s+id="${unitId}"[\\s\\S]*?unitName="${unitId}"`),
    `missing private actor binding for ${unitId}`,
  );
}

const gameStringsText = readText(gameStrings);
for (const unitId of ['DroneZagara', 'OverlordZagara', 'HatcheryZagara', 'LairZagara', 'HiveZagara']) {
  assertIncludes(gameStringsText, 'XMZagara GameStrings.txt', `Button/Name/${unitId}=`, `missing button name for ${unitId}`);
  assertIncludes(gameStringsText, 'XMZagara GameStrings.txt', `Button/Tooltip/${unitId}=`, `missing button tooltip for ${unitId}`);
  assertIncludes(gameStringsText, 'XMZagara GameStrings.txt', `Unit/Name/${unitId}=`, `missing unit name for ${unitId}`);
}

const dependencies = ensureDocumentHeaderDependency(documentHeader, requiredXmZagaraDependency);
if (!dependencies.includes(requiredXmZagaraDependency)) {
  errors.push(`XMFinal DocumentHeader: missing ${requiredXmZagaraDependency}, so the live game can fall back to XMCore generic Zagara opener`);
}

if (errors.length > 0) {
  console.error('FAIL: Zagara private opener validation failed');
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(`PASS: Zagara private opener validation passed dependencies=${dependencies.length}`);
