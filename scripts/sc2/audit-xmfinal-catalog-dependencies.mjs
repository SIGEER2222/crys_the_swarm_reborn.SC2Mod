import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const xmfinalRoot = path.join(root, "原始mod", "Mods", "XM", "XMFinal.SC2Mod", "Base.SC2Data");
const xmfinalGameData = path.join(xmfinalRoot, "GameData");
const xmModsRoot = path.join(root, "原始mod", "Mods", "XM");
const officialModsRoot = path.join(root, "references", "sc2-build-96883-casc-export", "mods");
const defaultOutputDir = path.join(root, "docs", "每日进度", "2026-05-28-XMFinal-Catalog深层依赖扫描");

const profileFiles = [
  "LibE0EAE146_CommanderUnitAbilities.galaxy",
  "LibE0EAE146_CommanderHeroAbilities.galaxy",
  "LibE0EAE146_CommanderPanels.galaxy",
];

const tagKinds = new Map([
  ["CButton", "button"],
  ["CRequirement", "requirement"],
  ["CRequirementNode", "requirementNode"],
  ["CUnit", "unit"],
  ["CUpgrade", "upgrade"],
  ["CWeaponLegacy", "weapon"],
  ["CBehaviorBuff", "behavior"],
  ["CBehaviorVeterancy", "behavior"],
  ["CBehaviorResource", "behavior"],
  ["CBehaviorSpawn", "behavior"],
  ["CBehaviorPowerSource", "behavior"],
  ["CBehaviorPowerUser", "behavior"],
  ["CActorAction", "actor"],
  ["CActorBeamSimple", "actor"],
  ["CActorModel", "actor"],
  ["CActorMissile", "actor"],
  ["CActorSite", "actor"],
  ["CActorSplat", "actor"],
  ["CActorUnit", "actor"],
  ["CModel", "model"],
]);

const knownKinds = new Set([
  "ability",
  "actor",
  "behavior",
  "button",
  "effect",
  "model",
  "requirement",
  "requirementNode",
  "unit",
  "upgrade",
  "validator",
  "weapon",
]);

const builtinRefs = new Map([
  ["ability", new Set([
    "attack",
    "move",
    "que1",
    "stop",
    "BuildInProgress",
    "ProgressRally",
    "Rally",
  ])],
  ["button", new Set([
    "AcquireMove",
    "Attack",
    "Cancel",
    "CancelBuilding",
    "Move",
    "MoveHoldPosition",
    "MovePatrol",
    "Rally",
    "ReturnCargo",
    "Stop",
  ])],
]);

function parseArgs() {
  const args = new Map();
  for (let i = 2; i < process.argv.length; i += 1) {
    const item = process.argv[i];
    if (!item.startsWith("--")) {
      continue;
    }
    const key = item.slice(2);
    const next = process.argv[i + 1];
    if (next && !next.startsWith("--")) {
      args.set(key, next);
      i += 1;
    } else {
      args.set(key, true);
    }
  }
  return args;
}

function readText(file) {
  return fs.readFileSync(file, "utf8");
}

function writeText(file, text) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, text, "utf8");
}

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) {
    return files;
  }
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, files);
    } else {
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
    if (startIndex < 0 || startIndex >= endLimit) {
      break;
    }
    if (cleanText.startsWith("<?", startIndex) || cleanText.startsWith("<!", startIndex)) {
      const tagEnd = cleanText.indexOf(">", startIndex);
      if (tagEnd < 0) {
        break;
      }
      index = tagEnd + 1;
      continue;
    }

    const openEnd = cleanText.indexOf(">", startIndex);
    if (openEnd < 0) {
      throw new Error(`Unclosed catalog opening tag in ${fileName}`);
    }

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
      nodes.push({
        fileName,
        tag,
        id: idMatch[1],
        text: cleanText.slice(startIndex, endIndex),
      });
    }
    index = endIndex;
  }
  return nodes;
}

function catalogKindForTag(tag) {
  if (tagKinds.has(tag)) {
    return tagKinds.get(tag);
  }
  if (tag.startsWith("CAbil")) {
    return "ability";
  }
  if (tag.startsWith("CEffect")) {
    return "effect";
  }
  if (tag.startsWith("CValidator")) {
    return "validator";
  }
  if (tag.startsWith("CBehavior")) {
    return "behavior";
  }
  return undefined;
}

