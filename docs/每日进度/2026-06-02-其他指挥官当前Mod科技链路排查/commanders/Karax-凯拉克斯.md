# 凯拉克斯 / `Karax` 科技链路排查 / Tech Tree Diagnostics

- 描述 / Description：星灵指挥官
- 数据来源 / Data source：当前 Mod / Current Mod，目录 / Directory：`合作指挥官版起义狂潮/Mods/XM/XMKarax.SC2Mod`
- 当前 Mod 运行名册 / Current Mod roster：module=`XMKarax.SC2Mod`，instance=`Karax`
- 统计 / Stats：建筑 6、生产链补充建筑 3、单位 8、英雄 0、建筑按钮 35、单位按钮 22、效果引用 10
- 名称显示 / Name display：能从当前 Mod zhCN 解析时显示“中文名 / `英文ID`”；仅显示 `ID` 表示当前 Mod 未找到可用中文名。

## 指挥官默认/顶部技能 / Commander Default / Top-panel Skills

| 技能名 / Skill Name | Ability/Cmd | 类型 / Type | 效果引用 / Effect References | Catalog 来源 / Catalog Sources |
| --- | --- | --- | --- | --- |
| 轨道轰炸 / `SOAOrbitalStrikeKarax` | `SOAOrbitalStrikeKarax,Execute` | 目标效果技能 / CAbilEffectTarget | 持续效果 / CEffectCreatePersistent:`SOAOrbitalStrikeCP`、区域枚举效果 / CEffectEnumArea:`SOAOrbitalStrikeImpactSearch` | xmkarax:1 |
| 净化光束 / `SOAThermalLanceActivate` | `SOAThermalLanceActivate,On` | 行为/被动技能 / CAbilBehavior | - | xmkarax:1 |
| `CommanderPrestigeKaraxChronoWaveLocked` | `-` | 未解析 / Unresolved | - | - |
| 时空波动 / `SOAMapWideChrono` | `SOAMapWideChrono,Execute` | 瞬发效果技能 / CAbilEffectInstant | 区域枚举效果 / CEffectEnumArea:`SOAMapWideChronoSearch` | xmkarax:1 |
| `PurifierBeamLocked` | `-` | 未解析 / Unresolved | - | - |
| `SOAPurifierBeam` | `SOAPurifierBeam,Execute` | 目标效果技能 / CAbilEffectTarget | - | xmfenix:1、xmzeratul:1 |
| `CommanderPrestigeKaraxChronoFieldLocked` | `-` | 未解析 / Unresolved | - | - |
| `SOAChronoPassive` | `-` | 未解析 / Unresolved | - | - |
| `SOAChronoPassiveLocked` | `-` | 未解析 / Unresolved | - | - |
| `ReconstructionBeamLocked` | `-` | 未解析 / Unresolved | - | - |
| `SOARepairBeam` | `-` | 未解析 / Unresolved | - | - |
| `SOARepairBeam` | `SOARepairBeam,Execute` | 目标效果技能 / CAbilEffectTarget | - | xmkarax:1 |
| `SOAThermalLanceTargetingDummy` | `SOAThermalLanceTargetingDummy,Execute` | 未解析 / Unresolved | - | - |
| `BuildInProgress` | `BuildInProgress,Cancel` | 未解析 / Unresolved | - | - |

## 建筑 / Buildings

### `Gateway`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMKarax.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`GatewayTrain`(训练技能 / CAbilTrain)、`que5notPassive`(队列技能 / CAbilQueue)、`Rally`(CAbilRally / CAbilRally)、`UpgradeToWarpGate`(变形技能 / CAbilMorph)
- 关联 Behavior / Linked behaviors：`ChronoBoostTarget`
- 可生产/创建 / Produced or created：激励者 / `SentryPurifier`、哨兵 / `ZealotPurifier`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| - | `que5notPassive` | `que5notPassive,CancelLast` | 队列技能 / CAbilQueue | - | - | - |
| 0,0 | `GatewayTrain` | `GatewayTrain,Train1` | 训练技能 / CAbilTrain | 哨兵 / `ZealotPurifier`、`ZealotShakuras`、单位 / Unit:哨兵 / `ZealotPurifier` | - | - |
| 0,1 | `GatewayTrain` | `GatewayTrain,Train6` | 训练技能 / CAbilTrain | 激励者 / `SentryPurifier`、`SentryAiur`、单位 / Unit:激励者 / `SentryPurifier` | - | - |

