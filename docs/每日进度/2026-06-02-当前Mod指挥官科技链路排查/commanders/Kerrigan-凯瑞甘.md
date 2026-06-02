# 凯瑞甘 / `Kerrigan` 科技链路排查 / Tech Tree Diagnostics

- 描述 / Description：无 / None
- 数据来源 / Data source：当前 Mod / Current Mod，目录 / Directory：`合作指挥官版起义狂潮/Mods/XM/XMKerrigan.SC2Mod`
- 当前 Mod 运行名册 / Current Mod roster：module=`XMKerrigan.SC2Mod`，instance=`Kerrigan`
- 统计 / Stats：建筑 4、生产链补充建筑 0、单位 10、英雄 2、建筑按钮 14、单位按钮 35、效果引用 13
- 名称显示 / Name display：能从当前 Mod zhCN 解析时显示“中文名 / `英文ID`”；仅显示 `ID` 表示当前 Mod 未找到可用中文名。

## 指挥官默认/顶部技能 / Commander Default / Top-panel Skills

| 技能名 / Skill Name | Ability/Cmd | 类型 / Type | 效果引用 / Effect References | Catalog 来源 / Catalog Sources |
| --- | --- | --- | --- | --- |
| `evolutionchamberresearch` | `evolutionchamberresearch,19` | 研究技能 / CAbilResearch | - | xmkerrigan:1 |
| `evolutionchamberresearch` | `evolutionchamberresearch` | 研究技能 / CAbilResearch | - | xmkerrigan:1 |
| `evolutionchamberresearch` | `evolutionchamberresearch,1` | 研究技能 / CAbilResearch | - | xmkerrigan:1 |
| `evolutionchamberresearch` | `evolutionchamberresearch,2` | 研究技能 / CAbilResearch | - | xmkerrigan:1 |

## 建筑 / Buildings

### 虫道网络欧米茄 / `NydusNetwork`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMKerrigan.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`BuildInProgress`(基础 / Basic)、`BuildNydusCanal`(建造技能 / CAbilBuild)、`NydusCanalTransport`(运输技能 / CAbilTransport)、`Rally`(CAbilRally / CAbilRally)、`RallyNydus`(CAbilRally / CAbilRally)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`ChronoBoostTarget`、`NydusNetworkAllyCreate`、`NydusNetworkConjoined`
- 可生产/创建 / Produced or created：坑道虫欧米茄 / `GreaterNydusWorm`，耗时 / Time 20s、`NydusCanal`（非本指挥官名册 / not in current commander roster），耗时 / Time 20s

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | `BuildNydusCanal` | `BuildNydusCanal,Build1` | 建造技能 / CAbilBuild | `NydusCanal`、坑道虫欧米茄 / `GreaterNydusWorm`、单位 / Unit:`NydusCanal` | - | - |
| 1,1 | `BuildNydusCanal` | `BuildNydusCanal,Build2` | 建造技能 / CAbilBuild | `NydusCanal`、坑道虫欧米茄 / `GreaterNydusWorm`、单位 / Unit:`NydusCanal` | - | - |
| 1,2 | `BuildNydusCanal` | `BuildNydusCanal,Build3` | 建造技能 / CAbilBuild | `NydusCanal`、单位 / Unit:`NydusCanal` | - | - |
| 1,4 | `Rally` | `Rally,Rally1` | CAbilRally / CAbilRally | - | - | - |
| 2,0 | `BuildNydusCanal` | `BuildNydusCanal,Build1` | 建造技能 / CAbilBuild | `NydusCanal`、坑道虫欧米茄 / `GreaterNydusWorm`、单位 / Unit:`NydusCanal` | - | - |
| 2,1 | `NydusCanalTransport` | `NydusCanalTransport,Load` | 运输技能 / CAbilTransport | - | 效果集合 / CEffectSet:`CoopCargoDeathDummy`、施加行为效果 / CEffectApplyBehavior:`HotSRaptorNoLeaping` | - |
| 2,2 | `NydusWormIncreasedArmorPassive` | `-` | 未解析 / Unresolved | - | - | - |

