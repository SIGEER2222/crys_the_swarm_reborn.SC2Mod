# 霍纳与汉（Horner）指挥官细化

日期：2026-05-27

## 当前口径

当前指挥官默认 15 级，不从 1 级开始；精通默认 6 项全部 30 点；威望默认只取正面收益，不直接启用官方 `PlayerPrestige`。`initial` 只作为官方基础状态审计和差异对照，默认测试和玩法应看 `power_fusion` 最终状态。

本文件按 `docs/newdocs/模块拆分` 的 11 个模块整理 霍纳与汉。依据 `游戏数据/官方合作指挥官/commanders/Horner/` 的 JSON 摘要生成；具体 Ability、Behavior、Weapon、Actor、Effect、Requirement 闭包仍需继续追 `references/sc2-build-96883-casc-export/` 或实机 `[XM_DBG]` 日志。

## 官方数据摘要

| 项 | 值 |
|---|---|
| CommanderId | `TerranHorner` |
| 中文名 | 霍纳与汉 |
| 默认升级 | `HornerCommander, HHSuperRadar` |
| 默认能力命令 | `FusionCoreResearch:5, FusionCoreResearch:4, ArmoryResearchVoidCoop:15, ArmoryResearchVoidCoop:16, ArmoryResearchVoidCoop:17, ArmoryResearchVoidCoop:12, ArmoryResearchVoidCoop:13, ArmoryResearchVoidCoop:14` |
| 威望 ID | `CommanderPrestigeHornerMagMines, CommanderPrestigeHornerStarport, CommanderPrestigeHornerBombingPlatforms` |
| heroes 数量 | 0 |
| roster 数量 | 10 |
| units 数量 | 10 |
| buildings 数量 | 0 |
| command card 对象数 | 10 |
| upgrades 数量 | 21 |
| source | `mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/userdata.xml` |

roster 样例：

```text
Liberator, HHHellionTank, HHHellion, HHBattlecruiser, HHWidowMine, HHReaper, HHRaven, HHViking, HHWraith, Predator
```

## 15 级解锁摘要

- 1: 霍纳夫妇
- 2: 新单位：攻击战斗机
- 3: 突击炮舰和忒伊亚铁鸦升级包
- 4: 雇佣兵升级包
- 5: 呼叫舰队
- 6: 十万火急
- 7: 帝国星港升级包
- 8: 他和她的补给
- 9: 恶火和恶蝠升级包
- 10: 空间站调度
- 11: 耐力训练
- 12: 高级武器
- 13: 聚变芯体升级包
- 14: 爆爆乐
- 15: 我的另一半

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
| Lv2 新单位：攻击战斗机 | 2 | `HHBuild:12` | `-` | 解锁攻击战斗机平台和精确打击技能。发射一架攻击战斗机，对目标敌人或区域执行空中打击。 |
| Lv2 新单位：攻击战斗机 | 2 | `HHBomberPlatformAreaBombTopBarOrder:` | `-` | 解锁攻击战斗机平台和精确打击技能。发射一架攻击战斗机，对目标敌人或区域执行空中打击。 |
| Lv5 呼叫舰队 | 5 | `HornerAirFleetActivate:` | `-` | 解锁呼叫霍纳的舰队进行近轨道火力支援。舰队会对目标区域内的随机敌方单位造成巨量伤害。 |
| Lv5 呼叫舰队 | 5 | `HornerAirFleetTargetingDummy:` | `-` | 解锁呼叫霍纳的舰队进行近轨道火力支援。舰队会对目标区域内的随机敌方单位造成巨量伤害。 |

