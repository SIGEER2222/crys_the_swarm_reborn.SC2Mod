import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const activeRoot = path.join(root, "合作指挥官版起义狂潮", "Mods", "XM");
const officialMirrorRoot = path.join(root, "游戏数据", "官方SC2原始文本镜像");
const xmCoreGalaxy = path.join(activeRoot, "XMCore.SC2Mod", "Base.SC2Data", "Lib67C0F0E7.galaxy");
const outputDir = path.join(
  root,
  "docs",
  "每日进度",
  "2026-05-29-合作指挥官建筑单位逐个对比",
  "top-panel",
);

const commanders = [
  { id: "Abathur", zh: "阿巴瑟", type: "Abathur", caster: "CoopCasterAbathur", mod: "XMAbathur.SC2Mod" },
  { id: "AbathurReborn", zh: "阿巴瑟Reborn", type: "AbathurReborn", caster: "CoopCasterAbathurReborn", mod: "XMAbathurReborn.SC2Mod" },
  { id: "Alarak", zh: "阿拉纳克", type: "Alarak", caster: "CoopCasterAlarak", mod: "XMAlarak.SC2Mod" },
  { id: "Artanis", zh: "阿塔尼斯", type: "Artanis", caster: "SoACasterArtanis", mod: "XMArtanis.SC2Mod" },
  { id: "Dehaka", zh: "德哈卡", type: "Dehaka", caster: "CoopCasterDehaka", mod: "XMDehaka.SC2Mod", sharedCasterMod: "XMAbathur.SC2Mod" },
  { id: "Fenix", zh: "菲尼克斯", type: "Fenix", caster: "SoACasterFenix", mod: "XMFenix.SC2Mod" },
  { id: "Horner", zh: "霍纳与汉", type: "Horner", caster: "CoopCasterHorner", mod: "XMMira.SC2Mod", sharedCasterMod: "XMAbathur.SC2Mod" },
  { id: "Karax", zh: "凯拉克斯", type: "Karax", caster: "SoACasterKarax", mod: "XMKarax.SC2Mod" },
  { id: "Kerrigan", zh: "凯瑞甘", type: "Kerrigan", caster: "CoopCasterKerrigan", mod: "XMKerrigan.SC2Mod", noTopPanel: true, panelNote: "官方 CoopCasterKerrigan 是空壳；指挥官技能在 K5Kerrigan 英雄命令卡，不属于顶部面板。" },
  { id: "Mengsk", zh: "蒙斯克", type: "Mengsk", caster: "CoopCasterMengsk", mod: "XMMengsk.SC2Mod" },
  { id: "Nova", zh: "诺娃", type: "Nova", caster: "CoopCasterNova", mod: "XMNova.SC2Mod" },
  { id: "Raynor", zh: "雷诺", type: "Raynor", caster: "CoopCasterRaynor", mod: "XMRaynor.SC2Mod" },
  { id: "Stetmann", zh: "斯台特曼", type: "Stetmann", caster: "CoopCasterStetmann", mod: "XMStetmann.SC2Mod" },
  { id: "Stukov", zh: "斯托科夫", type: "Stukov", caster: "CoopCasterStukov", mod: "XMStukov.SC2Mod" },
  { id: "Swann", zh: "斯旺", type: "Swann", caster: "CoopCasterSwann", mod: "XMSwann.SC2Mod", sharedCasterMod: "XMAbathur.SC2Mod" },
  { id: "Tychus", zh: "泰凯斯", type: "Tychus", caster: "CoopCasterTychus", mod: "XMTychus.SC2Mod" },
  { id: "Vorazun", zh: "沃拉尊", type: "Vorazun", caster: "SoACasterVorazun", mod: "XMVorazun.SC2Mod" },
  { id: "Zagara", zh: "扎加拉", type: "Zagara", caster: "CoopCasterZagara", mod: "XMZagara.SC2Mod" },
  { id: "Zeratul", zh: "泽拉图", type: "Zeratul", caster: "CoopCasterZeratul", mod: "XMZeratul.SC2Mod" },
];

