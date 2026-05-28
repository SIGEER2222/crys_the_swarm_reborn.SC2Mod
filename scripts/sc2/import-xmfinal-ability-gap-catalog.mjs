import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const commandersRoot = path.join(root, "游戏数据", "官方合作指挥官", "commanders");
const xmfinalRoot = path.join(root, "原始mod", "Mods", "XM", "XMFinal.SC2Mod", "Base.SC2Data");
const targetRoot = path.join(xmfinalRoot, "GameData");
const defaultSummaryPath = path.join(root, "references", "xmfinal-ability-gap-import-summary.tsv");

const profileFiles = [
  "LibE0EAE146_CommanderUnitAbilities.galaxy",
  "LibE0EAE146_CommanderHeroAbilities.galaxy",
];

const officialBaseMods = [
  "core.sc2mod",
  "liberty.sc2mod",
  "libertymulti.sc2mod",
  "swarm.sc2mod",
  "swarmmulti.sc2mod",
  "void.sc2mod",
  "voidmulti.sc2mod",
].map((name) => path.join(root, "references", "sc2-build-96883-casc-export", "mods", name));

const officialRoots = [
  path.join(root, "references", "sc2-build-96883-casc-export", "mods", "starcoop", "starcoop.sc2mod", "base.sc2data", "gamedata"),
  path.join(root, "references", "sc2-build-96883-casc-export", "mods", "starcoop", "commanders", "egonstetmann.sc2mod", "base.sc2data", "gamedata"),
  path.join(root, "references", "sc2-build-96883-casc-export", "mods", "starcoop", "commanders", "arcturusmengsk.sc2mod", "base.sc2data", "gamedata"),
  ...officialBaseMods,
];

const catalogFiles = new Map([
  ["button", "ButtonData.xml"],
  ["ability", "AbilData.xml"],
  ["requirement", "RequirementData.xml"],
]);

const manualFallbackNodes = {
  button: new Map([
    ["BurrowDown", buttonStub("BurrowDown")],
    ["SwarmHostBurrowDown", buttonStub("SwarmHostBurrowDown")],
    ["RapidRegeneration", buttonStub("RapidRegeneration")],
    ["Frenzied", buttonStub("Frenzied")],
    ["ImpalerBurrowDown", buttonStub("ImpalerBurrowDown")],
    ["CloakOnBanshee", buttonStub("CloakOnBanshee")],
    ["CloakOff", buttonStub("CloakOff")],
    ["ConcussiveGrenade", buttonStub("ConcussiveGrenade")],
    ["YamatoGun", buttonStub("YamatoGun")],
    ["Hyperjump", buttonStub("Hyperjump")],
    ["SiegeMode", buttonStub("SiegeMode")],
    ["PermanentlyCloakedGhost", buttonStub("PermanentlyCloakedGhost")],
    ["GhostHoldFire", buttonStub("GhostHoldFire")],
    ["WeaponsFree", buttonStub("WeaponsFree")],
    ["NukeCalldown", buttonStub("NukeCalldown")],
    ["EMP", buttonStub("EMP")],
    ["CloakOnGhost", buttonStub("CloakOnGhost")],
    ["LaserTargetingSystemMarine", buttonStub("LaserTargetingSystemMarine")],
    ["Detector", buttonStub("Detector")],
    ["CombatDrugs", buttonStub("CombatDrugs")],
    ["VoidSentryShieldRepair", buttonStubWithIcon("VoidSentryShieldRepair", "Assets\\Textures\\BTN-Ability-Protoss-ShieldRecharge.dds")],
  ]),
  ability: new Map([
    ["Stimpack", abilityStub("CAbilEffectInstant", "Stimpack", "Stim")],
    ["StimpackMarauder", abilityStub("CAbilEffectInstant", "StimpackMarauder", "StimMarauder")],
    ["BansheeCloak", behaviorToggleStub("BansheeCloak", "CloakOnBanshee", "CloakOff")],
    ["GhostHoldFire", abilityStub("CAbilEffectInstant", "GhostHoldFire", "GhostHoldFire")],
    ["GhostWeaponsFree", abilityStub("CAbilEffectInstant", "GhostWeaponsFree", "WeaponsFree")],
    ["LiberatorAGTarget", abilityStub("CAbilEffectTarget", "LiberatorAGTarget", "LiberatorAGMode")],
    ["LockOnCancel", abilityStub("CAbilEffectInstant", "LockOnCancel", "LockOnCancel")],
    ["TacNukeStrike", abilityStub("CAbilEffectTarget", "TacNukeStrike", "NukeCalldown")],
    ["SiegeMode", abilityStub("CAbilMorph", "SiegeMode", "SiegeMode")],
    ["VoidScienceVesselNanoRepair", abilityStub("CAbilEffectTarget", "VoidScienceVesselNanoRepair", "NanoRepair")],
  ]),
  requirement: new Map([
    ["HaveLiberatorRange", requirementStub("HaveLiberatorRange")],
    ["UsePunisherGrenades", requirementStub("UsePunisherGrenades")],
  ]),
};

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

