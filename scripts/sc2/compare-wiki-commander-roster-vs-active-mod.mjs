import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "../..");
const today = new Date().toISOString().slice(0, 10);

const commanderMeta = [
  { commander: "Abathur", zh: "阿巴瑟", wikiFile: "01-abathur.wiki" },
  { commander: "Alarak", zh: "阿拉纳克", wikiFile: "02-alarak.wiki" },
  { commander: "Artanis", zh: "阿塔尼斯", wikiFile: "03-artanis.wiki" },
  { commander: "Dehaka", zh: "德哈卡", wikiFile: "04-dehaka.wiki" },
  { commander: "Fenix", zh: "菲尼克斯", wikiFile: "05-fenix.wiki" },
  { commander: "Horner", zh: "霍纳与汉", wikiFile: "06-horner-han.wiki" },
  { commander: "Karax", zh: "凯拉克斯", wikiFile: "07-karax.wiki" },
  { commander: "Kerrigan", zh: "凯瑞甘", wikiFile: "08-kerrigan.wiki" },
  { commander: "Raynor", zh: "雷诺", wikiFile: "09-raynor.wiki" },
  { commander: "Mengsk", zh: "蒙斯克", wikiFile: "10-mengsk.wiki" },
  { commander: "Nova", zh: "诺娃", wikiFile: "11-nova.wiki" },
  { commander: "Stetmann", zh: "斯台特曼", wikiFile: "12-stetmann.wiki" },
  { commander: "Stukov", zh: "斯托科夫", wikiFile: "13-stukov.wiki" },
  { commander: "Swann", zh: "斯旺", wikiFile: "14-swann.wiki" },
  { commander: "Tychus", zh: "泰凯斯", wikiFile: "15-tychus.wiki" },
  { commander: "Vorazun", zh: "沃拉尊", wikiFile: "16-vorazun.wiki" },
  { commander: "Zeratul", zh: "泽拉图", wikiFile: "17-zeratul.wiki" },
  { commander: "Zagara", zh: "扎加拉", wikiFile: "18-zagara.wiki" },
];

const commanderModuleOverrides = new Map([
  ["Horner", "XMMira.SC2Mod"],
]);

const runtimeNameOverrides = new Map([
  ["Horner", "Mira"],
]);

const wikiAliases = new Map([
  ["Alarak|杀戮者", ["追猎者", "Stalker"]],
  ["Alarak|先锋", ["无情先锋", "ImmortalTaldarim"]],
  ["Artanis|掠夺者", ["Reaver"]],
  ["Artanis|风暴战舰", ["Tempest"]],
  ["Dehaka|原始守护者", ["DehakaGuardian"]],
  ["Fenix|军团士兵", ["ZealotPurifier"]],
  ["Fenix|干扰者", ["Disruptor"]],
  ["Horner|导弹塔", ["MissileTurretMira"]],
  ["Karax|警戒者", ["哨兵", "ZealotPurifier"]],
  ["Karax|激励者", ["机械哨兵", "SentryAiur"]],
  ["Karax|幻影战机", ["Scout"]],
  ["Karax|凯达琳巨石", ["KhaydarinMonolith"]],
  ["Nova|磁轨炮塔", ["自动机炮", "NovaACLaserTurret"]],
  ["Raynor|轨道控制基地", ["轨道指挥部", "OrbitalCommand"]],
  ["Stukov|虫巢女王", ["虫后", "SwarmQueen", "SIQueen"]],
  ["Swann|爆弹比利", ["毁灭炮塔", "KelMorianGrenadeTurret"]],
  ["Swann|歌利亚武装机器人", ["歌利亚", "Goliath"]],
  ["Swann|热辣贝蒂", ["末日炮塔", "PerditionTurret"]],
  ["Swann|转转小子", ["导弹塔", "MissileTurret"]],
  ["Zeratul|虚空圣堂武士", ["狂热者", "ZeratulSummonZealot"]],
  ["Zeratul|超维空间炮", ["光子炮台", "ZeratulPhotonCannon"]],
  ["Zagara|胆汁喷射体", ["胆汁喷射器", "BileLauncher"]],
]);

