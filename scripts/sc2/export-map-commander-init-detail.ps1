param(
    [string]$ProjectRoot,
    [string]$OutputDir,
    [string]$DocsDir
)

$ErrorActionPreference = "Stop"

if ([string]::IsNullOrWhiteSpace($ProjectRoot)) {
    $ProjectRoot = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path
}
else {
    $ProjectRoot = (Resolve-Path $ProjectRoot).Path
}

if ([string]::IsNullOrWhiteSpace($OutputDir)) {
    $OutputDir = Join-Path $ProjectRoot "tmp\2026-05-26-commander-map-static-analysis"
}

if ([string]::IsNullOrWhiteSpace($DocsDir)) {
    $DocsDir = Join-Path $ProjectRoot "docs\每日进度"
}

$mapsRoot = Join-Path $ProjectRoot "合作指挥官版起义狂潮\Maps\XM"
$modsRoot = Join-Path $ProjectRoot "合作指挥官版起义狂潮\Mods\XM"
$scanPath = Join-Path $OutputDir "map-init-scan.csv"
$detailCsvPath = Join-Path $OutputDir "map-commander-init-detail.csv"
$markdownPath = Join-Path $DocsDir "2026-05-26-地图指挥官逻辑替换与初始化兵种明细.md"
$chineseMarkdownPath = Join-Path $DocsDir "2026-05-26-地图指挥官逻辑替换与初始化兵种明细-中文阅读版.md"

$targetCommanders = @(
    "Abathur",
    "AbathurReborn",
    "Alarak",
    "Artanis",
    "Dehaka",
    "Fenix",
    "Karax",
    "Kerrigan",
    "Mengsk",
    "Mira",
    "Nova",
    "Raynor",
    "Stetmann",
    "Stukov",
    "Swann",
    "Tychus",
    "Vorazun",
    "Zagara",
    "Zeratul"
)

$helperFamilyByCommander = @{
    "Abathur" = "Abathur"
    "AbathurReborn" = "Abathur"
    "Alarak" = "Alarak"
    "Artanis" = "Artanis"
    "Fenix" = "Fenix"
    "Karax" = "Karax"
    "Kerrigan" = "Kerrigan"
    "Raynor" = "Raynor"
    "Vorazun" = "Vorazun"
    "Zagara" = "Zagara"
    "Zeratul" = "Zeratul"
}

$commanderNamesZh = @{
    "Abathur" = "阿巴瑟"
    "AbathurReborn" = "重生阿巴瑟"
    "Alarak" = "阿拉纳克"
    "Artanis" = "阿塔尼斯"
    "Dehaka" = "德哈卡"
    "Fenix" = "菲尼克斯"
    "Karax" = "凯拉克斯"
    "Kerrigan" = "凯瑞甘"
    "Mengsk" = "蒙斯克"
    "Mira" = "米拉汉"
    "Nova" = "诺娃"
    "Raynor" = "雷诺"
    "Stetmann" = "斯台特曼"
    "Stukov" = "斯托科夫"
    "Swann" = "斯旺"
    "Tychus" = "泰凯斯"
    "Vorazun" = "沃拉尊"
    "Zagara" = "扎加拉"
    "Zeratul" = "泽拉图"
}

$unitNamesZh = @{
    "HatcheryAbathurReborn" = "重生阿巴瑟孵化场"
    "OverlordAbathurReborn" = "重生阿巴瑟王虫"
    "DroneAbathurReborn" = "重生阿巴瑟工蜂"
    "RavagerAbathurReborn" = "重生阿巴瑟破坏者"
    "HatcheryAbathur" = "阿巴瑟孵化场"
    "OverlordAbathur" = "阿巴瑟王虫"
    "DroneAbathur" = "阿巴瑟工蜂"
    "DehakaHatchery" = "德哈卡孵化场"
    "DehakaCoopReviveCocoon" = "德哈卡复活茧"
    "DehakaDrone" = "德哈卡工蜂"
    "CommandCenterMengsk" = "蒙斯克指挥中心"
    "StarportMengsk" = "蒙斯克星港"
    "SCVMengsk" = "蒙斯克工程车"
    "CommandCenterMira" = "米拉汉指挥中心"
    "StarportMira" = "米拉汉星港"
    "SCVMira" = "米拉汉工程车"
    "CommandCenterNova" = "诺娃指挥中心"
    "GhostAcademyNova" = "诺娃幽灵军校"
    "SCVNova" = "诺娃工程车"
    "HatcheryStetmann" = "斯台特曼孵化场"
    "GarysDen" = "盖瑞巢穴"
    "DroneStetmann" = "斯台特曼工蜂"
    "SICommandCenter" = "斯托科夫感染指挥中心"
    "SICivilianStructure" = "斯托科夫平民建筑"
    "SISCV" = "斯托科夫感染工程车"
    "CommandCenterSwann" = "斯旺指挥中心"
    "UnfinishedDrakkenLaserDrillCoop" = "未完成的德拉肯激光钻机"
    "SCVSwann" = "斯旺工程车"
    "TychusCommandCenter" = "泰凯斯指挥中心"
    "TychusResearchCenter" = "泰凯斯研究中心"
    "TychusSCV" = "泰凯斯工程车"
    "SwarmHostMP" = "虫群宿主"
    "QueenCoop" = "女王"
    "HotSLeviathan" = "利维坦"
    "ZagaraCorruptor" = "扎加拉腐化者"
    "ImmortalTaldarim" = "塔达林不朽者"
    "ColossusTaldarim" = "塔达林巨像"
    "VoidRayTaldarim" = "塔达林虚空辉光舰"
    "CarrierTaldarim" = "塔达林航母"
    "VikingFighter" = "维京战机"
    "RaynorCommando" = "雷诺突击队员"
    "HyperionVoidCoop" = "休伯利安"
    "MutaliskBroodlord" = "巢虫领主"
    "ZealotPurifier" = "净化者狂热者"
    "AdeptFenix" = "菲尼克斯使徒"
    "SentryFenix" = "菲尼克斯哨兵"
    "StalkerPurifier" = "净化者追猎者"
    "ColossusPurifier" = "净化者巨像"
    "FenixDragoon" = "菲尼克斯龙骑士"
    "FenixKaldalisZealot" = "卡尔达利斯"
    "FenixTalisAdept" = "塔莉丝"
    "FenixClolarionCarrier" = "克罗拉里昂"
    "DarkTemplarShakuras" = "黑暗圣堂武士"
    "SentryPhasing" = "相位哨兵"
    "ZealotAiur" = "艾尔狂热者"
    "ImmortalAiur" = "艾尔不朽者"
    "PhoenixAiur" = "艾尔凤凰"
    "ArtanisVoid" = "阿塔尼斯"
    "HighTemplar" = "高阶圣堂武士"
    "CarrierAiur" = "艾尔航母"
    "ZeratulSummonZealot" = "泽拉图召唤狂热者"
    "ZeratulStalker" = "泽拉图追猎者"
    "ZeratulSentry" = "泽拉图哨兵"
    "ZeratulImmortal" = "泽拉图不朽者"
    "ZeratulDisruptor" = "泽拉图干扰者"
    "ZeratulSummonKarass" = "卡拉斯"
    "ZeratulSummonVoidRay" = "泽拉图召唤虚空辉光舰"
    "ZeratulCoop" = "泽拉图"
    "ZeratulHeroDarkArchon" = "黑暗执政官"
    "ZeratulXelNagaConstructCyan" = "蓝色萨尔纳加构造体"
    "ZeratulXelNagaConstruct" = "萨尔纳加构造体"
    "AlarakCoop" = "阿拉纳克"
    "DehakaCoop" = "德哈卡"
    "FenixCoop" = "菲尼克斯"
    "GaryStetmann" = "盖瑞"
    "LarvaPStetmann" = "斯台特曼幼虫"
    "NovaCoop" = "诺娃"
    "SIStukov" = "斯托科夫"
    "SwannSwann" = "斯旺"
    "TychusCoop" = "泰凯斯"
    "ZagaraVoidCoop" = "扎加拉"
    "K5Kerrigan" = "凯瑞甘"
    "CommandCenter" = "指挥中心"
    "SupplyDepot" = "补给站"
    "DarkPylon" = "黑暗水晶塔"
    "Hatchery" = "孵化场"
    "Overlord" = "王虫"
    "Drone" = "工蜂"
    "Nexus" = "枢纽"
    "Pylon" = "水晶塔"
    "Probe" = "探机"
    "SCV" = "工程车"
    "Zergling" = "跳虫"
    "RoachVile" = "邪恶蟑螂"
    "Hydralisk" = "刺蛇"
    "Ravager" = "破坏者"
    "SwarmHost" = "虫群宿主"
    "Queen" = "女王"
    "Leviathan" = "利维坦"
    "Mutalisk" = "异龙"
    "Corruptor" = "腐化者"
    "Brutalisk" = "暴虐兽"
    "HotSSwarmling" = "虫群跳虫"
    "Baneling" = "毒爆虫"
    "Scourge" = "爆蚊"
    "Supplicant" = "死徒"
    "Stalker" = "追猎者"
    "Monitor" = "监察者"
    "Marine" = "陆战队员"
    "Medic" = "医疗兵"
    "Marauder" = "掠夺者"
    "SiegeTank" = "攻城坦克"
    "Banshee" = "女妖"
    "Battlecruiser" = "战列巡航舰"
    "Ultralisk" = "雷兽"
    "Immortal" = "不朽者"
    "Colossus" = "巨像"
    "Scout" = "侦察机"
    "Carrier" = "航母"
    "Zealot" = "狂热者"
    "CorsairMP" = "海盗船"
    "VoidRay" = "虚空辉光舰"
    "Oracle" = "先知"
    "Dragoon" = "龙骑士"
    "Reaver" = "金甲虫"
    "Tempest" = "风暴战舰"
    "Mohandar" = "莫汉达尔"
    "CycloneMira" = "米拉汉旋风车"
    "ReaperMira" = "米拉汉收割者"
    "MedicMira" = "米拉汉医疗兵"
    "MarauderMengsk" = "蒙斯克劫掠者"
    "MengskMedic" = "蒙斯克医疗兵"
    "TrooperMengsk" = "蒙斯克帝国士兵"
    "TrooperMengskImproved" = "蒙斯克强化帝国士兵"
    "GhostMengsk" = "蒙斯克幽灵"
    "PredatorSwann" = "斯旺掠食者"
    "MicrobotSwann" = "斯旺微型机器人"
    "GoliathSwann" = "斯旺歌利亚"
    "HydraliskStetmann" = "斯台特曼刺蛇"
    "RavagerStetmann" = "斯台特曼破坏者"
    "ZerglingStetmann" = "斯台特曼跳虫"
    "BanelingStetmann" = "斯台特曼毒爆虫"
    "BroodLordStetmann" = "斯台特曼巢虫领主"
    "CorruptorStetmann" = "斯台特曼腐化者"
    "InfestorStetmann" = "斯台特曼感染者"
    "LurkerStetmann" = "斯台特曼潜伏者"
    "LurkerStetmannBurrowed" = "斯台特曼潜伏者（潜地）"
    "OverseerStetmann" = "斯台特曼监察王虫"
    "CasterDehaka" = "德哈卡施法者"
    "DehakaGuardian" = "德哈卡守护者"
    "DehakaHydraliskLevel2" = "德哈卡刺蛇（二级）"
    "DehakaMutaliskLevel3" = "德哈卡异龙（三级）"
    "DehakaPrimalSwarmHost" = "德哈卡原始虫群宿主"
    "DehakaRavasaur" = "德哈卡拉瓦兽"
    "DehakaRoachLevel3" = "德哈卡蟑螂（三级）"
    "DehakaSwarmHost" = "德哈卡虫群宿主"
    "DehakaUltraliskLevel2" = "德哈卡雷兽（二级）"
    "CoopCasterTychus" = "泰凯斯施法者"
    "CasterMira" = "米拉汉施法者"
    "CoopCasterNova" = "诺娃施法者"
    "CoopCasterMengsk" = "蒙斯克施法者"
    "CasterSwann" = "斯旺施法者"
    "CoopCasterStetmann" = "斯台特曼施法者"
    "CoopCasterStukov" = "斯托科夫施法者"
    "CoopCasterAbathur" = "阿巴瑟施法者"
    "CoopCasterAbathurReborn" = "重生阿巴瑟施法者"
    "TrooperMengskFlamethrower" = "蒙斯克火焰兵"
    "TrooperMengskAA" = "蒙斯克防空帝国士兵"
    "BattlecruiserMengsk" = "蒙斯克战列巡航舰"
    "MedivacMengsk" = "蒙斯克医疗运输机"
    "MengskBanshee" = "蒙斯克女妖"
    "RavenMengsk" = "蒙斯克渡鸦"
    "SiegeTankMengsk" = "蒙斯克攻城坦克"
    "SiegeTankMengskSieged" = "蒙斯克攻城坦克（攻城模式）"
    "BattlecruiserMira" = "米拉汉战列巡航舰"
    "GhostMira" = "米拉汉幽灵"
    "HellionMira" = "米拉汉恶火"
    "HellionTankMira" = "米拉汉恶火战车"
    "MarauderMira" = "米拉汉劫掠者"
    "MarineMira" = "米拉汉陆战队员"
    "MedivacMira" = "米拉汉医疗运输机"
    "SiegeBreakerMira" = "米拉汉攻城破坏者"
    "VikingAssaultMira" = "米拉汉维京（突击模式）"
    "WraithMira" = "米拉汉怨灵"
    "Banshee_BlackOps" = "黑色行动女妖"
    "Ghost_BlackOps" = "黑色行动幽灵"
    "GhostFemale_BlackOps" = "黑色行动女幽灵"
    "Goliath_BlackOps" = "黑色行动歌利亚"
    "HellbatBlackOps" = "黑色行动恶火战甲"
    "HellionBlackOps" = "黑色行动恶火"
    "Liberator_BlackOps" = "黑色行动解放者"
    "Marauder_BlackOps" = "黑色行动劫掠者"
    "Marine_BlackOps" = "黑色行动陆战队员"
    "Raven_BlackOps" = "黑色行动渡鸦"
    "SiegeTank_BlackOps" = "黑色行动攻城坦克"
    "SiegeTankSieged_BlackOps" = "黑色行动攻城坦克（攻城模式）"
    "DuskWing" = "黄昏之翼"
    "GasCanister" = "瓦斯罐"
    "HammerSecurity" = "哈默安保"
    "HerculesSCV" = "赫拉克勒斯工程车"
    "HerculesSwann" = "斯旺赫拉克勒斯"
    "KaraxChampion" = "凯拉克斯冠军单位"
    "Medivac" = "医疗运输机"
    "MercMedic" = "雇佣兵医疗兵"
    "PalletMinerals" = "矿物货盘"
    "PickupPalletMinerals" = "可拾取矿物货盘"
    "ScienceVesselSwann" = "斯旺科技球"
    "SiegeBreaker" = "攻城破坏者"
    "SiegeBreakerSieged" = "攻城破坏者（攻城模式）"
    "SiegeTankSiegedSwann" = "斯旺攻城坦克（攻城模式）"
    "SiegeTankSwann" = "斯旺攻城坦克"
    "SIInfestedBunkerUpg" = "斯托科夫感染地堡"
    "SIInfestedBunkerUpgUprooted" = "斯托科夫感染地堡（拔起）"
    "InfestedBunkerNeutUprooted" = "中立感染地堡（拔起）"
    "SIInfestedTrooper" = "斯托科夫感染陆战队员"
    "SILiberator" = "斯托科夫解放者"
    "OverseerStukov" = "斯托科夫监察王虫"
    "SpartanCompany" = "斯巴达连队"
    "StukovInfestedBanshee" = "斯托科夫感染女妖"
    "StukovInfestedDiamondBack" = "斯托科夫感染响尾蛇"
    "StukovInfestedSiegeTank" = "斯托科夫感染攻城坦克"
    "StukovInfestedSiegeTankUprooted" = "斯托科夫感染攻城坦克（拔起）"
    "TychusFirebat" = "泰凯斯火蝠"
    "WarPig" = "战猪"
    "WraithSwann" = "斯旺怨灵"
}

