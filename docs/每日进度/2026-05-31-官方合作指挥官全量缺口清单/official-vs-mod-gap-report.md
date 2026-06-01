# 官方合作指挥官全量缺口清单

- 生成时间：2026/6/1 17:10:51
- 官方数据：`D:\MyWork\新建文件夹\mom.report.client\src\MyMod\crys_the_swarm_reborn.SC2Mod\游戏数据\官方合作指挥官\commanders`
- Mod 数据：`D:\MyWork\新建文件夹\mom.report.client\src\MyMod\crys_the_swarm_reborn.SC2Mod\合作指挥官版起义狂潮\Mods\XM`
- 扫描范围：当前 XM 树下全部 XML / TXT / GALAXY 文件，共 786 个
- 判定方式：缺口按官方 JSON 条目 ID 与当前 Mod 中的 `id` 属性做精确比对；同名引用、localized key 和脚本文本命中只作为辅助线索，不视为已实现。
- 说明：这是精确定义扫描底稿，适合作为缺口排查和人工复核底稿，不应直接当作最终玩法收口判定。

## 总览

| 指挥官 | 模块 | 缺失总数 | 主要缺口 |
| --- | --- | ---: | --- |
| Abathur | `XMAbathur.SC2Mod` | 0 | 无 |
| Alarak | `XMAlarak.SC2Mod` | 2 | units、upgrades |
| Artanis | `XMArtanis.SC2Mod` | 0 | 无 |
| Dehaka | `XMDehaka.SC2Mod` | 32 | upgrades、abilities、buttons |
| Fenix | `XMFenix.SC2Mod` | 0 | 无 |
| Horner | `XMHorner.SC2Mod` | 29 | units、upgrades、abilities、buttons |
| Karax | `XMKarax.SC2Mod` | 0 | 无 |
| Kerrigan | `XMKerrigan.SC2Mod` | 4 | buttons |
| Mengsk | `XMMengsk.SC2Mod` | 42 | upgrades、commander_perks、abilities、buttons |
| Nova | `XMNova.SC2Mod` | 40 | units、upgrades、abilities、buttons |
| Raynor | `XMRaynor.SC2Mod` | 26 | units、abilities、buttons |
| Stetmann | `XMStetmann.SC2Mod` | 36 | commander_perks、abilities、buttons |
| Stukov | `XMStukov.SC2Mod` | 33 | units、buildings、upgrades、buttons |
| Swann | `XMSwann.SC2Mod` | 25 | units、buildings、upgrades、abilities、buttons |
| Tychus | `XMTychus.SC2Mod` | 24 | upgrades、abilities、buttons |
| Vorazun | `XMVorazun.SC2Mod` | 0 | 无 |
| Zagara | `XMZagara.SC2Mod` | 16 | buttons |
| Zeratul | `XMZeratul.SC2Mod` | 14 | buildings、upgrades、abilities、buttons |

## Abathur

- 模块：`XMAbathur.SC2Mod`
- 缺失总数：0
- 结论：当前未发现明显缺口。

## Alarak

- 模块：`XMAlarak.SC2Mod`
- 缺失总数：2
- 缺口分类：兵种、升级

### 兵种

- 官方数量：7
- 缺失数量：1
- 仅有文本/引用命中的条目：1
- 浩劫 `SentryTaldarim`

### 升级

- 官方数量：19
- 缺失数量：1
- 仅有文本/引用命中的条目：1
- HaveMonitor `HaveMonitor`

## Artanis

- 模块：`XMArtanis.SC2Mod`
- 缺失总数：0
- 结论：当前未发现明显缺口。

## Dehaka

- 模块：`XMDehaka.SC2Mod`
- 缺失总数：32
- 缺口分类：升级、技能、按钮

### 升级

- 官方数量：17
- 缺失数量：5
- 仅有文本/引用命中的条目：5
- DehakaLevel02Tooltips `DehakaLevel02Tooltips`
- DehakaLevel06Tooltips `DehakaLevel06Tooltips`
- DehakaLevel08Tooltips `DehakaLevel08Tooltips`
- DehakaLevel11Tooltips `DehakaLevel11Tooltips`
- DehakaPrimalBossUpgrades `DehakaPrimalBossUpgrades`

### 技能

