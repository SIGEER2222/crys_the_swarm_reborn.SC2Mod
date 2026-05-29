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
  ["Stukov|虫巢女王", ["SIQueen"]],
  ["Swann|爆弹比利", ["毁灭炮塔", "KelMorianGrenadeTurret"]],
  ["Swann|歌利亚武装机器人", ["歌利亚", "Goliath"]],
  ["Swann|热辣贝蒂", ["末日炮塔", "PerditionTurret"]],
  ["Swann|转转小子", ["KelMorianMissileTurret"]],
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
  ["*|爆弹比利", { kind: "建筑", ids: ["KelMorianGrenadeTurret"], note: "wiki主要部队补充：爆弹比利是斯旺毁灭炮塔升级/显示名，官方 CUnit 仍是 KelMorianGrenadeTurret。" }],
  ["*|热辣贝蒂", { kind: "建筑", ids: ["PerditionTurret"], note: "wiki主要部队补充：热辣贝蒂是斯旺末日炮塔升级/显示名，官方 CUnit 仍是 PerditionTurret。" }],
  ["*|转转小子", { kind: "建筑", ids: ["KelMorianMissileTurret", "MissileTurret"], note: "wiki主要部队补充：转转小子是斯旺强化导弹塔，优先检查 KelMorianMissileTurret。" }],
  ["Stukov|虫巢女王", { kind: "单位", ids: ["SIQueen"], note: "wiki主要部队补充：斯托科夫虫巢女王官方 CUnit 是 SIQueen，生产按钮位于感染星港/巢后茧链。" }],
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

const preferredProductionOverrides = new Map([
  ["Kerrigan|broodlord", {
    producer: "Mutalisk",
    ability: "MutaliskMorphToBroodLord",
    command: "Train1",
  }],
]);

const specialProductionPanelStatuses = [
  {
    commander: "Karax",
    units: ["SolarForge"],
    ability: "ProtossBuild",
    command: "Build29",
    text: "特殊机制：太阳锻炉是凯拉克斯英雄结构/可修复科技建筑；官方合作镜像也未在探机面板露出 ProtossBuild,Build29，不按普通建造按钮补。",
  },
  {
    commander: "Stukov",
    units: ["SISupplyDepot", "StukovInfestedSupplyDepot"],
    ability: "SIAdvancedBuild",
    command: "Build2",
    text: "特殊机制：被感染的补给站在旧线与官方合作镜像里都是保留槽/注释槽，SISCV 面板不开放 SIAdvancedBuild,Build2，不按玩家建造缺口修。",
  },
  {
    commander: "Zeratul",
    units: ["ZeratulSummonZealot", "ZealotZeratul"],
    ability: "ZeratulGatewayTrain",
    command: "Train18",
    text: "特殊机制：虚空圣堂武士/召唤狂热者来自官方 ArmyCategory/UserData 抽取项；官方 futurecommanders.xml 的 ZeratulGateway 也未露出 Train18，不按传送门训练按钮补。",
  },
];

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

const commanderCatalogAliases = new Map([
  ["Horner", {
    Unit: new Map([
      ["HHBattlecruiser", ["BattlecruiserMira"]],
      ["HHHellion", ["HellionMira"]],
      ["HHHellionTank", ["HellionTankMira"]],
      ["HHMercStarportUpgraded", ["MercStarportMira"]],
      ["HHStarport", ["StarportMira"]],
      ["HHRaven", ["RavenMira", "RavenMiraSiege"]],
      ["HHReaper", ["ReaperMira", "ReaperMiraFlying"]],
      ["HHVikingFighter", ["VikingFighterMira", "VikingAssaultMira"]],
      ["HHWidowMine", ["WidowMineMira", "WidowMineMiraBurrowed"]],
      ["HHWraith", ["WraithMira"]],
      ["Liberator", ["LiberatorMira", "LiberatorMiraAG"]],
      ["Predator", ["CycloneMira", "WidowMineMira", "WidowMineMiraBurrowed"]],
    ]),
    Abil: new Map([
      ["HHStarportTrainHorner", ["StarportTrainHornerMira"]],
      ["MorphToHHHellion", ["MorphToHellionMira"]],
      ["MorphToHHHellionTank", ["MorphToHellionTankMira"]],
      ["SummonHornerMercenaries", ["SummonHornerMercenaries"]],
    ]),
  }],
  ["Nova", {
    Unit: new Map([
      ["AutoTurret", ["NovaACLaserTurret", "AutoTurret_BlackOps"]],
      ["Barracks", ["BarracksNova"]],
      ["CommandCenter", ["CommandCenterNova"]],
      ["MissileTurret", ["MissileTurretNova"]],
      ["SCV", ["SCVNova"]],
    ]),
    Abil: new Map([
      ["BarracksTrain", ["BarracksTrainNova"]],
      ["CommandCenterTrain", ["CommandCenterTrainNova"]],
      ["FactoryTrain", ["FactoryTrainNova"]],
      ["StarportTrain", ["StarportTrainNova"]],
      ["TerranBuild", ["TerranBuildNova"]],
      ["TerranBuildFullRefund", ["TerranBuildNova"]],
    ]),
  }],
  ["Swann", {
    Unit: new Map([
      ["CommandCenter", ["CommandCenterSwann"]],
      ["Cyclone", ["CycloneSwann"]],
      ["Factory", ["FactorySwann"]],
      ["Goliath", ["GoliathSwann"]],
      ["Hellion", ["HellionSwann"]],
      ["HellionTank", ["HellionTankSwann"]],
      ["Hercules", ["HerculesSwann"]],
      ["KelMorianGrenadeTurret", ["GrenadeTurretSwann"]],
      ["KelMorianMissileTurret", ["MissileTurretSwann"]],
      ["MissileTurret", ["MissileTurretSwann"]],
      ["PerditionTurret", ["PerditionTurretSwann"]],
      ["SCV", ["SCVSwann"]],
      ["ScienceVessel", ["ScienceVesselSwann"]],
      ["SiegeTank", ["SiegeTankSwann", "SiegeTankSiegedSwann"]],
      ["Starport", ["StarportSwann"]],
      ["SupplyDepot", ["SupplyDepotSwann"]],
      ["Thor", ["ThorSwann"]],
      ["Wraith", ["WraithSwann"]],
    ]),
    Abil: new Map([
      ["CommandCenterTrain", ["CommandCenterTrainSwann"]],
      ["FactoryTrain", ["FactoryTrainSwann"]],
      ["StarportTrain", ["StarportTrainSwann"]],
      ["TerranBuild", ["TerranBuildSwann"]],
    ]),
  }],
  ["Zagara", {
    Unit: new Map([
      ["SILarva", ["Larva"]],
    ]),
    Abil: new Map([
      ["SILarvaTrain", ["LarvaTrainSwarm", "LarvaTrain"]],
    ]),
  }],
]);

const nonFinalUnitPattern = /(Cocoon|Egg|SpawnerUnit|Dummy|Missile|Weapon|Placeholder)$/i;

