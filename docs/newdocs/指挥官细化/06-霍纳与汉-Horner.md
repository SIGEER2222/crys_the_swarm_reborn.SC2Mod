# 霍纳与汉（Horner）指挥官细化

日期：2026-05-27

## 当前口径

当前指挥官默认 15 级，不从 1 级开始；精通默认 6 项全部 30 点；威望默认只取正面收益，不直接启用官方 `PlayerPrestige`。`initial` 只作为官方基础状态审计和差异对照，默认测试和玩法应看 `power_fusion` 最终状态。

本文件按 `docs/newdocs/模块拆分` 的 11 个模块整理 霍纳与汉。依据 `游戏数据/官方合作指挥官/commanders/Horner/` 的当前 JSON 生成；具体 Ability、Behavior、Weapon、Actor、Effect、Requirement 闭包仍需继续追 `游戏数据/官方SC2原始文本镜像/` 或实机 `[XM_DBG]` 日志。

## 链路提醒

- 官方 `buildings.json` 为空，Horner 不应生成建筑清单或农民可建造清单；当前人族闭包里 Horner 的 `buildings=0 / worker_buildable_structures=0` 是刻意保留的归属过滤结果。
- `HH*` / `Horner*` 是 Horner 正向 owner；非 Horner 指挥官命中这些前缀时只能作为共享污染排除。
- `Liberator` 的生产候选 `StarportTrainNova,Train3` 属于 Nova 隐秘解放者链，当前仅作为共享污染排除，不计入 Horner 生产闭包。
- `Liberator` 继承到的 `VehicleAfterburners` 被 `HaveVehicleAfterburners -> CountUpgradeRaynorCommanderCompleteOnly` 锁到 Raynor 显示条件下，本轮人族闭包已把它从 Horner accepted 技能里排除。
- 后续实现霍纳时优先看 `docs/newdocs/指挥官细化/人族闭包/terran-commander-closure.json`，不要从通用 `SCV` / `CommandCenter` / `HHSCV` 共享链反推出建筑体系。

## 官方数据摘要

| 项 | 值 |
|---|---|
| CommanderId | `TerranHorner` |
| 中文名 | 霍纳与汉 |
| 默认升级 | `HornerCommander`, `HHSuperRadar` |
| 默认能力命令 | `FusionCoreResearch:5`, `FusionCoreResearch:4`, `ArmoryResearchVoidCoop:15`, `ArmoryResearchVoidCoop:16`, `ArmoryResearchVoidCoop:17`, `A... |
| 威望 ID | `CommanderPrestigeHornerMagMines`, `CommanderPrestigeHornerStarport`, `CommanderPrestigeHornerBombingPlatforms` |
| heroes.json 数量 | 0 |
| roster.json 数量 | 10 |
| units.json 数量 | 10 |
| buildings.json 数量 | 0 |
| command_cards.json 对象数 | 9 |
| upgrades.json 数量 | 21 |
| other-tech-entries.json 数量 | 0 |
| source | `mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/userdata.xml` |

roster 样例：

```text
HHBattlecruiser, HHHellion, HHHellionTank, HHRaven, HHReaper, HHViking, HHWidowMine, HHWraith, Predator, Liberator
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
| 默认能力 | - | FusionCoreResearch:5 | - | 来自 commander.json |
| 默认能力 | - | FusionCoreResearch:4 | - | 来自 commander.json |
| 默认能力 | - | ArmoryResearchVoidCoop:15 | - | 来自 commander.json |
| 默认能力 | - | ArmoryResearchVoidCoop:16 | - | 来自 commander.json |
| 默认能力 | - | ArmoryResearchVoidCoop:17 | - | 来自 commander.json |
| 默认能力 | - | ArmoryResearchVoidCoop:12 | - | 来自 commander.json |
| 默认能力 | - | ArmoryResearchVoidCoop:13 | - | 来自 commander.json |
| 默认能力 | - | ArmoryResearchVoidCoop:14 | - | 来自 commander.json |
| Lv2 新单位：攻击战斗机 | 2 | HHBuild:12 | - | 解锁攻击战斗机平台和精确打击技能。发射一架攻击战斗机，对目标敌人或区域执行空中打击。 |
| Lv2 新单位：攻击战斗机 | 2 | HHBomberPlatformAreaBombTopBarOrder: | - | 解锁攻击战斗机平台和精确打击技能。发射一架攻击战斗机，对目标敌人或区域执行空中打击。 |
| Lv3 突击炮舰和忒伊亚铁鸦升级包 | 3 | HHMercStarportHangar:1 | - | 解锁以下升级：突击炮舰可以单独升级能自动建造和发射无人战斗机的机库忒伊亚铁鸦的分析弱点可以额外瞄准2个单位 |
| Lv3 突击炮舰和忒伊亚铁鸦升级包 | 3 | StarportTechLabResearch:1 | - | 解锁以下升级：突击炮舰可以单独升级能自动建造和发射无人战斗机的机库忒伊亚铁鸦的分析弱点可以额外瞄准2个单位 |
| Lv4 雇佣兵升级包 | 4 | HHMercCompoundResearch:2 | - | 在工程站中解锁以下升级：提高收割者的移动速度，使其获得可以飞行10秒的能力。寡妇雷的攻击范围扩大50%，可以更加快速地潜地和出地。 |
| Lv4 雇佣兵升级包 | 4 | HHMercCompoundResearch:1 | - | 在工程站中解锁以下升级：提高收割者的移动速度，使其获得可以飞行10秒的能力。寡妇雷的攻击范围扩大50%，可以更加快速地潜地和出地。 |
| Lv5 呼叫舰队 | 5 | HornerAirFleetActivate: | - | 解锁呼叫霍纳的舰队进行近轨道火力支援。舰队会对目标区域内的随机敌方单位造成巨量伤害。 |
| Lv5 呼叫舰队 | 5 | HornerAirFleetTargetingDummy: | - | 解锁呼叫霍纳的舰队进行近轨道火力支援。舰队会对目标区域内的随机敌方单位造成巨量伤害。 |
| Lv7 帝国星港升级包 | 7 | StarportTechLabResearch:25 | - | 在星港的科技实验室中解锁以下升级：怨灵战机每攻击一次，其攻击速度提高10%，最高可达100%。维京战机在机甲模式下可以对目标后方的敌方单位造成伤害。维京战机的变形时间减少75%。 |
| Lv7 帝国星港升级包 | 7 | StarportTechLabResearch:28 | - | 在星港的科技实验室中解锁以下升级：怨灵战机每攻击一次，其攻击速度提高10%，最高可达100%。维京战机在机甲模式下可以对目标后方的敌方单位造成伤害。维京战机的变形时间减少75%。 |
| Lv9 恶火和恶蝠升级包 | 9 | HHMercCompoundResearch:9 | - | 在工程站中解锁以下升级：允许恶火使用焦油炸弹，造成20点伤害，并降低附近敌人的移动速度。恶蝠的攻击会使敌人燃烧。 |
| Lv9 恶火和恶蝠升级包 | 9 | HHMercCompoundResearch:7 | - | 在工程站中解锁以下升级：允许恶火使用焦油炸弹，造成20点伤害，并降低附近敌人的移动速度。恶蝠的攻击会使敌人燃烧。 |
| Lv10 空间站调度 | 10 | HHSummonMercenarySpaceStation: | - | 解锁使用空间站调度技能。空间站撞击时对英雄目标造成500点伤害，撞击范围内的其它一切存在都将被立即摧毁。攻击型无人机会攻击附近的目标。 |
| Lv13 聚变芯体升级包 | 13 | FusionCoreResearch:3 | - | 在聚变芯体中解锁以下升级： / 战列巡航舰的武器系统升级成威力强大的粒子光炮。攻击战斗机平台的精确打击会使用凝固汽油弹点燃目标位置。 |
| Lv13 聚变芯体升级包 | 13 | FusionCoreResearch:5 | - | 在聚变芯体中解锁以下升级： / 战列巡航舰的武器系统升级成威力强大的粒子光炮。攻击战斗机平台的精确打击会使用凝固汽油弹点燃目标位置。 |

