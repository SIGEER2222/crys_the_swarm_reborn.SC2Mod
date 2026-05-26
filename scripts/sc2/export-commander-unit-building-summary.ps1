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
    $OutputDir = Join-Path $ProjectRoot "tmp\2026-05-26-commander-unit-building-summary"
}

if ([string]::IsNullOrWhiteSpace($DocsDir)) {
    $DocsDir = Join-Path $ProjectRoot "docs\每日进度"
}

$modsRoot = Join-Path $ProjectRoot "合作指挥官版起义狂潮\Mods\XM"
$rootLocalePath = Join-Path $ProjectRoot "crys_the_swarm_reborn.SC2Mod\zhCN.SC2Data\LocalizedData\GameStrings.txt"
$summaryCsvPath = Join-Path $OutputDir "commander-unit-building-summary.csv"
$detailCsvPath = Join-Path $OutputDir "commander-unit-building-detail.csv"
$markdownPath = Join-Path $DocsDir "2026-05-26-所有指挥官兵种建筑静态整理.md"

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

$fallbackUnitNamesZh = @{
    "Aberration" = "畸变体"
    "Adept" = "使徒"
    "AdeptFenix" = "菲尼克斯使徒"
    "AlarakCoop" = "阿拉纳克"
    "AlarakChampion" = "阿拉纳克勇士"
    "Armory" = "军械库"
    "ArtanisVoid" = "阿塔尼斯"
    "Assimilator" = "同化气矿"
    "AutomatedRefinery" = "自动精炼厂"
    "Baneling" = "毒爆虫"
    "Banshee" = "女妖"
    "Barracks" = "兵营"
    "Battlecruiser" = "战列巡航舰"
    "BileLauncherZagara" = "胆汁喷射体"
    "BroodLord" = "巢虫领主"
    "Brutalisk" = "暴虐兽"
    "Bunker" = "地堡"
    "Carrier" = "航母"
    "CarrierAiur" = "艾尔航母"
    "Colossus" = "巨像"
    "ColossusPurifier" = "净化者巨像"
    "ColossusTaldarim" = "塔达林巨像"
    "CommandCenter" = "指挥中心"
    "CommandCenterMengsk" = "征兵中心"
    "CommandCenterMira" = "米拉汉指挥中心"
    "CommandCenterNova" = "诺娃指挥中心"
    "CommandCenterSwann" = "斯旺指挥中心"
    "Corruptor" = "腐化者"
    "CorsairMP" = "海盗船"
    "CreepTumor" = "菌毯瘤"
    "CyberneticsCore" = "控制芯核"
    "DarkArchon" = "黑暗执政官"
    "DarkPylon" = "黑暗水晶塔"
    "DarkShrine" = "黑暗圣坛"
    "DarkTemplarShakuras" = "黑暗圣堂武士"
    "DehakaCoop" = "德哈卡"
    "DehakaDrone" = "德哈卡工蜂"
    "DehakaHatchery" = "德哈卡孵化场"
    "DehakaHydraliskLevel2" = "德哈卡刺蛇"
    "DehakaMutalisk" = "德哈卡异龙"
    "DehakaRoachLevel2" = "德哈卡蟑螂"
    "DehakaSwarmHost" = "德哈卡虫群宿主"
    "DehakaUltraliskLevel2" = "德哈卡雷兽"
    "Diamondback" = "响尾蛇"
    "Dragoon" = "龙骑士"
    "Drone" = "工蜂"
    "DroneAbathur" = "阿巴瑟工蜂"
    "DroneAbathurReborn" = "重生阿巴瑟工蜂"
    "Egg" = "虫卵"
    "EvolutionChamber" = "进化腔"
    "Factory" = "重工厂"
    "FenixCoop" = "菲尼克斯"
    "FenixDragoon" = "菲尼克斯龙骑士"
    "FenixKaldalisZealot" = "卡尔达利斯"
    "FenixTalisAdept" = "塔莉丝"
    "FleetBeacon" = "舰队航标"
    "Forge" = "锻炉"
    "Gateway" = "传送门"
    "Ghost" = "幽灵"
    "GoliathSwann" = "斯旺歌利亚"
    "Hatchery" = "孵化场"
    "HatcheryAbathur" = "阿巴瑟孵化场"
    "HatcheryAbathurReborn" = "重生阿巴瑟孵化场"
    "HighTemplar" = "高阶圣堂武士"
    "HighTemplarTaldarim" = "塔达林高阶圣堂武士"
    "Hive" = "主巢"
    "HotSLeviathan" = "利维坦"
    "Hydralisk" = "刺蛇"
    "HydraliskDen" = "刺蛇兽穴"
    "HydraliskStetmann" = "斯台特曼刺蛇"
    "Immortal" = "不朽者"
    "ImmortalAiur" = "艾尔不朽者"
    "ImmortalTaldarim" = "塔达林不朽者"
    "K5Kerrigan" = "凯瑞甘"
    "Lair" = "虫穴"
    "Larva" = "幼虫"
    "Marine" = "陆战队员"
    "MarineMira" = "米拉汉陆战队员"
    "Medivac" = "医疗运输机"
    "Medic" = "医疗兵"
    "MissileTurret" = "导弹塔"
    "Mutalisk" = "异龙"
    "MutaliskBroodlord" = "巢虫领主"
    "Nexus" = "枢纽"
    "NovaCoop" = "诺娃"
    "Observer" = "侦测器"
    "Oracle" = "先知"
    "Overlord" = "王虫"
    "OverlordAbathur" = "阿巴瑟王虫"
    "OverlordAbathurReborn" = "重生阿巴瑟王虫"
    "Overseer" = "监察王虫"
    "PhotonCannon" = "光子炮台"
    "PhoenixAiur" = "艾尔凤凰"
    "Probe" = "探机"
    "Pylon" = "水晶塔"
    "Queen" = "女王"
    "QueenCoop" = "女王"
    "Ravager" = "破坏者"
    "RavagerAbathur" = "阿巴瑟破坏者"
    "RavagerAbathurReborn" = "重生阿巴瑟破坏者"
    "Reaver" = "金甲虫"
    "Refinery" = "精炼厂"
    "RoboticsFacility" = "机械台"
    "Roach" = "蟑螂"
    "RoachVile" = "邪恶蟑螂"
    "SCV" = "工程车"
    "SCVMengsk" = "蒙斯克工程车"
    "SCVMira" = "米拉汉工程车"
    "SCVNova" = "诺娃工程车"
    "SCVSwann" = "斯旺工程车"
    "ScienceVesselSwann" = "斯旺科技球"
    "Scout" = "侦察机"
    "Sentry" = "哨兵"
    "SentryFenix" = "菲尼克斯哨兵"
    "SentryPhasing" = "相位哨兵"
    "SiegeTank" = "攻城坦克"
    "SpawningPool" = "孵化池"
    "Spire" = "尖塔"
    "Stalker" = "追猎者"
    "StalkerPurifier" = "净化者追猎者"
    "Stargate" = "星门"
    "Starport" = "星港"
    "StarportMengsk" = "蒙斯克星港"
    "StarportMira" = "米拉汉星港"
    "StukovInfestedBanshee" = "斯托科夫感染女妖"
    "StukovInfestedDiamondBack" = "斯托科夫感染响尾蛇"
    "StukovInfestedSiegeTank" = "斯托科夫感染攻城坦克"
    "Supplicant" = "死徒"
    "SupplyDepot" = "补给站"
    "SwarmHost" = "虫群宿主"
    "SwarmHostMP" = "虫群宿主"
    "SwannSwann" = "斯旺"
    "Tempest" = "风暴战舰"
    "ThorSwann" = "斯旺雷神"
    "TrooperMengsk" = "帝国冲锋队"
    "TychusCoop" = "泰凯斯"
    "TychusCommandCenter" = "泰凯斯指挥中心"
    "TychusResearchCenter" = "泰凯斯研究中心"
    "TychusSCV" = "泰凯斯工程车"
    "Ultralisk" = "雷兽"
    "VoidRay" = "虚空辉光舰"
    "Vorazun" = "沃拉尊"
    "WarpGate" = "折跃门"
    "WarpPrism" = "折跃棱镜"
    "Zealot" = "狂热者"
    "ZealotAiur" = "艾尔狂热者"
    "ZealotPurifier" = "净化者狂热者"
    "ZagaraCorruptor" = "扎加拉腐化者"
    "ZagaraVoidCoop" = "扎加拉"
    "ZeratulCoop" = "泽拉图"
    "ZeratulDisruptor" = "泽拉图干扰者"
    "ZeratulHeroDarkArchon" = "黑暗执政官"
    "ZeratulImmortal" = "泽拉图不朽者"
    "ZeratulSentry" = "泽拉图哨兵"
    "ZeratulStalker" = "泽拉图追猎者"
    "ZeratulSummonKarass" = "卡拉斯"
    "ZeratulSummonVoidRay" = "泽拉图虚空辉光舰"
    "ZeratulSummonZealot" = "泽拉图狂热者"
    "Zergling" = "跳虫"
}

