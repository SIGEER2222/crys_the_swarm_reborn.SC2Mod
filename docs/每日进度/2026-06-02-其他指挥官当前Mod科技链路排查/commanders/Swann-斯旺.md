# 斯旺 / `Swann` 科技链路排查 / Tech Tree Diagnostics

- 描述 / Description：无 / None
- 数据来源 / Data source：当前 Mod / Current Mod，目录 / Directory：`合作指挥官版起义狂潮/Mods/XM/XMSwann.SC2Mod`
- 当前 Mod 运行名册 / Current Mod roster：module=`XMSwann.SC2Mod`，instance=`Swann`
- 统计 / Stats：建筑 15、生产链补充建筑 0、单位 15、英雄 0、建筑按钮 76、单位按钮 74、效果引用 19
- 名称显示 / Name display：能从当前 Mod zhCN 解析时显示“中文名 / `英文ID`”；仅显示 `ID` 表示当前 Mod 未找到可用中文名。

## 指挥官默认/顶部技能 / Commander Default / Top-panel Skills

| 技能名 / Skill Name | Ability/Cmd | 类型 / Type | 效果引用 / Effect References | Catalog 来源 / Catalog Sources |
| --- | --- | --- | --- | --- |
| `DrakkenLaserDrillAttackIssueOrder` | `DrakkenLaserDrillAttackIssueOrder,Execute` | 未解析 / Unresolved | - | - |
| `CommanderPrestigeSwannConcentratedBeamLocked` | `-` | 未解析 / Unresolved | - | - |
| `DrakkenLaserDrillConcentratedBeamIssueOrder` | `DrakkenLaserDrillConcentratedBeamIssueOrder,Execute` | 瞬发效果技能 / CAbilEffectInstant | - | xmartanis:1、xmfenix:1、xmkarax:1、xmkerrigan:1、另 4 个 |
| `CommanderPrestigeSwannPulseCannonLocked` | `-` | 未解析 / Unresolved | - | - |
| `DrakkenLaserDrillPulseCannonIssueOrder` | `DrakkenLaserDrillPulseCannonIssueOrder,Execute` | 瞬发效果技能 / CAbilEffectInstant | - | xmartanis:1、xmfenix:1、xmkarax:1、xmkerrigan:1、另 4 个 |
| `PulseCannonLocked` | `-` | 未解析 / Unresolved | - | - |
| `CombatDropLocked` | `-` | 未解析 / Unresolved | - | - |
| `SpecialDelivery` | `SpecialDelivery,Execute` | 未解析 / Unresolved | - | - |

## 建筑 / Buildings

### `SupplyDepot`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster，状态 / Status exact，模块 / Module XMSwann.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`BuildInProgress`(基础 / Basic)、`SupplyDepotLower`

- 面板技能 / Panel skills：无 / None

### 德拉肯激光钻机 / `DrakkenLaserDrillCoop`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMSwann.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Structure，种族 / Race Terr，生命 / Life 3000
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`BrokenDrakkenLaserDrill`(变形技能 / CAbilMorph)、`BuildInProgress`(基础 / Basic)、`DrakkenLaserDrillBFG`(目标效果技能 / CAbilEffectTarget)、`DrakkenLaserDrillNuke`(目标效果技能 / CAbilEffectTarget)、`DrakkenLaserDrillResearch`(研究技能 / CAbilResearch)、`Queue1Passive`(队列技能 / CAbilQueue)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`ChronoBoostTarget`、`DrakkenLaserDrillDisableAttackInitial`、`DrakkenLaserDrillPreventDestroy`、`FireSuppressionSystem`、`TerranBuildingBurnDown`
- 已隐藏基础按钮 / Hidden basic buttons：3 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,4 | `BrokenDrakkenLaserDrill` | `BrokenDrakkenLaserDrill,Execute` | 变形技能 / CAbilMorph | - | - | - |
| 0,4 | `DrakkenLaserDrillBFG` | `DrakkenLaserDrillBFG,Execute` | 目标效果技能 / CAbilEffectTarget | - | 持续效果 / CEffectCreatePersistent:`DrakkenLaserDrillBFGDelayCP` | - |
| 0,4 | `DrakkenLaserDrillNuke` | `DrakkenLaserDrillNuke,Execute` | 目标效果技能 / CAbilEffectTarget | - | 效果集合 / CEffectSet:`DrakkenLaserDrillNukeInitialSet`、区域枚举效果 / CEffectEnumArea:`DrakkenLaserDrillNukeSearch` | - |
| 2,0 | `DrakkenLaserDrillResearch` | `DrakkenLaserDrillResearch,Research1` | 研究技能 / CAbilResearch | 升级 / Upgrade:`DrakkenLaserDrillBFG` | - | - |
| 2,0 | `DrakkenLaserDrillResearch` | `DrakkenLaserDrillResearch,Research2` | 研究技能 / CAbilResearch | 升级 / Upgrade:`DrakkenLaserDrillNuke` | - | - |

### `KelMorianGrenadeTurret`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster，状态 / Status exact，模块 / Module XMSwann.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Structure，种族 / Race Terr，生命 / Life 300，费用 / Cost 150/0
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`BuildInProgress`(基础 / Basic)、`SalvageShared`(行为/被动技能 / CAbilBehavior)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`FireSuppressionSystem`、`TerranBuildingBurnDown`、`UnderConstruction`
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | `KelMorianGrenadeTurretConcussiveGrenades` | `-` | 未解析 / Unresolved | - | - | HaveSwannKelMorianGrenadeTurretUpgrade |
| 2,0 | `SalvageShared` | `SalvageShared,On` | 行为/被动技能 / CAbilBehavior | - | - | - |
| 2,1 | `HaveHiSecAutoTracking` | `-` | 未解析 / Unresolved | - | - | HaveTerranDefenseRangeBonus |
| 2,2 | `HaveImprovedTurretAttackSpeed` | `-` | 未解析 / Unresolved | - | - | HaveSwannTurretIncreasedAttackSpeed |

