# 阿巴瑟（自定义 Mod）接入整理

日期：2026-05-27

## 当前口径

本文件整理的不是官方合作指挥官阿巴瑟，而是嵌套 Mod：

```text
D:\MyWork\新建文件夹\mom.report.client\src\MyMod\crys_the_swarm_reborn.SC2Mod\crys_the_swarm_reborn.SC2Mod
```

主要来源：

```text
crys_the_swarm_reborn.SC2Mod/Base.SC2Data/GameData/UnitData.xml
crys_the_swarm_reborn.SC2Mod/Base.SC2Data/GameData/AbilData.xml
crys_the_swarm_reborn.SC2Mod/Base.SC2Data/GameData/UpgradeData.xml
crys_the_swarm_reborn.SC2Mod/Base.SC2Data/GameData/RequirementData.xml
crys_the_swarm_reborn.SC2Mod/Base.SC2Data/Lib48DF4533.galaxy
crys_the_swarm_reborn.SC2Mod/zhCN.SC2Data/LocalizedData/GameStrings.txt
crys_the_swarm_reborn.SC2Mod/zhCN.SC2Data/LocalizedData/ObjectStrings.txt
```

不要把这份和 `docs/newdocs/指挥官细化/01-阿巴瑟-Abathur.md` 混用。官方阿巴瑟走 `游戏数据/官方合作指挥官/commanders/Abathur/`；这里的自定义阿巴瑟以 nested mod 的 Catalog 和 `Lib48DF4533` 为准。

这个重生阿巴瑟没有官方合作指挥官那套 `15 级 / 6 精通 / 3 威望` 进度体系。它靠 `Commanders/Commander = Abathur`、`Abathur` runtime upgrade、`Evolutions/<族系>` bank 和 `Triggers` 内的单位替换/能力补挂运行，所以文档必须按“自定义 bank + trigger 闭包”理解，而不是反推官方 coop progression。

本地 bank 名称是 `cryswarmcoop`，`DocumentInfo` 里的内部依赖名是 `Mods\sibirens_sundries_swarm_reborn.SC2Mod`。

## 单位继承原则

后续这个自定义阿巴瑟里新增或整理单位时，优先采用“继承/派生”而不是直接改共享原型单位：

- 新单位优先用 `parent=...` 派生自原型单位，再覆盖自己的 `AbilArray`、`CardLayouts`、`BehaviorArray`、`WeaponArray`。
- 如果同一族系要给不同指挥官或不同阶段做变体，用自己的单位 ID 和自己的 bank/trigger 映射，不要直接改别的指挥官共享的基础单位。
- 共享原型只保留必要的通用数据，所有指挥官专属按钮、技能补挂、变异路线尽量挂在派生单位或进入地图后补挂的 trigger 上。
- 这样后续即使继续加阿巴瑟变体，也不容易把别的指挥官的兵种一起污染掉。

## 实现入口

| 项 | 位置 | 说明 |
|---|---|---|
| 指挥官选择 | `Lib48DF4533.galaxy:16440` | 点击 Abathur 按钮后写 Bank：`Commanders/Commander = Abathur` |
| 随机指挥官 | `Lib48DF4533.galaxy:4962` | Random 可能写入 `Abathur` |
| 指挥官升级开关 | `Lib48DF4533.galaxy:5010` | 读取 Bank 后给玩家设置 `Abathur` upgrade |
| 重生阿巴瑟运行时 | `Lib48DF4533.galaxy:10971` | `lib48DF4533_gt_Abathur`，按玩家 `Abathur` upgrade 挂接重生阿巴瑟技能和单位能力 |
| 新单位能力补挂 | `Lib48DF4533.galaxy:11122` | `lib48DF4533_gt_AbathurAbilities`，单位进入地图后按类型 `UnitAbilityAdd` |
| 进化选择面板 | `Lib48DF4533.galaxy:17169` | 写 `Evolutions/<单位族系>` Bank，用于不同地图/阶段解锁变体 |
| 突变解锁快捷 | `Lib48DF4533.galaxy:15536` | `-mutations` 会一次性设置多项突变和爬虫升级 |