### 光子炮台 / `PhotonCannon`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMKarax.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`PhaseCannonProjection`、`stop`(基础 / Basic)
- 已隐藏基础按钮 / Hidden basic buttons：1 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | 强化瞄准 / `KaraxTurretRange` | `-` | 未解析 / Unresolved | - | - | HaveKaraxTurretRange |
| 2,1 | 军械优化 / `KaraxTurretAttackSpeed` | `-` | 未解析 / Unresolved | - | - | HaveKaraxTurretAttackSpeed |

### 护盾充能器 / `ShieldBattery`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMKarax.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Structure
- Catalog 技能链接 / Catalog ability links：`BuildInProgress`(基础 / Basic)、`ShieldBatteryRechargeChanneled`、充能 / `ShieldBatteryRechargeEx5`(目标效果技能 / CAbilEffectTarget)、`ShieldBatteryStructureBarrier`(目标效果技能 / CAbilEffectTarget)

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,1 | `ShieldBatteryStructureBarrier` | `ShieldBatteryStructureBarrier,Execute` | 目标效果技能 / CAbilEffectTarget | - | 施加行为效果 / CEffectApplyBehavior:`ShieldBatteryStructureBarrierAB` | - |
| 2,1 | `StructureBarrierLocked` | `-` | 未解析 / Unresolved | - | - | KaraxLevel06 |
| 2,2 | 强化瞄准 / `KaraxTurretRange` | `-` | 未解析 / Unresolved | - | - | HaveKaraxTurretRange |
| 2,3 | 快速恢复 / `KaraxEnergyRegenUpgrade` | `-` | 未解析 / Unresolved | - | - | HaveKaraxEnergyRegenUpgrade |

### 太阳锻炉 / `SolarForge`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMKarax.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Structure，种族 / Race Prot，生命 / Life 500，护盾 / Shields 500，费用 / Cost 200/200
- Catalog 技能链接 / Catalog ability links：`BrokenSolarForge`(变形技能 / CAbilMorph)、`BuildInProgress`(基础 / Basic)、`que5Passive`、`SolarForgeResearch`(研究技能 / CAbilResearch)
- 关联 Behavior / Linked behaviors：`ChronoBoostTarget`、`SolarForgeBeam`、`SolarForgePreventDestroy`
- 已隐藏基础按钮 / Hidden basic buttons：3 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | `SolarForgeResearch` | `SolarForgeResearch,Research1` | 研究技能 / CAbilResearch | 升级 / Upgrade:`SolarEfficiencyLevel1` | - | - |
| 0,0 | `SolarForgeResearch` | `SolarForgeResearch,Research2` | 研究技能 / CAbilResearch | 升级 / Upgrade:`SolarEfficiencyLevel2` | - | - |
| 0,0 | `SolarForgeResearch` | `SolarForgeResearch,Research3` | 研究技能 / CAbilResearch | 升级 / Upgrade:`SolarEfficiencyLevel3` | - | - |
| 0,0 | `ResearchSolarEfficiencyLevel3Locked` | `-` | 未解析 / Unresolved | - | - | KaraxLevel08 |
| 0,1 | `SolarForgeResearch` | `SolarForgeResearch,Research4` | 研究技能 / CAbilResearch | 升级 / Upgrade:`SOARepairBeamExtraTarget` | - | - |
| 0,1 | `ResearchSOARepairBeamExtraTargetLocked` | `-` | 未解析 / Unresolved | - | - | KaraxLevel08 |
| 0,2 | `SolarForgeResearch` | `SolarForgeResearch,Research5` | 研究技能 / CAbilResearch | 升级 / Upgrade:`SOAOrbitalStrikeUpgrade` | - | - |
| 0,2 | `ResearchSOAOrbitalStrikeUpgradeLocked` | `-` | 未解析 / Unresolved | - | - | KaraxLevel12 |
| 0,3 | `SolarForgeResearch` | `SolarForgeResearch,Research6` | 研究技能 / CAbilResearch | 升级 / Upgrade:`SOASolarLanceUpgrade` | - | - |
| 0,3 | `ResearchSOASolarLanceUpgradeLocked` | `-` | 未解析 / Unresolved | - | - | KaraxLevel12 |
| 2,0 | `SolarEfficiencyPassiveLevel1` | `-` | 未解析 / Unresolved | - | - | HaveSolarEfficiencyLevel1 |
| 2,0 | `SolarEfficiencyPassiveLevel2` | `-` | 未解析 / Unresolved | - | - | HaveSolarEfficiencyLevel2 |
| 2,0 | `SolarEfficiencyPassiveLevel3` | `-` | 未解析 / Unresolved | - | - | HaveSolarEfficiencyLevel3 |
| 2,1 | `SOARepairBeamExtraTargetPassive` | `-` | 未解析 / Unresolved | - | - | HaveSOARepairBeamExtraTarget |
| 2,2 | `SOAOrbitalStrikeUpgradePassive` | `-` | 未解析 / Unresolved | - | - | HaveSOAOrbitalStrikeUpgrade |
| 2,3 | `SOASolarLanceUpgradePassive` | `-` | 未解析 / Unresolved | - | - | HaveSOASolarLanceUpgrade |
| 0,0 | `BrokenSolarForge` | `BrokenSolarForge,Execute` | 变形技能 / CAbilMorph | - | - | - |

