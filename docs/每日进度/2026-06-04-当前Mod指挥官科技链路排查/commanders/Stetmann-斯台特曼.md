# 斯台特曼 / `Stetmann` 科技链路排查 / Tech Tree Diagnostics

- 描述 / Description：无 / None
- 数据来源 / Data source：当前 Mod / Current Mod，目录 / Directory：`合作指挥官版起义狂潮/Mods/XM/XMStetmann.SC2Mod`
- 当前 Mod 运行名册 / Current Mod roster：module=`XMStetmann.SC2Mod`，instance=`Stetmann`
- 统计 / Stats：建筑 18、生产链补充建筑 0、单位 16、英雄 0、建筑按钮 151、单位按钮 97、效果引用 43
- 名称显示 / Name display：能从当前 Mod zhCN 解析时显示“中文名 / `英文ID`”；仅显示 `ID` 表示当前 Mod 未找到可用中文名。

## 初始化/开局单位 / Initial Opener

| 槽位 / Slot | 单位 / Unit | 预期类型 / Expected Kind | Catalog 父级 / Catalog Parent | 是否在运行名册 / In Runtime Roster | 来源 / Source |
| --- | --- | --- | --- | --- | --- |
| 初始基地 / Command Center | 机械孵化场 / `HatcheryStetmann` | building | - | 是 / Yes | Catalog xmstetmann，Instance Stetmann，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMStetmann.SC2Mod/Base.SC2Data/GameData/UserData.xml`，名册状态 / Roster status exact |
| 初始工人 / Worker | 机械工蜂 / `DroneStetmann` | unit | - | 是 / Yes | Catalog xmstetmann，Instance Stetmann，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMStetmann.SC2Mod/Base.SC2Data/GameData/UserData.xml`，名册状态 / Roster status exact |
| 第二初始单位 / Second Unit | 盖瑞的房间 / `GarysDen` | unit | - | 否 / No | Catalog xmstetmann，Instance Stetmann，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMStetmann.SC2Mod/Base.SC2Data/GameData/UserData.xml` |

## 指挥官默认/顶部技能 / Commander Default / Top-panel Skills

- 无 / None

## 建筑 / Buildings

### 机械孵化场 / `HatcheryStetmann`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMStetmann.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Structure，种族 / Race Zerg，生命 / Life 1500，费用 / Cost 350/0，提供补给 / Supply provided 6
- Catalog 技能链接 / Catalog ability links：`BuildInProgress`(基础 / Basic)、`que5CancelToSelection`、HatcheryStetmann - Rally / `RallyHatcheryStetmann`(CAbilRally / CAbilRally)、研发 / `ResearchHatcheryStetmann`(研究技能 / CAbilResearch)、变形建筑 (孵化场 斯台特曼 -> 虫穴 斯台特曼) / `UpgradeToLairStetmann`(变形技能 / CAbilMorph)
- 关联 Behavior / Linked behaviors：`PowerSourceStetmann`、`SpawnLarvaStetmann`、`StetmannBuildingDoubleQueue`、`TerranBuildingBurnDown`、`ZergBuildingStetmannDies9`
- 可生产/创建 / Produced or created：机械虫穴 / `LairStetmann`
- 已隐藏基础按钮 / Hidden basic buttons：2 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | 选择机械幼虫 / `LarvaStetmann` | `-` | 未解析 / Unresolved | - | - | - |
| 1,0 | 研究充气机身 / `ResearchHatcheryStetmann` | `ResearchHatcheryStetmann,Research1` | 研究技能 / CAbilResearch | 升级 / Upgrade:`OverlordStetmannSpeed` | - | - |
| 1,1 | 研究腹舱 / `ResearchHatcheryStetmann` | `ResearchHatcheryStetmann,Research2` | 研究技能 / CAbilResearch | 升级 / Upgrade:`OverlordStetmannTransport` | - | - |
| 1,3 | 设定工蜂集结点 / `RallyHatcheryStetmann` | `RallyHatcheryStetmann,Rally2` | CAbilRally / CAbilRally | - | - | - |
| 1,3 | 设定工蜂集结点 / `RallyHatcheryStetmann` | `RallyHatcheryStetmann,Rally3` | CAbilRally / CAbilRally | - | - | - |
| 1,4 | HatcheryStetmann - Rally / `RallyHatcheryStetmann` | `RallyHatcheryStetmann,Rally1` | CAbilRally / CAbilRally | - | - | - |
| 2,0 | 变形为机械虫穴 / `UpgradeToLairStetmann` | `UpgradeToLairStetmann,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:机械虫穴 / `LairStetmann` | - | - |
| 2,1 | “爱心区域”生成器 / `StetmannFieldGeneratorEnergy` | `-` | 未解析 / Unresolved | - | - | HavePowerFieldEnergyRegenerationUpgrade |
| 2,1 | “爱心区域”生成器 / `StetmannFieldGeneratorHealth` | `-` | 未解析 / Unresolved | - | - | HavePowerFieldHPRegenerationUpgrade |
| 2,1 | “爱心区域”生成器 / `StetmannFieldGeneratorSpeed` | `-` | 未解析 / Unresolved | - | - | HavePowerFieldMovementSpeedUpgrade |
| 2,2 | 艾星生产等级1 / `StetmannSatelliteBonusLevel1` | `-` | 未解析 / Unresolved | - | - | - |
| 2,3 | `RallyBlock` | `RallyBlock,Execute` | 未解析 / Unresolved | - | - | - |
| 2,4 | 变形建筑 (孵化场 斯台特曼 -> 虫穴 斯台特曼) / `UpgradeToLairStetmann` | `UpgradeToLairStetmann,Cancel` | 变形技能 / CAbilMorph | 单位 / Unit:机械虫穴 / `LairStetmann` | - | - |