const wikiIdFallbacks = new Map([
  ["*|眼虫", { kind: "单位", ids: ["Overseer"], note: "wiki主要部队补充：官方JSON未列出眼虫，按通用眼虫ID检查当前Mod。" }],
  ["*|虫道网络", { kind: "建筑", ids: ["NydusNetwork"], note: "wiki主要部队补充：官方JSON未列出该建筑时按虫道网络ID检查。" }],
  ["*|潜伏者", { kind: "单位", ids: ["LurkerMP", "Lurker"], note: "wiki主要部队补充：按潜伏者常用ID检查当前Mod。" }],
  ["*|黑暗执政官", { kind: "单位", ids: ["DarkArchon"], note: "wiki主要部队补充：按黑暗执政官ID检查当前Mod。" }],
  ["*|黑暗水晶塔", { kind: "建筑", ids: ["DarkPylon"], note: "wiki主要部队补充：按黑暗水晶塔ID检查当前Mod。" }],
  ["*|自动机炮", { kind: "建筑", ids: ["AutoTurret", "NovaACLaserTurret", "AutoTurretMira"], note: "wiki主要部队补充：自动机炮在不同指挥官下有不同ID。" }],
  ["*|磁轨炮塔", { kind: "建筑", ids: ["NovaACLaserTurret", "AutoTurret_BlackOps", "AutoTurret"], note: "wiki主要部队补充：诺娃磁轨炮塔按当前Mod炮塔ID检查。" }],
  ["*|导弹塔", { kind: "建筑", ids: ["MissileTurret"], note: "wiki主要部队补充：按通用导弹塔ID检查当前Mod。" }],
  ["*|风暴战舰", { kind: "单位", ids: ["Tempest"], note: "wiki主要部队补充：按风暴战舰ID检查当前Mod。" }],
  ["*|掠夺者", { kind: "单位", ids: ["Reaver"], note: "wiki主要部队补充：此处为星灵掠夺者/Reaver，不是人族劫掠者。" }],
  ["*|干扰者", { kind: "单位", ids: ["Disruptor"], note: "wiki主要部队补充：按干扰者ID检查当前Mod。" }],
  ["*|幻影战机", { kind: "单位", ids: ["Scout"], note: "wiki主要部队补充：按侦察机/Scout ID检查当前Mod。" }],
  ["*|凯达琳巨石", { kind: "建筑", ids: ["KhaydarinMonolith", "Monolith"], note: "wiki主要部队补充：按凯达琳巨石ID检查当前Mod。" }],
  ["*|雷神", { kind: "单位", ids: ["ThorSwann", "Thor"], note: "wiki主要部队补充：斯旺雷神优先检查ThorSwann，再检查通用Thor。" }],
  ["*|爆弹比利", { kind: "建筑", ids: ["BlasterBilly"], note: "wiki主要部队补充：斯旺防御塔别名，当前Mod可能只有胶水屏/按钮ID。" }],
  ["*|热辣贝蒂", { kind: "建筑", ids: ["FlamingBetty"], note: "wiki主要部队补充：斯旺防御塔别名，当前Mod可能只有胶水屏/按钮ID。" }],
  ["*|转转小子", { kind: "建筑", ids: ["SpinningDizzy"], note: "wiki主要部队补充：斯旺防御塔别名，当前Mod可能只有胶水屏/按钮ID。" }],
  ["*|胆汁喷射体", { kind: "建筑", ids: ["BileLauncherZagara", "BileLauncher"], note: "wiki主要部队补充：按扎加拉胆汁喷射体ID检查当前Mod。" }],
  ["Dehaka|原始守护者", { kind: "单位", ids: ["DehakaGuardian"], note: "wiki主要部队补充：官方JSON未列出原始守护者，按DehakaGuardian检查。" }],
  ["Horner|突击炮舰", { kind: "建筑", ids: ["MercenarySpaceStationMira", "MercStarportMira", "StarportMira"], note: "wiki主要部队补充：当前Mod为米拉/霍纳旧线命名，按佣兵平台/星港相关ID检查。" }],
  ["Horner|导弹塔", { kind: "建筑", ids: ["MissileTurretMira", "MissileTurret"], note: "wiki主要部队补充：霍纳与汉当前Mod旧线使用Mira后缀。" }],
  ["Kerrigan|虫道网络欧米茄", { kind: "建筑", ids: ["GreaterNydusWorm", "GreaterNydusWormAlly"], note: "wiki主要部队补充：欧米茄坑道虫是凯瑞甘等级解锁；当前原始mod未直接定义该CUnit时不应把它等同为普通虫道网络。" }],
  ["Stukov|被感染的响尾蛇战车", { kind: "单位", ids: ["StukovInfestedDiamondback"], note: "wiki主要部队补充：官方JSON未列，按感染响尾蛇/钻石背ID检查。" }],
  ["Stukov|被感染的解放者", { kind: "单位", ids: ["SILiberator"], note: "wiki主要部队补充：官方JSON漏收，按SILiberator检查。" }],
  ["Stukov|被感染的女妖", { kind: "单位", ids: ["StukovInfestedBanshee"], note: "wiki主要部队补充：官方JSON漏收，按感染女妖ID检查。" }],
  ["Stukov|眼虫", { kind: "单位", ids: ["OverseerStukov", "Overseer"], note: "wiki主要部队补充：斯托科夫眼虫优先检查OverseerStukov。" }],
  ["Stukov|被感染的地堡", { kind: "建筑", ids: ["SIInfestedBunker", "SIInfestedBunkerUpg"], note: "wiki主要部队补充：按感染地堡ID检查。" }],
  ["Stukov|被感染的导弹塔", { kind: "建筑", ids: ["SIMissileTurret"], note: "wiki主要部队补充：按感染导弹塔ID检查。" }],
  ["Tychus|自动机炮", { kind: "建筑", ids: ["TychusWarhoundAutoTurret"], note: "wiki主要部队补充：泰凯斯自动机炮使用战狼炮塔ID，不使用诺娃/通用自动炮塔ID。" }],
  ["Zeratul|虚空圣堂武士", { kind: "单位", ids: ["ZeratulSummonZealot", "ZealotZeratul"], note: "wiki主要部队补充：官方JSON将该项导成狂热者，按泽拉图虚空圣堂/召唤狂热者ID检查。" }],
  ["Zeratul|超维空间炮", { kind: "建筑", ids: ["ZeratulPhotonCannon", "PhotonCannon"], note: "wiki主要部队补充：按泽拉图/通用光子炮台ID检查当前Mod。" }],
  ["Zagara|眼虫", { kind: "单位", ids: ["Overseer", "OverseerZagara"], note: "wiki主要部队补充：扎加拉眼虫按通用/扎加拉特化ID检查。" }],
]);

