import fs from "node:fs";
import path from "node:path";

const DEFAULT_MIRROR = path.join("游戏数据", "官方SC2原始文本镜像");
const DEFAULT_OUTPUT = path.join(
  "docs",
  "每日进度",
  "2026-05-29-官方合作模式因子提取"
);

function argValue(name, fallback) {
  const index = process.argv.indexOf(name);
  if (index >= 0 && process.argv[index + 1]) {
    return process.argv[index + 1];
  }
  return fallback;
}

function readText(filePath) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
}

function walkFiles(root, predicate, result = []) {
  if (!fs.existsSync(root)) {
    return result;
  }

  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const fullPath = path.join(root, entry.name);
    if (entry.isDirectory()) {
      walkFiles(fullPath, predicate, result);
    } else if (predicate(fullPath)) {
      result.push(fullPath);
    }
  }

  return result;
}

function normalizeRel(root, fullPath) {
  return path.relative(root, fullPath).replaceAll(path.sep, "/");
}

function parseKeyValueText(filePath) {
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

function mergeMap(target, source) {
  for (const [key, value] of source) {
    if (!target.has(key) || !target.get(key)) {
      target.set(key, value);
    }
  }
}

function getLocalized(locales, key) {
  const zhRaw = locales.zhcn.get(key) ?? "";
  const enRaw = locales.enus.get(key) ?? "";
  const [zhPart, zhEmbeddedEn] = splitBilingual(zhRaw);
  const [enPart] = splitBilingual(enRaw);

  return {
    zh: zhPart || zhRaw || "",
    en: enPart || zhEmbeddedEn || enRaw || "",
    rawZh: zhRaw,
    rawEn: enRaw,
  };
}

function splitBilingual(value) {
  const parts = value.split(" /// ");
  return [parts[0]?.trim() ?? "", parts.slice(1).join(" /// ").trim()];
}

function getCUserBlock(xml, id) {
  const start = xml.indexOf(`<CUser id="${id}">`);
  if (start < 0) {
    return "";
  }

  const end = xml.indexOf("</CUser>", start);
  return end < 0 ? "" : xml.slice(start, end + "</CUser>".length);
}

function parseInstances(block) {
  const instances = [];
  const instancePattern = /<Instances Id="([^"]+)"([\s\S]*?)<\/Instances>|<Instances Id="([^"]+)"\/>/g;
  let match;
  while ((match = instancePattern.exec(block)) !== null) {
    instances.push({
      id: decodeXml(match[1] ?? match[3]),
      body: match[2] ?? "",
    });
  }

  return instances;
}

function decodeXml(value) {
  return value
    .replaceAll("&apos;", "'")
    .replaceAll("&quot;", '"')
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function parseMutatorDefinitions(starcoopRoot, locales) {
  const xmlPath = path.join(starcoopRoot, "base.sc2data", "gamedata", "userdata.xml");
  const block = getCUserBlock(readText(xmlPath), "Mutators");
  const definitions = new Map();

  for (const instance of parseInstances(block)) {
    if (instance.id === "[Default]") {
      continue;
    }

    const nameKey = firstCapture(instance.body, /<Text Text="([^"]+_Name)">/);
    const descriptionKey = firstCapture(instance.body, /<Text Text="([^"]+_Description)">/);
    const icon = firstCapture(instance.body, /<Image Image="([^"]+)"/);
    const ints = {};
    for (const intMatch of instance.body.matchAll(/<Int Int="([^"]+)">[\s\S]*?<Field Id="([^"]+)"/g)) {
      ints[intMatch[2]] = Number(intMatch[1]);
    }

    const name = getLocalized(locales, nameKey || `UserData/Mutators/${instance.id}_Name`);
    const description = getLocalized(
      locales,
      descriptionKey || `UserData/Mutators/${instance.id}_Description`
    );

    definitions.set(instance.id, {
      id: instance.id,
      nameZh: name.zh,
      nameEn: name.en,
      descriptionZh: description.zh,
      descriptionEn: description.en,
      icon,
      randomAllowed: ints.RandomAllowed === 1,
      randomFirstAllowed: ints.RandomFirstAllowed === 1,
      customAllowed: ints.CustomAllowed === 1,
      customAllowMultiple: ints.CustomAllowMultiple === 1,
      source: normalizeRel(process.cwd(), xmlPath),
    });
  }

  return definitions;
}