### 机械虫穴 / `LairStetmann`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMStetmann.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Structure，种族 / Race Zerg，生命 / Life 2000，费用 / Cost 500/100，提供补给 / Supply provided 6
- Catalog 技能链接 / Catalog ability links：`BuildInProgress`(基础 / Basic)、`que5CancelToSelection`、`RallyBlock`、HatcheryStetmann - Rally / `RallyHatcheryStetmann`(CAbilRally / CAbilRally)、研发 / `ResearchHatcheryStetmann`(研究技能 / CAbilResearch)、变形建筑 (虫穴 斯台特曼 -> 主巢 斯台特曼) / `UpgradeToHiveStetmann`(变形技能 / CAbilMorph)
- 关联 Behavior / Linked behaviors：`PowerSourceStetmann`、`SpawnLarvaStetmann`、`StetmannBuildingDoubleQueue`、`TerranBuildingBurnDown`、`ZergBuildingStetmannDies9`
- 可生产/创建 / Produced or created：机械主巢 / `HiveStetmann`
- 已隐藏基础按钮 / Hidden basic buttons：2 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | 选择机械幼虫 / `LarvaStetmann` | `-` | 未解析 / Unresolved | - | - | - |
| 1,0 | 研究充气机身 / `ResearchHatcheryStetmann` | `ResearchHatcheryStetmann,Research1` | 研究技能 / CAbilResearch | 升级 / Upgrade:`OverlordStetmannSpeed` | - | - |
| 1,1 | 研究腹舱 / `ResearchHatcheryStetmann` | `ResearchHatcheryStetmann,Research2` | 研究技能 / CAbilResearch | 升级 / Upgrade:`OverlordStetmannTransport` | - | - |
| 1,3 | 设定工蜂集结点 / `RallyHatcheryStetmann` | `RallyHatcheryStetmann,Rally2` | CAbilRally / CAbilRally | - | - | - |
| 1,3 | 设定工蜂集结点 / `RallyHatcheryStetmann` | `RallyHatcheryStetmann,Rally3` | CAbilRally / CAbilRally | - | - | - |
| 1,4 | HatcheryStetmann - Rally / `RallyHatcheryStetmann` | `RallyHatcheryStetmann,Rally1` | CAbilRally / CAbilRally | - | - | - |
| 2,0 | 变形为机械主巢 / `UpgradeToHiveStetmann` | `UpgradeToHiveStetmann,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:机械主巢 / `HiveStetmann` | - | - |
| 2,1 | “爱心区域”生成器 / `StetmannFieldGeneratorEnergy` | `-` | 未解析 / Unresolved | - | - | HavePowerFieldEnergyRegenerationUpgrade |
| 2,1 | “爱心区域”生成器 / `StetmannFieldGeneratorHealth` | `-` | 未解析 / Unresolved | - | - | HavePowerFieldHPRegenerationUpgrade |
| 2,1 | “爱心区域”生成器 / `StetmannFieldGeneratorSpeed` | `-` | 未解析 / Unresolved | - | - | HavePowerFieldMovementSpeedUpgrade |
| 2,2 | 艾星生产等级2 / `StetmannSatelliteBonusLevel2` | `-` | 未解析 / Unresolved | - | - | - |
| 2,3 | `RallyBlock` | `RallyBlock,Execute` | 未解析 / Unresolved | - | - | - |
| 2,4 | 变形建筑 (虫穴 斯台特曼 -> 主巢 斯台特曼) / `UpgradeToHiveStetmann` | `UpgradeToHiveStetmann,Cancel` | 变形技能 / CAbilMorph | 单位 / Unit:机械主巢 / `HiveStetmann` | - | - |

### 机械主巢 / `HiveStetmann`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMStetmann.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Structure，种族 / Race Zerg，生命 / Life 2500，费用 / Cost 700/250，提供补给 / Supply provided 6
- Catalog 技能链接 / Catalog ability links：`BuildInProgress`(基础 / Basic)、`que5CancelToSelection`、HatcheryStetmann - Rally / `RallyHatcheryStetmann`(CAbilRally / CAbilRally)、研发 / `ResearchHatcheryStetmann`(研究技能 / CAbilResearch)
- 关联 Behavior / Linked behaviors：`PowerSourceStetmann`、`SpawnLarvaStetmann`、`StetmannBuildingDoubleQueue`、`TerranBuildingBurnDown`、`ZergBuildingStetmannDies9`
- 已隐藏基础按钮 / Hidden basic buttons：2 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | 选择机械幼虫 / `LarvaStetmann` | `-` | 未解析 / Unresolved | - | - | - |
| 1,0 | 研究充气机身 / `ResearchHatcheryStetmann` | `ResearchHatcheryStetmann,Research1` | 研究技能 / CAbilResearch | 升级 / Upgrade:`OverlordStetmannSpeed` | - | - |
| 1,1 | 研究腹舱 / `ResearchHatcheryStetmann` | `ResearchHatcheryStetmann,Research2` | 研究技能 / CAbilResearch | 升级 / Upgrade:`OverlordStetmannTransport` | - | - |
| 1,3 | 设定工蜂集结点 / `RallyHatcheryStetmann` | `RallyHatcheryStetmann,Rally2` | CAbilRally / CAbilRally | - | - | - |
| 1,4 | HatcheryStetmann - Rally / `RallyHatcheryStetmann` | `RallyHatcheryStetmann,Rally1` | CAbilRally / CAbilRally | - | - | - |
| 2,1 | “爱心区域”生成器 / `StetmannFieldGeneratorEnergy` | `-` | 未解析 / Unresolved | - | - | HavePowerFieldEnergyRegenerationUpgrade |
| 2,1 | “爱心区域”生成器 / `StetmannFieldGeneratorHealth` | `-` | 未解析 / Unresolved | - | - | HavePowerFieldHPRegenerationUpgrade |
| 2,1 | “爱心区域”生成器 / `StetmannFieldGeneratorSpeed` | `-` | 未解析 / Unresolved | - | - | HavePowerFieldMovementSpeedUpgrade |
| 2,2 | 艾星生产等级3 / `StetmannSatelliteBonusLevel3` | `-` | 未解析 / Unresolved | - | - | - |

### 机械萃取房 / `ExtractorStetmann`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMStetmann.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Structure
- Catalog 技能链接 / Catalog ability links：无 / None

- 面板技能 / Panel skills：无 / None

### 机械分裂池 / `SpawningPoolStetmann`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMStetmann.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Structure，种族 / Race Zerg，生命 / Life 1000，费用 / Cost 250/0
- Catalog 技能链接 / Catalog ability links：`BuildInProgress`(基础 / Basic)、`que5`(队列技能 / CAbilQueue)、集结 建造 斯塔特曼 / `RallyBuildingStetmann`(CAbilRally / CAbilRally)、研发 / `SpawningPoolStetmannResearch`(研究技能 / CAbilResearch)、跳虫孵生 / `ZerglingStetmannRespawn`(训练技能 / CAbilTrain)
- 关联 Behavior / Linked behaviors：`StetmannBuildingDoubleQueue`、`TerranBuildingBurnDown`、`ZergBuildingStetmannDies6`
- 可生产/创建 / Produced or created：机械跳虫 / `ZerglingStetmann`
- 已隐藏基础按钮 / Hidden basic buttons：2 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | 研究金属机能加速 / `SpawningPoolStetmannResearch` | `SpawningPoolStetmannResearch,Research1` | 研究技能 / CAbilResearch | 升级 / Upgrade:`ZerglingStetmannMovementSpeed` | - | - |
| 0,1 | 研究艾能刚毅护盾 / `SpawningPoolStetmannResearch` | `SpawningPoolStetmannResearch,Research2` | 研究技能 / CAbilResearch | 升级 / Upgrade:`ZerglingStetmannHardenedShield` | - | - |
| 0,2 | 研究合成肾上腺泵 / `SpawningPoolStetmannResearch` | `SpawningPoolStetmannResearch,Research3` | 研究技能 / CAbilResearch | 升级 / Upgrade:`ZerglingStetmannAttackSpeed` | - | - |
| 1,0 | 机械跳虫 / `ZerglingStetmannPassive` | `-` | 未解析 / Unresolved | - | - | - |
| 1,2 | 机械孢子爬虫 / `SporeCrawlerStetmannPassive` | `-` | 未解析 / Unresolved | - | - | - |
| 1,3 | 机械脊针爬虫 / `SpineCrawlerStetmannPassive` | `-` | 未解析 / Unresolved | - | - | - |
| 1,4 | 设置集结点 / `RallyBuildingStetmann` | `RallyBuildingStetmann,Rally1` | CAbilRally / CAbilRally | - | - | - |
| 2,0 | 回收机械跳虫 / `ZerglingStetmannRespawn` | `ZerglingStetmannRespawn,Train1` | 训练技能 / CAbilTrain | 机械跳虫 / `ZerglingStetmann`、单位 / Unit:机械跳虫 / `ZerglingStetmann` | - | - |
| 2,1 | 科学倍增器 / `StetmannDualQueue` | `-` | 未解析 / Unresolved | - | - | - |

### 机械进化腔 / `EvolutionChamberStetmann`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMStetmann.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Structure，种族 / Race Zerg，生命 / Life 750，费用 / Cost 125/0
- Catalog 技能链接 / Catalog ability links：`BuildInProgress`(基础 / Basic)、`EvolutionChamberStetmannResearch`(研究技能 / CAbilResearch)、`que5`(队列技能 / CAbilQueue)
- 关联 Behavior / Linked behaviors：`StetmannBuildingDoubleQueue`、`TerranBuildingBurnDown`、`ZergBuildingStetmannDies6`
- 已隐藏基础按钮 / Hidden basic buttons：2 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | 研究近战攻击等级1 / `EvolutionChamberStetmannResearch` | `EvolutionChamberStetmannResearch,Research1` | 研究技能 / CAbilResearch | 升级 / Upgrade:`StetmannMeleeWeaponsLevel1` | - | - |
| 0,0 | 研究近战攻击等级2 / `EvolutionChamberStetmannResearch` | `EvolutionChamberStetmannResearch,Research2` | 研究技能 / CAbilResearch | 升级 / Upgrade:`StetmannMeleeWeaponsLevel2` | - | - |
| 0,0 | 研究近战攻击等级3 / `EvolutionChamberStetmannResearch` | `EvolutionChamberStetmannResearch,Research3` | 研究技能 / CAbilResearch | 升级 / Upgrade:`StetmannMeleeWeaponsLevel3` | - | - |
| 0,0 | 研究近战攻击等级4 / `EvolutionChamberStetmannResearch` | `EvolutionChamberStetmannResearch,Research13` | 研究技能 / CAbilResearch | 升级 / Upgrade:`StetmannMeleeWeaponsLevel4` | - | - |
| 0,0 | 研究近战攻击等级5 / `EvolutionChamberStetmannResearch` | `EvolutionChamberStetmannResearch,Research14` | 研究技能 / CAbilResearch | 升级 / Upgrade:`StetmannMeleeWeaponsLevel5` | - | - |
| 0,1 | 研究机械喷射攻击等级1 / `EvolutionChamberStetmannResearch` | `EvolutionChamberStetmannResearch,Research4` | 研究技能 / CAbilResearch | 升级 / Upgrade:`StetmannMissileWeaponsLevel1` | - | - |
| 0,1 | 研究机械喷射攻击等级2 / `EvolutionChamberStetmannResearch` | `EvolutionChamberStetmannResearch,Research5` | 研究技能 / CAbilResearch | 升级 / Upgrade:`StetmannMissileWeaponsLevel2` | - | - |
| 0,1 | 研究机械喷射攻击等级3 / `EvolutionChamberStetmannResearch` | `EvolutionChamberStetmannResearch,Research6` | 研究技能 / CAbilResearch | 升级 / Upgrade:`StetmannMissileWeaponsLevel3` | - | - |
| 0,1 | 研究机械喷射攻击等级4 / `EvolutionChamberStetmannResearch` | `EvolutionChamberStetmannResearch,Research15` | 研究技能 / CAbilResearch | 升级 / Upgrade:`StetmannMissileWeaponsLevel4` | - | - |
| 0,1 | 研究机械喷射攻击等级5 / `EvolutionChamberStetmannResearch` | `EvolutionChamberStetmannResearch,Research16` | 研究技能 / CAbilResearch | 升级 / Upgrade:`StetmannMissileWeaponsLevel5` | - | - |
| 0,2 | 研究机械地面钢板等级1 / `EvolutionChamberStetmannResearch` | `EvolutionChamberStetmannResearch,Research7` | 研究技能 / CAbilResearch | 升级 / Upgrade:`StetmannGroundArmorsLevel1` | - | - |
| 0,2 | 研究机械地面钢板等级2 / `EvolutionChamberStetmannResearch` | `EvolutionChamberStetmannResearch,Research8` | 研究技能 / CAbilResearch | 升级 / Upgrade:`StetmannGroundArmorsLevel2` | - | - |
| 0,2 | 研究机械地面钢板等级3 / `EvolutionChamberStetmannResearch` | `EvolutionChamberStetmannResearch,Research9` | 研究技能 / CAbilResearch | 升级 / Upgrade:`StetmannGroundArmorsLevel3` | - | - |
| 0,2 | 研究机械地面钢板等级4 / `EvolutionChamberStetmannResearch` | `EvolutionChamberStetmannResearch,Research17` | 研究技能 / CAbilResearch | 升级 / Upgrade:`StetmannGroundArmorsLevel4` | - | - |
| 0,2 | 研究机械地面钢板等级5 / `EvolutionChamberStetmannResearch` | `EvolutionChamberStetmannResearch,Research18` | 研究技能 / CAbilResearch | 升级 / Upgrade:`StetmannGroundArmorsLevel5` | - | - |
| 2,0 | 科学倍增器 / `StetmannDualQueue` | `-` | 未解析 / Unresolved | - | - | - |

### 机械爆虫巢穴 / `BanelingNestStetmann`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMStetmann.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Structure，种族 / Race Zerg，生命 / Life 850，费用 / Cost 150/50
- Catalog 技能链接 / Catalog ability links：研发 / `BanelingNestStetmannResearch`(研究技能 / CAbilResearch)、`BuildInProgress`(基础 / Basic)、`que5`(队列技能 / CAbilQueue)
- 关联 Behavior / Linked behaviors：`StetmannBuildingDoubleQueue`、`TerranBuildingBurnDown`、`ZergBuildingStetmannDies6`
- 已隐藏基础按钮 / Hidden basic buttons：2 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | 研究离心火箭伺服器 / `BanelingNestStetmannResearch` | `BanelingNestStetmannResearch,Research1` | 研究技能 / CAbilResearch | 升级 / Upgrade:`BanelingStetmannMovementSpeed` | - | - |
| 0,1 | 研究艾能强化炸药 / `BanelingNestStetmannResearch` | `BanelingNestStetmannResearch,Research2` | 研究技能 / CAbilResearch | 升级 / Upgrade:`BanelingStetmannExtraDamage` | - | - |
| 0,2 | 研究艾能效用屏障 / `BanelingNestStetmannResearch` | `BanelingNestStetmannResearch,Research3` | 研究技能 / CAbilResearch | 升级 / Upgrade:`BanelingStetmannManaShieldBonus` | - | - |
| 1,0 | 机械爆虫 / `BanelingStetmannPassive` | `-` | 未解析 / Unresolved | - | - | - |
| 2,0 | 科学倍增器 / `StetmannDualQueue` | `-` | 未解析 / Unresolved | - | - | - |

### 机械刺蛇巢 / `HydraliskDenStetmann`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMStetmann.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Structure，种族 / Race Zerg，生命 / Life 850，费用 / Cost 150/100
- Catalog 技能链接 / Catalog ability links：`BuildInProgress`(基础 / Basic)、研发 / `HydraliskDenStetmannResearch`(研究技能 / CAbilResearch)、刺蛇孵生 / `HydraliskStetmannRespawn`(训练技能 / CAbilTrain)、`que5CancelToSelection`、集结 建造 斯塔特曼 / `RallyBuildingStetmann`(CAbilRally / CAbilRally)、变形建筑 (刺蛇巢 斯台特曼 -> 潜伏者巢穴 斯台特曼) / `UpgradeToLurkerDenStetmann`(变形技能 / CAbilMorph)
- 关联 Behavior / Linked behaviors：`StetmannBuildingDoubleQueue`、`TerranBuildingBurnDown`、`ZergBuildingStetmannDies6`
- 可生产/创建 / Produced or created：机械刺蛇 / `HydraliskStetmann`、机械潜伏者巢穴 / `LurkerDenStetmann`
- 已隐藏基础按钮 / Hidden basic buttons：3 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | 研究蛇肌腱加强件 / `HydraliskDenStetmannResearch` | `HydraliskDenStetmannResearch,Research1` | 研究技能 / CAbilResearch | 升级 / Upgrade:`HydraliskStetmannMovementSpeed` | - | - |
| 0,1 | 研究博学飞弹发射器 / `HydraliskDenStetmannResearch` | `HydraliskDenStetmannResearch,Research3` | 研究技能 / CAbilResearch | 升级 / Upgrade:`HydraliskStetmannDamage` | - | - |
| 0,2 | 研究提尔级瞄准系统 / `HydraliskDenStetmannResearch` | `HydraliskDenStetmannResearch,Research2` | 研究技能 / CAbilResearch | 升级 / Upgrade:`HydraliskStetmannRange` | - | - |
| 0,3 | 研究增程式恐怖钻击算法 / `HydraliskDenStetmannResearch` | `HydraliskDenStetmannResearch,Research4` | 研究技能 / CAbilResearch | 升级 / Upgrade:`LurkerStetmannTunnelingBurstRange` | - | - |
| 0,4 | 研究集火强击算法 / `HydraliskDenStetmannResearch` | `HydraliskDenStetmannResearch,Research5` | 研究技能 / CAbilResearch | 升级 / Upgrade:`LurkerStetmannChannelingSpines` | - | - |
| 1,0 | 机械刺蛇 / `HydraliskStetmannPassive` | `-` | 未解析 / Unresolved | - | - | - |
| 1,4 | 设置集结点 / `RallyBuildingStetmann` | `RallyBuildingStetmann,Rally1` | CAbilRally / CAbilRally | - | - | - |
| 2,0 | 变形为机械潜伏者巢穴 / `UpgradeToLurkerDenStetmann` | `UpgradeToLurkerDenStetmann,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:机械潜伏者巢穴 / `LurkerDenStetmann` | - | - |
| 2,1 | 回收机械刺蛇 / `HydraliskStetmannRespawn` | `HydraliskStetmannRespawn,Train1` | 训练技能 / CAbilTrain | 机械刺蛇 / `HydraliskStetmann`、单位 / Unit:机械刺蛇 / `HydraliskStetmann` | - | - |
| 2,2 | 科学倍增器 / `StetmannDualQueue` | `-` | 未解析 / Unresolved | - | - | - |