### 导弹塔 / `MissileTurret`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster，状态 / Status exact，模块 / Module XMSwann.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`BuildInProgress`(基础 / Basic)、`SalvageShared`(行为/被动技能 / CAbilBehavior)、`stop`(基础 / Basic)

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | `HellstormMissileBatteries` | `-` | 未解析 / Unresolved | - | - | HailstormMissilePods |
| 2,0 | `SalvageShared` | `SalvageShared,On` | 行为/被动技能 / CAbilBehavior | - | - | - |
| 2,1 | `HaveHiSecAutoTracking` | `-` | 未解析 / Unresolved | - | - | HaveTerranDefenseRangeBonus |
| 2,2 | `HaveImprovedTurretAttackSpeed` | `-` | 未解析 / Unresolved | - | - | HaveSwannTurretIncreasedAttackSpeed |

### `PerditionTurret`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster，状态 / Status exact，模块 / Module XMSwann.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Structure
- Catalog 技能链接 / Catalog ability links：`SalvageShared`(行为/被动技能 / CAbilBehavior)、`stop`(基础 / Basic)
- 已隐藏基础按钮 / Hidden basic buttons：4 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 3 | `Detector` | `-` | 未解析 / Unresolved | - | - | - |
| 2,0 | `SalvageShared` | `SalvageShared,On` | 行为/被动技能 / CAbilBehavior | - | - | - |
| 2,1 | `HaveHiSecAutoTracking` | `-` | 未解析 / Unresolved | - | - | HaveTerranDefenseRangeBonus |
| 2,2 | `HaveImprovedTurretAttackSpeed` | `-` | 未解析 / Unresolved | - | - | HaveSwannTurretIncreasedAttackSpeed |

### `CommandCenter`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster，状态 / Status exact，模块 / Module XMSwann.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：提供补给 / Supply provided 15
- Catalog 技能链接 / Catalog ability links：`BuildInProgress`(基础 / Basic)、`CommandCenterTrain`(训练技能 / CAbilTrain)、`CommandCenterTransport`(运输技能 / CAbilTransport)、`RallyCommand`、`UpgradeToOrbital`(变形技能 / CAbilMorph)、`UpgradeToOrbitalCoop`、`UpgradeToPlanetaryFortress`、`VespeneDroneCast`
- 关联 Behavior / Linked behaviors：`ChronoBoostTarget`
- 已隐藏基础按钮 / Hidden basic buttons：1 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,1 | `BuildDroneOperatorLocked` | `-` | 未解析 / Unresolved | - | - | SwannLevel05 |
| 0,1 | `VespeneDroneCast` | `VespeneDroneCast,Execute` | 未解析 / Unresolved | - | - | - |
| 1,1 | `MasteryNovaArmyOOCRegenSpeedAppend` | `-` | 未解析 / Unresolved | - | - | HaveMasteryNovaArmyOOCRegenSpeed |
| 1,4 | `RallyCommand` | `RallyCommand,Rally2` | 未解析 / Unresolved | - | - | - |
| 2,2 | `NeoSteelFrameCommandCenter` | `-` | 未解析 / Unresolved | - | - | HaveNeosteelFrame |

### 指挥中心 / `CommandCenterSwann`

- 来源 / Source：名册 / Roster XMFinal CommanderBuildings.galaxy，官方ID / Official ID CommandCenter，状态 / Status alias，模块 / Module XMSwann.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146_CommanderBuildings.galaxy`
- 数值 / Stats：类型 / Type Structure，种族 / Race Terr，生命 / Life 1500，费用 / Cost 400/0，提供补给 / Supply provided 11
- Catalog 技能链接 / Catalog ability links：`BuildInProgressSwann`(CAbilBuildable / CAbilBuildable)、`CommandCenterLiftOffSwann`(变形技能 / CAbilMorph)、`CommandCenterTrainSwann`(训练技能 / CAbilTrain)、`CommandCenterTransport`(运输技能 / CAbilTransport)、`que5CancelToSelection`、`RallyCommand`、`VespeneDroneSwann`(目标效果技能 / CAbilEffectTarget)
- 关联 Behavior / Linked behaviors：`CommandCenterQueueSwann`、`FireSuppressionSystem`、`TerranBuildingBurnDown`
- 可生产/创建 / Produced or created：`SCVSwann`，耗时 / Time 15s
- 已隐藏基础按钮 / Hidden basic buttons：4 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | `CommandCenterTrainSwann` | `CommandCenterTrainSwann,Train1` | 训练技能 / CAbilTrain | `SCVSwann`、单位 / Unit:`SCVSwann` | - | - |
| 0,1 | `VespeneDroneSwann` | `VespeneDroneSwann,Execute` | 目标效果技能 / CAbilEffectTarget | - | 施加行为效果 / CEffectApplyBehavior:`VespeneDroneABSwann` | - |
| 1,4 | `RallyCommand` | `RallyCommand,Rally1` | 未解析 / Unresolved | - | - | - |
| 2,0 | `CommandCenterTransport` | `CommandCenterTransport,LoadAll` | 运输技能 / CAbilTransport | - | - | - |
| 2,1 | `CommandCenterTransport` | `CommandCenterTransport,UnloadAll` | 运输技能 / CAbilTransport | - | - | - |
| 2,3 | `CommandCenterLiftOffSwann` | `CommandCenterLiftOffSwann,Execute` | 变形技能 / CAbilMorph | - | - | - |

### 补给站 / `SupplyDepotSwann`

- 来源 / Source：名册 / Roster XMFinal CommanderBuildings.galaxy，官方ID / Official ID SupplyDepot，状态 / Status alias，模块 / Module XMSwann.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146_CommanderBuildings.galaxy`
- 数值 / Stats：类型 / Type Structure，种族 / Race Terr，生命 / Life 400，费用 / Cost 100/0，提供补给 / Supply provided 8
- Catalog 技能链接 / Catalog ability links：`BuildInProgressSwann`(CAbilBuildable / CAbilBuildable)、`SupplyDepotLoweSwannR`(变形技能 / CAbilMorph)
- 关联 Behavior / Linked behaviors：`FireSuppressionSystem`、`TerranBuildingBurnDown`
- 已隐藏基础按钮 / Hidden basic buttons：3 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | `SupplyDepotLoweSwannR` | `SupplyDepotLoweSwannR,0` | 变形技能 / CAbilMorph | - | - | - |

### 兵营 / `BarracksSwann`

