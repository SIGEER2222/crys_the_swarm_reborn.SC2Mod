import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const commandersRoot = path.join(repoRoot, '游戏数据', '官方合作指挥官', 'commanders');
const activeXmRoot = path.join(repoRoot, '合作指挥官版起义狂潮', 'Mods', 'XM');
const xmFinalUnitData = path.join(activeXmRoot, 'XMFinal.SC2Mod', 'Base.SC2Data', 'GameData', 'UnitData.xml');
const outDir = path.join(repoRoot, 'docs', '每日进度', '2026-06-01-karax-artanis-vorazun字段级对齐审计');
const outJson = path.join(outDir, 'karax-artanis-vorazun-field-alignment.json');
const outMd = path.join(outDir, 'karax-artanis-vorazun-field-alignment.md');

const commanders = ['Karax', 'Artanis', 'Vorazun'];

const onlineSources = {
  Karax: 'https://starcraft2coop.com/commanders/karax',
  Artanis: 'https://starcraft2coop.com/commanders/artanis',
  Vorazun: 'https://starcraft2coop.com/commanders/vorazun',
};

const topPanels = {
  Artanis: {
    caster: 'SoACasterArtanis',
    expected: [
      { face: 'SOAPylonPower', abil_cmd: 'SOAPylonPower,Execute', row: '0', column: '0', label: 'Deploy Power Field' },
      { face: 'SOAOrbitalStrike', abil_cmd: 'SOAOrbitalStrikeActivate,On', row: '0', column: '1', label: 'Orbital Strike' },
      { face: 'SOASuperShield', row: '0', column: '2', label: 'Shield Overcharge' },
      { face: 'SOAStrafeAttack', abil_cmd: 'SOAStrafeAttack,Execute', row: '0', column: '3', label: 'Solar Bombardment' },
    ],
  },
  Karax: {
    caster: 'SoACasterKarax',
    expected: [
      { face: 'SOAOrbitalStrikeKarax', abil_cmd: 'SOAOrbitalStrikeKarax,Execute', row: '0', column: '0', label: 'Orbital Strike' },
      { face: 'SOAThermalLance', abil_cmd: 'SOAThermalLanceActivate,On', row: '0', column: '1', label: 'Solar Lance' },
      { face: 'SOAMapWideChrono', abil_cmd: 'SOAMapWideChrono,Execute', row: '0', column: '2', label: 'Chrono Wave' },
      { face: 'SOAPurifierBeam', abil_cmd: 'SOAPurifierBeam,Execute', row: '0', column: '3', label: 'Purifier Beam' },
    ],
  },
  Vorazun: {
    caster: 'SoACasterVorazun',
    expected: [
      { face: 'SOADarkPylon', abil_cmd: 'SOADarkPylon,Build1', row: '0', column: '0', label: 'Dark Pylon' },
      { face: 'SOAVorazunBlackHole', abil_cmd: 'VoidSentryBlackHole,Execute', row: '0', column: '1', label: 'Black Hole' },
      { face: 'SOAShadowGuardCalldown', abil_cmd: 'SOAShadowGuardCalldown,Execute', row: '0', column: '2', label: 'Shadow Guard' },
      { face: 'SOATimeFreeze', row: '0', column: '3', label: 'Time Stop' },
      { face: 'RecallOnDeathPassive', type: 'Passive', row: '0', column: '4', label: 'Emergency Recall passive' },
    ],
  },
};

