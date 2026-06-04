# 凯拉克斯（Karax）指挥官细化

日期：2026-05-27

## 当前口径

本文件统一按满级 `power_fusion` 口径编写：正文只讨论满级指挥官的最终态，不再把 1 级与 15 级拆成两套玩法态；等级 1-15 只保留为解锁门槛和审计锚点。精通默认 6 项全部 30 点，三个威望按正收益融合展开，不直接启用官方 `PlayerPrestige`。`initial` 仅用于官方基础状态审计和差异对照，默认测试和玩法都看 `power_fusion` 最终状态。

本文件按 `docs/newdocs/模块拆分` 的 11 个模块整理 凯拉克斯。依据 `游戏数据/官方合作指挥官/commanders/Karax/` 的当前 JSON 生成；具体 Ability、Behavior、Weapon、Actor、Effect、Requirement 闭包仍需继续追 `游戏数据/官方SC2原始文本镜像/` 或实机 `[XM_DBG]` 日志。

## 链路提醒

- 凯拉克斯当前官方正向建筑是 `Gateway`、`PhotonCannon`、`ShieldBattery`、`SolarForge`、`TwilightCouncil`；`SolarForge` 与 `ShieldBattery` 是本页重点，普通共享建筑按钮仍需按 Requirement 过滤。
- 凯拉克斯正向兵种按 `ImmortalAiur`、`Observer`、`PhoenixPurifier`、`Scout`、`SentryPurifier`、`ZealotPurifier`、`Colossus`、`Carrier` 过滤。
- 非泽拉图指挥官不得把 `AutomatedAssimilatorZeratul` / `NexusBuild,Build1` 当作正向经济建筑；候选表里的阿拉纳克、菲尼克斯、沃拉尊锁定项也只能作为共享污染待审计项。

## 官方数据摘要

| 项 | 值 |
|---|---|
| CommanderId | `ProtossKarax` |
| 中文名 | 凯拉克斯 |
| 默认升级 | `KaraxCommander`, `SOAOrbitalStrike`, `SOAThermalLance`, `SOAMapWideChrono` |
| 默认能力命令 | `SOAOrbitalStrikeActivate:`, `SOAOrbitalStrikeTargetingDummy:`, `SOAOrbitalStrikeExecute:`, `SOAThermalLanceActivate:`, `SOAThermalLanceT... |
| 威望 ID | `CommanderPrestigeKaraxStructures`, `CommanderPrestigeKaraxArmy`, `CommanderPrestigeKaraxTopBar` |
| heroes.json 数量 | 0 |
| roster.json 数量 | 13 |
| units.json 数量 | 8 |
| buildings.json 数量 | 5 |
| command_cards.json 对象数 | 13 |
| upgrades.json 数量 | 26 |
| other-tech-entries.json 数量 | 0 |
| source | `mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/userdata.xml` |

roster 样例：

```text
Gateway, ImmortalAiur, Observer, PhoenixPurifier, PhotonCannon, Scout, SentryPurifier, ShieldBattery, SolarForge, TwilightCouncil, ZealotPurifier, Colossus, Carrier
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
| 默认能力 | - | SOAOrbitalStrikeActivate: | - | 来自 commander.json |
| 默认能力 | - | SOAOrbitalStrikeTargetingDummy: | - | 来自 commander.json |
| 默认能力 | - | SOAOrbitalStrikeExecute: | - | 来自 commander.json |
| 默认能力 | - | SOAThermalLanceActivate: | - | 来自 commander.json |
| 默认能力 | - | SOAThermalLanceTargetingDummy: | - | 来自 commander.json |
| 默认能力 | - | SOAThermalLanceExecute: | - | 来自 commander.json |
| 默认能力 | - | SOAMapWideChrono: | - | 来自 commander.json |
| 默认能力 | - | RoboticsBayResearch:11 | - | 来自 commander.json |
| 默认能力 | - | CyberneticsCoreResearch:6 | - | 来自 commander.json |
| Lv4 光影议会升级包 | 4 | TwilightCouncilResearch:13 | - | 在光影议会中解锁以下升级： / 使警戒者在被杀死时可以自动复活。使激励者获得临时控制敌方机械单位的能力。激励者和护盾充能器的能量恢复速度提高200%。 |
| Lv4 光影议会升级包 | 4 | TwilightCouncilResearch:12 | - | 在光影议会中解锁以下升级： / 使警戒者在被杀死时可以自动复活。使激励者获得临时控制敌方机械单位的能力。激励者和护盾充能器的能量恢复速度提高200%。 |
| Lv4 光影议会升级包 | 4 | EnergizerReclamation: | - | 在光影议会中解锁以下升级： / 使警戒者在被杀死时可以自动复活。使激励者获得临时控制敌方机械单位的能力。激励者和护盾充能器的能量恢复速度提高200%。 |
| Lv4 光影议会升级包 | 4 | TwilightCouncilResearch:9 | - | 在光影议会中解锁以下升级： / 使警戒者在被杀死时可以自动复活。使激励者获得临时控制敌方机械单位的能力。激励者和护盾充能器的能量恢复速度提高200%。 |
| Lv4 光影议会升级包 | 4 | ZealotPurifierReviveDeath: | - | 在光影议会中解锁以下升级： / 使警戒者在被杀死时可以自动复活。使激励者获得临时控制敌方机械单位的能力。激励者和护盾充能器的能量恢复速度提高200%。 |
| Lv6 锻炉升级包 | 6 | ForgeResearch:9 | - | 在锻炉中解锁以下升级： / 光子炮台、凯达琳巨石和护盾充能器的射程提高2。光子炮台和凯达琳巨石的攻击速度提高25%。使护盾充能器能使建筑获得伤害吸收屏障。 |
| Lv6 锻炉升级包 | 6 | ForgeResearch:10 | - | 在锻炉中解锁以下升级： / 光子炮台、凯达琳巨石和护盾充能器的射程提高2。光子炮台和凯达琳巨石的攻击速度提高25%。使护盾充能器能使建筑获得伤害吸收屏障。 |
| Lv6 锻炉升级包 | 6 | ShieldBatteryStructureBarrier: | - | 在锻炉中解锁以下升级： / 光子炮台、凯达琳巨石和护盾充能器的射程提高2。光子炮台和凯达琳巨石的攻击速度提高25%。使护盾充能器能使建筑获得伤害吸收屏障。 |
| Lv6 锻炉升级包 | 6 | ForgeResearch:11 | - | 在锻炉中解锁以下升级： / 光子炮台、凯达琳巨石和护盾充能器的射程提高2。光子炮台和凯达琳巨石的攻击速度提高25%。使护盾充能器能使建筑获得伤害吸收屏障。 |
| Lv8 太阳锻炉升级包1 | 8 | SolarForgeResearch:2 | - | 在太阳锻炉解锁以下升级： / 重构光束可以影响一个额外目标。太阳能利用率等级3。 |
| Lv8 太阳锻炉升级包1 | 8 | SolarForgeResearch:3 | - | 在太阳锻炉解锁以下升级： / 重构光束可以影响一个额外目标。太阳能利用率等级3。 |
| Lv9 机械研究所升级包 | 9 | RoboticsBayResearch:9 | - | 在机械研究所解锁以下升级： / 解锁不朽者的暗影光炮技能，对一个敌方地面或空中单位造成320点伤害。巨像的攻击会在地面上留下火焰，造成额外的持续伤害。 |
| Lv9 机械研究所升级包 | 9 | ImmortalShakurasShadowCannon: | - | 在机械研究所解锁以下升级： / 解锁不朽者的暗影光炮技能，对一个敌方地面或空中单位造成320点伤害。巨像的攻击会在地面上留下火焰，造成额外的持续伤害。 |
| Lv12 太阳锻炉升级包2 | 12 | SolarForgeResearch:4 | - | 在太阳锻炉解锁以下升级： / 轨道轰炸会使区域内的敌人昏迷。太阳能射线枪会在地面上留下火焰，造成额外的持续伤害。 |
| Lv12 太阳锻炉升级包2 | 12 | SolarForgeResearch:5 | - | 在太阳锻炉解锁以下升级： / 轨道轰炸会使区域内的敌人昏迷。太阳能射线枪会在地面上留下火焰，造成额外的持续伤害。 |
| Lv14 舰队航标升级包 | 14 | FleetBeaconResearch:16 | `KaraxCarrierUpgrade` | 在舰队航标中解锁以下升级： / 允许幻影战机在受到伤害后暂时无敌。允许航母自动修理附近的机械单位。 |
| Lv14 舰队航标升级包 | 14 | FleetBeaconResearch:9 | `KaraxCarrierUpgrade` | 在舰队航标中解锁以下升级： / 允许幻影战机在受到伤害后暂时无敌。允许航母自动修理附近的机械单位。 |

