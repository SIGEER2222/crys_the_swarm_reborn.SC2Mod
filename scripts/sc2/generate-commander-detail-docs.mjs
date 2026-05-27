import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = path.resolve(process.argv[2] ?? ".");
const dataRoot = path.join(root, "游戏数据", "官方合作指挥官", "commanders");
const outRoot = path.join(root, "docs", "newdocs", "指挥官细化");
const today = "2026-05-27";

const commanders = [
  ["Abathur", "阿巴瑟"],
  ["Alarak", "阿拉纳克"],
  ["Artanis", "阿塔尼斯"],
  ["Dehaka", "德哈卡"],
  ["Fenix", "菲尼克斯"],
  ["Horner", "霍纳与汉"],
  ["Karax", "凯拉克斯"],
  ["Kerrigan", "凯瑞甘"],
  ["Mengsk", "蒙斯克"],
  ["Nova", "诺娃"],
  ["Raynor", "雷诺"],
  ["Stetmann", "斯台特曼"],
  ["Stukov", "斯托科夫"],
  ["Swann", "斯旺"],
  ["Tychus", "泰凯斯"],
  ["Vorazun", "沃拉尊"],
  ["Zagara", "扎加拉"],
  ["Zeratul", "泽拉图"],
];

const moduleRows = [
  ["01", "顶部技能栏", "CommanderPanelProfile"],
  ["02", "英雄单位及其技能", "CommanderHeroProfile"],
  ["03", "普通单位技能及其进化功能", "CommanderUnitAbilityProfile"],
  ["04", "初始化基地与特殊建筑", "CommanderBaseInitProfile"],
  ["05", "指挥官兵种", "CommanderRosterProfile"],
  ["06", "指挥官精通", "CommanderMasteryProfile"],
  ["07", "指挥官建筑", "CommanderBuildingProfile"],
  ["08", "科技建筑及其升级选项", "CommanderTechBuildingProfile"],
  ["09", "特定地图运输机空投单位", "CommanderCargoLoadoutProfile"],
  ["10", "指挥官特殊机制", "CommanderSpecialMechanicProfile"],
  ["11", "指挥官个性化机制", "CommanderPersonalMechanicProfile"],
];

const heroNotes = {
  Abathur: "heroes.json 当前没有条目；终极进化、莽兽、利维坦先按特殊机制和进化候选整理，是否提升为英雄由 HeroProfile 闭包确认。",
  Alarak: "官方玩法存在阿拉纳克本体，但当前 heroes.json 未列出，需要从 CASC/实机补 HeroProfile、复活和技能闭包。",
  Fenix: "官方玩法存在菲尼克斯多套战甲/人格载体，但当前 heroes.json 未列出，需要从 CASC/实机补 HeroModeProfile。",
  Nova: "官方玩法存在诺娃本体和装备形态切换，但当前 heroes.json 未列出，必须从 CASC/实机补 HeroProfile 与 HeroModeProfile。",
  Stetmann: "官方玩法存在盖瑞/超级盖瑞，但当前 heroes.json 未列出，需要从 CASC/实机补 HeroProfile 与特殊机制闭包。",
  Zeratul: "官方玩法存在泽拉图本体，但当前 heroes.json 未列出，需要从 CASC/实机补 HeroProfile、神器碎片和技能闭包。",
};

const specialFocus = {
  Abathur: "生物质、毒巢、终极进化、共生体。",
  Alarak: "献祭、死亡舰队、升格者能量体系和阿拉纳克英雄链。",
  Artanis: "守护之壳、能量场、亚顿之矛顶部技能。",
  Dehaka: "德哈卡精华、等级成长、原始族群召唤和原始单位进化。",
  Fenix: "菲尼克斯战甲切换、英雄人格载体和保存数据网。",
  Horner: "汉/霍纳双军工体系、雇佣军平台、舰队顶部技能。",
  Karax: "亚顿之矛能量、建筑自动维修、单位机械强化。",
  Kerrigan: "凯瑞甘英雄成长、同化光环、欧米伽坑道。",
  Mengsk: "帝国见证人、皇家卫队、劳工/部队切换、统治力资源。",
  Nova: "诺娃装备形态、狮鹫号、精英部队部署和战术空运。",
  Raynor: "轨道控制基地、矿骡、星轨、休伯利安和空投体系。",
  Stetmann: "斯台特区、盖瑞、卫星配置和单位机油/能量体系。",
  Stukov: "感染步兵潮、感染建筑、末日巨兽和亚历山大号。",
  Swann: "德拉肯激光钻机、建筑灭火、协同建造和机械工厂体系。",
  Tychus: "不法之徒招募、装备购买、酒吧/三类装备建筑和奥丁。",
  Vorazun: "暗影卫队、黑暗水晶塔、时间停止和隐形加成。",
  Zagara: "扎加拉英雄、虫群数量、免费爆虫和虫巢部队。",
  Zeratul: "神器碎片、泽拉图英雄、传奇军团和预言者构造体。",
};

const personalFocus = {
  Abathur: "生物质驱动单位成长，终极进化和毒巢需要 runtime hook 记录堆叠、拾取和单位替换。",
  Alarak: "阿拉纳克本体、献祭和升格者牺牲链要独立于地图初始化。",
  Artanis: "守护之壳与能量场属于全军被动和顶部技能联动，不应写死在单张地图。",
  Dehaka: "精华拾取、等级成长、技能点和原始单位进化必须由指挥官 profile 持有。",
  Fenix: "战甲切换、人格载体与保存数据网需要 HeroModeProfile + UnitReplacementProfile。",
  Horner: "汉的雇佣军与霍纳舰队是双 roster，生产/空投/顶部技能需要统一 profile。",
  Karax: "建筑自动维修、亚顿之矛能量与机械单位强化应由个人机制 profile 接入。",
  Kerrigan: "凯瑞甘英雄技能、同化资源和欧米伽坑道应由英雄与特殊机制模块共同接入。",
  Mengsk: "劳工/部队切换、皇家卫队经验、统治力资源需要独立状态机。",
  Nova: "诺娃形态切换会改变武器、技能、行为和装备，应由 CommanderHeroModeProfile + hook 接入。",
  Raynor: "星轨、矿骡、空投和休伯利安要从个人机制 profile 统一组装。",
  Stetmann: "斯台特区配置和盖瑞状态是全局网络机制，需要统一记录覆盖范围、模式和能量。",
  Stukov: "感染步兵潮、菌毯和限时单位生成需要 hook 追踪来源与生命周期。",
  Swann: "钻机、建筑灭火和协同建造是本指挥官的核心个人机制。",
  Tychus: "每个不法之徒等价英雄单位，装备购买和队伍上限必须模块化。",
  Vorazun: "隐形加成、黑暗水晶塔召回和时间停止应作为个人机制统一注入。",
  Zagara: "英雄、免费爆虫、虫群数量与单位上限调整要统一由 profile 控制。",
  Zeratul: "神器碎片会动态改写单位、建筑和技能，需要分阶段 profile 和日志。",
};

