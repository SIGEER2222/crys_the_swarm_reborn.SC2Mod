# 德哈卡 / `Dehaka` 科技链路排查 / Tech Tree Diagnostics

- 描述 / Description：无 / None
- 数据来源 / Data source：当前 Mod / Current Mod，目录 / Directory：`合作指挥官版起义狂潮/Mods/XM/XMDehaka.SC2Mod`
- 当前 Mod 运行名册 / Current Mod roster：module=`XMDehaka.SC2Mod`，instance=`Dehaka`
- 统计 / Stats：建筑 7、生产链补充建筑 0、单位 15、英雄 4、建筑按钮 57、单位按钮 84、效果引用 80
- 名称显示 / Name display：能从当前 Mod zhCN 解析时显示“中文名 / `英文ID`”；仅显示 `ID` 表示当前 Mod 未找到可用中文名。

## 初始化/开局单位 / Initial Opener

| 槽位 / Slot | 单位 / Unit | 预期类型 / Expected Kind | Catalog 父级 / Catalog Parent | 是否在运行名册 / In Runtime Roster | 来源 / Source |
| --- | --- | --- | --- | --- | --- |
| 初始基地 / Command Center | 原始主巢 / `DehakaHatchery` | building | - | 是 / Yes | Catalog xmdehaka，Instance Dehaka，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMDehaka.SC2Mod/Base.SC2Data/GameData/UserData.xml`，名册状态 / Roster status exact |
| 初始工人 / Worker | 原始工蜂 / `DehakaDrone` | unit | - | 是 / Yes | Catalog xmdehaka，Instance Dehaka，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMDehaka.SC2Mod/Base.SC2Data/GameData/UserData.xml`，名册状态 / Roster status exact |
| 第二初始单位 / Second Unit | 德哈卡的巢穴 / `DehakaCoopReviveCocoon` | unit | - | 否 / No | Catalog xmdehaka，Instance Dehaka，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMDehaka.SC2Mod/Base.SC2Data/GameData/UserData.xml` |

## 指挥官默认/顶部技能 / Commander Default / Top-panel Skills

| 技能名 / Skill Name | Ability/Cmd | 类型 / Type | 效果引用 / Effect References | Catalog 来源 / Catalog Sources |
| --- | --- | --- | --- | --- |
| 召唤大型原始蠕虫 / `DehakaNydusDestroyerTopBar` | `DehakaNydusDestroyerTopBar,Build1` | 建造技能 / CAbilBuild | - | xmdehaka:1 |
| 召唤大型原始蠕虫 / `DehakaNydusDestroyerTopBarDummy` | `DehakaNydusDestroyerTopBarDummy,Execute` | 未解析 / Unresolved | - | - |
| 召唤格里维格 / `DehakaGlevigTopBar` | `DehakaGlevigTopBar,Build1` | 建造技能 / CAbilBuild | 效果集合 / CEffectSet:`DehakaGlevigTopBarInitialSet` | xmdehaka:1 |
| 召唤穆尔瓦 / `DehakaMurvarTopBar` | `DehakaMurvarTopBar,Execute` | 目标效果技能 / CAbilEffectTarget | 创建单位效果 / CEffectCreateUnit:`DehakaMurvarTopBarCU` | xmdehaka:1 |
| 召唤达克伦 / `DehakaDakrunTopBar` | `DehakaDakrunTopBar,Execute` | 目标效果技能 / CAbilEffectTarget | 区域枚举效果 / CEffectEnumArea:`DakrunSpawningTargetSearch`、创建单位效果 / CEffectCreateUnit:`DehakaDakrunTopBarCU` | xmdehaka:1 |

## 建筑 / Buildings

### 原始主巢 / `DehakaHatchery`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMDehaka.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Structure，种族 / Race PZrg，生命 / Life 1500，费用 / Cost 450/0，补给 / Supply 6
- Catalog 技能链接 / Catalog ability links：`DehakaHatcheryBuild`(建造技能 / CAbilBuild)、`DehakaHatcheryResearch`(研究技能 / CAbilResearch)、`DehakaHatcheryTrainEgg`(训练技能 / CAbilTrain)、`DehakaHatcheryUproot`(变形技能 / CAbilMorph)、`PrimalBuildInProgress`(CAbilBuildable / CAbilBuildable)、`que5Passive`、`RallyCommand`、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`ChronoBoostTarget`
- 可生产/创建 / Produced or created：`DehakaTrainEggDrone`（非本指挥官名册 / not in current commander roster）、`Extractor`（非本指挥官名册 / not in current commander roster），耗时 / Time 30s
- 已隐藏基础按钮 / Hidden basic buttons：2 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | 孵化原始工蜂 / `DehakaHatcheryTrainEgg` | `DehakaHatcheryTrainEgg,Train1` | 训练技能 / CAbilTrain | `DehakaTrainEggDrone`、单位 / Unit:`DehakaTrainEggDrone` | - | - |
| 1,0 | 变异萃取房 / `DehakaHatcheryBuild` | `DehakaHatcheryBuild,Build1` | 建造技能 / CAbilBuild | `Extractor`、单位 / Unit:`Extractor` | - | - |
| 1,4 | 集结点 / `RallyCommand` | `RallyCommand,Rally1` | 未解析 / Unresolved | - | - | - |
| 2,0 | 进化原始攻击等级1 / `DehakaHatcheryResearch` | `DehakaHatcheryResearch,Research1` | 研究技能 / CAbilResearch | 升级 / Upgrade:`DehakaPrimalWeaponsLevel1` | - | - |
| 2,0 | 进化原始攻击等级2 / `DehakaHatcheryResearch` | `DehakaHatcheryResearch,Research2` | 研究技能 / CAbilResearch | 升级 / Upgrade:`DehakaPrimalWeaponsLevel2` | - | - |
| 2,0 | 进化原始攻击等级3 / `DehakaHatcheryResearch` | `DehakaHatcheryResearch,Research3` | 研究技能 / CAbilResearch | 升级 / Upgrade:`DehakaPrimalWeaponsLevel3` | - | - |
| 2,0 | 进化原始攻击等级4 / `DehakaHatcheryResearch` | `DehakaHatcheryResearch,Research8` | 研究技能 / CAbilResearch | 升级 / Upgrade:`DehakaPrimalWeaponsLevel4` | - | - |
| 2,0 | 进化原始攻击等级5 / `DehakaHatcheryResearch` | `DehakaHatcheryResearch,Research9` | 研究技能 / CAbilResearch | 升级 / Upgrade:`DehakaPrimalWeaponsLevel5` | - | - |
| 2,1 | 进化原始甲壳等级1 / `DehakaHatcheryResearch` | `DehakaHatcheryResearch,Research4` | 研究技能 / CAbilResearch | 升级 / Upgrade:`DehakaPrimalArmorLevel1` | - | - |
| 2,1 | 进化原始甲壳等级2 / `DehakaHatcheryResearch` | `DehakaHatcheryResearch,Research5` | 研究技能 / CAbilResearch | 升级 / Upgrade:`DehakaPrimalArmorLevel2` | - | - |
| 2,1 | 进化原始甲壳等级3 / `DehakaHatcheryResearch` | `DehakaHatcheryResearch,Research6` | 研究技能 / CAbilResearch | 升级 / Upgrade:`DehakaPrimalArmorLevel3` | - | - |
| 2,1 | 进化原始甲壳等级4 / `DehakaHatcheryResearch` | `DehakaHatcheryResearch,Research10` | 研究技能 / CAbilResearch | 升级 / Upgrade:`DehakaPrimalArmorLevel4` | - | - |
| 2,1 | 进化原始甲壳等级5 / `DehakaHatcheryResearch` | `DehakaHatcheryResearch,Research11` | 研究技能 / CAbilResearch | 升级 / Upgrade:`DehakaPrimalArmorLevel5` | - | - |
| 2,3 | `DehakaHatcheryUproot` | `DehakaHatcheryUproot,Execute` | 变形技能 / CAbilMorph | - | - | - |

### `DehakaAirTownHall`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMDehaka.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Structure，种族 / Race Zerg，生命 / Life 1500，费用 / Cost 450/0，提供补给 / Supply provided 24
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`BuildInProgress`(基础 / Basic)、`DehakaAirTownHallUproot`(变形技能 / CAbilMorph)、`DehakaTownHallTrain`(训练技能 / CAbilTrain)、`que5Passive`、`Rally`(CAbilRally / CAbilRally)、`stop`(基础 / Basic)
- 已隐藏基础按钮 / Hidden basic buttons：4 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | `DehakaTownHallTrain` | `DehakaTownHallTrain,Train7` | 训练技能 / CAbilTrain | - | - | - |
| 1,1 | `DehakaTownHallTrain` | `DehakaTownHallTrain,Train8` | 训练技能 / CAbilTrain | - | - | - |
| 1,2 | `DehakaTownHallTrain` | `DehakaTownHallTrain,Train9` | 训练技能 / CAbilTrain | - | - | - |
| 1,4 | `Rally` | `Rally,Rally1` | CAbilRally / CAbilRally | - | - | - |
| 2,3 | `DehakaAirTownHallUproot` | `DehakaAirTownHallUproot,Execute` | 变形技能 / CAbilMorph | - | - | - |

### 原始战争之巢 / `DehakaBarracks`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMDehaka.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Structure，种族 / Race PZrg，生命 / Life 400，费用 / Cost 250/0，补给 / Supply 2
- Catalog 技能链接 / Catalog ability links：`DehakaBarracksTrainEgg`(训练技能 / CAbilTrain)、`DehakaBarracksUproot`(变形技能 / CAbilMorph)、`PrimalBuildInProgress`(CAbilBuildable / CAbilBuildable)、`que1`、`Rally`(CAbilRally / CAbilRally)、`stop`(基础 / Basic)
- 可生产/创建 / Produced or created：`DehakaTrainEggHydralisk`（非本指挥官名册 / not in current commander roster）、`DehakaTrainEggRoach`（非本指挥官名册 / not in current commander roster）、`DehakaTrainEggSwarmHost`（非本指挥官名册 / not in current commander roster）、`DehakaTrainEggUltralisk`（非本指挥官名册 / not in current commander roster）、`DehakaTrainEggZergling`（非本指挥官名册 / not in current commander roster）
- 已隐藏基础按钮 / Hidden basic buttons：2 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | 孵化原始跳虫 / `DehakaBarracksTrainEgg` | `DehakaBarracksTrainEgg,Train1` | 训练技能 / CAbilTrain | `DehakaTrainEggZergling`、单位 / Unit:`DehakaTrainEggZergling` | - | - |
| 0,1 | 孵化原始蟑螂 / `DehakaBarracksTrainEgg` | `DehakaBarracksTrainEgg,Train2` | 训练技能 / CAbilTrain | `DehakaTrainEggRoach`、单位 / Unit:`DehakaTrainEggRoach` | - | - |
| 0,2 | 孵化原始刺蛇 / `DehakaBarracksTrainEgg` | `DehakaBarracksTrainEgg,Train3` | 训练技能 / CAbilTrain | `DehakaTrainEggHydralisk`、单位 / Unit:`DehakaTrainEggHydralisk` | - | - |
| 1,0 | 孵化原始宿主 / `DehakaBarracksTrainEgg` | `DehakaBarracksTrainEgg,Train4` | 训练技能 / CAbilTrain | `DehakaTrainEggSwarmHost`、单位 / Unit:`DehakaTrainEggSwarmHost` | - | - |
| 1,1 | 孵化原始雷兽 / `DehakaBarracksTrainEgg` | `DehakaBarracksTrainEgg,Train5` | 训练技能 / CAbilTrain | `DehakaTrainEggUltralisk`、单位 / Unit:`DehakaTrainEggUltralisk` | - | - |
| 1,4 | 集结点 / `Rally` | `Rally,Rally1` | CAbilRally / CAbilRally | - | - | - |
| 2,3 | `DehakaBarracksUproot` | `DehakaBarracksUproot,Execute` | 变形技能 / CAbilMorph | - | - | - |

### 格里维格的巢穴 / `DehakaGlevigStructure`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMDehaka.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Structure，种族 / Race PZrg，生命 / Life 1500，费用 / Cost 250/100
- Catalog 技能链接 / Catalog ability links：`DehakaGlevigResearch`(研究技能 / CAbilResearch)、`PrimalBuildInProgress`(CAbilBuildable / CAbilBuildable)、`que5`(队列技能 / CAbilQueue)
- 关联 Behavior / Linked behaviors：`DehakaGlevigInPlay`
- 已隐藏基础按钮 / Hidden basic buttons：2 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | 进化溶解强酸 / `DehakaGlevigResearch` | `DehakaGlevigResearch,Research10` | 研究技能 / CAbilResearch | 升级 / Upgrade:`DehakaRavasaurVSArmor` | - | - |
| 0,1 | 进化膨胀腮腺 / `DehakaGlevigResearch` | `DehakaGlevigResearch,Research9` | 研究技能 / CAbilResearch | 升级 / Upgrade:`DehakaRavasaurRange` | - | - |
| 0,2 | 进化神经胶原重组 / `DehakaGlevigResearch` | `DehakaGlevigResearch,Research7` | 研究技能 / CAbilResearch | 升级 / Upgrade:`DehakaRoachMoveSpeed` | - | - |
| 0,3 | 进化汇聚烈焰 / `DehakaGlevigResearch` | `DehakaGlevigResearch,Research3` | 研究技能 / CAbilResearch | 升级 / Upgrade:`DehakaGlevigRoachFireBreath` | - | - |
| 1,0 | 进化肌腱扩增 / `DehakaGlevigResearch` | `DehakaGlevigResearch,Research8` | 研究技能 / CAbilResearch | 升级 / Upgrade:`DehakaHydraliskSpeed` | - | - |
| 1,1 | 进化暴捶 / `DehakaGlevigResearch` | `DehakaGlevigResearch,Research11` | 研究技能 / CAbilResearch | 升级 / Upgrade:`DehakaImpalerTenderize` | - | - |
| 1,4 | `PrimalWurmPassive` | `-` | 未解析 / Unresolved | - | - | - |
| 2,0 | 原始蟑螂 / `DehakaRoachPassive` | `-` | 未解析 / Unresolved | - | - | - |
| 2,1 | `PrimalIgniterPassive` | `-` | 未解析 / Unresolved | - | - | - |
| 2,2 | `PrimalHydraliskPassive` | `-` | 未解析 / Unresolved | - | - | - |
| 2,3 | `PrimalImpalerPassive` | `-` | 未解析 / Unresolved | - | - | - |

### 穆尔瓦的巢穴 / `DehakaMurvarStructure`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMDehaka.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Structure，种族 / Race PZrg，生命 / Life 1500，费用 / Cost 250/200
- Catalog 技能链接 / Catalog ability links：`DehakaMurvarResearch`(研究技能 / CAbilResearch)、`PrimalBuildInProgress`(CAbilBuildable / CAbilBuildable)、`que5`(队列技能 / CAbilQueue)
- 关联 Behavior / Linked behaviors：`DehakaMurvarInPlay`
- 已隐藏基础按钮 / Hidden basic buttons：2 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | `DehakaMurvarResearch` | `DehakaMurvarResearch,Research13` | 研究技能 / CAbilResearch | 升级 / Upgrade:`DehakaMutaliskAirDoubleDamage` | - | - |
| 0,1 | 进化变换甲壳 / `DehakaMurvarResearch` | `DehakaMurvarResearch,Research8` | 研究技能 / CAbilResearch | 升级 / Upgrade:`DehakaMutaliskDamageReduction` | - | - |
| 0,2 | 进化原始重组 / `DehakaMurvarResearch` | `DehakaMurvarResearch,Research9` | 研究技能 / CAbilResearch | 升级 / Upgrade:`DehakaMutaliskRevive` | - | - |
| 0,3 | 进化爆裂孢子 / `DehakaMurvarResearch` | `DehakaMurvarResearch,Research11` | 研究技能 / CAbilResearch | 升级 / Upgrade:`DehakaGuardianExplosiveBomb` | - | - |
| 0,4 | 进化原始狂怒 / `DehakaMurvarResearch` | `DehakaMurvarResearch,Research10` | 研究技能 / CAbilResearch | 升级 / Upgrade:`DehakaGuardianFury` | - | - |
| 1,0 | 进化空中爆囊 / `DehakaMurvarResearch` | `DehakaMurvarResearch,Research12` | 研究技能 / CAbilResearch | 升级 / Upgrade:`DehakaMurvarCreeperAir` | - | - |
| 2,0 | `PrimalHostPassive` | `-` | 未解析 / Unresolved | - | - | - |
| 2,1 | `CreeperHostPassive` | `-` | 未解析 / Unresolved | - | - | - |
| 2,2 | `PrimalMutaliskPassive` | `-` | 未解析 / Unresolved | - | - | - |
| 2,3 | `PrimalGuardianPassive` | `-` | 未解析 / Unresolved | - | - | - |

### 达克伦的巢穴 / `DehakaDakrunStructure`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMDehaka.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Structure，种族 / Race PZrg，生命 / Life 1500，费用 / Cost 250/200
- Catalog 技能链接 / Catalog ability links：`DehakaDakrunResearch`(研究技能 / CAbilResearch)、`DehakaDakrunStructureLearn`、`PrimalBuildInProgress`(CAbilBuildable / CAbilBuildable)、`que5`(队列技能 / CAbilQueue)
- 关联 Behavior / Linked behaviors：`DehakaDakrunInPlay`
- 已隐藏基础按钮 / Hidden basic buttons：2 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | 进化野蛮冲锋 / `DehakaDakrunResearch` | `DehakaDakrunResearch,Research1` | 研究技能 / CAbilResearch | 升级 / Upgrade:`DehakaUltraliskCrashingCharge` | - | - |
| 0,1 | 进化治疗适性 / `DehakaDakrunResearch` | `DehakaDakrunResearch,Research2` | 研究技能 / CAbilResearch | 升级 / Upgrade:`DehakaUltraliskRegen` | - | - |
| 0,2 | 进化穿刺打击 / `DehakaDakrunResearch` | `DehakaDakrunResearch,Research3` | 研究技能 / CAbilResearch | 升级 / Upgrade:`DehakaUltraliskBash` | - | - |
| 0,3 | 进化尖刺弹幕 / `DehakaDakrunResearch` | `DehakaDakrunResearch,Research5` | 研究技能 / CAbilResearch | 升级 / Upgrade:`DehakaTyrannozorFanOfKnives` | - | - |
| 0,4 | 进化暴龙的保护 / `DehakaDakrunResearch` | `DehakaDakrunResearch,Research4` | 研究技能 / CAbilResearch | 升级 / Upgrade:`DehakaTyrannozorArmorAura` | - | - |
| 2,0 | `PrimalUltraliskPassive` | `-` | 未解析 / Unresolved | - | - | - |
| 2,1 | `TyrannozorPassive` | `-` | 未解析 / Unresolved | - | - | - |

### 原始蠕虫 / `DehakaNydusDestroyer`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMDehaka.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Structure，种族 / Race PZrg，生命 / Life 500，费用 / Cost 300/0
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`BuildInProgress`(基础 / Basic)、`move`(基础 / Basic)、`NydusDestroyerBeam`(目标效果技能 / CAbilEffectTarget)、`NydusDestroyerDeepTunnel`(目标效果技能 / CAbilEffectTarget)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`Detector11`
- 可生产/创建 / Produced or created：`BrutaliskPlacement`（非本指挥官名册 / not in current commander roster）、`NydusDestroyerDeepTunnelPlacement`（非本指挥官名册 / not in current commander roster）
- 已隐藏基础按钮 / Hidden basic buttons：3 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | `Detector` | `-` | 未解析 / Unresolved | - | - | - |
| 2,0 | `NydusDestroyerBeam` | `NydusDestroyerBeam,Execute` | 目标效果技能 / CAbilEffectTarget | - | 修改单位效果 / CEffectModifyUnit:`NydusDestroyerBeamCooldown`、持续效果 / CEffectCreatePersistent:`NydusDestroyerBeamCP` | - |
| 2,4 | `NydusDestroyerDeepTunnel` | `NydusDestroyerDeepTunnel,Execute` | 目标效果技能 / CAbilEffectTarget | 效果创建 / Effect creates:`BrutaliskPlacement`、效果创建 / Effect creates:`NydusDestroyerDeepTunnelPlacement` | 创建单位效果 / CEffectCreateUnit:`BrutaliskDeepTunnelCU`、创建单位效果 / CEffectCreateUnit:`NydusDestroyerDeepTunnelCU` | - |

## 生产链补充建筑 / Production-support Buildings

- 无 / None

## 单位 / Units

### 原始工蜂 / `DehakaDrone`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMDehaka.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race PZrg，生命 / Life 40，费用 / Cost 50/0，补给 / Supply 1
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`BurrowDehakaDroneDown`(变形技能 / CAbilMorph)、`DehakaDroneMorph`(建造技能 / CAbilBuild)、`DroneCarcassHarvest`、`DroneHarvest`、`MapObjectInteract`(目标效果技能 / CAbilEffectTarget)、`move`(基础 / Basic)、`MutatorRemoveWorkerSleep`(瞬发效果技能 / CAbilEffectInstant)、喷漆-异虫 / `SprayZerg`、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`
- 可生产/创建 / Produced or created：原始战争之巢 / `DehakaBarracks`，耗时 / Time 60s、`DehakaCoopReviveCocoon`（非本指挥官名册 / not in current commander roster），耗时 / Time 10s、达克伦的巢穴 / `DehakaDakrunStructure`，耗时 / Time 120s、`DehakaDroneBurrowed`（非本指挥官名册 / not in current commander roster）、格里维格的巢穴 / `DehakaGlevigStructure`，耗时 / Time 90s、原始主巢 / `DehakaHatchery`，耗时 / Time 100s、穆尔瓦的巢穴 / `DehakaMurvarStructure`，耗时 / Time 120s、原始蠕虫 / `DehakaNydusDestroyer`，耗时 / Time 40s
- 已隐藏基础按钮 / Hidden basic buttons：7 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | `DroneHarvest` | `DroneHarvest,Gather` | 未解析 / Unresolved | - | - | - |
| 1,1 | `DroneHarvest` | `DroneHarvest,Return` | 未解析 / Unresolved | - | - | - |
| 2,3 | 喷漆-异虫 / `SprayZerg` | `SprayZerg,Execute` | 未解析 / Unresolved | - | - | - |
| 2,4 | `BurrowDehakaDroneDown` | `BurrowDehakaDroneDown,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:`DehakaDroneBurrowed` | - | - |
| 0,0 | 召唤原始主巢 / `DehakaDroneMorph` | `DehakaDroneMorph,Build1` | 建造技能 / CAbilBuild | 原始主巢 / `DehakaHatchery`、单位 / Unit:原始主巢 / `DehakaHatchery` | - | - |
| 0,1 | 召唤原始战争之巢 / `DehakaDroneMorph` | `DehakaDroneMorph,Build2` | 建造技能 / CAbilBuild | 原始战争之巢 / `DehakaBarracks`、单位 / Unit:原始战争之巢 / `DehakaBarracks` | - | - |
| 0,2 | 德哈卡的巢穴 / `DehakaDroneMorph` | `DehakaDroneMorph,Build7` | 建造技能 / CAbilBuild | `DehakaCoopReviveCocoon`、单位 / Unit:`DehakaCoopReviveCocoon` | - | - |
| 1,0 | 召唤格里维格的巢穴 / `DehakaDroneMorph` | `DehakaDroneMorph,Build3` | 建造技能 / CAbilBuild | 格里维格的巢穴 / `DehakaGlevigStructure`、单位 / Unit:格里维格的巢穴 / `DehakaGlevigStructure` | - | - |
| 1,1 | 召唤穆尔瓦的巢穴 / `DehakaDroneMorph` | `DehakaDroneMorph,Build4` | 建造技能 / CAbilBuild | 穆尔瓦的巢穴 / `DehakaMurvarStructure`、单位 / Unit:穆尔瓦的巢穴 / `DehakaMurvarStructure` | - | - |
| 1,2 | 召唤达克伦的巢穴 / `DehakaDroneMorph` | `DehakaDroneMorph,Build5` | 建造技能 / CAbilBuild | 达克伦的巢穴 / `DehakaDakrunStructure`、单位 / Unit:达克伦的巢穴 / `DehakaDakrunStructure` | - | - |
| 2,0 | 召唤原始蠕虫 / `DehakaDroneMorph` | `DehakaDroneMorph,Build6` | 建造技能 / CAbilBuild | 原始蠕虫 / `DehakaNydusDestroyer`、单位 / Unit:原始蠕虫 / `DehakaNydusDestroyer` | - | - |

### 掘地虫 / `DehakaCreeper`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMDehaka.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race PZrg，生命 / Life 130
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`DehakaCreeperMorphToAir`、`move`(基础 / Basic)、`stop`(基础 / Basic)
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

- 面板技能 / Panel skills：无 / None

### 爆裂掘地虫 / `DehakaCreeperFlying`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMDehaka.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race PZrg，生命 / Life 130
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`move`(基础 / Basic)、`stop`(基础 / Basic)
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

- 面板技能 / Panel skills：无 / None

### 原始刺蛇 / `DehakaHydraliskLevel2`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMDehaka.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race PZrg，生命 / Life 100，费用 / Cost 100/50，补给 / Supply 2
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`BurrowDehakaHydraliskLevel2Down`(变形技能 / CAbilMorph)、`move`(基础 / Basic)、`PrimalHydraliskImpalerMerge`(合并技能 / CAbilMerge)、`PrimalHydraliskToMutalisk`(合并技能 / CAbilMerge)、`stop`(基础 / Basic)
- 可生产/创建 / Produced or created：`DehakaHydraliskLevel2Burrowed`（非本指挥官名册 / not in current commander roster）、原始异龙 / `DehakaMutaliskLevel3`、穿刺者 / `ImpalerDehaka`
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | 肌腱扩增 / `DehakaHydraliskSpeed` | `-` | 未解析 / Unresolved | - | - | HaveDehakaHydraliskSpeed |
| 2,2 | 原始战斗 / `PrimalHydraliskToMutalisk` | `PrimalHydraliskToMutalisk,SelectedUnits` | 合并技能 / CAbilMerge | 单位 / Unit:原始异龙 / `DehakaMutaliskLevel3` | 效果集合 / CEffectSet:`DehakaGeneMutaliskMorphSet` | - |
| 2,3 | 原始战斗 / `PrimalHydraliskImpalerMerge` | `PrimalHydraliskImpalerMerge,SelectedUnits` | 合并技能 / CAbilMerge | 单位 / Unit:穿刺者 / `ImpalerDehaka` | 效果集合 / CEffectSet:`DehakaGeneImpalerMorphSet` | - |
| 2,4 | `BurrowDehakaHydraliskLevel2Down` | `BurrowDehakaHydraliskLevel2Down,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:`DehakaHydraliskLevel2Burrowed` | - | - |

