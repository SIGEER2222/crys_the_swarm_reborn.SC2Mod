# 凯瑞甘 / `Kerrigan` 科技链路排查 / Tech Tree Diagnostics

- 描述 / Description：无 / None
- 数据来源 / Data source：当前 Mod / Current Mod，目录 / Directory：`合作指挥官版起义狂潮/Mods/XM/XMKerrigan.SC2Mod`
- 当前 Mod 运行名册 / Current Mod roster：module=`XMKerrigan.SC2Mod`，instance=`Kerrigan`
- 统计 / Stats：建筑 17、生产链补充建筑 0、单位 10、英雄 3、建筑按钮 14、单位按钮 50、效果引用 12
- 名称显示 / Name display：能从当前 Mod zhCN 解析时显示“中文名 / `英文ID`”；仅显示 `ID` 表示当前 Mod 未找到可用中文名。

## 指挥官默认/顶部技能 / Commander Default / Top-panel Skills

| 技能名 / Skill Name | Ability/Cmd | 类型 / Type | 效果引用 / Effect References | Catalog 来源 / Catalog Sources |
| --- | --- | --- | --- | --- |
| `evolutionchamberresearch` | `evolutionchamberresearch,19` | 研究技能 / CAbilResearch | - | xmkerrigan:1 |
| `evolutionchamberresearch` | `evolutionchamberresearch` | 研究技能 / CAbilResearch | - | xmkerrigan:1 |
| `evolutionchamberresearch` | `evolutionchamberresearch,1` | 研究技能 / CAbilResearch | - | xmkerrigan:1 |
| `evolutionchamberresearch` | `evolutionchamberresearch,2` | 研究技能 / CAbilResearch | - | xmkerrigan:1 |

## 建筑 / Buildings

### `HatcheryKerrigan`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，官方ID / Official ID Hatchery，状态 / Status exact，模块 / Module XMKerrigan.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`UpgradeToLairKerrigan`(变形技能 / CAbilMorph)

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | `UpgradeToLairKerrigan` | `UpgradeToLairKerrigan,Execute` | 变形技能 / CAbilMorph | - | - | - |
| 2,4 | `UpgradeToLairKerrigan` | `UpgradeToLairKerrigan,Cancel` | 变形技能 / CAbilMorph | - | - | - |

### `LairKerrigan`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，官方ID / Official ID Lair，状态 / Status exact，模块 / Module XMKerrigan.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`UpgradeToHiveKerrigan`(变形技能 / CAbilMorph)

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | `UpgradeToHiveKerrigan` | `UpgradeToHiveKerrigan,Execute` | 变形技能 / CAbilMorph | - | - | - |
| 2,4 | `UpgradeToHiveKerrigan` | `UpgradeToHiveKerrigan,Cancel` | 变形技能 / CAbilMorph | - | - | - |

### `HiveKerrigan`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，官方ID / Official ID Hive，状态 / Status exact，模块 / Module XMKerrigan.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：无 / None

- 面板技能 / Panel skills：无 / None

### `ExtractorKerrigan`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，官方ID / Official ID Extractor，状态 / Status exact，模块 / Module XMKerrigan.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：无 / None

- 面板技能 / Panel skills：无 / None

### `SpawningPoolKerrigan`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，官方ID / Official ID SpawningPool，状态 / Status exact，模块 / Module XMKerrigan.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：无 / None

- 面板技能 / Panel skills：无 / None

### `EvolutionChamberKerrigan`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，官方ID / Official ID EvolutionChamber，状态 / Status exact，模块 / Module XMKerrigan.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：无 / None

- 面板技能 / Panel skills：无 / None

### `HydraliskDenKerrigan`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，官方ID / Official ID HydraliskDen，状态 / Status exact，模块 / Module XMKerrigan.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：无 / None

- 面板技能 / Panel skills：无 / None

### `SpireKerrigan`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，官方ID / Official ID Spire，状态 / Status exact，模块 / Module XMKerrigan.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`UpgradeToGreaterSpireKerrigan`(变形技能 / CAbilMorph)

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | `UpgradeToGreaterSpireKerrigan` | `UpgradeToGreaterSpireKerrigan,Execute` | 变形技能 / CAbilMorph | - | - | - |
| 2,4 | `UpgradeToGreaterSpireKerrigan` | `UpgradeToGreaterSpireKerrigan,Cancel` | 变形技能 / CAbilMorph | - | - | - |

### `GreaterSpireKerrigan`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，官方ID / Official ID GreaterSpire，状态 / Status exact，模块 / Module XMKerrigan.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：无 / None

- 面板技能 / Panel skills：无 / None