function catalogKindForTag(tag) {
  return tagKinds.get(tag) ?? (tag.startsWith("CAbil") ? "ability" : undefined);
}

function manualNode(kind, tag, id, body) {
  return {
    fileName: "manual:xmfinal-profile-catalog-stub",
    tag,
    id,
    text: body,
    manualFallback: true,
  };
}

function buttonStub(id) {
  return manualNode("button", "CButton", id, [
    `<CButton id="${id}">`,
    '    <EditorCategories value="Race:Neutral"/>',
    "</CButton>",
  ].join("\n"));
}

function buttonStubWithIcon(id, icon) {
  return manualNode("button", "CButton", id, [
    `<CButton id="${id}">`,
    `    <Icon value="${icon}"/>`,
    `    <AlertIcon value="${icon}"/>`,
    '    <EditorCategories value="Race:Protoss"/>',
    "</CButton>",
  ].join("\n"));
}

function abilityStub(tag, id, buttonId) {
  return manualNode("ability", tag, id, [
    `<${tag} id="${id}">`,
    `    <CmdButtonArray index="Execute" DefaultButtonFace="${buttonId}"/>`,
    `</${tag}>`,
  ].join("\n"));
}

function behaviorToggleStub(id, onButtonId, offButtonId) {
  return manualNode("ability", "CAbilBehavior", id, [
    `<CAbilBehavior id="${id}">`,
    '    <AbilSetId value="Clok"/>',
    `    <CmdButtonArray index="On" DefaultButtonFace="${onButtonId}"/>`,
    `    <CmdButtonArray index="Off" DefaultButtonFace="${offButtonId}"/>`,
    '    <Flags index="Toggle" value="1"/>',
    "</CAbilBehavior>",
  ].join("\n"));
}

function requirementStub(id) {
  return manualNode("requirement", "CRequirement", id, [
    `<CRequirement id="${id}">`,
    '    <EditorCategories value="Race:Neutral,TechType:Ability"/>',
    "</CRequirement>",
  ].join("\n"));
}

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

function parseCommanderSet(value) {
  if (!value) {
    return undefined;
  }
  const names = String(value)
    .split(/[,\s]+/u)
    .map((item) => item.trim())
    .filter(Boolean);
  return names.length > 0 ? new Set(names) : undefined;
}

function printUsage() {
  console.log([
    "Usage: node scripts/sc2/import-xmfinal-ability-gap-catalog.mjs [--commanders Raynor,Nova,Dehaka] [--summary path]",
    "",
    "Imports button/ability/requirement catalog nodes referenced by generated commander ability profiles.",
    "Use --commanders to keep a run scoped to selected commander names.",
  ].join("\n"));
}

function readText(file) {
  return fs.readFileSync(file, "utf8");
}

