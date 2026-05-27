# 斯台特曼（Stetmann）指挥官细化

日期：2026-05-27

## 当前口径

当前指挥官默认 15 级，不从 1 级开始；精通默认 6 项全部 30 点；威望默认只取正面收益，不直接启用官方 `PlayerPrestige`。`initial` 只作为官方基础状态审计和差异对照，默认测试和玩法应看 `power_fusion` 最终状态。

本文件按 `docs/newdocs/模块拆分` 的 11 个模块整理 斯台特曼。依据 `游戏数据/官方合作指挥官/commanders/Stetmann/` 的当前 JSON 生成；具体 Ability、Behavior、Weapon、Actor、Effect、Requirement 闭包仍需继续追 `references/sc2-build-96883-casc-export/` 或实机 `[XM_DBG]` 日志。

## 官方数据摘要

| 项 | 值 |
|---|---|
| CommanderId | `ZergStetmann` |
| 中文名 | 斯台特曼 |
| 默认升级 | `StetmannCommander`, `StetmannIsPresent`, `PowerFieldMovementSpeed` |
| 默认能力命令 | - |
| 威望 ID | `CommanderPrestigeStetmannStetellites`, `CommanderPrestigeStetmannGary`, `CommanderPrestigeStetmannCombatBuff` |
| heroes.json 数量 | 0 |
| roster.json 数量 | 34 |
| units.json 数量 | 16 |
| buildings.json 数量 | 18 |
| command_cards.json 对象数 | 34 |
| upgrades.json 数量 | 13 |
| other-tech-entries.json 数量 | 0 |
| source | `mods/starcoop/commanders/egonstetmann.sc2mod/base.sc2data/gamedata/userdata.xml` |

roster 样例：

