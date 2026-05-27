import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = path.resolve(process.argv[2] ?? ".");
const dataRoot = path.join(root, "游戏数据", "官方合作指挥官", "commanders");
const outRoot = path.join(root, "docs", "newdocs", "指挥官细化");
const today = "2026-05-27";

const commanders = [
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
];

const moduleRows = [
  ["01", "顶部技能栏", "CommanderPanelProfile"],
  ["02", "英雄单位及其技能", "CommanderHeroProfile"],
  ["03", "普通单位技能及其进化功能", "CommanderUnitAbilityProfile"],
  ["04", "初始化基地与特殊建筑", "CommanderBaseInitProfile"],
  ["05", "指挥官兵种", "CommanderRosterProfile"],
  ["06", "指挥官精通", "CommanderMasteryProfile"],
  ["07", "指挥官建筑", "CommanderBuildingProfile"],
  ["08", "科技建筑及其升级选项", "CommanderTechBuildingProfile"],
  ["09", "特定地图运输机空投单位", "CommanderCargoLoadoutProfile"],
  ["10", "指挥官特殊机制", "CommanderSpecialMechanicProfile"],
  ["11", "指挥官个性化机制", "CommanderPersonalMechanicProfile"],
];

const heroNotes = {
  Abathur: "heroes.json 当前没有条目；终极进化、莽兽、利维坦先按特殊机制和进化候选整理，是否提升为英雄由 HeroProfile 闭包确认。",
  Alarak: "官方玩法存在阿拉纳克本体，但当前 heroes.json 未列出，需要从 CASC/实机补 HeroProfile、复活和技能闭包。",
  Fenix: "官方玩法存在菲尼克斯多套战甲/人格载体，但当前 heroes.json 未列出，需要从 CASC/实机补 HeroModeProfile。",
  Nova: "官方玩法存在诺娃本体和装备形态切换，但当前 heroes.json 未列出，必须从 CASC/实机补 HeroProfile 与 HeroModeProfile。",
  Stetmann: "官方玩法存在盖瑞/超级盖瑞，但当前 heroes.json 未列出，需要从 CASC/实机补 HeroProfile 与特殊机制闭包。",
  Zeratul: "官方玩法存在泽拉图本体，但当前 heroes.json 未列出，需要从 CASC/实机补 HeroProfile、神器碎片和技能闭包。",
};

const specialFocus = {
  Abathur: "生物质、毒巢、终极进化、共生体。",
  Alarak: "献祭、死亡舰队、升格者能量体系和阿拉纳克英雄链。",
  Artanis: "守护之壳、能量场、亚顿之矛顶部技能。",
  Dehaka: "德哈卡精华、等级成长、原始族群召唤和原始单位进化。",
  Fenix: "菲尼克斯战甲切换、英雄人格载体和保存数据网。",
  Horner: "汉/霍纳双军工体系、雇佣军平台、舰队顶部技能。",
  Karax: "亚顿之矛能量、建筑自动维修、单位机械强化。",
  Kerrigan: "凯瑞甘英雄成长、同化光环、欧米伽坑道。",
  Mengsk: "帝国见证人、皇家卫队、劳工/部队切换、统治力资源。",
  Nova: "诺娃装备形态、狮鹫号、精英部队部署和战术空运。",
  Raynor: "轨道控制基地、矿骡、星轨、休伯利安和空投体系。",
  Stetmann: "斯台特区、盖瑞、卫星配置和单位机油/能量体系。",
  Stukov: "感染步兵潮、感染建筑、末日巨兽和亚历山大号。",
  Swann: "德拉肯激光钻机、建筑灭火、协同建造和机械工厂体系。",
  Tychus: "不法之徒招募、装备购买、酒吧/三类装备建筑和奥丁。",
  Vorazun: "暗影卫队、黑暗水晶塔、时间停止和隐形加成。",
  Zagara: "扎加拉英雄、虫群数量、免费爆虫和虫巢部队。",
  Zeratul: "神器碎片、泽拉图英雄、传奇军团和预言者构造体。",
};

const personalFocus = {
  Abathur: "生物质驱动单位成长，终极进化和毒巢需要 runtime hook 记录堆叠、拾取和单位替换。",
  Alarak: "阿拉纳克本体、献祭和升格者牺牲链要独立于地图初始化。",
  Artanis: "守护之壳与能量场属于全军被动和顶部技能联动，不应写死在单张地图。",
  Dehaka: "精华拾取、等级成长、技能点和原始单位进化必须由指挥官 profile 持有。",
  Fenix: "战甲切换、人格载体与保存数据网需要 HeroModeProfile + UnitReplacementProfile。",
  Horner: "汉的雇佣军与霍纳舰队是双 roster，生产/空投/顶部技能需要统一 profile。",
  Karax: "建筑自动维修、亚顿之矛能量与机械单位强化应由个人机制 profile 接入。",
  Kerrigan: "凯瑞甘英雄技能、同化资源和欧米伽坑道应由英雄与特殊机制模块共同接入。",
  Mengsk: "劳工/部队切换、皇家卫队经验、统治力资源需要独立状态机。",
  Nova: "诺娃形态切换会改变武器、技能、行为和装备，应由 CommanderHeroModeProfile + hook 接入。",
  Raynor: "星轨、矿骡、空投和休伯利安要从个人机制 profile 统一组装。",
  Stetmann: "斯台特区配置和盖瑞状态是全局网络机制，需要统一记录覆盖范围、模式和能量。",
  Stukov: "感染步兵潮、菌毯和限时单位生成需要 hook 追踪来源与生命周期。",
  Swann: "钻机、建筑灭火和协同建造是本指挥官的核心个人机制。",
  Tychus: "每个不法之徒等价英雄单位，装备购买和队伍上限必须模块化。",
  Vorazun: "隐形加成、黑暗水晶塔召回和时间停止应作为个人机制统一注入。",
  Zagara: "英雄、免费爆虫、虫群数量与单位上限调整要统一由 profile 控制。",
  Zeratul: "神器碎片会动态改写单位、建筑和技能，需要分阶段 profile 和日志。",
};