const activeIdAliases = new Map([
  ["SwarmQueen", ["Queen", "QueenCoop"]],
  ["DevourerMP", ["Devourer"]],
  ["Banshee_BlackOps", ["BansheeNova"]],
  ["Goliath_BlackOps", ["GoliathNova"]],
  ["HellbatBlackOps", ["HellbatNova"]],
  ["Liberator_BlackOps", ["LiberatorNova"]],
  ["Marauder_BlackOps", ["MarauderNova"]],
  ["Marine_BlackOps", ["MarineNova"]],
  ["Raven_BlackOps", ["RavenNova"]],
  ["SiegeTank_BlackOps", ["SiegeTankNova", "SiegeTankSiegedNova"]],
  ["HHBattlecruiser", ["BattlecruiserMira"]],
  ["HHHellion", ["HellionMira"]],
  ["HHHellionTank", ["HellionTankMira"]],
  ["HHRaven", ["RavenMira", "RavenMiraSiege"]],
  ["HHReaper", ["ReaperMira", "ReaperMiraFlying"]],
  ["HHVikingFighter", ["VikingFighterMira", "VikingAssaultMira"]],
  ["HHWidowMine", ["WidowMineMira", "WidowMineMiraBurrowed"]],
  ["HHWraith", ["WraithMira"]],
  ["Liberator", ["LiberatorMira", "LiberatorMiraAG"]],
  ["Predator", ["CycloneMira", "WidowMineMira", "WidowMineMiraBurrowed"]],
]);

const nonFinalUnitPattern = /(Cocoon|Egg|SpawnerUnit|Dummy|Missile|Weapon|Placeholder)$/i;

function parseArgs(argv) {
  const options = {
    officialRoot: path.join(repoRoot, "游戏数据", "官方合作指挥官", "commanders"),
    modRoot: path.join(repoRoot, "合作指挥官版起义狂潮"),
    wikiRoot: path.resolve(repoRoot, "../../..", "artifacts", "2026-05-29-starcraft-coop-commanders"),
    outputDir: path.join(repoRoot, "docs", "每日进度", `${today}-合作指挥官建筑单位逐个对比`),
    commanders: null,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const next = () => {
      index += 1;
      if (index >= argv.length) throw new Error(`Missing value for ${arg}`);
      return argv[index];
    };

    if (arg === "--official-root") {
      options.officialRoot = path.resolve(next());
    } else if (arg === "--mod-root") {
      options.modRoot = path.resolve(next());
    } else if (arg === "--wiki-root") {
      options.wikiRoot = path.resolve(next());
    } else if (arg === "--output-dir") {
      options.outputDir = path.resolve(next());
    } else if (arg === "--commanders") {
      options.commanders = next().split(",").map((value) => value.trim()).filter(Boolean);
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
  console.log(`用法：
  node scripts/sc2/compare-wiki-commander-roster-vs-active-mod.mjs [options]

作用：
  逐个指挥官对比 wiki 主要部队、官方合作 JSON、当前 active Mod 的建筑/单位 Catalog。

参数：
  --official-root <path>  官方合作指挥官 JSON 根目录
  --mod-root <path>       当前 active Mod 根目录，默认合作指挥官版起义狂潮
  --wiki-root <path>      wiki 抓取输出目录
  --output-dir <path>     报告输出目录
  --commanders <A,B,C>    只导出指定指挥官
`);
}

function assertDirectory(dir, label) {
  if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) {
    throw new Error(`${label} directory not found: ${dir}`);
  }
}

function readText(file) {
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
}

function readJson(file) {
  const raw = readText(file);
  return raw.trim() ? JSON.parse(raw) : null;
}

function asArray(value) {
  if (value == null) return [];
  return Array.isArray(value) ? value : [value];
}

function unique(values) {
  return [...new Set(values.filter(Boolean).map((value) => String(value).trim()).filter(Boolean))];
}

function normalizeName(value) {
  return String(value ?? "")
    .replace(/\{\{[^}]+\}\}/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/[“”"'‘’`·,，。:：;；!！?？、\s\-_—~～]/g, "")
    .replace(/[()（）\[\]【】]/g, "")
    .replace(/Ⅱ/g, "II")
    .toLowerCase();
}

function cleanWikiItem(value) {
  return String(value ?? "")
    .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, "$2")
    .replace(/\[\[([^\]]+)\]\]/g, "$1")
    .replace(/\{\{item\|([^}|]+)[^}]*\}\}/g, "$1")
    .replace(/\{\{[^}]+\}\}/g, "")
    .trim();
}

