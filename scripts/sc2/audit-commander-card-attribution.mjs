import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const officialRoot = path.join(root, "游戏数据", "官方合作指挥官", "commanders");
const xmfinalRoot = path.join(root, "原始mod", "Mods", "XM", "XMFinal.SC2Mod", "Base.SC2Data");
const outputDirDefault = path.join(root, "docs", "每日进度", "2026-05-28-指挥官命令卡归属误挂扫描");

const profileFiles = [
  "LibE0EAE146_CommanderUnitAbilities.galaxy",
  "LibE0EAE146_CommanderHeroAbilities.galaxy",
];

const commanderRules = [
  { commander: "Abathur", patterns: [/Abathur/i] },
  { commander: "Alarak", patterns: [/Alarak/i, /Taldarim/i] },
  { commander: "Artanis", patterns: [/Artanis/i] },
  { commander: "Dehaka", patterns: [/Dehaka/i] },
  { commander: "Fenix", patterns: [/Fenix/i] },
  { commander: "Horner", patterns: [/Horner/i, /MiraHan/i, /\bHH[A-Za-z0-9_]/] },
  { commander: "Karax", patterns: [/Karax/i] },
  { commander: "Kerrigan", patterns: [/Kerrigan/i, /\bK5[A-Za-z0-9_]/] },
  { commander: "Mengsk", patterns: [/Mengsk/i] },
  { commander: "Nova", patterns: [/BlackOps/i, /NovaCoop/i, /GhostNova/i, /NovaWeapon/i, /NovaGadget/i, /NovaGriffin/i, /NovaKit/i, /NovaRevive/i, /NovaBlink/i] },
  { commander: "Raynor", patterns: [/Raynor/i] },
  { commander: "Stetmann", patterns: [/Stetmann/i] },
  { commander: "Stukov", patterns: [/Stukov/i, /\bSI[A-Za-z0-9_]/] },
  { commander: "Swann", patterns: [/Swann/i, /Drakken/i] },
  { commander: "Tychus", patterns: [/Tychus/i] },
  { commander: "Vorazun", patterns: [/Vorazun/i] },
  { commander: "Zagara", patterns: [/Zagara/i] },
  { commander: "Zeratul", patterns: [/Zeratul/i] },
];

const explicitOwnerRules = [
  {
    owner: "Zagara",
    reason: "基础跳虫变爆虫链只应进入扎加拉链路，凯瑞甘/斯托科夫这类共享 Zergling 命令卡不能直接继承",
    match: (fields) => fields.abilityId === "MorphZerglingToBaneling"
      || fields.abilityId === "MorphToBaneling"
      || fields.face === "Baneling"
      || fields.buttonId === "Baneling",
  },
  {
    owner: "Zagara",
    reason: "扎加拉跳虫闪避精通只应进入扎加拉链路",
    match: (fields) => fields.face === "ZagaraVoidCoopZerglingDodge"
      || fields.buttonId === "ZagaraVoidCoopZerglingDodge"
      || fields.requirementId === "HaveMasteryZagaraZerglingDodgeChance",
  },
  {
    owner: "Stukov",
    reason: "斯托科夫感染体野性突变不应从共享异龙命令卡串到其他异虫指挥官",
    match: (fields) => fields.face === "StukovInfestedWildMutation"
      || fields.buttonId === "StukovInfestedWildMutation"
      || fields.abilityId === "StukovInfestedWildMutation",
  },
  {
    owner: "Karax",
    reason: "凯拉克斯不朽者暗影炮不应从共享不朽者命令卡串到其他星灵指挥官",
    match: (fields) => fields.face === "ShadowCannonLocked"
      || fields.buttonId === "ShadowCannonLocked"
      || fields.face === "ImmortalShakurasShadowCannon"
      || fields.buttonId === "ImmortalShakurasShadowCannon"
      || fields.abilityId === "ImmortalShakurasShadowCannon"
      || fields.requirementId === "KaraxLevel09",
  },
];

