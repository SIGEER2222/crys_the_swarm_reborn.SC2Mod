import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const xmfinalRoot = path.join(root, "原始mod", "Mods", "XM", "XMFinal.SC2Mod", "Base.SC2Data");
const targetRoot = path.join(xmfinalRoot, "GameData");
const defaultSummaryPath = path.join(root, "references", "xmfinal-ability-gap-import-summary.tsv");

const profileFiles = [
  "LibE0EAE146_CommanderUnitAbilities.galaxy",
  "LibE0EAE146_CommanderHeroAbilities.galaxy",
];

const officialRoots = [
  path.join(root, "references", "sc2-build-96883-casc-export", "mods", "starcoop", "starcoop.sc2mod", "base.sc2data", "gamedata"),
  path.join(root, "references", "sc2-build-96883-casc-export", "mods", "starcoop", "commanders", "egonstetmann.sc2mod", "base.sc2data", "gamedata"),
  path.join(root, "references", "sc2-build-96883-casc-export", "mods", "starcoop", "commanders", "arcturusmengsk.sc2mod", "base.sc2data", "gamedata"),
];

const catalogFiles = new Map([
  ["button", "ButtonData.xml"],
  ["ability", "AbilData.xml"],
  ["requirement", "RequirementData.xml"],
]);

