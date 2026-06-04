# 蒙斯克 / `Mengsk` 科技链路排查 / Tech Tree Diagnostics

- 描述 / Description：无 / None
- 数据来源 / Data source：当前 Mod / Current Mod，目录 / Directory：`合作指挥官版起义狂潮/Mods/XM/XMMengsk.SC2Mod`
- 当前 Mod 运行名册 / Current Mod roster：module=`XMMengsk.SC2Mod`，instance=`Mengsk`
- 统计 / Stats：建筑 11、生产链补充建筑 0、单位 16、英雄 0、建筑按钮 63、单位按钮 125、效果引用 38
- 名称显示 / Name display：能从当前 Mod zhCN 解析时显示“中文名 / `英文ID`”；仅显示 `ID` 表示当前 Mod 未找到可用中文名。

## 初始化/开局单位 / Initial Opener

| 槽位 / Slot | 单位 / Unit | 预期类型 / Expected Kind | Catalog 父级 / Catalog Parent | 是否在运行名册 / In Runtime Roster | 来源 / Source |
| --- | --- | --- | --- | --- | --- |
| 初始基地 / Command Center | 征兵中心 / `CommandCenterMengsk` | building | - | 是 / Yes | Catalog xmmengsk，Instance Mengsk，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMMengsk.SC2Mod/Base.SC2Data/GameData/UserData.xml`，名册状态 / Roster status exact |
| 初始工人 / Worker | 帝国劳工 / `SCVMengsk` | unit | - | 是 / Yes | Catalog xmmengsk，Instance Mengsk，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMMengsk.SC2Mod/Base.SC2Data/GameData/UserData.xml`，名册状态 / Roster status exact |
| 第二初始单位 / Second Unit | 星港 / `StarportMengsk` | unit | - | 是 / Yes | Catalog xmmengsk，Instance Mengsk，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMMengsk.SC2Mod/Base.SC2Data/GameData/UserData.xml`，名册状态 / Roster status exact |

## 指挥官默认/顶部技能 / Commander Default / Top-panel Skills

- 无 / None

## 建筑 / Buildings

### 征兵中心 / `CommandCenterMengsk`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMMengsk.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Structure，种族 / Race Terr，生命 / Life 1500，费用 / Cost 400/0，提供补给 / Supply provided 15
- Catalog 技能链接 / Catalog ability links：`BuildInProgressMengsk`(CAbilBuildable / CAbilBuildable)、起飞 / `CommandCenterMengskLiftOff`(变形技能 / CAbilMorph)、`CommandCenterMengskQueue`(队列技能 / CAbilQueue)、`CommandCenterMengskRally`(CAbilRally / CAbilRally)、训练(指挥中心) / `CommandCenterMengskTrain`(训练技能 / CAbilTrain)、`CommandCenterMengskTrainWithAlerts`(训练技能 / CAbilTrain)
- 关联 Behavior / Linked behaviors：`FireSuppressionSystem`、`TerranBuildingBurnDown`
- 可生产/创建 / Produced or created：`CommandCenterMengskFlying`（非本指挥官名册 / not in current commander roster）、帝国劳工 / `SCVMengsk`，耗时 / Time 8s、帝国冲锋队 / `TrooperMengsk`，耗时 / Time 8s
- 已隐藏基础按钮 / Hidden basic buttons：4 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | 征召帝国劳工 / `CommandCenterMengskTrain` | `CommandCenterMengskTrain,Train1` | 训练技能 / CAbilTrain | 帝国劳工 / `SCVMengsk`、单位 / Unit:帝国劳工 / `SCVMengsk` | - | - |
| 0,1 | 征召冲锋队 / `CommandCenterMengskTrainWithAlerts` | `CommandCenterMengskTrainWithAlerts,Train2` | 训练技能 / CAbilTrain | 帝国冲锋队 / `TrooperMengsk`、单位 / Unit:帝国冲锋队 / `TrooperMengsk` | - | - |
| 1,4 | 设置冲锋队集结点 / `CommandCenterMengskRally` | `CommandCenterMengskRally,Rally1` | CAbilRally / CAbilRally | - | - | - |
| 2,2 | 冲锋队高空轨道空投舱 / `TrooperMengskDropTrain` | `-` | 未解析 / Unresolved | - | - | HaveTrooperMengskDropTrain |
| 2,3 | 起飞 / `CommandCenterMengskLiftOff` | `CommandCenterMengskLiftOff,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:`CommandCenterMengskFlying` | - | - |

### 补给地堡 / `BunkerDepotMengsk`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMMengsk.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Structure，种族 / Race Terr，生命 / Life 400，费用 / Cost 100/0，提供补给 / Supply provided 12
- Catalog 技能链接 / Catalog ability links：`AttackRedirect`、`BuildInProgressMengsk`(CAbilBuildable / CAbilBuildable)、回收 / `BunkerMengskSalvage`(行为/被动技能 / CAbilBehavior)、`BunkerMengskTransport`(运输技能 / CAbilTransport)、`Rally`(CAbilRally / CAbilRally)、`StopRedirect`
- 关联 Behavior / Linked behaviors：`FireSuppressionSystem`、`TerranBuildingBurnDown`
- 已隐藏基础按钮 / Hidden basic buttons：4 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,4 | `AttackRedirect` | `AttackRedirect,Execute` | 未解析 / Unresolved | - | - | - |
| 1,2 | 精钢强化装甲 / `StructureArmorMengsk` | `-` | 未解析 / Unresolved | - | - | HaveMengskStructureArmor |
| 1,3 | 瞄准辅助射击孔 / `BunkerDepotMengskRange` | `-` | 未解析 / Unresolved | - | - | HaveBunkerDepotMengskRange |
| 1,4 | 设置补给地堡集结点 / `Rally` | `Rally,Rally1` | CAbilRally / CAbilRally | - | - | - |
| 2,1 | 装载 / `BunkerMengskTransport` | `BunkerMengskTransport,Load` | 运输技能 / CAbilTransport | - | - | - |
| 2,2 | 全部卸载 / `BunkerMengskTransport` | `BunkerMengskTransport,UnloadAll` | 运输技能 / CAbilTransport | - | - | - |
| 2,3 | 回收 / `BunkerMengskSalvage` | `BunkerMengskSalvage,On` | 行为/被动技能 / CAbilBehavior | - | - | - |

### 导弹塔 / `MissileTurretMengsk`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMMengsk.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Structure，种族 / Race Terr，生命 / Life 250，费用 / Cost 100/0
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`BuildInProgressMengsk`(CAbilBuildable / CAbilBuildable)、`que1`、`SalvageSharedMengsk`(行为/被动技能 / CAbilBehavior)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`Detector11`、`FireSuppressionSystem`、`TerranBuildingBurnDown`
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | 精钢强化装甲 / `StructureArmorMengsk` | `-` | 未解析 / Unresolved | - | - | HaveMengskStructureArmor |
| 2,0 | `SalvageSharedMengsk` | `SalvageSharedMengsk,On` | 行为/被动技能 / CAbilBehavior | - | - | - |
| 2,3 | `Detector` | `-` | 未解析 / Unresolved | - | - | NotUnderConstruction |

### 兵营 / `BarracksMengsk`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMMengsk.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Structure，种族 / Race Terr，生命 / Life 1000，费用 / Cost 150/0
- Catalog 技能链接 / Catalog ability links：附属建筑 / `BarracksMengskAddOns`(建造技能 / CAbilBuild)、升空 / `BarracksMengskLiftOff`(变形技能 / CAbilMorph)、`BarracksMengskTrain`(训练技能 / CAbilTrain)、`BuildInProgressMengsk`(CAbilBuildable / CAbilBuildable)、`que5`(队列技能 / CAbilQueue)、`Rally`(CAbilRally / CAbilRally)
- 关联 Behavior / Linked behaviors：`FireSuppressionSystem`、`TerranBuildingBurnDown`
- 可生产/创建 / Produced or created：元首鬼影 / `GhostMengsk`，耗时 / Time 40s、壁垒卫士 / `MarauderMengsk`，耗时 / Time 30s
- 已隐藏基础按钮 / Hidden basic buttons：4 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,1 | 训练壁垒卫士 / `BarracksMengskTrain` | `BarracksMengskTrain,Train1` | 训练技能 / CAbilTrain | 壁垒卫士 / `MarauderMengsk`、单位 / Unit:壁垒卫士 / `MarauderMengsk` | - | - |
| 0,2 | 训练元首鬼影 / `BarracksMengskTrain` | `BarracksMengskTrain,Train2` | 训练技能 / CAbilTrain | 元首鬼影 / `GhostMengsk`、单位 / Unit:元首鬼影 / `GhostMengsk` | - | - |
| 1,4 | `Rally` | `Rally,Rally1` | CAbilRally / CAbilRally | - | - | - |
| 2,3 | 升空 / `BarracksMengskLiftOff` | `BarracksMengskLiftOff,Execute` | 变形技能 / CAbilMorph | - | - | - |