const specialTerms = {
  Abathur: ["biomass", "toxic", "brutalisk", "leviathan", "symbiote", "ultimate"],
  Alarak: ["alarak", "ascendant", "sacrifice", "deathfleet", "empower", "mothership"],
  Artanis: ["guardian", "shield", "power", "spear", "pylon"],
  Dehaka: ["dehaka", "essence", "primal", "pack", "mutation"],
  Fenix: ["fenix", "champion", "suit", "armor", "conservator", "network"],
  Horner: ["horner", "han", "mira", "strike", "fleet", "magmine", "platform"],
  Karax: ["karax", "repair", "chrono", "solar", "spear", "matrix"],
  Kerrigan: ["kerrigan", "assimilation", "omega", "malignant", "hero"],
  Mengsk: ["mengsk", "royal", "trooper", "laborer", "mandate", "witness", "imperial"],
  Nova: ["nova", "griffin", "stance", "kit", "cloak", "blackops", "holo", "decoy"],
  Raynor: ["raynor", "hyperion", "banshee", "mule", "drop", "orbital", "stim"],
  Stetmann: ["stetmann", "gary", "stetellite", "zone", "egonergy", "oil"],
  Stukov: ["stukov", "infested", "alexander", "apocalisk", "colonist", "bunker"],
  Swann: ["swann", "laser", "drill", "flaming", "fire", "hercules", "concentrated"],
  Tychus: ["tychus", "outlaw", "odin", "medivac", "hero", "squad", "lonewolf"],
  Vorazun: ["vorazun", "dark", "shadow", "time", "blackhole", "cloak"],
  Zagara: ["zagara", "baneling", "scourge", "frenzy", "swarm", "hunter"],
  Zeratul: ["zeratul", "artifact", "prophecy", "legendary", "avatar", "void"],
};

const genericFaces = new Set([
  "move",
  "stop",
  "attack",
  "attackredirect",
  "attackallowsinvulnerable",
  "attackchampions",
  "moveholdposition",
  "movepatrol",
  "cancel",
  "cancelbuilding",
  "cancelmorph",
  "cancelupgrade",
  "canceltrain",
  "halt",
  "holdfire",
  "weaponsfree",
  "selectbuilder",
  "rally",
  "rallyworkers",
  "smart",
]);

const techWords = ["research", "upgrade", "learn", "techlab", "armory", "engineering", "forge", "cybernetics", "evolution", "spire", "academy", "bay", "core"];
const modeWords = ["morph", "mode", "stance", "kit", "swap", "transform", "burrow", "uproot", "siege", "unsiege", "evolve", "lift", "land", "deploy"];
const cargoWords = ["load", "unload", "transport", "medivac", "drop", "airlift", "nydus", "canal", "worm", "bunker", "pickup"];
const panelWords = ["calldown", "call", "topbar", "global", "griffin", "hyperion", "banshee", "strike", "nuke", "mend", "toxic", "solar", "chrono", "overcharge", "beam", "time", "odin", "airstrike", "summon", "deploy", "fleet", "drill"];
const baseBuildingWords = ["commandcenter", "nexus", "hatchery", "lair", "hive", "orbital", "planetary", "townhall", "refinery", "extractor", "assimilator", "pylon", "depot", "drill", "platform", "bar", "compound", "bunker", "omega", "nydus"];

function readJson(fileName, fallback) {
  const file = path.join(fileName);
  if (!fs.existsSync(file)) return fallback;
  const raw = fs.readFileSync(file, "utf8").trim();
  if (!raw) return fallback;
  return JSON.parse(raw);
}

function asArray(value) {
  if (Array.isArray(value)) return value;
  if (value === null || value === undefined) return [];
  return [value];
}

function text(value) {
  if (value === null || value === undefined || value === "") return "-";
  return String(value);
}

function mdCell(value, limit = 140) {
  let s = text(value)
    .replace(/\r?\n/g, " / ")
    .replace(/\|/g, "\\|")
    .replace(/\s+/g, " ")
    .trim();
  if (s.length > limit) s = `${s.slice(0, limit - 3)}...`;
  return s || "-";
}

function mdCode(value, limit = 180) {
  const s = mdCell(value, limit);
  return s === "-" ? "-" : `\`${s.replace(/`/g, "\\`")}\``;
}

function listCode(values, limit = 8) {
  const arr = asArray(values).filter(Boolean).map(String);
  if (arr.length === 0) return "-";
  const shown = arr.slice(0, limit).map((x) => `\`${mdCell(x, 80).replace(/`/g, "\\`")}\``);
  if (arr.length > limit) shown.push(`另 ${arr.length - limit} 项`);
  return shown.join(", ");
}

function abilityCmd(cmd) {
  if (!cmd) return "-";
  if (typeof cmd === "string") return cmd;
  if (typeof cmd !== "object") return String(cmd);
  const abil = cmd.abil ?? cmd.Abil ?? "";
  const c = cmd.cmd ?? cmd.Cmd ?? "";
  if (!abil && !c) return "-";
  return `${abil}:${c}`;
}

function abilityCmds(cmds) {
  return asArray(cmds).map(abilityCmd).filter((x) => x !== "-");
}

function listPrestigeValues(values, limit = 8) {
  return listCode(asArray(values).map((value) => {
    if (value && typeof value === "object") return abilityCmd(value);
    return value;
  }), limit);
}

function table(headers, rows, emptyText = "暂无自动命中项。") {
  const lines = [];
  lines.push(`| ${headers.join(" | ")} |`);
  lines.push(`|${headers.map(() => "---").join("|")}|`);
  if (!rows || rows.length === 0) {
    lines.push(`| ${headers.map((_, idx) => (idx === headers.length - 1 ? mdCell(emptyText) : "-")).join(" | ")} |`);
  } else {
    for (const row of rows) {
      lines.push(`| ${row.map((x) => mdCell(x)).join(" | ")} |`);
    }
  }
  lines.push("");
  return lines;
}

