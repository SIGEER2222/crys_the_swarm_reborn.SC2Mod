# 凯瑞甘（Kerrigan）指挥官细化

日期：2026-05-27

## 当前口径

当前指挥官默认 15 级，不从 1 级开始；精通默认 6 项全部 30 点；威望默认只取正面收益，不直接启用官方 `PlayerPrestige`。`initial` 只作为官方基础状态审计和差异对照，默认测试和玩法应看 `power_fusion` 最终状态。

本文件按 `docs/newdocs/模块拆分` 的 11 个模块整理 凯瑞甘。依据 `游戏数据/官方合作指挥官/commanders/Kerrigan/` 的 JSON 摘要生成；具体 Ability、Behavior、Weapon、Actor、Effect、Requirement 闭包仍需继续追 `references/sc2-build-96883-casc-export/` 或实机 `[XM_DBG]` 日志。

## 官方数据摘要

| 项 | 值 |
|---|---|
| CommanderId | `ZergKerrigan` |
| 中文名 | 凯瑞甘 |
| 默认升级 | `KerriganCommander, K5PrimalSlash, K5PsiStrike` |
| 默认能力命令 | `evolutionchamberresearch:19, evolutionchamberresearch:, evolutionchamberresearch:1, evolutionchamberresearch:2` |
| 威望 ID | `CommanderPrestigeKerriganCreep, CommanderPrestigeKerriganAbilities, CommanderPrestigeKerriganAssimilationAura` |
| heroes 数量 | 0 |
| roster 数量 | 9 |
| units 数量 | 5 |
| buildings 数量 | 4 |
| command card 对象数 | 9 |
| upgrades 数量 | 25 |
| source | `mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/userdata.xml` |

roster 样例：

```text
SporeCrawler, Broodlord, NydusNetwork, SwarmQueen, Hydralisk, SpineCrawler, Ultralisk, Zergling, MutaliskBroodlord
```

## 15 级解锁摘要

- 1: 变异甲壳
- 2: 定身波
- 3: 残酷无情
- 4: 跳虫升级包
- 5: 新单位：潜伏者
- 6: 刺蛇与潜伏者升级包
- 7: 恶变菌毯
- 8: 坑道虫欧米茄
- 9: 凯瑞甘升级包
- 10: 狂怒
- 11: 尖塔升级包
- 12: 跳虫进化：腾跃虫
- 13: 雷兽升级包
- 14: 雷兽进化：暴龙兽
- 15: 刀锋女王

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
| - | - | - | - | 官方 JSON 暂无 ability command，需从 CASC/实机面板补 |

### command card 命中

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 虫道网络 | `NydusCanalLoad` | 装载 | `NydusCanalTransport,Load` | - | 将单位装载进虫道网络。 |
| 跳虫 | `EvolveBileLauncherBombardmentCooldownLocked` | 进化快速轰炸 | `-` | ZagaraLevel13 | 该科技将在指挥官等级13时解锁。 |

实现备注：面板只注册 profile 和转发 caster，地图不得按 commander 写 if/else。精通和威望影响面板冷却/充能/费用时，由本模块接收最终 modifier。

## 02. 英雄单位及其技能

Owner：`CommanderHeroProfile`、`CommanderHeroModeProfile`、`CommanderHeroAbilityProfile`、`CommanderHeroSkillTreeProfile`、`CommanderHeroReviveProfile`、`CommanderHeroModifierProfile`。

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| - | - | - | - | - | 官方 heroes.json 未列出英雄条目；召唤物/形态/特殊英雄需从 progression、command_cards 或 CASC 继续追 |

### 英雄/形态候选

- 变异甲壳 (`Kerrigan`)
- 定身波 (`KerriganUnlockCrushingGripWave`)
- 残酷无情 (`KerriganImprovedLeapingStrike`)
- 恶变菌毯 (`KerriganMalignantCreep`)
- 凯瑞甘升级包 (`KerriganEvoUpgrades`)
- 狂怒 (`KerriganUnlockFury`)
- 跳虫进化：腾跃虫 (`KerriganZerglingEvo`)
- 雷兽进化：暴龙兽 (`KerriganUltraEvo`)
- 刀锋女王 (`KerriganImprovedEnergyRegen`)

