# 诺娃 / `Nova` 科技链路排查 / Tech Tree Diagnostics

- 描述 / Description：无 / None
- 数据来源 / Data source：当前 Mod / Current Mod，目录 / Directory：`合作指挥官版起义狂潮/Mods/XM/XMNova.SC2Mod`
- 当前 Mod 运行名册 / Current Mod roster：module=`XMNova.SC2Mod`，instance=`Nova`
- 统计 / Stats：建筑 10、生产链补充建筑 0、单位 12、英雄 1、建筑按钮 58、单位按钮 56、效果引用 53
- 名称显示 / Name display：能从当前 Mod zhCN 解析时显示“中文名 / `英文ID`”；仅显示 `ID` 表示当前 Mod 未找到可用中文名。

## 初始化/开局单位 / Initial Opener

| 槽位 / Slot | 单位 / Unit | 预期类型 / Expected Kind | Catalog 父级 / Catalog Parent | 是否在运行名册 / In Runtime Roster | 来源 / Source |
| --- | --- | --- | --- | --- | --- |
| 初始基地 / Command Center | 指挥中心 / `CommandCenterNova` | building | - | 是 / Yes | Catalog xmnova，Instance Nova，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMNova.SC2Mod/Base.SC2Data/GameData/UserData.xml`，名册状态 / Roster status alias |
| 初始工人 / Worker | `SCVNova` | unit | - | 是 / Yes | Catalog xmnova，Instance Nova，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMNova.SC2Mod/Base.SC2Data/GameData/UserData.xml`，名册状态 / Roster status alias |
| 第二初始单位 / Second Unit | 幽灵军校 / `GhostAcademyNova` | unit | - | 是 / Yes | Catalog xmnova，Instance Nova，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMNova.SC2Mod/Base.SC2Data/GameData/UserData.xml`，名册状态 / Roster status exact |

## 指挥官默认/顶部技能 / Commander Default / Top-panel Skills

| 技能名 / Skill Name | Ability/Cmd | 类型 / Type | 效果引用 / Effect References | Catalog 来源 / Catalog Sources |
| --- | --- | --- | --- | --- |
| `NovaDefensiveMatrixDrone` | `NovaDefensiveMatrixDrone,Execute` | 目标效果技能 / CAbilEffectTarget | - | xmnova:1 |
| 狮鹫号空袭 / `SOAStickyLine` | `SOAStickyLine,Execute` | 目标效果技能 / CAbilEffectTarget | 效果集合 / CEffectSet:`StickyLine` | xmcore:1 |
| 战术空运 / `NovaGriffinTransportLoad` | `NovaGriffinTransportLoad,Execute` | 目标效果技能 / CAbilEffectTarget | 区域枚举效果 / CEffectEnumArea:`NovaGriffinTransportPreS` | xmnova:1 |
| `NovaReviveInstantBuyback` | `NovaReviveInstantBuyback,Execute` | 目标效果技能 / CAbilEffectTarget | 持续效果 / CEffectCreatePersistent、效果集合 / CEffectSet:`NovaReviveInstantBuybackDummy` | xmnova:1 |
| `BuildInProgress` | `BuildInProgress,Cancel` | 未解析 / Unresolved | - | - |

## 建筑 / Buildings

### `Barracks`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster，状态 / Status exact，模块 / Module XMNova.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`BarracksAddOns`、`BarracksLiftOff`、`BarracksTrain`(训练技能 / CAbilTrain)、`BarracksTrainNova`(折跃/部署训练技能 / CAbilWarpTrain)、`BuildInProgress`(基础 / Basic)、`Rally`(CAbilRally / CAbilRally)
- 关联 Behavior / Linked behaviors：`ChronoBoostBlackOpsBarracks`、`ChronoBoostTarget`
- 可生产/创建 / Produced or created：`Ghost_BlackOpsSpawnerUnit`（非本指挥官名册 / not in current commander roster），费用 / Cost 1000/500、`Marauder_BlackOpsSpawnerUnit`（非本指挥官名册 / not in current commander roster），费用 / Cost 500/130、`Marine_BlackOpsSpawnerUnit`（非本指挥官名册 / not in current commander roster），费用 / Cost 600
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0 | `OrbitalDropPodsPassive` | `-` | 未解析 / Unresolved | - | - | HaveOrbitalDropPods |
| 0 | `BarracksAddOns` | `BarracksAddOns,Build1` | 未解析 / Unresolved | - | - | - |
| 0 | `BarracksAddOns` | `BarracksAddOns,Build4` | 未解析 / Unresolved | - | - | - |
| 0,0 | `BarracksTrainNova` | `BarracksTrainNova,Train1` | 折跃/部署训练技能 / CAbilWarpTrain | `Marine_BlackOpsSpawnerUnit`、单位 / Unit:`Marine_BlackOpsSpawnerUnit` | - | - |
| 1 | `BarracksAddOns` | `BarracksAddOns,Build2` | 未解析 / Unresolved | - | - | - |
| 0,1 | `BarracksTrainNova` | `BarracksTrainNova,Train2` | 折跃/部署训练技能 / CAbilWarpTrain | `Marauder_BlackOpsSpawnerUnit`、单位 / Unit:`Marauder_BlackOpsSpawnerUnit` | - | - |
| 0,2 | `BarracksTrain` | `BarracksTrain,Train6` | 训练技能 / CAbilTrain | - | - | - |
| 0,2 | `BarracksTrain` | `BarracksTrain,Train2` | 训练技能 / CAbilTrain | - | - | - |
| 0,2 | `BarracksTrainNova` | `BarracksTrainNova,Train3` | 折跃/部署训练技能 / CAbilWarpTrain | `Ghost_BlackOpsSpawnerUnit`、单位 / Unit:`Ghost_BlackOpsSpawnerUnit` | - | - |
| 0,3 | `BarracksTrain` | `BarracksTrain,Train5` | 训练技能 / CAbilTrain | - | - | - |
| 3 | `MengskUnits` | `-` | 未解析 / Unresolved | - | - | - |
| 1,0 | `MasteryNovaArmyAttackSpeedAppend` | `-` | 未解析 / Unresolved | - | - | HaveMasteryNovaArmyAttackSpeed |
| 1,1 | `MasteryNovaArmyOOCRegenSpeedAppend` | `-` | 未解析 / Unresolved | - | - | HaveMasteryNovaArmyOOCRegenSpeed |
| 1,4 | `Rally` | `Rally,Rally1` | CAbilRally / CAbilRally | - | - | - |
| 2 | `BarracksLiftOff` | `BarracksLiftOff,Execute` | 未解析 / Unresolved | - | - | - |
| 2,1 | `BarracksAddOns` | `BarracksAddOns,Build3` | 未解析 / Unresolved | - | - | - |
| 2,2 | `BarracksAddOns` | `BarracksAddOns,Build3` | 未解析 / Unresolved | - | - | - |
| 2,0 | `BarracksTrain` | `BarracksTrain,Train3` | 训练技能 / CAbilTrain | - | - | - |

### 幽灵军校 / `GhostAcademyNova`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMNova.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Structure，种族 / Race Terr，生命 / Life 2500，费用 / Cost 150/50
- Catalog 技能链接 / Catalog ability links：`BuildInProgress`(基础 / Basic)、`GhostAcademyResearch`(研究技能 / CAbilResearch)、`GhostAcademyResearchNova`(研究技能 / CAbilResearch)、`HeroArmNuke`、`NovaUnitGadgetGrantCharge`、`que5`(队列技能 / CAbilQueue)
- 关联 Behavior / Linked behaviors：`ChronoBoostTarget`、`FireSuppressionSystem`、`ReactorQueue`、`TerranBuildingBurnDown`
- 已隐藏基础按钮 / Hidden basic buttons：4 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | `GhostAcademyResearchNova` | `GhostAcademyResearchNova,Research1` | 研究技能 / CAbilResearch | 升级 / Upgrade:`NovaDetector` | - | - |
| 0,1 | `GhostAcademyResearchNova` | `GhostAcademyResearchNova,Research2` | 研究技能 / CAbilResearch | 升级 / Upgrade:`NovaLifeRegen` | - | - |
| 0,2 | `GhostAcademyResearchNova` | `GhostAcademyResearchNova,Research3` | 研究技能 / CAbilResearch | 升级 / Upgrade:`NovaSnipeRefund` | - | - |
| 0,3 | `GhostAcademyResearchNova` | `GhostAcademyResearchNova,Research4` | 研究技能 / CAbilResearch | 升级 / Upgrade:`NovaShotgunBlastRange` | - | - |

### `AutoTurret`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster，状态 / Status exact，模块 / Module XMNova.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：无 / None

- 面板技能 / Panel skills：无 / None

### 导弹塔 / `MissileTurret`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster，状态 / Status exact，模块 / Module XMNova.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`BuildInProgress`(基础 / Basic)、`SalvageShared`(行为/被动技能 / CAbilBehavior)、`stop`(基础 / Basic)

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | `HellstormMissileBatteries` | `-` | 未解析 / Unresolved | - | - | HailstormMissilePods |
| 2,0 | `SalvageShared` | `SalvageShared,On` | 行为/被动技能 / CAbilBehavior | - | - | - |
| 2,1 | `HaveHiSecAutoTracking` | `-` | 未解析 / Unresolved | - | - | HaveTerranDefenseRangeBonus |
| 2,2 | `HaveImprovedTurretAttackSpeed` | `-` | 未解析 / Unresolved | - | - | HaveSwannTurretIncreasedAttackSpeed |

### `CommandCenter`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster，状态 / Status exact，模块 / Module XMNova.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：提供补给 / Supply provided 15
- Catalog 技能链接 / Catalog ability links：`BuildInProgress`(基础 / Basic)、`CommandCenterTrainRaynor`(训练技能 / CAbilTrain)、`CommandCenterTransport`(运输技能 / CAbilTransport)、`RallyCommand`、`UpgradeToOrbital`(变形技能 / CAbilMorph)、`UpgradeToOrbitalCoop`、`UpgradeToPlanetaryFortress`、`VespeneDroneCast`
- 关联 Behavior / Linked behaviors：`ChronoBoostTarget`
- 可生产/创建 / Produced or created：`SCVRaynor`（非本指挥官名册 / not in current commander roster）
- 已隐藏基础按钮 / Hidden basic buttons：2 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | `CommandCenterTrainRaynor` | `CommandCenterTrainRaynor,Train1` | 训练技能 / CAbilTrain | `SCVRaynor`、单位 / Unit:`SCVRaynor` | - | - |
| 0,1 | `BuildDroneOperatorLocked` | `-` | 未解析 / Unresolved | - | - | SwannLevel05 |
| 0,1 | `VespeneDroneCast` | `VespeneDroneCast,Execute` | 未解析 / Unresolved | - | - | - |
| 1,1 | `MasteryNovaArmyOOCRegenSpeedAppend` | `-` | 未解析 / Unresolved | - | - | HaveMasteryNovaArmyOOCRegenSpeed |
| 1,4 | `RallyCommand` | `RallyCommand,Rally2` | 未解析 / Unresolved | - | - | - |
| 2,2 | `NeoSteelFrameCommandCenter` | `-` | 未解析 / Unresolved | - | - | HaveNeosteelFrame |

### 指挥中心 / `CommandCenterNova`

- 来源 / Source：名册 / Roster XMFinal CommanderBuildings.galaxy，官方ID / Official ID CommandCenter，状态 / Status alias，模块 / Module XMNova.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146_CommanderBuildings.galaxy`
- 数值 / Stats：类型 / Type Structure，种族 / Race Terr，生命 / Life 3000，费用 / Cost 400/0
- Catalog 技能链接 / Catalog ability links：`BuildInProgress`(基础 / Basic)、`CommandCenterLiftOffNova`(变形技能 / CAbilMorph)、`CommandCenterTrainNova`(训练技能 / CAbilTrain)、`CommandCenterTransport`(运输技能 / CAbilTransport)、`que5CancelToSelection`、`RallyCommand`
- 关联 Behavior / Linked behaviors：`CommandCenterQueue`、`FireSuppressionSystem`、`TerranBuildingBurnDown`
- 可生产/创建 / Produced or created：`SCVNova`，耗时 / Time 17s
- 已隐藏基础按钮 / Hidden basic buttons：4 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | 制造SCV / `CommandCenterTrainNova` | `CommandCenterTrainNova,Train1` | 训练技能 / CAbilTrain | `SCVNova`、单位 / Unit:`SCVNova` | - | - |
| 1,4 | `RallyCommand` | `RallyCommand,Rally1` | 未解析 / Unresolved | - | - | - |
| 2,0 | `CommandCenterTransport` | `CommandCenterTransport,LoadAll` | 运输技能 / CAbilTransport | - | - | - |
| 2,1 | `CommandCenterTransport` | `CommandCenterTransport,UnloadAll` | 运输技能 / CAbilTransport | - | - | - |
| 2,3 | `CommandCenterLiftOffNova` | `CommandCenterLiftOffNova,Execute` | 变形技能 / CAbilMorph | - | - | - |

