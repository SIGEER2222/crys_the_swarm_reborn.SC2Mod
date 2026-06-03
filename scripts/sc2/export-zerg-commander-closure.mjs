import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const officialCommanderRoot = path.join(repoRoot, '游戏数据/官方合作指挥官/commanders');
const officialRawRoot = path.join(repoRoot, '游戏数据/官方SC2原始文本镜像');
const outputDir = path.join(repoRoot, 'docs/newdocs/指挥官细化/虫族闭包');
const outputMarkdownPath = path.join(outputDir, '虫族指挥官完整闭包-2026-06-03.md');
const outputJsonPath = path.join(outputDir, 'zerg-commander-closure.json');

const zergCommanders = [
  { id: 'Abathur', zh: '阿巴瑟' },
  { id: 'Kerrigan', zh: '凯瑞甘' },
  { id: 'Zagara', zh: '扎加拉' },
  { id: 'Stetmann', zh: '斯台特曼' },
  { id: 'Stukov', zh: '斯托科夫' },
  { id: 'Dehaka', zh: '德哈卡' },
];

const commanderOwnerRules = [
  { owner: 'Abathur', label: 'Abathur', pattern: /Abathur|RoachVile|RavagerAbathur|Brutalisk|Leviathan/ },
  { owner: 'Kerrigan', label: 'Kerrigan', pattern: /Kerrigan|K5Kerrigan|PsiStrike|PrimalSlash|MindBolt|PsionicLift/ },
  { owner: 'Zagara', label: 'Zagara', pattern: /Zagara/ },
  { owner: 'Stetmann', label: 'Stetmann', pattern: /Stetmann|Gary/ },
  { owner: 'Stukov', label: 'Stukov', pattern: /Stukov|(?:^|[^A-Za-z0-9])SI[A-Z][A-Za-z0-9_]*/ },
  { owner: 'Dehaka', label: 'Dehaka', pattern: /Dehaka|Glevig|Murvar|Dakrun/ },
];

