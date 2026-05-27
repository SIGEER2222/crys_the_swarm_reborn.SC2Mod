# 沃拉尊（Vorazun）指挥官细化

日期：2026-05-27

## 当前口径

当前指挥官默认 15 级，不从 1 级开始；精通默认 6 项全部 30 点；威望默认只取正面收益，不直接启用官方 `PlayerPrestige`。`initial` 只作为官方基础状态审计和差异对照，默认测试和玩法应看 `power_fusion` 最终状态。

本文件按 `docs/newdocs/模块拆分` 的 11 个模块整理 沃拉尊。依据 `游戏数据/官方合作指挥官/commanders/Vorazun/` 的 JSON 摘要生成；具体 Ability、Behavior、Weapon、Actor、Effect、Requirement 闭包仍需继续追 `references/sc2-build-96883-casc-export/` 或实机 `[XM_DBG]` 日志。

## 官方数据摘要

| 项 | 值 |
|---|---|
| CommanderId | `ProtossVorazun` |
| 中文名 | 沃拉尊 |
| 默认升级 | `VorazunCommander, SOARecall, VoidPylonRecall` |
| 默认能力命令 | `CyberneticsCoreResearch:6` |
| 威望 ID | `CommanderPrestigeVorazunEmergencyRecall, CommanderPrestigeVorazunStasis, CommanderPrestigeVorazunTimeStop` |
| heroes 数量 | 0 |
| roster 数量 | 10 |
| units 数量 | 4 |
| buildings 数量 | 6 |
| command card 对象数 | 10 |
| upgrades 数量 | 26 |
| source | `mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/userdata.xml` |

roster 样例：