### 重工厂 / `FactoryMengsk`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMMengsk.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Structure，种族 / Race Terr，生命 / Life 1250，费用 / Cost 150/100
- Catalog 技能链接 / Catalog ability links：`BuildInProgressMengsk`(CAbilBuildable / CAbilBuildable)、升空 / `FactoryMengskLiftOff`(变形技能 / CAbilMorph)、`FactoryMengskTrain`(训练技能 / CAbilTrain)、`que5`(队列技能 / CAbilQueue)、`Rally`(CAbilRally / CAbilRally)
- 关联 Behavior / Linked behaviors：`FireSuppressionSystem`、`TerranBuildingBurnDown`
- 可生产/创建 / Produced or created：冲击分队 / `SiegeTankMengsk`，耗时 / Time 45s、黑色战锤 / `ThorMengsk`，耗时 / Time 60s
- 已隐藏基础按钮 / Hidden basic buttons：4 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,2 | 建造冲击分队 / `FactoryMengskTrain` | `FactoryMengskTrain,Train1` | 训练技能 / CAbilTrain | 冲击分队 / `SiegeTankMengsk`、单位 / Unit:冲击分队 / `SiegeTankMengsk` | - | - |
| 0,4 | 建造黑色战锤 / `FactoryMengskTrain` | `FactoryMengskTrain,Train2` | 训练技能 / CAbilTrain | 黑色战锤 / `ThorMengsk`、单位 / Unit:黑色战锤 / `ThorMengsk` | - | - |
| 1,4 | `Rally` | `Rally,Rally1` | CAbilRally / CAbilRally | - | - | - |
| 2,3 | 升空 / `FactoryMengskLiftOff` | `FactoryMengskLiftOff,Execute` | 变形技能 / CAbilMorph | - | - | - |

### 星港 / `StarportMengsk`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMMengsk.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Structure，种族 / Race Terr，生命 / Life 1300，费用 / Cost 150/100
- Catalog 技能链接 / Catalog ability links：`BuildInProgressMengsk`(CAbilBuildable / CAbilBuildable)、`que5`(队列技能 / CAbilQueue)、`Rally`(CAbilRally / CAbilRally)、升空 / `StarportMengskLiftOff`(变形技能 / CAbilMorph)、训练(星港) / `StarportMengskTrain`(训练技能 / CAbilTrain)
- 关联 Behavior / Linked behaviors：`FireSuppressionSystem`、`TerranBuildingBurnDown`
- 可生产/创建 / Produced or created：奥古斯特格勒的骄傲 / `BattlecruiserMengsk`，耗时 / Time 90s、帝国仲裁机 / `MedivacMengsk`，耗时 / Time 21s、帝国见证者 / `RavenMengsk`，耗时 / Time 30s、天空之怒 / `VikingMengskFighter`，耗时 / Time 42s
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | 建造天空之怒 / `StarportMengskTrain` | `StarportMengskTrain,Train3` | 训练技能 / CAbilTrain | 天空之怒 / `VikingMengskFighter`、单位 / Unit:天空之怒 / `VikingMengskFighter` | - | - |
| 0,1 | 建造帝国仲裁机 / `StarportMengskTrain` | `StarportMengskTrain,Train1` | 训练技能 / CAbilTrain | 帝国仲裁机 / `MedivacMengsk`、单位 / Unit:帝国仲裁机 / `MedivacMengsk` | - | - |
| 0,2 | 建造帝国见证者 / `StarportMengskTrain` | `StarportMengskTrain,Train2` | 训练技能 / CAbilTrain | 帝国见证者 / `RavenMengsk`、单位 / Unit:帝国见证者 / `RavenMengsk` | - | - |
| 1,0 | 建造奥古斯格勒的骄傲 / `StarportMengskTrain` | `StarportMengskTrain,Train4` | 训练技能 / CAbilTrain | 奥古斯特格勒的骄傲 / `BattlecruiserMengsk`、单位 / Unit:奥古斯特格勒的骄傲 / `BattlecruiserMengsk` | - | - |
| 1,4 | `Rally` | `Rally,Rally1` | CAbilRally / CAbilRally | - | - | - |
| 2,3 | 升空 / `StarportMengskLiftOff` | `StarportMengskLiftOff,Execute` | 变形技能 / CAbilMorph | - | - | - |

### 工程站 / `EngineeringBayMengsk`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMMengsk.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Structure，种族 / Race Terr，生命 / Life 850，费用 / Cost 125/0
- Catalog 技能链接 / Catalog ability links：`BuildInProgressMengsk`(CAbilBuildable / CAbilBuildable)、研发(工程站) / `EngineeringBayMengskResearch`(研究技能 / CAbilResearch)、`que5`(队列技能 / CAbilQueue)
- 关联 Behavior / Linked behaviors：`FireSuppressionSystem`、`TerranBuildingBurnDown`
- 已隐藏基础按钮 / Hidden basic buttons：4 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | 升级帝国武器等级1 / `EngineeringBayMengskResearch` | `EngineeringBayMengskResearch,Research1` | 研究技能 / CAbilResearch | 升级 / Upgrade:`MengskTrooperWeaponsLevel1` | - | - |
| 0,0 | 升级帝国武器等级2 / `EngineeringBayMengskResearch` | `EngineeringBayMengskResearch,Research2` | 研究技能 / CAbilResearch | 升级 / Upgrade:`MengskTrooperWeaponsLevel2` | - | - |
| 0,0 | 升级帝国武器等级3 / `EngineeringBayMengskResearch` | `EngineeringBayMengskResearch,Research3` | 研究技能 / CAbilResearch | 升级 / Upgrade:`MengskTrooperWeaponsLevel3` | - | - |
| 0,0 | 升级帝国武器等级4 / `EngineeringBayMengskResearch` | `EngineeringBayMengskResearch,Research12` | 研究技能 / CAbilResearch | 升级 / Upgrade:`MengskTrooperWeaponsLevel4` | - | - |
| 0,0 | 升级帝国武器等级5 / `EngineeringBayMengskResearch` | `EngineeringBayMengskResearch,Research13` | 研究技能 / CAbilResearch | 升级 / Upgrade:`MengskTrooperWeaponsLevel5` | - | - |
| 0,1 | 升级帝国装甲等级1 / `EngineeringBayMengskResearch` | `EngineeringBayMengskResearch,Research4` | 研究技能 / CAbilResearch | 升级 / Upgrade:`MengskTrooperArmorsLevel1` | - | - |
| 0,1 | 升级帝国装甲等级2 / `EngineeringBayMengskResearch` | `EngineeringBayMengskResearch,Research5` | 研究技能 / CAbilResearch | 升级 / Upgrade:`MengskTrooperArmorsLevel2` | - | - |
| 0,1 | 升级帝国装甲等级3 / `EngineeringBayMengskResearch` | `EngineeringBayMengskResearch,Research6` | 研究技能 / CAbilResearch | 升级 / Upgrade:`MengskTrooperArmorsLevel3` | - | - |
| 0,1 | 升级帝国装甲等级4 / `EngineeringBayMengskResearch` | `EngineeringBayMengskResearch,Research14` | 研究技能 / CAbilResearch | 升级 / Upgrade:`MengskTrooperArmorsLevel4` | - | - |
| 0,1 | 升级帝国装甲等级5 / `EngineeringBayMengskResearch` | `EngineeringBayMengskResearch,Research15` | 研究技能 / CAbilResearch | 升级 / Upgrade:`MengskTrooperArmorsLevel5` | - | - |
| 1,0 | 研究冲锋队高空轨道空投舱 / `EngineeringBayMengskResearch` | `EngineeringBayMengskResearch,Research7` | 研究技能 / CAbilResearch | 升级 / Upgrade:`TrooperMengskDropTrain` | - | - |
| 1,1 | 研究精钢强化装甲 / `EngineeringBayMengskResearch` | `EngineeringBayMengskResearch,Research9` | 研究技能 / CAbilResearch | 升级 / Upgrade:`MengskStructureArmor` | - | - |
| 1,2 | 研究瞄准辅助射击孔 / `EngineeringBayMengskResearch` | `EngineeringBayMengskResearch,Research10` | 研究技能 / CAbilResearch | 升级 / Upgrade:`BunkerDepotMengskRange` | - | - |
| 1,3 | 研究大气层加速剂 / `EngineeringBayMengskResearch` | `EngineeringBayMengskResearch,Research11` | 研究技能 / CAbilResearch | 升级 / Upgrade:`ArtilleryMengskRange` | - | - |
| 2,0 | 大地碎裂炮 / `ArtilleryMengskPassive` | `-` | 未解析 / Unresolved | - | - | - |
| 2,1 | 导弹塔 / `MissileTurretMengskPassive` | `-` | 未解析 / Unresolved | - | - | - |

