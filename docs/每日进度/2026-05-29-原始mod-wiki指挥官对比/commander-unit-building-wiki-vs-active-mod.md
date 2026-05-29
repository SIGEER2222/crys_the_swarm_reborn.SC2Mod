# 合作指挥官建筑单位逐个对比

- 生成时间：2026/5/29 10:38:49
- Wiki抓取目录：`D:\MyWork\新建文件夹\mom.report.client\artifacts\2026-05-29-starcraft-coop-commanders`
- 官方JSON目录：`D:\MyWork\新建文件夹\mom.report.client\src\MyMod\crys_the_swarm_reborn.SC2Mod\游戏数据\官方合作指挥官\commanders`
- 当前 active Mod：`D:\MyWork\新建文件夹\mom.report.client\src\MyMod\crys_the_swarm_reborn.SC2Mod\原始mod`
- 目标：先建立逐指挥官建筑/单位对比基线，后续修复时直接从“优先排查项”进入 XML。

## 总览

| 指挥官 | 模块 | Wiki项 | 官方行 | Wiki未匹配官方 | 官方补充未在Wiki | 当前Mod未命中 | 仅文本命中 | 生产链异常 | 单独报告 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 阿巴瑟 / Abathur | XMAbathur.SC2Mod | 14 | 14 | 0 | 1 | 0 | 9 | 7 | by-commander/abathur-阿巴瑟-unit-building-compare.md |
| 阿拉纳克 / Alarak | XMAlarak.SC2Mod | 8 | 10 | 0 | 2 | 0 | 3 | 10 | by-commander/alarak-阿拉纳克-unit-building-compare.md |
| 阿塔尼斯 / Artanis | XMArtanis.SC2Mod | 10 | 12 | 0 | 4 | 0 | 8 | 11 | by-commander/artanis-阿塔尼斯-unit-building-compare.md |
| 德哈卡 / Dehaka | XMDehaka.SC2Mod | 13 | 25 | 0 | 13 | 0 | 0 | 0 | by-commander/dehaka-德哈卡-unit-building-compare.md |
| 菲尼克斯 / Fenix | XMFenix.SC2Mod | 9 | 12 | 0 | 4 | 0 | 7 | 12 | by-commander/fenix-菲尼克斯-unit-building-compare.md |
| 霍纳与汉 / Horner | XMMira.SC2Mod | 9 | 10 | 0 | 3 | 0 | 0 | 5 | by-commander/horner-霍纳与汉-unit-building-compare.md |
| 凯拉克斯 / Karax | XMKarax.SC2Mod | 10 | 13 | 0 | 4 | 1 | 6 | 13 | by-commander/karax-凯拉克斯-unit-building-compare.md |
| 凯瑞甘 / Kerrigan | XMKerrigan.SC2Mod | 11 | 10 | 0 | 1 | 0 | 9 | 4 | by-commander/kerrigan-凯瑞甘-unit-building-compare.md |
| 雷诺 / Raynor | XMRaynor.SC2Mod | 12 | 16 | 0 | 4 | 0 | 12 | 10 | by-commander/raynor-雷诺-unit-building-compare.md |
| 蒙斯克 / Mengsk | XMMengsk.SC2Mod | 12 | 27 | 0 | 14 | 0 | 0 | 0 | by-commander/mengsk-蒙斯克-unit-building-compare.md |
| 诺娃 / Nova | XMNova.SC2Mod | 11 | 16 | 0 | 5 | 0 | 6 | 1 | by-commander/nova-诺娃-unit-building-compare.md |
| 斯台特曼 / Stetmann | XMStetmann.SC2Mod | 11 | 34 | 0 | 23 | 0 | 0 | 0 | by-commander/stetmann-斯台特曼-unit-building-compare.md |
| 斯托科夫 / Stukov | XMStukov.SC2Mod | 9 | 15 | 0 | 12 | 0 | 1 | 2 | by-commander/stukov-斯托科夫-unit-building-compare.md |
| 斯旺 / Swann | XMSwann.SC2Mod | 11 | 15 | 0 | 5 | 0 | 14 | 4 | by-commander/swann-斯旺-unit-building-compare.md |
| 泰凯斯 / Tychus | XMTychus.SC2Mod | 9 | 14 | 0 | 6 | 0 | 1 | 1 | by-commander/tychus-泰凯斯-unit-building-compare.md |
| 沃拉尊 / Vorazun | XMVorazun.SC2Mod | 9 | 10 | 0 | 3 | 2 | 7 | 10 | by-commander/vorazun-沃拉尊-unit-building-compare.md |
| 泽拉图 / Zeratul | XMZeratul.SC2Mod | 8 | 12 | 0 | 4 | 0 | 3 | 8 | by-commander/zeratul-泽拉图-unit-building-compare.md |
| 扎加拉 / Zagara | XMZagara.SC2Mod | 10 | 9 | 0 | 1 | 1 | 6 | 5 | by-commander/zagara-扎加拉-unit-building-compare.md |

## 全局优先排查项

