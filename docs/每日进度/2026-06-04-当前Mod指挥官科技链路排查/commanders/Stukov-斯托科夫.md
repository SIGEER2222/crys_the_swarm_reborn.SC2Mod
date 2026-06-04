# 斯托科夫 / `Stukov` 科技链路排查 / Tech Tree Diagnostics

- 描述 / Description：无 / None
- 数据来源 / Data source：当前 Mod / Current Mod，目录 / Directory：`合作指挥官版起义狂潮/Mods/XM/XMStukov.SC2Mod`
- 当前 Mod 运行名册 / Current Mod roster：module=`XMStukov.SC2Mod`，instance=`Stukov`
- 统计 / Stats：建筑 11、生产链补充建筑 0、单位 8、英雄 2、建筑按钮 71、单位按钮 32、效果引用 38
- 名称显示 / Name display：能从当前 Mod zhCN 解析时显示“中文名 / `英文ID`”；仅显示 `ID` 表示当前 Mod 未找到可用中文名。

## 初始化/开局单位 / Initial Opener

| 槽位 / Slot | 单位 / Unit | 预期类型 / Expected Kind | Catalog 父级 / Catalog Parent | 是否在运行名册 / In Runtime Roster | 来源 / Source |
| --- | --- | --- | --- | --- | --- |
| 初始基地 / Command Center | 被感染的指挥中心 / `SICommandCenter` | building | - | 是 / Yes | Catalog xmstukov，Instance Stukov，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMStukov.SC2Mod/Base.SC2Data/GameData/UserData.xml`，名册状态 / Roster status exact |
| 初始工人 / Worker | 被感染的SCV / `SISCV` | unit | - | 否 / No | Catalog xmstukov，Instance Stukov，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMStukov.SC2Mod/Base.SC2Data/GameData/UserData.xml` |
| 第二初始单位 / Second Unit | 被感染的移民营 / `SICivilianStructure` | unit | - | 是 / Yes | Catalog xmstukov，Instance Stukov，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMStukov.SC2Mod/Base.SC2Data/GameData/UserData.xml`，名册状态 / Roster status exact |

## 指挥官默认/顶部技能 / Commander Default / Top-panel Skills

| 技能名 / Skill Name | Ability/Cmd | 类型 / Type | 效果引用 / Effect References | Catalog 来源 / Catalog Sources |
| --- | --- | --- | --- | --- |
| `SIStukovPlaceHordeT` | `SIStukovPlaceHordeT,Execute` | 目标效果技能 / CAbilEffectTarget | CEffectTeleport / CEffectTeleport:`SIStukovPlaceHordeTC` | xmstukov:1 |
| `SIStukovInfestStructureUpgraded` | `SIStukovInfestStructureUpgraded,Execute` | 目标效果技能 / CAbilEffectTarget | 效果集合 / CEffectSet:`SIStukovInfestStructureInitialSet` | xmstukov:1 |
| `StukovSummonApocalisk` | `StukovSummonApocalisk,Execute` | 目标效果技能 / CAbilEffectTarget | 创建单位效果 / CEffectCreateUnit:`StukovSummonApocaliskCU` | xmstukov:1 |
| `StukovSummonAleksander` | `StukovSummonAleksander,Execute` | 目标效果技能 / CAbilEffectTarget | 创建单位效果 / CEffectCreateUnit:`StukovSummonAleksanderCU` | xmstukov:1 |

## 建筑 / Buildings

### 被感染的工程站 / `SIEngineeringBay`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMStukov.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Structure，种族 / Race InfT，生命 / Life 850，费用 / Cost 125/0
- Catalog 技能链接 / Catalog ability links：`BuildInProgress`(基础 / Basic)、`que5`(队列技能 / CAbilQueue)、`SIEngineeringBayResearch`(研究技能 / CAbilResearch)
- 关联 Behavior / Linked behaviors：`ZergBuildingDies6`
- 已隐藏基础按钮 / Hidden basic buttons：4 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | 升级步兵武器等级4 / `SIEngineeringBayResearch` | `SIEngineeringBayResearch,Research9` | 研究技能 / CAbilResearch | 升级 / Upgrade:`SIInfantryWeaponsLv4` | - | - |
| 0,0 | 升级步兵武器等级5 / `SIEngineeringBayResearch` | `SIEngineeringBayResearch,Research10` | 研究技能 / CAbilResearch | 升级 / Upgrade:`SIInfantryWeaponsLv5` | - | - |
| 0,0 | `SIEngineeringBayResearch` | `SIEngineeringBayResearch,Research1` | 研究技能 / CAbilResearch | 升级 / Upgrade:`SIInfantryWeaponsLv1` | - | - |
| 0,0 | `SIEngineeringBayResearch` | `SIEngineeringBayResearch,Research2` | 研究技能 / CAbilResearch | 升级 / Upgrade:`SIInfantryWeaponsLv2` | - | - |
| 0,0 | `SIEngineeringBayResearch` | `SIEngineeringBayResearch,Research3` | 研究技能 / CAbilResearch | 升级 / Upgrade:`SIInfantryWeaponsLv3` | - | - |
| 0,1 | 升级步兵护甲等级4 / `SIEngineeringBayResearch` | `SIEngineeringBayResearch,Research7` | 研究技能 / CAbilResearch | 升级 / Upgrade:`SIInfantryArmorLv4` | - | - |
| 0,1 | 升级步兵护甲等级5 / `SIEngineeringBayResearch` | `SIEngineeringBayResearch,Research8` | 研究技能 / CAbilResearch | 升级 / Upgrade:`SIInfantryArmorLv5` | - | - |
| 0,1 | `SIEngineeringBayResearch` | `SIEngineeringBayResearch,Research4` | 研究技能 / CAbilResearch | 升级 / Upgrade:`SIInfantryArmorLv1` | - | - |
| 0,1 | `SIEngineeringBayResearch` | `SIEngineeringBayResearch,Research5` | 研究技能 / CAbilResearch | 升级 / Upgrade:`SIInfantryArmorLv2` | - | - |
| 0,1 | `SIEngineeringBayResearch` | `SIEngineeringBayResearch,Research6` | 研究技能 / CAbilResearch | 升级 / Upgrade:`SIInfantryArmorLv3` | - | - |
| 2,0 | `SIEngineeringBayResearch` | `SIEngineeringBayResearch,Research13` | 研究技能 / CAbilResearch | 升级 / Upgrade:`SIBunkerLifeRegen` | - | - |
| 2,1 | `SIEngineeringBayResearch` | `SIEngineeringBayResearch,Research12` | 研究技能 / CAbilResearch | 升级 / Upgrade:`SIBunkerArmor` | - | - |
| 2,2 | `SIMissileTurretPassive` | `-` | 未解析 / Unresolved | - | - | - |

### 被感染的军械库 / `SIArmory`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMStukov.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Structure，种族 / Race InfT，生命 / Life 750，费用 / Cost 150/100
- Catalog 技能链接 / Catalog ability links：`ArmoryResearchVoidCoop`(研究技能 / CAbilResearch)、`BuildInProgress`(基础 / Basic)、`que5`(队列技能 / CAbilQueue)、`SIArmoryResearch`(研究技能 / CAbilResearch)
- 关联 Behavior / Linked behaviors：`ChronoBoostTarget`、`OnCreep`、`ZergBuildingDies6`、`ZergBuildingNotOnCreep`
- 已隐藏基础按钮 / Hidden basic buttons：4 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | 升级战车武器等级4 / `SIArmoryResearch` | `SIArmoryResearch,Research11` | 研究技能 / CAbilResearch | 升级 / Upgrade:`SITerranVehicleWeaponsLv4` | - | - |
| 0,0 | 升级战车武器等级5 / `SIArmoryResearch` | `SIArmoryResearch,Research12` | 研究技能 / CAbilResearch | 升级 / Upgrade:`SITerranVehicleWeaponsLv5` | - | - |
| 0,0 | `SIArmoryResearch` | `SIArmoryResearch,Research6` | 研究技能 / CAbilResearch | 升级 / Upgrade:`SITerranVehicleWeaponsLv1` | - | - |
| 0,0 | `SIArmoryResearch` | `SIArmoryResearch,Research7` | 研究技能 / CAbilResearch | 升级 / Upgrade:`SITerranVehicleWeaponsLv2` | - | - |
| 0,0 | `SIArmoryResearch` | `SIArmoryResearch,Research8` | 研究技能 / CAbilResearch | 升级 / Upgrade:`SITerranVehicleWeaponsLv3` | - | - |
| 0,1 | 升级战车钢板等级4 / `SIArmoryResearch` | `SIArmoryResearch,Research9` | 研究技能 / CAbilResearch | 升级 / Upgrade:`SITerranVehicleArmorsLv4` | - | - |
| 0,1 | 升级战车钢板等级5 / `SIArmoryResearch` | `SIArmoryResearch,Research10` | 研究技能 / CAbilResearch | 升级 / Upgrade:`SITerranVehicleArmorsLv5` | - | - |
| 0,1 | `SIArmoryResearch` | `SIArmoryResearch,Research3` | 研究技能 / CAbilResearch | 升级 / Upgrade:`SITerranVehicleArmorsLv1` | - | - |
| 0,1 | `SIArmoryResearch` | `SIArmoryResearch,Research4` | 研究技能 / CAbilResearch | 升级 / Upgrade:`SITerranVehicleArmorsLv2` | - | - |
| 0,1 | `SIArmoryResearch` | `SIArmoryResearch,Research5` | 研究技能 / CAbilResearch | 升级 / Upgrade:`SITerranVehicleArmorsLv3` | - | - |

### 被感染的兵营 / `SIBarracks`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMStukov.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Structure，种族 / Race InfT，生命 / Life 1000，费用 / Cost 150/0
- Catalog 技能链接 / Catalog ability links：`BuildInProgress`(基础 / Basic)、`SIBarracksAddOns`(建造技能 / CAbilBuild)、`SIBarracksLiftOff`(变形技能 / CAbilMorph)、`SIBarracksTrain`(训练技能 / CAbilTrain)、`SIStukovPlaceHordeRally`(目标效果技能 / CAbilEffectTarget)
- 关联 Behavior / Linked behaviors：`ChronoBoostTarget`、`OnCreep`、`ZergBuildingDies6`、`ZergBuildingNotOnCreep`
- 可生产/创建 / Produced or created：`SIBarracksTechLab`（非本指挥官名册 / not in current commander roster），耗时 / Time 25s、`SICocoonInfestedMarine`（非本指挥官名册 / not in current commander roster）
- 已隐藏基础按钮 / Hidden basic buttons：4 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | `SIBarracksTrain` | `SIBarracksTrain,Train1` | 训练技能 / CAbilTrain | `SICocoonInfestedMarine`、单位 / Unit:`SICocoonInfestedMarine` | - | - |
| 1,4 | `SIStukovPlaceHordeRally` | `SIStukovPlaceHordeRally,Execute` | 目标效果技能 / CAbilEffectTarget | - | 效果集合 / CEffectSet:`SIStukovPlaceHordeSet` | - |
| 2,0 | `SIBarracksAddOns` | `SIBarracksAddOns,Build1` | 建造技能 / CAbilBuild | `SIBarracksTechLab`、单位 / Unit:`SIBarracksTechLab` | - | - |
| 2,3 | `SIBarracksLiftOff` | `SIBarracksLiftOff,Execute` | 变形技能 / CAbilMorph | - | - | - |

### 被感染的移民营 / `SICivilianStructure`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMStukov.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Structure，种族 / Race InfT，生命 / Life 1000，费用 / Cost 200/0
- Catalog 技能链接 / Catalog ability links：`BuildInProgress`(基础 / Basic)、`que5`(队列技能 / CAbilQueue)、`SICivilianStructureLiftOff`(变形技能 / CAbilMorph)、`SICivilianStructureSpawnCivilian`(瞬发效果技能 / CAbilEffectInstant)、`SIInfestedCivilianStructureResearch`(研究技能 / CAbilResearch)、`SIStukovPlaceHordeRally`(目标效果技能 / CAbilEffectTarget)
- 关联 Behavior / Linked behaviors：`ChronoBoostTarget`、`OnCreep`、`SICivilianStructureSpawnCivilian`、`ZergBuildingDies6`、`ZergBuildingNotOnCreep`
- 已隐藏基础按钮 / Hidden basic buttons：4 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | `SIInfestedCivilianStructureResearch` | `SIInfestedCivilianStructureResearch,Research1` | 研究技能 / CAbilResearch | 升级 / Upgrade:`SIBarracksTrainInfestedCivilianLevel2` | - | - |
| 0,0 | `SIInfestedCivilianStructureResearch` | `SIInfestedCivilianStructureResearch,Research2` | 研究技能 / CAbilResearch | 升级 / Upgrade:`SIBarracksTrainInfestedCivilianLevel3` | - | - |
| 0,0 | `SIInfestedCivilianStructureResearch` | `SIInfestedCivilianStructureResearch,Research3` | 研究技能 / CAbilResearch | 升级 / Upgrade:`SIBarracksTrainInfestedCivilianLevel4` | - | - |
| 1,0 | `SIInfestedCivilianStructureResearch` | `SIInfestedCivilianStructureResearch,Research11` | 研究技能 / CAbilResearch | 升级 / Upgrade:`StukovInfestedCivilianLeapAttack` | - | - |
| 1,1 | `SIInfestedCivilianStructureResearch` | `SIInfestedCivilianStructureResearch,Research10` | 研究技能 / CAbilResearch | 升级 / Upgrade:`StukovInfestedCivilianSpawnBroodlingOnDeath` | - | - |
| 1,4 | `SIStukovPlaceHordeRally` | `SIStukovPlaceHordeRally,Execute` | 目标效果技能 / CAbilEffectTarget | - | 效果集合 / CEffectSet:`SIStukovPlaceHordeSet` | - |
| 2,0 | `SICivilianStructureSpawnCivilian` | `SICivilianStructureSpawnCivilian,Execute` | 瞬发效果技能 / CAbilEffectInstant | - | - | - |
| 2,3 | `SICivilianStructureLiftOff` | `SICivilianStructureLiftOff,Execute` | 变形技能 / CAbilMorph | - | - | - |

### 被感染的指挥中心 / `SICommandCenter`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMStukov.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Structure，种族 / Race InfT，生命 / Life 1500，费用 / Cost 400/0，提供补给 / Supply provided 15
- Catalog 技能链接 / Catalog ability links：`BuildInProgress`(基础 / Basic)、`que1`、`RallyCommand`、`SICommandCenterLiftOff`(变形技能 / CAbilMorph)、`SICommandCenterResearch`(研究技能 / CAbilResearch)、`SICommandCenterTrain`(训练技能 / CAbilTrain)、`SICommandCenterTransport`(运输技能 / CAbilTransport)、`SIRevive`(复活技能 / CAbilRevive)、`SIReviveAutu`(瞬发效果技能 / CAbilEffectInstant)
- 关联 Behavior / Linked behaviors：`ChronoBoostTarget`、`CreepTumorStukov`、`CreepTumorStukovSpreadCC`、`ZergBuildingDies9`
- 可生产/创建 / Produced or created：`SICocoonInfestedOverlord`（非本指挥官名册 / not in current commander roster）、`SICocoonInfestedSCV`（非本指挥官名册 / not in current commander roster）
- 已隐藏基础按钮 / Hidden basic buttons：4 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | `SIRevive` | `SIRevive,Revive1` | 复活技能 / CAbilRevive | - | - | - |
| 0,0 | `SICommandCenterTrain` | `SICommandCenterTrain,Train1` | 训练技能 / CAbilTrain | `SICocoonInfestedSCV`、单位 / Unit:`SICocoonInfestedSCV` | - | - |
| 0,1 | `SICommandCenterTrain` | `SICommandCenterTrain,Train3` | 训练技能 / CAbilTrain | `SICocoonInfestedOverlord`、单位 / Unit:`SICocoonInfestedOverlord` | - | - |
| 0,2 | `SICommandCenterResearch` | `SICommandCenterResearch,Research1` | 研究技能 / CAbilResearch | 升级 / Upgrade:`HeavyInfestation` | - | - |
| 0,3 | `SICommandCenterResearch` | `SICommandCenterResearch,Research3` | 研究技能 / CAbilResearch | 升级 / Upgrade:`OverlordspeedCoop` | - | - |
| 1,0 | `SIReviveAutu` | `SIReviveAutu,Execute` | 瞬发效果技能 / CAbilEffectInstant | - | - | - |
| 1,3 | `SISpreadingCreep` | `-` | 未解析 / Unresolved | - | - | - |
| 1,4 | `RallyCommand` | `RallyCommand,Rally1` | 未解析 / Unresolved | - | - | - |
| 2,0 | `SICommandCenterTransport` | `SICommandCenterTransport,LoadAll` | 运输技能 / CAbilTransport | - | - | - |
| 2,1 | `SICommandCenterTransport` | `SICommandCenterTransport,UnloadAll` | 运输技能 / CAbilTransport | - | - | - |
| 2,3 | `SICommandCenterLiftOff` | `SICommandCenterLiftOff,Execute` | 变形技能 / CAbilMorph | - | - | - |

### 被感染的重工厂 / `SIFactory`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMStukov.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Structure，种族 / Race InfT，生命 / Life 1250，费用 / Cost 150/100
- Catalog 技能链接 / Catalog ability links：`BuildInProgress`(基础 / Basic)、`Rally`(CAbilRally / CAbilRally)、`SIFactoryAddOns`(建造技能 / CAbilBuild)、`SIFactoryLiftOff`(变形技能 / CAbilMorph)、`SIFactoryTrain`(训练技能 / CAbilTrain)
- 关联 Behavior / Linked behaviors：`ChronoBoostTarget`、`OnCreep`、`ZergBuildingDies6`、`ZergBuildingNotOnCreep`
- 可生产/创建 / Produced or created：`SICocoonInfestedDiamondBack`（非本指挥官名册 / not in current commander roster）、`SICocoonInfestedSiegeTank`（非本指挥官名册 / not in current commander roster）、`SIFactoryTechLab`（非本指挥官名册 / not in current commander roster），耗时 / Time 25s
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | `SIFactoryTrain` | `SIFactoryTrain,Train3` | 训练技能 / CAbilTrain | `SICocoonInfestedDiamondBack`、单位 / Unit:`SICocoonInfestedDiamondBack` | - | - |
| 0,1 | `SIFactoryTrain` | `SIFactoryTrain,Train2` | 训练技能 / CAbilTrain | `SICocoonInfestedSiegeTank`、单位 / Unit:`SICocoonInfestedSiegeTank` | - | - |
| 1,1 | `StukovMasteryMechAttackSpeed` | `-` | 未解析 / Unresolved | - | - | HaveMasteryStukovMechAttackSpeed |
| 1,4 | `Rally` | `Rally,Rally1` | CAbilRally / CAbilRally | - | - | - |
| 2,0 | `SIFactoryAddOns` | `SIFactoryAddOns,Build1` | 建造技能 / CAbilBuild | `SIFactoryTechLab`、单位 / Unit:`SIFactoryTechLab` | - | - |
| 2,3 | `SIFactoryLiftOff` | `SIFactoryLiftOff,Execute` | 变形技能 / CAbilMorph | - | - | - |

### 被感染的气矿 / `SIRefinery`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMStukov.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Structure，种族 / Race InfT
- Catalog 技能链接 / Catalog ability links：`BuildInProgress`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`HarvestableVespeneGeyserGas`、`makeCreep4x4`、`ZergBuildingDies6`
- 已隐藏基础按钮 / Hidden basic buttons：1 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

- 面板技能 / Panel skills：无 / None

### 被感染的星港 / `SIStarport`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMStukov.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Structure，种族 / Race InfT，生命 / Life 1300，费用 / Cost 150/100
- Catalog 技能链接 / Catalog ability links：`BuildInProgress`(基础 / Basic)、`Rally`(CAbilRally / CAbilRally)、`SIStarportAddOns`(建造技能 / CAbilBuild)、`SIStarportLiftOff`(变形技能 / CAbilMorph)、`SIStarportTrain`(训练技能 / CAbilTrain)
- 关联 Behavior / Linked behaviors：`ChronoBoostTarget`、`OnCreep`、`ZergBuildingDies6`、`ZergBuildingNotOnCreep`
- 可生产/创建 / Produced or created：`SICocoonInfestedBanshee`（非本指挥官名册 / not in current commander roster）、`SICocoonInfestedLiberator`（非本指挥官名册 / not in current commander roster）、`SICocoonQueen`（非本指挥官名册 / not in current commander roster）、`SIStarportTechLab`（非本指挥官名册 / not in current commander roster），耗时 / Time 25s
- 已隐藏基础按钮 / Hidden basic buttons：4 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | `SIStarportTrain` | `SIStarportTrain,Train2` | 训练技能 / CAbilTrain | `SICocoonInfestedLiberator`、单位 / Unit:`SICocoonInfestedLiberator` | - | - |
| 0,1 | `SIStarportTrain` | `SIStarportTrain,Train1` | 训练技能 / CAbilTrain | `SICocoonInfestedBanshee`、单位 / Unit:`SICocoonInfestedBanshee` | - | - |
| 0,2 | `SIStarportTrain` | `SIStarportTrain,Train3` | 训练技能 / CAbilTrain | `SICocoonQueen`、单位 / Unit:`SICocoonQueen` | - | - |
| 1,1 | `StukovMasteryMechAttackSpeed` | `-` | 未解析 / Unresolved | - | - | HaveMasteryStukovMechAttackSpeed |
| 1,4 | `Rally` | `Rally,Rally1` | CAbilRally / CAbilRally | - | - | - |
| 2,0 | `SIStarportAddOns` | `SIStarportAddOns,Build1` | 建造技能 / CAbilBuild | `SIStarportTechLab`、单位 / Unit:`SIStarportTechLab` | - | - |
| 2,3 | `SIStarportLiftOff` | `SIStarportLiftOff,Execute` | 变形技能 / CAbilMorph | - | - | - |

### `SISupplyDepot`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMStukov.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Structure，种族 / Race InfT，生命 / Life 350，费用 / Cost 100/0，提供补给 / Supply provided 8
- Catalog 技能链接 / Catalog ability links：`BuildInProgress`(基础 / Basic)、`SISupplyDepotLower`(变形技能 / CAbilMorph)
- 关联 Behavior / Linked behaviors：`makeCreep4x4`、`ZergBuildingDies6`
- 可生产/创建 / Produced or created：`SISupplyDepotLowered`（非本指挥官名册 / not in current commander roster）
- 已隐藏基础按钮 / Hidden basic buttons：3 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | `SISupplyDepotLower` | `SISupplyDepotLower,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:`SISupplyDepotLowered` | - | - |

