# 德哈卡 / Dehaka 建筑单位对比

- 当前 active Mod：`D:\MyWork\新建文件夹\mom.report.client\src\MyMod\crys_the_swarm_reborn.SC2Mod\原始mod`
- 指挥官模块：`XMDehaka.SC2Mod`（存在：是）
- Wiki主要部队文件：`wikitext/04-dehaka.wiki`
- Wiki主要部队：原始跳虫、掠食龙、原始蟑螂、原始点火虫、原始守护者、原始刺蛇、原始异龙、穿刺者、原始宿主、掘地虫宿主、原始雷兽、暴龙兽、原始蠕虫
- 判定口径：wiki用于中文主要部队名单；官方JSON用于ID、生产链、生命/人口/费用；active Mod只检查`合作指挥官版起义狂潮`的本指挥官模块加`XMCore/XMFinal`。

## 汇总

| Wiki项 | 官方行 | Wiki未匹配官方 | 官方补充未在Wiki | 当前Mod未命中 | 仅文本命中 | 生产链异常 |
| --- | --- | --- | --- | --- | --- | --- |
| 13 | 25 | 0 | 13 | 0 | 0 | 0 |

## 三方对照

| Wiki项 | 匹配 | 分类 | 官方名称 | ID | 当前Mod | 生产链状态 | 生产/建造/变形 | 数值 | 定义文件 | 备注 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 原始跳虫 | 精确匹配 | 单位 | 原始跳虫 | DehakaZerglingLevel2 | CUnit已定义：DehakaZerglingLevel2 | 生产链已命中 | DehakaTrainEggZergling / DehakaTrainEggMorphToZergling / 50晶体矿，15秒 | 生命90，人口1，视野8；50晶体矿，15秒 | Mods/XM/XMDehaka.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 掠食龙 | 精确匹配 | 单位 | 掠食龙 | DehakaRavasaur | CUnit已定义：DehakaRavasaur | 官方JSON无生产链 |  | 生命90，人口2，视野9；150晶体矿，50瓦斯 | Mods/XM/XMDehaka.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 原始蟑螂 | 精确匹配 | 单位 | 原始蟑螂 | DehakaRoachLevel2 | CUnit已定义：DehakaRoachLevel2 | 生产链已命中 | DehakaTrainEggRoach / DehakaTrainEggMorphToRoach / 75晶体矿，25瓦斯，24秒 | 生命175，人口2，视野9；75晶体矿，25瓦斯，24秒 | Mods/XM/XMDehaka.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 原始点火虫 | 精确匹配 | 单位 | 原始点火虫 | DehakaRoachLevel3 | CUnit已定义：DehakaRoachLevel3 | 官方JSON无生产链 |  | 生命350，人口3，视野9；75晶体矿，25瓦斯 | Mods/XM/XMDehaka.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 原始守护者 | Wiki补充ID | 单位 | 原始守护者 | DehakaGuardian | CUnit已定义：DehakaGuardian | 官方JSON无生产链 |  |  | Mods/XM/XMDehaka.SC2Mod/Base.SC2Data/GameData/UnitData.xml | wiki主要部队补充：官方JSON未列出原始守护者，按DehakaGuardian检查。 |
| 原始刺蛇 | 精确匹配 | 单位 | 原始刺蛇 | DehakaHydraliskLevel2 | CUnit已定义：DehakaHydraliskLevel2 | 生产链已命中 | DehakaTrainEggHydralisk / DehakaTrainEggMorphToHydralisk / 100晶体矿，50瓦斯，26秒 | 生命100，人口2，视野9；100晶体矿，50瓦斯，26秒 | Mods/XM/XMDehaka.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 原始异龙 | 精确匹配 | 单位 | 原始异龙 | DehakaMutaliskLevel3 | CUnit已定义：DehakaMutaliskLevel3 | 官方JSON无生产链 |  | 生命200，人口3，视野11；100晶体矿，100瓦斯 | Mods/XM/XMDehaka.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 穿刺者 | 精确匹配 | 单位 | 穿刺者 | ImpalerDehaka | CUnit已定义：ImpalerDehaka | 官方JSON无生产链 |  | 生命200，人口3，视野9；200晶体矿，100瓦斯 | Mods/XM/XMDehaka.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 原始宿主 | 精确匹配 | 单位 | 原始宿主 | DehakaSwarmHost | CUnit已定义：DehakaSwarmHost | 生产链已命中 | DehakaBarracks / DehakaBarracksTrainEgg / 100晶体矿，75瓦斯，16秒 | 生命160，人口3，视野10；100晶体矿，75瓦斯，16秒 | Mods/XM/XMDehaka.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 掘地虫宿主 | 精确匹配 | 单位 | 掘地虫宿主 | DehakaPrimalSwarmHost | CUnit已定义：DehakaPrimalSwarmHost | 官方JSON无生产链 |  | 生命160，人口5，视野10；100晶体矿，75瓦斯 | Mods/XM/XMDehaka.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 原始雷兽 | 精确匹配 | 单位 | 原始雷兽 | DehakaUltraliskLevel2 | CUnit已定义：DehakaUltraliskLevel2 | 生产链已命中 | DehakaTrainEggUltralisk / DehakaTrainEggMorphToUltralisk / 300晶体矿，200瓦斯，45秒 | 生命625，人口6，视野9；300晶体矿，200瓦斯，45秒 | Mods/XM/XMDehaka.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 暴龙兽 | 精确匹配 | 单位 | 暴龙兽 | DehakaUltraliskLevel3 | CUnit已定义：DehakaUltraliskLevel3 | 官方JSON无生产链 |  | 生命1000，人口9，视野9；450晶体矿，300瓦斯 | Mods/XM/XMDehaka.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 原始蠕虫 | 精确匹配 | 建筑 | 原始蠕虫 | DehakaNydusDestroyer | CUnit已定义：DehakaNydusDestroyer | 生产链已命中 | DehakaDrone / DehakaDroneMorph / 250晶体矿，40秒 | 生命500，人口2，视野11；250晶体矿，40秒 | Mods/XM/XMDehaka.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
|  | 官方补充 | 英雄 | 德哈卡 | DehakaCoop | CUnit已定义：DehakaCoop | 官方JSON无生产链 |  | 生命600，视野10 | Mods/XM/XMDehaka.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 英雄 | 格里维格 | DehakaGlevig | CUnit已定义：DehakaGlevig | 生产链已命中 | CoopCasterDehaka / DehakaGlevigTopBar / 0.0625秒 | 生命1500，视野14；0.0625秒 | Mods/XM/XMDehaka.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 英雄 | 穆尔瓦 | DehakaMurvar | CUnit已定义：DehakaMurvar | 官方JSON无生产链 |  | 生命2500，视野10；500晶体矿 | Mods/XM/XMDehaka.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 英雄 | 达克伦 | DehakaDakrun | CUnit已定义：DehakaDakrun | 官方JSON无生产链 |  | 生命4000，视野10 | Mods/XM/XMDehaka.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 单位 | 原始工蜂 | DehakaDrone | CUnit已定义：DehakaDrone | 生产链已命中 | DehakaHatchery / DehakaHatcheryTrainEgg / 50晶体矿，16秒 | 生命40，人口1，视野8；50晶体矿，16秒 | Mods/XM/XMDehaka.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 单位 | 掘地虫 | DehakaCreeper | CUnit已定义：DehakaCreeper | 官方JSON无生产链 |  | 生命130，视野6 | Mods/XM/XMDehaka.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 单位 | 爆裂掘地虫 | DehakaCreeperFlying | CUnit已定义：DehakaCreeperFlying | 官方JSON无生产链 |  | 生命130，视野6 | Mods/XM/XMDehaka.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 原始主巢 | DehakaHatchery | CUnit已定义：DehakaHatchery | 生产链已命中 | DehakaDrone / DehakaDroneMorph / 400晶体矿，100秒 | 生命1500，人口6，视野11；400晶体矿，100秒 | Mods/XM/XMDehaka.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 原始主巢 | DehakaAirTownHall | CUnit已定义：DehakaAirTownHall | 官方JSON无生产链 |  | 生命1500，视野11；450晶体矿 | Mods/XM/XMDehaka.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 原始战争之巢 | DehakaBarracks | CUnit已定义：DehakaBarracks | 生产链已命中 | DehakaDrone / DehakaDroneMorph / 200晶体矿，60秒 | 生命400，人口2，视野11；200晶体矿，60秒 | Mods/XM/XMDehaka.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 格里维格的巢穴 | DehakaGlevigStructure | CUnit已定义：DehakaGlevigStructure | 生产链已命中 | DehakaDrone / DehakaDroneMorph / 200晶体矿，100瓦斯，90秒 | 生命1500，视野11；200晶体矿，100瓦斯，90秒 | Mods/XM/XMDehaka.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 穆尔瓦的巢穴 | DehakaMurvarStructure | CUnit已定义：DehakaMurvarStructure | 生产链已命中 | DehakaDrone / DehakaDroneMorph / 200晶体矿，200瓦斯，120秒 | 生命1500，视野11；200晶体矿，200瓦斯，120秒 | Mods/XM/XMDehaka.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 达克伦的巢穴 | DehakaDakrunStructure | CUnit已定义：DehakaDakrunStructure | 生产链已命中 | DehakaDrone / DehakaDroneMorph / 200晶体矿，200瓦斯，120秒 | 生命1500，视野11；200晶体矿，200瓦斯，120秒 | Mods/XM/XMDehaka.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |

## 优先排查项

- 无。

## Wiki未匹配官方JSON

- 无。

## 官方有但Wiki主要部队未列

| 分类 | 官方名称 | ID | 当前Mod | 生产链 | 数值 |
| --- | --- | --- | --- | --- | --- |
| 英雄 | 德哈卡 | DehakaCoop | CUnit已定义：DehakaCoop | 官方JSON无生产链 | 生命600，视野10 |
| 英雄 | 格里维格 | DehakaGlevig | CUnit已定义：DehakaGlevig | CoopCasterDehaka / DehakaGlevigTopBar / 0.0625秒 | 生命1500，视野14；0.0625秒 |
| 英雄 | 穆尔瓦 | DehakaMurvar | CUnit已定义：DehakaMurvar | 官方JSON无生产链 | 生命2500，视野10；500晶体矿 |
| 英雄 | 达克伦 | DehakaDakrun | CUnit已定义：DehakaDakrun | 官方JSON无生产链 | 生命4000，视野10 |
| 单位 | 原始工蜂 | DehakaDrone | CUnit已定义：DehakaDrone | DehakaHatchery / DehakaHatcheryTrainEgg / 50晶体矿，16秒 | 生命40，人口1，视野8；50晶体矿，16秒 |
| 单位 | 掘地虫 | DehakaCreeper | CUnit已定义：DehakaCreeper | 官方JSON无生产链 | 生命130，视野6 |
| 单位 | 爆裂掘地虫 | DehakaCreeperFlying | CUnit已定义：DehakaCreeperFlying | 官方JSON无生产链 | 生命130，视野6 |
| 建筑 | 原始主巢 | DehakaHatchery | CUnit已定义：DehakaHatchery | DehakaDrone / DehakaDroneMorph / 400晶体矿，100秒 | 生命1500，人口6，视野11；400晶体矿，100秒 |
| 建筑 | 原始主巢 | DehakaAirTownHall | CUnit已定义：DehakaAirTownHall | 官方JSON无生产链 | 生命1500，视野11；450晶体矿 |
| 建筑 | 原始战争之巢 | DehakaBarracks | CUnit已定义：DehakaBarracks | DehakaDrone / DehakaDroneMorph / 200晶体矿，60秒 | 生命400，人口2，视野11；200晶体矿，60秒 |
| 建筑 | 格里维格的巢穴 | DehakaGlevigStructure | CUnit已定义：DehakaGlevigStructure | DehakaDrone / DehakaDroneMorph / 200晶体矿，100瓦斯，90秒 | 生命1500，视野11；200晶体矿，100瓦斯，90秒 |
| 建筑 | 穆尔瓦的巢穴 | DehakaMurvarStructure | CUnit已定义：DehakaMurvarStructure | DehakaDrone / DehakaDroneMorph / 200晶体矿，200瓦斯，120秒 | 生命1500，视野11；200晶体矿，200瓦斯，120秒 |
| 建筑 | 达克伦的巢穴 | DehakaDakrunStructure | CUnit已定义：DehakaDakrunStructure | DehakaDrone / DehakaDroneMorph / 200晶体矿，200瓦斯，120秒 | 生命1500，视野11；200晶体矿，200瓦斯，120秒 |

