# 扎加拉 / `Zagara` 科技链路排查 / Tech Tree Diagnostics

- 描述 / Description：无 / None
- 数据来源 / Data source：当前 Mod / Current Mod，目录 / Directory：`合作指挥官版起义狂潮/Mods/XM/XMZagara.SC2Mod`
- 当前 Mod 运行名册 / Current Mod roster：module=`XMZagara.SC2Mod`，instance=`Zagara`
- 统计 / Stats：建筑 6、生产链补充建筑 0、单位 7、英雄 1、建筑按钮 17、单位按钮 4、效果引用 7
- 名称显示 / Name display：能从当前 Mod zhCN 解析时显示“中文名 / `英文ID`”；仅显示 `ID` 表示当前 Mod 未找到可用中文名。

## 初始化/开局单位 / Initial Opener

| 槽位 / Slot | 单位 / Unit | 预期类型 / Expected Kind | Catalog 父级 / Catalog Parent | 是否在运行名册 / In Runtime Roster | 来源 / Source |
| --- | --- | --- | --- | --- | --- |
| 初始基地 / Command Center | `HatcheryZagara` | building | `Hatchery` | 是 / Yes | Catalog xmzagara，Instance Zagara，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMZagara.SC2Mod/Base.SC2Data/GameData/UserData.xml`，名册状态 / Roster status exact |
| 初始工人 / Worker | `DroneZagara` | unit | `Drone` | 否 / No | Catalog xmzagara，Instance Zagara，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMZagara.SC2Mod/Base.SC2Data/GameData/UserData.xml` |
| 第二初始单位 / Second Unit | `OverlordZagara` | unit | `Overlord` | 否 / No | Catalog xmzagara，Instance Zagara，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMZagara.SC2Mod/Base.SC2Data/GameData/UserData.xml` |

## 指挥官默认/顶部技能 / Commander Default / Top-panel Skills

| 技能名 / Skill Name | Ability/Cmd | 类型 / Type | 效果引用 / Effect References | Catalog 来源 / Catalog Sources |
| --- | --- | --- | --- | --- |
| `ZagaraVoidCoopBanelingBarrage` | `ZagaraVoidCoopBanelingBarrage` | 目标效果技能 / CAbilEffectTarget | - | xmzagara:1 |
| 群体狂暴 / `ZagaraVoidCoopMassFrenzy` | `ZagaraVoidCoopMassFrenzy` | 瞬发效果技能 / CAbilEffectInstant | CEffectSwitch / CEffectSwitch:`ZagaraVoidCoopMassFrenzySwitch` | xmzagara:1 |
| `ZagaraVoidCoopSpawnHunterKillers` | `ZagaraVoidCoopSpawnHunterKillers` | 目标效果技能 / CAbilEffectTarget | - | xmzagara:1 |
| `ZergBuild` | `ZergBuild,24` | 建造技能 / CAbilBuild | - | xmzagara:1 |
| `evolutionchamberresearch` | `evolutionchamberresearch,19` | 研究技能 / CAbilResearch | - | xmzagara:1 |
| `evolutionchamberresearch` | `evolutionchamberresearch,12` | 研究技能 / CAbilResearch | - | xmzagara:1 |
| `evolutionchamberresearch` | `evolutionchamberresearch,13` | 研究技能 / CAbilResearch | - | xmzagara:1 |
| `evolutionchamberresearch` | `evolutionchamberresearch,14` | 研究技能 / CAbilResearch | - | xmzagara:1 |

## 建筑 / Buildings

### `SpineCrawlerZagara`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMZagara.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：种族 / Race Zerg
- Catalog 技能链接 / Catalog ability links：无 / None

- 面板技能 / Panel skills：无 / None

### `SporeCrawlerZagara`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMZagara.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：种族 / Race Zerg
- Catalog 技能链接 / Catalog ability links：无 / None

- 面板技能 / Panel skills：无 / None

### `HatcheryZagara`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMZagara.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：种族 / Race Zerg
- Catalog 技能链接 / Catalog ability links：`TrainQueenZagara`(训练技能 / CAbilTrain)、`UpgradeToLairZagara`(变形技能 / CAbilMorph)
- 关联 Behavior / Linked behaviors：`ChronoBoostTarget`、`HatcheryDoubleQueue`、`HatcheryLarvaDeath`
- 可生产/创建 / Produced or created：`QueenZagara`（非本指挥官名册 / not in current commander roster）、`SwarmQueenZagara`，耗时 / Time 50s
- 已隐藏基础按钮 / Hidden basic buttons：1 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,1 | `TrainQueenZagara` | `TrainQueenZagara,Train1` | 训练技能 / CAbilTrain | `QueenZagara`、单位 / Unit:`QueenZagara` | - | - |
| 0,2 | `TrainQueenZagara` | `TrainQueenZagara,Train4` | 训练技能 / CAbilTrain | `SwarmQueenZagara`、单位 / Unit:`SwarmQueenZagara` | - | - |
| 1,0 | `LairResearch` | `LairResearch,Research7` | 研究技能 / CAbilResearch | 升级 / Upgrade:`OverlordspeedCoop` | - | - |
| 1,3 | `RallyHatchery` | `RallyHatchery,Rally3` | 未解析 / Unresolved | - | - | - |
| 2,0 | `UpgradeToLairZagara` | `UpgradeToLairZagara,Execute` | 变形技能 / CAbilMorph | - | - | - |

### `LairZagara`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMZagara.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：种族 / Race Zerg
- Catalog 技能链接 / Catalog ability links：`TrainQueenZagara`(训练技能 / CAbilTrain)、`UpgradeToHiveZagara`(变形技能 / CAbilMorph)
- 关联 Behavior / Linked behaviors：`ChronoBoostTarget`、`HatcheryDoubleQueue`、`HatcheryLarvaDeath`
- 可生产/创建 / Produced or created：`QueenZagara`（非本指挥官名册 / not in current commander roster）、`SwarmQueenZagara`，耗时 / Time 50s
- 已隐藏基础按钮 / Hidden basic buttons：1 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,1 | `TrainQueenZagara` | `TrainQueenZagara,Train1` | 训练技能 / CAbilTrain | `QueenZagara`、单位 / Unit:`QueenZagara` | - | - |
| 0,2 | `TrainQueenZagara` | `TrainQueenZagara,Train4` | 训练技能 / CAbilTrain | `SwarmQueenZagara`、单位 / Unit:`SwarmQueenZagara` | - | - |
| 1,0 | `LairResearch` | `LairResearch,Research7` | 研究技能 / CAbilResearch | 升级 / Upgrade:`OverlordspeedCoop` | - | - |
| 1,3 | `RallyHatchery` | `RallyHatchery,Rally3` | 未解析 / Unresolved | - | - | - |
| 2,0 | `UpgradeToHiveZagara` | `UpgradeToHiveZagara,Execute` | 变形技能 / CAbilMorph | - | - | - |

### `HiveZagara`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMZagara.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：种族 / Race Zerg
- Catalog 技能链接 / Catalog ability links：`TrainQueenZagara`(训练技能 / CAbilTrain)
- 关联 Behavior / Linked behaviors：`ChronoBoostTarget`、`HatcheryDoubleQueue`、`HatcheryLarvaDeath`
- 可生产/创建 / Produced or created：`QueenZagara`（非本指挥官名册 / not in current commander roster）、`SwarmQueenZagara`，耗时 / Time 50s
- 已隐藏基础按钮 / Hidden basic buttons：1 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,1 | `TrainQueenZagara` | `TrainQueenZagara,Train1` | 训练技能 / CAbilTrain | `QueenZagara`、单位 / Unit:`QueenZagara` | - | - |
| 0,2 | `TrainQueenZagara` | `TrainQueenZagara,Train4` | 训练技能 / CAbilTrain | `SwarmQueenZagara`、单位 / Unit:`SwarmQueenZagara` | - | - |
| 1,0 | `LairResearch` | `LairResearch,Research7` | 研究技能 / CAbilResearch | 升级 / Upgrade:`OverlordspeedCoop` | - | - |
| 1,3 | `RallyHatchery` | `RallyHatchery,Rally3` | 未解析 / Unresolved | - | - | - |

### `BileLauncherZagara`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMZagara.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Structure，种族 / Race Zerg，生命 / Life 400，费用 / Cost 125/100
- Catalog 技能链接 / Catalog ability links：攻击 / `BileLauncherZagaraAttack`、`BuildInProgress`(基础 / Basic)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`OnCreep`、`UnderConstruction`、`ZergBuildingNotOnCreep`
- 已隐藏基础按钮 / Hidden basic buttons：2 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | 攻击 / `BileLauncherZagaraAttack` | `BileLauncherZagaraAttack,Barrage` | 未解析 / Unresolved | - | - | - |
| 2,1 | `ArtilleryDuctsPassive` | `-` | 未解析 / Unresolved | - | - | HaveArtilleryDucts |
| 2,2 | `RapidBombardmentPassive` | `-` | 未解析 / Unresolved | - | - | HaveRapidBombardment |

## 生产链补充建筑 / Production-support Buildings

- 无 / None

## 单位 / Units

### `InfestedAbominationZagara`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，官方ID / Official ID InfestedAbomination，状态 / Status alias，模块 / Module XMZagara.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：种族 / Race Zerg
- Catalog 技能链接 / Catalog ability links：无 / None

- 面板技能 / Panel skills：无 / None

### `BanelingZagara`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，官方ID / Official ID Baneling，状态 / Status alias，模块 / Module XMZagara.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：种族 / Race Zerg
- Catalog 技能链接 / Catalog ability links：无 / None

- 面板技能 / Panel skills：无 / None

### `ZagaraCorruptor`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，官方ID / Official ID Corruptor，状态 / Status alias，模块 / Module XMZagara.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race Zerg，生命 / Life 200，费用 / Cost 150/100，补给 / Supply 2
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`Corruption`(目标效果技能 / CAbilEffectTarget)、`move`(基础 / Basic)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`CorruptorScourgeIncubation`
- 已隐藏基础按钮 / Hidden basic buttons：6 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | `Corruption` | `Corruption,Execute` | 目标效果技能 / CAbilEffectTarget | - | - | - |
| 2,2 | `CorruptorScourgeIncubationLocked` | `-` | 未解析 / Unresolved | - | - | ZagaraLevel08 |
| 2,2 | 培育爆蚊 / `ZagaraVoidCoopIncubateSourges` | `-` | 未解析 / Unresolved | - | - | HaveZagaraVoidCoopAberrationBanelingIncubation |

### `ScourgeZagara`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，官方ID / Official ID Scourge，状态 / Status alias，模块 / Module XMZagara.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：种族 / Race Zerg
- Catalog 技能链接 / Catalog ability links：无 / None

- 面板技能 / Panel skills：无 / None

### `SwarmQueenZagara`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，官方ID / Official ID SwarmQueen，状态 / Status alias，模块 / Module XMZagara.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：种族 / Race Zerg
- Catalog 技能链接 / Catalog ability links：无 / None

- 面板技能 / Panel skills：无 / None

### `ZerglingZagara`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，官方ID / Official ID Zergling，状态 / Status alias，模块 / Module XMZagara.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：种族 / Race Zerg
- Catalog 技能链接 / Catalog ability links：无 / None

- 面板技能 / Panel skills：无 / None

### `OverseerZagara`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，官方ID / Official ID Overseer，状态 / Status alias，模块 / Module XMZagara.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：种族 / Race Zerg
- Catalog 技能链接 / Catalog ability links：`OverseerMorphtoOverseerSiegeZagara`(变形技能 / CAbilMorph)
- 可生产/创建 / Produced or created：`OverseerSiegeModeZagara`（非本指挥官名册 / not in current commander roster）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | `OverseerMorphtoOverseerSiegeZagara` | `OverseerMorphtoOverseerSiegeZagara,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:`OverseerSiegeModeZagara` | - | - |