function commanderModuleName(commander) {
  return commanderModuleOverrides.get(commander) ?? `XM${commander}.SC2Mod`;
}

function runtimeCommanderName(commander) {
  return runtimeNameOverrides.get(commander) ?? commander;
}

function loadWikiItems(wikiRoot, meta) {
  const file = path.join(wikiRoot, "wikitext", meta.wikiFile);
  const text = readText(file);
  const match = /==主要部队==[\s\S]*?\{\{单位列表\|([^}]*)\}\}/.exec(text);
  const items = match
    ? match[1].split("/").map(cleanWikiItem).filter(Boolean)
    : [];
  return { file, items };
}

function loadOfficialCommander(officialRoot, commander) {
  const dir = path.join(officialRoot, commander);
  const units = asArray(readJson(path.join(dir, "units.json"))).map((entry) => enrichOfficialEntry(entry, "单位"));
  const buildings = asArray(readJson(path.join(dir, "buildings.json"))).map((entry) => enrichOfficialEntry(entry, "建筑"));
  const heroes = asArray(readJson(path.join(dir, "heroes.json"))).map((entry) => enrichOfficialEntry(entry, "英雄"));
  return {
    dir,
    units: units.filter(shouldKeepOfficialEntry),
    buildings: buildings.filter(shouldKeepOfficialEntry),
    heroes: heroes.filter(shouldKeepOfficialEntry),
  };
}

function enrichOfficialEntry(entry, kind) {
  const primaryIds = unique([entry.unit_id, entry.id]);
  const aliasIds = primaryIds.flatMap((id) => activeIdAliases.get(id) ?? []);
  return {
    ...entry,
    kind,
    displayName: firstText(entry.name, entry.id, entry.unit_id),
    candidateIds: unique([...primaryIds, ...aliasIds]),
  };
}

function shouldKeepOfficialEntry(entry) {
  const unitId = String(entry.unit_id || entry.id || "");
  if (nonFinalUnitPattern.test(unitId)) return false;
  return true;
}

function firstText(...values) {
  for (const value of values) {
    if (value != null && String(value).trim()) return String(value).trim();
  }
  return "";
}

function listFiles(root) {
  const result = [];
  if (!fs.existsSync(root)) return result;
  const stack = [root];
  while (stack.length > 0) {
    const current = stack.pop();
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(full);
      } else if (entry.isFile()) {
        result.push(full);
      }
    }
  }
  return result.sort((left, right) => left.localeCompare(right, "en"));
}

function shouldScan(file) {
  const ext = path.extname(file).toLowerCase();
  return ext === ".xml" || ext === ".galaxy" || ext === ".txt" || ext === "";
}

function catalogKind(tag) {
  if (tag === "CUnit") return "Unit";
  if (tag.startsWith("CAbil")) return "Abil";
  if (tag === "CButton") return "Button";
  if (tag === "CUpgrade") return "Upgrade";
  if (tag === "CRequirement") return "Requirement";
  if (tag === "CBehavior") return "Behavior";
  return null;
}

function buildModIndex(roots, repoRelativeBase) {
  const tokens = new Set();
  const catalog = new Map();
  const unitDefinitions = new Map();
  const tokenRegex = /[A-Za-z_][A-Za-z0-9_]{2,}/g;
  const catalogRegex = /<(C[A-Za-z0-9_]+)\b([^>]*)/g;

  for (const root of roots) {
    for (const file of listFiles(root)) {
      if (!shouldScan(file)) continue;
      const text = fs.readFileSync(file, "utf8");
      for (const match of text.matchAll(tokenRegex)) {
        tokens.add(match[0].toLowerCase());
      }
      if (path.extname(file).toLowerCase() !== ".xml") continue;
      for (const match of text.matchAll(catalogRegex)) {
        const kind = catalogKind(match[1]);
        const id = /\bid="([^"]+)"/.exec(match[2])?.[1];
        if (!kind || !id) continue;
        const lower = id.toLowerCase();
        if (!catalog.has(kind)) catalog.set(kind, new Map());
        const bucket = catalog.get(kind);
        if (!bucket.has(lower)) bucket.set(lower, []);
        const relativeFile = path.relative(repoRelativeBase, file).replace(/\\/g, "/");
        bucket.get(lower).push({ id, file: relativeFile });
        if (kind === "Unit") {
          if (!unitDefinitions.has(lower)) unitDefinitions.set(lower, []);
          unitDefinitions.get(lower).push({ id, file: relativeFile });
        }
      }
    }
  }

  return { tokens, catalog, unitDefinitions };
}

function hasToken(index, value) {
  return Boolean(value) && index.tokens.has(String(value).toLowerCase());
}

function hasCatalog(index, kind, value) {
  return Boolean(value) && index.catalog.get(kind)?.has(String(value).toLowerCase());
}

