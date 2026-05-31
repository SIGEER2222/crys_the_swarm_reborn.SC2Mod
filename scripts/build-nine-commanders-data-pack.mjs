import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const gapReportPath = path.join(repoRoot, 'docs', '每日进度', '2026-05-31-官方合作指挥官全量缺口清单', 'official-vs-mod-gap-report.json');
const officialRoot = path.join(repoRoot, '游戏数据', '官方合作指挥官', 'commanders');
const outDir = path.join(repoRoot, 'docs', '每日进度', '2026-05-31-九位指挥官游戏数据补全底稿');
const outMd = path.join(outDir, '九位指挥官游戏数据补全底稿.md');
const outJson = path.join(outDir, '九位指挥官游戏数据补全底稿.json');

fs.mkdirSync(outDir, { recursive: true });

const wanted = new Set(['Alarak', 'Artanis', 'Fenix', 'Karax', 'Raynor', 'Swann', 'Vorazun', 'Zagara', 'Zeratul']);
const gapReport = JSON.parse(fs.readFileSync(gapReportPath, 'utf8'));

const commanderMap = new Map(gapReport.commanders.map((entry) => [entry.commander, entry]));

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function count(value) {
  if (Array.isArray(value)) return value.length;
  if (value && typeof value === 'object') return Object.keys(value).length;
  return 0;
}

const commanders = [...wanted].sort((a, b) => a.localeCompare(b, 'zh-Hans-CN')).map((name) => {
  const dir = path.join(officialRoot, name);
  const commander = readJson(path.join(dir, 'commander.json'));
  const units = readJson(path.join(dir, 'units.json'));
  const buildings = readJson(path.join(dir, 'buildings.json'));
  const heroes = readJson(path.join(dir, 'heroes.json'));
  const progression = readJson(path.join(dir, 'progression.json'));
  const prestiges = readJson(path.join(dir, 'prestiges.json'));
  const upgrades = readJson(path.join(dir, 'upgrades.json'));
  const cards = readJson(path.join(dir, 'command_cards.json'));
  const gap = commanderMap.get(name);

  return {
    commander: name,
    name_cn: commander.name,
    module: `XM${name}.SC2Mod`,
    official_counts: {
      units: units.length,
      buildings: buildings.length,
      heroes: heroes.length,
      progression: Array.isArray(progression) ? progression.length : count(progression.perks),
      prestiges: prestiges.length,
      upgrades: upgrades.length,
      command_cards: cards.length,
    },
    raw_gap: gap ? {
      total_missing: gap.total_missing,
      categories: Object.fromEntries(
        Object.entries(gap.categories).filter(([, v]) => v.missing_count > 0).map(([k, v]) => [k, v.missing])
      ),
    } : null,
    data: {
      commander,
      units,
      buildings,
      heroes,
      progression: Array.isArray(progression) ? progression : (progression.perks || []),
      prestiges,
      upgrades,
      command_cards: cards,
    },
  };
});

const report = {
  generated_at: new Date().toISOString(),
  source_gap_report: path.relative(repoRoot, gapReportPath),
  commanders,
};

fs.writeFileSync(outJson, JSON.stringify(report, null, 2), 'utf8');

const categoryTitleMap = {
  units: '兵种',
  buildings: '建筑',
  heroes: '英雄',
  progression: '等级加点 / 精通',
  prestiges: '威望',
  upgrades: '升级',
  command_cards: '命令面板',
  commander_perks: '指挥官进度',
  abilities: '技能',
  buttons: '按钮',
  other_tech_entries: '其他科技项',
};

let md = '';
md += '# 九位指挥官游戏数据补全底稿\n\n';
md += '- 说明：这份文档把 9 位指挥官的官方数据概况和当前原始扫描得到的待核对项放在一起，方便继续补全。\n';
md += '- 口径：当前缺口信息来自原始 ID 扫描底稿，并把同名引用 / localized key / 脚本文本命中一并视为已存在，属于补全底稿，不是最终定稿。\n\n';