const onlineExpectationAdditions = {
  Artanis: {
    units: [
      {
        id: 'Tempest',
        name: 'Tempest',
        source: 'StarCraft2Coop Combat Units',
        abilities: [
          { face: 'LightningBomb', type: 'AbilCmd', abil_cmd: 'LightningBomb,Execute', row: '2', column: '0', name: 'Disintegration' },
          { face: 'DisintegrationLocked', type: 'Passive', requirements: 'ArtanisLevel12', row: '2', column: '0', name: 'Disintegration locked state' },
        ],
      },
      {
        id: 'Reaver',
        name: 'Reaver',
        source: 'StarCraft2Coop Combat Units',
        abilities: [
          { face: 'HaveReaverIncreasedScarabCount', type: 'Passive', requirements: 'HaveReaverIncreasedScarabCount', row: '2', column: '1', name: 'Increased Scarab Capacity' },
          { face: 'PassiveReaverIncreasedScarabSplashRadius', type: 'Passive', requirements: 'HaveReaverIncreasedScarabSplashRadius', row: '2', column: '2', name: 'Solarite Payload' },
        ],
      },
    ],
    buildings: [],
  },
  Karax: {
    units: [],
    buildings: [
      {
        id: 'KhaydarinMonolith',
        name: 'Khaydarin Monolith',
        source: 'StarCraft2Coop Structures',
      },
    ],
  },
  Vorazun: {
    units: [
      {
        id: 'DarkArchon',
        name: 'Dark Archon',
        source: 'StarCraft2Coop Combat Units',
        abilities: [
          { face: 'DarkArchonConfusion', type: 'AbilCmd', abil_cmd: 'DarkArchonConfusion,Execute', row: '2', column: '0', name: 'Confusion' },
          { face: 'DarkArchonMindControl', type: 'AbilCmd', abil_cmd: 'DarkArchonMindControl,Execute', row: '2', column: '1', name: 'Mind Control' },
          { face: 'HaveDarkArchonFullStartingEnergy', type: 'Passive', requirements: 'HaveDarkArchonFullStartingEnergy', row: '2', column: '2', name: 'Full Starting Energy' },
        ],
      },
    ],
    buildings: [],
  },
};

const inheritedOrCoreFaces = new Set([
  '',
  'Move',
  'MoveChampions',
  'Stop',
  'Attack',
  'AttackChampions',
  'AttackBuilding',
  'Cancel',
  'CancelBuilding',
  'MoveHoldPosition',
  'MovePatrol',
  'AcquireMove',
  'Rally',
  'SelectBuilder',
  'Detector',
  'CliffWalk',
]);

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function normalize(value) {
  return value === undefined || value === null ? '' : String(value);
}

function parseAttrs(text) {
  const attrs = {};
  const attrRegex = /([A-Za-z0-9_:-]+)\s*=\s*"([^"]*)"/g;
  let match;
  while ((match = attrRegex.exec(text)) !== null) {
    attrs[match[1]] = match[2];
  }
  return attrs;
}

function valueFromChild(block, childName) {
  const escaped = childName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`<${escaped}\\b([^>]*)>`, 'i');
  const match = block.match(regex);
  if (!match) {
    return '';
  }
  return parseAttrs(match[1]).value || '';
}

function parseLayoutButtons(unitBody) {
  const buttons = [];
  const regex = /<LayoutButtons\b([^>]*?)\/>|<LayoutButtons\b([^>]*?)>([\s\S]*?)<\/LayoutButtons>/gi;
  let match;
  while ((match = regex.exec(unitBody)) !== null) {
    const inlineAttrs = parseAttrs(match[1] || match[2] || '');
    const body = match[3] || '';
    const button = {
      face: inlineAttrs.Face || valueFromChild(body, 'Face'),
      type: inlineAttrs.Type || valueFromChild(body, 'Type'),
      abil_cmd: inlineAttrs.AbilCmd || valueFromChild(body, 'AbilCmd'),
      requirements: inlineAttrs.Requirements || valueFromChild(body, 'Requirements'),
      row: inlineAttrs.Row || valueFromChild(body, 'Row'),
      column: inlineAttrs.Column || valueFromChild(body, 'Column'),
    };
    if (button.face) {
      buttons.push(button);
    }
  }
  return buttons;
}

function parseUnitData(filePath) {
  const text = fs.readFileSync(filePath, 'utf8');
  const units = new Map();
  const regex = /<CUnit\b([^>]*)>([\s\S]*?)<\/CUnit>/gi;
  let match;
  while ((match = regex.exec(text)) !== null) {
    const attrs = parseAttrs(match[1]);
    if (!attrs.id) {
      continue;
    }
    units.set(attrs.id, {
      id: attrs.id,
      parent: attrs.parent || '',
      buttons: parseLayoutButtons(match[2]),
    });
  }
  return units;
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
      } else if (entry.isFile() && /\.(xml|txt|galaxy)$/i.test(entry.name)) {
        files.push(full);
      }
    }
  }
  return files;
}