## 指挥官兵种

### 重生阿巴瑟处理的族系

这些是 `lib48DF4533_gt_Abathur` 和 `lib48DF4533_gt_AbathurAbilities` 按 `Abathur` upgrade 处理的重生阿巴瑟单位族系。

| 族系 | 单位 ID | 初始化追加能力 |
|---|---|---|
| 跳虫 | `Zergling`, `Pygalisk`, `HotSRaptor`, `HotSSwarmling`, `ZerglingToxic` | `ArmoredCarapace`, `KetamineInfusion`, `Kleptomania`, `Moonrage`, `Stealthling` |
| 王虫 | `Overlord`, `Overseer` | `OverlordRadar`, `OverlordZerglings`, `OverlordGun`, `OverlordGirth`, `OverlordZoomies` |
| 毒爆 | `Baneling`, `BileTitan`, `FrostFiend`, `HotSHunter`, `HotSSplitterlingBig` | `BanelingCreep`, `BanelingNuke`, `BanelingShields`, `BanelingSpeed`, `BanelingZerglings` |
| 刺蛇 | `Hydralisk`, `HydraliskImpaler`, `HydraliskLurker`, `HunterKiller`, `Hydralisk2` | `HydraliskBroodlings`, `HydraliskCripple`, `HydraliskMechanical`, `HydraliskMelee`, `HydraliskRange` |
| 蟑螂 | `Roach`, `RoachCorpser`, `Igniter`, `Ravager`, `RoachVile` | `AdrenalineOverdose`, `BanelingGestation`, `BileShield`, `MeleeStrain`, `RoachlingInfestation` |

### 进化候选

`EvolutionsButtons` 通过 Bank 保存玩家选择，不是简单的官方合作 roster。后续接入时应做成 `CustomCommanderEvolutionProfile`。

| 族系 | Bank key | 候选值 | 典型单位 |
|---|---|---|---|
| 跳虫 | `Evolutions/Zergling` | `Raptorling`, `Swarmling`, `Pygalisk`, `Toxic` | `HotSRaptor`, `HotSSwarmling`, `Pygalisk`, `ZerglingToxic` |
| 毒爆 | `Evolutions/Baneling` | `Hunter`, `Splitter`, `Frost Fiend`, `Bile Titan` | `HotSHunter`, `HotSSplitterlingBig`, `FrostFiend`, `BileTitan` |
| 蟑螂 | `Evolutions/Roach` | `Vile`, `Corpser`, `Igniter`, `Ravager` | `RoachVile`, `RoachCorpser`, `Igniter`, `Ravager` |
| 刺蛇 | `Evolutions/Hydralisk` | `Lurker`, `Impaler`, `Hunter-Killer`, `Toxic` | `HydraliskLurker`, `HydraliskImpaler`, `HunterKiller`, `Hydralisk2` |
| 飞龙 | `Evolutions/Mutalisk` | `Char`, `Mamba`, `Ankylos`, `Mesmer` | `MutaliskChar`, `Mamba`, `MutaliskAnkylos`, `Mesmer` |
| 宿主 | `Evolutions/Swarm Host` | `Carrion`, `Creeper`, `Bane`, `Vespid` | `SwarmHost`, `SwarmHostSplitA`, `SwarmHostSplitB`, `BaneHost`, `VespidHost` |
| 雷兽 | `Evolutions/Ultralisk` | `Torrasque`, `Noxious`, `Savage`, `Indra` | `Ultralisk`, `UltraliskSavage`, `UltraliskKaldir` |
| 巨型飞行单位 | `Evolutions/Monstrous Flier` | `Brood Lord`, `Guardian`, `Devourer`, `Kraken` | `BroodLord`, `IzshaGuardian`, `Devourer`, `Kraken` |
| 施法者 | `Evolutions/Caster` | `Infestor`, `Viper`, `Defiler` | `Infestor`, `Viper`, `DefilerMP` |

