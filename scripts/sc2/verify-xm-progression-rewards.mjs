import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const files = {
  main: path.join(root, '原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146.galaxy'),
  header: path.join(root, '原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146_h.galaxy'),
  rewards: path.join(root, '原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146_ProgressionRewards.galaxy'),
  testbench: path.join(root, '原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146_TestBench.galaxy'),
  map: path.join(root, '原始mod/Maps/XM/CommanderTestBench.SC2Map/MapScript.galaxy'),
};

const required = [
  ['main include', 'main', 'include "LibE0EAE146_ProgressionRewards"'],
  ['init hook', 'main', 'XMProgression_Init(1);'],
  ['base blessing hook', 'main', 'XMBlessing_ApplySelected(1);'],
  ['victory challenge hook', 'main', 'XMChallenge_EvaluateOnVictory(1, lv_map, libE0EAE146_gv_commander);'],
  ['bank section Achievement', 'rewards', '"Achievement"'],
  ['bank section AchievementProgress', 'rewards', '"AchievementProgress"'],
  ['bank section Blessing', 'rewards', '"Blessing"'],
  ['bank section Challenge', 'rewards', '"Challenge"'],
  ['bank section ChallengeBest', 'rewards', '"ChallengeBest"'],
  ['blessing resource', 'rewards', 'BlessingResourceRich'],
  ['blessing golden', 'rewards', 'BlessingGoldenMinerals'],
  ['blessing guardian', 'rewards', 'BlessingGuardianShell'],
  ['blessing repair', 'rewards', 'BlessingPhaseRepair'],
  ['blessing creep', 'rewards', 'BlessingCreepRegeneration'],
  ['challenge resource', 'rewards', 'ChallengeResourceScarce'],
  ['challenge speed', 'rewards', 'ChallengeSpeedClear'],
  ['challenge bonus', 'rewards', 'ChallengeFullBonus'],
  ['challenge no death', 'rewards', 'ChallengeNoHeroDeath'],
  ['repair trigger', 'rewards', 'libE0EAE146_gt_XMProgressionPhaseRepair'],
  ['creep trigger', 'rewards', 'libE0EAE146_gt_XMProgressionCreepRegen'],
  ['header init declaration', 'header', 'void XMProgression_Init'],
  ['header blessing declaration', 'header', 'void XMBlessing_SelectForNextRun'],
  ['header challenge declaration', 'header', 'void XMChallenge_SelectForNextRun'],
  ['summary blessing', 'testbench', ' | Blessing: '],
  ['summary challenge', 'testbench', ' | Challenge: '],
  ['map unlock button', 'map', 'Unlock Rewards'],
  ['map repair button', 'map', 'Bless Repair'],
  ['map creep button', 'map', 'Bless Creep'],
  ['map resource challenge button', 'map', 'Challenge Res'],
  ['map speed challenge button', 'map', 'Challenge Speed'],
  ['map unlock chat', 'map', '-tbrewardunlock'],
  ['map blessing chat', 'map', '-tbblessrepair'],
  ['map challenge chat', 'map', '-tbchallengeres'],
];

const contents = {};
const errors = [];

for (const [name, filePath] of Object.entries(files)) {
  if (!fs.existsSync(filePath)) {
    errors.push(`missing file: ${name} ${filePath}`);
    continue;
  }
  contents[name] = fs.readFileSync(filePath, 'utf8');
}

for (const [label, fileKey, needle] of required) {
  if (!contents[fileKey]?.includes(needle)) {
    errors.push(`missing ${label}: ${needle}`);
  }
}

if (contents.rewards) {
  const lineCount = contents.rewards.split(/\r?\n/).length;
  if (lineCount > 1000) {
    errors.push(`reward module too large: ${lineCount} lines`);
  }
}

const pass = errors.length === 0;
console.log(JSON.stringify({
  pass,
  checkedFiles: Object.keys(files).length,
  errors,
}, null, 2));
process.exit(pass ? 0 : 1);
