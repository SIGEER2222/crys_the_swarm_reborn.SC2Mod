# 菲尼克斯 / Fenix 建筑单位对比

- 当前 active Mod：`D:\MyWork\新建文件夹\mom.report.client\src\MyMod\crys_the_swarm_reborn.SC2Mod\原始mod`
- 指挥官模块：`XMFenix.SC2Mod`（存在：否）
- 旧线初始化开局单位：未解析到
- Wiki主要部队文件：`wikitext/05-fenix.wiki`
- Wiki主要部队：军团士兵、使徒、保护者、不朽者、巨像、侦测器、干扰者、侦察机、航母
- 判定口径：wiki用于中文主要部队名单；官方JSON用于ID、生产链、生命/人口/费用；active 侧先看本指挥官模块和 `XMCore/XMFinal`，再看 `XMFinal.SC2Mod/DocumentInfo` 实际运行闭包，最后只把官方镜像作为事实参考。

## 汇总

| Wiki项 | 官方行 | Wiki未匹配官方 | 官方补充未在Wiki | 当前Mod未命中 | 仅文本命中 | 运行闭包命中 | 仅官方合作镜像 | 底层继承候选 | 生产链异常 | 生产链运行闭包 | 生产链底层候选 | 命令卡露出产物缺CUnit | 外来生产链露出 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 9 | 12 | 0 | 4 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 12 | 0 | 0 |

## 三方对照