### 机械潜伏者巢穴 / `LurkerDenStetmann`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMStetmann.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Structure，种族 / Race Zerg，生命 / Life 850，费用 / Cost 250/150
- Catalog 技能链接 / Catalog ability links：`BuildInProgress`(基础 / Basic)、研发 / `HydraliskDenStetmannResearch`(研究技能 / CAbilResearch)、刺蛇孵生 / `HydraliskStetmannRespawn`(训练技能 / CAbilTrain)、`que5`(队列技能 / CAbilQueue)、集结 建造 斯塔特曼 / `RallyBuildingStetmann`(CAbilRally / CAbilRally)
- 关联 Behavior / Linked behaviors：`StetmannBuildingDoubleQueue`、`TerranBuildingBurnDown`、`ZergBuildingStetmannDies6`
- 可生产/创建 / Produced or created：机械刺蛇 / `HydraliskStetmann`
- 已隐藏基础按钮 / Hidden basic buttons：2 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | 研究蛇肌腱加强件 / `HydraliskDenStetmannResearch` | `HydraliskDenStetmannResearch,Research1` | 研究技能 / CAbilResearch | 升级 / Upgrade:`HydraliskStetmannMovementSpeed` | - | - |
| 0,1 | 研究博学飞弹发射器 / `HydraliskDenStetmannResearch` | `HydraliskDenStetmannResearch,Research3` | 研究技能 / CAbilResearch | 升级 / Upgrade:`HydraliskStetmannDamage` | - | - |
| 0,2 | 研究提尔级瞄准系统 / `HydraliskDenStetmannResearch` | `HydraliskDenStetmannResearch,Research2` | 研究技能 / CAbilResearch | 升级 / Upgrade:`HydraliskStetmannRange` | - | - |
| 0,3 | 研究增程式恐怖钻击算法 / `HydraliskDenStetmannResearch` | `HydraliskDenStetmannResearch,Research4` | 研究技能 / CAbilResearch | 升级 / Upgrade:`LurkerStetmannTunnelingBurstRange` | - | - |
| 0,4 | 研究集火强击算法 / `HydraliskDenStetmannResearch` | `HydraliskDenStetmannResearch,Research5` | 研究技能 / CAbilResearch | 升级 / Upgrade:`LurkerStetmannChannelingSpines` | - | - |
| 1,0 | 机械刺蛇 / `HydraliskStetmannPassive` | `-` | 未解析 / Unresolved | - | - | - |
| 1,1 | 机械潜伏者 / `LurkerStetmannPassive` | `-` | 未解析 / Unresolved | - | - | - |
| 1,4 | 设置集结点 / `RallyBuildingStetmann` | `RallyBuildingStetmann,Rally1` | CAbilRally / CAbilRally | - | - | - |
| 2,1 | 回收机械刺蛇 / `HydraliskStetmannRespawn` | `HydraliskStetmannRespawn,Train1` | 训练技能 / CAbilTrain | 机械刺蛇 / `HydraliskStetmann`、单位 / Unit:机械刺蛇 / `HydraliskStetmann` | - | - |
| 2,2 | 科学倍增器 / `StetmannDualQueue` | `-` | 未解析 / Unresolved | - | - | - |

### 机械感染深渊 / `InfestationPitStetmann`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMStetmann.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Structure，种族 / Race Zerg，生命 / Life 850，费用 / Cost 150/100
- Catalog 技能链接 / Catalog ability links：`BuildInProgress`(基础 / Basic)、研发 / `InfestationPitStetmannResearch2`(研究技能 / CAbilResearch)、感染者孵生 / `InfestorStetmannRespawn`(训练技能 / CAbilTrain)、`que5`(队列技能 / CAbilQueue)、集结 建造 斯塔特曼 / `RallyBuildingStetmann`(CAbilRally / CAbilRally)
- 关联 Behavior / Linked behaviors：`StetmannBuildingDoubleQueue`、`TerranBuildingBurnDown`、`ZergBuildingStetmannDies6`
- 可生产/创建 / Produced or created：机械感染者 / `InfestorStetmann`
- 已隐藏基础按钮 / Hidden basic buttons：2 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | 研究UMI-C充能协议 / `InfestationPitStetmannResearch2` | `InfestationPitStetmannResearch2,Research2` | 研究技能 / CAbilResearch | 升级 / Upgrade:`InfestorStetmannRecharge` | - | - |
| 0,1 | 研究“赠品”破坏者！ / `InfestationPitStetmannResearch2` | `InfestationPitStetmannResearch2,Research1` | 研究技能 / CAbilResearch | 升级 / Upgrade:`InfestorStetmannBonusRavager` | - | - |
| 1,0 | 机械感染者 / `InfestorStetmannPassive` | `-` | 未解析 / Unresolved | - | - | - |
| 1,4 | 设置集结点 / `RallyBuildingStetmann` | `RallyBuildingStetmann,Rally1` | CAbilRally / CAbilRally | - | - | - |
| 2,0 | 回收机械感染者 / `InfestorStetmannRespawn` | `InfestorStetmannRespawn,Train1` | 训练技能 / CAbilTrain | 机械感染者 / `InfestorStetmann`、单位 / Unit:机械感染者 / `InfestorStetmann` | - | - |
| 2,1 | 科学倍增器 / `StetmannDualQueue` | `-` | 未解析 / Unresolved | - | - | - |

