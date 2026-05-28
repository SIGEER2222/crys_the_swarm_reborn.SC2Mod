import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "../..");
const today = new Date().toISOString().slice(0, 10);

const trainLikePattern = /(Train|Build|Morph|Merge|Warp|Evolve)/i;
const ignoreAbilityPattern = /(Research|AddOn|AddOns|LiftOff|Land|Rally|Halt|Cancel|Stop|Move|Attack|Burrow|Unload|Load|Transport|Behavior|Learn|Select)/i;
const ignoreFacePattern = /^(Cancel|Halt|Stop|Move|Attack|Rally|SelectBuilder|Burrow|Unload|Load|Research|LiftOff|Land)/i;
const nonFinalUnitPattern = /(Cocoon|Egg|SpawnerUnit|Dummy|Missile|Weapon|Placeholder)$/i;

function parseArgs(argv) {
  const options = {
    officialRoot: path.join(repoRoot, "游戏数据", "官方合作指挥官", "commanders"),
    outputDir: path.join(repoRoot, "docs", "每日进度", `${today}-官方指挥官名册一致性审计`),
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
  node scripts/sc2/audit-official-commander-roster-consistency.mjs [options]

作用：
  审计官方合作指挥官 JSON 的名册一致性，批量找出类似 Stukov 的错收/漏收候选：
  1. TechUnit 归属/名册里有，但生产链缺失或生产者不在本指挥官名册。
  2. 本指挥官建筑命令卡有训练/建造/变形按钮，但没有对应名册生产项。
  3. 名册中出现 Cocoon/Egg/Spawner/Dummy 等中间形态。

参数：
  --official-root <path>  官方指挥官 JSON 根目录
  --output-dir <path>     输出目录
  --commanders <A,B,C>    只审计指定指挥官

示例：
  node scripts/sc2/audit-official-commander-roster-consistency.mjs
  node scripts/sc2/audit-official-commander-roster-consistency.mjs --commanders Kerrigan,Zagara,Abathur
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

function unique(values) {
  return [...new Set(values.filter(Boolean).map(String))];
}

function abilityId(abilCmd) {
  return String(abilCmd || "").split(",")[0];
}

function isTrainLike(abilCmd, face = "") {
  const ability = abilityId(abilCmd);
  if (!ability || !trainLikePattern.test(ability)) return false;
  if (ignoreAbilityPattern.test(ability)) return false;
  if (ignoreFacePattern.test(face)) return false;
  return true;
}

function productionKey(item) {
  return `${item.producer_unit_id || ""}|${item.button_face || ""}|${item.abil_cmd || ""}`;
}

function entryDisplay(entry) {
  return {
    name: entry.name || "",
    id: entry.id || "",
    unit_id: entry.unit_id || "",
    source: entry.source || "",
    production: entry.production || null,
  };
}

function loadCommander(officialRoot, commander) {
  const dir = path.join(officialRoot, commander);
  const roster = asArray(readJson(path.join(dir, "roster.json")));
  const units = asArray(readJson(path.join(dir, "units.json")));
  const buildings = asArray(readJson(path.join(dir, "buildings.json")));
  const heroes = asArray(readJson(path.join(dir, "heroes.json")));
  const commandCards = asArray(readJson(path.join(dir, "command_cards.json")));
  return { dir, roster, units, buildings, heroes, commandCards };
}

function commanderNames(officialRoot, selected) {
  if (selected?.length) return selected;
  return fs.readdirSync(officialRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((left, right) => left.localeCompare(right, "en"));
}

function auditCommander(officialRoot, commander) {
  const data = loadCommander(officialRoot, commander);
  const combatEntries = [...data.units, ...data.buildings, ...data.heroes];
  const rosterEntries = data.roster.length ? data.roster : combatEntries;
  const rosterUnitIds = new Set();
  const rosterEntryIds = new Set();
  const producerUnitIds = new Set();
  const knownProductionKeys = new Set();
  const knownProductionCommands = new Set();
  const knownProductionFaces = new Set();

  for (const entry of rosterEntries) {
    if (entry?.unit_id) rosterUnitIds.add(String(entry.unit_id));
    if (entry?.id) rosterEntryIds.add(String(entry.id));
    for (const id of asArray(entry?.resolved_unit_ids)) rosterUnitIds.add(String(id));
    for (const production of [entry?.production, ...asArray(entry?.production_options)]) {
      if (!production) continue;
      knownProductionKeys.add(productionKey(production));
      if (production.abil_cmd) knownProductionCommands.add(String(production.abil_cmd));
      if (production.button_face) knownProductionFaces.add(String(production.button_face));
      if (production.producer_unit_id) producerUnitIds.add(String(production.producer_unit_id));
    }
  }

  const techOnlySuspicious = [];
  const externalProducerSuspicious = [];
  const intermediateSuspicious = [];
  for (const entry of combatEntries) {
    const production = entry.production || null;
    const source = String(entry.source || "");
    const unitId = String(entry.unit_id || "");
    const id = String(entry.id || "");
    const sourceLooksTech = source.includes("userdata.xml") || source.includes("supplemental curated roster");

    if (unitId && nonFinalUnitPattern.test(unitId)) {
      intermediateSuspicious.push({
        reason: "名册单位像中间形态，需追到最终可战斗单位",
        ...entryDisplay(entry),
      });
    }

    if (sourceLooksTech && !production) {
      techOnlySuspicious.push({
        reason: "名册/TechUnit 有归属，但没有生产链",
        ...entryDisplay(entry),
      });
      continue;
    }

    if (!production) continue;
    const producer = String(production.producer_unit_id || "");
    const ability = abilityId(production.abil_cmd || production.ability_id);
    const genericProducer = producer && !rosterUnitIds.has(producer) && !rosterEntryIds.has(producer);
    const genericAbility = ability && /^(LarvaTrain|TrainQueen|ZergBuild|ProtossBuild|GatewayTrain|RoboticsFacilityTrain|StargateTrain|BarracksTrain|FactoryTrain|StarportTrain)$/i.test(ability);
    if (sourceLooksTech && genericProducer && genericAbility && !id.includes(commander) && !unitId.includes(commander)) {
      externalProducerSuspicious.push({
        reason: "TechUnit 归属存在，但生产者/技能偏泛用，可能是共享或误收单位",
        ...entryDisplay(entry),
      });
    }
  }

  const commandCardOnly = [];
  for (const cardEntry of data.commandCards) {
    const producerUnitId = String(cardEntry.unit_id || "");
    const producerName = String(cardEntry.name || "");
    for (const card of asArray(cardEntry.cards)) {
      for (const button of asArray(card?.buttons)) {
        const face = String(button?.face || "");
        const abilCmd = String(button?.abil_cmd || "");
        if (!isTrainLike(abilCmd, face)) continue;
        const key = productionKey({ producer_unit_id: producerUnitId, button_face: face, abil_cmd: abilCmd });
        const commandKnown = knownProductionCommands.has(abilCmd);
        const faceKnown = knownProductionFaces.has(face);
        if (knownProductionKeys.has(key) || (commandKnown && faceKnown)) continue;
        commandCardOnly.push({
          reason: "建筑/单位命令卡有生产按钮，但名册生产项未覆盖",
          producer_name: producerName,
          producer_unit_id: producerUnitId,
          face,
          abil_cmd: abilCmd,
          button_name: button?.button?.name || "",
          requirements: button?.requirements || "",
        });
      }
    }
  }

  return {
    commander,
    counts: {
      roster: rosterEntries.length,
      units: data.units.length,
      buildings: data.buildings.length,
      heroes: data.heroes.length,
      command_card_only: commandCardOnly.length,
      tech_only_suspicious: techOnlySuspicious.length,
      external_producer_suspicious: externalProducerSuspicious.length,
      intermediate_suspicious: intermediateSuspicious.length,
    },
    command_card_only: commandCardOnly,
    tech_only_suspicious: techOnlySuspicious,
    external_producer_suspicious: externalProducerSuspicious,
    intermediate_suspicious: intermediateSuspicious,
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

function writeReports(outputDir, officialRoot, results) {
  fs.mkdirSync(outputDir, { recursive: true });
  const jsonPath = path.join(outputDir, "official-commander-roster-consistency-audit.json");
  const mdPath = path.join(outputDir, "official-commander-roster-consistency-audit.md");
  fs.writeFileSync(jsonPath, `${JSON.stringify({ generated_at: new Date().toISOString(), officialRoot, results }, null, 2)}\n`, "utf8");

  const lines = [];
  lines.push("# 官方指挥官名册一致性审计");
  lines.push("");
  lines.push(`- 生成时间：${new Date().toLocaleString("zh-CN", { hour12: false })}`);
  lines.push(`- 官方数据：\`${officialRoot}\``);
  lines.push("- 目的：批量找出类似 Stukov 的错收/漏收候选。该报告是静态审计，不等于进游戏验证。");
  lines.push("");
  lines.push("## 汇总");
  lines.push("");
  lines.push(markdownTable(results, [
    { title: "指挥官", value: (row) => row.commander },
    { title: "名册", value: (row) => row.counts.roster },
    { title: "命令卡未覆盖", value: (row) => row.counts.command_card_only },
    { title: "无生产链", value: (row) => row.counts.tech_only_suspicious },
    { title: "泛用生产链", value: (row) => row.counts.external_producer_suspicious },
    { title: "中间形态", value: (row) => row.counts.intermediate_suspicious },
  ]));
  lines.push("## 说明");
  lines.push("");
  lines.push("- `命令卡未覆盖`：本指挥官建筑/单位命令卡上有训练、建造、变形按钮，但没有被任何名册项的 `production` / `production_options` 覆盖，优先查漏收。");
  lines.push("- `无生产链`：名册有单位或建筑，但没有提取到生产链，优先查是否只是展示项、召唤项或提取器漏链。");
  lines.push("- `泛用生产链`：单位来自 `TechUnit`，但生产者/技能偏普通基础链，优先查是否像 Stukov 虫后/跳虫一样误收。");
  lines.push("- `中间形态`：名册单位像 Cocoon/Egg/Spawner/Dummy，通常应追到最终单位。");
  lines.push("");

  for (const result of results) {
    lines.push(`## ${result.commander}`);
    lines.push("");
    lines.push("### 命令卡未覆盖");
    lines.push("");
    lines.push(markdownTable(result.command_card_only, [
      { title: "原因", value: (row) => row.reason },
      { title: "生产者", value: (row) => `${row.producer_name} (${row.producer_unit_id})` },
      { title: "按钮", value: (row) => `${row.button_name || row.face} (${row.face})` },
      { title: "技能命令", value: (row) => row.abil_cmd },
      { title: "需求", value: (row) => row.requirements },
    ]));
    lines.push("### 名册有但无生产链");
    lines.push("");
    lines.push(markdownTable(result.tech_only_suspicious, [
      { title: "原因", value: (row) => row.reason },
      { title: "名称", value: (row) => row.name },
      { title: "Tech ID", value: (row) => row.id },
      { title: "Unit ID", value: (row) => row.unit_id },
      { title: "来源", value: (row) => row.source },
    ]));
    lines.push("### 泛用生产链候选");
    lines.push("");
    lines.push(markdownTable(result.external_producer_suspicious, [
      { title: "原因", value: (row) => row.reason },
      { title: "名称", value: (row) => row.name },
      { title: "Unit ID", value: (row) => row.unit_id },
      { title: "生产链", value: (row) => row.production ? `${row.production.producer_unit_id || ""} / ${row.production.abil_cmd || row.production.ability_id || ""} / ${row.production.button_face || ""}` : "" },
    ]));
    lines.push("### 中间形态候选");
    lines.push("");
    lines.push(markdownTable(result.intermediate_suspicious, [
      { title: "原因", value: (row) => row.reason },
      { title: "名称", value: (row) => row.name },
      { title: "Tech ID", value: (row) => row.id },
      { title: "Unit ID", value: (row) => row.unit_id },
    ]));
  }

  fs.writeFileSync(mdPath, `${lines.join("\n")}\n`, "utf8");
  return { jsonPath, mdPath };
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  assertDirectory(options.officialRoot, "Official commanders");
  const results = commanderNames(options.officialRoot, options.commanders).map((commander) => auditCommander(options.officialRoot, commander));
  const outputs = writeReports(options.outputDir, options.officialRoot, results);
  console.log(`Wrote JSON: ${outputs.jsonPath}`);
  console.log(`Wrote Markdown: ${outputs.mdPath}`);
}

main();
