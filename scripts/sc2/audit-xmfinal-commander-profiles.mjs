import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const commandersRoot = path.join(root, "游戏数据", "官方合作指挥官", "commanders");
const xmfinalRoot = path.join(root, "原始mod", "Mods", "XM", "XMFinal.SC2Mod", "Base.SC2Data");

const galaxyFiles = {
  rosters: "LibE0EAE146_CommanderRosters.galaxy",
  buildings: "LibE0EAE146_CommanderBuildings.galaxy",
  tech: "LibE0EAE146_CommanderTech.galaxy",
  heroAbilities: "LibE0EAE146_CommanderHeroAbilities.galaxy",
  unitAbilities: "LibE0EAE146_CommanderUnitAbilities.galaxy",
};

const aliases = {
  Nova: {
    GhostNova: ["GhostNova", "Ghost_BlackOps", "GhostFemale_BlackOps"],
    GhostFemale_BlackOps: ["GhostFemale_BlackOps", "Ghost_BlackOps"],
    Ghost_BlackOps: ["Ghost_BlackOps", "GhostFemale_BlackOps"],
    AutoTurret: ["AutoTurret", "NovaACLaserTurret"],
    NovaACLaserTurret: ["NovaACLaserTurret", "AutoTurret"],
    MercReaper: ["MercReaper", "ReaperMira"],
  },
  Raynor: {
    Viking: ["Viking", "VikingFighter"],
    VikingFighter: ["VikingFighter", "Viking"],
  },
  Swann: {
    Goliath: ["Goliath", "GoliathSwann"],
    GoliathSwann: ["GoliathSwann", "Goliath"],
    Hercules: ["Hercules", "HerculesSwann"],
    ScienceVessel: ["ScienceVessel", "ScienceVesselSwann"],
    Wraith: ["Wraith", "WraithSwann"],
    KelMorianGrenadeTurret: ["KelMorianGrenadeTurret", "GrenadeTurretSwann"],
    PerditionTurret: ["PerditionTurret", "PerditionTurretSwann"],
    SupplyDepot: ["SupplyDepot", "SupplyDepotSwann"],
    MissileTurret: ["MissileTurret", "MissileTurretSwann"],
    CommandCenter: ["CommandCenter", "CommandCenterSwann"],
  },
  Stukov: {
    SwarmQueen: ["SwarmQueen", "SIQueen"],
  },
  Horner: {
    HHBattlecruiser: ["HHBattlecruiser", "BattlecruiserMira"],
    HHHellion: ["HHHellion", "HellionMira"],
    HHHellionTank: ["HHHellionTank", "HellionTankMira"],
    HHRaven: ["HHRaven", "RavenMira", "RavenMiraSiege"],
    HHReaper: ["HHReaper", "ReaperMira", "ReaperMiraFlying"],
    HHVikingFighter: ["HHVikingFighter", "VikingFighterMira", "VikingAssaultMira"],
    HHWidowMine: ["HHWidowMine", "WidowMineMira", "WidowMineMiraBurrowed"],
    HHWraith: ["HHWraith", "WraithMira"],
    Predator: ["Predator", "WidowMineMira", "WidowMineMiraBurrowed"],
    Liberator: ["Liberator", "LiberatorMira", "LiberatorMiraAG"],
  },
  Zeratul: {
    RoboticsFacilityWarp: ["RoboticsFacilityWarp", "ZeratulRoboticsFacility"],
    ZeratulRoboticsFacility: ["ZeratulRoboticsFacility", "RoboticsFacilityWarp"],
  },
};

const externalCampaignCatalog = {
  // XMFinal depends on LibertyStory.SC2Campaign at runtime, but the repository
  // does not include that campaign catalog export. Keep confirmed campaign
  // units out of the hard local-missing bucket.
  Raynor: {
    unit: ["Medic", "Vulture", "Firebat"],
  },
};

const catalogFiles = {
  unitdata: "unit",
  abildata: "ability",
  buttondata: "button",
  requirementdata: "requirement",
  upgradedata: "upgrade",
};

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