### command card 命中

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 侦察机 | `GravitonBeam` | 引力光束 | `MirageGravitonBeamVoidCampaign,Execute` | - | 使目标单位浮空并无法使用技能。效果最多持续{time:10}。 / 重型单位对此免疫。 |
| 侦察机 | `GravitonBeamVoidCampaign` | GravitonBeamVoidCampaign | `GravitonBeamVoidCampaign,Execute` | - | - |
| 太阳锻炉 | `ResearchSolarEfficiencyLevel3Locked` | 研究太阳能利用率等级3 | - | `KaraxLevel08` | 该科技将在指挥官等级8时解锁。 |
| 太阳锻炉 | `ResearchSOARepairBeamExtraTargetLocked` | 研究强化修理系统 | - | `KaraxLevel08` | 该科技将在指挥官等级8时解锁。 |
| 太阳锻炉 | `ResearchSOAOrbitalStrikeUpgradeLocked` | 研究相位爆裂 | - | `KaraxLevel12` | 该科技将在指挥官等级12时解锁。 |
| 太阳锻炉 | `ResearchSOASolarLanceUpgradeLocked` | 研究太阳耀斑 | - | `KaraxLevel12` | 该科技将在指挥官等级12时解锁。 |
| 太阳锻炉 | `SolarEfficiencyPassiveLevel3` | 太阳能利用率等级3 | - | `HaveSolarEfficiencyLevel3` | 每为亚顿之矛产生{Effect,SolarForgeSolarEfficiency3MU,VitalArray[Energy].Change}点能量值。 |
| 太阳锻炉 | `SOARepairBeamExtraTargetPassive` | 强化修理系统 | - | `HaveSOARepairBeamExtraTarget` | 使亚顿之矛的重构光束能影响{$UpgradeEffectArrayValue:SOARepairBeamExtraTarget:Effect,KaraxRepairBeamLimit,Amount$}个额外目标。 |
| 太阳锻炉 | `SOAOrbitalStrikeUpgradePassive` | 相位爆裂 | - | `HaveSOAOrbitalStrikeUpgrade` | 亚顿之矛的轨道轰炸能使目标区域的敌人昏迷{Behavior,OrbitalStrikeStun,Duration}秒。 |
| 太阳锻炉 | `SOASolarLanceUpgradePassive` | 太阳耀斑 | - | `HaveSOASolarLanceUpgrade` | 亚顿之矛的太阳能射线枪点燃沿途的地面，在{Effect,SOASolarLanceFireBeamCP,PeriodCount*Effect,SOASolarLanceFireBeamCP,PeriodicPeriodArray[0]}秒内对路径上的敌人造成{Effect,... |
| 太阳锻炉 | `BrokenSolarForge` | 损坏的太阳锻炉 | `BrokenSolarForge,Execute` | - | 修理太阳锻炉 |

实现备注：面板只注册 profile 和转发 caster，地图不得按 commander 写 if/else。精通和威望影响面板冷却、充能、费用时，由本模块接收最终 modifier。

## 02. 英雄单位及其技能

Owner：`CommanderHeroProfile`、`CommanderHeroModeProfile`、`CommanderHeroAbilityProfile`、`CommanderHeroSkillTreeProfile`、`CommanderHeroReviveProfile`、`CommanderHeroModifierProfile`。

### 英雄单位清单

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 战役凯拉克斯 | `KaraxChampion` | `KaraxChampion` | Ground; Biological; Heroic | 生命:100 护盾:200 护甲:1 护盾护甲:1 | 这是本 mod 为凯拉克斯额外接入的战役英雄体。`XMKarax` 显式钉住英雄数值/UI 字段；技能、武器、按钮、Behavior、Actor、Effect 继续从 `XMCore -> Void.SC2Campaign` 继承，避免重复 Catalog 数组。 |

### 英雄技能按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| `KaraxChampion` | `Reclamation` | 回收 | `Reclamation,Execute` | - | 官方战役链：永久控制目标敌方机械单位或星灵建筑；效果链进入 `Reclamation*`。 |
| `KaraxChampion` | `ProdigalEngineer` | 相位大师 | - | - | 官方战役被动：凯拉克斯提供类似水晶塔的能量场，并提高能量场中建筑的攻击/生产效率。 |
| `KaraxChampion` | `PhaseCannon` | 相位光炮 | `PhaseCannon,Execute` | - | 官方战役链：在能量场中临时相位化一门光子炮台；效果链进入 `PhaseCannon*`。 |

### 英雄形态/模式候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| - | - | - | - | - | 未自动命中英雄形态或模式按钮。 |

### 英雄相关等级解锁

| 等级 | 名称 | 升级 | AbilityCmd | 说明 |
|---|---|---|---|---|
| - | - | - | - | 未自动命中英雄相关等级解锁；需要从官方原始文本镜像或实机日志补。 |

口径：官方合作 `heroes.json` 仍暂无凯拉克斯英雄条目；`KaraxChampion` 是本 mod 按用户要求额外接入的战役英雄单位，不反推为官方合作凯拉克斯原生英雄。

实现备注：`SoACasterKarax` 仍只是顶栏宿主，不等于英雄本体；`KaraxChampion` 才是当前开局创建的战役凯拉克斯英雄体。`XMKarax` 没有重复写 `AbilArray` / `WeaponArray` / `CardLayouts` / `BehaviorArray`，这些数组从 `Void.SC2Campaign` 继承，避免在 Catalog 合并时出现重复按钮、重复武器或重复被动。

待实机复核：`KaraxChampion` 主动技能点击、相位光炮放置条件、回收目标过滤、Actor/声音表现，以及与合作凯拉克斯顶栏 `SoACasterKarax` 的同时存在表现。

## 03. 普通单位技能及其进化功能

Owner：`CommanderUnitAbilityProfile`、`CommanderUnitStatProfile`、`CommanderUnitEvolutionProfile`、`CommanderUnitBehaviorProfile`、`CommanderUnitWeaponProfile`。

### 单位技能按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 不朽者 | `HaveBarrier` | 强化屏障 | - | `HaveBarrier` | 使不朽者的屏障能吸收的伤害总量增加100%。 |
| 不朽者 | `ShadowCannonLocked` | 暗影光炮 | - | `KaraxLevel09` | 该技能将在指挥官等级9时解锁。 |
| 不朽者 | `ImmortalBarrierBase` | - | `ImmortalBarrierBase,Execute` | - | 最多可吸收{Behavior,ImmortalBarrierBase,DamageResponse.ModifyLimit}点伤害，持续{Behavior,ImmortalBarrierBase,Duration}秒。 |
| 不朽者 | `ImmortalShakurasShadowCannon` | ImmortalShakurasShadowCannon | `ImmortalShakurasShadowCannon,Execute` | - | - |
| 侦测器 | `AcquireMove` | 搜索移动 | `move,AcquireMove` | - | 命令选中的单位移至目标区域或跟随目标单位。进行搜索移动的单位不会与敌人交战。 |
| 侦测器 | `MorphtoObserverSiege` | 监察模式 | `ObserverMorphtoObserverSiege,Execute` | - | 把侦测器变形为监察模式。视野提高{(Unit,ObserverSiegeMode,Sight/Unit,Observer,Sight-1)*100}%，但无法移动且不再隐形。 |
| 侦测器 | `Detector` | 侦测单位 | - | - | 该单位能够侦测到隐形、潜地和幻像单位。 |
| 侦测器 | `HaveGraviticBoosters` | 重力加速器 | - | `HaveGraviticBoosters` | 提高侦测器的移动速度50%。 |
| 侦测器 | `-` | - | - | - | - |
| 侦察机 | `AnionPulseCrystal` | 阴离子脉冲水晶 | - | `HaveKaraxPhoenixRangeUpgrade` | 使幻影战机的射程提高2。 |
| 侦察机 | `-` | - | - | `HaveMiragePhaseArmor` | - |
| 侦察机 | `GravitonBeam` | 引力光束 | `MirageGravitonBeamVoidCampaign,Execute` | - | 使目标单位浮空并无法使用技能。效果最多持续{time:10}。 / 重型单位对此免疫。 |
| 侦察机 | `GravitonBeamVoidCampaign` | GravitonBeamVoidCampaign | `GravitonBeamVoidCampaign,Execute` | - | - |
| 折跃侦察机 | `HaveFenixScoutWeaponRange` | 战斗感应器阵列 | - | `HaveFenixScoutWeaponRange` | 侦察机获得+3对空攻击射程和+1对地攻击射程。 |
| 激励者 | `ReclamationLocked` | 回收 | - | `KaraxLevel04` | 该技能将在指挥官等级4时解锁。 |
| 激励者 | `KaraxEnergyRegenUpgrade` | 快速恢复 | - | `HaveKaraxEnergyRegenUpgrade` | 能量恢复速度提高200%。 |
| 激励者 | `-` | - | - | - | - |
| 哨兵 | `ReconstructionLocked` | 重构 | - | `KaraxLevel04` | 该技能将在指挥官等级4时解锁。 |
| 哨兵 | `-` | - | - | `ZealotPurifierReviveKaraxHide` | - |
| 巨像 | `CliffWalk` | 悬崖攀越 | - | - | 巨像能够攀越悬崖。 |
| 巨像 | `ExtendedThermalLance` | 加长热能射线枪 | - | `HaveKaraxExtendedThermalLance` | 使巨像的射程提高3。 |
| 航母 | `Interceptor` | 制造拦截机 | `CarrierHangar,Ammo1` | - | 制造拦截机。拦截机能够自动攻击航母的目标，是航母唯一的武器。 / 可以对地和对空。 |
| 航母 | `GravitonCatapult` | 引力弹射 | - | `UseGravitonCatapult` | 使航母发射拦截机的速度更快。 |
| 航母 | `-` | - | - | - | - |

### 进化/形态/切换候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 侦测器 | `MorphtoObserverSiege` | 监察模式 | `ObserverMorphtoObserverSiege,Execute` | - | 把侦测器变形为监察模式。视野提高{(Unit,ObserverSiegeMode,Sight/Unit,Observer,Sight-1)*100}%，但无法移动且不再隐形。 |

实现备注：单位自身声明技能、被动、武器、Behavior 和升级后替换关系；科技建筑只触发研究，不在科技建筑内部判断所有兵种 if/else。

## 04. 初始化基地与特殊建筑

Owner：`CommanderBaseInitProfile`、`CommanderOpeningLoadoutProfile`、`CommanderSpecialStructureProfile`、`CommanderInitHookProfile`。

### 初始化建筑候选

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 传送门 | `Gateway` | `Gateway` | Ground; Mechanical; Structure; Melee | 矿:150 气:- 人口:- 生命:500 护盾:500 能量:- | 使星灵可以利用折跃技术召集地面单位。 / 开启： / - 狂热者 |
| 光子炮台 | `PhotonCannon` | `PhotonCannon, Zealot` | Ground; Mechanical; Structure; Melee | 矿:150 气:- 人口:- 生命:150 护盾:150 能量:- | 主力防御建筑。 / 可以对地和对空。 / 侦测单位 |
| 护盾充能器 | `ShieldBattery` | `ShieldBattery` | Ground; Mechanical; Structure; FactionKhalai | 矿:100 气:- 人口:- 生命:200 护盾:200 能量:100 | 为附近的友方单位和建筑恢复护盾。升级后可以使用强固屏障。 |
| 太阳锻炉 | `SolarForge` | `SolarForge` | Ground; Armored/Mechanical/Structure; Structure; FactionKhalai | 矿:200 气:200 人口:- 生命:500 护盾:500 能量:- | 为亚顿之矛提供升级方案。 |
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
| 护盾充能器 | `KaraxEnergyRegenUpgrade` | 快速恢复 | - | `HaveKaraxEnergyRegenUpgrade` | 能量恢复速度提高200%。 |
| 太阳锻炉 | `ResearchSOAOrbitalStrikeUpgradeLocked` | 研究相位爆裂 | - | `KaraxLevel12` | 该科技将在指挥官等级12时解锁。 |
| 太阳锻炉 | `ResearchSOASolarLanceUpgradeLocked` | 研究太阳耀斑 | - | `KaraxLevel12` | 该科技将在指挥官等级12时解锁。 |
| 太阳锻炉 | `SOARepairBeamExtraTargetPassive` | 强化修理系统 | - | `HaveSOARepairBeamExtraTarget` | 使亚顿之矛的重构光束能影响{$UpgradeEffectArrayValue:SOARepairBeamExtraTarget:Effect,KaraxRepairBeamLimit,Amount$}个额外目标。 |
| 太阳锻炉 | `SOAOrbitalStrikeUpgradePassive` | 相位爆裂 | - | `HaveSOAOrbitalStrikeUpgrade` | 亚顿之矛的轨道轰炸能使目标区域的敌人昏迷{Behavior,OrbitalStrikeStun,Duration}秒。 |
| 太阳锻炉 | `SOASolarLanceUpgradePassive` | 太阳耀斑 | - | `HaveSOASolarLanceUpgrade` | 亚顿之矛的太阳能射线枪点燃沿途的地面，在{Effect,SOASolarLanceFireBeamCP,PeriodCount*Effect,SOASolarLanceFireBeamCP,PeriodicPeriodArray[0]}秒内对路径上的敌人造成{Effect,... |
| 光影议会 | `FenixTalisAdeptLearnBounceShotUpgradeLocked` | 研究衰弱系统 | - | `FenixLevel04` | 该科技将在指挥官等级4时解锁。 |
| 光影议会 | `AdeptResearchPiercingUpgrade` | 研究共鸣之刃 | - | - | 使徒的攻击速度提高45%。 |

实现备注：地图初始化只传 commander、出生点和场景语义；基地、工人、特殊建筑、初始科技和补给由本指挥官 initializer 自己组装。

## 05. 指挥官兵种

Owner：`CommanderRosterProfile`、`CommanderUnitFactoryProfile`、`CommanderUnitReplacementProfile`、`CommanderLevelStageRosterProfile`。

### 当前 units.json 兵种清单

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 不朽者 | `ImmortalAiur` | `ImmortalAiur, Immortal, RoboticsFacility` | Unit; FactionKhalai | 矿:- 气:- 人口:- 生命:- 护盾:- 能量:- | 攻击型步战机甲。可以使用屏障吸收伤害。 / 可以对地。 |
| 侦测器 | `Observer` | `Observer` | Air; Light/Mechanical; Unit; Melee | 矿:25 气:75 人口:-1 生命:40 护盾:30 能量:- | 间谍型空中单位。拥有永久隐形的能力。 / 侦测单位 |
| 侦察机 | `PhoenixPurifier` | `PhoenixPurifier, FleetBeacon, Phoenix, Stargate` | Unit; FactionPurifier | 矿:- 气:- 人口:- 生命:- 护盾:- 能量:- | 空中优势战机。可使用引力光束，升级后还可使用相位护甲技能。 / 可以对空。 |
| 折跃侦察机 | `Scout` | `Scout, Stargate` | Unit; FactionPurifier | 矿:250 气:75 人口:- 生命:150 护盾:100 能量:- | 多功能高速战机。 / 可以对地和对空。 |
| 激励者 | `SentryPurifier` | `SentryPurifier, Sentry` | Unit; FactionPurifier | 矿:- 气:- 人口:- 生命:- 护盾:- 能量:- | 机械支援单位。能够使用时空光束和相位模式技能。升级后可获得回收技能。 / 可以对地和对空。 |
| 哨兵 | `ZealotPurifier` | `ZealotPurifier, Zealot` | Unit; FactionPurifier | 矿:- 气:- 人口:- 生命:- 护盾:- 能量:- | 强大的近战战士。升级后可使用冲锋和重构技能。 / 可以对地。 |
| 巨像 | `Colossus` | `Colossus, RoboticsBay, RoboticsFacility` | Air/Ground; Armored/Massive/Mechanical; Unit; Melee | 矿:300 气:200 人口:-6 生命:250 护盾:100 能量:- | 步战机器人，装备强大的范围攻击武器。能够攀越悬崖。对空武器可以对其进行攻击。 / 可以对地。 |
| 航母 | `Carrier` | `Carrier, FleetBeacon, Stargate` | Air; Armored/Massive/Mechanical; Unit; Melee | 矿:350 气:250 人口:-6 生命:300 护盾:150 能量:- | 星灵的主力战舰。能够制造并发射拦截机攻击敌人。 / 可以对地和对空。 |

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
| 1 | 战斗单位的生命值与护盾 | `MasteryKaraxUnitVital` | `1` | +30% | - |
| 1 | 建筑生命值与护盾 | `MasteryKaraxBuildingVital` | `2` | +60% | - |
| 2 | 修理光束治疗 | `MasteryKaraxRepairBeamHeal` | `3` | 90%更快 | - |
| 2 | 亚顿之矛的能量回复速度在超级提速期间加快（净 +1能量，持续20秒） | `MasteryKaraxSoAChronoRegen` | `3` | +90能量，持续20秒 | - |
| 3 | 时空提速速度 | `MasteryKaraxChronoBoostSpeed` | `1` | +30%时空提速速度 | - |
| 3 | 亚顿之矛初始和最大能量 | `MasteryKaraxStartingAndMaxSoAEnergy` | `3` | +90 | - |

实现备注：当前默认六项精通全 30 点，不再做官方互斥取舍；若同一字段被多个精通/威望改写，必须进入 `CommanderModifierStackProfile` 明确叠加顺序。

## 07. 指挥官建筑

Owner：`CommanderBuildingProfile`、`CommanderBuildingAbilityProfile`、`CommanderBuildingReplacementProfile`。

### 当前 buildings.json 建筑清单

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 传送门 | `Gateway` | `Gateway` | Ground; Mechanical; Structure; Melee | 矿:150 气:- 人口:- 生命:500 护盾:500 能量:- | 使星灵可以利用折跃技术召集地面单位。 / 开启： / - 狂热者 |
| 光子炮台 | `PhotonCannon` | `PhotonCannon, Zealot` | Ground; Mechanical; Structure; Melee | 矿:150 气:- 人口:- 生命:150 护盾:150 能量:- | 主力防御建筑。 / 可以对地和对空。 / 侦测单位 |
| 护盾充能器 | `ShieldBattery` | `ShieldBattery` | Ground; Mechanical; Structure; FactionKhalai | 矿:100 气:- 人口:- 生命:200 护盾:200 能量:100 | 为附近的友方单位和建筑恢复护盾。升级后可以使用强固屏障。 |
| 太阳锻炉 | `SolarForge` | `SolarForge` | Ground; Armored/Mechanical/Structure; Structure; FactionKhalai | 矿:200 气:200 人口:- 生命:500 护盾:500 能量:- | 为亚顿之矛提供升级方案。 |
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
| 护盾充能器 | `ShieldBatteryRecharge` | 恢复 | `ShieldBatteryRechargeChanneled,Execute` | - | 为目标单位或建筑的护盾充能。 |
| 护盾充能器 | `StructureBarrierLocked` | 强固屏障 | - | `KaraxLevel06` | 该技能将在指挥官等级6时解锁。 |
| 护盾充能器 | `KaraxTurretRange` | 强化瞄准 | - | `HaveKaraxTurretRange` | 防御性建筑的射程提高2。 |
| 护盾充能器 | `KaraxEnergyRegenUpgrade` | 快速恢复 | - | `HaveKaraxEnergyRegenUpgrade` | 能量恢复速度提高200%。 |
| 护盾充能器 | `ShieldBatteryRecharge` | 恢复 | `ShieldBatteryRechargeEx5,Execute` | - | 为目标单位或建筑的护盾充能。 |
| 太阳锻炉 | `ResearchSolarEfficiencyLevel3Locked` | 研究太阳能利用率等级3 | - | `KaraxLevel08` | 该科技将在指挥官等级8时解锁。 |
| 太阳锻炉 | `ResearchSOARepairBeamExtraTargetLocked` | 研究强化修理系统 | - | `KaraxLevel08` | 该科技将在指挥官等级8时解锁。 |
| 太阳锻炉 | `ResearchSOAOrbitalStrikeUpgradeLocked` | 研究相位爆裂 | - | `KaraxLevel12` | 该科技将在指挥官等级12时解锁。 |
| 太阳锻炉 | `ResearchSOASolarLanceUpgradeLocked` | 研究太阳耀斑 | - | `KaraxLevel12` | 该科技将在指挥官等级12时解锁。 |
| 太阳锻炉 | `SolarEfficiencyPassiveLevel3` | 太阳能利用率等级3 | - | `HaveSolarEfficiencyLevel3` | 每为亚顿之矛产生{Effect,SolarForgeSolarEfficiency3MU,VitalArray[Energy].Change}点能量值。 |
| 太阳锻炉 | `SOARepairBeamExtraTargetPassive` | 强化修理系统 | - | `HaveSOARepairBeamExtraTarget` | 使亚顿之矛的重构光束能影响{$UpgradeEffectArrayValue:SOARepairBeamExtraTarget:Effect,KaraxRepairBeamLimit,Amount$}个额外目标。 |
| 太阳锻炉 | `SOAOrbitalStrikeUpgradePassive` | 相位爆裂 | - | `HaveSOAOrbitalStrikeUpgrade` | 亚顿之矛的轨道轰炸能使目标区域的敌人昏迷{Behavior,OrbitalStrikeStun,Duration}秒。 |
| 太阳锻炉 | `SOASolarLanceUpgradePassive` | 太阳耀斑 | - | `HaveSOASolarLanceUpgrade` | 亚顿之矛的太阳能射线枪点燃沿途的地面，在{Effect,SOASolarLanceFireBeamCP,PeriodCount*Effect,SOASolarLanceFireBeamCP,PeriodicPeriodArray[0]}秒内对路径上的敌人造成{Effect,... |
| 太阳锻炉 | `BrokenSolarForge` | 损坏的太阳锻炉 | `BrokenSolarForge,Execute` | - | 修理太阳锻炉 |
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

当前 Mod 下方面板复核：`GatewayKarax` 面板挂 `GatewayTrainKarax`，产出 `ZealotPurifier`、`SentryPurifier`；`WarpGateKarax` 面板挂 `WarpGateTrainKarax`，产出 `ZealotPurifier`、`SentryPurifier`；`RoboticsFacilityKarax` 面板挂 `RoboticsFacilityTrainKarax`，产出 `Observer`、`Colossus`、`ImmortalAiur`；`StargateKarax` 面板挂 `StargateTrainKarax`，产出 `PhoenixPurifier`、`Scout`、`Carrier`。这些是当前 Mod 的有效下方面板落点，不要只看文件前部共享 `Gateway` / `RoboticsFacility` / `Stargate` 块。

## 08. 科技建筑及其升级选项

Owner：`CommanderTechBuildingProfile`、`CommanderTechOptionProfile`、`CommanderUpgradeEffectProfile`。

### 15 级解锁与研究命令

| 等级 | 名称 | 解锁升级 | 解锁 AbilityCmd | 说明 |
|---|---|---|---|---|
| 1 | 机械大师 | - | - | 凯拉克斯的战斗单位生命值提高50%，但费用增加30%。轨道轰击不再拥有冷却时间或充能计数，每束打击现在消耗5点能量。 |
| 2 | 亚顿之矛：提速力场 | `KaraxSOAChronoPassive` | - | 所有友方建筑的生产速度提高15%。 / 被动技能。 |
| 3 | 新单位：凯达琳巨石 | `KaraxKhaydarinMonolithUnlock` | - | 异常强大的防御建筑。拥有超高的射程和伤害，但造价昂贵且攻击缓慢。 / 可以对空和对地。 |
| 4 | 光影议会升级包 | - | `TwilightCouncilResearch:13`, `TwilightCouncilResearch:12`, `EnergizerReclamation:`, `TwilightCouncilResearch:9`, `ZealotPurifierReviveDe... | 在光影议会中解锁以下升级： / 使警戒者在被杀死时可以自动复活。使激励者获得临时控制敌方机械单位的能力。激励者和护盾充能器的能量恢复速度提高200%。 |
| 5 | 亚顿之矛：时空过载 | `SOAMapWideChronoUpgrade` | - | 时空波动现在提高所有友方建筑的生产速度500%，持续20秒。 |
| 6 | 锻炉升级包 | - | `ForgeResearch:9`, `ForgeResearch:10`, `ShieldBatteryStructureBarrier:`, `ForgeResearch:11` | 在锻炉中解锁以下升级： / 光子炮台、凯达琳巨石和护盾充能器的射程提高2。光子炮台和凯达琳巨石的攻击速度提高25%。使护盾充能器能使建筑获得伤害吸收屏障。 |
| 7 | 亚顿之矛：重构光束 | `SOARepairBeam` | - | 自动对友方机械单位进行持续修理。最多可以同时修理3个目标。 / 被动技能。 |
| 8 | 太阳锻炉升级包1 | - | `SolarForgeResearch:2`, `SolarForgeResearch:3` | 在太阳锻炉解锁以下升级： / 重构光束可以影响一个额外目标。太阳能利用率等级3。 |
| 9 | 机械研究所升级包 | - | `RoboticsBayResearch:9`, `ImmortalShakurasShadowCannon:` | 在机械研究所解锁以下升级： / 解锁不朽者的暗影光炮技能，对一个敌方地面或空中单位造成320点伤害。巨像的攻击会在地面上留下火焰，造成额外的持续伤害。 |
| 10 | 亚顿之矛：净化光束 | `SOAPurifierBeam` | - | 发射一枚光束，在15秒内造成750（1500 vs 重甲单位）点伤害。若不手动控制，该光束会自动获取目标。 |
| 11 | 卡莱智慧 | `KaraxInstantStructureWarp` | - | 水晶塔、光子炮台、凯达琳巨石和护盾充能器可瞬间折跃完成。 |
| 12 | 太阳锻炉升级包2 | - | `SolarForgeResearch:4`, `SolarForgeResearch:5` | 在太阳锻炉解锁以下升级： / 轨道轰炸会使区域内的敌人昏迷。太阳能射线枪会在地面上留下火焰，造成额外的持续伤害。 |
| 13 | 亚顿之矛：净化协议 | `SOAPurifierBeamUpgrade` | - | 净化光束的移动速度提高200%，持续时间延长5秒。 |
| 14 | 舰队航标升级包 | `KaraxCarrierUpgrade` | `FleetBeaconResearch:16`, `FleetBeaconResearch:9` | 在舰队航标中解锁以下升级： / 允许幻影战机在受到伤害后暂时无敌。允许航母自动修理附近的机械单位。 |
| 15 | 统和屏障 | `KaraxUnitSpawnBarrier` | - | 所有友方单位获得一个屏障，能够阻挡一次至少20点伤害的攻击或法术。单位诞生时获得该屏障，并且该效果每240秒只能触发一次。 |

### Upgrade 摘要

| Upgrade | 父级 | 显示名 | Effect数 | 说明 |
|---|---|---|---|---|
| `CommanderPrestigeKaraxArmy` | `CommanderPrestige` | 圣堂表象 | 17 | 优点 / 战斗单位的消耗减少40%。 / 缺点 / 光子炮台和凯达琳巨石不可用。 |
| `CommanderPrestigeKaraxStructures` | `CommanderPrestige` | 战争建筑师 | 7 | 优点 / 重构光束的效率提高了100%，并且可以瞄准的建筑翻倍。统和屏障影响建筑，并且冷却时间缩短75%。时空提速、时空波动和提速力场会影响防御建筑并增加它们的攻击频率。 / 缺点 / 重构光束只能瞄准建筑物。统和屏障不再影响单位。 |
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
| `SOAMapWideChrono` | `-` | SOA全地图时空提速 | 0 | 使所有友方建筑的生产速度提高{Behavior,SOAMapWideChrono,Modification.RateMultiplierArray[Progress] * 100}%，持续{Behavior,SOAMapWideChrono,Duration}秒。 |
| `SOAMapWideChronoUpgrade` | `-` | SOAMap Wide Chrono Upgrade | 7 | - |
| `SOAOrbitalStrike` | `-` | - | 0 | 从高空轨道向战场发射5束激光，每一束造成{Effect,SOAOrbitalStrikeDamage,Amount}({Effect,SOAOrbitalStrikeDamage,AttributeBonus[Armored]+Effect,SOAOrbitalStrike... |
| `SOAPurifierBeam` | `-` | - | 0 | - |
| `SOAPurifierBeamUpgrade` | `-` | SOAPurifier Beam Upgrade | 3 | - |
| `SOARepairBeam` | `-` | - | 0 | 机械单位每秒自动修复{Effect,SOARepairBeamHeal,RechargeVitalRate}（{Effect,SOARepairBeamHealStructure,RechargeVitalRate}点对建筑）点生命值。同一时间最多可修复{Effect,Ka... |
| `SOARepairBeamExtraTarget` | `-` | 强化修理系统 | 1 | 每秒自动修理机械单位{Effect,SOARepairBeamHeal,RechargeVitalRate} ({Effect,SOARepairBeamHealStructure,RechargeVitalRate} vs 建筑)点生命值。最多可以同时修理5个目标。 / ... |
| `SOAThermalLance` | `-` | - | 0 | - |

### 研究/升级按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 传送门 | `UpgradeToWarpGate` | 变形为折跃门 | `UpgradeToWarpGate,Execute` | - | 将传送门升级为折跃门，使星灵可以利用折跃技术将地面单位召集到任何有水晶塔或折跃棱镜能量覆盖的区域。 |
| 侦察机 | `AnionPulseCrystal` | 阴离子脉冲水晶 | - | `HaveKaraxPhoenixRangeUpgrade` | 使幻影战机的射程提高2。 |
| 激励者 | `KaraxEnergyRegenUpgrade` | 快速恢复 | - | `HaveKaraxEnergyRegenUpgrade` | 能量恢复速度提高200%。 |
| 护盾充能器 | `KaraxEnergyRegenUpgrade` | 快速恢复 | - | `HaveKaraxEnergyRegenUpgrade` | 能量恢复速度提高200%。 |
| 太阳锻炉 | `ResearchSolarEfficiencyLevel3Locked` | 研究太阳能利用率等级3 | - | `KaraxLevel08` | 该科技将在指挥官等级8时解锁。 |
| 太阳锻炉 | `ResearchSOARepairBeamExtraTargetLocked` | 研究强化修理系统 | - | `KaraxLevel08` | 该科技将在指挥官等级8时解锁。 |
| 太阳锻炉 | `ResearchSOAOrbitalStrikeUpgradeLocked` | 研究相位爆裂 | - | `KaraxLevel12` | 该科技将在指挥官等级12时解锁。 |
| 太阳锻炉 | `ResearchSOASolarLanceUpgradeLocked` | 研究太阳耀斑 | - | `KaraxLevel12` | 该科技将在指挥官等级12时解锁。 |
| 太阳锻炉 | `SolarEfficiencyPassiveLevel3` | 太阳能利用率等级3 | - | `HaveSolarEfficiencyLevel3` | 每为亚顿之矛产生{Effect,SolarForgeSolarEfficiency3MU,VitalArray[Energy].Change}点能量值。 |
| 太阳锻炉 | `SOARepairBeamExtraTargetPassive` | 强化修理系统 | - | `HaveSOARepairBeamExtraTarget` | 使亚顿之矛的重构光束能影响{$UpgradeEffectArrayValue:SOARepairBeamExtraTarget:Effect,KaraxRepairBeamLimit,Amount$}个额外目标。 |
| 太阳锻炉 | `SOAOrbitalStrikeUpgradePassive` | 相位爆裂 | - | `HaveSOAOrbitalStrikeUpgrade` | 亚顿之矛的轨道轰炸能使目标区域的敌人昏迷{Behavior,OrbitalStrikeStun,Duration}秒。 |
| 太阳锻炉 | `SOASolarLanceUpgradePassive` | 太阳耀斑 | - | `HaveSOASolarLanceUpgrade` | 亚顿之矛的太阳能射线枪点燃沿途的地面，在{Effect,SOASolarLanceFireBeamCP,PeriodCount*Effect,SOASolarLanceFireBeamCP,PeriodicPeriodArray[0]}秒内对路径上的敌人造成{Effect,... |
| 太阳锻炉 | `BrokenSolarForge` | 损坏的太阳锻炉 | `BrokenSolarForge,Execute` | - | 修理太阳锻炉 |
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
| `cargo_light` | ZealotPurifier x6, SentryPurifier x2 | 机械前锋 | 哨兵抗线，激励者补增益。 | 设计草案；需按原始mod地图流程和实机日志继续校验。 |
| `cargo_heavy` | ImmortalAiur x2, Colossus x2, SentryPurifier x2 | 机械攻坚 | 不朽者/巨像配激励者。 | 设计草案；需按原始mod地图流程和实机日志继续校验。 |
| `cargo_air` | PhoenixPurifier x4, Observer x1 | 空中支援 | 侦察机和侦测器，避免常规给航母。 | 设计草案；需按原始mod地图流程和实机日志继续校验。 |
| `bonus_reward` | Carrier x1, Colossus x2 | 后期奖励 | 高价值机械单位用于奖励节点。 | 设计草案；需按原始mod地图流程和实机日志继续校验。 |
| `replacement_squad` | ZealotPurifier x8, ImmortalAiur x2 | 自动维修测试 | 适合验证建筑/机械维修光环。 | 设计草案；需按原始mod地图流程和实机日志继续校验。 |

### 接入规则

- 本模块不再从 `command_cards.json` 的运输/空投按钮自动推导货舱单位，也不把 `units.json` 全量清单当成可投放单位。
- 地图只传入 `mapId`、`scenarioKind`、目标点和运输模式；单位组合由 `CommanderCargoLoadoutProfile` 根据当前 commander、15 级 `power_fusion` roster 和场景限制解析。
- `原始mod` 已有运输机、空投舱、狮鹫运输、医疗运输机、坑道/深挖或感染运输容器时，应优先保留它的流程语义，只把硬编码单位替换为 profile 查询结果。
- 英雄、首领、终极进化、战列巡航舰、航母等高价值单位默认只能用于 `bonus_reward` 或显式允许英雄的地图场景。
实现备注：`CommanderMapDropProfile` 负责把地图事件映射为 `scenarioKind`；`CommanderScenarioFallbackProfile` 负责缺项降级并输出 `[XM_DBG][WARN][CARGO_FALLBACK]`。

## 10. 指挥官特殊机制

Owner：`CommanderSpecialMechanicProfile`、`CommanderSpecialResourceProfile`、`CommanderSpecialMechanicHookProfile`、`CommanderSpecialMechanicUnitProfile`。

本指挥官重点：亚顿之矛能量、建筑自动维修、单位机械强化。

### 特殊机制命中项

- 机械大师 (Karax)
- 亚顿之矛：提速力场 (KaraxUnlockSOAChronoPassive)
- 新单位：凯达琳巨石 (KaraxUnlockKhaydarinMonolith)
- 光影议会升级包 (KaraxTwilightCouncilUpgradesPack)
- 亚顿之矛：时空过载 (KaraxMassChronoUpgrade)
- 锻炉升级包 (KaraxForgeUpgradesPack)
- 亚顿之矛：重构光束 (KaraxUnlockRepairBeam)
- 太阳锻炉升级包1 (KaraxSolarForgeUpgradesPack1)
- 机械研究所升级包 (KaraxRoboticsBayUpgradesPack)
- 亚顿之矛：净化光束 (KaraxUnlockPurifierBeam)
- 卡莱智慧 (KaraxInstantStructureWarp)
- 太阳锻炉升级包2 (KaraxSolarForgeUpgradesPack2)
- 亚顿之矛：净化协议 (KaraxPurifierBeamUpgrade)
- 舰队航标升级包 (KaraxFleetBeaconUpgrades)
- 统和屏障 (KaraxUnitSpawnBarrier)

### 特殊机制 Upgrade 候选

- 圣堂表象 (`CommanderPrestigeKaraxArmy`)
- 战争建筑师 (`CommanderPrestigeKaraxStructures`)
- CommanderPrestigeKaraxStructuresMastery (`CommanderPrestigeKaraxStructuresMastery`)
- CommanderPrestigeKaraxStructuresMasteryChronoBoostSpeed (`CommanderPrestigeKaraxStructuresMasteryChronoBoostSpeed`)
- CommanderPrestigeKaraxStructuresPerk (`CommanderPrestigeKaraxStructuresPerk`)
- 天界太阳能 (`CommanderPrestigeKaraxTopBar`)
- Karax Carrier Upgrade (`KaraxCarrierUpgrade`)
- 凯拉克斯 (`KaraxCommander`)
- Karax Instant Structure Warp (`KaraxInstantStructureWarp`)
- Karax Khaydarin Monolith Unlock (`KaraxKhaydarinMonolithUnlock`)
- Karax SOA Chrono Passive (`KaraxSOAChronoPassive`)
- Karax Unit Spawn Barrier (`KaraxUnitSpawnBarrier`)
- 精通 凯拉克斯 建筑生命值 (`MasteryKaraxBuildingVital`)
- 精通 凯拉克斯 时空提速速度 (`MasteryKaraxChronoBoostSpeed`)
- 精通 凯拉克斯 修理光束治疗 (`MasteryKaraxRepairBeamHeal`)
- 精通 凯拉克斯 亚顿之矛时空恢复 (`MasteryKaraxSoAChronoRegen`)
- 精通 凯拉克斯 亚顿之矛起始和最大能量值 (`MasteryKaraxStartingAndMaxSoAEnergy`)
- 精通 凯纳克斯 单位活力 (`MasteryKaraxUnitVital`)
- SOA全地图时空提速 (`SOAMapWideChrono`)
- SOAMap Wide Chrono Upgrade (`SOAMapWideChronoUpgrade`)
- 还有 2 项，后续从源 JSON 继续展开。

### 特殊机制按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 不朽者 | `ShadowCannonLocked` | 暗影光炮 | - | `KaraxLevel09` | 该技能将在指挥官等级9时解锁。 |
| 侦察机 | `AnionPulseCrystal` | 阴离子脉冲水晶 | - | `HaveKaraxPhoenixRangeUpgrade` | 使幻影战机的射程提高2。 |
| 光子炮台 | `KaraxTurretRange` | 强化瞄准 | - | `HaveKaraxTurretRange` | 防御性建筑的射程提高2。 |
| 光子炮台 | `KaraxTurretAttackSpeed` | 军械优化 | - | `HaveKaraxTurretAttackSpeed` | 防御性建筑的攻击速度提高25%。 |
| 激励者 | `ReclamationLocked` | 回收 | - | `KaraxLevel04` | 该技能将在指挥官等级4时解锁。 |
| 激励者 | `KaraxEnergyRegenUpgrade` | 快速恢复 | - | `HaveKaraxEnergyRegenUpgrade` | 能量恢复速度提高200%。 |
| 护盾充能器 | `StructureBarrierLocked` | 强固屏障 | - | `KaraxLevel06` | 该技能将在指挥官等级6时解锁。 |
| 护盾充能器 | `KaraxTurretRange` | 强化瞄准 | - | `HaveKaraxTurretRange` | 防御性建筑的射程提高2。 |
| 护盾充能器 | `KaraxEnergyRegenUpgrade` | 快速恢复 | - | `HaveKaraxEnergyRegenUpgrade` | 能量恢复速度提高200%。 |
| 太阳锻炉 | `ResearchSolarEfficiencyLevel3Locked` | 研究太阳能利用率等级3 | - | `KaraxLevel08` | 该科技将在指挥官等级8时解锁。 |
| 太阳锻炉 | `ResearchSOARepairBeamExtraTargetLocked` | 研究强化修理系统 | - | `KaraxLevel08` | 该科技将在指挥官等级8时解锁。 |
| 太阳锻炉 | `ResearchSOAOrbitalStrikeUpgradeLocked` | 研究相位爆裂 | - | `KaraxLevel12` | 该科技将在指挥官等级12时解锁。 |
| 太阳锻炉 | `ResearchSOASolarLanceUpgradeLocked` | 研究太阳耀斑 | - | `KaraxLevel12` | 该科技将在指挥官等级12时解锁。 |
| 太阳锻炉 | `SolarEfficiencyPassiveLevel3` | 太阳能利用率等级3 | - | `HaveSolarEfficiencyLevel3` | 每为亚顿之矛产生{Effect,SolarForgeSolarEfficiency3MU,VitalArray[Energy].Change}点能量值。 |
| 太阳锻炉 | `SOARepairBeamExtraTargetPassive` | 强化修理系统 | - | `HaveSOARepairBeamExtraTarget` | 使亚顿之矛的重构光束能影响{$UpgradeEffectArrayValue:SOARepairBeamExtraTarget:Effect,KaraxRepairBeamLimit,Amount$}个额外目标。 |
| 太阳锻炉 | `SOAOrbitalStrikeUpgradePassive` | 相位爆裂 | - | `HaveSOAOrbitalStrikeUpgrade` | 亚顿之矛的轨道轰炸能使目标区域的敌人昏迷{Behavior,OrbitalStrikeStun,Duration}秒。 |
| 太阳锻炉 | `SOASolarLanceUpgradePassive` | 太阳耀斑 | - | `HaveSOASolarLanceUpgrade` | 亚顿之矛的太阳能射线枪点燃沿途的地面，在{Effect,SOASolarLanceFireBeamCP,PeriodCount*Effect,SOASolarLanceFireBeamCP,PeriodicPeriodArray[0]}秒内对路径上的敌人造成{Effect,... |
| 太阳锻炉 | `BrokenSolarForge` | 损坏的太阳锻炉 | `BrokenSolarForge,Execute` | - | 修理太阳锻炉 |
| 光影议会 | `ResearchReconstructionLocked` | 研究重构 | - | `KaraxLevel04` | 该科技将在指挥官等级4时解锁。 |
| 光影议会 | `ResearchReclamationLocked` | 研究回收 | - | `KaraxLevel04` | 该科技将在指挥官等级4时解锁。 |
| 哨兵 | `ReconstructionLocked` | 重构 | - | `KaraxLevel04` | 该技能将在指挥官等级4时解锁。 |
| 哨兵 | `-` | - | - | `ZealotPurifierReviveKaraxHide` | - |
| 巨像 | `ExtendedThermalLance` | 加长热能射线枪 | - | `HaveKaraxExtendedThermalLance` | 使巨像的射程提高3。 |

实现备注：凡是涉及局内状态、资源、堆叠、全局计时器、隐藏 caster、英雄成长或召唤首领的机制，都必须有 runtime hook 和 `[XM_DBG]` 日志。

当前 runtime 落点：`XMFinal` 通过 `LibE0EAE146_KaraxRuntime.galaxy` 在 `InitializeBase` 的 `Karax` 分支创建 `SoACasterKarax` 并执行 `CU_GPInit(1, "Karax", caster, null)`；`lp_createHero == true` 时同一入口创建 `KaraxChampion`。地图/货舱的 `KaraxCreateMapStartSquad("hero")` 和 `KaraxCreateCargoSquad("hero")` 也显式包含 `KaraxChampion`。

## 11. 指挥官个性化机制

Owner：`CommanderPersonalMechanicProfile`、`CommanderPersonalMechanicEffectProfile`、`CommanderPersonalMechanicHookProfile`、`CommanderPersonalMechanicRequirementProfile`。

本指挥官重点：建筑自动维修、亚顿之矛能量与机械单位强化应由个人机制 profile 接入。

### 威望正向融合输入

| 威望 ID | 名称 | Primary Upgrade | 禁用单位 | 启用单位 | 禁用 Ability | 补充 Upgrade |
|---|---|---|---|---|---|---|
| `CommanderPrestigeKaraxStructures` | - | `CommanderPrestigeKaraxStructures` | - | - | - | `KaraxStructures1`, `KaraxStructures2`, `KaraxStructures3` |
| `CommanderPrestigeKaraxArmy` | - | `CommanderPrestigeKaraxArmy` | `PhotonCannon`, `KhaydarinMonolith` | - | `ForgeResearch:10` | - |
| `CommanderPrestigeKaraxTopBar` | - | `CommanderPrestigeKaraxTopBar` | - | - | `TimeWarp:`, `SOAMapWideChrono:` | - |

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
[XM_DBG][INFO][ROSTER_LOAD] commander=Karax stage=power_fusion units=8 buildings=5 heroes=0 result=ok
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
