import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const commanders = ['Karax', 'Artanis', 'Vorazun'];

const officialRoot = path.join(repoRoot, '游戏数据', '官方合作指挥官', 'commanders');
const fieldAuditPath = path.join(repoRoot, 'docs', '每日进度', '2026-06-01-karax-artanis-vorazun字段级对齐审计', 'karax-artanis-vorazun-field-alignment.json');
const gapReportPath = path.join(repoRoot, 'docs', '每日进度', '2026-05-31-官方合作指挥官全量缺口清单', 'official-vs-mod-gap-report.json');
const runtimeTechDiagnosticsPath = path.join(repoRoot, 'docs', '每日进度', '2026-06-02-karax-artanis-vorazun当前Mod科技链路排查', 'commander-tech-tree-diagnostics.json');
const outDir = path.join(repoRoot, 'docs', '每日进度', '2026-06-01-karax-artanis-vorazun完成度审计');
const outJson = path.join(outDir, 'karax-artanis-vorazun-completion-audit.json');
const outMd = path.join(outDir, 'karax-artanis-vorazun-completion-audit.md');

const allowedRuntimeExtraBuildings = {
  Vorazun: new Set(['DarkPylon']),
};

const allowedRuntimeExtraTopPanelFaces = {
  Artanis: new Set([
    'CancelBuilding',
    'CommanderPrestigeArtanisGuardianShellLocked',
    'SOAHeroicShield',
    'SOAHeroicShieldLocked',
    'SOAStrafeAttackLocked',
    'SOAWarpTech',
    'WarpHarmonizationLocked',
  ]),
  Karax: new Set([
    'CancelBuilding',
    'CommanderPrestigeKaraxChronoFieldLocked',
    'CommanderPrestigeKaraxChronoWaveLocked',
    'PurifierBeamLocked',
    'ReconstructionBeamLocked',
    'SOAChronoPassive',
    'SOAChronoPassiveLocked',
    'SOARepairBeam',
  ]),
  Vorazun: new Set([
    'CancelBuilding',
    'RecallonDeathPassiveLocked',
    'SOAStrikefromtheShadows',
    'SOATimeStopLocked',
    'StrikefromtheShadowsLocked',
  ]),
};

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function passFail(ok) {
  return ok ? 'PASS' : 'FAIL';
}

function check(id, description, ok, evidence) {
  return { id, description, status: passFail(ok), ok, evidence };
}

function byCommander(items) {
  return new Map(items.map((item) => [item.commander, item]));
}

function unique(values) {
  return [...new Set(values.filter(Boolean).map(String))];
}

function commandCardFaces(buttons) {
  return buttons
    .map((button) => button.face)
    .filter(Boolean);
}

function includesAllById(expectedItems, reports, reportIdKey) {
  const reportedIds = new Set(reports.map((report) => report[reportIdKey]));
  return expectedItems.every((item) => reportedIds.has(item.id));
}

function resolvedUnitReports(field) {
  return (field.online_primary_units?.reports || [])
    .filter((item) => (item.resolved_unit_ids || []).length);
}

function missingResolvedUnitReports(field) {
  return resolvedUnitReports(field)
    .map((item) => {
      const foundIds = new Set(item.found_unit_ids || []);
      const missing = (item.resolved_unit_ids || []).filter((id) => !foundIds.has(id));
      return { item, missing };
    })
    .filter((report) => report.missing.length);
}

function runtimeEntryIds(entry) {
  return unique([
    entry.id,
    entry.unit_id,
    ...(entry.resolved_unit_ids || []),
  ]);
}

function auditReportIds(report, reportKey) {
  return unique([
    report[reportKey],
    report.unit,
    report.building,
    ...(report.resolved_unit_ids || []),
    ...(report.candidate_ids || []),
    ...(report.found_unit_ids || []),
  ]);
}

function missingRuntimeEntries(expectedReports, runtimeEntries, reportKey) {
  const runtimeIds = new Set(runtimeEntries.flatMap(runtimeEntryIds));
  return expectedReports
    .map((report) => ({
      id: report[reportKey],
      candidate_ids: auditReportIds(report, reportKey),
      matched_runtime_ids: auditReportIds(report, reportKey).filter((id) => runtimeIds.has(id)),
    }))
    .filter((item) => !item.matched_runtime_ids.length);
}

