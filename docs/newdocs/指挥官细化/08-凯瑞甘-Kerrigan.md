# 凯瑞甘（Kerrigan）指挥官细化

日期：2026-05-27

## 当前口径

本文件统一按满级 `power_fusion` 口径编写：正文只讨论满级指挥官的最终态，不再把 1 级与 15 级拆成两套玩法态；等级 1-15 只保留为解锁门槛和审计锚点。精通默认 6 项全部 30 点，三个威望按正收益融合展开，不直接启用官方 `PlayerPrestige`。`initial` 仅用于官方基础状态审计和差异对照，默认测试和玩法都看 `power_fusion` 最终状态。

本文件按 `docs/newdocs/模块拆分` 的 11 个模块整理 凯瑞甘。依据 `游戏数据/官方合作指挥官/commanders/Kerrigan/` 的当前 JSON 生成；具体 Ability、Behavior、Weapon、Actor、Effect、Requirement 闭包仍需继续追 `游戏数据/官方SC2原始文本镜像/` 或实机 `[XM_DBG]` 日志。

## 链路提醒

- `K5Kerrigan` 和 `K5KerriganBurrowed` 仍然是同一条英雄主链；“刀锋女王 / 人类形态”的差异主要由威望和外观升级控制，不是两个互相独立的英雄单位。
- 2026-06-04 当前 Mod 已把运行名册和测试台名册切到 Kerrigan 私有单位：`BroodLordKerrigan`、`HydraliskKerrigan`、`MutaliskKerrigan`、`QueenCoopKerrigan`、`UltraliskKerrigan`、`ZerglingKerrigan`、`HydraliskLurkerKerrigan`、`OverseerKerrigan`。生产链抽查显示 `LarvaTrainKerrigan`、`TrainQueenKerrigan`、`MorphToOverseerKerrigan`、`MutaliskMorphToBroodLordKerrigan`、`MorphHydraliskToLurkerKerrigan` 的输出也已经落到私有单位；后续若继续补技能，应保持 Button -> Ability -> Unit/Effect 都使用私有链路。
- 2026-06-04 形态闭包补充：当前 Mod runtime 和测试台已显式纳入 `K5KerriganBurrowed`、`NydusCanalKerrigan`、`SpineCrawlerUprootedKerrigan`、`SporeCrawlerUprootedKerrigan`、`HydraliskLurkerBurrowedKerrigan`、`OverseerSiegeModeKerrigan`。对应 smoke 链路是 `K5Kerrigan <-> K5KerriganBurrowed` 英雄主链、`NydusNetworkKerrigan -> BuildNydusCanalKerrigan -> NydusCanalKerrigan`、`Spine/SporeCrawler* -> *UprootKerrigan -> *UprootedKerrigan -> *RootKerrigan`、`HydraliskLurkerKerrigan -> BurrowHydraliskLurkerDownKerrigan -> HydraliskLurkerBurrowedKerrigan -> BurrowHydraliskLurkerUpKerrigan`、`OverseerKerrigan -> OverseerMorphtoOverseerSiegeKerrigan -> OverseerSiegeModeKerrigan -> OverseerSiegeMorphtoOverseerKerrigan`。
- 第三威望通过 `KerriganInfestedCosmetic` / `KerriganGhostCosmetic` 切换外观并启用/禁用技能，追形态时要把威望和技能开关一起看。
- 凯瑞甘的 `NydusNetwork` 是官方 `buildings.json` 正向建筑，不能套用阿巴瑟的排除结论；但 `ZagaraVoidCoopZerglingDodge`、`MorphZerglingToBaneling`、`MorphToBaneling` 这类扎加拉/普通虫族跳虫链不在凯瑞甘满级名册中，只能作为共享污染排除项。

## 官方数据摘要

| 项 | 值 |
|---|---|
| CommanderId | `ZergKerrigan` |
| 中文名 | 凯瑞甘 |
| 默认升级 | `KerriganCommander`, `K5PrimalSlash`, `K5PsiStrike` |
| 默认能力命令 | `evolutionchamberresearch:19`, `evolutionchamberresearch:`, `evolutionchamberresearch:1`, `evolutionchamberresearch:2` |
| 威望 ID | `CommanderPrestigeKerriganCreep`, `CommanderPrestigeKerriganAbilities`, `CommanderPrestigeKerriganAssimilationAura` |
| heroes.json 数量 | 1 |
| roster.json 数量 | 10 |
| units.json 数量 | 6 |
| buildings.json 数量 | 3 |
| command_cards.json 对象数 | 9 |
| upgrades.json 数量 | 25 |
| other-tech-entries.json 数量 | 0 |
| source | `mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/userdata.xml` |

roster 样例：