### 军械库 / `ArmoryMengsk`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMMengsk.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Structure，种族 / Race Terr，生命 / Life 750，费用 / Cost 150/100
- Catalog 技能链接 / Catalog ability links：`ArmoryMengskResearch`(研究技能 / CAbilResearch)、`BuildInProgressMengsk`(CAbilBuildable / CAbilBuildable)、`que5`(队列技能 / CAbilQueue)
- 关联 Behavior / Linked behaviors：`FireSuppressionSystem`、`TerranBuildingBurnDown`
- 已隐藏基础按钮 / Hidden basic buttons：4 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | 再生型生物钢 / `ArmoryMengskResearch` | `ArmoryMengskResearch,Research4` | 研究技能 / CAbilResearch | 升级 / Upgrade:`RegenerativeBioSteelMengsk` | - | - |
| 0,1 | 研究壁垒场 / `ArmoryMengskResearch` | `ArmoryMengskResearch,Research2` | 研究技能 / CAbilResearch | 升级 / Upgrade:`ThorMengskArmorAura` | - | - |
| 0,2 | 研究智能伺服器 / `ArmoryMengskResearch` | `ArmoryMengskResearch,Research3` | 研究技能 / CAbilResearch | 升级 / Upgrade:`MechTransformationSpeedMengsk` | - | - |

### 聚变芯体 / `FusionCoreMengsk`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMMengsk.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Structure，种族 / Race Terr，生命 / Life 750，费用 / Cost 150/150
- Catalog 技能链接 / Catalog ability links：`BuildInProgressMengsk`(CAbilBuildable / CAbilBuildable)、研发 / `FusionCoreMengskResearch`(研究技能 / CAbilResearch)、`que5`(队列技能 / CAbilQueue)
- 关联 Behavior / Linked behaviors：`FireSuppressionSystem`、`TerranBuildingBurnDown`
- 已隐藏基础按钮 / Hidden basic buttons：4 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | 研究双通道复苏器 / `FusionCoreMengskResearch` | `FusionCoreMengskResearch,Research1` | 研究技能 / CAbilResearch | 升级 / Upgrade:`MedivacMengskDoubleHealBeam` | - | - |
| 0,1 | 研究散点帷幕 / `FusionCoreMengskResearch` | `FusionCoreMengskResearch,Research2` | 研究技能 / CAbilResearch | 升级 / Upgrade:`MedivacMengskPermanentCloak` | - | - |
| 0,2 | 研究放大电波 / `FusionCoreMengskResearch` | `FusionCoreMengskResearch,Research3` | 研究技能 / CAbilResearch | 升级 / Upgrade:`BlimpMengskTopbarRegen` | - | - |
| 0,3 | 研究亚萨涡轮机 / `FusionCoreMengskResearch` | `FusionCoreMengskResearch,Research4` | 研究技能 / CAbilResearch | 升级 / Upgrade:`VikingMengskSpeed` | - | - |
| 0,4 | 研究战场辅助瞄准系统 / `FusionCoreMengskResearch` | `FusionCoreMengskResearch,Research5` | 研究技能 / CAbilResearch | 升级 / Upgrade:`BattlecruiserMengskRangeAura` | - | - |

### 皇家军校 / `GhostAcademyMengsk`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMMengsk.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Structure，种族 / Race Terr，生命 / Life 1250，费用 / Cost 150/50
- Catalog 技能链接 / Catalog ability links：`ArmSiloWithNukeMengsk`(弹仓/机库技能 / CAbilArmMagazine)、`BuildInProgressMengsk`(CAbilBuildable / CAbilBuildable)、幽灵军校研究 / `GhostAcademyMengskResearch`(研究技能 / CAbilResearch)、`que5`(队列技能 / CAbilQueue)
- 关联 Behavior / Linked behaviors：`FireSuppressionSystem`、`TerranBuildingBurnDown`
- 可生产/创建 / Produced or created：`NukeMengsk`（非本指挥官名册 / not in current commander roster），耗时 / Time 90s
- 已隐藏基础按钮 / Hidden basic buttons：4 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | 研究失能弹 / `GhostAcademyMengskResearch` | `GhostAcademyMengskResearch,Research1` | 研究技能 / CAbilResearch | 升级 / Upgrade:`MarauderMengskSlow` | - | - |
| 0,1 | 研究至尊战术飞弹 / `GhostAcademyMengskResearch` | `GhostAcademyMengskResearch,Research2` | 研究技能 / CAbilResearch | 升级 / Upgrade:`GhostMengskGuidedStrike` | - | - |
| 2,0 | 为发射井装填战术飞弹 / `ArmSiloWithNukeMengsk` | `ArmSiloWithNukeMengsk,Ammo1` | 弹仓/机库技能 / CAbilArmMagazine | `NukeMengsk`、单位 / Unit:`NukeMengsk` | CEffectUseCalldown / CEffectUseCalldown:`GhostMengskNukeCalldown` | - |

### 大地碎裂炮 / `ArtilleryMengsk`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMMengsk.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Structure，种族 / Race Terr，生命 / Life 400，费用 / Cost 150/100
- Catalog 技能链接 / Catalog ability links：`ArtilleryMengskAttack`(攻击技能 / CAbilAttack)、辐射打击 / `ArtilleryMengskExperimentalStrike`(目标效果技能 / CAbilEffectTarget)、`ArtilleryMengskTransport`(运输技能 / CAbilTransport)、`BuildInProgressMengsk`(CAbilBuildable / CAbilBuildable)、`Rally`(CAbilRally / CAbilRally)、`SalvageSharedMengsk`(行为/被动技能 / CAbilBehavior)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`FireSuppressionSystem`、`TerranBuildingBurnDown`
- 已隐藏基础按钮 / Hidden basic buttons：4 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,1 | 精钢强化装甲 / `StructureArmorMengsk` | `-` | 未解析 / Unresolved | - | - | HaveMengskStructureArmor |
| 1,2 | 大气层加速剂 / `ArtilleryMengskRange` | `-` | 未解析 / Unresolved | - | - | HaveArtilleryMengskRange |
| 1,4 | 设置大地碎裂炮集结点 / `Rally` | `Rally,Rally1` | CAbilRally / CAbilRally | - | - | - |
| 2,0 | 轰炸 / `ArtilleryMengskAttack` | `ArtilleryMengskAttack,Barrage` | 攻击技能 / CAbilAttack | - | - | - |
| 2,1 | 装载 / `ArtilleryMengskTransport` | `ArtilleryMengskTransport,Load` | 运输技能 / CAbilTransport | - | 施加行为效果 / CEffectApplyBehavior:`ArtilleryMengskWeaponAP`、施加行为效果 / CEffectApplyBehavior:`ArtilleryMengskWeaponRP`、施加行为效果 / CEffectApplyBehavior:`EarthBrokenMengskAB`、移除行为效果 / CEffectRemoveBehavior:`EarthBrokenMengskRB` | - |
| 2,2 | 全部卸载 / `ArtilleryMengskTransport` | `ArtilleryMengskTransport,UnloadAll` | 运输技能 / CAbilTransport | - | 施加行为效果 / CEffectApplyBehavior:`ArtilleryMengskWeaponAP`、施加行为效果 / CEffectApplyBehavior:`ArtilleryMengskWeaponRP`、施加行为效果 / CEffectApplyBehavior:`EarthBrokenMengskAB`、移除行为效果 / CEffectRemoveBehavior:`EarthBrokenMengskRB` | - |
| 2,3 | `SalvageSharedMengsk` | `SalvageSharedMengsk,On` | 行为/被动技能 / CAbilBehavior | - | - | - |

