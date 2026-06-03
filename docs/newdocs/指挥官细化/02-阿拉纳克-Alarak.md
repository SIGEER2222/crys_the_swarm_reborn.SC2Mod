# 阿拉纳克（Alarak）指挥官细化

日期：2026-05-27

## 当前口径

当前指挥官默认 15 级，不从 1 级开始；精通默认 6 项全部 30 点；威望默认只取正面收益，不直接启用官方 `PlayerPrestige`。`initial` 只作为官方基础状态审计和差异对照，默认测试和玩法应看 `power_fusion` 最终状态。

本文件按 `docs/newdocs/模块拆分` 的 11 个模块整理 阿拉纳克。依据 `游戏数据/官方合作指挥官/commanders/Alarak/` 的当前 JSON 生成；具体 Ability、Behavior、Weapon、Actor、Effect、Requirement 闭包仍需继续追 `游戏数据/官方SC2原始文本镜像/` 或实机 `[XM_DBG]` 日志。

## 链路提醒

- 阿拉纳克当前官方正向建筑只有 `Gateway`、`PhotonCannon`、`TwilightCouncil`；这些是共享星灵 Catalog 对象，不能因为建筑按钮表里出现别的指挥官锁定项就当作阿拉纳克私有链。
- 阿拉纳克正向兵种按 `units.json` 的 `ColossusTaldarim`、`HighTemplarTaldarim`、`ImmortalTaldarim`、`SentryTaldarim`、`Supplicant`、`WarpPrismTaldarim`、`Stalker` 过滤。
- 候选表里出现 `FenixLevel*`、`KaraxLevel*`、`VorazunLevel*`、`ZeratulArtifact*` 或其它神族指挥官专属 Requirement 时，只能作为共享 Gateway/Twilight/Robotics 污染候选，不得接入阿拉纳克满级实现。

## 官方数据摘要

| 项 | 值 |
|---|---|
| CommanderId | `ProtossAlarak` |
| 中文名 | 阿拉纳克 |
| 默认升级 | `AlarakCommander`, `HaveMonitor`, `VoidRayBeamCanCharge` |
| 默认能力命令 | `AlarakStructureOvercharge:`, `CyberneticsCoreResearch:6` |
| 威望 ID | `CommanderPrestigeAlarakMech`, `CommanderPrestigeAlarakEmpowerMe`, `CommanderPrestigeAlarakDeathFleet` |
| heroes.json 数量 | 0 |
| roster.json 数量 | 10 |
| units.json 数量 | 7 |
| buildings.json 数量 | 3 |
| command_cards.json 对象数 | 10 |
| upgrades.json 数量 | 19 |
| other-tech-entries.json 数量 | 0 |
| source | `mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/userdata.xml` |

roster 样例：

```text
ColossusTaldarim, Gateway, HighTemplarTaldarim, ImmortalTaldarim, PhotonCannon, SentryTaldarim, Supplicant, TwilightCouncil, WarpPrismTaldarim, Stalker
```

## 15 级解锁摘要

- 1: 吸收灵魂
- 2: 强化超载
- 3: 进攻战术
- 4: 死亡议会升级包
- 5: 供奉我
- 6: 机械研究所升级包
- 7: 闪电奔涌
- 8: 新单位：晋升者
- 9: 浩劫升级包
- 10: 召唤死亡舰队
- 11: 超强能量
- 12: 晋升者升级包
- 13: 炽热天空
- 14: 阿拉纳克升级包
- 15: 高阶领主之怒

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
| 默认能力 | - | AlarakStructureOvercharge: | - | 来自 commander.json |
| 默认能力 | - | CyberneticsCoreResearch:6 | - | 来自 commander.json |
| Lv4 死亡议会升级包 | 4 | TwilightCouncilResearch:17 | - | 在死亡议会中解锁以下升级： / 死徒的护盾+25点。杀戮者在受到伤害后，短时间内处于无敌状态。 |
| Lv4 死亡议会升级包 | 4 | TwilightCouncilResearch:20 | - | 在死亡议会中解锁以下升级： / 死徒的护盾+25点。杀戮者在受到伤害后，短时间内处于无敌状态。 |
| Lv5 供奉我 | 5 | AlarakEmpower: | - | 解锁阿拉纳克的供奉我技能，附近每有一个友方单位都会使他的攻击以及技能伤害提高，持续20秒。 |
| Lv6 机械研究所升级包 | 6 | RoboticsBayResearch:14 | - | 在机械研究所中解锁以下升级： / 先锋的溅射伤害范围扩大50%。提高天罚行者的攻击速度。 |
| Lv6 机械研究所升级包 | 6 | RoboticsBayResearch:16 | - | 在机械研究所中解锁以下升级： / 先锋的溅射伤害范围扩大50%。提高天罚行者的攻击速度。 |
| Lv9 浩劫升级包 | 9 | TwilightCouncilResearch:21 | - | 在控制芯核中解锁以下升级： / 目标锁定的伤害加成额外提高15%。扩大小队视野的范围，以及目标锁定和力场的射程。 |
| Lv9 浩劫升级包 | 9 | TwilightCouncilResearch:18 | - | 在控制芯核中解锁以下升级： / 目标锁定的伤害加成额外提高15%。扩大小队视野的范围，以及目标锁定和力场的射程。 |
| Lv10 召唤死亡舰队 | 10 | AlarakACSummonDeathfleetTarget: | - | 解锁折跃限时的塔达林母舰和毁灭者护卫的能力。通过顶部面板来召唤死亡舰队。 |
| Lv12 晋升者升级包 | 12 | TemplarArchivesResearch:7 | - | 在晋升者文献馆中解锁以下升级： / 提高晋升者灵能球的飞行距离。献祭为晋升者提供可叠加的永久护盾和技能伤害加成。 |
| Lv12 晋升者升级包 | 12 | TemplarArchivesResearch:8 | - | 在晋升者文献馆中解锁以下升级： / 提高晋升者灵能球的飞行距离。献祭为晋升者提供可叠加的永久护盾和技能伤害加成。 |