### 脊针爬虫 / `SpineCrawler`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMKerrigan.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`BroodlingInfestation`(瞬发效果技能 / CAbilEffectInstant)、`BuildInProgress`(基础 / Basic)、`CloudofFlies`(瞬发效果技能 / CAbilEffectInstant)、`RagingTentacle`(瞬发效果技能 / CAbilEffectInstant)、`Range`(瞬发效果技能 / CAbilEffectInstant)、`SpineCrawlerUproot`(变形技能 / CAbilMorph)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`CrawlerCombatRegen`、`CrawlerSafetyRegen`、`EnableCrawlerWeapon`
- 已隐藏基础按钮 / Hidden basic buttons：3 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | `SpineCrawlerUproot` | `SpineCrawlerUproot,Execute` | 变形技能 / CAbilMorph | - | - | - |

### 孢子爬虫 / `SporeCrawler`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMKerrigan.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`AcidMortar`(瞬发效果技能 / CAbilEffectInstant)、`attack`(基础 / Basic)、`BroodlingInfestation`(瞬发效果技能 / CAbilEffectInstant)、`BuildInProgress`(基础 / Basic)、`CloudofFlies`(瞬发效果技能 / CAbilEffectInstant)、`Range`(瞬发效果技能 / CAbilEffectInstant)、`SporeCrawlerUproot`(变形技能 / CAbilMorph)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`CrawlerCombatRegen`、`CrawlerSafetyRegen`、`Detector11`
- 已隐藏基础按钮 / Hidden basic buttons：3 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | `SporeCrawlerUproot` | `SporeCrawlerUproot,Execute` | 变形技能 / CAbilMorph | - | - | - |
| 2,3 | `Detector` | `-` | 未解析 / Unresolved | - | - | NotUnderConstruction |

### 坑道虫欧米茄 / `GreaterNydusWorm`

