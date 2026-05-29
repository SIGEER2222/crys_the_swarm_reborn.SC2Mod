# 斯旺 / Swann 建筑单位对比

- 当前 active Mod：`D:\MyWork\新建文件夹\mom.report.client\src\MyMod\crys_the_swarm_reborn.SC2Mod\合作指挥官版起义狂潮`
- 指挥官模块：`XMSwann.SC2Mod`（存在：是）
- Wiki主要部队文件：`wikitext/14-swann.wiki`
- Wiki主要部队：恶蝠、歌利亚武装机器人、攻城坦克、飓风、雷神、怨灵战机、大力神、科学船、爆弹比利、热辣贝蒂、转转小子
- 判定口径：wiki用于中文主要部队名单；官方JSON用于ID、生产链、生命/人口/费用；active 侧优先看本指挥官模块和 `XMCore/XMFinal`，再标注新官方镜像中的 StarCoop/底层基础 Catalog 是否存在。

## 汇总

| Wiki项 | 官方行 | Wiki未匹配官方 | 官方补充未在Wiki | 当前Mod未命中 | 仅文本命中 | 仅官方合作镜像 | 底层继承候选 | 生产链异常 | 生产链底层候选 | 当前技能产物缺CUnit |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 11 | 15 | 0 | 6 | 0 | 0 | 0 | 4 | 0 | 0 | 14 |

## 三方对照

