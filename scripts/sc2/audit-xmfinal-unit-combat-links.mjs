import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const repoRoot = process.cwd();
const targetBase = path.join(repoRoot, "原始mod", "Mods", "XM", "XMFinal.SC2Mod", "Base.SC2Data");
const targetRoot = path.join(targetBase, "GameData");
const targetDocumentInfo = path.join(repoRoot, "原始mod", "Mods", "XM", "XMFinal.SC2Mod", "DocumentInfo");
const officialMirrorRoot = path.join(repoRoot, "游戏数据", "官方SC2原始文本镜像");
const commandersRoot = path.join(repoRoot, "游戏数据", "官方合作指挥官", "commanders");
const defaultOutputDir = path.join(repoRoot, "docs", "每日进度", "2026-05-29-原始mod-wiki指挥官对比", "combat-links");

const commanderNames = new Map([
  ["Abathur", "阿巴瑟"],
  ["Alarak", "阿拉纳克"],
  ["Artanis", "阿塔尼斯"],
  ["Dehaka", "德哈卡"],
  ["Fenix", "菲尼克斯"],
  ["Horner", "霍纳与汉"],
  ["Karax", "凯拉克斯"],
  ["Kerrigan", "凯瑞甘"],
  ["Mengsk", "蒙斯克"],
  ["Nova", "诺娃"],
  ["Raynor", "雷诺"],
  ["Stetmann", "斯台特曼"],
  ["Stukov", "斯托科夫"],
  ["Swann", "斯旺"],
  ["Tychus", "泰凯斯"],
  ["Vorazun", "沃拉尊"],
  ["Zagara", "扎加拉"],
  ["Zeratul", "泽拉图"],
]);

const officialRoots = [
  path.join(officialMirrorRoot, "mods", "core.sc2mod", "base.sc2data", "gamedata"),
  path.join(officialMirrorRoot, "mods", "liberty.sc2mod", "base.sc2data", "gamedata"),
  path.join(officialMirrorRoot, "mods", "libertymulti.sc2mod", "base.sc2data", "gamedata"),
  path.join(officialMirrorRoot, "campaigns", "libertystory.sc2campaign", "base.sc2data", "gamedata"),
  path.join(officialMirrorRoot, "mods", "swarm.sc2mod", "base.sc2data", "gamedata"),
  path.join(officialMirrorRoot, "mods", "swarmmulti.sc2mod", "base.sc2data", "gamedata"),
  path.join(officialMirrorRoot, "campaigns", "swarm.sc2campaign", "base.sc2data", "gamedata"),
  path.join(officialMirrorRoot, "campaigns", "swarmstory.sc2campaign", "base.sc2data", "gamedata"),
  path.join(officialMirrorRoot, "mods", "void.sc2mod", "base.sc2data", "gamedata"),
  path.join(officialMirrorRoot, "mods", "voidmulti.sc2mod", "base.sc2data", "gamedata"),
  path.join(officialMirrorRoot, "campaigns", "void.sc2campaign", "base.sc2data", "gamedata"),
  path.join(officialMirrorRoot, "campaigns", "voidstory.sc2campaign", "base.sc2data", "gamedata"),
  path.join(officialMirrorRoot, "mods", "starcoop", "starcoop.sc2mod", "base.sc2data", "gamedata"),
  path.join(officialMirrorRoot, "mods", "starcoop", "commanders", "arcturusmengsk.sc2mod", "base.sc2data", "gamedata"),
  path.join(officialMirrorRoot, "mods", "starcoop", "commanders", "egonstetmann.sc2mod", "base.sc2data", "gamedata"),
].filter((root) => fs.existsSync(root));

const runtimeDependencyGroups = [
  {
    match: /libertystory\.sc2campaign|LibertyStory\.SC2Campaign/i,
    roots: [
      path.join(officialMirrorRoot, "mods", "core.sc2mod", "base.sc2data", "gamedata"),
      path.join(officialMirrorRoot, "mods", "liberty.sc2mod", "base.sc2data", "gamedata"),
      path.join(officialMirrorRoot, "mods", "libertymulti.sc2mod", "base.sc2data", "gamedata"),
      path.join(officialMirrorRoot, "campaigns", "libertystory.sc2campaign", "base.sc2data", "gamedata"),
    ],
  },
  {
    match: /SwarmStory\.SC2Campaign|swarmstory\.sc2campaign/i,
    roots: [
      path.join(officialMirrorRoot, "mods", "swarm.sc2mod", "base.sc2data", "gamedata"),
      path.join(officialMirrorRoot, "mods", "swarmmulti.sc2mod", "base.sc2data", "gamedata"),
      path.join(officialMirrorRoot, "campaigns", "swarm.sc2campaign", "base.sc2data", "gamedata"),
      path.join(officialMirrorRoot, "campaigns", "swarmstory.sc2campaign", "base.sc2data", "gamedata"),
    ],
  },
  {
    match: /Void\.SC2Campaign|void\.sc2campaign/i,
    roots: [
      path.join(officialMirrorRoot, "mods", "void.sc2mod", "base.sc2data", "gamedata"),
      path.join(officialMirrorRoot, "mods", "voidmulti.sc2mod", "base.sc2data", "gamedata"),
      path.join(officialMirrorRoot, "campaigns", "void.sc2campaign", "base.sc2data", "gamedata"),
      path.join(officialMirrorRoot, "campaigns", "voidstory.sc2campaign", "base.sc2data", "gamedata"),
    ],
  },
];

