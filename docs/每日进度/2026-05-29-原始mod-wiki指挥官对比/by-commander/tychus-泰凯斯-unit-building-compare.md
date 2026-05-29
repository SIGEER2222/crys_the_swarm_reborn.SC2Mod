# 泰凯斯 / Tychus 建筑单位对比

- 当前 active Mod：`D:\MyWork\新建文件夹\mom.report.client\src\MyMod\crys_the_swarm_reborn.SC2Mod\原始mod`
- 指挥官模块：`XMTychus.SC2Mod`（存在：是）
- 旧线初始化开局单位：tychuscommandcenter、tychusscv、tychusresearchcenter
- Wiki主要部队文件：`wikitext/15-tychus.wiki`
- Wiki主要部队：“老油条”萨姆、迈尔斯“布雷泽”刘易斯、纳克斯、莱纳·尼卡拉中尉、凯文“响尾蛇”韦斯特、詹姆斯“天狼星”赛克斯、罗布“弹头哥”博斯韦尔、维嘉、自动机炮
- 判定口径：wiki用于中文主要部队名单；官方JSON用于ID、生产链、生命/人口/费用；active 侧先看本指挥官模块和 `XMCore/XMFinal`，再看 `XMFinal.SC2Mod/DocumentInfo` 实际运行闭包，最后只把官方镜像作为事实参考。

## 汇总

| Wiki项 | 官方行 | Wiki未匹配官方 | 官方补充未在Wiki | 当前Mod未命中 | 仅文本命中 | 运行闭包命中 | 仅官方合作镜像 | 底层继承候选 | 生产链异常 | 生产链运行闭包 | 生产链底层候选 | 命令卡露出产物缺CUnit | 外来生产链露出 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 9 | 14 | 0 | 6 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 0 | 0 |

## 三方对照

