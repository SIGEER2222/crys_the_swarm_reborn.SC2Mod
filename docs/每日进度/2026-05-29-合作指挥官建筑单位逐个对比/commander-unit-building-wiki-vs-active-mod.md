# 合作指挥官建筑单位逐个对比

- 生成时间：2026/5/29 10:27:16
- Wiki抓取目录：`D:\MyWork\新建文件夹\mom.report.client\artifacts\2026-05-29-starcraft-coop-commanders`
- 官方JSON目录：`D:\MyWork\新建文件夹\mom.report.client\src\MyMod\crys_the_swarm_reborn.SC2Mod\游戏数据\官方合作指挥官\commanders`
- 当前 active Mod：`D:\MyWork\新建文件夹\mom.report.client\src\MyMod\crys_the_swarm_reborn.SC2Mod\合作指挥官版起义狂潮`
- 目标：先建立逐指挥官建筑/单位对比基线，后续修复时直接从“优先排查项”进入 XML。

## 总览

| 指挥官 | 模块 | Wiki项 | 官方行 | Wiki未匹配官方 | 官方补充未在Wiki | 当前Mod未命中 | 仅文本命中 | 生产链异常 | 单独报告 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 阿巴瑟 / Abathur | XMAbathur.SC2Mod | 14 | 14 | 0 | 1 | 0 | 0 | 0 | by-commander/abathur-阿巴瑟-unit-building-compare.md |
| 阿拉纳克 / Alarak | XMAlarak.SC2Mod | 8 | 10 | 0 | 2 | 0 | 2 | 0 | by-commander/alarak-阿拉纳克-unit-building-compare.md |
| 阿塔尼斯 / Artanis | XMArtanis.SC2Mod | 10 | 12 | 0 | 4 | 0 | 0 | 0 | by-commander/artanis-阿塔尼斯-unit-building-compare.md |
| 德哈卡 / Dehaka | XMDehaka.SC2Mod | 13 | 25 | 0 | 13 | 0 | 0 | 0 | by-commander/dehaka-德哈卡-unit-building-compare.md |
| 菲尼克斯 / Fenix | XMFenix.SC2Mod | 9 | 12 | 0 | 4 | 0 | 0 | 0 | by-commander/fenix-菲尼克斯-unit-building-compare.md |
| 霍纳与汉 / Horner | XMMira.SC2Mod | 9 | 10 | 0 | 3 | 0 | 0 | 6 | by-commander/horner-霍纳与汉-unit-building-compare.md |
| 凯拉克斯 / Karax | XMKarax.SC2Mod | 10 | 13 | 0 | 4 | 0 | 2 | 0 | by-commander/karax-凯拉克斯-unit-building-compare.md |
| 凯瑞甘 / Kerrigan | XMKerrigan.SC2Mod | 11 | 10 | 0 | 1 | 0 | 4 | 1 | by-commander/kerrigan-凯瑞甘-unit-building-compare.md |
| 雷诺 / Raynor | XMRaynor.SC2Mod | 12 | 16 | 0 | 4 | 0 | 0 | 0 | by-commander/raynor-雷诺-unit-building-compare.md |
| 蒙斯克 / Mengsk | XMMengsk.SC2Mod | 12 | 27 | 0 | 14 | 0 | 0 | 0 | by-commander/mengsk-蒙斯克-unit-building-compare.md |
| 诺娃 / Nova | XMNova.SC2Mod | 11 | 16 | 0 | 5 | 0 | 7 | 2 | by-commander/nova-诺娃-unit-building-compare.md |
| 斯台特曼 / Stetmann | XMStetmann.SC2Mod | 11 | 34 | 0 | 23 | 0 | 0 | 0 | by-commander/stetmann-斯台特曼-unit-building-compare.md |
| 斯托科夫 / Stukov | XMStukov.SC2Mod | 9 | 15 | 0 | 13 | 1 | 2 | 2 | by-commander/stukov-斯托科夫-unit-building-compare.md |
| 斯旺 / Swann | XMSwann.SC2Mod | 11 | 15 | 0 | 8 | 2 | 15 | 6 | by-commander/swann-斯旺-unit-building-compare.md |
| 泰凯斯 / Tychus | XMTychus.SC2Mod | 9 | 14 | 0 | 6 | 0 | 2 | 1 | by-commander/tychus-泰凯斯-unit-building-compare.md |
| 沃拉尊 / Vorazun | XMVorazun.SC2Mod | 9 | 10 | 0 | 3 | 0 | 4 | 0 | by-commander/vorazun-沃拉尊-unit-building-compare.md |
| 泽拉图 / Zeratul | XMZeratul.SC2Mod | 8 | 12 | 0 | 4 | 0 | 0 | 0 | by-commander/zeratul-泽拉图-unit-building-compare.md |
| 扎加拉 / Zagara | XMZagara.SC2Mod | 10 | 9 | 0 | 1 | 0 | 4 | 2 | by-commander/zagara-扎加拉-unit-building-compare.md |