### 原始异龙 / `DehakaMutaliskLevel3`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMDehaka.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race PZrg，生命 / Life 200，费用 / Cost 100/100，补给 / Supply 3
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`DehakaMutaliskRevive`(变形技能 / CAbilMorph)、`move`(基础 / Basic)、`PrimalMutaliskLevel2Mergeable`(CAbilMergeable / CAbilMergeable)、`ProgressRally`(CAbilRally / CAbilRally)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`DehakaMutaliskDamageReduction`、`DehakaMutaliskRevive`
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | 进化甲壳 / `DehakaGeneCarapacePassive` | `-` | 未解析 / Unresolved | - | - | HaveDehakaGeneCarapace |
| 1,1 | 进化肾上腺体 / `DehakaGeneAttackSpeedPassive` | `-` | 未解析 / Unresolved | - | - | HaveDehakaGeneAttackSpeed |
| 1,2 | 进化吸血 / `DehakaGeneLifeLeechPassive` | `-` | 未解析 / Unresolved | - | - | HaveDehakaGeneLifeLeech |
| 1,4 | `ProgressRally` | `ProgressRally,Rally1` | CAbilRally / CAbilRally | - | - | - |
| 2,0 | `SlicingGlave` | `-` | 未解析 / Unresolved | - | - | UseDehakaMutaliskAirDoubleDamage |
| 2,1 | 变换甲壳 / `DehakaMutaliskDamageReduction` | `-` | 未解析 / Unresolved | - | - | HaveDehakaMutaliskDamageReduction |
| 2,2 | 原始重组 / `DehakaMutaliskRespawnOnDeath` | `-` | 未解析 / Unresolved | - | - | HaveDehakaMutaliskRevive |