### `UltraliskCavernKerrigan`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，官方ID / Official ID UltraliskCavern，状态 / Status exact，模块 / Module XMKerrigan.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：无 / None

- 面板技能 / Panel skills：无 / None

### `NydusNetworkKerrigan`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，官方ID / Official ID NydusNetwork，状态 / Status exact，模块 / Module XMKerrigan.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`BuildNydusCanalKerrigan`(建造技能 / CAbilBuild)
- 可生产/创建 / Produced or created：`NydusCanalKerrigan`，耗时 / Time 20s

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | `BuildNydusCanalKerrigan` | `BuildNydusCanalKerrigan,Build1` | 建造技能 / CAbilBuild | `NydusCanalKerrigan`、单位 / Unit:`NydusCanalKerrigan` | - | - |
| 1,1 | `BuildNydusCanalKerrigan` | `BuildNydusCanalKerrigan,Build2` | 建造技能 / CAbilBuild | `NydusCanalKerrigan`、单位 / Unit:`NydusCanalKerrigan` | - | - |
| 1,2 | `BuildNydusCanalKerrigan` | `BuildNydusCanalKerrigan,Build3` | 建造技能 / CAbilBuild | `NydusCanalKerrigan`、单位 / Unit:`NydusCanalKerrigan` | - | - |
| 2,0 | `BuildNydusCanalKerrigan` | `BuildNydusCanalKerrigan,Build1` | 建造技能 / CAbilBuild | `NydusCanalKerrigan`、单位 / Unit:`NydusCanalKerrigan` | - | - |

### `SpineCrawlerKerrigan`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，官方ID / Official ID SpineCrawler，状态 / Status exact，模块 / Module XMKerrigan.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`SpineCrawlerUprootKerrigan`(变形技能 / CAbilMorph)

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | `SpineCrawlerUprootKerrigan` | `SpineCrawlerUprootKerrigan,Execute` | 变形技能 / CAbilMorph | - | - | - |

### `SporeCrawlerKerrigan`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，官方ID / Official ID SporeCrawler，状态 / Status exact，模块 / Module XMKerrigan.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`SporeCrawlerUprootKerrigan`(变形技能 / CAbilMorph)

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | `SporeCrawlerUprootKerrigan` | `SporeCrawlerUprootKerrigan,Execute` | 变形技能 / CAbilMorph | - | - | - |

### `GreaterNydusWormKerrigan`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，官方ID / Official ID GreaterNydusWorm，状态 / Status exact，模块 / Module XMKerrigan.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：无 / None

- 面板技能 / Panel skills：无 / None

### `NydusCanalKerrigan`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，官方ID / Official ID NydusCanal，状态 / Status exact，模块 / Module XMKerrigan.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：无 / None

- 面板技能 / Panel skills：无 / None

### `SpineCrawlerUprootedKerrigan`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，官方ID / Official ID SpineCrawlerUprooted，状态 / Status exact，模块 / Module XMKerrigan.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`SpineCrawlerRootKerrigan`(放置变形技能 / CAbilMorphPlacement)
- 已隐藏基础按钮 / Hidden basic buttons：1 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | `SpineCrawlerRootKerrigan` | `SpineCrawlerRootKerrigan,Execute` | 放置变形技能 / CAbilMorphPlacement | - | - | - |

### `SporeCrawlerUprootedKerrigan`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，官方ID / Official ID SporeCrawlerUprooted，状态 / Status exact，模块 / Module XMKerrigan.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`SporeCrawlerRootKerrigan`(放置变形技能 / CAbilMorphPlacement)
- 已隐藏基础按钮 / Hidden basic buttons：1 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | `SporeCrawlerRootKerrigan` | `SporeCrawlerRootKerrigan,Execute` | 放置变形技能 / CAbilMorphPlacement | - | - | - |

## 生产链补充建筑 / Production-support Buildings

- 无 / None

## 单位 / Units

