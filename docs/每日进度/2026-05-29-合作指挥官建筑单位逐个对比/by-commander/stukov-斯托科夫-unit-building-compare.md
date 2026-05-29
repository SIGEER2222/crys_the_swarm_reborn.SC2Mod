# 斯托科夫 / Stukov 建筑单位对比

- 当前 active Mod：`D:\MyWork\新建文件夹\mom.report.client\src\MyMod\crys_the_swarm_reborn.SC2Mod\合作指挥官版起义狂潮`
- 指挥官模块：`XMStukov.SC2Mod`（存在：是）
- Wiki主要部队文件：`wikitext/13-stukov.wiki`
- Wiki主要部队：被感染的陆战队员、被感染的响尾蛇战车、被感染的攻城坦克、被感染的解放者、被感染的女妖、虫巢女王、眼虫、被感染的地堡、被感染的导弹塔
- 判定口径：wiki用于中文主要部队名单；官方JSON用于ID、生产链、生命/人口/费用；active Mod只检查`合作指挥官版起义狂潮`的本指挥官模块加`XMCore/XMFinal`。

## 汇总

| Wiki项 | 官方行 | Wiki未匹配官方 | 官方补充未在Wiki | 当前Mod未命中 | 仅文本命中 | 生产链异常 |
| --- | --- | --- | --- | --- | --- | --- |
| 9 | 15 | 0 | 13 | 1 | 2 | 2 |

## 三方对照