### 兵营 / `BarracksNova`

- 来源 / Source：名册 / Roster XMFinal CommanderBuildings.galaxy，官方ID / Official ID Barracks，状态 / Status alias，模块 / Module XMNova.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146_CommanderBuildings.galaxy`
- 数值 / Stats：类型 / Type Structure，种族 / Race Terr，生命 / Life 2000，费用 / Cost 150/0
- Catalog 技能链接 / Catalog ability links：`BarracksLiftOffNova`(变形技能 / CAbilMorph)、`BarracksResearch`(研究技能 / CAbilResearch)、`BarracksTrainNova`(折跃/部署训练技能 / CAbilWarpTrain)、`BuildInProgress`(基础 / Basic)、`que5`(队列技能 / CAbilQueue)
- 关联 Behavior / Linked behaviors：`FireSuppressionSystem`、`TerranBuildingBurnDown`
- 可生产/创建 / Produced or created：`Ghost_BlackOpsSpawnerUnit`（非本指挥官名册 / not in current commander roster），费用 / Cost 1000/500、`Marauder_BlackOpsSpawnerUnit`（非本指挥官名册 / not in current commander roster），费用 / Cost 500/130、`Marine_BlackOpsSpawnerUnit`（非本指挥官名册 / not in current commander roster），费用 / Cost 600
- 已隐藏基础按钮 / Hidden basic buttons：4 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | `BarracksTrainNova` | `BarracksTrainNova,Train1` | 折跃/部署训练技能 / CAbilWarpTrain | `Marine_BlackOpsSpawnerUnit`、单位 / Unit:`Marine_BlackOpsSpawnerUnit` | - | - |
| 0,1 | `BarracksTrainNova` | `BarracksTrainNova,Train2` | 折跃/部署训练技能 / CAbilWarpTrain | `Marauder_BlackOpsSpawnerUnit`、单位 / Unit:`Marauder_BlackOpsSpawnerUnit` | - | - |
| 0,2 | `BarracksTrainNova` | `BarracksTrainNova,Train3` | 折跃/部署训练技能 / CAbilWarpTrain | `Ghost_BlackOpsSpawnerUnit`、单位 / Unit:`Ghost_BlackOpsSpawnerUnit` | - | - |
| 1,0 | `BarracksResearch` | `BarracksResearch,Research1` | 研究技能 / CAbilResearch | 升级 / Upgrade:`LaserTargetingSystemNova` | - | - |
| 1,1 | `BarracksResearch` | `BarracksResearch,Research3` | 研究技能 / CAbilResearch | 升级 / Upgrade:`NovaConcussiveShells` | - | - |
| 1,2 | `BarracksResearch` | `BarracksResearch,Research5` | 研究技能 / CAbilResearch | 升级 / Upgrade:`GhostBlackOpsEMPNova` | - | - |
| 2,0 | 研究强化剂 / `BarracksResearch` | `BarracksResearch,Research2` | 研究技能 / CAbilResearch | 升级 / Upgrade:`NovaSuperStim` | - | - |
| 2,1 | 研究磁轨武器 / `BarracksResearch` | `BarracksResearch,Research4` | 研究技能 / CAbilResearch | 升级 / Upgrade:`MagrailMunitionsNova` | - | - |
| 2,2 | `BarracksResearch` | `BarracksResearch,Research6` | 研究技能 / CAbilResearch | 升级 / Upgrade:`GhostBlackOpsTripleTapNova` | - | - |
| 2,3 | 升空 / `BarracksLiftOffNova` | `BarracksLiftOffNova,Execute` | 变形技能 / CAbilMorph | - | - | - |

### 重工厂 / `FactoryNova`

- 来源 / Source：名册 / Roster XMFinal CommanderBuildings.galaxy，官方ID / Official ID Factory，状态 / Status alias，模块 / Module XMNova.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146_CommanderBuildings.galaxy`
- 数值 / Stats：类型 / Type Structure，种族 / Race Terr，生命 / Life 2500，费用 / Cost 150/100
- Catalog 技能链接 / Catalog ability links：`BuildInProgress`(基础 / Basic)、`FactoryLiftOffNova`(变形技能 / CAbilMorph)、`FactoryResearch`(研究技能 / CAbilResearch)、`FactoryTrainNova`(折跃/部署训练技能 / CAbilWarpTrain)、`que5`(队列技能 / CAbilQueue)
- 关联 Behavior / Linked behaviors：`FireSuppressionSystem`、`ReactorQueue`、`TerranBuildingBurnDown`
- 可生产/创建 / Produced or created：`Goliath_BlackOpsSpawnerUnit`（非本指挥官名册 / not in current commander roster），费用 / Cost 750/250、`Hellbat_BlackOpsSpawnerUnit`（非本指挥官名册 / not in current commander roster），费用 / Cost 500、`SiegeTank_BlackOpsSpawnerUnit`（非本指挥官名册 / not in current commander roster），费用 / Cost 800/600
- 已隐藏基础按钮 / Hidden basic buttons：4 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | `FactoryTrainNova` | `FactoryTrainNova,Train3` | 折跃/部署训练技能 / CAbilWarpTrain | `Hellbat_BlackOpsSpawnerUnit`、单位 / Unit:`Hellbat_BlackOpsSpawnerUnit` | - | - |
| 0,1 | `FactoryTrainNova` | `FactoryTrainNova,Train1` | 折跃/部署训练技能 / CAbilWarpTrain | `Goliath_BlackOpsSpawnerUnit`、单位 / Unit:`Goliath_BlackOpsSpawnerUnit` | - | - |
| 0,2 | `FactoryTrainNova` | `FactoryTrainNova,Train2` | 折跃/部署训练技能 / CAbilWarpTrain | `SiegeTank_BlackOpsSpawnerUnit`、单位 / Unit:`SiegeTank_BlackOpsSpawnerUnit` | - | - |
| 1,0 | 研究地狱火预燃器 / `FactoryResearch` | `FactoryResearch,Research1` | 研究技能 / CAbilResearch | 升级 / Upgrade:`HighCapacityBarrelsNova` | - | - |
| 1,1 | `FactoryResearch` | `FactoryResearch,Research3` | 研究技能 / CAbilResearch | 升级 / Upgrade:`AresClassWeaponsSystemNova` | - | - |
| 1,2 | `FactoryResearch` | `FactoryResearch,Research5` | 研究技能 / CAbilResearch | 升级 / Upgrade:`DeploySpiderMinesNova` | - | - |
| 2,0 | `FactoryResearch` | `FactoryResearch,Research2` | 研究技能 / CAbilResearch | 升级 / Upgrade:`HellbatJumpJetAssault` | - | - |
| 2,1 | `FactoryResearch` | `FactoryResearch,Research4` | 研究技能 / CAbilResearch | 升级 / Upgrade:`NovaUnitLockdown` | - | - |
| 2,2 | `FactoryResearch` | `FactoryResearch,Research6` | 研究技能 / CAbilResearch | 升级 / Upgrade:`SiegeModeProgressiveRangeNova` | - | - |
| 2,3 | 升空 / `FactoryLiftOffNova` | `FactoryLiftOffNova,Execute` | 变形技能 / CAbilMorph | - | - | - |