### command card 命中

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 至尊战列巡航舰 | `Hyperjump` | 战术跳跃 | `HHBattlecruiserHyperjump,Execute` | - | {time:6}后折跃至目标位置。战列巡航舰在折跃时处于无敌状态。 / 不需要视野。 |
| 忒伊亚铁鸦 | `FleetwideJump` | 战术跳跃 | `FleetwideJump,Execute` | - | 折跃到目标位置。飞行器折跃期间处于无敌状态。 |
| 收割者 | `HHReaperClusterBombs` | LE9型集束炸弹 | - | `HaveHHReaperClusterBomb` | 使KD8炸弹的冷却时间缩短{time:10}。被杀死时，收割者会向击杀他的单位投掷多枚手雷。 |
| 德摩斯维京战机 | `FleetwideJump` | 战术跳跃 | `FleetwideJump,Execute` | - | 折跃到目标位置。飞行器折跃期间处于无敌状态。 |
| 寡妇雷 | `HHWidowMineDeathBlossom` | 处决飞弹 | - | `HaveHHWidowMineDeathBlossom` | 哨兵导弹冷却时间降低{time:20}。被杀死时，寡妇雷会向附近的随机目标发射5枚哨兵导弹，造成{Effect,HHWidowMineBlossomExplodeSplash,Amount}(+{Effect,HHWidowMineBlossomExplodeSplash,... |
| 阿斯忒瑞亚怨灵战机 | `FleetwideJump` | 战术跳跃 | `FleetwideJump,Execute` | - | 折跃到目标位置。飞行器折跃期间处于无敌状态。 |

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

口径：官方 heroes.json 暂无条目；若官方玩法存在隐藏英雄或召唤英雄，继续用 CASC/实机日志补。

待审计：Hero Unit、Ability、Behavior、Weapon、Actor、Sound、复活/重生、能量/资源、形态切换和威望改写闭包。

## 03. 普通单位技能及其进化功能

Owner：`CommanderUnitAbilityProfile`、`CommanderUnitStatProfile`、`CommanderUnitEvolutionProfile`、`CommanderUnitBehaviorProfile`、`CommanderUnitWeaponProfile`。

### 单位技能按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 至尊战列巡航舰 | `HHMSOHealth` | 我的另一半 | - | `HaveHHSOBuff` | 汉的战斗单位使霍纳的单位的生命值提高{Effect,HornerMSOHealthDisplayDummy,Amount}%。 |
| 至尊战列巡航舰 | `Hyperjump` | 战术跳跃 | `HHBattlecruiserHyperjump,Execute` | - | {time:6}后折跃至目标位置。战列巡航舰在折跃时处于无敌状态。 / 不需要视野。 |
| 至尊战列巡航舰 | `HHYamatoShots` | 超载反应堆 | `HHYamatoShots,On` | - | 武器系统升级为强大的粒子光炮，每次攻击造成{Effect,HHLaserBatteryU,Amount}点伤害。 |
| 至尊战列巡航舰 | `HHBattlecruiserShots` | 变回ATX激光炮组 | `HHYamatoShots,Off` | - | 使用战列巡航舰的标准ATX激光炮组。 |
| 至尊战列巡航舰 | `HHArmyOOCRegen` | 耐力训练 | - | `HaveHHArmyOOCRegen` | 该单位脱离战斗后每秒回复{Behavior,HHArmyOOCRegenSpeed,Modification.VitalRegenArray[Life]}点生命值。 |
| 恶火 | `HHMSOAttackSpeed` | 我的另一半 | - | `HaveHHSOBuff` | 霍纳的战斗单位使汉的单位的攻击速度提高{Effect,HornerMSOAttackSpeedDisplayDummy,Amount}%。 |
| 恶火 | `MorphToHellionTank` | 恶蝠模式 | `MorphToHHHellionTank,Execute` | - | 近距离战斗单位，对前方小范围锥形区域造成伤害。可变形为快速侦察单位。 / 可以对地。 |
| 恶火 | `HHHellionBomb` | 焦油炸弹 | `HHHellionBomb,Execute` | - | 发射一枚焦油炸弹，对目标单位造成{Effect,HHHellionBombDamage,Amount}点伤害。附近的敌人移动速度降低{(1 - Behavior,HHHellionBombSlow,Modification.MoveSpeedMultiplier) *100... |
| 恶火 | `HHHellionDeathStim` | 喷雾刺激发射器 | - | `HaveHHHellionStimDeath` | 恶火和恶蝠变形速度提高75%。恶火被杀死时，附近的友方单位的移动速度提高{(Behavior,HHHellionStimDeath,Modification.MoveSpeedMultiplier - 1) * 100}%，攻击速度提高{(Behavior,HHHellio... |
| 恶蝠 | `HHMSOAttackSpeed` | 我的另一半 | - | `HaveHHSOBuff` | 霍纳的战斗单位使汉的单位的攻击速度提高{Effect,HornerMSOAttackSpeedDisplayDummy,Amount}%。 |
| 恶蝠 | `MorphToHHHellion` | 恶火模式 | `MorphToHHHellion,Execute` | - | 快速的侦察者，发射榴弹来减速敌方单位。可变形为近距离战斗单位。 / 可以对地。 |
| 恶蝠 | `HHHellionDeathFear` | 狂火炸药 | - | `HaveHHHellionFearDeath` | 移动速度提高{$UpgradeEffectArrayValue:HHHellionFearDeath:Unit,HHHellionTank,Speed$/Unit,HHHellionTank,Speed*100}%。恶蝠被杀死时会点燃周围区域。火中的敌人会在恐惧中乱跑，持续... |
| 恶蝠 | `HHHellionAttackDoT` | 爆燃液体 | - | `HaveHHHellionAttackDoT` | 攻击会使敌人在{Behavior,HHHellionDoT,Duration}秒内受到{Effect,HHHellionDoTDamage,Amount * Behavior,HHHellionDoT,Period * Behavior,HHHellionDoT,Durat... |
| 忒伊亚铁鸦 | `AcquireMove` | 搜索移动 | `move,AcquireMove` | - | 命令选中的单位移至目标区域或跟随目标单位。进行搜索移动的单位不会与敌人交战。 |
| 忒伊亚铁鸦 | `Detector` | 侦测单位 | - | - | 该单位能够侦测到隐形、潜地和幻像单位。 |
| 忒伊亚铁鸦 | `HHSuperRadar` | 成像雷达 | - | - | 远距离显示敌方单位的位置。 |
| 忒伊亚铁鸦 | `HHMSOHealth` | 我的另一半 | - | `HaveHHSOBuff` | 汉的战斗单位使霍纳的单位的生命值提高{Effect,HornerMSOHealthDisplayDummy,Amount}%。 |
| 忒伊亚铁鸦 | `FleetwideJump` | 战术跳跃 | `FleetwideJump,Execute` | - | 折跃到目标位置。飞行器折跃期间处于无敌状态。 |
| 忒伊亚铁鸦 | `HHNomadTargetLock` | 分析弱点 | `RavenTargetLock,Execute` | - | 对被分析的单位进行的所有近战和远程攻击都会有3点伤害加成。只要铁鸦锁定目标，效果就会一直存在。 |
| 忒伊亚铁鸦 | `MorphtoHHRavenSiege` | 启动消音模式 | `HHRavenMorphtoHHRavenSiege,Execute` | - | 铁鸦获得隐形效果但是无法移动和使用主动技能。此技能激活后可以取消。 |
| 忒伊亚铁鸦 | `HHArmyOOCRegen` | 耐力训练 | - | `HaveHHArmyOOCRegen` | 该单位脱离战斗后每秒回复{Behavior,HHArmyOOCRegenSpeed,Modification.VitalRegenArray[Life]}点生命值。 |
| 收割者 | `HHMSOAttackSpeed` | 我的另一半 | - | `HaveHHSOBuff` | 霍纳的战斗单位使汉的单位的攻击速度提高{Effect,HornerMSOAttackSpeedDisplayDummy,Amount}%。 |
| 收割者 | `HHKD8Charge` | KD8型炸弹 | `HHD8SingleCharge,Execute` | - | 短暂延迟后发生爆炸，造成{Effect,HHD8ChargeExplodeDamage,Amount}点范围伤害并击退附近的单位。 |
| 收割者 | `HHReaperFly` | 喷气背包加力 | `HHReaperFly,Execute` | - | 使收割者飞行{Behavior,HHReaperFlyingDuration,Duration}秒。飞行时，收割者可以对空。 |
| 收割者 | `JetPack` | 喷气背包 | `255,255` | - | 使收割者能够翻越悬崖。 |
| 收割者 | `CombatDrugs` | 战斗药剂 | - | - | 脱离战斗后能够迅速恢复生命值。 |
| 收割者 | `HHReaperClusterBombs` | LE9型集束炸弹 | - | `HaveHHReaperClusterBomb` | 使KD8炸弹的冷却时间缩短{time:10}。被杀死时，收割者会向击杀他的单位投掷多枚手雷。 |
| 德摩斯维京战机 | `HHVikingPiercingAttacks` | 撕裂弹 | - | `HaveHHVikingPiercingAttack` | 机甲模式的攻击有穿透效果，对目标后面的敌方单位造成伤害。变形时间缩短75%。 |
| 德摩斯维京战机 | `HHVikingMorphSpeed` | HHVikingMorphSpeed | - | `HaveHHVikingMorph` | - |
| 德摩斯维京战机 | `HHMSOHealth` | 我的另一半 | - | `HaveHHSOBuff` | 汉的战斗单位使霍纳的单位的生命值提高{Effect,HornerMSOHealthDisplayDummy,Amount}%。 |
| 德摩斯维京战机 | `FleetwideJump` | 战术跳跃 | `FleetwideJump,Execute` | - | 折跃到目标位置。飞行器折跃期间处于无敌状态。 |
| 德摩斯维京战机 | `HHVikingRockets` | 狂暴飞弹 | `HHVikingRockets,Execute` | - | 对目标单位发射{Effect,HHVikingRocketsBurstPersistent,PeriodCount}枚火箭，每枚火箭造成{Effect,HHVikingRocketsDamage,Amount} ({Effect,HHVikingRocketsDamage,... |
| 德摩斯维京战机 | `AssaultMode` | 机甲模式 | `HHAssaultMode,Execute` | - | 将维京战机变形为机甲模式。该模式下的维京战机可以行走，但只能攻击地面单位。 |
| 德摩斯维京战机 | `HHArmyOOCRegen` | 耐力训练 | - | `HaveHHArmyOOCRegen` | 该单位脱离战斗后每秒回复{Behavior,HHArmyOOCRegenSpeed,Modification.VitalRegenArray[Life]}点生命值。 |
| 寡妇雷 | `AcquireMove` | 搜索移动 | `move,AcquireMove` | - | 命令选中的单位移至目标区域或跟随目标单位。进行搜索移动的单位不会与敌人交战。 |
| 寡妇雷 | `HHMSOAttackSpeed` | 我的另一半 | - | `HaveHHSOBuff` | 霍纳的战斗单位使汉的单位的攻击速度提高{Effect,HornerMSOAttackSpeedDisplayDummy,Amount}%。 |
| 寡妇雷 | `WidowMineAttack` | 攻击 | `HHWidowMineAttack,Execute` | - | 攻击任何附近的敌人单位。 |
| 寡妇雷 | `WidowMineBurrow` | 激活地雷 | `HHWidowMineBurrow,Execute` | - | 埋下寡妇雷并使其进入准备状态。激活时无法移动。 |
| 寡妇雷 | `HHWidowMineDeathBlossom` | 处决飞弹 | - | `HaveHHWidowMineDeathBlossom` | 哨兵导弹冷却时间降低{time:20}。被杀死时，寡妇雷会向附近的随机目标发射5枚哨兵导弹，造成{Effect,HHWidowMineBlossomExplodeSplash,Amount}(+{Effect,HHWidowMineBlossomExplodeSplash,... |
| 寡妇雷 | `HHWidowMineRangeAttack` | 黑市发射器 | `HHWidowMineAttack,Execute` | `HaveHHWidowMineAttackRange` | 哨兵导弹范围提高50%，潜地和出地速度变快。 |
| 阿斯忒瑞亚怨灵战机 | `HHMSOHealth` | 我的另一半 | - | `HaveHHSOBuff` | 汉的战斗单位使霍纳的单位的生命值提高{Effect,HornerMSOHealthDisplayDummy,Amount}%。 |
| 阿斯忒瑞亚怨灵战机 | `FleetwideJump` | 战术跳跃 | `FleetwideJump,Execute` | - | 折跃到目标位置。飞行器折跃期间处于无敌状态。 |
| 阿斯忒瑞亚怨灵战机 | `HHWraithPermaCloak` | 未登记的隐形系统 | - | `HaveHHWraithPermaCloak` | 怨灵战机永久隐形。 |
| 阿斯忒瑞亚怨灵战机 | `WraithCloakOff` | - | `HHWraithCloak,Off` | - | - |
| 阿斯忒瑞亚怨灵战机 | `HHWraithFury` | 火控复检 | - | `HaveHHWraithFury` | 怨灵战机的每次攻击都能提高自身10%的攻击速度，最多叠加到100%。 / 被动技能。 |
| ... | ... | ... | ... | ... | 还有 4 项，后续从 command_cards.json 继续展开。 |

### 进化/形态/切换候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 恶火 | `MorphToHellionTank` | 恶蝠模式 | `MorphToHHHellionTank,Execute` | - | 近距离战斗单位，对前方小范围锥形区域造成伤害。可变形为快速侦察单位。 / 可以对地。 |
| 恶蝠 | `MorphToHHHellion` | 恶火模式 | `MorphToHHHellion,Execute` | - | 快速的侦察者，发射榴弹来减速敌方单位。可变形为近距离战斗单位。 / 可以对地。 |
| 忒伊亚铁鸦 | `MorphtoHHRavenSiege` | 启动消音模式 | `HHRavenMorphtoHHRavenSiege,Execute` | - | 铁鸦获得隐形效果但是无法移动和使用主动技能。此技能激活后可以取消。 |
| 德摩斯维京战机 | `HHVikingMorphSpeed` | HHVikingMorphSpeed | - | `HaveHHVikingMorph` | - |
| 德摩斯维京战机 | `AssaultMode` | 机甲模式 | `HHAssaultMode,Execute` | - | 将维京战机变形为机甲模式。该模式下的维京战机可以行走，但只能攻击地面单位。 |
| 寡妇雷 | `WidowMineBurrow` | 激活地雷 | `HHWidowMineBurrow,Execute` | - | 埋下寡妇雷并使其进入准备状态。激活时无法移动。 |
| 解放者 | `LiberatorAGMode` | 防卫模式 | `LiberatorAGTarget,Execute` | - | 部署为防卫模式。在此模式下解放者可对地面单位造成大量单体伤害。在此模式下解放者无法移动。 |

实现备注：单位自身声明技能、被动、武器、Behavior 和升级后替换关系；科技建筑只触发研究，不在科技建筑内部判断所有兵种 if/else。

## 04. 初始化基地与特殊建筑

Owner：`CommanderBaseInitProfile`、`CommanderOpeningLoadoutProfile`、`CommanderSpecialStructureProfile`、`CommanderInitHookProfile`。

### 初始化建筑候选

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| - | - | - | - | - | 未自动命中基地或特殊建筑候选。 |

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
| 至尊战列巡航舰 | `HHBattlecruiser` | `HHBattlecruiser` | Air; Armored/Massive/Mechanical; Unit; FactionMarauder | 矿:1000 气:800 人口:-10 生命:900 护盾:- 能量:- | 强大的战舰。可以使用战术跳跃。 |
| 恶火 | `HHHellion` | `HHHellion` | Ground; Light/Mechanical; Unit; FactionMarauder | 矿:100 气:- 人口:-2 生命:90 护盾:- 能量:- | 快速的侦察者，可发射榴弹减慢敌方单位速度。可变形为近距离战斗单位。 / 可以对地。 |
| 恶蝠 | `HHHellionTank` | `HHHellionTank` | Ground; Biological/Light/Mechanical; Unit; FactionMarauder | 矿:100 气:- 人口:-2 生命:235 护盾:- 能量:- | 近距离战斗单位，对前方小范围锥形区域造成伤害。可变形为快速侦察单位。 / 可以对地。 |
| 忒伊亚铁鸦 | `HHRaven` | `HHRaven` | Air; Light/Mechanical/Psionic; Unit; FactionMarauder | 矿:100 气:200 人口:-2 生命:140 护盾:- 能量:- | 空中支援单位。能够使用分析弱点，有雷达传感器。 / 侦测单位 |
| 收割者 | `HHReaper` | `HHReaper` | Ground; Biological/Light; Unit; FactionMarauder | 矿:50 气:- 人口:-1 生命:60 护盾:- 能量:- | 游击单位。可以投掷击退手雷和跳跃悬崖。 / 可以对地。 |
| 德摩斯维京战机 | `HHViking` | `HHVikingFighter` | Air; Armored/Mechanical; Unit; FactionMarauder | 矿:400 气:250 人口:-4 生命:350 护盾:- 能量:- | 坚固的火力支援单位。进入机甲模式后可以对地。 / 可以对空。 |
| 寡妇雷 | `HHWidowMine` | `HHWidowMine, HHReaper` | Ground; Light/Mechanical; Unit; FactionMarauder | 矿:100 气:- 人口:-2 生命:90 护盾:- 能量:- | 机械地雷。在潜地状态下可向附近的敌方目标发射导弹，在目标周围的小范围区域内造成伤害。 / 可以对地和对空。 |
| 阿斯忒瑞亚怨灵战机 | `HHWraith` | `HHWraith, HHReaper` | Air; Armored/Mechanical; Unit; FactionMarauder | 矿:400 气:200 人口:-4 生命:400 护盾:- 能量:200 | 高度机动性空中单位。擅长突袭打击。 |
| 掠食者 | `Predator` | `Predator, HHWidowMine` | Unit; FactionRaider | 矿:- 气:- 人口:- 生命:- 护盾:- 能量:- | - |
| 解放者 | `Liberator` | `Liberator` | Air; Armored/Mechanical; Unit; Melee | 矿:150 气:125 人口:-3 生命:180 护盾:- 能量:- | 重型火炮战机。装载有能对敌方空中单位造成范围伤害的飞弹。可以切换为防卫模式以提供攻城火力。 / 可以对空。 |

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
| 1 | 攻击战斗机的效果范围 | `MasteryHornerBomberRadius` | `1` | +30% | - |
| 1 | 优化亡语 | `MasteryHornerBetterDeathRattle` | `2` | +60% | - |
| 2 | 我的显著加成 | `MasteryHornerMSOBonus` | `1` | +30% | - |
| 2 | 回收几率翻倍 | `MasteryHornerDoubleSalvageChance` | `2` | +60% | - |
| 3 | 空袭距离 | `MasteryHornerAirStrikeDistance` | `2` | +60% | - |
| 3 | 麦格天雷升级 | `MasteryHornerMagMineUpgrades` | `1` | -30% | - |

实现备注：当前默认六项精通全 30 点，不再做官方互斥取舍；若同一字段被多个精通/威望改写，必须进入 `CommanderModifierStackProfile` 明确叠加顺序。

## 07. 指挥官建筑

Owner：`CommanderBuildingProfile`、`CommanderBuildingAbilityProfile`、`CommanderBuildingReplacementProfile`。

### 当前 buildings.json 建筑清单

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| - | - | - | - | - | 当前 buildings.json 暂无建筑条目。 |

### 建筑按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| - | - | - | - | - | command_cards.json 未命中建筑按钮。 |

实现备注：建筑自己的技能、生产队列、变形、起飞/降落、特殊自动施法由建筑 profile 声明；地图和科技建筑不持有跨指挥官判断。

## 08. 科技建筑及其升级选项

Owner：`CommanderTechBuildingProfile`、`CommanderTechOptionProfile`、`CommanderUpgradeEffectProfile`。

### 15 级解锁与研究命令

| 等级 | 名称 | 解锁升级 | 解锁 AbilityCmd | 说明 |
|---|---|---|---|---|
| 1 | 霍纳夫妇 | `HHScrapPickup` | - | 友方单位被杀死时会为这些单位的指挥官掉落资源。马特·霍纳开局会有一个可以训练精英飞行器的星港。 |
| 2 | 新单位：攻击战斗机 | - | `HHBuild:12`, `HHBomberPlatformAreaBombTopBarOrder:` | 解锁攻击战斗机平台和精确打击技能。发射一架攻击战斗机，对目标敌人或区域执行空中打击。 |
| 3 | 突击炮舰和忒伊亚铁鸦升级包 | - | `HHMercStarportHangar:1`, `StarportTechLabResearch:1` | 解锁以下升级：突击炮舰可以单独升级能自动建造和发射无人战斗机的机库忒伊亚铁鸦的分析弱点可以额外瞄准2个单位 |
| 4 | 雇佣兵升级包 | - | `HHMercCompoundResearch:2`, `HHMercCompoundResearch:1` | 在工程站中解锁以下升级：提高收割者的移动速度，使其获得可以飞行10秒的能力。寡妇雷的攻击范围扩大50%，可以更加快速地潜地和出地。 |
| 5 | 呼叫舰队 | - | `HornerAirFleetActivate:`, `HornerAirFleetTargetingDummy:` | 解锁呼叫霍纳的舰队进行近轨道火力支援。舰队会对目标区域内的随机敌方单位造成巨量伤害。 |
| 6 | 十万火急 | `HHMiraBuildResearchTimeReduction` | - | 米拉单位的建造时间和研究时间缩短30% |
| 7 | 帝国星港升级包 | - | `StarportTechLabResearch:25`, `StarportTechLabResearch:28` | 在星港的科技实验室中解锁以下升级：怨灵战机每攻击一次，其攻击速度提高10%，最高可达100%。维京战机在机甲模式下可以对目标后方的敌方单位造成伤害。维京战机的变形时间减少75%。 |
| 8 | 他和她的补给 | `HHDoubleSupply` | - | 补给站已使用帝国科技进行升级，使其生命值和补给提高100%。 |
| 9 | 恶火和恶蝠升级包 | - | `HHMercCompoundResearch:9`, `HHMercCompoundResearch:7` | 在工程站中解锁以下升级：允许恶火使用焦油炸弹，造成20点伤害，并降低附近敌人的移动速度。恶蝠的攻击会使敌人燃烧。 |
| 10 | 空间站调度 | - | `HHSummonMercenarySpaceStation:` | 解锁使用空间站调度技能。空间站撞击时对英雄目标造成500点伤害，撞击范围内的其它一切存在都将被立即摧毁。攻击型无人机会攻击附近的目标。 |
| 11 | 耐力训练 | `HHArmyOOCRegen` | - | 霍纳的单位脱离战斗后会恢复生命。 |
| 12 | 高级武器 | `HHAirFleetYamato`, `HHProgression12IconUpgrade` | - | 呼叫舰队用激光炮组轰击敌方目标，并发射优先攻击高生命值目标的大和炮。 |
| 13 | 聚变芯体升级包 | - | `FusionCoreResearch:3`, `FusionCoreResearch:5` | 在聚变芯体中解锁以下升级： / 战列巡航舰的武器系统升级成威力强大的粒子光炮。攻击战斗机平台的精确打击会使用凝固汽油弹点燃目标位置。 |
| 14 | 爆爆乐 | `HHSpaceStationNuke`, `HHProgression14IconUpgrade` | - | 空间站调度会在毁灭时引发核爆装置。 |
| 15 | 我的另一半 | `HHSOBuff` | - | 你的单位会根据军队的构成而获得加成： / 米拉的单位每占用一点补给，霍纳的单位获得0.5%的生命值。霍纳的单位每占用一点补给，米拉的单位获得0.5%的攻击速度。 |

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
| 恶蝠 | `HHHellionDeathFear` | 狂火炸药 | - | `HaveHHHellionFearDeath` | 移动速度提高{$UpgradeEffectArrayValue:HHHellionFearDeath:Unit,HHHellionTank,Speed$/Unit,HHHellionTank,Speed*100}%。恶蝠被杀死时会点燃周围区域。火中的敌人会在恐惧中乱跑，持续... |
| 解放者 | `LiberatorAGRangeUpgrade` | 强化弹道 | - | `HaveLiberatorRange` | 解放者在防卫模式下的射程提高{$UpgradeEffectArrayValue:LiberatorAGRangeUpgrade:Weapon,LiberatorAGWeapon,Range$}。 |

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
| Horner | `原始mod/Maps/XM/traynor01.SC2Map/MapScript.galaxy` | 开场 SpecialOpsDropship 按 libE0EAE146_gv_commander 塞不同货舱；Dehaka/Gary 改为地面生成 | 已有按指挥官替换开场运输/救援小队的地图素材。 | 应迁移为 map=traynor01 的 cargo_light 或 opening_rescue profile。 |
| Horner | `原始mod/Maps/XM/thanson01.SC2Map/MapScript.galaxy` | Firebat dropship 按 commander 替换货舱，默认 Firebat + Medic | 已有轻型救援运输机的 commander 分支。 | 应迁移为 cargo_light profile，并保留地图卸载/返航点。 |
| Horner | `原始mod/Maps/XM/ttychus02.SC2Map/MapScript.galaxy` | Siege tank dropship 按 commander 替换货舱，卸载后 DropCargoAndExit | 已有重型支援运输机的 commander 分支。 | 应迁移为 cargo_heavy profile，并保留 Stukov/Mengsk 等后置 hook。 |
| Horner | `原始mod/Maps/XM/thorner02.SC2Map/MapScript.galaxy` | 按 commander 决定运输单位或货舱，例如 Stukov HerculesSCV、Nova SiegeTank_BlackOps、Swann HerculesSwann | 已有运输单位本身也可由 commander 替换的地图素材。 | 应迁移为 CommanderMapDropProfile 的 TransportUnit/TransportAbility 字段。 |
| 通用 | `原始mod/Maps/XM/thorner04.SC2Map/MapScript.galaxy` | gf_DropKillTeamViaHercules 创建 Hercules、UnitCargoCreate 塞兵、卸货后攻击 | 已有可复用的大力神空投执行器，但主要服务敌方/剧情 kill team。 | 可参考执行流程；不能直接当玩家指挥官 loadout 来源。 |
| Horner | `原始mod/Mods/XM/XMMira.SC2Mod/Base.SC2Data/GameData` | MercAirDrop、MedivacMira、CommandCenterTransportMira | 米拉/霍纳已有雇佣军空投、医疗运输机和基地运输相关数据。 | 可参考空降表现和运输按钮；场景 loadout 仍需显式配置。 |
| 通用 | `原始mod 全局搜索` | 未命中 XM_CreateCommanderCargoSquad 或 CommanderCargoLoadoutProfile | 原始mod 只有素材和地图硬编码，没有现成的指挥官货舱配置框架。 | 本模块需要新建 profile/factory 抽象，不能照搬地图 if/else。 |

### 场景 loadout 设计草案

| ScenarioKind | 推荐单位 | 用途 | 设计说明 | 来源状态 |
|---|---|---|---|---|
| `cargo_light` | HHReaper x6, HHHellion x2 | 雇佣军突袭 | 收割者和恶火体现米拉轻型部队。 | 已有 XMMira 雇佣军空投/医疗运输机与地图货舱分支可参考；此处是霍纳场景 loadout 草案。 |
| `cargo_heavy` | HHHellionTank x4, Predator x2, HHWidowMine x4 | 地面伏击 | 恶蝠、掠食者和寡妇雷构成防守支援。 | 已有 XMMira 雇佣军空投/医疗运输机与地图货舱分支可参考；此处是霍纳场景 loadout 草案。 |
| `cargo_air` | HHWraith x4, HHViking x2, HHRaven x1 | 霍纳空军 | 怨灵/维京提供制空，铁鸦补支援。 | 已有 XMMira 雇佣军空投/医疗运输机与地图货舱分支可参考；此处是霍纳场景 loadout 草案。 |
| `bonus_reward` | HHBattlecruiser x1, Liberator x2 | 舰队奖励 | 至尊战列巡航舰只在高强度场景出现。 | 已有 XMMira 雇佣军空投/医疗运输机与地图货舱分支可参考；此处是霍纳场景 loadout 草案。 |
| `replacement_squad` | HHReaper x8, HHWidowMine x4 | 雇佣军投放 | 用于测试死亡效果和快速空投节奏。 | 已有 XMMira 雇佣军空投/医疗运输机与地图货舱分支可参考；此处是霍纳场景 loadout 草案。 |

### 接入规则

- 本模块不再从 `command_cards.json` 的运输/空投按钮自动推导货舱单位，也不把 `units.json` 全量清单当成可投放单位。
- 地图只传入 `mapId`、`scenarioKind`、目标点和运输模式；单位组合由 `CommanderCargoLoadoutProfile` 根据当前 commander、15 级 `power_fusion` roster 和场景限制解析。
- `原始mod` 已有运输机、空投舱、狮鹫运输、医疗运输机、坑道/深挖或感染运输容器时，应优先保留它的流程语义，只把硬编码单位替换为 profile 查询结果。
- 英雄、首领、终极进化、战列巡航舰、航母等高价值单位默认只能用于 `bonus_reward` 或显式允许英雄的地图场景。
实现备注：`CommanderMapDropProfile` 负责把地图事件映射为 `scenarioKind`；`CommanderScenarioFallbackProfile` 负责缺项降级并输出 `[XM_DBG][WARN][CARGO_FALLBACK]`。

## 10. 指挥官特殊机制

Owner：`CommanderSpecialMechanicProfile`、`CommanderSpecialResourceProfile`、`CommanderSpecialMechanicHookProfile`、`CommanderSpecialMechanicUnitProfile`。

本指挥官重点：汉/霍纳双军工体系、雇佣军平台、舰队顶部技能。

### 特殊机制命中项

- 霍纳夫妇 (HornerPHLevel1)
- 新单位：攻击战斗机 (HornerPHLevel2)
- 突击炮舰和忒伊亚铁鸦升级包 (HornerPHLevel3)
- 雇佣兵升级包 (HornerPHLevel4)
- 呼叫舰队 (HornerPHLevel5)
- 十万火急 (HornerPHLevel6)
- 帝国星港升级包 (HornerPHLevel7)
- 他和她的补给 (HornerPHLevel8)
- 恶火和恶蝠升级包 (HornerPHLevel9)
- 空间站调度 (HornerPHLevel10)
- 耐力训练 (HornerPHLevel11)
- 高级武器 (HornerPHLevel12)
- 聚变芯体升级包 (HornerPHLevel13)
- 爆爆乐 (HornerPHLevel14)
- 我的另一半 (HornerPHLevel15)

### 特殊机制 Upgrade 候选

- 星系军火走私者 (`CommanderPrestigeHornerBombingPlatforms`)
- 混沌模范夫妻 (`CommanderPrestigeHornerMagMines`)
- CommanderPrestigeHornerMagMinesMastery (`CommanderPrestigeHornerMagMinesMastery`)
- 银翼指挥官 (`CommanderPrestigeHornerStarport`)
- HHAirFleetYamato (`HHAirFleetYamato`)
- HHMiraBuildResearchTimeReduction (`HHMiraBuildResearchTimeReduction`)
- 霍纳 (`HornerCommander`)
- MasteryHornerAirStrikeDistance (`MasteryHornerAirStrikeDistance`)
- MasteryHornerBetterDeathRattle (`MasteryHornerBetterDeathRattle`)
- MasteryHornerBomberRadius (`MasteryHornerBomberRadius`)
- MasteryHornerDoubleSalvageChance (`MasteryHornerDoubleSalvageChance`)
- MasteryHornerMSOBonus (`MasteryHornerMSOBonus`)
- MasteryHornerMagMineUpgrades (`MasteryHornerMagMineUpgrades`)

### 特殊机制按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 至尊战列巡航舰 | `HHMSOHealth` | 我的另一半 | - | `HaveHHSOBuff` | 汉的战斗单位使霍纳的单位的生命值提高{Effect,HornerMSOHealthDisplayDummy,Amount}%。 |
| 恶火 | `HHMSOAttackSpeed` | 我的另一半 | - | `HaveHHSOBuff` | 霍纳的战斗单位使汉的单位的攻击速度提高{Effect,HornerMSOAttackSpeedDisplayDummy,Amount}%。 |
| 恶蝠 | `HHMSOAttackSpeed` | 我的另一半 | - | `HaveHHSOBuff` | 霍纳的战斗单位使汉的单位的攻击速度提高{Effect,HornerMSOAttackSpeedDisplayDummy,Amount}%。 |
| 忒伊亚铁鸦 | `HHMSOHealth` | 我的另一半 | - | `HaveHHSOBuff` | 汉的战斗单位使霍纳的单位的生命值提高{Effect,HornerMSOHealthDisplayDummy,Amount}%。 |
| 忒伊亚铁鸦 | `FleetwideJump` | 战术跳跃 | `FleetwideJump,Execute` | - | 折跃到目标位置。飞行器折跃期间处于无敌状态。 |
| 收割者 | `HHMSOAttackSpeed` | 我的另一半 | - | `HaveHHSOBuff` | 霍纳的战斗单位使汉的单位的攻击速度提高{Effect,HornerMSOAttackSpeedDisplayDummy,Amount}%。 |
| 德摩斯维京战机 | `HHMSOHealth` | 我的另一半 | - | `HaveHHSOBuff` | 汉的战斗单位使霍纳的单位的生命值提高{Effect,HornerMSOHealthDisplayDummy,Amount}%。 |
| 德摩斯维京战机 | `FleetwideJump` | 战术跳跃 | `FleetwideJump,Execute` | - | 折跃到目标位置。飞行器折跃期间处于无敌状态。 |
| 寡妇雷 | `HHMSOAttackSpeed` | 我的另一半 | - | `HaveHHSOBuff` | 霍纳的战斗单位使汉的单位的攻击速度提高{Effect,HornerMSOAttackSpeedDisplayDummy,Amount}%。 |
| 阿斯忒瑞亚怨灵战机 | `HHMSOHealth` | 我的另一半 | - | `HaveHHSOBuff` | 汉的战斗单位使霍纳的单位的生命值提高{Effect,HornerMSOHealthDisplayDummy,Amount}%。 |
| 阿斯忒瑞亚怨灵战机 | `FleetwideJump` | 战术跳跃 | `FleetwideJump,Execute` | - | 折跃到目标位置。飞行器折跃期间处于无敌状态。 |

实现备注：凡是涉及局内状态、资源、堆叠、全局计时器、隐藏 caster、英雄成长或召唤首领的机制，都必须有 runtime hook 和 `[XM_DBG]` 日志。

## 11. 指挥官个性化机制

Owner：`CommanderPersonalMechanicProfile`、`CommanderPersonalMechanicEffectProfile`、`CommanderPersonalMechanicHookProfile`、`CommanderPersonalMechanicRequirementProfile`。

本指挥官重点：汉的雇佣军与霍纳舰队是双 roster，生产/空投/顶部技能需要统一 profile。

### 威望正向融合输入

| 威望 ID | 名称 | Primary Upgrade | 禁用单位 | 启用单位 | 禁用 Ability | 补充 Upgrade |
|---|---|---|---|---|---|---|
| `CommanderPrestigeHornerMagMines` | - | `CommanderPrestigeHornerMagMines` | - | - | - | `HornerMagMines1`, `[Default]` |
| `CommanderPrestigeHornerStarport` | - | `CommanderPrestigeHornerStarport` | - | - | - | - |
| `CommanderPrestigeHornerBombingPlatforms` | - | `CommanderPrestigeHornerBombingPlatforms` | - | - | - | - |

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
[XM_DBG][INFO][COMMANDER_PROFILE_LOAD] commander=Horner levelMode=FullLevel15 masteryMode=AllSixMax rosterStage=power_fusion result=ok
[XM_DBG][INFO][POWER_FUSION_APPLY] commander=Horner levelMode=FullLevel15 masteryMode=AllSixMax prestigeMode=SelectedPositive result=ok
[XM_DBG][INFO][ROSTER_LOAD] commander=Horner stage=power_fusion units=10 buildings=0 heroes=0 result=ok
[XM_DBG][INFO][HERO_PROFILE_LOAD] commander=Horner heroes=0 result=ok
[XM_DBG][INFO][MODULE_VERIFY] commander=Horner module=<01-11> profile=<profile> result=ok
[XM_DBG][WARN][CASC_AUDIT_REQUIRED] commander=Horner module=<module> object=<object> result=needs-casc-audit
```

## 第一轮待审计项

- 顶部技能的 caster、按钮、冷却、充能、目标转发闭包。
- 英雄或特殊英雄的 Unit、Ability、Behavior、Weapon、Actor、Sound、复活/重生闭包。
- `power_fusion` 最终 roster 与 `level15` roster 的新增、替换、变体关系。
- 6 项精通的真实作用对象和最终数值。
- 3 个威望的正面收益、负面代价、disable/suppress、费用/冷却/上限变化。
- 科技建筑研究按钮、Requirement、Upgrade effect 是否完整。
- 特殊机制、英雄成长和个性化机制是否需要 runtime hook。
