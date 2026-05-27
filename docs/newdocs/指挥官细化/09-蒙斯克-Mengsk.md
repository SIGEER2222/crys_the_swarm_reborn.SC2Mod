# 蒙斯克（Mengsk）指挥官细化

日期：2026-05-27

## 当前口径

当前指挥官默认 15 级，不从 1 级开始；精通默认 6 项全部 30 点；威望默认只取正面收益，不直接启用官方 `PlayerPrestige`。`initial` 只作为官方基础状态审计和差异对照，默认测试和玩法应看 `power_fusion` 最终状态。

本文件按 `docs/newdocs/模块拆分` 的 11 个模块整理 蒙斯克。依据 `游戏数据/官方合作指挥官/commanders/Mengsk/` 的 JSON 摘要生成；具体 Ability、Behavior、Weapon、Actor、Effect、Requirement 闭包仍需继续追 `references/sc2-build-96883-casc-export/` 或实机 `[XM_DBG]` 日志。

## 官方数据摘要

| 项 | 值 |
|---|---|
| CommanderId | `TerranMengsk` |
| 中文名 | 蒙斯克 |
| 默认升级 | `MengskCommander` |
| 默认能力命令 | `-` |
| 威望 ID | `CommanderPrestigeMengskArtillery, CommanderPrestigeMengskRoyalGuard, CommanderPrestigeMengskTroopers` |
| heroes 数量 | 0 |
| roster 数量 | 27 |
| units 数量 | 16 |
| buildings 数量 | 11 |
| command card 对象数 | 27 |
| upgrades 数量 | 14 |
| source | `mods/starcoop/commanders/arcturusmengsk.sc2mod/base.sc2data/gamedata/userdata.xml` |

roster 样例：

```text
SCVMengsk, CommandCenterMengsk, BunkerDepotMengsk, MissileTurretMengsk, BarracksMengsk, FactoryMengsk, StarportMengsk, EngineeringBayMengsk, ArmoryMengsk, FusionCoreMengsk, GhostAcademyMengsk, ArtilleryMengsk, TrooperMengsk, TrooperMengskAA, TrooperMengskFlamethrower, TrooperMengskImproved, MarauderMengsk, GhostMengsk
```

## 15 级解锁摘要

