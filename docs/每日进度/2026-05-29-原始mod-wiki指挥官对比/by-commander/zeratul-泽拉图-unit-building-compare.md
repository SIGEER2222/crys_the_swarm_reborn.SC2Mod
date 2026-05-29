# 泽拉图 / Zeratul 建筑单位对比

- 当前 active Mod：`D:\MyWork\新建文件夹\mom.report.client\src\MyMod\crys_the_swarm_reborn.SC2Mod\原始mod`
- 指挥官模块：`XMZeratul.SC2Mod`（存在：否）
- Wiki主要部队文件：`wikitext/17-zeratul.wiki`
- Wiki主要部队：萨尔纳加伏击者、萨尔纳加光盾卫士、虚空圣堂武士、萨尔纳加执行者、萨尔纳加观察者、萨尔纳加禁绝者、萨尔纳加虚空阵列船、超维空间炮
- 判定口径：wiki用于中文主要部队名单；官方JSON用于ID、生产链、生命/人口/费用；active Mod只检查`合作指挥官版起义狂潮`的本指挥官模块加`XMCore/XMFinal`。

## 汇总

| Wiki项 | 官方行 | Wiki未匹配官方 | 官方补充未在Wiki | 当前Mod未命中 | 仅文本命中 | 生产链异常 |
| --- | --- | --- | --- | --- | --- | --- |
| 8 | 12 | 0 | 4 | 0 | 3 | 8 |

## 三方对照

| Wiki项 | 匹配 | 分类 | 官方名称 | ID | 当前Mod | 生产链状态 | 生产/建造/变形 | 数值 | 定义文件 | 备注 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 萨尔纳加伏击者 | 精确匹配 | 单位 | 萨尔纳加伏击者 | ZeratulStalker | CUnit已定义：ZeratulStalker | 生产者和技能均未命中：ZeratulGateway / ZeratulGatewayTrain | ZeratulGateway / ZeratulGatewayTrain / 300晶体矿，50瓦斯，42秒 | 生命100，护盾100，人口2，视野10；300晶体矿，50瓦斯，42秒 | Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 萨尔纳加光盾卫士 | 精确匹配 | 单位 | 萨尔纳加光盾卫士 | ZeratulSentry | CUnit已定义：ZeratulSentry | 生产者和技能均未命中：ZeratulGateway / ZeratulGatewayTrain | ZeratulGateway / ZeratulGatewayTrain / 75晶体矿，150瓦斯，37秒 | 生命120，护盾120，人口2，视野10；75晶体矿，150瓦斯，37秒 | Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 虚空圣堂武士 | 别名匹配 | 单位 | 狂热者 | ZeratulSummonZealot | CUnit已定义：ZeratulSummonZealot | 生产者和技能均未命中：ZeratulGateway / ZeratulGatewayTrain | ZeratulGateway / ZeratulGatewayTrain / 100晶体矿 | 生命100，护盾50，视野9；100晶体矿 | Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 萨尔纳加执行者 | 精确匹配 | 单位 | 萨尔纳加执行者 | ZeratulImmortal | CUnit已定义：ZeratulImmortal | 生产链已命中 | ZeratulRoboticsFacility / ZeratulRoboticsFacilityTrain / 750晶体矿，300瓦斯，55秒 | 生命400，护盾200，人口4，视野9；750晶体矿，300瓦斯，55秒 | Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 萨尔纳加观察者 | 精确匹配 | 单位 | 萨尔纳加观察者 | ZeratulObserver | CUnit已定义：ZeratulObserver | 生产链已命中 | ZeratulRoboticsFacility / ZeratulRoboticsFacilityTrain / 25晶体矿，75瓦斯，30秒 | 生命40，护盾20，人口1，视野11；25晶体矿，75瓦斯，30秒 | Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 萨尔纳加禁绝者 | 精确匹配 | 单位 | 萨尔纳加禁绝者 | ZeratulDisruptor | CUnit已定义：ZeratulDisruptor | 生产链已命中 | ZeratulRoboticsFacility / ZeratulRoboticsFacilityTrain / 450晶体矿，450瓦斯，50秒 | 生命200，护盾200，人口3，视野9；450晶体矿，450瓦斯，50秒 | Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 萨尔纳加虚空阵列船 | 精确匹配 | 单位 | 萨尔纳加虚空阵列船 | ZeratulWarpPrism | CUnit已定义：ZeratulWarpPrism | 生产链已命中 | ZeratulRoboticsFacility / ZeratulRoboticsFacilityTrain / 150晶体矿，50秒 | 生命200，护盾200，人口1，视野10；150晶体矿，50秒 | Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 超维空间炮 | 别名匹配 | 建筑 | 光子炮台 | PhotonCannon | 仅文本/引用命中：PhotonCannon | 技能缺失 GatewayTrain | Gateway / GatewayTrain / 150晶体矿，38秒 | 生命150，护盾150，视野11；150晶体矿，38秒 |  |  |
|  | 官方补充 | 单位 | 侦测器 | Observer | 仅文本/引用命中：Observer | 技能缺失 RoboticsFacilityTrain | RoboticsFacility / RoboticsFacilityTrain / 25晶体矿，75瓦斯，25秒 | 生命40，护盾30，人口1，视野11；25晶体矿，75瓦斯，25秒 |  | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 黑暗圣坛 | DarkShrine | CUnit已定义：DarkShrine | 技能缺失 ProtossBuild | Probe / ProtossBuild / 150晶体矿，150瓦斯，100秒 | 生命500，护盾500，视野9；150晶体矿，150瓦斯，100秒 | Mods/XM/XMCore.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 传送门 | Gateway | 仅文本/引用命中：Gateway | 技能缺失 ProtossBuild | Probe / ProtossBuild / 150晶体矿，65秒 | 生命500，护盾500，视野9；150晶体矿，65秒 |  | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 折跃机械台 | ZeratulRoboticsFacility | CUnit已定义：ZeratulRoboticsFacility | 技能缺失 ZeratulBuild | Probe / ZeratulBuild / 200晶体矿，100瓦斯，65秒 | 生命450，护盾450，视野9；200晶体矿，100瓦斯，65秒 | Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |

## 优先排查项

| Wiki项 | 匹配 | 分类 | 官方名称 | ID | 当前Mod | 生产链状态 | 生产/建造/变形 | 数值 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 萨尔纳加伏击者 | 精确匹配 | 单位 | 萨尔纳加伏击者 | ZeratulStalker | CUnit已定义：ZeratulStalker | 生产者和技能均未命中：ZeratulGateway / ZeratulGatewayTrain | ZeratulGateway / ZeratulGatewayTrain / 300晶体矿，50瓦斯，42秒 | 生命100，护盾100，人口2，视野10；300晶体矿，50瓦斯，42秒 |
| 萨尔纳加光盾卫士 | 精确匹配 | 单位 | 萨尔纳加光盾卫士 | ZeratulSentry | CUnit已定义：ZeratulSentry | 生产者和技能均未命中：ZeratulGateway / ZeratulGatewayTrain | ZeratulGateway / ZeratulGatewayTrain / 75晶体矿，150瓦斯，37秒 | 生命120，护盾120，人口2，视野10；75晶体矿，150瓦斯，37秒 |
| 虚空圣堂武士 | 别名匹配 | 单位 | 狂热者 | ZeratulSummonZealot | CUnit已定义：ZeratulSummonZealot | 生产者和技能均未命中：ZeratulGateway / ZeratulGatewayTrain | ZeratulGateway / ZeratulGatewayTrain / 100晶体矿 | 生命100，护盾50，视野9；100晶体矿 |
| 超维空间炮 | 别名匹配 | 建筑 | 光子炮台 | PhotonCannon | 仅文本/引用命中：PhotonCannon | 技能缺失 GatewayTrain | Gateway / GatewayTrain / 150晶体矿，38秒 | 生命150，护盾150，视野11；150晶体矿，38秒 |
|  | 官方补充 | 单位 | 侦测器 | Observer | 仅文本/引用命中：Observer | 技能缺失 RoboticsFacilityTrain | RoboticsFacility / RoboticsFacilityTrain / 25晶体矿，75瓦斯，25秒 | 生命40，护盾30，人口1，视野11；25晶体矿，75瓦斯，25秒 |
|  | 官方补充 | 建筑 | 黑暗圣坛 | DarkShrine | CUnit已定义：DarkShrine | 技能缺失 ProtossBuild | Probe / ProtossBuild / 150晶体矿，150瓦斯，100秒 | 生命500，护盾500，视野9；150晶体矿，150瓦斯，100秒 |
|  | 官方补充 | 建筑 | 传送门 | Gateway | 仅文本/引用命中：Gateway | 技能缺失 ProtossBuild | Probe / ProtossBuild / 150晶体矿，65秒 | 生命500，护盾500，视野9；150晶体矿，65秒 |
|  | 官方补充 | 建筑 | 折跃机械台 | ZeratulRoboticsFacility | CUnit已定义：ZeratulRoboticsFacility | 技能缺失 ZeratulBuild | Probe / ZeratulBuild / 200晶体矿，100瓦斯，65秒 | 生命450，护盾450，视野9；200晶体矿，100瓦斯，65秒 |

## Wiki未匹配官方JSON

- 无。

## 官方有但Wiki主要部队未列

| 分类 | 官方名称 | ID | 当前Mod | 生产链 | 数值 |
| --- | --- | --- | --- | --- | --- |
| 单位 | 侦测器 | Observer | 仅文本/引用命中：Observer | RoboticsFacility / RoboticsFacilityTrain / 25晶体矿，75瓦斯，25秒 | 生命40，护盾30，人口1，视野11；25晶体矿，75瓦斯，25秒 |
| 建筑 | 黑暗圣坛 | DarkShrine | CUnit已定义：DarkShrine | Probe / ProtossBuild / 150晶体矿，150瓦斯，100秒 | 生命500，护盾500，视野9；150晶体矿，150瓦斯，100秒 |
| 建筑 | 传送门 | Gateway | 仅文本/引用命中：Gateway | Probe / ProtossBuild / 150晶体矿，65秒 | 生命500，护盾500，视野9；150晶体矿，65秒 |
| 建筑 | 折跃机械台 | ZeratulRoboticsFacility | CUnit已定义：ZeratulRoboticsFacility | Probe / ZeratulBuild / 200晶体矿，100瓦斯，65秒 | 生命450，护盾450，视野9；200晶体矿，100瓦斯，65秒 |

