# 霍纳与汉 / `Horner` 科技链路排查 / Tech Tree Diagnostics

- 描述 / Description：无 / None
- 数据来源 / Data source：当前 Mod / Current Mod，目录 / Directory：`合作指挥官版起义狂潮/Mods/XM/XMMira.SC2Mod`
- 当前 Mod 运行名册 / Current Mod roster：module=`XMMira.SC2Mod`，instance=`Mira`
- 统计 / Stats：建筑 2、生产链补充建筑 0、单位 10、英雄 0、建筑按钮 2、单位按钮 48、效果引用 18
- 名称显示 / Name display：能从当前 Mod zhCN 解析时显示“中文名 / `英文ID`”；仅显示 `ID` 表示当前 Mod 未找到可用中文名。

## 初始化/开局单位 / Initial Opener

| 槽位 / Slot | 单位 / Unit | 预期类型 / Expected Kind | Catalog 父级 / Catalog Parent | 是否在运行名册 / In Runtime Roster | 来源 / Source |
| --- | --- | --- | --- | --- | --- |
| 初始基地 / Command Center | 指挥中心 / `CommandCenterMira` | building | - | 否 / No | Catalog xmmira，Instance Mira，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMMira.SC2Mod/Base.SC2Data/GameData/UserData.xml` |
| 初始工人 / Worker | `SCVMira` | unit | - | 否 / No | Catalog xmmira，Instance Mira，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMMira.SC2Mod/Base.SC2Data/GameData/UserData.xml` |
| 第二初始单位 / Second Unit | 帝国星港 / `StarportMira` | unit | - | 否 / No | Catalog xmmira，Instance Mira，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMMira.SC2Mod/Base.SC2Data/GameData/UserData.xml` |

## 指挥官默认/顶部技能 / Commander Default / Top-panel Skills

| 技能名 / Skill Name | Ability/Cmd | 类型 / Type | 效果引用 / Effect References | Catalog 来源 / Catalog Sources |
| --- | --- | --- | --- | --- |
| `HHTrainTopBar` | `HHTrainTopBar,Build1` | 建造技能 / CAbilBuild | - | xmartanis:1、xmfenix:1、xmkarax:1、xmvorazun:1 |
| `HHBomberPlatformAreaBombTopBarOrder` | `HHBomberPlatformAreaBombTopBarOrder,Execute` | 目标效果技能 / CAbilEffectTarget | 区域枚举效果 / CEffectEnumArea:`HHBomberAreaBombSearchArea`、持续效果 / CEffectCreatePersistent:`HHBomberPlatformAreaBombTopBarOrderDummyCP` | xmartanis:1、xmfenix:1、xmkarax:1、xmkerrigan:1、另 4 个 |
| `HHBomberPlatformAreaBombTopBarDummyTimer` | `HHBomberPlatformAreaBombTopBarDummyTimer,Execute` | 未解析 / Unresolved | - | - |
| `UnlockHHBomberPlatformLocked` | `-` | 未解析 / Unresolved | - | - |
| `HornerAirFleetActivate` | `HornerAirFleetActivate,On` | 未解析 / Unresolved | - | - |
| `HornerAirFleetTargetingDummy` | `HornerAirFleetTargetingDummy,Execute` | 未解析 / Unresolved | - | - |
| `UnlockHHAirFleet` | `-` | 未解析 / Unresolved | - | - |
| `HHSummonMercenarySpaceStation` | `HHSummonMercenarySpaceStation,Execute` | 未解析 / Unresolved | - | - |
| `UnlockHHMercSpaceStation` | `-` | 未解析 / Unresolved | - | - |

## 建筑 / Buildings

### 太空站 / `MercenarySpaceStationMira`

- 来源 / Source：名册 / Roster XMFinal CommanderBuildings.galaxy，状态 / Status galaxy，模块 / Module XMMira.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146_CommanderBuildings.galaxy`
- 数值 / Stats：类型 / Type Structure，种族 / Race Terr，生命 / Life 1500
- Catalog 技能链接 / Catalog ability links：`MercSpaceStationHangarMira`(弹仓/机库技能 / CAbilArmMagazine)
- 关联 Behavior / Linked behaviors：`MercenarySpaceStationSuicideMira`

