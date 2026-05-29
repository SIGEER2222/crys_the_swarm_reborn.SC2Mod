# 泽拉图 / Zeratul 建筑单位对比

- 当前 active Mod：`D:\MyWork\新建文件夹\mom.report.client\src\MyMod\crys_the_swarm_reborn.SC2Mod\原始mod`
- 指挥官模块：`XMZeratul.SC2Mod`（存在：否）
- 旧线初始化开局单位：未解析到
- Wiki主要部队文件：`wikitext/17-zeratul.wiki`
- Wiki主要部队：萨尔纳加伏击者、萨尔纳加光盾卫士、虚空圣堂武士、萨尔纳加执行者、萨尔纳加观察者、萨尔纳加禁绝者、萨尔纳加虚空阵列船、超维空间炮
- 判定口径：wiki用于中文主要部队名单；官方JSON用于ID、生产链、生命/人口/费用；active 侧先看本指挥官模块和 `XMCore/XMFinal`，再看 `XMFinal.SC2Mod/DocumentInfo` 实际运行闭包，最后只把官方镜像作为事实参考。

## 汇总

| Wiki项 | 官方行 | Wiki未匹配官方 | 官方补充未在Wiki | 当前Mod未命中 | 仅文本命中 | 运行闭包命中 | 仅官方合作镜像 | 底层继承候选 | 生产链异常 | 生产链运行闭包 | 生产链底层候选 | 命令卡露出产物缺CUnit | 外来生产链露出 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 8 | 12 | 0 | 4 | 0 | 0 | 0 | 0 | 0 | 4 | 0 | 8 | 0 | 0 |

## 三方对照