const genericAbilityIds = new Set([
  "move",
  "stop",
  "attack",
  "AttackRedirect",
  "StopRedirect",
  "Rally",
  "RallyBuilding",
  "RallyBlock",
  "BuildInProgress",
  "SelectBuilder",
]);

const ignoredCommandFaces = new Set([
  "AcquireMove",
  "Attack",
  "AttackChampions",
  "AttackWorker",
  "Cancel",
  "CancelBuilding",
  "DehakaBuild",
  "GatherZerg",
  "MapObjectInteract",
  "Move",
  "MoveChampions",
  "MoveHoldPosition",
  "MovePatrol",
  "Rally",
  "Repair",
  "ReturnCargo",
  "SelectBuilder",
  "Spray",
  "Stop",
  "TerranBuild",
]);

const ignoredCommandAbilities = new Set([
  "255",
  "AdeptPhaseShiftCancel",
  "BattlecruiserAttack",
  "BattlecruiserMove",
  "BattlecruiserStop",
  "BuildInProgress",
  "DroneCarcassHarvest",
  "DroneHarvest",
  "HyperjumpNoVision",
  "MapObjectInteract",
  "move",
  "ProgressRally",
  "Rally",
  "RallyBlock",
  "Repair",
  "SelectBuilder",
  "SprayZerg",
  "stop",
  "TerranBuild",
  "TerranBuildAdvanced",
  "TerranBuildFullRefund",
  "TerranBuildNova",
  "TychusHeroCommonAbil1",
  "TychusHeroCommonAbil2",
  "TychusHeroCommonAbil3",
  "TychusHeroCommonAbil4",
  "TychusHeroCommonAbil5",
]);

const commandAbilityOverrides = {
  Abathur: {
    Viper: {
      ViperConsumeStructure: "ViperConsumption",
    },
  },
  Dehaka: {
    DehakaCreeperFlying: {
      DehakaLocustFlyingSwoop: "DehakaLocustFlyingSwoopAttack",
    },
  },
  Karax: {
    ShieldBattery: {
      ShieldBatteryRechargeChanneled: "ShieldBatteryRechargeEx5",
    },
  },
  Kerrigan: {
    Hydralisk: {
      BurrowUltraliskDown: "BurrowHydraliskDown",
      BurrowUltraliskUp: "BurrowHydraliskUp",
    },
    Ultralisk: {
      BurrowUltraliskUp: "BurrowUltraliskUp",
    },
    Zergling: {
      BurrowUltraliskDown: "BurrowZerglingDown",
      BurrowUltraliskUp: "BurrowZerglingUp",
    },
  },
  Nova: {
    GhostNova: {
      ChannelSnipe: "Snipe_BlackOps",
      EMP: "EMPBlackOps",
    },
  },
  Swann: {
    HerculesSwann: {
      Hyperjump: "HyperjumpSwann",
    },
    ScienceVesselSwann: {
      CommanderPrestigeSwannHerculesScienceVesselTacticalJump: "HyperjumpRSwann",
      NanoRepair: "NanoRepairSwann",
      DefensiveMatrixTarget: "DefensiveMatrixSwann",
      ScienceVesselNanoRepairDouble: "ScienceVesselNanoRepairDouble",
      VoidScienceVesselNanoRepair: "VoidScienceVesselNanoRepair",
    },
  },
  Zagara: {
    ZagaraZergling: {
      MorphZerglingToBaneling: "MorphToBaneling",
      BurrowUltraliskDown: "BurrowZerglingDown",
      BurrowUltraliskUp: "BurrowZerglingUp",
    },
    Baneling: {
      BurrowUltraliskDown: "BurrowBanelingDown",
      BurrowUltraliskUp: "BurrowBanelingUp",
    },
    Zergling: {
      MorphZerglingToBaneling: "MorphToBaneling",
      BurrowUltraliskDown: "BurrowZerglingDown",
      BurrowUltraliskUp: "BurrowZerglingUp",
    },
  },
};

const intentionallyExcludedCommandButtons = [
  {
    commander: "Kerrigan",
    unitId: "Zergling",
    abilityIds: ["MorphZerglingToBaneling", "MorphToBaneling"],
    reason: "凯瑞甘跳虫当前设计明确不允许变异为爆虫。",
  },
  {
    commander: "Stukov",
    unitId: "Zergling",
    abilityIds: ["MorphZerglingToBaneling", "MorphToBaneling"],
    reason: "斯托科夫感染跳虫不走普通跳虫变爆虫链。",
  },
];

