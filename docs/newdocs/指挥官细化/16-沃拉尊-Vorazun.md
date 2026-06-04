# 沃拉尊（Vorazun）指挥官细化

日期：2026-05-27

## 当前口径

本文件统一按满级 `power_fusion` 口径编写：正文只讨论满级指挥官的最终态，不再把 1 级与 15 级拆成两套玩法态；等级 1-15 只保留为解锁门槛和审计锚点。精通默认 6 项全部 30 点，三个威望按正收益融合展开，不直接启用官方 `PlayerPrestige`。`initial` 仅用于官方基础状态审计和差异对照，默认测试和玩法都看 `power_fusion` 最终状态。

本文件按 `docs/newdocs/模块拆分` 的 11 个模块整理 沃拉尊。依据 `游戏数据/官方合作指挥官/commanders/Vorazun/` 的当前 JSON 生成；具体 Ability、Behavior、Weapon、Actor、Effect、Requirement 闭包仍需继续追 `游戏数据/官方SC2原始文本镜像/` 或实机 `[XM_DBG]` 日志。

## 链路提醒

- 沃拉尊当前官方正向建筑是 `Gateway`、`PhotonCannon`、`TwilightCouncil`；不要把共享传送门里的死徒、保护者、菲尼克斯/阿拉纳克/凯拉克斯锁定按钮当作沃拉尊生产链。
- 沃拉尊正向兵种按 `DarkTemplarShakuras`、`Oracle`、`PhoenixShakuras`、`Zealot`、`ZealotShakuras`、`Stalker`、`VoidRay` 过滤。
- 沃拉尊的暗影系升级可以从 `Vorazun*`、`DarkTemplar*`、`DarkShrineResearch` 继续追；`AlarakStalkerPhasingArmor`、`KaraxTurret*`、`Fenix*` 这类跨指挥官命中只能作为共享污染待审计项。

## 官方数据摘要

| 项 | 值 |
|---|---|
| CommanderId | `ProtossVorazun` |
| 中文名 | 沃拉尊 |
| 默认升级 | `VorazunCommander`, `SOARecall`, `VoidPylonRecall` |
| 默认能力命令 | `CyberneticsCoreResearch:6` |
| 威望 ID | `CommanderPrestigeVorazunEmergencyRecall`, `CommanderPrestigeVorazunStasis`, `CommanderPrestigeVorazunTimeStop` |
| heroes.json 数量 | 0 |
| roster.json 数量 | 10 |
| units.json 数量 | 7 |
| buildings.json 数量 | 3 |
| command_cards.json 对象数 | 9 |
| upgrades.json 数量 | 26 |
| other-tech-entries.json 数量 | 0 |
| source | `mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/userdata.xml` |

roster 样例：

```text
DarkTemplarShakuras, Gateway, Oracle, PhoenixShakuras, PhotonCannon, TwilightCouncil, Zealot, ZealotShakuras, Stalker, VoidRay
```

## 15 级解锁摘要

