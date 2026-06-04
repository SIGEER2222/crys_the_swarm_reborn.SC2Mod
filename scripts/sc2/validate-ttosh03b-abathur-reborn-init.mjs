import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const mapRoot = path.join(repoRoot, '合作指挥官版起义狂潮', 'Maps', 'XM', 'ttosh03b.SC2Map');
const rebornGameData = path.join(
  repoRoot,
  '合作指挥官版起义狂潮',
  'Mods',
  'XM',
  'XMAbathurReborn.SC2Mod',
  'Base.SC2Data',
  'GameData',
);

const rebornMapDependency = 'file:Mods\\XM\\XMAbathurReborn.SC2Mod';

const files = {
  documentInfo: path.join(mapRoot, 'DocumentInfo'),
  documentHeader: path.join(mapRoot, 'DocumentHeader'),
  bankList: path.join(mapRoot, 'BankList.xml'),
  mapScript: path.join(mapRoot, 'MapScript.galaxy'),
  userData: path.join(rebornGameData, 'UserData.xml'),
  unitData: path.join(rebornGameData, 'UnitData.xml'),
  abilData: path.join(rebornGameData, 'AbilData.xml'),
  runtimeGalaxy: path.join(
    repoRoot,
    '合作指挥官版起义狂潮',
    'Mods',
    'XM',
    'XMAbathurReborn.SC2Mod',
    'Base.SC2Data',
    'LibA1BA7A9F.galaxy',
  ),
};

const errors = [];