## 英雄 / Heroes

### `ZagaraVoidCoop`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMZagara.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Hero，种族 / Race Zerg，生命 / Life 600，能量 / Energy 200
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、深槽虫道 / `CommanderPrestigeZagaraZagaraDeepTunnel`(目标效果技能 / CAbilEffectTarget)、`move`(基础 / Basic)、`stop`(基础 / Basic)、`ZagaraVoidCoopBanelingBarrage`(目标效果技能 / CAbilEffectTarget)、`ZagaraVoidCoopBurrow`(变形技能 / CAbilMorph)、`ZagaraVoidCoopCreepMaster`(建造技能 / CAbilBuild)、`ZagaraVoidCoopDeepTunnel`(目标效果技能 / CAbilEffectTarget)、`ZagaraVoidCoopDevouringMaw`(目标效果技能 / CAbilEffectTarget)、Zagara Void Coop Mass Frenzy / `ZagaraVoidCoopMassFrenzy`(瞬发效果技能 / CAbilEffectInstant)、扎加拉虚空合作模式感染空投 / `ZagaraVoidCoopMassRoachDrop`(目标效果技能 / CAbilEffectTarget)、召唤坑道虫 / `ZagaraVoidCoopNydusWorm`(建造技能 / CAbilBuild)、`ZagaraVoidCoopSpawnBroodlings`(目标效果技能 / CAbilEffectTarget)、`ZagaraVoidCoopSpawnHunterKillers`(目标效果技能 / CAbilEffectTarget)、`ZagaraVoidCoopSpawnMutalisk`(目标效果技能 / CAbilEffectTarget)、`ZagaraVoidCoopTransfusionWave`(瞬发效果技能 / CAbilEffectInstant)、`ZagaraVoidCoopWildInfestation`(目标效果技能 / CAbilEffectTarget)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`HeroCCImmunity`、`HeroicFortitude`、`KerriganUnburrowedDummy`、`KerriganVeterancyDummy`、`ZagaraVoidCoopCreepMasterRegen`
- 可生产/创建 / Produced or created：`ZagaraVoidCoopBurrowed`（非本指挥官名册 / not in current commander roster）
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | `ZagaraVoidCoopRelentlessSwarmer` | `-` | 未解析 / Unresolved | - | - | - |
| 1,1 | `VolatileNestLocked` | `-` | 未解析 / Unresolved | - | - | ZagaraLevel07 |
| 1,1 | `ZagaraVoidCoopBanelingSpawner` | `-` | 未解析 / Unresolved | - | - | HaveZagaraVoidCoopBanelingSpawner |
| 1,2 | `MedusasBladesLocked` | `-` | 未解析 / Unresolved | - | - | ZagaraLevel09 |
| 1,2 | `ZagaraVoidCoopAttackUpgrade` | `-` | 未解析 / Unresolved | - | - | HaveZagaraVoidCoopAttackUpgrade |
| 1,4 | 深槽虫道 / `CommanderPrestigeZagaraZagaraDeepTunnel` | `CommanderPrestigeZagaraZagaraDeepTunnel,Execute` | 目标效果技能 / CAbilEffectTarget | - | 创建单位效果 / CEffectCreateUnit:`AbathurDeepTunnelCU` | - |
| 2,0 | `ZagaraVoidCoopBanelingBarrage` | `ZagaraVoidCoopBanelingBarrage,Execute` | 目标效果技能 / CAbilEffectTarget | - | - | - |
| 2,1 | `ZagaraVoidCoopSpawnHunterKillers` | `ZagaraVoidCoopSpawnHunterKillers,Execute` | 目标效果技能 / CAbilEffectTarget | - | - | - |
| 2,2 | 群体狂暴 / `ZagaraVoidCoopMassFrenzy` | `ZagaraVoidCoopMassFrenzy,Execute` | 瞬发效果技能 / CAbilEffectInstant | - | CEffectSwitch / CEffectSwitch:`ZagaraVoidCoopMassFrenzySwitch` | - |
| 2,3 | 扎加拉虚空合作模式感染空投 / `ZagaraVoidCoopMassRoachDrop` | `ZagaraVoidCoopMassRoachDrop,Execute` | 目标效果技能 / CAbilEffectTarget | - | 持续效果 / CEffectCreatePersistent:`ZagaraVoidCoopMassRoachDropCP`、区域枚举效果 / CEffectEnumArea:`ZagaraVoidCoopMassRoachlingDropSearch` | - |
| 2,3 | 感染空投 / `ZagaraVoidCoopMassRoachDropLocked` | `-` | 未解析 / Unresolved | - | - | ZagaraLevel02 |
| 2,4 | `ZagaraVoidCoopBurrow` | `ZagaraVoidCoopBurrow,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:`ZagaraVoidCoopBurrowed` | - | - |