- 来源 / Source：名册 / Roster XMFinal CommanderBuildings.galaxy，状态 / Status galaxy，模块 / Module XMKerrigan.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146_CommanderBuildings.galaxy`
- 数值 / Stats：类型 / Type Structure
- Catalog 技能链接 / Catalog ability links：`RallyNydus`(CAbilRally / CAbilRally)
- 关联 Behavior / Linked behaviors：`Detector10`、`GreaterNydusWormAllyCreate`、`GreaterNydusWormConjoined`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0 | `GreaterNydusWormTransport` | `GreaterNydusWormTransport,Load` | 运输技能 / CAbilTransport | - | 效果集合 / CEffectSet:`CoopCargoDeathDummy`、施加行为效果 / CEffectApplyBehavior:`HotSRaptorNoLeaping` | - |
| - | `RallyNydus` | `RallyNydus,Rally1` | CAbilRally / CAbilRally | - | - | - |
| 1 | `GreaterNydusWormTransport` | `GreaterNydusWormTransport,UnloadAll` | 运输技能 / CAbilTransport | - | 效果集合 / CEffectSet:`CoopCargoDeathDummy`、施加行为效果 / CEffectApplyBehavior:`HotSRaptorNoLeaping` | - |
| 2,3 | `Detector` | `-` | 未解析 / Unresolved | - | - | - |

## 生产链补充建筑 / Production-support Buildings

- 无 / None

## 单位 / Units

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
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`BurrowUltraliskDown`、`BurrowUltraliskUp`、`HydraliskFrenzy`(瞬发效果技能 / CAbilEffectInstant)、`MorphHydraliskToLurker`(训练技能 / CAbilTrain)、`move`(基础 / Basic)、`stop`(基础 / Basic)
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
| 2,3 | `BurrowUltraliskDown` | `BurrowUltraliskDown,Execute` | 未解析 / Unresolved | - | - | - |
| 2,4 | `BurrowUltraliskUp` | `BurrowUltraliskUp,Execute` | 未解析 / Unresolved | - | - | - |

### `MutaliskBroodlord`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMKerrigan.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit
- Catalog 技能链接 / Catalog ability links：无 / None
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`KerriganOwned`
- 已隐藏基础按钮 / Hidden basic buttons：1 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | - | `-` | 未解析 / Unresolved | - | - | HaveKerriganViciousGlaive |
| 1,2 | `SeveringGlave` | `-` | 未解析 / Unresolved | - | - | HaveKerriganSunderingGlaive |

### `SwarmQueen`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster，状态 / Status exact，模块 / Module XMKerrigan.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：无 / None

- 面板技能 / Panel skills：无 / None

### 雷兽 / `Ultralisk`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMKerrigan.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`BurrowUltraliskDown`、`BurrowUltraliskUp`、`move`(基础 / Basic)、`stop`(基础 / Basic)、`UltraliskBurrowCharge`(目标效果技能 / CAbilEffectTarget)、`UltraliskElectricShockPurchase`、`UltraliskHighVoltagePurchase`、`UltraliskLightningRaidPurchase`、`UltraliskThunderstormPurchase`
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`UltraliskOutOfCombat1`、`VorazunCloakDamageBoostPermanentUltraliskBurrowCharge`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | `EvolveChitinousPlating` | `-` | 未解析 / Unresolved | - | - | HaveUltraliskChitnousPlating |
| 1,1 | `EvolveAnabolicSynthesis2` | `-` | 未解析 / Unresolved | - | - | HaveUltraliskAnabolicSynthesis |
| 1,2 | `TissueAssimilation` | `-` | 未解析 / Unresolved | - | - | HaveHotSTissueAssimilation |
| 2,0 | `Frenzied` | `-` | 未解析 / Unresolved | - | - | - |
| 2,1 | `HaveChitinousPlating` | `-` | 未解析 / Unresolved | - | - | HaveHotSChitinousPlating |
| 2,2 | `UltraliskBurrowCharge` | `UltraliskBurrowCharge,Execute` | 目标效果技能 / CAbilEffectTarget | - | - | - |
| 2,2 | `BurrowChargeLocked` | `-` | 未解析 / Unresolved | - | - | KerriganLevel13 |
| 2,3 | `BurrowUltraliskDown` | `BurrowUltraliskDown,Execute` | 未解析 / Unresolved | - | - | - |
| 2,4 | `BurrowUltraliskUp` | `BurrowUltraliskUp,Execute` | 未解析 / Unresolved | - | - | - |

### 跳虫 / `Zergling`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster，状态 / Status exact，模块 / Module XMKerrigan.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`move`(基础 / Basic)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`MasteryZagaraZerglingDodgeChance`、`SupplyLT1`
- 已隐藏基础按钮 / Hidden basic buttons：1 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | - | `-` | 未解析 / Unresolved | - | - | HaveMPAdrenalGlands |
| 1,0 | - | `-` | 未解析 / Unresolved | - | - | HaveMPMetabolicBoost |
| 1,3 | `ZerglingArmorShred` | `-` | 未解析 / Unresolved | - | - | HaveZerglingArmorShred |

### `QueenCoop`

- 来源 / Source：名册 / Roster XMFinal CommanderRosters.galaxy，官方ID / Official ID SwarmQueen，状态 / Status alias，模块 / Module XMKerrigan.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146_CommanderRosters.galaxy`
- 数值 / Stats：类型 / Type Unit，种族 / Race Zerg，生命 / Life 175，能量 / Energy 200，费用 / Cost 150/0，补给 / Supply 2
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`BurrowQueenDownCoop`、`DeepTunnel`、`KerriganEnhance`、`move`(基础 / Basic)、`QueenBuild`(建造技能 / CAbilBuild)、`SpawnLarva`(目标效果技能 / CAbilEffectTarget)、`stop`(基础 / Basic)、`Transfusion`(目标效果技能 / CAbilEffectTarget)
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
- Catalog 技能链接 / Catalog ability links：`BurrowUltraliskDown`、`BurrowUltraliskUp`、`MorphZerglingToBaneling`(训练技能 / CAbilTrain)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`SupplyLT1`
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
- Catalog 技能链接 / Catalog ability links：`OverseerMorphtoOverseerSiege`
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`Detector11`、`SupplyLT1`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0 | `OverseerMorphtoOverseerSiege` | `OverseerMorphtoOverseerSiege,Execute` | 未解析 / Unresolved | - | - | - |
| 1,0 | `HaveOverlordSpeed` | `-` | 未解析 / Unresolved | - | - | HavePneumatizedCarapace |
| 1,0 | `HaveOverlordSpeed` | `-` | 未解析 / Unresolved | - | - | HavePneumatizedCarapaceStukov |

