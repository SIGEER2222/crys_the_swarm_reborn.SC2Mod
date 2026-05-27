# 诺娃（Nova）指挥官细化

日期：2026-05-27

## 当前口径

当前指挥官默认 15 级，不从 1 级开始；精通默认 6 项全部 30 点；威望默认只取正面收益，不直接启用官方 `PlayerPrestige`。`initial` 只作为官方基础状态审计和差异对照，默认测试和玩法应看 `power_fusion` 最终状态。

本文件按 `docs/newdocs/模块拆分` 的 11 个模块整理 诺娃。依据 `游戏数据/官方合作指挥官/commanders/Nova/` 的 JSON 摘要生成；具体 Ability、Behavior、Weapon、Actor、Effect、Requirement 闭包仍需继续追 `references/sc2-build-96883-casc-export/` 或实机 `[XM_DBG]` 日志。

## 官方数据摘要

| 项 | 值 |
|---|---|
| CommanderId | `TerranNova` |
| 中文名 | 诺娃 |
| 默认升级 | `NovaCommander, NovaWeaponCanisterRifle, NovaHelmetGhostVisor, NovaWeaponHellfireShotgun, NovaWeaponPsiBlade, NovaGadgetPulseGrenades, NovaGadgetFlashbangGrenades, SuperStimpackNova, NovaWeaponImprovedCanisterRifle, NovaGadgetSuperStim` |
| 默认能力命令 | `ArmoryResearchVoidCoop:3, ArmoryResearchVoidCoop:4, ArmoryResearchVoidCoop:5, ArmoryResearchVoidCoop:, ArmoryResearchVoidCoop:1, ArmoryResearchVoidCoop:2` |
| 威望 ID | `CommanderPrestigeNovaBio, CommanderPrestigeNovaAirlift, CommanderPrestigeNovaSuperCloak` |
| heroes 数量 | 0 |
| roster 数量 | 16 |
| units 数量 | 11 |
| buildings 数量 | 5 |
| command card 对象数 | 16 |
| upgrades 数量 | 25 |
| source | `mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/userdata.xml` |

roster 样例：

```text
MissileTurret, AutoTurret, SCV, CommandCenter, Barracks, HellbatNova, MarauderNova, MarineNova, LiberatorNova, GoliathNova, RavenNova, BansheeNova, SiegeTankNova, ReaperNova, GhostNova, GhostAcademyNova
```

## 15 级解锁摘要

- 1: 隐秘行动
- 2: 狮鹫号空袭
- 3: 突击模式
- 4: 兵营升级包
- 5: 战术空运
- 6: 重工厂升级包
- 7: 自动化精炼厂
- 8: 隐秘行动升级包
- 9: 战术聚变打击和全息诱饵
- 10: 星港升级包
- 11: 研究与开发
- 12: 铁鸦升级包
- 13: 武器装备
- 14: 诺娃升级包
- 15: 随机应变

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
| Lv2 狮鹫号空袭 | 2 | `NovaGriffinBombingRunActivate:` | `-` | 解锁呼叫狮鹫号技能，可沿一条选定的路线投放多枚炸弹。通过顶部面板来呼叫狮鹫号。 |
| Lv5 战术空运 | 5 | `NovaGriffinTransportLoadUnits:` | `-` | 解锁呼叫狮鹫号将部队快速运送至目标位置的能力。通过顶部面板来呼叫狮鹫号。 |
| Lv9 战术聚变打击和全息诱饵 | 9 | `NovaCoopCasterNuke:` | `-` | 解锁战术聚变打击能力，使诺娃可以在潜行模式下呼叫聚变打击。还会解锁全息诱饵技能，使诺娃可以在突击模式下制造一个可以自行攻击的全息复制体。 |
| Lv9 战术聚变打击和全息诱饵 | 9 | `NovaCoopDecoyTarget:` | `-` | 解锁战术聚变打击能力，使诺娃可以在潜行模式下呼叫聚变打击。还会解锁全息诱饵技能，使诺娃可以在突击模式下制造一个可以自行攻击的全息复制体。 |
| Lv10 星港升级包 | 10 | `StarportTechLabResearch:21` | `-` | 在星港的科技实验室中解锁以下升级： / 解锁隐秘女妖的火箭弹幕技能，对目标区域内的所有敌方地面单位造成伤害。掠袭解放者的变形速度更快。掠袭解放者可以在防卫模式... |
| Lv10 星港升级包 | 10 | `StarportTechLabResearch:22` | `-` | 在星港的科技实验室中解锁以下升级： / 解锁隐秘女妖的火箭弹幕技能，对目标区域内的所有敌方地面单位造成伤害。掠袭解放者的变形速度更快。掠袭解放者可以在防卫模式... |

### command card 命中

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 部署隐秘女妖 | `Banshee_BlackOpsAirstrike` | 火箭弹幕 | `Banshee_BlackOpsAirstrike,Execute` | - | 对目标区域内的敌方地面单位造成{Effect,Banshee_BlackOpsAirstrikeDamage,Amount}点伤害。 |
| 部署隐秘女妖 | `XN51CloakTechnology` | 高级隐形力场 | `255,255` | HaveBansheePermaCloak | 隐秘女妖永久隐形。 |
| 兵营 | `OrbitalDropPodsPassive` | 轨道空投 | `-` | HaveOrbitalDropPods | 兵营、重工厂以及星港中生产的单位会被直接输送到这些建筑的集结点位置。 |
| 部署重型攻城坦克 | `DeploySpiderMines` | 部署蜘蛛雷 | `DeploySpiderMines,Execute` | - | 蜘蛛雷会对进入范围的敌方单位进行追击，引爆后可造成大量范围伤害。潜地的蜘蛛雷只能被敌人的侦测单位发现。 |
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

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| - | - | - | - | - | 官方 heroes.json 未列出英雄条目；召唤物/形态/特殊英雄需从 progression、command_cards 或 CASC 继续追 |

### 英雄/形态候选

- 隐秘行动 (`Nova`)
- 狮鹫号空袭 (`NovaUnlockGriffinBombingRun`)
- 突击模式 (`NovaAssaultMode`)
- 战术空运 (`NovaUnlockGriffinTransport`)
- 隐秘行动升级包 (`NovaGhostAcademyUpgradeCache`)
- 战术聚变打击和全息诱饵 (`NovaUnlockUltimates`)
- 研究与开发 (`NovaBetterResearh`)
- 武器装备 (`NovaImprovedGlobalPowers`)
- 诺娃升级包 (`NovaGhostAcademyUpgradeCache2`)
- 随机应变 (`NovaStanceUpgrade`)

口径：诺娃形态切换会改变武器、技能、行为和装备，应由 CommanderHeroModeProfile + hook 接入。

待审计：Hero Unit、技能按钮、复活、形态切换、武器/Actor/Sound 闭包。

## 03. 普通单位技能及其进化功能

Owner：`CommanderUnitAbilityProfile`、`CommanderUnitStatProfile`、`CommanderUnitEvolutionProfile`、`CommanderUnitBehaviorProfile`、`CommanderUnitWeaponProfile`。

