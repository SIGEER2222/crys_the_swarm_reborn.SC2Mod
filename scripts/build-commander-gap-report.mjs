import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const officialRoot = path.join(repoRoot, '游戏数据', '官方合作指挥官', 'commanders');
const modRoot = path.join(repoRoot, '合作指挥官版起义狂潮', 'Mods', 'XM');
const sharedCoreButtonIds = new Set(['Move', 'Stop', 'Attack', 'Cancel', 'CancelBuilding', 'MoveHoldPosition', 'MovePatrol', 'AcquireMove', 'SelectBuilder']);
const sharedCoreAbilityIds = new Set(['move', 'stop', 'attack', 'BuildInProgress']);
const outDir = path.join(repoRoot, 'docs', '每日进度', '2026-05-31-官方合作指挥官全量缺口清单');
const outJson = path.join(outDir, 'official-vs-mod-gap-report.json');
const outMd = path.join(outDir, 'official-vs-mod-gap-report.md');

fs.mkdirSync(outDir, { recursive: true });

const commanders = fs
  .readdirSync(officialRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort((a, b) => a.localeCompare(b, 'zh-Hans-CN'));

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function walkRelevantFiles(rootDir) {
  const files = [];
  const stack = [rootDir];
  while (stack.length) {
    const current = stack.pop();
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(full);
      } else if (entry.isFile() && /\.(xml|txt|galaxy)$/i.test(full)) {
        files.push(full);
      }
    }
  }
  return files;
}

function buildModIdSet() {
  const ids = new Set();
  const texts = [];
  const files = walkRelevantFiles(modRoot);
  const idRegex = /\bid\s*=\s*"([^"]+)"/gi;

  for (const file of files) {
    const text = fs.readFileSync(file, 'utf8');
    texts.push(text);
    let match;
    while ((match = idRegex.exec(text)) !== null) {
      ids.add(match[1]);
    }
  }

  return { ids, texts, fileCount: files.length };
}

function labelFor(item) {
  return item?.name || item?.button || item?.face || item?.unit_id || item?.id || '';
}

function pushUnique(list, seen, id, label, meta = {}) {
  if (!id || seen.has(id)) {
    return;
  }
  seen.add(id);
  list.push({ id, label: label || id, ...meta });
}

function collectCommandCardEntries(commandCards, categoryLists) {
  for (const cardEntry of commandCards) {
    const cards = cardEntry?.cards || [];
    for (const card of cards) {
      const buttons = card?.buttons || [];
      for (const buttonEntry of buttons) {
        const btn = buttonEntry?.button || {};
        const buttonId = btn.id || buttonEntry.face;
        const buttonLabel = btn.name || buttonEntry.face || buttonId;
        if (sharedCoreButtonIds.has(buttonId)) {
          continue;
        }
        pushUnique(categoryLists.buttons.list, categoryLists.buttons.seen, buttonId, buttonLabel, {
          source: 'command_cards',
          face: buttonEntry.face || '',
          abil_cmd: buttonEntry.abil_cmd || '',
        });

        const abilCmd = buttonEntry.abil_cmd || '';
        const abilId = abilCmd.includes(',') ? abilCmd.split(',')[0] : abilCmd;
        if (abilId && !sharedCoreAbilityIds.has(abilId)) {
          pushUnique(categoryLists.abilities.list, categoryLists.abilities.seen, abilId, buttonLabel || abilId, {
            source: 'command_cards',
            abil_cmd: abilCmd,
          });
        }
      }
    }
  }
}

function collectProgressionEntries(progressions, categoryLists) {
  for (const item of progressions) {
    const id = item.id;
    pushUnique(categoryLists.commander_perks.list, categoryLists.commander_perks.seen, id, labelFor(item), {
      source: 'progression',
    });

    if (item.button) {
      pushUnique(categoryLists.buttons.list, categoryLists.buttons.seen, item.button, labelFor(item), {
        source: 'progression',
      });
    }

    for (const abilCmd of item.ability_commands || []) {
      if (abilCmd?.abil) {
        pushUnique(categoryLists.abilities.list, categoryLists.abilities.seen, abilCmd.abil, labelFor(item), {
          source: 'progression',
        });
      }
    }

    for (const upgradeId of item.upgrades || []) {
      pushUnique(categoryLists.upgrades.list, categoryLists.upgrades.seen, upgradeId, labelFor(item), {
        source: 'progression',
      });
    }
  }
}

function collectFlatEntries(arr, categoryLists, categoryName, extra = {}) {
  for (const item of arr) {
    const id = item?.id;
    pushUnique(categoryLists[categoryName].list, categoryLists[categoryName].seen, id, labelFor(item), extra);
  }
}

function compareCategory(entries, modIds, modTexts) {
  const hasLooseHit = (id) => modTexts.some((text) => text.includes(id));
  const missing = [];
  const looseOnly = [];
  for (const entry of entries) {
    const exact = modIds.has(entry.id);
    const loose = hasLooseHit(entry.id);
    if (!exact) {
      missing.push(entry);
      if (loose) {
        looseOnly.push(entry);
      }
    }
  }
  return {
    official_count: entries.length,
    missing_count: missing.length,
    missing,
    loose_only_count: looseOnly.length,
    loose_only: looseOnly,
  };
}

const { ids: modIds, texts: modTexts, fileCount: modFileCount } = buildModIdSet();
const commanderReports = [];

