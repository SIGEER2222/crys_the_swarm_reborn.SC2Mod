# 阿巴瑟 / Abathur 建筑单位对比

- 当前 active Mod：`D:\MyWork\新建文件夹\mom.report.client\src\MyMod\crys_the_swarm_reborn.SC2Mod\合作指挥官版起义狂潮`
- 指挥官模块：`XMAbathur.SC2Mod`（存在：是）
- Wiki主要部队文件：`wikitext/01-abathur.wiki`
- Wiki主要部队：蟑螂、虫后、破坏者、虫群宿主、异龙、守护者、吞噬者、飞蛇、莽兽、利维坦、眼虫、脊针爬虫、孢子爬虫、虫道网络
- 判定口径：wiki用于中文主要部队名单；官方JSON用于ID、生产链、生命/人口/费用；active Mod只检查`合作指挥官版起义狂潮`的本指挥官模块加`XMCore/XMFinal`。

## 汇总

| Wiki项 | 官方行 | Wiki未匹配官方 | 官方补充未在Wiki | 当前Mod未命中 | 仅文本命中 | 生产链异常 |
| --- | --- | --- | --- | --- | --- | --- |
| 14 | 14 | 0 | 1 | 0 | 0 | 0 |

## 三方对照

| Wiki项 | 匹配 | 分类 | 官方名称 | ID | 当前Mod | 生产链状态 | 生产/建造/变形 | 数值 | 定义文件 | 备注 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 蟑螂 | 精确匹配 | 单位 | 蟑螂 | Roach | CUnit已定义：Roach | 生产链已命中 | Larva / LarvaTrain / 75晶体矿，25瓦斯，27秒 | 生命145，人口2，视野9；75晶体矿，25瓦斯，27秒 | Mods/XM/XMAbathur.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 蟑螂 | 精确匹配 | 单位 | 蟑螂 | RoachCorpser | CUnit已定义：RoachCorpser | 生产链已命中 | Drone / ZergBuild / 55秒 | 生命145；55秒 | Mods/XM/XMAbathur.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 虫后 | 精确匹配 | 单位 | 虫后 | SwarmQueen | CUnit已定义：SwarmQueen, Queen, QueenCoop | 生产链已命中 | Hatchery / TrainQueen / 50秒 | 50秒 | Mods/XM/XMAbathur.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 破坏者 | 精确匹配 | 单位 | 破坏者 | RavagerAbathur | CUnit已定义：RavagerAbathur, Ravager | 生产链已命中 | Roach / MorphRoachToRavager / 50晶体矿，50瓦斯，9秒 | 生命120，人口3，视野9；50晶体矿，50瓦斯，9秒 | Mods/XM/XMAbathur.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 虫群宿主 | 精确匹配 | 单位 | 虫群宿主 | SwarmHost | CUnit已定义：SwarmHost | 生产链已命中 | Larva / LarvaTrain / 40秒 | 40秒 | Mods/XM/XMAbathur.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 异龙 | 精确匹配 | 单位 | 异龙 | Mutalisk | CUnit已定义：Mutalisk | 生产链已命中 | Larva / LarvaTrain / 100晶体矿，100瓦斯，33秒 | 生命120，人口2，视野11；100晶体矿，100瓦斯，33秒 | Mods/XM/XMAbathur.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 守护者 | 精确匹配 | 单位 | 守护者 | GuardianMP | CUnit已定义：GuardianMP | 生产链已命中 | Mutalisk / MutaliskMorphToGuardian / 50晶体矿，100瓦斯，15秒 | 生命150，人口2，视野13；50晶体矿，100瓦斯，15秒 | Mods/XM/XMAbathur.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 吞噬者 | 精确匹配 | 单位 | 吞噬者 | DevourerMP | CUnit已定义：Devourer | 生产链已命中 | Mutalisk / MutaliskMorphToDevourer / 150晶体矿，50瓦斯，15秒 | 生命250，人口2，视野9；150晶体矿，50瓦斯，15秒 | Mods/XM/XMAbathur.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 飞蛇 | 精确匹配 | 单位 | 飞蛇 | Viper | CUnit已定义：Viper | 生产链已命中 | Larva / LarvaTrain / 100晶体矿，200瓦斯，29秒 | 生命150，人口3，视野11；100晶体矿，200瓦斯，29秒 | Mods/XM/XMAbathur.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 莽兽 | 精确匹配 | 单位 | 莽兽 | Brutalisk | CUnit已定义：Brutalisk | 生产链已命中 | RavagerAbathur / EvolveToBrutaliskRavager / 375晶体矿，225瓦斯，5秒 | 375晶体矿，225瓦斯，5秒 | Mods/XM/XMAbathur.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 利维坦 | 精确匹配 | 单位 | 利维坦 | Leviathan | CUnit已定义：Leviathan | 生产链已命中 | GuardianMP / EvolveToLeviathanGuardianMP / 5秒 | 5秒 | Mods/XM/XMAbathur.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 眼虫 | Wiki补充ID | 单位 | 眼虫 | Overseer | CUnit已定义：Overseer | 官方JSON无生产链 |  |  | Mods/XM/XMAbathur.SC2Mod/Base.SC2Data/GameData/UnitData.xml | wiki主要部队补充：官方JSON未列出眼虫，按通用眼虫ID检查当前Mod。 |
| 脊针爬虫 | 精确匹配 | 建筑 | 脊针爬虫 | SpineCrawler | CUnit已定义：SpineCrawler | 生产链已命中 | Drone / ZergBuild / 150晶体矿，50秒 | 生命300，视野11；150晶体矿，50秒 | Mods/XM/XMAbathur.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 孢子爬虫 | 精确匹配 | 建筑 | 孢子爬虫 | SporeCrawler | CUnit已定义：SporeCrawler | 生产链已命中 | Drone / ZergBuild / 125晶体矿，30秒 | 生命300，视野11；125晶体矿，30秒 | Mods/XM/XMAbathur.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 虫道网络 | Wiki补充ID | 建筑 | 虫道网络 | NydusNetwork | CUnit已定义：NydusNetwork | 官方JSON无生产链 |  |  | Mods/XM/XMAbathur.SC2Mod/Base.SC2Data/GameData/UnitData.xml | wiki主要部队补充：官方JSON未列出该建筑时按虫道网络ID检查。 |
|  | 官方补充 | 单位 | 蟑螂 | RoachVile | CUnit已定义：RoachVile | 生产链已命中 | Drone / ZergBuild / 55秒 | 生命145；55秒 | Mods/XM/XMAbathur.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |

## 优先排查项

- 无。

## Wiki未匹配官方JSON

- 无。

## 官方有但Wiki主要部队未列

| 分类 | 官方名称 | ID | 当前Mod | 生产链 | 数值 |
| --- | --- | --- | --- | --- | --- |
| 单位 | 蟑螂 | RoachVile | CUnit已定义：RoachVile | Drone / ZergBuild / 55秒 | 生命145；55秒 |