$kindNamesZh = @{
    "light" = "轻型"
    "heavy" = "重型"
    "air" = "空中"
    "hero" = "英雄"
    "ultimate" = "终极"
}

$mapNames = [ordered]@{
    "LauncherAuto.SC2Map" = "Launcher"
    "thanson01.SC2Map" = "大撤离"
    "thanson02.SC2Map" = "大爆发"
    "thanson03a.SC2Map" = "拯救海文"
    "thanson03b.SC2Map" = "海文的陷落"
    "thorner01.SC2Map" = "火车大劫案"
    "thorner02.SC2Map" = "博弈"
    "thorner03.SC2Map" = "毁灭引擎"
    "thorner04.SC2Map" = "媒体轰炸"
    "thorner05s.SC2Map" = "揭露黑幕"
    "traynor01.SC2Map" = "自由日"
    "traynor02.SC2Map" = "不法之徒"
    "traynor03.SC2Map" = "零点行动"
    "ttosh01.SC2Map" = "恶魔游乐场"
    "ttosh02.SC2Map" = "欢迎来到丛林"
    "ttosh03a.SC2Map" = "营救"
    "ttosh03b.SC2Map" = "幽灵一击"
    "ttychus01.SC2Map" = "来之不易"
    "ttychus02.SC2Map" = "挖宝行动"
    "ttychus03.SC2Map" = "莫比斯代理人"
    "ttychus04.SC2Map" = "超新星"
    "ttychus05.SC2Map" = "虚空巨口"
    "tvalerian01.SC2Map" = "地狱之门"
    "tvalerian02a.SC2Map" = "野兽之腹"
    "tvalerian02b.SC2Map" = "天崩地坼"
    "tvalerian03.SC2Map" = "背水一战"
    "tzeratul02.SC2Map" = "恶兆"
    "tzeratul03.SC2Map" = "未来回响"
    "tzeratul04.SC2Map" = "究极黑暗"
}

$runtime = @{
    "Stukov" = @{
        Console = "ConsoleZerg_Classic"
        Caster = "CoopCasterStukov"
        Panel = "Stukov"
        Extra = "InitializeBase 创建 Stukov 面板施法者、显示选择按钮，并铺全图菌毯"
        Hero = ""
    }
    "Dehaka" = @{
        Console = "ConsoleZerg_Dehaka"
        Caster = "CasterDehaka"
        Panel = "Dehaka"
        Extra = "非 RPG 初始化额外增加 60 人口上限；InitializeBase 初始化德哈卡事件，满足成就位时创建原始族群兄弟"
        Hero = "DehakaCoop"
    }
    "Abathur" = @{
        Console = "ConsoleZerg_Abathur"
        Caster = "CoopCasterAbathur"
        Panel = "Abathur"
        Extra = "生物质触发器：AbathurCollectBiomass"
        Hero = ""
    }
    "AbathurReborn" = @{
        Console = "ConsoleZerg_Abathur"
        Caster = "CoopCasterAbathurReborn"
        Panel = "AbathurReborn"
        Extra = "生物质触发器：AbathurRebornCollectBiomass；地图本地阿巴瑟队伍复用 Abathur helper，但 helper 内按 gv_commander 切换 Reborn 单位"
        Hero = ""
    }
    "Tychus" = @{
        Console = "ConsoleTerran_Classic"
        Caster = "CoopCasterTychus"
        Panel = "Tychus"
        Extra = "非 RPG 初始化创建泰凯斯施法者并初始化小队；InitializeBase 记录小队主建筑并启动英雄招募充能"
        Hero = ""
    }
    "Mira" = @{
        Console = "ConsoleTerran_Horner"
        Caster = "CasterMira"
        Panel = "Horner"
        Extra = "InitializeBase 执行米拉汉初始化、创建面板施法者并显示选择按钮"
        Hero = ""
    }
    "Nova" = @{
        Console = "ConsoleTerran_CovertOps"
        Caster = "CoopCasterNova"
        Panel = "Nova"
        Extra = "InitializeBase 初始化诺娃施法器、面板与粘滞榴弹升级；lp_createHero=true 时初始化诺娃英雄"
        Hero = "NovaCoop"
    }
    "Alarak" = @{
        Console = "ConsoleProtoss_Default"
        Caster = "CoopCasterAlarak"
        Panel = "Alarak"
        Extra = "使用 Alarak 面板初始化"
        Hero = "AlarakCoop"
    }
    "Artanis" = @{
        Console = "ConsoleProtoss_Default"
        Caster = "SoACasterArtanis"
        Panel = "Artanis"
        Extra = "使用统一 CommanderPanelInit"
        Hero = ""
    }
    "Fenix" = @{
        Console = "ConsoleProtoss_Fenix"
        Caster = "SoACasterFenix"
        Panel = "Fenix"
        Extra = "使用统一 CommanderPanelInit"
        Hero = "FenixCoop"
    }
    "Karax" = @{
        Console = "ConsoleProtoss_Forged"
        Caster = "SoACasterKarax"
        Panel = "Karax"
        Extra = "使用统一 CommanderPanelInit"
        Hero = ""
    }
    "Kerrigan" = @{
        Console = "ConsoleZerg_Classic"
        Caster = "CoopCasterKerrigan"
        Panel = "Kerrigan"
        Extra = "额外补 Kerrigan 等级/英雄相关升级"
        Hero = "K5Kerrigan"
    }
    "Raynor" = @{
        Console = "ConsoleTerran_Classic"
        Caster = "CoopCasterRaynor"
        Panel = "Raynor"
        Extra = "使用统一 CommanderPanelInit"
        Hero = ""
    }
    "Mengsk" = @{
        Console = "ConsoleTerran_Imperial"
        Caster = "CoopCasterMengsk"
        Panel = "Mengsk"
        Extra = "Initialize 初始化蒙斯克经验系统；InitializeBase 读取精通/成就加成、创建施法者并初始化蒙斯克机制"
        Hero = ""
    }
    "Swann" = @{
        Console = "ConsoleTerran_Swann"
        Caster = "CasterSwann"
        Panel = "Swann"
        Extra = "InitializeBase 绑定德拉肯激光钻机、创建斯旺施法者、加入钻机施法组"
        Hero = ""
    }
    "Stetmann" = @{
        Console = "ConsoleZerg_Mecha"
        Caster = "CoopCasterStetmann"
        Panel = "Stetmann"
        Extra = "InitializeBase 读取成就响应、创建斯台特曼施法者，并启动能量场触发器"
        Hero = ""
    }
    "Vorazun" = @{
        Console = "ConsoleProtoss_Nerazim"
        Caster = "SoACasterVorazun"
        Panel = "Vorazun"
        Extra = "使用统一 CommanderPanelInit"
        Hero = ""
    }
    "Zagara" = @{
        Console = "ConsoleZerg_Zagara"
        Caster = "CoopCasterZagara"
        Panel = "Zagara"
        Extra = "使用统一 CommanderPanelInit"
        Hero = "ZagaraVoidCoop"
    }
    "Zeratul" = @{
        Console = "ConsoleProtoss_XelNaga"
        Caster = "CoopCasterZeratul"
        Panel = "Zeratul"
        Extra = "使用统一 CommanderPanelInit"
        Hero = "ZeratulCoop"
    }
}