function loadCatalogIndex() {
  const index = {
    unit: new Map(),
    ability: new Map(),
    button: new Map(),
    requirement: new Map(),
    upgrade: new Map(),
  };

  const officialModRoots = [
    "core.sc2mod",
    "liberty.sc2mod",
    "libertymulti.sc2mod",
    "swarm.sc2mod",
    "swarmmulti.sc2mod",
    "void.sc2mod",
    "voidmulti.sc2mod",
  ].map((name) => path.join(root, "references", "sc2-build-96883-casc-export", "mods", name));
  const catalogRoots = [path.join(root, "原始mod", "Mods", "XM"), ...officialModRoots];

  for (const catalogRoot of catalogRoots) {
    for (const file of walk(catalogRoot)) {
      if (!file.toLowerCase().endsWith(".xml")) {
        continue;
      }
      if (!file.replaceAll("\\", "/").toLowerCase().includes("/gamedata/")) {
        continue;
      }

      const baseName = path.basename(file, ".xml").toLowerCase();
      const kind = catalogFiles[baseName];
      if (!kind) {
        continue;
      }

      const text = readText(file);
      for (const match of text.matchAll(/\bid="([^"]+)"/g)) {
        const id = match[1];
        if (!index[kind].has(id)) {
          index[kind].set(id, []);
        }
        index[kind].get(id).push(file);
      }
    }
  }

  return index;
}

function commanderFunctionBody(text, commander, suffix) {
  const functionName = commander === "Horner" ? "Horner" : commander;
  const re = new RegExp(
    `bool\\s+libE0EAE146_gf_XMTestBench_${functionName}${suffix}\\s*\\([^)]*\\)\\s*\\{([\\s\\S]*?)\\n\\}`,
    "m",
  );
  const match = text.match(re);
  return match ? match[1] : "";
}

function candidates(commander, id) {
  return aliases[commander]?.[id] ?? [id];
}

function externalCatalogMatch(commander, kind, id) {
  return externalCampaignCatalog[commander]?.[kind]?.includes(id) ?? false;
}

function catalogHas(catalogIndex, commander, kind, id) {
  return catalogIndex[kind].has(id) || externalCatalogMatch(commander, kind, id);
}

function containsAnyQuoted(text, values) {
  return values.some((value) => text.includes(`"${value}"`));
}

function unique(values) {
  return [...new Set(values)];
}

function primaryUnitIds(jsonFile) {
  return readJson(jsonFile).map((entry) => entry.unit_id).filter(Boolean);
}

function commandCardObjects(jsonFile, objectType) {
  return [
    ...new Set(
      readJson(jsonFile)
        .filter((entry) => entry.object_type === objectType && entry.unit_id)
        .map((entry) => entry.unit_id),
    ),
  ];
}