### 被感染的地堡 / `SIInfestedBunker`

- 来源 / Source：名册 / Roster XMFinal CommanderBuildings.galaxy，状态 / Status galaxy，模块 / Module XMStukov.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146_CommanderBuildings.galaxy`
- 数值 / Stats：类型 / Type Structure，种族 / Race InfT，生命 / Life 400，费用 / Cost 300/0，补给 / Supply 4
- Catalog 技能链接 / Catalog ability links：`AttackRedirect`、`BuildInProgress`(基础 / Basic)、被感染的地堡集结 / `SIInfestedBunkerRally`、`SIInfestedBunkerTrain`(瞬发效果技能 / CAbilEffectInstant)、`SIInfestedBunkerTrainMarine`(瞬发效果技能 / CAbilEffectInstant)、`SIInfestedBunkerTransport`(运输技能 / CAbilTransport)、`SIInfestedBunkerUproot`(变形技能 / CAbilMorph)、`SIStukovPlaceHordeRally`(目标效果技能 / CAbilEffectTarget)、`StopRedirect`
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`SIInfestedBunkerAutoSpawner`
- 可生产/创建 / Produced or created：`SIInfestedTrooper`（非本指挥官名册 / not in current commander roster）
- 已隐藏基础按钮 / Hidden basic buttons：6 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | `SIInfestedBunkerTrain` | `SIInfestedBunkerTrain,Execute` | 瞬发效果技能 / CAbilEffectInstant | 效果创建 / Effect creates:`SIInfestedTrooper` | 创建单位效果 / CEffectCreateUnit:`SIInfestedBunkerTrainCU` | - |
| 0,4 | `AttackRedirect` | `AttackRedirect,Execute` | 未解析 / Unresolved | - | - | - |
| 1,0 | `SIInfestedBunkerInfestedMarineSpawner` | `-` | 未解析 / Unresolved | - | - | - |
| 1,1 | `SIBunkerRegenerativePlating` | `-` | 未解析 / Unresolved | - | - | HaveSIBunkerLifeRegen |
| 1,4 | `SIStukovPlaceHordeRally` | `SIStukovPlaceHordeRally,Execute` | 目标效果技能 / CAbilEffectTarget | - | 效果集合 / CEffectSet:`SIStukovPlaceHordeSet` | - |
| 2,0 | `SIInfestedBunkerTransport` | `SIInfestedBunkerTransport,Load` | 运输技能 / CAbilTransport | - | - | - |
| 2,1 | `SIInfestedBunkerTransport` | `SIInfestedBunkerTransport,UnloadAll` | 运输技能 / CAbilTransport | - | - | - |
| 2,2 | `SIInfestedBunkerUproot` | `SIInfestedBunkerUproot,Execute` | 变形技能 / CAbilMorph | - | - | - |

### 被感染的导弹塔 / `SIMissileTurret`

- 来源 / Source：名册 / Roster XMFinal CommanderBuildings.galaxy，状态 / Status galaxy，模块 / Module XMStukov.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146_CommanderBuildings.galaxy`
- 数值 / Stats：类型 / Type Structure，种族 / Race InfT，生命 / Life 250，费用 / Cost 100/0
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`BuildInProgress`(基础 / Basic)、`que1`、`SalvageShared`(行为/被动技能 / CAbilBehavior)、`SIMissileTurretLiftOff`(变形技能 / CAbilMorph)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`Detector11`
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | `SalvageShared` | `SalvageShared,On` | 行为/被动技能 / CAbilBehavior | - | - | - |
| 2,2 | `Detector` | `-` | 未解析 / Unresolved | - | - | NotUnderConstruction |
| 2,3 | `SIMissileTurretLiftOff` | `SIMissileTurretLiftOff,Execute` | 变形技能 / CAbilMorph | - | - | - |

