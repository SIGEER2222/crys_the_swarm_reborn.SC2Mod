# 合作指挥官建筑单位逐个对比

- 生成时间：2026/5/29 17:33:14
- Wiki抓取目录：`D:\MyWork\新建文件夹\mom.report.client\artifacts\2026-05-29-starcraft-coop-commanders`
- 官方JSON目录：`D:\MyWork\新建文件夹\mom.report.client\src\MyMod\crys_the_swarm_reborn.SC2Mod\游戏数据\官方合作指挥官\commanders`
- 官方原始文本镜像：`D:\MyWork\新建文件夹\mom.report.client\src\MyMod\crys_the_swarm_reborn.SC2Mod\游戏数据\官方SC2原始文本镜像`
- 当前 active Mod：`D:\MyWork\新建文件夹\mom.report.client\src\MyMod\crys_the_swarm_reborn.SC2Mod\合作指挥官版起义狂潮`
- 目标：先建立逐指挥官建筑/单位对比基线，后续修复时直接从“优先排查项”进入 XML。

## 总览

| 指挥官 | 模块 | Wiki项 | 官方行 | Wiki未匹配官方 | 官方补充未在Wiki | 当前Mod未命中 | 仅文本命中 | 运行闭包命中 | 仅官方合作镜像 | 底层继承候选 | 生产链异常 | 生产链运行闭包 | 生产链底层候选 | 官方面板缺口 | 特殊面板项 | 命令卡露出产物缺CUnit | 隐藏产物缺CUnit | 外来生产链露出 | 单独报告 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 阿巴瑟 / Abathur | XMAbathur.SC2Mod | 14 | 14 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 11 | by-commander/abathur-阿巴瑟-unit-building-compare.md |
| 阿拉纳克 / Alarak | XMAlarak.SC2Mod | 8 | 10 | 0 | 2 | 0 | 0 | 2 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | by-commander/alarak-阿拉纳克-unit-building-compare.md |
| 阿塔尼斯 / Artanis | XMArtanis.SC2Mod | 10 | 12 | 0 | 4 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | by-commander/artanis-阿塔尼斯-unit-building-compare.md |
| 德哈卡 / Dehaka | XMDehaka.SC2Mod | 13 | 25 | 0 | 13 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | 0 | by-commander/dehaka-德哈卡-unit-building-compare.md |
| 菲尼克斯 / Fenix | XMFenix.SC2Mod | 9 | 12 | 0 | 4 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | by-commander/fenix-菲尼克斯-unit-building-compare.md |
| 霍纳与汉 / Horner | XMMira.SC2Mod | 9 | 10 | 0 | 3 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | 0 | by-commander/horner-霍纳与汉-unit-building-compare.md |
| 凯拉克斯 / Karax | XMKarax.SC2Mod | 10 | 13 | 0 | 4 | 0 | 0 | 2 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 0 | 0 | 0 | by-commander/karax-凯拉克斯-unit-building-compare.md |
| 凯瑞甘 / Kerrigan | XMKerrigan.SC2Mod | 11 | 10 | 0 | 2 | 0 | 0 | 3 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 3 | by-commander/kerrigan-凯瑞甘-unit-building-compare.md |
| 雷诺 / Raynor | XMRaynor.SC2Mod | 12 | 16 | 0 | 4 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 6 | by-commander/raynor-雷诺-unit-building-compare.md |
| 蒙斯克 / Mengsk | XMMengsk.SC2Mod | 12 | 27 | 0 | 14 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | by-commander/mengsk-蒙斯克-unit-building-compare.md |
| 诺娃 / Nova | XMNova.SC2Mod | 11 | 16 | 0 | 5 | 0 | 0 | 2 | 0 | 0 | 0 | 5 | 0 | 0 | 0 | 0 | 0 | 0 | by-commander/nova-诺娃-unit-building-compare.md |
| 斯台特曼 / Stetmann | XMStetmann.SC2Mod | 11 | 34 | 0 | 23 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | by-commander/stetmann-斯台特曼-unit-building-compare.md |
| 斯托科夫 / Stukov | XMStukov.SC2Mod | 9 | 15 | 0 | 11 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 0 | 0 | 1 | by-commander/stukov-斯托科夫-unit-building-compare.md |
| 斯旺 / Swann | XMSwann.SC2Mod | 11 | 15 | 0 | 6 | 0 | 0 | 1 | 0 | 0 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | 0 | by-commander/swann-斯旺-unit-building-compare.md |
| 泰凯斯 / Tychus | XMTychus.SC2Mod | 9 | 14 | 0 | 6 | 0 | 0 | 1 | 0 | 0 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | 0 | by-commander/tychus-泰凯斯-unit-building-compare.md |
| 沃拉尊 / Vorazun | XMVorazun.SC2Mod | 9 | 10 | 0 | 3 | 0 | 0 | 4 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | by-commander/vorazun-沃拉尊-unit-building-compare.md |
| 泽拉图 / Zeratul | XMZeratul.SC2Mod | 8 | 12 | 0 | 4 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 0 | 0 | 1 | by-commander/zeratul-泽拉图-unit-building-compare.md |
| 扎加拉 / Zagara | XMZagara.SC2Mod | 10 | 9 | 0 | 1 | 0 | 0 | 4 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 3 | by-commander/zagara-扎加拉-unit-building-compare.md |

