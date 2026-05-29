import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "../..");
const today = new Date().toISOString().slice(0, 10);

function parseArgs(argv) {
  const options = {
    mirrorRoot: path.join(repoRoot, "游戏数据", "官方SC2原始文本镜像"),
    outputDir: path.join(repoRoot, "docs", "每日进度", `${today}-官方SC2原始文本镜像AI索引`),
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const next = () => {
      index += 1;
      if (index >= argv.length) throw new Error(`Missing value for ${arg}`);
      return argv[index];
    };

    if (arg === "--mirror-root") {
      options.mirrorRoot = path.resolve(next());
    } else if (arg === "--output-dir") {
      options.outputDir = path.resolve(next());
    } else if (arg === "--help" || arg === "-h") {
      printHelp();
      process.exit(0);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return options;
}

function printHelp() {
  console.log(`用法:
  node scripts/sc2/index-official-sc2-raw-text-mirror.mjs [options]

作用:
  为 游戏数据/官方SC2原始文本镜像 生成 AI 可读入口索引。

参数:
  --mirror-root <path>  官方 SC2 原始文本镜像目录
  --output-dir <path>   索引输出目录
`);
}

function assertDirectory(dir, label) {
  if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) {
    throw new Error(`${label} directory not found: ${dir}`);
  }
}

function listFiles(root) {
  const result = [];
  const stack = [root];
  while (stack.length > 0) {
    const current = stack.pop();
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(full);
      } else if (entry.isFile()) {
        result.push(full);
      }
    }
  }
  return result.sort((left, right) => left.localeCompare(right, "zh-CN"));
}

function directoryNames(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((left, right) => left.localeCompare(right, "zh-CN"));
}

function fileStats(files) {
  const byExtension = new Map();
  let totalBytes = 0;
  for (const file of files) {
    const stat = fs.statSync(file);
    totalBytes += stat.size;
    const ext = path.extname(file).toLowerCase() || "(no extension)";
    const current = byExtension.get(ext) ?? { extension: ext, count: 0, bytes: 0 };
    current.count += 1;
    current.bytes += stat.size;
    byExtension.set(ext, current);
  }
  return {
    totalFiles: files.length,
    totalBytes,
    totalMb: roundMb(totalBytes),
    byExtension: [...byExtension.values()].sort((left, right) => right.count - left.count || left.extension.localeCompare(right.extension)),
  };
}

function roundMb(bytes) {
  return Math.round((bytes / 1024 / 1024) * 100) / 100;
}

function relative(root, value) {
  return path.relative(root, value).replace(/\\/g, "/");
}

function existsInfo(root, relativePath, purpose) {
  const full = path.join(root, relativePath);
  return {
    path: relativePath.replace(/\\/g, "/"),
    exists: fs.existsSync(full),
    purpose,
    files: fs.existsSync(full) && fs.statSync(full).isDirectory() ? listFiles(full).length : undefined,
    bytes: fs.existsSync(full) && fs.statSync(full).isFile() ? fs.statSync(full).size : undefined,
  };
}

function firstLevelStats(root, childNames) {
  return childNames.map((name) => {
    const full = path.join(root, name);
    const files = listFiles(full);
    const stats = fileStats(files);
    return {
      name,
      files: stats.totalFiles,
      mb: stats.totalMb,
    };
  });
}

function buildGamedataFileIndex(mirrorRoot, moduleRelativePaths) {
  const importantNames = [
    "userdata.xml",
    "unitdata.xml",
    "abildata.xml",
    "upgradedata.xml",
    "requirementdata.xml",
    "requirementnodedata.xml",
    "effectdata.xml",
    "behaviordata.xml",
    "buttondata.xml",
    "weapondata.xml",
    "actordata.xml",
    "modeldata.xml",
    "commanderdata.xml",
    "armycategorydata.xml",
    "commanders/futurecommanders.xml",
    "commanders/commandertychus.xml",
  ];

  const rows = [];
  for (const modulePath of moduleRelativePaths) {
    for (const fileName of importantNames) {
      const rel = path.join(modulePath, "base.sc2data", "gamedata", fileName).replace(/\\/g, "/");
      const full = path.join(mirrorRoot, rel);
      if (!fs.existsSync(full)) continue;
      rows.push({
        module: modulePath.replace(/\\/g, "/"),
        file: fileName,
        path: rel,
        bytes: fs.statSync(full).size,
      });
    }
  }
  return rows;
}