- 来源 / Source：名册 / Roster XMFinal CommanderBuildings.galaxy，官方ID / Official ID Barracks，状态 / Status alias，模块 / Module XMSwann.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146_CommanderBuildings.galaxy`
- 数值 / Stats：类型 / Type Structure，种族 / Race Terr，生命 / Life 1000，费用 / Cost 150/0
- Catalog 技能链接 / Catalog ability links：`BarracksLiftOffSwann`(变形技能 / CAbilMorph)、`BuildInProgressSwann`(CAbilBuildable / CAbilBuildable)、`que5`(队列技能 / CAbilQueue)、`Rally`(CAbilRally / CAbilRally)
- 关联 Behavior / Linked behaviors：`FireSuppressionSystem`、`TerranBuildingBurnDown`
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,4 | `Rally` | `Rally,Rally1` | CAbilRally / CAbilRally | - | - | - |
| 2,0 | `BarracksAddOns` | `BarracksAddOns,Build1` | 未解析 / Unresolved | - | - | - |
| 2,0 | `BarracksAddOns` | `BarracksAddOns,Build4` | 未解析 / Unresolved | - | - | - |
| 2,1 | `BarracksAddOns` | `BarracksAddOns,Build2` | 未解析 / Unresolved | - | - | - |
| 2,3 | 升空 / `BarracksLiftOffSwann` | `BarracksLiftOffSwann,0` | 变形技能 / CAbilMorph | - | - | - |

### 工程站 / `EngineeringBaySwann`

- 来源 / Source：名册 / Roster XMFinal CommanderBuildings.galaxy，官方ID / Official ID EngineeringBay，状态 / Status alias，模块 / Module XMSwann.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146_CommanderBuildings.galaxy`
- 数值 / Stats：类型 / Type Structure，种族 / Race Terr，生命 / Life 850，费用 / Cost 125/0
- Catalog 技能链接 / Catalog ability links：`BuildInProgressSwann`(CAbilBuildable / CAbilBuildable)、`EngineeringBayResearchSwann`(研究技能 / CAbilResearch)、`que5`(队列技能 / CAbilQueue)
- 关联 Behavior / Linked behaviors：`FireSuppressionSystem`、`TerranBuildingBurnDown`
- 已隐藏基础按钮 / Hidden basic buttons：4 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | 瞬时自动追踪2 / `EngineeringBayResearchSwann` | `EngineeringBayResearchSwann,Research2` | 研究技能 / CAbilResearch | 升级 / Upgrade:`HiSecAutoTracking2Swann` | - | - |
| 1,0 | 瞬时自动追踪 / `EngineeringBayResearchSwann` | `EngineeringBayResearchSwann,Research1` | 研究技能 / CAbilResearch | 升级 / Upgrade:`HiSecAutoTrackingSwann` | - | - |
| 1,1 | 建筑护甲2 / `EngineeringBayResearchSwann` | `EngineeringBayResearchSwann,Research4` | 研究技能 / CAbilResearch | 升级 / Upgrade:`StructureArmor2Swann` | - | - |
| 1,1 | 建筑护甲 / `EngineeringBayResearchSwann` | `EngineeringBayResearchSwann,Research3` | 研究技能 / CAbilResearch | 升级 / Upgrade:`StructureArmorSwann` | - | - |
| 2,0 | 消防系统2 / `EngineeringBayResearchSwann` | `EngineeringBayResearchSwann,Research8` | 研究技能 / CAbilResearch | 升级 / Upgrade:`FireSuppressionSystems2Swann` | - | - |
| 2,0 | 消防系统 / `EngineeringBayResearchSwann` | `EngineeringBayResearchSwann,Research7` | 研究技能 / CAbilResearch | 升级 / Upgrade:`FireSuppressionSystems` | - | - |
| 2,1 | KMC自动填弹装置2 / `EngineeringBayResearchSwann` | `EngineeringBayResearchSwann,Research6` | 研究技能 / CAbilResearch | 升级 / Upgrade:`KMCAutoLoaders2Swann` | - | - |
| 2,1 | KMC自动填弹装置 / `EngineeringBayResearchSwann` | `EngineeringBayResearchSwann,Research5` | 研究技能 / CAbilResearch | 升级 / Upgrade:`KMCAutoLoadersSwann` | - | - |
| 2,2 | `MissileTurretPassive` | `-` | 未解析 / Unresolved | - | - | - |

### 重工厂 / `FactorySwann`