### 掘地虫宿主 / `DehakaPrimalSwarmHost`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMDehaka.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race PZrg，生命 / Life 160，费用 / Cost 100/75，补给 / Supply 5
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`DehakaMorphToPrimalSwarmHostBurrowed`(变形技能 / CAbilMorph)、`DehakaSpawnCreeperTargeted`(目标效果技能 / CAbilEffectTarget)、`move`(基础 / Basic)、`PrimalSwarmHostMergeable`(CAbilMergeable / CAbilMergeable)、`ProgressRally`(CAbilRally / CAbilRally)、`stop`(基础 / Basic)
- 可生产/创建 / Produced or created：`DehakaPrimalSwarmHostBurrowed`（非本指挥官名册 / not in current commander roster）
- 已隐藏基础按钮 / Hidden basic buttons：6 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | 进化甲壳 / `DehakaGeneCarapacePassive` | `-` | 未解析 / Unresolved | - | - | HaveDehakaGeneCarapace |
| 1,1 | 进化孵化囊 / `DehakaGeneCreepersPassive` | `-` | 未解析 / Unresolved | - | - | HaveDehakaGeneCreepers |
| 1,4 | `ProgressRally` | `ProgressRally,Rally1` | CAbilRally / CAbilRally | - | - | - |
| 2,0 | 孵化爆裂掘地虫 / `DehakaSpawnCreeperTargeted` | `DehakaSpawnCreeperTargeted,Execute` | 目标效果技能 / CAbilEffectTarget | - | CEffectSwitch / CEffectSwitch:`DehakaCreeperCreateSwitch` | - |
| 2,1 | 飞行爆裂掘地虫 / `DehakaFlyingCreeperLocusts` | `-` | 未解析 / Unresolved | - | - | - |
| 2,2 | 空中爆囊 / `DehakaCreeperAirSuicide` | `-` | 未解析 / Unresolved | - | - | HaveDehakaSwarmHostCreepers |
| 2,4 | `DehakaMorphToPrimalSwarmHostBurrowed` | `DehakaMorphToPrimalSwarmHostBurrowed,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:`DehakaPrimalSwarmHostBurrowed` | - | - |

### 掠食龙 / `DehakaRavasaur`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMDehaka.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race PZrg，生命 / Life 90，费用 / Cost 150/50，补给 / Supply 2
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`BurrowDehakaRavasaurDown`(变形技能 / CAbilMorph)、`move`(基础 / Basic)、`PrimalZerglingLevel2Mergeable`(CAbilMergeable / CAbilMergeable)、`ProgressRally`(CAbilRally / CAbilRally)、`stop`(基础 / Basic)
- 可生产/创建 / Produced or created：`DehakaRavasaurBurrowed`（非本指挥官名册 / not in current commander roster）
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | 进化甲壳 / `DehakaGeneCarapacePassive` | `-` | 未解析 / Unresolved | - | - | HaveDehakaGeneCarapace |
| 1,1 | 进化肾上腺体 / `DehakaGeneAttackSpeedPassive` | `-` | 未解析 / Unresolved | - | - | HaveDehakaGeneAttackSpeed |
| 1,2 | 进化吸血 / `DehakaGeneLifeLeechPassive` | `-` | 未解析 / Unresolved | - | - | HaveDehakaGeneLifeLeech |
| 1,4 | `ProgressRally` | `ProgressRally,Rally1` | CAbilRally / CAbilRally | - | - | - |
| 2,0 | 溶解强酸 / `DehakaRavasaurVSArmor` | `-` | 未解析 / Unresolved | - | - | HaveDehakaRavasaurVSArmor |
| 2,1 | 膨胀腮腺 / `DehakaRavasaurRange` | `-` | 未解析 / Unresolved | - | - | HaveDehakaRavasaurRange |
| 2,4 | `BurrowDehakaRavasaurDown` | `BurrowDehakaRavasaurDown,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:`DehakaRavasaurBurrowed` | - | - |

