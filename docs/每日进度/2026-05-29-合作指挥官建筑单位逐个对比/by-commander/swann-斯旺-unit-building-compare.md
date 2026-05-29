# 斯旺 / Swann 建筑单位对比

- 当前 active Mod：`D:\MyWork\新建文件夹\mom.report.client\src\MyMod\crys_the_swarm_reborn.SC2Mod\合作指挥官版起义狂潮`
- 指挥官模块：`XMSwann.SC2Mod`（存在：是）
- 旧线初始化开局单位：commandcenterswann、scvswann、unfinisheddrakkenlaserdrillcoop
- Wiki主要部队文件：`wikitext/14-swann.wiki`
- Wiki主要部队：恶蝠、歌利亚武装机器人、攻城坦克、飓风、雷神、怨灵战机、大力神、科学船、爆弹比利、热辣贝蒂、转转小子
- 判定口径：wiki用于中文主要部队名单；官方JSON用于ID、生产链、生命/人口/费用；active 侧先看本指挥官模块和 `XMCore/XMFinal`，再看 `XMFinal.SC2Mod/DocumentInfo` 实际运行闭包，最后只把官方镜像作为事实参考。

## 汇总

| Wiki项 | 官方行 | Wiki未匹配官方 | 官方补充未在Wiki | 当前Mod未命中 | 仅文本命中 | 运行闭包命中 | 仅官方合作镜像 | 底层继承候选 | 生产链异常 | 生产链运行闭包 | 生产链底层候选 | 官方面板缺口 | 特殊面板项 | 命令卡露出产物缺CUnit | 外来生产链露出 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 11 | 15 | 0 | 6 | 0 | 0 | 1 | 0 | 0 | 0 | 1 | 0 | 0 | 0 | 0 | 0 |

## 三方对照