## 全局优先排查项

- 无。

## 官方生产面板缺口

- 无。

## 非缺口特殊机制

| 指挥官 | Wiki项 | 分类 | 官方名称 | ID | 生产/建造/变形 | 判定 |
| --- | --- | --- | --- | --- | --- | --- |
| 凯拉克斯 / Karax |  | 建筑 | 太阳锻炉 | SolarForge | 未知生产者 / ProtossBuild / 200晶体矿，200瓦斯，65秒 | 特殊机制：太阳锻炉是凯拉克斯英雄结构/可修复科技建筑；官方合作镜像也未在探机面板露出 ProtossBuild,Build29，不按普通建造按钮补。 |
| 斯托科夫 / Stukov |  | 建筑 | 被感染的补给站 | SISupplyDepot | SISCV / SIAdvancedBuild / 100晶体矿，30秒 | 特殊机制：被感染的补给站在旧线与官方合作镜像里都是保留槽/注释槽，SISCV 面板不开放 SIAdvancedBuild,Build2，不按玩家建造缺口修。 |
| 泽拉图 / Zeratul | 虚空圣堂武士 | 单位 | 狂热者 | ZeratulSummonZealot | ZeratulGateway / ZeratulGatewayTrain / 100晶体矿 | 特殊机制：虚空圣堂武士/召唤狂热者来自官方 ArmyCategory/UserData 抽取项；官方 futurecommanders.xml 的 ZeratulGateway 也未露出 Train18，不按传送门训练按钮补。 |

## 当前 active 命令卡露出产物缺 CUnit

- 无。

## 当前 active 外来生产链露出