| Wiki项 | 匹配 | 分类 | 官方名称 | ID | 当前Mod | 生产链状态 | 生产/建造/变形 | 数值 | 定义文件 | 备注 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 恶蝠 | 精确匹配 | 单位 | 恶蝠 | HellionTank | 底层基础镜像CUnit：HellionTank；官方合作镜像CUnit：HellionTank | 生产链已命中 | Factory / FactoryTrain / 100晶体矿，30秒 | 生命135，人口2，视野10；100晶体矿，30秒 | 游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/void.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/swarmmulti.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 歌利亚武装机器人 | 别名匹配 | 单位 | 歌利亚武装机器人 | Goliath | 当前模块CUnit：GoliathSwann；底层基础镜像CUnit：Goliath；官方合作镜像CUnit：Goliath | 生产链已命中 | Factory / FactoryTrain |  | 合作指挥官版起义狂潮/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 攻城坦克 | 精确匹配 | 单位 | 攻城坦克 | SiegeTank | 当前模块CUnit：SiegeTankSwann, SiegeTankSiegedSwann；底层基础镜像CUnit：SiegeTank；官方合作镜像CUnit：SiegeTank | 生产链已命中 | Factory / FactoryTrain / 150晶体矿，125瓦斯，45秒 | 生命175，人口3，视野11；150晶体矿，125瓦斯，45秒 | 合作指挥官版起义狂潮/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/swarmmulti.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 飓风 | 精确匹配 | 单位 | 飓风 | Cyclone | 底层基础镜像CUnit：Cyclone；官方合作镜像CUnit：Cyclone | 生产链已命中 | Factory / FactoryTrain / 150晶体矿，100瓦斯，45秒 | 生命120，人口3，视野11；150晶体矿，100瓦斯，45秒 | 游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/void.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 雷神 | Wiki补充ID | 单位 | 雷神 | ThorSwann | 当前模块CUnit：ThorSwann；底层基础镜像CUnit：Thor；官方合作镜像CUnit：Thor | 官方JSON无生产链 |  |  | 合作指挥官版起义狂潮/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/void.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/swarmmulti.sc2mod/base.sc2data/gamedata/unitdata.xml | wiki主要部队补充：斯旺雷神优先检查ThorSwann，再检查通用Thor。 |
| 怨灵战机 | 精确匹配 | 单位 | 怨灵战机 | Wraith | 当前模块CUnit：WraithSwann；官方合作镜像CUnit：Wraith | 生产链已命中 | Starport / StarportTrain |  | 合作指挥官版起义狂潮/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 大力神 | 精确匹配 | 单位 | 大力神 | Hercules | 当前模块CUnit：HerculesSwann；官方合作镜像CUnit：Hercules | 生产链已命中 | Starport / StarportTrain / 100晶体矿，50瓦斯，40秒 | 人口3；100晶体矿，50瓦斯，40秒 | 合作指挥官版起义狂潮/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 科学船 | 精确匹配 | 单位 | 科学船 | ScienceVessel | 当前模块CUnit：ScienceVesselSwann；底层基础镜像CUnit：ScienceVessel；官方合作镜像CUnit：ScienceVessel | 生产链已命中 | Starport / StarportTrain |  | 合作指挥官版起义狂潮/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 爆弹比利 | 别名匹配 | 建筑 | 毁灭炮塔 | KelMorianGrenadeTurret | 当前模块CUnit：GrenadeTurretSwann；官方合作镜像CUnit：KelMorianGrenadeTurret | 生产链已命中 | SCV / TerranBuild / 150晶体矿，26.25秒 | 生命300，视野9；150晶体矿，26.25秒 | 合作指挥官版起义狂潮/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 热辣贝蒂 | 别名匹配 | 建筑 | 末日炮塔 | PerditionTurret | 当前模块CUnit：PerditionTurretSwann；底层基础镜像CUnit：PerditionTurret；官方合作镜像CUnit：PerditionTurret | 生产链已命中 | SCV / TerranBuild / 23秒 | 23秒 | 合作指挥官版起义狂潮/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 转转小子 | Wiki补充ID | 建筑 | 转转小子 | KelMorianMissileTurret | 底层基础镜像CUnit：MissileTurret；官方合作镜像CUnit：KelMorianMissileTurret, MissileTurret | 官方JSON无生产链 |  |  | 游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/swarmmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/swarm.sc2mod/base.sc2data/gamedata/unitdata.xml | wiki主要部队补充：转转小子是斯旺强化导弹塔，优先检查 KelMorianMissileTurret。 |
|  | 官方补充 | 单位 | 恶火 | Hellion | 底层基础镜像CUnit：Hellion；官方合作镜像CUnit：Hellion | 生产链已命中 | Factory / FactoryTrain / 100晶体矿，30秒 | 生命90，人口2，视野10；100晶体矿，30秒 | 游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/swarmmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/swarm.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 单位 | SCV | SCV | 当前模块CUnit：SCVSwann；底层基础镜像CUnit：SCV；官方合作镜像CUnit：SCV | 生产链已命中 | CommandCenter / CommandCenterTrain / 50晶体矿，17秒 | 生命45，人口1，视野8；50晶体矿，17秒 | 合作指挥官版起义狂潮/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/swarmmulti.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 补给站 | SupplyDepot | 当前模块CUnit：SupplyDepotSwann；底层基础镜像CUnit：SupplyDepot；官方合作镜像CUnit：SupplyDepot | 生产链已命中 | SCV / TerranBuild / 100晶体矿，30秒 | 生命400，视野9；100晶体矿，30秒 | 合作指挥官版起义狂潮/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/swarmmulti.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 德拉肯激光钻机 | DrakkenLaserDrillCoop | 当前模块CUnit：DrakkenLaserDrillCoop；官方合作镜像CUnit：DrakkenLaserDrillCoop | 生产链已命中 | 未知生产者 / TerranBuild / 80秒 | 生命3000，视野14；80秒 | 合作指挥官版起义狂潮/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 导弹塔 | MissileTurret | 当前模块CUnit：MissileTurretSwann；底层基础镜像CUnit：MissileTurret；官方合作镜像CUnit：MissileTurret | 生产链已命中 | SCV / TerranBuild / 100晶体矿，25秒 | 生命250，视野11；100晶体矿，25秒 | 合作指挥官版起义狂潮/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/swarmmulti.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 指挥中心 | CommandCenter | 当前模块CUnit：CommandCenterSwann；底层基础镜像CUnit：CommandCenter；官方合作镜像CUnit：CommandCenter | 生产链已命中 | SCV / TerranBuild / 400晶体矿，100秒 | 生命1500，视野11；400晶体矿，100秒 | 合作指挥官版起义狂潮/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/swarmmulti.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |

## 优先排查项

- 无。

## Wiki未匹配官方JSON

- 无。

## 官方有但Wiki主要部队未列