md += '## 总览\n\n';
md += '| 指挥官 | 模块 | 官方兵种 | 官方建筑 | 英雄 | 等级加点 | 威望 | 升级 | 命令面板 | 原始缺口总数 |\n';
md += '| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |\n';
for (const item of commanders) {
  md += `| ${item.name_cn} / \`${item.commander}\` | \`${item.module}\` | ${item.official_counts.units} | ${item.official_counts.buildings} | ${item.official_counts.heroes} | ${item.official_counts.progression} | ${item.official_counts.prestiges} | ${item.official_counts.upgrades} | ${item.official_counts.command_cards} | ${item.raw_gap?.total_missing ?? 0} |\n`;
}

md += '\n## 逐位清单\n\n';
for (const item of commanders) {
  md += `### ${item.name_cn} / \`${item.commander}\`\n\n`;
  md += `- 模块：\`${item.module}\`\n`;
  md += `- 官方数据目录：\`游戏数据/官方合作指挥官/commanders/${item.commander}/\`\n`;
  md += `- 官方条目数：兵种 ${item.official_counts.units}、建筑 ${item.official_counts.buildings}、英雄 ${item.official_counts.heroes}、等级加点 ${item.official_counts.progression}、威望 ${item.official_counts.prestiges}、升级 ${item.official_counts.upgrades}、命令面板 ${item.official_counts.command_cards}\n`;

  if (!item.raw_gap || Object.keys(item.raw_gap.categories).length === 0) {
    md += '- 当前原始扫描没有列出明显缺口。\n\n';
    continue;
  }

  md += `- 原始缺口总数：${item.raw_gap.total_missing}\n`;
  md += '- 待核对分类：' + Object.keys(item.raw_gap.categories).map((k) => categoryTitleMap[k] || k).join('、') + '\n\n';
  for (const [categoryName, missing] of Object.entries(item.raw_gap.categories)) {
    md += `#### ${categoryTitleMap[categoryName] || categoryName}\n\n`;
    if (!missing.length) {
      md += '- 无\n\n';
      continue;
    }
    for (const entry of missing) {
      md += `- ${entry.label} \`${entry.id}\`\n`;
    }
    md += '\n';
  }
}

fs.writeFileSync(outMd, md, 'utf8');

function pickText(value) {
  return value ?? '';
}

function stringifyList(value) {
  if (Array.isArray(value)) {
    return value.join('、');
  }
  return pickText(value);
}

function renderEntryLine(prefix, entry) {
  const name = entry.name || entry.id || '';
  return `${prefix}- ${name} \`${entry.id || ''}\``;
}

