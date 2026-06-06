# 7vs1 指挥官单位/建筑归属导出

生成时间：2026-06-05T16:37:53.247Z

数据源：`游戏数据/其他mod数据/7vs1母巢之战合作指挥官bate版_SC2Replay_94137/s2ma_packages/pkg01/extract/base.sc2data/GameData/UserData.xml`

当前 `commander-rosters` 只是“7vs1 归属对照 + 官方 co-op 名册补全”的比较导出，不是 7vs1 游戏内真正的可建造/可产出闭包。它用 `TechUnit` 直接挂载的 commander 归属来观察 replay 包声明了什么，再用官方 co-op roster 补全成完整名册。

完整兵种/建筑名册依据：`游戏数据/官方合作指挥官/commanders/<Commander>/roster.json`，按 `unit.object_type == "Structure"` 拆为 Buildings，其余拆为 Units。

7vs1 对照依据：`TechUnit` 实例内的 `User Type="PlayerCommanders"` / `Field Id="Commander"` 会保留到 JSON 的 `sevenVsOneTechUnitRoster`，用于观察 replay 包里直接声明了哪些归属；它不再作为完整名册来源。

覆盖标记：`official fallback` 表示 commander 缺失于 7vs1 `pkg01 PlayerCommanders`；`official supplement` 表示 7vs1 静态实例存在，但完整名册仍以官方合作指挥官目录为准。

总 TechUnit 归属条目：124
指挥官覆盖：18/18

## ProtossAlarak

- NameRef: UserData/PlayerCommanders/ProtossAlarak_Name
- Race: Prot
- SpawnRace: Prot
- Buildings: 4
- Units: 8
- Unknown: 0
- 7vs1 TechUnit entries: 10
- Coverage: official full roster + 7vs1 supplement
- OfficialSource: mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/userdata.xml

### Buildings

- `Gateway` - UserData/TechUnit/Gateway_Prefix | Unit/Name/Gateway
- `Nexus`
- `PhotonCannon` - UserData/TechUnit/PhotonCannon_Prefix | Unit/Name/PhotonCannon
- `TwilightCouncil` - UserData/TechUnit/TwilightCouncil_Prefix | UserData/TechUnit/TwilightCouncil_Name

### Units

- `ColossusTaldarim` - UserData/TechUnit/ColossusTaldarim_Prefix | UserData/TechUnit/ColossusTaldarim_Name | UserData/TechUnit/ColossusTaldarim_Suffix
- `HighTemplarTaldarim` - UserData/TechUnit/HighTemplarTaldarim_Prefix | UserData/TechUnit/HighTemplarTaldarim_Name | UserData/TechUnit/HighTemplarTaldarim_Suffix
- `ImmortalTaldarim` - UserData/TechUnit/ImmortalTaldarim_Prefix | UserData/TechUnit/ImmortalTaldarim_Name | UserData/TechUnit/ImmortalTaldarim_Suffix
- `Monitor` - UserData/TechUnit/SentryTaldarim_Prefix | UserData/TechUnit/SentryTaldarim_Name | UserData/TechUnit/SentryTaldarim_Suffix
- `Probe`
- `Stalker` - UserData/TechUnit/Stalker_Prefix | UserData/TechUnit/Stalker_Name
- `Supplicant` - UserData/TechUnit/Supplicant_Prefix | Unit/Name/Supplicant
- `WarpPrismTaldarim` - UserData/TechUnit/WarpPrismTaldarim_Prefix | Unit/Name/WarpPrismTaldarim

## ProtossArtanis

- NameRef: UserData/PlayerCommanders/ProtossArtanis_Name
- Race: Prot
- SpawnRace: Prot
- Buildings: 6
- Units: 8
- Unknown: 0
- 7vs1 TechUnit entries: 12
- Coverage: official full roster + 7vs1 supplement
- OfficialSource: mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/userdata.xml

### Buildings

- `Gateway` - UserData/TechUnit/Gateway_Prefix | Unit/Name/Gateway
- `Nexus`
- `PhotonCannon` - UserData/TechUnit/PhotonCannon_Prefix | Unit/Name/PhotonCannon
- `RoboticsBay` - UserData/TechUnit/RoboticsBay_Prefix | UserData/TechUnit/RoboticsBay_Name
- `RoboticsFacilityWarp` - ArmyCategory/Name/RoboticsFacilityWarp
- `TwilightCouncil` - UserData/TechUnit/TwilightCouncil_Prefix | UserData/TechUnit/TwilightCouncil_Name

### Units

