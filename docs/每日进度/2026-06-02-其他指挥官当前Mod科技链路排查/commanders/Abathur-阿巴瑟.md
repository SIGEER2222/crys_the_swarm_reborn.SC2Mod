# 阿巴瑟 / `Abathur` 科技链路排查 / Tech Tree Diagnostics

- 描述 / Description：无 / None
- 数据来源 / Data source：当前 Mod / Current Mod，目录 / Directory：`合作指挥官版起义狂潮/Mods/XM/XMAbathur.SC2Mod`
- 当前 Mod 运行名册 / Current Mod roster：module=`XMAbathur.SC2Mod`，instance=`Abathur`
- 统计 / Stats：建筑 12、生产链补充建筑 0、单位 11、英雄 1、建筑按钮 112、单位按钮 83、效果引用 25
- 名称显示 / Name display：能从当前 Mod zhCN 解析时显示“中文名 / `英文ID`”；仅显示 `ID` 表示当前 Mod 未找到可用中文名。

## 指挥官默认/顶部技能 / Commander Default / Top-panel Skills

| 技能名 / Skill Name | Ability/Cmd | 类型 / Type | 效果引用 / Effect References | Catalog 来源 / Catalog Sources |
| --- | --- | --- | --- | --- |
| `SpawnToxicNest` | `SpawnToxicNest,Build1` | 建造技能 / CAbilBuild | - | xmabathur:1 |
| `AbathurMend` | `AbathurMend,Execute` | 瞬发效果技能 / CAbilEffectInstant | 区域枚举效果 / CEffectEnumArea:`AbathurMendSearch` | xmabathur:1 |

## 建筑 / Buildings

### 脊针爬虫 / `SpineCrawler`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMAbathur.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`BroodlingInfestation`(瞬发效果技能 / CAbilEffectInstant)、`BuildInProgress`(基础 / Basic)、`CloudofFlies`(瞬发效果技能 / CAbilEffectInstant)、`RagingTentacle`(瞬发效果技能 / CAbilEffectInstant)、`Range`(瞬发效果技能 / CAbilEffectInstant)、`SpineCrawlerUproot`(变形技能 / CAbilMorph)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`CrawlerCombatRegen`、`CrawlerSafetyRegen`、`EnableCrawlerWeapon`

- 面板技能 / Panel skills：无 / None

### 孢子爬虫 / `SporeCrawler`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMAbathur.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`AcidMortar`(瞬发效果技能 / CAbilEffectInstant)、`attack`(基础 / Basic)、`BroodlingInfestation`(瞬发效果技能 / CAbilEffectInstant)、`BuildInProgress`(基础 / Basic)、`CloudofFlies`(瞬发效果技能 / CAbilEffectInstant)、`Range`(瞬发效果技能 / CAbilEffectInstant)、`SporeCrawlerUproot`(变形技能 / CAbilMorph)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`CrawlerCombatRegen`、`CrawlerSafetyRegen`、`Detector11`

- 面板技能 / Panel skills：无 / None

### `HatcheryAbathur`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster.CommandCenter + XMFinal CommanderBuildings.galaxy，状态 / Status command-center，模块 / Module XMAbathur.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：种族 / Race Zerg
- Catalog 技能链接 / Catalog ability links：无 / None

- 面板技能 / Panel skills：无 / None

### `Lair`

