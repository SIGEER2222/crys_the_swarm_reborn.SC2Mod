import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const sourceRoot = path.join(
  repoRoot,
  "游戏数据",
  "其他mod数据",
  "7vs1母巢之战合作指挥官bate版_SC2Replay_94137",
);
const dataRoot = path.join(sourceRoot, "s2ma_packages", "pkg01", "extract", "base.sc2data", "GameData");
const officialCommandersRoot = path.join(repoRoot, "游戏数据", "官方合作指挥官", "commanders");
const outputRoot = path.join(repoRoot, "docs", "每日进度", "2026-06-05-7vs1指挥官测试");

const userDataPath = path.join(dataRoot, "UserData.xml");
const unitDataPath = path.join(dataRoot, "UnitData.xml");

const commanderOfficialSources = {
  ProtossAlarak: { shortId: "Alarak", race: "Prot", spawnRace: "Prot" },
  ProtossArtanis: { shortId: "Artanis", race: "Prot", spawnRace: "Prot" },
  ProtossFenix: { shortId: "Fenix", race: "Prot", spawnRace: "Prot" },
  ProtossKarax: { shortId: "Karax", race: "Prot", spawnRace: "Prot" },
  ProtossVorazun: { shortId: "Vorazun", race: "Prot", spawnRace: "Prot" },
  ProtossZeratul: { shortId: "Zeratul", race: "Prot", spawnRace: "ProZ" },
  TerranHorner: { shortId: "Horner", race: "Terr", spawnRace: "TerH" },
  TerranMengsk: {
    shortId: "Mengsk",
    race: "Terr",
    spawnRace: "Terr",
  },
  TerranNova: { shortId: "Nova", race: "Terr", spawnRace: "Terr" },
  TerranRaynor: { shortId: "Raynor", race: "Terr", spawnRace: "Terr" },
  TerranSwann: { shortId: "Swann", race: "Terr", spawnRace: "Terr" },
  TerranTychus: { shortId: "Tychus", race: "Terr", spawnRace: "TerT" },
  ZergAbathur: { shortId: "Abathur", race: "Zerg", spawnRace: "Zerg" },
  ZergDehaka: { shortId: "Dehaka", race: "Zerg", spawnRace: "PZrg" },
  ZergKerrigan: { shortId: "Kerrigan", race: "Zerg", spawnRace: "Zerg" },
  ZergStetmann: {
    shortId: "Stetmann",
    race: "Zerg",
    spawnRace: "Zerg",
  },
  ZergStukov: { shortId: "Stukov", race: "Zerg", spawnRace: "InfT" },
  ZergZagara: { shortId: "Zagara", race: "Zerg", spawnRace: "Zerg" },
};

const expectedCommanderIds = [
  "TerranRaynor",
  "ZergKerrigan",
  "ProtossArtanis",
  "ZergDehaka",
  "ProtossVorazun",
  "TerranSwann",
  "ZergZagara",
  "ProtossKarax",
  "ZergAbathur",
  "ProtossAlarak",
  "TerranNova",
  "ZergStukov",
  "ProtossFenix",
  "TerranHorner",
  "TerranTychus",
  "ProtossZeratul",
  "ZergStetmann",
  "TerranMengsk",
];

