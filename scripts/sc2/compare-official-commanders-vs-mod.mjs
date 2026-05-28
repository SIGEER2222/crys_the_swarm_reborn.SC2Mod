import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Compare scraped official coop commander JSON against the current XM mod.
 *
 * Inputs:
 * - Official side: 游戏数据/官方合作指挥官/commanders/<Commander>/*.json
 * - Mod side: 合作指挥官版起义狂潮/Mods/XM/XM<Commander>.SC2Mod
 * - Shared mod side: XMCore.SC2Mod and XMFinal.SC2Mod are scanned for every commander.
 *
 * Comparison scope:
 * - Extract official IDs from units, buildings, heroes, upgrades, progression,
 *   prestiges, and command_cards JSON.
 * - Check whether those IDs are mentioned in the commander's module plus shared modules.
 * - Optionally parse mod XML Catalog IDs with --include-catalog-diff.
 *
 * Important limitation:
 * This is an ID coverage/audit tool, not a semantic gameplay equivalence checker.
 * A missing ID can mean "not implemented", "renamed/mapped manually", or
 * "implemented through a different runtime path". Use the JSON details as a
 * triage list before making gameplay conclusions.
 */

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "../..");
const today = new Date().toISOString().slice(0, 10);

const commanderModuleOverrides = new Map([
  // Official Horner data maps to the current XMMira module name in this mod.
  ["Horner", "XMMira.SC2Mod"],
]);

const runtimeNameOverrides = new Map([
  ["Horner", "Mira"],
]);

const idKinds = [
  "units",
  "buildings",
  "heroes",
  "upgrades",
  "abilities",
  "buttons",
  "prestiges",
  "commander_perks",
];