### 训练和生产线索

`LarvaTrainSwarm2` 已经包含大量变体训练项：

| Train | 单位 | 需求 |
|---|---|---|
| `Train1` | `Pygalisk`（幼雷兽） | `HaveSpawningPool` |
| `Train2` | `ZerglingToxic` | `HaveSpawningPool` |
| `Train3` | `FrostFiend` | `HaveBanelingNest` |
| `Train4` | `BileTitan` | `HaveBanelingNest` |
| `Train5` | `Igniter` | `HaveBanelingNest2` |
| `Train6` | `Ravager` | `HaveBanelingNest2` |
| `Train7` | `HunterKiller` | `HaveHydraliskDen` |
| `Train8` | `Hydralisk2` | `HaveHydraliskDen` |
| `Train9` | `MutaliskChar` | `HaveSpire` |
| `Train10` | `Mamba` | `HaveSpire` |
| `Train11` | `MutaliskAnkylos` | `HaveSpire` |
| `Train12` | `Mesmer` | `HaveSpire` |
| `Train13` | `BaneHost` | `HaveInfestationPit` |
| `Train14` | `VespidHost` | `HaveInfestationPit` |
| `Train15` | `UltraliskSavage` | `HaveUltraliskCavern` |
| `Train16` | `UltraliskKaldir` | `HaveUltraliskCavern` |
| `Train17` | `IzshaGuardian` | `HaveSpire` |
| `Train18` | `Kraken` | `HaveSpire` |
| `Train28` | `Omegalisk` | 无显式需求 |
| `Train29` | `Brutalisk` | 无显式需求 |
| `Train30` | `Leviathan` | 无显式需求 |

### 跳虫进化为幼雷兽

`Pygalisk` 是“幼雷兽”，属于跳虫系的高成本精英变体，不应只当作普通训练单位处理。

| 项 | 值 |
|---|---|
| 单位 ID | `Pygalisk` |
| 中文按钮 | `MorphtoPygalisk = 进化为幼雷兽` |
| 中文说明 | 幼雷兽耐久度远超其他跳虫变种，但伤害较低且成本高昂 |
| 资源成本 | `75` 矿、`25` 气 |
| 补给 | `2` |
| 生命 | `150` |
| 需求 | `HaveSpawningPool` |
| 阿巴瑟/虫群入口 | `LarvaTrainSwarm2,Train1`，时间 `27` |
| 其他共享入口 | `NaktulZerglingTrain,Train5`，时间 `24` |

接入时建议把它建成 `CustomCommanderEvolutionProfile`：

```text
Commander=AbathurCustom
UnitFamily=Zergling
SourceUnit=Zergling/Larva
TargetUnit=Pygalisk
Button=MorphtoPygalisk
AbilityCommand=LarvaTrainSwarm2,Train1
Requirement=HaveSpawningPool
CostMinerals=75
CostVespene=25
EvolutionKind=trainMorph
```

测试台需要额外验证 `extra_abathur_zergling_to_pygalisk`：资源足够时按钮可用、扣费正确、生成 `Pygalisk`，并确认幼雷兽保留跳虫系初始化追加能力。

## 指挥官建筑

### 常规虫族建筑

文档层建议先按虫族标准建筑处理：

```text
Hatchery / Lair / Hive
Extractor
SpawningPool
BanelingNest
RoachWarren
HydraliskDen
InfestationPit
Spire / GreaterSpire
UltraliskCavern
EvolutionChamber
SpineCrawler / SporeCrawler
NydusNetwork / NydusWorm
```

### 自定义建筑和特殊建筑

| 建筑 | 来源 | 说明 |
|---|---|---|
| `InfestedBarracks2` | `ZergBuild,Build26` | 按按钮 `MorphtoInfestedBarracks` 建造，说明文本为被感染步兵生产建筑 |
| `PrimalSunkenColony` | `ZergBuild,Build27` | 按按钮 `MutateintoImpalerColony` 建造，需要 `HaveEvolutionChamber`，中文为“穿刺者巢群” |
| `SpineCrawler` | `UnitData.xml:17067` | 基础地面防御，带自定义主动升级按钮 |
| `SporeCrawler` | `UnitData.xml:17085` | 基础防空防御，带自定义主动升级按钮 |