function extraRuntimeEntries(expectedReports, runtimeEntries, reportKey, allowedIds = new Set()) {
  const expectedIds = new Set(expectedReports.flatMap((report) => auditReportIds(report, reportKey)));
  return runtimeEntries
    .filter((entry) => runtimeEntryIds(entry).every((id) => !expectedIds.has(id)))
    .filter((entry) => runtimeEntryIds(entry).every((id) => !allowedIds.has(id)))
    .map((entry) => entry.unit_id || entry.id)
    .sort();
}

function runtimeTopPanelFaces(runtime) {
  return unique((runtime.top_panel || []).map((item) => item.ability?.face));
}

function missingRuntimeTopPanelFaces(expectedButtons, runtime) {
  const runtimeFaces = new Set(runtimeTopPanelFaces(runtime));
  return commandCardFaces(expectedButtons).filter((face) => !runtimeFaces.has(face));
}

function extraRuntimeTopPanelFaces(expectedButtons, runtime, allowedFaces = new Set()) {
  const expectedFaces = new Set(commandCardFaces(expectedButtons));
  return runtimeTopPanelFaces(runtime)
    .filter((face) => !expectedFaces.has(face))
    .filter((face) => !allowedFaces.has(face))
    .sort();
}

function productionCandidateIds(report, runtimeUnitIds) {
  const matchedRuntimeIds = auditReportIds(report, 'unit')
    .filter((id) => runtimeUnitIds.has(id));
  return matchedRuntimeIds.length
    ? unique(matchedRuntimeIds)
    : unique([report.unit, ...(report.resolved_unit_ids || [])]);
}

function runtimeProductionProducedUnitEvidence(runtime) {
  const evidence = new Map();
  const producers = [
    ...(runtime.buildings || []).map((entry) => ({ ...entry, producer_kind: 'building' })),
    ...(runtime.production_buildings || []).map((entry) => ({ ...entry, producer_kind: 'production_building' })),
    ...(runtime.units || []).map((entry) => ({ ...entry, producer_kind: 'unit' })),
    ...(runtime.heroes || []).map((entry) => ({ ...entry, producer_kind: 'hero' })),
  ];

  for (const producer of producers) {
    const producerId = producer.unit_id || producer.id || '';
    for (const produced of producer.produced_units || []) {
      const unitId = produced.unit_id || produced.unit || '';
      if (!unitId) continue;
      if (!evidence.has(unitId)) {
        evidence.set(unitId, []);
      }
      evidence.get(unitId).push({
        producer_id: producerId,
        producer_kind: producer.producer_kind || '',
        source: produced.source || '',
        abil_cmd: produced.abil_cmd || '',
      });
    }
  }
  return evidence;
}

function missingProductionProducedUnits(unitReports, producedEvidence, runtimeUnitIds) {
  return unitReports
    .map((report) => {
      const candidateIds = productionCandidateIds(report, runtimeUnitIds);
      return {
        id: report.unit,
        candidate_ids: candidateIds,
        matched_produced_ids: candidateIds.filter((id) => producedEvidence.has(id)),
      };
    })
    .filter((item) => !item.matched_produced_ids.length);
}

function extraProductionProducedUnits(unitReports, producedEvidence, runtimeUnitIds) {
  const expectedIds = new Set(unitReports.flatMap((report) => productionCandidateIds(report, runtimeUnitIds)));
  return [...producedEvidence.keys()]
    .filter((id) => !expectedIds.has(id))
    .sort();
}

function formatRuntimeMissing(missing) {
  return missing.length
    ? missing.map((item) => `${item.id}:${item.candidate_ids.join('/')}`).join('; ')
    : '0';
}

function formatProducedMissing(missing) {
  return missing.length
    ? missing.map((item) => `${item.id}:${item.candidate_ids.join('/')}`).join('; ')
    : '0';
}

