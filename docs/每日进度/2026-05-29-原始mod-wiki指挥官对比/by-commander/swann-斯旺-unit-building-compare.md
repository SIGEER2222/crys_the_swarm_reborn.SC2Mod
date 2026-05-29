# 斯旺 / Swann 建筑单位对比

- 当前 active Mod：`D:\MyWork\新建文件夹\mom.report.client\src\MyMod\crys_the_swarm_reborn.SC2Mod\原始mod`
- 指挥官模块：`XMSwann.SC2Mod`（存在：是）
- 旧线初始化开局单位：commandcenterswann、scvswann、unfinisheddrakkenlaserdrillcoop
- Wiki主要部队文件：`wikitext/14-swann.wiki`
- Wiki主要部队：恶蝠、歌利亚武装机器人、攻城坦克、飓风、雷神、怨灵战机、大力神、科学船、爆弹比利、热辣贝蒂、转转小子
- 判定口径：wiki用于中文主要部队名单；官方JSON用于ID、生产链、生命/人口/费用；active 侧先看本指挥官模块和 `XMCore/XMFinal`，再看 `XMFinal.SC2Mod/DocumentInfo` 实际运行闭包，最后只把官方镜像作为事实参考。

## 汇总

| Wiki项 | 官方行 | Wiki未匹配官方 | 官方补充未在Wiki | 当前Mod未命中 | 仅文本命中 | 运行闭包命中 | 仅官方合作镜像 | 底层继承候选 | 生产链异常 | 生产链运行闭包 | 生产链底层候选 | 命令卡露出产物缺CUnit | 外来生产链露出 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 11 | 15 | 0 | 6 | 0 | 0 | 0 | 0 | 3 | 0 | 0 | 0 | 0 | 0 |

## 三方对照