## 生产链补充建筑 / Production-support Buildings

- 无 / None

## 单位 / Units

### 帝国劳工 / `SCVMengsk`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMMengsk.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race Terr，生命 / Life 45，费用 / Cost 40/0，补给 / Supply 1
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`move`(基础 / Basic)、`Repair`、`SCVHarvest`(采集技能 / CAbilHarvest)、工地报道 / `SCVMengskEnlist`(瞬发效果技能 / CAbilEffectInstant)、`SCVMengskMorphTrooperNoWeapon`(变形技能 / CAbilMorph)、喷漆-人类 / `SprayTerran`、`stop`(基础 / Basic)、建造 / `TerranBuildMengsk`(建造技能 / CAbilBuild)、建造战斗建筑 / `TrooperMengskBuild`(建造技能 / CAbilBuild)
- 可生产/创建 / Produced or created：军械库 / `ArmoryMengsk`，耗时 / Time 65s、大地碎裂炮 / `ArtilleryMengsk`，耗时 / Time 40s、兵营 / `BarracksMengsk`，耗时 / Time 65s、补给地堡 / `BunkerDepotMengsk`，耗时 / Time 20s、征兵中心 / `CommandCenterMengsk`，耗时 / Time 100s、工程站 / `EngineeringBayMengsk`，耗时 / Time 35s、重工厂 / `FactoryMengsk`，耗时 / Time 60s、聚变芯体 / `FusionCoreMengsk`，耗时 / Time 65s、皇家军校 / `GhostAcademyMengsk`，耗时 / Time 40s、导弹塔 / `MissileTurretMengsk`，耗时 / Time 25s、`RefineryMengsk`（非本指挥官名册 / not in current commander roster），耗时 / Time 30s、星港 / `StarportMengsk`，耗时 / Time 50s
- 已隐藏基础按钮 / Hidden basic buttons：8 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | 采集 / `SCVHarvest` | `SCVHarvest,Gather` | 采集技能 / CAbilHarvest | - | - | - |
| 1,1 | `SCVHarvest` | `SCVHarvest,Return` | 采集技能 / CAbilHarvest | - | - | - |
| 1,2 | 工作人员 / `SCVMengskAdvancedConstruction` | `-` | 未解析 / Unresolved | - | - | - |
| 1,3 | 人民的意志 / `TrooperMengskImperialMandateGeneration` | `-` | 未解析 / Unresolved | - | - | HavePropagandaBlastMengsk |
| 1,4 | 战斗报道 / `SCVMengskEnlist` | `SCVMengskEnlist,Execute` | 瞬发效果技能 / CAbilEffectInstant | - | 效果集合 / CEffectSet:`TrooperMengskMorphSet` | - |
| 2,0 | `TerranBuild` | `-` | 未解析 / Unresolved | - | - | - |
| 2,1 | `TerranBuildAdvanced` | `-` | 未解析 / Unresolved | - | - | - |
| 2,2 | `Repair` | `Repair,Execute` | 未解析 / Unresolved | - | - | - |
| 0,0 | 建造征兵中心 / `TerranBuildMengsk` | `TerranBuildMengsk,Build1` | 建造技能 / CAbilBuild | 征兵中心 / `CommandCenterMengsk`、单位 / Unit:征兵中心 / `CommandCenterMengsk` | - | - |
| 0,1 | 建造精炼厂 / `TerranBuildMengsk` | `TerranBuildMengsk,Build2` | 建造技能 / CAbilBuild | `RefineryMengsk`、单位 / Unit:`RefineryMengsk` | - | - |
| 0,2 | 建造补给地堡 / `TrooperMengskBuild` | `TrooperMengskBuild,Build3` | 建造技能 / CAbilBuild | 补给地堡 / `BunkerDepotMengsk`、单位 / Unit:补给地堡 / `BunkerDepotMengsk` | - | - |
| 1,0 | 建造兵营 / `TerranBuildMengsk` | `TerranBuildMengsk,Build4` | 建造技能 / CAbilBuild | 兵营 / `BarracksMengsk`、单位 / Unit:兵营 / `BarracksMengsk` | - | - |
| 1,1 | 建造工程站 / `TerranBuildMengsk` | `TerranBuildMengsk,Build5` | 建造技能 / CAbilBuild | 工程站 / `EngineeringBayMengsk`、单位 / Unit:工程站 / `EngineeringBayMengsk` | - | - |
| 2,0 | 建造大地碎裂炮 / `TrooperMengskBuild` | `TrooperMengskBuild,Build6` | 建造技能 / CAbilBuild | 大地碎裂炮 / `ArtilleryMengsk`、单位 / Unit:大地碎裂炮 / `ArtilleryMengsk` | - | - |
| 2,1 | 建造导弹塔 / `TrooperMengskBuild` | `TrooperMengskBuild,Build7` | 建造技能 / CAbilBuild | 导弹塔 / `MissileTurretMengsk`、单位 / Unit:导弹塔 / `MissileTurretMengsk` | - | - |
| 0,0 | 建造皇家军校 / `TerranBuildMengsk` | `TerranBuildMengsk,Build8` | 建造技能 / CAbilBuild | 皇家军校 / `GhostAcademyMengsk`、单位 / Unit:皇家军校 / `GhostAcademyMengsk` | - | - |
| 1,0 | 建造重工厂 / `TerranBuildMengsk` | `TerranBuildMengsk,Build9` | 建造技能 / CAbilBuild | 重工厂 / `FactoryMengsk`、单位 / Unit:重工厂 / `FactoryMengsk` | - | - |
| 1,1 | 建造军械库 / `TerranBuildMengsk` | `TerranBuildMengsk,Build11` | 建造技能 / CAbilBuild | 军械库 / `ArmoryMengsk`、单位 / Unit:军械库 / `ArmoryMengsk` | - | - |
| 2,0 | 建造星港 / `TerranBuildMengsk` | `TerranBuildMengsk,Build10` | 建造技能 / CAbilBuild | 星港 / `StarportMengsk`、单位 / Unit:星港 / `StarportMengsk` | - | - |
| 2,1 | 建造聚变芯体 / `TerranBuildMengsk` | `TerranBuildMengsk,Build12` | 建造技能 / CAbilBuild | 聚变芯体 / `FusionCoreMengsk`、单位 / Unit:聚变芯体 / `FusionCoreMengsk` | - | - |