### `TwilightCouncil`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMKarax.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`BuildInProgress`(基础 / Basic)、`TwilightCouncilResearch`(研究技能 / CAbilResearch)
- 关联 Behavior / Linked behaviors：`ChronoBoostTarget`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | `TwilightCouncilResearch` | `TwilightCouncilResearch,Research1` | 研究技能 / CAbilResearch | - | - | - |
| 0,1 | `ResearchReconstructionLocked` | `-` | 未解析 / Unresolved | - | - | KaraxLevel04 |
| 0,1 | `TwilightCouncilResearch` | `TwilightCouncilResearch,Research10` | 研究技能 / CAbilResearch | 升级 / Upgrade:`ZealotResearchReconstruction` | - | - |
| 0,2 | `ResearchKaraxEnergyRegenLocked` | `-` | 未解析 / Unresolved | - | - | KaraxLevel04 |
| 0,2 | 研究快速恢复 / `TwilightCouncilResearch` | `TwilightCouncilResearch,Research14` | 研究技能 / CAbilResearch | 升级 / Upgrade:`KaraxEnergyRegenUpgrade` | - | - |
| 0,3 | `TwilightCouncilResearch` | `TwilightCouncilResearch,Research13` | 研究技能 / CAbilResearch | 升级 / Upgrade:`EnergizerReclamation` | - | - |
| 0,3 | `ResearchReclamationLocked` | `-` | 未解析 / Unresolved | - | - | KaraxLevel04 |

### 凯达琳巨石 / `KhaydarinMonolith`

- 来源 / Source：名册 / Roster XMFinal CommanderBuildings.galaxy，状态 / Status galaxy，模块 / Module XMKarax.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146_CommanderBuildings.galaxy`
- 数值 / Stats：类型 / Type Structure
- Catalog 技能链接 / Catalog ability links：无 / None

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | 强化瞄准 / `KaraxTurretRange` | `-` | 未解析 / Unresolved | - | - | HaveKaraxTurretRange |
| 2,1 | 军械优化 / `KaraxTurretAttackSpeed` | `-` | 未解析 / Unresolved | - | - | HaveKaraxTurretAttackSpeed |

## 生产链补充建筑 / Production-support Buildings

### `RoboticsFacility`

- 来源 / Source：名册 / Roster inferred production building，状态 / Status produces:ImmortalAiur/Colossus/Observer，模块 / Module XMKarax.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMKarax.SC2Mod/Base.SC2Data/GameData/UnitData.xml`
- 数值 / Stats：类型 / Type Structure
- Catalog 技能链接 / Catalog ability links：无 / None
- 关联 Behavior / Linked behaviors：`ChronoBoostTarget`
- 可生产/创建 / Produced or created：巨像 / `Colossus`、不朽者 / `ImmortalAiur`、侦测器 / `Observer`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | `RoboticsFacilityTrain` | `RoboticsFacilityTrain,Train4` | 训练技能 / CAbilTrain | 不朽者 / `ImmortalAiur`、单位 / Unit:不朽者 / `ImmortalAiur` | - | - |
| 0,1 | `RoboticsFacilityTrain` | `RoboticsFacilityTrain,Train3` | 训练技能 / CAbilTrain | 巨像 / `Colossus`、单位 / Unit:巨像 / `Colossus` | - | - |
| 0,2 | `RoboticsFacilityTrain` | `RoboticsFacilityTrain,Train2` | 训练技能 / CAbilTrain | 侦测器 / `Observer`、单位 / Unit:侦测器 / `Observer` | - | - |
| 3 | `WarpinDisruptor` | `-` | 未解析 / Unresolved | - | - | - |

