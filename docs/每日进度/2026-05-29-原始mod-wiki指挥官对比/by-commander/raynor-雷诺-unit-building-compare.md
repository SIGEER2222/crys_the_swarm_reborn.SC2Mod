# 雷诺 / Raynor 建筑单位对比

- 当前 active Mod：`D:\MyWork\新建文件夹\mom.report.client\src\MyMod\crys_the_swarm_reborn.SC2Mod\原始mod`
- 指挥官模块：`XMRaynor.SC2Mod`（存在：否）
- Wiki主要部队文件：`wikitext/09-raynor.wiki`
- Wiki主要部队：陆战队员、医疗兵、火蝠、劫掠者、秃鹫、攻城坦克、维京战机、女妖、战列巡航舰、轨道控制基地、地堡、导弹塔
- 判定口径：wiki用于中文主要部队名单；官方JSON用于ID、生产链、生命/人口/费用；active Mod只检查`合作指挥官版起义狂潮`的本指挥官模块加`XMCore/XMFinal`。

## 汇总

| Wiki项 | 官方行 | Wiki未匹配官方 | 官方补充未在Wiki | 当前Mod未命中 | 仅文本命中 | 生产链异常 |
| --- | --- | --- | --- | --- | --- | --- |
| 12 | 16 | 0 | 4 | 0 | 12 | 10 |

## 三方对照

| Wiki项 | 匹配 | 分类 | 官方名称 | ID | 当前Mod | 生产链状态 | 生产/建造/变形 | 数值 | 定义文件 | 备注 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 陆战队员 | 精确匹配 | 单位 | 陆战队员 | Marine | 仅文本/引用命中：Marine | 技能缺失 BarracksTrain | Barracks / BarracksTrain / 50晶体矿，25秒 | 生命45，人口1，视野9；50晶体矿，25秒 |  |  |
| 医疗兵 | 精确匹配 | 单位 | 医疗兵 | Medic | CUnit已定义：Medic | 技能缺失 BarracksTrain | Barracks / BarracksTrain / 40秒 | 40秒 | Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 火蝠 | 精确匹配 | 单位 | 火蝠 | Firebat | CUnit已定义：Firebat | 技能缺失 BarracksTrain | Barracks / BarracksTrain |  | Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 劫掠者 | 精确匹配 | 单位 | 劫掠者 | Marauder | 仅文本/引用命中：Marauder | 技能缺失 BarracksTrain | Barracks / BarracksTrain / 100晶体矿，25瓦斯，30秒 | 生命125，人口2，视野10；100晶体矿，25瓦斯，30秒 |  |  |
| 秃鹫 | 精确匹配 | 单位 | 秃鹫 | Vulture | CUnit已定义：Vulture | 技能缺失 FactoryTrain | Factory / FactoryTrain |  | Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 攻城坦克 | 精确匹配 | 单位 | 攻城坦克 | SiegeTank | 仅文本/引用命中：SiegeTank | 技能缺失 FactoryTrain | Factory / FactoryTrain / 150晶体矿，125瓦斯，45秒 | 生命175，人口3，视野11；150晶体矿，125瓦斯，45秒 |  |  |
| 维京战机 | 精确匹配 | 单位 | 维京战机 | Viking | CUnit已定义：Viking | 生产者和技能均未命中：HHStarport / HHStarportTrainHorner | HHStarport / HHStarportTrainHorner / 800晶体矿，500瓦斯，300秒 | 800晶体矿，500瓦斯，300秒 | Mods/XM/XMCore.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 女妖 | 精确匹配 | 单位 | 女妖 | Banshee | 仅文本/引用命中：Banshee | 技能缺失 StarportTrain | Starport / StarportTrain / 150晶体矿，100瓦斯，60秒 | 生命140，人口3，视野10；150晶体矿，100瓦斯，60秒 |  |  |
| 战列巡航舰 | 精确匹配 | 单位 | 战列巡航舰 | Battlecruiser | 仅文本/引用命中：Battlecruiser | 生产链已命中 | SCV / TerranBuild / 400晶体矿，300瓦斯，65秒 | 生命550，人口6，视野12；400晶体矿，300瓦斯，65秒 |  |  |
| 轨道控制基地 | 别名匹配 | 建筑 | 轨道控制基地 | OrbitalCommand | 仅文本/引用命中：OrbitalCommand | 技能缺失 UpgradeToOrbital | CommandCenter / UpgradeToOrbital / 150晶体矿，0秒 | 生命1500，视野11；150晶体矿，0秒 |  |  |
| 地堡 | 精确匹配 | 建筑 | 地堡 | Bunker | 仅文本/引用命中：Bunker | 生产链已命中 | SCV / TerranBuild / 100晶体矿，20秒 | 生命400，视野10；100晶体矿，20秒 |  |  |
| 导弹塔 | 精确匹配 | 建筑 | 导弹塔 | MissileTurret | 仅文本/引用命中：MissileTurret | 生产链已命中 | SCV / TerranBuild / 100晶体矿，25秒 | 生命250，视野11；100晶体矿，25秒 |  |  |
|  | 官方补充 | 单位 | SCV | SCV | 仅文本/引用命中：SCV | 技能缺失 CommandCenterTrain | CommandCenter / CommandCenterTrain / 50晶体矿，17秒 | 生命45，人口1，视野8；50晶体矿，17秒 |  | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 兵营 | Barracks | 仅文本/引用命中：Barracks | 生产链已命中 | SCV / TerranBuild / 150晶体矿，65秒 | 生命1000，视野9；150晶体矿，65秒 |  | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 补给站 | SupplyDepot | 仅文本/引用命中：SupplyDepot | 生产链已命中 | SCV / TerranBuild / 100晶体矿，30秒 | 生命400，视野9；100晶体矿，30秒 |  | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 指挥中心 | CommandCenter | 仅文本/引用命中：CommandCenter | 生产链已命中 | SCV / TerranBuild / 400晶体矿，100秒 | 生命1500，视野11；400晶体矿，100秒 |  | 官方JSON有，wiki主要部队未列。 |

