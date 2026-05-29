import fs from "node:fs";
import path from "node:path";

const DEFAULT_MIRROR = path.join("游戏数据", "官方SC2原始文本镜像");
const DEFAULT_TARGET = path.join("原始mod", "Mods", "XM", "XMCoopMutators.SC2Mod");

const USERDATA_BLOCK_IDS = [
  "MutationDifficultyLevels",
  "MutatorChallenges",
  "Mutators",
];

function argValue(name, fallback) {
  const index = process.argv.indexOf(name);
  if (index >= 0 && process.argv[index + 1]) {
    return process.argv[index + 1];
  }
  return fallback;
}

function printUsage() {
  console.log(`Apply official co-op mutator factor metadata to XMCoopMutators.SC2Mod.

Default target:
  ${DEFAULT_TARGET}

Usage:
  node .\\scripts\\sc2\\apply-official-coop-mutator-factors-to-xmmutator.mjs
  node .\\scripts\\sc2\\apply-official-coop-mutator-factors-to-xmmutator.mjs --target-mod '.\\合作指挥官版起义狂潮\\Mods\\XM\\XMMutator.SC2Mod'

Options:
  --repo-root <path>     Repository root. Defaults to current working directory.
  --mirror-root <path>   Official raw text mirror root. Defaults to ${DEFAULT_MIRROR}
  --target-mod <path>    Target mutator SC2Mod directory. Defaults to ${DEFAULT_TARGET}
  --help                 Show this help.
`);
}

function readText(filePath) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
}

function writeText(filePath, text) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, text, "utf8");
}

function getCUserBlock(xml, id) {
  const start = xml.indexOf(`<CUser id="${id}">`);
  if (start < 0) {
    throw new Error(`CUser block not found: ${id}`);
  }

  const end = xml.indexOf("</CUser>", start);
  if (end < 0) {
    throw new Error(`CUser block is not closed: ${id}`);
  }

  return xml.slice(start, end + "</CUser>".length);
}

function parseKeyValue(filePath) {
  const map = new Map();
  for (const line of readText(filePath).split(/\r?\n/)) {
    if (!line || line.startsWith("#")) {
      continue;
    }

    const index = line.indexOf("=");
    if (index < 0) {
      continue;
    }

    map.set(line.slice(0, index), line.slice(index + 1));
  }
  return map;
}

function collectOfficialMutatorStrings(mirrorRoot, locale) {
  const starcoopStrings = path.join(
    mirrorRoot,
    "mods",
    "starcoop",
    "starcoop.sc2mod",
    `${locale}.sc2data`,
    "localizeddata",
    "gamestrings.txt"
  );
  const official = parseKeyValue(starcoopStrings);
  const result = new Map();

  for (const [key, value] of official) {
    if (
      key.startsWith("UserData/MutationDifficultyLevels/") ||
      key.startsWith("UserData/MutatorChallenges/") ||
      key.startsWith("UserData/Mutators/")
    ) {
      result.set(key, value);
    }
  }

  return result;
}

function mergeLocalizedGameStrings(targetFile, officialStrings) {
  const existingText = readText(targetFile);
  const existing = parseKeyValue(targetFile);
  const preserved = existingText
    .split(/\r?\n/)
    .filter((line) => {
      if (!line) {
        return false;
      }
      const index = line.indexOf("=");
      if (index < 0) {
        return true;
      }
      const key = line.slice(0, index);
      return !(
        key.startsWith("UserData/MutationDifficultyLevels/") ||
        key.startsWith("UserData/MutatorChallenges/") ||
        key.startsWith("UserData/Mutators/")
      );
    });

  const generated = [...officialStrings.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, value]) => `${key}=${value}`);

  const lines = [
    ...preserved,
    "",
    "# Official co-op mutator factor text imported from 游戏数据/官方SC2原始文本镜像.",
    ...generated,
  ];

  writeText(targetFile, `${lines.join("\n").replace(/\n{3,}/g, "\n\n")}\n`);

  return {
    targetFile,
    existingCount: existing.size,
    importedCount: generated.length,
  };
}

function ensureCatalogInclude(gameDataFile, includePath) {
  const text = readText(gameDataFile);
  if (!text) {
    throw new Error(`GameData include file not found: ${gameDataFile}`);
  }

  if (text.includes(`Catalog path="${includePath}"`)) {
    return false;
  }

  const marker = "</Includes>";
  const index = text.lastIndexOf(marker);
  if (index < 0) {
    throw new Error(`GameData include file has no </Includes>: ${gameDataFile}`);
  }

  const next = `${text.slice(0, index)}    <Catalog path="${includePath}"/>\n${text.slice(index)}`;
  writeText(gameDataFile, next);
  return true;
}

function main() {
  if (process.argv.includes("--help") || process.argv.includes("-h")) {
    printUsage();
    return;
  }

  const repoRoot = path.resolve(argValue("--repo-root", process.cwd()));
  const mirrorRoot = path.resolve(repoRoot, argValue("--mirror-root", DEFAULT_MIRROR));
  const targetMod = path.resolve(repoRoot, argValue("--target-mod", DEFAULT_TARGET));

  const sourceUserData = path.join(
    mirrorRoot,
    "mods",
    "starcoop",
    "starcoop.sc2mod",
    "base.sc2data",
    "gamedata",
    "userdata.xml"
  );
  const userDataXml = readText(sourceUserData);
  if (!userDataXml) {
    throw new Error(`Official userdata.xml not found: ${sourceUserData}`);
  }

  const targetBase = path.join(targetMod, "Base.SC2Data");
  const targetUserData = path.join(targetBase, "GameData", "UserData.xml");
  const blocks = USERDATA_BLOCK_IDS.map((id) => getCUserBlock(userDataXml, id));
  const outputXml = [
    '<?xml version="1.0" encoding="utf-8"?>',
    "<Catalog>",
    "    <!-- Official StarCraft II co-op mutator metadata imported from the raw text mirror. -->",
    ...blocks.map((block) =>
      block
        .split(/\r?\n/)
        .map((line) => `    ${line}`)
        .join("\n")
    ),
    "</Catalog>",
    "",
  ].join("\n");
  writeText(targetUserData, outputXml);

  const includeAdded = ensureCatalogInclude(
    path.join(targetBase, "GameData.xml"),
    "GameData/UserData.xml"
  );

  const zhResult = mergeLocalizedGameStrings(
    path.join(targetMod, "zhCN.SC2Data", "LocalizedData", "GameStrings.txt"),
    collectOfficialMutatorStrings(mirrorRoot, "zhcn")
  );

  const summary = {
    targetMod,
    targetUserData,
    includeAdded,
    importedUserDataBlocks: USERDATA_BLOCK_IDS,
    zhCNImportedGameStringCount: zhResult.importedCount,
  };
  console.log(JSON.stringify(summary, null, 2));
}

main();