function markdownTable(rows, columns) {
  if (rows.length === 0) return "- 无。\n";
  const header = `| ${columns.map((column) => column.title).join(" | ")} |`;
  const separator = `| ${columns.map(() => "---").join(" | ")} |`;
  const body = rows.map((row) => `| ${columns.map((column) => escapeCell(column.value(row))).join(" | ")} |`);
  return [header, separator, ...body].join("\n") + "\n";
}

function escapeCell(value) {
  return String(value ?? "").replace(/\r?\n/g, "<br>").replace(/\|/g, "\\|");
}

function renderMarkdown(options, index) {
  const mirrorDisplay = relative(repoRoot, options.mirrorRoot);
  const lines = [];
  lines.push("# 官方 SC2 原始文本镜像 AI 阅读入口");
  lines.push("");
  lines.push(`- 镜像根目录：\`${mirrorDisplay}\``);
  lines.push(`- 生成时间：${new Date().toLocaleString("zh-CN", { hour12: false })}`);
  lines.push(`- 文件数量：${index.stats.totalFiles}`);
  lines.push(`- 总大小：${index.stats.totalMb} MB`);
  lines.push("");
  lines.push("## 硬规则");
  lines.push("");
  lines.push("- `references/sc2-build-96883-casc-export` 以及旧 `references/official-casc-export` 已废弃，只能看历史文档时作为旧线索，不能再作为官方事实源。");
  lines.push("- 当前官方原始文本事实源是 `游戏数据/官方SC2原始文本镜像`。");
  lines.push("- `游戏数据/官方合作指挥官/commanders/<Commander>/` 是从官方源导出的易读 JSON，可用于快速读名册、数值和命令卡，但遇到闭包疑问要回查本镜像。");
  lines.push("- 当前实现目标仍是 `合作指挥官版起义狂潮/`，不要把官方镜像或 `原始mod/` 当成可直接运行的 active 线。");
  lines.push("");
  lines.push("## 术语速查");
  lines.push("");
  lines.push("| 术语 | 含义 | 典型路径 |");
  lines.push("| --- | --- | --- |");
  lines.push("| StarCoop | 官方合作模式共享 Mod。大多数合作指挥官的单位、建筑、技能、精通、等级加点覆盖层都在这里。 | `mods/starcoop/starcoop.sc2mod` |");
  lines.push("| Commander 子包 | 后期独立指挥官补充包，目前重点是斯台特曼和蒙斯克。 | `mods/starcoop/commanders/<Commander>.sc2mod` |");
  lines.push("| AlliedCommanders | 合作模式共享包和本地化补充，通常作为辅助查证。 | `mods/alliedcommanders.sc2mod` |");
  lines.push("| Catalog 覆盖层 | `unitdata/abildata/effectdata/...` 这类 XML。最终定义可能跨 StarCoop 与底层多人/战役模块叠加。 | `base.sc2data/gamedata/*.xml` |");
  lines.push("| UserData | 合作模式结构化数据，等级加点、精通、TechUnit、ArmyCategory 常从这里起步。 | `base.sc2data/gamedata/userdata.xml` |");
  lines.push("| 本地化 | 中文名称、按钮说明、tooltip。中文优先查 `zhcn`，缺失时再看英文。 | `zhcn.sc2data/localizeddata/*.txt` |");
  lines.push("| 触发器脚本 | 合作模式运行时触发、UI 和部分机制逻辑。Catalog 查不到闭包时继续看这里。 | `base.sc2data/*.galaxy`、`base.sc2data/triggerlibs/**/*.galaxy` |");
  lines.push("");
  lines.push("## 最常用入口");
  lines.push("");
  lines.push(markdownTable(index.keyPaths, [
    { title: "路径", value: (row) => row.path },
    { title: "存在", value: (row) => (row.exists ? "是" : "否") },
    { title: "用途", value: (row) => row.purpose },
  ]));
  lines.push("## 合作指挥官读取顺序");
  lines.push("");
  lines.push("1. 先读 `游戏数据/官方合作指挥官/commanders/<Commander>/` 的 JSON，拿中文名、单位 ID、数值、命令卡和生产链候选。");
  lines.push("2. 追官方合作通用 Catalog 时读 `mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/`。");
  lines.push("3. 斯台特曼、蒙斯克额外读 `mods/starcoop/commanders/egonstetmann.sc2mod/` 与 `mods/starcoop/commanders/arcturusmengsk.sc2mod/`。");
  lines.push("4. 如果 `starcoop` 只是覆盖层，继续向底层 `voidmulti`、`void`、`swarmmulti`、`swarm`、`libertymulti`、`liberty`、`core` 追基础单位/技能。");
  lines.push("5. 最后只把修复落到 `合作指挥官版起义狂潮/Mods/XM/<Commander>.SC2Mod` 或当前 owner 明确要求的 active 模块。");
  lines.push("");
  lines.push("## 单位/建筑/技能排查路线");
  lines.push("");
  lines.push("1. 从易读 JSON 或 `userdata.xml` 找指挥官名册、`TechUnit`、`ArmyCategory`、`CampaignPerk`、`MasteryUpgrades`。");
  lines.push("2. 用单位/建筑 ID 到 `unitdata.xml` 查命令卡、生产者、武器、Behavior、升级引用；没有本地 `CUnit` 不等于缺失，可能继承自底层模块。");
  lines.push("3. 用命令卡按钮追 `buttondata.xml`、`abildata.xml`、`requirementdata.xml`、`requirementnodedata.xml`，确认玩家是否真的能点、能训练、能变形、能建造。");
  lines.push("4. 用技能或升级引用继续追 `effectdata.xml`、`behaviordata.xml`、`weapondata.xml`、`validatordata.xml`，确认数值加成和触发条件。");
  lines.push("5. 如果 Catalog 链不完整，再查 `base.sc2data/*.galaxy` 与 `triggerlibs/**/*.galaxy`；最后才回到 active 线对照 `合作指挥官版起义狂潮/Mods/XM/`。");
  lines.push("");
  lines.push("## 快速搜索命令");
  lines.push("");
  lines.push("```powershell");
  lines.push("rg -n 'CampaignPerk|MasteryUpgrades' '游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/userdata.xml' '游戏数据/官方SC2原始文本镜像/mods/starcoop/commanders'");
  lines.push("rg -n '<CUnit id=\"BroodLord\"|<CAbil.* id=\"MutaliskMorphToBroodLord\"|MorphToBroodLord' '游戏数据/官方SC2原始文本镜像/mods/starcoop' '游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod' '游戏数据/官方SC2原始文本镜像/mods/swarmmulti.sc2mod'");
  lines.push("rg -n 'KerriganVoidCoop|HydraliskLurker|BroodLord' '游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata'");
  lines.push("```");
  lines.push("");
  lines.push("## StarCoop 关键 Catalog 文件");
  lines.push("");
  lines.push(markdownTable(index.starcoopGamedataFiles, [
    { title: "文件", value: (row) => row.name },
    { title: "大小", value: (row) => `${row.kb} KB` },
    { title: "用途", value: (row) => row.purpose },
  ]));
  lines.push("## 关键模块 Catalog 文件索引");
  lines.push("");
  lines.push(markdownTable(index.gamedataIndex, [
    { title: "模块", value: (row) => row.module },
    { title: "文件", value: (row) => row.file },
    { title: "路径", value: (row) => row.path },
  ]));
  lines.push("## mods 目录概览");
  lines.push("");
  lines.push(markdownTable(index.modsStats, [
    { title: "模块", value: (row) => row.name },
    { title: "文件数", value: (row) => row.files },
    { title: "大小", value: (row) => `${row.mb} MB` },
  ]));
  lines.push("## campaigns 目录概览");
  lines.push("");
  lines.push(markdownTable(index.campaignStats, [
    { title: "模块", value: (row) => row.name },
    { title: "文件数", value: (row) => row.files },
    { title: "大小", value: (row) => `${row.mb} MB` },
  ]));
  lines.push("## 文件类型统计");
  lines.push("");
  lines.push(markdownTable(index.stats.byExtension, [
    { title: "扩展名", value: (row) => row.extension },
    { title: "文件数", value: (row) => row.count },
    { title: "大小", value: (row) => `${roundMb(row.bytes)} MB` },
  ]));
  lines.push("## 注意点");
  lines.push("");
  lines.push("- `zhcn.sc2data/localizeddata/*.txt` 是简中本地化，`zhtw.sc2data` 是繁中。需要中文名和 tooltip 时优先查简中。");
  lines.push("- `base.sc2data/gamedata/*.xml` 是 Catalog 覆盖层。一个单位的最终定义可能分散在多个模块，不能只看首次命中的文件。");
  lines.push("- `preloadassetdb.txt` 更像资源/ID 预载清单，不能单独证明单位可生产、技能可点击。");
  lines.push("- 历史文档中写 `references/sc2-build-96883-casc-export` 或 `references/official-casc-export` 的地方，需要按本文件重新映射到 `游戏数据/官方SC2原始文本镜像`。");
  return `${lines.join("\n")}\n`;
}

