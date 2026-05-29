# 凯拉克斯 / Karax 建筑单位对比

- 当前 active Mod：`D:\MyWork\新建文件夹\mom.report.client\src\MyMod\crys_the_swarm_reborn.SC2Mod\合作指挥官版起义狂潮`
- 指挥官模块：`XMKarax.SC2Mod`（存在：是）
- 旧线初始化开局单位：nexus、probe、pylon
- Wiki主要部队文件：`wikitext/07-karax.wiki`
- Wiki主要部队：警戒者、激励者、不朽者、巨像、侦测器、幻影战机、航母、光子炮台、护盾充能器、凯达琳巨石
- 判定口径：wiki用于中文主要部队名单；官方JSON用于ID、生产链、生命/人口/费用；active 侧先看本指挥官模块和 `XMCore/XMFinal`，再看 `XMFinal.SC2Mod/DocumentInfo` 实际运行闭包，最后只把官方镜像作为事实参考。

## 汇总

| Wiki项 | 官方行 | Wiki未匹配官方 | 官方补充未在Wiki | 当前Mod未命中 | 仅文本命中 | 运行闭包命中 | 仅官方合作镜像 | 底层继承候选 | 生产链异常 | 生产链运行闭包 | 生产链底层候选 | 官方面板缺口 | 特殊面板项 | 命令卡露出产物缺CUnit | 外来生产链露出 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 10 | 13 | 0 | 4 | 0 | 0 | 2 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 0 | 0 |

## 三方对照