- 1: 亚顿之影
- 2: 亚顿之矛：轨道吸纳舱
- 3: 暗影军团
- 4: 光影议会升级包
- 5: 新单位：黑暗执政官
- 6: 黑暗圣堂武士升级包
- 7: 暗影之幕
- 8: 亚顿之矛：事件视界
- 9: 黑暗执政官升级包
- 10: 亚顿之矛：时间停止
- 11: 黑暗水晶塔：召回
- 12: 舰队航标升级包
- 13: 黑暗圣堂武士召回
- 14: 亚顿之矛：时空理论
- 15: 阴影黯灭

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
| 默认能力 | - | CyberneticsCoreResearch:6 | - | 来自 commander.json |
| Lv4 光影议会升级包 | 4 | TwilightCouncilResearch:4 | `VorazunUnlockCenturion`, `VoidZealotShadowCharge` | 将沃拉尊的狂热者升级为百夫长。 / 在光影议会中解锁新的研究项目： / 百夫长进入短暂隐形状态，冲锋时可以穿过其它单位。使百夫长可以击晕周围的敌人。追猎者的闪现技能可以使其隐形并持续恢复护盾值。 |
| Lv4 光影议会升级包 | 4 | BlinkShieldRestore: | `VorazunUnlockCenturion`, `VoidZealotShadowCharge` | 将沃拉尊的狂热者升级为百夫长。 / 在光影议会中解锁新的研究项目： / 百夫长进入短暂隐形状态，冲锋时可以穿过其它单位。使百夫长可以击晕周围的敌人。追猎者的闪现技能可以使其隐形并持续恢复护盾值。 |
| Lv4 光影议会升级包 | 4 | TwilightCouncilResearch:7 | `VorazunUnlockCenturion`, `VoidZealotShadowCharge` | 将沃拉尊的狂热者升级为百夫长。 / 在光影议会中解锁新的研究项目： / 百夫长进入短暂隐形状态，冲锋时可以穿过其它单位。使百夫长可以击晕周围的敌人。追猎者的闪现技能可以使其隐形并持续恢复护盾值。 |
| Lv4 光影议会升级包 | 4 | TwilightCouncilResearch:8 | `VorazunUnlockCenturion`, `VoidZealotShadowCharge` | 将沃拉尊的狂热者升级为百夫长。 / 在光影议会中解锁新的研究项目： / 百夫长进入短暂隐形状态，冲锋时可以穿过其它单位。使百夫长可以击晕周围的敌人。追猎者的闪现技能可以使其隐形并持续恢复护盾值。 |
| Lv6 黑暗圣堂武士升级包 | 6 | DarkTemplarVoidStasis: | `VorazunDarkTemplarRecallPassiveButtonDisplayUpgrade` | 在黑暗圣坛中解锁新的研究项目： / 使黑暗圣堂武士能传送到附近位置。使黑暗圣堂武士获得瘫痪其它单位的能力，目标单位将在10秒内无法攻击或被攻击。 |
| Lv6 黑暗圣堂武士升级包 | 6 | DarkShrineResearch:1 | `VorazunDarkTemplarRecallPassiveButtonDisplayUpgrade` | 在黑暗圣坛中解锁新的研究项目： / 使黑暗圣堂武士能传送到附近位置。使黑暗圣堂武士获得瘫痪其它单位的能力，目标单位将在10秒内无法攻击或被攻击。 |
| Lv6 黑暗圣堂武士升级包 | 6 | DarkTemplarShadowDash: | `VorazunDarkTemplarRecallPassiveButtonDisplayUpgrade` | 在黑暗圣坛中解锁新的研究项目： / 使黑暗圣堂武士能传送到附近位置。使黑暗圣堂武士获得瘫痪其它单位的能力，目标单位将在10秒内无法攻击或被攻击。 |
| Lv6 黑暗圣堂武士升级包 | 6 | DarkShrineResearch:5 | `VorazunDarkTemplarRecallPassiveButtonDisplayUpgrade` | 在黑暗圣坛中解锁新的研究项目： / 使黑暗圣堂武士能传送到附近位置。使黑暗圣堂武士获得瘫痪其它单位的能力，目标单位将在10秒内无法攻击或被攻击。 |
| Lv9 黑暗执政官升级包 | 9 | DarkArchonMindControl: | - | 在黑暗圣坛中解锁以下升级： / 黑暗执政官初始就拥有100%的能量。使黑暗执政官可以永久控制一个目标。 |
| Lv9 黑暗执政官升级包 | 9 | DarkShrineResearch:3 | - | 在黑暗圣坛中解锁以下升级： / 黑暗执政官初始就拥有100%的能量。使黑暗执政官可以永久控制一个目标。 |
| Lv9 黑暗执政官升级包 | 9 | DarkShrineResearch:4 | - | 在黑暗圣坛中解锁以下升级： / 黑暗执政官初始就拥有100%的能量。使黑暗执政官可以永久控制一个目标。 |
| Lv10 亚顿之矛：时间停止 | 10 | SOATimeFreeze: | `SOATimeFreeze` | 解锁时间停止技能，可以将所有敌人冻结在原地20秒。该技能位于顶部面板上。 |
| Lv11 黑暗水晶塔：召回 | 11 | DarkPylonRecall: | - | 黑暗水晶塔获得将友方单位召回到它们所在位置的能力。 |
| Lv12 舰队航标升级包 | 12 | FleetBeaconResearch:12 | - | 在舰队航标中解锁新的研究项目： / 使所有的海盗船和先知永久隐形。提高虚空辉光舰持续攻击时的武器射程。被先知的静滞结界影响的敌人现在可以被攻击了。 |
| Lv12 舰队航标升级包 | 12 | FleetBeaconResearch:14 | - | 在舰队航标中解锁新的研究项目： / 使所有的海盗船和先知永久隐形。提高虚空辉光舰持续攻击时的武器射程。被先知的静滞结界影响的敌人现在可以被攻击了。 |
| Lv12 舰队航标升级包 | 12 | FleetBeaconResearch:15 | - | 在舰队航标中解锁新的研究项目： / 使所有的海盗船和先知永久隐形。提高虚空辉光舰持续攻击时的武器射程。被先知的静滞结界影响的敌人现在可以被攻击了。 |

### command card 命中

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 先知 | `OracleBuildStasisTrap` | 静滞结界 | `OracleStasisTrapBuild,Build1` | - | 在目标位置放置一个持续{Behavior,StasisWardTimedLife,Duration}秒的隐形静滞结界。一旦被敌方地面单位触发后，该结界将使附近的敌人陷入静滞，持续{Behavior,OracleStasisTrapTarget,Duration}秒。被困单位... |
| 狂热者 | `Charge` | 冲锋 | `Charge,Execute` | - | 允许狂热者能拦截附近的敌人。同时还会提高狂热者的移动速度。该技能每{Abil,Charge,Cost.Cooldown.TimeUse}秒最多只能使用一次。 |
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
| - | - | - | - | 未自动命中英雄相关等级解锁；需要从官方原始文本镜像或实机日志补。 |