- 官方数量：61
- 缺失数量：4
- 仅有文本/引用命中的条目：4
- 采集 `DroneHarvest`
- 召唤建筑 `255`
- 喷漆 `SprayZerg`
- DehakaLocustFlyingSwoop `DehakaLocustFlyingSwoop`

### 按钮

- 官方数量：138
- 缺失数量：23
- 仅有文本/引用命中的条目：23
- 精华收集者 `CommanderDehakaBaseTrait`
- 新单位：掠食龙和原始点火虫 `CommanderDehakaLevel02`
- 掠食龙升级包 `CommanderDehakaLevel03`
- 深槽虫道 `CommanderDehakaLevel04`
- 原始洞察 `CommanderDehakaLevel05`
- 新单位：原始异龙和原始守护者 `CommanderDehakaLevel06`
- 原始异龙和原始守护者升级包 `CommanderDehakaLevel07`
- 新单位：掘地虫宿主和原始穿刺者 `CommanderDehakaLevel08`
- 原始点火虫和原始穿刺者升级包 `CommanderDehakaLevel09`
- 进化的虫群首领 `CommanderDehakaLevel10`
- 新单位：暴龙兽 `CommanderDehakaLevel11`
- 生存本能 `CommanderDehakaLevel12`
- 精英原始异虫升级包 `CommanderDehakaLevel13`
- 泽鲁斯的狡诈 `CommanderDehakaLevel14`
- 基因突变 `CommanderDehakaLevel15`
- MoveChampions `MoveChampions`
- AttackChampions `AttackChampions`
- AttackWorker `AttackWorker`
- 采集 `GatherZerg`
- 返还资源 `ReturnCargo`
- PrimalBuildingUproot `PrimalBuildingUproot`
- 设定集结点 `SetRallyPoint2`
- DehakaLocustFlyingSwoop `DehakaLocustFlyingSwoop`

## Fenix

- 模块：`XMFenix.SC2Mod`
- 缺失总数：0
- 结论：当前未发现明显缺口。

## Horner

- 模块：`XMHorner.SC2Mod`
- 缺失总数：29
- 缺口分类：兵种、升级、技能、按钮

### 兵种

- 官方数量：10
- 缺失数量：1
- 仅有文本/引用命中的条目：1
- 德摩斯维京战机 `HHViking`

### 升级

- 官方数量：21
- 缺失数量：11
- 仅有文本/引用命中的条目：11
- HHAirFleetYamato `HHAirFleetYamato`
- HHDoubleSupply `HHDoubleSupply`
- HHMiraBuildResearchTimeReduction `HHMiraBuildResearchTimeReduction`
- HHProgression12IconUpgrade `HHProgression12IconUpgrade`
- HHProgression14IconUpgrade `HHProgression14IconUpgrade`
- HHSpaceStationNuke `HHSpaceStationNuke`
- MasteryHornerAirStrikeDistance `MasteryHornerAirStrikeDistance`
- MasteryHornerBetterDeathRattle `MasteryHornerBetterDeathRattle`
- MasteryHornerBomberRadius `MasteryHornerBomberRadius`
- MasteryHornerDoubleSalvageChance `MasteryHornerDoubleSalvageChance`
- MasteryHornerMSOBonus `MasteryHornerMSOBonus`

### 技能

- 官方数量：27
- 缺失数量：2
- 仅有文本/引用命中的条目：2
- 雇佣兵升级包 `HHMercCompoundResearch`
- 喷气背包 `255`

### 按钮

- 官方数量：51
- 缺失数量：15
- 仅有文本/引用命中的条目：15
- 霍纳夫妇 `CommanderHornerLevel01`
- 新单位：攻击战斗机 `CommanderHornerLevel02`
- 突击炮舰和忒伊亚铁鸦升级包 `CommanderHornerLevel03`
- 雇佣兵升级包 `CommanderHornerLevel04`
- 呼叫舰队 `CommanderHornerLevel05`
- 十万火急 `CommanderHornerLevel06`
- 帝国星港升级包 `CommanderHornerLevel07`
- 他和她的补给 `CommanderHornerLevel08`
- 恶火和恶蝠升级包 `CommanderHornerLevel09`
- 空间站调度 `CommanderHornerLevel10`
- 耐力训练 `CommanderHornerLevel11`
- 高级武器 `CommanderHornerLevel12`
- 聚变芯体升级包 `CommanderHornerLevel13`
- 爆爆乐 `CommanderHornerLevel14`
- 我的另一半 `CommanderHornerLevel15`