function bulletList(items, emptyText = "暂无自动命中项。", limit = 20) {
  const lines = [];
  const arr = asArray(items).filter(Boolean);
  if (arr.length === 0) {
    lines.push(`- ${emptyText}`);
  } else {
    for (const item of arr.slice(0, limit)) lines.push(`- ${item}`);
    if (arr.length > limit) lines.push(`- 还有 ${arr.length - limit} 项，后续从源 JSON 继续展开。`);
  }
  lines.push("");
  return lines;
}

function writeMarkdown(filePath, lines) {
  const trimmed = [...lines];
  while (trimmed.length > 0 && trimmed[trimmed.length - 1] === "") trimmed.pop();
  fs.writeFileSync(filePath, `${trimmed.join("\n")}\n`, "utf8");
}

function unitInfo(entry) {
  const u = entry?.unit ?? {};
  const unitIds = asArray(entry?.resolved_unit_ids).length > 0 ? entry.resolved_unit_ids : [entry?.unit_id].filter(Boolean);
  const attrs = [
    asArray(u.planes).join("/"),
    asArray(u.attributes).join("/"),
    u.object_type,
    u.object_family,
  ].filter(Boolean).join("; ");
  const cost = [
    `矿:${text(u.minerals)}`,
    `气:${text(u.vespene)}`,
    `人口:${text(u.supply)}`,
    `生命:${text(u.life)}`,
    `护盾:${text(u.shields)}`,
    `能量:${text(u.energy)}`,
  ].join(" ");
  return {
    name: entry?.name || entry?.id || "-",
    id: entry?.id || "-",
    unitId: entry?.unit_id || u.id || "-",
    unitIds: unitIds.join(", "),
    attrs: attrs || "-",
    cost,
    tooltip: entry?.tooltip || "-",
  };
}

function unitRows(entries) {
  return asArray(entries).map((entry) => {
    const info = unitInfo(entry);
    return [info.name, `\`${info.id}\``, `\`${info.unitIds}\``, info.attrs, info.cost, info.tooltip];
  });
}

function idsFor(entries) {
  const out = new Set();
  for (const entry of asArray(entries)) {
    for (const value of [entry?.id, entry?.unit_id, ...(entry?.resolved_unit_ids ?? [])]) {
      if (value) out.add(String(value).toLowerCase());
    }
  }
  return out;
}

function flattenCards(commandCards) {
  const rows = [];
  for (const obj of asArray(commandCards)) {
    for (const card of asArray(obj.cards)) {
      for (const b of asArray(card.buttons)) {
        const button = b.button ?? {};
        const face = b.face ?? button.id ?? "";
        rows.push({
          objectId: obj.id ?? "",
          objectUnitId: obj.unit_id ?? "",
          objectName: obj.name ?? obj.id ?? "",
          objectType: obj.object_type ?? "",
          cardId: card.card_id ?? "",
          face,
          type: b.type ?? "",
          abilCmd: b.abil_cmd ?? "",
          requirements: b.requirements ?? "",
          row: b.row ?? "",
          column: b.column ?? "",
          buttonId: button.id ?? face,
          buttonName: button.name ?? button.id ?? face,
          tooltip: button.tooltip ?? "",
        });
      }
    }
  }
  return rows;
}

function hay(row) {
  return [
    row.objectId,
    row.objectUnitId,
    row.objectName,
    row.objectType,
    row.face,
    row.type,
    row.abilCmd,
    row.requirements,
    row.buttonId,
    row.buttonName,
    row.tooltip,
  ].join(" ").toLowerCase();
}

function hasAny(row, words) {
  const h = hay(row);
  return words.some((w) => h.includes(w.toLowerCase()));
}

function isGeneric(row) {
  const face = String(row.face || row.buttonId || "").toLowerCase();
  if (genericFaces.has(face)) return true;
  const ac = String(row.abilCmd || "").toLowerCase();
  return ac === "move,move" || ac === "stop,stop" || ac === "attack,execute";
}

function uniqueRows(rows) {
  const seen = new Set();
  const out = [];
  for (const row of rows) {
    const key = [row.objectId, row.face, row.abilCmd, row.requirements].join("|");
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(row);
  }
  return out;
}

function buttonRows(rows, limit = 30) {
  const selected = uniqueRows(rows).slice(0, limit);
  const out = selected.map((r) => [
    r.objectName || r.objectId,
    `\`${r.face || "-"}\``,
    r.buttonName || "-",
    r.abilCmd ? `\`${r.abilCmd}\`` : "-",
    r.requirements ? `\`${r.requirements}\`` : "-",
    r.tooltip || "-",
  ]);
  if (rows.length > limit) {
    out.push(["...", "...", "...", "...", "...", `还有 ${rows.length - limit} 项，后续从 command_cards.json 继续展开。`]);
  }
  return out;
}

function commandRowsFromProgression(perks, defaults = []) {
  const rows = [];
  for (const cmd of asArray(defaults)) {
    rows.push(["默认能力", "-", abilityCmd(cmd), "-", "来自 commander.json"]);
  }
  for (const perk of asArray(perks)) {
    for (const cmd of abilityCmds(perk.ability_commands)) {
      rows.push([`Lv${perk.level} ${perk.name || perk.id}`, perk.level, cmd, listCode(perk.upgrades, 4), perk.tooltip || "-"]);
    }
  }
  return rows;
}

function max30Value(mastery) {
  const incs = asArray(mastery.point_increments);
  if (incs.length === 0) return "-";
  const n = Number(incs[0]);
  if (!Number.isFinite(n)) return `30 x ${incs.join("/")}`;
  const value = Math.round(n * 30 * 10000) / 10000;
  const fmt = mastery.value_format || "~A~";
  return fmt.includes("~A~") ? fmt.replace("~A~", String(value)) : `${value} (${fmt})`;
}

function progressionPerks(progression) {
  return asArray(progression?.perks).sort((a, b) => Number(a.level ?? 0) - Number(b.level ?? 0));
}

function progressionMasteries(progression) {
  return asArray(progression?.masteries).sort((a, b) => Number(a.category ?? 0) - Number(b.category ?? 0) || String(a.id).localeCompare(String(b.id)));
}