$knownMapRisks = @{
    "traynor01.SC2Map" = "RPG/无基地地图，多段救援、跳过开场和运输艇货舱并存；gv_raynor 等剧情变量仍需实机确认。"
    "ttosh03b.SC2Map" = "RPG/无基地地图，本地英雄/剧情变量较重；静态辅助函数覆盖不等于剧情变量已实机闭环。"
    "thorner03.SC2Map" = "地图本地英雄/剧情变量较重；静态辅助函数覆盖不等于剧情变量已实机闭环。"
    "tvalerian01.SC2Map" = "RPG/无基地地图，本地莫比斯/剧情侧队伍分支较多；仅能静态确认辅助函数覆盖。"
}

function ConvertTo-InvariantString {
    param([object]$Value)

    if ($null -eq $Value) {
        return ""
    }

    return [string]$Value
}

function Split-CallArguments {
    param([string]$Text)

    $parts = New-Object System.Collections.Generic.List[string]
    $current = New-Object System.Text.StringBuilder
    $depth = 0
    $inString = $false
    $escape = $false

    foreach ($ch in $Text.ToCharArray()) {
        if ($inString) {
            [void]$current.Append($ch)
            if ($escape) {
                $escape = $false
            }
            elseif ($ch -eq '\') {
                $escape = $true
            }
            elseif ($ch -eq '"') {
                $inString = $false
            }
            continue
        }

        if ($ch -eq '"') {
            $inString = $true
            [void]$current.Append($ch)
            continue
        }

        if ($ch -eq '(') {
            $depth += 1
            [void]$current.Append($ch)
            continue
        }

        if ($ch -eq ')') {
            if ($depth -gt 0) {
                $depth -= 1
            }
            [void]$current.Append($ch)
            continue
        }

        if (($ch -eq ',') -and ($depth -eq 0)) {
            $parts.Add($current.ToString().Trim())
            [void]$current.Clear()
            continue
        }

        [void]$current.Append($ch)
    }

    $tail = $current.ToString().Trim()
    if ($tail.Length -gt 0) {
        $parts.Add($tail)
    }

    $result = @()
    foreach ($part in $parts) {
        $result += [string]$part
    }
    return $result
}

function Get-StringLiteralKind {
    param([string]$ArgsText)

    $match = [regex]::Match($ArgsText, '"(?<kind>[^"]+)"')
    if ($match.Success) {
        return $match.Groups["kind"].Value
    }

    return ""
}

function Get-BraceDelta {
    param([string]$Line)

    $open = ([regex]::Matches($Line, "\{")).Count
    $close = ([regex]::Matches($Line, "\}")).Count
    return ($open - $close)
}

