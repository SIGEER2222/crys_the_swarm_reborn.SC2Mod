import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "../..");
const today = new Date().toISOString().slice(0, 10);

const commanderModuleOverrides = new Map([
  ["Horner", "XMMira.SC2Mod"],
]);

const runtimeNameOverrides = new Map([
  ["Horner", "Mira"],
]);

const misattributedCommanderAbilityFilters = [
  {
    commander: "Kerrigan",
    unitId: "Zergling",
    faceIds: ["ZagaraVoidCoopZerglingDodge", "Baneling"],
    abilityIds: ["MorphZerglingToBaneling", "MorphToBaneling"],
    requirementIds: ["HaveMasteryZagaraZerglingDodgeChance"],
  },
  {
    commander: "Stukov",
    unitId: "Zergling",
    faceIds: ["ZagaraVoidCoopZerglingDodge", "Baneling"],
    abilityIds: ["MorphZerglingToBaneling", "MorphToBaneling"],
    requirementIds: ["HaveMasteryZagaraZerglingDodgeChance"],
  },
  {
    commander: "Abathur",
    unitId: "Mutalisk",
    faceIds: ["StukovInfestedWildMutation"],
    abilityIds: ["StukovInfestedWildMutation"],
  },
  {
    commander: "Artanis",
    unitId: "ImmortalAiur",
    faceIds: ["ShadowCannonLocked", "ImmortalShakurasShadowCannon"],
    abilityIds: ["ImmortalShakurasShadowCannon"],
    requirementIds: ["KaraxLevel09"],
  },
  {
    commander: "Fenix",
    unitId: "ColossusPurifier",
    faceIds: ["ExtendedThermalLance"],
    requirementIds: ["HaveKaraxExtendedThermalLance"],
  },
  {
    commander: "Fenix",
    unitId: "ZealotPurifier",
    faceIds: ["ReconstructionLocked"],
    requirementIds: ["KaraxLevel04", "ZealotPurifierReviveKaraxHide"],
  },
  {
    commander: "Karax",
    unitId: "Scout",
    faceIds: ["HaveFenixScoutWeaponRange"],
    requirementIds: ["HaveFenixScoutWeaponRange"],
  },
  {
    commander: "Raynor",
    unitId: "SiegeTank",
    faceIds: ["CommanderSwannImmortalityProtocol"],
    requirementIds: ["HaveSwannCommanderImmortalityProtocol"],
  },
  {
    commander: "Swann",
    unitId: "SCV",
    faceIds: ["BuildFusionCoreLocked"],
    requirementIds: ["RaynorLevel06"],
  },
  {
    commander: "Swann",
    unitId: "SiegeTank",
    faceIds: ["AfterburnersLocked"],
    requirementIds: ["RaynorLevel11"],
  },
  {
    commander: "Vorazun",
    unitId: "Stalker",
    faceIds: ["AlarakStalkerPhasingArmor", "CommanderPrestigeAlarakMechBuff"],
    requirementIds: ["HaveAlarakStalkerPhasingArmor", "CommanderPrestigeAlarakMech"],
  },
  {
    commander: "Vorazun",
    unitId: "Zealot",
    faceIds: ["WhirlwindLocked"],
    requirementIds: ["ArtanisLevel04"],
  },
];

