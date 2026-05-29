import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "../..");

const commanderModuleMeta = new Map([
  ["xmabathur.sc2mod", "阿巴瑟"],
  ["xmalarak.sc2mod", "阿拉纳克"],
  ["xmdehaka.sc2mod", "德哈卡"],
  ["xmmengsk.sc2mod", "蒙斯克"],
  ["xmmira.sc2mod", "霍纳与汉 / Mira 旧线"],
  ["xmnova.sc2mod", "诺娃"],
  ["xmstetmann.sc2mod", "斯台特曼"],
  ["xmstukov.sc2mod", "斯托科夫"],
  ["xmswann.sc2mod", "斯旺"],
  ["xmtychus.sc2mod", "泰凯斯"],
]);

function parseArgs(argv) {
  const options = {
    mirrorRoot: path.join(repoRoot, "游戏数据", "原始mod原始文本镜像"),
    outputDir: path.join(repoRoot, "游戏数据", "原始mod原始文本镜像AI索引"),
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
  node scripts/sc2/index-originalmod-raw-text-mirror.mjs [options]

作用:
  为 游戏数据/原始mod原始文本镜像 生成中文 AI 阅读入口和模块索引。

参数:
  --mirror-root <path>  原始mod 文本镜像目录
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
      if (entry.isDirectory()) stack.push(full);
      else if (entry.isFile()) result.push(full);
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

function relative(root, value) {
  return path.relative(root, value).replace(/\\/g, "/");
}

function roundMb(bytes) {
  return Math.round((bytes / 1024 / 1024) * 100) / 100;
}

function roundKb(bytes) {
  return Math.round((bytes / 1024) * 100) / 100;
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

function readJsonIfExists(file) {
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, "utf8"));
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

function keyPath(root, rel, purpose) {
  const full = path.join(root, rel);
  return {
    path: rel.replace(/\\/g, "/"),
    exists: fs.existsSync(full),
    purpose,
  };
}

function buildModuleRows(mirrorRoot) {
  const modulesRoot = path.join(mirrorRoot, "mods", "xm");
  const modules = directoryNames(modulesRoot);
  return modules.map((moduleName) => {
    const moduleRoot = path.join(modulesRoot, moduleName);
    const files = listFiles(moduleRoot);
    const stats = fileStats(files);
    const keyFiles = [
      "documentinfo",
      "base.sc2data/gamedata/unitdata.xml",
      "base.sc2data/gamedata/abildata.xml",
      "base.sc2data/gamedata/buttondata.xml",
      "base.sc2data/gamedata/userdata.xml",
      "zhcn.sc2data/localizeddata/gamestrings.txt",
      "zhcn.sc2data/localizeddata/objectstrings.txt",
      "base.sc2data/libe0eae146_commanderrosters.galaxy",
      "base.sc2data/lib67c0f0e7.galaxy",
    ];
    const existingKeyFiles = keyFiles
      .map((item) => item.replace(/\//g, path.sep))
      .filter((item) => fs.existsSync(path.join(moduleRoot, item)))
      .map((item) => item.replace(/\\/g, "/"));
    return {
      module: moduleName,
      label: commanderModuleMeta.get(moduleName) ?? "",
      files: stats.totalFiles,
      mb: stats.totalMb,
      keyFiles: existingKeyFiles,
    };
  });
}

function buildImportantGamedataIndex(mirrorRoot, modules) {
  const importantNames = [
    "unitdata.xml",
    "abildata.xml",
    "buttondata.xml",
    "userdata.xml",
    "upgradedata.xml",
    "requirementdata.xml",
    "requirementnodedata.xml",
    "effectdata.xml",
    "behaviordata.xml",
    "commanderdata.xml",
    "armycategorydata.xml",
  ];

  const rows = [];
  for (const module of modules) {
    for (const name of importantNames) {
      const rel = path.join("mods", "xm", module.module, "base.sc2data", "gamedata", name);
      const full = path.join(mirrorRoot, rel);
      if (!fs.existsSync(full)) continue;
      rows.push({
        module: module.module,
        label: module.label,
        file: name,
        path: rel.replace(/\\/g, "/"),
        kb: roundKb(fs.statSync(full).size),
      });
    }
  }
  return rows;
}

function buildSummaryJson(options, stats, modules, importantFiles) {
  const exportSummary = readJsonIfExists(path.join(options.mirrorRoot, "export-summary.json"));
  return {
    mirrorRoot: options.mirrorRoot,
    outputDir: options.outputDir,
    generatedAt: new Date().toISOString(),
    mirrorDataFiles: exportSummary?.file_count ?? stats.totalFiles,
    mirrorDataBytes: exportSummary?.total_bytes ?? stats.totalBytes,
    mirrorDataMb: exportSummary?.total_mb ?? stats.totalMb,
    totalFiles: stats.totalFiles,
    totalBytes: stats.totalBytes,
    totalMb: stats.totalMb,
    modules: modules.map((module) => ({
      module: module.module,
      label: module.label,
      files: module.files,
      mb: module.mb,
      keyFiles: module.keyFiles,
    })),
    importantFiles,
  };
}

function renderMarkdown(options, stats, modules, importantFiles, summary) {
  const lines = [];
  lines.push("# 原始mod 文本镜像 AI 阅读入口");
  lines.push("");
  lines.push(`- 镜像根目录：\`${relative(repoRoot, options.mirrorRoot)}\``);
  lines.push(`- 索引目录：\`${relative(repoRoot, options.outputDir)}\``);
  lines.push(`- 生成时间：${new Date().toLocaleString("zh-CN", { hour12: false })}`);
  lines.push(`- 镜像数据文件数：${summary.mirrorDataFiles}`);
  lines.push(`- 镜像数据大小：${summary.mirrorDataMb} MB`);
  lines.push(`- 含辅助文件后的当前目录文件数：${stats.totalFiles}`);
  lines.push("");
  lines.push("## 这套数据是什么");
  lines.push("");
  lines.push("- 来源是仓库内 `原始mod/Mods/XM`，不是游戏内 smoke，也不是官方 CASC。");
  lines.push("- 目标是给后续 AI/人工直接读取当前原始mod的文本资源：`GameData XML`、`LocalizedData TXT`、`Galaxy`、`UI Layout` 等。");
  lines.push("- 路径被统一镜像到小写结构：`mods/xm/<module>.sc2mod/...`，便于后续脚本和 `rg` 直接处理。");
  lines.push("- 已知二进制 `documentheader` 没有直接镜像，是否存在请回源目录看 `原始mod/Mods/XM/**/DocumentHeader`。");
  lines.push("");
  lines.push("## 最常用入口");
  lines.push("");
  lines.push(markdownTable([
    keyPath(options.mirrorRoot, "mods/xm/xmfinal.sc2mod/base.sc2data/gamedata/unitdata.xml", "当前统一 runtime owner 的单位/建筑定义"),
    keyPath(options.mirrorRoot, "mods/xm/xmfinal.sc2mod/base.sc2data/gamedata/abildata.xml", "当前统一 runtime owner 的技能/训练/建造定义"),
    keyPath(options.mirrorRoot, "mods/xm/xmfinal.sc2mod/base.sc2data/libe0eae146_commanderrosters.galaxy", "当前 XMFinal 按指挥官名册生成结果"),
    keyPath(options.mirrorRoot, "mods/xm/xmfinal.sc2mod/base.sc2data/libe0eae146_commanderbuildings.galaxy", "当前 XMFinal 建筑面板/建筑名册生成结果"),
    keyPath(options.mirrorRoot, "mods/xm/xmfinal.sc2mod/base.sc2data/libe0eae146_commanderunitabilities.galaxy", "当前 XMFinal 单位技能面板生成结果"),
    keyPath(options.mirrorRoot, "mods/xm/xmcore.sc2mod/base.sc2data/lib67c0f0e7.galaxy", "共享面板/UI 分类逻辑"),
    keyPath(options.mirrorRoot, "mods/xm/xmnova.sc2mod/base.sc2data/gamedata/unitdata.xml", "诺娃当前模块单位/建筑数据"),
    keyPath(options.mirrorRoot, "mods/xm/xmstukov.sc2mod/base.sc2data/gamedata/userdata.xml", "斯托科夫当前模块结构化数据"),
  ], [
    { title: "路径", value: (row) => row.path },
    { title: "存在", value: (row) => (row.exists ? "是" : "否") },
    { title: "用途", value: (row) => row.purpose },
  ]));
  lines.push("## 建议读取顺序");
  lines.push("");
  lines.push("1. 先看 `mods/xm/xmfinal.sc2mod/base.sc2data/libe0eae146_commander*.galaxy`，确认当前 runtime 认为每个指挥官有哪些兵种、建筑、技能。");
  lines.push("2. 再看 `mods/xm/xmfinal.sc2mod/base.sc2data/gamedata/*.xml`，确认 XMFinal 自己改了哪些通用 Catalog。");
  lines.push("3. 然后回到具体指挥官模块，例如 `xmnova.sc2mod`、`xmstukov.sc2mod`、`xmswann.sc2mod`，查它们自己的 `unitdata/abildata/buttondata/userdata`。");
  lines.push("4. 面板和共享 UI 问题优先看 `xmcore.sc2mod/base.sc2data/lib67c0f0e7.galaxy` 以及 `ui/layout/*.sc2layout`。");
  lines.push("5. 中文名称、说明、tooltip 优先看各模块 `zhcn.sc2data/localizeddata/gamestrings.txt` 和 `objectstrings.txt`。");
  lines.push("");
  lines.push("## 模块概览");
  lines.push("");
  lines.push(markdownTable(modules, [
    { title: "模块", value: (row) => row.module },
    { title: "中文说明", value: (row) => row.label || "-" },
    { title: "文件数", value: (row) => row.files },
    { title: "大小", value: (row) => `${row.mb} MB` },
    { title: "关键文件", value: (row) => row.keyFiles.join("<br>") || "-" },
  ]));
  lines.push("## 关键 GameData 文件索引");
  lines.push("");
  lines.push(markdownTable(importantFiles, [
    { title: "模块", value: (row) => row.module },
    { title: "中文说明", value: (row) => row.label || "-" },
    { title: "文件", value: (row) => row.file },
    { title: "路径", value: (row) => row.path },
    { title: "大小", value: (row) => `${row.kb} KB` },
  ]));
  lines.push("## 文件类型统计");
  lines.push("");
  lines.push(markdownTable(stats.byExtension, [
    { title: "扩展名", value: (row) => row.extension },
    { title: "文件数", value: (row) => row.count },
    { title: "大小", value: (row) => `${roundMb(row.bytes)} MB` },
  ]));
  lines.push("## 可直接搜索的命令");
  lines.push("");
  lines.push("```powershell");
  lines.push("rg -n 'Raynor|Nova|Kerrigan|Stukov|Swann' '游戏数据/原始mod原始文本镜像/mods/xm/xmfinal.sc2mod/base.sc2data/libe0eae146_commanderrosters.galaxy'");
  lines.push("rg -n '<CUnit id=\"SCVNova\"|<CUnit id=\"CommandCenterNova\"|TerranBuildNova' '游戏数据/原始mod原始文本镜像/mods/xm/xmnova.sc2mod'");
  lines.push("rg -n '<CUnit id=\"SCVSwann\"|<CUnit id=\"CommandCenterSwann\"|FactoryTrainSwann' '游戏数据/原始mod原始文本镜像/mods/xm/xmswann.sc2mod'");
  lines.push("rg -n '<CUnit id=\"SIQueen\"|OverseerStukov|StukovInfestedDiamondback' '游戏数据/原始mod原始文本镜像/mods/xm/xmstukov.sc2mod'");
  lines.push("```");
  lines.push("");
  lines.push("## 配套文件");
  lines.push("");
  lines.push(`- \`${relative(repoRoot, path.join(options.mirrorRoot, "export-summary.json"))}\``);
  lines.push(`- \`${relative(repoRoot, path.join(options.mirrorRoot, "mirror-file-list.txt"))}\``);
  lines.push(`- \`${relative(repoRoot, path.join(options.mirrorRoot, "source-file-list.txt"))}\``);
  lines.push(`- \`${relative(repoRoot, path.join(options.mirrorRoot, "skipped-binary-files.txt"))}\``);
  lines.push(`- \`${relative(repoRoot, path.join(options.outputDir, "module-summary.json"))}\``);
  lines.push("");
  lines.push("## 注意点");
  lines.push("");
  lines.push("- 这套镜像是当前仓库原始mod文本快照，不代表官方事实源。");
  lines.push("- `xmfinal.sc2mod` 里的 `libe0eae146_commander*.galaxy` 是生成结果，适合快速看当前 runtime 口径；真正的单位/技能字段还要回到各模块 XML。");
  lines.push("- 如果后续要做“当前 mod 与官方合作”对照，直接把这套镜像和 `游戏数据/官方SC2原始文本镜像` 并排喂给其他 AI 即可。");
  lines.push("");
  lines.push(`- 摘要 JSON：\`${relative(repoRoot, path.join(options.outputDir, "module-summary.json"))}\``);
  lines.push(`- 顶层摘要：\`${relative(repoRoot, path.join(options.mirrorRoot, "export-summary.json"))}\``);
  lines.push("");
  lines.push(`共镜像 ${summary.mirrorDataFiles} 个原始文本文件。`);
  return `${lines.join("\n")}\n`;
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  assertDirectory(options.mirrorRoot, "Original mod raw text mirror");
  fs.mkdirSync(options.outputDir, { recursive: true });

  const mirrorDataRoot = path.join(options.mirrorRoot, "mods");
  const files = listFiles(mirrorDataRoot);
  const stats = fileStats(files);
  const modules = buildModuleRows(options.mirrorRoot);
  const importantFiles = buildImportantGamedataIndex(options.mirrorRoot, modules);
  const summary = buildSummaryJson(options, stats, modules, importantFiles);
  const markdown = renderMarkdown(options, stats, modules, importantFiles, summary);

  fs.writeFileSync(path.join(options.outputDir, "AI阅读入口.md"), markdown, "utf8");
  fs.writeFileSync(path.join(options.outputDir, "module-summary.json"), JSON.stringify(summary, null, 2), "utf8");

  console.log(`Mirror root: ${options.mirrorRoot}`);
  console.log(`Output dir: ${options.outputDir}`);
  console.log(`Files: ${stats.totalFiles}`);
  console.log(`Modules: ${modules.length}`);
}

main();
