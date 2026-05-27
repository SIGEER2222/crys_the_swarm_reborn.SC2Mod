# 斯托科夫（Stukov）指挥官细化

日期：2026-05-27

## 当前口径

当前指挥官默认 15 级，不从 1 级开始；精通默认 6 项全部 30 点；威望默认只取正面收益，不直接启用官方 `PlayerPrestige`。`initial` 只作为官方基础状态审计和差异对照，默认测试和玩法应看 `power_fusion` 最终状态。

本文件按 `docs/newdocs/模块拆分` 的 11 个模块整理 斯托科夫。依据 `游戏数据/官方合作指挥官/commanders/Stukov/` 的 JSON 摘要生成；具体 Ability、Behavior、Weapon、Actor、Effect、Requirement 闭包仍需继续追 `references/sc2-build-96883-casc-export/` 或实机 `[XM_DBG]` 日志。

## 官方数据摘要

| 项 | 值 |
|---|---|
| CommanderId | `ZergStukov` |
| 中文名 | 斯托科夫 |
| 默认升级 | `StukovCommander, SISiegeTankAmmoCapacity, SISiegeTankTentacleWhileSieged` |
| 默认能力命令 | `-` |
| 威望 ID | `CommanderPrestigeStukovMech, CommanderPrestigeStukovBanshees, CommanderPrestigeStukovBunkers` |
| heroes 数量 | 0 |
| roster 数量 | 15 |
| units 数量 | 5 |
| buildings 数量 | 10 |
| command card 对象数 | 15 |
| upgrades 数量 | 29 |
| source | `mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/userdata.xml` |

roster 样例：

```text
StukovInfestedBarracks, StukovInfestedSupplyDepot, StukovInfestedSiegeTank, StukovInfestedRefinery, StukovInfestedArmory, StukovInfestedMarine, StukovInfestedCivilian, StukovInfestedCivilianStructure, StukovInfestedStarport, StukovInfestedWraith, StukovInfestedCommandCenter, StukovInfestedFactory, SwarmQueen, StukovEvolutionChamber, Zergling
```

## 15 级解锁摘要

- 1: 感染
- 2: 恶意繁殖
- 3: 传染病
- 4: 末日巨兽
- 5: 被感染的工程站升级包
- 6: 腐化征用
- 7: 被感染的步兵升级包
- 8: 新单位：虫巢女王
- 9: 被感染的重工厂升级包
- 10: 亚历山大号
- 11: 被感染的星港升级包
- 12: 易燃外肢
- 13: 虫巢女王升级包
- 14: 增生地堡
- 15: 神经感染

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
| Lv4 末日巨兽 | 4 | `StukovSummonApocalisk:` | `CommanderStukovPH4` | 解锁在目标位置孵化末日巨兽的能力。末日巨兽可以被控制，能持续作战60秒。通过顶部面板来孵化末日巨兽。 |
| Lv10 亚历山大号 | 10 | `StukovSummonAleksander:` | `CommanderStukovPH5` | 解锁在目标位置呼叫亚历山大号的能力。亚历山大号可以被控制，能持续作战60秒。通过顶部面板来呼叫亚历山大号。 |
| Lv11 被感染的星港升级包 | 11 | `SIStarportResearch:3` | `CommanderStukovPH12` | 在被感染的星港科技实验室中解锁以下升级： / 提高被感染的女妖的生命值。降低被感染的解放者在攻击时所受到的伤害。 |
| Lv11 被感染的星港升级包 | 11 | `SIStarportResearch:1` | `CommanderStukovPH12` | 在被感染的星港科技实验室中解锁以下升级： / 提高被感染的女妖的生命值。降低被感染的解放者在攻击时所受到的伤害。 |

### command card 命中

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 被感染的指挥中心 | `SICommandCenterLoad` | 装载 | `SICommandCenterTransport,LoadAll` | - | 将附近被感染的SCV装载进被感染的指挥中心。 |
| 被感染的指挥中心 | `CommandCenterUnloadAll` | 全部卸载 | `SICommandCenterTransport,UnloadAll` | - | 卸载所有单位。 |
| 被感染的星港 | `SIBanshee` | 孵化被感染的女妖 | `SIStarportTrain,Train1` | - | 战术打击飞行器。可以隐形，还可以升级潜地技能。 / 可以对地。 |
| 被感染的星港 | `SITechLabStarport` | 建造被感染的科技实验室 | `SIStarportAddOns,Build1` | - | 空中单位研发建筑。科技实验室可以同任何生产建筑相组合。 / 开启： / - 被感染的女妖 / - 虫巢女王 |
| 跳虫 | `EvolveBileLauncherBombardmentCooldownLocked` | 进化快速轰炸 | `-` | ZagaraLevel13 | 该科技将在指挥官等级13时解锁。 |

实现备注：面板只注册 profile 和转发 caster，地图不得按 commander 写 if/else。精通和威望影响面板冷却/充能/费用时，由本模块接收最终 modifier。

## 02. 英雄单位及其技能

Owner：`CommanderHeroProfile`、`CommanderHeroModeProfile`、`CommanderHeroAbilityProfile`、`CommanderHeroSkillTreeProfile`、`CommanderHeroReviveProfile`、`CommanderHeroModifierProfile`。

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| - | - | - | - | - | 官方 heroes.json 未列出英雄条目；召唤物/形态/特殊英雄需从 progression、command_cards 或 CASC 继续追 |

### 英雄/形态候选

- 暂无自动命中项，需 CASC/实机日志补充。

口径：感染建筑生产链和无限刷兵不能靠普通训练按钮表达，需要专属 hook。

待审计：Hero Unit、技能按钮、复活、形态切换、武器/Actor/Sound 闭包。

## 03. 普通单位技能及其进化功能

Owner：`CommanderUnitAbilityProfile`、`CommanderUnitStatProfile`、`CommanderUnitEvolutionProfile`、`CommanderUnitBehaviorProfile`、`CommanderUnitWeaponProfile`。

