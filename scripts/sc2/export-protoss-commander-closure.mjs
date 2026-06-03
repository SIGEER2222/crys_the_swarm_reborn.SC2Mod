import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const officialCommanderRoot = path.join(repoRoot, '游戏数据/官方合作指挥官/commanders');
const officialRawRoot = path.join(repoRoot, '游戏数据/官方SC2原始文本镜像');
const outputDir = path.join(repoRoot, 'docs/newdocs/指挥官细化/神族闭包');
const outputMarkdownPath = path.join(outputDir, '神族指挥官完整闭包-2026-06-03.md');
const outputJsonPath = path.join(outputDir, 'protoss-commander-closure.json');

const protossCommanders = [
  { id: 'Alarak', zh: '阿拉纳克' },
  { id: 'Artanis', zh: '阿塔尼斯' },
  { id: 'Fenix', zh: '菲尼克斯' },
  { id: 'Karax', zh: '凯拉克斯' },
  { id: 'Vorazun', zh: '沃拉尊' },
  { id: 'Zeratul', zh: '泽拉图' },
];

const commanderTokens = new Map([
  ['Alarak', ['Alarak']],
  ['Artanis', ['Artanis']],
  ['Fenix', ['Fenix']],
  ['Karax', ['Karax']],
  ['Vorazun', ['Vorazun']],
  ['Zeratul', ['Zeratul']],
]);

const defaultAbilityFaces = new Set([
  'AcquireMove',
  'Attack',
  'AttackBuilding',
  'Cancel',
  'Halt',
  'HoldFire',
  'LoadAll',
  'Move',
  'MoveHoldPosition',
  'MovePatrol',
  'Rally',
  'Smart',
  'Stop',
  'UnloadAll',
]);

const defaultAbilityIds = new Set([
  'attack',
  'BuildInProgress',
  'BuildInProgressProtoss',
  'halt',
  'move',
  'stop',
]);

const rawIndex = buildRawGameDataIndex();
const closure = {
  generated_at: '2026-06-03',
  scope: 'Protoss commanders only',
  official_sources: {
    commander_json_root: normalizePath(path.relative(repoRoot, officialCommanderRoot)),
    raw_text_mirror_root: normalizePath(path.relative(repoRoot, officialRawRoot)),
  },
  raw_index_stats: rawIndex.stats,
  commanders: protossCommanders.map((commander) => buildCommanderClosure(commander)),
};

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(outputJsonPath, `${JSON.stringify(closure, null, 2)}\n`, 'utf8');
fs.writeFileSync(outputMarkdownPath, renderMarkdown(closure), 'utf8');

console.log(`已输出神族指挥官闭包 Markdown：${normalizePath(path.relative(repoRoot, outputMarkdownPath))}`);
console.log(`已输出神族指挥官闭包 JSON：${normalizePath(path.relative(repoRoot, outputJsonPath))}`);

function buildCommanderClosure(commanderInfo) {
  const commanderDir = path.join(officialCommanderRoot, commanderInfo.id);
  const commander = readJson(path.join(commanderDir, 'commander.json'));
  const heroes = readJson(path.join(commanderDir, 'heroes.json'));
  const units = readJson(path.join(commanderDir, 'units.json'));
  const buildings = readJson(path.join(commanderDir, 'buildings.json'));
  const roster = readJson(path.join(commanderDir, 'roster.json'));
  const otherTechEntries = readJson(path.join(commanderDir, 'other-tech-entries.json'));
  const upgrades = readJson(path.join(commanderDir, 'upgrades.json'));
  const progression = readJson(path.join(commanderDir, 'progression.json'));

  const identity = buildCommanderIdentity({ heroes, units, buildings, roster, otherTechEntries });
  identity.unitTargetIds = buildUnitTargetIdSet(units);
  const upgradeIds = buildUpgradeIdSet({ commander, progression, upgrades });
  const context = {
    commander: commanderInfo.id,
    otherCommanderTokens: buildOtherCommanderTokens(commanderInfo.id),
    identity,
    upgradeIds,
  };

  const topBarAbilityCommands = buildCommanderAbilityCommands({
    context,
    commands: commander.default_ability_commands || [],
    source: 'commander.default_ability_commands',
  });

  const progressionAbilityCommands = (progression.perks || [])
    .filter((perk) => Number(perk.level) <= 15)
    .flatMap((perk) =>
      buildCommanderAbilityCommands({
        context,
        commands: perk.ability_commands || [],
        source: `progression.level.${perk.level}.${perk.id}`,
        level: perk.level,
        label: perk.name || perk.id,
      }),
    );

  const unitClosures = units.map((entry) => buildTechEntryClosure({ entry, type: 'unit', context }));
  const buildingClosures = buildings.map((entry) => buildTechEntryClosure({ entry, type: 'building', context }));
  const workerBuildableStructures = buildingClosures.flatMap((entry) =>
    entry.production_options.accepted
      .filter((option) => option.stage === 'worker_build')
      .map((option) => ({
        building_id: entry.id,
        building_name: entry.name,
        building_unit_id: entry.unit_id,
        ...option,
      })),
  );

  const excludedOrReview = [
    ...topBarAbilityCommands.filter((item) => item.status !== 'accepted'),
    ...progressionAbilityCommands.filter((item) => item.status !== 'accepted'),
    ...unitClosures.flatMap((entry) => [
      ...entry.production_options.excluded.map((item) => ({ owner: entry.id, section: 'unit.production', ...item })),
      ...entry.abilities.excluded.map((item) => ({ owner: entry.id, section: 'unit.ability', ...item })),
      ...entry.abilities.review.map((item) => ({ owner: entry.id, section: 'unit.ability', ...item })),
    ]),
    ...buildingClosures.flatMap((entry) => [
      ...entry.production_options.excluded.map((item) => ({ owner: entry.id, section: 'building.production', ...item })),
      ...entry.abilities.excluded.map((item) => ({ owner: entry.id, section: 'building.ability', ...item })),
      ...entry.abilities.review.map((item) => ({ owner: entry.id, section: 'building.ability', ...item })),
    ]),
  ];

  return {
    commander: commanderInfo.id,
    zh_name: commanderInfo.zh,
    official_name: commander.name,
    commander_json_dir: normalizePath(path.relative(repoRoot, commanderDir)),
    assumptions: [
      'level_15',
      'all_six_masteries_maxed',
      'positive_prestige_fusion_only',
      'commander_json_first_then_raw_text_mirror_closure',
    ],
    official_roster: {
      heroes: summarizeIds(heroes),
      units: summarizeIds(units),
      buildings: summarizeIds(buildings),
      roster: summarizeIds(roster),
      other_tech_entries: summarizeIds(otherTechEntries),
      upgrades: upgrades.map((upgrade) => upgrade.id).filter(Boolean).sort(naturalSort),
    },
    top_bar_ability_commands: topBarAbilityCommands,
    progression_ability_commands: progressionAbilityCommands,
    worker_buildable_structures: workerBuildableStructures,
    units: unitClosures,
    buildings: buildingClosures,
    shared_or_excluded_candidates: excludedOrReview,
    counts: {
      heroes: heroes.length,
      units: units.length,
      buildings: buildings.length,
      worker_buildable_structures: workerBuildableStructures.length,
      accepted_unit_abilities: unitClosures.reduce((sum, entry) => sum + entry.abilities.accepted.length, 0),
      accepted_building_abilities: buildingClosures.reduce((sum, entry) => sum + entry.abilities.accepted.length, 0),
      excluded_or_review_items: excludedOrReview.length,
    },
  };
}

