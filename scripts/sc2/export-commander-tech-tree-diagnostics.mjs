import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const officialRoot = path.join(repoRoot, '游戏数据', '官方合作指挥官');
const commanderRoot = path.join(officialRoot, 'commanders');
const rawMirrorRoot = path.join(repoRoot, '游戏数据', '官方SC2原始文本镜像');
const defaultActiveModRoot = path.join(repoRoot, '合作指挥官版起义狂潮');

const commanderDisplayNameFallbacks = {
  Abathur: '阿巴瑟',
  Alarak: '阿拉纳克',
  Artanis: '阿塔尼斯',
  Dehaka: '德哈卡',
  Fenix: '菲尼克斯',
  Horner: '霍纳与汉',
  Karax: '凯拉克斯',
  Kerrigan: '凯瑞甘',
  Mengsk: '蒙斯克',
  Nova: '诺娃',
  Raynor: '雷诺',
  Stetmann: '斯台特曼',
  Stukov: '斯托科夫',
  Swann: '斯旺',
  Tychus: '泰凯斯',
  Vorazun: '沃拉尊',
  Zagara: '扎加拉',
  Zeratul: '泽拉图',
};

function displayCommanderName(name, commanderId) {
  return name && name !== commanderId
    ? name
    : commanderDisplayNameFallbacks[commanderId] || commanderId;
}

const catalogRoots = [
  'mods/core.sc2mod',
  'mods/liberty.sc2mod',
  'campaigns/libertystory.sc2campaign',
  'mods/libertymulti.sc2mod',
  'mods/swarm.sc2mod',
  'campaigns/swarmstory.sc2campaign',
  'mods/swarmmulti.sc2mod',
  'mods/void.sc2mod',
  'campaigns/voidstory.sc2campaign',
  'mods/voidmulti.sc2mod',
  'mods/missionpacks/novacampaign.sc2mod',
  'mods/novastoryassets.sc2mod',
  'mods/starcoop/starcoop.sc2mod',
  'mods/starcoop/commanders/egonstetmann.sc2mod',
  'mods/starcoop/commanders/arcturusmengsk.sc2mod',
];

const officialCatalogFileNames = new Set(['abildata.xml', 'effectdata.xml', 'unitdata.xml']);
const modCatalogFileNames = new Set([
  'abildata.xml',
  'behaviordata.xml',
  'buttondata.xml',
  'effectdata.xml',
  'unitdata.xml',
  'upgradedata.xml',
  'userdata.xml',
  'validatordata.xml',
]);
const basicAbilityIds = new Set([
  'attack',
  'BuildInProgress',
  'move',
  'stop',
]);
const basicButtonFaces = new Set([
  'AcquireMove',
  'Attack',
  'Cancel',
  'CancelBuilding',
  'Halt',
  'Move',
  'MoveHoldPosition',
  'MovePatrol',
  'SelectBuilder',
  'Stop',
]);
const standardProductionAbilityIds = new Set([
  'GatewayTrain',
  'WarpGateTrain',
  'RoboticsFacilityTrain',
  'RoboticsFacilityWarpTrain',
  'StargateTrain',
  'StargateWarpTrain',
]);
const standardProductionStructureIds = new Set([
  'Gateway',
  'WarpGate',
  'RoboticsFacility',
  'RoboticsFacilityWarp',
  'Stargate',
  'StargateWarp',
]);
const commanderOpenerRoles = [
  { field: 'CommandCenter', id: 'command_center', name: '初始基地 / Command Center', kind: 'building' },
  { field: 'Worker', id: 'worker', name: '初始工人 / Worker', kind: 'unit' },
  { field: 'SecondUnit', id: 'second_unit', name: '第二初始单位 / Second Unit', kind: 'unit' },
];

const chineseTypeNames = {
  CAbilArmMagazine: '弹仓/机库技能',
  CAbilAttack: '攻击技能',
  CAbilBehavior: '行为/被动技能',
  CAbilBuild: '建造技能',
  CAbilEffectInstant: '瞬发效果技能',
  CAbilEffectTarget: '目标效果技能',
  CAbilHarvest: '采集技能',
  CAbilInteract: '交互技能',
  CAbilInventory: '物品栏技能',
  CAbilLearn: '学习技能',
  CAbilMerge: '合并技能',
  CAbilMorph: '变形技能',
  CAbilMorphPlacement: '放置变形技能',
  CAbilQueue: '队列技能',
  CAbilRedirectInstant: '瞬发重定向技能',
  CAbilResearch: '研究技能',
  CAbilRevive: '复活技能',
  CAbilTrain: '训练技能',
  CAbilTransport: '运输技能',
  CAbilWarpTrain: '折跃/部署训练技能',
  CEffectApplyBehavior: '施加行为效果',
  CEffectCreateHealer: '创建治疗者效果',
  CEffectCreatePersistent: '持续效果',
  CEffectCreateUnit: '创建单位效果',
  CEffectDamage: '伤害效果',
  CEffectEnumArea: '区域枚举效果',
  CEffectIssueOrder: '下令效果',
  CEffectLaunchMissile: '发射弹体效果',
  CEffectModifyPlayer: '修改玩家效果',
  CEffectModifyUnit: '修改单位效果',
  CEffectRemoveBehavior: '移除行为效果',
  CEffectSearchArea: '搜索区域效果',
  CEffectSet: '效果集合',
  CUnit: '单位/建筑',
};

const commanderOrderPreference = [
  'Raynor',
  'Kerrigan',
  'Artanis',
  'Swann',
  'Zagara',
  'Vorazun',
  'Karax',
  'Abathur',
  'Alarak',
  'Nova',
  'Stukov',
  'Fenix',
  'Dehaka',
  'Horner',
  'Tychus',
  'Zeratul',
  'Stetmann',
  'Mengsk',
];

const commanderModuleOverrides = {
  Horner: 'XMMira.SC2Mod',
};

const runtimeCommanderAliases = {
  Mira: 'Horner',
};

const args = parseArgs(process.argv.slice(2));
const selectedCommanderIds = new Set(args.commanders);
const includeBasicCommands = args.includeBasicCommands;
const effectDepth = args.effectDepth;
const activeModRoot = args.modRoot ? path.resolve(args.modRoot) : defaultActiveModRoot;
const outDir = args.outDir ? path.resolve(args.outDir) : defaultOutputDir(args.source);
const outCommanderDir = path.join(outDir, 'commanders');

fs.mkdirSync(outCommanderDir, { recursive: true });
clearGeneratedCommanderMarkdown(outCommanderDir);

const dataContext = args.source === 'mod'
  ? loadModDataContext(activeModRoot)
  : loadOfficialDataContext();
const commanderOrder = dataContext.commanderOrder
  .filter((id) => selectedCommanderIds.size === 0 || selectedCommanderIds.has(id));

if (commanderOrder.length === 0) {
  throw new Error(`没有匹配到指挥官：${[...selectedCommanderIds].join(', ')}`);
}

console.log(dataContext.indexMessage);
const catalog = dataContext.catalog;
console.log(
  `Catalog 索引完成：技能 ${catalog.abilities.size}、效果 ${catalog.effects.size}、单位/建筑 ${catalog.units.size}、按钮 ${catalog.buttons?.size || 0}、User ${catalog.users?.size || 0}，文件 ${catalog.fileCount}`,
);

const allCommanderData = dataContext.allCommanderData;
const report = {
  generated_at: new Date().toISOString(),
  scope: dataContext.scope,
  source_kind: args.source,
  commanders: commanderOrder.map((commanderId) => buildCommanderReport(commanderId, allCommanderData, catalog)),
  source_paths: dataContext.sourcePaths,
  source_description: dataContext.sourceDescription,
  options: {
    include_basic_commands: includeBasicCommands,
    effect_depth: effectDepth,
    mod_root: args.source === 'mod' ? normalizePath(path.relative(repoRoot, activeModRoot)) : '',
  },
};

report.summary = report.commanders.map((commander) => ({
  commander: commander.commander,
  name: commander.name,
  buildings: commander.summary.building_count,
  production_buildings: commander.summary.production_building_count || 0,
  units: commander.summary.unit_count,
  heroes: commander.summary.hero_count,
  building_panel_buttons: commander.summary.building_panel_button_count,
  unit_panel_buttons: commander.summary.unit_panel_button_count,
  produced_units: commander.summary.produced_unit_count,
  effect_refs: commander.summary.effect_ref_count,
}));

fs.writeFileSync(
  path.join(outDir, 'commander-tech-tree-diagnostics.json'),
  `${JSON.stringify(report, null, 2)}\n`,
  'utf8',
);
fs.writeFileSync(path.join(outDir, '指挥官科技链路排查总览.md'), `${renderOverviewMarkdown(report)}\n`, 'utf8');

for (const commander of report.commanders) {
  const fileName = `${commander.commander}-${sanitizeFilePart(commander.name)}.md`;
  fs.writeFileSync(path.join(outCommanderDir, fileName), `${renderCommanderMarkdown(commander)}\n`, 'utf8');
}

console.log(`已写出：${path.join(outDir, 'commander-tech-tree-diagnostics.json')}`);
console.log(`已写出：${path.join(outDir, '指挥官科技链路排查总览.md')}`);
console.log(`逐指挥官中文文档目录：${outCommanderDir}`);
for (const item of report.summary) {
  console.log(
    `${item.name}/${item.commander}: 建筑 ${item.buildings}, 单位 ${item.units}, 英雄 ${item.heroes}, 建筑按钮 ${item.building_panel_buttons}, 单位按钮 ${item.unit_panel_buttons}, 效果引用 ${item.effect_refs}`,
  );
}

function loadOfficialDataContext() {
  const officialIndex = readJson(path.join(officialRoot, 'official-coop-index.json'));
  return {
    scope: '官方合作指挥官科技链路排查 / Official Co-op Commander Tech Tree Diagnostics',
    sourceDescription: '读取 `游戏数据/官方合作指挥官/commanders/*` 的中文官方导出，再反查 `游戏数据/官方SC2原始文本镜像` 里的 Unit / Ability / Effect Catalog。 / Read the localized official commander export and cross-check the Unit / Ability / Effect catalogs in `游戏数据/官方SC2原始文本镜像`.',
    sourcePaths: {
      official_commander_json: normalizePath(path.relative(repoRoot, commanderRoot)),
      raw_catalog_mirror: normalizePath(path.relative(repoRoot, rawMirrorRoot)),
    },
    indexMessage: '正在索引官方 Catalog XML...',
    commanderOrder: officialIndex.commander_order.map((item) => item.short_id),
    catalog: buildCatalogIndex(rawMirrorRoot),
    allCommanderData: loadAllCommanderData(),
  };
}

function clearGeneratedCommanderMarkdown(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (!entry.isFile() || !entry.name.endsWith('.md')) {
      continue;
    }

    fs.unlinkSync(path.join(directory, entry.name));
  }
}

function loadModDataContext(modRoot) {
  if (!fs.existsSync(modRoot)) {
    throw new Error(`当前 Mod 根目录不存在：${modRoot}`);
  }

  const catalog = buildModCatalogIndex(modRoot);
  const localization = buildLocalizationIndex(modRoot);
  catalog.localization = localization;

  const playerCommanders = loadModPlayerCommanders(catalog, localization);
  const commanderOpeners = loadCommanderAchOpeners(catalog, localization);
  const runtimeRosters = loadCommanderRuntimeRoster(catalog);
  mergeGalaxyRosterItems(
    runtimeRosters,
    parseGalaxyCommanderRosterFile(path.join(modRoot, 'Mods', 'XM', 'XMFinal.SC2Mod', 'Base.SC2Data', 'LibE0EAE146_CommanderRosters.galaxy')),
  );
  mergeGalaxyRosterItems(
    runtimeRosters,
    parseGalaxyCommanderRosterFile(path.join(modRoot, 'Mods', 'XM', 'XMFinal.SC2Mod', 'Base.SC2Data', 'LibE0EAE146_CommanderBuildings.galaxy')),
  );

  const allCommanderData = buildModCommanderData({
    modRoot,
    catalog,
    localization,
    playerCommanders,
    commanderOpeners,
    runtimeRosters,
  });

  return {
    scope: '当前 Mod 指挥官科技链路排查 / Current Mod Commander Tech Tree Diagnostics',
    sourceDescription: '读取 `合作指挥官版起义狂潮` 当前 Mod 内的 `XMFinal` 运行名册、`CommanderAch` 开局配置、`PlayerCommanders`、各模块 Unit / Ability / Effect / Button Catalog 和 `zhCN` 本地化文本；不再用官方 JSON 作为本次导出的数据源。 / Read the current Mod data from `合作指挥官版起义狂潮`, including the `XMFinal` runtime roster, `CommanderAch` opener setup, `PlayerCommanders`, per-module Unit / Ability / Effect / Button Catalogs, and `zhCN` localization; do not use the official JSON as the source for this export.',
    sourcePaths: {
      active_mod_root: normalizePath(path.relative(repoRoot, modRoot)),
      runtime_roster_userdata: normalizePath(path.relative(repoRoot, path.join(modRoot, 'Mods', 'XM', 'XMFinal.SC2Mod', 'Base.SC2Data', 'GameData', 'UserData.xml'))),
      runtime_roster_galaxy: normalizePath(path.relative(repoRoot, path.join(modRoot, 'Mods', 'XM', 'XMFinal.SC2Mod', 'Base.SC2Data', 'LibE0EAE146_CommanderRosters.galaxy'))),
      runtime_buildings_galaxy: normalizePath(path.relative(repoRoot, path.join(modRoot, 'Mods', 'XM', 'XMFinal.SC2Mod', 'Base.SC2Data', 'LibE0EAE146_CommanderBuildings.galaxy'))),
    },
    indexMessage: '正在索引当前 Mod Catalog XML 和中文文本...',
    commanderOrder: orderCommanderIds([...allCommanderData.keys()]),
    catalog,
    allCommanderData,
  };
}