function sourceLabel(file) {
  return path.relative(root, file).replaceAll("\\", "/");
}

function sourceScope(file) {
  const normalized = path.resolve(file).toLowerCase();
  const localPrefix = `${path.resolve(xmfinalGameData).toLowerCase()}${path.sep}`;
  const xmPrefix = `${path.resolve(xmModsRoot).toLowerCase()}${path.sep}`;
  const officialPrefix = `${path.resolve(officialModsRoot).toLowerCase()}${path.sep}`;
  if (normalized.startsWith(localPrefix)) {
    return "xmfinal";
  }
  if (normalized.startsWith(xmPrefix)) {
    return "xm-dependency";
  }
  if (normalized.startsWith(officialPrefix)) {
    return "official-reference";
  }
  return "other";
}

function addNode(index, node, file) {
  const kind = catalogKindForTag(node.tag);
  if (!kind) {
    return;
  }
  const key = `${kind}:${node.id}`;
  if (!index.has(key)) {
    index.set(key, []);
  }
  index.get(key).push({
    ...node,
    kind,
    source: sourceLabel(file),
    scope: sourceScope(file),
  });
}

function loadCatalogIndex() {
  const index = new Map();
  const roots = [
    xmfinalGameData,
    xmModsRoot,
    officialModsRoot,
  ];
  const seenFiles = new Set();
  for (const scanRoot of roots) {
    for (const file of walk(scanRoot)) {
      if (seenFiles.has(file)) {
        continue;
      }
      seenFiles.add(file);
      if (!file.toLowerCase().endsWith(".xml")) {
        continue;
      }
      if (!file.replaceAll("\\", "/").toLowerCase().includes("/gamedata/")) {
        continue;
      }
      for (const node of parseCatalogNodes(readText(file), sourceLabel(file))) {
        addNode(index, node, file);
      }
    }
  }
  return index;
}

function localNode(index, kind, id) {
  return (index.get(`${kind}:${id}`) ?? []).find((node) => node.scope === "xmfinal");
}

function resolveReference(index, kind, id) {
  if (builtinRefs.get(kind)?.has(id)) {
    return { status: "builtin", node: undefined };
  }
  const nodes = index.get(`${kind}:${id}`) ?? [];
  const local = nodes.find((node) => node.scope === "xmfinal");
  if (local) {
    return { status: "local", node: local };
  }
  const xmDependency = nodes.find((node) => node.scope === "xm-dependency");
  if (xmDependency) {
    return { status: "xm-dependency", node: xmDependency };
  }
  const official = nodes.find((node) => node.scope === "official-reference");
  if (official) {
    return { status: "official-reference", node: official };
  }
  return { status: "missing", node: undefined };
}

function addUsage(profileUsage, kind, id, usage) {
  if (!id) {
    return;
  }
  const key = `${kind}:${id}`;
  if (!profileUsage.has(key)) {
    profileUsage.set(key, {
      kind,
      id,
      commanders: new Set(),
      scenarios: new Set(),
      entries: [],
    });
  }
  const item = profileUsage.get(key);
  item.commanders.add(usage.commander);
  item.scenarios.add(usage.scenario);
  item.entries.push(usage);
}

