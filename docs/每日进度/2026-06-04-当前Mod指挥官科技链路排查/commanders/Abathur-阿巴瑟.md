# 阿巴瑟 / `Abathur` 科技链路排查 / Tech Tree Diagnostics

- 描述 / Description：无 / None
- 数据来源 / Data source：当前 Mod / Current Mod，目录 / Directory：`合作指挥官版起义狂潮/Mods/XM/XMAbathur.SC2Mod`
- 当前 Mod 运行名册 / Current Mod roster：module=`XMAbathur.SC2Mod`，instance=`Abathur`
- 统计 / Stats：建筑 12、生产链补充建筑 0、单位 12、英雄 0、建筑按钮 11、单位按钮 38、效果引用 12
- 名称显示 / Name display：能从当前 Mod zhCN 解析时显示“中文名 / `英文ID`”；仅显示 `ID` 表示当前 Mod 未找到可用中文名。

## 初始化/开局单位 / Initial Opener

| 槽位 / Slot | 单位 / Unit | 预期类型 / Expected Kind | Catalog 父级 / Catalog Parent | 是否在运行名册 / In Runtime Roster | 来源 / Source |
| --- | --- | --- | --- | --- | --- |
| 初始基地 / Command Center | `HatcheryAbathur` | building | `Hatchery` | 是 / Yes | Catalog xmabathur，Instance Abathur，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMAbathur.SC2Mod/Base.SC2Data/GameData/UserData.xml`，名册状态 / Roster status exact |
| 初始工人 / Worker | `DroneAbathur` | unit | `Drone` | 否 / No | Catalog xmabathur，Instance Abathur，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMAbathur.SC2Mod/Base.SC2Data/GameData/UserData.xml` |
| 第二初始单位 / Second Unit | `OverlordAbathur` | unit | `Overlord` | 否 / No | Catalog xmabathur，Instance Abathur，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMAbathur.SC2Mod/Base.SC2Data/GameData/UserData.xml` |

## 指挥官默认/顶部技能 / Commander Default / Top-panel Skills

| 技能名 / Skill Name | Ability/Cmd | 类型 / Type | 效果引用 / Effect References | Catalog 来源 / Catalog Sources |
| --- | --- | --- | --- | --- |
| `SpawnToxicNest` | `SpawnToxicNest,Build1` | 建造技能 / CAbilBuild | - | xmabathur:1 |
| `AbathurMend` | `AbathurMend,Execute` | 瞬发效果技能 / CAbilEffectInstant | 区域枚举效果 / CEffectEnumArea:`AbathurMendSearch` | xmabathur:1 |

## 建筑 / Buildings

### `SpineCrawlerAbathur`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMAbathur.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：种族 / Race Zerg
- Catalog 技能链接 / Catalog ability links：无 / None

- 面板技能 / Panel skills：无 / None

### `SporeCrawlerAbathur`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMAbathur.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：种族 / Race Zerg
- Catalog 技能链接 / Catalog ability links：无 / None

- 面板技能 / Panel skills：无 / None

### `HatcheryAbathur`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRuntimeRoster.CommandCenter + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMAbathur.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：种族 / Race Zerg
- Catalog 技能链接 / Catalog ability links：`TrainQueenAbathur`(训练技能 / CAbilTrain)、`UpgradeToLairAbathur`(变形技能 / CAbilMorph)
- 可生产/创建 / Produced or created：`LairAbathur`、`QueenCoopAbathur`，耗时 / Time 50s
- 已隐藏基础按钮 / Hidden basic buttons：1 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,1 | `TrainQueenAbathur` | `TrainQueenAbathur,Train4` | 训练技能 / CAbilTrain | `QueenCoopAbathur`、单位 / Unit:`QueenCoopAbathur` | - | - |
| 0,2 | `UpgradeToLairAbathur` | `UpgradeToLairAbathur,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:`LairAbathur` | - | - |
| 1,3 | `RallyHatchery` | `RallyHatchery,Rally3` | 未解析 / Unresolved | - | - | - |

