# 泽拉图 / `Zeratul` 科技链路排查 / Tech Tree Diagnostics

- 描述 / Description：奈拉齐姆的先知与萨尔纳加遗产的引路者，依靠神器碎片、传奇军团和古代造物压制战场。
- 数据来源 / Data source：当前 Mod / Current Mod，目录 / Directory：`合作指挥官版起义狂潮/Mods/XM/XMZeratul.SC2Mod`
- 当前 Mod 运行名册 / Current Mod roster：module=`XMZeratul.SC2Mod`，instance=`Zeratul`
- 统计 / Stats：建筑 4、生产链补充建筑 0、单位 8、英雄 1、建筑按钮 28、单位按钮 3、效果引用 1
- 名称显示 / Name display：能从当前 Mod zhCN 解析时显示“中文名 / `英文ID`”；仅显示 `ID` 表示当前 Mod 未找到可用中文名。

## 指挥官默认/顶部技能 / Commander Default / Top-panel Skills

| 技能名 / Skill Name | Ability/Cmd | 类型 / Type | 效果引用 / Effect References | Catalog 来源 / Catalog Sources |
| --- | --- | --- | --- | --- |
| 折跃(探机) / `ZeratulBuild` | `ZeratulBuild,1` | 未解析 / Unresolved | - | - |
| `NexusBuild` | `NexusBuild` | 建造技能 / CAbilBuild | - | xmzeratul:1 |

## 建筑 / Buildings

### `DarkShrine`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMZeratul.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Structure
- Catalog 技能链接 / Catalog ability links：`DarkShrineResearch`(研究技能 / CAbilResearch)、`que5`(队列技能 / CAbilQueue)
- 关联 Behavior / Linked behaviors：`ChronoBoostTarget`
- 已隐藏基础按钮 / Hidden basic buttons：1 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | `DarkShrineResearch` | `DarkShrineResearch,Research1` | 研究技能 / CAbilResearch | 升级 / Upgrade:`DarkTemplarResearchShadowFury` | - | - |
| 0,1 | `DarkShrineResearch` | `DarkShrineResearch,Research6` | 研究技能 / CAbilResearch | 升级 / Upgrade:`DarkTemplarResearchShadowDash` | - | - |
| 0,1 | `ResearchShadowDashLocked` | `-` | 未解析 / Unresolved | - | - | VorazunLevel06 |
| 0,2 | `DarkShrineResearch` | `DarkShrineResearch,Research2` | 研究技能 / CAbilResearch | 升级 / Upgrade:`DarkTemplarResearchVoidStasis` | - | - |
| 0,2 | `ResearchVoidStasisLocked` | `-` | 未解析 / Unresolved | - | - | VorazunLevel06 |
| 0,3 | `DarkShrineResearch` | `DarkShrineResearch,Research5` | 研究技能 / CAbilResearch | 升级 / Upgrade:`DarkArchonFullStartingEnergy` | - | - |
| 0,3 | `ResearchDarkArchonFullStartingEnergyLocked` | `-` | 未解析 / Unresolved | - | - | VorazunLevel09 |
| 0,4 | `DarkShrineResearch` | `DarkShrineResearch,Research4` | 研究技能 / CAbilResearch | 升级 / Upgrade:`DarkArchonMindControl` | - | - |
| 0,4 | `ResearchMindControlLocked` | `-` | 未解析 / Unresolved | - | - | VorazunLevel09 |
| 1,0 | `DarkTemplarPassive` | `-` | 未解析 / Unresolved | - | - | - |
| 1,1 | 黑暗执政官 / `CommanderVorazunDarkArchonPassiveLocked` | `-` | 未解析 / Unresolved | - | - | VorazunLevel05 |
| 1,1 | `DarkArchonPassive` | `-` | 未解析 / Unresolved | - | - | HaveVorazunCommander |
| 2,0 | `ZeratulDarkTemplarBlink` | `-` | 未解析 / Unresolved | - | - | HaveZeratulArtifactTier1AndDarkShine |
| 2,1 | `ResearchZeratulZealotBlinkHeal` | `-` | 未解析 / Unresolved | - | - | HaveZeratulArtifactTier2AndDarkShine |
| 2,2 | `ResearchZeratulDarkTemplarShadowFury` | `-` | 未解析 / Unresolved | - | - | HaveZeratulArtifactTier3AndDarkShine |

### `Gateway`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMZeratul.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`GatewayTrain`(训练技能 / CAbilTrain)、`que5notPassive`(队列技能 / CAbilQueue)、`Rally`(CAbilRally / CAbilRally)、`UpgradeToWarpGate`(变形技能 / CAbilMorph)
- 关联 Behavior / Linked behaviors：`ChronoBoostTarget`
- 可生产/创建 / Produced or created：`DarkArchon`（非本指挥官名册 / not in current commander roster），耗时 / Time 55s、`Monitor`（非本指挥官名册 / not in current commander roster），耗时 / Time 37s、保护者 / `SentryFenix`（非本指挥官名册 / not in current commander roster），耗时 / Time 37s、`Supplicant`（非本指挥官名册 / not in current commander roster），耗时 / Time 28s

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| - | `que5notPassive` | `que5notPassive,CancelLast` | 队列技能 / CAbilQueue | - | - | - |
| 0,0 | `GatewayTrain` | `GatewayTrain,Train11` | 训练技能 / CAbilTrain | `Supplicant`、单位 / Unit:`Supplicant` | - | - |
| 0,0 | `GatewayTrain` | `GatewayTrain,Train1` | 训练技能 / CAbilTrain | `ZealotAiur`、`ZealotShakuras` | - | - |
| 0,1 | `GatewayTrain` | `GatewayTrain,Train10` | 训练技能 / CAbilTrain | `Monitor`、单位 / Unit:`Monitor` | - | - |
| 0,1 | `GatewayTrain` | `GatewayTrain,Train6` | 训练技能 / CAbilTrain | `SentryAiur`、激励者 / `SentryPurifier` | - | - |
| 0,1 | `GatewayTrain` | `GatewayTrain,Train15` | 训练技能 / CAbilTrain | 保护者 / `SentryFenix`、单位 / Unit:保护者 / `SentryFenix` | - | - |
| 0,2 | `GatewayTrain` | `GatewayTrain,Train2` | 训练技能 / CAbilTrain | `StalkerShakuras`、龙骑士 / `Dragoon` | - | - |
| 1,0 | `WarpinAscendentLocked` | `-` | 未解析 / Unresolved | - | - | AlarakLevel08 |
| 1,2 | `GatewayTrain` | `GatewayTrain,Train9` | 训练技能 / CAbilTrain | `DarkArchon`、单位 / Unit:`DarkArchon` | - | - |
| 1,2 | `WarpInDarkArchonLocked` | `-` | 未解析 / Unresolved | - | - | VorazunLevel05 |
| 2,2 | `AlarakMasteryUnitAttackSpeed` | `-` | 未解析 / Unresolved | - | - | HaveMasteryAlarakUnitAttackSpeed |