```text
Broodlord, Hydralisk, MutaliskBroodlord, NydusNetwork, SpineCrawler, SporeCrawler, SwarmQueen, Ultralisk, Zergling, K5Kerrigan
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
| 默认能力 | - | evolutionchamberresearch:19 | - | 来自 commander.json |
| 默认能力 | - | evolutionchamberresearch: | - | 来自 commander.json |
| 默认能力 | - | evolutionchamberresearch:1 | - | 来自 commander.json |
| 默认能力 | - | evolutionchamberresearch:2 | - | 来自 commander.json |
| Lv2 定身波 | 2 | KerriganVoidCoopCrushingGripWave: | - | 解锁凯瑞甘的定身波技能，对位于其周围的一个大范围内的敌人造成伤害并陷入昏迷。 |
| Lv4 跳虫升级包 | 4 | SpawningPoolResearch:2 | - | 在分裂池中解锁新的研究项目： / 跳虫最大生命值提高10点。跳虫的攻击会使目标的护甲值降低到0，持续10秒。 |
| Lv4 跳虫升级包 | 4 | SpawningPoolResearch:3 | - | 在分裂池中解锁新的研究项目： / 跳虫最大生命值提高10点。跳虫的攻击会使目标的护甲值降低到0，持续10秒。 |
| Lv6 刺蛇与潜伏者升级包 | 6 | HydraliskDenResearch:4 | - | 在刺蛇巢和潜伏者巢穴中解锁以下升级： / 刺蛇的生命值由80提高到100。解锁刺蛇的狂暴技能，可使其在15秒内的攻击速度提高50%。潜伏者的射程由9提高到12。 |
| Lv6 刺蛇与潜伏者升级包 | 6 | HydraliskDenResearch:5 | - | 在刺蛇巢和潜伏者巢穴中解锁以下升级： / 刺蛇的生命值由80提高到100。解锁刺蛇的狂暴技能，可使其在15秒内的攻击速度提高50%。潜伏者的射程由9提高到12。 |
| Lv6 刺蛇与潜伏者升级包 | 6 | LurkerDenResearch: | - | 在刺蛇巢和潜伏者巢穴中解锁以下升级： / 刺蛇的生命值由80提高到100。解锁刺蛇的狂暴技能，可使其在15秒内的攻击速度提高50%。潜伏者的射程由9提高到12。 |
| Lv9 凯瑞甘升级包 | 9 | evolutionchamberresearch:20 | - | 在进化腔中解锁以下升级： / 使凯瑞甘的攻击除了能对她的目标造成普通伤害外，还会跳跃到附近一个敌人身上。凯瑞甘的技能消耗和冷却时间降低20%。 |
| Lv9 凯瑞甘升级包 | 9 | evolutionchamberresearch:21 | - | 在进化腔中解锁以下升级： / 使凯瑞甘的攻击除了能对她的目标造成普通伤害外，还会跳跃到附近一个敌人身上。凯瑞甘的技能消耗和冷却时间降低20%。 |
| Lv11 尖塔升级包 | 11 | SpireResearch:7 | - | 在尖塔和巨型尖塔中解锁以下升级： / 异龙的每次后续弹射攻击不再降低伤害。巢虫领主的移动速度提高75%，生命值提高+100点。 |
| Lv11 尖塔升级包 | 11 | SpireResearch:14 | - | 在尖塔和巨型尖塔中解锁以下升级： / 异龙的每次后续弹射攻击不再降低伤害。巢虫领主的移动速度提高75%，生命值提高+100点。 |
| Lv13 雷兽升级包 | 13 | UltraliskCavernResearch:3 | - | 在雷兽窟中解锁以下升级： / 解锁雷兽的潜地冲锋技能。雷兽会潜入地下并冲向一个敌方单位。升级雷兽的普通攻击，使其能将所造成伤害的40%转化为自身的治疗量。 |
| Lv13 雷兽升级包 | 13 | UltraliskCavernResearch:4 | - | 在雷兽窟中解锁以下升级： / 解锁雷兽的潜地冲锋技能。雷兽会潜入地下并冲向一个敌方单位。升级雷兽的普通攻击，使其能将所造成伤害的40%转化为自身的治疗量。 |
| Lv13 雷兽升级包 | 13 | UltraliskBurrowCharge: | - | 在雷兽窟中解锁以下升级： / 解锁雷兽的潜地冲锋技能。雷兽会潜入地下并冲向一个敌方单位。升级雷兽的普通攻击，使其能将所造成伤害的40%转化为自身的治疗量。 |

### command card 命中

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 虫道网络 | `SummonNydusWorm` | 召唤坑道虫 | `BuildNydusCanal,Build1` | - | 在目标地点召唤一条坑道虫。友方地面单位可借助虫道网络在任何该玩家拥有的坑道虫或虫道网络间穿梭。生成菌毯，可满足附近异虫建筑的存活需求。 / 效果加成：异虫单位在菌毯上的移动速度更快 |
| 虫道网络 | `SummonNydusCanalAttacker` | 召唤虫道毁灭者 | `BuildNydusCanal,Build2` | - | 在目标位置召唤虫道毁灭者。 / 只能攻击建筑。 |
| 虫道网络 | `SummonNydusCanalCreeper` | 召唤菌塔 | `BuildNydusCanal,Build3` | - | 在目标位置召唤菌塔。菌塔可以向选中的方向发射菌毯。 / 额外加成：异虫单位在菌毯上移动速度更快。 |
| 凯瑞甘 | `PsiStrike` | - | `PsiStrikeWalk,Execute` | - | 凯瑞甘飞速掠过敌人，并对其行进路线上的所有敌人造成{Effect,PsiStrikeDamage,Amount}点伤害。 |
| 凯瑞甘 | `PsionicLift` | - | `PsionicLift,Execute` | - | 目标区域中的敌人会昏迷，且在{time:[d ref='Effect,PsionicLiftControllerShort,Duration'/]}内受到{Effect,PsionicLiftPeriodicDamage,Amount*Effect,PsionicLiftD... |

实现备注：面板只注册 profile 和转发 caster，地图不得按 commander 写 if/else。精通和威望影响面板冷却、充能、费用时，由本模块接收最终 modifier。

## 02. 英雄单位及其技能

Owner：`CommanderHeroProfile`、`CommanderHeroModeProfile`、`CommanderHeroAbilityProfile`、`CommanderHeroSkillTreeProfile`、`CommanderHeroReviveProfile`、`CommanderHeroModifierProfile`。

### 英雄单位清单

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 凯瑞甘 | `K5Kerrigan` | `K5Kerrigan` | Hero; FactionEvolved | 矿:- 气:- 人口:- 生命:800 护盾:200 能量:- | - |

### 英雄技能按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 凯瑞甘 | `K5ZerglingRespawn` | K5ZerglingRespawn | - | - | - |
| 凯瑞甘 | `K5Cooldowns` | K5Cooldowns | - | `HaveK5Cooldowns` | - |
| 凯瑞甘 | `CommanderKerriganKerriganEnergyRegeneration` | 刀锋女王 | - | `HaveKerriganVoidCoopEnergyRegen` | 凯瑞甘的能量恢复速度提高50%。 |
| 凯瑞甘 | `KerriganChainLightning` | 连锁反应 | - | `KerriganLevel09` | 该科技将在指挥官等级9时解锁。 |
| 凯瑞甘 | `SpawnBanelings` | SpawnBanelings | `SpawnBanelings,Execute` | - | - |
| 凯瑞甘 | `K5DropPods` | K5DropPods | `K5DropPods,Execute` | - | - |
| 凯瑞甘 | `K5Fury` | K5Fury | - | `HaveK5Fury` | - |
| 凯瑞甘 | `PrimalSlash` | - | `PrimalSlash,Execute` | - | 凯瑞甘跳向目标并造成{Effect,PrimalSlash,Amount}点伤害。可以不指定目标发动技能来迅速移动。 |
| 凯瑞甘 | `MindBolt` | - | `MindBolt,Execute` | - | - |
| 凯瑞甘 | `K5HeroicFortitude` | K5HeroicFortitude | - | `HaveK5HeroicFortitude` | - |
| 凯瑞甘 | `PsiStrike` | - | `PsiStrikeWalk,Execute` | - | 凯瑞甘飞速掠过敌人，并对其行进路线上的所有敌人造成{Effect,PsiStrikeDamage,Amount}点伤害。 |
| 凯瑞甘 | `PsionicLift` | - | `PsionicLift,Execute` | - | 目标区域中的敌人会昏迷，且在{time:[d ref='Effect,PsionicLiftControllerShort,Duration'/]}内受到{Effect,PsionicLiftPeriodicDamage,Amount*Effect,PsionicLiftD... |
| 凯瑞甘 | `KerriganVoidCoopEconDrop` | 吸收光环 | `KerriganVoidCoopEconDrop,Execute` | - | 附近所有被消灭的敌人掉落资源。效果持续{Behavior,KerriganVoidCoopEconDropCaster,Duration}秒。 |
| 凯瑞甘 | `PrimalHeal` | PrimalHeal | `PrimalHeal,Execute` | - | - |
| 凯瑞甘 | `WildMutation` | WildMutation | `WildMutation,Execute` | - | - |
| 凯瑞甘 | `ChainReaction` | ChainReaction | - | `HaveK5ChainLightning` | - |
| 凯瑞甘 | `K5CooldownsLocked` | 技能专精 | - | `KerriganLevel09` | 该科技将在指挥官等级9时解锁。 |

### 英雄形态/模式候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 凯瑞甘 | `PsionicLift` | - | `PsionicLift,Execute` | - | 目标区域中的敌人会昏迷，且在{time:[d ref='Effect,PsionicLiftControllerShort,Duration'/]}内受到{Effect,PsionicLiftPeriodicDamage,Amount*Effect,PsionicLiftD... |

### 英雄相关等级解锁

| 等级 | 名称 | 升级 | AbilityCmd | 说明 |
|---|---|---|---|---|
| Lv1 | 变异甲壳 | - | - | 凯瑞甘在造成伤害时可暂时获得额外的生命值。凯瑞甘若被消灭，则能快速在孵化场处复活。 |
| Lv2 | 定身波 | - | `KerriganVoidCoopCrushingGripWave:` | 解锁凯瑞甘的定身波技能，对位于其周围的一个大范围内的敌人造成伤害并陷入昏迷。 |
| Lv3 | 残酷无情 | `KerriganVoidCoopImprovedLeapingStrike` | - | 凯瑞甘的跳击的伤害由150提高到300，施法距离由6提高到12。凯瑞甘的灵能位移的伤害由50提高至100。 |
| Lv4 | 跳虫升级包 | - | `SpawningPoolResearch:2`, `SpawningPoolResearch:3` | 在分裂池中解锁新的研究项目： / 跳虫最大生命值提高10点。跳虫的攻击会使目标的护甲值降低到0，持续10秒。 |
| Lv5 | 新单位：潜伏者 | - | - | 范围伤害伏击单位。必须潜地后才能发动攻击。由刺蛇变异而来。 / 可以对地。 |
| Lv6 | 刺蛇与潜伏者升级包 | - | `HydraliskDenResearch:4`, `HydraliskDenResearch:5`, `LurkerDenResearch:` | 在刺蛇巢和潜伏者巢穴中解锁以下升级： / 刺蛇的生命值由80提高到100。解锁刺蛇的狂暴技能，可使其在15秒内的攻击速度提高50%。潜伏者的射程由9提高到12。 |
| Lv7 | 恶变菌毯 | `K5CreepBonuses`, `KerriganCreepBonusesCoop` | - | 当处于菌毯上时，所有友方地面单位的攻击速度和生命恢复速度提高。提高菌毯肿瘤散布菌毯的速度和范围。 / 被动技能。 |
| Lv8 | 坑道虫欧米茄 | `VoidCoopGreaterNydusWorm` | - | 将虫道网络升级为虫道网络欧米茄，可召唤坑道虫欧米茄。坑道虫欧米茄无需消耗资源，能立即部署单位，且能被你的盟友使用。 / 被动技能。 |
| Lv9 | 凯瑞甘升级包 | - | `evolutionchamberresearch:20`, `evolutionchamberresearch:21` | 在进化腔中解锁以下升级： / 使凯瑞甘的攻击除了能对她的目标造成普通伤害外，还会跳跃到附近一个敌人身上。凯瑞甘的技能消耗和冷却时间降低20%。 |
| Lv10 | 狂怒 | `K5Fury` | - | 凯瑞甘的每次攻击都能提高自身10%的攻击速度，最多叠加到50%。 / 被动技能。 |
| Lv11 | 尖塔升级包 | - | `SpireResearch:7`, `SpireResearch:14` | 在尖塔和巨型尖塔中解锁以下升级： / 异龙的每次后续弹射攻击不再降低伤害。巢虫领主的移动速度提高75%，生命值提高+100点。 |
| Lv12 | 跳虫进化：腾跃虫 | - | - | 将凯瑞甘的跳虫升级为腾跃虫变种。 / 迅捷的肉搏型生物，可以越过障碍物迅速接近目标。造成更高的伤害。 / 可以对地。 |
| Lv13 | 雷兽升级包 | - | `UltraliskCavernResearch:3`, `UltraliskCavernResearch:4`, `UltraliskBurrowCharge:` | 在雷兽窟中解锁以下升级： / 解锁雷兽的潜地冲锋技能。雷兽会潜入地下并冲向一个敌方单位。升级雷兽的普通攻击，使其能将所造成伤害的40%转化为自身的治疗量。 |
| Lv14 | 雷兽进化：暴龙兽 | - | - | 将凯瑞甘的雷兽升级为暴龙兽变种。 / 重型攻击猛兽，可造成范围顺劈伤害。死亡后可以复活。 / 可以对地。 |
| Lv15 | 刀锋女王 | `KerriganVoidCoopEnergyRegen` | - | 凯瑞甘的能量恢复速度提高50%。 |

口径：heroes.json 已列出英雄条目，英雄单位、英雄技能和英雄形态都归本模块。

待审计：Hero Unit、Ability、Behavior、Weapon、Actor、Sound、复活/重生、能量/资源、形态切换和威望改写闭包。

### 形态与技能链路补充

| 类型 | ID | 说明 | 关键挂载 |
|---|---|---|---|
| 稳定主形态 | `K5Kerrigan` | 凯瑞甘主英雄体。 | `PrimalSlash`、`PsiStrike`、`PsionicLift`、`KerriganVoidCoopEconDrop`、`KerriganVoidCoopCrushingGripWave` |
| 稳定潜地形态 | `K5KerriganBurrowed` | 凯瑞甘潜地体。与主形态共享核心技能，只额外挂潜地出地与禁用器。 | `BurrowUp -> K5KerriganUnburrow,Execute`；`K5KerriganBurrowedDisabler` |
| 瞬态 helper | `K5KerriganPsiStrike` | `PsiStrikeWalk` 的 morph 目标，不是第三个持久英雄形态。 | `SelectAlias=K5Kerrigan`，`EditorCategories=ObjectType:Other,ObjectFamily:FactionEvolved` |

`K5KerriganBurrowedDisabler` 只禁用 `KerriganMaelstrom`、`KerriganVoidCoopEconDrop`、`KerriganVoidCoopCrushingGripWave`。`K5KerriganPsiStrikeMorph` 的 `InfoArray` 只指向 `K5KerriganPsiStrike`，所以 `PsiStrike` 的实际链路是按钮 `PsiStrike` -> `PsiStrikeWalk,Execute` -> `PsiStrikeWalk` transient ability -> `K5KerriganPsiStrikeMorph` -> `K5KerriganPsiStrike` -> 伤害/行为效果链。

### 关键技能快照

| 技能 | 面板/按钮 | 能力 ID | 关键参数 | 主要效果链 |
|---|---|---|---|---|
| `PrimalSlash` | `PrimalSlash` | `PrimalSlash,Execute` | 50 能量，0.125 秒冷却，距离 6。 | `PrimalSlashInitialSet` -> `PrimalSlashUpgradedSet` -> `PrimalSlashUpgraded` switch -> `PrimalSlashSet` / `PrimalSlashUpgradedLMWings` / `PrimalSlashJumpOnlyUnit` / `PrimalSlashJumpOnly` |
| `PsiStrike` | `PsiStrike` | `PsiStrikeWalk,Execute` | `PsiStrikeWalk` 是 transient，50 能量，`Cooldown Location="Unit"`，`PrepTime=0.01`，`Range=500`，`HaveK5PsiStrike`。 | `PsiStrikeTargetSearch` -> `PsiStrikeTargetSet` -> `PsiStrikeDamage` + `KerriganPsiStrikeDamageAB` -> `KerriganPsiStrikeDamaged` |
| `PsionicLift` | 官方英雄页显示 `PsionicLift`，raw unit card 里是 `KerriganVoidCoopCrushingGripWave` | `PsionicLift,Execute` / `KerriganVoidCoopCrushingGripWave,Execute` | `PsionicLift` 在 coop 层是 75 能量、0 冷却；`KerriganVoidCoopCrushingGripWave` 是 600 起手、180 玩家冷却、0.25 秒 finish、Cast/Finish 都不可打断。 | `PsionicLiftRaiseSearch` / `KerriganVoidCoopCrushingGripWaveDelayCP` -> `KerriganVoidCoopCrushingGripWaveSearch` -> `KerriganVoidCoopCrushingGripWaveDummyCP` -> `KerriganVoidCoopCrushingGripWaveSet` |
| `KerriganVoidCoopEconDrop` | `KerriganVoidCoopEconDrop` | `KerriganVoidCoopEconDrop,Execute` | 玩家冷却 120 秒。 | `KerriganVoidCoopEconDropCasterAB` -> `KerriganVoidCoopEconDropCaster` -> `KerriganVoidCoopEconDropSearch` -> `KerriganVoidCoopEconDropSet` -> `KerriganVoidCoopEconDropAB` |
| `MindBolt` | raw unit card 有，但默认 hero JSON 不把它当主面板核心技。 | `MindBolt,Execute` | 10 秒冷却，9 距离，允许移动且无减速；`MindBoltDamage` 在 coop 层是 150。 | `MindBoltLaunchMissile` -> `MindBoltDamageSet` -> `MindBoltDamage` + `K5InfestBroodlings` |

补充：`CommanderPrestigeKerriganAssimilationAura` 会禁用 `PsiStrikeWalk` 和 `PrimalSlash`，同时启用 `PsionicLift` 与 `MindBolt`。因此 `MindBolt` 应按威望切换技理解，不要和默认主面板技能混写。

### 威望 3 外观/技能切换

`CommanderPrestigeKerriganAssimilationAura` 不是新单位 morph，而是同一位 `K5Kerrigan` 的外观与技能集合重挂：

| 项 | 数据 | 结论 |
|---|---|---|
| 威望主键 | `CommanderPrestigeKerriganAssimilationAura` | 威望 3 的正向收益入口 |
| 外观来源 | `secondary_upgrades_self = KerriganGhostCosmetic` | 给凯瑞甘挂上幽灵/人形外观 |
| 外观抑制 | `suppress_upgrades = KerriganInfestedCosmetic` | 关闭感染体外观分支 |
| 技能禁用 | `PsiStrikeWalk`、`PrimalSlash` | 原本的跳击和冲刺链被关掉 |
| 技能启用 | `PsionicLift`、`MindBolt` | 切到控制 + 单点高伤技能组 |
| 角色模型 | `ModelSwap KerriganGhost00` / `ModelSwap InfestedKerrigan` | `!HaveKerriganInfestedCosmetic` 时走幽灵模型；有感染体外观时走感染体模型 |
| 动画分支 | `Abil.PsionicLift.SourceCastStart`、`Abil.MindBolt.SourceCastStart` | 同一技能在不同外观下播放不同动画 |

结论：这个威望改变的是“同一位凯瑞甘的外观 + 可用技能集合”，不是新增一个独立的人形英雄单位，也不是改成另一套 `unitdata.xml` 主体。

## 03. 普通单位技能及其进化功能

Owner：`CommanderUnitAbilityProfile`、`CommanderUnitStatProfile`、`CommanderUnitEvolutionProfile`、`CommanderUnitBehaviorProfile`、`CommanderUnitWeaponProfile`。

### 单位技能按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 巢虫领主 | `SwarmSeeds` | 虫种 | - | - | 巢虫领主通过投射出的巢虫来攻击目标。巢虫是一种可以对地的小型生物。 / 可以对地。 |
| 巢虫领主 | `BroodlordSpeed` | 孔状软骨 | - | `HaveBroodlordSpeed` | 巢虫领主的移动速度提高{$UpgradeEffectArrayValue:KerriganVoidCoopBroodlordSpeed:Unit,BroodLord,Speed$/Unit,BroodLord,Speed*100}%，生命值提高+{$UpgradeEffec... |
| 刺蛇 | `BuildLurkerLocked` | 变异为潜伏者 | - | `KerriganLevel06` | 该单位将在指挥官等级5时解锁。 |
| 刺蛇 | `HydraliskFrenzy` | 突击 | `HydraliskFrenzy,Execute` | - | 刺蛇向前突击，在短时间内大幅提升移动速度。 |
| 刺蛇 | `BurrowDown` | 潜地 | `BurrowUltraliskDown,Execute` | - | 命令单位潜入地下。单位潜地后无法移动或攻击，但处于隐形状态。 |
| 刺蛇 | `BurrowUp` | 出地 | `BurrowUltraliskUp,Execute` | - | 命令单位钻回地表。 |
| 刺蛇 | `FrenzyLocked` | 狂暴 | - | `KerriganLevel06` | 该技能将在指挥官等级6时解锁。 |
| 刺蛇 | `MuscularAugmentsCoop` | 肌腱扩增 | - | `HaveGroovedSpines` | 提高刺蛇的移动速度，并使其射程增加1。 |
| 刺蛇 | `-` | - | - | - | - |
| 异龙 | `-` | - | - | - | - |
| 异龙 | `SeveringGlave` | 削铁刃虫 | - | `HaveKerriganSunderingGlaive` | 异龙的每次后续弹射攻击不再降低伤害。 |
| 异龙 | `-` | - | - | `HaveKerriganViciousGlaive` | - |
| 雷兽 | `EvolveChitinousPlating` | 进化骨板 | - | `HaveUltraliskChitnousPlating` | 雷兽的护甲提高{$UpgradeEffectArrayValue:ChitinousPlating:Unit,Ultralisk,LifeArmor$}点。 |
| 雷兽 | `EvolveAnabolicSynthesis2` | 进化合成代谢 | - | `HaveUltraliskAnabolicSynthesis` | 提高雷兽在菌毯外的移动速度。 |
| 雷兽 | `Frenzied` | 狂暴 | - | - | 免疫减速、昏迷、精神控制和位移效果。 |
| 雷兽 | `HaveChitinousPlating` | 骨板 | - | `HaveHotSChitinousPlating` | 使雷兽的护甲值提高2点。 |
| 雷兽 | `BurrowDown` | 潜地 | `BurrowUltraliskDown,Execute` | - | 命令单位潜入地下。单位潜地后无法移动或攻击，但处于隐形状态。 |
| 雷兽 | `BurrowUp` | 出地 | `BurrowUltraliskUp,Execute` | - | 命令单位钻回地表。 |
| 雷兽 | `TissueAssimilation` | TissueAssimilation | - | `HaveHotSTissueAssimilation` | - |
| 雷兽 | `-` | - | - | - | - |
| 雷兽 | `BurrowChargeCampaign` | BurrowChargeCampaign | `UltraliskBurrowCharge,Execute` | - | - |
| 雷兽 | `BurrowChargeLocked` | 潜地冲锋 | - | `KerriganLevel13` | 该技能将在指挥官等级14时解锁。 |
| 跳虫 | `-` | - | - | `HaveMPMetabolicBoost` | - |
| 跳虫 | `-` | - | - | - | - |
| 跳虫 | `ZerglingArmorShred` | 切割利爪 | - | `HaveZerglingArmorShred` | 跳虫的攻击会使目标的护甲降低到0，持续{Behavior,ZerglingArmorShredTarget,Duration}秒。 |
| 跳虫（排除：扎加拉污染） | `ZagaraVoidCoopZerglingDodge` | 闪避 | - | `HaveMasteryZagaraZerglingDodgeChance` | 扎加拉跳虫精通被动污染；不计入凯瑞甘满级单位技能。 |
| 跳虫 | `-` | - | - | `HaveMPAdrenalGlands` | - |
| 跳虫（排除：非凯瑞甘） | `Baneling` | 变异为爆虫 | `MorphZerglingToBaneling,Train1` | - | 共享普通虫族爆虫变异污染；`Baneling` 不在凯瑞甘满级 `units.json` / `roster.json` 主链中。 |
| 跳虫 | `BurrowDown` | 潜地 | `BurrowUltraliskDown,Execute` | - | 命令单位潜入地下。单位潜地后无法移动或攻击，但处于隐形状态。 |
| 跳虫 | `BurrowUp` | 出地 | `BurrowUltraliskUp,Execute` | - | 命令单位钻回地表。 |
| 跳虫（排除：非凯瑞甘） | `-` | - | `MorphToBaneling,Execute` | - | 共享普通虫族爆虫变异污染；不计入凯瑞甘满级单位技能。 |

### 进化/形态/切换候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 刺蛇 | `BurrowDown` | 潜地 | `BurrowUltraliskDown,Execute` | - | 命令单位潜入地下。单位潜地后无法移动或攻击，但处于隐形状态。 |
| 刺蛇 | `BurrowUp` | 出地 | `BurrowUltraliskUp,Execute` | - | 命令单位钻回地表。 |
| 脊针爬虫 | `SpineCrawlerUproot` | 站起 | `SpineCrawlerUproot,Execute` | - | 使脊针爬虫站起。站起的脊针爬虫能够移动，但无法攻击。在菌毯上的移动速度大幅提升。 |
| 孢子爬虫 | `SporeCrawlerUproot` | 站起 | `SporeCrawlerUproot,Execute` | - | 使孢子爬虫站起。站起的孢子爬虫能够移动，但无法攻击。在菌毯上的移动速度大幅提升。 |
| 雷兽 | `EvolveChitinousPlating` | 进化骨板 | - | `HaveUltraliskChitnousPlating` | 雷兽的护甲提高{$UpgradeEffectArrayValue:ChitinousPlating:Unit,Ultralisk,LifeArmor$}点。 |
| 雷兽 | `EvolveAnabolicSynthesis2` | 进化合成代谢 | - | `HaveUltraliskAnabolicSynthesis` | 提高雷兽在菌毯外的移动速度。 |
| 雷兽 | `BurrowDown` | 潜地 | `BurrowUltraliskDown,Execute` | - | 命令单位潜入地下。单位潜地后无法移动或攻击，但处于隐形状态。 |
| 雷兽 | `BurrowUp` | 出地 | `BurrowUltraliskUp,Execute` | - | 命令单位钻回地表。 |
| 雷兽 | `BurrowChargeCampaign` | BurrowChargeCampaign | `UltraliskBurrowCharge,Execute` | - | - |
| 雷兽 | `BurrowChargeLocked` | 潜地冲锋 | - | `KerriganLevel13` | 该技能将在指挥官等级14时解锁。 |
| 跳虫 | `-` | - | - | `HaveMPAdrenalGlands` | - |
| 跳虫（排除：非凯瑞甘） | `Baneling` | 变异为爆虫 | `MorphZerglingToBaneling,Train1` | - | 共享普通虫族爆虫变异污染；`Baneling` 不在凯瑞甘满级 `units.json` / `roster.json` 主链中。 |
| 跳虫 | `BurrowDown` | 潜地 | `BurrowUltraliskDown,Execute` | - | 命令单位潜入地下。单位潜地后无法移动或攻击，但处于隐形状态。 |
| 跳虫 | `BurrowUp` | 出地 | `BurrowUltraliskUp,Execute` | - | 命令单位钻回地表。 |
| 跳虫（排除：非凯瑞甘） | `-` | - | `MorphToBaneling,Execute` | - | 共享普通虫族爆虫变异污染；不计入凯瑞甘进化链。 |
| 凯瑞甘 | `PsionicLift` | - | `PsionicLift,Execute` | - | 目标区域中的敌人会昏迷，且在{time:[d ref='Effect,PsionicLiftControllerShort,Duration'/]}内受到{Effect,PsionicLiftPeriodicDamage,Amount*Effect,PsionicLiftD... |

实现备注：单位自身声明技能、被动、武器、Behavior 和升级后替换关系；科技建筑只触发研究，不在科技建筑内部判断所有兵种 if/else。

## 04. 初始化基地与特殊建筑

Owner：`CommanderBaseInitProfile`、`CommanderOpeningLoadoutProfile`、`CommanderSpecialStructureProfile`、`CommanderInitHookProfile`。

### 初始化建筑候选

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 虫道网络 | `NydusNetwork` | `NydusNetwork` | Ground; Armored/Biological/Structure; Structure; Melee | 矿:200 气:150 人口:- 生命:850 护盾:- 能量:- | 友方地面部队可以迅速在玩家拥有的虫道网络和坑道虫之间穿梭。 / 开启： / - 坑道虫 |

### 初始化/建造按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 虫道网络 | `SummonNydusWorm` | 召唤坑道虫 | `BuildNydusCanal,Build1` | - | 在目标地点召唤一条坑道虫。友方地面单位可借助虫道网络在任何该玩家拥有的坑道虫或虫道网络间穿梭。生成菌毯，可满足附近异虫建筑的存活需求。 / 效果加成：异虫单位在菌毯上的移动速度更快 |
| 虫道网络 | `SummonNydusCanalAttacker` | 召唤虫道毁灭者 | `BuildNydusCanal,Build2` | - | 在目标位置召唤虫道毁灭者。 / 只能攻击建筑。 |
| 虫道网络 | `SummonNydusCanalCreeper` | 召唤菌塔 | `BuildNydusCanal,Build3` | - | 在目标位置召唤菌塔。菌塔可以向选中的方向发射菌毯。 / 额外加成：异虫单位在菌毯上移动速度更快。 |

实现备注：地图初始化只传 commander、出生点和场景语义；基地、工人、特殊建筑、初始科技和补给由本指挥官 initializer 自己组装。

## 05. 指挥官兵种

Owner：`CommanderRosterProfile`、`CommanderUnitFactoryProfile`、`CommanderUnitReplacementProfile`、`CommanderLevelStageRosterProfile`。

### 当前 units.json 兵种清单

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 巢虫领主 | `Broodlord` | `BroodLord` | Air; Armored/Biological/Massive; Unit; Melee | 矿:300 气:250 人口:-4 生命:225 护盾:- 能量:- | 大型飞行作战生物。通过投射出的巢虫来攻击目标。巢虫是一种可以对地的小型生物。 / 可以对地。 |
| 刺蛇 | `Hydralisk` | `Hydralisk, HydraliskDen` | Ground; Biological/Light; Unit; Melee | 矿:100 气:50 人口:-2 生命:90 护盾:- 能量:- | 远程攻击单位。可以变异为潜伏者。 / 可以对地和对空。 |
| 异龙 | `MutaliskBroodlord` | `MutaliskBroodlord, Spire` | Unit; FactionEvolved | 矿:- 气:- 人口:- 生命:- 护盾:- 能量:- | 能变异为巢虫领主： / 对地面单位进行远程攻击。孵化巢虫进行攻击。 |
| 虫后 | `SwarmQueen` | `SwarmQueen, Queen, QueenCoop` | Unit | 矿:- 气:- 人口:- 生命:- 护盾:- 能量:- | 支援单位。可以使用孵化菌毯肿瘤和速效哺液技能。 / 可以对地和对空。 |
| 雷兽 | `Ultralisk` | `Ultralisk, UltraliskCavern` | Ground; Armored/Biological/Massive; Unit; Melee | 矿:275 气:200 人口:-6 生命:500 护盾:- 能量:- | 重型攻击猛兽，可造成范围伤害。 / 可以对地。 |
| 跳虫 | `Zergling` | `Zergling, SpawningPool` | Ground; Biological/Light; Unit; Melee | 矿:25 气:- 人口:-0.5 生命:35 护盾:- 能量:- | 迅捷的肉搏型生物。可以变异为爆虫。 / 可以对地。 |

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
| 1 | 能量恢复 | `MasteryKerriganEnergyRegen` | `1.5` | +45% | - |
| 1 | 自动攻击伤害 | `MasteryKerriganAutoAttackDamage` | `1` | +30伤害 | - |
| 2 | 部队瓦斯消耗 | `MasteryKerriganArmyGasCost` | `1` | -30% | - |
| 2 | 定身波伤害 | `MasteryKerriganImmobilizationWaveDamage` | `3.3332` | +99.996% | - |
| 3 | 研究速度和消耗降低 | `MasteryKerriganResearchSpeedandCost` | `2` | -60%消耗 | - |
| 3 | 主要技能伤害和攻击速度 | `MasteryKerriganPrimarySpeedDamage` | `1` | 30% | - |

实现备注：当前默认六项精通全 30 点，不再做官方互斥取舍；若同一字段被多个精通/威望改写，必须进入 `CommanderModifierStackProfile` 明确叠加顺序。

## 07. 指挥官建筑

Owner：`CommanderBuildingProfile`、`CommanderBuildingAbilityProfile`、`CommanderBuildingReplacementProfile`。

### 当前 buildings.json 建筑清单

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 虫道网络 | `NydusNetwork` | `NydusNetwork` | Ground; Armored/Biological/Structure; Structure; Melee | 矿:200 气:150 人口:- 生命:850 护盾:- 能量:- | 友方地面部队可以迅速在玩家拥有的虫道网络和坑道虫之间穿梭。 / 开启： / - 坑道虫 |
| 脊针爬虫 | `SpineCrawler` | `SpineCrawler` | Ground; Armored/Biological/Structure; Structure; Melee | 矿:150 气:- 人口:- 生命:300 护盾:- 能量:- | 对地防御建筑。 / 可以对地。 |
| 孢子爬虫 | `SporeCrawler` | `SporeCrawler` | Ground; Armored/Biological/Structure; Structure; Melee | 矿:125 气:- 人口:- 生命:300 护盾:- 能量:- | 防空建筑。 / 可以对空 / 侦测单位 |

### 建筑按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 虫道网络 | `SummonNydusWorm` | 召唤坑道虫 | `BuildNydusCanal,Build1` | - | 在目标地点召唤一条坑道虫。友方地面单位可借助虫道网络在任何该玩家拥有的坑道虫或虫道网络间穿梭。生成菌毯，可满足附近异虫建筑的存活需求。 / 效果加成：异虫单位在菌毯上的移动速度更快 |
| 虫道网络 | `SummonNydusCanalAttacker` | 召唤虫道毁灭者 | `BuildNydusCanal,Build2` | - | 在目标位置召唤虫道毁灭者。 / 只能攻击建筑。 |
| 虫道网络 | `SummonNydusCanalCreeper` | 召唤菌塔 | `BuildNydusCanal,Build3` | - | 在目标位置召唤菌塔。菌塔可以向选中的方向发射菌毯。 / 额外加成：异虫单位在菌毯上移动速度更快。 |
| 虫道网络 | `SetRallyPoint` | 设定集结点 | `Rally,Rally1` | - | 将单位派往指定地点，派往资源点的工作单位会自动开始采集。 |
| 虫道网络 | `NydusCanalLoad` | 装载 | `NydusCanalTransport,Load` | - | 将单位装载进虫道网络。 |
| 虫道网络 | `NydusWormIncreasedArmorPassive` | 钻地鳞片 | - | - | 坑道虫在从地面钻出时拥有{Behavior,NydusWormArmor,Modification.LifeArmorBonus+1}点护甲。 |
| 虫道网络 | `-` | - | - | - | - |
| 虫道网络 | `-` | - | `RallyNydus,Rally1` | - | - |
| 虫道网络 | `ZagaraVoidCoopNydusWorm` | 召唤坑道虫 | - | - | 在目标位置召唤一只坑道虫。 / 友方地面单位可借助虫道网络在任何该玩家拥有的坑道虫或虫道网络间穿梭。生成菌毯，可满足附近异虫建筑的存活需求。 / 效果加成：异虫在菌毯上的移动速度更快。 |
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
| 1 | 变异甲壳 | - | - | 凯瑞甘在造成伤害时可暂时获得额外的生命值。凯瑞甘若被消灭，则能快速在孵化场处复活。 |
| 2 | 定身波 | - | `KerriganVoidCoopCrushingGripWave:` | 解锁凯瑞甘的定身波技能，对位于其周围的一个大范围内的敌人造成伤害并陷入昏迷。 |
| 3 | 残酷无情 | `KerriganVoidCoopImprovedLeapingStrike` | - | 凯瑞甘的跳击的伤害由150提高到300，施法距离由6提高到12。凯瑞甘的灵能位移的伤害由50提高至100。 |
| 4 | 跳虫升级包 | - | `SpawningPoolResearch:2`, `SpawningPoolResearch:3` | 在分裂池中解锁新的研究项目： / 跳虫最大生命值提高10点。跳虫的攻击会使目标的护甲值降低到0，持续10秒。 |
| 5 | 新单位：潜伏者 | - | - | 范围伤害伏击单位。必须潜地后才能发动攻击。由刺蛇变异而来。 / 可以对地。 |
| 6 | 刺蛇与潜伏者升级包 | - | `HydraliskDenResearch:4`, `HydraliskDenResearch:5`, `LurkerDenResearch:` | 在刺蛇巢和潜伏者巢穴中解锁以下升级： / 刺蛇的生命值由80提高到100。解锁刺蛇的狂暴技能，可使其在15秒内的攻击速度提高50%。潜伏者的射程由9提高到12。 |
| 7 | 恶变菌毯 | `K5CreepBonuses`, `KerriganCreepBonusesCoop` | - | 当处于菌毯上时，所有友方地面单位的攻击速度和生命恢复速度提高。提高菌毯肿瘤散布菌毯的速度和范围。 / 被动技能。 |
| 8 | 坑道虫欧米茄 | `VoidCoopGreaterNydusWorm` | - | 将虫道网络升级为虫道网络欧米茄，可召唤坑道虫欧米茄。坑道虫欧米茄无需消耗资源，能立即部署单位，且能被你的盟友使用。 / 被动技能。 |
| 9 | 凯瑞甘升级包 | - | `evolutionchamberresearch:20`, `evolutionchamberresearch:21` | 在进化腔中解锁以下升级： / 使凯瑞甘的攻击除了能对她的目标造成普通伤害外，还会跳跃到附近一个敌人身上。凯瑞甘的技能消耗和冷却时间降低20%。 |
| 10 | 狂怒 | `K5Fury` | - | 凯瑞甘的每次攻击都能提高自身10%的攻击速度，最多叠加到50%。 / 被动技能。 |
| 11 | 尖塔升级包 | - | `SpireResearch:7`, `SpireResearch:14` | 在尖塔和巨型尖塔中解锁以下升级： / 异龙的每次后续弹射攻击不再降低伤害。巢虫领主的移动速度提高75%，生命值提高+100点。 |
| 12 | 跳虫进化：腾跃虫 | - | - | 将凯瑞甘的跳虫升级为腾跃虫变种。 / 迅捷的肉搏型生物，可以越过障碍物迅速接近目标。造成更高的伤害。 / 可以对地。 |
| 13 | 雷兽升级包 | - | `UltraliskCavernResearch:3`, `UltraliskCavernResearch:4`, `UltraliskBurrowCharge:` | 在雷兽窟中解锁以下升级： / 解锁雷兽的潜地冲锋技能。雷兽会潜入地下并冲向一个敌方单位。升级雷兽的普通攻击，使其能将所造成伤害的40%转化为自身的治疗量。 |
| 14 | 雷兽进化：暴龙兽 | - | - | 将凯瑞甘的雷兽升级为暴龙兽变种。 / 重型攻击猛兽，可造成范围顺劈伤害。死亡后可以复活。 / 可以对地。 |
| 15 | 刀锋女王 | `KerriganVoidCoopEnergyRegen` | - | 凯瑞甘的能量恢复速度提高50%。 |

### Upgrade 摘要

| Upgrade | 父级 | 显示名 | Effect数 | 说明 |
|---|---|---|---|---|
| `CommanderPrestigeKerriganAbilities` | `CommanderPrestige` | 人类的愚行 | 8 | 优点 / 凯瑞甘在使用跳击和灵能位移时会消耗狂怒的层数，对附近的敌人造成50点伤害，并使其昏迷3秒。 / 缺点 / 凯瑞甘的变异甲壳生成量降低50%。凯瑞甘的技能伤害降低50%。 |
| `CommanderPrestigeKerriganAbilitiesMasteryImmobilizationWave` | `CommanderPrestige` | - | 1 | - |
| `CommanderPrestigeKerriganAbilitiesMasteryPrimary` | `CommanderPrestige` | - | 2 | - |
| `CommanderPrestigeKerriganAbilitiesPerk` | `CommanderPrestige` | - | 2 | - |
| `CommanderPrestigeKerriganAssimilationAura` | `CommanderPrestige` | 荒寂女王 | 0 | 优点 / 吸收光环资源掉落提高100%。凯瑞甘获得动能冲击和粉碎勒握。 / 缺点 / 跳击和灵能位移不可用。 |
| `CommanderPrestigeKerriganAssimilationAuraShared` | `CommanderPrestige` | - | 10 | - |
| `CommanderPrestigeKerriganCreep` | `CommanderPrestige` | 恶毒族长 | 5 | 优点 / 恶变菌毯的效果提高100%。虫后不再被减速并且可以在恶变菌毯之外放置菌毯肿瘤。 / 缺点 / 虫道网络和虫道网络欧米茄不可用。 |
| `CommanderPrestigeKerriganCreepPerk` | `CommanderPrestige` | - | 3 | - |
| `K5CreepBonuses` | `-` | - | 136 | 当处于菌毯上时，友方单位的攻击速度提高{Effect,KerriganMalignantCreepAttackSpeedDummy,Amount*100}%，生命恢复速度也会提高。提高菌毯肿瘤散布菌毯的速度和范围。 |
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
| 巢虫领主 | `BroodlordSpeed` | 孔状软骨 | - | `HaveBroodlordSpeed` | 巢虫领主的移动速度提高{$UpgradeEffectArrayValue:KerriganVoidCoopBroodlordSpeed:Unit,BroodLord,Speed$/Unit,BroodLord,Speed*100}%，生命值提高+{$UpgradeEffec... |
| 雷兽 | `EvolveChitinousPlating` | 进化骨板 | - | `HaveUltraliskChitnousPlating` | 雷兽的护甲提高{$UpgradeEffectArrayValue:ChitinousPlating:Unit,Ultralisk,LifeArmor$}点。 |

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
| `cargo_light` | Zergling x10, Hydralisk x4 | 虫群救援 | 跳虫包围，刺蛇补输出。 | 设计草案；需按原始mod地图流程和实机日志继续校验。 |
| `cargo_heavy` | Ultralisk x2, Hydralisk x6, SwarmQueen x1 | 虫群攻坚 | 雷兽和刺蛇推进，虫后补支援。 | 设计草案；需按原始mod地图流程和实机日志继续校验。 |
| `cargo_air` | MutaliskBroodlord x6, Broodlord x2 | 空中虫群 | 异龙先行，巢虫领主只给后期空中支援。 | 设计草案；需按原始mod地图流程和实机日志继续校验。 |
| `bonus_reward` | K5Kerrigan x1, Ultralisk x2 | 英雄奖励 | 只有地图允许英雄参战时使用。 | 设计草案；需按原始mod地图流程和实机日志继续校验。 |
| `replacement_squad` | Zergling x16, Hydralisk x4 | 同化光环测试 | 大量低成本单位便于验证资源收益。 | 设计草案；需按原始mod地图流程和实机日志继续校验。 |

### 接入规则

- 本模块不再从 `command_cards.json` 的运输/空投按钮自动推导货舱单位，也不把 `units.json` 全量清单当成可投放单位。
- 地图只传入 `mapId`、`scenarioKind`、目标点和运输模式；单位组合由 `CommanderCargoLoadoutProfile` 根据当前 commander、15 级 `power_fusion` roster 和场景限制解析。
- `原始mod` 已有运输机、空投舱、狮鹫运输、医疗运输机、坑道/深挖或感染运输容器时，应优先保留它的流程语义，只把硬编码单位替换为 profile 查询结果。
- 英雄、首领、终极进化、战列巡航舰、航母等高价值单位默认只能用于 `bonus_reward` 或显式允许英雄的地图场景。
实现备注：`CommanderMapDropProfile` 负责把地图事件映射为 `scenarioKind`；`CommanderScenarioFallbackProfile` 负责缺项降级并输出 `[XM_DBG][WARN][CARGO_FALLBACK]`。

## 10. 指挥官特殊机制

Owner：`CommanderSpecialMechanicProfile`、`CommanderSpecialResourceProfile`、`CommanderSpecialMechanicHookProfile`、`CommanderSpecialMechanicUnitProfile`。

本指挥官重点：凯瑞甘英雄成长、同化光环、欧米伽坑道。

### 特殊机制命中项

- 变异甲壳 (Kerrigan)
- 定身波 (KerriganUnlockCrushingGripWave)
- 残酷无情 (KerriganImprovedLeapingStrike)
- 跳虫升级包 (KerriganZerglingUpgrades)
- 新单位：潜伏者 (KerriganUnlockLurker)
- 刺蛇与潜伏者升级包 (KerriganHydraLurkerUpgrades)
- 恶变菌毯 (KerriganMalignantCreep)
- 坑道虫欧米茄 (KerriganUnlockGreaterNydusWorm)
- 凯瑞甘升级包 (KerriganEvoUpgrades)
- 狂怒 (KerriganUnlockFury)
- 尖塔升级包 (KerriganSpireUpgrades)
- 跳虫进化：腾跃虫 (KerriganZerglingEvo)
- 雷兽升级包 (KerriganUltraUpgrades)
- 雷兽进化：暴龙兽 (KerriganUltraEvo)
- 刀锋女王 (KerriganImprovedEnergyRegen)

### 特殊机制 Upgrade 候选

- 人类的愚行 (`CommanderPrestigeKerriganAbilities`)
- CommanderPrestigeKerriganAbilitiesMasteryImmobilizationWave (`CommanderPrestigeKerriganAbilitiesMasteryImmobilizationWave`)
- CommanderPrestigeKerriganAbilitiesMasteryPrimary (`CommanderPrestigeKerriganAbilitiesMasteryPrimary`)
- CommanderPrestigeKerriganAbilitiesPerk (`CommanderPrestigeKerriganAbilitiesPerk`)
- 荒寂女王 (`CommanderPrestigeKerriganAssimilationAura`)
- CommanderPrestigeKerriganAssimilationAuraShared (`CommanderPrestigeKerriganAssimilationAuraShared`)
- 恶毒族长 (`CommanderPrestigeKerriganCreep`)
- CommanderPrestigeKerriganCreepPerk (`CommanderPrestigeKerriganCreepPerk`)
- K5CreepBonuses (`K5CreepBonuses`)
- 凯瑞甘 (`KerriganCommander`)
- Kerrigan Creep Bonuses (`KerriganCreepBonusesCoop`)
- KerriganGhostCosmetic (`KerriganGhostCosmetic`)
- KerriganInfestedCosmetic (`KerriganInfestedCosmetic`)
- Kerrigan Void Coop Energy Regen (`KerriganVoidCoopEnergyRegen`)
- Kerrigan Void Coop Ravage (`KerriganVoidCoopImprovedLeapingStrike`)
- 精通 凯瑞甘 部队瓦斯消耗 (`MasteryKerriganArmyGasCost`)
- 精通 凯瑞甘 自动攻击伤害 (`MasteryKerriganAutoAttackDamage`)
- 精通 凯瑞甘 能量恢复 (`MasteryKerriganEnergyRegen`)
- 专精凯瑞甘定身波伤害 (`MasteryKerriganImmobilizationWaveDamage`)
- 主要技能伤害和攻击速度 (`MasteryKerriganPrimarySpeedDamage`)
- 还有 2 项，后续从源 JSON 继续展开。

### 特殊机制按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 巢虫领主 | `BroodlordSpeed` | 孔状软骨 | - | `HaveBroodlordSpeed` | 巢虫领主的移动速度提高{$UpgradeEffectArrayValue:KerriganVoidCoopBroodlordSpeed:Unit,BroodLord,Speed$/Unit,BroodLord,Speed*100}%，生命值提高+{$UpgradeEffec... |
| 刺蛇 | `BuildLurkerLocked` | 变异为潜伏者 | - | `KerriganLevel06` | 该单位将在指挥官等级5时解锁。 |
| 刺蛇 | `FrenzyLocked` | 狂暴 | - | `KerriganLevel06` | 该技能将在指挥官等级6时解锁。 |
| 异龙 | `SeveringGlave` | 削铁刃虫 | - | `HaveKerriganSunderingGlaive` | 异龙的每次后续弹射攻击不再降低伤害。 |
| 异龙 | `-` | - | - | `HaveKerriganViciousGlaive` | - |
| 雷兽 | `TissueAssimilation` | TissueAssimilation | - | `HaveHotSTissueAssimilation` | - |
| 雷兽 | `BurrowChargeLocked` | 潜地冲锋 | - | `KerriganLevel13` | 该技能将在指挥官等级14时解锁。 |
| 凯瑞甘 | `K5ZerglingRespawn` | K5ZerglingRespawn | - | - | - |
| 凯瑞甘 | `K5Cooldowns` | K5Cooldowns | - | `HaveK5Cooldowns` | - |
| 凯瑞甘 | `CommanderKerriganKerriganEnergyRegeneration` | 刀锋女王 | - | `HaveKerriganVoidCoopEnergyRegen` | 凯瑞甘的能量恢复速度提高50%。 |
| 凯瑞甘 | `KerriganChainLightning` | 连锁反应 | - | `KerriganLevel09` | 该科技将在指挥官等级9时解锁。 |
| 凯瑞甘 | `SpawnBanelings` | SpawnBanelings | `SpawnBanelings,Execute` | - | - |
| 凯瑞甘 | `K5DropPods` | K5DropPods | `K5DropPods,Execute` | - | - |
| 凯瑞甘 | `K5Fury` | K5Fury | - | `HaveK5Fury` | - |
| 凯瑞甘 | `PrimalSlash` | - | `PrimalSlash,Execute` | - | 凯瑞甘跳向目标并造成{Effect,PrimalSlash,Amount}点伤害。可以不指定目标发动技能来迅速移动。 |
| 凯瑞甘 | `MindBolt` | - | `MindBolt,Execute` | - | - |
| 凯瑞甘 | `K5HeroicFortitude` | K5HeroicFortitude | - | `HaveK5HeroicFortitude` | - |
| 凯瑞甘 | `PsiStrike` | - | `PsiStrikeWalk,Execute` | - | 凯瑞甘飞速掠过敌人，并对其行进路线上的所有敌人造成{Effect,PsiStrikeDamage,Amount}点伤害。 |
| 凯瑞甘 | `PsionicLift` | - | `PsionicLift,Execute` | - | 目标区域中的敌人会昏迷，且在{time:[d ref='Effect,PsionicLiftControllerShort,Duration'/]}内受到{Effect,PsionicLiftPeriodicDamage,Amount*Effect,PsionicLiftD... |
| 凯瑞甘 | `KerriganVoidCoopEconDrop` | 吸收光环 | `KerriganVoidCoopEconDrop,Execute` | - | 附近所有被消灭的敌人掉落资源。效果持续{Behavior,KerriganVoidCoopEconDropCaster,Duration}秒。 |
| 凯瑞甘 | `PrimalHeal` | PrimalHeal | `PrimalHeal,Execute` | - | - |
| 凯瑞甘 | `WildMutation` | WildMutation | `WildMutation,Execute` | - | - |
| 凯瑞甘 | `ChainReaction` | ChainReaction | - | `HaveK5ChainLightning` | - |
| 凯瑞甘 | `K5CooldownsLocked` | 技能专精 | - | `KerriganLevel09` | 该科技将在指挥官等级9时解锁。 |

实现备注：凡是涉及局内状态、资源、堆叠、全局计时器、隐藏 caster、英雄成长或召唤首领的机制，都必须有 runtime hook 和 `[XM_DBG]` 日志。

## 11. 指挥官个性化机制

Owner：`CommanderPersonalMechanicProfile`、`CommanderPersonalMechanicEffectProfile`、`CommanderPersonalMechanicHookProfile`、`CommanderPersonalMechanicRequirementProfile`。

本指挥官重点：凯瑞甘英雄技能、同化资源和欧米伽坑道应由英雄与特殊机制模块共同接入。

### 威望正向融合输入

| 威望 ID | 名称 | Primary Upgrade | 禁用单位 | 启用单位 | 禁用 Ability | 补充 Upgrade |
|---|---|---|---|---|---|---|
| `CommanderPrestigeKerriganCreep` | - | `CommanderPrestigeKerriganCreep` | `NydusNetwork` | - | - | `KerriganCreep1` |
| `CommanderPrestigeKerriganAbilities` | - | `CommanderPrestigeKerriganAbilities` | - | - | - | `KerriganAbilities1`, `KerriganAbilities2`, `KerriganAbilities3` |
| `CommanderPrestigeKerriganAssimilationAura` | - | `CommanderPrestigeKerriganAssimilationAura` | - | - | `PsiStrikeWalk:`, `PrimalSlash:` | - |

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
[XM_DBG][INFO][COMMANDER_PROFILE_LOAD] commander=Kerrigan levelMode=FullLevel15 masteryMode=AllSixMax rosterStage=power_fusion result=ok
[XM_DBG][INFO][POWER_FUSION_APPLY] commander=Kerrigan levelMode=FullLevel15 masteryMode=AllSixMax prestigeMode=SelectedPositive result=ok
[XM_DBG][INFO][ROSTER_LOAD] commander=Kerrigan stage=power_fusion units=6 buildings=3 heroes=1 result=ok
[XM_DBG][INFO][HERO_PROFILE_LOAD] commander=Kerrigan heroes=1 result=ok
[XM_DBG][INFO][MODULE_VERIFY] commander=Kerrigan module=<01-11> profile=<profile> result=ok
[XM_DBG][WARN][CASC_AUDIT_REQUIRED] commander=Kerrigan module=<module> object=<object> result=needs-casc-audit
```

## 第一轮待审计项

- 顶部技能的 caster、按钮、冷却、充能、目标转发闭包。
- 英雄或特殊英雄的 Unit、Ability、Behavior、Weapon、Actor、Sound、复活/重生闭包。
- `power_fusion` 最终 roster 与 `level15` roster 的新增、替换、变体关系。
- 6 项精通的真实作用对象和最终数值。
- 3 个威望的正面收益、负面代价、disable/suppress、费用/冷却/上限变化。
- 科技建筑研究按钮、Requirement、Upgrade effect 是否完整。
- 特殊机制、英雄成长和个性化机制是否需要 runtime hook。
