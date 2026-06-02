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
        id: 'PhotonCannon',
        name: 'Photon Cannon',
        source: 'StarCraft2Coop Structures',
        online_stats: {
          life: '150',
          shields: '150',
          energy: '',
        },
      },
      {
        id: 'KhaydarinMonolith',
        name: 'Khaydarin Monolith',
        source: 'StarCraft2Coop Structures',
        online_stats: {
          life: '100',
          shields: '200',
          energy: '',
        },
      },
      {
        id: 'ShieldBattery',
        name: 'Shield Battery',
        source: 'StarCraft2Coop Structures',
        online_stats: {
          life: '200',
          shields: '200',
          energy: '100',
        },
      },
    ],
  },
  Vorazun: {
    units: [
      {
        id: 'ZealotShakuras',
        name: 'Centurion',
        source: 'StarCraft2Coop Combat Units',
        abilities: [
          { face: 'Charge', type: 'AbilCmd', abil_cmd: 'Charge,Execute', row: '2', column: '0', name: 'Shadow Charge base command' },
        ],
        global_refs: [
          { id: 'VoidZealotShadowCharge', type: 'Upgrade', name: 'Shadow Charge upgrade package' },
          { id: 'ZealotResearchShadowStun', type: 'Upgrade', name: 'Darkcoil upgrade' },
          { id: 'ResearchShadowStun', type: 'Button', name: 'Darkcoil research button' },
        ],
      },
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

const onlinePrimaryRoster = {
  Artanis: {
    units: [
      { id: 'Zealot', label: 'Zealot' },
      { id: 'StalkerAiur', label: 'Dragoon' },
      { id: 'HighTemplar', label: 'High Templar' },
      { id: 'Archon', label: 'Archon' },
      { id: 'ImmortalAiur', label: 'Immortal' },
      { id: 'Reaver', label: 'Reaver' },
      { id: 'PhoenixAiur', label: 'Phoenix' },
      { id: 'Tempest', label: 'Tempest' },
    ],
    structures: [],
  },
  Karax: {
    units: [
      { id: 'ZealotPurifier', label: 'Sentinel' },
      { id: 'SentryPurifier', label: 'Energizer' },
      { id: 'ImmortalAiur', label: 'Immortal' },
      { id: 'Colossus', label: 'Colossus' },
      { id: 'PhoenixPurifier', label: 'Mirage' },
      { id: 'Carrier', label: 'Carrier' },
    ],
    structures: [
      { id: 'PhotonCannon', label: 'Photon Cannon' },
      { id: 'KhaydarinMonolith', label: 'Khaydarin Monolith' },
      { id: 'ShieldBattery', label: 'Shield Battery' },
    ],
  },
  Vorazun: {
    units: [
      { id: 'ZealotShakuras', label: 'Centurion' },
      { id: 'Stalker', label: 'Stalker' },
      { id: 'DarkTemplarShakuras', label: 'Dark Templar' },
      { id: 'DarkArchon', label: 'Dark Archon' },
      { id: 'PhoenixShakuras', label: 'Corsair' },
      { id: 'VoidRay', label: 'Void Ray' },
      { id: 'Oracle', label: 'Oracle' },
    ],
    structures: [],
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
      stats: {
        life: valueFromChild(match[2], 'LifeMax') || valueFromChild(match[2], 'LifeStart'),
        shields: valueFromChild(match[2], 'ShieldsMax') || valueFromChild(match[2], 'ShieldsStart'),
        energy: valueFromChild(match[2], 'EnergyMax') || valueFromChild(match[2], 'EnergyStart'),
      },
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

function buildingStatCandidates(item) {
  return unique([
    item.id,
    item.unit_id,
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
      const existingGlobalRefs = new Set((existing.global_refs || []).map((ref) => ref.id || ref.value || ref.face).filter(Boolean));
      const addedGlobalRefs = (addition.global_refs || []).filter((ref) => !existingGlobalRefs.has(ref.id || ref.value || ref.face));
      if (addedGlobalRefs.length) {
        existing.global_refs = [...(existing.global_refs || []), ...addedGlobalRefs];
      }
      if (addition.online_stats) {
        existing.online_stats = addition.online_stats;
      }
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

function globalRefSignature(ref) {
  return {
    id: normalize(ref.id || ref.value || ref.face),
    type: normalize(ref.type),
    name: normalize(ref.name || ref.label || ref.id || ref.value || ref.face),
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

function expectedBuildingStats(building) {
  const source = building.online_stats || {};
  return {
    life: normalize(source.life),
    shields: normalize(source.shields),
    energy: normalize(source.energy),
  };
}

function activeBuildingStat(building, candidateIds, moduleUnits, finalUnits, field) {
  for (const candidateId of candidateIds) {
    const finalValue = normalize(finalUnits.get(candidateId)?.stats?.[field]);
    if (finalValue) {
      return { value: finalValue, source: `XMFinal:${candidateId}` };
    }
    const moduleValue = normalize(moduleUnits.get(candidateId)?.stats?.[field]);
    if (moduleValue) {
      return { value: moduleValue, source: `module:${candidateId}` };
    }
  }

  const fallback = normalize((building.online_stats || {})[field]);
  return fallback
    ? { value: fallback, source: 'online-expectation-fallback' }
    : { value: '', source: 'not-declared' };
}

function auditBuildingStats(building, moduleUnits, finalUnits) {
  const candidateIds = buildingStatCandidates(building);
  const expected = expectedBuildingStats(building);
  const actual = {};
  const issues = [];
  for (const field of ['life', 'shields', 'energy']) {
    if (!expected[field]) {
      continue;
    }
    actual[field] = activeBuildingStat(building, candidateIds, moduleUnits, finalUnits, field);
    if (actual[field].value !== expected[field]) {
      issues.push({
        type: 'building_stat_mismatch',
        field,
        expected: expected[field],
        actual: actual[field].value,
        source: actual[field].source,
      });
    }
  }

  return {
    candidate_ids: candidateIds,
    expected,
    actual,
    issues,
  };
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
    const expectedGlobalRefs = (unit.global_refs || [])
      .map(globalRefSignature)
      .filter((ref) => ref.id);
    const expectedByFace = new Map();
    for (const expected of expectedSkills) {
      if (!expectedByFace.has(expected.face)) {
        expectedByFace.set(expected.face, []);
      }
      expectedByFace.get(expected.face).push(expected);
    }

    const issues = [];
    const globalOnly = [];
    const globalRefReports = expectedGlobalRefs.map((ref) => ({
      ...ref,
      present: globalText.has(ref.id),
    }));
    for (const ref of globalRefReports) {
      if (!ref.present) {
        issues.push({ type: 'missing_global_ref', id: ref.id, expected: ref });
      }
    }

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
      expected_global_refs: expectedGlobalRefs.map((ref) => ref.id),
      global_ref_reports: globalRefReports,
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
    const statReport = auditBuildingStats(building, moduleUnits, finalUnits);
    issues.push(...statReport.issues);
    return {
      building: building.id,
      name: building.name || building.id,
      candidate_ids: candidateIds,
      found_unit_ids: foundUnitIds,
      stat_candidate_ids: statReport.candidate_ids,
      expected_stats: statReport.expected,
      actual_stats: statReport.actual,
      stat_issues: statReport.issues,
      issues,
    };
  });
}

function auditOnlinePrimaryRoster(expectedItems, reports, reportKey) {
  const reportById = new Map(reports.map((report) => [report[reportKey], report]));
  const itemReports = expectedItems.map((expected) => {
    const report = reportById.get(expected.id);
    const issues = [];
    if (!report) {
      issues.push({ type: 'missing_online_primary_item', id: expected.id, label: expected.label });
    } else {
      if ((report.issues || []).length) {
        issues.push({ type: 'online_primary_item_has_hard_issues', id: expected.id, issue_count: report.issues.length });
      }
      if ((report.global_only || []).length) {
        issues.push({ type: 'online_primary_item_has_global_only', id: expected.id, issue_count: report.global_only.length });
      }
      if (
        reportKey === 'unit'
        && !(report.expected_skill_faces || []).length
        && !(report.expected_global_refs || []).length
      ) {
        issues.push({ type: 'online_primary_unit_has_no_skill_or_global_ref_expectations', id: expected.id });
      }
    }

    return {
      ...expected,
      audited: Boolean(report),
      issues,
    };
  });

  const expectedIds = new Set(expectedItems.map((item) => item.id));
  const supplemental = reports
    .filter((report) => !expectedIds.has(report[reportKey]))
    .map((report) => ({
      id: report[reportKey],
      name: report.name || report[reportKey],
    }));

  return {
    expected: expectedItems,
    reports: itemReports,
    issue_count: itemReports.reduce((sum, item) => sum + item.issues.length, 0),
    supplemental,
    supplemental_count: supplemental.length,
  };
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
  const primaryRoster = onlinePrimaryRoster[commander] || { units: [], structures: [] };
  const onlinePrimaryUnits = auditOnlinePrimaryRoster(primaryRoster.units, unitSkillReports, 'unit');
  const onlinePrimaryStructures = auditOnlinePrimaryRoster(primaryRoster.structures, buildingReports, 'building');

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
    online_primary_unit_count: onlinePrimaryUnits.expected.length,
    online_primary_unit_issue_count: onlinePrimaryUnits.issue_count,
    online_primary_structure_count: onlinePrimaryStructures.expected.length,
    online_primary_structure_issue_count: onlinePrimaryStructures.issue_count,
    supplemental_unit_count: onlinePrimaryUnits.supplemental_count,
    supplemental_building_count: onlinePrimaryStructures.supplemental_count,
    unit_skill_issue_count: unitSkillReports.reduce((sum, unit) => sum + unit.issues.length, 0),
    unit_skill_global_only_count: unitSkillReports.reduce((sum, unit) => sum + unit.global_only.length, 0),
    unit_skill_global_ref_count: unitSkillReports.reduce((sum, unit) => sum + unit.global_ref_reports.length, 0),
    unit_skill_global_ref_missing_count: unitSkillReports.reduce((sum, unit) => sum + unit.global_ref_reports.filter((ref) => !ref.present).length, 0),
    building_issue_count: buildingReports.reduce((sum, building) => sum + building.issues.length, 0),
    building_stat_issue_count: buildingReports.reduce((sum, building) => sum + building.stat_issues.length, 0),
    top_panel_issue_count: topPanelIssues.length,
    unit_skill_reports: unitSkillReports,
    building_reports: buildingReports,
    online_primary_units: onlinePrimaryUnits,
    online_primary_structures: onlinePrimaryStructures,
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
  if (issue.type === 'missing_global_ref') {
    return `missing global skill/passive ref ${issue.id}`;
  }
  if (issue.type === 'missing_button') {
    return `missing button ${issue.face}`;
  }
  if (issue.type === 'field_mismatch') {
    return `${issue.face}: ${issue.mismatches.map((mismatch) => `${mismatch.field} expected=${mismatch.expected || '(empty)'} actual=${mismatch.actual || '(empty)'}`).join('; ')}`;
  }
  if (issue.type === 'building_stat_mismatch') {
    return `${issue.field} expected=${issue.expected || '(empty)'} actual=${issue.actual || '(empty)'} source=${issue.source}`;
  }
  return JSON.stringify(issue);
}

function writeMarkdown(report) {
  const lines = [];
  lines.push('# Karax / Artanis / Vorazun 字段级对齐审计');
  lines.push('');
  lines.push(`- 生成时间：${new Date(report.generated_at).toLocaleString('zh-CN', { hour12: false })}`);
  lines.push('- 目的：补充现有 ID 缺口脚本的盲区，按“网上资料里的兵种技能/被动、建筑、顶部技能面板”做静态对齐审计。');
  lines.push('- 口径：兵种技能/被动以仓内官方 `units.json` 为机器可读来源，并补入 StarCraft2Coop 页面明确列出的 Combat Units / Structures 漏项；在线主清单作为必须覆盖的子集，Observer 等支援/扩展项作为 supplemental 透明列出；非单位按钮承载的技能/被动以 `global_refs` 证明当前 Mod 全局 Catalog/脚本存在；建筑按 roster/catalog 存在性核对；顶部面板按当前 XMFinal caster command card 精确核对。');
  lines.push('- 说明：`global-only` 表示技能按钮 ID 在当前 Mod 全局存在，但没有在候选单位的显式 LayoutButtons 中出现，可能来自父级继承、别名单位或待人工判断，不直接当作硬缺口。');
  lines.push('- 说明：`global_refs` 表示在线技能/被动不是单位命令卡按钮本体，而是以升级、研究按钮、需求或测试台科技检查等全局 Catalog/脚本证据落地。');
  lines.push('- 注意：本报告是静态字段审计，不替代 SC2 实机验证。');
  lines.push('');
  lines.push('## 总览');
  lines.push('');
  lines.push('| 指挥官 | 在线资料 | 单位审计 | 在线主单位 | 建筑审计 | 在线主建筑 | 兵种技能硬问题 | global-only 提醒 | 全局证据 | 全局证据缺失 | 建筑问题 | 建筑数值问题 | 顶部面板问题 | 问题类型 |');
  lines.push('| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |');
  for (const commanderReport of report.commanders) {
    const summary = summarizeIssueTypes(commanderReport);
    const summaryText = Object.keys(summary).length
      ? Object.entries(summary).map(([key, value]) => `${key}:${value}`).join('、')
      : '无';
    lines.push(`| ${commanderReport.commander} | ${commanderReport.online_source} | ${commanderReport.expected_unit_count} | ${commanderReport.online_primary_unit_count} | ${commanderReport.expected_building_count} | ${commanderReport.online_primary_structure_count} | ${commanderReport.unit_skill_issue_count} | ${commanderReport.unit_skill_global_only_count} | ${commanderReport.unit_skill_global_ref_count} | ${commanderReport.unit_skill_global_ref_missing_count} | ${commanderReport.building_issue_count} | ${commanderReport.building_stat_issue_count} | ${commanderReport.top_panel_issue_count} | ${summaryText} |`);
  }
  lines.push('');

  for (const commanderReport of report.commanders) {
    lines.push(`## ${commanderReport.commander}`);
    lines.push('');
    lines.push(`- 模块：\`${commanderReport.module}\``);
    lines.push(`- 在线资料：${commanderReport.online_source}`);
    lines.push(`- 单位审计：${commanderReport.expected_unit_count}（官方 JSON ${commanderReport.official_unit_count}，在线补充 ${commanderReport.online_added_unit_count}）`);
    lines.push(`- 在线主单位：${commanderReport.online_primary_unit_count}，问题 ${commanderReport.online_primary_unit_issue_count}；supplemental 单位 ${commanderReport.supplemental_unit_count}`);
    lines.push(`- 建筑审计：${commanderReport.expected_building_count}（官方 JSON ${commanderReport.official_building_count}，在线补充 ${commanderReport.online_added_building_count}）`);
    lines.push(`- 在线主建筑：${commanderReport.online_primary_structure_count}，问题 ${commanderReport.online_primary_structure_issue_count}；supplemental 建筑 ${commanderReport.supplemental_building_count}`);
    lines.push(`- 兵种技能硬问题：${commanderReport.unit_skill_issue_count}`);
    lines.push(`- global-only 提醒：${commanderReport.unit_skill_global_only_count}`);
    lines.push(`- 全局技能/被动证据：${commanderReport.unit_skill_global_ref_count}，缺失 ${commanderReport.unit_skill_global_ref_missing_count}`);
    lines.push(`- 建筑问题：${commanderReport.building_issue_count}`);
    lines.push(`- 建筑数值问题：${commanderReport.building_stat_issue_count}`);
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
    lines.push('### 在线主单位覆盖');
    if (!commanderReport.online_primary_units.reports.length) {
      lines.push('- 该页面没有单独建模的在线主单位清单。');
    } else {
      const unitSummary = commanderReport.online_primary_units.reports
        .map((item) => `${item.label} \`${item.id}\`${item.issues.length ? `（${item.issues.map((issue) => issue.type).join('、')}）` : ''}`)
        .join('、');
      lines.push(`- ${unitSummary}`);
    }
    if (commanderReport.online_primary_units.supplemental.length) {
      lines.push(`- supplemental：${commanderReport.online_primary_units.supplemental.map((item) => `${item.name} \`${item.id}\``).join('、')}`);
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
    lines.push('### 全局技能/被动证据');
    const unitsWithGlobalRefs = commanderReport.unit_skill_reports.filter((unit) => unit.global_ref_reports.length);
    if (!unitsWithGlobalRefs.length) {
      lines.push('- 无。');
    } else {
      for (const unit of unitsWithGlobalRefs) {
        const refs = unit.global_ref_reports
          .map((ref) => `${ref.name} \`${ref.id}\`${ref.present ? '' : '（缺失）'}`)
          .join('、');
        lines.push(`- ${unit.name} \`${unit.unit}\`：${refs}`);
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
    lines.push('### 在线主建筑覆盖');
    if (!commanderReport.online_primary_structures.reports.length) {
      lines.push('- 该页面没有单独建模的在线主建筑清单。');
    } else {
      const structureSummary = commanderReport.online_primary_structures.reports
        .map((item) => `${item.label} \`${item.id}\`${item.issues.length ? `（${item.issues.map((issue) => issue.type).join('、')}）` : ''}`)
        .join('、');
      lines.push(`- ${structureSummary}`);
    }
    if (commanderReport.online_primary_structures.supplemental.length) {
      lines.push(`- supplemental：${commanderReport.online_primary_structures.supplemental.map((item) => `${item.name} \`${item.id}\``).join('、')}`);
    }
    lines.push('');
    lines.push('### 建筑数值字段');
    const buildingsWithStats = commanderReport.building_reports.filter((building) => Object.values(building.expected_stats || {}).some(Boolean));
    if (!buildingsWithStats.length) {
      lines.push('- 无。');
    } else {
      for (const building of buildingsWithStats) {
        const fields = ['life', 'shields', 'energy']
          .filter((field) => building.expected_stats[field])
          .map((field) => {
            const actual = building.actual_stats[field];
            const marker = building.stat_issues.some((issue) => issue.field === field) ? '（不匹配）' : '';
            return `${field}=${building.expected_stats[field]} actual=${actual?.value || '(empty)'} source=${actual?.source || '(empty)'}${marker}`;
          })
          .join('、');
        lines.push(`- ${building.name} \`${building.building}\`：${fields}`);
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