- 来源 / Source：名册 / Roster XMFinal CommanderBuildings.galaxy，官方ID / Official ID Factory，状态 / Status alias，模块 / Module XMSwann.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146_CommanderBuildings.galaxy`
- 数值 / Stats：类型 / Type Structure，种族 / Race Terr，生命 / Life 1500，费用 / Cost 150/0
- Catalog 技能链接 / Catalog ability links：`BuildInProgressSwann`(CAbilBuildable / CAbilBuildable)、`DoubleBuildSwann`(CAbilSpecialize / CAbilSpecialize)、`FactoryLiftOffSwann`(变形技能 / CAbilMorph)、`FactoryResearchSwann`(研究技能 / CAbilResearch)、`FactoryTrainSwann`(训练技能 / CAbilTrain)、`que5`(队列技能 / CAbilQueue)、`Rally`(CAbilRally / CAbilRally)
- 关联 Behavior / Linked behaviors：`FireSuppressionSystem`、`TerranBuildingBurnDown`
- 可生产/创建 / Produced or created：`CycloneSwann`（非本指挥官名册 / not in current commander roster），耗时 / Time 45s、歌利亚武装机器人 / `GoliathSwann`，耗时 / Time 40s、`HellionSwann`（非本指挥官名册 / not in current commander roster），耗时 / Time 30s、`HellionTankSwann`（非本指挥官名册 / not in current commander roster），耗时 / Time 30s、`MicrobotSwann`（非本指挥官名册 / not in current commander roster）、`PredatorSwann`（非本指挥官名册 / not in current commander roster）、`SiegeTankSwann`（非本指挥官名册 / not in current commander roster），耗时 / Time 45s、雷神 / `ThorSwann`，耗时 / Time 60s
- 已隐藏基础按钮 / Hidden basic buttons：4 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | 制造掠食者 / `FactoryTrainSwann` | `FactoryTrainSwann,Train11` | 训练技能 / CAbilTrain | `PredatorSwann`、单位 / Unit:`PredatorSwann` | - | - |
| 0,1 | 制造歌利亚武装机器人 / `FactoryTrainSwann` | `FactoryTrainSwann,Train3` | 训练技能 / CAbilTrain | 歌利亚武装机器人 / `GoliathSwann`、单位 / Unit:歌利亚武装机器人 / `GoliathSwann` | - | - |
| 0,2 | 制造攻城坦克 / `FactoryTrainSwann` | `FactoryTrainSwann,Train2` | 训练技能 / CAbilTrain | `SiegeTankSwann`、单位 / Unit:`SiegeTankSwann` | - | - |
| 0,3 | 制造雷神 / `FactoryTrainSwann` | `FactoryTrainSwann,Train5` | 训练技能 / CAbilTrain | 雷神 / `ThorSwann`、单位 / Unit:雷神 / `ThorSwann` | - | - |
| 0,4 | 制造恶火 / `FactoryTrainSwann` | `FactoryTrainSwann,Train6` | 训练技能 / CAbilTrain | `HellionSwann`、单位 / Unit:`HellionSwann` | - | - |
| 1,0 | 警戒机器人 / `FactoryTrainSwann` | `FactoryTrainSwann,Train12` | 训练技能 / CAbilTrain | `MicrobotSwann`、单位 / Unit:`MicrobotSwann` | - | - |
| 1,1 | 阿瑞斯级瞄准系统 / `FactoryResearchSwann` | `FactoryResearchSwann,Research2` | 研究技能 / CAbilResearch | 升级 / Upgrade:`AresClassWeaponsSystemSwann` | - | - |
| 1,2 | 漩流弹 / `FactoryResearchSwann` | `FactoryResearchSwann,Research1` | 研究技能 / CAbilResearch | 升级 / Upgrade:`MaelstromRoundsSwann` | - | - |
| 1,3 | 研究330毫米口径弹幕火炮 / `FactoryResearchSwann` | `FactoryResearchSwann,Research3` | 研究技能 / CAbilResearch | 升级 / Upgrade:`330mmBarrageCannonsSwann` | - | - |
| 1,4 | 制造恶蝠 / `FactoryTrainSwann` | `FactoryTrainSwann,Train7` | 训练技能 / CAbilTrain | `HellionTankSwann`、单位 / Unit:`HellionTankSwann` | - | - |
| 1,4 | `Rally` | `Rally,Rally1` | CAbilRally / CAbilRally | - | - | - |
| 2,0 | `DoubleBuildSwann` | `DoubleBuildSwann,Specialize1` | CAbilSpecialize / CAbilSpecialize | - | - | - |
| 2,1 | 制造飓风 / `FactoryTrainSwann` | `FactoryTrainSwann,Train8` | 训练技能 / CAbilTrain | `CycloneSwann`、单位 / Unit:`CycloneSwann` | - | - |
| 2,3 | 升空 / `FactoryLiftOffSwann` | `FactoryLiftOffSwann,Execute` | 变形技能 / CAbilMorph | - | - | - |

### 军械库 / `ArmorySwann`

- 来源 / Source：名册 / Roster XMFinal CommanderBuildings.galaxy，官方ID / Official ID Armory，状态 / Status alias，模块 / Module XMSwann.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146_CommanderBuildings.galaxy`
- 数值 / Stats：类型 / Type Structure，种族 / Race Terr，生命 / Life 750，费用 / Cost 150/100
- Catalog 技能链接 / Catalog ability links：`ArmoryResearchSwann`(研究技能 / CAbilResearch)、`BuildInProgressSwann`(CAbilBuildable / CAbilBuildable)、`que5`(队列技能 / CAbilQueue)
- 关联 Behavior / Linked behaviors：`FireSuppressionSystem`、`TerranBuildingBurnDown`
- 已隐藏基础按钮 / Hidden basic buttons：4 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | `ArmoryResearchSwann` | `ArmoryResearchSwann,Research1` | 研究技能 / CAbilResearch | 升级 / Upgrade:`TerranVehicleAndShipWeaponsLv1Swann` | - | - |
| 0,0 | `ArmoryResearchSwann` | `ArmoryResearchSwann,Research2` | 研究技能 / CAbilResearch | 升级 / Upgrade:`TerranVehicleAndShipWeaponsLv2Swann` | - | - |
| 0,0 | `ArmoryResearchSwann` | `ArmoryResearchSwann,Research3` | 研究技能 / CAbilResearch | 升级 / Upgrade:`TerranVehicleAndShipWeaponsLv3Swann` | - | - |
| 0,0 | `ArmoryResearchSwann` | `ArmoryResearchSwann,Research4` | 研究技能 / CAbilResearch | 升级 / Upgrade:`TerranVehicleAndShipWeaponsLv4Swann` | - | - |
| 0,0 | `ArmoryResearchSwann` | `ArmoryResearchSwann,Research5` | 研究技能 / CAbilResearch | 升级 / Upgrade:`TerranVehicleAndShipWeaponsLv5Swann` | - | - |
| 0,1 | `ArmoryResearchSwann` | `ArmoryResearchSwann,Research6` | 研究技能 / CAbilResearch | 升级 / Upgrade:`TerranVehicleAndShipArmorsLv1Swann` | - | - |
| 0,1 | `ArmoryResearchSwann` | `ArmoryResearchSwann,Research7` | 研究技能 / CAbilResearch | 升级 / Upgrade:`TerranVehicleAndShipArmorsLv2Swann` | - | - |
| 0,1 | `ArmoryResearchSwann` | `ArmoryResearchSwann,Research8` | 研究技能 / CAbilResearch | 升级 / Upgrade:`TerranVehicleAndShipArmorsLv3Swann` | - | - |
| 0,1 | `ArmoryResearchSwann` | `ArmoryResearchSwann,Research9` | 研究技能 / CAbilResearch | 升级 / Upgrade:`TerranVehicleAndShipArmorsLv4Swann` | - | - |
| 0,1 | `ArmoryResearchSwann` | `ArmoryResearchSwann,Research10` | 研究技能 / CAbilResearch | 升级 / Upgrade:`TerranVehicleAndShipArmorsLv5Swann` | - | - |
| 1,0 | 军械库升级包 / `ArmoryResearchSwann` | `ArmoryResearchSwann,Research13` | 研究技能 / CAbilResearch | 升级 / Upgrade:`UnitAttackRangeSwann` | - | - |
| 1,1 | 再生型生物钢 / `ArmoryResearchSwann` | `ArmoryResearchSwann,Research14` | 研究技能 / CAbilResearch | 升级 / Upgrade:`UnitLifeRegSwann` | - | - |

