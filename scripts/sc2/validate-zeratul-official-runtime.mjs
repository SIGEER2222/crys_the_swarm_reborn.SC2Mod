import fs from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();

const officialCommanderDir = path.join(repoRoot, '游戏数据', '官方合作指挥官', 'commanders', 'Zeratul');
const officialRawDir = path.join(
  repoRoot,
  '游戏数据',
  '官方SC2原始文本镜像',
  'mods',
  'starcoop',
  'starcoop.sc2mod',
  'base.sc2data',
  'gamedata',
);
const xmZeratulBase = path.join(
  repoRoot,
  '合作指挥官版起义狂潮',
  'Mods',
  'XM',
  'XMZeratul.SC2Mod',
  'Base.SC2Data',
);
const xmFinalBase = path.join(
  repoRoot,
  '合作指挥官版起义狂潮',
  'Mods',
  'XM',
  'XMFinal.SC2Mod',
  'Base.SC2Data',
);

const failures = [];

function readText(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function readJson(filePath) {
  return JSON.parse(readText(filePath));
}

function fail(message) {
  failures.push(message);
}

function extractXmlBlock(text, tagName, id) {
  const pattern = new RegExp(`<${tagName}[^>]*\\bid="${id}"[\\s\\S]*?<\\/${tagName}>`);
  return text.match(pattern)?.[0] ?? '';
}

function extractUserInstance(text, cuserId, instanceId) {
  const cuser = [...text.matchAll(/<CUser\s+([^>]*)>([\s\S]*?)<\/CUser>/g)].find(
    (match) => match[1].includes(`id="${cuserId}"`) || match[1].includes(`Type="${cuserId}"`),
  );
  return cuser?.[2].match(new RegExp(`<Instances Id="${instanceId}">[\\s\\S]*?<\\/Instances>`))?.[0] ?? '';
}

function requireIncludes(label, text, needle) {
  if (!text.includes(needle)) {
    fail(`${label} missing: ${needle}`);
  }
}

function requireNotMatches(label, text, pattern, message) {
  if (pattern.test(text)) {
    fail(`${label}: ${message}`);
  }
}

function extractBalancedBlock(text, startNeedle) {
  const start = text.indexOf(startNeedle);
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

const officialCommander = readJson(path.join(officialCommanderDir, 'commander.json'));
const officialUnits = readJson(path.join(officialCommanderDir, 'units.json'));
const officialFutureCommanders = readText(path.join(officialRawDir, 'commanders', 'futurecommanders.xml'));
const officialUserData = readText(path.join(officialRawDir, 'userdata.xml'));
const modFutureCommanders = readText(path.join(xmZeratulBase, 'GameData', 'commanders', 'futurecommanders.xml'));
const modUserData = readText(path.join(xmZeratulBase, 'GameData', 'UserData.xml'));
const xmFinalUserData = readText(path.join(xmFinalBase, 'GameData', 'UserData.xml'));
const xmFinalRuntime = readText(path.join(xmFinalBase, 'LibE0EAE146_ZeratulRuntime.galaxy'));
const xmFinalRosters = readText(path.join(xmFinalBase, 'LibE0EAE146_CommanderRosters.galaxy'));
const xmFinalUnitAbilities = readText(path.join(xmFinalBase, 'LibE0EAE146_CommanderUnitAbilities.galaxy'));
const xmFinalTestBenchCore = readText(path.join(xmFinalBase, 'LibE0EAE146_TestBenchCore.galaxy'));
const zeratulCargoBranch = extractBalancedBlock(xmFinalTestBenchCore, 'if (lv_commander == "Zeratul")');

for (const upgrade of ['ZeratulCommander', 'SOAAutoAssimilator', 'ZeratulTopBarZealotSquad', 'ZeratulTopBarVoidRaySquad']) {
  if (!officialCommander.default_upgrades.includes(upgrade)) {
    fail(`official Zeratul commander default_upgrades missing ${upgrade}`);
  }
}

for (const abilityCommand of [
  { abil: 'ZeratulBuild', cmd: '1' },
  { abil: 'NexusBuild', cmd: '' },
]) {
  if (
    !officialCommander.default_ability_commands.some(
      (entry) => entry.abil === abilityCommand.abil && entry.cmd === abilityCommand.cmd,
    )
  ) {
    fail(`official Zeratul commander default_ability_commands missing ${abilityCommand.abil}:${abilityCommand.cmd}`);
  }
}

const officialCommanderBlock = extractUserInstance(officialUserData, 'PlayerCommanders', 'ProtossZeratul');
for (const needle of [
  '<GameLink GameLink="ZeratulCoop">',
  '<GameLink GameLink="ZeratulACArtifact">',
  '<GameLink GameLink="ZeratulCoopReviveBeacon">',
  '<GameLink GameLink="CoopCasterZeratul">',
]) {
  requireIncludes('official PlayerCommanders/ProtossZeratul', officialCommanderBlock, needle);
}

const officialUnitIds = new Set(officialUnits.map((unit) => unit.unit_id));
if (officialUnitIds.has('ZeratulDarkTemplar')) {
  fail('official units.json unexpectedly lists ZeratulDarkTemplar; update the JSON-gap classification');
}

const officialGatewayTrain = extractXmlBlock(officialFutureCommanders, 'CAbilTrain', 'ZeratulGatewayTrain');
for (const needle of [
  '<InfoArray index="Train2" Time="42">',
  '<Unit value="ZeratulStalker"/>',
  '<InfoArray index="Train5" Time="42">',
  '<Button DefaultButtonFace="DarkTemplarZeratul" Requirements="HaveZeratulDarkShrine"/>',
  '<Unit value="ZeratulDarkTemplar"/>',
  '<InfoArray index="Train6" Time="37">',
  '<Unit value="ZeratulSentry"/>',
]) {
  requireIncludes('official raw ZeratulGatewayTrain', officialGatewayTrain, needle);
}

const officialDarkTemplar = extractXmlBlock(officialFutureCommanders, 'CUnit', 'ZeratulDarkTemplar');
for (const needle of [
  '<AbilArray Link="ZeratulDarkTemplarBlink"/>',
  '<WeaponArray Link="ZeratulDarkTemplarWarpBlades"/>',
  '<LayoutButtons Face="ZeratulDarkTemplarBlink" Type="AbilCmd" AbilCmd="ZeratulDarkTemplarBlink,Execute"',
  '<LayoutButtons Face="ZeratulDarkTemplarBlinkPassive" Type="Passive" Requirements="HaveZeratulArtifactTier1AndDarkShine"',
  '<LayoutButtons Face="ZeratulDarkTemplarShadowStrike" Type="Passive" Requirements="HaveZeratulArtifactTier2AndDarkShine"',
]) {
  requireIncludes('official raw ZeratulDarkTemplar', officialDarkTemplar, needle);
}

const officialHero = extractXmlBlock(officialFutureCommanders, 'CUnit', 'ZeratulCoop');
for (const ability of ['ZeratulBlink', 'ZeratulShadowCleave', 'ZeratulTeleport', 'ProphecyVision', 'CommanderPrestigeZeratulVoidSeeker']) {
  requireIncludes('official raw ZeratulCoop', officialHero, `<AbilArray Link="${ability}"/>`);
}

const commanderAch = extractUserInstance(modUserData, 'CommanderAch', 'Zeratul');
for (const unit of ['NexusZeratul', 'VoidPylon', 'ProbeZeratul']) {
  requireIncludes('XMZeratul CommanderAch/Zeratul', commanderAch, `Unit="${unit}"`);
}

const modGatewayTrain = extractXmlBlock(modFutureCommanders, 'CAbilTrain', 'ZeratulGatewayTrain');
for (const unit of ['ZeratulStalker', 'ZeratulDarkTemplar', 'ZeratulSentry']) {
  requireIncludes('XMZeratul ZeratulGatewayTrain', modGatewayTrain, `<Unit value="${unit}"`);
}

const runtimeRoster = extractUserInstance(xmFinalUserData, 'CommanderRuntimeRoster', 'Zeratul');
for (const unit of ['ZeratulObserver', 'ZeratulObserverSiegeMode', 'ZeratulWarpPrismPhasing', 'ZeratulDarkTemplar']) {
  requireIncludes('XMFinal CommanderRuntimeRoster/Zeratul', runtimeRoster, `Unit="${unit}"`);
}
requireIncludes('XMFinal CommanderRuntimeRoster/Zeratul', runtimeRoster, '<Int Int="14"><Field Id="Count"/></Int>');
requireNotMatches(
  'XMFinal CommanderRuntimeRoster/Zeratul',
  runtimeRoster,
  /<Unit Unit="Observer"><Field Id="RuntimeUnit"/,
  'generic Observer must not be a positive Zeratul runtime unit',
);

for (const needle of [
  'libE0EAE146_gf_CreateCommanderHeroStructure(lp_player, "Zeratul");',
  '"ZeratulCoop"',
  'AbilityCommand("ProphecyVision", 0)',
  'AbilityCommand("ProphecyVisiontzeratul01", 0)',
]) {
  requireIncludes('XMFinal Zeratul runtime', xmFinalRuntime, needle);
}

for (const unit of ['ZeratulDarkTemplar', 'ZeratulObserverSiegeMode', 'ZeratulWarpPrismPhasing']) {
  requireIncludes('XMFinal Zeratul roster smoke', xmFinalRosters, `"${unit}"`);
}
for (const needle of ['"ZeratulDarkTemplar"', '"ZeratulDarkTemplarBlink"', '"ZeratulDarkTemplarRetreat"']) {
  requireIncludes('XMFinal Zeratul unit ability smoke', xmFinalUnitAbilities, needle);
}

requireNotMatches(
  'XMFinal Zeratul cargo smoke',
  zeratulCargoBranch,
  /CreateCargoUnit\(lp_player,\s*lp_container,\s*"Observer"/,
  'generic Observer must not be spawned for Zeratul cargo smoke',
);
requireIncludes('XMFinal Zeratul cargo smoke', zeratulCargoBranch, 'lv_commander == "Zeratul"');
requireIncludes('XMFinal Zeratul cargo smoke', zeratulCargoBranch, '"ZeratulDarkTemplar"');

if (failures.length > 0) {
  console.error('Zeratul official/runtime validation failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('Zeratul official/runtime validation passed');
