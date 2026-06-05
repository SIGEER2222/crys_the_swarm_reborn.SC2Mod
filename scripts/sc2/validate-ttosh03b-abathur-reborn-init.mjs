import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const scenarioRoot = path.join(repoRoot, '合作指挥官版起义狂潮');
const xmModsRoot = path.join(scenarioRoot, 'Mods', 'XM');
const officialMirrorRoot = path.join(repoRoot, '游戏数据', '官方SC2原始文本镜像');
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
const xmFinalGameData = path.join(
  repoRoot,
  '合作指挥官版起义狂潮',
  'Mods',
  'XM',
  'XMFinal.SC2Mod',
  'Base.SC2Data',
  'GameData',
);
const xmFinalBaseData = path.join(
  repoRoot,
  '合作指挥官版起义狂潮',
  'Mods',
  'XM',
  'XMFinal.SC2Mod',
  'Base.SC2Data',
);

const forbiddenMapDependency = 'file:Mods\\XM\\XMAbathurReborn.SC2Mod';
const requiredXMFinalDependency = 'file:Mods\\XM\\XMAbathurReborn.SC2Mod';

const files = {
  documentInfo: path.join(mapRoot, 'DocumentInfo'),
  documentHeader: path.join(mapRoot, 'DocumentHeader'),
  xmFinalDocumentHeader: path.join(
    repoRoot,
    '合作指挥官版起义狂潮',
    'Mods',
    'XM',
    'XMFinal.SC2Mod',
    'DocumentHeader',
  ),
  xmFinalCompatGalaxy: path.join(
    repoRoot,
    '合作指挥官版起义狂潮',
    'Mods',
    'XM',
    'XMFinal.SC2Mod',
    'Base.SC2Data',
    'LibA1BA7A9F.galaxy',
  ),
  xmFinalGalaxy: path.join(xmFinalBaseData, 'LibE0EAE146.galaxy'),
  xmFinalHeaderGalaxy: path.join(xmFinalBaseData, 'LibE0EAE146_h.galaxy'),
  xmFinalRuntimeSafetyGalaxy: path.join(xmFinalBaseData, 'LibE0EAE146_RuntimeSafety.galaxy'),
  xmFinalAbathurRebornRuntimeGalaxy: path.join(xmFinalBaseData, 'LibE0EAE146_AbathurRebornRuntime.galaxy'),
  xmFinalZeratulRuntimeGalaxy: path.join(xmFinalBaseData, 'LibE0EAE146_ZeratulRuntime.galaxy'),
  xmFinalAbilData: path.join(xmFinalGameData, 'AbilData.xml'),
  xmFinalActorData: path.join(xmFinalGameData, 'ActorData.xml'),
  xmFinalBehaviorData: path.join(xmFinalGameData, 'BehaviorData.xml'),
  xmFinalButtonData: path.join(xmFinalGameData, 'ButtonData.xml'),
  xmFinalEffectData: path.join(xmFinalGameData, 'EffectData.xml'),
  bankList: path.join(mapRoot, 'BankList.xml'),
  mapScript: path.join(mapRoot, 'MapScript.galaxy'),
  userData: path.join(rebornGameData, 'UserData.xml'),
  unitData: path.join(rebornGameData, 'UnitData.xml'),
  abilData: path.join(rebornGameData, 'AbilData.xml'),
  behaviorData: path.join(rebornGameData, 'BehaviorData.xml'),
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

function walkFiles(dirPath, predicate = () => true, results = []) {
  if (!fs.existsSync(dirPath)) {
    return results;
  }

  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    const entryPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      walkFiles(entryPath, predicate, results);
    }
    else if (predicate(entryPath)) {
      results.push(entryPath);
    }
  }

  return results;
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

function parseDocumentInfo(filePath) {
  if (!fs.existsSync(filePath)) {
    return [];
  }

  const text = readText(filePath);
  return [...text.matchAll(/<Value>([^<]+)<\/Value>/g)].map((match) => match[1]);
}

