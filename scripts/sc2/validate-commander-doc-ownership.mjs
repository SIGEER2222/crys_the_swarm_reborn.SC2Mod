import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

const checks = [
  {
    commander: 'Abathur',
    docPaths: [
      'docs/newdocs/指挥官细化/01-阿巴瑟-Abathur.md',
      'docs/newdocs/指挥官细化/README.md',
    ],
    expectedJsonIds: [
      {
        label: 'buildings.json',
        path: '游戏数据/官方合作指挥官/commanders/Abathur/buildings.json',
        ids: ['SpineCrawler', 'SporeCrawler'],
      },
    ],
    forbiddenPositiveTokens: ['NydusNetwork', 'ZergBuild,Build10'],
  },
  {
    commander: 'Kerrigan',
    docPaths: ['docs/newdocs/指挥官细化/08-凯瑞甘-Kerrigan.md'],
    expectedJsonIds: [
      {
        label: 'buildings.json',
        path: '游戏数据/官方合作指挥官/commanders/Kerrigan/buildings.json',
        ids: ['NydusNetwork', 'SpineCrawler', 'SporeCrawler'],
      },
      {
        label: 'units.json',
        path: '游戏数据/官方合作指挥官/commanders/Kerrigan/units.json',
        ids: ['Broodlord', 'Hydralisk', 'MutaliskBroodlord', 'SwarmQueen', 'Ultralisk', 'Zergling'],
      },
    ],
    forbiddenPositiveTokens: ['ZagaraVoidCoopZerglingDodge', 'MorphZerglingToBaneling', 'MorphToBaneling,Execute'],
  },
  {
    commander: 'Zagara',
    docPaths: ['docs/newdocs/指挥官细化/17-扎加拉-Zagara.md'],
    expectedJsonIds: [
      {
        label: 'buildings.json',
        path: '游戏数据/官方合作指挥官/commanders/Zagara/buildings.json',
        ids: ['SpineCrawler', 'SporeCrawler'],
      },
      {
        label: 'units.json',
        path: '游戏数据/官方合作指挥官/commanders/Zagara/units.json',
        ids: ['Aberration', 'Baneling', 'Corruptor', 'Scourge', 'SwarmQueen', 'Zergling'],
      },
      {
        label: 'heroes.json',
        path: '游戏数据/官方合作指挥官/commanders/Zagara/heroes.json',
        ids: ['ZagaraVoidCoop'],
      },
    ],
    forbiddenPositiveTokens: ['NydusNetwork', 'ZergBuild,Build10'],
  },
  {
    commander: 'Stetmann',
    docPaths: ['docs/newdocs/指挥官细化/12-斯台特曼-Stetmann.md'],
    expectedJsonIds: [
      {
        label: 'buildings.json',
        path: '游戏数据/官方合作指挥官/commanders/Stetmann/buildings.json',
        ids: [
          'BanelingNestStetmann',
          'EvolutionChamberStetmann',
          'ExtractorStetmann',
          'GreaterSpireStetmann',
          'HatcheryStetmann',
          'HiveStetmann',
          'HydraliskDenStetmann',
          'InfestationPitStetmann',
          'LairStetmann',
          'LurkerDenStetmann',
          'PowerTowerStetmann',
          'SpawningPoolStetmann',
          'SpineCrawlerStetmann',
          'SpineCrawlerUprootedStetmann',
          'SpireStetmann',
          'SporeCrawlerStetmann',
          'SporeCrawlerUprootedStetmann',
          'UltraliskCavernStetmann',
        ],
      },
      {
        label: 'units.json',
        path: '游戏数据/官方合作指挥官/commanders/Stetmann/units.json',
        ids: [
          'BanelingStetmann',
          'BroodLordStetmann',
          'CorruptorStetmann',
          'DroneStetmann',
          'GaryStetmann',
          'HydraliskStetmann',
          'InfestorStetmann',
          'LurkerStetmann',
          'LurkerStetmannBurrowed',
          'OverseerStetmann',
          'OverseerStetmannSiegeMode',
          'RavagerStetmann',
          'RoachStetmann',
          'SuperGaryStetmann',
          'UltraliskStetmann',
          'ZerglingStetmann',
        ],
      },
    ],
    forbiddenPositiveTokens: ['NydusNetwork', 'ZergBuild,Build10', 'MorphZerglingToBaneling', 'MorphToBaneling,Execute'],
  },
  {
    commander: 'Stukov',
    docPaths: ['docs/newdocs/指挥官细化/13-斯托科夫-Stukov.md'],
    expectedJsonIds: [
      {
        label: 'buildings.json',
        path: '游戏数据/官方合作指挥官/commanders/Stukov/buildings.json',
        ids: [
          'StukovEvolutionChamber',
          'StukovInfestedArmory',
          'StukovInfestedBarracks',
          'StukovInfestedCivilianStructure',
          'StukovInfestedCommandCenter',
          'StukovInfestedFactory',
          'StukovInfestedRefinery',
          'StukovInfestedStarport',
          'StukovInfestedSupplyDepot',
        ],
      },
      {
        label: 'units.json',
        path: '游戏数据/官方合作指挥官/commanders/Stukov/units.json',
        ids: [
          'SIOverlord',
          'SILiberator',
          'StukovInfestedBanshee',
          'StukovInfestedCivilian',
          'StukovInfestedMarine',
          'StukovInfestedSiegeTank',
        ],
      },
      {
        label: 'roster.json',
        path: '游戏数据/官方合作指挥官/commanders/Stukov/roster.json',
        ids: [
          'SIDiamondBack',
          'SILiberator',
          'SIOverlord',
          'StukovEvolutionChamber',
          'StukovInfestedArmory',
          'StukovInfestedBanshee',
          'StukovInfestedBarracks',
          'StukovInfestedCivilian',
          'StukovInfestedCivilianStructure',
          'StukovInfestedCommandCenter',
          'StukovInfestedFactory',
          'StukovInfestedMarine',
          'StukovInfestedRefinery',
          'StukovInfestedSiegeTank',
          'StukovInfestedStarport',
          'StukovInfestedSupplyDepot',
        ],
      },
      {
        label: 'other-tech-entries.json',
        path: '游戏数据/官方合作指挥官/commanders/Stukov/other-tech-entries.json',
        ids: ['SIDiamondBack'],
      },
    ],
    forbiddenPositiveTokens: [
      'BurrowUltraliskDown',
      'BurrowUltraliskUp',
      'MorphToBaneling,Execute',
      'MorphZerglingToBaneling',
      'QueenCoop',
      'StukovInfestedWraith',
      'SwarmQueen',
      'WraithCloak',
      'ZagaraVoidCoopZerglingDodge',
      'Zergling',
    ],
  },
  {
    commander: 'Dehaka',
    docPaths: ['docs/newdocs/指挥官细化/04-德哈卡-Dehaka.md'],
    expectedJsonIds: [
      {
        label: 'buildings.json',
        path: '游戏数据/官方合作指挥官/commanders/Dehaka/buildings.json',
        ids: [
          'DehakaAirTownHall',
          'DehakaBarracks',
          'DehakaDakrunStructure',
          'DehakaGlevigStructure',
          'DehakaHatchery',
          'DehakaMurvarStructure',
          'DehakaNydusDestroyer',
        ],
      },
    ],
    forbiddenPositiveTokens: ['NydusNetwork', 'ZergBuild,Build10'],
  },
  {
    commander: 'Alarak',
    docPaths: ['docs/newdocs/指挥官细化/02-阿拉纳克-Alarak.md'],
    tokenScanScope: 'strictCatalogSections',
    expectedJsonIds: [
      {
        label: 'buildings.json',
        path: '游戏数据/官方合作指挥官/commanders/Alarak/buildings.json',
        ids: ['Gateway', 'PhotonCannon', 'TwilightCouncil'],
      },
      {
        label: 'units.json',
        path: '游戏数据/官方合作指挥官/commanders/Alarak/units.json',
        ids: [
          'ColossusTaldarim',
          'HighTemplarTaldarim',
          'ImmortalTaldarim',
          'SentryTaldarim',
          'Stalker',
          'Supplicant',
          'WarpPrismTaldarim',
        ],
      },
    ],
    forbiddenPositiveTokens: ['Artanis', 'AutomatedAssimilatorZeratul', 'Fenix', 'Karax', 'NexusBuild,Build1', 'Vorazun', 'Zeratul'],
  },
  {
    commander: 'Artanis',
    docPaths: ['docs/newdocs/指挥官细化/03-阿塔尼斯-Artanis.md'],
    tokenScanScope: 'strictCatalogSections',
    expectedJsonIds: [
      {
        label: 'buildings.json',
        path: '游戏数据/官方合作指挥官/commanders/Artanis/buildings.json',
        ids: ['Gateway', 'PhotonCannon', 'RoboticsBay', 'RoboticsWarpandStarWarpGate', 'TwilightCouncil'],
      },
      {
        label: 'units.json',
        path: '游戏数据/官方合作指挥官/commanders/Artanis/units.json',
        ids: ['Archon', 'HighTemplar', 'ImmortalAiur', 'Observer', 'PhoenixAiur', 'StalkerAiur', 'Zealot'],
      },
    ],
    forbiddenPositiveTokens: ['Alarak', 'AutomatedAssimilatorZeratul', 'Fenix', 'Karax', 'NexusBuild,Build1', 'Vorazun', 'Zeratul'],
  },
  {
    commander: 'Fenix',
    docPaths: ['docs/newdocs/指挥官细化/05-菲尼克斯-Fenix.md'],
    tokenScanScope: 'strictCatalogSections',
    expectedJsonIds: [
      {
        label: 'buildings.json',
        path: '游戏数据/官方合作指挥官/commanders/Fenix/buildings.json',
        ids: ['Gateway', 'PhotonCannon', 'RoboticsBay', 'TwilightCouncil'],
      },
      {
        label: 'units.json',
        path: '游戏数据/官方合作指挥官/commanders/Fenix/units.json',
        ids: ['Adept', 'Carrier', 'ColossusPurifier', 'Immortal', 'Observer', 'Scout', 'SentryFenix', 'ZealotPurifier'],
      },
    ],
    forbiddenPositiveTokens: ['Alarak', 'Artanis', 'AutomatedAssimilatorZeratul', 'Karax', 'NexusBuild,Build1', 'Vorazun', 'Zeratul'],
  },
  {
    commander: 'Karax',
    docPaths: ['docs/newdocs/指挥官细化/07-凯拉克斯-Karax.md'],
    tokenScanScope: 'strictCatalogSections',
    expectedJsonIds: [
      {
        label: 'buildings.json',
        path: '游戏数据/官方合作指挥官/commanders/Karax/buildings.json',
        ids: ['Gateway', 'PhotonCannon', 'ShieldBattery', 'SolarForge', 'TwilightCouncil'],
      },
      {
        label: 'units.json',
        path: '游戏数据/官方合作指挥官/commanders/Karax/units.json',
        ids: ['Carrier', 'Colossus', 'ImmortalAiur', 'Observer', 'PhoenixPurifier', 'Scout', 'SentryPurifier', 'ZealotPurifier'],
      },
    ],
    forbiddenPositiveTokens: ['Alarak', 'Artanis', 'AutomatedAssimilatorZeratul', 'Fenix', 'NexusBuild,Build1', 'Vorazun', 'Zeratul'],
  },
  {
    commander: 'Vorazun',
    docPaths: ['docs/newdocs/指挥官细化/16-沃拉尊-Vorazun.md'],
    tokenScanScope: 'strictCatalogSections',
    expectedJsonIds: [
      {
        label: 'buildings.json',
        path: '游戏数据/官方合作指挥官/commanders/Vorazun/buildings.json',
        ids: ['Gateway', 'PhotonCannon', 'TwilightCouncil'],
      },
      {
        label: 'units.json',
        path: '游戏数据/官方合作指挥官/commanders/Vorazun/units.json',
        ids: ['DarkTemplarShakuras', 'Oracle', 'PhoenixShakuras', 'Stalker', 'VoidRay', 'Zealot', 'ZealotShakuras'],
      },
    ],
    forbiddenPositiveTokens: ['Alarak', 'Artanis', 'AutomatedAssimilatorZeratul', 'Fenix', 'Karax', 'NexusBuild,Build1', 'Zeratul'],
  },
  {
    commander: 'Zeratul',
    docPaths: ['docs/newdocs/指挥官细化/18-泽拉图-Zeratul.md'],
    tokenScanScope: 'strictCatalogSections',
    expectedJsonIds: [
      {
        label: 'buildings.json',
        path: '游戏数据/官方合作指挥官/commanders/Zeratul/buildings.json',
        ids: ['DarkShrine', 'Gateway', 'PhotonCannon', 'RoboticsWarp'],
      },
      {
        label: 'units.json',
        path: '游戏数据/官方合作指挥官/commanders/Zeratul/units.json',
        ids: [
          'DisruptorZeratul',
          'ImmortalZeratul',
          'Observer',
          'ObserverZeratul',
          'SentryZeratul',
          'StalkerZeratul',
          'WarpPrismZeratul',
          'ZealotZeratul',
        ],
      },
    ],
    forbiddenPositiveTokens: ['Alarak', 'Artanis', 'Fenix', 'Karax', 'NexusBuild,Build1', 'Vorazun'],
  },
];

