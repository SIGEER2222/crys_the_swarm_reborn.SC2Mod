# 凯瑞甘 / `Kerrigan` 科技链路排查 / Tech Tree Diagnostics

- 描述 / Description：无 / None
- 数据来源 / Data source：当前 Mod / Current Mod，目录 / Directory：`合作指挥官版起义狂潮/Mods/XM/XMKerrigan.SC2Mod`
- 当前 Mod 运行名册 / Current Mod roster：module=`XMKerrigan.SC2Mod`，instance=`Kerrigan`
- 统计 / Stats：建筑 7、生产链补充建筑 0、单位 8、英雄 2、建筑按钮 13、单位按钮 4、效果引用 8
- 名称显示 / Name display：能从当前 Mod zhCN 解析时显示“中文名 / `英文ID`”；仅显示 `ID` 表示当前 Mod 未找到可用中文名。

## 初始化/开局单位 / Initial Opener

| 槽位 / Slot | 单位 / Unit | 预期类型 / Expected Kind | Catalog 父级 / Catalog Parent | 是否在运行名册 / In Runtime Roster | 来源 / Source |
| --- | --- | --- | --- | --- | --- |
| 初始基地 / Command Center | `HatcheryKerrigan` | building | `Hatchery` | 是 / Yes | Catalog xmkerrigan，Instance Kerrigan，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMKerrigan.SC2Mod/Base.SC2Data/GameData/UserData.xml`，名册状态 / Roster status exact |
| 初始工人 / Worker | `DroneKerrigan` | unit | - | 否 / No | Catalog xmkerrigan，Instance Kerrigan，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMKerrigan.SC2Mod/Base.SC2Data/GameData/UserData.xml` |
| 第二初始单位 / Second Unit | `OverlordKerrigan` | unit | `Overlord` | 否 / No | Catalog xmkerrigan，Instance Kerrigan，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMKerrigan.SC2Mod/Base.SC2Data/GameData/UserData.xml` |

## 指挥官默认/顶部技能 / Commander Default / Top-panel Skills

| 技能名 / Skill Name | Ability/Cmd | 类型 / Type | 效果引用 / Effect References | Catalog 来源 / Catalog Sources |
| --- | --- | --- | --- | --- |
| `evolutionchamberresearch` | `evolutionchamberresearch,19` | 研究技能 / CAbilResearch | - | xmkerrigan:1 |
| `evolutionchamberresearch` | `evolutionchamberresearch` | 研究技能 / CAbilResearch | - | xmkerrigan:1 |
| `evolutionchamberresearch` | `evolutionchamberresearch,1` | 研究技能 / CAbilResearch | - | xmkerrigan:1 |
| `evolutionchamberresearch` | `evolutionchamberresearch,2` | 研究技能 / CAbilResearch | - | xmkerrigan:1 |

## 建筑 / Buildings

### `NydusNetworkKerrigan`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMKerrigan.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`BuildNydusCanalKerrigan`(建造技能 / CAbilBuild)
- 可生产/创建 / Produced or created：`NydusCanalKerrigan`（非本指挥官名册 / not in current commander roster），耗时 / Time 20s

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | `BuildNydusCanalKerrigan` | `BuildNydusCanalKerrigan,Build1` | 建造技能 / CAbilBuild | `NydusCanalKerrigan`、单位 / Unit:`NydusCanalKerrigan` | - | - |
| 1,1 | `BuildNydusCanalKerrigan` | `BuildNydusCanalKerrigan,Build2` | 建造技能 / CAbilBuild | `NydusCanalKerrigan`、单位 / Unit:`NydusCanalKerrigan` | - | - |
| 1,2 | `BuildNydusCanalKerrigan` | `BuildNydusCanalKerrigan,Build3` | 建造技能 / CAbilBuild | `NydusCanalKerrigan`、单位 / Unit:`NydusCanalKerrigan` | - | - |
| 2,0 | `BuildNydusCanalKerrigan` | `BuildNydusCanalKerrigan,Build1` | 建造技能 / CAbilBuild | `NydusCanalKerrigan`、单位 / Unit:`NydusCanalKerrigan` | - | - |

### `SpineCrawlerKerrigan`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMKerrigan.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`SpineCrawlerUprootKerrigan`(变形技能 / CAbilMorph)
- 可生产/创建 / Produced or created：`SpineCrawlerUprootedKerrigan`（非本指挥官名册 / not in current commander roster）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | `SpineCrawlerUprootKerrigan` | `SpineCrawlerUprootKerrigan,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:`SpineCrawlerUprootedKerrigan` | - | - |