function firstCapture(text, pattern) {
  const match = text.match(pattern);
  return match ? decodeXml(match[1]) : "";
}

function parseChallenges(starcoopRoot, locales) {
  const xmlPath = path.join(starcoopRoot, "base.sc2data", "gamedata", "userdata.xml");
  const block = getCUserBlock(readText(xmlPath), "MutatorChallenges");
  const challenges = [];
  let challengeIndex = 1;

  for (const instance of parseInstances(block)) {
    if (instance.id === "[Default]") {
      continue;
    }

    const nameKey = firstCapture(instance.body, /<Text Text="([^"]+_Name)">/);
    const name = getLocalized(locales, nameKey || `UserData/MutatorChallenges/${instance.id}_Name`);
    const mutators = [...instance.body.matchAll(/<User Type="Mutators" Instance="([^"]+)"/g)]
      .map((match) => decodeXml(match[1]))
      .filter((id) => id !== "[Default]");

    challenges.push({
      challengeIndex,
      id: instance.id,
      nameZh: name.zh,
      nameEn: name.en,
      map: firstCapture(instance.body, /<GameLink GameLink="([^"]+)"/),
      mutators,
      source: normalizeRel(process.cwd(), xmlPath),
    });
    challengeIndex += 1;
  }

  return challenges;
}

function parseMutatorPackages(mirrorRoot, locales) {
  const mutatorRoot = path.join(mirrorRoot, "mods", "mutators");
  const packages = [];

  for (const dirent of fs.readdirSync(mutatorRoot, { withFileTypes: true })) {
    if (!dirent.isDirectory() || !dirent.name.toLowerCase().endsWith(".sc2mod")) {
      continue;
    }

    const packageRoot = path.join(mutatorRoot, dirent.name);
    const galaxyFiles = walkFiles(packageRoot, (file) => file.toLowerCase().endsWith(".galaxy"));
    const enabledMutators = new Set();
    const weeklyChallengeIndexes = new Set();
    const evidence = [];

    for (const galaxyFile of galaxyFiles) {
      const text = readText(galaxyFile);
      for (const match of text.matchAll(/EnableDisableMutator\s*\(\s*true\s*,\s*"([^"]+)"/g)) {
        enabledMutators.add(match[1]);
        evidence.push({
          type: "EnableDisableMutator",
          value: match[1],
          file: normalizeRel(process.cwd(), galaxyFile),
        });
      }

      for (const match of text.matchAll(/SetMutatorWeeklyChallengeOn\s*\(\s*(\d+)\s*\)/g)) {
        weeklyChallengeIndexes.add(Number(match[1]));
        evidence.push({
          type: "SetMutatorWeeklyChallengeOn",
          value: Number(match[1]),
          file: normalizeRel(process.cwd(), galaxyFile),
        });
      }
    }

    const packageLocales = readPackageLocales(packageRoot);
    const docName = localizePackageDoc(packageLocales, "DocInfo/Name");
    const docDesc = localizePackageDoc(packageLocales, "DocInfo/DescLong");

    packages.push({
      package: dirent.name,
      kind: weeklyChallengeIndexes.size > 0 ? "weeklyChallengePackage" : "singleMutatorPackage",
      docNameZh: docName.zh,
      docNameEn: docName.en,
      docDescriptionZh: docDesc.zh,
      docDescriptionEn: docDesc.en,
      enabledMutators: [...enabledMutators].sort(),
      weeklyChallengeIndexes: [...weeklyChallengeIndexes].sort((a, b) => a - b),
      evidence,
      sourceRoot: normalizeRel(process.cwd(), packageRoot),
    });
  }

  return packages.sort((a, b) => a.package.localeCompare(b.package));
}

function linkPackagesToChallenges(packages, challenges) {
  const byIndex = new Map(challenges.map((challenge) => [challenge.challengeIndex, challenge]));
  const byName = new Map();
  for (const challenge of challenges) {
    for (const name of [challenge.nameZh, challenge.nameEn]) {
      const key = normalizeName(name);
      if (key) {
        byName.set(key, challenge);
      }
    }
  }

  for (const pack of packages) {
    const refs = [];
    for (const index of pack.weeklyChallengeIndexes) {
      const byDirectIndex = byIndex.get(index);
      if (byDirectIndex) {
        refs.push(toChallengeRef(byDirectIndex, "userdata-order", index));
        continue;
      }

      const byZhName = byName.get(normalizeName(pack.docNameZh));
      const byEnName = byName.get(normalizeName(pack.docNameEn));
      const byPackageName = byZhName ?? byEnName;
      if (byPackageName) {
        refs.push(toChallengeRef(byPackageName, "doc-name", index));
      } else {
        refs.push({
          packageValue: index,
          matchMethod: "unmatched",
        });
      }
    }

    pack.challengeRefs = refs;
  }
}