function auditProfileCoverage(galaxy) {
  const rows = [];
  let missing = 0;

  const commanders = fs
    .readdirSync(commandersRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  for (const commander of commanders) {
    const commanderDir = path.join(commandersRoot, commander);
    const unitIds = [
      ...new Set([
        ...primaryUnitIds(path.join(commanderDir, "units.json")),
        ...primaryUnitIds(path.join(commanderDir, "heroes.json")),
      ]),
    ];
    const buildingIds = [...new Set(primaryUnitIds(path.join(commanderDir, "buildings.json")))];
    const unitCardIds = commandCardObjects(path.join(commanderDir, "command_cards.json"), "Unit");
    const heroCardIds = commandCardObjects(path.join(commanderDir, "command_cards.json"), "Hero");
    const upgradeIds = readJson(path.join(commanderDir, "upgrades.json"))
      .map((entry) => entry.id || entry.upgrade_id)
      .filter(Boolean);

    const rosterBody = commanderFunctionBody(galaxy.rosters, commander, "Roster");
    const buildingBody = commanderFunctionBody(galaxy.buildings, commander, "Buildings") + rosterBody;
    const unitAbilityBody = commanderFunctionBody(galaxy.unitAbilities, commander, "UnitAbilities");
    const heroAbilityBody = commanderFunctionBody(galaxy.heroAbilities, commander, "HeroAbilities");
    const techBody = commanderFunctionBody(galaxy.tech, commander, "Tech");

    const misses = [];
    for (const id of unitIds) {
      if (!containsAnyQuoted(rosterBody, candidates(commander, id))) {
        misses.push(`roster:${id}`);
      }
    }
    for (const id of buildingIds) {
      if (!containsAnyQuoted(buildingBody, candidates(commander, id))) {
        misses.push(`building:${id}`);
      }
    }
    for (const id of unitCardIds) {
      if (!containsAnyQuoted(unitAbilityBody, candidates(commander, id))) {
        misses.push(`unitCard:${id}`);
      }
    }
    for (const id of heroCardIds) {
      if (!containsAnyQuoted(heroAbilityBody, candidates(commander, id))) {
        misses.push(`heroCard:${id}`);
      }
    }
    for (const id of upgradeIds) {
      if (!containsAnyQuoted(techBody, [id])) {
        misses.push(`upgrade:${id}`);
      }
    }

    missing += misses.length;
    rows.push({
      commander,
      roster: unitIds.length,
      buildings: buildingIds.length,
      unitCards: unitCardIds.length,
      heroCards: heroCardIds.length,
      upgrades: upgradeIds.length,
      missing: misses,
    });
  }

  return { rows, missing };
}

function auditAbilityCatalog(galaxy, catalogIndex) {
  const rows = new Map();
  const entryRe =
    /CheckAbilityProfileEntry\([^,]+,\s*"([^"]+)",\s*[^,]+,\s*"([^"]*)",\s*"([^"]*)",\s*"([^"]*)",\s*"([^"]*)",\s*"([^"]*)"\)/g;
  const text = `${galaxy.unitAbilities}\n${galaxy.heroAbilities}`;
  let match;
  let missing = 0;

  while ((match = entryRe.exec(text))) {
    const [, commander, objectId, buttonId, abilityId, requirementId, entryKind] = match;
    const parts = [];
    if (objectId && !catalogHas(catalogIndex, commander, "unit", objectId)) {
      parts.push(`unit=${objectId}`);
    }
    if (buttonId && !catalogIndex.button.has(buttonId)) {
      parts.push(`button=${buttonId}`);
    }
    if (abilityId && !catalogIndex.ability.has(abilityId)) {
      parts.push(`ability=${abilityId}`);
    }
    if (requirementId && !catalogIndex.requirement.has(requirementId)) {
      parts.push(`requirement=${requirementId}`);
    }

    if (parts.length === 0) {
      continue;
    }

    missing += 1;
    if (!rows.has(commander)) {
      rows.set(commander, []);
    }
    rows.get(commander).push({
      entryKind,
      objectId,
      buttonId,
      abilityId,
      requirementId,
      missing: parts,
    });
  }

  return { rows, missing };
}

function extractCreatedUnitIds(body, functionNames) {
  const ids = [];

  for (const functionName of functionNames) {
    const re = new RegExp(`${functionName}\\s*\\([^,]+,\\s*"([^"]+)"`, "g");
    let match;
    while ((match = re.exec(body))) {
      ids.push(match[1]);
    }
  }

  return unique(ids);
}

function extractAliasedCreatedUnitIds(body, functionNames) {
  const ids = [];

  for (const functionName of functionNames) {
    const re = new RegExp(`${functionName}\\s*\\([^,]+,\\s*"[^"]+",\\s*"([^"]+)"`, "g");
    let match;
    while ((match = re.exec(body))) {
      ids.push(match[1]);
    }
  }

  return ids;
}

function auditRosterCatalog(galaxy, catalogIndex) {
  const rows = [];
  let missing = 0;

  const commanders = fs
    .readdirSync(commandersRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  for (const commander of commanders) {
    const rosterBody = commanderFunctionBody(galaxy.rosters, commander, "Roster");
    const buildingBody = commanderFunctionBody(galaxy.buildings, commander, "Buildings");
    const rosterUnits = unique([
      ...extractCreatedUnitIds(rosterBody, ["libE0EAE146_gf_XMTestBench_CreateRosterUnit"]),
      ...extractAliasedCreatedUnitIds(rosterBody, ["libE0EAE146_gf_XMTestBench_CreateRosterUnitAlias"]),
    ]);
    const buildingUnits = unique([
      ...extractCreatedUnitIds(buildingBody, ["libE0EAE146_gf_XMTestBench_CreateBuildingRosterUnit"]),
      ...extractAliasedCreatedUnitIds(buildingBody, ["libE0EAE146_gf_XMTestBench_CreateBuildingRosterUnitAlias"]),
    ]);
    const rosterMissing = rosterUnits.filter((id) => !catalogHas(catalogIndex, commander, "unit", id));
    const buildingMissing = buildingUnits.filter((id) => !catalogHas(catalogIndex, commander, "unit", id));
    const rosterExternal = rosterUnits.filter((id) => externalCatalogMatch(commander, "unit", id));
    const buildingExternal = buildingUnits.filter((id) => externalCatalogMatch(commander, "unit", id));

    missing += rosterMissing.length + buildingMissing.length;
    rows.push({
      commander,
      rosterUnits,
      rosterMissing,
      rosterExternal,
      buildingUnits,
      buildingMissing,
      buildingExternal,
    });
  }

  return { rows, missing };
}

function printProfileCoverage(result) {
  console.log("PROFILE_COVERAGE");
  for (const row of result.rows) {
    const base = [
      row.commander,
      `roster=${row.roster}`,
      `buildings=${row.buildings}`,
      `unitCards=${row.unitCards}`,
      `heroCards=${row.heroCards}`,
      `upgrades=${row.upgrades}`,
    ].join("\t");

    if (row.missing.length === 0) {
      console.log(`OK\t${base}`);
    } else {
      console.log(`MISS\t${base}\t${row.missing.join(",")}`);
    }
  }
  console.log(`PROFILE_HARD_MISSING=${result.missing}`);
}

function printAbilityCatalog(result, limit) {
  console.log("ABILITY_CATALOG_GAPS");
  for (const commander of [...result.rows.keys()].sort()) {
    const entries = result.rows.get(commander);
    console.log(`MISS\t${commander}\tentries=${entries.length}`);
    for (const entry of entries.slice(0, limit)) {
      console.log(
        `  ${entry.entryKind}\tobject=${entry.objectId}\tbutton=${entry.buttonId}\tability=${entry.abilityId}\trequirement=${entry.requirementId}\tmissing=${entry.missing.join(" ")}`,
      );
    }
    if (entries.length > limit) {
      console.log(`  ... ${entries.length - limit} more`);
    }
  }
  console.log(`ABILITY_CATALOG_MISSING_ENTRIES=${result.missing}`);
}

function printRosterCatalog(result, limit) {
  console.log("ROSTER_BUILDING_CATALOG_GAPS");
  for (const row of result.rows) {
    const base = [
      row.commander,
      `roster=${row.rosterUnits.length}`,
      `rosterMissing=${row.rosterMissing.length}`,
      `rosterExternal=${row.rosterExternal.length}`,
      `buildings=${row.buildingUnits.length}`,
      `buildingMissing=${row.buildingMissing.length}`,
      `buildingExternal=${row.buildingExternal.length}`,
    ].join("\t");

    if ((row.rosterMissing.length === 0) && (row.buildingMissing.length === 0)) {
      console.log(`OK\t${base}`);
      continue;
    }

    console.log(`MISS\t${base}`);
    for (const id of row.rosterMissing.slice(0, limit)) {
      console.log(`  roster\tunit=${id}`);
    }
    if (row.rosterMissing.length > limit) {
      console.log(`  roster\t... ${row.rosterMissing.length - limit} more`);
    }
    for (const id of row.buildingMissing.slice(0, limit)) {
      console.log(`  building\tunit=${id}`);
    }
    if (row.buildingMissing.length > limit) {
      console.log(`  building\t... ${row.buildingMissing.length - limit} more`);
    }
  }
  console.log(`ROSTER_BUILDING_CATALOG_MISSING_ENTRIES=${result.missing}`);
}

function parseArgs() {
  const args = new Map();
  for (let i = 2; i < process.argv.length; i += 1) {
    const item = process.argv[i];
    if (item.startsWith("--")) {
      const key = item.slice(2);
      const next = process.argv[i + 1];
      if (next && !next.startsWith("--")) {
        args.set(key, next);
        i += 1;
      } else {
        args.set(key, true);
      }
    }
  }
  return args;
}

const args = parseArgs();
const failOnCatalogGaps = args.has("fail-on-catalog-gaps");
const catalogLimit = Number(args.get("catalog-limit") ?? 12);

const galaxy = Object.fromEntries(
  Object.entries(galaxyFiles).map(([key, file]) => [key, readText(path.join(xmfinalRoot, file))]),
);

const profileCoverage = auditProfileCoverage(galaxy);
printProfileCoverage(profileCoverage);

const catalogIndex = loadCatalogIndex();
const rosterCatalog = auditRosterCatalog(galaxy, catalogIndex);
printRosterCatalog(rosterCatalog, catalogLimit);

const abilityCatalog = auditAbilityCatalog(galaxy, catalogIndex);
printAbilityCatalog(abilityCatalog, catalogLimit);

if (profileCoverage.missing > 0 || (failOnCatalogGaps && ((abilityCatalog.missing + rosterCatalog.missing) > 0))) {
  process.exit(1);
}