### `SporeCrawlerKerrigan`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMKerrigan.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`SporeCrawlerUprootKerrigan`(变形技能 / CAbilMorph)
- 可生产/创建 / Produced or created：`SporeCrawlerUprootedKerrigan`（非本指挥官名册 / not in current commander roster）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | `SporeCrawlerUprootKerrigan` | `SporeCrawlerUprootKerrigan,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:`SporeCrawlerUprootedKerrigan` | - | - |

### `HatcheryKerrigan`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMKerrigan.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`TrainQueenKerrigan`(训练技能 / CAbilTrain)、`UpgradeToLairKerrigan`(变形技能 / CAbilMorph)
- 关联 Behavior / Linked behaviors：`SpawnLarvaKerrigan`
- 可生产/创建 / Produced or created：`LairKerrigan`、`QueenCoopKerrigan`，耗时 / Time 50s

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,1 | `TrainQueenKerrigan` | `TrainQueenKerrigan,Train4` | 训练技能 / CAbilTrain | `QueenCoopKerrigan`、单位 / Unit:`QueenCoopKerrigan` | - | - |
| 2,0 | `UpgradeToLairKerrigan` | `UpgradeToLairKerrigan,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:`LairKerrigan` | - | - |
| 2,4 | `UpgradeToLairKerrigan` | `UpgradeToLairKerrigan,Cancel` | 变形技能 / CAbilMorph | 单位 / Unit:`LairKerrigan` | - | - |