function parseArgs(argv) {
  const options = { outputDir: defaultOutputDir };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const next = () => {
      index += 1;
      if (index >= argv.length) throw new Error(`Missing value for ${arg}`);
      return argv[index];
    };
    if (arg === "--output-dir") {
      options.outputDir = path.resolve(next());
    } else if (arg === "--help" || arg === "-h") {
      printHelp();
      process.exit(0);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return options;
}

function printHelp() {
  console.log(`Usage:
  node scripts/sc2/audit-xmfinal-unit-combat-links.mjs [--output-dir <path>]

Audits current XMFinal generated commander units/buildings for attack, weapon, and command-card ability links.`);
}

function readText(file) {
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
}

function readJson(file, fallback = []) {
  return fs.existsSync(file) ? JSON.parse(readText(file)) : fallback;
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, files);
    } else if (entry.name.toLowerCase().endsWith(".xml")) {
      files.push(fullPath);
    }
  }
  return files;
}

function stripXmlComments(text) {
  return text.replace(/<!--[\s\S]*?-->/g, "");
}

function parseCatalogNodes(text, fileName) {
  const nodes = [];
  const cleanText = stripXmlComments(text);
  const catalogOpen = cleanText.indexOf("<Catalog");
  const catalogStart = catalogOpen >= 0 ? cleanText.indexOf(">", catalogOpen) + 1 : 0;
  const catalogEnd = cleanText.lastIndexOf("</Catalog>");
  const endLimit = catalogEnd >= 0 ? catalogEnd : cleanText.length;
  let index = catalogStart;

  while (index < endLimit) {
    const startIndex = cleanText.indexOf("<", index);
    if (startIndex < 0 || startIndex >= endLimit) break;
    if (cleanText.startsWith("<?", startIndex) || cleanText.startsWith("<!", startIndex)) {
      index = cleanText.indexOf(">", startIndex) + 1;
      if (index <= 0) break;
      continue;
    }

    const openEnd = cleanText.indexOf(">", startIndex);
    if (openEnd < 0) throw new Error(`Unclosed catalog opening tag in ${fileName}`);
    const openTag = cleanText.slice(startIndex, openEnd + 1);
    const openMatch = openTag.match(/^<([A-Za-z0-9_]+)\b/);
    if (!openMatch) {
      index = openEnd + 1;
      continue;
    }

    const tag = openMatch[1];
    const idMatch = openTag.match(/\bid="([^"]+)"/);
    let endIndex = openEnd + 1;
    if (!openTag.endsWith("/>")) {
      const closeTag = `</${tag}>`;
      const closeIndex = cleanText.indexOf(closeTag, endIndex);
      if (closeIndex < 0) {
        throw new Error(`Unclosed catalog node ${tag}${idMatch ? ` id=${idMatch[1]}` : ""} in ${fileName}`);
      }
      endIndex = closeIndex + closeTag.length;
    }

    if (idMatch) {
      const parentMatch = openTag.match(/\bparent="([^"]+)"/);
      nodes.push({
        fileName,
        tag,
        id: idMatch[1],
        parent: parentMatch?.[1] ?? "",
        text: cleanText.slice(startIndex, endIndex),
      });
    }
    index = endIndex;
  }
  return nodes;
}

function catalogKindForTag(tag) {
  if (tag === "CUnit") return "unit";
  if (tag === "CButton") return "button";
  if (tag === "CRequirement") return "requirement";
  if (tag.startsWith("CAbil")) return "ability";
  if (tag.startsWith("CWeapon")) return "weapon";
  return "";
}

function loadCatalogNodes(roots, layer) {
  const nodes = [];
  for (const root of roots) {
    for (const file of walk(root).sort()) {
      const relative = path.relative(repoRoot, file).replaceAll("\\", "/");
      for (const node of parseCatalogNodes(readText(file), relative)) {
        const kind = catalogKindForTag(node.tag);
        if (!kind) continue;
        nodes.push({ ...node, kind, layer, source: relative });
      }
    }
  }
  return nodes;
}

function byId(nodes, kind) {
  const result = new Map();
  for (const node of nodes) {
    if (kind && node.kind !== kind) continue;
    if (!result.has(node.id)) result.set(node.id, []);
    result.get(node.id).push(node);
  }
  return result;
}

function runtimeOfficialRoots() {
  const documentInfo = readText(targetDocumentInfo);
  const roots = [];
  for (const group of runtimeDependencyGroups) {
    if (group.match.test(documentInfo)) roots.push(...group.roots);
  }
  return unique(roots.filter((root) => fs.existsSync(root)));
}