| Wiki项 | 匹配 | 分类 | 官方名称 | ID | 当前Mod | 生产链状态 | 当前面板 | 生产/建造/变形 | 数值 | 定义文件 | 备注 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 恶蝠 | 精确匹配 | 单位 | 恶蝠 | HellionTank | 当前模块CUnit：HellionTankSwann；XMFinal运行闭包CUnit：HellionTank；底层基础镜像CUnit：HellionTank；官方合作镜像CUnit：HellionTank | 生产链已命中 | 当前面板已露出：FactoryTrainSwann,Train7 -> HellionTankSwann | Factory / FactoryTrain / 100晶体矿，30秒 | 生命135，人口2，视野10；100晶体矿，30秒 | 合作指挥官版起义狂潮/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZeratul.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZagara.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 歌利亚武装机器人 | 别名匹配 | 单位 | 歌利亚武装机器人 | Goliath | 当前模块CUnit：GoliathSwann；XMFinal运行闭包CUnit：Goliath；底层基础镜像CUnit：Goliath；官方合作镜像CUnit：Goliath | 生产链已命中 | 当前面板已露出：FactoryTrainSwann,Train3 -> GoliathSwann | Factory / FactoryTrain |  | 合作指挥官版起义狂潮/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZeratul.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZagara.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 攻城坦克 | 精确匹配 | 单位 | 攻城坦克 | SiegeTank | 当前模块CUnit：SiegeTankSwann, SiegeTankSiegedSwann；XMFinal运行闭包CUnit：SiegeTank；底层基础镜像CUnit：SiegeTank；官方合作镜像CUnit：SiegeTank | 生产链已命中 | 当前面板已露出：FactoryTrainSwann,Train2 -> SiegeTankSwann | Factory / FactoryTrain / 150晶体矿，125瓦斯，45秒 | 生命175，人口3，视野11；150晶体矿，125瓦斯，45秒 | 合作指挥官版起义狂潮/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZeratul.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZagara.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 飓风 | 精确匹配 | 单位 | 飓风 | Cyclone | 当前模块CUnit：CycloneSwann；XMFinal运行闭包CUnit：Cyclone；底层基础镜像CUnit：Cyclone；官方合作镜像CUnit：Cyclone | 生产链已命中 | 当前面板已露出：FactoryTrainSwann,Train8 -> CycloneSwann | Factory / FactoryTrain / 150晶体矿，100瓦斯，45秒 | 生命120，人口3，视野11；150晶体矿，100瓦斯，45秒 | 合作指挥官版起义狂潮/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZeratul.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZagara.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 雷神 | Wiki补充ID | 单位 | 雷神 | ThorSwann | 当前模块CUnit：ThorSwann；XMFinal运行闭包CUnit：Thor；底层基础镜像CUnit：Thor；官方合作镜像CUnit：Thor | 官方JSON无生产链 | 官方JSON无生产链 |  |  | 合作指挥官版起义狂潮/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZeratul.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZagara.SC2Mod/Base.SC2Data/GameData/UnitData.xml | wiki主要部队补充：斯旺雷神优先检查ThorSwann，再检查通用Thor。 |
| 怨灵战机 | 精确匹配 | 单位 | 怨灵战机 | Wraith | 当前模块CUnit：WraithSwann；XMFinal运行闭包CUnit：Wraith；底层基础镜像CUnit：Wraith；官方合作镜像CUnit：Wraith | 生产链已命中 | 当前面板已露出：StarportTrainSwann,Train8 -> WraithSwann | Starport / StarportTrain |  | 合作指挥官版起义狂潮/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMAbathurReborn.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMAbathur.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/libertystory.sc2campaign/base.sc2data/gamedata/unitdata.xml |  |
| 大力神 | 精确匹配 | 单位 | 大力神 | Hercules | 当前模块CUnit：HerculesSwann；XMFinal运行闭包CUnit：Hercules；底层基础镜像CUnit：Hercules；官方合作镜像CUnit：Hercules | 生产链已命中 | 当前面板已露出：StarportTrainSwann,Train6 -> HerculesSwann | Starport / StarportTrain / 100晶体矿，50瓦斯，40秒 | 人口3；100晶体矿，50瓦斯，40秒 | 合作指挥官版起义狂潮/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZeratul.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZagara.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 科学船 | 精确匹配 | 单位 | 科学船 | ScienceVessel | 当前模块CUnit：ScienceVesselSwann；XMFinal运行闭包CUnit：ScienceVessel；底层基础镜像CUnit：ScienceVessel；官方合作镜像CUnit：ScienceVessel | 生产链已命中 | 当前面板已露出：StarportTrainSwann,Train9 -> ScienceVesselSwann | Starport / StarportTrain |  | 合作指挥官版起义狂潮/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZeratul.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZagara.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 爆弹比利 | 别名匹配 | 建筑 | 毁灭炮塔 | KelMorianGrenadeTurret | 当前模块CUnit：GrenadeTurretSwann；XMFinal运行闭包CUnit：KelMorianGrenadeTurret；官方合作镜像CUnit：KelMorianGrenadeTurret | 生产链已命中 | 当前面板已露出同命令，产物ID需别名核对：TerranBuild,Build27 -> KelMorianGrenadeTurret；官方期望 grenadeturretswann | SCV / TerranBuild / 150晶体矿，26.25秒 | 生命300，视野9；150晶体矿，26.25秒 | 合作指挥官版起义狂潮/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMVorazun.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMKerrigan.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 热辣贝蒂 | 别名匹配 | 建筑 | 末日炮塔 | PerditionTurret | 当前模块CUnit：PerditionTurretSwann；XMFinal运行闭包CUnit：PerditionTurret；底层基础镜像CUnit：PerditionTurret；官方合作镜像CUnit：PerditionTurret | 生产链已命中 | 当前面板已露出同命令，产物ID需别名核对：TerranBuild,Build20 -> PerditionTurret；官方期望 perditionturretswann | SCV / TerranBuild / 23秒 | 23秒 | 合作指挥官版起义狂潮/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZeratul.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZagara.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 转转小子 | Wiki补充ID | 建筑 | 转转小子 | KelMorianMissileTurret | XMFinal运行闭包CUnit：KelMorianMissileTurret, MissileTurret；底层基础镜像CUnit：MissileTurret；官方合作镜像CUnit：KelMorianMissileTurret, MissileTurret | 官方JSON无生产链 | 官方JSON无生产链 |  |  | 合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMVorazun.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMKerrigan.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMKarax.SC2Mod/Base.SC2Data/GameData/UnitData.xml | wiki主要部队补充：转转小子是斯旺强化导弹塔，优先检查 KelMorianMissileTurret。 |
|  | 官方补充 | 单位 | 恶火 | Hellion | 当前模块CUnit：HellionSwann；XMFinal运行闭包CUnit：Hellion；底层基础镜像CUnit：Hellion；官方合作镜像CUnit：Hellion | 生产链已命中 | 当前面板已露出：FactoryTrainSwann,Train6 -> HellionSwann | Factory / FactoryTrain / 100晶体矿，30秒 | 生命90，人口2，视野10；100晶体矿，30秒 | 合作指挥官版起义狂潮/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZeratul.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZagara.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 单位 | SCV | SCV | 当前模块CUnit：SCVSwann；XMFinal运行闭包CUnit：SCV；底层基础镜像CUnit：SCV；官方合作镜像CUnit：SCV | 生产链已命中 | 当前面板已露出：CommandCenterTrainSwann,Train1 -> SCVSwann | CommandCenter / CommandCenterTrain / 50晶体矿，17秒 | 生命45，人口1，视野8；50晶体矿，17秒 | 合作指挥官版起义狂潮/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMAbathurReborn.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMAbathur.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 补给站 | SupplyDepot | 当前模块CUnit：SupplyDepotSwann；XMFinal运行闭包CUnit：SupplyDepot；底层基础镜像CUnit：SupplyDepot；官方合作镜像CUnit：SupplyDepot | 生产链已命中 | 当前面板已露出：TerranBuildSwann,Build2 -> SupplyDepotSwann | SCV / TerranBuild / 100晶体矿，30秒 | 生命400，视野9；100晶体矿，30秒 | 合作指挥官版起义狂潮/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZeratul.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZagara.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 德拉肯激光钻机 | DrakkenLaserDrillCoop | 当前模块CUnit：DrakkenLaserDrillCoop；XMFinal运行闭包CUnit：DrakkenLaserDrillCoop；官方合作镜像CUnit：DrakkenLaserDrillCoop | 生产链在 XMFinal 运行闭包命中 | 当前面板已露出：KelMorianWorkerBuild,Build24 -> DrakkenLaserDrillCoop | KelMorianWorker / KelMorianWorkerBuild / 60秒 | 生命3000，视野14；60秒 | 合作指挥官版起义狂潮/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZeratul.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZagara.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 导弹塔 | MissileTurret | 当前模块CUnit：MissileTurretSwann；XMFinal运行闭包CUnit：MissileTurret；底层基础镜像CUnit：MissileTurret；官方合作镜像CUnit：MissileTurret | 生产链已命中 | 当前面板已露出：TerranBuildSwann,Build6 -> MissileTurretSwann | SCV / TerranBuild / 100晶体矿，25秒 | 生命250，视野11；100晶体矿，25秒 | 合作指挥官版起义狂潮/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMAbathurReborn.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMAbathur.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 指挥中心 | CommandCenter | 当前模块CUnit：CommandCenterSwann；XMFinal运行闭包CUnit：CommandCenter；底层基础镜像CUnit：CommandCenter；官方合作镜像CUnit：CommandCenter | 生产链已命中 | 当前面板已露出：TerranBuildSwann,Build1 -> CommandCenterSwann | SCV / TerranBuild / 400晶体矿，100秒 | 生命1500，视野11；400晶体矿，100秒 | 合作指挥官版起义狂潮/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZeratul.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZagara.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |

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
| 单位 | 恶火 | Hellion | 当前模块CUnit：HellionSwann；XMFinal运行闭包CUnit：Hellion；底层基础镜像CUnit：Hellion；官方合作镜像CUnit：Hellion | Factory / FactoryTrain / 100晶体矿，30秒 | 生命90，人口2，视野10；100晶体矿，30秒 |
| 单位 | SCV | SCV | 当前模块CUnit：SCVSwann；XMFinal运行闭包CUnit：SCV；底层基础镜像CUnit：SCV；官方合作镜像CUnit：SCV | CommandCenter / CommandCenterTrain / 50晶体矿，17秒 | 生命45，人口1，视野8；50晶体矿，17秒 |
| 建筑 | 补给站 | SupplyDepot | 当前模块CUnit：SupplyDepotSwann；XMFinal运行闭包CUnit：SupplyDepot；底层基础镜像CUnit：SupplyDepot；官方合作镜像CUnit：SupplyDepot | SCV / TerranBuild / 100晶体矿，30秒 | 生命400，视野9；100晶体矿，30秒 |
| 建筑 | 德拉肯激光钻机 | DrakkenLaserDrillCoop | 当前模块CUnit：DrakkenLaserDrillCoop；XMFinal运行闭包CUnit：DrakkenLaserDrillCoop；官方合作镜像CUnit：DrakkenLaserDrillCoop | KelMorianWorker / KelMorianWorkerBuild / 60秒 | 生命3000，视野14；60秒 |
| 建筑 | 导弹塔 | MissileTurret | 当前模块CUnit：MissileTurretSwann；XMFinal运行闭包CUnit：MissileTurret；底层基础镜像CUnit：MissileTurret；官方合作镜像CUnit：MissileTurret | SCV / TerranBuild / 100晶体矿，25秒 | 生命250，视野11；100晶体矿，25秒 |
| 建筑 | 指挥中心 | CommandCenter | 当前模块CUnit：CommandCenterSwann；XMFinal运行闭包CUnit：CommandCenter；底层基础镜像CUnit：CommandCenter；官方合作镜像CUnit：CommandCenter | SCV / TerranBuild / 400晶体矿，100秒 | 生命1500，视野11；400晶体矿，100秒 |

## 当前 active 命令卡露出产物缺 CUnit

说明：只扫描当前指挥官模块里已挂到单位命令卡 `AbilCmd="技能,命令"` 的 `CAbilTrain/CAbilWarpTrain/CAbilBuild/CAbilMorph` 产物。产物在当前模块、XM共享模块、XMFinal运行闭包和底层基础镜像都没有 `CUnit` 时列在这里；这类才是当前 Mod 玩家按钮链路的直接风险。XML 注释已在扫描前剔除。

- 无。

## 当前 active 外来生产链露出

说明：这些按钮的产物能在 XMFinal 运行闭包或官方合作镜像中解析，但生产者不属于该指挥官官方体系。它们不是“缺 CUnit”，更像跨指挥官命令卡污染或共享基础单位需要加选择门槛。

- 无。

## 当前 active 隐藏技能产物缺 CUnit

说明：这些产物在当前模块的技能 `InfoArray` 中存在，但没有发现对应命令卡 `AbilCmd="技能,命令"`。它们通常是旧官方/编辑器残留或未开放设计，默认不按玩家可点建筑按钮修。

- 无。