for (const commander of commanders) {
  const commanderDir = path.join(officialRoot, commander);
  const files = {
    units: readJson(path.join(commanderDir, 'units.json')),
    buildings: readJson(path.join(commanderDir, 'buildings.json')),
    heroes: readJson(path.join(commanderDir, 'heroes.json')),
    upgrades: readJson(path.join(commanderDir, 'upgrades.json')),
    prestiges: readJson(path.join(commanderDir, 'prestiges.json')),
    progression: readJson(path.join(commanderDir, 'progression.json')),
    command_cards: readJson(path.join(commanderDir, 'command_cards.json')),
  };

  let otherTechEntries = [];
  const otherTechPath = path.join(commanderDir, 'other-tech-entries.json');
  if (fs.existsSync(otherTechPath)) {
    otherTechEntries = readJson(otherTechPath);
  }

  const categoryLists = {
    units: { list: [], seen: new Set() },
    buildings: { list: [], seen: new Set() },
    heroes: { list: [], seen: new Set() },
    upgrades: { list: [], seen: new Set() },
    prestiges: { list: [], seen: new Set() },
    commander_perks: { list: [], seen: new Set() },
    abilities: { list: [], seen: new Set() },
    buttons: { list: [], seen: new Set() },
    other_tech_entries: { list: [], seen: new Set() },
  };

  collectFlatEntries(files.units, categoryLists, 'units');
  collectFlatEntries(files.buildings, categoryLists, 'buildings');
  collectFlatEntries(files.heroes, categoryLists, 'heroes');
  collectFlatEntries(files.upgrades, categoryLists, 'upgrades');
  collectFlatEntries(files.prestiges, categoryLists, 'prestiges');
  collectFlatEntries(otherTechEntries, categoryLists, 'other_tech_entries');
  const progressionEntries = Array.isArray(files.progression) ? files.progression : (files.progression.perks || []);
  const commandCardEntries = Array.isArray(files.command_cards) ? files.command_cards : (files.command_cards.cards || files.command_cards);

  collectProgressionEntries(progressionEntries, categoryLists);
  collectCommandCardEntries(commandCardEntries, categoryLists);

  const categories = {};
  let totalMissing = 0;

  for (const [categoryName, entries] of Object.entries(categoryLists)) {
    const report = compareCategory(entries.list, modIds, modTexts);
    categories[categoryName] = report;
    totalMissing += report.missing_count;
  }

  commanderReports.push({
    commander,
    module: `XM${commander}.SC2Mod`,
    total_missing: totalMissing,
    categories,
  });
}

const summary = commanderReports.map((report) => ({
  指挥官: report.commander,
  模块: report.module,
  缺失总数: report.total_missing,
  主要缺口: Object.entries(report.categories)
    .filter(([, value]) => value.missing_count > 0)
    .map(([key]) => key)
    .join('、') || '无',
}));

const report = {
  generated_at: new Date().toISOString(),
  official_root: officialRoot,
  mod_root: modRoot,
  mod_file_count: modFileCount,
  commanders: commanderReports,
  summary,
};

fs.writeFileSync(outJson, JSON.stringify(report, null, 2), 'utf8');

const categoryTitleMap = {
  units: '兵种',
  buildings: '建筑',
  heroes: '英雄',
  upgrades: '升级',
  prestiges: '威望',
  commander_perks: '指挥官进度',
  abilities: '技能',
  buttons: '按钮',
  other_tech_entries: '其他科技项',
};

function formatList(items) {
  if (!items.length) return '无';
  return items.map((item) => `- ${item.label} \`${item.id}\``).join('\n');
}

function mdTable(rows) {
  const header = '| 指挥官 | 模块 | 缺失总数 | 主要缺口 |';
  const sep = '| --- | --- | ---: | --- |';
  const body = rows.map((row) => `| ${row.指挥官} | \`${row.模块}\` | ${row.缺失总数} | ${row.主要缺口} |`).join('\n');
  return [header, sep, body].join('\n');
}

let md = '';
md += '# 官方合作指挥官全量缺口清单\n\n';
md += `- 生成时间：${new Date().toLocaleString('zh-CN')}\n`;
md += `- 官方数据：\`${officialRoot}\`\n`;
md += `- Mod 数据：\`${modRoot}\`\n`;
md += `- 扫描范围：当前 XM 树下全部 XML / TXT / GALAXY 文件，共 ${modFileCount} 个\n`;
md += '- 判定方式：缺口按官方 JSON 条目 ID 与当前 Mod 中的 `id` 属性做精确比对；同名引用、localized key 和脚本文本命中只作为辅助线索，不视为已实现。\n';
md += '- 说明：这是精确定义扫描底稿，适合作为缺口排查和人工复核底稿，不应直接当作最终玩法收口判定。\n\n';

md += '## 总览\n\n';
md += mdTable(summary) + '\n\n';

for (const commander of commanderReports) {
  md += `## ${commander.commander}\n\n`;
  md += `- 模块：\`${commander.module}\`\n`;
  md += `- 缺失总数：${commander.total_missing}\n`;

  const missingCategories = Object.entries(commander.categories).filter(([, value]) => value.missing_count > 0);
  if (missingCategories.length === 0) {
    md += '- 结论：当前未发现明显缺口。\n\n';
    continue;
  }

  md += '- 缺口分类：' + missingCategories.map(([key]) => categoryTitleMap[key] || key).join('、') + '\n\n';

  for (const [categoryName, value] of missingCategories) {
    md += `### ${categoryTitleMap[categoryName] || categoryName}\n\n`;
    md += `- 官方数量：${value.official_count}\n`;
    md += `- 缺失数量：${value.missing_count}\n`;
    if (value.loose_only_count) {
      md += `- 仅有文本/引用命中的条目：${value.loose_only_count}\n`;
    }
    md += formatList(value.missing) + '\n\n';
  }
}

fs.writeFileSync(outMd, md, 'utf8');

console.log(`已生成：${outMd}`);
console.log(`已生成：${outJson}`);
