import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const packPath = path.join(repoRoot, 'docs', '每日进度', '2026-05-31-九位指挥官游戏数据补全底稿', '九位指挥官游戏数据补全底稿.json');
const outDir = path.join(repoRoot, 'docs', '每日进度', '2026-05-31-九位指挥官缺口归并清单');
const outMd = path.join(outDir, '九位指挥官缺口归并清单.md');
const outJson = path.join(outDir, '九位指挥官缺口归并清单.json');

fs.mkdirSync(outDir, { recursive: true });

const report = JSON.parse(fs.readFileSync(packPath, 'utf8'));

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

const commanders = report.commanders.map((item) => {
  const rawGap = item.raw_gap || { total_missing: 0, categories: {} };
  const categories = Object.entries(rawGap.categories || {})
    .map(([key, value]) => ({
      key,
      title: categoryTitleMap[key] || key,
      missing_count: Array.isArray(value) ? value.length : 0,
      missing: Array.isArray(value) ? value : [],
    }))
    .filter((entry) => entry.missing_count > 0)
    .sort((a, b) => b.missing_count - a.missing_count || a.title.localeCompare(b.title, 'zh-Hans-CN'));

  return {
    commander: item.commander,
    name_cn: item.name_cn,
    module: item.module,
    official_counts: item.official_counts,
    total_missing: rawGap.total_missing || 0,
    categories,
  };
});

const output = {
  generated_at: new Date().toISOString(),
  source_pack: path.relative(repoRoot, packPath),
  commanders,
};

fs.writeFileSync(outJson, JSON.stringify(output, null, 2), 'utf8');

let md = '';
md += '# 九位指挥官缺口归并清单\n\n';
md += '- 说明：这份清单把九位指挥官的官方数据和当前原始扫描到的待补项压缩成便于推进的收口摘要。\n';
md += '- 口径：仍以原始 ID 扫描为底，但会把同名引用 / localized key / 脚本文本中的命中视为已存在，所以这份清单适合做修补顺序，不适合作为最终裁决。\n\n';

md += '## 总览\n\n';
md += '| 指挥官 | 模块 | 官方兵种 | 官方建筑 | 英雄 | 等级加点 | 威望 | 升级 | 命令面板 | 原始缺口总数 | 主要缺口 |\n';
md += '| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |\n';
for (const item of commanders) {
  const major = item.categories.slice(0, 3).map((entry) => `${entry.title}${entry.missing_count}`).join('、') || '无';
  md += `| ${item.name_cn} / \`${item.commander}\` | \`${item.module}\` | ${item.official_counts.units} | ${item.official_counts.buildings} | ${item.official_counts.heroes} | ${item.official_counts.progression} | ${item.official_counts.prestiges} | ${item.official_counts.upgrades} | ${item.official_counts.command_cards} | ${item.total_missing} | ${major} |\n`;
}

md += '\n## 分指挥官明细\n\n';
for (const item of commanders) {
  md += `### ${item.name_cn} / \`${item.commander}\`\n\n`;
  md += `- 模块：\`${item.module}\`\n`;
  md += `- 官方条目数：兵种 ${item.official_counts.units}、建筑 ${item.official_counts.buildings}、英雄 ${item.official_counts.heroes}、等级加点 ${item.official_counts.progression}、威望 ${item.official_counts.prestiges}、升级 ${item.official_counts.upgrades}、命令面板 ${item.official_counts.command_cards}\n`;
  md += `- 原始缺口总数：${item.total_missing}\n`;

  if (!item.categories.length) {
    md += '- 当前没有列出明显缺口。\n\n';
    continue;
  }

  md += '- 当前优先补的类别：' + item.categories.slice(0, 3).map((entry) => `${entry.title}(${entry.missing_count})`).join('、') + '\n\n';
  for (const category of item.categories) {
    md += `#### ${category.title}（${category.missing_count}）\n\n`;
    for (const entry of category.missing) {
      md += `- ${entry.label || entry.id || ''} \`${entry.id || ''}\``;
      if (entry.source) {
        md += `  [来源：${entry.source}]`;
      }
      md += '\n';
    }
    md += '\n';
  }
}

fs.writeFileSync(outMd, md, 'utf8');