const cargoLoadouts = {
  Abathur: [
    ["cargo_light", "Roach x4, SwarmQueen x1", "救援/早期运输", "蟑螂抗线，虫后补治疗，不提前给终极进化。"],
    ["cargo_heavy", "Ravager x3, SwarmHost x2, SwarmQueen x1", "阵地突破", "用腐蚀胆汁和虫群宿主压阵；Brutalisk 只放 bonus，避免剧情初段过强。"],
    ["cargo_air", "Mutalisk x6, Viper x1", "空中支援", "异龙负责清杂，飞蛇用于控制；Leviathan 不作为普通空投。"],
    ["bonus_reward", "Brutalisk x1 或 Leviathan x1", "奖励/高潮战斗", "只能在高强度奖励或终局事件使用，并输出特殊机制日志。"],
    ["replacement_squad", "RoachVile x4, Ravager x2", "满级替换", "体现 15 级蟑螂变种和破坏者链。"],
  ],
  Alarak: [
    ["cargo_light", "Supplicant x6, Stalker x2", "救援/前锋", "死徒作为消耗前排，追猎者补机动火力。"],
    ["cargo_heavy", "Supplicant x4, ImmortalTaldarim x2, HighTemplarTaldarim x2", "重型推进", "无情先锋抗重甲，晋升者作为高价值施法位。"],
    ["cargo_air", "WarpPrismTaldarim x1, Stalker x4", "折跃支援", "阿拉纳克没有标准空军，空中场景用战争棱镜投送地面单位。"],
    ["bonus_reward", "ColossusTaldarim x2, HighTemplarTaldarim x2", "奖励火力", "天罚行者和晋升者用于奖励支援，不做常规轻型运输。"],
    ["replacement_squad", "Supplicant x8, HighTemplarTaldarim x2", "牺牲链小队", "为献祭/晋升者机制留空间。"],
  ],
  Artanis: [
    ["cargo_light", "Zealot x6, StalkerAiur x2", "标准救援", "狂热者前排，龙骑士补远程。"],
    ["cargo_heavy", "ImmortalAiur x2, Archon x2, HighTemplar x2", "重甲突破", "不朽者打重甲，执政官/高阶补范围和能量体系。"],
    ["cargo_air", "PhoenixAiur x4, Observer x1", "空中支援", "凤凰机动控场，侦测器补视野。"],
    ["bonus_reward", "Archon x3, ImmortalAiur x2", "奖励部队", "适合防守反推，不直接给黄金舰队。"],
    ["replacement_squad", "Zealot x8, StalkerAiur x4", "能量场折跃小队", "测试能量场/守护之壳覆盖。"],
  ],
  Dehaka: [
    ["cargo_light", "DehakaZerglingLevel2 x8, DehakaRavasaur x3", "原始前锋", "低成本原始单位，便于测试精华获取。"],
    ["cargo_heavy", "DehakaRoachLevel3 x4, DehakaUltraliskLevel2 x2, ImpalerDehaka x2", "原始攻坚", "点火虫、雷兽和穿刺者组成地面破阵。"],
    ["cargo_air", "DehakaMutaliskLevel3 x6", "空中突袭", "原始异龙作为空中支援；不默认带首领。"],
    ["bonus_reward", "DehakaCoop x1, DehakaGlevig x1", "英雄/族群奖励", "只在允许英雄或首领加入的地图使用。"],
    ["replacement_squad", "DehakaPrimalSwarmHost x2, DehakaCreeper x4", "原始孵化小队", "用于测试原始生成链。"],
  ],
  Fenix: [
    ["cargo_light", "ZealotPurifier x6, Adept x3", "净化者前锋", "轻型步兵和使徒机动补伤害。"],
    ["cargo_heavy", "Immortal x2, ColossusPurifier x2, SentryFenix x2", "机械推进", "重甲、范围和保护者支援。"],
    ["cargo_air", "Scout x4, Observer x1", "空中支援", "折跃侦察机为主，侦测器补视野。"],
    ["bonus_reward", "Carrier x1, ColossusPurifier x2", "奖励火力", "航母只作为奖励/后期支援。"],
    ["replacement_squad", "ZealotPurifier x4, Adept x4, SentryFenix x2", "保存数据网测试", "为人格载体/净化者机制预留验证空间。"],
  ],
  Horner: [
    ["cargo_light", "HHReaper x6, HHHellion x2", "雇佣军突袭", "收割者和恶火体现米拉轻型部队。"],
    ["cargo_heavy", "HHHellionTank x4, Predator x2, HHWidowMine x4", "地面伏击", "恶蝠、掠食者和寡妇雷构成防守支援。"],
    ["cargo_air", "HHWraith x4, HHViking x2, HHRaven x1", "霍纳空军", "怨灵/维京提供制空，铁鸦补支援。"],
    ["bonus_reward", "HHBattlecruiser x1, Liberator x2", "舰队奖励", "至尊战列巡航舰只在高强度场景出现。"],
    ["replacement_squad", "HHReaper x8, HHWidowMine x4", "雇佣军投放", "用于测试死亡效果和快速空投节奏。"],
  ],
  Karax: [
    ["cargo_light", "ZealotPurifier x6, SentryPurifier x2", "机械前锋", "哨兵抗线，激励者补增益。"],
    ["cargo_heavy", "ImmortalAiur x2, Colossus x2, SentryPurifier x2", "机械攻坚", "不朽者/巨像配激励者。"],
    ["cargo_air", "PhoenixPurifier x4, Observer x1", "空中支援", "侦察机和侦测器，避免常规给航母。"],
    ["bonus_reward", "Carrier x1, Colossus x2", "后期奖励", "高价值机械单位用于奖励节点。"],
    ["replacement_squad", "ZealotPurifier x8, ImmortalAiur x2", "自动维修测试", "适合验证建筑/机械维修光环。"],
  ],
  Kerrigan: [
    ["cargo_light", "Zergling x10, Hydralisk x4", "虫群救援", "跳虫包围，刺蛇补输出。"],
    ["cargo_heavy", "Ultralisk x2, Hydralisk x6, SwarmQueen x1", "虫群攻坚", "雷兽和刺蛇推进，虫后补支援。"],
    ["cargo_air", "MutaliskBroodlord x6, Broodlord x2", "空中虫群", "异龙先行，巢虫领主只给后期空中支援。"],
    ["bonus_reward", "K5Kerrigan x1, Ultralisk x2", "英雄奖励", "只有地图允许英雄参战时使用。"],
    ["replacement_squad", "Zergling x16, Hydralisk x4", "同化光环测试", "大量低成本单位便于验证资源收益。"],
  ],
  Mengsk: [
    ["cargo_light", "TrooperMengsk x8, TrooperMengskAA x2", "帝国步兵", "基础冲锋队和防空火箭筒。"],
    ["cargo_heavy", "MarauderMengsk x3, SiegeTankMengsk x2, RavenMengsk x1", "皇家支援", "壁垒卫士、冲击分队和见证者。"],
    ["cargo_air", "VikingMengskFighter x4, MedivacMengsk x1", "帝国空军", "天空之怒和仲裁机支援。"],
    ["bonus_reward", "BattlecruiserMengsk x1, ThorMengsk x1", "皇家奖励", "高价值皇家卫队只在奖励或终局投放。"],
    ["replacement_squad", "SCVMengsk x4, TrooperMengskImproved x6", "劳工/武装切换测试", "用于验证劳工和冲锋队切换链。"],
  ],
  Nova: [
    ["cargo_light", "MarineNova x4, MarauderNova x2", "精英步兵", "低数量高质量，符合诺娃精英部队。"],
    ["cargo_heavy", "GoliathNova x2, SiegeTankNova x1, RavenNova x1", "机械支援", "强击歌利亚、重型坦克和铁鸦。"],
    ["cargo_air", "BansheeNova x2, LiberatorNova x1, RavenNova x1", "狮鹫空投支援", "女妖/解放者空中支援。"],
    ["bonus_reward", "GhostNova x2, RavenNova x1", "隐秘奖励", "特战幽灵只在隐秘/奖励目标中投放。"],
    ["replacement_squad", "HellbatNova x2, MarineNova x4, RavenNova x1", "战术空运测试", "用于验证精英单位低数量空运。"],
  ],
  Raynor: [
    ["cargo_light", "Marine x8, Medic x2, Firebat x2", "生化救援", "陆战队、医疗兵、火蝠，适合早期地图救援。"],
    ["cargo_heavy", "Marauder x4, Siege Tank x2, Medic x2", "地面攻坚", "劫掠者和攻城坦克推进。"],
    ["cargo_air", "Viking x4, Banshee x2", "空中支援", "维京制空，女妖对地。"],
    ["bonus_reward", "Battlecruiser x1, Siege Tank x2", "后期奖励", "战列巡航舰只用于高强度奖励。"],
    ["replacement_squad", "Marine x12, Medic x3", "轨道空投测试", "用于测试生化空投和治疗链。"],
  ],
  Stetmann: [
    ["cargo_light", "ZerglingStetmann x10, HydraliskStetmann x4", "机械虫群", "轻型机械虫群，依赖斯台特区。"],
    ["cargo_heavy", "UltraliskStetmann x2, LurkerStetmann x2, InfestorStetmann x1", "重型机械虫群", "雷兽、潜伏者和感染者组合。"],
    ["cargo_air", "CorruptorStetmann x4, BroodLordStetmann x2, OverseerStetmann x1", "空中机械虫群", "腐化者、巢式战列空母和眼虫。"],
    ["bonus_reward", "SuperGaryStetmann x1, HydraliskStetmann x4", "超级盖瑞奖励", "只在允许特殊英雄时使用。"],
    ["replacement_squad", "RoachStetmann x4, RavagerStetmann x3", "机油/能量测试", "用于验证机械蟑螂和破坏者链。"],
  ],
  Stukov: [
    ["cargo_light", "StukovInfestedMarine x10, StukovInfestedCivilian x8", "感染潮", "大量感染步兵作为救援消耗单位。"],
    ["cargo_heavy", "StukovInfestedSiegeTank x2, SwarmQueen x2", "阵地支援", "感染攻城坦克和虫后控制。"],
    ["cargo_air", "StukovInfestedWraith x4, SwarmQueen x1", "空中感染支援", "感染怨灵配虫后。"],
    ["bonus_reward", "StukovInfestedSiegeTank x3, StukovInfestedMarine x12", "防守奖励", "适合防守地图的增援潮。"],
    ["replacement_squad", "StukovInfestedCivilian x16, StukovInfestedMarine x8", "感染生成测试", "用于验证感染体生命周期。"],
  ],
  Swann: [
    ["cargo_light", "Hellbat x4, Goliath x2", "机械救援", "恶蝠抗线，歌利亚补对空。"],
    ["cargo_heavy", "Siege Tank x2, Goliath x4, ScienceVessel x1", "重型机械支援", "攻城坦克、歌利亚和科学船。"],
    ["cargo_air", "Wraith x4, ScienceVessel x1", "空中机械支援", "怨灵和科学船。"],
    ["bonus_reward", "Hercules x1, Siege Tank x2", "运输机战术奖励", "大力神只作为战术运输/奖励场景。"],
    ["replacement_squad", "SCV x4, Goliath x4", "修理/协同建造测试", "用于验证维修和建筑灭火链。"],
  ],
  Tychus: [
    ["cargo_light", "TychusCoop x1, TychusMedic x1", "不法之徒救援", "泰凯斯和尼卡拉组成最小英雄小队。"],
    ["cargo_heavy", "TychusCoop x1, TychusFirebat x1, TychusMarauder x1, TychusMedic x1", "正面推进", "猛男前排加治疗。"],
    ["cargo_air", "TychusWarhound x1, TychusReaper x1, TychusMedic x1", "机动支援", "泰凯斯无常规空军，空中场景用医疗运输机投送不法之徒。"],
    ["bonus_reward", "TychusCoop x1, TychusSpectre x1, TychusGhost x1", "鬼手奖励", "高价值施法不法之徒只在奖励场景使用。"],
    ["replacement_squad", "TychusCoop x1, TychusHERC x1, TychusMedic x1", "队伍上限测试", "用于验证不法之徒招募、复活和装备。"],
  ],
  Vorazun: [
    ["cargo_light", "ZealotShakuras x6, Stalker x3", "暗影前锋", "百夫长抗线，追猎者远程支援。"],
    ["cargo_heavy", "DarkTemplarShakuras x4, Stalker x4, Oracle x1", "隐秘突袭", "黑暗圣堂武士作为核心，但不在早期轻型场景滥用。"],
    ["cargo_air", "PhoenixShakuras x4, VoidRay x2", "空中暗影支援", "海盗船和虚空辉光舰。"],
    ["bonus_reward", "DarkTemplarShakuras x6, Oracle x2", "隐形奖励", "适合隐秘地图或时间停止联动。"],
    ["replacement_squad", "ZealotShakuras x8, DarkTemplarShakuras x2", "隐形/召回测试", "用于验证黑暗水晶塔和隐形加成。"],
  ],
  Zagara: [
    ["cargo_light", "Zergling x12, Baneling x6", "虫群突袭", "跳虫和爆虫快速清场。"],
    ["cargo_heavy", "Aberration x3, SwarmQueen x2, Baneling x8", "重型虫群", "畸变体抗线，虫后支援。"],
    ["cargo_air", "Corruptor x4, Scourge x8", "空中虫群", "腐化者和爆蚊制空。"],
    ["bonus_reward", "ZagaraVoidCoop x1, Aberration x3", "英雄奖励", "只有允许英雄时投放扎加拉。"],
    ["replacement_squad", "Zergling x20, Baneling x10", "数量上限测试", "用于验证虫群数量和免费爆虫。"],
  ],
  Zeratul: [
    ["cargo_light", "ZealotZeratul x6, StalkerZeratul x3", "萨尔纳加前锋", "狂热者和伏击者。"],
    ["cargo_heavy", "ImmortalZeratul x2, DisruptorZeratul x2, SentryZeratul x2", "神器科技攻坚", "执行者、禁绝者和光盾卫士。"],
    ["cargo_air", "WarpPrismZeratul x1, ObserverZeratul x1, StalkerZeratul x4", "虚空阵列投送", "泽拉图空中场景以虚空阵列船投送地面单位。"],
    ["bonus_reward", "ImmortalZeratul x3, DisruptorZeratul x2", "神器奖励", "高科技单位只在奖励节点出现。"],
    ["replacement_squad", "ZealotZeratul x8, SentryZeratul x2", "神器阶段测试", "用于验证神器碎片后的单位替换。"],
  ],
};

