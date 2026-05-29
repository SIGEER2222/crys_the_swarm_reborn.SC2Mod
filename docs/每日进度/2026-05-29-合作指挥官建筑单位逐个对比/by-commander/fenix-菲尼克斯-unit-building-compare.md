# 菲尼克斯 / Fenix 建筑单位对比

- 当前 active Mod：`D:\MyWork\新建文件夹\mom.report.client\src\MyMod\crys_the_swarm_reborn.SC2Mod\合作指挥官版起义狂潮`
- 指挥官模块：`XMFenix.SC2Mod`（存在：是）
- Wiki主要部队文件：`wikitext/05-fenix.wiki`
- Wiki主要部队：军团士兵、使徒、保护者、不朽者、巨像、侦测器、干扰者、侦察机、航母
- 判定口径：wiki用于中文主要部队名单；官方JSON用于ID、生产链、生命/人口/费用；active Mod只检查`合作指挥官版起义狂潮`的本指挥官模块加`XMCore/XMFinal`。

## 汇总

| Wiki项 | 官方行 | Wiki未匹配官方 | 官方补充未在Wiki | 当前Mod未命中 | 仅文本命中 | 生产链异常 |
| --- | --- | --- | --- | --- | --- | --- |
| 9 | 12 | 0 | 4 | 0 | 0 | 0 |

## 三方对照

| Wiki项 | 匹配 | 分类 | 官方名称 | ID | 当前Mod | 生产链状态 | 生产/建造/变形 | 数值 | 定义文件 | 备注 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 军团士兵 | 别名匹配 | 单位 | 哨兵 | ZealotPurifier | CUnit已定义：ZealotPurifier | 生产链已命中 | Gateway / GatewayTrain / 38秒 | 38秒 | Mods/XM/XMFenix.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 使徒 | 精确匹配 | 单位 | 使徒 | Adept | CUnit已定义：Adept | 生产链已命中 | Gateway / GatewayTrain / 125晶体矿，25瓦斯，42秒 | 生命70，护盾70，人口2，视野9；125晶体矿，25瓦斯，42秒 | Mods/XM/XMFenix.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 保护者 | 精确匹配 | 单位 | 保护者 | SentryFenix | CUnit已定义：SentryFenix | 生产链已命中 | Gateway / GatewayTrain / 50晶体矿，100瓦斯，37秒 | 生命40，护盾40，人口2，视野10；50晶体矿，100瓦斯，37秒 | Mods/XM/XMFenix.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 不朽者 | 精确匹配 | 单位 | 不朽者 | Immortal | CUnit已定义：Immortal | 生产链已命中 | RoboticsFacility / RoboticsFacilityTrain / 250晶体矿，100瓦斯，55秒 | 生命200，护盾100，人口4，视野9；250晶体矿，100瓦斯，55秒 | Mods/XM/XMFenix.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 巨像 | 精确匹配 | 单位 | 巨像 | ColossusPurifier | CUnit已定义：ColossusPurifier | 生产链已命中 | Probe / ProtossBuild / 65秒 | 65秒 | Mods/XM/XMFenix.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 侦测器 | 精确匹配 | 单位 | 侦测器 | Observer | CUnit已定义：Observer | 生产链已命中 | RoboticsFacility / RoboticsFacilityTrain / 25晶体矿，75瓦斯，25秒 | 生命40，护盾30，人口1，视野11；25晶体矿，75瓦斯，25秒 | Mods/XM/XMFenix.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 干扰者 | Wiki补充ID | 单位 | 干扰者 | Disruptor | CUnit已定义：Disruptor | 官方JSON无生产链 |  |  | Mods/XM/XMFenix.SC2Mod/Base.SC2Data/GameData/UnitData.xml | wiki主要部队补充：按干扰者ID检查当前Mod。 |
| 侦察机 | 疑似别名 | 单位 | 折跃侦察机 | Scout | CUnit已定义：Scout | 生产链已命中 | Probe / ProtossBuild / 250晶体矿，75瓦斯，60秒 | 生命150，护盾100；250晶体矿，75瓦斯，60秒 | Mods/XM/XMFenix.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 航母 | 精确匹配 | 单位 | 航母 | Carrier | CUnit已定义：Carrier | 生产链已命中 | Stargate / StargateTrain / 350晶体矿，250瓦斯，90秒 | 生命300，护盾150，人口6，视野12；350晶体矿，250瓦斯，90秒 | Mods/XM/XMFenix.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
|  | 官方补充 | 建筑 | 传送门 | Gateway | CUnit已定义：Gateway | 生产链已命中 | Probe / ProtossBuild / 150晶体矿，65秒 | 生命500，护盾500，视野9；150晶体矿，65秒 | Mods/XM/XMFenix.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 光子炮台 | PhotonCannon | CUnit已定义：PhotonCannon | 生产链已命中 | Gateway / GatewayTrain / 150晶体矿，38秒 | 生命150，护盾150，视野11；150晶体矿，38秒 | Mods/XM/XMFenix.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 机械研究所 | RoboticsBay | CUnit已定义：RoboticsBay | 生产链已命中 | Probe / ProtossBuild / 150晶体矿，150瓦斯，65秒 | 生命500，护盾500，视野9；150晶体矿，150瓦斯，65秒 | Mods/XM/XMFenix.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>Mods/XM/XMCore.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 光影议会 | TwilightCouncil | CUnit已定义：TwilightCouncil | 生产链已命中 | Probe / ProtossBuild / 150晶体矿，100瓦斯，50秒 | 生命500，护盾500，视野9；150晶体矿，100瓦斯，50秒 | Mods/XM/XMFenix.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>Mods/XM/XMCore.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |

## 优先排查项

- 无。

## Wiki未匹配官方JSON

- 无。

## 官方有但Wiki主要部队未列

| 分类 | 官方名称 | ID | 当前Mod | 生产链 | 数值 |
| --- | --- | --- | --- | --- | --- |
| 建筑 | 传送门 | Gateway | CUnit已定义：Gateway | Probe / ProtossBuild / 150晶体矿，65秒 | 生命500，护盾500，视野9；150晶体矿，65秒 |
| 建筑 | 光子炮台 | PhotonCannon | CUnit已定义：PhotonCannon | Gateway / GatewayTrain / 150晶体矿，38秒 | 生命150，护盾150，视野11；150晶体矿，38秒 |
| 建筑 | 机械研究所 | RoboticsBay | CUnit已定义：RoboticsBay | Probe / ProtossBuild / 150晶体矿，150瓦斯，65秒 | 生命500，护盾500，视野9；150晶体矿，150瓦斯，65秒 |
| 建筑 | 光影议会 | TwilightCouncil | CUnit已定义：TwilightCouncil | Probe / ProtossBuild / 150晶体矿，100瓦斯，50秒 | 生命500，护盾500，视野9；150晶体矿，100瓦斯，50秒 |