## 生产链补充建筑 / Production-support Buildings

- 无 / None

## 单位 / Units

### 被感染的平民 / `SIInfestedCivilian`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMStukov.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race InfT，生命 / Life 35
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`BurrowSIInfestedCivilianDown`(变形技能 / CAbilMorph)、`move`(基础 / Basic)、`SIStukovPlaceHordeMove`(瞬发效果技能 / CAbilEffectInstant)、`stop`(基础 / Basic)、`StukovInfestedCivilianLeapAttack`(CAbilAugment / CAbilAugment)、`StukovInfestedInfestedCivilianLeapAttack`
- 关联 Behavior / Linked behaviors：`NoScrapDrop`、`StukovInfestedCivilianSpawnBroodlingOnDeath`、`TimeStopHaste`
- 可生产/创建 / Produced or created：`SIInfestedCivilianBurrowed`（非本指挥官名册 / not in current commander roster）
- 已隐藏基础按钮 / Hidden basic buttons：6 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | `StukovInfestedInfestedCivilianLeap` | `-` | 未解析 / Unresolved | - | - | HaveStukovInfestedInfestedCivilianLeapAttack |
| 1,1 | `StukovInfestedCivilianSpawnBroodlingsOnDeath` | `-` | 未解析 / Unresolved | - | - | HaveStukovInfestedCivilianSpawnBroodlingOnDeath |
| 2,4 | `BurrowSIInfestedCivilianDown` | `BurrowSIInfestedCivilianDown,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:`SIInfestedCivilianBurrowed` | - | - |
| 2,4 | `SIStukovPlaceHordeMove` | `SIStukovPlaceHordeMove,Execute` | 瞬发效果技能 / CAbilEffectInstant | - | CEffectEnumTrackedUnits / CEffectEnumTrackedUnits:`SIStukovPlaceHordeTT` | - |

### 被感染的陆战队员 / `SIInfestedMarine`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMStukov.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race InfT，生命 / Life 50，费用 / Cost 15/0，补给 / Supply 1
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`BurrowSIInfestedMarineDown`(变形技能 / CAbilMorph)、`move`(基础 / Basic)、`SIStukovPlaceHordeMove`(瞬发效果技能 / CAbilEffectInstant)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`TimeStopHaste`
- 可生产/创建 / Produced or created：`SIInfestedMarineBurrowed`（非本指挥官名册 / not in current commander roster）
- 已隐藏基础按钮 / Hidden basic buttons：6 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | `SIMarineTrooperImprovedRange` | `-` | 未解析 / Unresolved | - | - | HaveSIMarineTrooperRange |
| 2,1 | `SIPlaguedMunitions` | `-` | 未解析 / Unresolved | - | - | HaveSIPlaguedMunitions |
| 2,4 | `BurrowSIInfestedMarineDown` | `BurrowSIInfestedMarineDown,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:`SIInfestedMarineBurrowed` | - | - |
| 2,4 | `SIStukovPlaceHordeMove` | `SIStukovPlaceHordeMove,Execute` | 瞬发效果技能 / CAbilEffectInstant | - | CEffectEnumTrackedUnits / CEffectEnumTrackedUnits:`SIStukovPlaceHordeTT` | - |

