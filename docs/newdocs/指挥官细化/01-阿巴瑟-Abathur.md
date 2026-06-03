# 阿巴瑟（Abathur）指挥官细化

日期：2026-05-27

## 当前口径

当前指挥官默认 15 级，不从 1 级开始；精通默认 6 项全部 30 点；威望默认只取正面收益，不直接启用官方 `PlayerPrestige`。`initial` 只作为官方基础状态审计和差异对照，默认测试和玩法应看 `power_fusion` 最终状态。

本文件按 `docs/newdocs/模块拆分` 的 11 个模块整理 阿巴瑟。依据 `游戏数据/官方合作指挥官/commanders/Abathur/` 的当前 JSON 生成；具体 Ability、Behavior、Weapon、Actor、Effect、Requirement 闭包仍需继续追 `references/sc2-build-96883-casc-export/` 或实机 `[XM_DBG]` 日志。

## 链路提醒

- `Leviathan` 在官方口径里按单位/终极进化对象处理，不按英雄处理；`heroes.json` 仍为 0。
- `03. 普通单位技能及其进化功能` 和 `10. 指挥官特殊机制` 已经把阿巴瑟的关键链路拆开，重点是 `Ravager`、`Leviathan`、`Brutalisk`、`Deep Tunnel`。
- 实现时不要只看按钮是否显示；要同时核对 `ButtonData -> AbilData -> EffectData -> UnitData/UpgradeData -> RequirementData`，尤其是 `MorphRoachToRavager` / `MorphRoachVileToRavager` 和 `RavagerCorrosiveBile`。

## 官方数据摘要

| 项 | 值 |
|---|---|
| CommanderId | `ZergAbathur` |
| 中文名 | 阿巴瑟 |
| 默认升级 | `AbathurCommander` |
| 默认能力命令 | `MutaliskMorphToDevourer:`, `MutaliskMorphToGuardian:`, `TrainQueen:`, `MorphRoachToRavager:`, `SpireResearch:6`, `MorphRoachVileToRavager:` |
| 威望 ID | `CommanderPrestigeAbathurBiomass`, `CommanderPrestigeAbathurDeepTunnel`, `CommanderPrestigeAbathurUltimateEvo` |
| heroes.json 数量 | 0 |
| roster.json 数量 | 14 |
| units.json 数量 | 12 |
| buildings.json 数量 | 2 |
| command_cards.json 对象数 | 12 |
| upgrades.json 数量 | 22 |
| other-tech-entries.json 数量 | 0 |
| source | `mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/userdata.xml` |

roster 样例：

