# 斯旺 / Swann 建筑单位对比

- 当前 active Mod：`D:\MyWork\新建文件夹\mom.report.client\src\MyMod\crys_the_swarm_reborn.SC2Mod\原始mod`
- 指挥官模块：`XMSwann.SC2Mod`（存在：是）
- Wiki主要部队文件：`wikitext/14-swann.wiki`
- Wiki主要部队：恶蝠、歌利亚武装机器人、攻城坦克、飓风、雷神、怨灵战机、大力神、科学船、爆弹比利、热辣贝蒂、转转小子
- 判定口径：wiki用于中文主要部队名单；官方JSON用于ID、生产链、生命/人口/费用；active Mod只检查`合作指挥官版起义狂潮`的本指挥官模块加`XMCore/XMFinal`。

## 汇总

| Wiki项 | 官方行 | Wiki未匹配官方 | 官方补充未在Wiki | 当前Mod未命中 | 仅文本命中 | 生产链异常 |
| --- | --- | --- | --- | --- | --- | --- |
| 11 | 15 | 0 | 5 | 0 | 14 | 4 |

## 三方对照

| Wiki项 | 匹配 | 分类 | 官方名称 | ID | 当前Mod | 生产链状态 | 生产/建造/变形 | 数值 | 定义文件 | 备注 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 恶蝠 | 精确匹配 | 单位 | 恶蝠 | HellionTank | 仅文本/引用命中：HellionTank, Hellbat | 生产链已命中 | Hellion / MorphToHellionTank / 0晶体矿，4秒 | 生命135，人口2，视野10；0晶体矿，4秒 |  |  |
| 歌利亚武装机器人 | 别名匹配 | 单位 | 歌利亚武装机器人 | Goliath | 仅文本/引用命中：Goliath | 技能缺失 FactoryTrainNova | Factory / FactoryTrainNova / 750晶体矿，250瓦斯，300秒 | 750晶体矿，250瓦斯，300秒 |  |  |
| 攻城坦克 | 精确匹配 | 单位 | 攻城坦克 | SiegeTank | 仅文本/引用命中：SiegeTank | 生产链已命中 | Factory / FactoryTrain / 150晶体矿，125瓦斯，45秒 | 生命175，人口3，视野11；150晶体矿，125瓦斯，45秒 |  |  |
| 飓风 | 精确匹配 | 单位 | 飓风 | Cyclone | 仅文本/引用命中：Cyclone | 生产链已命中 | Factory / FactoryTrain / 150晶体矿，100瓦斯，45秒 | 生命120，人口3，视野11；150晶体矿，100瓦斯，45秒 |  |  |
| 雷神 | Wiki补充ID | 单位 | 雷神 | ThorSwann | CUnit已定义：ThorSwann | 官方JSON无生产链 |  |  | Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/UnitData.xml | wiki主要部队补充：斯旺雷神优先检查ThorSwann，再检查通用Thor。 |
| 怨灵战机 | 精确匹配 | 单位 | 怨灵战机 | Wraith | 仅文本/引用命中：Wraith | 生产者和技能均未命中：HHStarport / HHStarportTrainHorner | HHStarport / HHStarportTrainHorner / 800晶体矿，400瓦斯，300秒 | 800晶体矿，400瓦斯，300秒 |  |  |
| 大力神 | 精确匹配 | 单位 | 大力神 | Hercules | 仅文本/引用命中：Hercules | 生产链已命中 | Starport / StarportTrain / 100晶体矿，50瓦斯，40秒 | 人口3；100晶体矿，50瓦斯，40秒 |  |  |
| 科学船 | 精确匹配 | 单位 | 科学船 | ScienceVessel | 仅文本/引用命中：ScienceVessel | 生产链已命中 | Starport / StarportTrain |  |  |  |
| 爆弹比利 | 别名匹配 | 建筑 | 毁灭炮塔 | KelMorianGrenadeTurret | 仅文本/引用命中：KelMorianGrenadeTurret | 生产链已命中 | SCV / TerranBuild / 150晶体矿，26.25秒 | 生命300，视野9；150晶体矿，26.25秒 |  |  |
| 热辣贝蒂 | 别名匹配 | 建筑 | 末日炮塔 | PerditionTurret | 仅文本/引用命中：PerditionTurret | 生产链已命中 | SCV / TerranBuild / 23秒 | 23秒 |  |  |
| 转转小子 | 别名匹配 | 建筑 | 导弹塔 | MissileTurret | 仅文本/引用命中：MissileTurret | 生产链已命中 | SCV / TerranBuild / 100晶体矿，25秒 | 生命250，视野11；100晶体矿，25秒 |  |  |
|  | 官方补充 | 单位 | 恶火 | Hellion | 仅文本/引用命中：Hellion | 生产链已命中 | HellionTank / MorphToHellion / 0晶体矿，4秒 | 生命90，人口2，视野10；0晶体矿，4秒 |  | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 单位 | SCV | SCV | 仅文本/引用命中：SCV | 技能缺失 CommandCenterTrain | CommandCenter / CommandCenterTrain / 50晶体矿，17秒 | 生命45，人口1，视野8；50晶体矿，17秒 |  | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 补给站 | SupplyDepot | 仅文本/引用命中：SupplyDepot | 生产链已命中 | SCV / TerranBuild / 100晶体矿，30秒 | 生命400，视野9；100晶体矿，30秒 |  | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 德拉肯激光钻机 | DrakkenLaserDrillCoop | CUnit已定义：DrakkenLaserDrillCoop | 生产者和技能均未命中：KelMorianWorker / KelMorianWorkerBuild | KelMorianWorker / KelMorianWorkerBuild / 60秒 | 生命3000，视野14；60秒 | Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 指挥中心 | CommandCenter | 仅文本/引用命中：CommandCenter | 生产链已命中 | SCV / TerranBuild / 400晶体矿，100秒 | 生命1500，视野11；400晶体矿，100秒 |  | 官方JSON有，wiki主要部队未列。 |