- `Archon` - UserData/TechUnit/Archon_Prefix | Unit/Name/Archon
- `Dragoon` - UserData/TechUnit/StalkerAiur_Prefix | UserData/TechUnit/StalkerAiur_Name | UserData/TechUnit/StalkerAiur_Suffix
- `HighTemplar` - UserData/TechUnit/HighTemplar_Prefix | UserData/TechUnit/HighTemplar_Name
- `ImmortalAiur` - UserData/TechUnit/ImmortalAiur_Prefix | UserData/TechUnit/ImmortalAiur_Name | UserData/TechUnit/ImmortalAiur_Suffix
- `Observer` - UserData/TechUnit/Observer_Prefix | Unit/Name/Observer
- `PhoenixAiur` - UserData/TechUnit/PhoenixAiur_Prefix | UserData/TechUnit/PhoenixAiur_Name | UserData/TechUnit/PhoenixAiur_Suffix
- `Probe`
- `Zealot` - UserData/TechUnit/Zealot_Prefix | UserData/TechUnit/Zealot_Name

## ProtossFenix

- NameRef: UserData/PlayerCommanders/ProtossFenix_Name
- Race: Prot
- SpawnRace: Prot
- Buildings: 5
- Units: 9
- Unknown: 0
- 7vs1 TechUnit entries: 12
- Coverage: official full roster + 7vs1 supplement
- OfficialSource: mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/userdata.xml

### Buildings

- `Gateway` - UserData/TechUnit/Gateway_Prefix | Unit/Name/Gateway
- `Nexus`
- `PhotonCannon` - UserData/TechUnit/PhotonCannon_Prefix | Unit/Name/PhotonCannon
- `RoboticsBay` - UserData/TechUnit/RoboticsBay_Prefix | UserData/TechUnit/RoboticsBay_Name
- `TwilightCouncil` - UserData/TechUnit/TwilightCouncil_Prefix | UserData/TechUnit/TwilightCouncil_Name

### Units

- `Adept` - UserData/TechUnit/Adept_Prefix | Unit/Name/Adept
- `Carrier` - UserData/TechUnit/Carrier_Prefix | UserData/TechUnit/Carrier_Name
- `ColossusPurifier` - UserData/TechUnit/ColossusPurifier_Prefix | UserData/TechUnit/ColossusPurifier_Name | UserData/TechUnit/ColossusPurifier_Suffix
- `Immortal` - UserData/TechUnit/Immortal_Prefix | UserData/TechUnit/Immortal_Name
- `Observer` - UserData/TechUnit/Observer_Prefix | Unit/Name/Observer
- `Probe`
- `Scout` - Button/Name/Scout
- `SentryFenix` - UserData/TechUnit/SentryFenix_Prefix | Unit/Name/SentryFenix | UserData/TechUnit/SentryFenix_Suffix
- `ZealotPurifier` - UserData/TechUnit/ZealotPurifier_Prefix | UserData/TechUnit/ZealotPurifier_Name | UserData/TechUnit/ZealotPurifier_Suffix

## ProtossKarax

- NameRef: UserData/PlayerCommanders/ProtossKarax_Name
- Race: Prot
- SpawnRace: Prot
- Buildings: 6
- Units: 9
- Unknown: 0
- 7vs1 TechUnit entries: 13
- Coverage: official full roster + 7vs1 supplement
- OfficialSource: mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/userdata.xml

### Buildings

- `Gateway` - UserData/TechUnit/Gateway_Prefix | Unit/Name/Gateway
- `Nexus`
- `PhotonCannon` - UserData/TechUnit/PhotonCannon_Prefix | Unit/Name/PhotonCannon
- `ShieldBattery` - UserData/TechUnit/ShieldBattery_Prefix | Unit/Name/ShieldBattery
- `SolarForge` - UserData/TechUnit/SolarForge_Prefix | Unit/Name/SolarForge
- `TwilightCouncil` - UserData/TechUnit/TwilightCouncil_Prefix | UserData/TechUnit/TwilightCouncil_Name

### Units

- `Carrier` - UserData/TechUnit/Carrier_Prefix | UserData/TechUnit/Carrier_Name
- `Colossus` - UserData/TechUnit/Colossus_Prefix | UserData/TechUnit/Colossus_Name
- `ImmortalAiur` - UserData/TechUnit/ImmortalAiur_Prefix | UserData/TechUnit/ImmortalAiur_Name | UserData/TechUnit/ImmortalAiur_Suffix
- `Observer` - UserData/TechUnit/Observer_Prefix | Unit/Name/Observer
- `PhoenixPurifier` - UserData/TechUnit/PhoenixPurifier_Prefix | UserData/TechUnit/PhoenixPurifier_Name | UserData/TechUnit/PhoenixPurifier_Suffix
- `Probe`
- `Scout` - Button/Name/Scout
- `SentryPurifier` - UserData/TechUnit/SentryPurifier_Prefix | UserData/TechUnit/SentryPurifier_Name | UserData/TechUnit/SentryPurifier_Suffix
- `ZealotPurifier` - UserData/TechUnit/ZealotPurifier_Prefix | UserData/TechUnit/ZealotPurifier_Name | UserData/TechUnit/ZealotPurifier_Suffix

## ProtossVorazun

- NameRef: UserData/PlayerCommanders/ProtossVorazun_Name
- Race: Prot
- SpawnRace: Prot
- Buildings: 4
- Units: 8
- Unknown: 0
- 7vs1 TechUnit entries: 10
- Coverage: official full roster + 7vs1 supplement
- OfficialSource: mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/userdata.xml