| Wiki项 | 匹配 | 分类 | 官方名称 | ID | 当前Mod | 生产链状态 | 当前面板 | 生产/建造/变形 | 数值 | 定义文件 | 备注 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 警戒者 | 别名匹配 | 单位 | 哨兵 | ZealotPurifier | 当前模块CUnit：ZealotPurifier；XMFinal运行闭包CUnit：ZealotPurifier；底层基础镜像CUnit：ZealotPurifier；官方合作镜像CUnit：ZealotPurifier | 生产链已命中 | 当前面板已露出同命令，产物ID需别名核对：WarpGateTrain,Train12 ->；官方期望 zealotpurifier | WarpGate / WarpGateTrain |  | 合作指挥官版起义狂潮/Mods/XM/XMKarax.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZeratul.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZagara.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 激励者 | 精确匹配 | 单位 | 激励者 | SentryPurifier | XMFinal运行闭包CUnit：SentryPurifier；底层基础镜像CUnit：SentryPurifier；官方合作镜像CUnit：SentryPurifier | 生产链已命中 | 当前面板已露出：GatewayTrain,Train6 -> Sentry | Gateway / GatewayTrain / 32秒 | 32秒 | 合作指挥官版起义狂潮/Mods/XM/XMFenix.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMAbathurReborn.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMAbathur.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml |  |
| 不朽者 | 精确匹配 | 单位 | 不朽者 | ImmortalAiur | 当前模块CUnit：ImmortalAiur；XMFinal运行闭包CUnit：ImmortalAiur；底层基础镜像CUnit：ImmortalAiur；官方合作镜像CUnit：ImmortalAiur | 生产链已命中 | 当前面板已露出：ProtossBuild,Build14 -> RoboticsFacility | Probe / ProtossBuild / 65秒 | 65秒 | 合作指挥官版起义狂潮/Mods/XM/XMKarax.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZeratul.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZagara.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 巨像 | 精确匹配 | 单位 | 巨像 | Colossus | 当前模块CUnit：Colossus；XMFinal运行闭包CUnit：Colossus；底层基础镜像CUnit：Colossus；官方合作镜像CUnit：Colossus | 生产链已命中 | 当前面板已露出：RoboticsFacilityTrain,Train3 -> Colossus | RoboticsFacility / RoboticsFacilityTrain / 300晶体矿，200瓦斯，75秒 | 生命250，护盾100，人口6，视野10；300晶体矿，200瓦斯，75秒 | 合作指挥官版起义狂潮/Mods/XM/XMKarax.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZeratul.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZagara.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 侦测器 | 精确匹配 | 单位 | 侦测器 | Observer | 当前模块CUnit：Observer；XMFinal运行闭包CUnit：Observer；底层基础镜像CUnit：Observer；官方合作镜像CUnit：Observer | 生产链已命中 | 当前面板已露出：RoboticsFacilityTrain,Train2 -> Observer | RoboticsFacility / RoboticsFacilityTrain / 25晶体矿，75瓦斯，25秒 | 生命40，护盾30，人口1，视野11；25晶体矿，75瓦斯，25秒 | 合作指挥官版起义狂潮/Mods/XM/XMKarax.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZeratul.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZagara.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 幻影战机 | 别名匹配 | 单位 | 折跃侦察机 | Scout | 当前模块CUnit：Scout；XMFinal运行闭包CUnit：Scout；底层基础镜像CUnit：Scout；官方合作镜像CUnit：Scout | 生产链已命中 | 当前面板已露出：ProtossBuild,Build10 -> Stargate | Probe / ProtossBuild / 250晶体矿，75瓦斯，60秒 | 生命150，护盾100；250晶体矿，75瓦斯，60秒 | 合作指挥官版起义狂潮/Mods/XM/XMKarax.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZeratul.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZagara.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 航母 | 精确匹配 | 单位 | 航母 | Carrier | 当前模块CUnit：Carrier；XMFinal运行闭包CUnit：Carrier；底层基础镜像CUnit：Carrier；官方合作镜像CUnit：Carrier | 生产链已命中 | 当前面板已露出：StargateTrain,Train3 -> Carrier | Stargate / StargateTrain / 350晶体矿，250瓦斯，90秒 | 生命300，护盾150，人口6，视野12；350晶体矿，250瓦斯，90秒 | 合作指挥官版起义狂潮/Mods/XM/XMKarax.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZeratul.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZagara.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 光子炮台 | 精确匹配 | 建筑 | 光子炮台 | PhotonCannon | 当前模块CUnit：PhotonCannon；XMFinal运行闭包CUnit：PhotonCannon；底层基础镜像CUnit：PhotonCannon；官方合作镜像CUnit：PhotonCannon | 生产链已命中 | 当前面板已露出：ProtossBuild,Build8 -> PhotonCannon | Probe / ProtossBuild / 150晶体矿，40秒 | 生命150，护盾150，视野11；150晶体矿，40秒 | 合作指挥官版起义狂潮/Mods/XM/XMKarax.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZeratul.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZagara.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 护盾充能器 | 精确匹配 | 建筑 | 护盾充能器 | ShieldBattery | 当前模块CUnit：ShieldBattery；XMFinal运行闭包CUnit：ShieldBattery；底层基础镜像CUnit：ShieldBattery；官方合作镜像CUnit：ShieldBattery | 生产链已命中 | 当前面板已露出：ProtossBuild,Build16 -> ShieldBattery | Probe / ProtossBuild / 100晶体矿，40秒 | 生命200，护盾200，视野9；100晶体矿，40秒 | 合作指挥官版起义狂潮/Mods/XM/XMKarax.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZeratul.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMVorazun.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 凯达琳巨石 | Wiki补充ID | 建筑 | 凯达琳巨石 | KhaydarinMonolith | 当前模块CUnit：KhaydarinMonolith, Monolith；XMFinal运行闭包CUnit：KhaydarinMonolith, Monolith；底层基础镜像CUnit：KhaydarinMonolith, Monolith；官方合作镜像CUnit：KhaydarinMonolith, Monolith | 官方JSON无生产链 | 官方JSON无生产链 |  |  | 合作指挥官版起义狂潮/Mods/XM/XMKarax.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZeratul.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZagara.SC2Mod/Base.SC2Data/GameData/UnitData.xml | wiki主要部队补充：按凯达琳巨石ID检查当前Mod。 |
|  | 官方补充 | 单位 | 侦察机 | PhoenixPurifier | XMFinal运行闭包CUnit：PhoenixPurifier；底层基础镜像CUnit：PhoenixPurifier；官方合作镜像CUnit：PhoenixPurifier | 生产链已命中 | 当前面板已露出：ProtossBuild,Build6 -> FleetBeacon | Probe / ProtossBuild / 60秒 | 60秒 | 合作指挥官版起义狂潮/Mods/XM/XMFenix.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMAbathurReborn.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMAbathur.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 传送门 | Gateway | 当前模块CUnit：Gateway；XMFinal运行闭包CUnit：Gateway；底层基础镜像CUnit：Gateway；官方合作镜像CUnit：Gateway | 生产链已命中 | 当前面板已露出：ProtossBuild,Build4 -> Gateway | Probe / ProtossBuild / 150晶体矿，65秒 | 生命500，护盾500，视野9；150晶体矿，65秒 | 合作指挥官版起义狂潮/Mods/XM/XMKarax.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZeratul.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZagara.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 太阳锻炉 | SolarForge | 当前模块CUnit：SolarForge；XMFinal运行闭包CUnit：SolarForge；官方合作镜像CUnit：SolarForge | 生产链已命中 | 特殊机制：太阳锻炉是凯拉克斯英雄结构/可修复科技建筑；官方合作镜像也未在探机面板露出 ProtossBuild,Build29，不按普通建造按钮补。 | 未知生产者 / ProtossBuild / 200晶体矿，200瓦斯，65秒 | 生命500，护盾500，视野9；200晶体矿，200瓦斯，65秒 | 合作指挥官版起义狂潮/Mods/XM/XMKarax.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZeratul.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZagara.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 光影议会 | TwilightCouncil | XM共享模块CUnit：TwilightCouncil；XMFinal运行闭包CUnit：TwilightCouncil；底层基础镜像CUnit：TwilightCouncil；官方合作镜像CUnit：TwilightCouncil | 生产链已命中 | 当前面板已露出：ProtossBuild,Build7 -> TwilightCouncil | Probe / ProtossBuild / 150晶体矿，100瓦斯，50秒 | 生命500，护盾500，视野9；150晶体矿，100瓦斯，50秒 | 合作指挥官版起义狂潮/Mods/XM/XMCore.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMFenix.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMArtanis.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMAlarak.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |

## 优先排查项

- 无。

## 官方生产面板缺口

说明：按官方 JSON 的生产链，映射到当前指挥官别名后，再检查当前指挥官模块里是否存在同一 `AbilCmd` 的单位命令卡按钮。`当前技能有槽但面板未露出` 是斯旺工厂这类问题的专门口径。

- 无。

## 非缺口特殊机制

说明：这些项来自官方 JSON/ArmyCategory/Catalog，但官方自身也不是普通玩家命令卡入口；保留说明，避免后续继续误补按钮。

| Wiki项 | 分类 | 官方名称 | ID | 生产/建造/变形 | 判定 |
| --- | --- | --- | --- | --- | --- |
|  | 建筑 | 太阳锻炉 | SolarForge | 未知生产者 / ProtossBuild / 200晶体矿，200瓦斯，65秒 | 特殊机制：太阳锻炉是凯拉克斯英雄结构/可修复科技建筑；官方合作镜像也未在探机面板露出 ProtossBuild,Build29，不按普通建造按钮补。 |

## Wiki未匹配官方JSON

- 无。

## 官方有但Wiki主要部队未列

| 分类 | 官方名称 | ID | 当前Mod | 生产链 | 数值 |
| --- | --- | --- | --- | --- | --- |
| 单位 | 侦察机 | PhoenixPurifier | XMFinal运行闭包CUnit：PhoenixPurifier；底层基础镜像CUnit：PhoenixPurifier；官方合作镜像CUnit：PhoenixPurifier | Probe / ProtossBuild / 60秒 | 60秒 |
| 建筑 | 传送门 | Gateway | 当前模块CUnit：Gateway；XMFinal运行闭包CUnit：Gateway；底层基础镜像CUnit：Gateway；官方合作镜像CUnit：Gateway | Probe / ProtossBuild / 150晶体矿，65秒 | 生命500，护盾500，视野9；150晶体矿，65秒 |
| 建筑 | 太阳锻炉 | SolarForge | 当前模块CUnit：SolarForge；XMFinal运行闭包CUnit：SolarForge；官方合作镜像CUnit：SolarForge | 未知生产者 / ProtossBuild / 200晶体矿，200瓦斯，65秒 | 生命500，护盾500，视野9；200晶体矿，200瓦斯，65秒 |
| 建筑 | 光影议会 | TwilightCouncil | XM共享模块CUnit：TwilightCouncil；XMFinal运行闭包CUnit：TwilightCouncil；底层基础镜像CUnit：TwilightCouncil；官方合作镜像CUnit：TwilightCouncil | Probe / ProtossBuild / 150晶体矿，100瓦斯，50秒 | 生命500，护盾500，视野9；150晶体矿，100瓦斯，50秒 |

## 当前 active 命令卡露出产物缺 CUnit

说明：只扫描当前指挥官模块里已挂到单位命令卡 `AbilCmd="技能,命令"` 的 `CAbilTrain/CAbilWarpTrain/CAbilBuild/CAbilMorph` 产物。产物在当前模块、XM共享模块、XMFinal运行闭包和底层基础镜像都没有 `CUnit` 时列在这里；这类才是当前 Mod 玩家按钮链路的直接风险。XML 注释已在扫描前剔除。

- 无。

## 当前 active 外来生产链露出

说明：这些按钮的产物能在 XMFinal 运行闭包或官方合作镜像中解析，但生产者不属于该指挥官官方体系。它们不是“缺 CUnit”，更像跨指挥官命令卡污染或共享基础单位需要加选择门槛。

- 无。

## 当前 active 隐藏技能产物缺 CUnit

说明：这些产物在当前模块的技能 `InfoArray` 中存在，但没有发现对应命令卡 `AbilCmd="技能,命令"`。它们通常是旧官方/编辑器残留或未开放设计，默认不按玩家可点建筑按钮修。

- 无。