### command card 命中

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 天罚行者 | `AlarakColossusChargedBlastChargeTime` | 快速能量循环 | - | `HaveColossusChargedBlastChargeTime` | 缩短天罚行者充能爆裂弹的充能时间与武器攻击速度。 |
| 追猎者 | `Blink` | 闪现 | `Blink,Execute` | - | 使追猎者能够闪现到附近的目标位置。该技能{Abil,Blink,Cost[0].Cooldown.TimeUse}秒内只能使用1次。 |
| 追猎者 | `AlarakStalkerPhasingArmor` | 相位护甲 | - | `HaveAlarakStalkerPhasingArmor` | 使杀戮者在受到攻击后的{Behavior,AlarakStalkerPhasingArmorBuff,Duration}秒内不会再受到伤害。该效果每{Behavior,AlarakStalkerPhasingArmor,DamageResponse.Cost.Cooldow... |

实现备注：面板只注册 profile 和转发 caster，地图不得按 commander 写 if/else。精通和威望影响面板冷却、充能、费用时，由本模块接收最终 modifier。

## 02. 英雄单位及其技能

Owner：`CommanderHeroProfile`、`CommanderHeroModeProfile`、`CommanderHeroAbilityProfile`、`CommanderHeroSkillTreeProfile`、`CommanderHeroReviveProfile`、`CommanderHeroModifierProfile`。

### 英雄单位清单

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| - | - | - | - | - | 官方 heroes.json 暂无条目；召唤物、形态、特殊英雄需从 progression、command_cards 或官方原始文本镜像继续追。 |

### 英雄技能按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| - | - | - | - | - | command_cards.json 未命中 heroes.json 对象按钮；英雄技能需从官方原始文本镜像或实机日志补。 |

### 英雄形态/模式候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| - | - | - | - | - | 未自动命中英雄形态或模式按钮。 |

### 英雄相关等级解锁

| 等级 | 名称 | 升级 | AbilityCmd | 说明 |
|---|---|---|---|---|
| Lv1 | 吸收灵魂 | - | - | 附近有敌方单位死亡时，阿拉纳克可以治疗自己，每一点单位补给为其恢复20点生命值和20点护盾。 / 阿拉纳克频临死亡时，他可以从附近你控制的单位身上窃取生命值。该技能没有冷却时间。 |
| Lv2 | 强化超载 | `AlarakStructureImprovedOvercharge` | - | 建筑超载现在可以激活一层屏障，吸收最多400点伤害。 |
| Lv3 | 进攻战术 | `AlarakImprovedDeadlyCharge` | - | 阿拉纳克的致命冲锋射程提高3，冷却时间缩短5秒。 |
| Lv4 | 死亡议会升级包 | - | `TwilightCouncilResearch:17`, `TwilightCouncilResearch:20` | 在死亡议会中解锁以下升级： / 死徒的护盾+25点。杀戮者在受到伤害后，短时间内处于无敌状态。 |
| Lv5 | 供奉我 | - | `AlarakEmpower:` | 解锁阿拉纳克的供奉我技能，附近每有一个友方单位都会使他的攻击以及技能伤害提高，持续20秒。 |
| Lv6 | 机械研究所升级包 | - | `RoboticsBayResearch:14`, `RoboticsBayResearch:16` | 在机械研究所中解锁以下升级： / 先锋的溅射伤害范围扩大50%。提高天罚行者的攻击速度。 |
| Lv7 | 闪电奔涌 | `AlarakSupplicantSacrificeLightningStrikes` | - | 献祭一名死徒使阿拉纳克的下一次致命冲锋可以对主要目标附近的4名敌人造成额外50点伤害。 |
| Lv8 | 新单位：晋升者 | - | - | 强大的灵能运用大师。可以使用灵能球、心灵爆裂和献祭。 / 可以对地。 |
| Lv9 | 浩劫升级包 | - | `TwilightCouncilResearch:21`, `TwilightCouncilResearch:18` | 在控制芯核中解锁以下升级： / 目标锁定的伤害加成额外提高15%。扩大小队视野的范围，以及目标锁定和力场的射程。 |
| Lv10 | 召唤死亡舰队 | - | `AlarakACSummonDeathfleetTarget:` | 解锁折跃限时的塔达林母舰和毁灭者护卫的能力。通过顶部面板来召唤死亡舰队。 |
| Lv11 | 超强能量 | `AlarakAreaDamageUpgrade` | - | 供奉我激活时，阿拉纳克的攻击造成范围伤害。 |
| Lv12 | 晋升者升级包 | - | `TemplarArchivesResearch:7`, `TemplarArchivesResearch:8` | 在晋升者文献馆中解锁以下升级： / 提高晋升者灵能球的飞行距离。献祭为晋升者提供可叠加的永久护盾和技能伤害加成。 |
| Lv13 | 炽热天空 | `AlarakImprovedDeathFleet` | - | 解锁母舰的热能射线枪技能，并且在召唤死亡舰队时额外折跃4艘毁灭者。 |
| Lv14 | 阿拉纳克升级包 | - | - | 在锻炉中解锁以下升级： / 使阿拉纳克的普通攻击能够击晕敌人及减速英雄单位，持续2秒。湮灭波的击退距离提高100%。 |
| Lv15 | 高阶领主之怒 | `AlarakSupplicantSacrificeCDR` | - | 每当有一个死徒被献祭，阿拉纳克致命冲锋的冷却时间缩短10秒，湮灭波的冷却时间缩短5秒。 |

口径：官方玩法存在阿拉纳克本体，但当前 heroes.json 未列出，需要从官方原始文本镜像/实机补 HeroProfile、复活和技能闭包。

待审计：Hero Unit、Ability、Behavior、Weapon、Actor、Sound、复活/重生、能量/资源、形态切换和威望改写闭包。

## 03. 普通单位技能及其进化功能

Owner：`CommanderUnitAbilityProfile`、`CommanderUnitStatProfile`、`CommanderUnitEvolutionProfile`、`CommanderUnitBehaviorProfile`、`CommanderUnitWeaponProfile`。

### 单位技能按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 天罚行者 | `CommanderPrestigeAlarakMechBuff` | 灵魂之匣 | - | `CommanderPrestigeAlarakMech` | 该单位可以最多收集{Behavior,CommanderPrestigeAlarakMechBuff,MaxPoints} 个死徒灵魂，每收集一个灵魂可以使攻击速度提高{Behavior,CommanderPrestigeAlarakMechBuff,Modificatio... |
| 天罚行者 | `AlarakColossusAerialTracking` | 空域追踪 | - | `HaveColossusChargedBlastAirAttack` | 允许天罚行者攻击空中单位。 |
| 天罚行者 | `AlarakColossusChargedBlastChargeTime` | 快速能量循环 | - | `HaveColossusChargedBlastChargeTime` | 缩短天罚行者充能爆裂弹的充能时间与武器攻击速度。 |
| 晋升者 | `ResearchAlarakHighTemplarPsionicOrbTravelDistancePassive` | 混乱调和 | - | `HaveHighTemplarPsionicOrbTravelDistance` | 灵能球的飞行距离提高25%。 |
| 晋升者 | `AlarakHighTemplarImprovedSacrifice` | 势不可挡 | - | `HaveHighTemplarImprovedSacrifice` | 晋升者的技能伤害永久提高{Behavior,AscendantSacrificeSelfBuff,Modification.DamageDealtFraction[Spell]*100}%，每次使用献祭时其护盾增加{Behavior,AscendantSacrificeSe... |
| 晋升者 | `-` | - | `AscendantSacrificeInstant,Execute` | - | - |
| 无情先锋 | `CommanderPrestigeAlarakMechBuff` | 灵魂之匣 | - | `CommanderPrestigeAlarakMech` | 该单位可以最多收集{Behavior,CommanderPrestigeAlarakMechBuff,MaxPoints} 个死徒灵魂，每收集一个灵魂可以使攻击速度提高{Behavior,CommanderPrestigeAlarakMechBuff,Modificatio... |
| 无情先锋 | `VanguardArmoredDamage` | 聚变迫击炮 | - | `HaveVanguardArmoredDamage` | 提高对重甲单位造成的伤害。 |
| 无情先锋 | `AlarakVanguardIncreaseSplashArea` | 物质散化 | - | `HaveAlarakVanguardIncreaseSplashArea` | 离散光炮的溅射伤害范围扩大{($UpgradeEffectArrayValue:AlarakVanguardIncreaseSplashArea:Effect,ImmortalTaldarimWeaponSearch,AreaArray[0].Radius$/Effect,... |
| 浩劫 | `HavocPermanentCloak` | 隐身模块 | - | `HaveAlarakHavocPermanentCloak` | 使浩劫永久隐形。 |
| 浩劫 | `AlarakTargetLockBuff` | 侦测弱点 | - | `HaveAlarakHavocTargetLockBuff` | 目标锁定的伤害加成额外提高15%。 |
| 浩劫 | `AlarakHavocAbilityRange` | 血水晶共鸣 | - | `HaveAlarakHavocAbilityRange` | 扩大小队视野的范围以及锁定目标和力场的射程。 |
| 浩劫 | `Detector` | 侦测单位 | - | - | 该单位能够侦测到隐形、潜地和幻像单位。 |
| 死徒 | `AlarakACMyLifefortheHighlord` | 献身 | - | - | 死徒是阿拉纳克濒死时首先牺牲自己来为其恢复生命值的单位。 |
| 死徒 | `PHSupplicantShieldArmor` | 鲜血护盾 | - | `HaveSupplicantShieldArmor` | 降低敌人对死徒护盾造成的伤害。 |
| 死徒 | `AlarakSupplicantMaxShields` | 灵魂强化 | - | `HaveAlarakSupplicantMaxShields` | 死徒获得+{Effect,AlarakSupplicantMaxShieldsDisplayDummy,Amount}护盾。 |
| 死徒 | `SupplicantSacrificeCDRLocked` | 高阶领主之怒 | - | `AlarakLevel15` | 该技能将在指挥官等级15时解锁。 |
| 战争棱镜 | `AcquireMove` | 搜索移动 | `move,AcquireMove` | - | 命令选中的单位移至目标区域或跟随目标单位。进行搜索移动的单位不会与敌人交战。 |
| 战争棱镜 | `TaldarimWarpConduit` | 战争配置 | - | - | 加快战争棱镜的变形速度并扩大供能范围。使战争棱镜在运输模式下可以攻击地面和空中单位。 |
| 战争棱镜 | `CommanderPrestigeAlarakMechBuff` | 灵魂之匣 | - | `CommanderPrestigeAlarakMech` | 该单位可以最多收集{Behavior,CommanderPrestigeAlarakMechBuff,MaxPoints} 个死徒灵魂，每收集一个灵魂可以使攻击速度提高{Behavior,CommanderPrestigeAlarakMechBuff,Modificatio... |
| 战争棱镜 | `ACAlarakPhasingMode` | 相位模式 | `PhasingModeTaldarim,Execute` | - | 战争棱镜变形为相位模式，生成一圈类似于水晶塔的能量场。战争棱镜在该模式下不能移动或攻击。 |
| 战争棱镜 | `WarpPrismLoad` | 装载 | `WarpPrismTransport,Load` | - | 将单位装载进折跃棱镜的矩阵距离扩大至{Abil,WarpPrismTransport,Range}。 |
| 战争棱镜 | `WarpPrismUnloadAll` | 全部卸载 | `WarpPrismTransport,UnloadAt` | - | 卸载所有单位。 |
| 追猎者 | `CommanderPrestigeAlarakMechBuff` | 灵魂之匣 | - | `CommanderPrestigeAlarakMech` | 该单位可以最多收集{Behavior,CommanderPrestigeAlarakMechBuff,MaxPoints} 个死徒灵魂，每收集一个灵魂可以使攻击速度提高{Behavior,CommanderPrestigeAlarakMechBuff,Modificatio... |
| 追猎者 | `Blink` | 闪现 | `Blink,Execute` | - | 使追猎者能够闪现到附近的目标位置。该技能{Abil,Blink,Cost[0].Cooldown.TimeUse}秒内只能使用1次。 |
| 追猎者 | `AlarakStalkerPhasingArmor` | 相位护甲 | - | `HaveAlarakStalkerPhasingArmor` | 使杀戮者在受到攻击后的{Behavior,AlarakStalkerPhasingArmorBuff,Duration}秒内不会再受到伤害。该效果每{Behavior,AlarakStalkerPhasingArmor,DamageResponse.Cost.Cooldow... |
| 追猎者 | `-` | - | `BlinkSlayer,Execute` | - | - |

### 进化/形态/切换候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 晋升者 | `ResearchAlarakHighTemplarPsionicOrbTravelDistancePassive` | 混乱调和 | - | `HaveHighTemplarPsionicOrbTravelDistance` | 灵能球的飞行距离提高25%。 |
| 战争棱镜 | `ACAlarakPhasingMode` | 相位模式 | `PhasingModeTaldarim,Execute` | - | 战争棱镜变形为相位模式，生成一圈类似于水晶塔的能量场。战争棱镜在该模式下不能移动或攻击。 |

实现备注：单位自身声明技能、被动、武器、Behavior 和升级后替换关系；科技建筑只触发研究，不在科技建筑内部判断所有兵种 if/else。

## 04. 初始化基地与特殊建筑

Owner：`CommanderBaseInitProfile`、`CommanderOpeningLoadoutProfile`、`CommanderSpecialStructureProfile`、`CommanderInitHookProfile`。

### 初始化建筑候选

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 传送门 | `Gateway` | `Gateway` | Ground; Mechanical; Structure; Melee | 矿:150 气:- 人口:- 生命:500 护盾:500 能量:- | 使星灵可以利用折跃技术召集地面单位。 / 开启： / - 狂热者 |
| 光子炮台 | `PhotonCannon` | `PhotonCannon, Zealot` | Ground; Mechanical; Structure; Melee | 矿:150 气:- 人口:- 生命:150 护盾:150 能量:- | 主力防御建筑。 / 可以对地和对空。 / 侦测单位 |
| 光影议会 | `TwilightCouncil` | `TwilightCouncil` | Ground; Mechanical; Structure; Melee | 矿:150 气:100 人口:- 生命:500 护盾:500 能量:- | 为狂热者、追猎者以及使徒提供升级方案。 |

### 初始化/建造按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 传送门 | `WarpInSupplicant` | 折跃死徒 | `GatewayTrain,Train11` | - | 近战战士。在阿拉纳克濒临死亡时牺牲自己来为他治疗。死徒可以同时折跃两个。 / 可以对地。 |
| 传送门 | `SentryFenix` | 折跃保护者 | `GatewayTrain,Train15` | - | 净化者阵营 / 机械支援单位。可以使用防护场和相位模式。 / 可以对地和对空。 |
| 传送门 | `Stalker` | 折跃追猎者 | `GatewayTrain,Train2` | - | 远程支援型步战机甲。 / 可以对地和对空。 |
| 传送门 | `WarpInAdept` | 折跃使徒 | `GatewayTrain,Train7` | - | 远程特种单位。可以使用灵能传送。 / 可以对地。 |
| 传送门 | `DarkTemplar` | 折跃黑暗圣堂武士 | `GatewayTrain,Train5` | - | 致命的近战杀手，该单位永远处于隐形状态，敌人在不借助侦测单位帮助的情况下无法发现他。可以融合为执政官。 / 可以对地。 |
| 传送门 | `UpgradeToWarpGate` | 变形为折跃门 | `UpgradeToWarpGate,Execute` | - | 将传送门升级为折跃门，使星灵可以利用折跃技术将地面单位召集到任何有水晶塔或折跃棱镜能量覆盖的区域。 |
| 光影议会 | `FenixTalisAdeptLearnBounceShotUpgradeLocked` | 研究衰弱系统 | - | `FenixLevel04` | 该科技将在指挥官等级4时解锁。 |
| 光影议会 | `AdeptResearchPiercingUpgrade` | 研究共鸣之刃 | - | - | 使徒的攻击速度提高45%。 |

实现备注：地图初始化只传 commander、出生点和场景语义；基地、工人、特殊建筑、初始科技和补给由本指挥官 initializer 自己组装。

## 05. 指挥官兵种

Owner：`CommanderRosterProfile`、`CommanderUnitFactoryProfile`、`CommanderUnitReplacementProfile`、`CommanderLevelStageRosterProfile`。

### 当前 units.json 兵种清单

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 天罚行者 | `ColossusTaldarim` | `ColossusTaldarim, Colossus, RoboticsBay, RoboticsFacility` | Unit; FactionTaldarim | 矿:- 气:- 人口:- 生命:- 护盾:- 能量:- | 步战机器人，装备强大的单体攻击武器。能够攀越悬崖。 / 可以对地。 |
| 晋升者 | `HighTemplarTaldarim` | `HighTemplarTaldarim, HighTemplar, TemplarArchive` | Unit; FactionTaldarim | 矿:- 气:- 人口:- 生命:- 护盾:- 能量:- | 强大的灵能运用大师。能够使用灵能球、心灵爆裂和献祭。 / 可以对地。 |
| 无情先锋 | `ImmortalTaldarim` | `ImmortalTaldarim, Immortal, RoboticsFacility` | Unit; FactionTaldarim | 矿:- 气:- 人口:- 生命:- 护盾:- 能量:- | 步战机甲。攻击可对目标敌人周围造成范围性伤害。 / 可以对地。 |
| 浩劫 | `SentryTaldarim` | `Monitor` | Unit; FactionTaldarim | 矿:- 气:- 人口:- 生命:- 护盾:- 能量:0 | 机械支援单位。可以使用目标锁定、小队视野和力场。 / 侦测单位 |
| 死徒 | `Supplicant` | `Supplicant, AlarakSupplicantWarpTrainDummy` | Ground; Biological/Light; Unit; FactionTaldarim | 矿:75 气:- 人口:-2 生命:75 护盾:125 能量:- | 近战战士。在阿拉纳克濒临死亡时牺牲自己来为他治疗。死徒可以同时折跃两个。 / 可以对地。 |
| 战争棱镜 | `WarpPrismTaldarim` | `WarpPrismTaldarim` | Air; Armored/Mechanical/Psionic; Unit; FactionTaldarim | 矿:200 气:- 人口:-2 生命:100 护盾:100 能量:- | 空中运输单位。可以装载或卸载单位。部署后将生成一个能量场。 / 可以对地和对空。 |
| 追猎者 | `Stalker` | `Stalker` | Ground; Armored/Mechanical; Unit; Melee | 矿:125 气:50 人口:-2 生命:80 护盾:80 能量:- | 远程支援型步战机甲。 / 可以对地和对空。 |

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
| 1 | 阿拉纳克自动攻击伤害 | `MasteryAlarakAutoAttackDamage` | `1` | +30 | - |
| 1 | 单位攻击速度 | `MasteryAlarakUnitAttackSpeed` | `0.5` | +15% | - |
| 2 | 供奉我奴仆们持续时间 | `MasteryAlarakEmpowerMeSlavesDuration` | `1` | +30秒 | - |
| 2 | 死亡舰队冷却时间缩短 | `MasteryAlarakDeathFleetCDR` | `4` | -120秒 | - |
| 3 | 建筑超载额外护盾与伤害 | `MasteryAlarakOverchargeShieldsDamage` | `2` | +60% | - |
| 3 | 时空提速效能 | `MasteryAlarakChronoBoost` | `1` | +30% | - |

实现备注：当前默认六项精通全 30 点，不再做官方互斥取舍；若同一字段被多个精通/威望改写，必须进入 `CommanderModifierStackProfile` 明确叠加顺序。

## 07. 指挥官建筑

Owner：`CommanderBuildingProfile`、`CommanderBuildingAbilityProfile`、`CommanderBuildingReplacementProfile`。

### 当前 buildings.json 建筑清单

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 传送门 | `Gateway` | `Gateway` | Ground; Mechanical; Structure; Melee | 矿:150 气:- 人口:- 生命:500 护盾:500 能量:- | 使星灵可以利用折跃技术召集地面单位。 / 开启： / - 狂热者 |
| 光子炮台 | `PhotonCannon` | `PhotonCannon, Zealot` | Ground; Mechanical; Structure; Melee | 矿:150 气:- 人口:- 生命:150 护盾:150 能量:- | 主力防御建筑。 / 可以对地和对空。 / 侦测单位 |
| 光影议会 | `TwilightCouncil` | `TwilightCouncil` | Ground; Mechanical; Structure; Melee | 矿:150 气:100 人口:- 生命:500 护盾:500 能量:- | 为狂热者、追猎者以及使徒提供升级方案。 |

### 建筑按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 传送门 | `WarpInSupplicant` | 折跃死徒 | `GatewayTrain,Train11` | - | 近战战士。在阿拉纳克濒临死亡时牺牲自己来为他治疗。死徒可以同时折跃两个。 / 可以对地。 |
| 传送门 | `SentryFenix` | 折跃保护者 | `GatewayTrain,Train15` | - | 净化者阵营 / 机械支援单位。可以使用防护场和相位模式。 / 可以对地和对空。 |
| 传送门 | `Stalker` | 折跃追猎者 | `GatewayTrain,Train2` | - | 远程支援型步战机甲。 / 可以对地和对空。 |
| 传送门 | `WarpInAdept` | 折跃使徒 | `GatewayTrain,Train7` | - | 远程特种单位。可以使用灵能传送。 / 可以对地。 |
| 传送门 | `WarpinAscendentLocked` | 折跃晋升者 | - | `AlarakLevel08` | 该单位将在指挥官等级8时解锁。 |
| 传送门 | `DarkTemplar` | 折跃黑暗圣堂武士 | `GatewayTrain,Train5` | - | 致命的近战杀手，该单位永远处于隐形状态，敌人在不借助侦测单位帮助的情况下无法发现他。可以融合为执政官。 / 可以对地。 |
| 传送门 | `WarpInDarkArchonLocked` | 折跃黑暗执政官 | - | `VorazunLevel05` | 该技能将在指挥官等级5时解锁。 |
| 传送门 | `UpgradeToWarpGate` | 变形为折跃门 | `UpgradeToWarpGate,Execute` | - | 将传送门升级为折跃门，使星灵可以利用折跃技术将地面单位召集到任何有水晶塔或折跃棱镜能量覆盖的区域。 |
| 传送门 | `AlarakMasteryUnitAttackSpeed` | 战斗精通 | - | `HaveMasteryAlarakUnitAttackSpeed` | 精通：折跃在该建筑旁边的单位获得{Effect,MasteryAlarakUnitAttackSpeedDisplayDummy,Amount}%攻击速度。 |
| 传送门 | `-` | - | `que5notPassive,CancelLast` | - | - |
| 光子炮台 | `KaraxTurretRange` | 强化瞄准 | - | `HaveKaraxTurretRange` | 防御性建筑的射程提高2。 |
| 光子炮台 | `KaraxTurretAttackSpeed` | 军械优化 | - | `HaveKaraxTurretAttackSpeed` | 防御性建筑的攻击速度提高25%。 |
| 光子炮台 | `Detector` | 侦测单位 | - | `NotUnderConstruction` | 该单位能够侦测到隐形、潜地和幻像单位。 |
| 光影议会 | `ArmorResearchSupplicantShieldArmor` | 研究鲜血护盾 | `TwilightCouncilResearch,Research25` | - | 降低敌人对死徒的护盾造成的伤害。 |
| 光影议会 | `ResearchReconstructionLocked` | 研究重构 | - | `KaraxLevel04` | 该科技将在指挥官等级4时解锁。 |
| 光影议会 | `ResearchFenixKaldalisZealotCleaveLocked` | 研究充能利刃 | - | `FenixLevel04` | 该科技将在指挥官等级4时解锁。 |
| 光影议会 | `FenixTalisAdeptLearnBounceShotUpgradeLocked` | 研究衰弱系统 | - | `FenixLevel04` | 该科技将在指挥官等级4时解锁。 |
| 光影议会 | `ResearchDragoonRange` | 研究奇点充能 | `TwilightCouncilResearch,Research6` | - | 龙骑士的射程+2。 |
| 光影议会 | `ResearchWhirlwind` | 研究旋风斩 | `TwilightCouncilResearch,Research3` | - | 使狂热者可以使用旋风斩技能。旋风斩在激活时会对附近所有敌人造成伤害。 |
| 光影议会 | `ResearchReclamationLocked` | 研究回收 | - | `KaraxLevel04` | 该科技将在指挥官等级4时解锁。 |
| 光影议会 | `AdeptResearchPiercingUpgrade` | 研究共鸣之刃 | - | - | 使徒的攻击速度提高45%。 |
| 光影议会 | `ResearchShadowStun` | 研究黑暗缠绕 | `TwilightCouncilResearch,Research9` | - | 使百夫长能击晕附近的敌人，并使他们的护盾值在一小段时间内提高{Behavior,VoidZealotShadowChargeSelfBuff,Modification.VitalMaxArray[Shields]}点。重型单位则会被减速。 |

实现备注：建筑自己的技能、生产队列、变形、起飞/降落、特殊自动施法由建筑 profile 声明；地图和科技建筑不持有跨指挥官判断。

## 08. 科技建筑及其升级选项

Owner：`CommanderTechBuildingProfile`、`CommanderTechOptionProfile`、`CommanderUpgradeEffectProfile`。

### 15 级解锁与研究命令

| 等级 | 名称 | 解锁升级 | 解锁 AbilityCmd | 说明 |
|---|---|---|---|---|
| 1 | 吸收灵魂 | - | - | 附近有敌方单位死亡时，阿拉纳克可以治疗自己，每一点单位补给为其恢复20点生命值和20点护盾。 / 阿拉纳克频临死亡时，他可以从附近你控制的单位身上窃取生命值。该技能没有冷却时间。 |
| 2 | 强化超载 | `AlarakStructureImprovedOvercharge` | - | 建筑超载现在可以激活一层屏障，吸收最多400点伤害。 |
| 3 | 进攻战术 | `AlarakImprovedDeadlyCharge` | - | 阿拉纳克的致命冲锋射程提高3，冷却时间缩短5秒。 |
| 4 | 死亡议会升级包 | - | `TwilightCouncilResearch:17`, `TwilightCouncilResearch:20` | 在死亡议会中解锁以下升级： / 死徒的护盾+25点。杀戮者在受到伤害后，短时间内处于无敌状态。 |
| 5 | 供奉我 | - | `AlarakEmpower:` | 解锁阿拉纳克的供奉我技能，附近每有一个友方单位都会使他的攻击以及技能伤害提高，持续20秒。 |
| 6 | 机械研究所升级包 | - | `RoboticsBayResearch:14`, `RoboticsBayResearch:16` | 在机械研究所中解锁以下升级： / 先锋的溅射伤害范围扩大50%。提高天罚行者的攻击速度。 |
| 7 | 闪电奔涌 | `AlarakSupplicantSacrificeLightningStrikes` | - | 献祭一名死徒使阿拉纳克的下一次致命冲锋可以对主要目标附近的4名敌人造成额外50点伤害。 |
| 8 | 新单位：晋升者 | - | - | 强大的灵能运用大师。可以使用灵能球、心灵爆裂和献祭。 / 可以对地。 |
| 9 | 浩劫升级包 | - | `TwilightCouncilResearch:21`, `TwilightCouncilResearch:18` | 在控制芯核中解锁以下升级： / 目标锁定的伤害加成额外提高15%。扩大小队视野的范围，以及目标锁定和力场的射程。 |
| 10 | 召唤死亡舰队 | - | `AlarakACSummonDeathfleetTarget:` | 解锁折跃限时的塔达林母舰和毁灭者护卫的能力。通过顶部面板来召唤死亡舰队。 |
| 11 | 超强能量 | `AlarakAreaDamageUpgrade` | - | 供奉我激活时，阿拉纳克的攻击造成范围伤害。 |
| 12 | 晋升者升级包 | - | `TemplarArchivesResearch:7`, `TemplarArchivesResearch:8` | 在晋升者文献馆中解锁以下升级： / 提高晋升者灵能球的飞行距离。献祭为晋升者提供可叠加的永久护盾和技能伤害加成。 |
| 13 | 炽热天空 | `AlarakImprovedDeathFleet` | - | 解锁母舰的热能射线枪技能，并且在召唤死亡舰队时额外折跃4艘毁灭者。 |
| 14 | 阿拉纳克升级包 | - | - | 在锻炉中解锁以下升级： / 使阿拉纳克的普通攻击能够击晕敌人及减速英雄单位，持续2秒。湮灭波的击退距离提高100%。 |
| 15 | 高阶领主之怒 | `AlarakSupplicantSacrificeCDR` | - | 每当有一个死徒被献祭，阿拉纳克致命冲锋的冷却时间缩短10秒，湮灭波的冷却时间缩短5秒。 |

### Upgrade 摘要

| Upgrade | 父级 | 显示名 | Effect数 | 说明 |
|---|---|---|---|---|
| `AlarakAreaDamageUpgrade` | `-` | 阿拉纳克范围伤害升级 | 0 | 供奉我激活时，阿拉纳克的攻击造成范围伤害。 |
| `AlarakCommander` | `-` | 阿拉纳克 | 45 | - |
| `AlarakImprovedDeadlyCharge` | `-` | 阿拉纳克强化致命冲锋 | 4 | - |
| `AlarakImprovedDeathFleet` | `-` | 阿拉纳克强化死亡舰队 | 3 | - |
| `AlarakStructureImprovedOvercharge` | `-` | 阿拉纳克建筑强化超载 | 0 | - |
| `AlarakSupplicantSacrificeCDR` | `-` | 阿拉纳克死徒献祭冷却时间缩短 | 0 | 每当一个死徒被献祭，阿拉纳克的致命冲锋的冷却时间缩短{(Effect,AlarakSupplicantSacrificeCDR_A,Cost.Cooldown.TimeUse)*(-1)}秒，湮灭波的冷却时间缩短{(Effect,AlarakSupplicantSacrif... |
| `AlarakSupplicantSacrificeLightningStrikes` | `-` | - | 0 | - |
| `CommanderPrestigeAlarakDeathFleet` | `CommanderPrestige` | 死亡阴影 | 10 | 优点 / 召唤死亡舰队永久持续并且没有初始冷却时间。母舰可以建造毁灭者。 / 缺点 / 召唤死亡舰队时不再召唤毁灭者。母舰和毁灭者现在消耗资源和补给。群体传送现在有60秒的冷却时间并且不再能够传送友方单位。 |
| `CommanderPrestigeAlarakDeathFleetPerk` | `CommanderPrestige` | - | 1 | - |
| `CommanderPrestigeAlarakEmpowerMe` | `CommanderPrestige` | 暴君晋升者 | 1 | 优点 / 供奉我的冷却时间缩短50%。 / 缺点 / 死亡舰队不可用。 |
| `CommanderPrestigeAlarakMech` | `CommanderPrestige` | 灵魂巧匠 | 5 | 优点 / 当一名死徒死亡时，会增加阿拉纳克身边其中一个非英雄机械战斗单位的伤害和攻击速度。 / 缺点 / 致命冲锋和湮灭波的伤害降低50%。 |
| `HaveMonitor` | `-` | - | 0 | - |
| `MasteryAlarakAutoAttackDamage` | `-` | 精通 阿拉纳克自动攻击伤害 | 4 | 提高阿拉纳克的攻击伤害。 |
| `MasteryAlarakChronoBoost` | `-` | 专精阿拉纳克时空提速 | 8 | - |
| `MasteryAlarakDeathFleetCDR` | `-` | 精通 阿拉纳克死亡舰队冷却时间缩短 | 2 | 缩短召唤死亡舰队技能的冷却时间。不会影响任务刚开始时的初始冷却时间。 |
| `MasteryAlarakEmpowerMeSlavesDuration` | `-` | 精通阿拉纳克供奉我奴仆们持续时间 | 2 | 延长供奉我的持续时间。 |
| `MasteryAlarakOverchargeShieldsDamage` | `-` | 精通 阿拉纳克超载护盾与伤害 | 5 | 提高建筑超载的伤害吸收及其临时武器的攻击速度。 |
| `MasteryAlarakUnitAttackSpeed` | `-` | 精通 阿拉纳克单位攻击速度 | 8 | 提高阿拉纳克的战斗单位的攻击速度。 |
| `VoidRayBeamCanCharge` | `-` | - | 0 | - |

### 研究/升级按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 传送门 | `UpgradeToWarpGate` | 变形为折跃门 | `UpgradeToWarpGate,Execute` | - | 将传送门升级为折跃门，使星灵可以利用折跃技术将地面单位召集到任何有水晶塔或折跃棱镜能量覆盖的区域。 |
| 晋升者 | `ResearchAlarakHighTemplarPsionicOrbTravelDistancePassive` | 混乱调和 | - | `HaveHighTemplarPsionicOrbTravelDistance` | 灵能球的飞行距离提高25%。 |
| 无情先锋 | `AlarakVanguardIncreaseSplashArea` | 物质散化 | - | `HaveAlarakVanguardIncreaseSplashArea` | 离散光炮的溅射伤害范围扩大{($UpgradeEffectArrayValue:AlarakVanguardIncreaseSplashArea:Effect,ImmortalTaldarimWeaponSearch,AreaArray[0].Radius$/Effect,... |
| 光影议会 | `ArmorResearchSupplicantShieldArmor` | 研究鲜血护盾 | `TwilightCouncilResearch,Research25` | - | 降低敌人对死徒的护盾造成的伤害。 |
| 光影议会 | `ResearchReconstructionLocked` | 研究重构 | - | `KaraxLevel04` | 该科技将在指挥官等级4时解锁。 |
| 光影议会 | `ResearchFenixKaldalisZealotCleaveLocked` | 研究充能利刃 | - | `FenixLevel04` | 该科技将在指挥官等级4时解锁。 |
| 光影议会 | `FenixTalisAdeptLearnBounceShotUpgradeLocked` | 研究衰弱系统 | - | `FenixLevel04` | 该科技将在指挥官等级4时解锁。 |
| 光影议会 | `ResearchDragoonRange` | 研究奇点充能 | `TwilightCouncilResearch,Research6` | - | 龙骑士的射程+2。 |
| 光影议会 | `ResearchWhirlwind` | 研究旋风斩 | `TwilightCouncilResearch,Research3` | - | 使狂热者可以使用旋风斩技能。旋风斩在激活时会对附近所有敌人造成伤害。 |
| 光影议会 | `ResearchReclamationLocked` | 研究回收 | - | `KaraxLevel04` | 该科技将在指挥官等级4时解锁。 |
| 光影议会 | `AdeptResearchPiercingUpgrade` | 研究共鸣之刃 | - | - | 使徒的攻击速度提高45%。 |
| 光影议会 | `ResearchShadowStun` | 研究黑暗缠绕 | `TwilightCouncilResearch,Research9` | - | 使百夫长能击晕附近的敌人，并使他们的护盾值在一小段时间内提高{Behavior,VoidZealotShadowChargeSelfBuff,Modification.VitalMaxArray[Shields]}点。重型单位则会被减速。 |

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
| `cargo_light` | Supplicant x6, Stalker x2 | 救援/前锋 | 死徒作为消耗前排，追猎者补机动火力。 | 设计草案；需按原始mod地图流程和实机日志继续校验。 |
| `cargo_heavy` | Supplicant x4, ImmortalTaldarim x2, HighTemplarTaldarim x2 | 重型推进 | 无情先锋抗重甲，晋升者作为高价值施法位。 | 设计草案；需按原始mod地图流程和实机日志继续校验。 |
| `cargo_air` | WarpPrismTaldarim x1, Stalker x4 | 折跃支援 | 阿拉纳克没有标准空军，空中场景用战争棱镜投送地面单位。 | 设计草案；需按原始mod地图流程和实机日志继续校验。 |
| `bonus_reward` | ColossusTaldarim x2, HighTemplarTaldarim x2 | 奖励火力 | 天罚行者和晋升者用于奖励支援，不做常规轻型运输。 | 设计草案；需按原始mod地图流程和实机日志继续校验。 |
| `replacement_squad` | Supplicant x8, HighTemplarTaldarim x2 | 牺牲链小队 | 为献祭/晋升者机制留空间。 | 设计草案；需按原始mod地图流程和实机日志继续校验。 |

### 接入规则

- 本模块不再从 `command_cards.json` 的运输/空投按钮自动推导货舱单位，也不把 `units.json` 全量清单当成可投放单位。
- 地图只传入 `mapId`、`scenarioKind`、目标点和运输模式；单位组合由 `CommanderCargoLoadoutProfile` 根据当前 commander、15 级 `power_fusion` roster 和场景限制解析。
- `原始mod` 已有运输机、空投舱、狮鹫运输、医疗运输机、坑道/深挖或感染运输容器时，应优先保留它的流程语义，只把硬编码单位替换为 profile 查询结果。
- 英雄、首领、终极进化、战列巡航舰、航母等高价值单位默认只能用于 `bonus_reward` 或显式允许英雄的地图场景。
实现备注：`CommanderMapDropProfile` 负责把地图事件映射为 `scenarioKind`；`CommanderScenarioFallbackProfile` 负责缺项降级并输出 `[XM_DBG][WARN][CARGO_FALLBACK]`。

## 10. 指挥官特殊机制

Owner：`CommanderSpecialMechanicProfile`、`CommanderSpecialResourceProfile`、`CommanderSpecialMechanicHookProfile`、`CommanderSpecialMechanicUnitProfile`。

本指挥官重点：献祭、死亡舰队、升格者能量体系和阿拉纳克英雄链。

### 特殊机制命中项

- 吸收灵魂 (Alarak)
- 强化超载 (AlarakImprovedOvercharge)
- 进攻战术 (AlarakImprovedDeadlyCharge)
- 死亡议会升级包 (AlarakTwilightCouncilUpgradesPack)
- 供奉我 (AlarakEmpowerMeSlaves)
- 机械研究所升级包 (AlarakRoboticsBayUpgradesPack)
- 闪电奔涌 (AlarakLightningStrikes)
- 新单位：晋升者 (AlarakUnlockAscendant)
- 浩劫升级包 (AlarakHavocUpgradesPack)
- 召唤死亡舰队 (AlarakDeathFleet)
- 超强能量 (AlarakAreaDamageUpgrade)
- 晋升者升级包 (AlarakTemplarArchivesUpgradesPack)
- 炽热天空 (AlarakImprovedDeathFleet)
- 阿拉纳克升级包 (AlarakPHLevel14)
- 高阶领主之怒 (AlarakSupplicantSacrificeCDR)

### 特殊机制 Upgrade 候选

- 阿拉纳克范围伤害升级 (`AlarakAreaDamageUpgrade`)
- 阿拉纳克 (`AlarakCommander`)
- 阿拉纳克强化致命冲锋 (`AlarakImprovedDeadlyCharge`)
- 阿拉纳克强化死亡舰队 (`AlarakImprovedDeathFleet`)
- 阿拉纳克建筑强化超载 (`AlarakStructureImprovedOvercharge`)
- 阿拉纳克死徒献祭冷却时间缩短 (`AlarakSupplicantSacrificeCDR`)
- AlarakSupplicantSacrificeLightningStrikes (`AlarakSupplicantSacrificeLightningStrikes`)
- 死亡阴影 (`CommanderPrestigeAlarakDeathFleet`)
- CommanderPrestigeAlarakDeathFleetPerk (`CommanderPrestigeAlarakDeathFleetPerk`)
- 暴君晋升者 (`CommanderPrestigeAlarakEmpowerMe`)
- 灵魂巧匠 (`CommanderPrestigeAlarakMech`)
- 精通 阿拉纳克自动攻击伤害 (`MasteryAlarakAutoAttackDamage`)
- 专精阿拉纳克时空提速 (`MasteryAlarakChronoBoost`)
- 精通 阿拉纳克死亡舰队冷却时间缩短 (`MasteryAlarakDeathFleetCDR`)
- 精通阿拉纳克供奉我奴仆们持续时间 (`MasteryAlarakEmpowerMeSlavesDuration`)
- 精通 阿拉纳克超载护盾与伤害 (`MasteryAlarakOverchargeShieldsDamage`)
- 精通 阿拉纳克单位攻击速度 (`MasteryAlarakUnitAttackSpeed`)

### 特殊机制按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 天罚行者 | `CommanderPrestigeAlarakMechBuff` | 灵魂之匣 | - | `CommanderPrestigeAlarakMech` | 该单位可以最多收集{Behavior,CommanderPrestigeAlarakMechBuff,MaxPoints} 个死徒灵魂，每收集一个灵魂可以使攻击速度提高{Behavior,CommanderPrestigeAlarakMechBuff,Modificatio... |
| 天罚行者 | `AlarakColossusAerialTracking` | 空域追踪 | - | `HaveColossusChargedBlastAirAttack` | 允许天罚行者攻击空中单位。 |
| 天罚行者 | `AlarakColossusChargedBlastChargeTime` | 快速能量循环 | - | `HaveColossusChargedBlastChargeTime` | 缩短天罚行者充能爆裂弹的充能时间与武器攻击速度。 |
| 传送门 | `WarpinAscendentLocked` | 折跃晋升者 | - | `AlarakLevel08` | 该单位将在指挥官等级8时解锁。 |
| 传送门 | `AlarakMasteryUnitAttackSpeed` | 战斗精通 | - | `HaveMasteryAlarakUnitAttackSpeed` | 精通：折跃在该建筑旁边的单位获得{Effect,MasteryAlarakUnitAttackSpeedDisplayDummy,Amount}%攻击速度。 |
| 晋升者 | `ResearchAlarakHighTemplarPsionicOrbTravelDistancePassive` | 混乱调和 | - | `HaveHighTemplarPsionicOrbTravelDistance` | 灵能球的飞行距离提高25%。 |
| 晋升者 | `AlarakHighTemplarImprovedSacrifice` | 势不可挡 | - | `HaveHighTemplarImprovedSacrifice` | 晋升者的技能伤害永久提高{Behavior,AscendantSacrificeSelfBuff,Modification.DamageDealtFraction[Spell]*100}%，每次使用献祭时其护盾增加{Behavior,AscendantSacrificeSe... |
| 晋升者 | `-` | - | `AscendantSacrificeInstant,Execute` | - | - |
| 无情先锋 | `CommanderPrestigeAlarakMechBuff` | 灵魂之匣 | - | `CommanderPrestigeAlarakMech` | 该单位可以最多收集{Behavior,CommanderPrestigeAlarakMechBuff,MaxPoints} 个死徒灵魂，每收集一个灵魂可以使攻击速度提高{Behavior,CommanderPrestigeAlarakMechBuff,Modificatio... |
| 无情先锋 | `AlarakVanguardIncreaseSplashArea` | 物质散化 | - | `HaveAlarakVanguardIncreaseSplashArea` | 离散光炮的溅射伤害范围扩大{($UpgradeEffectArrayValue:AlarakVanguardIncreaseSplashArea:Effect,ImmortalTaldarimWeaponSearch,AreaArray[0].Radius$/Effect,... |
| 浩劫 | `HavocPermanentCloak` | 隐身模块 | - | `HaveAlarakHavocPermanentCloak` | 使浩劫永久隐形。 |
| 浩劫 | `AlarakTargetLockBuff` | 侦测弱点 | - | `HaveAlarakHavocTargetLockBuff` | 目标锁定的伤害加成额外提高15%。 |
| 浩劫 | `AlarakHavocAbilityRange` | 血水晶共鸣 | - | `HaveAlarakHavocAbilityRange` | 扩大小队视野的范围以及锁定目标和力场的射程。 |
| 死徒 | `AlarakACMyLifefortheHighlord` | 献身 | - | - | 死徒是阿拉纳克濒死时首先牺牲自己来为其恢复生命值的单位。 |
| 死徒 | `AlarakSupplicantMaxShields` | 灵魂强化 | - | `HaveAlarakSupplicantMaxShields` | 死徒获得+{Effect,AlarakSupplicantMaxShieldsDisplayDummy,Amount}护盾。 |
| 死徒 | `SupplicantSacrificeCDRLocked` | 高阶领主之怒 | - | `AlarakLevel15` | 该技能将在指挥官等级15时解锁。 |
| 战争棱镜 | `CommanderPrestigeAlarakMechBuff` | 灵魂之匣 | - | `CommanderPrestigeAlarakMech` | 该单位可以最多收集{Behavior,CommanderPrestigeAlarakMechBuff,MaxPoints} 个死徒灵魂，每收集一个灵魂可以使攻击速度提高{Behavior,CommanderPrestigeAlarakMechBuff,Modificatio... |
| 战争棱镜 | `ACAlarakPhasingMode` | 相位模式 | `PhasingModeTaldarim,Execute` | - | 战争棱镜变形为相位模式，生成一圈类似于水晶塔的能量场。战争棱镜在该模式下不能移动或攻击。 |
| 追猎者 | `CommanderPrestigeAlarakMechBuff` | 灵魂之匣 | - | `CommanderPrestigeAlarakMech` | 该单位可以最多收集{Behavior,CommanderPrestigeAlarakMechBuff,MaxPoints} 个死徒灵魂，每收集一个灵魂可以使攻击速度提高{Behavior,CommanderPrestigeAlarakMechBuff,Modificatio... |
| 追猎者 | `AlarakStalkerPhasingArmor` | 相位护甲 | - | `HaveAlarakStalkerPhasingArmor` | 使杀戮者在受到攻击后的{Behavior,AlarakStalkerPhasingArmorBuff,Duration}秒内不会再受到伤害。该效果每{Behavior,AlarakStalkerPhasingArmor,DamageResponse.Cost.Cooldow... |

实现备注：凡是涉及局内状态、资源、堆叠、全局计时器、隐藏 caster、英雄成长或召唤首领的机制，都必须有 runtime hook 和 `[XM_DBG]` 日志。

## 11. 指挥官个性化机制

Owner：`CommanderPersonalMechanicProfile`、`CommanderPersonalMechanicEffectProfile`、`CommanderPersonalMechanicHookProfile`、`CommanderPersonalMechanicRequirementProfile`。

本指挥官重点：阿拉纳克本体、献祭和升格者牺牲链要独立于地图初始化。

### 威望正向融合输入

| 威望 ID | 名称 | Primary Upgrade | 禁用单位 | 启用单位 | 禁用 Ability | 补充 Upgrade |
|---|---|---|---|---|---|---|
| `CommanderPrestigeAlarakMech` | - | `CommanderPrestigeAlarakMech` | - | - | - | - |
| `CommanderPrestigeAlarakEmpowerMe` | - | `CommanderPrestigeAlarakEmpowerMe` | - | - | `AlarakACSummonDeathfleetTarget:` | - |
| `CommanderPrestigeAlarakDeathFleet` | - | `CommanderPrestigeAlarakDeathFleet` | - | - | - | `AlarakDeathFleet2` |

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
[XM_DBG][INFO][COMMANDER_PROFILE_LOAD] commander=Alarak levelMode=FullLevel15 masteryMode=AllSixMax rosterStage=power_fusion result=ok
[XM_DBG][INFO][POWER_FUSION_APPLY] commander=Alarak levelMode=FullLevel15 masteryMode=AllSixMax prestigeMode=SelectedPositive result=ok
[XM_DBG][INFO][ROSTER_LOAD] commander=Alarak stage=power_fusion units=7 buildings=3 heroes=0 result=ok
[XM_DBG][INFO][HERO_PROFILE_LOAD] commander=Alarak heroes=0 result=ok
[XM_DBG][INFO][MODULE_VERIFY] commander=Alarak module=<01-11> profile=<profile> result=ok
[XM_DBG][WARN][CASC_AUDIT_REQUIRED] commander=Alarak module=<module> object=<object> result=needs-casc-audit
```

## 第一轮待审计项

- 顶部技能的 caster、按钮、冷却、充能、目标转发闭包。
- 英雄或特殊英雄的 Unit、Ability、Behavior、Weapon、Actor、Sound、复活/重生闭包。
- `power_fusion` 最终 roster 与 `level15` roster 的新增、替换、变体关系。
- 6 项精通的真实作用对象和最终数值。
- 3 个威望的正面收益、负面代价、disable/suppress、费用/冷却/上限变化。
- 科技建筑研究按钮、Requirement、Upgrade effect 是否完整。
- 特殊机制、英雄成长和个性化机制是否需要 runtime hook。