const originalModCargoEvidence = [
  {
    commanders: ["All"],
    source: "原始mod/Mods/XM/XMCore.SC2Mod/Base.SC2Data/Lib67C0F0E7.galaxy",
    implementation: "SOAStickyPoint、SOAStickyLine、AddCasterGroup、DropPodT、DropPodZ、DropCargoAndExit",
    meaning: "已有顶部技能点选、隐藏施法者分组、空投舱视觉和卸载后撤离的通用基础。",
    status: "应抽成 XMFinal 的通用投送 primitive。",
  },
  {
    commanders: ["All"],
    source: "原始mod/Mods/XM/XMCore.SC2Mod/Base.SC2Data/GameData/UserData.xml",
    implementation: "SOAStickyPoint UserData: AbilityPre、AbilityFin、CasterUnit",
    meaning: "顶栏点目标技能已经有数据驱动配置位。",
    status: "可复用为运输/空投顶部技能的配置入口。",
  },
  {
    commanders: ["All"],
    source: "原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/AbilData.xml",
    implementation: "SpecOpsDropshipTransport",
    meaning: "XMFinal 已经持有特种运输机运输能力定义。",
    status: "运行时 owner 优先沿用并参数化。",
  },
  {
    commanders: ["All"],
    source: "原始mod/Maps/XM/thanson01、ttychus01、ttychus04",
    implementation: "ColonyShipTransport、SpecialOpsDropship、UnitCargoCreate、卸载后返航/消失",
    meaning: "地图侧已有运输机货舱、卸载、返航和剧情运输模式。",
    status: "地图保留场景语义，单位组合改由 profile 解析。",
  },
  {
    commanders: ["Dehaka", "Horner", "Mengsk", "Nova", "Stetmann", "Stukov", "Swann", "Tychus"],
    source: "原始mod/Maps/XM/traynor01.SC2Map/MapScript.galaxy",
    implementation: "开场 SpecialOpsDropship 按 libE0EAE146_gv_commander 塞不同货舱；Dehaka/Gary 改为地面生成",
    meaning: "已有按指挥官替换开场运输/救援小队的地图素材。",
    status: "应迁移为 map=traynor01 的 cargo_light 或 opening_rescue profile。",
  },
  {
    commanders: ["Dehaka", "Horner", "Mengsk", "Nova", "Stetmann", "Swann", "Tychus"],
    source: "原始mod/Maps/XM/thanson01.SC2Map/MapScript.galaxy",
    implementation: "Firebat dropship 按 commander 替换货舱，默认 Firebat + Medic",
    meaning: "已有轻型救援运输机的 commander 分支。",
    status: "应迁移为 cargo_light profile，并保留地图卸载/返航点。",
  },
  {
    commanders: ["Dehaka", "Horner", "Mengsk", "Nova", "Stetmann", "Stukov", "Swann"],
    source: "原始mod/Maps/XM/ttychus02.SC2Map/MapScript.galaxy",
    implementation: "Siege tank dropship 按 commander 替换货舱，卸载后 DropCargoAndExit",
    meaning: "已有重型支援运输机的 commander 分支。",
    status: "应迁移为 cargo_heavy profile，并保留 Stukov/Mengsk 等后置 hook。",
  },
  {
    commanders: ["Horner", "Nova", "Stukov", "Swann"],
    source: "原始mod/Maps/XM/thorner02.SC2Map/MapScript.galaxy",
    implementation: "按 commander 决定运输单位或货舱，例如 Stukov HerculesSCV、Nova SiegeTank_BlackOps、Swann HerculesSwann",
    meaning: "已有运输单位本身也可由 commander 替换的地图素材。",
    status: "应迁移为 CommanderMapDropProfile 的 TransportUnit/TransportAbility 字段。",
  },
  {
    commanders: ["All"],
    source: "原始mod/Maps/XM/thorner04.SC2Map/MapScript.galaxy",
    implementation: "gf_DropKillTeamViaHercules 创建 Hercules、UnitCargoCreate 塞兵、卸货后攻击",
    meaning: "已有可复用的大力神空投执行器，但主要服务敌方/剧情 kill team。",
    status: "可参考执行流程；不能直接当玩家指挥官 loadout 来源。",
  },
  {
    commanders: ["Tychus"],
    source: "原始mod/Mods/XM/XMTychus.SC2Mod/Base.SC2Data/Lib81FF3B49.galaxy",
    implementation: "InitializeTychusEvent -> SOAStickyPoint(1, \"TychusMedicTransport\")",
    meaning: "泰凯斯医疗运输机已经接入顶部技能点选和施法者注册。",
    status: "可作为泰凯斯投送技能接入口；货舱组合仍由本 profile 设计。",
  },
  {
    commanders: ["Nova"],
    source: "原始mod/Mods/XM/XMNova.SC2Mod/Base.SC2Data/Lib0940FFB7.galaxy",
    implementation: "NovaCaster -> SOAStickyPoint(1, \"NovaGriffinTransport\")",
    meaning: "诺娃狮鹫运输已经接入顶部技能点选。",
    status: "可作为诺娃战术空运接入口；单位组合需按精英部队低数量设计。",
  },
  {
    commanders: ["Horner"],
    source: "原始mod/Mods/XM/XMMira.SC2Mod/Base.SC2Data/GameData",
    implementation: "MercAirDrop、MedivacMira、CommandCenterTransportMira",
    meaning: "米拉/霍纳已有雇佣军空投、医疗运输机和基地运输相关数据。",
    status: "可参考空降表现和运输按钮；场景 loadout 仍需显式配置。",
  },
  {
    commanders: ["Stukov"],
    source: "原始mod/Mods/XM/XMStukov.SC2Mod/Base.SC2Data/GameData",
    implementation: "OverlordTransportStukov、StukovBansheeTransport、SIInfestedBunkerTransport",
    meaning: "斯托科夫已有王虫、女妖、感染地堡等运输能力。",
    status: "应保留感染单位生命周期和运输容器规则。",
  },
  {
    commanders: ["Dehaka"],
    source: "原始mod/Mods/XM/XMDehaka.SC2Mod/Base.SC2Data/GameData",
    implementation: "NydusDestroyerDeepTunnel、GreaterNydusDestroyerDeepTunnel、DehakaNydusDestroyerTopBar",
    meaning: "德哈卡已有坑道/深挖移动和顶部召唤链。",
    status: "这是投送/位移机制线索，不等同于普通货舱。",
  },
  {
    commanders: ["Swann"],
    source: "原始mod/Maps/XM/ttychus01.SC2Map/MapScript.galaxy",
    implementation: "swannDropship 使用 SpecialOpsDropship + SpecOpsDropshipTransport",
    meaning: "已有斯旺剧情运输机卸载后返航模式。",
    status: "可作为地图运输机流程模板，单位组合改为 Swann loadout。",
  },
  {
    commanders: ["Raynor"],
    source: "原始mod/Maps/XM/ttychus04.SC2Map/MapScript.galaxy",
    implementation: "UnitCargoCreate(lv_dropship, \"Marine\", 8) + SpecOpsDropshipTransport",
    meaning: "已有陆战队货舱装载并由运输机卸载的地图实现。",
    status: "应改成 Raynor cargo_light profile，而不是硬编码 Marine x8。",
  },
  {
    commanders: ["All"],
    source: "原始mod 全局搜索",
    implementation: "未命中 XM_CreateCommanderCargoSquad 或 CommanderCargoLoadoutProfile",
    meaning: "原始mod 只有素材和地图硬编码，没有现成的指挥官货舱配置框架。",
    status: "本模块需要新建 profile/factory 抽象，不能照搬地图 if/else。",
  },
];

