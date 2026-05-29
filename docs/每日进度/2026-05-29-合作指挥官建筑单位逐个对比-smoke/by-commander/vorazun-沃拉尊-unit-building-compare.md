# 沃拉尊 / Vorazun 建筑单位对比

- 当前 active Mod：`D:\MyWork\新建文件夹\mom.report.client\src\MyMod\crys_the_swarm_reborn.SC2Mod\合作指挥官版起义狂潮`
- 指挥官模块：`XMVorazun.SC2Mod`（存在：是）
- Wiki主要部队文件：`wikitext/16-vorazun.wiki`
- Wiki主要部队：百夫长、追猎者、黑暗圣堂武士、黑暗执政官、海盗船、虚空辉光舰、先知、光子炮台、黑暗水晶塔
- 判定口径：wiki用于中文主要部队名单；官方JSON用于ID、生产链、生命/人口/费用；active 侧优先看本指挥官模块和 `XMCore/XMFinal`，再标注新官方镜像中的 StarCoop/底层基础 Catalog 是否存在。

## 汇总

| Wiki项 | 官方行 | Wiki未匹配官方 | 官方补充未在Wiki | 当前Mod未命中 | 仅文本命中 | 仅官方合作镜像 | 底层继承候选 | 生产链异常 | 生产链底层候选 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 9 | 10 | 0 | 3 | 0 | 0 | 0 | 4 | 0 | 0 |

## 三方对照