function buildCommanderAbilityCommands({ context, commands, source, level = '', label = '' }) {
  return commands.map((command) => {
    const abilityId = command.abil || '';
    const commandIndex = command.cmd || '';
    const raw = summarizeAbilityCommand({ abilityId, commandIndex, tooltip: '' });
    const classification = classifyTextForCommander({
      context,
      textParts: [source, level, label, abilityId, commandIndex, rawToSearchText(raw)],
      raw,
    });

    return {
      source,
      level,
      label,
      ability_id: abilityId,
      command_index: commandIndex,
      abil_cmd: formatAbilCmd(abilityId, commandIndex),
      status: classification.status,
      reasons: classification.reasons,
      raw,
    };
  });
}

function buildTechEntryClosure({ entry, type, context }) {
  const entryIds = buildEntryIdSet(entry);
  const productionOptions = (entry.production_options || []).map((option) =>
    classifyProductionOption({ option, type, entry, entryIds, context }),
  );
  const acceptedProductionOptions = productionOptions.filter((option) => option.status === 'accepted');
  const excludedProductionOptions = productionOptions.filter((option) => option.status !== 'accepted');

  const abilities = (entry.abilities || []).map((ability) => classifyAbility({ ability, entry, type, context }));
  const acceptedAbilities = abilities.filter((ability) => ability.status === 'accepted');
  const reviewAbilities = abilities.filter((ability) => ability.status === 'review');
  const excludedAbilities = abilities.filter((ability) => ability.status === 'excluded');

  return {
    id: entry.id,
    unit_id: entry.unit_id,
    name: entry.name,
    type,
    resolved_unit_ids: entry.resolved_unit_ids || [],
    cost: summarizeUnitCost(entry.unit),
    production_options: {
      accepted: acceptedProductionOptions,
      excluded: excludedProductionOptions,
    },
    abilities: {
      accepted: acceptedAbilities,
      review: reviewAbilities,
      excluded: excludedAbilities,
    },
  };
}

function classifyProductionOption({ option, type, entry, entryIds, context }) {
  const abilityId = option.ability_id || splitAbilCmd(option.abil_cmd).abilityId;
  const commandIndex = option.command_index || splitAbilCmd(option.abil_cmd).commandIndex;
  const raw = summarizeAbilityCommand({ abilityId, commandIndex, tooltip: '' });
  const targetIds = new Set([option.unit, option.base_unit_id].filter(Boolean));
  const isWorkerBuild = option.producer_unit_id === 'Probe' || abilityId === 'ProtossBuild' || abilityId === 'ZeratulBuild';
  const targetMatchesEntry =
    type === 'building'
      ? Boolean(
          option.unit &&
            (option.unit === entry.id ||
              option.unit === entry.unit_id ||
              (isWorkerBuild && (entry.resolved_unit_ids || []).includes(option.unit))),
        )
      : [...targetIds].some((id) => entryIds.has(id));
  const targetIsOfficialOwned = [...targetIds].some((id) => context.identity.allIds.has(id));
  const isSelfMorphOrBuild = type === 'building' && targetMatchesEntry;
  const classification = classifyTextForCommander({
    context,
    textParts: [
      option.producer_unit_id,
      option.button_face,
      option.abil_cmd,
      option.unit,
      option.base_unit_id,
      rawToSearchText(raw),
    ],
    raw,
  });
  const reasons = [...classification.reasons];
  let status = classification.status;
  let stage = 'production_or_morph';

  if (isWorkerBuild) {
    stage = type === 'building' && targetMatchesEntry ? 'worker_build' : 'worker_build_prerequisite';
  } else if (isSelfMorphOrBuild) {
    stage = 'self_morph_or_build';
  }

  if (status === 'accepted' && type === 'building' && !targetMatchesEntry) {
    status = 'excluded';
    reasons.push('building_entry_target_not_this_building');
  }

  if (status === 'accepted' && type === 'unit' && !isWorkerBuild && !targetMatchesEntry) {
    status = 'excluded';
    reasons.push('unit_entry_target_not_this_unit');
  }

  return {
    status,
    reasons,
    stage,
    producer_unit_id: option.producer_unit_id || '',
    button_face: option.button_face || '',
    abil_cmd: option.abil_cmd || formatAbilCmd(abilityId, commandIndex),
    ability_id: abilityId,
    command_index: commandIndex,
    unit: option.unit || '',
    base_unit_id: option.base_unit_id || '',
    target_matches_entry: targetMatchesEntry,
    target_is_official_owned: targetIsOfficialOwned,
    minerals: option.minerals || '',
    vespene: option.vespene || '',
    time: option.time || '',
    cost_mode: option.cost_mode || '',
    raw,
  };
}

