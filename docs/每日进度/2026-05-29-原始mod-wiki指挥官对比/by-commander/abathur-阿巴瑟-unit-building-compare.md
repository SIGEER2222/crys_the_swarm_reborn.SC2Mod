# 阿巴瑟 / Abathur 建筑单位对比

- 当前 active Mod：`D:\MyWork\新建文件夹\mom.report.client\src\MyMod\crys_the_swarm_reborn.SC2Mod\原始mod`
- 指挥官模块：`XMAbathur.SC2Mod`（存在：否）
- 旧线初始化开局单位：hatchery、drone、overlord
- Wiki主要部队文件：`wikitext/01-abathur.wiki`
- Wiki主要部队：蟑螂、虫后、破坏者、虫群宿主、异龙、守护者、吞噬者、飞蛇、莽兽、利维坦、眼虫、脊针爬虫、孢子爬虫、虫道网络
- 判定口径：wiki用于中文主要部队名单；官方JSON用于ID、生产链、生命/人口/费用；active 侧先看本指挥官模块和 `XMCore/XMFinal`，再看 `XMFinal.SC2Mod/DocumentInfo` 实际运行闭包，最后只把官方镜像作为事实参考。

## 汇总

| Wiki项 | 官方行 | Wiki未匹配官方 | 官方补充未在Wiki | 当前Mod未命中 | 仅文本命中 | 运行闭包命中 | 仅官方合作镜像 | 底层继承候选 | 生产链异常 | 生产链运行闭包 | 生产链底层候选 | 命令卡露出产物缺CUnit | 外来生产链露出 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 14 | 14 | 0 | 1 | 0 | 0 | 0 | 0 | 5 | 3 | 3 | 7 | 0 | 0 |

## 三方对照