### 爆弹比利 / `GrenadeTurretSwann`

- 来源 / Source：名册 / Roster XMFinal CommanderBuildings.galaxy，官方ID / Official ID KelMorianGrenadeTurret，状态 / Status alias，模块 / Module XMSwann.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146_CommanderBuildings.galaxy`
- 数值 / Stats：类型 / Type Structure，种族 / Race Terr，生命 / Life 300，费用 / Cost 150/0
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`BuildInProgressSwann`(CAbilBuildable / CAbilBuildable)、`SalvageSharedSwann`(行为/被动技能 / CAbilBehavior)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`FireSuppressionSystem`、`TerranBuildingBurnDown`
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | `KelMorianGrenadeTurretConcussiveGrenades` | `-` | 未解析 / Unresolved | - | - | HaveSwannKelMorianGrenadeTurretUpgrade |
| 2,0 | `SalvageSharedSwann` | `SalvageSharedSwann,On` | 行为/被动技能 / CAbilBehavior | - | - | - |
| 2,1 | `HaveHiSecAutoTracking` | `-` | 未解析 / Unresolved | - | - | HaveTerranDefenseRangeBonus |
| 2,2 | `HaveImprovedTurretAttackSpeed` | `-` | 未解析 / Unresolved | - | - | HaveSwannTurretIncreasedAttackSpeed |

### 转转小子 / `MissileTurretSwann`

- 来源 / Source：名册 / Roster XMFinal CommanderBuildings.galaxy，官方ID / Official ID MissileTurret，状态 / Status alias，模块 / Module XMSwann.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146_CommanderBuildings.galaxy`
- 数值 / Stats：类型 / Type Structure，种族 / Race Terr，生命 / Life 300，费用 / Cost 100/0
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`BuildInProgressSwann`(CAbilBuildable / CAbilBuildable)、`SalvageSharedSwann`(行为/被动技能 / CAbilBehavior)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`Detector11`、`FireSuppressionSystem`、`TerranBuildingBurnDown`
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | 回收 / `SalvageSharedSwann` | `SalvageSharedSwann,On` | 行为/被动技能 / CAbilBehavior | - | - | - |
| 2,3 | `Detector` | `-` | 未解析 / Unresolved | - | - | NotUnderConstruction |

### 热辣贝蒂 / `PerditionTurretSwann`

- 来源 / Source：名册 / Roster XMFinal CommanderBuildings.galaxy，官方ID / Official ID PerditionTurret，状态 / Status alias，模块 / Module XMSwann.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146_CommanderBuildings.galaxy`
- 数值 / Stats：类型 / Type Structure，种族 / Race Terr，生命 / Life 350，费用 / Cost 75/0
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`BuildInProgressSwann`(CAbilBuildable / CAbilBuildable)、`PerditionTurretBurrowSwann`(变形技能 / CAbilMorph)、`SalvageSharedSwann`(行为/被动技能 / CAbilBehavior)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`FireSuppressionSystem`、`TerranBuildingBurnDown`
- 已隐藏基础按钮 / Hidden basic buttons：4 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | `SalvageSharedSwann` | `SalvageSharedSwann,On` | 行为/被动技能 / CAbilBehavior | - | - | - |

## 生产链补充建筑 / Production-support Buildings

- 无 / None

## 单位 / Units

### `Cyclone`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMSwann.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`CycloneWreckage`(变形技能 / CAbilMorph)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0 | `LockOn` | `LockOn,Execute` | 未解析 / Unresolved | - | - | - |
| 2 | `CycloneLockOnDamageUpgrade` | `-` | 未解析 / Unresolved | - | - | HaveCycloneLockOnDamageUpgrade |
| 4 | `LockOnCancel` | `LockOnCancel,Execute` | 未解析 / Unresolved | - | - | - |
| 2,1 | `LockOnRangeUpgrade` | `-` | 未解析 / Unresolved | - | - | HaveCycloneLockOnRangeUpgrade2 |

### `HellionTank`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status state-only，模块 / Module XMSwann.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`HellbatWreckage`(变形技能 / CAbilMorph)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,2 | `PassiveInfernalPreIgniter` | `-` | 未解析 / Unresolved | - | - | HaveInfernalPreigniter |
| 2,3 | `HellArmor` | `-` | 未解析 / Unresolved | - | - | HaveHellbatHellArmor |

### `Hercules`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster，状态 / Status exact，模块 / Module XMSwann.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，费用 / Cost 100/50，补给 / Supply 3
- Catalog 技能链接 / Catalog ability links：`Hyperjump`(目标效果技能 / CAbilEffectTarget)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| - | `RapidDeploymentHercules` | `-` | 未解析 / Unresolved | - | - | - |
| 2,2 | `Hyperjump` | `Hyperjump,Execute` | 目标效果技能 / CAbilEffectTarget | - | - | - |

### `ScienceVessel`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster，状态 / Status exact，模块 / Module XMSwann.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit
- Catalog 技能链接 / Catalog ability links：`CommanderPrestigeSwannHerculesScienceVesselTacticalJump`、`DefensiveMatrixTarget`、`ScienceVesselNanoRepairDouble`
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`
- 已隐藏基础按钮 / Hidden basic buttons：1 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| - | `AttackChampions` | `-` | 未解析 / Unresolved | - | - | - |
| - | `MoveChampions` | `-` | 未解析 / Unresolved | - | - | - |
| - | `ScienceVesselNanoRepairDouble` | `ScienceVesselNanoRepairDouble,Execute` | 未解析 / Unresolved | - | - | - |
| - | `VoidScienceVesselNanoRepair` | `VoidScienceVesselNanoRepair,Execute` | 未解析 / Unresolved | - | - | - |
| 1,0 | `CommanderPrestigeSwannHerculesScienceVesselTacticalJump` | `CommanderPrestigeSwannHerculesScienceVesselTacticalJump,Execute` | 未解析 / Unresolved | - | - | - |
| 2,0 | `NanoRepair` | `NanoRepair,Execute` | 目标效果技能 / CAbilEffectTarget | - | - | - |
| 2,2 | `DefensiveMatrixLocked` | `-` | 未解析 / Unresolved | - | - | SwannLevel13 |
| 2,2 | `DefensiveMatrixTarget` | `DefensiveMatrixTarget,Execute` | 未解析 / Unresolved | - | - | - |
| 2,3 | `ImprovedNanoRepair` | `-` | 未解析 / Unresolved | - | - | HaveScienceVesselFreeRepair |
| 2,3 | `ImprovedNanoRepairGreyColor` | `-` | 未解析 / Unresolved | - | - | HaveScienceVesselFreeRepairSecondary |