## 每单位购买升级

这是该自定义阿巴瑟最重要的接入点：不少单位把购买能力直接挂在自身 `AbilArray` 和命令卡上，而不是放到科技建筑统一研究。应建 `UnitPurchaseUpgradeProfile`，由单位自己声明可购买项。

| 单位 | 购买项 | 费用口径 |
|---|---|---|
| `Mutalisk`, `MutaliskChar`, `Mamba`, `Mesmer`, `MutaliskAnkylos` | `AbathurMutaliskExplosiveGlaivePurchase`（爆裂刃翼）、`AbathurMutaliskViciousGlaivePurchase`（凶暴刃翼）、`AbathurMutaliskRapidRegenerationPurchase`（快速再生） | 每项 `25/25`，1 次充能 |
| `HydraliskImpaler` | `AbathurImpalerArmorPiercingSpinesPurchase`（穿甲脊针）、`AbathurImpalerEarthveinGlidePurchase`（地脉滑移）、`AbathurImpalerAftershockImpalePurchase`（余震穿刺） | 每项 `50/50`，1 次充能 |
| `HydraliskLurker` | `AbathurLurkerRiftSpinesPurchase`（裂地棘线）、`AbathurLurkerStalkerGlidePurchase`（潜猎滑行）、`AbathurLurkerVenomAmbushPurchase`（毒腺伏袭） | 每项 `50/50`，1 次充能 |
| `SwarmHost`, `BaneHost`, `VespidHost` 及宿主变体 | `AbathurHostRapidIncubationPurchase`（快速孵化）、`AbathurHostLocustSpeedPurchase`（蝗群提速）、`AbathurHostPressurizedGlandsPurchase`（加压腺体） | 每项 `25/25`，1 次充能 |
| `Viper`, `Infestor`, `DefilerMP` 等施法者线 | `AbathurCasterBrainPoolPurchase`（增殖脑池）、`AbathurCasterNeuralTethersPurchase`（远距神经束）、`AbathurCasterFleshReactorPurchase`（血肉转炉）、`AbathurCasterMimeticMembranePurchase`（拟态隐膜） | 前三项 `25/25`，拟态隐膜 `50/50`，1 次充能 |
| `Queen` | `QueenFleshyAbundancePurchase`（无尽血肉）、`QueenNornQueenPurchase`（诺恩女王） | `25/25`、`50/50`，1 次充能 |
| `BroodLord` | `AbathurBroodLordDoubleSacOvipositionPurchase`（双囊产卵）、`AbathurBroodLordThickEmbryoMembranePurchase`（胚膜增厚）、`AbathurBroodLordParasiteFrenzyPurchase`（寄生狂潮） | 前两项 `50/50`，寄生狂潮 `50/50`，1 次充能 |
| `Devourer` | `AbathurDevourerAcidCloudSacsPurchase`（酸蚀云囊）、`AbathurDevourerCorrosiveGlandsPurchase`（腐骨腺）、`AbathurDevourerStomachOverloadPurchase`（胃囊过载） | 每项 `50/50`，1 次充能 |
| `IzshaGuardian` | `AbathurGuardianExtendedSpinesPurchase`（延展脊突）、`AbathurGuardianCorrosiveBombardmentPurchase`（腐蚀轰击）、`AbathurGuardianRegenerativeSacsPurchase`（再生浮囊） | 前两项 `50/50`，再生浮囊 `25/25`，1 次充能 |
| `Kraken` | `AbathurKrakenAcidBarragePurchase`（酸液连幕）、`AbathurKrakenOsteolyticAcidPurchase`（溶骨酸蚀）、`AbathurKrakenTitanicCarapacePurchase`（巨兽甲壳） | 前两项 `50/50`，巨兽甲壳 `100/100`，1 次充能 |
| `Brutalisk` | `BrutaliskTramplingCarapacePurchase`（践踏甲壳）、`BrutaliskSavageRendPurchase`（狂暴撕裂）、`BrutaliskFleshRecompositionPurchase`（血肉再编） | 每项 `100/100`，1 次充能 |
| `Ultralisk` | `UltraliskElectricShockPurchase`, `UltraliskHighVoltagePurchase`, `UltraliskLightningRaidPurchase`, `UltraliskThunderstormPurchase` | 依次约 `120/120`, `120/120`, `150/150`, `180/180`，1 次充能 |
| `Omegalisk` | `OmegaliskThickArmorPurchase`, `OmegaliskBattleCryPurchase`, `OmegaliskKingStrikePurchase`, `OmegaliskDeterrenceOrderPurchase` | `AbilData` 中为大型单位购买项，需实机确认是否归入 Abathur 还是通用巨兽线 |
| `Aberration` | `AberrationPlaguebearerPurchase`（瘟疫使者）、`AberrationMutagenicFissionPurchase`（诱变裂变）、`AberrationChaosSpawnPurchase`（混沌造物）、`AberrationImposingPresencePurchase`（畸变甲幕） | 每项 `50/50`，1 次充能；需确认是否为 Abathur 实际 roster |

