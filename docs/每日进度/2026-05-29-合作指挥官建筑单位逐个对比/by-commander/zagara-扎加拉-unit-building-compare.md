# 扎加拉 / Zagara 建筑单位对比

- 当前 active Mod：`D:\MyWork\新建文件夹\mom.report.client\src\MyMod\crys_the_swarm_reborn.SC2Mod\合作指挥官版起义狂潮`
- 指挥官模块：`XMZagara.SC2Mod`（存在：是）
- 旧线初始化开局单位：hatchery、drone、overlord
- Wiki主要部队文件：`wikitext/18-zagara.wiki`
- Wiki主要部队：虫后、跳虫、爆虫、畸变体、爆蚊、腐化者、眼虫、脊针爬虫、孢子爬虫、胆汁喷射体
- 判定口径：wiki用于中文主要部队名单；官方JSON用于ID、生产链、生命/人口/费用；active 侧先看本指挥官模块和 `XMCore/XMFinal`，再看 `XMFinal.SC2Mod/DocumentInfo` 实际运行闭包，最后只把官方镜像作为事实参考。

## 汇总

| Wiki项 | 官方行 | Wiki未匹配官方 | 官方补充未在Wiki | 当前Mod未命中 | 仅文本命中 | 运行闭包命中 | 仅官方合作镜像 | 底层继承候选 | 生产链异常 | 生产链运行闭包 | 生产链底层候选 | 官方面板缺口 | 特殊面板项 | 命令卡露出产物缺CUnit | 外来生产链露出 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 10 | 9 | 0 | 1 | 0 | 0 | 4 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 3 |

## 三方对照