function buildModCommanderData({
  modRoot,
  catalog,
  localization,
  playerCommanders,
  commanderOpeners,
  runtimeRosters,
}) {
  const data = new Map();
  for (const [commanderId, roster] of runtimeRosters.entries()) {
    if (!roster.items.length) {
      continue;
    }
    const meta = playerCommanders.get(commanderId) || {};
    const runtimeModule = roster.runtime_module || meta.runtime_module || moduleNameForCommander(commanderId);
    const preferredCatalogs = preferredCatalogNames(runtimeModule, commanderId);
    const trainUnitOverrides = buildTrainUnitOverrideIndex(catalog, preferredCatalogs);
    const opener = buildModOpenerEntries({
      opener: commanderOpeners.get(commanderId),
      commanderId,
      runtimeModule,
      catalog,
      localization,
      preferredCatalogs,
      runtimeRoster: roster,
    });
    const topPanelAbilities = meta.global_cast_unit
      ? parseUnitPanelButtons(meta.global_cast_unit, catalog, localization, preferredCatalogs)
        .map((button) => {
          const { abilityId, commandIndex } = splitAbilityCommand(button.abil_cmd || '');
          return {
            ability_id: abilityId,
            command_index: commandIndex,
            source_unit_id: meta.global_cast_unit,
            panel_button: button,
          };
        })
        .filter((item) => item.ability_id || item.panel_button.face)
      : [];

    const entries = roster.items
      .map((item) => buildModTechEntry({
        item,
        commanderId,
        runtimeModule,
        catalog,
        localization,
        preferredCatalogs,
        trainUnitOverrides,
      }))
      .filter(Boolean);
    const inferredHeroes = inferModHeroEntries({
      commanderId,
      runtimeModule,
      catalog,
      localization,
      existingEntries: entries,
      preferredCatalogs,
      trainUnitOverrides,
    });
    const allEntries = uniqueBy([...entries, ...inferredHeroes], (entry) => entry.unit_id);
    const productionBuildings = inferModProductionBuildingEntries({
      commanderId,
      runtimeModule,
      catalog,
      localization,
      existingEntries: allEntries,
      preferredCatalogs,
      trainUnitOverrides,
    });

    data.set(commanderId, {
      commander: {
        id: meta.id || commanderId,
        name: displayCommanderName(meta.name, commanderId),
        description: meta.description || '',
        default_ability_commands: meta.default_ability_commands || [],
        default_upgrades: meta.default_upgrades || [],
        global_cast_unit: meta.global_cast_unit || '',
        hero_unit: meta.hero_unit || '',
        hero_structure: meta.hero_structure || '',
        top_panel_abilities: topPanelAbilities,
      },
      opener,
      buildings: allEntries.filter((entry) => entry.kind === 'building'),
      production_buildings: productionBuildings,
      units: allEntries.filter((entry) => entry.kind === 'unit'),
      heroes: allEntries.filter((entry) => entry.kind === 'hero'),
      command_cards: [],
      source_kind: 'mod',
      runtime_instance: roster.runtime_instance || commanderId,
      runtime_module: runtimeModule,
      source_dir: normalizePath(path.relative(repoRoot, path.join(modRoot, 'Mods', 'XM', runtimeModule))),
    });
  }
  return data;
}

function buildModTechEntry({
  item,
  commanderId,
  runtimeModule,
  catalog,
  localization,
  preferredCatalogs: existingPreferredCatalogs,
  trainUnitOverrides = new Map(),
}) {
  const unitId = item.runtime_unit;
  if (!unitId) {
    return null;
  }

  const preferredCatalogs = existingPreferredCatalogs || preferredCatalogNames(runtimeModule, commanderId);
  const unitInfo = summarizeModUnitEntry(unitId, catalog, localization, preferredCatalogs);
  const abilities = parseUnitPanelButtons(unitId, catalog, localization, preferredCatalogs);
  const inferredKind = inferModEntryKind(item, unitInfo, commanderId);

  return {
    id: item.official_id || unitId,
    unit_id: unitId,
    resolved_unit_ids: unique([unitId, item.official_id]),
    kind: inferredKind,
    name: unitInfo.name,
    tooltip: unitInfo.tooltip,
    icon: unitInfo.icon,
    unit: unitInfo.unit,
    abilities,
    production_options: buildModProductionOptions(unitId, abilities, catalog, trainUnitOverrides, preferredCatalogs),
    production: null,
    source: {
      module: runtimeModule,
      file: item.source_file || '',
    },
    roster: {
      source: item.source || 'CommanderRuntimeRoster',
      runtime_instance: item.runtime_instance || '',
      official_id: item.official_id || '',
      runtime_unit: unitId,
      status: item.status || '',
    },
  };
}

function inferModEntryKind(item, unitInfo, commanderId) {
  if (isAbathurLeviathanRosterItem(item, commanderId)) {
    return 'unit';
  }
  if (item.kind === 'building' || item.kind === 'hero') {
    return item.kind;
  }
  return unitInfo.unit.object_type === 'Hero' ? 'hero' : 'unit';
}

function isAbathurLeviathanRosterItem(item, commanderId) {
  if (commanderId !== 'Abathur') {
    return false;
  }
  const ids = [item.runtime_unit, item.official_id]
    .filter(Boolean)
    .map((value) => value.toLowerCase());
  return ids.some((id) => id === 'leviathan' || id === 'hotsleviathan' || id === 'leviathanabathur');
}

function buildModOpenerEntries({
  opener,
  commanderId,
  runtimeModule,
  catalog,
  localization,
  preferredCatalogs,
  runtimeRoster,
}) {
  if (!opener) {
    return [];
  }

  return commanderOpenerRoles
    .map((role) => {
      const unitId = opener.slots?.[role.field] || '';
      if (!unitId) {
        return null;
      }

      const unitInfo = summarizeModUnitEntry(unitId, catalog, localization, preferredCatalogs);
      const runtimeRosterItem = runtimeRoster?.item_by_unit?.get(unitId);
      return {
        role_id: role.id,
        role_field: role.field,
        role_name: role.name,
        expected_kind: role.kind,
        unit_id: unitId,
        name: unitInfo.name,
        tooltip: unitInfo.tooltip,
        icon: unitInfo.icon,
        stats: unitInfo.unit,
        parent_ids: catalogUnitParentIds(unitId, catalog, preferredCatalogs),
        in_runtime_roster: Boolean(runtimeRosterItem),
        runtime_roster: runtimeRosterItem
          ? {
            source: runtimeRosterItem.source || '',
            official_id: runtimeRosterItem.official_id || '',
            status: runtimeRosterItem.status || '',
            kind: runtimeRosterItem.kind || '',
          }
          : null,
        source: {
          module: runtimeModule,
          catalog: opener.source_catalog || '',
          file: opener.source_file || '',
          instance: opener.instance_id || commanderId,
        },
      };
    })
    .filter(Boolean);
}

function catalogUnitParentIds(unitId, catalog, preferredCatalogs) {
  return unique(
    selectPreferredDefinitions(catalog.units.get(unitId) || [], preferredCatalogs)
      .map((definition) => definition.parent)
      .filter(Boolean),
  ).sort(naturalSort);
}

function buildCommanderReport(commanderId, allData, catalogIndex) {
  const data = allData.get(commanderId);
  if (!data) {
    throw new Error(`缺少指挥官数据：${commanderId}`);
  }

  const localization = catalogIndex.localization;
  const preferredCatalogs = preferredCatalogNames(data.runtime_module, commanderId);
  const entryNameMap = buildEntryNameMap(data, allData);
  const rawTopPanelCommands = data.commander.top_panel_abilities?.length
    ? data.commander.top_panel_abilities
    : (data.commander.default_ability_commands || []).map((item) => ({
      ability_id: item.abil,
      command_index: item.cmd,
      panel_button: {
        face: '',
        type: 'CommanderDefault',
        abil_cmd: joinAbilityCommand(item.abil, item.cmd),
        name: item.abil,
        tooltip: '',
      },
    }));
  const topPanel = rawTopPanelCommands.map((item) => {
    const abilityId = item.ability_id || item.abil || splitAbilityCommand(item.abil_cmd || item.panel_button?.abil_cmd || '').abilityId;
    const commandIndex = item.command_index || item.cmd || splitAbilityCommand(item.abil_cmd || item.panel_button?.abil_cmd || '').commandIndex;
    const ability = summarizeAbilityCommand({
      abilityId,
      commandIndex,
      panelButton: item.panel_button || item,
      productionOptions: [],
      entryNameMap,
      catalogIndex,
      preferredCatalogs,
      localization,
      effectDepth,
    });
    return {
      ability_id: abilityId,
      command_index: commandIndex,
      source_unit_id: item.source_unit_id || '',
      ability,
    };
  });

  const commanderProductionOptions = [...data.buildings, ...data.units, ...data.heroes]
    .flatMap((entry) => entry.production_options || []);
  const buildings = data.buildings.map((entry) => summarizeTechEntry({
    kind: 'building',
    kindCn: '建筑',
    entry,
    sourceProductionOptions: entry.production_options || [],
    abilityProductionOptions: commanderProductionOptions.filter((option) => option.producer_unit_id === (entry.unit_id || entry.id)),
    entryNameMap,
    catalogIndex,
    preferredCatalogs,
    localization,
  }));
  const productionBuildings = (data.production_buildings || []).map((entry) => summarizeTechEntry({
    kind: 'production_building',
    kindCn: '生产链补充建筑',
    entry,
    sourceProductionOptions: entry.production_options || [],
    abilityProductionOptions: entry.production_options || [],
    entryNameMap,
    catalogIndex,
    preferredCatalogs,
    localization,
  }));
  const units = data.units.map((entry) => summarizeTechEntry({
    kind: 'unit',
    kindCn: '单位',
    entry,
    sourceProductionOptions: entry.production_options || [],
    abilityProductionOptions: entry.production_options || [],
    entryNameMap,
    catalogIndex,
    preferredCatalogs,
    localization,
  }));
  const heroes = data.heroes.map((entry) => summarizeTechEntry({
    kind: 'hero',
    kindCn: '英雄',
    entry,
    sourceProductionOptions: entry.production_options || [],
    abilityProductionOptions: entry.production_options || [],
    entryNameMap,
    catalogIndex,
    preferredCatalogs,
    localization,
  }));

  const effectIds = new Set();
  const producedUnitIds = new Set();
  for (const group of [topPanel, buildings, productionBuildings, units, heroes]) {
    for (const item of group) {
      const onlyCurrentCommanderRoster = item.kind === 'production_building';
      if (item.ability) {
        collectAbilityStats(item.ability, effectIds, producedUnitIds, { onlyCurrentCommanderRoster });
      }
      for (const ability of item.panel_abilities || []) {
        collectAbilityStats(ability, effectIds, producedUnitIds, { onlyCurrentCommanderRoster });
      }
      for (const produced of item.produced_units || []) {
        if (produced.unit_id) {
          producedUnitIds.add(produced.unit_id);
        }
      }
    }
  }

  return {
    commander: commanderId,
    commander_id: data.commander.id,
    name: data.commander.name || commanderId,
    description: data.commander.description || '',
    source_dir: data.source_dir || normalizePath(path.relative(repoRoot, path.join(commanderRoot, commanderId))),
    source_kind: data.source_kind || 'official',
    runtime_instance: data.runtime_instance || '',
    runtime_module: data.runtime_module || '',
    summary: {
      building_count: buildings.length,
      production_building_count: productionBuildings.length,
      unit_count: units.length,
      hero_count: heroes.length,
      top_panel_ability_count: topPanel.length,
      building_panel_button_count: sumBy(buildings, (item) => item.panel_abilities.length),
      unit_panel_button_count: sumBy(units, (item) => item.panel_abilities.length),
      hero_panel_button_count: sumBy(heroes, (item) => item.panel_abilities.length),
      produced_unit_count: producedUnitIds.size,
      effect_ref_count: effectIds.size,
      opener_count: data.opener?.length || 0,
    },
    opener: data.opener || [],
    top_panel: topPanel,
    buildings,
    production_buildings: productionBuildings,
    units,
    heroes,
  };
}

function summarizeTechEntry({
  kind,
  kindCn,
  entry,
  sourceProductionOptions,
  abilityProductionOptions,
  entryNameMap,
  catalogIndex,
  preferredCatalogs,
  localization,
}) {
  const unitId = entry.unit_id || entry.id;
  const catalogUnit = summarizeCatalogUnit(unitId, entryNameMap, catalogIndex, localization, preferredCatalogs);
  const rawPanelButtons = entry.abilities || [];
  const panelButtons = includeBasicCommands
    ? rawPanelButtons
    : rawPanelButtons.filter((button) => !isBasicPanelButton(button));
  const panelAbilities = panelButtons.map((button) => {
    const { abilityId, commandIndex } = splitAbilityCommand(button.abil_cmd || '');
    return summarizeAbilityCommand({
      abilityId,
      commandIndex,
      panelButton: button,
      productionOptions: abilityProductionOptions,
      entryNameMap,
      catalogIndex,
      preferredCatalogs,
      localization,
      effectDepth,
    });
  });
  const producedUnits = collectProducedUnits(
    kind === 'building' ? [] : sourceProductionOptions,
    panelAbilities,
    entryNameMap,
    { onlyCurrentCommanderRoster: kind === 'production_building' },
  );

  return {
    id: entry.id,
    unit_id: unitId,
    kind,
    kind_cn: kindCn,
    name: displayName(entry),
    display_name: entityDisplayName(displayName(entry), unitId),
    tooltip: normalizeWhitespace(entry.tooltip || ''),
    icon: entry.icon || '',
    source: entry.source || null,
    roster: entry.roster || null,
    stats: summarizeStats(entry.unit || {}),
    production: entry.production || null,
    production_options: sourceProductionOptions.map((option) => summarizeProductionOption(option, entryNameMap)),
    produced_units: producedUnits,
    catalog_unit: catalogUnit,
    hidden_basic_button_count: rawPanelButtons.length - panelButtons.length,
    panel_abilities: panelAbilities,
    panel_cards: summarizePanelCards(entry),
  };
}

