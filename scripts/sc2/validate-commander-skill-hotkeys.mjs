import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const xmRoot = path.join(repoRoot, '合作指挥官版起义狂潮', 'Mods', 'XM');
const xmFinalRoot = path.join(xmRoot, 'XMFinal.SC2Mod');
const xmFinalBase = path.join(xmFinalRoot, 'Base.SC2Data');
const officialRoot = path.join(repoRoot, '游戏数据', '官方SC2原始文本镜像');

const documentInfoPath = path.join(xmFinalRoot, 'DocumentInfo');
const documentHeaderPath = path.join(xmFinalRoot, 'DocumentHeader');
const runtimeRosterPath = path.join(xmFinalBase, 'GameData', 'UserData.xml');
const abilityProfilePaths = [
  path.join(xmFinalBase, 'LibE0EAE146_CommanderHeroAbilities.galaxy'),
  path.join(xmFinalBase, 'LibE0EAE146_CommanderUnitAbilities.galaxy'),
];

const targetCommanders = new Set([
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
]);

const standardFaces = new Set([
  'Attack',
  'Cancel',
  'CancelBuilding',
  'CancelLast',
  'CancelSlot',
  'HoldPosition',
  'Move',
  'MoveHoldPosition',
  'MovePatrol',
  'Patrol',
  'Rally',
  'RallyEgg',
  'RallyHatchery',
  'RallyNydus',
  'RallyWorker',
  'Stop',
]);

const standardAbilityIds = new Set([
  'attack',
  'Attack',
  'move',
  'Move',
  'Queue',
  'Rally',
  'stop',
  'Stop',
]);

function readText(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function readTextIfExists(filePath) {
  if (!fs.existsSync(filePath)) {
    return '';
  }
  return readText(filePath);
}

function stripXmlComments(text) {
  return text.replace(/<!--[\s\S]*?-->/g, '');
}

function normalizePath(filePath) {
  return filePath.replaceAll('\\', '/').toLowerCase();
}

function relativePath(filePath) {
  return path.relative(repoRoot, filePath).replaceAll('\\', '/');
}

function xmModuleNameFromPath(filePath) {
  const relative = relativePath(filePath);
  const match = relative.match(/合作指挥官版起义狂潮\/Mods\/XM\/([^/]+\.SC2Mod)\//);
  return match?.[1] || '';
}

function parseAttributes(text) {
  const attrs = {};
  for (const match of text.matchAll(/([A-Za-z0-9_:-]+)\s*=\s*"([^"]*)"/g)) {
    attrs[match[1]] = match[2];
  }
  return attrs;
}

function childValue(body, tagName) {
  const match = body.match(new RegExp(`<${escapeRegExp(tagName)}\\b[^>]*\\bvalue="([^"]*)"`, 'i'));
  return match?.[1] || '';
}

function childFieldValue(body, valueTag, valueAttr, fieldId) {
  const pattern = new RegExp(
    `<${escapeRegExp(valueTag)}\\b[^>]*\\b${escapeRegExp(valueAttr)}="([^"]+)"[^>]*>\\s*<Field\\b[^>]*\\bId="${escapeRegExp(fieldId)}"[^>]*/?>\\s*</${escapeRegExp(valueTag)}>`,
    'i',
  );
  return body.match(pattern)?.[1] || '';
}

function addToMapArray(map, key, value) {
  if (!map.has(key)) {
    map.set(key, []);
  }
  map.get(key).push(value);
}

function findFiles(root, predicate) {
  const files = [];
  if (!fs.existsSync(root)) {
    return files;
  }

  const stack = [root];
  while (stack.length > 0) {
    const current = stack.pop();
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(fullPath);
      } else if (entry.isFile() && predicate(fullPath)) {
        files.push(fullPath);
      }
    }
  }

  return files.sort((left, right) => normalizePath(left).localeCompare(normalizePath(right)));
}

function parseLoadedXmModules() {
  const modules = new Set(['XMFinal.SC2Mod']);
  const combinedText = `${readTextIfExists(documentInfoPath)}\n${readTextIfExists(documentHeaderPath)}`;

  for (const match of combinedText.matchAll(/file:Mods[\\/]+XM[\\/]+([^<\0\r\n,]+?\.SC2Mod)/g)) {
    modules.add(match[1]);
  }

  return modules;
}