### `LairAbathur`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMAbathur.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：种族 / Race Zerg
- Catalog 技能链接 / Catalog ability links：`TrainQueenAbathur`(训练技能 / CAbilTrain)、`UpgradeToHiveAbathur`(变形技能 / CAbilMorph)
- 可生产/创建 / Produced or created：`HiveAbathur`、`QueenCoopAbathur`，耗时 / Time 50s
- 已隐藏基础按钮 / Hidden basic buttons：1 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,1 | `TrainQueenAbathur` | `TrainQueenAbathur,Train4` | 训练技能 / CAbilTrain | `QueenCoopAbathur`、单位 / Unit:`QueenCoopAbathur` | - | - |
| 0,2 | `UpgradeToHiveAbathur` | `UpgradeToHiveAbathur,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:`HiveAbathur` | - | - |
| 1,0 | `LairResearch` | `LairResearch,Research7` | 研究技能 / CAbilResearch | 升级 / Upgrade:`OverlordspeedCoop` | - | - |
| 1,3 | `RallyHatchery` | `RallyHatchery,Rally3` | 未解析 / Unresolved | - | - | - |

### `HiveAbathur`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMAbathur.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：种族 / Race Zerg
- Catalog 技能链接 / Catalog ability links：`TrainQueenAbathur`(训练技能 / CAbilTrain)
- 可生产/创建 / Produced or created：`QueenCoopAbathur`，耗时 / Time 50s

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,1 | `TrainQueenAbathur` | `TrainQueenAbathur,Train4` | 训练技能 / CAbilTrain | `QueenCoopAbathur`、单位 / Unit:`QueenCoopAbathur` | - | - |
| 1,0 | `LairResearch` | `LairResearch,Research7` | 研究技能 / CAbilResearch | 升级 / Upgrade:`OverlordspeedCoop` | - | - |
| 1,3 | `RallyHatchery` | `RallyHatchery,Rally3` | 未解析 / Unresolved | - | - | - |

### `ExtractorAbathur`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMAbathur.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：种族 / Race Zerg
- Catalog 技能链接 / Catalog ability links：无 / None

- 面板技能 / Panel skills：无 / None

### `SpawningPoolAbathur`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMAbathur.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：种族 / Race Zerg
- Catalog 技能链接 / Catalog ability links：无 / None

- 面板技能 / Panel skills：无 / None

### `EvolutionChamberAbathur`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMAbathur.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：种族 / Race Zerg
- Catalog 技能链接 / Catalog ability links：无 / None

- 面板技能 / Panel skills：无 / None

### `RoachWarrenAbathur`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMAbathur.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：种族 / Race Zerg
- Catalog 技能链接 / Catalog ability links：无 / None

- 面板技能 / Panel skills：无 / None

### `InfestationPitAbathur`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMAbathur.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：种族 / Race Zerg
- Catalog 技能链接 / Catalog ability links：无 / None

- 面板技能 / Panel skills：无 / None

### `SpireAbathur`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMAbathur.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：种族 / Race Zerg
- Catalog 技能链接 / Catalog ability links：`UpgradeToGreaterSpireAbathur`(变形技能 / CAbilMorph)
- 可生产/创建 / Produced or created：`GreaterSpireAbathur`
- 已隐藏基础按钮 / Hidden basic buttons：2 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0 | `UpgradeToGreaterSpireAbathur` | `UpgradeToGreaterSpireAbathur,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:`GreaterSpireAbathur` | - | - |

### `GreaterSpireAbathur`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMAbathur.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：种族 / Race Zerg
- Catalog 技能链接 / Catalog ability links：无 / None

- 面板技能 / Panel skills：无 / None

## 生产链补充建筑 / Production-support Buildings

- 无 / None

## 单位 / Units