function summarizeAbilityCommand({
  abilityId,
  commandIndex,
  panelButton,
  productionOptions,
  entryNameMap,
  catalogIndex,
  preferredCatalogs,
  localization,
  effectDepth: maxEffectDepth,
}) {
  const effectiveAbilityId = abilityId || '';
  const allDefinitions = catalogIndex.abilities.get(effectiveAbilityId) || [];
  const definitions = selectPreferredDefinitions(allDefinitions, preferredCatalogs);
  const infoEntries = flatten(definitions.map((definition) => parseAbilityInfoEntries(definition)));
  const directMatchedInfo = matchAbilityInfoEntries(infoEntries, commandIndex);
  const matchedInfo = inheritMatchedInfoEntries({
    allDefinitions,
    selectedDefinitions: definitions,
    directMatchedInfo,
    commandIndex,
    preferredCatalogs,
  });
  const abilityEffectRefs = collectAbilityEffectRefs(definitions, catalogIndex);
  const tooltipEffectRefs = extractTooltipEffectRefs(`${panelButton?.tooltip || ''}\n${panelButton?.name || ''}`);
  const effectIds = unique([...abilityEffectRefs, ...tooltipEffectRefs.map((item) => item.effect_id)]);
  const productionMatches = productionOptions
    .filter((option) => {
      if (!effectiveAbilityId) return false;
      const optionCommand = option.command_index || '';
      return option.ability_id === effectiveAbilityId && (!commandIndex || optionCommand === commandIndex);
    })
    .map((option) => summarizeProductionOption(option, entryNameMap));
  const catalogTargets = matchedInfo
    .flatMap((item) => [
      ...item.units.map((unitId) => ({
        type: item.source_ability_tag === 'CAbilMerge' ? 'merge_unit' : 'unit',
        id: unitId,
      })),
      ...item.upgrades.map((upgradeId) => ({ type: 'upgrade', id: upgradeId })),
      ...item.morph_units.map((unitId) => ({ type: 'morph_unit', id: unitId })),
    ])
    .filter((item) => item.id);
  const effectSummaries = effectIds.map((effectId) => summarizeEffect(effectId, catalogIndex, entryNameMap, maxEffectDepth));
  const buttonName = resolveLocalizedText(
    localization,
    panelButton?.name || panelButton?.face || effectiveAbilityId,
    [
      panelButton?.face ? `Button/Name/${panelButton.face}` : '',
      effectiveAbilityId ? `Button/Name/${effectiveAbilityId}` : '',
      effectiveAbilityId ? `Abil/Name/${effectiveAbilityId}` : '',
    ].filter(Boolean),
    preferredCatalogs,
  ) || panelButton?.face || panelButton?.name || effectiveAbilityId;

  return {
    face: panelButton?.face || '',
    button_name: buttonName,
    button_display_name: entityDisplayName(buttonName, effectiveAbilityId || panelButton?.face || ''),
    button_type: panelButton?.type || '',
    layout: {
      card_id: panelButton?.card_id || '',
      row: panelButton?.row ?? '',
      column: panelButton?.column ?? '',
      submenu_card_id: panelButton?.submenu_card_id || '',
    },
    requirements: panelButton?.requirements || '',
    tooltip: normalizeWhitespace(panelButton?.tooltip || ''),
    icon: panelButton?.icon || '',
    abil_cmd: panelButton?.abil_cmd || joinAbilityCommand(effectiveAbilityId, commandIndex),
    ability_id: effectiveAbilityId,
    command_index: commandIndex || '',
    catalog_types: unique(definitions.map((definition) => definition.tag)),
    catalog_type_cn: unique(definitions.map((definition) => chineseTypeNames[definition.tag] || definition.tag)),
    catalog_sources: summarizeDefinitionSources(definitions),
    matched_info: matchedInfo,
    production_matches: productionMatches,
    catalog_targets: catalogTargets.map((target) => ({
      ...target,
      name: nameForId(target.id, entryNameMap),
      display_name: entityDisplayName(nameForId(target.id, entryNameMap), target.id),
      in_current_commander_roster: entryNameMap.localIds.has(target.id),
    })),
    tooltip_effect_refs: tooltipEffectRefs,
    effect_refs: effectSummaries,
    unresolved_catalog: effectiveAbilityId ? definitions.length === 0 : true,
  };
}

function matchAbilityInfoEntries(infoEntries, commandIndex) {
  return commandIndex
    ? infoEntries.filter((item) => item.index === commandIndex || item.match_any_command)
    : infoEntries.filter((item) => !item.index);
}

function inheritMatchedInfoEntries({
  allDefinitions,
  selectedDefinitions,
  directMatchedInfo,
  commandIndex,
  preferredCatalogs,
}) {
  if (!commandIndex || directMatchedInfo.some(hasCatalogTargetInfo)) {
    return directMatchedInfo;
  }

  const selected = new Set(selectedDefinitions);
  const inheritedMatchedInfo = [];
  for (const preferred of preferredCatalogs || []) {
    const fallbackDefinitions = allDefinitions.filter((definition) => (
      !selected.has(definition)
      && String(definition.source_catalog || '').toLowerCase() === String(preferred).toLowerCase()
    ));
    if (!fallbackDefinitions.length) {
      continue;
    }

    const fallbackInfo = matchAbilityInfoEntries(
      flatten(fallbackDefinitions.map((definition) => parseAbilityInfoEntries(definition))),
      commandIndex,
    ).filter(hasCatalogTargetInfo);
    if (fallbackInfo.length) {
      inheritedMatchedInfo.push(...fallbackInfo);
      break;
    }
  }

  return uniqueBy([...directMatchedInfo, ...inheritedMatchedInfo], abilityInfoSignature);
}

function hasCatalogTargetInfo(infoEntry) {
  return Boolean(infoEntry?.units?.length || infoEntry?.upgrades?.length || infoEntry?.morph_units?.length);
}

function abilityInfoSignature(infoEntry) {
  return [
    infoEntry.index || '',
    infoEntry.match_any_command ? 'any' : '',
    infoEntry.source_element || '',
    infoEntry.source_ability_tag || '',
    (infoEntry.units || []).join(','),
    (infoEntry.upgrades || []).join(','),
    (infoEntry.morph_units || []).join(','),
  ].join('|');
}

function summarizeCatalogUnit(unitId, entryNameMap, catalogIndex, localization, preferredCatalogs) {
  const definitions = catalogIndex.units.get(unitId) || [];
  const abilityLinks = new Set();
  const behaviorLinks = new Set();
  const weaponLinks = new Set();
  const effectLinks = new Set();

  for (const definition of definitions) {
    for (const element of extractElements(definition.snippet)) {
      const link = attr(element.attrs, 'Link');
      const value = attr(element.attrs, 'value');
      if (element.name === 'AbilArray' && link) {
        abilityLinks.add(link);
      }
      if (element.name === 'BehaviorArray' && link) {
        behaviorLinks.add(link);
      }
      if (element.name === 'WeaponArray' && link) {
        weaponLinks.add(link);
      }
      if (element.name === 'EffectArray' && value) {
        effectLinks.add(value);
      }
    }
  }

  return {
    id: unitId,
    name: nameForId(unitId, entryNameMap),
    display_name: entityDisplayName(nameForId(unitId, entryNameMap), unitId),
    catalog_sources: summarizeDefinitionSources(definitions),
    ability_links: [...abilityLinks].sort(naturalSort).map((id) => {
      const name = localizedCatalogAbilityName(id, catalogIndex, localization, preferredCatalogs);
      return {
        id,
        name,
        display_name: entityDisplayName(name, id),
        catalog_type_cn: abilityTypeCn(id, catalogIndex),
        catalog_type_raw: abilityTypeRaw(id, catalogIndex),
        is_basic: basicAbilityIds.has(id),
      };
    }),
    behavior_links: [...behaviorLinks].sort(naturalSort),
    weapon_links: [...weaponLinks].sort(naturalSort),
    effect_links: [...effectLinks].sort(naturalSort),
    unresolved_catalog: definitions.length === 0,
  };
}

function summarizeEffect(effectId, catalogIndex, entryNameMap, maxDepth, seen = new Set()) {
  const definitions = catalogIndex.effects.get(effectId) || [];
  const fields = summarizeEffectFields(definitions, catalogIndex, entryNameMap);
  const nestedEffectIds = unique(fields.child_effect_ids).filter((id) => id !== effectId);
  const key = `${effectId}:${maxDepth}`;

  let childEffects = [];
  if (maxDepth > 0 && !seen.has(key)) {
    seen.add(key);
    childEffects = nestedEffectIds
      .slice(0, 20)
      .map((id) => summarizeEffect(id, catalogIndex, entryNameMap, maxDepth - 1, seen));
  }

  return {
    id: effectId,
    name: nameForId(effectId, entryNameMap),
    catalog_types: unique(definitions.map((definition) => definition.tag)),
    catalog_type_cn: unique(definitions.map((definition) => chineseTypeNames[definition.tag] || definition.tag)),
    catalog_sources: summarizeDefinitionSources(definitions),
    ...fields,
    child_effects: childEffects,
    unresolved_catalog: definitions.length === 0,
  };
}

function summarizeEffectFields(definitions, catalogIndex, entryNameMap) {
  const childEffectIds = new Set();
  const spawnUnits = new Set();
  const spawnCounts = new Set();
  const amounts = new Set();
  const behaviors = new Set();
  const validators = new Set();
  const misc = new Map();
  const effectIds = catalogIndex.effectIds;

  for (const definition of definitions) {
    for (const element of extractElements(definition.snippet)) {
      const value = attr(element.attrs, 'value');
      const link = attr(element.attrs, 'Link');
      const elementName = element.name;

      if (isEffectReferenceElement(element.name) && value && effectIds.has(value) && value !== definition.id) {
        childEffectIds.add(value);
      }
      if (isEffectReferenceElement(element.name) && link && effectIds.has(link) && link !== definition.id) {
        childEffectIds.add(link);
      }
      if (elementName === 'SpawnUnit' && value) {
        spawnUnits.add(value);
      }
      if (elementName === 'SpawnCount' && value) {
        spawnCounts.add(value);
      }
      if (elementName === 'Amount' && value) {
        amounts.add(value);
      }
      if ((elementName === 'Behavior' || elementName === 'BehaviorArray') && (value || link)) {
        behaviors.add(value || link);
      }
      if (elementName.includes('Validator') && value) {
        validators.add(value);
      }
      if (
        ['Kind', 'PeriodCount', 'PeriodDurations', 'SearchRadius', 'Arc', 'Chance'].includes(elementName)
        && value
      ) {
        pushMapSet(misc, elementName, value);
      }
    }
  }

  return {
    child_effect_ids: [...childEffectIds].sort(naturalSort),
    spawn_units: [...spawnUnits].sort(naturalSort).map((unitId) => ({
      id: unitId,
      name: nameForId(unitId, entryNameMap),
      display_name: entityDisplayName(nameForId(unitId, entryNameMap), unitId),
      in_current_commander_roster: entryNameMap.localIds.has(unitId),
    })),
    spawn_counts: [...spawnCounts].sort(naturalSort),
    amounts: [...amounts].sort(naturalSort),
    behaviors: [...behaviors].sort(naturalSort),
    validators: [...validators].sort(naturalSort),
    fields: Object.fromEntries([...misc.entries()].map(([key, valueSet]) => [key, [...valueSet].sort(naturalSort)])),
  };
}

function collectAbilityEffectRefs(definitions, catalogIndex) {
  const refs = new Set();
  for (const definition of definitions) {
    for (const element of extractElements(definition.snippet)) {
      if (!isEffectReferenceElement(element.name)) {
        continue;
      }
      const value = attr(element.attrs, 'value');
      const link = attr(element.attrs, 'Link');
      if (value && catalogIndex.effectIds.has(value)) {
        refs.add(value);
      }
      if (link && catalogIndex.effectIds.has(link)) {
        refs.add(link);
      }
    }
  }
  return [...refs].sort(naturalSort);
}

function isEffectReferenceElement(elementName) {
  return /(^Effect$|EffectArray|Effect$|EffectRef|LaunchEffect|ImpactEffect|ExpireEffect|InitialEffect|PeriodicEffect|FinalEffect|SearchEffect|SpawnEffect|StartEffect|FinishEffect|PreEffect|PostEffect|RetargetEffect|AmmoEffect|DamageResponseEffect)/i.test(elementName);
}

function collectProducedUnits(productionOptions, panelAbilities, entryNameMap, options = {}) {
  const produced = new Map();
  const onlyCurrentCommanderRoster = Boolean(options.onlyCurrentCommanderRoster);

  for (const option of productionOptions) {
    if (!option.unit) continue;
    if (shouldSkipInactiveTrainOverride(option, entryNameMap)) continue;
    if (onlyCurrentCommanderRoster && !entryNameMap.localIds.has(option.unit)) continue;
    produced.set(option.unit, {
      unit_id: option.unit,
      name: nameForId(option.unit, entryNameMap),
      display_name: entityDisplayName(nameForId(option.unit, entryNameMap), option.unit),
      source: 'production_options',
      producer_unit_id: option.producer_unit_id || '',
      abil_cmd: option.abil_cmd || '',
      minerals: option.minerals || '',
      vespene: option.vespene || '',
      time: option.time || '',
      in_current_commander_roster: entryNameMap.localIds.has(option.unit),
    });
  }

  for (const ability of panelAbilities) {
    for (const production of ability.production_matches || []) {
      if (!production.unit) continue;
      if (shouldSkipInactiveTrainOverride(production, entryNameMap)) continue;
      if (onlyCurrentCommanderRoster && !production.in_current_commander_roster) continue;
      if (!produced.has(production.unit)) {
        produced.set(production.unit, {
          unit_id: production.unit,
          name: production.unit_name || nameForId(production.unit, entryNameMap),
          display_name: entityDisplayName(production.unit_name || nameForId(production.unit, entryNameMap), production.unit),
          source: production.source || production.cost_mode || 'production_match',
          producer_unit_id: production.producer_unit_id || '',
          abil_cmd: production.abil_cmd || ability.abil_cmd || '',
          minerals: production.minerals || '',
          vespene: production.vespene || '',
          time: production.time || '',
          upgrade_id: production.upgrade_id || '',
          in_current_commander_roster: production.in_current_commander_roster,
        });
      }
    }
    for (const target of ability.catalog_targets || []) {
      if (target.type !== 'unit' && target.type !== 'morph_unit' && target.type !== 'merge_unit') continue;
      if (onlyCurrentCommanderRoster && !target.in_current_commander_roster) continue;
      if (!produced.has(target.id)) {
        produced.set(target.id, {
          unit_id: target.id,
          name: target.name || target.id,
          display_name: entityDisplayName(target.name || target.id, target.id),
          source: producedSourceForCatalogTarget(target),
          producer_unit_id: '',
          abil_cmd: ability.abil_cmd || '',
          minerals: '',
          vespene: '',
          time: '',
          in_current_commander_roster: target.in_current_commander_roster,
        });
      }
    }
    for (const effect of ability.effect_refs || []) {
      for (const spawned of flattenEffectSpawnUnits(effect)) {
        if (onlyCurrentCommanderRoster && !spawned.in_current_commander_roster) continue;
        if (!produced.has(spawned.id)) {
          produced.set(spawned.id, {
            unit_id: spawned.id,
            name: spawned.name || spawned.id,
            display_name: entityDisplayName(spawned.name || spawned.id, spawned.id),
            source: 'effect_spawn_unit',
            producer_unit_id: '',
            abil_cmd: ability.abil_cmd || '',
            minerals: '',
            vespene: '',
            time: '',
            in_current_commander_roster: spawned.in_current_commander_roster,
          });
        }
      }
    }
  }

  return [...produced.values()].sort((a, b) => naturalSort(a.unit_id, b.unit_id));
}

function shouldSkipInactiveTrainOverride(production, entryNameMap) {
  if ((production.source || '') !== 'upgrade_train_unit_override') {
    return false;
  }
  return !entryNameMap.localIds.has(production.unit || '');
}

function producedSourceForCatalogTarget(target) {
  if (target.type === 'merge_unit') {
    return 'catalog_merge_info';
  }
  if (target.type === 'morph_unit') {
    return 'catalog_morph_info';
  }
  return 'catalog_info';
}

function flattenEffectSpawnUnits(effect) {
  const units = [...(effect.spawn_units || [])];
  for (const child of effect.child_effects || []) {
    units.push(...flattenEffectSpawnUnits(child));
  }
  return units;
}