$metaByCommander = @{
    "Abathur" = @{
        Race = "Zerg"
        Module = "XMAbathur"
        Tokens = @("Abathur", "Biomass", "Brutalisk", "Leviathan", "ToxicNest", "RoachVile", "QueenCoop", "SwarmHostMP")
        Generic = @("Hatchery", "Lair", "Hive", "Drone", "Overlord", "Larva", "Egg", "EvolutionChamber", "SpawningPool", "RoachWarren", "HydraliskDen", "Spire", "GreaterSpire", "EvolutionPit", "CreepTumor", "QueenCoop", "Hydralisk", "RoachVile", "Ravager", "SwarmHostMP", "HotSLeviathan", "Brutalisk", "BiomassPickup")
    }
    "AbathurReborn" = @{
        Race = "Zerg"
        Module = "XMAbathurReborn"
        Tokens = @("AbathurReborn", "Biomass", "Brutalisk", "Leviathan", "ToxicNest", "RoachVile", "QueenCoop", "SwarmHost")
        Generic = @("Hatchery", "Lair", "Hive", "Drone", "Overlord", "Larva", "Egg", "EvolutionChamber", "SpawningPool", "RoachWarren", "HydraliskDen", "Spire", "GreaterSpire", "EvolutionPit", "CreepTumor", "QueenCoop", "Hydralisk", "RoachVile", "Ravager", "SwarmHost", "HotSLeviathan", "Brutalisk", "BiomassPickup")
    }
    "Alarak" = @{
        Race = "Protoss"
        Module = "XMAlarak"
        Tokens = @("Alarak", "Taldarim", "Supplicant", "Monitor")
        Generic = @("Nexus", "Pylon", "Probe", "Assimilator", "Gateway", "WarpGate", "TwilightCouncil", "RoboticsFacility", "RoboticsFacilityWarp", "PhotonCannon", "Stalker", "Supplicant", "Monitor", "ImmortalTaldarim", "ColossusTaldarim", "HighTemplarTaldarim", "WarpPrismTaldarim", "AlarakCoop")
    }
    "Artanis" = @{
        Race = "Protoss"
        Module = "XMArtanis"
        Tokens = @("Artanis", "Aiur", "Dragoon", "Reaver", "Tempest")
        Generic = @("Nexus", "Pylon", "Probe", "Assimilator", "Gateway", "WarpGate", "Forge", "CyberneticsCore", "PhotonCannon", "TwilightCouncil", "TemplarArchive", "RoboticsFacility", "RoboticsFacilityWarp", "RoboticsBay", "Stargate", "FleetBeacon", "ZealotAiur", "Dragoon", "HighTemplar", "ImmortalAiur", "PhoenixAiur", "Scout", "Tempest", "Reaver", "CarrierAiur", "ArtanisVoid")
    }
    "Dehaka" = @{
        Race = "Zerg"
        Module = "XMDehaka"
        Tokens = @("Dehaka", "Primal", "Glevig", "Murvar", "Dakrun", "Ravasaur", "Tyrannozor")
        Generic = @("DehakaHatchery", "DehakaDrone", "DehakaBarracks", "DehakaGlevigStructure", "DehakaMurvarStructure", "DehakaDakrunStructure", "DehakaCoop", "DehakaCoopClone", "DehakaZerglingLevel2", "DehakaRoachLevel2", "DehakaRoachLevel3", "DehakaHydraliskLevel2", "DehakaHydraliskLevel3", "DehakaUltraliskLevel2", "DehakaUltraliskLevel3", "DehakaSwarmHost", "DehakaPrimalSwarmHost", "DehakaMutalisk", "DehakaMutaliskLevel3", "DehakaGuardian", "DehakaViper", "DehakaRavasaur")
    }
    "Fenix" = @{
        Race = "Protoss"
        Module = "XMFenix"
        Tokens = @("Fenix", "Purifier", "Kaldalis", "Talis", "Clolarion", "Warbringer", "Taldarin", "Mojo")
        Generic = @("Nexus", "Pylon", "Probe", "Assimilator", "Gateway", "WarpGate", "Forge", "CyberneticsCore", "PhotonCannon", "TwilightCouncil", "RoboticsFacility", "RoboticsFacilityWarp", "RoboticsBay", "Stargate", "FleetBeacon", "ZealotPurifier", "AdeptFenix", "SentryFenix", "StalkerPurifier", "ColossusPurifier", "FenixDragoon", "FenixCoop", "FenixKaldalisZealot", "FenixTalisAdept", "FenixClolarionCarrier")
    }
    "Karax" = @{
        Race = "Protoss"
        Module = "XMKarax"
        Tokens = @("Karax", "Solar", "Khaydarin", "Monolith", "Sentinel", "Energizer")
        Generic = @("Nexus", "Pylon", "Probe", "Assimilator", "Gateway", "WarpGate", "Forge", "CyberneticsCore", "PhotonCannon", "RoboticsFacility", "RoboticsFacilityWarp", "RoboticsBay", "Stargate", "FleetBeacon", "SolarForge", "KhaydarinMonolith", "Monolith", "Zealot", "Sentry", "Immortal", "Colossus", "Carrier", "Mirage", "Observer", "KaraxChampion")
    }
    "Kerrigan" = @{
        Race = "Zerg"
        Module = "XMKerrigan"
        Tokens = @("Kerrigan", "K5", "Omega", "MutaliskBroodlord")
        Generic = @("Hatchery", "Lair", "Hive", "Drone", "Overlord", "Larva", "Egg", "EvolutionChamber", "SpawningPool", "RoachWarren", "BanelingNest", "HydraliskDen", "LurkerDen", "InfestationPit", "Spire", "GreaterSpire", "UltraliskCavern", "CreepTumor", "Zergling", "Hydralisk", "Mutalisk", "Ultralisk", "Lurker", "BroodLord", "MutaliskBroodlord", "K5Kerrigan")
    }
    "Mengsk" = @{
        Race = "Terran"
        Module = "XMMengsk"
        Tokens = @("Mengsk", "Trooper", "RoyalGuard", "Artillery")
        Generic = @("CommandCenterMengsk", "SCVMengsk", "StarportMengsk", "BarracksMengsk", "FactoryMengsk", "ArmoryMengsk", "EngineeringBayMengsk", "FusionCoreMengsk", "GhostAcademyMengsk", "BunkerDepotMengsk", "ArtilleryMengsk", "MissileTurretMengsk", "RefineryMengsk", "SupplyDepotMengsk", "TrooperMengsk", "MarauderMengsk", "MengskMedic", "GhostMengsk", "SiegeTankMengsk", "MedivacMengsk", "RavenMengsk", "MengskBanshee", "BattlecruiserMengsk")
    }
    "Mira" = @{
        Race = "Terran"
        Module = "XMMira"
        Tokens = @("Mira", "Horner", "Bomber", "D8", "Griffon", "AirFleet", "Scrap")
        Generic = @("CommandCenterMira", "SCVMira", "StarportMira", "SupplyDepotMira", "RefineryMira", "ArmoryMira", "FusionCoreMira", "MercCompoundMira", "MissileTurretMira", "MarineMira", "MedicMira", "MarauderMira", "ReaperMira", "HellionMira", "HellionTankMira", "CycloneMira", "BansheeMira", "MedivacMira", "RavenMira", "WraithMira", "BattlecruiserMira", "VikingFighterMira", "VikingAssaultMira", "LiberatorMira", "BomberMira", "GriffonMira", "ScrapPickupMira")
    }
    "Nova" = @{
        Race = "Terran"
        Module = "XMNova"
        Tokens = @("Nova", "BlackOps", "CovertOps", "DuskWing", "HammerSecurity", "Griffin")
        Generic = @("CommandCenterNova", "SCVNova", "GhostAcademyNova", "BarracksNova", "FactoryNova", "StarportNova", "EngineeringBayNova", "ArmoryNova", "Marine_BlackOps", "Marauder_BlackOps", "HellionBlackOps", "HellbatBlackOps", "SiegeTank_BlackOps", "SiegeTankSieged_BlackOps", "Goliath_BlackOps", "Banshee_BlackOps", "Liberator_BlackOps", "Raven_BlackOps", "Ghost_BlackOps", "GhostFemale_BlackOps", "NovaCoop", "DuskWing", "HammerSecurity")
    }
    "Raynor" = @{
        Race = "Terran"
        Module = "XMRaynor"
        Tokens = @("Raynor", "Hyperion", "DuskWing", "DukesRevenge", "WarPig", "DevilDog", "HammerSecurity", "SiegeBreaker")
        Generic = @("CommandCenter", "CommandCenterFlying", "OrbitalCommand", "OrbitalCommandFlying", "PlanetaryFortress", "SupplyDepot", "SupplyDepotLowered", "Refinery", "Barracks", "BarracksFlying", "BarracksTechLab", "BarracksReactor", "Factory", "FactoryFlying", "Starport", "StarportFlying", "EngineeringBay", "Armory", "FusionCore", "Bunker", "MissileTurret", "MercCompound", "SCV", "Marine", "Medic", "Marauder", "Firebat", "SiegeTank", "SiegeTankSieged", "VikingFighter", "VikingAssault", "Banshee", "Battlecruiser", "Medivac", "Vulture", "Diamondback", "RaynorCommando", "HyperionVoidCoop")
    }
    "Stetmann" = @{
        Race = "Zerg"
        Module = "XMStetmann"
        Tokens = @("Stetmann", "Gary", "Mecha", "Stetellite", "Egon")
        Generic = @("HatcheryStetmann", "DroneStetmann", "GarysDen", "GaryStetmann", "SuperGaryStetmann", "LarvaPStetmann", "OverlordStetmann", "OverseerStetmann", "ZerglingStetmann", "BanelingStetmann", "RavagerStetmann", "HydraliskStetmann", "LurkerStetmann", "InfestorStetmann", "CorruptorStetmann", "BroodLordStetmann", "UltraliskStetmann")
    }
    "Stukov" = @{
        Race = "Zerg"
        Module = "XMStukov"
        Tokens = @("Stukov", "SI", "Infested", "Aleksander")
        Generic = @("SICommandCenter", "SICivilianStructure", "SISCV", "SIStukov", "SIInfestedBunkerUpg", "SIInfestedBunkerUpgUprooted", "SIInfestedTrooper", "SILiberator", "OverseerStukov", "StukovInfestedBanshee", "StukovInfestedDiamondBack", "StukovInfestedSiegeTank", "StukovInfestedSiegeTankUprooted")
    }
    "Swann" = @{
        Race = "Terran"
        Module = "XMSwann"
        Tokens = @("Swann", "Drakken", "LaserDrill", "Warbot", "Microbot", "Hercules", "Perdition", "KelMorian")
        Generic = @("CommandCenterSwann", "SCVSwann", "SupplyDepotSwann", "RefinerySwann", "AutomatedRefinerySwann", "BarracksSwann", "FactorySwann", "StarportSwann", "EngineeringBaySwann", "ArmorySwann", "FusionCoreSwann", "GhostAcademySwann", "MissileTurretSwann", "SensorTowerSwann", "DrakkenLaserDrillCoop", "UnfinishedDrakkenLaserDrillCoop", "SwannSwann", "GoliathSwann", "PredatorSwann", "ThorSwann", "WarbotSwann", "MicrobotSwann", "HerculesSwann", "ScienceVesselSwann", "SiegeTankSwann", "SiegeTankSiegedSwann", "WraithSwann")
    }
    "Tychus" = @{
        Race = "Terran"
        Module = "XMTychus"
        Tokens = @("Tychus")
        Generic = @("TychusCommandCenter", "TychusSCV", "TychusResearchCenter", "TychusArmory", "TychusEngineeringBay", "TychusGhostAcademy", "TychusMercCompound", "TychusMedivacPlatform", "TychusCoop", "TychusHero", "TychusFirebat", "TychusHERC", "TychusGhost", "TychusMarauder", "TychusMedic", "TychusReaper", "TychusSpectre", "TychusWarhound", "TychusOdin")
    }
    "Vorazun" = @{
        Race = "Protoss"
        Module = "XMVorazun"
        Tokens = @("Vorazun", "Nerazim", "Shakuras", "DarkPylon", "ShadowGuard")
        Generic = @("Nexus", "DarkPylon", "Probe", "Assimilator", "Gateway", "WarpGate", "Forge", "CyberneticsCore", "PhotonCannon", "TwilightCouncil", "DarkShrine", "RoboticsFacility", "RoboticsFacilityWarp", "RoboticsBay", "Stargate", "FleetBeacon", "Zealot", "DarkTemplarShakuras", "SentryPhasing", "Stalker", "CorsairMP", "VoidRay", "Oracle")
    }
    "Zagara" = @{
        Race = "Zerg"
        Module = "XMZagara"
        Tokens = @("Zagara", "HotS", "Scourge", "Aberration", "BileLauncher")
        Generic = @("Hatchery", "Lair", "Hive", "Drone", "Overlord", "Larva", "Egg", "EvolutionChamber", "SpawningPool", "BanelingNest", "RoachWarren", "HydraliskDen", "Spire", "GreaterSpire", "CreepTumor", "ZagaraVoidCoop", "HotSSwarmling", "Zergling", "Baneling", "Scourge", "Aberration", "HunterKiller", "ZagaraCorruptor", "BileLauncherZagara")
    }
    "Zeratul" = @{
        Race = "Protoss"
        Module = "XMZeratul"
        Tokens = @("Zeratul", "XelNaga", "VoidPylon", "VoidSeeker", "Karass", "Mohandar", "Construct", "Monolith")
        Generic = @("Nexus", "Pylon", "Probe", "Assimilator", "Gateway", "WarpGate", "CyberneticsCore", "PhotonCannon", "RoboticsFacility", "RoboticsFacilityWarp", "Stargate", "DarkShrine", "VoidPylon", "KhaydarinMonolith", "Monolith", "ZeratulCoop", "ZeratulSummonZealot", "ZeratulStalker", "ZeratulSentry", "ZeratulImmortal", "ZeratulDisruptor", "ZeratulSummonKarass", "ZeratulSummonVoidRay", "ZeratulHeroDarkArchon", "ZeratulXelNagaConstruct", "ZeratulXelNagaConstructCyan")
    }
}