| Wiki项 | 匹配 | 分类 | 官方名称 | ID | 当前Mod | 生产链状态 | 生产/建造/变形 | 数值 | 定义文件 | 备注 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 蟑螂 | 精确匹配 | 单位 | 蟑螂 | Roach | 底层基础镜像CUnit：Roach；官方合作镜像CUnit：Roach | 生产链在底层基础镜像命中，需实机确认 active 是否继承 | Larva / LarvaTrain / 75晶体矿，25瓦斯，27秒 | 生命145，人口2，视野9；75晶体矿，25瓦斯，27秒 | 游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/swarmmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/swarm.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 蟑螂 | 精确匹配 | 单位 | 蟑螂 | RoachCorpser | XM共享模块CUnit：RoachCorpser；底层基础镜像CUnit：RoachCorpser；官方合作镜像CUnit：RoachCorpser | 生产链在底层基础镜像命中，需实机确认 active 是否继承 | Drone / ZergBuild / 55秒 | 生命145；55秒 | 原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 虫后 | 精确匹配 | 单位 | 虫后 | SwarmQueen | XM共享模块CUnit：SwarmQueen；底层基础镜像CUnit：Queen；官方合作镜像CUnit：SwarmQueen, Queen, QueenCoop | 生产链在 XMFinal 运行闭包命中 | 未知生产者 / SICommandCenterTrain |  | 原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/swarmmulti.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 破坏者 | 精确匹配 | 单位 | 破坏者 | RavagerAbathur | XM共享模块CUnit：RavagerAbathur；底层基础镜像CUnit：Ravager；官方合作镜像CUnit：RavagerAbathur, Ravager | 生产链已命中 | RoachCorpser / MorphRoachToRavager / 125晶体矿，75瓦斯，9秒 | 生命120，人口3，视野9；125晶体矿，75瓦斯，9秒 | 原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/liberty.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 虫群宿主 | 精确匹配 | 单位 | 虫群宿主 | SwarmHost | XM共享模块CUnit：SwarmHost；官方合作镜像CUnit：SwarmHost | 生产链在 XMFinal 运行闭包命中 | SIDrone / SIBasicBuild / 50秒 | 50秒 | 原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 异龙 | 精确匹配 | 单位 | 异龙 | Mutalisk | 底层基础镜像CUnit：Mutalisk；官方合作镜像CUnit：Mutalisk | 生产链在底层基础镜像命中，需实机确认 active 是否继承 | Larva / LarvaTrain / 100晶体矿，100瓦斯，33秒 | 生命120，人口2，视野11；100晶体矿，100瓦斯，33秒 | 游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/void.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/swarmmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/swarm.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 守护者 | 精确匹配 | 单位 | 守护者 | GuardianMP | 底层基础镜像CUnit：GuardianMP；官方合作镜像CUnit：GuardianMP | 技能仅在官方合作镜像：MutaliskMorphToGuardian | Mutalisk / MutaliskMorphToGuardian / 50晶体矿，100瓦斯，15秒 | 生命150，人口2，视野13；50晶体矿，100瓦斯，15秒 | 游戏数据/官方SC2原始文本镜像/mods/void.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 吞噬者 | 精确匹配 | 单位 | 吞噬者 | DevourerMP | 底层基础镜像CUnit：DevourerMP；官方合作镜像CUnit：DevourerMP, Devourer | 生产链在底层基础镜像命中，需实机确认 active 是否继承 | Mutalisk / MutaliskMorphToDevourer / 150晶体矿，50瓦斯，15秒 | 生命250，人口2，视野9；150晶体矿，50瓦斯，15秒 | 游戏数据/官方SC2原始文本镜像/mods/void.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 飞蛇 | 精确匹配 | 单位 | 飞蛇 | Viper | 底层基础镜像CUnit：Viper；官方合作镜像CUnit：Viper | 生产链在底层基础镜像命中，需实机确认 active 是否继承 | Larva / LarvaTrain / 100晶体矿，200瓦斯，29秒 | 生命150，人口3，视野11；100晶体矿，200瓦斯，29秒 | 游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/void.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/swarmmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/swarm.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 莽兽 | 精确匹配 | 单位 | 莽兽 | Brutalisk | XM共享模块CUnit：Brutalisk；官方合作镜像CUnit：Brutalisk | 技能仅在官方合作镜像：EvolveToBrutaliskRavager | RavagerAbathur / EvolveToBrutaliskRavager / 375晶体矿，225瓦斯，5秒 | 375晶体矿，225瓦斯，5秒 | 原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 利维坦 | 精确匹配 | 单位 | 利维坦 | Leviathan | XM共享模块CUnit：Leviathan；官方合作镜像CUnit：Leviathan | 技能仅在官方合作镜像：EvolveToLeviathanViper | DehakaViper / EvolveToLeviathanViper / 5秒 | 5秒 | 原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 眼虫 | Wiki补充ID | 单位 | 眼虫 | Overseer | XM共享模块CUnit：Overseer；底层基础镜像CUnit：Overseer；官方合作镜像CUnit：Overseer | 官方JSON无生产链 |  |  | 原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/swarm.sc2mod/base.sc2data/gamedata/unitdata.xml | wiki主要部队补充：官方JSON未列出眼虫，按通用眼虫ID检查当前Mod。 |
| 脊针爬虫 | 精确匹配 | 建筑 | 脊针爬虫 | SpineCrawler | XM共享模块CUnit：SpineCrawler；底层基础镜像CUnit：SpineCrawler；官方合作镜像CUnit：SpineCrawler | 生产链在底层基础镜像命中，需实机确认 active 是否继承 | Drone / ZergBuild / 150晶体矿，50秒 | 生命300，视野11；150晶体矿，50秒 | 原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/swarmmulti.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 孢子爬虫 | 精确匹配 | 建筑 | 孢子爬虫 | SporeCrawler | XM共享模块CUnit：SporeCrawler；底层基础镜像CUnit：SporeCrawler；官方合作镜像CUnit：SporeCrawler | 生产链在 XMFinal 运行闭包命中 | SIDrone / SIBasicBuild / 125晶体矿，50秒 | 生命300，视野11；125晶体矿，50秒 | 原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/swarmmulti.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 虫道网络 | Wiki补充ID | 建筑 | 虫道网络 | NydusNetwork | XM共享模块CUnit：NydusNetwork；底层基础镜像CUnit：NydusNetwork；官方合作镜像CUnit：NydusNetwork | 官方JSON无生产链 |  |  | 原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/void.sc2mod/base.sc2data/gamedata/unitdata.xml | wiki主要部队补充：官方JSON未列出该建筑时按虫道网络ID检查。 |
|  | 官方补充 | 单位 | 蟑螂 | RoachVile | XM共享模块CUnit：RoachVile；底层基础镜像CUnit：RoachVile；官方合作镜像CUnit：RoachVile | 生产链在底层基础镜像命中，需实机确认 active 是否继承 | Drone / ZergBuild / 55秒 | 生命145；55秒 | 原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |

## 优先排查项

| Wiki项 | 匹配 | 分类 | 官方名称 | ID | 当前Mod | 生产链状态 | 生产/建造/变形 | 数值 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 守护者 | 精确匹配 | 单位 | 守护者 | GuardianMP | 底层基础镜像CUnit：GuardianMP；官方合作镜像CUnit：GuardianMP | 技能仅在官方合作镜像：MutaliskMorphToGuardian | Mutalisk / MutaliskMorphToGuardian / 50晶体矿，100瓦斯，15秒 | 生命150，人口2，视野13；50晶体矿，100瓦斯，15秒 |
| 莽兽 | 精确匹配 | 单位 | 莽兽 | Brutalisk | XM共享模块CUnit：Brutalisk；官方合作镜像CUnit：Brutalisk | 技能仅在官方合作镜像：EvolveToBrutaliskRavager | RavagerAbathur / EvolveToBrutaliskRavager / 375晶体矿，225瓦斯，5秒 | 375晶体矿，225瓦斯，5秒 |
| 利维坦 | 精确匹配 | 单位 | 利维坦 | Leviathan | XM共享模块CUnit：Leviathan；官方合作镜像CUnit：Leviathan | 技能仅在官方合作镜像：EvolveToLeviathanViper | DehakaViper / EvolveToLeviathanViper / 5秒 | 5秒 |

## Wiki未匹配官方JSON

- 无。

## 官方有但Wiki主要部队未列

| 分类 | 官方名称 | ID | 当前Mod | 生产链 | 数值 |
| --- | --- | --- | --- | --- | --- |
| 单位 | 蟑螂 | RoachVile | XM共享模块CUnit：RoachVile；底层基础镜像CUnit：RoachVile；官方合作镜像CUnit：RoachVile | Drone / ZergBuild / 55秒 | 生命145；55秒 |

## 当前 active 命令卡露出产物缺 CUnit

说明：只扫描当前指挥官模块里已挂到单位命令卡 `AbilCmd="技能,命令"` 的 `CAbilTrain/CAbilWarpTrain/CAbilBuild/CAbilMorph` 产物。产物在当前模块、XM共享模块、XMFinal运行闭包和底层基础镜像都没有 `CUnit` 时列在这里；这类才是当前 Mod 玩家按钮链路的直接风险。XML 注释已在扫描前剔除。

- 无。

## 当前 active 外来生产链露出

说明：这些按钮的产物能在 XMFinal 运行闭包或官方合作镜像中解析，但生产者不属于该指挥官官方体系。它们不是“缺 CUnit”，更像跨指挥官命令卡污染或共享基础单位需要加选择门槛。

- 无。

## 当前 active 隐藏技能产物缺 CUnit

说明：这些产物在当前模块的技能 `InfoArray` 中存在，但没有发现对应命令卡 `AbilCmd="技能,命令"`。它们通常是旧官方/编辑器残留或未开放设计，默认不按玩家可点建筑按钮修。

- 无。