function filesForLoadedModules(loadedModules, fileName) {
  const lowerFileName = fileName.toLowerCase();
  const files = [];

  for (const moduleName of loadedModules) {
    const moduleRoot = path.join(xmRoot, moduleName);
    files.push(...findFiles(moduleRoot, (filePath) => path.basename(filePath).toLowerCase() === lowerFileName));
  }

  return [...new Set(files)].sort((left, right) => normalizePath(left).localeCompare(normalizePath(right)));
}

function hotkeyRank(filePath) {
  const normalized = normalizePath(filePath);
  const sourceRank = normalized.includes('/mods/starcoop/starcoop.sc2mod/')
    ? 0
    : normalized.includes('/campaigns/swarm.sc2campaign/')
      ? 1
      : normalized.includes('/campaigns/void.sc2campaign/')
        ? 2
        : normalized.includes('/campaigns/libertystory.sc2campaign/')
          ? 3
          : normalized.includes('/mods/liberty.sc2mod/')
            ? 4
            : 9;
  const localeRank = normalized.includes('/zhcn.sc2data/')
    ? 0
    : normalized.includes('/enus.sc2data/')
      ? 1
      : 5;

  return (sourceRank * 10) + localeRank;
}

function parseHotkeyFiles(files, sourceKind) {
  const definitions = new Map();

  for (const filePath of files) {
    const rank = sourceKind === 'official' ? hotkeyRank(filePath) : 0;
    const lines = readText(filePath).split(/\r?\n/);
    for (const [index, line] of lines.entries()) {
      const match = line.match(/^\s*Button\/Hotkey\/([^=]+)=([^\s/]+)/);
      if (!match) {
        continue;
      }

      const [, buttonId, key] = match;
      addToMapArray(definitions, buttonId, {
        buttonId,
        key,
        file: relativePath(filePath),
        line: index + 1,
        rank,
        sourceKind,
      });
    }
  }

  for (const values of definitions.values()) {
    values.sort((left, right) => (left.rank - right.rank) || left.file.localeCompare(right.file) || (left.line - right.line));
  }

  return definitions;
}

function parseButtonDataFiles(files, sourceKind) {
  const buttons = new Map();

  for (const filePath of files) {
    const text = stripXmlComments(readText(filePath));
    const buttonPattern = /<CButton\b([^>]*?)(?:\/>|>([\s\S]*?)<\/CButton>)/g;
    let match;

    while ((match = buttonPattern.exec(text)) !== null) {
      const attrs = parseAttributes(match[1] || '');
      const id = attrs.id;
      if (!id) {
        continue;
      }

      const body = match[2] || '';
      const hotkeyIds = [...body.matchAll(/<Hotkey\b[^>]*\bvalue="Button\/Hotkey\/([^"]+)"/gi)].map((hotkeyMatch) => hotkeyMatch[1]);
      const hotkeyAliases = [...body.matchAll(/<HotkeyAlias\b[^>]*\bvalue="([^"]+)"/gi)].map((aliasMatch) => aliasMatch[1]);

      addToMapArray(buttons, id, {
        id,
        hotkeyIds,
        hotkeyAliases,
        file: relativePath(filePath),
        sourceKind,
      });
    }
  }

  return buttons;
}

function bestHotkey(definitions) {
  return definitions?.[0] || null;
}

function uniqueHotkeyAlternatives(definitions) {
  const seen = new Set();
  const alternatives = [];

  for (const definition of definitions || []) {
    const key = `${definition.key}\t${definition.file}`;
    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    alternatives.push({
      key: definition.key,
      file: definition.file,
      line: definition.line,
    });
  }

  return alternatives;
}

function resolveHotkeyFromButtonDefs(buttonDefs, currentHotkeys, officialHotkeys) {
  for (const buttonDef of buttonDefs || []) {
    const referencedHotkeys = [...buttonDef.hotkeyIds, ...buttonDef.hotkeyAliases];
    for (const referencedHotkey of referencedHotkeys) {
      const currentDefinition = bestHotkey(currentHotkeys.get(referencedHotkey));
      if (currentDefinition) {
        return {
          status: 'current_button_ref_current_key',
          key: currentDefinition.key,
          hotkeyId: referencedHotkey,
          via: buttonDef.file,
          keyFile: currentDefinition.file,
          keyLine: currentDefinition.line,
        };
      }

      const officialDefinition = bestHotkey(officialHotkeys.get(referencedHotkey));
      if (officialDefinition) {
        return {
          status: 'current_button_ref_official_key',
          key: officialDefinition.key,
          hotkeyId: referencedHotkey,
          via: buttonDef.file,
          keyFile: officialDefinition.file,
          keyLine: officialDefinition.line,
        };
      }
    }
  }

  return null;
}

