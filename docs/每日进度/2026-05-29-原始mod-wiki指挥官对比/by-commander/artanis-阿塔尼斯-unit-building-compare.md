# 阿塔尼斯 / Artanis 建筑单位对比

- 当前 active Mod：`D:\MyWork\新建文件夹\mom.report.client\src\MyMod\crys_the_swarm_reborn.SC2Mod\原始mod`
- 指挥官模块：`XMArtanis.SC2Mod`（存在：否）
- Wiki主要部队文件：`wikitext/03-artanis.wiki`
- Wiki主要部队：狂热者、龙骑士、高阶圣堂武士、执政官、不朽者、掠夺者、侦测器、凤凰、风暴战舰、光子炮台
- 判定口径：wiki用于中文主要部队名单；官方JSON用于ID、生产链、生命/人口/费用；active Mod只检查`合作指挥官版起义狂潮`的本指挥官模块加`XMCore/XMFinal`。

## 汇总

| Wiki项 | 官方行 | Wiki未匹配官方 | 官方补充未在Wiki | 当前Mod未命中 | 仅文本命中 | 生产链异常 |
| --- | --- | --- | --- | --- | --- | --- |
| 10 | 12 | 0 | 4 | 0 | 8 | 11 |

## 三方对照

| Wiki项 | 匹配 | 分类 | 官方名称 | ID | 当前Mod | 生产链状态 | 生产/建造/变形 | 数值 | 定义文件 | 备注 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 狂热者 | 精确匹配 | 单位 | 狂热者 | Zealot | 仅文本/引用命中：Zealot | 技能缺失 GatewayTrain | Gateway / GatewayTrain / 100晶体矿，38秒 | 生命100，护盾50，人口2，视野9；100晶体矿，38秒 |  |  |
| 龙骑士 | 精确匹配 | 单位 | 龙骑士 | Dragoon | CUnit已定义：Dragoon | 技能缺失 GatewayTrain | Gateway / GatewayTrain / 38秒 | 生命100；38秒 | Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 高阶圣堂武士 | 精确匹配 | 单位 | 高阶圣堂武士 | HighTemplar | 仅文本/引用命中：HighTemplar | 技能缺失 GatewayTrain | Gateway / GatewayTrain / 50晶体矿，150瓦斯，55秒 | 生命40，护盾40，人口2，视野10；50晶体矿，150瓦斯，55秒 |  |  |
| 执政官 | 精确匹配 | 单位 | 执政官 | Archon | 仅文本/引用命中：Archon | 生产链已命中 | 未知生产者 / ArchonWarp / -175晶体矿，-275瓦斯，16.6667秒 | 生命10，护盾350，人口4，视野9；-175晶体矿，-275瓦斯，16.6667秒 |  |  |
| 不朽者 | 精确匹配 | 单位 | 不朽者 | ImmortalAiur | CUnit已定义：ImmortalAiur | 技能缺失 ProtossBuild | Probe / ProtossBuild / 65秒 | 65秒 | Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 掠夺者 | Wiki补充ID | 单位 | 掠夺者 | Reaver | 仅文本/引用命中：Reaver | 官方JSON无生产链 |  |  |  | wiki主要部队补充：此处为星灵掠夺者/Reaver，不是人族劫掠者。 |
| 侦测器 | 精确匹配 | 单位 | 侦测器 | Observer | 仅文本/引用命中：Observer | 技能缺失 RoboticsFacilityTrain | RoboticsFacility / RoboticsFacilityTrain / 25晶体矿，75瓦斯，25秒 | 生命40，护盾30，人口1，视野11；25晶体矿，75瓦斯，25秒 |  |  |
| 凤凰 | 精确匹配 | 单位 | 凤凰 | PhoenixAiur | CUnit已定义：PhoenixAiur | 技能缺失 ProtossBuild | Probe / ProtossBuild / 60秒 | 60秒 | Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 风暴战舰 | Wiki补充ID | 单位 | 风暴战舰 | Tempest | 仅文本/引用命中：Tempest | 官方JSON无生产链 |  |  |  | wiki主要部队补充：按风暴战舰ID检查当前Mod。 |
| 光子炮台 | 精确匹配 | 建筑 | 光子炮台 | PhotonCannon | 仅文本/引用命中：PhotonCannon | 技能缺失 GatewayTrain | Gateway / GatewayTrain / 150晶体矿，38秒 | 生命150，护盾150，视野11；150晶体矿，38秒 |  |  |
|  | 官方补充 | 建筑 | 传送门 | Gateway | 仅文本/引用命中：Gateway | 技能缺失 ProtossBuild | Probe / ProtossBuild / 150晶体矿，65秒 | 生命500，护盾500，视野9；150晶体矿，65秒 |  | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 机械研究所 | RoboticsBay | CUnit已定义：RoboticsBay | 技能缺失 ProtossBuild | Probe / ProtossBuild / 150晶体矿，150瓦斯，65秒 | 生命500，护盾500，视野9；150晶体矿，150瓦斯，65秒 | Mods/XM/XMCore.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 折跃机械台 | RoboticsFacilityWarp | CUnit已定义：RoboticsFacilityWarp | 技能缺失 ProtossBuild | Probe / ProtossBuild / 65秒 | 65秒 | Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 光影议会 | TwilightCouncil | CUnit已定义：TwilightCouncil | 技能缺失 ProtossBuild | Probe / ProtossBuild / 150晶体矿，100瓦斯，50秒 | 生命500，护盾500，视野9；150晶体矿，100瓦斯，50秒 | Mods/XM/XMCore.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |

