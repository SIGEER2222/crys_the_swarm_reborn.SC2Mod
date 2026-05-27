# 阿巴瑟（Abathur）指挥官细化

日期：2026-05-27

## 当前口径

当前指挥官默认 15 级，不从 1 级开始；精通默认 6 项全部 30 点；威望默认只取正面收益，不直接启用官方 `PlayerPrestige`。`initial` 只作为官方基础状态审计和差异对照，默认测试和玩法应看 `power_fusion` 最终状态。

本文件按 `docs/newdocs/模块拆分` 的 11 个模块整理 阿巴瑟。依据 `游戏数据/官方合作指挥官/commanders/Abathur/` 的 JSON 摘要生成；具体 Ability、Behavior、Weapon、Actor、Effect、Requirement 闭包仍需继续追 `references/sc2-build-96883-casc-export/` 或实机 `[XM_DBG]` 日志。

## 官方数据摘要

| 项 | 值 |
|---|---|
| CommanderId | `ZergAbathur` |
| 中文名 | 阿巴瑟 |
| 默认升级 | `AbathurCommander` |
| 默认能力命令 | `MutaliskMorphToDevourer:, MutaliskMorphToGuardian:, TrainQueen:, MorphRoachToRavager:, SpireResearch:6, MorphRoachVileToRavager:` |
| 威望 ID | `CommanderPrestigeAbathurBiomass, CommanderPrestigeAbathurDeepTunnel, CommanderPrestigeAbathurUltimateEvo` |
| heroes 数量 | 1 |
| roster 数量 | 15 |
| units 数量 | 10 |
| buildings 数量 | 4 |
| command card 对象数 | 15 |
| upgrades 数量 | 22 |
| source | `mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/userdata.xml` |

roster 样例：

```text
SwarmQueen, RoachCorpser, RoachVile, Ravager, Viper, Brutalisk, Leviathan, SporeCrawler, NydusNetwork, SwarmHost, SpineCrawler, AbathurGuardian, Devourer, Mutalisk, Roach
```

## 15 级解锁摘要

- 1: 生物质收割者
- 2: 终极进化
- 3: 剧毒巢穴
- 4: 蟑螂温室升级包
- 5: 强化愈合
- 6: 进化腔升级包
- 7: 生物质恢复
- 8: 新单位：飞蛇
- 9: 感染深渊升级包
- 10: 共生体
- 11: 尖塔升级包
- 12: 突变潜能
- 13: 蝗虫注射
- 14: 蟑螂进化：秽型虫
- 15: 生质汲取

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
| 默认能力 | - | `MutaliskMorphToDevourer:` | `AbathurCommander` | 来自 commander.json |
| 默认能力 | - | `MutaliskMorphToGuardian:` | `AbathurCommander` | 来自 commander.json |
| 默认能力 | - | `TrainQueen:` | `AbathurCommander` | 来自 commander.json |
| 默认能力 | - | `MorphRoachToRavager:` | `AbathurCommander` | 来自 commander.json |
| 默认能力 | - | `SpireResearch:6` | `AbathurCommander` | 来自 commander.json |
| 默认能力 | - | `MorphRoachVileToRavager:` | `AbathurCommander` | 来自 commander.json |
| Lv2 终极进化 | 2 | `EvolveToLeviathanMutalisk:` | `-` | 使用100层生物质解锁地面单位进化成莽兽的技能。空中单位使用100层生物质可以进化成利维坦。 |
| Lv2 终极进化 | 2 | `EvolveToLeviathanGuardianMP:` | `-` | 使用100层生物质解锁地面单位进化成莽兽的技能。空中单位使用100层生物质可以进化成利维坦。 |
| Lv2 终极进化 | 2 | `EvolveToLeviathanDevourer:` | `-` | 使用100层生物质解锁地面单位进化成莽兽的技能。空中单位使用100层生物质可以进化成利维坦。 |
| Lv4 蟑螂温室升级包 | 4 | `RoachWarrenResearch:5` | `-` | 在蟑螂温室中解锁以下升级： / 蟑螂生命值低于50%时获得+6护甲。破坏者的腐蚀胆汁技能造成的伤害提高40点。 |
| Lv4 蟑螂温室升级包 | 4 | `RoachWarrenResearch:7` | `-` | 在蟑螂温室中解锁以下升级： / 蟑螂生命值低于50%时获得+6护甲。破坏者的腐蚀胆汁技能造成的伤害提高40点。 |
| Lv6 进化腔升级包 | 6 | `BioMechanicalTransfusion:` | `-` | 在进化腔中解锁以下升级： / 允许孵化场、虫穴和主巢同时生成两只虫后。使虫后的速效哺液的治疗量提高10点，并且可以治疗生物和机械单位。 |
| Lv6 进化腔升级包 | 6 | `evolutionchamberresearch:10` | `-` | 在进化腔中解锁以下升级： / 允许孵化场、虫穴和主巢同时生成两只虫后。使虫后的速效哺液的治疗量提高10点，并且可以治疗生物和机械单位。 |
| Lv6 进化腔升级包 | 6 | `evolutionchamberresearch:11` | `-` | 在进化腔中解锁以下升级： / 允许孵化场、虫穴和主巢同时生成两只虫后。使虫后的速效哺液的治疗量提高10点，并且可以治疗生物和机械单位。 |
| Lv9 感染深渊升级包 | 9 | `AbathurDeepTunnel:` | `-` | 在感染深渊中解锁以下升级： / 解锁虫群宿主的深槽虫道技能，使其能快速潜地前往目标位置。解锁飞蛇的麻痹勾刺技能，延长其绑架技能造成的昏迷时间。 |
| Lv9 感染深渊升级包 | 9 | `InfestationPitResearch:9` | `-` | 在感染深渊中解锁以下升级： / 解锁虫群宿主的深槽虫道技能，使其能快速潜地前往目标位置。解锁飞蛇的麻痹勾刺技能，延长其绑架技能造成的昏迷时间。 |
| Lv9 感染深渊升级包 | 9 | `InfestationPitResearch:11` | `-` | 在感染深渊中解锁以下升级： / 解锁虫群宿主的深槽虫道技能，使其能快速潜地前往目标位置。解锁飞蛇的麻痹勾刺技能，延长其绑架技能造成的昏迷时间。 |
| Lv11 尖塔升级包 | 11 | `SpireResearch:10` | `-` | 在尖塔和巨型尖塔中解锁以下升级： / 提升守护者的攻击射程。使吞噬者的攻击可以造成范围伤害。升级异龙的攻击，对重甲单位造成100%加成伤害。 |
| Lv11 尖塔升级包 | 11 | `SpireResearch:11` | `-` | 在尖塔和巨型尖塔中解锁以下升级： / 提升守护者的攻击射程。使吞噬者的攻击可以造成范围伤害。升级异龙的攻击，对重甲单位造成100%加成伤害。 |
| Lv11 尖塔升级包 | 11 | `SpireResearch:8` | `-` | 在尖塔和巨型尖塔中解锁以下升级： / 提升守护者的攻击射程。使吞噬者的攻击可以造成范围伤害。升级异龙的攻击，对重甲单位造成100%加成伤害。 |

