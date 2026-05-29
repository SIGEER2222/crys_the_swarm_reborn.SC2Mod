# 扎加拉 / Zagara 建筑单位对比

- 当前 active Mod：`D:\MyWork\新建文件夹\mom.report.client\src\MyMod\crys_the_swarm_reborn.SC2Mod\原始mod`
- 指挥官模块：`XMZagara.SC2Mod`（存在：否）
- Wiki主要部队文件：`wikitext/18-zagara.wiki`
- Wiki主要部队：虫后、跳虫、爆虫、畸变体、爆蚊、腐化者、眼虫、脊针爬虫、孢子爬虫、胆汁喷射体
- 判定口径：wiki用于中文主要部队名单；官方JSON用于ID、生产链、生命/人口/费用；active Mod只检查`合作指挥官版起义狂潮`的本指挥官模块加`XMCore/XMFinal`。

## 汇总

| Wiki项 | 官方行 | Wiki未匹配官方 | 官方补充未在Wiki | 当前Mod未命中 | 仅文本命中 | 生产链异常 |
| --- | --- | --- | --- | --- | --- | --- |
| 10 | 9 | 0 | 1 | 1 | 6 | 5 |

## 三方对照

| Wiki项 | 匹配 | 分类 | 官方名称 | ID | 当前Mod | 生产链状态 | 生产/建造/变形 | 数值 | 定义文件 | 备注 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 虫后 | 精确匹配 | 单位 | 虫后 | SwarmQueen | CUnit已定义：SwarmQueen | 技能缺失 TrainQueen | Hatchery / TrainQueen / 50秒 | 50秒 | Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 跳虫 | 精确匹配 | 单位 | 跳虫 | Zergling | 仅文本/引用命中：Zergling | 技能缺失 LarvaTrain | Larva / LarvaTrain / 25晶体矿，24秒 | 生命35，人口0.5，视野8；25晶体矿，24秒 |  |  |
| 爆虫 | 精确匹配 | 单位 | 爆虫 | Baneling | 仅文本/引用命中：Baneling | 生产链已命中 | Zergling / MorphZerglingToBaneling / 25晶体矿，25瓦斯，20秒 | 生命30，人口0.5，视野8；25晶体矿，25瓦斯，20秒 |  |  |
| 畸变体 | 精确匹配 | 单位 | 畸变体 | InfestedAbomination | CUnit已定义：InfestedAbomination | 生产者和技能均未命中：SILarva / SILarvaTrain | SILarva / SILarvaTrain / 30秒 | 30秒 | Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 爆蚊 | 精确匹配 | 单位 | 爆蚊 | Scourge | CUnit已定义：Scourge | 技能缺失 LarvaTrainSwarm | Larva / LarvaTrainSwarm / 1晶体矿，1瓦斯，30秒 | 1晶体矿，1瓦斯，30秒 | Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 腐化者 | 精确匹配 | 单位 | 腐化者 | Corruptor | 仅文本/引用命中：Corruptor | 技能缺失 LarvaTrain | Larva / LarvaTrain / 150晶体矿，100瓦斯，40秒 | 生命200，人口2，视野10；150晶体矿，100瓦斯，40秒 |  |  |
| 眼虫 | Wiki补充ID | 单位 | 眼虫 | Overseer | 仅文本/引用命中：Overseer | 官方JSON无生产链 |  |  |  | wiki主要部队补充：扎加拉眼虫按通用/扎加拉特化ID检查。 |
| 脊针爬虫 | 精确匹配 | 建筑 | 脊针爬虫 | SpineCrawler | 仅文本/引用命中：SpineCrawler | 生产链已命中 | Drone / ZergBuild / 150晶体矿，50秒 | 生命300，视野11；150晶体矿，50秒 |  |  |
| 孢子爬虫 | 精确匹配 | 建筑 | 孢子爬虫 | SporeCrawler | 仅文本/引用命中：SporeCrawler | 生产链已命中 | Drone / ZergBuild / 125晶体矿，30秒 | 生命300，视野11；125晶体矿，30秒 |  |  |
| 胆汁喷射体 | Wiki补充ID | 建筑 | 胆汁喷射体 | BileLauncherZagara | 未命中：BileLauncherZagara, BileLauncher | 官方JSON无生产链 |  |  |  | wiki主要部队补充：按扎加拉胆汁喷射体ID检查当前Mod。 |
|  | 官方补充 | 英雄 | 扎加拉 | ZagaraVoidCoop | CUnit已定义：ZagaraVoidCoop | 官方JSON无生产链 |  | 生命600，视野13 | Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |

## 优先排查项

| Wiki项 | 匹配 | 分类 | 官方名称 | ID | 当前Mod | 生产链状态 | 生产/建造/变形 | 数值 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 虫后 | 精确匹配 | 单位 | 虫后 | SwarmQueen | CUnit已定义：SwarmQueen | 技能缺失 TrainQueen | Hatchery / TrainQueen / 50秒 | 50秒 |
| 跳虫 | 精确匹配 | 单位 | 跳虫 | Zergling | 仅文本/引用命中：Zergling | 技能缺失 LarvaTrain | Larva / LarvaTrain / 25晶体矿，24秒 | 生命35，人口0.5，视野8；25晶体矿，24秒 |
| 爆虫 | 精确匹配 | 单位 | 爆虫 | Baneling | 仅文本/引用命中：Baneling | 生产链已命中 | Zergling / MorphZerglingToBaneling / 25晶体矿，25瓦斯，20秒 | 生命30，人口0.5，视野8；25晶体矿，25瓦斯，20秒 |
| 畸变体 | 精确匹配 | 单位 | 畸变体 | InfestedAbomination | CUnit已定义：InfestedAbomination | 生产者和技能均未命中：SILarva / SILarvaTrain | SILarva / SILarvaTrain / 30秒 | 30秒 |
| 爆蚊 | 精确匹配 | 单位 | 爆蚊 | Scourge | CUnit已定义：Scourge | 技能缺失 LarvaTrainSwarm | Larva / LarvaTrainSwarm / 1晶体矿，1瓦斯，30秒 | 1晶体矿，1瓦斯，30秒 |
| 腐化者 | 精确匹配 | 单位 | 腐化者 | Corruptor | 仅文本/引用命中：Corruptor | 技能缺失 LarvaTrain | Larva / LarvaTrain / 150晶体矿，100瓦斯，40秒 | 生命200，人口2，视野10；150晶体矿，100瓦斯，40秒 |
| 眼虫 | Wiki补充ID | 单位 | 眼虫 | Overseer | 仅文本/引用命中：Overseer | 官方JSON无生产链 |  |  |
| 脊针爬虫 | 精确匹配 | 建筑 | 脊针爬虫 | SpineCrawler | 仅文本/引用命中：SpineCrawler | 生产链已命中 | Drone / ZergBuild / 150晶体矿，50秒 | 生命300，视野11；150晶体矿，50秒 |
| 孢子爬虫 | 精确匹配 | 建筑 | 孢子爬虫 | SporeCrawler | 仅文本/引用命中：SporeCrawler | 生产链已命中 | Drone / ZergBuild / 125晶体矿，30秒 | 生命300，视野11；125晶体矿，30秒 |
| 胆汁喷射体 | Wiki补充ID | 建筑 | 胆汁喷射体 | BileLauncherZagara | 未命中：BileLauncherZagara, BileLauncher | 官方JSON无生产链 |  |  |

## Wiki未匹配官方JSON

- 无。

## 官方有但Wiki主要部队未列

| 分类 | 官方名称 | ID | 当前Mod | 生产链 | 数值 |
| --- | --- | --- | --- | --- | --- |
| 英雄 | 扎加拉 | ZagaraVoidCoop | CUnit已定义：ZagaraVoidCoop | 官方JSON无生产链 | 生命600，视野13 |