## 基础防御建筑特殊升级

### 单位自身按钮

`SpineCrawler` 和 `SporeCrawler` 自身命令卡挂了主动购买/启用能力，不应只放进通用科技建筑。

| 建筑 | 按钮/能力 | 费用 | 说明 |
|---|---|---|---|
| `SpineCrawler` | `RagingTentacle`（狂怒触须） | `50/25` | 地刺专属攻击强化，效果 `CrawlerRagingTentacle` |
| `SpineCrawler`, `SporeCrawler` | `CloudofFlies`（爬虫蝇群） | `25/25` | 爬虫通用强化，效果 `CrawlerCloudofFlies` |
| `SpineCrawler`, `SporeCrawler` | `BroodlingInfestation`（爬虫幼体感染） | `25/25` | 爬虫通用强化，效果 `CrawlerBroodlingInfestation` |
| `SpineCrawler`, `SporeCrawler` | `Range`（爬虫射程） | `25/25` | 爬虫通用射程强化，效果 `CrawlerRange` |
| `SporeCrawler` | `AcidMortar`（酸液迫击炮） | `50/25` | 孢子爬虫专属攻击强化，效果 `CrawlerAcidMortar` |

### 科技建筑研究项

`EvolutionChamber` 的 `evolutionchamberresearch` 额外挂了三项爬虫研究。

| 研究项 | Upgrade | 按钮 | 费用/时间 | 效果摘要 |
|---|---|---|---|---|
| `Research20` | `CrawlerDefense` | `EvolveCrawlerPlating`（进化爬虫护甲） | `200/200`, `90s` | 设置 `SpineCrawler`/`SporeCrawler` 及 uprooted 形态生命和护甲 |
| `Research21` | `CrawlerSpeed` | `EvolveCrawlerAdaptivity`（进化爬虫适应力） | `200/200`, `90s` | 提高地刺/孢子、酸液迫击炮、狂怒触须等武器倍率，并缩短扎根/拔起时间 |
| `Research22` | `CrawlerCombatRegen` | `EvolveCrawlerRegeneration`（进化爬虫再生能力） | `200/200`, `90s` | 解锁战斗回复显示和需求 `CrawlerCombatRegen` |
| 快捷/突变 | `CrawlersSpawnBroodlings` | 无独立研究按钮已确认 | `-mutations` 可直接设置 | 把 `ImpalerTentacleLM` 的 impact effect 改为 `SpineCrawlerBroodlingSpawnSet` |

## 接入架构建议

### Profile 拆分

建议把自定义指挥官从官方 18 指挥官 JSON 生成链路拆出来：