function readJson(file) {
  return JSON.parse(readText(file));
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

function hasExistingId(keys, id) {
  return [...keys].some((key) => key.endsWith(`|${id}`));
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

function xmlEscape(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function renderCatalogNode(node) {
  return `    ${node.text.replaceAll("\n", "\n    ")}`;
}

function commanderSelected(selectedCommanders, commander) {
  return !selectedCommanders || selectedCommanders.has(commander);
}

function commanderNames(selectedCommanders) {
  return fs
    .readdirSync(commandersRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((commander) => commanderSelected(selectedCommanders, commander))
    .sort();
}

function synthesizeButtonNode(button, sourceName) {
  const lines = [`<CButton id="${xmlEscape(button.id)}">`];
  if (button.icon) {
    lines.push(`    <Icon value="${xmlEscape(button.icon)}"/>`);
  }
  if (button.alert_icon) {
    lines.push(`    <AlertIcon value="${xmlEscape(button.alert_icon)}"/>`);
  }
  if (button.tooltip_key) {
    lines.push(`    <Tooltip value="${xmlEscape(button.tooltip_key)}"/>`);
  }
  lines.push("</CButton>");
  return {
    fileName: sourceName,
    tag: "CButton",
    id: button.id,
    text: lines.join("\r\n"),
    generatedFromCommanderJson: true,
  };
}

function loadCommanderButtonNodes(selectedCommanders) {
  const buttons = new Map();

  for (const commander of commanderNames(selectedCommanders)) {
    const file = path.join(commandersRoot, commander, "command_cards.json");
    if (!fs.existsSync(file)) {
      continue;
    }

    const sourceName = path.relative(root, file).replaceAll("\\", "/");
    for (const object of readJson(file)) {
      for (const card of object.cards ?? []) {
        for (const entry of card.buttons ?? []) {
          const button = entry.button;
          if (!button?.id || buttons.has(button.id)) {
            continue;
          }
          if (!button.icon && !button.alert_icon && !button.tooltip_key) {
            continue;
          }
          buttons.set(button.id, synthesizeButtonNode(button, sourceName));
        }
      }
    }
  }

  return buttons;
}

function upgradeManualButtonStubs(targetFile, commanderButtonNodes) {
  if (!fs.existsSync(targetFile) || commanderButtonNodes.size === 0) {
    return { upgraded: 0, rows: [] };
  }

  let text = readText(targetFile);
  let upgraded = 0;
  const rows = [];
  for (const node of commanderButtonNodes.values()) {
    const re = new RegExp(
      `    <CButton id="${escapeRegExp(node.id)}">\\s*<EditorCategories value="Race:Neutral"\\/>\\s*</CButton>`,
      "m",
    );
    if (!re.test(text)) {
      continue;
    }
    text = text.replace(re, renderCatalogNode(node));
    upgraded += 1;
    rows.push(["button", node.id, node.tag, node.fileName, targetFile, "upgraded_manual_stub_from_commander_json"].join("\t"));
  }

  if (upgraded > 0) {
    fs.writeFileSync(targetFile, text, "utf8");
  }

  return { upgraded, rows };
}

function collectProfileIds(selectedCommanders) {
  const ids = {
    button: new Set(),
    ability: new Set(),
    requirement: new Set(),
  };
  const entryRe =
    /CheckAbilityProfileEntry\([^,]+,\s*"([^"]+)",\s*[^,]+,\s*"[^"]*",\s*"([^"]*)",\s*"([^"]*)",\s*"([^"]*)",\s*"[^"]*"\)/g;

  for (const file of profileFiles) {
    const text = readText(path.join(xmfinalRoot, file));
    let match;
    while ((match = entryRe.exec(text))) {
      const [, commander, buttonId, abilityId, requirementId] = match;
      if (!commanderSelected(selectedCommanders, commander)) {
        continue;
      }
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
        const kind = catalogKindForTag(node.tag);
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

function loadXmDependencyIds() {
  const ids = {
    button: new Map(),
    ability: new Map(),
    requirement: new Map(),
  };
  const xmRoot = path.join(root, "原始mod", "Mods", "XM");
  const targetPrefix = `${path.resolve(xmfinalRoot).toLowerCase()}${path.sep}`;

  for (const file of walk(xmRoot).sort()) {
    const resolved = path.resolve(file).toLowerCase();
    if (resolved.startsWith(targetPrefix)) {
      continue;
    }
    if (!file.toLowerCase().endsWith(".xml")) {
      continue;
    }
    if (!file.replaceAll("\\", "/").toLowerCase().includes("/gamedata/")) {
      continue;
    }

    const sourceName = path.relative(root, file).replaceAll("\\", "/");
    for (const node of parseCatalogNodes(readText(file), sourceName)) {
      const kind = catalogKindForTag(node.tag);
      if (!kind || !ids[kind]) {
        continue;
      }
      if (!ids[kind].has(node.id)) {
        ids[kind].set(node.id, []);
      }
      ids[kind].get(node.id).push(sourceName);
    }
  }

  return ids;
}

function main() {
  const args = parseArgs();
  if (args.has("help") || args.has("h")) {
    printUsage();
    return;
  }

  const summaryPath = path.resolve(String(args.get("summary") ?? defaultSummaryPath));
  const selectedCommanders = parseCommanderSet(args.get("commanders"));
  const profileIds = collectProfileIds(selectedCommanders);
  const officialNodes = loadOfficialNodes();
  const commanderButtonNodes = loadCommanderButtonNodes(selectedCommanders);
  const xmDependencyIds = loadXmDependencyIds();
  const summaryRows = ["Kind\tObjectId\tCatalogType\tOfficialSource\tTargetFile\tStatus"];
  let addedTotal = 0;
  let skippedTotal = 0;
  let missingTotal = 0;
  let upgradedTotal = 0;

  for (const [kind, targetFileName] of catalogFiles) {
    const targetFile = path.join(targetRoot, targetFileName);
    if (kind === "button") {
      const upgradeResult = upgradeManualButtonStubs(targetFile, commanderButtonNodes);
      upgradedTotal += upgradeResult.upgraded;
      summaryRows.push(...upgradeResult.rows);
    }
    const beforeKeys = existingKeys(fs.existsSync(targetFile) ? readText(targetFile) : "");
    const nodesToAppend = [];

    for (const id of [...profileIds[kind]].sort()) {
      const matches = officialNodes[kind].get(id) ?? [];
      if (matches.length === 0) {
        const synthesizedButton = kind === "button" ? commanderButtonNodes.get(id) : undefined;
        const fallbackNode = manualFallbackNodes[kind]?.get(id);
        if (synthesizedButton) {
          nodesToAppend.push(synthesizedButton);
        } else if (fallbackNode) {
          nodesToAppend.push(fallbackNode);
        } else if (hasExistingId(beforeKeys, id)) {
          summaryRows.push([kind, id, "", "local:xmfinal-target-catalog", targetFile, "skipped_existing_local"].join("\t"));
        } else if (xmDependencyIds[kind]?.has(id)) {
          summaryRows.push([kind, id, "", xmDependencyIds[kind].get(id)[0], targetFile, "skipped_existing_xm_dependency"].join("\t"));
        } else {
          missingTotal += 1;
          summaryRows.push([kind, id, "", "", targetFile, "missing_in_official_sources"].join("\t"));
        }
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
      const status = beforeKeys.has(objectKey(node))
        ? "skipped_existing"
        : node.generatedFromCommanderJson
          ? "generated_from_commander_json"
        : node.manualFallback
          ? "added_manual_stub"
          : "added_or_newer_duplicate";
      summaryRows.push([kind, node.id, node.tag, node.fileName, targetFile, status].join("\t"));
    }
  }

  fs.mkdirSync(path.dirname(summaryPath), { recursive: true });
  fs.writeFileSync(summaryPath, `${summaryRows.join("\r\n")}\r\n`, "utf8");

  console.log(`XMFINAL_ABILITY_GAP_PROFILE_BUTTON_IDS=${profileIds.button.size}`);
  console.log(`XMFINAL_ABILITY_GAP_PROFILE_ABILITY_IDS=${profileIds.ability.size}`);
  console.log(`XMFINAL_ABILITY_GAP_PROFILE_REQUIREMENT_IDS=${profileIds.requirement.size}`);
  console.log(`XMFINAL_ABILITY_GAP_COMMANDERS=${selectedCommanders ? [...selectedCommanders].join(",") : "all"}`);
  console.log(`XMFINAL_ABILITY_GAP_ADDED_NODES=${addedTotal}`);
  console.log(`XMFINAL_ABILITY_GAP_SKIPPED_NODES=${skippedTotal}`);
  console.log(`XMFINAL_ABILITY_GAP_UPGRADED_MANUAL_BUTTON_STUBS=${upgradedTotal}`);
  console.log(`XMFINAL_ABILITY_GAP_MISSING_IN_OFFICIAL=${missingTotal}`);
  console.log(`XMFINAL_ABILITY_GAP_SUMMARY=${summaryPath}`);
}

main();