function Get-Attr {
    param(
        [System.Xml.XmlNode]$Node,
        [string]$Name
    )

    if ($null -eq $Node) {
        return ""
    }

    if ($Node -is [System.Xml.XmlElement]) {
        return [string]$Node.GetAttribute($Name)
    }

    if ($null -eq $Node.Attributes -or $null -eq $Node.Attributes[$Name]) {
        return ""
    }

    return [string]$Node.Attributes[$Name].Value
}

function Get-ChildValue {
    param(
        [System.Xml.XmlNode]$Node,
        [string]$ChildName,
        [string]$AttrName = "value"
    )

    foreach ($child in @($Node.ChildNodes)) {
        if ($child.Name -eq $ChildName) {
            return (Get-Attr -Node $child -Name $AttrName)
        }
    }

    return ""
}

function Test-ChildAttr {
    param(
        [System.Xml.XmlNode]$Node,
        [string]$ChildName,
        [string]$AttrName,
        [string]$AttrValue
    )

    foreach ($child in @($Node.ChildNodes)) {
        if ($child.Name -eq $ChildName -and (Get-Attr -Node $child -Name $AttrName) -eq $AttrValue) {
            return $true
        }
    }

    return $false
}

function Test-IndexedChildEnabled {
    param(
        [System.Xml.XmlNode]$Node,
        [string]$ChildName,
        [string]$Index
    )

    foreach ($child in @($Node.ChildNodes)) {
        if ($child.Name -ne $ChildName) {
            continue
        }

        $childIndex = Get-Attr -Node $child -Name "index"
        $value = Get-Attr -Node $child -Name "value"
        if ($childIndex -eq $Index -and ($value -eq "" -or $value -eq "1")) {
            return $true
        }
    }

    return $false
}