function resolveCurrentBinding(buttonId, currentHotkeys, currentButtons, officialHotkeys) {
  const currentDefinition = bestHotkey(currentHotkeys.get(buttonId));
  if (currentDefinition) {
    return {
      status: 'current_hotkey',
      key: currentDefinition.key,
      hotkeyId: buttonId,
      keyFile: currentDefinition.file,
      keyLine: currentDefinition.line,
    };
  }

  return resolveHotkeyFromButtonDefs(currentButtons.get(buttonId), currentHotkeys, officialHotkeys);
}

function resolveOfficialSuggestion(buttonId, officialHotkeys, officialButtons) {
  const directDefinition = bestHotkey(officialHotkeys.get(buttonId));
  if (directDefinition) {
    return {
      key: directDefinition.key,
      hotkeyId: buttonId,
      file: directDefinition.file,
      line: directDefinition.line,
      alternatives: uniqueHotkeyAlternatives(officialHotkeys.get(buttonId)),
    };
  }

  const buttonDefs = officialButtons.get(buttonId) || [];
  for (const buttonDef of buttonDefs) {
    for (const referencedHotkey of [...buttonDef.hotkeyIds, ...buttonDef.hotkeyAliases]) {
      const referencedDefinition = bestHotkey(officialHotkeys.get(referencedHotkey));
      if (referencedDefinition) {
        return {
          key: referencedDefinition.key,
          hotkeyId: referencedHotkey,
          file: referencedDefinition.file,
          line: referencedDefinition.line,
          via: buttonDef.file,
          alternatives: uniqueHotkeyAlternatives(officialHotkeys.get(referencedHotkey)),
        };
      }
    }
  }

  return null;
}

function parseRuntimeRoster() {
  const text = stripXmlComments(readText(runtimeRosterPath));
  const userMatch = text.match(/<CUser\b[^>]*\bid="CommanderRuntimeRoster"[^>]*>([\s\S]*?)<\/CUser>/);
  if (!userMatch) {
    throw new Error(`CommanderRuntimeRoster not found in ${relativePath(runtimeRosterPath)}`);
  }

  const roster = new Map();
  const instancePattern = /<Instances\b([^>]*)>([\s\S]*?)<\/Instances>/g;
  let match;

  while ((match = instancePattern.exec(userMatch[1])) !== null) {
    const attrs = parseAttributes(match[1]);
    const instanceId = attrs.Id;
    if (!instanceId || instanceId === '[Default]') {
      continue;
    }

    const body = match[2] || '';
    const officialCommander = childFieldValue(body, 'String', 'String', 'OfficialCommander') || instanceId;
    const runtimeCommander = childFieldValue(body, 'String', 'String', 'RuntimeCommander') || instanceId;
    const runtimeModule = childFieldValue(body, 'String', 'String', 'RuntimeModule') || '';
    const units = [...body.matchAll(/<Unit\b[^>]*\bUnit="([^"]+)"[^>]*>\s*<Field\b[^>]*\bId="RuntimeUnit"[^>]*\/?>\s*<\/Unit>/g)]
      .map((unitMatch) => unitMatch[1]);

    roster.set(officialCommander, {
      instanceId,
      officialCommander,
      runtimeCommander,
      runtimeModule,
      units: [...new Set(units)].sort(),
    });
  }

  return roster;
}

function parseLayoutButtons(body) {
  const buttons = [];
  const layoutPattern = /<LayoutButtons\b([^>]*?)(?:\/>|>([\s\S]*?)<\/LayoutButtons>)/g;
  let match;

  while ((match = layoutPattern.exec(body)) !== null) {
    const attrs = parseAttributes(match[1] || '');
    const layoutBody = match[2] || '';
    if (attrs.removed === '1' || attrs.Removed === '1' || attrs.value === '0') {
      continue;
    }

    const face = attrs.Face || childValue(layoutBody, 'Face');
    const type = attrs.Type || childValue(layoutBody, 'Type');
    const abilCmd = attrs.AbilCmd || childValue(layoutBody, 'AbilCmd');
    const row = attrs.Row || childValue(layoutBody, 'Row');
    const column = attrs.Column || childValue(layoutBody, 'Column');

    if (!face && !abilCmd) {
      continue;
    }

    buttons.push({
      face,
      type,
      abilCmd,
      row,
      column,
    });
  }

  return buttons;
}