function parseArgs(argv) {
  const options = {
    officialRoot: path.join(repoRoot, "游戏数据", "官方合作指挥官", "commanders"),
    officialMirrorRoot: path.join(repoRoot, "游戏数据", "官方SC2原始文本镜像"),
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
    } else if (arg === "--official-mirror-root") {
      options.officialMirrorRoot = path.resolve(next());
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
  --official-mirror-root <path>  官方 SC2 原始文本镜像根目录
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

function stripXmlComments(text) {
  return String(text ?? "").replace(/<!--[\s\S]*?-->/g, "");
}

function readScanText(file) {
  const text = fs.readFileSync(file, "utf8");
  return path.extname(file).toLowerCase() === ".xml" ? stripXmlComments(text) : text;
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
  const units = asArray(readJson(path.join(dir, "units.json"))).map((entry) => enrichOfficialEntry(entry, "单位", commander));
  const buildings = asArray(readJson(path.join(dir, "buildings.json"))).map((entry) => enrichOfficialEntry(entry, "建筑", commander));
  const heroes = asArray(readJson(path.join(dir, "heroes.json"))).map((entry) => enrichOfficialEntry(entry, "英雄", commander));
  return {
    dir,
    units: units.filter(shouldKeepOfficialEntry),
    buildings: buildings.filter(shouldKeepOfficialEntry),
    heroes: heroes.filter(shouldKeepOfficialEntry),
  };
}

function enrichOfficialEntry(entry, kind, commander) {
  const primaryIds = unique([entry.unit_id, entry.id]);
  const aliasIds = primaryIds.flatMap((id) => catalogAliases(commander, "Unit", id));
  return {
    ...entry,
    commander,
    kind,
    displayName: firstText(entry.name, entry.id, entry.unit_id),
    candidateIds: unique([...primaryIds, ...aliasIds]),
  };
}

function catalogAliases(commander, kind, value) {
  if (!value) return [];
  const aliases = [
    ...(activeIdAliases.get(value) ?? []),
    ...(commanderCatalogAliases.get(commander)?.[kind]?.get(value) ?? []),
  ];
  return unique(aliases);
}

function catalogLookupValues(commander, kind, value) {
  return unique([value, ...catalogAliases(commander, kind, value)]);
}

function preferredCatalogLookupValues(commander, kind, value) {
  if (!value) return [];
  const aliases = catalogAliases(commander, kind, value);
  return aliases.length > 0 ? unique(aliases) : [value];
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
  if (tag.startsWith("CRequirement")) return "Requirement";
  if (tag.startsWith("CBehavior")) return "Behavior";
  if (tag.startsWith("CEffect")) return "Effect";
  if (tag.startsWith("CValidator")) return "Validator";
  if (tag.startsWith("CWeapon")) return "Weapon";
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
      const text = readScanText(file);
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

function catalogLayerRoots(officialMirrorRoot) {
  const gamedata = (...parts) => path.join(officialMirrorRoot, ...parts, "base.sc2data", "gamedata");
  return {
    officialCoop: [
      gamedata("mods", "starcoop", "starcoop.sc2mod"),
      gamedata("mods", "starcoop", "commanders", "egonstetmann.sc2mod"),
      gamedata("mods", "starcoop", "commanders", "arcturusmengsk.sc2mod"),
    ],
    officialBase: [
      gamedata("campaigns", "libertystory.sc2campaign"),
      gamedata("campaigns", "liberty.sc2campaign"),
      gamedata("campaigns", "swarmstory.sc2campaign"),
      gamedata("campaigns", "swarm.sc2campaign"),
      gamedata("campaigns", "void.sc2campaign"),
      gamedata("campaigns", "voidstory.sc2campaign"),
      gamedata("mods", "voidmulti.sc2mod"),
      gamedata("mods", "void.sc2mod"),
      gamedata("mods", "swarmmulti.sc2mod"),
      gamedata("mods", "swarm.sc2mod"),
      gamedata("mods", "libertymulti.sc2mod"),
      gamedata("mods", "liberty.sc2mod"),
      gamedata("mods", "core.sc2mod"),
    ],
  };
}

function existingRoots(roots) {
  return roots.filter((root) => fs.existsSync(root) && fs.statSync(root).isDirectory());
}

function normalizedRoot(root) {
  return path.resolve(root).toLowerCase();
}

function documentDependencyClosure(modRoot, entryRoot) {
  const result = [];
  const seen = new Set();
  const pending = [entryRoot];

  while (pending.length > 0) {
    const current = path.resolve(pending.pop());
    const key = normalizedRoot(current);
    if (seen.has(key)) continue;
    seen.add(key);
    if (!fs.existsSync(current) || !fs.statSync(current).isDirectory()) continue;
    result.push(current);
    for (const dependency of readDocumentDependencies(modRoot, current)) {
      pending.push(dependency);
    }
  }

  return result;
}

function readDocumentDependencies(modRoot, projectRoot) {
  const documentInfo = path.join(projectRoot, "DocumentInfo");
  if (!fs.existsSync(documentInfo)) return [];
  const text = readText(documentInfo);
  const dependencies = [];
  for (const match of text.matchAll(/file:([^,<\r\n]+)/g)) {
    const relativeDependency = match[1].trim().replace(/[\\/]+/g, path.sep);
    if (!relativeDependency) continue;
    const fullPath = path.resolve(modRoot, relativeDependency);
    if (fs.existsSync(fullPath) && fs.statSync(fullPath).isDirectory()) {
      dependencies.push(fullPath);
    }
  }
  return unique(dependencies.map((dependency) => path.resolve(dependency)));
}

function excludeRoots(roots, excludedRoots) {
  const excluded = new Set(excludedRoots.map(normalizedRoot));
  return roots.filter((root) => !excluded.has(normalizedRoot(root)));
}

function makeLayeredIndex(layers) {
  return { layers };
}

function layerDefinitionText(layer) {
  const labels = {
    active: "当前模块",
    shared: "XM共享模块",
    runtime: "XMFinal运行闭包",
    base: "底层基础镜像",
    official: "官方合作镜像",
  };
  return labels[layer.level] ?? layer.label;
}

function findCatalogHits(layeredIndex, kind, values) {
  const hits = [];
  for (const layer of layeredIndex.layers) {
    for (const value of values) {
      const definitions = layer.index.catalog.get(kind)?.get(String(value).toLowerCase()) ?? [];
      for (const definition of definitions) {
        hits.push({ ...definition, layer });
      }
    }
  }
  return hits;
}

function findTokenHits(layeredIndex, values) {
  const hits = [];
  for (const layer of layeredIndex.layers) {
    for (const value of values) {
      if (hasToken(layer.index, value)) hits.push({ value, layer });
    }
  }
  return hits;
}

function primaryLevel(hits) {
  return hits[0]?.layer.level ?? "missing";
}

function groupHitText(hits, kindLabel) {
  const byLayer = new Map();
  for (const hit of hits) {
    const key = hit.layer.level;
    if (!byLayer.has(key)) byLayer.set(key, { layer: hit.layer, ids: [] });
    byLayer.get(key).ids.push(hit.id ?? hit.value);
  }
  return [...byLayer.values()]
    .map((group) => `${layerDefinitionText(group.layer)}${kindLabel}：${unique(group.ids).join(", ")}`)
    .join("；");
}

function hitFiles(hits) {
  return unique(hits.map((hit) => hit.file)).slice(0, 4).join("<br>");
}

function attrValue(attrs, name) {
  return new RegExp(`\\b${name}="([^"]*)"`).exec(attrs)?.[1] ?? "";
}

function nestedValue(body, name) {
  return new RegExp(`<${name}\\b[^>]*\\bvalue="([^"]*)"`, "i").exec(body)?.[1] ?? "";
}

function parsePossiblyNestedAttr(attrs, body, name) {
  return attrValue(attrs, name) || nestedValue(body, name);
}

function collectActiveProductionUnitRefs(moduleRoot) {
  return collectProductionUnitRefsFromRoots(existingRoots([moduleRoot]));
}

function collectProductionUnitRefsFromRoots(moduleRoots, options = {}) {
  const result = [];
  const layoutRoots = options.layoutRoots ?? moduleRoots;
  const exposureGamedataRoots = layoutRoots
    .map(gameDataRootForScan)
    .filter(fs.existsSync);
  const productRoots = options.productRoots ?? moduleRoots;
  const productGamedataRoots = productRoots
    .map(gameDataRootForScan)
    .filter(fs.existsSync);
  const linkedAbilities = mergeUnitLinkedAbilities(exposureGamedataRoots.map((gamedataRoot) => collectUnitLinkedAbilities(gamedataRoot)));
  const productionIndex = collectAbilityProductionIndex(productGamedataRoots);

  for (const [abilityId, abilityUse] of linkedAbilities) {
    const productionRows = inheritedAbilityProductionRows(productionIndex, abilityId);
    const commands = unique([
      ...[...abilityUse.commands.keys()],
      ...productionRows.map((row) => row.command),
    ]);
    for (const command of commands) {
      const commandUses = commandUseRows(abilityUse, command);
      if (commandUses.length === 0) continue;
      const producers = unique(commandUses.map((use) => use.producer));
      const exposed = producers.length > 0;
      const matchingRows = productionRows.filter((row) => commandMatches(command, row.command));
      if (matchingRows.length === 0) {
        result.push({
          abilityId,
          command,
          exposed,
          producers,
          layoutFaces: unique(commandUses.map((use) => use.face)),
          buttonFace: "",
          buttonRequirement: "",
          buttonState: "",
          unitId: "",
          file: "",
          productless: true,
        });
        continue;
      }

      for (const row of matchingRows) {
        result.push({
          abilityId,
          command,
          exposed,
          producers,
          layoutFaces: unique(commandUses.map((use) => use.face)),
          buttonFace: row.buttonFace,
          buttonRequirement: row.buttonRequirement,
          buttonState: row.buttonState,
          unitId: row.unitId,
          file: row.file,
          inheritedFrom: row.inheritedFrom,
        });
      }
    }
  }

  return result;
}

function collectAbilityProductionIndex(gamedataRoots) {
  const rowsByAbility = new Map();
  const parentByAbility = new Map();
  const abilityBlockRegex = /<(CAbil(?:Train|WarpTrain|Build|Morph|MorphPlacement))\b([^>]*?)(?:\/>|>([\s\S]*?)<\/\1>)/g;
  const infoArrayRegex = /<InfoArray\b([^>]*?)(?:\/>|>([\s\S]*?)<\/InfoArray>)/g;
  const unitAttrRegex = /\b(?:Unit|unit)="([^"]+)"/g;
  const nestedUnitRegex = /<(?:Unit|MorphUnit)\s+value="([^"]+)"/g;

  for (const gamedataRoot of gamedataRoots) {
    for (const file of listFiles(gamedataRoot)) {
      if (path.extname(file).toLowerCase() !== ".xml") continue;
      const text = readScanText(file);
      for (const block of text.matchAll(abilityBlockRegex)) {
        const tag = block[1] ?? "";
        const attrs = block[2] ?? "";
        const body = block[3] ?? "";
        const abilityId = attrValue(attrs, "id");
        if (!abilityId) continue;
        const parent = attrValue(attrs, "parent");
        if (parent) parentByAbility.set(abilityId, parent);
        for (const infoMatch of body.matchAll(infoArrayRegex)) {
          const infoAttrs = infoMatch[1] ?? "";
          const infoBody = infoMatch[2] ?? "";
          const command = attrValue(infoAttrs, "index") || defaultInfoArrayCommand(tag);
          const buttonMatch = /<Button\b([^>]*?)(?:\/>|>([\s\S]*?)<\/Button>)/.exec(infoBody);
          const buttonAttrs = buttonMatch?.[1] ?? "";
          const buttonBody = buttonMatch?.[2] ?? "";
          const unitIds = unique([
            ...[...infoAttrs.matchAll(unitAttrRegex)].map((match) => match[1]),
            ...[...infoBody.matchAll(nestedUnitRegex)].map((match) => match[1]),
          ]).filter(isFinalUnitId);
          if (unitIds.length === 0) continue;
          if (!rowsByAbility.has(abilityId)) rowsByAbility.set(abilityId, []);
          for (const unitId of unitIds) {
            rowsByAbility.get(abilityId).push({
              abilityId,
              command,
              unitId,
              buttonFace: parsePossiblyNestedAttr(buttonAttrs, buttonBody, "DefaultButtonFace"),
              buttonRequirement: parsePossiblyNestedAttr(buttonAttrs, buttonBody, "Requirements"),
              buttonState: parsePossiblyNestedAttr(buttonAttrs, buttonBody, "State"),
              file: path.relative(repoRoot, file).replace(/\\/g, "/"),
            });
          }
        }
      }
    }
  }

  return { rowsByAbility, parentByAbility };
}

function defaultInfoArrayCommand(abilityTag) {
  return abilityTag === "CAbilMorph" ? "Execute" : "0";
}

function isFinalUnitId(unitId) {
  if (!unitId || unitId === "255") return false;
  if (unitId.includes("#")) return false;
  return !nonFinalUnitPattern.test(unitId);
}

function inheritedAbilityProductionRows(productionIndex, abilityId, seen = new Set()) {
  if (!abilityId || seen.has(abilityId)) return [];
  seen.add(abilityId);
  const ownRows = productionIndex.rowsByAbility.get(abilityId) ?? [];
  const parent = productionIndex.parentByAbility.get(abilityId);
  if (!parent) return ownRows;
  const ownCommands = new Set(ownRows.map((row) => row.command));
  const inheritedRows = inheritedAbilityProductionRows(productionIndex, parent, seen)
    .filter((row) => !ownCommands.has(row.command))
    .map((row) => ({
      ...row,
      abilityId,
      inheritedFrom: row.inheritedFrom ?? parent,
    }));
  return [...ownRows, ...inheritedRows];
}

function gameDataRootForScan(root) {
  const activeModGameData = path.join(root, "Base.SC2Data", "GameData");
  if (fs.existsSync(activeModGameData)) return activeModGameData;
  const officialMirrorGameData = path.join(root, "base.sc2data", "gamedata");
  if (fs.existsSync(officialMirrorGameData)) return officialMirrorGameData;
  return root;
}