| 指挥官 | 产物ID | 命中状态 | 引用技能 | 露出命令 | 生产者 | 生产者归属 | 开局归属 | 按钮门槛 | 引用文件 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 阿巴瑟 / Abathur | HiveMindEmulator | XMFinal运行闭包CUnit：HiveMindEmulator；底层基础镜像CUnit：HiveMindEmulator；官方合作镜像CUnit：HiveMindEmulator | TerranBuild | TerranBuild,Build22 | SCV | SCV:官方无 | SCV:开局无 | UseHiveMindEmulator | 合作指挥官版起义狂潮/Mods/XM/XMAbathur.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| 阿巴瑟 / Abathur | PsiDisruptor | XMFinal运行闭包CUnit：PsiDisruptor；底层基础镜像CUnit：PsiDisruptor；官方合作镜像CUnit：PsiDisruptor | TerranBuild | TerranBuild,Build8 | SCV | SCV:官方无 | SCV:开局无 | UsePsiDisruptor | 合作指挥官版起义狂潮/Mods/XM/XMAbathur.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| 阿巴瑟 / Abathur | SICocoonInfestedBanshee | XMFinal运行闭包CUnit：SICocoonInfestedBanshee；官方合作镜像CUnit：SICocoonInfestedBanshee | SIStarportTrain | SIStarportTrain,Train1 | SIStarport | SIStarport:官方无 | SIStarport:开局无 | HaveAttachedTechLab | 合作指挥官版起义狂潮/Mods/XM/XMAbathur.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| 阿巴瑟 / Abathur | SICocoonInfestedLiberator | XMFinal运行闭包CUnit：SICocoonInfestedLiberator；官方合作镜像CUnit：SICocoonInfestedLiberator | SIStarportTrain | SIStarportTrain,Train2 | SIStarport | SIStarport:官方无 | SIStarport:开局无 |  | 合作指挥官版起义狂潮/Mods/XM/XMAbathur.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| 阿巴瑟 / Abathur | SICocoonInfestedMarine | XMFinal运行闭包CUnit：SICocoonInfestedMarine；官方合作镜像CUnit：SICocoonInfestedMarine | SIBarracksTrain | SIBarracksTrain,Train1 | SIBarracks | SIBarracks:官方无 | SIBarracks:开局无 |  | 合作指挥官版起义狂潮/Mods/XM/XMAbathur.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| 阿巴瑟 / Abathur | SICocoonInfestedOverlord | XMFinal运行闭包CUnit：SICocoonInfestedOverlord；官方合作镜像CUnit：SICocoonInfestedOverlord | SICommandCenterTrain | SICommandCenterTrain,Train3 | SICommandCenter | SICommandCenter:官方无 | SICommandCenter:开局无 |  | 合作指挥官版起义狂潮/Mods/XM/XMAbathur.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| 阿巴瑟 / Abathur | SICocoonInfestedSCV | XMFinal运行闭包CUnit：SICocoonInfestedSCV；官方合作镜像CUnit：SICocoonInfestedSCV | SICommandCenterTrain | SICommandCenterTrain,Train1 | SICivilianStructure, SICommandCenter | SICivilianStructure:官方无, SICommandCenter:官方无 | SICivilianStructure:开局无, SICommandCenter:开局无 |  | 合作指挥官版起义狂潮/Mods/XM/XMAbathur.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| 阿巴瑟 / Abathur | SICocoonQueen | XMFinal运行闭包CUnit：SICocoonQueen；官方合作镜像CUnit：SICocoonQueen | SIStarportTrain | SIStarportTrain,Train3 | SIStarport | SIStarport:官方无 | SIStarport:开局无 | HaveAttachedTechLab | 合作指挥官版起义狂潮/Mods/XM/XMAbathur.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| 阿巴瑟 / Abathur | SIEngineeringBay | XMFinal运行闭包CUnit：SIEngineeringBay；官方合作镜像CUnit：SIEngineeringBay | SIAdvancedBuild | SIAdvancedBuild,Build5 | SISCV | SISCV:官方无 | SISCV:开局无 | HaveSICommandCenter | 合作指挥官版起义狂潮/Mods/XM/XMAbathur.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| 阿巴瑟 / Abathur | SIInfestedBunker | XMFinal运行闭包CUnit：SIInfestedBunker；官方合作镜像CUnit：SIInfestedBunker | SIAdvancedBuild | SIAdvancedBuild,Build15 | SISCV | SISCV:官方无 | SISCV:开局无 | HaveInfestedBarracks | 合作指挥官版起义狂潮/Mods/XM/XMAbathur.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| 阿巴瑟 / Abathur | SIMissileTurret | XMFinal运行闭包CUnit：SIMissileTurret；官方合作镜像CUnit：SIMissileTurret | SIAdvancedBuild | SIAdvancedBuild,Build6 | SISCV | SISCV:官方无 | SISCV:开局无 | HaveSIEngineeringBay | 合作指挥官版起义狂潮/Mods/XM/XMAbathur.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| 凯瑞甘 / Kerrigan | DehakaTrainEggDrone | XMFinal运行闭包CUnit：DehakaTrainEggDrone；官方合作镜像CUnit：DehakaTrainEggDrone | DehakaHatcheryTrainEgg | DehakaHatcheryTrainEgg,Train1 | DehakaHatchery | DehakaHatchery:官方无 | DehakaHatchery:开局无 |  | 合作指挥官版起义狂潮/Mods/XM/XMKerrigan.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| 凯瑞甘 / Kerrigan | RoboticsFacilityWarp | XMFinal运行闭包CUnit：RoboticsFacilityWarp；底层基础镜像CUnit：RoboticsFacilityWarp；官方合作镜像CUnit：RoboticsFacilityWarp | ProtossBuild | ProtossBuild,Build18 | Probe | Probe:官方无 | Probe:开局无 | HaveCyberneticsCoreandArtanisWarpTech | 合作指挥官版起义狂潮/Mods/XM/XMKerrigan.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| 凯瑞甘 / Kerrigan | StargateWarp | XMFinal运行闭包CUnit：StargateWarp；底层基础镜像CUnit：StargateWarp；官方合作镜像CUnit：StargateWarp | ProtossBuild | ProtossBuild,Build19 | Probe | Probe:官方无 | Probe:开局无 | HaveCyberneticsCoreandArtanisWarpTech | 合作指挥官版起义狂潮/Mods/XM/XMKerrigan.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| 雷诺 / Raynor | DehakaTrainEggDrone | XMFinal运行闭包CUnit：DehakaTrainEggDrone；官方合作镜像CUnit：DehakaTrainEggDrone | DehakaHatcheryTrainEgg | DehakaHatcheryTrainEgg,Train1 | DehakaHatchery | DehakaHatchery:官方无 | DehakaHatchery:开局无 |  | 合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| 雷诺 / Raynor | Mohandar | XMFinal运行闭包CUnit：Mohandar；底层基础镜像CUnit：Mohandar；官方合作镜像CUnit：Mohandar | ZeratulTopBarWarpTrain | ZeratulTopBarWarpTrain,Train2 | CoopCasterZeratul | CoopCasterZeratul:官方无 | CoopCasterZeratul:开局无 | HaveZeratulArtifactUpgradeTier0B | 合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/commanders/futurecommanders.xml |
| 雷诺 / Raynor | NovaBoombotBurrowed | XMFinal运行闭包CUnit：NovaBoombotBurrowed；官方合作镜像CUnit：NovaBoombotBurrowed | NovaBoombotBurrow | NovaBoombotBurrow,Execute | NovaBoombot | NovaBoombot:官方无 | NovaBoombot:开局无 |  | 合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| 雷诺 / Raynor | RoboticsFacilityWarp | XMFinal运行闭包CUnit：RoboticsFacilityWarp；底层基础镜像CUnit：RoboticsFacilityWarp；官方合作镜像CUnit：RoboticsFacilityWarp | ProtossBuild | ProtossBuild,Build18 | Probe | Probe:官方无 | Probe:开局无 | HaveCyberneticsCoreandArtanisWarpTech | 合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| 雷诺 / Raynor | StargateWarp | XMFinal运行闭包CUnit：StargateWarp；底层基础镜像CUnit：StargateWarp；官方合作镜像CUnit：StargateWarp | ProtossBuild | ProtossBuild,Build19 | Probe | Probe:官方无 | Probe:开局无 | HaveCyberneticsCoreandArtanisWarpTech | 合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| 雷诺 / Raynor | ZeratulPhotonCannon | XMFinal运行闭包CUnit：ZeratulPhotonCannon；官方合作镜像CUnit：ZeratulPhotonCannon | ZeratulBuild | ZeratulBuild,Build4 | Probe | Probe:官方无 | Probe:开局无 | HaveZeratulCyberneticsCore | 合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/commanders/futurecommanders.xml |
| 斯托科夫 / Stukov | InfestedAbomination | XMFinal运行闭包CUnit：InfestedAbomination；底层基础镜像CUnit：InfestedAbomination；官方合作镜像CUnit：InfestedAbomination | SIMorphtoInfestedAberration | SIMorphtoInfestedAberration,Train1 | SICocoonInfestedAberration | SICocoonInfestedAberration:官方无 | SICocoonInfestedAberration:开局无 |  | 合作指挥官版起义狂潮/Mods/XM/XMStukov.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| 泽拉图 / Zeratul | SOAMothershipv4 | XMFinal运行闭包CUnit：SOAMothershipv4；底层基础镜像CUnit：SOAMothershipv4；官方合作镜像CUnit：SOAMothershipv4 | StargateTrain | StargateTrain,Train14 | Stargate | Stargate:官方无 | Stargate:开局无 | TalDarimMothershipRequirements | 合作指挥官版起义狂潮/Mods/XM/XMZeratul.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| 扎加拉 / Zagara | DarkArchon | XMFinal运行闭包CUnit：DarkArchon；底层基础镜像CUnit：DarkArchon；官方合作镜像CUnit：DarkArchon | GatewayTrain, WarpGateTrain | GatewayTrain,Train9, WarpGateTrain,Train9 | Gateway, WarpGate | Gateway:官方无, WarpGate:官方无 | Gateway:开局无, WarpGate:开局无 | HaveDarkShrine | 合作指挥官版起义狂潮/Mods/XM/XMZagara.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| 扎加拉 / Zagara | SOAMothershipv4 | XMFinal运行闭包CUnit：SOAMothershipv4；底层基础镜像CUnit：SOAMothershipv4；官方合作镜像CUnit：SOAMothershipv4 | StargateTrain | StargateTrain,Train14 | Stargate | Stargate:官方无 | Stargate:开局无 | TalDarimMothershipRequirements | 合作指挥官版起义狂潮/Mods/XM/XMZagara.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| 扎加拉 / Zagara | Supplicant | XMFinal运行闭包CUnit：Supplicant；官方合作镜像CUnit：Supplicant | GatewayTrain | GatewayTrain,Train11 | Gateway | Gateway:官方无 | Gateway:开局无 | Restricted | 合作指挥官版起义狂潮/Mods/XM/XMZagara.SC2Mod/Base.SC2Data/GameData/AbilData.xml |