function activeUnitStatus(index, ids) {
  const values = unique(ids);
  const exactHits = [];
  for (const id of values) {
    const definitions = index.unitDefinitions.get(id.toLowerCase()) ?? [];
    for (const definition of definitions) exactHits.push(definition);
  }
  if (exactHits.length > 0) {
    const idList = unique(exactHits.map((hit) => hit.id)).join(", ");
    const files = unique(exactHits.map((hit) => hit.file)).slice(0, 3).join("<br>");
    return {
      level: "exact",
      text: `CUnit已定义：${idList}`,
      files,
    };
  }

  const tokenHits = values.filter((id) => hasToken(index, id));
  if (tokenHits.length > 0) {
    return {
      level: "token",
      text: `仅文本/引用命中：${tokenHits.join(", ")}`,
      files: "",
    };
  }

  return {
    level: "missing",
    text: values.length ? `未命中：${values.join(", ")}` : "无官方ID",
    files: "",
  };
}

function productionStatus(index, production) {
  if (!production) {
    return { level: "none", text: "官方JSON无生产链" };
  }
  const producer = firstText(production.producer_unit_id);
  const ability = firstText(production.ability_id, abilityIdFromCommand(production.abil_cmd));
  const producerOk = !producer || hasCatalog(index, "Unit", producer) || hasToken(index, producer);
  const abilityOk = !ability || hasCatalog(index, "Abil", ability) || hasToken(index, ability);
  if (producerOk && abilityOk) return { level: "ok", text: "生产链已命中" };
  if (producerOk || abilityOk) {
    const parts = [
      producerOk ? "" : `生产者缺失 ${producer}`,
      abilityOk ? "" : `技能缺失 ${ability}`,
    ].filter(Boolean);
    return { level: "partial", text: parts.join("；") };
  }
  return { level: "missing", text: `生产者和技能均未命中：${[producer, ability].filter(Boolean).join(" / ")}` };
}

function abilityIdFromCommand(abilCmd) {
  return String(abilCmd || "").split(",")[0];
}

function resourceSummary(entry) {
  const unit = entry.unit ?? {};
  const production = entry.production ?? {};
  const minerals = firstText(production.minerals, unit.minerals);
  const vespene = firstText(production.vespene, unit.vespene);
  const time = firstText(production.time, unit.build_time);
  return [
    minerals ? `${minerals}晶体矿` : "",
    vespene ? `${vespene}瓦斯` : "",
    time ? `${time}秒` : "",
  ].filter(Boolean).join("，");
}

function statSummary(entry) {
  const unit = entry.unit ?? {};
  return [
    unit.life ? `生命${unit.life}` : "",
    unit.shields ? `护盾${unit.shields}` : "",
    unit.supply_cost ? `人口${unit.supply_cost}` : "",
    unit.sight ? `视野${unit.sight}` : "",
  ].filter(Boolean).join("，");
}

function productionSummary(entry) {
  const production = entry.production;
  if (!production) return "";
  const producer = firstText(production.producer_unit_id, "未知生产者");
  const ability = firstText(production.ability_id, production.abil_cmd);
  const cost = resourceSummary(entry);
  return [producer, ability, cost].filter(Boolean).join(" / ");
}

function buildNameIndex(entries) {
  const index = new Map();
  for (const entry of entries) {
    const names = unique([
      entry.displayName,
      entry.name,
      entry.id,
      entry.unit_id,
      ...entry.candidateIds,
    ]);
    for (const name of names) {
      const normalized = normalizeName(name);
      if (!normalized) continue;
      if (!index.has(normalized)) index.set(normalized, []);
      index.get(normalized).push(entry);
    }
  }
  return index;
}

function resolveWikiItem(commander, label, entries, nameIndex) {
  const aliasValues = wikiAliases.get(`${commander}|${label}`) ?? [];
  for (const alias of aliasValues) {
    const aliasNormalized = normalizeName(alias);
    const aliasMatches = nameIndex.get(aliasNormalized) ?? [];
    if (aliasMatches.length > 0) {
      return { type: "别名匹配", entries: pickBestEntries(label, aliasMatches) };
    }
  }

  const normalized = normalizeName(label);
  const exact = nameIndex.get(normalized) ?? [];
  if (exact.length > 0) {
    return { type: "精确匹配", entries: pickBestEntries(label, exact) };
  }

  const fuzzy = entries.filter((entry) => {
    const entryName = normalizeName(entry.displayName);
    return entryName && normalized && (entryName.includes(normalized) || normalized.includes(entryName));
  });
  if (fuzzy.length > 0) {
    return { type: "疑似别名", entries: pickBestEntries(label, fuzzy) };
  }

  const fallback = wikiIdFallbacks.get(`${commander}|${label}`) ?? wikiIdFallbacks.get(`*|${label}`);
  if (fallback) {
    return { type: "Wiki补充ID", entries: [makeSupplementalEntry(label, fallback)] };
  }

  return { type: "未匹配", entries: [] };
}