### `Stargate`

- 来源 / Source：名册 / Roster inferred production building，状态 / Status produces:PhoenixPurifier/Scout/Carrier，模块 / Module XMKarax.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMKarax.SC2Mod/Base.SC2Data/GameData/UnitData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：无 / None
- 关联 Behavior / Linked behaviors：`ChronoBoostTarget`
- 可生产/创建 / Produced or created：航母 / `Carrier`、侦察机 / `PhoenixPurifier`、侦察机 / `Scout`
- 已隐藏基础按钮 / Hidden basic buttons：1 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | `StargateTrain` | `StargateTrain,Train1` | 训练技能 / CAbilTrain | 侦察机 / `PhoenixPurifier`、单位 / Unit:侦察机 / `PhoenixPurifier` | - | - |
| 0,1 | `StargateTrain` | `StargateTrain,Train6` | 训练技能 / CAbilTrain | 侦察机 / `Scout`、单位 / Unit:侦察机 / `Scout` | - | - |
| 0,2 | `StargateTrain` | `StargateTrain,Train3` | 训练技能 / CAbilTrain | 航母 / `Carrier`、单位 / Unit:航母 / `Carrier` | - | - |

### `WarpGate`

- 来源 / Source：名册 / Roster inferred production building，状态 / Status produces:ZealotPurifier/SentryPurifier，模块 / Module XMKarax.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMKarax.SC2Mod/Base.SC2Data/GameData/UnitData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：无 / None
- 关联 Behavior / Linked behaviors：`ChronoBoostTarget`
- 可生产/创建 / Produced or created：激励者 / `SentryPurifier`、哨兵 / `ZealotPurifier`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| - | `WarpGateTrain` | `WarpGateTrain,Train4` | 折跃/部署训练技能 / CAbilWarpTrain | - | - | - |
| 0,0 | `WarpGateTrain` | `WarpGateTrain,Train1` | 折跃/部署训练技能 / CAbilWarpTrain | 哨兵 / `ZealotPurifier`、单位 / Unit:哨兵 / `ZealotPurifier` | - | - |
| 0,1 | `WarpGateTrain` | `WarpGateTrain,Train6` | 折跃/部署训练技能 / CAbilWarpTrain | 激励者 / `SentryPurifier`、单位 / Unit:激励者 / `SentryPurifier` | - | - |

## 单位 / Units

### 不朽者 / `ImmortalAiur`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMKarax.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit
- Catalog 技能链接 / Catalog ability links：`ImmortalBarrierBase`、`ImmortalShakurasShadowCannon`
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| - | `ImmortalBarrierBase` | `ImmortalBarrierBase,Execute` | 未解析 / Unresolved | - | - | - |
| - | `ImmortalShakurasShadowCannon` | `ImmortalShakurasShadowCannon,Execute` | 未解析 / Unresolved | - | - | - |
| 1,0 | `HaveBarrier` | `-` | 未解析 / Unresolved | - | - | HaveBarrier |
| 2,1 | `ShadowCannonLocked` | `-` | 未解析 / Unresolved | - | - | KaraxLevel09 |

