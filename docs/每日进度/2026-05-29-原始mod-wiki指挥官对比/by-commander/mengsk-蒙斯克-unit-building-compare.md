# 蒙斯克 / Mengsk 建筑单位对比

- 当前 active Mod：`D:\MyWork\新建文件夹\mom.report.client\src\MyMod\crys_the_swarm_reborn.SC2Mod\原始mod`
- 指挥官模块：`XMMengsk.SC2Mod`（存在：是）
- 旧线初始化开局单位：commandcentermengsk、scvmengsk、starportmengsk
- Wiki主要部队文件：`wikitext/10-mengsk.wiki`
- Wiki主要部队：帝国冲锋队、帝国仲裁机、帝国见证者、壁垒卫士、元首鬼影、冲击分队、黑色战锤、天空之怒、奥古斯特格勒的骄傲、补给地堡、导弹塔、大地碎裂炮
- 判定口径：wiki用于中文主要部队名单；官方JSON用于ID、生产链、生命/人口/费用；active 侧先看本指挥官模块和 `XMCore/XMFinal`，再看 `XMFinal.SC2Mod/DocumentInfo` 实际运行闭包，最后只把官方镜像作为事实参考。

## 汇总

| Wiki项 | 官方行 | Wiki未匹配官方 | 官方补充未在Wiki | 当前Mod未命中 | 仅文本命中 | 运行闭包命中 | 仅官方合作镜像 | 底层继承候选 | 生产链异常 | 生产链运行闭包 | 生产链底层候选 | 命令卡露出产物缺CUnit | 外来生产链露出 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 12 | 27 | 0 | 14 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |

## 三方对照