### 导弹塔 / `MissileTurretNova`

- 来源 / Source：名册 / Roster XMFinal CommanderBuildings.galaxy，官方ID / Official ID MissileTurret，状态 / Status alias，模块 / Module XMNova.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146_CommanderBuildings.galaxy`
- 数值 / Stats：类型 / Type Structure，种族 / Race Terr，生命 / Life 250，费用 / Cost 100/0
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`BuildInProgress`(基础 / Basic)、`que1`、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`Detector11`、`FireSuppressionSystem`、`TerranBuildingBurnDown`
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,3 | `Detector` | `-` | 未解析 / Unresolved | - | - | NotUnderConstruction |

### 自动机炮 / `AutoTurret_BlackOps`

- 来源 / Source：名册 / Roster XMFinal CommanderBuildings.galaxy，官方ID / Official ID AutoTurret，状态 / Status alias，模块 / Module XMNova.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146_CommanderBuildings.galaxy`
- 数值 / Stats：类型 / Type Structure，种族 / Race Terr，生命 / Life 150，费用 / Cost 100/0
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`BuildInProgress`(基础 / Basic)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`FireSuppressionSystem`、`TerranBuildingBurnDown`
- 已隐藏基础按钮 / Hidden basic buttons：2 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

- 面板技能 / Panel skills：无 / None