### 被感染的攻城坦克 / `StukovInfestedSiegeTank`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMStukov.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race InfT，生命 / Life 200，费用 / Cost 200/100，补给 / Supply 3
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`stop`(基础 / Basic)、`StukovInfestedSiegeTankAmmo`(瞬发效果技能 / CAbilEffectInstant)、`StukovInfestedSiegeTankAmmoRestock`(目标效果技能 / CAbilEffectTarget)、`StukovInfestedSiegeTankDeepTunnel`(目标效果技能 / CAbilEffectTarget)、`StukovInfestedSiegeTankUproot`(变形技能 / CAbilMorph)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`InfestedSiegeTankAmmoAuto`、`SISiegeTankSiegedTentacle`、`StukovInfestedSiegeTankAmmoRestockSearch`
- 可生产/创建 / Produced or created：`StukovInfestedSiegeTankDeepTunnelPlacementUnit`（非本指挥官名册 / not in current commander roster）、`StukovInfestedSiegeTankUprooted`（非本指挥官名册 / not in current commander roster）
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,3 | `StukovInfestedSiegeTankAmmo` | `StukovInfestedSiegeTankAmmo,Execute` | 瞬发效果技能 / CAbilEffectInstant | - | 施加行为效果 / CEffectApplyBehavior:`StukovInfestedSiegeTankAmmoImpact` | HaveStukovInfestedSiegeTankAmmo |
| 1,3 | `StukovInfestedSiegeTankAmmoRestock` | `StukovInfestedSiegeTankAmmoRestock,Execute` | 目标效果技能 / CAbilEffectTarget | - | 效果集合 / CEffectSet:`StukovInfestedSiegeTankAmmoLM` | - |
| 1,4 | `InfestedSiegeTankArmoredDamage` | `-` | 未解析 / Unresolved | - | - | UseInfestedSiegeTankArmoredDamage |
| 2,1 | `StukovInfestedSiegeTankUproot` | `StukovInfestedSiegeTankUproot,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:`StukovInfestedSiegeTankUprooted` | - | - |
| 2,2 | `StukovInfestedSiegeTankDeepTunnel` | `StukovInfestedSiegeTankDeepTunnel,Execute` | 目标效果技能 / CAbilEffectTarget | 效果创建 / Effect creates:`StukovInfestedSiegeTankDeepTunnelPlacementUnit` | 创建单位效果 / CEffectCreateUnit:`AbathurDeepTunnelCU`、创建单位效果 / CEffectCreateUnit:`StukovInfestedSiegeTankDeepTunnelCU` | - |
| 2,4 | `StukovInfestedSiegeTankAmmo` | `-` | 未解析 / Unresolved | - | - | - |

### 王虫 / `SIOverlord`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMStukov.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race InfT，生命 / Life 200，费用 / Cost 100/0，提供补给 / Supply provided 8
- Catalog 技能链接 / Catalog ability links：`GenerateCreepStukov`(行为/被动技能 / CAbilBehavior)、`move`(基础 / Basic)、装载-卸载 / `OverlordTransportStukov`(运输技能 / CAbilTransport)、`que1`、`SIMorphToOverseer`(变形技能 / CAbilMorph)、`stop`(基础 / Basic)、`TrainOverseerStukov`(训练技能 / CAbilTrain)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`
- 可生产/创建 / Produced or created：`OverseerStukov`，耗时 / Time 10s
- 已隐藏基础按钮 / Hidden basic buttons：6 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | `TrainOverseerStukov` | `TrainOverseerStukov,Train1` | 训练技能 / CAbilTrain | `OverseerStukov`、单位 / Unit:`OverseerStukov` | - | - |
| 2,1 | 装载 / `OverlordTransportStukov` | `OverlordTransportStukov,Load` | 运输技能 / CAbilTransport | - | - | - |
| 2,2 | 全部卸载 / `OverlordTransportStukov` | `OverlordTransportStukov,UnloadAt` | 运输技能 / CAbilTransport | - | - | - |