### command card 命中

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 恶火 | `HHHellionBomb` | 焦油炸弹 | `HHHellionBomb,Execute` | - | 发射一枚焦油炸弹，对目标单位造成{Effect,HHHellionBombDamage,Amount}点伤害。附近的敌人移动速度降低{(1 - Behav... |
| 霍纳铁鸦 | `FleetwideJump` | 战术跳跃 | `FleetwideJump,Execute` | - | 折跃到目标位置。飞行器折跃期间处于无敌状态。 |
| 霍纳收割者 | `HHReaperClusterBombs` | LE9型集束炸弹 | `-` | HaveHHReaperClusterBomb | 使KD8炸弹的冷却时间缩短{time:10}。被杀死时，收割者会向击杀他的单位投掷多枚手雷。 |
| 霍纳维京战机 | `FleetwideJump` | 战术跳跃 | `FleetwideJump,Execute` | - | 折跃到目标位置。飞行器折跃期间处于无敌状态。 |
| 霍纳寡妇雷 | `HHReaperClusterBombs` | LE9型集束炸弹 | `-` | HaveHHReaperClusterBomb | 使KD8炸弹的冷却时间缩短{time:10}。被杀死时，收割者会向击杀他的单位投掷多枚手雷。 |
| 霍纳怨灵战机 | `HHReaperClusterBombs` | LE9型集束炸弹 | `-` | HaveHHReaperClusterBomb | 使KD8炸弹的冷却时间缩短{time:10}。被杀死时，收割者会向击杀他的单位投掷多枚手雷。 |

实现备注：面板只注册 profile 和转发 caster，地图不得按 commander 写 if/else。精通和威望影响面板冷却/充能/费用时，由本模块接收最终 modifier。

## 02. 英雄单位及其技能

Owner：`CommanderHeroProfile`、`CommanderHeroModeProfile`、`CommanderHeroAbilityProfile`、`CommanderHeroSkillTreeProfile`、`CommanderHeroReviveProfile`、`CommanderHeroModifierProfile`。

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| - | - | - | - | - | 官方 heroes.json 未列出英雄条目；召唤物/形态/特殊英雄需从 progression、command_cards 或 CASC 继续追 |

### 英雄/形态候选

- 空间站调度 (`HornerPHLevel10`)

口径：地面消耗型部队与空军精英舰队分层，需要 cargo 和面板同时验证。

待审计：Hero Unit、技能按钮、复活、形态切换、武器/Actor/Sound 闭包。

## 03. 普通单位技能及其进化功能

Owner：`CommanderUnitAbilityProfile`、`CommanderUnitStatProfile`、`CommanderUnitEvolutionProfile`、`CommanderUnitBehaviorProfile`、`CommanderUnitWeaponProfile`。

### 单位技能按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 霍纳的战列巡航舰 | `MoveHoldPosition` | 原地防御 | `move,HoldPos` | - | 命令选中的单位待在原地，并攻击射程内的敌方目标。接受命令的单位不会对敌人进行追击或移向敌人与其交战。 |
| 霍纳的战列巡航舰 | `MovePatrol` | 巡逻 | `move,Patrol` | - | 命令选中的单位在当前位置与目标区域间进行巡逻。巡逻的单位会对敌人发起攻击或移向附近的敌人与其交战。 |
| 霍纳的战列巡航舰 | `HHMSOHealth` | 我的另一半 | `-` | HaveHHSOBuff | 汉的战斗单位使霍纳的单位的生命值提高{Effect,HornerMSOHealthDisplayDummy,Amount}%。 |
| 霍纳的战列巡航舰 | `Hyperjump` | 战术跳跃 | `HHBattlecruiserHyperjump,Execute` | - | {time:6}后折跃至目标位置。战列巡航舰在折跃时处于无敌状态。 / 不需要视野。 |
| 霍纳的战列巡航舰 | `HHYamatoShots` | 超载反应堆 | `HHYamatoShots,On` | - | 武器系统升级为强大的粒子光炮，每次攻击造成{Effect,HHLaserBatteryU,Amount}点伤害。 |
| 霍纳的战列巡航舰 | `HHBattlecruiserShots` | 变回ATX激光炮组 | `HHYamatoShots,Off` | - | 使用战列巡航舰的标准ATX激光炮组。 |
| 霍纳的战列巡航舰 | `HHArmyOOCRegen` | 耐力训练 | `-` | HaveHHArmyOOCRegen | 该单位脱离战斗后每秒回复{Behavior,HHArmyOOCRegenSpeed,Modification.VitalRegenArray[Life]}... |
| 恶火 | `MoveHoldPosition` | 原地防御 | `move,HoldPos` | - | 命令选中的单位待在原地，并攻击射程内的敌方目标。接受命令的单位不会对敌人进行追击或移向敌人与其交战。 |
| 恶火 | `MovePatrol` | 巡逻 | `move,Patrol` | - | 命令选中的单位在当前位置与目标区域间进行巡逻。巡逻的单位会对敌人发起攻击或移向附近的敌人与其交战。 |
| 恶火 | `HHMSOAttackSpeed` | 我的另一半 | `-` | HaveHHSOBuff | 霍纳的战斗单位使汉的单位的攻击速度提高{Effect,HornerMSOAttackSpeedDisplayDummy,Amount}%。 |
| 恶火 | `MorphToHellionTank` | 恶蝠模式 | `MorphToHHHellionTank,Execute` | - | 近距离战斗单位，对前方小范围锥形区域造成伤害。可变形为快速侦察单位。 / 可以对地。 |
| 恶火 | `HHHellionBomb` | 焦油炸弹 | `HHHellionBomb,Execute` | - | 发射一枚焦油炸弹，对目标单位造成{Effect,HHHellionBombDamage,Amount}点伤害。附近的敌人移动速度降低{(1 - Behav... |
| 恶火 | `HHHellionDeathStim` | 喷雾刺激发射器 | `-` | HaveHHHellionStimDeath | 恶火和恶蝠变形速度提高75%。恶火被杀死时，附近的友方单位的移动速度提高{(Behavior,HHHellionStimDeath,Modificatio... |
| 恶蝠 | `MoveHoldPosition` | 原地防御 | `move,HoldPos` | - | 命令选中的单位待在原地，并攻击射程内的敌方目标。接受命令的单位不会对敌人进行追击或移向敌人与其交战。 |
| 恶蝠 | `MovePatrol` | 巡逻 | `move,Patrol` | - | 命令选中的单位在当前位置与目标区域间进行巡逻。巡逻的单位会对敌人发起攻击或移向附近的敌人与其交战。 |
| 恶蝠 | `HHMSOAttackSpeed` | 我的另一半 | `-` | HaveHHSOBuff | 霍纳的战斗单位使汉的单位的攻击速度提高{Effect,HornerMSOAttackSpeedDisplayDummy,Amount}%。 |
| 恶蝠 | `MorphToHHHellion` | 恶火模式 | `MorphToHHHellion,Execute` | - | 快速的侦察者，发射榴弹来减速敌方单位。可变形为近距离战斗单位。 / 可以对地。 |
| 恶蝠 | `HHHellionDeathFear` | 狂火炸药 | `-` | HaveHHHellionFearDeath | 移动速度提高{$UpgradeEffectArrayValue:HHHellionFearDeath:Unit,HHHellionTank,Speed$/... |
| 恶蝠 | `HHHellionAttackDoT` | 爆燃液体 | `-` | HaveHHHellionAttackDoT | 攻击会使敌人在{Behavior,HHHellionDoT,Duration}秒内受到{Effect,HHHellionDoTDamage,Amount ... |
| 霍纳铁鸦 | `MoveHoldPosition` | 原地防御 | `move,HoldPos` | - | 命令选中的单位待在原地，并攻击射程内的敌方目标。接受命令的单位不会对敌人进行追击或移向敌人与其交战。 |
| 霍纳铁鸦 | `MovePatrol` | 巡逻 | `move,Patrol` | - | 命令选中的单位在当前位置与目标区域间进行巡逻。巡逻的单位会对敌人发起攻击或移向附近的敌人与其交战。 |
| 霍纳铁鸦 | `AcquireMove` | 搜索移动 | `move,AcquireMove` | - | 命令选中的单位移至目标区域或跟随目标单位。进行搜索移动的单位不会与敌人交战。 |
| 霍纳铁鸦 | `Detector` | 侦测单位 | `-` | - | 该单位能够侦测到隐形、潜地和幻像单位。 |
| 霍纳铁鸦 | `HHSuperRadar` | 成像雷达 | `-` | - | 远距离显示敌方单位的位置。 |
| 霍纳铁鸦 | `HHMSOHealth` | 我的另一半 | `-` | HaveHHSOBuff | 汉的战斗单位使霍纳的单位的生命值提高{Effect,HornerMSOHealthDisplayDummy,Amount}%。 |
| 霍纳铁鸦 | `FleetwideJump` | 战术跳跃 | `FleetwideJump,Execute` | - | 折跃到目标位置。飞行器折跃期间处于无敌状态。 |
| 霍纳铁鸦 | `HHNomadTargetLock` | 分析弱点 | `RavenTargetLock,Execute` | - | 对被分析的单位进行的所有近战和远程攻击都会有3点伤害加成。只要铁鸦锁定目标，效果就会一直存在。 |
| 霍纳铁鸦 | `MorphtoHHRavenSiege` | 启动消音模式 | `HHRavenMorphtoHHRavenSiege,Execute` | - | 铁鸦获得隐形效果但是无法移动和使用主动技能。此技能激活后可以取消。 |
| 霍纳铁鸦 | `HHArmyOOCRegen` | 耐力训练 | `-` | HaveHHArmyOOCRegen | 该单位脱离战斗后每秒回复{Behavior,HHArmyOOCRegenSpeed,Modification.VitalRegenArray[Life]}... |
| 霍纳收割者 | `MoveHoldPosition` | 原地防御 | `move,HoldPos` | - | 命令选中的单位待在原地，并攻击射程内的敌方目标。接受命令的单位不会对敌人进行追击或移向敌人与其交战。 |
| 霍纳收割者 | `MovePatrol` | 巡逻 | `move,Patrol` | - | 命令选中的单位在当前位置与目标区域间进行巡逻。巡逻的单位会对敌人发起攻击或移向附近的敌人与其交战。 |
| 霍纳收割者 | `HHMSOAttackSpeed` | 我的另一半 | `-` | HaveHHSOBuff | 霍纳的战斗单位使汉的单位的攻击速度提高{Effect,HornerMSOAttackSpeedDisplayDummy,Amount}%。 |
| 霍纳收割者 | `HHKD8Charge` | KD8型炸弹 | `HHD8SingleCharge,Execute` | - | 短暂延迟后发生爆炸，造成{Effect,HHD8ChargeExplodeDamage,Amount}点范围伤害并击退附近的单位。 |
| 霍纳收割者 | `HHReaperFly` | 喷气背包加力 | `HHReaperFly,Execute` | - | 使收割者飞行{Behavior,HHReaperFlyingDuration,Duration}秒。飞行时，收割者可以对空。 |
| 霍纳收割者 | `JetPack` | 喷气背包 | `255,255` | - | 使收割者能够翻越悬崖。 |
| 霍纳收割者 | `CombatDrugs` | 战斗药剂 | `-` | - | 脱离战斗后能够迅速恢复生命值。 |
| 霍纳收割者 | `HHReaperClusterBombs` | LE9型集束炸弹 | `-` | HaveHHReaperClusterBomb | 使KD8炸弹的冷却时间缩短{time:10}。被杀死时，收割者会向击杀他的单位投掷多枚手雷。 |
| 霍纳维京战机 | `MoveHoldPosition` | 原地防御 | `move,HoldPos` | - | 命令选中的单位待在原地，并攻击射程内的敌方目标。接受命令的单位不会对敌人进行追击或移向敌人与其交战。 |
| 霍纳维京战机 | `MovePatrol` | 巡逻 | `move,Patrol` | - | 命令选中的单位在当前位置与目标区域间进行巡逻。巡逻的单位会对敌人发起攻击或移向附近的敌人与其交战。 |
| 霍纳维京战机 | `HHVikingPiercingAttacks` | 撕裂弹 | `-` | HaveHHVikingPiercingAttack | 机甲模式的攻击有穿透效果，对目标后面的敌方单位造成伤害。变形时间缩短75%。 |
| 霍纳维京战机 | `HHVikingMorphSpeed` | HHVikingMorphSpeed | `-` | HaveHHVikingMorph | - |
| 霍纳维京战机 | `HHMSOHealth` | 我的另一半 | `-` | HaveHHSOBuff | 汉的战斗单位使霍纳的单位的生命值提高{Effect,HornerMSOHealthDisplayDummy,Amount}%。 |
| 霍纳维京战机 | `FleetwideJump` | 战术跳跃 | `FleetwideJump,Execute` | - | 折跃到目标位置。飞行器折跃期间处于无敌状态。 |
| 霍纳维京战机 | `HHVikingRockets` | 狂暴飞弹 | `HHVikingRockets,Execute` | - | 对目标单位发射{Effect,HHVikingRocketsBurstPersistent,PeriodCount}枚火箭，每枚火箭造成{Effect,H... |
| 霍纳维京战机 | `AssaultMode` | 机甲模式 | `HHAssaultMode,Execute` | - | 将维京战机变形为机甲模式。该模式下的维京战机可以行走，但只能攻击地面单位。 |
| 霍纳维京战机 | `HHArmyOOCRegen` | 耐力训练 | `-` | HaveHHArmyOOCRegen | 该单位脱离战斗后每秒回复{Behavior,HHArmyOOCRegenSpeed,Modification.VitalRegenArray[Life]}... |
| 霍纳寡妇雷 | `MoveHoldPosition` | 原地防御 | `move,HoldPos` | - | 命令选中的单位待在原地，并攻击射程内的敌方目标。接受命令的单位不会对敌人进行追击或移向敌人与其交战。 |
| 霍纳寡妇雷 | `MovePatrol` | 巡逻 | `move,Patrol` | - | 命令选中的单位在当前位置与目标区域间进行巡逻。巡逻的单位会对敌人发起攻击或移向附近的敌人与其交战。 |
| 霍纳寡妇雷 | `HHMSOAttackSpeed` | 我的另一半 | `-` | HaveHHSOBuff | 霍纳的战斗单位使汉的单位的攻击速度提高{Effect,HornerMSOAttackSpeedDisplayDummy,Amount}%。 |
| 霍纳寡妇雷 | `HHKD8Charge` | KD8型炸弹 | `HHD8SingleCharge,Execute` | - | 短暂延迟后发生爆炸，造成{Effect,HHD8ChargeExplodeDamage,Amount}点范围伤害并击退附近的单位。 |
| 霍纳寡妇雷 | `HHReaperFly` | 喷气背包加力 | `HHReaperFly,Execute` | - | 使收割者飞行{Behavior,HHReaperFlyingDuration,Duration}秒。飞行时，收割者可以对空。 |
| 霍纳寡妇雷 | `JetPack` | 喷气背包 | `255,255` | - | 使收割者能够翻越悬崖。 |
| 霍纳寡妇雷 | `CombatDrugs` | 战斗药剂 | `-` | - | 脱离战斗后能够迅速恢复生命值。 |
| 霍纳寡妇雷 | `HHReaperClusterBombs` | LE9型集束炸弹 | `-` | HaveHHReaperClusterBomb | 使KD8炸弹的冷却时间缩短{time:10}。被杀死时，收割者会向击杀他的单位投掷多枚手雷。 |
| 霍纳怨灵战机 | `MoveHoldPosition` | 原地防御 | `move,HoldPos` | - | 命令选中的单位待在原地，并攻击射程内的敌方目标。接受命令的单位不会对敌人进行追击或移向敌人与其交战。 |
| 霍纳怨灵战机 | `MovePatrol` | 巡逻 | `move,Patrol` | - | 命令选中的单位在当前位置与目标区域间进行巡逻。巡逻的单位会对敌人发起攻击或移向附近的敌人与其交战。 |
| 霍纳怨灵战机 | `HHMSOAttackSpeed` | 我的另一半 | `-` | HaveHHSOBuff | 霍纳的战斗单位使汉的单位的攻击速度提高{Effect,HornerMSOAttackSpeedDisplayDummy,Amount}%。 |
| 霍纳怨灵战机 | `HHKD8Charge` | KD8型炸弹 | `HHD8SingleCharge,Execute` | - | 短暂延迟后发生爆炸，造成{Effect,HHD8ChargeExplodeDamage,Amount}点范围伤害并击退附近的单位。 |
| 霍纳怨灵战机 | `HHReaperFly` | 喷气背包加力 | `HHReaperFly,Execute` | - | 使收割者飞行{Behavior,HHReaperFlyingDuration,Duration}秒。飞行时，收割者可以对空。 |
| 霍纳怨灵战机 | `JetPack` | 喷气背包 | `255,255` | - | 使收割者能够翻越悬崖。 |
| ... | ... | ... | ... | ... | 还有 15 项，后续从 command_cards.json 继续展开 |

### 进化/形态/切换候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 霍纳的战列巡航舰 | `HHYamatoShots` | 超载反应堆 | `HHYamatoShots,On` | - | 武器系统升级为强大的粒子光炮，每次攻击造成{Effect,HHLaserBatteryU,Amount}点伤害。 |
| 恶火 | `MorphToHellionTank` | 恶蝠模式 | `MorphToHHHellionTank,Execute` | - | 近距离战斗单位，对前方小范围锥形区域造成伤害。可变形为快速侦察单位。 / 可以对地。 |
| 恶火 | `HHHellionDeathStim` | 喷雾刺激发射器 | `-` | HaveHHHellionStimDeath | 恶火和恶蝠变形速度提高75%。恶火被杀死时，附近的友方单位的移动速度提高{(Behavior,HHHellionStimDeath,Modificatio... |
| 恶蝠 | `MorphToHHHellion` | 恶火模式 | `MorphToHHHellion,Execute` | - | 快速的侦察者，发射榴弹来减速敌方单位。可变形为近距离战斗单位。 / 可以对地。 |
| 霍纳铁鸦 | `MorphtoHHRavenSiege` | 启动消音模式 | `HHRavenMorphtoHHRavenSiege,Execute` | - | 铁鸦获得隐形效果但是无法移动和使用主动技能。此技能激活后可以取消。 |
| 霍纳维京战机 | `HHVikingPiercingAttacks` | 撕裂弹 | `-` | HaveHHVikingPiercingAttack | 机甲模式的攻击有穿透效果，对目标后面的敌方单位造成伤害。变形时间缩短75%。 |
| 霍纳维京战机 | `HHVikingMorphSpeed` | HHVikingMorphSpeed | `-` | HaveHHVikingMorph | - |
| 霍纳维京战机 | `AssaultMode` | 机甲模式 | `HHAssaultMode,Execute` | - | 将维京战机变形为机甲模式。该模式下的维京战机可以行走，但只能攻击地面单位。 |
| 掠食者 | `WidowMineBurrow` | 激活地雷 | `HHWidowMineBurrow,Execute` | - | 埋下寡妇雷并使其进入准备状态。激活时无法移动。 |
| 解放者 | `LiberatorAGRangeUpgrade` | 强化弹道 | `-` | HaveLiberatorRange | 解放者在防卫模式下的射程提高{$UpgradeEffectArrayValue:LiberatorAGRangeUpgrade:Weapon,Libera... |
| 解放者 | `LiberatorAGMode` | 防卫模式 | `LiberatorAGTarget,Execute` | - | 部署为防卫模式。在此模式下解放者可对地面单位造成大量单体伤害。在此模式下解放者无法移动。 |

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
| 解放者 | `Liberator` | `Liberator` | Air; Armored/Mechanical | 矿:150 气:125 人口字段:-3 生命:180 | 重型火炮战机。装载有能对敌方空中单位造成范围伤害的飞弹。可以切换为防卫模式以提供攻城火力。 / 可以对空。 |
| 恶蝠 | `HHHellionTank` | `HHHellionTank` | Ground; Biological/Light/Mechanical | 矿:100 气:- 人口字段:-2 生命:235 | 近距离战斗单位，对前方小范围锥形区域造成伤害。可变形为快速侦察单位。 / 可以对地。 |
| 恶火 | `HHHellion` | `HHHellion` | Ground; Light/Mechanical | 矿:100 气:- 人口字段:-2 生命:90 | 快速的侦察者，可发射榴弹减慢敌方单位速度。可变形为近距离战斗单位。 / 可以对地。 |
| 霍纳的战列巡航舰 | `HHBattlecruiser` | `HHBattlecruiser` | Air; Armored/Massive/Mechanical | 矿:1000 气:800 人口字段:-10 生命:900 | 强大的战舰。可以使用战术跳跃。 |
| 霍纳寡妇雷 | `HHWidowMine` | `HHReaper, HHWidowMine` | Ground; Biological/Light | 矿:50 气:- 人口字段:-1 生命:60 | 机械地雷。在潜地状态下可向附近的敌方目标发射导弹，在目标周围的小范围区域内造成伤害。 / 可以对地和对空。 |
| 霍纳收割者 | `HHReaper` | `HHReaper` | Ground; Biological/Light | 矿:50 气:- 人口字段:-1 生命:60 | 游击单位。可以投掷击退手雷和跳跃悬崖。 / 可以对地。 |
| 霍纳铁鸦 | `HHRaven` | `HHRaven` | Air; Light/Mechanical/Psionic | 矿:100 气:200 人口字段:-2 生命:140 | 空中支援单位。能够使用分析弱点，有雷达传感器。 / 侦测单位 |
| 霍纳维京战机 | `HHViking` | `HHVikingFighter` | Air; Armored/Mechanical | 矿:400 气:250 人口字段:-4 生命:350 | 坚固的火力支援单位。进入机甲模式后可以对地。 / 可以对空。 |
| 霍纳怨灵战机 | `HHWraith` | `HHReaper, HHWraith` | Ground; Biological/Light | 矿:50 气:- 人口字段:-1 生命:60 | 高度机动性空中单位。擅长突袭打击。 |
| 掠食者 | `Predator` | `HHWidowMine, Predator` | Ground; Light/Mechanical | 矿:100 气:- 人口字段:-2 生命:90 | 机械地雷。在潜地状态下可向附近的敌方目标发射导弹，在目标周围的小范围区域内造成伤害。 / 可以对地和对空。 |

三阶段口径：`initial` 只做审计，`level15` 表示满级解锁，`power_fusion` 表示 15 级 + 六精通全满 + 威望正向收益后的默认运行清单。

## 06. 指挥官精通

Owner：`CommanderMasteryProfile`、`CommanderMasteryEffectProfile`、`CommanderMasteryModifierProfile`。

| 组 | 名称 | Upgrade | 每点 | 30点口径 |
|---|---|---|---|---|
| 1 | 攻击战斗机的效果范围 | `MasteryHornerBomberRadius` | 1 | +30% |
| 1 | 优化亡语 | `MasteryHornerBetterDeathRattle` | 2 | +60% |
| 2 | 我的显著加成 | `MasteryHornerMSOBonus` | 1 | +30% |
| 2 | 回收几率翻倍 | `MasteryHornerDoubleSalvageChance` | 2 | +60% |
| 3 | 空袭距离 | `MasteryHornerAirStrikeDistance` | 2 | +60% |
| 3 | 麦格天雷升级 | `MasteryHornerMagMineUpgrades` | 1 | -30% |

实现备注：当前默认六项全部 30 点。表里的 30 点口径由 `point_increments * 30` 推导，最终数值仍需以 Upgrade Effect 闭包验证。

## 07. 指挥官建筑

Owner：`CommanderBuildingProfile`、`CommanderBuildingAbilityProfile`、`CommanderBuildingTrainProfile`、`CommanderBuildingStageProfile`、`CommanderBuildingBehaviorProfile`。

来源：官方提取 `buildings.json`。

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| - | - | - | - | - | 官方 buildings.json 暂无条目；这通常表示提取数据未覆盖建造链，不代表运行时没有建筑。 |

### 建筑按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| - | - | - | - | - | command_cards.json 未命中建筑按钮。 |

实现备注：建筑声明自身生产、研究、行为和阶段；训练单位的最终可用性由兵种/科技/精通/威望共同裁决。

## 08. 科技建筑及其升级选项

Owner：`CommanderTechBuildingProfile`、`CommanderUnitTechProfile`、`CommanderUpgradeProfile`、`CommanderUpgradeRequirementProfile`、`CommanderUpgradeEffectProfile`。

### 15 级解锁与研究命令

| 等级 | 名称 | 解锁升级 | 解锁 AbilityCmd | 说明 |
|---|---|---|---|---|
| 1 | 霍纳夫妇 | `HHScrapPickup` | `-` | 友方单位被杀死时会为这些单位的指挥官掉落资源。马特·霍纳开局会有一个可以训练精英飞行器的星港。 |
| 2 | 新单位：攻击战斗机 | `-` | `HHBuild:12, HHBomberPlatformAreaBombTopBarOrder:` | 解锁攻击战斗机平台和精确打击技能。发射一架攻击战斗机，对目标敌人或区域执行空中打击。 |
| 3 | 突击炮舰和忒伊亚铁鸦升级包 | `-` | `HHMercStarportHangar:1, StarportTechLabResearch:1` | 解锁以下升级：突击炮舰可以单独升级能自动建造和发射无人战斗机的机库忒伊亚铁鸦的分析弱点可以额外瞄准2个单位 |
| 4 | 雇佣兵升级包 | `-` | `HHMercCompoundResearch:2, HHMercCompoundResearch:1` | 在工程站中解锁以下升级：提高收割者的移动速度，使其获得可以飞行10秒的能力。寡妇雷的攻击范围扩大50%，可以更加快速地潜地和出地。 |
| 5 | 呼叫舰队 | `-` | `HornerAirFleetActivate:, HornerAirFleetTargetingDummy:` | 解锁呼叫霍纳的舰队进行近轨道火力支援。舰队会对目标区域内的随机敌方单位造成巨量伤害。 |
| 6 | 十万火急 | `HHMiraBuildResearchTimeReduction` | `-` | 米拉单位的建造时间和研究时间缩短30% |
| 7 | 帝国星港升级包 | `-` | `StarportTechLabResearch:25, StarportTechLabResearch:28` | 在星港的科技实验室中解锁以下升级：怨灵战机每攻击一次，其攻击速度提高10%，最高可达100%。维京战机在机甲模式下可以对目标后方的敌方单位造成伤害。维京战机的变形时间减少75%。 |
| 8 | 他和她的补给 | `HHDoubleSupply` | `-` | 补给站已使用帝国科技进行升级，使其生命值和补给提高100%。 |
| 9 | 恶火和恶蝠升级包 | `-` | `HHMercCompoundResearch:9, HHMercCompoundResearch:7` | 在工程站中解锁以下升级：允许恶火使用焦油炸弹，造成20点伤害，并降低附近敌人的移动速度。恶蝠的攻击会使敌人燃烧。 |
| 10 | 空间站调度 | `-` | `HHSummonMercenarySpaceStation:` | 解锁使用空间站调度技能。空间站撞击时对英雄目标造成500点伤害，撞击范围内的其它一切存在都将被立即摧毁。攻击型无人机会攻击附近的目标。 |
| 11 | 耐力训练 | `HHArmyOOCRegen` | `-` | 霍纳的单位脱离战斗后会恢复生命。 |
| 12 | 高级武器 | `HHAirFleetYamato, HHProgression12IconUpgrade` | `-` | 呼叫舰队用激光炮组轰击敌方目标，并发射优先攻击高生命值目标的大和炮。 |
| 13 | 聚变芯体升级包 | `-` | `FusionCoreResearch:3, FusionCoreResearch:5` | 在聚变芯体中解锁以下升级： / 战列巡航舰的武器系统升级成威力强大的粒子光炮。攻击战斗机平台的精确打击会使用凝固汽油弹点燃目标位置。 |
| 14 | 爆爆乐 | `HHSpaceStationNuke, HHProgression14IconUpgrade` | `-` | 空间站调度会在毁灭时引发核爆装置。 |
| 15 | 我的另一半 | `HHSOBuff` | `-` | 你的单位会根据军队的构成而获得加成： / 米拉的单位每占用一点补给，霍纳的单位获得0.5%的生命值。霍纳的单位每占用一点补给，米拉的单位获得0.5%的攻击速度。 |

### Upgrade 摘要

| Upgrade | 父级 | 显示名 | Effect数 | 说明 |
|---|---|---|---|---|
| `CommanderPrestigeHornerBombingPlatforms` | `CommanderPrestige` | 星系军火走私者 | 2 | 优点 / 攻击战斗机平台的数量不再有上限。 / 缺点 / 攻击战斗机平台消耗提高100%。 |
| `CommanderPrestigeHornerMagMines` | `CommanderPrestige` | 混沌模范夫妻 | 30 | 优点 / 麦格天雷的布置和攻击速度提高80%。米拉的单位死亡时，效果提高100%。 / 缺点 / 霍纳的单位消耗提高30%。 |
| `CommanderPrestigeHornerMagMinesMastery` | `CommanderPrestige` | - | 2 | - |
| `CommanderPrestigeHornerStarport` | `CommanderPrestige` | 银翼指挥官 | 19 | 优点 / 霍纳的单位消耗的高能瓦斯减少20%，充能的冷却时间缩短50%。 / 缺点 / 突击炮舰的数量上限为2个。 |
| `HHAirFleetYamato` | `-` | - | 0 | - |
| `HHArmyOOCRegen` | `-` | 耐力训练 | 0 | 该单位脱离战斗后每秒回复{Behavior,HHArmyOOCRegenSpeed,Modification.VitalRegenArray[Life]}点生命值。 |
| `HHDoubleSupply` | `-` | - | 12 | - |
| `HHMiraBuildResearchTimeReduction` | `-` | - | 20 | - |
| `HHProgression12IconUpgrade` | `-` | - | 2 | - |
| `HHProgression14IconUpgrade` | `-` | - | 2 | - |
| `HHSOBuff` | `-` | - | 0 | - |
| `HHScrapPickup` | `-` | - | 0 | - |
| `HHSpaceStationNuke` | `-` | - | 1 | - |
| `HHSuperRadar` | `-` | 成像雷达 | 0 | 远距离显示敌方单位的位置。 |
| `HornerCommander` | `-` | 霍纳 | 24 | - |
| `MasteryHornerAirStrikeDistance` | `-` | MasteryHornerAirStrikeDistance | 3 | 增加霍纳的“呼叫舰队”技能的火力覆盖范围和持续时间。 |
| `MasteryHornerBetterDeathRattle` | `-` | MasteryHornerBetterDeathRattle | 1 | 有一定几率获得强化版死亡效果的几率。强化版死亡效果通常比普通死亡效果强两倍。 |
| `MasteryHornerBomberRadius` | `-` | MasteryHornerBomberRadius | 6 | 提高攻击战斗机的首次打击与凝固汽油弹的范围效果半径。 |
| `MasteryHornerDoubleSalvageChance` | `-` | MasteryHornerDoubleSalvageChance | 1 | 有一定几率使友方指挥官可获得的回收掉落值翻倍。 |
| `MasteryHornerMSOBonus` | `-` | MasteryHornerMSOBonus | 1 | 霍纳的战斗单位进一步提升汉的单位的攻击速度，而汉的单位则可以进一步提升霍纳的单位的生命值。 |
| `MasteryHornerMagMineUpgrades` | `-` | MasteryHornerMagMineUpgrades | 8 | 增加最大使用次数，并降低充能冷却时间和麦格天雷的布置时间。 |

### 研究/升级按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 霍纳的战列巡航舰 | `HHYamatoShots` | 超载反应堆 | `HHYamatoShots,On` | - | 武器系统升级为强大的粒子光炮，每次攻击造成{Effect,HHLaserBatteryU,Amount}点伤害。 |
| 恶蝠 | `HHHellionDeathFear` | 狂火炸药 | `-` | HaveHHHellionFearDeath | 移动速度提高{$UpgradeEffectArrayValue:HHHellionFearDeath:Unit,HHHellionTank,Speed$/... |
| 解放者 | `LiberatorAGRangeUpgrade` | 强化弹道 | `-` | HaveLiberatorRange | 解放者在防卫模式下的射程提高{$UpgradeEffectArrayValue:LiberatorAGRangeUpgrade:Weapon,Libera... |

实现备注：科技建筑只负责展示/触发研究；每个单位升级效果由对应 `CommanderUnitTechProfile` 或 `CommanderUpgradeEffectProfile` 声明。

## 09. 特定地图运输机空投单位

Owner：`CommanderCargoLoadoutProfile`、`CommanderMapDropProfile`、`CommanderScenarioFallbackProfile`。

### 运输/空投能力候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 霍纳的战列巡航舰 | `Hyperjump` | 战术跳跃 | `HHBattlecruiserHyperjump,Execute` | - | {time:6}后折跃至目标位置。战列巡航舰在折跃时处于无敌状态。 / 不需要视野。 |
| 霍纳铁鸦 | `FleetwideJump` | 战术跳跃 | `FleetwideJump,Execute` | - | 折跃到目标位置。飞行器折跃期间处于无敌状态。 |
| 霍纳维京战机 | `FleetwideJump` | 战术跳跃 | `FleetwideJump,Execute` | - | 折跃到目标位置。飞行器折跃期间处于无敌状态。 |

### 可投放单位候选

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 解放者 | `Liberator` | `Liberator` | Air; Armored/Mechanical | 矿:150 气:125 人口字段:-3 生命:180 | 重型火炮战机。装载有能对敌方空中单位造成范围伤害的飞弹。可以切换为防卫模式以提供攻城火力。 / 可以对空。 |
| 恶蝠 | `HHHellionTank` | `HHHellionTank` | Ground; Biological/Light/Mechanical | 矿:100 气:- 人口字段:-2 生命:235 | 近距离战斗单位，对前方小范围锥形区域造成伤害。可变形为快速侦察单位。 / 可以对地。 |
| 恶火 | `HHHellion` | `HHHellion` | Ground; Light/Mechanical | 矿:100 气:- 人口字段:-2 生命:90 | 快速的侦察者，可发射榴弹减慢敌方单位速度。可变形为近距离战斗单位。 / 可以对地。 |
| 霍纳的战列巡航舰 | `HHBattlecruiser` | `HHBattlecruiser` | Air; Armored/Massive/Mechanical | 矿:1000 气:800 人口字段:-10 生命:900 | 强大的战舰。可以使用战术跳跃。 |
| 霍纳寡妇雷 | `HHWidowMine` | `HHReaper, HHWidowMine` | Ground; Biological/Light | 矿:50 气:- 人口字段:-1 生命:60 | 机械地雷。在潜地状态下可向附近的敌方目标发射导弹，在目标周围的小范围区域内造成伤害。 / 可以对地和对空。 |
| 霍纳收割者 | `HHReaper` | `HHReaper` | Ground; Biological/Light | 矿:50 气:- 人口字段:-1 生命:60 | 游击单位。可以投掷击退手雷和跳跃悬崖。 / 可以对地。 |
| 霍纳铁鸦 | `HHRaven` | `HHRaven` | Air; Light/Mechanical/Psionic | 矿:100 气:200 人口字段:-2 生命:140 | 空中支援单位。能够使用分析弱点，有雷达传感器。 / 侦测单位 |
| 霍纳维京战机 | `HHViking` | `HHVikingFighter` | Air; Armored/Mechanical | 矿:400 气:250 人口字段:-4 生命:350 | 坚固的火力支援单位。进入机甲模式后可以对地。 / 可以对空。 |
| 霍纳怨灵战机 | `HHWraith` | `HHReaper, HHWraith` | Ground; Biological/Light | 矿:50 气:- 人口字段:-1 生命:60 | 高度机动性空中单位。擅长突袭打击。 |
| 掠食者 | `Predator` | `HHWidowMine, Predator` | Ground; Light/Mechanical | 矿:100 气:- 人口字段:-2 生命:90 | 机械地雷。在潜地状态下可向附近的敌方目标发射导弹，在目标周围的小范围区域内造成伤害。 / 可以对地和对空。 |

实现备注：运输机空投不要读取地图硬编码单位组，应从 `CommanderCargoLoadoutProfile` 读取当前 commander 的 `power_fusion` 单位清单和场景过滤规则。

## 10. 指挥官特殊机制

Owner：`CommanderSpecialMechanicProfile`、`CommanderSpecialResourceProfile`、`CommanderSpecialMechanicHookProfile`、`CommanderSpecialMechanicUnitProfile`。

本指挥官重点：霍纳与汉双阵营、佣兵平台/空军舰队、轰炸类面板是主特殊机制。

### 特殊机制命中项

- 帝国星港升级包 (`HornerPHLevel7`)
- 他和她的补给 (`HornerPHLevel8`)

### 特殊机制 Upgrade 候选

- 暂无自动命中项，需 CASC/实机日志补充。

### 特殊机制按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| - | - | - | - | - | command_cards.json 未自动命中特殊机制按钮。 |

实现备注：凡是涉及局内状态、资源、堆叠、全局计时器、隐藏 caster 的机制，都必须有 runtime hook 和 `[XM_DBG]` 日志。

## 11. 指挥官个性化机制

Owner：`CommanderPersonalMechanicProfile`、`CommanderPersonalMechanicEffectProfile`、`CommanderPersonalMechanicHookProfile`、`CommanderPersonalMechanicRequirementProfile`。

本指挥官重点：地面消耗型部队与空军精英舰队分层，需要 cargo 和面板同时验证。

### 威望正向融合输入

| 威望 ID | Primary Upgrade | 禁用单位 | 启用单位 | 禁用 Ability | 补充 Upgrade |
|---|---|---|---|---|---|
| `CommanderPrestigeHornerMagMines` | `CommanderPrestigeHornerMagMines` | `-` | `-` | `-` | `HornerMagMines1, [Default]` |
| `CommanderPrestigeHornerStarport` | `CommanderPrestigeHornerStarport` | `-` | `-` | `-` | `-` |
| `CommanderPrestigeHornerBombingPlatforms` | `CommanderPrestigeHornerBombingPlatforms` | `-` | `-` | `-` | `-` |

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
[XM_DBG][INFO][COMMANDER_PROFILE_LOAD] commander=Horner levelMode=FullLevel15 masteryMode=AllSixMax rosterStage=power_fusion result=ok
[XM_DBG][INFO][POWER_FUSION_APPLY] commander=Horner levelMode=FullLevel15 masteryMode=AllSixMax prestigeMode=SelectedPositive result=ok
[XM_DBG][INFO][ROSTER_LOAD] commander=Horner stage=power_fusion units=10 buildings=0 result=ok
[XM_DBG][INFO][MODULE_VERIFY] commander=Horner module=<01-11> profile=<profile> result=ok
[XM_DBG][WARN][CASC_AUDIT_REQUIRED] commander=Horner module=<module> object=<object> result=needs-casc-audit
```

## 第一轮待审计项

- 顶部技能的 caster、按钮、冷却、充能、目标转发闭包。
- 英雄或特殊英雄的 Unit、Ability、Behavior、Weapon、Actor、Sound 闭包。
- `power_fusion` 最终 roster 与 `level15` roster 的新增、替换、变体关系。
- 6 项精通的真实作用对象和最终数值。
- 3 个威望的正面收益、负面代价、disable/suppress、费用/冷却/上限变化。
- 科技建筑研究按钮、Requirement、Upgrade effect 是否完整。
- 特殊机制和个性化机制是否需要 runtime hook。