function classifyAbility({ ability, entry, type, context }) {
  const { abilityId, commandIndex } = splitAbilCmd(ability.abil_cmd || '');
  const raw = summarizeAbilityCommand({ abilityId, commandIndex, tooltip: ability.tooltip || '' });
  const rawUpgrade = raw?.command?.upgrade || '';
  const rawCommandUnit = raw?.command?.unit || '';
  const rawRequirement = raw?.command?.requirements || ability.requirements || '';
  const classification = classifyTextForCommander({
    context,
    textParts: [
      entry.id,
      type,
      ability.face,
      ability.type,
      ability.abil_cmd,
      ability.requirements,
      ability.name,
      ability.tooltip,
      rawToSearchText(raw),
    ],
    raw,
  });
  const reasons = [...classification.reasons];
  let status = classification.status;

  if (
    status === 'accepted' &&
    type === 'building' &&
    rawCommandUnit &&
    /^CAbil(?:Train|WarpTrain|Morph)/.test(raw?.kind || '') &&
    !context.identity.unitTargetIds.has(rawCommandUnit)
  ) {
    status = 'excluded';
    reasons.push(`command_unit_not_in_commander_roster:${rawCommandUnit}`);
  }

  if (
    status === 'accepted' &&
    type === 'building' &&
    !rawCommandUnit &&
    /^CAbil(?:Train|WarpTrain)/.test(raw?.kind || '') &&
    !faceMatchesUnitTarget(ability.face || '', context.identity.unitTargetIds)
  ) {
    status = 'excluded';
    reasons.push('train_command_target_unresolved_and_face_not_in_roster');
  }

  if (
    status === 'accepted' &&
    rawUpgrade &&
    !context.upgradeIds.has(rawUpgrade) &&
    hasCommanderToken(rawUpgrade, context.otherCommanderTokens)
  ) {
    status = 'excluded';
    reasons.push(`raw_upgrade_belongs_to_other_commander:${rawUpgrade}`);
  }

  if (
    status === 'accepted' &&
    rawUpgrade &&
    !context.upgradeIds.has(rawUpgrade) &&
    !hasCommanderToken(rawUpgrade, commanderTokens.get(context.commander) || [])
  ) {
    status = 'review';
    reasons.push(`raw_upgrade_not_in_commander_upgrades:${rawUpgrade}`);
  }

  return {
    status,
    reasons,
    face: ability.face || '',
    type: ability.type || '',
    abil_cmd: ability.abil_cmd || '',
    ability_id: abilityId,
    command_index: commandIndex,
    requirements: rawRequirement,
    row: ability.row ?? '',
    column: ability.column ?? '',
    name: ability.name || '',
    tooltip: ability.tooltip || '',
    is_default_card: Boolean(ability.is_default_card),
    is_default_command: isDefaultAbilityCommand({ face: ability.face, abilityId }),
    raw,
  };
}

function summarizeAbilityCommand({ abilityId, commandIndex, tooltip }) {
  if (!abilityId) {
    const tooltipRefs = extractTooltipRefs(tooltip || '');
    return {
      found: false,
      ability_id: '',
      command_index: commandIndex || '',
      tooltip_refs: tooltipRefs,
      effect_closure: summarizeEffectClosure(tooltipRefs.effects),
    };
  }

  const definition = rawIndex.abilities.best.get(abilityId);
  const body = definition?.body || '';
  const commandBlock = commandIndex ? findIndexedBlock(body, commandIndex) : '';
  const scopedBody = commandIndex ? commandBlock : body;
  const effectScope = definition?.tag?.startsWith('CAbilEffect') ? body : scopedBody;
  const commandOpeningTag = commandBlock ? getOpeningTag(commandBlock) : '';
  const commandAttrs = parseAttributes(commandOpeningTag);
  const tooltipRefs = extractTooltipRefs(tooltip || '');
  const directEffectIds = unique([
    ...extractEffectIds(effectScope),
    ...tooltipRefs.effects,
  ]);
  const linkedAbilityIds = tooltipRefs.abilities.filter((id) => id !== abilityId);
  const linkedAbilityEffects = linkedAbilityIds.flatMap((id) => {
    const linked = rawIndex.abilities.best.get(id);
    return linked ? extractEffectIds(linked.body) : [];
  });
  const effectIds = unique([...directEffectIds, ...linkedAbilityEffects]);
  const buttonFaces = unique([
    ...extractAttributeValues(scopedBody, 'DefaultButtonFace'),
  ]);
  const requirementIds = unique([
    ...extractAttributeValues(scopedBody, 'Requirements'),
  ]).filter(Boolean);

  return {
    found: Boolean(definition),
    ability_id: abilityId,
    command_index: commandIndex || '',
    kind: definition?.tag || '',
    source: definition ? normalizePath(path.relative(repoRoot, definition.filePath)) : '',
    definition_count: rawIndex.abilities.all.get(abilityId)?.length || 0,
    command: {
      found: Boolean(commandBlock),
      tag: commandBlock ? commandOpeningTag.match(/^<([^\s/>]+)/)?.[1] || '' : '',
      index: commandIndex || '',
      time: commandAttrs.Time || '',
      unit: commandAttrs.Unit || first(extractTagValue(commandBlock, 'Unit')),
      upgrade: commandAttrs.Upgrade || '',
      requirements: commandAttrs.Requirements || first(extractAttributeValues(commandBlock, 'Requirements')),
      button_face: commandAttrs.DefaultButtonFace || first(extractAttributeValues(commandBlock, 'DefaultButtonFace')),
      resources: extractResources(commandBlock),
    },
    cooldowns: extractCooldowns(body),
    range: first(extractAttributeValues(body, 'Range')) || first(extractTagValue(body, 'Range')),
    target_filters: first(extractTagValue(body, 'TargetFilters')),
    autocast_filters: first(extractTagValue(body, 'AutoCastFilters')),
    button_faces: buttonFaces,
    requirements: summarizeRequirements(requirementIds),
    tooltip_refs: tooltipRefs,
    linked_ability_ids: linkedAbilityIds,
    effect_ids: effectIds,
    effect_closure: summarizeEffectClosure(effectIds),
  };
}