### 机械尖塔 / `SpireStetmann`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMStetmann.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Structure，种族 / Race Zerg，生命 / Life 850，费用 / Cost 250/200
- Catalog 技能链接 / Catalog ability links：`BuildInProgress`(基础 / Basic)、腐化者孵生 / `CorruptorStetmannRespawn`(训练技能 / CAbilTrain)、`que5CancelToSelection`、集结 建造 斯塔特曼 / `RallyBuildingStetmann`(CAbilRally / CAbilRally)、`SpireStetmannResearch`(研究技能 / CAbilResearch)、变形建筑 (尖塔 斯台特曼 -> 巨型尖塔 斯台特曼) / `UpgradeToGreaterSpireStetmann`(变形技能 / CAbilMorph)
- 关联 Behavior / Linked behaviors：`StetmannBuildingDoubleQueue`、`TerranBuildingBurnDown`、`ZergBuildingStetmannDies6`
- 可生产/创建 / Produced or created：机械腐化者 / `CorruptorStetmann`、机械巨型尖塔 / `GreaterSpireStetmann`
- 已隐藏基础按钮 / Hidden basic buttons：2 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | 研究机械飞行单位攻击等级1 / `SpireStetmannResearch` | `SpireStetmannResearch,Research1` | 研究技能 / CAbilResearch | 升级 / Upgrade:`StetmannAirWeaponsLevel1` | - | - |
| 0,0 | 研究机械飞行单位攻击等级2 / `SpireStetmannResearch` | `SpireStetmannResearch,Research2` | 研究技能 / CAbilResearch | 升级 / Upgrade:`StetmannAirWeaponsLevel2` | - | - |
| 0,0 | 研究机械飞行单位攻击等级3 / `SpireStetmannResearch` | `SpireStetmannResearch,Research3` | 研究技能 / CAbilResearch | 升级 / Upgrade:`StetmannAirWeaponsLevel3` | - | - |
| 0,0 | 研究机械飞行单位攻击等级4 / `SpireStetmannResearch` | `SpireStetmannResearch,Research17` | 研究技能 / CAbilResearch | 升级 / Upgrade:`StetmannAirWeaponsLevel4` | - | - |
| 0,0 | 研究机械飞行单位攻击等级5 / `SpireStetmannResearch` | `SpireStetmannResearch,Research18` | 研究技能 / CAbilResearch | 升级 / Upgrade:`StetmannAirWeaponsLevel5` | - | - |
| 0,1 | 研究机械飞行单位钢板等级1 / `SpireStetmannResearch` | `SpireStetmannResearch,Research4` | 研究技能 / CAbilResearch | 升级 / Upgrade:`StetmannAirArmorsLevel1` | - | - |
| 0,1 | 研究机械飞行单位钢板等级2 / `SpireStetmannResearch` | `SpireStetmannResearch,Research5` | 研究技能 / CAbilResearch | 升级 / Upgrade:`StetmannAirArmorsLevel2` | - | - |
| 0,1 | 研究机械飞行单位钢板等级3 / `SpireStetmannResearch` | `SpireStetmannResearch,Research6` | 研究技能 / CAbilResearch | 升级 / Upgrade:`StetmannAirArmorsLevel3` | - | - |
| 0,1 | 研究机械飞行单位钢板等级4 / `SpireStetmannResearch` | `SpireStetmannResearch,Research15` | 研究技能 / CAbilResearch | 升级 / Upgrade:`StetmannAirArmorsLevel4` | - | - |
| 0,1 | 研究机械飞行单位钢板等级5 / `SpireStetmannResearch` | `SpireStetmannResearch,Research16` | 研究技能 / CAbilResearch | 升级 / Upgrade:`StetmannAirArmorsLevel5` | - | - |
| 0,2 | 研究大范围集束咆哮弹 / `SpireStetmannResearch` | `SpireStetmannResearch,Research7` | 研究技能 / CAbilResearch | 升级 / Upgrade:`CorruptorStetmannBiggerAoE` | - | - |
| 0,3 | 研究泰伦超洁降解液 / `SpireStetmannResearch` | `SpireStetmannResearch,Research8` | 研究技能 / CAbilResearch | 升级 / Upgrade:`CorruptorStetmannCausticSpray` | - | - |
| 0,4 | 研究机械飞蝗截击机舱室 / `SpireStetmannResearch` | `SpireStetmannResearch,Research9` | 研究技能 / CAbilResearch | 升级 / Upgrade:`BroodLordStetmannBombers` | - | - |
| 1,0 | 研究斯台特曼炮 / `SpireStetmannResearch` | `SpireStetmannResearch,Research10` | 研究技能 / CAbilResearch | 升级 / Upgrade:`BroodLordStetmannYamato` | - | - |
| 1,1 | 机械腐化者 / `CorruptorStetmannPassive` | `-` | 未解析 / Unresolved | - | - | - |
| 1,4 | 设置集结点 / `RallyBuildingStetmann` | `RallyBuildingStetmann,Rally1` | CAbilRally / CAbilRally | - | - | - |
| 2,0 | 变形为机械巨型尖塔 / `UpgradeToGreaterSpireStetmann` | `UpgradeToGreaterSpireStetmann,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:机械巨型尖塔 / `GreaterSpireStetmann` | - | - |
| 2,1 | 回收机械腐化者 / `CorruptorStetmannRespawn` | `CorruptorStetmannRespawn,Train1` | 训练技能 / CAbilTrain | 机械腐化者 / `CorruptorStetmann`、单位 / Unit:机械腐化者 / `CorruptorStetmann` | - | - |
| 2,2 | 科学倍增器 / `StetmannDualQueue` | `-` | 未解析 / Unresolved | - | - | - |
| 2,4 | 变形建筑 (尖塔 斯台特曼 -> 巨型尖塔 斯台特曼) / `UpgradeToGreaterSpireStetmann` | `UpgradeToGreaterSpireStetmann,Cancel` | 变形技能 / CAbilMorph | 单位 / Unit:机械巨型尖塔 / `GreaterSpireStetmann` | - | - |

### 机械巨型尖塔 / `GreaterSpireStetmann`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMStetmann.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Structure，种族 / Race Zerg，生命 / Life 1000，费用 / Cost 350/350
- Catalog 技能链接 / Catalog ability links：`BuildInProgress`(基础 / Basic)、腐化者孵生 / `CorruptorStetmannRespawn`(训练技能 / CAbilTrain)、`que5CancelToSelection`、集结 建造 斯塔特曼 / `RallyBuildingStetmann`(CAbilRally / CAbilRally)、`SpireStetmannResearch`(研究技能 / CAbilResearch)
- 关联 Behavior / Linked behaviors：`StetmannBuildingDoubleQueue`、`TerranBuildingBurnDown`、`ZergBuildingStetmannDies6`
- 可生产/创建 / Produced or created：机械腐化者 / `CorruptorStetmann`
- 已隐藏基础按钮 / Hidden basic buttons：2 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | 研究机械飞行单位攻击等级1 / `SpireStetmannResearch` | `SpireStetmannResearch,Research1` | 研究技能 / CAbilResearch | 升级 / Upgrade:`StetmannAirWeaponsLevel1` | - | - |
| 0,0 | 研究机械飞行单位攻击等级2 / `SpireStetmannResearch` | `SpireStetmannResearch,Research2` | 研究技能 / CAbilResearch | 升级 / Upgrade:`StetmannAirWeaponsLevel2` | - | - |
| 0,0 | 研究机械飞行单位攻击等级3 / `SpireStetmannResearch` | `SpireStetmannResearch,Research3` | 研究技能 / CAbilResearch | 升级 / Upgrade:`StetmannAirWeaponsLevel3` | - | - |
| 0,0 | 研究机械飞行单位攻击等级4 / `SpireStetmannResearch` | `SpireStetmannResearch,Research17` | 研究技能 / CAbilResearch | 升级 / Upgrade:`StetmannAirWeaponsLevel4` | - | - |
| 0,0 | 研究机械飞行单位攻击等级5 / `SpireStetmannResearch` | `SpireStetmannResearch,Research18` | 研究技能 / CAbilResearch | 升级 / Upgrade:`StetmannAirWeaponsLevel5` | - | - |
| 0,1 | 研究机械飞行单位钢板等级1 / `SpireStetmannResearch` | `SpireStetmannResearch,Research4` | 研究技能 / CAbilResearch | 升级 / Upgrade:`StetmannAirArmorsLevel1` | - | - |
| 0,1 | 研究机械飞行单位钢板等级2 / `SpireStetmannResearch` | `SpireStetmannResearch,Research5` | 研究技能 / CAbilResearch | 升级 / Upgrade:`StetmannAirArmorsLevel2` | - | - |
| 0,1 | 研究机械飞行单位钢板等级3 / `SpireStetmannResearch` | `SpireStetmannResearch,Research6` | 研究技能 / CAbilResearch | 升级 / Upgrade:`StetmannAirArmorsLevel3` | - | - |
| 0,1 | 研究机械飞行单位钢板等级4 / `SpireStetmannResearch` | `SpireStetmannResearch,Research15` | 研究技能 / CAbilResearch | 升级 / Upgrade:`StetmannAirArmorsLevel4` | - | - |
| 0,1 | 研究机械飞行单位钢板等级5 / `SpireStetmannResearch` | `SpireStetmannResearch,Research16` | 研究技能 / CAbilResearch | 升级 / Upgrade:`StetmannAirArmorsLevel5` | - | - |
| 0,2 | 研究大范围集束咆哮弹 / `SpireStetmannResearch` | `SpireStetmannResearch,Research7` | 研究技能 / CAbilResearch | 升级 / Upgrade:`CorruptorStetmannBiggerAoE` | - | - |
| 0,3 | 研究泰伦超洁降解液 / `SpireStetmannResearch` | `SpireStetmannResearch,Research8` | 研究技能 / CAbilResearch | 升级 / Upgrade:`CorruptorStetmannCausticSpray` | - | - |
| 0,4 | 研究机械飞蝗截击机舱室 / `SpireStetmannResearch` | `SpireStetmannResearch,Research9` | 研究技能 / CAbilResearch | 升级 / Upgrade:`BroodLordStetmannBombers` | - | - |
| 1,0 | 研究斯台特曼炮 / `SpireStetmannResearch` | `SpireStetmannResearch,Research10` | 研究技能 / CAbilResearch | 升级 / Upgrade:`BroodLordStetmannYamato` | - | - |
| 1,1 | 机械腐化者 / `CorruptorStetmannPassive` | `-` | 未解析 / Unresolved | - | - | - |
| 1,2 | 机械巢式战列空母 / `BroodLordStetmannPassive` | `-` | 未解析 / Unresolved | - | - | - |
| 1,4 | 设置集结点 / `RallyBuildingStetmann` | `RallyBuildingStetmann,Rally1` | CAbilRally / CAbilRally | - | - | - |
| 2,1 | 回收机械腐化者 / `CorruptorStetmannRespawn` | `CorruptorStetmannRespawn,Train1` | 训练技能 / CAbilTrain | 机械腐化者 / `CorruptorStetmann`、单位 / Unit:机械腐化者 / `CorruptorStetmann` | - | - |
| 2,2 | 科学倍增器 / `StetmannDualQueue` | `-` | 未解析 / Unresolved | - | - | - |

### 机械雷兽窟 / `UltraliskCavernStetmann`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMStetmann.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Structure，种族 / Race Zerg，生命 / Life 850，费用 / Cost 200/200
- Catalog 技能链接 / Catalog ability links：`BuildInProgress`(基础 / Basic)、`que5`(队列技能 / CAbilQueue)、集结 建造 斯塔特曼 / `RallyBuildingStetmann`(CAbilRally / CAbilRally)、研发 / `UltraliskCavernStetmannResearch`(研究技能 / CAbilResearch)、雷兽 孵生 / `UltraliskStetmannRespawn`(训练技能 / CAbilTrain)
- 关联 Behavior / Linked behaviors：`StetmannBuildingDoubleQueue`、`TerranBuildingBurnDown`、`ZergBuildingStetmannDies6`
- 可生产/创建 / Produced or created：机械雷兽 / `UltraliskStetmann`
- 已隐藏基础按钮 / Hidden basic buttons：2 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | 研究静电惊喜！ / `UltraliskCavernStetmannResearch` | `UltraliskCavernStetmannResearch,Research1` | 研究技能 / CAbilResearch | 升级 / Upgrade:`UltraliskBurrowChargeMechanicalStun` | - | - |
| 0,1 | 研究机甲揩油模组 / `UltraliskCavernStetmannResearch` | `UltraliskCavernStetmannResearch,Research2` | 研究技能 / CAbilResearch | 升级 / Upgrade:`UltraliskStetmannMechanicalLifeLeech` | - | - |
| 0,2 | 研究几丁钛合金装甲 / `UltraliskCavernStetmannResearch` | `UltraliskCavernStetmannResearch,Research3` | 研究技能 / CAbilResearch | 升级 / Upgrade:`UltraliskStetmannArmor` | - | - |
| 1,0 | 机械雷兽 / `UltraliskStetmannPassive` | `-` | 未解析 / Unresolved | - | - | - |
| 1,4 | 设置集结点 / `RallyBuildingStetmann` | `RallyBuildingStetmann,Rally1` | CAbilRally / CAbilRally | - | - | - |
| 2,0 | 回收机械雷兽 / `UltraliskStetmannRespawn` | `UltraliskStetmannRespawn,Train1` | 训练技能 / CAbilTrain | 机械雷兽 / `UltraliskStetmann`、单位 / Unit:机械雷兽 / `UltraliskStetmann` | - | - |
| 2,1 | 科学倍增器 / `StetmannDualQueue` | `-` | 未解析 / Unresolved | - | - | - |

### 机械脊针爬虫 / `SpineCrawlerStetmann`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMStetmann.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Structure，种族 / Race Zerg，生命 / Life 300，费用 / Cost 150/0
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`BuildInProgress`(基础 / Basic)、站起 / `SpineCrawlerUprootStetmann`(变形技能 / CAbilMorph)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`TerranBuildingBurnDown`
- 可生产/创建 / Produced or created：机械脊针爬虫 / `SpineCrawlerUprootedStetmann`
- 已隐藏基础按钮 / Hidden basic buttons：3 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | 站起 / `SpineCrawlerUprootStetmann` | `SpineCrawlerUprootStetmann,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:机械脊针爬虫 / `SpineCrawlerUprootedStetmann` | - | - |