function mergeUnitLinkedAbilities(maps) {
  const result = new Map();
  for (const map of maps) {
    for (const [abilityId, abilityUse] of map) {
      if (!result.has(abilityId)) result.set(abilityId, { commands: new Map() });
      const merged = result.get(abilityId);
      for (const [command, uses] of abilityUse.commands) {
        if (!merged.commands.has(command)) merged.commands.set(command, []);
        merged.commands.get(command).push(...uses);
      }
    }
  }
  return result;
}

function collectUnitLinkedAbilities(gamedataRoot) {
  const result = new Map();
  const unitBlockRegex = /<CUnit\b([^>]*)>([\s\S]*?)<\/CUnit>/g;
  const layoutButtonRegex = /<LayoutButtons\b([^>]*?)(?:\/>|>([\s\S]*?)<\/LayoutButtons>)/g;

  for (const file of listFiles(gamedataRoot)) {
    if (path.extname(file).toLowerCase() !== ".xml") continue;
    const text = readScanText(file);
    for (const unitBlock of text.matchAll(unitBlockRegex)) {
      const unitAttrs = unitBlock[1] ?? "";
      const body = unitBlock[2];
      const unitId = /\bid="([^"]+)"/.exec(unitAttrs)?.[1] ?? "";
      for (const match of body.matchAll(layoutButtonRegex)) {
        const layoutAttrs = match[1] ?? "";
        const layoutBody = match[2] ?? "";
        const abilCmd = parsePossiblyNestedAttr(layoutAttrs, layoutBody, "AbilCmd");
        if (!abilCmd) continue;
        const [abilityId, command = ""] = abilCmd.split(",");
        recordAbilityUse(result, abilityId, command, unitId, parsePossiblyNestedAttr(layoutAttrs, layoutBody, "Face"));
      }
    }
  }

  return result;
}

function recordAbilityUse(result, abilityId, command, unitId, face) {
  if (!abilityId || abilityId === "255") return;
  if (!result.has(abilityId)) {
    result.set(abilityId, {
      commands: new Map(),
    });
  }
  const row = result.get(abilityId);
  if (command === "255") return;
  if (!row.commands.has(command)) row.commands.set(command, []);
  row.commands.get(command).push({
    producer: unitId || "未知生产者",
    face: face || "",
  });
}

function commandProducers(abilityUse, command) {
  return unique(commandUseRows(abilityUse, command).map((use) => use.producer));
}

function commandUseRows(abilityUse, command) {
  const commands = [];
  if (command === "0" || command === "") {
    commands.push("0", "");
  } else {
    commands.push(command);
  }
  const uses = [];
  for (const value of unique(commands)) {
    for (const use of abilityUse.commands.get(value) ?? []) {
      uses.push(use);
    }
  }
  return uses;
}

function activeProductionUnitGaps(layeredIndex, moduleRoot, officialProducerIds, startUnitIds, exposedOnly = true) {
  const byUnit = new Map();
  for (const ref of collectActiveProductionUnitRefs(moduleRoot)) {
    if (exposedOnly && !ref.exposed) continue;
    if (!ref.unitId) continue;
    const status = activeUnitStatus(layeredIndex, [ref.unitId]);
    if (isRuntimeResolved(status.level)) continue;
    const key = `${status.level}|${ref.unitId}`;
    if (!byUnit.has(key)) {
      byUnit.set(key, {
        unitId: ref.unitId,
        level: status.level,
        status: status.text,
        abilities: [],
        commands: [],
        producers: [],
        producerOfficialStatus: [],
        producerStartStatus: [],
        buttonRequirements: [],
        buttonStates: [],
        buttonFaces: [],
        layoutFaces: [],
        files: [],
      });
    }
    const row = byUnit.get(key);
    row.abilities.push(ref.abilityId);
    row.commands.push(`${ref.abilityId},${ref.command}`);
    row.producers.push(...ref.producers);
    row.producerOfficialStatus.push(...producerOfficialStatuses(ref.producers, officialProducerIds));
    row.producerStartStatus.push(...producerStartStatuses(ref.producers, startUnitIds));
    row.buttonRequirements.push(ref.buttonRequirement);
    row.buttonStates.push(ref.buttonState);
    row.buttonFaces.push(ref.buttonFace);
    row.layoutFaces.push(...ref.layoutFaces);
    row.files.push(ref.file);
  }

  return [...byUnit.values()]
    .map((row) => ({
      ...row,
      abilities: unique(row.abilities).join(", "),
      commands: unique(row.commands).join(", "),
      producers: unique(row.producers).join(", "),
      producerOfficialStatus: unique(row.producerOfficialStatus).join(", "),
      producerStartStatus: unique(row.producerStartStatus).join(", "),
      buttonRequirements: unique(row.buttonRequirements).join(", "),
      buttonStates: unique(row.buttonStates).join(", "),
      buttonFaces: unique(row.buttonFaces).join(", "),
      layoutFaces: unique(row.layoutFaces).join(", "),
      files: unique(row.files).slice(0, 4).join("<br>"),
    }))
    .sort((left, right) => left.unitId.localeCompare(right.unitId, "en"));
}

function activeHiddenProductionUnitGaps(layeredIndex, moduleRoot, officialProducerIds, startUnitIds) {
  const exposedKeys = new Set(collectActiveProductionUnitRefs(moduleRoot)
    .filter((ref) => ref.exposed && ref.unitId)
    .map((ref) => `${ref.abilityId}|${ref.command}|${ref.unitId}`));
  const byUnit = new Map();
  for (const ref of collectActiveProductionUnitRefs(moduleRoot)) {
    if (ref.exposed) continue;
    if (!ref.unitId) continue;
    if (exposedKeys.has(`${ref.abilityId}|${ref.command}|${ref.unitId}`)) continue;
    const status = activeUnitStatus(layeredIndex, [ref.unitId]);
    if (isRuntimeResolved(status.level)) continue;
    const key = `${status.level}|${ref.unitId}`;
    if (!byUnit.has(key)) {
      byUnit.set(key, {
        unitId: ref.unitId,
        level: status.level,
        status: status.text,
        abilities: [],
        commands: [],
        producers: [],
        producerOfficialStatus: [],
        producerStartStatus: [],
        buttonRequirements: [],
        buttonStates: [],
        buttonFaces: [],
        layoutFaces: [],
        files: [],
      });
    }
    const row = byUnit.get(key);
    row.abilities.push(ref.abilityId);
    row.commands.push(`${ref.abilityId},${ref.command}`);
    row.producers.push(...ref.producers);
    row.producerOfficialStatus.push(...producerOfficialStatuses(ref.producers, officialProducerIds));
    row.producerStartStatus.push(...producerStartStatuses(ref.producers, startUnitIds));
    row.buttonRequirements.push(ref.buttonRequirement);
    row.buttonStates.push(ref.buttonState);
    row.buttonFaces.push(ref.buttonFace);
    row.layoutFaces.push(...ref.layoutFaces);
    row.files.push(ref.file);
  }

  return [...byUnit.values()]
    .map((row) => ({
      ...row,
      abilities: unique(row.abilities).join(", "),
      commands: unique(row.commands).join(", "),
      producers: unique(row.producers).join(", "),
      producerOfficialStatus: unique(row.producerOfficialStatus).join(", "),
      producerStartStatus: unique(row.producerStartStatus).join(", "),
      buttonRequirements: unique(row.buttonRequirements).join(", "),
      buttonStates: unique(row.buttonStates).join(", "),
      buttonFaces: unique(row.buttonFaces).join(", "),
      layoutFaces: unique(row.layoutFaces).join(", "),
      files: unique(row.files).slice(0, 4).join("<br>"),
    }))
    .sort((left, right) => left.unitId.localeCompare(right.unitId, "en"));
}

function activeExternalProductionRefs(layeredIndex, moduleRoot, officialProducerIds, startUnitIds) {
  const byUnit = new Map();
  for (const ref of collectActiveProductionUnitRefs(moduleRoot)) {
    if (!ref.exposed) continue;
    if (!ref.unitId) continue;
    const status = activeUnitStatus(layeredIndex, [ref.unitId]);
    const producerStatuses = producerOfficialStatuses(ref.producers, officialProducerIds);
    const hasExternalProducer = producerStatuses.some((producerStatus) => producerStatus.endsWith(":官方无"));
    if (!hasExternalProducer) continue;
    if (status.level !== "runtime" && status.level !== "official") continue;
    const key = `${status.level}|${ref.unitId}`;
    if (!byUnit.has(key)) {
      byUnit.set(key, {
        unitId: ref.unitId,
        level: status.level,
        status: status.text,
        abilities: [],
        commands: [],
        producers: [],
        producerOfficialStatus: [],
        producerStartStatus: [],
        buttonRequirements: [],
        buttonStates: [],
        buttonFaces: [],
        layoutFaces: [],
        files: [],
      });
    }
    const row = byUnit.get(key);
    row.abilities.push(ref.abilityId);
    row.commands.push(`${ref.abilityId},${ref.command}`);
    row.producers.push(...ref.producers);
    row.producerOfficialStatus.push(...producerStatuses);
    row.producerStartStatus.push(...producerStartStatuses(ref.producers, startUnitIds));
    row.buttonRequirements.push(ref.buttonRequirement);
    row.buttonStates.push(ref.buttonState);
    row.buttonFaces.push(ref.buttonFace);
    row.layoutFaces.push(...ref.layoutFaces);
    row.files.push(ref.file);
  }

  return [...byUnit.values()]
    .map((row) => ({
      ...row,
      abilities: unique(row.abilities).join(", "),
      commands: unique(row.commands).join(", "),
      producers: unique(row.producers).join(", "),
      producerOfficialStatus: unique(row.producerOfficialStatus).join(", "),
      producerStartStatus: unique(row.producerStartStatus).join(", "),
      buttonRequirements: unique(row.buttonRequirements).join(", "),
      buttonStates: unique(row.buttonStates).join(", "),
      buttonFaces: unique(row.buttonFaces).join(", "),
      layoutFaces: unique(row.layoutFaces).join(", "),
      files: unique(row.files).slice(0, 4).join("<br>"),
    }))
    .sort((left, right) => left.level.localeCompare(right.level, "en") || left.unitId.localeCompare(right.unitId, "en"));
}

function productionAbilityId(production) {
  return firstText(production?.ability_id, abilityIdFromCommand(production?.abil_cmd));
}

function productionCommandIndex(production) {
  const direct = firstText(production?.command_index);
  if (direct) return direct;
  const parts = String(production?.abil_cmd || "").split(",");
  return parts[1] ?? "";
}

function productionEntryUnitIds(entry, production) {
  return new Set(unique([
    entry?.unit_id,
    entry?.id,
    ...(entry?.candidateIds ?? []),
    production?.unit,
    production?.base_unit_id,
  ]).map((value) => value.toLowerCase()));
}