### 原始蟑螂 / `DehakaRoachLevel2`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMDehaka.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race PZrg，生命 / Life 175，费用 / Cost 75/25，补给 / Supply 2
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`BurrowDehakaRoachLevel2Down`(变形技能 / CAbilMorph)、`move`(基础 / Basic)、`PrimalRoachGuardianMerge`(合并技能 / CAbilMerge)、原始战斗 / `PrimalRoachLevel2Merge`(合并技能 / CAbilMerge)、`PrimalRoachLevel2Mergeable`(CAbilMergeable / CAbilMergeable)、`stop`(基础 / Basic)
- 可生产/创建 / Produced or created：`DehakaGuardianFightMorph`（非本指挥官名册 / not in current commander roster）、`DehakaRoachLevel2Burrowed`（非本指挥官名册 / not in current commander roster）、原始点火虫 / `DehakaRoachLevel3`
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | `RapidRegeneration` | `-` | 未解析 / Unresolved | - | - | - |
| 2,1 | 神经胶原重组 / `DehakaGlialReconstitution` | `-` | 未解析 / Unresolved | - | - | HaveDehakaRoachMoveSpeed |
| 2,2 | 原始战斗 / `PrimalRoachLevel2Merge` | `PrimalRoachLevel2Merge,SelectedUnits` | 合并技能 / CAbilMerge | 单位 / Unit:原始点火虫 / `DehakaRoachLevel3` | 效果集合 / CEffectSet:`DehakaGeneFireRoachMorphSet` | - |
| 2,3 | 原始战斗 / `PrimalRoachGuardianMerge` | `PrimalRoachGuardianMerge,SelectedUnits` | 合并技能 / CAbilMerge | 单位 / Unit:`DehakaGuardianFightMorph` | 效果集合 / CEffectSet:`DehakaGeneGuardianMorphSet` | - |
| 2,4 | `BurrowDehakaRoachLevel2Down` | `BurrowDehakaRoachLevel2Down,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:`DehakaRoachLevel2Burrowed` | - | - |

### 原始点火虫 / `DehakaRoachLevel3`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMDehaka.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race PZrg，生命 / Life 350，费用 / Cost 75/25，补给 / Supply 3
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`BurrowDehakaRoachLevel3Down`(变形技能 / CAbilMorph)、`move`(基础 / Basic)、`PrimalRoachLevel2Mergeable`(CAbilMergeable / CAbilMergeable)、`ProgressRally`(CAbilRally / CAbilRally)、`stop`(基础 / Basic)
- 可生产/创建 / Produced or created：`DehakaRoachLevel3Burrowed`（非本指挥官名册 / not in current commander roster）
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | 进化甲壳 / `DehakaGeneCarapacePassive` | `-` | 未解析 / Unresolved | - | - | HaveDehakaGeneCarapace |
| 1,1 | 进化肾上腺体 / `DehakaGeneAttackSpeedPassive` | `-` | 未解析 / Unresolved | - | - | HaveDehakaGeneAttackSpeed |
| 1,2 | 进化吸血 / `DehakaGeneLifeLeechPassive` | `-` | 未解析 / Unresolved | - | - | HaveDehakaGeneLifeLeech |
| 1,4 | `ProgressRally` | `ProgressRally,Rally1` | CAbilRally / CAbilRally | - | - | - |
| 2,0 | `RapidRegeneration` | `-` | 未解析 / Unresolved | - | - | - |
| 2,1 | 神经胶原重组 / `DehakaGlialReconstitution` | `-` | 未解析 / Unresolved | - | - | HaveDehakaRoachMoveSpeed |
| 2,2 | 汇聚烈焰 / `DehakaGlevigHaveRoachFireBreath` | `-` | 未解析 / Unresolved | - | - | HaveDehakaGlevigRoachFireBreath |
| 2,4 | `BurrowDehakaRoachLevel3Down` | `BurrowDehakaRoachLevel3Down,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:`DehakaRoachLevel3Burrowed` | - | - |