const cargoSourceStatusByCommander = {
  Dehaka: "已有 Dehaka 坑道/深挖和多张地图 commander 分支；此处是场景小队设计，不把坑道当普通货舱。",
  Horner: "已有 XMMira 雇佣军空投/医疗运输机与地图货舱分支可参考；此处是霍纳场景 loadout 草案。",
  Mengsk: "已有多张地图为 Mengsk 配置货舱并调用皇家卫队 hook；此处需保留后置 hook。",
  Nova: "已有 NovaGriffinTransport 顶部技能点选链和多张地图货舱分支；此处只规定狮鹫/运输机落地单位组合。",
  Raynor: "已有 ttychus04 Marine 货舱地图例子；此处将硬编码 Marine x8 泛化成 Raynor profile。",
  Stetmann: "已有多张地图为 Stetmann 配置货舱；此处需与斯台特区/盖瑞机制分开审计。",
  Stukov: "已有 Stukov 多个运输容器和地图货舱分支；此处需保留感染单位生命周期和容器限制。",
  Swann: "已有 ttychus01/多张地图 Swann dropship 分支；此处将流程参数化为 Swann loadout。",
  Tychus: "已有 TychusMedicTransport 顶部技能点选链和地图不法之徒货舱分支；此处只规定不法之徒投送组合。",
};

const specialTerms = {
  Abathur: ["biomass", "toxic", "brutalisk", "leviathan", "symbiote", "ultimate"],
  Alarak: ["alarak", "ascendant", "sacrifice", "deathfleet", "empower", "mothership"],
  Artanis: ["guardian", "shield", "power", "spear", "pylon"],
  Dehaka: ["dehaka", "essence", "primal", "pack", "mutation"],
  Fenix: ["fenix", "champion", "suit", "armor", "conservator", "network"],
  Horner: ["horner", "han", "mira", "strike", "fleet", "magmine", "platform"],
  Karax: ["karax", "repair", "chrono", "solar", "spear", "matrix"],
  Kerrigan: ["kerrigan", "assimilation", "omega", "malignant", "hero"],
  Mengsk: ["mengsk", "royal", "trooper", "laborer", "mandate", "witness", "imperial"],
  Nova: ["nova", "griffin", "stance", "kit", "cloak", "blackops", "holo", "decoy"],
  Raynor: ["raynor", "hyperion", "banshee", "mule", "drop", "orbital", "stim"],
  Stetmann: ["stetmann", "gary", "stetellite", "zone", "egonergy", "oil"],
  Stukov: ["stukov", "infested", "alexander", "apocalisk", "colonist", "bunker"],
  Swann: ["swann", "laser", "drill", "flaming", "fire", "hercules", "concentrated"],
  Tychus: ["tychus", "outlaw", "odin", "medivac", "hero", "squad", "lonewolf"],
  Vorazun: ["vorazun", "dark", "shadow", "time", "blackhole", "cloak"],
  Zagara: ["zagara", "baneling", "scourge", "frenzy", "swarm", "hunter"],
  Zeratul: ["zeratul", "artifact", "prophecy", "legendary", "avatar", "void"],
};

const genericFaces = new Set([
  "move",
  "stop",
  "attack",
  "attackredirect",
  "attackallowsinvulnerable",
  "attackchampions",
  "moveholdposition",
  "movepatrol",
  "cancel",
  "cancelbuilding",
  "cancelmorph",
  "cancelupgrade",
  "canceltrain",
  "halt",
  "holdfire",
  "weaponsfree",
  "selectbuilder",
  "rally",
  "rallyworkers",
  "smart",
]);

const techWords = ["research", "upgrade", "learn", "techlab", "armory", "engineering", "forge", "cybernetics", "evolution", "spire", "academy", "bay", "core"];
const modeWords = ["morph", "mode", "stance", "kit", "swap", "transform", "burrow", "uproot", "siege", "unsiege", "evolve", "lift", "land", "deploy"];
const panelWords = ["calldown", "call", "topbar", "global", "griffin", "hyperion", "banshee", "strike", "nuke", "mend", "toxic", "solar", "chrono", "overcharge", "beam", "time", "odin", "airstrike", "summon", "deploy", "fleet", "drill"];
const baseBuildingWords = ["commandcenter", "nexus", "hatchery", "lair", "hive", "orbital", "planetary", "townhall", "refinery", "extractor", "assimilator", "pylon", "depot", "drill", "platform", "bar", "compound", "bunker", "omega", "nydus"];

function readJson(fileName, fallback) {
  const file = path.join(fileName);
  if (!fs.existsSync(file)) return fallback;
  const raw = fs.readFileSync(file, "utf8").trim();
  if (!raw) return fallback;
  return JSON.parse(raw);
}

function asArray(value) {
  if (Array.isArray(value)) return value;
  if (value === null || value === undefined) return [];
  return [value];
}

function text(value) {
  if (value === null || value === undefined || value === "") return "-";
  return String(value);
}

function mdCell(value, limit = 140) {
  let s = text(value)
    .replace(/\r?\n/g, " / ")
    .replace(/\|/g, "\\|")
    .replace(/\s+/g, " ")
    .trim();
  if (s.length > limit) s = `${s.slice(0, limit - 3)}...`;
  return s || "-";
}

function mdCode(value, limit = 180) {
  const s = mdCell(value, limit);
  return s === "-" ? "-" : `\`${s.replace(/`/g, "\\`")}\``;
}

function listCode(values, limit = 8) {
  const arr = asArray(values).filter(Boolean).map(String);
  if (arr.length === 0) return "-";
  const shown = arr.slice(0, limit).map((x) => `\`${mdCell(x, 80).replace(/`/g, "\\`")}\``);
  if (arr.length > limit) shown.push(`另 ${arr.length - limit} 项`);
  return shown.join(", ");
}

function abilityCmd(cmd) {
  if (!cmd) return "-";
  if (typeof cmd === "string") return cmd;
  if (typeof cmd !== "object") return String(cmd);
  const abil = cmd.abil ?? cmd.Abil ?? "";
  const c = cmd.cmd ?? cmd.Cmd ?? "";
  if (!abil && !c) return "-";
  return `${abil}:${c}`;
}

function abilityCmds(cmds) {
  return asArray(cmds).map(abilityCmd).filter((x) => x !== "-");
}

function listPrestigeValues(values, limit = 8) {
  return listCode(asArray(values).map((value) => {
    if (value && typeof value === "object") return abilityCmd(value);
    return value;
  }), limit);
}

function table(headers, rows, emptyText = "暂无自动命中项。") {
  const lines = [];
  lines.push(`| ${headers.join(" | ")} |`);
  lines.push(`|${headers.map(() => "---").join("|")}|`);
  if (!rows || rows.length === 0) {
    lines.push(`| ${headers.map((_, idx) => (idx === headers.length - 1 ? mdCell(emptyText) : "-")).join(" | ")} |`);
  } else {
    for (const row of rows) {
      lines.push(`| ${row.map((x) => mdCell(x)).join(" | ")} |`);
    }
  }
  lines.push("");
  return lines;
}

function bulletList(items, emptyText = "暂无自动命中项。", limit = 20) {
  const lines = [];
  const arr = asArray(items).filter(Boolean);
  if (arr.length === 0) {
    lines.push(`- ${emptyText}`);
  } else {
    for (const item of arr.slice(0, limit)) lines.push(`- ${item}`);
    if (arr.length > limit) lines.push(`- 还有 ${arr.length - limit} 项，后续从源 JSON 继续展开。`);
  }
  lines.push("");
  return lines;
}

function writeMarkdown(filePath, lines) {
  const trimmed = [...lines];
  while (trimmed.length > 0 && trimmed[trimmed.length - 1] === "") trimmed.pop();
  fs.writeFileSync(filePath, `${trimmed.join("\n")}\n`, "utf8");
}

