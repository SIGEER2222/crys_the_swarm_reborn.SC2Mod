# 德哈卡 / Dehaka 建筑单位对比

- 当前 active Mod：`D:\MyWork\新建文件夹\mom.report.client\src\MyMod\crys_the_swarm_reborn.SC2Mod\合作指挥官版起义狂潮`
- 指挥官模块：`XMDehaka.SC2Mod`（存在：是）
- 旧线初始化开局单位：dehakahatchery、dehakadrone、dehakacooprevivecocoon
- Wiki主要部队文件：`wikitext/04-dehaka.wiki`
- Wiki主要部队：原始跳虫、掠食龙、原始蟑螂、原始点火虫、原始守护者、原始刺蛇、原始异龙、穿刺者、原始宿主、掘地虫宿主、原始雷兽、暴龙兽、原始蠕虫
- 判定口径：wiki用于中文主要部队名单；官方JSON用于ID、生产链、生命/人口/费用；active 侧先看本指挥官模块和 `XMCore/XMFinal`，再看 `XMFinal.SC2Mod/DocumentInfo` 实际运行闭包，最后只把官方镜像作为事实参考。

## 汇总

| Wiki项 | 官方行 | Wiki未匹配官方 | 官方补充未在Wiki | 当前Mod未命中 | 仅文本命中 | 运行闭包命中 | 仅官方合作镜像 | 底层继承候选 | 生产链异常 | 生产链运行闭包 | 生产链底层候选 | 官方面板缺口 | 特殊面板项 | 命令卡露出产物缺CUnit | 外来生产链露出 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 13 | 25 | 0 | 13 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 0 | 0 | 0 | 0 | 0 |

## 三方对照