function Get-SquadComposition {
    param(
        [string]$Commander,
        [string]$HelperCommander,
        [string]$Mode,
        [string]$Kind
    )

    $effectiveCommander = $HelperCommander
    if (($HelperCommander -eq "Abathur") -and ($Commander -eq "AbathurReborn")) {
        $effectiveCommander = "AbathurReborn"
    }

    $k = $Kind
    if ([string]::IsNullOrWhiteSpace($k)) {
        $k = "light"
    }

    switch ($effectiveCommander) {
        "Abathur" {
            if ($Mode -eq "MapStart") {
                switch ($k) {
                    "light" { return "2 Zergling；1 RoachVile；1 Hydralisk" }
                    "heavy" { return "2 RoachVile；1 Ravager；1 SwarmHostMP" }
                    "air" { return "2 Mutalisk；1 Corruptor" }
                    "hero" { return "2 RoachVile；2 Hydralisk；1 Queen" }
                    "ultimate" { return "若 AbathurUnlockUltimateEvolutions 已解锁：1 Brutalisk；1 Leviathan；否则回退 heavy" }
                    default { return "默认回退 light：2 Zergling；1 RoachVile；1 Hydralisk" }
                }
            }
            switch ($k) {
                "light" { return "4 Zergling；1 RoachVile；1 Hydralisk" }
                "heavy" { return "2 RoachVile；1 Ravager；1 SwarmHostMP" }
                "air" { return "2 Mutalisk；1 Corruptor" }
                "hero" { return "2 RoachVile；2 Hydralisk；1 Queen" }
                default { return "默认回退 light：4 Zergling；1 RoachVile；1 Hydralisk" }
            }
        }
        "AbathurReborn" {
            if ($Mode -eq "MapStart") {
                switch ($k) {
                    "light" { return "2 Zergling；1 RoachVile；1 Hydralisk" }
                    "heavy" { return "2 RoachVile；1 RavagerAbathurReborn；1 SwarmHost" }
                    "air" { return "2 Mutalisk；1 Corruptor" }
                    "hero" { return "2 RoachVile；2 Hydralisk；1 QueenCoop" }
                    "ultimate" { return "若 AbathurUnlockUltimateEvolutions 已解锁：1 Brutalisk；1 HotSLeviathan；否则回退 heavy" }
                    default { return "默认回退 light：2 Zergling；1 RoachVile；1 Hydralisk" }
                }
            }
            switch ($k) {
                "light" { return "4 Zergling；1 RoachVile；1 Hydralisk" }
                "heavy" { return "2 RoachVile；1 RavagerAbathurReborn；1 SwarmHost" }
                "air" { return "2 Mutalisk；1 Corruptor" }
                "hero" { return "2 RoachVile；2 Hydralisk；1 QueenCoop" }
                default { return "默认回退 light：4 Zergling；1 RoachVile；1 Hydralisk" }
            }
        }
        "Zagara" {
            if ($Mode -eq "MapStart") {
                switch ($k) {
                    "light" { return "4 HotSSwarmling；2 Baneling；1 Hydralisk" }
                    "heavy" { return "3 RoachVile；2 Hydralisk；1 Baneling" }
                    "air" { return "4 Scourge；2 ZagaraCorruptor" }
                    "hero" { return "1 Queen；3 HotSSwarmling；2 Baneling；1 RoachVile" }
                    default { return "默认回退 light：4 HotSSwarmling；2 Baneling；1 Hydralisk" }
                }
            }
            switch ($k) {
                "light" { return "4 HotSSwarmling；2 Baneling；1 Hydralisk" }
                "heavy" { return "3 RoachVile；2 Hydralisk；1 Baneling" }
                "hero" { return "3 HotSSwarmling；2 RoachVile；2 Baneling" }
                default { return "默认回退 light：4 HotSSwarmling；2 Baneling；1 Hydralisk" }
            }
        }
        "Alarak" {
            if ($Mode -eq "MapStart") {
                switch ($k) {
                    "light" { return "3 Supplicant；1 Stalker；1 Monitor" }
                    "heavy" { return "2 Supplicant；1 Stalker；1 ImmortalTaldarim；1 ColossusTaldarim" }
                    "air" { return "2 VoidRayTaldarim；1 CarrierTaldarim" }
                    "hero" { return "2 Supplicant；1 Stalker；1 Monitor；1 ImmortalTaldarim" }
                    default { return "默认回退 light：3 Supplicant；1 Stalker；1 Monitor" }
                }
            }
            switch ($k) {
                "light" { return "2 Supplicant；1 Stalker；1 Monitor" }
                "heavy" { return "2 Supplicant；1 Stalker；1 ImmortalTaldarim" }
                "air" { return "1 VoidRayTaldarim；1 Monitor" }
                "hero" { return "2 Supplicant；1 Stalker；1 Monitor；1 ImmortalTaldarim" }
                default { return "默认回退 light：2 Supplicant；1 Stalker；1 Monitor" }
            }
        }
        "Raynor" {
            if ($Mode -eq "MapStart") {
                switch ($k) {
                    "light" { return "3 Marine；1 Medic；1 Marauder" }
                    "heavy" { return "3 Marine；2 Marauder；1 SiegeTank" }
                    "air" { return "2 VikingFighter；1 Banshee；1 Battlecruiser" }
                    "hero" { return "1 RaynorCommando；3 Marine；1 Medic；1 Marauder" }
                    "ultimate" { return "若 RaynorUnlockBattlecruiser 已解锁：1 Battlecruiser；1 HyperionVoidCoop；否则回退 heavy" }
                    default { return "默认回退 light：3 Marine；1 Medic；1 Marauder" }
                }
            }
            switch ($k) {
                "light" { return "3 Marine；1 Medic；1 Marauder" }
                "heavy" { return "3 Marine；2 Marauder；1 SiegeTank" }
                "air" { return "2 VikingFighter；1 Banshee；1 Battlecruiser" }
                "hero" { return "1 RaynorCommando；3 Marine；1 Medic；1 Marauder" }
                default { return "默认回退 light：3 Marine；1 Medic；1 Marauder" }
            }
        }
        "Kerrigan" {
            if ($Mode -eq "MapStart") {
                switch ($k) {
                    "light" { return "4 Zergling；2 Hydralisk" }
                    "heavy" { return "2 Hydralisk；1 Queen；1 Ultralisk" }
                    "air" { return "2 Mutalisk；1 MutaliskBroodlord" }
                    "hero" { return "1 K5Kerrigan；3 Zergling；2 Hydralisk；1 Queen" }
                    "ultimate" { return "1 Ultralisk；2 Mutalisk" }
                    default { return "默认回退 light：4 Zergling；2 Hydralisk" }
                }
            }
            switch ($k) {
                "light" { return "4 Zergling；2 Hydralisk" }
                "heavy" { return "2 Hydralisk；1 Queen；1 Ultralisk" }
                "air" { return "2 Mutalisk；1 MutaliskBroodlord" }
                "hero" { return "1 K5Kerrigan；3 Zergling；2 Hydralisk；1 Queen" }
                default { return "默认回退 light：4 Zergling；2 Hydralisk" }
            }
        }
        "Fenix" {
            if ($Mode -eq "MapStart") {
                switch ($k) {
                    "light" { return "3 ZealotPurifier；2 AdeptFenix；1 SentryFenix" }
                    "heavy" { return "2 ZealotPurifier；2 StalkerPurifier；1 Immortal；1 ColossusPurifier" }
                    "air" { return "2 Scout；1 Carrier" }
                    "hero" { return "1 FenixDragoon；2 ZealotPurifier；1 AdeptFenix；1 SentryFenix" }
                    "ultimate" { return "若 FenixChampionClolarionCarrier 已解锁：1 FenixKaldalisZealot；1 FenixTalisAdept；1 FenixClolarionCarrier；否则回退 heavy" }
                    default { return "默认回退 light：3 ZealotPurifier；2 AdeptFenix；1 SentryFenix" }
                }
            }
            switch ($k) {
                "light" { return "3 ZealotPurifier；2 AdeptFenix；1 SentryFenix" }
                "heavy" { return "2 ZealotPurifier；2 StalkerPurifier；1 Immortal；1 ColossusPurifier" }
                "air" { return "2 Scout；1 Carrier" }
                "hero" { return "1 FenixDragoon；2 ZealotPurifier；1 AdeptFenix；1 SentryFenix" }
                default { return "默认回退 light：3 ZealotPurifier；2 AdeptFenix；1 SentryFenix" }
            }
        }
        "Vorazun" {
            if ($Mode -eq "MapStart") {
                switch ($k) {
                    "light" { return "2 Zealot；1 Stalker；2 DarkTemplarShakuras" }
                    "heavy" { return "2 Stalker；2 DarkTemplarShakuras；1 CorsairMP；1 Immortal" }
                    "air" { return "2 CorsairMP；1 VoidRay；1 Oracle" }
                    "hero" { return "2 DarkTemplarShakuras；2 Stalker；1 CorsairMP" }
                    default { return "默认回退 light：2 Zealot；1 Stalker；2 DarkTemplarShakuras" }
                }
            }
            switch ($k) {
                "light" { return "2 Zealot；1 Stalker；2 DarkTemplarShakuras" }
                "heavy" { return "2 Stalker；2 DarkTemplarShakuras；1 Immortal" }
                "air" { return "2 Stalker；2 DarkTemplarShakuras；1 Immortal" }
                "hero" { return "2 DarkTemplarShakuras；2 Stalker；1 Immortal" }
                default { return "默认回退 light：2 Zealot；1 Stalker；2 DarkTemplarShakuras" }
            }
        }
        "Karax" {
            if ($Mode -eq "MapStart") {
                switch ($k) {
                    "light" { return "4 Zealot；2 SentryPhasing" }
                    "heavy" { return "3 Zealot；2 SentryPhasing；2 Immortal" }
                    "air" { return "3 Carrier" }
                    "hero" { return "3 Zealot；2 Immortal；2 Colossus" }
                    default { return "默认回退 light：4 Zealot；2 SentryPhasing" }
                }
            }
            switch ($k) {
                "light" { return "4 Zealot；2 SentryPhasing" }
                "heavy" { return "3 Zealot；2 SentryPhasing；2 Immortal" }
                "air" { return "3 Carrier" }
                "hero" { return "3 Zealot；2 Immortal；2 Colossus" }
                default { return "默认回退 light：4 Zealot；2 SentryPhasing" }
            }
        }
        "Artanis" {
            if ($Mode -eq "MapStart") {
                switch ($k) {
                    "light" { return "3 ZealotAiur；2 Dragoon" }
                    "heavy" { return "2 ZealotAiur；2 Dragoon；1 ImmortalAiur；1 Reaver" }
                    "air" { return "2 PhoenixAiur；1 Tempest" }
                    "hero" { return "1 ArtanisVoid；2 ZealotAiur；2 Dragoon；1 HighTemplar" }
                    "ultimate" { return "若 ArtanisUnlockTempest 已解锁：1 CarrierAiur；1 Tempest；否则回退 heavy" }
                    default { return "默认回退 light：3 ZealotAiur；2 Dragoon" }
                }
            }
            switch ($k) {
                "light" { return "3 ZealotAiur；2 Dragoon" }
                "heavy" { return "2 ZealotAiur；2 Dragoon；1 ImmortalAiur；1 Reaver" }
                "air" { return "2 PhoenixAiur；1 Tempest" }
                "hero" { return "1 ArtanisVoid；2 ZealotAiur；2 Dragoon；1 HighTemplar" }
                "ultimate" { return "1 CarrierAiur；1 Tempest" }
                default { return "默认回退 light：3 ZealotAiur；2 Dragoon" }
            }
        }
        "Zeratul" {
            switch ($k) {
                "light" { return "2 ZeratulSummonZealot；2 ZeratulStalker；1 ZeratulSentry" }
                "heavy" { return "2 ZeratulStalker；1 ZeratulImmortal；1 ZeratulDisruptor；1 ZeratulSummonKarass" }
                "air" { return "2 ZeratulSummonVoidRay；1 Mohandar" }
                "hero" { return "1 ZeratulCoop；1 ZeratulSummonKarass；1 Mohandar；1 ZeratulHeroDarkArchon" }
                "ultimate" { return "1 ZeratulXelNagaConstruct；1 ZeratulXelNagaConstructCyan" }
                default { return "默认回退 light：2 ZeratulSummonZealot；2 ZeratulStalker；1 ZeratulSentry" }
            }
        }
        default {
            return "未登记 helper 兵种组合"
        }
    }
}

function Add-CommanderModulePath {
    param(
        [System.Collections.Generic.List[string]]$Paths,
        [string]$ModsRoot,
        [string]$ModuleName
    )

    $path = Join-Path $ModsRoot "$ModuleName.SC2Mod\Base.SC2Data\GameData\UserData.xml"
    if ((Test-Path -LiteralPath $path) -and (-not $Paths.Contains($path))) {
        [void]$Paths.Add($path)
    }
}

function Get-CommanderAchBaseUnits {
    param([string]$ModsRoot)

    $paths = New-Object System.Collections.Generic.List[string]
    Add-CommanderModulePath -Paths $paths -ModsRoot $ModsRoot -ModuleName "XMCore"
    foreach ($commander in $targetCommanders) {
        Add-CommanderModulePath -Paths $paths -ModsRoot $ModsRoot -ModuleName ("XM" + $commander)
    }

    $result = @{}
    foreach ($path in $paths) {
        if (-not (Test-Path -LiteralPath $path)) {
            continue
        }

        [xml]$xml = Get-Content -LiteralPath $path -Raw
        $commanderAch = @($xml.Catalog.CUser | Where-Object { $_.id -eq "CommanderAch" })[0]
        if ($null -eq $commanderAch) {
            continue
        }

        foreach ($instance in @($commanderAch.Instances)) {
            if ($targetCommanders -notcontains $instance.Id) {
                continue
            }

            $commandCenter = @($instance.Unit | Where-Object { $_.Field.Id -eq "CommandCenter" })[0].Unit
            $secondUnit = @($instance.Unit | Where-Object { $_.Field.Id -eq "SecondUnit" })[0].Unit
            $worker = @($instance.Unit | Where-Object { $_.Field.Id -eq "Worker" })[0].Unit

            $result[$instance.Id] = [pscustomobject]@{
                Commander = $instance.Id
                CommandCenter = $commandCenter
                SecondUnit = $secondUnit
                Worker = $worker
                Source = $path
            }
        }
    }

    foreach ($commander in $targetCommanders) {
        if (-not $result.ContainsKey($commander)) {
            throw "Missing CommanderAch base unit data for $commander"
        }
    }

    return $result
}

function Get-CallTarget {
    param(
        [string]$Mode,
        [string[]]$CallArgs
    )

    if ($Mode -eq "MapStart") {
        if ($CallArgs.Count -ge 3) {
            return $CallArgs[2]
        }
    }
    elseif ($Mode -eq "Cargo") {
        if ($CallArgs.Count -ge 1) {
            return $CallArgs[0]
        }
    }

    return ""
}

function Get-UnitCreateSummary {
    param(
        [string]$Line,
        [int]$LineNumber
    )

    $createMatch = [regex]::Match($Line, '(?<fn>libNtve_gf_CreateUnitsWithDefaultFacing|libNtve_gf_CreateUnitsAtPoint2)\s*\((?<args>.*)\);')
    if ($createMatch.Success) {
        $args = @(Split-CallArguments -Text $createMatch.Groups["args"].Value)
        if ($args.Count -ge 5) {
            return [pscustomobject]@{
                Unit = ($args[1] -replace '^"|"$', '')
                Count = $args[0]
                Target = $args[4]
                Line = $LineNumber
            }
        }
    }

    $cargoMatch = [regex]::Match($Line, 'UnitCargoCreate\s*\((?<args>.*)\);')
    if ($cargoMatch.Success) {
        $args = @(Split-CallArguments -Text $cargoMatch.Groups["args"].Value)
        if ($args.Count -ge 3) {
            return [pscustomobject]@{
                Unit = ($args[1] -replace '^"|"$', '')
                Count = $args[2]
                Target = $args[0]
                Line = $LineNumber
            }
        }
    }

    return $null
}

function Format-DirectCreation {
    param([object[]]$Creations)

    if ($Creations.Count -eq 0) {
        return ""
    }

    $items = @()
    foreach ($creation in $Creations) {
        $items += ("{0} x{1}，目标/容器：{2}，行：{3}" -f $creation.Unit, $creation.Count, $creation.Target, $creation.Line)
    }

    return ($items -join "；")
}

function Remove-LastContext {
    param([object[]]$Contexts)

    if ($Contexts.Count -le 1) {
        return @()
    }

    return @($Contexts[0..($Contexts.Count - 2)])
}

