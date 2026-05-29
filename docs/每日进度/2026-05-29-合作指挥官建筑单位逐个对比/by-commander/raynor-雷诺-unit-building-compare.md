# 雷诺 / Raynor 建筑单位对比

- 当前 active Mod：`D:\MyWork\新建文件夹\mom.report.client\src\MyMod\crys_the_swarm_reborn.SC2Mod\合作指挥官版起义狂潮`
- 指挥官模块：`XMRaynor.SC2Mod`（存在：是）
- 旧线初始化开局单位：commandcenter、scv、supplydepot
- Wiki主要部队文件：`wikitext/09-raynor.wiki`
- Wiki主要部队：陆战队员、医疗兵、火蝠、劫掠者、秃鹫、攻城坦克、维京战机、女妖、战列巡航舰、轨道控制基地、地堡、导弹塔
- 判定口径：wiki用于中文主要部队名单；官方JSON用于ID、生产链、生命/人口/费用；active 侧先看本指挥官模块和 `XMCore/XMFinal`，再看 `XMFinal.SC2Mod/DocumentInfo` 实际运行闭包，最后只把官方镜像作为事实参考。

## 汇总

| Wiki项 | 官方行 | Wiki未匹配官方 | 官方补充未在Wiki | 当前Mod未命中 | 仅文本命中 | 运行闭包命中 | 仅官方合作镜像 | 底层继承候选 | 生产链异常 | 生产链运行闭包 | 生产链底层候选 | 官方面板缺口 | 特殊面板项 | 命令卡露出产物缺CUnit | 外来生产链露出 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 12 | 16 | 0 | 4 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 6 |

## 三方对照