### `LairKerrigan`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMKerrigan.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`TrainQueenKerrigan`(训练技能 / CAbilTrain)、`UpgradeToHiveKerrigan`(变形技能 / CAbilMorph)
- 关联 Behavior / Linked behaviors：`SpawnLarvaKerrigan`
- 可生产/创建 / Produced or created：`HiveKerrigan`、`QueenCoopKerrigan`，耗时 / Time 50s

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,1 | `TrainQueenKerrigan` | `TrainQueenKerrigan,Train4` | 训练技能 / CAbilTrain | `QueenCoopKerrigan`、单位 / Unit:`QueenCoopKerrigan` | - | - |
| 2,0 | `UpgradeToHiveKerrigan` | `UpgradeToHiveKerrigan,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:`HiveKerrigan` | - | - |
| 2,4 | `UpgradeToHiveKerrigan` | `UpgradeToHiveKerrigan,Cancel` | 变形技能 / CAbilMorph | 单位 / Unit:`HiveKerrigan` | - | - |

### `HiveKerrigan`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMKerrigan.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`TrainQueenKerrigan`(训练技能 / CAbilTrain)
- 关联 Behavior / Linked behaviors：`SpawnLarvaKerrigan`
- 可生产/创建 / Produced or created：`QueenCoopKerrigan`，耗时 / Time 50s

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,1 | `TrainQueenKerrigan` | `TrainQueenKerrigan,Train4` | 训练技能 / CAbilTrain | `QueenCoopKerrigan`、单位 / Unit:`QueenCoopKerrigan` | - | - |

### `GreaterNydusWormKerrigan`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMKerrigan.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：无 / None

- 面板技能 / Panel skills：无 / None

## 生产链补充建筑 / Production-support Buildings

- 无 / None

## 单位 / Units

### `BroodLordKerrigan`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，官方ID / Official ID BroodLord，状态 / Status alias，模块 / Module XMKerrigan.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：种族 / Race Zerg
- Catalog 技能链接 / Catalog ability links：无 / None

- 面板技能 / Panel skills：无 / None

### `HydraliskKerrigan`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，官方ID / Official ID Hydralisk，状态 / Status alias，模块 / Module XMKerrigan.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：种族 / Race Zerg
- Catalog 技能链接 / Catalog ability links：`MorphHydraliskToLurkerKerrigan`(训练技能 / CAbilTrain)
- 可生产/创建 / Produced or created：`HydraliskLurkerKerrigan`，耗时 / Time 15s

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | `MorphHydraliskToLurkerKerrigan` | `MorphHydraliskToLurkerKerrigan,Train1` | 训练技能 / CAbilTrain | `HydraliskLurkerKerrigan`、单位 / Unit:`HydraliskLurkerKerrigan` | - | HaveLurkerDen |

### `MutaliskKerrigan`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，官方ID / Official ID MutaliskBroodlord，状态 / Status alias，模块 / Module XMKerrigan.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：种族 / Race Zerg
- Catalog 技能链接 / Catalog ability links：`MutaliskMorphToBroodLordKerrigan`(训练技能 / CAbilTrain)
- 可生产/创建 / Produced or created：`BroodLordKerrigan`，耗时 / Time 15s

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | `MutaliskMorphToBroodLordKerrigan` | `MutaliskMorphToBroodLordKerrigan,Train1` | 训练技能 / CAbilTrain | `BroodLordKerrigan`、单位 / Unit:`BroodLordKerrigan` | - | - |

### `QueenCoopKerrigan`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，官方ID / Official ID SwarmQueen，状态 / Status alias，模块 / Module XMKerrigan.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：种族 / Race Zerg
- Catalog 技能链接 / Catalog ability links：无 / None

- 面板技能 / Panel skills：无 / None

### `UltraliskKerrigan`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，官方ID / Official ID Ultralisk，状态 / Status alias，模块 / Module XMKerrigan.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：种族 / Race Zerg
- Catalog 技能链接 / Catalog ability links：无 / None

- 面板技能 / Panel skills：无 / None

### `ZerglingKerrigan`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，官方ID / Official ID Zergling，状态 / Status alias，模块 / Module XMKerrigan.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：种族 / Race Zerg
- Catalog 技能链接 / Catalog ability links：无 / None

- 面板技能 / Panel skills：无 / None

### `HydraliskLurkerKerrigan`

- 来源 / Source：名册 / Roster XMFinal CommanderRosters.galaxy，官方ID / Official ID LurkerMP，状态 / Status alias，模块 / Module XMKerrigan.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146_CommanderRosters.galaxy`
- 数值 / Stats：种族 / Race Zerg
- Catalog 技能链接 / Catalog ability links：`BurrowHydraliskLurkerDownKerrigan`(变形技能 / CAbilMorph)
- 可生产/创建 / Produced or created：`HydraliskLurkerBurrowedKerrigan`（非本指挥官名册 / not in current commander roster）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,4 | `BurrowHydraliskLurkerDownKerrigan` | `BurrowHydraliskLurkerDownKerrigan,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:`HydraliskLurkerBurrowedKerrigan` | - | - |

### `OverseerKerrigan`

- 来源 / Source：名册 / Roster XMFinal CommanderRosters.galaxy，状态 / Status galaxy，模块 / Module XMKerrigan.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146_CommanderRosters.galaxy`
- 数值 / Stats：种族 / Race Zerg
- Catalog 技能链接 / Catalog ability links：`OverseerMorphtoOverseerSiegeKerrigan`(变形技能 / CAbilMorph)
- 可生产/创建 / Produced or created：`OverseerSiegeModeKerrigan`（非本指挥官名册 / not in current commander roster）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | `OverseerMorphtoOverseerSiegeKerrigan` | `OverseerMorphtoOverseerSiegeKerrigan,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:`OverseerSiegeModeKerrigan` | - | - |

## 英雄 / Heroes

### 凯瑞甘 / `K5Kerrigan`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMKerrigan.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Hero，生命 / Life 800，护盾 / Shields 200
- Catalog 技能链接 / Catalog ability links：`Apocalypse`(目标效果技能 / CAbilEffectTarget)、`attack`(基础 / Basic)、`K5DropPods`(目标效果技能 / CAbilEffectTarget)、`K5KerriganBurrow`(变形技能 / CAbilMorph)、`K5KerriganPsiStrikeMorph`(变形技能 / CAbilMorph)、`K5Leviathan`(瞬发效果技能 / CAbilEffectInstant)、`KerriganMaelstrom`(瞬发效果技能 / CAbilEffectInstant)、`KerriganVoidCoopCrushingGripWave`(瞬发效果技能 / CAbilEffectInstant)、`KerriganVoidCoopEconDrop`(瞬发效果技能 / CAbilEffectInstant)、`MindBolt`(目标效果技能 / CAbilEffectTarget)、`move`(基础 / Basic)、`PrimalHeal`(瞬发效果技能 / CAbilEffectInstant)、`PrimalSlash`(目标效果技能 / CAbilEffectTarget)、`PsionicLift`(目标效果技能 / CAbilEffectTarget)、`PsiStrikeWalk`(目标效果技能 / CAbilEffectTarget)、`SpawnBanelings`(瞬发效果技能 / CAbilEffectInstant)、`stop`(基础 / Basic)、`WildMutation`(目标效果技能 / CAbilEffectTarget)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`HeroCCImmunity`、`HeroicFortitude`、`KerriganAssimilationLifesteal`、`KerriganUnburrowedDummy`
- 可生产/创建 / Produced or created：`K5KerriganBurrowed`

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
| 2,4 | `K5KerriganBurrow` | `K5KerriganBurrow,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:`K5KerriganBurrowed` | - | - |