function parseArgs(argv) {
  const options = {
    officialRoot: path.join(repoRoot, "游戏数据", "官方合作指挥官", "commanders"),
    modRoot: path.join(repoRoot, "合作指挥官版起义狂潮"),
    outputDir: path.join(repoRoot, "docs", "每日进度", `${today}-官方指挥官与mod差异对比`),
    commanders: null,
    includeCatalogDiff: false,
  };

  for (let index = 0; index < argv.length; index++) {
    const arg = argv[index];
    const next = () => {
      index += 1;
      if (index >= argv.length) {
        throw new Error(`Missing value for ${arg}`);
      }
      return argv[index];
    };

    if (arg === "--official-root") {
      options.officialRoot = path.resolve(next());
    } else if (arg === "--mod-root") {
      options.modRoot = path.resolve(next());
    } else if (arg === "--output-dir") {
      options.outputDir = path.resolve(next());
    } else if (arg === "--commanders") {
      options.commanders = next()
        .split(",")
        .map((value) => value.trim())
        .filter(Boolean);
    } else if (arg === "--include-catalog-diff") {
      options.includeCatalogDiff = true;
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
  node scripts/sc2/compare-official-commanders-vs-mod.mjs [options]

作用：
  按指挥官对比官方合作指挥官 JSON 与当前 Mod 的 ID 覆盖差异。
  默认输出 Markdown 汇总和 JSON 明细。

默认路径：
  官方数据：游戏数据/官方合作指挥官/commanders
  Mod 数据：合作指挥官版起义狂潮
  输出目录：docs/每日进度/<yyyy-MM-dd>-官方指挥官与mod差异对比

对比口径：
  1. 从官方 units/buildings/heroes/upgrades/progression/prestiges/command_cards 提取 ID。
  2. 扫描 XM<Commander>.SC2Mod，并合并 XMCore.SC2Mod、XMFinal.SC2Mod。
  3. 统计官方 ID 在 Mod 文本中未命中的项目。
  4. --include-catalog-diff 会额外解析 Mod XML Catalog ID。

参数：
  --official-root <path>       官方指挥官 JSON 根目录
  --mod-root <path>            包含 Mods/XM 的 Mod 根目录
  --output-dir <path>          报告输出目录
  --commanders <A,B,C>         只对比指定指挥官
  --include-catalog-diff       额外解析 Mod XML Catalog ID

示例：
  node scripts/sc2/compare-official-commanders-vs-mod.mjs
  node scripts/sc2/compare-official-commanders-vs-mod.mjs --commanders Abathur,Raynor
  node scripts/sc2/compare-official-commanders-vs-mod.mjs --commanders Abathur --include-catalog-diff`);
}

function assertDirectory(dir, label) {
  if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) {
    throw new Error(`${label} directory not found: ${dir}`);
  }
}

function readJsonFile(file) {
  if (!fs.existsSync(file)) {
    return null;
  }

  const raw = fs.readFileSync(file, "utf8");
  if (!raw.trim()) {
    return null;
  }

  return JSON.parse(raw);
}

function asArray(value) {
  if (value == null) {
    return [];
  }

  return Array.isArray(value) ? value : [value];
}

function newIdBucket() {
  return Object.fromEntries(idKinds.map((kind) => [kind, new Set()]));
}

function add(set, value) {
  if (value == null) {
    return;
  }

  const text = String(value).trim();
  if (text) {
    set.add(text);
  }
}

function addMany(set, values) {
  for (const value of asArray(values)) {
    add(set, value);
  }
}

function addBucketValues(bucket, target) {
  for (const kind of idKinds) {
    for (const id of bucket[kind]) {
      target.add(id);
    }
  }
}

function normalizeAbilityId(command) {
  if (!command || typeof command !== "object") {
    return null;
  }

  if (command.abil) {
    return command.abil;
  }

  if (command.ability_id) {
    return command.ability_id;
  }

  if (command.abil_cmd) {
    return String(command.abil_cmd).split(",")[0];
  }

  return null;
}

function importOfficialCommander(commanderDir) {
  const ids = newIdBucket();
  const sources = {};

  const units = asArray(readJsonFile(path.join(commanderDir, "units.json")));
  for (const entry of units) {
    add(ids.units, entry?.unit_id);
    addMany(ids.units, entry?.resolved_unit_ids);
    add(ids.buttons, entry?.icon_button);
    addProduction(ids, entry?.production, "units");
    for (const option of asArray(entry?.production_options)) {
      addProduction(ids, option, "units");
    }
  }
  sources.units = units.length;

  const buildings = asArray(readJsonFile(path.join(commanderDir, "buildings.json")));
  for (const entry of buildings) {
    add(ids.buildings, entry?.unit_id);
    addMany(ids.buildings, entry?.resolved_unit_ids);
    add(ids.buttons, entry?.icon_button);
    addProduction(ids, entry?.production, "buildings");
    for (const option of asArray(entry?.production_options)) {
      addProduction(ids, option, "buildings");
    }
  }
  sources.buildings = buildings.length;

  const heroes = asArray(readJsonFile(path.join(commanderDir, "heroes.json")));
  for (const entry of heroes) {
    add(ids.heroes, entry?.unit_id);
    addMany(ids.heroes, entry?.resolved_unit_ids);
    add(ids.buttons, entry?.icon_button);
  }
  sources.heroes = heroes.length;

  const upgrades = asArray(readJsonFile(path.join(commanderDir, "upgrades.json")));
  for (const entry of upgrades) {
    add(ids.upgrades, entry?.id);
  }
  sources.upgrades = upgrades.length;

  const progression = readJsonFile(path.join(commanderDir, "progression.json"));
  const perks = asArray(progression?.perks);
  const masteries = asArray(progression?.masteries);
  for (const perk of perks) {
    add(ids.commander_perks, perk?.id);
    addMany(ids.upgrades, perk?.upgrades);
    add(ids.buttons, perk?.button);
    for (const command of asArray(perk?.ability_commands)) {
      add(ids.abilities, normalizeAbilityId(command));
    }
  }
  for (const mastery of masteries) {
    add(ids.upgrades, mastery?.upgrade);
    add(ids.commander_perks, mastery?.id);
  }
  sources.perks = perks.length;
  sources.masteries = masteries.length;

  const prestiges = asArray(readJsonFile(path.join(commanderDir, "prestiges.json")));
  for (const prestige of prestiges) {
    add(ids.prestiges, prestige?.id);
    add(ids.upgrades, prestige?.primary_upgrade);
    addMany(ids.upgrades, prestige?.secondary_upgrades_shared);
    addMany(ids.upgrades, prestige?.secondary_upgrades_self);
    addMany(ids.upgrades, prestige?.suppress_upgrades);
    addMany(ids.units, prestige?.disable_units);
    addMany(ids.units, prestige?.enable_units);
    addMany(ids.abilities, prestige?.disable_abils);
    addMany(ids.abilities, prestige?.enable_abils);
    for (const supplement of asArray(prestige?.upgrade_supplements)) {
      add(ids.upgrades, supplement?.upgrade);
      addMany(ids.upgrades, supplement?.supplement_upgrades);
    }
  }
  sources.prestiges = prestiges.length;

  const commandCards = asArray(readJsonFile(path.join(commanderDir, "command_cards.json")));
  for (const entry of commandCards) {
    add(ids.units, entry?.unit_id);
    add(ids.buildings, entry?.unit_id);
    add(ids.buttons, entry?.icon_button);
    for (const card of asArray(entry?.cards)) {
      for (const button of asArray(card?.buttons)) {
        add(ids.buttons, button?.face);
        add(ids.abilities, normalizeAbilityId(button));
      }
    }
  }
  sources.command_cards = commandCards.length;

  return { ids, sources };
}

function addProduction(ids, production, targetKind) {
  if (!production) {
    return;
  }

  add(ids.units, production.producer_unit_id);
  add(ids[targetKind], production.unit);
  add(ids.buttons, production.button_face);
  add(ids.abilities, production.ability_id);
}

function getCommanderModuleName(commander) {
  return commanderModuleOverrides.get(commander) ?? `XM${commander}.SC2Mod`;
}

function getRuntimeCommanderName(commander) {
  return runtimeNameOverrides.get(commander) ?? commander;
}

function listFiles(root) {
  const result = [];
  if (!fs.existsSync(root) || !fs.statSync(root).isDirectory()) {
    return result;
  }

  const stack = [root];
  while (stack.length > 0) {
    const current = stack.pop();
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(fullPath);
      } else if (entry.isFile()) {
        result.push(fullPath);
      }
    }
  }

  return result;
}

function shouldScanText(file) {
  const extension = path.extname(file).toLowerCase();
  return extension === ".xml" || extension === ".galaxy" || extension === ".txt" || extension === "";
}

function buildCandidateGroups(candidates) {
  const groups = new Map();
  for (const id of candidates) {
    if (!id) {
      continue;
    }

    const length = id.length;
    const first = asciiLower(id.charCodeAt(0));
    let byFirst = groups.get(length);
    if (!byFirst) {
      byFirst = new Map();
      groups.set(length, byFirst);
    }

    let values = byFirst.get(first);
    if (!values) {
      values = [];
      byFirst.set(first, values);
    }

    values.push(id);
  }

  return groups;
}

function addMatchingTokens(text, candidateGroups, output) {
  let index = 0;
  while (index < text.length) {
    const code = text.charCodeAt(index);
    if (!isStart(code)) {
      index += 1;
      continue;
    }

    const start = index;
    index += 1;
    while (index < text.length && isPart(text.charCodeAt(index))) {
      index += 1;
    }

    const tokenLength = index - start;
    const byFirst = candidateGroups.get(tokenLength);
    if (!byFirst) {
      continue;
    }

    const candidates = byFirst.get(asciiLower(text.charCodeAt(start)));
    if (!candidates) {
      continue;
    }

    for (const candidate of candidates) {
      if (segmentEquals(text, start, candidate)) {
        output.add(candidate);
        break;
      }
    }
  }
}

function segmentEquals(text, start, candidate) {
  for (let offset = 0; offset < candidate.length; offset++) {
    if (asciiLower(text.charCodeAt(start + offset)) !== asciiLower(candidate.charCodeAt(offset))) {
      return false;
    }
  }

  return true;
}

function isStart(code) {
  return code === 95 || (code >= 65 && code <= 90) || (code >= 97 && code <= 122);
}

function isPart(code) {
  return isStart(code) || (code >= 48 && code <= 57);
}

function asciiLower(code) {
  return code >= 65 && code <= 90 ? code + 32 : code;
}

function newCatalogBucket() {
  return {
    Unit: new Map(),
    Upgrade: new Map(),
    Abil: new Map(),
    Button: new Map(),
    Effect: new Map(),
    Behavior: new Map(),
    Weapon: new Map(),
    Requirement: new Map(),
    RequirementNode: new Map(),
    User: new Map(),
    Commander: new Map(),
  };
}

function importModIndex(roots, tokenCandidates, includeCatalog) {
  const mentioned = new Set();
  const files = new Set();
  const catalog = newCatalogBucket();
  const candidateGroups = buildCandidateGroups(tokenCandidates);

  for (const root of roots) {
    for (const file of listFiles(root)) {
      files.add(path.relative(process.cwd(), file));
      if (shouldScanText(file) && tokenCandidates.size > 0) {
        addMatchingTokens(fs.readFileSync(file, "utf8"), candidateGroups, mentioned);
      }

      if (includeCatalog && path.extname(file).toLowerCase() === ".xml") {
        importCatalogEntries(file, catalog);
      }
    }
  }

  return { mentioned, files, catalog };
}

function importCatalogEntries(file, catalog) {
  const xml = fs.readFileSync(file, "utf8");
  const relative = path.relative(process.cwd(), file);
  const regex = /<(C[A-Za-z0-9_]+)\b([^>]*)>[\s\S]*?<\/\1>|<(C[A-Za-z0-9_]+)\b([^>]*)\/>/g;
  for (const match of xml.matchAll(regex)) {
    const tag = match[1] ?? match[3];
    const attrs = match[2] ?? match[4] ?? "";
    const id = /\bid="([^"]+)"/.exec(attrs)?.[1];
    const kind = getCatalogKind(tag);
    if (!id || !kind) {
      continue;
    }

    if (!catalog[kind].has(id)) {
      const normalized = match[0].replace(/\s+/g, " ").trim();
      catalog[kind].set(id, {
        id,
        hash: crypto.createHash("sha256").update(normalized).digest("hex"),
        files: [],
      });
    }

    catalog[kind].get(id).files.push(relative);
  }
}

function getCatalogKind(tag) {
  if (tag === "CUnit") return "Unit";
  if (tag === "CUpgrade") return "Upgrade";
  if (tag.startsWith("CAbil")) return "Abil";
  if (tag === "CButton") return "Button";
  if (tag.startsWith("CEffect")) return "Effect";
  if (tag.startsWith("CBehavior")) return "Behavior";
  if (tag.startsWith("CWeapon")) return "Weapon";
  if (tag === "CRequirement") return "Requirement";
  if (/^CRequirement(Node|Count|And|Or|Not)/.test(tag)) return "RequirementNode";
  if (tag === "CUser") return "User";
  if (tag === "CCommander") return "Commander";
  return null;
}

function mergeModIndexes(...indexes) {
  const merged = { mentioned: new Set(), files: new Set(), catalog: newCatalogBucket() };
  for (const index of indexes) {
    for (const id of index.mentioned) {
      merged.mentioned.add(id);
    }
    for (const file of index.files) {
      merged.files.add(file);
    }
    for (const [kind, entries] of Object.entries(index.catalog)) {
      for (const [id, entry] of entries) {
        if (!merged.catalog[kind].has(id)) {
          merged.catalog[kind].set(id, { ...entry, files: [...entry.files] });
        } else {
          merged.catalog[kind].get(id).files.push(...entry.files);
        }
      }
    }
  }

  return merged;
}

function compareOfficialToMentions(officialIds, mentioned, sampleLimit = 80) {
  const result = {};
  for (const kind of idKinds) {
    const missing = [...officialIds[kind]].sort((a, b) => a.localeCompare(b)).filter((id) => !mentioned.has(id));
    result[kind] = {
      official_count: officialIds[kind].size,
      missing_count: missing.length,
      missing: missing.slice(0, sampleLimit),
    };
  }

  return result;
}

function compareOfficialToCatalog(officialIds, modCatalog, sampleLimit = 80) {
  const catalogSets = {
    units: new Set(modCatalog.Unit.keys()),
    buildings: new Set(modCatalog.Unit.keys()),
    heroes: new Set(modCatalog.Unit.keys()),
    upgrades: new Set(modCatalog.Upgrade.keys()),
    abilities: new Set(modCatalog.Abil.keys()),
    buttons: new Set(modCatalog.Button.keys()),
    prestiges: new Set(),
    commander_perks: new Set(modCatalog.User.keys()),
  };

  const result = {};
  for (const kind of idKinds) {
    const official = officialIds[kind];
    const mod = catalogSets[kind];
    const missing = [...official].sort((a, b) => a.localeCompare(b)).filter((id) => !mod.has(id));
    const extra = [...mod].sort((a, b) => a.localeCompare(b)).filter((id) => !official.has(id));
    result[kind] = {
      official_count: official.size,
      mod_count: mod.size,
      missing_count: missing.length,
      extra_count: extra.length,
      changed_count: 0,
      missing: missing.slice(0, sampleLimit),
      extra: extra.slice(0, sampleLimit),
      changed: [],
    };
  }

  return result;
}

function setCounts(bucket) {
  return Object.fromEntries(idKinds.map((kind) => [kind, bucket[kind].size]));
}

function catalogCounts(catalog, includeCatalog, filesCount) {
  return {
    catalog_indexed: includeCatalog,
    units: catalog.Unit.size,
    buildings: catalog.Unit.size,
    heroes: catalog.Unit.size,
    upgrades: catalog.Upgrade.size,
    abilities: catalog.Abil.size,
    buttons: catalog.Button.size,
    prestiges: 0,
    commander_perks: catalog.User.size,
    files: filesCount,
  };
}

function serialize(_key, value) {
  if (value instanceof Set) {
    return [...value].sort((a, b) => a.localeCompare(b));
  }
  if (value instanceof Map) {
    return Object.fromEntries([...value.entries()]);
  }
  return value;
}

function renderMarkdown(results, officialRoot, modRoot, includeCatalog) {
  const tick = "`";
  const lines = [];
  lines.push("# 官方合作指挥官 vs Mod 差异对比");
  lines.push("");
  lines.push(`- 生成时间：${new Date().toLocaleString("zh-CN", { hour12: false })}`);
  lines.push(`- 官方数据：${tick}${officialRoot}${tick}`);
  lines.push(`- Mod 数据：${tick}${modRoot}${tick}`);
  lines.push(`- Catalog ID 对比：${includeCatalog}`);
  lines.push("");
  lines.push("## 汇总");
  lines.push("");
  lines.push("| 指挥官 | 模块 | 官方清单缺失 | 单位缺失 | 建筑缺失 | 升级缺失 | 技能缺失 | 按 Catalog 缺失 |");
  lines.push("| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |");
  for (const result of results) {
    const mention = result.official_to_mod_mentions;
    let catalogMissing = 0;
    if (result.catalog_diff) {
      for (const entry of Object.values(result.catalog_diff)) {
        catalogMissing += entry.missing_count;
      }
    }

    lines.push(
      `| ${result.commander} | ${tick}${result.module}${tick} | ${result.total_official_missing_mentions} | ${mention.units.missing_count} | ${mention.buildings.missing_count} | ${mention.upgrades.missing_count} | ${mention.abilities.missing_count} | ${catalogMissing} |`,
    );
  }

  for (const result of results) {
    lines.push("");
    lines.push(`## ${result.commander}`);
    lines.push("");
    lines.push(`- 模块：${tick}${result.module}${tick}`);
    lines.push(`- 运行时名称：${tick}${result.runtime_commander}${tick}`);
    lines.push(`- 扫描根：${result.scan_roots.length} 个`);
    lines.push("");
    lines.push("### 官方清单在 Mod 中未命中");
    for (const kind of idKinds) {
      const entry = result.official_to_mod_mentions[kind];
      lines.push("");
      lines.push(`- ${tick}${kind}${tick}: ${entry.missing_count}/${entry.official_count}`);
      for (const id of entry.missing.slice(0, 30)) {
        lines.push(`  - ${tick}${id}${tick}`);
      }
      if (entry.missing_count > 30) {
        lines.push("  - ... 其余见 JSON");
      }
    }

    if (result.catalog_diff) {
      lines.push("");
      lines.push("### Catalog ID 差异");
      for (const kind of idKinds) {
        const entry = result.catalog_diff[kind];
        if (!entry || entry.missing_count + entry.extra_count === 0) {
          continue;
        }
        lines.push("");
        lines.push(`- ${tick}${kind}${tick}: 缺失 ${entry.missing_count}，额外 ${entry.extra_count}`);
        for (const id of entry.missing.slice(0, 20)) {
          lines.push(`  - 缺失：${tick}${id}${tick}`);
        }
        for (const id of entry.extra.slice(0, 10)) {
          lines.push(`  - 额外：${tick}${id}${tick}`);
        }
      }
    }
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
    commanders = fs
      .readdirSync(options.officialRoot, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .sort((a, b) => a.localeCompare(b));
  }

  const officialByCommander = new Map();
  const allOfficialIds = new Set();
  const validCommanders = [];
  for (const commander of commanders) {
    const commanderDir = path.join(options.officialRoot, commander);
    if (!fs.existsSync(commanderDir) || !fs.statSync(commanderDir).isDirectory()) {
      console.warn(`Skip missing official commander: ${commander}`);
      continue;
    }

    const official = importOfficialCommander(commanderDir);
    officialByCommander.set(commander, official);
    addBucketValues(official.ids, allOfficialIds);
    validCommanders.push(commander);
  }

  fs.mkdirSync(options.outputDir, { recursive: true });

  const commonRoots = [path.join(modsXmRoot, "XMCore.SC2Mod"), path.join(modsXmRoot, "XMFinal.SC2Mod")].filter((root) =>
    fs.existsSync(root),
  );
  const commonIndex = importModIndex(commonRoots, allOfficialIds, options.includeCatalogDiff);

  const results = [];
  for (const commander of validCommanders) {
    const commanderDir = path.join(options.officialRoot, commander);
    const official = officialByCommander.get(commander);
    const commanderIds = new Set();
    addBucketValues(official.ids, commanderIds);

    const moduleName = getCommanderModuleName(commander);
    const runtimeCommander = getRuntimeCommanderName(commander);
    const moduleRoot = path.join(modsXmRoot, moduleName);
    const moduleRoots = fs.existsSync(moduleRoot) ? [moduleRoot] : [];
    const scanRoots = [...moduleRoots, ...commonRoots];
    const moduleIndex = importModIndex(moduleRoots, commanderIds, options.includeCatalogDiff);
    const modIndex = mergeModIndexes(moduleIndex, commonIndex);
    const mentionDiff = compareOfficialToMentions(official.ids, modIndex.mentioned);
    const totalMissing = Object.values(mentionDiff).reduce((sum, entry) => sum + entry.missing_count, 0);
    const catalogDiff = options.includeCatalogDiff ? compareOfficialToCatalog(official.ids, modIndex.catalog) : null;

    results.push({
      commander,
      runtime_commander: runtimeCommander,
      module: moduleName,
      official_dir: commanderDir,
      module_exists: fs.existsSync(moduleRoot),
      scan_roots: scanRoots,
      official_sources: official.sources,
      official_counts: setCounts(official.ids),
      mod_catalog_counts: catalogCounts(modIndex.catalog, options.includeCatalogDiff, modIndex.files.size),
      total_official_missing_mentions: totalMissing,
      official_to_mod_mentions: mentionDiff,
      catalog_diff: catalogDiff,
    });
  }

  const jsonPath = path.join(options.outputDir, "official-vs-mod-by-commander.json");
  const markdownPath = path.join(options.outputDir, "official-vs-mod-by-commander.md");
  fs.writeFileSync(jsonPath, `${JSON.stringify(results, serialize, 2)}\n`, "utf8");
  fs.writeFileSync(markdownPath, renderMarkdown(results, options.officialRoot, options.modRoot, options.includeCatalogDiff), "utf8");

  console.log(`Wrote JSON: ${jsonPath}`);
  console.log(`Wrote Markdown: ${markdownPath}`);
}

main();