| 指挥官 | Wiki项 | 分类 | 官方名称 | ID | 当前Mod | 生产链状态 | 生产/建造/变形 | 数值 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 阿巴瑟 / Abathur | 蟑螂 | 单位 | 蟑螂 | Roach | 仅文本/引用命中：Roach | 技能缺失 LarvaTrain | Larva / LarvaTrain / 75晶体矿，25瓦斯，27秒 | 生命145，人口2，视野9；75晶体矿，25瓦斯，27秒 |
| 阿巴瑟 / Abathur | 虫后 | 单位 | 虫后 | SwarmQueen | CUnit已定义：SwarmQueen | 技能缺失 TrainQueen | Hatchery / TrainQueen / 50秒 | 50秒 |
| 阿巴瑟 / Abathur | 虫群宿主 | 单位 | 虫群宿主 | SwarmHost | CUnit已定义：SwarmHost | 技能缺失 LarvaTrain | Larva / LarvaTrain / 40秒 | 40秒 |
| 阿巴瑟 / Abathur | 异龙 | 单位 | 异龙 | Mutalisk | 仅文本/引用命中：Mutalisk | 技能缺失 LarvaTrain | Larva / LarvaTrain / 100晶体矿，100瓦斯，33秒 | 生命120，人口2，视野11；100晶体矿，100瓦斯，33秒 |
| 阿巴瑟 / Abathur | 守护者 | 单位 | 守护者 | GuardianMP | 仅文本/引用命中：GuardianMP | 技能缺失 MutaliskMorphToGuardian | Mutalisk / MutaliskMorphToGuardian / 50晶体矿，100瓦斯，15秒 | 生命150，人口2，视野13；50晶体矿，100瓦斯，15秒 |
| 阿巴瑟 / Abathur | 吞噬者 | 单位 | 吞噬者 | DevourerMP | 仅文本/引用命中：DevourerMP, Devourer | 生产链已命中 | Mutalisk / MutaliskMorphToDevourer / 150晶体矿，50瓦斯，15秒 | 生命250，人口2，视野9；150晶体矿，50瓦斯，15秒 |
| 阿巴瑟 / Abathur | 飞蛇 | 单位 | 飞蛇 | Viper | 仅文本/引用命中：Viper | 技能缺失 LarvaTrain | Larva / LarvaTrain / 100晶体矿，200瓦斯，29秒 | 生命150，人口3，视野11；100晶体矿，200瓦斯，29秒 |
| 阿巴瑟 / Abathur | 利维坦 | 单位 | 利维坦 | Leviathan | CUnit已定义：Leviathan | 技能缺失 EvolveToLeviathanGuardianMP | GuardianMP / EvolveToLeviathanGuardianMP / 5秒 | 5秒 |
| 阿巴瑟 / Abathur | 眼虫 | 单位 | 眼虫 | Overseer | 仅文本/引用命中：Overseer | 官方JSON无生产链 |  |  |
| 阿巴瑟 / Abathur | 脊针爬虫 | 建筑 | 脊针爬虫 | SpineCrawler | 仅文本/引用命中：SpineCrawler | 生产链已命中 | Drone / ZergBuild / 150晶体矿，50秒 | 生命300，视野11；150晶体矿，50秒 |
| 阿巴瑟 / Abathur | 孢子爬虫 | 建筑 | 孢子爬虫 | SporeCrawler | 仅文本/引用命中：SporeCrawler | 生产链已命中 | Drone / ZergBuild / 125晶体矿，30秒 | 生命300，视野11；125晶体矿，30秒 |
| 阿巴瑟 / Abathur | 虫道网络 | 建筑 | 虫道网络 | NydusNetwork | 仅文本/引用命中：NydusNetwork | 官方JSON无生产链 |  |  |
| 阿拉纳克 / Alarak | 死徒 | 单位 | 死徒 | Supplicant | CUnit已定义：Supplicant | 技能缺失 GatewayTrain | Gateway / GatewayTrain / 75晶体矿，28秒 | 生命75，护盾125，人口2，视野9；75晶体矿，28秒 |
| 阿拉纳克 / Alarak | 杀戮者 | 单位 | 追猎者 | Stalker | 仅文本/引用命中：Stalker | 技能缺失 GatewayTrain | Gateway / GatewayTrain / 125晶体矿，50瓦斯，38秒 | 生命80，护盾80，人口2，视野10；125晶体矿，50瓦斯，38秒 |
| 阿拉纳克 / Alarak | 浩劫 | 单位 | 浩劫 | Monitor | CUnit已定义：Monitor | 技能缺失 GatewayTrain | Gateway / GatewayTrain / 37秒 | 37秒 |
| 阿拉纳克 / Alarak | 晋升者 | 单位 | 晋升者 | HighTemplarTaldarim | CUnit已定义：HighTemplarTaldarim | 技能缺失 GatewayTrain | Gateway / GatewayTrain / 55秒 | 55秒 |
| 阿拉纳克 / Alarak | 先锋 | 单位 | 无情先锋 | ImmortalTaldarim | CUnit已定义：ImmortalTaldarim | 技能缺失 ProtossBuild | Probe / ProtossBuild / 65秒 | 65秒 |
| 阿拉纳克 / Alarak | 天罚行者 | 单位 | 天罚行者 | ColossusTaldarim | CUnit已定义：ColossusTaldarim | 技能缺失 ProtossBuild | Probe / ProtossBuild / 65秒 | 65秒 |
| 阿拉纳克 / Alarak | 战争棱镜 | 单位 | 战争棱镜 | WarpPrismTaldarim | CUnit已定义：WarpPrismTaldarim | 技能缺失 RoboticsFacilityTrain | RoboticsFacility / RoboticsFacilityTrain / 200晶体矿，50秒 | 生命100，护盾100，人口2，视野10；200晶体矿，50秒 |
| 阿拉纳克 / Alarak | 光子炮台 | 建筑 | 光子炮台 | PhotonCannon | 仅文本/引用命中：PhotonCannon | 技能缺失 GatewayTrain | Gateway / GatewayTrain / 150晶体矿，38秒 | 生命150，护盾150，视野11；150晶体矿，38秒 |
| 阿拉纳克 / Alarak |  | 建筑 | 传送门 | Gateway | 仅文本/引用命中：Gateway | 技能缺失 ProtossBuild | Probe / ProtossBuild / 150晶体矿，65秒 | 生命500，护盾500，视野9；150晶体矿，65秒 |
| 阿拉纳克 / Alarak |  | 建筑 | 光影议会 | TwilightCouncil | CUnit已定义：TwilightCouncil | 技能缺失 ProtossBuild | Probe / ProtossBuild / 150晶体矿，100瓦斯，50秒 | 生命500，护盾500，视野9；150晶体矿，100瓦斯，50秒 |
| 阿塔尼斯 / Artanis | 狂热者 | 单位 | 狂热者 | Zealot | 仅文本/引用命中：Zealot | 技能缺失 GatewayTrain | Gateway / GatewayTrain / 100晶体矿，38秒 | 生命100，护盾50，人口2，视野9；100晶体矿，38秒 |
| 阿塔尼斯 / Artanis | 龙骑士 | 单位 | 龙骑士 | Dragoon | CUnit已定义：Dragoon | 技能缺失 GatewayTrain | Gateway / GatewayTrain / 38秒 | 生命100；38秒 |
| 阿塔尼斯 / Artanis | 高阶圣堂武士 | 单位 | 高阶圣堂武士 | HighTemplar | 仅文本/引用命中：HighTemplar | 技能缺失 GatewayTrain | Gateway / GatewayTrain / 50晶体矿，150瓦斯，55秒 | 生命40，护盾40，人口2，视野10；50晶体矿，150瓦斯，55秒 |
| 阿塔尼斯 / Artanis | 执政官 | 单位 | 执政官 | Archon | 仅文本/引用命中：Archon | 生产链已命中 | 未知生产者 / ArchonWarp / -175晶体矿，-275瓦斯，16.6667秒 | 生命10，护盾350，人口4，视野9；-175晶体矿，-275瓦斯，16.6667秒 |
| 阿塔尼斯 / Artanis | 不朽者 | 单位 | 不朽者 | ImmortalAiur | CUnit已定义：ImmortalAiur | 技能缺失 ProtossBuild | Probe / ProtossBuild / 65秒 | 65秒 |
| 阿塔尼斯 / Artanis | 掠夺者 | 单位 | 掠夺者 | Reaver | 仅文本/引用命中：Reaver | 官方JSON无生产链 |  |  |
| 阿塔尼斯 / Artanis | 侦测器 | 单位 | 侦测器 | Observer | 仅文本/引用命中：Observer | 技能缺失 RoboticsFacilityTrain | RoboticsFacility / RoboticsFacilityTrain / 25晶体矿，75瓦斯，25秒 | 生命40，护盾30，人口1，视野11；25晶体矿，75瓦斯，25秒 |
| 阿塔尼斯 / Artanis | 凤凰 | 单位 | 凤凰 | PhoenixAiur | CUnit已定义：PhoenixAiur | 技能缺失 ProtossBuild | Probe / ProtossBuild / 60秒 | 60秒 |
| 阿塔尼斯 / Artanis | 风暴战舰 | 单位 | 风暴战舰 | Tempest | 仅文本/引用命中：Tempest | 官方JSON无生产链 |  |  |
| 阿塔尼斯 / Artanis | 光子炮台 | 建筑 | 光子炮台 | PhotonCannon | 仅文本/引用命中：PhotonCannon | 技能缺失 GatewayTrain | Gateway / GatewayTrain / 150晶体矿，38秒 | 生命150，护盾150，视野11；150晶体矿，38秒 |
| 阿塔尼斯 / Artanis |  | 建筑 | 传送门 | Gateway | 仅文本/引用命中：Gateway | 技能缺失 ProtossBuild | Probe / ProtossBuild / 150晶体矿，65秒 | 生命500，护盾500，视野9；150晶体矿，65秒 |
| 阿塔尼斯 / Artanis |  | 建筑 | 机械研究所 | RoboticsBay | CUnit已定义：RoboticsBay | 技能缺失 ProtossBuild | Probe / ProtossBuild / 150晶体矿，150瓦斯，65秒 | 生命500，护盾500，视野9；150晶体矿，150瓦斯，65秒 |
| 阿塔尼斯 / Artanis |  | 建筑 | 折跃机械台 | RoboticsFacilityWarp | CUnit已定义：RoboticsFacilityWarp | 技能缺失 ProtossBuild | Probe / ProtossBuild / 65秒 | 65秒 |
| 阿塔尼斯 / Artanis |  | 建筑 | 光影议会 | TwilightCouncil | CUnit已定义：TwilightCouncil | 技能缺失 ProtossBuild | Probe / ProtossBuild / 150晶体矿，100瓦斯，50秒 | 生命500，护盾500，视野9；150晶体矿，100瓦斯，50秒 |
| 菲尼克斯 / Fenix | 军团士兵 | 单位 | 哨兵 | ZealotPurifier | CUnit已定义：ZealotPurifier | 技能缺失 GatewayTrain | Gateway / GatewayTrain / 38秒 | 38秒 |
| 菲尼克斯 / Fenix | 使徒 | 单位 | 使徒 | Adept | 仅文本/引用命中：Adept | 技能缺失 GatewayTrain | Gateway / GatewayTrain / 125晶体矿，25瓦斯，42秒 | 生命70，护盾70，人口2，视野9；125晶体矿，25瓦斯，42秒 |
| 菲尼克斯 / Fenix | 保护者 | 单位 | 保护者 | SentryFenix | CUnit已定义：SentryFenix | 技能缺失 GatewayTrain | Gateway / GatewayTrain / 50晶体矿，100瓦斯，37秒 | 生命40，护盾40，人口2，视野10；50晶体矿，100瓦斯，37秒 |
| 菲尼克斯 / Fenix | 不朽者 | 单位 | 不朽者 | Immortal | 仅文本/引用命中：Immortal | 技能缺失 RoboticsFacilityTrain | RoboticsFacility / RoboticsFacilityTrain / 250晶体矿，100瓦斯，55秒 | 生命200，护盾100，人口4，视野9；250晶体矿，100瓦斯，55秒 |
| 菲尼克斯 / Fenix | 巨像 | 单位 | 巨像 | ColossusPurifier | CUnit已定义：ColossusPurifier | 技能缺失 ProtossBuild | Probe / ProtossBuild / 65秒 | 65秒 |
| 菲尼克斯 / Fenix | 侦测器 | 单位 | 侦测器 | Observer | 仅文本/引用命中：Observer | 技能缺失 RoboticsFacilityTrain | RoboticsFacility / RoboticsFacilityTrain / 25晶体矿，75瓦斯，25秒 | 生命40，护盾30，人口1，视野11；25晶体矿，75瓦斯，25秒 |
| 菲尼克斯 / Fenix | 干扰者 | 单位 | 干扰者 | Disruptor | 仅文本/引用命中：Disruptor | 官方JSON无生产链 |  |  |
| 菲尼克斯 / Fenix | 侦察机 | 单位 | 折跃侦察机 | Scout | CUnit已定义：Scout | 技能缺失 ProtossBuild | Probe / ProtossBuild / 250晶体矿，75瓦斯，60秒 | 生命150，护盾100；250晶体矿，75瓦斯，60秒 |
| 菲尼克斯 / Fenix | 航母 | 单位 | 航母 | Carrier | 仅文本/引用命中：Carrier | 生产者和技能均未命中：Stargate / StargateTrain | Stargate / StargateTrain / 350晶体矿，250瓦斯，90秒 | 生命300，护盾150，人口6，视野12；350晶体矿，250瓦斯，90秒 |
| 菲尼克斯 / Fenix |  | 建筑 | 传送门 | Gateway | 仅文本/引用命中：Gateway | 技能缺失 ProtossBuild | Probe / ProtossBuild / 150晶体矿，65秒 | 生命500，护盾500，视野9；150晶体矿，65秒 |
| 菲尼克斯 / Fenix |  | 建筑 | 光子炮台 | PhotonCannon | 仅文本/引用命中：PhotonCannon | 技能缺失 GatewayTrain | Gateway / GatewayTrain / 150晶体矿，38秒 | 生命150，护盾150，视野11；150晶体矿，38秒 |
| 菲尼克斯 / Fenix |  | 建筑 | 机械研究所 | RoboticsBay | CUnit已定义：RoboticsBay | 技能缺失 ProtossBuild | Probe / ProtossBuild / 150晶体矿，150瓦斯，65秒 | 生命500，护盾500，视野9；150晶体矿，150瓦斯，65秒 |
| 菲尼克斯 / Fenix |  | 建筑 | 光影议会 | TwilightCouncil | CUnit已定义：TwilightCouncil | 技能缺失 ProtossBuild | Probe / ProtossBuild / 150晶体矿，100瓦斯，50秒 | 生命500，护盾500，视野9；150晶体矿，100瓦斯，50秒 |
| 霍纳与汉 / Horner | 阿斯忒瑞亚怨灵战机 | 单位 | 阿斯忒瑞亚怨灵战机 | HHWraith | CUnit已定义：WraithMira | 技能缺失 HHStarportTrainHorner | HHStarport / HHStarportTrainHorner / 800晶体矿，400瓦斯，300秒 | 生命400，人口4，视野8；800晶体矿，400瓦斯，300秒 |
| 霍纳与汉 / Horner | 德摩斯维京战机 | 单位 | 德摩斯维京战机 | HHVikingFighter | CUnit已定义：VikingFighterMira, VikingAssaultMira | 技能缺失 HHStarportTrainHorner | HHStarport / HHStarportTrainHorner / 800晶体矿，500瓦斯，300秒 | 生命350，人口4，视野10；800晶体矿，500瓦斯，300秒 |
| 霍纳与汉 / Horner | 忒伊亚铁鸦 | 单位 | 忒伊亚铁鸦 | HHRaven | CUnit已定义：RavenMira, RavenMiraSiege | 技能缺失 HHStarportTrainHorner | HHStarport / HHStarportTrainHorner / 100晶体矿，200瓦斯，180秒 | 生命140，人口2，视野11；100晶体矿，200瓦斯，180秒 |
| 霍纳与汉 / Horner | 至尊战列巡航舰 | 单位 | 至尊战列巡航舰 | HHBattlecruiser | CUnit已定义：BattlecruiserMira | 技能缺失 HHStarportTrainHorner | HHStarport / HHStarportTrainHorner / 1000晶体矿，800瓦斯，300秒 | 生命900，人口10，视野12；1000晶体矿，800瓦斯，300秒 |
| 霍纳与汉 / Horner |  | 单位 | 解放者 | Liberator | CUnit已定义：LiberatorMira, LiberatorMiraAG | 技能缺失 StarportTrain | Starport / StarportTrain / 150晶体矿，125瓦斯，60秒 | 生命180，人口3，视野9；150晶体矿，125瓦斯，60秒 |
| 凯拉克斯 / Karax | 警戒者 | 单位 | 哨兵 | ZealotPurifier | CUnit已定义：ZealotPurifier | 技能缺失 GatewayTrain | Gateway / GatewayTrain / 38秒 | 38秒 |
| 凯拉克斯 / Karax | 激励者 | 单位 | 激励者 | SentryPurifier | CUnit已定义：SentryPurifier | 技能缺失 GatewayTrain | Gateway / GatewayTrain / 32秒 | 32秒 |
| 凯拉克斯 / Karax | 不朽者 | 单位 | 不朽者 | ImmortalAiur | CUnit已定义：ImmortalAiur | 技能缺失 ProtossBuild | Probe / ProtossBuild / 65秒 | 65秒 |
| 凯拉克斯 / Karax | 巨像 | 单位 | 巨像 | Colossus | 仅文本/引用命中：Colossus | 技能缺失 RoboticsFacilityTrain | RoboticsFacility / RoboticsFacilityTrain / 300晶体矿，200瓦斯，75秒 | 生命250，护盾100，人口6，视野10；300晶体矿，200瓦斯，75秒 |
| 凯拉克斯 / Karax | 侦测器 | 单位 | 侦测器 | Observer | 仅文本/引用命中：Observer | 技能缺失 RoboticsFacilityTrain | RoboticsFacility / RoboticsFacilityTrain / 25晶体矿，75瓦斯，25秒 | 生命40，护盾30，人口1，视野11；25晶体矿，75瓦斯，25秒 |
| 凯拉克斯 / Karax | 幻影战机 | 单位 | 折跃侦察机 | Scout | CUnit已定义：Scout | 技能缺失 ProtossBuild | Probe / ProtossBuild / 250晶体矿，75瓦斯，60秒 | 生命150，护盾100；250晶体矿，75瓦斯，60秒 |
| 凯拉克斯 / Karax | 航母 | 单位 | 航母 | Carrier | 仅文本/引用命中：Carrier | 生产者和技能均未命中：Stargate / StargateTrain | Stargate / StargateTrain / 350晶体矿，250瓦斯，90秒 | 生命300，护盾150，人口6，视野12；350晶体矿，250瓦斯，90秒 |
| 凯拉克斯 / Karax | 光子炮台 | 建筑 | 光子炮台 | PhotonCannon | 仅文本/引用命中：PhotonCannon | 技能缺失 GatewayTrain | Gateway / GatewayTrain / 150晶体矿，38秒 | 生命150，护盾150，视野11；150晶体矿，38秒 |
| 凯拉克斯 / Karax | 护盾充能器 | 建筑 | 护盾充能器 | ShieldBattery | 仅文本/引用命中：ShieldBattery | 技能缺失 ProtossBuild | Probe / ProtossBuild / 100晶体矿，40秒 | 生命200，护盾200，视野9；100晶体矿，40秒 |
| 凯拉克斯 / Karax | 凯达琳巨石 | 建筑 | 凯达琳巨石 | KhaydarinMonolith | 未命中：KhaydarinMonolith, Monolith | 官方JSON无生产链 |  |  |
| 凯拉克斯 / Karax |  | 单位 | 侦察机 | PhoenixPurifier | CUnit已定义：PhoenixPurifier | 技能缺失 ProtossBuild | Probe / ProtossBuild / 60秒 | 60秒 |
| 凯拉克斯 / Karax |  | 建筑 | 传送门 | Gateway | 仅文本/引用命中：Gateway | 技能缺失 ProtossBuild | Probe / ProtossBuild / 150晶体矿，65秒 | 生命500，护盾500，视野9；150晶体矿，65秒 |
| 凯拉克斯 / Karax |  | 建筑 | 太阳锻炉 | SolarForge | CUnit已定义：SolarForge | 技能缺失 ProtossBuild | 未知生产者 / ProtossBuild / 200晶体矿，200瓦斯，65秒 | 生命500，护盾500，视野9；200晶体矿，200瓦斯，65秒 |
| 凯拉克斯 / Karax |  | 建筑 | 光影议会 | TwilightCouncil | CUnit已定义：TwilightCouncil | 技能缺失 ProtossBuild | Probe / ProtossBuild / 150晶体矿，100瓦斯，50秒 | 生命500，护盾500，视野9；150晶体矿，100瓦斯，50秒 |
| 凯瑞甘 / Kerrigan | 跳虫 | 单位 | 跳虫 | Zergling | 仅文本/引用命中：Zergling | 技能缺失 LarvaTrain | Larva / LarvaTrain / 25晶体矿，24秒 | 生命35，人口0.5，视野8；25晶体矿，24秒 |
| 凯瑞甘 / Kerrigan | 虫后 | 单位 | 虫后 | SwarmQueen | CUnit已定义：SwarmQueen | 技能缺失 TrainQueen | Hatchery / TrainQueen / 50秒 | 50秒 |
| 凯瑞甘 / Kerrigan | 刺蛇 | 单位 | 刺蛇 | Hydralisk | 仅文本/引用命中：Hydralisk | 技能缺失 LarvaTrain | Larva / LarvaTrain / 100晶体矿，50瓦斯，33秒 | 生命90，人口2，视野9；100晶体矿，50瓦斯，33秒 |
| 凯瑞甘 / Kerrigan | 潜伏者 | 单位 | 潜伏者 | LurkerMP | 仅文本/引用命中：LurkerMP, Lurker | 官方JSON无生产链 |  |  |
| 凯瑞甘 / Kerrigan | 巢虫领主 | 单位 | 巢虫领主 | BroodLord | 仅文本/引用命中：BroodLord, Broodlord | 生产链已命中 | Corruptor / MorphToBroodLord / 150晶体矿，150瓦斯，33.8332秒 | 生命225，人口4，视野12；150晶体矿，150瓦斯，33.8332秒 |
| 凯瑞甘 / Kerrigan | 雷兽 | 单位 | 雷兽 | Ultralisk | 仅文本/引用命中：Ultralisk | 技能缺失 LarvaTrain | Larva / LarvaTrain / 275晶体矿，200瓦斯，55秒 | 生命500，人口6，视野9；275晶体矿，200瓦斯，55秒 |
| 凯瑞甘 / Kerrigan | 眼虫 | 单位 | 眼虫 | Overseer | 仅文本/引用命中：Overseer | 官方JSON无生产链 |  |  |
| 凯瑞甘 / Kerrigan | 脊针爬虫 | 建筑 | 脊针爬虫 | SpineCrawler | 仅文本/引用命中：SpineCrawler | 生产链已命中 | Drone / ZergBuild / 150晶体矿，50秒 | 生命300，视野11；150晶体矿，50秒 |
| 凯瑞甘 / Kerrigan | 孢子爬虫 | 建筑 | 孢子爬虫 | SporeCrawler | 仅文本/引用命中：SporeCrawler | 生产链已命中 | Drone / ZergBuild / 125晶体矿，30秒 | 生命300，视野11；125晶体矿，30秒 |
| 凯瑞甘 / Kerrigan | 虫道网络欧米茄 | 建筑 | 虫道网络 | NydusNetwork | 仅文本/引用命中：NydusNetwork | 生产链已命中 | Drone / ZergBuild / 200晶体矿，150瓦斯，50秒 | 生命850，视野9；200晶体矿，150瓦斯，50秒 |
| 雷诺 / Raynor | 陆战队员 | 单位 | 陆战队员 | Marine | 仅文本/引用命中：Marine | 技能缺失 BarracksTrain | Barracks / BarracksTrain / 50晶体矿，25秒 | 生命45，人口1，视野9；50晶体矿，25秒 |
| 雷诺 / Raynor | 医疗兵 | 单位 | 医疗兵 | Medic | CUnit已定义：Medic | 技能缺失 BarracksTrain | Barracks / BarracksTrain / 40秒 | 40秒 |
| 雷诺 / Raynor | 火蝠 | 单位 | 火蝠 | Firebat | CUnit已定义：Firebat | 技能缺失 BarracksTrain | Barracks / BarracksTrain |  |
| 雷诺 / Raynor | 劫掠者 | 单位 | 劫掠者 | Marauder | 仅文本/引用命中：Marauder | 技能缺失 BarracksTrain | Barracks / BarracksTrain / 100晶体矿，25瓦斯，30秒 | 生命125，人口2，视野10；100晶体矿，25瓦斯，30秒 |
| 雷诺 / Raynor | 秃鹫 | 单位 | 秃鹫 | Vulture | CUnit已定义：Vulture | 技能缺失 FactoryTrain | Factory / FactoryTrain |  |
| 雷诺 / Raynor | 攻城坦克 | 单位 | 攻城坦克 | SiegeTank | 仅文本/引用命中：SiegeTank | 技能缺失 FactoryTrain | Factory / FactoryTrain / 150晶体矿，125瓦斯，45秒 | 生命175，人口3，视野11；150晶体矿，125瓦斯，45秒 |
| 雷诺 / Raynor | 维京战机 | 单位 | 维京战机 | Viking | CUnit已定义：Viking | 生产者和技能均未命中：HHStarport / HHStarportTrainHorner | HHStarport / HHStarportTrainHorner / 800晶体矿，500瓦斯，300秒 | 800晶体矿，500瓦斯，300秒 |
| 雷诺 / Raynor | 女妖 | 单位 | 女妖 | Banshee | 仅文本/引用命中：Banshee | 技能缺失 StarportTrain | Starport / StarportTrain / 150晶体矿，100瓦斯，60秒 | 生命140，人口3，视野10；150晶体矿，100瓦斯，60秒 |
| 雷诺 / Raynor | 战列巡航舰 | 单位 | 战列巡航舰 | Battlecruiser | 仅文本/引用命中：Battlecruiser | 生产链已命中 | SCV / TerranBuild / 400晶体矿，300瓦斯，65秒 | 生命550，人口6，视野12；400晶体矿，300瓦斯，65秒 |
| 雷诺 / Raynor | 轨道控制基地 | 建筑 | 轨道控制基地 | OrbitalCommand | 仅文本/引用命中：OrbitalCommand | 技能缺失 UpgradeToOrbital | CommandCenter / UpgradeToOrbital / 150晶体矿，0秒 | 生命1500，视野11；150晶体矿，0秒 |
| 雷诺 / Raynor | 地堡 | 建筑 | 地堡 | Bunker | 仅文本/引用命中：Bunker | 生产链已命中 | SCV / TerranBuild / 100晶体矿，20秒 | 生命400，视野10；100晶体矿，20秒 |
| 雷诺 / Raynor | 导弹塔 | 建筑 | 导弹塔 | MissileTurret | 仅文本/引用命中：MissileTurret | 生产链已命中 | SCV / TerranBuild / 100晶体矿，25秒 | 生命250，视野11；100晶体矿，25秒 |
| 雷诺 / Raynor |  | 单位 | SCV | SCV | 仅文本/引用命中：SCV | 技能缺失 CommandCenterTrain | CommandCenter / CommandCenterTrain / 50晶体矿，17秒 | 生命45，人口1，视野8；50晶体矿，17秒 |
| 雷诺 / Raynor |  | 建筑 | 兵营 | Barracks | 仅文本/引用命中：Barracks | 生产链已命中 | SCV / TerranBuild / 150晶体矿，65秒 | 生命1000，视野9；150晶体矿，65秒 |
| 雷诺 / Raynor |  | 建筑 | 补给站 | SupplyDepot | 仅文本/引用命中：SupplyDepot | 生产链已命中 | SCV / TerranBuild / 100晶体矿，30秒 | 生命400，视野9；100晶体矿，30秒 |
| 雷诺 / Raynor |  | 建筑 | 指挥中心 | CommandCenter | 仅文本/引用命中：CommandCenter | 生产链已命中 | SCV / TerranBuild / 400晶体矿，100秒 | 生命1500，视野11；400晶体矿，100秒 |
| 诺娃 / Nova | 特战幽灵 | 单位 | 幽灵 | GhostNova | 仅文本/引用命中：GhostNova | 生产链已命中 | Barracks / BarracksTrainNova / 1000晶体矿，500瓦斯，300秒 | 生命125，人口2，视野11；1000晶体矿，500瓦斯，300秒 |
| 诺娃 / Nova | 磁轨炮塔 | 建筑 | 自动机炮 | AutoTurret | 仅文本/引用命中：AutoTurret | 生产链已命中 | SCV / TerranBuildFullRefund / 50晶体矿，25秒 | 生命100，视野7；50晶体矿，25秒 |
| 诺娃 / Nova | 导弹塔 | 建筑 | 导弹塔 | MissileTurret | 仅文本/引用命中：MissileTurret | 生产链已命中 | SCV / TerranBuild / 100晶体矿，25秒 | 生命250，视野11；100晶体矿，25秒 |
| 诺娃 / Nova |  | 单位 | SCV | SCV | 仅文本/引用命中：SCV | 技能缺失 CommandCenterTrain | CommandCenter / CommandCenterTrain / 50晶体矿，17秒 | 生命45，人口1，视野8；50晶体矿，17秒 |
| 诺娃 / Nova |  | 建筑 | 兵营 | Barracks | 仅文本/引用命中：Barracks | 生产链已命中 | SCV / TerranBuild / 150晶体矿，65秒 | 生命1000，视野9；150晶体矿，65秒 |
| 诺娃 / Nova |  | 建筑 | 指挥中心 | CommandCenter | 仅文本/引用命中：CommandCenter | 生产链已命中 | SCV / TerranBuild / 400晶体矿，100秒 | 生命1500，视野11；400晶体矿，100秒 |
| 斯托科夫 / Stukov | 虫巢女王 | 单位 | 虫后 | SwarmQueen | CUnit已定义：SwarmQueen | 技能缺失 TrainQueen | Hatchery / TrainQueen / 50秒 | 50秒 |
| 斯托科夫 / Stukov |  | 单位 | 跳虫 | Zergling | 仅文本/引用命中：Zergling | 技能缺失 LarvaTrain | Larva / LarvaTrain / 25晶体矿，24秒 | 生命35，人口0.5，视野8；25晶体矿，24秒 |
| 斯旺 / Swann | 恶蝠 | 单位 | 恶蝠 | HellionTank | 仅文本/引用命中：HellionTank, Hellbat | 生产链已命中 | Hellion / MorphToHellionTank / 0晶体矿，4秒 | 生命135，人口2，视野10；0晶体矿，4秒 |
| 斯旺 / Swann | 歌利亚武装机器人 | 单位 | 歌利亚武装机器人 | Goliath | 仅文本/引用命中：Goliath | 技能缺失 FactoryTrainNova | Factory / FactoryTrainNova / 750晶体矿，250瓦斯，300秒 | 750晶体矿，250瓦斯，300秒 |
| 斯旺 / Swann | 攻城坦克 | 单位 | 攻城坦克 | SiegeTank | 仅文本/引用命中：SiegeTank | 生产链已命中 | Factory / FactoryTrain / 150晶体矿，125瓦斯，45秒 | 生命175，人口3，视野11；150晶体矿，125瓦斯，45秒 |
| 斯旺 / Swann | 飓风 | 单位 | 飓风 | Cyclone | 仅文本/引用命中：Cyclone | 生产链已命中 | Factory / FactoryTrain / 150晶体矿，100瓦斯，45秒 | 生命120，人口3，视野11；150晶体矿，100瓦斯，45秒 |
| 斯旺 / Swann | 怨灵战机 | 单位 | 怨灵战机 | Wraith | 仅文本/引用命中：Wraith | 生产者和技能均未命中：HHStarport / HHStarportTrainHorner | HHStarport / HHStarportTrainHorner / 800晶体矿，400瓦斯，300秒 | 800晶体矿，400瓦斯，300秒 |
| 斯旺 / Swann | 大力神 | 单位 | 大力神 | Hercules | 仅文本/引用命中：Hercules | 生产链已命中 | Starport / StarportTrain / 100晶体矿，50瓦斯，40秒 | 人口3；100晶体矿，50瓦斯，40秒 |
| 斯旺 / Swann | 科学船 | 单位 | 科学船 | ScienceVessel | 仅文本/引用命中：ScienceVessel | 生产链已命中 | Starport / StarportTrain |  |
| 斯旺 / Swann | 爆弹比利 | 建筑 | 毁灭炮塔 | KelMorianGrenadeTurret | 仅文本/引用命中：KelMorianGrenadeTurret | 生产链已命中 | SCV / TerranBuild / 150晶体矿，26.25秒 | 生命300，视野9；150晶体矿，26.25秒 |
| 斯旺 / Swann | 热辣贝蒂 | 建筑 | 末日炮塔 | PerditionTurret | 仅文本/引用命中：PerditionTurret | 生产链已命中 | SCV / TerranBuild / 23秒 | 23秒 |
| 斯旺 / Swann | 转转小子 | 建筑 | 导弹塔 | MissileTurret | 仅文本/引用命中：MissileTurret | 生产链已命中 | SCV / TerranBuild / 100晶体矿，25秒 | 生命250，视野11；100晶体矿，25秒 |
| 斯旺 / Swann |  | 单位 | 恶火 | Hellion | 仅文本/引用命中：Hellion | 生产链已命中 | HellionTank / MorphToHellion / 0晶体矿，4秒 | 生命90，人口2，视野10；0晶体矿，4秒 |
| 斯旺 / Swann |  | 单位 | SCV | SCV | 仅文本/引用命中：SCV | 技能缺失 CommandCenterTrain | CommandCenter / CommandCenterTrain / 50晶体矿，17秒 | 生命45，人口1，视野8；50晶体矿，17秒 |
| 斯旺 / Swann |  | 建筑 | 补给站 | SupplyDepot | 仅文本/引用命中：SupplyDepot | 生产链已命中 | SCV / TerranBuild / 100晶体矿，30秒 | 生命400，视野9；100晶体矿，30秒 |
| 斯旺 / Swann |  | 建筑 | 德拉肯激光钻机 | DrakkenLaserDrillCoop | CUnit已定义：DrakkenLaserDrillCoop | 生产者和技能均未命中：KelMorianWorker / KelMorianWorkerBuild | KelMorianWorker / KelMorianWorkerBuild / 60秒 | 生命3000，视野14；60秒 |
| 斯旺 / Swann |  | 建筑 | 指挥中心 | CommandCenter | 仅文本/引用命中：CommandCenter | 生产链已命中 | SCV / TerranBuild / 400晶体矿，100秒 | 生命1500，视野11；400晶体矿，100秒 |
| 泰凯斯 / Tychus |  | 单位 | 劫掠者 | Marauder | 仅文本/引用命中：Marauder | 技能缺失 BarracksTrain | Barracks / BarracksTrain / 100晶体矿，25瓦斯，30秒 | 生命125，人口2，视野10；100晶体矿，25瓦斯，30秒 |
| 沃拉尊 / Vorazun | 百夫长 | 单位 | 百夫长 | ZealotShakuras | CUnit已定义：ZealotShakuras | 技能缺失 GatewayTrain | Gateway / GatewayTrain / 38秒 | 38秒 |
| 沃拉尊 / Vorazun | 追猎者 | 单位 | 追猎者 | Stalker | 仅文本/引用命中：Stalker | 技能缺失 GatewayTrain | Gateway / GatewayTrain / 125晶体矿，50瓦斯，38秒 | 生命80，护盾80，人口2，视野10；125晶体矿，50瓦斯，38秒 |
| 沃拉尊 / Vorazun | 黑暗圣堂武士 | 单位 | 黑暗圣堂武士 | DarkTemplarShakuras | CUnit已定义：DarkTemplarShakuras | 技能缺失 GatewayTrain | Gateway / GatewayTrain / 75瓦斯，55秒 | 75瓦斯，55秒 |
| 沃拉尊 / Vorazun | 黑暗执政官 | 单位 | 黑暗执政官 | DarkArchon | 未命中：DarkArchon | 官方JSON无生产链 |  |  |
| 沃拉尊 / Vorazun | 海盗船 | 单位 | 海盗船 | CorsairMP | 仅文本/引用命中：CorsairMP | 技能缺失 ProtossBuild | Probe / ProtossBuild / 150晶体矿，100瓦斯，60秒 | 生命120，护盾60，人口2，视野9；150晶体矿，100瓦斯，60秒 |
| 沃拉尊 / Vorazun | 虚空辉光舰 | 单位 | 虚空辉光舰 | VoidRay | 仅文本/引用命中：VoidRay | 生产者和技能均未命中：Stargate / StargateTrain | Stargate / StargateTrain / 250晶体矿，150瓦斯，60.2秒 | 生命150，护盾100，人口4，视野10；250晶体矿，150瓦斯，60.2秒 |
| 沃拉尊 / Vorazun | 先知 | 单位 | 先知 | Oracle | 仅文本/引用命中：Oracle | 生产者和技能均未命中：Stargate / StargateTrain | Stargate / StargateTrain / 100晶体矿，75瓦斯，30秒 | 生命100，护盾60，人口3，视野10；100晶体矿，75瓦斯，30秒 |
| 沃拉尊 / Vorazun | 光子炮台 | 建筑 | 光子炮台 | PhotonCannon | 仅文本/引用命中：PhotonCannon | 技能缺失 GatewayTrain | Gateway / GatewayTrain / 150晶体矿，38秒 | 生命150，护盾150，视野11；150晶体矿，38秒 |
| 沃拉尊 / Vorazun | 黑暗水晶塔 | 建筑 | 黑暗水晶塔 | DarkPylon | 未命中：DarkPylon | 官方JSON无生产链 |  |  |
| 沃拉尊 / Vorazun |  | 单位 | 狂热者 | Zealot | 仅文本/引用命中：Zealot | 技能缺失 GatewayTrain | Gateway / GatewayTrain / 100晶体矿，38秒 | 生命100，护盾50，人口2，视野9；100晶体矿，38秒 |
| 沃拉尊 / Vorazun |  | 建筑 | 传送门 | Gateway | 仅文本/引用命中：Gateway | 技能缺失 ProtossBuild | Probe / ProtossBuild / 150晶体矿，65秒 | 生命500，护盾500，视野9；150晶体矿，65秒 |
| 沃拉尊 / Vorazun |  | 建筑 | 光影议会 | TwilightCouncil | CUnit已定义：TwilightCouncil | 技能缺失 ProtossBuild | Probe / ProtossBuild / 150晶体矿，100瓦斯，50秒 | 生命500，护盾500，视野9；150晶体矿，100瓦斯，50秒 |
| 泽拉图 / Zeratul | 萨尔纳加伏击者 | 单位 | 萨尔纳加伏击者 | ZeratulStalker | CUnit已定义：ZeratulStalker | 生产者和技能均未命中：ZeratulGateway / ZeratulGatewayTrain | ZeratulGateway / ZeratulGatewayTrain / 300晶体矿，50瓦斯，42秒 | 生命100，护盾100，人口2，视野10；300晶体矿，50瓦斯，42秒 |
| 泽拉图 / Zeratul | 萨尔纳加光盾卫士 | 单位 | 萨尔纳加光盾卫士 | ZeratulSentry | CUnit已定义：ZeratulSentry | 生产者和技能均未命中：ZeratulGateway / ZeratulGatewayTrain | ZeratulGateway / ZeratulGatewayTrain / 75晶体矿，150瓦斯，37秒 | 生命120，护盾120，人口2，视野10；75晶体矿，150瓦斯，37秒 |
| 泽拉图 / Zeratul | 虚空圣堂武士 | 单位 | 狂热者 | ZeratulSummonZealot | CUnit已定义：ZeratulSummonZealot | 生产者和技能均未命中：ZeratulGateway / ZeratulGatewayTrain | ZeratulGateway / ZeratulGatewayTrain / 100晶体矿 | 生命100，护盾50，视野9；100晶体矿 |
| 泽拉图 / Zeratul | 超维空间炮 | 建筑 | 光子炮台 | PhotonCannon | 仅文本/引用命中：PhotonCannon | 技能缺失 GatewayTrain | Gateway / GatewayTrain / 150晶体矿，38秒 | 生命150，护盾150，视野11；150晶体矿，38秒 |
| 泽拉图 / Zeratul |  | 单位 | 侦测器 | Observer | 仅文本/引用命中：Observer | 技能缺失 RoboticsFacilityTrain | RoboticsFacility / RoboticsFacilityTrain / 25晶体矿，75瓦斯，25秒 | 生命40，护盾30，人口1，视野11；25晶体矿，75瓦斯，25秒 |
| 泽拉图 / Zeratul |  | 建筑 | 黑暗圣坛 | DarkShrine | CUnit已定义：DarkShrine | 技能缺失 ProtossBuild | Probe / ProtossBuild / 150晶体矿，150瓦斯，100秒 | 生命500，护盾500，视野9；150晶体矿，150瓦斯，100秒 |
| 泽拉图 / Zeratul |  | 建筑 | 传送门 | Gateway | 仅文本/引用命中：Gateway | 技能缺失 ProtossBuild | Probe / ProtossBuild / 150晶体矿，65秒 | 生命500，护盾500，视野9；150晶体矿，65秒 |
| 泽拉图 / Zeratul |  | 建筑 | 折跃机械台 | ZeratulRoboticsFacility | CUnit已定义：ZeratulRoboticsFacility | 技能缺失 ZeratulBuild | Probe / ZeratulBuild / 200晶体矿，100瓦斯，65秒 | 生命450，护盾450，视野9；200晶体矿，100瓦斯，65秒 |
| 扎加拉 / Zagara | 虫后 | 单位 | 虫后 | SwarmQueen | CUnit已定义：SwarmQueen | 技能缺失 TrainQueen | Hatchery / TrainQueen / 50秒 | 50秒 |
| 扎加拉 / Zagara | 跳虫 | 单位 | 跳虫 | Zergling | 仅文本/引用命中：Zergling | 技能缺失 LarvaTrain | Larva / LarvaTrain / 25晶体矿，24秒 | 生命35，人口0.5，视野8；25晶体矿，24秒 |
| 扎加拉 / Zagara | 爆虫 | 单位 | 爆虫 | Baneling | 仅文本/引用命中：Baneling | 生产链已命中 | Zergling / MorphZerglingToBaneling / 25晶体矿，25瓦斯，20秒 | 生命30，人口0.5，视野8；25晶体矿，25瓦斯，20秒 |
| 扎加拉 / Zagara | 畸变体 | 单位 | 畸变体 | InfestedAbomination | CUnit已定义：InfestedAbomination | 生产者和技能均未命中：SILarva / SILarvaTrain | SILarva / SILarvaTrain / 30秒 | 30秒 |
| 扎加拉 / Zagara | 爆蚊 | 单位 | 爆蚊 | Scourge | CUnit已定义：Scourge | 技能缺失 LarvaTrainSwarm | Larva / LarvaTrainSwarm / 1晶体矿，1瓦斯，30秒 | 1晶体矿，1瓦斯，30秒 |
| 扎加拉 / Zagara | 腐化者 | 单位 | 腐化者 | Corruptor | 仅文本/引用命中：Corruptor | 技能缺失 LarvaTrain | Larva / LarvaTrain / 150晶体矿，100瓦斯，40秒 | 生命200，人口2，视野10；150晶体矿，100瓦斯，40秒 |
| 扎加拉 / Zagara | 眼虫 | 单位 | 眼虫 | Overseer | 仅文本/引用命中：Overseer | 官方JSON无生产链 |  |  |
| 扎加拉 / Zagara | 脊针爬虫 | 建筑 | 脊针爬虫 | SpineCrawler | 仅文本/引用命中：SpineCrawler | 生产链已命中 | Drone / ZergBuild / 150晶体矿，50秒 | 生命300，视野11；150晶体矿，50秒 |
| 扎加拉 / Zagara | 孢子爬虫 | 建筑 | 孢子爬虫 | SporeCrawler | 仅文本/引用命中：SporeCrawler | 生产链已命中 | Drone / ZergBuild / 125晶体矿，30秒 | 生命300，视野11；125晶体矿，30秒 |
| 扎加拉 / Zagara | 胆汁喷射体 | 建筑 | 胆汁喷射体 | BileLauncherZagara | 未命中：BileLauncherZagara, BileLauncher | 官方JSON无生产链 |  |  |

## 说明

- `CUnit已定义`：当前 active Mod 对应扫描范围存在同 ID `CUnit`。
- `仅文本/引用命中`：XML/Galaxy 里出现过该 token，但没有同 ID `CUnit` 定义，通常要继续查依赖或补 Catalog。
- `Wiki未匹配官方JSON`：wiki主要部队名称没有映射到官方 JSON，优先补别名表或查是否是召唤物/建筑别称。
- `官方补充未在Wiki`：官方 JSON 有但 wiki主要部队未列，不一定是缺失，常见于工人、英雄、基础建筑或展示项。
