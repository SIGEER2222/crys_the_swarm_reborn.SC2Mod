# 扎加拉 / `Zagara` 科技链路排查 / Tech Tree Diagnostics

- 描述 / Description：无 / None
- 数据来源 / Data source：当前 Mod / Current Mod，目录 / Directory：`合作指挥官版起义狂潮/Mods/XM/XMZagara.SC2Mod`
- 当前 Mod 运行名册 / Current Mod roster：module=`XMZagara.SC2Mod`，instance=`Zagara`
- 统计 / Stats：建筑 3、生产链补充建筑 0、单位 8、英雄 1、建筑按钮 18、单位按钮 18、效果引用 12
- 名称显示 / Name display：能从当前 Mod zhCN 解析时显示“中文名 / `英文ID`”；仅显示 `ID` 表示当前 Mod 未找到可用中文名。

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

### 脊针爬虫 / `SpineCrawler`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMZagara.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`BroodlingInfestation`(瞬发效果技能 / CAbilEffectInstant)、`BuildInProgress`(基础 / Basic)、`CloudofFlies`(瞬发效果技能 / CAbilEffectInstant)、`RagingTentacle`(瞬发效果技能 / CAbilEffectInstant)、`Range`(瞬发效果技能 / CAbilEffectInstant)、`SpineCrawlerUproot`(变形技能 / CAbilMorph)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`CrawlerCombatRegen`、`CrawlerSafetyRegen`、`EnableCrawlerWeapon`
- 已隐藏基础按钮 / Hidden basic buttons：3 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | `RagingTentacle` | `RagingTentacle,Execute` | 瞬发效果技能 / CAbilEffectInstant | - | 施加行为效果 / CEffectApplyBehavior:`CrawlerRagingTentacle` | - |
| 1,1 | `CloudofFlies` | `CloudofFlies,Execute` | 瞬发效果技能 / CAbilEffectInstant | - | 施加行为效果 / CEffectApplyBehavior:`CrawlerCloudofFlies` | - |
| 1,2 | `BroodlingInfestation` | `BroodlingInfestation,Execute` | 瞬发效果技能 / CAbilEffectInstant | - | 施加行为效果 / CEffectApplyBehavior:`CrawlerBroodlingInfestation` | - |
| 1,3 | `Range` | `Range,Execute` | 瞬发效果技能 / CAbilEffectInstant | - | 施加行为效果 / CEffectApplyBehavior:`CrawlerRange` | - |
| 2,0 | `SpineCrawlerUproot` | `SpineCrawlerUproot,Execute` | 变形技能 / CAbilMorph | - | - | - |
| 2,1 | `CrawlerSafetyRegen` | `-` | 未解析 / Unresolved | - | - | - |
| 2,2 | `CrawlerCombatRegen` | `-` | 未解析 / Unresolved | - | - | CrawlerCombatRegen |

### 孢子爬虫 / `SporeCrawler`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMZagara.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`AcidMortar`(瞬发效果技能 / CAbilEffectInstant)、`attack`(基础 / Basic)、`BroodlingInfestation`(瞬发效果技能 / CAbilEffectInstant)、`BuildInProgress`(基础 / Basic)、`CloudofFlies`(瞬发效果技能 / CAbilEffectInstant)、`Range`(瞬发效果技能 / CAbilEffectInstant)、`SporeCrawlerUproot`(变形技能 / CAbilMorph)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`CrawlerCombatRegen`、`CrawlerSafetyRegen`、`Detector11`
- 已隐藏基础按钮 / Hidden basic buttons：3 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | `AcidMortar` | `AcidMortar,Execute` | 瞬发效果技能 / CAbilEffectInstant | - | 施加行为效果 / CEffectApplyBehavior:`CrawlerAcidMortar` | - |
| 1,1 | `CloudofFlies` | `CloudofFlies,Execute` | 瞬发效果技能 / CAbilEffectInstant | - | 施加行为效果 / CEffectApplyBehavior:`CrawlerCloudofFlies` | - |
| 1,2 | `BroodlingInfestation` | `BroodlingInfestation,Execute` | 瞬发效果技能 / CAbilEffectInstant | - | 施加行为效果 / CEffectApplyBehavior:`CrawlerBroodlingInfestation` | - |
| 1,3 | `Range` | `Range,Execute` | 瞬发效果技能 / CAbilEffectInstant | - | 施加行为效果 / CEffectApplyBehavior:`CrawlerRange` | - |
| 2,0 | `SporeCrawlerUproot` | `SporeCrawlerUproot,Execute` | 变形技能 / CAbilMorph | - | - | - |
| 2,1 | `CrawlerSafetyRegen` | `-` | 未解析 / Unresolved | - | - | - |
| 2,2 | `CrawlerCombatRegen` | `-` | 未解析 / Unresolved | - | - | CrawlerCombatRegen |
| 2,3 | `Detector` | `-` | 未解析 / Unresolved | - | - | NotUnderConstruction |