- 来源 / Source：名册 / Roster XMFinal CommanderBuildings.galaxy，状态 / Status galaxy，模块 / Module XMAbathur.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146_CommanderBuildings.galaxy`
- 数值 / Stats：提供补给 / Supply provided 6
- Catalog 技能链接 / Catalog ability links：`TrainQueen`(训练技能 / CAbilTrain)
- 关联 Behavior / Linked behaviors：`ChronoBoostTarget`、`HatcheryDoubleQueue`、`HatcheryLarvaDeath`
- 可生产/创建 / Produced or created：`CreepTumor`（非本指挥官名册 / not in current commander roster）、`QueenClassic`（非本指挥官名册 / not in current commander roster），耗时 / Time 30s、`QueenCoop`，耗时 / Time 50s
- 已隐藏基础按钮 / Hidden basic buttons：1 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| - | `TrainQueen` | `TrainQueen,Train4` | 训练技能 / CAbilTrain | `QueenCoop`、单位 / Unit:`QueenCoop` | - | - |
| 0,1 | `CreepTumorBuild` | `CreepTumorBuild,Build3` | 建造技能 / CAbilBuild | `CreepTumor`、单位 / Unit:`CreepTumor` | - | - |
| 0,1 | `TrainQueen` | `TrainQueen,Train1` | 训练技能 / CAbilTrain | - | - | - |
| 0,1 | `TrainQueen` | `TrainQueen,Train3` | 训练技能 / CAbilTrain | `QueenClassic`、单位 / Unit:`QueenClassic` | - | - |
| 0,4 | `K5TwoDrones` | `-` | 未解析 / Unresolved | - | - | HaveK5TwoDrones |
| 1,0 | `LairResearch` | `LairResearch,Research7` | 研究技能 / CAbilResearch | 升级 / Upgrade:`OverlordspeedCoop` | - | - |
| 1,3 | `RallyHatchery` | `RallyHatchery,Rally3` | 未解析 / Unresolved | - | - | - |

### `Hive`

- 来源 / Source：名册 / Roster XMFinal CommanderBuildings.galaxy，状态 / Status galaxy，模块 / Module XMAbathur.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146_CommanderBuildings.galaxy`
- 数值 / Stats：提供补给 / Supply provided 6
- Catalog 技能链接 / Catalog ability links：`TrainQueen`(训练技能 / CAbilTrain)
- 关联 Behavior / Linked behaviors：`ChronoBoostTarget`、`HatcheryDoubleQueue`、`HatcheryLarvaDeath`
- 可生产/创建 / Produced or created：`CreepTumor`（非本指挥官名册 / not in current commander roster）、`QueenClassic`（非本指挥官名册 / not in current commander roster），耗时 / Time 30s、`QueenCoop`，耗时 / Time 50s
- 已隐藏基础按钮 / Hidden basic buttons：1 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| - | `TrainQueen` | `TrainQueen,Train4` | 训练技能 / CAbilTrain | `QueenCoop`、单位 / Unit:`QueenCoop` | - | - |
| 0,1 | `CreepTumorBuild` | `CreepTumorBuild,Build3` | 建造技能 / CAbilBuild | `CreepTumor`、单位 / Unit:`CreepTumor` | - | - |
| 0,1 | `TrainQueen` | `TrainQueen,Train1` | 训练技能 / CAbilTrain | - | - | - |
| 0,1 | `TrainQueen` | `TrainQueen,Train3` | 训练技能 / CAbilTrain | `QueenClassic`、单位 / Unit:`QueenClassic` | - | - |
| 0,4 | `K5TwoDrones` | `-` | 未解析 / Unresolved | - | - | HaveK5TwoDrones |
| 1,0 | `LairResearch` | `LairResearch,Research7` | 研究技能 / CAbilResearch | 升级 / Upgrade:`OverlordspeedCoop` | - | - |
| 1,3 | `RallyHatchery` | `RallyHatchery,Rally3` | 未解析 / Unresolved | - | - | - |

### `Extractor`

- 来源 / Source：名册 / Roster XMFinal CommanderBuildings.galaxy，状态 / Status galaxy，模块 / Module XMAbathur.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146_CommanderBuildings.galaxy`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：无 / None

- 面板技能 / Panel skills：无 / None

### `SpawningPool`

- 来源 / Source：名册 / Roster XMFinal CommanderBuildings.galaxy，状态 / Status galaxy，模块 / Module XMAbathur.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146_CommanderBuildings.galaxy`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：无 / None
- 关联 Behavior / Linked behaviors：`ChronoBoostTarget`
- 已隐藏基础按钮 / Hidden basic buttons：2 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,1 | `SpawningPoolResearch` | `SpawningPoolResearch,Research3` | 研究技能 / CAbilResearch | 升级 / Upgrade:`HotSZerglingHealth` | - | - |
| 0,1 | `EvolveHardenedCarapaceLocked` | `-` | 未解析 / Unresolved | - | - | KerriganLevel04 |
| 0,1 | 进化硬化甲壳 / `EvolveHardenedCarapaceZagaraLocked` | `-` | 未解析 / Unresolved | - | - | ZagaraLevel06 |
| 2 | - | `-` | 未解析 / Unresolved | - | - | HotSHaveSporeCrawler |
| 3 | - | `-` | 未解析 / Unresolved | - | - | HotSHaveSpineCrawler |
| 0,3 | `SpawningPoolResearch` | `SpawningPoolResearch,Research4` | 研究技能 / CAbilResearch | 升级 / Upgrade:`ZerglingArmorShred` | - | - |
| 0,3 | `EvolveZerglingArmorShredLocked` | `-` | 未解析 / Unresolved | - | - | KerriganLevel04 |
| 0,3 | 进化切割利爪 / `EvolveZerglingArmorShredZagaraLocked` | `-` | 未解析 / Unresolved | - | - | ZagaraLevel06 |
| 1,4 | `PassiveBileLauncher` | `-` | 未解析 / Unresolved | - | - | HaveBileLaunchers |
| 1,4 | `PassiveBileLauncherLocked` | `-` | 未解析 / Unresolved | - | - | ZagaraLevel05 |
| 2,0 | `SpawningPoolResearch` | `SpawningPoolResearch,Research5` | 研究技能 / CAbilResearch | 升级 / Upgrade:`BileLauncherIncreasedRange` | - | - |
| 2,1 | `SpawningPoolResearch` | `SpawningPoolResearch,Research6` | 研究技能 / CAbilResearch | 升级 / Upgrade:`BileLauncherBombardmentCooldown` | - | - |
| 2,1 | `EvolveBileLauncherBombardmentCooldownLocked` | `-` | 未解析 / Unresolved | - | - | ZagaraLevel13 |

### `EvolutionChamber`

