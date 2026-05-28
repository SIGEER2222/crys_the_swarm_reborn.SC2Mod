# 官方指挥官名册一致性审计

- 生成时间：2026/5/28 16:49:17
- 官方数据：`D:\MyWork\新建文件夹\mom.report.client\src\MyMod\crys_the_swarm_reborn.SC2Mod\游戏数据\官方合作指挥官\commanders`
- 目的：批量找出类似 Stukov 的错收/漏收候选。该报告是静态审计，不等于进游戏验证。

## 汇总

| 指挥官 | 名册 | 命令卡未覆盖 | 中间链覆盖 | 无生产链 | 泛用生产链 | 中间形态 |
| --- | --- | --- | --- | --- | --- | --- |
| Abathur | 14 | 0 | 0 | 0 | 9 | 0 |
| Alarak | 10 | 4 | 0 | 0 | 4 | 0 |
| Artanis | 12 | 6 | 0 | 0 | 6 | 0 |
| Dehaka | 25 | 0 | 0 | 0 | 0 | 0 |
| Fenix | 12 | 3 | 0 | 0 | 5 | 0 |
| Horner | 10 | 0 | 0 | 0 | 1 | 0 |
| Karax | 13 | 5 | 0 | 0 | 6 | 0 |
| Kerrigan | 10 | 0 | 0 | 0 | 8 | 0 |
| Mengsk | 27 | 1 | 0 | 5 | 0 | 0 |
| Nova | 16 | 16 | 0 | 1 | 0 | 0 |
| Raynor | 16 | 13 | 0 | 0 | 3 | 0 |
| Stetmann | 34 | 0 | 0 | 0 | 0 | 0 |
| Stukov | 15 | 3 | 0 | 0 | 2 | 0 |
| Swann | 15 | 14 | 0 | 0 | 4 | 0 |
| Tychus | 14 | 6 | 0 | 0 | 1 | 0 |
| Vorazun | 10 | 3 | 0 | 0 | 3 | 0 |
| Zagara | 9 | 1 | 0 | 0 | 5 | 0 |
| Zeratul | 12 | 5 | 0 | 0 | 3 | 0 |

## 说明

- `命令卡未覆盖`：本指挥官建筑/单位命令卡上有训练、建造、变形按钮，但没有被任何名册项的 `production` / `production_options` 覆盖，优先查漏收。
- `中间链覆盖`：命令卡生产蛋/茧等中间形态，最终单位已经通过中间形态的生产链覆盖，通常不是漏收。
- `无生产链`：名册有单位或建筑，但没有提取到生产链，优先查是否只是展示项、召唤项或提取器漏链。
- `泛用生产链`：单位来自 `TechUnit`，但生产者/技能偏普通基础链，优先查是否像 Stukov 虫后/跳虫一样误收。
- `中间形态`：名册单位像 Cocoon/Egg/Spawner/Dummy，通常应追到最终单位。
- 已按人工确认过滤：Kerrigan 没有爆虫；Stetmann 机械蟑螂按机械感染者技能生成处理；Dehaka 本轮暂不排查。

## Abathur

### 命令卡未覆盖

- 无。

### 中间链已覆盖

- 无。

### 名册有但无生产链

- 无。

### 泛用生产链候选