function Get-MapHelperCalls {
    param([string]$MapScript)

    if (-not (Test-Path -LiteralPath $MapScript)) {
        return @()
    }

    $lines = Get-Content -LiteralPath $MapScript
    $contexts = @()
    $depth = 0
    $calls = New-Object System.Collections.Generic.List[object]

    for ($i = 0; $i -lt $lines.Count; $i += 1) {
        $lineNumber = $i + 1
        $line = $lines[$i]

        while (($contexts.Count -gt 0) -and ($depth -lt $contexts[-1].BlockDepth)) {
            $contexts = @(Remove-LastContext -Contexts @($contexts))
        }

        $branchCommanders = @()
        foreach ($commander in $targetCommanders) {
            if ($line -match ('==\s*"' + [regex]::Escape($commander) + '"')) {
                $branchCommanders += $commander
            }
        }

        if (($branchCommanders.Count -gt 0) -and ($line -match "\{")) {
            $openCount = ([regex]::Matches($line, "\{")).Count
            $contexts = @($contexts) + [pscustomobject]@{
                Commanders = @($branchCommanders | Select-Object -Unique)
                BlockDepth = $depth + $openCount
                StartLine = $lineNumber
            }
        }

        $helperMatch = [regex]::Match($line, 'libE0EAE146_gf_(?<helper>[A-Za-z]+)Create(?<mode>MapStart|Cargo)Squad\s*\((?<args>.*)\);')
        if ($helperMatch.Success) {
            $helperCommander = $helperMatch.Groups["helper"].Value
            $mode = $helperMatch.Groups["mode"].Value
            $argsText = $helperMatch.Groups["args"].Value.Trim()
            $args = @(Split-CallArguments -Text $argsText)
            $kind = Get-StringLiteralKind -ArgsText $argsText
            $target = Get-CallTarget -Mode $mode -CallArgs $args
            $activeCommanders = @()

            if ($contexts.Count -gt 0) {
                $activeCommanders = @($contexts[-1].Commanders)
            }
            elseif ($targetCommanders -contains $helperCommander) {
                $activeCommanders = @($helperCommander)
            }
            elseif ($helperCommander -eq "Abathur") {
                $activeCommanders = @("Abathur")
            }

            foreach ($commander in ($activeCommanders | Select-Object -Unique)) {
                if ($targetCommanders -notcontains $commander) {
                    continue
                }

                $alias = (($commander -eq "AbathurReborn") -and ($helperCommander -eq "Abathur"))
                $calls.Add([pscustomobject]@{
                    Commander = $commander
                    HelperCommander = $helperCommander
                    Mode = $mode
                    Kind = $kind
                    Target = $target
                    Args = $argsText
                    Line = $lineNumber
                    Alias = $alias
                    Composition = Get-SquadComposition -Commander $commander -HelperCommander $helperCommander -Mode $mode -Kind $kind
                })
            }
        }

        $depth += Get-BraceDelta -Line $line
        if ($depth -lt 0) {
            $depth = 0
        }

        while (($contexts.Count -gt 0) -and ($depth -lt $contexts[-1].BlockDepth)) {
            $contexts = @(Remove-LastContext -Contexts @($contexts))
        }
    }

    $result = @()
    foreach ($call in $calls) {
        $result += $call
    }
    return $result
}

function Get-MapDirectCreations {
    param([string]$MapScript)

    if (-not (Test-Path -LiteralPath $MapScript)) {
        return @()
    }

    $lines = Get-Content -LiteralPath $MapScript
    $contexts = @()
    $depth = 0
    $creations = New-Object System.Collections.Generic.List[object]

    for ($i = 0; $i -lt $lines.Count; $i += 1) {
        $lineNumber = $i + 1
        $line = $lines[$i]

        while (($contexts.Count -gt 0) -and ($depth -lt $contexts[-1].BlockDepth)) {
            $contexts = @(Remove-LastContext -Contexts @($contexts))
        }

        $branchCommanders = @()
        foreach ($commander in $targetCommanders) {
            if ($line -match ('==\s*"' + [regex]::Escape($commander) + '"')) {
                $branchCommanders += $commander
            }
        }

        if (($branchCommanders.Count -gt 0) -and ($line -match "\{")) {
            $openCount = ([regex]::Matches($line, "\{")).Count
            $contexts = @($contexts) + [pscustomobject]@{
                Commanders = @($branchCommanders | Select-Object -Unique)
                BlockDepth = $depth + $openCount
                StartLine = $lineNumber
            }
        }

        if ($contexts.Count -gt 0) {
            $creation = Get-UnitCreateSummary -Line $line -LineNumber $lineNumber
            if ($null -ne $creation) {
                foreach ($commander in ($contexts[-1].Commanders | Select-Object -Unique)) {
                    if ($targetCommanders -notcontains $commander) {
                        continue
                    }

                    $creations.Add([pscustomobject]@{
                        Commander = $commander
                        Unit = $creation.Unit
                        Count = $creation.Count
                        Target = $creation.Target
                        Line = $creation.Line
                    })
                }
            }
        }

        $depth += Get-BraceDelta -Line $line
        if ($depth -lt 0) {
            $depth = 0
        }

        while (($contexts.Count -gt 0) -and ($depth -lt $contexts[-1].BlockDepth)) {
            $contexts = @(Remove-LastContext -Contexts @($contexts))
        }
    }

    $result = @()
    foreach ($creation in $creations) {
        $result += $creation
    }
    return $result
}

function Get-BranchCount {
    param(
        [string]$Text,
        [string]$Commander
    )

    if ([string]::IsNullOrEmpty($Text)) {
        return 0
    }

    return ([regex]::Matches($Text, '==\s*"' + [regex]::Escape($Commander) + '"')).Count
}

function Format-BaseInit {
    param(
        [pscustomobject]$ScanRow,
        [string]$Commander,
        [hashtable]$BaseUnits
    )

    $meta = $runtime[$Commander]
    $base = $BaseUnits[$Commander]
    $initArgs = ConvertTo-InvariantString $ScanRow.InitializeArgs

    if ([string]::IsNullOrWhiteSpace($initArgs)) {
        return "无玩法 Initialize；本图按 Launcher/UI 处理，不创建玩法单位。"
    }

    if ([string]::IsNullOrWhiteSpace((ConvertTo-InvariantString $ScanRow.InitializeBaseArgs))) {
        return ("Initialize({0})：读取 Bank 指挥官，设置控制台 {1}；无 InitializeBase，不自动创建基地、工人、第二单位或基地英雄。{2}" -f $initArgs, $meta.Console, $meta.Extra)
    }

    $args = @(Split-CallArguments -Text $ScanRow.InitializeBaseArgs)
    $secondUnitPoint = $args[0]
    $workerParam = [int]$args[1]
    $workerStaticCount = $workerParam + 1
    $secondBase = $args[2]
    $createHero = ($args[3] -match "true")
    $secondBaseText = "无二基地"
    if ($secondBase -and ($secondBase -ne "null")) {
        $secondBaseText = "二基地 {0} x1 at {1}" -f $base.CommandCenter, $secondBase
    }

    $heroText = "不额外创建基地英雄"
    if ($createHero -and -not [string]::IsNullOrWhiteSpace($meta.Hero)) {
        $heroText = ("创建基地英雄 {0} x1 at {1}" -f $meta.Hero, $secondUnitPoint)
    }
    elseif ($createHero) {
        $heroText = "lp_createHero=true，但该指挥官在 InitializeBase 中无额外英雄分支"
    }

    return ("Initialize({0}) + InitializeBase：主基地 {1} x1 at PlayerStartLocation(1)；{2}；工人 {3} x{4}（lp_worker={5}，代码循环 0..lp_worker）；第二单位 {6} x1 at {7}；{8}；面板/施法者 {9}/{10}；{11}" -f $initArgs, $base.CommandCenter, $secondBaseText, $base.Worker, $workerStaticCount, $workerParam, $base.SecondUnit, $secondUnitPoint, $heroText, $meta.Caster, $meta.Panel, $meta.Extra)
}

function Format-CallGroup {
    param(
        [object[]]$Calls,
        [object[]]$DirectCreations
    )

    $items = @()
    if ($Calls.Count -eq 0) {
        $items += "无地图本地 helper；依赖通用初始化或地图手写分支。"
    }
    else {
        $groups = $Calls | Group-Object Mode, HelperCommander, Kind, Alias, Composition
        foreach ($group in $groups) {
            $first = $group.Group[0]
            $modeText = if ($first.Mode -eq "MapStart") { "地图开局队伍" } else { "货舱队伍" }
            $aliasText = if ($first.Alias) { "（AbathurReborn 复用 Abathur helper，helper 内切 Reborn 单位）" } else { "" }
            $targets = @($group.Group | ForEach-Object { $_.Target } | Where-Object { -not [string]::IsNullOrWhiteSpace($_) } | Select-Object -Unique)
            $lines = @($group.Group | ForEach-Object { $_.Line } | Select-Object -Unique)
            $targetText = if ($targets.Count -gt 0) { "目标/容器：" + ($targets -join "、") } else { "目标/容器：未解析" }
            $lineText = "行：" + ($lines -join ",")
            $items += ('{0} `{1}.{2}` x{3}{4}，{5}，{6}，每次生成：{7}' -f $modeText, $first.HelperCommander, $first.Kind, $group.Count, $aliasText, $targetText, $lineText, $first.Composition)
        }
    }

    $directText = Format-DirectCreation -Creations $DirectCreations
    if (-not [string]::IsNullOrWhiteSpace($directText)) {
        $items += "地图手写创建/装载：" + $directText
    }

    return ($items -join "<br>")
}

function Format-LocalLogic {
    param(
        [int]$BranchCount,
        [object[]]$Calls,
        [object[]]$DirectCreations,
        [string]$Commander
    )

    if (($Calls.Count -eq 0) -and ($DirectCreations.Count -eq 0)) {
        if ($helperFamilyByCommander.ContainsKey($Commander)) {
            return "无本地逻辑替换；依赖 XMFinal.Initialize/InitializeBase 的通用分支。"
        }

        return "无本地逻辑替换；依赖 XMFinal.Initialize/InitializeBase 的通用分支。"
    }

    $aliasCount = @($Calls | Where-Object { $_.Alias }).Count
    $directCount = $DirectCreations.Count
    if ($aliasCount -gt 0) {
        $directText = if ($directCount -gt 0) { "；另有 $directCount 个手写创建/装载动作" } else { "" }
        return ('本地图存在 {0} 个 `{1}` 分支命中；其中 {2} 个调用复用 Abathur helper，实际单位由 `gv_commander == "AbathurReborn"` 切换{3}。' -f $BranchCount, $Commander, $aliasCount, $directText)
    }

    if (($Calls.Count -eq 0) -and ($directCount -gt 0)) {
        return ('本地图存在 {0} 个 `{1}` 分支命中；未调用统一 helper，但有 {2} 个地图手写创建/装载动作。' -f $BranchCount, $Commander, $directCount)
    }

    $directText = if ($directCount -gt 0) { "；另有 $directCount 个地图手写创建/装载动作" } else { "" }
    return ('本地图存在 {0} 个 `{1}` 分支命中；本地队伍/货舱已替换为 `{1}` 对应 helper{2}。' -f $BranchCount, $Commander, $directText)
}