const faceNames = new Map([
  ["SpawnToxicNest", "剧毒巢穴"],
  ["AbathurMend", "愈合"],
  ["AbathurRebornMend", "愈合"],
  ["AlarakStructureOvercharge", "建筑超载"],
  ["AlarakACSummonDeathfleet", "死亡舰队"],
  ["SOAPylonPower", "投放能量场"],
  ["SOAOrbitalStrike", "轨道轰炸"],
  ["SOASuperShield", "护盾超载"],
  ["SOAStrafeAttack", "太阳轰炸"],
  ["SOASummonFenix", "菲尼克斯执政官战甲"],
  ["SOASummonFenixDragoon", "菲尼克斯龙骑士战甲"],
  ["SOASummonFenixArbiter", "菲尼克斯仲裁者战甲"],
  ["SOAOrbitalStrikeKarax", "轨道轰炸"],
  ["SOAThermalLance", "太阳能射线枪"],
  ["SOAMapWideChrono", "时空波动"],
  ["SOAPurifierBeam", "净化光束"],
  ["SOADarkPylon", "黑暗水晶塔"],
  ["SOAVorazunBlackHole", "黑洞"],
  ["SOAShadowGuardCalldown", "暗影卫队"],
  ["SOATimeFreeze", "时间停止"],
  ["PrimalSlash", "跳跃猛击"],
  ["PsiStrike", "灵能突袭"],
  ["KerriganVoidCoopEconDrop", "吸收光环"],
  ["KerriganVoidCoopCrushingGripWave", "定身波"],
  ["SummonHyperionVoid", "休伯利安号"],
  ["BansheeAirstrike", "女妖空袭"],
  ["SIStukovPlaceHordeRallyTopBar", "感染平民集结点"],
  ["SIStukovInfestStructure", "感染建筑"],
  ["SIStukovInfestStructureUpgraded", "感染建筑"],
  ["StukovSummonApocalisk", "末日巨兽"],
  ["StukovSummonAleksander", "亚历山大号"],
  ["DehakaNydusDestroyerTopBar", "召唤蠕虫"],
  ["DehakaGlevigTopBar", "格里维格"],
  ["DehakaMurvarTopBar", "穆尔瓦"],
  ["DehakaDakrunTopBar", "达克伦"],
  ["HHMagneticMines", "磁雷"],
  ["HHBomberAreaBombTopBar", "轰炸平台"],
  ["HornerAirFleet", "空中舰队"],
  ["HHSummonSpaceStation", "太空站"],
  ["NovaDefensiveMatrixDrone", "防御无人机"],
  ["NovaGriffinBombingRun", "格里芬轰炸"],
  ["NovaGriffinTransportUnits", "格里芬运输"],
  ["NovaReviveInstantBuyback", "诺娃立即复活"],
  ["DrakkenLaserDrillAttack", "德拉肯激光钻机"],
  ["DrakkenLaserDrillBFGIO", "聚焦光束"],
  ["DrakkenLaserDrillPulseCannonIO", "脉冲炮"],
  ["SpecialDelivery", "作战投放"],
  ["PowerTowerStetmannLevel1", "部署卫星"],
  ["PowerFieldMovementSpeed", "斯台特区域：速度"],
  ["PowerFieldHPRegeneration", "斯台特区域：生命"],
  ["PowerFieldEnergyRegeneration", "斯台特区域：能量"],
  ["BunkerDepotMengskDrop", "空投补给地堡"],
  ["ArtilleryMengskExperimentalStrike", "污染打击"],
  ["MengskZergCalldownT", "召唤虫群"],
  ["NuclearAnnihilationMengsk", "核弹毁灭"],
  ["TychusCalldownOdin", "奥丁"],
  ["TychusMedicTransportUnitsTopBar", "医疗运输"],
  ["ZeratulMapWideStasis", "静滞"],
  ["ZeratulKhaydarinMonolith", "凯达林巨石"],
]);

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function write(file, text) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, text, "utf8");
}

function walk(dir, files = [], predicate = (entry) => /\.xml$/i.test(entry.name)) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, files, predicate);
    } else if (predicate(entry, full)) {
      files.push(full);
    }
  }
  return files;
}

function attrs(raw) {
  const out = new Map();
  for (const match of raw.matchAll(/\b([A-Za-z0-9_]+)\s*=\s*"([^"]*)"/g)) {
    out.set(match[1], match[2]);
  }
  return out;
}

function stripComments(text) {
  return text.replace(/<!--[\s\S]*?-->/g, "");
}

function catalogNodes(file) {
  const text = stripComments(read(file));
  const nodes = [];
  for (const match of text.matchAll(/<([A-Za-z0-9_]+)\b([^>]*)\bid="([^"]+)"[^>]*\/?>/g)) {
    const openTag = match[0];
    const tag = match[1];
    const closeTag = `</${tag}>`;
    const start = match.index ?? 0;
    const end = openTag.endsWith("/>")
      ? start + openTag.length
      : text.indexOf(closeTag, start + openTag.length) + closeTag.length;
    if (end >= closeTag.length) {
      nodes.push({ tag, id: match[3], text: text.slice(start, end), file });
    }
  }
  return nodes;
}

function normalizeLocalizedText(value) {
  return value
    .replace(/\s+\/\/\/[\s\S]*$/u, "")
    .replaceAll("\\n", " ")
    .trim();
}

function buildStringMap() {
  const strings = new Map();
  const roots = [
    officialMirrorRoot,
    activeRoot,
  ].filter((dir) => fs.existsSync(dir));
  const gameStringFiles = roots.flatMap((dir) => walk(
    dir,
    [],
    (entry, full) => /gamestrings\.txt$/i.test(entry.name) && /zhcn\.sc2data/i.test(full),
  ));
  for (const file of gameStringFiles) {
    for (const line of read(file).split(/\r?\n/)) {
      const eq = line.indexOf("=");
      if (eq <= 0) {
        continue;
      }
      const key = line.slice(0, eq).trim();
      const value = normalizeLocalizedText(line.slice(eq + 1));
      if (key && value) {
        strings.set(key, value);
      }
    }
  }
  return strings;
}