function makeSupplementalEntry(label, fallback) {
  const ids = unique(fallback.ids);
  return {
    kind: fallback.kind ?? guessKindFromWikiLabel(label),
    displayName: label,
    name: label,
    id: ids[0] ?? "",
    unit_id: ids[0] ?? "",
    candidateIds: ids,
    production: null,
    unit: {},
    supplemental: true,
    supplementalNote: fallback.note ?? "wiki主要部队补充ID，官方JSON未提供完整行。",
  };
}

function pickBestEntries(label, entries) {
  const normalizedLabel = normalizeName(label);
  const scored = entries.map((entry) => {
    const name = normalizeName(entry.displayName);
    let score = 0;
    if (name === normalizedLabel) score += 100;
    if (entry.kind === guessKindFromWikiLabel(label)) score += 20;
    if (entry.unit?.object_family !== "FactionEvolved") score += 10;
    if (entry.production) score += 5;
    return { entry, score };
  });
  const bestScore = Math.max(...scored.map((item) => item.score));
  return scored.filter((item) => item.score === bestScore).map((item) => item.entry);
}

function guessKindFromWikiLabel(label) {
  if (/(塔|炮|地堡|基地|网络|巨石|充能器|水晶塔|喷射体|导弹塔|炮台|原始蠕虫|自动机炮)/.test(label)) {
    return "建筑";
  }
  return "单位";
}

function compareCommander(options, meta, modsXmRoot, commonRoots) {
  const wiki = loadWikiItems(options.wikiRoot, meta);
  const official = loadOfficialCommander(options.officialRoot, meta.commander);
  const officialEntries = [...official.heroes, ...official.units, ...official.buildings];
  const nameIndex = buildNameIndex(officialEntries);
  const moduleName = commanderModuleName(meta.commander);
  const moduleRoot = path.join(modsXmRoot, moduleName);
  const scanRoots = [moduleRoot, ...commonRoots].filter(fs.existsSync);
  const modIndex = buildModIndex(scanRoots, options.modRoot);

  const rowByEntryKey = new Map();
  const rows = [];
  const wikiUnmatched = [];

  for (const item of wiki.items) {
    const resolved = resolveWikiItem(meta.commander, item, officialEntries, nameIndex);
    if (resolved.entries.length === 0) {
      wikiUnmatched.push({
        wiki: item,
        matchType: resolved.type,
        status: "Wiki主要部队有，但官方JSON未匹配到同名/别名",
      });
      rows.push(makeWikiOnlyRow(item, resolved.type));
      continue;
    }
    for (const entry of resolved.entries) {
      const key = entryKey(entry);
      const row = makeOfficialRow(item, resolved.type, entry, modIndex);
      rows.push(row);
      rowByEntryKey.set(key, row);
    }
  }

  const officialOnly = [];
  for (const entry of officialEntries) {
    const key = entryKey(entry);
    if (rowByEntryKey.has(key)) continue;
    const row = makeOfficialRow("", "官方补充", entry, modIndex);
    rows.push(row);
    officialOnly.push(row);
  }

  const activeMissing = rows.filter((row) => row.activeLevel === "missing");
  const activeTokenOnly = rows.filter((row) => row.activeLevel === "token");
  const productionProblems = rows.filter((row) => row.productionLevel === "missing" || row.productionLevel === "partial");

  return {
    commander: meta.commander,
    zh: meta.zh,
    runtimeName: runtimeCommanderName(meta.commander),
    moduleName,
    moduleExists: fs.existsSync(moduleRoot),
    wikiFile: path.relative(options.wikiRoot, wiki.file).replace(/\\/g, "/"),
    wikiItems: wiki.items,
    rows,
    wikiUnmatched,
    officialOnly,
    summary: {
      wikiItems: wiki.items.length,
      officialRows: officialEntries.length,
      totalRows: rows.length,
      wikiUnmatched: wikiUnmatched.length,
      officialOnly: officialOnly.length,
      activeMissing: activeMissing.length,
      activeTokenOnly: activeTokenOnly.length,
      productionProblems: productionProblems.length,
    },
  };
}

function entryKey(entry) {
  return `${entry.kind}|${entry.unit_id || ""}|${entry.id || ""}|${entry.displayName || ""}`;
}

function makeWikiOnlyRow(label, matchType) {
  return {
    wiki: label,
    matchType,
    kind: "Wiki未归类",
    officialName: "",
    officialId: "",
    activeStatus: "无官方ID，待人工补映射",
    activeLevel: "missing",
    activeFiles: "",
    production: "",
    productionStatus: "无官方生产链",
    productionLevel: "none",
    stats: "",
    cost: "",
    note: "优先查 wiki 名称是否对应官方别名或当前 Mod 自定义 ID。",
  };
}