function runtimeLocalDependencyRoots() {
  const documentInfo = readText(targetDocumentInfo);
  const roots = [];
  for (const match of documentInfo.matchAll(/file:Mods[\\/]+XM[\\/]+([^<\\/]+\.SC2Mod)/gi)) {
    roots.push(path.join(repoRoot, "原始mod", "Mods", "XM", match[1], "Base.SC2Data", "GameData"));
  }
  return unique(roots.filter((root) => fs.existsSync(root)));
}

function getArrayEntries(text, elementName, attrName) {
  const entries = [];
  const regex = new RegExp(`<${elementName}\\b([^>]*)>`, "g");
  for (const match of text.matchAll(regex)) {
    const attrs = match[1];
    const index = attrs.match(/\bindex="([^"]*)"/)?.[1] ?? "";
    const removed = /\bremoved="1"/.test(attrs);
    const link = attrs.match(new RegExp(`\\b${attrName}="([^"]*)"`))?.[1] ?? "";
    entries.push({ index, link, removed });
  }
  return entries;
}

function applyArrayEntries(slots, entries) {
  for (const entry of entries) {
    if (entry.index) {
      if (entry.removed || !entry.link) {
        slots.delete(entry.index);
      } else {
        slots.set(entry.index, entry.link);
      }
      continue;
    }

    if (entry.removed || !entry.link) continue;
    const numericIndexes = [...slots.keys()]
      .map((value) => Number(value))
      .filter((value) => Number.isInteger(value));
    const nextIndex = numericIndexes.length === 0 ? 0 : Math.max(...numericIndexes) + 1;
    slots.set(String(nextIndex), entry.link);
  }
}

function arraySlotValues(slots) {
  return [...slots.entries()]
    .sort(([left], [right]) => Number(left) - Number(right))
    .map(([, value]) => value);
}

function getLayoutButtons(text) {
  const buttons = [];
  for (const match of text.matchAll(/<LayoutButtons\b([^>]*)>/g)) {
    const attrs = match[1];
    const abilityId = abilityIdFromAbilCmd(attrs.match(/\bAbilCmd="([^"]*)"/)?.[1] ?? "");
    if (!abilityId) continue;
    buttons.push({
      face: attrs.match(/\bFace="([^"]*)"/)?.[1] ?? "",
      abilCmd: attrs.match(/\bAbilCmd="([^"]*)"/)?.[1] ?? "",
      abilityId,
      row: attrs.match(/\bRow="([^"]*)"/)?.[1] ?? "",
      column: attrs.match(/\bColumn="([^"]*)"/)?.[1] ?? "",
      removed: /\bremoved="1"/.test(attrs),
    });
  }
  return buttons;
}

function applyLayoutButtons(slots, entries) {
  for (const entry of entries) {
    const key = `${entry.face}|${entry.abilCmd}|${entry.row}|${entry.column}`;
    if (entry.removed) {
      slots.delete(key);
    } else {
      slots.set(key, entry);
    }
  }
}

function emptyUnitState() {
  return {
    abilitySlots: new Map(),
    weaponSlots: new Map(),
    equipmentWeaponSlots: new Map(),
    layoutSlots: new Map(),
  };
}

function cloneUnitState(state) {
  return {
    abilitySlots: new Map(state.abilitySlots),
    weaponSlots: new Map(state.weaponSlots),
    equipmentWeaponSlots: new Map(state.equipmentWeaponSlots),
    layoutSlots: new Map(state.layoutSlots),
  };
}

function applyUnitNode(state, node) {
  applyArrayEntries(state.abilitySlots, getArrayEntries(node.text, "AbilArray", "Link"));
  applyArrayEntries(state.weaponSlots, getArrayEntries(node.text, "WeaponArray", "Link"));
  applyArrayEntries(state.equipmentWeaponSlots, getArrayEntries(node.text, "EquipmentArray", "Weapon"));
  applyLayoutButtons(state.layoutSlots, getLayoutButtons(node.text));
}

function summarizeUnitState(state) {
  return {
    abilities: unique(arraySlotValues(state.abilitySlots)),
    weapons: unique(arraySlotValues(state.weaponSlots)),
    equipmentWeapons: unique(arraySlotValues(state.equipmentWeaponSlots)),
    layoutButtons: [...state.layoutSlots.values()],
  };
}

function getUnitStateById(nodesById, unitId, seen = new Set()) {
  if (!unitId || seen.has(unitId)) return emptyUnitState();
  seen.add(unitId);
  const nodes = nodesById.get(unitId) ?? [];
  const parentId = [...nodes].reverse().find((node) => node.parent)?.parent ?? "";
  const state = parentId ? cloneUnitState(getUnitStateById(nodesById, parentId, seen)) : emptyUnitState();
  for (const node of nodes) {
    applyUnitNode(state, node);
  }
  return state;
}

function getUnitSummaryById(nodesById, unitId) {
  return summarizeUnitState(getUnitStateById(nodesById, unitId));
}