| 原因 | 名称 | Unit ID | 生产链 |
| --- | --- | --- | --- |
| TechUnit 归属存在，但生产者/技能偏泛用，可能是共享或误收单位 | 异龙 | Mutalisk | Larva / LarvaTrain,Train5 / Mutalisk |
| TechUnit 归属存在，但生产者/技能偏泛用，可能是共享或误收单位 | 蟑螂 | Roach | Larva / LarvaTrain,Train10 / Roach |
| TechUnit 归属存在，但生产者/技能偏泛用，可能是共享或误收单位 | 虫群宿主 | SwarmHost | Larva / LarvaTrain,Train16 / SwarmHostMP |
| TechUnit 归属存在，但生产者/技能偏泛用，可能是共享或误收单位 | 虫后 | SwarmQueen | Hatchery / TrainQueen,Train1 / Queen |
| TechUnit 归属存在，但生产者/技能偏泛用，可能是共享或误收单位 | 蟑螂 | RoachCorpser | Drone / ZergBuild,Build14 / RoachWarren |
| TechUnit 归属存在，但生产者/技能偏泛用，可能是共享或误收单位 | 蟑螂 | RoachVile | Drone / ZergBuild,Build14 / RoachWarren |
| TechUnit 归属存在，但生产者/技能偏泛用，可能是共享或误收单位 | 飞蛇 | Viper | Larva / LarvaTrain,Train13 / Viper |
| TechUnit 归属存在，但生产者/技能偏泛用，可能是共享或误收单位 | 脊针爬虫 | SpineCrawler | Drone / ZergBuild,Build15 / SpineCrawler |
| TechUnit 归属存在，但生产者/技能偏泛用，可能是共享或误收单位 | 孢子爬虫 | SporeCrawler | Drone / ZergBuild,Build16 / SporeCrawler |

### 中间形态候选

- 无。

## Alarak

### 命令卡未覆盖

| 原因 | 生产者 | 按钮 | 技能命令 | 需求 |
| --- | --- | --- | --- | --- |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | 传送门 (Gateway) | 折跃保护者 (SentryFenix) | GatewayTrain,Train15 |  |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | 传送门 (Gateway) | 折跃使徒 (WarpInAdept) | GatewayTrain,Train7 |  |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | 传送门 (Gateway) | 折跃黑暗圣堂武士 (DarkTemplar) | GatewayTrain,Train5 |  |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | 传送门 (Gateway) | 变形为折跃门 (UpgradeToWarpGate) | UpgradeToWarpGate,Execute |  |

### 中间链已覆盖

- 无。

### 名册有但无生产链

- 无。

### 泛用生产链候选

| 原因 | 名称 | Unit ID | 生产链 |
| --- | --- | --- | --- |
| TechUnit 归属存在，但生产者/技能偏泛用，可能是共享或误收单位 | 天罚行者 | ColossusTaldarim | Probe / ProtossBuild,Build13 / RoboticsBay |
| TechUnit 归属存在，但生产者/技能偏泛用，可能是共享或误收单位 | 无情先锋 | ImmortalTaldarim | Probe / ProtossBuild,Build14 / RoboticsFacility |
| TechUnit 归属存在，但生产者/技能偏泛用，可能是共享或误收单位 | 传送门 | Gateway | Probe / ProtossBuild,Build4 / Gateway |
| TechUnit 归属存在，但生产者/技能偏泛用，可能是共享或误收单位 | 光影议会 | TwilightCouncil | Probe / ProtossBuild,Build7 / TwilightCouncil |

### 中间形态候选

- 无。

## Artanis

### 命令卡未覆盖

| 原因 | 生产者 | 按钮 | 技能命令 | 需求 |
| --- | --- | --- | --- | --- |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | 传送门 (Gateway) | 折跃保护者 (SentryFenix) | GatewayTrain,Train15 |  |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | 传送门 (Gateway) | 折跃使徒 (WarpInAdept) | GatewayTrain,Train7 |  |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | 传送门 (Gateway) | 折跃黑暗圣堂武士 (DarkTemplar) | GatewayTrain,Train5 |  |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | 传送门 (Gateway) | 变形为折跃门 (UpgradeToWarpGate) | UpgradeToWarpGate,Execute |  |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | 折跃机械台 (RoboticsFacilityWarp) | MorphBackToRoboticsFacility (MorphBackToRoboticsFacility) | MorphBackToRoboticsFacility,Execute |  |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | 高阶圣堂武士 (HighTemplar) | 执政官融合 (AWrp) | ArchonWarp,SelectedUnits |  |

### 中间链已覆盖

- 无。

### 名册有但无生产链

- 无。

### 泛用生产链候选

