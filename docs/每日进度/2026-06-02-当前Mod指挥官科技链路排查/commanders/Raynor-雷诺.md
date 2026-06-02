# 雷诺 / `Raynor` 科技链路排查 / Tech Tree Diagnostics

- 描述 / Description：无 / None
- 数据来源 / Data source：当前 Mod / Current Mod，目录 / Directory：`合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod`
- 当前 Mod 运行名册 / Current Mod roster：module=`XMRaynor.SC2Mod`，instance=`Raynor`
- 统计 / Stats：建筑 6、生产链补充建筑 0、单位 10、英雄 0、建筑按钮 22、单位按钮 20、效果引用 6
- 名称显示 / Name display：能从当前 Mod zhCN 解析时显示“中文名 / `英文ID`”；仅显示 `ID` 表示当前 Mod 未找到可用中文名。

## 指挥官默认/顶部技能 / Commander Default / Top-panel Skills

| 技能名 / Skill Name | Ability/Cmd | 类型 / Type | 效果引用 / Effect References | Catalog 来源 / Catalog Sources |
| --- | --- | --- | --- | --- |
| `VoidCoopSummonHyperion` | `VoidCoopSummonHyperion,Execute` | 目标效果技能 / CAbilEffectTarget | 创建单位效果 / CEffectCreateUnit:`SummonHyperionCreateUnit` | xmraynor:1 |
| `BansheeAirstrike` | `BansheeAirstrike,Execute` | 目标效果技能 / CAbilEffectTarget | 区域枚举效果 / CEffectEnumArea:`BansheeAirstrikeSearch` | xmraynor:1 |
| `BansheeAirstrikeLocked` | `-` | 未解析 / Unresolved | - | - |
| `BuildInProgress` | `BuildInProgress,Cancel` | 未解析 / Unresolved | - | - |

## 建筑 / Buildings

### `Barracks`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMRaynor.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`BarracksAddOns`、`BarracksLiftOff`、`BarracksTrain`(训练技能 / CAbilTrain)、`BarracksTrainNova`(折跃/部署训练技能 / CAbilWarpTrain)、`BuildInProgress`(基础 / Basic)、`Rally`(CAbilRally / CAbilRally)
- 关联 Behavior / Linked behaviors：`ChronoBoostBlackOpsBarracks`、`ChronoBoostTarget`
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0 | `OrbitalDropPodsPassive` | `-` | 未解析 / Unresolved | - | - | HaveOrbitalDropPods |
| 0 | `BarracksAddOns` | `BarracksAddOns,Build1` | 未解析 / Unresolved | - | - | - |
| 0 | `BarracksAddOns` | `BarracksAddOns,Build4` | 未解析 / Unresolved | - | - | - |
| 1 | `BarracksAddOns` | `BarracksAddOns,Build2` | 未解析 / Unresolved | - | - | - |
| 0,2 | `BarracksTrain` | `BarracksTrain,Train6` | 训练技能 / CAbilTrain | - | - | - |
| 0,3 | `BarracksTrain` | `BarracksTrain,Train5` | 训练技能 / CAbilTrain | - | - | - |
| 1,4 | `Rally` | `Rally,Rally1` | CAbilRally / CAbilRally | - | - | - |
| 2 | `BarracksLiftOff` | `BarracksLiftOff,Execute` | 未解析 / Unresolved | - | - | - |
| 2,1 | `BarracksAddOns` | `BarracksAddOns,Build3` | 未解析 / Unresolved | - | - | - |
| 2,2 | `BarracksAddOns` | `BarracksAddOns,Build3` | 未解析 / Unresolved | - | - | - |

### `SupplyDepot`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMRaynor.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`BuildInProgress`(基础 / Basic)、`SupplyDepotLower`

- 面板技能 / Panel skills：无 / None

### 地堡 / `Bunker`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMRaynor.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`AttackRedirect`、`BuildInProgress`(基础 / Basic)、`BunkerTransport`、`Rally`(CAbilRally / CAbilRally)、`SalvageEffect`、`SalvageShared`(行为/被动技能 / CAbilBehavior)、`StimpackMarauderRedirect`、`StopRedirect`
- 已隐藏基础按钮 / Hidden basic buttons：1 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | `NeoSteelFrame` | `-` | 未解析 / Unresolved | - | - | UseNeoSteelFrame |
| 1,2 | `FortifiedBunker` | `-` | 未解析 / Unresolved | - | - | HaveFortifiedBunkerCarapace |