function summarizeEffectClosure(effectIds) {
  const visited = new Set();
  const queue = unique(effectIds).map((id) => ({ id, depth: 0 }));
  const effects = [];

  while (queue.length && effects.length < 24) {
    const { id, depth } = queue.shift();
    if (!id || visited.has(id) || depth > 3) {
      continue;
    }
    visited.add(id);

    const definition = rawIndex.effects.best.get(id);
    if (!definition) {
      effects.push({ id, found: false, depth });
      continue;
    }

    const refs = extractKnownRefs(definition.body, rawIndex.effects.best);
    effects.push({
      id,
      found: true,
      depth,
      kind: definition.tag,
      source: normalizePath(path.relative(repoRoot, definition.filePath)),
      amount: first(extractAttributeValues(definition.body, 'Amount')),
      radius: first(extractAttributeValues(definition.body, 'Radius')),
      period: first(extractAttributeValues(definition.body, 'Period')),
      period_count: first(extractAttributeValues(definition.body, 'PeriodCount')),
      unit: first(extractAttributeValues(definition.body, 'Unit')),
      behavior: first(extractAttributeValues(definition.body, 'Behavior')),
      validator: first(extractAttributeValues(definition.body, 'Validator')),
      refs,
    });

    for (const ref of refs) {
      if (!visited.has(ref)) {
        queue.push({ id: ref, depth: depth + 1 });
      }
    }
  }

  return effects;
}

function summarizeRequirements(requirementIds) {
  return unique(requirementIds)
    .filter(Boolean)
    .map((id) => {
      const definition = rawIndex.requirements.best.get(id);
      if (!definition) {
        return { id, found: false };
      }

      return {
        id,
        found: true,
        kind: definition.tag,
        source: normalizePath(path.relative(repoRoot, definition.filePath)),
        referenced_ids: unique([
          ...extractAttributeValues(definition.body, 'value'),
          ...extractAttributeValues(definition.body, 'Link'),
          ...extractAttributeValues(definition.body, 'Upgrade'),
          ...extractAttributeValues(definition.body, 'Unit'),
        ]).slice(0, 20),
      };
    });
}

function classifyTextForCommander({ context, textParts, raw }) {
  const searchText = textParts.filter((part) => part !== undefined && part !== null).join(' ');
  const matchedOtherTokens = context.otherCommanderTokens.filter((token) => searchText.includes(token));
  const reasons = [];
  let status = 'accepted';

  if (matchedOtherTokens.length) {
    status = 'excluded';
    reasons.push(`other_commander_token:${unique(matchedOtherTokens).join(',')}`);
  }

  if (raw?.requirements?.some((requirement) => requirement.id && hasCommanderToken(requirement.id, context.otherCommanderTokens))) {
    status = 'excluded';
    reasons.push('requirement_belongs_to_other_commander');
  }

  return { status, reasons };
}

function rawToSearchText(raw) {
  if (!raw) {
    return '';
  }

  return [
    raw.ability_id,
    raw.command_index,
    raw.kind,
    raw.command?.unit,
    raw.command?.upgrade,
    raw.command?.requirements,
    raw.command?.button_face,
    ...(raw.button_faces || []),
    ...(raw.effect_ids || []),
    ...(raw.linked_ability_ids || []),
    ...(raw.requirements || []).map((requirement) => requirement.id),
    ...(raw.effect_closure || []).flatMap((effect) => [effect.id, effect.unit, effect.behavior, effect.validator]),
  ]
    .filter(Boolean)
    .join(' ');
}

function buildCommanderIdentity({ heroes, units, buildings, roster, otherTechEntries }) {
  const groups = { heroes, units, buildings, roster, otherTechEntries };
  const allIds = new Set();
  const idsByGroup = {};

  for (const [groupName, entries] of Object.entries(groups)) {
    idsByGroup[groupName] = [];
    for (const entry of entries || []) {
      for (const id of getEntryIds(entry)) {
        allIds.add(id);
        idsByGroup[groupName].push(id);
      }
    }
    idsByGroup[groupName] = unique(idsByGroup[groupName]).sort(naturalSort);
  }

  return {
    allIds,
    idsByGroup,
  };
}