### 帝国冲锋队 / `TrooperMengsk`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMMengsk.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race Terr，生命 / Life 45，费用 / Cost 40/0，补给 / Supply 1
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`move`(基础 / Basic)、`stop`(基础 / Basic)、建造战斗建筑 / `TrooperMengskBuild`(建造技能 / CAbilBuild)、战斗报道 / `TrooperMengskEnlist`(瞬发效果技能 / CAbilEffectInstant)、`TrooperMengskMorphSCV`(变形技能 / CAbilMorph)、装备冰雹发射器 / `TrooperMengskSpecializeAA`(变形技能 / CAbilMorph)、装备CPO-7火蜥火焰喷射器 / `TrooperMengskSpecializeFlamethrower`(变形技能 / CAbilMorph)、装备B-2大口径轻机枪 / `TrooperMengskSpecializeImproved`(变形技能 / CAbilMorph)
- 可生产/创建 / Produced or created：大地碎裂炮 / `ArtilleryMengsk`，耗时 / Time 40s、补给地堡 / `BunkerDepotMengsk`，耗时 / Time 20s、导弹塔 / `MissileTurretMengsk`，耗时 / Time 25s、帝国 火箭筒 冲锋队 / `TrooperMengskAA`、帝国 火焰器 冲锋队 / `TrooperMengskFlamethrower`、帝国 突击手 冲锋队 / `TrooperMengskImproved`
- 已隐藏基础按钮 / Hidden basic buttons：6 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,2 | 工作人员 / `SCVMengskAdvancedConstruction` | `-` | 未解析 / Unresolved | - | - | - |
| 1,3 | 人民的意志 / `TrooperMengskImperialMandateGeneration` | `-` | 未解析 / Unresolved | - | - | HavePropagandaBlastMengsk |
| 1,4 | 工地报道 / `TrooperMengskEnlist` | `TrooperMengskEnlist,Execute` | 瞬发效果技能 / CAbilEffectInstant | - | 效果集合 / CEffectSet:`TrooperMengskMorphSCVSet` | - |
| 2,0 | 建造战斗建筑 / `TrooperMengskBuild` | `-` | 未解析 / Unresolved | - | - | - |
| 2,2 | 装备B-2大口径轻机枪 / `TrooperMengskSpecializeImproved` | `TrooperMengskSpecializeImproved,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:帝国 突击手 冲锋队 / `TrooperMengskImproved` | - | - |
| 2,3 | 装备CPO-7火蜥火焰喷射器 / `TrooperMengskSpecializeFlamethrower` | `TrooperMengskSpecializeFlamethrower,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:帝国 火焰器 冲锋队 / `TrooperMengskFlamethrower` | - | - |
| 2,4 | 装备冰雹发射器 / `TrooperMengskSpecializeAA` | `TrooperMengskSpecializeAA,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:帝国 火箭筒 冲锋队 / `TrooperMengskAA` | - | - |
| 0,2 | 建造补给地堡 / `TrooperMengskBuild` | `TrooperMengskBuild,Build3` | 建造技能 / CAbilBuild | 补给地堡 / `BunkerDepotMengsk`、单位 / Unit:补给地堡 / `BunkerDepotMengsk` | - | - |
| 2,0 | 建造大地碎裂炮 / `TrooperMengskBuild` | `TrooperMengskBuild,Build6` | 建造技能 / CAbilBuild | 大地碎裂炮 / `ArtilleryMengsk`、单位 / Unit:大地碎裂炮 / `ArtilleryMengsk` | - | - |
| 2,1 | 建造导弹塔 / `TrooperMengskBuild` | `TrooperMengskBuild,Build7` | 建造技能 / CAbilBuild | 导弹塔 / `MissileTurretMengsk`、单位 / Unit:导弹塔 / `MissileTurretMengsk` | - | - |

### 帝国 火箭筒 冲锋队 / `TrooperMengskAA`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMMengsk.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race Terr，生命 / Life 45，费用 / Cost 200/0，补给 / Supply 1
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`move`(基础 / Basic)、`StimpackMengsk`、`stop`(基础 / Basic)、建造战斗建筑 / `TrooperMengskBuild`(建造技能 / CAbilBuild)、战斗报道 / `TrooperMengskEnlist`(瞬发效果技能 / CAbilEffectInstant)、`TrooperMengskMorphSCV`(变形技能 / CAbilMorph)
- 可生产/创建 / Produced or created：大地碎裂炮 / `ArtilleryMengsk`，耗时 / Time 40s、补给地堡 / `BunkerDepotMengsk`，耗时 / Time 20s、导弹塔 / `MissileTurretMengsk`，耗时 / Time 25s、帝国 火箭筒 冲锋队 / `TrooperMengskAA`、帝国 火焰器 冲锋队 / `TrooperMengskFlamethrower`、帝国 突击手 冲锋队 / `TrooperMengskImproved`
- 已隐藏基础按钮 / Hidden basic buttons：6 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,2 | 工作人员 / `SCVMengskAdvancedConstruction` | `-` | 未解析 / Unresolved | - | - | - |
| 1,3 | 人民的意志 / `TrooperMengskImperialMandateGeneration` | `-` | 未解析 / Unresolved | - | - | HavePropagandaBlastMengsk |
| 1,4 | 工地报道 / `TrooperMengskEnlist` | `TrooperMengskEnlist,Execute` | 瞬发效果技能 / CAbilEffectInstant | - | 效果集合 / CEffectSet:`TrooperMengskMorphSCVSet` | - |
| 2,0 | 建造战斗建筑 / `TrooperMengskBuild` | `-` | 未解析 / Unresolved | - | - | - |
| 2,2 | 装备B-2大口径轻机枪 / `TrooperMengskSpecializeImproved` | `TrooperMengskSpecializeImproved,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:帝国 突击手 冲锋队 / `TrooperMengskImproved` | - | - |
| 2,3 | 装备CPO-7火蜥火焰喷射器 / `TrooperMengskSpecializeFlamethrower` | `TrooperMengskSpecializeFlamethrower,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:帝国 火焰器 冲锋队 / `TrooperMengskFlamethrower` | - | - |
| 2,4 | 装备冰雹发射器 / `TrooperMengskSpecializeAA` | `TrooperMengskSpecializeAA,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:帝国 火箭筒 冲锋队 / `TrooperMengskAA` | - | - |
| 0,2 | 建造补给地堡 / `TrooperMengskBuild` | `TrooperMengskBuild,Build3` | 建造技能 / CAbilBuild | 补给地堡 / `BunkerDepotMengsk`、单位 / Unit:补给地堡 / `BunkerDepotMengsk` | - | - |
| 2,0 | 建造大地碎裂炮 / `TrooperMengskBuild` | `TrooperMengskBuild,Build6` | 建造技能 / CAbilBuild | 大地碎裂炮 / `ArtilleryMengsk`、单位 / Unit:大地碎裂炮 / `ArtilleryMengsk` | - | - |
| 2,1 | 建造导弹塔 / `TrooperMengskBuild` | `TrooperMengskBuild,Build7` | 建造技能 / CAbilBuild | 导弹塔 / `MissileTurretMengsk`、单位 / Unit:导弹塔 / `MissileTurretMengsk` | - | - |