function starcoopPurpose(fileName) {
  const purposes = new Map([
    ["userdata.xml", "CampaignPerk、MasteryUpgrades、TechUnit 等合作模式结构化用户数据"],
    ["unitdata.xml", "合作模式单位/建筑 Catalog 覆盖层"],
    ["abildata.xml", "合作模式技能、训练、建造、变形 Catalog 覆盖层"],
    ["upgradedata.xml", "等级、精通、科技升级实际 Effect 引用"],
    ["requirementdata.xml", "命令卡显示、解锁、科技前置 Requirement"],
    ["requirementnodedata.xml", "Requirement 节点细节"],
    ["effectdata.xml", "伤害、搜索、创建、ApplyBehavior 等效果闭包"],
    ["behaviordata.xml", "Buff/Behavior、周期效果、属性修改"],
    ["buttondata.xml", "按钮图标、名称、tooltip key"],
    ["weapondata.xml", "武器、攻击间隔、效果入口"],
    ["actordata.xml", "Actor 事件、模型/音效/变形表现"],
    ["modeldata.xml", "模型资源引用"],
    ["commanderdata.xml", "合作指挥官选择与元信息"],
    ["armycategorydata.xml", "合作军队分类、TechUnit/ArmyCategory 关联"],
  ]);
  return purposes.get(fileName.toLowerCase()) ?? "其他 Catalog/数据文件";
}