function buildUnitTargetIdSet(units) {
  const ids = new Set();

  for (const entry of units || []) {
    for (const id of getEntryIds(entry)) {
      ids.add(id);
    }
  }

  return ids;
}

function buildUpgradeIdSet({ commander, progression, upgrades }) {
  const ids = new Set();

  for (const upgrade of upgrades || []) {
    if (upgrade.id) {
      ids.add(upgrade.id);
    }
  }

  for (const upgrade of commander.default_upgrades || []) {
    ids.add(upgrade);
  }

  for (const perk of progression.perks || []) {
    if (Number(perk.level) <= 15) {
      for (const upgrade of perk.upgrades || []) {
        ids.add(upgrade);
      }
    }
  }

  for (const mastery of progression.masteries || []) {
    for (const upgrade of mastery.upgrades || []) {
      ids.add(upgrade);
    }
  }

  return ids;
}

function buildEntryIdSet(entry) {
  return new Set(getEntryIds(entry));
}

function getEntryIds(entry) {
  return unique([entry.id, entry.unit_id, ...(entry.resolved_unit_ids || [])].filter(Boolean));
}

function summarizeIds(entries) {
  return (entries || []).map((entry) => ({
    id: entry.id || '',
    unit_id: entry.unit_id || '',
    name: entry.name || '',
    resolved_unit_ids: entry.resolved_unit_ids || [],
  }));
}

function summarizeUnitCost(unit) {
  if (!unit) {
    return {};
  }

  return {
    minerals: unit.minerals || '',
    vespene: unit.vespene || '',
    supply_cost: unit.supply_cost || '',
    supply_provided: unit.supply_provided || '',
    build_time: unit.build_time || '',
    life: unit.life || '',
    shields: unit.shields || '',
    energy: unit.energy || '',
  };
}

function buildRawGameDataIndex() {
  const files = walkFiles(officialRawRoot)
    .filter((filePath) => filePath.toLowerCase().endsWith('.xml'))
    .filter((filePath) => normalizePath(filePath).toLowerCase().includes('/gamedata/'));
  const index = {
    abilities: createDefinitionBucket(),
    effects: createDefinitionBucket(),
    requirements: createDefinitionBucket(),
    buttons: createDefinitionBucket(),
    stats: {
      scanned_xml_files: files.length,
      ability_definitions: 0,
      effect_definitions: 0,
      requirement_definitions: 0,
      button_definitions: 0,
    },
  };

  files.forEach((filePath, order) => {
    const text = fs.readFileSync(filePath, 'utf8');
    const score = sourcePriorityScore(filePath, order);
    scanXmlDefinitions(text, filePath, score, index);
  });

  finalizeBucket(index.abilities);
  finalizeBucket(index.effects);
  finalizeBucket(index.requirements);
  finalizeBucket(index.buttons);

  index.stats.ability_definitions = countDefinitions(index.abilities);
  index.stats.effect_definitions = countDefinitions(index.effects);
  index.stats.requirement_definitions = countDefinitions(index.requirements);
  index.stats.button_definitions = countDefinitions(index.buttons);

  return index;
}

function createDefinitionBucket() {
  return {
    all: new Map(),
    best: new Map(),
  };
}

function scanXmlDefinitions(text, filePath, score, index) {
  const blockPattern = /<((?:CAbil|CEffect|CRequirement|CButton)[A-Za-z0-9_]*)\b([^<>]*?\bid="([^"]+)"[^<>]*)>([\s\S]*?)<\/\1>/g;
  const selfClosingPattern = /<((?:CAbil|CEffect|CRequirement|CButton)[A-Za-z0-9_]*)\b([^<>]*?\bid="([^"]+)"[^<>]*)\/>/g;

  for (const pattern of [blockPattern, selfClosingPattern]) {
    let match;
    while ((match = pattern.exec(text))) {
      const [, tag, attrsText, id, body = ''] = match;
      const definition = {
        id,
        tag,
        attrs: parseAttributes(`<${tag} ${attrsText}>`),
        body,
        filePath,
        score,
      };
      addDefinition(index, definition);
    }
  }
}

function addDefinition(index, definition) {
  if (definition.tag.startsWith('CAbil')) {
    addToBucket(index.abilities, definition);
    return;
  }
  if (definition.tag.startsWith('CEffect')) {
    addToBucket(index.effects, definition);
    return;
  }
  if (definition.tag.startsWith('CRequirement')) {
    addToBucket(index.requirements, definition);
    return;
  }
  if (definition.tag.startsWith('CButton')) {
    addToBucket(index.buttons, definition);
  }
}

function addToBucket(bucket, definition) {
  if (!bucket.all.has(definition.id)) {
    bucket.all.set(definition.id, []);
  }
  bucket.all.get(definition.id).push(definition);
}

function finalizeBucket(bucket) {
  for (const [id, definitions] of bucket.all.entries()) {
    definitions.sort((a, b) => b.score - a.score);
    bucket.best.set(id, definitions[0]);
  }
}

function countDefinitions(bucket) {
  let count = 0;
  for (const definitions of bucket.all.values()) {
    count += definitions.length;
  }
  return count;
}