| Wiki项 | 匹配 | 分类 | 官方名称 | ID | 当前Mod | 生产链状态 | 生产/建造/变形 | 数值 | 定义文件 | 备注 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| “老油条”萨姆 | 精确匹配 | 英雄 | “老油条”萨姆 | TychusReaper | 当前模块CUnit：TychusReaper；官方合作镜像CUnit：TychusReaper | 生产链已命中 | TychusResearchCenter / TychusBarracksTrain / 500晶体矿，100瓦斯，240秒 | 生命375，人口10，视野10；500晶体矿，100瓦斯，240秒 | 原始mod/Mods/XM/XMTychus.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/commanders/commandertychus.xml |  |
| 迈尔斯“布雷泽”刘易斯 | 精确匹配 | 英雄 | 迈尔斯“布雷泽”刘易斯 | TychusFirebat | 当前模块CUnit：TychusFirebat；官方合作镜像CUnit：TychusFirebat | 生产链已命中 | TychusResearchCenter / TychusBarracksTrain / 500晶体矿，100瓦斯，240秒 | 生命1000，人口10，视野10；500晶体矿，100瓦斯，240秒 | 原始mod/Mods/XM/XMTychus.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/commanders/commandertychus.xml |  |
| 纳克斯 | 精确匹配 | 英雄 | 纳克斯 | TychusSpectre | 当前模块CUnit：TychusSpectre；官方合作镜像CUnit：TychusSpectre | 生产链已命中 | TychusResearchCenter / TychusBarracksTrain / 500晶体矿，100瓦斯，240秒 | 生命500，人口10，视野10；500晶体矿，100瓦斯，240秒 | 原始mod/Mods/XM/XMTychus.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/commanders/commandertychus.xml |  |
| 莱纳·尼卡拉中尉 | 精确匹配 | 英雄 | 莱纳·尼卡拉中尉 | TychusMedic | 当前模块CUnit：TychusMedic；官方合作镜像CUnit：TychusMedic | 生产链已命中 | TychusResearchCenter / TychusBarracksTrain / 500晶体矿，100瓦斯，240秒 | 生命450，人口10，视野10；500晶体矿，100瓦斯，240秒 | 原始mod/Mods/XM/XMTychus.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/commanders/commandertychus.xml |  |
| 凯文“响尾蛇”韦斯特 | 精确匹配 | 英雄 | 凯文“响尾蛇”韦斯特 | TychusMarauder | 当前模块CUnit：TychusMarauder；官方合作镜像CUnit：TychusMarauder | 生产链已命中 | TychusResearchCenter / TychusBarracksTrain / 500晶体矿，100瓦斯，240秒 | 生命625，人口10，视野10；500晶体矿，100瓦斯，240秒 | 原始mod/Mods/XM/XMTychus.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/commanders/commandertychus.xml |  |
| 詹姆斯“天狼星”赛克斯 | 精确匹配 | 英雄 | 詹姆斯“天狼星”赛克斯 | TychusWarhound | 当前模块CUnit：TychusWarhound；官方合作镜像CUnit：TychusWarhound | 生产链已命中 | TychusResearchCenter / TychusFactoryTrain / 500晶体矿，100瓦斯，240秒 | 生命650，人口10，视野10；500晶体矿，100瓦斯，240秒 | 原始mod/Mods/XM/XMTychus.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/commanders/commandertychus.xml |  |
| 罗布“弹头哥”博斯韦尔 | 精确匹配 | 英雄 | 罗布“弹头哥”博斯韦尔 | TychusHERC | 当前模块CUnit：TychusHERC；官方合作镜像CUnit：TychusHERC | 生产链已命中 | TychusResearchCenter / TychusFactoryTrain / 500晶体矿，100瓦斯，240秒 | 生命1000，人口10，视野10；500晶体矿，100瓦斯，240秒 | 原始mod/Mods/XM/XMTychus.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/commanders/commandertychus.xml |  |
| 维嘉 | 精确匹配 | 英雄 | 维嘉 | TychusGhost | 当前模块CUnit：TychusGhost；官方合作镜像CUnit：TychusGhost | 生产链已命中 | TychusResearchCenter / TychusBarracksTrain / 500晶体矿，100瓦斯，240秒 | 生命500，人口10，视野10；500晶体矿，100瓦斯，240秒 | 原始mod/Mods/XM/XMTychus.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/commanders/commandertychus.xml |  |
| 自动机炮 | Wiki补充ID | 建筑 | 自动机炮 | TychusWarhoundAutoTurret | 当前模块CUnit：TychusWarhoundAutoTurret；官方合作镜像CUnit：TychusWarhoundAutoTurret | 官方JSON无生产链 |  |  | 原始mod/Mods/XM/XMTychus.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/commanders/commandertychus.xml | wiki主要部队补充：泰凯斯自动机炮使用战狼炮塔ID，不使用诺娃/通用自动炮塔ID。 |
|  | 官方补充 | 英雄 | 泰凯斯·芬利 | TychusCoop | 当前模块CUnit：TychusCoop；官方合作镜像CUnit：TychusCoop | 生产链已命中 | TychusResearchCenter / TychusStarportTrain / 0晶体矿，0瓦斯，180秒 | 生命600，人口0，视野10；0晶体矿，0瓦斯，180秒 | 原始mod/Mods/XM/XMTychus.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/commanders/commandertychus.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 单位 | 劫掠者 | Marauder | XM共享模块CUnit：Marauder；底层基础镜像CUnit：Marauder；官方合作镜像CUnit：Marauder | 生产链在底层基础镜像命中，需实机确认 active 是否继承 | Barracks / BarracksTrain / 100晶体矿，25瓦斯，30秒 | 生命125，人口2，视野10；100晶体矿，25瓦斯，30秒 | 原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/void.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 单位 | SCV | TychusSCV | 当前模块CUnit：TychusSCV；官方合作镜像CUnit：TychusSCV | 生产链已命中 | TychusCommandCenter / TychusCommandCenterTrain / 50晶体矿，17秒 | 生命45，人口1，视野8；50晶体矿，17秒 | 原始mod/Mods/XM/XMTychus.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/commanders/commandertychus.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 枪王藏身处 | TychusMercCompound | 当前模块CUnit：TychusMercCompound；官方合作镜像CUnit：TychusMercCompound | 生产链已命中 | TychusSCV / TychusTerranBuild / 150晶体矿，30秒 | 生命750，视野9；150晶体矿，30秒 | 原始mod/Mods/XM/XMTychus.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/commanders/commandertychus.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 鬼手安全屋 | TychusGhostAcademy | 当前模块CUnit：TychusGhostAcademy；官方合作镜像CUnit：TychusGhostAcademy | 生产链已命中 | TychusSCV / TychusTerranBuild / 150晶体矿，30秒 | 生命750，视野9；150晶体矿，30秒 | 原始mod/Mods/XM/XMTychus.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/commanders/commandertychus.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 猛男军械库 | TychusArmory | 当前模块CUnit：TychusArmory；官方合作镜像CUnit：TychusArmory | 生产链已命中 | TychusSCV / TychusTerranBuild / 150晶体矿，30秒 | 生命750，视野9；150晶体矿，30秒 | 原始mod/Mods/XM/XMTychus.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/commanders/commandertychus.xml | 官方JSON有，wiki主要部队未列。 |