function parseUnitDataFiles(files) {
  const units = new Map();

  for (const filePath of files) {
    const text = stripXmlComments(readText(filePath));
    const unitPattern = /<CUnit\b([^>]*?)(?:\/>|>([\s\S]*?)<\/CUnit>)/g;
    let match;

    while ((match = unitPattern.exec(text)) !== null) {
      const attrs = parseAttributes(match[1] || '');
      const id = attrs.id;
      if (!id) {
        continue;
      }

      const body = match[2] || '';
      addToMapArray(units, id, {
        id,
        file: relativePath(filePath),
        moduleName: xmModuleNameFromPath(filePath),
        layoutButtons: parseLayoutButtons(body),
      });
    }
  }

  return units;
}

function parseAbilityProfiles() {
  const entries = [];
  const callPattern = /XMTestBench_CheckAbilityProfileEntry\([^,]+,\s*"([^"]+)",\s*[^,]+,\s*"([^"]*)",\s*"([^"]*)",\s*"([^"]*)",\s*"([^"]*)",\s*"([^"]*)"\)/g;

  for (const filePath of abilityProfilePaths) {
    const text = readText(filePath);
    let match;

    while ((match = callPattern.exec(text)) !== null) {
      const [, commander, objectId, buttonId, abilityId, requirementId, entryKind] = match;
      if (!targetCommanders.has(commander)) {
        continue;
      }

      if (!buttonId || !abilityId || !['ability', 'evolution'].includes(entryKind)) {
        continue;
      }

      if (isStandardCommand(buttonId, abilityId, '')) {
        continue;
      }

      entries.push({
        commander,
        objectId,
        buttonId,
        abilityId,
        requirementId,
        entryKind,
        source: 'ability_profile',
        sourceFile: relativePath(filePath),
      });
    }
  }

  return entries;
}

function splitAbilCmd(abilCmd) {
  const [abilityId = '', commandIndex = ''] = (abilCmd || '').split(',');
  return { abilityId, commandIndex };
}

function isStandardCommand(buttonId, abilityId, commandIndex) {
  if (standardFaces.has(buttonId) || standardAbilityIds.has(abilityId)) {
    return true;
  }

  if (/^(Build|Train|Research)/i.test(abilityId) || /^(Build|Train|Research)/i.test(commandIndex)) {
    return true;
  }

  if (/^(Build|Train|Research)/i.test(buttonId)) {
    return true;
  }

  return false;
}

function isCandidateCardButton(button) {
  if (button.type !== 'AbilCmd' || !button.face || !button.abilCmd) {
    return false;
  }

  const { abilityId, commandIndex } = splitAbilCmd(button.abilCmd);
  if (!abilityId || isStandardCommand(button.face, abilityId, commandIndex)) {
    return false;
  }

  if (/Locked$/.test(button.face) || /Locked$/.test(abilityId)) {
    return false;
  }

  return true;
}

function cardEntriesFromRuntimeRoster(roster, unitDefinitions) {
  const entries = [];

  for (const commanderRoster of roster.values()) {
    if (!targetCommanders.has(commanderRoster.officialCommander)) {
      continue;
    }

    for (const unitId of commanderRoster.units) {
      for (const unitDefinition of selectUnitDefinitions(unitDefinitions.get(unitId) || [], commanderRoster.runtimeModule)) {
        for (const button of unitDefinition.layoutButtons.filter(isCandidateCardButton)) {
          const { abilityId } = splitAbilCmd(button.abilCmd);
          entries.push({
            commander: commanderRoster.officialCommander,
            objectId: unitId,
            buttonId: button.face,
            abilityId,
            abilCmd: button.abilCmd,
            entryKind: 'card',
            source: 'runtime_roster_unit_card',
            sourceFile: unitDefinition.file,
            row: button.row,
            column: button.column,
          });
        }
      }
    }
  }

  return entries;
}

function selectUnitDefinitions(definitions, runtimeModule) {
  const runtimeDefinitions = definitions.filter((definition) => definition.moduleName === runtimeModule);
  if (runtimeDefinitions.length > 0) {
    return runtimeDefinitions;
  }

  const xmFinalDefinitions = definitions.filter((definition) => definition.moduleName === 'XMFinal.SC2Mod');
  if (xmFinalDefinitions.length > 0) {
    return xmFinalDefinitions;
  }

  return definitions;
}