## Karax

- 模块：`XMKarax.SC2Mod`
- 缺失总数：0
- 结论：当前未发现明显缺口。

## Kerrigan

- 模块：`XMKerrigan.SC2Mod`
- 缺失总数：4
- 缺口分类：按钮

### 按钮

- 官方数量：61
- 缺失数量：4
- 仅有文本/引用命中的条目：4
- 召唤坑道虫 `SummonNydusWorm`
- 召唤虫道毁灭者 `SummonNydusCanalAttacker`
- 召唤菌塔 `SummonNydusCanalCreeper`
- 钻地鳞片 `NydusWormIncreasedArmorPassive`

## Mengsk

- 模块：`XMMengsk.SC2Mod`
- 缺失总数：42
- 缺口分类：升级、指挥官进度、技能、按钮

### 升级

- 官方数量：14
- 缺失数量：6
- 仅有文本/引用命中的条目：6
- CommanderPrestigeMengskRoyalGuardMastery `CommanderPrestigeMengskRoyalGuardMastery`
- MasteryMengskRoyalGuardCost `MasteryMengskRoyalGuardCost`
- MasteryMengskRoyalGuardExperienceGainRate `MasteryMengskRoyalGuardExperienceGainRate`
- MasteryMengskRoyalGuardImperialMandateRegeneration `MasteryMengskRoyalGuardImperialMandateRegeneration`
- 蒙斯克 `MengskCommander`
- NuclearAnnihilationMengskNumberMissiles `NuclearAnnihilationMengskNumberMissiles`

### 指挥官进度

- 官方数量：15
- 缺失数量：15
- 法律与秩序 `MengskPHLevel1`
- 扩展武器库 `MengskPHLevel2`
- 新单位：大地碎裂炮 `MengskPHLevel3`
- 辐射打击 `MengskPHLevel4`
- 绝对权威 `MengskPHLevel5`
- 工程站升级包 `MengskPHLevel6`
- 战争恶狼 `MengskPHLevel7`
- 皇家卫队基础升级包 `MengskPHLevel8`
- 新单位：黑色战锤 `MengskPHLevel9`
- 核弹天劫 `MengskPHLevel10`
- 神经毒素弹头 `MengskPHLevel11`
- 新单位：奥古斯格勒的骄傲 `MengskPHLevel12`
- 彻底毁灭 `MengskPHLevel13`
- 皇家卫队高级升级包 `MengskPHLevel14`
- 保证晋升 `MengskPHLevel15`

### 技能

- 官方数量：50
- 缺失数量：2
- 仅有文本/引用命中的条目：2
- 喷漆 `SprayTerran`
- 攻击 `AttackRedirect`

### 按钮

- 官方数量：145
- 缺失数量：19
- 仅有文本/引用命中的条目：4
- 法律与秩序 `CommanderMengskLevel01`
- 扩展武器库 `CommanderMengskLevel02`
- 新单位：大地碎裂炮 `CommanderMengskLevel03`
- 辐射打击 `CommanderMengskLevel04`
- 绝对权威 `CommanderMengskLevel05`
- 工程站升级包 `CommanderMengskLevel06`
- 战争恶狼 `CommanderMengskLevel07`
- 皇家卫队基础升级包 `CommanderMengskLevel08`
- 新单位：黑色战锤 `CommanderMengskLevel09`
- 核弹天劫 `CommanderMengskLevel10`
- 神经毒素弹头 `CommanderMengskLevel11`
- 新单位：奥古斯格勒的骄傲 `CommanderMengskLevel12`
- 彻底毁灭 `CommanderMengskLevel13`
- 皇家卫队高级升级包 `CommanderMengskLevel14`
- 保证晋升 `CommanderMengskLevel15`
- AttackWorker `AttackWorker`
- 返还资源 `ReturnCargo`
- 攻击 `AttackRedirect`
- 回收 `Salvage`

## Nova

- 模块：`XMNova.SC2Mod`
- 缺失总数：40
- 缺口分类：兵种、升级、技能、按钮

### 兵种