function buildIndex(options) {
  assertDirectory(options.mirrorRoot, "Official SC2 raw text mirror");
  const files = listFiles(options.mirrorRoot);
  const stats = fileStats(files);
  const modsRoot = path.join(options.mirrorRoot, "mods");
  const campaignsRoot = path.join(options.mirrorRoot, "campaigns");
  const mods = directoryNames(modsRoot);
  const campaigns = directoryNames(campaignsRoot);
  const coopModules = [
    "mods/starcoop/starcoop.sc2mod",
    "mods/starcoop/commanders/egonstetmann.sc2mod",
    "mods/starcoop/commanders/arcturusmengsk.sc2mod",
    "mods/alliedcommanders.sc2mod",
    "mods/voidmulti.sc2mod",
    "mods/void.sc2mod",
    "mods/swarmmulti.sc2mod",
    "mods/swarm.sc2mod",
    "mods/libertymulti.sc2mod",
    "mods/liberty.sc2mod",
    "mods/core.sc2mod",
  ];

  const keyPaths = [
    existsInfo(options.mirrorRoot, "export-summary.json", "镜像导出摘要"),
    existsInfo(options.mirrorRoot, "casc-export-file-list.txt", "原始 CASC 文本文件清单"),
    existsInfo(options.mirrorRoot, "mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata", "官方合作通用 Catalog 主入口"),
    existsInfo(options.mirrorRoot, "mods/starcoop/starcoop.sc2mod/base.sc2data/includes.xml", "官方合作 Galaxy include 入口"),
    existsInfo(options.mirrorRoot, "mods/starcoop/starcoop.sc2mod/base.sc2data/libcomu.galaxy", "官方合作通用运行时脚本"),
    existsInfo(options.mirrorRoot, "mods/starcoop/starcoop.sc2mod/base.sc2data/triggerlibs", "官方合作触发器库"),
    existsInfo(options.mirrorRoot, "mods/starcoop/starcoop.sc2mod/zhcn.sc2data/localizeddata", "官方合作简中本地化"),
    existsInfo(options.mirrorRoot, "mods/starcoop/commanders/egonstetmann.sc2mod/base.sc2data/gamedata", "斯台特曼独立官方 Catalog"),
    existsInfo(options.mirrorRoot, "mods/starcoop/commanders/arcturusmengsk.sc2mod/base.sc2data/gamedata", "蒙斯克独立官方 Catalog"),
    existsInfo(options.mirrorRoot, "mods/alliedcommanders.sc2mod", "合作模式共享包/本地化补充"),
    existsInfo(options.mirrorRoot, "mods/voidmulti.sc2mod/base.sc2data/gamedata", "虚空多人基础覆盖层"),
    existsInfo(options.mirrorRoot, "mods/swarmmulti.sc2mod/base.sc2data/gamedata", "虫群多人基础覆盖层"),
    existsInfo(options.mirrorRoot, "mods/libertymulti.sc2mod/base.sc2data/gamedata", "自由多人基础覆盖层"),
    existsInfo(options.mirrorRoot, "mods/core.sc2mod/base.sc2data/gamedata", "最底层核心 Catalog"),
  ];

  const starcoopGamedata = path.join(options.mirrorRoot, "mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata");
  const starcoopGamedataFiles = fs.existsSync(starcoopGamedata)
    ? fs
        .readdirSync(starcoopGamedata, { withFileTypes: true })
        .filter((entry) => entry.isFile())
        .map((entry) => {
          const full = path.join(starcoopGamedata, entry.name);
          return {
            name: entry.name,
            kb: Math.round((fs.statSync(full).size / 1024) * 10) / 10,
            purpose: starcoopPurpose(entry.name),
          };
        })
        .sort((left, right) => left.name.localeCompare(right.name))
    : [];

  return {
    mirrorRoot: relative(repoRoot, options.mirrorRoot),
    stats,
    mods,
    campaigns,
    modsStats: firstLevelStats(modsRoot, mods),
    campaignStats: firstLevelStats(campaignsRoot, campaigns),
    keyPaths,
    starcoopGamedataFiles,
    gamedataIndex: buildGamedataFileIndex(options.mirrorRoot, coopModules),
  };
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  const index = buildIndex(options);
  fs.mkdirSync(options.outputDir, { recursive: true });
  const markdownPath = path.join(options.outputDir, "官方SC2原始文本镜像AI阅读入口.md");
  const jsonPath = path.join(options.outputDir, "official-sc2-raw-text-mirror-index.json");
  fs.writeFileSync(markdownPath, renderMarkdown(options, index), "utf8");
  fs.writeFileSync(jsonPath, `${JSON.stringify({ generated_at: new Date().toISOString(), options, index }, null, 2)}\n`, "utf8");
  console.log(`Wrote Markdown: ${markdownPath}`);
  console.log(`Wrote JSON: ${jsonPath}`);
}

main();