function mergeEntries(entries) {
  const merged = new Map();

  for (const entry of entries) {
    const key = `${entry.commander}\t${entry.objectId}\t${entry.buttonId}\t${entry.abilityId}`;
    if (!merged.has(key)) {
      merged.set(key, {
        commander: entry.commander,
        objectId: entry.objectId,
        buttonId: entry.buttonId,
        abilityId: entry.abilityId,
        entryKinds: new Set(),
        sources: [],
      });
    }

    const existing = merged.get(key);
    existing.entryKinds.add(entry.entryKind);
    existing.sources.push({
      source: entry.source,
      file: entry.sourceFile,
      abilCmd: entry.abilCmd,
      row: entry.row,
      column: entry.column,
    });
  }

  return [...merged.values()].map((entry) => ({
    ...entry,
    entryKinds: [...entry.entryKinds].sort(),
    sources: entry.sources,
  })).sort((left, right) => (
    left.commander.localeCompare(right.commander)
    || left.objectId.localeCompare(right.objectId)
    || left.buttonId.localeCompare(right.buttonId)
    || left.abilityId.localeCompare(right.abilityId)
  ));
}

function findCurrentHotkeyDuplicateConflicts(currentHotkeys) {
  const conflicts = [];

  for (const [buttonId, definitions] of currentHotkeys) {
    const keys = [...new Set(definitions.map((definition) => definition.key))];
    if (keys.length > 1) {
      conflicts.push({
        buttonId,
        definitions: definitions.map((definition) => ({
          key: definition.key,
          file: definition.file,
          line: definition.line,
        })),
      });
    }
  }

  return conflicts.sort((left, right) => left.buttonId.localeCompare(right.buttonId));
}

function findCommanderObjectConflicts(entriesWithBindings) {
  const grouped = new Map();

  for (const entry of entriesWithBindings) {
    if (!entry.binding?.key) {
      continue;
    }

    const key = `${entry.commander}\t${entry.objectId}\t${entry.binding.key}`;
    addToMapArray(grouped, key, entry);
  }

  const conflicts = [];
  for (const [groupKey, entries] of grouped) {
    const uniqueButtons = [...new Set(entries.map((entry) => entry.buttonId))];
    if (uniqueButtons.length <= 1) {
      continue;
    }

    const [commander, objectId, hotkey] = groupKey.split('\t');
    conflicts.push({
      commander,
      objectId,
      hotkey,
      buttons: uniqueButtons.sort(),
    });
  }

  return conflicts.sort((left, right) => (
    left.commander.localeCompare(right.commander)
    || left.objectId.localeCompare(right.objectId)
    || left.hotkey.localeCompare(right.hotkey)
  ));
}

