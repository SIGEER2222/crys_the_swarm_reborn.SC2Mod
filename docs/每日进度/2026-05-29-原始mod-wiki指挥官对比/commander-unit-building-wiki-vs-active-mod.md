# 合作指挥官建筑单位逐个对比

- 生成时间：2026/5/29 13:16:04
- Wiki抓取目录：`D:\MyWork\新建文件夹\mom.report.client\artifacts\2026-05-29-starcraft-coop-commanders`
- 官方JSON目录：`D:\MyWork\新建文件夹\mom.report.client\src\MyMod\crys_the_swarm_reborn.SC2Mod\游戏数据\官方合作指挥官\commanders`
- 官方原始文本镜像：`D:\MyWork\新建文件夹\mom.report.client\src\MyMod\crys_the_swarm_reborn.SC2Mod\游戏数据\官方SC2原始文本镜像`
- 当前 active Mod：`D:\MyWork\新建文件夹\mom.report.client\src\MyMod\crys_the_swarm_reborn.SC2Mod\原始mod`
- 目标：先建立逐指挥官建筑/单位对比基线，后续修复时直接从“优先排查项”进入 XML。

## 总览

| 指挥官 | 模块 | Wiki项 | 官方行 | Wiki未匹配官方 | 官方补充未在Wiki | 当前Mod未命中 | 仅文本命中 | 运行闭包命中 | 仅官方合作镜像 | 底层继承候选 | 生产链异常 | 生产链运行闭包 | 生产链底层候选 | 命令卡露出产物缺CUnit | 隐藏产物缺CUnit | 外来生产链露出 | 单独报告 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 阿巴瑟 / Abathur | XMAbathur.SC2Mod | 14 | 14 | 0 | 1 | 0 | 0 | 0 | 0 | 5 | 3 | 3 | 7 | 0 | 0 | 0 | by-commander/abathur-阿巴瑟-unit-building-compare.md |
| 阿拉纳克 / Alarak | XMAlarak.SC2Mod | 8 | 10 | 0 | 2 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 10 | 0 | 0 | 0 | by-commander/alarak-阿拉纳克-unit-building-compare.md |
| 阿塔尼斯 / Artanis | XMArtanis.SC2Mod | 10 | 12 | 0 | 4 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 11 | 0 | 0 | 0 | by-commander/artanis-阿塔尼斯-unit-building-compare.md |
| 德哈卡 / Dehaka | XMDehaka.SC2Mod | 13 | 25 | 0 | 13 | 0 | 0 | 0 | 0 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | by-commander/dehaka-德哈卡-unit-building-compare.md |
| 菲尼克斯 / Fenix | XMFenix.SC2Mod | 9 | 12 | 0 | 4 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 12 | 0 | 0 | 0 | by-commander/fenix-菲尼克斯-unit-building-compare.md |
| 霍纳与汉 / Horner | XMMira.SC2Mod | 9 | 10 | 0 | 3 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 0 | 3 | 0 | by-commander/horner-霍纳与汉-unit-building-compare.md |
| 凯拉克斯 / Karax | XMKarax.SC2Mod | 10 | 13 | 0 | 4 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 13 | 0 | 0 | 0 | by-commander/karax-凯拉克斯-unit-building-compare.md |
| 凯瑞甘 / Kerrigan | XMKerrigan.SC2Mod | 11 | 10 | 0 | 2 | 0 | 0 | 0 | 0 | 0 | 0 | 3 | 6 | 0 | 0 | 0 | by-commander/kerrigan-凯瑞甘-unit-building-compare.md |
| 雷诺 / Raynor | XMRaynor.SC2Mod | 12 | 16 | 0 | 4 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 10 | 0 | 0 | 0 | by-commander/raynor-雷诺-unit-building-compare.md |
| 蒙斯克 / Mengsk | XMMengsk.SC2Mod | 12 | 27 | 0 | 14 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | by-commander/mengsk-蒙斯克-unit-building-compare.md |
| 诺娃 / Nova | XMNova.SC2Mod | 11 | 16 | 0 | 5 | 0 | 0 | 0 | 0 | 1 | 0 | 0 | 5 | 0 | 2 | 0 | by-commander/nova-诺娃-unit-building-compare.md |
| 斯台特曼 / Stetmann | XMStetmann.SC2Mod | 11 | 34 | 0 | 23 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 0 | by-commander/stetmann-斯台特曼-unit-building-compare.md |
| 斯托科夫 / Stukov | XMStukov.SC2Mod | 9 | 15 | 0 | 11 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 0 | by-commander/stukov-斯托科夫-unit-building-compare.md |
| 斯旺 / Swann | XMSwann.SC2Mod | 11 | 15 | 0 | 6 | 0 | 0 | 0 | 0 | 3 | 0 | 0 | 0 | 0 | 14 | 0 | by-commander/swann-斯旺-unit-building-compare.md |
| 泰凯斯 / Tychus | XMTychus.SC2Mod | 9 | 14 | 0 | 6 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 0 | 1 | 0 | by-commander/tychus-泰凯斯-unit-building-compare.md |
| 沃拉尊 / Vorazun | XMVorazun.SC2Mod | 9 | 10 | 0 | 3 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 10 | 0 | 0 | 0 | by-commander/vorazun-沃拉尊-unit-building-compare.md |
| 泽拉图 / Zeratul | XMZeratul.SC2Mod | 8 | 12 | 0 | 4 | 0 | 0 | 0 | 0 | 0 | 4 | 0 | 8 | 0 | 0 | 0 | by-commander/zeratul-泽拉图-unit-building-compare.md |
| 扎加拉 / Zagara | XMZagara.SC2Mod | 10 | 9 | 0 | 1 | 0 | 0 | 0 | 0 | 2 | 1 | 4 | 2 | 0 | 0 | 0 | by-commander/zagara-扎加拉-unit-building-compare.md |