### 导弹塔 / `MissileTurret`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMRaynor.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`BuildInProgress`(基础 / Basic)、`SalvageShared`(行为/被动技能 / CAbilBehavior)、`stop`(基础 / Basic)

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | `HellstormMissileBatteries` | `-` | 未解析 / Unresolved | - | - | HailstormMissilePods |
| 2,0 | `SalvageShared` | `SalvageShared,On` | 行为/被动技能 / CAbilBehavior | - | - | - |
| 2,1 | `HaveHiSecAutoTracking` | `-` | 未解析 / Unresolved | - | - | HaveTerranDefenseRangeBonus |
| 2,2 | `HaveImprovedTurretAttackSpeed` | `-` | 未解析 / Unresolved | - | - | HaveSwannTurretIncreasedAttackSpeed |

### `CommandCenter`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMRaynor.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：提供补给 / Supply provided 15
- Catalog 技能链接 / Catalog ability links：`BuildInProgress`(基础 / Basic)、`CommandCenterTrain`(训练技能 / CAbilTrain)、`CommandCenterTransport`(运输技能 / CAbilTransport)、`RallyCommand`、`UpgradeToOrbital`(变形技能 / CAbilMorph)、`UpgradeToOrbitalCoop`、`UpgradeToPlanetaryFortress`、`VespeneDroneCast`
- 关联 Behavior / Linked behaviors：`ChronoBoostTarget`
- 已隐藏基础按钮 / Hidden basic buttons：1 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,4 | `RallyCommand` | `RallyCommand,Rally2` | 未解析 / Unresolved | - | - | - |
| 2,2 | `NeoSteelFrameCommandCenter` | `-` | 未解析 / Unresolved | - | - | HaveNeosteelFrame |

### 轨道控制基地 / `OrbitalCommand`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMRaynor.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：提供补给 / Supply provided 15
- Catalog 技能链接 / Catalog ability links：`CommandCenterTrain`(训练技能 / CAbilTrain)、`OrbitalCommandSupplyDepotDrop`、`OrbitalLiftOff`、`que5CancelToSelection`、`RallyCommand`、`ScannerSweep`、`SupplyDrop`
- 关联 Behavior / Linked behaviors：`ChronoBoostTarget`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| - | `OrbitalCommandSupplyDepotDrop` | `OrbitalCommandSupplyDepotDrop,Build1` | 未解析 / Unresolved | - | - | - |
| 1,4 | `RallyCommand` | `RallyCommand,Rally2` | 未解析 / Unresolved | - | - | - |
| 2,0 | `CommanderPrestigeRaynorMULELocked` | `-` | 未解析 / Unresolved | - | - | CommanderPrestigeRaynorBio |
| 2,1 | `SupplyDrop` | `SupplyDrop,Execute` | 未解析 / Unresolved | - | - | - |

## 生产链补充建筑 / Production-support Buildings

- 无 / None

## 单位 / Units

### `Marine`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMRaynor.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`move`(基础 / Basic)、`Stimpack`、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | `Stimpack` | `Stimpack,Execute` | 未解析 / Unresolved | - | - | - |
| 2,1 | `HaveShieldWall` | `-` | 未解析 / Unresolved | - | - | HaveShieldWall |

### `Medic`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMRaynor.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit
- Catalog 技能链接 / Catalog ability links：`HealPlusMech`(目标效果技能 / CAbilEffectTarget)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | `HealPlusMech` | `HealPlusMech,Execute` | 目标效果技能 / CAbilEffectTarget | - | - | - |

### 秃鹫 / `Vulture`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMRaynor.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit
- Catalog 技能链接 / Catalog ability links：`VehicleAfterburners`(瞬发效果技能 / CAbilEffectInstant)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`
- 已隐藏基础按钮 / Hidden basic buttons：1 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,2 | `AfterburnersLocked` | `-` | 未解析 / Unresolved | - | - | RaynorLevel11 |
| 2,2 | `VehicleAfterburners` | `VehicleAfterburners,Execute` | 瞬发效果技能 / CAbilEffectInstant | - | 施加行为效果 / CEffectApplyBehavior:`VehicleAfterburnersAB` | - |

### `Firebat`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMRaynor.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit
- Catalog 技能链接 / Catalog ability links：`StimpackMarauder`
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`
- 已隐藏基础按钮 / Hidden basic buttons：2 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | `StimpackMarauder` | `StimpackMarauder,Execute` | 未解析 / Unresolved | - | - | - |