### 机械脊针爬虫 / `SpineCrawlerUprootedStetmann`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status state-only，模块 / Module XMStetmann.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Structure，种族 / Race Zerg，生命 / Life 300，费用 / Cost 150/0
- Catalog 技能链接 / Catalog ability links：`move`(基础 / Basic)、扎根 / `SpineCrawlerRootStetmann`(放置变形技能 / CAbilMorphPlacement)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`TerranBuildingBurnDown`
- 已隐藏基础按钮 / Hidden basic buttons：7 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | `StetmannStetzoneAbsorption` | `-` | 未解析 / Unresolved | - | - | - |
| 2,0 | 扎根 / `SpineCrawlerRootStetmann` | `SpineCrawlerRootStetmann,Execute` | 放置变形技能 / CAbilMorphPlacement | - | - | - |

### 机械孢子爬虫 / `SporeCrawlerStetmann`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMStetmann.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Structure，种族 / Race Zerg，生命 / Life 400，费用 / Cost 125/0
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`BuildInProgress`(基础 / Basic)、站起 / `SporeCrawlerUprootStetmann`(变形技能 / CAbilMorph)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`Detector11`、`TerranBuildingBurnDown`
- 可生产/创建 / Produced or created：机械孢子爬虫 / `SporeCrawlerUprootedStetmann`
- 已隐藏基础按钮 / Hidden basic buttons：3 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | 站起 / `SporeCrawlerUprootStetmann` | `SporeCrawlerUprootStetmann,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:机械孢子爬虫 / `SporeCrawlerUprootedStetmann` | - | - |
| 2,3 | `Detector` | `-` | 未解析 / Unresolved | - | - | NotUnderConstruction |

### 机械孢子爬虫 / `SporeCrawlerUprootedStetmann`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status state-only，模块 / Module XMStetmann.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Structure，种族 / Race Zerg，生命 / Life 400，费用 / Cost 125/0
- Catalog 技能链接 / Catalog ability links：`move`(基础 / Basic)、扎根 / `SporeCrawlerRootStetmann`(放置变形技能 / CAbilMorphPlacement)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`TerranBuildingBurnDown`
- 已隐藏基础按钮 / Hidden basic buttons：7 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | `StetmannStetzoneAbsorption` | `-` | 未解析 / Unresolved | - | - | - |
| 2,0 | 扎根 / `SporeCrawlerRootStetmann` | `SporeCrawlerRootStetmann,Execute` | 放置变形技能 / CAbilMorphPlacement | - | - | - |

### 艾星 / `PowerTowerStetmann`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMStetmann.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Structure，种族 / Race Zerg，生命 / Life 5
- Catalog 技能链接 / Catalog ability links：`BuildInProgress`(基础 / Basic)、“艾的急切”超载 / `FASTOverloadStetmann`(目标效果技能 / CAbilEffectTarget)、“艾的呵护”超载 / `HUGSOverloadStetmann`(目标效果技能 / CAbilEffectTarget)、“艾的滋润”超载 / `JUICEOverloadStetmann`(目标效果技能 / CAbilEffectTarget)、变形 (能量塔 -> 停用的能量塔) / `MorphToPowerTowerStetmannDeactivated`(变形技能 / CAbilMorph)
- 关联 Behavior / Linked behaviors：`PowerTowerDeathStetmann`、`PowerUserStetmann`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | “艾的急切”超载 / `FASTOverloadStetmann` | `FASTOverloadStetmann,Execute` | 目标效果技能 / CAbilEffectTarget | - | 施加行为效果 / CEffectApplyBehavior:`FASTOverloadStetmannAB` | - |
| 0,0 | “艾的呵护”超载 / `HUGSOverloadStetmann` | `HUGSOverloadStetmann,Execute` | 目标效果技能 / CAbilEffectTarget | - | 施加行为效果 / CEffectApplyBehavior:`HUGSOverloadStetmannAB` | - |
| 0,0 | “艾的滋润”超载 / `JUICEOverloadStetmann` | `JUICEOverloadStetmann,Execute` | 目标效果技能 / CAbilEffectTarget | - | 施加行为效果 / CEffectApplyBehavior:`JUICEOverloadStetmannAB` | - |
| 1,0 | 残骸回收器 / `GaryStetmannMechanicalReconstruction` | `-` | 未解析 / Unresolved | - | - | - |
| 1,1 | “爱心区域”生成器 / `StetmannFieldGeneratorEnergy` | `-` | 未解析 / Unresolved | - | - | HavePowerFieldEnergyRegenerationUpgrade |
| 1,1 | “爱心区域”生成器 / `StetmannFieldGeneratorHealth` | `-` | 未解析 / Unresolved | - | - | HavePowerFieldHPRegenerationUpgrade |
| 1,1 | “爱心区域”生成器 / `StetmannFieldGeneratorSpeed` | `-` | 未解析 / Unresolved | - | - | HavePowerFieldMovementSpeedUpgrade |

## 生产链补充建筑 / Production-support Buildings

- 无 / None

## 单位 / Units

### 机械工蜂 / `DroneStetmann`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMStetmann.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race Zerg，生命 / Life 40，费用 / Cost 50/0，补给 / Supply 1
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、潜地 / `BurrowDroneDownStetmann`(变形技能 / CAbilMorph)、`DroneHarvest`、`move`(基础 / Basic)、`Repair`、喷漆-异虫 / `SprayZerg`、`stop`(基础 / Basic)、变形单位 (工蜂 -> 斯台特曼建筑) / `ZergBuildStetmann`(建造技能 / CAbilBuild)
- 关联 Behavior / Linked behaviors：`PowerFieldBuffSelfStetmann`
- 可生产/创建 / Produced or created：机械爆虫巢穴 / `BanelingNestStetmann`，耗时 / Time 30s、`DroneStetmannBurrowed`（非本指挥官名册 / not in current commander roster）、机械进化腔 / `EvolutionChamberStetmann`，耗时 / Time 40s、机械萃取房 / `ExtractorStetmann`，耗时 / Time 30s、机械孵化场 / `HatcheryStetmann`，耗时 / Time 60s、机械刺蛇巢 / `HydraliskDenStetmann`，耗时 / Time 40s、机械感染深渊 / `InfestationPitStetmann`，耗时 / Time 40s、机械分裂池 / `SpawningPoolStetmann`，耗时 / Time 30s、机械脊针爬虫 / `SpineCrawlerStetmann`，耗时 / Time 30s、机械尖塔 / `SpireStetmann`，耗时 / Time 40s、机械孢子爬虫 / `SporeCrawlerStetmann`，耗时 / Time 30s、机械雷兽窟 / `UltraliskCavernStetmann`，耗时 / Time 50s
- 已隐藏基础按钮 / Hidden basic buttons：9 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | `DroneHarvest` | `DroneHarvest,Gather` | 未解析 / Unresolved | - | - | - |
| 1,1 | `DroneHarvest` | `DroneHarvest,Return` | 未解析 / Unresolved | - | - | - |
| 2,2 | `Repair` | `Repair,Execute` | 未解析 / Unresolved | - | - | - |
| 2,3 | `MutatorRemoveWorkerSleep` | `MutatorRemoveWorkerSleep,255` | 瞬发效果技能 / CAbilEffectInstant | - | - | - |
| 2,3 | 喷漆-异虫 / `SprayZerg` | `SprayZerg,Execute` | 未解析 / Unresolved | - | - | - |
| 2,4 | 潜地 / `BurrowDroneDownStetmann` | `BurrowDroneDownStetmann,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:`DroneStetmannBurrowed` | - | - |
| 0,0 | 变形为机械孵化场 / `ZergBuildStetmann` | `ZergBuildStetmann,Build1` | 建造技能 / CAbilBuild | 机械孵化场 / `HatcheryStetmann`、单位 / Unit:机械孵化场 / `HatcheryStetmann` | - | - |
| 0,1 | 变形为机械萃取房 / `ZergBuildStetmann` | `ZergBuildStetmann,Build3` | 建造技能 / CAbilBuild | 机械萃取房 / `ExtractorStetmann`、单位 / Unit:机械萃取房 / `ExtractorStetmann` | - | - |
| 1,0 | 变形为机械分裂池 / `ZergBuildStetmann` | `ZergBuildStetmann,Build4` | 建造技能 / CAbilBuild | 机械分裂池 / `SpawningPoolStetmann`、单位 / Unit:机械分裂池 / `SpawningPoolStetmann` | - | - |
| 1,1 | 变形为机械进化腔 / `ZergBuildStetmann` | `ZergBuildStetmann,Build5` | 建造技能 / CAbilBuild | 机械进化腔 / `EvolutionChamberStetmann`、单位 / Unit:机械进化腔 / `EvolutionChamberStetmann` | - | - |
| 1,2 | 变形为机械爆虫巢穴 / `ZergBuildStetmann` | `ZergBuildStetmann,Build11` | 建造技能 / CAbilBuild | 机械爆虫巢穴 / `BanelingNestStetmann`、单位 / Unit:机械爆虫巢穴 / `BanelingNestStetmann` | - | - |
| 2,0 | 变形为机械脊针爬虫 / `ZergBuildStetmann` | `ZergBuildStetmann,Build15` | 建造技能 / CAbilBuild | 机械脊针爬虫 / `SpineCrawlerStetmann`、单位 / Unit:机械脊针爬虫 / `SpineCrawlerStetmann` | - | - |
| 2,1 | 变形为机械孢子爬虫 / `ZergBuildStetmann` | `ZergBuildStetmann,Build16` | 建造技能 / CAbilBuild | 机械孢子爬虫 / `SporeCrawlerStetmann`、单位 / Unit:机械孢子爬虫 / `SporeCrawlerStetmann` | - | - |
| 0,0 | 变形为机械刺蛇巢 / `ZergBuildStetmann` | `ZergBuildStetmann,Build6` | 建造技能 / CAbilBuild | 机械刺蛇巢 / `HydraliskDenStetmann`、单位 / Unit:机械刺蛇巢 / `HydraliskDenStetmann` | - | - |
| 0,1 | 变形为机械感染深渊 / `ZergBuildStetmann` | `ZergBuildStetmann,Build9` | 建造技能 / CAbilBuild | 机械感染深渊 / `InfestationPitStetmann`、单位 / Unit:机械感染深渊 / `InfestationPitStetmann` | - | - |
| 1,0 | 变形为机械尖塔 / `ZergBuildStetmann` | `ZergBuildStetmann,Build7` | 建造技能 / CAbilBuild | 机械尖塔 / `SpireStetmann`、单位 / Unit:机械尖塔 / `SpireStetmann` | - | - |
| 2,0 | 变形为机械雷兽窟 / `ZergBuildStetmann` | `ZergBuildStetmann,Build8` | 建造技能 / CAbilBuild | 机械雷兽窟 / `UltraliskCavernStetmann`、单位 / Unit:机械雷兽窟 / `UltraliskCavernStetmann` | - | - |