function classifyRoster(roster, units, buildings, heroes) {
  const unitIds = idsFor(units);
  const buildingIds = idsFor(buildings);
  const heroIds = idsFor(heroes);
  const unknown = [];
  for (const entry of asArray(roster)) {
    const keys = [entry?.id, entry?.unit_id, ...(entry?.resolved_unit_ids ?? [])].filter(Boolean).map((x) => String(x).toLowerCase());
    if (keys.some((x) => unitIds.has(x) || buildingIds.has(x) || heroIds.has(x))) continue;
    unknown.push(entry);
  }
  return unknown;
}

function objectRowsForRoster(entries, limit = 25) {
  return asArray(entries).slice(0, limit).map((entry) => {
    const info = unitInfo(entry);
    return [info.name, `\`${info.id}\``, `\`${info.unitIds}\``, info.attrs, info.tooltip];
  });
}

function specialRows(perks, commander) {
  const terms = specialTerms[commander] ?? [];
  return asArray(perks)
    .filter((p) => {
      const h = [p.id, p.name, p.tooltip, ...(p.upgrades ?? []), ...abilityCmds(p.ability_commands)].join(" ").toLowerCase();
      return terms.some((t) => h.includes(t));
    })
    .map((p) => `${p.name || p.id} (${p.id})`);
}

function prestigeRows(prestiges) {
  return asArray(prestiges).map((p) => [
    `\`${p.id}\``,
    p.name || "-",
    `\`${p.primary_upgrade || "-"}\``,
    listPrestigeValues(p.disable_units),
    listPrestigeValues(p.enable_units),
    listPrestigeValues(p.disable_abils),
    listPrestigeValues(p.upgrade_supplement_ids),
  ]);
}

function upgradeRows(upgrades, limit = 30) {
  const rows = asArray(upgrades).slice(0, limit).map((u) => [
    `\`${u.id}\``,
    `\`${u.parent || "-"}\``,
    u.name || "-",
    String(u.effect_count ?? "-"),
    u.tooltip || "-",
  ]);
  if (upgrades.length > limit) rows.push(["...", "...", "...", "...", `还有 ${upgrades.length - limit} 项，详见 upgrades.json。`]);
  return rows;
}

function fileName(index, en, zh) {
  return `${String(index + 1).padStart(2, "0")}-${zh}-${en}.md`;
}