function unitInfo(entry) {
  const u = entry?.unit ?? {};
  const unitIds = asArray(entry?.resolved_unit_ids).length > 0 ? entry.resolved_unit_ids : [entry?.unit_id].filter(Boolean);
  const attrs = [
    asArray(u.planes).join("/"),
    asArray(u.attributes).join("/"),
    u.object_type,
    u.object_family,
  ].filter(Boolean).join("; ");
  const cost = [
    `矿:${text(u.minerals)}`,
    `气:${text(u.vespene)}`,
    `人口:${text(u.supply)}`,
    `生命:${text(u.life)}`,
    `护盾:${text(u.shields)}`,
    `能量:${text(u.energy)}`,
  ].join(" ");
  return {
    name: entry?.name || entry?.id || "-",
    id: entry?.id || "-",
    unitId: entry?.unit_id || u.id || "-",
    unitIds: unitIds.join(", "),
    attrs: attrs || "-",
    cost,
    tooltip: entry?.tooltip || "-",
  };
}

function unitRows(entries) {
  return asArray(entries).map((entry) => {
    const info = unitInfo(entry);
    return [info.name, `\`${info.id}\``, `\`${info.unitIds}\``, info.attrs, info.cost, info.tooltip];
  });
}

function idsFor(entries) {
  const out = new Set();
  for (const entry of asArray(entries)) {
    for (const value of [entry?.id, entry?.unit_id, ...(entry?.resolved_unit_ids ?? [])]) {
      if (value) out.add(String(value).toLowerCase());
    }
  }
  return out;
}

function flattenCards(commandCards) {
  const rows = [];
  for (const obj of asArray(commandCards)) {
    for (const card of asArray(obj.cards)) {
      for (const b of asArray(card.buttons)) {
        const button = b.button ?? {};
        const face = b.face ?? button.id ?? "";
        rows.push({
          objectId: obj.id ?? "",
          objectUnitId: obj.unit_id ?? "",
          objectName: obj.name ?? obj.id ?? "",
          objectType: obj.object_type ?? "",
          cardId: card.card_id ?? "",
          face,
          type: b.type ?? "",
          abilCmd: b.abil_cmd ?? "",
          requirements: b.requirements ?? "",
          row: b.row ?? "",
          column: b.column ?? "",
          buttonId: button.id ?? face,
          buttonName: button.name ?? button.id ?? face,
          tooltip: button.tooltip ?? "",
        });
      }
    }
  }
  return rows;
}

function hay(row) {
  return [
    row.objectId,
    row.objectUnitId,
    row.objectName,
    row.objectType,
    row.face,
    row.type,
    row.abilCmd,
    row.requirements,
    row.buttonId,
    row.buttonName,
    row.tooltip,
  ].join(" ").toLowerCase();
}

function hasAny(row, words) {
  const h = hay(row);
  return words.some((w) => h.includes(w.toLowerCase()));
}

function isGeneric(row) {
  const face = String(row.face || row.buttonId || "").toLowerCase();
  if (genericFaces.has(face)) return true;
  const ac = String(row.abilCmd || "").toLowerCase();
  return ac === "move,move" || ac === "stop,stop" || ac === "attack,execute";
}

function uniqueRows(rows) {
  const seen = new Set();
  const out = [];
  for (const row of rows) {
    const key = [row.objectId, row.face, row.abilCmd, row.requirements].join("|");
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(row);
  }
  return out;
}

function buttonRows(rows, limit = 30) {
  const selected = uniqueRows(rows).slice(0, limit);
  const out = selected.map((r) => [
    r.objectName || r.objectId,
    `\`${r.face || "-"}\``,
    r.buttonName || "-",
    r.abilCmd ? `\`${r.abilCmd}\`` : "-",
    r.requirements ? `\`${r.requirements}\`` : "-",
    r.tooltip || "-",
  ]);
  if (rows.length > limit) {
    out.push(["...", "...", "...", "...", "...", `还有 ${rows.length - limit} 项，后续从 command_cards.json 继续展开。`]);
  }
  return out;
}

function commandRowsFromProgression(perks, defaults = []) {
  const rows = [];
  for (const cmd of asArray(defaults)) {
    rows.push(["默认能力", "-", abilityCmd(cmd), "-", "来自 commander.json"]);
  }
  for (const perk of asArray(perks)) {
    for (const cmd of abilityCmds(perk.ability_commands)) {
      rows.push([`Lv${perk.level} ${perk.name || perk.id}`, perk.level, cmd, listCode(perk.upgrades, 4), perk.tooltip || "-"]);
    }
  }
  return rows;
}

function max30Value(mastery) {
  const incs = asArray(mastery.point_increments);
  if (incs.length === 0) return "-";
  const n = Number(incs[0]);
  if (!Number.isFinite(n)) return `30 x ${incs.join("/")}`;
  const value = Math.round(n * 30 * 10000) / 10000;
  const fmt = mastery.value_format || "~A~";
  return fmt.includes("~A~") ? fmt.replace("~A~", String(value)) : `${value} (${fmt})`;
}

function progressionPerks(progression) {
  return asArray(progression?.perks).sort((a, b) => Number(a.level ?? 0) - Number(b.level ?? 0));
}

function progressionMasteries(progression) {
  return asArray(progression?.masteries).sort((a, b) => Number(a.category ?? 0) - Number(b.category ?? 0) || String(a.id).localeCompare(String(b.id)));
}

function classifyRoster(roster, units, buildings, heroes) {
  const unitIds = idsFor(units);
  const buildingIds = idsFor(buildings);
  const heroIds = idsFor(heroes);
  const unknown = [];
  for (const entry of asArray(roster)) {
    const keys = [entry?.id, entry?.unit_id, ...(entry?.resolved_unit_ids ?? [])].filter(Boolean).map((x) => String(x).toLowerCase());
    if (keys.some((x) => unitIds.has(x) || buildingIds.has(x) || heroIds.has(x))) continue;
    unknown.push(entry);
  }
  return unknown;
}

function objectRowsForRoster(entries, limit = 25) {
  return asArray(entries).slice(0, limit).map((entry) => {
    const info = unitInfo(entry);
    return [info.name, `\`${info.id}\``, `\`${info.unitIds}\``, info.attrs, info.tooltip];
  });
}

function specialRows(perks, commander) {
  const terms = specialTerms[commander] ?? [];
  return asArray(perks)
    .filter((p) => {
      const h = [p.id, p.name, p.tooltip, ...(p.upgrades ?? []), ...abilityCmds(p.ability_commands)].join(" ").toLowerCase();
      return terms.some((t) => h.includes(t));
    })
    .map((p) => `${p.name || p.id} (${p.id})`);
}

function prestigeRows(prestiges) {
  return asArray(prestiges).map((p) => [
    `\`${p.id}\``,
    p.name || "-",
    `\`${p.primary_upgrade || "-"}\``,
    listPrestigeValues(p.disable_units),
    listPrestigeValues(p.enable_units),
    listPrestigeValues(p.disable_abils),
    listPrestigeValues(p.upgrade_supplement_ids),
  ]);
}

function upgradeRows(upgrades, limit = 30) {
  const rows = asArray(upgrades).slice(0, limit).map((u) => [
    `\`${u.id}\``,
    `\`${u.parent || "-"}\``,
    u.name || "-",
    String(u.effect_count ?? "-"),
    u.tooltip || "-",
  ]);
  if (upgrades.length > limit) rows.push(["...", "...", "...", "...", `还有 ${upgrades.length - limit} 项，详见 upgrades.json。`]);
  return rows;
}

function originalCargoEvidenceRows(en) {
  return originalModCargoEvidence
    .filter((item) => item.commanders.includes("All") || item.commanders.includes(en))
    .map((item) => [
      item.commanders.includes("All") ? "通用" : en,
      `\`${item.source}\``,
      item.implementation,
      item.meaning,
      item.status,
    ]);
}

function cargoLoadoutRows(en) {
  return asArray(cargoLoadouts[en]).map(([scenarioKind, loadout, purpose, note]) => [
    `\`${scenarioKind}\``,
    loadout,
    purpose,
    note,
    cargoSourceStatusByCommander[en] ?? "设计草案；需按原始mod地图流程和实机日志继续校验。",
  ]);
}

function fileName(index, en, zh) {
  return `${String(index + 1).padStart(2, "0")}-${zh}-${en}.md`;
}

