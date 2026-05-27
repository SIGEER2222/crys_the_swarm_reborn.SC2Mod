# 阿塔尼斯（Artanis）指挥官细化

日期：2026-05-27

## 当前口径

当前指挥官默认 15 级，不从 1 级开始；精通默认 6 项全部 30 点；威望默认只取正面收益，不直接启用官方 `PlayerPrestige`。`initial` 只作为官方基础状态审计和差异对照，默认测试和玩法应看 `power_fusion` 最终状态。

本文件按 `docs/newdocs/模块拆分` 的 11 个模块整理 阿塔尼斯。依据 `游戏数据/官方合作指挥官/commanders/Artanis/` 的 JSON 摘要生成；具体 Ability、Behavior、Weapon、Actor、Effect、Requirement 闭包仍需继续追 `references/sc2-build-96883-casc-export/` 或实机 `[XM_DBG]` 日志。

## 官方数据摘要

| 项 | 值 |
|---|---|
| CommanderId | `ProtossArtanis` |
| 中文名 | 阿塔尼斯 |
| 默认升级 | `ArtanisCommander, SOAPylonPower, SOAOrbitalStrike, SOASuperShield` |
| 默认能力命令 | `SOAPylonPower:, SOAOrbitalStrikeActivate:, SOAOrbitalStrikeTargetingDummy:, SOAOrbitalStrikeExecute:, SoASuperShield:, RoboticsBayResearch:8` |
| 威望 ID | `CommanderPrestigeArtanisCombatAbilities, CommanderPrestigeArtanisPowerField, CommanderPrestigeArtanisOrbitalStrikes` |
| heroes 数量 | 0 |
| roster 数量 | 12 |
| units 数量 | 6 |
| buildings 数量 | 6 |
| command card 对象数 | 12 |
| upgrades 数量 | 28 |
| source | `mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/userdata.xml` |

roster 样例：

```text
HighTemplar, ImmortalAiur, Gateway, PhoenixAiur, TwilightCouncil, PhotonCannon, RoboticsBay, Zealot, StalkerAiur, RoboticsWarpandStarWarpGate, Observer, Archon
```

## 15 级解锁摘要

- 1: 即时正义
- 2: 亚顿之矛：守护之壳
- 3: 超级折跃门
- 4: 光影议会升级包
- 5: 新单位：掠夺者
- 6: 圣堂武士文献馆升级包
- 7: 高阶执政官
- 8: 亚顿之矛：折跃谐振
- 9: 机械研究所升级包
- 10: 亚顿之矛：太阳轰炸
- 11: 新单位：风暴战舰
- 12: 舰队航标升级包
- 13: 亚顿之矛：护盾超载
- 14: 亚顿之矛：太阳打击
- 15: 达拉姆的荣耀

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
| Lv8 亚顿之矛：折跃谐振 | 8 | `UpgradeToRoboticsFacilityWarp:` | `SOAWarpTech` | 使得折跃门科技可被用应用到星门和机械台上，这使它们能向任何被水晶塔能量场覆盖的地方折跃单位。 |
| Lv8 亚顿之矛：折跃谐振 | 8 | `UpgradeToStargateWarp:` | `SOAWarpTech` | 使得折跃门科技可被用应用到星门和机械台上，这使它们能向任何被水晶塔能量场覆盖的地方折跃单位。 |
| Lv10 亚顿之矛：太阳轰炸 | 10 | `SOAStrafeAttackActivate:` | `SOAStrafeAttack` | 解锁亚顿之矛的技能，在15秒内随机轰炸一处区域造成巨量伤害。通过顶部面板来激活太阳轰炸。 |
| Lv10 亚顿之矛：太阳轰炸 | 10 | `SOAStrafeAttack:` | `SOAStrafeAttack` | 解锁亚顿之矛的技能，在15秒内随机轰炸一处区域造成巨量伤害。通过顶部面板来激活太阳轰炸。 |
| Lv10 亚顿之矛：太阳轰炸 | 10 | `SOAStrafeAttackExecute:` | `SOAStrafeAttack` | 解锁亚顿之矛的技能，在15秒内随机轰炸一处区域造成巨量伤害。通过顶部面板来激活太阳轰炸。 |
| Lv12 舰队航标升级包 | 12 | `FleetBeaconResearch:7` | `-` | 在舰队航标中解锁以下升级： / 允许凤凰战机同时对两名目标使用引力光束。解锁风暴战舰的衰变技能，可在20秒内对目标单位或建筑造成500点伤害。 |
| Lv12 舰队航标升级包 | 12 | `LightningBomb:` | `-` | 在舰队航标中解锁以下升级： / 允许凤凰战机同时对两名目标使用引力光束。解锁风暴战舰的衰变技能，可在20秒内对目标单位或建筑造成500点伤害。 |
| Lv12 舰队航标升级包 | 12 | `FleetBeaconResearch:10` | `-` | 在舰队航标中解锁以下升级： / 允许凤凰战机同时对两名目标使用引力光束。解锁风暴战舰的衰变技能，可在20秒内对目标单位或建筑造成500点伤害。 |