### 单位技能按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 部署隐秘女妖 | `MoveHoldPosition` | 原地防御 | `move,HoldPos` | - | 命令选中的单位待在原地，并攻击射程内的敌方目标。接受命令的单位不会对敌人进行追击或移向敌人与其交战。 |
| 部署隐秘女妖 | `MovePatrol` | 巡逻 | `move,Patrol` | - | 命令选中的单位在当前位置与目标区域间进行巡逻。巡逻的单位会对敌人发起攻击或移向附近的敌人与其交战。 |
| 部署隐秘女妖 | `Banshee_BlackOpsAirstrike` | 火箭弹幕 | `Banshee_BlackOpsAirstrike,Execute` | - | 对目标区域内的敌方地面单位造成{Effect,Banshee_BlackOpsAirstrikeDamage,Amount}点伤害。 |
| 部署隐秘女妖 | `XN51CloakTechnology` | 高级隐形力场 | `255,255` | HaveBansheePermaCloak | 隐秘女妖永久隐形。 |
| 幽灵 | `MoveHoldPosition` | 原地防御 | `move,HoldPos` | - | 命令选中的单位待在原地，并攻击射程内的敌方目标。接受命令的单位不会对敌人进行追击或移向敌人与其交战。 |
| 幽灵 | `MovePatrol` | 巡逻 | `move,Patrol` | - | 命令选中的单位在当前位置与目标区域间进行巡逻。巡逻的单位会对敌人发起攻击或移向附近的敌人与其交战。 |
| 幽灵 | `AttackGhost` | AttackGhost | `attack,Execute` | - | - |
| 幽灵 | `PermanentlyCloakedGhost` | PermanentlyCloakedGhost | `-` | HaveNovaCommander | - |
| 幽灵 | `GhostBlackOpsTripleTapPassive` | 三连击 | `-` | HaveGhostBlackOpsTripleTap | 狙击进行2次额外射击，每一击造成{Effect,Snipe_BlackOpsTripleTapDamage,Amount}点伤害。 |
| 幽灵 | `GhostHoldFire` | 停火 | `GhostHoldFire,Execute` | - | 命令选中的单位收起武器，并在收到攻击命令前避免同敌人交火。收到停火命令的单位在受到攻击时会逃走。 |
| 幽灵 | `WeaponsFree` | 自由射击 | `GhostWeaponsFree,Execute` | - | 命令选中的单位自由射击。单位会对射程内的敌人发起攻击并照例进行追击。 |
| 幽灵 | `Snipe_BlackOps` | 狙杀 | `Snipe_BlackOps,Execute` | - | 对目标敌方生物单位造成{Effect,Snipe_BlackOpsDamage,Amount}点伤害。机械单位免疫。 |
| 幽灵 | `EMP` | EMP弹 | `EMPBlackOps,Execute` | - | 发射一股电磁脉冲，对目标区域内单位的护盾造成100点伤害值并消耗100点能量值。被EMP击中的隐形单位会暂时现形。 |
| 部署强击歌利亚 | `MoveHoldPosition` | 原地防御 | `move,HoldPos` | - | 命令选中的单位待在原地，并攻击射程内的敌方目标。接受命令的单位不会对敌人进行追击或移向敌人与其交战。 |
| 部署强击歌利亚 | `MovePatrol` | 巡逻 | `move,Patrol` | - | 命令选中的单位在当前位置与目标区域间进行巡逻。巡逻的单位会对敌人发起攻击或移向附近的敌人与其交战。 |
| 部署强击歌利亚 | `NovaUnitLockdown` | 锁定飞弹 | `NovaUnitLockdown,Execute` | HaveNovaUnitLockdown | 击晕被强击歌利亚对空武器命中的机械单位，并使其侦测能力失效，持续{Behavior,NovaUnitLockdown,Duration}秒。 / 英雄目标... |
| 部署强击歌利亚 | `AresClassWeaponsSystem` | AresClassWeaponsSystem | `-` | UseAresClassWeaponsSystem | 使对空武器射程提高3，对地武器射程提高1。 |
| 部署恶蝠游骑兵 | `MoveHoldPosition` | 原地防御 | `move,HoldPos` | - | 命令选中的单位待在原地，并攻击射程内的敌方目标。接受命令的单位不会对敌人进行追击或移向敌人与其交战。 |
| 部署恶蝠游骑兵 | `MovePatrol` | 巡逻 | `move,Patrol` | - | 命令选中的单位在当前位置与目标区域间进行巡逻。巡逻的单位会对敌人发起攻击或移向附近的敌人与其交战。 |
| 部署恶蝠游骑兵 | `MorphToHellionBlackOps` | 恶火模式 | `MorphToHellionBlackOps,Execute` | - | 快速的侦察者，可对一条直线上的所有敌方单位造成火焰伤害。可变形为近距离战斗单位。 / 可以对地。 |
| 部署恶蝠游骑兵 | `HellbatJumpJetAssault` | 喷气背包突击 | `HellbatCharge,Execute` | - | 将恶蝠游骑兵朝附近的敌方地面单位发射出去。接触敌人时可将其短暂撞晕，并获得{Behavior,HellbatLeapArmor,Modification.... |
| 部署恶蝠游骑兵 | `PassiveInfernalPreIgniter` | 地狱火预燃器 | `-` | HaveInfernalPreigniter | 恶蝠在两种模式下对轻甲单位造成的伤害提高15点。 |
| 部署掠袭解放者 | `MoveHoldPosition` | 原地防御 | `move,HoldPos` | - | 命令选中的单位待在原地，并攻击射程内的敌方目标。接受命令的单位不会对敌人进行追击或移向敌人与其交战。 |
| 部署掠袭解放者 | `MovePatrol` | 巡逻 | `move,Patrol` | - | 命令选中的单位在当前位置与目标区域间进行巡逻。巡逻的单位会对敌人发起攻击或移向附近的敌人与其交战。 |
| 部署掠袭解放者 | `Liberator_BlackOpsMorphtoAG` | 防卫模式 | `LiberatorAG_BlackOpsTarget,Execute` | - | 部署成防卫模式。掠袭解放者在该模式下可以对地面单位造成单体伤害，但无法移动。 |
| 部署掠袭解放者 | `MAFServosLiberator` | 智能伺服器 | `-` | HaveLiberatorMAFServos | 掠袭解放者的模式转换速度加快四倍。 |
| 部署掠袭解放者 | `LiberatorStructureAttack` | 掠袭火炮 | `-` | HaveLiberatorStructureAttack | 掠袭解放者在防卫模式下可以攻击建筑。 |
| 部署劫掠者突击手 | `MoveHoldPosition` | 原地防御 | `move,HoldPos` | - | 命令选中的单位待在原地，并攻击射程内的敌方目标。接受命令的单位不会对敌人进行追击或移向敌人与其交战。 |
| 部署劫掠者突击手 | `MovePatrol` | 巡逻 | `move,Patrol` | - | 命令选中的单位在当前位置与目标区域间进行巡逻。巡逻的单位会对敌人发起攻击或移向附近的敌人与其交战。 |
| 部署劫掠者突击手 | `SuperConcussiveShells` | 压制弹 | `255,255` | HaveNovaConcussiveShells | 被劫掠者突击手击中的单位的攻击和移动速度会被暂时降低。对英雄单位效果较弱。 / 重型单位免疫。 |
| 部署劫掠者突击手 | `MagrailMunitions` | MagrailMunitions | `MagrailMunitionsMarauder,Execute` | - | - |
| 部署精英陆战队员 | `MoveHoldPosition` | 原地防御 | `move,HoldPos` | - | 命令选中的单位待在原地，并攻击射程内的敌方目标。接受命令的单位不会对敌人进行追击或移向敌人与其交战。 |
| 部署精英陆战队员 | `MovePatrol` | 巡逻 | `move,Patrol` | - | 命令选中的单位在当前位置与目标区域间进行巡逻。巡逻的单位会对敌人发起攻击或移向附近的敌人与其交战。 |
| 部署精英陆战队员 | `CombatShield` | CombatShield | `255,255` | UseCombatShield | - |
| 部署精英陆战队员 | `MarineSuperStimpack` | 超级强化剂 | `SuperStimpackMarine,Execute` | - | 每秒治疗精英陆战队员{Behavior,SuperStim,Modification.VitalRegenArray[Life]}点生命值，并提高其攻击和... |
| 部署精英陆战队员 | `LaserTargetingSystemMarine` | LaserTargetingSystemMarine | `-` | HaveLaserTargetingSystemNova | - |
| 部署铁鸦II型 | `MoveHoldPosition` | 原地防御 | `move,HoldPos` | - | 命令选中的单位待在原地，并攻击射程内的敌方目标。接受命令的单位不会对敌人进行追击或移向敌人与其交战。 |
| 部署铁鸦II型 | `MovePatrol` | 巡逻 | `move,Patrol` | - | 命令选中的单位在当前位置与目标区域间进行巡逻。巡逻的单位会对敌人发起攻击或移向附近的敌人与其交战。 |
| 部署铁鸦II型 | `AcquireMove` | 搜索移动 | `move,AcquireMove` | - | 命令选中的单位移至目标区域或跟随目标单位。进行搜索移动的单位不会与敌人交战。 |
| 部署铁鸦II型 | `SuperScience` | 强化加工 | `-` | HaveSuperScience | 使铁鸦II型的每项技能最多能储存3次充能。 |
| 部署铁鸦II型 | `RavenBioMechanicalRepairDroneCloakedHealBeam` | 隐秘检伤 | `-` | HaveMedivacCloakHealBeam | 生物机械修理无人机的治疗效果提高25%，并使正在接受治疗的单位进入隐形状态。 |
| 部署铁鸦II型 | `BuildLaserTurretRaven` | 建造磁轨炮塔 | `BuildAutoTurret_BlackOps,Execute` | - | 自动化防御炮塔。对一条直线上的所有敌方地面单位造成伤害，持续{Behavior,AutoTurret_BlackOpsTimedLife,Duration... |
| 部署铁鸦II型 | `BuildHealingDrone` | 部署生物机械修理无人机 | `PlaceHealingDrone,Execute` | - | 治疗周围生物和机械单位。持续{Behavior,HealingDroneTimedLife,Duration}秒。 |
| 部署铁鸦II型 | `InstantHunterSeekerMissile` | 捕食者飞弹 | `InstantSeekerMissile_BlackOps,Execute` | - | 部署一枚飞弹追击目标敌人，接触时对一个大范围区域造成{Effect,SeekerMissileDamage,Amount} (+{Effect,Seeke... |
| 部署铁鸦II型 | `Detector` | 侦测单位 | `-` | - | 该单位能够侦测到隐形、潜地和幻像单位。 |
| 死神之首 | `-` | - | `255,255` | - | - |
| 死神之首 | `CombatDrugs` | 战斗药剂 | `-` | - | 脱离战斗后能够迅速恢复生命值。 |
| 部署重型攻城坦克 | `MoveHoldPosition` | 原地防御 | `move,HoldPos` | - | 命令选中的单位待在原地，并攻击射程内的敌方目标。接受命令的单位不会对敌人进行追击或移向敌人与其交战。 |
| 部署重型攻城坦克 | `MovePatrol` | 巡逻 | `move,Patrol` | - | 命令选中的单位在当前位置与目标区域间进行巡逻。巡逻的单位会对敌人发起攻击或移向附近的敌人与其交战。 |
| 部署重型攻城坦克 | `SiegeTank_BlackOpsSiege` | 攻城模式 | `SiegeTank_BlackOpsSiege,Execute` | - | 部署成攻城模式。重型攻城坦克在该模式下拥有超远射程，能造成范围伤害，但无法移动和攻击近距离目标。 |
| 部署重型攻城坦克 | `DeploySpiderMines` | 部署蜘蛛雷 | `DeploySpiderMines,Execute` | - | 蜘蛛雷会对进入范围的敌方单位进行追击，引爆后可造成大量范围伤害。潜地的蜘蛛雷只能被敌人的侦测单位发现。 |
| SCV | `GhostAcademyNova` | 建造幽灵军校 | `TerranBuild,Build15` | - | 为诺娃提供升级方案。 / 开启： / - 可以在兵营中训练幽灵 / - 诺娃可以使用战术聚变打击 |
| SCV | `MoveHoldPosition` | 原地防御 | `move,HoldPos` | - | 命令选中的单位待在原地，并攻击射程内的敌方目标。接受命令的单位不会对敌人进行追击或移向敌人与其交战。 |
| SCV | `MovePatrol` | 巡逻 | `move,Patrol` | - | 命令选中的单位在当前位置与目标区域间进行巡逻。巡逻的单位会对敌人发起攻击或移向附近的敌人与其交战。 |
| SCV | `AttackWorker` | AttackWorker | `attack,Execute` | - | - |
| SCV | `SwannBarracks` | 兵营已禁用 | `-` | HaveSwannCommander | 斯旺的基础生产建筑是重工厂而不是兵营。 / 重工厂可以在SCV的高级建筑菜单中找到。 |
| SCV | `AdvancedConstructionAuto` | 高级建造 | `AdvancedConstructionAuto,Execute` | - | 多台SCV可同时建造同一个建筑，缩短其建造时间。修理不消耗资源。 |
| SCV | `AdvancedConstructionLocked` | 高级建造 | `-` | SwannLevel08 | 该技能将在指挥官等级8时解锁。 |
| SCV | `BuildLaserTurret` | 建造磁轨炮塔 | `TerranBuildFullRefund,Build1` | - | 自动化防御炮塔。对一条直线上的所有敌方地面单位造成伤害。 / 可以对地。 |
| SCV | `BuildFusionCoreLocked` | 建造聚变芯体 | `-` | RaynorLevel06 | 该单位将在指挥官等级6时解锁。 |
| ... | ... | ... | ... | ... | 还有 16 项，后续从 command_cards.json 继续展开 |

### 进化/形态/切换候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 兵营 | `Lift` | 升空 | `BarracksLiftOff,Execute` | - | 将建筑变形为移动速度缓慢的空中单位以便重新部署。建筑在着陆前无法生产单位、研发升级或使用技能。 |
| 部署恶蝠游骑兵 | `MorphToHellionBlackOps` | 恶火模式 | `MorphToHellionBlackOps,Execute` | - | 快速的侦察者，可对一条直线上的所有敌方单位造成火焰伤害。可变形为近距离战斗单位。 / 可以对地。 |
| 部署恶蝠游骑兵 | `PassiveInfernalPreIgniter` | 地狱火预燃器 | `-` | HaveInfernalPreigniter | 恶蝠在两种模式下对轻甲单位造成的伤害提高15点。 |
| 部署掠袭解放者 | `Liberator_BlackOpsMorphtoAG` | 防卫模式 | `LiberatorAG_BlackOpsTarget,Execute` | - | 部署成防卫模式。掠袭解放者在该模式下可以对地面单位造成单体伤害，但无法移动。 |
| 部署掠袭解放者 | `MAFServosLiberator` | 智能伺服器 | `-` | HaveLiberatorMAFServos | 掠袭解放者的模式转换速度加快四倍。 |
| 部署掠袭解放者 | `LiberatorStructureAttack` | 掠袭火炮 | `-` | HaveLiberatorStructureAttack | 掠袭解放者在防卫模式下可以攻击建筑。 |
| 部署重型攻城坦克 | `SiegeTank_BlackOpsSiege` | 攻城模式 | `SiegeTank_BlackOpsSiege,Execute` | - | 部署成攻城模式。重型攻城坦克在该模式下拥有超远射程，能造成范围伤害，但无法移动和攻击近距离目标。 |
| SCV | `Barracks` | 建造兵营 | `TerranBuild,Build4` | - | 步兵训练设施。 / 开启： / - 陆战队员 / - 收割者 / - 使SCV可以建造地堡 / - 使指挥中心可以升级为轨道控制基地 |
| SCV | `EngineeringBay` | 建造工程站 | `TerranBuild,Build5` | - | 为人类步兵单位和建筑提供升级方案。 / 开启： / - 使SCV可以建造导弹塔 / - 使SCV可以建造感应塔 / - 使指挥中心可升级为行星要塞 |
| 指挥中心 | `OrbitalCommand` | 升级为轨道控制基地 | `UpgradeToOrbital,Execute` | - | 使指挥中心升级为轨道控制基地，并启用析像扫描和轨道空投：矿骡技能。无法装载SCV。 |
| 指挥中心 | `UpgradeToPlanetaryFortress` | 升级为行星要塞 | `UpgradeToPlanetaryFortress,Execute` | - | 添置一个强力炮塔，并且提高护甲。 / 可以对地。 |

实现备注：单位自己声明技能、形态和升级接入口；科技建筑只展示符合条件的研究项，不直接拥有单位升级逻辑。

## 04. 初始化基地与特殊建筑

Owner：`CommanderRuntimeProfile`、`CommanderScenarioLoadout`、`CommanderSpecialStructureProfile`、`CommanderInitialCasterProfile`。

### 初始化建筑候选

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 指挥中心 | `CommandCenter` | `CommandCenter` | Ground; Armored/Mechanical/Structure | 矿:400 气:- 人口字段:15 生命:1500 | 基础建筑，用于接收采集到的资源。自体可以升空，可以升级成为轨道控制基地或行星要塞。 / 开启： / - SCV |
| 兵营 | `Barracks` | `Barracks` | Ground; Armored/Mechanical/Structure | 矿:150 气:- 人口字段:- 生命:1000 | 步兵训练设施。 / 开启： / - 陆战队员 / - 收割者 / - 使SCV可以建造地堡 / - 使指挥中心可以升级为轨道控制基地 |

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
| SCV | `SCV` | `SCV` | Ground; Biological/Light/Mechanical | 矿:50 气:- 人口字段:-1 生命:45 | 基础工作单位。用于采集资源、建造人类建筑和修理。 / 可以对地。 |
| 部署恶蝠游骑兵 | `HellbatNova` | `HellbatBlackOps` | Ground; Biological/Light/Mechanical | 矿:250 气:- 人口字段:-2 生命:550 | 部署{Effect,HellbatBlackOpsSpawnerCreateUnit,SpawnCount}名恶蝠游骑兵。精英近距离战斗单位，对前方小... |
| 部署劫掠者突击手 | `MarauderNova` | `Marauder_BlackOps` | Ground; Armored/Biological | 矿:250 气:65 人口字段:-2 生命:350 | 部署{Effect,MarauderBlackOpsSpawnerCreateUnit,SpawnCount}名劫掠者突击手。精英重型突击步兵。 / ... |
| 部署精英陆战队员 | `MarineNova` | `Marine_BlackOps` | Ground; Biological/Light | 矿:125 气:- 人口字段:-1 生命:150 | 部署{Effect,MarineBlackOpsSpawnerCreateUnit,SpawnCount}名精英陆战队员。精英通用型步兵。 / 可以对... |
| 部署掠袭解放者 | `LiberatorNova` | `Liberator_BlackOps` | Air; Armored/Mechanical | 矿:375 气:375 人口字段:-3 生命:450 | 部署{Effect,LiberatorBlackOpsSpawnerCreateUnit,SpawnCount}架掠袭解放者。精英重型火炮战机。装载有... |
| 部署强击歌利亚 | `GoliathNova` | `Goliath_BlackOps` | Ground; Armored/Mechanical | 矿:375 气:125 人口字段:-3 生命:450 | 部署{Effect,GoliathBlackOpsSpawnerCreateUnit,SpawnCount}名强击歌利亚。精英重型火力支援单位。 / ... |
| 部署铁鸦II型 | `RavenNova` | `Raven_BlackOps` | Air; Light/Mechanical/Psionic | 矿:100 气:200 人口字段:-2 生命:350 | 部署{Effect,RavenBlackOpsSpawnerCreateUnit,SpawnCount}架铁鸦II型。空中支援单位原型机。可以使用磁轨... |
| 部署隐秘女妖 | `BansheeNova` | `Banshee_BlackOps` | Air; Light/Mechanical | 矿:350 气:187 人口字段:-3 生命:350 | 部署{Effect,BansheeBlackOpsSpawnerCreateUnit,SpawnCount}架隐秘女妖。强化版战术打击飞行器。可以在升... |
| 部署重型攻城坦克 | `SiegeTankNova` | `SiegeTank_BlackOps` | Ground; Armored/Mechanical | 矿:400 气:300 人口字段:-3 生命:400 | 部署{Effect,SiegeTankBlackOpsSpawnerCreateUnit,SpawnCount}辆重型攻城坦克。加强版重型坦克。可以切... |
| 死神之首 | `ReaperNova` | `MercReaper` | -; - | 矿:- 气:- 人口字段:- 生命:- | 游击单位。能够翻越悬崖。投掷爆炸性地雷。 / 可以对地。 |
| 幽灵 | `GhostNova` | `GhostFemale_BlackOps, GhostNova, Ghost_BlackOps` | Ground; Biological/Psionic | 矿:500 气:250 人口字段:-2 生命:250 | 部署{Effect,GhostBlackOpsSpawnerCreateUnit,SpawnCount+Effect,GhostBlackOpsSpa... |

三阶段口径：`initial` 只做审计，`level15` 表示满级解锁，`power_fusion` 表示 15 级 + 六精通全满 + 威望正向收益后的默认运行清单。

## 06. 指挥官精通

Owner：`CommanderMasteryProfile`、`CommanderMasteryEffectProfile`、`CommanderMasteryModifierProfile`。

| 组 | 名称 | Upgrade | 每点 | 30点口径 |
|---|---|---|---|---|
| 1 | 聚变打击和全息诱饵冷却时间 | `MasteryNovaNukeAndHoloDecoyCooldown` | 3 | -90秒 |
| 1 | 狮鹫号轰炸突袭消耗减少 | `MasteryNovaGriffinCost` | 10 | -300 |
| 2 | 诺娃的主要技能强化 | `MasteryNovaPrimaryAbilityImprovement` | 1.67 | +50.099999999999994% |
| 2 | 部队单位攻击速度 | `MasteryNovaArmyAttackSpeed` | 0.5 | +15% |
| 3 | 诺娃复活缩减 | `MasteryNovaEnergyRegen` | 1 | +30% |
| 3 | 部队单位脱战后生命回复 | `MasteryNovaArmyOOCRegenSpeed` | 0.2 | +6 |

实现备注：当前默认六项全部 30 点。表里的 30 点口径由 `point_increments * 30` 推导，最终数值仍需以 Upgrade Effect 闭包验证。

## 07. 指挥官建筑

Owner：`CommanderBuildingProfile`、`CommanderBuildingAbilityProfile`、`CommanderBuildingTrainProfile`、`CommanderBuildingStageProfile`、`CommanderBuildingBehaviorProfile`。

来源：官方提取 `buildings.json`。

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 导弹塔 | `MissileTurret` | `MissileTurret` | Ground; Armored/Mechanical/Structure | 矿:100 气:- 人口字段:- 生命:250 | 防空建筑。 / 可以对空 / 侦测单位 |
| 自动机炮 | `AutoTurret` | `AutoTurret, NovaACLaserTurret` | Ground; Armored/Mechanical/Structure | 矿:100 气:- 人口字段:- 生命:100 | 自动化防御炮塔。部署后{Behavior,AutoTurretTimedLife,Duration}秒失效。 / 可以对地和对空。 |
| 指挥中心 | `CommandCenter` | `CommandCenter` | Ground; Armored/Mechanical/Structure | 矿:400 气:- 人口字段:15 生命:1500 | 基础建筑，用于接收采集到的资源。自体可以升空，可以升级成为轨道控制基地或行星要塞。 / 开启： / - SCV |
| 兵营 | `Barracks` | `Barracks` | Ground; Armored/Mechanical/Structure | 矿:150 气:- 人口字段:- 生命:1000 | 步兵训练设施。 / 开启： / - 陆战队员 / - 收割者 / - 使SCV可以建造地堡 / - 使指挥中心可以升级为轨道控制基地 |
| 幽灵军校 | `GhostAcademyNova` | `GhostAcademyNova` | Ground; Armored/Mechanical/Structure | 矿:150 气:50 人口字段:- 生命:1250 | 为诺娃提供升级方案。 / 开启： / - 可以在兵营中训练幽灵 / - 诺娃可以使用战术聚变打击 |

### 建筑按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 兵营 | `TrainMarineNova` | 部署精英陆战队员 | `BarracksTrainNova,Train1` | - | 部署{Effect,MarineBlackOpsSpawnerCreateUnit,SpawnCount}名精英陆战队员。精英通用型步兵。 / 可以对地和对空。 |
| 兵营 | `TrainMarauderNova` | 部署劫掠者突击手 | `BarracksTrainNova,Train2` | - | 部署{Effect,MarauderBlackOpsSpawnerCreateUnit,SpawnCount}名劫掠者突击手。精英重型突击步兵。 / 可以对地。 |
| 兵营 | `TrainGhostNova` | 部署特战幽灵 | `BarracksTrainNova,Train3` | - | 部署{Effect,GhostBlackOpsSpawnerCreateUnit,SpawnCount+Effect,GhostBlackOpsSpawn... |
| 兵营 | `Medic` | Medic | `BarracksTrain,Train5` | - | - |
| 兵营 | `MasteryNovaArmyAttackSpeedAppend` | 战斗精通 | `-` | HaveMasteryNovaArmyAttackSpeed | 精通：从这座建筑部署的单位获得{Effect,MasteryNovaArmyAttackSpeedDisplayDummy,Amount}%攻击速度。 |
| 兵营 | `MasteryNovaArmyOOCRegenSpeedAppend` | 耐力训练 | `-` | HaveMasteryNovaArmyOOCRegenSpeed | 精通：从这座建筑部署的单位脱离战斗后每秒恢复{Effect,MasteryNovaArmyOOCRegenSpeedDisplayDummy,Amount... |
| 兵营 | `Ghost` | 训练幽灵 | `BarracksTrain,Train3` | - | 狙击手。能够使用稳定瞄准、EMP弹并且升级后可以使用隐形技能。能够对幽灵军校发动的聚变打击进行制导。 / 可以对地和对空。 |
| 兵营 | `TechReactorAI` | TechReactorAI | `BarracksAddOns,Build3` | - | - |
| 兵营 | `TechReactorAI` | TechReactorAI | `BarracksAddOns,Build3` | - | - |
| 兵营 | `CancelBuilding` | 取消 | `BuildInProgress,Cancel` | - | 取消建造，摧毁尚未建造完成的建筑并返还部分资源。 |
| 兵营 | `Lift` | 升空 | `BarracksLiftOff,Execute` | - | 将建筑变形为移动速度缓慢的空中单位以便重新部署。建筑在着陆前无法生产单位、研发升级或使用技能。 |
| 兵营 | `OrbitalDropPodsPassive` | 轨道空投 | `-` | HaveOrbitalDropPods | 兵营、重工厂以及星港中生产的单位会被直接输送到这些建筑的集结点位置。 |
| 兵营 | `Reactor` | 建造反应堆 | `BarracksAddOns,Build2` | - | 使该建筑能够同步生产两个单位。 |
| 兵营 | `MengskUnits` | MengskUnits | `-` | - | - |
| 兵营 | `Marauder` | 训练劫掠者 | `BarracksTrain,Train4` | - | 重型突击步兵。 / 可以对地。 |
| 兵营 | `CancelBuilding` | 取消 | `BuildInProgress,Cancel` | - | 取消建造，摧毁尚未建造完成的建筑并返还部分资源。 |
| 幽灵军校 | `ResearchNovaDetector` | 研究幽灵面罩 | `GhostAcademyResearch,Research3` | - | 给予诺娃侦测能力，使其可以发现并追踪隐形或潜地的敌人。 |
| 幽灵军校 | `ResearchCaduceusReactorLocked` | 研究卡度休斯反应堆 | `-` | NovaLevel08 | 该科技将在指挥官等级8时解锁。 |
| 幽灵军校 | `ResearchOperationalEfficiencyLocked` | 研究作战效能 | `-` | NovaLevel14 | 该科技将在指挥官等级14时解锁。 |
| 幽灵军校 | `ResearchInfernalProjectilesLocked` | 研究狱火爆弹 | `-` | NovaLevel14 | 该科技将在指挥官等级14时解锁。 |
| 幽灵军校 | `CancelBuilding` | 取消 | `BuildInProgress,Cancel` | - | 取消建造，摧毁尚未建造完成的建筑并返还部分资源。 |
| 自动机炮 | `AttackBuilding` | 攻击 | `attack,Execute` | - | 锁定并且攻击目标，直到超出射程或对方被摧毁。 |
| 导弹塔 | `AttackBuilding` | 攻击 | `attack,Execute` | - | 锁定并且攻击目标，直到超出射程或对方被摧毁。 |
| 导弹塔 | `HellstormMissileBatteries` | HellstormMissileBatteries | `-` | HailstormMissilePods | - |
| 导弹塔 | `Salvage` | 回收 | `SalvageShared,On` | - | 回收该建筑，将其移除并返还75%建造所花费的晶体矿及高能瓦斯数量。回收过程需要{time:5}。警告：回收过程一旦开始便无法取消。 |
| 导弹塔 | `HaveHiSecAutoTracking` | 瞬时自动追踪 | `-` | HaveTerranDefenseRangeBonus | 所有炮台射程+1。 |
| 导弹塔 | `HaveImprovedTurretAttackSpeed` | KMC自动填弹装置 | `-` | HaveSwannTurretIncreasedAttackSpeed | 所有炮台的攻击速度提高25%。 |
| 导弹塔 | `Detector` | 侦测单位 | `-` | NotUnderConstruction | 该单位能够侦测到隐形、潜地和幻像单位。 |
| 导弹塔 | `CancelBuilding` | 取消 | `BuildInProgress,Cancel` | - | 取消建造，摧毁尚未建造完成的建筑并返还部分资源。 |
| 导弹塔 | `AttackBuilding` | 攻击 | `attack,Execute` | - | 锁定并且攻击目标，直到超出射程或对方被摧毁。 |
| 指挥中心 | `SCV` | 制造SCV | `CommandCenterTrain,Train1` | - | 基础工作单位。用于采集资源、建造人类建筑和修理。 / 可以对地。 |
| 指挥中心 | `VespeneDrone` | 瓦斯采集器 | `VespeneDroneCast,Execute` | - | 空投一名自动采集单位，从任何友方瓦斯采集建筑中为你和你的盟友采集更多的高能瓦斯。 / 瞄准一个友方瓦斯采集建筑。 |
| 指挥中心 | `OrbitalCommand` | 升级为轨道控制基地 | `UpgradeToOrbital,Execute` | - | 使指挥中心升级为轨道控制基地，并启用析像扫描和轨道空投：矿骡技能。无法装载SCV。 |
| 指挥中心 | `UpgradeToPlanetaryFortress` | 升级为行星要塞 | `UpgradeToPlanetaryFortress,Execute` | - | 添置一个强力炮塔，并且提高护甲。 / 可以对地。 |
| 指挥中心 | `MasteryNovaArmyOOCRegenSpeedAppend` | 耐力训练 | `-` | HaveMasteryNovaArmyOOCRegenSpeed | 精通：从这座建筑部署的单位脱离战斗后每秒恢复{Effect,MasteryNovaArmyOOCRegenSpeedDisplayDummy,Amount... |
| 指挥中心 | `CommandCenterLoad` | 装载 | `CommandCenterTransport,LoadAll` | - | 将附近的SCV装载进指挥中心。 |
| 指挥中心 | `CommandCenterUnloadAll` | 全部卸载 | `CommandCenterTransport,UnloadAll` | - | 卸载所有单位。 |
| 指挥中心 | `NeoSteelFrameCommandCenter` | 精钢指挥中心 | `-` | HaveNeosteelFrame | 指挥中心的舱位增加5。 |
| 指挥中心 | `CancelBuilding` | 取消 | `BuildInProgress,Cancel` | - | 取消建造，摧毁尚未建造完成的建筑并返还部分资源。 |

实现备注：建筑声明自身生产、研究、行为和阶段；训练单位的最终可用性由兵种/科技/精通/威望共同裁决。

## 08. 科技建筑及其升级选项

Owner：`CommanderTechBuildingProfile`、`CommanderUnitTechProfile`、`CommanderUpgradeProfile`、`CommanderUpgradeRequirementProfile`、`CommanderUpgradeEffectProfile`。

### 15 级解锁与研究命令

| 等级 | 名称 | 解锁升级 | 解锁 AbilityCmd | 说明 |
|---|---|---|---|---|
| 1 | 隐秘行动 | `Stimpack` | `-` | 诺娃的补给上限只有100点，但她的单位和建筑拥有更高的生命值与伤害，而且对昏迷效果具有抵抗力。可以立即向战场部署训练有素的单位。 |
| 2 | 狮鹫号空袭 | `-` | `NovaGriffinBombingRunActivate:` | 解锁呼叫狮鹫号技能，可沿一条选定的路线投放多枚炸弹。通过顶部面板来呼叫狮鹫号。 |
| 3 | 突击模式 | `-` | `NovaKitSwap:1, NovaKitSwap:` | 解锁在战场上切换两套装备的能力。诺娃的每套装备都配备不同的技能与武器。 |
| 4 | 兵营升级包 | `-` | `BarracksTechLabResearch:8, BarracksTechLabResearch:9` | 在兵营的科技实验室中解锁以下升级：解锁精英陆战队员的超级强化剂技能，可在一定时间内持续对其治疗，并提高他们的攻击和移动速度。为劫掠者突击手装备一项额外武器，攻击他们的当前目标。 |
| 5 | 战术空运 | `-` | `NovaGriffinTransportLoadUnits:` | 解锁呼叫狮鹫号将部队快速运送至目标位置的能力。通过顶部面板来呼叫狮鹫号。 |
| 6 | 重工厂升级包 | `-` | `FactoryTechLabResearch:17, FactoryTechLabResearch:21, FactoryTechLabResearch:18` | 在重工厂科技实验室中解锁以下升级：使恶蝠游骑兵可以跃向敌方地面单位并将其击晕。使强击歌利亚可以击晕敌方空中机械单位，并使其侦测能力失效。使重型攻城坦克在攻城模式下的射程逐步提高。 |
| 7 | 自动化精炼厂 | `AutoHarvester` | `-` | 精炼厂无需SCV即可自动采集高能瓦斯。 |
| 8 | 隐秘行动升级包 | `-` | `BarracksTechLabResearch:13, GhostAcademyResearch:8` | 解锁兵营科技实验室中的一项升级，使特战幽灵在使用狙击时可以进行两次额外射击。还会解锁幽灵军校中的一项升级，可以提高诺娃的生命恢复速度。 |
| 9 | 战术聚变打击和全息诱饵 | `-` | `NovaCoopCasterNuke:, NovaCoopDecoyTarget:` | 解锁战术聚变打击能力，使诺娃可以在潜行模式下呼叫聚变打击。还会解锁全息诱饵技能，使诺娃可以在突击模式下制造一个可以自行攻击的全息复制体。 |
| 10 | 星港升级包 | `-` | `StarportTechLabResearch:21, StarportTechLabResearch:22` | 在星港的科技实验室中解锁以下升级： / 解锁隐秘女妖的火箭弹幕技能，对目标区域内的所有敌方地面单位造成伤害。掠袭解放者的变形速度更快。掠袭解放者可以在防卫模式下攻击建筑。 |
| 11 | 研究与开发 | `NovaBetterResearch` | `-` | 科技实验室和幽灵军校的升级研究时间与消耗减少50%。 |
| 12 | 铁鸦升级包 | `-` | `StarportTechLabResearch:23, StarportTechLabResearch:29` | 在星港的科技实验室中解锁以下升级： / 提高铁鸦II型生物机械修理无人机的治疗效果，并使受到其治疗的单位进入隐形状态。允许铁鸦II型可以为其各项技能储存2次额外蓄能。 |
| 13 | 武器装备 | `NovaGlobalPowerUpgrades` | `-` | 使诺娃的防御无人机最大充能次数提高2次，冷却时间缩短30秒。 |
| 14 | 诺娃升级包 | `-` | `GhostAcademyResearch:6, GhostAcademyResearch:7` | 在幽灵军校中解锁以下升级： / 诺娃使用狙杀消灭一名单位可以返还50%的技能能量消耗。提高诺娃的穿透爆弹射程。 |
| 15 | 随机应变 | `NovaStanceDance` | `-` | 潜行模式与突击模式的冷却时间缩短15秒。诺娃在切换模式后可获得最大能量值。切换至潜行模式后可获得临时性的无敌效果，切换至突击模式后可获得临时性的伤害加成效果。 |

### Upgrade 摘要

| Upgrade | 父级 | 显示名 | Effect数 | 说明 |
|---|---|---|---|---|
| `AutoHarvester` | `-` | - | 0 | - |
| `CommanderPrestigeNovaAirlift` | `CommanderPrestige` | 战术调度员 | 2 | 优点 / 战术空运的冷却时间缩短75%。 / 缺点 / 狮鹫号空袭的冷却时间增加300%。 |
| `CommanderPrestigeNovaBio` | `CommanderPrestige` | - | 0 | - |
| `CommanderPrestigeNovaSuperCloak` | `CommanderPrestige` | - | 10 | - |
| `CommanderPrestigeNovaSuperCloakMastery` | `CommanderPrestige` | - | 1 | - |
| `MasteryNovaArmyAttackSpeed` | `-` | 精通 诺娃 部队攻击速度 | 15 | 提高诺娃的战斗单位的攻击速度。 |
| `MasteryNovaArmyOOCRegenSpeed` | `-` | 单位生命恢复 | 2 | 使诺娃的单位在脱离战斗后可持续恢复生命值(每秒)。 |
| `MasteryNovaEnergyRegen` | `-` | 精通 诺娃 能量恢复 | 2 | 提高诺娃的能量恢复。 |
| `MasteryNovaGriffinCost` | `-` | 精通 诺娃 狮鹫号消耗 | 2 | - |
| `MasteryNovaNukeAndHoloDecoyCooldown` | `-` | 精通 诺娃 聚变打击与全息诱饵 冷却时间 | 5 | 缩短战术聚变打击和全息诱饵的冷却时间。 |
| `MasteryNovaPrimaryAbilityImprovement` | `-` | 诺娃主要技能强化精通 | 7 | 每一点使诺娃的主要技能的技能伤害和伤害吸收效果提高1.67%，最高提升至50%。 |
| `NovaBetterResearch` | `-` | Nova Better Research | 69 | - |
| `NovaCommander` | `-` | 诺娃 | 122 | - |
| `NovaGadgetFlashbangGrenades` | `-` | 诺娃配装闪光雷 | 1 | - |
| `NovaGadgetPulseGrenades` | `-` | 诺娃配装脉冲手雷 | 1 | 使用一股能造成50点伤害的灵能脉冲，消灭大群敌人。 |
| `NovaGadgetSuperStim` | `-` | 诺娃 配装 超级强化剂 | 1 | - |
| `NovaGlobalPowerUpgrades` | `-` | Nova Global Power Upgrades | 3 | - |
| `NovaHelmetGhostVisor` | `-` | 诺娃 头盔 幽灵面罩 | 0 | - |
| `NovaStanceDance` | `-` | 随机应变 | 4 | 潜行模式和突击模式的冷却时间缩短15秒。诺娃在切换模式后可获得最大能量值。切换至潜行模式后可获得临时性的无敌效果，切换至突击模式后可获得临时性的伤害加成效果。 |
| `NovaWeaponCanisterRifle` | `-` | 诺娃 武器 霰弹步枪 | 1 | - |
| `NovaWeaponHellfireShotgun` | `-` | 诺娃 武器 地狱火霰弹枪 | 1 | - |
| `NovaWeaponImprovedCanisterRifle` | `-` | 诺娃 武器 改良式霰弹步枪 | 1 | - |
| `NovaWeaponPsiBlade` | `-` | 诺娃 武器 灵能利刃 | 1 | 冲向前方并对一条直线上的敌方地面单位造成{Effect,NovaWeaponPsiBladeDamage,Amount}点伤害。不会对友方单位造成伤害。 |
| `Stimpack` | `-` | 强化剂 | 0 | 使陆战队员, 劫掠者, 以及火蝠能够使用强化剂。强化剂会对使用者造成伤害，但能暂时提高攻击速度和移动速度。 |
| `SuperStimpackNova` | `-` | - | 0 | - |

### 研究/升级按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 部署隐秘女妖 | `XN51CloakTechnology` | 高级隐形力场 | `255,255` | HaveBansheePermaCloak | 隐秘女妖永久隐形。 |
| 兵营 | `TrainGhostNova` | 部署特战幽灵 | `BarracksTrainNova,Train3` | - | 部署{Effect,GhostBlackOpsSpawnerCreateUnit,SpawnCount+Effect,GhostBlackOpsSpawn... |
| 兵营 | `Ghost` | 训练幽灵 | `BarracksTrain,Train3` | - | 狙击手。能够使用稳定瞄准、EMP弹并且升级后可以使用隐形技能。能够对幽灵军校发动的聚变打击进行制导。 / 可以对地和对空。 |
| 兵营 | `TechReactorAI` | TechReactorAI | `BarracksAddOns,Build3` | - | - |
| 兵营 | `TechReactorAI` | TechReactorAI | `BarracksAddOns,Build3` | - | - |
| 兵营 | `Lift` | 升空 | `BarracksLiftOff,Execute` | - | 将建筑变形为移动速度缓慢的空中单位以便重新部署。建筑在着陆前无法生产单位、研发升级或使用技能。 |
| 幽灵军校 | `ResearchNovaDetector` | 研究幽灵面罩 | `GhostAcademyResearch,Research3` | - | 给予诺娃侦测能力，使其可以发现并追踪隐形或潜地的敌人。 |
| 幽灵军校 | `ResearchCaduceusReactorLocked` | 研究卡度休斯反应堆 | `-` | NovaLevel08 | 该科技将在指挥官等级8时解锁。 |
| 幽灵军校 | `ResearchOperationalEfficiencyLocked` | 研究作战效能 | `-` | NovaLevel14 | 该科技将在指挥官等级14时解锁。 |
| 幽灵军校 | `ResearchInfernalProjectilesLocked` | 研究狱火爆弹 | `-` | NovaLevel14 | 该科技将在指挥官等级14时解锁。 |
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
| 兵营 | `OrbitalDropPodsPassive` | 轨道空投 | `-` | HaveOrbitalDropPods | 兵营、重工厂以及星港中生产的单位会被直接输送到这些建筑的集结点位置。 |
| SCV | `Starport` | 建造星港 | `TerranBuild,Build12` | - | 空中单位生产设施。 / 开启： / - 维京战机 / - 医疗运输机 / - 解放者 |
| SCV | `FusionCore` | 建造聚变芯体 | `TerranBuild,Build16` | - | 为医疗运输机、解放者、战列巡航舰提供升级方案。 / 开启： / - 可在星港中建造战列巡航舰 |
| 指挥中心 | `VespeneDrone` | 瓦斯采集器 | `VespeneDroneCast,Execute` | - | 空投一名自动采集单位，从任何友方瓦斯采集建筑中为你和你的盟友采集更多的高能瓦斯。 / 瞄准一个友方瓦斯采集建筑。 |
| 指挥中心 | `OrbitalCommand` | 升级为轨道控制基地 | `UpgradeToOrbital,Execute` | - | 使指挥中心升级为轨道控制基地，并启用析像扫描和轨道空投：矿骡技能。无法装载SCV。 |
| 指挥中心 | `CommandCenterLoad` | 装载 | `CommandCenterTransport,LoadAll` | - | 将附近的SCV装载进指挥中心。 |
| 指挥中心 | `CommandCenterUnloadAll` | 全部卸载 | `CommandCenterTransport,UnloadAll` | - | 卸载所有单位。 |

### 可投放单位候选

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| SCV | `SCV` | `SCV` | Ground; Biological/Light/Mechanical | 矿:50 气:- 人口字段:-1 生命:45 | 基础工作单位。用于采集资源、建造人类建筑和修理。 / 可以对地。 |
| 部署恶蝠游骑兵 | `HellbatNova` | `HellbatBlackOps` | Ground; Biological/Light/Mechanical | 矿:250 气:- 人口字段:-2 生命:550 | 部署{Effect,HellbatBlackOpsSpawnerCreateUnit,SpawnCount}名恶蝠游骑兵。精英近距离战斗单位，对前方小... |
| 部署劫掠者突击手 | `MarauderNova` | `Marauder_BlackOps` | Ground; Armored/Biological | 矿:250 气:65 人口字段:-2 生命:350 | 部署{Effect,MarauderBlackOpsSpawnerCreateUnit,SpawnCount}名劫掠者突击手。精英重型突击步兵。 / ... |
| 部署精英陆战队员 | `MarineNova` | `Marine_BlackOps` | Ground; Biological/Light | 矿:125 气:- 人口字段:-1 生命:150 | 部署{Effect,MarineBlackOpsSpawnerCreateUnit,SpawnCount}名精英陆战队员。精英通用型步兵。 / 可以对... |
| 部署掠袭解放者 | `LiberatorNova` | `Liberator_BlackOps` | Air; Armored/Mechanical | 矿:375 气:375 人口字段:-3 生命:450 | 部署{Effect,LiberatorBlackOpsSpawnerCreateUnit,SpawnCount}架掠袭解放者。精英重型火炮战机。装载有... |
| 部署强击歌利亚 | `GoliathNova` | `Goliath_BlackOps` | Ground; Armored/Mechanical | 矿:375 气:125 人口字段:-3 生命:450 | 部署{Effect,GoliathBlackOpsSpawnerCreateUnit,SpawnCount}名强击歌利亚。精英重型火力支援单位。 / ... |
| 部署铁鸦II型 | `RavenNova` | `Raven_BlackOps` | Air; Light/Mechanical/Psionic | 矿:100 气:200 人口字段:-2 生命:350 | 部署{Effect,RavenBlackOpsSpawnerCreateUnit,SpawnCount}架铁鸦II型。空中支援单位原型机。可以使用磁轨... |
| 部署隐秘女妖 | `BansheeNova` | `Banshee_BlackOps` | Air; Light/Mechanical | 矿:350 气:187 人口字段:-3 生命:350 | 部署{Effect,BansheeBlackOpsSpawnerCreateUnit,SpawnCount}架隐秘女妖。强化版战术打击飞行器。可以在升... |
| 部署重型攻城坦克 | `SiegeTankNova` | `SiegeTank_BlackOps` | Ground; Armored/Mechanical | 矿:400 气:300 人口字段:-3 生命:400 | 部署{Effect,SiegeTankBlackOpsSpawnerCreateUnit,SpawnCount}辆重型攻城坦克。加强版重型坦克。可以切... |
| 死神之首 | `ReaperNova` | `MercReaper` | -; - | 矿:- 气:- 人口字段:- 生命:- | 游击单位。能够翻越悬崖。投掷爆炸性地雷。 / 可以对地。 |
| 幽灵 | `GhostNova` | `GhostFemale_BlackOps, GhostNova, Ghost_BlackOps` | Ground; Biological/Psionic | 矿:500 气:250 人口字段:-2 生命:250 | 部署{Effect,GhostBlackOpsSpawnerCreateUnit,SpawnCount+Effect,GhostBlackOpsSpa... |

实现备注：运输机空投不要读取地图硬编码单位组，应从 `CommanderCargoLoadoutProfile` 读取当前 commander 的 `power_fusion` 单位清单和场景过滤规则。

## 10. 指挥官特殊机制

Owner：`CommanderSpecialMechanicProfile`、`CommanderSpecialResourceProfile`、`CommanderSpecialMechanicHookProfile`、`CommanderSpecialMechanicUnitProfile`。

本指挥官重点：诺娃装备形态、狮鹫号、精英部队部署是主特殊机制。

### 特殊机制命中项

- 突击模式 (`NovaAssaultMode`)
- 兵营升级包 (`NovaBarracksTechLabUpgradeCache`)
- 武器装备 (`NovaImprovedGlobalPowers`)

### 特殊机制 Upgrade 候选

- 暂无自动命中项，需 CASC/实机日志补充。

### 特殊机制按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 兵营 | `OrbitalDropPodsPassive` | 轨道空投 | `-` | HaveOrbitalDropPods | 兵营、重工厂以及星港中生产的单位会被直接输送到这些建筑的集结点位置。 |
| 部署铁鸦II型 | `RavenBioMechanicalRepairDroneCloakedHealBeam` | 隐秘检伤 | `-` | HaveMedivacCloakHealBeam | 生物机械修理无人机的治疗效果提高25%，并使正在接受治疗的单位进入隐形状态。 |
| 指挥中心 | `OrbitalCommand` | 升级为轨道控制基地 | `UpgradeToOrbital,Execute` | - | 使指挥中心升级为轨道控制基地，并启用析像扫描和轨道空投：矿骡技能。无法装载SCV。 |

实现备注：凡是涉及局内状态、资源、堆叠、全局计时器、隐藏 caster 的机制，都必须有 runtime hook 和 `[XM_DBG]` 日志。

## 11. 指挥官个性化机制

Owner：`CommanderPersonalMechanicProfile`、`CommanderPersonalMechanicEffectProfile`、`CommanderPersonalMechanicHookProfile`、`CommanderPersonalMechanicRequirementProfile`。

本指挥官重点：诺娃形态切换会改变武器、技能、行为和装备，应由 CommanderHeroModeProfile + hook 接入。

### 威望正向融合输入

| 威望 ID | Primary Upgrade | 禁用单位 | 启用单位 | 禁用 Ability | 补充 Upgrade |
|---|---|---|---|---|---|
| `CommanderPrestigeNovaBio` | `CommanderPrestigeNovaBio` | `-` | `-` | `-` | `-` |
| `CommanderPrestigeNovaAirlift` | `CommanderPrestigeNovaAirlift` | `-` | `-` | `-` | `-` |
| `CommanderPrestigeNovaSuperCloak` | `CommanderPrestigeNovaSuperCloak` | `-` | `-` | `NovaKitSwap:, GhostAcademyResearch:7` | `NovaSuperCloak1` |

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
[XM_DBG][INFO][COMMANDER_PROFILE_LOAD] commander=Nova levelMode=FullLevel15 masteryMode=AllSixMax rosterStage=power_fusion result=ok
[XM_DBG][INFO][POWER_FUSION_APPLY] commander=Nova levelMode=FullLevel15 masteryMode=AllSixMax prestigeMode=SelectedPositive result=ok
[XM_DBG][INFO][ROSTER_LOAD] commander=Nova stage=power_fusion units=11 buildings=5 result=ok
[XM_DBG][INFO][MODULE_VERIFY] commander=Nova module=<01-11> profile=<profile> result=ok
[XM_DBG][WARN][CASC_AUDIT_REQUIRED] commander=Nova module=<module> object=<object> result=needs-casc-audit
```

## 第一轮待审计项

- 顶部技能的 caster、按钮、冷却、充能、目标转发闭包。
- 英雄或特殊英雄的 Unit、Ability、Behavior、Weapon、Actor、Sound 闭包。
- `power_fusion` 最终 roster 与 `level15` roster 的新增、替换、变体关系。
- 6 项精通的真实作用对象和最终数值。
- 3 个威望的正面收益、负面代价、disable/suppress、费用/冷却/上限变化。
- 科技建筑研究按钮、Requirement、Upgrade effect 是否完整。
- 特殊机制和个性化机制是否需要 runtime hook。
