import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const officialRoot = path.join(
  root,
  "references",
  "sc2-build-96883-casc-export",
  "mods",
  "starcoop",
  "starcoop.sc2mod",
  "base.sc2data",
  "gamedata",
);
const targetRoot = path.join(root, "原始mod", "Mods", "XM", "XMFinal.SC2Mod", "Base.SC2Data", "GameData");
const defaultSummaryPath = path.join(root, "references", "xmfinal-roster-gap-import-summary.tsv");

const seedIds = [
  "SwarmHost",
  "SwarmQueen",
  "RoachCorpser",
  "RoachVile",
  "RavagerAbathur",
  "Brutalisk",
  "Leviathan",
  "ColossusTaldarim",
  "HighTemplarTaldarim",
  "ImmortalTaldarim",
  "Monitor",
  "Supplicant",
  "WarpPrismTaldarim",
  "ImmortalAiur",
  "PhoenixAiur",
  "Dragoon",
  "RoboticsFacilityWarp",
  "ColossusPurifier",
  "Scout",
  "SentryFenix",
  "ZealotPurifier",
  "PhoenixPurifier",
  "SentryPurifier",
  "SolarForge",
  "K5Kerrigan",
  "MutaliskBroodlord",
  "DarkTemplarShakuras",
  "ZealotShakuras",
  "ZagaraVoidCoop",
  "InfestedAbomination",
  "Scourge",
  "ZeratulDisruptor",
  "ZeratulImmortal",
  "ZeratulObserver",
  "ZeratulSentry",
  "ZeratulStalker",
  "ZeratulWarpPrism",
  "ZeratulSummonZealot",
  "ZeratulRoboticsFacility",
];

const skipFiles = new Set([
  "armycategorydata.xml",
  "conversationdata.xml",
  "soundtrackdata.xml",
  "voiceoverdata.xml",
  "userdata.xml",
]);

const canonicalFileNames = new Map([
  ["abildata.xml", "AbilData.xml"],
  ["accumulatordata.xml", "AccumulatorData.xml"],
  ["actordata.xml", "ActorData.xml"],
  ["alertdata.xml", "AlertData.xml"],
  ["behaviordata.xml", "BehaviorData.xml"],
  ["buttondata.xml", "ButtonData.xml"],
  ["commanderdata.xml", "CommanderData.xml"],
  ["effectdata.xml", "EffectData.xml"],
  ["lightdata.xml", "LightData.xml"],
  ["modeldata.xml", "ModelData.xml"],
  ["moddata.xml", "ModData.xml"],
  ["moverdata.xml", "MoverData.xml"],
  ["requirementdata.xml", "RequirementData.xml"],
  ["requirementnodedata.xml", "RequirementNodeData.xml"],
  ["sounddata.xml", "SoundData.xml"],
  ["turretdata.xml", "TurretData.xml"],
  ["unitdata.xml", "UnitData.xml"],
  ["upgradedata.xml", "UpgradeData.xml"],
  ["validatordata.xml", "ValidatorData.xml"],
  ["weapondata.xml", "WeaponData.xml"],
]);

