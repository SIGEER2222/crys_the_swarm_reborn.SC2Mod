# 斯旺（Swann）指挥官细化

日期：2026-05-27

## 当前口径

当前指挥官默认 15 级，不从 1 级开始；精通默认 6 项全部 30 点；威望默认只取正面收益，不直接启用官方 `PlayerPrestige`。`initial` 只作为官方基础状态审计和差异对照，默认测试和玩法应看 `power_fusion` 最终状态。

本文件按 `docs/newdocs/模块拆分` 的 11 个模块整理 斯旺。依据 `游戏数据/官方合作指挥官/commanders/Swann/` 的 JSON 摘要生成；具体 Ability、Behavior、Weapon、Actor、Effect、Requirement 闭包仍需继续追 `references/sc2-build-96883-casc-export/` 或实机 `[XM_DBG]` 日志。

## 官方数据摘要

| 项 | 值 |
|---|---|
| CommanderId | `TerranSwann` |
| 中文名 | 斯旺 |
| 默认升级 | `SwannCommander` |
| 默认能力命令 | `EngineeringBayResearch:, FactoryTechLabResearch:13, ArmoryResearchVoidCoop:3, ArmoryResearchVoidCoop:4, ArmoryResearchVoidCoop:5, ArmoryResearchVoidCoop:, ArmoryResearchVoidCoop:1, ArmoryResearchVoidCoop:2` |
| 威望 ID | `CommanderPrestigeSwannDrill, CommanderPrestigeSwannTurrets, CommanderPrestigeSwannHercules` |
| heroes 数量 | 0 |
| roster 数量 | 15 |
| units 数量 | 9 |
| buildings 数量 | 6 |
| command card 对象数 | 15 |
| upgrades 数量 | 25 |
| source | `mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/userdata.xml` |

roster 样例：

```text
Hellion, MiniDrakkenLaserDrill, MissileTurret, KelMorianGrenadeTurret, PerditionTurret, Wraith, SCV, Goliath, CommandCenter, Siege Tank, SupplyDepot, Hercules, Hellbat, Cyclone, ScienceVessel
```

## 15 级解锁摘要

- 1: 载具专家
- 2: 战斗空投
- 3: 贝蒂家族
- 4: 德拉肯激光钻机：脉冲炮
- 5: 瓦斯采集器
- 6: 新单位：雷神
- 7: 重工厂升级包
- 8: 高级建造
- 9: 军械库升级包
- 10: 科技反应堆
- 11: 工程站升级包
- 12: 永生程序
- 13: 星港升级包
- 14: 加量不加价
- 15: 机械专业

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
| Lv4 德拉肯激光钻机：脉冲炮 | 4 | `DrakkenLaserDrillNuke:` | `-` | 使德拉肯激光钻机能进行二次升级，将它的攻击伤害由30提高到50， / 并解锁脉冲炮技能，对目标区域内的敌方单位和建筑造成600点伤害。通过顶部面板来激活脉冲炮。 |
| Lv4 德拉肯激光钻机：脉冲炮 | 4 | `DrakkenLaserDrillResearch:1` | `-` | 使德拉肯激光钻机能进行二次升级，将它的攻击伤害由30提高到50， / 并解锁脉冲炮技能，对目标区域内的敌方单位和建筑造成600点伤害。通过顶部面板来激活脉冲炮。 |
| Lv4 德拉肯激光钻机：脉冲炮 | 4 | `DrakkenLaserDrillPulseCannonIssueOrder:` | `-` | 使德拉肯激光钻机能进行二次升级，将它的攻击伤害由30提高到50， / 并解锁脉冲炮技能，对目标区域内的敌方单位和建筑造成600点伤害。通过顶部面板来激活脉冲炮。 |

### command card 命中

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 大力神 | `RapidDeploymentHercules` | 快速部署 | `-` | - | 大力神对舱载单位的部署速度是之前的两倍。 |
| 科学船 | `FleetwideJump` | 战术跳跃 | `CommanderPrestigeSwannHerculesScienceVesselTacticalJump,Execute` | - | 折跃到目标位置。飞行器折跃期间处于无敌状态。 |
| 迷你德拉肯激光钻机 | `BrokenDrakkenLaserDrill` | 损坏的德拉肯激光钻机 | `BrokenDrakkenLaserDrill,Execute` | - | - |
| 迷你德拉肯激光钻机 | `ResearchDrakkenLaserDrillNuke` | 升级2级激光钻机 | `DrakkenLaserDrillResearch,Research2` | - | 启用脉冲炮技能，并使德拉肯激光钻机的攻击力+20。 |
| SCV | `CommandCenter` | 建造指挥中心 | `TerranBuild,Build1` | - | 基础建筑，用于接收采集到的资源。自体可以升空，可以升级成为轨道控制基地或行星要塞。 / 开启： / - SCV |
| SCV | `Barracks` | 建造兵营 | `TerranBuild,Build4` | - | 步兵训练设施。 / 开启： / - 陆战队员 / - 收割者 / - 使SCV可以建造地堡 / - 使指挥中心可以升级为轨道控制基地 |
| SCV | `Starport` | 建造星港 | `TerranBuild,Build12` | - | 空中单位生产设施。 / 开启： / - 维京战机 / - 医疗运输机 / - 解放者 |
| SCV | `FusionCore` | 建造聚变芯体 | `TerranBuild,Build16` | - | 为医疗运输机、解放者、战列巡航舰提供升级方案。 / 开启： / - 可在星港中建造战列巡航舰 |
| 指挥中心 | `OrbitalCommand` | 升级为轨道控制基地 | `UpgradeToOrbital,Execute` | - | 使指挥中心升级为轨道控制基地，并启用析像扫描和轨道空投：矿骡技能。无法装载SCV。 |
| 指挥中心 | `CommandCenterLoad` | 装载 | `CommandCenterTransport,LoadAll` | - | 将附近的SCV装载进指挥中心。 |
| 指挥中心 | `CommandCenterUnloadAll` | 全部卸载 | `CommandCenterTransport,UnloadAll` | - | 卸载所有单位。 |

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

口径：无常规英雄；钻机不按英雄单位处理。

待审计：Hero Unit、Ability、Behavior、Weapon、Actor、Sound、复活/重生、能量/资源、形态切换和威望改写闭包。

## 03. 普通单位技能及其进化功能

Owner：`CommanderUnitAbilityProfile`、`CommanderUnitStatProfile`、`CommanderUnitEvolutionProfile`、`CommanderUnitBehaviorProfile`、`CommanderUnitWeaponProfile`。