function summarizeCommander(commander, fieldAudit, gapReport, runtimeReports) {
  const unitsPath = path.join(officialRoot, commander, 'units.json');
  const buildingsPath = path.join(officialRoot, commander, 'buildings.json');
  const officialUnits = readJson(unitsPath);
  const officialBuildings = readJson(buildingsPath);
  const field = fieldAudit.get(commander);
  const gap = gapReport.get(commander);
  const runtime = runtimeReports.get(commander);

  if (!field) {
    throw new Error(`Missing field audit for ${commander}`);
  }
  if (!gap) {
    throw new Error(`Missing gap report for ${commander}`);
  }
  if (!runtime) {
    throw new Error(`Missing current Mod tech diagnostics for ${commander}`);
  }

  const unitReports = field.unit_skill_reports || [];
  const buildingReports = field.building_reports || [];
  const runtimeUnits = runtime.units || [];
  const runtimeBuildings = runtime.buildings || [];
  const runtimeProductionBuildings = runtime.production_buildings || [];
  const missingRuntimeUnits = missingRuntimeEntries(unitReports, runtimeUnits, 'unit');
  const runtimeUnitIds = new Set(runtimeUnits.flatMap(runtimeEntryIds));
  const producedUnitEvidence = runtimeProductionProducedUnitEvidence(runtime);
  const productionProducedUnitIds = [...producedUnitEvidence.keys()].sort();
  const missingProductionUnits = missingProductionProducedUnits(unitReports, producedUnitEvidence, runtimeUnitIds);
  const extraProductionUnits = extraProductionProducedUnits(unitReports, producedUnitEvidence, runtimeUnitIds);
  const missingRuntimeBuildings = missingRuntimeEntries(buildingReports, runtimeBuildings, 'building');
  const extraRuntimeBuildings = extraRuntimeEntries(
    buildingReports,
    runtimeBuildings,
    'building',
    allowedRuntimeExtraBuildings[commander] || new Set(),
  );
  const topPanel = field.top_panel || { expected: [], issues: [] };
  const runtimeTopFaces = runtimeTopPanelFaces(runtime);
  const missingRuntimeTopFaces = missingRuntimeTopPanelFaces(topPanel.expected, runtime);
  const extraRuntimeTopFaces = extraRuntimeTopPanelFaces(
    topPanel.expected,
    runtime,
    allowedRuntimeExtraTopPanelFaces[commander] || new Set(),
  );
  const expectedUnitCount = field.expected_unit_count ?? unitReports.length;
  const expectedBuildingCount = field.expected_building_count ?? buildingReports.length;
  const resolvedUnits = resolvedUnitReports(field);
  const missingResolvedUnits = missingResolvedUnitReports(field);
  const checks = [
    check(
      'online-source',
      '存在可人工复核的 StarCraft2Coop 在线资料入口',
      Boolean(field.online_source),
      field.online_source,
    ),
    check(
      'official-vs-mod-static-gap',
      '官方合作指挥官数据到当前 Mod 的静态缺口总数为 0',
      gap.total_missing === 0,
      `total_missing=${gap.total_missing}`,
    ),
    check(
      'unit-roster-count',
      '官方 units.json 中的兵种均进入字段级单位审计',
      includesAllById(officialUnits, unitReports, 'unit'),
      `${officialUnits.length}/${unitReports.length}`,
    ),
    check(
      'online-added-units',
      'StarCraft2Coop 页面补充的显式兵种也进入字段级单位审计',
      expectedUnitCount === unitReports.length,
      `expected_units=${expectedUnitCount}, audited_units=${unitReports.length}, online_added=${field.online_added_unit_count || 0}`,
    ),
    check(
      'online-primary-units',
      'StarCraft2Coop Combat Units 主清单均被当前审计覆盖',
      (field.online_primary_unit_issue_count || 0) === 0,
      `online_primary_units=${field.online_primary_unit_count || 0}, supplemental_units=${field.supplemental_unit_count || 0}, issues=${field.online_primary_unit_issue_count || 0}`,
    ),
    check(
      'online-primary-unit-resolved-ids',
      '在线主兵种解析 ID 均命中当前 Mod/XMFinal 单位',
      missingResolvedUnits.length === 0,
      `resolved_unit_reports=${resolvedUnits.length}, missing=${missingResolvedUnits.map((report) => `${report.item.id}:${report.missing.join('/')}`).join('; ') || 0}`,
    ),
    check(
      'current-mod-runtime-unit-roster',
      '字段级单位口径均能映射到当前 Mod 运行名册单位',
      missingRuntimeUnits.length === 0,
      `runtime_units=${runtimeUnits.length}, missing=${formatRuntimeMissing(missingRuntimeUnits)}`,
    ),
    check(
      'current-mod-building-panel-produced-unit-coverage',
      '当前 Mod 可追踪生产/合体/变形目标覆盖字段级单位口径',
      missingProductionUnits.length === 0,
      `produced_unit_ids=${productionProducedUnitIds.join('/') || 0}, missing=${formatProducedMissing(missingProductionUnits)}`,
    ),
    check(
      'current-mod-building-panel-extra-produced-units',
      '当前 Mod 未暴露未解释的额外生产/合体/变形单位',
      extraProductionUnits.length === 0,
      `extra=${extraProductionUnits.join('/') || 0}`,
    ),
    check(
      'unit-skill-hard-issues',
      '兵种技能/被动不存在硬缺口或字段不匹配',
      field.unit_skill_issue_count === 0,
      `unit_skill_issues=${field.unit_skill_issue_count}`,
    ),
    check(
      'unit-skill-global-only',
      '兵种技能/被动不再依赖 global-only 提醒项',
      field.unit_skill_global_only_count === 0,
      `global_only=${field.unit_skill_global_only_count}`,
    ),
    check(
      'unit-skill-global-refs',
      '兵种技能/被动全局 Catalog/脚本证据均存在',
      (field.unit_skill_global_ref_missing_count || 0) === 0,
      `global_refs=${field.unit_skill_global_ref_count || 0}, missing=${field.unit_skill_global_ref_missing_count || 0}`,
    ),
    check(
      'building-roster-count',
      '官方 buildings.json 中的建筑均进入字段级建筑审计',
      includesAllById(officialBuildings, buildingReports, 'building'),
      `${officialBuildings.length}/${buildingReports.length}`,
    ),
    check(
      'online-added-buildings',
      'StarCraft2Coop 页面补充的显式建筑也进入字段级建筑审计',
      expectedBuildingCount === buildingReports.length,
      `expected_buildings=${expectedBuildingCount}, audited_buildings=${buildingReports.length}, online_added=${field.online_added_building_count || 0}`,
    ),
    check(
      'online-primary-structures',
      'StarCraft2Coop Structures 主清单均被当前审计覆盖',
      (field.online_primary_structure_issue_count || 0) === 0,
      `online_primary_structures=${field.online_primary_structure_count || 0}, supplemental_buildings=${field.supplemental_building_count || 0}, issues=${field.online_primary_structure_issue_count || 0}`,
    ),
    check(
      'building-issues',
      '建筑 roster/catalog 不存在静态缺口',
      field.building_issue_count === 0,
      `building_issues=${field.building_issue_count}`,
    ),
    check(
      'current-mod-runtime-building-roster',
      '字段级建筑口径均能映射到当前 Mod 运行名册建筑',
      missingRuntimeBuildings.length === 0,
      `runtime_buildings=${runtimeBuildings.length}, missing=${formatRuntimeMissing(missingRuntimeBuildings)}`,
    ),
    check(
      'current-mod-runtime-extra-buildings',
      '当前 Mod 运行名册未出现未解释的额外建筑',
      extraRuntimeBuildings.length === 0,
      `extra=${extraRuntimeBuildings.join('/') || 0}, allowed=${[...(allowedRuntimeExtraBuildings[commander] || [])].join('/') || 0}`,
    ),
    check(
      'building-stat-issues',
      '建筑 HP/Shield/Energy/Damage/Range/Speed 等在线数值字段不存在静态不匹配',
      (field.building_stat_issue_count || 0) === 0,
      `building_stat_issues=${field.building_stat_issue_count || 0}`,
    ),
    check(
      'top-panel',
      '顶部技能面板按钮字段全部匹配预期',
      field.top_panel_issue_count === 0,
      `top_panel_issues=${field.top_panel_issue_count}`,
    ),
    check(
      'current-mod-runtime-top-panel',
      '顶部技能面板预期按钮均出现在当前 Mod runtime 面板',
      missingRuntimeTopFaces.length === 0,
      `runtime_faces=${runtimeTopFaces.length}, missing=${missingRuntimeTopFaces.join('/') || 0}`,
    ),
    check(
      'current-mod-runtime-extra-top-panel',
      '当前 Mod runtime 顶部面板未出现未解释的额外按钮',
      extraRuntimeTopFaces.length === 0,
      `extra=${extraRuntimeTopFaces.join('/') || 0}, allowed=${[...(allowedRuntimeExtraTopPanelFaces[commander] || [])].join('/') || 0}`,
    ),
  ];

  return {
    commander,
    module: field.module,
    online_source: field.online_source,
    official_units_path: path.relative(repoRoot, unitsPath),
    official_buildings_path: path.relative(repoRoot, buildingsPath),
    gap_report_path: path.relative(repoRoot, gapReportPath),
    field_audit_path: path.relative(repoRoot, fieldAuditPath),
    runtime_tech_diagnostics_path: path.relative(repoRoot, runtimeTechDiagnosticsPath),
    official_unit_count: officialUnits.length,
    official_building_count: officialBuildings.length,
    runtime_unit_count: runtimeUnits.length,
    runtime_building_count: runtimeBuildings.length,
    runtime_production_building_count: runtimeProductionBuildings.length,
    runtime_production_building_ids: runtimeProductionBuildings
      .map((building) => building.unit_id || building.id)
      .filter(Boolean),
    runtime_top_panel_face_count: runtimeTopFaces.length,
    runtime_production_produced_unit_count: productionProducedUnitIds.length,
    runtime_production_produced_unit_ids: productionProducedUnitIds,
    runtime_production_missing_units: missingProductionUnits,
    runtime_production_extra_produced_units: extraProductionUnits,
    runtime_building_panel_produced_unit_count: productionProducedUnitIds.length,
    runtime_building_panel_produced_unit_ids: productionProducedUnitIds,
    runtime_building_panel_missing_units: missingProductionUnits,
    runtime_building_panel_extra_produced_units: extraProductionUnits,
    online_added_unit_count: field.online_added_unit_count || 0,
    online_added_building_count: field.online_added_building_count || 0,
    online_primary_unit_count: field.online_primary_unit_count || 0,
    resolved_unit_report_count: resolvedUnits.length,
    online_primary_structure_count: field.online_primary_structure_count || 0,
    supplemental_unit_count: field.supplemental_unit_count || 0,
    supplemental_building_count: field.supplemental_building_count || 0,
    unit_skill_global_ref_count: field.unit_skill_global_ref_count || 0,
    unit_skill_global_ref_missing_count: field.unit_skill_global_ref_missing_count || 0,
    building_stat_issue_count: field.building_stat_issue_count || 0,
    unit_count: expectedUnitCount,
    building_count: expectedBuildingCount,
    top_panel_button_count: topPanel.expected.length,
    unit_ids: unitReports.map((unit) => unit.unit),
    building_ids: buildingReports.map((building) => building.building),
    top_panel_faces: commandCardFaces(topPanel.expected),
    checks,
    status: passFail(checks.every((item) => item.ok)),
  };
}