function normalizeName(value) {
  return String(value ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fff]+/g, "")
    .trim();
}

function toChallengeRef(challenge, matchMethod, packageValue) {
  return {
    packageValue,
    matchMethod,
    challengeIndex: challenge.challengeIndex,
    id: challenge.id,
    nameZh: challenge.nameZh,
    nameEn: challenge.nameEn,
    map: challenge.map,
    mutators: challenge.mutators,
  };
}

function readPackageLocales(packageRoot) {
  return {
    zhcn: parseKeyValueText(
      path.join(packageRoot, "zhcn.sc2data", "localizeddata", "gamestrings.txt")
    ),
    enus: parseKeyValueText(
      path.join(packageRoot, "enus.sc2data", "localizeddata", "gamestrings.txt")
    ),
  };
}

function localizePackageDoc(locales, key) {
  const zhRaw = locales.zhcn.get(key) ?? "";
  const enRaw = locales.enus.get(key) ?? "";
  const [zh, embeddedEn] = splitBilingual(zhRaw);
  const [en] = splitBilingual(enRaw);
  return {
    zh: zh || zhRaw || "",
    en: en || embeddedEn || enRaw || "",
  };
}

function readLocales(mirrorRoot) {
  const candidates = [
    path.join(mirrorRoot, "mods", "starcoop", "starcoop.sc2mod"),
    path.join(mirrorRoot, "mods", "mutators"),
  ];
  const locales = { zhcn: new Map(), enus: new Map() };

  for (const root of candidates) {
    for (const locale of ["zhcn", "enus"]) {
      const files = walkFiles(root, (file) => {
        const normalized = file.toLowerCase().replaceAll(path.sep, "/");
        return normalized.endsWith(`/${locale}.sc2data/localizeddata/gamestrings.txt`);
      });

      for (const file of files) {
        mergeMap(locales[locale], parseKeyValueText(file));
      }
    }
  }

  return locales;
}

function enrichDefinitions(definitions, packages, challenges) {
  const byId = new Map(definitions);
  for (const item of byId.values()) {
    item.packages = [];
    item.weeklyChallenges = [];
  }

  for (const pack of packages) {
    for (const id of pack.enabledMutators) {
      if (!byId.has(id)) {
        byId.set(id, {
          id,
          nameZh: "",
          nameEn: "",
          descriptionZh: "",
          descriptionEn: "",
          icon: "",
          randomAllowed: false,
          randomFirstAllowed: false,
          customAllowed: false,
          customAllowMultiple: false,
          source: "",
          packages: [],
          weeklyChallenges: [],
        });
      }
      byId.get(id).packages.push(pack.package);
    }
  }

  for (const challenge of challenges) {
    for (const id of challenge.mutators) {
      if (byId.has(id)) {
        byId.get(id).weeklyChallenges.push({
          challengeIndex: challenge.challengeIndex,
          id: challenge.id,
          nameZh: challenge.nameZh,
          map: challenge.map,
        });
      }
    }
  }

  return [...byId.values()].sort((a, b) => a.id.localeCompare(b.id));
}