### 单位技能按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 飓风 | `CycloneLockOnDamageUpgrade` | 电磁力场加速器 | `-` | HaveCycloneLockOnDamageUpgrade | 提高飓风的锁定伤害。 |
| 飓风 | `LockOn` | 锁定 | `LockOn,Execute` | - | 使飓风的武器锁定目标单位，将飓风的射程提升至{Validator,LockOnCasterNearTargetUpgraded,Range}，且可以在开火... |
| 飓风 | `LockOnRangeUpgrade` | 瞄准光学镜 | `-` | HaveCycloneLockOnRangeUpgrade2 | 飓风的锁定范围增加3。 |
| 飓风 | `LockOnCancel` | 取消 | `LockOnCancel,Execute` | - | 取消当前的锁定，使你可以选择一个新的目标。 |
| 飓风 | `LockOn` | 锁定 | `LockOn,Execute` | - | 使飓风的武器锁定目标单位，将飓风的射程提升至{Validator,LockOnCasterNearTargetUpgraded,Range}，且可以在开火... |
| 飓风 | `CycloneLockOnDamageUpgrade` | 电磁力场加速器 | `-` | HaveCycloneLockOnDamageUpgrade | 提高飓风的锁定伤害。 |
| 飓风 | `LockOnCancel` | 取消 | `LockOnCancel,Execute` | - | 取消当前的锁定，使你可以选择一个新的目标。 |
| 恶蝠 | `ResearchHighCapacityBarrels` | 研究地狱火预燃器 | `-` | HaveInfernalPreigniter | 强化恶火的地狱火喷射器，使其对轻甲单位造成额外{$UpgradeEffectArrayValue:HighCapacityBarrels:Effect,I... |
| 恶蝠 | `MorphToHellion` | 恶火模式 | `MorphToHellion,Execute` | - | 快速的侦察者，可对一条直线上的所有敌方单位造成火焰伤害。可变形为近距离战斗单位。 / 可以对地。 |
| 恶蝠 | `PassiveInfernalPreIgniter` | 地狱火预燃器 | `-` | HaveInfernalPreigniter | 恶蝠在两种模式下对轻甲单位造成的伤害提高15点。 |
| 恶蝠 | `HellArmor` | 地狱火装甲 | `-` | HaveHellbatHellArmor | 恶蝠和恶火的护甲提高2点。 |
| 大力神 | `HyperjumpHercules` | 战术跳跃 | `Hyperjump,Execute` | - | 折跃到目标位置。大力神折跃期间处于无敌状态。 |
| 大力神 | `RapidDeploymentHercules` | 快速部署 | `-` | - | 大力神对舱载单位的部署速度是之前的两倍。 |
| 科学船 | `FleetwideJump` | 战术跳跃 | `CommanderPrestigeSwannHerculesScienceVesselTacticalJump,Execute` | - | 折跃到目标位置。飞行器折跃期间处于无敌状态。 |
| 科学船 | `NanoRepair` | NanoRepair | `NanoRepair,Execute` | - | - |
| 科学船 | `DefensiveMatrixTarget` | 防御矩阵 | `DefensiveMatrixTarget,Execute` | - | 在目标四周生成一道屏障，吸收{Behavior,DefensiveMatrix,Modification.VitalMaxArray[1]}点伤害。效果持... |
| 科学船 | `ImprovedNanoRepair` | 强化纳米修复 | `-` | HaveScienceVesselFreeRepair | 科学船的纳米修复不再消耗能量。 |
| 科学船 | `-` | - | `ScienceVesselNanoRepairDouble,Execute` | - | - |
| 科学船 | `-` | - | `VoidScienceVesselNanoRepair,Execute` | - | - |
| 恶火 | `ResearchHighCapacityBarrels` | 研究地狱火预燃器 | `-` | HaveInfernalPreigniter | 强化恶火的地狱火喷射器，使其对轻甲单位造成额外{$UpgradeEffectArrayValue:HighCapacityBarrels:Effect,I... |
| 恶火 | `MorphToHellionTank` | 恶蝠模式 | `MorphToHellionTank,Execute` | - | 近距离战斗单位，对前方小范围锥形区域造成伤害。可变形为快速侦察单位。 / 可以对地。 |
| 恶火 | `PassiveInfernalPreIgniter` | 地狱火预燃器 | `-` | HaveInfernalPreigniter | 恶蝠在两种模式下对轻甲单位造成的伤害提高15点。 |
| 恶火 | `HellArmor` | 地狱火装甲 | `-` | HaveHellbatHellArmor | 恶蝠和恶火的护甲提高2点。 |
| 怨灵战机 | `ImprovedBurstLaser` | 脉冲增幅器 | `-` | HaveWraithImprovedBurstLaser | 怨灵战机移动时，双子飞弹的伤害提高{(Behavior,SwannGeminiMissileMovementBuff,DamageResponse.Mod... |
| SCV | `GhostAcademyNova` | 建造幽灵军校 | `TerranBuild,Build15` | - | 为诺娃提供升级方案。 / 开启： / - 可以在兵营中训练幽灵 / - 诺娃可以使用战术聚变打击 |
| SCV | `SwannBarracks` | 兵营已禁用 | `-` | HaveSwannCommander | 斯旺的基础生产建筑是重工厂而不是兵营。 / 重工厂可以在SCV的高级建筑菜单中找到。 |
| SCV | `AdvancedConstructionAuto` | 高级建造 | `AdvancedConstructionAuto,Execute` | - | 多台SCV可同时建造同一个建筑，缩短其建造时间。修理不消耗资源。 |
| SCV | `AdvancedConstructionLocked` | 高级建造 | `-` | SwannLevel08 | 该技能将在指挥官等级8时解锁。 |
| SCV | `BuildLaserTurret` | 建造磁轨炮塔 | `TerranBuildFullRefund,Build1` | - | 自动化防御炮塔。对一条直线上的所有敌方地面单位造成伤害。 / 可以对地。 |
| SCV | `BuildFusionCoreLocked` | 建造聚变芯体 | `-` | RaynorLevel06 | 该单位将在指挥官等级6时解锁。 |
| SCV | `SensorTower` | 建造感应塔 | `TerranBuild,Build9` | - | 在大范围内显示敌方单位的位置。敌方单位可以看到感应塔的侦测范围。 |
| SCV | `PsiDisruptor` | PsiDisruptor | `TerranBuild,Build8` | - | - |
| SCV | `BuildKelMorianRocketTurret` | 建造毁灭炮塔 | `TerranBuild,Build27` | - | 对重甲单位造成额外伤害。攻击会使敌人减速。 / 可以对地。 |
| SCV | `CommandCenter` | 建造指挥中心 | `TerranBuild,Build1` | - | 基础建筑，用于接收采集到的资源。自体可以升空，可以升级成为轨道控制基地或行星要塞。 / 开启： / - SCV |
| SCV | `Refinery` | 建造精炼厂 | `TerranBuild,Build3` | - | 建造在瓦斯气泉上，用于采集高能瓦斯。 |
| SCV | `SupplyDepot` | 建造补给站 | `TerranBuild,Build2` | - | 为人类部队提供补给， / 提高本方单位数量上限。 / 补给站可以降下，允许地面单位出入。 |
| SCV | `Barracks` | 建造兵营 | `TerranBuild,Build4` | - | 步兵训练设施。 / 开启： / - 陆战队员 / - 收割者 / - 使SCV可以建造地堡 / - 使指挥中心可以升级为轨道控制基地 |
| SCV | `EngineeringBay` | 建造工程站 | `TerranBuild,Build5` | - | 为人类步兵单位和建筑提供升级方案。 / 开启： / - 使SCV可以建造导弹塔 / - 使SCV可以建造感应塔 / - 使指挥中心可升级为行星要塞 |
| SCV | `Bunker` | 建造地堡 | `TerranBuild,Build7` | - | 防御工事。 / 步兵单位在地堡内作战。 / 效果加成：舱载单位射程增加1。 |
| SCV | `MissileTurret` | 建造导弹塔 | `TerranBuild,Build6` | - | 防空建筑。 / 可以对空 / 侦测单位 |
| SCV | `SensorTower` | 建造感应塔 | `TerranBuild,Build9` | - | 在大范围内显示敌方单位的位置。敌方单位可以看到感应塔的侦测范围。 |
| SCV | `GhostAcademy` | 建造幽灵军校 | `TerranBuild,Build10` | - | 能够制造供幽灵使用的聚变弹头，并为幽灵提供升级方案。 / 开启： / - 可以在兵营中训练幽灵 |
| SCV | `Factory` | 建造重工厂 | `TerranBuild,Build11` | - | 战车生产设施。 / 开启： / - 恶火 / - 寡妇雷 / - 飓风 |
| SCV | `Armory` | 建造军械库 | `TerranBuild,Build14` | - | 为重工厂和星港制造的单位提供武器和护甲升级方案。 / 开启： / - 可以在重工厂中制造恶蝠 / - 可以在重工厂中制造雷神 |
| SCV | `Starport` | 建造星港 | `TerranBuild,Build12` | - | 空中单位生产设施。 / 开启： / - 维京战机 / - 医疗运输机 / - 解放者 |
| SCV | `FusionCore` | 建造聚变芯体 | `TerranBuild,Build16` | - | 为医疗运输机、解放者、战列巡航舰提供升级方案。 / 开启： / - 可在星港中建造战列巡航舰 |
| ... | ... | ... | ... | ... | 还有 7 项，后续从 command_cards.json 继续展开 |


备注：已过滤 14 个通用移动/攻击/取消类按钮，保留英雄技能、装备、被动、威望或形态相关候选。
### 进化/形态/切换候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 恶蝠 | `MorphToHellion` | 恶火模式 | `MorphToHellion,Execute` | - | 快速的侦察者，可对一条直线上的所有敌方单位造成火焰伤害。可变形为近距离战斗单位。 / 可以对地。 |
| 恶蝠 | `PassiveInfernalPreIgniter` | 地狱火预燃器 | `-` | HaveInfernalPreigniter | 恶蝠在两种模式下对轻甲单位造成的伤害提高15点。 |
| 恶火 | `MorphToHellionTank` | 恶蝠模式 | `MorphToHellionTank,Execute` | - | 近距离战斗单位，对前方小范围锥形区域造成伤害。可变形为快速侦察单位。 / 可以对地。 |
| 恶火 | `PassiveInfernalPreIgniter` | 地狱火预燃器 | `-` | HaveInfernalPreigniter | 恶蝠在两种模式下对轻甲单位造成的伤害提高15点。 |
| SCV | `Barracks` | 建造兵营 | `TerranBuild,Build4` | - | 步兵训练设施。 / 开启： / - 陆战队员 / - 收割者 / - 使SCV可以建造地堡 / - 使指挥中心可以升级为轨道控制基地 |
| SCV | `EngineeringBay` | 建造工程站 | `TerranBuild,Build5` | - | 为人类步兵单位和建筑提供升级方案。 / 开启： / - 使SCV可以建造导弹塔 / - 使SCV可以建造感应塔 / - 使指挥中心可升级为行星要塞 |
| 指挥中心 | `OrbitalCommand` | 升级为轨道控制基地 | `UpgradeToOrbital,Execute` | - | 使指挥中心升级为轨道控制基地，并启用析像扫描和轨道空投：矿骡技能。无法装载SCV。 |
| 指挥中心 | `UpgradeToPlanetaryFortress` | 升级为行星要塞 | `UpgradeToPlanetaryFortress,Execute` | - | 添置一个强力炮塔，并且提高护甲。 / 可以对地。 |
| 攻城坦克 | `MoveHoldPosition` | 原地防御 | `move,HoldPos` | - | 命令选中的单位待在原地，并攻击射程内的敌方目标。接受命令的单位不会对敌人进行追击或移向敌人与其交战。 |
| 攻城坦克 | `MovePatrol` | 巡逻 | `move,Patrol` | - | 命令选中的单位在当前位置与目标区域间进行巡逻。巡逻的单位会对敌人发起攻击或移向附近的敌人与其交战。 |
| 攻城坦克 | `CommanderSwannImmortalityProtocol` | 永生程序 | `-` | HaveSwannCommanderImmortalityProtocol | 解锁重建能力。使被摧毁的雷神和攻城坦克能在战场上重建。 |
| 攻城坦克 | `SiegeMode` | 攻城模式 | `SiegeMode,Execute` | - | 部署为攻城模式。在该模式下，攻城坦克的射程极大提高，并可造成范围伤害，但无法移动和攻击近距离目标。 |
| 攻城坦克 | `AfterburnersLocked` | 后燃推进系统 | `-` | RaynorLevel11 | 该技能将在指挥官等级11时解锁。 |
| 攻城坦克 | `MaelstromRounds` | MaelstromRounds | `-` | HaveMaelstromRounds | 攻城坦克在攻城模式下的攻击力提高40点。溅射伤害保持不变。 |

实现备注：单位自己声明技能、形态和升级接入口；科技建筑只展示符合条件的研究项，不直接拥有单位升级逻辑。英雄单位已从本模块候选中排除，统一归 `02. 英雄单位及其技能`。

## 04. 初始化基地与特殊建筑

Owner：`CommanderRuntimeProfile`、`CommanderScenarioLoadout`、`CommanderSpecialStructureProfile`、`CommanderInitialCasterProfile`。

### 初始化建筑候选

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 指挥中心 | `CommandCenter` | `CommandCenter` | Ground; Armored/Mechanical/Structure | 矿:400 气:- 人口字段:15 生命:1500 护盾:- 能量:- | 基础建筑，用于接收采集到的资源。自体可以升空，可以升级成为轨道控制基地或行星要塞。 / 开启： / - SCV |
| 补给站 | `SupplyDepot` | `SupplyDepot` | Ground; Armored/Mechanical/Structure | 矿:100 气:- 人口字段:8 生命:400 护盾:- 能量:- | 为人类部队提供补给， / 提高本方单位数量上限。 / 补给站可以降下，允许地面单位出入。 |

### 特殊建筑候选

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 迷你德拉肯激光钻机 | `MiniDrakkenLaserDrill` | `DrakkenLaserDrillCoop` | Ground; Armored/Heroic/Mechanical/Structure | 矿:- 气:- 人口字段:- 生命:3000 护盾:- 能量:- | 17.4万兆瓦激光钻头。太阳的力量就在你的指间。 / 可以对地和对空。 |

实现备注：测试台切换指挥官时调用本指挥官 initializer，负责替换主基地、工人、运输机/投放单位、隐藏 caster、英雄初始单位和特殊建筑。

## 05. 指挥官兵种

Owner：`CommanderRosterProfile`、`CommanderUnitProfile`、`CommanderUnitTrainProfile`、`CommanderUnitStageProfile`、`CommanderUnitRequirementProfile`。

来源：官方提取 `units.json`。这里列的是当前已提取普通/生产单位 Catalog 对象；英雄单位单独在 `02. 英雄单位及其技能` 中维护。满级替换、威望正向融合或进化变体仍以 `power_fusion` 审计结果为准。

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 恶火 | `Hellion` | `Hellion` | Ground; Light/Mechanical | 矿:100 气:- 人口字段:-2 生命:90 护盾:- 能量:- | 快速的侦察者，可对一条直线上的所有敌方单位造成火焰伤害。可变形为近距离战斗单位。 / 可以对地。 |
| 怨灵战机 | `Wraith` | `Wraith` | -; - | 矿:- 气:- 人口字段:- 生命:- 护盾:- 能量:- | 高度机动性空中单位。擅长突袭打击。 / 可以对地和对空。 |
| SCV | `SCV` | `SCV` | Ground; Biological/Light/Mechanical | 矿:50 气:- 人口字段:-1 生命:45 护盾:- 能量:- | 基础工作单位。用于采集资源、建造人类建筑和修理。 / 可以对地。 |
| 歌利亚武装机器人 | `Goliath` | `Goliath` | -; - | 矿:- 气:- 人口字段:- 生命:- 护盾:- 能量:- | 重火力支援单位。 / 可以对地和对空。 |
| 攻城坦克 | `Siege Tank` | `SiegeTank` | Ground; Armored/Mechanical | 矿:150 气:125 人口字段:-3 生命:175 护盾:- 能量:- | 重型坦克。可切换至攻城模式来提供远程炮火。 / 可以对地。 |
| 大力神 | `Hercules` | `Hercules` | -; - | 矿:100 气:50 人口字段:-3 生命:- 护盾:- 能量:- | 巨型运输机。可以进行战术跳跃。 |
| 恶蝠 | `Hellbat` | `HellionTank` | Ground; Biological | 矿:100 气:- 人口字段:-2 生命:135 护盾:- 能量:- | 近距离作战单位。对前方小范围锥形区域造成伤害。可以变形为快速侦察单位。 / 可以对地。 |
| 飓风 | `Cyclone` | `Cyclone` | Ground; Armored/Mechanical | 矿:150 气:100 人口字段:-3 生命:120 护盾:- 能量:- | 机动突击型载具。可以使用锁定技能在移动状态下快速开火。 / 可以对地。 |
| 科学船 | `ScienceVessel` | `ScienceVessel` | -; Psionic | 矿:- 气:- 人口字段:- 生命:- 护盾:- 能量:- | 空中支援单位。能够使用辐照和纳米修复技能。 / 侦测单位 |

三阶段口径：`initial` 只做审计，`level15` 表示满级解锁，`power_fusion` 表示 15 级 + 六精通全满 + 威望正向收益后的默认运行清单。

## 06. 指挥官精通

Owner：`CommanderMasteryProfile`、`CommanderMasteryEffectProfile`、`CommanderMasteryModifierProfile`。

| 组 | 名称 | Upgrade | 每点 | 30点口径 |
|---|---|---|---|---|
| 1 | 汇聚射线的伤害和宽度 | `MasterySwannConcentratedBeam` | 2, 8 | +~B~点伤害 +60%宽度 |
| 1 | 战斗空投的持续时间和生命值 | `MasterySwannCombatDrop` | 2, 2 | +60%持续时间 +~B~%生命值 |
| 2 | 永生程序的消耗与用时 | `MasterySwannImmortalityProtocol` | 2 | -60% |
| 2 | 建筑生命值 | `MasterySwannBuildingHealth` | 2 | +60% |
| 3 | 减少瓦斯采集器消耗 | `MasterySwannVespeneHarvesterCost` | 3 | -90%消耗 |
| 3 | 激光钻机建造时间、升级时间以及升级费用 | `MasterySwannLaserDrillBuildTime` | 1.5, 1 | -45% |

实现备注：当前默认六项全部 30 点。表里的 30 点口径由 `point_increments * 30` 推导，最终数值仍需以 Upgrade Effect 闭包验证。

## 07. 指挥官建筑

Owner：`CommanderBuildingProfile`、`CommanderBuildingAbilityProfile`、`CommanderBuildingTrainProfile`、`CommanderBuildingStageProfile`、`CommanderBuildingBehaviorProfile`。

来源：官方提取 `buildings.json`。

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 迷你德拉肯激光钻机 | `MiniDrakkenLaserDrill` | `DrakkenLaserDrillCoop` | Ground; Armored/Heroic/Mechanical/Structure | 矿:- 气:- 人口字段:- 生命:3000 护盾:- 能量:- | 17.4万兆瓦激光钻头。太阳的力量就在你的指间。 / 可以对地和对空。 |
| 导弹塔 | `MissileTurret` | `MissileTurret` | Ground; Armored/Mechanical/Structure | 矿:100 气:- 人口字段:- 生命:250 护盾:- 能量:- | 防空建筑。 / 可以对空 / 侦测单位 |
| 毁灭炮塔 | `KelMorianGrenadeTurret` | `KelMorianGrenadeTurret` | Ground; Armored/Mechanical/Structure | 矿:150 气:- 人口字段:- 生命:300 护盾:- 能量:- | 对重甲单位造成额外伤害。攻击会使敌人减速。 / 可以对地。 |
| 末日炮塔 | `PerditionTurret` | `PerditionTurret` | -; - | 矿:- 气:- 人口字段:- 生命:- 护盾:- 能量:- | 自动化防御建筑，当附近无敌人时潜地。 / 可以对地 |
| 指挥中心 | `CommandCenter` | `CommandCenter` | Ground; Armored/Mechanical/Structure | 矿:400 气:- 人口字段:15 生命:1500 护盾:- 能量:- | 基础建筑，用于接收采集到的资源。自体可以升空，可以升级成为轨道控制基地或行星要塞。 / 开启： / - SCV |
| 补给站 | `SupplyDepot` | `SupplyDepot` | Ground; Armored/Mechanical/Structure | 矿:100 气:- 人口字段:8 生命:400 护盾:- 能量:- | 为人类部队提供补给， / 提高本方单位数量上限。 / 补给站可以降下，允许地面单位出入。 |

### 建筑按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 补给站 | `Lower` | 降下 | `SupplyDepotLower,Execute` | - | 降下建筑，允许地面单位出入。 |
| 迷你德拉肯激光钻机 | `BrokenDrakkenLaserDrill` | 损坏的德拉肯激光钻机 | `BrokenDrakkenLaserDrill,Execute` | - | - |
| 迷你德拉肯激光钻机 | `ResearchDrakkenLaserDrillNuke` | 升级2级激光钻机 | `DrakkenLaserDrillResearch,Research2` | - | 启用脉冲炮技能，并使德拉肯激光钻机的攻击力+20。 |
| 毁灭炮塔 | `KelMorianGrenadeTurretConcussiveGrenades` | 震荡榴弹 | `-` | HaveSwannKelMorianGrenadeTurretUpgrade | 被爆弹比利攻击的单位会被暂时减速。 / 重型单位对此免疫。 |
| 毁灭炮塔 | `Salvage` | 回收 | `SalvageShared,On` | - | 回收该建筑，将其移除并返还75%建造所花费的晶体矿及高能瓦斯数量。回收过程需要{time:5}。警告：回收过程一旦开始便无法取消。 |
| 毁灭炮塔 | `HaveHiSecAutoTracking` | 瞬时自动追踪 | `-` | HaveTerranDefenseRangeBonus | 所有炮台射程+1。 |
| 毁灭炮塔 | `HaveImprovedTurretAttackSpeed` | KMC自动填弹装置 | `-` | HaveSwannTurretIncreasedAttackSpeed | 所有炮台的攻击速度提高25%。 |
| 导弹塔 | `HellstormMissileBatteries` | HellstormMissileBatteries | `-` | HailstormMissilePods | - |
| 导弹塔 | `Salvage` | 回收 | `SalvageShared,On` | - | 回收该建筑，将其移除并返还75%建造所花费的晶体矿及高能瓦斯数量。回收过程需要{time:5}。警告：回收过程一旦开始便无法取消。 |
| 导弹塔 | `HaveHiSecAutoTracking` | 瞬时自动追踪 | `-` | HaveTerranDefenseRangeBonus | 所有炮台射程+1。 |
| 导弹塔 | `HaveImprovedTurretAttackSpeed` | KMC自动填弹装置 | `-` | HaveSwannTurretIncreasedAttackSpeed | 所有炮台的攻击速度提高25%。 |
| 导弹塔 | `Detector` | 侦测单位 | `-` | NotUnderConstruction | 该单位能够侦测到隐形、潜地和幻像单位。 |
| 末日炮塔 | `Salvage` | 回收 | `SalvageShared,On` | - | 回收该建筑，将其移除并返还75%建造所花费的晶体矿及高能瓦斯数量。回收过程需要{time:5}。警告：回收过程一旦开始便无法取消。 |
| 末日炮塔 | `HaveHiSecAutoTracking` | 瞬时自动追踪 | `-` | HaveTerranDefenseRangeBonus | 所有炮台射程+1。 |
| 末日炮塔 | `HaveImprovedTurretAttackSpeed` | KMC自动填弹装置 | `-` | HaveSwannTurretIncreasedAttackSpeed | 所有炮台的攻击速度提高25%。 |
| 末日炮塔 | `Detector` | 侦测单位 | `-` | - | 该单位能够侦测到隐形、潜地和幻像单位。 |
| 指挥中心 | `SCV` | 制造SCV | `CommandCenterTrain,Train1` | - | 基础工作单位。用于采集资源、建造人类建筑和修理。 / 可以对地。 |
| 指挥中心 | `VespeneDrone` | 瓦斯采集器 | `VespeneDroneCast,Execute` | - | 空投一名自动采集单位，从任何友方瓦斯采集建筑中为你和你的盟友采集更多的高能瓦斯。 / 瞄准一个友方瓦斯采集建筑。 |
| 指挥中心 | `OrbitalCommand` | 升级为轨道控制基地 | `UpgradeToOrbital,Execute` | - | 使指挥中心升级为轨道控制基地，并启用析像扫描和轨道空投：矿骡技能。无法装载SCV。 |
| 指挥中心 | `UpgradeToPlanetaryFortress` | 升级为行星要塞 | `UpgradeToPlanetaryFortress,Execute` | - | 添置一个强力炮塔，并且提高护甲。 / 可以对地。 |
| 指挥中心 | `MasteryNovaArmyOOCRegenSpeedAppend` | 耐力训练 | `-` | HaveMasteryNovaArmyOOCRegenSpeed | 精通：从这座建筑部署的单位脱离战斗后每秒恢复{Effect,MasteryNovaArmyOOCRegenSpeedDisplayDummy,Amount... |
| 指挥中心 | `CommandCenterLoad` | 装载 | `CommandCenterTransport,LoadAll` | - | 将附近的SCV装载进指挥中心。 |
| 指挥中心 | `CommandCenterUnloadAll` | 全部卸载 | `CommandCenterTransport,UnloadAll` | - | 卸载所有单位。 |
| 指挥中心 | `NeoSteelFrameCommandCenter` | 精钢指挥中心 | `-` | HaveNeosteelFrame | 指挥中心的舱位增加5。 |

实现备注：建筑声明自身生产、研究、行为和阶段；训练单位的最终可用性由兵种/科技/精通/威望共同裁决。


备注：已过滤 7 个通用移动/攻击/取消类按钮，保留英雄技能、装备、被动、威望或形态相关候选。
## 08. 科技建筑及其升级选项

Owner：`CommanderTechBuildingProfile`、`CommanderUnitTechProfile`、`CommanderUpgradeProfile`、`CommanderUpgradeRequirementProfile`、`CommanderUpgradeEffectProfile`。

### 15 级解锁与研究命令

| 等级 | 名称 | 解锁升级 | 解锁 AbilityCmd | 说明 |
|---|---|---|---|---|
| 1 | 载具专家 | `-` | `-` | 斯旺建造SCV、战车和星舰的速度比其他指挥官快20%。建造重工厂和军械库不消耗高能瓦斯。 |
| 2 | 战斗空投 | `SwannSpecialDelivery` | `SpecialDelivery:` | 空投4台武装机器人，将着陆地点的敌方地面单位击晕。武装机器人可被控制，持续{Behavior,ARESTimedLife,Duration}秒。 |
| 3 | 贝蒂家族 | `SwannKelMorianTurretUpgrades` | `-` | 毁灭炮塔的射程由6提高到至9，它们的攻击可使敌人减速30%。 / 导弹塔的生命值由250提高至325，它们的攻击能造成范围伤害。 / 末日炮塔的消耗降低50%。 |
| 4 | 德拉肯激光钻机：脉冲炮 | `-` | `DrakkenLaserDrillNuke:, DrakkenLaserDrillResearch:1, DrakkenLaserDrillPulseCannonIssueOrder:` | 使德拉肯激光钻机能进行二次升级，将它的攻击伤害由30提高到50， / 并解锁脉冲炮技能，对目标区域内的敌方单位和建筑造成600点伤害。通过顶部面板来激活脉冲炮。 |
| 5 | 瓦斯采集器 | `-` | `VespeneDroneCast:` | 解锁指挥中心的一项技能，可空投自动化采集器，从你的精炼厂和任何友方瓦斯采集建筑上收集额外的高能瓦斯。 |
| 6 | 新单位：雷神 | `SwannUnlockThor` | `-` | 重型突击机甲，可在重工厂中制造。 / 可以对地和对空。 |
| 7 | 重工厂升级包 | `-` | `FactoryTechLabResearch:11, FactoryTechLabResearch:16, FactoryTechLabResearch:2, 330mmBarrageCannons:` | 在重工厂的科技实验室中解锁以下升级： / 使歌利亚武装机器人可以同时对地和对空。飓风的锁定技能伤害提高100%。解锁雷神的330毫米口径弹幕火炮技能，可对一个目标区域内的敌人... |
| 8 | 高级建造 | `AdvancedConstruction, SwannCommanderWorkerFreeRepairs` | `-` | 多台SCV可同时建造同一个建筑，缩短其建造时间。修理不消耗资源。 |
| 9 | 军械库升级包 | `-` | `ArmoryResearchVoidCoop:9, ArmoryResearchVoidCoop:10` | 在军械库中解锁以下升级： / 所有载具和飞船的射程提高1。所有载具和飞船会自动地缓慢恢复生命值。 |
| 10 | 科技反应堆 | `TechReactor` | `-` | 整合科技实验室和反应堆，包含针对单位的升级，并使主建筑能同时建造两个单位。 |
| 11 | 工程站升级包 | `-` | `EngineeringBayResearch:20, EngineeringBayResearch:22` | 在工程站中解锁以下升级： / 所有建筑会自动灭火，并将自身修理至50%的最大生命值。所有炮台的攻击速度提高25%。 |
| 12 | 永生程序 | `SwannCommanderImmortalityProtocol` | `-` | 解锁重建能力。使被摧毁的雷神和攻城坦克能在战场上重建。 |
| 13 | 星港升级包 | `-` | `StarportTechLabResearch:12, StarportTechLabResearch:14, DefensiveMatrixTarget:` | 在星港的科技实验室中解锁以下升级： / 使怨灵战机的隐形可以闪避所受20%的伤害。解锁科学船的防御矩阵技能，可将目标包围在一个护盾中。护盾持续20秒，并能吸收200点伤害。 |
| 14 | 加量不加价 | `SwannImprovedSpecialDelivery` | `-` | 提高战斗空投所投放的武装机器人数量，由4台提升至6台。通过顶部面板来召唤战斗空投。 |
| 15 | 机械专业 | `SwannCommanderVehicleHealth` | `-` | 斯旺的SCV、战车以及星舰的生命值提高20%。 |

### Upgrade 摘要

| Upgrade | 父级 | 显示名 | Effect数 | 说明 |
|---|---|---|---|---|
| `AdvancedConstruction` | `-` | - | 0 | - |
| `CommanderPrestigeSwannDrill` | `CommanderPrestige` | 重武器专家 | 4 | 优点 / 激光钻机可以造成100%的溅射伤害，使目标减速70%，并且锁定目标的速度加快50%。 / 缺点 / 激光钻机的技能不可用。 |
| `CommanderPrestigeSwannHercules` | `CommanderPrestige` | 运载总监 | 9 | 优点 / 大力神拥有两倍的装载容量并且可以立即卸载单位。科学船可以使用战术跳跃并且冷却时间缩短50%。 / 缺点 / 顶部技能条的冷却时间增加50%。 |
| `CommanderPrestigeSwannTurrets` | `CommanderPrestige` | 机械修理工 | 16 | 优点 / 炮塔升级效果提高100%。 / 缺点 / 战斗单位消耗的高能瓦斯提高50%。 |
| `CommanderPrestigeSwannTurretsArmor` | `CommanderPrestige` | - | 16 | - |
| `CommanderPrestigeSwannTurretsAttackSpeed` | `CommanderPrestige` | - | 6 | - |
| `CommanderPrestigeSwannTurretsRange` | `CommanderPrestige` | - | 14 | - |
| `HiSecAutoTracking` | `-` | 瞬时自动追踪 | 9 | - |
| `MasterySwannBuildingHealth` | `-` | 精通 斯旺 建筑生命值 | 55 | 提高斯旺建筑物的生命值。 |
| `MasterySwannCombatDrop` | `-` | 精通 斯旺 战斗空投 | 5 | 提高武装机器人的持续时间和生命值。 |
| `MasterySwannConcentratedBeam` | `-` | 精通 斯旺 汇聚射线 | 5 | 提高汇聚射线的宽度和伤害。 |
| `MasterySwannImmortalityProtocol` | `-` | 精通 斯旺 永生程序 | 14 | 减少永生程序的资源消耗与建造时间。 |
| `MasterySwannLaserDrillBuildTime` | `-` | 精通 斯旺 激光钻机建造时间 | 17 | 减少德拉肯激光钻机的初始建造时间、重建时间、升级时间以及升级费用。 |
| `MasterySwannVespeneHarvesterCost` | `-` | 精通 斯旺 瓦斯采集器消耗 | 2 | - |
| `SwannCommander` | `-` | 斯旺 | 45 | - |
| `SwannCommanderImmortalityProtocol` | `-` | Swann Commander Immortality Protocol | 0 | - |
| `SwannCommanderVehicleHealth` | `-` | Swann Commander Vehicle Health | 42 | - |
| `SwannCommanderWorkerFreeRepairs` | `-` | Swann Commander Worker Free Repairs | 12 | - |
| `SwannImprovedSpecialDelivery` | `-` | Swann Improved Special Delivery | 1 | - |
| `SwannKelMorianTurretUpgrades` | `-` | Swann Turret Upgrades | 27 | - |
| `SwannSpecialDelivery` | `-` | Swann Special Delivery | 0 | - |
| `SwannTurretIncreasedAttackSpeed` | `-` | KMC自动填弹装置 | 6 | - |
| `SwannUnlockThor` | `-` | Swann Unlock Thor | 5 | - |
| `TechReactor` | `-` | - | 0 | - |
| `TerranBuildingArmor` | `-` | 精钢装甲 | 19 | - |

### 研究/升级按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 飓风 | `CycloneLockOnDamageUpgrade` | 电磁力场加速器 | `-` | HaveCycloneLockOnDamageUpgrade | 提高飓风的锁定伤害。 |
| 飓风 | `LockOn` | 锁定 | `LockOn,Execute` | - | 使飓风的武器锁定目标单位，将飓风的射程提升至{Validator,LockOnCasterNearTargetUpgraded,Range}，且可以在开火... |
| 飓风 | `LockOnRangeUpgrade` | 瞄准光学镜 | `-` | HaveCycloneLockOnRangeUpgrade2 | 飓风的锁定范围增加3。 |
| 飓风 | `LockOn` | 锁定 | `LockOn,Execute` | - | 使飓风的武器锁定目标单位，将飓风的射程提升至{Validator,LockOnCasterNearTargetUpgraded,Range}，且可以在开火... |
| 飓风 | `CycloneLockOnDamageUpgrade` | 电磁力场加速器 | `-` | HaveCycloneLockOnDamageUpgrade | 提高飓风的锁定伤害。 |
| 恶蝠 | `ResearchHighCapacityBarrels` | 研究地狱火预燃器 | `-` | HaveInfernalPreigniter | 强化恶火的地狱火喷射器，使其对轻甲单位造成额外{$UpgradeEffectArrayValue:HighCapacityBarrels:Effect,I... |
| 恶火 | `ResearchHighCapacityBarrels` | 研究地狱火预燃器 | `-` | HaveInfernalPreigniter | 强化恶火的地狱火喷射器，使其对轻甲单位造成额外{$UpgradeEffectArrayValue:HighCapacityBarrels:Effect,I... |
| 迷你德拉肯激光钻机 | `ResearchDrakkenLaserDrillNuke` | 升级2级激光钻机 | `DrakkenLaserDrillResearch,Research2` | - | 启用脉冲炮技能，并使德拉肯激光钻机的攻击力+20。 |
| 毁灭炮塔 | `KelMorianGrenadeTurretConcussiveGrenades` | 震荡榴弹 | `-` | HaveSwannKelMorianGrenadeTurretUpgrade | 被爆弹比利攻击的单位会被暂时减速。 / 重型单位对此免疫。 |
| SCV | `GhostAcademyNova` | 建造幽灵军校 | `TerranBuild,Build15` | - | 为诺娃提供升级方案。 / 开启： / - 可以在兵营中训练幽灵 / - 诺娃可以使用战术聚变打击 |
| SCV | `CommandCenter` | 建造指挥中心 | `TerranBuild,Build1` | - | 基础建筑，用于接收采集到的资源。自体可以升空，可以升级成为轨道控制基地或行星要塞。 / 开启： / - SCV |
| SCV | `Barracks` | 建造兵营 | `TerranBuild,Build4` | - | 步兵训练设施。 / 开启： / - 陆战队员 / - 收割者 / - 使SCV可以建造地堡 / - 使指挥中心可以升级为轨道控制基地 |
| SCV | `EngineeringBay` | 建造工程站 | `TerranBuild,Build5` | - | 为人类步兵单位和建筑提供升级方案。 / 开启： / - 使SCV可以建造导弹塔 / - 使SCV可以建造感应塔 / - 使指挥中心可升级为行星要塞 |
| SCV | `GhostAcademy` | 建造幽灵军校 | `TerranBuild,Build10` | - | 能够制造供幽灵使用的聚变弹头，并为幽灵提供升级方案。 / 开启： / - 可以在兵营中训练幽灵 |
| SCV | `Armory` | 建造军械库 | `TerranBuild,Build14` | - | 为重工厂和星港制造的单位提供武器和护甲升级方案。 / 开启： / - 可以在重工厂中制造恶蝠 / - 可以在重工厂中制造雷神 |
| SCV | `FusionCore` | 建造聚变芯体 | `TerranBuild,Build16` | - | 为医疗运输机、解放者、战列巡航舰提供升级方案。 / 开启： / - 可在星港中建造战列巡航舰 |
| 指挥中心 | `OrbitalCommand` | 升级为轨道控制基地 | `UpgradeToOrbital,Execute` | - | 使指挥中心升级为轨道控制基地，并启用析像扫描和轨道空投：矿骡技能。无法装载SCV。 |
| 指挥中心 | `UpgradeToPlanetaryFortress` | 升级为行星要塞 | `UpgradeToPlanetaryFortress,Execute` | - | 添置一个强力炮塔，并且提高护甲。 / 可以对地。 |

实现备注：科技建筑只负责展示/触发研究；每个单位升级效果由对应 `CommanderUnitTechProfile` 或 `CommanderUpgradeEffectProfile` 声明。

## 09. 特定地图运输机空投单位

Owner：`CommanderCargoLoadoutProfile`、`CommanderMapDropProfile`、`CommanderScenarioFallbackProfile`。

### 运输/空投能力候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 大力神 | `HyperjumpHercules` | 战术跳跃 | `Hyperjump,Execute` | - | 折跃到目标位置。大力神折跃期间处于无敌状态。 |
| 科学船 | `FleetwideJump` | 战术跳跃 | `CommanderPrestigeSwannHerculesScienceVesselTacticalJump,Execute` | - | 折跃到目标位置。飞行器折跃期间处于无敌状态。 |
| SCV | `Starport` | 建造星港 | `TerranBuild,Build12` | - | 空中单位生产设施。 / 开启： / - 维京战机 / - 医疗运输机 / - 解放者 |
| SCV | `FusionCore` | 建造聚变芯体 | `TerranBuild,Build16` | - | 为医疗运输机、解放者、战列巡航舰提供升级方案。 / 开启： / - 可在星港中建造战列巡航舰 |
| 指挥中心 | `VespeneDrone` | 瓦斯采集器 | `VespeneDroneCast,Execute` | - | 空投一名自动采集单位，从任何友方瓦斯采集建筑中为你和你的盟友采集更多的高能瓦斯。 / 瞄准一个友方瓦斯采集建筑。 |
| 指挥中心 | `OrbitalCommand` | 升级为轨道控制基地 | `UpgradeToOrbital,Execute` | - | 使指挥中心升级为轨道控制基地，并启用析像扫描和轨道空投：矿骡技能。无法装载SCV。 |
| 指挥中心 | `CommandCenterLoad` | 装载 | `CommandCenterTransport,LoadAll` | - | 将附近的SCV装载进指挥中心。 |
| 指挥中心 | `CommandCenterUnloadAll` | 全部卸载 | `CommandCenterTransport,UnloadAll` | - | 卸载所有单位。 |

### 可投放单位候选

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 恶火 | `Hellion` | `Hellion` | Ground; Light/Mechanical | 矿:100 气:- 人口字段:-2 生命:90 护盾:- 能量:- | 快速的侦察者，可对一条直线上的所有敌方单位造成火焰伤害。可变形为近距离战斗单位。 / 可以对地。 |
| 怨灵战机 | `Wraith` | `Wraith` | -; - | 矿:- 气:- 人口字段:- 生命:- 护盾:- 能量:- | 高度机动性空中单位。擅长突袭打击。 / 可以对地和对空。 |
| SCV | `SCV` | `SCV` | Ground; Biological/Light/Mechanical | 矿:50 气:- 人口字段:-1 生命:45 护盾:- 能量:- | 基础工作单位。用于采集资源、建造人类建筑和修理。 / 可以对地。 |
| 歌利亚武装机器人 | `Goliath` | `Goliath` | -; - | 矿:- 气:- 人口字段:- 生命:- 护盾:- 能量:- | 重火力支援单位。 / 可以对地和对空。 |
| 攻城坦克 | `Siege Tank` | `SiegeTank` | Ground; Armored/Mechanical | 矿:150 气:125 人口字段:-3 生命:175 护盾:- 能量:- | 重型坦克。可切换至攻城模式来提供远程炮火。 / 可以对地。 |
| 大力神 | `Hercules` | `Hercules` | -; - | 矿:100 气:50 人口字段:-3 生命:- 护盾:- 能量:- | 巨型运输机。可以进行战术跳跃。 |
| 恶蝠 | `Hellbat` | `HellionTank` | Ground; Biological | 矿:100 气:- 人口字段:-2 生命:135 护盾:- 能量:- | 近距离作战单位。对前方小范围锥形区域造成伤害。可以变形为快速侦察单位。 / 可以对地。 |
| 飓风 | `Cyclone` | `Cyclone` | Ground; Armored/Mechanical | 矿:150 气:100 人口字段:-3 生命:120 护盾:- 能量:- | 机动突击型载具。可以使用锁定技能在移动状态下快速开火。 / 可以对地。 |
| 科学船 | `ScienceVessel` | `ScienceVessel` | -; Psionic | 矿:- 气:- 人口字段:- 生命:- 护盾:- 能量:- | 空中支援单位。能够使用辐照和纳米修复技能。 / 侦测单位 |

实现备注：运输机空投不要读取地图硬编码单位组，应从 `CommanderCargoLoadoutProfile` 读取当前 commander 的 `power_fusion` 单位清单和场景过滤规则；英雄是否允许投放需要显式声明。

## 10. 指挥官特殊机制

Owner：`CommanderSpecialMechanicProfile`、`CommanderSpecialResourceProfile`、`CommanderSpecialMechanicHookProfile`、`CommanderSpecialMechanicUnitProfile`。

本指挥官重点：激光钻机、建筑灭火、气骡/协同采气是主特殊机制。

### 特殊机制命中项

- 德拉肯激光钻机：脉冲炮 (`SwannLaserDrillUpgrades`)
- 高级建造 (`SwannImprovedSCV`)

### 特殊机制 Upgrade 候选

- 重武器专家 (`CommanderPrestigeSwannDrill`)
- 精通 斯旺 激光钻机建造时间 (`MasterySwannLaserDrillBuildTime`)
- Swann Commander Worker Free Repairs (`SwannCommanderWorkerFreeRepairs`)

### 特殊机制按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 科学船 | `NanoRepair` | NanoRepair | `NanoRepair,Execute` | - | - |
| 科学船 | `ImprovedNanoRepair` | 强化纳米修复 | `-` | HaveScienceVesselFreeRepair | 科学船的纳米修复不再消耗能量。 |
| 科学船 | `MoveChampions` | MoveChampions | `-` | - | - |
| 科学船 | `AttackChampions` | AttackChampions | `-` | - | - |
| 科学船 | `-` | - | `ScienceVesselNanoRepairDouble,Execute` | - | - |
| 科学船 | `-` | - | `VoidScienceVesselNanoRepair,Execute` | - | - |
| 迷你德拉肯激光钻机 | `BrokenDrakkenLaserDrill` | 损坏的德拉肯激光钻机 | `BrokenDrakkenLaserDrill,Execute` | - | - |
| 迷你德拉肯激光钻机 | `ResearchDrakkenLaserDrillNuke` | 升级2级激光钻机 | `DrakkenLaserDrillResearch,Research2` | - | 启用脉冲炮技能，并使德拉肯激光钻机的攻击力+20。 |
| 指挥中心 | `OrbitalCommand` | 升级为轨道控制基地 | `UpgradeToOrbital,Execute` | - | 使指挥中心升级为轨道控制基地，并启用析像扫描和轨道空投：矿骡技能。无法装载SCV。 |

实现备注：凡是涉及局内状态、资源、堆叠、全局计时器、隐藏 caster、英雄成长或召唤首领的机制，都必须有 runtime hook 和 `[XM_DBG]` 日志。

## 11. 指挥官个性化机制

Owner：`CommanderPersonalMechanicProfile`、`CommanderPersonalMechanicEffectProfile`、`CommanderPersonalMechanicHookProfile`、`CommanderPersonalMechanicRequirementProfile`。

本指挥官重点：钻机是特殊建筑/全局武器，建筑灭火和自动修理类行为归个性化机制。

### 威望正向融合输入

| 威望 ID | Primary Upgrade | 禁用单位 | 启用单位 | 禁用 Ability | 补充 Upgrade |
|---|---|---|---|---|---|
| `CommanderPrestigeSwannDrill` | `CommanderPrestigeSwannDrill` | `-` | `-` | `DrakkenLaserDrillConcentratedBeamIssueOrder:, DrakkenLaserDrillPulseCannonIssueOrder:` | `-` |
| `CommanderPrestigeSwannTurrets` | `CommanderPrestigeSwannTurrets` | `-` | `-` | `-` | `SwannTurrets1, SwannTurrets2, SwannTurrets3` |
| `CommanderPrestigeSwannHercules` | `CommanderPrestigeSwannHercules` | `-` | `-` | `-` | `-` |

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
[XM_DBG][INFO][COMMANDER_PROFILE_LOAD] commander=Swann levelMode=FullLevel15 masteryMode=AllSixMax rosterStage=power_fusion result=ok
[XM_DBG][INFO][POWER_FUSION_APPLY] commander=Swann levelMode=FullLevel15 masteryMode=AllSixMax prestigeMode=SelectedPositive result=ok
[XM_DBG][INFO][ROSTER_LOAD] commander=Swann stage=power_fusion units=9 buildings=6 heroes=0 result=ok
[XM_DBG][INFO][HERO_PROFILE_LOAD] commander=Swann heroes=0 result=ok
[XM_DBG][INFO][MODULE_VERIFY] commander=Swann module=<01-11> profile=<profile> result=ok
[XM_DBG][WARN][CASC_AUDIT_REQUIRED] commander=Swann module=<module> object=<object> result=needs-casc-audit
```

## 第一轮待审计项

- 顶部技能的 caster、按钮、冷却、充能、目标转发闭包。
- 英雄或特殊英雄的 Unit、Ability、Behavior、Weapon、Actor、Sound、复活/重生闭包。
- `power_fusion` 最终 roster 与 `level15` roster 的新增、替换、变体关系。
- 6 项精通的真实作用对象和最终数值。
- 3 个威望的正面收益、负面代价、disable/suppress、费用/冷却/上限变化。
- 科技建筑研究按钮、Requirement、Upgrade effect 是否完整。
- 特殊机制、英雄成长和个性化机制是否需要 runtime hook。