### 原始宿主 / `DehakaSwarmHost`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMDehaka.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race PZrg，生命 / Life 160，费用 / Cost 100/75，补给 / Supply 3
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`DehakaMorphToSwarmHostBurrowed`(变形技能 / CAbilMorph)、`DehakaSpawnLocustsTargeted`(目标效果技能 / CAbilEffectTarget)、`move`(基础 / Basic)、`PrimalSwarmHostMerge`(合并技能 / CAbilMerge)、`stop`(基础 / Basic)
- 可生产/创建 / Produced or created：`DehakaLocust`（非本指挥官名册 / not in current commander roster）、掘地虫宿主 / `DehakaPrimalSwarmHost`、`DehakaSwarmHostBurrowed`（非本指挥官名册 / not in current commander roster）
- 已隐藏基础按钮 / Hidden basic buttons：6 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | 孵化原始蝗虫 / `DehakaSpawnLocustsTargeted` | `DehakaSpawnLocustsTargeted,Execute` | 目标效果技能 / CAbilEffectTarget | 效果创建 / Effect creates:`DehakaLocust` | 效果集合 / CEffectSet:`DehakaLocustCreateSet` | - |
| 2,1 | 飞行原始蝗虫 / `DehakaFlyingLocusts` | `-` | 未解析 / Unresolved | - | - | - |
| 2,3 | 原始战斗 / `PrimalSwarmHostMerge` | `PrimalSwarmHostMerge,SelectedUnits` | 合并技能 / CAbilMerge | 单位 / Unit:掘地虫宿主 / `DehakaPrimalSwarmHost` | 效果集合 / CEffectSet:`DehakaGeneCreeperHostMorphSet` | - |
| 2,4 | `DehakaMorphToSwarmHostBurrowed` | `DehakaMorphToSwarmHostBurrowed,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:`DehakaSwarmHostBurrowed` | - | - |

### 原始雷兽 / `DehakaUltraliskLevel2`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMDehaka.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race PZrg，生命 / Life 625，费用 / Cost 300/200，补给 / Supply 6
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`BurrowDehakaUltraliskLevel2Down`(变形技能 / CAbilMorph)、野蛮冲锋 / `DehakaUltraliskCrashingCharge`(目标效果技能 / CAbilEffectTarget)、`move`(基础 / Basic)、`PrimalUltraliskLevel2Merge`(合并技能 / CAbilMerge)、`PrimalUltraliskMergeable`(CAbilMergeable / CAbilMergeable)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`DehakaUltraliskBash`、`Frenzy`
- 可生产/创建 / Produced or created：`DehakaUltraliskLevel2Burrowed`（非本指挥官名册 / not in current commander roster）、暴龙兽 / `DehakaUltraliskLevel3`
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,4 | `Frenzied` | `-` | 未解析 / Unresolved | - | - | - |
| 2,0 | 野蛮冲锋 / `DehakaUltraliskCrashingCharge` | `DehakaUltraliskCrashingCharge,Execute` | 目标效果技能 / CAbilEffectTarget | - | 创建单位效果 / CEffectCreateUnit:`DehakaUltraliskCrashingChargePlacementCU`、区域枚举效果 / CEffectEnumArea:`DehakaUltraliskCrashingChargeTargetSearch` | - |
| 2,1 | 治疗适性 / `DehakaUltraliskRegen` | `-` | 未解析 / Unresolved | - | - | HaveDehakaUltraliskRegen |
| 2,2 | 穿刺打击 / `DehakaUltraliskBash` | `-` | 未解析 / Unresolved | - | - | HaveDehakaUltraliskBash |
| 2,3 | 原始战斗 / `PrimalUltraliskLevel2Merge` | `PrimalUltraliskLevel2Merge,SelectedUnits` | 合并技能 / CAbilMerge | 单位 / Unit:暴龙兽 / `DehakaUltraliskLevel3` | 效果集合 / CEffectSet:`DehakaGeneTyrannosaurMorphSet` | - |
| 2,4 | `BurrowDehakaUltraliskLevel2Down` | `BurrowDehakaUltraliskLevel2Down,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:`DehakaUltraliskLevel2Burrowed` | - | - |