```text
AbathurGuardian, Devourer, Mutalisk, Roach, SpineCrawler, SporeCrawler, SwarmHost, SwarmQueen, RoachCorpser, RoachVile, Ravager, Viper, Brutalisk, Leviathan
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
| 默认能力 | - | MutaliskMorphToDevourer: | - | 来自 commander.json |
| 默认能力 | - | MutaliskMorphToGuardian: | - | 来自 commander.json |
| 默认能力 | - | TrainQueen: | - | 来自 commander.json |
| 默认能力 | - | MorphRoachToRavager: | - | 来自 commander.json |
| 默认能力 | - | SpireResearch:6 | - | 来自 commander.json |
| 默认能力 | - | MorphRoachVileToRavager: | - | 来自 commander.json |
| Lv2 终极进化 | 2 | EvolveToLeviathanMutalisk: | - | 使用100层生物质解锁地面单位进化成莽兽的技能。空中单位使用100层生物质可以进化成利维坦。 |
| Lv2 终极进化 | 2 | EvolveToLeviathanGuardianMP: | - | 使用100层生物质解锁地面单位进化成莽兽的技能。空中单位使用100层生物质可以进化成利维坦。 |
| Lv2 终极进化 | 2 | EvolveToLeviathanDevourer: | - | 使用100层生物质解锁地面单位进化成莽兽的技能。空中单位使用100层生物质可以进化成利维坦。 |
| Lv4 蟑螂温室升级包 | 4 | RoachWarrenResearch:5 | - | 在蟑螂温室中解锁以下升级： / 蟑螂生命值低于50%时获得+6护甲。破坏者的腐蚀胆汁技能造成的伤害提高40点。 |
| Lv4 蟑螂温室升级包 | 4 | RoachWarrenResearch:7 | - | 在蟑螂温室中解锁以下升级： / 蟑螂生命值低于50%时获得+6护甲。破坏者的腐蚀胆汁技能造成的伤害提高40点。 |
| Lv6 进化腔升级包 | 6 | BioMechanicalTransfusion: | - | 在进化腔中解锁以下升级： / 允许孵化场、虫穴和主巢同时生成两只虫后。使虫后的速效哺液的治疗量提高10点，并且可以治疗生物和机械单位。 |
| Lv6 进化腔升级包 | 6 | evolutionchamberresearch:10 | - | 在进化腔中解锁以下升级： / 允许孵化场、虫穴和主巢同时生成两只虫后。使虫后的速效哺液的治疗量提高10点，并且可以治疗生物和机械单位。 |
| Lv6 进化腔升级包 | 6 | evolutionchamberresearch:11 | - | 在进化腔中解锁以下升级： / 允许孵化场、虫穴和主巢同时生成两只虫后。使虫后的速效哺液的治疗量提高10点，并且可以治疗生物和机械单位。 |
| Lv9 感染深渊升级包 | 9 | AbathurDeepTunnel: | - | 在感染深渊中解锁以下升级： / 解锁虫群宿主的深槽虫道技能，使其能快速潜地前往目标位置。解锁飞蛇的麻痹勾刺技能，延长其绑架技能造成的昏迷时间。 |
| Lv9 感染深渊升级包 | 9 | InfestationPitResearch:9 | - | 在感染深渊中解锁以下升级： / 解锁虫群宿主的深槽虫道技能，使其能快速潜地前往目标位置。解锁飞蛇的麻痹勾刺技能，延长其绑架技能造成的昏迷时间。 |
| Lv9 感染深渊升级包 | 9 | InfestationPitResearch:11 | - | 在感染深渊中解锁以下升级： / 解锁虫群宿主的深槽虫道技能，使其能快速潜地前往目标位置。解锁飞蛇的麻痹勾刺技能，延长其绑架技能造成的昏迷时间。 |
| Lv11 尖塔升级包 | 11 | SpireResearch:10 | - | 在尖塔和巨型尖塔中解锁以下升级： / 提升守护者的攻击射程。使吞噬者的攻击可以造成范围伤害。升级异龙的攻击，对重甲单位造成100%加成伤害。 |
| Lv11 尖塔升级包 | 11 | SpireResearch:11 | - | 在尖塔和巨型尖塔中解锁以下升级： / 提升守护者的攻击射程。使吞噬者的攻击可以造成范围伤害。升级异龙的攻击，对重甲单位造成100%加成伤害。 |
| Lv11 尖塔升级包 | 11 | SpireResearch:8 | - | 在尖塔和巨型尖塔中解锁以下升级： / 提升守护者的攻击射程。使吞噬者的攻击可以造成范围伤害。升级异龙的攻击，对重甲单位造成100%加成伤害。 |

### command card 命中

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 飞蛇 | `ViperConsume` | 吞噬 | `ViperConsumeStructure,Execute` | - | 缠绕目标建筑，造成{-1 * (Effect,ViperConsumeStructureModifyTarget,VitalArray[0].Change * Effect,ViperConsumeStructureCreatePersistent,PeriodCount)... |

实现备注：面板只注册 profile 和转发 caster，地图不得按 commander 写 if/else。精通和威望影响面板冷却、充能、费用时，由本模块接收最终 modifier。

## 02. 英雄单位及其技能

Owner：`CommanderHeroProfile`、`CommanderHeroModeProfile`、`CommanderHeroAbilityProfile`、`CommanderHeroSkillTreeProfile`、`CommanderHeroReviveProfile`、`CommanderHeroModifierProfile`。

### 英雄单位清单

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| - | - | - | - | - | 官方 heroes.json 暂无条目；召唤物、形态、特殊英雄需从 progression、command_cards 或 CASC 继续追。 |

### 英雄技能按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| - | - | - | - | - | command_cards.json 未命中 heroes.json 对象按钮；英雄技能需从 CASC 或实机日志补。 |

### 英雄形态/模式候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| - | - | - | - | - | 未自动命中英雄形态或模式按钮。 |

### 英雄相关等级解锁

| 等级 | 名称 | 升级 | AbilityCmd | 说明 |
|---|---|---|---|---|
| - | - | - | - | 未自动命中英雄相关等级解锁；需要从 CASC 或实机日志补。 |

口径：heroes.json 当前没有条目；终极进化、莽兽、利维坦先按特殊机制和进化候选整理，是否提升为英雄由 HeroProfile 闭包确认。

待审计：Hero Unit、Ability、Behavior、Weapon、Actor、Sound、复活/重生、能量/资源、形态切换和威望改写闭包。

## 03. 普通单位技能及其进化功能

Owner：`CommanderUnitAbilityProfile`、`CommanderUnitStatProfile`、`CommanderUnitEvolutionProfile`、`CommanderUnitBehaviorProfile`、`CommanderUnitWeaponProfile`。

### 单位技能按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 守护者 | `GuardianAttackRangeIncrease` | 加长散射 | - | `HaveGuardianAttackRangeIncrease` | 守护者的攻击射程提高{Upgrade,GuardianAttackRangeIncrease,EffectArray[0].Value}。 |
| 守护者 | `EvolveToLeviathanLocked` | 进化为利维坦 | - | `AbathurLevel02` | 该技能将在指挥官等级2时解锁。 |
| 守护者 | `BiomassPassiveEmpty` | 生物质搜集 | - | `BiomassBuffEmptyVisible` | 该单位可以通过击杀敌方单位搜集生物质来获得能量。 |
| 吞噬者 | `DevourerAoEDamage` | 腐蚀喷涌 | - | `HaveDevourerAoEDamage` | 吞噬者攻击现在会造成范围性伤害。 |
| 吞噬者 | `CorrosiveAcidDevourer` | 腐蚀强酸 | `CorrosiveAcid,Execute` | - | 对目标区域内的所有敌方单位发射强酸，降低他们的攻击速度和护甲。叠加3次。 |
| 吞噬者 | `EvolveToLeviathanLocked` | 进化为利维坦 | - | `AbathurLevel02` | 该技能将在指挥官等级2时解锁。 |
| 吞噬者 | `BiomassPassiveEmpty` | 生物质搜集 | - | `BiomassBuffEmptyVisible` | 该单位可以通过击杀敌方单位搜集生物质来获得能量。 |
| 异龙 | `-` | - | - | - | - |
| 异龙 | `StukovInfestedWildMutation` | 斯托科夫 感染体 野性突变 | `StukovInfestedWildMutation,Execute` | - | 异龙的最大生命值提高{Behavior,WildMutation,Modification.VitalMaxArray[1]}点，攻击速度提高{(Behavior,WildMutation,Modification.AttackSpeedMultiplier - 1) * ... |
| 异龙 | `EvolveToLeviathanLocked` | 进化为利维坦 | - | `AbathurLevel02` | 该技能将在指挥官等级2时解锁。 |
| 异龙 | `BiomassPassiveEmpty` | 生物质搜集 | - | `BiomassBuffEmptyVisible` | 该单位可以通过击杀敌方单位搜集生物质来获得能量。 |
| 异龙 | `MorphtoDevourer` | - | `MutaliskMorphToDevourer,Train1` | - | 强大的对空飞行单位。可以使用腐蚀强酸。 / 可以对空。 |
| 蟑螂 | `GlialReconstitutionPassive` | 神经胶原重组 | - | `HaveGlialReconstitution` | 移动速度提高。 |
| 蟑螂 | `ZerglingBurrowMove` | ZerglingBurrowMove | - | `HaveOrganicCarapace` | - |
| 蟑螂 | `HotSRoachDamage` | HotSRoachDamage | - | `HaveHotSRoachDamage` | - |
| 蟑螂 | `HotSRoachShield` | HotSRoachShield | - | `HaveHotSRoachShield` | - |
| 蟑螂 | `-` | - | - | - | - |
| 蟑螂 | `Ravager` | 变异为破坏者 | `MorphRoachToRavager,Train1` | - | 远程火炮单位。可以使用腐蚀胆汁。 / 可以对地。 |
| 蟑螂 | `DeepTunnelLocked` | 深槽虫道 | - | `AbathurLevel09DeepTunnelImproved` | 该技能将在指挥官等级9时解锁。 |
| 蟑螂 | `EvolveToBrutaliskLocked` | 进化为莽兽 | - | `AbathurLevel02` | 该技能将在指挥官等级2时解锁。 |
| 蟑螂 | `BiomassPassiveEmpty` | 生物质搜集 | - | `BiomassBuffEmptyVisible` | 该单位可以通过击杀敌方单位搜集生物质来获得能量。 |
| 蟑螂 | `BurrowUp` | 出地 | `BurrowUltraliskUp,Execute` | - | 命令单位钻回地表。 |
| 虫群宿主 | `-` | - | - | - | - |
| 虫群宿主 | `LocustLaunch` | - | `LocustLaunch,Execute` | - | - |
| 虫群宿主 | `DeepTunnelLocked` | 深槽虫道 | - | `AbathurLevel09` | 该技能将在指挥官等级9时解锁。 |
| 虫群宿主 | `EvolveToBrutaliskLocked` | 进化为莽兽 | - | `AbathurLevel02` | 该技能将在指挥官等级2时解锁。 |
| 虫群宿主 | `BiomassPassiveEmpty` | 生物质搜集 | - | `BiomassBuffEmptyVisible` | 该单位可以通过击杀敌方单位搜集生物质来获得能量。 |
| 虫群宿主 | `AbathurDeepTunnel` | 深槽虫道 | `AbathurDeepTunnel,Execute` | - | 快速潜地前往可见目标位置。 |
| 虫群宿主 | `SwarmHostRootBurrow` | SwarmHostRootBurrow | `MorphToSwarmHostBurrowed,Execute` | - | - |
| 蟑螂 | `-` | - | - | - | - |
| 蟑螂 | `-` | - | - | `HaveOrganicCarapace` | - |
| 蟑螂 | `Ravager` | 变异为破坏者 | `MorphRoachToRavager,Train1` | - | 远程火炮单位。可以使用腐蚀胆汁。 / 可以对地。 |
| 蟑螂 | `VilePassive` | VilePassive | - | - | - |
| 蟑螂 | `GlialReconstitutionPassive` | 神经胶原重组 | - | `HaveGlialReconstitution` | 移动速度提高。 |
| 蟑螂 | `ZerglingBurrowMove` | ZerglingBurrowMove | - | `HaveOrganicCarapace` | - |
| 蟑螂 | `-` | - | - | - | - |
| 蟑螂 | `HotSRoachShield` | HotSRoachShield | - | `HaveHotSRoachShield` | - |
| 蟑螂 | `Ravager` | 变异为破坏者 | `MorphRoachVileToRavager,Train1` | - | 远程火炮单位。可以使用腐蚀胆汁。 / 可以对地。 |
| 蟑螂 | `DeepTunnelLocked` | 深槽虫道 | - | `AbathurLevel09DeepTunnelImproved` | 该技能将在指挥官等级9时解锁。 |
| 蟑螂 | `EvolveToBrutaliskLocked` | 进化为莽兽 | - | `AbathurLevel02` | 该技能将在指挥官等级2时解锁。 |
| 蟑螂 | `BiomassPassiveEmpty` | 生物质搜集 | - | `BiomassBuffEmptyVisible` | 该单位可以通过击杀敌方单位搜集生物质来获得能量。 |
| 蟑螂 | `BrutaliskDeepTunnel` | 深槽虫道 | `AbathurDeepTunnelImproved,Execute` | - | 快速潜地前往目标位置。 |
| 破坏者 | `RavagerCorrosiveBile` | 腐蚀胆汁 | `RavagerCorrosiveBile,Execute` | - | 朝目标位置发射一枚飞弹，撞击后对该范围内的所有单位造成{Effect,RavagerCorrosiveBileDamage,Amount}点伤害。 / 可以摧毁星灵力场。 |
| 破坏者 | `BurrowDown` | 潜地 | `BurrowUltraliskDown,Execute` | - | 命令单位潜入地下。单位潜地后无法移动或攻击，但处于隐形状态。 |
| 破坏者 | `BurrowUp` | 出地 | `BurrowUltraliskUp,Execute` | - | 命令单位钻回地表。 |
| ... | ... | ... | ... | ... | 还有 23 项，后续从 command_cards.json 继续展开。 |

### 进化/形态/切换候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 守护者 | `EvolveToLeviathanLocked` | 进化为利维坦 | - | `AbathurLevel02` | 该技能将在指挥官等级2时解锁。 |
| 吞噬者 | `EvolveToLeviathanLocked` | 进化为利维坦 | - | `AbathurLevel02` | 该技能将在指挥官等级2时解锁。 |
| 异龙 | `EvolveToLeviathanLocked` | 进化为利维坦 | - | `AbathurLevel02` | 该技能将在指挥官等级2时解锁。 |
| 异龙 | `MorphtoDevourer` | - | `MutaliskMorphToDevourer,Train1` | - | 强大的对空飞行单位。可以使用腐蚀强酸。 / 可以对空。 |
| 蟑螂 | `ZerglingBurrowMove` | ZerglingBurrowMove | - | `HaveOrganicCarapace` | - |
| 蟑螂 | `Ravager` | 变异为破坏者 | `MorphRoachToRavager,Train1` | - | 远程火炮单位。可以使用腐蚀胆汁。 / 可以对地。 |
| 蟑螂 | `EvolveToBrutaliskLocked` | 进化为莽兽 | - | `AbathurLevel02` | 该技能将在指挥官等级2时解锁。 |
| 蟑螂 | `BurrowUp` | 出地 | `BurrowUltraliskUp,Execute` | - | 命令单位钻回地表。 |
| 脊针爬虫 | `SpineCrawlerUproot` | 站起 | `SpineCrawlerUproot,Execute` | - | 使脊针爬虫站起。站起的脊针爬虫能够移动，但无法攻击。在菌毯上的移动速度大幅提升。 |
| 孢子爬虫 | `SporeCrawlerUproot` | 站起 | `SporeCrawlerUproot,Execute` | - | 使孢子爬虫站起。站起的孢子爬虫能够移动，但无法攻击。在菌毯上的移动速度大幅提升。 |
| 虫群宿主 | `EvolveToBrutaliskLocked` | 进化为莽兽 | - | `AbathurLevel02` | 该技能将在指挥官等级2时解锁。 |
| 虫群宿主 | `SwarmHostRootBurrow` | SwarmHostRootBurrow | `MorphToSwarmHostBurrowed,Execute` | - | - |
| 蟑螂 | `Ravager` | 变异为破坏者 | `MorphRoachToRavager,Train1` | - | 远程火炮单位。可以使用腐蚀胆汁。 / 可以对地。 |
| 蟑螂 | `ZerglingBurrowMove` | ZerglingBurrowMove | - | `HaveOrganicCarapace` | - |
| 蟑螂 | `Ravager` | 变异为破坏者 | `MorphRoachVileToRavager,Train1` | - | 远程火炮单位。可以使用腐蚀胆汁。 / 可以对地。 |
| 蟑螂 | `EvolveToBrutaliskLocked` | 进化为莽兽 | - | `AbathurLevel02` | 该技能将在指挥官等级2时解锁。 |
| 破坏者 | `BurrowDown` | 潜地 | `BurrowUltraliskDown,Execute` | - | 命令单位潜入地下。单位潜地后无法移动或攻击，但处于隐形状态。 |
| 破坏者 | `BurrowUp` | 出地 | `BurrowUltraliskUp,Execute` | - | 命令单位钻回地表。 |
| 飞蛇 | `EvolveToLeviathanLocked` | 进化为利维坦 | - | `AbathurLevel02` | 该技能将在指挥官等级2时解锁。 |
| 莽兽 | `BurrowDown` | 潜地 | `BurrowBrutaliskDown,Execute` | - | 命令单位潜入地下。单位潜地后无法移动或攻击，但处于隐形状态。 |

实现备注：单位自身声明技能、被动、武器、Behavior 和升级后替换关系；科技建筑只触发研究，不在科技建筑内部判断所有兵种 if/else。

## 04. 初始化基地与特殊建筑

Owner：`CommanderBaseInitProfile`、`CommanderOpeningLoadoutProfile`、`CommanderSpecialStructureProfile`、`CommanderInitHookProfile`。

### 初始化建筑候选

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 脊针爬虫 | `SpineCrawler` | `SpineCrawler` | Ground; Armored/Biological/Structure; Structure; Melee | 矿:150 气:- 人口:- 生命:300 护盾:- 能量:- | 对地防御建筑。 / 可以对地。 |
| 孢子爬虫 | `SporeCrawler` | `SporeCrawler` | Ground; Armored/Biological/Structure; Structure; Melee | 矿:125 气:- 人口:- 生命:300 护盾:- 能量:- | 防空建筑。 / 可以对空 / 侦测单位 |

### 初始化/建造按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| - | - | - | - | - | 暂无自动命中项。 |

实现备注：地图初始化只传 commander、出生点和场景语义；基地、工人、特殊建筑、初始科技和补给由本指挥官 initializer 自己组装。

## 05. 指挥官兵种

Owner：`CommanderRosterProfile`、`CommanderUnitFactoryProfile`、`CommanderUnitReplacementProfile`、`CommanderLevelStageRosterProfile`。

### 当前 units.json 兵种清单

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 守护者 | `AbathurGuardian` | `GuardianMP` | Air; Armored/Biological/Massive; Unit; FactionEvolved | 矿:150 气:200 人口:-2 生命:150 护盾:- 能量:- | 超远距离对地空军。 / 可以对地。 |
| 吞噬者 | `Devourer` | `Devourer` | Unit; FactionEvolved | 矿:- 气:- 人口:- 生命:- 护盾:- 能量:- | 强大的对空飞行单位。可以使用腐蚀强酸。 / 可以对空。 |
| 异龙 | `Mutalisk` | `Mutalisk, Spire` | Air; Biological/Light; Unit; Melee | 矿:100 气:100 人口:-2 生命:120 护盾:- 能量:- | 飞行生物。能够利用弹射攻击同时伤害多个目标。 / 可以对地和对空。 |
| 蟑螂 | `Roach` | `Roach, RoachWarren` | Ground; Armored/Biological; Unit; Melee | 矿:75 气:25 人口:-2 生命:145 护盾:- 能量:- | 突击单位。潜地后能快速恢复生命值。可以变异为破坏者。 / 可以对地。 |
| 虫群宿主 | `SwarmHost` | `SwarmHost, InfestationPit, SwarmHostMP` | Unit | 矿:- 气:- 人口:- 生命:- 护盾:- 能量:- | 孵化2只蝗虫。蝗虫有{Behavior,LocustMPTimedLife,Duration}秒的限时生命。 / 可以对地。 |
| 虫后 | `SwarmQueen` | `SwarmQueen, Queen, QueenCoop` | Unit | 矿:- 气:- 人口:- 生命:- 护盾:- 能量:- | 支援单位。可以使用孵化菌毯肿瘤和速效哺液技能。 / 可以对地和对空。 |
| 蟑螂 | `RoachCorpser` | `RoachCorpser, RoachWarren` | Unit | 矿:- 气:- 人口:- 生命:145 护盾:- 能量:- | 蟑螂所伤的敌人若被迅速消灭后，会生成两只小蟑螂。 |
| 蟑螂 | `RoachVile` | `RoachVile, RoachWarren` | Unit; FactionEvolved | 矿:- 气:- 人口:- 生命:145 护盾:- 能量:- | 攻击能使敌人的移动和攻击速度降低{(1 - Behavior,VileAcidSlowFlatAmount,Modification.MoveSpeedMultiplier) * 100}%。英雄单位的移动和攻击速度降低{(1 - Behavior,VileAcidSlow... |
| 破坏者 | `Ravager` | `Ravager` | Ground; Biological; Unit; Melee | 矿:100 气:0 人口:-3 生命:120 护盾:- 能量:- | 远程火炮单位。可以使用腐蚀胆汁。 / 可以对地。 |
| 飞蛇 | `Viper` | `Viper` | Air; Psionic; Unit; Melee | 矿:100 气:200 人口:-3 生命:150 护盾:- 能量:200 | 飞行的施法者，战地的控场大师。可使用寄生弹、吞噬、蔽目毒云和绑架技能。 |
| 莽兽 | `Brutalisk` | `Brutalisk` | Unit; FactionEvolved | 矿:500 气:300 人口:- 生命:- 护盾:- 能量:- | 重型突击巨兽，其体型和力量均远超雷兽。 / 可以对地和对空 |
| 利维坦 | `Leviathan` | `Leviathan, HotSLeviathan` | Unit | 矿:- 气:- 人口:- 生命:- 护盾:- 能量:- | 统治天空的巨型飞行怪兽。 / 可以对空和对地。 |

### roster 中未归入 units/buildings/heroes 的对象

| 名称 | Catalog ID | 解析 Unit | 属性 | 备注 |
|---|---|---|---|---|
| - | - | - | - | roster 中没有额外未分类对象。 |

口径：`units.json` 是当前提取出的兵种清单；`roster.json` 仍作为审计入口，用于发现满级后新增、替换、召唤或特殊形态对象。满级之后兵种会变化，测试台默认使用 `power_fusion` 而不是基础 `initial`。

## 06. 指挥官精通

Owner：`CommanderMasteryProfile`、`CommanderMasteryOptionProfile`、`CommanderMasteryModifierProfile`。

### 六项精通 30 点口径

| 组 | 精通 | Upgrade | 每点增量 | 30 点结果 | 说明 |
|---|---|---|---|---|---|
| 1 | 剧毒巢穴伤害 | `MasteryAbathurToxicNestDamageAndRespawn` | `2` | +60% | - |
| 1 | 愈合治疗持续时间 | `MasteryAbathurMendHeal` | `10` | +300% | - |
| 2 | 共生体技能强化 | `MasteryAbathurSymbioteCarapace` | `3.3298` | +99.894% | - |
| 2 | 双倍生物质几率 | `MasteryAbathurDoubleBiomass` | `1.5` | +45% | - |
| 3 | 剧毒巢穴最大充能数和冷却时间 | `MasteryAbathurToxicNestCharge` | `1` | +30% | - |
| 3 | 建筑变异和研究时间 | `MasteryAbathurTechFastBuild` | `2` | -60% | - |

实现备注：当前默认六项精通全 30 点，不再做官方互斥取舍；若同一字段被多个精通/威望改写，必须进入 `CommanderModifierStackProfile` 明确叠加顺序。

## 07. 指挥官建筑

Owner：`CommanderBuildingProfile`、`CommanderBuildingAbilityProfile`、`CommanderBuildingReplacementProfile`。

### 当前 buildings.json 建筑清单

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 脊针爬虫 | `SpineCrawler` | `SpineCrawler` | Ground; Armored/Biological/Structure; Structure; Melee | 矿:150 气:- 人口:- 生命:300 护盾:- 能量:- | 对地防御建筑。 / 可以对地。 |
| 孢子爬虫 | `SporeCrawler` | `SporeCrawler` | Ground; Armored/Biological/Structure; Structure; Melee | 矿:125 气:- 人口:- 生命:300 护盾:- 能量:- | 防空建筑。 / 可以对空 / 侦测单位 |

### 建筑按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 脊针爬虫 | `SpineCrawlerUproot` | 站起 | `SpineCrawlerUproot,Execute` | - | 使脊针爬虫站起。站起的脊针爬虫能够移动，但无法攻击。在菌毯上的移动速度大幅提升。 |
| 脊针爬虫 | `-` | - | - | - | - |
| 孢子爬虫 | `SporeCrawlerUproot` | 站起 | `SporeCrawlerUproot,Execute` | - | 使孢子爬虫站起。站起的孢子爬虫能够移动，但无法攻击。在菌毯上的移动速度大幅提升。 |
| 孢子爬虫 | `Detector` | 侦测单位 | - | `NotUnderConstruction` | 该单位能够侦测到隐形、潜地和幻像单位。 |
| 孢子爬虫 | `-` | - | - | - | - |

实现备注：建筑自己的技能、生产队列、变形、起飞/降落、特殊自动施法由建筑 profile 声明；地图和科技建筑不持有跨指挥官判断。

## 08. 科技建筑及其升级选项

Owner：`CommanderTechBuildingProfile`、`CommanderTechOptionProfile`、`CommanderUpgradeEffectProfile`。

### 15 级解锁与研究命令

| 等级 | 名称 | 解锁升级 | 解锁 AbilityCmd | 说明 |
|---|---|---|---|---|
| 1 | 生物质收割者 | `SwarmQueenVisual` | - | 从死亡的敌人身上搜集生物质可以提升阿巴瑟单位的生命值、攻击速度和能量恢复。蟑螂不消耗高能瓦斯。幼虫孵化速度提高。 |
| 2 | 终极进化 | - | `EvolveToLeviathanMutalisk:`, `EvolveToLeviathanGuardianMP:`, `EvolveToLeviathanDevourer:` | 使用100层生物质解锁地面单位进化成莽兽的技能。空中单位使用100层生物质可以进化成利维坦。 |
| 3 | 剧毒巢穴 | `AbathurToxicNestIcreasedBiomass`, `AbathurHiddenToxicNest`, `AbathurToxicNestRespawnTalent` | - | 受到剧毒巢穴伤害的敌人掉落额外的生物质，并且攻击和移动速度有所降低。剧毒巢穴有一定几率在死亡时重生。敌人无法选中剧毒巢穴。 |
| 4 | 蟑螂温室升级包 | - | `RoachWarrenResearch:5`, `RoachWarrenResearch:7` | 在蟑螂温室中解锁以下升级： / 蟑螂生命值低于50%时获得+6护甲。破坏者的腐蚀胆汁技能造成的伤害提高40点。 |
| 5 | 强化愈合 | `AbathurImprovedMend` | - | 愈合可以储存最多3次充能，冷却时间缩短30秒。 |
| 6 | 进化腔升级包 | - | `BioMechanicalTransfusion:`, `evolutionchamberresearch:10`, `evolutionchamberresearch:11` | 在进化腔中解锁以下升级： / 允许孵化场、虫穴和主巢同时生成两只虫后。使虫后的速效哺液的治疗量提高10点，并且可以治疗生物和机械单位。 |
| 7 | 生物质恢复 | `AbathurBiomassRefund` | - | 被击杀后，你的单位有50%的几率掉落所有生物质。 |
| 8 | 新单位：飞蛇 | - | - | 飞行的施法单位，战地的控场大师。可使用寄生弹、吞噬、蔽目毒云和绑架技能。可以对空。 |
| 9 | 感染深渊升级包 | - | `AbathurDeepTunnel:`, `InfestationPitResearch:9`, `InfestationPitResearch:11` | 在感染深渊中解锁以下升级： / 解锁虫群宿主的深槽虫道技能，使其能快速潜地前往目标位置。解锁飞蛇的麻痹勾刺技能，延长其绑架技能造成的昏迷时间。 |
| 10 | 共生体 | `AbathurEnableSymbiote` | - | 莽兽和利维坦获得附身的共生体，攻击敌人并使用可吸收伤害的甲壳保护它们的宿主。 |
| 11 | 尖塔升级包 | - | `SpireResearch:10`, `SpireResearch:11`, `SpireResearch:8` | 在尖塔和巨型尖塔中解锁以下升级： / 提升守护者的攻击射程。使吞噬者的攻击可以造成范围伤害。升级异龙的攻击，对重甲单位造成100%加成伤害。 |
| 12 | 突变潜能 | `AbathurMorphTimeCostReduced` | - | 破坏者、守护者、吞噬者的变异时间和资源消耗减少50%。 |
| 13 | 蝗虫注射 | `AbathurEnemyDeathCreateLocusts` | - | 敌方单位在死亡时有一定几率孵化友方蝗虫。 |
| 14 | 蟑螂进化：秽型虫 | - | - | 将阿巴瑟的蟑螂升级成秽型虫变种。 / 突击单位。潜地时能快速恢复生命值。攻击可以削弱目标，降低其攻击和移动速度。 / 可以对地。 |
| 15 | 生质汲取 | `AbathurBiomassLifeLeech` | - | 阿巴瑟的单位每拥有一层生物质即可进行自我治疗，数值相当于它们造成伤害的1%。 |

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
| `CommanderPrestigeAbathurDeepTunnel` | `CommanderPrestige` | CommanderPrestigeAbathurDeepTunnel | 15 | 优点 / 蝗虫的攻击射程、移动速度和持续时间提高50%。深槽虫道的升级不再需要主巢，不再需要视野，并且蟑螂和破坏者可以使用。 / 缺点 / 战斗单位增加25%的高能瓦斯消耗。 |
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
| 守护者 | `GuardianAttackRangeIncrease` | 加长散射 | - | `HaveGuardianAttackRangeIncrease` | 守护者的攻击射程提高{Upgrade,GuardianAttackRangeIncrease,EffectArray[0].Value}。 |
| 飞蛇 | `ViperImprovedCastRangePassive` | 剧毒细菌 | - | `HaveViperImprovedCastRange` | 所有飞蛇技能获得+{Upgrade,ViperImprovedCastRange,EffectArray[0].Value}的施法范围。 |
| 飞蛇 | `ViperAbductImprovedStunPassive` | 麻痹勾刺 | - | `HaveViperAbductImprovedStun` | 绑架使单位昏迷额外{Upgrade,ViperAbductImprovedStun,EffectArray[0].Value}秒。 |
| 莽兽 | `CommanderAbathurBrutaliskSymbiote` | CommanderAbathurBrutaliskSymbiote | `AbathurSymbioteHangerBrutalisk,Ammo1` | `HaveBrutaliskgainsSymbioteUpgrade` | - |

实现备注：科技建筑只负责展示/触发研究；每个单位升级效果由对应 `CommanderUnitTechProfile` 或 `CommanderUpgradeEffectProfile` 声明。

## 09. 特定地图运输机空投单位

Owner：`CommanderCargoLoadoutProfile`、`CommanderMapDropProfile`、`CommanderScenarioFallbackProfile`。

### 原始mod 已有实现线索

| 范围 | 文件 | 已有实现 | 含义 | 迁移状态 |
|---|---|---|---|---|
| 通用 | `原始mod/Mods/XM/XMCore.SC2Mod/Base.SC2Data/Lib67C0F0E7.galaxy` | SOAStickyPoint、SOAStickyLine、AddCasterGroup、DropPodT、DropPodZ、DropCargoAndExit | 已有顶部技能点选、隐藏施法者分组、空投舱视觉和卸载后撤离的通用基础。 | 应抽成 XMFinal 的通用投送 primitive。 |
| 通用 | `原始mod/Mods/XM/XMCore.SC2Mod/Base.SC2Data/GameData/UserData.xml` | SOAStickyPoint UserData: AbilityPre、AbilityFin、CasterUnit | 顶栏点目标技能已经有数据驱动配置位。 | 可复用为运输/空投顶部技能的配置入口。 |
| 通用 | `原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/AbilData.xml` | SpecOpsDropshipTransport | XMFinal 已经持有特种运输机运输能力定义。 | 运行时 owner 优先沿用并参数化。 |
| 通用 | `原始mod/Maps/XM/thanson01、ttychus01、ttychus04` | ColonyShipTransport、SpecialOpsDropship、UnitCargoCreate、卸载后返航/消失 | 地图侧已有运输机货舱、卸载、返航和剧情运输模式。 | 地图保留场景语义，单位组合改由 profile 解析。 |
| 通用 | `原始mod/Maps/XM/thorner04.SC2Map/MapScript.galaxy` | gf_DropKillTeamViaHercules 创建 Hercules、UnitCargoCreate 塞兵、卸货后攻击 | 已有可复用的大力神空投执行器，但主要服务敌方/剧情 kill team。 | 可参考执行流程；不能直接当玩家指挥官 loadout 来源。 |
| 通用 | `原始mod 全局搜索` | 未命中 XM_CreateCommanderCargoSquad 或 CommanderCargoLoadoutProfile | 原始mod 只有素材和地图硬编码，没有现成的指挥官货舱配置框架。 | 本模块需要新建 profile/factory 抽象，不能照搬地图 if/else。 |

### 场景 loadout 设计草案

| ScenarioKind | 推荐单位 | 用途 | 设计说明 | 来源状态 |
|---|---|---|---|---|
| `cargo_light` | Roach x4, SwarmQueen x1 | 救援/早期运输 | 蟑螂抗线，虫后补治疗，不提前给终极进化。 | 设计草案；需按原始mod地图流程和实机日志继续校验。 |
| `cargo_heavy` | Ravager x3, SwarmHost x2, SwarmQueen x1 | 阵地突破 | 用腐蚀胆汁和虫群宿主压阵；Brutalisk 只放 bonus，避免剧情初段过强。 | 设计草案；需按原始mod地图流程和实机日志继续校验。 |
| `cargo_air` | Mutalisk x6, Viper x1 | 空中支援 | 异龙负责清杂，飞蛇用于控制；Leviathan 不作为普通空投。 | 设计草案；需按原始mod地图流程和实机日志继续校验。 |
| `bonus_reward` | Brutalisk x1 或 Leviathan x1 | 奖励/高潮战斗 | 只能在高强度奖励或终局事件使用，并输出特殊机制日志。 | 设计草案；需按原始mod地图流程和实机日志继续校验。 |
| `replacement_squad` | RoachVile x4, Ravager x2 | 满级替换 | 体现 15 级蟑螂变种和破坏者链。 | 设计草案；需按原始mod地图流程和实机日志继续校验。 |

### 接入规则

- 本模块不再从 `command_cards.json` 的运输/空投按钮自动推导货舱单位，也不把 `units.json` 全量清单当成可投放单位。
- 地图只传入 `mapId`、`scenarioKind`、目标点和运输模式；单位组合由 `CommanderCargoLoadoutProfile` 根据当前 commander、15 级 `power_fusion` roster 和场景限制解析。
- `原始mod` 已有运输机、空投舱、狮鹫运输、医疗运输机、坑道/深挖或感染运输容器时，应优先保留它的流程语义，只把硬编码单位替换为 profile 查询结果。
- 英雄、首领、终极进化、战列巡航舰、航母等高价值单位默认只能用于 `bonus_reward` 或显式允许英雄的地图场景。
实现备注：`CommanderMapDropProfile` 负责把地图事件映射为 `scenarioKind`；`CommanderScenarioFallbackProfile` 负责缺项降级并输出 `[XM_DBG][WARN][CARGO_FALLBACK]`。

## 10. 指挥官特殊机制

Owner：`CommanderSpecialMechanicProfile`、`CommanderSpecialResourceProfile`、`CommanderSpecialMechanicHookProfile`、`CommanderSpecialMechanicUnitProfile`。

本指挥官重点：生物质、毒巢、终极进化、共生体。

### 特殊机制命中项

- 终极进化 (AbathurUnlockBrutaliskLeviathan)
- 剧毒巢穴 (AbathurImprovedToxicNests)
- 生物质恢复 (AbathurBiomassRefund)
- 共生体 (AbathurUnlockSymbiote)
- 生质汲取 (AbathurBiomassLifeLeech)

### 特殊机制 Upgrade 候选

- 阿巴瑟生物质生命汲取 (`AbathurBiomassLifeLeech`)
- 阿巴瑟生物质返还 (`AbathurBiomassRefund`)
- 阿巴瑟启用共生激素 (`AbathurEnableSymbiote`)
- 阿巴瑟隐秘剧毒巢穴 (`AbathurHiddenToxicNest`)
- 阿巴瑟 剧毒巢穴 增加生物质 (`AbathurToxicNestIcreasedBiomass`)
- 阿巴瑟剧毒巢穴重生天赋 (`AbathurToxicNestRespawnTalent`)
- CommanderPrestigeAbathurBiomass (`CommanderPrestigeAbathurBiomass`)
- CommanderPrestigeAbathurUltimateEvo (`CommanderPrestigeAbathurUltEvo`)
- 精通 阿巴瑟 双倍生物质 (`MasteryAbathurDoubleBiomass`)
- 精通 阿巴瑟 共生体甲壳与伤害 (`MasteryAbathurSymbioteCarapace`)
- 精通 阿巴瑟 剧毒巢穴充能 (`MasteryAbathurToxicNestCharge`)
- 精通 阿巴瑟 剧毒巢穴伤害 (`MasteryAbathurToxicNestDamageAndRespawn`)

### 特殊机制按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 守护者 | `EvolveToLeviathanLocked` | 进化为利维坦 | - | `AbathurLevel02` | 该技能将在指挥官等级2时解锁。 |
| 守护者 | `BiomassPassiveEmpty` | 生物质搜集 | - | `BiomassBuffEmptyVisible` | 该单位可以通过击杀敌方单位搜集生物质来获得能量。 |
| 吞噬者 | `EvolveToLeviathanLocked` | 进化为利维坦 | - | `AbathurLevel02` | 该技能将在指挥官等级2时解锁。 |
| 吞噬者 | `BiomassPassiveEmpty` | 生物质搜集 | - | `BiomassBuffEmptyVisible` | 该单位可以通过击杀敌方单位搜集生物质来获得能量。 |
| 异龙 | `EvolveToLeviathanLocked` | 进化为利维坦 | - | `AbathurLevel02` | 该技能将在指挥官等级2时解锁。 |
| 异龙 | `BiomassPassiveEmpty` | 生物质搜集 | - | `BiomassBuffEmptyVisible` | 该单位可以通过击杀敌方单位搜集生物质来获得能量。 |
| 蟑螂 | `EvolveToBrutaliskLocked` | 进化为莽兽 | - | `AbathurLevel02` | 该技能将在指挥官等级2时解锁。 |
| 蟑螂 | `BiomassPassiveEmpty` | 生物质搜集 | - | `BiomassBuffEmptyVisible` | 该单位可以通过击杀敌方单位搜集生物质来获得能量。 |
| 虫群宿主 | `EvolveToBrutaliskLocked` | 进化为莽兽 | - | `AbathurLevel02` | 该技能将在指挥官等级2时解锁。 |
| 虫群宿主 | `BiomassPassiveEmpty` | 生物质搜集 | - | `BiomassBuffEmptyVisible` | 该单位可以通过击杀敌方单位搜集生物质来获得能量。 |
| 蟑螂 | `EvolveToBrutaliskLocked` | 进化为莽兽 | - | `AbathurLevel02` | 该技能将在指挥官等级2时解锁。 |
| 蟑螂 | `BiomassPassiveEmpty` | 生物质搜集 | - | `BiomassBuffEmptyVisible` | 该单位可以通过击杀敌方单位搜集生物质来获得能量。 |
| 蟑螂 | `BrutaliskDeepTunnel` | 深槽虫道 | `AbathurDeepTunnelImproved,Execute` | - | 快速潜地前往目标位置。 |
| 飞蛇 | `BiomassPassiveEmpty` | 生物质搜集 | - | `BiomassBuffEmptyVisible` | 该单位可以通过击杀敌方单位搜集生物质来获得能量。 |
| 飞蛇 | `CommanderPrestigeAbathurLeviathanLocked` | 进化为利维坦 | - | `CommanderPrestigeAbathurBiomass` | 该技能被指挥官威望锁定。 |
| 飞蛇 | `EvolveToLeviathanLocked` | 进化为利维坦 | - | `AbathurLevel02` | 该技能将在指挥官等级2时解锁。 |
| 莽兽 | `SymbioteCarapace` | 甲壳 | `SymbioteCarapace,Execute` | - | 为自己添加护盾{Behavior,SymbioteCarapace,Modification.VitalMaxArray[Shields]}，持续8秒。 |
| 莽兽 | `AbathurBrutaliskLeviathanSymbioteLocked` | 共生体 | - | `AbathurLevel10` | 该技能将在指挥官等级10时解锁。 |
| 莽兽 | `CommanderAbathurBrutaliskSymbiote` | CommanderAbathurBrutaliskSymbiote | `AbathurSymbioteHangerBrutalisk,Ammo1` | `HaveBrutaliskgainsSymbioteUpgrade` | - |
| 莽兽 | `BrutaliskDeepTunnel` | 深槽虫道 | `BrutaliskDeepTunnel,Execute` | - | 快速潜地前往目标位置。 |
| 莽兽 | `BurrowDown` | 潜地 | `BurrowBrutaliskDown,Execute` | - | 命令单位潜入地下。单位潜地后无法移动或攻击，但处于隐形状态。 |

实现备注：凡是涉及局内状态、资源、堆叠、全局计时器、隐藏 caster、英雄成长或召唤首领的机制，都必须有 runtime hook 和 `[XM_DBG]` 日志。

## 11. 指挥官个性化机制

Owner：`CommanderPersonalMechanicProfile`、`CommanderPersonalMechanicEffectProfile`、`CommanderPersonalMechanicHookProfile`、`CommanderPersonalMechanicRequirementProfile`。

本指挥官重点：生物质驱动单位成长，终极进化和毒巢需要 runtime hook 记录堆叠、拾取和单位替换。

### 威望正向融合输入

| 威望 ID | 名称 | Primary Upgrade | 禁用单位 | 启用单位 | 禁用 Ability | 补充 Upgrade |
|---|---|---|---|---|---|---|
| `CommanderPrestigeAbathurBiomass` | - | `CommanderPrestigeAbathurBiomass` | - | - | - | - |
| `CommanderPrestigeAbathurDeepTunnel` | - | `CommanderPrestigeAbathurDeepTunnel` | - | - | - | `AbathurDeepTunnel1` |
| `CommanderPrestigeAbathurUltimateEvo` | - | `CommanderPrestigeAbathurUltEvo` | - | - | - | `AbathurUltimateEvo1` |

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
[XM_DBG][INFO][ROSTER_LOAD] commander=Abathur stage=power_fusion units=12 buildings=2 heroes=0 result=ok
[XM_DBG][INFO][HERO_PROFILE_LOAD] commander=Abathur heroes=0 result=ok
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