### `DroneKerrigan`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，官方ID / Official ID Drone，状态 / Status exact，模块 / Module XMKerrigan.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race Zerg，生命 / Life 40，费用 / Cost 50/0，补给 / Supply 1
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`DroneCarcassHarvest`(目标效果技能 / CAbilEffectTarget)、`DroneHarvest`、`MapObjectInteract`(目标效果技能 / CAbilEffectTarget)、`move`(基础 / Basic)、`MutatorRemoveWorkerSleep`(瞬发效果技能 / CAbilEffectInstant)、喷漆-异虫 / `SprayZerg`、`stop`(基础 / Basic)、`ZergBuildKerrigan`(建造技能 / CAbilBuild)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`
- 可生产/创建 / Produced or created：`EvolutionChamberKerrigan`，耗时 / Time 40s、`ExtractorKerrigan`，耗时 / Time 30s、`HatcheryKerrigan`，耗时 / Time 60s、`HydraliskDenKerrigan`，耗时 / Time 40s、`NydusNetworkKerrigan`，耗时 / Time 50s、`SpawningPoolKerrigan`，耗时 / Time 65s、`SpineCrawlerKerrigan`，耗时 / Time 50s、`SpireKerrigan`，耗时 / Time 100s、`SporeCrawlerKerrigan`，耗时 / Time 30s、`UltraliskCavernKerrigan`，耗时 / Time 65s
- 已隐藏基础按钮 / Hidden basic buttons：10 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | `MapObjectInteract` | `MapObjectInteract,Execute` | 目标效果技能 / CAbilEffectTarget | - | - | - |
| 1,0 | `DroneHarvest` | `DroneHarvest,Gather` | 未解析 / Unresolved | - | - | - |
| 1,1 | `DroneHarvest` | `DroneHarvest,Return` | 未解析 / Unresolved | - | - | - |
| 2,3 | `MutatorRemoveWorkerSleep` | `MutatorRemoveWorkerSleep,Execute` | 瞬发效果技能 / CAbilEffectInstant | - | - | - |
| 2,3 | 喷漆-异虫 / `SprayZerg` | `SprayZerg,Execute` | 未解析 / Unresolved | - | - | - |
| 0,0 | `ZergBuildKerrigan` | `ZergBuildKerrigan,Build1` | 建造技能 / CAbilBuild | `HatcheryKerrigan`、单位 / Unit:`HatcheryKerrigan` | - | - |
| 0,1 | `ZergBuildKerrigan` | `ZergBuildKerrigan,Build3` | 建造技能 / CAbilBuild | `ExtractorKerrigan`、单位 / Unit:`ExtractorKerrigan` | - | - |
| 1,0 | `ZergBuildKerrigan` | `ZergBuildKerrigan,Build4` | 建造技能 / CAbilBuild | `SpawningPoolKerrigan`、单位 / Unit:`SpawningPoolKerrigan` | - | - |
| 1,1 | `ZergBuildKerrigan` | `ZergBuildKerrigan,Build5` | 建造技能 / CAbilBuild | `EvolutionChamberKerrigan`、单位 / Unit:`EvolutionChamberKerrigan` | - | - |
| 2,0 | `ZergBuildKerrigan` | `ZergBuildKerrigan,Build15` | 建造技能 / CAbilBuild | `SpineCrawlerKerrigan`、单位 / Unit:`SpineCrawlerKerrigan` | - | - |
| 2,1 | `ZergBuildKerrigan` | `ZergBuildKerrigan,Build16` | 建造技能 / CAbilBuild | `SporeCrawlerKerrigan`、单位 / Unit:`SporeCrawlerKerrigan` | - | - |
| 0,0 | `ZergBuildKerrigan` | `ZergBuildKerrigan,Build6` | 建造技能 / CAbilBuild | `HydraliskDenKerrigan`、单位 / Unit:`HydraliskDenKerrigan` | - | - |
| 0,1 | `ZergBuildKerrigan` | `ZergBuildKerrigan,Build7` | 建造技能 / CAbilBuild | `SpireKerrigan`、单位 / Unit:`SpireKerrigan` | - | - |
| 0,2 | `ZergBuildKerrigan` | `ZergBuildKerrigan,Build8` | 建造技能 / CAbilBuild | `UltraliskCavernKerrigan`、单位 / Unit:`UltraliskCavernKerrigan` | - | - |
| 1,0 | `ZergBuildKerrigan` | `ZergBuildKerrigan,Build10` | 建造技能 / CAbilBuild | `NydusNetworkKerrigan`、单位 / Unit:`NydusNetworkKerrigan` | - | - |

### 巢虫领主 / `BroodLord`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMKerrigan.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`AbathurBroodLordDoubleSacOvipositionPurchase`、`AbathurBroodLordParasiteFrenzyPurchase`、`AbathurBroodLordThickEmbryoMembranePurchase`
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | `SwarmSeeds` | `-` | 未解析 / Unresolved | - | - | - |
| 2,1 | `BroodlordSpeed` | `-` | 未解析 / Unresolved | - | - | HaveBroodlordSpeed |

### 刺蛇 / `Hydralisk`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMKerrigan.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`BurrowUltraliskDown`(变形技能 / CAbilMorph)、`BurrowUltraliskUp`(变形技能 / CAbilMorph)、`HydraliskFrenzy`(瞬发效果技能 / CAbilEffectInstant)、`MorphHydraliskToLurker`(训练技能 / CAbilTrain)、`move`(基础 / Basic)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`
- 可生产/创建 / Produced or created：`HydraliskLurker`（非本指挥官名册 / not in current commander roster），耗时 / Time 15s
- 已隐藏基础按钮 / Hidden basic buttons：1 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `FrenzyLocked` | `-` | 未解析 / Unresolved | - | - | KerriganLevel06 |
| 2 | `MuscularAugmentsCoop` | `-` | 未解析 / Unresolved | - | - | HaveGroovedSpines |
| 2,0 | `BuildLurkerLocked` | `-` | 未解析 / Unresolved | - | - | KerriganLevel06 |
| 2,0 | `MorphHydraliskToLurker` | `MorphHydraliskToLurker,Train1` | 训练技能 / CAbilTrain | `HydraliskLurker`、单位 / Unit:`HydraliskLurker` | - | HaveLurkerDen |
| 2,1 | `HydraliskFrenzy` | `HydraliskFrenzy,Execute` | 瞬发效果技能 / CAbilEffectInstant | - | - | - |
| 2,3 | `BurrowUltraliskDown` | `BurrowUltraliskDown,Execute` | 变形技能 / CAbilMorph | - | - | - |
| 2,4 | `BurrowUltraliskUp` | `BurrowUltraliskUp,Execute` | 变形技能 / CAbilMorph | - | - | - |