### command card 命中

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 传送门 | `WarpInAdept` | 折跃使徒 | `GatewayTrain,Train7` | - | 远程特种单位。可以使用灵能传送。 / 可以对地。 |
| 传送门 | `UpgradeToWarpGate` | 变形为折跃门 | `UpgradeToWarpGate,Execute` | - | 将传送门升级为折跃门，使星灵可以利用折跃技术将地面单位召集到任何有水晶塔或折跃棱镜能量覆盖的区域。 |
| 凤凰 | `ResearchFenixScoutWeaponRange` | 研究战斗感应器阵列 | `FleetBeaconResearch,Research22` | - | 侦察机获得+3对空攻击射程和+1对地攻击射程。 |
| 凤凰 | `ResearchKaraxCarrerInterceptorLaunchSpeed` | 研究引力跃迁弹射器 | `FleetBeaconResearch,Research18` | - | 使航空母舰发射拦截机的速度变快，并且使拦截机的攻击速度提高{(Weapon,InterceptorBeam,Period-$UpgradeEffectAr... |
| 凤凰 | `ResearchVoidRaySpeedUpgrade` | 研发熔流旋叶 | `FleetBeaconResearch,Research5` | - | 提高虚空辉光舰的移动速度和移动加速度。 |

实现备注：面板只注册 profile 和转发 caster，地图不得按 commander 写 if/else。精通和威望影响面板冷却/充能/费用时，由本模块接收最终 modifier。

## 02. 英雄单位及其技能

Owner：`CommanderHeroProfile`、`CommanderHeroModeProfile`、`CommanderHeroAbilityProfile`、`CommanderHeroSkillTreeProfile`、`CommanderHeroReviveProfile`、`CommanderHeroModifierProfile`。

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| - | - | - | - | - | 官方 heroes.json 未列出英雄条目；召唤物/形态/特殊英雄需从 progression、command_cards 或 CASC 继续追 |

### 英雄/形态候选

- 亚顿之矛：守护之壳 (`ArtanisUnlockHeroicShield`)

口径：守护之壳必须作为全局救命机制接入，不能散在单位逻辑里。

待审计：Hero Unit、技能按钮、复活、形态切换、武器/Actor/Sound 闭包。

## 03. 普通单位技能及其进化功能

Owner：`CommanderUnitAbilityProfile`、`CommanderUnitStatProfile`、`CommanderUnitEvolutionProfile`、`CommanderUnitBehaviorProfile`、`CommanderUnitWeaponProfile`。

### 单位技能按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 执政官 | `MoveHoldPosition` | 原地防御 | `move,HoldPos` | - | 命令选中的单位待在原地，并攻击射程内的敌方目标。接受命令的单位不会对敌人进行追击或移向敌人与其交战。 |
| 执政官 | `MovePatrol` | 巡逻 | `move,Patrol` | - | 命令选中的单位在当前位置与目标区域间进行巡逻。巡逻的单位会对敌人发起攻击或移向附近的敌人与其交战。 |
| 执政官 | `HighTemplarEnergyUpgrade` | 心能水晶坠饰 | `-` | HaveHighTemplarEnergyUpgradeHighArchon | 使高阶圣堂武士的初始能量值提高{Upgrade,HighTemplarKhaydarinAmulet,EffectArray[0].Value}点。 |
| 执政官 | `HealingPsionicStorm` | HealingPsionicStorm | `-` | HaveHealingPsionicStormHighArchon | - |
| 执政官 | `FeedbackLocked` | 能量反蚀 | `-` | ArtanisLevel07 | 该技能将在指挥官等级7时解锁。 |
| 执政官 | `PsionicStormLocked` | 灵能风暴 | `-` | ArtanisLevel07 | 该技能将在指挥官等级7时解锁。 |
| 不朽者 | `MoveHoldPosition` | 原地防御 | `move,HoldPos` | - | 命令选中的单位待在原地，并攻击射程内的敌方目标。接受命令的单位不会对敌人进行追击或移向敌人与其交战。 |
| 不朽者 | `MovePatrol` | 巡逻 | `move,Patrol` | - | 命令选中的单位在当前位置与目标区域间进行巡逻。巡逻的单位会对敌人发起攻击或移向附近的敌人与其交战。 |
| 不朽者 | `HardenedShield` | 刚毅护盾 | `-` | - | 不朽者的护盾尚未消失前，能够将受到的伤害降低至最多10点。 |
| 不朽者 | `ImmortalOverload` | 屏障 | `ImmortalOverload,Execute` | - | 吸收最多{Behavior,ImmortalOverload,DamageResponse.ModifyLimit}点伤害，持续{Behavior,Tak... |
| 侦测器 | `MoveHoldPosition` | 原地防御 | `move,HoldPos` | - | 命令选中的单位待在原地，并攻击射程内的敌方目标。接受命令的单位不会对敌人进行追击或移向敌人与其交战。 |
| 侦测器 | `MovePatrol` | 巡逻 | `move,Patrol` | - | 命令选中的单位在当前位置与目标区域间进行巡逻。巡逻的单位会对敌人发起攻击或移向附近的敌人与其交战。 |
| 侦测器 | `AcquireMove` | 搜索移动 | `move,AcquireMove` | - | 命令选中的单位移至目标区域或跟随目标单位。进行搜索移动的单位不会与敌人交战。 |
| 侦测器 | `MorphtoObserverSiege` | 监察模式 | `ObserverMorphtoObserverSiege,Execute` | - | 把侦测器变形为监察模式。视野提高{(Unit,ObserverSiegeMode,Sight/Unit,Observer,Sight-1)*100}%，但... |
| 侦测器 | `MorphtoObserverSiege` | 监察模式 | `ObserverMorphtoObserverSiege,Execute` | - | 把侦测器变形为监察模式。视野提高{(Unit,ObserverSiegeMode,Sight/Unit,Observer,Sight-1)*100}%，但... |
| 侦测器 | `Detector` | 侦测单位 | `-` | - | 该单位能够侦测到隐形、潜地和幻像单位。 |
| 侦测器 | `Detector` | 侦测单位 | `-` | - | 该单位能够侦测到隐形、潜地和幻像单位。 |
| 侦测器 | `HaveGraviticBoosters` | 重力加速器 | `-` | HaveGraviticBoosters | 提高侦测器的移动速度50%。 |
| 龙骑士 | `VoidStalkerDragoonRange` | 奇点充能 | `-` | HaveSingularityCharge | 龙骑士的射程提高2。 |
| 狂热者 | `MoveHoldPosition` | 原地防御 | `move,HoldPos` | - | 命令选中的单位待在原地，并攻击射程内的敌方目标。接受命令的单位不会对敌人进行追击或移向敌人与其交战。 |
| 狂热者 | `MovePatrol` | 巡逻 | `move,Patrol` | - | 命令选中的单位在当前位置与目标区域间进行巡逻。巡逻的单位会对敌人发起攻击或移向附近的敌人与其交战。 |
| 狂热者 | `Charge` | 冲锋 | `Charge,Execute` | - | 允许狂热者能拦截附近的敌人。同时还会提高狂热者的移动速度。该技能每{Abil,Charge,Cost.Cooldown.TimeUse}秒最多只能使用一次。 |
| 狂热者 | `WhirlwindLocked` | 旋风斩 | `-` | ArtanisLevel04 | 该技能将在指挥官等级4时解锁。 |
| 高阶圣堂武士 | `MoveHoldPosition` | 原地防御 | `move,HoldPos` | - | 命令选中的单位待在原地，并攻击射程内的敌方目标。接受命令的单位不会对敌人进行追击或移向敌人与其交战。 |
| 高阶圣堂武士 | `MovePatrol` | 巡逻 | `move,Patrol` | - | 命令选中的单位在当前位置与目标区域间进行巡逻。巡逻的单位会对敌人发起攻击或移向附近的敌人与其交战。 |
| 高阶圣堂武士 | `AcquireMove` | 搜索移动 | `move,AcquireMove` | - | 命令选中的单位移至目标区域或跟随目标单位。进行搜索移动的单位不会与敌人交战。 |
| 高阶圣堂武士 | `HighTemplarEnergyUpgrade` | 心能水晶坠饰 | `-` | HaveHighTemplarEnergyUpgrade | 使高阶圣堂武士的初始能量值提高{Upgrade,HighTemplarKhaydarinAmulet,EffectArray[0].Value}点。 |
| 高阶圣堂武士 | `HealingPsionicStorm` | HealingPsionicStorm | `-` | HaveHealingPsionicStorm | - |
| 高阶圣堂武士 | `Feedback` | 能量反蚀 | `Feedback,Execute` | - | 抽取目标所有能量。每点能量造成{(Effect,Feedback,VitalFractionCurrent[Energy])}点伤害。 |
| 高阶圣堂武士 | `PsiStorm` | 灵能风暴 | `PsiStorm,Execute` | - | 召唤一股持续{time:8.4}的灵能风暴，对目标区域内的所有单位造成最多110点伤害。 |
| 高阶圣堂武士 | `AWrp` | 执政官融合 | `ArchonWarp,SelectedUnits` | - | 两名圣堂武士牺牲自身，融合为一名执政官。 / 可以对地和对空。 |

### 进化/形态/切换候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 传送门 | `SentryFenix` | 折跃保护者 | `GatewayTrain,Train15` | - | 净化者阵营 / 机械支援单位。可以使用防护场和相位模式。 / 可以对地和对空。 |
| 传送门 | `UpgradeToWarpGate` | 变形为折跃门 | `UpgradeToWarpGate,Execute` | - | 将传送门升级为折跃门，使星灵可以利用折跃技术将地面单位召集到任何有水晶塔或折跃棱镜能量覆盖的区域。 |
| 侦测器 | `MorphtoObserverSiege` | 监察模式 | `ObserverMorphtoObserverSiege,Execute` | - | 把侦测器变形为监察模式。视野提高{(Unit,ObserverSiegeMode,Sight/Unit,Observer,Sight-1)*100}%，但... |
| 侦测器 | `MorphtoObserverSiege` | 监察模式 | `ObserverMorphtoObserverSiege,Execute` | - | 把侦测器变形为监察模式。视野提高{(Unit,ObserverSiegeMode,Sight/Unit,Observer,Sight-1)*100}%，但... |
| 折跃机械台 | `MorphBackToRoboticsFacility` | MorphBackToRoboticsFacility | `MorphBackToRoboticsFacility,Execute` | - | - |

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
| 高阶圣堂武士 | `HighTemplar` | `HighTemplar, TemplarArchive` | Ground; Biological/Light/Psionic | 矿:50 气:150 人口字段:-2 生命:40 | 强大的灵能运用大师。能够使用能量反蚀技能，升级后可以使用灵能风暴技能。可以融合为执政官。 / 可以对地。 |
| 不朽者 | `ImmortalAiur` | `Immortal, ImmortalAiur, RoboticsFacility` | Ground; Armored/Mechanical | 矿:250 气:100 人口字段:-4 生命:200 | 攻击型步战机甲。可以使用屏障吸收伤害。 / 可以对地。 |
| 狂热者 | `Zealot` | `Zealot` | Ground; Biological/Light | 矿:100 气:- 人口字段:-2 生命:100 | 强大的近战战士。 / 可以对地。 |
| 龙骑士 | `StalkerAiur` | `Dragoon, Stalker` | -; - | 矿:- 气:- 人口字段:- 生命:100 | 远程步战机甲，拥有额外的生命值和攻击力。 / 可以对地和对空。 |
| 侦测器 | `Observer` | `Observer` | Air; Light/Mechanical | 矿:25 气:75 人口字段:-1 生命:40 | 间谍型空中单位。拥有永久隐形的能力。 / 侦测单位 |
| 执政官 | `Archon` | `Archon` | Ground; Massive | 矿:100 气:300 人口字段:-4 生命:10 | 强大的灵能战士。 / 可以对地和对空。 |

三阶段口径：`initial` 只做审计，`level15` 表示满级解锁，`power_fusion` 表示 15 级 + 六精通全满 + 威望正向收益后的默认运行清单。

## 06. 指挥官精通

Owner：`CommanderMasteryProfile`、`CommanderMasteryEffectProfile`、`CommanderMasteryModifierProfile`。

| 组 | 名称 | Upgrade | 每点 | 30点口径 |
|---|---|---|---|---|
| 1 | 护盾超载持续时间与强度 | `MasteryArtanisShieldOvercharge` | 3 | +90% |
| 1 | 守护之壳快速治疗 | `MasteryArtanisGuardianShellHeal` | 0.5 | +15% |
| 2 | 能量回复速度与冷却时间缩减 | `MasteryArtanisEnergyRegenCooldown` | 1.5 | +45% |
| 2 | 折跃的单位获得初始急速 | `MasteryArtanisSoAPowerFieldHaste` | 2 | +60% |
| 3 | 时空提速速度 | `MasteryArtanisChronoBoost` | 1 | -30% |
| 3 | 亚顿之矛初始和最大能量 | `MasteryArtanisStartingAndMaxSoAEnergy` | 3 | +90 |

实现备注：当前默认六项全部 30 点。表里的 30 点口径由 `point_increments * 30` 推导，最终数值仍需以 Upgrade Effect 闭包验证。

## 07. 指挥官建筑

Owner：`CommanderBuildingProfile`、`CommanderBuildingAbilityProfile`、`CommanderBuildingTrainProfile`、`CommanderBuildingStageProfile`、`CommanderBuildingBehaviorProfile`。

来源：官方提取 `buildings.json`。

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 传送门 | `Gateway` | `Gateway` | Ground; Mechanical | 矿:150 气:- 人口字段:- 生命:500 | 使星灵可以利用折跃技术召集地面单位。 / 开启： / - 狂热者 |
| 凤凰 | `PhoenixAiur` | `FleetBeacon, Phoenix, PhoenixAiur, Stargate` | Ground; Mechanical | 矿:300 气:200 人口字段:- 生命:500 | 空中优势战机。能够同时对两个敌人使用引力光束。 / 可以对空。 |
| 光影议会 | `TwilightCouncil` | `TwilightCouncil` | Ground; Mechanical | 矿:150 气:100 人口字段:- 生命:500 | 为狂热者、追猎者以及使徒提供升级方案。 |
| 光子炮台 | `PhotonCannon` | `PhotonCannon, Zealot` | Ground; Mechanical | 矿:150 气:- 人口字段:- 生命:150 | 主力防御建筑。 / 可以对地和对空。 / 侦测单位 |
| 机械研究所 | `RoboticsBay` | `RoboticsBay` | Ground; Mechanical | 矿:150 气:150 人口字段:- 生命:500 | 为侦测器、折跃棱镜和巨像提供升级方案。 / 开启： / - 可以在机械台中折跃巨像 / - 可以在机械台中折跃干扰者 |
| 折跃机械台 | `RoboticsWarpandStarWarpGate` | `RoboticsFacilityWarp, StargateWarp` | -; Mechanical | 矿:- 气:- 人口字段:- 生命:- | 允许折跃星灵机械单位。 / 开启： / - 不朽者 / - 侦测器 |

### 建筑按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
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
| 凤凰 | `ResearchFenixScoutWeaponRange` | 研究战斗感应器阵列 | `FleetBeaconResearch,Research22` | - | 侦察机获得+3对空攻击射程和+1对地攻击射程。 |
| 凤凰 | `ResearchCorsairPermanentCloakLocked` | 研究潜行驾驶 | `-` | VorazunLevel12 | 该科技将在指挥官等级12时解锁。 |
| 凤凰 | `ResearchFenixChampionScoutAOEMissilesLocked` | 研究压制程序 | `-` | FenixLevel12 | 该科技将在指挥官等级12时解锁。 |
| 凤凰 | `ResearchKaraxCarrerInterceptorLaunchSpeed` | 研究引力跃迁弹射器 | `FleetBeaconResearch,Research18` | - | 使航空母舰发射拦截机的速度变快，并且使拦截机的攻击速度提高{(Weapon,InterceptorBeam,Period-$UpgradeEffectAr... |
| 凤凰 | `TempestPassive` | TempestPassive | `-` | HaveVoidTempest | - |
| 凤凰 | `CancelBuilding` | 取消 | `BuildInProgress,Cancel` | - | 取消建造，摧毁尚未建造完成的建筑并返还部分资源。 |
| 凤凰 | `ResearchVoidRaySpeedUpgrade` | 研发熔流旋叶 | `FleetBeaconResearch,Research5` | - | 提高虚空辉光舰的移动速度和移动加速度。 |
| 凤凰 | `CarrierPassive` | CarrierPassive | `-` | - | - |
| 凤凰 | `MothershipPassive` | MothershipPassive | `-` | HaveVoidMothership | - |
| 凤凰 | `CarrierPassive` | CarrierPassive | `-` | HaveCarrier | - |
| 光子炮台 | `AttackBuilding` | 攻击 | `attack,Execute` | - | 锁定并且攻击目标，直到超出射程或对方被摧毁。 |
| 光子炮台 | `KaraxTurretRange` | 强化瞄准 | `-` | HaveKaraxTurretRange | 防御性建筑的射程提高2。 |
| 光子炮台 | `KaraxTurretAttackSpeed` | 军械优化 | `-` | HaveKaraxTurretAttackSpeed | 防御性建筑的攻击速度提高25%。 |
| 光子炮台 | `Detector` | 侦测单位 | `-` | NotUnderConstruction | 该单位能够侦测到隐形、潜地和幻像单位。 |
| 机械研究所 | `ResearchVanguardArmoredDamage` | 研究聚变迫击炮 | `RoboticsBayResearch,Research16` | - | 提高先锋对重甲单位的伤害。 |
| 机械研究所 | `ResearchAlarakVanguardIncreaseSplashAreaLocked` | 研究物质散化 | `-` | AlarakLevel06 | 该科技将在指挥官等级6时解锁。 |
| 机械研究所 | `FenixResearchDisruptorCloakLocked` | 研究隐形模块 | `-` | FenixLevel09 | 该科技将在指挥官等级9时解锁。 |
| 机械研究所 | `FenixResearchDisruptorSecondExplosionLocked` | 研究净化回荡 | `-` | FenixLevel09 | 该科技将在指挥官等级9时解锁。 |
| 机械研究所 | `ResearchZeratulImmortalRange` | 神器强化：原力炮 | `-` | HaveZeratulArtifactTier2AndRoboticsBay | 萨尔纳加执行者的歼灭炮可以击退敌方空中单位，并且对轰击路线沿途的单位造成{Effect,ZeratulPhaseDisruptorsAir,AreaArr... |
| 机械研究所 | `ColossusPassive` | ColossusPassive | `-` | HaveColossus | - |
| 机械研究所 | `ZeratulResearchImprovedBarrier` | 神器强化：永恒屏障 | `-` | HaveZeratulArtifactTier3AndRoboticsBay | 萨尔纳加执行者屏障吸收的伤害量提高{$UpgradeEffectArrayValue:ZeratulArtifactTier3_RoboticsBay:B... |
| 机械研究所 | `ResearchFenixWarbringerColossusPowerShotLocked` | 研究净化轰击 | `-` | FenixLevel14 | 该科技将在指挥官等级14时解锁。 |
| 机械研究所 | `FenixImmortalResearchDetonationShotLocked` | 研究重力过载 | `-` | FenixLevel12 | 该科技将在指挥官等级12时解锁。 |
| 机械研究所 | `CancelBuilding` | 取消 | `BuildInProgress,Cancel` | - | 取消建造，摧毁尚未建造完成的建筑并返还部分资源。 |
| 机械研究所 | `ReaverPassive` | ReaverPassive | `-` | HaveVoidReaver | - |
| 折跃机械台 | `Observer` | 折跃侦测器 | `RoboticsFacilityWarpTrain,Train2` | - | 间谍型空中单位。拥有永久隐形的能力。 / 侦测单位 |
| 折跃机械台 | `SuperiorWarpRoboticsFacilities` | 超级机械折跃台 | `-` | HaveSuperiorWarpGates | 机械折跃台最多能拥有3次充能。 |
| 折跃机械台 | `MorphBackToRoboticsFacility` | MorphBackToRoboticsFacility | `MorphBackToRoboticsFacility,Execute` | - | - |
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

实现备注：建筑声明自身生产、研究、行为和阶段；训练单位的最终可用性由兵种/科技/精通/威望共同裁决。

## 08. 科技建筑及其升级选项

Owner：`CommanderTechBuildingProfile`、`CommanderUnitTechProfile`、`CommanderUpgradeProfile`、`CommanderUpgradeRequirementProfile`、`CommanderUpgradeEffectProfile`。

### 15 级解锁与研究命令

| 等级 | 名称 | 解锁升级 | 解锁 AbilityCmd | 说明 |
|---|---|---|---|---|
| 1 | 即时正义 | `-` | `-` | 阿塔尼斯在战场上折跃单位几乎不耗费任何时间。 |
| 2 | 亚顿之矛：守护之壳 | `SOAHeroicShield` | `-` | 在受到致命伤时，友方单位会暂时无敌一段时间，逃离死亡并恢复15%生命值和护盾。同一单位在4分钟内最多只能触发一次该效果。 / 被动技能。 |
| 3 | 超级折跃门 | `SOAWarpGateCharges` | `-` | 使折跃门的充能次数由1提高至3。 |
| 4 | 光影议会升级包 | `VoidZealotWhirlwind` | `TwilightCouncilResearch:2, VoidZealotWhirlwind:, TwilightCouncilResearch:6` | 在光影议会中解锁以下升级： / 解锁狂热者的旋风斩技能，在激活期间可对附近的所有敌人造成伤害。使龙骑士的生命值由100点提高至120点，并且护盾恢复速度加倍。还允许龙骑士在战... |
| 5 | 新单位：掠夺者 | `ArtanisUnlockReaver` | `-` | 范围伤害攻城部队。能够建造并发射金甲虫，造成爆发性伤害。可在机械台中进行折跃。 / 可以对地。 |
| 6 | 圣堂武士文献馆升级包 | `-` | `TemplarArchivesResearch:5, TemplarArchivesResearch:6` | 在圣堂武士文献馆中解锁以下升级： / 使高阶圣堂武士的起始能量从50提高至200。升级高阶圣堂武士的灵能风暴技能，使目标区域内的友方单位恢复50点护盾。 |
| 7 | 高阶执政官 | `ArtanisUnlockHighArchon` | `FeedbackArchon:, PsiStormArchon:` | 解锁执政官的能量反蚀和灵能风暴技能。 |
| 8 | 亚顿之矛：折跃谐振 | `SOAWarpTech` | `UpgradeToRoboticsFacilityWarp:, UpgradeToStargateWarp:` | 使得折跃门科技可被用应用到星门和机械台上，这使它们能向任何被水晶塔能量场覆盖的地方折跃单位。 |
| 9 | 机械研究所升级包 | `-` | `RoboticsBayResearch:12, RoboticsBayResearch:13` | 在机械研究所中解锁以下升级： / 使掠夺者能容纳的金甲虫最大数从5只提高至10只。使金甲虫的爆炸溅射范围扩大25%。 |
| 10 | 亚顿之矛：太阳轰炸 | `SOAStrafeAttack` | `SOAStrafeAttackActivate:, SOAStrafeAttack:, SOAStrafeAttackExecute:` | 解锁亚顿之矛的技能，在15秒内随机轰炸一处区域造成巨量伤害。通过顶部面板来激活太阳轰炸。 |
| 11 | 新单位：风暴战舰 | `ArtanisUnlockTempest` | `-` | 攻城炮舰。可从远距离外进行攻击。 / 可以对地和对空。 |
| 12 | 舰队航标升级包 | `-` | `FleetBeaconResearch:7, LightningBomb:, FleetBeaconResearch:10` | 在舰队航标中解锁以下升级： / 允许凤凰战机同时对两名目标使用引力光束。解锁风暴战舰的衰变技能，可在20秒内对目标单位或建筑造成500点伤害。 |
| 13 | 亚顿之矛：护盾超载 | `SOASuperShieldUpgrade` | `-` | 使亚顿之矛的护盾超载可吸收的伤害量由100点提高至200点。通过顶部面板来激活护盾超载。 |
| 14 | 亚顿之矛：太阳打击 | `SOAStrafeAttackUpgrade` | `-` | 使亚顿之矛的太阳轰炸的轰击次数从200次提升至400次。通过顶部面板来激活太阳轰炸。 |
| 15 | 达拉姆的荣耀 | `ArtanisStartingSupply` | `-` | 使起始补给提高到200。 |

### Upgrade 摘要

| Upgrade | 父级 | 显示名 | Effect数 | 说明 |
|---|---|---|---|---|
| `ArtanisCommander` | `-` | 阿塔尼斯 | 58 | - |
| `ArtanisStartingSupply` | `-` | Artanis Starting Supply | 1 | - |
| `ArtanisUnlockHighArchon` | `-` | Artanis Unlock High Archon | 9 | - |
| `ArtanisUnlockReaver` | `-` | Artanis Unlock Reaver | 3 | - |
| `ArtanisUnlockTempest` | `-` | Artanis Unlock Tempest | 3 | - |
| `CommanderPrestigeArtanisCombatAbilities` | `CommanderPrestige` | 勇敢激励者 | 26 | 优点 / 所有激活的战斗单位技能效果提高100%。 / 缺点 / 战斗单位消耗的资源提高30%。 |
| `CommanderPrestigeArtanisCombatAbilitiesImmortalBarrierUpgrade` | `CommanderPrestige` | - | 1 | - |
| `CommanderPrestigeArtanisCombatAbilitiesMasteryEnergyRegenCooldown` | `CommanderPrestige` | - | 2 | - |
| `CommanderPrestigeArtanisOrbitalStrikes` | `CommanderPrestige` | - | 6 | - |
| `CommanderPrestigeArtanisOrbitalStrikesShared` | `CommanderPrestige` | - | 0 | - |
| `CommanderPrestigeArtanisPowerField` | `CommanderPrestige` | 星灵使节 | 3 | 优点 / 使用时，投射能量场将你的战斗单位从一个已经存在的力场投射器中折跃出来，并将他们折跃到新的位置。移除冷却时间。 / 缺点 / 投射能量场消耗25能量。 |
| `ImmortalResearchBarrierAdvanced` | `-` | 强化屏障 | 1 | - |
| `MasteryArtanisChronoBoost` | `-` | 精通 阿塔尼斯 时空提速 | 8 | 提高时空提速的速度加成。 |
| `MasteryArtanisEnergyRegenCooldown` | `-` | 能量回复速度与冷却时间缩减 | 9 | 提高阿塔尼斯所有单位的能量回复速度与技能冷却速度。 |
| `MasteryArtanisGuardianShellHeal` | `-` | 精通 阿塔尼斯 守护者之壳治疗 | 3 | 触发后，守护之壳恢复额外的生命值和护盾。 |
| `MasteryArtanisShieldOvercharge` | `-` | 精通 阿塔尼斯 护盾超载 | 4 | 提高护盾超载的持续时间和伤害吸收量。 |
| `MasteryArtanisSoAPowerFieldHaste` | `-` | 精通 阿塔尼斯 亚顿之矛能量场折跃急速 | 7 | 阿塔尼斯的单位在折跃后，其攻击速度、移动速度、冷却时间缩减以及能量恢复暂时获得提高。 |
| `MasteryArtanisStartingAndMaxSoAEnergy` | `-` | 精通 阿塔尼斯 亚顿之矛起始和最大能量值 | 3 | 提高亚顿之矛的初始和最大能量值。 |
| `SOAHeroicShield` | `-` | - | 3 | 友方单位在{time:5}内获得无敌并免于死亡。还会恢复{Effect,MasteryArtanisGuardianShellHealDisplayDummy,A... |
| `SOAOrbitalStrike` | `-` | - | 0 | 从高空轨道向战场发射5束激光，每一束造成{Effect,SOAOrbitalStrikeDamage,Amount}({Effect,SOAOrbitalStri... |
| `SOAPylonPower` | `-` | - | 0 | - |
| `SOAStrafeAttack` | `-` | - | 0 | - |
| `SOAStrafeAttackUpgrade` | `-` | SOAStrafe Attack Upgrade | 1 | - |
| `SOASuperShield` | `-` | - | 0 | - |
| `SOASuperShieldUpgrade` | `-` | SOASuper Shield Upgrade | 1 | - |
| `SOAWarpGateCharges` | `-` | - | 0 | - |
| `SOAWarpTech` | `-` | - | 0 | 折跃门研究影响星门和机械台，使它们能将单位折跃到任何有水晶能量场的位置。 |
| `VoidZealotWhirlwind` | `-` | - | 2 | - |

### 研究/升级按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 执政官 | `HighTemplarEnergyUpgrade` | 心能水晶坠饰 | `-` | HaveHighTemplarEnergyUpgradeHighArchon | 使高阶圣堂武士的初始能量值提高{Upgrade,HighTemplarKhaydarinAmulet,EffectArray[0].Value}点。 |
| 传送门 | `UpgradeToWarpGate` | 变形为折跃门 | `UpgradeToWarpGate,Execute` | - | 将传送门升级为折跃门，使星灵可以利用折跃技术将地面单位召集到任何有水晶塔或折跃棱镜能量覆盖的区域。 |
| 凤凰 | `ResearchFenixScoutWeaponRange` | 研究战斗感应器阵列 | `FleetBeaconResearch,Research22` | - | 侦察机获得+3对空攻击射程和+1对地攻击射程。 |
| 凤凰 | `ResearchCorsairPermanentCloakLocked` | 研究潜行驾驶 | `-` | VorazunLevel12 | 该科技将在指挥官等级12时解锁。 |
| 凤凰 | `ResearchFenixChampionScoutAOEMissilesLocked` | 研究压制程序 | `-` | FenixLevel12 | 该科技将在指挥官等级12时解锁。 |
| 凤凰 | `ResearchKaraxCarrerInterceptorLaunchSpeed` | 研究引力跃迁弹射器 | `FleetBeaconResearch,Research18` | - | 使航空母舰发射拦截机的速度变快，并且使拦截机的攻击速度提高{(Weapon,InterceptorBeam,Period-$UpgradeEffectAr... |
| 凤凰 | `ResearchVoidRaySpeedUpgrade` | 研发熔流旋叶 | `FleetBeaconResearch,Research5` | - | 提高虚空辉光舰的移动速度和移动加速度。 |
| 机械研究所 | `ResearchVanguardArmoredDamage` | 研究聚变迫击炮 | `RoboticsBayResearch,Research16` | - | 提高先锋对重甲单位的伤害。 |
| 机械研究所 | `ResearchAlarakVanguardIncreaseSplashAreaLocked` | 研究物质散化 | `-` | AlarakLevel06 | 该科技将在指挥官等级6时解锁。 |
| 机械研究所 | `FenixResearchDisruptorCloakLocked` | 研究隐形模块 | `-` | FenixLevel09 | 该科技将在指挥官等级9时解锁。 |
| 机械研究所 | `FenixResearchDisruptorSecondExplosionLocked` | 研究净化回荡 | `-` | FenixLevel09 | 该科技将在指挥官等级9时解锁。 |
| 机械研究所 | `ResearchZeratulImmortalRange` | 神器强化：原力炮 | `-` | HaveZeratulArtifactTier2AndRoboticsBay | 萨尔纳加执行者的歼灭炮可以击退敌方空中单位，并且对轰击路线沿途的单位造成{Effect,ZeratulPhaseDisruptorsAir,AreaArr... |
| 机械研究所 | `ZeratulResearchImprovedBarrier` | 神器强化：永恒屏障 | `-` | HaveZeratulArtifactTier3AndRoboticsBay | 萨尔纳加执行者屏障吸收的伤害量提高{$UpgradeEffectArrayValue:ZeratulArtifactTier3_RoboticsBay:B... |
| 机械研究所 | `ResearchFenixWarbringerColossusPowerShotLocked` | 研究净化轰击 | `-` | FenixLevel14 | 该科技将在指挥官等级14时解锁。 |
| 机械研究所 | `FenixImmortalResearchDetonationShotLocked` | 研究重力过载 | `-` | FenixLevel12 | 该科技将在指挥官等级12时解锁。 |
| 光影议会 | `ArmorResearchSupplicantShieldArmor` | 研究鲜血护盾 | `TwilightCouncilResearch,Research25` | - | 降低敌人对死徒的护盾造成的伤害。 |
| 光影议会 | `ResearchReconstructionLocked` | 研究重构 | `-` | KaraxLevel04 | 该科技将在指挥官等级4时解锁。 |
| 光影议会 | `ResearchFenixKaldalisZealotCleaveLocked` | 研究充能利刃 | `-` | FenixLevel04 | 该科技将在指挥官等级4时解锁。 |
| 光影议会 | `FenixTalisAdeptLearnBounceShotUpgradeLocked` | 研究衰弱系统 | `-` | FenixLevel04 | 该科技将在指挥官等级4时解锁。 |
| 光影议会 | `ResearchDragoonRange` | 研究奇点充能 | `TwilightCouncilResearch,Research6` | - | 龙骑士的射程+2。 |
| 光影议会 | `ResearchWhirlwind` | 研究旋风斩 | `TwilightCouncilResearch,Research3` | - | 使狂热者可以使用旋风斩技能。旋风斩在激活时会对附近所有敌人造成伤害。 |
| 光影议会 | `ResearchReclamationLocked` | 研究回收 | `-` | KaraxLevel04 | 该科技将在指挥官等级4时解锁。 |
| 光影议会 | `AdeptResearchPiercingUpgrade` | 研究共鸣之刃 | `-` | - | 使徒的攻击速度提高45%。 |
| 光影议会 | `ResearchShadowStun` | 研究黑暗缠绕 | `TwilightCouncilResearch,Research9` | - | 使百夫长能击晕附近的敌人，并使他们的护盾值在一小段时间内提高{Behavior,VoidZealotShadowChargeSelfBuff,Modifi... |
| 高阶圣堂武士 | `HighTemplarEnergyUpgrade` | 心能水晶坠饰 | `-` | HaveHighTemplarEnergyUpgrade | 使高阶圣堂武士的初始能量值提高{Upgrade,HighTemplarKhaydarinAmulet,EffectArray[0].Value}点。 |

实现备注：科技建筑只负责展示/触发研究；每个单位升级效果由对应 `CommanderUnitTechProfile` 或 `CommanderUpgradeEffectProfile` 声明。

## 09. 特定地图运输机空投单位

Owner：`CommanderCargoLoadoutProfile`、`CommanderMapDropProfile`、`CommanderScenarioFallbackProfile`。

### 运输/空投能力候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 传送门 | `WarpInSupplicant` | 折跃死徒 | `GatewayTrain,Train11` | - | 近战战士。在阿拉纳克濒临死亡时牺牲自己来为他治疗。死徒可以同时折跃两个。 / 可以对地。 |
| 传送门 | `SentryFenix` | 折跃保护者 | `GatewayTrain,Train15` | - | 净化者阵营 / 机械支援单位。可以使用防护场和相位模式。 / 可以对地和对空。 |
| 传送门 | `Stalker` | 折跃追猎者 | `GatewayTrain,Train2` | - | 远程支援型步战机甲。 / 可以对地和对空。 |
| 传送门 | `WarpInAdept` | 折跃使徒 | `GatewayTrain,Train7` | - | 远程特种单位。可以使用灵能传送。 / 可以对地。 |
| 传送门 | `WarpinAscendentLocked` | 折跃晋升者 | `-` | AlarakLevel08 | 该单位将在指挥官等级8时解锁。 |
| 传送门 | `DarkTemplar` | 折跃黑暗圣堂武士 | `GatewayTrain,Train5` | - | 致命的近战杀手，该单位永远处于隐形状态，敌人在不借助侦测单位帮助的情况下无法发现他。可以融合为执政官。 / 可以对地。 |
| 传送门 | `WarpInDarkArchonLocked` | 折跃黑暗执政官 | `-` | VorazunLevel05 | 该技能将在指挥官等级5时解锁。 |
| 传送门 | `UpgradeToWarpGate` | 变形为折跃门 | `UpgradeToWarpGate,Execute` | - | 将传送门升级为折跃门，使星灵可以利用折跃技术将地面单位召集到任何有水晶塔或折跃棱镜能量覆盖的区域。 |
| 传送门 | `AlarakMasteryUnitAttackSpeed` | 战斗精通 | `-` | HaveMasteryAlarakUnitAttackSpeed | 精通：折跃在该建筑旁边的单位获得{Effect,MasteryAlarakUnitAttackSpeedDisplayDummy,Amount}%攻击速度。 |
| 不朽者 | `ImmortalOverload` | 屏障 | `ImmortalOverload,Execute` | - | 吸收最多{Behavior,ImmortalOverload,DamageResponse.ModifyLimit}点伤害，持续{Behavior,Tak... |
| 折跃机械台 | `Observer` | 折跃侦测器 | `RoboticsFacilityWarpTrain,Train2` | - | 间谍型空中单位。拥有永久隐形的能力。 / 侦测单位 |
| 折跃机械台 | `SuperiorWarpRoboticsFacilities` | 超级机械折跃台 | `-` | HaveSuperiorWarpGates | 机械折跃台最多能拥有3次充能。 |
| 高阶圣堂武士 | `AWrp` | 执政官融合 | `ArchonWarp,SelectedUnits` | - | 两名圣堂武士牺牲自身，融合为一名执政官。 / 可以对地和对空。 |

### 可投放单位候选

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 高阶圣堂武士 | `HighTemplar` | `HighTemplar, TemplarArchive` | Ground; Biological/Light/Psionic | 矿:50 气:150 人口字段:-2 生命:40 | 强大的灵能运用大师。能够使用能量反蚀技能，升级后可以使用灵能风暴技能。可以融合为执政官。 / 可以对地。 |
| 不朽者 | `ImmortalAiur` | `Immortal, ImmortalAiur, RoboticsFacility` | Ground; Armored/Mechanical | 矿:250 气:100 人口字段:-4 生命:200 | 攻击型步战机甲。可以使用屏障吸收伤害。 / 可以对地。 |
| 狂热者 | `Zealot` | `Zealot` | Ground; Biological/Light | 矿:100 气:- 人口字段:-2 生命:100 | 强大的近战战士。 / 可以对地。 |
| 龙骑士 | `StalkerAiur` | `Dragoon, Stalker` | -; - | 矿:- 气:- 人口字段:- 生命:100 | 远程步战机甲，拥有额外的生命值和攻击力。 / 可以对地和对空。 |
| 侦测器 | `Observer` | `Observer` | Air; Light/Mechanical | 矿:25 气:75 人口字段:-1 生命:40 | 间谍型空中单位。拥有永久隐形的能力。 / 侦测单位 |
| 执政官 | `Archon` | `Archon` | Ground; Massive | 矿:100 气:300 人口字段:-4 生命:10 | 强大的灵能战士。 / 可以对地和对空。 |

实现备注：运输机空投不要读取地图硬编码单位组，应从 `CommanderCargoLoadoutProfile` 读取当前 commander 的 `power_fusion` 单位清单和场景过滤规则。

## 10. 指挥官特殊机制

Owner：`CommanderSpecialMechanicProfile`、`CommanderSpecialResourceProfile`、`CommanderSpecialMechanicHookProfile`、`CommanderSpecialMechanicUnitProfile`。

本指挥官重点：守护之壳、能量场投射、太阳轰炸/轨道技能是主特殊机制。

### 特殊机制命中项

- 亚顿之矛：守护之壳 (`ArtanisUnlockHeroicShield`)
- 亚顿之矛：折跃谐振 (`ArtanisUnlockWarpTech`)
- 亚顿之矛：太阳轰炸 (`ArtanisUnlockStrafeAttack`)
- 亚顿之矛：护盾超载 (`ArtanisImprovedSuperShields`)
- 亚顿之矛：太阳打击 (`ArtanisImprovedStrafeAttack`)

### 特殊机制 Upgrade 候选

- 勇敢激励者 (`CommanderPrestigeArtanisCombatAbilities`)
- CommanderPrestigeArtanisCombatAbilitiesImmortalBarrierUpgrade (`CommanderPrestigeArtanisCombatAbilitiesImmortalBarrierUpgrade`)
- CommanderPrestigeArtanisCombatAbilitiesMasteryEnergyRegenCooldown (`CommanderPrestigeArtanisCombatAbilitiesMasteryEnergyRegenCooldown`)
- CommanderPrestigeArtanisOrbitalStrikes (`CommanderPrestigeArtanisOrbitalStrikes`)
- CommanderPrestigeArtanisOrbitalStrikesShared (`CommanderPrestigeArtanisOrbitalStrikesShared`)
- 星灵使节 (`CommanderPrestigeArtanisPowerField`)
- 精通 阿塔尼斯 守护者之壳治疗 (`MasteryArtanisGuardianShellHeal`)
- 精通 阿塔尼斯 亚顿之矛能量场折跃急速 (`MasteryArtanisSoAPowerFieldHaste`)
- 精通 阿塔尼斯 亚顿之矛起始和最大能量值 (`MasteryArtanisStartingAndMaxSoAEnergy`)
- SOAHeroicShield (`SOAHeroicShield`)

### 特殊机制按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 执政官 | `HighTemplarEnergyUpgrade` | 心能水晶坠饰 | `-` | HaveHighTemplarEnergyUpgradeHighArchon | 使高阶圣堂武士的初始能量值提高{Upgrade,HighTemplarKhaydarinAmulet,EffectArray[0].Value}点。 |
| 凤凰 | `ResearchFenixChampionScoutAOEMissilesLocked` | 研究压制程序 | `-` | FenixLevel12 | 该科技将在指挥官等级12时解锁。 |
| 机械研究所 | `ResearchZeratulImmortalRange` | 神器强化：原力炮 | `-` | HaveZeratulArtifactTier2AndRoboticsBay | 萨尔纳加执行者的歼灭炮可以击退敌方空中单位，并且对轰击路线沿途的单位造成{Effect,ZeratulPhaseDisruptorsAir,AreaArr... |
| 机械研究所 | `ZeratulResearchImprovedBarrier` | 神器强化：永恒屏障 | `-` | HaveZeratulArtifactTier3AndRoboticsBay | 萨尔纳加执行者屏障吸收的伤害量提高{$UpgradeEffectArrayValue:ZeratulArtifactTier3_RoboticsBay:B... |
| 高阶圣堂武士 | `HighTemplarEnergyUpgrade` | 心能水晶坠饰 | `-` | HaveHighTemplarEnergyUpgrade | 使高阶圣堂武士的初始能量值提高{Upgrade,HighTemplarKhaydarinAmulet,EffectArray[0].Value}点。 |

实现备注：凡是涉及局内状态、资源、堆叠、全局计时器、隐藏 caster 的机制，都必须有 runtime hook 和 `[XM_DBG]` 日志。

## 11. 指挥官个性化机制

Owner：`CommanderPersonalMechanicProfile`、`CommanderPersonalMechanicEffectProfile`、`CommanderPersonalMechanicHookProfile`、`CommanderPersonalMechanicRequirementProfile`。

本指挥官重点：守护之壳必须作为全局救命机制接入，不能散在单位逻辑里。

### 威望正向融合输入

| 威望 ID | Primary Upgrade | 禁用单位 | 启用单位 | 禁用 Ability | 补充 Upgrade |
|---|---|---|---|---|---|
| `CommanderPrestigeArtanisCombatAbilities` | `CommanderPrestigeArtanisCombatAbilities` | `-` | `-` | `-` | `ArtanisCombatAbilities1, ArtanisCombatAbilities2` |
| `CommanderPrestigeArtanisPowerField` | `CommanderPrestigeArtanisPowerField` | `-` | `-` | `-` | `-` |
| `CommanderPrestigeArtanisOrbitalStrikes` | `CommanderPrestigeArtanisOrbitalStrikes` | `-` | `-` | `-` | `-` |

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
[XM_DBG][INFO][COMMANDER_PROFILE_LOAD] commander=Artanis levelMode=FullLevel15 masteryMode=AllSixMax rosterStage=power_fusion result=ok
[XM_DBG][INFO][POWER_FUSION_APPLY] commander=Artanis levelMode=FullLevel15 masteryMode=AllSixMax prestigeMode=SelectedPositive result=ok
[XM_DBG][INFO][ROSTER_LOAD] commander=Artanis stage=power_fusion units=6 buildings=6 result=ok
[XM_DBG][INFO][MODULE_VERIFY] commander=Artanis module=<01-11> profile=<profile> result=ok
[XM_DBG][WARN][CASC_AUDIT_REQUIRED] commander=Artanis module=<module> object=<object> result=needs-casc-audit
```

## 第一轮待审计项

- 顶部技能的 caster、按钮、冷却、充能、目标转发闭包。
- 英雄或特殊英雄的 Unit、Ability、Behavior、Weapon、Actor、Sound 闭包。
- `power_fusion` 最终 roster 与 `level15` roster 的新增、替换、变体关系。
- 6 项精通的真实作用对象和最终数值。
- 3 个威望的正面收益、负面代价、disable/suppress、费用/冷却/上限变化。
- 科技建筑研究按钮、Requirement、Upgrade effect 是否完整。
- 特殊机制和个性化机制是否需要 runtime hook。