| 原因 | 名称 | Unit ID | 生产链 |
| --- | --- | --- | --- |
| TechUnit 归属存在，但生产者/技能偏泛用，可能是共享或误收单位 | 不朽者 | ImmortalAiur | Probe / ProtossBuild,Build14 / RoboticsFacility |
| TechUnit 归属存在，但生产者/技能偏泛用，可能是共享或误收单位 | 凤凰 | PhoenixAiur | Probe / ProtossBuild,Build6 / FleetBeacon |
| TechUnit 归属存在，但生产者/技能偏泛用，可能是共享或误收单位 | 传送门 | Gateway | Probe / ProtossBuild,Build4 / Gateway |
| TechUnit 归属存在，但生产者/技能偏泛用，可能是共享或误收单位 | 机械研究所 | RoboticsBay | Probe / ProtossBuild,Build13 / RoboticsBay |
| TechUnit 归属存在，但生产者/技能偏泛用，可能是共享或误收单位 | 折跃机械台 | RoboticsFacilityWarp | Probe / ProtossBuild,Build18 / WarpInRoboticsWarpFacility |
| TechUnit 归属存在，但生产者/技能偏泛用，可能是共享或误收单位 | 光影议会 | TwilightCouncil | Probe / ProtossBuild,Build7 / TwilightCouncil |

### 中间形态候选

- 无。

## Dehaka

- 本轮按用户确认暂不排查。

### 命令卡未覆盖

- 无。

### 中间链已覆盖

- 无。

### 名册有但无生产链

- 无。

### 泛用生产链候选

- 无。

### 中间形态候选

- 无。

## Fenix

### 命令卡未覆盖

| 原因 | 生产者 | 按钮 | 技能命令 | 需求 |
| --- | --- | --- | --- | --- |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | 传送门 (Gateway) | 折跃追猎者 (Stalker) | GatewayTrain,Train2 |  |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | 传送门 (Gateway) | 折跃黑暗圣堂武士 (DarkTemplar) | GatewayTrain,Train5 |  |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | 传送门 (Gateway) | 变形为折跃门 (UpgradeToWarpGate) | UpgradeToWarpGate,Execute |  |

### 中间链已覆盖

- 无。

### 名册有但无生产链

- 无。

### 泛用生产链候选

| 原因 | 名称 | Unit ID | 生产链 |
| --- | --- | --- | --- |
| TechUnit 归属存在，但生产者/技能偏泛用，可能是共享或误收单位 | 巨像 | ColossusPurifier | Probe / ProtossBuild,Build13 / RoboticsBay |
| TechUnit 归属存在，但生产者/技能偏泛用，可能是共享或误收单位 | 折跃侦察机 | Scout | Probe / ProtossBuild,Build10 / Stargate |
| TechUnit 归属存在，但生产者/技能偏泛用，可能是共享或误收单位 | 传送门 | Gateway | Probe / ProtossBuild,Build4 / Gateway |
| TechUnit 归属存在，但生产者/技能偏泛用，可能是共享或误收单位 | 机械研究所 | RoboticsBay | Probe / ProtossBuild,Build13 / RoboticsBay |
| TechUnit 归属存在，但生产者/技能偏泛用，可能是共享或误收单位 | 光影议会 | TwilightCouncil | Probe / ProtossBuild,Build7 / TwilightCouncil |

### 中间形态候选

- 无。

## Horner

### 命令卡未覆盖

- 无。

### 中间链已覆盖

- 无。

### 名册有但无生产链

- 无。

### 泛用生产链候选

| 原因 | 名称 | Unit ID | 生产链 |
| --- | --- | --- | --- |
| TechUnit 归属存在，但生产者/技能偏泛用，可能是共享或误收单位 | 解放者 | Liberator | Starport / StarportTrain,Train7 / Liberator |

### 中间形态候选

- 无。

## Karax

### 命令卡未覆盖