- 来源 / Source：名册 / Roster XMFinal CommanderBuildings.galaxy，状态 / Status galaxy，模块 / Module XMAbathur.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146_CommanderBuildings.galaxy`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`AbathurRebornCrawlerResearch`(研究技能 / CAbilResearch)、`EvolutionPitScalingCostResearch`(研究技能 / CAbilResearch)
- 关联 Behavior / Linked behaviors：`ChronoBoostTarget`
- 已隐藏基础按钮 / Hidden basic buttons：1 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | `evolutionchamberresearch` | `evolutionchamberresearch,Research13` | 研究技能 / CAbilResearch | 升级 / Upgrade:`ZagaraGroundAttacksLevel1` | - | - |
| 0,0 | `evolutionchamberresearch` | `evolutionchamberresearch,Research14` | 研究技能 / CAbilResearch | 升级 / Upgrade:`ZagaraGroundAttacksLevel2` | - | - |
| 0,0 | `evolutionchamberresearch` | `evolutionchamberresearch,Research15` | 研究技能 / CAbilResearch | 升级 / Upgrade:`ZagaraGroundAttacksLevel3` | - | - |
| 0,3 | `evolutionchamberresearch` | `evolutionchamberresearch,Research12` | 研究技能 / CAbilResearch | 升级 / Upgrade:`AbathurBioMechanicalTransfusion` | - | - |
| 0,3 | `EvolveBioMechanicalTransfusionLocked` | `-` | 未解析 / Unresolved | - | - | AbathurLevel06 |
| 0,4 | `evolutionchamberresearch` | `evolutionchamberresearch,Research11` | 研究技能 / CAbilResearch | 升级 / Upgrade:`AbathurHatcheryDoubleQueue` | - | - |
| 0,4 | `EvolveHatcheryDoubleQueueLocked` | `-` | 未解析 / Unresolved | - | - | AbathurLevel06 |
| 1,0 | 进化英勇刚毅 / `CommanderPrestigeZagaraHeroicFortitudeResearchLocked` | `-` | 未解析 / Unresolved | - | - | CommanderPrestigeZagaraMaxSupply |
| 1,0 | `evolutionchamberresearch` | `evolutionchamberresearch,Research20` | 研究技能 / CAbilResearch | 升级 / Upgrade:`VoidCoopHeroicFortitude` | - | - |
| 1,1 | 进化美杜莎之刃 / `CommanderPrestigeZagaraMedusaBladesResearchLocked` | `-` | 未解析 / Unresolved | - | - | CommanderPrestigeZagaraMaxSupply |
| 1,1 | `evolutionchamberresearch` | `evolutionchamberresearch,Research21` | 研究技能 / CAbilResearch | 升级 / Upgrade:`K5ChainLightning` | - | - |
| 1,1 | `EvolveK5ChainLightningLocked` | `-` | 未解析 / Unresolved | - | - | KerriganLevel09 |
| 1,1 | `evolutionchamberresearch` | `evolutionchamberresearch,Research23` | 研究技能 / CAbilResearch | 升级 / Upgrade:`ZagaraVoidCoopAttackUpgrade` | - | - |
| 1,1 | `EvolveMedusasBladesLocked` | `-` | 未解析 / Unresolved | - | - | ZagaraLevel09 |
| 1,2 | `evolutionchamberresearch` | `evolutionchamberresearch,Research10` | 研究技能 / CAbilResearch | 升级 / Upgrade:`AberrationArmorAura` | - | - |
| 1,2 | `EvolveAberrationArmorAuraLocked` | `-` | 未解析 / Unresolved | - | - | ZagaraLevel09 |
| 1,2 | `evolutionchamberresearch` | `evolutionchamberresearch,Research22` | 研究技能 / CAbilResearch | 升级 / Upgrade:`K5Cooldowns` | - | - |
| 1,2 | `EvolveK5CooldownsLocked` | `-` | 未解析 / Unresolved | - | - | KerriganLevel09 |

### `RoachWarren`

- 来源 / Source：名册 / Roster XMFinal CommanderBuildings.galaxy，状态 / Status galaxy，模块 / Module XMAbathur.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146_CommanderBuildings.galaxy`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：无 / None
- 关联 Behavior / Linked behaviors：`ChronoBoostTarget`
- 已隐藏基础按钮 / Hidden basic buttons：2 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,2 | `RoachWarrenResearch` | `RoachWarrenResearch,Research5` | 研究技能 / CAbilResearch | 升级 / Upgrade:`HotSRoachDamage` | - | - |
| 0,3 | `RoachWarrenResearch` | `RoachWarrenResearch,Research6` | 研究技能 / CAbilResearch | 升级 / Upgrade:`HotSRoachShield` | - | - |
| 0,3 | `EvolveAdaptivePlatingLocked` | `-` | 未解析 / Unresolved | - | - | AbathurLevel04 |
| 1,0 | `RoachWarrenResearch` | `RoachWarrenResearch,Research7` | 研究技能 / CAbilResearch | 升级 / Upgrade:`RavagerCorrosiveBileRadiusIncrease` | - | - |
| 1,1 | `RoachWarrenResearch` | `RoachWarrenResearch,Research8` | 研究技能 / CAbilResearch | 升级 / Upgrade:`RavagerCorrosiveBileDamageIncrease` | - | - |
| 1,1 | `EvolveCorrosiveBileDamageIncreaseLocked` | `-` | 未解析 / Unresolved | - | - | AbathurLevel04 |
| 2 | `RoachCorpserPassive` | `-` | 未解析 / Unresolved | - | - | HaveRoachCorpser |
| 2 | `RoachVilePassive` | `-` | 未解析 / Unresolved | - | - | HaveRoachVile |
| 2,1 | `RavagerPassive` | `-` | 未解析 / Unresolved | - | - | HaveLair |