function abilityIdFromAbilCmd(abilCmd) {
  if (!abilCmd) return "";
  const abilityId = String(abilCmd).split(",", 1)[0].trim();
  return abilityId === "255" ? "" : abilityId;
}

function commandCategory(command) {
  const abilityId = command.abilityId;
  const cmd = command.abilCmd;
  const index = cmd.includes(",") ? cmd.split(",")[1] : "";
  if (!abilityId) return "empty";
  if (genericAbilityIds.has(abilityId)) return "通用命令";
  if (abilityId === "BuildInProgress" || index === "Halt" || index === "Cancel") return "建造中/取消";
  if (/^(Train|Build|Research)/i.test(index) || /(Train|Build|Research)/i.test(abilityId)) return "生产/建造/研发";
  if (/^(Morph|Evolve|Upgrade)/i.test(abilityId) || /^(Morph|Evolve|Upgrade)/i.test(index)) return "变形/进化";
  return "主动技能";
}

function commandOverrideFor(record, abilityId) {
  return commandAbilityOverrides[record.commander]?.[record.unitId]?.[abilityId]
    ?? commandAbilityOverrides[record.commander]?.[record.sourceUnitId]?.[abilityId]
    ?? "";
}

function isIntentionallyExcludedCommand(record, button, abilityId) {
  const face = String(button.face ?? "");
  const requirementId = String(button.requirements ?? "");
  return intentionallyExcludedCommandButtons.some((rule) =>
    rule.commander === record.commander
    && (rule.unitId === record.unitId || rule.unitId === record.sourceUnitId)
    && (
      matchesAny(rule.abilityIds, abilityId)
      || matchesAny(rule.faceIds, face)
      || matchesAny(rule.requirementIds, requirementId)
    ));
}

function matchesAny(values, value) {
  return Array.isArray(values) && values.includes(value);
}

function shouldIgnoreCommandButton(button, abilityId) {
  const face = String(button.face ?? "");
  const type = String(button.type ?? "");
  const cmdIndex = String(button.abil_cmd ?? "").includes(",") ? String(button.abil_cmd).split(",")[1] : "";
  const hasButtonPayload = button.button && Object.keys(button.button).length > 0;
  if (!abilityId) return true;
  if (!face && !button.requirements && !hasButtonPayload) return true;
  if (type === "Passive" || type === "Submenu" || type === "CancelSubmenu") return true;
  if (ignoredCommandFaces.has(face) || ignoredCommandAbilities.has(abilityId)) return true;
  if (cmdIndex === "Cancel" || cmdIndex === "Halt") return true;
  return false;
}