| 原因 | 生产者 | 按钮 | 技能命令 | 需求 |
| --- | --- | --- | --- | --- |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | 传送门 (Gateway) | 折跃保护者 (SentryFenix) | GatewayTrain,Train15 |  |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | 传送门 (Gateway) | 折跃追猎者 (Stalker) | GatewayTrain,Train2 |  |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | 传送门 (Gateway) | 折跃使徒 (WarpInAdept) | GatewayTrain,Train7 |  |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | 传送门 (Gateway) | 折跃黑暗圣堂武士 (DarkTemplar) | GatewayTrain,Train5 |  |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | 传送门 (Gateway) | 变形为折跃门 (UpgradeToWarpGate) | UpgradeToWarpGate,Execute |  |

### 中间链已覆盖

- 无。

### 名册有但无生产链

- 无。

### 泛用生产链候选

| 原因 | 名称 | Unit ID | 生产链 |
| --- | --- | --- | --- |
| TechUnit 归属存在，但生产者/技能偏泛用，可能是共享或误收单位 | 不朽者 | ImmortalAiur | Probe / ProtossBuild,Build14 / RoboticsFacility |
| TechUnit 归属存在，但生产者/技能偏泛用，可能是共享或误收单位 | 侦察机 | PhoenixPurifier | Probe / ProtossBuild,Build6 / FleetBeacon |
| TechUnit 归属存在，但生产者/技能偏泛用，可能是共享或误收单位 | 折跃侦察机 | Scout | Probe / ProtossBuild,Build10 / Stargate |
| TechUnit 归属存在，但生产者/技能偏泛用，可能是共享或误收单位 | 传送门 | Gateway | Probe / ProtossBuild,Build4 / Gateway |
| TechUnit 归属存在，但生产者/技能偏泛用，可能是共享或误收单位 | 护盾充能器 | ShieldBattery | Probe / ProtossBuild,Build16 / ShieldBattery |
| TechUnit 归属存在，但生产者/技能偏泛用，可能是共享或误收单位 | 光影议会 | TwilightCouncil | Probe / ProtossBuild,Build7 / TwilightCouncil |

### 中间形态候选

- 无。

## Kerrigan

### 命令卡未覆盖

- 无。

### 中间链已覆盖

- 无。

### 名册有但无生产链

- 无。

### 泛用生产链候选

| 原因 | 名称 | Unit ID | 生产链 |
| --- | --- | --- | --- |
| TechUnit 归属存在，但生产者/技能偏泛用，可能是共享或误收单位 | 刺蛇 | Hydralisk | Larva / LarvaTrain,Train4 / Hydralisk |
| TechUnit 归属存在，但生产者/技能偏泛用，可能是共享或误收单位 | 异龙 | MutaliskBroodlord | Drone / ZergBuild,Build7 / Spire |
| TechUnit 归属存在，但生产者/技能偏泛用，可能是共享或误收单位 | 虫后 | SwarmQueen | Hatchery / TrainQueen,Train1 / Queen |
| TechUnit 归属存在，但生产者/技能偏泛用，可能是共享或误收单位 | 雷兽 | Ultralisk | Larva / LarvaTrain,Train7 / Ultralisk |
| TechUnit 归属存在，但生产者/技能偏泛用，可能是共享或误收单位 | 跳虫 | Zergling | Larva / LarvaTrain,Train2 / Zergling |
| TechUnit 归属存在，但生产者/技能偏泛用，可能是共享或误收单位 | 虫道网络 | NydusNetwork | Drone / ZergBuild,Build10 / NydusNetwork |
| TechUnit 归属存在，但生产者/技能偏泛用，可能是共享或误收单位 | 脊针爬虫 | SpineCrawler | Drone / ZergBuild,Build15 / SpineCrawler |
| TechUnit 归属存在，但生产者/技能偏泛用，可能是共享或误收单位 | 孢子爬虫 | SporeCrawler | Drone / ZergBuild,Build16 / SporeCrawler |

### 中间形态候选

- 无。

## Mengsk

### 命令卡未覆盖