## 生产链补充建筑 / Production-support Buildings

- 无 / None

## 单位 / Units

### 隐秘女妖 / `Banshee_BlackOps`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMNova.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race Terr，生命 / Life 350，费用 / Cost 350/187，补给 / Supply 3
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`Banshee_BlackOpsAirstrike`(目标效果技能 / CAbilEffectTarget)、`move`(基础 / Basic)、`stop`(基础 / Basic)、`WarpableNova`(CAbilWarpable / CAbilWarpable)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`BansheeBlackOpsPermanentCloak`、`DistortionBlasters`、`NovaStunResistance`、`VorazunCloakedShieldRegenPermanent`、`XN51CloakTechnologyNova`
- 已隐藏基础按钮 / Hidden basic buttons：6 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | `Banshee_BlackOpsAirstrike` | `Banshee_BlackOpsAirstrike,Execute` | 目标效果技能 / CAbilEffectTarget | - | 区域枚举效果 / CEffectEnumArea:`Banshee_BlackOpsAirstrikeSearch`、效果集合 / CEffectSet:`Banshee_BlackOpsAirstrikeSet` | - |

### `GhostNova`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMNova.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，能量 / Energy 0
- Catalog 技能链接 / Catalog ability links：`GhostHoldFire`、`GhostWeaponsFree`、`Snipe_BlackOps`(目标效果技能 / CAbilEffectTarget)、`WarpableNova`(CAbilWarpable / CAbilWarpable)
- 关联 Behavior / Linked behaviors：`BansheeBlackOpsPermanentCloak`
- 已隐藏基础按钮 / Hidden basic buttons：1 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| - | `Snipe_BlackOps` | `Snipe_BlackOps,255` | 目标效果技能 / CAbilEffectTarget | - | 效果集合 / CEffectSet:`Snipe_BlackOpsSet`、持续效果 / CEffectCreatePersistent:`Snipe_BlackOpsTripleTapDelayCP` | - |
| 1,0 | `PermanentlyCloakedGhost` | `-` | 未解析 / Unresolved | - | - | HaveNovaCommander |
| 1,3 | `GhostWeaponsFree` | `GhostWeaponsFree,Execute` | 未解析 / Unresolved | - | - | - |