口径：英雄技能、资源回收和虫族单位强化需要分到英雄、特殊资源、单位模块。

待审计：Hero Unit、技能按钮、复活、形态切换、武器/Actor/Sound 闭包。

## 03. 普通单位技能及其进化功能

Owner：`CommanderUnitAbilityProfile`、`CommanderUnitStatProfile`、`CommanderUnitEvolutionProfile`、`CommanderUnitBehaviorProfile`、`CommanderUnitWeaponProfile`。

### 单位技能按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 巢虫领主 | `MoveHoldPosition` | 原地防御 | `move,HoldPos` | - | 命令选中的单位待在原地，并攻击射程内的敌方目标。接受命令的单位不会对敌人进行追击或移向敌人与其交战。 |
| 巢虫领主 | `MovePatrol` | 巡逻 | `move,Patrol` | - | 命令选中的单位在当前位置与目标区域间进行巡逻。巡逻的单位会对敌人发起攻击或移向附近的敌人与其交战。 |
| 巢虫领主 | `SwarmSeeds` | 虫种 | `-` | - | 巢虫领主通过投射出的巢虫来攻击目标。巢虫是一种可以对地的小型生物。 / 可以对地。 |
| 巢虫领主 | `BroodlordSpeed` | 孔状软骨 | `-` | HaveBroodlordSpeed | 巢虫领主的移动速度提高{$UpgradeEffectArrayValue:KerriganVoidCoopBroodlordSpeed:Unit,Broo... |
| 刺蛇 | `MoveHoldPosition` | 原地防御 | `move,HoldPos` | - | 命令选中的单位待在原地，并攻击射程内的敌方目标。接受命令的单位不会对敌人进行追击或移向敌人与其交战。 |
| 刺蛇 | `MovePatrol` | 巡逻 | `move,Patrol` | - | 命令选中的单位在当前位置与目标区域间进行巡逻。巡逻的单位会对敌人发起攻击或移向附近的敌人与其交战。 |
| 刺蛇 | `BuildLurkerLocked` | 变异为潜伏者 | `-` | KerriganLevel06 | 该单位将在指挥官等级5时解锁。 |
| 刺蛇 | `HydraliskFrenzy` | 突击 | `HydraliskFrenzy,Execute` | - | 刺蛇向前突击，在短时间内大幅提升移动速度。 |
| 刺蛇 | `FrenzyLocked` | 狂暴 | `-` | KerriganLevel06 | 该技能将在指挥官等级6时解锁。 |
| 刺蛇 | `MuscularAugmentsCoop` | 肌腱扩增 | `-` | HaveGroovedSpines | 提高刺蛇的移动速度，并使其射程增加1。 |
| 异龙 | `SeveringGlave` | 削铁刃虫 | `-` | HaveKerriganSunderingGlaive | 异龙的每次后续弹射攻击不再降低伤害。 |
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
| 雷兽 | `MoveHoldPosition` | 原地防御 | `move,HoldPos` | - | 命令选中的单位待在原地，并攻击射程内的敌方目标。接受命令的单位不会对敌人进行追击或移向敌人与其交战。 |
| 雷兽 | `MovePatrol` | 巡逻 | `move,Patrol` | - | 命令选中的单位在当前位置与目标区域间进行巡逻。巡逻的单位会对敌人发起攻击或移向附近的敌人与其交战。 |
| 雷兽 | `EvolveChitinousPlating` | 进化骨板 | `-` | HaveUltraliskChitnousPlating | 雷兽的护甲提高{$UpgradeEffectArrayValue:ChitinousPlating:Unit,Ultralisk,LifeArmor$}点。 |
| 雷兽 | `EvolveAnabolicSynthesis2` | 进化合成代谢 | `-` | HaveUltraliskAnabolicSynthesis | 提高雷兽在菌毯外的移动速度。 |
| 雷兽 | `Frenzied` | 狂暴 | `-` | - | 免疫减速、昏迷、精神控制和位移效果。 |
| 雷兽 | `HaveChitinousPlating` | 骨板 | `-` | HaveHotSChitinousPlating | 使雷兽的护甲值提高2点。 |
| 雷兽 | `TissueAssimilation` | TissueAssimilation | `-` | HaveHotSTissueAssimilation | - |
| 雷兽 | `BurrowChargeCampaign` | BurrowChargeCampaign | `UltraliskBurrowCharge,Execute` | - | - |
| 雷兽 | `BurrowChargeLocked` | 潜地冲锋 | `-` | KerriganLevel13 | 该技能将在指挥官等级14时解锁。 |

### 进化/形态/切换候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 脊针爬虫 | `SpineCrawlerUproot` | 站起 | `SpineCrawlerUproot,Execute` | - | 使脊针爬虫站起。站起的脊针爬虫能够移动，但无法攻击。在菌毯上的移动速度大幅提升。 |
| 孢子爬虫 | `SporeCrawlerUproot` | 站起 | `SporeCrawlerUproot,Execute` | - | 使孢子爬虫站起。站起的孢子爬虫能够移动，但无法攻击。在菌毯上的移动速度大幅提升。 |
| 虫后 | `EvolveToBrutaliskLocked` | 进化为莽兽 | `-` | AbathurLevel02 | 该技能将在指挥官等级2时解锁。 |
| 雷兽 | `EvolveChitinousPlating` | 进化骨板 | `-` | HaveUltraliskChitnousPlating | 雷兽的护甲提高{$UpgradeEffectArrayValue:ChitinousPlating:Unit,Ultralisk,LifeArmor$}点。 |
| 雷兽 | `EvolveAnabolicSynthesis2` | 进化合成代谢 | `-` | HaveUltraliskAnabolicSynthesis | 提高雷兽在菌毯外的移动速度。 |
| 雷兽 | `BurrowChargeCampaign` | BurrowChargeCampaign | `UltraliskBurrowCharge,Execute` | - | - |
| 雷兽 | `BurrowChargeLocked` | 潜地冲锋 | `-` | KerriganLevel13 | 该技能将在指挥官等级14时解锁。 |
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
| 巢虫领主 | `Broodlord` | `BroodLord` | Air; Armored/Biological/Massive | 矿:300 气:250 人口字段:-4 生命:225 | 大型飞行作战生物。通过投射出的巢虫来攻击目标。巢虫是一种可以对地的小型生物。 / 可以对地。 |
| 虫后 | `SwarmQueen` | `Queen, QueenCoop, SwarmQueen` | Ground; Biological/Psionic | 矿:175 气:- 人口字段:-2 生命:175 | 支援单位。可以使用孵化菌毯肿瘤和速效哺液技能。 / 可以对地和对空。 |
| 刺蛇 | `Hydralisk` | `Hydralisk, HydraliskDen` | Ground; Biological/Light | 矿:100 气:50 人口字段:-2 生命:90 | 远程攻击单位。可以变异为潜伏者。 / 可以对地和对空。 |
| 雷兽 | `Ultralisk` | `Ultralisk, UltraliskCavern` | Ground; Armored/Biological/Massive | 矿:275 气:200 人口字段:-6 生命:500 | 重型攻击猛兽，可造成范围伤害。 / 可以对地。 |
| 异龙 | `MutaliskBroodlord` | `MutaliskBroodlord, Spire` | -; - | 矿:- 气:- 人口字段:- 生命:- | 能变异为巢虫领主： / 对地面单位进行远程攻击。孵化巢虫进行攻击。 |

三阶段口径：`initial` 只做审计，`level15` 表示满级解锁，`power_fusion` 表示 15 级 + 六精通全满 + 威望正向收益后的默认运行清单。

## 06. 指挥官精通

Owner：`CommanderMasteryProfile`、`CommanderMasteryEffectProfile`、`CommanderMasteryModifierProfile`。

| 组 | 名称 | Upgrade | 每点 | 30点口径 |
|---|---|---|---|---|
| 1 | 能量恢复 | `MasteryKerriganEnergyRegen` | 1.5 | +45% |
| 1 | 自动攻击伤害 | `MasteryKerriganAutoAttackDamage` | 1 | +30伤害 |
| 2 | 部队瓦斯消耗 | `MasteryKerriganArmyGasCost` | 1 | -30% |
| 2 | 定身波伤害 | `MasteryKerriganImmobilizationWaveDamage` | 3.3332 | +99.99600000000001% |
| 3 | 研究速度和消耗降低 | `MasteryKerriganResearchSpeedandCost` | 2 | -60%消耗 |
| 3 | 主要技能伤害和攻击速度 | `MasteryKerriganPrimarySpeedDamage` | 1 | 30% |

实现备注：当前默认六项全部 30 点。表里的 30 点口径由 `point_increments * 30` 推导，最终数值仍需以 Upgrade Effect 闭包验证。

## 07. 指挥官建筑

Owner：`CommanderBuildingProfile`、`CommanderBuildingAbilityProfile`、`CommanderBuildingTrainProfile`、`CommanderBuildingStageProfile`、`CommanderBuildingBehaviorProfile`。

来源：官方提取 `buildings.json`。

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 孢子爬虫 | `SporeCrawler` | `SporeCrawler` | Ground; Armored/Biological/Structure | 矿:125 气:- 人口字段:- 生命:300 | 防空建筑。 / 可以对空 / 侦测单位 |
| 虫道网络 | `NydusNetwork` | `NydusNetwork` | Ground; Armored/Biological/Structure | 矿:200 气:150 人口字段:- 生命:850 | 友方地面部队可以迅速在玩家拥有的虫道网络和坑道虫之间穿梭。 / 开启： / - 坑道虫 |
| 脊针爬虫 | `SpineCrawler` | `SpineCrawler` | Ground; Armored/Biological/Structure | 矿:150 气:- 人口字段:- 生命:300 | 对地防御建筑。 / 可以对地。 |
| 跳虫 | `Zergling` | `SpawningPool, Zergling` | Ground; Armored/Biological/Structure | 矿:250 气:- 人口字段:- 生命:1000 | 迅捷的肉搏型生物。可以变异为爆虫。 / 可以对地。 |

### 建筑按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 虫道网络 | `SummonNydusWorm` | 召唤坑道虫 | `BuildNydusCanal,Build1` | - | 在目标地点召唤一条坑道虫。友方地面单位可借助虫道网络在任何该玩家拥有的坑道虫或虫道网络间穿梭。生成菌毯，可满足附近异虫建筑的存活需求。 / 效果加成：异虫... |
| 虫道网络 | `SummonNydusCanalAttacker` | 召唤虫道毁灭者 | `BuildNydusCanal,Build2` | - | 在目标位置召唤虫道毁灭者。 / 只能攻击建筑。 |
| 虫道网络 | `SummonNydusCanalCreeper` | 召唤菌塔 | `BuildNydusCanal,Build3` | - | 在目标位置召唤菌塔。菌塔可以向选中的方向发射菌毯。 / 额外加成：异虫单位在菌毯上移动速度更快。 |
| 虫道网络 | `SetRallyPoint` | 设定集结点 | `Rally,Rally1` | - | 将单位派往指定地点，派往资源点的工作单位会自动开始采集。 |
| 虫道网络 | `SummonNydusWorm` | 召唤坑道虫 | `BuildNydusCanal,Build1` | - | 在目标地点召唤一条坑道虫。友方地面单位可借助虫道网络在任何该玩家拥有的坑道虫或虫道网络间穿梭。生成菌毯，可满足附近异虫建筑的存活需求。 / 效果加成：异虫... |
| 虫道网络 | `NydusCanalLoad` | 装载 | `NydusCanalTransport,Load` | - | 将单位装载进虫道网络。 |
| 虫道网络 | `NydusWormIncreasedArmorPassive` | 钻地鳞片 | `-` | - | 坑道虫在从地面钻出时拥有{Behavior,NydusWormArmor,Modification.LifeArmorBonus+1}点护甲。 |
| 虫道网络 | `CancelBuilding` | 取消 | `BuildInProgress,Cancel` | - | 取消建造，摧毁尚未建造完成的建筑并返还部分资源。 |
| 虫道网络 | `-` | - | `RallyNydus,Rally1` | - | - |
| 虫道网络 | `ZagaraVoidCoopNydusWorm` | 召唤坑道虫 | `-` | - | 在目标位置召唤一只坑道虫。 / 友方地面单位可借助虫道网络在任何该玩家拥有的坑道虫或虫道网络间穿梭。生成菌毯，可满足附近异虫建筑的存活需求。 / 效果加成... |
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
| 1 | 变异甲壳 | `-` | `-` | 凯瑞甘在造成伤害时可暂时获得额外的生命值。凯瑞甘若被消灭，则能快速在孵化场处复活。 |
| 2 | 定身波 | `-` | `KerriganVoidCoopCrushingGripWave:` | 解锁凯瑞甘的定身波技能，对位于其周围的一个大范围内的敌人造成伤害并陷入昏迷。 |
| 3 | 残酷无情 | `KerriganVoidCoopImprovedLeapingStrike` | `-` | 凯瑞甘的跳击的伤害由150提高到300，施法距离由6提高到12。凯瑞甘的灵能位移的伤害由50提高至100。 |
| 4 | 跳虫升级包 | `-` | `SpawningPoolResearch:2, SpawningPoolResearch:3` | 在分裂池中解锁新的研究项目： / 跳虫最大生命值提高10点。跳虫的攻击会使目标的护甲值降低到0，持续10秒。 |
| 5 | 新单位：潜伏者 | `-` | `-` | 范围伤害伏击单位。必须潜地后才能发动攻击。由刺蛇变异而来。 / 可以对地。 |
| 6 | 刺蛇与潜伏者升级包 | `-` | `HydraliskDenResearch:4, HydraliskDenResearch:5, LurkerDenResearch:` | 在刺蛇巢和潜伏者巢穴中解锁以下升级： / 刺蛇的生命值由80提高到100。解锁刺蛇的狂暴技能，可使其在15秒内的攻击速度提高50%。潜伏者的射程由9提高到12。 |
| 7 | 恶变菌毯 | `K5CreepBonuses, KerriganCreepBonusesCoop` | `-` | 当处于菌毯上时，所有友方地面单位的攻击速度和生命恢复速度提高。提高菌毯肿瘤散布菌毯的速度和范围。 / 被动技能。 |
| 8 | 坑道虫欧米茄 | `VoidCoopGreaterNydusWorm` | `-` | 将虫道网络升级为虫道网络欧米茄，可召唤坑道虫欧米茄。坑道虫欧米茄无需消耗资源，能立即部署单位，且能被你的盟友使用。 / 被动技能。 |
| 9 | 凯瑞甘升级包 | `-` | `evolutionchamberresearch:20, evolutionchamberresearch:21` | 在进化腔中解锁以下升级： / 使凯瑞甘的攻击除了能对她的目标造成普通伤害外，还会跳跃到附近一个敌人身上。凯瑞甘的技能消耗和冷却时间降低20%。 |
| 10 | 狂怒 | `K5Fury` | `-` | 凯瑞甘的每次攻击都能提高自身10%的攻击速度，最多叠加到50%。 / 被动技能。 |
| 11 | 尖塔升级包 | `-` | `SpireResearch:7, SpireResearch:14` | 在尖塔和巨型尖塔中解锁以下升级： / 异龙的每次后续弹射攻击不再降低伤害。巢虫领主的移动速度提高75%，生命值提高+100点。 |
| 12 | 跳虫进化：腾跃虫 | `-` | `-` | 将凯瑞甘的跳虫升级为腾跃虫变种。 / 迅捷的肉搏型生物，可以越过障碍物迅速接近目标。造成更高的伤害。 / 可以对地。 |
| 13 | 雷兽升级包 | `-` | `UltraliskCavernResearch:3, UltraliskCavernResearch:4, UltraliskBurrowCharge:` | 在雷兽窟中解锁以下升级： / 解锁雷兽的潜地冲锋技能。雷兽会潜入地下并冲向一个敌方单位。升级雷兽的普通攻击，使其能将所造成伤害的40%转化为自身的治疗量。 |
| 14 | 雷兽进化：暴龙兽 | `-` | `-` | 将凯瑞甘的雷兽升级为暴龙兽变种。 / 重型攻击猛兽，可造成范围顺劈伤害。死亡后可以复活。 / 可以对地。 |
| 15 | 刀锋女王 | `KerriganVoidCoopEnergyRegen` | `-` | 凯瑞甘的能量恢复速度提高50%。 |

### Upgrade 摘要

| Upgrade | 父级 | 显示名 | Effect数 | 说明 |
|---|---|---|---|---|
| `CommanderPrestigeKerriganAbilities` | `CommanderPrestige` | 人类的愚行 | 8 | 优点 / 凯瑞甘在使用跳击和灵能位移时会消耗狂怒的层数，对附近的敌人造成50点伤害，并使其昏迷3秒。 / 缺点 / 凯瑞甘的变异甲壳生成量降低50%。凯瑞甘的技能... |
| `CommanderPrestigeKerriganAbilitiesMasteryImmobilizationWave` | `CommanderPrestige` | - | 1 | - |
| `CommanderPrestigeKerriganAbilitiesMasteryPrimary` | `CommanderPrestige` | - | 2 | - |
| `CommanderPrestigeKerriganAbilitiesPerk` | `CommanderPrestige` | - | 2 | - |
| `CommanderPrestigeKerriganAssimilationAura` | `CommanderPrestige` | 荒寂女王 | 0 | 优点 / 吸收光环资源掉落提高100%。凯瑞甘获得动能冲击和粉碎勒握。 / 缺点 / 跳击和灵能位移不可用。 |
| `CommanderPrestigeKerriganAssimilationAuraShared` | `CommanderPrestige` | - | 10 | - |
| `CommanderPrestigeKerriganCreep` | `CommanderPrestige` | 恶毒族长 | 5 | 优点 / 恶变菌毯的效果提高100%。虫后不再被减速并且可以在恶变菌毯之外放置菌毯肿瘤。 / 缺点 / 虫道网络和虫道网络欧米茄不可用。 |
| `CommanderPrestigeKerriganCreepPerk` | `CommanderPrestige` | - | 3 | - |
| `K5CreepBonuses` | `-` | - | 136 | 当处于菌毯上时，友方单位的攻击速度提高{Effect,KerriganMalignantCreepAttackSpeedDummy,Amount*100}%，生命... |
| `K5Fury` | `-` | - | 0 | - |
| `K5PrimalSlash` | `-` | - | 0 | - |
| `K5PsiStrike` | `-` | - | 0 | - |
| `KerriganCommander` | `-` | 凯瑞甘 | 21 | - |
| `KerriganCreepBonusesCoop` | `-` | Kerrigan Creep Bonuses | 0 | - |
| `KerriganGhostCosmetic` | `-` | - | 0 | - |
| `KerriganInfestedCosmetic` | `-` | - | 0 | - |
| `KerriganVoidCoopEnergyRegen` | `-` | Kerrigan Void Coop Energy Regen | 3 | - |
| `KerriganVoidCoopImprovedLeapingStrike` | `-` | Kerrigan Void Coop Ravage | 5 | - |
| `MasteryKerriganArmyGasCost` | `-` | 精通 凯瑞甘 部队瓦斯消耗 | 1 | 减少凯瑞甘的战斗单位的高能瓦斯消耗。 |
| `MasteryKerriganAutoAttackDamage` | `-` | 精通 凯瑞甘 自动攻击伤害 | 2 | 提高凯瑞甘的攻击伤害。 |
| `MasteryKerriganEnergyRegen` | `-` | 精通 凯瑞甘 能量恢复 | 3 | 提高凯瑞甘的能量恢复。 |
| `MasteryKerriganImmobilizationWaveDamage` | `-` | 专精凯瑞甘定身波伤害 | 2 | - |
| `MasteryKerriganPrimarySpeedDamage` | `-` | 主要技能伤害和攻击速度 | 9 | 提高凯瑞甘的跳击以及灵能位移的伤害，提高凯瑞甘的攻击速度。 |
| `MasteryKerriganResearchSpeedandCost` | `-` | 专精凯瑞甘研究速度和消耗 | 112 | 降低进化的消耗和研究时间。 |
| `VoidCoopGreaterNydusWorm` | `-` | Omega Worm | 27 | - |

### 研究/升级按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 巢虫领主 | `BroodlordSpeed` | 孔状软骨 | `-` | HaveBroodlordSpeed | 巢虫领主的移动速度提高{$UpgradeEffectArrayValue:KerriganVoidCoopBroodlordSpeed:Unit,Broo... |
| 雷兽 | `EvolveChitinousPlating` | 进化骨板 | `-` | HaveUltraliskChitnousPlating | 雷兽的护甲提高{$UpgradeEffectArrayValue:ChitinousPlating:Unit,Ultralisk,LifeArmor$}点。 |
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
| 虫道网络 | `NydusCanalLoad` | 装载 | `NydusCanalTransport,Load` | - | 将单位装载进虫道网络。 |

### 可投放单位候选

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 巢虫领主 | `Broodlord` | `BroodLord` | Air; Armored/Biological/Massive | 矿:300 气:250 人口字段:-4 生命:225 | 大型飞行作战生物。通过投射出的巢虫来攻击目标。巢虫是一种可以对地的小型生物。 / 可以对地。 |
| 虫后 | `SwarmQueen` | `Queen, QueenCoop, SwarmQueen` | Ground; Biological/Psionic | 矿:175 气:- 人口字段:-2 生命:175 | 支援单位。可以使用孵化菌毯肿瘤和速效哺液技能。 / 可以对地和对空。 |
| 刺蛇 | `Hydralisk` | `Hydralisk, HydraliskDen` | Ground; Biological/Light | 矿:100 气:50 人口字段:-2 生命:90 | 远程攻击单位。可以变异为潜伏者。 / 可以对地和对空。 |
| 雷兽 | `Ultralisk` | `Ultralisk, UltraliskCavern` | Ground; Armored/Biological/Massive | 矿:275 气:200 人口字段:-6 生命:500 | 重型攻击猛兽，可造成范围伤害。 / 可以对地。 |
| 异龙 | `MutaliskBroodlord` | `MutaliskBroodlord, Spire` | -; - | 矿:- 气:- 人口字段:- 生命:- | 能变异为巢虫领主： / 对地面单位进行远程攻击。孵化巢虫进行攻击。 |

实现备注：运输机空投不要读取地图硬编码单位组，应从 `CommanderCargoLoadoutProfile` 读取当前 commander 的 `power_fusion` 单位清单和场景过滤规则。

## 10. 指挥官特殊机制

Owner：`CommanderSpecialMechanicProfile`、`CommanderSpecialResourceProfile`、`CommanderSpecialMechanicHookProfile`、`CommanderSpecialMechanicUnitProfile`。

本指挥官重点：凯瑞甘英雄、同化光环、虫群坑道/恶性菌毯是主特殊机制。

### 特殊机制命中项

- 恶变菌毯 (`KerriganMalignantCreep`)

### 特殊机制 Upgrade 候选

- 恶毒族长 (`CommanderPrestigeKerriganCreep`)
- CommanderPrestigeKerriganCreepPerk (`CommanderPrestigeKerriganCreepPerk`)
- K5CreepBonuses (`K5CreepBonuses`)
- Kerrigan Creep Bonuses (`KerriganCreepBonusesCoop`)
- KerriganInfestedCosmetic (`KerriganInfestedCosmetic`)

### 特殊机制按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 虫道网络 | `SummonNydusCanalCreeper` | 召唤菌塔 | `BuildNydusCanal,Build3` | - | 在目标位置召唤菌塔。菌塔可以向选中的方向发射菌毯。 / 额外加成：异虫单位在菌毯上移动速度更快。 |
| 虫后 | `BuildCreepTumor` | 产下菌毯肿瘤 | `QueenBuild,Build1` | - | 一种潜地的菌毯分泌腺体。菌毯能够为附近的异虫建筑提供给养。一颗菌毯肿瘤能够再分裂出一颗额外的菌毯肿瘤。 / 效果加成：异虫单位在菌毯上的移动速度更快 |
| 虫后 | `BiomassPassiveEmpty` | 生物质搜集 | `-` | BiomassBuffEmptyVisible | 该单位可以通过击杀敌方单位搜集生物质来获得能量。 |
| 虫后 | `BuildCreepTumor` | 产下菌毯肿瘤 | `QueenBuild,Build3` | - | 一种潜地的菌毯分泌腺体。菌毯能够为附近的异虫建筑提供给养。一颗菌毯肿瘤能够再分裂出一颗额外的菌毯肿瘤。 / 效果加成：异虫单位在菌毯上的移动速度更快 |

实现备注：凡是涉及局内状态、资源、堆叠、全局计时器、隐藏 caster 的机制，都必须有 runtime hook 和 `[XM_DBG]` 日志。

## 11. 指挥官个性化机制

Owner：`CommanderPersonalMechanicProfile`、`CommanderPersonalMechanicEffectProfile`、`CommanderPersonalMechanicHookProfile`、`CommanderPersonalMechanicRequirementProfile`。

本指挥官重点：英雄技能、资源回收和虫族单位强化需要分到英雄、特殊资源、单位模块。

### 威望正向融合输入

| 威望 ID | Primary Upgrade | 禁用单位 | 启用单位 | 禁用 Ability | 补充 Upgrade |
|---|---|---|---|---|---|
| `CommanderPrestigeKerriganCreep` | `CommanderPrestigeKerriganCreep` | `NydusNetwork` | `-` | `-` | `KerriganCreep1` |
| `CommanderPrestigeKerriganAbilities` | `CommanderPrestigeKerriganAbilities` | `-` | `-` | `-` | `KerriganAbilities1, KerriganAbilities2, KerriganAbilities3` |
| `CommanderPrestigeKerriganAssimilationAura` | `CommanderPrestigeKerriganAssimilationAura` | `-` | `-` | `PsiStrikeWalk:, PrimalSlash:` | `-` |

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
[XM_DBG][INFO][COMMANDER_PROFILE_LOAD] commander=Kerrigan levelMode=FullLevel15 masteryMode=AllSixMax rosterStage=power_fusion result=ok
[XM_DBG][INFO][POWER_FUSION_APPLY] commander=Kerrigan levelMode=FullLevel15 masteryMode=AllSixMax prestigeMode=SelectedPositive result=ok
[XM_DBG][INFO][ROSTER_LOAD] commander=Kerrigan stage=power_fusion units=5 buildings=4 result=ok
[XM_DBG][INFO][MODULE_VERIFY] commander=Kerrigan module=<01-11> profile=<profile> result=ok
[XM_DBG][WARN][CASC_AUDIT_REQUIRED] commander=Kerrigan module=<module> object=<object> result=needs-casc-audit
```

## 第一轮待审计项

- 顶部技能的 caster、按钮、冷却、充能、目标转发闭包。
- 英雄或特殊英雄的 Unit、Ability、Behavior、Weapon、Actor、Sound 闭包。
- `power_fusion` 最终 roster 与 `level15` roster 的新增、替换、变体关系。
- 6 项精通的真实作用对象和最终数值。
- 3 个威望的正面收益、负面代价、disable/suppress、费用/冷却/上限变化。
- 科技建筑研究按钮、Requirement、Upgrade effect 是否完整。
- 特殊机制和个性化机制是否需要 runtime hook。