| 原因 | 生产者 | 按钮 | 技能命令 | 需求 |
| --- | --- | --- | --- | --- |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | 帝国劳工 (SCVMengsk) | 建造精炼厂 (RefineryMengsk) | TerranBuildMengsk,Build2 |  |

### 中间链已覆盖

- 无。

### 名册有但无生产链

| 原因 | 名称 | Tech ID | Unit ID | 来源 |
| --- | --- | --- | --- | --- |
| 名册/TechUnit 有归属，但没有生产链 | 帝国 火箭筒 冲锋队 | TrooperMengskAA | TrooperMengskAA | supplemental curated roster |
| 名册/TechUnit 有归属，但没有生产链 | 帝国 火焰器 冲锋队 | TrooperMengskFlamethrower | TrooperMengskFlamethrower | supplemental curated roster |
| 名册/TechUnit 有归属，但没有生产链 | 帝国 突击手 冲锋队 | TrooperMengskImproved | TrooperMengskImproved | supplemental curated roster |
| 名册/TechUnit 有归属，但没有生产链 | 攻城坦克 | SiegeTankMengskSieged | SiegeTankMengskSieged | supplemental curated roster |
| 名册/TechUnit 有归属，但没有生产链 | 天空之怒 | VikingMengskAssault | VikingMengskAssault | supplemental curated roster |

### 泛用生产链候选

- 无。

### 中间形态候选

- 无。

## Nova

### 命令卡未覆盖

| 原因 | 生产者 | 按钮 | 技能命令 | 需求 |
| --- | --- | --- | --- | --- |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | 兵营 (Barracks) | Medic (Medic) | BarracksTrain,Train5 |  |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | 兵营 (Barracks) | 训练幽灵 (Ghost) | BarracksTrain,Train3 |  |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | 兵营 (Barracks) | 训练劫掠者 (Marauder) | BarracksTrain,Train4 |  |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | SCV (SCV) | 建造感应塔 (SensorTower) | TerranBuild,Build9 |  |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | SCV (SCV) | PsiDisruptor (PsiDisruptor) | TerranBuild,Build8 |  |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | SCV (SCV) | 建造毁灭炮塔 (BuildKelMorianRocketTurret) | TerranBuild,Build27 |  |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | SCV (SCV) | 建造精炼厂 (Refinery) | TerranBuild,Build3 |  |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | SCV (SCV) | 建造补给站 (SupplyDepot) | TerranBuild,Build2 |  |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | SCV (SCV) | 建造工程站 (EngineeringBay) | TerranBuild,Build5 |  |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | SCV (SCV) | 建造地堡 (Bunker) | TerranBuild,Build7 |  |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | SCV (SCV) | 建造感应塔 (SensorTower) | TerranBuild,Build9 |  |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | SCV (SCV) | 建造幽灵军校 (GhostAcademy) | TerranBuild,Build10 |  |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | SCV (SCV) | 建造重工厂 (Factory) | TerranBuild,Build11 |  |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | SCV (SCV) | 建造军械库 (Armory) | TerranBuild,Build14 |  |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | SCV (SCV) | 建造星港 (Starport) | TerranBuild,Build12 |  |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | SCV (SCV) | 建造聚变芯体 (FusionCore) | TerranBuild,Build16 |  |

### 中间链已覆盖

- 无。

### 名册有但无生产链

| 原因 | 名称 | Tech ID | Unit ID | 来源 |
| --- | --- | --- | --- | --- |
| 名册/TechUnit 有归属，但没有生产链 | 死神之首 | ReaperNova | MercReaper | mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/userdata.xml |

### 泛用生产链候选

- 无。

### 中间形态候选

- 无。

## Raynor

### 命令卡未覆盖