## 优先排查项

| Wiki项 | 匹配 | 分类 | 官方名称 | ID | 当前Mod | 生产链状态 | 生产/建造/变形 | 数值 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 恶蝠 | 精确匹配 | 单位 | 恶蝠 | HellionTank | 仅文本/引用命中：HellionTank, Hellbat | 生产链已命中 | Hellion / MorphToHellionTank / 0晶体矿，4秒 | 生命135，人口2，视野10；0晶体矿，4秒 |
| 歌利亚武装机器人 | 别名匹配 | 单位 | 歌利亚武装机器人 | Goliath | 仅文本/引用命中：Goliath | 技能缺失 FactoryTrainNova | Factory / FactoryTrainNova / 750晶体矿，250瓦斯，300秒 | 750晶体矿，250瓦斯，300秒 |
| 攻城坦克 | 精确匹配 | 单位 | 攻城坦克 | SiegeTank | 仅文本/引用命中：SiegeTank | 生产链已命中 | Factory / FactoryTrain / 150晶体矿，125瓦斯，45秒 | 生命175，人口3，视野11；150晶体矿，125瓦斯，45秒 |
| 飓风 | 精确匹配 | 单位 | 飓风 | Cyclone | 仅文本/引用命中：Cyclone | 生产链已命中 | Factory / FactoryTrain / 150晶体矿，100瓦斯，45秒 | 生命120，人口3，视野11；150晶体矿，100瓦斯，45秒 |
| 怨灵战机 | 精确匹配 | 单位 | 怨灵战机 | Wraith | 仅文本/引用命中：Wraith | 生产者和技能均未命中：HHStarport / HHStarportTrainHorner | HHStarport / HHStarportTrainHorner / 800晶体矿，400瓦斯，300秒 | 800晶体矿，400瓦斯，300秒 |
| 大力神 | 精确匹配 | 单位 | 大力神 | Hercules | 仅文本/引用命中：Hercules | 生产链已命中 | Starport / StarportTrain / 100晶体矿，50瓦斯，40秒 | 人口3；100晶体矿，50瓦斯，40秒 |
| 科学船 | 精确匹配 | 单位 | 科学船 | ScienceVessel | 仅文本/引用命中：ScienceVessel | 生产链已命中 | Starport / StarportTrain |  |
| 爆弹比利 | 别名匹配 | 建筑 | 毁灭炮塔 | KelMorianGrenadeTurret | 仅文本/引用命中：KelMorianGrenadeTurret | 生产链已命中 | SCV / TerranBuild / 150晶体矿，26.25秒 | 生命300，视野9；150晶体矿，26.25秒 |
| 热辣贝蒂 | 别名匹配 | 建筑 | 末日炮塔 | PerditionTurret | 仅文本/引用命中：PerditionTurret | 生产链已命中 | SCV / TerranBuild / 23秒 | 23秒 |
| 转转小子 | 别名匹配 | 建筑 | 导弹塔 | MissileTurret | 仅文本/引用命中：MissileTurret | 生产链已命中 | SCV / TerranBuild / 100晶体矿，25秒 | 生命250，视野11；100晶体矿，25秒 |
|  | 官方补充 | 单位 | 恶火 | Hellion | 仅文本/引用命中：Hellion | 生产链已命中 | HellionTank / MorphToHellion / 0晶体矿，4秒 | 生命90，人口2，视野10；0晶体矿，4秒 |
|  | 官方补充 | 单位 | SCV | SCV | 仅文本/引用命中：SCV | 技能缺失 CommandCenterTrain | CommandCenter / CommandCenterTrain / 50晶体矿，17秒 | 生命45，人口1，视野8；50晶体矿，17秒 |
|  | 官方补充 | 建筑 | 补给站 | SupplyDepot | 仅文本/引用命中：SupplyDepot | 生产链已命中 | SCV / TerranBuild / 100晶体矿，30秒 | 生命400，视野9；100晶体矿，30秒 |
|  | 官方补充 | 建筑 | 德拉肯激光钻机 | DrakkenLaserDrillCoop | CUnit已定义：DrakkenLaserDrillCoop | 生产者和技能均未命中：KelMorianWorker / KelMorianWorkerBuild | KelMorianWorker / KelMorianWorkerBuild / 60秒 | 生命3000，视野14；60秒 |
|  | 官方补充 | 建筑 | 指挥中心 | CommandCenter | 仅文本/引用命中：CommandCenter | 生产链已命中 | SCV / TerranBuild / 400晶体矿，100秒 | 生命1500，视野11；400晶体矿，100秒 |