## 优先排查项

- 无。

## Wiki未匹配官方JSON

- 无。

## 官方有但Wiki主要部队未列

| 分类 | 官方名称 | ID | 当前Mod | 生产链 | 数值 |
| --- | --- | --- | --- | --- | --- |
| 英雄 | 泰凯斯·芬利 | TychusCoop | 当前模块CUnit：TychusCoop；官方合作镜像CUnit：TychusCoop | TychusResearchCenter / TychusStarportTrain / 0晶体矿，0瓦斯，180秒 | 生命600，人口0，视野10；0晶体矿，0瓦斯，180秒 |
| 单位 | 劫掠者 | Marauder | XM共享模块CUnit：Marauder；底层基础镜像CUnit：Marauder；官方合作镜像CUnit：Marauder | Barracks / BarracksTrain / 100晶体矿，25瓦斯，30秒 | 生命125，人口2，视野10；100晶体矿，25瓦斯，30秒 |
| 单位 | SCV | TychusSCV | 当前模块CUnit：TychusSCV；官方合作镜像CUnit：TychusSCV | TychusCommandCenter / TychusCommandCenterTrain / 50晶体矿，17秒 | 生命45，人口1，视野8；50晶体矿，17秒 |
| 建筑 | 枪王藏身处 | TychusMercCompound | 当前模块CUnit：TychusMercCompound；官方合作镜像CUnit：TychusMercCompound | TychusSCV / TychusTerranBuild / 150晶体矿，30秒 | 生命750，视野9；150晶体矿，30秒 |
| 建筑 | 鬼手安全屋 | TychusGhostAcademy | 当前模块CUnit：TychusGhostAcademy；官方合作镜像CUnit：TychusGhostAcademy | TychusSCV / TychusTerranBuild / 150晶体矿，30秒 | 生命750，视野9；150晶体矿，30秒 |
| 建筑 | 猛男军械库 | TychusArmory | 当前模块CUnit：TychusArmory；官方合作镜像CUnit：TychusArmory | TychusSCV / TychusTerranBuild / 150晶体矿，30秒 | 生命750，视野9；150晶体矿，30秒 |

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
| TychusMedivac | 当前模块仅引用：TychusMedivac；官方合作镜像仅引用：TychusMedivac | TychusCommandCenterLiftOff | TychusCommandCenterLiftOff,Build4 |  |  |  |  | 原始mod/Mods/XM/XMTychus.SC2Mod/Base.SC2Data/GameData/AbilData.xml |