## 英雄 / Heroes

### 凯瑞甘 / `K5Kerrigan`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMKerrigan.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Hero，生命 / Life 800，护盾 / Shields 200
- Catalog 技能链接 / Catalog ability links：`Apocalypse`(目标效果技能 / CAbilEffectTarget)、`attack`(基础 / Basic)、`K5DropPods`(目标效果技能 / CAbilEffectTarget)、`K5KerriganBurrow`(变形技能 / CAbilMorph)、`K5KerriganPsiStrikeMorph`(变形技能 / CAbilMorph)、`K5Leviathan`(瞬发效果技能 / CAbilEffectInstant)、`KerriganMaelstrom`(瞬发效果技能 / CAbilEffectInstant)、`KerriganVoidCoopCrushingGripWave`(瞬发效果技能 / CAbilEffectInstant)、`KerriganVoidCoopEconDrop`(瞬发效果技能 / CAbilEffectInstant)、`MindBolt`(目标效果技能 / CAbilEffectTarget)、`move`(基础 / Basic)、`PrimalHeal`(瞬发效果技能 / CAbilEffectInstant)、`PrimalSlash`(目标效果技能 / CAbilEffectTarget)、`PsionicLift`(目标效果技能 / CAbilEffectTarget)、`PsiStrikeWalk`(目标效果技能 / CAbilEffectTarget)、`SpawnBanelings`(瞬发效果技能 / CAbilEffectInstant)、`stop`(基础 / Basic)、`WildMutation`(目标效果技能 / CAbilEffectTarget)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`HeroCCImmunity`、`HeroicFortitude`、`KerriganAssimilationLifesteal`、`KerriganUnburrowedDummy`

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

### `K5KerriganBurrowed`

- 来源 / Source：名册 / Roster inferred current Mod hero catalog unit，状态 / Status catalog ObjectType:Hero，模块 / Module XMKerrigan.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMKerrigan.SC2Mod/Base.SC2Data/GameData/UnitData.xml`
- 数值 / Stats：类型 / Type Hero，生命 / Life 800，护盾 / Shields 200
- Catalog 技能链接 / Catalog ability links：`Apocalypse`(目标效果技能 / CAbilEffectTarget)、`K5DropPods`(目标效果技能 / CAbilEffectTarget)、`K5KerriganPsiStrikeMorph`(变形技能 / CAbilMorph)、`K5KerriganUnburrow`(变形技能 / CAbilMorph)、`K5Leviathan`(瞬发效果技能 / CAbilEffectInstant)、`KerriganMaelstrom`(瞬发效果技能 / CAbilEffectInstant)、`KerriganVoidCoopCrushingGripWave`(瞬发效果技能 / CAbilEffectInstant)、`KerriganVoidCoopEconDrop`(瞬发效果技能 / CAbilEffectInstant)、`MindBolt`(目标效果技能 / CAbilEffectTarget)、`PrimalHeal`(瞬发效果技能 / CAbilEffectInstant)、`PrimalSlash`(目标效果技能 / CAbilEffectTarget)、`PsionicLift`(目标效果技能 / CAbilEffectTarget)、`PsiStrikeWalk`(目标效果技能 / CAbilEffectTarget)、`SpawnBanelings`(瞬发效果技能 / CAbilEffectInstant)、`WildMutation`(目标效果技能 / CAbilEffectTarget)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`HeroCCImmunity`、`HeroicFortitude`、`K5KerriganBurrowedDisabler`、`KerriganAssimilationLifesteal`

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