| Wiki项 | 匹配 | 分类 | 官方名称 | ID | 当前Mod | 生产链状态 | 生产/建造/变形 | 数值 | 定义文件 | 备注 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 萨尔纳加伏击者 | 精确匹配 | 单位 | 萨尔纳加伏击者 | ZeratulStalker | XM共享模块CUnit：ZeratulStalker；官方合作镜像CUnit：ZeratulStalker | 生产链在底层基础镜像命中，需实机确认 active 是否继承 | 未知生产者 / GatewayTrain / 300晶体矿，50瓦斯 | 生命100，护盾100，人口2，视野10；300晶体矿，50瓦斯 | 原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/commanders/futurecommanders.xml |  |
| 萨尔纳加光盾卫士 | 精确匹配 | 单位 | 萨尔纳加光盾卫士 | ZeratulSentry | XM共享模块CUnit：ZeratulSentry；官方合作镜像CUnit：ZeratulSentry | 生产链在底层基础镜像命中，需实机确认 active 是否继承 | 未知生产者 / GatewayTrain / 75晶体矿，150瓦斯 | 生命120，护盾120，人口2，视野10；75晶体矿，150瓦斯 | 原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/commanders/futurecommanders.xml |  |
| 虚空圣堂武士 | 别名匹配 | 单位 | 狂热者 | ZeratulSummonZealot | XM共享模块CUnit：ZeratulSummonZealot；官方合作镜像CUnit：ZeratulSummonZealot | 生产链在底层基础镜像命中，需实机确认 active 是否继承 | 未知生产者 / GatewayTrain / 100晶体矿 | 生命100，护盾50，视野9；100晶体矿 | 原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/commanders/futurecommanders.xml |  |
| 萨尔纳加执行者 | 精确匹配 | 单位 | 萨尔纳加执行者 | ZeratulImmortal | XM共享模块CUnit：ZeratulImmortal；官方合作镜像CUnit：ZeratulImmortal | 技能仅在官方合作镜像：ZeratulRoboticsFacilityTrain | ZeratulRoboticsFacility / ZeratulRoboticsFacilityTrain / 750晶体矿，300瓦斯，55秒 | 生命400，护盾200，人口4，视野9；750晶体矿，300瓦斯，55秒 | 原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/commanders/futurecommanders.xml |  |
| 萨尔纳加观察者 | 精确匹配 | 单位 | 萨尔纳加观察者 | ZeratulObserver | XM共享模块CUnit：ZeratulObserver；官方合作镜像CUnit：ZeratulObserver | 生产链在底层基础镜像命中，需实机确认 active 是否继承 | RoboticsFacilityWarp / RoboticsFacilityWarpTrain / 25晶体矿，75瓦斯 | 生命40，护盾20，人口1，视野11；25晶体矿，75瓦斯 | 原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/commanders/futurecommanders.xml |  |
| 萨尔纳加禁绝者 | 精确匹配 | 单位 | 萨尔纳加禁绝者 | ZeratulDisruptor | XM共享模块CUnit：ZeratulDisruptor；官方合作镜像CUnit：ZeratulDisruptor | 技能仅在官方合作镜像：ZeratulRoboticsFacilityTrain | ZeratulRoboticsFacility / ZeratulRoboticsFacilityTrain / 450晶体矿，450瓦斯，50秒 | 生命200，护盾200，人口3，视野9；450晶体矿，450瓦斯，50秒 | 原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/commanders/futurecommanders.xml |  |
| 萨尔纳加虚空阵列船 | 精确匹配 | 单位 | 萨尔纳加虚空阵列船 | ZeratulWarpPrism | XM共享模块CUnit：ZeratulWarpPrism；官方合作镜像CUnit：ZeratulWarpPrism | 技能仅在官方合作镜像：ZeratulRoboticsFacilityTrain | ZeratulRoboticsFacility / ZeratulRoboticsFacilityTrain / 150晶体矿，50秒 | 生命200，护盾200，人口1，视野10；150晶体矿，50秒 | 原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/commanders/futurecommanders.xml |  |
| 超维空间炮 | 别名匹配 | 建筑 | 光子炮台 | PhotonCannon | XM共享模块CUnit：PhotonCannon；底层基础镜像CUnit：PhotonCannon；官方合作镜像CUnit：PhotonCannon | 生产链在底层基础镜像命中，需实机确认 active 是否继承 | Gateway / GatewayTrain / 150晶体矿，28秒 | 生命150，护盾150，视野11；150晶体矿，28秒 | 原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/swarmmulti.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
|  | 官方补充 | 单位 | 侦测器 | Observer | XM共享模块CUnit：Observer；底层基础镜像CUnit：Observer；官方合作镜像CUnit：Observer | 生产链在底层基础镜像命中，需实机确认 active 是否继承 | RoboticsFacilityWarp / RoboticsFacilityWarpTrain / 25晶体矿，75瓦斯 | 生命40，护盾30，人口1，视野11；25晶体矿，75瓦斯 | 原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/swarm.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 黑暗圣坛 | DarkShrine | XM共享模块CUnit：DarkShrine；底层基础镜像CUnit：DarkShrine；官方合作镜像CUnit：DarkShrine | 生产链在底层基础镜像命中，需实机确认 active 是否继承 | Probe / ProtossBuild / 150晶体矿，150瓦斯，100秒 | 生命500，护盾500，视野9；150晶体矿，150瓦斯，100秒 | 原始mod/Mods/XM/XMCore.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/void.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 传送门 | Gateway | XM共享模块CUnit：Gateway；底层基础镜像CUnit：Gateway；官方合作镜像CUnit：Gateway | 生产链在底层基础镜像命中，需实机确认 active 是否继承 | Probe / ProtossBuild / 150晶体矿，65秒 | 生命500，护盾500，视野9；150晶体矿，65秒 | 原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/void.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 折跃机械台 | ZeratulRoboticsFacility | XM共享模块CUnit：ZeratulRoboticsFacility；官方合作镜像CUnit：ZeratulRoboticsFacility | 技能仅在官方合作镜像：ZeratulBuild | Probe / ZeratulBuild / 200晶体矿，100瓦斯，65秒 | 生命450，护盾450，视野9；200晶体矿，100瓦斯，65秒 | 原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/commanders/futurecommanders.xml | 官方JSON有，wiki主要部队未列。 |

## 优先排查项