### `MutaliskBroodlord`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMKerrigan.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit
- Catalog 技能链接 / Catalog ability links：`MutaliskMorphToBroodLord`(训练技能 / CAbilTrain)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`KerriganOwned`
- 已隐藏基础按钮 / Hidden basic buttons：1 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | - | `-` | 未解析 / Unresolved | - | - | HaveKerriganViciousGlaive |
| 1,2 | `SeveringGlave` | `-` | 未解析 / Unresolved | - | - | HaveKerriganSunderingGlaive |

### 雷兽 / `Ultralisk`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMKerrigan.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`BurrowUltraliskDown`(变形技能 / CAbilMorph)、`BurrowUltraliskUp`(变形技能 / CAbilMorph)、`move`(基础 / Basic)、`stop`(基础 / Basic)、`UltraliskBurrowCharge`(目标效果技能 / CAbilEffectTarget)、`UltraliskElectricShockPurchase`(瞬发效果技能 / CAbilEffectInstant)、`UltraliskHighVoltagePurchase`(瞬发效果技能 / CAbilEffectInstant)、`UltraliskLightningRaidPurchase`(瞬发效果技能 / CAbilEffectInstant)、`UltraliskThunderstormPurchase`(瞬发效果技能 / CAbilEffectInstant)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`Frenzy`、`UltraliskOutOfCombat1`、`VorazunCloakDamageBoostPermanentUltraliskBurrowCharge`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | `EvolveChitinousPlating` | `-` | 未解析 / Unresolved | - | - | HaveUltraliskChitnousPlating |
| 1,1 | `EvolveAnabolicSynthesis2` | `-` | 未解析 / Unresolved | - | - | HaveUltraliskAnabolicSynthesis |
| 1,2 | `TissueAssimilation` | `-` | 未解析 / Unresolved | - | - | HaveHotSTissueAssimilation |
| 2,0 | `Frenzied` | `-` | 未解析 / Unresolved | - | - | - |
| 2,1 | `HaveChitinousPlating` | `-` | 未解析 / Unresolved | - | - | HaveHotSChitinousPlating |
| 2,2 | `UltraliskBurrowCharge` | `UltraliskBurrowCharge,Execute` | 目标效果技能 / CAbilEffectTarget | - | - | - |
| 2,2 | `BurrowChargeLocked` | `-` | 未解析 / Unresolved | - | - | KerriganLevel13 |
| 2,3 | `BurrowUltraliskDown` | `BurrowUltraliskDown,Execute` | 变形技能 / CAbilMorph | - | - | - |
| 2,4 | `BurrowUltraliskUp` | `BurrowUltraliskUp,Execute` | 变形技能 / CAbilMorph | - | - | - |

### 跳虫 / `Zergling`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster，状态 / Status exact，模块 / Module XMKerrigan.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`MorphZerglingToHunter`(训练技能 / CAbilTrain)、`MorphZerglingToSplitterling`(训练技能 / CAbilTrain)、`move`(基础 / Basic)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`MasteryZagaraZerglingDodgeChance`、`SupplyLT1`、`ZerglingRespawnDeath`
- 已隐藏基础按钮 / Hidden basic buttons：1 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | - | `-` | 未解析 / Unresolved | - | - | HaveMPAdrenalGlands |
| 1,0 | - | `-` | 未解析 / Unresolved | - | - | HaveMPMetabolicBoost |
| 1,3 | `ZerglingArmorShred` | `-` | 未解析 / Unresolved | - | - | HaveZerglingArmorShred |