- 官方数量：11
- 缺失数量：9
- 仅有文本/引用命中的条目：9
- 部署隐秘女妖 `BansheeNova`
- 部署强击歌利亚 `GoliathNova`
- 部署恶蝠游骑兵 `HellbatNova`
- 部署掠袭解放者 `LiberatorNova`
- 部署劫掠者突击手 `MarauderNova`
- 部署精英陆战队员 `MarineNova`
- 部署铁鸦II型 `RavenNova`
- 死神之首 `ReaperNova`
- 部署重型攻城坦克 `SiegeTankNova`

### 升级

- 官方数量：25
- 缺失数量：2
- 仅有文本/引用命中的条目：2
- AutoHarvester `AutoHarvester`
- 精通 诺娃 狮鹫号消耗 `MasteryNovaGriffinCost`

### 技能

- 官方数量：45
- 缺失数量：3
- 仅有文本/引用命中的条目：2
- 高级隐形力场 `255`
- 升空 `BarracksLiftOff`
- 稳定瞄准 `ChannelSnipe`

### 按钮

- 官方数量：102
- 缺失数量：26
- 仅有文本/引用命中的条目：25
- 隐秘行动 `CommanderNovaBaseTrait`
- 狮鹫号空袭 `CommanderNovaUnlockBombingRun`
- 突击模式 `CommanderNovaUnlockEquipmentChange`
- 兵营升级包 `CommanderNovaBarracksTechLabUpgradesPack`
- 战术空运 `CommanderNovaUnlockGriffinTransport`
- 重工厂升级包 `CommanderNovaFactoryTechLabUpgradesPack`
- 自动化精炼厂 `CommanderNovaAutoRefineries`
- 隐秘行动升级包 `CommanderNovaTechLabandGhostAcademyUpgradesPack`
- 战术聚变打击和全息诱饵 `CommanderNovaUnlockNukeandHoloDecoy`
- 星港升级包 `CommanderNovaBansheeLiberatorStarportTechLabUpgradesPack`
- 研究与开发 `CommanderNovaResearchCostandTimeReduction`
- 铁鸦升级包 `CommanderNovaRavenStarportTechLabUpgradesPack`
- 武器装备 `CommanderNovaDefensiveMatrixDroneCharges`
- 诺娃升级包 `CommanderNovaGhostAcademyUpgradesPack2`
- 随机应变 `CommanderNovaKitSwapCooldownandEnergy`
- TechReactorAI `TechReactorAI`
- 升空 `Lift`
- MengskUnits `MengskUnits`
- 稳定瞄准 `ChannelSnipe`
- MagrailMunitions `MagrailMunitions`
- HellstormMissileBatteries `HellstormMissileBatteries`
- 回收 `Salvage`
- AttackWorker `AttackWorker`
- 返还资源 `ReturnCargo`
- 装载 `CommandCenterLoad`
- 全部卸载 `CommandCenterUnloadAll`

## Raynor

- 模块：`XMRaynor.SC2Mod`
- 缺失总数：26
- 缺口分类：兵种、技能、按钮

### 兵种

- 官方数量：10
- 缺失数量：1
- 仅有文本/引用命中的条目：1
- 攻城坦克 `Siege Tank`

### 技能

- 官方数量：44
- 缺失数量：11
- 仅有文本/引用命中的条目：11
- 升空 `BarracksLiftOff`
- 降下 `SupplyDepotLower`
- 攻击 `AttackRedirect`
- 使用强化剂 `StimpackMarauderRedirect`
- SalvageEffect `SalvageEffect`
- 255 `255`
- 析象扫描 `ScannerSweep`
- 升空 `OrbitalLiftOff`
- BattlecruiserStop `BattlecruiserStop`
- BattlecruiserMove `BattlecruiserMove`
- BattlecruiserAttack `BattlecruiserAttack`

### 按钮

- 官方数量：91
- 缺失数量：14
- 仅有文本/引用命中的条目：14
- TechReactorAI `TechReactorAI`
- 升空 `Lift`
- MengskUnits `MengskUnits`
- 降下 `Lower`
- 攻击 `AttackRedirect`
- 装载 `BunkerLoad`
- 全部卸载 `BunkerUnloadAll`
- HellstormMissileBatteries `HellstormMissileBatteries`
- 回收 `Salvage`
- AttackWorker `AttackWorker`
- 返还资源 `ReturnCargo`
- 装载 `CommandCenterLoad`
- 全部卸载 `CommandCenterUnloadAll`
- 析象扫描 `Scan`