### `AbathurGuardian`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMAbathur.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：无 / None

- 面板技能 / Panel skills：无 / None

### `DevourerAbathur`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，官方ID / Official ID DevourerMP，状态 / Status alias，模块 / Module XMAbathur.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：种族 / Race Zerg
- Catalog 技能链接 / Catalog ability links：无 / None

- 面板技能 / Panel skills：无 / None

### `MutaliskAbathur`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，官方ID / Official ID Mutalisk，状态 / Status alias，模块 / Module XMAbathur.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：种族 / Race Zerg
- Catalog 技能链接 / Catalog ability links：无 / None

- 面板技能 / Panel skills：无 / None

### 蟑螂 / `Roach`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster，状态 / Status state-only，模块 / Module XMAbathur.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`AbathurDeepTunnelImproved`(目标效果技能 / CAbilEffectTarget)、`AbathurRebornDeepTunnelImproved`(目标效果技能 / CAbilEffectTarget)、`attack`(基础 / Basic)、`BurrowUltraliskUp`、`EvolveToBrutaliskRoach`(训练技能 / CAbilTrain)、`MorphRoachToRavager`(训练技能 / CAbilTrain)、`move`(基础 / Basic)、`que1`、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`AbathurPropArmor`、`AbathurRebornPropArmor`、`AllUnitBehaviorController`、`ZagaraOwned`
- 可生产/创建 / Produced or created：破坏者 / `RavagerAbathur`，耗时 / Time 9s
- 已隐藏基础按钮 / Hidden basic buttons：1 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,1 | `GlialReconstitutionPassive` | `-` | 未解析 / Unresolved | - | - | HaveGlialReconstitution |
| 1,2 | `ZerglingBurrowMove` | `-` | 未解析 / Unresolved | - | - | HaveOrganicCarapace |
| 1,3 | `HotSRoachDamage` | `-` | 未解析 / Unresolved | - | - | HaveHotSRoachDamage |
| 1,4 | `HotSRoachShield` | `-` | 未解析 / Unresolved | - | - | HaveHotSRoachShield |
| 2,0 | `MorphRoachToRavager` | `MorphRoachToRavager,Train1` | 训练技能 / CAbilTrain | 破坏者 / `RavagerAbathur`、单位 / Unit:破坏者 / `RavagerAbathur` | - | - |
| 2,1 | `AbathurDeepTunnelImproved` | `AbathurDeepTunnelImproved,Execute` | 目标效果技能 / CAbilEffectTarget | - | 创建单位效果 / CEffectCreateUnit:`AbathurDeepTunnelCU` | - |
| 2,1 | `DeepTunnelLocked` | `-` | 未解析 / Unresolved | - | - | AbathurLevel09DeepTunnelImproved |
| 2,2 | `CommanderPrestigeAbathurBrutaliskLocked` | `-` | 未解析 / Unresolved | - | - | CommanderPrestigeAbathurBiomass |
| 2,2 | `EvolveToBrutaliskRoach` | `EvolveToBrutaliskRoach,Train1` | 训练技能 / CAbilTrain | - | - | - |
| 2,2 | `EvolveToBrutaliskLocked` | `-` | 未解析 / Unresolved | - | - | AbathurLevel02 |
| 2,3 | `BiomassPassive` | `-` | 未解析 / Unresolved | - | - | BiomassBuffVisible |
| 2,3 | `BiomassPassiveEmpty` | `-` | 未解析 / Unresolved | - | - | BiomassBuffEmptyVisible |