function parseRootDependencies(rootPath) {
  const headerPath = path.join(rootPath, 'DocumentHeader');
  if (fs.existsSync(headerPath)) {
    try {
      return parseDocumentHeader(headerPath).dependencies;
    }
    catch {
      // Some SC2Mod folders store XML metadata here and put dependency values in DocumentInfo.
    }
  }

  return parseDocumentInfo(path.join(rootPath, 'DocumentInfo'));
}

function rootFromDependency(dependency) {
  const fileIndex = dependency.lastIndexOf('file:');
  if (fileIndex < 0) {
    return null;
  }

  const dependencyPath = dependency.slice(fileIndex + 'file:'.length).replace(/\\/g, '/');
  const lowerPath = dependencyPath.toLowerCase();
  if (lowerPath.startsWith('mods/xm/')) {
    return path.join(xmModsRoot, dependencyPath.slice('Mods/XM/'.length));
  }
  if (lowerPath.startsWith('campaigns/')) {
    return path.join(officialMirrorRoot, 'campaigns', lowerPath.slice('campaigns/'.length));
  }
  if (lowerPath.startsWith('mods/')) {
    return path.join(officialMirrorRoot, 'mods', lowerPath.slice('mods/'.length));
  }

  return null;
}

function collectDependencyRoots(rootPath, seen = new Set()) {
  const resolvedRoot = path.resolve(rootPath);
  const seenKey = resolvedRoot.toLowerCase();
  if (seen.has(seenKey) || !fs.existsSync(resolvedRoot)) {
    return [];
  }

  seen.add(seenKey);
  const roots = [resolvedRoot];
  for (const dependency of parseRootDependencies(resolvedRoot)) {
    const dependencyRoot = rootFromDependency(dependency);
    if (dependencyRoot) {
      roots.push(...collectDependencyRoots(dependencyRoot, seen));
    }
  }

  return roots;
}

function gameDataDirsForRoots(roots) {
  const dirs = [];
  for (const root of roots) {
    const gameData = path.join(root, 'Base.SC2Data', 'GameData');
    if (fs.existsSync(gameData)) {
      dirs.push(gameData);
    }
  }
  return dirs;
}

function addCatalogId(catalog, kind, id, filePath) {
  if (!catalog[kind]) {
    catalog[kind] = new Map();
  }
  if (!catalog[kind].has(id)) {
    catalog[kind].set(id, []);
  }
  catalog[kind].get(id).push(path.relative(repoRoot, filePath));
}

function catalogIdsForGameDataDirs(gameDataDirs) {
  const catalog = {
    Abil: new Map(),
    Behavior: new Map(),
    Button: new Map(),
    Effect: new Map(),
    Unit: new Map(),
    Upgrade: new Map(),
  };

  for (const gameDataDir of gameDataDirs) {
    for (const filePath of walkFiles(gameDataDir, (entryPath) => entryPath.toLowerCase().endsWith('.xml'))) {
      const text = readText(filePath);
      for (const match of text.matchAll(/<C(Unit|Abil\w*|Behavior\w*|Button|Effect\w*|Upgrade)\s+[^>]*\bid="([^"]+)"/g)) {
        let kind = match[1];
        if (kind.startsWith('Abil')) {
          kind = 'Abil';
        }
        else if (kind.startsWith('Behavior')) {
          kind = 'Behavior';
        }
        else if (kind.startsWith('Effect')) {
          kind = 'Effect';
        }
        addCatalogId(catalog, kind, match[2], filePath);
      }
    }
  }

  return catalog;
}

function findGalaxyFiles(dirPath) {
  return walkFiles(dirPath, (entryPath) => entryPath.toLowerCase().endsWith('.galaxy'));
}