### 暴龙兽 / `DehakaUltraliskLevel3`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMDehaka.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race PZrg，生命 / Life 1000，费用 / Cost 450/300，补给 / Supply 9
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`BurrowDehakaUltraliskLevel3Down`(变形技能 / CAbilMorph)、尖刺弹幕 / `DehakaTyrannozorFanOfKnives`(瞬发效果技能 / CAbilEffectInstant)、`move`(基础 / Basic)、`PrimalUltraliskLevel2Mergeable`(CAbilMergeable / CAbilMergeable)、`ProgressRally`(CAbilRally / CAbilRally)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`DehakaTyrannozorArmorAuraCaster`、`DehakaUltraliskBash`、`Frenzy`
- 可生产/创建 / Produced or created：`DehakaUltraliskLevel3Burrowed`（非本指挥官名册 / not in current commander roster）
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | 进化甲壳 / `DehakaGeneCarapacePassive` | `-` | 未解析 / Unresolved | - | - | HaveDehakaGeneCarapace |
| 1,1 | 进化肾上腺体 / `DehakaGeneAttackSpeedPassive` | `-` | 未解析 / Unresolved | - | - | HaveDehakaGeneAttackSpeed |
| 1,2 | 进化吸血 / `DehakaGeneLifeLeechPassive` | `-` | 未解析 / Unresolved | - | - | HaveDehakaGeneLifeLeech |
| 1,3 | 尖刺厚皮 / `DehakaGeneThornsPassive` | `-` | 未解析 / Unresolved | - | - | HaveDehakaGeneThorns |
| 1,4 | `Frenzied` | `-` | 未解析 / Unresolved | - | - | - |
| 1,4 | `ProgressRally` | `ProgressRally,Rally1` | CAbilRally / CAbilRally | - | - | - |
| 2,0 | `BarrageofSpikesLocked` | `-` | 未解析 / Unresolved | - | - | DehakaLevel11 |
| 2,0 | 尖刺弹幕 / `DehakaTyrannozorFanOfKnives` | `DehakaTyrannozorFanOfKnives,Execute` | 瞬发效果技能 / CAbilEffectInstant | - | 区域枚举效果 / CEffectEnumArea:`DehakaTyrannozorFanOfKnivesSearch` | - |
| 2,1 | 治疗适性 / `DehakaUltraliskRegen` | `-` | 未解析 / Unresolved | - | - | HaveDehakaUltraliskRegen |
| 2,2 | 暴龙的保护 / `DehakaTyrannozorArmorAura` | `-` | 未解析 / Unresolved | - | - | HaveDehakaTyrannozorArmorAura |
| 2,3 | 穿刺打击 / `DehakaUltraliskBash` | `-` | 未解析 / Unresolved | - | - | HaveDehakaUltraliskBash |
| 2,4 | `BurrowDehakaUltraliskLevel3Down` | `BurrowDehakaUltraliskLevel3Down,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:`DehakaUltraliskLevel3Burrowed` | - | - |

### 原始跳虫 / `DehakaZerglingLevel2`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMDehaka.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race PZrg，生命 / Life 90，费用 / Cost 50/0，补给 / Supply 1
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`BurrowDehakaZerglingLevel2Down`(变形技能 / CAbilMorph)、`move`(基础 / Basic)、`PrimalZerglingLevel2Mergeable`(CAbilMergeable / CAbilMergeable)、`PrimalZerglingRavasaurMerge`(合并技能 / CAbilMerge)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`SupplyLT1`
- 可生产/创建 / Produced or created：掠食龙 / `DehakaRavasaur`、`DehakaZerglingLevel2Burrowed`（非本指挥官名册 / not in current commander roster）
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,3 | 原始战斗 / `PrimalZerglingRavasaurMerge` | `PrimalZerglingRavasaurMerge,SelectedUnits` | 合并技能 / CAbilMerge | 单位 / Unit:掠食龙 / `DehakaRavasaur` | 效果集合 / CEffectSet:`DehakaGeneRavasaurMorphSet` | - |
| 2,4 | `BurrowDehakaZerglingLevel2Down` | `BurrowDehakaZerglingLevel2Down,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:`DehakaZerglingLevel2Burrowed` | - | - |