### `K5KerriganBurrowed`

- 来源 / Source：名册 / Roster inferred current Mod hero catalog unit，状态 / Status catalog ObjectType:Hero，模块 / Module XMKerrigan.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMKerrigan.SC2Mod/Base.SC2Data/GameData/UnitData.xml`
- 数值 / Stats：类型 / Type Hero，生命 / Life 800，护盾 / Shields 200
- Catalog 技能链接 / Catalog ability links：`Apocalypse`(目标效果技能 / CAbilEffectTarget)、`K5DropPods`(目标效果技能 / CAbilEffectTarget)、`K5KerriganPsiStrikeMorph`(变形技能 / CAbilMorph)、`K5KerriganUnburrow`(变形技能 / CAbilMorph)、`K5Leviathan`(瞬发效果技能 / CAbilEffectInstant)、`KerriganMaelstrom`(瞬发效果技能 / CAbilEffectInstant)、`KerriganVoidCoopCrushingGripWave`(瞬发效果技能 / CAbilEffectInstant)、`KerriganVoidCoopEconDrop`(瞬发效果技能 / CAbilEffectInstant)、`MindBolt`(目标效果技能 / CAbilEffectTarget)、`PrimalHeal`(瞬发效果技能 / CAbilEffectInstant)、`PrimalSlash`(目标效果技能 / CAbilEffectTarget)、`PsionicLift`(目标效果技能 / CAbilEffectTarget)、`PsiStrikeWalk`(目标效果技能 / CAbilEffectTarget)、`SpawnBanelings`(瞬发效果技能 / CAbilEffectInstant)、`WildMutation`(目标效果技能 / CAbilEffectTarget)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`HeroCCImmunity`、`HeroicFortitude`、`K5KerriganBurrowedDisabler`、`KerriganAssimilationLifesteal`
- 可生产/创建 / Produced or created：凯瑞甘 / `K5Kerrigan`

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
| 2,4 | `K5KerriganUnburrow` | `K5KerriganUnburrow,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:凯瑞甘 / `K5Kerrigan` | - | - |