function extractRuntimeEventRefs(filesToScan) {
  const refs = [];
  for (const filePath of filesToScan) {
    const lines = readText(filePath).split(/\r?\n/);
    lines.forEach((line, index) => {
      for (const match of line.matchAll(/TriggerAddEventUnitBehaviorChange\([^;]*?,\s*null,\s*"([^"]+)"/g)) {
        refs.push({ kind: 'Behavior', id: match[1], filePath, lineNumber: index + 1 });
      }
      for (const match of line.matchAll(/TriggerAddEventUnitAbility\([^;]*?AbilityCommand\("([^"]+)"/g)) {
        refs.push({ kind: 'Abil', id: match[1], filePath, lineNumber: index + 1 });
      }
      for (const match of line.matchAll(/TriggerAddEventPlayerEffectUsed\([^;]*?,\s*[^,]+,\s*"([^"]+)"/g)) {
        refs.push({ kind: 'Effect', id: match[1], filePath, lineNumber: index + 1 });
      }
    });
  }
  return refs;
}

function requireRuntimeEventRefsResolvable(label, filesToScan, catalog) {
  const refs = extractRuntimeEventRefs(filesToScan);
  for (const ref of refs) {
    if (!catalog[ref.kind]?.has(ref.id)) {
      errors.push(
        `${label}: unresolved ${ref.kind} event ${ref.id} at ${path.relative(repoRoot, ref.filePath)}:${ref.lineNumber}`,
      );
    }
  }
}

const documentInfo = readText(files.documentInfo);
requireContains('DocumentInfo', documentInfo, '<Value>file:Mods\\XM\\XMFinal.SC2Mod</Value>');
if (documentInfo.includes(forbiddenMapDependency)) {
  errors.push(`DocumentInfo: must not add map dependency ${forbiddenMapDependency}`);
}
if (documentInfo.includes('Bank;cryswarmcoop;1')) {
  errors.push('DocumentInfo: must not add cryswarmcoop preload; load it from MapScript only when AbathurReborn is active');
}

const bankList = readText(files.bankList);
requireContains('BankList.xml', bankList, '<Bank Name="CampaignXCore" Player="1"/>');
requireContains('BankList.xml', bankList, '<Bank Name="cryswarmcoop" Player="1"/>');

const mapScript = readText(files.mapScript);
requireContains('MapScript.galaxy', mapScript, 'libE0EAE146_gf_SeedDefaultCommanderBankIfEmpty("AbathurReborn");');
requireContains('MapScript.galaxy', mapScript, 'libE0EAE146_gf_Initialize(true);');
requireContains('MapScript.galaxy', mapScript, 'libE0EAE146_gf_CommanderUpgrade();');
requireContains('MapScript.galaxy', mapScript, 'libE0EAE146_gf_StartGame();');
requireContains('MapScript.galaxy', mapScript, 'libE0EAE146_gf_CommanderAchUnit("CommandCenter")');
requireContains('MapScript.galaxy', mapScript, 'libE0EAE146_gf_CommanderAchUnit("Worker")');
requireContains('MapScript.galaxy', mapScript, 'libE0EAE146_gf_CommanderAchUnit("SecondUnit")');
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
requireRegex(
  'MapScript.galaxy',
  mapScript,
  /bool gt_ExtremeAggro_Func[\s\S]*?UnitIsValid\(gv_nova\) == false[\s\S]*?return true;/,
  'ExtremeAggro must ignore ticks until gv_nova/story anchor is valid',
);
if (/CreateUnitsWithDefaultFacing\([^;\n]*UserDataGetUnit\("CommanderAch"/.test(mapScript)) {
  errors.push('MapScript.galaxy: opener creation must use libE0EAE146_gf_CommanderAchUnit so empty CommanderAch fields cannot create unit type ""');
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
requireContains('XMAbathurReborn UnitData.xml', unitData, '<CUnit id="LarvaAbathurReborn" parent="Larva">');
requireContains('XMAbathurReborn UnitData.xml', unitData, '<BehaviorArray index="1" Link="SpawnLarvaAbathurReborn" />');
requireContains('XMAbathurReborn UnitData.xml', unitData, '<AbilArray index="0" Link="LarvaTrainAbathurReborn" />');
requireContains('XMAbathurReborn UnitData.xml', unitData, '<CUnit id="CoopCasterAbathurReborn"');
if (/<CUnit\s+id="Larva"/.test(unitData)) {
  errors.push('XMAbathurReborn UnitData.xml: must not override shared CUnit id="Larva"');
}
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
requireContains('XMAbathurReborn AbilData.xml', abilData, '<CAbilTrain id="LarvaTrainAbathurReborn" parent="LarvaTrain">');
requireContains('XMAbathurReborn AbilData.xml', abilData, '<CAbilEffectTarget id="RavagerCorrosiveBile">');
requireContains('XMAbathurReborn AbilData.xml', abilData, '<Cooldown Link="Abil/RavagerCorrosiveBile" TimeUse="15" />');

const behaviorData = readText(files.behaviorData);
requireContains('XMAbathurReborn BehaviorData.xml', behaviorData, '<CBehaviorSpawn id="SpawnLarvaAbathurReborn" parent="SpawnLarva">');
requireContains('XMAbathurReborn BehaviorData.xml', behaviorData, 'Unit="LarvaAbathurReborn"');

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
if (headerDependencies.includes(forbiddenMapDependency)) {
  errors.push(`DocumentHeader: must not add map dependency ${forbiddenMapDependency}`);
}

const xmFinalDependencies = parseDocumentHeader(files.xmFinalDocumentHeader).dependencies;
if (!xmFinalDependencies.includes(requiredXMFinalDependency)) {
  errors.push(`XMFinal DocumentHeader: missing ${requiredXMFinalDependency}`);
}

const xmFinalCompatGalaxy = readText(files.xmFinalCompatGalaxy);
requireContains('XMFinal LibA1BA7A9F.galaxy', xmFinalCompatGalaxy, 'void libA1BA7A9F_InitLib ()');
requireContains('XMFinal LibA1BA7A9F.galaxy', xmFinalCompatGalaxy, 'bool libA1BA7A9F_gf_AbathurRebornCanDropBiomass');
if (/CreateUnitsWithDefaultFacing\([^;\n]*"BiomassPickup"/.test(xmFinalCompatGalaxy)) {
  errors.push('XMFinal LibA1BA7A9F.galaxy: must not create BiomassPickup');
}

const xmFinalGalaxy = readText(files.xmFinalGalaxy);
requireContains('XMFinal LibE0EAE146.galaxy', xmFinalGalaxy, 'include "LibE0EAE146_RuntimeSafety"');
requireContains('XMFinal LibE0EAE146.galaxy', xmFinalGalaxy, 'include "LibE0EAE146_AbathurRebornRuntime"');
requireContains('XMFinal LibE0EAE146.galaxy', xmFinalGalaxy, 'libE0EAE146_gf_CommanderAchUnit("CommandCenter")');
requireContains('XMFinal LibE0EAE146.galaxy', xmFinalGalaxy, 'libE0EAE146_gf_CommanderAchUnit("Worker")');
requireContains('XMFinal LibE0EAE146.galaxy', xmFinalGalaxy, 'libE0EAE146_gf_CommanderAchUnit("SecondUnit")');
requireRegex(
  'XMFinal LibE0EAE146.galaxy',
  xmFinalGalaxy,
  /auto09490B45_val\s*==\s*"AbathurReborn"[\s\S]{0,180}libE0EAE146_gf_AbathurRebornRuntimeInit\(1,\s*lp_secondUnit,\s*lp_createHero\)/,
  'InitializeBase must branch AbathurReborn to AbathurRebornRuntimeInit',
);
if (/CreateUnitsWithDefaultFacing\([^;\n]*UserDataGetUnit\("CommanderAch"/.test(xmFinalGalaxy)) {
  errors.push('XMFinal LibE0EAE146.galaxy: base creation must use libE0EAE146_gf_CommanderAchUnit so empty CommanderAch fields cannot create unit type ""');
}

const xmFinalHeaderGalaxy = readText(files.xmFinalHeaderGalaxy);
requireContains('XMFinal LibE0EAE146_h.galaxy', xmFinalHeaderGalaxy, 'void libE0EAE146_gf_SeedDefaultCommanderBankIfEmpty (string lp_defaultCommander);');
requireContains('XMFinal LibE0EAE146_h.galaxy', xmFinalHeaderGalaxy, 'string libE0EAE146_gf_CommanderAchUnit (string lp_field);');
requireContains('XMFinal LibE0EAE146_h.galaxy', xmFinalHeaderGalaxy, 'bool libE0EAE146_gv_abathurRebornRuntimeInitialized;');
requireContains('XMFinal LibE0EAE146_h.galaxy', xmFinalHeaderGalaxy, 'void libE0EAE146_gf_AbathurRebornRuntimeInit (int lp_player, point lp_heroPoint, bool lp_createHero);');

const xmFinalAbathurRebornRuntimeGalaxy = readText(files.xmFinalAbathurRebornRuntimeGalaxy);
requireContains('XMFinal LibE0EAE146_AbathurRebornRuntime.galaxy', xmFinalAbathurRebornRuntimeGalaxy, 'void libE0EAE146_gf_AbathurRebornRuntimeInit');
requireContains('XMFinal LibE0EAE146_AbathurRebornRuntime.galaxy', xmFinalAbathurRebornRuntimeGalaxy, '"CoopCasterAbathurReborn"');
requireContains('XMFinal LibE0EAE146_AbathurRebornRuntime.galaxy', xmFinalAbathurRebornRuntimeGalaxy, 'lib67C0F0E7_gf_CU_GPInit(lp_player, "AbathurReborn"');
requireContains('XMFinal LibE0EAE146_AbathurRebornRuntime.galaxy', xmFinalAbathurRebornRuntimeGalaxy, '"CommanderLevel", 16');
requireContains('XMFinal LibE0EAE146_AbathurRebornRuntime.galaxy', xmFinalAbathurRebornRuntimeGalaxy, '"AbathurRebornCommander", 1');
requireContains('XMFinal LibE0EAE146_AbathurRebornRuntime.galaxy', xmFinalAbathurRebornRuntimeGalaxy, 'TechTreeUnitAllow(lp_player, "NydusNetwork", false);');
requireContains('XMFinal LibE0EAE146_AbathurRebornRuntime.galaxy', xmFinalAbathurRebornRuntimeGalaxy, 'AbilityCommand("RavagerCorrosiveBile", 0)');
if (/InitializeAbathurBiomass|BiomassPickup|AbathurRebornCollectBiomass/.test(xmFinalAbathurRebornRuntimeGalaxy)) {
  errors.push('XMFinal LibE0EAE146_AbathurRebornRuntime.galaxy: AbathurReborn runtime must not initialize biomass');
}

const xmFinalRuntimeSafetyGalaxy = readText(files.xmFinalRuntimeSafetyGalaxy);
requireContains('XMFinal LibE0EAE146_RuntimeSafety.galaxy', xmFinalRuntimeSafetyGalaxy, 'void libE0EAE146_gf_SeedDefaultCommanderBankIfEmpty');
requireContains('XMFinal LibE0EAE146_RuntimeSafety.galaxy', xmFinalRuntimeSafetyGalaxy, 'BankValueSetFromString(BankLastCreated(), "Ach", "Commander", lp_defaultCommander);');
requireContains('XMFinal LibE0EAE146_RuntimeSafety.galaxy', xmFinalRuntimeSafetyGalaxy, 'string libE0EAE146_gf_CommanderAchUnit');
requireContains('XMFinal LibE0EAE146_RuntimeSafety.galaxy', xmFinalRuntimeSafetyGalaxy, 'return "HatcheryAbathurReborn";');
requireContains('XMFinal LibE0EAE146_RuntimeSafety.galaxy', xmFinalRuntimeSafetyGalaxy, 'return "DroneAbathurReborn";');
requireContains('XMFinal LibE0EAE146_RuntimeSafety.galaxy', xmFinalRuntimeSafetyGalaxy, 'return "OverlordAbathurReborn";');

const xmFinalZeratulRuntimeGalaxy = readText(files.xmFinalZeratulRuntimeGalaxy);
requireContains('XMFinal LibE0EAE146_ZeratulRuntime.galaxy', xmFinalZeratulRuntimeGalaxy, 'AbilityCommand("ProphecyVision", 0)');
requireContains('XMFinal LibE0EAE146_ZeratulRuntime.galaxy', xmFinalZeratulRuntimeGalaxy, 'AbilityCommand("ProphecyVisiontzeratul01", 0)');

const xmFinalAbilData = readText(files.xmFinalAbilData);
requireContains('XMFinal AbilData.xml', xmFinalAbilData, '<CAbilEffectInstant id="ProphecyVision">');
requireContains('XMFinal AbilData.xml', xmFinalAbilData, '<Effect index="0" value="ProphecyVision"/>');
requireContains('XMFinal AbilData.xml', xmFinalAbilData, '<CAbilEffectInstant id="ProphecyVisiontzeratul01">');
requireContains('XMFinal AbilData.xml', xmFinalAbilData, '<Effect index="0" value="ProphecyVisiontzeratul01"/>');

const xmFinalBehaviorData = readText(files.xmFinalBehaviorData);
requireContains('XMFinal BehaviorData.xml', xmFinalBehaviorData, '<CBehaviorBuff id="ProphecyArtifactHide">');
requireContains('XMFinal BehaviorData.xml', xmFinalBehaviorData, '<StateFlags index="NoDraw" value="1"/>');

const xmFinalButtonData = readText(files.xmFinalButtonData);
requireContains('XMFinal ButtonData.xml', xmFinalButtonData, '<CButton id="ProphecyVision">');
requireContains('XMFinal ButtonData.xml', xmFinalButtonData, '<CButton id="ProphecyVisiontzeratul01">');

const xmFinalEffectData = readText(files.xmFinalEffectData);
requireContains('XMFinal EffectData.xml', xmFinalEffectData, '<CEffectCreatePersistent id="ProphecyVision">');
requireContains('XMFinal EffectData.xml', xmFinalEffectData, '<CEffectCreatePersistent id="ProphecyVisiontzeratul01">');
requireContains('XMFinal EffectData.xml', xmFinalEffectData, '<CEffectModifyUnit id="BiomassPickupDummy"');

const xmFinalActorData = readText(files.xmFinalActorData);
requireContains('XMFinal ActorData.xml', xmFinalActorData, 'Effect.ProphecyVision.Start');
requireContains('XMFinal ActorData.xml', xmFinalActorData, 'Effect.ProphecyVisiontzeratul01.Start');
requireContains('XMFinal ActorData.xml', xmFinalActorData, 'Abil.ProphecyVision.SourceChannelStart');
requireContains('XMFinal ActorData.xml', xmFinalActorData, 'Abil.ProphecyVisiontzeratul01.SourceChannelStart');

const effectiveRoots = collectDependencyRoots(mapRoot);
const effectiveCatalog = catalogIdsForGameDataDirs(gameDataDirsForRoots(effectiveRoots));
requireRuntimeEventRefsResolvable(
  'ttosh03b/XMFinal runtime event catalog',
  [files.mapScript, ...findGalaxyFiles(xmFinalBaseData)],
  effectiveCatalog,
);

if (errors.length > 0) {
  console.error('FAIL: ttosh03b 重生阿巴瑟初始化校验失败');
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(`PASS: ttosh03b 重生阿巴瑟初始化校验通过 map_dependencies=${headerDependencies.length} xmfinal_dependencies=${xmFinalDependencies.length}`);