### `SwarmHostAbathur`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，官方ID / Official ID SwarmHost，状态 / Status alias，模块 / Module XMAbathur.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：种族 / Race Zerg
- Catalog 技能链接 / Catalog ability links：`MorphToSwarmHostBurrowedAbathur`(变形技能 / CAbilMorph)
- 可生产/创建 / Produced or created：`SwarmHostAbathurBurrowed`（非本指挥官名册 / not in current commander roster）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| - | `MorphToSwarmHostBurrowedAbathur` | `MorphToSwarmHostBurrowedAbathur,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:`SwarmHostAbathurBurrowed` | - | - |

### `QueenCoopAbathur`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，官方ID / Official ID SwarmQueen，状态 / Status alias，模块 / Module XMAbathur.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：种族 / Race Zerg
- Catalog 技能链接 / Catalog ability links：无 / None

- 面板技能 / Panel skills：无 / None

### `RoachCorpser`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster，状态 / Status state-only，模块 / Module XMAbathur.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：生命 / Life 145
- Catalog 技能链接 / Catalog ability links：`MorphRoachToRavager`(训练技能 / CAbilTrain)、`que1`
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`
- 可生产/创建 / Produced or created：破坏者 / `RavagerAbathur`，耗时 / Time 9s
- 已隐藏基础按钮 / Hidden basic buttons：4 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | - | `-` | 未解析 / Unresolved | - | - | HaveOrganicCarapace |
| 2,0 | `MorphRoachToRavager` | `MorphRoachToRavager,Train1` | 训练技能 / CAbilTrain | 破坏者 / `RavagerAbathur`、单位 / Unit:破坏者 / `RavagerAbathur` | - | - |

### `RoachVile`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status state-only，模块 / Module XMAbathur.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，生命 / Life 145
- Catalog 技能链接 / Catalog ability links：`AbathurDeepTunnelImproved`(目标效果技能 / CAbilEffectTarget)、`AbathurRebornDeepTunnelImproved`(目标效果技能 / CAbilEffectTarget)、`EvolveToBrutaliskRoachVile`(训练技能 / CAbilTrain)、`MorphRoachVileToRavager`(训练技能 / CAbilTrain)、`que1`
- 关联 Behavior / Linked behaviors：`AbathurPropArmor`、`AbathurRebornPropArmor`、`AllUnitBehaviorController`
- 可生产/创建 / Produced or created：破坏者 / `RavagerAbathur`，耗时 / Time 9s
- 已隐藏基础按钮 / Hidden basic buttons：1 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `AbathurDeepTunnelImproved` | `AbathurDeepTunnelImproved,Execute` | 目标效果技能 / CAbilEffectTarget | - | 创建单位效果 / CEffectCreateUnit:`AbathurDeepTunnelCU` | - |
| 1,0 | `VilePassive` | `-` | 未解析 / Unresolved | - | - | - |
| 1,1 | `GlialReconstitutionPassive` | `-` | 未解析 / Unresolved | - | - | HaveGlialReconstitution |
| 1,2 | `ZerglingBurrowMove` | `-` | 未解析 / Unresolved | - | - | HaveOrganicCarapace |
| 1,4 | `HotSRoachShield` | `-` | 未解析 / Unresolved | - | - | HaveHotSRoachShield |
| 2,0 | `MorphRoachVileToRavager` | `MorphRoachVileToRavager,Train1` | 训练技能 / CAbilTrain | 破坏者 / `RavagerAbathur`、单位 / Unit:破坏者 / `RavagerAbathur` | - | - |
| 2,1 | `DeepTunnelLocked` | `-` | 未解析 / Unresolved | - | - | AbathurLevel09DeepTunnelImproved |
| 2,2 | `CommanderPrestigeAbathurBrutaliskLocked` | `-` | 未解析 / Unresolved | - | - | CommanderPrestigeAbathurBiomass |
| 2,2 | `EvolveToBrutaliskRoachVile` | `EvolveToBrutaliskRoachVile,Train1` | 训练技能 / CAbilTrain | - | - | - |
| 2,2 | `EvolveToBrutaliskLocked` | `-` | 未解析 / Unresolved | - | - | AbathurLevel02 |
| 2,3 | `BiomassPassiveArmor` | `-` | 未解析 / Unresolved | - | - | BiomassBuffVisible |
| 2,3 | `BiomassPassiveEmpty` | `-` | 未解析 / Unresolved | - | - | BiomassBuffEmptyVisible |