function productionMatchesSelector(commander, entry, production, selector) {
  if (!production || selector.commander !== commander) return false;

  const units = productionEntryUnitIds(entry, production);
  const selectorUnits = asArray(selector.units ?? selector.unit).map((value) => String(value).toLowerCase());
  if (selectorUnits.length > 0 && !selectorUnits.some((unit) => units.has(unit))) return false;

  const ability = productionAbilityId(production).toLowerCase();
  const command = productionCommandIndex(production).toLowerCase();
  const producer = firstText(production.producer_unit_id).toLowerCase();
  if (selector.ability && ability !== String(selector.ability).toLowerCase()) return false;
  if (selector.command && command !== String(selector.command).toLowerCase()) return false;
  if (selector.producer && producer !== String(selector.producer).toLowerCase()) return false;
  return true;
}

function preferredProductionOverride(commander, entry) {
  const ids = productionEntryUnitIds(entry, null);
  for (const id of ids) {
    const override = preferredProductionOverrides.get(`${commander}|${id}`) ?? preferredProductionOverrides.get(`${commander}|${id.toLowerCase()}`);
    if (override) return { ...override, commander };
  }
  return null;
}

function specialProductionPanelStatus(commander, entry, production) {
  const special = specialProductionPanelStatuses.find((selector) => productionMatchesSelector(commander, entry, production, selector));
  return special ? { level: "special", text: special.text } : null;
}

function commandMatches(expected, actual) {
  const left = String(expected || "");
  const right = String(actual || "");
  if (!left || left === "255") return true;
  if ((left === "0" || left === "") && (right === "0" || right === "")) return true;
  return left.toLowerCase() === right.toLowerCase();
}

function producedUnitCandidates(commander, entry, production) {
  const directIds = unique([
    production?.unit,
    production?.base_unit_id,
    entry.unit_id,
    entry.id,
    ...asArray(entry.candidateIds),
  ]);
  return unique(directIds.flatMap((id) => preferredCatalogLookupValues(commander, "Unit", id)));
}

function activePanelStatusForProduction(activeRefs, commander, entry, production) {
  if (!production) {
    return { level: "none", text: "官方JSON无生产链" };
  }

  const special = specialProductionPanelStatus(commander, entry, production);
  if (special) return special;

  const ability = productionAbilityId(production);
  const command = productionCommandIndex(production);
  const producer = firstText(production.producer_unit_id);
  const abilityIds = new Set(catalogLookupValues(commander, "Abil", ability).map((value) => value.toLowerCase()));
  const producerIds = new Set(catalogLookupValues(commander, "Unit", producer).map((value) => value.toLowerCase()));
  const unitIds = new Set(producedUnitCandidates(commander, entry, production).map((value) => value.toLowerCase()));
  const abilityProducerMatches = activeRefs.filter((ref) => (
    abilityIds.has(ref.abilityId.toLowerCase())
    && (producerIds.size === 0 || ref.producers.some((refProducer) => producerIds.has(refProducer.toLowerCase())))
  ));
  const abilityProducerUnitMatches = activeRefs.filter((ref) => (
    abilityIds.has(ref.abilityId.toLowerCase())
    && (producerIds.size === 0 || ref.producers.some((refProducer) => producerIds.has(refProducer.toLowerCase())))
    && unitIds.has(ref.unitId.toLowerCase())
  ));
  const matches = abilityProducerUnitMatches.filter((ref) => commandMatches(command, ref.command));
  const exposed = matches.filter((ref) => ref.exposed);

  if (exposed.length > 0) {
    return {
      level: "ok",
      text: `当前面板已露出：${unique(exposed.map((ref) => `${ref.abilityId},${ref.command} -> ${ref.unitId}`)).join("；")}`,
    };
  }

  const exposedSameCommand = abilityProducerMatches
    .filter((ref) => ref.exposed && commandMatches(command, ref.command));
  if (exposedSameCommand.length > 0) {
    return {
      level: "ok",
      text: `当前面板已露出同命令，产物ID需别名核对：${unique(exposedSameCommand.map((ref) => `${ref.abilityId},${ref.command} -> ${ref.unitId}`)).join("；")}；官方期望 ${[...unitIds].join("/")}`,
    };
  }

  const exposedDifferentCommand = abilityProducerUnitMatches.filter((ref) => ref.exposed);
  if (exposedDifferentCommand.length > 0) {
    return {
      level: "ok",
      text: `当前面板已露出但命令位不同：${unique(exposedDifferentCommand.map((ref) => `${ref.abilityId},${ref.command} -> ${ref.unitId}`)).join("；")}`,
    };
  }

  if (matches.length > 0) {
    return {
      level: "hidden",
      text: `当前技能有槽但面板未露出：${unique(matches.map((ref) => `${ref.abilityId},${ref.command} -> ${ref.unitId}`)).join("；")}`,
    };
  }

  return {
    level: "missing",
    text: `当前模块未找到匹配面板：${[ability, command].filter(Boolean).join(",")} -> ${[...unitIds].join("/")}`,
  };
}

function producerOfficialStatuses(producers, officialProducerIds) {
  return unique(producers).map((producer) => `${producer}:${officialProducerIds.has(producer.toLowerCase()) ? "官方有" : "官方无"}`);
}

function producerStartStatuses(producers, startUnitIds) {
  return unique(producers).map((producer) => `${producer}:${startUnitIds.has(producer.toLowerCase()) ? "开局有" : "开局无"}`);
}

function buildOfficialProducerIdSet(entries) {
  const ids = new Set();
  const add = (value) => {
    for (const id of unique(asArray(value))) {
      ids.add(id.toLowerCase());
    }
  };
  const addProduction = (production) => {
    if (!production) return;
    add(production.producer_unit_id);
    add(production.unit);
    add(production.base_unit_id);
  };

  for (const entry of entries) {
    add(entry.unit_id);
    add(entry.id);
    add(entry.candidateIds);
    addProduction(entry.production);
    for (const option of asArray(entry.production_options)) {
      addProduction(option);
    }
  }

  return ids;
}

function loadCommanderStartUnits(options, commander) {
  const startUnits = new Set();
  const add = (value) => {
    for (const id of unique(asArray(value))) {
      startUnits.add(id.toLowerCase());
    }
  };
  const specialStarts = {
    Abathur: ["Hatchery", "Drone", "Overlord"],
    AbathurReborn: ["Hatchery", "Drone", "Overlord"],
    Stukov: ["SICommandCenter", "SISCV", "SICivilianStructure"],
    Dehaka: ["DehakaHatchery", "DehakaDrone", "DehakaCoopReviveCocoon"],
    Tychus: ["TychusCommandCenter", "TychusSCV", "TychusResearchCenter"],
    Horner: ["CommandCenterMira", "SCVMira", "StarportMira"],
    Mira: ["CommandCenterMira", "SCVMira", "StarportMira"],
    Nova: ["CommandCenterNova", "SCVNova", "GhostAcademyNova"],
    Mengsk: ["CommandCenterMengsk", "SCVMengsk", "StarportMengsk"],
    Swann: ["CommandCenterSwann", "SCVSwann", "UnfinishedDrakkenLaserDrillCoop"],
    Stetmann: ["HatcheryStetmann", "DroneStetmann", "GarysDen"],
  };

  add(specialStarts[commander] ?? specialStarts[runtimeCommanderName(commander)] ?? []);

  const userDataPath = path.join(options.modRoot, "Mods", "XM", "XMCore.SC2Mod", "Base.SC2Data", "GameData", "UserData.xml");
  const text = readText(userDataPath);
  const instance = findCommanderAchInstance(text, runtimeCommanderName(commander)) ?? findCommanderAchInstance(text, commander);
  if (instance) {
    for (const field of ["CommandCenter", "Worker", "SecondUnit"]) {
      const match = new RegExp(`<Unit\\b[^>]*\\bUnit="([^"]+)"[^>]*>\\s*<Field\\b[^>]*\\bId="${field}"`).exec(instance);
      add(match?.[1]);
    }
  }

  return startUnits;
}

function findCommanderAchInstance(text, commander) {
  if (!text || !commander) return "";
  const start = text.indexOf(`<Instances Id="${commander}"`);
  if (start < 0) return "";
  const end = text.indexOf("</Instances>", start);
  if (end < 0) return "";
  return text.slice(start, end + "</Instances>".length);
}

function activeUnitStatus(layeredIndex, ids) {
  const values = unique(ids);
  const exactHits = findCatalogHits(layeredIndex, "Unit", values);
  if (exactHits.length > 0) {
    return {
      level: primaryLevel(exactHits),
      text: groupHitText(exactHits, "CUnit"),
      files: hitFiles(exactHits),
    };
  }

  const tokenHits = findTokenHits(layeredIndex, values);
  if (tokenHits.length > 0) {
    return {
      level: "token",
      text: groupHitText(tokenHits, "仅引用"),
      files: "",
    };
  }

  return {
    level: "missing",
    text: values.length ? `未命中：${values.join(", ")}` : "无官方ID",
    files: "",
  };
}

function supportStatus(layeredIndex, kind, value, commander) {
  if (!value) return { level: "none", text: "" };
  const lookupValues = catalogLookupValues(commander, kind, value);
  const exactHits = findCatalogHits(layeredIndex, kind, lookupValues);
  if (exactHits.length > 0) {
    return {
      level: primaryLevel(exactHits),
      text: groupHitText(exactHits, kind === "Unit" ? "CUnit" : "CAbil"),
    };
  }
  const tokenHits = findTokenHits(layeredIndex, lookupValues);
  if (tokenHits.length > 0) {
    return {
      level: "token",
      text: groupHitText(tokenHits, "仅引用"),
    };
  }
  return { level: "missing", text: value };
}

function isRuntimeResolved(level) {
  return level === "active" || level === "shared" || level === "runtime" || level === "base" || level === "none";
}

