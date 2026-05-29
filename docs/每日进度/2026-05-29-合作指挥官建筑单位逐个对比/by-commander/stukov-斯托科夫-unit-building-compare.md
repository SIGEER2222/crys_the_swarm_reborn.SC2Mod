# 斯托科夫 / Stukov 建筑单位对比

- 当前 active Mod：`D:\MyWork\新建文件夹\mom.report.client\src\MyMod\crys_the_swarm_reborn.SC2Mod\合作指挥官版起义狂潮`
- 指挥官模块：`XMStukov.SC2Mod`（存在：是）
- 旧线初始化开局单位：sicommandcenter、siscv、sicivilianstructure
- Wiki主要部队文件：`wikitext/13-stukov.wiki`
- Wiki主要部队：被感染的陆战队员、被感染的响尾蛇战车、被感染的攻城坦克、被感染的解放者、被感染的女妖、虫巢女王、眼虫、被感染的地堡、被感染的导弹塔
- 判定口径：wiki用于中文主要部队名单；官方JSON用于ID、生产链、生命/人口/费用；active 侧先看本指挥官模块和 `XMCore/XMFinal`，再看 `XMFinal.SC2Mod/DocumentInfo` 实际运行闭包，最后只把官方镜像作为事实参考。

## 汇总

| Wiki项 | 官方行 | Wiki未匹配官方 | 官方补充未在Wiki | 当前Mod未命中 | 仅文本命中 | 运行闭包命中 | 仅官方合作镜像 | 底层继承候选 | 生产链异常 | 生产链运行闭包 | 生产链底层候选 | 官方面板缺口 | 特殊面板项 | 命令卡露出产物缺CUnit | 外来生产链露出 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 9 | 15 | 0 | 11 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 0 | 1 |

## 三方对照