function renderMarkdown(summary, factors, packages, challenges, outputDir) {
  const lines = [];
  lines.push("# 官方合作模式因子提取");
  lines.push("");
  lines.push("## 结论");
  lines.push("");
  lines.push(`- 官方 \`Mutators\` 因子定义：\`${summary.factorCount}\``);
  lines.push(`- 单因子启用包：\`${summary.singlePackageCount}\``);
  lines.push(`- 每周突变组合包：\`${summary.weeklyPackageCount}\``);
  lines.push(`- 官方 \`MutatorChallenges\` 组合定义：\`${summary.challengeCount}\``);
  lines.push(`- 已按名称回连到官方组合的组合包：\`${summary.linkedWeeklyPackageCount}\``);
  lines.push(`- 暂未回连的组合包：\`${summary.unlinkedWeeklyPackageCount}\``);
  lines.push(`- JSON 明细：\`${path.join(outputDir, "official-coop-mutator-factors.json")}\``);
  lines.push("");
  lines.push("## 数据来源");
  lines.push("");
  lines.push(`- 原始文本镜像：\`${summary.mirrorRoot}\``);
  lines.push("- 因子定义：`mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/userdata.xml` 的 `CUser id=\"Mutators\"`");
  lines.push("- 每周突变组合：同文件的 `CUser id=\"MutatorChallenges\"`");
  lines.push("- 因子包启用证据：`mods/mutators/*/*.galaxy` 中的 `EnableDisableMutator` / `SetMutatorWeeklyChallengeOn`");
  lines.push("");
  lines.push("## 因子主表");
  lines.push("");
  lines.push("| 因子ID | 中文名 | 英文名 | 自定义可选 | 随机池 | 单因子包 | 中文说明 |");
  lines.push("| --- | --- | --- | --- | --- | --- | --- |");
  for (const factor of factors) {
    lines.push(
      `| \`${factor.id}\` | ${md(factor.nameZh)} | ${md(factor.nameEn)} | ${yesNo(factor.customAllowed)} | ${yesNo(factor.randomAllowed)} | ${md(factor.packages.join(", ") || "-")} | ${md(shorten(factor.descriptionZh || factor.descriptionEn, 120))} |`
    );
  }
  lines.push("");
  lines.push("## 单因子包启用关系");
  lines.push("");
  lines.push("| 包 | 因子ID | 包中文名 | 包说明 |");
  lines.push("| --- | --- | --- | --- |");
  for (const pack of packages.filter((item) => item.kind === "singleMutatorPackage")) {
    lines.push(
      `| \`${pack.package}\` | ${pack.enabledMutators.map((id) => `\`${id}\``).join(", ") || "-"} | ${md(pack.docNameZh || pack.docNameEn)} | ${md(shorten(pack.docDescriptionZh || pack.docDescriptionEn, 120))} |`
    );
  }
  lines.push("");
  lines.push("## 每周突变组合");
  lines.push("");
  lines.push("| 顺序 | 组合ID | 中文名 | 地图ID | 因子 | 组合包 | 包内数值 |");
  lines.push("| --- | --- | --- | --- | --- | --- | --- |");
  const packagesByChallengeId = new Map();
  for (const pack of packages.filter((item) => item.kind === "weeklyChallengePackage")) {
    for (const ref of pack.challengeRefs ?? []) {
      if (!ref.id) {
        continue;
      }
      if (!packagesByChallengeId.has(ref.id)) {
        packagesByChallengeId.set(ref.id, []);
      }
      packagesByChallengeId.get(ref.id).push({
        package: pack.package,
        packageValue: ref.packageValue,
        matchMethod: ref.matchMethod,
      });
    }
  }
  for (const challenge of challenges) {
    const packRefs = packagesByChallengeId.get(challenge.id) ?? [];
    lines.push(
      `| ${challenge.challengeIndex} | \`${challenge.id}\` | ${md(challenge.nameZh || challenge.nameEn)} | \`${challenge.map}\` | ${challenge.mutators.map((id) => `\`${id}\``).join(", ")} | ${packRefs.map((ref) => `\`${ref.package}\``).join(", ") || "-"} | ${packRefs.map((ref) => `\`${ref.packageValue}\``).join(", ") || "-"} |`
    );
  }
  const unlinkedWeeklyPackages = packages.filter(
    (item) => item.kind === "weeklyChallengePackage" && !(item.challengeRefs ?? []).some((ref) => ref.id)
  );
  if (unlinkedWeeklyPackages.length > 0) {
    lines.push("");
    lines.push("## 暂未回连的组合包");
    lines.push("");
    lines.push("| 包 | 包中文名 | 包英文名 | 包内数值 | 备注 |");
    lines.push("| --- | --- | --- | --- | --- |");
    for (const pack of unlinkedWeeklyPackages) {
      lines.push(
        `| \`${pack.package}\` | ${md(pack.docNameZh)} | ${md(pack.docNameEn)} | ${pack.weeklyChallengeIndexes.map((value) => `\`${value}\``).join(", ")} | 未在 \`MutatorChallenges\` 中找到同名组合；需后续人工或更深触发闭包确认。 |`
      );
    }
  }
  const passivePackages = packages.filter(
    (item) => item.kind === "singleMutatorPackage" && item.enabledMutators.length === 0
  );
  if (passivePackages.length > 0) {
    lines.push("");
    lines.push("## 非启用型包");
    lines.push("");
    lines.push("| 包 | 中文名 | 英文名 | 备注 |");
    lines.push("| --- | --- | --- | --- |");
    for (const pack of passivePackages) {
      lines.push(
        `| \`${pack.package}\` | ${md(pack.docNameZh)} | ${md(pack.docNameEn)} | 未找到 \`EnableDisableMutator(true, ...)\` 或 \`SetMutatorWeeklyChallengeOn(...)\`；当前看作自定义入口/容器包。 |`
      );
    }
  }
  lines.push("");
  lines.push("## 脚本说明");
  lines.push("");
  lines.push("- 直接读取已导出的官方文本镜像，不需要本机安装 SC2。");
  lines.push("- 默认输出 JSON 与 Markdown，可用 `--mirror-root` / `--output-dir` 指定输入输出。");
  lines.push("- `MutatorChallenges` 的 `顺序` 是 UserData 中非 `[Default]` 实例的出现顺序，从 1 递增。");
  lines.push("- 组合包里的 `SetMutatorWeeklyChallengeOn(n)` 保留为 `包内数值`；该数值并不总是等于 UserData 顺序，脚本优先用组合包 `DocInfo/Name` 和官方组合名做回连。");
  lines.push("");
  lines.push("```powershell");
  lines.push("node .\\scripts\\sc2\\export-official-coop-mutator-factors.mjs");
  lines.push("```");
  lines.push("");
  return lines.join("\n");
}