- 面板技能 / Panel skills：无 / None

### 导弹塔 / `MissileTurretMira`

- 来源 / Source：名册 / Roster XMFinal CommanderBuildings.galaxy，状态 / Status galaxy，模块 / Module XMMira.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146_CommanderBuildings.galaxy`
- 数值 / Stats：类型 / Type Structure，种族 / Race Terr，生命 / Life 300，费用 / Cost 125/0
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`BuildInProgress`(基础 / Basic)、`SalvageSharedMira`(行为/被动技能 / CAbilBehavior)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`Detector11`、`FireSuppressionSystem`、`TerranBuildingBurnDown`、`UnderConstruction`
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,1 | 回收 / `SalvageSharedMira` | `SalvageSharedMira,On` | 行为/被动技能 / CAbilBehavior | - | - | - |
| 2,3 | `Detector` | `-` | 未解析 / Unresolved | - | - | NotUnderConstruction |

## 生产链补充建筑 / Production-support Buildings

- 无 / None

## 单位 / Units

### `HHBattlecruiser`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMMira.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race Terr，生命 / Life 900，费用 / Cost 1000/800，补给 / Supply 10
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`HHBattlecruiserHyperjump`、`HHYamatoShots`(行为/被动技能 / CAbilBehavior)、`move`(基础 / Basic)、`que1`、`stop`(基础 / Basic)、`Yamato`(目标效果技能 / CAbilEffectTarget)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`HHArmyOOCRegenSpeed`、`HHYamatoShotsActivate`、`MassiveVoidRayVulnerability`
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,4 | `HHMSOHealth` | `-` | 未解析 / Unresolved | - | - | HaveHHSOBuff |
| 2,0 | `HHBattlecruiserHyperjump` | `HHBattlecruiserHyperjump,Execute` | 未解析 / Unresolved | - | - | - |
| 2,1 | `HHYamatoShots` | `HHYamatoShots,On` | 行为/被动技能 / CAbilBehavior | - | - | - |
| 2,1 | `UnlockHHBattlecruiserOverchargedReactorLocked` | `-` | 未解析 / Unresolved | - | - | HornerHanLevel13 |
| 2,2 | `HHYamatoShots` | `HHYamatoShots,Off` | 行为/被动技能 / CAbilBehavior | - | - | - |
| 2,4 | `HHArmyOOCRegen` | `-` | 未解析 / Unresolved | - | - | HaveHHArmyOOCRegen |

### `HHHellion`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMMira.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race Terr，生命 / Life 90，费用 / Cost 100/0，补给 / Supply 2
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`HHHellionBomb`(目标效果技能 / CAbilEffectTarget)、`MorphToHHHellionTank`、`move`(基础 / Basic)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`NoScrapDrop`
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,4 | `HHMSOAttackSpeed` | `-` | 未解析 / Unresolved | - | - | HaveHHSOBuff |
| 2,1 | `MorphToHHHellionTank` | `MorphToHHHellionTank,Execute` | 未解析 / Unresolved | - | - | - |
| 2,2 | `HHHellionBomb` | `HHHellionBomb,Execute` | 目标效果技能 / CAbilEffectTarget | - | 发射弹体效果 / CEffectLaunchMissile:`HHHellionBombLM` | - |
| 2,2 | `UnlockHHHellionInfernalGrenadesLocked` | `-` | 未解析 / Unresolved | - | - | HornerHanLevel09 |
| 2,3 | `HHHellionDeathStim` | `-` | 未解析 / Unresolved | - | - | HaveHHHellionStimDeath |

### `HHHellionTank`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status state-only，模块 / Module XMMira.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race Terr，生命 / Life 235，费用 / Cost 100/0，补给 / Supply 2
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`MorphToHHHellion`、`move`(基础 / Basic)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`NoScrapDrop`
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,4 | `HHMSOAttackSpeed` | `-` | 未解析 / Unresolved | - | - | HaveHHSOBuff |
| 2,0 | `MorphToHHHellion` | `MorphToHHHellion,Execute` | 未解析 / Unresolved | - | - | - |
| 2,2 | `HHHellionDeathFear` | `-` | 未解析 / Unresolved | - | - | HaveHHHellionFearDeath |
| 2,3 | `HHHellionAttackDoT` | `-` | 未解析 / Unresolved | - | - | HaveHHHellionAttackDoT |

### `HHRaven`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMMira.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race Terr，生命 / Life 140，费用 / Cost 100/200，补给 / Supply 2
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`FleetwideJump`(目标效果技能 / CAbilEffectTarget)、`HHRavenMorphtoHHRavenSiege`、`move`(基础 / Basic)、`RavenTargetLock`(目标效果技能 / CAbilEffectTarget)、`stop`(基础 / Basic)、`WarpableNova`(CAbilWarpable / CAbilWarpable)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`Detector11`、`HHArmyOOCRegenSpeed`、`HHRavenSensor`
- 已隐藏基础按钮 / Hidden basic buttons：6 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | `Detector` | `-` | 未解析 / Unresolved | - | - | - |
| 1,1 | `HHSuperRadar` | `-` | 未解析 / Unresolved | - | - | - |
| 1,4 | `HHMSOHealth` | `-` | 未解析 / Unresolved | - | - | HaveHHSOBuff |
| 2,0 | `FleetwideJump` | `FleetwideJump,Execute` | 目标效果技能 / CAbilEffectTarget | - | 创建单位效果 / CEffectCreateUnit:`FleetwideJumpCreatePrecursor` | - |
| 2,1 | `RavenTargetLock` | `RavenTargetLock,Execute` | 目标效果技能 / CAbilEffectTarget | - | 持续效果 / CEffectCreatePersistent:`RavenAnalyzeCP` | - |
| 2,2 | `HHRavenMorphtoHHRavenSiege` | `HHRavenMorphtoHHRavenSiege,Execute` | 未解析 / Unresolved | - | - | - |
| 2,4 | `HHArmyOOCRegen` | `-` | 未解析 / Unresolved | - | - | HaveHHArmyOOCRegen |

### `HHReaper`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMMira.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race Terr，生命 / Life 60，费用 / Cost 50/0，补给 / Supply 1
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`HHD8Charge`(目标效果技能 / CAbilEffectTarget)、`HHD8SingleCharge`(目标效果技能 / CAbilEffectTarget)、`HHReaperFly`、`move`(基础 / Basic)、`ReaperFlyMorph`、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`MercReaperJump`、`NoScrapDrop`、`ReaperRegen`
- 可生产/创建 / Produced or created：`HHD8SingleCluster`（非本指挥官名册 / not in current commander roster）
- 已隐藏基础按钮 / Hidden basic buttons：6 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,4 | `HHMSOAttackSpeed` | `-` | 未解析 / Unresolved | - | - | HaveHHSOBuff |
| 2,0 | `HHD8SingleCharge` | `HHD8SingleCharge,Execute` | 目标效果技能 / CAbilEffectTarget | 效果创建 / Effect creates:`HHD8SingleCluster` | 创建单位效果 / CEffectCreateUnit:`HHD8SingleCluster` | - |
| 2,1 | `HHReaperFly` | `HHReaperFly,Execute` | 未解析 / Unresolved | - | - | - |
| 2,3 | `CombatDrugs` | `-` | 未解析 / Unresolved | - | - | - |
| 2,4 | `HHReaperClusterBombs` | `-` | 未解析 / Unresolved | - | - | HaveHHReaperClusterBomb |

### `HHVikingFighter`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMMira.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race Terr，生命 / Life 350，费用 / Cost 400/250，补给 / Supply 4
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`FleetwideJump`(目标效果技能 / CAbilEffectTarget)、`HHAssaultMode`、`HHVikingRockets`(目标效果技能 / CAbilEffectTarget)、`move`(基础 / Basic)、`stop`(基础 / Basic)、`VehicleAfterburners`(瞬发效果技能 / CAbilEffectInstant)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`HHArmyOOCRegenSpeed`
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | `HHVikingPiercingAttacks` | `-` | 未解析 / Unresolved | - | - | HaveHHVikingPiercingAttack |
| 1,1 | `HHVikingMorphSpeed` | `-` | 未解析 / Unresolved | - | - | HaveHHVikingMorph |
| 1,4 | `HHMSOHealth` | `-` | 未解析 / Unresolved | - | - | HaveHHSOBuff |
| 2,0 | `FleetwideJump` | `FleetwideJump,Execute` | 目标效果技能 / CAbilEffectTarget | - | 创建单位效果 / CEffectCreateUnit:`FleetwideJumpCreatePrecursor` | - |
| 2,1 | `HHVikingRockets` | `HHVikingRockets,Execute` | 目标效果技能 / CAbilEffectTarget | - | 持续效果 / CEffectCreatePersistent:`HHVikingRocketsBurstPersistent`、伤害效果 / CEffectDamage:`HHVikingRocketsDamage` | - |
| 2,3 | `HHAssaultMode` | `HHAssaultMode,Execute` | 未解析 / Unresolved | - | - | - |
| 2,4 | `HHArmyOOCRegen` | `-` | 未解析 / Unresolved | - | - | HaveHHArmyOOCRegen |

### `HHWidowMine`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMMira.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race Terr，生命 / Life 90，费用 / Cost 100/0，补给 / Supply 2
- Catalog 技能链接 / Catalog ability links：`HHWidowMineBlossom`(瞬发效果技能 / CAbilEffectInstant)、`HHWidowMineBurrow`、`move`(基础 / Basic)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`HHWidowMineArmed`、`NoScrapDrop`
- 已隐藏基础按钮 / Hidden basic buttons：6 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,4 | `HHMSOAttackSpeed` | `-` | 未解析 / Unresolved | - | - | HaveHHSOBuff |
| 2,0 | `HHWidowMineBioSplash` | `-` | 未解析 / Unresolved | - | - | - |
| 2,0 | `HHWidowMineAttack` | `HHWidowMineAttack,Execute` | 目标效果技能 / CAbilEffectTarget | - | - | - |
| 2,1 | `HHWidowMineBurrow` | `HHWidowMineBurrow,Execute` | 未解析 / Unresolved | - | - | - |
| 2,3 | `HHWidowMineDeathBlossom` | `-` | 未解析 / Unresolved | - | - | HaveHHWidowMineDeathBlossom |
| 2,4 | `HHWidowMineAttack` | `HHWidowMineAttack,Execute` | 目标效果技能 / CAbilEffectTarget | - | - | HaveHHWidowMineAttackRange |

### `HHWraith`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMMira.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race Terr，生命 / Life 400，能量 / Energy 200，费用 / Cost 400/200，补给 / Supply 4
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`FleetwideJump`(目标效果技能 / CAbilEffectTarget)、`HHWraithCloak`、`move`(基础 / Basic)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`HHArmyOOCRegenSpeed`、`HHWraithPermanentCloak`、`VorazunCloakedShieldRegenPermanent`
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,4 | `HHMSOHealth` | `-` | 未解析 / Unresolved | - | - | HaveHHSOBuff |
| 2,0 | `FleetwideJump` | `FleetwideJump,Execute` | 目标效果技能 / CAbilEffectTarget | - | 创建单位效果 / CEffectCreateUnit:`FleetwideJumpCreatePrecursor` | - |
| 2,1 | `HHWraithPermaCloak` | `-` | 未解析 / Unresolved | - | - | HaveHHWraithPermaCloak |
| 2,1 | `HHWraithCloak` | `HHWraithCloak,On` | 未解析 / Unresolved | - | - | - |
| 2,2 | `HHWraithCloak` | `HHWraithCloak,Off` | 未解析 / Unresolved | - | - | - |
| 2,3 | `HHWraithFury` | `-` | 未解析 / Unresolved | - | - | HaveHHWraithFury |
| 2,4 | `HHArmyOOCRegen` | `-` | 未解析 / Unresolved | - | - | HaveHHArmyOOCRegen |

### `Predator`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMMira.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit
- Catalog 技能链接 / Catalog ability links：无 / None

- 面板技能 / Panel skills：无 / None

### `Liberator`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMMira.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`VehicleAfterburners`(瞬发效果技能 / CAbilEffectInstant)、`WarpableNova`(CAbilWarpable / CAbilWarpable)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,1 | `VehicleAfterburners` | `VehicleAfterburners,Execute` | 瞬发效果技能 / CAbilEffectInstant | - | 施加行为效果 / CEffectApplyBehavior:`VehicleAfterburnersAB` | - |

## 英雄 / Heroes

- 无 / None