function productionStatus(layeredIndex, production, commander) {
  if (!production) {
    return { level: "none", text: "官方JSON无生产链" };
  }
  const producer = firstText(production.producer_unit_id);
  const ability = firstText(production.ability_id, abilityIdFromCommand(production.abil_cmd));
  const producerSupport = supportStatus(layeredIndex, "Unit", producer, commander);
  const abilitySupport = supportStatus(layeredIndex, "Abil", ability, commander);
  const producerOk = isRuntimeResolved(producerSupport.level);
  const abilityOk = isRuntimeResolved(abilitySupport.level);
  const levels = [producerSupport.level, abilitySupport.level].filter((level) => level !== "none");
  if (producerOk && abilityOk) {
    if (levels.includes("base")) return { level: "base", text: "生产链在底层基础镜像命中，需实机确认 active 是否继承" };
    if (levels.includes("runtime")) return { level: "runtime", text: "生产链在 XMFinal 运行闭包命中" };
    return { level: "ok", text: "生产链已命中" };
  }
  if (levels.includes("missing")) {
    const parts = [
      producerSupport.level === "missing" ? `生产者缺失 ${producer}` : "",
      abilitySupport.level === "missing" ? `技能缺失 ${ability}` : "",
    ].filter(Boolean);
    if (parts.length === 2) return { level: "missing", text: `生产者和技能均未命中：${[producer, ability].filter(Boolean).join(" / ")}` };
    return { level: "partial", text: parts.join("；") };
  }
  if (levels.includes("official")) {
    const parts = [
      producerSupport.level === "official" ? `生产者仅在官方合作镜像：${producer}` : "",
      abilitySupport.level === "official" ? `技能仅在官方合作镜像：${ability}` : "",
    ].filter(Boolean);
    return { level: "official", text: parts.join("；") };
  }
  return { level: "partial", text: [producerSupport.text, abilitySupport.text].filter(Boolean).join("；") };
}

function scoreProductionOption(layeredIndex, option, commander, entry) {
  if (!option) return -Infinity;
  const producer = firstText(option.producer_unit_id);
  const ability = firstText(option.ability_id, abilityIdFromCommand(option.abil_cmd));
  const producerSupport = supportStatus(layeredIndex, "Unit", producer, commander);
  const abilitySupport = supportStatus(layeredIndex, "Abil", ability, commander);
  let score = 0;
  for (const level of [producerSupport.level, abilitySupport.level]) {
    if (level === "active") score += 50;
    else if (level === "shared") score += 35;
    else if (level === "runtime") score += 30;
    else if (level === "base") score += 15;
    else if (level === "official") score += 5;
    else if (level === "token") score += 1;
    else if (level === "missing") score -= 40;
  }

  const candidateIds = new Set(entry.candidateIds.map((id) => id.toLowerCase()));
  for (const produced of unique([option.unit, option.base_unit_id])) {
    const producedLower = produced.toLowerCase();
    if (candidateIds.has(producedLower)) score += 20;
    for (const alias of catalogAliases(commander, "Unit", produced)) {
      if (candidateIds.has(alias.toLowerCase())) score += 20;
    }
  }

  return score;
}

function bestProduction(entry, layeredIndex, commander) {
  const options = uniqueProductionOptions([entry.production, ...asArray(entry.production_options)]);
  if (options.length === 0) return null;
  const override = preferredProductionOverride(commander, entry);
  if (override) {
    const matched = options.find((option) => productionMatchesSelector(commander, entry, option, override));
    if (matched) return matched;
  }
  return options
    .map((option, index) => ({
      option,
      index,
      score: scoreProductionOption(layeredIndex, option, commander, entry),
    }))
    .sort((left, right) => right.score - left.score || left.index - right.index)[0].option;
}