function buildIndex() {
  const index = new Map();
  const unitBlocks = [];
  const roots = [
    activeRoot,
    path.join(officialMirrorRoot, "mods", "starcoop", "starcoop.sc2mod", "base.sc2data", "gamedata"),
    path.join(officialMirrorRoot, "mods", "starcoop", "commanders"),
    path.join(officialMirrorRoot, "mods", "alliedcommanders.sc2mod"),
    path.join(officialMirrorRoot, "campaigns", "swarm.sc2campaign", "base.sc2data", "gamedata"),
    path.join(officialMirrorRoot, "campaigns", "swarmstory.sc2campaign", "base.sc2data", "gamedata"),
    path.join(officialMirrorRoot, "campaigns", "void.sc2campaign", "base.sc2data", "gamedata"),
    path.join(officialMirrorRoot, "campaigns", "voidstory.sc2campaign", "base.sc2data", "gamedata"),
  ].filter((dir) => fs.existsSync(dir));
  for (const file of roots.flatMap((dir) => walk(dir))) {
    for (const node of catalogNodes(file)) {
      const key = `${kindForTag(node.tag)}:${node.id}`;
      if (!index.has(key)) {
        index.set(key, []);
      }
      index.get(key).push(node);
      if (node.tag === "CUnit") {
        unitBlocks.push(node);
      }
    }
  }
  return { index, unitBlocks };
}

function kindForTag(tag) {
  if (tag.startsWith("CAbil")) return "ability";
  if (tag.startsWith("CEffect")) return "effect";
  if (tag.startsWith("CBehavior")) return "behavior";
  if (tag === "CUpgrade") return "upgrade";
  if (tag === "CButton") return "button";
  if (tag === "CRequirement") return "requirement";
  if (tag === "CUnit") return "unit";
  return tag.toLowerCase();
}

function chooseCatalogNode(index, kind, id, commander) {
  const matches = index.get(`${kind}:${id}`) ?? [];
  if (matches.length === 0) {
    return undefined;
  }
  return orderedCatalogNodes(index, kind, id, commander)[0];
}

function orderedCatalogNodes(index, kind, id, commander) {
  const matches = index.get(`${kind}:${id}`) ?? [];
  const ordered = [];
  const add = (node) => {
    if (node && !ordered.includes(node)) {
      ordered.push(node);
    }
  };
  if (commander?.mod) {
    [...matches].reverse()
      .filter((node) => node.file.includes(`${path.sep}${commander.mod}${path.sep}`))
      .forEach(add);
  }
  if (commander?.sharedCasterMod) {
    matches
      .filter((node) => node.file.includes(`${path.sep}${commander.sharedCasterMod}${path.sep}`))
      .forEach(add);
  }
  [...matches].reverse()
    .filter((node) => node.file.startsWith(activeRoot))
    .forEach(add);
  [...matches].reverse().forEach(add);
  return ordered;
}

function chooseUnit(unitBlocks, commander) {
  const matches = unitBlocks.filter((node) => node.id === commander.caster);
  if (matches.length === 0) {
    return undefined;
  }
  if (commander.mod) {
    const preferred = [...matches].reverse().find((node) => node.file.includes(`${path.sep}${commander.mod}${path.sep}`));
    if (preferred) {
      return preferred;
    }
  }
  if (commander.sharedCasterMod) {
    const shared = matches.find((node) => node.file.includes(`${path.sep}${commander.sharedCasterMod}${path.sep}`));
    if (shared) {
      return shared;
    }
  }
  return [...matches].reverse().find((node) => node.file.startsWith(activeRoot)) ?? matches[0];
}

function extractFunction(text, name) {
  const start = text.indexOf(`void lib67C0F0E7_gf_${name} `);
  if (start < 0) {
    return "";
  }
  const next = text.indexOf("\nvoid lib67C0F0E7_gf_", start + 1);
  return text.slice(start, next < 0 ? text.length : next);
}

function routeFor(lines, type) {
  const lineIndex = lines.findIndex((line) => line.includes(`"${type}"`) && line.includes("auto1CC9623D_val"));
  if (lineIndex < 0) {
    return { status: "缺路由", functionName: "", raw: "" };
  }
  const block = [];
  for (let i = lineIndex; i < lines.length; i += 1) {
    if (i > lineIndex && /^    (else if|else) /.test(lines[i])) {
      break;
    }
    block.push(lines[i]);
    if (i > lineIndex && /^    }/.test(lines[i])) {
      break;
    }
  }
  const raw = block.join("\n");
  const call = raw.match(/lib67C0F0E7_gf_(CU_GPInit[A-Za-z0-9]+)\(/);
  if (call) {
    return { status: "已路由", functionName: call[1], raw };
  }
  if (raw.includes("return")) {
    return { status: "无顶部面板", functionName: "return", raw };
  }
  return { status: "路由空分支", functionName: "", raw };
}