| 分类 | 官方名称 | ID | 当前Mod | 生产链 | 数值 |
| --- | --- | --- | --- | --- | --- |
| 单位 | 恶火 | Hellion | 底层基础镜像CUnit：Hellion；官方合作镜像CUnit：Hellion | Factory / FactoryTrain / 100晶体矿，30秒 | 生命90，人口2，视野10；100晶体矿，30秒 |
| 单位 | SCV | SCV | 当前模块CUnit：SCVSwann；底层基础镜像CUnit：SCV；官方合作镜像CUnit：SCV | CommandCenter / CommandCenterTrain / 50晶体矿，17秒 | 生命45，人口1，视野8；50晶体矿，17秒 |
| 建筑 | 补给站 | SupplyDepot | 当前模块CUnit：SupplyDepotSwann；底层基础镜像CUnit：SupplyDepot；官方合作镜像CUnit：SupplyDepot | SCV / TerranBuild / 100晶体矿，30秒 | 生命400，视野9；100晶体矿，30秒 |
| 建筑 | 德拉肯激光钻机 | DrakkenLaserDrillCoop | 当前模块CUnit：DrakkenLaserDrillCoop；官方合作镜像CUnit：DrakkenLaserDrillCoop | 未知生产者 / TerranBuild / 80秒 | 生命3000，视野14；80秒 |
| 建筑 | 导弹塔 | MissileTurret | 当前模块CUnit：MissileTurretSwann；底层基础镜像CUnit：MissileTurret；官方合作镜像CUnit：MissileTurret | SCV / TerranBuild / 100晶体矿，25秒 | 生命250，视野11；100晶体矿，25秒 |
| 建筑 | 指挥中心 | CommandCenter | 当前模块CUnit：CommandCenterSwann；底层基础镜像CUnit：CommandCenter；官方合作镜像CUnit：CommandCenter | SCV / TerranBuild / 400晶体矿，100秒 | 生命1500，视野11；400晶体矿，100秒 |

## 当前 active 技能产物缺 CUnit

说明：只扫描当前指挥官模块里的 `CAbilTrain/CAbilWarpTrain/CAbilBuild/CAbilMorph`。如果技能产物在当前模块、XM共享模块、底层基础镜像都没有 `CUnit`，就列在这里；这类是当前 Mod 按钮链路的直接风险。

| 产物ID | 命中状态 | 引用技能 | 引用文件 |
| --- | --- | --- | --- |
| BansheeSwann | 当前模块仅引用：BansheeSwann | StarportTrainSwann | 合作指挥官版起义狂潮/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| BattlecruiserSwann | 当前模块仅引用：BattlecruiserSwann | StarportTrainSwann | 合作指挥官版起义狂潮/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| BomberLaunchPadSwann | 当前模块仅引用：BomberLaunchPadSwann | TerranBuildSwann | 合作指挥官版起义狂潮/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| CycloneSwann | 当前模块仅引用：CycloneSwann | FactoryTrainSwann | 合作指挥官版起义狂潮/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| DiamondbackSwann | 当前模块仅引用：DiamondbackSwann | FactoryTrainSwann | 合作指挥官版起义狂潮/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| HellionSwann | 当前模块仅引用：HellionSwann | FactoryTrainSwann | 合作指挥官版起义狂潮/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| HellionTankSwann | 当前模块仅引用：HellionTankSwann | FactoryTrainSwann | 合作指挥官版起义狂潮/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| LiberatorSwann | 当前模块仅引用：LiberatorSwann | StarportTrainSwann | 合作指挥官版起义狂潮/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| MedivacSwann | 当前模块仅引用：MedivacSwann | StarportTrainSwann | 合作指挥官版起义狂潮/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| RavenSwann | 当前模块仅引用：RavenSwann | StarportTrainSwann | 合作指挥官版起义狂潮/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| RefineryRichSwann | 当前模块仅引用：RefineryRichSwann | TerranBuildSwann | 合作指挥官版起义狂潮/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| VikingFighterSwann | 当前模块仅引用：VikingFighterSwann | StarportTrainSwann | 合作指挥官版起义狂潮/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| VultureSwann | 当前模块仅引用：VultureSwann | FactoryTrainSwann | 合作指挥官版起义狂潮/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| WidowMineSwann | 当前模块仅引用：WidowMineSwann | FactoryTrainSwann | 合作指挥官版起义狂潮/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/AbilData.xml |

