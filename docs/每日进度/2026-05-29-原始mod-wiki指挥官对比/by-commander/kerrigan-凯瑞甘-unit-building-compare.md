# 凯瑞甘 / Kerrigan 建筑单位对比

- 当前 active Mod：`D:\MyWork\新建文件夹\mom.report.client\src\MyMod\crys_the_swarm_reborn.SC2Mod\原始mod`
- 指挥官模块：`XMKerrigan.SC2Mod`（存在：否）
- 旧线初始化开局单位：未解析到
- Wiki主要部队文件：`wikitext/08-kerrigan.wiki`
- Wiki主要部队：跳虫、虫后、刺蛇、潜伏者、异龙、巢虫领主、雷兽、眼虫、脊针爬虫、孢子爬虫、虫道网络欧米茄
- 判定口径：wiki用于中文主要部队名单；官方JSON用于ID、生产链、生命/人口/费用；active 侧先看本指挥官模块和 `XMCore/XMFinal`，再看 `XMFinal.SC2Mod/DocumentInfo` 实际运行闭包，最后只把官方镜像作为事实参考。

## 汇总

| Wiki项 | 官方行 | Wiki未匹配官方 | 官方补充未在Wiki | 当前Mod未命中 | 仅文本命中 | 运行闭包命中 | 仅官方合作镜像 | 底层继承候选 | 生产链异常 | 生产链运行闭包 | 生产链底层候选 | 命令卡露出产物缺CUnit | 外来生产链露出 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 11 | 10 | 0 | 2 | 0 | 0 | 0 | 0 | 0 | 0 | 3 | 6 | 0 | 0 |

## 三方对照

| Wiki项 | 匹配 | 分类 | 官方名称 | ID | 当前Mod | 生产链状态 | 生产/建造/变形 | 数值 | 定义文件 | 备注 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 跳虫 | 精确匹配 | 单位 | 跳虫 | Zergling | XM共享模块CUnit：Zergling；底层基础镜像CUnit：Zergling；官方合作镜像CUnit：Zergling | 生产链在 XMFinal 运行闭包命中 | SILarva / SILarvaTrain / 25晶体矿，24秒 | 生命35，人口0.5，视野8；25晶体矿，24秒 | 原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/swarmmulti.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 虫后 | 精确匹配 | 单位 | 虫后 | SwarmQueen | XM共享模块CUnit：SwarmQueen；底层基础镜像CUnit：Queen；官方合作镜像CUnit：SwarmQueen, Queen, QueenCoop | 生产链在 XMFinal 运行闭包命中 | 未知生产者 / SICommandCenterTrain |  | 原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/swarmmulti.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 刺蛇 | 精确匹配 | 单位 | 刺蛇 | Hydralisk | XM共享模块CUnit：Hydralisk；底层基础镜像CUnit：Hydralisk；官方合作镜像CUnit：Hydralisk | 生产链在底层基础镜像命中，需实机确认 active 是否继承 | Larva / LarvaTrain / 100晶体矿，50瓦斯，33秒 | 生命90，人口2，视野9；100晶体矿，50瓦斯，33秒 | 原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/swarmmulti.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 潜伏者 | Wiki补充ID | 单位 | 潜伏者 | LurkerMP | XM共享模块CUnit：LurkerMP, Lurker；底层基础镜像CUnit：LurkerMP, Lurker；官方合作镜像CUnit：LurkerMP, Lurker | 官方JSON无生产链 |  |  | 原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/void.sc2mod/base.sc2data/gamedata/unitdata.xml | wiki主要部队补充：按潜伏者常用ID检查当前Mod。 |
| 异龙 | 精确匹配 | 单位 | 异龙 | MutaliskBroodlord | XM共享模块CUnit：MutaliskBroodlord；官方合作镜像CUnit：MutaliskBroodlord | 生产链在底层基础镜像命中，需实机确认 active 是否继承 | Drone / ZergBuild / 92.4秒 | 92.4秒 | 原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 巢虫领主 | 精确匹配 | 单位 | 巢虫领主 | BroodLord | XM共享模块CUnit：BroodLord；底层基础镜像CUnit：BroodLord；官方合作镜像CUnit：BroodLord | 生产链在底层基础镜像命中，需实机确认 active 是否继承 | Corruptor / MorphToBroodLord / 150晶体矿，150瓦斯，33.8332秒 | 生命225，人口4，视野12；150晶体矿，150瓦斯，33.8332秒 | 原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/void.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/swarmmulti.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 雷兽 | 精确匹配 | 单位 | 雷兽 | Ultralisk | XM共享模块CUnit：Ultralisk；底层基础镜像CUnit：Ultralisk；官方合作镜像CUnit：Ultralisk | 生产链在底层基础镜像命中，需实机确认 active 是否继承 | Larva / LarvaTrain / 275晶体矿，200瓦斯，55秒 | 生命500，人口6，视野9；275晶体矿，200瓦斯，55秒 | 原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/void.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 眼虫 | Wiki补充ID | 单位 | 眼虫 | Overseer | XM共享模块CUnit：Overseer；底层基础镜像CUnit：Overseer；官方合作镜像CUnit：Overseer | 官方JSON无生产链 |  |  | 原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/swarm.sc2mod/base.sc2data/gamedata/unitdata.xml | wiki主要部队补充：官方JSON未列出眼虫，按通用眼虫ID检查当前Mod。 |
| 脊针爬虫 | 精确匹配 | 建筑 | 脊针爬虫 | SpineCrawler | XM共享模块CUnit：SpineCrawler；底层基础镜像CUnit：SpineCrawler；官方合作镜像CUnit：SpineCrawler | 生产链在底层基础镜像命中，需实机确认 active 是否继承 | Drone / ZergBuild / 150晶体矿，50秒 | 生命300，视野11；150晶体矿，50秒 | 原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/swarmmulti.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 孢子爬虫 | 精确匹配 | 建筑 | 孢子爬虫 | SporeCrawler | XM共享模块CUnit：SporeCrawler；底层基础镜像CUnit：SporeCrawler；官方合作镜像CUnit：SporeCrawler | 生产链在 XMFinal 运行闭包命中 | SIDrone / SIBasicBuild / 125晶体矿，50秒 | 生命300，视野11；125晶体矿，50秒 | 原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/swarmmulti.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 虫道网络欧米茄 | Wiki补充ID | 建筑 | 虫道网络欧米茄 | GreaterNydusWorm | XM共享模块CUnit：GreaterNydusWorm, GreaterNydusWormAlly；底层基础镜像CUnit：GreaterNydusWorm；官方合作镜像CUnit：GreaterNydusWorm, GreaterNydusWormAlly | 官方JSON无生产链 |  |  | 原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml | wiki主要部队补充：欧米茄坑道虫是凯瑞甘等级解锁；当前原始mod未直接定义该CUnit时不应把它等同为普通虫道网络。 |
|  | 官方补充 | 英雄 | 凯瑞甘 | K5Kerrigan | XM共享模块CUnit：K5Kerrigan；官方合作镜像CUnit：K5Kerrigan | 官方JSON无生产链 |  | 生命800，护盾200 | 原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 虫道网络 | NydusNetwork | XM共享模块CUnit：NydusNetwork；底层基础镜像CUnit：NydusNetwork；官方合作镜像CUnit：NydusNetwork | 生产链在底层基础镜像命中，需实机确认 active 是否继承 | Drone / ZergBuild / 200晶体矿，150瓦斯，50秒 | 生命850，视野9；200晶体矿，150瓦斯，50秒 | 原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/void.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |

## 优先排查项

- 无。

## Wiki未匹配官方JSON

- 无。

## 官方有但Wiki主要部队未列

| 分类 | 官方名称 | ID | 当前Mod | 生产链 | 数值 |
| --- | --- | --- | --- | --- | --- |
| 英雄 | 凯瑞甘 | K5Kerrigan | XM共享模块CUnit：K5Kerrigan；官方合作镜像CUnit：K5Kerrigan | 官方JSON无生产链 | 生命800，护盾200 |
| 建筑 | 虫道网络 | NydusNetwork | XM共享模块CUnit：NydusNetwork；底层基础镜像CUnit：NydusNetwork；官方合作镜像CUnit：NydusNetwork | Drone / ZergBuild / 200晶体矿，150瓦斯，50秒 | 生命850，视野9；200晶体矿，150瓦斯，50秒 |

## 当前 active 命令卡露出产物缺 CUnit

说明：只扫描当前指挥官模块里已挂到单位命令卡 `AbilCmd="技能,命令"` 的 `CAbilTrain/CAbilWarpTrain/CAbilBuild/CAbilMorph` 产物。产物在当前模块、XM共享模块、XMFinal运行闭包和底层基础镜像都没有 `CUnit` 时列在这里；这类才是当前 Mod 玩家按钮链路的直接风险。XML 注释已在扫描前剔除。

- 无。

## 当前 active 外来生产链露出

说明：这些按钮的产物能在 XMFinal 运行闭包或官方合作镜像中解析，但生产者不属于该指挥官官方体系。它们不是“缺 CUnit”，更像跨指挥官命令卡污染或共享基础单位需要加选择门槛。

- 无。

## 当前 active 隐藏技能产物缺 CUnit

说明：这些产物在当前模块的技能 `InfoArray` 中存在，但没有发现对应命令卡 `AbilCmd="技能,命令"`。它们通常是旧官方/编辑器残留或未开放设计，默认不按玩家可点建筑按钮修。

- 无。