const defaultAbilityFaces = new Set([
  'AcquireMove',
  'Attack',
  'AttackBuilding',
  'Cancel',
  'CancelBuilding',
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

const defaultAbilityIds = new Set(['attack', 'BuildInProgress', 'BuildInProgressZerg', 'halt', 'move', 'stop']);

const workerProducerUnitIds = new Set(['Drone', 'DroneStetmann', 'DehakaDrone', 'SIDrone']);

const standardZergWorkerBuildCatalog = [
  { producer_unit_id: 'Drone', button_face: 'Hatchery', abil_cmd: 'ZergBuild,Build1', ability_id: 'ZergBuild', command_index: 'Build1', unit: 'Hatchery', time: '100' },
  { producer_unit_id: 'Drone', button_face: 'Extractor', abil_cmd: 'ZergBuild,Build3', ability_id: 'ZergBuild', command_index: 'Build3', unit: 'Extractor', time: '30' },
  { producer_unit_id: 'Drone', button_face: 'SpawningPool', abil_cmd: 'ZergBuild,Build4', ability_id: 'ZergBuild', command_index: 'Build4', unit: 'SpawningPool', time: '65' },
  { producer_unit_id: 'Drone', button_face: 'EvolutionChamber', abil_cmd: 'ZergBuild,Build5', ability_id: 'ZergBuild', command_index: 'Build5', unit: 'EvolutionChamber', time: '35' },
  { producer_unit_id: 'Drone', button_face: 'HydraliskDen', abil_cmd: 'ZergBuild,Build6', ability_id: 'ZergBuild', command_index: 'Build6', unit: 'HydraliskDen', time: '40' },
  { producer_unit_id: 'Drone', button_face: 'Spire', abil_cmd: 'ZergBuild,Build7', ability_id: 'ZergBuild', command_index: 'Build7', unit: 'Spire', time: '92.4' },
  { producer_unit_id: 'Drone', button_face: 'UltraliskCavern', abil_cmd: 'ZergBuild,Build8', ability_id: 'ZergBuild', command_index: 'Build8', unit: 'UltraliskCavern', time: '65' },
  { producer_unit_id: 'Drone', button_face: 'InfestationPit', abil_cmd: 'ZergBuild,Build9', ability_id: 'ZergBuild', command_index: 'Build9', unit: 'InfestationPit', time: '50' },
  { producer_unit_id: 'Drone', button_face: 'NydusNetwork', abil_cmd: 'ZergBuild,Build10', ability_id: 'ZergBuild', command_index: 'Build10', unit: 'NydusNetwork', time: '50' },
  { producer_unit_id: 'Drone', button_face: 'BanelingNest', abil_cmd: 'ZergBuild,Build11', ability_id: 'ZergBuild', command_index: 'Build11', unit: 'BanelingNest', time: '60' },
  { producer_unit_id: 'Drone', button_face: 'RoachWarren', abil_cmd: 'ZergBuild,Build14', ability_id: 'ZergBuild', command_index: 'Build14', unit: 'RoachWarren', time: '55' },
  { producer_unit_id: 'Drone', button_face: 'SpineCrawler', abil_cmd: 'ZergBuild,Build15', ability_id: 'ZergBuild', command_index: 'Build15', unit: 'SpineCrawler', time: '50' },
  { producer_unit_id: 'Drone', button_face: 'SporeCrawler', abil_cmd: 'ZergBuild,Build16', ability_id: 'ZergBuild', command_index: 'Build16', unit: 'SporeCrawler', time: '30' },
  { producer_unit_id: 'Drone', button_face: 'ScourgeNest', abil_cmd: 'ZergBuild,Build25', ability_id: 'ZergBuild', command_index: 'Build25', unit: 'ScourgeNest', time: '60' },
  { producer_unit_id: 'Drone', button_face: 'ZagaraBileLauncher', abil_cmd: 'ZergBuild,Build27', ability_id: 'ZergBuild', command_index: 'Build27', unit: 'BileLauncherZagara', time: '40' },
];

const standardZergAcceptedWorkerTargets = {
  Abathur: new Set(['Hatchery', 'Extractor', 'EvolutionChamber', 'RoachWarren', 'SpineCrawler', 'SporeCrawler', 'Spire', 'InfestationPit']),
  Kerrigan: new Set(['Hatchery', 'Extractor', 'SpawningPool', 'EvolutionChamber', 'HydraliskDen', 'Spire', 'UltraliskCavern', 'NydusNetwork', 'SpineCrawler', 'SporeCrawler']),
  Zagara: new Set(['Hatchery', 'Extractor', 'SpawningPool', 'EvolutionChamber', 'BanelingNest', 'Spire', 'ScourgeNest', 'BileLauncherZagara', 'SpineCrawler', 'SporeCrawler']),
};

const effectiveOverrides = {
  Abathur: {
    excludeUnitIds: new Set(['Roach', 'RoachCorpser']),
    notes: [
      '满级有效蟑螂主线只保留 RoachVile；Roach 是基础审计项，RoachCorpser 是遗留/外部审计项。',
      'Ravager 只接受 RoachVile -> MorphRoachVileToRavager -> RavagerAbathur；普通 Roach/RoachCorpser 分支只作排除候选。',
      '普通 NydusNetwork 不在官方 Abathur buildings.json，也不应通过共享 ZergBuild,Build10 进入有效建筑链。',
    ],
  },
};

const rawIndex = buildRawGameDataIndex();
const closure = {
  generated_at: '2026-06-03',
  scope: 'Zerg commanders only',
  official_sources: {
    commander_json_root: normalizePath(path.relative(repoRoot, officialCommanderRoot)),
    raw_text_mirror_root: normalizePath(path.relative(repoRoot, officialRawRoot)),
  },
  raw_index_stats: rawIndex.stats,
  commanders: zergCommanders.map((commander) => buildCommanderClosure(commander)),
};

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(outputJsonPath, `${JSON.stringify(closure, null, 2)}\n`, 'utf8');
fs.writeFileSync(outputMarkdownPath, renderMarkdown(closure), 'utf8');

console.log(`已输出虫族指挥官闭包 Markdown：${normalizePath(path.relative(repoRoot, outputMarkdownPath))}`);
console.log(`已输出虫族指挥官闭包 JSON：${normalizePath(path.relative(repoRoot, outputJsonPath))}`);

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

  const override = effectiveOverrides[commanderInfo.id] || { excludeUnitIds: new Set(), notes: [] };
  const effectiveUnits = units.filter((entry) => !override.excludeUnitIds.has(entry.id));
  const auditOnlyUnits = units.filter((entry) => override.excludeUnitIds.has(entry.id));
  const identity = buildCommanderIdentity({ heroes, units: effectiveUnits, buildings, roster, otherTechEntries });
  const context = { commander: commanderInfo.id, identity, override };

  const topBarAbilityCommands = summarizeCommanderAbilityCommands({
    context,
    commands: commander.default_ability_commands || [],
    source: 'commander.default_ability_commands',
  });

  const progressionAbilityCommands = (progression.perks || [])
    .filter((perk) => Number(perk.level) <= 15)
    .flatMap((perk) =>
      summarizeCommanderAbilityCommands({
        context,
        commands: perk.ability_commands || [],
        source: `progression.level.${perk.level}.${perk.id}`,
        level: perk.level,
        label: perk.name || perk.id,
      }),
    );

  const unitClosures = effectiveUnits.map((entry) => buildTechEntryClosure({ entry, type: 'unit', context }));
  const buildingClosures = buildings.map((entry) => buildTechEntryClosure({ entry, type: 'building', context }));
  const heroClosures = heroes.map((entry) => buildTechEntryClosure({ entry, type: 'hero', context }));
  const allClosures = [...heroClosures, ...unitClosures, ...buildingClosures];
  const acceptedProduction = allClosures.flatMap((entry) =>
    entry.production_options.accepted.map((option) => ({ owner: entry.id, owner_type: entry.type, ...option })),
  );
  const rejectedProduction = allClosures.flatMap((entry) =>
    entry.production_options.excluded.map((option) => ({ owner: entry.id, owner_type: entry.type, ...option })),
  );
  const acceptedAbilities = allClosures.flatMap((entry) =>
    entry.abilities.accepted.map((ability) => ({ owner: entry.id, owner_type: entry.type, ...ability })),
  );
  const rejectedAbilities = allClosures.flatMap((entry) =>
    entry.abilities.excluded.map((ability) => ({ owner: entry.id, owner_type: entry.type, ...ability })),
  );
  const workerBuildCommands = uniqueBy(
    [
      ...buildSupplementalWorkerBuildCommands(context.commander),
      ...acceptedProduction.filter((option) => option.stage === 'worker_build' || option.stage === 'worker_build_prereq'),
    ],
    (option) => `${option.producer_unit_id}|${option.abil_cmd}|${option.unit}`,
  );

  return {
    commander: commanderInfo.id,
    zh_name: commanderInfo.zh,
    official_name: commander.name,
    commander_json_dir: normalizePath(path.relative(repoRoot, commanderDir)),
    assumptions: [
      'level_15',
      'all_six_masteries_maxed',
      'positive_prestige_fusion_only',
      'official_commander_json_first',
      'raw_text_mirror_ability_summary',
      'shared_catalog_entries_are_audit_input_only',
    ],
    effective_notes: override.notes,
    official_roster: {
      heroes: summarizeIds(heroes),
      units_all_from_json: summarizeIds(units),
      units_effective: summarizeIds(effectiveUnits),
      units_audit_only: summarizeIds(auditOnlyUnits),
      buildings: summarizeIds(buildings),
      roster: summarizeIds(roster),
      other_tech_entries: summarizeIds(otherTechEntries),
      upgrades: upgrades.map((upgrade) => upgrade.id).filter(Boolean).sort(naturalSort),
    },
    top_bar_ability_commands: topBarAbilityCommands,
    progression_ability_commands: progressionAbilityCommands,
    worker_build_commands: workerBuildCommands,
    larva_mutations: uniqueBy(
      acceptedProduction.filter((option) => option.stage === 'larva_mutation'),
      (option) => `${option.abil_cmd}|${option.unit}|${option.owner}`,
    ),
    evolution_morphs: uniqueBy(
      acceptedProduction.filter((option) => option.stage === 'evolution_morph' || option.stage === 'cocoon_morph'),
      (option) => `${option.producer_unit_id}|${option.abil_cmd}|${option.unit}|${option.owner}`,
    ),
    trained_or_spawned_units: uniqueBy(
      acceptedProduction.filter((option) => option.stage === 'building_train' || option.stage === 'spawn_or_train'),
      (option) => `${option.producer_unit_id}|${option.abil_cmd}|${option.unit}|${option.owner}`,
    ),
    heroes: heroClosures,
    units: unitClosures,
    buildings: buildingClosures,
    shared_or_excluded_candidates: [...rejectedProduction, ...rejectedAbilities],
    counts: {
      heroes: heroes.length,
      units_all_from_json: units.length,
      units_effective: effectiveUnits.length,
      units_audit_only: auditOnlyUnits.length,
      buildings: buildings.length,
      worker_build_commands: workerBuildCommands.length,
      larva_mutations: uniqueBy(
        acceptedProduction.filter((option) => option.stage === 'larva_mutation'),
        (option) => `${option.abil_cmd}|${option.unit}|${option.owner}`,
      ).length,
      evolution_morphs: uniqueBy(
        acceptedProduction.filter((option) => option.stage === 'evolution_morph' || option.stage === 'cocoon_morph'),
        (option) => `${option.producer_unit_id}|${option.abil_cmd}|${option.unit}|${option.owner}`,
      ).length,
      accepted_abilities: acceptedAbilities.length,
      excluded_or_review_items: rejectedProduction.length + rejectedAbilities.length,
    },
  };
}

function buildTechEntryClosure({ entry, type, context }) {
  const targetIds = buildEntryTargetIds(entry);
  const productionOptions = (entry.production_options || []).map((option) =>
    classifyProductionOption({ option, entry, type, targetIds, context }),
  );
  const abilities = [...(entry.abilities || []), ...buildSupplementalAbilities({ entry, context })].map((ability) =>
    classifyAbility({ ability, context }),
  );

  return {
    type,
    id: entry.id,
    unit_id: entry.unit_id,
    name: entry.name,
    source: entry.source,
    target_ids: [...targetIds].sort(naturalSort),
    production_options: {
      accepted: productionOptions.filter((option) => option.status === 'accepted'),
      excluded: productionOptions.filter((option) => option.status !== 'accepted'),
    },
    abilities: {
      accepted: abilities.filter((ability) => ability.status === 'accepted'),
      excluded: abilities.filter((ability) => ability.status !== 'accepted'),
    },
  };
}

function classifyProductionOption({ option, entry, type, targetIds, context }) {
  const text = [
    option.producer_unit_id,
    option.button_face,
    option.abil_cmd,
    option.ability_id,
    option.command_index,
    option.unit,
    option.source_catalog,
    option.base_unit_id,
  ].join(' ');
  const otherOwnerHits = findOtherOwnerHits(text, context.commander);
  const reasons = [];
  const targetMatchesEntry = targetIds.has(option.unit) || targetIds.has(option.base_unit_id);
  const workerBuild = isWorkerBuildOption(option);
  const larvaMutation = isLarvaMutationOption(option);
  const morph = isMorphOption(option);

  if (otherOwnerHits.length) {
    reasons.push(...otherOwnerHits.map((hit) => `other_commander_owner:${hit.owner}:${hit.label}`));
  }

  if (context.commander === 'Abathur' && entry.id === 'Ravager') {
    const isEffectiveRavager =
      option.producer_unit_id === 'RoachVile' &&
      option.ability_id === 'MorphRoachVileToRavager' &&
      option.unit === 'RavagerAbathur';
    if (!isEffectiveRavager) {
      reasons.push('abathur_full_level_ravager_requires_roach_vile');
    }
  }

  if (context.commander === 'Abathur' && option.unit === 'NydusNetwork') {
    reasons.push('abathur_nydus_network_not_in_buildings_json');
  }

  if (reasons.length) {
    return summarizeProductionOption(option, {
      status: 'excluded',
      stage: stageForProductionOption(option, { workerBuild, larvaMutation, morph, targetMatchesEntry }),
      reasons,
    });
  }

  if (targetMatchesEntry || workerBuild || larvaMutation || morph || type === 'building') {
    return summarizeProductionOption(option, {
      status: 'accepted',
      stage: stageForProductionOption(option, { workerBuild, larvaMutation, morph, targetMatchesEntry }),
      reasons: targetMatchesEntry ? ['target_matches_current_entry'] : ['functional_prerequisite_or_spawn_chain'],
    });
  }

  return summarizeProductionOption(option, {
    status: 'excluded',
    stage: stageForProductionOption(option, { workerBuild, larvaMutation, morph, targetMatchesEntry }),
    reasons: ['target_not_in_effective_entry_ids'],
  });
}

function classifyAbility({ ability, context }) {
  const [abilityId, commandIndex = ''] = splitAbilCmd(ability.abil_cmd || '');
  const raw = summarizeRawAbility(abilityId, commandIndex, ability.tooltip || '', [ability.requirements]);
  const text = [
    ability.face,
    ability.type,
    ability.abil_cmd,
    ability.requirements,
    ability.name,
    ability.tooltip,
    rawToSearchText(raw),
  ].join(' ');
  const otherOwnerHits = findOtherOwnerHits(text, context.commander);
  const reasons = [];

  if (isDefaultAbility({ ability, abilityId })) {
    reasons.push('default_command_hidden_from_markdown_but_kept_out_of_accepted_chain');
  }
  if (otherOwnerHits.length) {
    reasons.push(...otherOwnerHits.map((hit) => `other_commander_owner:${hit.owner}:${hit.label}`));
  }

  return {
    face: ability.face || '',
    name: ability.name || ability.face || '',
    type: ability.type || '',
    abil_cmd: ability.abil_cmd || '',
    ability_id: abilityId,
    command_index: commandIndex,
    requirements: ability.requirements || '',
    tooltip: compactText(ability.tooltip || ''),
    status: reasons.length ? 'excluded' : 'accepted',
    reasons,
    raw,
  };
}

function summarizeCommanderAbilityCommands({ context, commands, source, level = '', label = '' }) {
  return commands.map((command) => {
    const abilityId = command.abil || '';
    const commandIndex = command.cmd || '';
    const abilCmd = formatAbilCmd(abilityId, commandIndex);
    const raw = summarizeRawAbility(abilityId, commandIndex);
    const otherOwnerHits = findOtherOwnerHits([source, label, abilityId, commandIndex, rawToSearchText(raw)].join(' '), context.commander);
    const reasons = otherOwnerHits.map((hit) => `other_commander_owner:${hit.owner}:${hit.label}`);

    if (context.commander === 'Abathur' && abilityId === 'MorphRoachToRavager') {
      reasons.push('abathur_full_level_ravager_uses_morph_roach_vile_to_ravager');
    }

    return {
      source,
      level,
      label,
      ability_id: abilityId,
      command_index: commandIndex,
      abil_cmd: abilCmd,
      status: reasons.length ? 'excluded' : 'accepted',
      reasons,
      raw,
    };
  });
}

function buildSupplementalWorkerBuildCommands(commander) {
  const acceptedTargets = standardZergAcceptedWorkerTargets[commander];
  if (!acceptedTargets) {
    return [];
  }

  return standardZergWorkerBuildCatalog
    .filter((option) => acceptedTargets.has(option.unit))
    .map((option) =>
      summarizeProductionOption(
        { ...option, source_catalog: 'raw_worker_build_catalog', minerals: '', vespene: '', base_unit_id: '' },
        {
          status: 'accepted',
          stage: 'worker_build',
          reasons: ['supplemented_from_raw_zerg_worker_build_catalog'],
        },
      ),
    )
    .map((option) => ({ owner: option.unit, owner_type: 'raw_worker_build', ...option }));
}

function buildSupplementalAbilities({ entry, context }) {
  if (context.commander === 'Abathur' && entry.id === 'Ravager') {
    return [
      {
        face: 'BurrowUp',
        type: 'AbilCmd',
        abil_cmd: 'BurrowRavagerAbathurUp,Execute',
        requirements: '',
        name: '出地',
        tooltip: '阿巴瑟破坏者潜地形态返回 RavagerAbathur；补自 raw 形态链，防止只接潜地不接出地。',
      },
    ];
  }

  return [];
}

function stageForProductionOption(option, { workerBuild, larvaMutation, morph, targetMatchesEntry }) {
  if (workerBuild && targetMatchesEntry) return 'worker_build';
  if (workerBuild) return 'worker_build_prereq';
  if (larvaMutation) return 'larva_mutation';
  if (morph && /Cocoon|Egg/i.test(option.producer_unit_id || '')) return 'cocoon_morph';
  if (morph) return 'evolution_morph';
  if (/Train|Spawn/i.test(option.ability_id || '')) return 'spawn_or_train';
  if (targetMatchesEntry) return 'production_or_morph';
  return 'tech_prerequisite';
}

function summarizeProductionOption(option, { status, stage, reasons }) {
  const [abilityIdFromCommand, commandIndexFromCommand] = splitAbilCmd(option.abil_cmd || '');
  const raw = summarizeRawAbility(
    option.ability_id || abilityIdFromCommand,
    option.command_index || commandIndexFromCommand,
  );
  return {
    status,
    stage,
    reasons,
    producer_unit_id: option.producer_unit_id || '',
    button_face: option.button_face || '',
    abil_cmd: option.abil_cmd || formatAbilCmd(option.ability_id, option.command_index),
    ability_id: option.ability_id || '',
    command_index: option.command_index || '',
    unit: option.unit || '',
    base_unit_id: option.base_unit_id || '',
    minerals: option.minerals || '',
    vespene: option.vespene || '',
    time: option.time || '',
    source_catalog: option.source_catalog || '',
    cost_mode: option.cost_mode || '',
    raw,
  };
}

function buildCommanderIdentity({ heroes, units, buildings, roster, otherTechEntries }) {
  const ids = new Set();
  for (const entry of [...heroes, ...units, ...buildings, ...roster, ...otherTechEntries]) {
    for (const id of buildEntryTargetIds(entry)) ids.add(id);
  }
  return { targetIds: ids };
}

function buildEntryTargetIds(entry) {
  const ids = new Set();
  for (const value of [entry.id, entry.unit_id, entry.production?.unit, ...(entry.resolved_unit_ids || [])]) {
    if (value) ids.add(value);
  }
  return ids;
}

function buildRawGameDataIndex() {
  const buckets = {
    abilities: createDefinitionBucket(),
    effects: createDefinitionBucket(),
    requirements: createDefinitionBucket(),
    buttons: createDefinitionBucket(),
  };
  const files = getAllFiles(officialRawRoot).filter((file) => /(?:abil|effect|requirement|button)data\.xml$/i.test(file));

  files.forEach((filePath, order) => {
    const text = fs.readFileSync(filePath, 'utf8');
    scanXmlDefinitions(text, filePath, sourcePriorityScore(filePath, order), buckets);
  });

  for (const bucket of Object.values(buckets)) {
    finalizeBucket(bucket);
  }

  return {
    ...buckets,
    stats: {
      files: files.length,
      ability_definitions: countDefinitions(buckets.abilities),
      abilities: buckets.abilities.best.size,
      effect_definitions: countDefinitions(buckets.effects),
      effects: buckets.effects.best.size,
      requirement_definitions: countDefinitions(buckets.requirements),
      requirements: buckets.requirements.best.size,
    },
  };
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

function summarizeRawAbility(abilityId, commandIndex = '', tooltip = '', extraRequirementIds = []) {
  if (!abilityId || defaultAbilityIds.has(abilityId)) {
    return null;
  }

  const definition = rawIndex.abilities.best.get(abilityId);
  const parentDefinition = definition?.attrs?.parent ? rawIndex.abilities.best.get(definition.attrs.parent) : null;
  const body = [parentDefinition?.body || '', definition?.body || ''].filter(Boolean).join('\n');
  const ownCommandBlock = commandIndex ? findIndexedBlock(definition?.body || '', commandIndex) : '';
  const parentCommandBlock = commandIndex ? findIndexedBlock(parentDefinition?.body || '', commandIndex) : '';
  const commandBlock = ownCommandBlock || parentCommandBlock;
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
  const requirementIds = unique([
    ...extractAttributeValues(scopedBody, 'Requirements'),
    ...extraRequirementIds.filter(Boolean),
  ]).filter(Boolean);

  if (!definition) {
    return {
      found: false,
      ability_id: abilityId,
      command_index: commandIndex || '',
      tooltip_refs: tooltipRefs,
      effect_ids: effectIds,
      effect_closure: summarizeEffectClosure(effectIds),
      requirements: summarizeRequirements(requirementIds),
    };
  }

  return {
    found: true,
    ability_id: abilityId,
    command_index: commandIndex || '',
    kind: definition.tag,
    parent: definition.attrs?.parent || '',
    source: normalizePath(path.relative(repoRoot, definition.filePath)),
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
    ranges: extractAttributeValues(body, 'Range'),
    target_filters: first(extractTagValue(body, 'TargetFilters')),
    autocast_filters: first(extractTagValue(body, 'AutoCastFilters')),
    button_faces: extractAttributeValues(scopedBody, 'DefaultButtonFace'),
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

  while (queue.length && effects.length < 32) {
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

function renderMarkdown(data) {
  const lines = [];
  lines.push('# 虫族指挥官完整闭包（官方数据）');
  lines.push('');
  lines.push(`生成日期：${data.generated_at}`);
  lines.push('');
  lines.push('本文件由 `scripts/sc2/export-zerg-commander-closure.mjs` 从官方数据生成。归属判定先读取 `游戏数据/官方合作指挥官/commanders/<Commander>/`，再用 `游戏数据/官方SC2原始文本镜像/` 补 `AbilData / EffectData / RequirementData` 摘要。');
  lines.push('');
  lines.push('口径：15 级、六项精通全满、只取威望正向融合；共享 Catalog 只作审计输入，不能绕过 commander JSON 和满级有效链过滤。');
  lines.push('');
  lines.push('完整机器可读闭包：`docs/newdocs/指挥官细化/虫族闭包/zerg-commander-closure.json`。Markdown 为可读摘要，默认移动/停止/巡逻等基础命令会折叠，完整按钮保留在 JSON。');
  lines.push('');

  for (const commander of data.commanders) {
    lines.push(`## ${commander.zh_name} / ${commander.commander}`);
    lines.push('');
    lines.push(`官方 JSON：\`${commander.commander_json_dir}\``);
    lines.push('');
    if (commander.effective_notes.length) {
      lines.push('有效链提醒：');
      for (const note of commander.effective_notes) lines.push(`- ${note}`);
      lines.push('');
    }
    lines.push(`- 英雄：${renderIdList(commander.official_roster.heroes)}`);
    lines.push(`- 兵种（满级有效）：${renderIdList(commander.official_roster.units_effective)}`);
    if (commander.official_roster.units_audit_only.length) {
      lines.push(`- 兵种（审计保留/不进主链）：${renderIdList(commander.official_roster.units_audit_only)}`);
    }
    lines.push(`- 建筑：${renderIdList(commander.official_roster.buildings)}`);
    lines.push('');

    renderCommandTable(lines, '顶部 / 等级技能命令', [
      ...commander.top_bar_ability_commands,
      ...commander.progression_ability_commands,
    ]);
    renderProductionTable(lines, '工蜂/私有劳工建造命令', commander.worker_build_commands);
    renderProductionTable(lines, '幼虫变异', commander.larva_mutations);
    renderProductionTable(lines, '形态进化 / 茧孵化', commander.evolution_morphs);
    renderProductionTable(lines, '建筑训练 / 召唤', commander.trained_or_spawned_units);
    renderTechClosureTable(lines, '英雄技能链', commander.heroes);
    renderTechClosureTable(lines, '兵种技能链', commander.units);
    renderTechClosureTable(lines, '建筑技能链', commander.buildings);
    renderExcludedTable(lines, commander.shared_or_excluded_candidates);
  }

  return `${lines.join('\n')}\n`;
}

function renderCommandTable(lines, title, commands) {
  const accepted = commands.filter((item) => item.status === 'accepted');
  if (!accepted.length) return;
  lines.push(`### ${title}`);
  lines.push('');
  lines.push('| 来源 | 命令 | Raw 摘要 | 效果闭包 | 状态 |');
  lines.push('|---|---|---|---|---|');
  for (const item of accepted.slice(0, 80)) {
    const source = item.level ? `Lv${item.level} ${item.label}` : item.source;
    lines.push(
      `| ${escapePipe(source)} | ${escapePipe(item.abil_cmd)} | ${escapePipe(formatRawSummary(item.raw))} | ${escapePipe(renderEffectSummary(item.raw?.effect_closure))} | ${escapePipe(renderStatus(item))} |`,
    );
  }
  lines.push('');
}

function renderProductionTable(lines, title, options) {
  if (!options.length) return;
  lines.push(`### ${title}`);
  lines.push('');
  lines.push('| Owner | Producer | 命令 | 目标 | 成本/时间 | Raw 摘要 | 效果闭包 |');
  lines.push('|---|---|---|---|---|---|---|');
  for (const option of options.slice(0, 120)) {
    lines.push(
      `| ${escapePipe(option.owner || '')} | ${escapePipe(option.producer_unit_id)} | ${escapePipe(option.abil_cmd)} | ${escapePipe(option.unit)} | ${escapePipe(formatCost(option))} | ${escapePipe(formatRawSummary(option.raw))} | ${escapePipe(renderEffectSummary(option.raw?.effect_closure))} |`,
    );
  }
  lines.push('');
}

function renderTechClosureTable(lines, title, entries) {
  const rows = entries
    .map((entry) => ({
      entry,
      abilities: entry.abilities.accepted.filter((ability) => !ability.reasons.includes('default_command_hidden_from_markdown_but_kept_out_of_accepted_chain')),
    }))
    .filter((row) => row.abilities.length);
  if (!rows.length) return;

  lines.push(`### ${title}`);
  lines.push('');
  lines.push('| 对象 | 接受技能按钮 |');
  lines.push('|---|---|');
  for (const { entry, abilities } of rows.slice(0, 120)) {
    lines.push(`| ${escapePipe(entry.id)}（${escapePipe(entry.name || '-') }） | ${escapePipe(abilities.map(formatAbilitySummary).join('<br>'))} |`);
  }
  lines.push('');
}

function renderExcludedTable(lines, items) {
  if (!items.length) return;
  lines.push('### 排除 / 待复核候选');
  lines.push('');
  lines.push('| Owner | Section | 命令 | 原因 |');
  lines.push('|---|---|---|---|');
  for (const item of items.slice(0, 80)) {
    const command = item.abil_cmd || item.face || item.ability_id || '';
    lines.push(`| ${escapePipe(item.owner || '')} | ${escapePipe(item.owner_type || '')} | ${escapePipe(command)} | ${escapePipe((item.reasons || []).join(', '))} |`);
  }
  lines.push('');
}

function isWorkerBuildOption(option) {
  const abilityId = option.ability_id || '';
  if (/^(ZergBuild|ZergBuildStetmann|DehakaDroneMorph|SIBasicBuild|SIAdvancedBuild)$/.test(abilityId)) {
    return true;
  }

  return workerProducerUnitIds.has(option.producer_unit_id || '') && /Build/i.test(abilityId);
}

function isLarvaMutationOption(option) {
  return /Larva/i.test(option.producer_unit_id || '') || /LarvaTrain/i.test(option.ability_id || '');
}

function isMorphOption(option) {
  return /Morph|Morphto|MorphTo|Evolve/i.test(option.ability_id || '') || /Morph|Evolve/i.test(option.abil_cmd || '');
}

function isDefaultAbility({ ability, abilityId }) {
  return defaultAbilityFaces.has(ability.face) || defaultAbilityIds.has(abilityId);
}

function findOtherOwnerHits(text, currentCommander) {
  return commanderOwnerRules
    .filter((rule) => rule.owner !== currentCommander && rule.pattern.test(text))
    .map((rule) => ({ owner: rule.owner, label: rule.label }));
}

function summarizeIds(entries) {
  return entries
    .map((entry) => ({
      id: entry.id,
      unit_id: entry.unit_id,
      name: entry.name,
      target_ids: [...buildEntryTargetIds(entry)].sort(naturalSort),
    }))
    .sort((a, b) => naturalSort(a.id, b.id));
}

function formatAbilitySummary(ability) {
  const req = renderRequirementSummary(ability.requirements);
  const raw = formatRawSummary(ability.raw);
  const effects = renderEffectSummary(ability.raw?.effect_closure);
  return `${ability.name || ability.face} [${ability.abil_cmd || ability.face}]${req}${raw ? `; ${raw}` : ''}${effects ? `; effects=${effects}` : ''}`;
}

function formatRawSummary(raw) {
  if (!raw) return '';
  if (!raw.found) {
    const tooltipEffects = raw.tooltip_refs?.effects?.length ? `tooltip_effects=${raw.tooltip_refs.effects.join('/')}` : '';
    const requirementIds = renderRequirementSummary(raw.requirements);
    return tooltipEffects || requirementIds || 'raw_missing';
  }
  const parts = [raw.kind];
  if (raw.command?.found) {
    const commandBits = [];
    if (raw.command.unit) commandBits.push(`unit=${raw.command.unit}`);
    if (raw.command.upgrade) commandBits.push(`upgrade=${raw.command.upgrade}`);
    if (raw.command.time) commandBits.push(`time=${raw.command.time}`);
    if (raw.command.requirements) commandBits.push(`req=${raw.command.requirements}`);
    if (Object.keys(raw.command.resources || {}).length) commandBits.push(`cost=${formatResourceObject(raw.command.resources)}`);
    parts.push(`cmd(${commandBits.join(',') || raw.command.index})`);
  }
  if (raw.cooldowns?.length) {
    parts.push(`cd=${raw.cooldowns.map(formatCooldown).join('/')}`);
  }
  if (raw.ranges?.length) {
    parts.push(`range=${raw.ranges.join('/')}`);
  } else if (raw.range) {
    parts.push(`range=${raw.range}`);
  }
  return parts.filter(Boolean).join('; ');
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

function first(values) {
  return values?.find((value) => value !== undefined && value !== null && value !== '') || '';
}

function unique(values) {
  return [...new Set(values.filter((value) => value !== undefined && value !== null && value !== ''))];
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function renderRawSummary(raw) {
  if (!raw) {
    return '';
  }
  if (!raw.found) {
    const tooltipEffects = raw.tooltip_refs?.effects?.length ? `tooltip_effects=${raw.tooltip_refs.effects.join('/')}` : '';
    const requirementIds = renderRequirementSummary(raw.requirements);
    return tooltipEffects || requirementIds || 'raw_missing';
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
  if (raw.ranges?.length) {
    bits.push(`range=${raw.ranges.join('/')}`);
  } else if (raw.range) {
    bits.push(`range=${raw.range}`);
  }
  return bits.filter(Boolean).join('; ');
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

function renderRequirementSummary(requirements) {
  if (!requirements?.length) {
    return '';
  }

  if (typeof requirements === 'string') {
    const text = compactText(requirements);
    return text ? ` req=${text}` : '';
  }

  const summary = requirements
    .slice(0, 8)
    .map((requirement) => {
      if (typeof requirement === 'string') {
        return requirement;
      }
      return requirement?.found ? requirement.id : `${requirement?.id || 'unknown'}(missing)`;
    })
    .filter(Boolean)
    .join('/');
  return summary ? ` req=${summary}` : '';
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
      if (effect.behavior) bits.push(`behavior=${effect.behavior}`);
      if (effect.validator) bits.push(`validator=${effect.validator}`);
      return bits.join(':');
    })
    .join('<br>');
}

function renderStatus(item) {
  const status = item.status || 'accepted';
  const reasons = item.reasons?.length ? `: ${item.reasons.join(', ')}` : '';
  return `${status}${reasons}`;
}

function rawToSearchText(raw) {
  if (!raw) return '';
  return [
    raw.ability_id,
    raw.command_index,
    raw.kind,
    raw.parent,
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

function renderIdList(entries) {
  if (!entries.length) return '-';
  return entries.map((entry) => `${entry.id}${entry.name ? `（${entry.name}）` : ''}`).join('、');
}

function formatCost(option) {
  const parts = [];
  if (option.minerals) parts.push(`M${option.minerals}`);
  if (option.vespene) parts.push(`G${option.vespene}`);
  if (option.time) parts.push(`T${option.time}`);
  return parts.join('/') || '-';
}

function formatAbilCmd(abilityId, commandIndex) {
  if (!abilityId) return '';
  return commandIndex ? `${abilityId},${commandIndex}` : abilityId;
}

function splitAbilCmd(abilCmd) {
  const [abilityId = '', commandIndex = ''] = String(abilCmd || '').split(',');
  return [abilityId, commandIndex];
}

function collectUniqueMatches(text, regex) {
  return [...new Set([...text.matchAll(regex)].map((match) => match[1]).filter(Boolean))];
}

function uniqueBy(items, keySelector) {
  const seen = new Set();
  const result = [];
  for (const item of items) {
    const key = keySelector(item);
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(item);
  }
  return result;
}

function sourceRank(source) {
  if (source.includes('/mods/starcoop/commanders/egonstetmann.sc2mod/')) return 0;
  if (source.includes('/mods/starcoop/starcoop.sc2mod/')) return 1;
  if (source.includes('/mods/swarmmulti.sc2mod/')) return 2;
  if (source.includes('/mods/swarm.sc2mod/')) return 3;
  if (source.includes('/mods/voidmulti.sc2mod/')) return 4;
  return 10;
}

function getAllFiles(rootDir) {
  const files = [];
  for (const entry of fs.readdirSync(rootDir, { withFileTypes: true })) {
    const fullPath = path.join(rootDir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getAllFiles(fullPath));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function normalizePath(value) {
  return value.replace(/\\/g, '/');
}

function compactText(value) {
  return String(value).replace(/\s+/g, ' ').trim();
}

function escapePipe(value) {
  return String(value ?? '').replace(/\|/g, '\\|').replace(/\r?\n/g, '<br>');
}

function naturalSort(a, b) {
  return String(a).localeCompare(String(b), 'en', { numeric: true });
}