function makeOfficialRow(wikiLabel, matchType, entry, modIndex) {
  const active = activeUnitStatus(modIndex, entry.candidateIds);
  const production = productionStatus(modIndex, entry.production);
  return {
    wiki: wikiLabel,
    matchType,
    kind: entry.kind,
    officialName: entry.displayName,
    officialId: firstText(entry.unit_id, entry.id),
    activeStatus: active.text,
    activeLevel: active.level,
    activeFiles: active.files,
    production: productionSummary(entry),
    productionStatus: production.text,
    productionLevel: production.level,
    stats: statSummary(entry),
    cost: resourceSummary(entry),
    note: entry.supplemental ? entry.supplementalNote : (matchType === "官方补充" ? "官方JSON有，wiki主要部队未列。" : ""),
  };
}

function markdownTable(rows, columns) {
  if (!rows.length) return "- 无。\n";
  const header = `| ${columns.map((column) => column.title).join(" | ")} |`;
  const separator = `| ${columns.map(() => "---").join(" | ")} |`;
  const body = rows.map((row) => `| ${columns.map((column) => escapeCell(column.value(row))).join(" | ")} |`);
  return [header, separator, ...body].join("\n") + "\n";
}

function escapeCell(value) {
  return String(value ?? "").replace(/\r?\n/g, "<br>").replace(/\|/g, "\\|");
}

function commanderFileName(result) {
  return `${result.commander.toLowerCase()}-${result.zh}-unit-building-compare.md`;
}

function renderCommanderReport(options, result) {
  const lines = [];
  lines.push(`# ${result.zh} / ${result.commander} 建筑单位对比`);
  lines.push("");
  lines.push(`- 当前 active Mod：\`${options.modRoot}\``);
  lines.push(`- 指挥官模块：\`${result.moduleName}\`（存在：${result.moduleExists ? "是" : "否"}）`);
  lines.push(`- Wiki主要部队文件：\`${result.wikiFile}\``);
  lines.push(`- Wiki主要部队：${result.wikiItems.join("、") || "未提取到"}`);
  lines.push("- 判定口径：wiki用于中文主要部队名单；官方JSON用于ID、生产链、生命/人口/费用；active Mod只检查`合作指挥官版起义狂潮`的本指挥官模块加`XMCore/XMFinal`。");
  lines.push("");
  lines.push("## 汇总");
  lines.push("");
  lines.push(markdownTable([result.summary], [
    { title: "Wiki项", value: (row) => row.wikiItems },
    { title: "官方行", value: (row) => row.officialRows },
    { title: "Wiki未匹配官方", value: (row) => row.wikiUnmatched },
    { title: "官方补充未在Wiki", value: (row) => row.officialOnly },
    { title: "当前Mod未命中", value: (row) => row.activeMissing },
    { title: "仅文本命中", value: (row) => row.activeTokenOnly },
    { title: "生产链异常", value: (row) => row.productionProblems },
  ]));
  lines.push("## 三方对照");
  lines.push("");
  lines.push(markdownTable(result.rows, rosterColumns()));

  const risky = result.rows.filter((row) => row.activeLevel === "missing" || row.activeLevel === "token" || row.productionLevel === "missing" || row.productionLevel === "partial");
  lines.push("## 优先排查项");
  lines.push("");
  lines.push(markdownTable(risky, rosterColumns(true)));

  lines.push("## Wiki未匹配官方JSON");
  lines.push("");
  lines.push(markdownTable(result.wikiUnmatched, [
    { title: "Wiki项", value: (row) => row.wiki },
    { title: "状态", value: (row) => row.status },
  ]));

  lines.push("## 官方有但Wiki主要部队未列");
  lines.push("");
  lines.push(markdownTable(result.officialOnly, [
    { title: "分类", value: (row) => row.kind },
    { title: "官方名称", value: (row) => row.officialName },
    { title: "ID", value: (row) => row.officialId },
    { title: "当前Mod", value: (row) => row.activeStatus },
    { title: "生产链", value: (row) => row.production || row.productionStatus },
    { title: "数值", value: (row) => [row.stats, row.cost].filter(Boolean).join("；") },
  ]));

  return `${lines.join("\n")}\n`;
}

function rosterColumns(short = false) {
  const columns = [
    { title: "Wiki项", value: (row) => row.wiki },
    { title: "匹配", value: (row) => row.matchType },
    { title: "分类", value: (row) => row.kind },
    { title: "官方名称", value: (row) => row.officialName },
    { title: "ID", value: (row) => row.officialId },
    { title: "当前Mod", value: (row) => row.activeStatus },
    { title: "生产链状态", value: (row) => row.productionStatus },
    { title: "生产/建造/变形", value: (row) => row.production },
    { title: "数值", value: (row) => [row.stats, row.cost].filter(Boolean).join("；") },
  ];
  if (!short) {
    columns.push({ title: "定义文件", value: (row) => row.activeFiles });
    columns.push({ title: "备注", value: (row) => row.note });
  }
  return columns;
}

