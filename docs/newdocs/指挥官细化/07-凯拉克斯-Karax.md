# 凯拉克斯（Karax）指挥官细化

日期：2026-05-27

## 当前口径

当前指挥官默认 15 级，不从 1 级开始；精通默认 6 项全部 30 点；威望默认只取正面收益，不直接启用官方 `PlayerPrestige`。`initial` 只作为官方基础状态审计和差异对照，默认测试和玩法应看 `power_fusion` 最终状态。

本文件按 `docs/newdocs/模块拆分` 的 11 个模块整理 凯拉克斯。依据 `游戏数据/官方合作指挥官/commanders/Karax/` 的 JSON 摘要生成；具体 Ability、Behavior、Weapon、Actor、Effect、Requirement 闭包仍需继续追 `references/sc2-build-96883-casc-export/` 或实机 `[XM_DBG]` 日志。

## 官方数据摘要

| 项 | 值 |
|---|---|
| CommanderId | `ProtossKarax` |
| 中文名 | 凯拉克斯 |
| 默认升级 | `KaraxCommander, SOAOrbitalStrike, SOAThermalLance, SOAMapWideChrono` |
| 默认能力命令 | `SOAOrbitalStrikeActivate:, SOAOrbitalStrikeTargetingDummy:, SOAOrbitalStrikeExecute:, SOAThermalLanceActivate:, SOAThermalLanceTargetingDummy:, SOAThermalLanceExecute:, SOAMapWideChrono:, RoboticsBayResearch:11, CyberneticsCoreResearch:6` |
| 威望 ID | `CommanderPrestigeKaraxStructures, CommanderPrestigeKaraxArmy, CommanderPrestigeKaraxTopBar` |
| heroes 数量 | 0 |
| roster 数量 | 13 |
| units 数量 | 7 |
| buildings 数量 | 6 |
| command card 对象数 | 13 |
| upgrades 数量 | 26 |
| source | `mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/userdata.xml` |

roster 样例：

```text
Colossus, Carrier, ImmortalAiur, Gateway, TwilightCouncil, PhotonCannon, ShieldBattery, SentryPurifier, ZealotPurifier, SolarForge, Scout, Observer, PhoenixPurifier
```

## 15 级解锁摘要

- 1: 机械大师
- 2: 亚顿之矛：提速力场
- 3: 新单位：凯达琳巨石
- 4: 光影议会升级包
- 5: 亚顿之矛：时空过载
- 6: 锻炉升级包
- 7: 亚顿之矛：重构光束
- 8: 太阳锻炉升级包1
- 9: 机械研究所升级包
- 10: 亚顿之矛：净化光束
- 11: 卡莱智慧
- 12: 太阳锻炉升级包2
- 13: 亚顿之矛：净化协议
- 14: 舰队航标升级包
- 15: 统和屏障

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
| Lv8 太阳锻炉升级包1 | 8 | `SolarForgeResearch:2` | `-` | 在太阳锻炉解锁以下升级： / 重构光束可以影响一个额外目标。太阳能利用率等级3。 |
| Lv8 太阳锻炉升级包1 | 8 | `SolarForgeResearch:3` | `-` | 在太阳锻炉解锁以下升级： / 重构光束可以影响一个额外目标。太阳能利用率等级3。 |
| Lv12 太阳锻炉升级包2 | 12 | `SolarForgeResearch:4` | `-` | 在太阳锻炉解锁以下升级： / 轨道轰炸会使区域内的敌人昏迷。太阳能射线枪会在地面上留下火焰，造成额外的持续伤害。 |
| Lv12 太阳锻炉升级包2 | 12 | `SolarForgeResearch:5` | `-` | 在太阳锻炉解锁以下升级： / 轨道轰炸会使区域内的敌人昏迷。太阳能射线枪会在地面上留下火焰，造成额外的持续伤害。 |
| Lv14 舰队航标升级包 | 14 | `FleetBeaconResearch:16` | `KaraxCarrierUpgrade` | 在舰队航标中解锁以下升级： / 允许幻影战机在受到伤害后暂时无敌。允许航母自动修理附近的机械单位。 |
| Lv14 舰队航标升级包 | 14 | `FleetBeaconResearch:9` | `KaraxCarrierUpgrade` | 在舰队航标中解锁以下升级： / 允许幻影战机在受到伤害后暂时无敌。允许航母自动修理附近的机械单位。 |