function Escape-MarkdownCell {
    param([string]$Text)

    if ($null -eq $Text) {
        return ""
    }

    return ($Text -replace "\|", "\|" -replace "`r?`n", "<br>")
}

function Get-CommanderZh {
    param([string]$Commander)

    if ($commanderNamesZh.ContainsKey($Commander)) {
        return $commanderNamesZh[$Commander]
    }

    return $Commander
}

function Get-UnitZh {
    param([string]$UnitId)

    if ($unitNamesZh.ContainsKey($UnitId)) {
        return $unitNamesZh[$UnitId]
    }

    return $UnitId
}

function Get-KindZh {
    param([string]$Kind)

    if ($kindNamesZh.ContainsKey($Kind)) {
        return $kindNamesZh[$Kind]
    }

    if ([string]::IsNullOrWhiteSpace($Kind)) {
        return "默认"
    }

    return $Kind
}

function Convert-TargetToChinese {
    param([string]$Target)

    if ([string]::IsNullOrWhiteSpace($Target)) {
        return "未注明位置或容器"
    }

    $value = $Target
    $value = [regex]::Replace($value, 'UnitFromId\((?<id>\d+)\)', '单位 $1')
    $value = [regex]::Replace($value, 'PointFromId\((?<id>\d+)\)', '点位 $1')
    $value = [regex]::Replace($value, 'RegionFromId\((?<id>\d+)\)', '区域 $1')
    $value = $value -replace 'RegionGetCenter', '区域中心'
    $value = $value -replace 'UnitGetPosition', '单位所在位置'
    $value = $value -replace 'UnitLastCreated\(\)', '刚创建的单位'
    $value = $value -replace 'RegionGetBoundsMin', '全图区域左下角'
    $value = $value -replace 'RegionEntireMap\(\)', '全图区域'
    $value = $value -replace 'EventUnit\(\)', '事件单位'
    $value = $value -replace 'UnitCargoLastCreatedGroup\(\)', '刚装载的货舱单位组'
    $value = $value -replace 'UnitLastCreatedGroup\(\)', '刚创建的单位组'
    $value = $value -replace 'PlayerStartLocation\(1\)', '玩家 1 起始点'
    $value = $value -replace 'gv_introDropship', '开场运输艇'
    $value = $value -replace 'gv_p1_USER', '玩家 1'
    $value = $value -replace 'gv_p01_USER', '玩家 1'
    $value = $value -replace 'gv_p7_MISSINGSOLDIERS', '失踪士兵阵营'
    $value = $value -replace 'gv_p12_MOEBIUS', '莫比斯阵营'
    $value = $value -replace '\(', '（'
    $value = $value -replace '\)', '）'
    return $value
}

function Convert-CompositionToChinese {
    param([string]$Composition)

    if ([string]::IsNullOrWhiteSpace($Composition)) {
        return ""
    }

    $text = $Composition
    $unitIds = @($unitNamesZh.Keys | Sort-Object Length -Descending)
    foreach ($unitId in $unitIds) {
        $text = [regex]::Replace($text, ('\b' + [regex]::Escape($unitId) + '\b'), (Get-UnitZh $unitId))
    }

    $text = [regex]::Replace($text, '(^|；)(\d+)\s+', '$1$2 个')
    $text = $text -replace '若 ', '如果 '
    $text = $text -replace ' 已解锁：', ' 已解锁：'
    $text = $text -replace '否则回退 ', '否则改用'
    $text = $text -replace '默认回退 ', '默认改用'
    $text = $text -replace 'light', '轻型队伍'
    $text = $text -replace 'heavy', '重型队伍'
    $text = $text -replace 'air', '空中队伍'
    $text = $text -replace 'hero', '英雄队伍'
    $text = $text -replace 'ultimate', '终极队伍'

    return $text
}

function Convert-DirectCreationToChinese {
    param([object[]]$Creations)

    if ($Creations.Count -eq 0) {
        return ""
    }

    $items = @()
    foreach ($creation in $Creations) {
        $unit = Get-UnitZh $creation.Unit
        $target = Convert-TargetToChinese $creation.Target
        $items += ("{0} 个 {1}，位置/容器：{2}，脚本行：{3}" -f $creation.Count, $unit, $target, $creation.Line)
    }

    return ($items -join "；")
}

function Convert-BaseSummaryToChinese {
    param([string]$Summary)

    if ([string]::IsNullOrWhiteSpace($Summary)) {
        return ""
    }

    $text = $Summary
    $unitIds = @($unitNamesZh.Keys | Sort-Object Length -Descending)
    foreach ($unitId in $unitIds) {
        $text = [regex]::Replace($text, ('\b' + [regex]::Escape($unitId) + '\b'), (Get-UnitZh $unitId))
    }

    $text = $text -replace 'Initialize\(false\) \+ InitializeBase：', ''
    $text = $text -replace 'Initialize\(true\)：读取 Bank 指挥官，设置控制台 [^；]+；', ''
    $text = $text -replace '无玩法 Initialize；本图按 Launcher/UI 处理，不创建玩法单位。', '无玩法初始化；本图按启动器/界面处理，不创建玩法单位。'
    $text = $text -replace '无 InitializeBase，不自动创建基地、工人、第二单位或基地英雄。', '不走通用基地创建，不自动创建基地、工人、第二单位或基地英雄。'
    $text = $text -replace 'x1 at PlayerStartLocation\(1\)', '1 个，在玩家 1 起始点'
    $text = [regex]::Replace($text, 'x1 at PointFromId\((?<id>\d+)\)', '1 个，在点位 ${id}')
    $text = [regex]::Replace($text, 'x(?<count>\d+)', '${count} 个')
    $text = $text -replace 'lp_worker=', '参数工人数='
    $text = $text -replace '代码循环 0\.\.lp_worker', '代码按 0 到参数工人数循环'
    $text = $text -replace 'lp_createHero=true，但该指挥官在 InitializeBase 中无额外英雄分支', '本地图要求创建英雄，但该指挥官没有额外基地英雄分支'
    $text = $text -replace '面板/施法者 [^；]+；', ''
    $text = $text -replace '生物质触发器：AbathurRebornCollectBiomass', '启用重生阿巴瑟生物质机制'
    $text = $text -replace '生物质触发器：AbathurCollectBiomass', '启用阿巴瑟生物质机制'
    $text = $text -replace '地图本地阿巴瑟队伍复用 Abathur helper，但 helper 内按 当前指挥官变量 切换 Reborn 单位', '地图本地阿巴瑟队伍沿用阿巴瑟辅助逻辑；当前指挥官为重生阿巴瑟时会生成重生单位'
    $text = $text -replace '地图本地阿巴瑟队伍复用 阿巴瑟 helper，但 helper 内按 当前指挥官变量 切换 重生 单位', '地图本地阿巴瑟队伍沿用阿巴瑟辅助逻辑；当前指挥官为重生阿巴瑟时会生成重生单位'
    $text = $text -replace '使用 Alarak 面板初始化', '使用阿拉纳克面板初始化'
    $text = $text -replace '额外补 Kerrigan 等级/英雄相关升级', '额外补凯瑞甘等级和英雄相关升级'
    $text = $text -replace '非 RPG 初始化额外增加 60 人口上限', '非剧情初始化额外增加 60 人口上限'
    $text = $text -replace 'InitializeBase 初始化德哈卡事件', '通用基地初始化会初始化德哈卡事件'
    $text = $text -replace 'InitializeBase 创建 Stukov 面板施法者、显示选择按钮，并铺全图菌毯', '通用基地初始化会创建斯托科夫面板施法者、显示选择按钮，并铺全图菌毯'
    $text = $text -replace '非 RPG 初始化创建泰凯斯施法者并初始化小队', '非剧情初始化会创建泰凯斯施法者并初始化小队'
    $text = $text -replace 'InitializeBase 记录小队主建筑并启动英雄招募充能', '通用基地初始化会记录小队主建筑并启动英雄招募充能'
    $text = $text -replace 'InitializeBase 执行米拉汉初始化、创建面板施法者并显示选择按钮', '通用基地初始化会执行米拉汉初始化、创建面板施法者并显示选择按钮'
    $text = $text -replace 'InitializeBase 初始化诺娃施法器、面板与粘滞榴弹升级', '通用基地初始化会初始化诺娃施法器、面板与粘滞榴弹升级'
    $text = $text -replace 'lp_createHero=true 时初始化诺娃英雄', '需要创建英雄时初始化诺娃英雄'
    $text = $text -replace 'Initialize 初始化蒙斯克经验系统', '统一初始化会初始化蒙斯克经验系统'
    $text = $text -replace 'InitializeBase 读取精通/成就加成、创建施法者并初始化蒙斯克机制', '通用基地初始化会读取精通/成就加成、创建施法者并初始化蒙斯克机制'
    $text = $text -replace 'InitializeBase 绑定德拉肯激光钻机、创建斯旺施法者、加入钻机施法组', '通用基地初始化会绑定德拉肯激光钻机、创建斯旺施法者、加入钻机施法组'
    $text = $text -replace 'InitializeBase 读取成就响应、创建斯台特曼施法者，并启动能量场触发器', '通用基地初始化会读取成就响应、创建斯台特曼施法者，并启动能量场触发器'
    $text = $text -replace '使用统一 统一指挥官面板初始化', '使用统一指挥官面板初始化'
    $text = $text -replace 'CommanderPanelInit', '统一指挥官面板初始化'
    $text = $text -replace 'gv_commander', '当前指挥官变量'
    $text = $text -replace 'AbathurReborn', '重生阿巴瑟'
    $text = $text -replace 'Abathur', '阿巴瑟'
    $text = $text -replace 'Dehaka', '德哈卡'
    $text = $text -replace 'Mengsk', '蒙斯克'
    $text = $text -replace 'Mira', '米拉汉'
    $text = $text -replace 'Nova', '诺娃'
    $text = $text -replace 'Stetmann', '斯台特曼'
    $text = $text -replace 'Stukov', '斯托科夫'
    $text = $text -replace 'Swann', '斯旺'
    $text = $text -replace 'Tychus', '泰凯斯'
    $text = $text -replace 'Reborn', '重生'
    $text = $text -replace 'helper', '辅助函数'
    return $text
}