function uniqueProductionOptions(options) {
  const result = [];
  const seen = new Set();
  for (const option of options.filter(Boolean)) {
    const key = [
      option.producer_unit_id,
      option.ability_id,
      option.abil_cmd,
      option.unit,
      option.button_face,
    ].map((value) => String(value ?? "")).join("|");
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(option);
  }
  return result;
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

function withProduction(entry, production) {
  return {
    ...entry,
    production,
  };
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

  const commanderSpecificFallback = wikiIdFallbacks.get(`${commander}|${label}`);
  if (commanderSpecificFallback) {
    return { type: "Wiki补充ID", entries: [makeSupplementalEntry(label, commanderSpecificFallback)] };
  }

  const fuzzy = entries.filter((entry) => {
    const entryName = normalizeName(entry.displayName);
    return entryName && normalized && (entryName.includes(normalized) || normalized.includes(entryName));
  });
  if (fuzzy.length > 0) {
    return { type: "疑似别名", entries: pickBestEntries(label, fuzzy) };
  }

  const fallback = wikiIdFallbacks.get(`*|${label}`);
  if (fallback) {
    return { type: "Wiki补充ID", entries: [makeSupplementalEntry(label, fallback)] };
  }

  return { type: "未匹配", entries: [] };
}

function makeSupplementalEntry(label, fallback) {
  const ids = unique(fallback.ids);
  return {
    commander: "",
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

function compareCommander(options, meta, modsXmRoot, commonRoots, officialLayers) {
  const wiki = loadWikiItems(options.wikiRoot, meta);
  const official = loadOfficialCommander(options.officialRoot, meta.commander);
  const officialEntries = [...official.heroes, ...official.units, ...official.buildings];
  const officialProducerIds = buildOfficialProducerIdSet(officialEntries);
  const startUnitIds = loadCommanderStartUnits(options, meta.commander);
  const nameIndex = buildNameIndex(officialEntries);
  const moduleName = commanderModuleName(meta.commander);
  const moduleRoot = path.join(modsXmRoot, moduleName);
  const runtimeRoots = options.runtimeRoots ?? [];
  const directActiveRoots = existingRoots([moduleRoot, ...commonRoots]);
  const runtimeOnlyRoots = excludeRoots(runtimeRoots, directActiveRoots);
  const layeredIndex = makeLayeredIndex([
    {
      level: "active",
      label: moduleName,
      index: buildModIndex(existingRoots([moduleRoot]), repoRoot),
    },
    {
      level: "shared",
      label: "XMCore/XMFinal",
      index: buildModIndex(commonRoots, repoRoot),
    },
    {
      level: "runtime",
      label: "XMFinal DocumentInfo闭包",
      index: buildModIndex(runtimeOnlyRoots, repoRoot),
    },
    ...officialLayers,
  ]);
  const activePanelRoots = existingRoots([...directActiveRoots, ...runtimeOnlyRoots]);
  const panelRefs = collectProductionUnitRefsFromRoots(activePanelRoots, {
    productRoots: existingRoots([...activePanelRoots, ...(options.panelReferenceRoots ?? [])]),
    layoutRoots: existingRoots([...activePanelRoots, ...(options.panelLayoutReferenceRoots ?? [])]),
  });

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
      entry.commander = meta.commander;
      const key = entryKey(entry);
      const row = makeOfficialRow(item, resolved.type, entry, layeredIndex, panelRefs);
      rows.push(row);
      rowByEntryKey.set(key, row);
    }
  }

  const officialOnly = [];
  for (const entry of officialEntries) {
    entry.commander = meta.commander;
    const key = entryKey(entry);
    if (rowByEntryKey.has(key)) continue;
    const row = makeOfficialRow("", "官方补充", entry, layeredIndex, panelRefs);
    rows.push(row);
    officialOnly.push(row);
  }

  const activeMissing = rows.filter((row) => row.activeLevel === "missing");
  const activeTokenOnly = rows.filter((row) => row.activeLevel === "token");
  const activeRuntimeResolved = rows.filter((row) => row.activeLevel === "runtime");
  const activeOfficialOnly = rows.filter((row) => row.activeLevel === "official");
  const activeBaseInherited = rows.filter((row) => row.activeLevel === "base");
  const productionProblems = rows.filter((row) => row.productionLevel === "missing" || row.productionLevel === "partial" || row.productionLevel === "official");
  const productionRuntimeResolved = rows.filter((row) => row.productionLevel === "runtime");
  const productionBaseInherited = rows.filter((row) => row.productionLevel === "base");
  const activePanelGaps = rows.filter((row) => row.activePanelLevel === "hidden" || row.activePanelLevel === "missing");
  const activePanelSpecials = rows.filter((row) => row.activePanelLevel === "special");
  const activeProductionGaps = activeProductionUnitGaps(layeredIndex, moduleRoot, officialProducerIds, startUnitIds);
  const activeHiddenProductionGaps = activeHiddenProductionUnitGaps(layeredIndex, moduleRoot, officialProducerIds, startUnitIds);
  const externalProductionRefs = activeExternalProductionRefs(layeredIndex, moduleRoot, officialProducerIds, startUnitIds);

  return {
    commander: meta.commander,
    zh: meta.zh,
    runtimeName: runtimeCommanderName(meta.commander),
    moduleName,
    moduleExists: fs.existsSync(moduleRoot),
    startUnits: [...startUnitIds],
    wikiFile: path.relative(options.wikiRoot, wiki.file).replace(/\\/g, "/"),
    wikiItems: wiki.items,
    rows,
    activePanelGaps,
    activePanelSpecials,
    activeProductionGaps,
    activeHiddenProductionGaps,
    activeExternalProductionRefs: externalProductionRefs,
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
      activeRuntimeResolved: activeRuntimeResolved.length,
      activeOfficialOnly: activeOfficialOnly.length,
      activeBaseInherited: activeBaseInherited.length,
      productionProblems: productionProblems.length,
      productionRuntimeResolved: productionRuntimeResolved.length,
      productionBaseInherited: productionBaseInherited.length,
      activePanelGaps: activePanelGaps.length,
      activePanelSpecials: activePanelSpecials.length,
      activeProductionGaps: activeProductionGaps.length,
      activeHiddenProductionGaps: activeHiddenProductionGaps.length,
      activeExternalProductionRefs: externalProductionRefs.length,
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

function makeOfficialRow(wikiLabel, matchType, entry, layeredIndex, activeRefs) {
  const active = activeUnitStatus(layeredIndex, entry.candidateIds);
  const productionEntry = withProduction(entry, bestProduction(entry, layeredIndex, entry.commander));
  const production = productionStatus(layeredIndex, productionEntry.production, entry.commander);
  const panel = activePanelStatusForProduction(activeRefs, entry.commander, entry, productionEntry.production);
  return {
    wiki: wikiLabel,
    matchType,
    kind: entry.kind,
    officialName: entry.displayName,
    officialId: firstText(entry.unit_id, entry.id),
    activeStatus: active.text,
    activeLevel: active.level,
    activeFiles: active.files,
    production: productionSummary(productionEntry),
    productionStatus: production.text,
    productionLevel: production.level,
    activePanelStatus: panel.text,
    activePanelLevel: panel.level,
    stats: statSummary(productionEntry),
    cost: resourceSummary(productionEntry),
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
  lines.push(`- 旧线初始化开局单位：${result.startUnits.join("、") || "未解析到"}`);
  lines.push(`- Wiki主要部队文件：\`${result.wikiFile}\``);
  lines.push(`- Wiki主要部队：${result.wikiItems.join("、") || "未提取到"}`);
  lines.push("- 判定口径：wiki用于中文主要部队名单；官方JSON用于ID、生产链、生命/人口/费用；active 侧先看本指挥官模块和 `XMCore/XMFinal`，再看 `XMFinal.SC2Mod/DocumentInfo` 实际运行闭包，最后只把官方镜像作为事实参考。");
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
    { title: "运行闭包命中", value: (row) => row.activeRuntimeResolved },
    { title: "仅官方合作镜像", value: (row) => row.activeOfficialOnly },
    { title: "底层继承候选", value: (row) => row.activeBaseInherited },
    { title: "生产链异常", value: (row) => row.productionProblems },
    { title: "生产链运行闭包", value: (row) => row.productionRuntimeResolved },
    { title: "生产链底层候选", value: (row) => row.productionBaseInherited },
    { title: "官方面板缺口", value: (row) => row.activePanelGaps },
    { title: "特殊面板项", value: (row) => row.activePanelSpecials },
    { title: "命令卡露出产物缺CUnit", value: (row) => row.activeProductionGaps },
    { title: "外来生产链露出", value: (row) => row.activeExternalProductionRefs },
  ]));
  lines.push("## 三方对照");
  lines.push("");
  lines.push(markdownTable(result.rows, rosterColumns()));

  const risky = result.rows.filter((row) => row.activeLevel === "missing" || row.activeLevel === "token" || row.activeLevel === "official" || row.productionLevel === "missing" || row.productionLevel === "partial" || row.productionLevel === "official" || row.activePanelLevel === "hidden" || row.activePanelLevel === "missing");
  lines.push("## 优先排查项");
  lines.push("");
  lines.push(markdownTable(risky, rosterColumns(true)));

  lines.push("## 官方生产面板缺口");
  lines.push("");
  lines.push("说明：按官方 JSON 的生产链，映射到当前指挥官别名后，再检查当前指挥官模块里是否存在同一 `AbilCmd` 的单位命令卡按钮。`当前技能有槽但面板未露出` 是斯旺工厂这类问题的专门口径。");
  lines.push("");
  lines.push(markdownTable(result.activePanelGaps, [
    { title: "Wiki项", value: (row) => row.wiki },
    { title: "分类", value: (row) => row.kind },
    { title: "官方名称", value: (row) => row.officialName },
    { title: "ID", value: (row) => row.officialId },
    { title: "生产/建造/变形", value: (row) => row.production },
    { title: "当前面板", value: (row) => row.activePanelStatus },
    { title: "数值", value: (row) => [row.stats, row.cost].filter(Boolean).join("；") },
  ]));

  lines.push("## 非缺口特殊机制");
  lines.push("");
  lines.push("说明：这些项来自官方 JSON/ArmyCategory/Catalog，但官方自身也不是普通玩家命令卡入口；保留说明，避免后续继续误补按钮。");
  lines.push("");
  lines.push(markdownTable(result.activePanelSpecials, [
    { title: "Wiki项", value: (row) => row.wiki },
    { title: "分类", value: (row) => row.kind },
    { title: "官方名称", value: (row) => row.officialName },
    { title: "ID", value: (row) => row.officialId },
    { title: "生产/建造/变形", value: (row) => row.production },
    { title: "判定", value: (row) => row.activePanelStatus },
  ]));

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

  lines.push("## 当前 active 命令卡露出产物缺 CUnit");
  lines.push("");
  lines.push("说明：只扫描当前指挥官模块里已挂到单位命令卡 `AbilCmd=\"技能,命令\"` 的 `CAbilTrain/CAbilWarpTrain/CAbilBuild/CAbilMorph` 产物。产物在当前模块、XM共享模块、XMFinal运行闭包和底层基础镜像都没有 `CUnit` 时列在这里；这类才是当前 Mod 玩家按钮链路的直接风险。XML 注释已在扫描前剔除。");
  lines.push("");
  lines.push(markdownTable(result.activeProductionGaps, [
    { title: "产物ID", value: (row) => row.unitId },
    { title: "命中状态", value: (row) => row.status },
    { title: "引用技能", value: (row) => row.abilities },
    { title: "露出命令", value: (row) => row.commands },
    { title: "生产者", value: (row) => row.producers },
    { title: "生产者归属", value: (row) => row.producerOfficialStatus },
    { title: "开局归属", value: (row) => row.producerStartStatus },
    { title: "按钮门槛", value: (row) => row.buttonRequirements || row.buttonStates },
    { title: "引用文件", value: (row) => row.files },
  ]));
  lines.push("## 当前 active 外来生产链露出");
  lines.push("");
  lines.push("说明：这些按钮的产物能在 XMFinal 运行闭包或官方合作镜像中解析，但生产者不属于该指挥官官方体系。它们不是“缺 CUnit”，更像跨指挥官命令卡污染或共享基础单位需要加选择门槛。");
  lines.push("");
  lines.push(markdownTable(result.activeExternalProductionRefs, [
    { title: "产物ID", value: (row) => row.unitId },
    { title: "命中状态", value: (row) => row.status },
    { title: "引用技能", value: (row) => row.abilities },
    { title: "露出命令", value: (row) => row.commands },
    { title: "生产者", value: (row) => row.producers },
    { title: "生产者归属", value: (row) => row.producerOfficialStatus },
    { title: "开局归属", value: (row) => row.producerStartStatus },
    { title: "按钮门槛", value: (row) => row.buttonRequirements || row.buttonStates },
    { title: "引用文件", value: (row) => row.files },
  ]));
  lines.push("## 当前 active 隐藏技能产物缺 CUnit");
  lines.push("");
  lines.push("说明：这些产物在当前模块的技能 `InfoArray` 中存在，但没有发现对应命令卡 `AbilCmd=\"技能,命令\"`。它们通常是旧官方/编辑器残留或未开放设计，默认不按玩家可点建筑按钮修。");
  lines.push("");
  lines.push(markdownTable(result.activeHiddenProductionGaps, [
    { title: "产物ID", value: (row) => row.unitId },
    { title: "命中状态", value: (row) => row.status },
    { title: "引用技能", value: (row) => row.abilities },
    { title: "未露出命令", value: (row) => row.commands },
    { title: "生产者", value: (row) => row.producers },
    { title: "生产者归属", value: (row) => row.producerOfficialStatus },
    { title: "开局归属", value: (row) => row.producerStartStatus },
    { title: "按钮门槛", value: (row) => row.buttonRequirements || row.buttonStates },
    { title: "引用文件", value: (row) => row.files },
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
    { title: "当前面板", value: (row) => row.activePanelStatus },
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
  lines.push(`- 官方原始文本镜像：\`${options.officialMirrorRoot}\``);
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
    { title: "运行闭包命中", value: (row) => row.summary.activeRuntimeResolved },
    { title: "仅官方合作镜像", value: (row) => row.summary.activeOfficialOnly },
    { title: "底层继承候选", value: (row) => row.summary.activeBaseInherited },
    { title: "生产链异常", value: (row) => row.summary.productionProblems },
    { title: "生产链运行闭包", value: (row) => row.summary.productionRuntimeResolved },
    { title: "生产链底层候选", value: (row) => row.summary.productionBaseInherited },
    { title: "官方面板缺口", value: (row) => row.summary.activePanelGaps },
    { title: "特殊面板项", value: (row) => row.summary.activePanelSpecials },
    { title: "命令卡露出产物缺CUnit", value: (row) => row.summary.activeProductionGaps },
    { title: "隐藏产物缺CUnit", value: (row) => row.summary.activeHiddenProductionGaps },
    { title: "外来生产链露出", value: (row) => row.summary.activeExternalProductionRefs },
    { title: "单独报告", value: (row) => `by-commander/${commanderFileName(row)}` },
  ]));
  lines.push("## 全局优先排查项");
  lines.push("");
  const riskyRows = [];
  for (const result of results) {
    for (const row of result.rows) {
      if (row.activeLevel === "missing" || row.activeLevel === "token" || row.activeLevel === "official" || row.productionLevel === "missing" || row.productionLevel === "partial" || row.productionLevel === "official" || row.activePanelLevel === "hidden" || row.activePanelLevel === "missing") {
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
    { title: "当前面板", value: (row) => row.activePanelStatus },
    { title: "生产/建造/变形", value: (row) => row.production },
    { title: "数值", value: (row) => [row.stats, row.cost].filter(Boolean).join("；") },
  ]));
  lines.push("## 官方生产面板缺口");
  lines.push("");
  const activePanelGapRows = [];
  for (const result of results) {
    for (const row of result.activePanelGaps) {
      activePanelGapRows.push({ commander: `${result.zh} / ${result.commander}`, ...row });
    }
  }
  lines.push(markdownTable(activePanelGapRows, [
    { title: "指挥官", value: (row) => row.commander },
    { title: "Wiki项", value: (row) => row.wiki },
    { title: "分类", value: (row) => row.kind },
    { title: "官方名称", value: (row) => row.officialName },
    { title: "ID", value: (row) => row.officialId },
    { title: "生产/建造/变形", value: (row) => row.production },
    { title: "当前面板", value: (row) => row.activePanelStatus },
    { title: "数值", value: (row) => [row.stats, row.cost].filter(Boolean).join("；") },
  ]));
  lines.push("## 非缺口特殊机制");
  lines.push("");
  const activePanelSpecialRows = [];
  for (const result of results) {
    for (const row of result.activePanelSpecials) {
      activePanelSpecialRows.push({ commander: `${result.zh} / ${result.commander}`, ...row });
    }
  }
  lines.push(markdownTable(activePanelSpecialRows, [
    { title: "指挥官", value: (row) => row.commander },
    { title: "Wiki项", value: (row) => row.wiki },
    { title: "分类", value: (row) => row.kind },
    { title: "官方名称", value: (row) => row.officialName },
    { title: "ID", value: (row) => row.officialId },
    { title: "生产/建造/变形", value: (row) => row.production },
    { title: "判定", value: (row) => row.activePanelStatus },
  ]));
  lines.push("## 当前 active 命令卡露出产物缺 CUnit");
  lines.push("");
  const activeProductionGapRows = [];
  for (const result of results) {
    for (const row of result.activeProductionGaps) {
      activeProductionGapRows.push({ commander: `${result.zh} / ${result.commander}`, ...row });
    }
  }
  lines.push(markdownTable(activeProductionGapRows, [
    { title: "指挥官", value: (row) => row.commander },
    { title: "产物ID", value: (row) => row.unitId },
    { title: "命中状态", value: (row) => row.status },
    { title: "引用技能", value: (row) => row.abilities },
    { title: "露出命令", value: (row) => row.commands },
    { title: "生产者", value: (row) => row.producers },
    { title: "生产者归属", value: (row) => row.producerOfficialStatus },
    { title: "开局归属", value: (row) => row.producerStartStatus },
    { title: "按钮门槛", value: (row) => row.buttonRequirements || row.buttonStates },
    { title: "引用文件", value: (row) => row.files },
  ]));
  lines.push("## 当前 active 外来生产链露出");
  lines.push("");
  const externalProductionRows = [];
  for (const result of results) {
    for (const row of result.activeExternalProductionRefs) {
      externalProductionRows.push({ commander: `${result.zh} / ${result.commander}`, ...row });
    }
  }
  lines.push(markdownTable(externalProductionRows, [
    { title: "指挥官", value: (row) => row.commander },
    { title: "产物ID", value: (row) => row.unitId },
    { title: "命中状态", value: (row) => row.status },
    { title: "引用技能", value: (row) => row.abilities },
    { title: "露出命令", value: (row) => row.commands },
    { title: "生产者", value: (row) => row.producers },
    { title: "生产者归属", value: (row) => row.producerOfficialStatus },
    { title: "开局归属", value: (row) => row.producerStartStatus },
    { title: "按钮门槛", value: (row) => row.buttonRequirements || row.buttonStates },
    { title: "引用文件", value: (row) => row.files },
  ]));
  lines.push("## 当前 active 隐藏技能产物缺 CUnit");
  lines.push("");
  const hiddenProductionGapRows = [];
  for (const result of results) {
    for (const row of result.activeHiddenProductionGaps) {
      hiddenProductionGapRows.push({ commander: `${result.zh} / ${result.commander}`, ...row });
    }
  }
  lines.push(markdownTable(hiddenProductionGapRows, [
    { title: "指挥官", value: (row) => row.commander },
    { title: "产物ID", value: (row) => row.unitId },
    { title: "命中状态", value: (row) => row.status },
    { title: "引用技能", value: (row) => row.abilities },
    { title: "未露出命令", value: (row) => row.commands },
    { title: "生产者", value: (row) => row.producers },
    { title: "生产者归属", value: (row) => row.producerOfficialStatus },
    { title: "开局归属", value: (row) => row.producerStartStatus },
    { title: "按钮门槛", value: (row) => row.buttonRequirements || row.buttonStates },
    { title: "引用文件", value: (row) => row.files },
  ]));
  lines.push("## 说明");
  lines.push("");
  lines.push("- `当前模块CUnit`：本指挥官模块直接定义，可信度最高。");
  lines.push("- `XM共享模块CUnit`：`XMCore/XMFinal` 定义，通常可被当前 active 线使用。");
  lines.push("- `XMFinal运行闭包CUnit`：从 `XMFinal.SC2Mod/DocumentInfo` 递归加载到的当前 active 模块，运行时可解析，但不代表该按钮属于当前指挥官。");
  lines.push("- `底层基础镜像CUnit`：新官方镜像的战役/多人基础层存在。当前 active 线是否继承要按地图/Mod依赖和实机确认。");
  lines.push("- `官方合作镜像CUnit`：StarCoop 官方合作层存在，但 `合作指挥官版起义狂潮` 不直接读取这个镜像；这类更像待迁移/待补 Catalog 或历史按钮线索。");
  lines.push("- `仅文本/引用命中`：XML/Galaxy 里出现过该 token，但没有同 ID `CUnit` 定义，通常要继续查依赖或补 Catalog。");
  lines.push("- `Wiki未匹配官方JSON`：wiki主要部队名称没有映射到官方 JSON，优先补别名表或查是否是召唤物/建筑别称。");
  lines.push("- `官方补充未在Wiki`：官方 JSON 有但 wiki主要部队未列，不一定是缺失，常见于工人、英雄、基础建筑或展示项。");
  return `${lines.join("\n")}\n`;
}

function gapSeverity(row) {
  if (row.level === "token") return 0;
  if (row.level === "missing") return 1;
  if (row.level === "official") return 2;
  return 3;
}

function formatTopGapList(rows, limit = 8) {
  const selected = rows.slice(0, limit);
  const text = selected.map((row) => `${row.unitId}（${row.abilities}）`).join("；");
  if (rows.length <= limit) return text;
  return `${text}；另 ${rows.length - limit} 项`;
}

function commanderConclusion(result) {
  const riskyRows = result.rows.filter((row) => row.activeLevel === "missing" || row.activeLevel === "token" || row.activeLevel === "official" || row.productionLevel === "missing" || row.productionLevel === "partial" || row.productionLevel === "official" || row.activePanelLevel === "hidden" || row.activePanelLevel === "missing");
  const currentOnlyGaps = result.activeProductionGaps.filter((row) => row.level === "token" || row.level === "missing");
  const officialOnlyGaps = result.activeProductionGaps.filter((row) => row.level === "official");
  const baseInheritedRows = result.rows.filter((row) => row.activeLevel === "base" || row.productionLevel === "base");
  const runtimeRows = result.rows.filter((row) => row.activeLevel === "runtime" || row.productionLevel === "runtime");

  const notes = [];
  if (result.summary.wikiUnmatched === 0 && result.summary.activeMissing === 0 && result.summary.activeTokenOnly === 0 && result.summary.activeOfficialOnly === 0) {
    notes.push("中文主名单已能映射到当前模块、XM共享、XMFinal运行闭包或底层基础 CUnit。");
  } else {
    notes.push("中文主名单仍有未闭合项，先看单独报告的“优先排查项”。");
  }
  if (riskyRows.length > 0) {
    notes.push(`主名单/官方补充优先项 ${riskyRows.length} 项。`);
  }
  if (currentOnlyGaps.length > 0) {
    notes.push(`当前 active 技能产物缺 CUnit ${currentOnlyGaps.length} 项：${formatTopGapList(currentOnlyGaps)}。`);
  }
  if (officialOnlyGaps.length > 0) {
    notes.push(`另有 ${officialOnlyGaps.length} 项产物只在官方合作镜像有 CUnit，需判定是污染按钮还是待迁移 Catalog。`);
  }
  if (runtimeRows.length > 0) {
    notes.push(`有 ${runtimeRows.length} 项通过 XMFinal 运行闭包解析，需继续确认是否属于当前指挥官可见链路。`);
  }
  if (result.summary.activeExternalProductionRefs > 0) {
    notes.push(`外来生产链露出 ${result.summary.activeExternalProductionRefs} 项，优先查命令卡门槛/开局来源。`);
  }
  if (baseInheritedRows.length > 0) {
    notes.push(`有 ${baseInheritedRows.length} 项依赖底层基础镜像，需用 DocumentInfo/实机确认继承。`);
  }
  if (result.summary.activeProductionGaps === 0 && riskyRows.length === 0) {
    notes.push("本轮静态建筑/单位入口未发现直接修复项。");
  }

  return notes.join(" ");
}

function renderPriorityReport(options, results) {
  const lines = [];
  lines.push("# 合作指挥官建筑单位逐个对比：修复优先级与排查入口");
  lines.push("");
  lines.push(`- 生成依据：\`commander-unit-building-wiki-vs-active-mod.md\``);
  lines.push(`- 明细目录：\`by-commander/\``);
  lines.push(`- 对比脚本：\`scripts/sc2/compare-wiki-commander-roster-vs-active-mod.mjs\``);
  lines.push(`- 当前实现目标：\`${options.modRoot}\``);
  lines.push(`- 官方事实源：\`${options.officialRoot}\`；闭包回查 \`${options.officialMirrorRoot}\``);
  lines.push(`- 运行闭包入口：\`${path.join(options.modRoot, "Mods", "XM", "XMFinal.SC2Mod", "DocumentInfo")}\``);
  lines.push("");
  lines.push("## 当前结论");
  lines.push("");
  lines.push("本轮对比口径已经切到新的官方原始文本镜像，旧 `references/*` 不再作为事实源。18 个指挥官的 wiki 中文主名单均已匹配到官方 JSON、补充 ID 或当前/底层 Catalog，没有剩余“中文名完全对不上”的项。");
  lines.push("");
  lines.push("当前最重要的区别是：主名单命中不等于 active 按钮链路闭合；单个指挥官模块缺 CUnit 也不等于运行时缺 CUnit。脚本现在会先按 `XMFinal.SC2Mod/DocumentInfo` 递归建立运行闭包，再判断按钮产物是否真的缺失。");
  lines.push("");
  lines.push("## 总体优先级");
  lines.push("");
  lines.push("1. 先修当前模块、XM共享、XMFinal运行闭包、底层基础镜像都没有的露出产物：按钮会直接训练、建造或变形到不存在的 CUnit。");
  lines.push("2. 再查“外来生产链露出”：产物能解析，但生产者不属于该指挥官官方体系，常见于 Nexus/Probe/SISCV 这类跨指挥官命令卡。");
  lines.push("3. 再处理只在官方合作镜像命中的项：这类通常是待迁移 Catalog、TopBar 召唤或官方 JSON 混入。");
  lines.push("4. 再确认底层基础镜像命中项：这类不一定错，但必须靠地图/Mod 依赖和实机按钮确认。");
  lines.push("5. 官方 JSON 有但 wiki 主名单未列的英雄、工人、基础建筑默认不按缺失修，除非当前按钮链路或开局实机证明缺。");
  lines.push("");

  const gapRows = [];
  for (const result of results) {
    for (const row of result.activeProductionGaps) {
      gapRows.push({
        commander: `${result.zh} / ${result.commander}`,
        report: `by-commander/${commanderFileName(result)}`,
        ...row,
      });
    }
  }
  const directGapRows = gapRows
    .filter((row) => row.level === "token" || row.level === "missing")
    .sort((left, right) => gapSeverity(left) - gapSeverity(right) || left.commander.localeCompare(right.commander, "zh-CN") || left.unitId.localeCompare(right.unitId, "en"));
  const officialGapRows = gapRows
    .filter((row) => row.level === "official")
    .sort((left, right) => left.commander.localeCompare(right.commander, "zh-CN") || left.unitId.localeCompare(right.unitId, "en"));

  lines.push("## 第一优先级：当前命令卡露出产物没有可运行 CUnit");
  lines.push("");
  lines.push(markdownTable(directGapRows, [
    { title: "指挥官", value: (row) => row.commander },
    { title: "产物ID", value: (row) => row.unitId },
    { title: "当前状态", value: (row) => row.status },
    { title: "引用技能", value: (row) => row.abilities },
    { title: "露出命令", value: (row) => row.commands },
    { title: "生产者", value: (row) => row.producers },
    { title: "生产者归属", value: (row) => row.producerOfficialStatus },
    { title: "开局归属", value: (row) => row.producerStartStatus },
    { title: "按钮门槛", value: (row) => row.buttonRequirements || row.buttonStates },
    { title: "入口报告", value: (row) => row.report },
  ]));

  lines.push("## 第二优先级：只在官方合作镜像有 CUnit 的露出产物");
  lines.push("");
  lines.push("这类不一定都要补。先判断当前指挥官模块为什么挂到了别的指挥官/官方 StarCoop 产物：如果是污染按钮就移除或改回本指挥官技能；如果确实是设计要用，就把必要 Catalog 迁到 `合作指挥官版起义狂潮`。注意：如果产物已在 XMFinal 运行闭包中命中，它不会进入本表，会进入“外来生产链露出”。");
  lines.push("");
  lines.push(markdownTable(officialGapRows, [
    { title: "指挥官", value: (row) => row.commander },
    { title: "产物ID", value: (row) => row.unitId },
    { title: "当前状态", value: (row) => row.status },
    { title: "引用技能", value: (row) => row.abilities },
    { title: "露出命令", value: (row) => row.commands },
    { title: "生产者", value: (row) => row.producers },
    { title: "生产者归属", value: (row) => row.producerOfficialStatus },
    { title: "开局归属", value: (row) => row.producerStartStatus },
    { title: "按钮门槛", value: (row) => row.buttonRequirements || row.buttonStates },
    { title: "入口报告", value: (row) => row.report },
  ]));

  const specialPanelRows = [];
  for (const result of results) {
    for (const row of result.activePanelSpecials) {
      specialPanelRows.push({
        commander: `${result.zh} / ${result.commander}`,
        report: `by-commander/${commanderFileName(result)}`,
        ...row,
      });
    }
  }
  lines.push("## 非缺口特殊机制");
  lines.push("");
  lines.push("这些项来自官方 JSON/ArmyCategory/Catalog，但官方自身也不是普通玩家命令卡入口；保留说明，避免后续误补按钮。");
  lines.push("");
  lines.push(markdownTable(specialPanelRows, [
    { title: "指挥官", value: (row) => row.commander },
    { title: "Wiki项", value: (row) => row.wiki },
    { title: "分类", value: (row) => row.kind },
    { title: "官方名称", value: (row) => row.officialName },
    { title: "ID", value: (row) => row.officialId },
    { title: "生产/建造/变形", value: (row) => row.production },
    { title: "判定", value: (row) => row.activePanelStatus },
    { title: "入口报告", value: (row) => row.report },
  ]));

  const externalProductionRows = [];
  for (const result of results) {
    for (const row of result.activeExternalProductionRefs) {
      externalProductionRows.push({
        commander: `${result.zh} / ${result.commander}`,
        report: `by-commander/${commanderFileName(result)}`,
        ...row,
      });
    }
  }
  lines.push("## 第二优先级补充：外来生产链露出");
  lines.push("");
  lines.push("这些项不是缺 CUnit。它们的产物已经能在 XMFinal 运行闭包或官方合作镜像中解析，但生产者不属于当前指挥官官方数据，下一步应查按钮是否会在当前指挥官实机可见，以及 requirement 是否缺少指挥官门槛。");
  lines.push("");
  lines.push(markdownTable(externalProductionRows, [
    { title: "指挥官", value: (row) => row.commander },
    { title: "产物ID", value: (row) => row.unitId },
    { title: "当前状态", value: (row) => row.status },
    { title: "引用技能", value: (row) => row.abilities },
    { title: "露出命令", value: (row) => row.commands },
    { title: "生产者", value: (row) => row.producers },
    { title: "生产者归属", value: (row) => row.producerOfficialStatus },
    { title: "开局归属", value: (row) => row.producerStartStatus },
    { title: "按钮门槛", value: (row) => row.buttonRequirements || row.buttonStates },
    { title: "入口报告", value: (row) => row.report },
  ]));

  const hiddenGapRows = [];
  for (const result of results) {
    for (const row of result.activeHiddenProductionGaps) {
      hiddenGapRows.push({
        commander: `${result.zh} / ${result.commander}`,
        report: `by-commander/${commanderFileName(result)}`,
        ...row,
      });
    }
  }
  lines.push("## 降级线索：技能里存在但命令卡未露出的产物");
  lines.push("");
  lines.push("这些项暂不按玩家可点建筑按钮修。只有当实机、触发器或上级命令卡证明它们会被调用时，才提升为修复项。");
  lines.push("");
  lines.push(markdownTable(hiddenGapRows, [
    { title: "指挥官", value: (row) => row.commander },
    { title: "产物ID", value: (row) => row.unitId },
    { title: "当前状态", value: (row) => row.status },
    { title: "引用技能", value: (row) => row.abilities },
    { title: "未露出命令", value: (row) => row.commands },
    { title: "生产者", value: (row) => row.producers },
    { title: "生产者归属", value: (row) => row.producerOfficialStatus },
    { title: "开局归属", value: (row) => row.producerStartStatus },
    { title: "按钮门槛", value: (row) => row.buttonRequirements || row.buttonStates },
    { title: "入口报告", value: (row) => row.report },
  ]));

  const riskyRows = [];
  for (const result of results) {
    for (const row of result.rows) {
      if (row.activeLevel === "missing" || row.activeLevel === "token" || row.activeLevel === "official" || row.productionLevel === "missing" || row.productionLevel === "partial" || row.productionLevel === "official") {
        riskyRows.push({ commander: `${result.zh} / ${result.commander}`, report: `by-commander/${commanderFileName(result)}`, ...row });
      }
    }
  }
  lines.push("## 第三优先级：主名单或官方补充生产链疑点");
  lines.push("");
  lines.push(markdownTable(riskyRows, [
    { title: "指挥官", value: (row) => row.commander },
    { title: "Wiki项", value: (row) => row.wiki || "官方补充" },
    { title: "官方名称", value: (row) => row.officialName },
    { title: "ID", value: (row) => row.officialId },
    { title: "当前Mod", value: (row) => row.activeStatus },
    { title: "生产链状态", value: (row) => row.productionStatus },
    { title: "生产/建造/变形", value: (row) => row.production },
    { title: "入口报告", value: (row) => row.report },
  ]));

  lines.push("## 逐指挥官接手结论");
  lines.push("");
  lines.push(markdownTable(results, [
    { title: "指挥官", value: (row) => `${row.zh} / ${row.commander}` },
    { title: "当前结论", value: (row) => commanderConclusion(row) },
    { title: "入口报告", value: (row) => `by-commander/${commanderFileName(row)}` },
  ]));

  lines.push("## 下一步建议");
  lines.push("");
  lines.push("1. 先看“命令卡露出产物缺 CUnit”：这是最接近实机按钮风险的静态入口。");
  lines.push("2. 建筑专项优先查露出命令里 `Build*` 的项；隐藏 `Build*` 只保留在降级线索，不要盲目补建筑。");
  lines.push("3. `InfoArray` 有但命令卡未露出的典型例子包括斯旺/诺娃的富矿精炼厂、轰炸平台残留，以及霍纳与汉的旧炮塔/科学设施残留。");
  lines.push("4. 斯托科夫 `SIBarracksUpgradeToLevel2` 此前命中来自 XML 注释，当前脚本已剔除注释后再扫描。");
  lines.push("5. 官方镜像只说明“官方曾有该 Catalog”，不代表 active 线会读取；当前 active 线先以 `XMFinal.SC2Mod/DocumentInfo` 运行闭包为准。");
  lines.push("");
  lines.push("## XML 排查路线");
  lines.push("");
  lines.push("每个指挥官按这个顺序查，不要只看静态 `CUnit`：");
  lines.push("");
  lines.push("1. `UnitData.xml` 是否有目标 `CUnit`。");
  lines.push("2. 生产者 `CUnit` 是否存在，且是否挂了对应 `AbilArray`。");
  lines.push("3. 命令卡 `CardLayouts` 是否露出对应 `AbilCmd`。");
  lines.push("4. `AbilData.xml` 的 `InfoArray` 产物是否指向存在的 `CUnit`。");
  lines.push("5. 官方镜像只作为事实参考；最终修复落到 `合作指挥官版起义狂潮/Mods/XM/<Commander>.SC2Mod`。");
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
  const priorityPath = path.join(options.outputDir, "修复优先级与排查入口.md");
  fs.writeFileSync(indexPath, renderIndexReport(options, results), "utf8");
  fs.writeFileSync(jsonPath, `${JSON.stringify({ generated_at: new Date().toISOString(), options, results }, null, 2)}\n`, "utf8");
  fs.writeFileSync(priorityPath, renderPriorityReport(options, results), "utf8");
  return { indexPath, jsonPath, priorityPath, byCommanderDir };
}

function selectedMeta(commanders) {
  if (!commanders?.length) return commanderMeta;
  const selected = new Set(commanders);
  return commanderMeta.filter((meta) => selected.has(meta.commander) || selected.has(meta.zh));
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  assertDirectory(options.officialRoot, "Official commanders");
  assertDirectory(options.officialMirrorRoot, "Official SC2 raw text mirror");
  assertDirectory(options.modRoot, "Active mod root");
  assertDirectory(options.wikiRoot, "Wiki artifact root");
  const modsXmRoot = path.join(options.modRoot, "Mods", "XM");
  assertDirectory(modsXmRoot, "Active mod Mods/XM");
  const commonRoots = [path.join(modsXmRoot, "XMCore.SC2Mod"), path.join(modsXmRoot, "XMFinal.SC2Mod")].filter(fs.existsSync);
  const xmFinalRoot = path.join(modsXmRoot, "XMFinal.SC2Mod");
  options.runtimeRoots = documentDependencyClosure(options.modRoot, xmFinalRoot);
  const officialRoots = catalogLayerRoots(options.officialMirrorRoot);
  options.panelReferenceRoots = existingRoots([...officialRoots.officialCoop, ...officialRoots.officialBase]);
  options.panelLayoutReferenceRoots = existingRoots(officialRoots.officialBase);
  const officialLayers = [
    {
      level: "base",
      label: "官方底层基础 Catalog",
      index: buildModIndex(existingRoots(officialRoots.officialBase), repoRoot),
    },
    {
      level: "official",
      label: "官方 StarCoop Catalog",
      index: buildModIndex(existingRoots(officialRoots.officialCoop), repoRoot),
    },
  ];
  const metas = selectedMeta(options.commanders);
  if (metas.length === 0) throw new Error("No commanders selected");

  const results = metas.map((meta) => compareCommander(options, meta, modsXmRoot, commonRoots, officialLayers));
  const outputs = writeReports(options, results);
  console.log(`Wrote Markdown: ${outputs.indexPath}`);
  console.log(`Wrote JSON: ${outputs.jsonPath}`);
  console.log(`Wrote priority report: ${outputs.priorityPath}`);
  console.log(`Wrote per-commander reports: ${outputs.byCommanderDir}`);
}

main();