### 穿刺者 / `ImpalerDehaka`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMDehaka.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race PZrg，生命 / Life 200，费用 / Cost 200/100，补给 / Supply 3
- Catalog 技能链接 / Catalog ability links：`BurrowImpalerDehakaDown`(变形技能 / CAbilMorph)、`move`(基础 / Basic)、`PrimalHydraliskLevel2Mergeable`(CAbilMergeable / CAbilMergeable)、`ProgressRally`(CAbilRally / CAbilRally)、`stop`(基础 / Basic)
- 可生产/创建 / Produced or created：`ImpalerDehakaBurrowed`（非本指挥官名册 / not in current commander roster）
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | 进化甲壳 / `DehakaGeneCarapacePassive` | `-` | 未解析 / Unresolved | - | - | HaveDehakaGeneCarapace |
| 1,1 | 进化肾上腺体 / `DehakaGeneAttackSpeedPassive` | `-` | 未解析 / Unresolved | - | - | HaveDehakaGeneAttackSpeed |
| 1,2 | 进化吸血 / `DehakaGeneLifeLeechPassive` | `-` | 未解析 / Unresolved | - | - | HaveDehakaGeneLifeLeech |
| 1,4 | `ProgressRally` | `ProgressRally,Rally1` | CAbilRally / CAbilRally | - | - | - |
| 2,0 | 暴捶 / `DehakaImpalerTenderize` | `-` | 未解析 / Unresolved | - | - | HaveDehakaImpalerTenderize |
| 2,4 | `BurrowImpalerDehakaDown` | `BurrowImpalerDehakaDown,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:`ImpalerDehakaBurrowed` | - | - |

### 原始守护者 / `DehakaGuardian`

- 来源 / Source：名册 / Roster XMFinal CommanderRosters.galaxy，状态 / Status galaxy，模块 / Module XMDehaka.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146_CommanderRosters.galaxy`
- 数值 / Stats：类型 / Type Unit，种族 / Race PZrg，生命 / Life 175，费用 / Cost 125/50，补给 / Supply 3
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、爆裂孢子 / `DehakaGuardianMineCharge`(目标效果技能 / CAbilEffectTarget)、`move`(基础 / Basic)、`PrimalRoachLevel3GuardianMergeable`(CAbilMergeable / CAbilMergeable)、`stop`(基础 / Basic)
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | 进化甲壳 / `DehakaGeneCarapacePassive` | `-` | 未解析 / Unresolved | - | - | HaveDehakaGeneCarapace |
| 1,1 | 进化肾上腺体 / `DehakaGeneAttackSpeedPassive` | `-` | 未解析 / Unresolved | - | - | HaveDehakaGeneAttackSpeed |
| 1,2 | 进化吸血 / `DehakaGeneLifeLeechPassive` | `-` | 未解析 / Unresolved | - | - | HaveDehakaGeneLifeLeech |
| 2,0 | 爆裂孢子 / `DehakaGuardianMineCharge` | `DehakaGuardianMineCharge,Execute` | 目标效果技能 / CAbilEffectTarget | - | 效果集合 / CEffectSet:`DehakaGuardianMineChargeLaunch` | - |
| 2,1 | 原始狂怒 / `DehakaGuardianFury` | `-` | 未解析 / Unresolved | - | - | HaveDehakaGuardianFury |