function buildReport() {
  const loadedXmModules = parseLoadedXmModules();
  const currentHotkeyFiles = filesForLoadedModules(loadedXmModules, 'GameHotkeys.txt')
    .filter((filePath) => normalizePath(filePath).includes('/localizeddata/'));
  const currentButtonFiles = filesForLoadedModules(loadedXmModules, 'ButtonData.xml');
  const currentUnitFiles = filesForLoadedModules(loadedXmModules, 'UnitData.xml');
  const officialHotkeyFiles = findFiles(
    officialRoot,
    (filePath) => path.basename(filePath).toLowerCase() === 'gamehotkeys.txt'
      && normalizePath(filePath).includes('/localizeddata/'),
  );
  const officialButtonFiles = findFiles(
    officialRoot,
    (filePath) => path.basename(filePath).toLowerCase() === 'buttondata.xml'
      && normalizePath(filePath).includes('/gamedata/'),
  );

  const currentHotkeys = parseHotkeyFiles(currentHotkeyFiles, 'current');
  const officialHotkeys = parseHotkeyFiles(officialHotkeyFiles, 'official');
  const currentButtons = parseButtonDataFiles(currentButtonFiles, 'current');
  const officialButtons = parseButtonDataFiles(officialButtonFiles, 'official');
  const roster = parseRuntimeRoster();
  const unitDefinitions = parseUnitDataFiles(currentUnitFiles);
  const profileEntries = parseAbilityProfiles();
  const cardEntries = cardEntriesFromRuntimeRoster(roster, unitDefinitions);
  const checkedEntries = mergeEntries([...profileEntries, ...cardEntries]);

  const entriesWithBindings = checkedEntries.map((entry) => {
    const binding = resolveCurrentBinding(entry.buttonId, currentHotkeys, currentButtons, officialHotkeys);
    const officialSuggestion = binding
      ? null
      : resolveOfficialSuggestion(entry.buttonId, officialHotkeys, officialButtons);

    return {
      ...entry,
      binding,
      officialSuggestion,
    };
  });

  const missingWithOfficialSuggestion = entriesWithBindings
    .filter((entry) => !entry.binding && entry.officialSuggestion)
    .map((entry) => ({
      commander: entry.commander,
      objectId: entry.objectId,
      buttonId: entry.buttonId,
      abilityId: entry.abilityId,
      suggestedKey: entry.officialSuggestion.key,
      suggestedHotkeyId: entry.officialSuggestion.hotkeyId,
      sourceFile: entry.officialSuggestion.file,
      sourceLine: entry.officialSuggestion.line,
      entryKinds: entry.entryKinds,
      sources: entry.sources,
    }));

  const actionableMissingWithOfficialSuggestion = missingWithOfficialSuggestion
    .filter((entry) => entry.sources.some((source) => source.source === 'ability_profile'));
  const cardOnlyMissingWithOfficialSuggestion = missingWithOfficialSuggestion
    .filter((entry) => !entry.sources.some((source) => source.source === 'ability_profile'));

  const missingWithoutOfficialSuggestion = entriesWithBindings
    .filter((entry) => !entry.binding && !entry.officialSuggestion)
    .map((entry) => ({
      commander: entry.commander,
      objectId: entry.objectId,
      buttonId: entry.buttonId,
      abilityId: entry.abilityId,
      entryKinds: entry.entryKinds,
      sources: entry.sources,
    }));

  const boundEntries = entriesWithBindings
    .filter((entry) => entry.binding)
    .map((entry) => ({
      commander: entry.commander,
      objectId: entry.objectId,
      buttonId: entry.buttonId,
      abilityId: entry.abilityId,
      key: entry.binding.key,
      status: entry.binding.status,
      hotkeyId: entry.binding.hotkeyId,
      keyFile: entry.binding.keyFile,
      keyLine: entry.binding.keyLine,
    }));

  const suggestedHotkeyLines = [...new Map(
    actionableMissingWithOfficialSuggestion.map((entry) => [
      entry.buttonId,
      `Button/Hotkey/${entry.buttonId}=${entry.suggestedKey}`,
    ]),
  ).values()].sort();

  return {
    loaded_xm_modules: [...loadedXmModules].sort(),
    current_hotkey_file_count: currentHotkeyFiles.length,
    current_button_file_count: currentButtonFiles.length,
    current_unit_file_count: currentUnitFiles.length,
    official_hotkey_file_count: officialHotkeyFiles.length,
    official_button_file_count: officialButtonFiles.length,
    runtime_roster_commander_count: [...roster.keys()].filter((commander) => targetCommanders.has(commander)).length,
    profile_entry_count: profileEntries.length,
    runtime_card_entry_count: cardEntries.length,
    checked_entry_count: checkedEntries.length,
    bound_entry_count: boundEntries.length,
    missing_with_official_suggestion_count: missingWithOfficialSuggestion.length,
    actionable_missing_with_official_suggestion_count: actionableMissingWithOfficialSuggestion.length,
    card_only_missing_with_official_suggestion_count: cardOnlyMissingWithOfficialSuggestion.length,
    missing_without_official_suggestion_count: missingWithoutOfficialSuggestion.length,
    current_hotkey_duplicate_conflicts: findCurrentHotkeyDuplicateConflicts(currentHotkeys),
    commander_object_hotkey_conflicts: findCommanderObjectConflicts(entriesWithBindings),
    actionable_missing_with_official_suggestion: actionableMissingWithOfficialSuggestion,
    card_only_missing_with_official_suggestion: cardOnlyMissingWithOfficialSuggestion,
    missing_with_official_suggestion: missingWithOfficialSuggestion,
    missing_without_official_suggestion: missingWithoutOfficialSuggestion,
    suggested_hotkey_lines: suggestedHotkeyLines,
  };
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const report = buildReport();
console.log(JSON.stringify(report, null, 2));

const failed = report.actionable_missing_with_official_suggestion_count > 0;

if (failed) {
  process.exitCode = 1;
}
