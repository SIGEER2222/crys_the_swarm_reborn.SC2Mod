# 霍纳与汉 / Horner 建筑单位对比

- 当前 active Mod：`D:\MyWork\新建文件夹\mom.report.client\src\MyMod\crys_the_swarm_reborn.SC2Mod\合作指挥官版起义狂潮`
- 指挥官模块：`XMMira.SC2Mod`（存在：是）
- Wiki主要部队文件：`wikitext/06-horner-han.wiki`
- Wiki主要部队：突击炮舰、收割者、恶蝠、寡妇雷、阿斯忒瑞亚怨灵战机、德摩斯维京战机、忒伊亚铁鸦、至尊战列巡航舰、导弹塔
- 判定口径：wiki用于中文主要部队名单；官方JSON用于ID、生产链、生命/人口/费用；active Mod只检查`合作指挥官版起义狂潮`的本指挥官模块加`XMCore/XMFinal`。

## 汇总

| Wiki项 | 官方行 | Wiki未匹配官方 | 官方补充未在Wiki | 当前Mod未命中 | 仅文本命中 | 生产链异常 |
| --- | --- | --- | --- | --- | --- | --- |
| 9 | 10 | 0 | 3 | 0 | 0 | 6 |

## 三方对照

| Wiki项 | 匹配 | 分类 | 官方名称 | ID | 当前Mod | 生产链状态 | 生产/建造/变形 | 数值 | 定义文件 | 备注 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 突击炮舰 | Wiki补充ID | 建筑 | 突击炮舰 | MercenarySpaceStationMira | CUnit已定义：MercenarySpaceStationMira, MercStarportMira, StarportMira | 官方JSON无生产链 |  |  | Mods/XM/XMMira.SC2Mod/Base.SC2Data/GameData/UnitData.xml | wiki主要部队补充：当前Mod为米拉/霍纳旧线命名，按佣兵平台/星港相关ID检查。 |
| 收割者 | 精确匹配 | 单位 | 收割者 | HHReaper | CUnit已定义：ReaperMira, ReaperMiraFlying | 生产链已命中 | HHMercStarportUpgraded / SummonHornerMercenaries / 50晶体矿，14秒 | 生命60，人口1，视野9；50晶体矿，14秒 | Mods/XM/XMMira.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 恶蝠 | 精确匹配 | 单位 | 恶蝠 | HHHellionTank | CUnit已定义：HellionTankMira | 生产链已命中 | HHMercStarportUpgraded / SummonHornerMercenaries / 100晶体矿，14秒 | 生命235，人口2，视野10；100晶体矿，14秒 | Mods/XM/XMMira.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 寡妇雷 | 精确匹配 | 单位 | 寡妇雷 | HHWidowMine | CUnit已定义：WidowMineMira, WidowMineMiraBurrowed | 生产链已命中 | HHMercStarportUpgraded / SummonHornerMercenaries / 100晶体矿，21秒 | 生命90，人口2，视野7；100晶体矿，21秒 | Mods/XM/XMMira.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 阿斯忒瑞亚怨灵战机 | 精确匹配 | 单位 | 阿斯忒瑞亚怨灵战机 | HHWraith | CUnit已定义：WraithMira | 技能缺失 HHStarportTrainHorner | HHStarport / HHStarportTrainHorner / 800晶体矿，400瓦斯，300秒 | 生命400，人口4，视野8；800晶体矿，400瓦斯，300秒 | Mods/XM/XMMira.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 德摩斯维京战机 | 精确匹配 | 单位 | 德摩斯维京战机 | HHVikingFighter | CUnit已定义：VikingFighterMira, VikingAssaultMira | 技能缺失 HHStarportTrainHorner | HHStarport / HHStarportTrainHorner / 800晶体矿，500瓦斯，300秒 | 生命350，人口4，视野10；800晶体矿，500瓦斯，300秒 | Mods/XM/XMMira.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 忒伊亚铁鸦 | 精确匹配 | 单位 | 忒伊亚铁鸦 | HHRaven | CUnit已定义：RavenMira, RavenMiraSiege | 技能缺失 HHStarportTrainHorner | HHStarport / HHStarportTrainHorner / 100晶体矿，200瓦斯，180秒 | 生命140，人口2，视野11；100晶体矿，200瓦斯，180秒 | Mods/XM/XMMira.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 至尊战列巡航舰 | 精确匹配 | 单位 | 至尊战列巡航舰 | HHBattlecruiser | CUnit已定义：BattlecruiserMira | 技能缺失 HHStarportTrainHorner | HHStarport / HHStarportTrainHorner / 1000晶体矿，800瓦斯，300秒 | 生命900，人口10，视野12；1000晶体矿，800瓦斯，300秒 | Mods/XM/XMMira.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 导弹塔 | Wiki补充ID | 建筑 | 导弹塔 | MissileTurretMira | CUnit已定义：MissileTurretMira | 官方JSON无生产链 |  |  | Mods/XM/XMMira.SC2Mod/Base.SC2Data/GameData/UnitData.xml | wiki主要部队补充：霍纳与汉当前Mod旧线使用Mira后缀。 |
|  | 官方补充 | 单位 | 恶火 | HHHellion | CUnit已定义：HellionMira | 技能缺失 MorphToHHHellion | HHHellionTank / MorphToHHHellion / 0晶体矿，4秒 | 生命90，人口2，视野10；0晶体矿，4秒 | Mods/XM/XMMira.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 单位 | 掠食者 | Predator | CUnit已定义：CycloneMira, WidowMineMira, WidowMineMiraBurrowed | 生产链已命中 | HHMercStarportUpgraded / SummonHornerMercenaries / 21秒 | 21秒 | Mods/XM/XMMira.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 单位 | 解放者 | Liberator | CUnit已定义：LiberatorMira, LiberatorMiraAG | 技能缺失 StarportTrain | Starport / StarportTrain / 150晶体矿，125瓦斯，60秒 | 生命180，人口3，视野9；150晶体矿，125瓦斯，60秒 | Mods/XM/XMMira.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |

## 优先排查项

| Wiki项 | 匹配 | 分类 | 官方名称 | ID | 当前Mod | 生产链状态 | 生产/建造/变形 | 数值 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 阿斯忒瑞亚怨灵战机 | 精确匹配 | 单位 | 阿斯忒瑞亚怨灵战机 | HHWraith | CUnit已定义：WraithMira | 技能缺失 HHStarportTrainHorner | HHStarport / HHStarportTrainHorner / 800晶体矿，400瓦斯，300秒 | 生命400，人口4，视野8；800晶体矿，400瓦斯，300秒 |
| 德摩斯维京战机 | 精确匹配 | 单位 | 德摩斯维京战机 | HHVikingFighter | CUnit已定义：VikingFighterMira, VikingAssaultMira | 技能缺失 HHStarportTrainHorner | HHStarport / HHStarportTrainHorner / 800晶体矿，500瓦斯，300秒 | 生命350，人口4，视野10；800晶体矿，500瓦斯，300秒 |
| 忒伊亚铁鸦 | 精确匹配 | 单位 | 忒伊亚铁鸦 | HHRaven | CUnit已定义：RavenMira, RavenMiraSiege | 技能缺失 HHStarportTrainHorner | HHStarport / HHStarportTrainHorner / 100晶体矿，200瓦斯，180秒 | 生命140，人口2，视野11；100晶体矿，200瓦斯，180秒 |
| 至尊战列巡航舰 | 精确匹配 | 单位 | 至尊战列巡航舰 | HHBattlecruiser | CUnit已定义：BattlecruiserMira | 技能缺失 HHStarportTrainHorner | HHStarport / HHStarportTrainHorner / 1000晶体矿，800瓦斯，300秒 | 生命900，人口10，视野12；1000晶体矿，800瓦斯，300秒 |
|  | 官方补充 | 单位 | 恶火 | HHHellion | CUnit已定义：HellionMira | 技能缺失 MorphToHHHellion | HHHellionTank / MorphToHHHellion / 0晶体矿，4秒 | 生命90，人口2，视野10；0晶体矿，4秒 |
|  | 官方补充 | 单位 | 解放者 | Liberator | CUnit已定义：LiberatorMira, LiberatorMiraAG | 技能缺失 StarportTrain | Starport / StarportTrain / 150晶体矿，125瓦斯，60秒 | 生命180，人口3，视野9；150晶体矿，125瓦斯，60秒 |

## Wiki未匹配官方JSON

- 无。

## 官方有但Wiki主要部队未列

| 分类 | 官方名称 | ID | 当前Mod | 生产链 | 数值 |
| --- | --- | --- | --- | --- | --- |
| 单位 | 恶火 | HHHellion | CUnit已定义：HellionMira | HHHellionTank / MorphToHHHellion / 0晶体矿，4秒 | 生命90，人口2，视野10；0晶体矿，4秒 |
| 单位 | 掠食者 | Predator | CUnit已定义：CycloneMira, WidowMineMira, WidowMineMiraBurrowed | HHMercStarportUpgraded / SummonHornerMercenaries / 21秒 | 21秒 |
| 单位 | 解放者 | Liberator | CUnit已定义：LiberatorMira, LiberatorMiraAG | Starport / StarportTrain / 150晶体矿，125瓦斯，60秒 | 生命180，人口3，视野9；150晶体矿，125瓦斯，60秒 |