function buildGlobalTextIndex() {
  const text = walkRelevantFiles(activeXmRoot)
    .map((file) => fs.readFileSync(file, 'utf8'))
    .join('\n');
  return {
    has(value) {
      return Boolean(value) && text.includes(value);
    },
  };
}

function unique(values) {
  return [...new Set(values.filter(Boolean).map(String))];
}

function catalogCandidates(item) {
  return unique([
    item.id,
    item.unit_id,
    ...(item.resolved_unit_ids || []),
    item.production?.unit,
    ...(item.production_options || []).map((option) => option.unit),
  ]);
}

function buildCandidateMap(items) {
  const map = new Map();
  for (const item of items) {
    map.set(item.id, catalogCandidates(item));
  }
  return map;
}

function mergeExpectationAdditions(baseItems, additionItems) {
  const byId = new Map(baseItems.map((item) => [item.id, item]));
  const merged = [...baseItems];

  for (const addition of additionItems || []) {
    const existing = byId.get(addition.id);
    if (existing) {
      const existingFaces = new Set((existing.abilities || []).map((ability) => ability.face || ability.button?.id).filter(Boolean));
      existing.abilities = [
        ...(existing.abilities || []),
        ...(addition.abilities || []).filter((ability) => !existingFaces.has(ability.face || ability.button?.id)),
      ];
      existing.online_expectation_source = addition.source;
      continue;
    }

    merged.push({
      ...addition,
      online_expectation: true,
      resolved_unit_ids: addition.resolved_unit_ids || [addition.id],
      production_options: addition.production_options || [],
    });
  }

  return merged;
}

function collectButtons(candidateIds, moduleUnits, finalUnits) {
  const buttons = [];
  const foundUnitIds = [];
  for (const candidateId of candidateIds) {
    const units = [moduleUnits.get(candidateId), finalUnits.get(candidateId)].filter(Boolean);
    if (!units.length) {
      continue;
    }
    foundUnitIds.push(candidateId);
    for (const unit of units) {
      buttons.push(...unit.buttons);
    }
  }
  return { buttons, foundUnitIds };
}

function abilitySignature(ability) {
  return {
    face: normalize(ability.face || ability.button?.id),
    type: normalize(ability.type),
    abil_cmd: normalize(ability.abil_cmd),
    requirements: normalize(ability.requirements),
    row: normalize(ability.row),
    column: normalize(ability.column),
    name: normalize(ability.name || ability.button?.name || ability.face),
  };
}

function isProductionCommand(ability) {
  const abilCmd = normalize(ability.abil_cmd);
  return /^(GatewayTrain|WarpGateTrain|StargateTrain|RoboticsFacilityTrain|RoboticsFacilityWarpTrain|TemplarArchivesResearch|FleetBeaconResearch),/.test(abilCmd);
}

function compareField(field, expected, actual) {
  const expectedValue = normalize(expected[field]);
  const actualValue = normalize(actual[field]);
  if (!expectedValue || expectedValue === actualValue) {
    return null;
  }
  return { field, expected: expectedValue, actual: actualValue };
}

function compareExpectedButtons(expectedButtons, actualButtons, fields) {
  const issues = [];
  const actualByFace = new Map();
  for (const button of actualButtons) {
    if (!actualByFace.has(button.face)) {
      actualByFace.set(button.face, []);
    }
    actualByFace.get(button.face).push(button);
  }

  for (const expected of expectedButtons) {
    const matches = actualByFace.get(expected.face) || [];
    if (!matches.length) {
      issues.push({
        type: 'missing_button',
        face: expected.face,
        expected,
      });
      continue;
    }

    const actual = matches[0];
    const mismatches = fields
      .map((field) => compareField(field, expected, actual))
      .filter(Boolean);
    if (mismatches.length) {
      issues.push({
        type: 'field_mismatch',
        face: expected.face,
        expected,
        actual,
        mismatches,
      });
    }
  }

  return issues;
}