```text
ExtraCommanderProfile
CustomCommanderInitializerProfile
CustomCommanderRosterProfile
CustomCommanderEvolutionProfile
UnitPurchaseUpgradeProfile
DefenseBuildingUpgradeProfile
DefenseBuildingResearchProfile
CommanderBankBindingProfile
```

关键字段：

```text
Commander = AbathurCustom
SourceMod = crys_the_swarm_reborn.SC2Mod
BankSection = Commanders / Evolutions / Mutations
RuntimeUpgrade = Abathur
UnitId
UnitFamily
PurchaseAbility
PurchaseButton
PurchaseEffect
Requirement
CostMinerals
CostVespene
Charges
Owner = unit | defense_building | tech_building | commander_initializer
AuditStatus
```

### 控制反转落点

1. 指挥官初始化器负责读取/设置 `Abathur` runtime upgrade，并注册 `AbathurAbilities` 类似的单位进入地图 hook。
2. 每个单位族系自己声明初始化追加能力，避免在地图初始化里写一堆 `if unit == ...`。
3. 每个可购买单位自己实现 `UnitPurchaseUpgradeProfile`，科技建筑只负责常规攻防和确实由建筑承载的研究项。
4. 防御塔走 `DefenseBuildingUpgradeProfile`，因为 `SpineCrawler/SporeCrawler` 同时有单位按钮和科技建筑研究，不能并入普通兵种科技。
5. 进化选择走 `CustomCommanderEvolutionProfile`，把 Bank 里的 `Evolutions/<族系>` 映射到实际单位、按钮、地图解锁条件。

## 测试台验证建议

在 CommanderTestBench 里给额外指挥官加一个 `AbathurCustom` profile：

| 场景 | 验证 |
|---|---|
| `extra_abathur_init` | 设置 `Commanders/Commander=Abathur` 或直接设置 runtime upgrade，执行初始化器，确认单位能力补挂 |
| `extra_abathur_roster` | 依次创建跳虫、毒爆、蟑螂、刺蛇、飞龙、宿主、雷兽、施法者、巨型飞行单位 |
| `extra_abathur_purchase` | 对每个带 `*Purchase` 的单位检查按钮、需求、费用、效果、购买后隐藏/禁用 |
| `extra_abathur_crawler` | 创建 `SpineCrawler`/`SporeCrawler`，验证单位按钮和 `CrawlerDefense/CrawlerSpeed/CrawlerCombatRegen` 研究 |
| `extra_abathur_evolution_bank` | 写入不同 `Evolutions/<族系>` 值后刷新单位清单，确认目标单位替换正确 |

建议日志：

```text
[XM_DBG][INFO][EXTRA_COMMANDER_INIT] commander=AbathurCustom runtimeUpgrade=Abathur result=ok
[XM_DBG][INFO][UNIT_PURCHASE] commander=AbathurCustom unit=HydraliskImpaler ability=AbathurImpalerArmorPiercingSpinesPurchase result=ok
[XM_DBG][INFO][CRAWLER_UPGRADE] commander=AbathurCustom building=SpineCrawler ability=RagingTentacle upgrade=unit_purchase result=ok
[XM_DBG][WARN][EXTRA_COMMANDER_AMBIGUOUS_OWNER] commander=AbathurCustom unit=Omegalisk reason=shared_or_unclear_owner result=needs-review
```

## 剩余风险

- `Abathur*Purchase`、`Izsha`、虫群进化 Bank 在该 mod 中有交叉，不能只按前缀判断最终归属。
- `Omegalisk`、`Aberration` 等大型或混合单位是否属于自定义 Abathur 的最终 roster，需要测试台按选择入口实机确认。
- `ButtonData.xml` 含少量非法 XML 字符，按钮名称优先从 `GameStrings.txt` 取；后续如果要自动生成文档，需要对 ButtonData 做容错解析。
- 目前是静态抽取，未启动 SC2 实机验证。真正接入 XMFinal 前，应至少跑 `extra_abathur_init`、`extra_abathur_purchase`、`extra_abathur_crawler` 三个冒烟场景。