## 全局优先排查项

| 指挥官 | Wiki项 | 分类 | 官方名称 | ID | 当前Mod | 生产链状态 | 生产/建造/变形 | 数值 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 阿拉纳克 / Alarak | 杀戮者 | 单位 | 追猎者 | Stalker | 仅文本/引用命中：Stalker | 生产链已命中 | Gateway / GatewayTrain / 125晶体矿，50瓦斯，38秒 | 生命80，护盾80，人口2，视野10；125晶体矿，50瓦斯，38秒 |
| 阿拉纳克 / Alarak | 光子炮台 | 建筑 | 光子炮台 | PhotonCannon | 仅文本/引用命中：PhotonCannon | 生产链已命中 | Gateway / GatewayTrain / 150晶体矿，38秒 | 生命150，护盾150，视野11；150晶体矿，38秒 |
| 霍纳与汉 / Horner | 阿斯忒瑞亚怨灵战机 | 单位 | 阿斯忒瑞亚怨灵战机 | HHWraith | CUnit已定义：WraithMira | 技能缺失 HHStarportTrainHorner | HHStarport / HHStarportTrainHorner / 800晶体矿，400瓦斯，300秒 | 生命400，人口4，视野8；800晶体矿，400瓦斯，300秒 |
| 霍纳与汉 / Horner | 德摩斯维京战机 | 单位 | 德摩斯维京战机 | HHVikingFighter | CUnit已定义：VikingFighterMira, VikingAssaultMira | 技能缺失 HHStarportTrainHorner | HHStarport / HHStarportTrainHorner / 800晶体矿，500瓦斯，300秒 | 生命350，人口4，视野10；800晶体矿，500瓦斯，300秒 |
| 霍纳与汉 / Horner | 忒伊亚铁鸦 | 单位 | 忒伊亚铁鸦 | HHRaven | CUnit已定义：RavenMira, RavenMiraSiege | 技能缺失 HHStarportTrainHorner | HHStarport / HHStarportTrainHorner / 100晶体矿，200瓦斯，180秒 | 生命140，人口2，视野11；100晶体矿，200瓦斯，180秒 |
| 霍纳与汉 / Horner | 至尊战列巡航舰 | 单位 | 至尊战列巡航舰 | HHBattlecruiser | CUnit已定义：BattlecruiserMira | 技能缺失 HHStarportTrainHorner | HHStarport / HHStarportTrainHorner / 1000晶体矿，800瓦斯，300秒 | 生命900，人口10，视野12；1000晶体矿，800瓦斯，300秒 |
| 霍纳与汉 / Horner |  | 单位 | 恶火 | HHHellion | CUnit已定义：HellionMira | 技能缺失 MorphToHHHellion | HHHellionTank / MorphToHHHellion / 0晶体矿，4秒 | 生命90，人口2，视野10；0晶体矿，4秒 |
| 霍纳与汉 / Horner |  | 单位 | 解放者 | Liberator | CUnit已定义：LiberatorMira, LiberatorMiraAG | 技能缺失 StarportTrain | Starport / StarportTrain / 150晶体矿，125瓦斯，60秒 | 生命180，人口3，视野9；150晶体矿，125瓦斯，60秒 |
| 凯拉克斯 / Karax | 激励者 | 单位 | 激励者 | SentryPurifier | 仅文本/引用命中：SentryPurifier | 生产链已命中 | Gateway / GatewayTrain / 32秒 | 32秒 |
| 凯拉克斯 / Karax |  | 单位 | 侦察机 | PhoenixPurifier | 仅文本/引用命中：PhoenixPurifier | 生产链已命中 | Probe / ProtossBuild / 60秒 | 60秒 |
| 凯瑞甘 / Kerrigan | 潜伏者 | 单位 | 潜伏者 | LurkerMP | 仅文本/引用命中：LurkerMP, Lurker | 官方JSON无生产链 |  |  |
| 凯瑞甘 / Kerrigan | 巢虫领主 | 单位 | 巢虫领主 | BroodLord | 仅文本/引用命中：BroodLord, Broodlord | 技能缺失 MorphToBroodLord | Corruptor / MorphToBroodLord / 150晶体矿，150瓦斯，33.8332秒 | 生命225，人口4，视野12；150晶体矿，150瓦斯，33.8332秒 |
| 凯瑞甘 / Kerrigan | 脊针爬虫 | 建筑 | 脊针爬虫 | SpineCrawler | 仅文本/引用命中：SpineCrawler | 生产链已命中 | Drone / ZergBuild / 150晶体矿，50秒 | 生命300，视野11；150晶体矿，50秒 |
| 凯瑞甘 / Kerrigan | 孢子爬虫 | 建筑 | 孢子爬虫 | SporeCrawler | 仅文本/引用命中：SporeCrawler | 生产链已命中 | Drone / ZergBuild / 125晶体矿，30秒 | 生命300，视野11；125晶体矿，30秒 |
| 诺娃 / Nova | 特战幽灵 | 单位 | 幽灵 | GhostNova | 仅文本/引用命中：GhostNova | 生产链已命中 | Barracks / BarracksTrainNova / 1000晶体矿，500瓦斯，300秒 | 生命125，人口2，视野11；1000晶体矿，500瓦斯，300秒 |
| 诺娃 / Nova | 磁轨炮塔 | 建筑 | 自动机炮 | AutoTurret | 仅文本/引用命中：AutoTurret | 技能缺失 TerranBuildFullRefund | SCV / TerranBuildFullRefund / 50晶体矿，25秒 | 生命100，视野7；50晶体矿，25秒 |
| 诺娃 / Nova | 导弹塔 | 建筑 | 导弹塔 | MissileTurret | 仅文本/引用命中：MissileTurret | 生产链已命中 | SCV / TerranBuild / 100晶体矿，25秒 | 生命250，视野11；100晶体矿，25秒 |
| 诺娃 / Nova |  | 单位 | 死神之首 | MercReaper | 仅文本/引用命中：MercReaper | 官方JSON无生产链 |  |  |
| 诺娃 / Nova |  | 单位 | SCV | SCV | 仅文本/引用命中：SCV | 技能缺失 CommandCenterTrain | CommandCenter / CommandCenterTrain / 50晶体矿，17秒 | 生命45，人口1，视野8；50晶体矿，17秒 |
| 诺娃 / Nova |  | 建筑 | 兵营 | Barracks | 仅文本/引用命中：Barracks | 生产链已命中 | SCV / TerranBuild / 150晶体矿，65秒 | 生命1000，视野9；150晶体矿，65秒 |
| 诺娃 / Nova |  | 建筑 | 指挥中心 | CommandCenter | 仅文本/引用命中：CommandCenter | 生产链已命中 | SCV / TerranBuild / 400晶体矿，100秒 | 生命1500，视野11；400晶体矿，100秒 |
| 斯托科夫 / Stukov | 虫巢女王 | 单位 | 虫巢女王 | StukovBroodQueen | 未命中：StukovBroodQueen, BroodQueen | 官方JSON无生产链 |  |  |
| 斯托科夫 / Stukov |  | 单位 | 虫后 | SwarmQueen | 仅文本/引用命中：SwarmQueen, Queen, QueenCoop | 技能缺失 TrainQueen | Hatchery / TrainQueen / 50秒 | 50秒 |
| 斯托科夫 / Stukov |  | 单位 | 跳虫 | Zergling | 仅文本/引用命中：Zergling | 技能缺失 LarvaTrain | Larva / LarvaTrain / 25晶体矿，24秒 | 生命35，人口0.5，视野8；25晶体矿，24秒 |
| 斯旺 / Swann | 恶蝠 | 单位 | 恶蝠 | HellionTank | 仅文本/引用命中：HellionTank | 技能缺失 MorphToHellionTank | Hellion / MorphToHellionTank / 0晶体矿，4秒 | 生命135，人口2，视野10；0晶体矿，4秒 |
| 斯旺 / Swann | 歌利亚武装机器人 | 单位 | 歌利亚武装机器人 | Goliath | 仅文本/引用命中：Goliath | 技能缺失 FactoryTrainNova | Factory / FactoryTrainNova / 750晶体矿，250瓦斯，300秒 | 750晶体矿，250瓦斯，300秒 |
| 斯旺 / Swann | 攻城坦克 | 单位 | 攻城坦克 | SiegeTank | 仅文本/引用命中：SiegeTank | 生产链已命中 | Factory / FactoryTrain / 150晶体矿，125瓦斯，45秒 | 生命175，人口3，视野11；150晶体矿，125瓦斯，45秒 |
| 斯旺 / Swann | 飓风 | 单位 | 飓风 | Cyclone | 仅文本/引用命中：Cyclone | 生产链已命中 | Factory / FactoryTrain / 150晶体矿，100瓦斯，45秒 | 生命120，人口3，视野11；150晶体矿，100瓦斯，45秒 |
| 斯旺 / Swann | 怨灵战机 | 单位 | 怨灵战机 | Wraith | 仅文本/引用命中：Wraith | 生产者和技能均未命中：HHStarport / HHStarportTrainHorner | HHStarport / HHStarportTrainHorner / 800晶体矿，400瓦斯，300秒 | 800晶体矿，400瓦斯，300秒 |
| 斯旺 / Swann | 大力神 | 单位 | 大力神 | Hercules | 仅文本/引用命中：Hercules | 生产链已命中 | Starport / StarportTrain / 100晶体矿，50瓦斯，40秒 | 人口3；100晶体矿，50瓦斯，40秒 |
| 斯旺 / Swann | 科学船 | 单位 | 科学船 | ScienceVessel | 仅文本/引用命中：ScienceVessel | 生产链已命中 | Starport / StarportTrain |  |
| 斯旺 / Swann | 爆弹比利 | 建筑 | 爆弹比利 | BlasterBilly | 未命中：BlasterBilly | 官方JSON无生产链 |  |  |
| 斯旺 / Swann | 热辣贝蒂 | 建筑 | 热辣贝蒂 | FlamingBetty | 仅文本/引用命中：FlamingBetty | 官方JSON无生产链 |  |  |
| 斯旺 / Swann | 转转小子 | 建筑 | 转转小子 | SpinningDizzy | 未命中：SpinningDizzy | 官方JSON无生产链 |  |  |
| 斯旺 / Swann |  | 单位 | 恶火 | Hellion | 仅文本/引用命中：Hellion | 技能缺失 MorphToHellion | HellionTank / MorphToHellion / 0晶体矿，4秒 | 生命90，人口2，视野10；0晶体矿，4秒 |
| 斯旺 / Swann |  | 单位 | SCV | SCV | 仅文本/引用命中：SCV | 技能缺失 CommandCenterTrain | CommandCenter / CommandCenterTrain / 50晶体矿，17秒 | 生命45，人口1，视野8；50晶体矿，17秒 |
| 斯旺 / Swann |  | 建筑 | 补给站 | SupplyDepot | 仅文本/引用命中：SupplyDepot | 生产链已命中 | SCV / TerranBuild / 100晶体矿，30秒 | 生命400，视野9；100晶体矿，30秒 |
| 斯旺 / Swann |  | 建筑 | 德拉肯激光钻机 | DrakkenLaserDrillCoop | CUnit已定义：DrakkenLaserDrillCoop | 生产者和技能均未命中：KelMorianWorker / KelMorianWorkerBuild | KelMorianWorker / KelMorianWorkerBuild / 60秒 | 生命3000，视野14；60秒 |
| 斯旺 / Swann |  | 建筑 | 毁灭炮塔 | KelMorianGrenadeTurret | 仅文本/引用命中：KelMorianGrenadeTurret | 生产链已命中 | SCV / TerranBuild / 150晶体矿，26.25秒 | 生命300，视野9；150晶体矿，26.25秒 |
| 斯旺 / Swann |  | 建筑 | 导弹塔 | MissileTurret | 仅文本/引用命中：MissileTurret | 生产链已命中 | SCV / TerranBuild / 100晶体矿，25秒 | 生命250，视野11；100晶体矿，25秒 |
| 斯旺 / Swann |  | 建筑 | 末日炮塔 | PerditionTurret | 仅文本/引用命中：PerditionTurret | 生产链已命中 | SCV / TerranBuild / 23秒 | 23秒 |
| 斯旺 / Swann |  | 建筑 | 指挥中心 | CommandCenter | 仅文本/引用命中：CommandCenter | 生产链已命中 | SCV / TerranBuild / 400晶体矿，100秒 | 生命1500，视野11；400晶体矿，100秒 |
| 泰凯斯 / Tychus | 自动机炮 | 建筑 | 自动机炮 | AutoTurret | 仅文本/引用命中：AutoTurret, NovaACLaserTurret | 官方JSON无生产链 |  |  |
| 泰凯斯 / Tychus |  | 单位 | 劫掠者 | Marauder | 仅文本/引用命中：Marauder | 技能缺失 BarracksTrain | Barracks / BarracksTrain / 100晶体矿，25瓦斯，30秒 | 生命125，人口2，视野10；100晶体矿，25瓦斯，30秒 |
| 沃拉尊 / Vorazun | 百夫长 | 单位 | 百夫长 | ZealotShakuras | 仅文本/引用命中：ZealotShakuras | 生产链已命中 | Gateway / GatewayTrain / 38秒 | 38秒 |
| 沃拉尊 / Vorazun | 追猎者 | 单位 | 追猎者 | Stalker | 仅文本/引用命中：Stalker | 生产链已命中 | Gateway / GatewayTrain / 125晶体矿，50瓦斯，38秒 | 生命80，护盾80，人口2，视野10；125晶体矿，50瓦斯，38秒 |
| 沃拉尊 / Vorazun | 虚空辉光舰 | 单位 | 虚空辉光舰 | VoidRay | 仅文本/引用命中：VoidRay | 生产链已命中 | Stargate / StargateTrain / 250晶体矿，150瓦斯，60.2秒 | 生命150，护盾100，人口4，视野10；250晶体矿，150瓦斯，60.2秒 |
| 沃拉尊 / Vorazun | 先知 | 单位 | 先知 | Oracle | 仅文本/引用命中：Oracle | 生产链已命中 | Stargate / StargateTrain / 100晶体矿，75瓦斯，30秒 | 生命100，护盾60，人口3，视野10；100晶体矿，75瓦斯，30秒 |
| 扎加拉 / Zagara | 跳虫 | 单位 | 跳虫 | Zergling | 仅文本/引用命中：Zergling | 生产链已命中 | Larva / LarvaTrain / 25晶体矿，24秒 | 生命35，人口0.5，视野8；25晶体矿，24秒 |
| 扎加拉 / Zagara | 爆虫 | 单位 | 爆虫 | Baneling | CUnit已定义：Baneling | 技能缺失 MorphZerglingToBaneling | Zergling / MorphZerglingToBaneling / 25晶体矿，25瓦斯，20秒 | 生命30，人口0.5，视野8；25晶体矿，25瓦斯，20秒 |
| 扎加拉 / Zagara | 畸变体 | 单位 | 畸变体 | InfestedAbomination | CUnit已定义：InfestedAbomination | 生产者缺失 SILarva | SILarva / SILarvaTrain / 30秒 | 30秒 |
| 扎加拉 / Zagara | 腐化者 | 单位 | 腐化者 | Corruptor | 仅文本/引用命中：Corruptor | 生产链已命中 | Larva / LarvaTrain / 150晶体矿，100瓦斯，40秒 | 生命200，人口2，视野10；150晶体矿，100瓦斯，40秒 |
| 扎加拉 / Zagara | 脊针爬虫 | 建筑 | 脊针爬虫 | SpineCrawler | 仅文本/引用命中：SpineCrawler | 生产链已命中 | Drone / ZergBuild / 150晶体矿，50秒 | 生命300，视野11；150晶体矿，50秒 |
| 扎加拉 / Zagara | 孢子爬虫 | 建筑 | 孢子爬虫 | SporeCrawler | 仅文本/引用命中：SporeCrawler | 生产链已命中 | Drone / ZergBuild / 125晶体矿，30秒 | 生命300，视野11；125晶体矿，30秒 |

## 说明

- `CUnit已定义`：当前 active Mod 对应扫描范围存在同 ID `CUnit`。
- `仅文本/引用命中`：XML/Galaxy 里出现过该 token，但没有同 ID `CUnit` 定义，通常要继续查依赖或补 Catalog。
- `Wiki未匹配官方JSON`：wiki主要部队名称没有映射到官方 JSON，优先补别名表或查是否是召唤物/建筑别称。
- `官方补充未在Wiki`：官方 JSON 有但 wiki主要部队未列，不一定是缺失，常见于工人、英雄、基础建筑或展示项。