### `InfestationPit`

- 来源 / Source：名册 / Roster XMFinal CommanderBuildings.galaxy，状态 / Status galaxy，模块 / Module XMAbathur.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146_CommanderBuildings.galaxy`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：无 / None
- 关联 Behavior / Linked behaviors：`ChronoBoostTarget`
- 已隐藏基础按钮 / Hidden basic buttons：1 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0 | `InfestationPitResearch` | `InfestationPitResearch,Research9` | 研究技能 / CAbilResearch | 升级 / Upgrade:`ViperImprovedCastRange` | - | - |
| 0,0 | `InfestationPitResearch` | `InfestationPitResearch,Research8` | 研究技能 / CAbilResearch | 升级 / Upgrade:`HotSPressurizedGlands` | - | - |
| - | `SwarmHostCarrionPassive` | `-` | 未解析 / Unresolved | - | - | HotSHaveSwarmHostSplitA |
| 0 | `SwarmHostCreeperPassive` | `-` | 未解析 / Unresolved | - | - | HotSHaveSwarmHostSplitB |
| 0 | `SwarmHostPassive` | `-` | 未解析 / Unresolved | - | - | HotSHaveSwarmHost |
| 0,1 | `EvolveViperImprovedCastRangeLocked` | `-` | 未解析 / Unresolved | - | - | AbathurLevel08 |
| 0,2 | `EvolveDeepTunnelLocked` | `-` | 未解析 / Unresolved | - | - | AbathurLevel09 |
| 0,2 | `InfestationPitResearch` | `InfestationPitResearch,Research12` | 研究技能 / CAbilResearch | 升级 / Upgrade:`AbathurDeepTunnel` | - | - |
| 0,3 | `InfestationPitResearch` | `InfestationPitResearch,Research10` | 研究技能 / CAbilResearch | 升级 / Upgrade:`ViperAbductImprovedStun` | - | - |
| 0,3 | `EvolveViperAbductImprovedStunLocked` | `-` | 未解析 / Unresolved | - | - | AbathurLevel09 |
| 0,3 | `InfestationPitResearch` | `InfestationPitResearch,Research4` | 研究技能 / CAbilResearch | - | - | - |
| 1 | `InfestorPassive` | `-` | 未解析 / Unresolved | - | - | HotSHaveInfestor |
| 1,1 | `DefilerPassive` | `-` | 未解析 / Unresolved | - | - | HotSHaveDefiler |
| 1,1 | `ViperPassive` | `-` | 未解析 / Unresolved | - | - | HotSHaveViper |

### `Spire`

- 来源 / Source：名册 / Roster XMFinal CommanderBuildings.galaxy，状态 / Status galaxy，模块 / Module XMAbathur.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146_CommanderBuildings.galaxy`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：无 / None
- 关联 Behavior / Linked behaviors：`ChronoBoostTarget`
- 已隐藏基础按钮 / Hidden basic buttons：2 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0 | `UpgradeToGreaterSpireBroodlord` | `UpgradeToGreaterSpireBroodlord,Execute` | 变形技能 / CAbilMorph | - | - | - |
| - | `SpireResearch` | `SpireResearch,Research5` | 研究技能 / CAbilResearch | - | - | - |
| - | `SpireResearch` | `SpireResearch,Research6` | 研究技能 / CAbilResearch | - | - | - |
| - | `SpireResearch` | `SpireResearch,Research1` | 研究技能 / CAbilResearch | - | - | - |
| - | `SpireResearch` | `SpireResearch,Research2` | 研究技能 / CAbilResearch | - | - | - |
| - | `SpireResearch` | `SpireResearch,Research3` | 研究技能 / CAbilResearch | - | - | - |
| 1 | `MutaliskPassive` | `-` | 未解析 / Unresolved | - | - | HaveCoopMutalisk |
| 1 | `SpireResearch` | `SpireResearch,Research4` | 研究技能 / CAbilResearch | - | - | - |
| 0,2 | 进化极速再生 / `SpireResearch` | `SpireResearch,Research10` | 研究技能 / CAbilResearch | 升级 / Upgrade:`HotSRapidRegeneration` | - | - |
| 0,3 | `SpireResearch` | `SpireResearch,Research14` | 研究技能 / CAbilResearch | 升级 / Upgrade:`KerriganViciousGlaive` | - | - |
| 0,3 | 进化残暴龙爪 / `SpireResearch` | `SpireResearch,Research7` | 研究技能 / CAbilResearch | 升级 / Upgrade:`HotSViciousGlaive` | - | - |
| 0,4 | `SpireResearch` | `SpireResearch,Research15` | 研究技能 / CAbilResearch | 升级 / Upgrade:`KerriganSeveringGlave` | - | - |
| 0,4 | `EvolveSeveringGlaveLocked` | `-` | 未解析 / Unresolved | - | - | KerriganLevel11 |
| 0,4 | `SpireResearch` | `SpireResearch,Research9` | 研究技能 / CAbilResearch | 升级 / Upgrade:`MutaliskSunderingGlave` | - | - |
| 0,4 | `EvolveSunderingGlaveLocked` | `-` | 未解析 / Unresolved | - | - | AbathurLevel11 |
| 1,0 | `SpireResearch` | `SpireResearch,Research8` | 研究技能 / CAbilResearch | 升级 / Upgrade:`KerriganVoidCoopBroodlordSpeed` | - | - |
| 1,0 | `EvolveBroodlordSpeedLocked` | `-` | 未解析 / Unresolved | - | - | KerriganLevel11 |
| 1,0 | `SpireResearch` | `SpireResearch,Research11` | 研究技能 / CAbilResearch | 升级 / Upgrade:`GuardianAttackRangeIncrease` | - | - |
| 1,0 | `EvolveGuardianAttackRangeIncreaseLocked` | `-` | 未解析 / Unresolved | - | - | AbathurLevel12 |
| 1,1 | `SpireResearch` | `SpireResearch,Research12` | 研究技能 / CAbilResearch | 升级 / Upgrade:`DevourerAoEDamage` | - | - |
| 1,1 | `EvolveDevourerAoEDamageLocked` | `-` | 未解析 / Unresolved | - | - | AbathurLevel12 |
| 2,1 | `MutaliskBroodlordPassive` | `-` | 未解析 / Unresolved | - | - | HaveHotSMutaliskBroodLord |
| 2,1 | `MutaliskViperPassive` | `-` | 未解析 / Unresolved | - | - | HaveHotSMutaliskViper |
| 2,2 | `BroodLordPassive` | `-` | 未解析 / Unresolved | - | - | HaveHotSMutaliskBroodLordAndHaveGreaterSpire |
| 2,2 | `GuardianPassive` | `-` | 未解析 / Unresolved | - | - | HaveGuardian |
| 2,3 | `DevourerPassive` | `-` | 未解析 / Unresolved | - | - | HotSHaveDevourer |