### 强击歌利亚 / `Goliath_BlackOps`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMNova.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race Terr，生命 / Life 450，费用 / Cost 375/125，补给 / Supply 3
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`move`(基础 / Basic)、`stop`(基础 / Basic)、`WarpableNova`(CAbilWarpable / CAbilWarpable)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`MultilockTargetingSystems`、`NovaStunResistance`、`NovaUnitLockdownC`、`ScavengingSystemsMechDeath`
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | 锁定飞弹 / `NovaUnitLockdown` | `-` | 未解析 / Unresolved | - | - | HaveNovaUnitLockdown |
| 2,1 | `AresClassWeaponsSystem` | `-` | 未解析 / Unresolved | - | - | UseAresClassWeaponsSystem |

### 恶蝠游骑兵 / `HellbatBlackOps`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMNova.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race Terr，生命 / Life 550，费用 / Cost 250/0，补给 / Supply 2
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`HellbatCharge`(CAbilAugment / CAbilAugment)、`MorphToHellionBlackOps`(变形技能 / CAbilMorph)、`move`(基础 / Basic)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`NovaStunResistance`
- 可生产/创建 / Produced or created：`HellionBlackOps`（非本指挥官名册 / not in current commander roster）
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | `MorphToHellionBlackOps` | `MorphToHellionBlackOps,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:`HellionBlackOps` | - | - |
| 2,2 | `HellbatCharge` | `HellbatCharge,Execute` | CAbilAugment / CAbilAugment | - | 发射弹体效果 / CEffectLaunchMissile:`HellbatLeapLM` | - |
| 2,3 | `PassiveInfernalPreIgniter` | `-` | 未解析 / Unresolved | - | - | HaveInfernalPreigniter |

### 掠袭解放者 / `Liberator_BlackOps`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMNova.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race Terr，生命 / Life 450，费用 / Cost 375/375，补给 / Supply 3
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`Liberator_BlackOpsMorphtoAG`(变形技能 / CAbilMorph)、`LiberatorAG_BlackOpsTarget`(目标效果技能 / CAbilEffectTarget)、`LiberatorAGNova`(变形技能 / CAbilMorph)、`LiberatorMAGNova`(目标效果技能 / CAbilEffectTarget)、`move`(基础 / Basic)、`stop`(基础 / Basic)、`VehicleAfterburners`(瞬发效果技能 / CAbilEffectInstant)、`WarpableNova`(CAbilWarpable / CAbilWarpable)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`LiberatorTNova`、`NovaStunResistance`
- 可生产/创建 / Produced or created：`LiberatorAGUnitNova`（非本指挥官名册 / not in current commander roster）
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | `LiberatorMAGNova` | `LiberatorMAGNova,Execute` | 目标效果技能 / CAbilEffectTarget | 效果创建 / Effect creates:`LiberatorAGUnitNova` | 区域枚举效果 / CEffectEnumArea:`LiberatorAGAreaNova`、创建单位效果 / CEffectCreateUnit:`LiberatorMAGCUNova` | - |
| 2,2 | `MAFServosLiberator` | `-` | 未解析 / Unresolved | - | - | HaveLiberatorMAFServos |
| 2,3 | `LiberatorStructureAttack` | `-` | 未解析 / Unresolved | - | - | HaveLiberatorStructureAttack |

### 劫掠者突击手 / `Marauder_BlackOps`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMNova.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race Terr，生命 / Life 350，费用 / Cost 250/65，补给 / Supply 2
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`MagrailMunitionsMarauder`、磁轨武器 / `MagrailMunitionsNova`(CAbilAugment / CAbilAugment)、`move`(基础 / Basic)、`StimpackMarauder_BlackOps`、`stop`(基础 / Basic)、`WarpableNova`(CAbilWarpable / CAbilWarpable)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`NovaStunResistance`
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | 磁轨武器 / `MagrailMunitionsNova` | `MagrailMunitionsNova,Execute` | CAbilAugment / CAbilAugment | - | 发射弹体效果 / CEffectLaunchMissile:`MagrailMunitionsLMNova` | - |

### 精英陆战队员 / `Marine_BlackOps`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMNova.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race Terr，生命 / Life 150，费用 / Cost 125/0，补给 / Supply 1
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`move`(基础 / Basic)、强化剂 / `NovaSuperStim`(瞬发效果技能 / CAbilEffectInstant)、`stop`(基础 / Basic)、`SuperStimpackMarine`、`WarpableNova`(CAbilWarpable / CAbilWarpable)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`NovaStunResistance`
- 已隐藏基础按钮 / Hidden basic buttons：6 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | 强化剂 / `NovaSuperStim` | `NovaSuperStim,Execute` | 瞬发效果技能 / CAbilEffectInstant | - | - | - |
| 2,1 | `LaserTargetingSystemMarine` | `-` | 未解析 / Unresolved | - | - | HaveLaserTargetingSystemNova |

### 铁鸦II型 / `Raven_BlackOps`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMNova.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race Terr，生命 / Life 350，费用 / Cost 100/200，补给 / Supply 2
- Catalog 技能链接 / Catalog ability links：`BuildAutoTurret_BlackOps`(目标效果技能 / CAbilEffectTarget)、`InstantSeekerMissile_BlackOps`(目标效果技能 / CAbilEffectTarget)、`move`(基础 / Basic)、`PlaceHealingDrone`(目标效果技能 / CAbilEffectTarget)、捕食者飞弹 / `SeekerMissileNova`(目标效果技能 / CAbilEffectTarget)、`stop`(基础 / Basic)、`WarpableNova`(CAbilWarpable / CAbilWarpable)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`Detector11`、`NovaStunResistance`
- 可生产/创建 / Produced or created：`HealingDrone`（非本指挥官名册 / not in current commander roster）、`NovaACLaserTurret`（非本指挥官名册 / not in current commander roster）
- 已隐藏基础按钮 / Hidden basic buttons：6 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | `SuperScience` | `-` | 未解析 / Unresolved | - | - | HaveSuperScience |
| 1,1 | `HealingDroneHealBeam` | `-` | 未解析 / Unresolved | - | - | HaveHealingDroneCloakHealBeam |
| 2,0 | `BuildAutoTurret_BlackOps` | `BuildAutoTurret_BlackOps,Execute` | 目标效果技能 / CAbilEffectTarget | 效果创建 / Effect creates:`NovaACLaserTurret` | 伤害效果 / CEffectDamage:`AutoTurret_BlackOps`、创建单位效果 / CEffectCreateUnit:`AutoTurret_BlackOpsRelease` | - |
| 2,1 | `PlaceHealingDrone` | `PlaceHealingDrone,Execute` | 目标效果技能 / CAbilEffectTarget | 效果创建 / Effect creates:`HealingDrone` | 创建单位效果 / CEffectCreateUnit:`HealingDroneReleaseCreateUnit` | - |
| 2,2 | 捕食者飞弹 / `SeekerMissileNova` | `SeekerMissileNova,Execute` | 目标效果技能 / CAbilEffectTarget | - | 效果集合 / CEffectSet:`SeekerMissileSetNova` | - |
| 2,3 | `Detector` | `-` | 未解析 / Unresolved | - | - | - |

### `MercReaper`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMNova.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`WarpableNova`(CAbilWarpable / CAbilWarpable)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`ReaperRegen`
- 已隐藏基础按钮 / Hidden basic buttons：1 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,1 | `CombatDrugs` | `-` | 未解析 / Unresolved | - | - | - |

### 重型攻城坦克 / `SiegeTank_BlackOps`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMNova.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race Terr，生命 / Life 400，费用 / Cost 400/300，补给 / Supply 3
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`DeploySpiderMines`(目标效果技能 / CAbilEffectTarget)、`move`(基础 / Basic)、`SiegeTank_BlackOpsSiege`(变形技能 / CAbilMorph)、`stop`(基础 / Basic)、`WarpableNova`(CAbilWarpable / CAbilWarpable)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`NovaStunResistance`
- 可生产/创建 / Produced or created：`SiegeTankSieged_BlackOps`（非本指挥官名册 / not in current commander roster）
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | `SiegeTank_BlackOpsSiege` | `SiegeTank_BlackOpsSiege,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:`SiegeTankSieged_BlackOps` | 施加行为效果 / CEffectApplyBehavior:`SiegeModeProgressiveRangeAB` | - |
| 2,2 | `DeploySpiderMines` | `DeploySpiderMines,Execute` | 目标效果技能 / CAbilEffectTarget | - | 持续效果 / CEffectCreatePersistent:`DeploySpiderMinesCP` | - |