## 优先排查项

| Wiki项 | 匹配 | 分类 | 官方名称 | ID | 当前Mod | 生产链状态 | 生产/建造/变形 | 数值 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 陆战队员 | 精确匹配 | 单位 | 陆战队员 | Marine | 仅文本/引用命中：Marine | 技能缺失 BarracksTrain | Barracks / BarracksTrain / 50晶体矿，25秒 | 生命45，人口1，视野9；50晶体矿，25秒 |
| 医疗兵 | 精确匹配 | 单位 | 医疗兵 | Medic | CUnit已定义：Medic | 技能缺失 BarracksTrain | Barracks / BarracksTrain / 40秒 | 40秒 |
| 火蝠 | 精确匹配 | 单位 | 火蝠 | Firebat | CUnit已定义：Firebat | 技能缺失 BarracksTrain | Barracks / BarracksTrain |  |
| 劫掠者 | 精确匹配 | 单位 | 劫掠者 | Marauder | 仅文本/引用命中：Marauder | 技能缺失 BarracksTrain | Barracks / BarracksTrain / 100晶体矿，25瓦斯，30秒 | 生命125，人口2，视野10；100晶体矿，25瓦斯，30秒 |
| 秃鹫 | 精确匹配 | 单位 | 秃鹫 | Vulture | CUnit已定义：Vulture | 技能缺失 FactoryTrain | Factory / FactoryTrain |  |
| 攻城坦克 | 精确匹配 | 单位 | 攻城坦克 | SiegeTank | 仅文本/引用命中：SiegeTank | 技能缺失 FactoryTrain | Factory / FactoryTrain / 150晶体矿，125瓦斯，45秒 | 生命175，人口3，视野11；150晶体矿，125瓦斯，45秒 |
| 维京战机 | 精确匹配 | 单位 | 维京战机 | Viking | CUnit已定义：Viking | 生产者和技能均未命中：HHStarport / HHStarportTrainHorner | HHStarport / HHStarportTrainHorner / 800晶体矿，500瓦斯，300秒 | 800晶体矿，500瓦斯，300秒 |
| 女妖 | 精确匹配 | 单位 | 女妖 | Banshee | 仅文本/引用命中：Banshee | 技能缺失 StarportTrain | Starport / StarportTrain / 150晶体矿，100瓦斯，60秒 | 生命140，人口3，视野10；150晶体矿，100瓦斯，60秒 |
| 战列巡航舰 | 精确匹配 | 单位 | 战列巡航舰 | Battlecruiser | 仅文本/引用命中：Battlecruiser | 生产链已命中 | SCV / TerranBuild / 400晶体矿，300瓦斯，65秒 | 生命550，人口6，视野12；400晶体矿，300瓦斯，65秒 |
| 轨道控制基地 | 别名匹配 | 建筑 | 轨道控制基地 | OrbitalCommand | 仅文本/引用命中：OrbitalCommand | 技能缺失 UpgradeToOrbital | CommandCenter / UpgradeToOrbital / 150晶体矿，0秒 | 生命1500，视野11；150晶体矿，0秒 |
| 地堡 | 精确匹配 | 建筑 | 地堡 | Bunker | 仅文本/引用命中：Bunker | 生产链已命中 | SCV / TerranBuild / 100晶体矿，20秒 | 生命400，视野10；100晶体矿，20秒 |
| 导弹塔 | 精确匹配 | 建筑 | 导弹塔 | MissileTurret | 仅文本/引用命中：MissileTurret | 生产链已命中 | SCV / TerranBuild / 100晶体矿，25秒 | 生命250，视野11；100晶体矿，25秒 |
|  | 官方补充 | 单位 | SCV | SCV | 仅文本/引用命中：SCV | 技能缺失 CommandCenterTrain | CommandCenter / CommandCenterTrain / 50晶体矿，17秒 | 生命45，人口1，视野8；50晶体矿，17秒 |
|  | 官方补充 | 建筑 | 兵营 | Barracks | 仅文本/引用命中：Barracks | 生产链已命中 | SCV / TerranBuild / 150晶体矿，65秒 | 生命1000，视野9；150晶体矿，65秒 |
|  | 官方补充 | 建筑 | 补给站 | SupplyDepot | 仅文本/引用命中：SupplyDepot | 生产链已命中 | SCV / TerranBuild / 100晶体矿，30秒 | 生命400，视野9；100晶体矿，30秒 |
|  | 官方补充 | 建筑 | 指挥中心 | CommandCenter | 仅文本/引用命中：CommandCenter | 生产链已命中 | SCV / TerranBuild / 400晶体矿，100秒 | 生命1500，视野11；400晶体矿，100秒 |

## Wiki未匹配官方JSON

- 无。

## 官方有但Wiki主要部队未列

| 分类 | 官方名称 | ID | 当前Mod | 生产链 | 数值 |
| --- | --- | --- | --- | --- | --- |
| 单位 | SCV | SCV | 仅文本/引用命中：SCV | CommandCenter / CommandCenterTrain / 50晶体矿，17秒 | 生命45，人口1，视野8；50晶体矿，17秒 |
| 建筑 | 兵营 | Barracks | 仅文本/引用命中：Barracks | SCV / TerranBuild / 150晶体矿，65秒 | 生命1000，视野9；150晶体矿，65秒 |
| 建筑 | 补给站 | SupplyDepot | 仅文本/引用命中：SupplyDepot | SCV / TerranBuild / 100晶体矿，30秒 | 生命400，视野9；100晶体矿，30秒 |
| 建筑 | 指挥中心 | CommandCenter | 仅文本/引用命中：CommandCenter | SCV / TerranBuild / 400晶体矿，100秒 | 生命1500，视野11；400晶体矿，100秒 |