### `BileLauncherZagara`

- 来源 / Source：名册 / Roster XMFinal CommanderBuildings.galaxy，状态 / Status galaxy，模块 / Module XMZagara.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146_CommanderBuildings.galaxy`
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

### `InfestedAbomination`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMZagara.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit
- Catalog 技能链接 / Catalog ability links：无 / None
- 关联 Behavior / Linked behaviors：`AbberationBanelingIncubation`、`AberrationArmorAura`、`AllUnitBehaviorController`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,1 | `AberrationProtectiveCover` | `-` | 未解析 / Unresolved | - | - | HaveAberrationArmorAura |
| 2,2 | `AberrationBanelingIncubationLocked` | `-` | 未解析 / Unresolved | - | - | ZagaraLevel08 |
| 2,2 | 孕育爆虫 / `ZagaraVoidCoopIncubateBanelings` | `-` | 未解析 / Unresolved | - | - | HaveZagaraVoidCoopAberrationBanelingIncubation |

### `Baneling`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMZagara.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`BurrowUltraliskDown`、`BurrowUltraliskUp`、`Explode`(瞬发效果技能 / CAbilEffectInstant)、`move`(基础 / Basic)、`stop`(基础 / Basic)、`VolatileBurstBuilding`
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`NoScrapDrop`、`SupplyLT1`
- 已隐藏基础按钮 / Hidden basic buttons：3 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| - | `Explode` | `Explode,Execute` | 瞬发效果技能 / CAbilEffectInstant | - | - | - |
| 2,2 | `HaveCentrificalHooks` | `-` | 未解析 / Unresolved | - | - | ZagaraHaveCentrificalHooks |

### `Corruptor`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMZagara.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`CausticSpray`
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,2 | `CausticSpray` | `CausticSpray,Execute` | 未解析 / Unresolved | - | - | - |

### `Scourge`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMZagara.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，费用 / Cost 12/37
- Catalog 技能链接 / Catalog ability links：`ScourgeDetonate`、`SuicideBuilding`(行为/被动技能 / CAbilBehavior)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`NoScrapDrop`、`SupplyLT1`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | `ScourgeSplashDamagePassive` | `-` | 未解析 / Unresolved | - | - | HaveScourgeSplashDamage |
| 2,0 | `ScourgeDetonate` | `ScourgeDetonate,Execute` | 未解析 / Unresolved | - | - | - |
| 2,1 | `SuicideBuilding` | `SuicideBuilding,Off` | 行为/被动技能 / CAbilBehavior | - | - | - |
| 2,1 | `SuicideBuilding` | `SuicideBuilding,On` | 行为/被动技能 / CAbilBehavior | - | - | - |
| 2,2 | `HaveScourgeGasCostReduction` | `-` | 未解析 / Unresolved | - | - | HaveScourgeGasCostReduction |

### `SwarmQueen`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMZagara.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：无 / None

- 面板技能 / Panel skills：无 / None

### 跳虫 / `Zergling`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster，状态 / Status exact，模块 / Module XMZagara.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`move`(基础 / Basic)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`MasteryZagaraZerglingDodgeChance`、`SupplyLT1`
- 已隐藏基础按钮 / Hidden basic buttons：1 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | - | `-` | 未解析 / Unresolved | - | - | HaveMPAdrenalGlands |
| 1,0 | - | `-` | 未解析 / Unresolved | - | - | HaveMPMetabolicBoost |
| 1,3 | `ZerglingArmorShred` | `-` | 未解析 / Unresolved | - | - | HaveZerglingArmorShred |
| 1,4 | 闪避 / `ZagaraVoidCoopZerglingDodge` | `-` | 未解析 / Unresolved | - | - | HaveMasteryZagaraZerglingDodgeChance |

### `ZagaraZergling`

- 来源 / Source：名册 / Roster XMFinal CommanderRosters.galaxy，官方ID / Official ID Zergling，状态 / Status alias，模块 / Module XMZagara.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146_CommanderRosters.galaxy`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：无 / None