| Wiki项 | 匹配 | 分类 | 官方名称 | ID | 当前Mod | 生产链状态 | 当前面板 | 生产/建造/变形 | 数值 | 定义文件 | 备注 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 陆战队员 | 精确匹配 | 单位 | 陆战队员 | Marine | 当前模块CUnit：Marine；XMFinal运行闭包CUnit：Marine；底层基础镜像CUnit：Marine；官方合作镜像CUnit：Marine | 生产链已命中 | 当前面板已露出：BarracksTrain,Train1 -> Marine | Barracks / BarracksTrain / 50晶体矿，25秒 | 生命45，人口1，视野9；50晶体矿，25秒 | 合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMAbathurReborn.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMAbathur.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/libertystory.sc2campaign/base.sc2data/gamedata/unitdata.xml |  |
| 医疗兵 | 精确匹配 | 单位 | 医疗兵 | Medic | 当前模块CUnit：Medic；XMFinal运行闭包CUnit：Medic；底层基础镜像CUnit：Medic；官方合作镜像CUnit：Medic | 生产链已命中 | 当前面板已露出：BarracksTrain,Train5 -> Medic | Barracks / BarracksTrain / 40秒 | 40秒 | 合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZagara.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMVorazun.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMKerrigan.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 火蝠 | 精确匹配 | 单位 | 火蝠 | Firebat | 当前模块CUnit：Firebat；XMFinal运行闭包CUnit：Firebat；底层基础镜像CUnit：Firebat；官方合作镜像CUnit：Firebat | 生产链已命中 | 当前面板已露出：BarracksTrain,Train6 -> Firebat | Barracks / BarracksTrain |  | 合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZagara.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMVorazun.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMKerrigan.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 劫掠者 | 精确匹配 | 单位 | 劫掠者 | Marauder | 当前模块CUnit：Marauder；XMFinal运行闭包CUnit：Marauder；底层基础镜像CUnit：Marauder；官方合作镜像CUnit：Marauder | 生产链已命中 | 当前面板已露出：BarracksTrain,Train4 -> Marauder | Barracks / BarracksTrain / 100晶体矿，25瓦斯，30秒 | 生命125，人口2，视野10；100晶体矿，25瓦斯，30秒 | 合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMAbathurReborn.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMAbathur.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/libertystory.sc2campaign/base.sc2data/gamedata/unitdata.xml |  |
| 秃鹫 | 精确匹配 | 单位 | 秃鹫 | Vulture | 当前模块CUnit：Vulture；XMFinal运行闭包CUnit：Vulture；底层基础镜像CUnit：Vulture；官方合作镜像CUnit：Vulture | 生产链已命中 | 当前面板已露出：FactoryTrain,Train10 -> Vulture | Factory / FactoryTrain |  | 合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMAbathurReborn.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMAbathur.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/liberty.sc2campaign/base.sc2data/gamedata/unitdata.xml |  |
| 攻城坦克 | 精确匹配 | 单位 | 攻城坦克 | SiegeTank | 当前模块CUnit：SiegeTank；XMFinal运行闭包CUnit：SiegeTank；底层基础镜像CUnit：SiegeTank；官方合作镜像CUnit：SiegeTank | 生产链已命中 | 当前面板已露出：FactoryTrain,Train2 -> SiegeTank | Factory / FactoryTrain / 150晶体矿，125瓦斯，45秒 | 生命175，人口3，视野11；150晶体矿，125瓦斯，45秒 | 合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZeratul.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZagara.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMVorazun.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 维京战机 | 精确匹配 | 单位 | 维京战机 | Viking | XM共享模块CUnit：Viking；底层基础镜像CUnit：Viking | 生产链已命中 | 当前面板已露出同命令，产物ID需别名核对：HHStarportTrainHorner,Train2 ->；官方期望 vikingfightermira/vikingassaultmira/viking | HHStarport / HHStarportTrainHorner / 800晶体矿，500瓦斯，300秒 | 800晶体矿，500瓦斯，300秒 | 合作指挥官版起义狂潮/Mods/XM/XMCore.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/liberty.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 女妖 | 精确匹配 | 单位 | 女妖 | Banshee | 当前模块CUnit：Banshee；XMFinal运行闭包CUnit：Banshee；底层基础镜像CUnit：Banshee；官方合作镜像CUnit：Banshee | 生产链已命中 | 当前面板已露出：StarportTrain,Train2 -> Banshee | Starport / StarportTrain / 150晶体矿，100瓦斯，60秒 | 生命140，人口3，视野10；150晶体矿，100瓦斯，60秒 | 合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZeratul.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZagara.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMVorazun.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 战列巡航舰 | 精确匹配 | 单位 | 战列巡航舰 | Battlecruiser | 当前模块CUnit：Battlecruiser；XMFinal运行闭包CUnit：Battlecruiser；底层基础镜像CUnit：Battlecruiser；官方合作镜像CUnit：Battlecruiser | 生产链已命中 | 当前面板已露出：StarportTrain,Train4 -> Battlecruiser | Starport / StarportTrain / 400晶体矿，300瓦斯，90秒 | 生命550，人口6，视野12；400晶体矿，300瓦斯，90秒 | 合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZeratul.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZagara.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMVorazun.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 轨道控制基地 | 别名匹配 | 建筑 | 轨道控制基地 | OrbitalCommand | 当前模块CUnit：OrbitalCommand；XMFinal运行闭包CUnit：OrbitalCommand；底层基础镜像CUnit：OrbitalCommand；官方合作镜像CUnit：OrbitalCommand | 生产链已命中 | 当前面板已露出：UpgradeToOrbital,Execute -> OrbitalCommand | CommandCenter / UpgradeToOrbital / 150晶体矿，0秒 | 生命1500，视野11；150晶体矿，0秒 | 合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZeratul.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZagara.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMVorazun.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 地堡 | 精确匹配 | 建筑 | 地堡 | Bunker | 当前模块CUnit：Bunker；XMFinal运行闭包CUnit：Bunker；底层基础镜像CUnit：Bunker；官方合作镜像CUnit：Bunker | 生产链已命中 | 当前面板已露出：TerranBuild,Build7 -> Bunker | SCV / TerranBuild / 100晶体矿，20秒 | 生命400，视野10；100晶体矿，20秒 | 合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZeratul.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZagara.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMVorazun.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 导弹塔 | 精确匹配 | 建筑 | 导弹塔 | MissileTurret | 当前模块CUnit：MissileTurret；XMFinal运行闭包CUnit：MissileTurret；底层基础镜像CUnit：MissileTurret；官方合作镜像CUnit：MissileTurret | 生产链已命中 | 当前面板已露出：TerranBuild,Build6 -> MissileTurret | SCV / TerranBuild / 100晶体矿，25秒 | 生命250，视野11；100晶体矿，25秒 | 合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMAbathurReborn.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMAbathur.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/libertystory.sc2campaign/base.sc2data/gamedata/unitdata.xml |  |
|  | 官方补充 | 单位 | SCV | SCV | 当前模块CUnit：SCV；XMFinal运行闭包CUnit：SCV；底层基础镜像CUnit：SCV；官方合作镜像CUnit：SCV | 生产链已命中 | 当前面板已露出：CommandCenterTrain,Train1 -> SCV | CommandCenter / CommandCenterTrain / 50晶体矿，17秒 | 生命45，人口1，视野8；50晶体矿，17秒 | 合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMAbathurReborn.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMAbathur.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/libertystory.sc2campaign/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 兵营 | Barracks | 当前模块CUnit：Barracks；XMFinal运行闭包CUnit：Barracks；底层基础镜像CUnit：Barracks；官方合作镜像CUnit：Barracks | 生产链已命中 | 当前面板已露出：TerranBuild,Build4 -> Barracks | SCV / TerranBuild / 150晶体矿，65秒 | 生命1000，视野9；150晶体矿，65秒 | 合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZeratul.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZagara.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMVorazun.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 补给站 | SupplyDepot | 当前模块CUnit：SupplyDepot；XMFinal运行闭包CUnit：SupplyDepot；底层基础镜像CUnit：SupplyDepot；官方合作镜像CUnit：SupplyDepot | 生产链已命中 | 当前面板已露出：TerranBuild,Build2 -> SupplyDepot | SCV / TerranBuild / 100晶体矿，30秒 | 生命400，视野9；100晶体矿，30秒 | 合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZeratul.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZagara.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMVorazun.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 指挥中心 | CommandCenter | 当前模块CUnit：CommandCenter；XMFinal运行闭包CUnit：CommandCenter；底层基础镜像CUnit：CommandCenter；官方合作镜像CUnit：CommandCenter | 生产链已命中 | 当前面板已露出：TerranBuild,Build1 -> CommandCenter | SCV / TerranBuild / 400晶体矿，100秒 | 生命1500，视野11；400晶体矿，100秒 | 合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZeratul.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZagara.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMVorazun.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |

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
| 单位 | SCV | SCV | 当前模块CUnit：SCV；XMFinal运行闭包CUnit：SCV；底层基础镜像CUnit：SCV；官方合作镜像CUnit：SCV | CommandCenter / CommandCenterTrain / 50晶体矿，17秒 | 生命45，人口1，视野8；50晶体矿，17秒 |
| 建筑 | 兵营 | Barracks | 当前模块CUnit：Barracks；XMFinal运行闭包CUnit：Barracks；底层基础镜像CUnit：Barracks；官方合作镜像CUnit：Barracks | SCV / TerranBuild / 150晶体矿，65秒 | 生命1000，视野9；150晶体矿，65秒 |
| 建筑 | 补给站 | SupplyDepot | 当前模块CUnit：SupplyDepot；XMFinal运行闭包CUnit：SupplyDepot；底层基础镜像CUnit：SupplyDepot；官方合作镜像CUnit：SupplyDepot | SCV / TerranBuild / 100晶体矿，30秒 | 生命400，视野9；100晶体矿，30秒 |
| 建筑 | 指挥中心 | CommandCenter | 当前模块CUnit：CommandCenter；XMFinal运行闭包CUnit：CommandCenter；底层基础镜像CUnit：CommandCenter；官方合作镜像CUnit：CommandCenter | SCV / TerranBuild / 400晶体矿，100秒 | 生命1500，视野11；400晶体矿，100秒 |