### `Hellion`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMSwann.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`HellionWreckage`(变形技能 / CAbilMorph)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,2 | `PassiveInfernalPreIgniter` | `-` | 未解析 / Unresolved | - | - | HaveInfernalPreigniter |
| 2,3 | `HellArmor` | `-` | 未解析 / Unresolved | - | - | HaveHellbatHellArmor |

### `Wraith`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster，状态 / Status exact，模块 / Module XMSwann.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit
- Catalog 技能链接 / Catalog ability links：无 / None
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`SwannBurstLaserMovementBuff`、`SwannGeminiMissileMovementBuff`、`VorazunCloakedShieldRegenPermanent`
- 已隐藏基础按钮 / Hidden basic buttons：2 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,2 | `ImprovedBurstLaser` | `-` | 未解析 / Unresolved | - | - | HaveWraithImprovedBurstLaser |

### `SCV`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster，状态 / Status exact，模块 / Module XMSwann.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`AdvancedConstructionAuto`、`attack`(基础 / Basic)、`MapObjectInteract`(目标效果技能 / CAbilEffectTarget)、`move`(基础 / Basic)、`MutatorRemoveWorkerSleep`(瞬发效果技能 / CAbilEffectInstant)、`SCVHarvest`(采集技能 / CAbilHarvest)、喷漆-人类 / `SprayTerran`、`stop`(基础 / Basic)、`TerranBuild`(建造技能 / CAbilBuild)、`TerranBuildFullRefund`
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`KelMorianWorkerCloak`
- 可生产/创建 / Produced or created：`CommandCenter`，耗时 / Time 100s、幽灵军校 / `GhostAcademyNova`（非本指挥官名册 / not in current commander roster），耗时 / Time 40s、`HiveMindEmulator`（非本指挥官名册 / not in current commander roster），耗时 / Time 50s、`KelMorianGrenadeTurret`，耗时 / Time 26.25s、`KelMorianMissileTurret`（非本指挥官名册 / not in current commander roster），耗时 / Time 18.75s、`PerditionTurret`，耗时 / Time 23s、`PsiDisruptor`（非本指挥官名册 / not in current commander roster），耗时 / Time 50s

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | `MapObjectInteract` | `MapObjectInteract,Execute` | 目标效果技能 / CAbilEffectTarget | - | - | - |
| 1,2 | `AdvancedConstructionAuto` | `AdvancedConstructionAuto,Execute` | 未解析 / Unresolved | - | - | - |
| 1,4 | `AdvancedConstructionLocked` | `-` | 未解析 / Unresolved | - | - | SwannLevel08 |
| 2,3 | `MutatorRemoveWorkerSleep` | `MutatorRemoveWorkerSleep,Execute` | 瞬发效果技能 / CAbilEffectInstant | - | - | - |
| 2,3 | 喷漆-人类 / `SprayTerran` | `SprayTerran,Execute` | 未解析 / Unresolved | - | - | - |
| - | `TerranBuild` | `TerranBuild,Build27` | 建造技能 / CAbilBuild | `KelMorianGrenadeTurret`、单位 / Unit:`KelMorianGrenadeTurret` | - | - |
| 0,0 | `TerranBuild` | `TerranBuild,Build21` | 建造技能 / CAbilBuild | `CommandCenter`、单位 / Unit:`CommandCenter` | - | - |
| 1,0 | `SwannBarracks` | `-` | 未解析 / Unresolved | - | - | HaveSwannCommander |
| 2,0 | `TerranBuildFullRefund` | `TerranBuildFullRefund,Build1` | 未解析 / Unresolved | - | - | - |
| 2,0 | `TerranBuild` | `TerranBuild,Build23` | 建造技能 / CAbilBuild | - | - | - |
| 2,0 | `TerranBuild` | `TerranBuild,Build20` | 建造技能 / CAbilBuild | `PerditionTurret`、单位 / Unit:`PerditionTurret` | - | - |
| 2,1 | `TerranBuild` | `TerranBuild,Build26` | 建造技能 / CAbilBuild | `KelMorianMissileTurret`、单位 / Unit:`KelMorianMissileTurret` | - | - |
| 2,2 | `TerranBuild` | `TerranBuild,Build9` | 建造技能 / CAbilBuild | - | - | - |
| 2,3 | `TerranBuild` | `TerranBuild,Build22` | 建造技能 / CAbilBuild | `HiveMindEmulator`、单位 / Unit:`HiveMindEmulator` | - | - |
| 2,3 | `TerranBuild` | `TerranBuild,Build8` | 建造技能 / CAbilBuild | `PsiDisruptor`、单位 / Unit:`PsiDisruptor` | - | - |
| 0,0 | 建造幽灵军校 / `TerranBuild` | `TerranBuild,Build15` | 建造技能 / CAbilBuild | 幽灵军校 / `GhostAcademyNova`、单位 / Unit:幽灵军校 / `GhostAcademyNova` | - | - |
| 2,1 | `BuildFusionCoreLocked` | `-` | 未解析 / Unresolved | - | - | RaynorLevel06 |