function functionInfo(coreText, functionName) {
  if (!functionName || functionName === "return") {
    return { template: "", templates: [], buttonSlots: 0, cutscene: "" };
  }
  const body = extractFunction(coreText, functionName);
  const templates = [...body.matchAll(/DialogControlCreateInPanelFromTemplate\([^;]+,\s*"([^"]+)"/g)].map((match) => match[1]);
  const template = body.match(/DialogControlCreateInPanelFromTemplate\([^,]+,\s*c_triggerControlTypeCommandPanel,\s*"([^"]+)"/)?.[1] ?? templates.at(-1) ?? "";
  const buttonSlots = Number(body.match(/const int [A-Za-z0-9_]+_ae = ([0-9]+);/)?.[1] ?? 0);
  const cutscene = body.match(/SetDialogItemCutscene\([^,]+,\s*"([^"]+)"/)?.[1] ?? "";
  return { template, templates, buttonSlots, cutscene };
}

function childAttrs(block, tag) {
  return [...block.matchAll(new RegExp(`<${tag}\\b([^>]*)`, "g"))].map((match) => attrs(match[1]));
}

function firstAttr(block, tag, attr = "value") {
  return block.match(new RegExp(`<${tag}\\b[^>]*\\b${attr}="([^"]+)"`))?.[1] ?? "";
}

function allAttr(block, tag, attr = "value") {
  return [...block.matchAll(new RegExp(`<${tag}\\b[^>]*\\b${attr}="([^"]+)"`, "g"))].map((match) => match[1]);
}

function firstCatalogAttr(index, kind, id, tag, commander, attr = "value") {
  for (const node of orderedCatalogNodes(index, kind, id, commander)) {
    const value = firstAttr(node.text, tag, attr);
    if (value) {
      return value;
    }
  }
  return "";
}

function numericField(node, field) {
  if (!node) {
    return undefined;
  }
  if (field === "PeriodicEffectRateMultiplier") {
    return 1;
  }
  if (field.startsWith("AttributeBonus[")) {
    const attr = field.match(/^AttributeBonus\[([^\]]+)\]/)?.[1];
    const value = node.text.match(new RegExp(`<AttributeBonus\\b[^>]*\\bindex="${attr}"[^>]*\\bvalue="([^"]+)"`))?.[1];
    return value === undefined ? undefined : Number(value);
  }
  const indexed = field.match(/^([A-Za-z0-9_]+)\[([^\]]+)\]$/);
  if (indexed) {
    const value = node.text.match(new RegExp(`<${indexed[1]}\\b[^>]*\\bindex="${indexed[2]}"[^>]*\\bvalue="([^"]+)"`))?.[1]
      ?? node.text.match(new RegExp(`<${indexed[1]}\\b[^>]*\\bvalue="([^"]+)"`))?.[1];
    return value === undefined ? undefined : Number(value);
  }
  if (field.includes(".")) {
    const pieces = field.split(".");
    const last = pieces.at(-1) ?? field;
    const container = pieces.at(-2) ?? "";
    const indexedLast = last.match(/^([A-Za-z0-9_]+)\[([^\]]+)\]$/);
    if (indexedLast) {
      const value = node.text.match(new RegExp(`<${indexedLast[1]}\\b[^>]*\\bindex="${indexedLast[2]}"[^>]*\\bvalue="([^"]+)"`))?.[1];
      if (value !== undefined) {
        return Number(value);
      }
    }
    const attrName = indexedLast?.[1] ?? last;
    const attrValue = container
      ? node.text.match(new RegExp(`<${container}\\b[^>]*\\b${attrName}="([^"]+)"`))?.[1]
      : undefined;
    if (attrValue !== undefined) {
      return Number(attrValue);
    }
    const value = node.text.match(new RegExp(`<${attrName}\\b[^>]*\\bvalue="([^"]+)"`))?.[1];
    return value === undefined ? undefined : Number(value);
  }
  const value = node.text.match(new RegExp(`<${field}\\b[^>]*\\bvalue="([^"]+)"`))?.[1];
  return value === undefined ? undefined : Number(value);
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function resolveUpgradeEffectValue(upgradeId, reference, index, commander) {
  for (const node of orderedCatalogNodes(index, "upgrade", upgradeId, commander)) {
    const value = node.text.match(new RegExp(`<EffectArray\\b[^>]*\\bReference="${escapeRegExp(reference)}"[^>]*\\bValue="([^"]+)"`))?.[1];
    if (value !== undefined) {
      return Number(value);
    }
  }
  return undefined;
}