### 帝国 火焰器 冲锋队 / `TrooperMengskFlamethrower`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMMengsk.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race Terr，生命 / Life 145，费用 / Cost 200/0，补给 / Supply 1
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`move`(基础 / Basic)、`StimpackMengsk`、`stop`(基础 / Basic)、建造战斗建筑 / `TrooperMengskBuild`(建造技能 / CAbilBuild)、战斗报道 / `TrooperMengskEnlist`(瞬发效果技能 / CAbilEffectInstant)、`TrooperMengskMorphSCV`(变形技能 / CAbilMorph)
- 可生产/创建 / Produced or created：大地碎裂炮 / `ArtilleryMengsk`，耗时 / Time 40s、补给地堡 / `BunkerDepotMengsk`，耗时 / Time 20s、导弹塔 / `MissileTurretMengsk`，耗时 / Time 25s、帝国 火箭筒 冲锋队 / `TrooperMengskAA`、帝国 火焰器 冲锋队 / `TrooperMengskFlamethrower`、帝国 突击手 冲锋队 / `TrooperMengskImproved`
- 已隐藏基础按钮 / Hidden basic buttons：6 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,2 | 工作人员 / `SCVMengskAdvancedConstruction` | `-` | 未解析 / Unresolved | - | - | - |
| 1,3 | 人民的意志 / `TrooperMengskImperialMandateGeneration` | `-` | 未解析 / Unresolved | - | - | HavePropagandaBlastMengsk |
| 1,4 | 工地报道 / `TrooperMengskEnlist` | `TrooperMengskEnlist,Execute` | 瞬发效果技能 / CAbilEffectInstant | - | 效果集合 / CEffectSet:`TrooperMengskMorphSCVSet` | - |
| 2,0 | 建造战斗建筑 / `TrooperMengskBuild` | `-` | 未解析 / Unresolved | - | - | - |
| 2,2 | 装备B-2大口径轻机枪 / `TrooperMengskSpecializeImproved` | `TrooperMengskSpecializeImproved,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:帝国 突击手 冲锋队 / `TrooperMengskImproved` | - | - |
| 2,3 | 装备CPO-7火蜥火焰喷射器 / `TrooperMengskSpecializeFlamethrower` | `TrooperMengskSpecializeFlamethrower,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:帝国 火焰器 冲锋队 / `TrooperMengskFlamethrower` | - | - |
| 2,4 | 装备冰雹发射器 / `TrooperMengskSpecializeAA` | `TrooperMengskSpecializeAA,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:帝国 火箭筒 冲锋队 / `TrooperMengskAA` | - | - |
| 0,2 | 建造补给地堡 / `TrooperMengskBuild` | `TrooperMengskBuild,Build3` | 建造技能 / CAbilBuild | 补给地堡 / `BunkerDepotMengsk`、单位 / Unit:补给地堡 / `BunkerDepotMengsk` | - | - |
| 2,0 | 建造大地碎裂炮 / `TrooperMengskBuild` | `TrooperMengskBuild,Build6` | 建造技能 / CAbilBuild | 大地碎裂炮 / `ArtilleryMengsk`、单位 / Unit:大地碎裂炮 / `ArtilleryMengsk` | - | - |
| 2,1 | 建造导弹塔 / `TrooperMengskBuild` | `TrooperMengskBuild,Build7` | 建造技能 / CAbilBuild | 导弹塔 / `MissileTurretMengsk`、单位 / Unit:导弹塔 / `MissileTurretMengsk` | - | - |

### 帝国 突击手 冲锋队 / `TrooperMengskImproved`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMMengsk.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race Terr，生命 / Life 45，费用 / Cost 200/0，补给 / Supply 1
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`move`(基础 / Basic)、`StimpackMengsk`、`stop`(基础 / Basic)、建造战斗建筑 / `TrooperMengskBuild`(建造技能 / CAbilBuild)、战斗报道 / `TrooperMengskEnlist`(瞬发效果技能 / CAbilEffectInstant)、`TrooperMengskMorphSCV`(变形技能 / CAbilMorph)
- 可生产/创建 / Produced or created：大地碎裂炮 / `ArtilleryMengsk`，耗时 / Time 40s、补给地堡 / `BunkerDepotMengsk`，耗时 / Time 20s、导弹塔 / `MissileTurretMengsk`，耗时 / Time 25s、帝国 火箭筒 冲锋队 / `TrooperMengskAA`、帝国 火焰器 冲锋队 / `TrooperMengskFlamethrower`、帝国 突击手 冲锋队 / `TrooperMengskImproved`
- 已隐藏基础按钮 / Hidden basic buttons：6 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,2 | 工作人员 / `SCVMengskAdvancedConstruction` | `-` | 未解析 / Unresolved | - | - | - |
| 1,3 | 人民的意志 / `TrooperMengskImperialMandateGeneration` | `-` | 未解析 / Unresolved | - | - | HavePropagandaBlastMengsk |
| 1,4 | 工地报道 / `TrooperMengskEnlist` | `TrooperMengskEnlist,Execute` | 瞬发效果技能 / CAbilEffectInstant | - | 效果集合 / CEffectSet:`TrooperMengskMorphSCVSet` | - |
| 2,0 | 建造战斗建筑 / `TrooperMengskBuild` | `-` | 未解析 / Unresolved | - | - | - |
| 2,2 | 装备B-2大口径轻机枪 / `TrooperMengskSpecializeImproved` | `TrooperMengskSpecializeImproved,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:帝国 突击手 冲锋队 / `TrooperMengskImproved` | - | - |
| 2,3 | 装备CPO-7火蜥火焰喷射器 / `TrooperMengskSpecializeFlamethrower` | `TrooperMengskSpecializeFlamethrower,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:帝国 火焰器 冲锋队 / `TrooperMengskFlamethrower` | - | - |
| 2,4 | 装备冰雹发射器 / `TrooperMengskSpecializeAA` | `TrooperMengskSpecializeAA,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:帝国 火箭筒 冲锋队 / `TrooperMengskAA` | - | - |
| 0,2 | 建造补给地堡 / `TrooperMengskBuild` | `TrooperMengskBuild,Build3` | 建造技能 / CAbilBuild | 补给地堡 / `BunkerDepotMengsk`、单位 / Unit:补给地堡 / `BunkerDepotMengsk` | - | - |
| 2,0 | 建造大地碎裂炮 / `TrooperMengskBuild` | `TrooperMengskBuild,Build6` | 建造技能 / CAbilBuild | 大地碎裂炮 / `ArtilleryMengsk`、单位 / Unit:大地碎裂炮 / `ArtilleryMengsk` | - | - |
| 2,1 | 建造导弹塔 / `TrooperMengskBuild` | `TrooperMengskBuild,Build7` | 建造技能 / CAbilBuild | 导弹塔 / `MissileTurretMengsk`、单位 / Unit:导弹塔 / `MissileTurretMengsk` | - | - |

### 壁垒卫士 / `MarauderMengsk`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMMengsk.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race Terr，生命 / Life 300，费用 / Cost 125/350，补给 / Supply 4
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、高端强化剂 / `MarauderMengskAttackSpeedBoost`(瞬发效果技能 / CAbilEffectInstant)、`move`(基础 / Basic)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`MengskVeterancyMarauderMengsk`
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | 帝国皇家卫队 / `MarauderMengskVeterancy` | `-` | 未解析 / Unresolved | - | - | - |
| 1,1 | 帝国的力量 / `MarauderMengskImperialMandateGeneration` | `-` | 未解析 / Unresolved | - | - | - |
| 1,2 | 壁垒屏障 / `MarauderMengskShield` | `-` | 未解析 / Unresolved | - | - | HaveMarauderMengskAbsorbReapplicator |
| 1,2 | 壁垒屏障 / `MarauderMengskShield` | `-` | 未解析 / Unresolved | - | - | HaveMengskVeterancyMarauderMengskGELevel2 |
| 1,3 | 失能弹 / `MarauderMengskSlow` | `-` | 未解析 / Unresolved | - | - | HaveMarauderMengskSlow |
| 2,0 | 高端强化剂 / `MarauderMengskAttackSpeedBoost` | `MarauderMengskAttackSpeedBoost,Execute` | 瞬发效果技能 / CAbilEffectInstant | - | 施加行为效果 / CEffectApplyBehavior:`MarauderMengskAttackSpeedBoostAB` | - |

### 元首鬼影 / `GhostMengsk`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMMengsk.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race Terr，生命 / Life 200，能量 / Energy 200，费用 / Cost 200/500，补给 / Supply 4
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、EMP震爆 / `GhostMengskEMPLongStun`(目标效果技能 / CAbilEffectTarget)、`GhostMengskEMPShortStun`(目标效果技能 / CAbilEffectTarget)、停火 / `GhostMengskHoldFire`(瞬发效果技能 / CAbilEffectInstant)、焰能爆燃 / `GhostMengskIrradiateBigDamage`(目标效果技能 / CAbilEffectTarget)、`GhostMengskIrradiateSmallDamage`(目标效果技能 / CAbilEffectTarget)、`GhostMengskNuke`(目标效果技能 / CAbilEffectTarget)、迷宫式隐形迷彩 / `GhostMengskSuperCloak`(瞬发效果技能 / CAbilEffectInstant)、自由射击 / `GhostMengskWeaponsFree`(瞬发效果技能 / CAbilEffectInstant)、`move`(基础 / Basic)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`MengskVeterancyGhostMengsk`
- 已隐藏基础按钮 / Hidden basic buttons：6 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | 帝国皇家卫队 / `GhostMengskVeterancy` | `-` | 未解析 / Unresolved | - | - | - |
| 1,1 | 帝国的力量 / `GhostMengskImperialMandateGeneration` | `-` | 未解析 / Unresolved | - | - | - |
| 1,2 | 停火 / `GhostMengskHoldFire` | `GhostMengskHoldFire,Execute` | 瞬发效果技能 / CAbilEffectInstant | - | - | - |
| 1,3 | 自由射击 / `GhostMengskWeaponsFree` | `GhostMengskWeaponsFree,Execute` | 瞬发效果技能 / CAbilEffectInstant | - | - | - |
| 1,4 | 至尊战术飞弹 / `GhostMengskGuidedStrike` | `-` | 未解析 / Unresolved | - | - | HaveGhostMengskGuidedStrike |
| 2,0 | 焰能爆燃 / `GhostMengskIrradiateSmallDamage` | `GhostMengskIrradiateSmallDamage,Execute` | 目标效果技能 / CAbilEffectTarget | - | 施加行为效果 / CEffectApplyBehavior:`GhostMengskIrradiateAB`、发射弹体效果 / CEffectLaunchMissile:`GhostMengskIrradiateLM` | - |
| 2,0 | 焰能爆燃 / `GhostMengskIrradiateBigDamage` | `GhostMengskIrradiateBigDamage,Execute` | 目标效果技能 / CAbilEffectTarget | - | 施加行为效果 / CEffectApplyBehavior:`GhostMengskIrradiateAB`、发射弹体效果 / CEffectLaunchMissile:`GhostMengskIrradiateLM` | - |
| 2,1 | EMP震爆 / `GhostMengskEMPShortStun` | `GhostMengskEMPShortStun,Execute` | 目标效果技能 / CAbilEffectTarget | - | 发射弹体效果 / CEffectLaunchMissile:`GhostMengskEMPSmallLM`、区域枚举效果 / CEffectEnumArea:`GhostMengskEMPSmallSearch` | - |
| 2,1 | EMP震爆 / `GhostMengskEMPLongStun` | `GhostMengskEMPLongStun,Execute` | 目标效果技能 / CAbilEffectTarget | - | 发射弹体效果 / CEffectLaunchMissile:`GhostMengskEMPSmallLM`、区域枚举效果 / CEffectEnumArea:`GhostMengskEMPSmallSearch` | - |
| 2,2 | 迷宫式隐形迷彩 / `GhostMengskSuperCloak` | `GhostMengskSuperCloak,Execute` | 瞬发效果技能 / CAbilEffectInstant | - | 施加行为效果 / CEffectApplyBehavior:`GhostMengskSuperCloakAB` | - |
| 2,3 | 战术飞弹打击 / `GhostMengskNuke` | `GhostMengskNuke,Execute` | 目标效果技能 / CAbilEffectTarget | - | CEffectUseCalldown / CEffectUseCalldown:`GhostMengskNukeCalldown`、伤害效果 / CEffectDamage:`GhostMengskNukeDamage` | - |