- 面板技能 / Panel skills：无 / None

### 眼虫 / `Overseer`

- 来源 / Source：名册 / Roster XMFinal CommanderRosters.galaxy，状态 / Status galaxy，模块 / Module XMZagara.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146_CommanderRosters.galaxy`
- 数值 / Stats：能量 / Energy 0
- Catalog 技能链接 / Catalog ability links：`OverseerMorphtoOverseerSiege`
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`Detector11`、`SupplyLT1`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0 | `OverseerMorphtoOverseerSiege` | `OverseerMorphtoOverseerSiege,Execute` | 未解析 / Unresolved | - | - | - |
| 1,0 | `HaveOverlordSpeed` | `-` | 未解析 / Unresolved | - | - | HavePneumatizedCarapace |
| 1,0 | `HaveOverlordSpeed` | `-` | 未解析 / Unresolved | - | - | HavePneumatizedCarapaceStukov |

## 英雄 / Heroes

### `ZagaraVoidCoop`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMZagara.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Hero，种族 / Race Zerg，生命 / Life 600，能量 / Energy 200
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、深槽虫道 / `CommanderPrestigeZagaraZagaraDeepTunnel`(目标效果技能 / CAbilEffectTarget)、`move`(基础 / Basic)、`stop`(基础 / Basic)、`ZagaraVoidCoopBanelingBarrage`(目标效果技能 / CAbilEffectTarget)、`ZagaraVoidCoopBurrow`(变形技能 / CAbilMorph)、`ZagaraVoidCoopCreepMaster`(建造技能 / CAbilBuild)、`ZagaraVoidCoopDeepTunnel`(目标效果技能 / CAbilEffectTarget)、`ZagaraVoidCoopDevouringMaw`(目标效果技能 / CAbilEffectTarget)、Zagara Void Coop Mass Frenzy / `ZagaraVoidCoopMassFrenzy`(瞬发效果技能 / CAbilEffectInstant)、扎加拉虚空合作模式感染空投 / `ZagaraVoidCoopMassRoachDrop`(目标效果技能 / CAbilEffectTarget)、召唤坑道虫 / `ZagaraVoidCoopNydusWorm`(建造技能 / CAbilBuild)、`ZagaraVoidCoopSpawnBroodlings`(目标效果技能 / CAbilEffectTarget)、`ZagaraVoidCoopSpawnHunterKillers`(目标效果技能 / CAbilEffectTarget)、`ZagaraVoidCoopSpawnMutalisk`(目标效果技能 / CAbilEffectTarget)、`ZagaraVoidCoopTransfusionWave`(瞬发效果技能 / CAbilEffectInstant)、`ZagaraVoidCoopWildInfestation`(目标效果技能 / CAbilEffectTarget)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`HeroCCImmunity`、`HeroicFortitude`、`KerriganUnburrowedDummy`、`KerriganVeterancyDummy`、`ZagaraVoidCoopCreepMasterRegen`
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
| 2,4 | `ZagaraVoidCoopBurrow` | `ZagaraVoidCoopBurrow,Execute` | 变形技能 / CAbilMorph | - | - | - |
