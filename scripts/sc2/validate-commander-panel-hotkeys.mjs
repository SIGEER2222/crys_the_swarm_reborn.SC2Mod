import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const xmFinalRoot = path.join(repoRoot, '合作指挥官版起义狂潮', 'Mods', 'XM', 'XMFinal.SC2Mod');
const panelPath = path.join(xmFinalRoot, 'Base.SC2Data', 'LibE0EAE146_CommanderPanels.galaxy');
const runtimePath = path.join(xmFinalRoot, 'Base.SC2Data', 'LibE0EAE146.galaxy');
const documentInfoPath = path.join(xmFinalRoot, 'DocumentInfo');
const hotkeyPath = path.join(xmFinalRoot, 'zhCN.SC2Data', 'LocalizedData', 'GameHotkeys.txt');

const expectedCommanders = [
  'Abathur',
  'Alarak',
  'Artanis',
  'Dehaka',
  'Fenix',
  'Horner',
  'Karax',
  'Kerrigan',
  'Mengsk',
  'Nova',
  'Raynor',
  'Stetmann',
  'Stukov',
  'Swann',
  'Tychus',
  'Vorazun',
  'Zagara',
  'Zeratul',
];

const commanderDependencies = {
  Abathur: 'file:Mods\\XM\\XMAbathur.SC2Mod',
  Alarak: 'file:Mods\\XM\\XMAlarak.SC2Mod',
  Artanis: 'file:Mods\\XM\\XMArtanis.SC2Mod',
  Dehaka: 'file:Mods\\XM\\XMDehaka.SC2Mod',
  Fenix: 'file:Mods\\XM\\XMFenix.SC2Mod',
  Horner: 'file:Mods\\XM\\XMMira.SC2Mod',
  Karax: 'file:Mods\\XM\\XMKarax.SC2Mod',
  Kerrigan: 'file:Mods\\XM\\XMKerrigan.SC2Mod',
  Mengsk: 'file:Mods\\XM\\XMMengsk.SC2Mod',
  Nova: 'file:Mods\\XM\\XMNova.SC2Mod',
  Raynor: 'file:Mods\\XM\\XMRaynor.SC2Mod',
  Stetmann: 'file:Mods\\XM\\XMStetmann.SC2Mod',
  Stukov: 'file:Mods\\XM\\XMStukov.SC2Mod',
  Swann: 'file:Mods\\XM\\XMSwann.SC2Mod',
  Tychus: 'file:Mods\\XM\\XMTychus.SC2Mod',
  Vorazun: 'file:Mods\\XM\\XMVorazun.SC2Mod',
  Zagara: 'file:Mods\\XM\\XMZagara.SC2Mod',
  Zeratul: 'file:Mods\\XM\\XMZeratul.SC2Mod',
};

