# 霍纳与汉 / Horner 建筑单位对比

- 当前 active Mod：`D:\MyWork\新建文件夹\mom.report.client\src\MyMod\crys_the_swarm_reborn.SC2Mod\原始mod`
- 指挥官模块：`XMMira.SC2Mod`（存在：是）
- 旧线初始化开局单位：commandcentermira、scvmira、starportmira
- Wiki主要部队文件：`wikitext/06-horner-han.wiki`
- Wiki主要部队：突击炮舰、收割者、恶蝠、寡妇雷、阿斯忒瑞亚怨灵战机、德摩斯维京战机、忒伊亚铁鸦、至尊战列巡航舰、导弹塔
- 判定口径：wiki用于中文主要部队名单；官方JSON用于ID、生产链、生命/人口/费用；active 侧先看本指挥官模块和 `XMCore/XMFinal`，再看 `XMFinal.SC2Mod/DocumentInfo` 实际运行闭包，最后只把官方镜像作为事实参考。

## 汇总

| Wiki项 | 官方行 | Wiki未匹配官方 | 官方补充未在Wiki | 当前Mod未命中 | 仅文本命中 | 运行闭包命中 | 仅官方合作镜像 | 底层继承候选 | 生产链异常 | 生产链运行闭包 | 生产链底层候选 | 命令卡露出产物缺CUnit | 外来生产链露出 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 9 | 10 | 0 | 3 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 0 | 0 |

## 三方对照

| Wiki项 | 匹配 | 分类 | 官方名称 | ID | 当前Mod | 生产链状态 | 生产/建造/变形 | 数值 | 定义文件 | 备注 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 突击炮舰 | Wiki补充ID | 建筑 | 突击炮舰 | MercenarySpaceStationMira | 当前模块CUnit：MercenarySpaceStationMira, MercStarportMira, StarportMira | 官方JSON无生产链 |  |  | 原始mod/Mods/XM/XMMira.SC2Mod/Base.SC2Data/GameData/UnitData.xml | wiki主要部队补充：当前Mod为米拉/霍纳旧线命名，按佣兵平台/星港相关ID检查。 |
| 收割者 | 精确匹配 | 单位 | 收割者 | HHReaper | 当前模块CUnit：ReaperMira, ReaperMiraFlying；官方合作镜像CUnit：HHReaper | 生产链已命中 | HHMercStarportUpgraded / SummonHornerMercenaries / 50晶体矿，14秒 | 生命60，人口1，视野9；50晶体矿，14秒 | 原始mod/Mods/XM/XMMira.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 恶蝠 | 精确匹配 | 单位 | 恶蝠 | HHHellionTank | 当前模块CUnit：HellionTankMira；官方合作镜像CUnit：HHHellionTank | 生产链已命中 | HHMercStarportUpgraded / SummonHornerMercenaries / 100晶体矿，14秒 | 生命235，人口2，视野10；100晶体矿，14秒 | 原始mod/Mods/XM/XMMira.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 寡妇雷 | 精确匹配 | 单位 | 寡妇雷 | HHWidowMine | 当前模块CUnit：WidowMineMira, WidowMineMiraBurrowed；官方合作镜像CUnit：HHWidowMine | 生产链已命中 | HHMercStarportUpgraded / SummonHornerMercenaries / 100晶体矿，21秒 | 生命90，人口2，视野7；100晶体矿，21秒 | 原始mod/Mods/XM/XMMira.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 阿斯忒瑞亚怨灵战机 | 精确匹配 | 单位 | 阿斯忒瑞亚怨灵战机 | HHWraith | 当前模块CUnit：WraithMira；官方合作镜像CUnit：HHWraith | 生产链已命中 | HHStarport / HHStarportTrainHorner / 800晶体矿，400瓦斯，300秒 | 生命400，人口4，视野8；800晶体矿，400瓦斯，300秒 | 原始mod/Mods/XM/XMMira.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 德摩斯维京战机 | 精确匹配 | 单位 | 德摩斯维京战机 | HHVikingFighter | 当前模块CUnit：VikingFighterMira, VikingAssaultMira；官方合作镜像CUnit：HHVikingFighter | 生产链已命中 | HHStarport / HHStarportTrainHorner / 800晶体矿，500瓦斯，300秒 | 生命350，人口4，视野10；800晶体矿，500瓦斯，300秒 | 原始mod/Mods/XM/XMMira.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 忒伊亚铁鸦 | 精确匹配 | 单位 | 忒伊亚铁鸦 | HHRaven | 当前模块CUnit：RavenMira, RavenMiraSiege；官方合作镜像CUnit：HHRaven | 生产链已命中 | HHStarport / HHStarportTrainHorner / 100晶体矿，200瓦斯，180秒 | 生命140，人口2，视野11；100晶体矿，200瓦斯，180秒 | 原始mod/Mods/XM/XMMira.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 至尊战列巡航舰 | 精确匹配 | 单位 | 至尊战列巡航舰 | HHBattlecruiser | 当前模块CUnit：BattlecruiserMira；官方合作镜像CUnit：HHBattlecruiser | 生产链已命中 | HHStarport / HHStarportTrainHorner / 1000晶体矿，800瓦斯，300秒 | 生命900，人口10，视野12；1000晶体矿，800瓦斯，300秒 | 原始mod/Mods/XM/XMMira.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 导弹塔 | Wiki补充ID | 建筑 | 导弹塔 | MissileTurretMira | 当前模块CUnit：MissileTurretMira；XM共享模块CUnit：MissileTurret；底层基础镜像CUnit：MissileTurret；官方合作镜像CUnit：MissileTurret | 官方JSON无生产链 |  |  | 原始mod/Mods/XM/XMMira.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml | wiki主要部队补充：霍纳与汉当前Mod旧线使用Mira后缀。 |
|  | 官方补充 | 单位 | 恶火 | HHHellion | 当前模块CUnit：HellionMira；官方合作镜像CUnit：HHHellion | 生产链已命中 | HHHellionTank / MorphToHHHellion / 0晶体矿，4秒 | 生命90，人口2，视野10；0晶体矿，4秒 | 原始mod/Mods/XM/XMMira.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 单位 | 掠食者 | Predator | 当前模块CUnit：CycloneMira, WidowMineMira, WidowMineMiraBurrowed；底层基础镜像CUnit：Predator；官方合作镜像CUnit：Predator | 生产链已命中 | HHMercStarportUpgraded / SummonHornerMercenaries / 21秒 | 21秒 | 原始mod/Mods/XM/XMMira.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 单位 | 解放者 | Liberator | 当前模块CUnit：LiberatorMira, LiberatorMiraAG；底层基础镜像CUnit：Liberator；官方合作镜像CUnit：Liberator | 生产链在底层基础镜像命中，需实机确认 active 是否继承 | Starport / StarportTrain / 150晶体矿，125瓦斯，60秒 | 生命180，人口3，视野9；150晶体矿，125瓦斯，60秒 | 原始mod/Mods/XM/XMMira.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/void.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |

## 优先排查项

- 无。

## Wiki未匹配官方JSON

- 无。

## 官方有但Wiki主要部队未列

| 分类 | 官方名称 | ID | 当前Mod | 生产链 | 数值 |
| --- | --- | --- | --- | --- | --- |
| 单位 | 恶火 | HHHellion | 当前模块CUnit：HellionMira；官方合作镜像CUnit：HHHellion | HHHellionTank / MorphToHHHellion / 0晶体矿，4秒 | 生命90，人口2，视野10；0晶体矿，4秒 |
| 单位 | 掠食者 | Predator | 当前模块CUnit：CycloneMira, WidowMineMira, WidowMineMiraBurrowed；底层基础镜像CUnit：Predator；官方合作镜像CUnit：Predator | HHMercStarportUpgraded / SummonHornerMercenaries / 21秒 | 21秒 |
| 单位 | 解放者 | Liberator | 当前模块CUnit：LiberatorMira, LiberatorMiraAG；底层基础镜像CUnit：Liberator；官方合作镜像CUnit：Liberator | Starport / StarportTrain / 150晶体矿，125瓦斯，60秒 | 生命180，人口3，视野9；150晶体矿，125瓦斯，60秒 |

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
| GunTowerMira | 当前模块仅引用：GunTowerMira | BuildMira | BuildMira,Build17 |  |  |  |  | 原始mod/Mods/XM/XMMira.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| ScienceFacilityMira | 当前模块仅引用：ScienceFacilityMira | BuildMira | BuildMira,Build18 |  |  |  | HaveStarport | 原始mod/Mods/XM/XMMira.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| WarHoundMira | 当前模块仅引用：WarHoundMira | SummonHornerMercenaries | SummonHornerMercenaries,Train3 |  |  |  | HaveArmory | 原始mod/Mods/XM/XMMira.SC2Mod/Base.SC2Data/GameData/AbilData.xml |