```text
DroneStetmann, HatcheryStetmann, LairStetmann, HiveStetmann, ExtractorStetmann, SpawningPoolStetmann, EvolutionChamberStetmann, BanelingNestStetmann, HydraliskDenStetmann, LurkerDenStetmann, InfestationPitStetmann, SpireStetmann, GreaterSpireStetmann, UltraliskCavernStetmann, SpineCrawlerStetmann, SpineCrawlerUprootedStetmann, SporeCrawlerStetmann, SporeCrawlerUprootedStetmann, PowerTowerStetmann, GaryStetmann, SuperGaryStetmann, ZerglingStetmann, BanelingStetmann, RoachStetmann
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
| - | - | - | - | 暂无自动命中项。 |

### command card 命中

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 机械雷兽窟 | `ReserachUltraliskStetmannMechanicalLifeLeech` | 研究机甲揩油模组 | `UltraliskCavernStetmannResearch,Research2` | - | 给予机械雷兽一项能力，使其可以从附近的敌方或友方机械单位身上吸收{Effect,UltraliskMechanicalLifeLeechStetmannDamage,Amount}点生命，并获得该数值总和的治疗量。 |
| 盖瑞 | `PowerTowerOverchargeStetmannEnergy` | 艾星超载 | `GaryStetmannPowerTowerOverchargeEnergy,Execute` | - | 超载目标艾星，使其主动为附近的单位提供加成效果，该效果受当前“爱心区域”设定影响。超载效果持续{Behavior,PowerTowerOverchargeStetmann,Duration}秒。 / - “艾的急切”超载给予{(Behavior,FASTOverloadSt... |
| 盖瑞 | `GaryStetmannRecall` | 半稳定物质传送 | `GaryStetmannRecall,Execute` | - | 将盖瑞和附近所有你控制的单位传送至目标艾星所在位置。 |
| 超级盖瑞 | `PowerTowerOverchargeStetmannEnergy` | 艾星超载 | `SuperGaryStetmannPowerTowerOverchargeEnergy,Execute` | - | 超载目标艾星，使其主动为附近的单位提供加成效果，该效果受当前“爱心区域”设定影响。超载效果持续{Behavior,PowerTowerOverchargeStetmann,Duration}秒。 / - “艾的急切”超载给予{(Behavior,FASTOverloadSt... |
| 超级盖瑞 | `GaryStetmannRecall` | 半稳定物质传送 | `SuperGaryStetmannRecall,Execute` | - | 将盖瑞和附近所有你控制的单位传送至目标艾星所在位置。 |
| 机械感染者 | `InfestorStetmannEggLaunch` | “蟑螂出击！” | `InfestorStetmannEggLaunch,Execute` | - | 产生{Effect,InfestorStetmannEggLaunch,PeriodCount}只机械蟑螂。生成的单位只能持续存在{Behavior,InfestorStetmannTimedLife,Duration}秒。 |
| 机械雷兽 | `UltraliskStetmannMechanicalLifeLeech` | 机甲揩油模组 | `UltraliskStetmannMechanicalLifeLeech,Execute` | - | 从附近的一个敌方或友方机械单位身上吸收{Effect,UltraliskMechanicalLifeLeechStetmannDamage,Amount}点生命，并获得同等数值的治疗量。 |

实现备注：面板只注册 profile 和转发 caster，地图不得按 commander 写 if/else。精通和威望影响面板冷却、充能、费用时，由本模块接收最终 modifier。

## 02. 英雄单位及其技能

Owner：`CommanderHeroProfile`、`CommanderHeroModeProfile`、`CommanderHeroAbilityProfile`、`CommanderHeroSkillTreeProfile`、`CommanderHeroReviveProfile`、`CommanderHeroModifierProfile`。

### 英雄单位清单

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| - | - | - | - | - | 官方 heroes.json 暂无条目；召唤物、形态、特殊英雄需从 progression、command_cards 或 CASC 继续追。 |

### 英雄技能按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| - | - | - | - | - | command_cards.json 未命中 heroes.json 对象按钮；英雄技能需从 CASC 或实机日志补。 |

### 英雄形态/模式候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| - | - | - | - | - | 未自动命中英雄形态或模式按钮。 |

### 英雄相关等级解锁

| 等级 | 名称 | 升级 | AbilityCmd | 说明 |
|---|---|---|---|---|
| - | - | - | - | 未自动命中英雄相关等级解锁；需要从 CASC 或实机日志补。 |

口径：官方玩法存在盖瑞/超级盖瑞，但当前 heroes.json 未列出，需要从 CASC/实机补 HeroProfile 与特殊机制闭包。

待审计：Hero Unit、Ability、Behavior、Weapon、Actor、Sound、复活/重生、能量/资源、形态切换和威望改写闭包。

## 03. 普通单位技能及其进化功能

Owner：`CommanderUnitAbilityProfile`、`CommanderUnitStatProfile`、`CommanderUnitEvolutionProfile`、`CommanderUnitBehaviorProfile`、`CommanderUnitWeaponProfile`。

### 单位技能按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 机械工蜂 | `MapObjectInteract` | MapObjectInteract | `MapObjectInteract,Execute` | - | - |
| 机械工蜂 | `GatherZerg` | 采集 | `DroneHarvest,Gather` | - | 命令工蜂从选中的矿脉或瓦斯气泉采集资源。 |
| 机械工蜂 | `ReturnCargo` | 返还资源 | `DroneHarvest,Return` | - | 将携带的资源送往最近的卸载点。 |
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
| 盖瑞 | `GaryStetmannMechanicalReconstruction` | 残骸回收器 | - | - | 斯台特曼的机械异虫被摧毁时会在该单位旁边掉落机械残骸。收集机械残骸后可以在相应的科技建筑处重构被摧毁的机械异虫单位。 |
| 盖瑞 | `GaryStetmannOrb` | E-Gorb | `GaryStetmannOrb,Execute` | - | 释放一颗移动电球，每秒对沿途的敌人造成{Effect,GaryStetmannOrbDamage,Amount/Behavior,GaryStetmannOrb,Period}点伤害。如果盖瑞处于“爱心区域”内，他则会释放三颗电球。 |
| 盖瑞 | `PowerTowerOverchargeStetmannEnergy` | 艾星超载 | `GaryStetmannPowerTowerOverchargeEnergy,Execute` | - | 超载目标艾星，使其主动为附近的单位提供加成效果，该效果受当前“爱心区域”设定影响。超载效果持续{Behavior,PowerTowerOverchargeStetmann,Duration}秒。 / - “艾的急切”超载给予{(Behavior,FASTOverloadSt... |
| 盖瑞 | `GaryStetmannRecall` | 半稳定物质传送 | `GaryStetmannRecall,Execute` | - | 将盖瑞和附近所有你控制的单位传送至目标艾星所在位置。 |
| 盖瑞 | `MorphToSuperGaryStetmann` | 超级盖瑞变形程序 | `MorphToSuperGaryStetmann,Execute` | - | 变形为超级盖瑞。增加E-Gorb、艾星超载、半稳定物质传送的最大使用次数。还可以使用盖瑞区域。 |
| 盖瑞 | `CancelSuperGaryStetmannMorph` | 取消 | `MorphToSuperGaryStetmann,Cancel` | - | 取消升级指令，将单位恢复到原来的状态。 |
| 超级盖瑞 | `GaryStetmannMechanicalReconstruction` | 残骸回收器 | - | - | 斯台特曼的机械异虫被摧毁时会在该单位旁边掉落机械残骸。收集机械残骸后可以在相应的科技建筑处重构被摧毁的机械异虫单位。 |
| 超级盖瑞 | `GaryStetmannTheBestOil` | 最好的机油 | - | - | 当超级盖瑞吸收一份机械残骸时，他会获得{Behavior,SuperGaryStetmannTheBestOilAttribute,Modification.AdditiveAttackSpeedFactor*100}%攻击速度加成以及额外{Behavior,SuperGa... |
| 超级盖瑞 | `Detector` | 侦测单位 | - | - | 该单位能够侦测到隐形、潜地和幻像单位。 |
| 超级盖瑞 | `GaryStetmannOrb` | E-Gorb | `SuperGaryStetmannOrb,Execute` | - | 释放一颗移动电球，每秒对沿途的敌人造成{Effect,GaryStetmannOrbDamage,Amount/Behavior,GaryStetmannOrb,Period}点伤害。如果盖瑞处于“爱心区域”内，他则会释放三颗电球。 |
| 超级盖瑞 | `PowerTowerOverchargeStetmannEnergy` | 艾星超载 | `SuperGaryStetmannPowerTowerOverchargeEnergy,Execute` | - | 超载目标艾星，使其主动为附近的单位提供加成效果，该效果受当前“爱心区域”设定影响。超载效果持续{Behavior,PowerTowerOverchargeStetmann,Duration}秒。 / - “艾的急切”超载给予{(Behavior,FASTOverloadSt... |
| 超级盖瑞 | `GaryStetmannRecall` | 半稳定物质传送 | `SuperGaryStetmannRecall,Execute` | - | 将盖瑞和附近所有你控制的单位传送至目标艾星所在位置。 |
| 超级盖瑞 | `PowerFieldSuperGaryStetmannEnergy` | 盖瑞区域 | `PowerFieldSuperGaryStetmannEnergy,Execute` | - | 在超级盖瑞周围生成一片“爱心区域”，持续{Effect,PowerFieldSuperGaryStetmannCP,PeriodicPeriodArray[1]}秒。 |
| 机械跳虫 | `ZerglingStetmannMovementSpeedPassive` | 金属机能加速 | - | `HaveZerglingStetmannMovementSpeed` | 移动速度提高{$UpgradeEffectArrayValue:ZerglingStetmannMovementSpeed:Unit,ZerglingStetmann,Speed$/Unit,ZerglingStetmann,Speed*100}%。 |
| 机械跳虫 | `ZerglingStetmannHardenedShield` | 艾能刚毅护盾 | - | `HaveZerglingStetmannHardenedShield` | 受到的伤害减少至最多{Behavior,ZerglingHardenedShieldStetmann,DamageResponse.ClampMaximum}点。每次使用消耗{Behavior,ZerglingHardenedShieldStetmann,DamageRes... |
| 机械跳虫 | `ZerglingStetmannAttackSpeedPassive` | 合成肾上腺泵 | - | `HaveZerglingStetmannAttackSpeed` | 攻击速度提高{(Behavior,ZerglingAttackSpeedStetmann,Modification.AttackSpeedMultiplier-1)*100}%。每次攻击消耗{Behavior,ZerglingAttackSpeedStetmann,Dama... |
| 机械跳虫 | `ZerglingStetmannScrapDrop` | 可回收物 | - | - | 如果该单位在激活的艾星、盖瑞或超级盖瑞附近被摧毁时，它将掉落1份机械跳虫残骸。 |
| 机械跳虫 | `BanelingStetmann` | 变形为机械爆虫 | `MorphToBanelingStetmann,Execute` | - | 自毁型单位。爆炸时能够造成小范围的伤害。 / 可以对地。 |
| 机械跳虫 | `BurrowDown` | 潜地 | `BurrowZerglingDownStetmann,Execute` | - | 命令单位潜入地下。单位潜地后无法移动或攻击，但处于隐形状态。 |
| 机械爆虫 | `-` | - | - | - | - |
| 机械爆虫 | `BanelingStetmannManaShield` | 艾能轰击屏障 | - | - | 允许该单位在承受伤害需要扣除生命值时可以先扣除其能量池数值。每点艾能可吸收{Behavior,BanelingStetmannManaShield,Modification.EnergyDamageRatioBonus}点伤害。 |
| 机械爆虫 | `BanelingStetmannExtraDamage` | 艾能强化炸药 | - | `HaveBanelingStetmannExtraDamage` | 该单位爆炸时，它当前的艾能值将算入其造成的伤害。 |
| 机械爆虫 | `BanelingStetmannScrapDrop` | 可回收物 | - | - | 如果该单位在激活的艾星、盖瑞或超级盖瑞附近被摧毁时，它将掉落2份机械跳虫残骸。 |
| 机械爆虫 | `ExplodeStetmann` | 爆炸 | `BanelingStetmannExplode,Execute` | - | 使机械爆虫在原地自爆，对附近的敌方单位和建筑造成伤害。 |
| 机械爆虫 | `DisableBuildingAttack` | 关闭对建筑攻击 | `VolatileBurstBuilding,Off` | - | 阻止爆虫自动将建筑视为攻击目标。爆虫仍会接受明确的攻击建筑指令。 / 爆虫可对建筑造成{Effect,VolatileBurstU2,Amount}点伤害值。 |
| 机械爆虫 | `BanelingStetmannMovementSpeed` | 离心火箭伺服器 | `BanelingStetmannJump,Execute` | - | 该单位的移动速度提高{$UpgradeEffectArrayValue:BanelingStetmannMovementSpeed:Unit,BanelingStetmann,Speed$/Unit,BanelingStetmann,Speed*100}%，并使其可以跃向敌... |
| 机械爆虫 | `BurrowDown` | 潜地 | `BurrowBanelingDownStetmann,Execute` | - | 命令单位潜入地下。单位潜地后无法移动或攻击，但处于隐形状态。 |
| ... | ... | ... | ... | ... | 还有 51 项，后续从 command_cards.json 继续展开。 |

### 进化/形态/切换候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 机械虫穴 | `CancelMutateMorph` | 取消 | `UpgradeToHiveStetmann,Cancel` | - | 取消变异命令，建筑返还至原生形态。 |
| 机械雷兽窟 | `ResearchUltraliskStetmannBurrowChargeMechanicalStun` | 研究静电惊喜！ | `UltraliskCavernStetmannResearch,Research1` | - | 允许机械雷兽的定向潜地冲锋技能可以击晕一大片区域内的敌方机械地面单位。 |
| 机械脊针爬虫 | `SpineCrawlerUprootStetmann` | 站起 | `SpineCrawlerUprootStetmann,Execute` | - | 使机械脊针爬虫站起。站起的机械脊针爬虫能够移动，但无法攻击。 |
| 机械脊针爬虫 | `AcquireMove` | 搜索移动 | `move,AcquireMove` | - | 命令选中的单位移至目标区域或跟随目标单位。进行搜索移动的单位不会与敌人交战。 |
| 机械脊针爬虫 | `StetmannStetzoneAbsorption` | StetmannStetzoneAbsorption | - | - | - |
| 机械脊针爬虫 | `SpineCrawlerRootStetmann` | 扎根 | `SpineCrawlerRootStetmann,Execute` | - | 使机械脊针爬虫扎根。扎根的脊针爬虫能够攻击地面单位，但无法移动。 |
| 机械孢子爬虫 | `SporeCrawlerUprootStetmann` | 站起 | `SporeCrawlerUprootStetmann,Execute` | - | 使机械孢子爬虫站起。站起的机械孢子爬虫能够移动，但无法攻击。 |
| 机械孢子爬虫 | `AcquireMove` | 搜索移动 | `move,AcquireMove` | - | 命令选中的单位移至目标区域或跟随目标单位。进行搜索移动的单位不会与敌人交战。 |
| 机械孢子爬虫 | `StetmannStetzoneAbsorption` | StetmannStetzoneAbsorption | - | - | - |
| 机械孢子爬虫 | `SporeCrawlerRootStetmann` | 扎根 | `SporeCrawlerRootStetmann,Execute` | - | 使机械孢子爬虫扎根。扎根的机械孢子爬虫可以攻击空中单位和侦测隐形单位，但无法移动。 |
| 盖瑞 | `MorphToSuperGaryStetmann` | 超级盖瑞变形程序 | `MorphToSuperGaryStetmann,Execute` | - | 变形为超级盖瑞。增加E-Gorb、艾星超载、半稳定物质传送的最大使用次数。还可以使用盖瑞区域。 |
| 盖瑞 | `CancelSuperGaryStetmannMorph` | 取消 | `MorphToSuperGaryStetmann,Cancel` | - | 取消升级指令，将单位恢复到原来的状态。 |
| 机械跳虫 | `BanelingStetmann` | 变形为机械爆虫 | `MorphToBanelingStetmann,Execute` | - | 自毁型单位。爆炸时能够造成小范围的伤害。 / 可以对地。 |
| 机械跳虫 | `BurrowDown` | 潜地 | `BurrowZerglingDownStetmann,Execute` | - | 命令单位潜入地下。单位潜地后无法移动或攻击，但处于隐形状态。 |
| 机械爆虫 | `BurrowDown` | 潜地 | `BurrowBanelingDownStetmann,Execute` | - | 命令单位潜入地下。单位潜地后无法移动或攻击，但处于隐形状态。 |
| 机械蟑螂 | `RavagerStetmann` | RavagerStetmann | `MorphToRavagerStetmann,Execute` | - | - |
| 机械蟑螂 | `BurrowDown` | 潜地 | `BurrowRoachDownStetmann,Execute` | - | 命令单位潜入地下。单位潜地后无法移动或攻击，但处于隐形状态。 |
| 机械破坏者 | `BurrowDown` | 潜地 | `BurrowRavagerDownStetmann,Execute` | - | 命令单位潜入地下。单位潜地后无法移动或攻击，但处于隐形状态。 |
| 机械刺蛇 | `LurkerStetmann` | 变形为机械潜伏者 | `MorphToLurkerStetmann,Execute` | - | 反地面伏击单位。拥有脊刺攻击能力，可对火力线上的所有敌方单位造成伤害。可以使用恐怖钻击算法和集火强击算法。 / 可以对地。 / 必须潜地后才能发动攻击。 |
| 机械刺蛇 | `BurrowDown` | 潜地 | `BurrowHydraliskDownStetmann,Execute` | - | 命令单位潜入地下。单位潜地后无法移动或攻击，但处于隐形状态。 |
| 机械潜伏者 | `LurkerBurrowDown` | LurkerBurrowDown | `BurrowLurkerDownStetmann,Execute` | - | - |
| 机械潜伏者 | `LurkerHoldFire` | 停火 | `LurkerHoldFire,Execute` | - | 命令选中的单位无视射程中的敌人。 |
| 机械潜伏者 | `LurkerCancelHoldFire` | 取消停火 | `LurkerRemoveHoldFire,Execute` | - | 命令选中的单位自由射击。 |
| 机械潜伏者 | `LurkerStetmannScrapDrop` | 可回收物 | - | - | 如果该单位在激活的艾星、盖瑞或超级盖瑞附近被摧毁时，它将掉落2份机械刺蛇残骸。 |
| 机械潜伏者 | `LurkerStetmannTunnelingBurst` | 恐怖钻击算法 | `LurkerStetmannTunnelingBurst,Execute` | - | 钻地前往附近一处目标位置，对沿途的敌人造成{Effect,LurkerStetmannTunnelingBurstDamage,Amount}点伤害。 |
| 机械潜伏者 | `LurkerStetmannChannelingSpines` | 集火强击算法 | `LurkerStetmannChannelingSpines,Execute` | - | 机械潜伏者将火力集中于目标单位，对该单位周围的一小块区域造成{Effect,LurkerStetmannChannelingSpinesDamage,Amount}点伤害，持续{Effect,LurkerStetmannChannelingSpinesCP,PeriodCo... |
| 机械潜伏者 | `LurkerBurrowUp` | 出地 | `BurrowLurkerUpStetmann,Execute` | - | 命令单位钻回地表。 |
| 机械感染者 | `BurrowMove` | 潜地 | `BurrowInfestorDownStetmann,Execute` | - | 命令单位潜入地下。单位潜地后无法攻击，但处于隐形状态。该单位可以在潜地后移动。 |
| 机械雷兽 | `UltraliskStetmannBurrowCharge` | 定向潜地冲锋 | `UltraliskStetmannBurrowCharge,Execute` | - | 潜地并冲向一个单位。从地面钻出时，邻近的所有敌方单位被击退并承受{Effect,UltraliskStetmannBurrowChargeTargetDamage,Amount}点伤害。 |
| 机械雷兽 | `BurrowDown` | 潜地 | `BurrowUltraliskDownStetmann,Execute` | - | 命令单位潜入地下。单位潜地后无法移动或攻击，但处于隐形状态。 |
| 机械腐化者 | `BroodLordStetmann` | 变形为机械巢式战列空母 | `MorphToCBroodLordStetmann,Execute` | - | 大型飞行作战单位。朝目标射出机械巢虫进行攻击。建造并发射机械飞蝗截击机来攻击敌方地面目标。可以使用斯台特曼炮。 / 可以对地。 |
| 机械眼虫 | `MorphtoOverseerSiegeStetmann` | 超距视界 | `OverseerMorphtoOverseerSiegeStetmann,Execute` | - | 使机械眼虫的视野范围扩大50%，但失去移动能力。该技能在激活后可以取消。 |
| 机械眼虫 | `AcquireMove` | 搜索移动 | `move,AcquireMove` | - | 命令选中的单位移至目标区域或跟随目标单位。进行搜索移动的单位不会与敌人交战。 |
| 机械眼虫 | `MorphtoOverseerNormalStetmann` | 取消超距视界 | `OverseerSiegeMorphtoOverseerStetmann,Execute` | - | 恢复机械眼虫的移动能力，并使其视野回到正常范围。 |
| 机械眼虫 | `Detector` | 侦测单位 | - | - | 该单位能够侦测到隐形、潜地和幻像单位。 |

实现备注：单位自身声明技能、被动、武器、Behavior 和升级后替换关系；科技建筑只触发研究，不在科技建筑内部判断所有兵种 if/else。

## 04. 初始化基地与特殊建筑

Owner：`CommanderBaseInitProfile`、`CommanderOpeningLoadoutProfile`、`CommanderSpecialStructureProfile`、`CommanderInitHookProfile`。

### 初始化建筑候选

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 机械孵化场 | `HatcheryStetmann` | `HatcheryStetmann` | Ground; Armored/Mechanical/Structure; Structure; FactionMecha | 矿:350 气:- 人口:6 生命:1500 护盾:- 能量:- | 基础建筑，能够孵化所有机械异虫单位并接收采集到的资源。可以生成“爱心区域”。可以进化为机械虫穴。 |
| 机械虫穴 | `LairStetmann` | `LairStetmann` | Ground; Armored/Mechanical/Structure; Structure; FactionMecha | 矿:500 气:100 人口:6 生命:2000 护盾:- 能量:- | 机械孵化场的更高级形态，为机械异虫提供更多的升级方案和建筑方案。可孵化所有机械异虫单位和接收采集到的资源。 |
| 机械主巢 | `HiveStetmann` | `HiveStetmann` | Ground; Armored/Mechanical/Structure; Structure; FactionMecha | 矿:700 气:250 人口:6 生命:2500 护盾:- 能量:- | 机械孵化场的更高级形态，为机械异虫提供更多的升级方案和建筑方案。可孵化所有机械异虫单位和接收采集到的资源。 |
| 机械萃取房 | `ExtractorStetmann` | `ExtractorStetmann` | Ground; Armored/Mechanical/Structure; Structure; FactionMecha | 矿:75 气:- 人口:- 生命:500 护盾:- 能量:- | 建造在瓦斯气泉上，用于采集高能瓦斯。 |

### 初始化/建造按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 机械孵化场 | `LairStetmann` | 变形为机械虫穴 | `UpgradeToLairStetmann,Execute` | - | 机械孵化场的更高级形态，为机械异虫提供更多的升级方案和建筑方案。可孵化所有机械异虫单位和接收采集到的资源。 |
| 机械孵化场 | `StetmannFieldGeneratorEnergy` | “爱心区域”生成器 | - | `HavePowerFieldEnergyRegenerationUpgrade` | 该单位生成的“爱心区域”可以增强附近友方单位的属性。 |
| 机械虫穴 | `HiveStetmann` | 变形为机械主巢 | `UpgradeToHiveStetmann,Execute` | - | 机械孵化场的更高级形态，为机械异虫提供更多的升级方案和建筑方案。可孵化所有机械异虫单位和接收采集到的资源。 |
| 机械虫穴 | `StetmannFieldGeneratorEnergy` | “爱心区域”生成器 | - | `HavePowerFieldEnergyRegenerationUpgrade` | 该单位生成的“爱心区域”可以增强附近友方单位的属性。 |
| 机械虫穴 | `CancelMutateMorph` | 取消 | `UpgradeToHiveStetmann,Cancel` | - | 取消变异命令，建筑返还至原生形态。 |
| 机械主巢 | `StetmannFieldGeneratorEnergy` | “爱心区域”生成器 | - | `HavePowerFieldEnergyRegenerationUpgrade` | 该单位生成的“爱心区域”可以增强附近友方单位的属性。 |
| 机械分裂池 | `ResearchZerglingStetmannMovementSpeed` | 研究金属机能加速 | `SpawningPoolStetmannResearch,Research1` | - | 机械跳虫的移动速度提高{$UpgradeEffectArrayValue:ZerglingStetmannMovementSpeed:Unit,ZerglingStetmann,Speed$/Unit,ZerglingStetmann,Speed*100}%。 |
| 机械分裂池 | `RallyStetmannBuilding` | 设置集结点 | `RallyBuildingStetmann,Rally1` | - | 将回收的单位派往指定地点。 |
| 机械分裂池 | `ZerglingStetmannRespawn` | 回收机械跳虫 | `ZerglingStetmannRespawn,Train1` | - | 艾星、盖瑞或超级盖瑞每搜集{-1/Effect,ZerglingStetmannDeathRespawnAddCharge,Cost.Charge.CountUse}份机械跳虫残骸，一只机械跳虫就会无消耗重生在此处。 |
| 机械爆虫巢穴 | `ResearchBanelingStetmannMovementSpeed` | 研究离心火箭伺服器 | `BanelingNestStetmannResearch,Research1` | - | 机械爆虫的移动速度提高{$UpgradeEffectArrayValue:BanelingStetmannMovementSpeed:Unit,BanelingStetmann,Speed$/Unit,BanelingStetmann,Speed*100}%，并使其可以跃向... |
| 机械爆虫巢穴 | `ResearchBanelingStetmannManaShieldBonus` | 研究艾能效用屏障 | `BanelingNestStetmannResearch,Research3` | - | 提高机械爆虫艾能轰击屏障吸收的伤害量，每点艾能吸收{$UpgradeEffectArrayValue:BanelingStetmannManaShieldBonus:Behavior,BanelingStetmannManaShield,Modification.Energ... |
| 机械刺蛇巢 | `ResearchHydraliskStetmannMovementSpeed` | 研究蛇肌腱加强件 | `HydraliskDenStetmannResearch,Research1` | - | 机械刺蛇的移动速度提高{$UpgradeEffectArrayValue:HydraliskStetmannMovementSpeed:Unit,HydraliskStetmann,Speed$/Unit,HydraliskStetmann,Speed*100}%。 |
| 机械刺蛇巢 | `ResearchHydraliskStetmannRange` | 研究提尔级瞄准系统 | `HydraliskDenStetmannResearch,Research2` | - | 机械刺蛇的对空武器射程增加{$UpgradeEffectArrayValue:HydraliskStetmannRange:Weapon,HydraliskHellfireMissilesStetmann,Range$}。 |
| 机械刺蛇巢 | `ResearchLurkerStetmannTunnelingBurstRange` | 研究增程式恐怖钻击算法 | `HydraliskDenStetmannResearch,Research4` | - | 机械潜伏者的“恐怖钻击算法”的最大射程增加{$UpgradeEffectArrayValue:LurkerStetmannTunnelingBurstRange:Effect,LurkerStetmannTunnelingBurstCU,SpawnRange$-Effect... |
| 机械刺蛇巢 | `RallyStetmannBuilding` | 设置集结点 | `RallyBuildingStetmann,Rally1` | - | 将回收的单位派往指定地点。 |
| 机械刺蛇巢 | `LurkerDenStetmann` | 变形为机械潜伏者巢穴 | `UpgradeToLurkerDenStetmann,Execute` | - | 开启： / - 使机械刺蛇可以变形成机械潜伏者 |
| 机械刺蛇巢 | `HydraliskStetmannRespawn` | 回收机械刺蛇 | `HydraliskStetmannRespawn,Train1` | - | 艾星、盖瑞或超级盖瑞每搜集{-1/Effect,HydraliskStetmannDeathRespawnAddCharge,Cost.Charge.CountUse}份机械刺蛇残骸，一只机械刺蛇就会无消耗重生在此处。 |
| 机械潜伏者巢穴 | `ResearchHydraliskStetmannMovementSpeed` | 研究蛇肌腱加强件 | `HydraliskDenStetmannResearch,Research1` | - | 机械刺蛇的移动速度提高{$UpgradeEffectArrayValue:HydraliskStetmannMovementSpeed:Unit,HydraliskStetmann,Speed$/Unit,HydraliskStetmann,Speed*100}%。 |
| 机械潜伏者巢穴 | `ResearchHydraliskStetmannRange` | 研究提尔级瞄准系统 | `HydraliskDenStetmannResearch,Research2` | - | 机械刺蛇的对空武器射程增加{$UpgradeEffectArrayValue:HydraliskStetmannRange:Weapon,HydraliskHellfireMissilesStetmann,Range$}。 |
| 机械潜伏者巢穴 | `ResearchLurkerStetmannTunnelingBurstRange` | 研究增程式恐怖钻击算法 | `HydraliskDenStetmannResearch,Research4` | - | 机械潜伏者的“恐怖钻击算法”的最大射程增加{$UpgradeEffectArrayValue:LurkerStetmannTunnelingBurstRange:Effect,LurkerStetmannTunnelingBurstCU,SpawnRange$-Effect... |
| 机械潜伏者巢穴 | `RallyStetmannBuilding` | 设置集结点 | `RallyBuildingStetmann,Rally1` | - | 将回收的单位派往指定地点。 |
| 机械潜伏者巢穴 | `HydraliskStetmannRespawn` | 回收机械刺蛇 | `HydraliskStetmannRespawn,Train1` | - | 艾星、盖瑞或超级盖瑞每搜集{-1/Effect,HydraliskStetmannDeathRespawnAddCharge,Cost.Charge.CountUse}份机械刺蛇残骸，一只机械刺蛇就会无消耗重生在此处。 |
| 机械感染深渊 | `RallyStetmannBuilding` | 设置集结点 | `RallyBuildingStetmann,Rally1` | - | 将回收的单位派往指定地点。 |
| 机械尖塔 | `CorruptorStetmannBiggerAoE` | 研究大范围集束咆哮弹 | `SpireStetmannResearch,Research7` | - | 使机械腐化者的集束咆哮弹的搜索范围扩大{$UpgradeEffectArrayValue:CorruptorStetmannBiggerAoE:Effect,HurricaneMissileDamageStetmann,AreaArray[0].Radius$/Effect... |
| 机械尖塔 | `RallyStetmannBuilding` | 设置集结点 | `RallyBuildingStetmann,Rally1` | - | 将回收的单位派往指定地点。 |
| 机械尖塔 | `GreaterSpireStetmann` | 变形为机械巨型尖塔 | `UpgradeToGreaterSpireStetmann,Execute` | - | 为机械异虫空中单位提供升级方案。 / 开启： / - 使机械腐化者可以变形成机械巢式战列空母 |
| 机械尖塔 | `CorruptorStetmannRespawn` | 回收机械腐化者 | `CorruptorStetmannRespawn,Train1` | - | 艾星、盖瑞或超级盖瑞每搜集{-1/Effect,CorruptorStetmannDeathRespawnAddCharge,Cost.Charge.CountUse}份机械腐化者残骸，一只机械腐化者就会无消耗重生在此处。 |
| 机械巨型尖塔 | `CorruptorStetmannBiggerAoE` | 研究大范围集束咆哮弹 | `SpireStetmannResearch,Research7` | - | 使机械腐化者的集束咆哮弹的搜索范围扩大{$UpgradeEffectArrayValue:CorruptorStetmannBiggerAoE:Effect,HurricaneMissileDamageStetmann,AreaArray[0].Radius$/Effect... |
| 机械巨型尖塔 | `RallyStetmannBuilding` | 设置集结点 | `RallyBuildingStetmann,Rally1` | - | 将回收的单位派往指定地点。 |
| 机械巨型尖塔 | `CorruptorStetmannRespawn` | 回收机械腐化者 | `CorruptorStetmannRespawn,Train1` | - | 艾星、盖瑞或超级盖瑞每搜集{-1/Effect,CorruptorStetmannDeathRespawnAddCharge,Cost.Charge.CountUse}份机械腐化者残骸，一只机械腐化者就会无消耗重生在此处。 |
| ... | ... | ... | ... | ... | 还有 3 项，后续从 command_cards.json 继续展开。 |

实现备注：地图初始化只传 commander、出生点和场景语义；基地、工人、特殊建筑、初始科技和补给由本指挥官 initializer 自己组装。

## 05. 指挥官兵种

Owner：`CommanderRosterProfile`、`CommanderUnitFactoryProfile`、`CommanderUnitReplacementProfile`、`CommanderLevelStageRosterProfile`。

### 当前 units.json 兵种清单

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 机械工蜂 | `DroneStetmann` | `DroneStetmann` | Ground; Light/Mechanical; Unit; FactionMecha | 矿:50 气:- 人口:-1 生命:40 护盾:- 能量:- | 基础工作单位。用于采集晶体矿和高能瓦斯。可以变形为建筑。 / 可以对地。 |
| 盖瑞 | `GaryStetmann` | `GaryStetmann` | Air; Armored/Heroic/Mechanical; Unit; FactionMecha | 矿:- 气:- 人口:- 生命:500 护盾:- 能量:- | 斯台特曼最好的朋友！可以使用E-Gorb、艾星超载、半稳定物质传送和超级盖瑞变形程序。 / 可以对空和对地。 |
| 超级盖瑞 | `SuperGaryStetmann` | `SuperGaryStetmann` | Air; Armored/Heroic/Mechanical; Unit; FactionMecha | 矿:- 气:- 人口:- 生命:1000 护盾:- 能量:- | 斯台特曼最好的朋友！可以使用E-Gorb、艾星超载、半稳定物质传送和盖瑞区域。 / 可以对空和对地。 |
| 机械跳虫 | `ZerglingStetmann` | `ZerglingStetmann` | Ground; Light/Mechanical; Unit; FactionMecha | 矿:25 气:- 人口:-0.5 生命:35 护盾:- 能量:50 | 迅捷的肉搏型生物。可以变形为机械爆虫。 / 可以对地。 |
| 机械爆虫 | `BanelingStetmann` | `BanelingStetmann` | Ground; Mechanical; Unit; FactionMecha | 矿:50 气:15 人口:-0.5 生命:30 护盾:- 能量:50 | 自毁型单位。爆炸时能够造成小范围的伤害。 / 可以对地。 |
| 机械蟑螂 | `RoachStetmann` | `RoachStetmann` | Ground; Armored/Mechanical; Unit; FactionMecha | 矿:- 气:- 人口:- 生命:75 护盾:- 能量:- | 突击单位。潜地时能快速恢复生命值。 / 可以对地。 |
| 机械破坏者 | `RavagerStetmann` | `RavagerStetmann` | Ground; Mechanical; Unit; FactionMecha | 矿:- 气:- 人口:- 生命:80 护盾:- 能量:- | 远程火炮单位。可以使用“环境危害性喷发”。 / 可以对地。 |
| 机械刺蛇 | `HydraliskStetmann` | `HydraliskStetmann` | Ground; Light/Mechanical; Unit; FactionMecha | 矿:100 气:50 人口:-2 生命:80 护盾:- 能量:100 | 远程攻击单位。 / 可以对地和对空。 |
| 机械潜伏者 | `LurkerStetmann` | `LurkerStetmann` | Ground; Armored/Mechanical; Unit; FactionMecha | 矿:150 气:150 人口:-3 生命:200 护盾:- 能量:200 | 反地面伏击单位。拥有脊刺攻击能力，可对火力线上的所有敌方单位造成伤害。可以使用恐怖钻击算法和集火强击算法。 / 可以对地。 / 必须潜地后才能发动攻击。 |
| 机械潜伏者 | `LurkerStetmannBurrowed` | `LurkerStetmannBurrowed` | Ground; Armored/Mechanical; Unit; FactionMecha | 矿:150 气:150 人口:-3 生命:200 护盾:- 能量:200 | 反地面伏击单位。拥有脊刺攻击能力，可对火力线上的所有敌方单位造成伤害。可以使用恐怖钻击算法和集火强击算法。 / 可以对地。 / 必须潜地后才能发动攻击。 |
| 机械感染者 | `InfestorStetmann` | `InfestorStetmann` | Ground; Armored/Mechanical/Psionic; Unit; FactionMecha | 矿:100 气:150 人口:-2 生命:90 护盾:- 能量:400 | 善于感染的虫类。可以使用“蟑螂出击！”、解构型蟑螂机器人以及UMI-C充能协议技能。 |
| 机械雷兽 | `UltraliskStetmann` | `UltraliskStetmann` | Ground; Armored/Massive/Mechanical; Unit; FactionMecha | 矿:300 气:200 人口:-6 生命:500 护盾:- 能量:300 | 重型攻击猛兽，可造成范围伤害。可以使用定向潜地冲锋和机甲揩油模组。 / 可以对地。 |
| 机械腐化者 | `CorruptorStetmann` | `CorruptorStetmann` | Air; Armored/Mechanical; Unit; FactionMecha | 矿:150 气:100 人口:-2 生命:200 护盾:- 能量:200 | 对空飞行单位。可以使用集束咆哮弹和泰伦超洁降解液。 / 可以对空。 |
| 机械巢式战列空母 | `BroodLordStetmann` | `BroodLordStetmann` | Air; Armored/Massive/Mechanical; Unit; FactionMecha | 矿:450 气:350 人口:-8 生命:550 护盾:- 能量:400 | 大型飞行作战单位。朝目标射出机械巢虫进行攻击。建造并发射机械飞蝗截击机来攻击敌方地面目标。可以使用斯台特曼炮。 / 可以对地。 |
| 机械眼虫 | `OverseerStetmann` | `OverseerStetmann` | Air; Armored/Mechanical; Unit; FactionMecha | 矿:150 气:50 人口:8 生命:200 护盾:- 能量:- | 高级空中侦察单位。 能够维持机械王虫形态时所控制的单位上限。可以使用超距视界。 / 侦测单位 |
| 机械眼虫 | `OverseerStetmannSiegeMode` | `OverseerStetmannSiegeMode` | Air; Armored/Mechanical; Unit; FactionMecha | 矿:150 气:50 人口:8 生命:200 护盾:- 能量:- | - |

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
| 1 | 升级资源费用 | `MasteryStetmannUpgradeResearchCost` | `2` | -60% | - |
| 1 | 盖瑞技能冷却时间 | `MasteryStetmannGaryAbilityCooldown` | `1` | -30% | - |
| 2 | “爱心区域”加成效果 | `MasteryStetmannStetzoneBonuses` | `2` | +60% | - |
| 2 | 艾能池上限 | `MasteryStetmannMaximumEgonergyPool` | `2` | +60% | - |
| 3 | 部署艾星冷却时间 | `MasteryStetmannDeployStetelliteCooldown` | `0.167` | -5.01秒 | - |
| 3 | 建筑变形速度 | `MasteryStetmannStructureMorphRate` | `2` | -60% | - |

实现备注：当前默认六项精通全 30 点，不再做官方互斥取舍；若同一字段被多个精通/威望改写，必须进入 `CommanderModifierStackProfile` 明确叠加顺序。

## 07. 指挥官建筑

Owner：`CommanderBuildingProfile`、`CommanderBuildingAbilityProfile`、`CommanderBuildingReplacementProfile`。

### 当前 buildings.json 建筑清单

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 机械孵化场 | `HatcheryStetmann` | `HatcheryStetmann` | Ground; Armored/Mechanical/Structure; Structure; FactionMecha | 矿:350 气:- 人口:6 生命:1500 护盾:- 能量:- | 基础建筑，能够孵化所有机械异虫单位并接收采集到的资源。可以生成“爱心区域”。可以进化为机械虫穴。 |
| 机械虫穴 | `LairStetmann` | `LairStetmann` | Ground; Armored/Mechanical/Structure; Structure; FactionMecha | 矿:500 气:100 人口:6 生命:2000 护盾:- 能量:- | 机械孵化场的更高级形态，为机械异虫提供更多的升级方案和建筑方案。可孵化所有机械异虫单位和接收采集到的资源。 |
| 机械主巢 | `HiveStetmann` | `HiveStetmann` | Ground; Armored/Mechanical/Structure; Structure; FactionMecha | 矿:700 气:250 人口:6 生命:2500 护盾:- 能量:- | 机械孵化场的更高级形态，为机械异虫提供更多的升级方案和建筑方案。可孵化所有机械异虫单位和接收采集到的资源。 |
| 机械萃取房 | `ExtractorStetmann` | `ExtractorStetmann` | Ground; Armored/Mechanical/Structure; Structure; FactionMecha | 矿:75 气:- 人口:- 生命:500 护盾:- 能量:- | 建造在瓦斯气泉上，用于采集高能瓦斯。 |
| 机械分裂池 | `SpawningPoolStetmann` | `SpawningPoolStetmann` | Ground; Armored/Mechanical/Structure; Structure; FactionMecha | 矿:250 气:- 人口:- 生命:1000 护盾:- 能量:- | 开启： / - 使机械幼虫可以变形成机械跳虫 / - 使机械工蜂可以变形成机械脊针爬虫 / - 使机械工蜂可以变形成机械孢子爬虫 |
| 机械进化腔 | `EvolutionChamberStetmann` | `EvolutionChamberStetmann` | Ground; Armored/Mechanical/Structure; Structure; FactionMecha | 矿:125 气:- 人口:- 生命:750 护盾:- 能量:- | 为机械异虫地面单位提供升级方案。 |
| 机械爆虫巢穴 | `BanelingNestStetmann` | `BanelingNestStetmann` | Ground; Armored/Mechanical/Structure; Structure; FactionMecha | 矿:150 气:50 人口:- 生命:850 护盾:- 能量:- | 为机械爆虫提供升级方案。 / 开启： / - 使机械跳虫可以变形为机械爆虫 |
| 机械刺蛇巢 | `HydraliskDenStetmann` | `HydraliskDenStetmann` | Ground; Armored/Mechanical/Structure; Structure; FactionMecha | 矿:150 气:100 人口:- 生命:850 护盾:- 能量:- | - |
| 机械潜伏者巢穴 | `LurkerDenStetmann` | `LurkerDenStetmann` | Ground; Armored/Mechanical/Structure; Structure; FactionMecha | 矿:250 气:150 人口:- 生命:850 护盾:- 能量:- | 开启： / - 使机械刺蛇可以变形成机械潜伏者 |
| 机械感染深渊 | `InfestationPitStetmann` | `InfestationPitStetmann` | Ground; Armored/Mechanical/Structure; Structure; FactionMecha | 矿:150 气:100 人口:- 生命:850 护盾:- 能量:- | 开启： / - 使机械幼虫可以变形为机械感染者 |
| 机械尖塔 | `SpireStetmann` | `SpireStetmann` | Ground; Armored/Mechanical/Structure; Structure; FactionMecha | 矿:250 气:200 人口:- 生命:850 护盾:- 能量:- | 为机械异虫空中单位提供升级方案。可以变形成机械巨型尖塔。 / 开启： / - 使机械幼虫可以变形成机械腐化者 |
| 机械巨型尖塔 | `GreaterSpireStetmann` | `GreaterSpireStetmann` | Ground; Armored/Mechanical/Structure; Structure; FactionMecha | 矿:350 气:350 人口:- 生命:1000 护盾:- 能量:- | 为机械异虫空中单位提供升级方案。 / 开启： / - 使机械腐化者可以变形成机械巢式战列空母 |
| 机械雷兽窟 | `UltraliskCavernStetmann` | `UltraliskCavernStetmann` | Ground; Armored/Mechanical/Structure; Structure; FactionMecha | 矿:200 气:200 人口:- 生命:850 护盾:- 能量:- | 开启： / - 使机械幼虫可以变形成机械雷兽 |
| 机械脊针爬虫 | `SpineCrawlerStetmann` | `SpineCrawlerStetmann` | Ground; Armored/Mechanical/Structure; Structure; FactionMecha | 矿:150 气:- 人口:- 生命:300 护盾:- 能量:- | 对地防御建筑。 / 可以对地。 |
| 机械脊针爬虫 | `SpineCrawlerUprootedStetmann` | `SpineCrawlerUprootedStetmann` | Ground; Armored/Mechanical/Structure; Structure; FactionMecha | 矿:150 气:- 人口:- 生命:300 护盾:- 能量:- | 站起的对地防御建筑。站起后能够移动，但无法攻击。 |
| 机械孢子爬虫 | `SporeCrawlerStetmann` | `SporeCrawlerStetmann` | Ground; Armored/Mechanical/Structure; Structure; FactionMecha | 矿:125 气:- 人口:- 生命:400 护盾:- 能量:- | 防空建筑。 / 可以对空。 / 侦测单位 |
| 机械孢子爬虫 | `SporeCrawlerUprootedStetmann` | `SporeCrawlerUprootedStetmann` | Ground; Armored/Mechanical/Structure; Structure; FactionMecha | 矿:125 气:- 人口:- 生命:400 护盾:- 能量:- | 站起的防空建筑。站起后能够移动，但无法攻击。 |
| 艾星 | `PowerTowerStetmann` | `PowerTowerStetmann` | Air; Armored/Mechanical/Structure/User1; Structure; FactionMecha | 矿:- 气:- 人口:- 生命:5 护盾:- 能量:- | 提供可以增强附近友方单位属性的“爱心区域”。可以在超载后主动进一步增强附近的单位。 |

### 建筑按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 机械孵化场 | `LarvaStetmann` | 选择机械幼虫 | - | - | 变形成机械异虫单位。 |
| 机械孵化场 | `ResearchOverlordStetmannSpeed` | 研究充气机身 | `ResearchHatcheryStetmann,Research1` | - | 提高机械王虫和机械眼虫的移动速度。 |
| 机械孵化场 | `ResearchOverlordStetmannVentralSacks` | 研究腹舱 | `ResearchHatcheryStetmann,Research2` | - | 使机械王虫可以运输单位。 |
| 机械孵化场 | `RallyEggStetmann` | 设定工蜂集结点 | `RallyHatcheryStetmann,Rally3` | - | 将变形产生的工作单位和机械王虫派往指定地点。派往矿脉和机械萃取房的工作单位会自动开始采集。 |
| 机械孵化场 | `SetRallyPoint2` | 设定集结点 | `RallyHatcheryStetmann,Rally1` | - | 将生成的单位派往指定地点。 |
| 机械孵化场 | `LairStetmann` | 变形为机械虫穴 | `UpgradeToLairStetmann,Execute` | - | 机械孵化场的更高级形态，为机械异虫提供更多的升级方案和建筑方案。可孵化所有机械异虫单位和接收采集到的资源。 |
| 机械孵化场 | `StetmannFieldGeneratorEnergy` | “爱心区域”生成器 | - | `HavePowerFieldEnergyRegenerationUpgrade` | 该单位生成的“爱心区域”可以增强附近友方单位的属性。 |
| 机械孵化场 | `StetmannSatelliteBonusLevel1` | 艾星生产等级1 | - | - | 使艾星部署维持在基础水平。 |
| 机械孵化场 | `RallyBlock` | RallyBlock | `RallyBlock,Execute` | - | - |
| 机械虫穴 | `LarvaStetmann` | 选择机械幼虫 | - | - | 变形成机械异虫单位。 |
| 机械虫穴 | `ResearchOverlordStetmannSpeed` | 研究充气机身 | `ResearchHatcheryStetmann,Research1` | - | 提高机械王虫和机械眼虫的移动速度。 |
| 机械虫穴 | `ResearchOverlordStetmannVentralSacks` | 研究腹舱 | `ResearchHatcheryStetmann,Research2` | - | 使机械王虫可以运输单位。 |
| 机械虫穴 | `RallyEggStetmann` | 设定工蜂集结点 | `RallyHatcheryStetmann,Rally3` | - | 将变形产生的工作单位和机械王虫派往指定地点。派往矿脉和机械萃取房的工作单位会自动开始采集。 |
| 机械虫穴 | `SetRallyPoint2` | 设定集结点 | `RallyHatcheryStetmann,Rally1` | - | 将生成的单位派往指定地点。 |
| 机械虫穴 | `HiveStetmann` | 变形为机械主巢 | `UpgradeToHiveStetmann,Execute` | - | 机械孵化场的更高级形态，为机械异虫提供更多的升级方案和建筑方案。可孵化所有机械异虫单位和接收采集到的资源。 |
| 机械虫穴 | `StetmannFieldGeneratorEnergy` | “爱心区域”生成器 | - | `HavePowerFieldEnergyRegenerationUpgrade` | 该单位生成的“爱心区域”可以增强附近友方单位的属性。 |
| 机械虫穴 | `StetmannSatelliteBonusLevel2` | 艾星生产等级2 | - | - | 使艾星部署维持在中等水平，降低其冷却时间并增加其最大使用次数。 |
| 机械虫穴 | `RallyBlock` | RallyBlock | `RallyBlock,Execute` | - | - |
| 机械虫穴 | `CancelMutateMorph` | 取消 | `UpgradeToHiveStetmann,Cancel` | - | 取消变异命令，建筑返还至原生形态。 |
| 机械主巢 | `LarvaStetmann` | 选择机械幼虫 | - | - | 变形成机械异虫单位。 |
| 机械主巢 | `ResearchOverlordStetmannSpeed` | 研究充气机身 | `ResearchHatcheryStetmann,Research1` | - | 提高机械王虫和机械眼虫的移动速度。 |
| 机械主巢 | `ResearchOverlordStetmannVentralSacks` | 研究腹舱 | `ResearchHatcheryStetmann,Research2` | - | 使机械王虫可以运输单位。 |
| 机械主巢 | `RallyEggStetmann` | 设定工蜂集结点 | `RallyHatcheryStetmann,Rally3` | - | 将变形产生的工作单位和机械王虫派往指定地点。派往矿脉和机械萃取房的工作单位会自动开始采集。 |
| 机械主巢 | `SetRallyPoint2` | 设定集结点 | `RallyHatcheryStetmann,Rally1` | - | 将生成的单位派往指定地点。 |
| 机械主巢 | `StetmannFieldGeneratorEnergy` | “爱心区域”生成器 | - | `HavePowerFieldEnergyRegenerationUpgrade` | 该单位生成的“爱心区域”可以增强附近友方单位的属性。 |
| 机械主巢 | `StetmannSatelliteBonusLevel3` | 艾星生产等级3 | - | - | 使艾星部署维持在最高水平，进一步降低其冷却时间并进一步增加其最大使用次数。 |
| 机械主巢 | `RallyBlock` | RallyBlock | `RallyBlock,Execute` | - | - |
| 机械萃取房 | `K5GasBonuses` | K5GasBonuses | - | `HaveK5GasBonuses` | - |
| 机械分裂池 | `ResearchZerglingStetmannMovementSpeed` | 研究金属机能加速 | `SpawningPoolStetmannResearch,Research1` | - | 机械跳虫的移动速度提高{$UpgradeEffectArrayValue:ZerglingStetmannMovementSpeed:Unit,ZerglingStetmann,Speed$/Unit,ZerglingStetmann,Speed*100}%。 |
| 机械分裂池 | `ResearchZerglingStetmannHardenedShield` | 研究艾能刚毅护盾 | `SpawningPoolStetmannResearch,Research2` | - | 允许机械跳虫受到的伤害减少至最多{Behavior,ZerglingHardenedShieldStetmann,DamageResponse.ClampMaximum}点。每次使用消耗{Behavior,ZerglingHardenedShieldStetmann,Dam... |
| 机械分裂池 | `ResearchZerglingStetmannAttackSpeed` | 研究合成肾上腺泵 | `SpawningPoolStetmannResearch,Research3` | - | 机械跳虫的攻击速度提高{(Behavior,ZerglingAttackSpeedStetmann,Modification.AttackSpeedMultiplier-1)*100}%。每次攻击消耗{Behavior,ZerglingAttackSpeedStetmann... |
| 机械分裂池 | `ZerglingStetmannPassive` | 机械跳虫 | - | - | 机械分裂池使你可以变形机械跳虫。 |
| 机械分裂池 | `SporeCrawlerStetmannPassive` | 机械孢子爬虫 | - | - | 建造机械分裂池可使机械工蜂变异为机械孢子爬虫。 |
| 机械分裂池 | `SpineCrawlerStetmannPassive` | 机械脊针爬虫 | - | - | 建造机械分裂池可使机械工蜂变异为机械脊针爬虫。 |
| 机械分裂池 | `RallyStetmannBuilding` | 设置集结点 | `RallyBuildingStetmann,Rally1` | - | 将回收的单位派往指定地点。 |
| 机械分裂池 | `ZerglingStetmannRespawn` | 回收机械跳虫 | `ZerglingStetmannRespawn,Train1` | - | 艾星、盖瑞或超级盖瑞每搜集{-1/Effect,ZerglingStetmannDeathRespawnAddCharge,Cost.Charge.CountUse}份机械跳虫残骸，一只机械跳虫就会无消耗重生在此处。 |
| 机械分裂池 | `StetmannDualQueue` | 科学倍增器 | - | - | 该建筑可以同时研究两项升级。 |
| 机械进化腔 | `ZergMeleeWeaponsStetmann3` | 研究近战攻击等级3 | `EvolutionChamberStetmannResearch,Research3` | - | 使所有机械异虫的近战攻击力最大化。 |
| 机械进化腔 | `ZergMissileWeaponsStetmann3` | 研究机械喷射攻击等级3 | `EvolutionChamberStetmannResearch,Research6` | - | 使所有机械异虫地面远程单位的攻击力最大化。 |
| 机械进化腔 | `ZergGroundArmorStetmann3` | 研究机械地面钢板等级3 | `EvolutionChamberStetmannResearch,Research9` | - | 使所有机械异虫地面单位的护甲最大化。 |
| ... | ... | ... | ... | ... | 还有 73 项，后续从 command_cards.json 继续展开。 |

实现备注：建筑自己的技能、生产队列、变形、起飞/降落、特殊自动施法由建筑 profile 声明；地图和科技建筑不持有跨指挥官判断。

## 08. 科技建筑及其升级选项

Owner：`CommanderTechBuildingProfile`、`CommanderTechOptionProfile`、`CommanderUpgradeEffectProfile`。

### 15 级解锁与研究命令

| 等级 | 名称 | 解锁升级 | 解锁 AbilityCmd | 说明 |
|---|---|---|---|---|
| 1 | 保证斯台特满意 | - | - | 斯台特曼可以部署艾星，提供多种被动的“爱心区域”强化效果。解锁单位的建筑物数量限制为1个。机械幼虫的孵化几率提高。斯台特曼的机械单位可以利用艾能，这种能量单位不会自己恢复。 |
| 2 | “艾的滋润” | - | - | 解锁“艾的滋润”设定，该设定可以为斯台特曼的单位恢复艾能，为友方单位恢复能量。 |
| 3 | 盖瑞：艾星超载 | - | - | 盖瑞获得使艾星超载的能力，可以主动为附近的单位提供不同的加成效果，具体效果受当前的艾星设定影响。 |
| 4 | 机械跳虫与机械爆虫升级包 | - | - | 在机械分裂池和机械爆虫巢穴解锁以下升级： / 机械跳虫消耗艾能获得100%攻击速度加成。机械爆虫爆炸时每剩余一点艾能都会增加其攻击伤害。提高机械爆虫的艾能轰击屏障，每一点艾能吸收更多的伤害。 |
| 5 | 机械杰作 | - | - | 盖瑞获得可以变形成超级盖瑞的能力。超级盖瑞拥有双倍的技能使用次数。他还可以临时性生成他自己的“爱心区域”，当他收集机械残骸时还会获得攻击速度和生命值恢复速度加成。 |
| 6 | 新单位：机械潜伏者 | - | - | 范围伤害伏击单位。必须潜地后才能发动攻击。可以使用恐怖钻击算法和集火强击算法。由机械刺蛇变形而来。 / 可以对地。 |
| 7 | 斯台特曼技术帝 | - | - | 升级为机械虫穴和机械主巢可以减少冷却时间，并增加部署艾星的最大使用次数。 |
| 8 | 机械刺蛇与机械潜伏者升级包 | - | - | 在机械刺蛇巢和机械潜伏者巢穴中解锁以下升级： / 机械刺蛇的对空射程提高3。解锁机械潜伏者的集火强击算法技能，使其可以将火力集中在目标敌方单位周围的一片小区域内，持续10秒。 |
| 9 | 永远的朋友 | - | - | 使盖瑞和艾星可以拾取被摧毁的机械单位残骸。当拾取足够数量的残骸后，机械单位可以无消耗被重建，并且出现在它们各自解锁的建筑物旁边。 |
| 10 | 机械感染者升级包 | - | - | 在机械感染深渊中解锁以下升级： / 解锁机械感染者的“UMI-C充能协议”，使其可以持续为一名友方单位恢复生命值、艾能和能量。该单位的技能冷却速度也会增加。使机械感染者的“蟑螂出击！”和“解构型蟑螂机器人”技能可以额外孵化一只机械破坏者。 |
| 11 | 新单位：机械巢式战列空母 | - | - | 大型飞行作战单位。朝目标射出机械巢虫进行攻击。建造并发射机械飞蝗截击机来攻击敌方地面目标。可以使用斯台特曼炮。 / 可以对地。 |
| 12 | 机械雷兽升级包 | - | - | 在机械雷兽窟中解锁以下升级： / 解锁机械雷兽可以从附近友方或敌方机械单位身上吸收25点生命值，并获得该数值总和的治疗量。机械雷兽受到的伤害降低25%。 |
| 13 | 可爱的小坏蛋们 | `MechaZerglingRemnantReclaimationBonus` | - | 机械跳虫和机械爆虫掉落双倍的机械跳虫残骸。 |
| 14 | 机械尖塔升级包 | - | - | 在机械尖塔和机械巨型尖塔中解锁以下升级： / 解锁机械腐化者的“泰伦超洁降解液”技能，使其能对敌方地面单位造成持续性伤害。解锁机械巢式战列空母可以建造和部署机械飞蝗截击机来攻击敌方地面单位。解锁机械巢式战列空母的“斯台特曼炮”，使其可以发射一次能量爆射，对一名敌方单位造成3... |
| 15 | 艾贡极限 | - | - | 允许斯台特曼的建筑可以同时研究两项升级。 |

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
| `PowerFieldMovementSpeed` | `-` | “艾的急切”设定 | 4 | 允许“爱心区域”给予斯台特曼的单位{$UpgradeEffectArrayValue:PowerFieldMovementSpeed:Behavior,PowerFieldBuffSelfStetmann,PowerStageArray[1].Modification.Mo... |
| `StetmannCommander` | `-` | 斯台特曼 | 0 | - |
| `StetmannIsPresent` | `-` | 斯台特曼驾到 | 0 | - |

### 研究/升级按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 机械工蜂 | `EvolutionChamberStetmann` | 变形为机械进化腔 | `ZergBuildStetmann,Build5` | - | 为机械异虫地面单位提供升级方案。 |
| 机械工蜂 | `SpireStetmann` | 变形为机械尖塔 | `ZergBuildStetmann,Build7` | - | 为机械异虫空中单位提供升级方案。可以变形成机械巨型尖塔。 / 开启： / - 使机械幼虫可以变形成机械腐化者 |
| 机械孵化场 | `ResearchOverlordStetmannSpeed` | 研究充气机身 | `ResearchHatcheryStetmann,Research1` | - | 提高机械王虫和机械眼虫的移动速度。 |
| 机械孵化场 | `ResearchOverlordStetmannVentralSacks` | 研究腹舱 | `ResearchHatcheryStetmann,Research2` | - | 使机械王虫可以运输单位。 |
| 机械孵化场 | `LairStetmann` | 变形为机械虫穴 | `UpgradeToLairStetmann,Execute` | - | 机械孵化场的更高级形态，为机械异虫提供更多的升级方案和建筑方案。可孵化所有机械异虫单位和接收采集到的资源。 |
| 机械孵化场 | `StetmannFieldGeneratorEnergy` | “爱心区域”生成器 | - | `HavePowerFieldEnergyRegenerationUpgrade` | 该单位生成的“爱心区域”可以增强附近友方单位的属性。 |
| 机械虫穴 | `ResearchOverlordStetmannSpeed` | 研究充气机身 | `ResearchHatcheryStetmann,Research1` | - | 提高机械王虫和机械眼虫的移动速度。 |
| 机械虫穴 | `ResearchOverlordStetmannVentralSacks` | 研究腹舱 | `ResearchHatcheryStetmann,Research2` | - | 使机械王虫可以运输单位。 |
| 机械虫穴 | `HiveStetmann` | 变形为机械主巢 | `UpgradeToHiveStetmann,Execute` | - | 机械孵化场的更高级形态，为机械异虫提供更多的升级方案和建筑方案。可孵化所有机械异虫单位和接收采集到的资源。 |
| 机械虫穴 | `StetmannFieldGeneratorEnergy` | “爱心区域”生成器 | - | `HavePowerFieldEnergyRegenerationUpgrade` | 该单位生成的“爱心区域”可以增强附近友方单位的属性。 |
| 机械虫穴 | `CancelMutateMorph` | 取消 | `UpgradeToHiveStetmann,Cancel` | - | 取消变异命令，建筑返还至原生形态。 |
| 机械主巢 | `ResearchOverlordStetmannSpeed` | 研究充气机身 | `ResearchHatcheryStetmann,Research1` | - | 提高机械王虫和机械眼虫的移动速度。 |
| 机械主巢 | `ResearchOverlordStetmannVentralSacks` | 研究腹舱 | `ResearchHatcheryStetmann,Research2` | - | 使机械王虫可以运输单位。 |
| 机械主巢 | `StetmannFieldGeneratorEnergy` | “爱心区域”生成器 | - | `HavePowerFieldEnergyRegenerationUpgrade` | 该单位生成的“爱心区域”可以增强附近友方单位的属性。 |
| 机械分裂池 | `ResearchZerglingStetmannMovementSpeed` | 研究金属机能加速 | `SpawningPoolStetmannResearch,Research1` | - | 机械跳虫的移动速度提高{$UpgradeEffectArrayValue:ZerglingStetmannMovementSpeed:Unit,ZerglingStetmann,Speed$/Unit,ZerglingStetmann,Speed*100}%。 |
| 机械分裂池 | `ResearchZerglingStetmannHardenedShield` | 研究艾能刚毅护盾 | `SpawningPoolStetmannResearch,Research2` | - | 允许机械跳虫受到的伤害减少至最多{Behavior,ZerglingHardenedShieldStetmann,DamageResponse.ClampMaximum}点。每次使用消耗{Behavior,ZerglingHardenedShieldStetmann,Dam... |
| 机械分裂池 | `ResearchZerglingStetmannAttackSpeed` | 研究合成肾上腺泵 | `SpawningPoolStetmannResearch,Research3` | - | 机械跳虫的攻击速度提高{(Behavior,ZerglingAttackSpeedStetmann,Modification.AttackSpeedMultiplier-1)*100}%。每次攻击消耗{Behavior,ZerglingAttackSpeedStetmann... |
| 机械进化腔 | `ZergMeleeWeaponsStetmann3` | 研究近战攻击等级3 | `EvolutionChamberStetmannResearch,Research3` | - | 使所有机械异虫的近战攻击力最大化。 |
| 机械进化腔 | `ZergMissileWeaponsStetmann3` | 研究机械喷射攻击等级3 | `EvolutionChamberStetmannResearch,Research6` | - | 使所有机械异虫地面远程单位的攻击力最大化。 |
| 机械进化腔 | `ZergGroundArmorStetmann3` | 研究机械地面钢板等级3 | `EvolutionChamberStetmannResearch,Research9` | - | 使所有机械异虫地面单位的护甲最大化。 |
| 机械进化腔 | `StetmannDualQueue` | 科学倍增器 | - | - | 该建筑可以同时研究两项升级。 |
| 机械爆虫巢穴 | `ResearchBanelingStetmannMovementSpeed` | 研究离心火箭伺服器 | `BanelingNestStetmannResearch,Research1` | - | 机械爆虫的移动速度提高{$UpgradeEffectArrayValue:BanelingStetmannMovementSpeed:Unit,BanelingStetmann,Speed$/Unit,BanelingStetmann,Speed*100}%，并使其可以跃向... |
| 机械爆虫巢穴 | `ResearchBanelingStetmannExtraDamage` | 研究艾能强化炸药 | `BanelingNestStetmannResearch,Research2` | - | 允许机械爆虫爆炸时可以将其当前拥有的艾能值算入伤害中。 |
| 机械爆虫巢穴 | `ResearchBanelingStetmannManaShieldBonus` | 研究艾能效用屏障 | `BanelingNestStetmannResearch,Research3` | - | 提高机械爆虫艾能轰击屏障吸收的伤害量，每点艾能吸收{$UpgradeEffectArrayValue:BanelingStetmannManaShieldBonus:Behavior,BanelingStetmannManaShield,Modification.Energ... |
| 机械刺蛇巢 | `ResearchHydraliskStetmannMovementSpeed` | 研究蛇肌腱加强件 | `HydraliskDenStetmannResearch,Research1` | - | 机械刺蛇的移动速度提高{$UpgradeEffectArrayValue:HydraliskStetmannMovementSpeed:Unit,HydraliskStetmann,Speed$/Unit,HydraliskStetmann,Speed*100}%。 |
| 机械刺蛇巢 | `ResearchHydraliskStetmannDamage` | 研究博学飞弹发射器 | `HydraliskDenStetmannResearch,Research3` | - | 使机械刺蛇将其对空脊针武器替换为威力更强的“博学飞弹”武器。 |
| 机械刺蛇巢 | `ResearchHydraliskStetmannRange` | 研究提尔级瞄准系统 | `HydraliskDenStetmannResearch,Research2` | - | 机械刺蛇的对空武器射程增加{$UpgradeEffectArrayValue:HydraliskStetmannRange:Weapon,HydraliskHellfireMissilesStetmann,Range$}。 |
| 机械刺蛇巢 | `ResearchLurkerStetmannTunnelingBurstRange` | 研究增程式恐怖钻击算法 | `HydraliskDenStetmannResearch,Research4` | - | 机械潜伏者的“恐怖钻击算法”的最大射程增加{$UpgradeEffectArrayValue:LurkerStetmannTunnelingBurstRange:Effect,LurkerStetmannTunnelingBurstCU,SpawnRange$-Effect... |
| 机械刺蛇巢 | `ReserachLurkerStetmannChannelingSpines` | 研究集火强击算法 | `HydraliskDenStetmannResearch,Research5` | - | 使机械潜伏者可以将火力集中于目标单位，对该单位周围的一个小区域造成{Effect,LurkerStetmannChannelingSpinesDamage,Amount}点伤害，持续{Effect,LurkerStetmannChannelingSpinesCP,Perio... |
| 机械刺蛇巢 | `LurkerDenStetmann` | 变形为机械潜伏者巢穴 | `UpgradeToLurkerDenStetmann,Execute` | - | 开启： / - 使机械刺蛇可以变形成机械潜伏者 |
| 机械潜伏者巢穴 | `ResearchHydraliskStetmannMovementSpeed` | 研究蛇肌腱加强件 | `HydraliskDenStetmannResearch,Research1` | - | 机械刺蛇的移动速度提高{$UpgradeEffectArrayValue:HydraliskStetmannMovementSpeed:Unit,HydraliskStetmann,Speed$/Unit,HydraliskStetmann,Speed*100}%。 |
| 机械潜伏者巢穴 | `ResearchHydraliskStetmannDamage` | 研究博学飞弹发射器 | `HydraliskDenStetmannResearch,Research3` | - | 使机械刺蛇将其对空脊针武器替换为威力更强的“博学飞弹”武器。 |
| 机械潜伏者巢穴 | `ResearchHydraliskStetmannRange` | 研究提尔级瞄准系统 | `HydraliskDenStetmannResearch,Research2` | - | 机械刺蛇的对空武器射程增加{$UpgradeEffectArrayValue:HydraliskStetmannRange:Weapon,HydraliskHellfireMissilesStetmann,Range$}。 |
| 机械潜伏者巢穴 | `ResearchLurkerStetmannTunnelingBurstRange` | 研究增程式恐怖钻击算法 | `HydraliskDenStetmannResearch,Research4` | - | 机械潜伏者的“恐怖钻击算法”的最大射程增加{$UpgradeEffectArrayValue:LurkerStetmannTunnelingBurstRange:Effect,LurkerStetmannTunnelingBurstCU,SpawnRange$-Effect... |
| 机械潜伏者巢穴 | `ReserachLurkerStetmannChannelingSpines` | 研究集火强击算法 | `HydraliskDenStetmannResearch,Research5` | - | 使机械潜伏者可以将火力集中于目标单位，对该单位周围的一个小区域造成{Effect,LurkerStetmannChannelingSpinesDamage,Amount}点伤害，持续{Effect,LurkerStetmannChannelingSpinesCP,Perio... |
| 机械感染深渊 | `InfestorStetmannRecharge` | 研究UMI-C充能协议 | `InfestationPitStetmannResearch2,Research2` | - | 使机械感染者朝一名友方单位伸出一根机械神经束，立即为其恢复{Effect,InfestorStetmannHealingTentacleHeal,VitalArray[Life].Change}点生命、{Effect,InfestorStetmannHealingTenta... |
| 机械感染深渊 | `InfestorStetmannBonusRavager` | 研究“赠品”破坏者！ | `InfestationPitStetmannResearch2,Research1` | - | 允许机械感染者的“蟑螂出击！”和解构型蟑螂机器人可以额外孵化一只机械破坏者。 |
| 机械尖塔 | `ZergFlyerAttackStetmann3` | 研究机械飞行单位攻击等级3 | `SpireStetmannResearch,Research3` | - | 使所有机械异虫空中单位的攻击力最大化。 |
| 机械尖塔 | `ZergFlyerArmorStetmann3` | 研究机械飞行单位钢板等级3 | `SpireStetmannResearch,Research6` | - | 使所有机械异虫空中单位的护甲最大化。 |
| 机械尖塔 | `CorruptorStetmannBiggerAoE` | 研究大范围集束咆哮弹 | `SpireStetmannResearch,Research7` | - | 使机械腐化者的集束咆哮弹的搜索范围扩大{$UpgradeEffectArrayValue:CorruptorStetmannBiggerAoE:Effect,HurricaneMissileDamageStetmann,AreaArray[0].Radius$/Effect... |
| 机械尖塔 | `ResearchCorruptorCausticSprayStetmann` | 研究泰伦超洁降解液 | `SpireStetmannResearch,Research8` | - | 使机械腐化者可以喷射一股降解液体，持续对敌方地面单位造成毁灭性伤害。 |
| 机械尖塔 | `BroodLordStetmannBombersLearn` | 研究机械飞蝗截击机舱室 | `SpireStetmannResearch,Research9` | - | 允许机械巢式战列空母可以建造和发射{Abil,BroodLordStetmannBomberMagazine,MaxCount}架飞蝗截击机，自动攻击敌方地面单位。 |
| 机械尖塔 | `BroodLordStetmannYamato` | 研究斯台特曼炮 | `SpireStetmannResearch,Research10` | - | 允许机械巢式战列空母使用一门毁灭性等粒子巨炮轰击目标，造成{Effect,BroodLordStetmannYamatoDamage,Amount}点伤害并留下大气磅礴的错觉。 |
| 机械尖塔 | `CorruptorStetmannPassive` | 机械腐化者 | - | - | 机械尖塔使你可以变形机械腐化者。 |
| 机械尖塔 | `RallyStetmannBuilding` | 设置集结点 | `RallyBuildingStetmann,Rally1` | - | 将回收的单位派往指定地点。 |
| ... | ... | ... | ... | ... | 还有 22 项，后续从 command_cards.json 继续展开。 |

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
| Stetmann | `原始mod/Maps/XM/traynor01.SC2Map/MapScript.galaxy` | 开场 SpecialOpsDropship 按 libE0EAE146_gv_commander 塞不同货舱；Dehaka/Gary 改为地面生成 | 已有按指挥官替换开场运输/救援小队的地图素材。 | 应迁移为 map=traynor01 的 cargo_light 或 opening_rescue profile。 |
| Stetmann | `原始mod/Maps/XM/thanson01.SC2Map/MapScript.galaxy` | Firebat dropship 按 commander 替换货舱，默认 Firebat + Medic | 已有轻型救援运输机的 commander 分支。 | 应迁移为 cargo_light profile，并保留地图卸载/返航点。 |
| Stetmann | `原始mod/Maps/XM/ttychus02.SC2Map/MapScript.galaxy` | Siege tank dropship 按 commander 替换货舱，卸载后 DropCargoAndExit | 已有重型支援运输机的 commander 分支。 | 应迁移为 cargo_heavy profile，并保留 Stukov/Mengsk 等后置 hook。 |
| 通用 | `原始mod/Maps/XM/thorner04.SC2Map/MapScript.galaxy` | gf_DropKillTeamViaHercules 创建 Hercules、UnitCargoCreate 塞兵、卸货后攻击 | 已有可复用的大力神空投执行器，但主要服务敌方/剧情 kill team。 | 可参考执行流程；不能直接当玩家指挥官 loadout 来源。 |
| 通用 | `原始mod 全局搜索` | 未命中 XM_CreateCommanderCargoSquad 或 CommanderCargoLoadoutProfile | 原始mod 只有素材和地图硬编码，没有现成的指挥官货舱配置框架。 | 本模块需要新建 profile/factory 抽象，不能照搬地图 if/else。 |

### 场景 loadout 设计草案

| ScenarioKind | 推荐单位 | 用途 | 设计说明 | 来源状态 |
|---|---|---|---|---|
| `cargo_light` | ZerglingStetmann x10, HydraliskStetmann x4 | 机械虫群 | 轻型机械虫群，依赖斯台特区。 | 已有多张地图为 Stetmann 配置货舱；此处需与斯台特区/盖瑞机制分开审计。 |
| `cargo_heavy` | UltraliskStetmann x2, LurkerStetmann x2, InfestorStetmann x1 | 重型机械虫群 | 雷兽、潜伏者和感染者组合。 | 已有多张地图为 Stetmann 配置货舱；此处需与斯台特区/盖瑞机制分开审计。 |
| `cargo_air` | CorruptorStetmann x4, BroodLordStetmann x2, OverseerStetmann x1 | 空中机械虫群 | 腐化者、巢式战列空母和眼虫。 | 已有多张地图为 Stetmann 配置货舱；此处需与斯台特区/盖瑞机制分开审计。 |
| `bonus_reward` | SuperGaryStetmann x1, HydraliskStetmann x4 | 超级盖瑞奖励 | 只在允许特殊英雄时使用。 | 已有多张地图为 Stetmann 配置货舱；此处需与斯台特区/盖瑞机制分开审计。 |
| `replacement_squad` | RoachStetmann x4, RavagerStetmann x3 | 机油/能量测试 | 用于验证机械蟑螂和破坏者链。 | 已有多张地图为 Stetmann 配置货舱；此处需与斯台特区/盖瑞机制分开审计。 |

### 接入规则

- 本模块不再从 `command_cards.json` 的运输/空投按钮自动推导货舱单位，也不把 `units.json` 全量清单当成可投放单位。
- 地图只传入 `mapId`、`scenarioKind`、目标点和运输模式；单位组合由 `CommanderCargoLoadoutProfile` 根据当前 commander、15 级 `power_fusion` roster 和场景限制解析。
- `原始mod` 已有运输机、空投舱、狮鹫运输、医疗运输机、坑道/深挖或感染运输容器时，应优先保留它的流程语义，只把硬编码单位替换为 profile 查询结果。
- 英雄、首领、终极进化、战列巡航舰、航母等高价值单位默认只能用于 `bonus_reward` 或显式允许英雄的地图场景。
实现备注：`CommanderMapDropProfile` 负责把地图事件映射为 `scenarioKind`；`CommanderScenarioFallbackProfile` 负责缺项降级并输出 `[XM_DBG][WARN][CARGO_FALLBACK]`。

## 10. 指挥官特殊机制

Owner：`CommanderSpecialMechanicProfile`、`CommanderSpecialResourceProfile`、`CommanderSpecialMechanicHookProfile`、`CommanderSpecialMechanicUnitProfile`。

本指挥官重点：斯台特区、盖瑞、卫星配置和单位机油/能量体系。

### 特殊机制命中项

- 保证斯台特满意 (StetmannLevel1)
- “艾的滋润” (StetmannLevel2)
- 盖瑞：艾星超载 (StetmannLevel3)
- 机械跳虫与机械爆虫升级包 (StetmannLevel4)
- 机械杰作 (StetmannLevel5)
- 新单位：机械潜伏者 (StetmannLevel6)
- 斯台特曼技术帝 (StetmannLevel7)
- 机械刺蛇与机械潜伏者升级包 (StetmannLevel8)
- 永远的朋友 (StetmannLevel9)
- 机械感染者升级包 (StetmannLevel10)
- 新单位：机械巢式战列空母 (StetmannLevel11)
- 机械雷兽升级包 (StetmannLevel12)
- 可爱的小坏蛋们 (StetmannLevel13)
- 机械尖塔升级包 (StetmannLevel14)
- 艾贡极限 (StetmannLevel15)

### 特殊机制 Upgrade 候选

- 石油大王 (`CommanderPrestigeStetmannCombatBuff`)
- 最佳伙伴 (`CommanderPrestigeStetmannGary`)
- 信号专家 (`CommanderPrestigeStetmannStetellites`)
- 精通 斯台特曼 部署艾星冷却时间 (`MasteryStetmannDeployStetelliteCooldown`)
- 精通 斯台特曼 盖瑞技能冷却时间 (`MasteryStetmannGaryAbilityCooldown`)
- 精通 斯台特曼 艾能池上限 (`MasteryStetmannMaximumEgonergyPool`)
- 精通 斯台特曼 “爱心区域”加成 (`MasteryStetmannStetzoneBonuses`)
- 精通 斯台特曼 建筑变形速度 (`MasteryStetmannStructureMorphRate`)
- 精通 斯台特曼 升级研究费用 (`MasteryStetmannUpgradeResearchCost`)
- “艾的急切”设定 (`PowerFieldMovementSpeed`)
- 斯台特曼 (`StetmannCommander`)
- 斯台特曼驾到 (`StetmannIsPresent`)

### 特殊机制按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 机械工蜂 | `MapObjectInteract` | MapObjectInteract | `MapObjectInteract,Execute` | - | - |
| 机械工蜂 | `GatherZerg` | 采集 | `DroneHarvest,Gather` | - | 命令工蜂从选中的矿脉或瓦斯气泉采集资源。 |
| 机械工蜂 | `ReturnCargo` | 返还资源 | `DroneHarvest,Return` | - | 将携带的资源送往最近的卸载点。 |
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
| 机械孵化场 | `LarvaStetmann` | 选择机械幼虫 | - | - | 变形成机械异虫单位。 |
| 机械孵化场 | `ResearchOverlordStetmannSpeed` | 研究充气机身 | `ResearchHatcheryStetmann,Research1` | - | 提高机械王虫和机械眼虫的移动速度。 |
| 机械孵化场 | `ResearchOverlordStetmannVentralSacks` | 研究腹舱 | `ResearchHatcheryStetmann,Research2` | - | 使机械王虫可以运输单位。 |
| 机械孵化场 | `RallyEggStetmann` | 设定工蜂集结点 | `RallyHatcheryStetmann,Rally3` | - | 将变形产生的工作单位和机械王虫派往指定地点。派往矿脉和机械萃取房的工作单位会自动开始采集。 |
| 机械孵化场 | `SetRallyPoint2` | 设定集结点 | `RallyHatcheryStetmann,Rally1` | - | 将生成的单位派往指定地点。 |
| 机械孵化场 | `LairStetmann` | 变形为机械虫穴 | `UpgradeToLairStetmann,Execute` | - | 机械孵化场的更高级形态，为机械异虫提供更多的升级方案和建筑方案。可孵化所有机械异虫单位和接收采集到的资源。 |
| 机械孵化场 | `StetmannFieldGeneratorEnergy` | “爱心区域”生成器 | - | `HavePowerFieldEnergyRegenerationUpgrade` | 该单位生成的“爱心区域”可以增强附近友方单位的属性。 |
| 机械孵化场 | `StetmannSatelliteBonusLevel1` | 艾星生产等级1 | - | - | 使艾星部署维持在基础水平。 |
| 机械孵化场 | `RallyBlock` | RallyBlock | `RallyBlock,Execute` | - | - |
| 机械虫穴 | `LarvaStetmann` | 选择机械幼虫 | - | - | 变形成机械异虫单位。 |
| 机械虫穴 | `ResearchOverlordStetmannSpeed` | 研究充气机身 | `ResearchHatcheryStetmann,Research1` | - | 提高机械王虫和机械眼虫的移动速度。 |
| 机械虫穴 | `ResearchOverlordStetmannVentralSacks` | 研究腹舱 | `ResearchHatcheryStetmann,Research2` | - | 使机械王虫可以运输单位。 |
| 机械虫穴 | `RallyEggStetmann` | 设定工蜂集结点 | `RallyHatcheryStetmann,Rally3` | - | 将变形产生的工作单位和机械王虫派往指定地点。派往矿脉和机械萃取房的工作单位会自动开始采集。 |
| 机械虫穴 | `SetRallyPoint2` | 设定集结点 | `RallyHatcheryStetmann,Rally1` | - | 将生成的单位派往指定地点。 |
| 机械虫穴 | `HiveStetmann` | 变形为机械主巢 | `UpgradeToHiveStetmann,Execute` | - | 机械孵化场的更高级形态，为机械异虫提供更多的升级方案和建筑方案。可孵化所有机械异虫单位和接收采集到的资源。 |
| 机械虫穴 | `StetmannFieldGeneratorEnergy` | “爱心区域”生成器 | - | `HavePowerFieldEnergyRegenerationUpgrade` | 该单位生成的“爱心区域”可以增强附近友方单位的属性。 |
| 机械虫穴 | `StetmannSatelliteBonusLevel2` | 艾星生产等级2 | - | - | 使艾星部署维持在中等水平，降低其冷却时间并增加其最大使用次数。 |
| 机械虫穴 | `RallyBlock` | RallyBlock | `RallyBlock,Execute` | - | - |
| 机械虫穴 | `CancelMutateMorph` | 取消 | `UpgradeToHiveStetmann,Cancel` | - | 取消变异命令，建筑返还至原生形态。 |
| 机械主巢 | `LarvaStetmann` | 选择机械幼虫 | - | - | 变形成机械异虫单位。 |
| 机械主巢 | `ResearchOverlordStetmannSpeed` | 研究充气机身 | `ResearchHatcheryStetmann,Research1` | - | 提高机械王虫和机械眼虫的移动速度。 |
| 机械主巢 | `ResearchOverlordStetmannVentralSacks` | 研究腹舱 | `ResearchHatcheryStetmann,Research2` | - | 使机械王虫可以运输单位。 |
| 机械主巢 | `RallyEggStetmann` | 设定工蜂集结点 | `RallyHatcheryStetmann,Rally3` | - | 将变形产生的工作单位和机械王虫派往指定地点。派往矿脉和机械萃取房的工作单位会自动开始采集。 |
| 机械主巢 | `SetRallyPoint2` | 设定集结点 | `RallyHatcheryStetmann,Rally1` | - | 将生成的单位派往指定地点。 |
| 机械主巢 | `StetmannFieldGeneratorEnergy` | “爱心区域”生成器 | - | `HavePowerFieldEnergyRegenerationUpgrade` | 该单位生成的“爱心区域”可以增强附近友方单位的属性。 |
| 机械主巢 | `StetmannSatelliteBonusLevel3` | 艾星生产等级3 | - | - | 使艾星部署维持在最高水平，进一步降低其冷却时间并进一步增加其最大使用次数。 |
| 机械主巢 | `RallyBlock` | RallyBlock | `RallyBlock,Execute` | - | - |
| ... | ... | ... | ... | ... | 还有 164 项，后续从 command_cards.json 继续展开。 |

实现备注：凡是涉及局内状态、资源、堆叠、全局计时器、隐藏 caster、英雄成长或召唤首领的机制，都必须有 runtime hook 和 `[XM_DBG]` 日志。

## 11. 指挥官个性化机制

Owner：`CommanderPersonalMechanicProfile`、`CommanderPersonalMechanicEffectProfile`、`CommanderPersonalMechanicHookProfile`、`CommanderPersonalMechanicRequirementProfile`。

本指挥官重点：斯台特区配置和盖瑞状态是全局网络机制，需要统一记录覆盖范围、模式和能量。

### 威望正向融合输入

| 威望 ID | 名称 | Primary Upgrade | 禁用单位 | 启用单位 | 禁用 Ability | 补充 Upgrade |
|---|---|---|---|---|---|---|
| `CommanderPrestigeStetmannStetellites` | - | `CommanderPrestigeStetmannStetellites` | - | - | `MorphToSuperGaryStetmann:` | - |
| `CommanderPrestigeStetmannGary` | - | `CommanderPrestigeStetmannGary` | - | - | - | - |
| `CommanderPrestigeStetmannCombatBuff` | - | `CommanderPrestigeStetmannCombatBuff` | - | - | `InfestationPitStetmannResearch2:1`, `InfestationPitStetmannResearch2:` | - |

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
[XM_DBG][INFO][COMMANDER_PROFILE_LOAD] commander=Stetmann levelMode=FullLevel15 masteryMode=AllSixMax rosterStage=power_fusion result=ok
[XM_DBG][INFO][POWER_FUSION_APPLY] commander=Stetmann levelMode=FullLevel15 masteryMode=AllSixMax prestigeMode=SelectedPositive result=ok
[XM_DBG][INFO][ROSTER_LOAD] commander=Stetmann stage=power_fusion units=16 buildings=18 heroes=0 result=ok
[XM_DBG][INFO][HERO_PROFILE_LOAD] commander=Stetmann heroes=0 result=ok
[XM_DBG][INFO][MODULE_VERIFY] commander=Stetmann module=<01-11> profile=<profile> result=ok
[XM_DBG][WARN][CASC_AUDIT_REQUIRED] commander=Stetmann module=<module> object=<object> result=needs-casc-audit
```

## 第一轮待审计项

- 顶部技能的 caster、按钮、冷却、充能、目标转发闭包。
- 英雄或特殊英雄的 Unit、Ability、Behavior、Weapon、Actor、Sound、复活/重生闭包。
- `power_fusion` 最终 roster 与 `level15` roster 的新增、替换、变体关系。
- 6 项精通的真实作用对象和最终数值。
- 3 个威望的正面收益、负面代价、disable/suppress、费用/冷却/上限变化。
- 科技建筑研究按钮、Requirement、Upgrade effect 是否完整。
- 特殊机制、英雄成长和个性化机制是否需要 runtime hook。