function writeCommanderDoc(index, en, zh, allSummaries) {
  const dir = path.join(dataRoot, en);
  const commander = readJson(path.join(dir, "commander.json"), {});
  const progression = readJson(path.join(dir, "progression.json"), {});
  const perks = progressionPerks(progression);
  const masteries = progressionMasteries(progression);
  const prestiges = readJson(path.join(dir, "prestiges.json"), []);
  const heroes = readJson(path.join(dir, "heroes.json"), []);
  const units = readJson(path.join(dir, "units.json"), []);
  const buildings = readJson(path.join(dir, "buildings.json"), []);
  const roster = readJson(path.join(dir, "roster.json"), []);
  const commandCards = readJson(path.join(dir, "command_cards.json"), []);
  const upgrades = readJson(path.join(dir, "upgrades.json"), []);
  const otherTechEntries = readJson(path.join(dir, "other-tech-entries.json"), []);
  const buttons = flattenCards(commandCards);
  const nonGenericButtons = buttons.filter((b) => !isGeneric(b));
  const heroIdSet = idsFor(heroes);
  const unitIdSet = idsFor(units);
  const buildingIdSet = idsFor(buildings);

  const heroButtons = nonGenericButtons.filter((b) => {
    const keys = [b.objectId, b.objectUnitId].filter(Boolean).map((x) => x.toLowerCase());
    return keys.some((x) => heroIdSet.has(x)) || String(b.objectType).toLowerCase() === "hero";
  });
  const unitButtons = nonGenericButtons.filter((b) => {
    const keys = [b.objectId, b.objectUnitId].filter(Boolean).map((x) => x.toLowerCase());
    return keys.some((x) => unitIdSet.has(x));
  });
  const buildingButtons = nonGenericButtons.filter((b) => {
    const keys = [b.objectId, b.objectUnitId].filter(Boolean).map((x) => x.toLowerCase());
    return keys.some((x) => buildingIdSet.has(x));
  });
  const modeButtons = nonGenericButtons.filter((b) => hasAny(b, modeWords));
  const techButtons = nonGenericButtons.filter((b) => hasAny(b, techWords));
  const panelButtons = nonGenericButtons.filter((b) => hasAny(b, panelWords));
  const specialButtons = nonGenericButtons.filter((b) => hasAny(b, specialTerms[en] ?? []));
  const baseBuildings = buildings.filter((b) => {
    const h = [b.id, b.unit_id, b.name, b.tooltip, ...(b.resolved_unit_ids ?? [])].join(" ").toLowerCase();
    return baseBuildingWords.some((w) => h.includes(w));
  });
  const unknownRoster = classifyRoster(roster, units, buildings, heroes);
  const defaultCommands = asArray(commander.default_ability_commands);
  const allAbilityRows = commandRowsFromProgression(perks, defaultCommands);

  const summary = {
    en,
    zh,
    file: fileName(index, en, zh),
    commanderId: commander.id ?? "-",
    heroes: heroes.length,
    units: units.length,
    buildings: buildings.length,
    roster: roster.length,
    commandCards: commandCards.length,
    upgrades: upgrades.length,
  };
  allSummaries.push(summary);

  const lines = [];
  lines.push(`# ${zh}（${en}）指挥官细化`);
  lines.push("");
  lines.push(`日期：${today}`);
  lines.push("");
  lines.push("## 当前口径");
  lines.push("");
  lines.push("当前指挥官默认 15 级，不从 1 级开始；精通默认 6 项全部 30 点；威望默认只取正面收益，不直接启用官方 `PlayerPrestige`。`initial` 只作为官方基础状态审计和差异对照，默认测试和玩法应看 `power_fusion` 最终状态。");
  lines.push("");
  lines.push(`本文件按 \`docs/newdocs/模块拆分\` 的 11 个模块整理 ${zh}。依据 \`游戏数据/官方合作指挥官/commanders/${en}/\` 的当前 JSON 生成；具体 Ability、Behavior、Weapon、Actor、Effect、Requirement 闭包仍需继续追 \`references/sc2-build-96883-casc-export/\` 或实机 \`[XM_DBG]\` 日志。`);
  lines.push("");

  lines.push("## 官方数据摘要");
  lines.push("");
  lines.push(...table(["项", "值"], [
    ["CommanderId", mdCode(commander.id)],
    ["中文名", commander.name || zh],
    ["默认升级", listCode(commander.default_upgrades)],
    ["默认能力命令", listCode(defaultCommands.map(abilityCmd), 12)],
    ["威望 ID", listCode(commander.prestige_ids, 6)],
    ["heroes.json 数量", String(heroes.length)],
    ["roster.json 数量", String(roster.length)],
    ["units.json 数量", String(units.length)],
    ["buildings.json 数量", String(buildings.length)],
    ["command_cards.json 对象数", String(commandCards.length)],
    ["upgrades.json 数量", String(upgrades.length)],
    ["other-tech-entries.json 数量", String(asArray(otherTechEntries).length)],
    ["source", mdCode(commander.source)],
  ]));

  lines.push("roster 样例：");
  lines.push("");
  lines.push("```text");
  lines.push(asArray(roster).slice(0, 24).map((x) => x.id ?? x.unit_id ?? x.name).filter(Boolean).join(", ") || "-");
  lines.push("```");
  lines.push("");

  lines.push("## 15 级解锁摘要");
  lines.push("");
  for (const perk of perks) {
    lines.push(`- ${perk.level}: ${perk.name || perk.id}`);
  }
  if (perks.length === 0) lines.push("- 暂无 progression.perks 数据。");
  lines.push("");

  lines.push("## 模块索引");
  lines.push("");
  lines.push(...table(["序号", "模块", "本文件章节"], moduleRows.map(([num, name]) => [num, name, `\`${num}. ${name}\``])));

  lines.push("## 01. 顶部技能栏");
  lines.push("");
  lines.push("Owner：`CommanderPanelProfile`、`CommanderPanelAbilityProfile`、`CommanderPanelCooldownProfile`、`CommanderPanelChargeProfile`、`CommanderPanelTargetingProfile`、`CommanderPanelModifierProfile`。");
  lines.push("");
  lines.push("### 面板/全局能力候选");
  lines.push("");
  lines.push(...table(["来源", "等级", "AbilityCmd", "关联升级", "说明"], allAbilityRows));
  lines.push("### command card 命中");
  lines.push("");
  lines.push(...table(["对象", "按钮/Face", "显示名", "AbilityCmd", "Requirement", "说明"], buttonRows(panelButtons, 25)));
  lines.push("实现备注：面板只注册 profile 和转发 caster，地图不得按 commander 写 if/else。精通和威望影响面板冷却、充能、费用时，由本模块接收最终 modifier。");
  lines.push("");

  lines.push("## 02. 英雄单位及其技能");
  lines.push("");
  lines.push("Owner：`CommanderHeroProfile`、`CommanderHeroModeProfile`、`CommanderHeroAbilityProfile`、`CommanderHeroSkillTreeProfile`、`CommanderHeroReviveProfile`、`CommanderHeroModifierProfile`。");
  lines.push("");
  lines.push("### 英雄单位清单");
  lines.push("");
  lines.push(...table(["名称", "Catalog ID", "解析 Unit", "属性", "费用/人口/生命", "备注"], unitRows(heroes), "官方 heroes.json 暂无条目；召唤物、形态、特殊英雄需从 progression、command_cards 或 CASC 继续追。"));
  lines.push("### 英雄技能按钮候选");
  lines.push("");
  lines.push(...table(["对象", "按钮/Face", "显示名", "AbilityCmd", "Requirement", "说明"], buttonRows(heroButtons, 45), "command_cards.json 未命中 heroes.json 对象按钮；英雄技能需从 CASC 或实机日志补。"));
  lines.push("### 英雄形态/模式候选");
  lines.push("");
  const heroModeButtons = heroButtons.length > 0 ? heroButtons.filter((b) => hasAny(b, modeWords)) : [];
  lines.push(...table(["对象", "按钮/Face", "显示名", "AbilityCmd", "Requirement", "说明"], buttonRows(heroModeButtons, 20), "未自动命中英雄形态或模式按钮。"));
  lines.push("### 英雄相关等级解锁");
  lines.push("");
  const heroTerms = ["hero", "英雄", "形态", "模式", "不法之徒", "战甲", "装备", "stance", "kit", "suit", "outlaw", "dehaka", "kerrigan", "zagara", "tychus", "nova", "fenix", "alarak", "zeratul", "gary"];
  const heroPerks = perks.filter((p) => {
    const h = [p.id, p.name, p.tooltip, ...(p.upgrades ?? []), ...abilityCmds(p.ability_commands)].join(" ").toLowerCase();
    return (heroes.length > 0 || heroNotes[en]) ? heroTerms.some((t) => h.includes(t.toLowerCase())) : false;
  });
  lines.push(...table(["等级", "名称", "升级", "AbilityCmd", "说明"], heroPerks.map((p) => [`Lv${p.level}`, p.name || p.id, listCode(p.upgrades, 6), listCode(abilityCmds(p.ability_commands), 6), p.tooltip || "-"]), "未自动命中英雄相关等级解锁；需要从 CASC 或实机日志补。"));
  lines.push(`口径：${heroNotes[en] ?? (heroes.length > 0 ? "heroes.json 已列出英雄条目，英雄单位、英雄技能和英雄形态都归本模块。" : "官方 heroes.json 暂无条目；若官方玩法存在隐藏英雄或召唤英雄，继续用 CASC/实机日志补。")}`);
  lines.push("");
  lines.push("待审计：Hero Unit、Ability、Behavior、Weapon、Actor、Sound、复活/重生、能量/资源、形态切换和威望改写闭包。");
  lines.push("");

  lines.push("## 03. 普通单位技能及其进化功能");
  lines.push("");
  lines.push("Owner：`CommanderUnitAbilityProfile`、`CommanderUnitStatProfile`、`CommanderUnitEvolutionProfile`、`CommanderUnitBehaviorProfile`、`CommanderUnitWeaponProfile`。");
  lines.push("");
  lines.push("### 单位技能按钮候选");
  lines.push("");
  lines.push(...table(["对象", "按钮/Face", "显示名", "AbilityCmd", "Requirement", "说明"], buttonRows(unitButtons, 45)));
  lines.push("### 进化/形态/切换候选");
  lines.push("");
  lines.push(...table(["对象", "按钮/Face", "显示名", "AbilityCmd", "Requirement", "说明"], buttonRows(modeButtons, 35)));
  lines.push("实现备注：单位自身声明技能、被动、武器、Behavior 和升级后替换关系；科技建筑只触发研究，不在科技建筑内部判断所有兵种 if/else。");
  lines.push("");

  lines.push("## 04. 初始化基地与特殊建筑");
  lines.push("");
  lines.push("Owner：`CommanderBaseInitProfile`、`CommanderOpeningLoadoutProfile`、`CommanderSpecialStructureProfile`、`CommanderInitHookProfile`。");
  lines.push("");
  lines.push("### 初始化建筑候选");
  lines.push("");
  lines.push(...table(["名称", "Catalog ID", "解析 Unit", "属性", "费用/人口/生命", "备注"], unitRows(baseBuildings.length > 0 ? baseBuildings : buildings.slice(0, 8)), "未自动命中基地或特殊建筑候选。"));
  lines.push("### 初始化/建造按钮候选");
  lines.push("");
  lines.push(...table(["对象", "按钮/Face", "显示名", "AbilityCmd", "Requirement", "说明"], buttonRows(buildingButtons.filter((b) => hasAny(b, ["build", "train", "upgrade", "morph", "land", "lift", "deploy"])), 30)));
  lines.push("实现备注：地图初始化只传 commander、出生点和场景语义；基地、工人、特殊建筑、初始科技和补给由本指挥官 initializer 自己组装。");
  lines.push("");

  lines.push("## 05. 指挥官兵种");
  lines.push("");
  lines.push("Owner：`CommanderRosterProfile`、`CommanderUnitFactoryProfile`、`CommanderUnitReplacementProfile`、`CommanderLevelStageRosterProfile`。");
  lines.push("");
  lines.push("### 当前 units.json 兵种清单");
  lines.push("");
  lines.push(...table(["名称", "Catalog ID", "解析 Unit", "属性", "费用/人口/生命", "备注"], unitRows(units), "当前 units.json 暂无普通兵种条目。"));
  lines.push("### roster 中未归入 units/buildings/heroes 的对象");
  lines.push("");
  lines.push(...table(["名称", "Catalog ID", "解析 Unit", "属性", "备注"], objectRowsForRoster(unknownRoster), "roster 中没有额外未分类对象。"));
  lines.push("口径：`units.json` 是当前提取出的兵种清单；`roster.json` 仍作为审计入口，用于发现满级后新增、替换、召唤或特殊形态对象。满级之后兵种会变化，测试台默认使用 `power_fusion` 而不是基础 `initial`。");
  lines.push("");

  lines.push("## 06. 指挥官精通");
  lines.push("");
  lines.push("Owner：`CommanderMasteryProfile`、`CommanderMasteryOptionProfile`、`CommanderMasteryModifierProfile`。");
  lines.push("");
  lines.push("### 六项精通 30 点口径");
  lines.push("");
  lines.push(...table(["组", "精通", "Upgrade", "每点增量", "30 点结果", "说明"], masteries.map((m) => [`${m.category}`, m.name || m.id, `\`${m.upgrade || "-"}\``, listCode(m.point_increments), max30Value(m), m.tooltip || "-"]), "当前 progression.masteries 暂无条目。"));
  lines.push("实现备注：当前默认六项精通全 30 点，不再做官方互斥取舍；若同一字段被多个精通/威望改写，必须进入 `CommanderModifierStackProfile` 明确叠加顺序。");
  lines.push("");

  lines.push("## 07. 指挥官建筑");
  lines.push("");
  lines.push("Owner：`CommanderBuildingProfile`、`CommanderBuildingAbilityProfile`、`CommanderBuildingReplacementProfile`。");
  lines.push("");
  lines.push("### 当前 buildings.json 建筑清单");
  lines.push("");
  lines.push(...table(["名称", "Catalog ID", "解析 Unit", "属性", "费用/人口/生命", "备注"], unitRows(buildings), "当前 buildings.json 暂无建筑条目。"));
  lines.push("### 建筑按钮候选");
  lines.push("");
  lines.push(...table(["对象", "按钮/Face", "显示名", "AbilityCmd", "Requirement", "说明"], buttonRows(buildingButtons, 40), "command_cards.json 未命中建筑按钮。"));
  lines.push("实现备注：建筑自己的技能、生产队列、变形、起飞/降落、特殊自动施法由建筑 profile 声明；地图和科技建筑不持有跨指挥官判断。");
  lines.push("");

  lines.push("## 08. 科技建筑及其升级选项");
  lines.push("");
  lines.push("Owner：`CommanderTechBuildingProfile`、`CommanderTechOptionProfile`、`CommanderUpgradeEffectProfile`。");
  lines.push("");
  lines.push("### 15 级解锁与研究命令");
  lines.push("");
  lines.push(...table(["等级", "名称", "解锁升级", "解锁 AbilityCmd", "说明"], perks.map((p) => [p.level, p.name || p.id, listCode(p.upgrades, 8), listCode(abilityCmds(p.ability_commands), 8), p.tooltip || "-"])));
  lines.push("### Upgrade 摘要");
  lines.push("");
  lines.push(...table(["Upgrade", "父级", "显示名", "Effect数", "说明"], upgradeRows(upgrades, 35), "当前 upgrades.json 暂无条目。"));
  lines.push("### 研究/升级按钮候选");
  lines.push("");
  lines.push(...table(["对象", "按钮/Face", "显示名", "AbilityCmd", "Requirement", "说明"], buttonRows(techButtons, 45)));
  lines.push("实现备注：科技建筑只负责展示/触发研究；每个单位升级效果由对应 `CommanderUnitTechProfile` 或 `CommanderUpgradeEffectProfile` 声明。");
  lines.push("");

  lines.push("## 09. 特定地图运输机空投单位");
  lines.push("");
  lines.push("Owner：`CommanderCargoLoadoutProfile`、`CommanderMapDropProfile`、`CommanderScenarioFallbackProfile`。");
  lines.push("");
  lines.push("### 原始mod 已有实现线索");
  lines.push("");
  lines.push(...table(["范围", "文件", "已有实现", "含义", "迁移状态"], originalCargoEvidenceRows(en), "原始mod 暂未发现可复用运输/空投线索。"));
  lines.push("### 场景 loadout 设计草案");
  lines.push("");
  lines.push(...table(["ScenarioKind", "推荐单位", "用途", "设计说明", "来源状态"], cargoLoadoutRows(en), "当前指挥官暂无场景 loadout 草案。"));
  lines.push("### 接入规则");
  lines.push("");
  lines.push("- 本模块不再从 `command_cards.json` 的运输/空投按钮自动推导货舱单位，也不把 `units.json` 全量清单当成可投放单位。");
  lines.push("- 地图只传入 `mapId`、`scenarioKind`、目标点和运输模式；单位组合由 `CommanderCargoLoadoutProfile` 根据当前 commander、15 级 `power_fusion` roster 和场景限制解析。");
  lines.push("- `原始mod` 已有运输机、空投舱、狮鹫运输、医疗运输机、坑道/深挖或感染运输容器时，应优先保留它的流程语义，只把硬编码单位替换为 profile 查询结果。");
  lines.push("- 英雄、首领、终极进化、战列巡航舰、航母等高价值单位默认只能用于 `bonus_reward` 或显式允许英雄的地图场景。");
  lines.push("实现备注：`CommanderMapDropProfile` 负责把地图事件映射为 `scenarioKind`；`CommanderScenarioFallbackProfile` 负责缺项降级并输出 `[XM_DBG][WARN][CARGO_FALLBACK]`。");
  lines.push("");

  lines.push("## 10. 指挥官特殊机制");
  lines.push("");
  lines.push("Owner：`CommanderSpecialMechanicProfile`、`CommanderSpecialResourceProfile`、`CommanderSpecialMechanicHookProfile`、`CommanderSpecialMechanicUnitProfile`。");
  lines.push("");
  lines.push(`本指挥官重点：${specialFocus[en] ?? "特殊机制待从 progression、CASC 和实机日志继续确认。"}`);
  lines.push("");
  lines.push("### 特殊机制命中项");
  lines.push("");
  lines.push(...bulletList(specialRows(perks, en)));
  lines.push("### 特殊机制 Upgrade 候选");
  lines.push("");
  const terms = specialTerms[en] ?? [];
  const specialUpgrades = upgrades.filter((u) => terms.some((t) => [u.id, u.name, u.tooltip].join(" ").toLowerCase().includes(t)));
  lines.push(...bulletList(specialUpgrades.map((u) => `${u.name || u.id} (\`${u.id}\`)`)));
  lines.push("### 特殊机制按钮候选");
  lines.push("");
  lines.push(...table(["对象", "按钮/Face", "显示名", "AbilityCmd", "Requirement", "说明"], buttonRows(specialButtons, 45)));
  lines.push("实现备注：凡是涉及局内状态、资源、堆叠、全局计时器、隐藏 caster、英雄成长或召唤首领的机制，都必须有 runtime hook 和 `[XM_DBG]` 日志。");
  lines.push("");

  lines.push("## 11. 指挥官个性化机制");
  lines.push("");
  lines.push("Owner：`CommanderPersonalMechanicProfile`、`CommanderPersonalMechanicEffectProfile`、`CommanderPersonalMechanicHookProfile`、`CommanderPersonalMechanicRequirementProfile`。");
  lines.push("");
  lines.push(`本指挥官重点：${personalFocus[en] ?? "个性化机制待继续审计。"}`);
  lines.push("");
  lines.push("### 威望正向融合输入");
  lines.push("");
  lines.push(...table(["威望 ID", "名称", "Primary Upgrade", "禁用单位", "启用单位", "禁用 Ability", "补充 Upgrade"], prestigeRows(prestiges), "当前 prestiges.json 暂无条目。"));
  lines.push("融合规则：只取正面收益，跳过负面代价、禁用项、费用/冷却/上限惩罚；不能直接启用官方 `PlayerPrestige`。禁用项在本表中保留是为了审计，不代表最终要执行。");
  lines.push("");

  lines.push("## 强度融合规则");
  lines.push("");
  lines.push("1. `XM_ApplyCommanderFullLevel`：应用 15 级全部解锁，补齐升级、能力命令、研究按钮和 roster 变化。");
  lines.push("2. `XM_ApplyCommanderAllMasteries`：6 项精通全部按 30 点应用。");
  lines.push("3. `XM_ApplyCommanderPrestigeEffects`：只取威望正面收益，跳过负面代价、禁用项、费用/冷却/上限惩罚。");
  lines.push("4. `XM_RunCommanderPowerFusionHook`：只处理无法静态声明的行为，例如特殊资源、英雄形态、顶部技能联动。");
  lines.push("5. `XM_VerifyCommanderPowerFusion`：输出 `[XM_DBG]` 验证日志。");
  lines.push("");

  lines.push("## 测试台优先场景");
  lines.push("");
  lines.push("```text");
  lines.push("standard_base");
  lines.push("full_buildings");
  lines.push("level15_units");
  lines.push("fusion_final_units");
  lines.push("panel_smoke");
  lines.push("hero_smoke");
  lines.push("hero_ability_smoke");
  lines.push("hero_mode_smoke");
  lines.push("unit_ability_smoke");
  lines.push("tech_smoke");
  lines.push("cargo_smoke");
  lines.push("special_mechanic_smoke");
  lines.push("personal_mechanic_smoke");
  lines.push("```");
  lines.push("");
  lines.push("补充：需要排查官方基础差异时才跑 `initial_units`，不要把它当作默认玩法状态。英雄指挥官还要单独验证 `hero_smoke`、`hero_ability_smoke`、`hero_mode_smoke`。");
  lines.push("");

  lines.push("## `[XM_DBG]` 日志建议");
  lines.push("");
  lines.push("```text");
  lines.push(`[XM_DBG][INFO][COMMANDER_PROFILE_LOAD] commander=${en} levelMode=FullLevel15 masteryMode=AllSixMax rosterStage=power_fusion result=ok`);
  lines.push(`[XM_DBG][INFO][POWER_FUSION_APPLY] commander=${en} levelMode=FullLevel15 masteryMode=AllSixMax prestigeMode=SelectedPositive result=ok`);
  lines.push(`[XM_DBG][INFO][ROSTER_LOAD] commander=${en} stage=power_fusion units=${units.length} buildings=${buildings.length} heroes=${heroes.length} result=ok`);
  lines.push(`[XM_DBG][INFO][HERO_PROFILE_LOAD] commander=${en} heroes=${heroes.length} result=ok`);
  lines.push(`[XM_DBG][INFO][MODULE_VERIFY] commander=${en} module=<01-11> profile=<profile> result=ok`);
  lines.push(`[XM_DBG][WARN][CASC_AUDIT_REQUIRED] commander=${en} module=<module> object=<object> result=needs-casc-audit`);
  lines.push("```");
  lines.push("");

  lines.push("## 第一轮待审计项");
  lines.push("");
  lines.push("- 顶部技能的 caster、按钮、冷却、充能、目标转发闭包。");
  lines.push("- 英雄或特殊英雄的 Unit、Ability、Behavior、Weapon、Actor、Sound、复活/重生闭包。");
  lines.push("- `power_fusion` 最终 roster 与 `level15` roster 的新增、替换、变体关系。");
  lines.push("- 6 项精通的真实作用对象和最终数值。");
  lines.push("- 3 个威望的正面收益、负面代价、disable/suppress、费用/冷却/上限变化。");
  lines.push("- 科技建筑研究按钮、Requirement、Upgrade effect 是否完整。");
  lines.push("- 特殊机制、英雄成长和个性化机制是否需要 runtime hook。");
  lines.push("");

  writeMarkdown(path.join(outRoot, summary.file), lines);
}