### 盖瑞 / `GaryStetmann`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMStetmann.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race Zerg，生命 / Life 500
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、盖瑞电球 / `GaryStetmannOrb`(目标效果技能 / CAbilEffectTarget)、盖瑞能量塔超载 / `GaryStetmannPowerTowerOverchargeEnergy`(目标效果技能 / CAbilEffectTarget)、盖瑞能量塔超载 / `GaryStetmannPowerTowerOverchargeHealth`(目标效果技能 / CAbilEffectTarget)、盖瑞能量塔超载 / `GaryStetmannPowerTowerOverchargeSpeed`(目标效果技能 / CAbilEffectTarget)、盖瑞召回 / `GaryStetmannRecall`(目标效果技能 / CAbilEffectTarget)、变形为超级盖瑞 / `MorphToSuperGaryStetmann`(变形技能 / CAbilMorph)、`move`(基础 / Basic)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`PowerFieldBuffSelfStetmann`
- 可生产/创建 / Produced or created：超级盖瑞 / `SuperGaryStetmann`
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | 残骸回收器 / `GaryStetmannMechanicalReconstruction` | `-` | 未解析 / Unresolved | - | - | - |
| 2,0 | 盖瑞电球 / `GaryStetmannOrb` | `GaryStetmannOrb,Execute` | 目标效果技能 / CAbilEffectTarget | - | CEffectSwitch / CEffectSwitch:`GaryStetmannOrbInitialSwitch` | - |
| 2,1 | 艾星超载 / `GaryStetmannPowerTowerOverchargeEnergy` | `GaryStetmannPowerTowerOverchargeEnergy,Execute` | 目标效果技能 / CAbilEffectTarget | - | 区域枚举效果 / CEffectEnumArea:`PowerTowerOverchargeFindTarget` | - |
| 2,1 | 艾星超载 / `GaryStetmannPowerTowerOverchargeHealth` | `GaryStetmannPowerTowerOverchargeHealth,Execute` | 目标效果技能 / CAbilEffectTarget | - | 区域枚举效果 / CEffectEnumArea:`PowerTowerOverchargeFindTarget` | - |
| 2,1 | 艾星超载 / `GaryStetmannPowerTowerOverchargeSpeed` | `GaryStetmannPowerTowerOverchargeSpeed,Execute` | 目标效果技能 / CAbilEffectTarget | - | 区域枚举效果 / CEffectEnumArea:`PowerTowerOverchargeFindTarget` | - |
| 2,2 | 半稳定物质传送 / `GaryStetmannRecall` | `GaryStetmannRecall,Execute` | 目标效果技能 / CAbilEffectTarget | - | 区域枚举效果 / CEffectEnumArea:`GaryStetmannRecallFindTarget` | - |
| 2,3 | 超级盖瑞变形程序 / `MorphToSuperGaryStetmann` | `MorphToSuperGaryStetmann,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:超级盖瑞 / `SuperGaryStetmann` | 修改玩家效果 / CEffectModifyPlayer:`SuperGaryStetmannAbilities` | - |
| 2,4 | 取消 / `MorphToSuperGaryStetmann` | `MorphToSuperGaryStetmann,Cancel` | 变形技能 / CAbilMorph | 单位 / Unit:超级盖瑞 / `SuperGaryStetmann` | 修改玩家效果 / CEffectModifyPlayer:`SuperGaryStetmannAbilities` | - |

### 超级盖瑞 / `SuperGaryStetmann`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMStetmann.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race Zerg，生命 / Life 1000
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`move`(基础 / Basic)、`PowerFieldSuperGaryStetmannEnergy`(瞬发效果技能 / CAbilEffectInstant)、`PowerFieldSuperGaryStetmannHealth`(瞬发效果技能 / CAbilEffectInstant)、`PowerFieldSuperGaryStetmannSpeed`(瞬发效果技能 / CAbilEffectInstant)、`stop`(基础 / Basic)、超级盖瑞电球 / `SuperGaryStetmannOrb`(目标效果技能 / CAbilEffectTarget)、超级盖瑞能量塔超载 / `SuperGaryStetmannPowerTowerOverchargeEnergy`(目标效果技能 / CAbilEffectTarget)、超级盖瑞能量塔超载 / `SuperGaryStetmannPowerTowerOverchargeHealth`(目标效果技能 / CAbilEffectTarget)、超级盖瑞能量塔超载 / `SuperGaryStetmannPowerTowerOverchargeSpeed`(目标效果技能 / CAbilEffectTarget)、超级盖瑞召回 / `SuperGaryStetmannRecall`(目标效果技能 / CAbilEffectTarget)
- 关联 Behavior / Linked behaviors：`Detector11`、`PowerFieldBuffSelfStetmann`、`SuperGaryStetmannTheBestOilAttribute`
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | 残骸回收器 / `GaryStetmannMechanicalReconstruction` | `-` | 未解析 / Unresolved | - | - | - |
| 1,1 | 最好的机油 / `GaryStetmannTheBestOil` | `-` | 未解析 / Unresolved | - | - | - |
| 1,4 | `Detector` | `-` | 未解析 / Unresolved | - | - | - |
| 2,0 | 盖瑞电球 / `SuperGaryStetmannOrb` | `SuperGaryStetmannOrb,Execute` | 目标效果技能 / CAbilEffectTarget | - | CEffectSwitch / CEffectSwitch:`GaryStetmannOrbInitialSwitch` | - |
| 2,1 | 艾星超载 / `SuperGaryStetmannPowerTowerOverchargeEnergy` | `SuperGaryStetmannPowerTowerOverchargeEnergy,Execute` | 目标效果技能 / CAbilEffectTarget | - | 区域枚举效果 / CEffectEnumArea:`PowerTowerOverchargeFindTarget` | - |
| 2,1 | 艾星超载 / `SuperGaryStetmannPowerTowerOverchargeHealth` | `SuperGaryStetmannPowerTowerOverchargeHealth,Execute` | 目标效果技能 / CAbilEffectTarget | - | 区域枚举效果 / CEffectEnumArea:`PowerTowerOverchargeFindTarget` | - |
| 2,1 | 艾星超载 / `SuperGaryStetmannPowerTowerOverchargeSpeed` | `SuperGaryStetmannPowerTowerOverchargeSpeed,Execute` | 目标效果技能 / CAbilEffectTarget | - | 区域枚举效果 / CEffectEnumArea:`PowerTowerOverchargeFindTarget` | - |
| 2,2 | 半稳定物质传送 / `SuperGaryStetmannRecall` | `SuperGaryStetmannRecall,Execute` | 目标效果技能 / CAbilEffectTarget | - | 区域枚举效果 / CEffectEnumArea:`GaryStetmannRecallFindTarget` | - |
| 2,3 | 盖瑞区域 / `PowerFieldSuperGaryStetmannEnergy` | `PowerFieldSuperGaryStetmannEnergy,Execute` | 瞬发效果技能 / CAbilEffectInstant | - | 施加行为效果 / CEffectApplyBehavior:`GaryStetmannPowerCountdown` | - |
| 2,3 | 盖瑞区域 / `PowerFieldSuperGaryStetmannHealth` | `PowerFieldSuperGaryStetmannHealth,Execute` | 瞬发效果技能 / CAbilEffectInstant | - | 施加行为效果 / CEffectApplyBehavior:`GaryStetmannPowerCountdown` | - |
| 2,3 | 盖瑞区域 / `PowerFieldSuperGaryStetmannSpeed` | `PowerFieldSuperGaryStetmannSpeed,Execute` | 瞬发效果技能 / CAbilEffectInstant | - | 施加行为效果 / CEffectApplyBehavior:`GaryStetmannPowerCountdown` | - |

### 机械跳虫 / `ZerglingStetmann`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMStetmann.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race Zerg，生命 / Life 35，能量 / Energy 50，费用 / Cost 25/0，补给 / Supply 0.5
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、潜地 / `BurrowZerglingDownStetmann`(变形技能 / CAbilMorph)、变形为爆虫 斯台特曼 / `MorphToBanelingStetmann`(变形技能 / CAbilMorph)、`move`(基础 / Basic)、`que1`、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`PowerFieldBuffSelfStetmann`、`ZerglingAttackSpeedStetmann`、`ZerglingHardenedShieldStetmann`
- 可生产/创建 / Produced or created：机械爆虫 / `BanelingStetmann`、`BanelingStetmannCocoon`（非本指挥官名册 / not in current commander roster）、`ZerglingStetmannBurrowed`（非本指挥官名册 / not in current commander roster）
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | 金属机能加速 / `ZerglingStetmannMovementSpeedPassive` | `-` | 未解析 / Unresolved | - | - | HaveZerglingStetmannMovementSpeed |
| 1,1 | 艾能刚毅护盾 / `ZerglingStetmannHardenedShield` | `-` | 未解析 / Unresolved | - | - | HaveZerglingStetmannHardenedShield |
| 1,2 | 合成肾上腺泵 / `ZerglingStetmannAttackSpeedPassive` | `-` | 未解析 / Unresolved | - | - | HaveZerglingStetmannAttackSpeed |
| 1,4 | 可回收物 / `ZerglingStetmannScrapDrop` | `-` | 未解析 / Unresolved | - | - | - |
| 2,0 | 变形为机械爆虫 / `MorphToBanelingStetmann` | `MorphToBanelingStetmann,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:`BanelingStetmannCocoon`、单位 / Unit:机械爆虫 / `BanelingStetmann` | - | - |
| 2,4 | 潜地 / `BurrowZerglingDownStetmann` | `BurrowZerglingDownStetmann,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:`ZerglingStetmannBurrowed` | - | - |

### 机械爆虫 / `BanelingStetmann`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMStetmann.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race Zerg，生命 / Life 30，能量 / Energy 50，费用 / Cost 50/15，补给 / Supply 0.5
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、爆虫爆炸 / `BanelingStetmannExplode`(瞬发效果技能 / CAbilEffectInstant)、`BanelingStetmannJump`(CAbilAugment / CAbilAugment)、潜地 / `BurrowBanelingDownStetmann`(变形技能 / CAbilMorph)、`move`(基础 / Basic)、`stop`(基础 / Basic)、`VolatileBurstBuilding`
- 关联 Behavior / Linked behaviors：`BanelingExplodeStetmann`、`BanelingStetmannManaShield`、`PowerFieldBuffSelfStetmann`
- 可生产/创建 / Produced or created：`BanelingStetmannBurrowed`（非本指挥官名册 / not in current commander roster）
- 已隐藏基础按钮 / Hidden basic buttons：6 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | 艾能轰击屏障 / `BanelingStetmannManaShield` | `-` | 未解析 / Unresolved | - | - | - |
| 1,1 | 艾能强化炸药 / `BanelingStetmannExtraDamage` | `-` | 未解析 / Unresolved | - | - | HaveBanelingStetmannExtraDamage |
| 1,4 | 可回收物 / `BanelingStetmannScrapDrop` | `-` | 未解析 / Unresolved | - | - | - |
| 2,0 | 爆炸 / `BanelingStetmannExplode` | `BanelingStetmannExplode,Execute` | 瞬发效果技能 / CAbilEffectInstant | - | 效果集合 / CEffectSet:`BanelingStetmannExplodeSet` | - |
| 2,1 | `VolatileBurstBuilding` | `VolatileBurstBuilding,Off` | 未解析 / Unresolved | - | - | - |
| 2,1 | `VolatileBurstBuilding` | `VolatileBurstBuilding,On` | 未解析 / Unresolved | - | - | - |
| 2,2 | 离心火箭伺服器 / `BanelingStetmannJump` | `BanelingStetmannJump,Execute` | CAbilAugment / CAbilAugment | - | - | - |
| 2,4 | 潜地 / `BurrowBanelingDownStetmann` | `BurrowBanelingDownStetmann,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:`BanelingStetmannBurrowed` | - | - |