## 全局优先排查项

| 指挥官 | Wiki项 | 分类 | 官方名称 | ID | 当前Mod | 生产链状态 | 生产/建造/变形 | 数值 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 阿巴瑟 / Abathur | 守护者 | 单位 | 守护者 | GuardianMP | 底层基础镜像CUnit：GuardianMP；官方合作镜像CUnit：GuardianMP | 技能仅在官方合作镜像：MutaliskMorphToGuardian | Mutalisk / MutaliskMorphToGuardian / 50晶体矿，100瓦斯，15秒 | 生命150，人口2，视野13；50晶体矿，100瓦斯，15秒 |
| 阿巴瑟 / Abathur | 莽兽 | 单位 | 莽兽 | Brutalisk | XM共享模块CUnit：Brutalisk；官方合作镜像CUnit：Brutalisk | 技能仅在官方合作镜像：EvolveToBrutaliskRavager | RavagerAbathur / EvolveToBrutaliskRavager / 375晶体矿，225瓦斯，5秒 | 375晶体矿，225瓦斯，5秒 |
| 阿巴瑟 / Abathur | 利维坦 | 单位 | 利维坦 | Leviathan | XM共享模块CUnit：Leviathan；官方合作镜像CUnit：Leviathan | 技能仅在官方合作镜像：EvolveToLeviathanViper | DehakaViper / EvolveToLeviathanViper / 5秒 | 5秒 |
| 德哈卡 / Dehaka |  | 英雄 | 格里维格 | DehakaGlevig | 当前模块CUnit：DehakaGlevig；官方合作镜像CUnit：DehakaGlevig | 生产者仅在官方合作镜像：CoopCasterDehaka | CoopCasterDehaka / DehakaGlevigTopBar / 0.0625秒 | 生命1500，视野14；0.0625秒 |
| 泽拉图 / Zeratul | 萨尔纳加执行者 | 单位 | 萨尔纳加执行者 | ZeratulImmortal | XM共享模块CUnit：ZeratulImmortal；官方合作镜像CUnit：ZeratulImmortal | 技能仅在官方合作镜像：ZeratulRoboticsFacilityTrain | ZeratulRoboticsFacility / ZeratulRoboticsFacilityTrain / 750晶体矿，300瓦斯，55秒 | 生命400，护盾200，人口4，视野9；750晶体矿，300瓦斯，55秒 |
| 泽拉图 / Zeratul | 萨尔纳加禁绝者 | 单位 | 萨尔纳加禁绝者 | ZeratulDisruptor | XM共享模块CUnit：ZeratulDisruptor；官方合作镜像CUnit：ZeratulDisruptor | 技能仅在官方合作镜像：ZeratulRoboticsFacilityTrain | ZeratulRoboticsFacility / ZeratulRoboticsFacilityTrain / 450晶体矿，450瓦斯，50秒 | 生命200，护盾200，人口3，视野9；450晶体矿，450瓦斯，50秒 |
| 泽拉图 / Zeratul | 萨尔纳加虚空阵列船 | 单位 | 萨尔纳加虚空阵列船 | ZeratulWarpPrism | XM共享模块CUnit：ZeratulWarpPrism；官方合作镜像CUnit：ZeratulWarpPrism | 技能仅在官方合作镜像：ZeratulRoboticsFacilityTrain | ZeratulRoboticsFacility / ZeratulRoboticsFacilityTrain / 150晶体矿，50秒 | 生命200，护盾200，人口1，视野10；150晶体矿，50秒 |
| 泽拉图 / Zeratul |  | 建筑 | 折跃机械台 | ZeratulRoboticsFacility | XM共享模块CUnit：ZeratulRoboticsFacility；官方合作镜像CUnit：ZeratulRoboticsFacility | 技能仅在官方合作镜像：ZeratulBuild | Probe / ZeratulBuild / 200晶体矿，100瓦斯，65秒 | 生命450，护盾450，视野9；200晶体矿，100瓦斯，65秒 |
| 扎加拉 / Zagara | 爆蚊 | 单位 | 爆蚊 | Scourge | XM共享模块CUnit：Scourge；官方合作镜像CUnit：Scourge | 技能仅在官方合作镜像：LarvaTrainSwarm | Larva / LarvaTrainSwarm / 1晶体矿，1瓦斯，30秒 | 1晶体矿，1瓦斯，30秒 |