function parseGeneratedUnitRecords(file, kind) {
  const records = [];
  let commander = "";
  for (const line of readText(file).split(/\r?\n/)) {
    const fnMatch = line.match(/bool\s+libE0EAE146_gf_XMTestBench_([A-Za-z]+)(?:Roster|Buildings)\b/);
    if (fnMatch) {
      commander = fnMatch[1];
      continue;
    }
    const aliasMatch = line.match(/Create(?:BuildingRosterUnit|RosterUnit)Alias\([^,]+,\s*"([^"]+)",\s*"([^"]+)"/);
    if (commander && aliasMatch) {
      records.push({ commander, sourceUnitId: aliasMatch[1], unitId: aliasMatch[2], kind });
      continue;
    }
    const unitMatch = line.match(/Create(?:BuildingRosterUnit|RosterUnit)\([^,]+,\s*"([^"]+)"/);
    if (commander && unitMatch) {
      records.push({ commander, sourceUnitId: unitMatch[1], unitId: unitMatch[1], kind });
    }
  }
  return records;
}

function currentUnitRecords() {
  const rosterFile = path.join(targetBase, "LibE0EAE146_CommanderRosters.galaxy");
  const buildingFile = path.join(targetBase, "LibE0EAE146_CommanderBuildings.galaxy");
  const records = [
    ...parseGeneratedUnitRecords(rosterFile, "单位/英雄"),
    ...parseGeneratedUnitRecords(buildingFile, "建筑"),
  ];
  const seen = new Set();
  return records.filter((record) => {
    const key = `${record.commander}|${record.kind}|${record.sourceUnitId}|${record.unitId}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function commandCardEntriesByCommander() {
  const result = new Map();
  for (const commander of fs.readdirSync(commandersRoot, { withFileTypes: true }).filter((entry) => entry.isDirectory()).map((entry) => entry.name)) {
    result.set(commander, readJson(path.join(commandersRoot, commander, "command_cards.json"), []));
  }
  return result;
}

function findCommandCardEntries(index, record) {
  const entries = index.get(record.commander) ?? [];
  return entries.filter((entry) => {
    const ids = [entry.id, entry.unit_id, ...(entry.resolved_unit_ids ?? [])].filter(Boolean);
    return ids.includes(record.sourceUnitId) || ids.includes(record.unitId);
  });
}

function expectedCommands(index, record) {
  const seen = new Set();
  const commands = [];
  for (const entry of findCommandCardEntries(index, record)) {
    for (const card of entry.cards ?? []) {
      for (const button of card.buttons ?? []) {
        const abilCmd = button.abil_cmd ?? "";
        const rawAbilityId = abilityIdFromAbilCmd(abilCmd);
        if (shouldIgnoreCommandButton(button, rawAbilityId)) continue;
        if (isIntentionallyExcludedCommand(record, button, rawAbilityId)) continue;
        const abilityId = commandOverrideFor(record, rawAbilityId) || rawAbilityId;
        const command = {
          abilityId,
          rawAbilityId,
          abilCmd,
          face: button.face ?? "",
          name: button.button?.name ?? button.name ?? "",
          tooltip: button.button?.tooltip ?? button.tooltip ?? "",
          type: button.type ?? "",
          requirements: button.requirements ?? "",
          row: button.row ?? "",
          column: button.column ?? "",
        };
        command.category = commandCategory(command);
        const key = `${command.abilityId}|${command.face}|${command.abilCmd}|${command.row}|${command.column}`;
        if (seen.has(key)) continue;
        seen.add(key);
        commands.push(command);
      }
    }
  }
  return commands;
}

function importantMissingCommands(commands, effectiveAbilities, officialAbilities) {
  const ignored = new Set(["通用命令", "建造中/取消"]);
  return commands.filter((command) =>
    !ignored.has(command.category)
    && officialAbilities.includes(command.abilityId)
    && !effectiveAbilities.includes(command.abilityId));
}

function catalogStatus(nodesById, id) {
  if (!id) return "未使用";
  const nodes = nodesById.get(id) ?? [];
  if (nodes.length === 0) return "缺失";
  return nodes.map((node) => `${node.layer}:${node.tag}`).join(",");
}

function makeRows() {
  const targetNodes = loadCatalogNodes([targetRoot], "xmfinal");
  const officialNodes = loadCatalogNodes(officialRoots, "official");
  const runtimeNodes = loadCatalogNodes([...runtimeOfficialRoots(), ...runtimeLocalDependencyRoots(), targetRoot], "runtime");
  const targetByUnitId = byId(targetNodes, "unit");
  const officialByUnitId = byId(officialNodes, "unit");
  const runtimeByUnitId = byId(runtimeNodes, "unit");
  const officialAbilityById = byId(officialNodes, "ability");
  const runtimeAbilityById = byId(runtimeNodes, "ability");
  const cardIndex = commandCardEntriesByCommander();

  return currentUnitRecords().map((record) => {
    const officialUnitId = officialByUnitId.has(record.unitId) ? record.unitId : record.sourceUnitId;
    const local = getUnitSummaryById(targetByUnitId, record.unitId);
    const official = getUnitSummaryById(officialByUnitId, officialUnitId);
    const effective = getUnitSummaryById(runtimeByUnitId, record.unitId);
    const officialHasCombat = official.abilities.includes("attack") || official.weapons.length > 0 || official.equipmentWeapons.length > 0;
    const expectedCombat = officialHasCombat;
    const localHasAttack = local.abilities.includes("attack");
    const localHasWeapon = local.weapons.length > 0 || local.equipmentWeapons.length > 0;
    const effectiveHasAttack = effective.abilities.includes("attack");
    const effectiveHasWeapon = effective.weapons.length > 0 || effective.equipmentWeapons.length > 0;
    const needsLocalAttack = expectedCombat && official.abilities.includes("attack") && !localHasAttack;
    const needsLocalWeapon = expectedCombat && (official.weapons.length > 0 || official.equipmentWeapons.length > 0) && !localHasWeapon;
    const needsEffectiveAttack = expectedCombat && official.abilities.includes("attack") && !effectiveHasAttack;
    const needsEffectiveWeapon = expectedCombat && (official.weapons.length > 0 || official.equipmentWeapons.length > 0) && !effectiveHasWeapon;
    const commands = expectedCommands(cardIndex, record);
    const missingCommands = importantMissingCommands(commands, effective.abilities, official.abilities);
    const missingCatalogCommands = commands.filter((command) =>
      official.abilities.includes(command.abilityId)
      && catalogStatus(runtimeAbilityById, command.abilityId) === "缺失");

    const status = needsEffectiveAttack || needsEffectiveWeapon
      ? "risk_effective_missing_combat_link"
      : missingCommands.length > 0 || missingCatalogCommands.length > 0
        ? "risk_missing_command_card_ability"
        : expectedCombat
          ? "ok_effective_combat_link"
          : "noncombat_or_no_weapon";

    return {
      commander: record.commander,
      commanderName: commanderNames.get(record.commander) ?? record.commander,
      kind: record.kind,
      sourceUnitId: record.sourceUnitId,
      unitId: record.unitId,
      expectedCombat,
      localAbilities: local.abilities,
      localWeapons: local.weapons,
      localEquipmentWeapons: local.equipmentWeapons,
      effectiveAbilities: effective.abilities,
      effectiveWeapons: effective.weapons,
      effectiveEquipmentWeapons: effective.equipmentWeapons,
      officialAbilities: official.abilities,
      officialUnitId,
      officialWeapons: official.weapons,
      officialEquipmentWeapons: official.equipmentWeapons,
      expectedCommands: commands,
      missingCommands,
      missingCatalogCommands,
      needsLocalAttack,
      needsLocalWeapon,
      needsEffectiveAttack,
      needsEffectiveWeapon,
      status,
      abilityCatalogMissing: catalogStatus(officialAbilityById, record.unitId),
      localSources: unique((targetByUnitId.get(record.unitId) ?? []).map((node) => node.source)),
      runtimeSources: unique((runtimeByUnitId.get(record.unitId) ?? []).map((node) => node.source)),
      officialSources: unique((officialByUnitId.get(officialUnitId) ?? []).map((node) => node.source)),
    };
  });
}

function md(value) {
  return String(value ?? "")
    .replaceAll("|", "\\|")
    .replaceAll(/\r?\n/g, "<br>");
}

function list(values) {
  return values.join(", ") || "无";
}

function commandList(commands) {
  return commands.map((command) => `${command.name || command.face || command.abilityId}(${command.abilityId})`).join(", ") || "无";
}

function renderMarkdown(rows) {
  const lines = [];
  const combatRisk = rows.filter((row) => row.status === "risk_effective_missing_combat_link");
  const commandRisk = rows.filter((row) => row.status === "risk_missing_command_card_ability");
  const localGap = rows.filter((row) => row.needsLocalAttack || row.needsLocalWeapon);
  lines.push("# XMFinal 单位攻击/武器/命令卡技能审计");
  lines.push("");
  lines.push("- 审计对象：当前 `原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data` 生成的 18 指挥官单位、英雄、建筑 profile。");
  lines.push("- 判定口径：官方合作指挥官 `command_cards.json` + 官方 Catalog 候选 + 当前 XMFinal 本地节点 + `DocumentInfo` 已挂载的运行时依赖。");
  lines.push("- `risk_effective_missing_combat_link` 表示按当前运行时依赖链仍缺 `attack` 或武器链接，是“单位可能没有攻击能力”的高优先级风险。");
  lines.push("- `risk_missing_command_card_ability` 表示官方命令卡存在主动/生产/变形技能，但当前运行时单位 `AbilArray` 未接上，对应按钮可能不可用。");
  lines.push("- 这仍是静态 Catalog 审计，不等价于进图实机点击验证。");
  lines.push("");
  lines.push("## 汇总");
  lines.push("");
  lines.push(`- 总行数：${rows.length}`);
  lines.push(`- 实际运行时攻击/武器风险项：${combatRisk.length}`);
  lines.push(`- 命令卡技能接线风险项：${commandRisk.length}`);
  lines.push(`- 本地显式 attack/武器缺口项：${localGap.length}`);
  lines.push(`- 非战斗/官方无武器项：${rows.filter((row) => row.status === "noncombat_or_no_weapon").length}`);
  lines.push("");

  lines.push("## 运行时攻击/武器风险");
  lines.push("");
  if (combatRisk.length === 0) {
    lines.push("- 无。");
  } else {
    lines.push("| 指挥官 | 类型 | CUnit | 缺 attack | 缺武器 | 官方武器候选 | 运行时技能 | 运行时武器 |");
    lines.push("|---|---|---|---:|---:|---|---|---|");
    for (const row of combatRisk) {
      lines.push(`| ${md(row.commanderName)} | ${md(row.kind)} | ${md(row.unitId)} | ${row.needsEffectiveAttack ? "是" : "否"} | ${row.needsEffectiveWeapon ? "是" : "否"} | ${md(list([...row.officialWeapons, ...row.officialEquipmentWeapons]))} | ${md(list(row.effectiveAbilities))} | ${md(list([...row.effectiveWeapons, ...row.effectiveEquipmentWeapons]))} |`);
    }
  }
  lines.push("");

  lines.push("## 命令卡技能接线风险");
  lines.push("");
  if (commandRisk.length === 0) {
    lines.push("- 无。");
  } else {
    lines.push("| 指挥官 | 类型 | CUnit | 官方命令卡缺接线 | Catalog 缺失命令 | 当前运行时技能 |");
    lines.push("|---|---|---|---|---|---|");
    for (const row of commandRisk) {
      lines.push(`| ${md(row.commanderName)} | ${md(row.kind)} | ${md(row.unitId)} | ${md(commandList(row.missingCommands))} | ${md(commandList(row.missingCatalogCommands))} | ${md(list(row.effectiveAbilities))} |`);
    }
  }
  lines.push("");

  lines.push("## 本地显式缺口");
  lines.push("");
  if (localGap.length === 0) {
    lines.push("- 无。");
  } else {
    lines.push("| 指挥官 | CUnit | 缺本地 attack | 缺本地武器 | 运行时状态 | 本地技能 | 本地武器 |");
    lines.push("|---|---|---:|---:|---|---|---|");
    for (const row of localGap) {
      lines.push(`| ${md(row.commanderName)} | ${md(row.unitId)} | ${row.needsLocalAttack ? "是" : "否"} | ${row.needsLocalWeapon ? "是" : "否"} | ${md(row.status)} | ${md(list(row.localAbilities))} | ${md(list([...row.localWeapons, ...row.localEquipmentWeapons]))} |`);
    }
  }
  lines.push("");

  lines.push("## 全量明细");
  lines.push("");
  lines.push("| 指挥官 | 类型 | 来源单位 | 当前 CUnit | 状态 | 本地技能 | 本地武器 | 运行时技能 | 运行时武器 | 官方命令卡技能数 | 缺接线技能 |");
  lines.push("|---|---|---|---|---|---|---|---|---|---:|---|");
  for (const row of rows) {
    lines.push(`| ${md(row.commanderName)} | ${md(row.kind)} | ${md(row.sourceUnitId)} | ${md(row.unitId)} | ${md(row.status)} | ${md(list(row.localAbilities))} | ${md(list([...row.localWeapons, ...row.localEquipmentWeapons]))} | ${md(list(row.effectiveAbilities))} | ${md(list([...row.effectiveWeapons, ...row.effectiveEquipmentWeapons]))} | ${row.expectedCommands.length} | ${md(commandList(row.missingCommands))} |`);
  }
  return `${lines.join("\n")}\n`;
}

function renderTsv(rows) {
  const headers = [
    "指挥官",
    "类型",
    "来源单位",
    "当前CUnit",
    "状态",
    "缺运行时attack",
    "缺运行时武器",
    "缺命令卡接线",
    "本地技能",
    "本地武器",
    "运行时技能",
    "运行时武器",
    "官方命令卡技能",
  ];
  const lines = [headers.join("\t")];
  for (const row of rows) {
    lines.push([
      row.commanderName,
      row.kind,
      row.sourceUnitId,
      row.unitId,
      row.status,
      row.needsEffectiveAttack ? "是" : "否",
      row.needsEffectiveWeapon ? "是" : "否",
      commandList(row.missingCommands),
      list(row.localAbilities),
      list([...row.localWeapons, ...row.localEquipmentWeapons]),
      list(row.effectiveAbilities),
      list([...row.effectiveWeapons, ...row.effectiveEquipmentWeapons]),
      commandList(row.expectedCommands),
    ].map((value) => String(value ?? "").replaceAll("\t", " ").replaceAll(/\r?\n/g, " ")).join("\t"));
  }
  return `${lines.join("\n")}\n`;
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  const rows = makeRows();
  fs.mkdirSync(options.outputDir, { recursive: true });
  const jsonPath = path.join(options.outputDir, "xmfinal-unit-combat-links.json");
  const mdPath = path.join(options.outputDir, "xmfinal-unit-combat-links.md");
  const tsvPath = path.join(options.outputDir, "xmfinal-unit-combat-links.tsv");
  fs.writeFileSync(jsonPath, `${JSON.stringify({ generated_at: new Date().toISOString(), rows }, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdPath, renderMarkdown(rows), "utf8");
  fs.writeFileSync(tsvPath, renderTsv(rows), "utf8");

  const combatRisk = rows.filter((row) => row.status === "risk_effective_missing_combat_link");
  const commandRisk = rows.filter((row) => row.status === "risk_missing_command_card_ability");
  console.log(`XMFINAL_UNIT_COMBAT_ROWS=${rows.length}`);
  console.log(`XMFINAL_UNIT_COMBAT_RISK=${combatRisk.length}`);
  console.log(`XMFINAL_UNIT_COMMAND_CARD_RISK=${commandRisk.length}`);
  console.log(`XMFINAL_UNIT_COMBAT_LOCAL_EXPLICIT_GAPS=${rows.filter((row) => row.needsLocalAttack || row.needsLocalWeapon).length}`);
  console.log(`XMFINAL_UNIT_COMBAT_OUTPUT=${options.outputDir}`);
  if (combatRisk.length > 0) {
    console.log(`XMFINAL_UNIT_COMBAT_RISK_IDS=${combatRisk.map((row) => `${row.commander}:${row.unitId}`).join(",")}`);
  }
  if (commandRisk.length > 0) {
    console.log(`XMFINAL_UNIT_COMMAND_CARD_RISK_IDS=${commandRisk.map((row) => `${row.commander}:${row.unitId}`).join(",")}`);
  }
}

main();