function md(value) {
  return String(value ?? "")
    .replaceAll("|", "\\|")
    .replace(/\s+/g, " ")
    .trim();
}

function shorten(value, maxLength) {
  const text = md(value);
  return text.length > maxLength ? `${text.slice(0, maxLength - 1)}...` : text;
}

function yesNo(value) {
  return value ? "是" : "否";
}

function main() {
  const repoRoot = path.resolve(argValue("--repo-root", process.cwd()));
  const mirrorRoot = path.resolve(repoRoot, argValue("--mirror-root", DEFAULT_MIRROR));
  const outputDir = path.resolve(repoRoot, argValue("--output-dir", DEFAULT_OUTPUT));
  const starcoopRoot = path.join(mirrorRoot, "mods", "starcoop", "starcoop.sc2mod");

  if (!fs.existsSync(starcoopRoot)) {
    throw new Error(`Official StarCoop mirror not found: ${starcoopRoot}`);
  }

  const locales = readLocales(mirrorRoot);
  const definitions = parseMutatorDefinitions(starcoopRoot, locales);
  const packages = parseMutatorPackages(mirrorRoot, locales);
  const challenges = parseChallenges(starcoopRoot, locales);
  linkPackagesToChallenges(packages, challenges);
  const factors = enrichDefinitions(definitions, packages, challenges);
  const linkedWeeklyPackageCount = packages.filter((item) =>
    item.kind === "weeklyChallengePackage" && (item.challengeRefs ?? []).some((ref) => ref.id)
  ).length;
  const unlinkedWeeklyPackageCount =
    packages.filter((item) => item.kind === "weeklyChallengePackage").length - linkedWeeklyPackageCount;

  const summary = {
    mirrorRoot,
    outputDir,
    factorCount: factors.length,
    singlePackageCount: packages.filter((item) => item.kind === "singleMutatorPackage").length,
    weeklyPackageCount: packages.filter((item) => item.kind === "weeklyChallengePackage").length,
    linkedWeeklyPackageCount,
    unlinkedWeeklyPackageCount,
    challengeCount: challenges.length,
    generatedAt: new Date().toISOString(),
  };

  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(
    path.join(outputDir, "official-coop-mutator-factors.json"),
    JSON.stringify({ summary, factors, packages, challenges }, null, 2),
    "utf8"
  );
  fs.writeFileSync(
    path.join(outputDir, "official-coop-mutator-factors.md"),
    renderMarkdown(summary, factors, packages, challenges, outputDir),
    "utf8"
  );

  console.log(JSON.stringify(summary, null, 2));
}

main();