| 原因 | 生产者 | 按钮 | 技能命令 | 需求 |
| --- | --- | --- | --- | --- |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | 兵营 (Barracks) | 部署特战幽灵 (TrainGhostNova) | BarracksTrainNova,Train3 |  |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | 兵营 (Barracks) | 训练幽灵 (Ghost) | BarracksTrain,Train3 |  |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | SCV (SCV) | 建造幽灵军校 (GhostAcademyNova) | TerranBuild,Build15 |  |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | SCV (SCV) | 建造感应塔 (SensorTower) | TerranBuild,Build9 |  |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | SCV (SCV) | PsiDisruptor (PsiDisruptor) | TerranBuild,Build8 |  |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | SCV (SCV) | 建造毁灭炮塔 (BuildKelMorianRocketTurret) | TerranBuild,Build27 |  |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | SCV (SCV) | 建造精炼厂 (Refinery) | TerranBuild,Build3 |  |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | SCV (SCV) | 建造工程站 (EngineeringBay) | TerranBuild,Build5 |  |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | SCV (SCV) | 建造感应塔 (SensorTower) | TerranBuild,Build9 |  |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | SCV (SCV) | 建造幽灵军校 (GhostAcademy) | TerranBuild,Build10 |  |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | SCV (SCV) | 建造重工厂 (Factory) | TerranBuild,Build11 |  |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | SCV (SCV) | 建造军械库 (Armory) | TerranBuild,Build14 |  |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | SCV (SCV) | 建造星港 (Starport) | TerranBuild,Build12 |  |

### 中间链已覆盖

- 无。

### 名册有但无生产链

- 无。

### 泛用生产链候选

| 原因 | 名称 | Unit ID | 生产链 |
| --- | --- | --- | --- |
| TechUnit 归属存在，但生产者/技能偏泛用，可能是共享或误收单位 | 秃鹫 | Vulture | Factory / FactoryTrain,Train10 / Vulture |
| TechUnit 归属存在，但生产者/技能偏泛用，可能是共享或误收单位 | 女妖 | Banshee | Starport / StarportTrain,Train2 / Banshee |
| TechUnit 归属存在，但生产者/技能偏泛用，可能是共享或误收单位 | 攻城坦克 | SiegeTank | Factory / FactoryTrain,Train2 / SiegeTank |

### 中间形态候选

- 无。

## Stetmann

### 命令卡未覆盖

- 无。

### 中间链已覆盖

- 无。

### 名册有但无生产链

- 无。

### 泛用生产链候选

- 无。

### 中间形态候选

- 无。

## Stukov

### 命令卡未覆盖

| 原因 | 生产者 | 按钮 | 技能命令 | 需求 |
| --- | --- | --- | --- | --- |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | 被感染的指挥中心 (SICommandCenter) | 孵化王虫 (SIOverlord) | SICommandCenterTrain,Train3 |  |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | 被感染的重工厂 (SIFactory) | 孵化被感染的响尾蛇战车 (SIDiamondBack) | SIFactoryTrain,Train3 |  |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | 被感染的星港 (SIStarport) | 孵化被感染的女妖 (SIBanshee) | SIStarportTrain,Train1 |  |

### 中间链已覆盖

- 无。

### 名册有但无生产链

- 无。

### 泛用生产链候选

| 原因 | 名称 | Unit ID | 生产链 |
| --- | --- | --- | --- |
| TechUnit 归属存在，但生产者/技能偏泛用，可能是共享或误收单位 | 虫后 | SwarmQueen | Hatchery / TrainQueen,Train1 / Queen |
| TechUnit 归属存在，但生产者/技能偏泛用，可能是共享或误收单位 | 跳虫 | Zergling | Larva / LarvaTrain,Train2 / Zergling |

### 中间形态候选

- 无。

## Swann

### 命令卡未覆盖