## Wiki未匹配官方JSON

- 无。

## 官方有但Wiki主要部队未列

| 分类 | 官方名称 | ID | 当前Mod | 生产链 | 数值 |
| --- | --- | --- | --- | --- | --- |
| 单位 | 恶火 | Hellion | 仅文本/引用命中：Hellion | HellionTank / MorphToHellion / 0晶体矿，4秒 | 生命90，人口2，视野10；0晶体矿，4秒 |
| 单位 | SCV | SCV | 仅文本/引用命中：SCV | CommandCenter / CommandCenterTrain / 50晶体矿，17秒 | 生命45，人口1，视野8；50晶体矿，17秒 |
| 建筑 | 补给站 | SupplyDepot | 仅文本/引用命中：SupplyDepot | SCV / TerranBuild / 100晶体矿，30秒 | 生命400，视野9；100晶体矿，30秒 |
| 建筑 | 德拉肯激光钻机 | DrakkenLaserDrillCoop | CUnit已定义：DrakkenLaserDrillCoop | KelMorianWorker / KelMorianWorkerBuild / 60秒 | 生命3000，视野14；60秒 |
| 建筑 | 指挥中心 | CommandCenter | 仅文本/引用命中：CommandCenter | SCV / TerranBuild / 400晶体矿，100秒 | 生命1500，视野11；400晶体矿，100秒 |