### 被感染的女妖 / `StukovInfestedBanshee`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMStukov.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race InfT，生命 / Life 140，能量 / Energy 200，费用 / Cost 150/100，补给 / Supply 3
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`BurrowStukovInfestedBansheeDown`(变形技能 / CAbilMorph)、`InfestedBansheeCloakingField`(行为/被动技能 / CAbilBehavior)、`move`(基础 / Basic)、`stop`(基础 / Basic)、远程部署 / `StukovBansheesDeploy`(目标效果技能 / CAbilEffectTarget)、`StukovBansheeTransport`(运输技能 / CAbilTransport)
- 可生产/创建 / Produced or created：`StukovInfestedBansheeBurrowed`（非本指挥官名册 / not in current commander roster）
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | `StukovInfestedBansheeBurrowRegeneration` | `-` | 未解析 / Unresolved | - | - | - |
| 1,1 | `StukovInfestedBansheeInfestedLife` | `-` | 未解析 / Unresolved | - | - | HaveStukovInfestedBansheeInfestedLife |
| 1,3 | `StukovBansheesDeploy` | `StukovBansheesDeploy,Execute` | 目标效果技能 / CAbilEffectTarget | - | 伤害效果 / CEffectDamage:`StukovBansheesDeployDamage` | - |
| 2,0 | `InfestedBansheeCloakingField` | `InfestedBansheeCloakingField,On` | 行为/被动技能 / CAbilBehavior | - | - | - |
| 2,1 | `InfestedBansheeCloakingField` | `InfestedBansheeCloakingField,Off` | 行为/被动技能 / CAbilBehavior | - | - | - |
| 2,2 | `StukovBansheeTransport` | `StukovBansheeTransport,LoadAll` | 运输技能 / CAbilTransport | - | - | - |
| 2,3 | 卸载全部 / `StukovBansheeTransport` | `StukovBansheeTransport,UnloadAt` | 运输技能 / CAbilTransport | - | - | - |
| 2,4 | `BurrowStukovInfestedBansheeDown` | `BurrowStukovInfestedBansheeDown,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:`StukovInfestedBansheeBurrowed` | - | - |

### 被感染的解放者 / `SILiberator`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMStukov.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race InfT，生命 / Life 180，费用 / Cost 150/125，补给 / Supply 3
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`move`(基础 / Basic)、`SILiberatorSwarmFormLaunchAttack`(CAbilAugment / CAbilAugment)、`stop`(基础 / Basic)
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | `SILiberatorImprovedAoeAttack` | `-` | 未解析 / Unresolved | - | - | HaveSILiberatorAoeAttack |
| 1,1 | `SILiberatorBecometheSwarm` | `-` | 未解析 / Unresolved | - | - | HaveSILiberatorInfestedBees |

### 被感染的响尾蛇战车 / `StukovInfestedDiamondBack`

- 来源 / Source：名册 / Roster XMFinal CommanderRosters.galaxy，状态 / Status galaxy，模块 / Module XMStukov.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146_CommanderRosters.galaxy`
- 数值 / Stats：类型 / Type Unit，种族 / Race InfT，生命 / Life 250，费用 / Cost 225/75，补给 / Supply 3
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`move`(基础 / Basic)、`stop`(基础 / Basic)、`StukovInfestedDiamondbackSnare`(目标效果技能 / CAbilEffectTarget)
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | `DiamondbackSnailTrail` | `-` | 未解析 / Unresolved | - | - | HaveSIDiamondbackSnailTrail |
| 2,0 | `StukovInfestedDiamondbackSnare` | `StukovInfestedDiamondbackSnare,Execute` | 目标效果技能 / CAbilEffectTarget | - | 施加行为效果 / CEffectApplyBehavior:`StukovInfestedDiamondbackSnareAB`、发射弹体效果 / CEffectLaunchMissile:`StukovInfestedDiamondbackSnareLM` | - |
| 2,3 | `FireOnTheMove` | `-` | 未解析 / Unresolved | - | - | - |