function loadProfileUsage() {
  const profileUsage = new Map();
  const entryRe = /CheckAbilityProfileEntry\([^,]+,\s*"([^"]+)",\s*([^,]+),\s*"([^"]*)",\s*"([^"]*)",\s*"([^"]*)",\s*"([^"]*)",\s*"([^"]*)"\)/g;
  const panelRe = /XMTestBench_CheckPanelProfile\([^,]+,\s*"([^"]+)",\s*"([^"]+)",\s*"([^"]+)",\s*"([^"]*)",\s*"([^"]*)",\s*"([^"]*)",\s*"([^"]*)",\s*"([^"]*)"/g;

  for (const fileName of profileFiles) {
    const file = path.join(xmfinalRoot, fileName);
    if (!fs.existsSync(file)) {
      continue;
    }
    const text = readText(file);
    let match;
    while ((match = entryRe.exec(text))) {
      const [, commander, scenarioExpression, objectId, buttonId, abilityId, requirementId, entryKind] = match;
      const usage = {
        sourceFile: fileName,
        source: "ability-profile",
        commander,
        scenario: scenarioExpression.includes("hero_ability") ? "hero_or_unit_dynamic" : "unit_or_evolution_dynamic",
        objectId,
        buttonId,
        abilityId,
        requirementId,
        entryKind,
      };
      addUsage(profileUsage, "button", buttonId, usage);
      addUsage(profileUsage, "ability", abilityId, usage);
      addUsage(profileUsage, "requirement", requirementId, usage);
    }
    while ((match = panelRe.exec(text))) {
      const [, commander, panelId, abilityId, buttonId, requirementId, casterId, targetMode, note] = match;
      const usage = {
        sourceFile: fileName,
        source: "panel-profile",
        commander,
        scenario: "panel_cost_smoke",
        objectId: casterId,
        buttonId,
        abilityId,
        requirementId,
        entryKind: targetMode || note || "panel",
        panelId,
      };
      addUsage(profileUsage, "button", buttonId, usage);
      addUsage(profileUsage, "ability", abilityId, usage);
      addUsage(profileUsage, "requirement", requirementId, usage);
    }
  }
  return profileUsage;
}

function loadManualFallbackIds() {
  const file = path.join(root, "scripts", "sc2", "import-xmfinal-ability-gap-catalog.mjs");
  const result = new Map();
  let currentKind = "";
  for (const line of readText(file).split(/\r?\n/u)) {
    const kindMatch = line.match(/^\s*(button|ability|requirement): new Map\(\[/);
    if (kindMatch) {
      currentKind = kindMatch[1];
      continue;
    }
    if (currentKind && /^\s*\]\),/.test(line)) {
      currentKind = "";
      continue;
    }
    if (!currentKind) {
      continue;
    }
    const entryMatch = line.match(/^\s*\["([^"]+)",\s*([A-Za-z0-9_]+)/);
    if (!entryMatch) {
      continue;
    }
    result.set(`${currentKind}:${entryMatch[1]}`, {
      kind: currentKind,
      id: entryMatch[1],
      factory: entryMatch[2],
    });
  }
  return result;
}

function normalizeRefId(value) {
  if (!value) {
    return "";
  }
  const raw = String(value).split(",")[0].trim();
  if (!raw || raw === "255" || raw === "None" || raw === "NONE" || raw === "0") {
    return "";
  }
  if (/^[0-9.\-]+$/u.test(raw)) {
    return "";
  }
  if (raw.includes("$") || raw.includes("{") || raw.includes("}") || raw.includes(" ")) {
    return "";
  }
  if (raw.startsWith("Abil/")) {
    return raw.replace(/^Abil\//u, "");
  }
  if (raw.includes("/") || raw.includes(":")) {
    return "";
  }
  return raw;
}

function addRef(refs, kind, id, field) {
  const normalized = normalizeRefId(id);
  if (!normalized || !knownKinds.has(kind)) {
    return;
  }
  refs.push({ kind, id: normalized, field });
}

function extractReferences(node) {
  const refs = [];
  const text = node.text;

  for (const match of text.matchAll(/<AbilArray\b[^>]*\bLink="([^"]+)"/g)) {
    addRef(refs, "ability", match[1], "AbilArray.Link");
  }
  for (const match of text.matchAll(/<BehaviorArray\b[^>]*\b(?:Link|value)="([^"]+)"/g)) {
    addRef(refs, "behavior", match[1], "BehaviorArray");
  }
  for (const match of text.matchAll(/<WeaponArray\b[^>]*\bLink="([^"]+)"/g)) {
    addRef(refs, "weapon", match[1], "WeaponArray.Link");
  }
  for (const match of text.matchAll(/\bAbilCmd="([^",]+)(?:,[^"]*)?"/g)) {
    addRef(refs, "ability", match[1], "AbilCmd");
  }
  for (const match of text.matchAll(/\bDefaultButtonFace="([^"]+)"/g)) {
    addRef(refs, "button", match[1], "DefaultButtonFace");
  }
  for (const match of text.matchAll(/\bFace="([^"]+)"/g)) {
    addRef(refs, "button", match[1], "Face");
  }
  for (const match of text.matchAll(/\bRequirements="([^"]+)"/g)) {
    addRef(refs, "requirement", match[1], "Requirements");
  }
  for (const match of text.matchAll(/<Requirements\b[^>]*\bvalue="([^"]+)"/g)) {
    addRef(refs, "requirement", match[1], "Requirements.value");
  }
  for (const match of text.matchAll(/<(?:Validator|[A-Za-z0-9_]*ValidatorArray|[A-Za-z0-9_]*Validator)\b[^>]*\bvalue="([^"]+)"/g)) {
    addRef(refs, "validator", match[1], "Validator");
  }
  for (const match of text.matchAll(/<(?:Effect|[A-Za-z0-9_]*Effect[A-Za-z0-9_]*)\b[^>]*\bvalue="([^"]+)"/g)) {
    addRef(refs, "effect", match[1], "Effect");
  }
  for (const match of text.matchAll(/\b(?:Effect|[A-Za-z0-9_]*Effect[A-Za-z0-9_]*)="([^"]+)"/g)) {
    addRef(refs, "effect", match[1], "EffectAttr");
  }
  for (const match of text.matchAll(/<(?:Behavior|[A-Za-z0-9_]*Behavior[A-Za-z0-9_]*)\b[^>]*\bvalue="([^"]+)"/g)) {
    addRef(refs, "behavior", match[1], "Behavior");
  }
  for (const match of text.matchAll(/\b(?:Behavior|[A-Za-z0-9_]*Behavior[A-Za-z0-9_]*)="([^"]+)"/g)) {
    addRef(refs, "behavior", match[1], "BehaviorAttr");
  }
  for (const match of text.matchAll(/<(?:Unit|[A-Za-z0-9_]*Unit[A-Za-z0-9_]*)\b[^>]*\bvalue="([^"]+)"/g)) {
    addRef(refs, "unit", match[1], "Unit");
  }
  for (const match of text.matchAll(/\b(?:Unit|[A-Za-z0-9_]*Unit[A-Za-z0-9_]*)="([^"]+)"/g)) {
    addRef(refs, "unit", match[1], "UnitAttr");
  }
  for (const match of text.matchAll(/<(?:Upgrade|[A-Za-z0-9_]*Upgrade[A-Za-z0-9_]*)\b[^>]*\bvalue="([^"]+)"/g)) {
    addRef(refs, "upgrade", match[1], "Upgrade");
  }
  for (const match of text.matchAll(/<(?:Button|[A-Za-z0-9_]*Button[A-Za-z0-9_]*)\b[^>]*\bvalue="([^"]+)"/g)) {
    addRef(refs, "button", match[1], "Button");
  }
  for (const match of text.matchAll(/<(?:Weapon|[A-Za-z0-9_]*Weapon[A-Za-z0-9_]*)\b[^>]*\bvalue="([^"]+)"/g)) {
    addRef(refs, "weapon", match[1], "Weapon");
  }

  const seen = new Set();
  return refs.filter((ref) => {
    const key = `${ref.kind}:${ref.id}:${ref.field}`;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

function nodeCompleteness(node, manualFallback, rootResolution) {
  if (!node) {
    if (rootResolution?.status === "xm-dependency") {
      return "external-xm-dependency-node";
    }
    if (rootResolution?.status === "official-reference") {
      return "external-official-reference-node";
    }
    if (rootResolution?.status === "builtin") {
      return "builtin";
    }
    return "missing-local-node";
  }
  if (node.kind === "button") {
    if (/<Icon\b|<AlertIcon\b|<Tooltip\b|<Hotkey\b/u.test(node.text)) {
      return manualFallback ? "manual-button-with-metadata" : "button-with-metadata";
    }
    return manualFallback ? "manual-button-stub" : "button-minimal";
  }
  if (node.kind === "requirement") {
    if (/<NodeArray\b|<OperandArray\b|<Expression\b/u.test(node.text)) {
      return manualFallback ? "manual-requirement-with-logic" : "requirement-with-logic";
    }
    return manualFallback ? "manual-requirement-stub" : "requirement-minimal";
  }
  if (node.kind === "ability") {
    if (/<(?:Effect|BehaviorArray|InfoArray|TrainArray|ResearchArray|SetId|CmdButtonArray\s+index="[^"]*")\b/u.test(node.text)
      && /<(?:Effect|BehaviorArray|InfoArray|TrainArray|ResearchArray)\b/u.test(node.text)) {
      return manualFallback ? "manual-ability-with-chain" : "ability-with-chain";
    }
    return manualFallback ? "manual-ability-stub" : "ability-minimal";
  }
  return manualFallback ? "manual-stub" : "catalog-node";
}

function isMetadataOnly(completeness) {
  return /stub|minimal|missing-local-node/u.test(completeness);
}

function sortedList(values) {
  return [...values].sort((a, b) => a.localeCompare(b));
}

function usageSummary(usage) {
  if (!usage) {
    return { commanders: "", scenarios: "", count: 0 };
  }
  return {
    commanders: sortedList(usage.commanders).join(","),
    scenarios: sortedList(usage.scenarios).join(","),
    count: usage.entries.length,
  };
}

function traceDependencies(index, rootNode, maxDepth) {
  const issues = [];
  const queue = [{ node: rootNode, depth: 0, via: `${rootNode.kind}:${rootNode.id}` }];
  const visited = new Set([`${rootNode.kind}:${rootNode.id}`]);

  while (queue.length > 0) {
    const item = queue.shift();
    if (item.depth >= maxDepth) {
      continue;
    }
    for (const ref of extractReferences(item.node)) {
      const key = `${ref.kind}:${ref.id}`;
      const resolution = resolveReference(index, ref.kind, ref.id);
      if (resolution.status === "builtin") {
        continue;
      }
      if (resolution.status !== "local") {
        issues.push({
          rootKind: rootNode.kind,
          rootId: rootNode.id,
          fromKind: item.node.kind,
          fromId: item.node.id,
          refKind: ref.kind,
          refId: ref.id,
          field: ref.field,
          resolution: resolution.status,
          source: resolution.node?.source ?? "",
          depth: item.depth + 1,
          via: item.via,
        });
        continue;
      }
      if (!visited.has(key)) {
        visited.add(key);
        queue.push({
          node: resolution.node,
          depth: item.depth + 1,
          via: `${item.via} -> ${ref.kind}:${ref.id}`,
        });
      }
    }
  }
  return issues;
}

function escapeTsv(value) {
  return String(value ?? "").replaceAll("\t", " ").replaceAll("\r", " ").replaceAll("\n", " ");
}

function tsvLine(values) {
  return values.map(escapeTsv).join("\t");
}

function renderMarkdown(summary, topIssues, outputDir) {
  const lines = [];
  lines.push("# XMFinal Catalog 深层依赖扫描");
  lines.push("");
  lines.push(`生成时间：${new Date().toISOString()}`);
  lines.push("");
  lines.push("## 范围");
  lines.push("");
  lines.push("- 输入：`原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data` 下生成出的 commander ability/panel Galaxy profile。");
  lines.push("- 检查：XMFinal 本地 Catalog 节点、manual fallback stub、递归引用中只由 XM 依赖或官方导出提供的节点。");
  lines.push("- 这是静态 metadata 分析，不证明 SC2 实机施法、效果、费用、冷却、actor 或目标过滤已经闭环。");
  lines.push("");
  lines.push("## 摘要");
  lines.push("");
  lines.push(`- Profile 使用的 Catalog ID：${summary.profileTotal}`);
  lines.push(`- Profile 使用的 manual fallback ID：${summary.manualFallbackUsed}`);
  lines.push(`- Profile 使用的 metadata-only 本地节点：${summary.metadataOnly}`);
  lines.push(`- 递归依赖风险行：${summary.issueTotal}`);
  lines.push(`- 未解析引用：${summary.missing}`);
  lines.push(`- 仅由 XM 依赖模块提供：${summary.xmDependency}`);
  lines.push(`- 仅由官方导出引用提供：${summary.officialReference}`);
  lines.push("");
  lines.push("## 输出文件");
  lines.push("");
  lines.push("- `xmfinal-catalog-stub-inventory.tsv`");
  lines.push("- `xmfinal-catalog-dependency-issues.tsv`");
  lines.push("- `xmfinal-catalog-dependency-summary.json`");
  lines.push("");
  lines.push("## 高风险 Profile ID");
  lines.push("");
  if (topIssues.length === 0) {
    lines.push("- 未发现 missing 或 external 递归引用行。");
  } else {
    lines.push("| 类型 | ID | 指挥官 | 完整度 | Manual Fallback | 风险行 | Missing | External |");
    lines.push("|---|---:|---|---|---:|---:|---:|---:|");
    for (const issue of topIssues.slice(0, 30)) {
      lines.push(`| ${issue.kind} | ${issue.id} | ${issue.commanders} | ${issue.completeness} | ${issue.manualFallback ? "yes" : "no"} | ${issue.issueRows} | ${issue.missing} | ${issue.external} |`);
    }
  }
  lines.push("");
  lines.push("## 使用方式");
  lines.push("");
  lines.push("1. `manual-*-stub` 和 `*-minimal` 行只代表 metadata-only smoke helper。");
  lines.push("2. `missing` 依赖行是无需实机即可继续处理的离线候选项。");
  lines.push("3. `xm-dependency` / `official-reference` 行是运行时依赖假设；如果实机 smoke 失败，再确认地图依赖是否加载，或把对应节点导入 XMFinal。");
  lines.push("");
  lines.push(`输出目录：\`${path.relative(root, outputDir).replaceAll("\\", "/")}\``);
  lines.push("");
  return `${lines.join("\n")}\n`;
}

function main() {
  const args = parseArgs();
  if (args.has("help") || args.has("h")) {
    console.log("Usage: node scripts/sc2/audit-xmfinal-catalog-dependencies.mjs [--output-dir <path>] [--max-depth <n>]");
    return;
  }

  const outputDir = path.resolve(String(args.get("output-dir") ?? defaultOutputDir));
  const maxDepth = Number(args.get("max-depth") ?? 3);
  const catalogIndex = loadCatalogIndex();
  const profileUsage = loadProfileUsage();
  const manualFallbackIds = loadManualFallbackIds();
  const inventoryRows = [
    tsvLine(["Kind", "Id", "Commanders", "Scenarios", "ProfileUsageCount", "LocalTag", "LocalSource", "Completeness", "ManualFallback", "ManualFactory", "DirectReferenceCount", "IssueRows", "MissingRows", "ExternalRows"]),
  ];
  const issueRows = [
    tsvLine(["RootKind", "RootId", "RootCommanders", "RootCompleteness", "RootManualFallback", "FromKind", "FromId", "RefKind", "RefId", "Field", "Resolution", "Source", "Depth", "Via"]),
  ];
  const summaryItems = [];
  let metadataOnly = 0;
  let manualFallbackUsed = 0;
  let missing = 0;
  let xmDependency = 0;
  let officialReference = 0;

  for (const usage of [...profileUsage.values()].sort((a, b) => `${a.kind}:${a.id}`.localeCompare(`${b.kind}:${b.id}`))) {
    const fallback = manualFallbackIds.get(`${usage.kind}:${usage.id}`);
    const rootResolution = resolveReference(catalogIndex, usage.kind, usage.id);
    const node = rootResolution.status === "local" ? rootResolution.node : localNode(catalogIndex, usage.kind, usage.id);
    const completeness = nodeCompleteness(node, fallback, rootResolution);
    const usageInfo = usageSummary(usage);
    const dependencyIssues = node
      ? traceDependencies(catalogIndex, node, maxDepth)
      : rootResolution.status === "builtin"
        ? []
        : [{
          rootKind: usage.kind,
          rootId: usage.id,
          fromKind: "",
          fromId: "",
          refKind: usage.kind,
          refId: usage.id,
          field: "profile-root",
          resolution: rootResolution.status,
          source: rootResolution.node?.source ?? "",
          depth: 0,
          via: `${usage.kind}:${usage.id}`,
        }];
    const missingRows = dependencyIssues.filter((issue) => issue.resolution === "missing").length;
    const externalRows = dependencyIssues.filter((issue) => issue.resolution === "xm-dependency" || issue.resolution === "official-reference").length;

    if (fallback) {
      manualFallbackUsed += 1;
    }
    if (isMetadataOnly(completeness)) {
      metadataOnly += 1;
    }
    missing += missingRows;
    xmDependency += dependencyIssues.filter((issue) => issue.resolution === "xm-dependency").length;
    officialReference += dependencyIssues.filter((issue) => issue.resolution === "official-reference").length;

    inventoryRows.push(tsvLine([
      usage.kind,
      usage.id,
      usageInfo.commanders,
      usageInfo.scenarios,
      usageInfo.count,
      node?.tag ?? "",
      node?.source ?? "",
      completeness,
      fallback ? "yes" : "no",
      fallback?.factory ?? "",
      node ? extractReferences(node).length : 0,
      dependencyIssues.length,
      missingRows,
      externalRows,
    ]));

    for (const issue of dependencyIssues) {
      issueRows.push(tsvLine([
        usage.kind,
        usage.id,
        usageInfo.commanders,
        completeness,
        fallback ? "yes" : "no",
        issue.fromKind,
        issue.fromId,
        issue.refKind,
        issue.refId,
        issue.field,
        issue.resolution,
        issue.source,
        issue.depth,
        issue.via,
      ]));
    }

    summaryItems.push({
      kind: usage.kind,
      id: usage.id,
      commanders: usageInfo.commanders,
      scenarios: usageInfo.scenarios,
      profileUsageCount: usageInfo.count,
      localTag: node?.tag ?? "",
      localSource: node?.source ?? "",
      completeness,
      manualFallback: Boolean(fallback),
      manualFactory: fallback?.factory ?? "",
      issueRows: dependencyIssues.length,
      missing: missingRows,
      external: externalRows,
    });
  }

  const summary = {
    generatedAt: new Date().toISOString(),
    maxDepth,
    profileTotal: profileUsage.size,
    manualFallbackUsed,
    metadataOnly,
    issueTotal: missing + xmDependency + officialReference,
    missing,
    xmDependency,
    officialReference,
    outputDir: path.relative(root, outputDir).replaceAll("\\", "/"),
    byKind: Object.fromEntries(["button", "ability", "requirement"].map((kind) => [
      kind,
      {
        profileIds: summaryItems.filter((item) => item.kind === kind).length,
        manualFallback: summaryItems.filter((item) => item.kind === kind && item.manualFallback).length,
        metadataOnly: summaryItems.filter((item) => item.kind === kind && isMetadataOnly(item.completeness)).length,
      },
    ])),
  };

  const topIssues = summaryItems
    .filter((item) => item.manualFallback || isMetadataOnly(item.completeness) || item.missing > 0 || item.external > 0)
    .sort((a, b) =>
      (b.missing - a.missing)
      || (b.manualFallback - a.manualFallback)
      || (b.external - a.external)
      || a.kind.localeCompare(b.kind)
      || a.id.localeCompare(b.id),
    );

  writeText(path.join(outputDir, "xmfinal-catalog-stub-inventory.tsv"), `${inventoryRows.join("\r\n")}\r\n`);
  writeText(path.join(outputDir, "xmfinal-catalog-dependency-issues.tsv"), `${issueRows.join("\r\n")}\r\n`);
  writeText(path.join(outputDir, "xmfinal-catalog-dependency-summary.json"), `${JSON.stringify({
    ...summary,
    topIssues,
  }, null, 2)}\n`);
  writeText(path.join(outputDir, "README.md"), renderMarkdown(summary, topIssues, outputDir));

  console.log(`XMFINAL_CATALOG_DEP_PROFILE_IDS=${summary.profileTotal}`);
  console.log(`XMFINAL_CATALOG_DEP_MANUAL_FALLBACK_USED=${summary.manualFallbackUsed}`);
  console.log(`XMFINAL_CATALOG_DEP_METADATA_ONLY=${summary.metadataOnly}`);
  console.log(`XMFINAL_CATALOG_DEP_MISSING=${summary.missing}`);
  console.log(`XMFINAL_CATALOG_DEP_XM_DEPENDENCY=${summary.xmDependency}`);
  console.log(`XMFINAL_CATALOG_DEP_OFFICIAL_REFERENCE=${summary.officialReference}`);
  console.log(`XMFINAL_CATALOG_DEP_OUTPUT=${outputDir}`);
}

main();