### Buildings

- `Gateway` - UserData/TechUnit/Gateway_Prefix | Unit/Name/Gateway
- `Nexus`
- `PhotonCannon` - UserData/TechUnit/PhotonCannon_Prefix | Unit/Name/PhotonCannon
- `TwilightCouncil` - UserData/TechUnit/TwilightCouncil_Prefix | UserData/TechUnit/TwilightCouncil_Name

### Units

- `CorsairMP` - UserData/TechUnit/PhoenixShakuras_Prefix | UserData/TechUnit/PhoenixShakuras_Name | UserData/TechUnit/PhoenixShakuras_Suffix
- `DarkTemplarShakuras` - UserData/TechUnit/DarkTemplarShakuras_Prefix | UserData/TechUnit/DarkTemplarShakuras_Name | UserData/TechUnit/DarkTemplarShakuras_Suffix
- `Oracle` - UserData/TechUnit/Oracle_Prefix | Unit/Name/Oracle
- `Probe`
- `Stalker` - UserData/TechUnit/Stalker_Prefix | UserData/TechUnit/Stalker_Name
- `VoidRay` - UserData/TechUnit/VoidRay_Prefix | UserData/TechUnit/VoidRay_Name
- `Zealot` - UserData/TechUnit/Zealot_Prefix | UserData/TechUnit/Zealot_Name
- `ZealotShakuras` - UserData/TechUnit/ZealotShakuras_Prefix | UserData/TechUnit/ZealotShakuras_Name

## ProtossZeratul

- NameRef: UserData/PlayerCommanders/ProtossZeratul_Name
- Race: Prot
- SpawnRace: ProZ
- Buildings: 5
- Units: 9
- Unknown: 0
- 7vs1 TechUnit entries: 12
- Coverage: official full roster + 7vs1 supplement
- OfficialSource: mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/userdata.xml

### Buildings

- `DarkShrine` - UserData/TechUnit/DarkShrine_Prefix | UserData/TechUnit/DarkShrine_Name
- `Gateway` - UserData/TechUnit/Gateway_Prefix | Unit/Name/Gateway
- `Nexus`
- `PhotonCannon` - UserData/TechUnit/PhotonCannon_Prefix | Unit/Name/PhotonCannon
- `ZeratulRoboticsFacility` - ArmyCategory/Name/RoboticsFacilityWarp

### Units

- `Observer` - UserData/TechUnit/Observer_Prefix | Unit/Name/Observer
- `Probe`
- `ZeratulDisruptor` - UserData/TechUnit/DisruptorZeratul_Prefix | Unit/Name/ZeratulDisruptor
- `ZeratulImmortal` - UserData/TechUnit/ImmortalZeratul_Prefix | Unit/Name/ZeratulImmortal
- `ZeratulObserver` - UserData/TechUnit/ObserverZeratul_Prefix | Unit/Name/ZeratulObserver
- `ZeratulSentry` - UserData/TechUnit/SentryZeratul_Prefix | Unit/Name/ZeratulSentry
- `ZeratulStalker` - UserData/TechUnit/StalkerZeratul_Prefix | Unit/Name/ZeratulStalker | UserData/TechUnit/StalkerZeratul_Suffix
- `ZeratulSummonZealot` - UserData/TechUnit/ZealotZeratul_Prefix | UserData/TechUnit/ZealotZeratul_Name
- `ZeratulWarpPrism` - UserData/TechUnit/WarpPrismZeratul_Prefix | Unit/Name/ZeratulWarpPrism

## TerranHorner

- NameRef: UserData/PlayerCommanders/TerranHorner_Name
- Race: Terr
- SpawnRace: TerH
- Buildings: 1
- Units: 11
- Unknown: 0
- 7vs1 TechUnit entries: 10
- Coverage: official full roster + 7vs1 supplement
- OfficialSource: mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/userdata.xml

### Buildings

- `HHCommandCenter`

### Units

- `HHBattlecruiser` - UserData/TechUnit/HHBattlecruiser_Prefix | Unit/Name/HHBattlecruiser
- `HHHellion` - UserData/TechUnit/HHHellion_Prefix | Unit/Name/HHHellion
- `HHHellionTank` - UserData/TechUnit/HHHellionTank_Prefix | Unit/Name/HHHellionTank
- `HHRaven` - UserData/TechUnit/HHRaven_Prefix | Unit/Name/HHRaven
- `HHReaper` - UserData/TechUnit/HHReaper_Prefix | Unit/Name/HHReaper
- `HHSCV`
- `HHVikingFighter` - UserData/TechUnit/HHViking_Prefix | Unit/Name/HHVikingFighter
- `HHWidowMine` - UserData/TechUnit/HHWidowMine_Prefix | Unit/Name/HHWidowMine
- `HHWraith` - UserData/TechUnit/HHWraith_Prefix | Unit/Name/HHWraith
- `Liberator` - UserData/TechUnit/Liberator_Prefix | UserData/TechUnit/Liberator_Name
- `Predator` - UserData/TechUnit/Predator_Prefix | UserData/TechUnit/Predator_Name