## Stetmann

- 模块：`XMStetmann.SC2Mod`
- 缺失总数：36
- 缺口分类：指挥官进度、技能、按钮

### 指挥官进度

- 官方数量：15
- 缺失数量：10
- 仅有文本/引用命中的条目：3
- 保证斯台特满意 `StetmannLevel1`
- “艾的滋润” `StetmannLevel2`
- 盖瑞：艾星超载 `StetmannLevel3`
- 机械跳虫与机械爆虫升级包 `StetmannLevel4`
- 机械杰作 `StetmannLevel5`
- 新单位：机械潜伏者 `StetmannLevel6`
- 斯台特曼技术帝 `StetmannLevel7`
- 机械刺蛇与机械潜伏者升级包 `StetmannLevel8`
- 永远的朋友 `StetmannLevel9`
- 可爱的小坏蛋们 `StetmannLevel13`

### 技能

- 官方数量：73
- 缺失数量：3
- 仅有文本/引用命中的条目：3
- 采集 `DroneHarvest`
- 基础变异 `255`
- 喷漆 `SprayZerg`

### 按钮

- 官方数量：159
- 缺失数量：23
- 仅有文本/引用命中的条目：9
- 保证斯台特满意 `CommanderStetmannLevel01`
- “艾的滋润” `CommanderStetmannLevel02`
- 盖瑞：艾星超载 `CommanderStetmannLevel03`
- 机械跳虫与机械爆虫升级包 `CommanderStetmannLevel04`
- 机械杰作 `CommanderStetmannLevel05`
- 新单位：机械潜伏者 `CommanderStetmannLevel06`
- 斯台特曼技术帝 `CommanderStetmannLevel07`
- 机械刺蛇与机械潜伏者升级包 `CommanderStetmannLevel08`
- 永远的朋友 `CommanderStetmannLevel09`
- 机械感染者升级包 `CommanderStetmannLevel10`
- 新单位：机械巢式战列空母 `CommanderStetmannLevel11`
- 机械雷兽升级包 `CommanderStetmannLevel12`
- 可爱的小坏蛋们 `CommanderStetmannLevel13`
- 机械尖塔升级包 `CommanderStetmannLevel14`
- 艾贡极限 `CommanderStetmannLevel15`
- AttackWorker `AttackWorker`
- 采集 `GatherZerg`
- 返还资源 `ReturnCargo`
- 设定集结点 `SetRallyPoint2`
- 取消 `CancelMutateMorph`
- StetmannStetzoneAbsorption `StetmannStetzoneAbsorption`
- MoveChampions `MoveChampions`
- AttackChampions `AttackChampions`

## Stukov

- 模块：`XMStukov.SC2Mod`
- 缺失总数：33
- 缺口分类：兵种、建筑、升级、按钮

### 兵种

- 官方数量：6
- 缺失数量：2
- 仅有文本/引用命中的条目：2
- 被感染的平民 `StukovInfestedCivilian`
- 被感染的陆战队员 `StukovInfestedMarine`

### 建筑

- 官方数量：9
- 缺失数量：9
- 仅有文本/引用命中的条目：2
- 被感染的工程站 `StukovEvolutionChamber`
- 被感染的军械库 `StukovInfestedArmory`
- 被感染的兵营 `StukovInfestedBarracks`
- 被感染的移民营 `StukovInfestedCivilianStructure`
- 被感染的指挥中心 `StukovInfestedCommandCenter`
- 被感染的重工厂 `StukovInfestedFactory`
- 被感染的精炼厂 `StukovInfestedRefinery`
- 被感染的星港 `StukovInfestedStarport`
- 被感染的补给站 `StukovInfestedSupplyDepot`

### 升级

- 官方数量：29
- 缺失数量：11
- 仅有文本/引用命中的条目：11
- 指挥官特质 斯托科夫 1 `CommanderStukovPH1`
- 指挥官特质 斯托科夫 10 `CommanderStukovPH10`
- 指挥官特质 斯托科夫 12 `CommanderStukovPH12`
- CommanderStukovPH13 `CommanderStukovPH13`
- 指挥官特质 斯托科夫 2 `CommanderStukovPH2`
- 指挥官特质 斯托科夫 3 `CommanderStukovPH3`
- 指挥官特质 斯托科夫 4 `CommanderStukovPH4`
- 指挥官特质 斯托科夫 5 `CommanderStukovPH5`
- 指挥官特质 斯托科夫 6 `CommanderStukovPH6`
- 指挥官特质 斯托科夫 8 `CommanderStukovPH8`
- CommanderStukovPH9 `CommanderStukovPH9`