function parseArgs(argv) {
  const options = {
    officialRoot: path.join(repoRoot, "游戏数据", "官方合作指挥官", "commanders"),
    modRoot: path.join(repoRoot, "合作指挥官版起义狂潮"),
    outputDir: path.join(repoRoot, "docs", "每日进度", `${today}-官方与Mod单位建筑技能人类可读对照`),
    commanders: null,
  };

  for (let index = 0; index < argv.length; index++) {
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
  node scripts/sc2/export-official-vs-mod-readable-report.mjs [options]

作用：
  导出给人看的官方合作指挥官 vs 当前 Mod 内容对照表。
  报告按指挥官列出英雄技能、作战单位、建筑，并尽量使用官方 JSON 中的中文名。

参数：
  --official-root <path>  官方指挥官 JSON 根目录
  --mod-root <path>       包含 Mods/XM 的 Mod 根目录
  --output-dir <path>     报告输出目录
  --commanders <A,B,C>    只导出指定指挥官

示例：
  node scripts/sc2/export-official-vs-mod-readable-report.mjs
  node scripts/sc2/export-official-vs-mod-readable-report.mjs --commanders Kerrigan
`);
}

function assertDirectory(dir, label) {
  if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) {
    throw new Error(`${label} directory not found: ${dir}`);
  }
}

function readJson(file) {
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  return raw.trim() ? JSON.parse(raw) : null;
}

function asArray(value) {
  if (value == null) return [];
  return Array.isArray(value) ? value : [value];
}

function getCommanderModuleName(commander) {
  return commanderModuleOverrides.get(commander) ?? `XM${commander}.SC2Mod`;
}

function getRuntimeCommanderName(commander) {
  return runtimeNameOverrides.get(commander) ?? commander;
}

function listFiles(root) {
  const result = [];
  if (!fs.existsSync(root)) return result;
  const stack = [root];
  while (stack.length > 0) {
    const current = stack.pop();
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) stack.push(full);
      else if (entry.isFile()) result.push(full);
    }
  }
  return result;
}

function shouldScan(file) {
  const ext = path.extname(file).toLowerCase();
  return ext === ".xml" || ext === ".galaxy" || ext === ".txt" || ext === "";
}

function buildModIndex(roots) {
  const tokens = new Set();
  const catalog = {
    Unit: new Set(),
    Abil: new Set(),
    Button: new Set(),
    Upgrade: new Set(),
    Requirement: new Set(),
    User: new Set(),
  };
  const tokenRegex = /[A-Za-z_][A-Za-z0-9_]{2,}/g;
  const catalogRegex = /<(C[A-Za-z0-9_]+)\b([^>]*)/g;
  for (const root of roots) {
    for (const file of listFiles(root)) {
      if (!shouldScan(file)) continue;
      const text = fs.readFileSync(file, "utf8");
      for (const match of text.matchAll(tokenRegex)) {
        tokens.add(match[0].toLowerCase());
      }
      if (path.extname(file).toLowerCase() === ".xml") {
        for (const match of text.matchAll(catalogRegex)) {
          const id = /\bid="([^"]+)"/.exec(match[2])?.[1];
          const kind = catalogKind(match[1]);
          if (id && kind) catalog[kind].add(id.toLowerCase());
        }
      }
    }
  }
  return { tokens, catalog };
}

function catalogKind(tag) {
  if (tag === "CUnit") return "Unit";
  if (tag.startsWith("CAbil")) return "Abil";
  if (tag === "CButton") return "Button";
  if (tag === "CUpgrade") return "Upgrade";
  if (tag === "CRequirement") return "Requirement";
  if (tag === "CUser") return "User";
  return null;
}

function hasToken(index, value) {
  return Boolean(value) && index.tokens.has(String(value).toLowerCase());
}

function hasCatalog(index, kind, value) {
  return Boolean(value) && index.catalog[kind]?.has(String(value).toLowerCase());
}

function hitStatus(index, ids) {
  const values = [...new Set(asArray(ids).filter(Boolean).map(String))];
  const hit = values.filter((id) => hasToken(index, id));
  if (values.length === 0) return { status: "无 ID", hit, missing: values };
  if (hit.length === values.length) return { status: "已命中", hit, missing: [] };
  if (hit.length > 0) return { status: "部分命中", hit, missing: values.filter((id) => !hit.includes(id)) };
  return { status: "未命中", hit: [], missing: values };
}

function formatStatus(status) {
  if (status.status === "已命中") return "已命中";
  if (status.status === "部分命中") return `部分命中：${status.hit.join(", ")}`;
  if (status.status === "未命中") return "未命中";
  return status.status;
}

function unitStatus(index, ids) {
  const values = [...new Set(asArray(ids).filter(Boolean).map(String))];
  const catalogHits = values.filter((id) => hasCatalog(index, "Unit", id));
  if (catalogHits.length > 0) return `单位已定义：${catalogHits.join(", ")}`;
  return formatStatus(hitStatus(index, values));
}

function abilityStatus(index, ability) {
  const abilityId = abilityIdFromCommand(ability.abil_cmd);
  const face = ability.face ?? "";
  if (hasCatalog(index, "Abil", abilityId)) return `技能已定义：${abilityId}`;
  if (hasCatalog(index, "Button", face)) return `按钮已定义：${face}`;
  const status = hitStatus(index, [face, abilityId, ability.requirements].filter(Boolean));
  if (status.status === "已命中" || status.status === "部分命中") return formatStatus(status);
  return "未命中";
}

function productionStatus(index, production) {
  if (!production) return "无生产信息";
  const producer = production.producer_unit_id;
  const abilityId = firstText(production.ability_id, abilityIdFromCommand(production.abil_cmd));
  const producerOk = hasCatalog(index, "Unit", producer) || hasToken(index, producer);
  const abilityOk = hasCatalog(index, "Abil", abilityId) || hasToken(index, abilityId);
  if (producerOk && abilityOk) return "生产链已命中";
  if (producerOk || abilityOk) return `部分命中：${[producerOk ? producer : "", abilityOk ? abilityId : ""].filter(Boolean).join(", ")}`;
  return "未命中";
}

function firstText(...values) {
  for (const value of values) {
    if (value != null && String(value).trim()) return String(value).trim();
  }
  return "";
}

function abilityIdFromCommand(abilCmd) {
  if (!abilCmd) return "";
  return String(abilCmd).split(",")[0];
}

function shortText(value, max = 48) {
  const text = String(value ?? "").replace(/\s+/g, " ").trim();
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1)}…`;
}

function productionSummary(entry) {
  const production = entry?.production;
  if (!production) return "";
  const producer = firstText(production.producer_unit_id, "未知来源");
  const ability = firstText(production.ability_id, production.abil_cmd);
  const cost = [
    production.minerals ? `${production.minerals}晶体矿` : "",
    production.vespene ? `${production.vespene}瓦斯` : "",
    production.time ? `${production.time}秒` : "",
  ].filter(Boolean).join("，");
  return [producer, ability, cost].filter(Boolean).join(" / ");
}

function loadCommanderData(commanderDir) {
  const commandCards = asArray(readJson(path.join(commanderDir, "command_cards.json")));
  const cardByUnit = new Map(commandCards.map((entry) => [entry.unit_id, entry]));
  return {
    commander: readJson(path.join(commanderDir, "commander.json")),
    heroes: asArray(readJson(path.join(commanderDir, "heroes.json"))),
    units: asArray(readJson(path.join(commanderDir, "units.json"))),
    buildings: asArray(readJson(path.join(commanderDir, "buildings.json"))),
    cardByUnit,
  };
}

function findButton(cardByUnit, unitId, face, abilCmd) {
  const card = cardByUnit.get(unitId);
  for (const group of asArray(card?.cards)) {
    for (const button of asArray(group?.buttons)) {
      if ((face && button.face === face) || (abilCmd && button.abil_cmd === abilCmd)) {
        return button;
      }
    }
  }
  return null;
}

function matchesAny(values, value) {
  return Array.isArray(values) && values.includes(value);
}

function isMisattributedCommanderAbility(commander, unitId, ability) {
  const face = String(ability.face ?? "");
  const abilityId = abilityIdFromCommand(ability.abil_cmd);
  const requirementId = String(ability.requirements ?? "");
  return misattributedCommanderAbilityFilters.some((filter) =>
    filter.commander === commander
    && filter.unitId === unitId
    && (
      matchesAny(filter.faceIds, face)
      || matchesAny(filter.abilityIds, abilityId)
      || matchesAny(filter.requirementIds, requirementId)
    ));
}

function renderAbilityRows(commander, hero, cardByUnit, index) {
  const rows = [];
  for (const ability of asArray(hero.abilities)) {
    if (isMisattributedCommanderAbility(commander, hero.unit_id, ability)) {
      continue;
    }
    const button = findButton(cardByUnit, hero.unit_id, ability.face, ability.abil_cmd);
    const abilityId = abilityIdFromCommand(ability.abil_cmd);
    const name = firstText(ability.name, button?.button?.name, ability.face, abilityId);
    const tooltip = firstText(ability.tooltip, button?.button?.tooltip);
    rows.push({
      name,
      face: ability.face ?? "",
      abilityId,
      type: firstText(ability.type, "未知"),
      requirement: ability.requirements ?? "",
      status: abilityStatus(index, ability),
      tooltip: shortText(tooltip, 64),
    });
  }
  return rows;
}

function renderUnitRows(entries, index) {
  return entries.map((entry) => {
    const ids = [entry.unit_id];
    return {
      name: firstText(entry.name, entry.id, entry.unit_id),
      id: entry.unit_id ?? "",
      status: unitStatus(index, ids),
      production: productionSummary(entry),
      productionStatus: productionStatus(index, entry.production),
      life: entry.unit?.life ?? "",
      supply: entry.unit?.supply_cost ?? "",
    };
  });
}

function pushTable(lines, headers, rows) {
  lines.push(`| ${headers.join(" | ")} |`);
  lines.push(`| ${headers.map(() => "---").join(" | ")} |`);
  for (const row of rows) {
    lines.push(`| ${headers.map((header) => escapeCell(row[header] ?? "")).join(" | ")} |`);
  }
}

function escapeCell(value) {
  return String(value).replace(/\r?\n/g, "<br>").replace(/\|/g, "\\|");
}

function renderReport(options, commanders, modsXmRoot) {
  const commonRoots = [path.join(modsXmRoot, "XMCore.SC2Mod"), path.join(modsXmRoot, "XMFinal.SC2Mod")].filter(fs.existsSync);
  const lines = [];
  lines.push("# 官方与当前 Mod 单位/建筑/英雄技能对照");
  lines.push("");
  lines.push(`- 生成时间：${new Date().toLocaleString("zh-CN", { hour12: false })}`);
  lines.push(`- 官方数据：\`${options.officialRoot}\``);
  lines.push(`- Mod 数据：\`${options.modRoot}\``);
  lines.push("- 状态说明：`单位已定义`/`技能已定义` 表示当前 Mod XML 里有同 ID Catalog；`已命中`/`部分命中` 只表示文本引用存在，仍需进游戏或继续读 Catalog 链确认实际效果。");
  lines.push("");

  for (const commander of commanders) {
    const commanderDir = path.join(options.officialRoot, commander);
    const moduleName = getCommanderModuleName(commander);
    const moduleRoot = path.join(modsXmRoot, moduleName);
    const scanRoots = [moduleRoot, ...commonRoots].filter(fs.existsSync);
    const modIndex = buildModIndex(scanRoots);
    const data = loadCommanderData(commanderDir);

    lines.push(`## ${commander} / ${getRuntimeCommanderName(commander)}`);
    lines.push("");
    lines.push(`- 模块：\`${moduleName}\``);
    lines.push(`- 模块存在：${fs.existsSync(moduleRoot) ? "是" : "否"}`);
    lines.push("");

    lines.push("### 英雄单位与技能");
    if (data.heroes.length === 0) {
      lines.push("");
      lines.push("- 官方 JSON 未列出英雄单位。");
    }
    for (const hero of data.heroes) {
      const heroStatus = unitStatus(modIndex, [hero.unit_id, ...asArray(hero.resolved_unit_ids)]);
      lines.push("");
      lines.push(`#### ${firstText(hero.name, hero.unit_id)}（\`${hero.unit_id}\`）`);
      lines.push("");
      lines.push(`- 英雄状态：${heroStatus}`);
      lines.push(`- 生命/护盾：${firstText(hero.unit?.life, "?")} / ${firstText(hero.unit?.shields, "0")}`);
      lines.push("");
      const abilityRows = renderAbilityRows(commander, hero, data.cardByUnit, modIndex).map((row) => ({
        "官方技能": row.name,
        "按钮/技能ID": [row.face, row.abilityId].filter(Boolean).join(" / "),
        "类型": row.type,
        "需求": row.requirement,
        "当前 Mod": row.status,
        "说明": row.tooltip,
      }));
      pushTable(lines, ["官方技能", "按钮/技能ID", "类型", "需求", "当前 Mod", "说明"], abilityRows);
    }

    lines.push("");
    lines.push("### 作战单位");
    const unitRows = renderUnitRows(data.units, modIndex).map((row) => ({
      "单位": row.name,
      "ID": row.id,
      "当前 Mod": row.status,
      "生产/变形来源": row.production,
      "生产链": row.productionStatus,
      "生命": row.life,
      "人口": row.supply,
    }));
    pushTable(lines, ["单位", "ID", "当前 Mod", "生产/变形来源", "生产链", "生命", "人口"], unitRows);

    lines.push("");
    lines.push("### 建筑");
    const buildingRows = renderUnitRows(data.buildings, modIndex).map((row) => ({
      "建筑": row.name,
      "ID": row.id,
      "当前 Mod": row.status,
      "建造来源": row.production,
      "建造链": row.productionStatus,
      "生命": row.life,
    }));
    pushTable(lines, ["建筑", "ID", "当前 Mod", "建造来源", "建造链", "生命"], buildingRows);
    lines.push("");
  }

  return `${lines.join("\r\n")}\r\n`;
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  assertDirectory(options.officialRoot, "Official commanders");
  assertDirectory(options.modRoot, "Mod root");
  const modsXmRoot = path.join(options.modRoot, "Mods", "XM");
  assertDirectory(modsXmRoot, "Mods/XM");

  let commanders = options.commanders;
  if (!commanders || commanders.length === 0) {
    commanders = fs.readdirSync(options.officialRoot, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .sort((a, b) => a.localeCompare(b));
  }

  fs.mkdirSync(options.outputDir, { recursive: true });
  const report = renderReport(options, commanders, modsXmRoot);
  const reportPath = path.join(options.outputDir, "official-vs-mod-readable-units-buildings-hero-skills.md");
  fs.writeFileSync(reportPath, report, "utf8");
  console.log(`Wrote Markdown: ${reportPath}`);
}

main();