## TerranMengsk

- NameRef: 蒙斯克
- Race: Terr
- SpawnRace: Terr
- Buildings: 11
- Units: 16
- Unknown: 0
- 7vs1 TechUnit entries: 0
- Coverage: official fallback
- OfficialSource: mods/starcoop/commanders/arcturusmengsk.sc2mod/base.sc2data/gamedata/userdata.xml

### Buildings

- `ArmoryMengsk` - Unit/Name/ArmoryMengsk
- `ArtilleryMengsk` - Unit/Name/ArtilleryMengsk
- `BarracksMengsk` - Unit/Name/BarracksMengsk
- `BunkerDepotMengsk` - Unit/Name/BunkerDepotMengsk
- `CommandCenterMengsk` - Unit/Name/CommandCenterMengsk
- `EngineeringBayMengsk` - Unit/Name/EngineeringBayMengsk
- `FactoryMengsk` - Unit/Name/FactoryMengsk
- `FusionCoreMengsk` - Unit/Name/FusionCoreMengsk
- `GhostAcademyMengsk` - Unit/Name/GhostAcademyMengsk
- `MissileTurretMengsk` - Unit/Name/MissileTurretMengsk
- `StarportMengsk` - Unit/Name/StarportMengsk

### Units

- `BattlecruiserMengsk` - Unit/Name/BattlecruiserMengsk
- `GhostMengsk` - Unit/Name/GhostMengsk
- `MarauderMengsk` - Unit/Name/MarauderMengsk
- `MedivacMengsk` - Unit/Name/MedivacMengsk
- `RavenMengsk` - Unit/Name/RavenMengsk
- `RavenMengskSieged` - Unit/Name/RavenMengsk
- `SCVMengsk` - Unit/Name/SCVMengsk
- `SiegeTankMengsk` - Unit/Name/SiegeTankMengsk
- `SiegeTankMengskSieged` - Unit/Name/SiegeTankMengskSieged
- `ThorMengsk` - Unit/Name/ThorMengsk
- `TrooperMengsk` - Unit/Name/TrooperMengsk
- `TrooperMengskAA` - Unit/Name/TrooperMengskAA
- `TrooperMengskFlamethrower` - Unit/Name/TrooperMengskFlamethrower
- `TrooperMengskImproved` - Unit/Name/TrooperMengskImproved
- `VikingMengskAssault` - Unit/Name/VikingMengskFighter
- `VikingMengskFighter` - Unit/Name/VikingMengskFighter

## TerranNova

- NameRef: UserData/PlayerCommanders/TerranNova_Name
- Race: Terr
- SpawnRace: Terr
- Buildings: 5
- Units: 11
- Unknown: 0
- 7vs1 TechUnit entries: 16
- Coverage: official full roster + 7vs1 supplement
- OfficialSource: mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/userdata.xml

### Buildings

- `AutoTurret` - UserData/TechUnit/AutoTurret_Prefix | Unit/Name/AutoTurret
- `Barracks` - UserData/TechUnit/Barracks_Prefix | UserData/TechUnit/Barracks_Name
- `CommandCenter` - UserData/TechUnit/CommandCenter_Prefix | UserData/TechUnit/CommandCenter_Name
- `GhostAcademyNova` - UserData/TechUnit/GhostAcademyNova_Prefix | UserData/TechUnit/GhostAcademyNova_Name
- `MissileTurret` - UserData/TechUnit/MissileTurret_Prefix | UserData/TechUnit/MissileTurret_Name

### Units

- `Banshee_BlackOps` - UserData/TechUnit/BansheeNova_Prefix | Button/Name/TrainBansheeNova
- `GhostNova` - UserData/TechUnit/GhostNova_Prefix | Unit/Name/GhostNova
- `Goliath_BlackOps` - UserData/TechUnit/GoliathNova_Prefix | Button/Name/TrainGoliathNova
- `HellbatBlackOps` - UserData/TechUnit/HellbatNova_Prefix | Button/Name/TrainHellbatNova
- `Liberator_BlackOps` - UserData/TechUnit/LiberatorNova_Prefix | Button/Name/TrainLiberatorNova
- `Marauder_BlackOps` - UserData/TechUnit/MarauderNova_Prefix | Button/Name/TrainMarauderNova
- `Marine_BlackOps` - UserData/TechUnit/MarineNova_Prefix | Button/Name/TrainMarineNova
- `MercReaper` - UserData/TechUnit/ReaperNova_Prefix | Button/Name/TrainReaperNova
- `Raven_BlackOps` - UserData/TechUnit/RavenNova_Prefix | Button/Name/TrainRavenNova
- `SCV` - UserData/TechUnit/SCV_Prefix | UserData/TechUnit/SCV_Name
- `SiegeTank_BlackOps` - UserData/TechUnit/SiegeTankNova_Prefix | Button/Name/TrainSiegeTankNova

## TerranRaynor

