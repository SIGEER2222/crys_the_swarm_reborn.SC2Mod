# 泰凯斯 / Tychus 建筑单位对比

- 当前 active Mod：`D:\MyWork\新建文件夹\mom.report.client\src\MyMod\crys_the_swarm_reborn.SC2Mod\合作指挥官版起义狂潮`
- 指挥官模块：`XMTychus.SC2Mod`（存在：是）
- Wiki主要部队文件：`wikitext/15-tychus.wiki`
- Wiki主要部队：“老油条”萨姆、迈尔斯“布雷泽”刘易斯、纳克斯、莱纳·尼卡拉中尉、凯文“响尾蛇”韦斯特、詹姆斯“天狼星”赛克斯、罗布“弹头哥”博斯韦尔、维嘉、自动机炮
- 判定口径：wiki用于中文主要部队名单；官方JSON用于ID、生产链、生命/人口/费用；active Mod只检查`合作指挥官版起义狂潮`的本指挥官模块加`XMCore/XMFinal`。

## 汇总

| Wiki项 | 官方行 | Wiki未匹配官方 | 官方补充未在Wiki | 当前Mod未命中 | 仅文本命中 | 生产链异常 |
| --- | --- | --- | --- | --- | --- | --- |
| 9 | 14 | 0 | 6 | 0 | 2 | 1 |

## 三方对照

| Wiki项 | 匹配 | 分类 | 官方名称 | ID | 当前Mod | 生产链状态 | 生产/建造/变形 | 数值 | 定义文件 | 备注 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| “老油条”萨姆 | 精确匹配 | 英雄 | “老油条”萨姆 | TychusReaper | CUnit已定义：TychusReaper | 生产链已命中 | TychusResearchCenter / TychusBarracksTrain / 500晶体矿，100瓦斯，240秒 | 生命375，人口10，视野10；500晶体矿，100瓦斯，240秒 | Mods/XM/XMTychus.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 迈尔斯“布雷泽”刘易斯 | 精确匹配 | 英雄 | 迈尔斯“布雷泽”刘易斯 | TychusFirebat | CUnit已定义：TychusFirebat | 生产链已命中 | TychusResearchCenter / TychusBarracksTrain / 500晶体矿，100瓦斯，240秒 | 生命1000，人口10，视野10；500晶体矿，100瓦斯，240秒 | Mods/XM/XMTychus.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 纳克斯 | 精确匹配 | 英雄 | 纳克斯 | TychusSpectre | CUnit已定义：TychusSpectre | 生产链已命中 | TychusResearchCenter / TychusBarracksTrain / 500晶体矿，100瓦斯，240秒 | 生命500，人口10，视野10；500晶体矿，100瓦斯，240秒 | Mods/XM/XMTychus.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 莱纳·尼卡拉中尉 | 精确匹配 | 英雄 | 莱纳·尼卡拉中尉 | TychusMedic | CUnit已定义：TychusMedic | 生产链已命中 | TychusResearchCenter / TychusBarracksTrain / 500晶体矿，100瓦斯，240秒 | 生命450，人口10，视野10；500晶体矿，100瓦斯，240秒 | Mods/XM/XMTychus.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 凯文“响尾蛇”韦斯特 | 精确匹配 | 英雄 | 凯文“响尾蛇”韦斯特 | TychusMarauder | CUnit已定义：TychusMarauder | 生产链已命中 | TychusResearchCenter / TychusBarracksTrain / 500晶体矿，100瓦斯，240秒 | 生命625，人口10，视野10；500晶体矿，100瓦斯，240秒 | Mods/XM/XMTychus.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 詹姆斯“天狼星”赛克斯 | 精确匹配 | 英雄 | 詹姆斯“天狼星”赛克斯 | TychusWarhound | CUnit已定义：TychusWarhound | 生产链已命中 | TychusResearchCenter / TychusFactoryTrain / 500晶体矿，100瓦斯，240秒 | 生命650，人口10，视野10；500晶体矿，100瓦斯，240秒 | Mods/XM/XMTychus.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 罗布“弹头哥”博斯韦尔 | 精确匹配 | 英雄 | 罗布“弹头哥”博斯韦尔 | TychusHERC | CUnit已定义：TychusHERC | 生产链已命中 | TychusResearchCenter / TychusFactoryTrain / 500晶体矿，100瓦斯，240秒 | 生命1000，人口10，视野10；500晶体矿，100瓦斯，240秒 | Mods/XM/XMTychus.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 维嘉 | 精确匹配 | 英雄 | 维嘉 | TychusGhost | CUnit已定义：TychusGhost | 生产链已命中 | TychusResearchCenter / TychusBarracksTrain / 500晶体矿，100瓦斯，240秒 | 生命500，人口10，视野10；500晶体矿，100瓦斯，240秒 | Mods/XM/XMTychus.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 自动机炮 | Wiki补充ID | 建筑 | 自动机炮 | AutoTurret | 仅文本/引用命中：AutoTurret, NovaACLaserTurret | 官方JSON无生产链 |  |  |  | wiki主要部队补充：自动机炮在不同指挥官下有不同ID。 |
|  | 官方补充 | 英雄 | 泰凯斯·芬利 | TychusCoop | CUnit已定义：TychusCoop | 生产链已命中 | TychusResearchCenter / TychusFakeReviveTrain / 250晶体矿，0瓦斯，25秒 | 生命600，人口0，视野10；250晶体矿，0瓦斯，25秒 | Mods/XM/XMTychus.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 单位 | 劫掠者 | Marauder | 仅文本/引用命中：Marauder | 技能缺失 BarracksTrain | Barracks / BarracksTrain / 100晶体矿，25瓦斯，30秒 | 生命125，人口2，视野10；100晶体矿，25瓦斯，30秒 |  | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 单位 | SCV | TychusSCV | CUnit已定义：TychusSCV | 生产链已命中 | TychusCommandCenter / TychusCommandCenterTrain / 50晶体矿，17秒 | 生命45，人口1，视野8；50晶体矿，17秒 | Mods/XM/XMTychus.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 枪王藏身处 | TychusMercCompound | CUnit已定义：TychusMercCompound | 生产链已命中 | TychusSCV / TychusTerranBuild / 150晶体矿，30秒 | 生命750，视野9；150晶体矿，30秒 | Mods/XM/XMTychus.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 鬼手安全屋 | TychusGhostAcademy | CUnit已定义：TychusGhostAcademy | 生产链已命中 | TychusSCV / TychusTerranBuild / 150晶体矿，30秒 | 生命750，视野9；150晶体矿，30秒 | Mods/XM/XMTychus.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 猛男军械库 | TychusArmory | CUnit已定义：TychusArmory | 生产链已命中 | TychusSCV / TychusTerranBuild / 150晶体矿，30秒 | 生命750，视野9；150晶体矿，30秒 | Mods/XM/XMTychus.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |

## 优先排查项

| Wiki项 | 匹配 | 分类 | 官方名称 | ID | 当前Mod | 生产链状态 | 生产/建造/变形 | 数值 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 自动机炮 | Wiki补充ID | 建筑 | 自动机炮 | AutoTurret | 仅文本/引用命中：AutoTurret, NovaACLaserTurret | 官方JSON无生产链 |  |  |
|  | 官方补充 | 单位 | 劫掠者 | Marauder | 仅文本/引用命中：Marauder | 技能缺失 BarracksTrain | Barracks / BarracksTrain / 100晶体矿，25瓦斯，30秒 | 生命125，人口2，视野10；100晶体矿，25瓦斯，30秒 |

## Wiki未匹配官方JSON

- 无。

## 官方有但Wiki主要部队未列

| 分类 | 官方名称 | ID | 当前Mod | 生产链 | 数值 |
| --- | --- | --- | --- | --- | --- |
| 英雄 | 泰凯斯·芬利 | TychusCoop | CUnit已定义：TychusCoop | TychusResearchCenter / TychusFakeReviveTrain / 250晶体矿，0瓦斯，25秒 | 生命600，人口0，视野10；250晶体矿，0瓦斯，25秒 |
| 单位 | 劫掠者 | Marauder | 仅文本/引用命中：Marauder | Barracks / BarracksTrain / 100晶体矿，25瓦斯，30秒 | 生命125，人口2，视野10；100晶体矿，25瓦斯，30秒 |
| 单位 | SCV | TychusSCV | CUnit已定义：TychusSCV | TychusCommandCenter / TychusCommandCenterTrain / 50晶体矿，17秒 | 生命45，人口1，视野8；50晶体矿，17秒 |
| 建筑 | 枪王藏身处 | TychusMercCompound | CUnit已定义：TychusMercCompound | TychusSCV / TychusTerranBuild / 150晶体矿，30秒 | 生命750，视野9；150晶体矿，30秒 |
| 建筑 | 鬼手安全屋 | TychusGhostAcademy | CUnit已定义：TychusGhostAcademy | TychusSCV / TychusTerranBuild / 150晶体矿，30秒 | 生命750，视野9；150晶体矿，30秒 |
| 建筑 | 猛男军械库 | TychusArmory | CUnit已定义：TychusArmory | TychusSCV / TychusTerranBuild / 150晶体矿，30秒 | 生命750，视野9；150晶体矿，30秒 |