| Wiki项 | 匹配 | 分类 | 官方名称 | ID | 当前Mod | 生产链状态 | 当前面板 | 生产/建造/变形 | 数值 | 定义文件 | 备注 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 虫后 | 精确匹配 | 单位 | 虫后 | SwarmQueen | 当前模块CUnit：Queen, QueenCoop；XMFinal运行闭包CUnit：SwarmQueen, Queen, QueenCoop；底层基础镜像CUnit：SwarmQueen, Queen；官方合作镜像CUnit：SwarmQueen, Queen, QueenCoop | 生产链已命中 | 当前面板已露出：TrainQueen,Train1 -> Queen | Hatchery / TrainQueen / 50秒 | 50秒 | 合作指挥官版起义狂潮/Mods/XM/XMZagara.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMAbathurReborn.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMAbathur.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZeratul.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 跳虫 | 精确匹配 | 单位 | 跳虫 | Zergling | XMFinal运行闭包CUnit：Zergling；底层基础镜像CUnit：Zergling；官方合作镜像CUnit：Zergling | 生产链已命中 | 当前面板已露出：LarvaTrain,Train2 -> Zergling | Larva / LarvaTrain / 25晶体矿，24秒 | 生命35，人口0.5，视野8；25晶体矿，24秒 | 合作指挥官版起义狂潮/Mods/XM/XMKerrigan.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMAbathurReborn.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMAbathur.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/libertystory.sc2campaign/base.sc2data/gamedata/unitdata.xml |  |
| 爆虫 | 精确匹配 | 单位 | 爆虫 | Baneling | 当前模块CUnit：Baneling；XMFinal运行闭包CUnit：Baneling；底层基础镜像CUnit：Baneling；官方合作镜像CUnit：Baneling | 生产链已命中 | 当前面板已露出：ZagaraVoidCoopBanelingSpawnerTrain,Train1 -> Baneling | BanelingNest / ZagaraVoidCoopBanelingSpawnerTrain / 50晶体矿，25瓦斯，30秒 | 生命30，人口0.5，视野8；50晶体矿，25瓦斯，30秒 | 合作指挥官版起义狂潮/Mods/XM/XMZagara.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZeratul.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMVorazun.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 畸变体 | 精确匹配 | 单位 | 畸变体 | InfestedAbomination | 当前模块CUnit：InfestedAbomination；XMFinal运行闭包CUnit：InfestedAbomination；底层基础镜像CUnit：InfestedAbomination；官方合作镜像CUnit：InfestedAbomination | 生产链已命中 | 当前面板已露出：SILarvaTrain,Train1 -> InfestedAbomination | SILarva / SILarvaTrain / 30秒 | 30秒 | 合作指挥官版起义狂潮/Mods/XM/XMZagara.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZeratul.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMVorazun.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 爆蚊 | 精确匹配 | 单位 | 爆蚊 | Scourge | 当前模块CUnit：Scourge；XMFinal运行闭包CUnit：Scourge；底层基础镜像CUnit：Scourge；官方合作镜像CUnit：Scourge | 生产链已命中 | 当前面板已露出：CommanderPrestigeZagaraMaxSupplyScourgeSpawner,Train1 -> Scourge | ScourgeNest / CommanderPrestigeZagaraMaxSupplyScourgeSpawner / 12晶体矿，37瓦斯，30秒 | 12晶体矿，37瓦斯，30秒 | 合作指挥官版起义狂潮/Mods/XM/XMZagara.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMVorazun.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMKerrigan.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 腐化者 | 精确匹配 | 单位 | 腐化者 | Corruptor | XMFinal运行闭包CUnit：Corruptor；底层基础镜像CUnit：Corruptor；官方合作镜像CUnit：Corruptor | 生产链已命中 | 当前面板已露出：LarvaTrain,Train12 -> Corruptor | Larva / LarvaTrain / 150晶体矿，100瓦斯，40秒 | 生命200，人口2，视野10；150晶体矿，100瓦斯，40秒 | 合作指挥官版起义狂潮/Mods/XM/XMAbathurReborn.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMAbathur.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/libertystory.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 眼虫 | Wiki补充ID | 单位 | 眼虫 | Overseer | 当前模块CUnit：Overseer；XMFinal运行闭包CUnit：Overseer；底层基础镜像CUnit：Overseer；官方合作镜像CUnit：Overseer | 官方JSON无生产链 | 官方JSON无生产链 |  |  | 合作指挥官版起义狂潮/Mods/XM/XMZagara.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZeratul.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMVorazun.SC2Mod/Base.SC2Data/GameData/UnitData.xml | wiki主要部队补充：扎加拉眼虫按通用/扎加拉特化ID检查。 |
| 脊针爬虫 | 精确匹配 | 建筑 | 脊针爬虫 | SpineCrawler | XMFinal运行闭包CUnit：SpineCrawler；底层基础镜像CUnit：SpineCrawler；官方合作镜像CUnit：SpineCrawler | 生产链已命中 | 当前面板已露出：ZergBuild,Build15 -> SpineCrawler | Drone / ZergBuild / 150晶体矿，50秒 | 生命300，视野11；150晶体矿，50秒 | 合作指挥官版起义狂潮/Mods/XM/XMFenix.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMAbathurReborn.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMAbathur.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/libertystory.sc2campaign/base.sc2data/gamedata/unitdata.xml |  |
| 孢子爬虫 | 精确匹配 | 建筑 | 孢子爬虫 | SporeCrawler | XMFinal运行闭包CUnit：SporeCrawler；底层基础镜像CUnit：SporeCrawler；官方合作镜像CUnit：SporeCrawler | 生产链已命中 | 当前面板已露出：ZergBuild,Build16 -> SporeCrawler | Drone / ZergBuild / 125晶体矿，30秒 | 生命300，视野11；125晶体矿，30秒 | 合作指挥官版起义狂潮/Mods/XM/XMAbathurReborn.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMAbathur.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/libertystory.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/swarmstory.sc2campaign/base.sc2data/gamedata/unitdata.xml |  |
| 胆汁喷射体 | Wiki补充ID | 建筑 | 胆汁喷射体 | BileLauncherZagara | 当前模块CUnit：BileLauncherZagara；XMFinal运行闭包CUnit：BileLauncherZagara；官方合作镜像CUnit：BileLauncherZagara | 官方JSON无生产链 | 官方JSON无生产链 |  |  | 合作指挥官版起义狂潮/Mods/XM/XMZagara.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZeratul.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMVorazun.SC2Mod/Base.SC2Data/GameData/UnitData.xml | wiki主要部队补充：按扎加拉胆汁喷射体ID检查当前Mod。 |
|  | 官方补充 | 英雄 | 扎加拉 | ZagaraVoidCoop | 当前模块CUnit：ZagaraVoidCoop；XMFinal运行闭包CUnit：ZagaraVoidCoop；官方合作镜像CUnit：ZagaraVoidCoop | 官方JSON无生产链 | 官方JSON无生产链 |  | 生命600，视野13 | 合作指挥官版起义狂潮/Mods/XM/XMZagara.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZeratul.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMVorazun.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |

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
| 英雄 | 扎加拉 | ZagaraVoidCoop | 当前模块CUnit：ZagaraVoidCoop；XMFinal运行闭包CUnit：ZagaraVoidCoop；官方合作镜像CUnit：ZagaraVoidCoop | 官方JSON无生产链 | 生命600，视野13 |