function readText(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function requireContains(label, text, needle) {
  if (!text.includes(needle)) {
    errors.push(`${label}: missing ${needle}`);
  }
}

function requireRegex(label, text, regex, message) {
  if (!regex.test(text)) {
    errors.push(`${label}: ${message}`);
  }
}

function parseDocumentHeader(filePath) {
  const bytes = fs.readFileSync(filePath);
  const dependencyStartOffset = findFirstDependencyOffset(bytes);
  if (dependencyStartOffset < 4) {
    throw new Error(`${filePath}: no dependency string table was found`);
  }

  const dependencyCountOffset = dependencyStartOffset - 4;
  const dependencyCount = bytes.readUInt32LE(dependencyCountOffset);
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
    dependencies,
    tailStartOffset: offset,
  };
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

const documentInfo = readText(files.documentInfo);
requireContains('DocumentInfo', documentInfo, '<Value>file:Mods\\XM\\XMFinal.SC2Mod</Value>');
requireContains('DocumentInfo', documentInfo, `<Value>${rebornMapDependency}</Value>`);
if (documentInfo.includes('Bank;cryswarmcoop;1')) {
  errors.push('DocumentInfo: must not add cryswarmcoop preload; load it from MapScript only when AbathurReborn is active');
}

const bankList = readText(files.bankList);
requireContains('BankList.xml', bankList, '<Bank Name="CampaignXCore" Player="1"/>');
requireContains('BankList.xml', bankList, '<Bank Name="cryswarmcoop" Player="1"/>');

const mapScript = readText(files.mapScript);
requireContains('MapScript.galaxy', mapScript, 'libE0EAE146_gf_Initialize(true);');
requireContains('MapScript.galaxy', mapScript, 'libE0EAE146_gf_CommanderUpgrade();');
requireContains('MapScript.galaxy', mapScript, 'libE0EAE146_gf_StartGame();');
requireContains('MapScript.galaxy', mapScript, 'auto2F29E444_val == "AbathurReborn"');
requireContains('MapScript.galaxy', mapScript, 'BankLoad("cryswarmcoop", 1);');
requireContains('MapScript.galaxy', mapScript, 'TechTreeUpgradeAddLevel(1, "CommanderLevel", 16);');
requireContains('MapScript.galaxy', mapScript, 'TechTreeUpgradeAddLevel(1, "AbathurRebornCommander", 1);');
if (/TechTreeUpgradeAddLevel\(1,\s*"(?:AbathurReborn|MasteryAbathurReborn|CommanderPrestigeAbathurReborn)[^"]*Biomass[^"]*"/.test(mapScript)) {
  errors.push('MapScript.galaxy: AbathurReborn map init must not grant biomass upgrades');
}
requireContains('MapScript.galaxy', mapScript, 'CoopCasterAbathurReborn');
requireContains('MapScript.galaxy', mapScript, 'lib67C0F0E7_gf_CU_GPInit(1, "AbathurReborn"');
requireRegex(
  'MapScript.galaxy',
  mapScript,
  /libNtve_gf_CreateUnitsWithDefaultFacing\(1,\s*"Ravager"[\s\S]*?gv_nova = UnitLastCreated\(\);/,
  'AbathurReborn branch must create a Ravager and bind it as the ttosh03b story anchor',
);
if (/auto2F29E444_val == "AbathurReborn"[\s\S]*?CreateUnitsWithDefaultFacing\([^)]*"RoachVile"/.test(mapScript)) {
  errors.push('MapScript.galaxy: AbathurReborn ttosh03b init must not spawn RoachVile because its current card still carries biomass passives');
}

const userData = readText(files.userData);
requireContains('XMAbathurReborn UserData.xml', userData, '<Instances Id="AbathurReborn">');
requireContains('XMAbathurReborn UserData.xml', userData, '<Unit Unit="HatcheryAbathurReborn">');
requireContains('XMAbathurReborn UserData.xml', userData, '<Unit Unit="DroneAbathurReborn">');
requireContains('XMAbathurReborn UserData.xml', userData, '<Unit Unit="OverlordAbathurReborn">');

const unitData = readText(files.unitData);
requireContains('XMAbathurReborn UnitData.xml', unitData, '<CUnit id="HatcheryAbathurReborn"');
requireContains('XMAbathurReborn UnitData.xml', unitData, '<CUnit id="DroneAbathurReborn"');
requireContains('XMAbathurReborn UnitData.xml', unitData, '<CUnit id="OverlordAbathurReborn"');
requireContains('XMAbathurReborn UnitData.xml', unitData, '<CUnit id="CoopCasterAbathurReborn"');
if (/<LayoutButtons[^>]*(?:Biomass|CommanderPrestigeAbathurReborn[^>]*Biomass)[^>]*>/.test(unitData)) {
  errors.push('XMAbathurReborn UnitData.xml: AbathurReborn must not expose visible biomass buttons');
}
if (/<AbilArray\s+Link="(?:Biomass|AbathurRebornCollectBiomass|AbathurRebornBiomassCollection)[^"]*"\s*\/>/.test(unitData)) {
  errors.push('XMAbathurReborn UnitData.xml: AbathurReborn units must not mount biomass interaction abilities');
}
const casterMatch = unitData.match(/<CUnit id="CoopCasterAbathurReborn"[\s\S]*?<\/CUnit>/);
if (!casterMatch) {
  errors.push('XMAbathurReborn UnitData.xml: missing CoopCasterAbathurReborn block');
}
else if (/\bBiomass(TargetMark|Display|Collection|Pickup)\b/.test(casterMatch[0])) {
  errors.push('XMAbathurReborn UnitData.xml: CoopCasterAbathurReborn must not expose biomass buttons or abilities');
}
requireContains('XMAbathurReborn UnitData.xml', unitData, '<CUnit id="Ravager">');
requireContains('XMAbathurReborn UnitData.xml', unitData, '<AbilArray Link="RavagerCorrosiveBile" />');

const abilData = readText(files.abilData);
requireContains('XMAbathurReborn AbilData.xml', abilData, '<CAbilEffectTarget id="RavagerCorrosiveBile">');
requireContains('XMAbathurReborn AbilData.xml', abilData, '<Cooldown Link="Abil/RavagerCorrosiveBile" TimeUse="15" />');

const runtimeGalaxy = readText(files.runtimeGalaxy);
if (/CreateUnitsWithDefaultFacing\([^;\n]*"BiomassPickup"/.test(runtimeGalaxy)) {
  errors.push('XMAbathurReborn LibA1BA7A9F.galaxy: must not create BiomassPickup');
}
if (/UnitCreateEffectUnit\([^;\n]*"AbathurRebornCollectBiomass"/.test(runtimeGalaxy)) {
  errors.push('XMAbathurReborn LibA1BA7A9F.galaxy: must not apply AbathurRebornCollectBiomass');
}
if (!/bool libA1BA7A9F_gf_AbathurRebornCanDropBiomass[\s\S]*?\breturn false;[\s\S]*?}/.test(runtimeGalaxy)) {
  errors.push('XMAbathurReborn LibA1BA7A9F.galaxy: CanDropBiomass must be a no-op');
}

const headerDependencies = parseDocumentHeader(files.documentHeader).dependencies;
if (!headerDependencies.includes('file:Mods\\XM\\XMFinal.SC2Mod')) {
  errors.push('DocumentHeader: missing file:Mods\\XM\\XMFinal.SC2Mod');
}
if (!headerDependencies.includes(rebornMapDependency)) {
  errors.push(`DocumentHeader: missing ${rebornMapDependency}`);
}

if (errors.length > 0) {
  console.error('FAIL: ttosh03b 重生阿巴瑟初始化校验失败');
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(`PASS: ttosh03b 重生阿巴瑟初始化校验通过 dependencies=${headerDependencies.length}`);
