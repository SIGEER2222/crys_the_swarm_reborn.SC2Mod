# 凯拉克斯 / Karax 建筑单位对比

- 当前 active Mod：`D:\MyWork\新建文件夹\mom.report.client\src\MyMod\crys_the_swarm_reborn.SC2Mod\合作指挥官版起义狂潮`
- 指挥官模块：`XMKarax.SC2Mod`（存在：是）
- Wiki主要部队文件：`wikitext/07-karax.wiki`
- Wiki主要部队：警戒者、激励者、不朽者、巨像、侦测器、幻影战机、航母、光子炮台、护盾充能器、凯达琳巨石
- 判定口径：wiki用于中文主要部队名单；官方JSON用于ID、生产链、生命/人口/费用；active Mod只检查`合作指挥官版起义狂潮`的本指挥官模块加`XMCore/XMFinal`。

## 汇总

| Wiki项 | 官方行 | Wiki未匹配官方 | 官方补充未在Wiki | 当前Mod未命中 | 仅文本命中 | 生产链异常 |
| --- | --- | --- | --- | --- | --- | --- |
| 10 | 13 | 0 | 4 | 0 | 2 | 0 |

## 三方对照

| Wiki项 | 匹配 | 分类 | 官方名称 | ID | 当前Mod | 生产链状态 | 生产/建造/变形 | 数值 | 定义文件 | 备注 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 警戒者 | 别名匹配 | 单位 | 哨兵 | ZealotPurifier | CUnit已定义：ZealotPurifier | 生产链已命中 | Gateway / GatewayTrain / 38秒 | 38秒 | Mods/XM/XMKarax.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 激励者 | 精确匹配 | 单位 | 激励者 | SentryPurifier | 仅文本/引用命中：SentryPurifier | 生产链已命中 | Gateway / GatewayTrain / 32秒 | 32秒 |  |  |
| 不朽者 | 精确匹配 | 单位 | 不朽者 | ImmortalAiur | CUnit已定义：ImmortalAiur | 生产链已命中 | Probe / ProtossBuild / 65秒 | 65秒 | Mods/XM/XMKarax.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 巨像 | 精确匹配 | 单位 | 巨像 | Colossus | CUnit已定义：Colossus | 生产链已命中 | RoboticsFacility / RoboticsFacilityTrain / 300晶体矿，200瓦斯，75秒 | 生命250，护盾100，人口6，视野10；300晶体矿，200瓦斯，75秒 | Mods/XM/XMKarax.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 侦测器 | 精确匹配 | 单位 | 侦测器 | Observer | CUnit已定义：Observer | 生产链已命中 | RoboticsFacility / RoboticsFacilityTrain / 25晶体矿，75瓦斯，25秒 | 生命40，护盾30，人口1，视野11；25晶体矿，75瓦斯，25秒 | Mods/XM/XMKarax.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 幻影战机 | 别名匹配 | 单位 | 折跃侦察机 | Scout | CUnit已定义：Scout | 生产链已命中 | Probe / ProtossBuild / 250晶体矿，75瓦斯，60秒 | 生命150，护盾100；250晶体矿，75瓦斯，60秒 | Mods/XM/XMKarax.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 航母 | 精确匹配 | 单位 | 航母 | Carrier | CUnit已定义：Carrier | 生产链已命中 | Stargate / StargateTrain / 350晶体矿，250瓦斯，90秒 | 生命300，护盾150，人口6，视野12；350晶体矿，250瓦斯，90秒 | Mods/XM/XMKarax.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 光子炮台 | 精确匹配 | 建筑 | 光子炮台 | PhotonCannon | CUnit已定义：PhotonCannon | 生产链已命中 | Gateway / GatewayTrain / 150晶体矿，38秒 | 生命150，护盾150，视野11；150晶体矿，38秒 | Mods/XM/XMKarax.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 护盾充能器 | 精确匹配 | 建筑 | 护盾充能器 | ShieldBattery | CUnit已定义：ShieldBattery | 生产链已命中 | Probe / ProtossBuild / 100晶体矿，40秒 | 生命200，护盾200，视野9；100晶体矿，40秒 | Mods/XM/XMKarax.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 凯达琳巨石 | Wiki补充ID | 建筑 | 凯达琳巨石 | KhaydarinMonolith | CUnit已定义：KhaydarinMonolith, Monolith | 官方JSON无生产链 |  |  | Mods/XM/XMKarax.SC2Mod/Base.SC2Data/GameData/UnitData.xml | wiki主要部队补充：按凯达琳巨石ID检查当前Mod。 |
|  | 官方补充 | 单位 | 侦察机 | PhoenixPurifier | 仅文本/引用命中：PhoenixPurifier | 生产链已命中 | Probe / ProtossBuild / 60秒 | 60秒 |  | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 传送门 | Gateway | CUnit已定义：Gateway | 生产链已命中 | Probe / ProtossBuild / 150晶体矿，65秒 | 生命500，护盾500，视野9；150晶体矿，65秒 | Mods/XM/XMKarax.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 太阳锻炉 | SolarForge | CUnit已定义：SolarForge | 生产链已命中 | 未知生产者 / ProtossBuild / 200晶体矿，200瓦斯，65秒 | 生命500，护盾500，视野9；200晶体矿，200瓦斯，65秒 | Mods/XM/XMKarax.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 光影议会 | TwilightCouncil | CUnit已定义：TwilightCouncil | 生产链已命中 | Probe / ProtossBuild / 150晶体矿，100瓦斯，50秒 | 生命500，护盾500，视野9；150晶体矿，100瓦斯，50秒 | Mods/XM/XMCore.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |

## 优先排查项

| Wiki项 | 匹配 | 分类 | 官方名称 | ID | 当前Mod | 生产链状态 | 生产/建造/变形 | 数值 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 激励者 | 精确匹配 | 单位 | 激励者 | SentryPurifier | 仅文本/引用命中：SentryPurifier | 生产链已命中 | Gateway / GatewayTrain / 32秒 | 32秒 |
|  | 官方补充 | 单位 | 侦察机 | PhoenixPurifier | 仅文本/引用命中：PhoenixPurifier | 生产链已命中 | Probe / ProtossBuild / 60秒 | 60秒 |

## Wiki未匹配官方JSON

- 无。

## 官方有但Wiki主要部队未列

| 分类 | 官方名称 | ID | 当前Mod | 生产链 | 数值 |
| --- | --- | --- | --- | --- | --- |
| 单位 | 侦察机 | PhoenixPurifier | 仅文本/引用命中：PhoenixPurifier | Probe / ProtossBuild / 60秒 | 60秒 |
| 建筑 | 传送门 | Gateway | CUnit已定义：Gateway | Probe / ProtossBuild / 150晶体矿，65秒 | 生命500，护盾500，视野9；150晶体矿，65秒 |
| 建筑 | 太阳锻炉 | SolarForge | CUnit已定义：SolarForge | 未知生产者 / ProtossBuild / 200晶体矿，200瓦斯，65秒 | 生命500，护盾500，视野9；200晶体矿，200瓦斯，65秒 |
| 建筑 | 光影议会 | TwilightCouncil | CUnit已定义：TwilightCouncil | Probe / ProtossBuild / 150晶体矿，100瓦斯，50秒 | 生命500，护盾500，视野9；150晶体矿，100瓦斯，50秒 |

