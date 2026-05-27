# 扎加拉（Zagara）指挥官细化

日期：2026-05-27

## 当前口径

当前指挥官默认 15 级，不从 1 级开始；精通默认 6 项全部 30 点；威望默认只取正面收益，不直接启用官方 `PlayerPrestige`。`initial` 只作为官方基础状态审计和差异对照，默认测试和玩法应看 `power_fusion` 最终状态。

本文件按 `docs/newdocs/模块拆分` 的 11 个模块整理 扎加拉。依据 `游戏数据/官方合作指挥官/commanders/Zagara/` 的 JSON 摘要生成；具体 Ability、Behavior、Weapon、Actor、Effect、Requirement 闭包仍需继续追 `references/sc2-build-96883-casc-export/` 或实机 `[XM_DBG]` 日志。

## 官方数据摘要

| 项 | 值 |
|---|---|
| CommanderId | `ZergZagara` |
| 中文名 | 扎加拉 |
| 默认升级 | `ZagaraCommander, K5TwoDrones, MasteryZagaraLarvaRatePassive` |
| 默认能力命令 | `ZagaraVoidCoopBanelingBarrage:, ZagaraVoidCoopMassFrenzy:, ZagaraVoidCoopSpawnHunterKillers:, ZergBuild:24, evolutionchamberresearch:19, evolutionchamberresearch:12, evolutionchamberresearch:13, evolutionchamberresearch:14` |
| 威望 ID | `CommanderPrestigeZagaraMaxSupply, CommanderPrestigeZagaraCorruptorsAberrations, CommanderPrestigeZagaraZagara` |
| heroes 数量 | 0 |
| roster 数量 | 8 |
| units 数量 | 5 |
| buildings 数量 | 3 |
| command card 对象数 | 8 |
| upgrades 数量 | 23 |
| source | `mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/userdata.xml` |

roster 样例：

```text
SporeCrawler, Baneling, Scourge, SwarmQueen, Corruptor, Aberration, SpineCrawler, Zergling
```

## 15 级解锁摘要

- 1: 无尽虫群
- 2: 感染空投
- 3: 幼虫注射
- 4: 爆蚊升级包
- 5: 新单位：胆汁喷射体
- 6: 跳虫升级包
- 7: 爆虫巢穴：哺育腔
- 8: 孕育爆虫和爆蚊
- 9: 进化腔升级包
- 10: 遮天蔽日
- 11: 爆虫巢穴升级包
- 12: 跳虫进化：裂变虫
- 13: 胆汁喷射体升级包
- 14: 爆虫进化：分裂虫
- 15: 虫母

## 模块索引

| 序号 | 模块 | 本文件章节 |
|---|---|---|
| 01 | 顶部技能栏 | `01. 顶部技能栏` |
| 02 | 英雄单位及其技能 | `02. 英雄单位及其技能` |
| 03 | 普通单位技能及其进化功能 | `03. 普通单位技能及其进化功能` |
| 04 | 初始化基地与特殊建筑 | `04. 初始化基地与特殊建筑` |
| 05 | 指挥官兵种 | `05. 指挥官兵种` |
| 06 | 指挥官精通 | `06. 指挥官精通` |
| 07 | 指挥官建筑 | `07. 指挥官建筑` |
| 08 | 科技建筑及其升级选项 | `08. 科技建筑及其升级选项` |
| 09 | 特定地图运输机空投单位 | `09. 特定地图运输机空投单位` |
| 10 | 指挥官特殊机制 | `10. 指挥官特殊机制` |
| 11 | 指挥官个性化机制 | `11. 指挥官个性化机制` |

## 01. 顶部技能栏

Owner：`CommanderPanelProfile`、`CommanderPanelAbilityProfile`、`CommanderPanelCooldownProfile`、`CommanderPanelChargeProfile`、`CommanderPanelTargetingProfile`、`CommanderPanelModifierProfile`。

### 面板/全局能力候选

| 来源 | 等级 | AbilityCmd | 关联升级 | 说明 |
|---|---|---|---|---|
| Lv13 胆汁喷射体升级包 | 13 | `SpawningPoolResearch:4` | `-` | 在分裂池中解锁新的研究项目： / 提高胆汁喷射体的轰炸射程。减少胆汁喷射体的轰炸冷却时间。 |
| Lv13 胆汁喷射体升级包 | 13 | `SpawningPoolResearch:5` | `-` | 在分裂池中解锁新的研究项目： / 提高胆汁喷射体的轰炸射程。减少胆汁喷射体的轰炸冷却时间。 |

### command card 命中

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 爆蚊 | `DetonateScourge` | 引爆 | `ScourgeDetonate,Execute` | - | 爆蚊轰炸当前区域，并对附近的敌方空军造成伤害。 |
| 跳虫 | `EvolveBileLauncherBombardmentCooldownLocked` | 进化快速轰炸 | `-` | ZagaraLevel13 | 该科技将在指挥官等级13时解锁。 |

实现备注：面板只注册 profile 和转发 caster，地图不得按 commander 写 if/else。精通和威望影响面板冷却/充能/费用时，由本模块接收最终 modifier。

