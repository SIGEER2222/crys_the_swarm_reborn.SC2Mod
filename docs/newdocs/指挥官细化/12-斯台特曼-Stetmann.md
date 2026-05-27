# 斯台特曼（Stetmann）指挥官细化

日期：2026-05-27

## 当前口径

当前指挥官默认 15 级，不从 1 级开始；精通默认 6 项全部 30 点；威望默认只取正面收益，不直接启用官方 `PlayerPrestige`。`initial` 只作为官方基础状态审计和差异对照，默认测试和玩法应看 `power_fusion` 最终状态。

本文件按 `docs/newdocs/模块拆分` 的 11 个模块整理 斯台特曼。依据 `游戏数据/官方合作指挥官/commanders/Stetmann/` 的 JSON 摘要生成；具体 Ability、Behavior、Weapon、Actor、Effect、Requirement 闭包仍需继续追 `references/sc2-build-96883-casc-export/` 或实机 `[XM_DBG]` 日志。

## 官方数据摘要

| 项 | 值 |
|---|---|
| CommanderId | `ZergStetmann` |
| 中文名 | 斯台特曼 |
| 默认升级 | `StetmannCommander, StetmannIsPresent, PowerFieldMovementSpeed` |
| 默认能力命令 | `-` |
| 威望 ID | `CommanderPrestigeStetmannStetellites, CommanderPrestigeStetmannGary, CommanderPrestigeStetmannCombatBuff` |
| heroes 数量 | 0 |
| roster 数量 | 34 |
| units 数量 | 16 |
| buildings 数量 | 18 |
| command card 对象数 | 34 |
| upgrades 数量 | 13 |
| source | `mods/starcoop/commanders/egonstetmann.sc2mod/base.sc2data/gamedata/userdata.xml` |

roster 样例：

```text
DroneStetmann, HatcheryStetmann, LairStetmann, HiveStetmann, ExtractorStetmann, SpawningPoolStetmann, EvolutionChamberStetmann, BanelingNestStetmann, HydraliskDenStetmann, LurkerDenStetmann, InfestationPitStetmann, SpireStetmann, GreaterSpireStetmann, UltraliskCavernStetmann, SpineCrawlerStetmann, SpineCrawlerUprootedStetmann, SporeCrawlerStetmann, SporeCrawlerUprootedStetmann
```

## 15 级解锁摘要

- 1: 保证斯台特满意
- 2: “艾的滋润”
- 3: 盖瑞：艾星超载
- 4: 机械跳虫与机械爆虫升级包
- 5: 机械杰作
- 6: 新单位：机械潜伏者
- 7: 斯台特曼技术帝
- 8: 机械刺蛇与机械潜伏者升级包
- 9: 永远的朋友
- 10: 机械感染者升级包
- 11: 新单位：机械巢式战列空母
- 12: 机械雷兽升级包
- 13: 可爱的小坏蛋们
- 14: 机械尖塔升级包
- 15: 艾贡极限

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
| 机械孵化场 | `ResearchOverlordStetmannVentralSacks` | 研究腹舱 | `ResearchHatcheryStetmann,Research2` | - | 使机械王虫可以运输单位。 |
| 机械虫穴 | `ResearchOverlordStetmannVentralSacks` | 研究腹舱 | `ResearchHatcheryStetmann,Research2` | - | 使机械王虫可以运输单位。 |
| 机械主巢 | `ResearchOverlordStetmannVentralSacks` | 研究腹舱 | `ResearchHatcheryStetmann,Research2` | - | 使机械王虫可以运输单位。 |
| 机械尖塔 | `BroodLordStetmannBombersLearn` | 研究机械飞蝗截击机舱室 | `SpireStetmannResearch,Research9` | - | 允许机械巢式战列空母可以建造和发射{Abil,BroodLordStetmannBomberMagazine,MaxCount}架飞蝗截击机，自动攻击敌方... |
| 机械巨型尖塔 | `BroodLordStetmannBombersLearn` | 研究机械飞蝗截击机舱室 | `SpireStetmannResearch,Research9` | - | 允许机械巢式战列空母可以建造和发射{Abil,BroodLordStetmannBomberMagazine,MaxCount}架飞蝗截击机，自动攻击敌方... |
| 盖瑞 | `GaryStetmannRecall` | 半稳定物质传送 | `GaryStetmannRecall,Execute` | - | 将盖瑞和附近所有你控制的单位传送至目标艾星所在位置。 |
| 盖瑞 | `MorphToSuperGaryStetmann` | 超级盖瑞变形程序 | `MorphToSuperGaryStetmann,Execute` | - | 变形为超级盖瑞。增加E-Gorb、艾星超载、半稳定物质传送的最大使用次数。还可以使用盖瑞区域。 |
| 超级盖瑞 | `GaryStetmannRecall` | 半稳定物质传送 | `SuperGaryStetmannRecall,Execute` | - | 将盖瑞和附近所有你控制的单位传送至目标艾星所在位置。 |
| 机械巢式战列空母 | `BroodLordStetmannBombers` | 建造机械飞蝗截击机 | `BroodLordStetmannBomberMagazine,Ammo1` | - | 建造机械飞蝗截击机，自动攻击机械巢式战列空母的目标。 / 可以对地。 |

实现备注：面板只注册 profile 和转发 caster，地图不得按 commander 写 if/else。精通和威望影响面板冷却/充能/费用时，由本模块接收最终 modifier。

## 02. 英雄单位及其技能

Owner：`CommanderHeroProfile`、`CommanderHeroModeProfile`、`CommanderHeroAbilityProfile`、`CommanderHeroSkillTreeProfile`、`CommanderHeroReviveProfile`、`CommanderHeroModifierProfile`。

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| - | - | - | - | - | 官方 heroes.json 未列出英雄条目；召唤物/形态/特殊英雄需从 progression、command_cards 或 CASC 继续追 |

### 英雄/形态候选

- 暂无自动命中项，需 CASC/实机日志补充。

口径：卫星网络和伊冈能量影响单位技能、移动、治疗和资源，需要 runtime state 重置。

待审计：Hero Unit、技能按钮、复活、形态切换、武器/Actor/Sound 闭包。

## 03. 普通单位技能及其进化功能

Owner：`CommanderUnitAbilityProfile`、`CommanderUnitStatProfile`、`CommanderUnitEvolutionProfile`、`CommanderUnitBehaviorProfile`、`CommanderUnitWeaponProfile`。