### 破坏者 / `RavagerAbathur`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMAbathur.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race Zerg，生命 / Life 120，费用 / Cost 125/75，补给 / Supply 3
- Catalog 技能链接 / Catalog ability links：`AbathurDeepTunnelImproved`(目标效果技能 / CAbilEffectTarget)、`AbathurRebornDeepTunnelImproved`(目标效果技能 / CAbilEffectTarget)、`attack`(基础 / Basic)、`BurrowRavagerAbathurDown`、`EvolveToBrutaliskRavager`(训练技能 / CAbilTrain)、`move`(基础 / Basic)、`que1`、`RavagerAbathurCorrosiveBile`(目标效果技能 / CAbilEffectTarget)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`AbathurPropArmor`、`AbathurRebornPropArmor`、`AllUnitBehaviorController`
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | `CorrosiveBileRadiusIncrease` | `-` | 未解析 / Unresolved | - | - | HaveCorrosiveBileRadiusIncrease |
| 1,1 | `CorrosiveBileDamageIncrease` | `-` | 未解析 / Unresolved | - | - | HaveCorrosiveBileDamageIncrease |
| 2,0 | `RavagerAbathurCorrosiveBile` | `RavagerAbathurCorrosiveBile,Execute` | 目标效果技能 / CAbilEffectTarget | - | 区域枚举效果 / CEffectEnumArea:`RavagerCorrosiveBileAoeCursorDummy`、效果集合 / CEffectSet:`RavagerCorrosiveBileAoeLaunchSet` | - |
| 2,1 | `AbathurDeepTunnelImproved` | `AbathurDeepTunnelImproved,Execute` | 目标效果技能 / CAbilEffectTarget | - | 创建单位效果 / CEffectCreateUnit:`AbathurDeepTunnelCU` | - |
| 2,1 | `DeepTunnelLocked` | `-` | 未解析 / Unresolved | - | - | AbathurLevel09DeepTunnelImproved |
| 2,2 | `CommanderPrestigeAbathurBrutaliskLocked` | `-` | 未解析 / Unresolved | - | - | CommanderPrestigeAbathurBiomass |
| 2,2 | `EvolveToBrutaliskRavager` | `EvolveToBrutaliskRavager,Train1` | 训练技能 / CAbilTrain | - | - | - |
| 2,2 | `EvolveToBrutaliskLocked` | `-` | 未解析 / Unresolved | - | - | AbathurLevel02 |
| 2,3 | `BiomassPassive` | `-` | 未解析 / Unresolved | - | - | BiomassBuffVisible |
| 2,3 | `BiomassPassiveEmpty` | `-` | 未解析 / Unresolved | - | - | BiomassBuffEmptyVisible |
| 2,4 | `BurrowRavagerAbathurDown` | `BurrowRavagerAbathurDown,Execute` | 未解析 / Unresolved | - | - | - |

### `ViperAbathur`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，官方ID / Official ID Viper，状态 / Status alias，模块 / Module XMAbathur.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：种族 / Race Zerg
- Catalog 技能链接 / Catalog ability links：无 / None

- 面板技能 / Panel skills：无 / None

### `BrutaliskAbathur`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，官方ID / Official ID Brutalisk，状态 / Status alias，模块 / Module XMAbathur.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：种族 / Race Zerg
- Catalog 技能链接 / Catalog ability links：无 / None

- 面板技能 / Panel skills：无 / None

### `LeviathanAbathur`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，官方ID / Official ID Leviathan，状态 / Status alias，模块 / Module XMAbathur.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：种族 / Race Zerg
- Catalog 技能链接 / Catalog ability links：无 / None

- 面板技能 / Panel skills：无 / None

## 英雄 / Heroes

- 无 / None