口径：官方 heroes.json 暂无条目；若官方玩法存在隐藏英雄或召唤英雄，继续用官方原始文本镜像/实机日志补。

待审计：Hero Unit、Ability、Behavior、Weapon、Actor、Sound、复活/重生、能量/资源、形态切换和威望改写闭包。

## 03. 普通单位技能及其进化功能

Owner：`CommanderUnitAbilityProfile`、`CommanderUnitStatProfile`、`CommanderUnitEvolutionProfile`、`CommanderUnitBehaviorProfile`、`CommanderUnitWeaponProfile`。

### 单位技能按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 黑暗圣堂武士 | `-` | - | `DarkTemplarShadowFury,Execute` | - | - |
| 黑暗圣堂武士 | `VoidDarkTemplarShadowFury` | VoidDarkTemplarShadowFury | `DarkTemplarShadowFury,Execute` | - | - |
| 黑暗圣堂武士 | `ShadowDashLocked` | 闪现 | - | `VorazunLevel06` | 该技能将在指挥官等级6时解锁。 |
| 黑暗圣堂武士 | `VoidStasisLocked` | 虚空静滞 | - | `VorazunLevel06` | 该技能将在指挥官等级6时解锁。 |
| 黑暗圣堂武士 | `DarkTemplarShadowDash` | 闪现 | `DarkTemplarShadowDash,Execute` | - | 传送到附近的目标区域。 |
| 先知 | `AcquireMove` | 搜索移动 | `move,AcquireMove` | - | 命令选中的单位移至目标区域或跟随目标单位。进行搜索移动的单位不会与敌人交战。 |
| 先知 | `OracleRevelation` | 天启 | `OracleRevelation,Execute` | - | 使目标区域内的单位和建筑获得视野，持续{Behavior,OracleRevelation,Duration}秒。显示隐形或潜地的单位和建筑。 |
| 先知 | `OracleBuildStasisTrap` | 静滞结界 | `OracleStasisTrapBuild,Build1` | - | 在目标位置放置一个持续{Behavior,StasisWardTimedLife,Duration}秒的隐形静滞结界。一旦被敌方地面单位触发后，该结界将使附近的敌人陷入静滞，持续{Behavior,OracleStasisTrapTarget,Duration}秒。被困单位... |
| 先知 | `OracleWeaponOn` | 激活脉冲光线 | `OracleWeapon,On` | - | 为先知的脉冲光线充能，使其能够攻击敌方地面单位。 / 每秒消耗{-1 * (Behavior,OracleWeapon,Modification.VitalRegenArray[2] + Unit,Oracle,EnergyRegenRate)}点能量值。 |
| 先知 | `HaveOracleStasisWardUpgrade` | 静滞校正 | - | `HaveOracleStasisWardUpgrade` | 被先知的静滞结界影响的单位将可以被攻击。 |
| 先知 | `PermanentlyCloakedOracle` | 永久隐形 | - | `HaveCorsairPermanentCloak` | 该先知处于永久隐形状态。 |
| 先知 | `-` | - | - | - | - |
| 海盗船 | `CorsairMPDisruptionWeb` | 干扰网 | `CorsairMPDisruptionWeb,Execute` | - | - |
| 海盗船 | `PermanentlyCloakedCorsair` | 永久隐形 | - | `HaveCorsairPermanentCloak` | 海盗船永久隐形。 |
| 狂热者 | `Charge` | 冲锋 | `Charge,Execute` | - | 允许狂热者能拦截附近的敌人。同时还会提高狂热者的移动速度。该技能每{Abil,Charge,Cost.Cooldown.TimeUse}秒最多只能使用一次。 |
| 狂热者 | `WhirlwindLocked` | 旋风斩 | - | `ArtanisLevel04` | 该技能将在指挥官等级4时解锁。 |
| 追猎者 | `CommanderPrestigeAlarakMechBuff` | 灵魂之匣 | - | `CommanderPrestigeAlarakMech` | 该单位可以最多收集{Behavior,CommanderPrestigeAlarakMechBuff,MaxPoints} 个死徒灵魂，每收集一个灵魂可以使攻击速度提高{Behavior,CommanderPrestigeAlarakMechBuff,Modificatio... |
| 追猎者 | `Blink` | 闪现 | `Blink,Execute` | - | 使追猎者能够闪现到附近的目标位置。该技能{Abil,Blink,Cost[0].Cooldown.TimeUse}秒内只能使用1次。 |
| 追猎者 | `AlarakStalkerPhasingArmor` | 相位护甲 | - | `HaveAlarakStalkerPhasingArmor` | 使杀戮者在受到攻击后的{Behavior,AlarakStalkerPhasingArmorBuff,Duration}秒内不会再受到伤害。该效果每{Behavior,AlarakStalkerPhasingArmor,DamageResponse.Cost.Cooldow... |
| 追猎者 | `-` | - | `BlinkSlayer,Execute` | - | - |
| 虚空辉光舰 | `VoidRaySwarmDamageBoost` | 校准棱镜 | `VoidRaySwarmDamageBoost,Execute` | - | 校准虚空辉光舰的棱镜光束，使其对重甲单位的伤害提高{Behavior,VoidRaySwarmDamageBoost,Modification[0].DamageDealtAttributeScaled[Armored]}点，持续{Behavior,VoidRaySwarm... |

### 进化/形态/切换候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| - | - | - | - | - | 暂无自动命中项。 |

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
| 黑暗圣堂武士 | `DarkTemplarShakuras` | `DarkTemplarShakuras, DarkShrine, DarkTemplar` | Unit; FactionNerazim | 矿:- 气:75 人口:- 生命:- 护盾:- 能量:- | 致命的近战杀手，该单位永远处于隐形状态，敌人在不借助侦测单位帮助的情况下无法发现他。可以传送至附近一处位置。 / 可以对地。 |
| 先知 | `Oracle` | `Oracle` | Air; Armored; Unit; FactionNerazim | 矿:100 气:75 人口:-3 生命:100 护盾:60 能量:200 | 空中施法单位。可使用天启、静滞结界和脉冲光线技能。 |
| 海盗船 | `PhoenixShakuras` | `CorsairMP, FleetBeacon, Phoenix, PhoenixAiur, Stargate` | Air; Light/Mechanical; Unit; FactionNerazim | 矿:150 气:100 人口:-2 生命:120 护盾:60 能量:- | 空中优势战机。可使用干扰网避免敌方地面单位和建筑进行攻击。 / 可以对空。 |
| 狂热者 | `Zealot` | `Zealot` | Ground; Biological/Light; Unit; Melee | 矿:100 气:- 人口:-2 生命:100 护盾:50 能量:- | 强大的近战战士。 / 可以对地。 |
| 百夫长 | `ZealotShakuras` | `ZealotShakuras, Zealot` | Unit; FactionNerazim | 矿:- 气:- 人口:- 生命:- 护盾:- 能量:- | 强大的近战战士，拥有暗影冲锋和黑暗缠绕技能。 / 可以对地。 |
| 追猎者 | `Stalker` | `Stalker` | Ground; Armored/Mechanical; Unit; Melee | 矿:125 气:50 人口:-2 生命:80 护盾:80 能量:- | 远程支援型步战机甲。 / 可以对地和对空。 |
| 虚空辉光舰 | `VoidRay` | `VoidRay, Stargate` | Air; Armored/Mechanical; Unit; Melee | 矿:250 气:150 人口:-4 生命:150 护盾:100 能量:- | 精确打击舰船。 / 可以对地和对空。 |

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
| 1 | 黑暗水晶塔范围 | `MasteryVorazunDarkPylonRadius` | `2` | +60%范围 | - |
| 1 | 黑洞持续时间 | `MasteryVorazunBlackHoleDuration` | `2` | +60%持续时间 | - |
| 2 | 暗影卫队持续时间 | `MasteryVorazunShadowGuardDuration` | `2` | +60秒 | - |
| 2 | 时间停止急速 | `MasteryVorazunTimeStopHaste` | `1` | +30%单位急速 | - |
| 3 | 时空提速速度 | `MasteryVorazunChronoBoostSpeed` | `1` | +30%提速 | - |
| 3 | 亚顿之矛初始和最大能量 | `MasteryVorazunStartingAndMaxSoAEnergy` | `3` | +90 | - |

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
| 狂热者 | `Charge` | 冲锋 | `Charge,Execute` | - | 允许狂热者能拦截附近的敌人。同时还会提高狂热者的移动速度。该技能每{Abil,Charge,Cost.Cooldown.TimeUse}秒最多只能使用一次。 |
| 狂热者 | `WhirlwindLocked` | 旋风斩 | - | `ArtanisLevel04` | 该技能将在指挥官等级4时解锁。 |

实现备注：建筑自己的技能、生产队列、变形、起飞/降落、特殊自动施法由建筑 profile 声明；地图和科技建筑不持有跨指挥官判断。

## 08. 科技建筑及其升级选项

Owner：`CommanderTechBuildingProfile`、`CommanderTechOptionProfile`、`CommanderUpgradeEffectProfile`。

### 15 级解锁与研究命令

| 等级 | 名称 | 解锁升级 | 解锁 AbilityCmd | 说明 |
|---|---|---|---|---|
| 1 | 亚顿之影 | - | - | 提高沃拉尊的黑暗圣堂武士的护盾值，减少折跃他们所需的瓦斯消耗。 |
| 2 | 亚顿之矛：轨道吸纳舱 | `SOAAutoAssimilator` | - | 亚顿之矛从太空轨道直接采集高能瓦斯，无需使用探机。 / 被动技能。 |
| 3 | 暗影军团 | `ShadowGuardSpawnCount` | - | 沃拉尊的暗影卫队的数量从2提高到4。该技能位于顶部面板上。 |
| 4 | 光影议会升级包 | `VorazunUnlockCenturion`, `VoidZealotShadowCharge` | `TwilightCouncilResearch:4`, `BlinkShieldRestore:`, `TwilightCouncilResearch:7`, `TwilightCouncilResearch:8` | 将沃拉尊的狂热者升级为百夫长。 / 在光影议会中解锁新的研究项目： / 百夫长进入短暂隐形状态，冲锋时可以穿过其它单位。使百夫长可以击晕周围的敌人。追猎者的闪现技能可以使其隐形并持续恢复护盾值。 |
| 5 | 新单位：黑暗执政官 | `VorazunUnlockDarkArchon` | - | 解锁在传送门中折跃黑暗执政官的能力。 / 强大的攻击型施法者。可对敌人施展神经错乱和精神控制。 / 可以对地和对空。 |
| 6 | 黑暗圣堂武士升级包 | `VorazunDarkTemplarRecallPassiveButtonDisplayUpgrade` | `DarkTemplarVoidStasis:`, `DarkShrineResearch:1`, `DarkTemplarShadowDash:`, `DarkShrineResearch:5` | 在黑暗圣坛中解锁新的研究项目： / 使黑暗圣堂武士能传送到附近位置。使黑暗圣堂武士获得瘫痪其它单位的能力，目标单位将在10秒内无法攻击或被攻击。 |
| 7 | 暗影之幕 | `VorazunCloakShieldRegen` | - | 友方隐形单位的护盾恢复速度提高400%。 |
| 8 | 亚顿之矛：事件视界 | `VorazunImprovedBlackHole` | - | 使被黑洞技能影响的敌方单位的护甲无效。该技能位于顶部面板上。 |
| 9 | 黑暗执政官升级包 | - | `DarkArchonMindControl:`, `DarkShrineResearch:3`, `DarkShrineResearch:4` | 在黑暗圣坛中解锁以下升级： / 黑暗执政官初始就拥有100%的能量。使黑暗执政官可以永久控制一个目标。 |
| 10 | 亚顿之矛：时间停止 | `SOATimeFreeze` | `SOATimeFreeze:` | 解锁时间停止技能，可以将所有敌人冻结在原地20秒。该技能位于顶部面板上。 |
| 11 | 黑暗水晶塔：召回 | - | `DarkPylonRecall:` | 黑暗水晶塔获得将友方单位召回到它们所在位置的能力。 |
| 12 | 舰队航标升级包 | - | `FleetBeaconResearch:12`, `FleetBeaconResearch:14`, `FleetBeaconResearch:15` | 在舰队航标中解锁新的研究项目： / 使所有的海盗船和先知永久隐形。提高虚空辉光舰持续攻击时的武器射程。被先知的静滞结界影响的敌人现在可以被攻击了。 |
| 13 | 黑暗圣堂武士召回 | `SOARecallonDeath` | - | - |
| 14 | 亚顿之矛：时空理论 | `SOATimeFreezeUpgrade` | - | 时间停止的冷却时间由5分钟降低到4分钟。该技能位于顶部面板上。 |
| 15 | 阴影黯灭 | `VorazunCloakDamageBoost` | - | 友方隐形单位和潜地单位的武器伤害提高15%。友方隐形或潜地单位的能量恢复率提高50%。 |

### Upgrade 摘要

| Upgrade | 父级 | 显示名 | Effect数 | 说明 |
|---|---|---|---|---|
| `CommanderPrestigeVorazunEmergencyRecall` | `CommanderPrestige` | - | 2 | - |
| `CommanderPrestigeVorazunEmergencyRecallSeekPylon` | `-` | CommanderPrestigeVorazunEmergencyRecallSeekPylon | 0 | - |
| `CommanderPrestigeVorazunStasis` | `CommanderPrestige` | - | 3 | - |
| `CommanderPrestigeVorazunTimeStop` | `CommanderPrestige` | - | 1 | - |
| `CommanderPrestigeVorazunTimeStopMastery` | `CommanderPrestige` | - | 1 | - |
| `MasteryVorazunBlackHoleDuration` | `-` | 精通 沃拉尊 黑洞持续时间 | 2 | 延长黑洞的持续时间。 |
| `MasteryVorazunChronoBoostSpeed` | `-` | 精通 沃拉尊 时空提速速度 | 8 | 提高时空提速的速度加成。 |
| `MasteryVorazunDarkPylonRadius` | `-` | 精通 沃拉尊 黑暗水晶塔范围 | 8 | 扩大黑暗水晶塔的隐形场与能量场的范围。 |
| `MasteryVorazunShadowGuardDuration` | `-` | 精通 沃拉尊 暗影卫队持续时间 | 2 | 延长暗影卫队的持续时间。 |
| `MasteryVorazunStartingAndMaxSoAEnergy` | `-` | 精通 沃拉尊 亚顿之矛起始和最大能量值 | 3 | 提高亚顿之矛的初始和最大能量值。 |
| `MasteryVorazunTimeStopHaste` | `-` | 精通 沃拉尊 时间停止急速 | 5 | 当时间停止激活时，提高友方单位的攻击速度、移动速度、能量恢复以及冷却时间缩短。 |
| `SOAAutoAssimilator` | `-` | - | 0 | - |
| `SOARecall` | `-` | - | 0 | - |
| `SOARecallonDeath` | `-` | SOARecall on Death | 0 | - |
| `SOATimeFreeze` | `-` | - | 0 | 改变时间与空间，使所有敌人原地静止{Behavior,SOATimeFreeze,Duration}秒。射程无限。 |
| `SOATimeFreezeUpgrade` | `-` | SOATime Freeze Upgrade | 4 | - |
| `ShadowGuardSpawnCount` | `-` | Shadow Guard Spawn Count | 1 | - |
| `VoidPylonRecall` | `-` | 虚空水晶塔召回 | 0 | - |
| `VoidZealotShadowCharge` | `-` | - | 2 | 拦截附近的敌方单位并提高百夫长的移动速度。该技能每{Abil,Charge,Cost.Cooldown.TimeUse}秒只能使用一次。 / 还会暂时令百夫长隐形并能穿越其他单位。 |
| `VorazunCloakDamageBoost` | `-` | 沃拉尊隐身伤害强化 | 0 | - |
| `VorazunCloakShieldRegen` | `-` | Vorazun Cloak Shield Regen | 0 | - |
| `VorazunCommander` | `-` | Vorazun | 25 | - |
| `VorazunDarkTemplarRecallPassiveButtonDisplayUpgrade` | `-` | 沃拉尊黑暗圣堂武士召回被动按钮显示升级 | 0 | - |
| `VorazunImprovedBlackHole` | `-` | Improved Black Hole | 2 | - |
| `VorazunUnlockCenturion` | `-` | Vorazun Unlock Centurion | 7 | - |
| `VorazunUnlockDarkArchon` | `-` | Vorazun Unlock Dark Archon | 3 | - |

### 研究/升级按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 传送门 | `UpgradeToWarpGate` | 变形为折跃门 | `UpgradeToWarpGate,Execute` | - | 将传送门升级为折跃门，使星灵可以利用折跃技术将地面单位召集到任何有水晶塔或折跃棱镜能量覆盖的区域。 |
| 先知 | `HaveOracleStasisWardUpgrade` | 静滞校正 | - | `HaveOracleStasisWardUpgrade` | 被先知的静滞结界影响的单位将可以被攻击。 |
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
| `cargo_light` | ZealotShakuras x6, Stalker x3 | 暗影前锋 | 百夫长抗线，追猎者远程支援。 | 设计草案；需按原始mod地图流程和实机日志继续校验。 |
| `cargo_heavy` | DarkTemplarShakuras x4, Stalker x4, Oracle x1 | 隐秘突袭 | 黑暗圣堂武士作为核心，但不在早期轻型场景滥用。 | 设计草案；需按原始mod地图流程和实机日志继续校验。 |
| `cargo_air` | PhoenixShakuras x4, VoidRay x2 | 空中暗影支援 | 海盗船和虚空辉光舰。 | 设计草案；需按原始mod地图流程和实机日志继续校验。 |
| `bonus_reward` | DarkTemplarShakuras x6, Oracle x2 | 隐形奖励 | 适合隐秘地图或时间停止联动。 | 设计草案；需按原始mod地图流程和实机日志继续校验。 |
| `replacement_squad` | ZealotShakuras x8, DarkTemplarShakuras x2 | 隐形/召回测试 | 用于验证黑暗水晶塔和隐形加成。 | 设计草案；需按原始mod地图流程和实机日志继续校验。 |

### 接入规则

- 本模块不再从 `command_cards.json` 的运输/空投按钮自动推导货舱单位，也不把 `units.json` 全量清单当成可投放单位。
- 地图只传入 `mapId`、`scenarioKind`、目标点和运输模式；单位组合由 `CommanderCargoLoadoutProfile` 根据当前 commander、15 级 `power_fusion` roster 和场景限制解析。
- `原始mod` 已有运输机、空投舱、狮鹫运输、医疗运输机、坑道/深挖或感染运输容器时，应优先保留它的流程语义，只把硬编码单位替换为 profile 查询结果。
- 英雄、首领、终极进化、战列巡航舰、航母等高价值单位默认只能用于 `bonus_reward` 或显式允许英雄的地图场景。
实现备注：`CommanderMapDropProfile` 负责把地图事件映射为 `scenarioKind`；`CommanderScenarioFallbackProfile` 负责缺项降级并输出 `[XM_DBG][WARN][CARGO_FALLBACK]`。

## 10. 指挥官特殊机制

Owner：`CommanderSpecialMechanicProfile`、`CommanderSpecialResourceProfile`、`CommanderSpecialMechanicHookProfile`、`CommanderSpecialMechanicUnitProfile`。

本指挥官重点：暗影卫队、黑暗水晶塔、时间停止和隐形加成。

### 特殊机制命中项

- 亚顿之影 (Vorazun)
- 亚顿之矛：轨道吸纳舱 (VorazunOrbitalAssimilator)
- 暗影军团 (VorazunImprovedShadowGuard)
- 光影议会升级包 (VorazunTwilightCouncilUpgrades)
- 新单位：黑暗执政官 (VorazunUnlockDarkArchon)
- 黑暗圣堂武士升级包 (VorazunDarkTemplarUpgrades)
- 暗影之幕 (VorazunImprovedShieldRegeneration)
- 亚顿之矛：事件视界 (VorazunImprovedBlackHole)
- 黑暗执政官升级包 (VorazunDarkArchonUpgrades)
- 亚顿之矛：时间停止 (VorazunUnlockTimeStop)
- 黑暗水晶塔：召回 (VorazunUnlockDarkPylonRecall)
- 舰队航标升级包 (VorazunFleetBeaconUpgrades)
- 黑暗圣堂武士召回 (VorazunUnlockSOARecallOnDeath)
- 亚顿之矛：时空理论 (VorazunImprovedTimeStop)
- 阴影黯灭 (VorazunCloakedUnitDamageBoost)

### 特殊机制 Upgrade 候选

- CommanderPrestigeVorazunEmergencyRecall (`CommanderPrestigeVorazunEmergencyRecall`)
- CommanderPrestigeVorazunEmergencyRecallSeekPylon (`CommanderPrestigeVorazunEmergencyRecallSeekPylon`)
- CommanderPrestigeVorazunStasis (`CommanderPrestigeVorazunStasis`)
- CommanderPrestigeVorazunTimeStop (`CommanderPrestigeVorazunTimeStop`)
- CommanderPrestigeVorazunTimeStopMastery (`CommanderPrestigeVorazunTimeStopMastery`)
- 精通 沃拉尊 黑洞持续时间 (`MasteryVorazunBlackHoleDuration`)
- 精通 沃拉尊 时空提速速度 (`MasteryVorazunChronoBoostSpeed`)
- 精通 沃拉尊 黑暗水晶塔范围 (`MasteryVorazunDarkPylonRadius`)
- 精通 沃拉尊 暗影卫队持续时间 (`MasteryVorazunShadowGuardDuration`)
- 精通 沃拉尊 亚顿之矛起始和最大能量值 (`MasteryVorazunStartingAndMaxSoAEnergy`)
- 精通 沃拉尊 时间停止急速 (`MasteryVorazunTimeStopHaste`)
- SOATimeFreeze (`SOATimeFreeze`)
- SOATime Freeze Upgrade (`SOATimeFreezeUpgrade`)
- Shadow Guard Spawn Count (`ShadowGuardSpawnCount`)
- VoidZealotShadowCharge (`VoidZealotShadowCharge`)
- 沃拉尊隐身伤害强化 (`VorazunCloakDamageBoost`)
- Vorazun Cloak Shield Regen (`VorazunCloakShieldRegen`)
- Vorazun (`VorazunCommander`)
- 沃拉尊黑暗圣堂武士召回被动按钮显示升级 (`VorazunDarkTemplarRecallPassiveButtonDisplayUpgrade`)
- Improved Black Hole (`VorazunImprovedBlackHole`)
- 还有 2 项，后续从源 JSON 继续展开。

### 特殊机制按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 黑暗圣堂武士 | `-` | - | `DarkTemplarShadowFury,Execute` | - | - |
| 黑暗圣堂武士 | `VoidDarkTemplarShadowFury` | VoidDarkTemplarShadowFury | `DarkTemplarShadowFury,Execute` | - | - |
| 黑暗圣堂武士 | `ShadowDashLocked` | 闪现 | - | `VorazunLevel06` | 该技能将在指挥官等级6时解锁。 |
| 黑暗圣堂武士 | `VoidStasisLocked` | 虚空静滞 | - | `VorazunLevel06` | 该技能将在指挥官等级6时解锁。 |
| 黑暗圣堂武士 | `DarkTemplarShadowDash` | 闪现 | `DarkTemplarShadowDash,Execute` | - | 传送到附近的目标区域。 |
| 传送门 | `DarkTemplar` | 折跃黑暗圣堂武士 | `GatewayTrain,Train5` | - | 致命的近战杀手，该单位永远处于隐形状态，敌人在不借助侦测单位帮助的情况下无法发现他。可以融合为执政官。 / 可以对地。 |
| 传送门 | `WarpInDarkArchonLocked` | 折跃黑暗执政官 | - | `VorazunLevel05` | 该技能将在指挥官等级5时解锁。 |
| 先知 | `OracleBuildStasisTrap` | 静滞结界 | `OracleStasisTrapBuild,Build1` | - | 在目标位置放置一个持续{Behavior,StasisWardTimedLife,Duration}秒的隐形静滞结界。一旦被敌方地面单位触发后，该结界将使附近的敌人陷入静滞，持续{Behavior,OracleStasisTrapTarget,Duration}秒。被困单位... |
| 先知 | `PermanentlyCloakedOracle` | 永久隐形 | - | `HaveCorsairPermanentCloak` | 该先知处于永久隐形状态。 |
| 海盗船 | `PermanentlyCloakedCorsair` | 永久隐形 | - | `HaveCorsairPermanentCloak` | 海盗船永久隐形。 |
| 光影议会 | `ResearchShadowStun` | 研究黑暗缠绕 | `TwilightCouncilResearch,Research9` | - | 使百夫长能击晕附近的敌人，并使他们的护盾值在一小段时间内提高{Behavior,VoidZealotShadowChargeSelfBuff,Modification.VitalMaxArray[Shields]}点。重型单位则会被减速。 |
| 狂热者 | `Charge` | 冲锋 | `Charge,Execute` | - | 允许狂热者能拦截附近的敌人。同时还会提高狂热者的移动速度。该技能每{Abil,Charge,Cost.Cooldown.TimeUse}秒最多只能使用一次。 |
| 追猎者 | `Blink` | 闪现 | `Blink,Execute` | - | 使追猎者能够闪现到附近的目标位置。该技能{Abil,Blink,Cost[0].Cooldown.TimeUse}秒内只能使用1次。 |
| 追猎者 | `AlarakStalkerPhasingArmor` | 相位护甲 | - | `HaveAlarakStalkerPhasingArmor` | 使杀戮者在受到攻击后的{Behavior,AlarakStalkerPhasingArmorBuff,Duration}秒内不会再受到伤害。该效果每{Behavior,AlarakStalkerPhasingArmor,DamageResponse.Cost.Cooldow... |

实现备注：凡是涉及局内状态、资源、堆叠、全局计时器、隐藏 caster、英雄成长或召唤首领的机制，都必须有 runtime hook 和 `[XM_DBG]` 日志。

当前 runtime 落点：官方合作 `heroes.json=0`，本轮不创建英雄本体；`XMFinal` 通过 `LibE0EAE146_VorazunRuntime.galaxy` 在 `InitializeBase` 的 `Vorazun` 分支创建 `SoACasterVorazun`，执行 `CU_GPInit(1, "Vorazun", caster, null)`，并显示顶部面板和选择按钮。顶栏技能 `SOADarkPylon`、`VoidSentryBlackHole`、`SOAShadowGuardCalldown`、`SOATimeFreeze` / `CommanderPrestigeVorazunTimeStop` 都落在该 caster 上。

## 11. 指挥官个性化机制

Owner：`CommanderPersonalMechanicProfile`、`CommanderPersonalMechanicEffectProfile`、`CommanderPersonalMechanicHookProfile`、`CommanderPersonalMechanicRequirementProfile`。

本指挥官重点：隐形加成、黑暗水晶塔召回和时间停止应作为个人机制统一注入。

### 威望正向融合输入

| 威望 ID | 名称 | Primary Upgrade | 禁用单位 | 启用单位 | 禁用 Ability | 补充 Upgrade |
|---|---|---|---|---|---|---|
| `CommanderPrestigeVorazunEmergencyRecall` | - | `CommanderPrestigeVorazunEmergencyRecall` | - | - | `DarkPylonRecall:` | - |
| `CommanderPrestigeVorazunStasis` | - | `CommanderPrestigeVorazunStasis` | - | - | - | - |
| `CommanderPrestigeVorazunTimeStop` | - | `CommanderPrestigeVorazunTimeStop` | - | - | `SOATimeFreeze:` | `VorazunTimeStop1` |

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
[XM_DBG][INFO][COMMANDER_PROFILE_LOAD] commander=Vorazun levelMode=FullLevel15 masteryMode=AllSixMax rosterStage=power_fusion result=ok
[XM_DBG][INFO][POWER_FUSION_APPLY] commander=Vorazun levelMode=FullLevel15 masteryMode=AllSixMax prestigeMode=SelectedPositive result=ok
[XM_DBG][INFO][ROSTER_LOAD] commander=Vorazun stage=power_fusion units=7 buildings=3 heroes=0 result=ok
[XM_DBG][INFO][HERO_PROFILE_LOAD] commander=Vorazun heroes=0 result=ok
[XM_DBG][INFO][MODULE_VERIFY] commander=Vorazun module=<01-11> profile=<profile> result=ok
[XM_DBG][WARN][CASC_AUDIT_REQUIRED] commander=Vorazun module=<module> object=<object> result=needs-casc-audit
```

## 第一轮待审计项

- 顶部技能的 caster、按钮、冷却、充能、目标转发闭包。
- 英雄或特殊英雄的 Unit、Ability、Behavior、Weapon、Actor、Sound、复活/重生闭包。
- `power_fusion` 最终 roster 与 `level15` roster 的新增、替换、变体关系。
- 6 项精通的真实作用对象和最终数值。
- 3 个威望的正面收益、负面代价、disable/suppress、费用/冷却/上限变化。
- 科技建筑研究按钮、Requirement、Upgrade effect 是否完整。
- 特殊机制、英雄成长和个性化机制是否需要 runtime hook。