- NameRef: UserData/PlayerCommanders/TerranRaynor_Name
- Race: Terr
- SpawnRace: Terr
- Buildings: 6
- Units: 10
- Unknown: 0
- 7vs1 TechUnit entries: 16
- Coverage: official full roster + 7vs1 supplement
- OfficialSource: mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/userdata.xml

### Buildings

- `Barracks` - UserData/TechUnit/Barracks_Prefix | UserData/TechUnit/Barracks_Name
- `Bunker` - UserData/TechUnit/Bunker_Prefix | UserData/TechUnit/Bunker_Name
- `CommandCenter` - UserData/TechUnit/CommandCenter_Prefix | UserData/TechUnit/CommandCenter_Name
- `MissileTurret` - UserData/TechUnit/MissileTurret_Prefix | UserData/TechUnit/MissileTurret_Name
- `OrbitalCommand` - UserData/TechUnit/OrbitalCommand_Prefix | Unit/Name/OrbitalCommand
- `SupplyDepot` - UserData/TechUnit/SupplyDepot_Prefix | Unit/Name/SupplyDepot

### Units

- `Banshee` - UserData/TechUnit/Banshee_Prefix | UserData/TechUnit/Banshee_Name
- `Battlecruiser` - UserData/TechUnit/Battlecruiser_Prefix | UserData/TechUnit/Battlecruiser_Name
- `Firebat` - UserData/TechUnit/Firebat_Prefix | UserData/TechUnit/Firebat_Name
- `Marauder` - UserData/TechUnit/Marauder_Prefix | UserData/TechUnit/Marauder_Name
- `Marine` - UserData/TechUnit/Marine_Prefix | UserData/TechUnit/Marine_Name
- `Medic` - UserData/TechUnit/Medic_Prefix | UserData/TechUnit/Medic_Name
- `SCV` - UserData/TechUnit/SCV_Prefix | UserData/TechUnit/SCV_Name
- `SiegeTank` - UserData/TechUnit/Siege Tank_Prefix | UserData/TechUnit/Siege Tank_Name
- `Viking` - UserData/TechUnit/Viking_Prefix | UserData/TechUnit/Viking_Name
- `Vulture` - UserData/TechUnit/Vulture_Prefix | UserData/TechUnit/Vulture_Name

## TerranSwann

- NameRef: UserData/PlayerCommanders/TerranSwann_Name
- Race: Terr
- SpawnRace: Terr
- Buildings: 6
- Units: 9
- Unknown: 0
- 7vs1 TechUnit entries: 15
- Coverage: official full roster + 7vs1 supplement
- OfficialSource: mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/userdata.xml

### Buildings

- `CommandCenter` - UserData/TechUnit/CommandCenter_Prefix | UserData/TechUnit/CommandCenter_Name
- `DrakkenLaserDrillCoop` - UserData/TechUnit/MiniDrakkenLaserDrill_Prefix | Unit/Name/DrakkenLaserDrillCoop
- `KelMorianGrenadeTurret` - UserData/TechUnit/KelMorianGrenadeTurret_Prefix | Unit/Name/KelMorianGrenadeTurret
- `MissileTurret` - UserData/TechUnit/MissileTurret_Prefix | UserData/TechUnit/MissileTurret_Name
- `PerditionTurret` - UserData/TechUnit/PerditionTurret_Prefix | ArmyCategory/Name/PerditionTurret
- `SupplyDepot` - UserData/TechUnit/SupplyDepot_Prefix | Unit/Name/SupplyDepot

### Units

- `Cyclone` - UserData/TechUnit/Cyclone_Prefix | UserData/TechUnit/Cyclone_Name | UserData/TechUnit/Cyclone_Suffix
- `Goliath` - UserData/TechUnit/Goliath_Prefix | UserData/TechUnit/Goliath_Name
- `Hellion` - UserData/TechUnit/Hellion_Prefix | UserData/TechUnit/Hellion_Name
- `HellionTank` - UserData/TechUnit/Hellbat_Prefix | UserData/TechUnit/Hellbat_Name
- `Hercules` - UserData/TechUnit/Hercules_Prefix | UserData/TechUnit/Hercules_Name
- `ScienceVessel` - UserData/TechUnit/ScienceVessel_Prefix | UserData/TechUnit/ScienceVessel_Name
- `SCV` - UserData/TechUnit/SCV_Prefix | UserData/TechUnit/SCV_Name
- `SiegeTank` - UserData/TechUnit/Siege Tank_Prefix | UserData/TechUnit/Siege Tank_Name
- `Wraith` - UserData/TechUnit/Wraith_Prefix | UserData/TechUnit/Wraith_Name

## TerranTychus

- NameRef: UserData/PlayerCommanders/TerranTychus_Name
- Race: Terr
- SpawnRace: TerT
- Buildings: 4
- Units: 11
- Unknown: 0
- 7vs1 TechUnit entries: 1
- Coverage: official full roster + 7vs1 supplement
- OfficialSource: mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/userdata.xml

### Buildings