### `GreaterSpire`

- 来源 / Source：名册 / Roster XMFinal CommanderBuildings.galaxy，状态 / Status galaxy，模块 / Module XMAbathur.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146_CommanderBuildings.galaxy`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：无 / None
- 关联 Behavior / Linked behaviors：`ChronoBoostTarget`
- 已隐藏基础按钮 / Hidden basic buttons：1 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,2 | 进化极速再生 / `SpireResearch` | `SpireResearch,Research10` | 研究技能 / CAbilResearch | 升级 / Upgrade:`HotSRapidRegeneration` | - | - |
| 0,3 | `SpireResearch` | `SpireResearch,Research14` | 研究技能 / CAbilResearch | 升级 / Upgrade:`KerriganViciousGlaive` | - | - |
| 0,3 | 进化残暴龙爪 / `SpireResearch` | `SpireResearch,Research7` | 研究技能 / CAbilResearch | 升级 / Upgrade:`HotSViciousGlaive` | - | - |
| 0,4 | `SpireResearch` | `SpireResearch,Research15` | 研究技能 / CAbilResearch | 升级 / Upgrade:`KerriganSeveringGlave` | - | - |
| 0,4 | `EvolveSeveringGlaveLocked` | `-` | 未解析 / Unresolved | - | - | KerriganLevel11 |
| 0,4 | `SpireResearch` | `SpireResearch,Research9` | 研究技能 / CAbilResearch | 升级 / Upgrade:`MutaliskSunderingGlave` | - | - |
| 0,4 | `EvolveSunderingGlaveLocked` | `-` | 未解析 / Unresolved | - | - | AbathurLevel11 |
| 1,0 | `SpireResearch` | `SpireResearch,Research8` | 研究技能 / CAbilResearch | 升级 / Upgrade:`KerriganVoidCoopBroodlordSpeed` | - | - |
| 1,0 | `EvolveBroodlordSpeedLocked` | `-` | 未解析 / Unresolved | - | - | KerriganLevel11 |
| 1,0 | `SpireResearch` | `SpireResearch,Research11` | 研究技能 / CAbilResearch | 升级 / Upgrade:`GuardianAttackRangeIncrease` | - | - |
| 1,0 | `SpireResearch` | `SpireResearch,255` | 研究技能 / CAbilResearch | - | - | AbathurLevel11 |
| 1,1 | `SpireResearch` | `SpireResearch,Research12` | 研究技能 / CAbilResearch | 升级 / Upgrade:`DevourerAoEDamage` | - | - |
| 1,1 | `EvolveDevourerAoEDamageLocked` | `-` | 未解析 / Unresolved | - | - | AbathurLevel11 |
| 2,1 | `MutaliskPassive` | `-` | 未解析 / Unresolved | - | - | HaveCoopMutalisk |
| 2,2 | - | `-` | 未解析 / Unresolved | - | - | HaveHotSMutaliskBroodLordAndHaveGreaterSpire |
| 2,2 | `GuardianPassive` | `-` | 未解析 / Unresolved | - | - | HaveGuardian |
| 2,2 | `ViperPassive` | `-` | 未解析 / Unresolved | - | - | HaveHotSMutaliskViper |
| 2,3 | `DevourerPassive` | `-` | 未解析 / Unresolved | - | - | HotSHaveDevourer |

## 生产链补充建筑 / Production-support Buildings

- 无 / None

## 单位 / Units

### `GuardianMP`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，官方ID / Official ID AbathurGuardian，状态 / Status state-only，模块 / Module XMAbathur.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit
- Catalog 技能链接 / Catalog ability links：`AbathurGuardianCorrosiveBombardmentPurchase`、`AbathurGuardianExtendedSpinesPurchase`、`AbathurGuardianRegenerativeSacsPurchase`、`attack`(基础 / Basic)、`EvolveToLeviathanGuardianMP`(训练技能 / CAbilTrain)、`move`(基础 / Basic)、`que1`、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`AbathurPropArmor`、`AbathurRebornPropArmor`、`AllUnitBehaviorController`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | `GuardianAttackRangeIncrease` | `-` | 未解析 / Unresolved | - | - | HaveGuardianAttackRangeIncrease |
| 2,2 | `CommanderPrestigeAbathurLeviathanLocked` | `-` | 未解析 / Unresolved | - | - | CommanderPrestigeAbathurBiomass |
| 2,2 | `EvolveToLeviathanGuardianMP` | `EvolveToLeviathanGuardianMP,Train1` | 训练技能 / CAbilTrain | - | - | - |
| 2,2 | `EvolveToLeviathanLocked` | `-` | 未解析 / Unresolved | - | - | AbathurLevel02 |
| 2,3 | `BiomassPassive` | `-` | 未解析 / Unresolved | - | - | BiomassBuffVisible |
| 2,3 | `BiomassPassiveEmpty` | `-` | 未解析 / Unresolved | - | - | BiomassBuffEmptyVisible |

### `DevourerMP`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status state-only，模块 / Module XMAbathur.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：无 / None

- 面板技能 / Panel skills：无 / None

### 异龙 / `Mutalisk`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMAbathur.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`AbathurMutaliskExplosiveGlaivePurchase`、`AbathurMutaliskRapidRegenerationPurchase`、`AbathurMutaliskViciousGlaivePurchase`、`attack`(基础 / Basic)、`EvolveToLeviathanMutalisk`(训练技能 / CAbilTrain)、`move`(基础 / Basic)、`MutaliskMorphToBroodLord`(训练技能 / CAbilTrain)、`MutaliskMorphToDevourer`(训练技能 / CAbilTrain)、`MutaliskMorphToGuardian`(训练技能 / CAbilTrain)、`que1`、`stop`(基础 / Basic)、`StukovInfestedWildMutation`(瞬发效果技能 / CAbilEffectInstant)
- 关联 Behavior / Linked behaviors：`AbathurPropArmor`、`AbathurRebornPropArmor`、`AllUnitBehaviorController`
- 可生产/创建 / Produced or created：`Devourer`（非本指挥官名册 / not in current commander roster），耗时 / Time 15s、`GuardianMP`，耗时 / Time 15s
- 已隐藏基础按钮 / Hidden basic buttons：3 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | 变异为吞噬者 / `MutaliskMorphToDevourer` | `MutaliskMorphToDevourer,Train1` | 训练技能 / CAbilTrain | `Devourer`、单位 / Unit:`Devourer` | - | - |
| 2,0 | `MutaliskMorphToGuardian` | `MutaliskMorphToGuardian,Train1` | 训练技能 / CAbilTrain | `GuardianMP`、单位 / Unit:`GuardianMP` | - | - |
| 2,2 | `CommanderPrestigeAbathurLeviathanLocked` | `-` | 未解析 / Unresolved | - | - | CommanderPrestigeAbathurBiomass |
| 2,2 | `EvolveToLeviathanMutalisk` | `EvolveToLeviathanMutalisk,Train1` | 训练技能 / CAbilTrain | - | - | - |
| 2,2 | `EvolveToLeviathanLocked` | `-` | 未解析 / Unresolved | - | - | AbathurLevel02 |
| 2,3 | `BiomassPassive` | `-` | 未解析 / Unresolved | - | - | BiomassBuffVisible |
| 2,3 | `BiomassPassiveEmpty` | `-` | 未解析 / Unresolved | - | - | BiomassBuffEmptyVisible |

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

### 虫群宿主 / `SwarmHost`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMAbathur.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`AbathurDeepTunnel`(目标效果技能 / CAbilEffectTarget)、`AbathurDeepTunnelImproved`(目标效果技能 / CAbilEffectTarget)、`AbathurHostLocustSpeedPurchase`、`AbathurHostPressurizedGlandsPurchase`、`AbathurHostRapidIncubationPurchase`、`AbathurRebornDeepTunnel`(目标效果技能 / CAbilEffectTarget)、`AbathurRebornDeepTunnelImproved`(目标效果技能 / CAbilEffectTarget)、`EvolveToBrutaliskSwarmHost`(训练技能 / CAbilTrain)、`LocustLaunch`、`MorphToSwarmHostBurrowed`、`que1`
- 关联 Behavior / Linked behaviors：`AbathurPropArmor`、`AbathurRebornPropArmor`、`AllUnitBehaviorController`、`SwarmHostPressurizedGlands`
- 已隐藏基础按钮 / Hidden basic buttons：2 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| - | `MorphToSwarmHostBurrowed` | `MorphToSwarmHostBurrowed,Execute` | 未解析 / Unresolved | - | - | - |
| 1 | `AbathurDeepTunnel` | `AbathurDeepTunnel,Execute` | 目标效果技能 / CAbilEffectTarget | - | 创建单位效果 / CEffectCreateUnit:`AbathurDeepTunnelCU` | - |
| 2,0 | `LocustLaunch` | `LocustLaunch,Execute` | 未解析 / Unresolved | - | - | - |
| 2,1 | `AbathurDeepTunnelImproved` | `AbathurDeepTunnelImproved,Execute` | 目标效果技能 / CAbilEffectTarget | - | 创建单位效果 / CEffectCreateUnit:`AbathurDeepTunnelCU` | - |
| 2,1 | `DeepTunnelLocked` | `-` | 未解析 / Unresolved | - | - | AbathurLevel09 |
| 2,2 | `CommanderPrestigeAbathurBrutaliskLocked` | `-` | 未解析 / Unresolved | - | - | CommanderPrestigeAbathurBiomass |
| 2,2 | `EvolveToBrutaliskSwarmHost` | `EvolveToBrutaliskSwarmHost,Train1` | 训练技能 / CAbilTrain | - | - | - |
| 2,2 | `EvolveToBrutaliskLocked` | `-` | 未解析 / Unresolved | - | - | AbathurLevel02 |
| 2,3 | `BiomassPassive` | `-` | 未解析 / Unresolved | - | - | BiomassBuffVisible |
| 2,3 | `BiomassPassiveEmpty` | `-` | 未解析 / Unresolved | - | - | BiomassBuffEmptyVisible |

### `QueenCoop`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，官方ID / Official ID SwarmQueen，状态 / Status exact，模块 / Module XMAbathur.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race Zerg，生命 / Life 175，能量 / Energy 200，费用 / Cost 150/0，补给 / Supply 2
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`BurrowQueenDownCoop`、`DeepTunnel`、`KerriganEnhance`、`move`(基础 / Basic)、`QueenBuild`(建造技能 / CAbilBuild)、`SpawnLarva`(目标效果技能 / CAbilEffectTarget)、`stop`(基础 / Basic)、`Transfusion`(目标效果技能 / CAbilEffectTarget)
- 关联 Behavior / Linked behaviors：`AbathurPropArmor`、`AllUnitBehaviorController`
- 已隐藏基础按钮 / Hidden basic buttons：6 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | `InjectLarvaPassive` | `-` | 未解析 / Unresolved | - | - | HaveQueenDoubleInjectLarva |
| 1,0 | 幼虫注射 / `ZagaraQueenInjectLarvaLocked` | `-` | 未解析 / Unresolved | - | - | ZagaraLevel03 |
| 2,0 | `QueenBuild` | `QueenBuild,Build1` | 建造技能 / CAbilBuild | `CreepTumorQueenNoCreep` | - | - |
| 2,1 | `SpawnLarva` | `SpawnLarva,Execute` | 目标效果技能 / CAbilEffectTarget | - | 效果集合 / CEffectSet:`SpawnLarvaSet` | - |
| 2,2 | `SpawnLarva` | `SpawnLarva,Execute` | 目标效果技能 / CAbilEffectTarget | - | 效果集合 / CEffectSet:`SpawnLarvaSet` | - |
| 2,2 | `Transfusion` | `Transfusion,Execute` | 目标效果技能 / CAbilEffectTarget | - | CEffectSwitch / CEffectSwitch:`TransfusionACSwitch` | - |
| 2,4 | `BurrowQueenDownCoop` | `BurrowQueenDownCoop,Execute` | 未解析 / Unresolved | - | - | - |

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

### 飞蛇 / `Viper`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMAbathur.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：费用 / Cost 100/0
- Catalog 技能链接 / Catalog ability links：`AbathurCasterBrainPoolPurchase`、`AbathurCasterFleshReactorPurchase`、`AbathurCasterMimeticMembranePurchase`、`AbathurCasterNeuralTethersPurchase`、`EvolveToLeviathanViper`(训练技能 / CAbilTrain)、`move`(基础 / Basic)、`ParasiticBomb`、`que1`、`stop`(基础 / Basic)、`ViperConsumeStructure`、`Yoink`
- 关联 Behavior / Linked behaviors：`AbathurPropArmor`、`AbathurRebornPropArmor`、`AllUnitBehaviorController`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| - | `AttackGhost` | `-` | 未解析 / Unresolved | - | - | - |
| 1,0 | `ViperImprovedCastRangePassive` | `-` | 未解析 / Unresolved | - | - | HaveViperImprovedCastRange |
| 1,1 | `ViperAbductImprovedStunPassive` | `-` | 未解析 / Unresolved | - | - | HaveViperAbductImprovedStun |
| 1,4 | `BiomassPassiveEmpty` | `-` | 未解析 / Unresolved | - | - | BiomassBuffEmptyVisible |
| 1,4 | `BiomassPassiveEnergy` | `-` | 未解析 / Unresolved | - | - | BiomassBuffVisible |
| 2,2 | `CommanderPrestigeAbathurLeviathanLocked` | `-` | 未解析 / Unresolved | - | - | CommanderPrestigeAbathurBiomass |
| 2,3 | `ParasiticBomb` | `ParasiticBomb,Execute` | 未解析 / Unresolved | - | - | - |
| 2,4 | `EvolveToLeviathanViper` | `EvolveToLeviathanViper,Train1` | 训练技能 / CAbilTrain | - | - | - |
| 2,4 | `EvolveToLeviathanLocked` | `-` | 未解析 / Unresolved | - | - | AbathurLevel02 |

### 莽兽 / `Brutalisk`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMAbathur.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，费用 / Cost 500/300
- Catalog 技能链接 / Catalog ability links：`AbathurRebornSymbioteHangerBrutalisk`(弹仓/机库技能 / CAbilArmMagazine)、`AbathurSymbioteHangerBrutalisk`(弹仓/机库技能 / CAbilArmMagazine)、`BrutaliskDeepTunnel`(目标效果技能 / CAbilEffectTarget)、`BrutaliskFleshRecompositionPurchase`、`BrutaliskSavageRendPurchase`、`BrutaliskTramplingCarapacePurchase`、`BurrowBrutaliskDown`(变形技能 / CAbilMorph)、`que1Passive`、`SymbioteCarapace`(瞬发效果技能 / CAbilEffectInstant)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`CarapaceDamageResponse`、`Frenzy`
- 可生产/创建 / Produced or created：`AbathurSymbioteBrutalisk`（非本指挥官名册 / not in current commander roster）、`BrutaliskPlacement`（非本指挥官名册 / not in current commander roster）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,4 | `Frenzied` | `-` | 未解析 / Unresolved | - | - | - |
| 1,4 | `SymbioteCarapace` | `SymbioteCarapace,Execute` | 瞬发效果技能 / CAbilEffectInstant | - | 效果集合 / CEffectSet:`SymbioteCarapaceSet` | - |
| 2,0 | `AbathurBrutaliskLeviathanSymbiote` | `-` | 未解析 / Unresolved | - | - | HaveBrutaliskLeviathanSymbiote |
| 2,0 | `AbathurBrutaliskLeviathanSymbioteLocked` | `-` | 未解析 / Unresolved | - | - | AbathurLevel10 |
| 2,1 | `AbathurSymbioteHangerBrutalisk` | `AbathurSymbioteHangerBrutalisk,Ammo1` | 弹仓/机库技能 / CAbilArmMagazine | `AbathurSymbioteBrutalisk`、单位 / Unit:`AbathurSymbioteBrutalisk` | 效果集合 / CEffectSet:`SymbioteCreateSet` | HaveBrutaliskgainsSymbioteUpgrade |
| 2,3 | `BrutaliskDeepTunnel` | `BrutaliskDeepTunnel,Execute` | 目标效果技能 / CAbilEffectTarget | 效果创建 / Effect creates:`BrutaliskPlacement` | 创建单位效果 / CEffectCreateUnit:`BrutaliskDeepTunnelCU` | - |
| 2,4 | `BurrowBrutaliskDown` | `BurrowBrutaliskDown,Execute` | 变形技能 / CAbilMorph | - | - | - |

## 英雄 / Heroes

### `HotSLeviathan`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，官方ID / Official ID Leviathan，状态 / Status exact，模块 / Module XMAbathur.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Hero，能量 / Energy 0
- Catalog 技能链接 / Catalog ability links：`AbathurRebornSymbioteHangerLeviathan`(弹仓/机库技能 / CAbilArmMagazine)、`AbathurSymbioteHangerLeviathan`(弹仓/机库技能 / CAbilArmMagazine)、`que1Passive`、`SymbioteCarapace`(瞬发效果技能 / CAbilEffectInstant)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`CarapaceDamageResponse`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0 | `AbathurBrutaliskLeviathanSymbiote` | `-` | 未解析 / Unresolved | - | - | HaveBrutaliskLeviathanSymbiote |
| 0,4 | `SymbioteCarapace` | `SymbioteCarapace,Execute` | 瞬发效果技能 / CAbilEffectInstant | - | 效果集合 / CEffectSet:`SymbioteCarapaceSet` | - |
| 2,0 | `AbathurBrutaliskLeviathanSymbioteLocked` | `-` | 未解析 / Unresolved | - | - | AbathurLevel10 |

## 本轮补全 / This Round

- 已把 `crys_the_swarm_reborn.SC2Mod` 的 Abathur 原始条目同步回 `XMAbathur.SC2Mod` 与 `XMAbathurReborn.SC2Mod`。
- 重点补齐了 `AbathurHost*`、`Crawler*`、`LocustSpeed` 等按钮，以及 `Abathur`、`AbathurAnnouncer`、`CrawlersSpawnBroodlings`、`HotSLocustSpeed` 等升级。
- `EffectData.xml` 已补入 `LocustWeaponCreateSet`、`LocustWeaponCreeperCreateSet`、`LocustWeaponFlyingCreateSet` 与 `AbathurHostLocustSpeedPurchaseEffect`。
- `UnitData.xml` 已补入 `LocustFlying`。
- 目标 XML 重新载入校验通过，当前补丁未破坏 XML 结构。