| Wiki项 | 匹配 | 分类 | 官方名称 | ID | 当前Mod | 生产链状态 | 生产/建造/变形 | 数值 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 萨尔纳加执行者 | 精确匹配 | 单位 | 萨尔纳加执行者 | ZeratulImmortal | XM共享模块CUnit：ZeratulImmortal；官方合作镜像CUnit：ZeratulImmortal | 技能仅在官方合作镜像：ZeratulRoboticsFacilityTrain | ZeratulRoboticsFacility / ZeratulRoboticsFacilityTrain / 750晶体矿，300瓦斯，55秒 | 生命400，护盾200，人口4，视野9；750晶体矿，300瓦斯，55秒 |
| 萨尔纳加禁绝者 | 精确匹配 | 单位 | 萨尔纳加禁绝者 | ZeratulDisruptor | XM共享模块CUnit：ZeratulDisruptor；官方合作镜像CUnit：ZeratulDisruptor | 技能仅在官方合作镜像：ZeratulRoboticsFacilityTrain | ZeratulRoboticsFacility / ZeratulRoboticsFacilityTrain / 450晶体矿，450瓦斯，50秒 | 生命200，护盾200，人口3，视野9；450晶体矿，450瓦斯，50秒 |
| 萨尔纳加虚空阵列船 | 精确匹配 | 单位 | 萨尔纳加虚空阵列船 | ZeratulWarpPrism | XM共享模块CUnit：ZeratulWarpPrism；官方合作镜像CUnit：ZeratulWarpPrism | 技能仅在官方合作镜像：ZeratulRoboticsFacilityTrain | ZeratulRoboticsFacility / ZeratulRoboticsFacilityTrain / 150晶体矿，50秒 | 生命200，护盾200，人口1，视野10；150晶体矿，50秒 |
|  | 官方补充 | 建筑 | 折跃机械台 | ZeratulRoboticsFacility | XM共享模块CUnit：ZeratulRoboticsFacility；官方合作镜像CUnit：ZeratulRoboticsFacility | 技能仅在官方合作镜像：ZeratulBuild | Probe / ZeratulBuild / 200晶体矿，100瓦斯，65秒 | 生命450，护盾450，视野9；200晶体矿，100瓦斯，65秒 |

## Wiki未匹配官方JSON

- 无。

## 官方有但Wiki主要部队未列

| 分类 | 官方名称 | ID | 当前Mod | 生产链 | 数值 |
| --- | --- | --- | --- | --- | --- |
| 单位 | 侦测器 | Observer | XM共享模块CUnit：Observer；底层基础镜像CUnit：Observer；官方合作镜像CUnit：Observer | RoboticsFacilityWarp / RoboticsFacilityWarpTrain / 25晶体矿，75瓦斯 | 生命40，护盾30，人口1，视野11；25晶体矿，75瓦斯 |
| 建筑 | 黑暗圣坛 | DarkShrine | XM共享模块CUnit：DarkShrine；底层基础镜像CUnit：DarkShrine；官方合作镜像CUnit：DarkShrine | Probe / ProtossBuild / 150晶体矿，150瓦斯，100秒 | 生命500，护盾500，视野9；150晶体矿，150瓦斯，100秒 |
| 建筑 | 传送门 | Gateway | XM共享模块CUnit：Gateway；底层基础镜像CUnit：Gateway；官方合作镜像CUnit：Gateway | Probe / ProtossBuild / 150晶体矿，65秒 | 生命500，护盾500，视野9；150晶体矿，65秒 |
| 建筑 | 折跃机械台 | ZeratulRoboticsFacility | XM共享模块CUnit：ZeratulRoboticsFacility；官方合作镜像CUnit：ZeratulRoboticsFacility | Probe / ZeratulBuild / 200晶体矿，100瓦斯，65秒 | 生命450，护盾450，视野9；200晶体矿，100瓦斯，65秒 |

## 当前 active 命令卡露出产物缺 CUnit

说明：只扫描当前指挥官模块里已挂到单位命令卡 `AbilCmd="技能,命令"` 的 `CAbilTrain/CAbilWarpTrain/CAbilBuild/CAbilMorph` 产物。产物在当前模块、XM共享模块、XMFinal运行闭包和底层基础镜像都没有 `CUnit` 时列在这里；这类才是当前 Mod 玩家按钮链路的直接风险。XML 注释已在扫描前剔除。

- 无。

## 当前 active 外来生产链露出

说明：这些按钮的产物能在 XMFinal 运行闭包或官方合作镜像中解析，但生产者不属于该指挥官官方体系。它们不是“缺 CUnit”，更像跨指挥官命令卡污染或共享基础单位需要加选择门槛。

- 无。

## 当前 active 隐藏技能产物缺 CUnit

说明：这些产物在当前模块的技能 `InfoArray` 中存在，但没有发现对应命令卡 `AbilCmd="技能,命令"`。它们通常是旧官方/编辑器残留或未开放设计，默认不按玩家可点建筑按钮修。

- 无。