## 当前 active 隐藏技能产物缺 CUnit

- 无。

## 说明

- `当前模块CUnit`：本指挥官模块直接定义，可信度最高。
- `XM共享模块CUnit`：`XMCore/XMFinal` 定义，通常可被当前 active 线使用。
- `XMFinal运行闭包CUnit`：从 `XMFinal.SC2Mod/DocumentInfo` 递归加载到的当前 active 模块，运行时可解析，但不代表该按钮属于当前指挥官。
- `底层基础镜像CUnit`：新官方镜像的战役/多人基础层存在。当前 active 线是否继承要按地图/Mod依赖和实机确认。
- `官方合作镜像CUnit`：StarCoop 官方合作层存在，但 `合作指挥官版起义狂潮` 不直接读取这个镜像；这类更像待迁移/待补 Catalog 或历史按钮线索。
- `仅文本/引用命中`：XML/Galaxy 里出现过该 token，但没有同 ID `CUnit` 定义，通常要继续查依赖或补 Catalog。
- `Wiki未匹配官方JSON`：wiki主要部队名称没有映射到官方 JSON，优先补别名表或查是否是召唤物/建筑别称。
- `官方补充未在Wiki`：官方 JSON 有但 wiki主要部队未列，不一定是缺失，常见于工人、英雄、基础建筑或展示项。