### 机械蟑螂 / `RoachStetmann`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMStetmann.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race Zerg，生命 / Life 75
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、潜地 / `BurrowRoachDownStetmann`(变形技能 / CAbilMorph)、`move`(基础 / Basic)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`PowerFieldBuffSelfStetmann`
- 可生产/创建 / Produced or created：机械破坏者 / `RavagerStetmann`、`RavagerStetmannCocoon`（非本指挥官名册 / not in current commander roster）、`RoachStetmannBurrowed`（非本指挥官名册 / not in current commander roster）
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | 极速再生 / `RoachStetmannRapidRegeneration` | `-` | 未解析 / Unresolved | - | - | - |
| 2,0 | 变形为破坏者 斯台特曼 / `MorphToRavagerStetmann` | `MorphToRavagerStetmann,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:`RavagerStetmannCocoon`、单位 / Unit:机械破坏者 / `RavagerStetmann` | - | - |
| 2,4 | 潜地 / `BurrowRoachDownStetmann` | `BurrowRoachDownStetmann,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:`RoachStetmannBurrowed` | - | - |

### 机械破坏者 / `RavagerStetmann`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMStetmann.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race Zerg，生命 / Life 80
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、潜地 / `BurrowRavagerDownStetmann`(变形技能 / CAbilMorph)、`move`(基础 / Basic)、环境危害性喷发 / `RavagerStetmannCorrosiveBile`(目标效果技能 / CAbilEffectTarget)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`PowerFieldBuffSelfStetmann`
- 可生产/创建 / Produced or created：`RavagerStetmannBurrowed`（非本指挥官名册 / not in current commander roster）
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | 环境危害性喷发 / `RavagerStetmannCorrosiveBile` | `RavagerStetmannCorrosiveBile,Execute` | 目标效果技能 / CAbilEffectTarget | - | 区域枚举效果 / CEffectEnumArea:`RavagerCorrosiveBileAoeCursorDummy`、效果集合 / CEffectSet:`RavagerStetmannCorrosiveBileAoELaunchSet` | - |
| 2,4 | 潜地 / `BurrowRavagerDownStetmann` | `BurrowRavagerDownStetmann,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:`RavagerStetmannBurrowed` | - | - |

### 机械刺蛇 / `HydraliskStetmann`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMStetmann.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race Zerg，生命 / Life 80，能量 / Energy 100，费用 / Cost 100/50，补给 / Supply 2
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、潜地 / `BurrowHydraliskDownStetmann`(变形技能 / CAbilMorph)、`HydraliskStetmannMissilePower`(行为/被动技能 / CAbilBehavior)、变形为潜伏者 斯台特曼 / `MorphToLurkerStetmann`(变形技能 / CAbilMorph)、`move`(基础 / Basic)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`PowerFieldBuffSelfStetmann`
- 可生产/创建 / Produced or created：`HydraliskStetmannBurrowed`（非本指挥官名册 / not in current commander roster）、机械潜伏者 / `LurkerStetmann`、`LurkerStetmannCocoon`（非本指挥官名册 / not in current commander roster）
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | 蛇肌腱加强件 / `HydraliskStetmannMovementSpeedPassive` | `-` | 未解析 / Unresolved | - | - | HaveHydraliskStetmannMovementSpeed |
| 1,1 | 提尔级瞄准系统 / `HydraliskStetmannRangePassive` | `-` | 未解析 / Unresolved | - | - | HaveHydraliskStetmannRange |
| 1,4 | 可回收物 / `HydraliskStetmannScrapDrop` | `-` | 未解析 / Unresolved | - | - | - |
| 2,0 | 增威弹头：开 / `HydraliskStetmannMissilePower` | `HydraliskStetmannMissilePower,On` | 行为/被动技能 / CAbilBehavior | - | - | - |
| 2,1 | 增威弹头：关 / `HydraliskStetmannMissilePower` | `HydraliskStetmannMissilePower,Off` | 行为/被动技能 / CAbilBehavior | - | - | - |
| 2,2 | 变形为机械潜伏者 / `MorphToLurkerStetmann` | `MorphToLurkerStetmann,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:`LurkerStetmannCocoon`、单位 / Unit:机械潜伏者 / `LurkerStetmann` | - | - |
| 2,4 | 潜地 / `BurrowHydraliskDownStetmann` | `BurrowHydraliskDownStetmann,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:`HydraliskStetmannBurrowed` | - | - |

### 机械潜伏者 / `LurkerStetmann`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMStetmann.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race Zerg，生命 / Life 200，能量 / Energy 200，费用 / Cost 150/150，补给 / Supply 3
- Catalog 技能链接 / Catalog ability links：潜地 / `BurrowLurkerDownStetmann`(变形技能 / CAbilMorph)、快速潜地 / `FastBurrowLurkerDownStetmann`(变形技能 / CAbilMorph)、Lurker Channeling Spines / `LurkerStetmannChannelingSpines`(目标效果技能 / CAbilEffectTarget)、Lurker Tunneling Burst / `LurkerStetmannTunnelingBurst`(目标效果技能 / CAbilEffectTarget)、`move`(基础 / Basic)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`PowerFieldBuffSelfStetmann`
- 可生产/创建 / Produced or created：机械潜伏者 / `LurkerStetmannBurrowed`
- 已隐藏基础按钮 / Hidden basic buttons：6 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,4 | 可回收物 / `LurkerStetmannScrapDrop` | `-` | 未解析 / Unresolved | - | - | - |
| 2,0 | 恐怖钻击算法 / `LurkerStetmannTunnelingBurst` | `LurkerStetmannTunnelingBurst,Execute` | 目标效果技能 / CAbilEffectTarget | - | CEffectSwitch / CEffectSwitch:`LurkerStetmannTunnelingBurstMaxRangeSwitch` | - |
| 2,1 | 集火强击算法 / `LurkerStetmannChannelingSpines` | `LurkerStetmannChannelingSpines,Execute` | 目标效果技能 / CAbilEffectTarget | - | CEffectSwitch / CEffectSwitch:`LurkerStetmannChannelingSpinesBurrowSwitch` | - |
| 2,4 | 潜地 / `BurrowLurkerDownStetmann` | `BurrowLurkerDownStetmann,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:机械潜伏者 / `LurkerStetmannBurrowed` | - | - |