## 当前 active 命令卡露出产物缺 CUnit

说明：只扫描当前指挥官模块里已挂到单位命令卡 `AbilCmd="技能,命令"` 的 `CAbilTrain/CAbilWarpTrain/CAbilBuild/CAbilMorph` 产物。产物在当前模块、XM共享模块、XMFinal运行闭包和底层基础镜像都没有 `CUnit` 时列在这里；这类才是当前 Mod 玩家按钮链路的直接风险。XML 注释已在扫描前剔除。

- 无。

## 当前 active 外来生产链露出

说明：这些按钮的产物能在 XMFinal 运行闭包或官方合作镜像中解析，但生产者不属于该指挥官官方体系。它们不是“缺 CUnit”，更像跨指挥官命令卡污染或共享基础单位需要加选择门槛。

| 产物ID | 命中状态 | 引用技能 | 露出命令 | 生产者 | 生产者归属 | 开局归属 | 按钮门槛 | 引用文件 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| DarkArchon | XMFinal运行闭包CUnit：DarkArchon；底层基础镜像CUnit：DarkArchon；官方合作镜像CUnit：DarkArchon | GatewayTrain, WarpGateTrain | GatewayTrain,Train9, WarpGateTrain,Train9 | Gateway, WarpGate | Gateway:官方无, WarpGate:官方无 | Gateway:开局无, WarpGate:开局无 | HaveDarkShrine | 合作指挥官版起义狂潮/Mods/XM/XMZagara.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| SOAMothershipv4 | XMFinal运行闭包CUnit：SOAMothershipv4；底层基础镜像CUnit：SOAMothershipv4；官方合作镜像CUnit：SOAMothershipv4 | StargateTrain | StargateTrain,Train14 | Stargate | Stargate:官方无 | Stargate:开局无 | TalDarimMothershipRequirements | 合作指挥官版起义狂潮/Mods/XM/XMZagara.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| Supplicant | XMFinal运行闭包CUnit：Supplicant；官方合作镜像CUnit：Supplicant | GatewayTrain | GatewayTrain,Train11 | Gateway | Gateway:官方无 | Gateway:开局无 | Restricted | 合作指挥官版起义狂潮/Mods/XM/XMZagara.SC2Mod/Base.SC2Data/GameData/AbilData.xml |

## 当前 active 隐藏技能产物缺 CUnit

说明：这些产物在当前模块的技能 `InfoArray` 中存在，但没有发现对应命令卡 `AbilCmd="技能,命令"`。它们通常是旧官方/编辑器残留或未开放设计，默认不按玩家可点建筑按钮修。

- 无。