| Wiki项 | 匹配 | 分类 | 官方名称 | ID | 当前Mod | 生产链状态 | 当前面板 | 生产/建造/变形 | 数值 | 定义文件 | 备注 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 被感染的陆战队员 | 精确匹配 | 单位 | 被感染的陆战队员 | SIInfestedMarine | 当前模块CUnit：SIInfestedMarine；XMFinal运行闭包CUnit：SIInfestedMarine；官方合作镜像CUnit：SIInfestedMarine | 生产链已命中 | 当前面板已露出：SIMorphtoInfestedMarine,Train1 -> SIInfestedMarine | SICocoonInfestedMarine / SIMorphtoInfestedMarine / 15晶体矿，10秒 | 生命50，人口1，视野9；15晶体矿，10秒 | 合作指挥官版起义狂潮/Mods/XM/XMStukov.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMAbathurReborn.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMAbathur.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 被感染的响尾蛇战车 | Wiki补充ID | 单位 | 被感染的响尾蛇战车 | StukovInfestedDiamondback | 当前模块CUnit：StukovInfestedDiamondBack；官方合作镜像CUnit：StukovInfestedDiamondBack | 官方JSON无生产链 | 官方JSON无生产链 |  |  | 合作指挥官版起义狂潮/Mods/XM/XMStukov.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml | wiki主要部队补充：官方JSON未列，按感染响尾蛇/钻石背ID检查。 |
| 被感染的攻城坦克 | 精确匹配 | 单位 | 被感染的攻城坦克 | StukovInfestedSiegeTank | 当前模块CUnit：StukovInfestedSiegeTank；XMFinal运行闭包CUnit：StukovInfestedSiegeTank；官方合作镜像CUnit：StukovInfestedSiegeTank | 生产链已命中 | 当前面板已露出：SIFactoryTrain,Train2 -> SICocoonInfestedSiegeTank | SIFactory / SIFactoryTrain / 200晶体矿，100瓦斯，20秒 | 生命200，人口3，视野11；200晶体矿，100瓦斯，20秒 | 合作指挥官版起义狂潮/Mods/XM/XMStukov.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZeratul.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZagara.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 被感染的解放者 | 精确匹配 | 单位 | 被感染的解放者 | SILiberator | 当前模块CUnit：SILiberator；官方合作镜像CUnit：SILiberator | 生产链已命中 | 当前面板已露出：SIMorphtoInfestedValkrie,Train1 -> SILiberator | SICocoonInfestedLiberator / SIMorphtoInfestedValkrie / 150晶体矿，125瓦斯，43秒 | 生命180，人口3，视野10；150晶体矿，125瓦斯，43秒 | 合作指挥官版起义狂潮/Mods/XM/XMStukov.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 被感染的女妖 | 精确匹配 | 单位 | 被感染的女妖 | StukovInfestedBanshee | 当前模块CUnit：StukovInfestedBanshee；官方合作镜像CUnit：StukovInfestedBanshee | 生产链已命中 | 当前面板已露出：SIMorphtoInfestedBanshee,Train1 -> StukovInfestedBanshee | SICocoonInfestedBanshee / SIMorphtoInfestedBanshee / 150晶体矿，100瓦斯，43秒 | 生命140，人口3，视野10；150晶体矿，100瓦斯，43秒 | 合作指挥官版起义狂潮/Mods/XM/XMStukov.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 虫巢女王 | Wiki补充ID | 单位 | 虫巢女王 | SIQueen | 当前模块CUnit：SIQueen；官方合作镜像CUnit：SIQueen | 官方JSON无生产链 | 官方JSON无生产链 |  |  | 合作指挥官版起义狂潮/Mods/XM/XMStukov.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml | wiki主要部队补充：斯托科夫虫巢女王官方 CUnit 是 SIQueen，生产按钮位于感染星港/巢后茧链。 |
| 眼虫 | Wiki补充ID | 单位 | 眼虫 | OverseerStukov | 当前模块CUnit：OverseerStukov；XMFinal运行闭包CUnit：Overseer；底层基础镜像CUnit：Overseer；官方合作镜像CUnit：Overseer | 官方JSON无生产链 | 官方JSON无生产链 |  |  | 合作指挥官版起义狂潮/Mods/XM/XMStukov.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZeratul.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZagara.SC2Mod/Base.SC2Data/GameData/UnitData.xml | wiki主要部队补充：斯托科夫眼虫优先检查OverseerStukov。 |
| 被感染的地堡 | Wiki补充ID | 建筑 | 被感染的地堡 | SIInfestedBunker | 当前模块CUnit：SIInfestedBunker, SIInfestedBunkerUpg；XMFinal运行闭包CUnit：SIInfestedBunker；官方合作镜像CUnit：SIInfestedBunker | 官方JSON无生产链 | 官方JSON无生产链 |  |  | 合作指挥官版起义狂潮/Mods/XM/XMStukov.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZeratul.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMVorazun.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMKarax.SC2Mod/Base.SC2Data/GameData/UnitData.xml | wiki主要部队补充：按感染地堡ID检查。 |
| 被感染的导弹塔 | Wiki补充ID | 建筑 | 被感染的导弹塔 | SIMissileTurret | 当前模块CUnit：SIMissileTurret；官方合作镜像CUnit：SIMissileTurret | 官方JSON无生产链 | 官方JSON无生产链 |  |  | 合作指挥官版起义狂潮/Mods/XM/XMStukov.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml | wiki主要部队补充：按感染导弹塔ID检查。 |
|  | 官方补充 | 单位 | 被感染的平民 | SIInfestedCivilian | 当前模块CUnit：SIInfestedCivilian；XMFinal运行闭包CUnit：SIInfestedCivilian；官方合作镜像CUnit：SIInfestedCivilian | 生产链已命中 | 当前面板已露出：SIMorphtoInfestedCivilian,Train1 -> SIInfestedCivilian | SICocoonInfestedCivilian / SIMorphtoInfestedCivilian / 30秒 | 生命35，人口0.5，视野8；30秒 | 合作指挥官版起义狂潮/Mods/XM/XMStukov.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMVorazun.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMKerrigan.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 单位 | 王虫 | SIOverlord | 当前模块CUnit：SIOverlord；XMFinal运行闭包CUnit：SIOverlord；官方合作镜像CUnit：SIOverlord | 生产链已命中 | 当前面板已露出：SIMorphtoInfestedOverlord,Train1 -> SIOverlord | SICocoonInfestedOverlord / SIMorphtoInfestedOverlord / 100晶体矿，25秒 | 生命200，视野11；100晶体矿，25秒 | 合作指挥官版起义狂潮/Mods/XM/XMStukov.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZagara.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMVorazun.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMKerrigan.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 被感染的工程站 | SIEngineeringBay | 当前模块CUnit：SIEngineeringBay；官方合作镜像CUnit：SIEngineeringBay | 生产链已命中 | 当前面板已露出：SIAdvancedBuild,Build5 -> SIEngineeringBay | SISCV / SIAdvancedBuild / 125晶体矿，35秒 | 生命850，视野9；125晶体矿，35秒 | 合作指挥官版起义狂潮/Mods/XM/XMStukov.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 被感染的军械库 | SIArmory | 当前模块CUnit：SIArmory；XMFinal运行闭包CUnit：SIArmory；官方合作镜像CUnit：SIArmory | 生产链已命中 | 当前面板已露出：SIAdvancedBuild,Build14 -> SIArmory | SISCV / SIAdvancedBuild / 150晶体矿，100瓦斯，65秒 | 生命750，视野9；150晶体矿，100瓦斯，65秒 | 合作指挥官版起义狂潮/Mods/XM/XMStukov.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMAbathurReborn.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMAbathur.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 被感染的兵营 | SIBarracks | 当前模块CUnit：SIBarracks；XMFinal运行闭包CUnit：SIBarracks；官方合作镜像CUnit：SIBarracks | 生产链已命中 | 当前面板已露出：SIAdvancedBuild,Build4 -> SIBarracks | SISCV / SIAdvancedBuild / 150晶体矿，60秒 | 生命1000，视野9；150晶体矿，60秒 | 合作指挥官版起义狂潮/Mods/XM/XMStukov.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMAbathurReborn.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMAbathur.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 被感染的移民营 | SICivilianStructure | 当前模块CUnit：SICivilianStructure；XMFinal运行闭包CUnit：SICivilianStructure；官方合作镜像CUnit：SICivilianStructure | 生产链已命中 | 当前面板已露出：SIAdvancedBuild,Build17 -> SICivilianStructure | SISCV / SIAdvancedBuild / 200晶体矿，60秒 | 生命1000，视野9；200晶体矿，60秒 | 合作指挥官版起义狂潮/Mods/XM/XMStukov.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZeratul.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZagara.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 被感染的指挥中心 | SICommandCenter | 当前模块CUnit：SICommandCenter；XMFinal运行闭包CUnit：SICommandCenter；官方合作镜像CUnit：SICommandCenter | 生产链已命中 | 当前面板已露出：SIAdvancedBuild,Build1 -> SICommandCenter | SISCV / SIAdvancedBuild / 400晶体矿，100秒 | 生命1500，视野11；400晶体矿，100秒 | 合作指挥官版起义狂潮/Mods/XM/XMStukov.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZeratul.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZagara.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 被感染的重工厂 | SIFactory | 当前模块CUnit：SIFactory；XMFinal运行闭包CUnit：SIFactory；官方合作镜像CUnit：SIFactory | 生产链已命中 | 当前面板已露出：SIAdvancedBuild,Build11 -> SIFactory | SISCV / SIAdvancedBuild / 150晶体矿，100瓦斯，60秒 | 生命1250，视野9；150晶体矿，100瓦斯，60秒 | 合作指挥官版起义狂潮/Mods/XM/XMStukov.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMAbathurReborn.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMAbathur.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 被感染的精炼厂 | SIRefinery | 当前模块CUnit：SIRefinery；XMFinal运行闭包CUnit：SIRefinery；官方合作镜像CUnit：SIRefinery | 生产链已命中 | 当前面板已露出：SIAdvancedBuild,Build3 -> SIRefinery | SISCV / SIAdvancedBuild / 75晶体矿，30秒 | 生命500，视野9；75晶体矿，30秒 | 合作指挥官版起义狂潮/Mods/XM/XMStukov.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMAbathurReborn.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMAbathur.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 被感染的星港 | SIStarport | 当前模块CUnit：SIStarport；XMFinal运行闭包CUnit：SIStarport；官方合作镜像CUnit：SIStarport | 生产链已命中 | 当前面板已露出：SIAdvancedBuild,Build12 -> SIStarport | SISCV / SIAdvancedBuild / 150晶体矿，100瓦斯，50秒 | 生命1300，视野9；150晶体矿，100瓦斯，50秒 | 合作指挥官版起义狂潮/Mods/XM/XMStukov.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMAbathurReborn.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMAbathur.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 被感染的补给站 | SISupplyDepot | 当前模块CUnit：SISupplyDepot；XMFinal运行闭包CUnit：SISupplyDepot；官方合作镜像CUnit：SISupplyDepot | 生产链已命中 | 特殊机制：被感染的补给站在旧线与官方合作镜像里都是保留槽/注释槽，SISCV 面板不开放 SIAdvancedBuild,Build2，不按玩家建造缺口修。 | SISCV / SIAdvancedBuild / 100晶体矿，30秒 | 生命350，视野9；100晶体矿，30秒 | 合作指挥官版起义狂潮/Mods/XM/XMStukov.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMAbathurReborn.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMAbathur.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |

## 优先排查项

- 无。

## 官方生产面板缺口

说明：按官方 JSON 的生产链，映射到当前指挥官别名后，再检查当前指挥官模块里是否存在同一 `AbilCmd` 的单位命令卡按钮。`当前技能有槽但面板未露出` 是斯旺工厂这类问题的专门口径。

- 无。

## 非缺口特殊机制

说明：这些项来自官方 JSON/ArmyCategory/Catalog，但官方自身也不是普通玩家命令卡入口；保留说明，避免后续继续误补按钮。

| Wiki项 | 分类 | 官方名称 | ID | 生产/建造/变形 | 判定 |
| --- | --- | --- | --- | --- | --- |
|  | 建筑 | 被感染的补给站 | SISupplyDepot | SISCV / SIAdvancedBuild / 100晶体矿，30秒 | 特殊机制：被感染的补给站在旧线与官方合作镜像里都是保留槽/注释槽，SISCV 面板不开放 SIAdvancedBuild,Build2，不按玩家建造缺口修。 |

## Wiki未匹配官方JSON

- 无。

## 官方有但Wiki主要部队未列

| 分类 | 官方名称 | ID | 当前Mod | 生产链 | 数值 |
| --- | --- | --- | --- | --- | --- |
| 单位 | 被感染的平民 | SIInfestedCivilian | 当前模块CUnit：SIInfestedCivilian；XMFinal运行闭包CUnit：SIInfestedCivilian；官方合作镜像CUnit：SIInfestedCivilian | SICocoonInfestedCivilian / SIMorphtoInfestedCivilian / 30秒 | 生命35，人口0.5，视野8；30秒 |
| 单位 | 王虫 | SIOverlord | 当前模块CUnit：SIOverlord；XMFinal运行闭包CUnit：SIOverlord；官方合作镜像CUnit：SIOverlord | SICocoonInfestedOverlord / SIMorphtoInfestedOverlord / 100晶体矿，25秒 | 生命200，视野11；100晶体矿，25秒 |
| 建筑 | 被感染的工程站 | SIEngineeringBay | 当前模块CUnit：SIEngineeringBay；官方合作镜像CUnit：SIEngineeringBay | SISCV / SIAdvancedBuild / 125晶体矿，35秒 | 生命850，视野9；125晶体矿，35秒 |
| 建筑 | 被感染的军械库 | SIArmory | 当前模块CUnit：SIArmory；XMFinal运行闭包CUnit：SIArmory；官方合作镜像CUnit：SIArmory | SISCV / SIAdvancedBuild / 150晶体矿，100瓦斯，65秒 | 生命750，视野9；150晶体矿，100瓦斯，65秒 |
| 建筑 | 被感染的兵营 | SIBarracks | 当前模块CUnit：SIBarracks；XMFinal运行闭包CUnit：SIBarracks；官方合作镜像CUnit：SIBarracks | SISCV / SIAdvancedBuild / 150晶体矿，60秒 | 生命1000，视野9；150晶体矿，60秒 |
| 建筑 | 被感染的移民营 | SICivilianStructure | 当前模块CUnit：SICivilianStructure；XMFinal运行闭包CUnit：SICivilianStructure；官方合作镜像CUnit：SICivilianStructure | SISCV / SIAdvancedBuild / 200晶体矿，60秒 | 生命1000，视野9；200晶体矿，60秒 |
| 建筑 | 被感染的指挥中心 | SICommandCenter | 当前模块CUnit：SICommandCenter；XMFinal运行闭包CUnit：SICommandCenter；官方合作镜像CUnit：SICommandCenter | SISCV / SIAdvancedBuild / 400晶体矿，100秒 | 生命1500，视野11；400晶体矿，100秒 |
| 建筑 | 被感染的重工厂 | SIFactory | 当前模块CUnit：SIFactory；XMFinal运行闭包CUnit：SIFactory；官方合作镜像CUnit：SIFactory | SISCV / SIAdvancedBuild / 150晶体矿，100瓦斯，60秒 | 生命1250，视野9；150晶体矿，100瓦斯，60秒 |
| 建筑 | 被感染的精炼厂 | SIRefinery | 当前模块CUnit：SIRefinery；XMFinal运行闭包CUnit：SIRefinery；官方合作镜像CUnit：SIRefinery | SISCV / SIAdvancedBuild / 75晶体矿，30秒 | 生命500，视野9；75晶体矿，30秒 |
| 建筑 | 被感染的星港 | SIStarport | 当前模块CUnit：SIStarport；XMFinal运行闭包CUnit：SIStarport；官方合作镜像CUnit：SIStarport | SISCV / SIAdvancedBuild / 150晶体矿，100瓦斯，50秒 | 生命1300，视野9；150晶体矿，100瓦斯，50秒 |
| 建筑 | 被感染的补给站 | SISupplyDepot | 当前模块CUnit：SISupplyDepot；XMFinal运行闭包CUnit：SISupplyDepot；官方合作镜像CUnit：SISupplyDepot | SISCV / SIAdvancedBuild / 100晶体矿，30秒 | 生命350，视野9；100晶体矿，30秒 |

