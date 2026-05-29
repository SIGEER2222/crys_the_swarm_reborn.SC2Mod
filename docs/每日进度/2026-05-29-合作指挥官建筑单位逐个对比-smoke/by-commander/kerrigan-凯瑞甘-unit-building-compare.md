# 凯瑞甘 / Kerrigan 建筑单位对比

- 当前 active Mod：`D:\MyWork\新建文件夹\mom.report.client\src\MyMod\crys_the_swarm_reborn.SC2Mod\合作指挥官版起义狂潮`
- 指挥官模块：`XMKerrigan.SC2Mod`（存在：是）
- Wiki主要部队文件：`wikitext/08-kerrigan.wiki`
- Wiki主要部队：跳虫、虫后、刺蛇、潜伏者、异龙、巢虫领主、雷兽、眼虫、脊针爬虫、孢子爬虫、虫道网络欧米茄
- 判定口径：wiki用于中文主要部队名单；官方JSON用于ID、生产链、生命/人口/费用；active 侧优先看本指挥官模块和 `XMCore/XMFinal`，再标注新官方镜像中的 StarCoop/底层基础 Catalog 是否存在。

## 汇总

| Wiki项 | 官方行 | Wiki未匹配官方 | 官方补充未在Wiki | 当前Mod未命中 | 仅文本命中 | 仅官方合作镜像 | 底层继承候选 | 生产链异常 | 生产链底层候选 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 11 | 10 | 0 | 1 | 0 | 0 | 0 | 4 | 0 | 1 |

## 三方对照

| Wiki项 | 匹配 | 分类 | 官方名称 | ID | 当前Mod | 生产链状态 | 生产/建造/变形 | 数值 | 定义文件 | 备注 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 跳虫 | 精确匹配 | 单位 | 跳虫 | Zergling | 当前模块CUnit：Zergling；底层基础镜像CUnit：Zergling；官方合作镜像CUnit：Zergling | 生产链已命中 | Larva / LarvaTrain / 25晶体矿，24秒 | 生命35，人口0.5，视野8；25晶体矿，24秒 | 合作指挥官版起义狂潮/Mods/XM/XMKerrigan.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/swarmmulti.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 虫后 | 精确匹配 | 单位 | 虫后 | SwarmQueen | 当前模块CUnit：Queen, QueenCoop；底层基础镜像CUnit：Queen；官方合作镜像CUnit：SwarmQueen, Queen, QueenCoop | 生产链已命中 | Hatchery / TrainQueen / 50秒 | 50秒 | 合作指挥官版起义狂潮/Mods/XM/XMKerrigan.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/swarmmulti.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 刺蛇 | 精确匹配 | 单位 | 刺蛇 | Hydralisk | 当前模块CUnit：Hydralisk；底层基础镜像CUnit：Hydralisk；官方合作镜像CUnit：Hydralisk | 生产链已命中 | Larva / LarvaTrain / 100晶体矿，50瓦斯，33秒 | 生命90，人口2，视野9；100晶体矿，50瓦斯，33秒 | 合作指挥官版起义狂潮/Mods/XM/XMKerrigan.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/swarmmulti.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 潜伏者 | Wiki补充ID | 单位 | 潜伏者 | LurkerMP | 底层基础镜像CUnit：LurkerMP, Lurker；官方合作镜像CUnit：LurkerMP, Lurker | 官方JSON无生产链 |  |  | 游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/void.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/liberty.sc2mod/base.sc2data/gamedata/unitdata.xml | wiki主要部队补充：按潜伏者常用ID检查当前Mod。 |
| 异龙 | 精确匹配 | 单位 | 异龙 | MutaliskBroodlord | 当前模块CUnit：MutaliskBroodlord；官方合作镜像CUnit：MutaliskBroodlord | 生产链已命中 | Drone / ZergBuild / 92.4秒 | 92.4秒 | 合作指挥官版起义狂潮/Mods/XM/XMKerrigan.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 巢虫领主 | 精确匹配 | 单位 | 巢虫领主 | BroodLord | 底层基础镜像CUnit：BroodLord；官方合作镜像CUnit：BroodLord | 生产链在底层基础镜像命中，需实机确认 active 是否继承 | Corruptor / MorphToBroodLord / 150晶体矿，150瓦斯，33.8332秒 | 生命225，人口4，视野12；150晶体矿，150瓦斯，33.8332秒 | 游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/void.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/swarmmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/swarm.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 雷兽 | 精确匹配 | 单位 | 雷兽 | Ultralisk | 当前模块CUnit：Ultralisk；底层基础镜像CUnit：Ultralisk；官方合作镜像CUnit：Ultralisk | 生产链已命中 | Larva / LarvaTrain / 275晶体矿，200瓦斯，55秒 | 生命500，人口6，视野9；275晶体矿，200瓦斯，55秒 | 合作指挥官版起义狂潮/Mods/XM/XMKerrigan.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/void.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 眼虫 | Wiki补充ID | 单位 | 眼虫 | Overseer | 当前模块CUnit：Overseer；底层基础镜像CUnit：Overseer；官方合作镜像CUnit：Overseer | 官方JSON无生产链 |  |  | 合作指挥官版起义狂潮/Mods/XM/XMKerrigan.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/swarm.sc2mod/base.sc2data/gamedata/unitdata.xml | wiki主要部队补充：官方JSON未列出眼虫，按通用眼虫ID检查当前Mod。 |
| 脊针爬虫 | 精确匹配 | 建筑 | 脊针爬虫 | SpineCrawler | 底层基础镜像CUnit：SpineCrawler；官方合作镜像CUnit：SpineCrawler | 生产链已命中 | Drone / ZergBuild / 150晶体矿，50秒 | 生命300，视野11；150晶体矿，50秒 | 游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/swarmmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/swarm.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 孢子爬虫 | 精确匹配 | 建筑 | 孢子爬虫 | SporeCrawler | 底层基础镜像CUnit：SporeCrawler；官方合作镜像CUnit：SporeCrawler | 生产链已命中 | Drone / ZergBuild / 125晶体矿，30秒 | 生命300，视野11；125晶体矿，30秒 | 游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/swarmmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/swarm.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 虫道网络欧米茄 | 疑似别名 | 建筑 | 虫道网络 | NydusNetwork | 当前模块CUnit：NydusNetwork；底层基础镜像CUnit：NydusNetwork；官方合作镜像CUnit：NydusNetwork | 生产链已命中 | Drone / ZergBuild / 200晶体矿，150瓦斯，50秒 | 生命850，视野9；200晶体矿，150瓦斯，50秒 | 合作指挥官版起义狂潮/Mods/XM/XMKerrigan.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/void.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
|  | 官方补充 | 英雄 | 凯瑞甘 | K5Kerrigan | 当前模块CUnit：K5Kerrigan；官方合作镜像CUnit：K5Kerrigan | 官方JSON无生产链 |  | 生命800，护盾200 | 合作指挥官版起义狂潮/Mods/XM/XMKerrigan.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |

## 优先排查项

- 无。

## Wiki未匹配官方JSON

- 无。

## 官方有但Wiki主要部队未列

| 分类 | 官方名称 | ID | 当前Mod | 生产链 | 数值 |
| --- | --- | --- | --- | --- | --- |
| 英雄 | 凯瑞甘 | K5Kerrigan | 当前模块CUnit：K5Kerrigan；官方合作镜像CUnit：K5Kerrigan | 官方JSON无生产链 | 生命800，护盾200 |