const startingAnchors = {
  ProtossAlarak: { building: "Nexus", worker: "Probe" },
  ProtossArtanis: { building: "Nexus", worker: "Probe" },
  ProtossFenix: { building: "Nexus", worker: "Probe" },
  ProtossKarax: { building: "Nexus", worker: "Probe" },
  ProtossVorazun: { building: "Nexus", worker: "Probe" },
  ProtossZeratul: { building: "Nexus", worker: "Probe" },
  TerranHorner: { building: "HHCommandCenter", worker: "HHSCV" },
  TerranMengsk: { building: "CommandCenterMengsk", worker: "SCVMengsk" },
  TerranNova: { building: "CommandCenter", worker: "SCV" },
  TerranRaynor: { building: "CommandCenter", worker: "SCV" },
  TerranSwann: { building: "CommandCenter", worker: "SCV" },
  TerranTychus: { building: "TychusCommandCenter", worker: "TychusSCV" },
  ZergAbathur: { building: "Hatchery", worker: "Drone" },
  ZergDehaka: { building: "DehakaHatchery", worker: "DehakaDrone" },
  ZergKerrigan: { building: "Hatchery", worker: "Drone" },
  ZergStetmann: { building: "HatcheryStetmann", worker: "DroneStetmann" },
  ZergStukov: { building: "SICommandCenter", worker: "SISCV" },
  ZergZagara: { building: "Hatchery", worker: "Drone" },
};

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function stripXmlComments(text) {
  return text.replace(/<!--[\s\S]*?-->/g, "");
}

function getCUserBlock(xml, id) {
  const match = xml.match(new RegExp(`<CUser\\s+id="${escapeRegExp(id)}"[\\s\\S]*?(?=\\n\\s*<CUser\\b|\\n\\s*</Catalog>|$)`));
  if (!match) {
    throw new Error(`CUser '${id}' not found`);
  }
  return match[0];
}

function getInstances(block) {
  const instances = [];
  const regex = /<Instances\s+Id="([^"]+)"[^>]*>([\s\S]*?)<\/Instances>/g;
  let match;
  while ((match = regex.exec(block)) !== null) {
    if (match[1] === "[Default]") {
      continue;
    }
    instances.push({ id: decodeXml(match[1]), body: match[2] });
  }
  return instances;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function decodeXml(value) {
  return value
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function getFieldValue(instanceBody, fieldId, tagName, attrName) {
  const regex = new RegExp(`<${tagName}\\b([^>]*)>([\\s\\S]*?)</${tagName}>`, "g");
  let match;
  while ((match = regex.exec(instanceBody)) !== null) {
    if (!new RegExp(`<Field\\s+Id="${escapeRegExp(fieldId)}"(?:\\s[^>]*)?\\s*/?>`).test(match[2])) {
      continue;
    }
    const attrMatch = match[1].match(new RegExp(`\\s${attrName}="([^"]*)"`));
    return attrMatch ? decodeXml(attrMatch[1]) : "";
  }
  return "";
}

function getCommanderInfo(userData) {
  const block = getCUserBlock(userData, "PlayerCommanders");
  const instances = getInstances(block);
  const commanders = {};

  for (const instance of instances) {
    commanders[instance.id] = {
      id: instance.id,
      nameRef: getFieldValue(instance.body, "Name", "Text", "Text"),
      race: getFieldValue(instance.body, "Race", "GameLink", "GameLink"),
      spawnRace: getFieldValue(instance.body, "SpawnRace", "GameLink", "GameLink"),
      units: [],
      buildings: [],
      unknown: [],
      coverage: {
        playerCommanders: "pkg01",
        techUnitEntries: 0,
        officialFallback: false,
      },
    };
  }

  return commanders;
}

function getUnitMetadata(unitData) {
  const units = {};
  const regex = /<CUnit\s+id="([^"]+)"([^>]*)>([\s\S]*?)<\/CUnit>/g;
  let match;
  while ((match = regex.exec(unitData)) !== null) {
    const id = decodeXml(match[1]);
    const attrs = match[2];
    const body = match[3];
    const parentMatch = attrs.match(/\bparent="([^"]+)"/);
    units[id] = {
      id,
      parent: parentMatch ? decodeXml(parentMatch[1]) : "",
      isStructure: /<Attributes\s+index="Structure"\s+value="1"\s*\/?>/.test(body),
    };
  }
  return units;
}

function classifyUnit(unitId, unitMetadata) {
  const direct = unitMetadata[unitId];
  if (looksLikeStructureId(unitId)) {
    return "buildings";
  }
  if (!direct) {
    return "unknown";
  }
  if (direct.isStructure) {
    return "buildings";
  }
  if (direct.parent && unitMetadata[direct.parent]?.isStructure) {
    return "buildings";
  }
  return "units";
}