| Wiki项 | 匹配 | 分类 | 官方名称 | ID | 当前Mod | 生产链状态 | 生产/建造/变形 | 数值 | 定义文件 | 备注 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 恶蝠 | 精确匹配 | 单位 | 恶蝠 | HellionTank | 底层基础镜像CUnit：HellionTank；官方合作镜像CUnit：HellionTank | 生产链已命中 | Factory / FactoryTrain / 100晶体矿，30秒 | 生命135，人口2，视野10；100晶体矿，30秒 | 游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/void.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/swarmmulti.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 歌利亚武装机器人 | 别名匹配 | 单位 | 歌利亚武装机器人 | Goliath | 当前模块CUnit：GoliathSwann；底层基础镜像CUnit：Goliath；官方合作镜像CUnit：Goliath | 生产链已命中 | Factory / FactoryTrain |  | 原始mod/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 攻城坦克 | 精确匹配 | 单位 | 攻城坦克 | SiegeTank | 当前模块CUnit：SiegeTankSwann, SiegeTankSiegedSwann；XM共享模块CUnit：SiegeTank；底层基础镜像CUnit：SiegeTank；官方合作镜像CUnit：SiegeTank | 生产链已命中 | Factory / FactoryTrain / 150晶体矿，125瓦斯，45秒 | 生命175，人口3，视野11；150晶体矿，125瓦斯，45秒 | 原始mod/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 飓风 | 精确匹配 | 单位 | 飓风 | Cyclone | 底层基础镜像CUnit：Cyclone；官方合作镜像CUnit：Cyclone | 生产链已命中 | Factory / FactoryTrain / 150晶体矿，100瓦斯，45秒 | 生命120，人口3，视野11；150晶体矿，100瓦斯，45秒 | 游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/void.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 雷神 | Wiki补充ID | 单位 | 雷神 | ThorSwann | 当前模块CUnit：ThorSwann；底层基础镜像CUnit：Thor；官方合作镜像CUnit：Thor | 官方JSON无生产链 |  |  | 原始mod/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/void.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/swarmmulti.sc2mod/base.sc2data/gamedata/unitdata.xml | wiki主要部队补充：斯旺雷神优先检查ThorSwann，再检查通用Thor。 |
| 怨灵战机 | 精确匹配 | 单位 | 怨灵战机 | Wraith | 当前模块CUnit：WraithSwann；官方合作镜像CUnit：Wraith | 生产链已命中 | Starport / StarportTrain |  | 原始mod/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 大力神 | 精确匹配 | 单位 | 大力神 | Hercules | 当前模块CUnit：HerculesSwann；官方合作镜像CUnit：Hercules | 生产链已命中 | Starport / StarportTrain / 100晶体矿，50瓦斯，40秒 | 人口3；100晶体矿，50瓦斯，40秒 | 原始mod/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 科学船 | 精确匹配 | 单位 | 科学船 | ScienceVessel | 当前模块CUnit：ScienceVesselSwann；底层基础镜像CUnit：ScienceVessel；官方合作镜像CUnit：ScienceVessel | 生产链已命中 | Starport / StarportTrain |  | 原始mod/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 爆弹比利 | 别名匹配 | 建筑 | 毁灭炮塔 | KelMorianGrenadeTurret | 当前模块CUnit：GrenadeTurretSwann；官方合作镜像CUnit：KelMorianGrenadeTurret | 生产链已命中 | SCV / TerranBuild / 150晶体矿，26.25秒 | 生命300，视野9；150晶体矿，26.25秒 | 原始mod/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 热辣贝蒂 | 别名匹配 | 建筑 | 末日炮塔 | PerditionTurret | 当前模块CUnit：PerditionTurretSwann；底层基础镜像CUnit：PerditionTurret；官方合作镜像CUnit：PerditionTurret | 生产链已命中 | SCV / TerranBuild / 23秒 | 23秒 | 原始mod/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 转转小子 | Wiki补充ID | 建筑 | 转转小子 | KelMorianMissileTurret | XM共享模块CUnit：MissileTurret；底层基础镜像CUnit：MissileTurret；官方合作镜像CUnit：KelMorianMissileTurret, MissileTurret | 官方JSON无生产链 |  |  | 原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/swarmmulti.sc2mod/base.sc2data/gamedata/unitdata.xml | wiki主要部队补充：转转小子是斯旺强化导弹塔，优先检查 KelMorianMissileTurret。 |
|  | 官方补充 | 单位 | 恶火 | Hellion | 底层基础镜像CUnit：Hellion；官方合作镜像CUnit：Hellion | 生产链已命中 | Factory / FactoryTrain / 100晶体矿，30秒 | 生命90，人口2，视野10；100晶体矿，30秒 | 游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/swarmmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/swarm.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 单位 | SCV | SCV | 当前模块CUnit：SCVSwann；XM共享模块CUnit：SCV；底层基础镜像CUnit：SCV；官方合作镜像CUnit：SCV | 生产链已命中 | CommandCenter / CommandCenterTrain / 50晶体矿，17秒 | 生命45，人口1，视野8；50晶体矿，17秒 | 原始mod/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 补给站 | SupplyDepot | 当前模块CUnit：SupplyDepotSwann；XM共享模块CUnit：SupplyDepot；底层基础镜像CUnit：SupplyDepot；官方合作镜像CUnit：SupplyDepot | 生产链已命中 | SCV / TerranBuild / 100晶体矿，30秒 | 生命400，视野9；100晶体矿，30秒 | 原始mod/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 德拉肯激光钻机 | DrakkenLaserDrillCoop | 当前模块CUnit：DrakkenLaserDrillCoop；官方合作镜像CUnit：DrakkenLaserDrillCoop | 生产链已命中 | 未知生产者 / TerranBuild / 80秒 | 生命3000，视野14；80秒 | 原始mod/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 导弹塔 | MissileTurret | 当前模块CUnit：MissileTurretSwann；XM共享模块CUnit：MissileTurret；底层基础镜像CUnit：MissileTurret；官方合作镜像CUnit：MissileTurret | 生产链已命中 | SCV / TerranBuild / 100晶体矿，25秒 | 生命250，视野11；100晶体矿，25秒 | 原始mod/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 指挥中心 | CommandCenter | 当前模块CUnit：CommandCenterSwann；XM共享模块CUnit：CommandCenter；底层基础镜像CUnit：CommandCenter；官方合作镜像CUnit：CommandCenter | 生产链已命中 | SCV / TerranBuild / 400晶体矿，100秒 | 生命1500，视野11；400晶体矿，100秒 | 原始mod/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |

## 优先排查项

- 无。

## Wiki未匹配官方JSON

- 无。

## 官方有但Wiki主要部队未列

| 分类 | 官方名称 | ID | 当前Mod | 生产链 | 数值 |
| --- | --- | --- | --- | --- | --- |
| 单位 | 恶火 | Hellion | 底层基础镜像CUnit：Hellion；官方合作镜像CUnit：Hellion | Factory / FactoryTrain / 100晶体矿，30秒 | 生命90，人口2，视野10；100晶体矿，30秒 |
| 单位 | SCV | SCV | 当前模块CUnit：SCVSwann；XM共享模块CUnit：SCV；底层基础镜像CUnit：SCV；官方合作镜像CUnit：SCV | CommandCenter / CommandCenterTrain / 50晶体矿，17秒 | 生命45，人口1，视野8；50晶体矿，17秒 |
| 建筑 | 补给站 | SupplyDepot | 当前模块CUnit：SupplyDepotSwann；XM共享模块CUnit：SupplyDepot；底层基础镜像CUnit：SupplyDepot；官方合作镜像CUnit：SupplyDepot | SCV / TerranBuild / 100晶体矿，30秒 | 生命400，视野9；100晶体矿，30秒 |
| 建筑 | 德拉肯激光钻机 | DrakkenLaserDrillCoop | 当前模块CUnit：DrakkenLaserDrillCoop；官方合作镜像CUnit：DrakkenLaserDrillCoop | 未知生产者 / TerranBuild / 80秒 | 生命3000，视野14；80秒 |
| 建筑 | 导弹塔 | MissileTurret | 当前模块CUnit：MissileTurretSwann；XM共享模块CUnit：MissileTurret；底层基础镜像CUnit：MissileTurret；官方合作镜像CUnit：MissileTurret | SCV / TerranBuild / 100晶体矿，25秒 | 生命250，视野11；100晶体矿，25秒 |
| 建筑 | 指挥中心 | CommandCenter | 当前模块CUnit：CommandCenterSwann；XM共享模块CUnit：CommandCenter；底层基础镜像CUnit：CommandCenter；官方合作镜像CUnit：CommandCenter | SCV / TerranBuild / 400晶体矿，100秒 | 生命1500，视野11；400晶体矿，100秒 |

