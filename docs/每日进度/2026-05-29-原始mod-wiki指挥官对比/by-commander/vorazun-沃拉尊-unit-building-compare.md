# 沃拉尊 / Vorazun 建筑单位对比

- 当前 active Mod：`D:\MyWork\新建文件夹\mom.report.client\src\MyMod\crys_the_swarm_reborn.SC2Mod\原始mod`
- 指挥官模块：`XMVorazun.SC2Mod`（存在：否）
- 旧线初始化开局单位：未解析到
- Wiki主要部队文件：`wikitext/16-vorazun.wiki`
- Wiki主要部队：百夫长、追猎者、黑暗圣堂武士、黑暗执政官、海盗船、虚空辉光舰、先知、光子炮台、黑暗水晶塔
- 判定口径：wiki用于中文主要部队名单；官方JSON用于ID、生产链、生命/人口/费用；active 侧先看本指挥官模块和 `XMCore/XMFinal`，再看 `XMFinal.SC2Mod/DocumentInfo` 实际运行闭包，最后只把官方镜像作为事实参考。

## 汇总

| Wiki项 | 官方行 | Wiki未匹配官方 | 官方补充未在Wiki | 当前Mod未命中 | 仅文本命中 | 运行闭包命中 | 仅官方合作镜像 | 底层继承候选 | 生产链异常 | 生产链运行闭包 | 生产链底层候选 | 命令卡露出产物缺CUnit | 外来生产链露出 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 9 | 10 | 0 | 3 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 10 | 0 | 0 |

## 三方对照

| Wiki项 | 匹配 | 分类 | 官方名称 | ID | 当前Mod | 生产链状态 | 生产/建造/变形 | 数值 | 定义文件 | 备注 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 百夫长 | 精确匹配 | 单位 | 百夫长 | ZealotShakuras | XM共享模块CUnit：ZealotShakuras；底层基础镜像CUnit：ZealotShakuras；官方合作镜像CUnit：ZealotShakuras | 生产链在底层基础镜像命中，需实机确认 active 是否继承 | Gateway / GatewayTrain / 28秒 | 28秒 | 原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 追猎者 | 精确匹配 | 单位 | 追猎者 | Stalker | XM共享模块CUnit：Stalker；底层基础镜像CUnit：Stalker；官方合作镜像CUnit：Stalker | 生产链在底层基础镜像命中，需实机确认 active 是否继承 | Gateway / GatewayTrain / 125晶体矿，50瓦斯，38秒 | 生命80，护盾80，人口2，视野10；125晶体矿，50瓦斯，38秒 | 原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/swarmmulti.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 黑暗圣堂武士 | 精确匹配 | 单位 | 黑暗圣堂武士 | DarkTemplarShakuras | XM共享模块CUnit：DarkTemplarShakuras；底层基础镜像CUnit：DarkTemplarShakuras；官方合作镜像CUnit：DarkTemplarShakuras | 生产链在底层基础镜像命中，需实机确认 active 是否继承 | Gateway / GatewayTrain / 75瓦斯，55秒 | 75瓦斯，55秒 | 原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 黑暗执政官 | Wiki补充ID | 单位 | 黑暗执政官 | DarkArchon | XM共享模块CUnit：DarkArchon；底层基础镜像CUnit：DarkArchon；官方合作镜像CUnit：DarkArchon | 官方JSON无生产链 |  |  | 原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml | wiki主要部队补充：按黑暗执政官ID检查当前Mod。 |
| 海盗船 | 精确匹配 | 单位 | 海盗船 | CorsairMP | XM共享模块CUnit：CorsairMP；底层基础镜像CUnit：CorsairMP；官方合作镜像CUnit：CorsairMP | 生产链在底层基础镜像命中，需实机确认 active 是否继承 | 未知生产者 / StargateWarpTrain / 150晶体矿，100瓦斯 | 生命120，护盾60，人口2，视野9；150晶体矿，100瓦斯 | 原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/void.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 虚空辉光舰 | 精确匹配 | 单位 | 虚空辉光舰 | VoidRay | XM共享模块CUnit：VoidRay；底层基础镜像CUnit：VoidRay；官方合作镜像CUnit：VoidRay | 生产链在底层基础镜像命中，需实机确认 active 是否继承 | Stargate / StargateTrain / 250晶体矿，150瓦斯，60.2秒 | 生命150，护盾100，人口4，视野10；250晶体矿，150瓦斯，60.2秒 | 原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/void.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 先知 | 精确匹配 | 单位 | 先知 | Oracle | XM共享模块CUnit：Oracle；底层基础镜像CUnit：Oracle；官方合作镜像CUnit：Oracle | 生产链在底层基础镜像命中，需实机确认 active 是否继承 | Stargate / StargateTrain / 100晶体矿，75瓦斯，30秒 | 生命100，护盾60，人口3，视野10；100晶体矿，75瓦斯，30秒 | 原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/void.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 光子炮台 | 精确匹配 | 建筑 | 光子炮台 | PhotonCannon | XM共享模块CUnit：PhotonCannon；底层基础镜像CUnit：PhotonCannon；官方合作镜像CUnit：PhotonCannon | 生产链在底层基础镜像命中，需实机确认 active 是否继承 | Gateway / GatewayTrain / 150晶体矿，28秒 | 生命150，护盾150，视野11；150晶体矿，28秒 | 原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/swarmmulti.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 黑暗水晶塔 | Wiki补充ID | 建筑 | 黑暗水晶塔 | DarkPylon | XM共享模块CUnit：DarkPylon；官方合作镜像CUnit：DarkPylon | 官方JSON无生产链 |  |  | 原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml | wiki主要部队补充：按黑暗水晶塔ID检查当前Mod。 |
|  | 官方补充 | 单位 | 狂热者 | Zealot | XM共享模块CUnit：Zealot；底层基础镜像CUnit：Zealot；官方合作镜像CUnit：Zealot | 生产链在底层基础镜像命中，需实机确认 active 是否继承 | Gateway / GatewayTrain / 100晶体矿，38秒 | 生命100，护盾50，人口2，视野9；100晶体矿，38秒 | 原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/swarmmulti.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 传送门 | Gateway | XM共享模块CUnit：Gateway；底层基础镜像CUnit：Gateway；官方合作镜像CUnit：Gateway | 生产链在底层基础镜像命中，需实机确认 active 是否继承 | Probe / ProtossBuild / 150晶体矿，65秒 | 生命500，护盾500，视野9；150晶体矿，65秒 | 原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/void.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 光影议会 | TwilightCouncil | XM共享模块CUnit：TwilightCouncil；底层基础镜像CUnit：TwilightCouncil；官方合作镜像CUnit：TwilightCouncil | 生产链在底层基础镜像命中，需实机确认 active 是否继承 | Probe / ProtossBuild / 150晶体矿，100瓦斯，50秒 | 生命500，护盾500，视野9；150晶体矿，100瓦斯，50秒 | 原始mod/Mods/XM/XMCore.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/void.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |

## 优先排查项

- 无。

## Wiki未匹配官方JSON

- 无。

## 官方有但Wiki主要部队未列

| 分类 | 官方名称 | ID | 当前Mod | 生产链 | 数值 |
| --- | --- | --- | --- | --- | --- |
| 单位 | 狂热者 | Zealot | XM共享模块CUnit：Zealot；底层基础镜像CUnit：Zealot；官方合作镜像CUnit：Zealot | Gateway / GatewayTrain / 100晶体矿，38秒 | 生命100，护盾50，人口2，视野9；100晶体矿，38秒 |
| 建筑 | 传送门 | Gateway | XM共享模块CUnit：Gateway；底层基础镜像CUnit：Gateway；官方合作镜像CUnit：Gateway | Probe / ProtossBuild / 150晶体矿，65秒 | 生命500，护盾500，视野9；150晶体矿，65秒 |
| 建筑 | 光影议会 | TwilightCouncil | XM共享模块CUnit：TwilightCouncil；底层基础镜像CUnit：TwilightCouncil；官方合作镜像CUnit：TwilightCouncil | Probe / ProtossBuild / 150晶体矿，100瓦斯，50秒 | 生命500，护盾500，视野9；150晶体矿，100瓦斯，50秒 |

## 当前 active 命令卡露出产物缺 CUnit

说明：只扫描当前指挥官模块里已挂到单位命令卡 `AbilCmd="技能,命令"` 的 `CAbilTrain/CAbilWarpTrain/CAbilBuild/CAbilMorph` 产物。产物在当前模块、XM共享模块、XMFinal运行闭包和底层基础镜像都没有 `CUnit` 时列在这里；这类才是当前 Mod 玩家按钮链路的直接风险。XML 注释已在扫描前剔除。

- 无。

## 当前 active 外来生产链露出

说明：这些按钮的产物能在 XMFinal 运行闭包或官方合作镜像中解析，但生产者不属于该指挥官官方体系。它们不是“缺 CUnit”，更像跨指挥官命令卡污染或共享基础单位需要加选择门槛。

- 无。

## 当前 active 隐藏技能产物缺 CUnit

说明：这些产物在当前模块的技能 `InfoArray` 中存在，但没有发现对应命令卡 `AbilCmd="技能,命令"`。它们通常是旧官方/编辑器残留或未开放设计，默认不按玩家可点建筑按钮修。

- 无。