### `QueenCoop`

- 来源 / Source：名册 / Roster XMFinal CommanderRosters.galaxy，官方ID / Official ID SwarmQueen，状态 / Status alias，模块 / Module XMKerrigan.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146_CommanderRosters.galaxy`
- 数值 / Stats：类型 / Type Unit，种族 / Race Zerg，生命 / Life 175，能量 / Energy 200，费用 / Cost 150/0，补给 / Supply 2
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`BioMechanicalTransfusion`(目标效果技能 / CAbilEffectTarget)、`BurrowQueenDownCoop`、`DeepTunnel`(目标效果技能 / CAbilEffectTarget)、`KerriganEnhance`(行为/被动技能 / CAbilBehavior)、`move`(基础 / Basic)、`QueenBuild`(建造技能 / CAbilBuild)、`SpawnLarva`(目标效果技能 / CAbilEffectTarget)、`stop`(基础 / Basic)、`Transfusion`(目标效果技能 / CAbilEffectTarget)
- 关联 Behavior / Linked behaviors：`AbathurPropArmor`、`AllUnitBehaviorController`
- 已隐藏基础按钮 / Hidden basic buttons：6 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | `InjectLarvaPassive` | `-` | 未解析 / Unresolved | - | - | HaveQueenDoubleInjectLarva |
| 2,0 | `QueenBuild` | `QueenBuild,Build1` | 建造技能 / CAbilBuild | `CreepTumorQueenNoCreep` | - | - |
| 2,1 | `SpawnLarva` | `SpawnLarva,Execute` | 目标效果技能 / CAbilEffectTarget | - | 效果集合 / CEffectSet:`SpawnLarvaSet` | - |
| 2,2 | `SpawnLarva` | `SpawnLarva,Execute` | 目标效果技能 / CAbilEffectTarget | - | 效果集合 / CEffectSet:`SpawnLarvaSet` | - |
| 2,2 | `Transfusion` | `Transfusion,Execute` | 目标效果技能 / CAbilEffectTarget | - | CEffectSwitch / CEffectSwitch:`TransfusionACSwitch` | - |
| 2,4 | `BurrowQueenDownCoop` | `BurrowQueenDownCoop,Execute` | 未解析 / Unresolved | - | - | - |

### `HotSRaptor`

- 来源 / Source：名册 / Roster XMFinal CommanderRosters.galaxy，官方ID / Official ID Zergling，状态 / Status alias，模块 / Module XMKerrigan.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146_CommanderRosters.galaxy`
- 数值 / Stats：类型 / Type Unit
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`BurrowHotSRaptorDown`(变形技能 / CAbilMorph)、`BurrowUltraliskDown`(变形技能 / CAbilMorph)、`BurrowUltraliskUp`(变形技能 / CAbilMorph)、`HotSRaptorCharge`(CAbilAugment / CAbilAugment)、`MorphZerglingToBaneling`(训练技能 / CAbilTrain)、`move`(基础 / Basic)、`que1`、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`HotSRaptorJump`、`SupplyLT1`、`ZerglingRespawnDeath`
- 已隐藏基础按钮 / Hidden basic buttons：1 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | - | `-` | 未解析 / Unresolved | - | - | HaveMPAdrenalGlands |
| 1,0 | - | `-` | 未解析 / Unresolved | - | - | HaveMPMetabolicBoost |
| 1,3 | `ZerglingArmorShred` | `-` | 未解析 / Unresolved | - | - | HaveZerglingArmorShred |

### `LurkerMP`

- 来源 / Source：名册 / Roster XMFinal CommanderRosters.galaxy，状态 / Status galaxy，模块 / Module XMKerrigan.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146_CommanderRosters.galaxy`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：无 / None

- 面板技能 / Panel skills：无 / None

### 眼虫 / `Overseer`

- 来源 / Source：名册 / Roster XMFinal CommanderRosters.galaxy，状态 / Status galaxy，模块 / Module XMKerrigan.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146_CommanderRosters.galaxy`
- 数值 / Stats：能量 / Energy 0
- Catalog 技能链接 / Catalog ability links：`OverseerMorphtoOverseerSiege`(变形技能 / CAbilMorph)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`Detector11`、`SupplyLT1`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0 | `OverseerMorphtoOverseerSiege` | `OverseerMorphtoOverseerSiege,Execute` | 变形技能 / CAbilMorph | - | - | - |
| 1,0 | `HaveOverlordSpeed` | `-` | 未解析 / Unresolved | - | - | HavePneumatizedCarapace |
| 1,0 | `HaveOverlordSpeed` | `-` | 未解析 / Unresolved | - | - | HavePneumatizedCarapaceStukov |