function summarizeProductionOption(option, entryNameMap) {
  return {
    producer_unit_id: option.producer_unit_id || '',
    producer_name: nameForId(option.producer_unit_id, entryNameMap),
    producer_display_name: entityDisplayName(nameForId(option.producer_unit_id, entryNameMap), option.producer_unit_id),
    ability_id: option.ability_id || '',
    command_index: option.command_index || '',
    abil_cmd: option.abil_cmd || '',
    button_face: option.button_face || '',
    unit: option.unit || '',
    unit_name: nameForId(option.unit, entryNameMap),
    unit_display_name: entityDisplayName(nameForId(option.unit, entryNameMap), option.unit),
    minerals: option.minerals || '',
    vespene: option.vespene || '',
    terrazine: option.terrazine || '',
    custom: option.custom || '',
    time: option.time || '',
    cost_mode: option.cost_mode || '',
    source: option.source || option.cost_mode || '',
    upgrade_id: option.upgrade_id || '',
    reference: option.reference || '',
    source_catalog: option.source_catalog || '',
    source_file: option.source_file || '',
    in_current_commander_roster: entryNameMap.localIds.has(option.unit),
  };
}

function summarizePanelCards(entry) {
  const cards = new Map();
  for (const ability of entry.abilities || []) {
    const cardId = ability.card_id || (ability.is_default_card ? '默认面板' : '未命名面板');
    if (!cards.has(cardId)) {
      cards.set(cardId, {
        card_id: cardId,
        is_default_card: Boolean(ability.is_default_card),
        button_count: 0,
      });
    }
    cards.get(cardId).button_count += 1;
  }
  return [...cards.values()];
}

function summarizeStats(unit) {
  return {
    object_type: unit.object_type || '',
    race: unit.race || '',
    minerals: unit.minerals || '',
    vespene: unit.vespene || '',
    supply_cost: unit.supply_cost || '',
    supply_provided: unit.supply_provided || '',
    build_time: unit.build_time || '',
    life: unit.life || '',
    shields: unit.shields || '',
    energy: unit.energy || '',
    sight: unit.sight || '',
    attributes: unit.attributes || [],
  };
}

function parseInfoArrays(snippet) {
  const infoEntries = [];
  const regex = /<InfoArray\b([^>]*?)\/>|<InfoArray\b([^>]*?)>([\s\S]*?)<\/InfoArray>/g;
  let match;
  while ((match = regex.exec(snippet)) !== null) {
    const attrs = parseAttrs(match[1] || match[2] || '');
    const body = match[3] || '';
    const buttons = extractElements(body)
      .filter((element) => element.name === 'Button')
      .map((element) => ({
        default_button_face: attr(element.attrs, 'DefaultButtonFace'),
        state: attr(element.attrs, 'State'),
        requirements: attr(element.attrs, 'Requirements'),
      }));
    const resources = {};
    for (const element of extractElements(body).filter((item) => item.name === 'Resource')) {
      resources[attr(element.attrs, 'index') || ''] = attr(element.attrs, 'value');
    }

    infoEntries.push({
      index: attr(attrs, 'index'),
      match_any_command: false,
      source_element: 'InfoArray',
      source_ability_tag: '',
      time: attr(attrs, 'Time'),
      unit_attr: attr(attrs, 'Unit'),
      upgrade_attr: attr(attrs, 'Upgrade'),
      units: unique([
        attr(attrs, 'Unit'),
        ...extractElements(body)
          .filter((element) => element.name === 'Unit')
          .map((element) => attr(element.attrs, 'value')),
      ].filter(Boolean)),
      upgrades: unique([
        attr(attrs, 'Upgrade'),
        ...extractElements(body)
          .filter((element) => element.name === 'Upgrade')
          .map((element) => attr(element.attrs, 'value')),
      ].filter(Boolean)),
      morph_units: unique([
        attr(attrs, 'MorphUnit'),
        ...extractElements(body)
          .filter((element) => element.name === 'MorphUnit')
          .map((element) => attr(element.attrs, 'value')),
      ].filter(Boolean)),
      resources,
      buttons,
      charge: extractCharge(body),
    });
  }
  return infoEntries;
}

function parseAbilityInfoEntries(definition) {
  const infoEntries = parseInfoArrays(definition.snippet).map((entry) => ({
    ...entry,
    source_ability_tag: definition.tag || '',
  }));

  if (definition.tag === 'CAbilMerge') {
    infoEntries.push(...parseMergeInfoEntries(definition.snippet, definition.tag));
  }

  return infoEntries;
}

function parseMergeInfoEntries(snippet, sourceAbilityTag) {
  return extractElements(snippet)
    .filter((element) => element.name === 'Info')
    .map((element) => {
      const attrs = element.attrs || {};
      return {
        index: attr(attrs, 'index'),
        match_any_command: true,
        source_element: 'Info',
        source_ability_tag: sourceAbilityTag || '',
        time: attr(attrs, 'Time'),
        unit_attr: attr(attrs, 'Unit'),
        upgrade_attr: attr(attrs, 'Upgrade'),
        units: unique([attr(attrs, 'Unit')].filter(Boolean)),
        upgrades: unique([attr(attrs, 'Upgrade')].filter(Boolean)),
        morph_units: unique([attr(attrs, 'MorphUnit')].filter(Boolean)),
        resources: {},
        buttons: [],
        charge: null,
      };
    })
    .filter((entry) => entry.units.length || entry.upgrades.length || entry.morph_units.length);
}

function extractCharge(body) {
  const chargeMatch = body.match(/<Charge\b[^>]*>([\s\S]*?)<\/Charge>/);
  if (!chargeMatch) {
    return null;
  }
  const chargeBody = chargeMatch[1];
  const charge = {};
  for (const element of extractElements(chargeBody)) {
    const value = attr(element.attrs, 'value');
    if (value) {
      charge[element.name] = value;
    }
  }
  return charge;
}

function buildCatalogIndex(root) {
  const files = catalogRoots.flatMap((relativeRoot) => {
    const fullRoot = path.join(root, ...relativeRoot.split('/'));
    if (!fs.existsSync(fullRoot)) {
      return [];
    }
    return walkFiles(fullRoot).filter((filePath) => officialCatalogFileNames.has(path.basename(filePath).toLowerCase()));
  });

  const index = {
    abilities: new Map(),
    behaviors: new Map(),
    buttons: new Map(),
    effects: new Map(),
    units: new Map(),
    upgrades: new Map(),
    users: new Map(),
    validators: new Map(),
    effectIds: new Set(),
    fileCount: files.length,
  };

  for (const filePath of files) {
    const fileName = path.basename(filePath).toLowerCase();
    const entries = extractCatalogEntries(filePath);
    for (const entry of entries) {
      if (fileName === 'abildata.xml') {
        pushMapArray(index.abilities, entry.id, entry);
      } else if (fileName === 'effectdata.xml') {
        pushMapArray(index.effects, entry.id, entry);
        index.effectIds.add(entry.id);
      } else if (fileName === 'unitdata.xml') {
        pushMapArray(index.units, entry.id, entry);
      } else if (fileName === 'buttondata.xml') {
        pushMapArray(index.buttons, entry.id, entry);
      } else if (fileName === 'userdata.xml') {
        pushMapArray(index.users, entry.id, entry);
      } else if (fileName === 'validatordata.xml') {
        pushMapArray(index.validators, entry.id, entry);
      } else if (fileName === 'upgradedata.xml') {
        pushMapArray(index.upgrades, entry.id, entry);
      } else if (fileName === 'behaviordata.xml') {
        pushMapArray(index.behaviors, entry.id, entry);
      }
    }
  }

  return index;
}

function buildModCatalogIndex(modRoot) {
  const xmRoot = path.join(modRoot, 'Mods', 'XM');
  const files = walkFiles(xmRoot)
    .filter((filePath) => modCatalogFileNames.has(path.basename(filePath).toLowerCase()));

  const index = {
    abilities: new Map(),
    behaviors: new Map(),
    buttons: new Map(),
    effects: new Map(),
    units: new Map(),
    upgrades: new Map(),
    users: new Map(),
    validators: new Map(),
    effectIds: new Set(),
    fileCount: files.length,
  };

  for (const filePath of files) {
    const fileName = path.basename(filePath).toLowerCase();
    const entries = extractCatalogEntries(filePath);
    for (const entry of entries) {
      if (fileName === 'abildata.xml') {
        pushMapArray(index.abilities, entry.id, entry);
      } else if (fileName === 'behaviordata.xml') {
        pushMapArray(index.behaviors, entry.id, entry);
      } else if (fileName === 'buttondata.xml') {
        pushMapArray(index.buttons, entry.id, entry);
      } else if (fileName === 'effectdata.xml') {
        pushMapArray(index.effects, entry.id, entry);
        index.effectIds.add(entry.id);
      } else if (fileName === 'unitdata.xml') {
        pushMapArray(index.units, entry.id, entry);
      } else if (fileName === 'upgradedata.xml') {
        pushMapArray(index.upgrades, entry.id, entry);
      } else if (fileName === 'userdata.xml') {
        pushMapArray(index.users, entry.id, entry);
      } else if (fileName === 'validatordata.xml') {
        pushMapArray(index.validators, entry.id, entry);
      }
    }
  }

  return index;
}

function buildLocalizationIndex(modRoot) {
  const entries = new Map();
  const files = walkFiles(path.join(modRoot, 'Mods', 'XM'))
    .filter((filePath) => /\.txt$/i.test(filePath) && /LocalizedData/i.test(filePath));

  for (const filePath of files) {
    const sourceFile = normalizePath(path.relative(repoRoot, filePath));
    const sourceCatalog = sourceCatalogName(sourceFile);
    const text = fs.readFileSync(filePath, 'utf8');
    for (const rawLine of text.split(/\r?\n/)) {
      const line = rawLine.trimEnd();
      if (!line || line.startsWith('//')) {
        continue;
      }
      const separatorIndex = line.indexOf('=');
      if (separatorIndex <= 0) {
        continue;
      }
      const key = line.slice(0, separatorIndex).trim();
      const value = decodeGameString(line.slice(separatorIndex + 1));
      pushMapArray(entries, key, {
        key,
        text: value,
        source_catalog: sourceCatalog,
        source_file: sourceFile,
      });
    }
  }

  return {
    entries,
    fileCount: files.length,
  };
}

function loadModPlayerCommanders(catalog, localization) {
  const map = new Map();
  for (const definition of catalog.users.get('PlayerCommanders') || []) {
    for (const instance of parseUserInstances(definition)) {
      if (!instance.id || instance.id === '[Default]') {
        continue;
      }
      const commanderId = shortCommanderId(instance.id);
      const fields = parseUserFieldArrays(instance.body, localization, preferredCatalogNames(definition.source_catalog, commanderId));
      const preferredCatalogs = preferredCatalogNames(definition.source_catalog, commanderId);
      const candidate = {
        id: instance.id,
        short_id: commanderId,
        name: textField(fields, 'Name') || localizeKey(localization, `GameStrings/${commanderId}`, preferredCatalogs) || commanderId,
        description: textField(fields, 'Description'),
        info_details: textArrayField(fields, 'InfoDetails'),
        default_ability_commands: abilityCommandArrayField(fields, 'DefaultAbilityCommands'),
        default_upgrades: stringArrayField(fields, 'DefaultUpgrades'),
        prestige: stringArrayField(fields, 'Prestige'),
        global_cast_unit: stringField(fields, 'GlobalCastUnit'),
        hero_unit: stringField(fields, 'HeroUnit'),
        hero_structure: stringField(fields, 'HeroStructure'),
        commander_data: stringField(fields, 'CommanderData'),
        source_catalog: definition.source_catalog,
        source_file: definition.source_file,
        source_score: commanderSourceScore(definition.source_catalog, commanderId),
      };
      const existing = map.get(commanderId);
      if (!existing || candidate.source_score > existing.source_score) {
        map.set(commanderId, candidate);
      }
    }
  }
  return map;
}

function loadCommanderAchOpeners(catalog, localization) {
  const map = new Map();
  for (const definition of catalog.users.get('CommanderAch') || []) {
    for (const instance of parseUserInstances(definition)) {
      if (!instance.id || instance.id === '[Default]') {
        continue;
      }

      const commanderId = shortCommanderId(instance.id);
      const preferredCatalogs = preferredCatalogNames(definition.source_catalog, commanderId);
      const fields = parseUserFieldArrays(instance.body, localization, preferredCatalogs);
      const slots = Object.fromEntries(
        commanderOpenerRoles.map((role) => [role.field, stringField(fields, role.field)]),
      );
      if (!Object.values(slots).some(Boolean)) {
        continue;
      }

      const candidate = {
        commander_id: commanderId,
        instance_id: instance.id,
        slots,
        source_catalog: definition.source_catalog,
        source_file: definition.source_file,
        source_score: commanderSourceScore(definition.source_catalog, commanderId),
        private_slot_score: commanderOpenerPrivateSlotScore(slots, commanderId),
      };
      candidate.selection_score = candidate.source_score + (candidate.private_slot_score * 100);
      const existing = map.get(commanderId);
      if (!existing || candidate.selection_score > existing.selection_score) {
        map.set(commanderId, candidate);
      }
    }
  }
  return map;
}

function commanderOpenerPrivateSlotScore(slots, commanderId) {
  const commanderKey = String(commanderId || '').toLowerCase();
  if (!commanderKey) {
    return 0;
  }
  return Object.values(slots || {})
    .filter((unitId) => String(unitId || '').toLowerCase().includes(commanderKey))
    .length;
}

function loadCommanderRuntimeRoster(catalog) {
  const map = new Map();
  const definitions = catalog.users.get('CommanderRuntimeRoster') || [];
  for (const definition of definitions) {
    for (const instance of parseUserInstances(definition)) {
      if (!instance.id || instance.id === '[Default]') {
        continue;
      }
      const fields = parseUserFieldArrays(instance.body, catalog.localization, preferredCatalogNames(definition.source_catalog, instance.id));
      const officialCommander = stringField(fields, 'OfficialCommander') || runtimeCommanderToOfficial(instance.id);
      const commanderId = runtimeCommanderToOfficial(officialCommander);
      const roster = ensureRuntimeRoster(map, commanderId);
      roster.runtime_instance = stringField(fields, 'RuntimeCommander') || instance.id;
      roster.runtime_module = stringField(fields, 'RuntimeModule') || roster.runtime_module || moduleNameForCommander(commanderId);
      roster.source_file = definition.source_file;

      const officialIds = fieldArray(fields, 'OfficialId').map(fieldPlainValue);
      const runtimeUnits = fieldArray(fields, 'RuntimeUnit').map(fieldPlainValue);
      const kinds = fieldArray(fields, 'Kind').map(fieldPlainValue);
      const statuses = fieldArray(fields, 'Status').map(fieldPlainValue);
      const maxLength = Math.max(officialIds.length, runtimeUnits.length, kinds.length, statuses.length);
      for (let index = 0; index < maxLength; index += 1) {
        const runtimeUnit = runtimeUnits[index] || '';
        if (!runtimeUnit) {
          continue;
        }
        mergeRuntimeRosterItem(roster, {
          official_id: officialIds[index] || runtimeUnit,
          runtime_unit: runtimeUnit,
          kind: kinds[index] || '',
          status: statuses[index] || '',
          source: 'XMFinal CommanderRuntimeRoster',
          source_file: definition.source_file,
          runtime_instance: roster.runtime_instance,
        });
      }

      const commandCenter = stringField(fields, 'CommandCenter');
      if (commandCenter) {
        mergeRuntimeRosterItem(roster, {
          official_id: commandCenter,
          runtime_unit: commandCenter,
          kind: 'building',
          status: 'command-center',
          source: 'XMFinal CommanderRuntimeRoster.CommandCenter',
          source_file: definition.source_file,
          runtime_instance: roster.runtime_instance,
        });
      }
    }
  }
  return map;
}

function parseGalaxyCommanderRosterFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return new Map();
  }
  const sourceFile = normalizePath(path.relative(repoRoot, filePath));
  const text = stripGalaxyLineComments(fs.readFileSync(filePath, 'utf8'));
  const map = new Map();
  const functionRegex = /bool\s+libE0EAE146_gf_XMTestBench_([A-Za-z0-9]+)(Roster|Buildings)\s*\([^)]*\)\s*\{/g;
  let match;
  while ((match = functionRegex.exec(text)) !== null) {
    if (match[1].startsWith('RunCommander')) {
      continue;
    }
    const functionCommander = runtimeCommanderToOfficial(match[1]);
    const bodyStart = text.indexOf('{', match.index);
    const bodyEnd = findMatchingBrace(text, bodyStart);
    if (bodyStart < 0 || bodyEnd < 0) {
      continue;
    }
    const roster = ensureRuntimeRoster(map, functionCommander);
    roster.runtime_instance ||= match[1];
    roster.source_file = sourceFile;
    const body = text.slice(bodyStart + 1, bodyEnd);
    const callRegex = /libE0EAE146_gf_XMTestBench_(Create(?:Abathur)?RosterUnitAlias|Create(?:Abathur)?RosterUnit|CreateBuildingRosterUnitAlias|CreateBuildingRosterUnit)\s*\(([^)]*)\)/g;
    let callMatch;
    while ((callMatch = callRegex.exec(body)) !== null) {
      const callName = callMatch[1];
      const quotedArgs = [...callMatch[2].matchAll(/"([^"]+)"/g)].map((arg) => arg[1]);
      if (!quotedArgs.length) {
        continue;
      }
      const isAlias = callName.endsWith('Alias');
      const isBuilding = callName.includes('Building');
      const officialId = isAlias ? quotedArgs[0] : quotedArgs[0];
      const runtimeUnit = isAlias ? quotedArgs[1] : quotedArgs[0];
      mergeRuntimeRosterItem(roster, {
        official_id: officialId,
        runtime_unit: runtimeUnit,
        kind: isBuilding ? 'building' : 'unit',
        status: isAlias ? 'alias' : 'galaxy',
        source: isBuilding ? 'XMFinal CommanderBuildings.galaxy' : 'XMFinal CommanderRosters.galaxy',
        source_file: sourceFile,
        runtime_instance: roster.runtime_instance,
      });
    }
  }
  return map;
}

function mergeGalaxyRosterItems(target, source) {
  for (const [commanderId, sourceRoster] of source.entries()) {
    const targetRoster = ensureRuntimeRoster(target, commanderId);
    targetRoster.runtime_instance ||= sourceRoster.runtime_instance || commanderId;
    targetRoster.runtime_module ||= sourceRoster.runtime_module || moduleNameForCommander(commanderId);
    for (const item of sourceRoster.items) {
      mergeRuntimeRosterItem(targetRoster, item);
    }
  }
}

function ensureRuntimeRoster(map, commanderId) {
  if (!map.has(commanderId)) {
    map.set(commanderId, {
      commander: commanderId,
      runtime_instance: commanderId,
      runtime_module: moduleNameForCommander(commanderId),
      source_file: '',
      items: [],
      item_by_unit: new Map(),
    });
  }
  return map.get(commanderId);
}

function mergeRuntimeRosterItem(roster, item) {
  const runtimeUnit = item.runtime_unit || '';
  if (!runtimeUnit) {
    return;
  }
  const existing = roster.item_by_unit.get(runtimeUnit);
  if (!existing) {
    const copy = {
      ...item,
      runtime_instance: item.runtime_instance || roster.runtime_instance,
      sources: [item.source].filter(Boolean),
    };
    roster.items.push(copy);
    roster.item_by_unit.set(runtimeUnit, copy);
    return;
  }

  if ((!existing.kind || existing.kind === 'unit') && item.kind === 'hero') {
    existing.kind = 'hero';
  } else if (!existing.kind) {
    existing.kind = item.kind || existing.kind;
  }
  existing.official_id ||= item.official_id;
  existing.status ||= item.status;
  existing.source_file ||= item.source_file;
  if (item.source && !existing.sources.includes(item.source)) {
    existing.sources.push(item.source);
    existing.source = existing.sources.join(' + ');
  }
}

function parseUserInstances(definition) {
  const instances = [];
  const regex = /<Instances\b([^>]*?\bId="([^"]+)"[^>]*?)\/>|<Instances\b([^>]*?\bId="([^"]+)"[^>]*?)>([\s\S]*?)<\/Instances>/g;
  let match;
  while ((match = regex.exec(definition.body)) !== null) {
    instances.push({
      id: match[2] || match[4],
      attrs: parseAttrs(match[1] || match[3] || ''),
      body: match[5] || '',
      source_catalog: definition.source_catalog,
      source_file: definition.source_file,
    });
  }
  return instances;
}

function parseUserFieldArrays(body, localization, preferredCatalogs = []) {
  const fields = new Map();
  const elementRegex = /<([A-Za-z][\w@.-]*)\b([^>]*)>([\s\S]*?)<\/\1>/g;
  let match;
  while ((match = elementRegex.exec(body)) !== null) {
    const tag = match[1];
    if (tag === 'Field') {
      continue;
    }
    const value = userFieldValue(tag, parseAttrs(match[2] || ''), localization, preferredCatalogs);
    const fieldRegex = /<Field\b([^>]*)\/?>/g;
    let fieldMatch;
    while ((fieldMatch = fieldRegex.exec(match[3] || '')) !== null) {
      const fieldAttrs = parseAttrs(fieldMatch[1] || '');
      const fieldId = attr(fieldAttrs, 'Id');
      if (!fieldId) {
        continue;
      }
      const index = Number.parseInt(attr(fieldAttrs, 'Index') || '0', 10);
      if (!fields.has(fieldId)) {
        fields.set(fieldId, []);
      }
      fields.get(fieldId)[Number.isFinite(index) ? index : 0] = value;
    }
  }
  return fields;
}

function userFieldValue(tag, attrs, localization, preferredCatalogs) {
  if (tag === 'AbilCmd') {
    return { abil: attr(attrs, 'Abil'), cmd: attr(attrs, 'Cmd') };
  }
  if (tag === 'Text') {
    const key = attr(attrs, 'Text');
    return {
      key,
      text: localizeKey(localization, key, preferredCatalogs),
    };
  }

  const attrNameByTag = {
    GameLink: 'GameLink',
    Image: 'Image',
    Int: 'Int',
    Model: 'Model',
    Sound: 'Sound',
    String: 'String',
    Unit: 'Unit',
    Upgrade: 'Upgrade',
    User: 'Instance',
  };
  const attrName = attrNameByTag[tag];
  if (attrName) {
    return attr(attrs, attrName);
  }
  return Object.values(attrs)[0] || '';
}

function parseUnitPanelButtons(unitId, catalog, localization, preferredCatalogs) {
  const definitions = selectPreferredDefinitions(catalog.units.get(unitId) || [], preferredCatalogs);
  const buttons = [];
  for (const definition of definitions) {
    const cardRegex = /<CardLayouts\b([^>]*?)\/>|<CardLayouts\b([^>]*?)>([\s\S]*?)<\/CardLayouts>/g;
    let cardMatch;
    while ((cardMatch = cardRegex.exec(definition.body)) !== null) {
      const cardAttrs = parseAttrs(cardMatch[1] || cardMatch[2] || '');
      const cardBody = cardMatch[3] || '';
      const cardId = attr(cardAttrs, 'index') || attr(cardAttrs, 'CardId') || '';
      const layoutRegex = /<LayoutButtons\b([^>]*?)\/>|<LayoutButtons\b([^>]*?)>([\s\S]*?)<\/LayoutButtons>/g;
      let layoutMatch;
      while ((layoutMatch = layoutRegex.exec(cardBody)) !== null) {
        const attrs = parseAttrs(layoutMatch[1] || layoutMatch[2] || '');
        const body = layoutMatch[3] || '';
        const face = attr(attrs, 'Face') || valueFromChildElement(body, 'Face');
        const type = attr(attrs, 'Type') || valueFromChildElement(body, 'Type') || (attr(attrs, 'AbilCmd') ? 'AbilCmd' : '');
        const abilCmd = attr(attrs, 'AbilCmd') || valueFromChildElement(body, 'AbilCmd');
        const buttonInfo = describeButton(face, catalog, localization, preferredCatalogs);
        buttons.push({
          face,
          type,
          abil_cmd: abilCmd,
          requirements: attr(attrs, 'Requirements') || valueFromChildElement(body, 'Requirements'),
          row: attr(attrs, 'Row') || valueFromChildElement(body, 'Row'),
          column: attr(attrs, 'Column') || valueFromChildElement(body, 'Column'),
          card_id: cardId,
          is_default_card: !cardId || cardId === '0',
          submenu_card_id: attr(attrs, 'SubmenuCardId') || valueFromChildElement(body, 'SubmenuCardId'),
          name: buttonInfo.name,
          tooltip: buttonInfo.tooltip,
          icon: buttonInfo.icon,
          source_file: definition.source_file,
          source_catalog: definition.source_catalog,
        });
      }
    }
  }

  return uniqueBy(buttons, (button) => [
    button.card_id,
    button.row,
    button.column,
    button.face,
    button.type,
    button.abil_cmd,
    button.requirements,
  ].join('|')).sort(comparePanelButtons);
}

function buildModProductionOptions(unitId, buttons, catalog, trainUnitOverrides = new Map(), preferredCatalogs = []) {
  const options = [];
  for (const button of buttons) {
    const { abilityId, commandIndex } = splitAbilityCommand(button.abil_cmd || '');
    if (!abilityId) {
      continue;
    }
    const definitions = selectPreferredDefinitions(catalog.abilities.get(abilityId) || [], preferredCatalogs);
    const infoEntries = flatten(definitions.map((definition) => parseInfoArrays(definition.snippet)));
    const matchedInfo = commandIndex
      ? infoEntries.filter((item) => item.index === commandIndex)
      : infoEntries.filter((item) => !item.index);
    for (const info of matchedInfo) {
      for (const targetUnit of unique([...info.units, ...info.morph_units])) {
        options.push({
          producer_unit_id: unitId,
          ability_id: abilityId,
          command_index: commandIndex,
          abil_cmd: button.abil_cmd || joinAbilityCommand(abilityId, commandIndex),
          button_face: button.face || '',
          unit: targetUnit,
          minerals: info.resources?.Minerals || '',
          vespene: info.resources?.Vespene || '',
          terrazine: info.resources?.Terrazine || '',
          custom: '',
          time: info.time || '',
          cost_mode: '当前Mod Ability.InfoArray',
        });
      }
    }

    const overrides = trainUnitOverrides.get(trainUnitOverrideKey(abilityId, commandIndex)) || [];
    for (const override of overrides) {
      const info = matchedInfo[0] || {};
      options.push({
        producer_unit_id: unitId,
        ability_id: abilityId,
        command_index: commandIndex,
        abil_cmd: button.abil_cmd || joinAbilityCommand(abilityId, commandIndex),
        button_face: button.face || '',
        unit: override.unit,
        minerals: info.resources?.Minerals || '',
        vespene: info.resources?.Vespene || '',
        terrazine: info.resources?.Terrazine || '',
        custom: '',
        time: info.time || '',
        cost_mode: `当前Mod UpgradeData训练目标覆盖:${override.upgrade_id}`,
        source: 'upgrade_train_unit_override',
        upgrade_id: override.upgrade_id,
        reference: override.reference,
        source_catalog: override.source_catalog,
        source_file: override.source_file,
      });
    }
  }
  return uniqueBy(options, (option) => `${option.producer_unit_id}|${option.abil_cmd}|${option.unit}`);
}

function inferModHeroEntries({
  commanderId,
  runtimeModule,
  catalog,
  localization,
  existingEntries,
  preferredCatalogs,
  trainUnitOverrides,
}) {
  const knownUnitIds = new Set(
    existingEntries
      .flatMap((entry) => [entry.unit_id, entry.id, ...(entry.resolved_unit_ids || [])])
      .filter(Boolean),
  );
  const candidates = [];
  const commanderCatalog = stripSc2ModSuffix(runtimeModule).toLowerCase();
  const explicitHeroUnitIds = inferCommanderHeroUnitIdsFromValidators(catalog, commanderCatalog, commanderId);
  if (!explicitHeroUnitIds.size) {
    return candidates;
  }

  for (const [unitId, definitions] of catalog.units.entries()) {
    if (knownUnitIds.has(unitId)) {
      continue;
    }
    if (!explicitHeroUnitIds.has(unitId)) {
      continue;
    }
    if (isAbathurLeviathanRosterItem({ official_id: unitId, runtime_unit: unitId }, commanderId)) {
      continue;
    }
    const moduleDefinitions = definitions.filter((definition) => (
      String(definition.source_catalog || '').toLowerCase() === commanderCatalog
    ));
    if (!moduleDefinitions.length) {
      continue;
    }
    const body = moduleDefinitions.map((definition) => definition.body).join('\n');
    if (parseEditorCategory(valueFromChildElement(body, 'EditorCategories'), 'ObjectType') !== 'Hero') {
      continue;
    }
    if (!isCommandableHeroUnit(body)) {
      continue;
    }

    const sourceFile = moduleDefinitions[0]?.source_file || '';
    const entry = buildModTechEntry({
      item: {
        official_id: unitId,
        runtime_unit: unitId,
        kind: 'hero',
        source: 'inferred current Mod hero catalog unit',
        source_file: sourceFile,
        status: 'catalog ObjectType:Hero',
      },
      commanderId,
      runtimeModule,
      catalog,
      localization,
      preferredCatalogs,
      trainUnitOverrides,
    });
    if (entry) {
      candidates.push(entry);
    }
  }

  return candidates.sort((a, b) => naturalSort(a.unit_id, b.unit_id));
}