function writeCommanderDoc(index, en, zh, allSummaries) {
  const dir = path.join(dataRoot, en);
  const commander = readJson(path.join(dir, "commander.json"), {});
  const progression = readJson(path.join(dir, "progression.json"), {});
  const perks = progressionPerks(progression);
  const masteries = progressionMasteries(progression);
  const prestiges = readJson(path.join(dir, "prestiges.json"), []);
  const heroes = readJson(path.join(dir, "heroes.json"), []);
  const units = readJson(path.join(dir, "units.json"), []);
  const buildings = readJson(path.join(dir, "buildings.json"), []);
  const roster = readJson(path.join(dir, "roster.json"), []);
  const commandCards = readJson(path.join(dir, "command_cards.json"), []);
  const upgrades = readJson(path.join(dir, "upgrades.json"), []);
  const otherTechEntries = readJson(path.join(dir, "other-tech-entries.json"), []);
  const buttons = flattenCards(commandCards);
  const nonGenericButtons = buttons.filter((b) => !isGeneric(b));
  const heroIdSet = idsFor(heroes);
  const unitIdSet = idsFor(units);
  const buildingIdSet = idsFor(buildings);

  const heroButtons = nonGenericButtons.filter((b) => {
    const keys = [b.objectId, b.objectUnitId].filter(Boolean).map((x) => x.toLowerCase());
    return keys.some((x) => heroIdSet.has(x)) || String(b.objectType).toLowerCase() === "hero";
  });
  const unitButtons = nonGenericButtons.filter((b) => {
    const keys = [b.objectId, b.objectUnitId].filter(Boolean).map((x) => x.toLowerCase());
    return keys.some((x) => unitIdSet.has(x));
  });
  const buildingButtons = nonGenericButtons.filter((b) => {
    const keys = [b.objectId, b.objectUnitId].filter(Boolean).map((x) => x.toLowerCase());
    return keys.some((x) => buildingIdSet.has(x));
  });
  const modeButtons = nonGenericButtons.filter((b) => hasAny(b, modeWords));
  const techButtons = nonGenericButtons.filter((b) => hasAny(b, techWords));
  const cargoButtons = nonGenericButtons.filter((b) => hasAny(b, cargoWords));
  const panelButtons = nonGenericButtons.filter((b) => hasAny(b, panelWords));
  const specialButtons = nonGenericButtons.filter((b) => hasAny(b, specialTerms[en] ?? []));
  const baseBuildings = buildings.filter((b) => {
    const h = [b.id, b.unit_id, b.name, b.tooltip, ...(b.resolved_unit_ids ?? [])].join(" ").toLowerCase();
    return baseBuildingWords.some((w) => h.includes(w));
  });
  const unknownRoster = classifyRoster(roster, units, buildings, heroes);
  const defaultCommands = asArray(commander.default_ability_commands);
  const allAbilityRows = commandRowsFromProgression(perks, defaultCommands);

  const summary = {
    en,
    zh,
    file: fileName(index, en, zh),
    commanderId: commander.id ?? "-",
    heroes: heroes.length,
    units: units.length,
    buildings: buildings.length,
    roster: roster.length,
    commandCards: commandCards.length,
    upgrades: upgrades.length,
  };
  allSummaries.push(summary);

  const lines = [];
  lines.push(`# ${zh}（${en}）指挥官细化`);
  lines.push("");
  lines.push(`日期：${today}`);
  lines.push("");
  lines.push("## 当前口径");
  lines.push("");
  lines.push("当前指挥官默认 15 级，不从 1 级开始；精通默认 6 项全部 30 点；威望默认只取正面收益，不直接启用官方 `PlayerPrestige`。`initial` 只作为官方基础状态审计和差异对照，默认测试和玩法应看 `power_fusion` 最终状态。");
  lines.push("");
  lines.push(`本文件按 \`docs/newdocs/模块拆分\` 的 11 个模块整理 ${zh}。依据 \`游戏数据/官方合作指挥官/commanders/${en}/\` 的当前 JSON 生成；具体 Ability、Behavior、Weapon、Actor、Effect、Requirement 闭包仍需继续追 \`references/sc2-build-96883-casc-export/\` 或实机 \`[XM_DBG]\` 日志。`);
  lines.push("");

  lines.push("## 官方数据摘要");
  lines.push("");
  lines.push(...table(["项", "值"], [
    ["CommanderId", mdCode(commander.id)],
    ["中文名", commander.name || zh],
    ["默认升级", listCode(commander.default_upgrades)],
    ["默认能力命令", listCode(defaultCommands.map(abilityCmd), 12)],
    ["威望 ID", listCode(commander.prestige_ids, 6)],
    ["heroes.json 数量", String(heroes.length)],
    ["roster.json 数量", String(roster.length)],
    ["units.json 数量", String(units.length)],
    ["buildings.json 数量", String(buildings.length)],
    ["command_cards.json 对象数", String(commandCards.length)],
    ["upgrades.json 数量", String(upgrades.length)],
    ["other-tech-entries.json 数量", String(asArray(otherTechEntries).length)],
    ["source", mdCode(commander.source)],
  ]));

  lines.push("roster 样例：");
  lines.push("");
  lines.push("```text");
  lines.push(asArray(roster).slice(0, 24).map((x) => x.id ?? x.unit_id ?? x.name).filter(Boolean).join(", ") || "-");
  lines.push("```");
  lines.push("");

  lines.push("## 15 级解锁摘要");
  lines.push("");
  for (const perk of perks) {
    lines.push(`- ${perk.level}: ${perk.name || perk.id}`);
  }
  if (perks.length === 0) lines.push("- 暂无 progression.perks 数据。");
  lines.push("");

  lines.push("## 模块索引");
  lines.push("");
  lines.push(...table(["序号", "模块", "本文件章节"], moduleRows.map(([num, name]) => [num, name, `\`${num}. ${name}\``])));

  lines.push("## 01. 顶部技能栏");
  lines.push("");
  lines.push("Owner：`CommanderPanelProfile`、`CommanderPanelAbilityProfile`、`CommanderPanelCooldownProfile`、`CommanderPanelChargeProfile`、`CommanderPanelTargetingProfile`、`CommanderPanelModifierProfile`。");
  lines.push("");
  lines.push("### 面板/全局能力候选");
  lines.push("");
  lines.push(...table(["来源", "等级", "AbilityCmd", "关联升级", "说明"], allAbilityRows));
  lines.push("### command card 命中");
  lines.push("");
  lines.push(...table(["对象", "按钮/Face", "显示名", "AbilityCmd", "Requirement", "说明"], buttonRows(panelButtons, 25)));
  lines.push("实现备注：面板只注册 profile 和转发 caster，地图不得按 commander 写 if/else。精通和威望影响面板冷却、充能、费用时，由本模块接收最终 modifier。");
  lines.push("");

  lines.push("## 02. 英雄单位及其技能");
  lines.push("");
  lines.push("Owner：`CommanderHeroProfile`、`CommanderHeroModeProfile`、`CommanderHeroAbilityProfile`、`CommanderHeroSkillTreeProfile`、`CommanderHeroReviveProfile`、`CommanderHeroModifierProfile`。");
  lines.push("");
  lines.push("### 英雄单位清单");
  lines.push("");
  lines.push(...table(["名称", "Catalog ID", "解析 Unit", "属性", "费用/人口/生命", "备注"], unitRows(heroes), "官方 heroes.json 暂无条目；召唤物、形态、特殊英雄需从 progression、command_cards 或 CASC 继续追。"));
  lines.push("### 英雄技能按钮候选");
  lines.push("");
  lines.push(...table(["对象", "按钮/Face", "显示名", "AbilityCmd", "Requirement", "说明"], buttonRows(heroButtons, 45), "command_cards.json 未命中 heroes.json 对象按钮；英雄技能需从 CASC 或实机日志补。"));
  lines.push("### 英雄形态/模式候选");
  lines.push("");
  const heroModeButtons = heroButtons.length > 0 ? heroButtons.filter((b) => hasAny(b, modeWords)) : [];
  lines.push(...table(["对象", "按钮/Face", "显示名", "AbilityCmd", "Requirement", "说明"], buttonRows(heroModeButtons, 20), "未自动命中英雄形态或模式按钮。"));
  lines.push("### 英雄相关等级解锁");
  lines.push("");
  const heroTerms = ["hero", "英雄", "形态", "模式", "不法之徒", "战甲", "装备", "stance", "kit", "suit", "outlaw", "dehaka", "kerrigan", "zagara", "tychus", "nova", "fenix", "alarak", "zeratul", "gary"];
  const heroPerks = perks.filter((p) => {
    const h = [p.id, p.name, p.tooltip, ...(p.upgrades ?? []), ...abilityCmds(p.ability_commands)].join(" ").toLowerCase();
    return (heroes.length > 0 || heroNotes[en]) ? heroTerms.some((t) => h.includes(t.toLowerCase())) : false;
  });
  lines.push(...table(["等级", "名称", "升级", "AbilityCmd", "说明"], heroPerks.map((p) => [`Lv${p.level}`, p.name || p.id, listCode(p.upgrades, 6), listCode(abilityCmds(p.ability_commands), 6), p.tooltip || "-"]), "未自动命中英雄相关等级解锁；需要从 CASC 或实机日志补。"));
  lines.push(`口径：${heroNotes[en] ?? (heroes.length > 0 ? "heroes.json 已列出英雄条目，英雄单位、英雄技能和英雄形态都归本模块。" : "官方 heroes.json 暂无条目；若官方玩法存在隐藏英雄或召唤英雄，继续用 CASC/实机日志补。")}`);
  lines.push("");
  lines.push("待审计：Hero Unit、Ability、Behavior、Weapon、Actor、Sound、复活/重生、能量/资源、形态切换和威望改写闭包。");
  lines.push("");

  lines.push("## 03. 普通单位技能及其进化功能");
  lines.push("");
  lines.push("Owner：`CommanderUnitAbilityProfile`、`CommanderUnitStatProfile`、`CommanderUnitEvolutionProfile`、`CommanderUnitBehaviorProfile`、`CommanderUnitWeaponProfile`。");
  lines.push("");
  lines.push("### 单位技能按钮候选");
  lines.push("");
  lines.push(...table(["对象", "按钮/Face", "显示名", "AbilityCmd", "Requirement", "说明"], buttonRows(unitButtons, 45)));
  lines.push("### 进化/形态/切换候选");
  lines.push("");
  lines.push(...table(["对象", "按钮/Face", "显示名", "AbilityCmd", "Requirement", "说明"], buttonRows(modeButtons, 35)));
  lines.push("实现备注：单位自身声明技能、被动、武器、Behavior 和升级后替换关系；科技建筑只触发研究，不在科技建筑内部判断所有兵种 if/else。");
  lines.push("");

  lines.push("## 04. 初始化基地与特殊建筑");
  lines.push("");
  lines.push("Owner：`CommanderBaseInitProfile`、`CommanderOpeningLoadoutProfile`、`CommanderSpecialStructureProfile`、`CommanderInitHookProfile`。");
  lines.push("");
  lines.push("### 初始化建筑候选");
  lines.push("");
  lines.push(...table(["名称", "Catalog ID", "解析 Unit", "属性", "费用/人口/生命", "备注"], unitRows(baseBuildings.length > 0 ? baseBuildings : buildings.slice(0, 8)), "未自动命中基地或特殊建筑候选。"));
  lines.push("### 初始化/建造按钮候选");
  lines.push("");
  lines.push(...table(["对象", "按钮/Face", "显示名", "AbilityCmd", "Requirement", "说明"], buttonRows(buildingButtons.filter((b) => hasAny(b, ["build", "train", "upgrade", "morph", "land", "lift", "deploy"])), 30)));
  lines.push("实现备注：地图初始化只传 commander、出生点和场景语义；基地、工人、特殊建筑、初始科技和补给由本指挥官 initializer 自己组装。");
  lines.push("");

  lines.push("## 05. 指挥官兵种");
  lines.push("");
  lines.push("Owner：`CommanderRosterProfile`、`CommanderUnitFactoryProfile`、`CommanderUnitReplacementProfile`、`CommanderLevelStageRosterProfile`。");
  lines.push("");
  lines.push("### 当前 units.json 兵种清单");
  lines.push("");
  lines.push(...table(["名称", "Catalog ID", "解析 Unit", "属性", "费用/人口/生命", "备注"], unitRows(units), "当前 units.json 暂无普通兵种条目。"));
  lines.push("### roster 中未归入 units/buildings/heroes 的对象");
  lines.push("");
  lines.push(...table(["名称", "Catalog ID", "解析 Unit", "属性", "备注"], objectRowsForRoster(unknownRoster), "roster 中没有额外未分类对象。"));
  lines.push("口径：`units.json` 是当前提取出的兵种清单；`roster.json` 仍作为审计入口，用于发现满级后新增、替换、召唤或特殊形态对象。满级之后兵种会变化，测试台默认使用 `power_fusion` 而不是基础 `initial`。");
  lines.push("");

  lines.push("## 06. 指挥官精通");
  lines.push("");
  lines.push("Owner：`CommanderMasteryProfile`、`CommanderMasteryOptionProfile`、`CommanderMasteryModifierProfile`。");
  lines.push("");
  lines.push("### 六项精通 30 点口径");
  lines.push("");
  lines.push(...table(["组", "精通", "Upgrade", "每点增量", "30 点结果", "说明"], masteries.map((m) => [`${m.category}`, m.name || m.id, `\`${m.upgrade || "-"}\``, listCode(m.point_increments), max30Value(m), m.tooltip || "-"]), "当前 progression.masteries 暂无条目。"));
  lines.push("实现备注：当前默认六项精通全 30 点，不再做官方互斥取舍；若同一字段被多个精通/威望改写，必须进入 `CommanderModifierStackProfile` 明确叠加顺序。");
  lines.push("");

  lines.push("## 07. 指挥官建筑");
  lines.push("");
  lines.push("Owner：`CommanderBuildingProfile`、`CommanderBuildingAbilityProfile`、`CommanderBuildingReplacementProfile`。");
  lines.push("");
  lines.push("### 当前 buildings.json 建筑清单");
  lines.push("");
  lines.push(...table(["名称", "Catalog ID", "解析 Unit", "属性", "费用/人口/生命", "备注"], unitRows(buildings), "当前 buildings.json 暂无建筑条目。"));
  lines.push("### 建筑按钮候选");
  lines.push("");
  lines.push(...table(["对象", "按钮/Face", "显示名", "AbilityCmd", "Requirement", "说明"], buttonRows(buildingButtons, 40), "command_cards.json 未命中建筑按钮。"));
  lines.push("实现备注：建筑自己的技能、生产队列、变形、起飞/降落、特殊自动施法由建筑 profile 声明；地图和科技建筑不持有跨指挥官判断。");
  lines.push("");

  lines.push("## 08. 科技建筑及其升级选项");
  lines.push("");
  lines.push("Owner：`CommanderTechBuildingProfile`、`CommanderTechOptionProfile`、`CommanderUpgradeEffectProfile`。");
  lines.push("");
  lines.push("### 15 级解锁与研究命令");
  lines.push("");
  lines.push(...table(["等级", "名称", "解锁升级", "解锁 AbilityCmd", "说明"], perks.map((p) => [p.level, p.name || p.id, listCode(p.upgrades, 8), listCode(abilityCmds(p.ability_commands), 8), p.tooltip || "-"])));
  lines.push("### Upgrade 摘要");
  lines.push("");
  lines.push(...table(["Upgrade", "父级", "显示名", "Effect数", "说明"], upgradeRows(upgrades, 35), "当前 upgrades.json 暂无条目。"));
  lines.push("### 研究/升级按钮候选");
  lines.push("");
  lines.push(...table(["对象", "按钮/Face", "显示名", "AbilityCmd", "Requirement", "说明"], buttonRows(techButtons, 45)));
  lines.push("实现备注：科技建筑只负责展示/触发研究；每个单位升级效果由对应 `CommanderUnitTechProfile` 或 `CommanderUpgradeEffectProfile` 声明。");
  lines.push("");

  lines.push("## 09. 特定地图运输机空投单位");
  lines.push("");
  lines.push("Owner：`CommanderCargoLoadoutProfile`、`CommanderMapDropProfile`、`CommanderScenarioFallbackProfile`。");
  lines.push("");
  lines.push("### 运输/空投能力候选");
  lines.push("");
  lines.push(...table(["对象", "按钮/Face", "显示名", "AbilityCmd", "Requirement", "说明"], buttonRows(cargoButtons, 30), "未自动命中运输或空投按钮。"));
  lines.push("### 可投放单位候选");
  lines.push("");
  lines.push(...table(["名称", "Catalog ID", "解析 Unit", "属性", "费用/人口/生命", "备注"], unitRows(units), "当前 units.json 暂无可投放单位候选。"));
  lines.push("实现备注：运输机空投不要读取地图硬编码单位组，应从 `CommanderCargoLoadoutProfile` 读取当前 commander 的 `power_fusion` 单位清单和场景过滤规则；英雄是否允许投放需要显式声明。");
  lines.push("");

  lines.push("## 10. 指挥官特殊机制");
  lines.push("");
  lines.push("Owner：`CommanderSpecialMechanicProfile`、`CommanderSpecialResourceProfile`、`CommanderSpecialMechanicHookProfile`、`CommanderSpecialMechanicUnitProfile`。");
  lines.push("");
  lines.push(`本指挥官重点：${specialFocus[en] ?? "特殊机制待从 progression、CASC 和实机日志继续确认。"}`);
  lines.push("");
  lines.push("### 特殊机制命中项");
  lines.push("");
  lines.push(...bulletList(specialRows(perks, en)));
  lines.push("### 特殊机制 Upgrade 候选");
  lines.push("");
  const terms = specialTerms[en] ?? [];
  const specialUpgrades = upgrades.filter((u) => terms.some((t) => [u.id, u.name, u.tooltip].join(" ").toLowerCase().includes(t)));
  lines.push(...bulletList(specialUpgrades.map((u) => `${u.name || u.id} (\`${u.id}\`)`)));
  lines.push("### 特殊机制按钮候选");
  lines.push("");
  lines.push(...table(["对象", "按钮/Face", "显示名", "AbilityCmd", "Requirement", "说明"], buttonRows(specialButtons, 45)));
  lines.push("实现备注：凡是涉及局内状态、资源、堆叠、全局计时器、隐藏 caster、英雄成长或召唤首领的机制，都必须有 runtime hook 和 `[XM_DBG]` 日志。");
  lines.push("");

  lines.push("## 11. 指挥官个性化机制");
  lines.push("");
  lines.push("Owner：`CommanderPersonalMechanicProfile`、`CommanderPersonalMechanicEffectProfile`、`CommanderPersonalMechanicHookProfile`、`CommanderPersonalMechanicRequirementProfile`。");
  lines.push("");
  lines.push(`本指挥官重点：${personalFocus[en] ?? "个性化机制待继续审计。"}`);
  lines.push("");
  lines.push("### 威望正向融合输入");
  lines.push("");
  lines.push(...table(["威望 ID", "名称", "Primary Upgrade", "禁用单位", "启用单位", "禁用 Ability", "补充 Upgrade"], prestigeRows(prestiges), "当前 prestiges.json 暂无条目。"));
  lines.push("融合规则：只取正面收益，跳过负面代价、禁用项、费用/冷却/上限惩罚；不能直接启用官方 `PlayerPrestige`。禁用项在本表中保留是为了审计，不代表最终要执行。");
  lines.push("");

  lines.push("## 强度融合规则");
  lines.push("");
  lines.push("1. `XM_ApplyCommanderFullLevel`：应用 15 级全部解锁，补齐升级、能力命令、研究按钮和 roster 变化。");
  lines.push("2. `XM_ApplyCommanderAllMasteries`：6 项精通全部按 30 点应用。");
  lines.push("3. `XM_ApplyCommanderPrestigeEffects`：只取威望正面收益，跳过负面代价、禁用项、费用/冷却/上限惩罚。");
  lines.push("4. `XM_RunCommanderPowerFusionHook`：只处理无法静态声明的行为，例如特殊资源、英雄形态、顶部技能联动。");
  lines.push("5. `XM_VerifyCommanderPowerFusion`：输出 `[XM_DBG]` 验证日志。");
  lines.push("");

  lines.push("## 测试台优先场景");
  lines.push("");
  lines.push("```text");
  lines.push("standard_base");
  lines.push("full_buildings");
  lines.push("level15_units");
  lines.push("fusion_final_units");
  lines.push("panel_smoke");
  lines.push("hero_smoke");
  lines.push("hero_ability_smoke");
  lines.push("hero_mode_smoke");
  lines.push("unit_ability_smoke");
  lines.push("tech_smoke");
  lines.push("cargo_smoke");
  lines.push("special_mechanic_smoke");
  lines.push("personal_mechanic_smoke");
  lines.push("```");
  lines.push("");
  lines.push("补充：需要排查官方基础差异时才跑 `initial_units`，不要把它当作默认玩法状态。英雄指挥官还要单独验证 `hero_smoke`、`hero_ability_smoke`、`hero_mode_smoke`。");
  lines.push("");

  lines.push("## `[XM_DBG]` 日志建议");
  lines.push("");
  lines.push("```text");
  lines.push(`[XM_DBG][INFO][COMMANDER_PROFILE_LOAD] commander=${en} levelMode=FullLevel15 masteryMode=AllSixMax rosterStage=power_fusion result=ok`);
  lines.push(`[XM_DBG][INFO][POWER_FUSION_APPLY] commander=${en} levelMode=FullLevel15 masteryMode=AllSixMax prestigeMode=SelectedPositive result=ok`);
  lines.push(`[XM_DBG][INFO][ROSTER_LOAD] commander=${en} stage=power_fusion units=${units.length} buildings=${buildings.length} heroes=${heroes.length} result=ok`);
  lines.push(`[XM_DBG][INFO][HERO_PROFILE_LOAD] commander=${en} heroes=${heroes.length} result=ok`);
  lines.push(`[XM_DBG][INFO][MODULE_VERIFY] commander=${en} module=<01-11> profile=<profile> result=ok`);
  lines.push(`[XM_DBG][WARN][CASC_AUDIT_REQUIRED] commander=${en} module=<module> object=<object> result=needs-casc-audit`);
  lines.push("```");
  lines.push("");

  lines.push("## 第一轮待审计项");
  lines.push("");
  lines.push("- 顶部技能的 caster、按钮、冷却、充能、目标转发闭包。");
  lines.push("- 英雄或特殊英雄的 Unit、Ability、Behavior、Weapon、Actor、Sound、复活/重生闭包。");
  lines.push("- `power_fusion` 最终 roster 与 `level15` roster 的新增、替换、变体关系。");
  lines.push("- 6 项精通的真实作用对象和最终数值。");
  lines.push("- 3 个威望的正面收益、负面代价、disable/suppress、费用/冷却/上限变化。");
  lines.push("- 科技建筑研究按钮、Requirement、Upgrade effect 是否完整。");
  lines.push("- 特殊机制、英雄成长和个性化机制是否需要 runtime hook。");
  lines.push("");

  writeMarkdown(path.join(outRoot, summary.file), lines);
}