function auditUnitSkills(units, candidateMap, moduleUnits, finalUnits, globalText) {
  return units.map((unit) => {
    const candidateIds = candidateMap.get(unit.id) || catalogCandidates(unit);
    const { buttons, foundUnitIds } = collectButtons(candidateIds, moduleUnits, finalUnits);
    const actualFaces = new Set(buttons.map((button) => button.face));
    const expectedSkills = (unit.abilities || [])
      .filter((ability) => !isProductionCommand(ability))
      .map(abilitySignature)
      .filter((ability) => ability.face && !inheritedOrCoreFaces.has(ability.face));
    const expectedByFace = new Map();
    for (const expected of expectedSkills) {
      if (!expectedByFace.has(expected.face)) {
        expectedByFace.set(expected.face, []);
      }
      expectedByFace.get(expected.face).push(expected);
    }

    const issues = [];
    const globalOnly = [];
    for (const [face, variants] of expectedByFace) {
      const expected = variants[0];
      if (actualFaces.has(face)) {
        // Duplicate faces usually represent alternate command-card states. Once
        // one explicit face exists, strict row/column comparison is too noisy.
        if (variants.length === 1) {
          const actual = buttons.find((button) => button.face === face);
          const mismatches = ['type', 'abil_cmd', 'requirements', 'row', 'column']
            .map((field) => compareField(field, expected, actual))
            .filter(Boolean);
          if (mismatches.length) {
            issues.push({ type: 'field_mismatch', face, expected, actual, mismatches });
          }
        }
        continue;
      }

      if (globalText.has(face)) {
        globalOnly.push({ face, expected });
      } else {
        issues.push({ type: 'missing_unit_skill_face', face, expected });
      }
    }

    return {
      unit: unit.id,
      name: unit.name || unit.id,
      candidate_ids: candidateIds,
      found_unit_ids: foundUnitIds,
      expected_skill_faces: expectedSkills.map((skill) => skill.face),
      issues,
      global_only: globalOnly,
    };
  });
}

function auditBuildings(buildings, candidateMap, moduleUnits, finalUnits, globalText) {
  return buildings.map((building) => {
    const candidateIds = candidateMap.get(building.id) || catalogCandidates(building);
    const foundUnitIds = candidateIds.filter((id) => moduleUnits.has(id) || finalUnits.has(id));
    const issues = [];
    if (!foundUnitIds.length && !globalText.has(building.id)) {
      issues.push({ type: 'missing_building_catalog', id: building.id });
    }
    return {
      building: building.id,
      name: building.name || building.id,
      candidate_ids: candidateIds,
      found_unit_ids: foundUnitIds,
      issues,
    };
  });
}

function auditCommander(commander, finalUnits, globalText) {
  const moduleName = `XM${commander}.SC2Mod`;
  const unitDataPath = path.join(activeXmRoot, moduleName, 'Base.SC2Data', 'GameData', 'UnitData.xml');
  const commanderDir = path.join(commandersRoot, commander);
  const officialUnits = readJson(path.join(commanderDir, 'units.json'));
  const officialBuildings = readJson(path.join(commanderDir, 'buildings.json'));
  const additions = onlineExpectationAdditions[commander] || { units: [], buildings: [] };
  const units = mergeExpectationAdditions(officialUnits, additions.units);
  const buildings = mergeExpectationAdditions(officialBuildings, additions.buildings);
  const moduleUnits = parseUnitData(unitDataPath);
  const candidateMap = buildCandidateMap([...units, ...buildings]);

  const unitSkillReports = auditUnitSkills(units, candidateMap, moduleUnits, finalUnits, globalText);
  const buildingReports = auditBuildings(buildings, candidateMap, moduleUnits, finalUnits, globalText);

  const panel = topPanels[commander];
  const casterUnit = finalUnits.get(panel.caster) || moduleUnits.get(panel.caster);
  const topPanelIssues = casterUnit
    ? compareExpectedButtons(panel.expected, casterUnit.buttons, ['type', 'abil_cmd', 'row', 'column'])
    : [{ type: 'missing_top_panel_caster', caster: panel.caster }];

  return {
    commander,
    module: moduleName,
    online_source: onlineSources[commander],
    official_unit_count: officialUnits.length,
    official_building_count: officialBuildings.length,
    online_added_unit_count: additions.units.length,
    online_added_building_count: additions.buildings.length,
    expected_unit_count: units.length,
    expected_building_count: buildings.length,
    unit_skill_issue_count: unitSkillReports.reduce((sum, unit) => sum + unit.issues.length, 0),
    unit_skill_global_only_count: unitSkillReports.reduce((sum, unit) => sum + unit.global_only.length, 0),
    building_issue_count: buildingReports.reduce((sum, building) => sum + building.issues.length, 0),
    top_panel_issue_count: topPanelIssues.length,
    unit_skill_reports: unitSkillReports,
    building_reports: buildingReports,
    top_panel: {
      caster: panel.caster,
      expected: panel.expected,
      actual: casterUnit?.buttons || [],
      issues: topPanelIssues,
    },
  };
}