| Wiki项 | 匹配 | 分类 | 官方名称 | ID | 当前Mod | 生产链状态 | 生产/建造/变形 | 数值 | 定义文件 | 备注 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 百夫长 | 精确匹配 | 单位 | 百夫长 | ZealotShakuras | 底层基础镜像CUnit：ZealotShakuras；官方合作镜像CUnit：ZealotShakuras | 生产链已命中 | Gateway / GatewayTrain / 28秒 | 28秒 | 游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 追猎者 | 精确匹配 | 单位 | 追猎者 | Stalker | 底层基础镜像CUnit：Stalker；官方合作镜像CUnit：Stalker | 生产链已命中 | Gateway / GatewayTrain / 125晶体矿，50瓦斯，38秒 | 生命80，护盾80，人口2，视野10；125晶体矿，50瓦斯，38秒 | 游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/swarmmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/swarm.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 黑暗圣堂武士 | 精确匹配 | 单位 | 黑暗圣堂武士 | DarkTemplarShakuras | 当前模块CUnit：DarkTemplarShakuras；底层基础镜像CUnit：DarkTemplarShakuras；官方合作镜像CUnit：DarkTemplarShakuras | 生产链已命中 | Gateway / GatewayTrain / 75瓦斯，55秒 | 75瓦斯，55秒 | 合作指挥官版起义狂潮/Mods/XM/XMVorazun.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 黑暗执政官 | Wiki补充ID | 单位 | 黑暗执政官 | DarkArchon | 当前模块CUnit：DarkArchon；底层基础镜像CUnit：DarkArchon；官方合作镜像CUnit：DarkArchon | 官方JSON无生产链 |  |  | 合作指挥官版起义狂潮/Mods/XM/XMVorazun.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml | wiki主要部队补充：按黑暗执政官ID检查当前Mod。 |
| 海盗船 | 精确匹配 | 单位 | 海盗船 | CorsairMP | 当前模块CUnit：CorsairMP；底层基础镜像CUnit：CorsairMP；官方合作镜像CUnit：CorsairMP | 生产链已命中 | Probe / ProtossBuild / 150晶体矿，100瓦斯，60秒 | 生命120，护盾60，人口2，视野9；150晶体矿，100瓦斯，60秒 | 合作指挥官版起义狂潮/Mods/XM/XMVorazun.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/void.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 虚空辉光舰 | 精确匹配 | 单位 | 虚空辉光舰 | VoidRay | 底层基础镜像CUnit：VoidRay；官方合作镜像CUnit：VoidRay | 生产链已命中 | Stargate / StargateTrain / 250晶体矿，150瓦斯，60.2秒 | 生命150，护盾100，人口4，视野10；250晶体矿，150瓦斯，60.2秒 | 游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/void.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/swarmmulti.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 先知 | 精确匹配 | 单位 | 先知 | Oracle | 底层基础镜像CUnit：Oracle；官方合作镜像CUnit：Oracle | 生产链已命中 | Stargate / StargateTrain / 100晶体矿，75瓦斯，30秒 | 生命100，护盾60，人口3，视野10；100晶体矿，75瓦斯，30秒 | 游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/void.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/swarmmulti.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 光子炮台 | 精确匹配 | 建筑 | 光子炮台 | PhotonCannon | 当前模块CUnit：PhotonCannon；底层基础镜像CUnit：PhotonCannon；官方合作镜像CUnit：PhotonCannon | 生产链已命中 | Gateway / GatewayTrain / 150晶体矿，28秒 | 生命150，护盾150，视野11；150晶体矿，28秒 | 合作指挥官版起义狂潮/Mods/XM/XMVorazun.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/swarmmulti.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 黑暗水晶塔 | Wiki补充ID | 建筑 | 黑暗水晶塔 | DarkPylon | 当前模块CUnit：DarkPylon；官方合作镜像CUnit：DarkPylon | 官方JSON无生产链 |  |  | 合作指挥官版起义狂潮/Mods/XM/XMVorazun.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml | wiki主要部队补充：按黑暗水晶塔ID检查当前Mod。 |
|  | 官方补充 | 单位 | 狂热者 | Zealot | 当前模块CUnit：Zealot；底层基础镜像CUnit：Zealot；官方合作镜像CUnit：Zealot | 生产链已命中 | Gateway / GatewayTrain / 100晶体矿，38秒 | 生命100，护盾50，人口2，视野9；100晶体矿，38秒 | 合作指挥官版起义狂潮/Mods/XM/XMVorazun.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/swarmmulti.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 传送门 | Gateway | 当前模块CUnit：Gateway；底层基础镜像CUnit：Gateway；官方合作镜像CUnit：Gateway | 生产链已命中 | Probe / ProtossBuild / 150晶体矿，65秒 | 生命500，护盾500，视野9；150晶体矿，65秒 | 合作指挥官版起义狂潮/Mods/XM/XMVorazun.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/void.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 光影议会 | TwilightCouncil | XM共享模块CUnit：TwilightCouncil；底层基础镜像CUnit：TwilightCouncil；官方合作镜像CUnit：TwilightCouncil | 生产链已命中 | Probe / ProtossBuild / 150晶体矿，100瓦斯，50秒 | 生命500，护盾500，视野9；150晶体矿，100瓦斯，50秒 | 合作指挥官版起义狂潮/Mods/XM/XMCore.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/void.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/void.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |

## 优先排查项

- 无。

## Wiki未匹配官方JSON

- 无。

## 官方有但Wiki主要部队未列

| 分类 | 官方名称 | ID | 当前Mod | 生产链 | 数值 |
| --- | --- | --- | --- | --- | --- |
| 单位 | 狂热者 | Zealot | 当前模块CUnit：Zealot；底层基础镜像CUnit：Zealot；官方合作镜像CUnit：Zealot | Gateway / GatewayTrain / 100晶体矿，38秒 | 生命100，护盾50，人口2，视野9；100晶体矿，38秒 |
| 建筑 | 传送门 | Gateway | 当前模块CUnit：Gateway；底层基础镜像CUnit：Gateway；官方合作镜像CUnit：Gateway | Probe / ProtossBuild / 150晶体矿，65秒 | 生命500，护盾500，视野9；150晶体矿，65秒 |
| 建筑 | 光影议会 | TwilightCouncil | XM共享模块CUnit：TwilightCouncil；底层基础镜像CUnit：TwilightCouncil；官方合作镜像CUnit：TwilightCouncil | Probe / ProtossBuild / 150晶体矿，100瓦斯，50秒 | 生命500，护盾500，视野9；150晶体矿，100瓦斯，50秒 |