- `TychusArmory` - Unit/Name/TychusArmory
- `TychusCommandCenter`
- `TychusGhostAcademy` - Unit/Name/TychusGhostAcademy
- `TychusMercCompound` - Unit/Name/TychusMercCompound

### Units

- `Marauder` - UserData/TechUnit/Marauder_Prefix | UserData/TechUnit/Marauder_Name
- `TychusCoop` - Unit/Name/TychusCoop
- `TychusFirebat` - Unit/Name/TychusFirebat
- `TychusGhost` - Unit/Name/TychusGhost
- `TychusHERC` - Unit/Name/TychusHERC
- `TychusMarauder` - Unit/Name/TychusMarauder
- `TychusMedic` - Unit/Name/TychusMedic
- `TychusReaper` - Unit/Name/TychusReaper
- `TychusSCV` - Unit/Name/TychusSCV
- `TychusSpectre` - Unit/Name/TychusSpectre
- `TychusWarhound` - Unit/Name/TychusWarhound

## ZergAbathur

- NameRef: UserData/PlayerCommanders/ZergAbathur_Name
- Race: Zerg
- SpawnRace: Zerg
- Buildings: 3
- Units: 13
- Unknown: 0
- 7vs1 TechUnit entries: 8
- Coverage: official full roster + 7vs1 supplement
- OfficialSource: mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/userdata.xml

### Buildings

- `Hatchery`
- `SpineCrawler` - UserData/TechUnit/SpineCrawler_Prefix | UserData/TechUnit/SpineCrawler_Name
- `SporeCrawler` - UserData/TechUnit/SporeCrawler_Prefix | UserData/TechUnit/SporeCrawler_Name

### Units

- `Brutalisk` - UserData/TechUnit/Brutalisk_Prefix | UserData/TechUnit/Brutalisk_Name
- `DevourerMP` - UserData/TechUnit/Devourer_Name
- `Drone`
- `GuardianMP` - UserData/TechUnit/AbathurGuardian_Prefix | Unit/Name/GuardianMP
- `Leviathan` - ArmyCategory/Name/Leviathan
- `Mutalisk` - UserData/TechUnit/Mutalisk_Prefix | UserData/TechUnit/Mutalisk_Name | UserData/TechUnit/Mutalisk_Suffix
- `RavagerAbathur` - Unit/Name/Ravager
- `Roach` - UserData/TechUnit/Roach_Prefix | UserData/TechUnit/Roach_Name | UserData/TechUnit/Roach_Suffix
- `RoachCorpser` - UserData/TechUnit/RoachCorpser_Prefix | UserData/TechUnit/RoachCorpser_Name | UserData/TechUnit/RoachCorpser_Suffix
- `RoachVile` - UserData/TechUnit/RoachVile_Prefix | UserData/TechUnit/RoachVile_Name | UserData/TechUnit/RoachVile_Suffix
- `SwarmHost` - UserData/TechUnit/SwarmHost_Prefix | UserData/TechUnit/SwarmHost_Name | UserData/TechUnit/SwarmHost_Suffix
- `SwarmQueen` - UserData/TechUnit/SwarmQueen_Prefix | UserData/TechUnit/SwarmQueen_Name
- `Viper` - Unit/Name/Viper

## ZergDehaka

- NameRef: UserData/PlayerCommanders/ZergDehaka_Name
- Race: Zerg
- SpawnRace: PZrg
- Buildings: 7
- Units: 18
- Unknown: 0
- 7vs1 TechUnit entries: 0
- Coverage: official full roster + 7vs1 supplement
- OfficialSource: mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/userdata.xml

### Buildings

- `DehakaAirTownHall` - Unit/Name/DehakaHatchery
- `DehakaBarracks` - Unit/Name/DehakaBarracks
- `DehakaDakrunStructure` - Unit/Name/DehakaDakrunStructure
- `DehakaGlevigStructure` - Unit/Name/DehakaGlevigStructure
- `DehakaHatchery` - Unit/Name/DehakaHatchery
- `DehakaMurvarStructure` - Unit/Name/DehakaMurvarStructure
- `DehakaNydusDestroyer` - Unit/Name/DehakaNydusDestroyer

### Units

- `DehakaCoop` - Unit/Name/DehakaCoop
- `DehakaCreeper` - Unit/Name/DehakaCreeper
- `DehakaCreeperFlying` - Unit/Name/DehakaCreeperFlying
- `DehakaDakrun` - Unit/Name/DehakaDakrun
- `DehakaDrone` - Unit/Name/DehakaDrone
- `DehakaGlevig` - Unit/Name/DehakaGlevig
- `DehakaHydraliskLevel2` - Unit/Name/DehakaHydraliskLevel2
- `DehakaMurvar` - Unit/Name/DehakaMurvar
- `DehakaMutaliskLevel3` - Unit/Name/DehakaMutaliskLevel3
- `DehakaPrimalSwarmHost` - Unit/Name/DehakaPrimalSwarmHost
- `DehakaRavasaur` - Unit/Name/DehakaRavasaur
- `DehakaRoachLevel2` - Unit/Name/DehakaRoachLevel2
- `DehakaRoachLevel3` - Unit/Name/DehakaRoachLevel3
- `DehakaSwarmHost` - Unit/Name/DehakaSwarmHost
- `DehakaUltraliskLevel2` - Unit/Name/DehakaUltraliskLevel2
- `DehakaUltraliskLevel3` - Unit/Name/DehakaUltraliskLevel3
- `DehakaZerglingLevel2` - Unit/Name/DehakaZerglingLevel2
- `ImpalerDehaka` - Unit/Name/ImpalerDehaka