function renderIndexReport(options, results) {
  const lines = [];
  lines.push("# 合作指挥官建筑单位逐个对比");
  lines.push("");
  lines.push(`- 生成时间：${new Date().toLocaleString("zh-CN", { hour12: false })}`);
  lines.push(`- Wiki抓取目录：\`${options.wikiRoot}\``);
  lines.push(`- 官方JSON目录：\`${options.officialRoot}\``);
  lines.push(`- 当前 active Mod：\`${options.modRoot}\``);
  lines.push("- 目标：先建立逐指挥官建筑/单位对比基线，后续修复时直接从“优先排查项”进入 XML。");
  lines.push("");
  lines.push("## 总览");
  lines.push("");
  lines.push(markdownTable(results, [
    { title: "指挥官", value: (row) => `${row.zh} / ${row.commander}` },
    { title: "模块", value: (row) => row.moduleName },
    { title: "Wiki项", value: (row) => row.summary.wikiItems },
    { title: "官方行", value: (row) => row.summary.officialRows },
    { title: "Wiki未匹配官方", value: (row) => row.summary.wikiUnmatched },
    { title: "官方补充未在Wiki", value: (row) => row.summary.officialOnly },
    { title: "当前Mod未命中", value: (row) => row.summary.activeMissing },
    { title: "仅文本命中", value: (row) => row.summary.activeTokenOnly },
    { title: "生产链异常", value: (row) => row.summary.productionProblems },
    { title: "单独报告", value: (row) => `by-commander/${commanderFileName(row)}` },
  ]));
  lines.push("## 全局优先排查项");
  lines.push("");
  const riskyRows = [];
  for (const result of results) {
    for (const row of result.rows) {
      if (row.activeLevel === "missing" || row.activeLevel === "token" || row.productionLevel === "missing" || row.productionLevel === "partial") {
        riskyRows.push({ commander: `${result.zh} / ${result.commander}`, ...row });
      }
    }
  }
  lines.push(markdownTable(riskyRows, [
    { title: "指挥官", value: (row) => row.commander },
    { title: "Wiki项", value: (row) => row.wiki },
    { title: "分类", value: (row) => row.kind },
    { title: "官方名称", value: (row) => row.officialName },
    { title: "ID", value: (row) => row.officialId },
    { title: "当前Mod", value: (row) => row.activeStatus },
    { title: "生产链状态", value: (row) => row.productionStatus },
    { title: "生产/建造/变形", value: (row) => row.production },
    { title: "数值", value: (row) => [row.stats, row.cost].filter(Boolean).join("；") },
  ]));
  lines.push("## 说明");
  lines.push("");
  lines.push("- `CUnit已定义`：当前 active Mod 对应扫描范围存在同 ID `CUnit`。");
  lines.push("- `仅文本/引用命中`：XML/Galaxy 里出现过该 token，但没有同 ID `CUnit` 定义，通常要继续查依赖或补 Catalog。");
  lines.push("- `Wiki未匹配官方JSON`：wiki主要部队名称没有映射到官方 JSON，优先补别名表或查是否是召唤物/建筑别称。");
  lines.push("- `官方补充未在Wiki`：官方 JSON 有但 wiki主要部队未列，不一定是缺失，常见于工人、英雄、基础建筑或展示项。");
  return `${lines.join("\n")}\n`;
}

function writeReports(options, results) {
  const byCommanderDir = path.join(options.outputDir, "by-commander");
  fs.mkdirSync(byCommanderDir, { recursive: true });
  for (const result of results) {
    fs.writeFileSync(path.join(byCommanderDir, commanderFileName(result)), renderCommanderReport(options, result), "utf8");
  }

  const indexPath = path.join(options.outputDir, "commander-unit-building-wiki-vs-active-mod.md");
  const jsonPath = path.join(options.outputDir, "commander-unit-building-wiki-vs-active-mod.json");
  fs.writeFileSync(indexPath, renderIndexReport(options, results), "utf8");
  fs.writeFileSync(jsonPath, `${JSON.stringify({ generated_at: new Date().toISOString(), options, results }, null, 2)}\n`, "utf8");
  return { indexPath, jsonPath, byCommanderDir };
}

function selectedMeta(commanders) {
  if (!commanders?.length) return commanderMeta;
  const selected = new Set(commanders);
  return commanderMeta.filter((meta) => selected.has(meta.commander) || selected.has(meta.zh));
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  assertDirectory(options.officialRoot, "Official commanders");
  assertDirectory(options.modRoot, "Active mod root");
  assertDirectory(options.wikiRoot, "Wiki artifact root");
  const modsXmRoot = path.join(options.modRoot, "Mods", "XM");
  assertDirectory(modsXmRoot, "Active mod Mods/XM");
  const commonRoots = [path.join(modsXmRoot, "XMCore.SC2Mod"), path.join(modsXmRoot, "XMFinal.SC2Mod")].filter(fs.existsSync);
  const metas = selectedMeta(options.commanders);
  if (metas.length === 0) throw new Error("No commanders selected");

  const results = metas.map((meta) => compareCommander(options, meta, modsXmRoot, commonRoots));
  const outputs = writeReports(options, results);
  console.log(`Wrote Markdown: ${outputs.indexPath}`);
  console.log(`Wrote JSON: ${outputs.jsonPath}`);
  console.log(`Wrote per-commander reports: ${outputs.byCommanderDir}`);
}

main();