| Wiki项 | 匹配 | 分类 | 官方名称 | ID | 当前Mod | 生产链状态 | 生产/建造/变形 | 数值 | 定义文件 | 备注 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 被感染的陆战队员 | 精确匹配 | 单位 | 被感染的陆战队员 | SIInfestedMarine | CUnit已定义：SIInfestedMarine | 生产链已命中 | SIBarracks / SIBarracksTrain / 15晶体矿，5秒 | 生命50，人口1，视野9；15晶体矿，5秒 | Mods/XM/XMStukov.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 被感染的响尾蛇战车 | Wiki补充ID | 单位 | 被感染的响尾蛇战车 | StukovInfestedDiamondback | CUnit已定义：StukovInfestedDiamondBack | 官方JSON无生产链 |  |  | Mods/XM/XMStukov.SC2Mod/Base.SC2Data/GameData/UnitData.xml | wiki主要部队补充：官方JSON未列，按感染响尾蛇/钻石背ID检查。 |
| 被感染的攻城坦克 | 精确匹配 | 单位 | 被感染的攻城坦克 | StukovInfestedSiegeTank | CUnit已定义：StukovInfestedSiegeTank | 生产链已命中 | SIFactory / SIFactoryTrain / 200晶体矿，100瓦斯，20秒 | 生命200，人口3，视野11；200晶体矿，100瓦斯，20秒 | Mods/XM/XMStukov.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 被感染的解放者 | Wiki补充ID | 单位 | 被感染的解放者 | SILiberator | CUnit已定义：SILiberator | 官方JSON无生产链 |  |  | Mods/XM/XMStukov.SC2Mod/Base.SC2Data/GameData/UnitData.xml | wiki主要部队补充：官方JSON漏收，按SILiberator检查。 |
| 被感染的女妖 | Wiki补充ID | 单位 | 被感染的女妖 | StukovInfestedBanshee | CUnit已定义：StukovInfestedBanshee | 官方JSON无生产链 |  |  | Mods/XM/XMStukov.SC2Mod/Base.SC2Data/GameData/UnitData.xml | wiki主要部队补充：官方JSON漏收，按感染女妖ID检查。 |
| 虫巢女王 | Wiki补充ID | 单位 | 虫巢女王 | StukovBroodQueen | 未命中：StukovBroodQueen, BroodQueen | 官方JSON无生产链 |  |  |  | wiki主要部队补充：按斯托科夫虫巢女王ID检查。 |
| 眼虫 | Wiki补充ID | 单位 | 眼虫 | OverseerStukov | CUnit已定义：OverseerStukov | 官方JSON无生产链 |  |  | Mods/XM/XMStukov.SC2Mod/Base.SC2Data/GameData/UnitData.xml | wiki主要部队补充：斯托科夫眼虫优先检查OverseerStukov。 |
| 被感染的地堡 | Wiki补充ID | 建筑 | 被感染的地堡 | SIInfestedBunker | CUnit已定义：SIInfestedBunker, SIInfestedBunkerUpg | 官方JSON无生产链 |  |  | Mods/XM/XMStukov.SC2Mod/Base.SC2Data/GameData/UnitData.xml | wiki主要部队补充：按感染地堡ID检查。 |
| 被感染的导弹塔 | Wiki补充ID | 建筑 | 被感染的导弹塔 | SIMissileTurret | CUnit已定义：SIMissileTurret | 官方JSON无生产链 |  |  | Mods/XM/XMStukov.SC2Mod/Base.SC2Data/GameData/UnitData.xml | wiki主要部队补充：按感染导弹塔ID检查。 |
|  | 官方补充 | 单位 | 被感染的平民 | SIInfestedCivilian | CUnit已定义：SIInfestedCivilian | 生产链已命中 | SICommandCenter / SICommandCenterTrain / 16秒 | 生命35，人口0.5，视野8；16秒 | Mods/XM/XMStukov.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 单位 | 被感染的怨灵战机 | SIWraith | CUnit已定义：SIWraith | 生产链已命中 | SIStarport / SIStarportTrain / 150晶体矿，150瓦斯，20秒 | 生命140，人口2，视野8；150晶体矿，150瓦斯，20秒 | Mods/XM/XMStukov.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 单位 | 虫后 | SwarmQueen | 仅文本/引用命中：SwarmQueen, Queen, QueenCoop | 技能缺失 TrainQueen | Hatchery / TrainQueen / 50秒 | 50秒 |  | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 单位 | 跳虫 | Zergling | 仅文本/引用命中：Zergling | 技能缺失 LarvaTrain | Larva / LarvaTrain / 25晶体矿，24秒 | 生命35，人口0.5，视野8；25晶体矿，24秒 |  | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 被感染的工程站 | SIEngineeringBay | CUnit已定义：SIEngineeringBay | 生产链已命中 | SISCV / SIAdvancedBuild / 125晶体矿，35秒 | 生命850，视野9；125晶体矿，35秒 | Mods/XM/XMStukov.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 被感染的军械库 | SIArmory | CUnit已定义：SIArmory | 生产链已命中 | SISCV / SIAdvancedBuild / 150晶体矿，100瓦斯，65秒 | 生命750，视野9；150晶体矿，100瓦斯，65秒 | Mods/XM/XMStukov.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 被感染的兵营 | SIBarracks | CUnit已定义：SIBarracks | 生产链已命中 | SISCV / SIAdvancedBuild / 150晶体矿，60秒 | 生命1000，视野9；150晶体矿，60秒 | Mods/XM/XMStukov.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 被感染的移民营 | SICivilianStructure | CUnit已定义：SICivilianStructure | 生产链已命中 | SISCV / SIAdvancedBuild / 200晶体矿，60秒 | 生命1000，视野9；200晶体矿，60秒 | Mods/XM/XMStukov.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 被感染的指挥中心 | SICommandCenter | CUnit已定义：SICommandCenter | 生产链已命中 | SISCV / SIAdvancedBuild / 400晶体矿，100秒 | 生命1500，视野11；400晶体矿，100秒 | Mods/XM/XMStukov.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 被感染的重工厂 | SIFactory | CUnit已定义：SIFactory | 生产链已命中 | SISCV / SIAdvancedBuild / 150晶体矿，100瓦斯，60秒 | 生命1250，视野9；150晶体矿，100瓦斯，60秒 | Mods/XM/XMStukov.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 被感染的精炼厂 | SIRefinery | CUnit已定义：SIRefinery | 生产链已命中 | SISCV / SIAdvancedBuild / 75晶体矿，30秒 | 生命500，视野9；75晶体矿，30秒 | Mods/XM/XMStukov.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 被感染的星港 | SIStarport | CUnit已定义：SIStarport | 生产链已命中 | SISCV / SIAdvancedBuild / 150晶体矿，100瓦斯，50秒 | 生命1300，视野9；150晶体矿，100瓦斯，50秒 | Mods/XM/XMStukov.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 被感染的补给站 | SISupplyDepot | CUnit已定义：SISupplyDepot | 生产链已命中 | SISCV / SIAdvancedBuild / 100晶体矿，30秒 | 生命350，视野9；100晶体矿，30秒 | Mods/XM/XMStukov.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |

## 优先排查项

| Wiki项 | 匹配 | 分类 | 官方名称 | ID | 当前Mod | 生产链状态 | 生产/建造/变形 | 数值 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 虫巢女王 | Wiki补充ID | 单位 | 虫巢女王 | StukovBroodQueen | 未命中：StukovBroodQueen, BroodQueen | 官方JSON无生产链 |  |  |
|  | 官方补充 | 单位 | 虫后 | SwarmQueen | 仅文本/引用命中：SwarmQueen, Queen, QueenCoop | 技能缺失 TrainQueen | Hatchery / TrainQueen / 50秒 | 50秒 |
|  | 官方补充 | 单位 | 跳虫 | Zergling | 仅文本/引用命中：Zergling | 技能缺失 LarvaTrain | Larva / LarvaTrain / 25晶体矿，24秒 | 生命35，人口0.5，视野8；25晶体矿，24秒 |

## Wiki未匹配官方JSON

- 无。

## 官方有但Wiki主要部队未列

| 分类 | 官方名称 | ID | 当前Mod | 生产链 | 数值 |
| --- | --- | --- | --- | --- | --- |
| 单位 | 被感染的平民 | SIInfestedCivilian | CUnit已定义：SIInfestedCivilian | SICommandCenter / SICommandCenterTrain / 16秒 | 生命35，人口0.5，视野8；16秒 |
| 单位 | 被感染的怨灵战机 | SIWraith | CUnit已定义：SIWraith | SIStarport / SIStarportTrain / 150晶体矿，150瓦斯，20秒 | 生命140，人口2，视野8；150晶体矿，150瓦斯，20秒 |
| 单位 | 虫后 | SwarmQueen | 仅文本/引用命中：SwarmQueen, Queen, QueenCoop | Hatchery / TrainQueen / 50秒 | 50秒 |
| 单位 | 跳虫 | Zergling | 仅文本/引用命中：Zergling | Larva / LarvaTrain / 25晶体矿，24秒 | 生命35，人口0.5，视野8；25晶体矿，24秒 |
| 建筑 | 被感染的工程站 | SIEngineeringBay | CUnit已定义：SIEngineeringBay | SISCV / SIAdvancedBuild / 125晶体矿，35秒 | 生命850，视野9；125晶体矿，35秒 |
| 建筑 | 被感染的军械库 | SIArmory | CUnit已定义：SIArmory | SISCV / SIAdvancedBuild / 150晶体矿，100瓦斯，65秒 | 生命750，视野9；150晶体矿，100瓦斯，65秒 |
| 建筑 | 被感染的兵营 | SIBarracks | CUnit已定义：SIBarracks | SISCV / SIAdvancedBuild / 150晶体矿，60秒 | 生命1000，视野9；150晶体矿，60秒 |
| 建筑 | 被感染的移民营 | SICivilianStructure | CUnit已定义：SICivilianStructure | SISCV / SIAdvancedBuild / 200晶体矿，60秒 | 生命1000，视野9；200晶体矿，60秒 |
| 建筑 | 被感染的指挥中心 | SICommandCenter | CUnit已定义：SICommandCenter | SISCV / SIAdvancedBuild / 400晶体矿，100秒 | 生命1500，视野11；400晶体矿，100秒 |
| 建筑 | 被感染的重工厂 | SIFactory | CUnit已定义：SIFactory | SISCV / SIAdvancedBuild / 150晶体矿，100瓦斯，60秒 | 生命1250，视野9；150晶体矿，100瓦斯，60秒 |
| 建筑 | 被感染的精炼厂 | SIRefinery | CUnit已定义：SIRefinery | SISCV / SIAdvancedBuild / 75晶体矿，30秒 | 生命500，视野9；75晶体矿，30秒 |
| 建筑 | 被感染的星港 | SIStarport | CUnit已定义：SIStarport | SISCV / SIAdvancedBuild / 150晶体矿，100瓦斯，50秒 | 生命1300，视野9；150晶体矿，100瓦斯，50秒 |
| 建筑 | 被感染的补给站 | SISupplyDepot | CUnit已定义：SISupplyDepot | SISCV / SIAdvancedBuild / 100晶体矿，30秒 | 生命350，视野9；100晶体矿，30秒 |