function Get-IndexedChildValue {
    param(
        [System.Xml.XmlNode]$Node,
        [string]$ChildName,
        [string]$Index
    )

    foreach ($child in @($Node.ChildNodes)) {
        if ($child.Name -eq $ChildName -and (Get-Attr -Node $child -Name "index") -eq $Index) {
            return (Get-Attr -Node $child -Name "value")
        }
    }

    return ""
}

function Read-GameStrings {
    param([string[]]$Paths)

    $result = @{}
    foreach ($path in $Paths) {
        if (-not (Test-Path -LiteralPath $path)) {
            continue
        }

        foreach ($line in [System.IO.File]::ReadLines($path, [System.Text.UTF8Encoding]::new($false))) {
            if ($line -notmatch "^(?<key>[^=]+)=(?<value>.*)$") {
                continue
            }

            $result[$matches["key"]] = $matches["value"]
        }
    }

    return $result
}

function Get-UnitDisplayName {
    param(
        [string]$UnitId,
        [System.Xml.XmlNode]$Node,
        [hashtable]$Strings
    )

    $nameKey = Get-ChildValue -Node $Node -ChildName "Name"
    if ([string]::IsNullOrWhiteSpace($nameKey)) {
        $nameKey = "Unit/Name/$UnitId"
    }

    if ($Strings.ContainsKey($nameKey) -and -not [string]::IsNullOrWhiteSpace($Strings[$nameKey])) {
        return $Strings[$nameKey]
    }

    $directKey = "Unit/Name/$UnitId"
    if ($Strings.ContainsKey($directKey) -and -not [string]::IsNullOrWhiteSpace($Strings[$directKey])) {
        return $Strings[$directKey]
    }

    if ($fallbackUnitNamesZh.ContainsKey($UnitId)) {
        return $fallbackUnitNamesZh[$UnitId]
    }

    return $UnitId
}