### 按钮

- 官方数量：74
- 缺失数量：11
- 仅有文本/引用命中的条目：11
- 新单位：虫巢女王 `CommanderStukovQueenClassic`
- 易燃外肢 `CommanderStukovApocaliskUpgraded`
- 虫巢女王升级包 `CommanderStukovQueenClassicUpgradeCache`
- 升级步兵护甲等级3 `TerranInfantryArmorLevel3`
- 升级战车及舰船钢板等级3 `TerranVehicleAndShipPlatingLevel3`
- AttackWorker `AttackWorker`
- 全部卸载 `CommandCenterUnloadAll`
- 降下 `Lower`
- 停止排放菌毯 `StopGenerateCreep`
- MoveChampions `MoveChampions`
- AttackChampions `AttackChampions`

## Swann

- 模块：`XMSwann.SC2Mod`
- 缺失总数：25
- 缺口分类：兵种、建筑、升级、技能、按钮

### 兵种

- 官方数量：9
- 缺失数量：2
- 仅有文本/引用命中的条目：2
- 恶蝠 `Hellbat`
- 攻城坦克 `Siege Tank`

### 建筑

- 官方数量：6
- 缺失数量：1
- 仅有文本/引用命中的条目：1
- 德拉肯激光钻机 `MiniDrakkenLaserDrill`

### 升级

- 官方数量：25
- 缺失数量：10
- 仅有文本/引用命中的条目：10
- AdvancedConstruction `AdvancedConstruction`
- 精通 斯旺 建筑生命值 `MasterySwannBuildingHealth`
- 精通 斯旺 战斗空投 `MasterySwannCombatDrop`
- 精通 斯旺 永生程序 `MasterySwannImmortalityProtocol`
- 精通 斯旺 激光钻机建造时间 `MasterySwannLaserDrillBuildTime`
- 精通 斯旺 瓦斯采集器消耗 `MasterySwannVespeneHarvesterCost`
- Swann Commander Immortality Protocol `SwannCommanderImmortalityProtocol`
- Swann Commander Vehicle Health `SwannCommanderVehicleHealth`
- Swann Commander Worker Free Repairs `SwannCommanderWorkerFreeRepairs`
- Swann Turret Upgrades `SwannKelMorianTurretUpgrades`

### 技能

- 官方数量：34
- 缺失数量：3
- 仅有文本/引用命中的条目：3
- 重工厂升级包 `330mmBarrageCannons`
- 降下 `SupplyDepotLower`
- 255 `255`

### 按钮

- 官方数量：79
- 缺失数量：9
- 仅有文本/引用命中的条目：9
- MoveChampions `MoveChampions`
- AttackChampions `AttackChampions`
- 降下 `Lower`
- 回收 `Salvage`
- HellstormMissileBatteries `HellstormMissileBatteries`
- AttackWorker `AttackWorker`
- 返还资源 `ReturnCargo`
- 装载 `CommandCenterLoad`
- 全部卸载 `CommandCenterUnloadAll`

## Tychus

- 模块：`XMTychus.SC2Mod`
- 缺失总数：24
- 缺口分类：升级、技能、按钮

### 升级

- 官方数量：20
- 缺失数量：3
- 仅有文本/引用命中的条目：3
- CommanderPrestigeTychusLoneWolfRecruitment `CommanderPrestigeTychusLoneWolfRecruitment`
- 指挥官 - 人类 - 泰凯斯 `TychusCommander`
- TychusCoopFifthHeroUpgrade `TychusCoopFifthHeroUpgrade`

### 技能

- 官方数量：58
- 缺失数量：3
- 仅有文本/引用命中的条目：3
- 震荡弹 `255`
- 88式劝服者 `TychusGhostSnipe`
- 喷漆 `SprayTerran`

### 按钮