## 当前 active 命令卡露出产物缺 CUnit

说明：只扫描当前指挥官模块里已挂到单位命令卡 `AbilCmd="技能,命令"` 的 `CAbilTrain/CAbilWarpTrain/CAbilBuild/CAbilMorph` 产物。产物在当前模块、XM共享模块、XMFinal运行闭包和底层基础镜像都没有 `CUnit` 时列在这里；这类才是当前 Mod 玩家按钮链路的直接风险。XML 注释已在扫描前剔除。

- 无。

## 当前 active 外来生产链露出

说明：这些按钮的产物能在 XMFinal 运行闭包或官方合作镜像中解析，但生产者不属于该指挥官官方体系。它们不是“缺 CUnit”，更像跨指挥官命令卡污染或共享基础单位需要加选择门槛。

| 产物ID | 命中状态 | 引用技能 | 露出命令 | 生产者 | 生产者归属 | 开局归属 | 按钮门槛 | 引用文件 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| InfestedAbomination | XMFinal运行闭包CUnit：InfestedAbomination；底层基础镜像CUnit：InfestedAbomination；官方合作镜像CUnit：InfestedAbomination | SIMorphtoInfestedAberration | SIMorphtoInfestedAberration,Train1 | SICocoonInfestedAberration | SICocoonInfestedAberration:官方无 | SICocoonInfestedAberration:开局无 |  | 合作指挥官版起义狂潮/Mods/XM/XMStukov.SC2Mod/Base.SC2Data/GameData/AbilData.xml |

## 当前 active 隐藏技能产物缺 CUnit

说明：这些产物在当前模块的技能 `InfoArray` 中存在，但没有发现对应命令卡 `AbilCmd="技能,命令"`。它们通常是旧官方/编辑器残留或未开放设计，默认不按玩家可点建筑按钮修。

- 无。