### 单位技能按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 被感染的平民 | `MoveHoldPosition` | 原地防御 | `move,HoldPos` | - | 命令选中的单位待在原地，并攻击射程内的敌方目标。接受命令的单位不会对敌人进行追击或移向敌人与其交战。 |
| 被感染的平民 | `MovePatrol` | 巡逻 | `move,Patrol` | - | 命令选中的单位在当前位置与目标区域间进行巡逻。巡逻的单位会对敌人发起攻击或移向附近的敌人与其交战。 |
| 被感染的平民 | `AttackWorker` | AttackWorker | `attack,Execute` | - | - |
| 被感染的平民 | `StukovInfestedInfestedCivilianLeap` | 厌氧强化 | `-` | HaveStukovInfestedInfestedCivilianLeapAttack | 允许被感染的平民快速扑向附近的敌方地面单位。 |
| 被感染的平民 | `StukovInfestedCivilianSpawnBroodlingsOnDeath` | 巢虫育生 | `-` | HaveStukovInfestedCivilianSpawnBroodlingOnDeath | 被感染的平民死亡时孵化一只巢虫。 |
| 被感染的陆战队员 | `MoveHoldPosition` | 原地防御 | `move,HoldPos` | - | 命令选中的单位待在原地，并攻击射程内的敌方目标。接受命令的单位不会对敌人进行追击或移向敌人与其交战。 |
| 被感染的陆战队员 | `MovePatrol` | 巡逻 | `move,Patrol` | - | 命令选中的单位在当前位置与目标区域间进行巡逻。巡逻的单位会对敌人发起攻击或移向附近的敌人与其交战。 |
| 被感染的陆战队员 | `SIMarineTrooperImprovedRange` | 视网增强 | `-` | HaveSIMarineTrooperRange | 被感染的陆战队员和被感染的士兵获得+1攻击射程。 |
| 被感染的陆战队员 | `SIPlaguedMunitions` | 染疫弹药 | `-` | HaveSIPlaguedMunitions | 被感染的陆战队员和被感染的士兵在{Behavior,SIInfestedTrooperMarinePlaguedMunitions,Duration}秒内... |
| 被感染的攻城坦克 | `MoveHoldPosition` | 原地防御 | `move,HoldPos` | - | 命令选中的单位待在原地，并攻击射程内的敌方目标。接受命令的单位不会对敌人进行追击或移向敌人与其交战。 |
| 被感染的攻城坦克 | `MovePatrol` | 巡逻 | `move,Patrol` | - | 命令选中的单位在当前位置与目标区域间进行巡逻。巡逻的单位会对敌人发起攻击或移向附近的敌人与其交战。 |
| 被感染的攻城坦克 | `AttackBuilding` | 攻击 | `attack,Execute` | - | 锁定并且攻击目标，直到超出射程或对方被摧毁。 |
| 被感染的攻城坦克 | `AutoCreateInfestedCivilianAmmo` | 自行裂生 | `-` | HaveInfestedSiegeTankAmmo | 被感染的攻城坦克每{Behavior,InfestedSiegeTankAmmoAuto,Period}秒自动孵化一枚烈性生质。 |
| 被感染的攻城坦克 | `InfestedSiegeTankArmoredDamage` | 酸性酶 | `-` | UseInfestedSiegeTankArmoredDamage | 被感染的攻城坦克在两种模式下对重甲单位和建筑造成额外15点伤害。 |
| 被感染的攻城坦克 | `StukovInfestedSiegeTankUproot` | 站起 | `StukovInfestedSiegeTankUproot,Execute` | - | 使被感染的攻城坦克站起。站起后的被感染的攻城坦克拥有移动的能力，但无法攻击。在菌毯上的移动速度加快。 |
| 被感染的攻城坦克 | `StukovInfestedSiegeTankDeepTunnel` | 深槽虫道 | `StukovInfestedSiegeTankDeepTunnel,Execute` | - | 可以快速移动至任何有菌毯的可见位置。 |
| 被感染的攻城坦克 | `StukovInfestedSiegeTankAmmo` | 烈性生质 | `-` | - | 吞噬周围被感染的平民和被感染的士兵来恢复20点生命值，并为被感染的攻城坦克的烈性爆弹武器提供弹药。最多可储存8枚炮弹。 |
| 被感染的怨灵战机 | `MoveHoldPosition` | 原地防御 | `move,HoldPos` | - | 命令选中的单位待在原地，并攻击射程内的敌方目标。接受命令的单位不会对敌人进行追击或移向敌人与其交战。 |
| 被感染的怨灵战机 | `MovePatrol` | 巡逻 | `move,Patrol` | - | 命令选中的单位在当前位置与目标区域间进行巡逻。巡逻的单位会对敌人发起攻击或移向附近的敌人与其交战。 |
| 被感染的怨灵战机 | `WraithCloakOn` | WraithCloakOn | `WraithCloak,On` | - | - |
| 被感染的怨灵战机 | `WraithCloakOff` | WraithCloakOff | `WraithCloak,Off` | - | - |
| 被感染的怨灵战机 | `ImprovedBurstLaser` | 脉冲增幅器 | `-` | HaveWraithImprovedBurstLaser | 怨灵战机移动时，双子飞弹的伤害提高{(Behavior,SwannGeminiMissileMovementBuff,DamageResponse.Mod... |
| 被感染的怨灵战机 | `SingularityAnchor` | SingularityAnchor | `255,255` | DynamicPowerRoutingResearched | - |
| 虫后 | `MoveHoldPosition` | 原地防御 | `move,HoldPos` | - | 命令选中的单位待在原地，并攻击射程内的敌方目标。接受命令的单位不会对敌人进行追击或移向敌人与其交战。 |
| 虫后 | `MovePatrol` | 巡逻 | `move,Patrol` | - | 命令选中的单位在当前位置与目标区域间进行巡逻。巡逻的单位会对敌人发起攻击或移向附近的敌人与其交战。 |
| 虫后 | `BioMechanicalTransfusionPassive` | 生物机械哺液 | `-` | HaveBioMechanicalTransfusionPassive | 速效哺液的治疗量提高10点，现在可以对机械单位和建筑使用。 |
| 虫后 | `BuildCreepTumor` | 产下菌毯肿瘤 | `QueenBuild,Build1` | - | 一种潜地的菌毯分泌腺体。菌毯能够为附近的异虫建筑提供给养。一颗菌毯肿瘤能够再分裂出一颗额外的菌毯肿瘤。 / 效果加成：异虫单位在菌毯上的移动速度更快 |
| 虫后 | `BioMechanicalTransfusion` | 速效哺液 | `BioMechanicalTransfusion,Execute` | - | 为一个单位或建筑进行持续的治疗，共恢复{Effect,QueenBurstHeal,VitalArray[Life].Change*(Behavior,Q... |
| 虫后 | `EvolveToBrutaliskLocked` | 进化为莽兽 | `-` | AbathurLevel02 | 该技能将在指挥官等级2时解锁。 |
| 虫后 | `BiomassPassiveEmpty` | 生物质搜集 | `-` | BiomassBuffEmptyVisible | 该单位可以通过击杀敌方单位搜集生物质来获得能量。 |
| 虫后 | `BuildCreepTumor` | 产下菌毯肿瘤 | `QueenBuild,Build3` | - | 一种潜地的菌毯分泌腺体。菌毯能够为附近的异虫建筑提供给养。一颗菌毯肿瘤能够再分裂出一颗额外的菌毯肿瘤。 / 效果加成：异虫单位在菌毯上的移动速度更快 |
| 虫后 | `QueenBurstHeal` | QueenBurstHeal | `QueenBurstHeal,Execute` | - | - |
| 虫后 | `DeepTunnel` | DeepTunnel | `DeepTunnel,Execute` | - | - |

### 进化/形态/切换候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 进化腔 | `EvolveCalcifiedArmorLocked` | 进化钙化装甲 | `-` | StukovLevel05 | 该科技将在指挥官等级5时解锁。 |
| 被感染的兵营 | `SIInfestedMarine` | 孵化被感染的陆战队员 | `SIBarracksTrain,Train1` | - | 通用型被感染的步兵，持续存在{Behavior,SIBarracksTrainTimedLife,Duration}秒。 / 可以对地和对空。 |
| 被感染的兵营 | `MasteryStukovUnitRegenSpeedAppend` | 肌理重构 | `-` | HaveMasteryStukovUnitRegenSpeed | 精通：从这座建筑孵化的单位每秒恢复{Effect,MasteryStukovUnitRegenSpeedDisplayDummy,Amount}点生命值。 |
| 被感染的平民 | `StukovInfestedCivilianSpawnBroodlingsOnDeath` | 巢虫育生 | `-` | HaveStukovInfestedCivilianSpawnBroodlingOnDeath | 被感染的平民死亡时孵化一只巢虫。 |
| 被感染的平民建筑 | `EvolveInfestationLevel3Locked` | 进化3级感染 | `-` | StukovLevel03 | 该科技将在指挥官等级3时解锁。 |
| 被感染的平民建筑 | `EvolveStukovInfestedInfestedCivilianLeap` | 研究厌氧强化 | `SIInfestedCivilianStructureResearch,Research11` | - | 允许被感染的平民快速扑向附近的敌方地面单位。 |
| 被感染的平民建筑 | `EvolveBroodlingGestationLocked` | 进化巢虫育生 | `-` | StukovLevel07 | 该科技将在指挥官等级7时解锁。 |
| 被感染的平民建筑 | `MasteryStukovUnitRegenSpeedAppend` | 肌理重构 | `-` | HaveMasteryStukovUnitRegenSpeed | 精通：从这座建筑孵化的单位每秒恢复{Effect,MasteryStukovUnitRegenSpeedDisplayDummy,Amount}点生命值。 |
| 被感染的平民建筑 | `SIInfestedCivilian` | 孵化被感染的平民 | `SICivilianStructureSpawnCivilian,Execute` | - | 通用型被感染的步兵，持续存在{Behavior,SIBarracksTrainTimedLife,Duration}秒。 / 可以对地。 |
| 被感染的指挥中心 | `SISCV` | 孵化被感染的SCV | `SICommandCenterTrain,Train1` | - | 基础工作单位。用于采集资源、建造被感染的建筑和修理。 / 可以对地。 |
| 被感染的指挥中心 | `SIOverlord` | 孵化王虫 | `SICommandCenterTrain,Train3` | - | 提供补给。提高本方单位数量上限。 / 无法攻击。 |
| 被感染的指挥中心 | `EvolveAggressiveIncubationLocked` | 进化入侵繁殖 | `-` | StukovLevel03 | 该科技将在指挥官等级3时解锁。 |
| 被感染的指挥中心 | `overlordspeed` | 进化充气甲壳 | `SICommandCenterResearch,Research2` | - | 提高王虫和眼虫的移动速度。 |
| 被感染的指挥中心 | `MasteryStukovUnitRegenSpeedAppend` | 肌理重构 | `-` | HaveMasteryStukovUnitRegenSpeed | 精通：从这座建筑孵化的单位每秒恢复{Effect,MasteryStukovUnitRegenSpeedDisplayDummy,Amount}点生命值。 |
| 被感染的重工厂 | `SIDiamondBack` | 孵化被感染的响尾蛇战车 | `SIFactoryTrain,Train3` | - | 快速、高伤害的悬浮式坦克。可以移动攻击，还可以将飞行单位拖至地面。 / 可以对地。 |
| 被感染的重工厂 | `SISiegeTank` | 孵化被感染的攻城坦克 | `SIFactoryTrain,Train2` | - | 重型坦克。可以在扎根后通过吞噬被感染的步兵单位来提供远程炮火支援。可以使用深槽虫道技能快速移动至任何有菌毯的可见位置。 / 可以对地。 |
| 被感染的重工厂 | `MasteryStukovUnitRegenSpeedAppend` | 肌理重构 | `-` | HaveMasteryStukovUnitRegenSpeed | 精通：从这座建筑孵化的单位每秒恢复{Effect,MasteryStukovUnitRegenSpeedDisplayDummy,Amount}点生命值。 |
| 被感染的重工厂 | `SITechLabFactory` | 建造被感染的科技实验室 | `SIFactoryAddOns,Build1` | - | 战车研发建筑。科技实验室可以同任何生产建筑相组合。 / 开启： / - 被感染的攻城坦克 |
| 被感染的攻城坦克 | `AutoCreateInfestedCivilianAmmo` | 自行裂生 | `-` | HaveInfestedSiegeTankAmmo | 被感染的攻城坦克每{Behavior,InfestedSiegeTankAmmoAuto,Period}秒自动孵化一枚烈性生质。 |
| 被感染的攻城坦克 | `InfestedSiegeTankArmoredDamage` | 酸性酶 | `-` | UseInfestedSiegeTankArmoredDamage | 被感染的攻城坦克在两种模式下对重甲单位和建筑造成额外15点伤害。 |
| 被感染的攻城坦克 | `StukovInfestedSiegeTankUproot` | 站起 | `StukovInfestedSiegeTankUproot,Execute` | - | 使被感染的攻城坦克站起。站起后的被感染的攻城坦克拥有移动的能力，但无法攻击。在菌毯上的移动速度加快。 |
| 被感染的攻城坦克 | `StukovInfestedSiegeTankDeepTunnel` | 深槽虫道 | `StukovInfestedSiegeTankDeepTunnel,Execute` | - | 可以快速移动至任何有菌毯的可见位置。 |
| 被感染的攻城坦克 | `StukovInfestedSiegeTankAmmo` | 烈性生质 | `-` | - | 吞噬周围被感染的平民和被感染的士兵来恢复20点生命值，并为被感染的攻城坦克的烈性爆弹武器提供弹药。最多可储存8枚炮弹。 |
| 被感染的星港 | `SILiberator` | 孵化被感染的解放者 | `SIStarportTrain,Train2` | - | 重型火炮战机。攻击对敌方空中单位造成范围伤害。 / 可以对空。 |
| 被感染的星港 | `SIBanshee` | 孵化被感染的女妖 | `SIStarportTrain,Train1` | - | 战术打击飞行器。可以隐形，还可以升级潜地技能。 / 可以对地。 |
| 被感染的星港 | `SpawnBroodQueenLocked` | 孵化虫巢女王 | `-` | StukovLevel08 | 该单位将在指挥官等级8时解锁。 |
| 被感染的星港 | `MasteryStukovUnitRegenSpeedAppend` | 肌理重构 | `-` | HaveMasteryStukovUnitRegenSpeed | 精通：从这座建筑孵化的单位每秒恢复{Effect,MasteryStukovUnitRegenSpeedDisplayDummy,Amount}点生命值。 |
| 虫后 | `EvolveToBrutaliskLocked` | 进化为莽兽 | `-` | AbathurLevel02 | 该技能将在指挥官等级2时解锁。 |
| 跳虫 | `zerglingmovementspeed` | 进化代谢加速 | `SpawningPoolResearch,Research2` | - | 提高跳虫的移动速度。 |
| 跳虫 | `EvolveHardenedCarapaceZagaraLocked` | 进化硬化甲壳 | `-` | ZagaraLevel06 | 该科技将在指挥官等级6时解锁。 |
| ... | ... | ... | ... | ... | 还有 3 项，后续从 command_cards.json 继续展开 |

实现备注：单位自己声明技能、形态和升级接入口；科技建筑只展示符合条件的研究项，不直接拥有单位升级逻辑。

## 04. 初始化基地与特殊建筑

Owner：`CommanderRuntimeProfile`、`CommanderScenarioLoadout`、`CommanderSpecialStructureProfile`、`CommanderInitialCasterProfile`。

### 初始化建筑候选

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 被感染的补给站 | `StukovInfestedSupplyDepot` | `SISupplyDepot` | Ground; Armored/Biological/Mechanical/Structure | 矿:100 气:- 人口字段:8 生命:350 | 为人类部队提供补给， / 提高本方单位数量上限。 / 补给站可以降下，允许地面单位出入。 |
| 被感染的精炼厂 | `StukovInfestedRefinery` | `SIRefinery` | Ground; Armored/Biological/Mechanical/Structure | 矿:75 气:- 人口字段:- 生命:500 | 建造在瓦斯气泉上，用于采集高能瓦斯。 |
| 被感染的平民建筑 | `StukovInfestedCivilianStructure` | `SICivilianStructure` | Ground; Armored/Biological/Mechanical/Structure | 矿:200 气:- 人口字段:- 生命:1000 | 民用住宅。定期孵化被感染的步兵。 / 开启： / - 被感染的平民 |
| 被感染的指挥中心 | `StukovInfestedCommandCenter` | `SICommandCenter` | Ground; Armored/Biological/Mechanical/Structure | 矿:400 气:- 人口字段:15 生命:1500 | 基础建筑，用于接收采集到的资源。可以生成菌毯，喂养附近的异虫建筑。可以使用站起技能。 / 开启： / - 被感染的SCV / - 王虫 |

### 特殊建筑候选

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 被感染的兵营 | `StukovInfestedBarracks` | `SIBarracks` | Ground; Armored/Biological/Mechanical/Structure | 矿:150 气:- 人口字段:- 生命:1000 | 步兵训练设施。 / 开启： / - 被感染的陆战队员 |
| 被感染的补给站 | `StukovInfestedSupplyDepot` | `SISupplyDepot` | Ground; Armored/Biological/Mechanical/Structure | 矿:100 气:- 人口字段:8 生命:350 | 为人类部队提供补给， / 提高本方单位数量上限。 / 补给站可以降下，允许地面单位出入。 |
| 被感染的精炼厂 | `StukovInfestedRefinery` | `SIRefinery` | Ground; Armored/Biological/Mechanical/Structure | 矿:75 气:- 人口字段:- 生命:500 | 建造在瓦斯气泉上，用于采集高能瓦斯。 |
| 被感染的军械库 | `StukovInfestedArmory` | `SIArmory` | Ground; Armored/Biological/Mechanical/Structure | 矿:150 气:100 人口字段:- 生命:750 | 为被感染的重工厂和被感染的星港单位提供升级方案。 |
| 被感染的平民建筑 | `StukovInfestedCivilianStructure` | `SICivilianStructure` | Ground; Armored/Biological/Mechanical/Structure | 矿:200 气:- 人口字段:- 生命:1000 | 民用住宅。定期孵化被感染的步兵。 / 开启： / - 被感染的平民 |
| 被感染的星港 | `StukovInfestedStarport` | `SIStarport` | Ground; Armored/Biological/Mechanical/Structure | 矿:150 气:100 人口字段:- 生命:1300 | 空中单位生产设施。 / 开启： / - 被感染的解放者 |
| 被感染的指挥中心 | `StukovInfestedCommandCenter` | `SICommandCenter` | Ground; Armored/Biological/Mechanical/Structure | 矿:400 气:- 人口字段:15 生命:1500 | 基础建筑，用于接收采集到的资源。可以生成菌毯，喂养附近的异虫建筑。可以使用站起技能。 / 开启： / - 被感染的SCV / - 王虫 |
| 被感染的重工厂 | `StukovInfestedFactory` | `SIFactory` | Ground; Armored/Biological/Mechanical/Structure | 矿:150 气:100 人口字段:- 生命:1250 | 战车生产设施。 / 开启： / - 被感染的响尾蛇战车 |
| 进化腔 | `StukovEvolutionChamber` | `SIEngineeringBay, SIEvolutionChamber` | Ground; Armored/Biological/Mechanical/Structure | 矿:125 气:- 人口字段:- 生命:850 | 为被感染的步兵和建筑提供升级方案。 / 开启： / - 使被感染的SCV可以建造被感染的导弹塔 |

实现备注：测试台切换指挥官时调用本指挥官 initializer，负责替换主基地、工人、运输机/投放单位、隐藏 caster 和特殊建筑。

## 05. 指挥官兵种

Owner：`CommanderRosterProfile`、`CommanderUnitProfile`、`CommanderUnitTrainProfile`、`CommanderUnitStageProfile`、`CommanderUnitRequirementProfile`。

来源：官方提取 `units.json`。这里列的是当前已提取 Catalog 对象；满级替换、威望正向融合或进化变体仍以 `power_fusion` 审计结果为准。

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 被感染的攻城坦克 | `StukovInfestedSiegeTank` | `StukovInfestedSiegeTank, SICocoonInfestedSiegeTank` | Ground; Armored/Biological/Mechanical | 矿:200 气:100 人口字段:-3 生命:200 | 重型坦克。让自己站起后可提供机动的坦克火力支援。可以使用深槽虫道技能快速移动至任何有菌毯的可见位置。 / 可以对地。 |
| 被感染的陆战队员 | `StukovInfestedMarine` | `SIInfestedMarine, SICocoonInfestedMarine` | Ground; Biological/Light | 矿:15 气:- 人口字段:-1 生命:50 | 通用型被感染的步兵。 / 可以对地和对空。 |
| 被感染的平民 | `StukovInfestedCivilian` | `SIInfestedCivilian, SICocoonInfestedSCV` | Ground; Biological/Light | 矿:- 气:- 人口字段:-0.5 生命:35 | 通用型被感染的步兵。 / 可以对地。 |
| 被感染的怨灵战机 | `StukovInfestedWraith` | `SIWraith, SICocoonInfestedLiberator` | Air; Armored/Mechanical | 矿:150 气:150 人口字段:-2 生命:140 | 高度机动性空中单位。擅长突袭打击。 / 可以对空和对地 |
| 虫后 | `SwarmQueen` | `Queen, QueenCoop, SwarmQueen` | Ground; Biological/Psionic | 矿:175 气:- 人口字段:-2 生命:175 | 支援单位。可以使用孵化菌毯肿瘤和速效哺液技能。 / 可以对地和对空。 |

三阶段口径：`initial` 只做审计，`level15` 表示满级解锁，`power_fusion` 表示 15 级 + 六精通全满 + 威望正向收益后的默认运行清单。

## 06. 指挥官精通

Owner：`CommanderMasteryProfile`、`CommanderMasteryEffectProfile`、`CommanderMasteryModifierProfile`。

| 组 | 名称 | Upgrade | 每点 | 30点口径 |
|---|---|---|---|---|
| 1 | 平民孵化易爆感染体的几率 | `MasteryStukovVolatileChance` | 0.5 | 15% |
| 1 | 感染建筑冷却时间缩短 | `MasteryStukovInfestStructureCDR` | 1.5 | -45秒 |
| 2 | 亚历山大号冷却时间缩短 | `MasteryStukovAleksanderCDR` | 3 | -90秒 |
| 2 | 末日巨兽冷却时间缩短 | `MasteryStukovApocaliskCDR` | 3 | -90秒 |
| 3 | Extend infested civ/marine timed life | `MasteryStukovTimedLife` | 1 | +30秒 |
| 3 | 重工厂和星港单位的攻击速度加快 | `MasteryStukovMechAttackSpeed` | 1 | +30% |

实现备注：当前默认六项全部 30 点。表里的 30 点口径由 `point_increments * 30` 推导，最终数值仍需以 Upgrade Effect 闭包验证。

## 07. 指挥官建筑

Owner：`CommanderBuildingProfile`、`CommanderBuildingAbilityProfile`、`CommanderBuildingTrainProfile`、`CommanderBuildingStageProfile`、`CommanderBuildingBehaviorProfile`。

来源：官方提取 `buildings.json`。

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 被感染的兵营 | `StukovInfestedBarracks` | `SIBarracks` | Ground; Armored/Biological/Mechanical/Structure | 矿:150 气:- 人口字段:- 生命:1000 | 步兵训练设施。 / 开启： / - 被感染的陆战队员 |
| 被感染的补给站 | `StukovInfestedSupplyDepot` | `SISupplyDepot` | Ground; Armored/Biological/Mechanical/Structure | 矿:100 气:- 人口字段:8 生命:350 | 为人类部队提供补给， / 提高本方单位数量上限。 / 补给站可以降下，允许地面单位出入。 |
| 被感染的精炼厂 | `StukovInfestedRefinery` | `SIRefinery` | Ground; Armored/Biological/Mechanical/Structure | 矿:75 气:- 人口字段:- 生命:500 | 建造在瓦斯气泉上，用于采集高能瓦斯。 |
| 被感染的军械库 | `StukovInfestedArmory` | `SIArmory` | Ground; Armored/Biological/Mechanical/Structure | 矿:150 气:100 人口字段:- 生命:750 | 为被感染的重工厂和被感染的星港单位提供升级方案。 |
| 被感染的平民建筑 | `StukovInfestedCivilianStructure` | `SICivilianStructure` | Ground; Armored/Biological/Mechanical/Structure | 矿:200 气:- 人口字段:- 生命:1000 | 民用住宅。定期孵化被感染的步兵。 / 开启： / - 被感染的平民 |
| 被感染的星港 | `StukovInfestedStarport` | `SIStarport` | Ground; Armored/Biological/Mechanical/Structure | 矿:150 气:100 人口字段:- 生命:1300 | 空中单位生产设施。 / 开启： / - 被感染的解放者 |
| 被感染的指挥中心 | `StukovInfestedCommandCenter` | `SICommandCenter` | Ground; Armored/Biological/Mechanical/Structure | 矿:400 气:- 人口字段:15 生命:1500 | 基础建筑，用于接收采集到的资源。可以生成菌毯，喂养附近的异虫建筑。可以使用站起技能。 / 开启： / - 被感染的SCV / - 王虫 |
| 被感染的重工厂 | `StukovInfestedFactory` | `SIFactory` | Ground; Armored/Biological/Mechanical/Structure | 矿:150 气:100 人口字段:- 生命:1250 | 战车生产设施。 / 开启： / - 被感染的响尾蛇战车 |
| 进化腔 | `StukovEvolutionChamber` | `SIEngineeringBay, SIEvolutionChamber` | Ground; Armored/Biological/Mechanical/Structure | 矿:125 气:- 人口字段:- 生命:850 | 为被感染的步兵和建筑提供升级方案。 / 开启： / - 使被感染的SCV可以建造被感染的导弹塔 |
| 跳虫 | `Zergling` | `SpawningPool, Zergling` | Ground; Armored/Biological/Structure | 矿:250 气:- 人口字段:- 生命:1000 | 迅捷的肉搏型生物。可以变异为爆虫。 / 可以对地。 |

### 建筑按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 进化腔 | `TerranInfantryWeaponsLevel3` | 升级步兵武器等级3 | `SIEngineeringBayResearch,Research3` | - | 使步兵单位的火力最大化。 |
| 进化腔 | `TerranInfantryArmorLevel3` | 升级步兵护甲等级3 | `SIEngineeringBayResearch,Research6` | - | 使步兵单位的护甲最大化。 |
| 进化腔 | `ResearchRegenerativePlatingLocked` | 研究再生型钢板 | `-` | StukovLevel05 | 该科技将在指挥官等级5时解锁。 |
| 进化腔 | `EvolveCalcifiedArmorLocked` | 进化钙化装甲 | `-` | StukovLevel05 | 该科技将在指挥官等级5时解锁。 |
| 进化腔 | `SIMissileTurretPassive` | 被感染的导弹塔 | `-` | - | 被感染的工程站允许你建造被感染的导弹塔。 |
| 进化腔 | `CancelBuilding` | 取消 | `BuildInProgress,Cancel` | - | 取消建造，摧毁尚未建造完成的建筑并返还部分资源。 |
| 被感染的军械库 | `TerranVehicleAndShipWeaponsLevel3` | 升级战车及舰船武器等级3 | `SIArmoryResearch,Research8` | - | 使在重工厂或星港生产单位造成的伤害升级至最高。 |
| 被感染的军械库 | `TerranVehicleAndShipPlatingLevel3` | 升级战车及舰船钢板等级3 | `SIArmoryResearch,Research5` | - | 使在重工厂或星港生产单位的护甲升级至最高。 |
| 被感染的军械库 | `CancelBuilding` | 取消 | `BuildInProgress,Cancel` | - | 取消建造，摧毁尚未建造完成的建筑并返还部分资源。 |
| 被感染的兵营 | `SIInfestedMarine` | 孵化被感染的陆战队员 | `SIBarracksTrain,Train1` | - | 通用型被感染的步兵，持续存在{Behavior,SIBarracksTrainTimedLife,Duration}秒。 / 可以对地和对空。 |
| 被感染的兵营 | `MasteryStukovUnitRegenSpeedAppend` | 肌理重构 | `-` | HaveMasteryStukovUnitRegenSpeed | 精通：从这座建筑孵化的单位每秒恢复{Effect,MasteryStukovUnitRegenSpeedDisplayDummy,Amount}点生命值。 |
| 被感染的兵营 | `SIStukovPlaceHordeRally` | 部署灵能发射器 | `SIStukovPlaceHordeRally,Execute` | - | 将当前已有和后续新造的被感染的步兵单位派往指定地点。 |
| 被感染的兵营 | `SITechLabBarracks` | 建造被感染的科技实验室 | `SIBarracksAddOns,Build1` | - | 步兵研发建筑。科技实验室可以同任何生产建筑相组合。 |
| 被感染的平民建筑 | `EvolveInfestationLevel3Locked` | 进化3级感染 | `-` | StukovLevel03 | 该科技将在指挥官等级3时解锁。 |
| 被感染的平民建筑 | `EvolveStukovInfestedInfestedCivilianLeap` | 研究厌氧强化 | `SIInfestedCivilianStructureResearch,Research11` | - | 允许被感染的平民快速扑向附近的敌方地面单位。 |
| 被感染的平民建筑 | `EvolveBroodlingGestationLocked` | 进化巢虫育生 | `-` | StukovLevel07 | 该科技将在指挥官等级7时解锁。 |
| 被感染的平民建筑 | `MasteryStukovUnitRegenSpeedAppend` | 肌理重构 | `-` | HaveMasteryStukovUnitRegenSpeed | 精通：从这座建筑孵化的单位每秒恢复{Effect,MasteryStukovUnitRegenSpeedDisplayDummy,Amount}点生命值。 |
| 被感染的平民建筑 | `SIStukovPlaceHordeRally` | 部署灵能发射器 | `SIStukovPlaceHordeRally,Execute` | - | 将当前已有和后续新造的被感染的步兵单位派往指定地点。 |
| 被感染的平民建筑 | `SIInfestedCivilian` | 孵化被感染的平民 | `SICivilianStructureSpawnCivilian,Execute` | - | 通用型被感染的步兵，持续存在{Behavior,SIBarracksTrainTimedLife,Duration}秒。 / 可以对地。 |
| 被感染的平民建筑 | `CancelBuilding` | 取消 | `BuildInProgress,Cancel` | - | 取消建造，摧毁尚未建造完成的建筑并返还部分资源。 |
| 被感染的指挥中心 | `SISCV` | 孵化被感染的SCV | `SICommandCenterTrain,Train1` | - | 基础工作单位。用于采集资源、建造被感染的建筑和修理。 / 可以对地。 |
| 被感染的指挥中心 | `SIOverlord` | 孵化王虫 | `SICommandCenterTrain,Train3` | - | 提供补给。提高本方单位数量上限。 / 无法攻击。 |
| 被感染的指挥中心 | `EvolveAggressiveIncubationLocked` | 进化入侵繁殖 | `-` | StukovLevel03 | 该科技将在指挥官等级3时解锁。 |
| 被感染的指挥中心 | `overlordspeed` | 进化充气甲壳 | `SICommandCenterResearch,Research2` | - | 提高王虫和眼虫的移动速度。 |
| 被感染的指挥中心 | `MasteryStukovUnitRegenSpeedAppend` | 肌理重构 | `-` | HaveMasteryStukovUnitRegenSpeed | 精通：从这座建筑孵化的单位每秒恢复{Effect,MasteryStukovUnitRegenSpeedDisplayDummy,Amount}点生命值。 |
| 被感染的指挥中心 | `SISpreadingCreep` | 增殖菌毯 | `-` | - | 被感染的指挥中心能以更快的速度扩散菌毯，并且拥有无限范围。 |
| 被感染的指挥中心 | `SICommandCenterLoad` | 装载 | `SICommandCenterTransport,LoadAll` | - | 将附近被感染的SCV装载进被感染的指挥中心。 |
| 被感染的指挥中心 | `CommandCenterUnloadAll` | 全部卸载 | `SICommandCenterTransport,UnloadAll` | - | 卸载所有单位。 |
| 被感染的指挥中心 | `CancelBuilding` | 取消 | `BuildInProgress,Cancel` | - | 取消建造，摧毁尚未建造完成的建筑并返还部分资源。 |
| 被感染的重工厂 | `SIDiamondBack` | 孵化被感染的响尾蛇战车 | `SIFactoryTrain,Train3` | - | 快速、高伤害的悬浮式坦克。可以移动攻击，还可以将飞行单位拖至地面。 / 可以对地。 |
| 被感染的重工厂 | `SISiegeTank` | 孵化被感染的攻城坦克 | `SIFactoryTrain,Train2` | - | 重型坦克。可以在扎根后通过吞噬被感染的步兵单位来提供远程炮火支援。可以使用深槽虫道技能快速移动至任何有菌毯的可见位置。 / 可以对地。 |
| 被感染的重工厂 | `StukovMasteryMechAttackSpeed` | 机械部队攻击速度 | `-` | HaveMasteryStukovMechAttackSpeed | 精通：攻击速度提高{Effect,MasteryStukovMechAttackSpeedDisplayDummy,Amount}%。 |
| 被感染的重工厂 | `MasteryStukovUnitRegenSpeedAppend` | 肌理重构 | `-` | HaveMasteryStukovUnitRegenSpeed | 精通：从这座建筑孵化的单位每秒恢复{Effect,MasteryStukovUnitRegenSpeedDisplayDummy,Amount}点生命值。 |
| 被感染的重工厂 | `SITechLabFactory` | 建造被感染的科技实验室 | `SIFactoryAddOns,Build1` | - | 战车研发建筑。科技实验室可以同任何生产建筑相组合。 / 开启： / - 被感染的攻城坦克 |
| 被感染的重工厂 | `CancelBuilding` | 取消 | `BuildInProgress,Cancel` | - | 取消建造，摧毁尚未建造完成的建筑并返还部分资源。 |
| 被感染的精炼厂 | `CancelBuilding` | 取消 | `BuildInProgress,Cancel` | - | 取消建造，摧毁尚未建造完成的建筑并返还部分资源。 |
| 被感染的星港 | `SILiberator` | 孵化被感染的解放者 | `SIStarportTrain,Train2` | - | 重型火炮战机。攻击对敌方空中单位造成范围伤害。 / 可以对空。 |
| 被感染的星港 | `SIBanshee` | 孵化被感染的女妖 | `SIStarportTrain,Train1` | - | 战术打击飞行器。可以隐形，还可以升级潜地技能。 / 可以对地。 |
| 被感染的星港 | `SpawnBroodQueenLocked` | 孵化虫巢女王 | `-` | StukovLevel08 | 该单位将在指挥官等级8时解锁。 |
| 被感染的星港 | `StukovMasteryMechAttackSpeed` | 机械部队攻击速度 | `-` | HaveMasteryStukovMechAttackSpeed | 精通：攻击速度提高{Effect,MasteryStukovMechAttackSpeedDisplayDummy,Amount}%。 |
| 被感染的星港 | `MasteryStukovUnitRegenSpeedAppend` | 肌理重构 | `-` | HaveMasteryStukovUnitRegenSpeed | 精通：从这座建筑孵化的单位每秒恢复{Effect,MasteryStukovUnitRegenSpeedDisplayDummy,Amount}点生命值。 |
| 被感染的星港 | `SITechLabStarport` | 建造被感染的科技实验室 | `SIStarportAddOns,Build1` | - | 空中单位研发建筑。科技实验室可以同任何生产建筑相组合。 / 开启： / - 被感染的女妖 / - 虫巢女王 |
| 被感染的补给站 | `Lower` | 降下 | `SISupplyDepotLower,Execute` | - | 降下建筑，允许地面单位出入。 |
| 被感染的补给站 | `CancelBuilding` | 取消 | `BuildInProgress,Cancel` | - | 取消建造，摧毁尚未建造完成的建筑并返还部分资源。 |
| 跳虫 | `zerglingmovementspeed` | 进化代谢加速 | `SpawningPoolResearch,Research2` | - | 提高跳虫的移动速度。 |
| 跳虫 | `EvolveHardenedCarapaceZagaraLocked` | 进化硬化甲壳 | `-` | ZagaraLevel06 | 该科技将在指挥官等级6时解锁。 |
| 跳虫 | `EvolveZerglingArmorShredZagaraLocked` | 进化切割利爪 | `-` | ZagaraLevel06 | 该科技将在指挥官等级6时解锁。 |
| 跳虫 | `PassiveBileLauncherLocked` | 胆汁喷射体 | `-` | ZagaraLevel05 | 该单位将在指挥官等级5时解锁。 |
| 跳虫 | `EvolveBileLauncherIncreasedRangeLocked` | 进化炮击导管 | `BuildInProgress,Cancel` | ZagaraLevel13 | 该科技将在指挥官等级13时解锁。 |
| 跳虫 | `EvolveBileLauncherBombardmentCooldownLocked` | 进化快速轰炸 | `-` | ZagaraLevel13 | 该科技将在指挥官等级13时解锁。 |
| 跳虫 | `CancelBuilding` | 取消 | `BuildInProgress,Cancel` | - | 取消建造，摧毁尚未建造完成的建筑并返还部分资源。 |

实现备注：建筑声明自身生产、研究、行为和阶段；训练单位的最终可用性由兵种/科技/精通/威望共同裁决。

## 08. 科技建筑及其升级选项

Owner：`CommanderTechBuildingProfile`、`CommanderUnitTechProfile`、`CommanderUpgradeProfile`、`CommanderUpgradeRequirementProfile`、`CommanderUpgradeEffectProfile`。

### 15 级解锁与研究命令

| 等级 | 名称 | 解锁升级 | 解锁 AbilityCmd | 说明 |
|---|---|---|---|---|
| 1 | 感染 | `CommanderStukovPH1` | `-` | 斯托科夫开局即拥有一个被感染的移民营，每60秒无消耗自动生成被感染的步兵单位。斯托科夫的基础建筑能以更快的速度生成菌毯，并且拥有无限范围。 |
| 2 | 恶意繁殖 | `CommanderStukovPH2` | `SIStukovInfestStructureUpgraded:` | 感染建筑现在可以储存额外2次使用次数，并且可以选择敌方建筑，使其在孵化巢虫的同时还会丧失功能。 |
| 3 | 传染病 | `CommanderStukovPH3` | `SIInfestedCivilianStructureResearch:2, SICommandCenterResearch:` | 解锁被感染的移民营额外一级感染。还会解锁一项被感染的指挥中心升级，使感染建筑孵化的巢虫数量提高50%。 |
| 4 | 末日巨兽 | `CommanderStukovPH4` | `StukovSummonApocalisk:` | 解锁在目标位置孵化末日巨兽的能力。末日巨兽可以被控制，能持续作战60秒。通过顶部面板来孵化末日巨兽。 |
| 5 | 被感染的工程站升级包 | `CommanderStukovPH6` | `SIEngineeringBayResearch:12, SIEngineeringBayResearch:11` | 在被感染的工程站中解锁以下升级： / 提高被感染的地堡的护甲。提高被感染的地堡在扎根状态下的生命恢复速度。 |
| 6 | 腐化征用 | `SIImprovedMarineSpawning` | `-` | 孵化被感染的陆战队员现在可以储存额外10次使用次数，并且被感染的陆战队员的孵化速度加快100%。 |
| 7 | 被感染的步兵升级包 | `CommanderStukovPH8` | `SIInfestedCivilianStructureResearch:9, SIBarracksResearch:8` | 在被感染的移民营中解锁被感染的平民死亡时可孵化巢虫的升级。在被感染的兵营科技实验室中解锁升级，允许被感染的陆战队员和被感染的士兵对其攻击的单位造成额外的持续性伤害。 |
| 8 | 新单位：虫巢女王 | `CommanderStukovPH9` | `-` | 空中支援单位。可以使用视觉共生体和孵化巢虫。 / 可以对空。 |
| 9 | 被感染的重工厂升级包 | `CommanderStukovPH10` | `SIFactoryResearch:3, SIFactoryResearch:` | 在被感染的重工厂科技实验室中解锁以下升级： / 提高被感染的攻城坦克对重甲目标造成的伤害。使被感染的响尾蛇战车在移动时会留下黏液尾迹，减速敌方地面单位并对其造成伤害。 |
| 10 | 亚历山大号 | `CommanderStukovPH5` | `StukovSummonAleksander:` | 解锁在目标位置呼叫亚历山大号的能力。亚历山大号可以被控制，能持续作战60秒。通过顶部面板来呼叫亚历山大号。 |
| 11 | 被感染的星港升级包 | `CommanderStukovPH12` | `SIStarportResearch:3, SIStarportResearch:1` | 在被感染的星港科技实验室中解锁以下升级： / 提高被感染的女妖的生命值。降低被感染的解放者在攻击时所受到的伤害。 |
| 12 | 易燃外肢 | `StukovApocaliskUpgrades` | `-` | 使末日巨兽的攻击及其初次孵化时所造成的范围伤害提高100%。 |
| 13 | 虫巢女王升级包 | `CommanderStukovPH13` | `SIStarportResearch:4, SIStarportResearch:5` | 在被感染的星港科技实验室中解锁以下升级： / 虫巢女王的能量恢复速度提高100%，并且孵化时获得满能量。使虫巢女王可以困住和暴露敌方单位，对其持续造成伤害。 |
| 14 | 增生地堡 | `SIInfestedBunkerUpgraded` | `-` | 使被感染的地堡可容纳的单位数增加2，被感染的士兵孵化速度提高20%。 |
| 15 | 神经感染 | `StukovAleksanderMindControl` | `-` | 斯托科夫可以控制被亚历山大号触手攻击的敌方单位。 |

### Upgrade 摘要

| Upgrade | 父级 | 显示名 | Effect数 | 说明 |
|---|---|---|---|---|
| `CommanderPrestigeStukovBanshees` | `CommanderPrestige` | - | 2 | - |
| `CommanderPrestigeStukovBansheesMastery` | `CommanderPrestige` | - | 2 | - |
| `CommanderPrestigeStukovBunkers` | `CommanderPrestige` | 尸群领主 | 4 | 优点 / 被感染的地堡孵化被感染的士兵的速度提高200%。 / 缺点 / 被感染的地堡不再拥有装载容量。 |
| `CommanderPrestigeStukovBunkersPerk` | `CommanderPrestige` | - | 4 | - |
| `CommanderPrestigeStukovMech` | `CommanderPrestige` | 惊人血肉焊机 | 29 | 优点 / 重工厂和星港不再有科技需求。机械战斗单位的消耗降低30%。自行裂生产生的被感染的攻城坦克，弹药补充速度加快200%。 / 缺点 / 被感染的移民营不能孵... |
| `CommanderStukovPH1` | `-` | 指挥官特质 斯托科夫 1 | 0 | 仍在进化中…… |
| `CommanderStukovPH10` | `-` | 指挥官特质 斯托科夫 10 | 0 | 仍在进化中…… |
| `CommanderStukovPH12` | `-` | 指挥官特质 斯托科夫 12 | 0 | 仍在进化中…… |
| `CommanderStukovPH13` | `-` | - | 0 | - |
| `CommanderStukovPH2` | `-` | 指挥官特质 斯托科夫 2 | 0 | 仍在进化中…… |
| `CommanderStukovPH3` | `-` | 指挥官特质 斯托科夫 3 | 0 | 仍在进化中…… |
| `CommanderStukovPH4` | `-` | 指挥官特质 斯托科夫 4 | 0 | 仍在进化中…… |
| `CommanderStukovPH5` | `-` | 指挥官特质 斯托科夫 5 | 0 | 仍在进化中…… |
| `CommanderStukovPH6` | `-` | 指挥官特质 斯托科夫 6 | 0 | 仍在进化中…… |
| `CommanderStukovPH8` | `-` | 指挥官特质 斯托科夫 8 | 0 | 仍在进化中…… |
| `CommanderStukovPH9` | `-` | - | 0 | - |
| `MasteryStukovAleksanderCDR` | `-` | 精通 斯托科夫 亚历山大号 冷却时间缩短 | 2 | 缩短亚历山大号技能的冷却时间。不会影响任务刚开始时的初始冷却时间。 |
| `MasteryStukovApocaliskCDR` | `-` | 精通 斯托科夫 末日巨兽 冷却时间缩短 | 2 | 缩短末日巨兽技能的冷却时间。不会影响任务刚开始时的初始冷却时间。 |
| `MasteryStukovInfestStructureCDR` | `-` | 精通 斯托科夫 感染建筑 冷却时间缩短 | 3 | 缩短感染建筑技能的冷却时间。不会影响任务刚开始时的初始冷却时间。 |
| `MasteryStukovMechAttackSpeed` | `-` | 精通 斯托科夫 机甲攻速 | 9 | 提高斯托科夫重工厂和星港单位的攻击速度。 |
| `MasteryStukovTimedLife` | `-` | 精通 斯托科夫 限时生命 | 3 | 延长被感染的平民、被感染的陆战队员以及被感染的士兵的持续时间。 |
| `MasteryStukovVolatileChance` | `-` | 精通 斯托科夫 易爆几率 | 2 | 被感染的平民有几率孵化为易爆感染体，死亡时发生爆炸，造成范围伤害。 |
| `SIImprovedMarineSpawning` | `-` | SI Improved Marine Spawning | 2 | - |
| `SIInfestedBunkerUpgraded` | `-` | SIInfestedBunkerUpgraded | 4 | - |
| `SISiegeTankAmmoCapacity` | `-` | 攻城坦克 弹药容量 | 0 | - |
| `SISiegeTankTentacleWhileSieged` | `-` | 攻城坦克 触手 架起时 | 0 | - |
| `StukovAleksanderMindControl` | `-` | - | 2 | - |
| `StukovApocaliskUpgrades` | `-` | - | 6 | - |
| `StukovCommander` | `-` | 斯托科夫 | 1 | - |

### 研究/升级按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 进化腔 | `TerranInfantryWeaponsLevel3` | 升级步兵武器等级3 | `SIEngineeringBayResearch,Research3` | - | 使步兵单位的火力最大化。 |
| 进化腔 | `TerranInfantryArmorLevel3` | 升级步兵护甲等级3 | `SIEngineeringBayResearch,Research6` | - | 使步兵单位的护甲最大化。 |
| 进化腔 | `ResearchRegenerativePlatingLocked` | 研究再生型钢板 | `-` | StukovLevel05 | 该科技将在指挥官等级5时解锁。 |
| 进化腔 | `EvolveCalcifiedArmorLocked` | 进化钙化装甲 | `-` | StukovLevel05 | 该科技将在指挥官等级5时解锁。 |
| 被感染的军械库 | `TerranVehicleAndShipWeaponsLevel3` | 升级战车及舰船武器等级3 | `SIArmoryResearch,Research8` | - | 使在重工厂或星港生产单位造成的伤害升级至最高。 |
| 被感染的军械库 | `TerranVehicleAndShipPlatingLevel3` | 升级战车及舰船钢板等级3 | `SIArmoryResearch,Research5` | - | 使在重工厂或星港生产单位的护甲升级至最高。 |
| 被感染的兵营 | `SITechLabBarracks` | 建造被感染的科技实验室 | `SIBarracksAddOns,Build1` | - | 步兵研发建筑。科技实验室可以同任何生产建筑相组合。 |
| 被感染的平民建筑 | `EvolveInfestationLevel3Locked` | 进化3级感染 | `-` | StukovLevel03 | 该科技将在指挥官等级3时解锁。 |
| 被感染的平民建筑 | `EvolveStukovInfestedInfestedCivilianLeap` | 研究厌氧强化 | `SIInfestedCivilianStructureResearch,Research11` | - | 允许被感染的平民快速扑向附近的敌方地面单位。 |
| 被感染的平民建筑 | `EvolveBroodlingGestationLocked` | 进化巢虫育生 | `-` | StukovLevel07 | 该科技将在指挥官等级7时解锁。 |
| 被感染的指挥中心 | `EvolveAggressiveIncubationLocked` | 进化入侵繁殖 | `-` | StukovLevel03 | 该科技将在指挥官等级3时解锁。 |
| 被感染的指挥中心 | `overlordspeed` | 进化充气甲壳 | `SICommandCenterResearch,Research2` | - | 提高王虫和眼虫的移动速度。 |
| 被感染的重工厂 | `SITechLabFactory` | 建造被感染的科技实验室 | `SIFactoryAddOns,Build1` | - | 战车研发建筑。科技实验室可以同任何生产建筑相组合。 / 开启： / - 被感染的攻城坦克 |
| 被感染的星港 | `SIBanshee` | 孵化被感染的女妖 | `SIStarportTrain,Train1` | - | 战术打击飞行器。可以隐形，还可以升级潜地技能。 / 可以对地。 |
| 被感染的星港 | `SITechLabStarport` | 建造被感染的科技实验室 | `SIStarportAddOns,Build1` | - | 空中单位研发建筑。科技实验室可以同任何生产建筑相组合。 / 开启： / - 被感染的女妖 / - 虫巢女王 |
| 被感染的怨灵战机 | `SingularityAnchor` | SingularityAnchor | `255,255` | DynamicPowerRoutingResearched | - |
| 跳虫 | `zerglingmovementspeed` | 进化代谢加速 | `SpawningPoolResearch,Research2` | - | 提高跳虫的移动速度。 |
| 跳虫 | `EvolveHardenedCarapaceZagaraLocked` | 进化硬化甲壳 | `-` | ZagaraLevel06 | 该科技将在指挥官等级6时解锁。 |
| 跳虫 | `EvolveZerglingArmorShredZagaraLocked` | 进化切割利爪 | `-` | ZagaraLevel06 | 该科技将在指挥官等级6时解锁。 |
| 跳虫 | `EvolveBileLauncherIncreasedRangeLocked` | 进化炮击导管 | `BuildInProgress,Cancel` | ZagaraLevel13 | 该科技将在指挥官等级13时解锁。 |
| 跳虫 | `EvolveBileLauncherBombardmentCooldownLocked` | 进化快速轰炸 | `-` | ZagaraLevel13 | 该科技将在指挥官等级13时解锁。 |

实现备注：科技建筑只负责展示/触发研究；每个单位升级效果由对应 `CommanderUnitTechProfile` 或 `CommanderUpgradeEffectProfile` 声明。

## 09. 特定地图运输机空投单位

Owner：`CommanderCargoLoadoutProfile`、`CommanderMapDropProfile`、`CommanderScenarioFallbackProfile`。

### 运输/空投能力候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 被感染的指挥中心 | `SICommandCenterLoad` | 装载 | `SICommandCenterTransport,LoadAll` | - | 将附近被感染的SCV装载进被感染的指挥中心。 |
| 被感染的指挥中心 | `CommandCenterUnloadAll` | 全部卸载 | `SICommandCenterTransport,UnloadAll` | - | 卸载所有单位。 |

### 可投放单位候选

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 被感染的攻城坦克 | `StukovInfestedSiegeTank` | `StukovInfestedSiegeTank, SICocoonInfestedSiegeTank` | Ground; Armored/Biological/Mechanical | 矿:200 气:100 人口字段:-3 生命:200 | 重型坦克。让自己站起后可提供机动的坦克火力支援。可以使用深槽虫道技能快速移动至任何有菌毯的可见位置。 / 可以对地。 |
| 被感染的陆战队员 | `StukovInfestedMarine` | `SIInfestedMarine, SICocoonInfestedMarine` | Ground; Biological/Light | 矿:15 气:- 人口字段:-1 生命:50 | 通用型被感染的步兵。 / 可以对地和对空。 |
| 被感染的平民 | `StukovInfestedCivilian` | `SIInfestedCivilian, SICocoonInfestedSCV` | Ground; Biological/Light | 矿:- 气:- 人口字段:-0.5 生命:35 | 通用型被感染的步兵。 / 可以对地。 |
| 被感染的怨灵战机 | `StukovInfestedWraith` | `SIWraith, SICocoonInfestedLiberator` | Air; Armored/Mechanical | 矿:150 气:150 人口字段:-2 生命:140 | 高度机动性空中单位。擅长突袭打击。 / 可以对空和对地 |
| 虫后 | `SwarmQueen` | `Queen, QueenCoop, SwarmQueen` | Ground; Biological/Psionic | 矿:175 气:- 人口字段:-2 生命:175 | 支援单位。可以使用孵化菌毯肿瘤和速效哺液技能。 / 可以对地和对空。 |

实现备注：运输机空投不要读取地图硬编码单位组，应从 `CommanderCargoLoadoutProfile` 读取当前 commander 的 `power_fusion` 单位清单和场景过滤规则。

## 10. 指挥官特殊机制

Owner：`CommanderSpecialMechanicProfile`、`CommanderSpecialResourceProfile`、`CommanderSpecialMechanicHookProfile`、`CommanderSpecialMechanicUnitProfile`。

本指挥官重点：感染建筑、殖民者大院、持续刷兵、感染民兵是主特殊机制。

### 特殊机制命中项

- 感染 (`CommanderStukovAutoCreep`)
- 恶意繁殖 (`CommanderStukovImprovedInfestStructure`)
- 传染病 (`CommanderStukovExtraInfestedCivilians`)
- 被感染的工程站升级包 (`CommanderStukovBunkerResearch`)
- 腐化征用 (`CommanderStukovImprovedMarineSpawning`)
- 被感染的步兵升级包 (`CommanderStukovInfestedCivilianResearch`)
- 被感染的重工厂升级包 (`CommanderStukovInfestedFactoryResearchPack`)
- 被感染的星港升级包 (`CommanderStukovInfestedStarportResearchPack`)
- 虫巢女王升级包 (`CommanderStukovQueenClassicResearchPack`)
- 增生地堡 (`CommanderStukovBunkerBonuses`)
- 神经感染 (`CommanderStukovAleksanderMindControl`)

### 特殊机制 Upgrade 候选

- 尸群领主 (`CommanderPrestigeStukovBunkers`)
- 惊人血肉焊机 (`CommanderPrestigeStukovMech`)
- 精通 斯托科夫 感染建筑 冷却时间缩短 (`MasteryStukovInfestStructureCDR`)
- 精通 斯托科夫 限时生命 (`MasteryStukovTimedLife`)
- 精通 斯托科夫 易爆几率 (`MasteryStukovVolatileChance`)
- SIInfestedBunkerUpgraded (`SIInfestedBunkerUpgraded`)

### 特殊机制按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 进化腔 | `SIMissileTurretPassive` | 被感染的导弹塔 | `-` | - | 被感染的工程站允许你建造被感染的导弹塔。 |
| 被感染的兵营 | `SIInfestedMarine` | 孵化被感染的陆战队员 | `SIBarracksTrain,Train1` | - | 通用型被感染的步兵，持续存在{Behavior,SIBarracksTrainTimedLife,Duration}秒。 / 可以对地和对空。 |
| 被感染的兵营 | `SIStukovPlaceHordeRally` | 部署灵能发射器 | `SIStukovPlaceHordeRally,Execute` | - | 将当前已有和后续新造的被感染的步兵单位派往指定地点。 |
| 被感染的兵营 | `SITechLabBarracks` | 建造被感染的科技实验室 | `SIBarracksAddOns,Build1` | - | 步兵研发建筑。科技实验室可以同任何生产建筑相组合。 |
| 被感染的平民 | `StukovInfestedInfestedCivilianLeap` | 厌氧强化 | `-` | HaveStukovInfestedInfestedCivilianLeapAttack | 允许被感染的平民快速扑向附近的敌方地面单位。 |
| 被感染的平民 | `StukovInfestedCivilianSpawnBroodlingsOnDeath` | 巢虫育生 | `-` | HaveStukovInfestedCivilianSpawnBroodlingOnDeath | 被感染的平民死亡时孵化一只巢虫。 |
| 被感染的平民建筑 | `EvolveInfestationLevel3Locked` | 进化3级感染 | `-` | StukovLevel03 | 该科技将在指挥官等级3时解锁。 |
| 被感染的平民建筑 | `EvolveStukovInfestedInfestedCivilianLeap` | 研究厌氧强化 | `SIInfestedCivilianStructureResearch,Research11` | - | 允许被感染的平民快速扑向附近的敌方地面单位。 |
| 被感染的平民建筑 | `SIStukovPlaceHordeRally` | 部署灵能发射器 | `SIStukovPlaceHordeRally,Execute` | - | 将当前已有和后续新造的被感染的步兵单位派往指定地点。 |
| 被感染的平民建筑 | `SIInfestedCivilian` | 孵化被感染的平民 | `SICivilianStructureSpawnCivilian,Execute` | - | 通用型被感染的步兵，持续存在{Behavior,SIBarracksTrainTimedLife,Duration}秒。 / 可以对地。 |
| 被感染的指挥中心 | `SISCV` | 孵化被感染的SCV | `SICommandCenterTrain,Train1` | - | 基础工作单位。用于采集资源、建造被感染的建筑和修理。 / 可以对地。 |
| 被感染的指挥中心 | `SISpreadingCreep` | 增殖菌毯 | `-` | - | 被感染的指挥中心能以更快的速度扩散菌毯，并且拥有无限范围。 |
| 被感染的指挥中心 | `SICommandCenterLoad` | 装载 | `SICommandCenterTransport,LoadAll` | - | 将附近被感染的SCV装载进被感染的指挥中心。 |
| 被感染的重工厂 | `SIDiamondBack` | 孵化被感染的响尾蛇战车 | `SIFactoryTrain,Train3` | - | 快速、高伤害的悬浮式坦克。可以移动攻击，还可以将飞行单位拖至地面。 / 可以对地。 |
| 被感染的重工厂 | `SISiegeTank` | 孵化被感染的攻城坦克 | `SIFactoryTrain,Train2` | - | 重型坦克。可以在扎根后通过吞噬被感染的步兵单位来提供远程炮火支援。可以使用深槽虫道技能快速移动至任何有菌毯的可见位置。 / 可以对地。 |
| 被感染的重工厂 | `SITechLabFactory` | 建造被感染的科技实验室 | `SIFactoryAddOns,Build1` | - | 战车研发建筑。科技实验室可以同任何生产建筑相组合。 / 开启： / - 被感染的攻城坦克 |
| 被感染的陆战队员 | `SIMarineTrooperImprovedRange` | 视网增强 | `-` | HaveSIMarineTrooperRange | 被感染的陆战队员和被感染的士兵获得+1攻击射程。 |
| 被感染的陆战队员 | `SIPlaguedMunitions` | 染疫弹药 | `-` | HaveSIPlaguedMunitions | 被感染的陆战队员和被感染的士兵在{Behavior,SIInfestedTrooperMarinePlaguedMunitions,Duration}秒内... |
| 被感染的攻城坦克 | `AutoCreateInfestedCivilianAmmo` | 自行裂生 | `-` | HaveInfestedSiegeTankAmmo | 被感染的攻城坦克每{Behavior,InfestedSiegeTankAmmoAuto,Period}秒自动孵化一枚烈性生质。 |
| 被感染的攻城坦克 | `InfestedSiegeTankArmoredDamage` | 酸性酶 | `-` | UseInfestedSiegeTankArmoredDamage | 被感染的攻城坦克在两种模式下对重甲单位和建筑造成额外15点伤害。 |
| 被感染的攻城坦克 | `StukovInfestedSiegeTankUproot` | 站起 | `StukovInfestedSiegeTankUproot,Execute` | - | 使被感染的攻城坦克站起。站起后的被感染的攻城坦克拥有移动的能力，但无法攻击。在菌毯上的移动速度加快。 |
| 被感染的攻城坦克 | `StukovInfestedSiegeTankDeepTunnel` | 深槽虫道 | `StukovInfestedSiegeTankDeepTunnel,Execute` | - | 可以快速移动至任何有菌毯的可见位置。 |
| 被感染的攻城坦克 | `StukovInfestedSiegeTankAmmo` | 烈性生质 | `-` | - | 吞噬周围被感染的平民和被感染的士兵来恢复20点生命值，并为被感染的攻城坦克的烈性爆弹武器提供弹药。最多可储存8枚炮弹。 |
| 被感染的星港 | `SILiberator` | 孵化被感染的解放者 | `SIStarportTrain,Train2` | - | 重型火炮战机。攻击对敌方空中单位造成范围伤害。 / 可以对空。 |
| 被感染的星港 | `SIBanshee` | 孵化被感染的女妖 | `SIStarportTrain,Train1` | - | 战术打击飞行器。可以隐形，还可以升级潜地技能。 / 可以对地。 |
| 被感染的星港 | `SITechLabStarport` | 建造被感染的科技实验室 | `SIStarportAddOns,Build1` | - | 空中单位研发建筑。科技实验室可以同任何生产建筑相组合。 / 开启： / - 被感染的女妖 / - 虫巢女王 |
| 虫后 | `BuildCreepTumor` | 产下菌毯肿瘤 | `QueenBuild,Build1` | - | 一种潜地的菌毯分泌腺体。菌毯能够为附近的异虫建筑提供给养。一颗菌毯肿瘤能够再分裂出一颗额外的菌毯肿瘤。 / 效果加成：异虫单位在菌毯上的移动速度更快 |
| 虫后 | `BiomassPassiveEmpty` | 生物质搜集 | `-` | BiomassBuffEmptyVisible | 该单位可以通过击杀敌方单位搜集生物质来获得能量。 |
| 虫后 | `BuildCreepTumor` | 产下菌毯肿瘤 | `QueenBuild,Build3` | - | 一种潜地的菌毯分泌腺体。菌毯能够为附近的异虫建筑提供给养。一颗菌毯肿瘤能够再分裂出一颗额外的菌毯肿瘤。 / 效果加成：异虫单位在菌毯上的移动速度更快 |

实现备注：凡是涉及局内状态、资源、堆叠、全局计时器、隐藏 caster 的机制，都必须有 runtime hook 和 `[XM_DBG]` 日志。

## 11. 指挥官个性化机制

Owner：`CommanderPersonalMechanicProfile`、`CommanderPersonalMechanicEffectProfile`、`CommanderPersonalMechanicHookProfile`、`CommanderPersonalMechanicRequirementProfile`。

本指挥官重点：感染建筑生产链和无限刷兵不能靠普通训练按钮表达，需要专属 hook。

### 威望正向融合输入

| 威望 ID | Primary Upgrade | 禁用单位 | 启用单位 | 禁用 Ability | 补充 Upgrade |
|---|---|---|---|---|---|
| `CommanderPrestigeStukovMech` | `CommanderPrestigeStukovMech` | `SICivilianStructure` | `-` | `-` | `-` |
| `CommanderPrestigeStukovBanshees` | `CommanderPrestigeStukovBanshees` | `-` | `-` | `-` | `StukovBanshees1` |
| `CommanderPrestigeStukovBunkers` | `CommanderPrestigeStukovBunkers` | `-` | `-` | `-` | `StukovBunkers1` |

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
[XM_DBG][INFO][COMMANDER_PROFILE_LOAD] commander=Stukov levelMode=FullLevel15 masteryMode=AllSixMax rosterStage=power_fusion result=ok
[XM_DBG][INFO][POWER_FUSION_APPLY] commander=Stukov levelMode=FullLevel15 masteryMode=AllSixMax prestigeMode=SelectedPositive result=ok
[XM_DBG][INFO][ROSTER_LOAD] commander=Stukov stage=power_fusion units=5 buildings=10 result=ok
[XM_DBG][INFO][MODULE_VERIFY] commander=Stukov module=<01-11> profile=<profile> result=ok
[XM_DBG][WARN][CASC_AUDIT_REQUIRED] commander=Stukov module=<module> object=<object> result=needs-casc-audit
```

## 第一轮待审计项

- 顶部技能的 caster、按钮、冷却、充能、目标转发闭包。
- 英雄或特殊英雄的 Unit、Ability、Behavior、Weapon、Actor、Sound 闭包。
- `power_fusion` 最终 roster 与 `level15` roster 的新增、替换、变体关系。
- 6 项精通的真实作用对象和最终数值。
- 3 个威望的正面收益、负面代价、disable/suppress、费用/冷却/上限变化。
- 科技建筑研究按钮、Requirement、Upgrade effect 是否完整。
- 特殊机制和个性化机制是否需要 runtime hook。