### 帝国仲裁机 / `MedivacMengsk`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMMengsk.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race Terr，生命 / Life 150，能量 / Energy 200，费用 / Cost 100/50，补给 / Supply 2
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、双重射线治疗 / `MedivacMengskDoubleBeamHeal`(目标效果技能 / CAbilEffectTarget)、治疗 / `MedivacMengskHeal`(目标效果技能 / CAbilEffectTarget)、应急推进器 / `MedivacMengskSpeedBoost`(瞬发效果技能 / CAbilEffectInstant)、`MedivacMengskTransport`(运输技能 / CAbilTransport)、`move`(基础 / Basic)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`MedivacMengskPermanentCloak`
- 已隐藏基础按钮 / Hidden basic buttons：6 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | 双通道复苏器 / `MedivacMengskDoubleHealBeam` | `-` | 未解析 / Unresolved | - | - | HaveMedivacMengskDoubleHealBeam |
| 1,1 | 散点帷幕 / `MedivacMengskPermanentCloak` | `-` | 未解析 / Unresolved | - | - | HaveMedivacMengskPermanentCloak |
| 1,2 | 火炮稳定器 / `MedivacMengskSiegeTankAirlift` | `-` | 未解析 / Unresolved | - | - | HaveMedivacMengskSiegeTankAirlift |
| 2,0 | 治疗 / `MedivacMengskHeal` | `MedivacMengskHeal,Execute` | 目标效果技能 / CAbilEffectTarget | - | 创建治疗者效果 / CEffectCreateHealer:`MedivacMengskHealLevel1` | - |
| 2,0 | 治疗 / `MedivacMengskDoubleBeamHeal` | `MedivacMengskDoubleBeamHeal,Execute` | 目标效果技能 / CAbilEffectTarget | - | 创建治疗者效果 / CEffectCreateHealer:`MedivacMengskHealLevel1`、创建治疗者效果 / CEffectCreateHealer:`MedivacMengskHealScanPersistent` | - |
| 2,1 | 后燃推进系统 / `MedivacMengskSpeedBoost` | `MedivacMengskSpeedBoost,Execute` | 瞬发效果技能 / CAbilEffectInstant | - | - | - |
| 2,2 | `MedivacMengskTransport` | `MedivacMengskTransport,Load` | 运输技能 / CAbilTransport | - | 效果集合 / CEffectSet:`MedivacMengskLoadSet` | - |
| 2,3 | `MedivacMengskTransport` | `MedivacMengskTransport,UnloadAt` | 运输技能 / CAbilTransport | - | 效果集合 / CEffectSet:`MedivacMengskLoadSet` | - |

### 冲击分队 / `SiegeTankMengsk`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMMengsk.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race Terr，生命 / Life 350，费用 / Cost 150/425，补给 / Supply 6
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`move`(基础 / Basic)、攻城模式 / `SiegeModeMengsk`(变形技能 / CAbilMorph)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`MengskVeterancySiegeTankMengsk`
- 可生产/创建 / Produced or created：冲击分队 / `SiegeTankMengskSieged`
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | 帝国皇家卫队 / `SiegeTankMengskVeterancy` | `-` | 未解析 / Unresolved | - | - | - |
| 1,1 | 帝国的力量 / `SiegeTankMengskImperialMandateGeneration` | `-` | 未解析 / Unresolved | - | - | - |
| 1,2 | 震慑与敬畏 / `SiegeTankMengskStun` | `-` | 未解析 / Unresolved | - | - | HaveMengskVeterancySiegeTankMengskGELevel2 |
| 1,3 | 火炮稳定器 / `SiegeTankMengskAirlift` | `-` | 未解析 / Unresolved | - | - | HaveMedivacMengskSiegeTankAirlift |
| 2,0 | 攻城模式 / `SiegeModeMengsk` | `SiegeModeMengsk,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:冲击分队 / `SiegeTankMengskSieged` | - | - |

### 冲击分队 / `SiegeTankMengskSieged`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status state-only，模块 / Module XMMengsk.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race Terr，生命 / Life 350，费用 / Cost 150/425，补给 / Supply 6
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`stop`(基础 / Basic)、取消攻城模式 / `UnsiegeMengsk`(变形技能 / CAbilMorph)
- 关联 Behavior / Linked behaviors：`MengskVeterancySiegeTankMengsk`
- 可生产/创建 / Produced or created：冲击分队 / `SiegeTankMengsk`
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | 帝国皇家卫队 / `SiegeTankMengskVeterancy` | `-` | 未解析 / Unresolved | - | - | - |
| 1,1 | 帝国的力量 / `SiegeTankMengskImperialMandateGeneration` | `-` | 未解析 / Unresolved | - | - | - |
| 1,2 | 震慑与敬畏 / `SiegeTankMengskStun` | `-` | 未解析 / Unresolved | - | - | HaveMengskVeterancySiegeTankMengskGELevel2 |
| 1,3 | 火炮稳定器 / `SiegeTankMengskAirlift` | `-` | 未解析 / Unresolved | - | - | HaveMedivacMengskSiegeTankAirlift |
| 2,1 | 坦克模式 / `UnsiegeMengsk` | `UnsiegeMengsk,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:冲击分队 / `SiegeTankMengsk` | - | - |

### 黑色战锤 / `ThorMengsk`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMMengsk.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race Terr，生命 / Life 600，费用 / Cost 300/600，补给 / Supply 8
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`move`(基础 / Basic)、`stop`(基础 / Basic)、`ThorMengskAAMengsk`(变形技能 / CAbilMorph)、`ThorMengskMAAMengsk`(目标效果技能 / CAbilEffectTarget)
- 关联 Behavior / Linked behaviors：`MengskVeterancyThorMengsk`、`ThorMengskAATMengsk`、`ThorMengskArmorAura`
- 可生产/创建 / Produced or created：`ThorMengskAAUnitMengsk`（非本指挥官名册 / not in current commander roster）
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | 帝国皇家卫队 / `ThorMengskVeterancy` | `-` | 未解析 / Unresolved | - | - | - |
| 1,1 | 帝国的力量 / `ThorMengskImperialMandateGeneration` | `-` | 未解析 / Unresolved | - | - | - |
| 1,2 | 壁垒场 / `ThorMengskArmorAura` | `-` | 未解析 / Unresolved | - | - | HaveThorMengskArmorAura |
| 2,0 | 掩护射击模式 / `ThorMengskMAAMengsk` | `ThorMengskMAAMengsk,Execute` | 目标效果技能 / CAbilEffectTarget | 效果创建 / Effect creates:`ThorMengskAAUnitMengsk` | 区域枚举效果 / CEffectEnumArea:`ThorMengskAAAreaMengsk`、创建单位效果 / CEffectCreateUnit:`ThorMengskAAMAGCUMengsk` | - |