### 单位技能按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 机械工蜂 | `MapObjectInteract` | MapObjectInteract | `MapObjectInteract,Execute` | - | - |
| 机械工蜂 | `MoveHoldPosition` | 原地防御 | `move,HoldPos` | - | 命令选中的单位待在原地，并攻击射程内的敌方目标。接受命令的单位不会对敌人进行追击或移向敌人与其交战。 |
| 机械工蜂 | `MovePatrol` | 巡逻 | `move,Patrol` | - | 命令选中的单位在当前位置与目标区域间进行巡逻。巡逻的单位会对敌人发起攻击或移向附近的敌人与其交战。 |
| 机械工蜂 | `AttackWorker` | AttackWorker | `attack,Execute` | - | - |
| 机械工蜂 | `GatherZerg` | 采集 | `DroneHarvest,Gather` | - | 命令工蜂从选中的矿脉或瓦斯气泉采集资源。 |
| 机械工蜂 | `ZergBuild` | 基础变异 | `255,255` | - | 基础建筑列表。 |
| 机械工蜂 | `ZergBuildAdvanced` | 高级变异 | `255,255` | - | 高级建筑列表。 |
| 机械工蜂 | `RepairStetmann` | 修理 | `Repair,Execute` | - | 消耗资源为机械单位和建筑恢复生命值。 |
| 机械工蜂 | `Spray` | 喷漆 | `SprayZerg,Execute` | - | 命令单位将你当前所选喷漆图案喷绘在目标位置的地表上。 |
| 机械工蜂 | `HatcheryStetmann` | 变形为机械孵化场 | `ZergBuildStetmann,Build1` | - | 基础建筑，能够孵化所有机械异虫单位并接收采集到的资源。可以生成“爱心区域”。可以进化为机械虫穴。 |
| 机械工蜂 | `ExtractorStetmann` | 变形为机械萃取房 | `ZergBuildStetmann,Build3` | - | 建造在瓦斯气泉上，用于采集高能瓦斯。 |
| 机械工蜂 | `SpawningPoolStetmann` | 变形为机械分裂池 | `ZergBuildStetmann,Build4` | - | 开启： / - 使机械幼虫可以变形成机械跳虫 / - 使机械工蜂可以变形成机械脊针爬虫 / - 使机械工蜂可以变形成机械孢子爬虫 |
| 机械工蜂 | `EvolutionChamberStetmann` | 变形为机械进化腔 | `ZergBuildStetmann,Build5` | - | 为机械异虫地面单位提供升级方案。 |
| 机械工蜂 | `BanelingNestStetmann` | 变形为机械爆虫巢穴 | `ZergBuildStetmann,Build11` | - | 为机械爆虫提供升级方案。 / 开启： / - 使机械跳虫可以变形为机械爆虫 |
| 机械工蜂 | `SpineCrawlerStetmann` | 变形为机械脊针爬虫 | `ZergBuildStetmann,Build15` | - | 对地防御建筑。 / 可以对地。 |
| 机械工蜂 | `SporeCrawlerStetmann` | 变形为机械孢子爬虫 | `ZergBuildStetmann,Build16` | - | 防空建筑。 / 可以对空。 / 侦测单位 |
| 机械工蜂 | `HydraliskDenStetmann` | 变形为机械刺蛇巢 | `ZergBuildStetmann,Build6` | - | 可以变形成机械潜伏者巢穴。开启： / - 使机械幼虫可以变形成机械刺蛇 |
| 机械工蜂 | `InfestationPitStetmann` | 变形为机械感染深渊 | `ZergBuildStetmann,Build9` | - | 开启： / - 使机械幼虫可以变形为机械感染者 |
| 机械工蜂 | `SpireStetmann` | 变形为机械尖塔 | `ZergBuildStetmann,Build7` | - | 为机械异虫空中单位提供升级方案。可以变形成机械巨型尖塔。 / 开启： / - 使机械幼虫可以变形成机械腐化者 |
| 机械工蜂 | `UltraliskCavernStetmann` | 变形为机械雷兽窟 | `ZergBuildStetmann,Build8` | - | 开启： / - 使机械幼虫可以变形成机械雷兽 |
| 盖瑞 | `MoveChampions` | MoveChampions | `move,Move` | - | - |
| 盖瑞 | `MoveHoldPosition` | 原地防御 | `move,HoldPos` | - | 命令选中的单位待在原地，并攻击射程内的敌方目标。接受命令的单位不会对敌人进行追击或移向敌人与其交战。 |
| 盖瑞 | `MovePatrol` | 巡逻 | `move,Patrol` | - | 命令选中的单位在当前位置与目标区域间进行巡逻。巡逻的单位会对敌人发起攻击或移向附近的敌人与其交战。 |
| 盖瑞 | `AttackChampions` | AttackChampions | `attack,Execute` | - | - |
| 盖瑞 | `GaryStetmannMechanicalReconstruction` | 残骸回收器 | `-` | - | 斯台特曼的机械异虫被摧毁时会在该单位旁边掉落机械残骸。收集机械残骸后可以在相应的科技建筑处重构被摧毁的机械异虫单位。 |
| 盖瑞 | `GaryStetmannOrb` | E-Gorb | `GaryStetmannOrb,Execute` | - | 释放一颗移动电球，每秒对沿途的敌人造成{Effect,GaryStetmannOrbDamage,Amount/Behavior,GaryStetmann... |
| 盖瑞 | `PowerTowerOverchargeStetmannEnergy` | 艾星超载 | `GaryStetmannPowerTowerOverchargeEnergy,Execute` | - | 超载目标艾星，使其主动为附近的单位提供加成效果，该效果受当前“爱心区域”设定影响。超载效果持续{Behavior,PowerTowerOvercharge... |
| 盖瑞 | `GaryStetmannRecall` | 半稳定物质传送 | `GaryStetmannRecall,Execute` | - | 将盖瑞和附近所有你控制的单位传送至目标艾星所在位置。 |
| 盖瑞 | `MorphToSuperGaryStetmann` | 超级盖瑞变形程序 | `MorphToSuperGaryStetmann,Execute` | - | 变形为超级盖瑞。增加E-Gorb、艾星超载、半稳定物质传送的最大使用次数。还可以使用盖瑞区域。 |
| 盖瑞 | `CancelSuperGaryStetmannMorph` | 取消 | `MorphToSuperGaryStetmann,Cancel` | - | 取消升级指令，将单位恢复到原来的状态。 |
| 超级盖瑞 | `MoveChampions` | MoveChampions | `move,Move` | - | - |
| 超级盖瑞 | `MoveHoldPosition` | 原地防御 | `move,HoldPos` | - | 命令选中的单位待在原地，并攻击射程内的敌方目标。接受命令的单位不会对敌人进行追击或移向敌人与其交战。 |
| 超级盖瑞 | `MovePatrol` | 巡逻 | `move,Patrol` | - | 命令选中的单位在当前位置与目标区域间进行巡逻。巡逻的单位会对敌人发起攻击或移向附近的敌人与其交战。 |
| 超级盖瑞 | `AttackChampions` | AttackChampions | `attack,Execute` | - | - |
| 超级盖瑞 | `GaryStetmannMechanicalReconstruction` | 残骸回收器 | `-` | - | 斯台特曼的机械异虫被摧毁时会在该单位旁边掉落机械残骸。收集机械残骸后可以在相应的科技建筑处重构被摧毁的机械异虫单位。 |
| 超级盖瑞 | `GaryStetmannTheBestOil` | 最好的机油 | `-` | - | 当超级盖瑞吸收一份机械残骸时，他会获得{Behavior,SuperGaryStetmannTheBestOilAttribute,Modificatio... |
| 超级盖瑞 | `Detector` | 侦测单位 | `-` | - | 该单位能够侦测到隐形、潜地和幻像单位。 |
| 超级盖瑞 | `GaryStetmannOrb` | E-Gorb | `SuperGaryStetmannOrb,Execute` | - | 释放一颗移动电球，每秒对沿途的敌人造成{Effect,GaryStetmannOrbDamage,Amount/Behavior,GaryStetmann... |
| 超级盖瑞 | `PowerTowerOverchargeStetmannEnergy` | 艾星超载 | `SuperGaryStetmannPowerTowerOverchargeEnergy,Execute` | - | 超载目标艾星，使其主动为附近的单位提供加成效果，该效果受当前“爱心区域”设定影响。超载效果持续{Behavior,PowerTowerOvercharge... |
| 超级盖瑞 | `GaryStetmannRecall` | 半稳定物质传送 | `SuperGaryStetmannRecall,Execute` | - | 将盖瑞和附近所有你控制的单位传送至目标艾星所在位置。 |
| 超级盖瑞 | `PowerFieldSuperGaryStetmannEnergy` | 盖瑞区域 | `PowerFieldSuperGaryStetmannEnergy,Execute` | - | 在超级盖瑞周围生成一片“爱心区域”，持续{Effect,PowerFieldSuperGaryStetmannCP,PeriodicPeriodArray... |
| 机械跳虫 | `MoveHoldPosition` | 原地防御 | `move,HoldPos` | - | 命令选中的单位待在原地，并攻击射程内的敌方目标。接受命令的单位不会对敌人进行追击或移向敌人与其交战。 |
| 机械跳虫 | `MovePatrol` | 巡逻 | `move,Patrol` | - | 命令选中的单位在当前位置与目标区域间进行巡逻。巡逻的单位会对敌人发起攻击或移向附近的敌人与其交战。 |
| 机械跳虫 | `ZerglingStetmannMovementSpeedPassive` | 金属机能加速 | `-` | HaveZerglingStetmannMovementSpeed | 移动速度提高{$UpgradeEffectArrayValue:ZerglingStetmannMovementSpeed:Unit,ZerglingSt... |
| 机械跳虫 | `ZerglingStetmannHardenedShield` | 艾能刚毅护盾 | `-` | HaveZerglingStetmannHardenedShield | 受到的伤害减少至最多{Behavior,ZerglingHardenedShieldStetmann,DamageResponse.ClampMaximu... |
| 机械跳虫 | `ZerglingStetmannAttackSpeedPassive` | 合成肾上腺泵 | `-` | HaveZerglingStetmannAttackSpeed | 攻击速度提高{(Behavior,ZerglingAttackSpeedStetmann,Modification.AttackSpeedMultipli... |
| 机械跳虫 | `ZerglingStetmannScrapDrop` | 可回收物 | `-` | - | 如果该单位在激活的艾星、盖瑞或超级盖瑞附近被摧毁时，它将掉落1份机械跳虫残骸。 |
| 机械跳虫 | `BanelingStetmann` | 变形为机械爆虫 | `MorphToBanelingStetmann,Execute` | - | 自毁型单位。爆炸时能够造成小范围的伤害。 / 可以对地。 |
| 机械爆虫 | `MoveHoldPosition` | 原地防御 | `move,HoldPos` | - | 命令选中的单位待在原地，并攻击射程内的敌方目标。接受命令的单位不会对敌人进行追击或移向敌人与其交战。 |
| 机械爆虫 | `MovePatrol` | 巡逻 | `move,Patrol` | - | 命令选中的单位在当前位置与目标区域间进行巡逻。巡逻的单位会对敌人发起攻击或移向附近的敌人与其交战。 |
| 机械爆虫 | `BanelingStetmannManaShield` | 艾能轰击屏障 | `-` | - | 允许该单位在承受伤害需要扣除生命值时可以先扣除其能量池数值。每点艾能可吸收{Behavior,BanelingStetmannManaShield,Mod... |
| 机械爆虫 | `BanelingStetmannExtraDamage` | 艾能强化炸药 | `-` | HaveBanelingStetmannExtraDamage | 该单位爆炸时，它当前的艾能值将算入其造成的伤害。 |
| 机械爆虫 | `BanelingStetmannScrapDrop` | 可回收物 | `-` | - | 如果该单位在激活的艾星、盖瑞或超级盖瑞附近被摧毁时，它将掉落2份机械跳虫残骸。 |
| 机械爆虫 | `ExplodeStetmann` | 爆炸 | `BanelingStetmannExplode,Execute` | - | 使机械爆虫在原地自爆，对附近的敌方单位和建筑造成伤害。 |
| 机械爆虫 | `DisableBuildingAttack` | 关闭对建筑攻击 | `VolatileBurstBuilding,Off` | - | 阻止爆虫自动将建筑视为攻击目标。爆虫仍会接受明确的攻击建筑指令。 / 爆虫可对建筑造成{Effect,VolatileBurstU2,Amount}点伤害值。 |
| 机械爆虫 | `BanelingStetmannMovementSpeed` | 离心火箭伺服器 | `BanelingStetmannJump,Execute` | - | 该单位的移动速度提高{$UpgradeEffectArrayValue:BanelingStetmannMovementSpeed:Unit,Baneli... |
| 机械蟑螂 | `MoveHoldPosition` | 原地防御 | `move,HoldPos` | - | 命令选中的单位待在原地，并攻击射程内的敌方目标。接受命令的单位不会对敌人进行追击或移向敌人与其交战。 |
| 机械蟑螂 | `MovePatrol` | 巡逻 | `move,Patrol` | - | 命令选中的单位在当前位置与目标区域间进行巡逻。巡逻的单位会对敌人发起攻击或移向附近的敌人与其交战。 |
| 机械蟑螂 | `RoachStetmannRapidRegeneration` | 极速再生 | `-` | - | 机械蟑螂在潜地时能够以极快的速度恢复生命值。 |
| 机械蟑螂 | `RavagerStetmann` | RavagerStetmann | `MorphToRavagerStetmann,Execute` | - | - |
| ... | ... | ... | ... | ... | 还有 63 项，后续从 command_cards.json 继续展开 |

### 进化/形态/切换候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 机械工蜂 | `HatcheryStetmann` | 变形为机械孵化场 | `ZergBuildStetmann,Build1` | - | 基础建筑，能够孵化所有机械异虫单位并接收采集到的资源。可以生成“爱心区域”。可以进化为机械虫穴。 |
| 机械工蜂 | `ExtractorStetmann` | 变形为机械萃取房 | `ZergBuildStetmann,Build3` | - | 建造在瓦斯气泉上，用于采集高能瓦斯。 |
| 机械工蜂 | `SpawningPoolStetmann` | 变形为机械分裂池 | `ZergBuildStetmann,Build4` | - | 开启： / - 使机械幼虫可以变形成机械跳虫 / - 使机械工蜂可以变形成机械脊针爬虫 / - 使机械工蜂可以变形成机械孢子爬虫 |
| 机械工蜂 | `EvolutionChamberStetmann` | 变形为机械进化腔 | `ZergBuildStetmann,Build5` | - | 为机械异虫地面单位提供升级方案。 |
| 机械工蜂 | `BanelingNestStetmann` | 变形为机械爆虫巢穴 | `ZergBuildStetmann,Build11` | - | 为机械爆虫提供升级方案。 / 开启： / - 使机械跳虫可以变形为机械爆虫 |
| 机械工蜂 | `SpineCrawlerStetmann` | 变形为机械脊针爬虫 | `ZergBuildStetmann,Build15` | - | 对地防御建筑。 / 可以对地。 |
| 机械工蜂 | `SporeCrawlerStetmann` | 变形为机械孢子爬虫 | `ZergBuildStetmann,Build16` | - | 防空建筑。 / 可以对空。 / 侦测单位 |
| 机械工蜂 | `HydraliskDenStetmann` | 变形为机械刺蛇巢 | `ZergBuildStetmann,Build6` | - | 可以变形成机械潜伏者巢穴。开启： / - 使机械幼虫可以变形成机械刺蛇 |
| 机械工蜂 | `InfestationPitStetmann` | 变形为机械感染深渊 | `ZergBuildStetmann,Build9` | - | 开启： / - 使机械幼虫可以变形为机械感染者 |
| 机械工蜂 | `SpireStetmann` | 变形为机械尖塔 | `ZergBuildStetmann,Build7` | - | 为机械异虫空中单位提供升级方案。可以变形成机械巨型尖塔。 / 开启： / - 使机械幼虫可以变形成机械腐化者 |
| 机械工蜂 | `UltraliskCavernStetmann` | 变形为机械雷兽窟 | `ZergBuildStetmann,Build8` | - | 开启： / - 使机械幼虫可以变形成机械雷兽 |
| 机械孵化场 | `LarvaStetmann` | 选择机械幼虫 | `-` | - | 变形成机械异虫单位。 |
| 机械孵化场 | `RallyEggStetmann` | 设定工蜂集结点 | `RallyHatcheryStetmann,Rally3` | - | 将变形产生的工作单位和机械王虫派往指定地点。派往矿脉和机械萃取房的工作单位会自动开始采集。 |
| 机械孵化场 | `LairStetmann` | 变形为机械虫穴 | `UpgradeToLairStetmann,Execute` | - | 机械孵化场的更高级形态，为机械异虫提供更多的升级方案和建筑方案。可孵化所有机械异虫单位和接收采集到的资源。 |
| 机械虫穴 | `LarvaStetmann` | 选择机械幼虫 | `-` | - | 变形成机械异虫单位。 |
| 机械虫穴 | `RallyEggStetmann` | 设定工蜂集结点 | `RallyHatcheryStetmann,Rally3` | - | 将变形产生的工作单位和机械王虫派往指定地点。派往矿脉和机械萃取房的工作单位会自动开始采集。 |
| 机械虫穴 | `HiveStetmann` | 变形为机械主巢 | `UpgradeToHiveStetmann,Execute` | - | 机械孵化场的更高级形态，为机械异虫提供更多的升级方案和建筑方案。可孵化所有机械异虫单位和接收采集到的资源。 |
| 机械虫穴 | `CancelMutateMorph` | 取消 | `UpgradeToHiveStetmann,Cancel` | - | 取消变异命令，建筑返还至原生形态。 |
| 机械主巢 | `LarvaStetmann` | 选择机械幼虫 | `-` | - | 变形成机械异虫单位。 |
| 机械主巢 | `RallyEggStetmann` | 设定工蜂集结点 | `RallyHatcheryStetmann,Rally3` | - | 将变形产生的工作单位和机械王虫派往指定地点。派往矿脉和机械萃取房的工作单位会自动开始采集。 |
| 机械分裂池 | `ZerglingStetmannPassive` | 机械跳虫 | `-` | - | 机械分裂池使你可以变形机械跳虫。 |
| 机械爆虫巢穴 | `BanelingStetmannPassive` | 机械爆虫 | `-` | - | 机械爆虫巢穴使你可以将机械跳虫变形成机械爆虫。 |
| 机械刺蛇巢 | `HydraliskStetmannPassive` | 机械刺蛇 | `-` | - | 机械刺蛇巢使你可以变形机械刺蛇。 |
| 机械刺蛇巢 | `LurkerDenStetmann` | 变形为机械潜伏者巢穴 | `UpgradeToLurkerDenStetmann,Execute` | - | 开启： / - 使机械刺蛇可以变形成机械潜伏者 |
| 机械潜伏者巢穴 | `HydraliskStetmannPassive` | 机械刺蛇 | `-` | - | 机械刺蛇巢使你可以变形机械刺蛇。 |
| 机械潜伏者巢穴 | `LurkerStetmannPassive` | 机械潜伏者 | `-` | - | 机械潜伏者巢穴使你可以将机械刺蛇变形成机械潜伏者。 |
| 机械感染深渊 | `InfestorStetmannBonusRavager` | 研究“赠品”破坏者！ | `InfestationPitStetmannResearch2,Research1` | - | 允许机械感染者的“蟑螂出击！”和解构型蟑螂机器人可以额外孵化一只机械破坏者。 |
| 机械感染深渊 | `InfestorStetmannPassive` | 机械感染者 | `-` | - | 机械感染深渊使你可以变形机械感染者。 |
| 机械尖塔 | `CorruptorStetmannPassive` | 机械腐化者 | `-` | - | 机械尖塔使你可以变形机械腐化者。 |
| 机械尖塔 | `GreaterSpireStetmann` | 变形为机械巨型尖塔 | `UpgradeToGreaterSpireStetmann,Execute` | - | 为机械异虫空中单位提供升级方案。 / 开启： / - 使机械腐化者可以变形成机械巢式战列空母 |
| ... | ... | ... | ... | ... | 还有 22 项，后续从 command_cards.json 继续展开 |

实现备注：单位自己声明技能、形态和升级接入口；科技建筑只展示符合条件的研究项，不直接拥有单位升级逻辑。

## 04. 初始化基地与特殊建筑

Owner：`CommanderRuntimeProfile`、`CommanderScenarioLoadout`、`CommanderSpecialStructureProfile`、`CommanderInitialCasterProfile`。

### 初始化建筑候选

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 机械孵化场 | `HatcheryStetmann` | `HatcheryStetmann` | Ground; Armored/Mechanical/Structure | 矿:350 气:- 人口字段:6 生命:1500 | 基础建筑，能够孵化所有机械异虫单位并接收采集到的资源。可以生成“爱心区域”。可以进化为机械虫穴。 |
| 机械虫穴 | `LairStetmann` | `LairStetmann` | Ground; Armored/Mechanical/Structure | 矿:500 气:100 人口字段:6 生命:2000 | 机械孵化场的更高级形态，为机械异虫提供更多的升级方案和建筑方案。可孵化所有机械异虫单位和接收采集到的资源。 |
| 机械主巢 | `HiveStetmann` | `HiveStetmann` | Ground; Armored/Mechanical/Structure | 矿:700 气:250 人口字段:6 生命:2500 | 机械孵化场的更高级形态，为机械异虫提供更多的升级方案和建筑方案。可孵化所有机械异虫单位和接收采集到的资源。 |
| 机械萃取房 | `ExtractorStetmann` | `ExtractorStetmann` | Ground; Armored/Mechanical/Structure | 矿:75 气:- 人口字段:- 生命:500 | 建造在瓦斯气泉上，用于采集高能瓦斯。 |

### 特殊建筑候选

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 机械感染深渊 | `InfestationPitStetmann` | `InfestationPitStetmann` | Ground; Armored/Mechanical/Structure | 矿:150 气:100 人口字段:- 生命:850 | 开启： / - 使机械幼虫可以变形为机械感染者 |

实现备注：测试台切换指挥官时调用本指挥官 initializer，负责替换主基地、工人、运输机/投放单位、隐藏 caster 和特殊建筑。

## 05. 指挥官兵种

Owner：`CommanderRosterProfile`、`CommanderUnitProfile`、`CommanderUnitTrainProfile`、`CommanderUnitStageProfile`、`CommanderUnitRequirementProfile`。

来源：官方提取 `units.json`。这里列的是当前已提取 Catalog 对象；满级替换、威望正向融合或进化变体仍以 `power_fusion` 审计结果为准。

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 机械工蜂 | `DroneStetmann` | `DroneStetmann` | Ground; Light/Mechanical | 矿:50 气:- 人口字段:-1 生命:40 | 基础工作单位。用于采集晶体矿和高能瓦斯。可以变形为建筑。 / 可以对地。 |
| 盖瑞 | `GaryStetmann` | `GaryStetmann` | Air; Armored/Heroic/Mechanical | 矿:- 气:- 人口字段:- 生命:500 | 斯台特曼最好的朋友！可以使用E-Gorb、艾星超载、半稳定物质传送和超级盖瑞变形程序。 / 可以对空和对地。 |
| 超级盖瑞 | `SuperGaryStetmann` | `SuperGaryStetmann` | Air; Armored/Heroic/Mechanical | 矿:- 气:- 人口字段:- 生命:1000 | 斯台特曼最好的朋友！可以使用E-Gorb、艾星超载、半稳定物质传送和盖瑞区域。 / 可以对空和对地。 |
| 机械跳虫 | `ZerglingStetmann` | `ZerglingStetmann` | Ground; Light/Mechanical | 矿:25 气:- 人口字段:-0.5 生命:35 | 迅捷的肉搏型生物。可以变形为机械爆虫。 / 可以对地。 |
| 机械爆虫 | `BanelingStetmann` | `BanelingStetmann` | Ground; Mechanical | 矿:50 气:15 人口字段:-0.5 生命:30 | 自毁型单位。爆炸时能够造成小范围的伤害。 / 可以对地。 |
| 机械蟑螂 | `RoachStetmann` | `RoachStetmann` | Ground; Armored/Mechanical | 矿:- 气:- 人口字段:- 生命:75 | 突击单位。潜地时能快速恢复生命值。 / 可以对地。 |
| 机械破坏者 | `RavagerStetmann` | `RavagerStetmann` | Ground; Mechanical | 矿:- 气:- 人口字段:- 生命:80 | 远程火炮单位。可以使用“环境危害性喷发”。 / 可以对地。 |
| 机械刺蛇 | `HydraliskStetmann` | `HydraliskStetmann` | Ground; Light/Mechanical | 矿:100 气:50 人口字段:-2 生命:80 | 远程攻击单位。 / 可以对地和对空。 |
| 机械潜伏者 | `LurkerStetmann` | `LurkerStetmann` | Ground; Armored/Mechanical | 矿:150 气:150 人口字段:-3 生命:200 | 反地面伏击单位。拥有脊刺攻击能力，可对火力线上的所有敌方单位造成伤害。可以使用恐怖钻击算法和集火强击算法。 / 可以对地。 / 必须潜地后才能发动攻击。 |
| 机械潜伏者 | `LurkerStetmannBurrowed` | `LurkerStetmannBurrowed` | Ground; Armored/Mechanical | 矿:150 气:150 人口字段:-3 生命:200 | 反地面伏击单位。拥有脊刺攻击能力，可对火力线上的所有敌方单位造成伤害。可以使用恐怖钻击算法和集火强击算法。 / 可以对地。 / 必须潜地后才能发动攻击。 |
| 机械感染者 | `InfestorStetmann` | `InfestorStetmann` | Ground; Armored/Mechanical/Psionic | 矿:100 气:150 人口字段:-2 生命:90 | 善于感染的虫类。可以使用“蟑螂出击！”、解构型蟑螂机器人以及UMI-C充能协议技能。 |
| 机械雷兽 | `UltraliskStetmann` | `UltraliskStetmann` | Ground; Armored/Massive/Mechanical | 矿:300 气:200 人口字段:-6 生命:500 | 重型攻击猛兽，可造成范围伤害。可以使用定向潜地冲锋和机甲揩油模组。 / 可以对地。 |
| 机械腐化者 | `CorruptorStetmann` | `CorruptorStetmann` | Air; Armored/Mechanical | 矿:150 气:100 人口字段:-2 生命:200 | 对空飞行单位。可以使用集束咆哮弹和泰伦超洁降解液。 / 可以对空。 |
| 机械巢式战列空母 | `BroodLordStetmann` | `BroodLordStetmann` | Air; Armored/Massive/Mechanical | 矿:450 气:350 人口字段:-8 生命:550 | 大型飞行作战单位。朝目标射出机械巢虫进行攻击。建造并发射机械飞蝗截击机来攻击敌方地面目标。可以使用斯台特曼炮。 / 可以对地。 |
| 机械眼虫 | `OverseerStetmann` | `OverseerStetmann` | Air; Armored/Mechanical | 矿:150 气:50 人口字段:8 生命:200 | 高级空中侦察单位。 能够维持机械王虫形态时所控制的单位上限。可以使用超距视界。 / 侦测单位 |
| 机械眼虫 | `OverseerStetmannSiegeMode` | `OverseerStetmannSiegeMode` | Air; Armored/Mechanical | 矿:150 气:50 人口字段:8 生命:200 | - |

三阶段口径：`initial` 只做审计，`level15` 表示满级解锁，`power_fusion` 表示 15 级 + 六精通全满 + 威望正向收益后的默认运行清单。

## 06. 指挥官精通

Owner：`CommanderMasteryProfile`、`CommanderMasteryEffectProfile`、`CommanderMasteryModifierProfile`。

| 组 | 名称 | Upgrade | 每点 | 30点口径 |
|---|---|---|---|---|
| 1 | 升级资源费用 | `MasteryStetmannUpgradeResearchCost` | 2 | -60% |
| 1 | 盖瑞技能冷却时间 | `MasteryStetmannGaryAbilityCooldown` | 1 | -30% |
| 2 | “爱心区域”加成效果 | `MasteryStetmannStetzoneBonuses` | 2 | +60% |
| 2 | 艾能池上限 | `MasteryStetmannMaximumEgonergyPool` | 2 | +60% |
| 3 | 部署艾星冷却时间 | `MasteryStetmannDeployStetelliteCooldown` | 0.167 | -5.010000000000001秒 |
| 3 | 建筑变形速度 | `MasteryStetmannStructureMorphRate` | 2 | -60% |

实现备注：当前默认六项全部 30 点。表里的 30 点口径由 `point_increments * 30` 推导，最终数值仍需以 Upgrade Effect 闭包验证。

## 07. 指挥官建筑

Owner：`CommanderBuildingProfile`、`CommanderBuildingAbilityProfile`、`CommanderBuildingTrainProfile`、`CommanderBuildingStageProfile`、`CommanderBuildingBehaviorProfile`。

来源：官方提取 `buildings.json`。

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 机械孵化场 | `HatcheryStetmann` | `HatcheryStetmann` | Ground; Armored/Mechanical/Structure | 矿:350 气:- 人口字段:6 生命:1500 | 基础建筑，能够孵化所有机械异虫单位并接收采集到的资源。可以生成“爱心区域”。可以进化为机械虫穴。 |
| 机械虫穴 | `LairStetmann` | `LairStetmann` | Ground; Armored/Mechanical/Structure | 矿:500 气:100 人口字段:6 生命:2000 | 机械孵化场的更高级形态，为机械异虫提供更多的升级方案和建筑方案。可孵化所有机械异虫单位和接收采集到的资源。 |
| 机械主巢 | `HiveStetmann` | `HiveStetmann` | Ground; Armored/Mechanical/Structure | 矿:700 气:250 人口字段:6 生命:2500 | 机械孵化场的更高级形态，为机械异虫提供更多的升级方案和建筑方案。可孵化所有机械异虫单位和接收采集到的资源。 |
| 机械萃取房 | `ExtractorStetmann` | `ExtractorStetmann` | Ground; Armored/Mechanical/Structure | 矿:75 气:- 人口字段:- 生命:500 | 建造在瓦斯气泉上，用于采集高能瓦斯。 |
| 机械分裂池 | `SpawningPoolStetmann` | `SpawningPoolStetmann` | Ground; Armored/Mechanical/Structure | 矿:250 气:- 人口字段:- 生命:1000 | 开启： / - 使机械幼虫可以变形成机械跳虫 / - 使机械工蜂可以变形成机械脊针爬虫 / - 使机械工蜂可以变形成机械孢子爬虫 |
| 机械进化腔 | `EvolutionChamberStetmann` | `EvolutionChamberStetmann` | Ground; Armored/Mechanical/Structure | 矿:125 气:- 人口字段:- 生命:750 | 为机械异虫地面单位提供升级方案。 |
| 机械爆虫巢穴 | `BanelingNestStetmann` | `BanelingNestStetmann` | Ground; Armored/Mechanical/Structure | 矿:150 气:50 人口字段:- 生命:850 | 为机械爆虫提供升级方案。 / 开启： / - 使机械跳虫可以变形为机械爆虫 |
| 机械刺蛇巢 | `HydraliskDenStetmann` | `HydraliskDenStetmann` | Ground; Armored/Mechanical/Structure | 矿:150 气:100 人口字段:- 生命:850 | - |
| 机械潜伏者巢穴 | `LurkerDenStetmann` | `LurkerDenStetmann` | Ground; Armored/Mechanical/Structure | 矿:250 气:150 人口字段:- 生命:850 | 开启： / - 使机械刺蛇可以变形成机械潜伏者 |
| 机械感染深渊 | `InfestationPitStetmann` | `InfestationPitStetmann` | Ground; Armored/Mechanical/Structure | 矿:150 气:100 人口字段:- 生命:850 | 开启： / - 使机械幼虫可以变形为机械感染者 |
| 机械尖塔 | `SpireStetmann` | `SpireStetmann` | Ground; Armored/Mechanical/Structure | 矿:250 气:200 人口字段:- 生命:850 | 为机械异虫空中单位提供升级方案。可以变形成机械巨型尖塔。 / 开启： / - 使机械幼虫可以变形成机械腐化者 |
| 机械巨型尖塔 | `GreaterSpireStetmann` | `GreaterSpireStetmann` | Ground; Armored/Mechanical/Structure | 矿:350 气:350 人口字段:- 生命:1000 | 为机械异虫空中单位提供升级方案。 / 开启： / - 使机械腐化者可以变形成机械巢式战列空母 |
| 机械雷兽窟 | `UltraliskCavernStetmann` | `UltraliskCavernStetmann` | Ground; Armored/Mechanical/Structure | 矿:200 气:200 人口字段:- 生命:850 | 开启： / - 使机械幼虫可以变形成机械雷兽 |
| 机械脊针爬虫 | `SpineCrawlerStetmann` | `SpineCrawlerStetmann` | Ground; Armored/Mechanical/Structure | 矿:150 气:- 人口字段:- 生命:300 | 对地防御建筑。 / 可以对地。 |
| 机械脊针爬虫 | `SpineCrawlerUprootedStetmann` | `SpineCrawlerUprootedStetmann` | Ground; Armored/Mechanical/Structure | 矿:150 气:- 人口字段:- 生命:300 | 站起的对地防御建筑。站起后能够移动，但无法攻击。 |
| 机械孢子爬虫 | `SporeCrawlerStetmann` | `SporeCrawlerStetmann` | Ground; Armored/Mechanical/Structure | 矿:125 气:- 人口字段:- 生命:400 | 防空建筑。 / 可以对空。 / 侦测单位 |
| 机械孢子爬虫 | `SporeCrawlerUprootedStetmann` | `SporeCrawlerUprootedStetmann` | Ground; Armored/Mechanical/Structure | 矿:125 气:- 人口字段:- 生命:400 | 站起的防空建筑。站起后能够移动，但无法攻击。 |
| 艾星 | `PowerTowerStetmann` | `PowerTowerStetmann` | Air; Armored/Mechanical/Structure/User1 | 矿:- 气:- 人口字段:- 生命:5 | 提供可以增强附近友方单位属性的“爱心区域”。可以在超载后主动进一步增强附近的单位。 |

### 建筑按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 机械孵化场 | `LarvaStetmann` | 选择机械幼虫 | `-` | - | 变形成机械异虫单位。 |
| 机械孵化场 | `ResearchOverlordStetmannSpeed` | 研究充气机身 | `ResearchHatcheryStetmann,Research1` | - | 提高机械王虫和机械眼虫的移动速度。 |
| 机械孵化场 | `ResearchOverlordStetmannVentralSacks` | 研究腹舱 | `ResearchHatcheryStetmann,Research2` | - | 使机械王虫可以运输单位。 |
| 机械孵化场 | `RallyEggStetmann` | 设定工蜂集结点 | `RallyHatcheryStetmann,Rally3` | - | 将变形产生的工作单位和机械王虫派往指定地点。派往矿脉和机械萃取房的工作单位会自动开始采集。 |
| 机械孵化场 | `SetRallyPoint2` | 设定集结点 | `RallyHatcheryStetmann,Rally1` | - | 将生成的单位派往指定地点。 |
| 机械孵化场 | `LairStetmann` | 变形为机械虫穴 | `UpgradeToLairStetmann,Execute` | - | 机械孵化场的更高级形态，为机械异虫提供更多的升级方案和建筑方案。可孵化所有机械异虫单位和接收采集到的资源。 |
| 机械孵化场 | `StetmannFieldGeneratorEnergy` | “爱心区域”生成器 | `-` | HavePowerFieldEnergyRegenerationUpgrade | 该单位生成的“爱心区域”可以增强附近友方单位的属性。 |
| 机械孵化场 | `StetmannSatelliteBonusLevel1` | 艾星生产等级1 | `-` | - | 使艾星部署维持在基础水平。 |
| 机械孵化场 | `RallyBlock` | RallyBlock | `RallyBlock,Execute` | - | - |
| 机械孵化场 | `CancelBuilding` | 取消 | `BuildInProgress,Cancel` | - | 取消建造，摧毁尚未建造完成的建筑并返还部分资源。 |
| 机械虫穴 | `LarvaStetmann` | 选择机械幼虫 | `-` | - | 变形成机械异虫单位。 |
| 机械虫穴 | `ResearchOverlordStetmannSpeed` | 研究充气机身 | `ResearchHatcheryStetmann,Research1` | - | 提高机械王虫和机械眼虫的移动速度。 |
| 机械虫穴 | `ResearchOverlordStetmannVentralSacks` | 研究腹舱 | `ResearchHatcheryStetmann,Research2` | - | 使机械王虫可以运输单位。 |
| 机械虫穴 | `RallyEggStetmann` | 设定工蜂集结点 | `RallyHatcheryStetmann,Rally3` | - | 将变形产生的工作单位和机械王虫派往指定地点。派往矿脉和机械萃取房的工作单位会自动开始采集。 |
| 机械虫穴 | `SetRallyPoint2` | 设定集结点 | `RallyHatcheryStetmann,Rally1` | - | 将生成的单位派往指定地点。 |
| 机械虫穴 | `HiveStetmann` | 变形为机械主巢 | `UpgradeToHiveStetmann,Execute` | - | 机械孵化场的更高级形态，为机械异虫提供更多的升级方案和建筑方案。可孵化所有机械异虫单位和接收采集到的资源。 |
| 机械虫穴 | `StetmannFieldGeneratorEnergy` | “爱心区域”生成器 | `-` | HavePowerFieldEnergyRegenerationUpgrade | 该单位生成的“爱心区域”可以增强附近友方单位的属性。 |
| 机械虫穴 | `StetmannSatelliteBonusLevel2` | 艾星生产等级2 | `-` | - | 使艾星部署维持在中等水平，降低其冷却时间并增加其最大使用次数。 |
| 机械虫穴 | `RallyBlock` | RallyBlock | `RallyBlock,Execute` | - | - |
| 机械虫穴 | `CancelMutateMorph` | 取消 | `UpgradeToHiveStetmann,Cancel` | - | 取消变异命令，建筑返还至原生形态。 |
| 机械主巢 | `LarvaStetmann` | 选择机械幼虫 | `-` | - | 变形成机械异虫单位。 |
| 机械主巢 | `ResearchOverlordStetmannSpeed` | 研究充气机身 | `ResearchHatcheryStetmann,Research1` | - | 提高机械王虫和机械眼虫的移动速度。 |
| 机械主巢 | `ResearchOverlordStetmannVentralSacks` | 研究腹舱 | `ResearchHatcheryStetmann,Research2` | - | 使机械王虫可以运输单位。 |
| 机械主巢 | `RallyEggStetmann` | 设定工蜂集结点 | `RallyHatcheryStetmann,Rally3` | - | 将变形产生的工作单位和机械王虫派往指定地点。派往矿脉和机械萃取房的工作单位会自动开始采集。 |
| 机械主巢 | `SetRallyPoint2` | 设定集结点 | `RallyHatcheryStetmann,Rally1` | - | 将生成的单位派往指定地点。 |
| 机械主巢 | `StetmannFieldGeneratorEnergy` | “爱心区域”生成器 | `-` | HavePowerFieldEnergyRegenerationUpgrade | 该单位生成的“爱心区域”可以增强附近友方单位的属性。 |
| 机械主巢 | `StetmannSatelliteBonusLevel3` | 艾星生产等级3 | `-` | - | 使艾星部署维持在最高水平，进一步降低其冷却时间并进一步增加其最大使用次数。 |
| 机械主巢 | `RallyBlock` | RallyBlock | `RallyBlock,Execute` | - | - |
| 机械萃取房 | `K5GasBonuses` | K5GasBonuses | `-` | HaveK5GasBonuses | - |
| 机械萃取房 | `CancelBuilding` | 取消 | `BuildInProgress,Cancel` | - | 取消建造，摧毁尚未建造完成的建筑并返还部分资源。 |
| 机械分裂池 | `ResearchZerglingStetmannMovementSpeed` | 研究金属机能加速 | `SpawningPoolStetmannResearch,Research1` | - | 机械跳虫的移动速度提高{$UpgradeEffectArrayValue:ZerglingStetmannMovementSpeed:Unit,Zergl... |
| 机械分裂池 | `ResearchZerglingStetmannHardenedShield` | 研究艾能刚毅护盾 | `SpawningPoolStetmannResearch,Research2` | - | 允许机械跳虫受到的伤害减少至最多{Behavior,ZerglingHardenedShieldStetmann,DamageResponse.Clamp... |
| 机械分裂池 | `ResearchZerglingStetmannAttackSpeed` | 研究合成肾上腺泵 | `SpawningPoolStetmannResearch,Research3` | - | 机械跳虫的攻击速度提高{(Behavior,ZerglingAttackSpeedStetmann,Modification.AttackSpeedMul... |
| 机械分裂池 | `ZerglingStetmannPassive` | 机械跳虫 | `-` | - | 机械分裂池使你可以变形机械跳虫。 |
| 机械分裂池 | `SporeCrawlerStetmannPassive` | 机械孢子爬虫 | `-` | - | 建造机械分裂池可使机械工蜂变异为机械孢子爬虫。 |
| 机械分裂池 | `SpineCrawlerStetmannPassive` | 机械脊针爬虫 | `-` | - | 建造机械分裂池可使机械工蜂变异为机械脊针爬虫。 |
| 机械分裂池 | `RallyStetmannBuilding` | 设置集结点 | `RallyBuildingStetmann,Rally1` | - | 将回收的单位派往指定地点。 |
| 机械分裂池 | `ZerglingStetmannRespawn` | 回收机械跳虫 | `ZerglingStetmannRespawn,Train1` | - | 艾星、盖瑞或超级盖瑞每搜集{-1/Effect,ZerglingStetmannDeathRespawnAddCharge,Cost.Charge.Cou... |
| 机械分裂池 | `StetmannDualQueue` | 科学倍增器 | `-` | - | 该建筑可以同时研究两项升级。 |
| 机械分裂池 | `CancelBuilding` | 取消 | `BuildInProgress,Cancel` | - | 取消建造，摧毁尚未建造完成的建筑并返还部分资源。 |
| 机械进化腔 | `ZergMeleeWeaponsStetmann3` | 研究近战攻击等级3 | `EvolutionChamberStetmannResearch,Research3` | - | 使所有机械异虫的近战攻击力最大化。 |
| 机械进化腔 | `ZergMissileWeaponsStetmann3` | 研究机械喷射攻击等级3 | `EvolutionChamberStetmannResearch,Research6` | - | 使所有机械异虫地面远程单位的攻击力最大化。 |
| 机械进化腔 | `ZergGroundArmorStetmann3` | 研究机械地面钢板等级3 | `EvolutionChamberStetmannResearch,Research9` | - | 使所有机械异虫地面单位的护甲最大化。 |
| 机械进化腔 | `StetmannDualQueue` | 科学倍增器 | `-` | - | 该建筑可以同时研究两项升级。 |
| 机械进化腔 | `CancelBuilding` | 取消 | `BuildInProgress,Cancel` | - | 取消建造，摧毁尚未建造完成的建筑并返还部分资源。 |
| 机械爆虫巢穴 | `ResearchBanelingStetmannMovementSpeed` | 研究离心火箭伺服器 | `BanelingNestStetmannResearch,Research1` | - | 机械爆虫的移动速度提高{$UpgradeEffectArrayValue:BanelingStetmannMovementSpeed:Unit,Banel... |
| 机械爆虫巢穴 | `ResearchBanelingStetmannExtraDamage` | 研究艾能强化炸药 | `BanelingNestStetmannResearch,Research2` | - | 允许机械爆虫爆炸时可以将其当前拥有的艾能值算入伤害中。 |
| 机械爆虫巢穴 | `ResearchBanelingStetmannManaShieldBonus` | 研究艾能效用屏障 | `BanelingNestStetmannResearch,Research3` | - | 提高机械爆虫艾能轰击屏障吸收的伤害量，每点艾能吸收{$UpgradeEffectArrayValue:BanelingStetmannManaShield... |
| 机械爆虫巢穴 | `BanelingStetmannPassive` | 机械爆虫 | `-` | - | 机械爆虫巢穴使你可以将机械跳虫变形成机械爆虫。 |
| 机械爆虫巢穴 | `StetmannDualQueue` | 科学倍增器 | `-` | - | 该建筑可以同时研究两项升级。 |
| 机械爆虫巢穴 | `CancelBuilding` | 取消 | `BuildInProgress,Cancel` | - | 取消建造，摧毁尚未建造完成的建筑并返还部分资源。 |
| 机械刺蛇巢 | `ResearchHydraliskStetmannMovementSpeed` | 研究蛇肌腱加强件 | `HydraliskDenStetmannResearch,Research1` | - | 机械刺蛇的移动速度提高{$UpgradeEffectArrayValue:HydraliskStetmannMovementSpeed:Unit,Hydr... |
| 机械刺蛇巢 | `ResearchHydraliskStetmannDamage` | 研究博学飞弹发射器 | `HydraliskDenStetmannResearch,Research3` | - | 使机械刺蛇将其对空脊针武器替换为威力更强的“博学飞弹”武器。 |
| 机械刺蛇巢 | `ResearchHydraliskStetmannRange` | 研究提尔级瞄准系统 | `HydraliskDenStetmannResearch,Research2` | - | 机械刺蛇的对空武器射程增加{$UpgradeEffectArrayValue:HydraliskStetmannRange:Weapon,Hydralis... |
| 机械刺蛇巢 | `ResearchLurkerStetmannTunnelingBurstRange` | 研究增程式恐怖钻击算法 | `HydraliskDenStetmannResearch,Research4` | - | 机械潜伏者的“恐怖钻击算法”的最大射程增加{$UpgradeEffectArrayValue:LurkerStetmannTunnelingBurstRa... |
| 机械刺蛇巢 | `ReserachLurkerStetmannChannelingSpines` | 研究集火强击算法 | `HydraliskDenStetmannResearch,Research5` | - | 使机械潜伏者可以将火力集中于目标单位，对该单位周围的一个小区域造成{Effect,LurkerStetmannChannelingSpinesDamage... |
| 机械刺蛇巢 | `HydraliskStetmannPassive` | 机械刺蛇 | `-` | - | 机械刺蛇巢使你可以变形机械刺蛇。 |
| 机械刺蛇巢 | `RallyStetmannBuilding` | 设置集结点 | `RallyBuildingStetmann,Rally1` | - | 将回收的单位派往指定地点。 |
| 机械刺蛇巢 | `LurkerDenStetmann` | 变形为机械潜伏者巢穴 | `UpgradeToLurkerDenStetmann,Execute` | - | 开启： / - 使机械刺蛇可以变形成机械潜伏者 |
| 机械刺蛇巢 | `HydraliskStetmannRespawn` | 回收机械刺蛇 | `HydraliskStetmannRespawn,Train1` | - | 艾星、盖瑞或超级盖瑞每搜集{-1/Effect,HydraliskStetmannDeathRespawnAddCharge,Cost.Charge.Co... |
| ... | ... | ... | ... | ... | 还有 70 项，后续从 command_cards.json 继续展开 |

实现备注：建筑声明自身生产、研究、行为和阶段；训练单位的最终可用性由兵种/科技/精通/威望共同裁决。

## 08. 科技建筑及其升级选项

Owner：`CommanderTechBuildingProfile`、`CommanderUnitTechProfile`、`CommanderUpgradeProfile`、`CommanderUpgradeRequirementProfile`、`CommanderUpgradeEffectProfile`。

### 15 级解锁与研究命令

| 等级 | 名称 | 解锁升级 | 解锁 AbilityCmd | 说明 |
|---|---|---|---|---|
| 1 | 保证斯台特满意 | `-` | `-` | 斯台特曼可以部署艾星，提供多种被动的“爱心区域”强化效果。解锁单位的建筑物数量限制为1个。机械幼虫的孵化几率提高。斯台特曼的机械单位可以利用艾能，这种能量单位不会自己恢复。 |
| 2 | “艾的滋润” | `-` | `-` | 解锁“艾的滋润”设定，该设定可以为斯台特曼的单位恢复艾能，为友方单位恢复能量。 |
| 3 | 盖瑞：艾星超载 | `-` | `-` | 盖瑞获得使艾星超载的能力，可以主动为附近的单位提供不同的加成效果，具体效果受当前的艾星设定影响。 |
| 4 | 机械跳虫与机械爆虫升级包 | `-` | `-` | 在机械分裂池和机械爆虫巢穴解锁以下升级： / 机械跳虫消耗艾能获得100%攻击速度加成。机械爆虫爆炸时每剩余一点艾能都会增加其攻击伤害。提高机械爆虫的艾能轰击屏障，每一点艾能... |
| 5 | 机械杰作 | `-` | `-` | 盖瑞获得可以变形成超级盖瑞的能力。超级盖瑞拥有双倍的技能使用次数。他还可以临时性生成他自己的“爱心区域”，当他收集机械残骸时还会获得攻击速度和生命值恢复速度加成。 |
| 6 | 新单位：机械潜伏者 | `-` | `-` | 范围伤害伏击单位。必须潜地后才能发动攻击。可以使用恐怖钻击算法和集火强击算法。由机械刺蛇变形而来。 / 可以对地。 |
| 7 | 斯台特曼技术帝 | `-` | `-` | 升级为机械虫穴和机械主巢可以减少冷却时间，并增加部署艾星的最大使用次数。 |
| 8 | 机械刺蛇与机械潜伏者升级包 | `-` | `-` | 在机械刺蛇巢和机械潜伏者巢穴中解锁以下升级： / 机械刺蛇的对空射程提高3。解锁机械潜伏者的集火强击算法技能，使其可以将火力集中在目标敌方单位周围的一片小区域内，持续10秒。 |
| 9 | 永远的朋友 | `-` | `-` | 使盖瑞和艾星可以拾取被摧毁的机械单位残骸。当拾取足够数量的残骸后，机械单位可以无消耗被重建，并且出现在它们各自解锁的建筑物旁边。 |
| 10 | 机械感染者升级包 | `-` | `-` | 在机械感染深渊中解锁以下升级： / 解锁机械感染者的“UMI-C充能协议”，使其可以持续为一名友方单位恢复生命值、艾能和能量。该单位的技能冷却速度也会增加。使机械感染者的“蟑... |
| 11 | 新单位：机械巢式战列空母 | `-` | `-` | 大型飞行作战单位。朝目标射出机械巢虫进行攻击。建造并发射机械飞蝗截击机来攻击敌方地面目标。可以使用斯台特曼炮。 / 可以对地。 |
| 12 | 机械雷兽升级包 | `-` | `-` | 在机械雷兽窟中解锁以下升级： / 解锁机械雷兽可以从附近友方或敌方机械单位身上吸收25点生命值，并获得该数值总和的治疗量。机械雷兽受到的伤害降低25%。 |
| 13 | 可爱的小坏蛋们 | `MechaZerglingRemnantReclaimationBonus` | `-` | 机械跳虫和机械爆虫掉落双倍的机械跳虫残骸。 |
| 14 | 机械尖塔升级包 | `-` | `-` | 在机械尖塔和机械巨型尖塔中解锁以下升级： / 解锁机械腐化者的“泰伦超洁降解液”技能，使其能对敌方地面单位造成持续性伤害。解锁机械巢式战列空母可以建造和部署机械飞蝗截击机来攻... |
| 15 | 艾贡极限 | `-` | `-` | 允许斯台特曼的建筑可以同时研究两项升级。 |

### Upgrade 摘要

| Upgrade | 父级 | 显示名 | Effect数 | 说明 |
|---|---|---|---|---|
| `CommanderPrestigeStetmannCombatBuff` | `CommanderPrestige` | 石油大王 | 0 | 优点 / 战斗单位消灭一名敌方单位时可以获得一层最好的机油。 / 缺点 / 战斗单位消耗的晶体矿提高40%。机械感染者不可用。 |
| `CommanderPrestigeStetmannGary` | `CommanderPrestige` | 最佳伙伴 | 9 | 优点 / 盖瑞的生命值和伤害提高100%。 / 缺点 / 盖瑞位于“爱心区域”以外时，移动速度降低90%。 |
| `CommanderPrestigeStetmannStetellites` | `CommanderPrestige` | 信号专家 | 2 | 优点 / 艾星成功部署后是无敌的。艾星生成的“爱心区域”范围扩大50%。 / 缺点 / 超级盖瑞不可用。 |
| `MasteryStetmannDeployStetelliteCooldown` | `-` | 精通 斯台特曼 部署艾星冷却时间 | 3 | 减少部署艾星的冷却时间。 |
| `MasteryStetmannGaryAbilityCooldown` | `-` | 精通 斯台特曼 盖瑞技能冷却时间 | 14 | 减少盖瑞和超级盖瑞的技能的冷却时间。 |
| `MasteryStetmannMaximumEgonergyPool` | `-` | 精通 斯台特曼 艾能池上限 | 29 | 提高机械单位的艾能池上限。 |
| `MasteryStetmannStetzoneBonuses` | `-` | 精通 斯台特曼 “爱心区域”加成 | 6 | 提高“爱心区域”产生的各种加成效果。 |
| `MasteryStetmannStructureMorphRate` | `-` | 精通 斯台特曼 建筑变形速度 | 24 | 减少变形建筑所要花费的时间。 |
| `MasteryStetmannUpgradeResearchCost` | `-` | 精通 斯台特曼 升级研究费用 | 24 | - |
| `MechaZerglingRemnantReclaimationBonus` | `-` | 机械跳虫残骸回收奖励 | 2 | - |
| `PowerFieldMovementSpeed` | `-` | “艾的急切”设定 | 4 | 允许“爱心区域”给予斯台特曼的单位{$UpgradeEffectArrayValue:PowerFieldMovementSpeed:Behavior,Power... |
| `StetmannCommander` | `-` | 斯台特曼 | 0 | - |
| `StetmannIsPresent` | `-` | 斯台特曼驾到 | 0 | - |

### 研究/升级按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 机械工蜂 | `EvolutionChamberStetmann` | 变形为机械进化腔 | `ZergBuildStetmann,Build5` | - | 为机械异虫地面单位提供升级方案。 |
| 机械工蜂 | `BanelingNestStetmann` | 变形为机械爆虫巢穴 | `ZergBuildStetmann,Build11` | - | 为机械爆虫提供升级方案。 / 开启： / - 使机械跳虫可以变形为机械爆虫 |
| 机械工蜂 | `SpireStetmann` | 变形为机械尖塔 | `ZergBuildStetmann,Build7` | - | 为机械异虫空中单位提供升级方案。可以变形成机械巨型尖塔。 / 开启： / - 使机械幼虫可以变形成机械腐化者 |
| 机械孵化场 | `ResearchOverlordStetmannSpeed` | 研究充气机身 | `ResearchHatcheryStetmann,Research1` | - | 提高机械王虫和机械眼虫的移动速度。 |
| 机械孵化场 | `ResearchOverlordStetmannVentralSacks` | 研究腹舱 | `ResearchHatcheryStetmann,Research2` | - | 使机械王虫可以运输单位。 |
| 机械孵化场 | `LairStetmann` | 变形为机械虫穴 | `UpgradeToLairStetmann,Execute` | - | 机械孵化场的更高级形态，为机械异虫提供更多的升级方案和建筑方案。可孵化所有机械异虫单位和接收采集到的资源。 |
| 机械孵化场 | `StetmannFieldGeneratorEnergy` | “爱心区域”生成器 | `-` | HavePowerFieldEnergyRegenerationUpgrade | 该单位生成的“爱心区域”可以增强附近友方单位的属性。 |
| 机械虫穴 | `ResearchOverlordStetmannSpeed` | 研究充气机身 | `ResearchHatcheryStetmann,Research1` | - | 提高机械王虫和机械眼虫的移动速度。 |
| 机械虫穴 | `ResearchOverlordStetmannVentralSacks` | 研究腹舱 | `ResearchHatcheryStetmann,Research2` | - | 使机械王虫可以运输单位。 |
| 机械虫穴 | `HiveStetmann` | 变形为机械主巢 | `UpgradeToHiveStetmann,Execute` | - | 机械孵化场的更高级形态，为机械异虫提供更多的升级方案和建筑方案。可孵化所有机械异虫单位和接收采集到的资源。 |
| 机械虫穴 | `StetmannFieldGeneratorEnergy` | “爱心区域”生成器 | `-` | HavePowerFieldEnergyRegenerationUpgrade | 该单位生成的“爱心区域”可以增强附近友方单位的属性。 |
| 机械虫穴 | `CancelMutateMorph` | 取消 | `UpgradeToHiveStetmann,Cancel` | - | 取消变异命令，建筑返还至原生形态。 |
| 机械主巢 | `ResearchOverlordStetmannSpeed` | 研究充气机身 | `ResearchHatcheryStetmann,Research1` | - | 提高机械王虫和机械眼虫的移动速度。 |
| 机械主巢 | `ResearchOverlordStetmannVentralSacks` | 研究腹舱 | `ResearchHatcheryStetmann,Research2` | - | 使机械王虫可以运输单位。 |
| 机械主巢 | `StetmannFieldGeneratorEnergy` | “爱心区域”生成器 | `-` | HavePowerFieldEnergyRegenerationUpgrade | 该单位生成的“爱心区域”可以增强附近友方单位的属性。 |
| 机械分裂池 | `ResearchZerglingStetmannMovementSpeed` | 研究金属机能加速 | `SpawningPoolStetmannResearch,Research1` | - | 机械跳虫的移动速度提高{$UpgradeEffectArrayValue:ZerglingStetmannMovementSpeed:Unit,Zergl... |
| 机械分裂池 | `ResearchZerglingStetmannHardenedShield` | 研究艾能刚毅护盾 | `SpawningPoolStetmannResearch,Research2` | - | 允许机械跳虫受到的伤害减少至最多{Behavior,ZerglingHardenedShieldStetmann,DamageResponse.Clamp... |
| 机械分裂池 | `ResearchZerglingStetmannAttackSpeed` | 研究合成肾上腺泵 | `SpawningPoolStetmannResearch,Research3` | - | 机械跳虫的攻击速度提高{(Behavior,ZerglingAttackSpeedStetmann,Modification.AttackSpeedMul... |
| 机械分裂池 | `StetmannDualQueue` | 科学倍增器 | `-` | - | 该建筑可以同时研究两项升级。 |
| 机械进化腔 | `ZergMeleeWeaponsStetmann3` | 研究近战攻击等级3 | `EvolutionChamberStetmannResearch,Research3` | - | 使所有机械异虫的近战攻击力最大化。 |
| 机械进化腔 | `ZergMissileWeaponsStetmann3` | 研究机械喷射攻击等级3 | `EvolutionChamberStetmannResearch,Research6` | - | 使所有机械异虫地面远程单位的攻击力最大化。 |
| 机械进化腔 | `ZergGroundArmorStetmann3` | 研究机械地面钢板等级3 | `EvolutionChamberStetmannResearch,Research9` | - | 使所有机械异虫地面单位的护甲最大化。 |
| 机械进化腔 | `StetmannDualQueue` | 科学倍增器 | `-` | - | 该建筑可以同时研究两项升级。 |
| 机械爆虫巢穴 | `ResearchBanelingStetmannMovementSpeed` | 研究离心火箭伺服器 | `BanelingNestStetmannResearch,Research1` | - | 机械爆虫的移动速度提高{$UpgradeEffectArrayValue:BanelingStetmannMovementSpeed:Unit,Banel... |
| 机械爆虫巢穴 | `ResearchBanelingStetmannExtraDamage` | 研究艾能强化炸药 | `BanelingNestStetmannResearch,Research2` | - | 允许机械爆虫爆炸时可以将其当前拥有的艾能值算入伤害中。 |
| 机械爆虫巢穴 | `ResearchBanelingStetmannManaShieldBonus` | 研究艾能效用屏障 | `BanelingNestStetmannResearch,Research3` | - | 提高机械爆虫艾能轰击屏障吸收的伤害量，每点艾能吸收{$UpgradeEffectArrayValue:BanelingStetmannManaShield... |
| 机械爆虫巢穴 | `StetmannDualQueue` | 科学倍增器 | `-` | - | 该建筑可以同时研究两项升级。 |
| 机械刺蛇巢 | `ResearchHydraliskStetmannMovementSpeed` | 研究蛇肌腱加强件 | `HydraliskDenStetmannResearch,Research1` | - | 机械刺蛇的移动速度提高{$UpgradeEffectArrayValue:HydraliskStetmannMovementSpeed:Unit,Hydr... |
| 机械刺蛇巢 | `ResearchHydraliskStetmannDamage` | 研究博学飞弹发射器 | `HydraliskDenStetmannResearch,Research3` | - | 使机械刺蛇将其对空脊针武器替换为威力更强的“博学飞弹”武器。 |
| 机械刺蛇巢 | `ResearchHydraliskStetmannRange` | 研究提尔级瞄准系统 | `HydraliskDenStetmannResearch,Research2` | - | 机械刺蛇的对空武器射程增加{$UpgradeEffectArrayValue:HydraliskStetmannRange:Weapon,Hydralis... |
| 机械刺蛇巢 | `ResearchLurkerStetmannTunnelingBurstRange` | 研究增程式恐怖钻击算法 | `HydraliskDenStetmannResearch,Research4` | - | 机械潜伏者的“恐怖钻击算法”的最大射程增加{$UpgradeEffectArrayValue:LurkerStetmannTunnelingBurstRa... |
| 机械刺蛇巢 | `ReserachLurkerStetmannChannelingSpines` | 研究集火强击算法 | `HydraliskDenStetmannResearch,Research5` | - | 使机械潜伏者可以将火力集中于目标单位，对该单位周围的一个小区域造成{Effect,LurkerStetmannChannelingSpinesDamage... |
| 机械刺蛇巢 | `LurkerDenStetmann` | 变形为机械潜伏者巢穴 | `UpgradeToLurkerDenStetmann,Execute` | - | 开启： / - 使机械刺蛇可以变形成机械潜伏者 |
| 机械刺蛇巢 | `StetmannDualQueue` | 科学倍增器 | `-` | - | 该建筑可以同时研究两项升级。 |
| 机械潜伏者巢穴 | `ResearchHydraliskStetmannMovementSpeed` | 研究蛇肌腱加强件 | `HydraliskDenStetmannResearch,Research1` | - | 机械刺蛇的移动速度提高{$UpgradeEffectArrayValue:HydraliskStetmannMovementSpeed:Unit,Hydr... |
| 机械潜伏者巢穴 | `ResearchHydraliskStetmannDamage` | 研究博学飞弹发射器 | `HydraliskDenStetmannResearch,Research3` | - | 使机械刺蛇将其对空脊针武器替换为威力更强的“博学飞弹”武器。 |
| 机械潜伏者巢穴 | `ResearchHydraliskStetmannRange` | 研究提尔级瞄准系统 | `HydraliskDenStetmannResearch,Research2` | - | 机械刺蛇的对空武器射程增加{$UpgradeEffectArrayValue:HydraliskStetmannRange:Weapon,Hydralis... |
| 机械潜伏者巢穴 | `ResearchLurkerStetmannTunnelingBurstRange` | 研究增程式恐怖钻击算法 | `HydraliskDenStetmannResearch,Research4` | - | 机械潜伏者的“恐怖钻击算法”的最大射程增加{$UpgradeEffectArrayValue:LurkerStetmannTunnelingBurstRa... |
| 机械潜伏者巢穴 | `ReserachLurkerStetmannChannelingSpines` | 研究集火强击算法 | `HydraliskDenStetmannResearch,Research5` | - | 使机械潜伏者可以将火力集中于目标单位，对该单位周围的一个小区域造成{Effect,LurkerStetmannChannelingSpinesDamage... |
| 机械潜伏者巢穴 | `StetmannDualQueue` | 科学倍增器 | `-` | - | 该建筑可以同时研究两项升级。 |
| 机械感染深渊 | `InfestorStetmannRecharge` | 研究UMI-C充能协议 | `InfestationPitStetmannResearch2,Research2` | - | 使机械感染者朝一名友方单位伸出一根机械神经束，立即为其恢复{Effect,InfestorStetmannHealingTentacleHeal,Vita... |
| 机械感染深渊 | `InfestorStetmannBonusRavager` | 研究“赠品”破坏者！ | `InfestationPitStetmannResearch2,Research1` | - | 允许机械感染者的“蟑螂出击！”和解构型蟑螂机器人可以额外孵化一只机械破坏者。 |
| 机械感染深渊 | `StetmannDualQueue` | 科学倍增器 | `-` | - | 该建筑可以同时研究两项升级。 |
| 机械尖塔 | `ZergFlyerAttackStetmann3` | 研究机械飞行单位攻击等级3 | `SpireStetmannResearch,Research3` | - | 使所有机械异虫空中单位的攻击力最大化。 |
| 机械尖塔 | `ZergFlyerArmorStetmann3` | 研究机械飞行单位钢板等级3 | `SpireStetmannResearch,Research6` | - | 使所有机械异虫空中单位的护甲最大化。 |
| 机械尖塔 | `CorruptorStetmannBiggerAoE` | 研究大范围集束咆哮弹 | `SpireStetmannResearch,Research7` | - | 使机械腐化者的集束咆哮弹的搜索范围扩大{$UpgradeEffectArrayValue:CorruptorStetmannBiggerAoE:Effec... |
| 机械尖塔 | `ResearchCorruptorCausticSprayStetmann` | 研究泰伦超洁降解液 | `SpireStetmannResearch,Research8` | - | 使机械腐化者可以喷射一股降解液体，持续对敌方地面单位造成毁灭性伤害。 |
| 机械尖塔 | `BroodLordStetmannBombersLearn` | 研究机械飞蝗截击机舱室 | `SpireStetmannResearch,Research9` | - | 允许机械巢式战列空母可以建造和发射{Abil,BroodLordStetmannBomberMagazine,MaxCount}架飞蝗截击机，自动攻击敌方... |
| 机械尖塔 | `BroodLordStetmannYamato` | 研究斯台特曼炮 | `SpireStetmannResearch,Research10` | - | 允许机械巢式战列空母使用一门毁灭性等粒子巨炮轰击目标，造成{Effect,BroodLordStetmannYamatoDamage,Amount}点伤害... |
| 机械尖塔 | `GreaterSpireStetmann` | 变形为机械巨型尖塔 | `UpgradeToGreaterSpireStetmann,Execute` | - | 为机械异虫空中单位提供升级方案。 / 开启： / - 使机械腐化者可以变形成机械巢式战列空母 |
| 机械尖塔 | `StetmannDualQueue` | 科学倍增器 | `-` | - | 该建筑可以同时研究两项升级。 |
| 机械巨型尖塔 | `ZergFlyerAttackStetmann3` | 研究机械飞行单位攻击等级3 | `SpireStetmannResearch,Research3` | - | 使所有机械异虫空中单位的攻击力最大化。 |
| 机械巨型尖塔 | `ZergFlyerArmorStetmann3` | 研究机械飞行单位钢板等级3 | `SpireStetmannResearch,Research6` | - | 使所有机械异虫空中单位的护甲最大化。 |
| 机械巨型尖塔 | `CorruptorStetmannBiggerAoE` | 研究大范围集束咆哮弹 | `SpireStetmannResearch,Research7` | - | 使机械腐化者的集束咆哮弹的搜索范围扩大{$UpgradeEffectArrayValue:CorruptorStetmannBiggerAoE:Effec... |
| 机械巨型尖塔 | `ResearchCorruptorCausticSprayStetmann` | 研究泰伦超洁降解液 | `SpireStetmannResearch,Research8` | - | 使机械腐化者可以喷射一股降解液体，持续对敌方地面单位造成毁灭性伤害。 |
| 机械巨型尖塔 | `BroodLordStetmannBombersLearn` | 研究机械飞蝗截击机舱室 | `SpireStetmannResearch,Research9` | - | 允许机械巢式战列空母可以建造和发射{Abil,BroodLordStetmannBomberMagazine,MaxCount}架飞蝗截击机，自动攻击敌方... |
| 机械巨型尖塔 | `BroodLordStetmannYamato` | 研究斯台特曼炮 | `SpireStetmannResearch,Research10` | - | 允许机械巢式战列空母使用一门毁灭性等粒子巨炮轰击目标，造成{Effect,BroodLordStetmannYamatoDamage,Amount}点伤害... |
| 机械巨型尖塔 | `StetmannDualQueue` | 科学倍增器 | `-` | - | 该建筑可以同时研究两项升级。 |
| 机械雷兽窟 | `ResearchUltraliskStetmannBurrowChargeMechanicalStun` | 研究静电惊喜！ | `UltraliskCavernStetmannResearch,Research1` | - | 允许机械雷兽的定向潜地冲锋技能可以击晕一大片区域内的敌方机械地面单位。 |
| 机械雷兽窟 | `ReserachUltraliskStetmannMechanicalLifeLeech` | 研究机甲揩油模组 | `UltraliskCavernStetmannResearch,Research2` | - | 给予机械雷兽一项能力，使其可以从附近的敌方或友方机械单位身上吸收{Effect,UltraliskMechanicalLifeLeechStetmannD... |
| ... | ... | ... | ... | ... | 还有 11 项，后续从 command_cards.json 继续展开 |

实现备注：科技建筑只负责展示/触发研究；每个单位升级效果由对应 `CommanderUnitTechProfile` 或 `CommanderUpgradeEffectProfile` 声明。

## 09. 特定地图运输机空投单位

Owner：`CommanderCargoLoadoutProfile`、`CommanderMapDropProfile`、`CommanderScenarioFallbackProfile`。

### 运输/空投能力候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 机械孵化场 | `ResearchOverlordStetmannVentralSacks` | 研究腹舱 | `ResearchHatcheryStetmann,Research2` | - | 使机械王虫可以运输单位。 |
| 机械虫穴 | `ResearchOverlordStetmannVentralSacks` | 研究腹舱 | `ResearchHatcheryStetmann,Research2` | - | 使机械王虫可以运输单位。 |
| 机械主巢 | `ResearchOverlordStetmannVentralSacks` | 研究腹舱 | `ResearchHatcheryStetmann,Research2` | - | 使机械王虫可以运输单位。 |
| 艾星 | `JUICEOverloadStetmann` | “艾的滋润”超载 | `JUICEOverloadStetmann,Execute` | - | 在{Behavior,JUICEOverloadStetmann,Duration}秒内恢复友方单位{Behavior,JUICEOverloadStet... |
| 盖瑞 | `PowerTowerOverchargeStetmannEnergy` | 艾星超载 | `GaryStetmannPowerTowerOverchargeEnergy,Execute` | - | 超载目标艾星，使其主动为附近的单位提供加成效果，该效果受当前“爱心区域”设定影响。超载效果持续{Behavior,PowerTowerOvercharge... |
| 盖瑞 | `GaryStetmannRecall` | 半稳定物质传送 | `GaryStetmannRecall,Execute` | - | 将盖瑞和附近所有你控制的单位传送至目标艾星所在位置。 |
| 盖瑞 | `MorphToSuperGaryStetmann` | 超级盖瑞变形程序 | `MorphToSuperGaryStetmann,Execute` | - | 变形为超级盖瑞。增加E-Gorb、艾星超载、半稳定物质传送的最大使用次数。还可以使用盖瑞区域。 |
| 超级盖瑞 | `PowerTowerOverchargeStetmannEnergy` | 艾星超载 | `SuperGaryStetmannPowerTowerOverchargeEnergy,Execute` | - | 超载目标艾星，使其主动为附近的单位提供加成效果，该效果受当前“爱心区域”设定影响。超载效果持续{Behavior,PowerTowerOvercharge... |
| 超级盖瑞 | `GaryStetmannRecall` | 半稳定物质传送 | `SuperGaryStetmannRecall,Execute` | - | 将盖瑞和附近所有你控制的单位传送至目标艾星所在位置。 |
| 机械跳虫 | `ZerglingStetmannScrapDrop` | 可回收物 | `-` | - | 如果该单位在激活的艾星、盖瑞或超级盖瑞附近被摧毁时，它将掉落1份机械跳虫残骸。 |
| 机械爆虫 | `BanelingStetmannScrapDrop` | 可回收物 | `-` | - | 如果该单位在激活的艾星、盖瑞或超级盖瑞附近被摧毁时，它将掉落2份机械跳虫残骸。 |
| 机械刺蛇 | `HydraliskStetmannScrapDrop` | 可回收物 | `-` | - | 如果该单位在激活的艾星、盖瑞或超级盖瑞附近被摧毁时，它将掉落1份机械刺蛇残骸。 |
| 机械潜伏者 | `LurkerStetmannScrapDrop` | 可回收物 | `-` | - | 如果该单位在激活的艾星、盖瑞或超级盖瑞附近被摧毁时，它将掉落2份机械刺蛇残骸。 |
| 机械潜伏者 | `LurkerStetmannScrapDrop` | 可回收物 | `-` | - | 如果该单位在激活的艾星、盖瑞或超级盖瑞附近被摧毁时，它将掉落2份机械刺蛇残骸。 |
| 机械感染者 | `InfestorStetmannScrapDrop` | 可回收物 | `-` | - | 如果该单位在激活的艾星、盖瑞或超级盖瑞附近被摧毁时，它将掉落1份机械感染者残骸。 |
| 机械雷兽 | `UltraliskStetmannScrapDrop` | 可回收物 | `-` | - | 如果该单位在激活的艾星、盖瑞或超级盖瑞附近被摧毁时，它将掉落1份机械雷兽残骸。 |
| 机械腐化者 | `CorruptorStetmannScrapDrop` | 可回收物 | `-` | - | 如果该单位在激活的艾星、盖瑞或超级盖瑞附近被摧毁时，它将掉落1份机械腐化者残骸。 |
| 机械巢式战列空母 | `BroodLordStetmannScrapDrop` | 可回收物 | `-` | - | 如果该单位在激活的艾星、盖瑞或超级盖瑞附近被摧毁时，它将掉落2份机械腐化者残骸。 |

### 可投放单位候选

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 机械工蜂 | `DroneStetmann` | `DroneStetmann` | Ground; Light/Mechanical | 矿:50 气:- 人口字段:-1 生命:40 | 基础工作单位。用于采集晶体矿和高能瓦斯。可以变形为建筑。 / 可以对地。 |
| 盖瑞 | `GaryStetmann` | `GaryStetmann` | Air; Armored/Heroic/Mechanical | 矿:- 气:- 人口字段:- 生命:500 | 斯台特曼最好的朋友！可以使用E-Gorb、艾星超载、半稳定物质传送和超级盖瑞变形程序。 / 可以对空和对地。 |
| 超级盖瑞 | `SuperGaryStetmann` | `SuperGaryStetmann` | Air; Armored/Heroic/Mechanical | 矿:- 气:- 人口字段:- 生命:1000 | 斯台特曼最好的朋友！可以使用E-Gorb、艾星超载、半稳定物质传送和盖瑞区域。 / 可以对空和对地。 |
| 机械跳虫 | `ZerglingStetmann` | `ZerglingStetmann` | Ground; Light/Mechanical | 矿:25 气:- 人口字段:-0.5 生命:35 | 迅捷的肉搏型生物。可以变形为机械爆虫。 / 可以对地。 |
| 机械爆虫 | `BanelingStetmann` | `BanelingStetmann` | Ground; Mechanical | 矿:50 气:15 人口字段:-0.5 生命:30 | 自毁型单位。爆炸时能够造成小范围的伤害。 / 可以对地。 |
| 机械蟑螂 | `RoachStetmann` | `RoachStetmann` | Ground; Armored/Mechanical | 矿:- 气:- 人口字段:- 生命:75 | 突击单位。潜地时能快速恢复生命值。 / 可以对地。 |
| 机械破坏者 | `RavagerStetmann` | `RavagerStetmann` | Ground; Mechanical | 矿:- 气:- 人口字段:- 生命:80 | 远程火炮单位。可以使用“环境危害性喷发”。 / 可以对地。 |
| 机械刺蛇 | `HydraliskStetmann` | `HydraliskStetmann` | Ground; Light/Mechanical | 矿:100 气:50 人口字段:-2 生命:80 | 远程攻击单位。 / 可以对地和对空。 |
| 机械潜伏者 | `LurkerStetmann` | `LurkerStetmann` | Ground; Armored/Mechanical | 矿:150 气:150 人口字段:-3 生命:200 | 反地面伏击单位。拥有脊刺攻击能力，可对火力线上的所有敌方单位造成伤害。可以使用恐怖钻击算法和集火强击算法。 / 可以对地。 / 必须潜地后才能发动攻击。 |
| 机械潜伏者 | `LurkerStetmannBurrowed` | `LurkerStetmannBurrowed` | Ground; Armored/Mechanical | 矿:150 气:150 人口字段:-3 生命:200 | 反地面伏击单位。拥有脊刺攻击能力，可对火力线上的所有敌方单位造成伤害。可以使用恐怖钻击算法和集火强击算法。 / 可以对地。 / 必须潜地后才能发动攻击。 |
| 机械感染者 | `InfestorStetmann` | `InfestorStetmann` | Ground; Armored/Mechanical/Psionic | 矿:100 气:150 人口字段:-2 生命:90 | 善于感染的虫类。可以使用“蟑螂出击！”、解构型蟑螂机器人以及UMI-C充能协议技能。 |
| 机械雷兽 | `UltraliskStetmann` | `UltraliskStetmann` | Ground; Armored/Massive/Mechanical | 矿:300 气:200 人口字段:-6 生命:500 | 重型攻击猛兽，可造成范围伤害。可以使用定向潜地冲锋和机甲揩油模组。 / 可以对地。 |
| 机械腐化者 | `CorruptorStetmann` | `CorruptorStetmann` | Air; Armored/Mechanical | 矿:150 气:100 人口字段:-2 生命:200 | 对空飞行单位。可以使用集束咆哮弹和泰伦超洁降解液。 / 可以对空。 |
| 机械巢式战列空母 | `BroodLordStetmann` | `BroodLordStetmann` | Air; Armored/Massive/Mechanical | 矿:450 气:350 人口字段:-8 生命:550 | 大型飞行作战单位。朝目标射出机械巢虫进行攻击。建造并发射机械飞蝗截击机来攻击敌方地面目标。可以使用斯台特曼炮。 / 可以对地。 |
| 机械眼虫 | `OverseerStetmann` | `OverseerStetmann` | Air; Armored/Mechanical | 矿:150 气:50 人口字段:8 生命:200 | 高级空中侦察单位。 能够维持机械王虫形态时所控制的单位上限。可以使用超距视界。 / 侦测单位 |
| 机械眼虫 | `OverseerStetmannSiegeMode` | `OverseerStetmannSiegeMode` | Air; Armored/Mechanical | 矿:150 气:50 人口字段:8 生命:200 | - |

实现备注：运输机空投不要读取地图硬编码单位组，应从 `CommanderCargoLoadoutProfile` 读取当前 commander 的 `power_fusion` 单位清单和场景过滤规则。

## 10. 指挥官特殊机制

Owner：`CommanderSpecialMechanicProfile`、`CommanderSpecialResourceProfile`、`CommanderSpecialMechanicHookProfile`、`CommanderSpecialMechanicUnitProfile`。

本指挥官重点：超级盖瑞、卫星、斯台特区、伊冈能量是主特殊机制。

### 特殊机制命中项

- 机械感染者升级包 (`StetmannLevel10`)

### 特殊机制 Upgrade 候选

- 石油大王 (`CommanderPrestigeStetmannCombatBuff`)
- 信号专家 (`CommanderPrestigeStetmannStetellites`)
- 精通 斯台特曼 部署艾星冷却时间 (`MasteryStetmannDeployStetelliteCooldown`)
- 精通 斯台特曼 艾能池上限 (`MasteryStetmannMaximumEgonergyPool`)
- “艾的急切”设定 (`PowerFieldMovementSpeed`)

### 特殊机制按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 机械工蜂 | `RepairStetmann` | 修理 | `Repair,Execute` | - | 消耗资源为机械单位和建筑恢复生命值。 |
| 机械工蜂 | `InfestationPitStetmann` | 变形为机械感染深渊 | `ZergBuildStetmann,Build9` | - | 开启： / - 使机械幼虫可以变形为机械感染者 |
| 机械感染深渊 | `InfestorStetmannRecharge` | 研究UMI-C充能协议 | `InfestationPitStetmannResearch2,Research2` | - | 使机械感染者朝一名友方单位伸出一根机械神经束，立即为其恢复{Effect,InfestorStetmannHealingTentacleHeal,Vita... |
| 机械感染深渊 | `InfestorStetmannBonusRavager` | 研究“赠品”破坏者！ | `InfestationPitStetmannResearch2,Research1` | - | 允许机械感染者的“蟑螂出击！”和解构型蟑螂机器人可以额外孵化一只机械破坏者。 |
| 机械感染深渊 | `InfestorStetmannPassive` | 机械感染者 | `-` | - | 机械感染深渊使你可以变形机械感染者。 |
| 机械感染深渊 | `InfestorStetmannRespawnLocked` | 回收机械感染者 | `-` | StetmannLevel09 | 该技能将在指挥官等级9时解锁。 |
| 盖瑞 | `MoveChampions` | MoveChampions | `move,Move` | - | - |
| 盖瑞 | `AttackChampions` | AttackChampions | `attack,Execute` | - | - |
| 超级盖瑞 | `MoveChampions` | MoveChampions | `move,Move` | - | - |
| 超级盖瑞 | `AttackChampions` | AttackChampions | `attack,Execute` | - | - |
| 机械感染者 | `InfestorStetmannScrapDrop` | 可回收物 | `-` | - | 如果该单位在激活的艾星、盖瑞或超级盖瑞附近被摧毁时，它将掉落1份机械感染者残骸。 |
| 机械感染者 | `InfestorStetmannEggLaunch` | “蟑螂出击！” | `InfestorStetmannEggLaunch,Execute` | - | 产生{Effect,InfestorStetmannEggLaunch,PeriodCount}只机械蟑螂。生成的单位只能持续存在{Behavior,In... |
| 机械感染者 | `InfestorStetmannHealingTentacle` | UMI-C充能协议 | `InfestorStetmannHealingTentacle,Execute` | - | 机械感染者朝一名友方单位伸出一根机械神经束，立即为其恢复{Effect,InfestorStetmannHealingTentacleHeal,Vital... |
| 机械感染者 | `InfestorStetmannInfestBuilding` | 解构型蟑螂机器人 | `InfestorStetmannInfestBuilding,Execute` | - | 感染目标敌方建筑，在{Behavior,InfestorStetmannInfestBuilding,Duration}秒内造成{Effect,Infes... |
| 机械感染者 | `BurrowMove` | 潜地 | `BurrowInfestorDownStetmann,Execute` | - | 命令单位潜入地下。单位潜地后无法攻击，但处于隐形状态。该单位可以在潜地后移动。 |

实现备注：凡是涉及局内状态、资源、堆叠、全局计时器、隐藏 caster 的机制，都必须有 runtime hook 和 `[XM_DBG]` 日志。

## 11. 指挥官个性化机制

Owner：`CommanderPersonalMechanicProfile`、`CommanderPersonalMechanicEffectProfile`、`CommanderPersonalMechanicHookProfile`、`CommanderPersonalMechanicRequirementProfile`。

本指挥官重点：卫星网络和伊冈能量影响单位技能、移动、治疗和资源，需要 runtime state 重置。

### 威望正向融合输入

| 威望 ID | Primary Upgrade | 禁用单位 | 启用单位 | 禁用 Ability | 补充 Upgrade |
|---|---|---|---|---|---|
| `CommanderPrestigeStetmannStetellites` | `CommanderPrestigeStetmannStetellites` | `-` | `-` | `MorphToSuperGaryStetmann:` | `-` |
| `CommanderPrestigeStetmannGary` | `CommanderPrestigeStetmannGary` | `-` | `-` | `-` | `-` |
| `CommanderPrestigeStetmannCombatBuff` | `CommanderPrestigeStetmannCombatBuff` | `-` | `-` | `InfestationPitStetmannResearch2:1, InfestationPitStetmannResearch2:` | `-` |

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
[XM_DBG][INFO][COMMANDER_PROFILE_LOAD] commander=Stetmann levelMode=FullLevel15 masteryMode=AllSixMax rosterStage=power_fusion result=ok
[XM_DBG][INFO][POWER_FUSION_APPLY] commander=Stetmann levelMode=FullLevel15 masteryMode=AllSixMax prestigeMode=SelectedPositive result=ok
[XM_DBG][INFO][ROSTER_LOAD] commander=Stetmann stage=power_fusion units=16 buildings=18 result=ok
[XM_DBG][INFO][MODULE_VERIFY] commander=Stetmann module=<01-11> profile=<profile> result=ok
[XM_DBG][WARN][CASC_AUDIT_REQUIRED] commander=Stetmann module=<module> object=<object> result=needs-casc-audit
```

## 第一轮待审计项

- 顶部技能的 caster、按钮、冷却、充能、目标转发闭包。
- 英雄或特殊英雄的 Unit、Ability、Behavior、Weapon、Actor、Sound 闭包。
- `power_fusion` 最终 roster 与 `level15` roster 的新增、替换、变体关系。
- 6 项精通的真实作用对象和最终数值。
- 3 个威望的正面收益、负面代价、disable/suppress、费用/冷却/上限变化。
- 科技建筑研究按钮、Requirement、Upgrade effect 是否完整。
- 特殊机制和个性化机制是否需要 runtime hook。