- 官方数量：122
- 缺失数量：18
- 仅有文本/引用命中的条目：18
- 有点过去的意思 `CommanderTychusLevel01`
- 兄弟越多越好 `CommanderTychusLevel02`
- 奥丁降世 `CommanderTychusLevel03`
- 新不法之徒：凯文“响尾蛇”韦斯特 `CommanderTychusLevel04`
- 工程站升级包 `CommanderTychusLevel05`
- 新不法之徒：詹姆斯“天狼星”赛克斯 `CommanderTychusLevel06`
- 闪亮登场第一人 `CommanderTychusLevel07`
- 新不法之徒：罗布“弹头哥”博斯韦尔 `CommanderTychusLevel08`
- 要搭飞的吗？ `CommanderTychusLevel09`
- 新不法之徒：维嘉 `CommanderTychusLevel10`
- 顺手牵羊 `CommanderTychusLevel11`
- 初级终极装备包 `CommanderTychusLevel12`
- 全副武装 `CommanderTychusLevel13`
- 高级终极装备包 `CommanderTychusLevel14`
- 红色按钮 `CommanderTychusLevel15`
- AttackChampions `AttackChampions`
- AttackWorker `AttackWorker`
- 返还资源 `ReturnCargo`

## Vorazun

- 模块：`XMVorazun.SC2Mod`
- 缺失总数：0
- 结论：当前未发现明显缺口。

## Zagara

- 模块：`XMZagara.SC2Mod`
- 缺失总数：16
- 缺口分类：按钮

### 按钮

- 官方数量：46
- 缺失数量：16
- 仅有文本/引用命中的条目：16
- 无尽虫群 `CommanderZagaraRelentless`
- 感染空投 `CommanderZagaraMassRoachDrop`
- 幼虫注射 `CommanderZagaraImprovedInjectLarva`
- 爆蚊升级包 `CommanderZagaraScourgeUpgradesPack`
- 新单位：胆汁喷射体 `CommanderZagaraUnlockBileLauncher`
- 爆虫巢穴：哺育腔 `CommanderZagaraVolatileBanelingNest`
- 孕育爆虫和爆蚊 `CommanderZagaraIncubateBanelings`
- 进化腔升级包 `CommanderZagaraEvolutionChamberUpgradesPack`
- 遮天蔽日 `CommanderZagaraImprovedMassRoachDrop`
- 爆虫巢穴升级包 `CommanderZagaraBanelingNestUpgradesPack`
- 跳虫进化：裂变虫 `CommanderZagaraZerglingEvolutionSwarmling`
- 胆汁喷射体升级包 `CommanderZagaraBileLauncherUpgradesPack`
- 爆虫进化：分裂虫 `CommanderZagaraBanelingEvolutionSplitterling`
- 虫母 `CommanderZagaraMasterSpawner`
- MoveChampions `MoveChampions`
- AttackChampions `AttackChampions`

## Zeratul

- 模块：`XMZeratul.SC2Mod`
- 缺失总数：14
- 缺口分类：建筑、升级、技能、按钮

### 建筑

- 官方数量：4
- 缺失数量：1
- 仅有文本/引用命中的条目：1
- 折跃机械台 `RoboticsWarp`

### 升级

- 官方数量：27
- 缺失数量：4
- 仅有文本/引用命中的条目：4
- 撤回阴影 `BacktotheShadows`
- ZeratulCoopEquipmentCostUpgrade `ZeratulCoopEquipmentCostUpgrade`
- ZeratulCoopHeroHalfCostUpgrade `ZeratulCoopHeroHalfCostUpgrade`
- ZeratulCoopMedivacChargesUpgrade `ZeratulCoopMedivacChargesUpgrade`

### 技能

- 官方数量：27
- 缺失数量：7
- 仅有文本/引用命中的条目：7
- 时空通道强化包1 `ZeratulCalldownOdinTargeted`
- 新单位：萨尔纳加禁绝者 `ZeratulBarracksTrain`
- 超维空间技术强化包 `ZeratulEngineeringBayResearch`
- 构造体强化包1 `ZeratulFactoryTrain`
- 黑暗代理 `ZeratulHeroResearch2`
- 黑暗代理 `ZeratulHeroResearch`
- 构造体强化包2 `ZeratulOdinPlatformResearch`

### 按钮

- 官方数量：71
- 缺失数量：2
- 仅有文本/引用命中的条目：2
- DarkTemplarPassive `DarkTemplarPassive`
- DarkArchonPassive `DarkArchonPassive`