function writeReadme(summaries) {
  const heroCoverage = summaries.filter((s) => s.heroes > 0).map((s) => `${s.zh}/${s.en}=${s.heroes}`).join("，") || "当前无 heroes.json 条目";
  const zeroHero = summaries.filter((s) => s.heroes === 0).map((s) => `${s.zh}/${s.en}`).join("，");
  const lines = [];
  lines.push("# 指挥官细化文档入口");
  lines.push("");
  lines.push(`日期：${today}`);
  lines.push("");
  lines.push("本目录按 18 个官方合作指挥官拆分。每个文档都以当前新版架构为前提，并按 `../模块拆分/` 的 11 个模块分别整理本指挥官自己的清单和待审计项。");
  lines.push("");
  lines.push("本轮已按 `游戏数据/官方合作指挥官/commanders/<Commander>/` 的最新 JSON 重新生成，重点刷新 `heroes.json`、`units.json`、`buildings.json`、`command_cards.json` 的数量、清单和候选按钮。");
  lines.push("");
  lines.push("统一口径：");
  lines.push("");
  lines.push("1. 当前指挥官默认 15 级，不从 1 级开始。");
  lines.push("2. 精通默认 6 项全部 30 点。");
  lines.push("3. 威望默认只取正面收益，不直接启用官方 `PlayerPrestige`。");
  lines.push("4. `full_units` 默认指向强度融合最终 roster，即 `power_fusion`。");
  lines.push("5. `initial` 只用于官方基础状态审计和差异对照。");
  lines.push("6. 具体实现前仍需追 CASC 闭包并补 `[XM_DBG]` 验证日志。");
  lines.push("7. `heroes.json` 只按当前 JSON 事实写入英雄模块；`heroes.json=0` 不代表官方玩法一定没有英雄，只代表本轮提取数据未直接列出，需要 CASC/实机补闭包。");
  lines.push("");
  lines.push("## 当前数据覆盖");
  lines.push("");
  lines.push(`- heroes.json 已有条目：${heroCoverage}。`);
  lines.push(`- heroes.json 暂无条目：${zeroHero}。`);
  lines.push("- units/buildings 已按最新 JSON 重算；例如阿巴瑟当前是 `heroes=0 / units=12 / buildings=2`，不再沿用上一轮把利维坦写入 heroes.json 的旧判断。");
  lines.push("");
  lines.push(...table(["序号", "文档", "指挥官", "heroes", "units", "buildings", "roster", "command cards", "upgrades"], summaries.map((s, idx) => [
    String(idx + 1),
    `\`${s.file}\``,
    `${s.zh}/${s.en}`,
    String(s.heroes),
    String(s.units),
    String(s.buildings),
    String(s.roster),
    String(s.commandCards),
    String(s.upgrades),
  ])));
  lines.push("## 使用方式");
  lines.push("");
  lines.push("先看单指挥官文档的 `01. 顶部技能栏` 到 `11. 指挥官个性化机制`，再回到 `../模块拆分/` 中对应模块补实现。每个指挥官文档是工作清单，不是最终闭包证明；标记为“候选”或“待审计”的内容必须继续追 `references/sc2-build-96883-casc-export/`、Requirement 闭包或实机日志。");
  lines.push("");
  lines.push("注意：`command_cards.json` 中部分共享单位会带出其它指挥官的按钮或锁定提示，例如同一个 SCV、兵营、导弹塔对象上可能出现诺娃、斯旺、雷诺等不同 commander 的 Requirement。单指挥官文档中的按钮表只作为候选输入，真正实现时必须按当前 commander、15 级、六精通全满和威望正向融合后的 Requirement 过滤。");
  lines.push("");
  lines.push("英雄模块同样是候选输入：如果 `heroes.json` 已有条目，则优先把对应 command card 技能归入 `02. 英雄单位及其技能`；如果 `heroes.json` 暂无条目但官方玩法存在英雄，例如诺娃、泽拉图、超级盖瑞、阿拉纳克、菲尼克斯，文档会继续标记为 CASC/实机待补。");
  lines.push("");
  writeMarkdown(path.join(outRoot, "README.md"), lines);
}

function main() {
  if (!fs.existsSync(dataRoot)) {
    throw new Error(`Data root not found: ${dataRoot}`);
  }
  fs.mkdirSync(outRoot, { recursive: true });
  const summaries = [];
  commanders.forEach(([en, zh], idx) => writeCommanderDoc(idx, en, zh, summaries));
  writeReadme(summaries);
  console.log(`Generated ${summaries.length} commander detail docs in ${outRoot}`);
}

main();