## 02. 英雄单位及其技能

Owner：`CommanderHeroProfile`、`CommanderHeroModeProfile`、`CommanderHeroAbilityProfile`、`CommanderHeroSkillTreeProfile`、`CommanderHeroReviveProfile`、`CommanderHeroModifierProfile`。

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| - | - | - | - | - | 官方 heroes.json 未列出英雄条目；召唤物/形态/特殊英雄需从 progression、command_cards 或 CASC 继续追 |

### 英雄/形态候选

- 无尽虫群 (`Zagara`)
- 感染空投 (`ZagaraUnlockMassRoachDrop`)
- 新单位：胆汁喷射体 (`ZagaraUnlockBileLaunchers`)
- 爆虫巢穴：哺育腔 (`ZagaraBanelingNestSpawner`)
- 孕育爆虫和爆蚊 (`ZagaraBanelingIncubation`)
- 进化腔升级包 (`ZagaraAberrationUpgrades`)
- 遮天蔽日 (`ZagaraImprovedMassRoachDrop`)
- 跳虫进化：裂变虫 (`ZagaraZerglingEvo`)
- 爆虫进化：分裂虫 (`ZagaraBanelingEvo`)
- 虫母 (`ZagaraImprovedAbilities`)

口径：虫族小单位数量强化、免费/快速孵化和英雄光环需要单位与特殊机制协作。

待审计：Hero Unit、技能按钮、复活、形态切换、武器/Actor/Sound 闭包。

## 03. 普通单位技能及其进化功能

Owner：`CommanderUnitAbilityProfile`、`CommanderUnitStatProfile`、`CommanderUnitEvolutionProfile`、`CommanderUnitBehaviorProfile`、`CommanderUnitWeaponProfile`。