### 光子炮台 / `PhotonCannon`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMZeratul.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`PhaseCannonProjection`、`stop`(基础 / Basic)
- 已隐藏基础按钮 / Hidden basic buttons：1 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | 强化瞄准 / `KaraxTurretRange` | `-` | 未解析 / Unresolved | - | - | HaveKaraxTurretRange |
| 2,1 | 军械优化 / `KaraxTurretAttackSpeed` | `-` | 未解析 / Unresolved | - | - | HaveKaraxTurretAttackSpeed |

### `ZeratulRoboticsFacility`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMZeratul.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：无 / None

- 面板技能 / Panel skills：无 / None

## 生产链补充建筑 / Production-support Buildings

- 无 / None

## 单位 / Units

### 萨尔纳加禁绝者 / `ZeratulDisruptor`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMZeratul.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：无 / None

- 面板技能 / Panel skills：无 / None

### 萨尔纳加执行者 / `ZeratulImmortal`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMZeratul.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：无 / None

- 面板技能 / Panel skills：无 / None

### 侦测器 / `Observer`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMZeratul.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`move`(基础 / Basic)、`ObserverMorphtoObserverSiege`、`stop`(基础 / Basic)、`Warpable`
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `HaveGraviticBoosters` | `-` | 未解析 / Unresolved | - | - | HaveGraviticBoosters |
| 2,2 | `ObserverMorphtoObserverSiege` | `ObserverMorphtoObserverSiege,Execute` | 未解析 / Unresolved | - | - | - |
| 2,4 | `Detector` | `-` | 未解析 / Unresolved | - | - | - |

### 萨尔纳加观察者 / `ZeratulObserver`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMZeratul.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：无 / None

- 面板技能 / Panel skills：无 / None

### 萨尔纳加光盾卫士 / `ZeratulSentry`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMZeratul.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：无 / None

- 面板技能 / Panel skills：无 / None

### 萨尔纳加伏击者 / `ZeratulStalker`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMZeratul.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：无 / None

- 面板技能 / Panel skills：无 / None

### 萨尔纳加虚空阵列船 / `ZeratulWarpPrism`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMZeratul.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：无 / None

- 面板技能 / Panel skills：无 / None

### `ZeratulSummonZealot`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMZeratul.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：无 / None

- 面板技能 / Panel skills：无 / None

## 英雄 / Heroes

### 泽拉图 / `MutatorAmonZeratul`

- 来源 / Source：名册 / Roster inferred current Mod hero catalog unit，状态 / Status catalog ObjectType:Hero，模块 / Module XMZeratul.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMZeratul.SC2Mod/Base.SC2Data/GameData/UnitData.xml`
- 数值 / Stats：类型 / Type Hero，种族 / Race Prot，生命 / Life 300，护盾 / Shields 100
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`move`(基础 / Basic)、虚空护甲 / `MutatorAmonPrologueVoidArmor`、暗影之刃 / `MutatorAmonShadowBlade`(目标效果技能 / CAbilEffectTarget)、闪现 / `MutatorAmonZeratulBlink`(目标效果技能 / CAbilEffectTarget)、`ProgressRally`(CAbilRally / CAbilRally)、`stop`(基础 / Basic)、`Warpable`
- 关联 Behavior / Linked behaviors：`Detector12`、`HeroDetectorRadar`、`VoidShade`
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | 闪现 / `MutatorAmonZeratulBlink` | `MutatorAmonZeratulBlink,Execute` | 目标效果技能 / CAbilEffectTarget | - | - | - |
| 2,1 | 虚空护甲 / `MutatorAmonPrologueVoidArmor` | `MutatorAmonPrologueVoidArmor,Execute` | 未解析 / Unresolved | - | - | - |
| 2,2 | 暗影之刃 / `MutatorAmonShadowBlade` | `MutatorAmonShadowBlade,Execute` | 目标效果技能 / CAbilEffectTarget | - | 伤害效果 / CEffectDamage:`MutatorAmonShadowBladeDamage` | - |
| 2,3 | 永久隐形 / `MutatorAmonZeratulPermanentlyCloaked` | `-` | 未解析 / Unresolved | - | - | - |
| 2,4 | `Detector` | `-` | 未解析 / Unresolved | - | - | - |
| 2,4 | `ProgressRally` | `ProgressRally,Rally1` | CAbilRally / CAbilRally | - | - | - |