- 1: 法律与秩序
- 2: 扩展武器库
- 3: 新单位：大地碎裂炮
- 4: 辐射打击
- 5: 绝对权威
- 6: 工程站升级包
- 7: 战争恶狼
- 8: 皇家卫队基础升级包
- 9: 新单位：黑色战锤
- 10: 核弹天劫
- 11: 神经毒素弹头
- 12: 新单位：奥古斯格勒的骄傲
- 13: 彻底毁灭
- 14: 皇家卫队高级升级包
- 15: 保证晋升

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
| 帝国劳工 | `ArtilleryMengsk` | 建造大地碎裂炮 | `TrooperMengskBuild,Build6` | - | 随机轰炸附近一处目标位置，对区域内的地面单位造成伤害。在顶部面板中开启“辐射打击”能力。 / 可以对地。 |
| 征兵中心 | `TrooperMengskDropTrain` | 冲锋队高空轨道空投舱 | `-` | HaveTrooperMengskDropTrain | 劳工和冲锋队员会被直接输送至该建筑的集结点所在处。 |
| 补给地堡 | `BunkerDepotMengskLoad` | 装载 | `BunkerMengskTransport,Load` | - | 将劳工和冲锋队员载入补给地堡。 |
| 补给地堡 | `BunkerDepotMengskUnloadAll` | 全部卸载 | `BunkerMengskTransport,UnloadAll` | - | 卸载所有单位。 |
| 星港 | `MedivacMengsk` | 建造帝国仲裁机 | `StarportMengskTrain,Train1` | - | 空中运输单位。治疗附近的生物单位。可以使用后燃推进系统。 |
| 工程站 | `TrooperMengskDropTrainResearch` | 研究冲锋队高空轨道空投舱 | `EngineeringBayMengskResearch,Research7` | - | 允许帝国劳工和帝国冲锋队可以被直接输送至征兵中心的集结点所在处。 |
| 工程站 | `ArtilleryMengskRangeResearch` | 研究大气层加速剂 | `EngineeringBayMengskResearch,Research11` | - | 使大地碎裂炮的轰炸技能的射程增加+{$UpgradeEffectArrayValue:ArtilleryMengskRange:Weapon,Artill... |
| 军械库 | `MedivacMengskSiegeTankAirliftResearch` | 研究火炮稳定器 | `ArmoryMengskResearch,Research1` | - | 允许攻城模式下的冲击分队在被帝国仲裁机吊挂时可以朝空中目标开火，只是开火间隔较长。 |
| 皇家军校 | `GhostMengskGuidedStrikeRessearch` | 研究至尊战术飞弹 | `GhostAcademyMengskResearch,Research2` | - | 元首鬼影不再需要引导战术飞弹打击。 |
| 大地碎裂炮 | `ArtilleryMengskExperimentalStrikePassive` | 辐射打击 | `-` | - | 该建筑可以装填一枚试验性弹头，瞄准地图上的任意位置进行发射。弹头会随机落在目标位置附近，使整个区域浸泡在充满辐射的生化材料中，任何进入其中的敌人每秒承受{... |
| 大地碎裂炮 | `ArtilleryMengskRange` | 大气层加速剂 | `-` | HaveArtilleryMengskRange | 使大地碎裂炮的轰炸技能的射程增加+{$UpgradeEffectArrayValue:ArtilleryMengskRange:Weapon,Artill... |
| 大地碎裂炮 | `ArtilleryMengskBombardment` | 轰炸 | `ArtilleryMengskAttack,Barrage` | - | 轰炸目标位置，朝该位置附近随机投掷弹头，对敌方地面单位造成{Effect,ArtilleryMengskBombardmentDamage,Amount}... |
| 大地碎裂炮 | `ArtilleryMengskLoad` | 装载 | `ArtilleryMengskTransport,Load` | - | 将劳工和冲锋队员装载进大地碎裂炮。每装载一名额外的劳工就会使大地碎裂炮的轰炸频率变得更快一些。 |
| 大地碎裂炮 | `ArtilleryMengskUnloadAll` | 全部卸载 | `ArtilleryMengskTransport,UnloadAll` | - | 卸载所有单位。 |
| 帝国冲锋队 | `ArtilleryMengsk` | 建造大地碎裂炮 | `TrooperMengskBuild,Build6` | - | 随机轰炸附近一处目标位置，对区域内的地面单位造成伤害。在顶部面板中开启“辐射打击”能力。 / 可以对地。 |
| 帝国 火箭筒 冲锋队 | `ArtilleryMengsk` | 建造大地碎裂炮 | `TrooperMengskBuild,Build6` | - | 随机轰炸附近一处目标位置，对区域内的地面单位造成伤害。在顶部面板中开启“辐射打击”能力。 / 可以对地。 |
| 帝国 火焰器 冲锋队 | `ArtilleryMengsk` | 建造大地碎裂炮 | `TrooperMengskBuild,Build6` | - | 随机轰炸附近一处目标位置，对区域内的地面单位造成伤害。在顶部面板中开启“辐射打击”能力。 / 可以对地。 |
| 帝国 突击手 冲锋队 | `ArtilleryMengsk` | 建造大地碎裂炮 | `TrooperMengskBuild,Build6` | - | 随机轰炸附近一处目标位置，对区域内的地面单位造成伤害。在顶部面板中开启“辐射打击”能力。 / 可以对地。 |
| 元首鬼影 | `GhostMengskGuidedStrike` | 至尊战术飞弹 | `-` | HaveGhostMengskGuidedStrike | 战术飞弹打击不再需要引导。 |
| 元首鬼影 | `NukeCalldownMengsk` | 战术飞弹打击 | `GhostMengskNuke,Execute` | - | 朝目标位置发起一轮战术飞弹打击。战术飞弹需要{Effect,GhostMengskNukeCP,InitialDelay + Effect,GhostMe... |
| 帝国仲裁机 | `MedivacMengskSiegeTankAirlift` | 火炮稳定器 | `-` | HaveMedivacMengskSiegeTankAirlift | 允许攻城模式下的冲击分队在被帝国仲裁机吊挂时可以朝空中目标开火，只是开火间隔较长。 |
| 帝国仲裁机 | `MedivacLoad` | 装载 | `MedivacMengskTransport,Load` | - | 将单位装载进医疗运输机。 |
| 帝国仲裁机 | `MedivacUnloadAll` | 全部卸载 | `MedivacMengskTransport,UnloadAt` | - | 卸载所有单位。 |
| 冲击分队 | `SiegeTankMengskAirlift` | 火炮稳定器 | `-` | HaveMedivacMengskSiegeTankAirlift | 允许攻城模式下的冲击分队在被帝国仲裁机吊挂时可以攻击空中单位。 |
| 攻城坦克 | `SiegeTankMengskAirlift` | 火炮稳定器 | `-` | HaveMedivacMengskSiegeTankAirlift | 允许攻城模式下的冲击分队在被帝国仲裁机吊挂时可以攻击空中单位。 |
| 奥古斯特格勒的骄傲 | `YamatoGunMengsk` | 大和炮 | `BattlecruiserMengskYamato,Execute` | - | 使用一门毁灭性的等离子火炮轰炸目标，造成{Effect,BattlecruiserMengskYamatoDamage,Amount}点伤害。 |

实现备注：面板只注册 profile 和转发 caster，地图不得按 commander 写 if/else。精通和威望影响面板冷却/充能/费用时，由本模块接收最终 modifier。

## 02. 英雄单位及其技能

Owner：`CommanderHeroProfile`、`CommanderHeroModeProfile`、`CommanderHeroAbilityProfile`、`CommanderHeroSkillTreeProfile`、`CommanderHeroReviveProfile`、`CommanderHeroModifierProfile`。

### 英雄单位清单

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| - | - | - | - | - | 官方 heroes.json 未列出英雄条目；召唤物/形态/特殊英雄需从 progression、command_cards 或 CASC 继续追 |

### 英雄技能按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| - | - | - | - | - | command_cards.json 未命中英雄对象按钮；英雄技能需从 CASC 或实机日志补。 |

### 英雄形态/模式候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| - | - | - | - | - | 未自动命中英雄形态或模式按钮。 |

### 英雄相关等级解锁

| 等级 | 名称 | 升级 | AbilityCmd | 说明 |
|---|---|---|---|---|
| - | - | - | - | 未自动命中英雄相关等级解锁；需要从 CASC 或实机日志补。 |

口径：无常规英雄；皇家卫队不是 HeroProfile，而是精英单位/经验机制。

待审计：Hero Unit、Ability、Behavior、Weapon、Actor、Sound、复活/重生、能量/资源、形态切换和威望改写闭包。

## 03. 普通单位技能及其进化功能

Owner：`CommanderUnitAbilityProfile`、`CommanderUnitStatProfile`、`CommanderUnitEvolutionProfile`、`CommanderUnitBehaviorProfile`、`CommanderUnitWeaponProfile`。

### 单位技能按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 帝国劳工 | `GatherMengsk` | 采集 | `SCVHarvest,Gather` | - | 命令劳工从指定的晶体矿脉或瓦斯气泉上采集资源。 |
| 帝国劳工 | `SCVMengskAdvancedConstruction` | 工作人员 | `-` | - | 多个劳工和冲锋队员可以建造同一个建筑，缩短其建造时间。 |
| 帝国劳工 | `TrooperMengskImperialMandateGeneration` | 人民的意志 | `-` | HavePropagandaBlastMengsk | 该单位被帝国见证者教导后，其提供的帝国支持度增加{Effect,PropagandaMengskTopbarRegenDummy,Amount*Effec... |
| 帝国劳工 | `TrooperMengskEnlist` | 战斗报道 | `SCVMengskEnlist,Execute` | - | 命令劳工在最近的征兵中心或者补给地堡处换上一身冲锋队军服。 |
| 帝国劳工 | `TerranBuildAdvanced` | 建造高级建筑 | `-` | - | 高级建筑列表。 |
| 帝国劳工 | `CommandCenterMengsk` | 建造征兵中心 | `TerranBuildMengsk,Build1` | - | 基础建筑，用于接收采集到的资源和转化帝国劳工与帝国冲锋队。自体可以升空。 / 开启： / - 帝国劳工 / - 帝国冲锋队 / - 劳工和冲锋队员可以建造... |
| 帝国劳工 | `RefineryMengsk` | 建造精炼厂 | `TerranBuildMengsk,Build2` | - | 建造在瓦斯气泉上，用于采集高能瓦斯。 |
| 帝国劳工 | `BunkerMengsk` | 建造补给地堡 | `TrooperMengskBuild,Build3` | - | 可以提供补给的防御性建筑。 / 充足的补给可以让你制造更多的单位。 / 冲锋队员可在地堡内战斗。 / 加成：地堡内的单位射程+1。 |
| 帝国劳工 | `BarracksMengsk` | 建造兵营 | `TerranBuildMengsk,Build4` | - | 皇家卫队步兵训练设施。 / 开启： / - 壁垒卫士 |
| 帝国劳工 | `EngineeringBayMengsk` | 建造工程站 | `TerranBuildMengsk,Build5` | - | 为帝国冲锋队和建筑提供升级方案。 / 开启： / - 劳工和冲锋队员可以建造导弹塔 / - 劳工和冲锋队员可以建造大地碎裂炮 |
| 帝国劳工 | `ArtilleryMengsk` | 建造大地碎裂炮 | `TrooperMengskBuild,Build6` | - | 随机轰炸附近一处目标位置，对区域内的地面单位造成伤害。在顶部面板中开启“辐射打击”能力。 / 可以对地。 |
| 帝国劳工 | `MissileTurretMengsk` | 建造导弹塔 | `TrooperMengskBuild,Build7` | - | 防空建筑。 / 可以对空。 / 侦测单位 |
| 帝国劳工 | `GhostAcademyMengsk` | 建造皇家军校 | `TerranBuildMengsk,Build8` | - | 为壁垒卫士和元首鬼影提供升级方案。可以为元首鬼影建造战术飞弹。 / 开启： / - 可以在兵营中训练元首鬼影 |
| 帝国劳工 | `FactoryMengsk` | 建造重工厂 | `TerranBuildMengsk,Build9` | - | 皇家卫队战车生产设施。 / 开启： / - 冲击分队 |
| 帝国劳工 | `ArmoryMengsk` | 建造军械库 | `TerranBuildMengsk,Build11` | - | 为重工厂和星港单位提供升级方案。 / 开启： / - 可以在重工厂中建造黑色战锤 |
| 帝国劳工 | `StarportMengsk` | 建造星港 | `TerranBuildMengsk,Build10` | - | 帝国和皇家卫队空中单位生产设施。 / 开启： / - 帝国仲裁机 / - 帝国见证者 / - 天空之怒 |
| 帝国劳工 | `FusionCoreMengsk` | 建造聚变芯体 | `TerranBuildMengsk,Build12` | - | 为星港单位提供升级方案。 / 开启： / - 可以在星港中建造奥古斯格勒的骄傲 |
| 帝国冲锋队 | `SCVMengskAdvancedConstruction` | 工作人员 | `-` | - | 多个劳工和冲锋队员可以建造同一个建筑，缩短其建造时间。 |
| 帝国冲锋队 | `TrooperMengskImperialMandateGeneration` | 人民的意志 | `-` | HavePropagandaBlastMengsk | 该单位被帝国见证者教导后，其提供的帝国支持度增加{Effect,PropagandaMengskTopbarRegenDummy,Amount*Effec... |
| 帝国冲锋队 | `SCVMengskEnlist` | 工地报道 | `TrooperMengskEnlist,Execute` | - | 命令冲锋队在最近的征兵中心或者补给地堡处换上一身劳工服。 |
| 帝国冲锋队 | `TrooperMengskBuild` | 建造战斗建筑 | `-` | - | 一列各种战斗建筑的名单。 |
| 帝国冲锋队 | `TrooperMengskSpecializeImproved` | 装备B-2大口径轻机枪 | `TrooperMengskSpecializeImproved,Execute` | - | 给冲锋队装备更强力的武器，能有效对付所有类型的敌方单位。该单位死亡时，其所装备的武器会掉落在地上，可以被其他帝国冲锋队员拾取。 / 可以对地和对空。 |
| 帝国冲锋队 | `TrooperMengskSpecializeFlamethrower` | 装备CPO-7火蜥火焰喷射器 | `TrooperMengskSpecializeFlamethrower,Execute` | - | 给冲锋队装备更强力的武器，尤其擅长对付地面轻型单位。该单位死亡时，其所装备的武器会掉落在地上，可以被其他帝国冲锋队员拾取。 / 可以对地。 |
| 帝国冲锋队 | `TrooperMengskSpecializeAA` | 装备冰雹发射器 | `TrooperMengskSpecializeAA,Execute` | - | 给冲锋队装备更强力的武器，尤其擅长对付空中重甲单位。该单位死亡时，其所装备的武器会掉落在地上，可以被其他帝国冲锋队员拾取。 / 可以对地和对空。 |
| 帝国冲锋队 | `BunkerMengsk` | 建造补给地堡 | `TrooperMengskBuild,Build3` | - | 可以提供补给的防御性建筑。 / 充足的补给可以让你制造更多的单位。 / 冲锋队员可在地堡内战斗。 / 加成：地堡内的单位射程+1。 |
| 帝国冲锋队 | `ArtilleryMengsk` | 建造大地碎裂炮 | `TrooperMengskBuild,Build6` | - | 随机轰炸附近一处目标位置，对区域内的地面单位造成伤害。在顶部面板中开启“辐射打击”能力。 / 可以对地。 |
| 帝国冲锋队 | `MissileTurretMengsk` | 建造导弹塔 | `TrooperMengskBuild,Build7` | - | 防空建筑。 / 可以对空。 / 侦测单位 |
| 帝国 火箭筒 冲锋队 | `SCVMengskAdvancedConstruction` | 工作人员 | `-` | - | 多个劳工和冲锋队员可以建造同一个建筑，缩短其建造时间。 |
| 帝国 火箭筒 冲锋队 | `TrooperMengskImperialMandateGeneration` | 人民的意志 | `-` | HavePropagandaBlastMengsk | 该单位被帝国见证者教导后，其提供的帝国支持度增加{Effect,PropagandaMengskTopbarRegenDummy,Amount*Effec... |
| 帝国 火箭筒 冲锋队 | `SCVMengskEnlist` | 工地报道 | `TrooperMengskEnlist,Execute` | - | 命令冲锋队在最近的征兵中心或者补给地堡处换上一身劳工服。 |
| 帝国 火箭筒 冲锋队 | `TrooperMengskBuild` | 建造战斗建筑 | `-` | - | 一列各种战斗建筑的名单。 |
| 帝国 火箭筒 冲锋队 | `TrooperMengskSpecializeImproved` | 装备B-2大口径轻机枪 | `TrooperMengskSpecializeImproved,Execute` | - | 给冲锋队装备更强力的武器，能有效对付所有类型的敌方单位。该单位死亡时，其所装备的武器会掉落在地上，可以被其他帝国冲锋队员拾取。 / 可以对地和对空。 |
| 帝国 火箭筒 冲锋队 | `TrooperMengskSpecializeFlamethrower` | 装备CPO-7火蜥火焰喷射器 | `TrooperMengskSpecializeFlamethrower,Execute` | - | 给冲锋队装备更强力的武器，尤其擅长对付地面轻型单位。该单位死亡时，其所装备的武器会掉落在地上，可以被其他帝国冲锋队员拾取。 / 可以对地。 |
| 帝国 火箭筒 冲锋队 | `TrooperMengskSpecializeAA` | 装备冰雹发射器 | `TrooperMengskSpecializeAA,Execute` | - | 给冲锋队装备更强力的武器，尤其擅长对付空中重甲单位。该单位死亡时，其所装备的武器会掉落在地上，可以被其他帝国冲锋队员拾取。 / 可以对地和对空。 |
| 帝国 火箭筒 冲锋队 | `BunkerMengsk` | 建造补给地堡 | `TrooperMengskBuild,Build3` | - | 可以提供补给的防御性建筑。 / 充足的补给可以让你制造更多的单位。 / 冲锋队员可在地堡内战斗。 / 加成：地堡内的单位射程+1。 |
| 帝国 火箭筒 冲锋队 | `ArtilleryMengsk` | 建造大地碎裂炮 | `TrooperMengskBuild,Build6` | - | 随机轰炸附近一处目标位置，对区域内的地面单位造成伤害。在顶部面板中开启“辐射打击”能力。 / 可以对地。 |
| 帝国 火箭筒 冲锋队 | `MissileTurretMengsk` | 建造导弹塔 | `TrooperMengskBuild,Build7` | - | 防空建筑。 / 可以对空。 / 侦测单位 |
| 帝国 火焰器 冲锋队 | `SCVMengskAdvancedConstruction` | 工作人员 | `-` | - | 多个劳工和冲锋队员可以建造同一个建筑，缩短其建造时间。 |
| 帝国 火焰器 冲锋队 | `TrooperMengskImperialMandateGeneration` | 人民的意志 | `-` | HavePropagandaBlastMengsk | 该单位被帝国见证者教导后，其提供的帝国支持度增加{Effect,PropagandaMengskTopbarRegenDummy,Amount*Effec... |
| 帝国 火焰器 冲锋队 | `SCVMengskEnlist` | 工地报道 | `TrooperMengskEnlist,Execute` | - | 命令冲锋队在最近的征兵中心或者补给地堡处换上一身劳工服。 |
| 帝国 火焰器 冲锋队 | `TrooperMengskBuild` | 建造战斗建筑 | `-` | - | 一列各种战斗建筑的名单。 |
| 帝国 火焰器 冲锋队 | `TrooperMengskSpecializeImproved` | 装备B-2大口径轻机枪 | `TrooperMengskSpecializeImproved,Execute` | - | 给冲锋队装备更强力的武器，能有效对付所有类型的敌方单位。该单位死亡时，其所装备的武器会掉落在地上，可以被其他帝国冲锋队员拾取。 / 可以对地和对空。 |
| 帝国 火焰器 冲锋队 | `TrooperMengskSpecializeFlamethrower` | 装备CPO-7火蜥火焰喷射器 | `TrooperMengskSpecializeFlamethrower,Execute` | - | 给冲锋队装备更强力的武器，尤其擅长对付地面轻型单位。该单位死亡时，其所装备的武器会掉落在地上，可以被其他帝国冲锋队员拾取。 / 可以对地。 |
| 帝国 火焰器 冲锋队 | `TrooperMengskSpecializeAA` | 装备冰雹发射器 | `TrooperMengskSpecializeAA,Execute` | - | 给冲锋队装备更强力的武器，尤其擅长对付空中重甲单位。该单位死亡时，其所装备的武器会掉落在地上，可以被其他帝国冲锋队员拾取。 / 可以对地和对空。 |
| 帝国 火焰器 冲锋队 | `BunkerMengsk` | 建造补给地堡 | `TrooperMengskBuild,Build3` | - | 可以提供补给的防御性建筑。 / 充足的补给可以让你制造更多的单位。 / 冲锋队员可在地堡内战斗。 / 加成：地堡内的单位射程+1。 |
| ... | ... | ... | ... | ... | 还有 105 项，后续从 command_cards.json 继续展开 |


备注：已过滤 15 个通用移动/攻击/取消类按钮，保留英雄技能、装备、被动、威望或形态相关候选。
### 进化/形态/切换候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 征兵中心 | `SCVMengsk` | 征召帝国劳工 | `CommandCenterMengskTrain,Train1` | - | 基础工作单位。用于采集资源、建造人类建筑和修理。可以切换成冲锋队员。 / 可以对地。 |
| 征兵中心 | `TrooperMengsk` | 征召冲锋队 | `CommandCenterMengskTrainWithAlerts,Train2` | - | 通用型步兵。可以装备多种武器以应对不同战况。可以切换成一身劳工服。 / 可以对地和对空。 |
| 征兵中心 | `UpgradeToPlanetaryFortress` | 升级为行星要塞 | `UpgradeToPlanetaryFortress,Execute` | - | 添置一个强力炮塔，并且提高护甲。 / 可以对地。 |
| 重工厂 | `SiegeTankMengsk` | 建造冲击分队 | `FactoryMengskTrain,Train1` | - | 皇家卫队重型坦克。可以切换成攻城模式，提供远程火力支援。 / 可以对地。 |
| 重工厂 | `ThorMengsk` | 建造黑色战锤 | `FactoryMengskTrain,Train2` | - | 皇家卫队重型攻击机甲。可以使用“掩护射击模式”。 / 可以对空和对地。 |
| 星港 | `VikingMengskFighter` | 建造天空之怒 | `StarportMengskTrain,Train3` | - | 坚固的皇家卫队支援型飞行器。装填了威力强大的反主力舰对空飞弹。可以切换至突击模式来攻击地面单位。 / 可以对空。 |
| 星港 | `RavenMengsk` | 建造帝国见证者 | `StarportMengskTrain,Train2` | - | 空中支援单位。可以使用“爱国者模式”，教导附近的盟友。 / 侦测单位 |
| 军械库 | `MedivacMengskSiegeTankAirliftResearch` | 研究火炮稳定器 | `ArmoryMengskResearch,Research1` | - | 允许攻城模式下的冲击分队在被帝国仲裁机吊挂时可以朝空中目标开火，只是开火间隔较长。 |
| 军械库 | `MechTransformationSpeedMengsk` | 研究智能伺服器 | `ArmoryMengskResearch,Research3` | - | 缩短冲击分队, 黑色战锤和天空之怒的变形时间。 |
| 帝国仲裁机 | `MedivacMengskSiegeTankAirlift` | 火炮稳定器 | `-` | HaveMedivacMengskSiegeTankAirlift | 允许攻城模式下的冲击分队在被帝国仲裁机吊挂时可以朝空中目标开火，只是开火间隔较长。 |
| 冲击分队 | `MoveHoldPosition` | 原地防御 | `move,HoldPos` | - | 命令选中的单位待在原地，并攻击射程内的敌方目标。接受命令的单位不会对敌人进行追击或移向敌人与其交战。 |
| 冲击分队 | `MovePatrol` | 巡逻 | `move,Patrol` | - | 命令选中的单位在当前位置与目标区域间进行巡逻。巡逻的单位会对敌人发起攻击或移向附近的敌人与其交战。 |
| 冲击分队 | `AttackWithoutSimpleCommandCard` | 攻击 | `attack,Execute` | - | 命令选中的单位移动到目标地点，并对沿途遭遇的敌人发起攻击。收到攻击一个目标的命令后，单位会持续攻击该目标，直到对方被消灭。 |
| 冲击分队 | `SiegeTankMengskVeterancy` | 帝国皇家卫队 | `-` | - | - |
| 冲击分队 | `SiegeTankMengskImperialMandateGeneration` | 帝国的力量 | `-` | - | 皇家卫队基于他们的补给消耗和军阶来增加帝国支持度。每隔{Effect,TopbarMengskBonusRegenFactorDummy,Amount}秒... |
| 冲击分队 | `SiegeTankMengskStun` | 震慑与敬畏 | `-` | HaveMengskVeterancySiegeTankMengskGELevel2 | 在攻城模式下，该单位的攻击现在会击晕敌方单位{Behavior,SiegeTankMengskStun,Duration}秒。在每个单位身上每{Behav... |
| 冲击分队 | `SiegeTankMengskAirlift` | 火炮稳定器 | `-` | HaveMedivacMengskSiegeTankAirlift | 允许攻城模式下的冲击分队在被帝国仲裁机吊挂时可以攻击空中单位。 |
| 冲击分队 | `SiegeModeMengsk` | 攻城模式 | `SiegeModeMengsk,Execute` | - | 部署为攻城模式。在该模式下，冲击分队有着非常远的射程，可以造成范围性伤害。冲击分队在该模式下无法移动或攻击近距离的目标。 |
| 攻城坦克 | `MoveHoldPosition` | 原地防御 | `move,HoldPos` | - | 命令选中的单位待在原地，并攻击射程内的敌方目标。接受命令的单位不会对敌人进行追击或移向敌人与其交战。 |
| 攻城坦克 | `MovePatrol` | 巡逻 | `move,Patrol` | - | 命令选中的单位在当前位置与目标区域间进行巡逻。巡逻的单位会对敌人发起攻击或移向附近的敌人与其交战。 |
| 攻城坦克 | `AttackBuildingWithoutSimpleCommandCard` | 攻击 | `attack,Execute` | - | 锁定并且攻击目标，直到超出射程或对方被摧毁。 |
| 攻城坦克 | `SiegeTankMengskVeterancy` | 帝国皇家卫队 | `-` | - | - |
| 攻城坦克 | `SiegeTankMengskImperialMandateGeneration` | 帝国的力量 | `-` | - | 皇家卫队基于他们的补给消耗和军阶来增加帝国支持度。每隔{Effect,TopbarMengskBonusRegenFactorDummy,Amount}秒... |
| 攻城坦克 | `SiegeTankMengskStun` | 震慑与敬畏 | `-` | HaveMengskVeterancySiegeTankMengskGELevel2 | 在攻城模式下，该单位的攻击现在会击晕敌方单位{Behavior,SiegeTankMengskStun,Duration}秒。在每个单位身上每{Behav... |
| 攻城坦克 | `SiegeTankMengskAirlift` | 火炮稳定器 | `-` | HaveMedivacMengskSiegeTankAirlift | 允许攻城模式下的冲击分队在被帝国仲裁机吊挂时可以攻击空中单位。 |
| 攻城坦克 | `UnsiegeMengsk` | 坦克模式 | `UnsiegeMengsk,Execute` | - | 转换回坦克模式。在该模式下，冲击分队可以移动但只能造成很少的伤害。 |
| 黑色战锤 | `ThorMengskSiege` | 掩护射击模式 | `ThorMengskSiegeTargeted,Execute` | - | 部署为掩护射击模式。在该模式下，黑色战锤对空中单位造成范围伤害。黑色战锤在该模式下无法移动。 |
| 天空之怒 | `VikingMengskAttackDamage` | 战术调整 | `-` | HaveMengskVeterancyVikingMengskGELevel3 | 变形后，该单位的攻击伤害提高{(Behavior,VikingMengskAirAttackDamage,DamageResponse.ModifyFra... |
| 天空之怒 | `AssaultModeMengsk` | 突击模式 | `AssaultModeMengsk,Execute` | - | 使天空之怒变形为机甲模式。在该模式下，天空之怒可以在地面行走，但只能攻击地面目标。 |
| 天空之怒 | `VikingMengskAttackDamage` | 战术调整 | `-` | HaveMengskVeterancyVikingMengskGELevel3 | 变形后，该单位的攻击伤害提高{(Behavior,VikingMengskAirAttackDamage,DamageResponse.ModifyFra... |
| ... | ... | ... | ... | ... | 还有 10 项，后续从 command_cards.json 继续展开 |

实现备注：单位自己声明技能、形态和升级接入口；科技建筑只展示符合条件的研究项，不直接拥有单位升级逻辑。英雄单位已从本模块候选中排除，统一归 `02. 英雄单位及其技能`。

## 04. 初始化基地与特殊建筑

Owner：`CommanderRuntimeProfile`、`CommanderScenarioLoadout`、`CommanderSpecialStructureProfile`、`CommanderInitialCasterProfile`。

### 初始化建筑候选

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 征兵中心 | `CommandCenterMengsk` | `CommandCenterMengsk` | Ground; Armored/Mechanical/Structure | 矿:400 气:- 人口字段:15 生命:1500 护盾:- 能量:- | 基础建筑，用于接收采集到的资源和转化帝国劳工与帝国冲锋队。自体可以升空。 / 开启： / - 帝国劳工 / - 帝国冲锋队 / - 劳工和冲锋队员可以... |
| 补给地堡 | `BunkerDepotMengsk` | `BunkerDepotMengsk` | Ground; Armored/Mechanical/Structure | 矿:100 气:- 人口字段:12 生命:400 护盾:- 能量:- | 可以提供补给的防御性建筑。 / 充足的补给可以让你制造更多的单位。 / 冲锋队员可在地堡内战斗。 / 加成：地堡内的单位射程+{Behavior,Bu... |

### 特殊建筑候选

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 征兵中心 | `CommandCenterMengsk` | `CommandCenterMengsk` | Ground; Armored/Mechanical/Structure | 矿:400 气:- 人口字段:15 生命:1500 护盾:- 能量:- | 基础建筑，用于接收采集到的资源和转化帝国劳工与帝国冲锋队。自体可以升空。 / 开启： / - 帝国劳工 / - 帝国冲锋队 / - 劳工和冲锋队员可以... |
| 兵营 | `BarracksMengsk` | `BarracksMengsk` | Ground; Armored/Mechanical/Structure | 矿:150 气:- 人口字段:- 生命:1000 护盾:- 能量:- | 皇家卫队步兵训练设施。 / 开启： / - 壁垒卫士 |
| 重工厂 | `FactoryMengsk` | `FactoryMengsk` | Ground; Armored/Mechanical/Structure | 矿:150 气:100 人口字段:- 生命:1250 护盾:- 能量:- | 皇家卫队战车生产设施。 / 开启： / - 冲击分队 |
| 星港 | `StarportMengsk` | `StarportMengsk` | Ground; Armored/Mechanical/Structure | 矿:150 气:100 人口字段:- 生命:1300 护盾:- 能量:- | 帝国和皇家卫队空中单位生产设施。 / 开启： / - 帝国仲裁机 / - 帝国见证者 / - 天空之怒 |
| 工程站 | `EngineeringBayMengsk` | `EngineeringBayMengsk` | Ground; Armored/Mechanical/Structure | 矿:125 气:- 人口字段:- 生命:850 护盾:- 能量:- | 为帝国冲锋队和建筑提供升级方案。 / 开启： / - 劳工和冲锋队员可以建造导弹塔 / - 劳工和冲锋队员可以建造大地碎裂炮 |

实现备注：测试台切换指挥官时调用本指挥官 initializer，负责替换主基地、工人、运输机/投放单位、隐藏 caster、英雄初始单位和特殊建筑。

## 05. 指挥官兵种

Owner：`CommanderRosterProfile`、`CommanderUnitProfile`、`CommanderUnitTrainProfile`、`CommanderUnitStageProfile`、`CommanderUnitRequirementProfile`。

来源：官方提取 `units.json`。这里列的是当前已提取普通/生产单位 Catalog 对象；英雄单位单独在 `02. 英雄单位及其技能` 中维护。满级替换、威望正向融合或进化变体仍以 `power_fusion` 审计结果为准。

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 帝国劳工 | `SCVMengsk` | `SCVMengsk` | Ground; Biological/Light/Mechanical | 矿:40 气:- 人口字段:-1 生命:45 护盾:- 能量:- | 基础工作单位。用于采集资源、建造人类建筑和修理。可以切换成冲锋队员。 / 可以对地。 |
| 帝国冲锋队 | `TrooperMengsk` | `TrooperMengsk` | Ground; Biological/Light | 矿:40 气:- 人口字段:-1 生命:45 护盾:- 能量:- | 通用型步兵。可以装备多种武器以应对不同战况。可以切换成一身劳工服。 / 可以对地和对空。 |
| 帝国 火箭筒 冲锋队 | `TrooperMengskAA` | `TrooperMengskAA` | Ground; Biological/Light | 矿:200 气:- 人口字段:-1 生命:45 护盾:- 能量:- | 专业对空攻击手。可以切换为劳工。 / 可以对地和对空。 |
| 帝国 火焰器 冲锋队 | `TrooperMengskFlamethrower` | `TrooperMengskFlamethrower` | Ground; Armored/Biological | 矿:200 气:- 人口字段:-1 生命:145 护盾:- 能量:- | 专业对空攻击手。可以切换为劳工。 / 可以对地和对空。 |
| 帝国 突击手 冲锋队 | `TrooperMengskImproved` | `TrooperMengskImproved` | Ground; Biological/Light | 矿:200 气:- 人口字段:-1 生命:45 护盾:- 能量:- | 升级后的通用型步兵。可以切换为劳工。 / 可以对地和对空。 |
| 壁垒卫士 | `MarauderMengsk` | `MarauderMengsk` | Ground; Armored/Biological | 矿:125 气:350 人口字段:-4 生命:300 护盾:- 能量:- | 皇家卫队重型突击步兵。 / 可以对地。 |
| 元首鬼影 | `GhostMengsk` | `GhostMengsk` | Ground; Biological/Psionic | 矿:200 气:500 人口字段:-4 生命:200 护盾:- 能量:200 | 皇家卫队特工。可以使用“焰能爆燃”和“EMP震爆”。可以对“皇家军校”中建造并发射的战术飞弹进行制导。 / 可以对空和对地。 |
| 帝国仲裁机 | `MedivacMengsk` | `MedivacMengsk` | Air; Armored/Mechanical | 矿:100 气:50 人口字段:-2 生命:150 护盾:- 能量:200 | 空中运输单位。治疗附近的生物单位。可以使用后燃推进系统。 |
| 冲击分队 | `SiegeTankMengsk` | `SiegeTankMengsk` | Ground; Armored/Mechanical | 矿:150 气:425 人口字段:-6 生命:350 护盾:- 能量:- | 皇家卫队重型坦克。可以切换成攻城模式，提供远程火力支援。 / 可以对地。 |
| 攻城坦克 | `SiegeTankMengskSieged` | `SiegeTankMengskSieged` | Ground; Armored/Mechanical | 矿:150 气:425 人口字段:-6 生命:350 护盾:- 能量:- | 皇家卫队重型坦克。可切换成坦克模式，提供机动坦克火力支援。 / 可以对地。 |
| 黑色战锤 | `ThorMengsk` | `ThorMengsk` | Ground; Armored/Massive/Mechanical | 矿:300 气:600 人口字段:-8 生命:600 护盾:- 能量:- | 皇家卫队重型攻击机甲。可以使用“掩护射击模式”。 / 可以对空和对地。 |
| 天空之怒 | `VikingMengskFighter` | `VikingMengskFighter` | Air; Armored/Mechanical | 矿:150 气:375 人口字段:-4 生命:270 护盾:- 能量:- | 坚固的皇家卫队支援型飞行器。装填了威力强大的反主力舰对空飞弹。可以切换至突击模式来攻击地面单位。 / 可以对空。 |
| 天空之怒 | `VikingMengskAssault` | `VikingMengskAssault` | Ground; Armored/Mechanical | 矿:150 气:375 人口字段:-4 生命:270 护盾:- 能量:- | 坚固的火力支援单位。进入战机模式后可攻击空中单位。 / 可以对地。 |
| 奥古斯特格勒的骄傲 | `BattlecruiserMengsk` | `BattlecruiserMengsk` | Air; Armored/Massive/Mechanical | 矿:400 气:900 人口字段:-10 生命:800 护盾:- 能量:- | 强大的皇家卫队战舰。可以使用大和炮与战术跳跃。在星港中建造。 / 可以对地和对空。 |
| 帝国见证者 | `RavenMengsk` | `RavenMengsk` | Air; Mechanical | 矿:100 气:100 人口字段:-2 生命:350 护盾:- 能量:- | 空中支援单位。可以使用“爱国者模式”，教导附近的盟友。 / 侦测单位 |
| 帝国见证者 | `RavenMengskSieged` | `RavenMengskSieged` | Air; Mechanical | 矿:100 气:100 人口字段:-2 生命:350 护盾:- 能量:- | 空中支援单位。 / 侦测单位 |

三阶段口径：`initial` 只做审计，`level15` 表示满级解锁，`power_fusion` 表示 15 级 + 六精通全满 + 威望正向收益后的默认运行清单。

## 06. 指挥官精通

Owner：`CommanderMasteryProfile`、`CommanderMasteryEffectProfile`、`CommanderMasteryModifierProfile`。

| 组 | 名称 | Upgrade | 每点 | 30点口径 |
|---|---|---|---|---|
| 1 | 冲锋队 天命皇权 产生率 | `MasteryMengskTrooperImperialMandateRegeneration` | 1 | +30% |
| 1 | 皇家卫队 天命皇权 产生率 | `MasteryMengskRoyalGuardImperialMandateRegeneration` | 1 | +30% |
| 2 | 成吨伤害 | `MasteryMengskTopPanelPower` | 1 | +30% |
| 2 | 皇家卫队费用 | `MasteryMengskRoyalGuardCost` | 0.6665 | -19.995% |
| 3 | 起始天命皇权 | `MasteryMengskStartingImperialMandate` | 1 | +30 |
| 3 | 皇家卫队经验获取率 | `MasteryMengskRoyalGuardExperienceGainRate` | 0.5 | +15% |

实现备注：当前默认六项全部 30 点。表里的 30 点口径由 `point_increments * 30` 推导，最终数值仍需以 Upgrade Effect 闭包验证。

## 07. 指挥官建筑

Owner：`CommanderBuildingProfile`、`CommanderBuildingAbilityProfile`、`CommanderBuildingTrainProfile`、`CommanderBuildingStageProfile`、`CommanderBuildingBehaviorProfile`。

来源：官方提取 `buildings.json`。

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 征兵中心 | `CommandCenterMengsk` | `CommandCenterMengsk` | Ground; Armored/Mechanical/Structure | 矿:400 气:- 人口字段:15 生命:1500 护盾:- 能量:- | 基础建筑，用于接收采集到的资源和转化帝国劳工与帝国冲锋队。自体可以升空。 / 开启： / - 帝国劳工 / - 帝国冲锋队 / - 劳工和冲锋队员可以... |
| 补给地堡 | `BunkerDepotMengsk` | `BunkerDepotMengsk` | Ground; Armored/Mechanical/Structure | 矿:100 气:- 人口字段:12 生命:400 护盾:- 能量:- | 可以提供补给的防御性建筑。 / 充足的补给可以让你制造更多的单位。 / 冲锋队员可在地堡内战斗。 / 加成：地堡内的单位射程+{Behavior,Bu... |
| 导弹塔 | `MissileTurretMengsk` | `MissileTurretMengsk` | Ground; Armored/Mechanical/Structure | 矿:100 气:- 人口字段:- 生命:250 护盾:- 能量:- | 防空建筑。 / 可以对空。 / 侦测单位 |
| 兵营 | `BarracksMengsk` | `BarracksMengsk` | Ground; Armored/Mechanical/Structure | 矿:150 气:- 人口字段:- 生命:1000 护盾:- 能量:- | 皇家卫队步兵训练设施。 / 开启： / - 壁垒卫士 |
| 重工厂 | `FactoryMengsk` | `FactoryMengsk` | Ground; Armored/Mechanical/Structure | 矿:150 气:100 人口字段:- 生命:1250 护盾:- 能量:- | 皇家卫队战车生产设施。 / 开启： / - 冲击分队 |
| 星港 | `StarportMengsk` | `StarportMengsk` | Ground; Armored/Mechanical/Structure | 矿:150 气:100 人口字段:- 生命:1300 护盾:- 能量:- | 帝国和皇家卫队空中单位生产设施。 / 开启： / - 帝国仲裁机 / - 帝国见证者 / - 天空之怒 |
| 工程站 | `EngineeringBayMengsk` | `EngineeringBayMengsk` | Ground; Armored/Mechanical/Structure | 矿:125 气:- 人口字段:- 生命:850 护盾:- 能量:- | 为帝国冲锋队和建筑提供升级方案。 / 开启： / - 劳工和冲锋队员可以建造导弹塔 / - 劳工和冲锋队员可以建造大地碎裂炮 |
| 军械库 | `ArmoryMengsk` | `ArmoryMengsk` | Ground; Armored/Mechanical/Structure | 矿:150 气:100 人口字段:- 生命:750 护盾:- 能量:- | 为重工厂和星港单位提供升级方案。 / 开启： / - 可以在重工厂中建造黑色战锤 |
| 聚变芯体 | `FusionCoreMengsk` | `FusionCoreMengsk` | Ground; Armored/Mechanical/Structure | 矿:150 气:150 人口字段:- 生命:750 护盾:- 能量:- | 为星港单位提供升级方案。 / 开启： / - 可以在星港中建造奥古斯格勒的骄傲 |
| 皇家军校 | `GhostAcademyMengsk` | `GhostAcademyMengsk` | Ground; Armored/Mechanical/Structure | 矿:150 气:50 人口字段:- 生命:1250 护盾:- 能量:- | 为壁垒卫士和元首鬼影提供升级方案。可以为元首鬼影建造战术飞弹。 / 开启： / - 可以在兵营中训练元首鬼影 |
| 大地碎裂炮 | `ArtilleryMengsk` | `ArtilleryMengsk` | Ground; Armored/Mechanical/Structure | 矿:150 气:100 人口字段:- 生命:400 护盾:- 能量:- | 随机轰炸附近一处目标位置，对区域内的地面单位造成伤害。在顶部面板中开启“辐射打击”能力。 / 可以对地。 |

### 建筑按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 征兵中心 | `SCVMengsk` | 征召帝国劳工 | `CommandCenterMengskTrain,Train1` | - | 基础工作单位。用于采集资源、建造人类建筑和修理。可以切换成冲锋队员。 / 可以对地。 |
| 征兵中心 | `TrooperMengsk` | 征召冲锋队 | `CommandCenterMengskTrainWithAlerts,Train2` | - | 通用型步兵。可以装备多种武器以应对不同战况。可以切换成一身劳工服。 / 可以对地和对空。 |
| 征兵中心 | `UpgradeToPlanetaryFortress` | 升级为行星要塞 | `UpgradeToPlanetaryFortress,Execute` | - | 添置一个强力炮塔，并且提高护甲。 / 可以对地。 |
| 征兵中心 | `SCVMengskEnlistCC` | 工地召唤 | `TrooperMengskEnlistNearby,Execute` | - | 命令附近的冲锋队在征兵中心或者补给地堡处换上一身劳工服。 |
| 征兵中心 | `TrooperMengskEnlistCC` | 战斗召唤 | `SCVMengskEnlistNearby,Execute` | - | 命令附近的劳工在征兵中心或者补给地堡处换上一身冲锋队军服。 |
| 征兵中心 | `SetCommandCenterRallyPointLaborer` | 设置劳工集结点 | `CommandCenterMengskRally,Rally3` | - | 派遣被征召的劳工前往指定点。集结点设在晶体矿脉或精炼厂的劳工会自动开始采集。 |
| 征兵中心 | `SetCommandCenterRallyPointTrooper` | 设置冲锋队集结点 | `CommandCenterMengskRally,Rally1` | - | 派遣被征召的冲锋队员前往指定点。 |
| 征兵中心 | `TrooperMengskDropTrain` | 冲锋队高空轨道空投舱 | `-` | HaveTrooperMengskDropTrain | 劳工和冲锋队员会被直接输送至该建筑的集结点所在处。 |
| 补给地堡 | `SCVMengskEnlistCC` | 工地召唤 | `TrooperMengskEnlistNearby,Execute` | - | 命令附近的冲锋队在征兵中心或者补给地堡处换上一身劳工服。 |
| 补给地堡 | `TrooperMengskEnlistCC` | 战斗召唤 | `SCVMengskEnlistNearby,Execute` | - | 命令附近的劳工在征兵中心或者补给地堡处换上一身冲锋队军服。 |
| 补给地堡 | `StructureArmorMengsk` | 精钢强化装甲 | `-` | HaveMengskStructureArmor | 提高该建筑的生命值与护甲。 |
| 补给地堡 | `BunkerDepotMengskRange` | 瞄准辅助射击孔 | `-` | HaveBunkerDepotMengskRange | 使补给地堡中的单位的射程进一步增加+{$UpgradeEffectArrayValue:BunkerDepotMengskRange:Behavior,B... |
| 补给地堡 | `SetSupplyBunkerRallyPoint` | 设置补给地堡集结点 | `Rally,Rally1` | - | 派遣未被装载的劳工和冲锋队员前往指定点。 |
| 补给地堡 | `BunkerDepotMengskLoad` | 装载 | `BunkerMengskTransport,Load` | - | 将劳工和冲锋队员载入补给地堡。 |
| 补给地堡 | `BunkerDepotMengskUnloadAll` | 全部卸载 | `BunkerMengskTransport,UnloadAll` | - | 卸载所有单位。 |
| 导弹塔 | `StructureArmorMengsk` | 精钢强化装甲 | `-` | HaveMengskStructureArmor | 提高该建筑的生命值与护甲。 |
| 导弹塔 | `Salvage` | 回收 | `SalvageSharedMengsk,On` | - | 回收该建筑，将其移除并返还75%建造所花费的晶体矿及高能瓦斯数量。回收过程需要{time:5}。警告：回收过程一旦开始便无法取消。 |
| 导弹塔 | `Detector` | 侦测单位 | `-` | NotUnderConstruction | 该单位能够侦测到隐形、潜地和幻像单位。 |
| 兵营 | `MarauderMengsk` | 训练壁垒卫士 | `BarracksMengskTrain,Train1` | - | 皇家卫队重型突击步兵。 / 可以对地。 |
| 兵营 | `GhostMengsk` | 训练元首鬼影 | `BarracksMengskTrain,Train2` | - | 皇家卫队特工。可以使用“焰能爆燃”和“EMP震爆”。可以对“皇家军校”中建造并发射的战术飞弹进行制导。 / 可以对空和对地。 |
| 重工厂 | `SiegeTankMengsk` | 建造冲击分队 | `FactoryMengskTrain,Train1` | - | 皇家卫队重型坦克。可以切换成攻城模式，提供远程火力支援。 / 可以对地。 |
| 重工厂 | `ThorMengsk` | 建造黑色战锤 | `FactoryMengskTrain,Train2` | - | 皇家卫队重型攻击机甲。可以使用“掩护射击模式”。 / 可以对空和对地。 |
| 星港 | `VikingMengskFighter` | 建造天空之怒 | `StarportMengskTrain,Train3` | - | 坚固的皇家卫队支援型飞行器。装填了威力强大的反主力舰对空飞弹。可以切换至突击模式来攻击地面单位。 / 可以对空。 |
| 星港 | `MedivacMengsk` | 建造帝国仲裁机 | `StarportMengskTrain,Train1` | - | 空中运输单位。治疗附近的生物单位。可以使用后燃推进系统。 |
| 星港 | `RavenMengsk` | 建造帝国见证者 | `StarportMengskTrain,Train2` | - | 空中支援单位。可以使用“爱国者模式”，教导附近的盟友。 / 侦测单位 |
| 星港 | `BattlecruiserMengsk` | 建造奥古斯格勒的骄傲 | `StarportMengskTrain,Train4` | - | 强大的皇家卫队战舰。可以使用大和炮与战术跳跃。在星港中建造。 / 可以对地和对空。 |
| 工程站 | `MengskTrooperWeaponsLevel3` | 升级帝国武器等级3 | `EngineeringBayMengskResearch,Research3` | - | 最大化升级帝国冲锋队、帝国舰船以及异虫奴仆造成的伤害。 |
| 工程站 | `MengskTrooperArmorLevel3` | 升级帝国装甲等级3 | `EngineeringBayMengskResearch,Research6` | - | 最大化升级帝国冲锋队、帝国舰船以及异虫奴仆的护甲。 |
| 工程站 | `TrooperMengskDropTrainResearch` | 研究冲锋队高空轨道空投舱 | `EngineeringBayMengskResearch,Research7` | - | 允许帝国劳工和帝国冲锋队可以被直接输送至征兵中心的集结点所在处。 |
| 工程站 | `StructureArmorMengskResearch` | 研究精钢强化装甲 | `EngineeringBayMengskResearch,Research9` | - | 提高补给地堡, 导弹塔以及大地碎裂炮的生命值与护甲。 |
| 工程站 | `BunkerDepotMengskRangeResearch` | 研究瞄准辅助射击孔 | `EngineeringBayMengskResearch,Research10` | - | 使补给地堡内单位的射程进一步增加+{$UpgradeEffectArrayValue:BunkerDepotMengskRange:Behavior,Bu... |
| 工程站 | `ArtilleryMengskRangeResearch` | 研究大气层加速剂 | `EngineeringBayMengskResearch,Research11` | - | 使大地碎裂炮的轰炸技能的射程增加+{$UpgradeEffectArrayValue:ArtilleryMengskRange:Weapon,Artill... |
| 工程站 | `ArtilleryMengskPassive` | 大地碎裂炮 | `-` | - | 工程站允许你建造大地碎裂炮。 |
| 工程站 | `MissileTurretMengskPassive` | 导弹塔 | `-` | - | 工程站使你能建造导弹塔。 |
| 军械库 | `MedivacMengskSiegeTankAirliftResearch` | 研究火炮稳定器 | `ArmoryMengskResearch,Research1` | - | 允许攻城模式下的冲击分队在被帝国仲裁机吊挂时可以朝空中目标开火，只是开火间隔较长。 |
| 军械库 | `ThorMengskArmorAuraResearch` | 研究壁垒场 | `ArmoryMengskResearch,Research2` | - | 黑色战锤为附近的友方地面单位提供+{Behavior,ThorMengskArmorAuraTarget,Modification.LifeArmorBo... |
| 军械库 | `MechTransformationSpeedMengsk` | 研究智能伺服器 | `ArmoryMengskResearch,Research3` | - | 缩短冲击分队, 黑色战锤和天空之怒的变形时间。 |
| 聚变芯体 | `MedivacMengskDoubleHealBeamResearch` | 研究双通道复苏器 | `FusionCoreMengskResearch,Research1` | - | 允许帝国仲裁机可以同时治疗两个目标。 |
| 聚变芯体 | `MedivacMengskPermanentCloakResearch` | 研究散点帷幕 | `FusionCoreMengskResearch,Research2` | - | 允许帝国仲裁机永久隐形，并且可以为自身提供一个护盾，吸收{$UpgradeEffectArrayValue:MedivacMengskPermanentC... |
| 聚变芯体 | `BlimpMengskTopbarRegenResearch` | 研究放大电波 | `FusionCoreMengskResearch,Research3` | - | 帝国见证者的“教导”技能产生“帝国支持度”的速度提高两倍。 |
| 聚变芯体 | `VikingMengskSpeedResearch` | 研究亚萨涡轮机 | `FusionCoreMengskResearch,Research4` | - | 天空之怒的移动速度提高{$UpgradeEffectArrayValue:VikingMengskSpeed:Unit,VikingMengskFight... |
| 聚变芯体 | `BattlecruiserMengskRangeAuraResearch` | 研究战场辅助瞄准系统 | `FusionCoreMengskResearch,Research5` | - | 允许奥古斯格勒的骄傲给予附近友方地面远程单位+{Behavior,BattlecruiserMengskBonusRange,Modification.R... |
| 皇家军校 | `MarauderMengskSlowResearch` | 研究失能弹 | `GhostAcademyMengskResearch,Research1` | - | 允许壁垒卫士的攻击可以减速敌人。 |
| 皇家军校 | `GhostMengskGuidedStrikeRessearch` | 研究至尊战术飞弹 | `GhostAcademyMengskResearch,Research2` | - | 元首鬼影不再需要引导战术飞弹打击。 |
| 皇家军校 | `NukeMengskArm` | 为发射井装填战术飞弹 | `ArmSiloWithNukeMengsk,Ammo1` | - | 给发射井装填战术飞弹。 / 战术飞弹需要{Effect,GhostMengskNukeCP,InitialDelay + Effect,GhostMeng... |
| 大地碎裂炮 | `ArtilleryMengskExperimentalStrikePassive` | 辐射打击 | `-` | - | 该建筑可以装填一枚试验性弹头，瞄准地图上的任意位置进行发射。弹头会随机落在目标位置附近，使整个区域浸泡在充满辐射的生化材料中，任何进入其中的敌人每秒承受{... |
| 大地碎裂炮 | `StructureArmorMengsk` | 精钢强化装甲 | `-` | HaveMengskStructureArmor | 提高该建筑的生命值与护甲。 |
| 大地碎裂炮 | `ArtilleryMengskRange` | 大气层加速剂 | `-` | HaveArtilleryMengskRange | 使大地碎裂炮的轰炸技能的射程增加+{$UpgradeEffectArrayValue:ArtilleryMengskRange:Weapon,Artill... |
| 大地碎裂炮 | `SetArtilleryMengskRallyPoint` | 设置大地碎裂炮集结点 | `Rally,Rally1` | - | 派遣未被装载的劳工和冲锋队员前往指定点。 |
| ... | ... | ... | ... | ... | 还有 4 项，后续从 command_cards.json 继续展开 |

实现备注：建筑声明自身生产、研究、行为和阶段；训练单位的最终可用性由兵种/科技/精通/威望共同裁决。


备注：已过滤 11 个通用移动/攻击/取消类按钮，保留英雄技能、装备、被动、威望或形态相关候选。
## 08. 科技建筑及其升级选项

Owner：`CommanderTechBuildingProfile`、`CommanderUnitTechProfile`、`CommanderUpgradeProfile`、`CommanderUpgradeRequirementProfile`、`CommanderUpgradeEffectProfile`。

### 15 级解锁与研究命令

| 等级 | 名称 | 解锁升级 | 解锁 AbilityCmd | 说明 |
|---|---|---|---|---|
| 1 | 法律与秩序 | `-` | `-` | 蒙斯克征召帝国劳工而不是SCV来工作，征召帝国冲锋队而不是陆战队员来战斗。他的皇家卫队可以不断升级，获得新的能力和提升现有能力。 |
| 2 | 扩展武器库 | `-` | `-` | 冲锋队员可装备CPO-7火蜥火焰喷射器以及冰雹发射器。 |
| 3 | 新单位：大地碎裂炮 | `-` | `-` | 随机轰炸附近一处目标位置，对区域内的地面单位造成伤害。 / 可以对地。 |
| 4 | 辐射打击 | `-` | `-` | 解锁可以发射试验性弹头的能力，随机朝附近一处目标区域发射大地碎裂炮。 |
| 5 | 绝对权威 | `ImperialMandateGenerationFactor` | `-` | “接受教导的劳工”、“接受教导的冲锋队员”以及皇家卫队提供帝国支持度，可以增加“天命皇权”产生的效率。解锁“放大电波”升级可以使“接受教导的劳工和冲锋队员”提供的帝国支持度数... |
| 6 | 工程站升级包 | `-` | `-` | 在工程站中解锁下列升级： / 使补给地堡内单位的射程进一步提高+1。大地碎裂炮的轰炸技能的射程增加+25。 |
| 7 | 战争恶狼 | `-` | `-` | 战争恶犬现在会在更高等级的“天命皇权”状态下部署额外的异龙和雷兽。 |
| 8 | 皇家卫队基础升级包 | `-` | `-` | 解锁下列升级： / “壁垒卫士”的攻击可以减速敌方单位 (在皇家军校中研究)。攻城模式下的“冲击分队”在被“帝国仲裁机”吊挂在空中时可以朝敌方空中单位开火 (在军械库中研究)... |
| 9 | 新单位：黑色战锤 | `-` | `-` | 皇家卫队重型攻击机甲。可以使用“掩护射击模式”。在重工厂中建造。 / 可以对空和对地。 |
| 10 | 核弹天劫 | `-` | `-` | 解锁新技能，从天上降下一轮战术导弹雨，最后还有一枚核子飞弹尾随其后。在顶部面板中激活核弹天劫。 |
| 11 | 神经毒素弹头 | `ArtilleryMengskExperimentalStrikeFear` | `-` | 辐射打击命中时会恐惧敌方单位，迫使他们惊恐乱窜。 |
| 12 | 新单位：奥古斯格勒的骄傲 | `-` | `-` | 强大的皇家卫队战舰。可以使用大和炮与战术跳跃。在星港中建造。 / 可以对地和对空。 |
| 13 | 彻底毁灭 | `NuclearAnnihilationMengskNumberMissiles` | `-` | 核弹天劫降下的战术飞弹数量从20枚提高至40枚。 |
| 14 | 皇家卫队高级升级包 | `-` | `-` | 解锁下列升级： / 允许“元首鬼影”发射战术飞弹打击且不用引导 (在皇家军校中研究)。“黑色战锤”对驻扎在它们身下的单位提供3点护甲 (在军械库中研究)。“奥古斯格勒的骄傲”... |
| 15 | 保证晋升 | `-` | `-` | 皇家卫队现在可以升至三阶军衔，获得下列能力： / “壁垒卫士”可以大幅提高他们的攻击速度。“元首鬼影”的“焰能爆燃”在目标死亡时会触发一次爆炸。敌方单位受到“元首鬼影”的EM... |

### Upgrade 摘要

| Upgrade | 父级 | 显示名 | Effect数 | 说明 |
|---|---|---|---|---|
| `ArtilleryMengskExperimentalStrikeFear` | `-` | - | 2 | - |
| `CommanderPrestigeMengskArtillery` | `-` | 毒性暴君 | 5 | 优点 / 辐射打击造成的恐惧时间延长200%，持续性伤害效果会额外使其受到的伤害提高25%，消耗降低20%，冷却时间降低66%。冲锋队员在操作大地碎裂炮时会提供帝... |
| `CommanderPrestigeMengskRoyalGuard` | `-` | 底层的力量 | 28 | 优点 / 皇家卫队消耗的高能瓦斯降低25%，并且经验值获取提高100%。 / 缺点 / 皇家卫队消耗的晶体矿提高100%，并且消耗的补给提高50%。 |
| `CommanderPrestigeMengskRoyalGuardMastery` | `-` | - | 1 | - |
| `CommanderPrestigeMengskTroopers` | `-` | - | 6 | - |
| `ImperialMandateGenerationFactor` | `-` | ImperialMandateGenerationFactor | 2 | - |
| `MasteryMengskRoyalGuardCost` | `-` | MasteryMengskRoyalGuardCost | 1 | - |
| `MasteryMengskRoyalGuardExperienceGainRate` | `-` | MasteryMengskRoyalGuardExperienceGainRate | 2 | - |
| `MasteryMengskRoyalGuardImperialMandateRegeneration` | `-` | MasteryMengskRoyalGuardImperialMandateRegeneration | 2 | - |
| `MasteryMengskStartingImperialMandate` | `-` | MasteryMengskStartingImperialMandate | 2 | - |
| `MasteryMengskTopPanelPower` | `-` | MasteryMengskTopPanelPower | 13 | - |
| `MasteryMengskTrooperImperialMandateRegeneration` | `-` | MasteryMengskTrooperImperialMandateRegeneration | 2 | - |
| `MengskCommander` | `-` | 蒙斯克 | 3 | - |
| `NuclearAnnihilationMengskNumberMissiles` | `-` | - | 2 | - |

### 研究/升级按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 帝国劳工 | `EngineeringBayMengsk` | 建造工程站 | `TerranBuildMengsk,Build5` | - | 为帝国冲锋队和建筑提供升级方案。 / 开启： / - 劳工和冲锋队员可以建造导弹塔 / - 劳工和冲锋队员可以建造大地碎裂炮 |
| 帝国劳工 | `GhostAcademyMengsk` | 建造皇家军校 | `TerranBuildMengsk,Build8` | - | 为壁垒卫士和元首鬼影提供升级方案。可以为元首鬼影建造战术飞弹。 / 开启： / - 可以在兵营中训练元首鬼影 |
| 帝国劳工 | `ArmoryMengsk` | 建造军械库 | `TerranBuildMengsk,Build11` | - | 为重工厂和星港单位提供升级方案。 / 开启： / - 可以在重工厂中建造黑色战锤 |
| 帝国劳工 | `FusionCoreMengsk` | 建造聚变芯体 | `TerranBuildMengsk,Build12` | - | 为星港单位提供升级方案。 / 开启： / - 可以在星港中建造奥古斯格勒的骄傲 |
| 征兵中心 | `UpgradeToPlanetaryFortress` | 升级为行星要塞 | `UpgradeToPlanetaryFortress,Execute` | - | 添置一个强力炮塔，并且提高护甲。 / 可以对地。 |
| 补给地堡 | `BunkerDepotMengskRange` | 瞄准辅助射击孔 | `-` | HaveBunkerDepotMengskRange | 使补给地堡中的单位的射程进一步增加+{$UpgradeEffectArrayValue:BunkerDepotMengskRange:Behavior,B... |
| 工程站 | `MengskTrooperWeaponsLevel3` | 升级帝国武器等级3 | `EngineeringBayMengskResearch,Research3` | - | 最大化升级帝国冲锋队、帝国舰船以及异虫奴仆造成的伤害。 |
| 工程站 | `MengskTrooperArmorLevel3` | 升级帝国装甲等级3 | `EngineeringBayMengskResearch,Research6` | - | 最大化升级帝国冲锋队、帝国舰船以及异虫奴仆的护甲。 |
| 工程站 | `TrooperMengskDropTrainResearch` | 研究冲锋队高空轨道空投舱 | `EngineeringBayMengskResearch,Research7` | - | 允许帝国劳工和帝国冲锋队可以被直接输送至征兵中心的集结点所在处。 |
| 工程站 | `StructureArmorMengskResearch` | 研究精钢强化装甲 | `EngineeringBayMengskResearch,Research9` | - | 提高补给地堡, 导弹塔以及大地碎裂炮的生命值与护甲。 |
| 工程站 | `BunkerDepotMengskRangeResearch` | 研究瞄准辅助射击孔 | `EngineeringBayMengskResearch,Research10` | - | 使补给地堡内单位的射程进一步增加+{$UpgradeEffectArrayValue:BunkerDepotMengskRange:Behavior,Bu... |
| 工程站 | `ArtilleryMengskRangeResearch` | 研究大气层加速剂 | `EngineeringBayMengskResearch,Research11` | - | 使大地碎裂炮的轰炸技能的射程增加+{$UpgradeEffectArrayValue:ArtilleryMengskRange:Weapon,Artill... |
| 军械库 | `MedivacMengskSiegeTankAirliftResearch` | 研究火炮稳定器 | `ArmoryMengskResearch,Research1` | - | 允许攻城模式下的冲击分队在被帝国仲裁机吊挂时可以朝空中目标开火，只是开火间隔较长。 |
| 军械库 | `ThorMengskArmorAuraResearch` | 研究壁垒场 | `ArmoryMengskResearch,Research2` | - | 黑色战锤为附近的友方地面单位提供+{Behavior,ThorMengskArmorAuraTarget,Modification.LifeArmorBo... |
| 军械库 | `MechTransformationSpeedMengsk` | 研究智能伺服器 | `ArmoryMengskResearch,Research3` | - | 缩短冲击分队, 黑色战锤和天空之怒的变形时间。 |
| 聚变芯体 | `MedivacMengskDoubleHealBeamResearch` | 研究双通道复苏器 | `FusionCoreMengskResearch,Research1` | - | 允许帝国仲裁机可以同时治疗两个目标。 |
| 聚变芯体 | `MedivacMengskPermanentCloakResearch` | 研究散点帷幕 | `FusionCoreMengskResearch,Research2` | - | 允许帝国仲裁机永久隐形，并且可以为自身提供一个护盾，吸收{$UpgradeEffectArrayValue:MedivacMengskPermanentC... |
| 聚变芯体 | `BlimpMengskTopbarRegenResearch` | 研究放大电波 | `FusionCoreMengskResearch,Research3` | - | 帝国见证者的“教导”技能产生“帝国支持度”的速度提高两倍。 |
| 聚变芯体 | `VikingMengskSpeedResearch` | 研究亚萨涡轮机 | `FusionCoreMengskResearch,Research4` | - | 天空之怒的移动速度提高{$UpgradeEffectArrayValue:VikingMengskSpeed:Unit,VikingMengskFight... |
| 聚变芯体 | `BattlecruiserMengskRangeAuraResearch` | 研究战场辅助瞄准系统 | `FusionCoreMengskResearch,Research5` | - | 允许奥古斯格勒的骄傲给予附近友方地面远程单位+{Behavior,BattlecruiserMengskBonusRange,Modification.R... |
| 皇家军校 | `MarauderMengskSlowResearch` | 研究失能弹 | `GhostAcademyMengskResearch,Research1` | - | 允许壁垒卫士的攻击可以减速敌人。 |
| 皇家军校 | `GhostMengskGuidedStrikeRessearch` | 研究至尊战术飞弹 | `GhostAcademyMengskResearch,Research2` | - | 元首鬼影不再需要引导战术飞弹打击。 |
| 大地碎裂炮 | `ArtilleryMengskRange` | 大气层加速剂 | `-` | HaveArtilleryMengskRange | 使大地碎裂炮的轰炸技能的射程增加+{$UpgradeEffectArrayValue:ArtilleryMengskRange:Weapon,Artill... |
| 帝国仲裁机 | `MedivacMengskPermanentCloak` | 散点帷幕 | `-` | HaveMedivacMengskPermanentCloak | 允许帝国仲裁机永久隐形，并且可以为自身提供一个护盾，吸收{$UpgradeEffectArrayValue:MedivacMengskPermanentC... |
| 天空之怒 | `VikingMengskSpeed` | 亚萨涡轮机 | `-` | HaveVikingMengskSpeed | 移动速度提高{$UpgradeEffectArrayValue:VikingMengskSpeed:Unit,VikingMengskFighter,Sp... |

实现备注：科技建筑只负责展示/触发研究；每个单位升级效果由对应 `CommanderUnitTechProfile` 或 `CommanderUpgradeEffectProfile` 声明。

## 09. 特定地图运输机空投单位

Owner：`CommanderCargoLoadoutProfile`、`CommanderMapDropProfile`、`CommanderScenarioFallbackProfile`。

### 运输/空投能力候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 征兵中心 | `TrooperMengskDropTrain` | 冲锋队高空轨道空投舱 | `-` | HaveTrooperMengskDropTrain | 劳工和冲锋队员会被直接输送至该建筑的集结点所在处。 |
| 补给地堡 | `SetSupplyBunkerRallyPoint` | 设置补给地堡集结点 | `Rally,Rally1` | - | 派遣未被装载的劳工和冲锋队员前往指定点。 |
| 补给地堡 | `BunkerDepotMengskLoad` | 装载 | `BunkerMengskTransport,Load` | - | 将劳工和冲锋队员载入补给地堡。 |
| 补给地堡 | `BunkerDepotMengskUnloadAll` | 全部卸载 | `BunkerMengskTransport,UnloadAll` | - | 卸载所有单位。 |
| 星港 | `MedivacMengsk` | 建造帝国仲裁机 | `StarportMengskTrain,Train1` | - | 空中运输单位。治疗附近的生物单位。可以使用后燃推进系统。 |
| 工程站 | `TrooperMengskDropTrainResearch` | 研究冲锋队高空轨道空投舱 | `EngineeringBayMengskResearch,Research7` | - | 允许帝国劳工和帝国冲锋队可以被直接输送至征兵中心的集结点所在处。 |
| 军械库 | `MedivacMengskSiegeTankAirliftResearch` | 研究火炮稳定器 | `ArmoryMengskResearch,Research1` | - | 允许攻城模式下的冲击分队在被帝国仲裁机吊挂时可以朝空中目标开火，只是开火间隔较长。 |
| 大地碎裂炮 | `SetArtilleryMengskRallyPoint` | 设置大地碎裂炮集结点 | `Rally,Rally1` | - | 派遣未被装载的劳工和冲锋队员前往指定点。 |
| 大地碎裂炮 | `ArtilleryMengskLoad` | 装载 | `ArtilleryMengskTransport,Load` | - | 将劳工和冲锋队员装载进大地碎裂炮。每装载一名额外的劳工就会使大地碎裂炮的轰炸频率变得更快一些。 |
| 大地碎裂炮 | `ArtilleryMengskUnloadAll` | 全部卸载 | `ArtilleryMengskTransport,UnloadAll` | - | 卸载所有单位。 |
| 帝国仲裁机 | `MedivacMengskSiegeTankAirlift` | 火炮稳定器 | `-` | HaveMedivacMengskSiegeTankAirlift | 允许攻城模式下的冲击分队在被帝国仲裁机吊挂时可以朝空中目标开火，只是开火间隔较长。 |
| 帝国仲裁机 | `MedivacLoad` | 装载 | `MedivacMengskTransport,Load` | - | 将单位装载进医疗运输机。 |
| 帝国仲裁机 | `MedivacUnloadAll` | 全部卸载 | `MedivacMengskTransport,UnloadAt` | - | 卸载所有单位。 |
| 冲击分队 | `SiegeTankMengskAirlift` | 火炮稳定器 | `-` | HaveMedivacMengskSiegeTankAirlift | 允许攻城模式下的冲击分队在被帝国仲裁机吊挂时可以攻击空中单位。 |
| 攻城坦克 | `SiegeTankMengskAirlift` | 火炮稳定器 | `-` | HaveMedivacMengskSiegeTankAirlift | 允许攻城模式下的冲击分队在被帝国仲裁机吊挂时可以攻击空中单位。 |
| 奥古斯特格勒的骄傲 | `BattlecruiserMengskHyperjump` | 战术跳跃 | `BattlecruiserMengskHyperjump,Execute` | - | 折跃到目标位置。战列巡航舰折跃期间处于无敌状态。 |

### 可投放单位候选

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 帝国劳工 | `SCVMengsk` | `SCVMengsk` | Ground; Biological/Light/Mechanical | 矿:40 气:- 人口字段:-1 生命:45 护盾:- 能量:- | 基础工作单位。用于采集资源、建造人类建筑和修理。可以切换成冲锋队员。 / 可以对地。 |
| 帝国冲锋队 | `TrooperMengsk` | `TrooperMengsk` | Ground; Biological/Light | 矿:40 气:- 人口字段:-1 生命:45 护盾:- 能量:- | 通用型步兵。可以装备多种武器以应对不同战况。可以切换成一身劳工服。 / 可以对地和对空。 |
| 帝国 火箭筒 冲锋队 | `TrooperMengskAA` | `TrooperMengskAA` | Ground; Biological/Light | 矿:200 气:- 人口字段:-1 生命:45 护盾:- 能量:- | 专业对空攻击手。可以切换为劳工。 / 可以对地和对空。 |
| 帝国 火焰器 冲锋队 | `TrooperMengskFlamethrower` | `TrooperMengskFlamethrower` | Ground; Armored/Biological | 矿:200 气:- 人口字段:-1 生命:145 护盾:- 能量:- | 专业对空攻击手。可以切换为劳工。 / 可以对地和对空。 |
| 帝国 突击手 冲锋队 | `TrooperMengskImproved` | `TrooperMengskImproved` | Ground; Biological/Light | 矿:200 气:- 人口字段:-1 生命:45 护盾:- 能量:- | 升级后的通用型步兵。可以切换为劳工。 / 可以对地和对空。 |
| 壁垒卫士 | `MarauderMengsk` | `MarauderMengsk` | Ground; Armored/Biological | 矿:125 气:350 人口字段:-4 生命:300 护盾:- 能量:- | 皇家卫队重型突击步兵。 / 可以对地。 |
| 元首鬼影 | `GhostMengsk` | `GhostMengsk` | Ground; Biological/Psionic | 矿:200 气:500 人口字段:-4 生命:200 护盾:- 能量:200 | 皇家卫队特工。可以使用“焰能爆燃”和“EMP震爆”。可以对“皇家军校”中建造并发射的战术飞弹进行制导。 / 可以对空和对地。 |
| 帝国仲裁机 | `MedivacMengsk` | `MedivacMengsk` | Air; Armored/Mechanical | 矿:100 气:50 人口字段:-2 生命:150 护盾:- 能量:200 | 空中运输单位。治疗附近的生物单位。可以使用后燃推进系统。 |
| 冲击分队 | `SiegeTankMengsk` | `SiegeTankMengsk` | Ground; Armored/Mechanical | 矿:150 气:425 人口字段:-6 生命:350 护盾:- 能量:- | 皇家卫队重型坦克。可以切换成攻城模式，提供远程火力支援。 / 可以对地。 |
| 攻城坦克 | `SiegeTankMengskSieged` | `SiegeTankMengskSieged` | Ground; Armored/Mechanical | 矿:150 气:425 人口字段:-6 生命:350 护盾:- 能量:- | 皇家卫队重型坦克。可切换成坦克模式，提供机动坦克火力支援。 / 可以对地。 |
| 黑色战锤 | `ThorMengsk` | `ThorMengsk` | Ground; Armored/Massive/Mechanical | 矿:300 气:600 人口字段:-8 生命:600 护盾:- 能量:- | 皇家卫队重型攻击机甲。可以使用“掩护射击模式”。 / 可以对空和对地。 |
| 天空之怒 | `VikingMengskFighter` | `VikingMengskFighter` | Air; Armored/Mechanical | 矿:150 气:375 人口字段:-4 生命:270 护盾:- 能量:- | 坚固的皇家卫队支援型飞行器。装填了威力强大的反主力舰对空飞弹。可以切换至突击模式来攻击地面单位。 / 可以对空。 |
| 天空之怒 | `VikingMengskAssault` | `VikingMengskAssault` | Ground; Armored/Mechanical | 矿:150 气:375 人口字段:-4 生命:270 护盾:- 能量:- | 坚固的火力支援单位。进入战机模式后可攻击空中单位。 / 可以对地。 |
| 奥古斯特格勒的骄傲 | `BattlecruiserMengsk` | `BattlecruiserMengsk` | Air; Armored/Massive/Mechanical | 矿:400 气:900 人口字段:-10 生命:800 护盾:- 能量:- | 强大的皇家卫队战舰。可以使用大和炮与战术跳跃。在星港中建造。 / 可以对地和对空。 |
| 帝国见证者 | `RavenMengsk` | `RavenMengsk` | Air; Mechanical | 矿:100 气:100 人口字段:-2 生命:350 护盾:- 能量:- | 空中支援单位。可以使用“爱国者模式”，教导附近的盟友。 / 侦测单位 |
| 帝国见证者 | `RavenMengskSieged` | `RavenMengskSieged` | Air; Mechanical | 矿:100 气:100 人口字段:-2 生命:350 护盾:- 能量:- | 空中支援单位。 / 侦测单位 |

实现备注：运输机空投不要读取地图硬编码单位组，应从 `CommanderCargoLoadoutProfile` 读取当前 commander 的 `power_fusion` 单位清单和场景过滤规则；英雄是否允许投放需要显式声明。

## 10. 指挥官特殊机制

Owner：`CommanderSpecialMechanicProfile`、`CommanderSpecialResourceProfile`、`CommanderSpecialMechanicHookProfile`、`CommanderSpecialMechanicUnitProfile`。

本指挥官重点：帝国支持力、皇家卫队经验、劳工/士兵切换是主特殊机制。

### 特殊机制命中项

- 法律与秩序 (`MengskPHLevel1`)
- 扩展武器库 (`MengskPHLevel2`)
- 绝对权威 (`MengskPHLevel5`)
- 皇家卫队基础升级包 (`MengskPHLevel8`)
- 新单位：黑色战锤 (`MengskPHLevel9`)
- 新单位：奥古斯格勒的骄傲 (`MengskPHLevel12`)
- 皇家卫队高级升级包 (`MengskPHLevel14`)
- 保证晋升 (`MengskPHLevel15`)

### 特殊机制 Upgrade 候选

- 毒性暴君 (`CommanderPrestigeMengskArtillery`)
- 底层的力量 (`CommanderPrestigeMengskRoyalGuard`)
- CommanderPrestigeMengskRoyalGuardMastery (`CommanderPrestigeMengskRoyalGuardMastery`)
- ImperialMandateGenerationFactor (`ImperialMandateGenerationFactor`)
- MasteryMengskRoyalGuardCost (`MasteryMengskRoyalGuardCost`)
- MasteryMengskRoyalGuardExperienceGainRate (`MasteryMengskRoyalGuardExperienceGainRate`)
- MasteryMengskRoyalGuardImperialMandateRegeneration (`MasteryMengskRoyalGuardImperialMandateRegeneration`)
- MasteryMengskStartingImperialMandate (`MasteryMengskStartingImperialMandate`)
- MasteryMengskTrooperImperialMandateRegeneration (`MasteryMengskTrooperImperialMandateRegeneration`)

### 特殊机制按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 帝国劳工 | `MapObjectInteract` | MapObjectInteract | `MapObjectInteract,Execute` | - | - |
| 帝国劳工 | `MoveHoldPosition` | 原地防御 | `move,HoldPos` | - | 命令选中的单位待在原地，并攻击射程内的敌方目标。接受命令的单位不会对敌人进行追击或移向敌人与其交战。 |
| 帝国劳工 | `MovePatrol` | 巡逻 | `move,Patrol` | - | 命令选中的单位在当前位置与目标区域间进行巡逻。巡逻的单位会对敌人发起攻击或移向附近的敌人与其交战。 |
| 帝国劳工 | `AttackWorker` | AttackWorker | `attack,Execute` | - | - |
| 帝国劳工 | `GatherMengsk` | 采集 | `SCVHarvest,Gather` | - | 命令劳工从指定的晶体矿脉或瓦斯气泉上采集资源。 |
| 帝国劳工 | `SCVMengskAdvancedConstruction` | 工作人员 | `-` | - | 多个劳工和冲锋队员可以建造同一个建筑，缩短其建造时间。 |
| 帝国劳工 | `TrooperMengskImperialMandateGeneration` | 人民的意志 | `-` | HavePropagandaBlastMengsk | 该单位被帝国见证者教导后，其提供的帝国支持度增加{Effect,PropagandaMengskTopbarRegenDummy,Amount*Effec... |
| 帝国劳工 | `TrooperMengskEnlist` | 战斗报道 | `SCVMengskEnlist,Execute` | - | 命令劳工在最近的征兵中心或者补给地堡处换上一身冲锋队军服。 |
| 帝国劳工 | `TerranBuild` | 建造建筑 | `-` | - | 基础建筑列表。 |
| 帝国劳工 | `TerranBuildAdvanced` | 建造高级建筑 | `-` | - | 高级建筑列表。 |
| 帝国劳工 | `Spray` | 喷漆 | `SprayTerran,Execute` | - | 命令单位将你当前所选喷漆图案喷绘在目标位置的地表上。 |
| 帝国劳工 | `CommandCenterMengsk` | 建造征兵中心 | `TerranBuildMengsk,Build1` | - | 基础建筑，用于接收采集到的资源和转化帝国劳工与帝国冲锋队。自体可以升空。 / 开启： / - 帝国劳工 / - 帝国冲锋队 / - 劳工和冲锋队员可以建造... |
| 帝国劳工 | `RefineryMengsk` | 建造精炼厂 | `TerranBuildMengsk,Build2` | - | 建造在瓦斯气泉上，用于采集高能瓦斯。 |
| 帝国劳工 | `BunkerMengsk` | 建造补给地堡 | `TrooperMengskBuild,Build3` | - | 可以提供补给的防御性建筑。 / 充足的补给可以让你制造更多的单位。 / 冲锋队员可在地堡内战斗。 / 加成：地堡内的单位射程+1。 |
| 帝国劳工 | `BarracksMengsk` | 建造兵营 | `TerranBuildMengsk,Build4` | - | 皇家卫队步兵训练设施。 / 开启： / - 壁垒卫士 |
| 帝国劳工 | `EngineeringBayMengsk` | 建造工程站 | `TerranBuildMengsk,Build5` | - | 为帝国冲锋队和建筑提供升级方案。 / 开启： / - 劳工和冲锋队员可以建造导弹塔 / - 劳工和冲锋队员可以建造大地碎裂炮 |
| 帝国劳工 | `ArtilleryMengsk` | 建造大地碎裂炮 | `TrooperMengskBuild,Build6` | - | 随机轰炸附近一处目标位置，对区域内的地面单位造成伤害。在顶部面板中开启“辐射打击”能力。 / 可以对地。 |
| 帝国劳工 | `MissileTurretMengsk` | 建造导弹塔 | `TrooperMengskBuild,Build7` | - | 防空建筑。 / 可以对空。 / 侦测单位 |
| 帝国劳工 | `GhostAcademyMengsk` | 建造皇家军校 | `TerranBuildMengsk,Build8` | - | 为壁垒卫士和元首鬼影提供升级方案。可以为元首鬼影建造战术飞弹。 / 开启： / - 可以在兵营中训练元首鬼影 |
| 帝国劳工 | `FactoryMengsk` | 建造重工厂 | `TerranBuildMengsk,Build9` | - | 皇家卫队战车生产设施。 / 开启： / - 冲击分队 |
| 帝国劳工 | `ArmoryMengsk` | 建造军械库 | `TerranBuildMengsk,Build11` | - | 为重工厂和星港单位提供升级方案。 / 开启： / - 可以在重工厂中建造黑色战锤 |
| 帝国劳工 | `StarportMengsk` | 建造星港 | `TerranBuildMengsk,Build10` | - | 帝国和皇家卫队空中单位生产设施。 / 开启： / - 帝国仲裁机 / - 帝国见证者 / - 天空之怒 |
| 帝国劳工 | `FusionCoreMengsk` | 建造聚变芯体 | `TerranBuildMengsk,Build12` | - | 为星港单位提供升级方案。 / 开启： / - 可以在星港中建造奥古斯格勒的骄傲 |
| 征兵中心 | `SCVMengsk` | 征召帝国劳工 | `CommandCenterMengskTrain,Train1` | - | 基础工作单位。用于采集资源、建造人类建筑和修理。可以切换成冲锋队员。 / 可以对地。 |
| 征兵中心 | `TrooperMengsk` | 征召冲锋队 | `CommandCenterMengskTrainWithAlerts,Train2` | - | 通用型步兵。可以装备多种武器以应对不同战况。可以切换成一身劳工服。 / 可以对地和对空。 |
| 征兵中心 | `TrooperMengskDropTrain` | 冲锋队高空轨道空投舱 | `-` | HaveTrooperMengskDropTrain | 劳工和冲锋队员会被直接输送至该建筑的集结点所在处。 |
| 兵营 | `MarauderMengsk` | 训练壁垒卫士 | `BarracksMengskTrain,Train1` | - | 皇家卫队重型突击步兵。 / 可以对地。 |
| 兵营 | `GhostMengsk` | 训练元首鬼影 | `BarracksMengskTrain,Train2` | - | 皇家卫队特工。可以使用“焰能爆燃”和“EMP震爆”。可以对“皇家军校”中建造并发射的战术飞弹进行制导。 / 可以对空和对地。 |
| 重工厂 | `SiegeTankMengsk` | 建造冲击分队 | `FactoryMengskTrain,Train1` | - | 皇家卫队重型坦克。可以切换成攻城模式，提供远程火力支援。 / 可以对地。 |
| 重工厂 | `ThorMengsk` | 建造黑色战锤 | `FactoryMengskTrain,Train2` | - | 皇家卫队重型攻击机甲。可以使用“掩护射击模式”。 / 可以对空和对地。 |
| 星港 | `VikingMengskFighter` | 建造天空之怒 | `StarportMengskTrain,Train3` | - | 坚固的皇家卫队支援型飞行器。装填了威力强大的反主力舰对空飞弹。可以切换至突击模式来攻击地面单位。 / 可以对空。 |
| 星港 | `MedivacMengsk` | 建造帝国仲裁机 | `StarportMengskTrain,Train1` | - | 空中运输单位。治疗附近的生物单位。可以使用后燃推进系统。 |
| 星港 | `RavenMengsk` | 建造帝国见证者 | `StarportMengskTrain,Train2` | - | 空中支援单位。可以使用“爱国者模式”，教导附近的盟友。 / 侦测单位 |
| 星港 | `BattlecruiserMengsk` | 建造奥古斯格勒的骄傲 | `StarportMengskTrain,Train4` | - | 强大的皇家卫队战舰。可以使用大和炮与战术跳跃。在星港中建造。 / 可以对地和对空。 |
| 工程站 | `MengskTrooperWeaponsLevel3` | 升级帝国武器等级3 | `EngineeringBayMengskResearch,Research3` | - | 最大化升级帝国冲锋队、帝国舰船以及异虫奴仆造成的伤害。 |
| 工程站 | `MengskTrooperArmorLevel3` | 升级帝国装甲等级3 | `EngineeringBayMengskResearch,Research6` | - | 最大化升级帝国冲锋队、帝国舰船以及异虫奴仆的护甲。 |
| 工程站 | `TrooperMengskDropTrainResearch` | 研究冲锋队高空轨道空投舱 | `EngineeringBayMengskResearch,Research7` | - | 允许帝国劳工和帝国冲锋队可以被直接输送至征兵中心的集结点所在处。 |
| 军械库 | `MedivacMengskSiegeTankAirliftResearch` | 研究火炮稳定器 | `ArmoryMengskResearch,Research1` | - | 允许攻城模式下的冲击分队在被帝国仲裁机吊挂时可以朝空中目标开火，只是开火间隔较长。 |
| 聚变芯体 | `MedivacMengskDoubleHealBeamResearch` | 研究双通道复苏器 | `FusionCoreMengskResearch,Research1` | - | 允许帝国仲裁机可以同时治疗两个目标。 |
| 聚变芯体 | `MedivacMengskPermanentCloakResearch` | 研究散点帷幕 | `FusionCoreMengskResearch,Research2` | - | 允许帝国仲裁机永久隐形，并且可以为自身提供一个护盾，吸收{$UpgradeEffectArrayValue:MedivacMengskPermanentC... |
| ... | ... | ... | ... | ... | 还有 93 项，后续从 command_cards.json 继续展开 |

实现备注：凡是涉及局内状态、资源、堆叠、全局计时器、隐藏 caster、英雄成长或召唤首领的机制，都必须有 runtime hook 和 `[XM_DBG]` 日志。

## 11. 指挥官个性化机制

Owner：`CommanderPersonalMechanicProfile`、`CommanderPersonalMechanicEffectProfile`、`CommanderPersonalMechanicHookProfile`、`CommanderPersonalMechanicRequirementProfile`。

本指挥官重点：征召兵、皇家卫队、帝国支援面板必须拆成资源、单位和面板三条验证。

### 威望正向融合输入

| 威望 ID | Primary Upgrade | 禁用单位 | 启用单位 | 禁用 Ability | 补充 Upgrade |
|---|---|---|---|---|---|
| `CommanderPrestigeMengskArtillery` | `CommanderPrestigeMengskArtillery` | `-` | `-` | `NuclearAnnihilationMengsk:` | `-` |
| `CommanderPrestigeMengskRoyalGuard` | `CommanderPrestigeMengskRoyalGuard` | `-` | `-` | `-` | `MengskRoyalGuard1` |
| `CommanderPrestigeMengskTroopers` | `CommanderPrestigeMengskTroopers` | `MedivacMengsk` | `-` | `FusionCoreMengskResearch:, FusionCoreMengskResearch:1, ArmoryMengskResearch:` | `-` |

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
[XM_DBG][INFO][COMMANDER_PROFILE_LOAD] commander=Mengsk levelMode=FullLevel15 masteryMode=AllSixMax rosterStage=power_fusion result=ok
[XM_DBG][INFO][POWER_FUSION_APPLY] commander=Mengsk levelMode=FullLevel15 masteryMode=AllSixMax prestigeMode=SelectedPositive result=ok
[XM_DBG][INFO][ROSTER_LOAD] commander=Mengsk stage=power_fusion units=16 buildings=11 heroes=0 result=ok
[XM_DBG][INFO][HERO_PROFILE_LOAD] commander=Mengsk heroes=0 result=ok
[XM_DBG][INFO][MODULE_VERIFY] commander=Mengsk module=<01-11> profile=<profile> result=ok
[XM_DBG][WARN][CASC_AUDIT_REQUIRED] commander=Mengsk module=<module> object=<object> result=needs-casc-audit
```

## 第一轮待审计项

- 顶部技能的 caster、按钮、冷却、充能、目标转发闭包。
- 英雄或特殊英雄的 Unit、Ability、Behavior、Weapon、Actor、Sound、复活/重生闭包。
- `power_fusion` 最终 roster 与 `level15` roster 的新增、替换、变体关系。
- 6 项精通的真实作用对象和最终数值。
- 3 个威望的正面收益、负面代价、disable/suppress、费用/冷却/上限变化。
- 科技建筑研究按钮、Requirement、Upgrade effect 是否完整。
- 特殊机制、英雄成长和个性化机制是否需要 runtime hook。
