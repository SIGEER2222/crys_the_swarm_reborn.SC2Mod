# 斯台特曼 / Stetmann 建筑单位对比

- 当前 active Mod：`D:\MyWork\新建文件夹\mom.report.client\src\MyMod\crys_the_swarm_reborn.SC2Mod\原始mod`
- 指挥官模块：`XMStetmann.SC2Mod`（存在：是）
- Wiki主要部队文件：`wikitext/12-stetmann.wiki`
- Wiki主要部队：机械跳虫、机械爆虫、机械刺蛇、机械潜伏者、机械感染者、机械雷兽、机械腐化者、机械巢式战列空母、机械眼虫、机械脊针爬虫、机械孢子爬虫
- 判定口径：wiki用于中文主要部队名单；官方JSON用于ID、生产链、生命/人口/费用；active Mod只检查`合作指挥官版起义狂潮`的本指挥官模块加`XMCore/XMFinal`。

## 汇总

| Wiki项 | 官方行 | Wiki未匹配官方 | 官方补充未在Wiki | 当前Mod未命中 | 仅文本命中 | 生产链异常 |
| --- | --- | --- | --- | --- | --- | --- |
| 11 | 34 | 0 | 23 | 0 | 0 | 0 |

## 三方对照

| Wiki项 | 匹配 | 分类 | 官方名称 | ID | 当前Mod | 生产链状态 | 生产/建造/变形 | 数值 | 定义文件 | 备注 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 机械跳虫 | 精确匹配 | 单位 | 机械跳虫 | ZerglingStetmann | CUnit已定义：ZerglingStetmann | 生产链已命中 | LarvaStetmann / LarvaTrainStetmann / 25晶体矿，24秒 | 生命35，人口0.5，视野8；25晶体矿，24秒 | Mods/XM/XMStetmann.SC2Mod/Base.SC2Data/GameData/unitdata.xml |  |
| 机械爆虫 | 精确匹配 | 单位 | 机械爆虫 | BanelingStetmann | CUnit已定义：BanelingStetmann | 生产链已命中 | ZerglingStetmann / MorphToBanelingStetmann / 25晶体矿，15瓦斯，12秒 | 生命30，人口0.5，视野8；25晶体矿，15瓦斯，12秒 | Mods/XM/XMStetmann.SC2Mod/Base.SC2Data/GameData/unitdata.xml |  |
| 机械刺蛇 | 精确匹配 | 单位 | 机械刺蛇 | HydraliskStetmann | CUnit已定义：HydraliskStetmann | 生产链已命中 | LarvaStetmann / LarvaTrainStetmann / 100晶体矿，50瓦斯，33秒 | 生命80，人口2，视野9；100晶体矿，50瓦斯，33秒 | Mods/XM/XMStetmann.SC2Mod/Base.SC2Data/GameData/unitdata.xml |  |
| 机械潜伏者 | 精确匹配 | 单位 | 机械潜伏者 | LurkerStetmann | CUnit已定义：LurkerStetmann | 生产链已命中 | HydraliskStetmann / MorphToLurkerStetmann / 50晶体矿，100瓦斯，25秒 | 生命200，人口3，视野10；50晶体矿，100瓦斯，25秒 | Mods/XM/XMStetmann.SC2Mod/Base.SC2Data/GameData/unitdata.xml |  |
| 机械感染者 | 精确匹配 | 单位 | 机械感染者 | InfestorStetmann | CUnit已定义：InfestorStetmann | 生产链已命中 | LarvaStetmann / LarvaTrainStetmann / 100晶体矿，150瓦斯，50秒 | 生命90，人口2，视野10；100晶体矿，150瓦斯，50秒 | Mods/XM/XMStetmann.SC2Mod/Base.SC2Data/GameData/unitdata.xml |  |
| 机械雷兽 | 精确匹配 | 单位 | 机械雷兽 | UltraliskStetmann | CUnit已定义：UltraliskStetmann | 生产链已命中 | LarvaStetmann / LarvaTrainStetmann / 300晶体矿，200瓦斯，55秒 | 生命500，人口6，视野9；300晶体矿，200瓦斯，55秒 | Mods/XM/XMStetmann.SC2Mod/Base.SC2Data/GameData/unitdata.xml |  |
| 机械腐化者 | 精确匹配 | 单位 | 机械腐化者 | CorruptorStetmann | CUnit已定义：CorruptorStetmann | 生产链已命中 | LarvaStetmann / LarvaTrainStetmann / 150晶体矿，100瓦斯，33秒 | 生命200，人口2，视野10；150晶体矿，100瓦斯，33秒 | Mods/XM/XMStetmann.SC2Mod/Base.SC2Data/GameData/unitdata.xml |  |
| 机械巢式战列空母 | 精确匹配 | 单位 | 机械巢式战列空母 | BroodLordStetmann | CUnit已定义：BroodLordStetmann | 生产链已命中 | CorruptorStetmann / MorphToCBroodLordStetmann / 300晶体矿，250瓦斯，33.8332秒 | 生命550，人口8，视野12；300晶体矿，250瓦斯，33.8332秒 | Mods/XM/XMStetmann.SC2Mod/Base.SC2Data/GameData/unitdata.xml |  |
| 机械眼虫 | 精确匹配 | 单位 | 机械眼虫 | OverseerStetmann | CUnit已定义：OverseerStetmann | 生产链已命中 | OverlordStetmann / MorphToOverseerStetmann / 50晶体矿，50瓦斯，16.6665秒 | 生命200，视野11；50晶体矿，50瓦斯，16.6665秒 | Mods/XM/XMStetmann.SC2Mod/Base.SC2Data/GameData/unitdata.xml |  |
| 机械脊针爬虫 | 精确匹配 | 建筑 | 机械脊针爬虫 | SpineCrawlerStetmann | CUnit已定义：SpineCrawlerStetmann | 生产链已命中 | DroneStetmann / ZergBuildStetmann / 150晶体矿，30秒 | 生命300，视野11；150晶体矿，30秒 | Mods/XM/XMStetmann.SC2Mod/Base.SC2Data/GameData/unitdata.xml |  |
| 机械孢子爬虫 | 精确匹配 | 建筑 | 机械孢子爬虫 | SporeCrawlerStetmann | CUnit已定义：SporeCrawlerStetmann | 生产链已命中 | DroneStetmann / ZergBuildStetmann / 125晶体矿，30秒 | 生命400，视野11；125晶体矿，30秒 | Mods/XM/XMStetmann.SC2Mod/Base.SC2Data/GameData/unitdata.xml |  |
|  | 官方补充 | 单位 | 机械工蜂 | DroneStetmann | CUnit已定义：DroneStetmann | 生产链已命中 | LarvaStetmann / LarvaTrainStetmann / 50晶体矿，17秒 | 生命40，人口1，视野8；50晶体矿，17秒 | Mods/XM/XMStetmann.SC2Mod/Base.SC2Data/GameData/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 单位 | 盖瑞 | GaryStetmann | CUnit已定义：GaryStetmann | 官方JSON无生产链 |  | 生命500，视野11 | Mods/XM/XMStetmann.SC2Mod/Base.SC2Data/GameData/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 单位 | 超级盖瑞 | SuperGaryStetmann | CUnit已定义：SuperGaryStetmann | 生产链已命中 | GaryStetmann / MorphToSuperGaryStetmann / 450晶体矿，300瓦斯，15秒 | 生命1000，视野11；450晶体矿，300瓦斯，15秒 | Mods/XM/XMStetmann.SC2Mod/Base.SC2Data/GameData/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 单位 | 机械蟑螂 | RoachStetmann | CUnit已定义：RoachStetmann | 官方JSON无生产链 |  | 生命75，视野9 | Mods/XM/XMStetmann.SC2Mod/Base.SC2Data/GameData/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 单位 | 机械破坏者 | RavagerStetmann | CUnit已定义：RavagerStetmann | 生产链已命中 | RoachStetmann / MorphToRavagerStetmann / 12秒 | 生命80，视野9；12秒 | Mods/XM/XMStetmann.SC2Mod/Base.SC2Data/GameData/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 单位 | 机械潜伏者 | LurkerStetmannBurrowed | CUnit已定义：LurkerStetmannBurrowed | 官方JSON无生产链 |  | 生命200，人口3，视野10；150晶体矿，150瓦斯 | Mods/XM/XMStetmann.SC2Mod/Base.SC2Data/GameData/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 单位 | 机械眼虫 | OverseerStetmannSiegeMode | CUnit已定义：OverseerStetmannSiegeMode | 官方JSON无生产链 |  | 生命200，视野16.5；150晶体矿，50瓦斯 | Mods/XM/XMStetmann.SC2Mod/Base.SC2Data/GameData/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 机械孵化场 | HatcheryStetmann | CUnit已定义：HatcheryStetmann | 生产链已命中 | DroneStetmann / ZergBuildStetmann / 350晶体矿，60秒 | 生命1500，视野10；350晶体矿，60秒 | Mods/XM/XMStetmann.SC2Mod/Base.SC2Data/GameData/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 机械虫穴 | LairStetmann | CUnit已定义：LairStetmann | 生产链已命中 | HatcheryStetmann / UpgradeToLairStetmann / 150晶体矿，100瓦斯，60秒 | 生命2000，视野11；150晶体矿，100瓦斯，60秒 | Mods/XM/XMStetmann.SC2Mod/Base.SC2Data/GameData/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 机械主巢 | HiveStetmann | CUnit已定义：HiveStetmann | 生产链已命中 | LairStetmann / UpgradeToHiveStetmann / 200晶体矿，150瓦斯，60秒 | 生命2500，视野12；200晶体矿，150瓦斯，60秒 | Mods/XM/XMStetmann.SC2Mod/Base.SC2Data/GameData/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 机械萃取房 | ExtractorStetmann | CUnit已定义：ExtractorStetmann | 生产链已命中 | DroneStetmann / ZergBuildStetmann / 75晶体矿，30秒 | 生命500，视野9；75晶体矿，30秒 | Mods/XM/XMStetmann.SC2Mod/Base.SC2Data/GameData/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 机械分裂池 | SpawningPoolStetmann | CUnit已定义：SpawningPoolStetmann | 生产链已命中 | DroneStetmann / ZergBuildStetmann / 250晶体矿，30秒 | 生命1000，视野9；250晶体矿，30秒 | Mods/XM/XMStetmann.SC2Mod/Base.SC2Data/GameData/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 机械进化腔 | EvolutionChamberStetmann | CUnit已定义：EvolutionChamberStetmann | 生产链已命中 | DroneStetmann / ZergBuildStetmann / 125晶体矿，40秒 | 生命750，视野9；125晶体矿，40秒 | Mods/XM/XMStetmann.SC2Mod/Base.SC2Data/GameData/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 机械爆虫巢穴 | BanelingNestStetmann | CUnit已定义：BanelingNestStetmann | 生产链已命中 | DroneStetmann / ZergBuildStetmann / 150晶体矿，50瓦斯，30秒 | 生命850，视野9；150晶体矿，50瓦斯，30秒 | Mods/XM/XMStetmann.SC2Mod/Base.SC2Data/GameData/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 机械刺蛇巢 | HydraliskDenStetmann | CUnit已定义：HydraliskDenStetmann | 生产链已命中 | DroneStetmann / ZergBuildStetmann / 150晶体矿，100瓦斯，40秒 | 生命850，视野9；150晶体矿，100瓦斯，40秒 | Mods/XM/XMStetmann.SC2Mod/Base.SC2Data/GameData/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 机械潜伏者巢穴 | LurkerDenStetmann | CUnit已定义：LurkerDenStetmann | 生产链已命中 | HydraliskDenStetmann / UpgradeToLurkerDenStetmann / 100晶体矿，50瓦斯，30秒 | 生命850，视野9；100晶体矿，50瓦斯，30秒 | Mods/XM/XMStetmann.SC2Mod/Base.SC2Data/GameData/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 机械感染深渊 | InfestationPitStetmann | CUnit已定义：InfestationPitStetmann | 生产链已命中 | DroneStetmann / ZergBuildStetmann / 150晶体矿，100瓦斯，40秒 | 生命850，视野9；150晶体矿，100瓦斯，40秒 | Mods/XM/XMStetmann.SC2Mod/Base.SC2Data/GameData/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 机械尖塔 | SpireStetmann | CUnit已定义：SpireStetmann | 生产链已命中 | DroneStetmann / ZergBuildStetmann / 250晶体矿，200瓦斯，40秒 | 生命850，视野9；250晶体矿，200瓦斯，40秒 | Mods/XM/XMStetmann.SC2Mod/Base.SC2Data/GameData/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 机械巨型尖塔 | GreaterSpireStetmann | CUnit已定义：GreaterSpireStetmann | 生产链已命中 | SpireStetmann / UpgradeToGreaterSpireStetmann / 100晶体矿，150瓦斯，30秒 | 生命1000，视野9；100晶体矿，150瓦斯，30秒 | Mods/XM/XMStetmann.SC2Mod/Base.SC2Data/GameData/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 机械雷兽窟 | UltraliskCavernStetmann | CUnit已定义：UltraliskCavernStetmann | 生产链已命中 | DroneStetmann / ZergBuildStetmann / 200晶体矿，200瓦斯，50秒 | 生命850，视野9；200晶体矿，200瓦斯，50秒 | Mods/XM/XMStetmann.SC2Mod/Base.SC2Data/GameData/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 机械脊针爬虫 | SpineCrawlerUprootedStetmann | CUnit已定义：SpineCrawlerUprootedStetmann | 官方JSON无生产链 |  | 生命300，视野11；150晶体矿 | Mods/XM/XMStetmann.SC2Mod/Base.SC2Data/GameData/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 机械孢子爬虫 | SporeCrawlerUprootedStetmann | CUnit已定义：SporeCrawlerUprootedStetmann | 官方JSON无生产链 |  | 生命400，视野11；125晶体矿 | Mods/XM/XMStetmann.SC2Mod/Base.SC2Data/GameData/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 艾星 | PowerTowerStetmann | CUnit已定义：PowerTowerStetmann | 生产链已命中 | CoopCasterStetmann / DeployPowerTowerStetmann / 2秒 | 生命5，视野12；2秒 | Mods/XM/XMStetmann.SC2Mod/Base.SC2Data/GameData/unitdata.xml | 官方JSON有，wiki主要部队未列。 |