function readText(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function parsePanelProfiles(text) {
  const profiles = [];
  const callPattern = /CheckPanelProfile\([^,]+,\s*"([^"]+)",\s*"([^"]+)",\s*"([^"]+)",\s*"([^"]+)",\s*"([^"]*)",\s*"([^"]+)",\s*"([^"]+)",\s*"([^"]+)"/g;
  let match;

  while ((match = callPattern.exec(text)) !== null) {
    profiles.push({
      commander: match[1],
      panel: match[2],
      ability: match[3],
      button: match[4],
      requirement: match[5],
      caster: match[6],
      mode: match[7],
      note: match[8],
    });
  }

  const seen = new Set();
  return profiles.filter((profile) => {
    const key = [
      profile.commander,
      profile.panel,
      profile.ability,
      profile.button,
      profile.requirement,
      profile.caster,
      profile.mode,
    ].join('\t');
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

function parseHotkeys(text) {
  const hotkeys = new Map();
  const duplicateDefinitions = [];

  for (const [index, line] of text.split(/\r?\n/).entries()) {
    const match = line.match(/^Button\/Hotkey\/([^=]+)=([^\s/]+)/);
    if (!match) {
      continue;
    }

    const [, button, key] = match;
    if (hotkeys.has(button) && hotkeys.get(button).key !== key) {
      duplicateDefinitions.push({
        button,
        firstKey: hotkeys.get(button).key,
        secondKey: key,
        line: index + 1,
      });
    }
    hotkeys.set(button, { key, line: index + 1 });
  }

  return { hotkeys, duplicateDefinitions };
}

function groupBy(values, getKey) {
  const groups = new Map();
  for (const value of values) {
    const key = getKey(value);
    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key).push(value);
  }
  return groups;
}

function stripXmlComments(text) {
  return text.replace(/<!--[\s\S]*?-->/g, '');
}

function findCommanderHotkeyConflicts(profiles, hotkeys) {
  const conflicts = [];

  for (const [commander, commanderProfiles] of groupBy(profiles, (profile) => profile.commander)) {
    const uniqueButtons = [...new Map(commanderProfiles.map((profile) => [profile.button, profile])).values()];
    const byKey = groupBy(
      uniqueButtons
        .map((profile) => ({ ...profile, key: hotkeys.get(profile.button)?.key || '' }))
        .filter((profile) => profile.key !== ''),
      (profile) => profile.key,
    );

    for (const [key, keyedProfiles] of byKey) {
      const buttons = [...new Set(keyedProfiles.map((profile) => profile.button))];
      if (buttons.length > 1) {
        conflicts.push({
          commander,
          key,
          buttons,
          panels: keyedProfiles.map((profile) => profile.panel),
        });
      }
    }
  }

  return conflicts;
}

function findDispatchIssues(panelText, runtimeText, profiles) {
  const commanders = [...new Set(profiles.map((profile) => profile.commander))].sort();
  return commanders
    .map((commander) => {
      const smokeFunction = `XMTestBench_${commander}PanelCostSmoke`;
      const hasSmokeFunction = panelText.includes(smokeFunction);
      const hasDispatch = new RegExp(`lv_commander\\s*==\\s*"${commander}"`).test(panelText)
        && panelText.includes(`XMTestBench_${commander}PanelCostSmoke`);
      const hasRuntimeInit = runtimeText.includes(`"${commander}"`)
        && (runtimeText.includes(`CU_GPInit(1, "${commander}"`)
          || runtimeText.includes(`${commander}RuntimeInit(1,`));

      return {
        commander,
        hasSmokeFunction,
        hasDispatch,
        hasRuntimeInit,
      };
    })
    .filter((entry) => !entry.hasSmokeFunction || !entry.hasDispatch || !entry.hasRuntimeInit);
}

const panelText = readText(panelPath);
const runtimeText = readText(runtimePath);
const activeDocumentInfoText = stripXmlComments(readText(documentInfoPath));
const hotkeyText = readText(hotkeyPath);
const profiles = parsePanelProfiles(panelText);
const { hotkeys, duplicateDefinitions } = parseHotkeys(hotkeyText);

const commanders = [...new Set(profiles.map((profile) => profile.commander))].sort();
const buttons = [...new Set(profiles.map((profile) => profile.button))].sort();
const missingExpectedCommanders = expectedCommanders.filter((commander) => !commanders.includes(commander));
const missingHotkeys = buttons.filter((button) => !hotkeys.has(button));
const commanderHotkeyConflicts = findCommanderHotkeyConflicts(profiles, hotkeys);
const dispatchIssues = findDispatchIssues(panelText, runtimeText, profiles);
const missingDocumentInfoDependencies = commanders
  .map((commander) => ({
    commander,
    dependency: commanderDependencies[commander],
  }))
  .filter((entry) => entry.dependency && !activeDocumentInfoText.includes(entry.dependency));

const report = {
  profile_count: profiles.length,
  commander_count: commanders.length,
  commanders,
  panel_button_count: buttons.length,
  missing_expected_commanders: missingExpectedCommanders,
  missing_hotkeys: missingHotkeys,
  duplicate_hotkey_definitions: duplicateDefinitions,
  commander_hotkey_conflicts: commanderHotkeyConflicts,
  dispatch_issues: dispatchIssues,
  missing_document_info_dependencies: missingDocumentInfoDependencies,
};

console.log(JSON.stringify(report, null, 2));

const failed = missingExpectedCommanders.length > 0
  || missingHotkeys.length > 0
  || duplicateDefinitions.length > 0
  || commanderHotkeyConflicts.length > 0
  || dispatchIssues.length > 0
  || missingDocumentInfoDependencies.length > 0;

if (failed) {
  process.exitCode = 1;
}