### `SCV`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster，状态 / Status exact，模块 / Module XMNova.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`AdvancedConstructionAuto`、`attack`(基础 / Basic)、`MapObjectInteract`(目标效果技能 / CAbilEffectTarget)、`move`(基础 / Basic)、`MutatorRemoveWorkerSleep`(瞬发效果技能 / CAbilEffectInstant)、`SCVHarvest`(采集技能 / CAbilHarvest)、喷漆-人类 / `SprayTerran`、`stop`(基础 / Basic)、`TerranBuild`(建造技能 / CAbilBuild)、`TerranBuildFullRefund`
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`KelMorianWorkerCloak`
- 可生产/创建 / Produced or created：`CommandCenter`，耗时 / Time 100s、幽灵军校 / `GhostAcademyNova`，耗时 / Time 40s、`HiveMindEmulator`（非本指挥官名册 / not in current commander roster），耗时 / Time 50s、`KelMorianGrenadeTurret`（非本指挥官名册 / not in current commander roster），耗时 / Time 26.25s、`KelMorianMissileTurret`（非本指挥官名册 / not in current commander roster），耗时 / Time 18.75s、`PerditionTurret`（非本指挥官名册 / not in current commander roster），耗时 / Time 23s、`PsiDisruptor`（非本指挥官名册 / not in current commander roster），耗时 / Time 50s

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