function Get-UnitIdsFromStrings {
    param([hashtable]$Strings)

    $ids = New-Object System.Collections.Generic.HashSet[string]
    foreach ($key in $Strings.Keys) {
        if ($key -match "^Unit/Name/(?<id>.+)$") {
            [void]$ids.Add($matches["id"])
        }
    }

    return $ids
}

function Get-CanonicalUnitId {
    param(
        [hashtable]$UnitById,
        [string]$Candidate
    )

    if ([string]::IsNullOrWhiteSpace($Candidate)) {
        return ""
    }

    foreach ($key in $UnitById.Keys) {
        if ($key -ceq $Candidate) {
            return $key
        }
    }

    foreach ($key in $UnitById.Keys) {
        if ($key -ieq $Candidate) {
            return $key
        }
    }

    return ""
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

function Get-CommanderAch {
    param([string]$ModsRoot)

    $paths = New-Object System.Collections.Generic.List[string]
    Add-CommanderModulePath -Paths $paths -ModsRoot $ModsRoot -ModuleName "XMCore"
    foreach ($commander in $targetCommanders) {
        Add-CommanderModulePath -Paths $paths -ModsRoot $ModsRoot -ModuleName ($metaByCommander[$commander].Module)
    }

    $result = @{}
    foreach ($path in $paths) {
        [xml]$xml = Get-Content -LiteralPath $path -Raw
        $commanderAch = @($xml.Catalog.CUser | Where-Object { $_.id -eq "CommanderAch" })[0]
        if ($null -eq $commanderAch) {
            continue
        }

        foreach ($instance in @($commanderAch.Instances)) {
            $commander = Get-Attr -Node $instance -Name "Id"
            if ($targetCommanders -notcontains $commander) {
                continue
            }

            $upgrades = New-Object System.Collections.Generic.List[string]
            $masteries = New-Object System.Collections.Generic.List[string]
            $commandCenter = ""
            $secondUnit = ""
            $worker = ""

            foreach ($child in @($instance.ChildNodes)) {
                $field = $child.SelectSingleNode("Field")
                if ($null -eq $field) {
                    continue
                }

                $fieldId = Get-Attr -Node $field -Name "Id"
                if ($child.Name -eq "Unit") {
                    $unitId = Get-Attr -Node $child -Name "Unit"
                    if ($fieldId -eq "CommandCenter") {
                        $commandCenter = $unitId
                    }
                    elseif ($fieldId -eq "SecondUnit") {
                        $secondUnit = $unitId
                    }
                    elseif ($fieldId -eq "Worker") {
                        $worker = $unitId
                    }
                }
                elseif ($child.Name -eq "Upgrade") {
                    $upgradeId = Get-Attr -Node $child -Name "Upgrade"
                    if ([string]::IsNullOrWhiteSpace($upgradeId)) {
                        continue
                    }

                    if ($fieldId -eq "Upg") {
                        [void]$upgrades.Add($upgradeId)
                    }
                    elseif ($fieldId -eq "Poi") {
                        [void]$masteries.Add($upgradeId)
                    }
                }
            }

            $result[$commander] = [pscustomobject]@{
                Commander = $commander
                CommandCenter = $commandCenter
                SecondUnit = $secondUnit
                Worker = $worker
                Upgrades = @($upgrades)
                Masteries = @($masteries)
                Source = $path
            }
        }
    }

    foreach ($commander in $targetCommanders) {
        if (-not $result.ContainsKey($commander)) {
            throw "Missing CommanderAch data for $commander"
        }
    }

    return $result
}

function Test-TechnicalUnit {
    param([System.Xml.XmlNode]$Node)

    $id = Get-Attr -Node $Node -Name "id"
    $parent = Get-Attr -Node $Node -Name "parent"
    $category = Get-ChildValue -Node $Node -ChildName "EditorCategories"

    if ($parent -eq "MISSILE" -or $category -match "ObjectType:Projectile") {
        return $true
    }

    if ($id -match "ACGluescreen|Dummy|Placeholder|Placement|Footprint|Precursor|FakeAttack|SpawnerUnit|ReleaseMissile|ReleaseWeapon|LMWeapon|Missile|Wreckage|AOE|BombMissile") {
        return $true
    }

    if ($id -match "Weapon" -and $id -notmatch "Pickup") {
        return $true
    }

    return $false
}

function Test-StructureUnit {
    param([System.Xml.XmlNode]$Node)

    $id = Get-Attr -Node $Node -Name "id"
    $parent = Get-Attr -Node $Node -Name "parent"
    $category = Get-ChildValue -Node $Node -ChildName "EditorCategories"

    if ((Test-IndexedChildEnabled -Node $Node -ChildName "Attributes" -Index "Structure") -or $category -match "ObjectType:Structure") {
        return $true
    }

    if ($parent -match "^(Refinery|Assimilator|Extractor|CommandCenter|OrbitalCommand|PlanetaryFortress|SupplyDepot|Barracks|Factory|Starport|Armory|EngineeringBay|FusionCore|GhostAcademy|Bunker|MissileTurret|PhotonCannon|Gateway|WarpGate|Nexus|Pylon|Forge|CyberneticsCore|RoboticsFacility|RoboticsBay|Stargate|FleetBeacon|TwilightCouncil|TemplarArchive|DarkShrine|Hatchery|Lair|Hive|SpawningPool|RoachWarren|HydraliskDen|Spire|GreaterSpire|EvolutionChamber|EvolutionPit|InfestationPit|BanelingNest|UltraliskCavern|CreepTumor|LurkerDen)$") {
        return $true
    }

    if ($id -match "(Refinery|Assimilator|Extractor|CommandCenter|OrbitalCommand|PlanetaryFortress|SupplyDepot|Barracks|Factory|Starport|Armory|EngineeringBay|FusionCore|GhostAcademy|Bunker|MissileTurret|PhotonCannon|Gateway|WarpGate|Nexus|Pylon|Forge|CyberneticsCore|RoboticsFacility|RoboticsBay|Stargate|FleetBeacon|TwilightCouncil|TemplarArchive|DarkShrine|Hatchery|Lair|Hive|SpawningPool|RoachWarren|HydraliskDen|Spire|GreaterSpire|EvolutionChamber|EvolutionPit|InfestationPit|BanelingNest|UltraliskCavern|CreepTumor|LurkerDen|LaserDrill|GarysDen|CivilianStructure|Artillery|Monolith|VoidPylon|Stetellite|ResearchCenter|MercCompound|MedivacPlatform)") {
        return $true
    }

    return $false
}

function Get-UnitCategory {
    param([System.Xml.XmlNode]$Node)

    if (Test-StructureUnit -Node $Node) {
        return "建筑"
    }

    if (Test-TechnicalUnit -Node $Node) {
        return "技术对象"
    }

    $category = Get-ChildValue -Node $Node -ChildName "EditorCategories"
    if ((Test-IndexedChildEnabled -Node $Node -ChildName "FlagArray" -Index "ArmySelect") -or
        (Test-IndexedChildEnabled -Node $Node -ChildName "Attributes" -Index "Heroic") -or
        ($category -match "ObjectType:Unit" -and -not [string]::IsNullOrWhiteSpace((Get-ChildValue -Node $Node -ChildName "LifeMax")))) {
        return "兵种/英雄"
    }

    return "特殊对象"
}

function Get-ReferencedUnitIds {
    param(
        [System.Xml.XmlNode]$Node,
        [hashtable]$UnitById
    )

    $ids = New-Object System.Collections.Generic.HashSet[string]
    foreach ($button in @($Node.SelectNodes("CardLayouts/LayoutButtons"))) {
        $face = Get-Attr -Node $button -Name "Face"
        $canonicalId = Get-CanonicalUnitId -UnitById $UnitById -Candidate $face
        if (-not [string]::IsNullOrWhiteSpace($canonicalId)) {
            [void]$ids.Add($canonicalId)
        }
    }

    foreach ($child in @($Node.ChildNodes)) {
        if ($child.Name -match "TechTreeProducedUnitArray|TechTreeUnlockedUnitArray") {
            $value = Get-Attr -Node $child -Name "value"
            $canonicalId = Get-CanonicalUnitId -UnitById $UnitById -Candidate $value
            if (-not [string]::IsNullOrWhiteSpace($canonicalId)) {
                [void]$ids.Add($canonicalId)
            }
        }
    }

    return @($ids)
}

function Test-CommanderCandidate {
    param(
        [string]$UnitId,
        [System.Xml.XmlNode]$Node,
        [hashtable]$Meta,
        [System.Collections.Generic.HashSet[string]]$LocalizedIds,
        [string[]]$BaseUnitIds
    )

    if ($BaseUnitIds -contains $UnitId) {
        return $true
    }

    if ($Meta.Generic -contains $UnitId) {
        return $true
    }

    foreach ($token in @($Meta.Tokens)) {
        if ($UnitId -match [regex]::Escape($token)) {
            return $true
        }
    }

    if ($LocalizedIds.Contains($UnitId) -and -not (Test-TechnicalUnit -Node $Node)) {
        return $true
    }

    return $false
}

function Get-UnitDetails {
    param(
        [string]$Commander,
        [hashtable]$CommanderAch
    )

    $meta = $metaByCommander[$Commander]
    $moduleName = $meta.Module
    $moduleRoot = Join-Path $modsRoot "$moduleName.SC2Mod"
    $unitDataPath = Join-Path $moduleRoot "Base.SC2Data\GameData\UnitData.xml"
    if (-not (Test-Path -LiteralPath $unitDataPath)) {
        throw "Missing UnitData.xml for $Commander at $unitDataPath"
    }

    $localePaths = @(
        $rootLocalePath,
        (Join-Path $modsRoot "XMCore.SC2Mod\zhCN.SC2Data\LocalizedData\GameStrings.txt"),
        (Join-Path $moduleRoot "zhCN.SC2Data\LocalizedData\GameStrings.txt")
    )
    $strings = Read-GameStrings -Paths $localePaths
    $localizedIds = Get-UnitIdsFromStrings -Strings $strings

    [xml]$xml = Get-Content -LiteralPath $unitDataPath -Raw
    $unitById = @{}
    foreach ($unit in @($xml.Catalog.CUnit)) {
        $id = Get-Attr -Node $unit -Name "id"
        if (-not [string]::IsNullOrWhiteSpace($id)) {
            $unitById[$id] = $unit
        }
    }

    $ach = $CommanderAch[$Commander]
    $baseUnitIds = @($ach.CommandCenter, $ach.SecondUnit, $ach.Worker) | Where-Object { -not [string]::IsNullOrWhiteSpace($_) }
    $selected = New-Object System.Collections.Generic.HashSet[string]
    $selectionReasons = @{}

    foreach ($unitId in $unitById.Keys) {
        $node = $unitById[$unitId]
        if (Test-CommanderCandidate -UnitId $unitId -Node $node -Meta $meta -LocalizedIds $localizedIds -BaseUnitIds $baseUnitIds) {
            [void]$selected.Add($unitId)
            $selectionReasons[$unitId] = "名称/代号/开局单位命中"
        }
    }

    for ($i = 0; $i -lt 3; $i += 1) {
        $toAdd = New-Object System.Collections.Generic.List[string]
        foreach ($unitId in @($selected)) {
            if (-not $unitById.ContainsKey($unitId)) {
                continue
            }

            foreach ($referencedId in (Get-ReferencedUnitIds -Node $unitById[$unitId] -UnitById $unitById)) {
                if (-not $selected.Contains($referencedId)) {
                    [void]$toAdd.Add($referencedId)
                }
            }
        }

        foreach ($unitId in @($toAdd | Select-Object -Unique)) {
            [void]$selected.Add($unitId)
            if (-not $selectionReasons.ContainsKey($unitId)) {
                $selectionReasons[$unitId] = "由已纳入单位按钮/科技树引用"
            }
        }
    }

    $rows = New-Object System.Collections.Generic.List[object]
    foreach ($unitId in @($selected | Sort-Object)) {
        if (-not $unitById.ContainsKey($unitId)) {
            continue
        }

        $node = $unitById[$unitId]
        $category = Get-UnitCategory -Node $node
        $rows.Add([pscustomobject]@{
            Commander = $Commander
            CommanderZh = $commanderNamesZh[$Commander]
            Module = $moduleName
            SourceFile = $unitDataPath
            UnitId = $unitId
            NameZh = Get-UnitDisplayName -UnitId $unitId -Node $node -Strings $strings
            Category = $category
            Parent = Get-Attr -Node $node -Name "parent"
            Race = Get-ChildValue -Node $node -ChildName "Race"
            LifeMax = Get-ChildValue -Node $node -ChildName "LifeMax"
            ShieldMax = Get-ChildValue -Node $node -ChildName "ShieldsMax"
            Armor = Get-ChildValue -Node $node -ChildName "LifeArmor"
            Food = Get-ChildValue -Node $node -ChildName "Food"
            Minerals = Get-IndexedChildValue -Node $node -ChildName "CostResource" -Index "Minerals"
            Vespene = Get-IndexedChildValue -Node $node -ChildName "CostResource" -Index "Vespene"
            EditorCategories = Get-ChildValue -Node $node -ChildName "EditorCategories"
            SelectionReason = $selectionReasons[$unitId]
        })
    }

    $rowArray = @()
    foreach ($row in $rows) {
        $rowArray += $row
    }

    return [pscustomobject]@{
        UnitDataPath = $unitDataPath
        ModuleUnitCount = $unitById.Count
        Rows = $rowArray
    }
}

function Escape-MarkdownCell {
    param([string]$Text)

    if ($null -eq $Text) {
        return ""
    }

    return ($Text -replace "\|", "\|" -replace "`r?`n", "<br>")
}

function Format-UnitItem {
    param([pscustomobject]$Row)

    $parts = @()
    $parts += ('{0}（`{1}`）' -f $Row.NameZh, $Row.UnitId)

    $stats = @()
    if (-not [string]::IsNullOrWhiteSpace($Row.LifeMax)) {
        $stats += "生命 $($Row.LifeMax)"
    }
    if (-not [string]::IsNullOrWhiteSpace($Row.ShieldMax)) {
        $stats += "护盾 $($Row.ShieldMax)"
    }
    if (-not [string]::IsNullOrWhiteSpace($Row.Minerals)) {
        $stats += "矿 $($Row.Minerals)"
    }
    if (-not [string]::IsNullOrWhiteSpace($Row.Vespene)) {
        $stats += "气 $($Row.Vespene)"
    }
    if (-not [string]::IsNullOrWhiteSpace($Row.Food)) {
        $stats += "补给 $($Row.Food)"
    }

    if ($stats.Count -gt 0) {
        $parts += ("[" + ($stats -join "；") + "]")
    }

    return ($parts -join " ")
}

function Format-UnitList {
    param(
        [object[]]$Rows,
        [int]$Limit = 0
    )

    $items = @($Rows | Sort-Object Category, UnitId | ForEach-Object { Format-UnitItem -Row $_ })
    if ($items.Count -eq 0) {
        return "无"
    }

    if ($Limit -gt 0 -and $items.Count -gt $Limit) {
        $head = @($items | Select-Object -First $Limit)
        return (($head -join "；") + "；另有 " + ($items.Count - $Limit) + " 项，见明细 CSV")
    }

    return ($items -join "；")
}

New-Item -ItemType Directory -Force -Path $OutputDir | Out-Null
New-Item -ItemType Directory -Force -Path $DocsDir | Out-Null

$commanderAch = Get-CommanderAch -ModsRoot $modsRoot
$allDetails = New-Object System.Collections.Generic.List[object]
$summaryRows = New-Object System.Collections.Generic.List[object]
$detailRows = New-Object System.Collections.Generic.List[object]

foreach ($commander in $targetCommanders) {
    $details = Get-UnitDetails -Commander $commander -CommanderAch $commanderAch
    $allDetails.Add([pscustomobject]@{
        Commander = $commander
        UnitDataPath = $details.UnitDataPath
        ModuleUnitCount = $details.ModuleUnitCount
        Rows = @($details.Rows)
    })

    foreach ($row in @($details.Rows)) {
        $detailRows.Add($row)
    }

    $buildings = @($details.Rows | Where-Object { $_.Category -eq "建筑" })
    $army = @($details.Rows | Where-Object { $_.Category -eq "兵种/英雄" })
    $special = @($details.Rows | Where-Object { $_.Category -eq "特殊对象" })
    $technical = @($details.Rows | Where-Object { $_.Category -eq "技术对象" })
    $ach = $commanderAch[$commander]

    $summaryRows.Add([pscustomobject]@{
        Commander = $commander
        CommanderZh = $commanderNamesZh[$commander]
        Module = $metaByCommander[$commander].Module
        Race = $metaByCommander[$commander].Race
        CommandCenter = $ach.CommandCenter
        SecondUnit = $ach.SecondUnit
        Worker = $ach.Worker
        ModuleUnitCount = $details.ModuleUnitCount
        SelectedCount = @($details.Rows).Count
        BuildingCount = $buildings.Count
        ArmyCount = $army.Count
        SpecialCount = $special.Count
        TechnicalCount = $technical.Count
        UpgradeCount = @($ach.Upgrades).Count
        MasteryCount = @($ach.Masteries).Count
    })
}

$summaryRows | Export-Csv -LiteralPath $summaryCsvPath -NoTypeInformation -Encoding UTF8
$detailRows | Export-Csv -LiteralPath $detailCsvPath -NoTypeInformation -Encoding UTF8

$markdown = New-Object System.Collections.Generic.List[string]
$markdown.Add('# 2026-05-26 所有指挥官兵种建筑静态整理')
$markdown.Add('')
$markdown.Add('## 口径')
$markdown.Add('')
$markdown.Add('- 当前环境没有 SC2，本文只基于 `UnitData.xml`、`UserData.xml` 和中文 `GameStrings.txt` 做静态整理，不代表进图或编辑器验收通过。')
$markdown.Add('- “所有指挥官”沿用当前地图初始化统计范围，共 19 个：阿巴瑟、重生阿巴瑟、阿拉纳克、阿塔尼斯、德哈卡、菲尼克斯、凯拉克斯、凯瑞甘、蒙斯克、米拉汉、诺娃、雷诺、斯台特曼、斯托科夫、斯旺、泰凯斯、沃拉尊、扎加拉、泽拉图。')
$markdown.Add('- 每个指挥官优先读取自己的 `XM*.SC2Mod/Base.SC2Data/GameData/UnitData.xml`；`CommanderAch` 的开局主基地、第二单位、工人、升级和精通来自 `UserData.xml`。')
$markdown.Add('- 老指挥官模块存在复制通用单位的情况，本文按指挥官代号/中文名、本地化名称、开局单位、常见种族建筑/兵种和命令卡引用收敛列表；导弹、武器虚体、占位、UI dummy 等归入“技术对象”。')
$markdown.Add('- 单位补给值沿用 XML 原值，SC2 内常见兵种消耗补给会表现为负数。')
$markdown.Add('')
$markdown.Add('## 输出文件')
$markdown.Add('')
$markdown.Add('- 明细 Markdown：`docs/每日进度/2026-05-26-所有指挥官兵种建筑静态整理.md`')
$markdown.Add('- 汇总 CSV：`tmp/2026-05-26-commander-unit-building-summary/commander-unit-building-summary.csv`')
$markdown.Add('- 单位明细 CSV：`tmp/2026-05-26-commander-unit-building-summary/commander-unit-building-detail.csv`')
$markdown.Add('')
$markdown.Add('## 总览')
$markdown.Add('')
$markdown.Add('| 指挥官 | 模块 | 阵营 | 开局主基地 | 第二单位 | 工人 | XML 单位数 | 纳入数 | 建筑 | 兵种/英雄 | 特殊对象 | 技术对象 | 升级/精通 |')
$markdown.Add('|---|---|---|---|---|---|---:|---:|---:|---:|---:|---:|---:|')
foreach ($row in $summaryRows) {
    $markdown.Add(('| {0}（`{1}`） | `{2}` | {3} | `{4}` | `{5}` | `{6}` | {7} | {8} | {9} | {10} | {11} | {12} | {13}/{14} |' -f
        $row.CommanderZh,
        $row.Commander,
        $row.Module,
        $row.Race,
        $row.CommandCenter,
        $row.SecondUnit,
        $row.Worker,
        $row.ModuleUnitCount,
        $row.SelectedCount,
        $row.BuildingCount,
        $row.ArmyCount,
        $row.SpecialCount,
        $row.TechnicalCount,
        $row.UpgradeCount,
        $row.MasteryCount))
}
$markdown.Add('')
$markdown.Add('## 分指挥官明细')
$markdown.Add('')

foreach ($entry in $allDetails) {
    $commander = $entry.Commander
    $ach = $commanderAch[$commander]
    $rows = @($entry.Rows)
    $buildings = @($rows | Where-Object { $_.Category -eq "建筑" })
    $army = @($rows | Where-Object { $_.Category -eq "兵种/英雄" })
    $special = @($rows | Where-Object { $_.Category -eq "特殊对象" })
    $technical = @($rows | Where-Object { $_.Category -eq "技术对象" })

    $markdown.Add(('### {0}（`{1}`）' -f $commanderNamesZh[$commander], $commander))
    $markdown.Add('')
    $markdown.Add(('- 数据源：`{0}`' -f ($entry.UnitDataPath.Substring($ProjectRoot.Length + 1) -replace "\\", "/")))
    $markdown.Add(('- 开局：主基地 `{0}`；第二单位 `{1}`；工人 `{2}`。' -f $ach.CommandCenter, $ach.SecondUnit, $ach.Worker))
    $upgradeText = "无"
    if (@($ach.Upgrades).Count -gt 0) {
        $upgradeText = $ach.Upgrades -join "；"
    }

    $masteryText = "无"
    if (@($ach.Masteries).Count -gt 0) {
        $masteryText = $ach.Masteries -join "；"
    }

    $markdown.Add(('- 关键升级：{0}' -f $upgradeText))
    $markdown.Add(('- 精通/点数：{0}' -f $masteryText))
    $markdown.Add('')
    $markdown.Add('| 分类 | 数量 | 明细 |')
    $markdown.Add('|---|---:|---|')
    $markdown.Add(('| 建筑 | {0} | {1} |' -f $buildings.Count, (Escape-MarkdownCell (Format-UnitList -Rows $buildings))))
    $markdown.Add(('| 兵种/英雄 | {0} | {1} |' -f $army.Count, (Escape-MarkdownCell (Format-UnitList -Rows $army))))
    $markdown.Add(('| 特殊对象 | {0} | {1} |' -f $special.Count, (Escape-MarkdownCell (Format-UnitList -Rows $special -Limit 35))))
    $markdown.Add(('| 技术对象 | {0} | {1} |' -f $technical.Count, (Escape-MarkdownCell (Format-UnitList -Rows $technical -Limit 20))))
    $markdown.Add('')
}

$markdown.Add('## 静态结论与风险')
$markdown.Add('')
$markdown.Add('- 19 个指挥官均能从 `CommanderAch` 解析到开局主基地、第二单位和工人。')
$markdown.Add('- 小型后加模块（如蒙斯克、米拉汉、德哈卡、斯旺、泰凯斯等）单位归属较清楚；老指挥官模块包含较多通用复制数据，本文已做静态过滤，但仍可能把少量剧情/共享对象纳入。')
$markdown.Add('- 报告中的“技术对象”主要用于追踪 XML 迁移完整性，不应直接等同于玩家可操控单位。')
$markdown.Add('- 后续如果继续补迁移，建议优先看明细 CSV 中某指挥官的建筑和兵种缺口，再反查对应 `UnitData.xml`、按钮、训练能力和地图初始化引用。')

$markdown | Set-Content -LiteralPath $markdownPath -Encoding UTF8

Write-Host "Wrote $summaryCsvPath"
Write-Host "Wrote $detailCsvPath"
Write-Host "Wrote $markdownPath"
