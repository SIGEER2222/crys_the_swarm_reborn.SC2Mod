# 凯瑞甘 / Kerrigan 建筑单位对比

- 当前 active Mod：`D:\MyWork\新建文件夹\mom.report.client\src\MyMod\crys_the_swarm_reborn.SC2Mod\合作指挥官版起义狂潮`
- 指挥官模块：`XMKerrigan.SC2Mod`（存在：是）
- Wiki主要部队文件：`wikitext/08-kerrigan.wiki`
- Wiki主要部队：跳虫、虫后、刺蛇、潜伏者、异龙、巢虫领主、雷兽、眼虫、脊针爬虫、孢子爬虫、虫道网络欧米茄
- 判定口径：wiki用于中文主要部队名单；官方JSON用于ID、生产链、生命/人口/费用；active Mod只检查`合作指挥官版起义狂潮`的本指挥官模块加`XMCore/XMFinal`。

## 汇总

| Wiki项 | 官方行 | Wiki未匹配官方 | 官方补充未在Wiki | 当前Mod未命中 | 仅文本命中 | 生产链异常 |
| --- | --- | --- | --- | --- | --- | --- |
| 11 | 10 | 0 | 1 | 0 | 4 | 1 |

## 三方对照

| Wiki项 | 匹配 | 分类 | 官方名称 | ID | 当前Mod | 生产链状态 | 生产/建造/变形 | 数值 | 定义文件 | 备注 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 跳虫 | 精确匹配 | 单位 | 跳虫 | Zergling | CUnit已定义：Zergling | 生产链已命中 | Larva / LarvaTrain / 25晶体矿，24秒 | 生命35，人口0.5，视野8；25晶体矿，24秒 | Mods/XM/XMKerrigan.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 虫后 | 精确匹配 | 单位 | 虫后 | SwarmQueen | CUnit已定义：Queen, QueenCoop | 生产链已命中 | Hatchery / TrainQueen / 50秒 | 50秒 | Mods/XM/XMKerrigan.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 刺蛇 | 精确匹配 | 单位 | 刺蛇 | Hydralisk | CUnit已定义：Hydralisk | 生产链已命中 | Larva / LarvaTrain / 100晶体矿，50瓦斯，33秒 | 生命90，人口2，视野9；100晶体矿，50瓦斯，33秒 | Mods/XM/XMKerrigan.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 潜伏者 | Wiki补充ID | 单位 | 潜伏者 | LurkerMP | 仅文本/引用命中：LurkerMP, Lurker | 官方JSON无生产链 |  |  |  | wiki主要部队补充：按潜伏者常用ID检查当前Mod。 |
| 异龙 | 精确匹配 | 单位 | 异龙 | MutaliskBroodlord | CUnit已定义：MutaliskBroodlord | 生产链已命中 | Drone / ZergBuild / 92.4秒 | 92.4秒 | Mods/XM/XMKerrigan.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 巢虫领主 | 精确匹配 | 单位 | 巢虫领主 | BroodLord | 仅文本/引用命中：BroodLord, Broodlord | 技能缺失 MorphToBroodLord | Corruptor / MorphToBroodLord / 150晶体矿，150瓦斯，33.8332秒 | 生命225，人口4，视野12；150晶体矿，150瓦斯，33.8332秒 |  |  |
| 雷兽 | 精确匹配 | 单位 | 雷兽 | Ultralisk | CUnit已定义：Ultralisk | 生产链已命中 | Larva / LarvaTrain / 275晶体矿，200瓦斯，55秒 | 生命500，人口6，视野9；275晶体矿，200瓦斯，55秒 | Mods/XM/XMKerrigan.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 眼虫 | Wiki补充ID | 单位 | 眼虫 | Overseer | CUnit已定义：Overseer | 官方JSON无生产链 |  |  | Mods/XM/XMKerrigan.SC2Mod/Base.SC2Data/GameData/UnitData.xml | wiki主要部队补充：官方JSON未列出眼虫，按通用眼虫ID检查当前Mod。 |
| 脊针爬虫 | 精确匹配 | 建筑 | 脊针爬虫 | SpineCrawler | 仅文本/引用命中：SpineCrawler | 生产链已命中 | Drone / ZergBuild / 150晶体矿，50秒 | 生命300，视野11；150晶体矿，50秒 |  |  |
| 孢子爬虫 | 精确匹配 | 建筑 | 孢子爬虫 | SporeCrawler | 仅文本/引用命中：SporeCrawler | 生产链已命中 | Drone / ZergBuild / 125晶体矿，30秒 | 生命300，视野11；125晶体矿，30秒 |  |  |
| 虫道网络欧米茄 | 别名匹配 | 建筑 | 虫道网络 | NydusNetwork | CUnit已定义：NydusNetwork | 生产链已命中 | Drone / ZergBuild / 200晶体矿，150瓦斯，50秒 | 生命850，视野9；200晶体矿，150瓦斯，50秒 | Mods/XM/XMKerrigan.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
|  | 官方补充 | 英雄 | 凯瑞甘 | K5Kerrigan | CUnit已定义：K5Kerrigan | 官方JSON无生产链 |  | 生命800，护盾200 | Mods/XM/XMKerrigan.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |

## 优先排查项

| Wiki项 | 匹配 | 分类 | 官方名称 | ID | 当前Mod | 生产链状态 | 生产/建造/变形 | 数值 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 潜伏者 | Wiki补充ID | 单位 | 潜伏者 | LurkerMP | 仅文本/引用命中：LurkerMP, Lurker | 官方JSON无生产链 |  |  |
| 巢虫领主 | 精确匹配 | 单位 | 巢虫领主 | BroodLord | 仅文本/引用命中：BroodLord, Broodlord | 技能缺失 MorphToBroodLord | Corruptor / MorphToBroodLord / 150晶体矿，150瓦斯，33.8332秒 | 生命225，人口4，视野12；150晶体矿，150瓦斯，33.8332秒 |
| 脊针爬虫 | 精确匹配 | 建筑 | 脊针爬虫 | SpineCrawler | 仅文本/引用命中：SpineCrawler | 生产链已命中 | Drone / ZergBuild / 150晶体矿，50秒 | 生命300，视野11；150晶体矿，50秒 |
| 孢子爬虫 | 精确匹配 | 建筑 | 孢子爬虫 | SporeCrawler | 仅文本/引用命中：SporeCrawler | 生产链已命中 | Drone / ZergBuild / 125晶体矿，30秒 | 生命300，视野11；125晶体矿，30秒 |

## Wiki未匹配官方JSON

- 无。

## 官方有但Wiki主要部队未列

| 分类 | 官方名称 | ID | 当前Mod | 生产链 | 数值 |
| --- | --- | --- | --- | --- | --- |
| 英雄 | 凯瑞甘 | K5Kerrigan | CUnit已定义：K5Kerrigan | 官方JSON无生产链 | 生命800，护盾200 |