### `OverseerStukov`

- 来源 / Source：名册 / Roster XMFinal CommanderRosters.galaxy，状态 / Status galaxy，模块 / Module XMStukov.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146_CommanderRosters.galaxy`
- 数值 / Stats：类型 / Type Unit，种族 / Race Zerg，生命 / Life 200，费用 / Cost 150/50，提供补给 / Supply provided 8
- Catalog 技能链接 / Catalog ability links：`move`(基础 / Basic)、`OverseerSiegeStukov`(变形技能 / CAbilMorph)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`Detector11`
- 可生产/创建 / Produced or created：`OverseerStukovSiegeMode`（非本指挥官名册 / not in current commander roster）
- 已隐藏基础按钮 / Hidden basic buttons：6 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | `OverseerSiegeStukov` | `OverseerSiegeStukov,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:`OverseerStukovSiegeMode` | - | - |
| 2,3 | `Detector` | `-` | 未解析 / Unresolved | - | - | - |

## 英雄 / Heroes

### 亚历山大号 / `StukovAleksander`

- 来源 / Source：名册 / Roster inferred current Mod hero catalog unit，状态 / Status catalog ObjectType:Hero，模块 / Module XMStukov.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMStukov.SC2Mod/Base.SC2Data/GameData/UnitData.xml`
- 数值 / Stats：类型 / Type Hero，种族 / Race InfT，生命 / Life 4000，费用 / Cost 400/400
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`move`(基础 / Basic)、`stop`(基础 / Basic)、`StukovAleksanderCrashed`(变形技能 / CAbilMorph)、`StukovAleksanderCrashedInstant`(瞬发效果技能 / CAbilEffectInstant)、`StukovAleksanderTentacle`(目标效果技能 / CAbilEffectTarget)、`StukovAleksanderYamatoCannon`(目标效果技能 / CAbilEffectTarget)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`MercAirDrop`、`NoScrapDrop`、`StukovAleksanderCrashedResponse`、`StukovAleksanderInfestedSwarm`、`StukovAleksanderTentacleStunSearch`、`TimeStopHaste`
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | `StukovAleksanderTentacle` | `StukovAleksanderTentacle,Execute` | 目标效果技能 / CAbilEffectTarget | - | 发射弹体效果 / CEffectLaunchMissile:`StukovAleksanderTentacleLM` | - |
| 1,0 | `StukovAleksanderInfestedSwarmTarget` | `-` | 未解析 / Unresolved | - | - | - |
| 1,1 | `AleksanderNeuralParasite` | `-` | 未解析 / Unresolved | - | - | HaveStukovAleksanderMindControl |
| 2,2 | `StukovAleksanderYamatoCannon` | `StukovAleksanderYamatoCannon,Execute` | 目标效果技能 / CAbilEffectTarget | - | 伤害效果 / CEffectDamage:`StukovAleksanderYamatoCannonDamage`、发射弹体效果 / CEffectLaunchMissile:`StukovAleksanderYamatoCannonLM` | - |

### 亚历山大号 / `StukovAleksanderCrashed`

- 来源 / Source：名册 / Roster inferred current Mod hero catalog unit，状态 / Status catalog ObjectType:Hero，模块 / Module XMStukov.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMStukov.SC2Mod/Base.SC2Data/GameData/UnitData.xml`
- 数值 / Stats：类型 / Type Hero，种族 / Race InfT，生命 / Life 2000，费用 / Cost 400/400
- Catalog 技能链接 / Catalog ability links：`que1`、`StukovAleksanderCrashedTrain`(训练技能 / CAbilTrain)
- 关联 Behavior / Linked behaviors：`MercAirDrop`、`NoScrapDrop`、`StukovAleksanderInfestedSwarm`、`Unrepairable`
- 可生产/创建 / Produced or created：被感染的平民 / `SIInfestedCivilian`、`SIInfestedTrooper`（非本指挥官名册 / not in current commander roster）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | `StukovAleksanderCrashedTrain` | `StukovAleksanderCrashedTrain,Train1` | 训练技能 / CAbilTrain | `SIInfestedTrooper`、单位 / Unit:`SIInfestedTrooper` | - | - |
| 0,1 | `StukovAleksanderCrashedTrain` | `StukovAleksanderCrashedTrain,Train2` | 训练技能 / CAbilTrain | 被感染的平民 / `SIInfestedCivilian`、单位 / Unit:被感染的平民 / `SIInfestedCivilian` | - | - |
| 0,2 | `StukovAleksanderCrashedTrain` | `StukovAleksanderCrashedTrain,Train3` | 训练技能 / CAbilTrain | 被感染的平民 / `SIInfestedCivilian`、单位 / Unit:被感染的平民 / `SIInfestedCivilian` | - | - |