function writeMarkdown(report) {
  const lines = [];
  lines.push('# Karax / Artanis / Vorazun 完成度审计');
  lines.push('');
  lines.push(`- 生成时间：${new Date(report.generated_at).toLocaleString('zh-CN', { hour12: false })}`);
  lines.push('- 目标：为“兵种及技能/被动、建筑、顶部技能面板与在线指挥官资料一致”提供可复核的静态完成度矩阵。');
  lines.push('- 范围：本报告使用仓内官方合作指挥官数据、字段级审计报告、官方-vs-Mod 缺口报告、当前 Mod 科技链路诊断，以及 StarCraft2Coop 在线资料入口和页面显式补充项。');
  lines.push('- 说明：本机无 SC2 测试环境，本报告只证明静态数据层对齐，不替代实机运行。');
  lines.push('');
  lines.push('## 总览');
  lines.push('');
  lines.push('| 指挥官 | 状态 | 单位 | 建筑 | 顶部面板按钮 | 在线资料 |');
  lines.push('| --- | --- | ---: | ---: | ---: | --- |');
  for (const commander of report.commanders) {
    lines.push(`| ${commander.commander} | ${commander.status} | ${commander.unit_count} | ${commander.building_count} | ${commander.top_panel_button_count} | ${commander.online_source} |`);
  }
  lines.push('');

  for (const commander of report.commanders) {
    lines.push(`## ${commander.commander}`);
    lines.push('');
    lines.push(`- 模块：\`${commander.module}\``);
    lines.push(`- 单位口径：${commander.unit_count}（官方 JSON ${commander.official_unit_count}，在线补充 ${commander.online_added_unit_count}）`);
    lines.push(`- 在线主单位：${commander.online_primary_unit_count}，supplemental 单位：${commander.supplemental_unit_count}`);
    lines.push(`- 建筑口径：${commander.building_count}（官方 JSON ${commander.official_building_count}，在线补充 ${commander.online_added_building_count}）`);
    lines.push(`- 在线主建筑：${commander.online_primary_structure_count}，supplemental 建筑：${commander.supplemental_building_count}`);
    lines.push(`- 当前 Mod 运行名册：单位 ${commander.runtime_unit_count}，建筑 ${commander.runtime_building_count}，生产链补充建筑 ${commander.runtime_production_building_count || 0}，顶部面板 face ${commander.runtime_top_panel_face_count}`);
    if (commander.runtime_production_building_ids?.length) {
      lines.push(`- 当前 Mod 生产链补充建筑：${commander.runtime_production_building_ids.join('、')}`);
    }
    lines.push(`- 当前 Mod 可追踪生产/合体/变形目标：${commander.runtime_production_produced_unit_count}（${commander.runtime_production_produced_unit_ids.join('、') || '无'}）`);
    lines.push(`- 单位：${commander.unit_ids.join('、')}`);
    lines.push(`- 建筑：${commander.building_ids.join('、')}`);
    lines.push(`- 顶部面板：${commander.top_panel_faces.join('、')}`);
    lines.push('');
    lines.push('| 检查项 | 状态 | 证据 |');
    lines.push('| --- | --- | --- |');
    for (const item of commander.checks) {
      lines.push(`| ${item.description} | ${item.status} | ${item.evidence} |`);
    }
    lines.push('');
  }

  while (lines.at(-1) === '') {
    lines.pop();
  }
  return lines.join('\n');
}

fs.mkdirSync(outDir, { recursive: true });

const fieldAuditRaw = readJson(fieldAuditPath);
const gapReportRaw = readJson(gapReportPath);
const runtimeTechDiagnosticsRaw = readJson(runtimeTechDiagnosticsPath);
const fieldAudit = byCommander(fieldAuditRaw.commanders);
const gapReport = byCommander(gapReportRaw.commanders);
const runtimeReports = byCommander(runtimeTechDiagnosticsRaw.commanders);
const report = {
  generated_at: new Date().toISOString(),
  commanders: commanders.map((commander) => summarizeCommander(commander, fieldAudit, gapReport, runtimeReports)),
};
report.status = passFail(report.commanders.every((commander) => commander.status === 'PASS'));

fs.writeFileSync(outJson, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
fs.writeFileSync(outMd, `${writeMarkdown(report)}\n`, 'utf8');

console.log(`Wrote ${outJson}`);
console.log(`Wrote ${outMd}`);
for (const commander of report.commanders) {
  console.log(`${commander.commander}: status=${commander.status}, units=${commander.unit_count}, buildings=${commander.building_count}, top_panel_buttons=${commander.top_panel_button_count}`);
}

if (report.status !== 'PASS') {
  process.exitCode = 1;
}