### 天空之怒 / `VikingMengskFighter`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMMengsk.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race Terr，生命 / Life 270，费用 / Cost 150/375，补给 / Supply 4
- Catalog 技能链接 / Catalog ability links：突击模式 / `AssaultModeMengsk`(变形技能 / CAbilMorph)、`attack`(基础 / Basic)、`move`(基础 / Basic)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`MengskVeterancyVikingMengsk`、`VikingMengskCheatDeathCooldown`、`VikingMengskFighterDodge`
- 可生产/创建 / Produced or created：天空之怒 / `VikingMengskAssault`
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | 帝国皇家卫队 / `VikingMengskVeterancy` | `-` | 未解析 / Unresolved | - | - | - |
| 1,1 | 帝国的力量 / `VikingMengskImperialMandateGeneration` | `-` | 未解析 / Unresolved | - | - | - |
| 1,2 | 战术调整 / `VikingMengskAttackDamage` | `-` | 未解析 / Unresolved | - | - | HaveVikingMengskAttackDamageCooldown |
| 1,2 | 战术调整 / `VikingMengskAttackDamage` | `-` | 未解析 / Unresolved | - | - | HaveMengskVeterancyVikingMengskGELevel3 |
| 1,3 | 闪避机动 / `VikingMengskDodge` | `-` | 未解析 / Unresolved | - | - | HaveMengskVeterancyVikingMengskLevel4 |
| 1,4 | 亚萨涡轮机 / `VikingMengskSpeed` | `-` | 未解析 / Unresolved | - | - | HaveVikingMengskSpeed |
| 2,1 | 突击模式 / `AssaultModeMengsk` | `AssaultModeMengsk,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:天空之怒 / `VikingMengskAssault` | 施加行为效果 / CEffectApplyBehavior:`VikingMengskGroundAttackDamage` | - |

### 天空之怒 / `VikingMengskAssault`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status state-only，模块 / Module XMMengsk.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race Terr，生命 / Life 270，费用 / Cost 150/375，补给 / Supply 4
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、战机模式 / `FighterModeMengsk`(变形技能 / CAbilMorph)、`move`(基础 / Basic)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`MengskVeterancyVikingMengsk`、`VikingMengskCheatDeathCooldown`
- 可生产/创建 / Produced or created：天空之怒 / `VikingMengskFighter`
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | 帝国皇家卫队 / `VikingMengskVeterancy` | `-` | 未解析 / Unresolved | - | - | - |
| 1,1 | 帝国的力量 / `VikingMengskImperialMandateGeneration` | `-` | 未解析 / Unresolved | - | - | - |
| 1,2 | 战术调整 / `VikingMengskAttackDamage` | `-` | 未解析 / Unresolved | - | - | HaveVikingMengskAttackDamageCooldown |
| 1,2 | 战术调整 / `VikingMengskAttackDamage` | `-` | 未解析 / Unresolved | - | - | HaveMengskVeterancyVikingMengskGELevel3 |
| 1,3 | 不死鸟协议 / `VikingMengskCheatDeath` | `-` | 未解析 / Unresolved | - | - | HaveMengskVeterancyVikingMengskLevel4 |
| 2,0 | 战机模式 / `FighterModeMengsk` | `FighterModeMengsk,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:天空之怒 / `VikingMengskFighter` | 施加行为效果 / CEffectApplyBehavior:`VikingMengskAirAttackDamage` | - |

### 奥古斯特格勒的骄傲 / `BattlecruiserMengsk`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMMengsk.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race Terr，生命 / Life 800，费用 / Cost 400/900，补给 / Supply 10
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、战术跳跃 / `BattlecruiserMengskHyperjump`(目标效果技能 / CAbilEffectTarget)、`BattlecruiserMengskHyperjumpTwoCharges`(目标效果技能 / CAbilEffectTarget)、蒙斯克大和炮 / `BattlecruiserMengskYamato`(目标效果技能 / CAbilEffectTarget)、`BattlecruiserMengskYamatoTwoCharges`(目标效果技能 / CAbilEffectTarget)、`move`(基础 / Basic)、`que1`、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`BattlecruiserMengskBonusRangeSource`、`MengskVeterancyBattlecruiserMengsk`
- 可生产/创建 / Produced or created：奥古斯特格勒的骄傲 / `BattlecruiserMengsk`
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | 帝国皇家卫队 / `BattlecruiserMengskVeterancy` | `-` | 未解析 / Unresolved | - | - | - |
| 1,1 | 帝国的力量 / `BattlecruiserMengskImperialMandateGeneration` | `-` | 未解析 / Unresolved | - | - | - |
| 1,2 | 战场辅助瞄准系统 / `BattlecruiserMengskRangeAura` | `-` | 未解析 / Unresolved | - | - | HaveBattlecruiserMengskRangeAura |
| 2,0 | 大和炮 / `BattlecruiserMengskYamatoTwoCharges` | `BattlecruiserMengskYamatoTwoCharges,Execute` | 目标效果技能 / CAbilEffectTarget | - | CEffectSwitch / CEffectSwitch:`BattlecruiserMengskYamatoLevelSwitch` | - |
| 2,0 | 大和炮 / `BattlecruiserMengskYamato` | `BattlecruiserMengskYamato,Execute` | 目标效果技能 / CAbilEffectTarget | - | CEffectSwitch / CEffectSwitch:`BattlecruiserMengskYamatoLevelSwitch` | - |
| 2,1 | 战术跳跃 / `BattlecruiserMengskHyperjumpTwoCharges` | `BattlecruiserMengskHyperjumpTwoCharges,Execute` | 目标效果技能 / CAbilEffectTarget | 效果创建 / Effect creates:奥古斯特格勒的骄傲 / `BattlecruiserMengsk` | 创建单位效果 / CEffectCreateUnit:`HyperjumpMengskCreatePrecursor` | - |
| 2,1 | 战术跳跃 / `BattlecruiserMengskHyperjump` | `BattlecruiserMengskHyperjump,Execute` | 目标效果技能 / CAbilEffectTarget | 效果创建 / Effect creates:奥古斯特格勒的骄傲 / `BattlecruiserMengsk` | 创建单位效果 / CEffectCreateUnit:`HyperjumpMengskCreatePrecursor` | - |

### 帝国见证者 / `RavenMengsk`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMMengsk.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race Terr，生命 / Life 350，费用 / Cost 100/100，补给 / Supply 2
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`move`(基础 / Basic)、`RavenMengskMorphtoRavenMengskSieged`(变形技能 / CAbilMorph)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`Detector11`
- 可生产/创建 / Produced or created：帝国见证者 / `RavenMengskSieged`
- 已隐藏基础按钮 / Hidden basic buttons：6 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | `Detector` | `-` | 未解析 / Unresolved | - | - | - |
| 2,2 | 爱国者模式 / `RavenMengskMorphtoRavenMengskSieged` | `RavenMengskMorphtoRavenMengskSieged,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:帝国见证者 / `RavenMengskSieged` | - | - |

### 帝国见证者 / `RavenMengskSieged`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status state-only，模块 / Module XMMengsk.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race Terr，生命 / Life 350，费用 / Cost 100/100，补给 / Supply 2
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`move`(基础 / Basic)、`RavenMengskMorphtoRavenMengskSieged`(变形技能 / CAbilMorph)、`RavenMengskSiegedMorphtoRavenMengsk`(变形技能 / CAbilMorph)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`Detector15`、`RavenMengskPropagandaAura`
- 可生产/创建 / Produced or created：帝国见证者 / `RavenMengsk`
- 已隐藏基础按钮 / Hidden basic buttons：6 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | `Detector` | `-` | 未解析 / Unresolved | - | - | - |
| 1,1 | 教导 / `PropagandaBlastMengsk` | `-` | 未解析 / Unresolved | - | - | - |
| 1,2 | 放大电波 / `BlimpMengskTopbarRegen` | `-` | 未解析 / Unresolved | - | - | HaveBlimpMengskTopbarRegen |
| 2,3 | 取消爱国者模式 / `RavenMengskSiegedMorphtoRavenMengsk` | `RavenMengskSiegedMorphtoRavenMengsk,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:帝国见证者 / `RavenMengsk` | - | - |

## 英雄 / Heroes

- 无 / None