function sourcePriorityScore(filePath, order) {
  const rel = normalizePath(path.relative(officialRawRoot, filePath)).toLowerCase();
  let score = order / 100000;

  if (rel.includes('mods/starcoop/commanders/')) score += 10000;
  if (rel.includes('mods/starcoop/starcoop.sc2mod/')) score += 9000;
  if (rel.includes('mods/warcoop/')) score += 8000;
  if (rel.includes('mods/voidmulti.sc2mod/')) score += 7000;
  if (rel.includes('mods/void.sc2mod/')) score += 6500;
  if (rel.includes('campaigns/void')) score += 6000;
  if (rel.includes('mods/balancemulti')) score += 5500;
  if (rel.includes('mods/libertymulti')) score += 5000;
  if (rel.includes('mods/liberty')) score += 4000;
  if (rel.includes('campaigns/liberty')) score += 3500;
  if (rel.includes('mods/swarm')) score += 3000;
  if (rel.includes('campaigns/swarm')) score += 2500;

  return score;
}

function findIndexedBlock(body, index) {
  if (!body || !index) {
    return '';
  }

  const escaped = escapeRegExp(index);
  const pattern = new RegExp(
    `<([A-Za-z0-9_]+)\\b(?=[^>]*\\bindex="${escaped}")[^>]*(?:\\/>|>[\\s\\S]*?<\\/\\1>)`,
    'm',
  );
  return body.match(pattern)?.[0] || '';
}

function getOpeningTag(xmlBlock) {
  return xmlBlock.match(/^<[^>]+>/)?.[0] || '';
}

function parseAttributes(openingTag) {
  const attrs = {};
  if (!openingTag) {
    return attrs;
  }

  const pattern = /([A-Za-z0-9_.:-]+)="([^"]*)"/g;
  let match;
  while ((match = pattern.exec(openingTag))) {
    attrs[match[1]] = match[2];
  }
  return attrs;
}

function extractResources(xmlBlock) {
  const resources = {};
  const pattern = /<Resource\b[^>]*\bindex="([^"]+)"[^>]*\bvalue="([^"]*)"[^>]*\/?>/g;
  let match;
  while ((match = pattern.exec(xmlBlock || ''))) {
    resources[match[1]] = match[2];
  }
  return resources;
}

function extractCooldowns(xmlBlock) {
  const cooldowns = [];
  const pattern = /<Cooldown\b([^>]*)\/?>/g;
  let match;
  while ((match = pattern.exec(xmlBlock || ''))) {
    cooldowns.push(parseAttributes(`<Cooldown ${match[1]}>`));
  }
  return cooldowns;
}

function extractEffectIds(xmlBlock) {
  if (!xmlBlock) {
    return [];
  }

  return unique([
    ...extractAttributeValues(xmlBlock, 'Effect'),
    ...extractAttributeValues(xmlBlock, 'CursorEffect'),
    ...extractTagsWithValue(xmlBlock, /Effect/),
  ]).filter((id) => rawIndex?.effects?.best?.has(id) || /^[A-Za-z][A-Za-z0-9_]*$/.test(id));
}

function extractKnownRefs(xmlBlock, knownMap) {
  const values = extractAttributeValues(xmlBlock || '', 'value');
  return unique(values.filter((value) => knownMap.has(value)));
}

function extractAttributeValues(xmlBlock, attrName) {
  const values = [];
  const escaped = escapeRegExp(attrName);
  const pattern = new RegExp(`\\b${escaped}="([^"]*)"`, 'g');
  let match;
  while ((match = pattern.exec(xmlBlock || ''))) {
    if (match[1]) {
      values.push(match[1]);
    }
  }
  return unique(values);
}

function extractTagValue(xmlBlock, tagName) {
  const escaped = escapeRegExp(tagName);
  const pattern = new RegExp(`<${escaped}\\b[^>]*\\bvalue="([^"]*)"[^>]*\\/?>(?:<\\/${escaped}>)?`, 'g');
  const values = [];
  let match;
  while ((match = pattern.exec(xmlBlock || ''))) {
    values.push(match[1]);
  }
  return unique(values);
}

function extractTagsWithValue(xmlBlock, tagPattern) {
  const values = [];
  const pattern = /<([A-Za-z0-9_.:-]+)\b[^>]*\bvalue="([^"]+)"[^>]*\/?>/g;
  let match;
  while ((match = pattern.exec(xmlBlock || ''))) {
    if (tagPattern.test(match[1])) {
      values.push(match[2]);
    }
  }
  return unique(values);
}

function extractTooltipRefs(tooltip) {
  const effects = [];
  const abilities = [];
  const behaviors = [];
  const upgrades = [];
  const pattern = /\{(Effect|Abil|Behavior|Upgrade),([^,}]+)[^}]*\}/g;
  let match;
  while ((match = pattern.exec(tooltip || ''))) {
    if (match[1] === 'Effect') effects.push(match[2]);
    if (match[1] === 'Abil') abilities.push(match[2]);
    if (match[1] === 'Behavior') behaviors.push(match[2]);
    if (match[1] === 'Upgrade') upgrades.push(match[2]);
  }

  return {
    effects: unique(effects),
    abilities: unique(abilities),
    behaviors: unique(behaviors),
    upgrades: unique(upgrades),
  };
}

function splitAbilCmd(abilCmd) {
  const [abilityId = '', commandIndex = ''] = String(abilCmd || '').split(',');
  return { abilityId, commandIndex };
}

function formatAbilCmd(abilityId, commandIndex) {
  if (!abilityId && !commandIndex) {
    return '';
  }
  return commandIndex ? `${abilityId},${commandIndex}` : abilityId;
}

function isDefaultAbilityCommand({ face, abilityId }) {
  return defaultAbilityFaces.has(face || '') || defaultAbilityIds.has(abilityId || '');
}

function buildOtherCommanderTokens(commander) {
  return [...commanderTokens.entries()]
    .filter(([id]) => id !== commander)
    .flatMap(([, tokens]) => tokens);
}