function resolveCatalogNumber(ref, index, commander) {
  const match = ref.match(/^(Effect|Behavior|Abil),([A-Za-z0-9_]+),([A-Za-z0-9_.\[\]]+)$/);
  if (!match) {
    return undefined;
  }
  const kind = match[1] === "Abil" ? "ability" : match[1].toLowerCase();
  for (const node of orderedCatalogNodes(index, kind, match[2], commander)) {
    const value = numericField(node, match[3]);
    if (value !== undefined && Number.isFinite(value)) {
      return value;
    }
  }
  if (kind === "effect" && match[2].includes("DisplayDummy") && match[3] === "Amount") {
    return 0;
  }
  return undefined;
}

function formatNumber(value) {
  if (!Number.isFinite(value)) {
    return "";
  }
  const rounded = Math.round(value * 10000) / 10000;
  return Number.isInteger(rounded) ? String(rounded) : String(rounded);
}

function evaluateDynamicRef(ref, index, commander) {
  if (ref.startsWith("$")) {
    let unresolved = false;
    const expanded = ref.replace(/\$UpgradeEffectArrayValue:([^:]+):([^$]+)\$/g, (_token, upgradeId, reference) => {
      const value = resolveUpgradeEffectValue(upgradeId, reference, index, commander);
      if (value === undefined || !Number.isFinite(value)) {
        unresolved = true;
        return _token;
      }
      return String(value);
    });
    if (!unresolved) {
      return evaluateDynamicRef(expanded, index, commander);
    }
    return "动态值";
  }
  const direct = resolveCatalogNumber(ref, index, commander);
  if (direct !== undefined && Number.isFinite(direct)) {
    return formatNumber(direct);
  }
  let unresolved = false;
  const expression = ref.replace(
    /(Effect|Behavior|Abil),([A-Za-z0-9_]+),([A-Za-z0-9_.\[\]]+)/g,
    (token) => {
      const value = resolveCatalogNumber(token, index, commander);
      if (value === undefined || !Number.isFinite(value)) {
        unresolved = true;
        return token;
      }
      return String(value);
    },
  );
  if (!unresolved && /^[0-9+\-*/().\s]+$/.test(expression)) {
    try {
      return formatNumber(Function(`"use strict"; return (${expression});`)());
    } catch {
      return `公式:${ref}`;
    }
  }
  return `公式:${ref}`;
}