### 机械潜伏者 / `LurkerStetmannBurrowed`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status state-only，模块 / Module XMStetmann.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race Zerg，生命 / Life 200，能量 / Energy 200，费用 / Cost 150/150，补给 / Supply 3
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、潜地 / `BurrowLurkerDownStetmann`(变形技能 / CAbilMorph)、出地 / `BurrowLurkerUpStetmann`(变形技能 / CAbilMorph)、`LurkerHoldFire`、`LurkerRemoveHoldFire`、Lurker Channeling Spines / `LurkerStetmannChannelingSpines`(目标效果技能 / CAbilEffectTarget)、Lurker Tunneling Burst / `LurkerStetmannTunnelingBurst`(目标效果技能 / CAbilEffectTarget)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`PowerFieldBuffSelfStetmann`
- 可生产/创建 / Produced or created：机械潜伏者 / `LurkerStetmann`
- 已隐藏基础按钮 / Hidden basic buttons：2 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,2 | `LurkerHoldFire` | `LurkerHoldFire,Execute` | 未解析 / Unresolved | - | - | - |
| 1,3 | `LurkerRemoveHoldFire` | `LurkerRemoveHoldFire,Execute` | 未解析 / Unresolved | - | - | - |
| 1,4 | 可回收物 / `LurkerStetmannScrapDrop` | `-` | 未解析 / Unresolved | - | - | - |
| 2,0 | 恐怖钻击算法 / `LurkerStetmannTunnelingBurst` | `LurkerStetmannTunnelingBurst,Execute` | 目标效果技能 / CAbilEffectTarget | - | CEffectSwitch / CEffectSwitch:`LurkerStetmannTunnelingBurstMaxRangeSwitch` | - |
| 2,1 | 集火强击算法 / `LurkerStetmannChannelingSpines` | `LurkerStetmannChannelingSpines,Execute` | 目标效果技能 / CAbilEffectTarget | - | CEffectSwitch / CEffectSwitch:`LurkerStetmannChannelingSpinesBurrowSwitch` | - |
| 2,4 | 出地 / `BurrowLurkerUpStetmann` | `BurrowLurkerUpStetmann,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:机械潜伏者 / `LurkerStetmann` | - | - |

### 机械感染者 / `InfestorStetmann`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMStetmann.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race Zerg，生命 / Life 90，能量 / Energy 400，费用 / Cost 100/150，补给 / Supply 2
- Catalog 技能链接 / Catalog ability links：潜地 / `BurrowInfestorDownStetmann`(变形技能 / CAbilMorph)、`InfestorStetmannEggLaunch`(目标效果技能 / CAbilEffectTarget)、`InfestorStetmannHealingTentacle`(目标效果技能 / CAbilEffectTarget)、`InfestorStetmannInfestBuilding`(目标效果技能 / CAbilEffectTarget)、`move`(基础 / Basic)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`PowerFieldBuffSelfStetmann`
- 可生产/创建 / Produced or created：`InfestorStetmannBurrowed`（非本指挥官名册 / not in current commander roster）
- 已隐藏基础按钮 / Hidden basic buttons：8 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,4 | 可回收物 / `InfestorStetmannScrapDrop` | `-` | 未解析 / Unresolved | - | - | - |
| 2,0 | “蟑螂出击！” / `InfestorStetmannEggLaunch` | `InfestorStetmannEggLaunch,Execute` | 目标效果技能 / CAbilEffectTarget | - | CEffectSwitch / CEffectSwitch:`InfestorStetmannEggLaunchDistanceSwitch` | - |
| 2,1 | UMI-C充能协议 / `InfestorStetmannHealingTentacle` | `InfestorStetmannHealingTentacle,Execute` | 目标效果技能 / CAbilEffectTarget | - | 发射弹体效果 / CEffectLaunchMissile:`InfestorStetmannHealingTentacleLM` | - |
| 2,2 | 解构型蟑螂机器人 / `InfestorStetmannInfestBuilding` | `InfestorStetmannInfestBuilding,Execute` | 目标效果技能 / CAbilEffectTarget | - | 持续效果 / CEffectCreatePersistent:`InfestorStetmannInfestBuildingCP` | - |
| 2,4 | 潜地 / `BurrowInfestorDownStetmann` | `BurrowInfestorDownStetmann,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:`InfestorStetmannBurrowed` | - | - |

### 机械雷兽 / `UltraliskStetmann`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMStetmann.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race Zerg，生命 / Life 500，能量 / Energy 300，费用 / Cost 300/200，补给 / Supply 6
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、潜地 / `BurrowUltraliskDownStetmann`(变形技能 / CAbilMorph)、`move`(基础 / Basic)、`stop`(基础 / Basic)、雷兽潜地冲锋 / `UltraliskStetmannBurrowCharge`(目标效果技能 / CAbilEffectTarget)、雷兽 机械 生命吸取 / `UltraliskStetmannMechanicalLifeLeech`(目标效果技能 / CAbilEffectTarget)、`UltraliskWeaponCooldown`
- 关联 Behavior / Linked behaviors：`ChitinousPlatingStetmann`、`Frenzy`、`PowerFieldBuffSelfStetmann`、`VorazunCloakDamageBoostPermanentUltraliskBurrowCharge`
- 可生产/创建 / Produced or created：`UltraliskStetmannBurrowed`（非本指挥官名册 / not in current commander roster）
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,4 | 可回收物 / `UltraliskStetmannScrapDrop` | `-` | 未解析 / Unresolved | - | - | - |
| 2,0 | 定向潜地冲锋 / `UltraliskStetmannBurrowCharge` | `UltraliskStetmannBurrowCharge,Execute` | 目标效果技能 / CAbilEffectTarget | - | CEffectSwitch / CEffectSwitch:`UltraliskStetmannBurrowChargeSwitch`、区域枚举效果 / CEffectEnumArea:`UltraliskStetmannBurrowChargeTargetSearch` | - |
| 2,1 | 机甲揩油模组 / `UltraliskStetmannMechanicalLifeLeech` | `UltraliskStetmannMechanicalLifeLeech,Execute` | 目标效果技能 / CAbilEffectTarget | - | CEffectSwitch / CEffectSwitch:`UltraliskMechanicalLifeLeechStetmannSwitch` | - |
| 2,2 | 几丁钛合金装甲 / `UltraliskStetmannArmorPassive` | `-` | 未解析 / Unresolved | - | - | HaveUltraliskStetmannArmor |
| 2,3 | `Frenzied` | `-` | 未解析 / Unresolved | - | - | - |
| 2,4 | 潜地 / `BurrowUltraliskDownStetmann` | `BurrowUltraliskDownStetmann,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:`UltraliskStetmannBurrowed` | - | - |

### 机械腐化者 / `CorruptorStetmann`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMStetmann.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race Zerg，生命 / Life 200，能量 / Energy 200，费用 / Cost 150/100，补给 / Supply 2
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、腐蚀喷液 / `CorruptorStetmannCausticSpray`(目标效果技能 / CAbilEffectTarget)、飞弹舱 / `CorruptorStetmannMissilePods`(目标效果技能 / CAbilEffectTarget)、变形 (腐化者 -> 巢虫领主) 斯台特曼 / `MorphToCBroodLordStetmann`(变形技能 / CAbilMorph)、`move`(基础 / Basic)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`PowerFieldBuffSelfStetmann`
- 可生产/创建 / Produced or created：机械巢式战列空母 / `BroodLordStetmann`、`BroodLordStetmannCocoon`（非本指挥官名册 / not in current commander roster）
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,4 | 可回收物 / `CorruptorStetmannScrapDrop` | `-` | 未解析 / Unresolved | - | - | - |
| 2,0 | 集束咆哮弹 / `CorruptorStetmannMissilePods` | `CorruptorStetmannMissilePods,Execute` | 目标效果技能 / CAbilEffectTarget | - | 伤害效果 / CEffectDamage:`HurricaneMissileDamageStetmann`、持续效果 / CEffectCreatePersistent:`HurricaneMissileStetmann` | - |
| 2,1 | 泰伦超洁降解液 / `CorruptorStetmannCausticSpray` | `CorruptorStetmannCausticSpray,Execute` | 目标效果技能 / CAbilEffectTarget | - | 持续效果 / CEffectCreatePersistent:`CorruptorStetmannCausticSprayBasePersistent` | - |
| 2,2 | 变形为机械巢式战列空母 / `MorphToCBroodLordStetmann` | `MorphToCBroodLordStetmann,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:`BroodLordStetmannCocoon`、单位 / Unit:机械巢式战列空母 / `BroodLordStetmann` | - | - |

### 机械巢式战列空母 / `BroodLordStetmann`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMStetmann.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race Zerg，生命 / Life 550，能量 / Energy 400，费用 / Cost 450/350，补给 / Supply 8
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`BroodLordHangarStetmann`(弹仓/机库技能 / CAbilArmMagazine)、`BroodLordStetmannBomberMagazine`(弹仓/机库技能 / CAbilArmMagazine)、`BroodLordStetmannYamatoGun`(目标效果技能 / CAbilEffectTarget)、`HangarQueue5`、`move`(基础 / Basic)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`PowerFieldBuffSelfStetmann`
- 可生产/创建 / Produced or created：`InterceptorStetmann`（非本指挥官名册 / not in current commander roster）
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,4 | 可回收物 / `BroodLordStetmannScrapDrop` | `-` | 未解析 / Unresolved | - | - | - |
| 2,0 | 准备机械巢虫 / `BroodLordStetmannBroodlingEscortArm` | `BroodLordStetmannBroodlingEscortArm,Execute` | 未解析 / Unresolved | - | - | - |
| 2,0 | 准备机械巢虫 / `BroodLordStetmannBroodlingEscortArmAugment` | `BroodLordStetmannBroodlingEscortArmAugment,Execute` | 未解析 / Unresolved | - | - | - |
| 2,1 | 建造机械飞蝗截击机 / `BroodLordStetmannBomberMagazine` | `BroodLordStetmannBomberMagazine,Ammo1` | 弹仓/机库技能 / CAbilArmMagazine | `InterceptorStetmann`、单位 / Unit:`InterceptorStetmann` | - | - |
| 2,2 | 斯台特曼炮 / `BroodLordStetmannYamatoGun` | `BroodLordStetmannYamatoGun,Execute` | 目标效果技能 / CAbilEffectTarget | - | 发射弹体效果 / CEffectLaunchMissile:`BroodLordStetmannYamatoMissile` | - |

### 机械眼虫 / `OverseerStetmann`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMStetmann.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race Zerg，生命 / Life 200，费用 / Cost 150/50，提供补给 / Supply provided 8
- Catalog 技能链接 / Catalog ability links：`move`(基础 / Basic)、`OverseerMorphtoOverseerSiegeStetmann`(变形技能 / CAbilMorph)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`Detector11`、`PowerFieldBuffSelfStetmann`
- 可生产/创建 / Produced or created：机械眼虫 / `OverseerStetmannSiegeMode`
- 已隐藏基础按钮 / Hidden basic buttons：6 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | 充气机身 / `OverlordStetmannSpeed` | `-` | 未解析 / Unresolved | - | - | HaveOverlordStetmannSpeed |
| 2,0 | 超距视界 / `OverseerMorphtoOverseerSiegeStetmann` | `OverseerMorphtoOverseerSiegeStetmann,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:机械眼虫 / `OverseerStetmannSiegeMode` | - | - |
| 2,3 | `Detector` | `-` | 未解析 / Unresolved | - | - | - |

### 机械眼虫 / `OverseerStetmannSiegeMode`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status state-only，模块 / Module XMStetmann.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race Zerg，生命 / Life 200，费用 / Cost 150/50，提供补给 / Supply provided 8
- Catalog 技能链接 / Catalog ability links：`move`(基础 / Basic)、`OverseerSiegeMorphtoOverseerStetmann`(变形技能 / CAbilMorph)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`Detector16.5`、`PowerFieldBuffSelfStetmann`
- 可生产/创建 / Produced or created：机械眼虫 / `OverseerStetmann`
- 已隐藏基础按钮 / Hidden basic buttons：6 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,1 | 取消超距视界 / `OverseerSiegeMorphtoOverseerStetmann` | `OverseerSiegeMorphtoOverseerStetmann,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:机械眼虫 / `OverseerStetmann` | - | - |
| 2,3 | `Detector` | `-` | 未解析 / Unresolved | - | - | - |

## 英雄 / Heroes

- 无 / None