## 英雄 / Heroes

### 凯瑞甘 / `K5Kerrigan`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMKerrigan.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Hero，生命 / Life 800，护盾 / Shields 200
- Catalog 技能链接 / Catalog ability links：`Apocalypse`(目标效果技能 / CAbilEffectTarget)、`attack`(基础 / Basic)、`K5DropPods`(目标效果技能 / CAbilEffectTarget)、`K5KerriganBurrow`(变形技能 / CAbilMorph)、`K5KerriganPsiStrikeMorph`(变形技能 / CAbilMorph)、`K5Leviathan`(瞬发效果技能 / CAbilEffectInstant)、`KerriganMaelstrom`(瞬发效果技能 / CAbilEffectInstant)、`KerriganVoidCoopCrushingGripWave`(瞬发效果技能 / CAbilEffectInstant)、`KerriganVoidCoopEconDrop`(瞬发效果技能 / CAbilEffectInstant)、`MindBolt`(目标效果技能 / CAbilEffectTarget)、`move`(基础 / Basic)、`PrimalHeal`(瞬发效果技能 / CAbilEffectInstant)、`PrimalSlash`(目标效果技能 / CAbilEffectTarget)、`PsionicLift`(目标效果技能 / CAbilEffectTarget)、`PsiStrikeWalk`(目标效果技能 / CAbilEffectTarget)、`SpawnBanelings`(瞬发效果技能、目标效果技能 / CAbilEffectInstant、CAbilEffectTarget)、`stop`(基础 / Basic)、`WildMutation`(目标效果技能 / CAbilEffectTarget)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`HeroCCImmunity`、`HeroicFortitude`、`KerriganAssimilationLifesteal`、`KerriganUnburrowedDummy`、`KerriganVeterancyDummy`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | `K5ZerglingRespawn` | `-` | 未解析 / Unresolved | - | - | - |
| 1,0 | `KerriganAssimilation` | `-` | 未解析 / Unresolved | - | - | - |
| 1,1 | `ChainReaction` | `-` | 未解析 / Unresolved | - | - | HaveK5ChainLightning |
| 1,1 | `KerriganChainLightning` | `-` | 未解析 / Unresolved | - | - | KerriganLevel09 |
| 1,2 | `K5Cooldowns` | `-` | 未解析 / Unresolved | - | - | HaveK5Cooldowns |
| 1,2 | `K5CooldownsLocked` | `-` | 未解析 / Unresolved | - | - | KerriganLevel09 |
| 1,3 | `K5Fury` | `-` | 未解析 / Unresolved | - | - | HaveK5Fury |
| 1,3 | `KerriganFuryLocked` | `-` | 未解析 / Unresolved | - | - | KerriganLevel10 |
| 1,4 | `CommanderKerriganKerriganEnergyRegeneration` | `-` | 未解析 / Unresolved | - | - | HaveKerriganVoidCoopEnergyRegen |
| 1,4 | `QueenofBladesLocked` | `-` | 未解析 / Unresolved | - | - | KerriganLevel15 |
| 2,0 | `K5HeroicFortitude` | `-` | 未解析 / Unresolved | - | - | HaveK5HeroicFortitude |
| 2,0 | `MindBolt` | `MindBolt,Execute` | 目标效果技能 / CAbilEffectTarget | - | - | - |
| 2,0 | `PrimalSlash` | `PrimalSlash,Execute` | 目标效果技能 / CAbilEffectTarget | - | 效果集合 / CEffectSet:`PrimalSlashInitialSet` | - |
| 2,1 | `PsionicLift` | `PsionicLift,Execute` | 目标效果技能 / CAbilEffectTarget | - | 区域枚举效果 / CEffectEnumArea:`PsionicLiftRaiseSearch` | - |
| 2,1 | `PsiStrikeWalk` | `PsiStrikeWalk,Execute` | 目标效果技能 / CAbilEffectTarget | - | - | - |
| 2,2 | `KerriganVoidCoopEconDrop` | `KerriganVoidCoopEconDrop,Execute` | 瞬发效果技能 / CAbilEffectInstant | - | 施加行为效果 / CEffectApplyBehavior:`KerriganVoidCoopEconDropCasterAB` | - |
| 2,2 | `PrimalHeal` | `PrimalHeal,Execute` | 瞬发效果技能 / CAbilEffectInstant | - | - | - |
| 2,2 | `SpawnBanelings` | `SpawnBanelings,Execute` | 瞬发效果技能 / CAbilEffectInstant | - | - | - |
| 2,2 | `WildMutation` | `WildMutation,Execute` | 目标效果技能 / CAbilEffectTarget | - | - | - |
| 2,3 | `Apocalypse` | `Apocalypse,Execute` | 目标效果技能 / CAbilEffectTarget | - | - | - |
| 2,3 | `K5DropPods` | `K5DropPods,Execute` | 目标效果技能 / CAbilEffectTarget | - | - | - |
| 2,3 | `KerriganCrushingGripWaveLocked` | `-` | 未解析 / Unresolved | - | - | KerriganLevel02 |
| 2,3 | `KerriganVoidCoopCrushingGripWave` | `KerriganVoidCoopCrushingGripWave,Execute` | 瞬发效果技能 / CAbilEffectInstant | - | 持续效果 / CEffectCreatePersistent:`KerriganVoidCoopCrushingGripWaveDelayCP` | - |
| 2,4 | `K5KerriganBurrow` | `K5KerriganBurrow,Execute` | 变形技能 / CAbilMorph | - | - | - |