const tagFileNames = new Map([
  ["CAbilArmMagazine", "AbilData.xml"],
  ["CAbilBehavior", "AbilData.xml"],
  ["CAbilBuild", "AbilData.xml"],
  ["CAbilEffectInstant", "AbilData.xml"],
  ["CAbilEffectTarget", "AbilData.xml"],
  ["CAbilMerge", "AbilData.xml"],
  ["CAbilMorph", "AbilData.xml"],
  ["CAbilMorphPlacement", "AbilData.xml"],
  ["CAbilQueue", "AbilData.xml"],
  ["CAbilRedirect", "AbilData.xml"],
  ["CAbilResearch", "AbilData.xml"],
  ["CAbilTrain", "AbilData.xml"],
  ["CAbilTransport", "AbilData.xml"],
  ["CActorAction", "ActorData.xml"],
  ["CActorBeamSimple", "ActorData.xml"],
  ["CActorModel", "ActorData.xml"],
  ["CActorMissile", "ActorData.xml"],
  ["CActorSite", "ActorData.xml"],
  ["CActorSplat", "ActorData.xml"],
  ["CActorUnit", "ActorData.xml"],
  ["CBehaviorBuff", "BehaviorData.xml"],
  ["CBehaviorVeterancy", "BehaviorData.xml"],
  ["CButton", "ButtonData.xml"],
  ["CCommander", "CommanderData.xml"],
  ["CEffectApplyBehavior", "EffectData.xml"],
  ["CEffectCreateHealer", "EffectData.xml"],
  ["CEffectCreatePersistent", "EffectData.xml"],
  ["CEffectDamage", "EffectData.xml"],
  ["CEffectEnumArea", "EffectData.xml"],
  ["CEffectIssueOrder", "EffectData.xml"],
  ["CEffectLaunchMissile", "EffectData.xml"],
  ["CEffectModifyPlayer", "EffectData.xml"],
  ["CEffectModifyUnit", "EffectData.xml"],
  ["CEffectReleaseMagazine", "EffectData.xml"],
  ["CEffectSet", "EffectData.xml"],
  ["CLightOmni", "LightData.xml"],
  ["CModel", "ModelData.xml"],
  ["CRace", "RaceData.xml"],
  ["CRequirement", "RequirementData.xml"],
  ["CRequirementNode", "RequirementNodeData.xml"],
  ["CUnit", "UnitData.xml"],
  ["CUpgrade", "UpgradeData.xml"],
  ["CValidatorCombine", "ValidatorData.xml"],
  ["CValidatorLocationEnumArea", "ValidatorData.xml"],
  ["CValidatorUnitCompareBehaviorCount", "ValidatorData.xml"],
  ["CValidatorUnitCompareField", "ValidatorData.xml"],
  ["CValidatorUnitCompareVital", "ValidatorData.xml"],
  ["CValidatorUnitFilters", "ValidatorData.xml"],
  ["CWeaponLegacy", "WeaponData.xml"],
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

function ensureCatalogText(text) {
  const trimmed = text.trim();
  if (!trimmed) {
    return '<?xml version="1.0" encoding="utf-8"?>\r\n<Catalog>\r\n</Catalog>\r\n';
  }
  if (/<Catalog\s*\/>/i.test(trimmed)) {
    return trimmed.replace(/<Catalog\s*\/>/i, "<Catalog>\r\n</Catalog>") + "\r\n";
  }
  return text;
}

function objectKey(node) {
  return `${node.tag}|${node.id}`;
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
      index = cleanText.indexOf(">", startIndex) + 1;
      if (index <= 0) {
        break;
      }
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

function loadOfficialNodes() {
  const byId = new Map();
  const allIds = new Set();
  for (const file of walk(officialRoot).sort()) {
    const lowerName = path.basename(file).toLowerCase();
    if (!lowerName.endsWith(".xml") || skipFiles.has(lowerName)) {
      continue;
    }

    const relativeName = path.relative(officialRoot, file).replaceAll("\\", "/").toLowerCase();
    for (const node of parseCatalogNodes(readText(file), relativeName)) {
      allIds.add(node.id);
      if (!byId.has(node.id)) {
        byId.set(node.id, []);
      }
      byId.get(node.id).push(node);
    }
  }
  return { byId, allIds };
}

function expandClosure(official, passes) {
  const selected = new Set(seedIds.filter((id) => official.allIds.has(id)));
  for (let pass = 0; pass < passes; pass += 1) {
    for (const id of [...selected]) {
      for (const node of official.byId.get(id) ?? []) {
        for (const match of node.text.matchAll(/[A-Za-z][A-Za-z0-9_]+/g)) {
          const token = match[0];
          if (official.allIds.has(token)) {
            selected.add(token);
          }
        }
      }
    }
  }
  return selected;
}

function catalogInsertPosition(text) {
  const closeIndex = text.lastIndexOf("</Catalog>");
  if (closeIndex >= 0) {
    return closeIndex;
  }
  return text.length;
}

function existingKeys(text) {
  return new Set(parseCatalogNodes(text, "").map(objectKey));
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
  const insertion = additions.map((node) => `    ${node.text.replaceAll("\n", "\n    ")}`).join("\r\n");
  const insertAt = catalogInsertPosition(originalText);
  const before = originalText.slice(0, insertAt).replace(/\s*$/, "\r\n");
  const after = originalText.slice(insertAt);
  fs.writeFileSync(targetFile, `${before}${insertion}\r\n${after}`, "utf8");
  return { added: additions.length, skipped: nodes.length - additions.length };
}

function targetFileName(node) {
  return tagFileNames.get(node.tag) ?? canonicalFileNames.get(path.basename(node.fileName)) ?? node.fileName;
}

function main() {
  const args = parseArgs();
  const closurePasses = Number(args.get("closure-passes") ?? 0);
  const summaryPath = path.resolve(String(args.get("summary") ?? defaultSummaryPath));
  const official = loadOfficialNodes();
  const selected = expandClosure(official, closurePasses);

  const nodesByTargetFile = new Map();
  for (const id of selected) {
    for (const node of official.byId.get(id) ?? []) {
      const targetName = targetFileName(node);
      if (!nodesByTargetFile.has(targetName)) {
        nodesByTargetFile.set(targetName, []);
      }
      nodesByTargetFile.get(targetName).push(node);
    }
  }

  const summaryRows = ["ObjectId\tCatalogType\tOfficialSource\tTargetFile\tStatus"];
  let addedTotal = 0;
  let skippedTotal = 0;
  for (const [targetName, nodes] of [...nodesByTargetFile.entries()].sort()) {
    const targetFile = path.join(targetRoot, targetName);
    const beforeKeys = existingKeys(fs.existsSync(targetFile) ? readText(targetFile) : "");
    const result = appendNodes(targetFile, nodes.sort((a, b) => `${a.id}|${a.tag}`.localeCompare(`${b.id}|${b.tag}`)));
    addedTotal += result.added;
    skippedTotal += result.skipped;

    for (const node of nodes) {
      const status = beforeKeys.has(objectKey(node)) ? "skipped_existing" : "added_or_newer_duplicate";
      summaryRows.push(
        [
          node.id,
          node.tag,
          `mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/${node.fileName}`,
          targetFile,
          status,
        ].join("\t"),
      );
    }
  }

  fs.mkdirSync(path.dirname(summaryPath), { recursive: true });
  fs.writeFileSync(summaryPath, `${summaryRows.join("\r\n")}\r\n`, "utf8");

  console.log(`XMFINAL_ROSTER_GAP_SEED_IDS=${seedIds.length}`);
  console.log(`XMFINAL_ROSTER_GAP_CLOSURE_IDS=${selected.size}`);
  console.log(`XMFINAL_ROSTER_GAP_ADDED_NODES=${addedTotal}`);
  console.log(`XMFINAL_ROSTER_GAP_SKIPPED_NODES=${skippedTotal}`);
  console.log(`XMFINAL_ROSTER_GAP_SUMMARY=${summaryPath}`);
}

main();