const allowedNegativeContext =
  /(不计入|排除|共享|污染|过滤|误当成|拦截|不能|不应|不算|禁用|不要|不使用|不用|不把|不在|不适用|替代|历史|旧表|待补|待审计|非当前官方|not\s+count|not\s+in\s+current\s+commander\s+roster)/i;

const terranSinglePageGuardCommanders = ['Raynor', 'Swann', 'Horner', 'Nova', 'Mengsk', 'Tychus'];

const errors = [];

for (const check of checks) {
  validateCommanderOwnershipGuard(check);
}

validateGeneratedProtossClosure();
validateGeneratedTerranClosure();
validateTerranSinglePagePollutionContext();

if (errors.length) {
  console.error('指挥官文档归属校验失败：');
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(
  `指挥官文档归属校验通过：${checks.map((check) => check.commander).join(', ')}；生成闭包校验通过：Protoss, Terran；人族单页补充防线校验通过：${terranSinglePageGuardCommanders.join(', ')}`,
);

function validateCommanderOwnershipGuard(check) {
  for (const expectedJsonIdSet of check.expectedJsonIds || []) {
    assertJsonIdsMatch({ check, expectedJsonIdSet });
  }

  for (const docPath of check.docPaths) {
    const lines = readText(path.join(repoRoot, docPath)).split(/\r?\n/);
    const scanLines =
      check.tokenScanScope === 'strictCatalogSections' ? getStrictCatalogSectionLines(lines) : withLineNumbers(lines);

    for (const token of check.forbiddenPositiveTokens || []) {
      assertOnlyNegativeContext({ check, docPath, scanLines, token });
    }
  }
}

function assertJsonIdsMatch({ check, expectedJsonIdSet }) {
  const officialPath = path.join(repoRoot, expectedJsonIdSet.path);
  const officialEntries = readJson(officialPath);
  const actualIds = officialEntries.map((entry) => entry.id || entry.unit_id).filter(Boolean).sort(naturalSort);
  const expectedIds = [...expectedJsonIdSet.ids].sort(naturalSort);

  if (actualIds.join('|') !== expectedIds.join('|')) {
    errors.push(
      `${check.commander}: 官方 ${expectedJsonIdSet.label} 已变化，期望 ${expectedIds.join(', ')}，实际 ${actualIds.join(', ')}；请重新核对文档口径。`,
    );
  }
}

function assertOnlyNegativeContext({ check, docPath, scanLines, token }) {
  for (const { line, lineNumber } of scanLines) {
    if (!line.includes(token)) {
      continue;
    }
    if (!allowedNegativeContext.test(line)) {
      errors.push(
        `${check.commander}: ${docPath}:${lineNumber} 出现 ${token}，但没有标记为排除/共享污染/不计入上下文。`,
      );
    }
  }
}

function validateGeneratedProtossClosure() {
  const closurePath = path.join(repoRoot, 'docs/newdocs/指挥官细化/神族闭包/protoss-commander-closure.json');
  if (!fs.existsSync(closurePath)) {
    errors.push('神族闭包 JSON 不存在；请先运行 node scripts/sc2/export-protoss-commander-closure.mjs。');
    return;
  }

  const closure = readJson(closurePath);
  const expectedCommanders = ['Alarak', 'Artanis', 'Fenix', 'Karax', 'Vorazun', 'Zeratul'];
  const actualCommanders = (closure.commanders || []).map((commander) => commander.commander).sort(naturalSort);

  if (actualCommanders.join('|') !== expectedCommanders.sort(naturalSort).join('|')) {
    errors.push(`神族闭包 JSON 指挥官集合异常，实际 ${actualCommanders.join(', ')}。`);
    return;
  }

  for (const commander of closure.commanders) {
    assertProtossWorkerBuildablesAreBuildings(commander);
  }

  assertZeratulDisruptorSkillClosure(closure);
}

function validateGeneratedTerranClosure() {
  const closurePath = path.join(repoRoot, 'docs/newdocs/指挥官细化/人族闭包/terran-commander-closure.json');
  if (!fs.existsSync(closurePath)) {
    errors.push('人族闭包 JSON 不存在；请先运行 node scripts/sc2/export-terran-commander-closure.mjs。');
    return;
  }

  const closure = readJson(closurePath);
  const expectedCommanders = ['Raynor', 'Swann', 'Horner', 'Nova', 'Mengsk', 'Tychus'];
  const actualCommanders = (closure.commanders || []).map((commander) => commander.commander).sort(naturalSort);

  if (actualCommanders.join('|') !== expectedCommanders.sort(naturalSort).join('|')) {
    errors.push(`人族闭包 JSON 指挥官集合异常，实际 ${actualCommanders.join(', ')}。`);
    return;
  }

  for (const commander of closure.commanders) {
    assertTerranAcceptedClosureDoesNotCrossOwners(commander);
  }

  assertHornerHasNoBuildingList(closure);
  assertTerranWorkerBuildCommandClosure(closure);
  assertRaynorOrbitalCommandMorph(closure);
  assertNovaAutoTurretClosure(closure);
  assertMengskTrooperBuildClosure(closure);
}

function validateTerranSinglePagePollutionContext() {
  const terranGuards = [
    {
      commander: 'Raynor',
      docPath: 'docs/newdocs/指挥官细化/11-雷诺-Raynor.md',
      tokens: [
        'BarracksTrainNova',
        'MasteryNovaArmy',
        'MengskUnits',
        'CommanderSwannImmortalityProtocol',
        'HaveSwannTurretIncreasedAttackSpeed',
        'BuildKelMorianRocketTurret',
        'GhostAcademyNova',
        'TerranBuildFullRefund',
      ],
    },
    {
      commander: 'Swann',
      docPath: 'docs/newdocs/指挥官细化/14-斯旺-Swann.md',
      tokens: [
        'GhostAcademyNova',
        'TerranBuildFullRefund',
        'BuildLaserTurret',
        'BuildFusionCoreLocked',
        'RaynorLevel06',
        'MasteryNovaArmy',
      ],
    },
    {
      commander: 'Horner',
      docPath: 'docs/newdocs/指挥官细化/06-霍纳与汉-Horner.md',
      tokens: ['StarportTrainNova', 'VehicleAfterburners'],
      requiredTokens: ['StarportTrainNova', 'VehicleAfterburners'],
    },
    {
      commander: 'Nova',
      docPath: 'docs/newdocs/指挥官细化/10-诺娃-Nova.md',
      tokens: ['SwannBarracks', 'AdvancedConstructionLocked', 'BuildFusionCoreLocked', 'BuildKelMorianRocketTurret'],
    },
    {
      commander: 'Mengsk',
      docPath: 'docs/newdocs/指挥官细化/09-蒙斯克-Mengsk.md',
      tokens: ['other_commander_token:Nova', 'requirement_reference_belongs_to_other_commander:Nova'],
      requiredTokens: ['other_commander_token:Nova', 'requirement_reference_belongs_to_other_commander:Nova'],
    },
    {
      commander: 'Tychus',
      docPath: 'docs/newdocs/指挥官细化/15-泰凯斯-Tychus.md',
      tokens: ['BarracksTrainNova', 'other_commander_token:Nova'],
      requiredTokens: ['BarracksTrainNova', 'other_commander_token:Nova'],
    },
  ];

  const actualGuardCommanders = terranGuards.map((guard) => guard.commander).sort(naturalSort);
  const expectedGuardCommanders = [...terranSinglePageGuardCommanders].sort(naturalSort);
  if (actualGuardCommanders.join('|') !== expectedGuardCommanders.join('|')) {
    errors.push(
      `人族单页防线覆盖异常，期望 ${expectedGuardCommanders.join(', ')}，实际 ${actualGuardCommanders.join(', ')}。`,
    );
  }

  for (const guard of terranGuards) {
    const lines = withLineNumbers(readText(path.join(repoRoot, guard.docPath)).split(/\r?\n/));
    for (const token of guard.requiredTokens || []) {
      assertDocumentContainsToken({ check: guard, docPath: guard.docPath, lines, token });
    }
    for (const token of guard.tokens) {
      assertOnlyNegativeContext({ check: guard, docPath: guard.docPath, scanLines: lines, token });
    }
  }
}

function assertDocumentContainsToken({ check, docPath, lines, token }) {
  if (lines.some(({ line }) => line.includes(token))) {
    return;
  }

  errors.push(`${check.commander}: ${docPath} 缺少人族单页防线 token ${token}；请补充排除/共享污染/归属过滤说明。`);
}

function assertTerranAcceptedClosureDoesNotCrossOwners(commander) {
  for (const item of getAcceptedTerranClosureItems(commander)) {
    const text = removeNeutralTerranOwnerTokens(JSON.stringify(item));
    const ownerHits = findTerranOtherOwnerHits(text, commander.commander);
    if (ownerHits.length) {
      errors.push(
        `${commander.commander}: 人族闭包 accepted 链路疑似混入其它指挥官 owner：${ownerHits
          .map((hit) => `${hit.owner}:${hit.label}`)
          .join(', ')}；item=${summarizeClosureItem(item)}`,
      );
    }
  }
}

function getAcceptedTerranClosureItems(commander) {
  return [
    ...(commander.top_bar_ability_commands || []).filter((item) => item.status === 'accepted'),
    ...(commander.progression_ability_commands || []).filter((item) => item.status === 'accepted'),
    ...(commander.worker_buildable_structures || []),
    ...(commander.worker_build_commands || []),
    ...(commander.units || []).flatMap((entry) => [
      ...(entry.production_options?.accepted || []),
      ...(entry.abilities?.accepted || []),
    ]),
    ...(commander.buildings || []).flatMap((entry) => [
      ...(entry.production_options?.accepted || []),
      ...(entry.abilities?.accepted || []),
    ]),
  ];
}

function findTerranOtherOwnerHits(text, currentCommander) {
  const rules = [
    { owner: 'Raynor', label: 'Raynor', pattern: /Raynor/ },
    { owner: 'Swann', label: 'Swann', pattern: /Swann|KelMorian|DrakkenLaser/ },
    { owner: 'Horner', label: 'Horner', pattern: /Horner|(?:^|[^A-Za-z0-9])HH[A-Za-z0-9_]*/ },
    { owner: 'Nova', label: 'Nova', pattern: /Nova|BlackOps/ },
    { owner: 'Mengsk', label: 'Mengsk', pattern: /Mengsk/ },
    { owner: 'Tychus', label: 'Tychus', pattern: /Tychus/ },
    { owner: 'Stukov', label: 'Stukov', pattern: /Stukov|(?:^|[^A-Za-z0-9])SI[A-Z][A-Za-z0-9_]*/ },
  ];

  return rules
    .filter((rule) => rule.owner !== currentCommander && rule.pattern.test(text))
    .map((rule) => ({ owner: rule.owner, label: rule.label }));
}

function removeNeutralTerranOwnerTokens(text) {
  return [
    'NotHaveAutoTurret_BlackOpsTimedLife',
    'CountBehaviorAutoTurret_BlackOpsTimedLifeCompleteOnlyAtUnit',
    'NotCountBehaviorAutoTurret_BlackOpsTimedLifeCompleteOnlyAtUnit',
    'CommanderPrestigeRaynorAirCompleteOnly',
    'CountUpgradeCommanderPrestigeRaynorAirCompleteOnly',
  ].reduce((result, token) => result.replaceAll(token, ''), text);
}

function assertHornerHasNoBuildingList(closure) {
  const horner = closure.commanders.find((commander) => commander.commander === 'Horner');
  if ((horner?.buildings || []).length !== 0 || (horner?.worker_buildable_structures || []).length !== 0) {
    errors.push('Horner: 官方 buildings.json 为空，闭包不应生成建筑清单或农民建造项。');
  }
}

function assertTerranWorkerBuildCommandClosure(closure) {
  const requiredTargets = {
    Raynor: ['CommandCenter', 'SupplyDepot', 'Barracks', 'EngineeringBay', 'Bunker', 'MissileTurret', 'Factory', 'Armory', 'Starport', 'FusionCore'],
    Swann: ['CommandCenter', 'SupplyDepot', 'EngineeringBay', 'MissileTurret', 'Factory', 'Armory', 'Starport', 'FusionCore', 'KelMorianGrenadeTurret'],
    Nova: ['CommandCenter', 'SupplyDepot', 'Barracks', 'EngineeringBay', 'MissileTurret', 'Factory', 'Armory', 'Starport', 'FusionCore', 'GhostAcademyNova', 'AutoTurret'],
    Tychus: ['TychusCommandCenter', 'TychusEngineeringBay', 'TychusSCVAutoTurret', 'TychusMercCompound', 'TychusArmory', 'TychusGhostAcademy'],
  };

  for (const [commanderId, targets] of Object.entries(requiredTargets)) {
    const commander = closure.commanders.find((entry) => entry.commander === commanderId);
    const actualTargets = new Set(
      (commander?.worker_build_commands || []).flatMap((command) =>
        [command.target_canonical_id, command.target_unit_id].filter(Boolean),
      ),
    );
    for (const target of targets) {
      if (!actualTargets.has(target)) {
        errors.push(`${commanderId}: 劳工建造命令闭包缺少 ${target}。`);
      }
    }
  }

  const horner = closure.commanders.find((entry) => entry.commander === 'Horner');
  if ((horner?.worker_build_commands || []).length !== 0) {
    errors.push('Horner: 当前官方 Horner units/buildings JSON 没有劳工建造命令，worker_build_commands 应保持为空。');
  }

  assertWorkerBuildTargetsAbsent(closure, 'Raynor', ['AutoTurret', 'GhostAcademyNova', 'KelMorianGrenadeTurret']);
  assertWorkerBuildTargetsAbsent(closure, 'Swann', ['AutoTurret', 'GhostAcademyNova']);
  assertWorkerBuildTargetsAbsent(closure, 'Nova', ['KelMorianGrenadeTurret']);
}

function assertWorkerBuildTargetsAbsent(closure, commanderId, forbiddenTargets) {
  const commander = closure.commanders.find((entry) => entry.commander === commanderId);
  const actualTargets = new Set(
    (commander?.worker_build_commands || []).flatMap((command) =>
      [command.target_canonical_id, command.target_unit_id].filter(Boolean),
    ),
  );
  for (const target of forbiddenTargets) {
    if (actualTargets.has(target)) {
      errors.push(`${commanderId}: 劳工建造命令闭包误收 ${target}。`);
    }
  }
}

function assertRaynorOrbitalCommandMorph(closure) {
  const raynor = closure.commanders.find((commander) => commander.commander === 'Raynor');
  const orbital = raynor?.buildings?.find((building) => building.id === 'OrbitalCommand');
  const hasCommandCenterMorph = (orbital?.production_options?.accepted || []).some(
    (option) =>
      option.producer_unit_id === 'CommandCenter' &&
      option.unit === 'OrbitalCommand' &&
      option.stage === 'self_morph_or_build' &&
      /^UpgradeToOrbital/.test(option.ability_id || ''),
  );

  if (!hasCommandCenterMorph) {
    errors.push('Raynor: OrbitalCommand 缺少 CommandCenter -> UpgradeToOrbital -> OrbitalCommand 变形闭包。');
  }
}

function assertNovaAutoTurretClosure(closure) {
  const nova = closure.commanders.find((commander) => commander.commander === 'Nova');
  const turret = nova?.buildings?.find((building) => building.id === 'AutoTurret');
  const hasRavenTurret = (turret?.production_options?.accepted || []).some(
    (option) =>
      option.producer_unit_id === 'Raven_BlackOps' &&
      option.ability_id === 'BuildAutoTurret_BlackOps' &&
      option.unit === 'AutoTurret',
  );

  if (!hasRavenTurret) {
    errors.push('Nova: AutoTurret 缺少 Raven_BlackOps -> BuildAutoTurret_BlackOps -> AutoTurret 技能产物闭包。');
  }
}

function assertMengskTrooperBuildClosure(closure) {
  const mengsk = closure.commanders.find((commander) => commander.commander === 'Mengsk');
  const trooperIds = ['TrooperMengsk', 'TrooperMengskAA', 'TrooperMengskFlamethrower', 'TrooperMengskImproved'];
  const requiredAbilityCommands = [
    'TrooperMengskEnlist,Execute',
    'TrooperMengskSpecializeImproved,Execute',
    'TrooperMengskSpecializeFlamethrower,Execute',
    'TrooperMengskSpecializeAA,Execute',
    'TrooperMengskBuild,Build3',
    'TrooperMengskBuild,Build6',
    'TrooperMengskBuild,Build7',
  ];

  for (const unitId of trooperIds) {
    const unit = mengsk?.units?.find((entry) => entry.id === unitId);
    const acceptedCommands = new Set((unit?.abilities?.accepted || []).map((ability) => `${ability.ability_id},${ability.command_index}`));
    for (const requiredCommand of requiredAbilityCommands) {
      if (!acceptedCommands.has(requiredCommand)) {
        errors.push(`${unitId}: 缺少 ${requiredCommand} 冲锋队转职/建造闭包。`);
      }
    }
  }

  const workerTargets = new Set(
    (mengsk?.worker_buildable_structures || []).map(
      (entry) => `${entry.building_id}:${entry.producer_unit_id}:${entry.ability_id},${entry.command_index}`,
    ),
  );
  for (const target of ['BunkerDepotMengsk', 'ArtilleryMengsk', 'MissileTurretMengsk']) {
    for (const producer of [...trooperIds, 'SCVMengsk']) {
      if (![...workerTargets].some((value) => value.startsWith(`${target}:${producer}:TrooperMengskBuild,`))) {
        errors.push(`Mengsk: ${producer} 缺少 ${target} 的 TrooperMengskBuild 建造闭包。`);
      }
    }
  }
}

function summarizeClosureItem(item) {
  return JSON.stringify({
    source: item.source,
    owner: item.owner,
    ability_id: item.ability_id,
    command_index: item.command_index,
    producer_unit_id: item.producer_unit_id,
    unit: item.unit,
    face: item.face,
    requirements: item.requirements,
  });
}

function assertProtossWorkerBuildablesAreBuildings(commander) {
  const forbiddenWorkerTargets = ['Zealot', 'Supplicant', 'AlarakSupplicantWarpTrainDummy'];
  for (const workerBuildable of commander.worker_buildable_structures || []) {
    if (forbiddenWorkerTargets.includes(workerBuildable.unit)) {
      errors.push(
        `${commander.commander}: 神族闭包 worker_buildable_structures 误收 ${workerBuildable.unit}；共享训练项不能算农民建造建筑。`,
      );
    }
    if (commander.commander !== 'Zeratul' && /AutomatedAssimilatorZeratul|NexusBuild,Build1/.test(JSON.stringify(workerBuildable))) {
      errors.push(`${commander.commander}: 非泽拉图神族闭包误收泽拉图自动吸纳舱经济链。`);
    }
  }
}

function assertZeratulDisruptorSkillClosure(closure) {
  const zeratul = closure.commanders.find((commander) => commander.commander === 'Zeratul');
  const disruptor = zeratul?.units?.find((unit) => unit.id === 'DisruptorZeratul');
  const acceptedAbilities = disruptor?.abilities?.accepted || [];
  const hasPurificationNovaDamage = acceptedAbilities.some((ability) =>
    (ability.raw?.effect_closure || []).some((effect) => effect.id === 'ZeratulPurificationNovaDamage'),
  );
  const hasTargetedNovaChain = acceptedAbilities.some((ability) =>
    (ability.raw?.effect_closure || []).some((effect) => effect.id === 'ZeratulPurificationNovaTargettedInitialSet'),
  );

  if (!hasPurificationNovaDamage || !hasTargetedNovaChain) {
    errors.push('Zeratul: DisruptorZeratul 净化新星闭包缺少 ZeratulPurificationNovaDamage 或 TargettedInitialSet。');
  }
}

function getStrictCatalogSectionLines(lines) {
  const selected = [];
  let inStrictSection = false;

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (/^### 当前 (units|buildings|heroes)\.json/.test(line)) {
      inStrictSection = true;
      continue;
    }

    if (inStrictSection && /^#{2,3}\s/.test(line)) {
      inStrictSection = false;
    }

    if (inStrictSection) {
      selected.push({ line, lineNumber: index + 1 });
    }
  }

  return selected;
}

function withLineNumbers(lines) {
  return lines.map((line, index) => ({ line, lineNumber: index + 1 }));
}

function readText(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function readJson(filePath) {
  return JSON.parse(readText(filePath));
}

function naturalSort(a, b) {
  return String(a).localeCompare(String(b), 'en', { numeric: true });
}