function summarizeIssueTypes(commanderReport) {
  const issueTypes = new Map();
  for (const unit of commanderReport.unit_skill_reports) {
    for (const issue of unit.issues) {
      issueTypes.set(issue.type, (issueTypes.get(issue.type) || 0) + 1);
    }
  }
  for (const building of commanderReport.building_reports) {
    for (const issue of building.issues) {
      issueTypes.set(issue.type, (issueTypes.get(issue.type) || 0) + 1);
    }
  }
  for (const issue of commanderReport.top_panel.issues) {
    issueTypes.set(`top_panel_${issue.type}`, (issueTypes.get(`top_panel_${issue.type}`) || 0) + 1);
  }
  return Object.fromEntries([...issueTypes.entries()].sort((a, b) => a[0].localeCompare(b[0])));
}

function formatIssue(issue) {
  if (issue.type === 'missing_unit_skill_face') {
    return `missing skill/passive face ${issue.face}`;
  }
  if (issue.type === 'missing_button') {
    return `missing button ${issue.face}`;
  }
  if (issue.type === 'field_mismatch') {
    return `${issue.face}: ${issue.mismatches.map((mismatch) => `${mismatch.field} expected=${mismatch.expected || '(empty)'} actual=${mismatch.actual || '(empty)'}`).join('; ')}`;
  }
  return JSON.stringify(issue);
}