### command card 命中

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
| 侦察机 | `ResearchFenixScoutWeaponRange` | 研究战斗感应器阵列 | `FleetBeaconResearch,Research22` | - | 侦察机获得+3对空攻击射程和+1对地攻击射程。 |
| 侦察机 | `ResearchKaraxCarrerInterceptorLaunchSpeed` | 研究引力跃迁弹射器 | `FleetBeaconResearch,Research18` | - | 使航空母舰发射拦截机的速度变快，并且使拦截机的攻击速度提高{(Weapon,InterceptorBeam,Period-$UpgradeEffectAr... |
| 侦察机 | `ResearchVoidRaySpeedUpgrade` | 研发熔流旋叶 | `FleetBeaconResearch,Research5` | - | 提高虚空辉光舰的移动速度和移动加速度。 |
| 太阳锻炉 | `ResearchSolarEfficiencyLevel3Locked` | 研究太阳能利用率等级3 | `-` | KaraxLevel08 | 该科技将在指挥官等级8时解锁。 |
| 太阳锻炉 | `ResearchSOARepairBeamExtraTargetLocked` | 研究强化修理系统 | `-` | KaraxLevel08 | 该科技将在指挥官等级8时解锁。 |
| 太阳锻炉 | `ResearchSOAOrbitalStrikeUpgradeLocked` | 研究相位爆裂 | `-` | KaraxLevel12 | 该科技将在指挥官等级12时解锁。 |
| 太阳锻炉 | `ResearchSOASolarLanceUpgradeLocked` | 研究太阳耀斑 | `-` | KaraxLevel12 | 该科技将在指挥官等级12时解锁。 |
| 太阳锻炉 | `SolarEfficiencyPassiveLevel3` | 太阳能利用率等级3 | `-` | HaveSolarEfficiencyLevel3 | 每为亚顿之矛产生{Effect,SolarForgeSolarEfficiency3MU,VitalArray[Energy].Change}点能量值。 |
| 太阳锻炉 | `SOARepairBeamExtraTargetPassive` | 强化修理系统 | `-` | HaveSOARepairBeamExtraTarget | 使亚顿之矛的重构光束能影响{$UpgradeEffectArrayValue:SOARepairBeamExtraTarget:Effect,KaraxR... |
| 太阳锻炉 | `SOAOrbitalStrikeUpgradePassive` | 相位爆裂 | `-` | HaveSOAOrbitalStrikeUpgrade | 亚顿之矛的轨道轰炸能使目标区域的敌人昏迷{Behavior,OrbitalStrikeStun,Duration}秒。 |
| 太阳锻炉 | `SOASolarLanceUpgradePassive` | 太阳耀斑 | `-` | HaveSOASolarLanceUpgrade | 亚顿之矛的太阳能射线枪点燃沿途的地面，在{Effect,SOASolarLanceFireBeamCP,PeriodCount*Effect,SOASol... |
| 太阳锻炉 | `BrokenSolarForge` | 损坏的太阳锻炉 | `BrokenSolarForge,Execute` | - | 修理太阳锻炉 |

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

口径：无常规英雄；亚顿之矛不是英雄单位。

待审计：Hero Unit、Ability、Behavior、Weapon、Actor、Sound、复活/重生、能量/资源、形态切换和威望改写闭包。

## 03. 普通单位技能及其进化功能

Owner：`CommanderUnitAbilityProfile`、`CommanderUnitStatProfile`、`CommanderUnitEvolutionProfile`、`CommanderUnitBehaviorProfile`、`CommanderUnitWeaponProfile`。

### 单位技能按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 不朽者 | `HardenedShield` | 刚毅护盾 | `-` | - | 不朽者的护盾尚未消失前，能够将受到的伤害降低至最多10点。 |
| 不朽者 | `ImmortalOverload` | 屏障 | `ImmortalOverload,Execute` | - | 吸收最多{Behavior,ImmortalOverload,DamageResponse.ModifyLimit}点伤害，持续{Behavior,Tak... |
| 侦测器 | `MorphtoObserverSiege` | 监察模式 | `ObserverMorphtoObserverSiege,Execute` | - | 把侦测器变形为监察模式。视野提高{(Unit,ObserverSiegeMode,Sight/Unit,Observer,Sight-1)*100}%，但... |
| 侦测器 | `MorphtoObserverSiege` | 监察模式 | `ObserverMorphtoObserverSiege,Execute` | - | 把侦测器变形为监察模式。视野提高{(Unit,ObserverSiegeMode,Sight/Unit,Observer,Sight-1)*100}%，但... |
| 侦测器 | `Detector` | 侦测单位 | `-` | - | 该单位能够侦测到隐形、潜地和幻像单位。 |
| 侦测器 | `Detector` | 侦测单位 | `-` | - | 该单位能够侦测到隐形、潜地和幻像单位。 |
| 侦测器 | `HaveGraviticBoosters` | 重力加速器 | `-` | HaveGraviticBoosters | 提高侦测器的移动速度50%。 |
| 折跃侦察机 | `HaveFenixScoutWeaponRange` | 战斗感应器阵列 | `-` | HaveFenixScoutWeaponRange | 侦察机获得+3对空攻击射程和+1对地攻击射程。 |
| 激励者 | `ForceField` | 力场 | `ForceField,Execute` | - | 阻拦地面部队移动的屏障，持续{time:15}。重型单位可将力场踏碎。 |
| 激励者 | `GuardianShield` | 守护者之盾 | `GuardianShield,Execute` | - | 制造一个范围为{Effect,GuardianShieldSearch,AreaArray[0].Radius}的光环，使友方单位受到的远程伤害降低{Be... |
| 激励者 | `Hallucination` | 幻像 | `255,255` | - | 生成幻像，幻像无法使用主动技能或制造伤害，且更容易死亡。持续{Behavior,HallucinationTimedLife,Duration}秒。敌方的... |
| 激励者 | `ProbeHallucination` | 生成4个探机幻像 | `HallucinationProbe,Execute` | - | 幻像与本体单位的功能相似，但无法使用主动技能或造成伤害，并且更容易死亡。幻像在持续{time:60}后消失。 |
| 激励者 | `ZealotHallucination` | 生成2个狂热者幻像 | `HallucinationZealot,Execute` | - | 幻像与本体单位的功能相似，但无法使用主动技能或造成伤害，并且更容易死亡。幻像在持续{time:60}后消失。 |
| 激励者 | `AdeptHallucination` | 生成2个使徒幻像 | `HallucinationAdept,Execute` | - | 幻像与本体单位的功能相似，但无法使用主动技能或造成伤害，并且更容易死亡。幻像在持续{time:60}后消失。 |
| 激励者 | `StalkerHallucination` | 生成2个追猎者幻像 | `HallucinationStalker,Execute` | - | 幻像与本体单位的功能相似，但无法使用主动技能或造成伤害，并且更容易死亡。幻像在持续{time:60}后消失。 |
| 激励者 | `ImmortalHallucination` | 生成不朽者幻像 | `HallucinationImmortal,Execute` | - | 幻像与本体单位的功能相似，但无法使用主动技能或造成伤害，并且更容易死亡。幻像在持续{time:60}后消失。 |
| 激励者 | `HighTemplarHallucination` | 生成2个高阶圣堂武士幻像 | `HallucinationHighTemplar,Execute` | - | 幻像与本体单位的功能相似，但无法使用主动技能或造成伤害，并且更容易死亡。幻像在持续{time:60}后消失。 |
| 激励者 | `ArchonHallucination` | 生成执政官幻像 | `HallucinationArchon,Execute` | - | 幻像与本体单位的功能相似，但无法使用主动技能或造成伤害，并且更容易死亡。幻像在持续{time:60}后消失。 |
| 激励者 | `VoidRayHallucination` | 生成虚空辉光舰幻像 | `HallucinationVoidRay,Execute` | - | 幻像与本体单位的功能相似，但无法使用主动技能或造成伤害，并且更容易死亡。幻像在持续{time:60}后消失。 |
| 激励者 | `PhoenixHallucination` | 生成凤凰幻像 | `HallucinationPhoenix,Execute` | - | 幻像与本体单位的功能相似，但无法使用主动技能或造成伤害，并且更容易死亡。幻像在持续{time:60}后消失。 |
| 激励者 | `WarpPrismHallucination` | 生成折跃棱镜幻像 | `HallucinationWarpPrism,Execute` | - | 幻像与本体单位的功能相似，但无法使用主动技能或造成伤害，并且更容易死亡。幻像在持续{time:60}后消失。 |
| 激励者 | `OracleHallucination` | 召唤先知幻像 | `HallucinationOracle,Execute` | - | 幻像拥有与本体类型单位相同的能力，但无法造成伤害且更容易死亡。幻像在持续{time:60}后消失。 |
| 激励者 | `ColossusHallucination` | 生成巨像幻像 | `HallucinationColossus,Execute` | - | 幻像与本体单位的功能相似，但无法使用主动技能或造成伤害，并且更容易死亡。幻像在持续{time:60}后消失。 |
| 激励者 | `DisruptorHallucination` | 生成干扰者幻像 | `HallucinationDisruptor,Execute` | - | 幻像与本体单位的功能相似，但无法使用主动技能或造成伤害，并且更容易死亡。幻像在持续{time:60}后消失。 |
| 哨兵 | `Charge` | 冲锋 | `Charge,Execute` | - | 允许狂热者能拦截附近的敌人。同时还会提高狂热者的移动速度。该技能每{Abil,Charge,Cost.Cooldown.TimeUse}秒最多只能使用一次。 |
| 哨兵 | `WhirlwindLocked` | 旋风斩 | `-` | ArtanisLevel04 | 该技能将在指挥官等级4时解锁。 |
| 巨像 | `CliffWalk` | 悬崖攀越 | `-` | - | 巨像能够攀越悬崖。 |
| 巨像 | `ExtendedThermalLance` | 加长热能射线枪 | `-` | HaveKaraxExtendedThermalLance | 使巨像的射程提高3。 |
| 航母 | `Interceptor` | 制造拦截机 | `CarrierHangar,Ammo1` | - | 制造拦截机。拦截机能够自动攻击航母的目标，是航母唯一的武器。 / 可以对地和对空。 |
| 航母 | `GravitonCatapult` | 引力弹射 | `-` | UseGravitonCatapult | 使航母发射拦截机的速度更快。 |


备注：已过滤 13 个通用移动/攻击/取消类按钮，保留英雄技能、装备、被动、威望或形态相关候选。
### 进化/形态/切换候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 传送门 | `SentryFenix` | 折跃保护者 | `GatewayTrain,Train15` | - | 净化者阵营 / 机械支援单位。可以使用防护场和相位模式。 / 可以对地和对空。 |
| 传送门 | `UpgradeToWarpGate` | 变形为折跃门 | `UpgradeToWarpGate,Execute` | - | 将传送门升级为折跃门，使星灵可以利用折跃技术将地面单位召集到任何有水晶塔或折跃棱镜能量覆盖的区域。 |
| 侦测器 | `MorphtoObserverSiege` | 监察模式 | `ObserverMorphtoObserverSiege,Execute` | - | 把侦测器变形为监察模式。视野提高{(Unit,ObserverSiegeMode,Sight/Unit,Observer,Sight-1)*100}%，但... |
| 侦测器 | `MorphtoObserverSiege` | 监察模式 | `ObserverMorphtoObserverSiege,Execute` | - | 把侦测器变形为监察模式。视野提高{(Unit,ObserverSiegeMode,Sight/Unit,Observer,Sight-1)*100}%，但... |

实现备注：单位自己声明技能、形态和升级接入口；科技建筑只展示符合条件的研究项，不直接拥有单位升级逻辑。英雄单位已从本模块候选中排除，统一归 `02. 英雄单位及其技能`。

## 04. 初始化基地与特殊建筑

Owner：`CommanderRuntimeProfile`、`CommanderScenarioLoadout`、`CommanderSpecialStructureProfile`、`CommanderInitialCasterProfile`。

### 初始化建筑候选

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| - | - | - | - | - | 官方 buildings.json 未自动命中基地/补给/气矿类建筑；需要从地图初始化和 CASC 回补。 |

### 特殊建筑候选

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 太阳锻炉 | `SolarForge` | `SolarForge` | Ground; Armored/Mechanical/Structure | 矿:200 气:200 人口字段:- 生命:500 护盾:500 能量:- | 为亚顿之矛提供升级方案。 |

实现备注：测试台切换指挥官时调用本指挥官 initializer，负责替换主基地、工人、运输机/投放单位、隐藏 caster、英雄初始单位和特殊建筑。

## 05. 指挥官兵种

Owner：`CommanderRosterProfile`、`CommanderUnitProfile`、`CommanderUnitTrainProfile`、`CommanderUnitStageProfile`、`CommanderUnitRequirementProfile`。

来源：官方提取 `units.json`。这里列的是当前已提取普通/生产单位 Catalog 对象；英雄单位单独在 `02. 英雄单位及其技能` 中维护。满级替换、威望正向融合或进化变体仍以 `power_fusion` 审计结果为准。

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 巨像 | `Colossus` | `Colossus, RoboticsBay, RoboticsFacility` | Air/Ground; Armored/Massive/Mechanical | 矿:300 气:200 人口字段:-6 生命:250 护盾:100 能量:- | 步战机器人，装备强大的范围攻击武器。能够攀越悬崖。对空武器可以对其进行攻击。 / 可以对地。 |
| 航母 | `Carrier` | `Carrier, FleetBeacon, Stargate` | Air; Armored/Massive/Mechanical | 矿:350 气:250 人口字段:-6 生命:300 护盾:150 能量:- | 星灵的主力战舰。能够制造并发射拦截机攻击敌人。 / 可以对地和对空。 |
| 不朽者 | `ImmortalAiur` | `Immortal, ImmortalAiur, RoboticsFacility` | Ground; Armored/Mechanical | 矿:250 气:100 人口字段:-4 生命:200 护盾:100 能量:- | 攻击型步战机甲。可以使用屏障吸收伤害。 / 可以对地。 |
| 激励者 | `SentryPurifier` | `Sentry, SentryPurifier` | Ground; Light/Mechanical/Psionic | 矿:50 气:100 人口字段:-2 生命:40 护盾:40 能量:200 | 机械支援单位。能够使用时空光束和相位模式技能。升级后可获得回收技能。 / 可以对地和对空。 |
| 哨兵 | `ZealotPurifier` | `Zealot, ZealotPurifier` | Ground; Biological/Light | 矿:100 气:- 人口字段:-2 生命:100 护盾:50 能量:- | 强大的近战战士。升级后可使用冲锋和重构技能。 / 可以对地。 |
| 折跃侦察机 | `Scout` | `Scout, Stargate` | -; - | 矿:250 气:75 人口字段:- 生命:150 护盾:100 能量:- | 多功能高速战机。 / 可以对地和对空。 |
| 侦测器 | `Observer` | `Observer` | Air; Light/Mechanical | 矿:25 气:75 人口字段:-1 生命:40 护盾:30 能量:- | 间谍型空中单位。拥有永久隐形的能力。 / 侦测单位 |

三阶段口径：`initial` 只做审计，`level15` 表示满级解锁，`power_fusion` 表示 15 级 + 六精通全满 + 威望正向收益后的默认运行清单。

## 06. 指挥官精通

Owner：`CommanderMasteryProfile`、`CommanderMasteryEffectProfile`、`CommanderMasteryModifierProfile`。

| 组 | 名称 | Upgrade | 每点 | 30点口径 |
|---|---|---|---|---|
| 1 | 战斗单位的生命值与护盾 | `MasteryKaraxUnitVital` | 1 | +30% |
| 1 | 建筑生命值与护盾 | `MasteryKaraxBuildingVital` | 2 | +60% |
| 2 | 修理光束治疗 | `MasteryKaraxRepairBeamHeal` | 3 | 90%更快 |
| 2 | 亚顿之矛的能量回复速度在超级提速期间加快（净 +1能量，持续20秒） | `MasteryKaraxSoAChronoRegen` | 3 | +90能量，持续20秒 |
| 3 | 时空提速速度 | `MasteryKaraxChronoBoostSpeed` | 1 | +30%时空提速速度 |
| 3 | 亚顿之矛初始和最大能量 | `MasteryKaraxStartingAndMaxSoAEnergy` | 3 | +90 |

实现备注：当前默认六项全部 30 点。表里的 30 点口径由 `point_increments * 30` 推导，最终数值仍需以 Upgrade Effect 闭包验证。

## 07. 指挥官建筑

Owner：`CommanderBuildingProfile`、`CommanderBuildingAbilityProfile`、`CommanderBuildingTrainProfile`、`CommanderBuildingStageProfile`、`CommanderBuildingBehaviorProfile`。

来源：官方提取 `buildings.json`。

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 传送门 | `Gateway` | `Gateway` | Ground; Mechanical | 矿:150 气:- 人口字段:- 生命:500 护盾:500 能量:- | 使星灵可以利用折跃技术召集地面单位。 / 开启： / - 狂热者 |
| 光影议会 | `TwilightCouncil` | `TwilightCouncil` | Ground; Mechanical | 矿:150 气:100 人口字段:- 生命:500 护盾:500 能量:- | 为狂热者、追猎者以及使徒提供升级方案。 |
| 光子炮台 | `PhotonCannon` | `PhotonCannon, Zealot` | Ground; Mechanical | 矿:150 气:- 人口字段:- 生命:150 护盾:150 能量:- | 主力防御建筑。 / 可以对地和对空。 / 侦测单位 |
| 护盾充能器 | `ShieldBattery` | `ShieldBattery` | Ground; Mechanical | 矿:100 气:- 人口字段:- 生命:200 护盾:200 能量:100 | 为附近的友方单位和建筑恢复护盾。升级后可以使用强固屏障。 |
| 太阳锻炉 | `SolarForge` | `SolarForge` | Ground; Armored/Mechanical/Structure | 矿:200 气:200 人口字段:- 生命:500 护盾:500 能量:- | 为亚顿之矛提供升级方案。 |
| 侦察机 | `PhoenixPurifier` | `FleetBeacon, Phoenix, PhoenixPurifier, Stargate` | Ground; Mechanical | 矿:300 气:200 人口字段:- 生命:500 护盾:500 能量:- | 空中优势战机。可使用引力光束，升级后还可使用相位护甲技能。 / 可以对空。 |

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
| 侦察机 | `ResearchFenixScoutWeaponRange` | 研究战斗感应器阵列 | `FleetBeaconResearch,Research22` | - | 侦察机获得+3对空攻击射程和+1对地攻击射程。 |
| 侦察机 | `ResearchCorsairPermanentCloakLocked` | 研究潜行驾驶 | `-` | VorazunLevel12 | 该科技将在指挥官等级12时解锁。 |
| 侦察机 | `ResearchFenixChampionScoutAOEMissilesLocked` | 研究压制程序 | `-` | FenixLevel12 | 该科技将在指挥官等级12时解锁。 |
| 侦察机 | `ResearchKaraxCarrerInterceptorLaunchSpeed` | 研究引力跃迁弹射器 | `FleetBeaconResearch,Research18` | - | 使航空母舰发射拦截机的速度变快，并且使拦截机的攻击速度提高{(Weapon,InterceptorBeam,Period-$UpgradeEffectAr... |
| 侦察机 | `TempestPassive` | TempestPassive | `-` | HaveVoidTempest | - |
| 侦察机 | `ResearchVoidRaySpeedUpgrade` | 研发熔流旋叶 | `FleetBeaconResearch,Research5` | - | 提高虚空辉光舰的移动速度和移动加速度。 |
| 侦察机 | `CarrierPassive` | CarrierPassive | `-` | - | - |
| 侦察机 | `MothershipPassive` | MothershipPassive | `-` | HaveVoidMothership | - |
| 侦察机 | `CarrierPassive` | CarrierPassive | `-` | HaveCarrier | - |
| 光子炮台 | `KaraxTurretRange` | 强化瞄准 | `-` | HaveKaraxTurretRange | 防御性建筑的射程提高2。 |
| 光子炮台 | `KaraxTurretAttackSpeed` | 军械优化 | `-` | HaveKaraxTurretAttackSpeed | 防御性建筑的攻击速度提高25%。 |
| 光子炮台 | `Detector` | 侦测单位 | `-` | NotUnderConstruction | 该单位能够侦测到隐形、潜地和幻像单位。 |
| 护盾充能器 | `ShieldBatteryRecharge` | 恢复 | `ShieldBatteryRechargeChanneled,Execute` | - | 为目标单位或建筑的护盾充能。 |
| 护盾充能器 | `StructureBarrierLocked` | 强固屏障 | `-` | KaraxLevel06 | 该技能将在指挥官等级6时解锁。 |
| 护盾充能器 | `KaraxTurretRange` | 强化瞄准 | `-` | HaveKaraxTurretRange | 防御性建筑的射程提高2。 |
| 护盾充能器 | `KaraxEnergyRegenUpgrade` | 快速恢复 | `-` | HaveKaraxEnergyRegenUpgrade | 能量恢复速度提高200%。 |
| 护盾充能器 | `ShieldBatteryRecharge` | 恢复 | `ShieldBatteryRechargeEx5,Execute` | - | 为目标单位或建筑的护盾充能。 |
| 太阳锻炉 | `ResearchSolarEfficiencyLevel3Locked` | 研究太阳能利用率等级3 | `-` | KaraxLevel08 | 该科技将在指挥官等级8时解锁。 |
| 太阳锻炉 | `ResearchSOARepairBeamExtraTargetLocked` | 研究强化修理系统 | `-` | KaraxLevel08 | 该科技将在指挥官等级8时解锁。 |
| 太阳锻炉 | `ResearchSOAOrbitalStrikeUpgradeLocked` | 研究相位爆裂 | `-` | KaraxLevel12 | 该科技将在指挥官等级12时解锁。 |
| 太阳锻炉 | `ResearchSOASolarLanceUpgradeLocked` | 研究太阳耀斑 | `-` | KaraxLevel12 | 该科技将在指挥官等级12时解锁。 |
| 太阳锻炉 | `SolarEfficiencyPassiveLevel3` | 太阳能利用率等级3 | `-` | HaveSolarEfficiencyLevel3 | 每为亚顿之矛产生{Effect,SolarForgeSolarEfficiency3MU,VitalArray[Energy].Change}点能量值。 |
| 太阳锻炉 | `SOARepairBeamExtraTargetPassive` | 强化修理系统 | `-` | HaveSOARepairBeamExtraTarget | 使亚顿之矛的重构光束能影响{$UpgradeEffectArrayValue:SOARepairBeamExtraTarget:Effect,KaraxR... |
| 太阳锻炉 | `SOAOrbitalStrikeUpgradePassive` | 相位爆裂 | `-` | HaveSOAOrbitalStrikeUpgrade | 亚顿之矛的轨道轰炸能使目标区域的敌人昏迷{Behavior,OrbitalStrikeStun,Duration}秒。 |
| 太阳锻炉 | `SOASolarLanceUpgradePassive` | 太阳耀斑 | `-` | HaveSOASolarLanceUpgrade | 亚顿之矛的太阳能射线枪点燃沿途的地面，在{Effect,SOASolarLanceFireBeamCP,PeriodCount*Effect,SOASol... |
| 太阳锻炉 | `BrokenSolarForge` | 损坏的太阳锻炉 | `BrokenSolarForge,Execute` | - | 修理太阳锻炉 |
| 光影议会 | `ArmorResearchSupplicantShieldArmor` | 研究鲜血护盾 | `TwilightCouncilResearch,Research25` | - | 降低敌人对死徒的护盾造成的伤害。 |
| 光影议会 | `ResearchReconstructionLocked` | 研究重构 | `-` | KaraxLevel04 | 该科技将在指挥官等级4时解锁。 |
| 光影议会 | `ResearchFenixKaldalisZealotCleaveLocked` | 研究充能利刃 | `-` | FenixLevel04 | 该科技将在指挥官等级4时解锁。 |
| 光影议会 | `FenixTalisAdeptLearnBounceShotUpgradeLocked` | 研究衰弱系统 | `-` | FenixLevel04 | 该科技将在指挥官等级4时解锁。 |
| 光影议会 | `ResearchDragoonRange` | 研究奇点充能 | `TwilightCouncilResearch,Research6` | - | 龙骑士的射程+2。 |
| 光影议会 | `ResearchWhirlwind` | 研究旋风斩 | `TwilightCouncilResearch,Research3` | - | 使狂热者可以使用旋风斩技能。旋风斩在激活时会对附近所有敌人造成伤害。 |
| 光影议会 | `ResearchReclamationLocked` | 研究回收 | `-` | KaraxLevel04 | 该科技将在指挥官等级4时解锁。 |
| 光影议会 | `AdeptResearchPiercingUpgrade` | 研究共鸣之刃 | `-` | - | 使徒的攻击速度提高45%。 |
| 光影议会 | `ResearchShadowStun` | 研究黑暗缠绕 | `TwilightCouncilResearch,Research9` | - | 使百夫长能击晕附近的敌人，并使他们的护盾值在一小段时间内提高{Behavior,VoidZealotShadowChargeSelfBuff,Modifi... |

实现备注：建筑声明自身生产、研究、行为和阶段；训练单位的最终可用性由兵种/科技/精通/威望共同裁决。


备注：已过滤 4 个通用移动/攻击/取消类按钮，保留英雄技能、装备、被动、威望或形态相关候选。
## 08. 科技建筑及其升级选项

Owner：`CommanderTechBuildingProfile`、`CommanderUnitTechProfile`、`CommanderUpgradeProfile`、`CommanderUpgradeRequirementProfile`、`CommanderUpgradeEffectProfile`。

### 15 级解锁与研究命令

| 等级 | 名称 | 解锁升级 | 解锁 AbilityCmd | 说明 |
|---|---|---|---|---|
| 1 | 机械大师 | `-` | `-` | 凯拉克斯的战斗单位生命值提高50%，但费用增加30%。轨道轰击不再拥有冷却时间或充能计数，每束打击现在消耗5点能量。 |
| 2 | 亚顿之矛：提速力场 | `KaraxSOAChronoPassive` | `-` | 所有友方建筑的生产速度提高15%。 / 被动技能。 |
| 3 | 新单位：凯达琳巨石 | `KaraxKhaydarinMonolithUnlock` | `-` | 异常强大的防御建筑。拥有超高的射程和伤害，但造价昂贵且攻击缓慢。 / 可以对空和对地。 |
| 4 | 光影议会升级包 | `-` | `TwilightCouncilResearch:13, TwilightCouncilResearch:12, EnergizerReclamation:, TwilightCouncilResearch:9, ZealotPurifierReviveDeath:` | 在光影议会中解锁以下升级： / 使警戒者在被杀死时可以自动复活。使激励者获得临时控制敌方机械单位的能力。激励者和护盾充能器的能量恢复速度提高200%。 |
| 5 | 亚顿之矛：时空过载 | `SOAMapWideChronoUpgrade` | `-` | 时空波动现在提高所有友方建筑的生产速度500%，持续20秒。 |
| 6 | 锻炉升级包 | `-` | `ForgeResearch:9, ForgeResearch:10, ShieldBatteryStructureBarrier:, ForgeResearch:11` | 在锻炉中解锁以下升级： / 光子炮台、凯达琳巨石和护盾充能器的射程提高2。光子炮台和凯达琳巨石的攻击速度提高25%。使护盾充能器能使建筑获得伤害吸收屏障。 |
| 7 | 亚顿之矛：重构光束 | `SOARepairBeam` | `-` | 自动对友方机械单位进行持续修理。最多可以同时修理3个目标。 / 被动技能。 |
| 8 | 太阳锻炉升级包1 | `-` | `SolarForgeResearch:2, SolarForgeResearch:3` | 在太阳锻炉解锁以下升级： / 重构光束可以影响一个额外目标。太阳能利用率等级3。 |
| 9 | 机械研究所升级包 | `-` | `RoboticsBayResearch:9, ImmortalShakurasShadowCannon:` | 在机械研究所解锁以下升级： / 解锁不朽者的暗影光炮技能，对一个敌方地面或空中单位造成320点伤害。巨像的攻击会在地面上留下火焰，造成额外的持续伤害。 |
| 10 | 亚顿之矛：净化光束 | `SOAPurifierBeam` | `-` | 发射一枚光束，在15秒内造成750（1500 vs 重甲单位）点伤害。若不手动控制，该光束会自动获取目标。 |
| 11 | 卡莱智慧 | `KaraxInstantStructureWarp` | `-` | 水晶塔、光子炮台、凯达琳巨石和护盾充能器可瞬间折跃完成。 |
| 12 | 太阳锻炉升级包2 | `-` | `SolarForgeResearch:4, SolarForgeResearch:5` | 在太阳锻炉解锁以下升级： / 轨道轰炸会使区域内的敌人昏迷。太阳能射线枪会在地面上留下火焰，造成额外的持续伤害。 |
| 13 | 亚顿之矛：净化协议 | `SOAPurifierBeamUpgrade` | `-` | 净化光束的移动速度提高200%，持续时间延长5秒。 |
| 14 | 舰队航标升级包 | `KaraxCarrierUpgrade` | `FleetBeaconResearch:16, FleetBeaconResearch:9` | 在舰队航标中解锁以下升级： / 允许幻影战机在受到伤害后暂时无敌。允许航母自动修理附近的机械单位。 |
| 15 | 统和屏障 | `KaraxUnitSpawnBarrier` | `-` | 所有友方单位获得一个屏障，能够阻挡一次至少20点伤害的攻击或法术。单位诞生时获得该屏障，并且该效果每240秒只能触发一次。 |

### Upgrade 摘要

| Upgrade | 父级 | 显示名 | Effect数 | 说明 |
|---|---|---|---|---|
| `CommanderPrestigeKaraxArmy` | `CommanderPrestige` | 圣堂表象 | 17 | 优点 / 战斗单位的消耗减少40%。 / 缺点 / 光子炮台和凯达琳巨石不可用。 |
| `CommanderPrestigeKaraxStructures` | `CommanderPrestige` | 战争建筑师 | 7 | 优点 / 重构光束的效率提高了100%，并且可以瞄准的建筑翻倍。统和屏障影响建筑，并且冷却时间缩短75%。时空提速、时空波动和提速力场会影响防御建筑并增加它们的攻... |
| `CommanderPrestigeKaraxStructuresMastery` | `CommanderPrestige` | - | 2 | - |
| `CommanderPrestigeKaraxStructuresMasteryChronoBoostSpeed` | `CommanderPrestige` | - | 1 | - |
| `CommanderPrestigeKaraxStructuresPerk` | `CommanderPrestige` | - | 1 | - |
| `CommanderPrestigeKaraxTopBar` | `CommanderPrestige` | 天界太阳能 | 4 | 优点 / 轨道轰炸和太阳能射线枪消耗的能量降低40%。太阳能射线枪和净化光束的冷却时间缩短50%。 / 缺点 / 时空提速、时空波动和提速力场不可用。 |
| `KaraxCarrierUpgrade` | `-` | Karax Carrier Upgrade | 2 | - |
| `KaraxCommander` | `-` | 凯拉克斯 | 75 | - |
| `KaraxInstantStructureWarp` | `-` | Karax Instant Structure Warp | 4 | - |
| `KaraxKhaydarinMonolithUnlock` | `-` | Karax Khaydarin Monolith Unlock | 3 | - |
| `KaraxSOAChronoPassive` | `-` | Karax SOA Chrono Passive | 0 | - |
| `KaraxUnitSpawnBarrier` | `-` | Karax Unit Spawn Barrier | 0 | - |
| `MasteryKaraxBuildingVital` | `-` | 精通 凯拉克斯 建筑生命值 | 65 | 提高凯拉克斯建筑的生命值与护盾值。 |
| `MasteryKaraxChronoBoostSpeed` | `-` | 精通 凯拉克斯 时空提速速度 | 8 | 提高时空提速的速度加成。 |
| `MasteryKaraxRepairBeamHeal` | `-` | 精通 凯拉克斯 修理光束治疗 | 4 | 提高修理光束的速度。 |
| `MasteryKaraxSoAChronoRegen` | `-` | 精通 凯拉克斯 亚顿之矛时空恢复 | 2 | 在时空波动期间持续为亚顿之矛恢复一定能量。 |
| `MasteryKaraxStartingAndMaxSoAEnergy` | `-` | 精通 凯拉克斯 亚顿之矛起始和最大能量值 | 3 | 提高亚顿之矛的初始和最大能量值。 |
| `MasteryKaraxUnitVital` | `-` | 精通 凯纳克斯 单位活力 | 1 | 提高凯纳克斯的战斗单位的生命值与护盾值。 |
| `SOAMapWideChrono` | `-` | SOA全地图时空提速 | 0 | 使所有友方建筑的生产速度提高{Behavior,SOAMapWideChrono,Modification.RateMultiplierArray[Progres... |
| `SOAMapWideChronoUpgrade` | `-` | SOAMap Wide Chrono Upgrade | 7 | - |
| `SOAOrbitalStrike` | `-` | - | 0 | 从高空轨道向战场发射5束激光，每一束造成{Effect,SOAOrbitalStrikeDamage,Amount}({Effect,SOAOrbitalStri... |
| `SOAPurifierBeam` | `-` | - | 0 | - |
| `SOAPurifierBeamUpgrade` | `-` | SOAPurifier Beam Upgrade | 3 | - |
| `SOARepairBeam` | `-` | - | 0 | 机械单位每秒自动修复{Effect,SOARepairBeamHeal,RechargeVitalRate}（{Effect,SOARepairBeamHealS... |
| `SOARepairBeamExtraTarget` | `-` | 强化修理系统 | 1 | 每秒自动修理机械单位{Effect,SOARepairBeamHeal,RechargeVitalRate} ({Effect,SOARepairBeamHeal... |
| `SOAThermalLance` | `-` | - | 0 | - |

### 研究/升级按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 传送门 | `UpgradeToWarpGate` | 变形为折跃门 | `UpgradeToWarpGate,Execute` | - | 将传送门升级为折跃门，使星灵可以利用折跃技术将地面单位召集到任何有水晶塔或折跃棱镜能量覆盖的区域。 |
| 侦察机 | `ResearchFenixScoutWeaponRange` | 研究战斗感应器阵列 | `FleetBeaconResearch,Research22` | - | 侦察机获得+3对空攻击射程和+1对地攻击射程。 |
| 侦察机 | `ResearchCorsairPermanentCloakLocked` | 研究潜行驾驶 | `-` | VorazunLevel12 | 该科技将在指挥官等级12时解锁。 |
| 侦察机 | `ResearchFenixChampionScoutAOEMissilesLocked` | 研究压制程序 | `-` | FenixLevel12 | 该科技将在指挥官等级12时解锁。 |
| 侦察机 | `ResearchKaraxCarrerInterceptorLaunchSpeed` | 研究引力跃迁弹射器 | `FleetBeaconResearch,Research18` | - | 使航空母舰发射拦截机的速度变快，并且使拦截机的攻击速度提高{(Weapon,InterceptorBeam,Period-$UpgradeEffectAr... |
| 侦察机 | `ResearchVoidRaySpeedUpgrade` | 研发熔流旋叶 | `FleetBeaconResearch,Research5` | - | 提高虚空辉光舰的移动速度和移动加速度。 |
| 护盾充能器 | `KaraxEnergyRegenUpgrade` | 快速恢复 | `-` | HaveKaraxEnergyRegenUpgrade | 能量恢复速度提高200%。 |
| 太阳锻炉 | `ResearchSolarEfficiencyLevel3Locked` | 研究太阳能利用率等级3 | `-` | KaraxLevel08 | 该科技将在指挥官等级8时解锁。 |
| 太阳锻炉 | `ResearchSOARepairBeamExtraTargetLocked` | 研究强化修理系统 | `-` | KaraxLevel08 | 该科技将在指挥官等级8时解锁。 |
| 太阳锻炉 | `ResearchSOAOrbitalStrikeUpgradeLocked` | 研究相位爆裂 | `-` | KaraxLevel12 | 该科技将在指挥官等级12时解锁。 |
| 太阳锻炉 | `ResearchSOASolarLanceUpgradeLocked` | 研究太阳耀斑 | `-` | KaraxLevel12 | 该科技将在指挥官等级12时解锁。 |
| 太阳锻炉 | `SOARepairBeamExtraTargetPassive` | 强化修理系统 | `-` | HaveSOARepairBeamExtraTarget | 使亚顿之矛的重构光束能影响{$UpgradeEffectArrayValue:SOARepairBeamExtraTarget:Effect,KaraxR... |
| 太阳锻炉 | `SOAOrbitalStrikeUpgradePassive` | 相位爆裂 | `-` | HaveSOAOrbitalStrikeUpgrade | 亚顿之矛的轨道轰炸能使目标区域的敌人昏迷{Behavior,OrbitalStrikeStun,Duration}秒。 |
| 太阳锻炉 | `SOASolarLanceUpgradePassive` | 太阳耀斑 | `-` | HaveSOASolarLanceUpgrade | 亚顿之矛的太阳能射线枪点燃沿途的地面，在{Effect,SOASolarLanceFireBeamCP,PeriodCount*Effect,SOASol... |
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
| 不朽者 | `ImmortalOverload` | 屏障 | `ImmortalOverload,Execute` | - | 吸收最多{Behavior,ImmortalOverload,DamageResponse.ModifyLimit}点伤害，持续{Behavior,Tak... |
| 折跃侦察机 | `HaveFenixScoutWeaponRange` | 战斗感应器阵列 | `-` | HaveFenixScoutWeaponRange | 侦察机获得+3对空攻击射程和+1对地攻击射程。 |
| 激励者 | `WarpPrismHallucination` | 生成折跃棱镜幻像 | `HallucinationWarpPrism,Execute` | - | 幻像与本体单位的功能相似，但无法使用主动技能或造成伤害，并且更容易死亡。幻像在持续{time:60}后消失。 |

### 可投放单位候选

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 巨像 | `Colossus` | `Colossus, RoboticsBay, RoboticsFacility` | Air/Ground; Armored/Massive/Mechanical | 矿:300 气:200 人口字段:-6 生命:250 护盾:100 能量:- | 步战机器人，装备强大的范围攻击武器。能够攀越悬崖。对空武器可以对其进行攻击。 / 可以对地。 |
| 航母 | `Carrier` | `Carrier, FleetBeacon, Stargate` | Air; Armored/Massive/Mechanical | 矿:350 气:250 人口字段:-6 生命:300 护盾:150 能量:- | 星灵的主力战舰。能够制造并发射拦截机攻击敌人。 / 可以对地和对空。 |
| 不朽者 | `ImmortalAiur` | `Immortal, ImmortalAiur, RoboticsFacility` | Ground; Armored/Mechanical | 矿:250 气:100 人口字段:-4 生命:200 护盾:100 能量:- | 攻击型步战机甲。可以使用屏障吸收伤害。 / 可以对地。 |
| 激励者 | `SentryPurifier` | `Sentry, SentryPurifier` | Ground; Light/Mechanical/Psionic | 矿:50 气:100 人口字段:-2 生命:40 护盾:40 能量:200 | 机械支援单位。能够使用时空光束和相位模式技能。升级后可获得回收技能。 / 可以对地和对空。 |
| 哨兵 | `ZealotPurifier` | `Zealot, ZealotPurifier` | Ground; Biological/Light | 矿:100 气:- 人口字段:-2 生命:100 护盾:50 能量:- | 强大的近战战士。升级后可使用冲锋和重构技能。 / 可以对地。 |
| 折跃侦察机 | `Scout` | `Scout, Stargate` | -; - | 矿:250 气:75 人口字段:- 生命:150 护盾:100 能量:- | 多功能高速战机。 / 可以对地和对空。 |
| 侦测器 | `Observer` | `Observer` | Air; Light/Mechanical | 矿:25 气:75 人口字段:-1 生命:40 护盾:30 能量:- | 间谍型空中单位。拥有永久隐形的能力。 / 侦测单位 |

实现备注：运输机空投不要读取地图硬编码单位组，应从 `CommanderCargoLoadoutProfile` 读取当前 commander 的 `power_fusion` 单位清单和场景过滤规则；英雄是否允许投放需要显式声明。

## 10. 指挥官特殊机制

Owner：`CommanderSpecialMechanicProfile`、`CommanderSpecialResourceProfile`、`CommanderSpecialMechanicHookProfile`、`CommanderSpecialMechanicUnitProfile`。

本指挥官重点：亚顿之矛能量、轨道轰炸、建筑自动维修是主特殊机制。

### 特殊机制命中项

- 亚顿之矛：提速力场 (`KaraxUnlockSOAChronoPassive`)
- 亚顿之矛：时空过载 (`KaraxMassChronoUpgrade`)
- 亚顿之矛：重构光束 (`KaraxUnlockRepairBeam`)
- 亚顿之矛：净化光束 (`KaraxUnlockPurifierBeam`)
- 亚顿之矛：净化协议 (`KaraxPurifierBeamUpgrade`)

### 特殊机制 Upgrade 候选

- 精通 凯拉克斯 修理光束治疗 (`MasteryKaraxRepairBeamHeal`)
- 精通 凯拉克斯 亚顿之矛时空恢复 (`MasteryKaraxSoAChronoRegen`)
- 精通 凯拉克斯 亚顿之矛起始和最大能量值 (`MasteryKaraxStartingAndMaxSoAEnergy`)
- SOARepairBeam (`SOARepairBeam`)
- 强化修理系统 (`SOARepairBeamExtraTarget`)

### 特殊机制按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 侦察机 | `ResearchFenixChampionScoutAOEMissilesLocked` | 研究压制程序 | `-` | FenixLevel12 | 该科技将在指挥官等级12时解锁。 |
| 激励者 | `GuardianShield` | 守护者之盾 | `GuardianShield,Execute` | - | 制造一个范围为{Effect,GuardianShieldSearch,AreaArray[0].Radius}的光环，使友方单位受到的远程伤害降低{Be... |
| 太阳锻炉 | `ResearchSOARepairBeamExtraTargetLocked` | 研究强化修理系统 | `-` | KaraxLevel08 | 该科技将在指挥官等级8时解锁。 |
| 太阳锻炉 | `SolarEfficiencyPassiveLevel3` | 太阳能利用率等级3 | `-` | HaveSolarEfficiencyLevel3 | 每为亚顿之矛产生{Effect,SolarForgeSolarEfficiency3MU,VitalArray[Energy].Change}点能量值。 |
| 太阳锻炉 | `SOARepairBeamExtraTargetPassive` | 强化修理系统 | `-` | HaveSOARepairBeamExtraTarget | 使亚顿之矛的重构光束能影响{$UpgradeEffectArrayValue:SOARepairBeamExtraTarget:Effect,KaraxR... |
| 太阳锻炉 | `SOAOrbitalStrikeUpgradePassive` | 相位爆裂 | `-` | HaveSOAOrbitalStrikeUpgrade | 亚顿之矛的轨道轰炸能使目标区域的敌人昏迷{Behavior,OrbitalStrikeStun,Duration}秒。 |
| 太阳锻炉 | `SOASolarLanceUpgradePassive` | 太阳耀斑 | `-` | HaveSOASolarLanceUpgrade | 亚顿之矛的太阳能射线枪点燃沿途的地面，在{Effect,SOASolarLanceFireBeamCP,PeriodCount*Effect,SOASol... |

实现备注：凡是涉及局内状态、资源、堆叠、全局计时器、隐藏 caster、英雄成长或召唤首领的机制，都必须有 runtime hook 和 `[XM_DBG]` 日志。

## 11. 指挥官个性化机制

Owner：`CommanderPersonalMechanicProfile`、`CommanderPersonalMechanicEffectProfile`、`CommanderPersonalMechanicHookProfile`、`CommanderPersonalMechanicRequirementProfile`。

本指挥官重点：建筑自动维修和防御建筑强化归个性化机制，科技/面板消耗归特殊机制。

### 威望正向融合输入

| 威望 ID | Primary Upgrade | 禁用单位 | 启用单位 | 禁用 Ability | 补充 Upgrade |
|---|---|---|---|---|---|
| `CommanderPrestigeKaraxStructures` | `CommanderPrestigeKaraxStructures` | `-` | `-` | `-` | `KaraxStructures1, KaraxStructures2, KaraxStructures3` |
| `CommanderPrestigeKaraxArmy` | `CommanderPrestigeKaraxArmy` | `PhotonCannon, KhaydarinMonolith` | `-` | `ForgeResearch:10` | `-` |
| `CommanderPrestigeKaraxTopBar` | `CommanderPrestigeKaraxTopBar` | `-` | `-` | `TimeWarp:, SOAMapWideChrono:` | `-` |

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
[XM_DBG][INFO][COMMANDER_PROFILE_LOAD] commander=Karax levelMode=FullLevel15 masteryMode=AllSixMax rosterStage=power_fusion result=ok
[XM_DBG][INFO][POWER_FUSION_APPLY] commander=Karax levelMode=FullLevel15 masteryMode=AllSixMax prestigeMode=SelectedPositive result=ok
[XM_DBG][INFO][ROSTER_LOAD] commander=Karax stage=power_fusion units=7 buildings=6 heroes=0 result=ok
[XM_DBG][INFO][HERO_PROFILE_LOAD] commander=Karax heroes=0 result=ok
[XM_DBG][INFO][MODULE_VERIFY] commander=Karax module=<01-11> profile=<profile> result=ok
[XM_DBG][WARN][CASC_AUDIT_REQUIRED] commander=Karax module=<module> object=<object> result=needs-casc-audit
```

## 第一轮待审计项

- 顶部技能的 caster、按钮、冷却、充能、目标转发闭包。
- 英雄或特殊英雄的 Unit、Ability、Behavior、Weapon、Actor、Sound、复活/重生闭包。
- `power_fusion` 最终 roster 与 `level15` roster 的新增、替换、变体关系。
- 6 项精通的真实作用对象和最终数值。
- 3 个威望的正面收益、负面代价、disable/suppress、费用/冷却/上限变化。
- 科技建筑研究按钮、Requirement、Upgrade effect 是否完整。
- 特殊机制、英雄成长和个性化机制是否需要 runtime hook。