## ZergKerrigan

- NameRef: UserData/PlayerCommanders/ZergKerrigan_Name
- Race: Zerg
- SpawnRace: Zerg
- Buildings: 4
- Units: 8
- Unknown: 0
- 7vs1 TechUnit entries: 9
- Coverage: official full roster + 7vs1 supplement
- OfficialSource: mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/userdata.xml

### Buildings

- `Hatchery`
- `NydusNetwork` - UserData/TechUnit/NydusNetwork_Prefix | Unit/Name/NydusNetwork
- `SpineCrawler` - UserData/TechUnit/SpineCrawler_Prefix | UserData/TechUnit/SpineCrawler_Name
- `SporeCrawler` - UserData/TechUnit/SporeCrawler_Prefix | UserData/TechUnit/SporeCrawler_Name

### Units

- `BroodLord` - UserData/TechUnit/Broodlord_Prefix | UserData/TechUnit/Broodlord_Name | UserData/TechUnit/Broodlord_Suffix
- `Drone`
- `Hydralisk` - UserData/TechUnit/Hydralisk_Prefix | UserData/TechUnit/Hydralisk_Name | UserData/TechUnit/Hydralisk_Suffix
- `K5Kerrigan` - Unit/Name/K5Kerrigan
- `MutaliskBroodlord` - UserData/TechUnit/MutaliskBroodlord_Prefix | UserData/TechUnit/MutaliskBroodlord_Name | UserData/TechUnit/MutaliskBroodlord_Suffix
- `SwarmQueen` - UserData/TechUnit/SwarmQueen_Prefix | UserData/TechUnit/SwarmQueen_Name
- `Ultralisk` - UserData/TechUnit/Ultralisk_Prefix | UserData/TechUnit/Ultralisk_Name | UserData/TechUnit/Ultralisk_Suffix
- `Zergling` - UserData/TechUnit/Zergling_Prefix | UserData/TechUnit/Zergling_Name | UserData/TechUnit/Zergling_Suffix

## ZergStetmann

- NameRef: 斯台特曼
- Race: Zerg
- SpawnRace: Zerg
- Buildings: 18
- Units: 16
- Unknown: 0
- 7vs1 TechUnit entries: 0
- Coverage: official fallback
- OfficialSource: mods/starcoop/commanders/egonstetmann.sc2mod/base.sc2data/gamedata/userdata.xml

### Buildings

- `BanelingNestStetmann` - Unit/Name/BanelingNestStetmann
- `EvolutionChamberStetmann` - Unit/Name/EvolutionChamberStetmann
- `ExtractorStetmann` - Unit/Name/ExtractorStetmann
- `GreaterSpireStetmann` - Unit/Name/GreaterSpireStetmann
- `HatcheryStetmann` - Unit/Name/HatcheryStetmann
- `HiveStetmann` - Unit/Name/HiveStetmann
- `HydraliskDenStetmann` - Unit/Name/HydraliskDenStetmann
- `InfestationPitStetmann` - Unit/Name/InfestationPitStetmann
- `LairStetmann` - Unit/Name/LairStetmann
- `LurkerDenStetmann` - Unit/Name/LurkerDenStetmann
- `PowerTowerStetmann` - Unit/Name/PowerTowerStetmann
- `SpawningPoolStetmann` - Unit/Name/SpawningPoolStetmann
- `SpineCrawlerStetmann` - Unit/Name/SpineCrawlerStetmann
- `SpineCrawlerUprootedStetmann` - Unit/Name/SpineCrawlerUprootedStetmann
- `SpireStetmann` - Unit/Name/SpireStetmann
- `SporeCrawlerStetmann` - Unit/Name/SporeCrawlerStetmann
- `SporeCrawlerUprootedStetmann` - Unit/Name/SporeCrawlerUprootedStetmann
- `UltraliskCavernStetmann` - Unit/Name/UltraliskCavernStetmann

### Units