function writeMarkdown(report) {
  const lines = [];
  lines.push('# Karax / Artanis / Vorazun 字段级对齐审计');
  lines.push('');
  lines.push(`- 生成时间：${new Date(report.generated_at).toLocaleString('zh-CN', { hour12: false })}`);
  lines.push('- 目的：补充现有 ID 缺口脚本的盲区，按“网上资料里的兵种技能/被动、建筑、顶部技能面板”做静态对齐审计。');
  lines.push('- 口径：兵种技能/被动以仓内官方 `units.json` 为机器可读来源，并补入 StarCraft2Coop 页面明确列出的 Combat Units / Structures 漏项；建筑按 roster/catalog 存在性核对；顶部面板按当前 XMFinal caster command card 精确核对。');
  lines.push('- 说明：`global-only` 表示技能按钮 ID 在当前 Mod 全局存在，但没有在候选单位的显式 LayoutButtons 中出现，可能来自父级继承、别名单位或待人工判断，不直接当作硬缺口。');
  lines.push('- 注意：本报告是静态字段审计，不替代 SC2 实机验证。');
  lines.push('');
  lines.push('## 总览');
  lines.push('');
  lines.push('| 指挥官 | 在线资料 | 单位审计 | 建筑审计 | 兵种技能硬问题 | global-only 提醒 | 建筑问题 | 顶部面板问题 | 问题类型 |');
  lines.push('| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |');
  for (const commanderReport of report.commanders) {
    const summary = summarizeIssueTypes(commanderReport);
    const summaryText = Object.keys(summary).length
      ? Object.entries(summary).map(([key, value]) => `${key}:${value}`).join('、')
      : '无';
    lines.push(`| ${commanderReport.commander} | ${commanderReport.online_source} | ${commanderReport.expected_unit_count} | ${commanderReport.expected_building_count} | ${commanderReport.unit_skill_issue_count} | ${commanderReport.unit_skill_global_only_count} | ${commanderReport.building_issue_count} | ${commanderReport.top_panel_issue_count} | ${summaryText} |`);
  }
  lines.push('');

  for (const commanderReport of report.commanders) {
    lines.push(`## ${commanderReport.commander}`);
    lines.push('');
    lines.push(`- 模块：\`${commanderReport.module}\``);
    lines.push(`- 在线资料：${commanderReport.online_source}`);
    lines.push(`- 单位审计：${commanderReport.expected_unit_count}（官方 JSON ${commanderReport.official_unit_count}，在线补充 ${commanderReport.online_added_unit_count}）`);
    lines.push(`- 建筑审计：${commanderReport.expected_building_count}（官方 JSON ${commanderReport.official_building_count}，在线补充 ${commanderReport.online_added_building_count}）`);
    lines.push(`- 兵种技能硬问题：${commanderReport.unit_skill_issue_count}`);
    lines.push(`- global-only 提醒：${commanderReport.unit_skill_global_only_count}`);
    lines.push(`- 建筑问题：${commanderReport.building_issue_count}`);
    lines.push(`- 顶部面板问题：${commanderReport.top_panel_issue_count}`);
    lines.push('');
    lines.push('### 顶部面板');
    if (!commanderReport.top_panel.issues.length) {
      lines.push('- 未发现静态字段问题。');
    } else {
      for (const issue of commanderReport.top_panel.issues) {
        lines.push(`- ${formatIssue(issue)}`);
      }
    }
    lines.push('');
    lines.push('### 兵种技能/被动硬问题');
    const unitsWithIssues = commanderReport.unit_skill_reports.filter((unit) => unit.issues.length);
    if (!unitsWithIssues.length) {
      lines.push('- 未发现硬缺口。');
    } else {
      for (const unit of unitsWithIssues) {
        lines.push(`- ${unit.name} \`${unit.unit}\`：${unit.issues.map(formatIssue).join('；')}`);
      }
    }
    lines.push('');
    lines.push('### global-only 提醒');
    const unitsWithGlobalOnly = commanderReport.unit_skill_reports.filter((unit) => unit.global_only.length);
    if (!unitsWithGlobalOnly.length) {
      lines.push('- 无。');
    } else {
      for (const unit of unitsWithGlobalOnly) {
        lines.push(`- ${unit.name} \`${unit.unit}\`：${unit.global_only.map((item) => item.face).join('、')}`);
      }
    }
    lines.push('');
    lines.push('### 建筑 roster/catalog');
    const buildingsWithIssues = commanderReport.building_reports.filter((building) => building.issues.length);
    if (!buildingsWithIssues.length) {
      lines.push('- 未发现硬缺口。');
    } else {
      for (const building of buildingsWithIssues) {
        lines.push(`- ${building.name} \`${building.building}\`：${building.issues.map((issue) => issue.type).join('、')}`);
      }
    }
    lines.push('');
  }

  while (lines.at(-1) === '') {
    lines.pop();
  }
  return lines.join('\n');
}

fs.mkdirSync(outDir, { recursive: true });

const finalUnits = parseUnitData(xmFinalUnitData);
const globalText = buildGlobalTextIndex();
const commanderReports = commanders.map((commander) => auditCommander(commander, finalUnits, globalText));
const report = {
  generated_at: new Date().toISOString(),
  official_root: commandersRoot,
  active_xm_root: activeXmRoot,
  online_sources: onlineSources,
  commanders: commanderReports,
};

fs.writeFileSync(outJson, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
fs.writeFileSync(outMd, `${writeMarkdown(report)}\n`, 'utf8');

console.log(`Wrote ${outJson}`);
console.log(`Wrote ${outMd}`);
for (const commanderReport of commanderReports) {
  console.log(`${commanderReport.commander}: unit_skill_issues=${commanderReport.unit_skill_issue_count}, global_only=${commanderReport.unit_skill_global_only_count}, building_issues=${commanderReport.building_issue_count}, top_panel_issues=${commanderReport.top_panel_issue_count}`);
}