function writeReadme(summaries) {
  const heroCoverage = summaries.filter((s) => s.heroes > 0).map((s) => `${s.zh}/${s.en}=${s.heroes}`).join("，") || "当前无 heroes.json 条目";
  const zeroHero = summaries.filter((s) => s.heroes === 0).map((s) => `${s.zh}/${s.en}`).join("，");
  const lines = [];
  lines.push("# 指挥官细化文档入口");
  lines.push("");
  lines.push(`日期：${today}`);
  lines.push("");
  lines.push("本目录按 18 个官方合作指挥官拆分。每个文档都以当前新版架构为前提，并按 `../模块拆分/` 的 11 个模块分别整理本指挥官自己的清单和待审计项。");
  lines.push("");
  lines.push("本轮已按 `游戏数据/官方合作指挥官/commanders/<Commander>/` 的最新 JSON 重新生成，重点刷新 `heroes.json`、`units.json`、`buildings.json`、`command_cards.json` 的数量、清单和候选按钮。");
  lines.push("");
  lines.push("统一口径：");
  lines.push("");
  lines.push("1. 当前指挥官默认 15 级，不从 1 级开始。");
  lines.push("2. 精通默认 6 项全部 30 点。");
  lines.push("3. 威望默认只取正面收益，不直接启用官方 `PlayerPrestige`。");
  lines.push("4. `full_units` 默认指向强度融合最终 roster，即 `power_fusion`。");
  lines.push("5. `initial` 只用于官方基础状态审计和差异对照。");
  lines.push("6. 具体实现前仍需追 CASC 闭包并补 `[XM_DBG]` 验证日志。");
  lines.push("7. `heroes.json` 只按当前 JSON 事实写入英雄模块；`heroes.json=0` 不代表官方玩法一定没有英雄，只代表本轮提取数据未直接列出，需要 CASC/实机补闭包。");
  lines.push("");
  lines.push("## 当前数据覆盖");
  lines.push("");
  lines.push(`- heroes.json 已有条目：${heroCoverage}。`);
  lines.push(`- heroes.json 暂无条目：${zeroHero}。`);
  lines.push("- units/buildings 已按最新 JSON 重算；例如阿巴瑟当前是 `heroes=0 / units=12 / buildings=2`，不再沿用上一轮把利维坦写入 heroes.json 的旧判断。");
  lines.push("");
  lines.push(...table(["序号", "文档", "指挥官", "heroes", "units", "buildings", "roster", "command cards", "upgrades"], summaries.map((s, idx) => [
    String(idx + 1),
    `\`${s.file}\``,
    `${s.zh}/${s.en}`,
    String(s.heroes),
    String(s.units),
    String(s.buildings),
    String(s.roster),
    String(s.commandCards),
    String(s.upgrades),
  ])));
  lines.push("## 使用方式");
  lines.push("");
  lines.push("先看单指挥官文档的 `01. 顶部技能栏` 到 `11. 指挥官个性化机制`，再回到 `../模块拆分/` 中对应模块补实现。每个指挥官文档是工作清单，不是最终闭包证明；标记为“候选”或“待审计”的内容必须继续追 `references/sc2-build-96883-casc-export/`、Requirement 闭包或实机日志。");
  lines.push("");
  lines.push("注意：`command_cards.json` 中部分共享单位会带出其它指挥官的按钮或锁定提示，例如同一个 SCV、兵营、导弹塔对象上可能出现诺娃、斯旺、雷诺等不同 commander 的 Requirement。单指挥官文档中的按钮表只作为候选输入，真正实现时必须按当前 commander、15 级、六精通全满和威望正向融合后的 Requirement 过滤。");
  lines.push("");
  lines.push("英雄模块同样是候选输入：如果 `heroes.json` 已有条目，则优先把对应 command card 技能归入 `02. 英雄单位及其技能`；如果 `heroes.json` 暂无条目但官方玩法存在英雄，例如诺娃、泽拉图、超级盖瑞、阿拉纳克、菲尼克斯，文档会继续标记为 CASC/实机待补。");
  lines.push("");
  writeMarkdown(path.join(outRoot, "README.md"), lines);
}

function main() {
  if (!fs.existsSync(dataRoot)) {
    throw new Error(`Data root not found: ${dataRoot}`);
  }
  fs.mkdirSync(outRoot, { recursive: true });
  const summaries = [];
  commanders.forEach(([en, zh], idx) => writeCommanderDoc(idx, en, zh, summaries));
  writeReadme(summaries);
  console.log(`Generated ${summaries.length} commander detail docs in ${outRoot}`);
}

main();