function faceMatchesUnitTarget(face, unitTargetIds) {
  const cleanFace = String(face || '')
    .replace(/^WarpIn/i, '')
    .replace(/^Warpin/i, '')
    .replace(/Locked$/i, '')
    .replace(/Button$/i, '');

  if (!cleanFace) {
    return false;
  }

  return [...unitTargetIds].some((id) => {
    const value = String(id || '');
    return value && (value === cleanFace || value.includes(cleanFace) || cleanFace.includes(value));
  });
}

function hasCommanderToken(text, tokens) {
  return tokens.some((token) => String(text || '').includes(token));
}

function renderMarkdown(data) {
  const lines = [];

  lines.push('# 神族指挥官完整闭包');
  lines.push('');
  lines.push('生成日期：2026-06-03');
  lines.push('');
  lines.push('本文件由 `scripts/sc2/export-protoss-commander-closure.mjs` 从官方数据生成。归属判定先读取 `游戏数据/官方合作指挥官/commanders/<Commander>/`，再用 `游戏数据/官方SC2原始文本镜像/` 补 `AbilData / EffectData / RequirementData` 摘要。');
  lines.push('');
  lines.push('默认口径：15 级、六项精通全满、只采用威望正收益融合；共享 command card 命中只算候选，不能单独升级为本指挥官正向链路。');
  lines.push('');
  lines.push(`完整机器可读闭包：\`${normalizePath(path.relative(repoRoot, outputJsonPath))}\`。Markdown 为可读摘要，默认移动/停止/巡逻等基础命令会折叠，完整按钮保留在 JSON。`);
  lines.push('');
  lines.push('## 总览');
  lines.push('');
  lines.push('| 指挥官 | 兵种 | 建筑 | 农民可建造 | 正向单位技能 | 正向建筑技能 | 排除/复核项 |');
  lines.push('|---|---:|---:|---:|---:|---:|---:|');
  for (const commander of data.commanders) {
    lines.push(
      `| ${md(commander.zh_name)} / ${md(commander.commander)} | ${commander.counts.units} | ${commander.counts.buildings} | ${commander.counts.worker_buildable_structures} | ${commander.counts.accepted_unit_abilities} | ${commander.counts.accepted_building_abilities} | ${commander.counts.excluded_or_review_items} |`,
    );
  }
  lines.push('');

  for (const commander of data.commanders) {
    renderCommanderMarkdown(lines, commander);
  }

  return `${lines.join('\n')}\n`;
}

function renderCommanderMarkdown(lines, commander) {
  lines.push(`## ${commander.zh_name} / ${commander.commander}`);
  lines.push('');
  lines.push(`官方 JSON：\`${commander.commander_json_dir}\``);
  lines.push('');
  lines.push('### 官方有效名册');
  lines.push('');
  lines.push(`- 兵种：${joinIds(commander.official_roster.units) || '无'}`);
  lines.push(`- 建筑：${joinIds(commander.official_roster.buildings) || '无'}`);
  lines.push(`- 英雄：${joinIds(commander.official_roster.heroes) || 'heroes.json 无条目'}`);
  lines.push('');

  lines.push('### 顶部/等级解锁技能命令');
  lines.push('');
  lines.push('| 来源 | 技能命令 | Raw 摘要 | 效果闭包 | 状态 |');
  lines.push('|---|---|---|---|---|');
  for (const item of [...commander.top_bar_ability_commands, ...commander.progression_ability_commands]) {
    lines.push(
      `| ${md(item.level ? `Lv${item.level} ${item.label}` : item.source)} | ${md(item.abil_cmd)} | ${md(renderRawSummary(item.raw))} | ${md(renderEffectSummary(item.raw?.effect_closure))} | ${md(renderStatus(item))} |`,
    );
  }
  lines.push('');

  lines.push('### 农民可建造建筑闭包');
  lines.push('');
  lines.push('| 建筑 | 建造链 | 花费/时间 | Raw 摘要 |');
  lines.push('|---|---|---|---|');
  for (const item of commander.worker_buildable_structures) {
    lines.push(
      `| ${md(formatNamedId(item.building_id, item.building_name))} | ${md(`${item.producer_unit_id || '?'} -> ${item.abil_cmd} -> ${item.unit}`)} | ${md(formatCost(item))} | ${md(renderRawSummary(item.raw))} |`,
    );
  }
  if (!commander.worker_buildable_structures.length) {
    lines.push('| 无 | 无 | 无 | 无 |');
  }
  lines.push('');

  lines.push('### 兵种生产与技能闭包');
  lines.push('');
  lines.push('| 兵种 | 生产/变形链 | 非默认技能/被动 |');
  lines.push('|---|---|---|');
  for (const unit of commander.units) {
    const production = unit.production_options.accepted.map(renderProductionOption).join('<br>');
    const skills = unit.abilities.accepted
      .filter((ability) => !ability.is_default_command)
      .map(renderAbility)
      .join('<br>');
    lines.push(`| ${md(formatNamedId(unit.id, unit.name))} | ${md(production || '无正向生产项')} | ${md(skills || '无非默认技能')} |`);
  }
  lines.push('');

  lines.push('### 建筑技能/研究闭包');
  lines.push('');
  lines.push('| 建筑 | 建造/变形链 | 非默认技能/研究 |');
  lines.push('|---|---|---|');
  for (const building of commander.buildings) {
    const production = building.production_options.accepted.map(renderProductionOption).join('<br>');
    const skills = building.abilities.accepted
      .filter((ability) => !ability.is_default_command)
      .map(renderAbility)
      .join('<br>');
    lines.push(`| ${md(formatNamedId(building.id, building.name))} | ${md(production || '无正向建造项')} | ${md(skills || '无非默认技能')} |`);
  }
  lines.push('');

  lines.push('### 排除/复核候选');
  lines.push('');
  lines.push('| 类型 | Owner | 项 | 原因 |');
  lines.push('|---|---|---|---|');
  const candidates = commander.shared_or_excluded_candidates.slice(0, 160);
  for (const item of candidates) {
    const label = item.abil_cmd || item.face || item.button_face || item.ability_id || item.unit || item.source || '';
    lines.push(`| ${md(item.section || item.source || 'ability')} | ${md(item.owner || item.building_id || '')} | ${md(label)} | ${md(renderStatus(item))} |`);
  }
  if (!candidates.length) {
    lines.push('| 无 | 无 | 无 | 无 |');
  }
  if (commander.shared_or_excluded_candidates.length > candidates.length) {
    lines.push(
      `| 省略 |  |  | 还有 ${commander.shared_or_excluded_candidates.length - candidates.length} 项，见 JSON 完整闭包 |`,
    );
  }
  lines.push('');
}