const tagKinds = new Map([
  ["CButton", "button"],
  ["CRequirement", "requirement"],
  ["CAbilArmMagazine", "ability"],
  ["CAbilAttack", "ability"],
  ["CAbilAugment", "ability"],
  ["CAbilBattery", "ability"],
  ["CAbilBehavior", "ability"],
  ["CAbilBuild", "ability"],
  ["CAbilEffectInstant", "ability"],
  ["CAbilEffectTarget", "ability"],
  ["CAbilInteract", "ability"],
  ["CAbilMerge", "ability"],
  ["CAbilMorph", "ability"],
  ["CAbilMorphPlacement", "ability"],
  ["CAbilPawn", "ability"],
  ["CAbilQueue", "ability"],
  ["CAbilRedirect", "ability"],
  ["CAbilResearch", "ability"],
  ["CAbilSpecialize", "ability"],
  ["CAbilStop", "ability"],
  ["CAbilTrain", "ability"],
  ["CAbilTransport", "ability"],
  ["CAbilWarpTrain", "ability"],
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

function ensureCatalogText(text) {
  const trimmed = text.trim();
  if (!trimmed) {
    return '<?xml version="1.0" encoding="utf-8"?>\r\n<Catalog>\r\n</Catalog>\r\n';
  }
  if (/<Catalog\s*\/>/i.test(trimmed)) {
    return `${trimmed.replace(/<Catalog\s*\/>/i, "<Catalog>\r\n</Catalog>")}\r\n`;
  }
  return text;
}

function objectKey(node) {
  return `${node.tag}|${node.id}`;
}

function existingKeys(text) {
  return new Set(parseCatalogNodes(ensureCatalogText(text), "").map(objectKey));
}

function catalogInsertPosition(text) {
  const closeIndex = text.lastIndexOf("</Catalog>");
  return closeIndex >= 0 ? closeIndex : text.length;
}

function appendNodes(targetFile, nodes) {
  const originalText = ensureCatalogText(fs.existsSync(targetFile) ? readText(targetFile) : "");
  const keys = existingKeys(originalText);
  const additions = [];
  for (const node of nodes) {
    if (keys.has(objectKey(node))) {
      continue;
    }
    keys.add(objectKey(node));
    additions.push(node);
  }

  if (additions.length === 0) {
    return { added: 0, skipped: nodes.length };
  }

  fs.mkdirSync(path.dirname(targetFile), { recursive: true });
  const insertion = additions
    .map((node) => `    ${node.text.replaceAll("\n", "\n    ")}`)
    .join("\r\n");
  const insertAt = catalogInsertPosition(originalText);
  const before = originalText.slice(0, insertAt).replace(/\s*$/, "\r\n");
  const after = originalText.slice(insertAt);
  fs.writeFileSync(targetFile, `${before}${insertion}\r\n${after}`, "utf8");
  return { added: additions.length, skipped: nodes.length - additions.length };
}

function collectProfileIds() {
  const ids = {
    button: new Set(),
    ability: new Set(),
    requirement: new Set(),
  };
  const entryRe =
    /CheckAbilityProfileEntry\([^,]+,\s*"[^"]+",\s*[^,]+,\s*"[^"]*",\s*"([^"]*)",\s*"([^"]*)",\s*"([^"]*)",\s*"[^"]*"\)/g;

  for (const file of profileFiles) {
    const text = readText(path.join(xmfinalRoot, file));
    let match;
    while ((match = entryRe.exec(text))) {
      const [, buttonId, abilityId, requirementId] = match;
      if (buttonId) {
        ids.button.add(buttonId);
      }
      if (abilityId) {
        ids.ability.add(abilityId);
      }
      if (requirementId) {
        ids.requirement.add(requirementId);
      }
    }
  }
  return ids;
}

function loadOfficialNodes() {
  const nodes = {
    button: new Map(),
    ability: new Map(),
    requirement: new Map(),
  };

  for (const officialRoot of officialRoots) {
    for (const file of walk(officialRoot).sort()) {
      if (!file.toLowerCase().endsWith(".xml")) {
        continue;
      }
      const sourceName = path.relative(root, file).replaceAll("\\", "/");
      for (const node of parseCatalogNodes(readText(file), sourceName)) {
        const kind = tagKinds.get(node.tag);
        if (!kind) {
          continue;
        }
        if (!nodes[kind].has(node.id)) {
          nodes[kind].set(node.id, []);
        }
        nodes[kind].get(node.id).push({ ...node, fileName: sourceName });
      }
    }
  }

  return nodes;
}

function main() {
  const args = parseArgs();
  const summaryPath = path.resolve(String(args.get("summary") ?? defaultSummaryPath));
  const profileIds = collectProfileIds();
  const officialNodes = loadOfficialNodes();
  const summaryRows = ["Kind\tObjectId\tCatalogType\tOfficialSource\tTargetFile\tStatus"];
  let addedTotal = 0;
  let skippedTotal = 0;
  let missingTotal = 0;

  for (const [kind, targetFileName] of catalogFiles) {
    const targetFile = path.join(targetRoot, targetFileName);
    const beforeKeys = existingKeys(fs.existsSync(targetFile) ? readText(targetFile) : "");
    const nodesToAppend = [];

    for (const id of [...profileIds[kind]].sort()) {
      const matches = officialNodes[kind].get(id) ?? [];
      if (matches.length === 0) {
        missingTotal += 1;
        summaryRows.push([kind, id, "", "", targetFile, "missing_in_official_sources"].join("\t"));
        continue;
      }
      for (const node of matches) {
        nodesToAppend.push(node);
      }
    }

    const result = appendNodes(
      targetFile,
      nodesToAppend.sort((a, b) => `${a.id}|${a.tag}`.localeCompare(`${b.id}|${b.tag}`)),
    );
    addedTotal += result.added;
    skippedTotal += result.skipped;

    for (const node of nodesToAppend) {
      const status = beforeKeys.has(objectKey(node)) ? "skipped_existing" : "added_or_newer_duplicate";
      summaryRows.push([kind, node.id, node.tag, node.fileName, targetFile, status].join("\t"));
    }
  }

  fs.mkdirSync(path.dirname(summaryPath), { recursive: true });
  fs.writeFileSync(summaryPath, `${summaryRows.join("\r\n")}\r\n`, "utf8");

  console.log(`XMFINAL_ABILITY_GAP_PROFILE_BUTTON_IDS=${profileIds.button.size}`);
  console.log(`XMFINAL_ABILITY_GAP_PROFILE_ABILITY_IDS=${profileIds.ability.size}`);
  console.log(`XMFINAL_ABILITY_GAP_PROFILE_REQUIREMENT_IDS=${profileIds.requirement.size}`);
  console.log(`XMFINAL_ABILITY_GAP_ADDED_NODES=${addedTotal}`);
  console.log(`XMFINAL_ABILITY_GAP_SKIPPED_NODES=${skippedTotal}`);
  console.log(`XMFINAL_ABILITY_GAP_MISSING_IN_OFFICIAL=${missingTotal}`);
  console.log(`XMFINAL_ABILITY_GAP_SUMMARY=${summaryPath}`);
}

main();