- `BanelingStetmann` - Unit/Name/BanelingStetmann
- `BroodLordStetmann` - Unit/Name/BroodLordStetmann
- `CorruptorStetmann` - Unit/Name/CorruptorStetmann
- `DroneStetmann` - Unit/Name/DroneStetmann
- `GaryStetmann` - Unit/Name/GaryStetmann
- `HydraliskStetmann` - Unit/Name/HydraliskStetmann
- `InfestorStetmann` - Unit/Name/InfestorStetmann
- `LurkerStetmann` - Unit/Name/LurkerStetmann
- `LurkerStetmannBurrowed` - Unit/Name/LurkerStetmann
- `OverseerStetmann` - Unit/Name/OverseerStetmann
- `OverseerStetmannSiegeMode` - Unit/Name/OverseerStetmannSiegeMode
- `RavagerStetmann` - Unit/Name/RavagerStetmann
- `RoachStetmann` - Unit/Name/RoachStetmann
- `SuperGaryStetmann` - Unit/Name/SuperGaryStetmann
- `UltraliskStetmann` - Unit/Name/UltraliskStetmann
- `ZerglingStetmann` - Unit/Name/ZerglingStetmann

## ZergStukov

- NameRef: UserData/PlayerCommanders/ZergStukov_Name
- Race: Zerg
- SpawnRace: InfT
- Buildings: 9
- Units: 8
- Unknown: 0
- 7vs1 TechUnit entries: 15
- Coverage: official full roster + 7vs1 supplement
- OfficialSource: mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/userdata.xml

### Buildings

- `SIArmory` - UserData/TechUnit/StukovInfestedArmory_Prefix | UserData/TechUnit/StukovInfestedArmory_Name
- `SIBarracks` - UserData/TechUnit/StukovInfestedBarracks_Prefix | UserData/TechUnit/StukovInfestedBarracks_Name
- `SICivilianStructure` - UserData/TechUnit/StukovInfestedCivilianStructure_Prefix | Unit/Name/SICivilianStructure
- `SICommandCenter` - UserData/TechUnit/StukovInfestedCommandCenter_Prefix | UserData/TechUnit/StukovInfestedCommandCenter_Name
- `SIEngineeringBay` - UserData/TechUnit/StukovEvolutionChamber_Prefix | Unit/Name/SIEngineeringBay
- `SIFactory` - UserData/TechUnit/StukovInfestedFactory_Prefix | UserData/TechUnit/StukovInfestedFactory_Name
- `SIRefinery` - UserData/TechUnit/StukovInfestedRefinery_Prefix | UserData/TechUnit/StukovInfestedRefinery_Name
- `SIStarport` - UserData/TechUnit/StukovInfestedStarport_Prefix | UserData/TechUnit/StukovInfestedStarport_Name
- `SISupplyDepot` - UserData/TechUnit/StukovInfestedSupplyDepot_Prefix | UserData/TechUnit/StukovInfestedSupplyDepot_Name

### Units

- `SIDiamondBack` - Button/Name/SIDiamondBack
- `SIInfestedCivilian` - UserData/TechUnit/StukovInfestedCivilian_Prefix | UserData/TechUnit/StukovInfestedCivilian_Name
- `SIInfestedMarine` - UserData/TechUnit/StukovInfestedMarine_Prefix | UserData/TechUnit/StukovInfestedMarine_Name
- `SILiberator` - Unit/Name/SILiberator
- `SIOverlord` - Unit/Name/SIOverlord
- `SISCV`
- `StukovInfestedBanshee` - UserData/TechUnit/StukovInfestedBanshee_Prefix | UserData/TechUnit/StukovInfestedBanshee_Name
- `StukovInfestedSiegeTank` - UserData/TechUnit/StukovInfestedSiegeTank_Prefix | UserData/TechUnit/StukovInfestedSiegeTank_Name

## ZergZagara

- NameRef: UserData/PlayerCommanders/ZergZagara_Name
- Race: Zerg
- SpawnRace: Zerg
- Buildings: 3
- Units: 8
- Unknown: 0
- 7vs1 TechUnit entries: 8
- Coverage: official full roster + 7vs1 supplement
- OfficialSource: mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/userdata.xml

### Buildings

- `Hatchery`
- `SpineCrawler` - UserData/TechUnit/SpineCrawler_Prefix | UserData/TechUnit/SpineCrawler_Name
- `SporeCrawler` - UserData/TechUnit/SporeCrawler_Prefix | UserData/TechUnit/SporeCrawler_Name

### Units

- `Baneling` - UserData/TechUnit/Baneling_Prefix | UserData/TechUnit/Baneling_Name | UserData/TechUnit/Baneling_Suffix
- `Corruptor` - UserData/TechUnit/Corruptor_Prefix | UserData/TechUnit/Corruptor_Name | UserData/TechUnit/Corruptor_Suffix
- `Drone`
- `InfestedAbomination` - UserData/TechUnit/Aberration_Prefix | UserData/TechUnit/Aberration_Name
- `Scourge` - UserData/TechUnit/Scourge_Prefix | UserData/TechUnit/Scourge_Name | UserData/TechUnit/Scourge_Suffix
- `SwarmQueen` - UserData/TechUnit/SwarmQueen_Prefix | UserData/TechUnit/SwarmQueen_Name
- `ZagaraVoidCoop` - Unit/Name/ZagaraVoidCoop
- `Zergling` - UserData/TechUnit/Zergling_Prefix | UserData/TechUnit/Zergling_Name | UserData/TechUnit/Zergling_Suffix
