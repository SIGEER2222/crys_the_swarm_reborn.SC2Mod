# 蒙斯克 / Mengsk 建筑单位对比

- 当前 active Mod：`D:\MyWork\新建文件夹\mom.report.client\src\MyMod\crys_the_swarm_reborn.SC2Mod\原始mod`
- 指挥官模块：`XMMengsk.SC2Mod`（存在：是）
- Wiki主要部队文件：`wikitext/10-mengsk.wiki`
- Wiki主要部队：帝国冲锋队、帝国仲裁机、帝国见证者、壁垒卫士、元首鬼影、冲击分队、黑色战锤、天空之怒、奥古斯特格勒的骄傲、补给地堡、导弹塔、大地碎裂炮
- 判定口径：wiki用于中文主要部队名单；官方JSON用于ID、生产链、生命/人口/费用；active Mod只检查`合作指挥官版起义狂潮`的本指挥官模块加`XMCore/XMFinal`。

## 汇总

| Wiki项 | 官方行 | Wiki未匹配官方 | 官方补充未在Wiki | 当前Mod未命中 | 仅文本命中 | 生产链异常 |
| --- | --- | --- | --- | --- | --- | --- |
| 12 | 27 | 0 | 14 | 0 | 0 | 0 |

## 三方对照

| Wiki项 | 匹配 | 分类 | 官方名称 | ID | 当前Mod | 生产链状态 | 生产/建造/变形 | 数值 | 定义文件 | 备注 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 帝国冲锋队 | 精确匹配 | 单位 | 帝国冲锋队 | TrooperMengsk | CUnit已定义：TrooperMengsk | 生产链已命中 | CommandCenterMengsk / CommandCenterMengskTrainWithAlerts / 40晶体矿，8秒 | 生命45，人口1，视野9；40晶体矿，8秒 | Mods/XM/XMMengsk.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 帝国仲裁机 | 精确匹配 | 单位 | 帝国仲裁机 | MedivacMengsk | CUnit已定义：MedivacMengsk | 生产链已命中 | StarportMengsk / StarportMengskTrain / 100晶体矿，50瓦斯，21秒 | 生命150，人口2，视野11；100晶体矿，50瓦斯，21秒 | Mods/XM/XMMengsk.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 帝国见证者 | 精确匹配 | 单位 | 帝国见证者 | RavenMengsk | CUnit已定义：RavenMengsk | 生产链已命中 | StarportMengsk / StarportMengskTrain / 100晶体矿，100瓦斯，30秒 | 生命350，人口2，视野11；100晶体矿，100瓦斯，30秒 | Mods/XM/XMMengsk.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 帝国见证者 | 精确匹配 | 单位 | 帝国见证者 | RavenMengskSieged | CUnit已定义：RavenMengskSieged | 生产链已命中 | RavenMengsk / RavenMengskMorphtoRavenMengskSieged / 0晶体矿，0瓦斯，0.75秒 | 生命350，人口2，视野15；0晶体矿，0瓦斯，0.75秒 | Mods/XM/XMMengsk.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 壁垒卫士 | 精确匹配 | 单位 | 壁垒卫士 | MarauderMengsk | CUnit已定义：MarauderMengsk | 生产链已命中 | BarracksMengsk / BarracksMengskTrain / 125晶体矿，350瓦斯，30秒 | 生命300，人口4，视野10；125晶体矿，350瓦斯，30秒 | Mods/XM/XMMengsk.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 元首鬼影 | 精确匹配 | 单位 | 元首鬼影 | GhostMengsk | CUnit已定义：GhostMengsk | 生产链已命中 | BarracksMengsk / BarracksMengskTrain / 200晶体矿，500瓦斯，40秒 | 生命200，人口4，视野11；200晶体矿，500瓦斯，40秒 | Mods/XM/XMMengsk.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 冲击分队 | 精确匹配 | 单位 | 冲击分队 | SiegeTankMengsk | CUnit已定义：SiegeTankMengsk | 生产链已命中 | FactoryMengsk / FactoryMengskTrain / 150晶体矿，425瓦斯，45秒 | 生命350，人口6，视野11；150晶体矿，425瓦斯，45秒 | Mods/XM/XMMengsk.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 黑色战锤 | 精确匹配 | 单位 | 黑色战锤 | ThorMengsk | CUnit已定义：ThorMengsk | 生产链已命中 | FactoryMengsk / FactoryMengskTrain / 300晶体矿，600瓦斯，60秒 | 生命600，人口8，视野11；300晶体矿，600瓦斯，60秒 | Mods/XM/XMMengsk.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 天空之怒 | 精确匹配 | 单位 | 天空之怒 | VikingMengskFighter | CUnit已定义：VikingMengskFighter | 生产链已命中 | StarportMengsk / StarportMengskTrain / 150晶体矿，375瓦斯，42秒 | 生命270，人口4，视野10；150晶体矿，375瓦斯，42秒 | Mods/XM/XMMengsk.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 奥古斯特格勒的骄傲 | 精确匹配 | 单位 | 奥古斯特格勒的骄傲 | BattlecruiserMengsk | CUnit已定义：BattlecruiserMengsk | 生产链已命中 | StarportMengsk / StarportMengskTrain / 400晶体矿，900瓦斯，90秒 | 生命800，人口10，视野12；400晶体矿，900瓦斯，90秒 | Mods/XM/XMMengsk.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 补给地堡 | 精确匹配 | 建筑 | 补给地堡 | BunkerDepotMengsk | CUnit已定义：BunkerDepotMengsk | 生产链已命中 | TrooperMengskImproved / TrooperMengskBuild / 100晶体矿，20秒 | 生命400，视野10；100晶体矿，20秒 | Mods/XM/XMMengsk.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 导弹塔 | 精确匹配 | 建筑 | 导弹塔 | MissileTurretMengsk | CUnit已定义：MissileTurretMengsk | 生产链已命中 | TrooperMengskImproved / TrooperMengskBuild / 100晶体矿，25秒 | 生命250，视野11；100晶体矿，25秒 | Mods/XM/XMMengsk.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 大地碎裂炮 | 精确匹配 | 建筑 | 大地碎裂炮 | ArtilleryMengsk | CUnit已定义：ArtilleryMengsk | 生产链已命中 | TrooperMengskImproved / TrooperMengskBuild / 150晶体矿，100瓦斯，40秒 | 生命400，视野11；150晶体矿，100瓦斯，40秒 | Mods/XM/XMMengsk.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
|  | 官方补充 | 单位 | 帝国劳工 | SCVMengsk | CUnit已定义：SCVMengsk | 生产链已命中 | CommandCenterMengsk / CommandCenterMengskTrain / 40晶体矿，8秒 | 生命45，人口1，视野8；40晶体矿，8秒 | Mods/XM/XMMengsk.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 单位 | 帝国 火箭筒 冲锋队 | TrooperMengskAA | CUnit已定义：TrooperMengskAA | 官方JSON无生产链 |  | 生命45，人口1，视野9；200晶体矿 | Mods/XM/XMMengsk.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 单位 | 帝国 火焰器 冲锋队 | TrooperMengskFlamethrower | CUnit已定义：TrooperMengskFlamethrower | 官方JSON无生产链 |  | 生命145，人口1，视野9；200晶体矿 | Mods/XM/XMMengsk.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 单位 | 帝国 突击手 冲锋队 | TrooperMengskImproved | CUnit已定义：TrooperMengskImproved | 官方JSON无生产链 |  | 生命45，人口1，视野9；200晶体矿 | Mods/XM/XMMengsk.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 单位 | 攻城坦克 | SiegeTankMengskSieged | CUnit已定义：SiegeTankMengskSieged | 官方JSON无生产链 |  | 生命350，人口6，视野11；150晶体矿，425瓦斯 | Mods/XM/XMMengsk.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 单位 | 天空之怒 | VikingMengskAssault | CUnit已定义：VikingMengskAssault | 官方JSON无生产链 |  | 生命270，人口4，视野10；150晶体矿，375瓦斯 | Mods/XM/XMMengsk.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 征兵中心 | CommandCenterMengsk | CUnit已定义：CommandCenterMengsk | 生产链已命中 | SCVMengsk / TerranBuildMengsk / 400晶体矿，100秒 | 生命1500，视野11；400晶体矿，100秒 | Mods/XM/XMMengsk.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 兵营 | BarracksMengsk | CUnit已定义：BarracksMengsk | 生产链已命中 | SCVMengsk / TerranBuildMengsk / 150晶体矿，65秒 | 生命1000，视野9；150晶体矿，65秒 | Mods/XM/XMMengsk.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 重工厂 | FactoryMengsk | CUnit已定义：FactoryMengsk | 生产链已命中 | SCVMengsk / TerranBuildMengsk / 150晶体矿，100瓦斯，60秒 | 生命1250，视野9；150晶体矿，100瓦斯，60秒 | Mods/XM/XMMengsk.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 星港 | StarportMengsk | CUnit已定义：StarportMengsk | 生产链已命中 | SCVMengsk / TerranBuildMengsk / 150晶体矿，100瓦斯，50秒 | 生命1300，视野9；150晶体矿，100瓦斯，50秒 | Mods/XM/XMMengsk.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 工程站 | EngineeringBayMengsk | CUnit已定义：EngineeringBayMengsk | 生产链已命中 | SCVMengsk / TerranBuildMengsk / 125晶体矿，35秒 | 生命850，视野9；125晶体矿，35秒 | Mods/XM/XMMengsk.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 军械库 | ArmoryMengsk | CUnit已定义：ArmoryMengsk | 生产链已命中 | SCVMengsk / TerranBuildMengsk / 150晶体矿，100瓦斯，65秒 | 生命750，视野9；150晶体矿，100瓦斯，65秒 | Mods/XM/XMMengsk.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 聚变芯体 | FusionCoreMengsk | CUnit已定义：FusionCoreMengsk | 生产链已命中 | SCVMengsk / TerranBuildMengsk / 150晶体矿，150瓦斯，65秒 | 生命750，视野9；150晶体矿，150瓦斯，65秒 | Mods/XM/XMMengsk.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 皇家军校 | GhostAcademyMengsk | CUnit已定义：GhostAcademyMengsk | 生产链已命中 | SCVMengsk / TerranBuildMengsk / 150晶体矿，50瓦斯，40秒 | 生命1250，视野9；150晶体矿，50瓦斯，40秒 | Mods/XM/XMMengsk.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |

## 优先排查项

- 无。

## Wiki未匹配官方JSON

- 无。

## 官方有但Wiki主要部队未列

| 分类 | 官方名称 | ID | 当前Mod | 生产链 | 数值 |
| --- | --- | --- | --- | --- | --- |
| 单位 | 帝国劳工 | SCVMengsk | CUnit已定义：SCVMengsk | CommandCenterMengsk / CommandCenterMengskTrain / 40晶体矿，8秒 | 生命45，人口1，视野8；40晶体矿，8秒 |
| 单位 | 帝国 火箭筒 冲锋队 | TrooperMengskAA | CUnit已定义：TrooperMengskAA | 官方JSON无生产链 | 生命45，人口1，视野9；200晶体矿 |
| 单位 | 帝国 火焰器 冲锋队 | TrooperMengskFlamethrower | CUnit已定义：TrooperMengskFlamethrower | 官方JSON无生产链 | 生命145，人口1，视野9；200晶体矿 |
| 单位 | 帝国 突击手 冲锋队 | TrooperMengskImproved | CUnit已定义：TrooperMengskImproved | 官方JSON无生产链 | 生命45，人口1，视野9；200晶体矿 |
| 单位 | 攻城坦克 | SiegeTankMengskSieged | CUnit已定义：SiegeTankMengskSieged | 官方JSON无生产链 | 生命350，人口6，视野11；150晶体矿，425瓦斯 |
| 单位 | 天空之怒 | VikingMengskAssault | CUnit已定义：VikingMengskAssault | 官方JSON无生产链 | 生命270，人口4，视野10；150晶体矿，375瓦斯 |
| 建筑 | 征兵中心 | CommandCenterMengsk | CUnit已定义：CommandCenterMengsk | SCVMengsk / TerranBuildMengsk / 400晶体矿，100秒 | 生命1500，视野11；400晶体矿，100秒 |
| 建筑 | 兵营 | BarracksMengsk | CUnit已定义：BarracksMengsk | SCVMengsk / TerranBuildMengsk / 150晶体矿，65秒 | 生命1000，视野9；150晶体矿，65秒 |
| 建筑 | 重工厂 | FactoryMengsk | CUnit已定义：FactoryMengsk | SCVMengsk / TerranBuildMengsk / 150晶体矿，100瓦斯，60秒 | 生命1250，视野9；150晶体矿，100瓦斯，60秒 |
| 建筑 | 星港 | StarportMengsk | CUnit已定义：StarportMengsk | SCVMengsk / TerranBuildMengsk / 150晶体矿，100瓦斯，50秒 | 生命1300，视野9；150晶体矿，100瓦斯，50秒 |
| 建筑 | 工程站 | EngineeringBayMengsk | CUnit已定义：EngineeringBayMengsk | SCVMengsk / TerranBuildMengsk / 125晶体矿，35秒 | 生命850，视野9；125晶体矿，35秒 |
| 建筑 | 军械库 | ArmoryMengsk | CUnit已定义：ArmoryMengsk | SCVMengsk / TerranBuildMengsk / 150晶体矿，100瓦斯，65秒 | 生命750，视野9；150晶体矿，100瓦斯，65秒 |
| 建筑 | 聚变芯体 | FusionCoreMengsk | CUnit已定义：FusionCoreMengsk | SCVMengsk / TerranBuildMengsk / 150晶体矿，150瓦斯，65秒 | 生命750，视野9；150晶体矿，150瓦斯，65秒 |
| 建筑 | 皇家军校 | GhostAcademyMengsk | CUnit已定义：GhostAcademyMengsk | SCVMengsk / TerranBuildMengsk / 150晶体矿，50瓦斯，40秒 | 生命1250，视野9；150晶体矿，50瓦斯，40秒 |