### `SwarmQueen`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster，状态 / Status exact，模块 / Module XMKerrigan.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Hero，种族 / Race Zerg，生命 / Life 150，提供补给 / Supply provided 8
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`BurrowSwarmQueenDown`(变形技能 / CAbilMorph)、`MorphToLargeSwarmQueen`(变形技能 / CAbilMorph)、`move`(基础 / Basic)、`que1`、`stop`(基础 / Basic)、`SwarmQueenParasiticInvasion`(目标效果技能 / CAbilEffectTarget)、`SwarmQueenTrain`(训练技能 / CAbilTrain)
- 关联 Behavior / Linked behaviors：`SwarmQueenRegenAura`
- 可生产/创建 / Produced or created：`HotSRaptor`，费用 / Cost -50，耗时 / Time 5s、`HotSSwarmling`（非本指挥官名册 / not in current commander roster），费用 / Cost -75，耗时 / Time 2.4s、跳虫 / `Zergling`，费用 / Cost -50，耗时 / Time 5s
- 已隐藏基础按钮 / Hidden basic buttons：6 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | `SwarmQueenRegenAura` | `-` | 未解析 / Unresolved | - | - | - |
| 2,0 | `SwarmQueenParasiticInvasion` | `SwarmQueenParasiticInvasion,Execute` | 目标效果技能 / CAbilEffectTarget | - | - | - |
| 2,1 | `SwarmQueenTrain` | `SwarmQueenTrain,Train2` | 训练技能 / CAbilTrain | `HotSRaptor`、单位 / Unit:`HotSRaptor` | - | - |
| 2,1 | `SwarmQueenTrain` | `SwarmQueenTrain,Train3` | 训练技能 / CAbilTrain | `HotSSwarmling`、单位 / Unit:`HotSSwarmling` | - | - |
| 2,1 | `SwarmQueenTrain` | `SwarmQueenTrain,Train1` | 训练技能 / CAbilTrain | 跳虫 / `Zergling`、单位 / Unit:跳虫 / `Zergling` | - | - |
| 2,2 | `MorphToLargeSwarmQueen` | `MorphToLargeSwarmQueen,Execute` | 变形技能 / CAbilMorph | - | - | - |
| 2,4 | `BurrowSwarmQueenDown` | `BurrowSwarmQueenDown,Execute` | 变形技能 / CAbilMorph | - | - | - |

### `K5KerriganBurrowed`