## 当前 active 命令卡露出产物缺 CUnit

- 无。

## 当前 active 外来生产链露出

- 无。

## 当前 active 隐藏技能产物缺 CUnit

| 指挥官 | 产物ID | 命中状态 | 引用技能 | 未露出命令 | 生产者 | 生产者归属 | 开局归属 | 按钮门槛 | 引用文件 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 霍纳与汉 / Horner | GunTowerMira | 当前模块仅引用：GunTowerMira | BuildMira | BuildMira,Build17 |  |  |  |  | 原始mod/Mods/XM/XMMira.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| 霍纳与汉 / Horner | ScienceFacilityMira | 当前模块仅引用：ScienceFacilityMira | BuildMira | BuildMira,Build18 |  |  |  | HaveStarport | 原始mod/Mods/XM/XMMira.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| 霍纳与汉 / Horner | WarHoundMira | 当前模块仅引用：WarHoundMira | SummonHornerMercenaries | SummonHornerMercenaries,Train3 |  |  |  | HaveArmory | 原始mod/Mods/XM/XMMira.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| 诺娃 / Nova | BomberLaunchPadNova | 当前模块仅引用：BomberLaunchPadNova | TerranBuildNova | TerranBuildNova,Build30 |  |  |  | HaveFactory | 原始mod/Mods/XM/XMNova.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| 诺娃 / Nova | RefineryRichNova | 当前模块仅引用：RefineryRichNova | TerranBuildNova | TerranBuildNova,Build8 |  |  |  |  | 原始mod/Mods/XM/XMNova.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| 斯台特曼 / Stetmann | ViperStetmann | 当前模块仅引用：ViperStetmann；官方合作镜像仅引用：ViperStetmann | LarvaTrainStetmann | LarvaTrainStetmann,Train8 |  |  |  | HaveHiveStetmann | 原始mod/Mods/XM/XMStetmann.SC2Mod/Base.SC2Data/GameData/abildata.xml |
| 斯托科夫 / Stukov | SIDroneBurrowed | 官方合作镜像CUnit：SIDroneBurrowed | SIBurrowDroneDown | SIBurrowDroneDown,0 |  |  |  |  | 原始mod/Mods/XM/XMStukov.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| 斯旺 / Swann | BansheeSwann | 当前模块仅引用：BansheeSwann | StarportTrainSwann | StarportTrainSwann,Train2 |  |  |  | HaveAttachedTechLab | 原始mod/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| 斯旺 / Swann | BattlecruiserSwann | 当前模块仅引用：BattlecruiserSwann | StarportTrainSwann | StarportTrainSwann,Train4 |  |  |  | HaveAttachedStarportTechLabAndFusionCore | 原始mod/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| 斯旺 / Swann | BomberLaunchPadSwann | 当前模块仅引用：BomberLaunchPadSwann | TerranBuildSwann | TerranBuildSwann,Build30 |  |  |  | HaveFactory | 原始mod/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| 斯旺 / Swann | CycloneSwann | 当前模块仅引用：CycloneSwann | FactoryTrainSwann | FactoryTrainSwann,Train8 |  |  |  | HaveAttachedTechLab | 原始mod/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| 斯旺 / Swann | DiamondbackSwann | 当前模块仅引用：DiamondbackSwann | FactoryTrainSwann | FactoryTrainSwann,Train4 |  |  |  | HaveAttachedTechLab | 原始mod/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| 斯旺 / Swann | HellionSwann | 当前模块仅引用：HellionSwann | FactoryTrainSwann | FactoryTrainSwann,Train6, FactoryTrainSwann,Train20 |  |  |  | Restricted | 原始mod/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| 斯旺 / Swann | HellionTankSwann | 当前模块仅引用：HellionTankSwann | FactoryTrainSwann | FactoryTrainSwann,Train7 |  |  |  | HaveArmory | 原始mod/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| 斯旺 / Swann | LiberatorSwann | 当前模块仅引用：LiberatorSwann | StarportTrainSwann | StarportTrainSwann,Train7 |  |  |  | Restricted | 原始mod/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| 斯旺 / Swann | MedivacSwann | 当前模块仅引用：MedivacSwann | StarportTrainSwann | StarportTrainSwann,Train1 |  |  |  | Restricted | 原始mod/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| 斯旺 / Swann | RavenSwann | 当前模块仅引用：RavenSwann | StarportTrainSwann | StarportTrainSwann,Train3 |  |  |  | HaveAttachedTechLab | 原始mod/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| 斯旺 / Swann | RefineryRichSwann | 当前模块仅引用：RefineryRichSwann | TerranBuildSwann | TerranBuildSwann,Build8 |  |  |  |  | 原始mod/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| 斯旺 / Swann | VikingFighterSwann | 当前模块仅引用：VikingFighterSwann | StarportTrainSwann | StarportTrainSwann,Train5 |  |  |  | Restricted | 原始mod/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| 斯旺 / Swann | VultureSwann | 当前模块仅引用：VultureSwann | FactoryTrainSwann | FactoryTrainSwann,Train10 |  |  |  | Restricted | 原始mod/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| 斯旺 / Swann | WidowMineSwann | 当前模块仅引用：WidowMineSwann | FactoryTrainSwann | FactoryTrainSwann,Train25 |  |  |  |  | 原始mod/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| 泰凯斯 / Tychus | TychusMedivac | 当前模块仅引用：TychusMedivac；官方合作镜像仅引用：TychusMedivac | TychusCommandCenterLiftOff | TychusCommandCenterLiftOff,Build4 |  |  |  |  | 原始mod/Mods/XM/XMTychus.SC2Mod/Base.SC2Data/GameData/AbilData.xml |

## 说明

- `当前模块CUnit`：本指挥官模块直接定义，可信度最高。
- `XM共享模块CUnit`：`XMCore/XMFinal` 定义，通常可被当前 active 线使用。
- `XMFinal运行闭包CUnit`：从 `XMFinal.SC2Mod/DocumentInfo` 递归加载到的当前 active 模块，运行时可解析，但不代表该按钮属于当前指挥官。
- `底层基础镜像CUnit`：新官方镜像的战役/多人基础层存在。当前 active 线是否继承要按地图/Mod依赖和实机确认。
- `官方合作镜像CUnit`：StarCoop 官方合作层存在，但 `合作指挥官版起义狂潮` 不直接读取这个镜像；这类更像待迁移/待补 Catalog 或历史按钮线索。
- `仅文本/引用命中`：XML/Galaxy 里出现过该 token，但没有同 ID `CUnit` 定义，通常要继续查依赖或补 Catalog。
- `Wiki未匹配官方JSON`：wiki主要部队名称没有映射到官方 JSON，优先补别名表或查是否是召唤物/建筑别称。
- `官方补充未在Wiki`：官方 JSON 有但 wiki主要部队未列，不一定是缺失，常见于工人、英雄、基础建筑或展示项。