### command card 命中

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 虫道网络 | `NydusCanalLoad` | 装载 | `NydusCanalTransport,Load` | - | 将单位装载进虫道网络。 |
| 飞蛇 | `ParasiticBomb` | 寄生弹 | `ParasiticBomb,Execute` | - | 生成一团寄生云，在{Behavior,ParasiticBomb,Duration}秒内对目标和附近的敌方空中单位造成{Behavior,Parasiti... |

实现备注：面板只注册 profile 和转发 caster，地图不得按 commander 写 if/else。精通和威望影响面板冷却/充能/费用时，由本模块接收最终 modifier。

## 02. 英雄单位及其技能

Owner：`CommanderHeroProfile`、`CommanderHeroModeProfile`、`CommanderHeroAbilityProfile`、`CommanderHeroSkillTreeProfile`、`CommanderHeroReviveProfile`、`CommanderHeroModifierProfile`。

### 英雄单位清单

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 利维坦 | `Leviathan` | `HotSLeviathan, Leviathan` | -; - | 矿:- 气:- 人口字段:- 生命:- 护盾:- 能量:0 | 统治天空的巨型飞行怪兽。 / 可以对空和对地。 |

### 英雄技能按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 利维坦 | `SymbioteCarapace` | 甲壳 | `SymbioteCarapace,Execute` | - | 为自己添加护盾{Behavior,SymbioteCarapace,Modification.VitalMaxArray[Shields]}，持续8秒。 |
| 利维坦 | `AbathurBrutaliskLeviathanSymbioteLocked` | 共生体 | `-` | AbathurLevel10 | 该技能将在指挥官等级10时解锁。 |
| 利维坦 | `AbathurBrutaliskLeviathanSymbiote` | 共生体 | `-` | HaveBrutaliskLeviathanSymbiote | 获得一个拥有下列技能的共生体： / 刺击：每{Abil,SymbioteStab,Cost[0].Cooldown.TimeUse}秒攻击周围的敌人，造成... |

### 英雄形态/模式候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| - | - | - | - | - | 未自动命中英雄形态或模式按钮。 |

### 英雄相关等级解锁

| 等级 | 名称 | 升级 | AbilityCmd | 说明 |
|---|---|---|---|---|
| - | - | - | - | 未自动命中英雄相关等级解锁；需要从 CASC 或实机日志补。 |

口径：利维坦/终极进化类英雄单位应归英雄模块，生物质成长仍归特殊机制模块。

待审计：Hero Unit、Ability、Behavior、Weapon、Actor、Sound、复活/重生、能量/资源、形态切换和威望改写闭包。

## 03. 普通单位技能及其进化功能

Owner：`CommanderUnitAbilityProfile`、`CommanderUnitStatProfile`、`CommanderUnitEvolutionProfile`、`CommanderUnitBehaviorProfile`、`CommanderUnitWeaponProfile`。

### 单位技能按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 守护者阿巴瑟 | `GuardianAttackRangeIncrease` | 加长散射 | `-` | HaveGuardianAttackRangeIncrease | 守护者的攻击射程提高{Upgrade,GuardianAttackRangeIncrease,EffectArray[0].Value}。 |
| 守护者阿巴瑟 | `EvolveToLeviathanLocked` | 进化为利维坦 | `-` | AbathurLevel02 | 该技能将在指挥官等级2时解锁。 |
| 守护者阿巴瑟 | `BiomassPassiveEmpty` | 生物质搜集 | `-` | BiomassBuffEmptyVisible | 该单位可以通过击杀敌方单位搜集生物质来获得能量。 |
| 吞噬者 | `DevourerAoEDamage` | 腐蚀喷涌 | `-` | HaveDevourerAoEDamage | 吞噬者攻击现在会造成范围性伤害。 |
| 吞噬者 | `CorrosiveAcidDevourer` | 腐蚀强酸 | `CorrosiveAcid,Execute` | - | 对目标区域内的所有敌方单位发射强酸，降低他们的攻击速度和护甲。叠加3次。 |
| 吞噬者 | `EvolveToLeviathanLocked` | 进化为利维坦 | `-` | AbathurLevel02 | 该技能将在指挥官等级2时解锁。 |
| 吞噬者 | `BiomassPassiveEmpty` | 生物质搜集 | `-` | BiomassBuffEmptyVisible | 该单位可以通过击杀敌方单位搜集生物质来获得能量。 |
| 异龙 | `StukovInfestedWildMutation` | 斯托科夫 感染体 野性突变 | `StukovInfestedWildMutation,Execute` | - | 异龙的最大生命值提高{Behavior,WildMutation,Modification.VitalMaxArray[1]}点，攻击速度提高{(Beha... |
| 异龙 | `EvolveToLeviathanLocked` | 进化为利维坦 | `-` | AbathurLevel02 | 该技能将在指挥官等级2时解锁。 |
| 异龙 | `BiomassPassiveEmpty` | 生物质搜集 | `-` | BiomassBuffEmptyVisible | 该单位可以通过击杀敌方单位搜集生物质来获得能量。 |
| 异龙 | `MorphtoDevourer` | MorphtoDevourer | `MutaliskMorphToDevourer,Train1` | - | 强大的对空飞行单位。可以使用腐蚀强酸。 / 可以对空。 |
| 蟑螂 | `GlialReconstitutionPassive` | 神经胶原重组 | `-` | HaveGlialReconstitution | 移动速度提高。 |
| 蟑螂 | `ZerglingBurrowMove` | ZerglingBurrowMove | `-` | HaveOrganicCarapace | - |
| 蟑螂 | `HotSRoachDamage` | HotSRoachDamage | `-` | HaveHotSRoachDamage | - |
| 蟑螂 | `HotSRoachShield` | HotSRoachShield | `-` | HaveHotSRoachShield | - |
| 蟑螂 | `Ravager` | 变异为破坏者 | `MorphRoachToRavager,Train1` | - | 远程火炮单位。可以使用腐蚀胆汁。 / 可以对地。 |
| 蟑螂 | `DeepTunnelLocked` | 深槽虫道 | `-` | AbathurLevel09DeepTunnelImproved | 该技能将在指挥官等级9时解锁。 |
| 蟑螂 | `EvolveToBrutaliskLocked` | 进化为莽兽 | `-` | AbathurLevel02 | 该技能将在指挥官等级2时解锁。 |
| 蟑螂 | `BiomassPassiveEmpty` | 生物质搜集 | `-` | BiomassBuffEmptyVisible | 该单位可以通过击杀敌方单位搜集生物质来获得能量。 |
| 虫后 | `BioMechanicalTransfusionPassive` | 生物机械哺液 | `-` | HaveBioMechanicalTransfusionPassive | 速效哺液的治疗量提高10点，现在可以对机械单位和建筑使用。 |
| 虫后 | `BuildCreepTumor` | 产下菌毯肿瘤 | `QueenBuild,Build1` | - | 一种潜地的菌毯分泌腺体。菌毯能够为附近的异虫建筑提供给养。一颗菌毯肿瘤能够再分裂出一颗额外的菌毯肿瘤。 / 效果加成：异虫单位在菌毯上的移动速度更快 |
| 虫后 | `BioMechanicalTransfusion` | 速效哺液 | `BioMechanicalTransfusion,Execute` | - | 为一个单位或建筑进行持续的治疗，共恢复{Effect,QueenBurstHeal,VitalArray[Life].Change*(Behavior,Q... |
| 虫后 | `EvolveToBrutaliskLocked` | 进化为莽兽 | `-` | AbathurLevel02 | 该技能将在指挥官等级2时解锁。 |
| 虫后 | `BiomassPassiveEmpty` | 生物质搜集 | `-` | BiomassBuffEmptyVisible | 该单位可以通过击杀敌方单位搜集生物质来获得能量。 |
| 虫后 | `BuildCreepTumor` | 产下菌毯肿瘤 | `QueenBuild,Build3` | - | 一种潜地的菌毯分泌腺体。菌毯能够为附近的异虫建筑提供给养。一颗菌毯肿瘤能够再分裂出一颗额外的菌毯肿瘤。 / 效果加成：异虫单位在菌毯上的移动速度更快 |
| 虫后 | `QueenBurstHeal` | QueenBurstHeal | `QueenBurstHeal,Execute` | - | - |
| 虫后 | `DeepTunnel` | DeepTunnel | `DeepTunnel,Execute` | - | - |
| 蟑螂 | `Ravager` | 变异为破坏者 | `MorphRoachToRavager,Train1` | - | 远程火炮单位。可以使用腐蚀胆汁。 / 可以对地。 |
| 蟑螂 | `VilePassive` | VilePassive | `-` | - | - |
| 蟑螂 | `GlialReconstitutionPassive` | 神经胶原重组 | `-` | HaveGlialReconstitution | 移动速度提高。 |
| 蟑螂 | `ZerglingBurrowMove` | ZerglingBurrowMove | `-` | HaveOrganicCarapace | - |
| 蟑螂 | `HotSRoachShield` | HotSRoachShield | `-` | HaveHotSRoachShield | - |
| 蟑螂 | `Ravager` | 变异为破坏者 | `MorphRoachVileToRavager,Train1` | - | 远程火炮单位。可以使用腐蚀胆汁。 / 可以对地。 |
| 蟑螂 | `DeepTunnelLocked` | 深槽虫道 | `-` | AbathurLevel09DeepTunnelImproved | 该技能将在指挥官等级9时解锁。 |
| 蟑螂 | `EvolveToBrutaliskLocked` | 进化为莽兽 | `-` | AbathurLevel02 | 该技能将在指挥官等级2时解锁。 |
| 蟑螂 | `BiomassPassiveEmpty` | 生物质搜集 | `-` | BiomassBuffEmptyVisible | 该单位可以通过击杀敌方单位搜集生物质来获得能量。 |
| 蟑螂 | `BrutaliskDeepTunnel` | 深槽虫道 | `AbathurDeepTunnelImproved,Execute` | - | 快速潜地前往目标位置。 |
| 破坏者 | `RavagerCorrosiveBile` | 腐蚀胆汁 | `RavagerCorrosiveBile,Execute` | - | 朝目标位置发射一枚飞弹，撞击后对该范围内的所有单位造成{Effect,RavagerCorrosiveBileDamage,Amount}点伤害。 / 可... |
| 飞蛇 | `ViperImprovedCastRangePassive` | 剧毒细菌 | `-` | HaveViperImprovedCastRange | 所有飞蛇技能获得+{Upgrade,ViperImprovedCastRange,EffectArray[0].Value}的施法范围。 |
| 飞蛇 | `ViperAbductImprovedStunPassive` | 麻痹勾刺 | `-` | HaveViperAbductImprovedStun | 绑架使单位昏迷额外{Upgrade,ViperAbductImprovedStun,EffectArray[0].Value}秒。 |
| 飞蛇 | `BiomassPassiveEmpty` | 生物质搜集 | `-` | BiomassBuffEmptyVisible | 该单位可以通过击杀敌方单位搜集生物质来获得能量。 |
| 飞蛇 | `ViperConsume` | 吞噬 | `ViperConsumeStructure,Execute` | - | 缠绕目标建筑，造成{-1 * (Effect,ViperConsumeStructureModifyTarget,VitalArray[0].Change... |
| 飞蛇 | `FaceEmbrace` | 绑架 | `Yoink,Execute` | - | 将目标单位拉至飞蛇的位置。 |
| 飞蛇 | `CommanderPrestigeAbathurLeviathanLocked` | 进化为利维坦 | `-` | CommanderPrestigeAbathurBiomass | 该技能被指挥官威望锁定。 |
| 飞蛇 | `ParasiticBomb` | 寄生弹 | `ParasiticBomb,Execute` | - | 生成一团寄生云，在{Behavior,ParasiticBomb,Duration}秒内对目标和附近的敌方空中单位造成{Behavior,Parasiti... |
| 飞蛇 | `EvolveToLeviathanLocked` | 进化为利维坦 | `-` | AbathurLevel02 | 该技能将在指挥官等级2时解锁。 |
| ... | ... | ... | ... | ... | 还有 4 项，后续从 command_cards.json 继续展开 |


备注：已过滤 14 个通用移动/攻击/取消类按钮，保留英雄技能、装备、被动、威望或形态相关候选。
### 进化/形态/切换候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 守护者阿巴瑟 | `EvolveToLeviathanLocked` | 进化为利维坦 | `-` | AbathurLevel02 | 该技能将在指挥官等级2时解锁。 |
| 吞噬者 | `EvolveToLeviathanLocked` | 进化为利维坦 | `-` | AbathurLevel02 | 该技能将在指挥官等级2时解锁。 |
| 异龙 | `StukovInfestedWildMutation` | 斯托科夫 感染体 野性突变 | `StukovInfestedWildMutation,Execute` | - | 异龙的最大生命值提高{Behavior,WildMutation,Modification.VitalMaxArray[1]}点，攻击速度提高{(Beha... |
| 异龙 | `EvolveToLeviathanLocked` | 进化为利维坦 | `-` | AbathurLevel02 | 该技能将在指挥官等级2时解锁。 |
| 异龙 | `MorphtoDevourer` | MorphtoDevourer | `MutaliskMorphToDevourer,Train1` | - | 强大的对空飞行单位。可以使用腐蚀强酸。 / 可以对空。 |
| 蟑螂 | `ZerglingBurrowMove` | ZerglingBurrowMove | `-` | HaveOrganicCarapace | - |
| 蟑螂 | `Ravager` | 变异为破坏者 | `MorphRoachToRavager,Train1` | - | 远程火炮单位。可以使用腐蚀胆汁。 / 可以对地。 |
| 蟑螂 | `EvolveToBrutaliskLocked` | 进化为莽兽 | `-` | AbathurLevel02 | 该技能将在指挥官等级2时解锁。 |
| 脊针爬虫 | `SpineCrawlerUproot` | 站起 | `SpineCrawlerUproot,Execute` | - | 使脊针爬虫站起。站起的脊针爬虫能够移动，但无法攻击。在菌毯上的移动速度大幅提升。 |
| 孢子爬虫 | `SporeCrawlerUproot` | 站起 | `SporeCrawlerUproot,Execute` | - | 使孢子爬虫站起。站起的孢子爬虫能够移动，但无法攻击。在菌毯上的移动速度大幅提升。 |
| 虫群宿主 | `EvolveViperImprovedCastRangeLocked` | 进化剧毒细菌 | `-` | AbathurLevel08 | 该科技将在指挥官等级8时解锁。 |
| 虫群宿主 | `EvolveDeepTunnelLocked` | 进化深槽虫道 | `-` | AbathurLevel09 | 该科技将在指挥官等级9时解锁。 |
| 虫群宿主 | `EvolveViperAbductImprovedStunLocked` | 进化麻痹勾刺 | `-` | AbathurLevel09 | 该科技将在指挥官等级9时解锁。 |
| 虫群宿主 | `EvolveViperImprovedCastRange` | 剧毒细菌 | `InfestationPitResearch,Research9` | - | 所有飞蛇技能获得+{Upgrade,ViperImprovedCastRange,EffectArray[0].Value}的施法范围。 |
| 虫群宿主 | `ResearchNeuralParasite` | 进化神经寄生 | `InfestationPitResearch,Research4` | - | 使感染者能够使用神经寄生技能。 |
| 虫群宿主 | `AmorphousArmorcloud` | 微生物环绕云 | `InfestationPitResearch,Research6` | - | 制造一团遮蔽物，掩护下方的地面单位，使其受到远程单位的伤害降低{Behavior,AmorphousArmorcloud,DamageResponse.M... |
| 虫后 | `EvolveToBrutaliskLocked` | 进化为莽兽 | `-` | AbathurLevel02 | 该技能将在指挥官等级2时解锁。 |
| 蟑螂 | `Ravager` | 变异为破坏者 | `MorphRoachToRavager,Train1` | - | 远程火炮单位。可以使用腐蚀胆汁。 / 可以对地。 |
| 蟑螂 | `ZerglingBurrowMove` | ZerglingBurrowMove | `-` | HaveOrganicCarapace | - |
| 蟑螂 | `Ravager` | 变异为破坏者 | `MorphRoachVileToRavager,Train1` | - | 远程火炮单位。可以使用腐蚀胆汁。 / 可以对地。 |
| 蟑螂 | `EvolveToBrutaliskLocked` | 进化为莽兽 | `-` | AbathurLevel02 | 该技能将在指挥官等级2时解锁。 |
| 飞蛇 | `CommanderPrestigeAbathurLeviathanLocked` | 进化为利维坦 | `-` | CommanderPrestigeAbathurBiomass | 该技能被指挥官威望锁定。 |
| 飞蛇 | `EvolveToLeviathanLocked` | 进化为利维坦 | `-` | AbathurLevel02 | 该技能将在指挥官等级2时解锁。 |

实现备注：单位自己声明技能、形态和升级接入口；科技建筑只展示符合条件的研究项，不直接拥有单位升级逻辑。英雄单位已从本模块候选中排除，统一归 `02. 英雄单位及其技能`。

## 04. 初始化基地与特殊建筑

Owner：`CommanderRuntimeProfile`、`CommanderScenarioLoadout`、`CommanderSpecialStructureProfile`、`CommanderInitialCasterProfile`。

### 初始化建筑候选

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 虫群宿主 | `SwarmHost` | `InfestationPit, SwarmHost, SwarmHostMP` | Ground; Armored/Biological/Structure | 矿:150 气:100 人口字段:- 生命:850 护盾:- 能量:- | 孵化2只蝗虫。蝗虫有{Behavior,LocustMPTimedLife,Duration}秒的限时生命。 / 可以对地。 |

### 特殊建筑候选

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| - | - | - | - | - | 官方 buildings.json 未自动命中特殊建筑；特殊结构可能由触发器或隐藏 caster 创建。 |

实现备注：测试台切换指挥官时调用本指挥官 initializer，负责替换主基地、工人、运输机/投放单位、隐藏 caster、英雄初始单位和特殊建筑。

## 05. 指挥官兵种

Owner：`CommanderRosterProfile`、`CommanderUnitProfile`、`CommanderUnitTrainProfile`、`CommanderUnitStageProfile`、`CommanderUnitRequirementProfile`。

来源：官方提取 `units.json`。这里列的是当前已提取普通/生产单位 Catalog 对象；英雄单位单独在 `02. 英雄单位及其技能` 中维护。满级替换、威望正向融合或进化变体仍以 `power_fusion` 审计结果为准。

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 虫后 | `SwarmQueen` | `Queen, QueenCoop, SwarmQueen` | Ground; Biological/Psionic | 矿:175 气:- 人口字段:-2 生命:175 护盾:- 能量:200 | 支援单位。可以使用孵化菌毯肿瘤和速效哺液技能。 / 可以对地和对空。 |
| 蟑螂 | `RoachCorpser` | `RoachCorpser, RoachWarren` | -; - | 矿:- 气:- 人口字段:- 生命:145 护盾:- 能量:- | 蟑螂所伤的敌人若被迅速消灭后，会生成两只小蟑螂。 |
| 蟑螂 | `RoachVile` | `RoachVile, RoachWarren` | -; - | 矿:- 气:- 人口字段:- 生命:145 护盾:- 能量:- | 攻击能使敌人的移动和攻击速度降低{(1 - Behavior,VileAcidSlowFlatAmount,Modification.MoveSpee... |
| 破坏者 | `Ravager` | `Ravager` | Ground; Biological | 矿:100 气:0 人口字段:-3 生命:120 护盾:- 能量:- | 远程火炮单位。可以使用腐蚀胆汁。 / 可以对地。 |
| 飞蛇 | `Viper` | `Viper` | Air; Psionic | 矿:100 气:200 人口字段:-3 生命:150 护盾:- 能量:200 | 飞行的施法者，战地的控场大师。可使用寄生弹、吞噬、蔽目毒云和绑架技能。 |
| 莽兽 | `Brutalisk` | `Brutalisk` | -; - | 矿:500 气:300 人口字段:- 生命:- 护盾:- 能量:- | 重型突击巨兽，其体型和力量均远超雷兽。 / 可以对地和对空 |
| 守护者阿巴瑟 | `AbathurGuardian` | `GuardianMP` | Air; Armored/Biological/Massive | 矿:150 气:200 人口字段:-2 生命:150 护盾:- 能量:- | 超远距离对地空军。 / 可以对地。 |
| 吞噬者 | `Devourer` | `Devourer` | -; - | 矿:- 气:- 人口字段:- 生命:- 护盾:- 能量:- | 强大的对空飞行单位。可以使用腐蚀强酸。 / 可以对空。 |
| 异龙 | `Mutalisk` | `Mutalisk, Spire` | Air; Biological/Light | 矿:100 气:100 人口字段:-2 生命:120 护盾:- 能量:- | 飞行生物。能够利用弹射攻击同时伤害多个目标。 / 可以对地和对空。 |
| 蟑螂 | `Roach` | `Roach, RoachWarren` | Ground; Armored/Biological | 矿:75 气:25 人口字段:-2 生命:145 护盾:- 能量:- | 突击单位。潜地后能快速恢复生命值。可以变异为破坏者。 / 可以对地。 |

三阶段口径：`initial` 只做审计，`level15` 表示满级解锁，`power_fusion` 表示 15 级 + 六精通全满 + 威望正向收益后的默认运行清单。

## 06. 指挥官精通

Owner：`CommanderMasteryProfile`、`CommanderMasteryEffectProfile`、`CommanderMasteryModifierProfile`。

| 组 | 名称 | Upgrade | 每点 | 30点口径 |
|---|---|---|---|---|
| 1 | 剧毒巢穴伤害 | `MasteryAbathurToxicNestDamageAndRespawn` | 2 | +60% |
| 1 | 愈合治疗持续时间 | `MasteryAbathurMendHeal` | 10 | +300% |
| 2 | 共生体技能强化 | `MasteryAbathurSymbioteCarapace` | 3.3298 | +99.894% |
| 2 | 双倍生物质几率 | `MasteryAbathurDoubleBiomass` | 1.5 | +45% |
| 3 | 剧毒巢穴最大充能数和冷却时间 | `MasteryAbathurToxicNestCharge` | 1 | +30% |
| 3 | 建筑变异和研究时间 | `MasteryAbathurTechFastBuild` | 2 | -60% |

实现备注：当前默认六项全部 30 点。表里的 30 点口径由 `point_increments * 30` 推导，最终数值仍需以 Upgrade Effect 闭包验证。

## 07. 指挥官建筑

Owner：`CommanderBuildingProfile`、`CommanderBuildingAbilityProfile`、`CommanderBuildingTrainProfile`、`CommanderBuildingStageProfile`、`CommanderBuildingBehaviorProfile`。

来源：官方提取 `buildings.json`。

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 孢子爬虫 | `SporeCrawler` | `SporeCrawler` | Ground; Armored/Biological/Structure | 矿:125 气:- 人口字段:- 生命:300 护盾:- 能量:- | 防空建筑。 / 可以对空 / 侦测单位 |
| 虫道网络 | `NydusNetwork` | `NydusNetwork` | Ground; Armored/Biological/Structure | 矿:200 气:150 人口字段:- 生命:850 护盾:- 能量:- | 友方地面部队可以迅速在玩家拥有的虫道网络和坑道虫之间穿梭。 / 开启： / - 坑道虫 |
| 虫群宿主 | `SwarmHost` | `InfestationPit, SwarmHost, SwarmHostMP` | Ground; Armored/Biological/Structure | 矿:150 气:100 人口字段:- 生命:850 护盾:- 能量:- | 孵化2只蝗虫。蝗虫有{Behavior,LocustMPTimedLife,Duration}秒的限时生命。 / 可以对地。 |
| 脊针爬虫 | `SpineCrawler` | `SpineCrawler` | Ground; Armored/Biological/Structure | 矿:150 气:- 人口字段:- 生命:300 护盾:- 能量:- | 对地防御建筑。 / 可以对地。 |

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
| 虫道网络 | `-` | - | `RallyNydus,Rally1` | - | - |
| 虫道网络 | `ZagaraVoidCoopNydusWorm` | 召唤坑道虫 | `-` | - | 在目标位置召唤一只坑道虫。 / 友方地面单位可借助虫道网络在任何该玩家拥有的坑道虫或虫道网络间穿梭。生成菌毯，可满足附近异虫建筑的存活需求。 / 效果加成... |
| 脊针爬虫 | `SpineCrawlerUproot` | 站起 | `SpineCrawlerUproot,Execute` | - | 使脊针爬虫站起。站起的脊针爬虫能够移动，但无法攻击。在菌毯上的移动速度大幅提升。 |
| 孢子爬虫 | `SporeCrawlerUproot` | 站起 | `SporeCrawlerUproot,Execute` | - | 使孢子爬虫站起。站起的孢子爬虫能够移动，但无法攻击。在菌毯上的移动速度大幅提升。 |
| 孢子爬虫 | `Detector` | 侦测单位 | `-` | NotUnderConstruction | 该单位能够侦测到隐形、潜地和幻像单位。 |
| 虫群宿主 | `HotSPressurizedGlands` | HotSPressurizedGlands | `InfestationPitResearch,Research8` | - | - |
| 虫群宿主 | `EvolveViperImprovedCastRangeLocked` | 进化剧毒细菌 | `-` | AbathurLevel08 | 该科技将在指挥官等级8时解锁。 |
| 虫群宿主 | `EvolveDeepTunnelLocked` | 进化深槽虫道 | `-` | AbathurLevel09 | 该科技将在指挥官等级9时解锁。 |
| 虫群宿主 | `EvolveViperAbductImprovedStunLocked` | 进化麻痹勾刺 | `-` | AbathurLevel09 | 该科技将在指挥官等级9时解锁。 |
| 虫群宿主 | `EvolveViperImprovedCastRange` | 剧毒细菌 | `InfestationPitResearch,Research9` | - | 所有飞蛇技能获得+{Upgrade,ViperImprovedCastRange,EffectArray[0].Value}的施法范围。 |
| 虫群宿主 | `ViperPassive` | ViperPassive | `-` | HotSHaveViper | - |
| 虫群宿主 | `InfestorPassive` | InfestorPassive | `-` | HotSHaveInfestor | - |
| 虫群宿主 | `SwarmHostPassive` | SwarmHostPassive | `-` | HotSHaveSwarmHost | - |
| 虫群宿主 | `ResearchNeuralParasite` | 进化神经寄生 | `InfestationPitResearch,Research4` | - | 使感染者能够使用神经寄生技能。 |
| 虫群宿主 | `AmorphousArmorcloud` | 微生物环绕云 | `InfestationPitResearch,Research6` | - | 制造一团遮蔽物，掩护下方的地面单位，使其受到远程单位的伤害降低{Behavior,AmorphousArmorcloud,DamageResponse.M... |
| 虫群宿主 | `SwarmHostCarrionPassive` | SwarmHostCarrionPassive | `-` | HotSHaveSwarmHostSplitA | - |

实现备注：建筑声明自身生产、研究、行为和阶段；训练单位的最终可用性由兵种/科技/精通/威望共同裁决。


备注：已过滤 6 个通用移动/攻击/取消类按钮，保留英雄技能、装备、被动、威望或形态相关候选。
## 08. 科技建筑及其升级选项

Owner：`CommanderTechBuildingProfile`、`CommanderUnitTechProfile`、`CommanderUpgradeProfile`、`CommanderUpgradeRequirementProfile`、`CommanderUpgradeEffectProfile`。

### 15 级解锁与研究命令

| 等级 | 名称 | 解锁升级 | 解锁 AbilityCmd | 说明 |
|---|---|---|---|---|
| 1 | 生物质收割者 | `SwarmQueenVisual` | `-` | 从死亡的敌人身上搜集生物质可以提升阿巴瑟单位的生命值、攻击速度和能量恢复。蟑螂不消耗高能瓦斯。幼虫孵化速度提高。 |
| 2 | 终极进化 | `-` | `EvolveToLeviathanMutalisk:, EvolveToLeviathanGuardianMP:, EvolveToLeviathanDevourer:` | 使用100层生物质解锁地面单位进化成莽兽的技能。空中单位使用100层生物质可以进化成利维坦。 |
| 3 | 剧毒巢穴 | `AbathurToxicNestIcreasedBiomass, AbathurHiddenToxicNest, AbathurToxicNestRespawnTalent` | `-` | 受到剧毒巢穴伤害的敌人掉落额外的生物质，并且攻击和移动速度有所降低。剧毒巢穴有一定几率在死亡时重生。敌人无法选中剧毒巢穴。 |
| 4 | 蟑螂温室升级包 | `-` | `RoachWarrenResearch:5, RoachWarrenResearch:7` | 在蟑螂温室中解锁以下升级： / 蟑螂生命值低于50%时获得+6护甲。破坏者的腐蚀胆汁技能造成的伤害提高40点。 |
| 5 | 强化愈合 | `AbathurImprovedMend` | `-` | 愈合可以储存最多3次充能，冷却时间缩短30秒。 |
| 6 | 进化腔升级包 | `-` | `BioMechanicalTransfusion:, evolutionchamberresearch:10, evolutionchamberresearch:11` | 在进化腔中解锁以下升级： / 允许孵化场、虫穴和主巢同时生成两只虫后。使虫后的速效哺液的治疗量提高10点，并且可以治疗生物和机械单位。 |
| 7 | 生物质恢复 | `AbathurBiomassRefund` | `-` | 被击杀后，你的单位有50%的几率掉落所有生物质。 |
| 8 | 新单位：飞蛇 | `-` | `-` | 飞行的施法单位，战地的控场大师。可使用寄生弹、吞噬、蔽目毒云和绑架技能。可以对空。 |
| 9 | 感染深渊升级包 | `-` | `AbathurDeepTunnel:, InfestationPitResearch:9, InfestationPitResearch:11` | 在感染深渊中解锁以下升级： / 解锁虫群宿主的深槽虫道技能，使其能快速潜地前往目标位置。解锁飞蛇的麻痹勾刺技能，延长其绑架技能造成的昏迷时间。 |
| 10 | 共生体 | `AbathurEnableSymbiote` | `-` | 莽兽和利维坦获得附身的共生体，攻击敌人并使用可吸收伤害的甲壳保护它们的宿主。 |
| 11 | 尖塔升级包 | `-` | `SpireResearch:10, SpireResearch:11, SpireResearch:8` | 在尖塔和巨型尖塔中解锁以下升级： / 提升守护者的攻击射程。使吞噬者的攻击可以造成范围伤害。升级异龙的攻击，对重甲单位造成100%加成伤害。 |
| 12 | 突变潜能 | `AbathurMorphTimeCostReduced` | `-` | 破坏者、守护者、吞噬者的变异时间和资源消耗减少50%。 |
| 13 | 蝗虫注射 | `AbathurEnemyDeathCreateLocusts` | `-` | 敌方单位在死亡时有一定几率孵化友方蝗虫。 |
| 14 | 蟑螂进化：秽型虫 | `-` | `-` | 将阿巴瑟的蟑螂升级成秽型虫变种。 / 突击单位。潜地时能快速恢复生命值。攻击可以削弱目标，降低其攻击和移动速度。 / 可以对地。 |
| 15 | 生质汲取 | `AbathurBiomassLifeLeech` | `-` | 阿巴瑟的单位每拥有一层生物质即可进行自我治疗，数值相当于它们造成伤害的1%。 |

### Upgrade 摘要

| Upgrade | 父级 | 显示名 | Effect数 | 说明 |
|---|---|---|---|---|
| `AbathurBiomassLifeLeech` | `-` | 阿巴瑟生物质生命汲取 | 20 | - |
| `AbathurBiomassRefund` | `-` | 阿巴瑟生物质返还 | 1 | - |
| `AbathurCommander` | `-` | 阿巴瑟 | 40 | - |
| `AbathurEnableSymbiote` | `-` | 阿巴瑟启用共生激素 | 2 | - |
| `AbathurEnemyDeathCreateLocusts` | `-` | 阿巴瑟 敌人死亡生成蝗虫 | 0 | - |
| `AbathurHiddenToxicNest` | `-` | 阿巴瑟隐秘剧毒巢穴 | 0 | - |
| `AbathurImprovedMend` | `-` | 强化愈合 | 7 | - |
| `AbathurMorphTimeCostReduced` | `-` | 变异时间消耗减少 | 11 | - |
| `AbathurToxicNestIcreasedBiomass` | `-` | 阿巴瑟 剧毒巢穴 增加生物质 | 2 | - |
| `AbathurToxicNestRespawnTalent` | `-` | 阿巴瑟剧毒巢穴重生天赋 | 1 | - |
| `CommanderPrestigeAbathurBiomass` | `CommanderPrestige` | CommanderPrestigeAbathurBiomass | 2 | 优点 / 战斗单位可以额外持有25层生物质，并且在死亡时有额外50%的几率掉落他们的生物质。 / 缺点 / 终极进化不可用。 |
| `CommanderPrestigeAbathurDeepTunnel` | `CommanderPrestige` | CommanderPrestigeAbathurDeepTunnel | 15 | 优点 / 蝗虫的攻击射程、移动速度和持续时间提高50%。深槽虫道的升级不再需要主巢，不再需要视野，并且蟑螂和破坏者可以使用。 / 缺点 / 战斗单位增加25%的高... |
| `CommanderPrestigeAbathurDeepTunnelLevel12` | `CommanderPrestige` | - | 4 | - |
| `CommanderPrestigeAbathurUltEvo` | `CommanderPrestige` | CommanderPrestigeAbathurUltimateEvo | 13 | - |
| `CommanderPrestigeAbathurUltEvoLevel15` | `CommanderPrestige` | - | 12 | - |
| `MasteryAbathurDoubleBiomass` | `-` | 精通 阿巴瑟 双倍生物质 | 1 | 敌方单位和建筑有一定几率掉落双倍生物质。 |
| `MasteryAbathurMendHeal` | `-` | 精通 阿巴瑟 愈合治疗持续时间 | 3 | 提高愈合周期性治疗的持续时间。 |
| `MasteryAbathurSymbioteCarapace` | `-` | 精通 阿巴瑟 共生体甲壳与伤害 | 3 | 提高共生体技能造成的伤害和吸收的伤害。 |
| `MasteryAbathurTechFastBuild` | `-` | 精通 阿巴瑟 科技快速建造 | 132 | 减少变异建筑和研究进化所需要的时间。 |
| `MasteryAbathurToxicNestCharge` | `-` | 精通 阿巴瑟 剧毒巢穴充能 | 5 | 提高剧毒巢穴的最大使用次数，并缩短剧毒巢穴的充能冷却时间。 / 每点使冷却时间缩短1%。 |
| `MasteryAbathurToxicNestDamageAndRespawn` | `-` | 精通 阿巴瑟 剧毒巢穴伤害 | 2 | 提高剧毒巢穴的伤害。 |
| `SwarmQueenVisual` | `-` | - | 2 | - |

### 研究/升级按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 守护者阿巴瑟 | `GuardianAttackRangeIncrease` | 加长散射 | `-` | HaveGuardianAttackRangeIncrease | 守护者的攻击射程提高{Upgrade,GuardianAttackRangeIncrease,EffectArray[0].Value}。 |
| 虫群宿主 | `HotSPressurizedGlands` | HotSPressurizedGlands | `InfestationPitResearch,Research8` | - | - |
| 虫群宿主 | `EvolveViperImprovedCastRangeLocked` | 进化剧毒细菌 | `-` | AbathurLevel08 | 该科技将在指挥官等级8时解锁。 |
| 虫群宿主 | `EvolveDeepTunnelLocked` | 进化深槽虫道 | `-` | AbathurLevel09 | 该科技将在指挥官等级9时解锁。 |
| 虫群宿主 | `EvolveViperAbductImprovedStunLocked` | 进化麻痹勾刺 | `-` | AbathurLevel09 | 该科技将在指挥官等级9时解锁。 |
| 虫群宿主 | `EvolveViperImprovedCastRange` | 剧毒细菌 | `InfestationPitResearch,Research9` | - | 所有飞蛇技能获得+{Upgrade,ViperImprovedCastRange,EffectArray[0].Value}的施法范围。 |
| 虫群宿主 | `ResearchNeuralParasite` | 进化神经寄生 | `InfestationPitResearch,Research4` | - | 使感染者能够使用神经寄生技能。 |
| 虫群宿主 | `AmorphousArmorcloud` | 微生物环绕云 | `InfestationPitResearch,Research6` | - | 制造一团遮蔽物，掩护下方的地面单位，使其受到远程单位的伤害降低{Behavior,AmorphousArmorcloud,DamageResponse.M... |
| 飞蛇 | `ViperImprovedCastRangePassive` | 剧毒细菌 | `-` | HaveViperImprovedCastRange | 所有飞蛇技能获得+{Upgrade,ViperImprovedCastRange,EffectArray[0].Value}的施法范围。 |
| 飞蛇 | `ViperAbductImprovedStunPassive` | 麻痹勾刺 | `-` | HaveViperAbductImprovedStun | 绑架使单位昏迷额外{Upgrade,ViperAbductImprovedStun,EffectArray[0].Value}秒。 |
| 莽兽 | `CommanderAbathurBrutaliskSymbiote` | CommanderAbathurBrutaliskSymbiote | `AbathurSymbioteHangerBrutalisk,Ammo1` | HaveBrutaliskgainsSymbioteUpgrade | - |

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
| 虫后 | `SwarmQueen` | `Queen, QueenCoop, SwarmQueen` | Ground; Biological/Psionic | 矿:175 气:- 人口字段:-2 生命:175 护盾:- 能量:200 | 支援单位。可以使用孵化菌毯肿瘤和速效哺液技能。 / 可以对地和对空。 |
| 蟑螂 | `RoachCorpser` | `RoachCorpser, RoachWarren` | -; - | 矿:- 气:- 人口字段:- 生命:145 护盾:- 能量:- | 蟑螂所伤的敌人若被迅速消灭后，会生成两只小蟑螂。 |
| 蟑螂 | `RoachVile` | `RoachVile, RoachWarren` | -; - | 矿:- 气:- 人口字段:- 生命:145 护盾:- 能量:- | 攻击能使敌人的移动和攻击速度降低{(1 - Behavior,VileAcidSlowFlatAmount,Modification.MoveSpee... |
| 破坏者 | `Ravager` | `Ravager` | Ground; Biological | 矿:100 气:0 人口字段:-3 生命:120 护盾:- 能量:- | 远程火炮单位。可以使用腐蚀胆汁。 / 可以对地。 |
| 飞蛇 | `Viper` | `Viper` | Air; Psionic | 矿:100 气:200 人口字段:-3 生命:150 护盾:- 能量:200 | 飞行的施法者，战地的控场大师。可使用寄生弹、吞噬、蔽目毒云和绑架技能。 |
| 莽兽 | `Brutalisk` | `Brutalisk` | -; - | 矿:500 气:300 人口字段:- 生命:- 护盾:- 能量:- | 重型突击巨兽，其体型和力量均远超雷兽。 / 可以对地和对空 |
| 守护者阿巴瑟 | `AbathurGuardian` | `GuardianMP` | Air; Armored/Biological/Massive | 矿:150 气:200 人口字段:-2 生命:150 护盾:- 能量:- | 超远距离对地空军。 / 可以对地。 |
| 吞噬者 | `Devourer` | `Devourer` | -; - | 矿:- 气:- 人口字段:- 生命:- 护盾:- 能量:- | 强大的对空飞行单位。可以使用腐蚀强酸。 / 可以对空。 |
| 异龙 | `Mutalisk` | `Mutalisk, Spire` | Air; Biological/Light | 矿:100 气:100 人口字段:-2 生命:120 护盾:- 能量:- | 飞行生物。能够利用弹射攻击同时伤害多个目标。 / 可以对地和对空。 |
| 蟑螂 | `Roach` | `Roach, RoachWarren` | Ground; Armored/Biological | 矿:75 气:25 人口字段:-2 生命:145 护盾:- 能量:- | 突击单位。潜地后能快速恢复生命值。可以变异为破坏者。 / 可以对地。 |

实现备注：运输机空投不要读取地图硬编码单位组，应从 `CommanderCargoLoadoutProfile` 读取当前 commander 的 `power_fusion` 单位清单和场景过滤规则；英雄是否允许投放需要显式声明。

## 10. 指挥官特殊机制

Owner：`CommanderSpecialMechanicProfile`、`CommanderSpecialResourceProfile`、`CommanderSpecialMechanicHookProfile`、`CommanderSpecialMechanicUnitProfile`。

本指挥官重点：生物质、毒巢、终极进化是本指挥官的主特殊机制。

### 特殊机制命中项

- 生物质收割者 (`Abathur`)
- 终极进化 (`AbathurUnlockBrutaliskLeviathan`)
- 剧毒巢穴 (`AbathurImprovedToxicNests`)
- 生物质恢复 (`AbathurBiomassRefund`)
- 感染深渊升级包 (`AbathurInfestationPitUpgrades`)
- 共生体 (`AbathurUnlockSymbiote`)
- 生质汲取 (`AbathurBiomassLifeLeech`)

### 特殊机制 Upgrade 候选

- 阿巴瑟生物质生命汲取 (`AbathurBiomassLifeLeech`)
- 阿巴瑟生物质返还 (`AbathurBiomassRefund`)
- 阿巴瑟 剧毒巢穴 增加生物质 (`AbathurToxicNestIcreasedBiomass`)
- CommanderPrestigeAbathurBiomass (`CommanderPrestigeAbathurBiomass`)
- CommanderPrestigeAbathurDeepTunnel (`CommanderPrestigeAbathurDeepTunnel`)
- 精通 阿巴瑟 双倍生物质 (`MasteryAbathurDoubleBiomass`)

### 特殊机制按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 守护者阿巴瑟 | `MoveHoldPosition` | 原地防御 | `move,HoldPos` | - | 命令选中的单位待在原地，并攻击射程内的敌方目标。接受命令的单位不会对敌人进行追击或移向敌人与其交战。 |
| 守护者阿巴瑟 | `MovePatrol` | 巡逻 | `move,Patrol` | - | 命令选中的单位在当前位置与目标区域间进行巡逻。巡逻的单位会对敌人发起攻击或移向附近的敌人与其交战。 |
| 守护者阿巴瑟 | `GuardianAttackRangeIncrease` | 加长散射 | `-` | HaveGuardianAttackRangeIncrease | 守护者的攻击射程提高{Upgrade,GuardianAttackRangeIncrease,EffectArray[0].Value}。 |
| 守护者阿巴瑟 | `EvolveToLeviathanLocked` | 进化为利维坦 | `-` | AbathurLevel02 | 该技能将在指挥官等级2时解锁。 |
| 守护者阿巴瑟 | `BiomassPassiveEmpty` | 生物质搜集 | `-` | BiomassBuffEmptyVisible | 该单位可以通过击杀敌方单位搜集生物质来获得能量。 |
| 吞噬者 | `EvolveToLeviathanLocked` | 进化为利维坦 | `-` | AbathurLevel02 | 该技能将在指挥官等级2时解锁。 |
| 吞噬者 | `BiomassPassiveEmpty` | 生物质搜集 | `-` | BiomassBuffEmptyVisible | 该单位可以通过击杀敌方单位搜集生物质来获得能量。 |
| 异龙 | `StukovInfestedWildMutation` | 斯托科夫 感染体 野性突变 | `StukovInfestedWildMutation,Execute` | - | 异龙的最大生命值提高{Behavior,WildMutation,Modification.VitalMaxArray[1]}点，攻击速度提高{(Beha... |
| 异龙 | `EvolveToLeviathanLocked` | 进化为利维坦 | `-` | AbathurLevel02 | 该技能将在指挥官等级2时解锁。 |
| 异龙 | `BiomassPassiveEmpty` | 生物质搜集 | `-` | BiomassBuffEmptyVisible | 该单位可以通过击杀敌方单位搜集生物质来获得能量。 |
| 虫道网络 | `SummonNydusCanalCreeper` | 召唤菌塔 | `BuildNydusCanal,Build3` | - | 在目标位置召唤菌塔。菌塔可以向选中的方向发射菌毯。 / 额外加成：异虫单位在菌毯上移动速度更快。 |
| 蟑螂 | `DeepTunnelLocked` | 深槽虫道 | `-` | AbathurLevel09DeepTunnelImproved | 该技能将在指挥官等级9时解锁。 |
| 蟑螂 | `BiomassPassiveEmpty` | 生物质搜集 | `-` | BiomassBuffEmptyVisible | 该单位可以通过击杀敌方单位搜集生物质来获得能量。 |
| 虫群宿主 | `HotSPressurizedGlands` | HotSPressurizedGlands | `InfestationPitResearch,Research8` | - | - |
| 虫群宿主 | `EvolveDeepTunnelLocked` | 进化深槽虫道 | `-` | AbathurLevel09 | 该科技将在指挥官等级9时解锁。 |
| 虫群宿主 | `EvolveViperImprovedCastRange` | 剧毒细菌 | `InfestationPitResearch,Research9` | - | 所有飞蛇技能获得+{Upgrade,ViperImprovedCastRange,EffectArray[0].Value}的施法范围。 |
| 虫群宿主 | `InfestorPassive` | InfestorPassive | `-` | HotSHaveInfestor | - |
| 虫群宿主 | `ResearchNeuralParasite` | 进化神经寄生 | `InfestationPitResearch,Research4` | - | 使感染者能够使用神经寄生技能。 |
| 虫群宿主 | `AmorphousArmorcloud` | 微生物环绕云 | `InfestationPitResearch,Research6` | - | 制造一团遮蔽物，掩护下方的地面单位，使其受到远程单位的伤害降低{Behavior,AmorphousArmorcloud,DamageResponse.M... |
| 虫后 | `BuildCreepTumor` | 产下菌毯肿瘤 | `QueenBuild,Build1` | - | 一种潜地的菌毯分泌腺体。菌毯能够为附近的异虫建筑提供给养。一颗菌毯肿瘤能够再分裂出一颗额外的菌毯肿瘤。 / 效果加成：异虫单位在菌毯上的移动速度更快 |
| 虫后 | `BiomassPassiveEmpty` | 生物质搜集 | `-` | BiomassBuffEmptyVisible | 该单位可以通过击杀敌方单位搜集生物质来获得能量。 |
| 虫后 | `BuildCreepTumor` | 产下菌毯肿瘤 | `QueenBuild,Build3` | - | 一种潜地的菌毯分泌腺体。菌毯能够为附近的异虫建筑提供给养。一颗菌毯肿瘤能够再分裂出一颗额外的菌毯肿瘤。 / 效果加成：异虫单位在菌毯上的移动速度更快 |
| 蟑螂 | `DeepTunnelLocked` | 深槽虫道 | `-` | AbathurLevel09DeepTunnelImproved | 该技能将在指挥官等级9时解锁。 |
| 蟑螂 | `BiomassPassiveEmpty` | 生物质搜集 | `-` | BiomassBuffEmptyVisible | 该单位可以通过击杀敌方单位搜集生物质来获得能量。 |
| 蟑螂 | `BrutaliskDeepTunnel` | 深槽虫道 | `AbathurDeepTunnelImproved,Execute` | - | 快速潜地前往目标位置。 |
| 飞蛇 | `BiomassPassiveEmpty` | 生物质搜集 | `-` | BiomassBuffEmptyVisible | 该单位可以通过击杀敌方单位搜集生物质来获得能量。 |
| 飞蛇 | `CommanderPrestigeAbathurLeviathanLocked` | 进化为利维坦 | `-` | CommanderPrestigeAbathurBiomass | 该技能被指挥官威望锁定。 |
| 飞蛇 | `EvolveToLeviathanLocked` | 进化为利维坦 | `-` | AbathurLevel02 | 该技能将在指挥官等级2时解锁。 |
| 莽兽 | `AbathurBrutaliskLeviathanSymbioteLocked` | 共生体 | `-` | AbathurLevel10 | 该技能将在指挥官等级10时解锁。 |
| 莽兽 | `BrutaliskDeepTunnel` | 深槽虫道 | `BrutaliskDeepTunnel,Execute` | - | 快速潜地前往目标位置。 |
| 利维坦 | `SymbioteCarapace` | 甲壳 | `SymbioteCarapace,Execute` | - | 为自己添加护盾{Behavior,SymbioteCarapace,Modification.VitalMaxArray[Shields]}，持续8秒。 |
| 利维坦 | `AbathurBrutaliskLeviathanSymbioteLocked` | 共生体 | `-` | AbathurLevel10 | 该技能将在指挥官等级10时解锁。 |
| 利维坦 | `AbathurBrutaliskLeviathanSymbiote` | 共生体 | `-` | HaveBrutaliskLeviathanSymbiote | 获得一个拥有下列技能的共生体： / 刺击：每{Abil,SymbioteStab,Cost[0].Cooldown.TimeUse}秒攻击周围的敌人，造成... |

实现备注：凡是涉及局内状态、资源、堆叠、全局计时器、隐藏 caster、英雄成长或召唤首领的机制，都必须有 runtime hook 和 `[XM_DBG]` 日志。

## 11. 指挥官个性化机制

Owner：`CommanderPersonalMechanicProfile`、`CommanderPersonalMechanicEffectProfile`、`CommanderPersonalMechanicHookProfile`、`CommanderPersonalMechanicRequirementProfile`。

本指挥官重点：生物质驱动单位成长，终极进化和毒巢需要 runtime hook 记录堆叠、拾取和单位替换。

### 威望正向融合输入

| 威望 ID | Primary Upgrade | 禁用单位 | 启用单位 | 禁用 Ability | 补充 Upgrade |
|---|---|---|---|---|---|
| `CommanderPrestigeAbathurBiomass` | `CommanderPrestigeAbathurBiomass` | `-` | `-` | `-` | `-` |
| `CommanderPrestigeAbathurDeepTunnel` | `CommanderPrestigeAbathurDeepTunnel` | `-` | `-` | `-` | `AbathurDeepTunnel1` |
| `CommanderPrestigeAbathurUltimateEvo` | `CommanderPrestigeAbathurUltEvo` | `-` | `-` | `-` | `AbathurUltimateEvo1` |

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
hero_ability_smoke
hero_mode_smoke
unit_ability_smoke
tech_smoke
cargo_smoke
special_mechanic_smoke
personal_mechanic_smoke
```

补充：需要排查官方基础差异时才跑 `initial_units`，不要把它当作默认玩法状态。英雄指挥官还要单独验证 `hero_smoke`、`hero_ability_smoke`、`hero_mode_smoke`。

## `[XM_DBG]` 日志建议

```text
[XM_DBG][INFO][COMMANDER_PROFILE_LOAD] commander=Abathur levelMode=FullLevel15 masteryMode=AllSixMax rosterStage=power_fusion result=ok
[XM_DBG][INFO][POWER_FUSION_APPLY] commander=Abathur levelMode=FullLevel15 masteryMode=AllSixMax prestigeMode=SelectedPositive result=ok
[XM_DBG][INFO][ROSTER_LOAD] commander=Abathur stage=power_fusion units=10 buildings=4 heroes=1 result=ok
[XM_DBG][INFO][HERO_PROFILE_LOAD] commander=Abathur heroes=1 result=ok
[XM_DBG][INFO][MODULE_VERIFY] commander=Abathur module=<01-11> profile=<profile> result=ok
[XM_DBG][WARN][CASC_AUDIT_REQUIRED] commander=Abathur module=<module> object=<object> result=needs-casc-audit
```

## 第一轮待审计项

- 顶部技能的 caster、按钮、冷却、充能、目标转发闭包。
- 英雄或特殊英雄的 Unit、Ability、Behavior、Weapon、Actor、Sound、复活/重生闭包。
- `power_fusion` 最终 roster 与 `level15` roster 的新增、替换、变体关系。
- 6 项精通的真实作用对象和最终数值。
- 3 个威望的正面收益、负面代价、disable/suppress、费用/冷却/上限变化。
- 科技建筑研究按钮、Requirement、Upgrade effect 是否完整。
- 特殊机制、英雄成长和个性化机制是否需要 runtime hook。