function inferCommanderHeroUnitIdsFromValidators(catalog, commanderCatalog, commanderId) {
  const ids = new Set();
  const commanderKey = String(commanderId || '').toLowerCase();

  for (const definitions of catalog.validators?.values() || []) {
    for (const definition of definitions) {
      if (String(definition.source_catalog || '').toLowerCase() !== commanderCatalog) {
        continue;
      }
      if (definition.tag !== 'CValidatorUnitType' || isNegativeUnitTypeValidator(definition)) {
        continue;
      }

      const unitId = valueFromChildElement(definition.body, 'Value');
      if (!unitId) {
        continue;
      }
      const validatorId = String(definition.id || '').toLowerCase();
      const unitKey = unitId.toLowerCase();
      if (validatorId.includes(commanderKey) || unitKey.includes(commanderKey)) {
        ids.add(unitId);
      }
    }
  }

  return ids;
}

function isNegativeUnitTypeValidator(definition) {
  const id = String(definition.id || '').toLowerCase();
  return id.startsWith('not')
    || id.startsWith('isnot')
    || valueFromChildElement(definition.body, 'Find') === '0';
}

function isCommandableHeroUnit(body) {
  const activeFlags = new Set(
    extractElements(body)
      .filter((element) => element.name === 'FlagArray' && attr(element.attrs, 'index') && attr(element.attrs, 'value') !== '0')
      .map((element) => attr(element.attrs, 'index')),
  );
  return !activeFlags.has('Uncommandable') && !activeFlags.has('Unselectable');
}

function inferModProductionBuildingEntries({
  commanderId,
  runtimeModule,
  catalog,
  localization,
  existingEntries,
  preferredCatalogs,
  trainUnitOverrides,
}) {
  const knownBuildingIds = new Set(
    existingEntries
      .filter((entry) => entry.kind === 'building')
      .map((entry) => entry.unit_id)
      .filter(Boolean),
  );
  const runtimeUnitIds = runtimeProductionTargetIds(existingEntries);
  const candidates = [];

  for (const [unitId, definitions] of catalog.units.entries()) {
    if (knownBuildingIds.has(unitId)) {
      continue;
    }
    const preferredDefinitions = definitionsInPreferredCatalogs(definitions, preferredCatalogs);
    if (!preferredDefinitions.length) {
      continue;
    }
    const body = preferredDefinitions.map((definition) => definition.body).join('\n');
    const objectType = parseEditorCategory(valueFromChildElement(body, 'EditorCategories'), 'ObjectType');
    const isStandardProductionStructure = standardProductionStructureIds.has(unitId);
    if (objectType !== 'Structure' && !isStandardProductionStructure) {
      continue;
    }

    const abilities = parseUnitPanelButtons(unitId, catalog, localization, preferredCatalogs);
    const productionOptions = buildModProductionOptions(unitId, abilities, catalog, trainUnitOverrides, preferredCatalogs);
    const matchingOptions = productionOptions.filter((option) => (
      standardProductionAbilityIds.has(option.ability_id) && runtimeUnitIds.has(option.unit)
    ));
    if (!matchingOptions.length) {
      continue;
    }

    const sourceFile = preferredDefinitions[0]?.source_file || '';
    const entry = buildModTechEntry({
      item: {
        official_id: unitId,
        runtime_unit: unitId,
        kind: 'building',
        source: 'inferred production building',
        source_file: sourceFile,
        status: `produces:${unique(matchingOptions.map((option) => option.unit)).join('/')}`,
      },
      commanderId,
      runtimeModule,
      catalog,
      localization,
      preferredCatalogs,
      trainUnitOverrides,
    });
    if (entry) {
      entry.production_options = matchingOptions;
      entry.production_chain = {
        inferred: true,
        matched_runtime_unit_ids: unique(matchingOptions.map((option) => option.unit)).sort(naturalSort),
      };
      candidates.push(entry);
    }
  }

  return candidates.sort((a, b) => naturalSort(a.unit_id, b.unit_id));
}

function runtimeProductionTargetIds(entries) {
  const ids = new Set();
  for (const entry of entries) {
    if (entry.kind === 'building') {
      continue;
    }
    for (const id of [entry.id, entry.unit_id, ...(entry.resolved_unit_ids || [])]) {
      if (id) {
        ids.add(id);
      }
    }
  }
  return ids;
}

function buildTrainUnitOverrideIndex(catalog, preferredCatalogs) {
  const overrides = new Map();
  for (const [upgradeId, definitions] of catalog.upgrades.entries()) {
    for (const definition of definitionsInPreferredCatalogs(definitions, preferredCatalogs)) {
      for (const element of extractElements(definition.snippet)) {
        if (element.name !== 'EffectArray') {
          continue;
        }
        if (String(attr(element.attrs, 'Operation') || '').toLowerCase() !== 'set') {
          continue;
        }
        const unit = attr(element.attrs, 'Value');
        const reference = attr(element.attrs, 'Reference');
        const target = parseTrainUnitOverrideReference(reference);
        if (!unit || !target) {
          continue;
        }
        pushMapArray(overrides, trainUnitOverrideKey(target.abilityId, target.commandIndex), {
          upgrade_id: upgradeId,
          ability_id: target.abilityId,
          command_index: target.commandIndex,
          unit,
          reference,
          source_catalog: definition.source_catalog,
          source_file: definition.source_file,
        });
      }
    }
  }

  for (const [key, values] of overrides.entries()) {
    overrides.set(key, uniqueBy(values, (item) => [
      item.upgrade_id,
      item.ability_id,
      item.command_index,
      item.unit,
      item.reference,
      item.source_catalog,
      item.source_file,
    ].join('|')));
  }
  return overrides;
}

function parseTrainUnitOverrideReference(reference) {
  const match = String(reference || '').match(/^Abil,([^,]+),InfoArray\[([^\]]+)\]\.Unit(?:\[\d+\])?$/i);
  if (!match) {
    return null;
  }
  return {
    abilityId: match[1],
    commandIndex: match[2],
  };
}

function trainUnitOverrideKey(abilityId, commandIndex) {
  return `${abilityId || ''}|${commandIndex || ''}`;
}

function definitionsInPreferredCatalogs(definitions, preferredCatalogs = []) {
  if (!definitions.length || !preferredCatalogs.length) {
    return definitions;
  }
  for (const preferred of preferredCatalogs) {
    const matched = definitions.filter((definition) => (
      String(definition.source_catalog || '').toLowerCase() === String(preferred).toLowerCase()
    ));
    if (matched.length) {
      return matched;
    }
  }
  return definitions;
}

function summarizeModUnitEntry(unitId, catalog, localization, preferredCatalogs) {
  const definitions = selectPreferredDefinitions(catalog.units.get(unitId) || [], preferredCatalogs);
  const body = definitions.map((definition) => definition.body).join('\n');
  const stats = summarizeModUnitStats(body);
  return {
    name: resolveLocalizedText(localization, valueFromChildElement(body, 'Name'), `Unit/Name/${unitId}`, preferredCatalogs) || unitId,
    tooltip: resolveLocalizedText(localization, valueFromChildElement(body, 'Description') || valueFromChildElement(body, 'Tooltip'), `Unit/Tooltip/${unitId}`, preferredCatalogs),
    icon: valueFromChildElement(body, 'Icon'),
    unit: stats,
  };
}

function summarizeModUnitStats(body) {
  const food = valueFromChildElement(body, 'Food');
  const supplyValue = food.startsWith('-') ? food.slice(1) : '';
  const providedValue = food && !food.startsWith('-') ? food : '';
  return {
    object_type: parseEditorCategory(valueFromChildElement(body, 'EditorCategories'), 'ObjectType'),
    race: valueFromChildElement(body, 'Race'),
    minerals: indexedElementValue(body, 'CostResource', 'Minerals'),
    vespene: indexedElementValue(body, 'CostResource', 'Vespene'),
    supply_cost: supplyValue,
    supply_provided: providedValue,
    build_time: valueFromChildElement(body, 'BuildTime') || valueFromChildElement(body, 'RepairTime'),
    life: valueFromChildElement(body, 'LifeMax') || valueFromChildElement(body, 'LifeStart'),
    shields: valueFromChildElement(body, 'ShieldsMax') || valueFromChildElement(body, 'ShieldsStart'),
    energy: valueFromChildElement(body, 'EnergyMax') || valueFromChildElement(body, 'EnergyStart'),
    sight: valueFromChildElement(body, 'Sight'),
    attributes: extractElements(body)
      .filter((element) => element.name === 'Attributes' && attr(element.attrs, 'index') && attr(element.attrs, 'value') !== '0')
      .map((element) => attr(element.attrs, 'index'))
      .sort(naturalSort),
  };
}

function describeButton(face, catalog, localization, preferredCatalogs) {
  if (!face) {
    return { name: '', tooltip: '', icon: '' };
  }
  const definitions = selectPreferredDefinitions(catalog.buttons.get(face) || [], preferredCatalogs);
  const body = definitions.map((definition) => definition.body).join('\n');
  return {
    name: resolveLocalizedText(localization, valueFromChildElement(body, 'Name'), `Button/Name/${face}`, preferredCatalogs) || face,
    tooltip: resolveLocalizedText(
      localization,
      valueFromChildElement(body, 'Tooltip') || valueFromChildElement(body, 'AlertTooltip'),
      `Button/Tooltip/${face}`,
      preferredCatalogs,
    ),
    icon: valueFromChildElement(body, 'Icon') || valueFromChildElement(body, 'AlertIcon'),
  };
}


function extractCatalogEntries(filePath) {
  const rawText = fs.readFileSync(filePath, 'utf8');
  const text = stripXmlComments(rawText);
  const relativePath = normalizePath(path.relative(repoRoot, filePath));
  const sourceCatalog = sourceCatalogName(relativePath);
  const entries = [];
  const regex = /<([A-Za-z][\w@.-]*)\b([^>]*?\bid="([^"]+)"[^>]*?)\/>|<([A-Za-z][\w@.-]*)\b([^>]*?\bid="([^"]+)"[^>]*?)>([\s\S]*?)<\/\4>/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    const tag = match[1] || match[4];
    if (!tag.startsWith('C')) {
      continue;
    }
    const attrText = match[2] || match[5] || '';
    const attrs = parseAttrs(attrText);
    const id = match[3] || match[6];
    const body = match[7] || '';
    entries.push({
      id,
      tag,
      attrs,
      parent: attr(attrs, 'parent'),
      default: attr(attrs, 'default'),
      source_catalog: sourceCatalog,
      source_file: relativePath,
      snippet: match[0],
      body,
    });
  }
  return entries;
}

function extractElements(snippet) {
  const elements = [];
  const regex = /<([A-Za-z][\w@.-]*)\b([^<>]*?)(?:\/>|>)/g;
  let match;
  while ((match = regex.exec(snippet)) !== null) {
    const name = match[1];
    if (name.startsWith('?') || name === 'Catalog') {
      continue;
    }
    elements.push({
      name,
      attrs: parseAttrs(match[2] || ''),
    });
  }
  return elements;
}

function extractTooltipEffectRefs(text) {
  const refs = [];
  const regex = /\{Effect,([^,}]+),([^}]+)\}/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    refs.push({
      effect_id: match[1],
      field: match[2],
    });
  }
  return uniqueBy(refs, (item) => `${item.effect_id}:${item.field}`);
}