```text
Stalker, VoidRay, ZealotShakuras, Gateway, TwilightCouncil, PhotonCannon, PhoenixShakuras, DarkTemplarShakuras, Zealot, Oracle
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
| Lv6 黑暗圣堂武士升级包 | 6 | `DarkTemplarVoidStasis:` | `VorazunDarkTemplarRecallPassiveButtonDisplayUpgrade` | 在黑暗圣坛中解锁新的研究项目： / 使黑暗圣堂武士能传送到附近位置。使黑暗圣堂武士获得瘫痪其它单位的能力，目标单位将在10秒内无法攻击或被攻击。 |
| Lv6 黑暗圣堂武士升级包 | 6 | `DarkShrineResearch:1` | `VorazunDarkTemplarRecallPassiveButtonDisplayUpgrade` | 在黑暗圣坛中解锁新的研究项目： / 使黑暗圣堂武士能传送到附近位置。使黑暗圣堂武士获得瘫痪其它单位的能力，目标单位将在10秒内无法攻击或被攻击。 |
| Lv6 黑暗圣堂武士升级包 | 6 | `DarkTemplarShadowDash:` | `VorazunDarkTemplarRecallPassiveButtonDisplayUpgrade` | 在黑暗圣坛中解锁新的研究项目： / 使黑暗圣堂武士能传送到附近位置。使黑暗圣堂武士获得瘫痪其它单位的能力，目标单位将在10秒内无法攻击或被攻击。 |
| Lv6 黑暗圣堂武士升级包 | 6 | `DarkShrineResearch:5` | `VorazunDarkTemplarRecallPassiveButtonDisplayUpgrade` | 在黑暗圣坛中解锁新的研究项目： / 使黑暗圣堂武士能传送到附近位置。使黑暗圣堂武士获得瘫痪其它单位的能力，目标单位将在10秒内无法攻击或被攻击。 |
| Lv10 亚顿之矛：时间停止 | 10 | `SOATimeFreeze:` | `SOATimeFreeze` | 解锁时间停止技能，可以将所有敌人冻结在原地20秒。该技能位于顶部面板上。 |
| Lv12 舰队航标升级包 | 12 | `FleetBeaconResearch:12` | `-` | 在舰队航标中解锁新的研究项目： / 使所有的海盗船和先知永久隐形。提高虚空辉光舰持续攻击时的武器射程。被先知的静滞结界影响的敌人现在可以被攻击了。 |
| Lv12 舰队航标升级包 | 12 | `FleetBeaconResearch:14` | `-` | 在舰队航标中解锁新的研究项目： / 使所有的海盗船和先知永久隐形。提高虚空辉光舰持续攻击时的武器射程。被先知的静滞结界影响的敌人现在可以被攻击了。 |
| Lv12 舰队航标升级包 | 12 | `FleetBeaconResearch:15` | `-` | 在舰队航标中解锁新的研究项目： / 使所有的海盗船和先知永久隐形。提高虚空辉光舰持续攻击时的武器射程。被先知的静滞结界影响的敌人现在可以被攻击了。 |

### command card 命中

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 黑暗圣堂武士 | `ZeratulDarkTemplarBlink` | 闪现 | `-` | HaveZeratulArtifactTier1AndDarkShine | 使虚空圣堂武士可以传送至附近一处目标位置。 |
| 传送门 | `WarpInAdept` | 折跃使徒 | `GatewayTrain,Train7` | - | 远程特种单位。可以使用灵能传送。 / 可以对地。 |
| 传送门 | `UpgradeToWarpGate` | 变形为折跃门 | `UpgradeToWarpGate,Execute` | - | 将传送门升级为折跃门，使星灵可以利用折跃技术将地面单位召集到任何有水晶塔或折跃棱镜能量覆盖的区域。 |
| 海盗船 | `ResearchFenixScoutWeaponRange` | 研究战斗感应器阵列 | `FleetBeaconResearch,Research22` | - | 侦察机获得+3对空攻击射程和+1对地攻击射程。 |
| 海盗船 | `ResearchKaraxCarrerInterceptorLaunchSpeed` | 研究引力跃迁弹射器 | `FleetBeaconResearch,Research18` | - | 使航空母舰发射拦截机的速度变快，并且使拦截机的攻击速度提高{(Weapon,InterceptorBeam,Period-$UpgradeEffectAr... |
| 海盗船 | `ResearchVoidRaySpeedUpgrade` | 研发熔流旋叶 | `FleetBeaconResearch,Research5` | - | 提高虚空辉光舰的移动速度和移动加速度。 |
| 虚空辉光舰 | `CarrierTaldarimMothership` | 折跃母舰 | `StargateTrain,Train14` | - | 终极星灵战舰。能够使用群体传送和热能射线枪。 / 可以对地和对空。 |

实现备注：面板只注册 profile 和转发 caster，地图不得按 commander 写 if/else。精通和威望影响面板冷却/充能/费用时，由本模块接收最终 modifier。

## 02. 英雄单位及其技能

Owner：`CommanderHeroProfile`、`CommanderHeroModeProfile`、`CommanderHeroAbilityProfile`、`CommanderHeroSkillTreeProfile`、`CommanderHeroReviveProfile`、`CommanderHeroModifierProfile`。

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| - | - | - | - | - | 官方 heroes.json 未列出英雄条目；召唤物/形态/特殊英雄需从 progression、command_cards 或 CASC 继续追 |

### 英雄/形态候选

- 暂无自动命中项，需 CASC/实机日志补充。

口径：隐形单位强化和全图控制技能要从面板、单位行为和威望正向收益同时审计。

待审计：Hero Unit、技能按钮、复活、形态切换、武器/Actor/Sound 闭包。

## 03. 普通单位技能及其进化功能

Owner：`CommanderUnitAbilityProfile`、`CommanderUnitStatProfile`、`CommanderUnitEvolutionProfile`、`CommanderUnitBehaviorProfile`、`CommanderUnitWeaponProfile`。

### 单位技能按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 先知 | `MoveHoldPosition` | 原地防御 | `move,HoldPos` | - | 命令选中的单位待在原地，并攻击射程内的敌方目标。接受命令的单位不会对敌人进行追击或移向敌人与其交战。 |
| 先知 | `MovePatrol` | 巡逻 | `move,Patrol` | - | 命令选中的单位在当前位置与目标区域间进行巡逻。巡逻的单位会对敌人发起攻击或移向附近的敌人与其交战。 |
| 先知 | `AcquireMove` | 搜索移动 | `move,AcquireMove` | - | 命令选中的单位移至目标区域或跟随目标单位。进行搜索移动的单位不会与敌人交战。 |
| 先知 | `OracleRevelation` | 天启 | `OracleRevelation,Execute` | - | 使目标区域内的单位和建筑获得视野，持续{Behavior,OracleRevelation,Duration}秒。显示隐形或潜地的单位和建筑。 |
| 先知 | `OracleBuildStasisTrap` | 静滞结界 | `OracleStasisTrapBuild,Build1` | - | 在目标位置放置一个持续{Behavior,StasisWardTimedLife,Duration}秒的隐形静滞结界。一旦被敌方地面单位触发后，该结界将使... |
| 先知 | `OracleWeaponOn` | 激活脉冲光线 | `OracleWeapon,On` | - | 为先知的脉冲光线充能，使其能够攻击敌方地面单位。 / 每秒消耗{-1 * (Behavior,OracleWeapon,Modification.Vita... |
| 先知 | `HaveOracleStasisWardUpgrade` | 静滞校正 | `-` | HaveOracleStasisWardUpgrade | 被先知的静滞结界影响的单位将可以被攻击。 |
| 先知 | `PermanentlyCloakedOracle` | 永久隐形 | `-` | HaveCorsairPermanentCloak | 该先知处于永久隐形状态。 |
| 先知 | `OracleRevelation` | 天启 | `OracleRevelation,Execute` | - | 使目标区域内的单位和建筑获得视野，持续{Behavior,OracleRevelation,Duration}秒。显示隐形或潜地的单位和建筑。 |
| 先知 | `OracleWeaponOn` | 激活脉冲光线 | `OracleWeapon,On` | - | 为先知的脉冲光线充能，使其能够攻击敌方地面单位。 / 每秒消耗{-1 * (Behavior,OracleWeapon,Modification.Vita... |
| 狂热者 | `MoveHoldPosition` | 原地防御 | `move,HoldPos` | - | 命令选中的单位待在原地，并攻击射程内的敌方目标。接受命令的单位不会对敌人进行追击或移向敌人与其交战。 |
| 狂热者 | `MovePatrol` | 巡逻 | `move,Patrol` | - | 命令选中的单位在当前位置与目标区域间进行巡逻。巡逻的单位会对敌人发起攻击或移向附近的敌人与其交战。 |
| 狂热者 | `Charge` | 冲锋 | `Charge,Execute` | - | 允许狂热者能拦截附近的敌人。同时还会提高狂热者的移动速度。该技能每{Abil,Charge,Cost.Cooldown.TimeUse}秒最多只能使用一次。 |
| 狂热者 | `WhirlwindLocked` | 旋风斩 | `-` | ArtanisLevel04 | 该技能将在指挥官等级4时解锁。 |
| 百夫长 | `MoveHoldPosition` | 原地防御 | `move,HoldPos` | - | 命令选中的单位待在原地，并攻击射程内的敌方目标。接受命令的单位不会对敌人进行追击或移向敌人与其交战。 |
| 百夫长 | `MovePatrol` | 巡逻 | `move,Patrol` | - | 命令选中的单位在当前位置与目标区域间进行巡逻。巡逻的单位会对敌人发起攻击或移向附近的敌人与其交战。 |
| 百夫长 | `Charge` | 冲锋 | `Charge,Execute` | - | 允许狂热者能拦截附近的敌人。同时还会提高狂热者的移动速度。该技能每{Abil,Charge,Cost.Cooldown.TimeUse}秒最多只能使用一次。 |
| 百夫长 | `WhirlwindLocked` | 旋风斩 | `-` | ArtanisLevel04 | 该技能将在指挥官等级4时解锁。 |
| 追猎者 | `MoveHoldPosition` | 原地防御 | `move,HoldPos` | - | 命令选中的单位待在原地，并攻击射程内的敌方目标。接受命令的单位不会对敌人进行追击或移向敌人与其交战。 |
| 追猎者 | `MovePatrol` | 巡逻 | `move,Patrol` | - | 命令选中的单位在当前位置与目标区域间进行巡逻。巡逻的单位会对敌人发起攻击或移向附近的敌人与其交战。 |
| 追猎者 | `CommanderPrestigeAlarakMechBuff` | 灵魂之匣 | `-` | CommanderPrestigeAlarakMech | 该单位可以最多收集{Behavior,CommanderPrestigeAlarakMechBuff,MaxPoints} 个死徒灵魂，每收集一个灵魂可以... |
| 追猎者 | `Blink` | 闪现 | `Blink,Execute` | - | 使追猎者能够闪现到附近的目标位置。该技能{Abil,Blink,Cost[0].Cooldown.TimeUse}秒内只能使用1次。 |
| 追猎者 | `AlarakStalkerPhasingArmor` | 相位护甲 | `-` | HaveAlarakStalkerPhasingArmor | 使杀戮者在受到攻击后的{Behavior,AlarakStalkerPhasingArmorBuff,Duration}秒内不会再受到伤害。该效果每{Be... |
| 追猎者 | `-` | - | `BlinkSlayer,Execute` | - | - |

### 进化/形态/切换候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 传送门 | `SentryFenix` | 折跃保护者 | `GatewayTrain,Train15` | - | 净化者阵营 / 机械支援单位。可以使用防护场和相位模式。 / 可以对地和对空。 |
| 传送门 | `UpgradeToWarpGate` | 变形为折跃门 | `UpgradeToWarpGate,Execute` | - | 将传送门升级为折跃门，使星灵可以利用折跃技术将地面单位召集到任何有水晶塔或折跃棱镜能量覆盖的区域。 |
| 虚空辉光舰 | `TransformToStarWarpGateLocked` | 变形为折跃星门 | `-` | ArtanisLevel08 | 该技能将在指挥官等级8时解锁。 |

实现备注：单位自己声明技能、形态和升级接入口；科技建筑只展示符合条件的研究项，不直接拥有单位升级逻辑。

## 04. 初始化基地与特殊建筑

Owner：`CommanderRuntimeProfile`、`CommanderScenarioLoadout`、`CommanderSpecialStructureProfile`、`CommanderInitialCasterProfile`。

### 初始化建筑候选

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 海盗船 | `PhoenixShakuras` | `FleetBeacon, Phoenix, PhoenixAiur, Stargate` | Ground; Mechanical | 矿:300 气:200 人口字段:- 生命:500 | 为凤凰和虚空辉光舰提供升级方案。 / 开启： / - 可以从星门折跃风暴战舰- 可以从星门折跃航母 / - 可以从星灵枢纽折跃母舰 |

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
| 追猎者 | `Stalker` | `Stalker` | Ground; Armored/Mechanical | 矿:125 气:50 人口字段:-2 生命:80 | 远程支援型步战机甲。 / 可以对地和对空。 |
| 百夫长 | `ZealotShakuras` | `Zealot, ZealotShakuras` | Ground; Biological/Light | 矿:100 气:- 人口字段:-2 生命:100 | 强大的近战战士，拥有暗影冲锋和黑暗缠绕技能。 / 可以对地。 |
| 狂热者 | `Zealot` | `Zealot` | Ground; Biological/Light | 矿:100 气:- 人口字段:-2 生命:100 | 强大的近战战士。 / 可以对地。 |
| 先知 | `Oracle` | `Oracle` | Air; Armored | 矿:100 气:75 人口字段:-3 生命:100 | 空中施法单位。可使用天启、静滞结界和脉冲光线技能。 |

三阶段口径：`initial` 只做审计，`level15` 表示满级解锁，`power_fusion` 表示 15 级 + 六精通全满 + 威望正向收益后的默认运行清单。

## 06. 指挥官精通

Owner：`CommanderMasteryProfile`、`CommanderMasteryEffectProfile`、`CommanderMasteryModifierProfile`。

| 组 | 名称 | Upgrade | 每点 | 30点口径 |
|---|---|---|---|---|
| 1 | 黑暗水晶塔范围 | `MasteryVorazunDarkPylonRadius` | 2 | +60%范围 |
| 1 | 黑洞持续时间 | `MasteryVorazunBlackHoleDuration` | 2 | +60%持续时间 |
| 2 | 暗影卫队持续时间 | `MasteryVorazunShadowGuardDuration` | 2 | +60秒 |
| 2 | 时间停止急速 | `MasteryVorazunTimeStopHaste` | 1 | +30%单位急速 |
| 3 | 时空提速速度 | `MasteryVorazunChronoBoostSpeed` | 1 | +30%提速 |
| 3 | 亚顿之矛初始和最大能量 | `MasteryVorazunStartingAndMaxSoAEnergy` | 3 | +90 |

实现备注：当前默认六项全部 30 点。表里的 30 点口径由 `point_increments * 30` 推导，最终数值仍需以 Upgrade Effect 闭包验证。

## 07. 指挥官建筑

Owner：`CommanderBuildingProfile`、`CommanderBuildingAbilityProfile`、`CommanderBuildingTrainProfile`、`CommanderBuildingStageProfile`、`CommanderBuildingBehaviorProfile`。

来源：官方提取 `buildings.json`。

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 虚空辉光舰 | `VoidRay` | `Stargate, VoidRay` | Ground; Mechanical | 矿:150 气:150 人口字段:- 生命:600 | 精确打击舰船。 / 可以对地和对空。 |
| 传送门 | `Gateway` | `Gateway` | Ground; Mechanical | 矿:150 气:- 人口字段:- 生命:500 | 使星灵可以利用折跃技术召集地面单位。 / 开启： / - 狂热者 |
| 光影议会 | `TwilightCouncil` | `TwilightCouncil` | Ground; Mechanical | 矿:150 气:100 人口字段:- 生命:500 | 为狂热者、追猎者以及使徒提供升级方案。 |
| 光子炮台 | `PhotonCannon` | `PhotonCannon, Zealot` | Ground; Mechanical | 矿:150 气:- 人口字段:- 生命:150 | 主力防御建筑。 / 可以对地和对空。 / 侦测单位 |
| 海盗船 | `PhoenixShakuras` | `FleetBeacon, Phoenix, PhoenixAiur, Stargate` | Ground; Mechanical | 矿:300 气:200 人口字段:- 生命:500 | 为凤凰和虚空辉光舰提供升级方案。 / 开启： / - 可以从星门折跃风暴战舰- 可以从星门折跃航母 / - 可以从星灵枢纽折跃母舰 |
| 黑暗圣堂武士 | `DarkTemplarShakuras` | `DarkShrine, DarkTemplar, DarkTemplarShakuras` | Ground; Mechanical | 矿:150 气:150 人口字段:- 生命:500 | 致命的近战杀手，该单位永远处于隐形状态，敌人在不借助侦测单位帮助的情况下无法发现他。可以传送至附近一处位置。 / 可以对地。 |

### 建筑按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 黑暗圣堂武士 | `ResearchShadowFury` | 研究暗影之怒 | `DarkShrineResearch,Research1` | - | 使黑暗圣堂武士在目标之间腾跃，每次腾跃造成{Effect,DarkTemplarShadowFuryDamage,Amount} (+{Effect,Da... |
| 黑暗圣堂武士 | `ResearchShadowDashLocked` | 研究闪现 | `-` | VorazunLevel06 | 该科技将在指挥官等级6时解锁。 |
| 黑暗圣堂武士 | `ResearchVoidStasisLocked` | 研究虚空静滞 | `-` | VorazunLevel06 | 该科技将在指挥官等级6时解锁。 |
| 黑暗圣堂武士 | `ResearchDarkArchonFullStartingEnergyLocked` | 研究阿古斯水晶 | `-` | VorazunLevel09 | 该科技将在指挥官等级9时解锁。 |
| 黑暗圣堂武士 | `ResearchMindControlLocked` | 研究精神控制 | `-` | VorazunLevel09 | 该科技将在指挥官等级9时解锁。 |
| 黑暗圣堂武士 | `DarkTemplarPassive` | DarkTemplarPassive | `-` | - | - |
| 黑暗圣堂武士 | `DarkArchonPassive` | DarkArchonPassive | `-` | HaveVorazunCommander | - |
| 黑暗圣堂武士 | `ZeratulDarkTemplarBlink` | 闪现 | `-` | HaveZeratulArtifactTier1AndDarkShine | 使虚空圣堂武士可以传送至附近一处目标位置。 |
| 黑暗圣堂武士 | `ResearchZeratulZealotBlinkHeal` | ResearchZeratulZealotBlinkHeal | `-` | HaveZeratulArtifactTier2AndDarkShine | - |
| 黑暗圣堂武士 | `ResearchZeratulDarkTemplarShadowFury` | ResearchZeratulDarkTemplarShadowFury | `-` | HaveZeratulArtifactTier3AndDarkShine | - |
| 传送门 | `WarpInSupplicant` | 折跃死徒 | `GatewayTrain,Train11` | - | 近战战士。在阿拉纳克濒临死亡时牺牲自己来为他治疗。死徒可以同时折跃两个。 / 可以对地。 |
| 传送门 | `SentryFenix` | 折跃保护者 | `GatewayTrain,Train15` | - | 净化者阵营 / 机械支援单位。可以使用防护场和相位模式。 / 可以对地和对空。 |
| 传送门 | `Stalker` | 折跃追猎者 | `GatewayTrain,Train2` | - | 远程支援型步战机甲。 / 可以对地和对空。 |
| 传送门 | `WarpInAdept` | 折跃使徒 | `GatewayTrain,Train7` | - | 远程特种单位。可以使用灵能传送。 / 可以对地。 |
| 传送门 | `WarpinAscendentLocked` | 折跃晋升者 | `-` | AlarakLevel08 | 该单位将在指挥官等级8时解锁。 |
| 传送门 | `DarkTemplar` | 折跃黑暗圣堂武士 | `GatewayTrain,Train5` | - | 致命的近战杀手，该单位永远处于隐形状态，敌人在不借助侦测单位帮助的情况下无法发现他。可以融合为执政官。 / 可以对地。 |
| 传送门 | `WarpInDarkArchonLocked` | 折跃黑暗执政官 | `-` | VorazunLevel05 | 该技能将在指挥官等级5时解锁。 |
| 传送门 | `UpgradeToWarpGate` | 变形为折跃门 | `UpgradeToWarpGate,Execute` | - | 将传送门升级为折跃门，使星灵可以利用折跃技术将地面单位召集到任何有水晶塔或折跃棱镜能量覆盖的区域。 |
| 传送门 | `AlarakMasteryUnitAttackSpeed` | 战斗精通 | `-` | HaveMasteryAlarakUnitAttackSpeed | 精通：折跃在该建筑旁边的单位获得{Effect,MasteryAlarakUnitAttackSpeedDisplayDummy,Amount}%攻击速度。 |
| 传送门 | `-` | - | `que5notPassive,CancelLast` | - | - |
| 海盗船 | `ResearchFenixScoutWeaponRange` | 研究战斗感应器阵列 | `FleetBeaconResearch,Research22` | - | 侦察机获得+3对空攻击射程和+1对地攻击射程。 |
| 海盗船 | `ResearchCorsairPermanentCloakLocked` | 研究潜行驾驶 | `-` | VorazunLevel12 | 该科技将在指挥官等级12时解锁。 |
| 海盗船 | `ResearchFenixChampionScoutAOEMissilesLocked` | 研究压制程序 | `-` | FenixLevel12 | 该科技将在指挥官等级12时解锁。 |
| 海盗船 | `ResearchKaraxCarrerInterceptorLaunchSpeed` | 研究引力跃迁弹射器 | `FleetBeaconResearch,Research18` | - | 使航空母舰发射拦截机的速度变快，并且使拦截机的攻击速度提高{(Weapon,InterceptorBeam,Period-$UpgradeEffectAr... |
| 海盗船 | `TempestPassive` | TempestPassive | `-` | HaveVoidTempest | - |
| 海盗船 | `CancelBuilding` | 取消 | `BuildInProgress,Cancel` | - | 取消建造，摧毁尚未建造完成的建筑并返还部分资源。 |
| 海盗船 | `ResearchVoidRaySpeedUpgrade` | 研发熔流旋叶 | `FleetBeaconResearch,Research5` | - | 提高虚空辉光舰的移动速度和移动加速度。 |
| 海盗船 | `CarrierPassive` | CarrierPassive | `-` | - | - |
| 海盗船 | `MothershipPassive` | MothershipPassive | `-` | HaveVoidMothership | - |
| 海盗船 | `CarrierPassive` | CarrierPassive | `-` | HaveCarrier | - |
| 光子炮台 | `AttackBuilding` | 攻击 | `attack,Execute` | - | 锁定并且攻击目标，直到超出射程或对方被摧毁。 |
| 光子炮台 | `KaraxTurretRange` | 强化瞄准 | `-` | HaveKaraxTurretRange | 防御性建筑的射程提高2。 |
| 光子炮台 | `KaraxTurretAttackSpeed` | 军械优化 | `-` | HaveKaraxTurretAttackSpeed | 防御性建筑的攻击速度提高25%。 |
| 光子炮台 | `Detector` | 侦测单位 | `-` | NotUnderConstruction | 该单位能够侦测到隐形、潜地和幻像单位。 |
| 光影议会 | `ArmorResearchSupplicantShieldArmor` | 研究鲜血护盾 | `TwilightCouncilResearch,Research25` | - | 降低敌人对死徒的护盾造成的伤害。 |
| 光影议会 | `ResearchReconstructionLocked` | 研究重构 | `-` | KaraxLevel04 | 该科技将在指挥官等级4时解锁。 |
| 光影议会 | `ResearchFenixKaldalisZealotCleaveLocked` | 研究充能利刃 | `-` | FenixLevel04 | 该科技将在指挥官等级4时解锁。 |
| 光影议会 | `FenixTalisAdeptLearnBounceShotUpgradeLocked` | 研究衰弱系统 | `-` | FenixLevel04 | 该科技将在指挥官等级4时解锁。 |
| 光影议会 | `CancelBuilding` | 取消 | `BuildInProgress,Cancel` | - | 取消建造，摧毁尚未建造完成的建筑并返还部分资源。 |
| 光影议会 | `ResearchDragoonRange` | 研究奇点充能 | `TwilightCouncilResearch,Research6` | - | 龙骑士的射程+2。 |
| 光影议会 | `ResearchWhirlwind` | 研究旋风斩 | `TwilightCouncilResearch,Research3` | - | 使狂热者可以使用旋风斩技能。旋风斩在激活时会对附近所有敌人造成伤害。 |
| 光影议会 | `ResearchReclamationLocked` | 研究回收 | `-` | KaraxLevel04 | 该科技将在指挥官等级4时解锁。 |
| 光影议会 | `AdeptResearchPiercingUpgrade` | 研究共鸣之刃 | `-` | - | 使徒的攻击速度提高45%。 |
| 光影议会 | `ResearchShadowStun` | 研究黑暗缠绕 | `TwilightCouncilResearch,Research9` | - | 使百夫长能击晕附近的敌人，并使他们的护盾值在一小段时间内提高{Behavior,VoidZealotShadowChargeSelfBuff,Modifi... |
| 虚空辉光舰 | `WarpInScout` | WarpInScout | `StargateTrain,Train6` | - | - |
| 虚空辉光舰 | `BuildTempestLocked` | 折跃风暴战舰 | `-` | ArtanisLevel11 | 该单位将在指挥官等级11时解锁。 |
| 虚空辉光舰 | `VoidRay` | 折跃虚空辉光舰 | `StargateTrain,Train5` | - | 精确打击舰船。 / 可以对地和对空。 |
| 虚空辉光舰 | `CarrierTaldarimMothership` | 折跃母舰 | `StargateTrain,Train14` | - | 终极星灵战舰。能够使用群体传送和热能射线枪。 / 可以对地和对空。 |
| 虚空辉光舰 | `Carrier` | 折跃航母 | `StargateTrain,Train2` | - | 星灵的主力战舰。能够制造并发射拦截机攻击敌人。 / 可以对地和对空。 |
| 虚空辉光舰 | `TransformToStarWarpGateLocked` | 变形为折跃星门 | `-` | ArtanisLevel08 | 该技能将在指挥官等级8时解锁。 |
| 虚空辉光舰 | `CancelBuilding` | 取消 | `BuildInProgress,Cancel` | - | 取消建造，摧毁尚未建造完成的建筑并返还部分资源。 |
| 虚空辉光舰 | `VoidRay` | 折跃虚空辉光舰 | `StargateTrain,Train5` | - | 精确打击舰船。 / 可以对地和对空。 |
| 虚空辉光舰 | `Arbiter` | 折跃仲裁者 | `StargateTrain,Train12` | - | - |

实现备注：建筑声明自身生产、研究、行为和阶段；训练单位的最终可用性由兵种/科技/精通/威望共同裁决。

## 08. 科技建筑及其升级选项

Owner：`CommanderTechBuildingProfile`、`CommanderUnitTechProfile`、`CommanderUpgradeProfile`、`CommanderUpgradeRequirementProfile`、`CommanderUpgradeEffectProfile`。

### 15 级解锁与研究命令

| 等级 | 名称 | 解锁升级 | 解锁 AbilityCmd | 说明 |
|---|---|---|---|---|
| 1 | 亚顿之影 | `-` | `-` | 提高沃拉尊的黑暗圣堂武士的护盾值，减少折跃他们所需的瓦斯消耗。 |
| 2 | 亚顿之矛：轨道吸纳舱 | `SOAAutoAssimilator` | `-` | 亚顿之矛从太空轨道直接采集高能瓦斯，无需使用探机。 / 被动技能。 |
| 3 | 暗影军团 | `ShadowGuardSpawnCount` | `-` | 沃拉尊的暗影卫队的数量从2提高到4。该技能位于顶部面板上。 |
| 4 | 光影议会升级包 | `VorazunUnlockCenturion, VoidZealotShadowCharge` | `TwilightCouncilResearch:4, BlinkShieldRestore:, TwilightCouncilResearch:7, TwilightCouncilResearch:8` | 将沃拉尊的狂热者升级为百夫长。 / 在光影议会中解锁新的研究项目： / 百夫长进入短暂隐形状态，冲锋时可以穿过其它单位。使百夫长可以击晕周围的敌人。追猎者的闪现技能可以使其隐... |
| 5 | 新单位：黑暗执政官 | `VorazunUnlockDarkArchon` | `-` | 解锁在传送门中折跃黑暗执政官的能力。 / 强大的攻击型施法者。可对敌人施展神经错乱和精神控制。 / 可以对地和对空。 |
| 6 | 黑暗圣堂武士升级包 | `VorazunDarkTemplarRecallPassiveButtonDisplayUpgrade` | `DarkTemplarVoidStasis:, DarkShrineResearch:1, DarkTemplarShadowDash:, DarkShrineResearch:5` | 在黑暗圣坛中解锁新的研究项目： / 使黑暗圣堂武士能传送到附近位置。使黑暗圣堂武士获得瘫痪其它单位的能力，目标单位将在10秒内无法攻击或被攻击。 |
| 7 | 暗影之幕 | `VorazunCloakShieldRegen` | `-` | 友方隐形单位的护盾恢复速度提高400%。 |
| 8 | 亚顿之矛：事件视界 | `VorazunImprovedBlackHole` | `-` | 使被黑洞技能影响的敌方单位的护甲无效。该技能位于顶部面板上。 |
| 9 | 黑暗执政官升级包 | `-` | `DarkArchonMindControl:, DarkShrineResearch:3, DarkShrineResearch:4` | 在黑暗圣坛中解锁以下升级： / 黑暗执政官初始就拥有100%的能量。使黑暗执政官可以永久控制一个目标。 |
| 10 | 亚顿之矛：时间停止 | `SOATimeFreeze` | `SOATimeFreeze:` | 解锁时间停止技能，可以将所有敌人冻结在原地20秒。该技能位于顶部面板上。 |
| 11 | 黑暗水晶塔：召回 | `-` | `DarkPylonRecall:` | 黑暗水晶塔获得将友方单位召回到它们所在位置的能力。 |
| 12 | 舰队航标升级包 | `-` | `FleetBeaconResearch:12, FleetBeaconResearch:14, FleetBeaconResearch:15` | 在舰队航标中解锁新的研究项目： / 使所有的海盗船和先知永久隐形。提高虚空辉光舰持续攻击时的武器射程。被先知的静滞结界影响的敌人现在可以被攻击了。 |
| 13 | 黑暗圣堂武士召回 | `SOARecallonDeath` | `-` | - |
| 14 | 亚顿之矛：时空理论 | `SOATimeFreezeUpgrade` | `-` | 时间停止的冷却时间由5分钟降低到4分钟。该技能位于顶部面板上。 |
| 15 | 阴影黯灭 | `VorazunCloakDamageBoost` | `-` | 友方隐形单位和潜地单位的武器伤害提高15%。友方隐形或潜地单位的能量恢复率提高50%。 |

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
| `VoidZealotShadowCharge` | `-` | - | 2 | 拦截附近的敌方单位并提高百夫长的移动速度。该技能每{Abil,Charge,Cost.Cooldown.TimeUse}秒只能使用一次。 / 还会暂时令百夫长隐形... |
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
| 黑暗圣堂武士 | `ResearchShadowFury` | 研究暗影之怒 | `DarkShrineResearch,Research1` | - | 使黑暗圣堂武士在目标之间腾跃，每次腾跃造成{Effect,DarkTemplarShadowFuryDamage,Amount} (+{Effect,Da... |
| 黑暗圣堂武士 | `ResearchShadowDashLocked` | 研究闪现 | `-` | VorazunLevel06 | 该科技将在指挥官等级6时解锁。 |
| 黑暗圣堂武士 | `ResearchVoidStasisLocked` | 研究虚空静滞 | `-` | VorazunLevel06 | 该科技将在指挥官等级6时解锁。 |
| 黑暗圣堂武士 | `ResearchDarkArchonFullStartingEnergyLocked` | 研究阿古斯水晶 | `-` | VorazunLevel09 | 该科技将在指挥官等级9时解锁。 |
| 黑暗圣堂武士 | `ResearchMindControlLocked` | 研究精神控制 | `-` | VorazunLevel09 | 该科技将在指挥官等级9时解锁。 |
| 黑暗圣堂武士 | `ResearchZeratulZealotBlinkHeal` | ResearchZeratulZealotBlinkHeal | `-` | HaveZeratulArtifactTier2AndDarkShine | - |
| 黑暗圣堂武士 | `ResearchZeratulDarkTemplarShadowFury` | ResearchZeratulDarkTemplarShadowFury | `-` | HaveZeratulArtifactTier3AndDarkShine | - |
| 传送门 | `UpgradeToWarpGate` | 变形为折跃门 | `UpgradeToWarpGate,Execute` | - | 将传送门升级为折跃门，使星灵可以利用折跃技术将地面单位召集到任何有水晶塔或折跃棱镜能量覆盖的区域。 |
| 先知 | `HaveOracleStasisWardUpgrade` | 静滞校正 | `-` | HaveOracleStasisWardUpgrade | 被先知的静滞结界影响的单位将可以被攻击。 |
| 海盗船 | `ResearchFenixScoutWeaponRange` | 研究战斗感应器阵列 | `FleetBeaconResearch,Research22` | - | 侦察机获得+3对空攻击射程和+1对地攻击射程。 |
| 海盗船 | `ResearchCorsairPermanentCloakLocked` | 研究潜行驾驶 | `-` | VorazunLevel12 | 该科技将在指挥官等级12时解锁。 |
| 海盗船 | `ResearchFenixChampionScoutAOEMissilesLocked` | 研究压制程序 | `-` | FenixLevel12 | 该科技将在指挥官等级12时解锁。 |
| 海盗船 | `ResearchKaraxCarrerInterceptorLaunchSpeed` | 研究引力跃迁弹射器 | `FleetBeaconResearch,Research18` | - | 使航空母舰发射拦截机的速度变快，并且使拦截机的攻击速度提高{(Weapon,InterceptorBeam,Period-$UpgradeEffectAr... |
| 海盗船 | `ResearchVoidRaySpeedUpgrade` | 研发熔流旋叶 | `FleetBeaconResearch,Research5` | - | 提高虚空辉光舰的移动速度和移动加速度。 |
| 光影议会 | `ArmorResearchSupplicantShieldArmor` | 研究鲜血护盾 | `TwilightCouncilResearch,Research25` | - | 降低敌人对死徒的护盾造成的伤害。 |
| 光影议会 | `ResearchReconstructionLocked` | 研究重构 | `-` | KaraxLevel04 | 该科技将在指挥官等级4时解锁。 |
| 光影议会 | `ResearchFenixKaldalisZealotCleaveLocked` | 研究充能利刃 | `-` | FenixLevel04 | 该科技将在指挥官等级4时解锁。 |
| 光影议会 | `FenixTalisAdeptLearnBounceShotUpgradeLocked` | 研究衰弱系统 | `-` | FenixLevel04 | 该科技将在指挥官等级4时解锁。 |
| 光影议会 | `ResearchDragoonRange` | 研究奇点充能 | `TwilightCouncilResearch,Research6` | - | 龙骑士的射程+2。 |
| 光影议会 | `ResearchWhirlwind` | 研究旋风斩 | `TwilightCouncilResearch,Research3` | - | 使狂热者可以使用旋风斩技能。旋风斩在激活时会对附近所有敌人造成伤害。 |
| 光影议会 | `ResearchReclamationLocked` | 研究回收 | `-` | KaraxLevel04 | 该科技将在指挥官等级4时解锁。 |
| 光影议会 | `AdeptResearchPiercingUpgrade` | 研究共鸣之刃 | `-` | - | 使徒的攻击速度提高45%。 |
| 光影议会 | `ResearchShadowStun` | 研究黑暗缠绕 | `TwilightCouncilResearch,Research9` | - | 使百夫长能击晕附近的敌人，并使他们的护盾值在一小段时间内提高{Behavior,VoidZealotShadowChargeSelfBuff,Modifi... |

实现备注：科技建筑只负责展示/触发研究；每个单位升级效果由对应 `CommanderUnitTechProfile` 或 `CommanderUpgradeEffectProfile` 声明。

## 09. 特定地图运输机空投单位

Owner：`CommanderCargoLoadoutProfile`、`CommanderMapDropProfile`、`CommanderScenarioFallbackProfile`。

### 运输/空投能力候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 黑暗圣堂武士 | `ZeratulDarkTemplarBlink` | 闪现 | `-` | HaveZeratulArtifactTier1AndDarkShine | 使虚空圣堂武士可以传送至附近一处目标位置。 |
| 传送门 | `WarpInSupplicant` | 折跃死徒 | `GatewayTrain,Train11` | - | 近战战士。在阿拉纳克濒临死亡时牺牲自己来为他治疗。死徒可以同时折跃两个。 / 可以对地。 |
| 传送门 | `SentryFenix` | 折跃保护者 | `GatewayTrain,Train15` | - | 净化者阵营 / 机械支援单位。可以使用防护场和相位模式。 / 可以对地和对空。 |
| 传送门 | `Stalker` | 折跃追猎者 | `GatewayTrain,Train2` | - | 远程支援型步战机甲。 / 可以对地和对空。 |
| 传送门 | `WarpInAdept` | 折跃使徒 | `GatewayTrain,Train7` | - | 远程特种单位。可以使用灵能传送。 / 可以对地。 |
| 传送门 | `WarpinAscendentLocked` | 折跃晋升者 | `-` | AlarakLevel08 | 该单位将在指挥官等级8时解锁。 |
| 传送门 | `DarkTemplar` | 折跃黑暗圣堂武士 | `GatewayTrain,Train5` | - | 致命的近战杀手，该单位永远处于隐形状态，敌人在不借助侦测单位帮助的情况下无法发现他。可以融合为执政官。 / 可以对地。 |
| 传送门 | `WarpInDarkArchonLocked` | 折跃黑暗执政官 | `-` | VorazunLevel05 | 该技能将在指挥官等级5时解锁。 |
| 传送门 | `UpgradeToWarpGate` | 变形为折跃门 | `UpgradeToWarpGate,Execute` | - | 将传送门升级为折跃门，使星灵可以利用折跃技术将地面单位召集到任何有水晶塔或折跃棱镜能量覆盖的区域。 |
| 传送门 | `AlarakMasteryUnitAttackSpeed` | 战斗精通 | `-` | HaveMasteryAlarakUnitAttackSpeed | 精通：折跃在该建筑旁边的单位获得{Effect,MasteryAlarakUnitAttackSpeedDisplayDummy,Amount}%攻击速度。 |
| 虚空辉光舰 | `WarpInScout` | WarpInScout | `StargateTrain,Train6` | - | - |
| 虚空辉光舰 | `BuildTempestLocked` | 折跃风暴战舰 | `-` | ArtanisLevel11 | 该单位将在指挥官等级11时解锁。 |
| 虚空辉光舰 | `VoidRay` | 折跃虚空辉光舰 | `StargateTrain,Train5` | - | 精确打击舰船。 / 可以对地和对空。 |
| 虚空辉光舰 | `CarrierTaldarimMothership` | 折跃母舰 | `StargateTrain,Train14` | - | 终极星灵战舰。能够使用群体传送和热能射线枪。 / 可以对地和对空。 |
| 虚空辉光舰 | `Carrier` | 折跃航母 | `StargateTrain,Train2` | - | 星灵的主力战舰。能够制造并发射拦截机攻击敌人。 / 可以对地和对空。 |
| 虚空辉光舰 | `TransformToStarWarpGateLocked` | 变形为折跃星门 | `-` | ArtanisLevel08 | 该技能将在指挥官等级8时解锁。 |
| 虚空辉光舰 | `VoidRay` | 折跃虚空辉光舰 | `StargateTrain,Train5` | - | 精确打击舰船。 / 可以对地和对空。 |
| 虚空辉光舰 | `Arbiter` | 折跃仲裁者 | `StargateTrain,Train12` | - | - |

### 可投放单位候选

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 追猎者 | `Stalker` | `Stalker` | Ground; Armored/Mechanical | 矿:125 气:50 人口字段:-2 生命:80 | 远程支援型步战机甲。 / 可以对地和对空。 |
| 百夫长 | `ZealotShakuras` | `Zealot, ZealotShakuras` | Ground; Biological/Light | 矿:100 气:- 人口字段:-2 生命:100 | 强大的近战战士，拥有暗影冲锋和黑暗缠绕技能。 / 可以对地。 |
| 狂热者 | `Zealot` | `Zealot` | Ground; Biological/Light | 矿:100 气:- 人口字段:-2 生命:100 | 强大的近战战士。 / 可以对地。 |
| 先知 | `Oracle` | `Oracle` | Air; Armored | 矿:100 气:75 人口字段:-3 生命:100 | 空中施法单位。可使用天启、静滞结界和脉冲光线技能。 |

实现备注：运输机空投不要读取地图硬编码单位组，应从 `CommanderCargoLoadoutProfile` 读取当前 commander 的 `power_fusion` 单位清单和场景过滤规则。

## 10. 指挥官特殊机制

Owner：`CommanderSpecialMechanicProfile`、`CommanderSpecialResourceProfile`、`CommanderSpecialMechanicHookProfile`、`CommanderSpecialMechanicUnitProfile`。

本指挥官重点：暗影卫队、黑洞、时间停止、隐形增益是主特殊机制。

### 特殊机制命中项

- 亚顿之影 (`Vorazun`)
- 亚顿之矛：轨道吸纳舱 (`VorazunOrbitalAssimilator`)
- 亚顿之矛：事件视界 (`VorazunImprovedBlackHole`)
- 亚顿之矛：时间停止 (`VorazunUnlockTimeStop`)
- 亚顿之矛：时空理论 (`VorazunImprovedTimeStop`)

### 特殊机制 Upgrade 候选

- 精通 沃拉尊 黑洞持续时间 (`MasteryVorazunBlackHoleDuration`)
- 精通 沃拉尊 亚顿之矛起始和最大能量值 (`MasteryVorazunStartingAndMaxSoAEnergy`)
- 精通 沃拉尊 时间停止急速 (`MasteryVorazunTimeStopHaste`)
- Improved Black Hole (`VorazunImprovedBlackHole`)

### 特殊机制按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 黑暗圣堂武士 | `ZeratulDarkTemplarBlink` | 闪现 | `-` | HaveZeratulArtifactTier1AndDarkShine | 使虚空圣堂武士可以传送至附近一处目标位置。 |
| 黑暗圣堂武士 | `ResearchZeratulZealotBlinkHeal` | ResearchZeratulZealotBlinkHeal | `-` | HaveZeratulArtifactTier2AndDarkShine | - |
| 黑暗圣堂武士 | `ResearchZeratulDarkTemplarShadowFury` | ResearchZeratulDarkTemplarShadowFury | `-` | HaveZeratulArtifactTier3AndDarkShine | - |
| 海盗船 | `ResearchFenixChampionScoutAOEMissilesLocked` | 研究压制程序 | `-` | FenixLevel12 | 该科技将在指挥官等级12时解锁。 |

实现备注：凡是涉及局内状态、资源、堆叠、全局计时器、隐藏 caster 的机制，都必须有 runtime hook 和 `[XM_DBG]` 日志。

## 11. 指挥官个性化机制

Owner：`CommanderPersonalMechanicProfile`、`CommanderPersonalMechanicEffectProfile`、`CommanderPersonalMechanicHookProfile`、`CommanderPersonalMechanicRequirementProfile`。

本指挥官重点：隐形单位强化和全图控制技能要从面板、单位行为和威望正向收益同时审计。

### 威望正向融合输入

| 威望 ID | Primary Upgrade | 禁用单位 | 启用单位 | 禁用 Ability | 补充 Upgrade |
|---|---|---|---|---|---|
| `CommanderPrestigeVorazunEmergencyRecall` | `CommanderPrestigeVorazunEmergencyRecall` | `-` | `-` | `DarkPylonRecall:` | `-` |
| `CommanderPrestigeVorazunStasis` | `CommanderPrestigeVorazunStasis` | `-` | `-` | `-` | `-` |
| `CommanderPrestigeVorazunTimeStop` | `CommanderPrestigeVorazunTimeStop` | `-` | `-` | `SOATimeFreeze:` | `VorazunTimeStop1` |

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
[XM_DBG][INFO][COMMANDER_PROFILE_LOAD] commander=Vorazun levelMode=FullLevel15 masteryMode=AllSixMax rosterStage=power_fusion result=ok
[XM_DBG][INFO][POWER_FUSION_APPLY] commander=Vorazun levelMode=FullLevel15 masteryMode=AllSixMax prestigeMode=SelectedPositive result=ok
[XM_DBG][INFO][ROSTER_LOAD] commander=Vorazun stage=power_fusion units=4 buildings=6 result=ok
[XM_DBG][INFO][MODULE_VERIFY] commander=Vorazun module=<01-11> profile=<profile> result=ok
[XM_DBG][WARN][CASC_AUDIT_REQUIRED] commander=Vorazun module=<module> object=<object> result=needs-casc-audit
```

## 第一轮待审计项

- 顶部技能的 caster、按钮、冷却、充能、目标转发闭包。
- 英雄或特殊英雄的 Unit、Ability、Behavior、Weapon、Actor、Sound 闭包。
- `power_fusion` 最终 roster 与 `level15` roster 的新增、替换、变体关系。
- 6 项精通的真实作用对象和最终数值。
- 3 个威望的正面收益、负面代价、disable/suppress、费用/冷却/上限变化。
- 科技建筑研究按钮、Requirement、Upgrade effect 是否完整。
- 特殊机制和个性化机制是否需要 runtime hook。