## 当前 active 命令卡露出产物缺 CUnit

说明：只扫描当前指挥官模块里已挂到单位命令卡 `AbilCmd="技能,命令"` 的 `CAbilTrain/CAbilWarpTrain/CAbilBuild/CAbilMorph` 产物。产物在当前模块、XM共享模块、XMFinal运行闭包和底层基础镜像都没有 `CUnit` 时列在这里；这类才是当前 Mod 玩家按钮链路的直接风险。XML 注释已在扫描前剔除。

- 无。

## 当前 active 外来生产链露出

说明：这些按钮的产物能在 XMFinal 运行闭包或官方合作镜像中解析，但生产者不属于该指挥官官方体系。它们不是“缺 CUnit”，更像跨指挥官命令卡污染或共享基础单位需要加选择门槛。

| 产物ID | 命中状态 | 引用技能 | 露出命令 | 生产者 | 生产者归属 | 开局归属 | 按钮门槛 | 引用文件 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| DehakaTrainEggDrone | XMFinal运行闭包CUnit：DehakaTrainEggDrone；官方合作镜像CUnit：DehakaTrainEggDrone | DehakaHatcheryTrainEgg | DehakaHatcheryTrainEgg,Train1 | DehakaHatchery | DehakaHatchery:官方无 | DehakaHatchery:开局无 |  | 合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| Mohandar | XMFinal运行闭包CUnit：Mohandar；底层基础镜像CUnit：Mohandar；官方合作镜像CUnit：Mohandar | ZeratulTopBarWarpTrain | ZeratulTopBarWarpTrain,Train2 | CoopCasterZeratul | CoopCasterZeratul:官方无 | CoopCasterZeratul:开局无 | HaveZeratulArtifactUpgradeTier0B | 合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/commanders/futurecommanders.xml |
| NovaBoombotBurrowed | XMFinal运行闭包CUnit：NovaBoombotBurrowed；官方合作镜像CUnit：NovaBoombotBurrowed | NovaBoombotBurrow | NovaBoombotBurrow,Execute | NovaBoombot | NovaBoombot:官方无 | NovaBoombot:开局无 |  | 合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| RoboticsFacilityWarp | XMFinal运行闭包CUnit：RoboticsFacilityWarp；底层基础镜像CUnit：RoboticsFacilityWarp；官方合作镜像CUnit：RoboticsFacilityWarp | ProtossBuild | ProtossBuild,Build18 | Probe | Probe:官方无 | Probe:开局无 | HaveCyberneticsCoreandArtanisWarpTech | 合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| StargateWarp | XMFinal运行闭包CUnit：StargateWarp；底层基础镜像CUnit：StargateWarp；官方合作镜像CUnit：StargateWarp | ProtossBuild | ProtossBuild,Build19 | Probe | Probe:官方无 | Probe:开局无 | HaveCyberneticsCoreandArtanisWarpTech | 合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| ZeratulPhotonCannon | XMFinal运行闭包CUnit：ZeratulPhotonCannon；官方合作镜像CUnit：ZeratulPhotonCannon | ZeratulBuild | ZeratulBuild,Build4 | Probe | Probe:官方无 | Probe:开局无 | HaveZeratulCyberneticsCore | 合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/commanders/futurecommanders.xml |

## 当前 active 隐藏技能产物缺 CUnit

说明：这些产物在当前模块的技能 `InfoArray` 中存在，但没有发现对应命令卡 `AbilCmd="技能,命令"`。它们通常是旧官方/编辑器残留或未开放设计，默认不按玩家可点建筑按钮修。

- 无。