| 原因 | 生产者 | 按钮 | 技能命令 | 需求 |
| --- | --- | --- | --- | --- |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | SCV (SCV) | 建造幽灵军校 (GhostAcademyNova) | TerranBuild,Build15 |  |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | SCV (SCV) | 建造磁轨炮塔 (BuildLaserTurret) | TerranBuildFullRefund,Build1 |  |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | SCV (SCV) | 建造感应塔 (SensorTower) | TerranBuild,Build9 |  |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | SCV (SCV) | PsiDisruptor (PsiDisruptor) | TerranBuild,Build8 |  |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | SCV (SCV) | 建造精炼厂 (Refinery) | TerranBuild,Build3 |  |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | SCV (SCV) | 建造兵营 (Barracks) | TerranBuild,Build4 |  |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | SCV (SCV) | 建造工程站 (EngineeringBay) | TerranBuild,Build5 |  |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | SCV (SCV) | 建造地堡 (Bunker) | TerranBuild,Build7 |  |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | SCV (SCV) | 建造感应塔 (SensorTower) | TerranBuild,Build9 |  |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | SCV (SCV) | 建造幽灵军校 (GhostAcademy) | TerranBuild,Build10 |  |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | SCV (SCV) | 建造重工厂 (Factory) | TerranBuild,Build11 |  |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | SCV (SCV) | 建造军械库 (Armory) | TerranBuild,Build14 |  |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | SCV (SCV) | 建造星港 (Starport) | TerranBuild,Build12 |  |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | SCV (SCV) | 建造聚变芯体 (FusionCore) | TerranBuild,Build16 |  |

### 中间链已覆盖

- 无。

### 名册有但无生产链

- 无。

### 泛用生产链候选

| 原因 | 名称 | Unit ID | 生产链 |
| --- | --- | --- | --- |
| TechUnit 归属存在，但生产者/技能偏泛用，可能是共享或误收单位 | 飓风 | Cyclone | Factory / FactoryTrain,Train8 / BuildCyclone |
| TechUnit 归属存在，但生产者/技能偏泛用，可能是共享或误收单位 | 大力神 | Hercules | Starport / StarportTrain,Train6 / BuildHercules |
| TechUnit 归属存在，但生产者/技能偏泛用，可能是共享或误收单位 | 科学船 | ScienceVessel | Starport / StarportTrain,Train9 / BuildScienceVessel |
| TechUnit 归属存在，但生产者/技能偏泛用，可能是共享或误收单位 | 攻城坦克 | SiegeTank | Factory / FactoryTrain,Train2 / SiegeTank |

### 中间形态候选

- 无。

## Tychus

### 命令卡未覆盖

| 原因 | 生产者 | 按钮 | 技能命令 | 需求 |
| --- | --- | --- | --- | --- |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | SCV (TychusSCV) | 建造指挥中心 (TychusCommandCenter) | TychusTerranBuild,Build6 |  |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | SCV (TychusSCV) | 建造精炼厂 (TychusRefinery) | TychusTerranBuild,Build3 |  |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | SCV (TychusSCV) | 建造乔伊·雷酒吧 (BuildTychusBar) | TychusTerranBuild,Build13 |  |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | SCV (TychusSCV) | 建造工程站 (TychusEngineeringBay) | TychusTerranBuild,Build7 |  |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | SCV (TychusSCV) | 制造自动机炮 (TychusSCVAutoTurret) | TychusTerranBuild,Build5 |  |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | SCV (TychusSCV) | 建造医疗运输机平台 (BuildTychusMedivacPlatform) | TychusTerranBuild,Build14 |  |

### 中间链已覆盖

- 无。

### 名册有但无生产链

- 无。

### 泛用生产链候选

| 原因 | 名称 | Unit ID | 生产链 |
| --- | --- | --- | --- |
| TechUnit 归属存在，但生产者/技能偏泛用，可能是共享或误收单位 | 劫掠者 | Marauder | Barracks / BarracksTrain,Train4 / Marauder |

### 中间形态候选

- 无。

## Vorazun

### 命令卡未覆盖

| 原因 | 生产者 | 按钮 | 技能命令 | 需求 |
| --- | --- | --- | --- | --- |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | 传送门 (Gateway) | 折跃保护者 (SentryFenix) | GatewayTrain,Train15 |  |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | 传送门 (Gateway) | 折跃使徒 (WarpInAdept) | GatewayTrain,Train7 |  |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | 传送门 (Gateway) | 变形为折跃门 (UpgradeToWarpGate) | UpgradeToWarpGate,Execute |  |