function renderCommanderDoc(item) {
  const lines = [];
  lines.push(`# ${item.name_cn} / \`${item.commander}\` 游戏数据补全页`);
  lines.push('');
  lines.push(`- 模块：\`${item.module}\``);
  lines.push(`- 官方数据目录：\`游戏数据/官方合作指挥官/commanders/${item.commander}/\``);
  lines.push(`- 官方条目数：兵种 ${item.official_counts.units}、建筑 ${item.official_counts.buildings}、英雄 ${item.official_counts.heroes}、等级加点 ${item.official_counts.progression}、威望 ${item.official_counts.prestiges}、升级 ${item.official_counts.upgrades}、命令面板 ${item.official_counts.command_cards}`);
  lines.push('');

  const { commander, units, buildings, heroes, progression, prestiges, upgrades, command_cards } = item.data;

  lines.push('## 指挥官基础');
  lines.push('');
  lines.push(`- 名称：${pickText(commander.name)}`);
  lines.push(`- 描述：${pickText(commander.description)}`);
  lines.push(`- 默认升级：${stringifyList(commander.default_upgrades)}`);
  lines.push(`- 默认能力命令：${(commander.default_ability_commands || []).map((entry) => `${entry.abil}${entry.cmd ? `:${entry.cmd}` : ''}`).join('、') || '无'}`);
  lines.push(`- 威望 ID：${stringifyList(commander.prestige_ids) || '无'}`);
  lines.push('');

  const renderSimpleSection = (title, list, formatter) => {
    lines.push(`## ${title}`);
    lines.push('');
    if (!list.length) {
      lines.push('- 无');
      lines.push('');
      return;
    }
    for (const entry of list) {
      lines.push(formatter(entry));
    }
    lines.push('');
  };

  renderSimpleSection('兵种', units, (entry) => renderEntryLine('', entry));
  renderSimpleSection('建筑', buildings, (entry) => renderEntryLine('', entry));
  renderSimpleSection('英雄', heroes, (entry) => renderEntryLine('', entry));

  lines.push('## 等级加点');
  lines.push('');
  if (!progression.length) {
    lines.push('- 无');
    lines.push('');
  } else {
    for (const entry of progression) {
      lines.push(`- ${entry.level ?? ''}级：${entry.name || entry.id || ''} \`${entry.id || ''}\``);
      if (entry.tooltip) {
        lines.push(`  - ${pickText(entry.tooltip).replace(/\n/g, ' ')}`);
      }
    }
    lines.push('');
  }

  lines.push('## 威望');
  lines.push('');
  if (!prestiges.length) {
    lines.push('- 无');
    lines.push('');
  } else {
    for (const entry of prestiges) {
      lines.push(`- ${entry.name || entry.id || ''} \`${entry.id || ''}\``);
      if (entry.tooltip) {
        lines.push(`  - ${pickText(entry.tooltip).replace(/\n/g, ' ')}`);
      }
    }
    lines.push('');
  }

  lines.push('## 升级');
  lines.push('');
  if (!upgrades.length) {
    lines.push('- 无');
    lines.push('');
  } else {
    for (const entry of upgrades) {
      lines.push(`- ${entry.name || entry.id || ''} \`${entry.id || ''}\``);
      if (entry.tooltip) {
        lines.push(`  - ${pickText(entry.tooltip).replace(/\n/g, ' ')}`);
      }
    }
    lines.push('');
  }

  lines.push('## 命令面板');
  lines.push('');
  if (!command_cards.length) {
    lines.push('- 无');
    lines.push('');
  } else {
    for (const src of command_cards) {
      lines.push(`### ${src.name || src.unit_id || src.id || ''} \`${src.id || src.unit_id || ''}\``);
      lines.push('');
      const cards = src.cards || [];
      for (const card of cards) {
        const cardName = card.card_id || (card.is_default_card ? '默认面板' : '面板');
        lines.push(`- ${cardName}`);
        for (const btn of card.buttons || []) {
          const button = btn.button || {};
          const buttonName = button.name || btn.face || btn.abil_cmd || '';
          lines.push(`  - ${buttonName} \`${button.id || btn.face || ''}\` / ${btn.abil_cmd || '无'}`);
        }
      }
      lines.push('');
    }
  }

  lines.push('## 当前待核对项');
  lines.push('');
  const gap = item.raw_gap;
  if (!gap || Object.keys(gap.categories).length === 0) {
    lines.push('- 原始扫描版未列出明显缺口。');
    lines.push('');
  } else {
    for (const [categoryName, missing] of Object.entries(gap.categories)) {
      lines.push(`### ${categoryTitleMap[categoryName] || categoryName}`);
      lines.push('');
      for (const miss of missing) {
        lines.push(`- ${miss.label} \`${miss.id}\``);
      }
      lines.push('');
    }
  }

  return lines.join('\n');
}

for (const item of commanders) {
  const commanderDocPath = path.join(outDir, `${item.commander}-游戏数据.md`);
  fs.writeFileSync(commanderDocPath, renderCommanderDoc(item), 'utf8');
}

console.log(`已生成：${outMd}`);
console.log(`已生成：${outJson}`);
console.log(`已生成：${commanders.length} 份逐位游戏数据页`);