### 侦测器 / `Observer`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMKarax.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`move`(基础 / Basic)、`ObserverMorphtoObserverSiege`、`stop`(基础 / Basic)、`Warpable`
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `HaveGraviticBoosters` | `-` | 未解析 / Unresolved | - | - | HaveGraviticBoosters |
| 2,2 | `ObserverMorphtoObserverSiege` | `ObserverMorphtoObserverSiege,Execute` | 未解析 / Unresolved | - | - | - |
| 2,4 | `Detector` | `-` | 未解析 / Unresolved | - | - | - |

### 侦察机 / `PhoenixPurifier`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMKarax.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit
- Catalog 技能链接 / Catalog ability links：`MirageGravitonBeamVoidCampaign`
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| - | `MirageGravitonBeamVoidCampaign` | `MirageGravitonBeamVoidCampaign,Execute` | 未解析 / Unresolved | - | - | - |
| - | `GravitonBeamVoidCampaign` | `GravitonBeamVoidCampaign,Execute` | 未解析 / Unresolved | - | - | - |
| 2 | - | `-` | 未解析 / Unresolved | - | - | HaveMiragePhaseArmor |
| 2,1 | `AnionPulseCrystal` | `-` | 未解析 / Unresolved | - | - | HaveKaraxPhoenixRangeUpgrade |

### 侦察机 / `Scout`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMKarax.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，生命 / Life 150，护盾 / Shields 100，费用 / Cost 250/75
- Catalog 技能链接 / Catalog ability links：`FenixMojoScoutMorph`(变形技能 / CAbilMorph)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`

- 面板技能 / Panel skills：无 / None

### 激励者 / `SentryPurifier`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMKarax.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit
- Catalog 技能链接 / Catalog ability links：控制 / `EnergizerReclamation`(目标效果技能 / CAbilEffectTarget)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`VoidSentryChronoBeamRally`、`VoidSentryChronoBeamRallyB`
- 已隐藏基础按钮 / Hidden basic buttons：1 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,1 | 控制 / `EnergizerReclamation` | `EnergizerReclamation,Execute` | 目标效果技能 / CAbilEffectTarget | - | 效果集合 / CEffectSet:`ReclamationSet`、效果集合 / CEffectSet:`SentryReclamationSet` | - |
| 2,1 | `ReclamationLocked` | `-` | 未解析 / Unresolved | - | - | KaraxLevel04 |
| 2,4 | 快速恢复 / `KaraxEnergyRegenUpgrade` | `-` | 未解析 / Unresolved | - | - | HaveKaraxEnergyRegenUpgrade |

### 哨兵 / `ZealotPurifier`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMKarax.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit
- Catalog 技能链接 / Catalog ability links：`Charge`(CAbilAugment / CAbilAugment)、`FenixKaldalisZealotMorph`(变形技能 / CAbilMorph)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`FenixSuppressAvengingProtocol`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| - | - | `-` | 未解析 / Unresolved | - | - | ZealotPurifierReviveKaraxHide |
| 2,0 | `Charge` | `Charge,Execute` | CAbilAugment / CAbilAugment | - | - | - |
| 2,1 | `ReconstructionLocked` | `-` | 未解析 / Unresolved | - | - | KaraxLevel04 |

### 巨像 / `Colossus`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMKarax.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`move`(基础 / Basic)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,1 | `ExtendedThermalLance` | `-` | 未解析 / Unresolved | - | - | HaveKaraxExtendedThermalLance |
| 2,2 | 巨像 / `ColossusPassive` | `-` | 未解析 / Unresolved | - | - | HaveFireBeam |

### 航母 / `Carrier`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMKarax.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`CarrierHangar`、`CarrierRepairDroneHanger`(弹仓/机库技能 / CAbilArmMagazine)、`FenixClolarionCarrierMorph`(变形技能 / CAbilMorph)、`HangarQueue5`、`move`(基础 / Basic)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`Supply`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | `CarrierHangar` | `CarrierHangar,Ammo1` | 未解析 / Unresolved | - | - | - |
| 2,1 | `GravitonCatapult` | `-` | 未解析 / Unresolved | - | - | UseGravitonCatapult |
| 2,2 | `CarrierRepairDroneHanger` | `CarrierRepairDroneHanger,Ammo1` | 弹仓/机库技能 / CAbilArmMagazine | - | - | HaveCarrierRepairDrones |

## 英雄 / Heroes

- 无 / None