## 优先排查项

- 无。

## Wiki未匹配官方JSON

- 无。

## 官方有但Wiki主要部队未列

| 分类 | 官方名称 | ID | 当前Mod | 生产链 | 数值 |
| --- | --- | --- | --- | --- | --- |
| 单位 | 机械工蜂 | DroneStetmann | CUnit已定义：DroneStetmann | LarvaStetmann / LarvaTrainStetmann / 50晶体矿，17秒 | 生命40，人口1，视野8；50晶体矿，17秒 |
| 单位 | 盖瑞 | GaryStetmann | CUnit已定义：GaryStetmann | 官方JSON无生产链 | 生命500，视野11 |
| 单位 | 超级盖瑞 | SuperGaryStetmann | CUnit已定义：SuperGaryStetmann | GaryStetmann / MorphToSuperGaryStetmann / 450晶体矿，300瓦斯，15秒 | 生命1000，视野11；450晶体矿，300瓦斯，15秒 |
| 单位 | 机械蟑螂 | RoachStetmann | CUnit已定义：RoachStetmann | 官方JSON无生产链 | 生命75，视野9 |
| 单位 | 机械破坏者 | RavagerStetmann | CUnit已定义：RavagerStetmann | RoachStetmann / MorphToRavagerStetmann / 12秒 | 生命80，视野9；12秒 |
| 单位 | 机械潜伏者 | LurkerStetmannBurrowed | CUnit已定义：LurkerStetmannBurrowed | 官方JSON无生产链 | 生命200，人口3，视野10；150晶体矿，150瓦斯 |
| 单位 | 机械眼虫 | OverseerStetmannSiegeMode | CUnit已定义：OverseerStetmannSiegeMode | 官方JSON无生产链 | 生命200，视野16.5；150晶体矿，50瓦斯 |
| 建筑 | 机械孵化场 | HatcheryStetmann | CUnit已定义：HatcheryStetmann | DroneStetmann / ZergBuildStetmann / 350晶体矿，60秒 | 生命1500，视野10；350晶体矿，60秒 |
| 建筑 | 机械虫穴 | LairStetmann | CUnit已定义：LairStetmann | HatcheryStetmann / UpgradeToLairStetmann / 150晶体矿，100瓦斯，60秒 | 生命2000，视野11；150晶体矿，100瓦斯，60秒 |
| 建筑 | 机械主巢 | HiveStetmann | CUnit已定义：HiveStetmann | LairStetmann / UpgradeToHiveStetmann / 200晶体矿，150瓦斯，60秒 | 生命2500，视野12；200晶体矿，150瓦斯，60秒 |
| 建筑 | 机械萃取房 | ExtractorStetmann | CUnit已定义：ExtractorStetmann | DroneStetmann / ZergBuildStetmann / 75晶体矿，30秒 | 生命500，视野9；75晶体矿，30秒 |
| 建筑 | 机械分裂池 | SpawningPoolStetmann | CUnit已定义：SpawningPoolStetmann | DroneStetmann / ZergBuildStetmann / 250晶体矿，30秒 | 生命1000，视野9；250晶体矿，30秒 |
| 建筑 | 机械进化腔 | EvolutionChamberStetmann | CUnit已定义：EvolutionChamberStetmann | DroneStetmann / ZergBuildStetmann / 125晶体矿，40秒 | 生命750，视野9；125晶体矿，40秒 |
| 建筑 | 机械爆虫巢穴 | BanelingNestStetmann | CUnit已定义：BanelingNestStetmann | DroneStetmann / ZergBuildStetmann / 150晶体矿，50瓦斯，30秒 | 生命850，视野9；150晶体矿，50瓦斯，30秒 |
| 建筑 | 机械刺蛇巢 | HydraliskDenStetmann | CUnit已定义：HydraliskDenStetmann | DroneStetmann / ZergBuildStetmann / 150晶体矿，100瓦斯，40秒 | 生命850，视野9；150晶体矿，100瓦斯，40秒 |
| 建筑 | 机械潜伏者巢穴 | LurkerDenStetmann | CUnit已定义：LurkerDenStetmann | HydraliskDenStetmann / UpgradeToLurkerDenStetmann / 100晶体矿，50瓦斯，30秒 | 生命850，视野9；100晶体矿，50瓦斯，30秒 |
| 建筑 | 机械感染深渊 | InfestationPitStetmann | CUnit已定义：InfestationPitStetmann | DroneStetmann / ZergBuildStetmann / 150晶体矿，100瓦斯，40秒 | 生命850，视野9；150晶体矿，100瓦斯，40秒 |
| 建筑 | 机械尖塔 | SpireStetmann | CUnit已定义：SpireStetmann | DroneStetmann / ZergBuildStetmann / 250晶体矿，200瓦斯，40秒 | 生命850，视野9；250晶体矿，200瓦斯，40秒 |
| 建筑 | 机械巨型尖塔 | GreaterSpireStetmann | CUnit已定义：GreaterSpireStetmann | SpireStetmann / UpgradeToGreaterSpireStetmann / 100晶体矿，150瓦斯，30秒 | 生命1000，视野9；100晶体矿，150瓦斯，30秒 |
| 建筑 | 机械雷兽窟 | UltraliskCavernStetmann | CUnit已定义：UltraliskCavernStetmann | DroneStetmann / ZergBuildStetmann / 200晶体矿，200瓦斯，50秒 | 生命850，视野9；200晶体矿，200瓦斯，50秒 |
| 建筑 | 机械脊针爬虫 | SpineCrawlerUprootedStetmann | CUnit已定义：SpineCrawlerUprootedStetmann | 官方JSON无生产链 | 生命300，视野11；150晶体矿 |
| 建筑 | 机械孢子爬虫 | SporeCrawlerUprootedStetmann | CUnit已定义：SporeCrawlerUprootedStetmann | 官方JSON无生产链 | 生命400，视野11；125晶体矿 |
| 建筑 | 艾星 | PowerTowerStetmann | CUnit已定义：PowerTowerStetmann | CoopCasterStetmann / DeployPowerTowerStetmann / 2秒 | 生命5，视野12；2秒 |

