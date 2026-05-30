import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const modRoot = path.join(repoRoot, "原始mod", "Mods", "XM", "XMCoopMutators.SC2Mod");
const xmFinalDocInfo = path.join(repoRoot, "原始mod", "Mods", "XM", "XMFinal.SC2Mod", "DocumentInfo");
const xmMutatorGameData = path.join(repoRoot, "原始mod", "Mods", "XM", "XMMutator.SC2Mod", "Base.SC2Data", "GameData.xml");
const testMapScript = path.join(repoRoot, "原始mod", "Maps", "XM", "CommanderTestBench.SC2Map", "MapScript.galaxy");

const checks = [];

function read(filePath) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
}

function addCheck(name, pass, details = "") {
  checks.push({ name, pass, details });
}

function countMatches(text, pattern) {
  return [...text.matchAll(pattern)].length;
}

function lineCount(filePath) {
  const text = read(filePath);
  return text ? text.split(/\r?\n/).length : 0;
}

function main() {
  const gameData = read(path.join(modRoot, "Base.SC2Data", "GameData.xml"));
  const userData = read(path.join(modRoot, "Base.SC2Data", "GameData", "UserData.xml"));
  const zhCN = read(path.join(modRoot, "zhCN.SC2Data", "LocalizedData", "GameStrings.txt"));
  const behaviorData = read(path.join(modRoot, "Base.SC2Data", "GameData", "BehaviorData.xml"));
  const effectData = read(path.join(modRoot, "Base.SC2Data", "GameData", "EffectData.xml"));
  const runtime = read(path.join(modRoot, "Base.SC2Data", "LibXMCoopMutators.galaxy"));
  const runtimeHeader = read(path.join(modRoot, "Base.SC2Data", "LibXMCoopMutators_h.galaxy"));
  const finalDoc = read(xmFinalDocInfo);
  const oldMutatorGameData = read(xmMutatorGameData);
  const mapScript = read(testMapScript);
  const gameDataFiles = fs
    .readdirSync(path.join(modRoot, "Base.SC2Data", "GameData"))
    .filter((fileName) => fileName.endsWith(".xml"));
  const mutatorsBlock = userData.match(/<CUser id="Mutators">([\s\S]*?)<\/CUser>/)?.[1] ?? "";
  const mutatorIds = [...mutatorsBlock.matchAll(/<Instances Id="([^"]+)">/g)]
    .map((match) => match[1])
    .filter((id) => id !== "[Default]" && id !== "Random");

  addCheck("XMCoopMutators mod exists", fs.existsSync(modRoot), modRoot);
  addCheck("GameData includes UserData", gameData.includes('Catalog path="GameData/UserData.xml"'));
  addCheck("GameData includes BehaviorData", gameData.includes('Catalog path="GameData/BehaviorData.xml"'));
  addCheck("GameData includes EffectData", gameData.includes('Catalog path="GameData/EffectData.xml"'));
  addCheck(
    "GameData includes generated mutator Catalog files",
    [
      "AbilData.xml",
      "ActorData.xml",
      "BehaviorData.xml",
      "EffectData.xml",
      "ModelData.xml",
      "RequirementData.xml",
      "RequirementNodeData.xml",
      "SoundData.xml",
      "UnitData.xml",
      "UpgradeData.xml",
      "ValidatorData.xml",
      "WeaponData.xml",
    ].every((fileName) => gameData.includes(`Catalog path="GameData/${fileName}"`))
  );
  addCheck("UserData has Mutators block", userData.includes('<CUser id="Mutators">'));
  addCheck("UserData has Plague mutator", userData.includes('<Instances Id="Plague">'));
  addCheck("zhCN has Plague name", zhCN.includes("UserData/Mutators/Plague_Name=黑死病"));
  addCheck("BehaviorData has Plague behavior", behaviorData.includes('id="MutatorPlagueBehavior"'));
  addCheck("BehaviorData has Plague visual behavior", behaviorData.includes('id="MutatorPlagueBehaviorVisual"'));
  addCheck("EffectData has Plague death effect", effectData.includes('id="MutatorPlagueDeath"'));
  addCheck("EffectData has Plague DPS effect", effectData.includes('id="MutatorPlagueBehaviorDPS"'));
  addCheck("Runtime registers Plague", runtime.includes('libXMCM_gf_RegisterMutator("Plague"'));
  addCheck("Runtime registers all single mutators", mutatorIds.every((id) => runtime.includes(`libXMCM_gf_RegisterMutator("${id}"`)), `${mutatorIds.length} mutators`);
  addCheck("Runtime exposes enable API", runtimeHeader.includes("void libXMCM_gf_EnableMutator"));
  addCheck("Runtime exposes enable-all API", runtimeHeader.includes("void libXMCM_gf_EnableAllMutators") && runtime.includes("void libXMCM_gf_EnableAllMutators"));
  addCheck("Runtime has unit-created Plague hook", runtime.includes("TriggerAddEventUnitCreated") && runtime.includes("libXMCM_gf_ApplyPlague(EventUnitCreatedUnit())"));
  addCheck("Runtime has death Plague hook", runtime.includes("TriggerAddEventUnitDied") && runtime.includes("libXMCM_gf_ApplyPlagueOnDeath(EventUnit())"));
  addCheck(
    "XMFinal does not directly depend on XMCoopMutators",
    !finalDoc.includes("file:Mods\\XM\\XMCoopMutators.SC2Mod"),
    "CommanderTestBench can include the test library without mounting XMCoopMutators through XMFinal."
  );
  addCheck("XMMutator no longer includes generated UserData", !oldMutatorGameData.includes('Catalog path="GameData/UserData.xml"'));
  addCheck("Test map includes XMCoopMutators library", mapScript.includes('include "LibXMCoopMutators"'));
  addCheck("Test map initializes XMCoopMutators library", mapScript.includes("libXMCM_InitLib();"));
  addCheck("Test map has Plague UI button", mapScript.includes('StringToText("Enable Plague")'));
  addCheck("Test map has -tbplague chat command", mapScript.includes('"-tbplague"'));
  addCheck("Test map calls Plague enable API", mapScript.includes('libXMCM_gf_EnableMutator("Plague")'));
  addCheck("Test map has enable-all UI button", mapScript.includes('StringToText("Enable All")'));
  addCheck("Test map has -tbmutatorsall chat command", mapScript.includes('"-tbmutatorsall"'));
  addCheck("Test map calls enable-all API", mapScript.includes("libXMCM_gf_EnableAllMutators();"));

  const runtimeLines = lineCount(path.join(modRoot, "Base.SC2Data", "LibXMCoopMutators.galaxy"));
  const headerLines = lineCount(path.join(modRoot, "Base.SC2Data", "LibXMCoopMutators_h.galaxy"));
  addCheck("Runtime Galaxy file under 1000 lines", runtimeLines > 0 && runtimeLines <= 1000, `${runtimeLines} lines`);
  addCheck("Runtime header Galaxy file under 1000 lines", headerLines > 0 && headerLines <= 1000, `${headerLines} lines`);

  const summary = {
    pass: checks.every((check) => check.pass),
    checks,
    counts: {
      mutatorInstances: mutatorIds.length,
      zhCNMutatorTextKeys: countMatches(zhCN, /^UserData\/Mutators\//gm),
      gameDataCatalogFiles: gameDataFiles.length,
      runtimeLines,
      headerLines,
    },
  };

  console.log(JSON.stringify(summary, null, 2));
  if (!summary.pass) {
    process.exitCode = 1;
  }
}

main();