### `SCV`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMRaynor.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`AdvancedConstructionAuto`、`attack`(基础 / Basic)、`MapObjectInteract`(目标效果技能 / CAbilEffectTarget)、`move`(基础 / Basic)、`MutatorRemoveWorkerSleep`(瞬发效果技能 / CAbilEffectInstant)、`SCVHarvest`(采集技能 / CAbilHarvest)、喷漆-人类 / `SprayTerran`、`stop`(基础 / Basic)、`TerranBuild`(建造技能 / CAbilBuild)、`TerranBuildFullRefund`
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`KelMorianWorkerCloak`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,3 | 喷漆-人类 / `SprayTerran` | `SprayTerran,Execute` | 未解析 / Unresolved | - | - | - |
| 1,0 | `SwannBarracks` | `-` | 未解析 / Unresolved | - | - | HaveSwannCommander |
| 2,0 | `TerranBuild` | `TerranBuild,Build23` | 建造技能 / CAbilBuild | - | - | - |
| 2,1 | `BuildFusionCoreLocked` | `-` | 未解析 / Unresolved | - | - | RaynorLevel06 |

### `Viking`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMRaynor.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：无 / None

- 面板技能 / Panel skills：无 / None

### `Banshee`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMRaynor.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`BansheeCloak`、`move`(基础 / Basic)、`stop`(基础 / Basic)、`VehicleAfterburners`(瞬发效果技能 / CAbilEffectInstant)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`VorazunCloakedShieldRegenPermanent`
- 已隐藏基础按钮 / Hidden basic buttons：2 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,2 | `AfterburnersLocked` | `-` | 未解析 / Unresolved | - | - | RaynorLevel11 |
| 2,2 | `VehicleAfterburners` | `VehicleAfterburners,Execute` | 瞬发效果技能 / CAbilEffectInstant | - | 施加行为效果 / CEffectApplyBehavior:`VehicleAfterburnersAB` | - |

### `Marauder`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMRaynor.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`move`(基础 / Basic)、`StimpackMarauder`、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | `StimpackMarauder` | `StimpackMarauder,Execute` | 未解析 / Unresolved | - | - | - |

### `Battlecruiser`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMRaynor.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：生命 / Life 550
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`BattlecruiserAttack`、`BattlecruiserMove`、`BattlecruiserStop`、`Hyperjump`(目标效果技能 / CAbilEffectTarget)、`HyperjumpNoVision`、`move`(基础 / Basic)、`stop`(基础 / Basic)、`VehicleAfterburners`(瞬发效果技能 / CAbilEffectInstant)、`Yamato`(目标效果技能 / CAbilEffectTarget)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| - | `HyperjumpNoVision` | `HyperjumpNoVision,Execute` | 未解析 / Unresolved | - | - | - |
| 2,2 | `AfterburnersLocked` | `-` | 未解析 / Unresolved | - | - | RaynorLevel11 |
| 2,2 | `VehicleAfterburners` | `VehicleAfterburners,Execute` | 瞬发效果技能 / CAbilEffectInstant | - | 施加行为效果 / CEffectApplyBehavior:`VehicleAfterburnersAB` | - |

### 攻城坦克 / `SiegeTank`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMRaynor.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`move`(基础 / Basic)、`SiegeMode`、`SiegeTankWreckage`(变形技能 / CAbilMorph)、`stop`(基础 / Basic)、`VehicleAfterburners`(瞬发效果技能 / CAbilEffectInstant)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`
- 已隐藏基础按钮 / Hidden basic buttons：1 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,2 | `AfterburnersLocked` | `-` | 未解析 / Unresolved | - | - | RaynorLevel11 |
| 2,2 | `VehicleAfterburners` | `VehicleAfterburners,Execute` | 瞬发效果技能 / CAbilEffectInstant | - | 施加行为效果 / CEffectApplyBehavior:`VehicleAfterburnersAB` | - |
| 2,3 | `ImprovedSiegeMode` | `-` | 未解析 / Unresolved | - | - | HaveImprovedSiegeMode |
| 2,3 | `MaelstromRounds` | `-` | 未解析 / Unresolved | - | - | HaveMaelstromRounds |

## 英雄 / Heroes

- 无 / None