function Convert-LocalLogicToChinese {
    param(
        [string]$Logic,
        [string]$Commander
    )

    if ([string]::IsNullOrWhiteSpace($Logic)) {
        return ""
    }

    $name = Get-CommanderZh $Commander
    $text = $Logic
    $text = $text -replace ('`' + [regex]::Escape($Commander) + '`'), $name
    $text = $text -replace '`AbathurReborn`', '重生阿巴瑟'
    $text = $text -replace '`Abathur`', '阿巴瑟'
    $text = $text -replace '`gv_commander == "AbathurReborn"`', '当前指挥官为重生阿巴瑟时'
    $text = $text -replace 'AbathurReborn', '重生阿巴瑟'
    $text = $text -replace 'Abathur', '阿巴瑟'
    $text = $text -replace 'Dehaka', '德哈卡'
    $text = $text -replace 'Mengsk', '蒙斯克'
    $text = $text -replace 'Mira', '米拉汉'
    $text = $text -replace 'Nova', '诺娃'
    $text = $text -replace 'Stetmann', '斯台特曼'
    $text = $text -replace 'Stukov', '斯托科夫'
    $text = $text -replace 'Swann', '斯旺'
    $text = $text -replace 'Tychus', '泰凯斯'
    $text = $text -replace 'helper', '辅助函数'
    $text = $text -replace '使用统一 统一指挥官面板初始化', '使用统一指挥官面板初始化'
    $text = $text -replace 'XMFinal.Initialize/InitializeBase', '统一初始化'
    $text = $text -replace '未调用统一 辅助函数', '未调用统一辅助函数'
    return $text
}

function Format-ChineseCallGroup {
    param(
        [object[]]$Calls,
        [object[]]$DirectCreations
    )

    $items = @()
    if ($Calls.Count -eq 0) {
        $items += "无地图本地辅助函数队伍。"
    }
    else {
        $groups = $Calls | Group-Object Mode, HelperCommander, Kind, Alias, Composition
        foreach ($group in $groups) {
            $first = $group.Group[0]
            $modeText = if ($first.Mode -eq "MapStart") { "地图开局" } else { "货舱" }
            $helperName = Get-CommanderZh $first.HelperCommander
            $kindName = Get-KindZh $first.Kind
            $aliasText = if ($first.Alias) { "，重生阿巴瑟沿用阿巴瑟分支但生成重生单位" } else { "" }
            $targets = @($group.Group | ForEach-Object { Convert-TargetToChinese $_.Target } | Where-Object { -not [string]::IsNullOrWhiteSpace($_) } | Select-Object -Unique)
            $lines = @($group.Group | ForEach-Object { $_.Line } | Select-Object -Unique)
            $targetText = if ($targets.Count -gt 0) { "位置/容器：" + ($targets -join "、") } else { "位置/容器：未注明" }
            $lineText = "脚本行：" + ($lines -join "、")
            $composition = Convert-CompositionToChinese $first.Composition
            $items += ("{0}{1}{2}队伍 {3} 次{4}，{5}，{6}，每次生成：{7}" -f $helperName, $kindName, $modeText, $group.Count, $aliasText, $targetText, $lineText, $composition)
        }
    }

    $directText = Convert-DirectCreationToChinese -Creations $DirectCreations
    if (-not [string]::IsNullOrWhiteSpace($directText)) {
        $items += "地图手写创建/货舱装载：" + $directText
    }

    return ($items -join "<br>")
}

function Get-MapInitType {
    param([pscustomobject]$ScanRow)

    $initArgs = ConvertTo-InvariantString $ScanRow.InitializeArgs
    $baseArgs = ConvertTo-InvariantString $ScanRow.InitializeBaseArgs

    if ([string]::IsNullOrWhiteSpace($initArgs)) {
        return "启动器/选择界面，不创建玩法单位"
    }

    if ([string]::IsNullOrWhiteSpace($baseArgs)) {
        return "剧情/RPG 初始化，不走通用基地创建"
    }

    return "普通基地初始化"
}

function Format-CommanderLegend {
    param([hashtable]$BaseUnits)

    $lines = @()
    $lines += "| 指挥官 | 基地 | 第二单位 | 工人 | Runtime / 额外初始化 |"
    $lines += "|---|---|---|---|---|"
    foreach ($commander in $targetCommanders) {
        $base = $BaseUnits[$commander]
        $meta = $runtime[$commander]
        $hero = if ([string]::IsNullOrWhiteSpace($meta.Hero)) { "无 InitializeBase 英雄" } else { "lp_createHero=true 时创建 $($meta.Hero)" }
        $lines += ('| `{0}` | `{1}` | `{2}` | `{3}` | 控制台 `{4}`；施法者/面板 `{5}`/`{6}`；{7}；{8} |' -f $commander, $base.CommandCenter, $base.SecondUnit, $base.Worker, $meta.Console, $meta.Caster, $meta.Panel, $hero, $meta.Extra)
    }
    return $lines
}

function Format-SquadLegend {
    $pairs = @(
        @("Abathur", "Abathur"),
        @("AbathurReborn", "Abathur"),
        @("Alarak", "Alarak"),
        @("Artanis", "Artanis"),
        @("Fenix", "Fenix"),
        @("Karax", "Karax"),
        @("Kerrigan", "Kerrigan"),
        @("Raynor", "Raynor"),
        @("Vorazun", "Vorazun"),
        @("Zagara", "Zagara"),
        @("Zeratul", "Zeratul")
    )

    $kinds = @("light", "heavy", "air", "hero", "ultimate")
    $lines = @()
    $lines += "| 指挥官 | Helper | MapStart 兵种组合 | Cargo 兵种组合 |"
    $lines += "|---|---|---|---|"
    foreach ($pair in $pairs) {
        $commander = $pair[0]
        $helper = $pair[1]
        $mapItems = @()
        $cargoItems = @()
        foreach ($kind in $kinds) {
            $mapComposition = Get-SquadComposition -Commander $commander -HelperCommander $helper -Mode "MapStart" -Kind $kind
            $cargoComposition = Get-SquadComposition -Commander $commander -HelperCommander $helper -Mode "Cargo" -Kind $kind
            if ($mapComposition -notmatch "默认回退") {
                $mapItems += ('`{0}`：{1}' -f $kind, $mapComposition)
            }
            if ($cargoComposition -notmatch "默认回退") {
                $cargoItems += ('`{0}`：{1}' -f $kind, $cargoComposition)
            }
        }
        $helperText = if ($commander -eq "AbathurReborn") { "`Abathur` alias" } else { ('`{0}`' -f $helper) }
        $mapText = Escape-MarkdownCell -Text ($mapItems -join "<br>")
        $cargoText = Escape-MarkdownCell -Text ($cargoItems -join "<br>")
        $lines += ('| `{0}` | {1} | {2} | {3} |' -f $commander, $helperText, $mapText, $cargoText)
    }

    $nonHelperCommanders = @($targetCommanders | Where-Object { -not $helperFamilyByCommander.ContainsKey($_) })
    foreach ($commander in $nonHelperCommanders) {
        $lines += ('| `{0}` | 无 | 无统一 helper 兵种组合 | 无统一 helper 兵种组合 |' -f $commander)
    }

    return $lines
}

New-Item -ItemType Directory -Force -Path $OutputDir | Out-Null
New-Item -ItemType Directory -Force -Path $DocsDir | Out-Null

if (-not (Test-Path -LiteralPath $scanPath)) {
    $coverageScript = Join-Path $PSScriptRoot "export-map-init-coverage.ps1"
    if (-not (Test-Path -LiteralPath $coverageScript)) {
        throw "Missing scan input and coverage exporter: $scanPath"
    }
    & $coverageScript -ProjectRoot $ProjectRoot -OutputDir $OutputDir
}

$baseUnits = Get-CommanderAchBaseUnits -ModsRoot $modsRoot
$scanRows = @(Import-Csv -LiteralPath $scanPath)
$scanByMap = @{}
foreach ($row in $scanRows) {
    $scanByMap[$row.Map] = $row
}

$detailRows = New-Object System.Collections.Generic.List[object]
$mapCallCache = @{}
$mapDirectCreationCache = @{}
$mapTextCache = @{}

foreach ($mapName in $mapNames.Keys) {
    if (-not $scanByMap.ContainsKey($mapName)) {
        throw "Missing scan row for $mapName"
    }

    $mapDir = Join-Path $mapsRoot $mapName
    $mapScript = Join-Path $mapDir "MapScript.galaxy"
    $mapText = ""
    if (Test-Path -LiteralPath $mapScript) {
        $mapText = Get-Content -LiteralPath $mapScript -Raw
    }

    $calls = @(Get-MapHelperCalls -MapScript $mapScript)
    $directCreations = @(Get-MapDirectCreations -MapScript $mapScript)
    $mapCallCache[$mapName] = $calls
    $mapDirectCreationCache[$mapName] = $directCreations
    $mapTextCache[$mapName] = $mapText

    foreach ($commander in $targetCommanders) {
        $commanderCalls = @($calls | Where-Object { $_.Commander -eq $commander })
        $commanderDirectCreations = @($directCreations | Where-Object { $_.Commander -eq $commander })
        $branchCount = Get-BranchCount -Text $mapText -Commander $commander
        $baseSummary = Format-BaseInit -ScanRow $scanByMap[$mapName] -Commander $commander -BaseUnits $baseUnits
        $localLogic = Format-LocalLogic -BranchCount $branchCount -Calls $commanderCalls -DirectCreations $commanderDirectCreations -Commander $commander
        $localUnits = Format-CallGroup -Calls $commanderCalls -DirectCreations $commanderDirectCreations
        $risk = ""
        if ($knownMapRisks.ContainsKey($mapName)) {
            $risk = $knownMapRisks[$mapName]
        }

        $detailRows.Add([pscustomobject]@{
            Map = $mapName
            ChineseName = $mapNames[$mapName]
            Commander = $commander
            InitializeArgs = ConvertTo-InvariantString $scanByMap[$mapName].InitializeArgs
            InitializeBaseArgs = ConvertTo-InvariantString $scanByMap[$mapName].InitializeBaseArgs
            BranchCount = $branchCount
            LocalHelperCallCount = $commanderCalls.Count
            DirectCreationCount = $commanderDirectCreations.Count
            BaseInitialization = $baseSummary
            LocalLogicReplacement = $localLogic
            InitialUnits = $localUnits
            Risk = $risk
        })
    }
}

$detailRows | Export-Csv -LiteralPath $detailCsvPath -NoTypeInformation -Encoding UTF8

