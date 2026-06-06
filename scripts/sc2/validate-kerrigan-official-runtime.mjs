import fs from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();

const officialUserDataPath = path.join(
  repoRoot,
  '游戏数据',
  '官方SC2原始文本镜像',
  'mods',
  'starcoop',
  'starcoop.sc2mod',
  'base.sc2data',
  'gamedata',
  'userdata.xml',
);

const runtimePath = path.join(
  repoRoot,
  '合作指挥官版起义狂潮',
  'Mods',
  'XM',
  'XMFinal.SC2Mod',
  'Base.SC2Data',
  'LibE0EAE146_KerriganRuntime.galaxy',
);

const unitDataPath = path.join(
  repoRoot,
  '合作指挥官版起义狂潮',
  'Mods',
  'XM',
  'XMKerrigan.SC2Mod',
  'Base.SC2Data',
  'GameData',
  'UnitData.xml',
);

const failures = [];

function readText(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function fail(message) {
  failures.push(message);
}

function extractXmlBlock(text, tagName, id) {
  const pattern = new RegExp(`<${tagName}[^>]*\\b(?:id|Id)="${id}"[\\s\\S]*?<\\/${tagName}>`);
  const match = text.match(pattern);
  return match?.[0] ?? '';
}

// These IDs are valid raw/campaign Catalog data. This guard only prevents them
// from being treated as current coop Kerrigan positives without a commander grant.
const campaignSourceUngraftedUpgrades = [
  'K5Apocalypse',
  'K5DropPods',
  'K5Leviathan',
  'K5Mend',
  'K5SpawnBanelings',
  'K5WildMutation',
  'K5ZerglingRespawn',
  'KerriganVoidCoopMend',
  'KerriganVoidCoopWildMutationUpgrade',
];

const campaignSourceUngraftedAbilities = [
  'Apocalypse',
  'K5DropPods',
  'K5Leviathan',
  'PrimalHeal',
  'SpawnBanelings',
  'WildMutation',
];

const officialUserData = readText(officialUserDataPath);
const officialKerriganBlock = extractXmlBlock(officialUserData, 'Instances', 'ZergKerrigan');

if (!officialKerriganBlock) {
  fail('official PlayerCommanders/ZergKerrigan block not found');
}

for (const upgrade of ['KerriganCommander', 'K5PrimalSlash', 'K5PsiStrike']) {
  if (!officialKerriganBlock.includes(`<Upgrade Upgrade="${upgrade}"`)) {
    fail(`official Kerrigan default upgrade missing: ${upgrade}`);
  }
}

for (const upgrade of campaignSourceUngraftedUpgrades) {
  if (officialKerriganBlock.includes(`<Upgrade Upgrade="${upgrade}"`)) {
    fail(`official Kerrigan default upgrades now grant a previously unclassified campaign-source upgrade; reclassify before using it: ${upgrade}`);
  }
}

const runtime = readText(runtimePath);

for (const upgrade of campaignSourceUngraftedUpgrades) {
  if (runtime.includes(`KerriganSetUpgradeAtLeast(lp_player, "${upgrade}"`)) {
    fail(`runtime grants campaign-source upgrade without current coop Kerrigan classification: ${upgrade}`);
  }
}

for (const ability of campaignSourceUngraftedAbilities) {
  if (runtime.includes(`KerriganAllowAbilityIfPresent(lp_player, "${ability}"`)) {
    fail(`runtime allows campaign-source ability without current coop Kerrigan classification: ${ability}`);
  }
}

for (const ability of [
  'PrimalSlash',
  'PsiStrikeWalk',
  'KerriganVoidCoopCrushingGripWave',
  'KerriganVoidCoopEconDrop',
  'K5KerriganBurrow',
  'K5KerriganUnburrow',
]) {
  if (!runtime.includes(`KerriganAllowAbilityIfPresent(lp_player, "${ability}"`)) {
    fail(`runtime missing expected coop Kerrigan ability allow: ${ability}`);
  }
}

const unitData = readText(unitDataPath);
const heroUnitIds = ['K5Kerrigan', 'K5KerriganBurrowed', 'K5KerriganPsiStrike'];

for (const unitId of heroUnitIds) {
  const block = extractXmlBlock(unitData, 'CUnit', unitId);
  if (!block) {
    fail(`Kerrigan hero unit block missing: ${unitId}`);
    continue;
  }

  for (const ability of campaignSourceUngraftedAbilities) {
    if (block.includes(`Face="${ability}"`) || block.includes(`value="${ability}"`) || block.includes(`Link="${ability}"`)) {
      fail(`${unitId} still references campaign-source ability without current coop Kerrigan classification: ${ability}`);
    }
  }

  if (block.includes('Face="K5ZerglingRespawn"')) {
    fail(`${unitId} still exposes campaign card residue: K5ZerglingRespawn`);
  }
}

const mainHero = extractXmlBlock(unitData, 'CUnit', 'K5Kerrigan');
for (const expected of [
  'AbilCmd="PrimalSlash,Execute"',
  'AbilCmd="PsiStrikeWalk,Execute"',
  'KerriganVoidCoopCrushingGripWave,Execute',
  'AbilCmd="KerriganVoidCoopEconDrop,Execute"',
  'AbilCmd="K5KerriganBurrow,Execute"',
]) {
  if (!mainHero.includes(expected)) {
    fail(`K5Kerrigan missing expected coop command card entry: ${expected}`);
  }
}

if (failures.length > 0) {
  console.error('Kerrigan official runtime validation failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('Kerrigan official runtime validation passed');