### `SCVNova`

- 来源 / Source：名册 / Roster XMFinal CommanderRosters.galaxy，官方ID / Official ID SCV，状态 / Status alias，模块 / Module XMNova.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146_CommanderRosters.galaxy`
- 数值 / Stats：类型 / Type Unit，种族 / Race Terr，生命 / Life 45，费用 / Cost 50/0，补给 / Supply 1
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`move`(基础 / Basic)、`Repair`、`SCVHarvest`(采集技能 / CAbilHarvest)、`stop`(基础 / Basic)、`TerranBuildNova`(建造技能 / CAbilBuild)
- 关联 Behavior / Linked behaviors：`NovaStunResistance`
- 可生产/创建 / Produced or created：`ArmoryNova`（非本指挥官名册 / not in current commander roster），耗时 / Time 65s、`AutomatedRefineryNova`（非本指挥官名册 / not in current commander roster），耗时 / Time 45s、兵营 / `BarracksNova`，耗时 / Time 65s、指挥中心 / `CommandCenterNova`，耗时 / Time 100s、`EngineeringBayNova`（非本指挥官名册 / not in current commander roster），耗时 / Time 35s、重工厂 / `FactoryNova`，耗时 / Time 60s、幽灵军校 / `GhostAcademyNova`，耗时 / Time 40s、导弹塔 / `MissileTurretNova`，耗时 / Time 25s、`NovaACLaserTurret`（非本指挥官名册 / not in current commander roster），耗时 / Time 15s、`StarportNova`（非本指挥官名册 / not in current commander roster），耗时 / Time 50s
- 已隐藏基础按钮 / Hidden basic buttons：8 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | `SCVHarvest` | `SCVHarvest,Gather` | 采集技能 / CAbilHarvest | - | - | - |
| 1,1 | `SCVHarvest` | `SCVHarvest,Return` | 采集技能 / CAbilHarvest | - | - | - |
| 2,0 | `TerranBuild` | `-` | 未解析 / Unresolved | - | - | - |
| 2,1 | `TerranBuildAdvanced` | `-` | 未解析 / Unresolved | - | - | - |
| 2,2 | `Repair` | `Repair,Execute` | 未解析 / Unresolved | - | - | - |
| 0,0 | 建造指挥中心 / `TerranBuildNova` | `TerranBuildNova,Build1` | 建造技能 / CAbilBuild | 指挥中心 / `CommandCenterNova`、单位 / Unit:指挥中心 / `CommandCenterNova` | - | - |
| 0,1 | 建造自动化精炼厂 / `TerranBuildNova` | `TerranBuildNova,Build19` | 建造技能 / CAbilBuild | `AutomatedRefineryNova`、单位 / Unit:`AutomatedRefineryNova` | - | - |
| 1,0 | 建造兵营 / `TerranBuildNova` | `TerranBuildNova,Build4` | 建造技能 / CAbilBuild | 兵营 / `BarracksNova`、单位 / Unit:兵营 / `BarracksNova` | - | - |
| 1,1 | 建造工程站 / `TerranBuildNova` | `TerranBuildNova,Build5` | 建造技能 / CAbilBuild | `EngineeringBayNova`、单位 / Unit:`EngineeringBayNova` | - | - |
| 2,0 | 建造磁轨炮塔 / `TerranBuildNova` | `TerranBuildNova,Build15` | 建造技能 / CAbilBuild | `NovaACLaserTurret`、单位 / Unit:`NovaACLaserTurret` | - | - |
| 2,1 | 建造导弹塔 / `TerranBuildNova` | `TerranBuildNova,Build6` | 建造技能 / CAbilBuild | 导弹塔 / `MissileTurretNova`、单位 / Unit:导弹塔 / `MissileTurretNova` | - | - |
| 0,0 | 建造幽灵军校 / `TerranBuildNova` | `TerranBuildNova,Build10` | 建造技能 / CAbilBuild | 幽灵军校 / `GhostAcademyNova`、单位 / Unit:幽灵军校 / `GhostAcademyNova` | - | - |
| 1,0 | 建造重工厂 / `TerranBuildNova` | `TerranBuildNova,Build11` | 建造技能 / CAbilBuild | 重工厂 / `FactoryNova`、单位 / Unit:重工厂 / `FactoryNova` | - | - |
| 1,1 | 建造军械库 / `TerranBuildNova` | `TerranBuildNova,Build14` | 建造技能 / CAbilBuild | `ArmoryNova`、单位 / Unit:`ArmoryNova` | - | - |
| 2,0 | 建造星港 / `TerranBuildNova` | `TerranBuildNova,Build12` | 建造技能 / CAbilBuild | `StarportNova`、单位 / Unit:`StarportNova` | - | - |

## 英雄 / Heroes

### 诺娃 / `NovaCoop`

- 来源 / Source：名册 / Roster inferred current Mod hero catalog unit，状态 / Status catalog ObjectType:Hero，模块 / Module XMNova.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMNova.SC2Mod/Base.SC2Data/GameData/UnitData.xml`
- 数值 / Stats：类型 / Type Hero，种族 / Race Terr，生命 / Life 250，能量 / Energy 100
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`move`(基础 / Basic)、`NovaBlink`(目标效果技能 / CAbilEffectTarget)、`NovaCoopCasterNuke`(目标效果技能 / CAbilEffectTarget)、`NovaCoopDecoyTarget`(目标效果技能 / CAbilEffectTarget)、`NovaEquipmentSwap`(CAbilSpecialize / CAbilSpecialize)、`NovaGadgetBoombots`(目标效果技能 / CAbilEffectTarget)、`NovaKitSwap`(行为/被动技能 / CAbilBehavior)、`NovaNukeTimer`、`NovaWeaponHellfireShotgunBlast`(目标效果技能 / CAbilEffectTarget)、`NovaWeaponImprovedCanisterRifleSnipe`(目标效果技能 / CAbilEffectTarget)、`NovaWeaponsFree`、`stop`(基础 / Basic)、`SuperCloakNova`(行为/被动技能 / CAbilBehavior)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`CommanderPrestigeNovaSuperCloak`、`HeroCCImmunity`、`NovaDecoyCooldown`、`NovaDetector`、`NovaHelmetGhostVisorDetector`、`NovaNukeCooldown`、`NovaPermanentlyCloaked`、`NovaWeaponHellfireShotgun`、`NovaWeaponImprovedCanisterRifle`
- 可生产/创建 / Produced or created：`NovaBoombot`（非本指挥官名册 / not in current commander roster）、`NovaCoopDecoy`（非本指挥官名册 / not in current commander roster）
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | `NovaDetectorPassive` | `-` | 未解析 / Unresolved | - | - | HaveNovaDetector |
| 1,1 | `NovaLifeRegen` | `-` | 未解析 / Unresolved | - | - | HaveNovaLifeRegen |
| 1,2 | `NovaStanceDance` | `-` | 未解析 / Unresolved | - | - | HaveNovaStanceDance |
| 1,4 | `SuperCloakNova` | `SuperCloakNova,Off` | 行为/被动技能 / CAbilBehavior | - | - | - |
| 1,4 | `SuperCloakNova` | `SuperCloakNova,On` | 行为/被动技能 / CAbilBehavior | - | - | - |
| 2,0 | 穿透爆弹 / `NovaWeaponHellfireShotgunBlast` | `NovaWeaponHellfireShotgunBlast,Execute` | 目标效果技能 / CAbilEffectTarget | - | - | - |
| 2,0 | `NovaWeaponImprovedCanisterRifleSnipe` | `NovaWeaponImprovedCanisterRifleSnipe,Execute` | 目标效果技能 / CAbilEffectTarget | - | 伤害效果 / CEffectDamage:`NovaSnipeR` | - |
| 2,1 | `NovaArmorCombatSuit` | `-` | 未解析 / Unresolved | - | - | HaveNovaCombatSuit |
| 2,1 | `NovaArmorStealthSuit` | `-` | 未解析 / Unresolved | - | - | - |
| 2,2 | `NovaBlink` | `NovaBlink,Execute` | 目标效果技能 / CAbilEffectTarget | - | 效果集合 / CEffectSet:`NovaBlinkSet` | - |
| 2,2 | `NovaGadgetBoombots` | `NovaGadgetBoombots,Execute` | 目标效果技能 / CAbilEffectTarget | 效果创建 / Effect creates:`NovaBoombot` | 伤害效果 / CEffectDamage:`NovaBoombotBoomDamage`、效果集合 / CEffectSet:`NovaCreateBoomBotsSet` | - |
| 2,3 | `NovaCoopDecoyTarget` | `NovaCoopDecoyTarget,Execute` | 目标效果技能 / CAbilEffectTarget | 效果创建 / Effect creates:`NovaCoopDecoy` | 创建单位效果 / CEffectCreateUnit:`NovaCoopDecoy` | - |
| 2,3 | `NovaCoopCasterNuke` | `NovaCoopCasterNuke,Execute` | 目标效果技能 / CAbilEffectTarget | - | 伤害效果 / CEffectDamage:`NovaCoopCasterNukeDamage`、持续效果 / CEffectCreatePersistent:`NovaCoopCasterNukePersistent` | - |
| 2,4 | `NovaKitSwap` | `NovaKitSwap,On` | 行为/被动技能 / CAbilBehavior | - | - | - |
| 2,4 | `NovaKitSwap` | `NovaKitSwap,Off` | 行为/被动技能 / CAbilBehavior | - | - | - |