### 单位技能按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 畸变体 | `AberrationProtectiveCover` | 肉身掩体 | `-` | HaveAberrationArmorAura | 使身下的单位获得{Behavior,AberrationArmorAuraTarget,DamageResponse.ModifyFraction*100... |
| 畸变体 | `AberrationBanelingIncubationLocked` | 爆虫孕育 | `-` | ZagaraLevel08 | 该技能将在指挥官等级8时解锁。 |
| 爆虫 | `MoveHoldPosition` | 原地防御 | `move,HoldPos` | - | 命令选中的单位待在原地，并攻击射程内的敌方目标。接受命令的单位不会对敌人进行追击或移向敌人与其交战。 |
| 爆虫 | `MovePatrol` | 巡逻 | `move,Patrol` | - | 命令选中的单位在当前位置与目标区域间进行巡逻。巡逻的单位会对敌人发起攻击或移向附近的敌人与其交战。 |
| 爆虫 | `Explode` | 爆炸 | `Explode,Execute` | - | 使爆虫在原地自爆，对附近的敌方单位和建筑造成伤害。 |
| 爆虫 | `EnableBuildingAttack` | 开启对建筑攻击 | `VolatileBurstBuilding,On` | - | 允许爆虫自动将建筑视为攻击目标。 / 爆虫可对建筑造成{Effect,VolatileBurstU2,Amount}点伤害值。 |
| 爆虫 | `HaveCentrificalHooks` | 环心镰钩 | `-` | ZagaraHaveCentrificalHooks | 提高爆虫的移动速度。 |
| 爆虫 | `-` | - | `Explode,Execute` | - | - |
| 腐化者 | `MoveHoldPosition` | 原地防御 | `move,HoldPos` | - | 命令选中的单位待在原地，并攻击射程内的敌方目标。接受命令的单位不会对敌人进行追击或移向敌人与其交战。 |
| 腐化者 | `MovePatrol` | 巡逻 | `move,Patrol` | - | 命令选中的单位在当前位置与目标区域间进行巡逻。巡逻的单位会对敌人发起攻击或移向附近的敌人与其交战。 |
| 腐化者 | `CorruptionAbility` | 腐化 | `Corruption,Execute` | - | 用异虫黏液覆盖目标敌方单位，使其受到的伤害提高{Behavior,Corruption,DamageResponse.ModifyFraction*100... |
| 腐化者 | `BroodLord` | 变异为巢虫领主 | `MorphToBroodLord,Execute` | - | 大型飞行作战生物。通过投射出的巢虫来攻击目标。巢虫是一种可以对地的小型生物。 / 可以对地。 |
| 腐化者 | `CausticSpray` | 腐蚀喷液 | `CausticSpray,Execute` | - | 喷出一股强酸，每秒造成{Effect,CausticLevel1Damage,Amount/Effect,CausticSprayLevel1Persis... |
| 腐化者 | `CausticSpray` | 腐蚀喷液 | `CausticSpray,Execute` | - | 喷出一股强酸，每秒造成{Effect,CausticLevel1Damage,Amount/Effect,CausticSprayLevel1Persis... |
| 爆蚊 | `ScourgeSplashDamagePassive` | 剧毒孢子 | `-` | HaveScourgeSplashDamage | 爆蚊在死亡时在小范围内造成相当于它们攻击伤害一半的伤害。 |
| 爆蚊 | `DetonateScourge` | 引爆 | `ScourgeDetonate,Execute` | - | 爆蚊轰炸当前区域，并对附近的敌方空军造成伤害。 |
| 爆蚊 | `DisableBuildingAttackScourge` | 关闭对建筑攻击 | `SuicideBuilding,Off` | - | 阻止爆蚊自动将建筑视为攻击目标。爆蚊仍会接受明确的攻击建筑指令。 |
| 爆蚊 | `HaveScourgeGasCostReduction` | 简化基因组 | `-` | HaveScourgeGasCostReduction | 变异爆蚊所需消耗的高能瓦斯量减少50。 |
| 虫后 | `MoveHoldPosition` | 原地防御 | `move,HoldPos` | - | 命令选中的单位待在原地，并攻击射程内的敌方目标。接受命令的单位不会对敌人进行追击或移向敌人与其交战。 |
| 虫后 | `MovePatrol` | 巡逻 | `move,Patrol` | - | 命令选中的单位在当前位置与目标区域间进行巡逻。巡逻的单位会对敌人发起攻击或移向附近的敌人与其交战。 |
| 虫后 | `BioMechanicalTransfusionPassive` | 生物机械哺液 | `-` | HaveBioMechanicalTransfusionPassive | 速效哺液的治疗量提高10点，现在可以对机械单位和建筑使用。 |
| 虫后 | `BuildCreepTumor` | 产下菌毯肿瘤 | `QueenBuild,Build1` | - | 一种潜地的菌毯分泌腺体。菌毯能够为附近的异虫建筑提供给养。一颗菌毯肿瘤能够再分裂出一颗额外的菌毯肿瘤。 / 效果加成：异虫单位在菌毯上的移动速度更快 |
| 虫后 | `BioMechanicalTransfusion` | 速效哺液 | `BioMechanicalTransfusion,Execute` | - | 为一个单位或建筑进行持续的治疗，共恢复{Effect,QueenBurstHeal,VitalArray[Life].Change*(Behavior,Q... |
| 虫后 | `EvolveToBrutaliskLocked` | 进化为莽兽 | `-` | AbathurLevel02 | 该技能将在指挥官等级2时解锁。 |
| 虫后 | `BiomassPassiveEmpty` | 生物质搜集 | `-` | BiomassBuffEmptyVisible | 该单位可以通过击杀敌方单位搜集生物质来获得能量。 |
| 虫后 | `BuildCreepTumor` | 产下菌毯肿瘤 | `QueenBuild,Build3` | - | 一种潜地的菌毯分泌腺体。菌毯能够为附近的异虫建筑提供给养。一颗菌毯肿瘤能够再分裂出一颗额外的菌毯肿瘤。 / 效果加成：异虫单位在菌毯上的移动速度更快 |
| 虫后 | `QueenBurstHeal` | QueenBurstHeal | `QueenBurstHeal,Execute` | - | - |
| 虫后 | `DeepTunnel` | DeepTunnel | `DeepTunnel,Execute` | - | - |

### 进化/形态/切换候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 腐化者 | `BroodLord` | 变异为巢虫领主 | `MorphToBroodLord,Execute` | - | 大型飞行作战生物。通过投射出的巢虫来攻击目标。巢虫是一种可以对地的小型生物。 / 可以对地。 |
| 脊针爬虫 | `SpineCrawlerUproot` | 站起 | `SpineCrawlerUproot,Execute` | - | 使脊针爬虫站起。站起的脊针爬虫能够移动，但无法攻击。在菌毯上的移动速度大幅提升。 |
| 孢子爬虫 | `SporeCrawlerUproot` | 站起 | `SporeCrawlerUproot,Execute` | - | 使孢子爬虫站起。站起的孢子爬虫能够移动，但无法攻击。在菌毯上的移动速度大幅提升。 |
| 虫后 | `EvolveToBrutaliskLocked` | 进化为莽兽 | `-` | AbathurLevel02 | 该技能将在指挥官等级2时解锁。 |
| 跳虫 | `zerglingmovementspeed` | 进化代谢加速 | `SpawningPoolResearch,Research2` | - | 提高跳虫的移动速度。 |
| 跳虫 | `EvolveHardenedCarapaceZagaraLocked` | 进化硬化甲壳 | `-` | ZagaraLevel06 | 该科技将在指挥官等级6时解锁。 |
| 跳虫 | `EvolveZerglingArmorShredZagaraLocked` | 进化切割利爪 | `-` | ZagaraLevel06 | 该科技将在指挥官等级6时解锁。 |
| 跳虫 | `EvolveBileLauncherIncreasedRangeLocked` | 进化炮击导管 | `BuildInProgress,Cancel` | ZagaraLevel13 | 该科技将在指挥官等级13时解锁。 |
| 跳虫 | `EvolveBileLauncherBombardmentCooldownLocked` | 进化快速轰炸 | `-` | ZagaraLevel13 | 该科技将在指挥官等级13时解锁。 |

实现备注：单位自己声明技能、形态和升级接入口；科技建筑只展示符合条件的研究项，不直接拥有单位升级逻辑。

## 04. 初始化基地与特殊建筑

Owner：`CommanderRuntimeProfile`、`CommanderScenarioLoadout`、`CommanderSpecialStructureProfile`、`CommanderInitialCasterProfile`。

### 初始化建筑候选

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| - | - | - | - | - | 官方 buildings.json 未自动命中基地/补给/气矿类建筑；需要从地图初始化和 CASC 回补。 |

### 特殊建筑候选

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| - | - | - | - | - | 官方 buildings.json 未自动命中特殊建筑；特殊结构可能由触发器或隐藏 caster 创建。 |

实现备注：测试台切换指挥官时调用本指挥官 initializer，负责替换主基地、工人、运输机/投放单位、隐藏 caster 和特殊建筑。

## 05. 指挥官兵种

Owner：`CommanderRosterProfile`、`CommanderUnitProfile`、`CommanderUnitTrainProfile`、`CommanderUnitStageProfile`、`CommanderUnitRequirementProfile`。

来源：官方提取 `units.json`。这里列的是当前已提取 Catalog 对象；满级替换、威望正向融合或进化变体仍以 `power_fusion` 审计结果为准。

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 爆虫 | `Baneling` | `Baneling, BanelingNest` | Ground; Biological | 矿:50 气:25 人口字段:-0.5 生命:30 | 自毁型单位。爆炸时能够造成小范围的伤害。 / 可以对地。 |
| 爆蚊 | `Scourge` | `Scourge` | -; - | 矿:12 气:37 人口字段:- 生命:- | 自毁式飞行单位。一只幼虫可变异为两只爆蚊。 / 可以对空。 |
| 虫后 | `SwarmQueen` | `Queen, QueenCoop, SwarmQueen` | Ground; Biological/Psionic | 矿:175 气:- 人口字段:-2 生命:175 | 支援单位。可以使用孵化菌毯肿瘤和速效哺液技能。 / 可以对地和对空。 |
| 腐化者 | `Corruptor` | `Corruptor` | Air; Armored/Biological | 矿:150 气:100 人口字段:-2 生命:200 | 对空型飞行生物。可以使用腐蚀喷液。能够变异为巢虫领主。 / 可以对空。 |
| 畸变体 | `Aberration` | `InfestedAbomination` | -; - | 矿:- 气:- 人口字段:- 生命:- | 畸变体可以造成很高的伤害，同时也可以承受大量的伤害。 / 可以对地。 |

三阶段口径：`initial` 只做审计，`level15` 表示满级解锁，`power_fusion` 表示 15 级 + 六精通全满 + 威望正向收益后的默认运行清单。

## 06. 指挥官精通

Owner：`CommanderMasteryProfile`、`CommanderMasteryEffectProfile`、`CommanderMasteryModifierProfile`。

| 组 | 名称 | Upgrade | 每点 | 30点口径 |
|---|---|---|---|---|
| 1 | 生命值和能量回复速度 | `MasteryZagaraHealthAndEnergyRegen` | 1 | +30% |
| 1 | 自动攻击伤害 | `MasteryZagaraAutoAttackDamage` | 1 | +30伤害 |
| 2 | 群体狂暴速度提升 | `MasteryZagaraMassFrenzySpeedBoost` | 1.5 | +45% |
| 2 | 跳虫躲闪几率 | `MasteryZagaraZerglingDodgeChance` | 1.5 | +45% |
| 3 | 空投蟑螂伤害和生命值 | `MasteryZagaraRoachDropDamageAndHealth` | 2 | +60% |
| 3 | 爆虫伤害 | `MasteryZagaraBanelingsDamage` | 1 | +30伤害 |

实现备注：当前默认六项全部 30 点。表里的 30 点口径由 `point_increments * 30` 推导，最终数值仍需以 Upgrade Effect 闭包验证。

## 07. 指挥官建筑

Owner：`CommanderBuildingProfile`、`CommanderBuildingAbilityProfile`、`CommanderBuildingTrainProfile`、`CommanderBuildingStageProfile`、`CommanderBuildingBehaviorProfile`。

来源：官方提取 `buildings.json`。

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 孢子爬虫 | `SporeCrawler` | `SporeCrawler` | Ground; Armored/Biological/Structure | 矿:125 气:- 人口字段:- 生命:300 | 防空建筑。 / 可以对空 / 侦测单位 |
| 脊针爬虫 | `SpineCrawler` | `SpineCrawler` | Ground; Armored/Biological/Structure | 矿:150 气:- 人口字段:- 生命:300 | 对地防御建筑。 / 可以对地。 |
| 跳虫 | `Zergling` | `SpawningPool, Zergling` | Ground; Armored/Biological/Structure | 矿:250 气:- 人口字段:- 生命:1000 | 迅捷的肉搏型生物。可以变异为爆虫。 / 可以对地。 |

### 建筑按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 脊针爬虫 | `AttackBuilding` | 攻击 | `attack,Execute` | - | 锁定并且攻击目标，直到超出射程或对方被摧毁。 |
| 脊针爬虫 | `SpineCrawlerUproot` | 站起 | `SpineCrawlerUproot,Execute` | - | 使脊针爬虫站起。站起的脊针爬虫能够移动，但无法攻击。在菌毯上的移动速度大幅提升。 |
| 脊针爬虫 | `CancelBuilding` | 取消 | `BuildInProgress,Cancel` | - | 取消建造，摧毁尚未建造完成的建筑并返还部分资源。 |
| 孢子爬虫 | `AttackBuilding` | 攻击 | `attack,Execute` | - | 锁定并且攻击目标，直到超出射程或对方被摧毁。 |
| 孢子爬虫 | `SporeCrawlerUproot` | 站起 | `SporeCrawlerUproot,Execute` | - | 使孢子爬虫站起。站起的孢子爬虫能够移动，但无法攻击。在菌毯上的移动速度大幅提升。 |
| 孢子爬虫 | `Detector` | 侦测单位 | `-` | NotUnderConstruction | 该单位能够侦测到隐形、潜地和幻像单位。 |
| 孢子爬虫 | `CancelBuilding` | 取消 | `BuildInProgress,Cancel` | - | 取消建造，摧毁尚未建造完成的建筑并返还部分资源。 |
| 跳虫 | `zerglingmovementspeed` | 进化代谢加速 | `SpawningPoolResearch,Research2` | - | 提高跳虫的移动速度。 |
| 跳虫 | `EvolveHardenedCarapaceZagaraLocked` | 进化硬化甲壳 | `-` | ZagaraLevel06 | 该科技将在指挥官等级6时解锁。 |
| 跳虫 | `EvolveZerglingArmorShredZagaraLocked` | 进化切割利爪 | `-` | ZagaraLevel06 | 该科技将在指挥官等级6时解锁。 |
| 跳虫 | `PassiveBileLauncherLocked` | 胆汁喷射体 | `-` | ZagaraLevel05 | 该单位将在指挥官等级5时解锁。 |
| 跳虫 | `EvolveBileLauncherIncreasedRangeLocked` | 进化炮击导管 | `BuildInProgress,Cancel` | ZagaraLevel13 | 该科技将在指挥官等级13时解锁。 |
| 跳虫 | `EvolveBileLauncherBombardmentCooldownLocked` | 进化快速轰炸 | `-` | ZagaraLevel13 | 该科技将在指挥官等级13时解锁。 |
| 跳虫 | `CancelBuilding` | 取消 | `BuildInProgress,Cancel` | - | 取消建造，摧毁尚未建造完成的建筑并返还部分资源。 |

实现备注：建筑声明自身生产、研究、行为和阶段；训练单位的最终可用性由兵种/科技/精通/威望共同裁决。

## 08. 科技建筑及其升级选项

Owner：`CommanderTechBuildingProfile`、`CommanderUnitTechProfile`、`CommanderUpgradeProfile`、`CommanderUpgradeRequirementProfile`、`CommanderUpgradeEffectProfile`。

### 15 级解锁与研究命令

| 等级 | 名称 | 解锁升级 | 解锁 AbilityCmd | 说明 |
|---|---|---|---|---|
| 1 | 无尽虫群 | `-` | `-` | 扎加拉的补给上限为100，但她的作战单位消耗更少的资源并可更快孵化。一次可孵化两只工蜂。虫后只占用1点人口补给。幼虫孵化速度提高。 |
| 2 | 感染空投 | `-` | `ZagaraVoidCoopMassRoachDrop:` | 扎加拉可以在地图上的任何位置空投有限时生命的蟑螂。空投囊在着陆时会造成伤害。 |
| 3 | 幼虫注射 | `QueenDoubleInjectLarva` | `-` | 虫后的孵化幼虫技能孵化的幼虫数量由4个提高到8个。 |
| 4 | 爆蚊升级包 | `-` | `ScourgeNestResearch:, ScourgeNestResearch:1, ScourgeDetonate:` | 在爆蚊巢穴中解锁新的研究项目： / 爆蚊死后会对小范围内造成相当于它们50%攻击力的伤害。变异爆蚊所需的高能瓦斯数量减少50点。 |
| 5 | 新单位：胆汁喷射体 | `ZagaraBileLaunchers` | `-` | 解锁将工蜂变异为胆汁喷射体的能力，这是一种可对地面和空中目标造成范围伤害的防御建筑。 |
| 6 | 跳虫升级包 | `-` | `SpawningPoolResearch:2, SpawningPoolResearch:3` | 在分裂池中解锁新的研究项目： / 跳虫最大生命值提高10点。跳虫的攻击会使目标的护甲值降低到0，持续10秒。 |
| 7 | 爆虫巢穴：哺育腔 | `ZagaraVoidCoopBanelingSpawner` | `-` | 爆虫巢穴会周期性地孵化免费的爆虫。 |
| 8 | 孕育爆虫和爆蚊 | `ZagaraVoidCoopAberrationBanelingIncubation` | `-` | 畸变体死亡时，它们的尸体上会孵化出2只爆虫。腐化者死亡时会孵化2只爆蚊。 |
| 9 | 进化腔升级包 | `-` | `evolutionchamberresearch:22, evolutionchamberresearch:9` | 在进化腔中解锁新的研究项目： / 扎加拉的攻击可造成范围伤害。溅射主目标附近的敌人。畸变体使位于他们下方的单位获得50%伤害减免。 |
| 10 | 遮天蔽日 | `ZagaraVoidCoopImprovedMassRoachDrop` | `-` | 感染空投所空投的蟑螂总量由10个提高到20个。 |
| 11 | 爆虫巢穴升级包 | `-` | `BanelingNestResearch:2, BanelingNestResearch:3` | 在爆虫巢穴中解锁新的研究项目： / 爆虫对主目标的伤害提高100%。溅射伤害保持原样。爆虫的溅射范围提高50%。 |
| 12 | 跳虫进化：裂变虫 | `CoopZerglingSwarmling` | `-` | 将扎加拉的跳虫升级为裂变虫变种。 / 迅捷的肉搏型生物。一次可孵化三个。几乎立即变异。可变异为爆虫。 / 可以对地。 |
| 13 | 胆汁喷射体升级包 | `-` | `SpawningPoolResearch:4, SpawningPoolResearch:5` | 在分裂池中解锁新的研究项目： / 提高胆汁喷射体的轰炸射程。减少胆汁喷射体的轰炸冷却时间。 |
| 14 | 爆虫进化：分裂虫 | `CoopBanelingSplitterling` | `-` | 将扎加拉的爆虫进化为分裂虫变种。 / 自毁型单位。死亡时能够造成小范围的伤害。在其死后分裂成若干个小单位。 / 可以对地。 |
| 15 | 虫母 | `ZagaraVoidCoopImprovedAbilities` | `-` | 扎加拉的爆虫冲锋和召唤屠猎者技能的能量消耗降低50%。 / 爆虫冲锋和召唤屠猎者的单位数量提高50%。 |

### Upgrade 摘要

| Upgrade | 父级 | 显示名 | Effect数 | 说明 |
|---|---|---|---|---|
| `CommanderPrestigeZagaraCorruptorsAberrations` | `CommanderPrestige` | 构造体之母 | 16 | 优点 / 畸变体和腐化者的消耗降低25%，生命值提高50%，并且生命值恢复速度大幅提高。 / 缺点 / 没有免费的爆虫。 |
| `CommanderPrestigeZagaraMaxSupply` | `CommanderPrestige` | 爆蚊虫后 | 8 | 优点 / 最大补给上限提高50。孵化跳虫和爆蚊时，每个虫卵可以额外孵化一个单位。爆虫巢穴可以额外孵化4个免费的爆虫，爆蚊巢穴可以额外孵化4个免费的爆蚊。 / 缺点... |
| `CommanderPrestigeZagaraMaxSupplyScourgeCostUpgrade` | `CommanderPrestige` | - | 1 | - |
| `CommanderPrestigeZagaraZagara` | `CommanderPrestige` | 顶级掠食者 | 18 | 优点 / 扎加拉的技能冷却时间缩短，生命值和能量回复速度提高，并且可以进入深槽虫道。 / 缺点 / 群体狂暴只能影响扎加拉和她召唤的单位。战斗单位的消耗提高25%。 |
| `CommanderPrestigeZagaraZagaraMastery` | `CommanderPrestige` | - | 4 | - |
| `CoopBanelingSplitterling` | `-` | Coop Baneling Splitterling | 0 | - |
| `CoopZerglingSwarmling` | `-` | Coop Zergling Swarmling | 0 | - |
| `K5TwoDrones` | `-` | - | 5 | 可以一次孵化两只工蜂。资源消耗和制造时间减少50%。 |
| `MasteryZagaraAutoAttackDamage` | `-` | 精通 扎加拉 自动攻击伤害 | 3 | 提高扎加拉的攻击伤害。 |
| `MasteryZagaraBanelingsDamage` | `-` | 精通 扎加拉 爆虫伤害 | 6 | 提高扎加拉的爆虫及其爆虫冲锋技能的伤害。 |
| `MasteryZagaraHealthAndEnergyRegen` | `-` | 精通 扎加拉 生命值和能量恢复 | 9 | 提高扎加拉和虫后的生命值与能量恢复。 |
| `MasteryZagaraLarvaRatePassive` | `-` | Zagara Larva Rate Passive | 1 | - |
| `MasteryZagaraMassFrenzySpeedBoost` | `-` | 专精扎加拉群体狂暴速度加成 | 3 | 提高群体狂暴的攻击速度和移动速度。 |
| `MasteryZagaraRoachDropDamageAndHealth` | `-` | 精通 扎加拉 蟑螂空投伤害和生命值 | 4 | 提高感染空投的伤害，以及每只蟑螂的生命值和伤害。 |
| `MasteryZagaraZerglingDodgeChance` | `-` | 专精扎加拉跳虫躲避几率 | 2 | 使跳虫有几率躲避一次攻击。 |
| `QueenDoubleInjectLarva` | `-` | Queen Double Inject Larva | 1 | - |
| `ScourgeGasCostReduction` | `-` | Simplified Genome | 1 | - |
| `ZagaraBileLaunchers` | `-` | Zagara Bile Launchers | 3 | - |
| `ZagaraCommander` | `-` | Commander - Zerg - Zagara | 156 | - |
| `ZagaraVoidCoopAberrationBanelingIncubation` | `-` | Zagara Void Coop Aberration Baneling Incubation | 0 | - |
| `ZagaraVoidCoopBanelingSpawner` | `-` | - | 0 | 爆虫巢穴自动孵化爆虫。 |
| `ZagaraVoidCoopImprovedAbilities` | `-` | Zagara Void Coop Improved Abilities | 4 | - |
| `ZagaraVoidCoopImprovedMassRoachDrop` | `-` | Zagara Void Coop Improved Infested Drop | 1 | - |

### 研究/升级按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 跳虫 | `zerglingmovementspeed` | 进化代谢加速 | `SpawningPoolResearch,Research2` | - | 提高跳虫的移动速度。 |
| 跳虫 | `EvolveHardenedCarapaceZagaraLocked` | 进化硬化甲壳 | `-` | ZagaraLevel06 | 该科技将在指挥官等级6时解锁。 |
| 跳虫 | `EvolveZerglingArmorShredZagaraLocked` | 进化切割利爪 | `-` | ZagaraLevel06 | 该科技将在指挥官等级6时解锁。 |
| 跳虫 | `EvolveBileLauncherIncreasedRangeLocked` | 进化炮击导管 | `BuildInProgress,Cancel` | ZagaraLevel13 | 该科技将在指挥官等级13时解锁。 |
| 跳虫 | `EvolveBileLauncherBombardmentCooldownLocked` | 进化快速轰炸 | `-` | ZagaraLevel13 | 该科技将在指挥官等级13时解锁。 |

实现备注：科技建筑只负责展示/触发研究；每个单位升级效果由对应 `CommanderUnitTechProfile` 或 `CommanderUpgradeEffectProfile` 声明。

## 09. 特定地图运输机空投单位

Owner：`CommanderCargoLoadoutProfile`、`CommanderMapDropProfile`、`CommanderScenarioFallbackProfile`。

### 运输/空投能力候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| - | - | - | - | - | 未自动命中运输/空投命令；地图运输机清单需使用 power_fusion roster 生成。 |

### 可投放单位候选

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 爆虫 | `Baneling` | `Baneling, BanelingNest` | Ground; Biological | 矿:50 气:25 人口字段:-0.5 生命:30 | 自毁型单位。爆炸时能够造成小范围的伤害。 / 可以对地。 |
| 爆蚊 | `Scourge` | `Scourge` | -; - | 矿:12 气:37 人口字段:- 生命:- | 自毁式飞行单位。一只幼虫可变异为两只爆蚊。 / 可以对空。 |
| 虫后 | `SwarmQueen` | `Queen, QueenCoop, SwarmQueen` | Ground; Biological/Psionic | 矿:175 气:- 人口字段:-2 生命:175 | 支援单位。可以使用孵化菌毯肿瘤和速效哺液技能。 / 可以对地和对空。 |
| 腐化者 | `Corruptor` | `Corruptor` | Air; Armored/Biological | 矿:150 气:100 人口字段:-2 生命:200 | 对空型飞行生物。可以使用腐蚀喷液。能够变异为巢虫领主。 / 可以对空。 |
| 畸变体 | `Aberration` | `InfestedAbomination` | -; - | 矿:- 气:- 人口字段:- 生命:- | 畸变体可以造成很高的伤害，同时也可以承受大量的伤害。 / 可以对地。 |

实现备注：运输机空投不要读取地图硬编码单位组，应从 `CommanderCargoLoadoutProfile` 读取当前 commander 的 `power_fusion` 单位清单和场景过滤规则。

## 10. 指挥官特殊机制

Owner：`CommanderSpecialMechanicProfile`、`CommanderSpecialResourceProfile`、`CommanderSpecialMechanicHookProfile`、`CommanderSpecialMechanicUnitProfile`。

本指挥官重点：扎加拉英雄、虫群数量、爆虫/腐化巢强化是主特殊机制。

### 特殊机制命中项

- 感染空投 (`ZagaraUnlockMassRoachDrop`)
- 遮天蔽日 (`ZagaraImprovedMassRoachDrop`)

### 特殊机制 Upgrade 候选

- 精通 扎加拉 蟑螂空投伤害和生命值 (`MasteryZagaraRoachDropDamageAndHealth`)
- Zagara Void Coop Improved Infested Drop (`ZagaraVoidCoopImprovedMassRoachDrop`)

### 特殊机制按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 虫后 | `BuildCreepTumor` | 产下菌毯肿瘤 | `QueenBuild,Build1` | - | 一种潜地的菌毯分泌腺体。菌毯能够为附近的异虫建筑提供给养。一颗菌毯肿瘤能够再分裂出一颗额外的菌毯肿瘤。 / 效果加成：异虫单位在菌毯上的移动速度更快 |
| 虫后 | `BiomassPassiveEmpty` | 生物质搜集 | `-` | BiomassBuffEmptyVisible | 该单位可以通过击杀敌方单位搜集生物质来获得能量。 |
| 虫后 | `BuildCreepTumor` | 产下菌毯肿瘤 | `QueenBuild,Build3` | - | 一种潜地的菌毯分泌腺体。菌毯能够为附近的异虫建筑提供给养。一颗菌毯肿瘤能够再分裂出一颗额外的菌毯肿瘤。 / 效果加成：异虫单位在菌毯上的移动速度更快 |

实现备注：凡是涉及局内状态、资源、堆叠、全局计时器、隐藏 caster 的机制，都必须有 runtime hook 和 `[XM_DBG]` 日志。

## 11. 指挥官个性化机制

Owner：`CommanderPersonalMechanicProfile`、`CommanderPersonalMechanicEffectProfile`、`CommanderPersonalMechanicHookProfile`、`CommanderPersonalMechanicRequirementProfile`。

本指挥官重点：虫族小单位数量强化、免费/快速孵化和英雄光环需要单位与特殊机制协作。

### 威望正向融合输入

| 威望 ID | Primary Upgrade | 禁用单位 | 启用单位 | 禁用 Ability | 补充 Upgrade |
|---|---|---|---|---|---|
| `CommanderPrestigeZagaraMaxSupply` | `CommanderPrestigeZagaraMaxSupply` | `-` | `-` | `evolutionchamberresearch:19, evolutionchamberresearch:22` | `ZagaraMaxSupply1` |
| `CommanderPrestigeZagaraCorruptorsAberrations` | `CommanderPrestigeZagaraCorruptorsAberrations` | `-` | `-` | `ZagaraVoidCoopBanelingSpawnerTrain:, ZagaraVoidCoopBanelingSpawnerTrain:1, ZagaraVoidCoopBanelingSpawnerTrain:2` | `-` |
| `CommanderPrestigeZagaraZagara` | `CommanderPrestigeZagaraZagara` | `-` | `-` | `-` | `ZagaraZagara1` |

融合规则：只取正面收益，跳过负面代价、禁用项、费用/冷却/上限惩罚；不能直接启用官方 `PlayerPrestige`。禁用项在本表中保留是为了审计，不代表最终要执行。

## 强度融合规则

1. `XM_ApplyCommanderFullLevel`：应用 15 级全部解锁，补齐升级、能力命令、研究按钮和 roster 变化。
2. `XM_ApplyCommanderAllMasteries`：6 项精通全部按 30 点应用。
3. `XM_ApplyCommanderPrestigeEffects`：只取威望正面收益，跳过负面代价、禁用项、费用/冷却/上限惩罚。
4. `XM_RunCommanderPowerFusionHook`：只处理无法静态声明的行为，例如特殊资源、英雄形态、顶部技能联动。
5. `XM_VerifyCommanderPowerFusion`：输出 `[XM_DBG]` 验证日志。

## 测试台优先场景

```text
standard_base
full_buildings
level15_units
fusion_final_units
panel_smoke
hero_smoke
unit_ability_smoke
tech_smoke
cargo_smoke
special_mechanic_smoke
personal_mechanic_smoke
```

补充：需要排查官方基础差异时才跑 `initial_units`，不要把它当作默认玩法状态。

## `[XM_DBG]` 日志建议

```text
[XM_DBG][INFO][COMMANDER_PROFILE_LOAD] commander=Zagara levelMode=FullLevel15 masteryMode=AllSixMax rosterStage=power_fusion result=ok
[XM_DBG][INFO][POWER_FUSION_APPLY] commander=Zagara levelMode=FullLevel15 masteryMode=AllSixMax prestigeMode=SelectedPositive result=ok
[XM_DBG][INFO][ROSTER_LOAD] commander=Zagara stage=power_fusion units=5 buildings=3 result=ok
[XM_DBG][INFO][MODULE_VERIFY] commander=Zagara module=<01-11> profile=<profile> result=ok
[XM_DBG][WARN][CASC_AUDIT_REQUIRED] commander=Zagara module=<module> object=<object> result=needs-casc-audit
```

## 第一轮待审计项

- 顶部技能的 caster、按钮、冷却、充能、目标转发闭包。
- 英雄或特殊英雄的 Unit、Ability、Behavior、Weapon、Actor、Sound 闭包。
- `power_fusion` 最终 roster 与 `level15` roster 的新增、替换、变体关系。
- 6 项精通的真实作用对象和最终数值。
- 3 个威望的正面收益、负面代价、disable/suppress、费用/冷却/上限变化。
- 科技建筑研究按钮、Requirement、Upgrade effect 是否完整。
- 特殊机制和个性化机制是否需要 runtime hook。