| Wiki项 | 匹配 | 分类 | 官方名称 | ID | 当前Mod | 生产链状态 | 生产/建造/变形 | 数值 | 定义文件 | 备注 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 帝国冲锋队 | 精确匹配 | 单位 | 帝国冲锋队 | TrooperMengsk | 当前模块CUnit：TrooperMengsk；官方合作镜像CUnit：TrooperMengsk | 生产链已命中 | CommandCenterMengsk / CommandCenterMengskTrainWithAlerts / 40晶体矿，8秒 | 生命45，人口1，视野9；40晶体矿，8秒 | 原始mod/Mods/XM/XMMengsk.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/commanders/arcturusmengsk.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 帝国仲裁机 | 精确匹配 | 单位 | 帝国仲裁机 | MedivacMengsk | 当前模块CUnit：MedivacMengsk；官方合作镜像CUnit：MedivacMengsk | 生产链已命中 | StarportMengsk / StarportMengskTrain / 100晶体矿，50瓦斯，21秒 | 生命150，人口2，视野11；100晶体矿，50瓦斯，21秒 | 原始mod/Mods/XM/XMMengsk.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/commanders/arcturusmengsk.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 帝国见证者 | 精确匹配 | 单位 | 帝国见证者 | RavenMengsk | 当前模块CUnit：RavenMengsk；官方合作镜像CUnit：RavenMengsk | 生产链已命中 | StarportMengsk / StarportMengskTrain / 100晶体矿，100瓦斯，30秒 | 生命350，人口2，视野11；100晶体矿，100瓦斯，30秒 | 原始mod/Mods/XM/XMMengsk.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/commanders/arcturusmengsk.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 帝国见证者 | 精确匹配 | 单位 | 帝国见证者 | RavenMengskSieged | 当前模块CUnit：RavenMengskSieged；官方合作镜像CUnit：RavenMengskSieged | 生产链已命中 | RavenMengsk / RavenMengskMorphtoRavenMengskSieged / 0晶体矿，0瓦斯，0.75秒 | 生命350，人口2，视野15；0晶体矿，0瓦斯，0.75秒 | 原始mod/Mods/XM/XMMengsk.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/commanders/arcturusmengsk.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 壁垒卫士 | 精确匹配 | 单位 | 壁垒卫士 | MarauderMengsk | 当前模块CUnit：MarauderMengsk；官方合作镜像CUnit：MarauderMengsk | 生产链已命中 | BarracksMengsk / BarracksMengskTrain / 125晶体矿，350瓦斯，30秒 | 生命300，人口4，视野10；125晶体矿，350瓦斯，30秒 | 原始mod/Mods/XM/XMMengsk.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/commanders/arcturusmengsk.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 元首鬼影 | 精确匹配 | 单位 | 元首鬼影 | GhostMengsk | 当前模块CUnit：GhostMengsk；官方合作镜像CUnit：GhostMengsk | 生产链已命中 | BarracksMengsk / BarracksMengskTrain / 200晶体矿，500瓦斯，40秒 | 生命200，人口4，视野11；200晶体矿，500瓦斯，40秒 | 原始mod/Mods/XM/XMMengsk.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/commanders/arcturusmengsk.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 冲击分队 | 精确匹配 | 单位 | 冲击分队 | SiegeTankMengsk | 当前模块CUnit：SiegeTankMengsk；官方合作镜像CUnit：SiegeTankMengsk | 生产链已命中 | FactoryMengsk / FactoryMengskTrain / 150晶体矿，425瓦斯，45秒 | 生命350，人口6，视野11；150晶体矿，425瓦斯，45秒 | 原始mod/Mods/XM/XMMengsk.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/commanders/arcturusmengsk.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 黑色战锤 | 精确匹配 | 单位 | 黑色战锤 | ThorMengsk | 当前模块CUnit：ThorMengsk；官方合作镜像CUnit：ThorMengsk | 生产链已命中 | FactoryMengsk / FactoryMengskTrain / 300晶体矿，600瓦斯，60秒 | 生命600，人口8，视野11；300晶体矿，600瓦斯，60秒 | 原始mod/Mods/XM/XMMengsk.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/commanders/arcturusmengsk.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 天空之怒 | 精确匹配 | 单位 | 天空之怒 | VikingMengskFighter | 当前模块CUnit：VikingMengskFighter；官方合作镜像CUnit：VikingMengskFighter | 生产链已命中 | StarportMengsk / StarportMengskTrain / 150晶体矿，375瓦斯，42秒 | 生命270，人口4，视野10；150晶体矿，375瓦斯，42秒 | 原始mod/Mods/XM/XMMengsk.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/commanders/arcturusmengsk.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 奥古斯特格勒的骄傲 | 精确匹配 | 单位 | 奥古斯特格勒的骄傲 | BattlecruiserMengsk | 当前模块CUnit：BattlecruiserMengsk；官方合作镜像CUnit：BattlecruiserMengsk | 生产链已命中 | StarportMengsk / StarportMengskTrain / 400晶体矿，900瓦斯，90秒 | 生命800，人口10，视野12；400晶体矿，900瓦斯，90秒 | 原始mod/Mods/XM/XMMengsk.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/commanders/arcturusmengsk.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 补给地堡 | 精确匹配 | 建筑 | 补给地堡 | BunkerDepotMengsk | 当前模块CUnit：BunkerDepotMengsk；官方合作镜像CUnit：BunkerDepotMengsk | 生产链已命中 | TrooperMengskImproved / TrooperMengskBuild / 100晶体矿，20秒 | 生命400，视野10；100晶体矿，20秒 | 原始mod/Mods/XM/XMMengsk.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/commanders/arcturusmengsk.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 导弹塔 | 精确匹配 | 建筑 | 导弹塔 | MissileTurretMengsk | 当前模块CUnit：MissileTurretMengsk；官方合作镜像CUnit：MissileTurretMengsk | 生产链已命中 | TrooperMengskImproved / TrooperMengskBuild / 100晶体矿，25秒 | 生命250，视野11；100晶体矿，25秒 | 原始mod/Mods/XM/XMMengsk.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/commanders/arcturusmengsk.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 大地碎裂炮 | 精确匹配 | 建筑 | 大地碎裂炮 | ArtilleryMengsk | 当前模块CUnit：ArtilleryMengsk；官方合作镜像CUnit：ArtilleryMengsk | 生产链已命中 | TrooperMengskImproved / TrooperMengskBuild / 150晶体矿，100瓦斯，40秒 | 生命400，视野11；150晶体矿，100瓦斯，40秒 | 原始mod/Mods/XM/XMMengsk.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/commanders/arcturusmengsk.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
|  | 官方补充 | 单位 | 帝国劳工 | SCVMengsk | 当前模块CUnit：SCVMengsk；官方合作镜像CUnit：SCVMengsk | 生产链已命中 | CommandCenterMengsk / CommandCenterMengskTrain / 40晶体矿，8秒 | 生命45，人口1，视野8；40晶体矿，8秒 | 原始mod/Mods/XM/XMMengsk.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/commanders/arcturusmengsk.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 单位 | 帝国 火箭筒 冲锋队 | TrooperMengskAA | 当前模块CUnit：TrooperMengskAA；官方合作镜像CUnit：TrooperMengskAA | 官方JSON无生产链 |  | 生命45，人口1，视野9；200晶体矿 | 原始mod/Mods/XM/XMMengsk.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/commanders/arcturusmengsk.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 单位 | 帝国 火焰器 冲锋队 | TrooperMengskFlamethrower | 当前模块CUnit：TrooperMengskFlamethrower；官方合作镜像CUnit：TrooperMengskFlamethrower | 官方JSON无生产链 |  | 生命145，人口1，视野9；200晶体矿 | 原始mod/Mods/XM/XMMengsk.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/commanders/arcturusmengsk.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 单位 | 帝国 突击手 冲锋队 | TrooperMengskImproved | 当前模块CUnit：TrooperMengskImproved；官方合作镜像CUnit：TrooperMengskImproved | 官方JSON无生产链 |  | 生命45，人口1，视野9；200晶体矿 | 原始mod/Mods/XM/XMMengsk.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/commanders/arcturusmengsk.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 单位 | 攻城坦克 | SiegeTankMengskSieged | 当前模块CUnit：SiegeTankMengskSieged；官方合作镜像CUnit：SiegeTankMengskSieged | 官方JSON无生产链 |  | 生命350，人口6，视野11；150晶体矿，425瓦斯 | 原始mod/Mods/XM/XMMengsk.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/commanders/arcturusmengsk.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 单位 | 天空之怒 | VikingMengskAssault | 当前模块CUnit：VikingMengskAssault；官方合作镜像CUnit：VikingMengskAssault | 官方JSON无生产链 |  | 生命270，人口4，视野10；150晶体矿，375瓦斯 | 原始mod/Mods/XM/XMMengsk.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/commanders/arcturusmengsk.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 征兵中心 | CommandCenterMengsk | 当前模块CUnit：CommandCenterMengsk；官方合作镜像CUnit：CommandCenterMengsk | 生产链已命中 | SCVMengsk / TerranBuildMengsk / 400晶体矿，100秒 | 生命1500，视野11；400晶体矿，100秒 | 原始mod/Mods/XM/XMMengsk.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/commanders/arcturusmengsk.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 兵营 | BarracksMengsk | 当前模块CUnit：BarracksMengsk；官方合作镜像CUnit：BarracksMengsk | 生产链已命中 | SCVMengsk / TerranBuildMengsk / 150晶体矿，65秒 | 生命1000，视野9；150晶体矿，65秒 | 原始mod/Mods/XM/XMMengsk.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/commanders/arcturusmengsk.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 重工厂 | FactoryMengsk | 当前模块CUnit：FactoryMengsk；官方合作镜像CUnit：FactoryMengsk | 生产链已命中 | SCVMengsk / TerranBuildMengsk / 150晶体矿，100瓦斯，60秒 | 生命1250，视野9；150晶体矿，100瓦斯，60秒 | 原始mod/Mods/XM/XMMengsk.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/commanders/arcturusmengsk.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 星港 | StarportMengsk | 当前模块CUnit：StarportMengsk；官方合作镜像CUnit：StarportMengsk | 生产链已命中 | SCVMengsk / TerranBuildMengsk / 150晶体矿，100瓦斯，50秒 | 生命1300，视野9；150晶体矿，100瓦斯，50秒 | 原始mod/Mods/XM/XMMengsk.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/commanders/arcturusmengsk.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 工程站 | EngineeringBayMengsk | 当前模块CUnit：EngineeringBayMengsk；官方合作镜像CUnit：EngineeringBayMengsk | 生产链已命中 | SCVMengsk / TerranBuildMengsk / 125晶体矿，35秒 | 生命850，视野9；125晶体矿，35秒 | 原始mod/Mods/XM/XMMengsk.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/commanders/arcturusmengsk.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 军械库 | ArmoryMengsk | 当前模块CUnit：ArmoryMengsk；官方合作镜像CUnit：ArmoryMengsk | 生产链已命中 | SCVMengsk / TerranBuildMengsk / 150晶体矿，100瓦斯，65秒 | 生命750，视野9；150晶体矿，100瓦斯，65秒 | 原始mod/Mods/XM/XMMengsk.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/commanders/arcturusmengsk.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 聚变芯体 | FusionCoreMengsk | 当前模块CUnit：FusionCoreMengsk；官方合作镜像CUnit：FusionCoreMengsk | 生产链已命中 | SCVMengsk / TerranBuildMengsk / 150晶体矿，150瓦斯，65秒 | 生命750，视野9；150晶体矿，150瓦斯，65秒 | 原始mod/Mods/XM/XMMengsk.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/commanders/arcturusmengsk.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 皇家军校 | GhostAcademyMengsk | 当前模块CUnit：GhostAcademyMengsk；官方合作镜像CUnit：GhostAcademyMengsk | 生产链已命中 | SCVMengsk / TerranBuildMengsk / 150晶体矿，50瓦斯，40秒 | 生命1250，视野9；150晶体矿，50瓦斯，40秒 | 原始mod/Mods/XM/XMMengsk.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/commanders/arcturusmengsk.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |

## 优先排查项

- 无。

## Wiki未匹配官方JSON

- 无。

## 官方有但Wiki主要部队未列

| 分类 | 官方名称 | ID | 当前Mod | 生产链 | 数值 |
| --- | --- | --- | --- | --- | --- |
| 单位 | 帝国劳工 | SCVMengsk | 当前模块CUnit：SCVMengsk；官方合作镜像CUnit：SCVMengsk | CommandCenterMengsk / CommandCenterMengskTrain / 40晶体矿，8秒 | 生命45，人口1，视野8；40晶体矿，8秒 |
| 单位 | 帝国 火箭筒 冲锋队 | TrooperMengskAA | 当前模块CUnit：TrooperMengskAA；官方合作镜像CUnit：TrooperMengskAA | 官方JSON无生产链 | 生命45，人口1，视野9；200晶体矿 |
| 单位 | 帝国 火焰器 冲锋队 | TrooperMengskFlamethrower | 当前模块CUnit：TrooperMengskFlamethrower；官方合作镜像CUnit：TrooperMengskFlamethrower | 官方JSON无生产链 | 生命145，人口1，视野9；200晶体矿 |
| 单位 | 帝国 突击手 冲锋队 | TrooperMengskImproved | 当前模块CUnit：TrooperMengskImproved；官方合作镜像CUnit：TrooperMengskImproved | 官方JSON无生产链 | 生命45，人口1，视野9；200晶体矿 |
| 单位 | 攻城坦克 | SiegeTankMengskSieged | 当前模块CUnit：SiegeTankMengskSieged；官方合作镜像CUnit：SiegeTankMengskSieged | 官方JSON无生产链 | 生命350，人口6，视野11；150晶体矿，425瓦斯 |
| 单位 | 天空之怒 | VikingMengskAssault | 当前模块CUnit：VikingMengskAssault；官方合作镜像CUnit：VikingMengskAssault | 官方JSON无生产链 | 生命270，人口4，视野10；150晶体矿，375瓦斯 |
| 建筑 | 征兵中心 | CommandCenterMengsk | 当前模块CUnit：CommandCenterMengsk；官方合作镜像CUnit：CommandCenterMengsk | SCVMengsk / TerranBuildMengsk / 400晶体矿，100秒 | 生命1500，视野11；400晶体矿，100秒 |
| 建筑 | 兵营 | BarracksMengsk | 当前模块CUnit：BarracksMengsk；官方合作镜像CUnit：BarracksMengsk | SCVMengsk / TerranBuildMengsk / 150晶体矿，65秒 | 生命1000，视野9；150晶体矿，65秒 |
| 建筑 | 重工厂 | FactoryMengsk | 当前模块CUnit：FactoryMengsk；官方合作镜像CUnit：FactoryMengsk | SCVMengsk / TerranBuildMengsk / 150晶体矿，100瓦斯，60秒 | 生命1250，视野9；150晶体矿，100瓦斯，60秒 |
| 建筑 | 星港 | StarportMengsk | 当前模块CUnit：StarportMengsk；官方合作镜像CUnit：StarportMengsk | SCVMengsk / TerranBuildMengsk / 150晶体矿，100瓦斯，50秒 | 生命1300，视野9；150晶体矿，100瓦斯，50秒 |
| 建筑 | 工程站 | EngineeringBayMengsk | 当前模块CUnit：EngineeringBayMengsk；官方合作镜像CUnit：EngineeringBayMengsk | SCVMengsk / TerranBuildMengsk / 125晶体矿，35秒 | 生命850，视野9；125晶体矿，35秒 |
| 建筑 | 军械库 | ArmoryMengsk | 当前模块CUnit：ArmoryMengsk；官方合作镜像CUnit：ArmoryMengsk | SCVMengsk / TerranBuildMengsk / 150晶体矿，100瓦斯，65秒 | 生命750，视野9；150晶体矿，100瓦斯，65秒 |
| 建筑 | 聚变芯体 | FusionCoreMengsk | 当前模块CUnit：FusionCoreMengsk；官方合作镜像CUnit：FusionCoreMengsk | SCVMengsk / TerranBuildMengsk / 150晶体矿，150瓦斯，65秒 | 生命750，视野9；150晶体矿，150瓦斯，65秒 |
| 建筑 | 皇家军校 | GhostAcademyMengsk | 当前模块CUnit：GhostAcademyMengsk；官方合作镜像CUnit：GhostAcademyMengsk | SCVMengsk / TerranBuildMengsk / 150晶体矿，50瓦斯，40秒 | 生命1250，视野9；150晶体矿，50瓦斯，40秒 |

## 当前 active 命令卡露出产物缺 CUnit

说明：只扫描当前指挥官模块里已挂到单位命令卡 `AbilCmd="技能,命令"` 的 `CAbilTrain/CAbilWarpTrain/CAbilBuild/CAbilMorph` 产物。产物在当前模块、XM共享模块、XMFinal运行闭包和底层基础镜像都没有 `CUnit` 时列在这里；这类才是当前 Mod 玩家按钮链路的直接风险。XML 注释已在扫描前剔除。

- 无。

## 当前 active 外来生产链露出

说明：这些按钮的产物能在 XMFinal 运行闭包或官方合作镜像中解析，但生产者不属于该指挥官官方体系。它们不是“缺 CUnit”，更像跨指挥官命令卡污染或共享基础单位需要加选择门槛。

- 无。

## 当前 active 隐藏技能产物缺 CUnit

说明：这些产物在当前模块的技能 `InfoArray` 中存在，但没有发现对应命令卡 `AbilCmd="技能,命令"`。它们通常是旧官方/编辑器残留或未开放设计，默认不按玩家可点建筑按钮修。

- 无。