| Wiki项 | 匹配 | 分类 | 官方名称 | ID | 当前Mod | 生产链状态 | 当前面板 | 生产/建造/变形 | 数值 | 定义文件 | 备注 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 原始跳虫 | 精确匹配 | 单位 | 原始跳虫 | DehakaZerglingLevel2 | 当前模块CUnit：DehakaZerglingLevel2；官方合作镜像CUnit：DehakaZerglingLevel2 | 生产链已命中 | 当前面板已露出：DehakaTrainEggMorphToZergling,Train1 -> DehakaZerglingLevel2 | DehakaTrainEggZergling / DehakaTrainEggMorphToZergling / 50晶体矿，15秒 | 生命90，人口1，视野8；50晶体矿，15秒 | 合作指挥官版起义狂潮/Mods/XM/XMDehaka.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 掠食龙 | 精确匹配 | 单位 | 掠食龙 | DehakaRavasaur | 当前模块CUnit：DehakaRavasaur；官方合作镜像CUnit：DehakaRavasaur | 官方JSON无生产链 | 官方JSON无生产链 |  | 生命90，人口2，视野9；150晶体矿，50瓦斯 | 合作指挥官版起义狂潮/Mods/XM/XMDehaka.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 原始蟑螂 | 精确匹配 | 单位 | 原始蟑螂 | DehakaRoachLevel2 | 当前模块CUnit：DehakaRoachLevel2；官方合作镜像CUnit：DehakaRoachLevel2 | 生产链已命中 | 当前面板已露出：DehakaTrainEggMorphToRoach,Train1 -> DehakaRoachLevel2 | DehakaTrainEggRoach / DehakaTrainEggMorphToRoach / 75晶体矿，25瓦斯，24秒 | 生命175，人口2，视野9；75晶体矿，25瓦斯，24秒 | 合作指挥官版起义狂潮/Mods/XM/XMDehaka.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 原始点火虫 | 精确匹配 | 单位 | 原始点火虫 | DehakaRoachLevel3 | 当前模块CUnit：DehakaRoachLevel3；官方合作镜像CUnit：DehakaRoachLevel3 | 官方JSON无生产链 | 官方JSON无生产链 |  | 生命350，人口3，视野9；75晶体矿，25瓦斯 | 合作指挥官版起义狂潮/Mods/XM/XMDehaka.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 原始守护者 | Wiki补充ID | 单位 | 原始守护者 | DehakaGuardian | 当前模块CUnit：DehakaGuardian；官方合作镜像CUnit：DehakaGuardian | 官方JSON无生产链 | 官方JSON无生产链 |  |  | 合作指挥官版起义狂潮/Mods/XM/XMDehaka.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml | wiki主要部队补充：官方JSON未列出原始守护者，按DehakaGuardian检查。 |
| 原始刺蛇 | 精确匹配 | 单位 | 原始刺蛇 | DehakaHydraliskLevel2 | 当前模块CUnit：DehakaHydraliskLevel2；官方合作镜像CUnit：DehakaHydraliskLevel2 | 生产链已命中 | 当前面板已露出：DehakaTrainEggMorphToHydralisk,Train1 -> DehakaHydraliskLevel2 | DehakaTrainEggHydralisk / DehakaTrainEggMorphToHydralisk / 100晶体矿，50瓦斯，26秒 | 生命100，人口2，视野9；100晶体矿，50瓦斯，26秒 | 合作指挥官版起义狂潮/Mods/XM/XMDehaka.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 原始异龙 | 精确匹配 | 单位 | 原始异龙 | DehakaMutaliskLevel3 | 当前模块CUnit：DehakaMutaliskLevel3；官方合作镜像CUnit：DehakaMutaliskLevel3 | 官方JSON无生产链 | 官方JSON无生产链 |  | 生命200，人口3，视野11；100晶体矿，100瓦斯 | 合作指挥官版起义狂潮/Mods/XM/XMDehaka.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 穿刺者 | 精确匹配 | 单位 | 穿刺者 | ImpalerDehaka | 当前模块CUnit：ImpalerDehaka；官方合作镜像CUnit：ImpalerDehaka | 官方JSON无生产链 | 官方JSON无生产链 |  | 生命200，人口3，视野9；200晶体矿，100瓦斯 | 合作指挥官版起义狂潮/Mods/XM/XMDehaka.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 原始宿主 | 精确匹配 | 单位 | 原始宿主 | DehakaSwarmHost | 当前模块CUnit：DehakaSwarmHost；官方合作镜像CUnit：DehakaSwarmHost | 生产链已命中 | 当前面板已露出：DehakaTrainEggMorphToSwarmHost,Train1 -> DehakaSwarmHost | DehakaTrainEggSwarmHost / DehakaTrainEggMorphToSwarmHost / 100晶体矿，75瓦斯，30秒 | 生命160，人口3，视野10；100晶体矿，75瓦斯，30秒 | 合作指挥官版起义狂潮/Mods/XM/XMDehaka.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 掘地虫宿主 | 精确匹配 | 单位 | 掘地虫宿主 | DehakaPrimalSwarmHost | 当前模块CUnit：DehakaPrimalSwarmHost；官方合作镜像CUnit：DehakaPrimalSwarmHost | 官方JSON无生产链 | 官方JSON无生产链 |  | 生命160，人口5，视野10；100晶体矿，75瓦斯 | 合作指挥官版起义狂潮/Mods/XM/XMDehaka.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 原始雷兽 | 精确匹配 | 单位 | 原始雷兽 | DehakaUltraliskLevel2 | 当前模块CUnit：DehakaUltraliskLevel2；官方合作镜像CUnit：DehakaUltraliskLevel2 | 生产链已命中 | 当前面板已露出：DehakaTrainEggMorphToUltralisk,Train1 -> DehakaUltraliskLevel2 | DehakaTrainEggUltralisk / DehakaTrainEggMorphToUltralisk / 300晶体矿，200瓦斯，45秒 | 生命625，人口6，视野9；300晶体矿，200瓦斯，45秒 | 合作指挥官版起义狂潮/Mods/XM/XMDehaka.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 暴龙兽 | 精确匹配 | 单位 | 暴龙兽 | DehakaUltraliskLevel3 | 当前模块CUnit：DehakaUltraliskLevel3；官方合作镜像CUnit：DehakaUltraliskLevel3 | 官方JSON无生产链 | 官方JSON无生产链 |  | 生命1000，人口9，视野9；450晶体矿，300瓦斯 | 合作指挥官版起义狂潮/Mods/XM/XMDehaka.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 原始蠕虫 | 精确匹配 | 建筑 | 原始蠕虫 | DehakaNydusDestroyer | 当前模块CUnit：DehakaNydusDestroyer；官方合作镜像CUnit：DehakaNydusDestroyer | 生产链已命中 | 当前面板已露出：DehakaDroneMorph,Build6 -> DehakaNydusDestroyer | DehakaDrone / DehakaDroneMorph / 250晶体矿，40秒 | 生命500，人口2，视野11；250晶体矿，40秒 | 合作指挥官版起义狂潮/Mods/XM/XMDehaka.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
|  | 官方补充 | 英雄 | 德哈卡 | DehakaCoop | 当前模块CUnit：DehakaCoop；XMFinal运行闭包CUnit：DehakaCoop；官方合作镜像CUnit：DehakaCoop | 官方JSON无生产链 | 官方JSON无生产链 |  | 生命600，视野10 | 合作指挥官版起义狂潮/Mods/XM/XMDehaka.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZeratul.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZagara.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 英雄 | 格里维格 | DehakaGlevig | 当前模块CUnit：DehakaGlevig；官方合作镜像CUnit：DehakaGlevig | 生产链在 XMFinal 运行闭包命中 | 当前面板已露出：DehakaGlevigTopBar,Build1 -> DehakaGlevig | CoopCasterDehaka / DehakaGlevigTopBar / 0.0625秒 | 生命1500，视野14；0.0625秒 | 合作指挥官版起义狂潮/Mods/XM/XMDehaka.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 英雄 | 穆尔瓦 | DehakaMurvar | 当前模块CUnit：DehakaMurvar；官方合作镜像CUnit：DehakaMurvar | 官方JSON无生产链 | 官方JSON无生产链 |  | 生命2500，视野10；500晶体矿 | 合作指挥官版起义狂潮/Mods/XM/XMDehaka.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 英雄 | 达克伦 | DehakaDakrun | 当前模块CUnit：DehakaDakrun；官方合作镜像CUnit：DehakaDakrun | 官方JSON无生产链 | 官方JSON无生产链 |  | 生命4000，视野10 | 合作指挥官版起义狂潮/Mods/XM/XMDehaka.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 单位 | 原始工蜂 | DehakaDrone | 当前模块CUnit：DehakaDrone；XMFinal运行闭包CUnit：DehakaDrone；官方合作镜像CUnit：DehakaDrone | 生产链已命中 | 当前面板已露出：DehakaTrainEggMorphToDrone,Train1 -> DehakaDrone | DehakaTrainEggDrone / DehakaTrainEggMorphToDrone / 50晶体矿，17秒 | 生命40，人口1，视野8；50晶体矿，17秒 | 合作指挥官版起义狂潮/Mods/XM/XMDehaka.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZeratul.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZagara.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 单位 | 掘地虫 | DehakaCreeper | 当前模块CUnit：DehakaCreeper；官方合作镜像CUnit：DehakaCreeper | 官方JSON无生产链 | 官方JSON无生产链 |  | 生命130，视野6 | 合作指挥官版起义狂潮/Mods/XM/XMDehaka.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 单位 | 爆裂掘地虫 | DehakaCreeperFlying | 当前模块CUnit：DehakaCreeperFlying；官方合作镜像CUnit：DehakaCreeperFlying | 官方JSON无生产链 | 官方JSON无生产链 |  | 生命130，视野6 | 合作指挥官版起义狂潮/Mods/XM/XMDehaka.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 原始主巢 | DehakaHatchery | 当前模块CUnit：DehakaHatchery；XMFinal运行闭包CUnit：DehakaHatchery；官方合作镜像CUnit：DehakaHatchery | 生产链已命中 | 当前面板已露出：DehakaDroneMorph,Build1 -> DehakaHatchery | DehakaDrone / DehakaDroneMorph / 400晶体矿，100秒 | 生命1500，人口6，视野11；400晶体矿，100秒 | 合作指挥官版起义狂潮/Mods/XM/XMDehaka.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZeratul.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZagara.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 原始主巢 | DehakaAirTownHall | 当前模块CUnit：DehakaAirTownHall；官方合作镜像CUnit：DehakaAirTownHall | 官方JSON无生产链 | 官方JSON无生产链 |  | 生命1500，视野11；450晶体矿 | 合作指挥官版起义狂潮/Mods/XM/XMDehaka.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 原始战争之巢 | DehakaBarracks | 当前模块CUnit：DehakaBarracks；官方合作镜像CUnit：DehakaBarracks | 生产链已命中 | 当前面板已露出：DehakaDroneMorph,Build2 -> DehakaBarracks | DehakaDrone / DehakaDroneMorph / 200晶体矿，60秒 | 生命400，人口2，视野11；200晶体矿，60秒 | 合作指挥官版起义狂潮/Mods/XM/XMDehaka.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 格里维格的巢穴 | DehakaGlevigStructure | 当前模块CUnit：DehakaGlevigStructure；官方合作镜像CUnit：DehakaGlevigStructure | 生产链已命中 | 当前面板已露出：DehakaDroneMorph,Build3 -> DehakaGlevigStructure | DehakaDrone / DehakaDroneMorph / 200晶体矿，100瓦斯，90秒 | 生命1500，视野11；200晶体矿，100瓦斯，90秒 | 合作指挥官版起义狂潮/Mods/XM/XMDehaka.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 穆尔瓦的巢穴 | DehakaMurvarStructure | 当前模块CUnit：DehakaMurvarStructure；官方合作镜像CUnit：DehakaMurvarStructure | 生产链已命中 | 当前面板已露出：DehakaDroneMorph,Build4 -> DehakaMurvarStructure | DehakaDrone / DehakaDroneMorph / 200晶体矿，200瓦斯，120秒 | 生命1500，视野11；200晶体矿，200瓦斯，120秒 | 合作指挥官版起义狂潮/Mods/XM/XMDehaka.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 达克伦的巢穴 | DehakaDakrunStructure | 当前模块CUnit：DehakaDakrunStructure；官方合作镜像CUnit：DehakaDakrunStructure | 生产链已命中 | 当前面板已露出：DehakaDroneMorph,Build5 -> DehakaDakrunStructure | DehakaDrone / DehakaDroneMorph / 200晶体矿，200瓦斯，120秒 | 生命1500，视野11；200晶体矿，200瓦斯，120秒 | 合作指挥官版起义狂潮/Mods/XM/XMDehaka.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |

## 优先排查项

- 无。

## 官方生产面板缺口

说明：按官方 JSON 的生产链，映射到当前指挥官别名后，再检查当前指挥官模块里是否存在同一 `AbilCmd` 的单位命令卡按钮。`当前技能有槽但面板未露出` 是斯旺工厂这类问题的专门口径。

- 无。

## 非缺口特殊机制

说明：这些项来自官方 JSON/ArmyCategory/Catalog，但官方自身也不是普通玩家命令卡入口；保留说明，避免后续继续误补按钮。

- 无。

## Wiki未匹配官方JSON

- 无。

## 官方有但Wiki主要部队未列

| 分类 | 官方名称 | ID | 当前Mod | 生产链 | 数值 |
| --- | --- | --- | --- | --- | --- |
| 英雄 | 德哈卡 | DehakaCoop | 当前模块CUnit：DehakaCoop；XMFinal运行闭包CUnit：DehakaCoop；官方合作镜像CUnit：DehakaCoop | 官方JSON无生产链 | 生命600，视野10 |
| 英雄 | 格里维格 | DehakaGlevig | 当前模块CUnit：DehakaGlevig；官方合作镜像CUnit：DehakaGlevig | CoopCasterDehaka / DehakaGlevigTopBar / 0.0625秒 | 生命1500，视野14；0.0625秒 |
| 英雄 | 穆尔瓦 | DehakaMurvar | 当前模块CUnit：DehakaMurvar；官方合作镜像CUnit：DehakaMurvar | 官方JSON无生产链 | 生命2500，视野10；500晶体矿 |
| 英雄 | 达克伦 | DehakaDakrun | 当前模块CUnit：DehakaDakrun；官方合作镜像CUnit：DehakaDakrun | 官方JSON无生产链 | 生命4000，视野10 |
| 单位 | 原始工蜂 | DehakaDrone | 当前模块CUnit：DehakaDrone；XMFinal运行闭包CUnit：DehakaDrone；官方合作镜像CUnit：DehakaDrone | DehakaTrainEggDrone / DehakaTrainEggMorphToDrone / 50晶体矿，17秒 | 生命40，人口1，视野8；50晶体矿，17秒 |
| 单位 | 掘地虫 | DehakaCreeper | 当前模块CUnit：DehakaCreeper；官方合作镜像CUnit：DehakaCreeper | 官方JSON无生产链 | 生命130，视野6 |
| 单位 | 爆裂掘地虫 | DehakaCreeperFlying | 当前模块CUnit：DehakaCreeperFlying；官方合作镜像CUnit：DehakaCreeperFlying | 官方JSON无生产链 | 生命130，视野6 |
| 建筑 | 原始主巢 | DehakaHatchery | 当前模块CUnit：DehakaHatchery；XMFinal运行闭包CUnit：DehakaHatchery；官方合作镜像CUnit：DehakaHatchery | DehakaDrone / DehakaDroneMorph / 400晶体矿，100秒 | 生命1500，人口6，视野11；400晶体矿，100秒 |
| 建筑 | 原始主巢 | DehakaAirTownHall | 当前模块CUnit：DehakaAirTownHall；官方合作镜像CUnit：DehakaAirTownHall | 官方JSON无生产链 | 生命1500，视野11；450晶体矿 |
| 建筑 | 原始战争之巢 | DehakaBarracks | 当前模块CUnit：DehakaBarracks；官方合作镜像CUnit：DehakaBarracks | DehakaDrone / DehakaDroneMorph / 200晶体矿，60秒 | 生命400，人口2，视野11；200晶体矿，60秒 |
| 建筑 | 格里维格的巢穴 | DehakaGlevigStructure | 当前模块CUnit：DehakaGlevigStructure；官方合作镜像CUnit：DehakaGlevigStructure | DehakaDrone / DehakaDroneMorph / 200晶体矿，100瓦斯，90秒 | 生命1500，视野11；200晶体矿，100瓦斯，90秒 |
| 建筑 | 穆尔瓦的巢穴 | DehakaMurvarStructure | 当前模块CUnit：DehakaMurvarStructure；官方合作镜像CUnit：DehakaMurvarStructure | DehakaDrone / DehakaDroneMorph / 200晶体矿，200瓦斯，120秒 | 生命1500，视野11；200晶体矿，200瓦斯，120秒 |
| 建筑 | 达克伦的巢穴 | DehakaDakrunStructure | 当前模块CUnit：DehakaDakrunStructure；官方合作镜像CUnit：DehakaDakrunStructure | DehakaDrone / DehakaDroneMorph / 200晶体矿，200瓦斯，120秒 | 生命1500，视野11；200晶体矿，200瓦斯，120秒 |

## 当前 active 命令卡露出产物缺 CUnit

说明：只扫描当前指挥官模块里已挂到单位命令卡 `AbilCmd="技能,命令"` 的 `CAbilTrain/CAbilWarpTrain/CAbilBuild/CAbilMorph` 产物。产物在当前模块、XM共享模块、XMFinal运行闭包和底层基础镜像都没有 `CUnit` 时列在这里；这类才是当前 Mod 玩家按钮链路的直接风险。XML 注释已在扫描前剔除。

- 无。

## 当前 active 外来生产链露出

说明：这些按钮的产物能在 XMFinal 运行闭包或官方合作镜像中解析，但生产者不属于该指挥官官方体系。它们不是“缺 CUnit”，更像跨指挥官命令卡污染或共享基础单位需要加选择门槛。

- 无。

## 当前 active 隐藏技能产物缺 CUnit

说明：这些产物在当前模块的技能 `InfoArray` 中存在，但没有发现对应命令卡 `AbilCmd="技能,命令"`。它们通常是旧官方/编辑器残留或未开放设计，默认不按玩家可点建筑按钮修。

- 无。