### 中间链已覆盖

- 无。

### 名册有但无生产链

- 无。

### 泛用生产链候选

| 原因 | 名称 | Unit ID | 生产链 |
| --- | --- | --- | --- |
| TechUnit 归属存在，但生产者/技能偏泛用，可能是共享或误收单位 | 海盗船 | CorsairMP | Probe / ProtossBuild,Build6 / FleetBeacon |
| TechUnit 归属存在，但生产者/技能偏泛用，可能是共享或误收单位 | 传送门 | Gateway | Probe / ProtossBuild,Build4 / Gateway |
| TechUnit 归属存在，但生产者/技能偏泛用，可能是共享或误收单位 | 光影议会 | TwilightCouncil | Probe / ProtossBuild,Build7 / TwilightCouncil |

### 中间形态候选

- 无。

## Zagara

### 命令卡未覆盖

| 原因 | 生产者 | 按钮 | 技能命令 | 需求 |
| --- | --- | --- | --- | --- |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | 腐化者 (Corruptor) | 变异为巢虫领主 (BroodLord) | MorphToBroodLord,Execute |  |

### 中间链已覆盖

- 无。

### 名册有但无生产链

- 无。

### 泛用生产链候选

| 原因 | 名称 | Unit ID | 生产链 |
| --- | --- | --- | --- |
| TechUnit 归属存在，但生产者/技能偏泛用，可能是共享或误收单位 | 腐化者 | Corruptor | Larva / LarvaTrain,Train12 / Corruptor |
| TechUnit 归属存在，但生产者/技能偏泛用，可能是共享或误收单位 | 虫后 | SwarmQueen | Hatchery / TrainQueen,Train1 / Queen |
| TechUnit 归属存在，但生产者/技能偏泛用，可能是共享或误收单位 | 跳虫 | Zergling | Larva / LarvaTrain,Train2 / Zergling |
| TechUnit 归属存在，但生产者/技能偏泛用，可能是共享或误收单位 | 脊针爬虫 | SpineCrawler | Drone / ZergBuild,Build15 / SpineCrawler |
| TechUnit 归属存在，但生产者/技能偏泛用，可能是共享或误收单位 | 孢子爬虫 | SporeCrawler | Drone / ZergBuild,Build16 / SporeCrawler |

### 中间形态候选

- 无。

## Zeratul

### 命令卡未覆盖

| 原因 | 生产者 | 按钮 | 技能命令 | 需求 |
| --- | --- | --- | --- | --- |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | 传送门 (Gateway) | 折跃保护者 (SentryFenix) | GatewayTrain,Train15 |  |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | 传送门 (Gateway) | 折跃追猎者 (Stalker) | GatewayTrain,Train2 |  |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | 传送门 (Gateway) | 折跃使徒 (WarpInAdept) | GatewayTrain,Train7 |  |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | 传送门 (Gateway) | 折跃黑暗圣堂武士 (DarkTemplar) | GatewayTrain,Train5 |  |
| 建筑/单位命令卡有生产按钮，但名册生产项未覆盖 | 传送门 (Gateway) | 变形为折跃门 (UpgradeToWarpGate) | UpgradeToWarpGate,Execute |  |

### 中间链已覆盖

- 无。

### 名册有但无生产链

- 无。

### 泛用生产链候选

| 原因 | 名称 | Unit ID | 生产链 |
| --- | --- | --- | --- |
| TechUnit 归属存在，但生产者/技能偏泛用，可能是共享或误收单位 | 侦测器 | Observer | RoboticsFacility / RoboticsFacilityTrain,Train2 / Observer |
| TechUnit 归属存在，但生产者/技能偏泛用，可能是共享或误收单位 | 黑暗圣坛 | DarkShrine | Probe / ProtossBuild,Build12 / DarkShrine |
| TechUnit 归属存在，但生产者/技能偏泛用，可能是共享或误收单位 | 传送门 | Gateway | Probe / ProtossBuild,Build4 / Gateway |

### 中间形态候选

- 无。