function looksLikeStructureId(unitId) {
  const exact = new Set([
    "Armory",
    "Assimilator",
    "Barracks",
    "BanelingNest",
    "Bunker",
    "CommandCenter",
    "CyberneticsCore",
    "DarkShrine",
    "EngineeringBay",
    "EvolutionChamber",
    "Factory",
    "FleetBeacon",
    "Forge",
    "FusionCore",
    "Gateway",
    "GhostAcademy",
    "GreaterSpire",
    "Hatchery",
    "Hive",
    "HydraliskDen",
    "InfestationPit",
    "Lair",
    "LurkerDen",
    "MissileTurret",
    "Nexus",
    "NydusNetwork",
    "OrbitalCommand",
    "PhotonCannon",
    "PlanetaryFortress",
    "Pylon",
    "Refinery",
    "RoachWarren",
    "RoboticsBay",
    "RoboticsFacility",
    "ScourgeNest",
    "ShieldBattery",
    "SpawningPool",
    "SpineCrawler",
    "Spire",
    "SporeCrawler",
    "Stargate",
    "Starport",
    "SupplyDepot",
    "TemplarArchive",
    "TwilightCouncil",
    "UltraliskCavern",
    "WarpGate",
  ]);
  if (exact.has(unitId)) {
    return true;
  }
  return /(CommandCenter|Hatchery|Nexus|Barracks|Factory|Starport|Bunker|MissileTurret|Academy|Bay|Core|Cannon|Battery|Facility|Beacon|Council|Archive|Shrine|Pylon|Assimilator|Refinery|Depot|Nest|Den|Pool|Warren|Cavern|Spire|Nydus|Crawler|Tumor|Lab|Reactor)$/i.test(unitId);
}

function getTechUnitOwnership(userData, unitMetadata, commanders) {
  const block = getCUserBlock(userData, "TechUnit");
  const instances = getInstances(block);
  const ownership = [];

  for (const instance of instances) {
    const commanderIds = [...instance.body.matchAll(/<User\s+Type="PlayerCommanders"\s+Instance="([^"]+)"[^>]*>\s*<Field\s+Id="Commander"(?:\s[^>]*)?\/>\s*<\/User>/g)]
      .map((match) => decodeXml(match[1]))
      .filter((commanderId) => commanderId !== "[Default]");

    if (commanderIds.length === 0) {
      continue;
    }

    const item = {
      id: instance.id,
      nameRef: getFieldValue(instance.body, "Name", "Text", "Text"),
      prefixRef: getFieldValue(instance.body, "Prefix", "Text", "Text"),
      suffixRef: getFieldValue(instance.body, "Suffix", "Text", "Text"),
      kind: classifyUnit(instance.id, unitMetadata),
      commanders: commanderIds,
    };
    ownership.push(item);

    for (const commanderId of commanderIds) {
      if (!commanders[commanderId]) {
        commanders[commanderId] = {
          id: commanderId,
          nameRef: "",
          race: "",
          spawnRace: "",
          units: [],
          buildings: [],
          unknown: [],
          coverage: {
            playerCommanders: "missing",
            techUnitEntries: 0,
            officialFallback: false,
          },
        };
      }
      commanders[commanderId][item.kind].push({
        id: item.id,
        nameRef: item.nameRef,
        prefixRef: item.prefixRef,
        suffixRef: item.suffixRef,
      });
      commanders[commanderId].coverage.techUnitEntries++;
    }
  }

  return ownership;
}

function readJson(filePath) {
  return JSON.parse(readText(filePath));
}

function toOfficialEntry(entry) {
  return {
    id: entry.unit_id || entry.id,
    name: entry.name || "",
    nameRef: entry.name_key || "",
    prefixRef: entry.prefix_key || "",
    suffixRef: entry.suffix_key || "",
    source: entry.source || "",
    sourceName: entry.source_name || "",
  };
}