## 优先排查项

| Wiki项 | 匹配 | 分类 | 官方名称 | ID | 当前Mod | 生产链状态 | 生产/建造/变形 | 数值 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 狂热者 | 精确匹配 | 单位 | 狂热者 | Zealot | 仅文本/引用命中：Zealot | 技能缺失 GatewayTrain | Gateway / GatewayTrain / 100晶体矿，38秒 | 生命100，护盾50，人口2，视野9；100晶体矿，38秒 |
| 龙骑士 | 精确匹配 | 单位 | 龙骑士 | Dragoon | CUnit已定义：Dragoon | 技能缺失 GatewayTrain | Gateway / GatewayTrain / 38秒 | 生命100；38秒 |
| 高阶圣堂武士 | 精确匹配 | 单位 | 高阶圣堂武士 | HighTemplar | 仅文本/引用命中：HighTemplar | 技能缺失 GatewayTrain | Gateway / GatewayTrain / 50晶体矿，150瓦斯，55秒 | 生命40，护盾40，人口2，视野10；50晶体矿，150瓦斯，55秒 |
| 执政官 | 精确匹配 | 单位 | 执政官 | Archon | 仅文本/引用命中：Archon | 生产链已命中 | 未知生产者 / ArchonWarp / -175晶体矿，-275瓦斯，16.6667秒 | 生命10，护盾350，人口4，视野9；-175晶体矿，-275瓦斯，16.6667秒 |
| 不朽者 | 精确匹配 | 单位 | 不朽者 | ImmortalAiur | CUnit已定义：ImmortalAiur | 技能缺失 ProtossBuild | Probe / ProtossBuild / 65秒 | 65秒 |
| 掠夺者 | Wiki补充ID | 单位 | 掠夺者 | Reaver | 仅文本/引用命中：Reaver | 官方JSON无生产链 |  |  |
| 侦测器 | 精确匹配 | 单位 | 侦测器 | Observer | 仅文本/引用命中：Observer | 技能缺失 RoboticsFacilityTrain | RoboticsFacility / RoboticsFacilityTrain / 25晶体矿，75瓦斯，25秒 | 生命40，护盾30，人口1，视野11；25晶体矿，75瓦斯，25秒 |
| 凤凰 | 精确匹配 | 单位 | 凤凰 | PhoenixAiur | CUnit已定义：PhoenixAiur | 技能缺失 ProtossBuild | Probe / ProtossBuild / 60秒 | 60秒 |
| 风暴战舰 | Wiki补充ID | 单位 | 风暴战舰 | Tempest | 仅文本/引用命中：Tempest | 官方JSON无生产链 |  |  |
| 光子炮台 | 精确匹配 | 建筑 | 光子炮台 | PhotonCannon | 仅文本/引用命中：PhotonCannon | 技能缺失 GatewayTrain | Gateway / GatewayTrain / 150晶体矿，38秒 | 生命150，护盾150，视野11；150晶体矿，38秒 |
|  | 官方补充 | 建筑 | 传送门 | Gateway | 仅文本/引用命中：Gateway | 技能缺失 ProtossBuild | Probe / ProtossBuild / 150晶体矿，65秒 | 生命500，护盾500，视野9；150晶体矿，65秒 |
|  | 官方补充 | 建筑 | 机械研究所 | RoboticsBay | CUnit已定义：RoboticsBay | 技能缺失 ProtossBuild | Probe / ProtossBuild / 150晶体矿，150瓦斯，65秒 | 生命500，护盾500，视野9；150晶体矿，150瓦斯，65秒 |
|  | 官方补充 | 建筑 | 折跃机械台 | RoboticsFacilityWarp | CUnit已定义：RoboticsFacilityWarp | 技能缺失 ProtossBuild | Probe / ProtossBuild / 65秒 | 65秒 |
|  | 官方补充 | 建筑 | 光影议会 | TwilightCouncil | CUnit已定义：TwilightCouncil | 技能缺失 ProtossBuild | Probe / ProtossBuild / 150晶体矿，100瓦斯，50秒 | 生命500，护盾500，视野9；150晶体矿，100瓦斯，50秒 |

## Wiki未匹配官方JSON

- 无。

## 官方有但Wiki主要部队未列

| 分类 | 官方名称 | ID | 当前Mod | 生产链 | 数值 |
| --- | --- | --- | --- | --- | --- |
| 建筑 | 传送门 | Gateway | 仅文本/引用命中：Gateway | Probe / ProtossBuild / 150晶体矿，65秒 | 生命500，护盾500，视野9；150晶体矿，65秒 |
| 建筑 | 机械研究所 | RoboticsBay | CUnit已定义：RoboticsBay | Probe / ProtossBuild / 150晶体矿，150瓦斯，65秒 | 生命500，护盾500，视野9；150晶体矿，150瓦斯，65秒 |
| 建筑 | 折跃机械台 | RoboticsFacilityWarp | CUnit已定义：RoboticsFacilityWarp | Probe / ProtossBuild / 65秒 | 65秒 |
| 建筑 | 光影议会 | TwilightCouncil | CUnit已定义：TwilightCouncil | Probe / ProtossBuild / 150晶体矿，100瓦斯，50秒 | 生命500，护盾500，视野9；150晶体矿，100瓦斯，50秒 |