- 来源 / Source：名册 / Roster inferred current Mod hero catalog unit，状态 / Status catalog ObjectType:Hero，模块 / Module XMKerrigan.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMKerrigan.SC2Mod/Base.SC2Data/GameData/UnitData.xml`
- 数值 / Stats：类型 / Type Hero，生命 / Life 800，护盾 / Shields 200
- Catalog 技能链接 / Catalog ability links：`Apocalypse`(目标效果技能 / CAbilEffectTarget)、`K5DropPods`(目标效果技能 / CAbilEffectTarget)、`K5KerriganBurrow`(变形技能 / CAbilMorph)、`K5KerriganPsiStrikeMorph`(变形技能 / CAbilMorph)、`K5KerriganUnburrow`(变形技能 / CAbilMorph)、`K5Leviathan`(瞬发效果技能 / CAbilEffectInstant)、`KerriganMaelstrom`(瞬发效果技能 / CAbilEffectInstant)、`KerriganVoidCoopCrushingGripWave`(瞬发效果技能 / CAbilEffectInstant)、`KerriganVoidCoopEconDrop`(瞬发效果技能 / CAbilEffectInstant)、`MindBolt`(目标效果技能 / CAbilEffectTarget)、`PrimalHeal`(瞬发效果技能 / CAbilEffectInstant)、`PrimalSlash`(目标效果技能 / CAbilEffectTarget)、`PsionicLift`(目标效果技能 / CAbilEffectTarget)、`PsiStrikeWalk`(目标效果技能 / CAbilEffectTarget)、`SpawnBanelings`(瞬发效果技能、目标效果技能 / CAbilEffectInstant、CAbilEffectTarget)、`WildMutation`(目标效果技能 / CAbilEffectTarget)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`HeroCCImmunity`、`HeroicFortitude`、`K5KerriganBurrowedDisabler`、`KerriganAssimilationLifesteal`、`KerriganVeterancyDummy`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | `K5ZerglingRespawn` | `-` | 未解析 / Unresolved | - | - | - |
| 1,0 | `KerriganAssimilation` | `-` | 未解析 / Unresolved | - | - | - |
| 1,1 | `ChainReaction` | `-` | 未解析 / Unresolved | - | - | HaveK5ChainLightning |
| 1,1 | `KerriganChainLightning` | `-` | 未解析 / Unresolved | - | - | KerriganLevel09 |
| 1,2 | `K5Cooldowns` | `-` | 未解析 / Unresolved | - | - | HaveK5Cooldowns |
| 1,2 | `K5CooldownsLocked` | `-` | 未解析 / Unresolved | - | - | KerriganLevel09 |
| 1,3 | `K5Fury` | `-` | 未解析 / Unresolved | - | - | HaveK5Fury |
| 1,3 | `KerriganFuryLocked` | `-` | 未解析 / Unresolved | - | - | KerriganLevel10 |
| 1,4 | `CommanderKerriganKerriganEnergyRegeneration` | `-` | 未解析 / Unresolved | - | - | - |
| 1,4 | `QueenofBladesLocked` | `-` | 未解析 / Unresolved | - | - | KerriganLevel15 |
| 2,0 | `K5HeroicFortitude` | `-` | 未解析 / Unresolved | - | - | HaveK5HeroicFortitude |
| 2,0 | `MindBolt` | `MindBolt,Execute` | 目标效果技能 / CAbilEffectTarget | - | - | - |
| 2,0 | `PrimalSlash` | `PrimalSlash,Execute` | 目标效果技能 / CAbilEffectTarget | - | 效果集合 / CEffectSet:`PrimalSlashInitialSet` | - |
| 2,1 | `PsionicLift` | `PsionicLift,Execute` | 目标效果技能 / CAbilEffectTarget | - | 区域枚举效果 / CEffectEnumArea:`PsionicLiftRaiseSearch` | - |
| 2,1 | `PsiStrikeWalk` | `PsiStrikeWalk,Execute` | 目标效果技能 / CAbilEffectTarget | - | - | - |
| 2,2 | `KerriganVoidCoopEconDrop` | `KerriganVoidCoopEconDrop,Execute` | 瞬发效果技能 / CAbilEffectInstant | - | 施加行为效果 / CEffectApplyBehavior:`KerriganVoidCoopEconDropCasterAB` | - |
| 2,2 | `PrimalHeal` | `PrimalHeal,Execute` | 瞬发效果技能 / CAbilEffectInstant | - | - | - |
| 2,2 | `SpawnBanelings` | `SpawnBanelings,Execute` | 瞬发效果技能 / CAbilEffectInstant | - | - | - |
| 2,2 | `WildMutation` | `WildMutation,Execute` | 目标效果技能 / CAbilEffectTarget | - | - | - |
| 2,3 | `Apocalypse` | `Apocalypse,Execute` | 目标效果技能 / CAbilEffectTarget | - | - | - |
| 2,3 | `K5DropPods` | `K5DropPods,Execute` | 目标效果技能 / CAbilEffectTarget | - | - | - |
| 2,3 | `K5Leviathan` | `K5Leviathan,Execute` | 瞬发效果技能 / CAbilEffectInstant | - | - | - |
| 2,3 | `KerriganCrushingGripWaveLocked` | `-` | 未解析 / Unresolved | - | - | KerriganLevel02 |
| 2,3 | `KerriganVoidCoopCrushingGripWave` | `KerriganVoidCoopCrushingGripWave,Execute` | 瞬发效果技能 / CAbilEffectInstant | - | 持续效果 / CEffectCreatePersistent:`KerriganVoidCoopCrushingGripWaveDelayCP` | - |
| 2,4 | `K5KerriganUnburrow` | `K5KerriganUnburrow,Execute` | 变形技能 / CAbilMorph | - | - | - |