function stripSc2Markup(value, index, commander) {
  return value
    .replace(/<d\b[^>]*\btime\s*=\s*"([^"]+)"[^>]*\/>/g, "$1秒")
    .replace(/<d\b[^>]*\bref="([^"]+)"[^>]*\/>/g, (_match, ref) => evaluateDynamicRef(ref, index, commander))
    .replace(/<n\s*\/>/g, " ")
    .replace(/<IMG\b[^>]*>/g, "")
    .replace(/<\/?[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function stringValue(strings, key, index, commander) {
  const raw = strings.get(key);
  return raw ? stripSc2Markup(raw, index, commander) : "";
}

function linkedString(node, field) {
  return node?.text.match(new RegExp(`<${field}\\b[^>]*\\bvalue="([^"]+)"`))?.[1] ?? "";
}

function buttonName(button, index, strings, commander) {
  const buttonNode = chooseCatalogNode(index, "button", button.face, commander);
  const linkedName = linkedString(buttonNode, "Name");
  return (
    (linkedName ? stringValue(strings, linkedName, index, commander) : "") ||
    stringValue(strings, `Button/Name/${button.face}`, index, commander) ||
    faceNames.get(button.face) ||
    button.face
  );
}

function tooltipCandidates(button, index, commander) {
  const ability = button.abilCmd.split(",")[0];
  const buttonNode = chooseCatalogNode(index, "button", button.face, commander);
  const linked = [
    linkedString(buttonNode, "Tooltip"),
    linkedString(buttonNode, "Description"),
  ].filter(Boolean);
  return [
    ...linked,
    `Button/Tooltip/${button.face}`,
    `Button/Tooltip/${ability}`,
    `Button/Tooltip/${ability.replace(/(Activate|IssueOrder|Targeted|Target|Walk|Load|Order|T|Upgraded)$/u, "")}`,
  ];
}

function buttonTooltip(button, index, strings, commander) {
  for (const key of tooltipCandidates(button, index, commander)) {
    const value = stringValue(strings, key, index, commander);
    if (value && !/^NOT USED$/i.test(value) && !/^未被使用$/u.test(value)) {
      return value;
    }
  }
  return "";
}

function effectSummaryById(effectId, index, commander, depth = 0, seen = new Set()) {
  if (!effectId || seen.has(effectId) || depth > 2) {
    return "";
  }
  seen.add(effectId);
  const node = chooseCatalogNode(index, "effect", effectId, commander);
  if (!node) {
    return `效果 ${effectId} 缺失`;
  }
  const parts = [];
  if (node.tag === "CEffectDamage") {
    const amount = numericField(node, "Amount");
    if (amount !== undefined) {
      parts.push(`伤害 ${formatNumber(amount)}`);
    }
    for (const bonus of childAttrs(node.text, "AttributeBonus")) {
      const indexName = bonus.get("index");
      const value = bonus.get("value");
      if (indexName && value) {
        parts.push(`${indexName} 加成 ${value}`);
      }
    }
  } else if (node.tag === "CEffectApplyBehavior") {
    const behavior = firstAttr(node.text, "Behavior")
      || firstCatalogAttr(index, "effect", effectId, "Behavior", commander)
      || (chooseCatalogNode(index, "behavior", effectId, commander) ? effectId : "");
    const behaviorNode = chooseCatalogNode(index, "behavior", behavior, commander);
    const duration = numericField(behaviorNode, "Duration");
    parts.push(duration !== undefined ? `施加行为 ${behavior}，持续 ${formatNumber(duration)} 秒` : `施加行为 ${behavior}`);
  } else if (node.tag === "CEffectCreateUnit") {
    const unit = firstAttr(node.text, "SpawnUnit") || firstAttr(node.text, "Unit");
    const count = firstAttr(node.text, "SpawnCount") || firstAttr(node.text, "Count");
    parts.push(`召唤/创建 ${unit || "单位"}${count ? ` x${count}` : ""}`);
  } else if (node.tag === "CEffectSearchArea") {
    const areas = childAttrs(node.text, "AreaArray")
      .map((area) => {
        const radius = area.get("Radius");
        const effect = area.get("Effect");
        return `${radius ? `半径 ${radius}` : "范围搜索"}${effect ? ` -> ${effect}` : ""}`;
      })
      .filter(Boolean);
    parts.push(areas.length ? `搜索区域：${areas.join("；")}` : "搜索区域");
  } else if (node.tag === "CEffectCreatePersistent") {
    const periodCount = firstAttr(node.text, "PeriodCount");
    const period = firstAttr(node.text, "Period");
    const periodEffects = allAttr(node.text, "PeriodicEffectArray").concat(allAttr(node.text, "EffectArray"));
    const bits = [];
    if (periodCount) bits.push(`${periodCount} 次`);
    if (period) bits.push(`间隔 ${period} 秒`);
    if (periodEffects.length) bits.push(`周期效果 ${periodEffects.slice(0, 3).join("、")}`);
    parts.push(bits.length ? `持续效果：${bits.join("，")}` : "持续效果");
  } else if (node.tag === "CEffectSet") {
    const effects = allAttr(node.text, "EffectArray");
    const summaries = effects
      .slice(0, 4)
      .map((id) => effectSummaryById(id, index, commander, depth + 1, seen) || id)
      .filter(Boolean);
    parts.push(summaries.length ? `组合：${summaries.join("；")}` : `组合效果 ${effectId}`);
  } else if (node.tag === "CEffectIssueOrder") {
    const abil = firstAttr(node.text, "Ability");
    parts.push(abil ? `下达命令 ${abil}` : "下达命令");
  }
  if (parts.length === 0) {
    parts.push(`${node.tag}:${effectId}`);
  }
  return parts.join("，");
}

function abilitySummary(node, index, commander) {
  if (!node) {
    return "能力节点缺失";
  }
  const parts = [];
  const cost = node.text.match(/<Cost\b[\s\S]*?<\/Cost>/)?.[0] ?? "";
  for (const vital of childAttrs(cost, "Vital")) {
    const indexName = vital.get("index");
    const value = vital.get("value");
    if (indexName && value) {
      parts.push(`${indexName} 消耗 ${value}`);
    }
  }
  for (const resource of childAttrs(cost, "Resource")) {
    const indexName = resource.get("index");
    const value = resource.get("value");
    if (indexName && value) {
      parts.push(`${indexName} 消耗 ${value}`);
    }
  }
  for (const cool of childAttrs(cost, "Cooldown")) {
    const timeUse = cool.get("TimeUse");
    const timeStart = cool.get("TimeStart");
    const link = cool.get("Link");
    const bits = [];
    if (timeStart) bits.push(`初始 ${timeStart} 秒`);
    if (timeUse) bits.push(`冷却 ${timeUse} 秒`);
    if (link) bits.push(`链接 ${link}`);
    if (bits.length) parts.push(bits.join("，"));
  }
  for (const charge of childAttrs(cost, "Charge")) {
    const countMax = charge.get("CountMax");
    const timeUse = charge.get("TimeUse");
    const bits = [];
    if (countMax) bits.push(`最大充能 ${countMax}`);
    if (timeUse) bits.push(`恢复 ${timeUse} 秒`);
    if (bits.length) parts.push(bits.join("，"));
  }
  const effect = node.text.match(/<Effect\b[^>]*\bvalue="([^"]+)"/)?.[1];
  if (effect) {
    const summary = effectSummaryById(effect, index, commander);
    parts.push(summary ? `效果：${summary}` : `效果链 ${effect}`);
  }
  return parts.length ? parts.join("；") : "无显式费用/冷却字段";
}

function analyzeCommander(commander, coreText, coreLines, index, unitBlocks) {
  const route = routeFor(coreLines, commander.type);
  const func = functionInfo(coreText, route.functionName);
  const unit = chooseUnit(unitBlocks, commander);
  const unitRel = unit ? path.relative(root, unit.file).replaceAll("\\", "/") : "";
  const unitIsShared = Boolean(unitRel && commander.mod && !unitRel.includes(`/${commander.mod}/`));
  const abilLinks = unit ? childAttrs(unit.text, "AbilArray").map((a) => a.get("Link")).filter(Boolean) : [];
  const buttons = unit ? childAttrs(unit.text, "LayoutButtons").map((a) => ({
    face: a.get("Face") ?? "",
    type: a.get("Type") ?? "",
    abilCmd: a.get("AbilCmd") ?? "",
    requirements: a.get("Requirements") ?? "",
    row: a.get("Row") ?? "0",
    column: a.get("Column") ?? "0",
  })).filter((button) => button.face !== "CancelBuilding") : [];
  const isCommandButton = (button) => (button.type === "AbilCmd" || (!button.type && button.abilCmd));
  const topButtons = buttons.filter((button) => isCommandButton(button) && button.abilCmd && Number(button.row) === 0 && Number(button.column) < Math.max(func.buttonSlots, 1));
  const offRowButtons = buttons.filter((button) => isCommandButton(button) && button.abilCmd && Number(button.row) > 0);
  const missing = [];
  for (const button of topButtons) {
    const ability = button.abilCmd.split(",")[0];
    if (ability && !chooseCatalogNode(index, "ability", ability, commander)) missing.push(`ability:${ability}`);
    if (button.face && !chooseCatalogNode(index, "button", button.face, commander)) missing.push(`button:${button.face}`);
    if (button.requirements && !chooseCatalogNode(index, "requirement", button.requirements, commander)) missing.push(`requirement:${button.requirements}`);
  }
  return {
    ...commander,
    route,
    func,
    unitRel,
    unitIsShared,
    abilLinks,
    buttons,
    topButtons,
    offRowButtons,
    missing: [...new Set(missing)],
  };
}

function buttonDetails(button, row, index, strings) {
  const ability = button.abilCmd.split(",")[0];
  const abilityNode = chooseCatalogNode(index, "ability", ability, row);
  const name = buttonName(button, index, strings, row);
  const tooltip = buttonTooltip(button, index, strings, row);
  const summary = abilitySummary(abilityNode, index, row);
  return { name, tooltip, summary, command: button.abilCmd, row: button.row, column: button.column };
}

function renderButton(button, row, index, strings) {
  const detail = buttonDetails(button, row, index, strings);
  const text = detail.tooltip ? `${detail.tooltip}；` : "";
  return `**${detail.name}**：${text}${detail.summary}（命令：\`${detail.command}\`，位置：第 ${Number(detail.row) + 1} 行第 ${Number(detail.column) + 1} 列）`;
}

function meaningfulCasterButtons(row) {
  return row.buttons.filter((button) => button.face || button.type || button.abilCmd || button.requirements);
}

function hasNoTopPanelCasterResidue(row) {
  return row.noTopPanel
    && row.route.status === "无顶部面板"
    && (row.abilLinks.length > 0 || meaningfulCasterButtons(row).length > 0);
}

function status(row) {
  if (!row.unitRel) return "缺隐藏 caster";
  if (hasNoTopPanelCasterResidue(row)) return "无顶部面板但 caster 残留技能";
  if (row.noTopPanel && row.route.status === "无顶部面板") return "无顶部面板（英雄命令卡）";
  if (row.route.status === "缺路由" || row.route.status === "路由空分支") return row.route.status;
  if (row.route.status === "无顶部面板") return row.abilLinks.length ? "有 caster 但路由跳过" : "无顶部技能";
  if (row.topButtons.length === 0) return "已路由但无第 0 行主动按钮";
  if (row.missing.length) return "Catalog 缺项";
  return "静态链路已接";
}

function md(value) {
  return String(value ?? "").replaceAll("|", "\\|").replaceAll("\n", " ").trim();
}

function renderMarkdown(rows, index, strings) {
  const lines = [];
  lines.push("# Active old line 顶部面板链路审计");
  lines.push("");
  lines.push(`生成时间：${new Date().toISOString()}`);
  lines.push("");
  lines.push("## 结论");
  lines.push("");
  lines.push("- 口径：只看 `合作指挥官版起义狂潮` 的顶部全局施法面板链路，不看建筑/单位生产命令卡。");
  lines.push("- 检查链路：`XMFinal` 初始化的隐藏 caster -> `XMCore.CU_GPInit` 路由 -> UI command panel 模板 -> caster `AbilArray/CardLayouts` -> ability/button/requirement Catalog。");
  lines.push("- `静态链路已接` 代表按钮静态可见链路闭合；目标模式、施法 actor、实际效果落地仍需进图验证。");
  lines.push("");
  lines.push("## 总表");
  lines.push("");
  lines.push("| 指挥官 | 隐藏 caster | 路由 | UI 模板/槽位 | 第 0 行主动按钮 | 异常 | 状态 |");
  lines.push("|---|---|---|---|---|---|---|");
  for (const row of rows) {
    const route = row.route.functionName ? `${row.route.status}:${row.route.functionName}` : row.route.status;
    const template = row.func.template ? `${row.func.template} / ${row.func.buttonSlots}` : "无";
    const buttons = row.topButtons.length ? row.topButtons.map((button) => {
      const detail = buttonDetails(button, row, index, strings);
      return `${detail.name}:${detail.command}`;
    }).join("<br>") : "无";
    const issues = [
      hasNoTopPanelCasterResidue(row) ? `无顶部 caster 残留 ${row.abilLinks.length} 个技能/${meaningfulCasterButtons(row).length} 个按钮` : "",
      row.offRowButtons.length ? `非第0行主动按钮 ${row.offRowButtons.length}` : "",
      row.missing.length ? `缺 ${row.missing.join(", ")}` : "",
    ].filter(Boolean).join("；") || "无";
    lines.push(`| ${md(row.zh)} | ${md(row.caster)} | ${md(route)} | ${md(template)} | ${md(buttons)} | ${md(issues)} | ${md(status(row))} |`);
  }
  lines.push("");
  lines.push("## 逐指挥官按钮效果");
  lines.push("");
  for (const row of rows) {
    lines.push(`### ${row.zh}`);
    lines.push("");
    lines.push(`- 隐藏 caster：\`${row.caster}\`${row.unitRel ? `（${row.unitRel}${row.unitIsShared ? "，共享 Catalog 定义" : ""}）` : "（未找到）"}`);
    lines.push(`- 顶部路由：${row.route.functionName ? `\`${row.route.functionName}\`` : row.route.status}`);
    if (row.topButtons.length) {
      for (const button of row.topButtons) {
        lines.push(`- ${renderButton(button, row, index, strings)}`);
      }
    } else if (row.noTopPanel) {
      lines.push(`- ${row.panelNote}`);
    } else if (row.abilLinks.length) {
      lines.push(`- 当前没有第 0 行可显示主动按钮；caster 技能为：${row.abilLinks.map((id) => `\`${id}\``).join("、")}`);
    } else {
      lines.push("- 当前隐藏 caster 没有顶部主动技能。");
    }
    if (row.offRowButtons.length) {
      lines.push(`- 注意：还有 ${row.offRowButtons.length} 个主动按钮不在第 0 行，顶部模板通常不会露出：${row.offRowButtons.map((button) => `\`${button.abilCmd}\``).join("、")}`);
    }
    if (row.missing.length) {
      lines.push(`- Catalog 缺项：${row.missing.map((item) => `\`${item}\``).join("、")}`);
    }
    lines.push("");
  }
  return `${lines.join("\n")}\n`;
}

function renderJson(rows, index, strings) {
  return `${JSON.stringify(rows.map((row) => ({
    commander: row.id,
    commanderName: row.zh,
    caster: row.caster,
    routeStatus: row.route.status,
    routeFunction: row.route.functionName,
    template: row.func.template,
    buttonSlots: row.func.buttonSlots,
    topButtons: row.topButtons.map((button) => ({
      ...button,
      ...buttonDetails(button, row, index, strings),
    })),
    offRowButtons: row.offRowButtons,
    missing: row.missing,
    status: status(row),
    unitFile: row.unitRel,
    unitIsShared: row.unitIsShared,
    panelNote: row.panelNote ?? "",
  })), null, 2)}\n`;
}

function main() {
  const coreText = read(xmCoreGalaxy);
  const coreLines = coreText.split(/\r?\n/);
  const { index, unitBlocks } = buildIndex();
  const strings = buildStringMap();
  const rows = commanders.map((commander) => analyzeCommander(commander, coreText, coreLines, index, unitBlocks));
  write(path.join(outputDir, "active-old-line-top-panel-audit.md"), renderMarkdown(rows, index, strings));
  write(path.join(outputDir, "active-old-line-top-panel-audit.json"), renderJson(rows, index, strings));
  const closedStatuses = new Set(["静态链路已接", "无顶部技能", "无顶部面板（英雄命令卡）"]);
  const badRows = rows.filter((row) => !closedStatuses.has(status(row)));
  console.log(`ACTIVE_TOP_PANEL_ROWS=${rows.length}`);
  console.log(`ACTIVE_TOP_PANEL_NON_CLOSED=${badRows.length}`);
  console.log(`ACTIVE_TOP_PANEL_OUTPUT=${path.relative(root, outputDir).replaceAll("\\", "/")}`);
  if (badRows.length) {
    console.log(`ACTIVE_TOP_PANEL_NON_CLOSED_COMMANDERS=${badRows.map((row) => `${row.id}:${status(row)}`).join(",")}`);
  }
}

main();