## 当前 active 命令卡露出产物缺 CUnit

说明：只扫描当前指挥官模块里已挂到单位命令卡 `AbilCmd="技能,命令"` 的 `CAbilTrain/CAbilWarpTrain/CAbilBuild/CAbilMorph` 产物。产物在当前模块、XM共享模块、XMFinal运行闭包和底层基础镜像都没有 `CUnit` 时列在这里；这类才是当前 Mod 玩家按钮链路的直接风险。XML 注释已在扫描前剔除。

- 无。

## 当前 active 外来生产链露出

说明：这些按钮的产物能在 XMFinal 运行闭包或官方合作镜像中解析，但生产者不属于该指挥官官方体系。它们不是“缺 CUnit”，更像跨指挥官命令卡污染或共享基础单位需要加选择门槛。

- 无。

## 当前 active 隐藏技能产物缺 CUnit

说明：这些产物在当前模块的技能 `InfoArray` 中存在，但没有发现对应命令卡 `AbilCmd="技能,命令"`。它们通常是旧官方/编辑器残留或未开放设计，默认不按玩家可点建筑按钮修。

| 产物ID | 命中状态 | 引用技能 | 未露出命令 | 生产者 | 生产者归属 | 开局归属 | 按钮门槛 | 引用文件 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| BansheeSwann | 当前模块仅引用：BansheeSwann | StarportTrainSwann | StarportTrainSwann,Train2 |  |  |  | HaveAttachedTechLab | 原始mod/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| BattlecruiserSwann | 当前模块仅引用：BattlecruiserSwann | StarportTrainSwann | StarportTrainSwann,Train4 |  |  |  | HaveAttachedStarportTechLabAndFusionCore | 原始mod/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| BomberLaunchPadSwann | 当前模块仅引用：BomberLaunchPadSwann | TerranBuildSwann | TerranBuildSwann,Build30 |  |  |  | HaveFactory | 原始mod/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| CycloneSwann | 当前模块仅引用：CycloneSwann | FactoryTrainSwann | FactoryTrainSwann,Train8 |  |  |  | HaveAttachedTechLab | 原始mod/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| DiamondbackSwann | 当前模块仅引用：DiamondbackSwann | FactoryTrainSwann | FactoryTrainSwann,Train4 |  |  |  | HaveAttachedTechLab | 原始mod/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| HellionSwann | 当前模块仅引用：HellionSwann | FactoryTrainSwann | FactoryTrainSwann,Train6, FactoryTrainSwann,Train20 |  |  |  | Restricted | 原始mod/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| HellionTankSwann | 当前模块仅引用：HellionTankSwann | FactoryTrainSwann | FactoryTrainSwann,Train7 |  |  |  | HaveArmory | 原始mod/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| LiberatorSwann | 当前模块仅引用：LiberatorSwann | StarportTrainSwann | StarportTrainSwann,Train7 |  |  |  | Restricted | 原始mod/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| MedivacSwann | 当前模块仅引用：MedivacSwann | StarportTrainSwann | StarportTrainSwann,Train1 |  |  |  | Restricted | 原始mod/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| RavenSwann | 当前模块仅引用：RavenSwann | StarportTrainSwann | StarportTrainSwann,Train3 |  |  |  | HaveAttachedTechLab | 原始mod/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| RefineryRichSwann | 当前模块仅引用：RefineryRichSwann | TerranBuildSwann | TerranBuildSwann,Build8 |  |  |  |  | 原始mod/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| VikingFighterSwann | 当前模块仅引用：VikingFighterSwann | StarportTrainSwann | StarportTrainSwann,Train5 |  |  |  | Restricted | 原始mod/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| VultureSwann | 当前模块仅引用：VultureSwann | FactoryTrainSwann | FactoryTrainSwann,Train10 |  |  |  | Restricted | 原始mod/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| WidowMineSwann | 当前模块仅引用：WidowMineSwann | FactoryTrainSwann | FactoryTrainSwann,Train25 |  |  |  |  | 原始mod/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/AbilData.xml |