### `Goliath`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster，状态 / Status exact，模块 / Module XMSwann.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit
- Catalog 技能链接 / Catalog ability links：`GoliathWreckage`(变形技能 / CAbilMorph)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`
- 已隐藏基础按钮 / Hidden basic buttons：2 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

- 面板技能 / Panel skills：无 / None

### 攻城坦克 / `SiegeTank`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMSwann.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`move`(基础 / Basic)、`SiegeMode`、`SiegeTankWreckage`(变形技能 / CAbilMorph)、`stop`(基础 / Basic)、`VehicleAfterburners`(瞬发效果技能 / CAbilEffectInstant)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`
- 已隐藏基础按钮 / Hidden basic buttons：1 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | `CommanderSwannImmortalityProtocol` | `-` | 未解析 / Unresolved | - | - | HaveSwannCommanderImmortalityProtocol |
| 2,2 | `AfterburnersLocked` | `-` | 未解析 / Unresolved | - | - | RaynorLevel11 |
| 2,2 | `VehicleAfterburners` | `VehicleAfterburners,Execute` | 瞬发效果技能 / CAbilEffectInstant | - | 施加行为效果 / CEffectApplyBehavior:`VehicleAfterburnersAB` | - |
| 2,3 | `ImprovedSiegeMode` | `-` | 未解析 / Unresolved | - | - | HaveImprovedSiegeMode |
| 2,3 | `MaelstromRounds` | `-` | 未解析 / Unresolved | - | - | HaveMaelstromRounds |

### 大力神 / `HerculesSwann`

- 来源 / Source：名册 / Roster XMFinal CommanderRosters.galaxy，官方ID / Official ID Hercules，状态 / Status alias，模块 / Module XMSwann.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146_CommanderRosters.galaxy`
- 数值 / Stats：类型 / Type Unit，种族 / Race Terr，生命 / Life 600，费用 / Cost 100/50，补给 / Supply 3
- Catalog 技能链接 / Catalog ability links：`HerculesTransportSwann`(运输技能 / CAbilTransport)、`HyperjumpSwann`(目标效果技能 / CAbilEffectTarget)、`move`(基础 / Basic)、`stop`(基础 / Basic)
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | `RapidDeployment` | `-` | 未解析 / Unresolved | - | - | - |
| 2,0 | `HerculesTransportSwann` | `HerculesTransportSwann,Load` | 运输技能 / CAbilTransport | - | - | - |
| 2,1 | `HerculesTransportSwann` | `HerculesTransportSwann,UnloadAt` | 运输技能 / CAbilTransport | - | - | - |
| 2,2 | `HyperjumpSwann` | `HyperjumpSwann,Execute` | 目标效果技能 / CAbilEffectTarget | - | 创建单位效果 / CEffectCreateUnit:`HyperjumpCUSwann` | - |

### 科学船 / `ScienceVesselSwann`

- 来源 / Source：名册 / Roster XMFinal CommanderRosters.galaxy，官方ID / Official ID ScienceVessel，状态 / Status alias，模块 / Module XMSwann.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146_CommanderRosters.galaxy`
- 数值 / Stats：类型 / Type Unit，种族 / Race Terr，生命 / Life 200，能量 / Energy 200，费用 / Cost 100/200，补给 / Supply 2
- Catalog 技能链接 / Catalog ability links：`DefensiveMatrixSwann`(目标效果技能 / CAbilEffectTarget)、`HyperjumpRSwann`(目标效果技能 / CAbilEffectTarget)、`IrradiateSwann`(目标效果技能 / CAbilEffectTarget)、`move`(基础 / Basic)、`NanoRepairSwann`(目标效果技能 / CAbilEffectTarget)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`Detector11`
- 已隐藏基础按钮 / Hidden basic buttons：6 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,3 | `Detector` | `-` | 未解析 / Unresolved | - | - | - |
| 2,0 | `NanoRepairSwann` | `NanoRepairSwann,Execute` | 目标效果技能 / CAbilEffectTarget | - | - | - |
| 2,1 | `IrradiateSwann` | `IrradiateSwann,Execute` | 目标效果技能 / CAbilEffectTarget | - | 施加行为效果 / CEffectApplyBehavior:`IrradiateABSwann` | - |
| 2,2 | `DefensiveMatrixSwann` | `DefensiveMatrixSwann,Execute` | 目标效果技能 / CAbilEffectTarget | - | 施加行为效果 / CEffectApplyBehavior:`DefensiveMatrixABSwann` | - |
| 2,3 | `HyperjumpRSwann` | `HyperjumpRSwann,Execute` | 目标效果技能 / CAbilEffectTarget | - | 创建单位效果 / CEffectCreateUnit:`HyperjumpCUSwann` | - |

### 怨灵战机 / `WraithSwann`