| Wiki项 | 匹配 | 分类 | 官方名称 | ID | 当前Mod | 生产链状态 | 生产/建造/变形 | 数值 | 定义文件 | 备注 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 军团士兵 | 别名匹配 | 单位 | 哨兵 | ZealotPurifier | XM共享模块CUnit：ZealotPurifier；底层基础镜像CUnit：ZealotPurifier；官方合作镜像CUnit：ZealotPurifier | 生产链在底层基础镜像命中，需实机确认 active 是否继承 | Gateway / GatewayTrain / 28秒 | 28秒 | 原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 使徒 | 精确匹配 | 单位 | 使徒 | Adept | XM共享模块CUnit：Adept；底层基础镜像CUnit：Adept；官方合作镜像CUnit：Adept | 生产链在底层基础镜像命中，需实机确认 active 是否继承 | Gateway / GatewayTrain / 125晶体矿，25瓦斯，42秒 | 生命70，护盾70，人口2，视野9；125晶体矿，25瓦斯，42秒 | 原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/void.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 保护者 | 精确匹配 | 单位 | 保护者 | SentryFenix | XM共享模块CUnit：SentryFenix；官方合作镜像CUnit：SentryFenix | 生产链在底层基础镜像命中，需实机确认 active 是否继承 | Gateway / GatewayTrain / 50晶体矿，100瓦斯，37秒 | 生命40，护盾40，人口2，视野10；50晶体矿，100瓦斯，37秒 | 原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 不朽者 | 精确匹配 | 单位 | 不朽者 | Immortal | XM共享模块CUnit：Immortal；底层基础镜像CUnit：Immortal；官方合作镜像CUnit：Immortal | 生产链在底层基础镜像命中，需实机确认 active 是否继承 | RoboticsFacility / RoboticsFacilityTrain / 250晶体矿，100瓦斯，55秒 | 生命200，护盾100，人口4，视野9；250晶体矿，100瓦斯，55秒 | 原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/swarmmulti.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 巨像 | 精确匹配 | 单位 | 巨像 | ColossusPurifier | XM共享模块CUnit：ColossusPurifier；底层基础镜像CUnit：ColossusPurifier；官方合作镜像CUnit：ColossusPurifier | 生产链在底层基础镜像命中，需实机确认 active 是否继承 | 未知生产者 / RoboticsFacilityWarpTrain |  | 原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 侦测器 | 精确匹配 | 单位 | 侦测器 | Observer | XM共享模块CUnit：Observer；底层基础镜像CUnit：Observer；官方合作镜像CUnit：Observer | 生产链在底层基础镜像命中，需实机确认 active 是否继承 | RoboticsFacilityWarp / RoboticsFacilityWarpTrain / 25晶体矿，75瓦斯 | 生命40，护盾30，人口1，视野11；25晶体矿，75瓦斯 | 原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/swarm.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 干扰者 | Wiki补充ID | 单位 | 干扰者 | Disruptor | XM共享模块CUnit：Disruptor；底层基础镜像CUnit：Disruptor；官方合作镜像CUnit：Disruptor | 官方JSON无生产链 |  |  | 原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/void.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml | wiki主要部队补充：按干扰者ID检查当前Mod。 |
| 侦察机 | 疑似别名 | 单位 | 折跃侦察机 | Scout | XM共享模块CUnit：Scout；底层基础镜像CUnit：Scout；官方合作镜像CUnit：Scout | 生产链在底层基础镜像命中，需实机确认 active 是否继承 | 未知生产者 / StargateTrain / 250晶体矿，75瓦斯 | 生命150，护盾100；250晶体矿，75瓦斯 | 原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 航母 | 精确匹配 | 单位 | 航母 | Carrier | XM共享模块CUnit：Carrier；底层基础镜像CUnit：Carrier；官方合作镜像CUnit：Carrier | 生产链在底层基础镜像命中，需实机确认 active 是否继承 | Stargate / StargateTrain / 350晶体矿，250瓦斯，90秒 | 生命300，护盾150，人口6，视野12；350晶体矿，250瓦斯，90秒 | 原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/void.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
|  | 官方补充 | 建筑 | 传送门 | Gateway | XM共享模块CUnit：Gateway；底层基础镜像CUnit：Gateway；官方合作镜像CUnit：Gateway | 生产链在底层基础镜像命中，需实机确认 active 是否继承 | Probe / ProtossBuild / 150晶体矿，65秒 | 生命500，护盾500，视野9；150晶体矿，65秒 | 原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/void.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 光子炮台 | PhotonCannon | XM共享模块CUnit：PhotonCannon；底层基础镜像CUnit：PhotonCannon；官方合作镜像CUnit：PhotonCannon | 生产链在底层基础镜像命中，需实机确认 active 是否继承 | Gateway / GatewayTrain / 150晶体矿，28秒 | 生命150，护盾150，视野11；150晶体矿，28秒 | 原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/swarmmulti.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 机械研究所 | RoboticsBay | XM共享模块CUnit：RoboticsBay；底层基础镜像CUnit：RoboticsBay；官方合作镜像CUnit：RoboticsBay | 生产链在底层基础镜像命中，需实机确认 active 是否继承 | Probe / ProtossBuild / 150晶体矿，150瓦斯，65秒 | 生命500，护盾500，视野9；150晶体矿，150瓦斯，65秒 | 原始mod/Mods/XM/XMCore.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/void.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 光影议会 | TwilightCouncil | XM共享模块CUnit：TwilightCouncil；底层基础镜像CUnit：TwilightCouncil；官方合作镜像CUnit：TwilightCouncil | 生产链在底层基础镜像命中，需实机确认 active 是否继承 | Probe / ProtossBuild / 150晶体矿，100瓦斯，50秒 | 生命500，护盾500，视野9；150晶体矿，100瓦斯，50秒 | 原始mod/Mods/XM/XMCore.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/void.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |

## 优先排查项

- 无。

## Wiki未匹配官方JSON

- 无。

## 官方有但Wiki主要部队未列

| 分类 | 官方名称 | ID | 当前Mod | 生产链 | 数值 |
| --- | --- | --- | --- | --- | --- |
| 建筑 | 传送门 | Gateway | XM共享模块CUnit：Gateway；底层基础镜像CUnit：Gateway；官方合作镜像CUnit：Gateway | Probe / ProtossBuild / 150晶体矿，65秒 | 生命500，护盾500，视野9；150晶体矿，65秒 |
| 建筑 | 光子炮台 | PhotonCannon | XM共享模块CUnit：PhotonCannon；底层基础镜像CUnit：PhotonCannon；官方合作镜像CUnit：PhotonCannon | Gateway / GatewayTrain / 150晶体矿，28秒 | 生命150，护盾150，视野11；150晶体矿，28秒 |
| 建筑 | 机械研究所 | RoboticsBay | XM共享模块CUnit：RoboticsBay；底层基础镜像CUnit：RoboticsBay；官方合作镜像CUnit：RoboticsBay | Probe / ProtossBuild / 150晶体矿，150瓦斯，65秒 | 生命500，护盾500，视野9；150晶体矿，150瓦斯，65秒 |
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