function makeAnchorEntry(unitId, kind) {
  return {
    id: unitId,
    name: "",
    nameRef: "",
    prefixRef: "",
    suffixRef: "",
    source: `7vs1 launch starting ${kind} anchor`,
    sourceName: "launch-7vs1-coop-test",
  };
}

function ensureEntry(entries, unitId, kind) {
  if (!unitId || entries.some((entry) => entry.id === unitId)) {
    return;
  }
  entries.push(makeAnchorEntry(unitId, kind));
}

function readOfficialRoster(commanderId) {
  const fallback = commanderOfficialSources[commanderId];
  if (!fallback) {
    return null;
  }

  const commanderRoot = path.join(officialCommandersRoot, fallback.shortId);
  const commanderInfo = readJson(path.join(commanderRoot, "commander.json"));
  const roster = readJson(path.join(commanderRoot, "roster.json"));
  const buildings = roster.filter((entry) => entry.unit?.object_type === "Structure").map(toOfficialEntry);
  const units = roster.filter((entry) => entry.unit?.object_type !== "Structure").map(toOfficialEntry);
  const anchors = startingAnchors[commanderId];
  if (anchors) {
    ensureEntry(buildings, anchors.building, "building");
    ensureEntry(units, anchors.worker, "worker");
  }

  return {
    fallback,
    commanderInfo,
    units,
    buildings,
  };
}

function addOfficialFallbacks(commanders) {
  for (const commanderId of expectedCommanderIds) {
    const current = commanders[commanderId];
    const official = readOfficialRoster(commanderId);
    if (!official) {
      commanders[commanderId] = current || {
        id: commanderId,
        nameRef: "",
        race: "",
        spawnRace: "",
        units: [],
        buildings: [],
        unknown: [],
        coverage: {
          playerCommanders: "missing",
          techUnitEntries: 0,
          officialFallback: false,
        },
      };
      continue;
    }

    commanders[commanderId] = {
      id: commanderId,
      name: official.commanderInfo.name || current?.name || "",
      nameRef: current?.nameRef || official.commanderInfo.name || "",
      race: current?.race || official.fallback.race,
      spawnRace: current?.spawnRace || official.fallback.spawnRace,
      units: official.units,
      buildings: official.buildings,
      unknown: [],
      sevenVsOneTechUnitRoster: {
        units: current?.units || [],
        buildings: current?.buildings || [],
        unknown: current?.unknown || [],
      },
      coverage: {
        playerCommanders: current ? "present in 7vs1 pkg01" : "missing in 7vs1 pkg01",
        techUnitEntries: current?.coverage?.techUnitEntries || 0,
        officialFallback: !current,
        officialSupplement: Boolean(current),
        officialFullRoster: true,
        officialSource: official.commanderInfo.source || "",
        officialSourceName: official.commanderInfo.source_name || official.fallback.shortId.toLowerCase(),
      },
    };
  }
}

function sortRoster(commanders) {
  for (const commander of Object.values(commanders)) {
    for (const key of ["buildings", "units", "unknown"]) {
      commander[key].sort((a, b) => a.id.localeCompare(b.id));
    }
  }
  return Object.fromEntries(
    Object.entries(commanders).sort(([a], [b]) => a.localeCompare(b)),
  );
}