function renderProductionOption(option) {
  return `${option.stage}: ${option.producer_unit_id || '?'} -> ${option.abil_cmd} -> ${option.unit || '?'} (${formatCost(option)}; ${renderRawSummary(option.raw)})`;
}

function renderAbility(ability) {
  const rawSummary = renderRawSummary(ability.raw);
  const effectSummary = renderEffectSummary(ability.raw?.effect_closure);
  const requirement = ability.requirements ? ` req=${ability.requirements}` : '';
  return `${ability.face || ability.abil_cmd || ability.name}${ability.abil_cmd ? ` [${ability.abil_cmd}]` : ''}${requirement}; ${rawSummary}${effectSummary ? `; effects=${effectSummary}` : ''}`;
}

function renderRawSummary(raw) {
  if (!raw) {
    return '';
  }
  if (!raw.found) {
    const tooltipEffects = raw.tooltip_refs?.effects?.length ? `tooltip_effects=${raw.tooltip_refs.effects.join('/')}` : '';
    return tooltipEffects || 'raw_missing';
  }
  const bits = [raw.kind];
  if (raw.command?.found) {
    const commandBits = [];
    if (raw.command.unit) commandBits.push(`unit=${raw.command.unit}`);
    if (raw.command.upgrade) commandBits.push(`upgrade=${raw.command.upgrade}`);
    if (raw.command.time) commandBits.push(`time=${raw.command.time}`);
    if (raw.command.requirements) commandBits.push(`req=${raw.command.requirements}`);
    if (Object.keys(raw.command.resources || {}).length) commandBits.push(`cost=${formatResourceObject(raw.command.resources)}`);
    bits.push(`cmd(${commandBits.join(',') || raw.command.index})`);
  }
  if (raw.cooldowns?.length) {
    bits.push(`cd=${raw.cooldowns.map(formatCooldown).join('/')}`);
  }
  if (raw.range) {
    bits.push(`range=${raw.range}`);
  }
  return bits.filter(Boolean).join('; ');
}

function renderEffectSummary(effects) {
  if (!effects?.length) {
    return '';
  }

  return effects
    .slice(0, 8)
    .map((effect) => {
      if (!effect.found) {
        return `${effect.id}(missing)`;
      }
      const bits = [effect.id, effect.kind];
      if (effect.amount) bits.push(`amount=${effect.amount}`);
      if (effect.radius) bits.push(`radius=${effect.radius}`);
      if (effect.unit) bits.push(`unit=${effect.unit}`);
      return bits.join(':');
    })
    .join('<br>');
}

function renderStatus(item) {
  const status = item.status || 'accepted';
  const reasons = item.reasons?.length ? `: ${item.reasons.join(', ')}` : '';
  return `${status}${reasons}`;
}

function formatCost(item) {
  const parts = [];
  if (item.minerals) parts.push(`M${item.minerals}`);
  if (item.vespene) parts.push(`G${item.vespene}`);
  if (item.time) parts.push(`T${item.time}`);
  return parts.join('/') || '未写明';
}

function formatResourceObject(resources) {
  return Object.entries(resources)
    .map(([key, value]) => `${key}:${value}`)
    .join('/');
}

function formatCooldown(cooldown) {
  return Object.entries(cooldown)
    .map(([key, value]) => `${key}=${value}`)
    .join(',');
}

function formatNamedId(id, name) {
  return name ? `${id}（${name}）` : id;
}

function joinIds(entries) {
  return entries.map((entry) => formatNamedId(entry.id || entry.unit_id, entry.name)).join('、');
}

function first(values) {
  return values?.find((value) => value !== undefined && value !== null && value !== '') || '';
}

function unique(values) {
  return [...new Set(values.filter((value) => value !== undefined && value !== null && value !== ''))];
}

function naturalSort(a, b) {
  return String(a).localeCompare(String(b), 'en', { numeric: true });
}

function md(value) {
  return String(value ?? '')
    .replaceAll('\\', '\\\\')
    .replaceAll('|', '\\|')
    .replaceAll('\r', ' ')
    .replaceAll('\n', '<br>');
}

function normalizePath(filePath) {
  return filePath.replaceAll(path.sep, '/');
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function walkFiles(root) {
  const results = [];
  const stack = [root];

  while (stack.length) {
    const current = stack.pop();
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(fullPath);
      } else if (entry.isFile()) {
        results.push(fullPath);
      }
    }
  }

  return results.sort(naturalSort);
}