- 来源 / Source：名册 / Roster XMFinal CommanderRosters.galaxy，官方ID / Official ID Wraith，状态 / Status alias，模块 / Module XMSwann.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146_CommanderRosters.galaxy`
- 数值 / Stats：类型 / Type Unit，种族 / Race Terr，生命 / Life 200，能量 / Energy 200，费用 / Cost 150/150，补给 / Supply 2
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`move`(基础 / Basic)、`stop`(基础 / Basic)、`WraithCloakSwann`(行为/被动技能 / CAbilBehavior)
- 关联 Behavior / Linked behaviors：`BurstLaserMovementSwann`、`CloakDistortionFieldSwann`、`GeminiMissileMovementSwann`
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | `WraithCloakSwann` | `WraithCloakSwann,On` | 行为/被动技能 / CAbilBehavior | - | - | - |
| 2,1 | `WraithCloakSwann` | `WraithCloakSwann,Off` | 行为/被动技能 / CAbilBehavior | - | - | - |
| 2,2 | `PulseAmplifierSwann` | `-` | 未解析 / Unresolved | - | - | - |
| 2,3 | `CloakDistortionFieldSwann` | `-` | 未解析 / Unresolved | - | - | - |

### `SCVSwann`

- 来源 / Source：名册 / Roster XMFinal CommanderRosters.galaxy，官方ID / Official ID SCV，状态 / Status alias，模块 / Module XMSwann.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146_CommanderRosters.galaxy`
- 数值 / Stats：类型 / Type Unit，种族 / Race Terr，生命 / Life 100，费用 / Cost 50/0，补给 / Supply 1
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`move`(基础 / Basic)、修理 / `RepairSwann`(目标效果技能 / CAbilEffectTarget)、`SCVHarvest`(采集技能 / CAbilHarvest)、`stop`(基础 / Basic)、`TerranBuildDropSwann`(建造技能 / CAbilBuild)、`TerranBuildSwann`(建造技能 / CAbilBuild)
- 可生产/创建 / Produced or created：军械库 / `ArmorySwann`，耗时 / Time 65s、指挥中心 / `CommandCenterSwann`，耗时 / Time 100s、工程站 / `EngineeringBaySwann`，耗时 / Time 35s、重工厂 / `FactorySwann`，耗时 / Time 60s、爆弹比利 / `GrenadeTurretSwann`，耗时 / Time 25s、转转小子 / `MissileTurretSwann`，耗时 / Time 25s、热辣贝蒂 / `PerditionTurretSwann`，耗时 / Time 25s、`RefinerySwann`（非本指挥官名册 / not in current commander roster），耗时 / Time 30s、`SensorTowerSwann`（非本指挥官名册 / not in current commander roster），耗时 / Time 25s、`StarportSwann`（非本指挥官名册 / not in current commander roster），耗时 / Time 50s、补给站 / `SupplyDepotSwann`，耗时 / Time 30s、`SupplyDepotSwannDrop`（非本指挥官名册 / not in current commander roster），耗时 / Time 3s
- 已隐藏基础按钮 / Hidden basic buttons：8 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | `SCVHarvest` | `SCVHarvest,Gather` | 采集技能 / CAbilHarvest | - | - | - |
| 1,1 | `SCVHarvest` | `SCVHarvest,Return` | 采集技能 / CAbilHarvest | - | - | - |
| 2,0 | `TerranBuild` | `-` | 未解析 / Unresolved | - | - | - |
| 2,1 | `TerranBuildAdvanced` | `-` | 未解析 / Unresolved | - | - | - |
| 2,2 | 修理 / `RepairSwann` | `RepairSwann,Execute` | 目标效果技能 / CAbilEffectTarget | - | - | - |
| 0,0 | 建造指挥中心 / `TerranBuildSwann` | `TerranBuildSwann,Build1` | 建造技能 / CAbilBuild | 指挥中心 / `CommandCenterSwann`、单位 / Unit:指挥中心 / `CommandCenterSwann` | - | - |
| 0,1 | 建造精炼厂 / `TerranBuildSwann` | `TerranBuildSwann,Build3` | 建造技能 / CAbilBuild | `RefinerySwann`、单位 / Unit:`RefinerySwann` | - | - |
| 0,2 | 轨道空投：补给站 / `TerranBuildDropSwann` | `TerranBuildDropSwann,Build1` | 建造技能 / CAbilBuild | `SupplyDepotSwannDrop`、单位 / Unit:`SupplyDepotSwannDrop` | - | - |
| 0,2 | 建造补给站 / `TerranBuildSwann` | `TerranBuildSwann,Build2` | 建造技能 / CAbilBuild | 补给站 / `SupplyDepotSwann`、单位 / Unit:补给站 / `SupplyDepotSwann` | - | - |
| 1,1 | 建造工程站 / `TerranBuildSwann` | `TerranBuildSwann,Build5` | 建造技能 / CAbilBuild | 工程站 / `EngineeringBaySwann`、单位 / Unit:工程站 / `EngineeringBaySwann` | - | - |
| 1,2 | 建造感应塔 / `TerranBuildSwann` | `TerranBuildSwann,Build9` | 建造技能 / CAbilBuild | `SensorTowerSwann`、单位 / Unit:`SensorTowerSwann` | - | - |
| 2,0 | 毁灭炮塔 / `TerranBuildSwann` | `TerranBuildSwann,Build17` | 建造技能 / CAbilBuild | 爆弹比利 / `GrenadeTurretSwann`、单位 / Unit:爆弹比利 / `GrenadeTurretSwann` | - | - |
| 2,1 | 部署热辣贝蒂 / `TerranBuildSwann` | `TerranBuildSwann,Build18` | 建造技能 / CAbilBuild | 热辣贝蒂 / `PerditionTurretSwann`、单位 / Unit:热辣贝蒂 / `PerditionTurretSwann` | - | - |
| 2,2 | 建造导弹塔 / `TerranBuildSwann` | `TerranBuildSwann,Build6` | 建造技能 / CAbilBuild | 转转小子 / `MissileTurretSwann`、单位 / Unit:转转小子 / `MissileTurretSwann` | - | - |
| 1,0 | 建造重工厂 / `TerranBuildSwann` | `TerranBuildSwann,Build11` | 建造技能 / CAbilBuild | 重工厂 / `FactorySwann`、单位 / Unit:重工厂 / `FactorySwann` | - | - |
| 1,1 | 建造军械库 / `TerranBuildSwann` | `TerranBuildSwann,Build14` | 建造技能 / CAbilBuild | 军械库 / `ArmorySwann`、单位 / Unit:军械库 / `ArmorySwann` | - | - |
| 2,0 | 建造星港 / `TerranBuildSwann` | `TerranBuildSwann,Build12` | 建造技能 / CAbilBuild | `StarportSwann`、单位 / Unit:`StarportSwann` | - | - |

### 歌利亚武装机器人 / `GoliathSwann`

- 来源 / Source：名册 / Roster XMFinal CommanderRosters.galaxy，官方ID / Official ID Goliath，状态 / Status alias，模块 / Module XMSwann.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146_CommanderRosters.galaxy`
- 数值 / Stats：类型 / Type Unit，种族 / Race Terr，生命 / Life 150，费用 / Cost 150/50，补给 / Supply 2
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`move`(基础 / Basic)、`stop`(基础 / Basic)
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

- 面板技能 / Panel skills：无 / None

### 雷神 / `ThorSwann`

- 来源 / Source：名册 / Roster XMFinal CommanderRosters.galaxy，状态 / Status galaxy，模块 / Module XMSwann.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146_CommanderRosters.galaxy`
- 数值 / Stats：类型 / Type Unit，种族 / Race Terr，生命 / Life 400，费用 / Cost 300/200，补给 / Supply 6
- Catalog 技能链接 / Catalog ability links：330毫米口径弹幕火炮 / `330mmBarrageCannonsSwann`(目标效果技能 / CAbilEffectTarget)、`attack`(基础 / Basic)、`move`(基础 / Basic)、`stop`(基础 / Basic)
- 已隐藏基础按钮 / Hidden basic buttons：6 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | 330毫米口径弹幕火炮 / `330mmBarrageCannonsSwann` | `330mmBarrageCannonsSwann,Execute` | 目标效果技能 / CAbilEffectTarget | - | 持续效果 / CEffectCreatePersistent:`330mmBarrageCannonsCPSwann`、伤害效果 / CEffectDamage:`330mmBarrageCannonsDSwann` | - |

## 英雄 / Heroes

- 无 / None
