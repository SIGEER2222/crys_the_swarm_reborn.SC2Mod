# 阿拉纳克 / Alarak 建筑单位对比

- 当前 active Mod：`D:\MyWork\新建文件夹\mom.report.client\src\MyMod\crys_the_swarm_reborn.SC2Mod\原始mod`
- 指挥官模块：`XMAlarak.SC2Mod`（存在：是）
- Wiki主要部队文件：`wikitext/02-alarak.wiki`
- Wiki主要部队：死徒、杀戮者、浩劫、晋升者、先锋、天罚行者、战争棱镜、光子炮台
- 判定口径：wiki用于中文主要部队名单；官方JSON用于ID、生产链、生命/人口/费用；active Mod只检查`合作指挥官版起义狂潮`的本指挥官模块加`XMCore/XMFinal`。

## 汇总

| Wiki项 | 官方行 | Wiki未匹配官方 | 官方补充未在Wiki | 当前Mod未命中 | 仅文本命中 | 生产链异常 |
| --- | --- | --- | --- | --- | --- | --- |
| 8 | 10 | 0 | 2 | 0 | 3 | 10 |

## 三方对照

| Wiki项 | 匹配 | 分类 | 官方名称 | ID | 当前Mod | 生产链状态 | 生产/建造/变形 | 数值 | 定义文件 | 备注 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 死徒 | 精确匹配 | 单位 | 死徒 | Supplicant | CUnit已定义：Supplicant | 技能缺失 GatewayTrain | Gateway / GatewayTrain / 75晶体矿，28秒 | 生命75，护盾125，人口2，视野9；75晶体矿，28秒 | Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 杀戮者 | 别名匹配 | 单位 | 追猎者 | Stalker | 仅文本/引用命中：Stalker | 技能缺失 GatewayTrain | Gateway / GatewayTrain / 125晶体矿，50瓦斯，38秒 | 生命80，护盾80，人口2，视野10；125晶体矿，50瓦斯，38秒 |  |  |
| 浩劫 | 精确匹配 | 单位 | 浩劫 | Monitor | CUnit已定义：Monitor | 技能缺失 GatewayTrain | Gateway / GatewayTrain / 37秒 | 37秒 | Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 晋升者 | 精确匹配 | 单位 | 晋升者 | HighTemplarTaldarim | CUnit已定义：HighTemplarTaldarim | 技能缺失 GatewayTrain | Gateway / GatewayTrain / 55秒 | 55秒 | Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 先锋 | 别名匹配 | 单位 | 无情先锋 | ImmortalTaldarim | CUnit已定义：ImmortalTaldarim | 技能缺失 ProtossBuild | Probe / ProtossBuild / 65秒 | 65秒 | Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 天罚行者 | 精确匹配 | 单位 | 天罚行者 | ColossusTaldarim | CUnit已定义：ColossusTaldarim | 技能缺失 ProtossBuild | Probe / ProtossBuild / 65秒 | 65秒 | Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 战争棱镜 | 精确匹配 | 单位 | 战争棱镜 | WarpPrismTaldarim | CUnit已定义：WarpPrismTaldarim | 技能缺失 RoboticsFacilityTrain | RoboticsFacility / RoboticsFacilityTrain / 200晶体矿，50秒 | 生命100，护盾100，人口2，视野10；200晶体矿，50秒 | Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 光子炮台 | 精确匹配 | 建筑 | 光子炮台 | PhotonCannon | 仅文本/引用命中：PhotonCannon | 技能缺失 GatewayTrain | Gateway / GatewayTrain / 150晶体矿，38秒 | 生命150，护盾150，视野11；150晶体矿，38秒 |  |  |
|  | 官方补充 | 建筑 | 传送门 | Gateway | 仅文本/引用命中：Gateway | 技能缺失 ProtossBuild | Probe / ProtossBuild / 150晶体矿，65秒 | 生命500，护盾500，视野9；150晶体矿，65秒 |  | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 光影议会 | TwilightCouncil | CUnit已定义：TwilightCouncil | 技能缺失 ProtossBuild | Probe / ProtossBuild / 150晶体矿，100瓦斯，50秒 | 生命500，护盾500，视野9；150晶体矿，100瓦斯，50秒 | Mods/XM/XMCore.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |

## 优先排查项

| Wiki项 | 匹配 | 分类 | 官方名称 | ID | 当前Mod | 生产链状态 | 生产/建造/变形 | 数值 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 死徒 | 精确匹配 | 单位 | 死徒 | Supplicant | CUnit已定义：Supplicant | 技能缺失 GatewayTrain | Gateway / GatewayTrain / 75晶体矿，28秒 | 生命75，护盾125，人口2，视野9；75晶体矿，28秒 |
| 杀戮者 | 别名匹配 | 单位 | 追猎者 | Stalker | 仅文本/引用命中：Stalker | 技能缺失 GatewayTrain | Gateway / GatewayTrain / 125晶体矿，50瓦斯，38秒 | 生命80，护盾80，人口2，视野10；125晶体矿，50瓦斯，38秒 |
| 浩劫 | 精确匹配 | 单位 | 浩劫 | Monitor | CUnit已定义：Monitor | 技能缺失 GatewayTrain | Gateway / GatewayTrain / 37秒 | 37秒 |
| 晋升者 | 精确匹配 | 单位 | 晋升者 | HighTemplarTaldarim | CUnit已定义：HighTemplarTaldarim | 技能缺失 GatewayTrain | Gateway / GatewayTrain / 55秒 | 55秒 |
| 先锋 | 别名匹配 | 单位 | 无情先锋 | ImmortalTaldarim | CUnit已定义：ImmortalTaldarim | 技能缺失 ProtossBuild | Probe / ProtossBuild / 65秒 | 65秒 |
| 天罚行者 | 精确匹配 | 单位 | 天罚行者 | ColossusTaldarim | CUnit已定义：ColossusTaldarim | 技能缺失 ProtossBuild | Probe / ProtossBuild / 65秒 | 65秒 |
| 战争棱镜 | 精确匹配 | 单位 | 战争棱镜 | WarpPrismTaldarim | CUnit已定义：WarpPrismTaldarim | 技能缺失 RoboticsFacilityTrain | RoboticsFacility / RoboticsFacilityTrain / 200晶体矿，50秒 | 生命100，护盾100，人口2，视野10；200晶体矿，50秒 |
| 光子炮台 | 精确匹配 | 建筑 | 光子炮台 | PhotonCannon | 仅文本/引用命中：PhotonCannon | 技能缺失 GatewayTrain | Gateway / GatewayTrain / 150晶体矿，38秒 | 生命150，护盾150，视野11；150晶体矿，38秒 |
|  | 官方补充 | 建筑 | 传送门 | Gateway | 仅文本/引用命中：Gateway | 技能缺失 ProtossBuild | Probe / ProtossBuild / 150晶体矿，65秒 | 生命500，护盾500，视野9；150晶体矿，65秒 |
|  | 官方补充 | 建筑 | 光影议会 | TwilightCouncil | CUnit已定义：TwilightCouncil | 技能缺失 ProtossBuild | Probe / ProtossBuild / 150晶体矿，100瓦斯，50秒 | 生命500，护盾500，视野9；150晶体矿，100瓦斯，50秒 |

## Wiki未匹配官方JSON

- 无。

## 官方有但Wiki主要部队未列

| 分类 | 官方名称 | ID | 当前Mod | 生产链 | 数值 |
| --- | --- | --- | --- | --- | --- |
| 建筑 | 传送门 | Gateway | 仅文本/引用命中：Gateway | Probe / ProtossBuild / 150晶体矿，65秒 | 生命500，护盾500，视野9；150晶体矿，65秒 |
| 建筑 | 光影议会 | TwilightCouncil | CUnit已定义：TwilightCouncil | Probe / ProtossBuild / 150晶体矿，100瓦斯，50秒 | 生命500，护盾500，视野9；150晶体矿，100瓦斯，50秒 |