## 英雄 / Heroes

### 德哈卡 / `DehakaCoop`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMDehaka.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：无 / None
- 关联 Behavior / Linked behaviors：`CommanderPrestigeDehakaCloneSpawnTracker`、`DehakaAttEssence`、`DehakaVeterancyCoopFinal`
- 已隐藏基础按钮 / Hidden basic buttons：2 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | 原始恢复 / `DehakaMendingAura` | `DehakaMendingAura,Off` | 行为/被动技能 / CAbilBehavior | - | - | - |
| 1,1 | 敏锐感官 / `DehakaDetector` | `DehakaDetector,Off` | 行为/被动技能 / CAbilBehavior | - | - | - |
| 1,2 | 骨板 / `DehakaArmorUpgrade` | `DehakaArmorUpgrade,Off` | 行为/被动技能 / CAbilBehavior | - | - | - |
| 1,3 | 致命触击 / `DehakaAirAttackUpgrade` | `DehakaAirAttackUpgrade,Off` | 行为/被动技能 / CAbilBehavior | - | - | - |
| 1,4 | 进化突变 / `DehakaLearnAbilities` | `-` | 未解析 / Unresolved | - | - | - |
| 2,3 | `MammothBreath` | `MammothBreath,Execute` | 目标效果技能 / CAbilEffectTarget | - | 区域枚举效果 / CEffectEnumArea:`ChargedBusterSearch`、效果集合 / CEffectSet:`MammothBreathStartSet` | - |
| 1,1 | 进化敏锐感官 / `DehakaLearn` | `DehakaLearn,Learn9` | 学习技能 / CAbilLearn | - | - | - |
| 1,2 | 进化骨板 / `DehakaLearn` | `DehakaLearn,Learn6` | 学习技能 / CAbilLearn | - | - | - |
| 1,3 | 进化致命触击 / `DehakaLearn` | `DehakaLearn,Learn11` | 学习技能 / CAbilLearn | - | - | - |

### 格里维格 / `DehakaGlevig`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMDehaka.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Hero，种族 / Race PZrg，生命 / Life 1500
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`BuildInProgress`(基础 / Basic)、为陛下让路 / `CommanderPrestigeDehakaPackLeadersRetreat`(瞬发效果技能 / CAbilEffectInstant)、`DehakaGlevigFirebreath`(目标效果技能 / CAbilEffectTarget)、`GlevigDeepTunnel`(目标效果技能 / CAbilEffectTarget)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`DehakaBossesSummonDelay`
- 可生产/创建 / Produced or created：`DehakaGlevigDeepTunnelPlacement`（非本指挥官名册 / not in current commander roster）
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | `DehakaGlevigFirebreath` | `DehakaGlevigFirebreath,Execute` | 目标效果技能 / CAbilEffectTarget | - | 持续效果 / CEffectCreatePersistent:`DehakaGlevigFirebreathDummyCP`、下令效果 / CEffectIssueOrder:`YagdraFirebreath` | - |
| 2,1 | `GlevigSpitfirePassive` | `-` | 未解析 / Unresolved | - | - | - |
| 2,4 | `GlevigDeepTunnel` | `GlevigDeepTunnel,Execute` | 目标效果技能 / CAbilEffectTarget | 效果创建 / Effect creates:`DehakaGlevigDeepTunnelPlacement` | 创建单位效果 / CEffectCreateUnit:`GlevigDeepTunnelCU` | - |

### 穆尔瓦 / `DehakaMurvar`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMDehaka.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Hero，种族 / Race PZrg，生命 / Life 2500，费用 / Cost 500/0
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、为陛下让路 / `CommanderPrestigeDehakaPackLeadersRetreat`(瞬发效果技能 / CAbilEffectInstant)、`CoopMurvarSpawnCreepers`(瞬发效果技能 / CAbilEffectInstant)、`move`(基础 / Basic)、`MurvarCoopPuke`(目标效果技能 / CAbilEffectTarget)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`DehakaBossesSummonDelay`
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | `CoopMurvarSpawnCreepers` | `CoopMurvarSpawnCreepers,Execute` | 瞬发效果技能 / CAbilEffectInstant | - | - | - |
| 2,1 | `MurvarCoopPuke` | `MurvarCoopPuke,Execute` | 目标效果技能 / CAbilEffectTarget | - | 效果集合 / CEffectSet:`CoopMurvarPukeInitialSet`、区域枚举效果 / CEffectEnumArea:`CoopMurvarPukePuddleSearch` | - |

### 达克伦 / `DehakaDakrun`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMDehaka.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Hero，种族 / Race PZrg，生命 / Life 4000
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、为陛下让路 / `CommanderPrestigeDehakaPackLeadersRetreat`(瞬发效果技能 / CAbilEffectInstant)、粉碎冲锋 / `DehakaCrashingCharge`(目标效果技能 / CAbilEffectTarget)、`move`(基础 / Basic)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`DehakaBossesSummonDelay`、`DehakaDakrunThorns`
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | 粉碎冲锋 / `DehakaCrashingCharge` | `DehakaCrashingCharge,Execute` | 目标效果技能 / CAbilEffectTarget | - | 移除行为效果 / CEffectRemoveBehavior:`DehakaCrashingChargeKnockbackRemoveBehavior`、持续效果 / CEffectCreatePersistent:`DehakaCrashingChargePersistent`、区域枚举效果 / CEffectEnumArea:`DehakaCrashingChargeTargetSearch` | - |
| 2,1 | 大型尖刺厚皮 / `DehakaDakrunThornsPassive` | `-` | 未解析 / Unresolved | - | - | HaveEvolvedPackLeadersDehaka |