function loadAllCommanderData() {
  const commanderIds = fs
    .readdirSync(commanderRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
  const map = new Map();
  for (const commanderId of commanderIds) {
    const dir = path.join(commanderRoot, commanderId);
    map.set(commanderId, {
      commander: readJson(path.join(dir, 'commander.json')),
      buildings: readJson(path.join(dir, 'buildings.json')),
      units: readJson(path.join(dir, 'units.json')),
      heroes: readJson(path.join(dir, 'heroes.json')),
      command_cards: readJson(path.join(dir, 'command_cards.json')),
    });
  }
  return map;
}

function buildEntryNameMap(data, allData) {
  const localNames = new Map();
  const globalNames = new Map();
  const addEntry = (map, entry) => {
    const names = [entry.id, entry.unit_id, ...(entry.resolved_unit_ids || [])].filter(Boolean);
    for (const id of names) {
      if (!map.has(id)) {
        map.set(id, displayName(entry));
      }
    }
  };

  for (const entry of [...data.buildings, ...data.units, ...data.heroes]) {
    addEntry(localNames, entry);
  }
  for (const commander of allData.values()) {
    for (const entry of [...commander.buildings, ...commander.units, ...commander.heroes]) {
      addEntry(globalNames, entry);
    }
  }

  return {
    localNames,
    globalNames,
    localIds: new Set(localNames.keys()),
  };
}

function renderOverviewMarkdown(report) {
  const lines = [];
  lines.push('# 指挥官科技链路排查总览 / Commander Tech Tree Diagnostics Overview');
  lines.push('');
  lines.push(`- 生成时间 / Generated at：${new Date(report.generated_at).toLocaleString('zh-CN', { hour12: false })}`);
  lines.push(`- 口径 / Scope：${report.source_description}`);
  lines.push('- 用途 / Purpose：快速排查“建筑有哪些面板技能、生产了哪些单位、单位有哪些面板技能、技能关联哪些效果/创建单位效果”。 / Quickly inspect which panel abilities each building has, which units it produces, which panel abilities each unit has, and which effects / create-unit effects each ability links to.');
  lines.push(`- 基础命令 / Basic commands：${report.options.include_basic_commands ? '已展开 Move / Stop / Attack 等基础命令 / Expanded basic commands such as Move / Stop / Attack' : 'Markdown 和 JSON 均隐藏 Move / Stop / Attack 等基础命令，可用 `--include-basic` 展开 / Markdown and JSON both hide basic Move / Stop / Attack commands; use `--include-basic` to expand them'}`);
  lines.push('');
  lines.push('## 总览表 / Overview Table');
  lines.push('');
  lines.push('| 指挥官 / Commander | 开局槽位 / Opener | 建筑 / Buildings | 生产补充建筑 / Production-support Buildings | 单位 / Units | 英雄 / Heroes | 建筑按钮 / Building Buttons | 单位按钮 / Unit Buttons | 生产/创建单位 / Produced or Created Units | 效果引用 / Effect References | 中文明细 / Chinese Details |');
  lines.push('| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |');
  for (const item of report.commanders) {
    const fileName = `commanders/${item.commander}-${sanitizeFilePart(item.name)}.md`;
    lines.push(`| ${item.name} / \`${item.commander}\` | ${item.opener?.length || 0} | ${item.summary.building_count} | ${item.summary.production_building_count || 0} | ${item.summary.unit_count} | ${item.summary.hero_count} | ${item.summary.building_panel_button_count} | ${item.summary.unit_panel_button_count} | ${item.summary.produced_unit_count} | ${item.summary.effect_ref_count} | [打开 / Open](${fileName}) |`);
  }
  lines.push('');
  lines.push('## 输出文件 / Output Files');
  lines.push('');
  lines.push('- `commander-tech-tree-diagnostics.json`：完整结构化明细 / Full structured details, 适合继续 grep / 脚本二次分析 / suitable for further grep / script-based analysis.');
  lines.push('- `commanders/*.md`：逐指挥官中英排查页 / Per-commander bilingual inspection pages.');
  return lines.join('\n');
}

function renderCommanderMarkdown(commander) {
  const lines = [];
  lines.push(`# ${commander.name} / \`${commander.commander}\` 科技链路排查 / Tech Tree Diagnostics`);
  lines.push('');
  lines.push(`- 描述 / Description：${commander.description || '无 / None'}`);
  lines.push(`- 数据来源 / Data source：${commander.source_kind === 'mod' ? '当前 Mod / Current Mod' : '官方导出 / Official export'}，目录 / Directory：\`${commander.source_dir}\``);
  if (commander.runtime_module || commander.runtime_instance) {
    lines.push(`- 当前 Mod 运行名册 / Current Mod roster：module=\`${commander.runtime_module || '-'}\`，instance=\`${commander.runtime_instance || '-'}\``);
  }
  lines.push(`- 统计 / Stats：建筑 ${commander.summary.building_count}、生产链补充建筑 ${commander.summary.production_building_count || 0}、单位 ${commander.summary.unit_count}、英雄 ${commander.summary.hero_count}、建筑按钮 ${commander.summary.building_panel_button_count}、单位按钮 ${commander.summary.unit_panel_button_count}、效果引用 ${commander.summary.effect_ref_count}`);
  lines.push('- 名称显示 / Name display：能从当前 Mod zhCN 解析时显示“中文名 / `英文ID`”；仅显示 `ID` 表示当前 Mod 未找到可用中文名。');
  lines.push('');
  renderOpener(lines, commander.opener || []);
  renderTopPanel(lines, commander.top_panel);
  renderEntryGroup(lines, '建筑', commander.buildings);
  renderEntryGroup(lines, '生产链补充建筑', commander.production_buildings || []);
  renderEntryGroup(lines, '单位', commander.units);
  renderEntryGroup(lines, '英雄', commander.heroes);

  while (lines.at(-1) === '') {
    lines.pop();
  }
  return lines.join('\n');
}

function renderOpener(lines, opener) {
  lines.push('## 初始化/开局单位 / Initial Opener');
  lines.push('');
  if (!opener.length) {
    lines.push('- 无 / None');
    lines.push('');
    return;
  }
  lines.push('| 槽位 / Slot | 单位 / Unit | 预期类型 / Expected Kind | Catalog 父级 / Catalog Parent | 是否在运行名册 / In Runtime Roster | 来源 / Source |');
  lines.push('| --- | --- | --- | --- | --- | --- |');
  for (const item of opener) {
    lines.push(`| ${escapeMd(item.role_name)} | ${formatEntityLabel(item.name, item.unit_id)} | ${item.expected_kind || '-'} | ${formatIdList(item.parent_ids)} | ${item.in_runtime_roster ? '是 / Yes' : '否 / No'} | ${formatOpenerSource(item)} |`);
  }
  lines.push('');
}

function renderTopPanel(lines, topPanel) {
  lines.push('## 指挥官默认/顶部技能 / Commander Default / Top-panel Skills');
  lines.push('');
  if (!topPanel.length) {
    lines.push('- 无 / None');
    lines.push('');
    return;
  }
  lines.push('| 技能名 / Skill Name | Ability/Cmd | 类型 / Type | 效果引用 / Effect References | Catalog 来源 / Catalog Sources |');
  lines.push('| --- | --- | --- | --- | --- |');
  for (const item of topPanel) {
    const ability = item.ability;
    lines.push(`| ${formatEntityLabel(ability.button_name, ability.ability_id || ability.face || ability.abil_cmd)} | \`${ability.abil_cmd || ability.ability_id || '-'}\` | ${formatCatalogTypes(ability)} | ${formatEffects(ability.effect_refs)} | ${formatSources(ability.catalog_sources)} |`);
  }
  lines.push('');
}

function renderEntryGroup(lines, title, entries) {
  lines.push(`## ${title} / ${entryGroupTitleEn(title)}`);
  lines.push('');
  if (!entries.length) {
    lines.push('- 无 / None');
    lines.push('');
    return;
  }

  for (const entry of entries) {
    lines.push(`### ${formatEntityLabel(entry.name, entry.unit_id)}`);
    lines.push('');
    if (entry.source || entry.roster) {
      lines.push(`- 来源 / Source：${formatEntrySource(entry)}`);
    }
    lines.push(`- 数值 / Stats：${formatStats(entry.stats)}`);
    if (entry.production) {
      lines.push(`- 自身来源 / Own source：${formatProduction(entry.production, new Map())}`);
    }
    lines.push(`- Catalog 技能链接 / Catalog ability links：${formatCatalogAbilityLinks(entry.catalog_unit.ability_links)}`);
    if (entry.catalog_unit.behavior_links.length) {
      lines.push(`- 关联 Behavior / Linked behaviors：${entry.catalog_unit.behavior_links.map((id) => `\`${id}\``).join('、')}`);
    }
    if (entry.produced_units.length) {
      lines.push(`- 可生产/创建 / Produced or created：${entry.produced_units.map(formatProducedUnit).join('、')}`);
    }
    if (entry.hidden_basic_button_count > 0) {
      lines.push(`- 已隐藏基础按钮 / Hidden basic buttons：${entry.hidden_basic_button_count} 个（用 \`--include-basic\` 可展开 / use \`--include-basic\` to expand）`);
    }
    lines.push('');
    renderAbilityTable(lines, entry.panel_abilities);
  }
}

function renderAbilityTable(lines, abilities) {
  if (!abilities.length) {
    lines.push('- 面板技能 / Panel skills：无 / None');
    lines.push('');
    return;
  }

  lines.push('| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |');
  lines.push('| --- | --- | --- | --- | --- | --- | --- |');
  for (const ability of abilities) {
    const position = [ability.layout.row, ability.layout.column].filter((item) => item !== '').join(',');
    lines.push(`| ${position || '-'} | ${formatEntityLabel(ability.button_name, ability.ability_id || ability.face)} | \`${ability.abil_cmd || ability.ability_id || '-'}\` | ${formatCatalogTypes(ability)} | ${formatTargets(ability)} | ${formatEffects(ability.effect_refs)} | ${escapeMd(ability.requirements || '-')} |`);
  }
  lines.push('');
}

function formatStats(stats) {
  const parts = [];
  if (stats.object_type) parts.push(`类型 / Type ${stats.object_type}`);
  if (stats.race) parts.push(`种族 / Race ${stats.race}`);
  if (stats.life) parts.push(`生命 / Life ${stats.life}`);
  if (stats.shields) parts.push(`护盾 / Shields ${stats.shields}`);
  if (stats.energy) parts.push(`能量 / Energy ${stats.energy}`);
  if (stats.minerals || stats.vespene) parts.push(`费用 / Cost ${stats.minerals || 0}/${stats.vespene || 0}`);
  if (stats.supply_cost) parts.push(`补给 / Supply ${stats.supply_cost}`);
  if (stats.supply_provided) parts.push(`提供补给 / Supply provided ${stats.supply_provided}`);
  return parts.join('，') || '无 / None';
}

function formatEntrySource(entry) {
  const bits = [];
  if (entry.roster?.source) bits.push(`名册 / Roster ${entry.roster.source}`);
  if (entry.roster?.official_id && entry.roster.official_id !== entry.unit_id) bits.push(`官方ID / Official ID ${entry.roster.official_id}`);
  if (entry.roster?.status) bits.push(`状态 / Status ${entry.roster.status}`);
  if (entry.source?.module) bits.push(`模块 / Module ${entry.source.module}`);
  if (entry.source?.file) bits.push(`文件 / File \`${entry.source.file}\``);
  return bits.join('，') || '无 / None';
}

function formatOpenerSource(item) {
  const bits = [];
  if (item.source?.catalog) bits.push(`Catalog ${item.source.catalog}`);
  if (item.source?.instance) bits.push(`Instance ${item.source.instance}`);
  if (item.source?.file) bits.push(`文件 / File \`${item.source.file}\``);
  if (item.runtime_roster?.status) bits.push(`名册状态 / Roster status ${item.runtime_roster.status}`);
  return bits.join('，') || '无 / None';
}

function formatIdList(ids) {
  if (!ids?.length) {
    return '-';
  }
  return ids.map((id) => `\`${id}\``).join('、');
}

function formatProduction(option) {
  const unitName = option.unit || option.unit_name ? formatEntityLabel(option.unit_name, option.unit) : '';
  const producerName = option.producer_unit_id || option.producer_name
    ? formatEntityLabel(option.producer_name, option.producer_unit_id)
    : '';
  const cost = [option.minerals, option.vespene].filter(Boolean).join('/');
  const bits = [
    producerName ? `生产者 / Producer ${producerName}` : '',
    option.abil_cmd ? `能力 / Ability ${option.abil_cmd}` : '',
    unitName ? `目标 / Target ${unitName}` : '',
    cost ? `费用 / Cost ${cost}` : '',
    option.time ? `耗时 / Time ${option.time}` : '',
  ].filter(Boolean);
  return bits.join('，') || '无 / None';
}

function formatProducedUnit(item) {
  const rosterText = item.in_current_commander_roster ? '' : '（非本指挥官名册 / not in current commander roster）';
  const cost = [item.minerals, item.vespene].filter(Boolean).join('/');
  const costText = cost ? `，费用 / Cost ${cost}` : '';
  const timeText = item.time ? `，耗时 / Time ${item.time}s` : '';
  return `${formatEntityLabel(item.name, item.unit_id)}${rosterText}${costText}${timeText}`;
}

function formatTargets(ability) {
  const targets = [];
  for (const match of ability.production_matches || []) {
    if (match.unit) {
      targets.push(formatEntityLabel(match.unit_name, match.unit));
    }
  }
  for (const target of ability.catalog_targets || []) {
    const typeCn = target.type === 'upgrade' ? '升级 / Upgrade' : '单位 / Unit';
    targets.push(`${typeCn}:${formatEntityLabel(target.name, target.id)}`);
  }
  for (const effect of ability.effect_refs || []) {
    for (const unit of flattenEffectSpawnUnits(effect)) {
      targets.push(`效果创建 / Effect creates:${formatEntityLabel(unit.name, unit.id)}`);
    }
  }
  return unique(targets).join('、') || '-';
}

function formatEffects(effects) {
  if (!effects?.length) {
    return '-';
  }
  return effects
    .slice(0, 12)
    .map((effect) => {
      const type = formatBilingualPairs(effect.catalog_type_cn || [], effect.catalog_types || []);
      return `${type ? `${type}:` : ''}\`${effect.id}\``;
    })
    .join('、') + (effects.length > 12 ? `、另 ${effects.length - 12} 个` : '');
}

function formatCatalogTypes(ability) {
  if (!ability.catalog_type_cn?.length) {
    return ability.unresolved_catalog ? '未解析 / Unresolved' : '-';
  }
  return formatBilingualPairs(ability.catalog_type_cn, ability.catalog_types);
}

function formatCatalogAbilityLinks(links) {
  if (!links.length) {
    return '无 / None';
  }
  return links
    .map((link) => {
      const basicText = link.is_basic ? '基础 / Basic' : formatBilingualLabel(link.catalog_type_cn, link.catalog_type_raw);
      return `${formatEntityLabel(link.name, link.id)}${basicText ? `(${basicText})` : ''}`;
    })
    .join('、');
}

function formatSources(sources) {
  if (!sources.length) {
    return '-';
  }
  return sources
    .slice(0, 4)
    .map((source) => `${source.source_catalog}:${source.count}`)
    .join('、') + (sources.length > 4 ? `、另 ${sources.length - 4} 个` : '');
}

function summarizeDefinitionSources(definitions) {
  const grouped = new Map();
  for (const definition of definitions) {
    const key = `${definition.source_catalog}|${definition.source_file}`;
    if (!grouped.has(key)) {
      grouped.set(key, {
        source_catalog: definition.source_catalog,
        source_file: definition.source_file,
        count: 0,
      });
    }
    grouped.get(key).count += 1;
  }
  return [...grouped.values()];
}

function abilityTypeCn(abilityId, catalogIndex) {
  const definitions = catalogIndex.abilities.get(abilityId) || [];
  const tags = unique(definitions.map((definition) => definition.tag));
  return tags.map((tag) => chineseTypeNames[tag] || tag).join('、') || '';
}

function abilityTypeRaw(abilityId, catalogIndex) {
  const definitions = catalogIndex.abilities.get(abilityId) || [];
  const tags = unique(definitions.map((definition) => definition.tag));
  return tags.join('、') || '';
}

function localizedCatalogAbilityName(abilityId, catalogIndex, localization, preferredCatalogs) {
  if (!abilityId) {
    return '';
  }
  const definitions = selectPreferredDefinitions(catalogIndex.abilities.get(abilityId) || [], preferredCatalogs);
  const body = definitions.map((definition) => definition.body).join('\n');
  return resolveLocalizedText(
    localization,
    valueFromChildElement(body, 'Name'),
    [
      `Abil/Name/${abilityId}`,
      `Button/Name/${abilityId}`,
    ],
    preferredCatalogs,
  ) || abilityId;
}

function formatBilingualLabel(chinese, english) {
  if (chinese && english) {
    return `${chinese} / ${english}`;
  }
  return chinese || english || '';
}

function formatBilingualPairs(chineseList, englishList) {
  const count = Math.max(chineseList?.length || 0, englishList?.length || 0);
  if (count === 0) {
    return '-';
  }

  const parts = [];
  for (let index = 0; index < count; index += 1) {
    parts.push(formatBilingualLabel(chineseList?.[index] || '', englishList?.[index] || ''));
  }
  return parts.join('、');
}

function formatEntityLabel(name, id) {
  const cleanId = String(id || '').trim();
  const cleanName = normalizeWhitespace(name);
  if (!cleanId && !cleanName) {
    return '-';
  }
  if (!cleanId) {
    return escapeMd(cleanName);
  }
  if (isMeaningfulDisplayName(cleanName, cleanId)) {
    return `${escapeMd(cleanName)} / \`${cleanId}\``;
  }
  return `\`${cleanId}\``;
}

function entityDisplayName(name, id) {
  const cleanId = String(id || '').trim();
  const cleanName = normalizeWhitespace(name);
  if (!cleanId) {
    return cleanName;
  }
  return isMeaningfulDisplayName(cleanName, cleanId)
    ? `${cleanName} / ${cleanId}`
    : cleanId;
}

function isMeaningfulDisplayName(name, id) {
  const cleanName = normalizeWhitespace(name);
  const cleanId = String(id || '').trim();
  if (!cleanName || cleanName === cleanId) {
    return false;
  }
  return !isLikelyLocalizationKey(cleanName);
}

function entryGroupTitleEn(title) {
  const lookup = {
    建筑: 'Buildings',
    生产链补充建筑: 'Production-support Buildings',
    单位: 'Units',
    英雄: 'Heroes',
  };
  return lookup[title] || title;
}