function parseArgs() {
  const args = new Map();
  for (let i = 2; i < process.argv.length; i += 1) {
    const arg = process.argv[i];
    if (!arg.startsWith("--")) continue;
    const key = arg.slice(2);
    const next = process.argv[i + 1];
    if (next && !next.startsWith("--")) {
      args.set(key, next);
      i += 1;
    } else {
      args.set(key, true);
    }
  }
  return {
    officialRoot: path.resolve(String(args.get("official-root") ?? officialRoot)),
    xmfinalRoot: path.resolve(String(args.get("xmfinal-root") ?? xmfinalRoot)),
    outputDir: path.resolve(String(args.get("output-dir") ?? outputDirDefault)),
  };
}

function readJson(file) {
  if (!fs.existsSync(file)) return [];
  const raw = fs.readFileSync(file, "utf8").trim();
  return raw ? JSON.parse(raw) : [];
}

function asArray(value) {
  if (value == null) return [];
  return Array.isArray(value) ? value : [value];
}

function commanderNames(rootDir) {
  return fs.readdirSync(rootDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((left, right) => left.localeCompare(right, "en"));
}

function abilityIdFromCommand(abilCmd) {
  const value = String(abilCmd ?? "").trim();
  if (!value || value === "255,255") return "";
  return value.split(",")[0].trim();
}

function detectMarkerOwners(value, currentCommander) {
  const text = String(value ?? "");
  if (!text) return [];
  const owners = [];
  for (const rule of commanderRules) {
    if (rule.commander === currentCommander) continue;
    if (rule.patterns.some((pattern) => pattern.test(text))) {
      owners.push(rule.commander);
    }
  }
  return owners;
}

function explicitRuleFindings(fields, currentCommander) {
  const findings = [];
  for (const rule of explicitOwnerRules) {
    if (rule.owner === currentCommander) continue;
    if (rule.match(fields)) {
      findings.push({
        expectedOwner: rule.owner,
        reason: rule.reason,
      });
    }
  }
  return findings;
}

function fieldValues(fields) {
  return [
    ["objectId", fields.objectId],
    ["entryId", fields.entryId],
    ["face", fields.face],
    ["buttonId", fields.buttonId],
    ["abilityId", fields.abilityId],
    ["requirementId", fields.requirementId],
    ["buttonParent", fields.buttonParent],
    ["nameKey", fields.nameKey],
    ["tooltipKey", fields.tooltipKey],
  ];
}

function buildFindingsForFields({ scope, commander, objectName, objectType, fields, sourceFile }) {
  const findings = [];
  for (const [field, value] of fieldValues(fields)) {
    const markerOwners = detectMarkerOwners(value, commander);
    for (const owner of markerOwners) {
      findings.push({
        severity: scope === "XMFinalProfile" ? "P1" : "P2",
        scope,
        commander,
        objectType,
        objectName,
        objectId: fields.objectId,
        face: fields.face,
        abilityId: fields.abilityId,
        requirementId: fields.requirementId,
        field,
        value,
        expectedOwner: owner,
        reason: "字段 ID/Key 中出现其他指挥官标识",
        sourceFile,
      });
    }
  }

  for (const explicit of explicitRuleFindings(fields, commander)) {
    findings.push({
      severity: scope === "XMFinalProfile" ? "P1" : "P2",
      scope,
      commander,
      objectType,
      objectName,
      objectId: fields.objectId,
      face: fields.face,
      abilityId: fields.abilityId,
      requirementId: fields.requirementId,
      field: "explicitRule",
      value: [fields.face, fields.abilityId, fields.requirementId].filter(Boolean).join(" / "),
      expectedOwner: explicit.expectedOwner,
      reason: explicit.reason,
      sourceFile,
    });
  }

  return findings;
}

function dedupeFindings(findings) {
  const seen = new Set();
  const result = [];
  for (const finding of findings) {
    const key = [
      finding.scope,
      finding.commander,
      finding.objectId,
      finding.face,
      finding.abilityId,
      finding.requirementId,
      finding.expectedOwner,
      finding.reason,
      finding.sourceFile,
    ].join("\t");
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(finding);
  }
  return result.sort((left, right) =>
    left.commander.localeCompare(right.commander, "en")
    || left.objectId.localeCompare(right.objectId, "en")
    || left.face.localeCompare(right.face, "en")
    || left.abilityId.localeCompare(right.abilityId, "en")
    || left.expectedOwner.localeCompare(right.expectedOwner, "en")
    || left.field.localeCompare(right.field, "en"));
}

function auditOfficialCommandCards(rootDir, commanders) {
  const findings = [];
  for (const commander of commanders) {
    const commandCards = asArray(readJson(path.join(rootDir, commander, "command_cards.json")));
    for (const entry of commandCards) {
      for (const card of asArray(entry.cards)) {
        for (const button of asArray(card?.buttons)) {
          const fields = {
            objectId: String(entry.unit_id ?? ""),
            entryId: String(entry.id ?? ""),
            face: String(button?.face ?? ""),
            buttonId: String(button?.button?.id ?? ""),
            abilityId: abilityIdFromCommand(button?.abil_cmd),
            requirementId: String(button?.requirements ?? ""),
            buttonParent: String(button?.button?.parent ?? ""),
            nameKey: String(button?.button?.name_key ?? ""),
            tooltipKey: String(button?.button?.tooltip_key ?? ""),
          };
          findings.push(...buildFindingsForFields({
            scope: "OfficialJson",
            commander,
            objectName: String(entry.name ?? ""),
            objectType: String(entry.object_type ?? ""),
            fields,
            sourceFile: `${commander}/command_cards.json`,
          }));
        }
      }
    }
  }
  return dedupeFindings(findings);
}

function auditXmfinalProfiles(xmfinalRootDir) {
  const findings = [];
  const entryRe = /CheckAbilityProfileEntry\([^,]+,\s*"([^"]+)",\s*([^,]+),\s*"([^"]*)",\s*"([^"]*)",\s*"([^"]*)",\s*"([^"]*)",\s*"([^"]*)"\)/g;
  for (const fileName of profileFiles) {
    const file = path.join(xmfinalRootDir, fileName);
    if (!fs.existsSync(file)) continue;
    const text = fs.readFileSync(file, "utf8");
    let match;
    while ((match = entryRe.exec(text))) {
      const [, commander, , objectId, buttonId, abilityId, requirementId, entryKind] = match;
      const fields = {
        objectId,
        entryId: "",
        face: buttonId,
        buttonId,
        abilityId,
        requirementId,
        buttonParent: "",
        nameKey: "",
        tooltipKey: "",
      };
      findings.push(...buildFindingsForFields({
        scope: "XMFinalProfile",
        commander,
        objectName: entryKind,
        objectType: fileName.includes("Hero") ? "Hero" : "Unit",
        fields,
        sourceFile: fileName,
      }));
    }
  }
  return dedupeFindings(findings);
}

function groupCounts(findings, commanders) {
  return commanders.map((commander) => {
    const rows = findings.filter((row) => row.commander === commander);
    return {
      commander,
      p1: rows.filter((row) => row.severity === "P1").length,
      p2: rows.filter((row) => row.severity === "P2").length,
      total: rows.length,
    };
  }).filter((row) => row.total > 0);
}

function escapeCell(value) {
  return String(value ?? "").replace(/\r?\n/g, "<br>").replace(/\|/g, "\\|");
}

function markdownTable(rows, columns, limit = 80) {
  if (!rows.length) return "- 无。\n";
  const visible = rows.slice(0, limit);
  const lines = [
    `| ${columns.map((column) => column.title).join(" | ")} |`,
    `| ${columns.map(() => "---").join(" | ")} |`,
  ];
  for (const row of visible) {
    lines.push(`| ${columns.map((column) => escapeCell(column.value(row))).join(" | ")} |`);
  }
  if (rows.length > visible.length) {
    lines.push("");
    lines.push(`> 仅展示前 ${visible.length} 行，完整结果见 JSON。`);
  }
  return `${lines.join("\n")}\n`;
}

function p1ReviewRows(profileFindings) {
  const rows = [];
  const seen = new Set();
  for (const row of profileFindings) {
    const key = [row.commander, row.objectId, row.face, row.abilityId, row.requirementId, row.expectedOwner].join("\t");
    if (seen.has(key)) continue;
    seen.add(key);
    const text = `${row.face} ${row.abilityId} ${row.requirementId}`;
    let level = "需复核";
    let action = "先查官方该指挥官专属升级/威望，再决定是否过滤。";

    if (row.commander === "Stukov" && row.objectId === "Zergling" && row.expectedOwner === "Zagara") {
      level = "高置信同类错误";
      action = "与凯瑞甘同源：斯托科夫跳虫不应继承扎加拉爆虫变形链/跳虫闪避精通，建议补过滤。";
    } else if (row.commander === "Abathur" && row.objectId === "Mutalisk" && /StukovInfestedWildMutation/.test(text)) {
      level = "高置信同类错误";
      action = "阿巴瑟异龙不应携带斯托科夫感染体野性突变，建议补过滤并重生 Profile。";
    } else if (row.commander === "Raynor" && row.objectId === "SiegeTank" && /Swann/.test(text)) {
      level = "高置信同类错误";
      action = "雷诺攻城坦克不应携带斯旺不朽协议，建议补过滤。";
    } else if (row.commander === "Swann" && row.objectId === "SiegeTank" && /RaynorLevel11/.test(text)) {
      level = "高置信同类错误";
      action = "斯旺攻城坦克不应走雷诺 11 级机动技能锁，建议补过滤或映射到斯旺自己的坦克能力。";
    } else if (row.commander === "Vorazun" && row.objectId === "Stalker" && /Alarak/.test(text)) {
      level = "高置信同类错误";
      action = "沃拉尊追猎者不应继承阿拉纳克追猎者/机械威望按钮，建议补过滤。";
    } else if (row.commander === "Swann" && row.objectId === "SCV" && /RaynorLevel06/.test(text)) {
      level = "需复核但偏可疑";
      action = "先确认斯旺科技树是否真的需要雷诺等级锁；若只是共享 SCV 命令卡残留，建议过滤。";
    } else if (row.commander === "Artanis" && /Karax/.test(text)) {
      level = "需复核但偏可疑";
      action = "亚坦尼斯不朽者带凯拉克斯等级锁，先对官方亚坦尼斯不朽者技能表再决定。";
    } else if (row.commander === "Fenix" && /Karax/.test(text)) {
      level = "需复核";
      action = "菲尼克斯 Purifier 单位与凯拉克斯共享 Purifier 资源较多，先查官方升级是否确属菲尼克斯。";
    } else if (row.commander === "Karax" && /Fenix/.test(text)) {
      level = "需复核";
      action = "凯拉克斯侦察机与菲尼克斯侦察机可能共享基础命令卡，先查官方 Karax Scout 升级。";
    } else if (row.commander === "Vorazun" && row.objectId === "Zealot" && /Artanis/.test(text)) {
      level = "需复核但偏可疑";
      action = "沃拉尊狂热者带亚坦尼斯旋风等级锁，若沃拉尊不应有旋风则过滤。";
    }

    rows.push({
      level,
      commander: row.commander,
      objectId: row.objectId,
      face: row.face,
      abilityId: row.abilityId,
      requirementId: row.requirementId,
      expectedOwner: row.expectedOwner,
      action,
    });
  }
  return rows;
}

function renderMarkdown({ officialRoot, xmfinalRoot, profileFindings, officialFindings, summary }) {
  const lines = [];
  const knownKerriganOfficial = officialFindings.filter((row) =>
    row.commander === "Kerrigan"
    && row.objectId === "Zergling"
    && (row.expectedOwner === "Zagara" || /爆虫|闪避|Zagara/.test(row.reason + row.value)));
  const knownKerriganProfile = profileFindings.filter((row) =>
    row.commander === "Kerrigan"
    && row.objectId === "Zergling"
    && (row.expectedOwner === "Zagara" || /Baneling|Zagara/.test(row.value)));

  lines.push("# 指挥官命令卡归属误挂排查与扫描");
  lines.push("");
  lines.push(`- 生成时间：${new Date().toLocaleString("zh-CN", { hour12: false })}`);
  lines.push(`- 官方 JSON：\`${officialRoot}\``);
  lines.push(`- XMFinal Profile：\`${xmfinalRoot}\``);
  lines.push("- 目的：复用凯瑞甘跳虫误挂爆虫链的排查路子，批量找出共享命令卡把别的指挥官按钮/技能带进来的候选。");
  lines.push("");
  lines.push("## 排查路子");
  lines.push("");
  lines.push("1. 先看现象落点：不是只搜单位名，而是从 `command_cards.json` 的按钮行开始看 `face`、`abil_cmd`、`requirements`、按钮本体 ID。凯瑞甘问题就是 `Zergling` 命令卡里带了 `ZagaraVoidCoopZerglingDodge`、`MorphZerglingToBaneling`、`MorphToBaneling`。");
  lines.push("2. 再判定归属：如果按钮/技能/需求 ID 里出现其他指挥官标识，或命中特殊归属规则（例如扎加拉跳虫闪避、基础跳虫变爆虫链、斯托科夫感染体野性突变），就标成误挂候选。");
  lines.push("3. 分清两种风险：`OfficialJson` 说明官方导出 JSON 的共享命令卡里有候选；`XMFinalProfile` 说明候选已经进入当前生成出的 XMFinal 测试/运行时 Profile，优先级更高。");
  lines.push("4. 修复时不要直接改官方导出 JSON；应在 `generate-xmfinal-commander-profiles.mjs` 和可读报告导出脚本里加过滤/映射，再重跑生成并用 `rg` 验证目标指挥官段不再出现。");
  lines.push("");
  lines.push("## 已落地过滤规则");
  lines.push("");
  lines.push("- `Kerrigan / Zergling`、`Stukov / Zergling`：过滤扎加拉跳虫闪避和基础跳虫变爆虫链，字段包括 `ZagaraVoidCoopZerglingDodge`、`Baneling`、`MorphZerglingToBaneling`、`MorphToBaneling`、`HaveMasteryZagaraZerglingDodgeChance`。");
  lines.push("- `Abathur / Mutalisk`：过滤斯托科夫感染体野性突变，字段包括 `StukovInfestedWildMutation`。");
  lines.push("- `Raynor / SiegeTank`：过滤斯旺不朽协议，字段包括 `CommanderSwannImmortalityProtocol`、`HaveSwannCommanderImmortalityProtocol`。");
  lines.push("- `Artanis / ImmortalAiur`：过滤凯拉克斯暗影炮，字段包括 `ShadowCannonLocked`、`ImmortalShakurasShadowCannon`、`KaraxLevel09`。");
  lines.push("- `Fenix / ColossusPurifier`、`Fenix / ZealotPurifier`：过滤凯拉克斯热能长枪/重构链，字段包括 `ExtendedThermalLance`、`HaveKaraxExtendedThermalLance`、`ReconstructionLocked`、`KaraxLevel04`、`ZealotPurifierReviveKaraxHide`。");
  lines.push("- `Karax / Scout`：过滤菲尼克斯摩约侦察机射程升级，字段包括 `HaveFenixScoutWeaponRange`。");
  lines.push("- `Swann / SCV`：过滤雷诺聚变芯体等级锁，字段包括 `BuildFusionCoreLocked`、`RaynorLevel06`。");
  lines.push("- `Swann / SiegeTank`：过滤雷诺推进器等级锁，字段包括 `AfterburnersLocked`、`RaynorLevel11`。");
  lines.push("- `Vorazun / Stalker`：过滤阿拉纳克杀戮者/机械威望按钮，字段包括 `AlarakStalkerPhasingArmor`、`HaveAlarakStalkerPhasingArmor`、`CommanderPrestigeAlarakMechBuff`、`CommanderPrestigeAlarakMech`。");
  lines.push("- `Vorazun / Zealot`：过滤亚坦尼斯旋风等级锁，字段包括 `WhirlwindLocked`、`ArtanisLevel04`。");
  lines.push("- 规则位置：`scripts/sc2/generate-xmfinal-commander-profiles.mjs` 与 `scripts/sc2/export-official-vs-mod-readable-report.mjs`。审计脚本只负责发现和报告，不修改官方 JSON。");
  lines.push("");
  lines.push("## 当前结论");
  lines.push("");
  lines.push(`- ` + `XMFinalProfile` + ` 疑似误挂候选：${profileFindings.length} 行。`);
  lines.push(`- ` + `OfficialJson` + ` 共享命令卡候选：${officialFindings.length} 行。`);
  lines.push(`- 凯瑞甘官方 JSON 中仍能看到共享 Zergling 候选：${knownKerriganOfficial.length} 行，这是数据源层面的共享命令卡现象。`);
  lines.push(`- 凯瑞甘 XMFinal Profile 中同类 Zergling 候选：${knownKerriganProfile.length} 行，当前应为 0。`);
  lines.push("");
  lines.push("## 按指挥官汇总");
  lines.push("");
  lines.push(markdownTable(summary, [
    { title: "指挥官", value: (row) => row.commander },
    { title: "P1 Profile", value: (row) => row.p1 },
    { title: "P2 OfficialJson", value: (row) => row.p2 },
    { title: "合计", value: (row) => row.total },
  ], 100));
  lines.push("## P1：已进入 XMFinal Profile 的候选");
  lines.push("");
  lines.push(markdownTable(profileFindings, [
    { title: "指挥官", value: (row) => row.commander },
    { title: "对象", value: (row) => `${row.objectName || ""} ${row.objectId}`.trim() },
    { title: "按钮", value: (row) => row.face },
    { title: "技能", value: (row) => row.abilityId },
    { title: "需求", value: (row) => row.requirementId },
    { title: "疑似归属", value: (row) => row.expectedOwner },
    { title: "原因", value: (row) => row.reason },
    { title: "文件", value: (row) => row.sourceFile },
  ], 120));
  lines.push("## P1 人工复核摘要");
  lines.push("");
  lines.push(markdownTable(p1ReviewRows(profileFindings), [
    { title: "判断", value: (row) => row.level },
    { title: "指挥官", value: (row) => row.commander },
    { title: "对象", value: (row) => row.objectId },
    { title: "按钮/技能/需求", value: (row) => [row.face, row.abilityId, row.requirementId].filter(Boolean).join(" / ") },
    { title: "疑似归属", value: (row) => row.expectedOwner },
    { title: "建议", value: (row) => row.action },
  ], 80));
  lines.push("## P2：官方 JSON 共享命令卡候选");
  lines.push("");
  lines.push(markdownTable(officialFindings, [
    { title: "指挥官", value: (row) => row.commander },
    { title: "对象", value: (row) => `${row.objectName || ""} ${row.objectId}`.trim() },
    { title: "按钮", value: (row) => row.face },
    { title: "技能", value: (row) => row.abilityId },
    { title: "需求", value: (row) => row.requirementId },
    { title: "疑似归属", value: (row) => row.expectedOwner },
    { title: "原因", value: (row) => row.reason },
    { title: "文件", value: (row) => row.sourceFile },
  ], 120));
  lines.push("## 后续处理建议");
  lines.push("");
  lines.push("1. 优先处理 P1：它们已经进入 `LibE0EAE146_CommanderUnitAbilities.galaxy` / `LibE0EAE146_CommanderHeroAbilities.galaxy`。");
  lines.push("2. 对 P2 不要一刀切删除：先确认它是否只是官方共享命令卡的多指挥官条目；只有当当前指挥官确实不该拥有该按钮/技能时，才加过滤。");
  lines.push("3. 每修一组后重跑：`node .\\scripts\\sc2\\generate-xmfinal-commander-profiles.mjs --write`，再重跑本脚本和人类可读对照报告。");
  lines.push("");
  return `${lines.join("\n")}\n`;
}

function main() {
  const options = parseArgs();
  const commanders = commanderNames(options.officialRoot);
  const officialFindings = auditOfficialCommandCards(options.officialRoot, commanders);
  const profileFindings = auditXmfinalProfiles(options.xmfinalRoot);
  const summary = groupCounts([...profileFindings, ...officialFindings], commanders);

  fs.mkdirSync(options.outputDir, { recursive: true });
  const payload = {
    generatedAt: new Date().toISOString(),
    officialRoot: options.officialRoot,
    xmfinalRoot: options.xmfinalRoot,
    summary,
    profileFindings,
    officialFindings,
  };
  const jsonPath = path.join(options.outputDir, "commander-card-attribution-audit.json");
  const mdPath = path.join(options.outputDir, "commander-card-attribution-audit.md");
  fs.writeFileSync(jsonPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdPath, renderMarkdown({
    officialRoot: options.officialRoot,
    xmfinalRoot: options.xmfinalRoot,
    profileFindings,
    officialFindings,
    summary,
  }), "utf8");

  console.log(`COMMANDER_CARD_ATTRIBUTION_PROFILE_FINDINGS=${profileFindings.length}`);
  console.log(`COMMANDER_CARD_ATTRIBUTION_OFFICIAL_FINDINGS=${officialFindings.length}`);
  console.log(`COMMANDER_CARD_ATTRIBUTION_OUTPUT=${options.outputDir}`);
}

main();