$markdown = New-Object System.Collections.Generic.List[string]
$markdown.Add("# 2026-05-26 地图指挥官逻辑替换与初始化兵种明细")
$markdown.Add("")
$markdown.Add("## 口径")
$markdown.Add("")
$markdown.Add("- 当前环境没有 SC2，本文只基于 Galaxy/XML/CSV 做静态推演，不代表进图验收通过。")
$markdown.Add('- 本文“指挥官 / 所有指挥官”纳入当前静态发现的 `XMFinal.Initialize/InitializeBase` 指挥官分支与对应 CommanderAch 模块：`XMAbathur`、`XMAbathurReborn`、`XMAlarak`、`XMArtanis`、`XMDehaka`、`XMFenix`、`XMKarax`、`XMKerrigan`、`XMMengsk`、`XMMira`、`XMNova`、`XMRaynor`、`XMStetmann`、`XMStukov`、`XMSwann`、`XMTychus`、`XMVorazun`、`XMZagara`、`XMZeratul`。')
$markdown.Add('- `XMFinal.SC2Mod` 是统一 runtime owner；本明细围绕 `XMFinal.Initialize`、`InitializeBase` 和地图本地 helper 分支展开。')
$markdown.Add('- `InitializeBase(lp_secondUnit, lp_worker, lp_secondBase, lp_createHero)` 的工人循环是 `0..lp_worker`，所以静态展开为 `lp_worker + 1` 个工人；这需要实机确认是否符合原作者预期。')
$markdown.Add('- `lp_createHero=false` 只表示不额外创建英雄；代码仍会创建 `CommanderAch.SecondUnit`。')
$markdown.Add('- `AbathurReborn` 地图本地逻辑复用 `AbathurCreate...Squad` helper，但 helper 内部会按 `gv_commander == "AbathurReborn"` 切到 `RavagerAbathurReborn`、`SwarmHost`、`QueenCoop`、`HotSLeviathan` 等 Reborn 单位。')
$markdown.Add("")
$markdown.Add("## 证据来源")
$markdown.Add("")
$markdown.Add('- `tmp/2026-05-26-commander-map-static-analysis/map-init-scan.csv`')
$markdown.Add('- `tmp/2026-05-26-commander-map-static-analysis/map-commander-init-detail.csv`')
$markdown.Add('- `scripts/sc2/export-map-init-coverage.ps1`')
$markdown.Add('- `scripts/sc2/export-map-commander-init-detail.ps1`')
$markdown.Add('- `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146.galaxy`')
$markdown.Add('- `合作指挥官版起义狂潮/Mods/XM/XMCore.SC2Mod/Base.SC2Data/GameData/UserData.xml`')
$markdown.Add('- `合作指挥官版起义狂潮/Mods/XM/XM*.SC2Mod/Base.SC2Data/GameData/UserData.xml`')
$markdown.Add('- `合作指挥官版起义狂潮/Maps/XM/*/MapScript.galaxy`')
$markdown.Add("")
$markdown.Add("## 通用基地与 Runtime")
$markdown.Add("")
foreach ($line in (Format-CommanderLegend -BaseUnits $baseUnits)) {
    $markdown.Add($line)
}
$markdown.Add("")
$markdown.Add("## Helper 兵种组合速查")
$markdown.Add("")
foreach ($line in (Format-SquadLegend)) {
    $markdown.Add($line)
}
$markdown.Add("")
$markdown.Add("## 地图 x 指挥官明细")
$markdown.Add("")

foreach ($mapName in $mapNames.Keys) {
    $scanRow = $scanByMap[$mapName]
    $riskText = ""
    if ($knownMapRisks.ContainsKey($mapName)) {
        $riskText = " 风险：" + $knownMapRisks[$mapName]
    }

    $markdown.Add(('### {0}（`{1}`）' -f $mapNames[$mapName], $mapName))
    $markdown.Add("")
    $markdown.Add(('- 初始化入口：`Initialize({0})`；`InitializeBase({1})`。{2}' -f (ConvertTo-InvariantString $scanRow.InitializeArgs), (ConvertTo-InvariantString $scanRow.InitializeBaseArgs), $riskText))
    $markdown.Add("")
    $markdown.Add("| 指挥官 | 通用初始化 / 建筑与基础单位 | 地图本地逻辑替换 | 本地初始化兵种 / 货舱 | 备注 |")
    $markdown.Add("|---|---|---|---|---|")
    foreach ($commander in $targetCommanders) {
        $row = @($detailRows | Where-Object { ($_.Map -eq $mapName) -and ($_.Commander -eq $commander) })[0]
        $markdown.Add(('| `{0}` | {1} | {2} | {3} | {4} |' -f $commander, (Escape-MarkdownCell $row.BaseInitialization), (Escape-MarkdownCell $row.LocalLogicReplacement), (Escape-MarkdownCell $row.InitialUnits), (Escape-MarkdownCell $row.Risk)))
    }
    $markdown.Add("")
}

$markdown.Add("## 静态结论")
$markdown.Add("")
$markdown.Add('- 29 张地图均有 `XMFinal` 依赖；玩法地图按静态扫描均能进入 `Initialize` 或 Launcher UI 流程。')
$markdown.Add("- 当前纳入 19 个指挥官、29 张地图，共 $($detailRows.Count) 条地图 x 指挥官明细。")
$markdown.Add("- 原先 11 个 helper 指挥官仍有统一队伍/货舱 helper；Dehaka、Mengsk、Mira、Nova、Stetmann、Stukov、Swann、Tychus 没有统一 MapStart/Cargo helper，统计中改按地图本地手写创建/装载动作列出。")
$markdown.Add('- 普通基地地图主要依赖 `XMFinal.InitializeBase`，差异来自 `CommanderAch` 的基地、工人、第二单位，以及 `InitializeBase` 内的 caster/面板/英雄分支。')
$markdown.Add('- 特殊地图的本地替换集中在 `thanson01`、`thanson02`、`thorner02`、`thorner03`、`thorner05s`、`traynor01`、`ttosh03b`、`ttychus02`、`ttychus03`、`ttychus04`、`ttychus05`、`tvalerian01`。')
$markdown.Add('- `traynor01`、`ttosh03b`、`thorner03`、`tvalerian01` 仍是后续实机验证优先级最高的地图，因为它们有 RPG/剧情变量或本地英雄语义。')

$markdown | Set-Content -LiteralPath $markdownPath -Encoding UTF8

$chineseMarkdown = New-Object System.Collections.Generic.List[string]
$chineseMarkdown.Add("# 2026-05-26 地图指挥官逻辑替换与初始化兵种明细（中文阅读版）")
$chineseMarkdown.Add("")
$chineseMarkdown.Add("## 阅读口径")
$chineseMarkdown.Add("")
$chineseMarkdown.Add("- 这是给人快速阅读的中文版本。")
$chineseMarkdown.Add("- 地图名、指挥官名、说明文字尽量使用中文。")
$chineseMarkdown.Add("- 单位尽量转为中文；地图文件名和点位/区域编号仍保留技术定位信息，方便后续追 Galaxy 和进图验证。")
$chineseMarkdown.Add("- 当前环境没有 SC2，本文仍然只是静态推演，不代表实机验收通过。")
$chineseMarkdown.Add("- 新纳入的德哈卡、蒙斯克、米拉汉、诺娃、斯台特曼、斯托科夫、斯旺、泰凯斯没有统一地图开局/货舱辅助函数；如果地图有手写创建或货舱装载，会在对应列单独列出。")
$chineseMarkdown.Add("")
$chineseMarkdown.Add("## 指挥官对照")
$chineseMarkdown.Add("")
$chineseMarkdown.Add("| 中文名 | 技术代号 |")
$chineseMarkdown.Add("|---|---|")
foreach ($commander in $targetCommanders) {
    $chineseMarkdown.Add(('| {0} | `{1}` |' -f (Get-CommanderZh $commander), $commander))
}
$chineseMarkdown.Add("")
$chineseMarkdown.Add("## 地图明细")
$chineseMarkdown.Add("")

foreach ($mapName in $mapNames.Keys) {
    $scanRow = $scanByMap[$mapName]
    $riskText = ""
    if ($knownMapRisks.ContainsKey($mapName)) {
        $riskText = "；静态风险：" + $knownMapRisks[$mapName]
    }

    $chineseMarkdown.Add(("### {0}" -f $mapNames[$mapName]))
    $chineseMarkdown.Add("")
    $chineseMarkdown.Add(('- 技术文件：`{0}`' -f $mapName))
    $chineseMarkdown.Add(('- 初始化类型：{0}{1}' -f (Get-MapInitType $scanRow), $riskText))
    $chineseMarkdown.Add("")
    $chineseMarkdown.Add("| 指挥官 | 通用初始化 / 建筑与基础单位 | 地图本地替换 | 本地初始兵种 / 货舱 |")
    $chineseMarkdown.Add("|---|---|---|---|")
    foreach ($commander in $targetCommanders) {
        $row = @($detailRows | Where-Object { ($_.Map -eq $mapName) -and ($_.Commander -eq $commander) })[0]
        $commanderCalls = @($mapCallCache[$mapName] | Where-Object { $_.Commander -eq $commander })
        $commanderDirectCreations = @($mapDirectCreationCache[$mapName] | Where-Object { $_.Commander -eq $commander })
        $baseText = Convert-BaseSummaryToChinese $row.BaseInitialization
        $logicText = Convert-LocalLogicToChinese -Logic $row.LocalLogicReplacement -Commander $commander
        $unitText = Format-ChineseCallGroup -Calls $commanderCalls -DirectCreations $commanderDirectCreations
        $chineseMarkdown.Add(('| {0} | {1} | {2} | {3} |' -f (Get-CommanderZh $commander), (Escape-MarkdownCell $baseText), (Escape-MarkdownCell $logicText), (Escape-MarkdownCell $unitText)))
    }
    $chineseMarkdown.Add("")
}

$chineseMarkdown.Add("## 结论")
$chineseMarkdown.Add("")
$chineseMarkdown.Add("- 这份中文阅读版与技术明细版来自同一个导出脚本和同一份 CSV。")
$chineseMarkdown.Add("- 共覆盖 29 张地图、19 个指挥官、$($detailRows.Count) 条地图 x 指挥官明细。")
$chineseMarkdown.Add("- 没有统一辅助函数的指挥官已纳入通用初始化与地图手写创建统计；这些分支仍需要后续实机验证。")
$chineseMarkdown.Add('- 后续如果改地图本地分支，重新运行 `scripts/sc2/export-map-commander-init-detail.ps1` 即可同步刷新两份 Markdown 和 CSV。')

$chineseMarkdown | Set-Content -LiteralPath $chineseMarkdownPath -Encoding UTF8

Write-Host "Wrote $detailCsvPath"
Write-Host "Wrote $markdownPath"
Write-Host "Wrote $chineseMarkdownPath"