function toMarkdown(commanders, ownership) {
  const lines = [];
  lines.push("# 7vs1 指挥官单位/建筑归属导出");
  lines.push("");
  lines.push(`生成时间：${new Date().toISOString()}`);
  lines.push("");
  lines.push("数据源：`游戏数据/其他mod数据/7vs1母巢之战合作指挥官bate版_SC2Replay_94137/s2ma_packages/pkg01/extract/base.sc2data/GameData/UserData.xml`");
  lines.push("");
  lines.push("完整兵种/建筑名册依据：`游戏数据/官方合作指挥官/commanders/<Commander>/roster.json`，按 `unit.object_type == \"Structure\"` 拆为 Buildings，其余拆为 Units。");
  lines.push("");
  lines.push("7vs1 对照依据：`TechUnit` 实例内的 `User Type=\"PlayerCommanders\"` / `Field Id=\"Commander\"` 会保留到 JSON 的 `sevenVsOneTechUnitRoster`，用于观察 replay 包里直接声明了哪些归属；它不再作为完整名册来源。");
  lines.push("");
  lines.push("覆盖标记：`official fallback` 表示 commander 缺失于 7vs1 `pkg01 PlayerCommanders`；`official supplement` 表示 7vs1 静态实例存在，但完整名册仍以官方合作指挥官目录为准。");
  lines.push("");
  lines.push(`总 TechUnit 归属条目：${ownership.length}`);
  lines.push(`指挥官覆盖：${Object.keys(commanders).length}/${expectedCommanderIds.length}`);
  lines.push("");

  for (const commander of Object.values(commanders)) {
    lines.push(`## ${commander.id}`);
    lines.push("");
    lines.push(`- NameRef: ${commander.nameRef || "(missing)"}`);
    lines.push(`- Race: ${commander.race || "(missing)"}`);
    lines.push(`- SpawnRace: ${commander.spawnRace || "(missing)"}`);
    lines.push(`- Buildings: ${commander.buildings.length}`);
    lines.push(`- Units: ${commander.units.length}`);
    lines.push(`- Unknown: ${commander.unknown.length}`);
    lines.push(`- 7vs1 TechUnit entries: ${commander.coverage?.techUnitEntries ?? 0}`);
    lines.push(`- Coverage: ${commander.coverage?.officialFallback ? "official fallback" : commander.coverage?.officialSupplement ? "official full roster + 7vs1 supplement" : "official full roster"}`);
    if (commander.coverage?.officialSource) {
      lines.push(`- OfficialSource: ${commander.coverage.officialSource}`);
    }
    lines.push("");

    lines.push("### Buildings");
    lines.push("");
    writeList(lines, commander.buildings);
    lines.push("");

    lines.push("### Units");
    lines.push("");
    writeList(lines, commander.units);
    lines.push("");

    if (commander.unknown.length > 0) {
      lines.push("### Unknown");
      lines.push("");
      writeList(lines, commander.unknown);
      lines.push("");
    }
  }

  return `${lines.join("\n")}\n`;
}

function writeList(lines, entries) {
  if (entries.length === 0) {
    lines.push("- (none)");
    return;
  }
  for (const entry of entries) {
    const refs = [entry.prefixRef, entry.nameRef, entry.suffixRef].filter(Boolean).join(" | ");
    lines.push(`- \`${entry.id}\`${refs ? ` - ${refs}` : ""}`);
  }
}

function main() {
  const userData = stripXmlComments(readText(userDataPath));
  const unitData = stripXmlComments(readText(unitDataPath));
  const unitMetadata = getUnitMetadata(unitData);
  const commanders = getCommanderInfo(userData);
  const ownership = getTechUnitOwnership(userData, unitMetadata, commanders);
  addOfficialFallbacks(commanders);
  const sortedCommanders = sortRoster(commanders);

  fs.mkdirSync(outputRoot, { recursive: true });
  const jsonPath = path.join(outputRoot, "commander-rosters.json");
  const mdPath = path.join(outputRoot, "commander-rosters.md");

  fs.writeFileSync(jsonPath, `${JSON.stringify({
    sourceRoot,
    userDataPath,
    unitDataPath,
    officialCommandersRoot,
    expectedCommanderIds,
    generatedAt: new Date().toISOString(),
    commanders: sortedCommanders,
    ownership,
  }, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdPath, toMarkdown(sortedCommanders, ownership), "utf8");

  console.log(`Wrote ${jsonPath}`);
  console.log(`Wrote ${mdPath}`);
  console.log(`Commanders: ${Object.keys(sortedCommanders).length}`);
  console.log(`TechUnit ownership entries: ${ownership.length}`);
}

main();