function collectAbilityStats(ability, effectIds, producedUnitIds, options = {}) {
  for (const effect of ability.effect_refs || []) {
    collectEffectStats(effect, effectIds, producedUnitIds, options);
  }
  for (const production of ability.production_matches || []) {
    if (production.unit && (!options.onlyCurrentCommanderRoster || production.in_current_commander_roster)) {
      producedUnitIds.add(production.unit);
    }
  }
  for (const target of ability.catalog_targets || []) {
    if (
      (target.type === 'unit' || target.type === 'morph_unit')
      && (!options.onlyCurrentCommanderRoster || target.in_current_commander_roster)
    ) {
      producedUnitIds.add(target.id);
    }
  }
}

function collectEffectStats(effect, effectIds, producedUnitIds, options = {}) {
  if (!effect?.id || effectIds.has(effect.id)) {
    return;
  }
  effectIds.add(effect.id);
  for (const unit of effect.spawn_units || []) {
    if (!options.onlyCurrentCommanderRoster || unit.in_current_commander_roster) {
      producedUnitIds.add(unit.id);
    }
  }
  for (const child of effect.child_effects || []) {
    collectEffectStats(child, effectIds, producedUnitIds, options);
  }
}

function isBasicPanelButton(button) {
  const { abilityId } = splitAbilityCommand(button.abil_cmd || '');
  const hasRequirement = Boolean(button.requirements);
  if (!abilityId && !button.face) {
    return !hasRequirement;
  }
  if (abilityId === '255' || button.face === '255') {
    return true;
  }
  return basicAbilityIds.has(abilityId) || basicButtonFaces.has(button.face);
}

function displayName(entry) {
  return entry?.name || entry?.unit_id || entry?.id || '';
}

function nameForId(id, entryNameMap) {
  if (!id) {
    return '';
  }
  return entryNameMap.localNames.get(id) || entryNameMap.globalNames.get(id) || id;
}

function splitAbilityCommand(abilCmd) {
  if (!abilCmd) {
    return { abilityId: '', commandIndex: '' };
  }
  const [abilityId, commandIndex = ''] = abilCmd.split(',');
  return { abilityId, commandIndex };
}

function joinAbilityCommand(abilityId, commandIndex) {
  if (!abilityId) {
    return '';
  }
  return commandIndex ? `${abilityId},${commandIndex}` : abilityId;
}

function sourceCatalogName(relativePath) {
  const normalized = normalizePath(relativePath).toLowerCase();
  const commanderMatch = normalized.match(/mods\/starcoop\/commanders\/([^/]+)\.sc2mod/);
  if (commanderMatch) {
    return commanderMatch[1];
  }
  const modMatch = normalized.match(/mods\/(?:.*\/)?([^/]+)\.sc2mod/);
  if (modMatch) {
    return modMatch[1];
  }
  const campaignMatch = normalized.match(/campaigns\/([^/]+)\.sc2campaign/);
  if (campaignMatch) {
    return campaignMatch[1];
  }
  return 'unknown';
}

function stripXmlComments(text) {
  return text.replace(/<!--[\s\S]*?-->/g, '');
}

function parseAttrs(text) {
  const attrs = {};
  const regex = /([A-Za-z_:][\w:.-]*)="([^"]*)"/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    attrs[match[1]] = decodeXml(match[2]);
  }
  return attrs;
}

function attr(attrs, name) {
  if (!attrs) {
    return '';
  }
  if (Object.hasOwn(attrs, name)) {
    return attrs[name];
  }
  const lower = name.toLowerCase();
  const key = Object.keys(attrs).find((candidate) => candidate.toLowerCase() === lower);
  return key ? attrs[key] : '';
}

function decodeXml(value) {
  return value
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function defaultOutputDir(source) {
  const topic = source === 'mod' ? '当前Mod指挥官科技链路排查' : '指挥官科技链路排查';
  return path.join(repoRoot, 'docs', '每日进度', `${formatDate(new Date())}-${topic}`);
}

function orderCommanderIds(ids) {
  const order = new Map(commanderOrderPreference.map((id, index) => [id, index]));
  return [...ids].sort((a, b) => {
    const orderA = order.has(a) ? order.get(a) : Number.MAX_SAFE_INTEGER;
    const orderB = order.has(b) ? order.get(b) : Number.MAX_SAFE_INTEGER;
    if (orderA !== orderB) {
      return orderA - orderB;
    }
    return naturalSort(a, b);
  });
}

function moduleNameForCommander(commanderId) {
  return commanderModuleOverrides[commanderId] || `XM${commanderId}.SC2Mod`;
}

function preferredCatalogNames(runtimeModuleOrCatalog, commanderId) {
  return unique([
    stripSc2ModSuffix(runtimeModuleOrCatalog || ''),
    stripSc2ModSuffix(moduleNameForCommander(commanderId)),
    'XMFinal',
    'XMCore',
  ].map((item) => item.toLowerCase()));
}

function stripSc2ModSuffix(value) {
  return String(value || '').replace(/\.SC2Mod$/i, '');
}

function runtimeCommanderToOfficial(value) {
  return runtimeCommanderAliases[value] || value;
}

function shortCommanderId(id) {
  const withoutRace = String(id || '').replace(/^(Terran|Zerg|Protoss)/, '');
  return runtimeCommanderToOfficial(withoutRace);
}

function commanderSourceScore(sourceCatalog, commanderId) {
  const source = String(sourceCatalog || '').toLowerCase();
  const expected = stripSc2ModSuffix(moduleNameForCommander(commanderId)).toLowerCase();
  if (source === expected) {
    return 100;
  }
  if (source === 'xmfinal') {
    return 80;
  }
  if (source === 'xmcore') {
    return 70;
  }
  return 10;
}

function selectPreferredDefinitions(definitions, preferredCatalogs = []) {
  if (!definitions.length || !preferredCatalogs.length) {
    return definitions;
  }
  for (const preferred of preferredCatalogs) {
    const selected = definitions.filter((definition) => (
      String(definition.source_catalog || '').toLowerCase() === String(preferred).toLowerCase()
    ));
    if (selected.length) {
      return selected;
    }
  }
  return definitions;
}

function fieldArray(fields, fieldId) {
  return (fields.get(fieldId) || []).filter((value) => value !== undefined && value !== null && value !== '');
}

function stringField(fields, fieldId) {
  return fieldPlainValue(fieldArray(fields, fieldId)[0]);
}

function stringArrayField(fields, fieldId) {
  return fieldArray(fields, fieldId).map(fieldPlainValue).filter(Boolean);
}

function textField(fields, fieldId) {
  const value = fieldArray(fields, fieldId)[0];
  if (!value) {
    return '';
  }
  return typeof value === 'object' ? (value.text || '') : String(value);
}

function textArrayField(fields, fieldId) {
  return fieldArray(fields, fieldId).map((value) => (typeof value === 'object' ? (value.text || '') : String(value))).filter(Boolean);
}

function abilityCommandArrayField(fields, fieldId) {
  return fieldArray(fields, fieldId)
    .filter((value) => value && typeof value === 'object')
    .map((value) => ({
      abil: value.abil || '',
      cmd: value.cmd || '',
    }))
    .filter((value) => value.abil);
}

function fieldPlainValue(value) {
  if (value === undefined || value === null) {
    return '';
  }
  if (typeof value === 'object') {
    return value.text || value.key || value.abil || value.instance || '';
  }
  return String(value);
}

function comparePanelButtons(a, b) {
  const cardCompare = naturalSort(a.card_id || '0', b.card_id || '0');
  if (cardCompare !== 0) return cardCompare;
  const rowCompare = naturalSort(a.row || '0', b.row || '0');
  if (rowCompare !== 0) return rowCompare;
  const columnCompare = naturalSort(a.column || '0', b.column || '0');
  if (columnCompare !== 0) return columnCompare;
  return naturalSort(a.face || a.abil_cmd, b.face || b.abil_cmd);
}

function valueFromChildElement(body, elementName, attrName = 'value') {
  const escapedName = escapeRegex(elementName);
  const regex = new RegExp(`<${escapedName}\\b([^>]*)>`, 'i');
  const match = String(body || '').match(regex);
  if (!match) {
    return '';
  }
  return attr(parseAttrs(match[1] || ''), attrName);
}

function indexedElementValue(body, elementName, indexName) {
  for (const element of extractElements(body)) {
    if (element.name !== elementName) {
      continue;
    }
    if (attr(element.attrs, 'index') === indexName) {
      return attr(element.attrs, 'value');
    }
  }
  return '';
}

function parseEditorCategory(value, key) {
  const regex = new RegExp(`(?:^|,)${escapeRegex(key)}:([^,]+)`, 'i');
  return String(value || '').match(regex)?.[1] || '';
}

function resolveLocalizedText(localization, explicitKeyOrText, fallbackKey, preferredCatalogs) {
  let explicitText = '';
  if (explicitKeyOrText) {
    const explicit = String(explicitKeyOrText).trim();
    const localized = localizeKey(localization, explicit, preferredCatalogs);
    if (localized) {
      return localized;
    }
    if (!isLikelyLocalizationKey(explicit)) {
      explicitText = explicit;
    }
  }
  const fallbacks = Array.isArray(fallbackKey) ? fallbackKey : [fallbackKey];
  for (const key of fallbacks) {
    const localized = localizeKey(localization, key, preferredCatalogs);
    if (localized) {
      return localized;
    }
  }
  return explicitText;
}

function localizeKey(localization, key, preferredCatalogs = []) {
  if (!localization || !key) {
    return '';
  }
  const candidates = localization.entries.get(key) || [];
  if (!candidates.length) {
    return '';
  }
  for (const preferred of preferredCatalogs) {
    const match = candidates.find((candidate) => String(candidate.source_catalog || '').toLowerCase() === String(preferred).toLowerCase());
    if (match) {
      return match.text;
    }
  }
  return candidates.at(-1).text;
}

function isLikelyLocalizationKey(value) {
  const text = String(value || '').trim();
  if (!text) {
    return false;
  }
  if (text.includes('/')) {
    return true;
  }
  return /^[A-Za-z0-9_.,:+-]+$/.test(text) && !/\s/.test(text);
}

function decodeGameString(value) {
  return String(value || '')
    .replace(/\\n/g, '\n')
    .replace(/\\r/g, '\r')
    .replace(/\\t/g, '\t');
}

function stripGalaxyLineComments(text) {
  return String(text || '').replace(/\/\/.*$/gm, '');
}

function findMatchingBrace(text, openIndex) {
  if (openIndex < 0) {
    return -1;
  }
  let depth = 0;
  for (let index = openIndex; index < text.length; index += 1) {
    const char = text[index];
    if (char === '{') {
      depth += 1;
    } else if (char === '}') {
      depth -= 1;
      if (depth === 0) {
        return index;
      }
    }
  }
  return -1;
}

function escapeRegex(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function walkFiles(root) {
  const files = [];
  const stack = [root];
  while (stack.length) {
    const current = stack.pop();
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(fullPath);
      } else if (entry.isFile()) {
        files.push(fullPath);
      }
    }
  }
  return files.sort(naturalSort);
}

function parseArgs(argv) {
  const parsed = {
    commanders: [],
    includeBasicCommands: false,
    effectDepth: 2,
    outDir: '',
    source: 'mod',
    modRoot: '',
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--commander' || arg === '-c') {
      parsed.commanders.push(...(argv[index + 1] || '').split(',').map((item) => item.trim()).filter(Boolean));
      index += 1;
    } else if (arg === '--out-dir') {
      parsed.outDir = argv[index + 1] || '';
      index += 1;
    } else if (arg === '--source') {
      parsed.source = (argv[index + 1] || 'mod').trim().toLowerCase();
      index += 1;
    } else if (arg === '--mod-root') {
      parsed.modRoot = argv[index + 1] || '';
      index += 1;
    } else if (arg === '--include-basic') {
      parsed.includeBasicCommands = true;
    } else if (arg === '--effect-depth') {
      parsed.effectDepth = Number.parseInt(argv[index + 1] || '2', 10);
      index += 1;
    } else if (arg === '--help' || arg === '-h') {
      printHelpAndExit();
    } else {
      throw new Error(`未知参数：${arg}`);
    }
  }

  if (!Number.isFinite(parsed.effectDepth) || parsed.effectDepth < 0) {
    parsed.effectDepth = 2;
  }
  if (!['official', 'mod'].includes(parsed.source)) {
    throw new Error(`--source 只支持 official 或 mod，当前为：${parsed.source}`);
  }

  return parsed;
}

function printHelpAndExit() {
  console.log(`用法：
  node scripts/sc2/export-commander-tech-tree-diagnostics.mjs
  node scripts/sc2/export-commander-tech-tree-diagnostics.mjs --source mod --commander Raynor
  node scripts/sc2/export-commander-tech-tree-diagnostics.mjs --commander Raynor
  node scripts/sc2/export-commander-tech-tree-diagnostics.mjs --source official --commander Raynor
  node scripts/sc2/export-commander-tech-tree-diagnostics.mjs --commander Raynor,Kerrigan --include-basic

参数：
  --source          数据源：mod（默认，读取 合作指挥官版起义狂潮 当前 Mod）或 official（旧官方口径）。
  --mod-root        当前 Mod 根目录；默认 合作指挥官版起义狂潮。
  --commander, -c   只导出指定指挥官 short_id，可逗号分隔；默认导出全部指挥官。
  --out-dir         指定输出目录；默认 docs/每日进度/<日期>-当前Mod指挥官科技链路排查。
  --include-basic   展开 Move / Stop / Attack 等基础命令；默认隐藏以减少噪音。
  --effect-depth    递归展开技能关联效果的深度，默认 2。
`);
  process.exit(0);
}

function pushMapArray(map, key, value) {
  if (!key) {
    return;
  }
  if (!map.has(key)) {
    map.set(key, []);
  }
  map.get(key).push(value);
}

function pushMapSet(map, key, value) {
  if (!map.has(key)) {
    map.set(key, new Set());
  }
  map.get(key).add(value);
}

function unique(values) {
  return [...new Set(values.filter((value) => value !== undefined && value !== null && value !== ''))];
}

function uniqueBy(values, keySelector) {
  const seen = new Set();
  const output = [];
  for (const value of values) {
    const key = keySelector(value);
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    output.push(value);
  }
  return output;
}

function flatten(items) {
  return items.flatMap((item) => item);
}

function sumBy(items, selector) {
  return items.reduce((sum, item) => sum + selector(item), 0);
}

function naturalSort(a, b) {
  return String(a).localeCompare(String(b), 'zh-Hans-CN', { numeric: true });
}

function normalizeWhitespace(value) {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

function normalizePath(value) {
  return String(value).replace(/\\/g, '/');
}

function sanitizeFilePart(value) {
  return String(value || '')
    .replace(/[<>:"/\\|?*\u0000-\u001F]/g, '-')
    .replace(/\s+/g, '')
    .slice(0, 80);
}

function escapeMd(value) {
  return String(value || '')
    .replace(/\|/g, '\\|')
    .replace(/\n/g, ' ')
    .trim();
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
}
