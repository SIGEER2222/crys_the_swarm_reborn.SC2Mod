# 斯旺 / Swann Mod 原始来源（中文整理）

- 模块：`XMSwann.SC2Mod`
- 源目录：`C:\Users\22448\Downloads\重生虫心0.71汉化版（新）\reborn_workrepo\合作指挥官版起义狂潮\Mods\XM\XMSwann.SC2Mod`
- 说明：直接从 UnitData.xml / AbilData.xml / ButtonData.xml / BehaviorData.xml 抽取，不引用旧汇总文档。

## 建筑

| 单位ID | 脚印 | 部署脚印 | 技能 | 行为 | 按钮 |
| --- | --- | --- | --- | --- | --- |
| ArmorySwann | Footprint3x3Contour | Footprint3x3 | ArmoryResearchSwann<br>BuildInProgressSwann<br>que5 | FireSuppressionSystem<br>TerranBuildingBurnDown | Cancel / que5,CancelLast / AbilCmd<br>CancelBuilding / BuildInProgressSwann,Cancel / AbilCmd<br>Halt / BuildInProgressSwann,Halt / AbilCmd<br>TerranVehicleAndShipPlatingLevel1 / ArmoryResearchSwann,Research6 / AbilCmd<br>TerranVehicleAndShipPlatingLevel2 / ArmoryResearchSwann,Research7 / AbilCmd<br>TerranVehicleAndShipPlatingLevel3 / ArmoryResearchSwann,Research8 / AbilCmd<br>TerranVehicleAndShipPlatingLevel4Swann / ArmoryResearchSwann,Research9 / AbilCmd<br>TerranVehicleAndShipPlatingLevel5Swann / ArmoryResearchSwann,Research10 / AbilCmd<br>SelectBuilder / SelectBuilder<br>TerranVehicleAndShipWeaponsLevel1 / ArmoryResearchSwann,Research1 / AbilCmd<br>TerranVehicleAndShipWeaponsLevel2 / ArmoryResearchSwann,Research2 / AbilCmd<br>TerranVehicleAndShipWeaponsLevel3 / ArmoryResearchSwann,Research3 / AbilCmd<br>TerranVehicleAndShipWeaponsLevel4Swann / ArmoryResearchSwann,Research4 / AbilCmd<br>TerranVehicleAndShipWeaponsLevel5Swann / ArmoryResearchSwann,Research5 / AbilCmd<br>VehicleRangeIncreaseSwann / ArmoryResearchSwann,Research13 / AbilCmd<br>RegenerativeBioSteelSwann / ArmoryResearchSwann,Research14 / AbilCmd |
| AutomatedRefinerySwann | FootprintGeyserRoundedBuilt | Footprint3x3CappedGeyser | BuildInProgressSwann | AutoHarvestVespene<br>AutomaticHarvestableVespene<br>FireSuppressionSystem<br>TerranBuildingBurnDown | Cancel / BuildInProgressSwann,Cancel / AbilCmd<br>System.Xml.XmlElement / System.Xml.XmlElement / System.Xml.XmlElement |
| BarracksSwannFlying |  |  | BarracksAddOns<br>BarracksLandSwann<br>move<br>stop | FireSuppressionSystem<br>TerranBuildingBurnDown | LandSwann / BarracksLandSwann,Execute / AbilCmd<br>Reactor / BarracksAddOns,Build2 / AbilCmd<br>TechReactorAI / BarracksAddOns,Build3 / AbilCmd<br>TechLabBarracks / BarracksAddOns,Build1 / AbilCmd<br>TechReactor / BarracksAddOns,Build4 / AbilCmd<br>Stop / stop,Stop / AbilCmd<br>Move / move,Move / AbilCmd<br>MoveHoldPosition / move,HoldPos / AbilCmd<br>MovePatrol / move,Patrol / AbilCmd |
| BarracksSwann | Footprint3x3Contour | Footprint3x3 | BarracksLiftOffSwann<br>BuildInProgressSwann<br>que5<br>Rally | FireSuppressionSystem<br>TerranBuildingBurnDown | Rally / Rally,Rally1 / AbilCmd<br>LiftSwann / BarracksLiftOffSwann,0 / AbilCmd<br>Halt / BuildInProgressSwann,Halt / AbilCmd<br>Reactor / BarracksAddOns,Build2 / AbilCmd<br>TechLabBarracks / BarracksAddOns,Build1 / AbilCmd<br>Cancel / que5,CancelLast / AbilCmd<br>Cancel / BarracksAddOns,Halt / AbilCmd<br>CancelBuilding / BuildInProgressSwann,Cancel / AbilCmd<br>SelectBuilder / SelectBuilder<br>TechReactor / BarracksAddOns,Build4 / AbilCmd |
| BunkeSwannR | Footprint3x3Contour | Footprint3x3 | AttackRedirect<br>BuildInProgressSwann<br>BunkerAttack<br>BunkerStop<br>BunkerTransport<br>healRedirect<br>Rally<br>SalvageBunkerRefund<br>SalvageShared<br>StimpackMarauderRedirect<br>StimpackRedirect<br>StopRedirect | BunkerNotJumbo<br>FireSuppressionSystem<br>ShrikeTurret<br>TerranBuildingBurnDown | AttackRedirect / AttackRedirect,Execute / AbilCmd<br>Stop / StopRedirect,Execute / AbilCmd<br>StimRedirect / StimpackRedirect,Execute / AbilCmd<br>StimRedirect / StimpackMarauderRedirect,Execute / AbilCmd<br>SetBunkerRallyPoint / Rally,Rally1 / AbilCmd<br>BunkerLoad / BunkerTransport,Load / AbilCmd<br>BunkerUnloadAll / BunkerTransport,UnloadAll / AbilCmd<br>Salvage / SalvageShared,On / AbilCmd<br>Halt / BuildInProgressSwann,Halt / AbilCmd<br>CancelBuilding / BuildInProgressSwann,Cancel / AbilCmd<br>Cancel / SalvageShared,Off / AbilCmd<br>SelectBuilder / SelectBuilder<br>StopBunker / BunkerStop,Stop / AbilCmd<br>ShrikeTurret / Passive<br>Attack / BunkerAttack,Execute / AbilCmd |
| CommandCenterSwannFlying |  |  | CommandCenterLandSwann<br>CommandCenterTransport<br>move<br>stop | FireSuppressionSystem<br>TerranBuildingBurnDown | Land / CommandCenterLandSwann,0 / AbilCmd<br>Stop / stop,Stop / AbilCmd<br>Move / move,Move / AbilCmd<br>CommandCenterLoad / CommandCenterTransport,LoadAll / AbilCmd<br>CommandCenterUnloadAll / CommandCenterTransport,UnloadAll / AbilCmd<br>MoveHoldPosition / move,HoldPos / AbilCmd<br>MovePatrol / move,Patrol / AbilCmd |
| CommandCenterSwann | Footprint5x5Contour | Footprint5x5DropOff | BuildInProgressSwann<br>CommandCenterLiftOffSwann<br>CommandCenterTrainSwann<br>CommandCenterTransport<br>que5CancelToSelection<br>RallyCommand<br>VespeneDroneSwann | CommandCenterQueueSwann<br>FireSuppressionSystem<br>TerranBuildingBurnDown | SCV / CommandCenterTrainSwann,Train1 / AbilCmd<br>Rally / RallyCommand,Rally1 / AbilCmd<br>CommandCenterLoad / CommandCenterTransport,LoadAll / AbilCmd<br>CommandCenterUnloadAll / CommandCenterTransport,UnloadAll / AbilCmd<br>Lift / CommandCenterLiftOffSwann,Execute / AbilCmd<br>Halt / BuildInProgressSwann,Halt / AbilCmd<br>Cancel / que5CancelToSelection,CancelLast / AbilCmd<br>CancelBuilding / BuildInProgressSwann,Cancel / AbilCmd<br>SelectBuilder / SelectBuilder<br>VespeneDroneSwann / VespeneDroneSwann,Execute / AbilCmd |
| EngineeringBaySwann | Footprint3x3Contour | Footprint3x3 | BuildInProgressSwann<br>EngineeringBayResearchSwann<br>que5 | FireSuppressionSystem<br>TerranBuildingBurnDown | Cancel / que5,CancelLast / AbilCmd<br>CancelBuilding / BuildInProgressSwann,Cancel / AbilCmd<br>Halt / BuildInProgressSwann,Halt / AbilCmd<br>SelectBuilder / SelectBuilder<br>MissileTurretPassive / Passive<br>HiSecAutoTrackingSwann / EngineeringBayResearchSwann,Research1 / AbilCmd<br>HiSecAutoTracking2Swann / EngineeringBayResearchSwann,Research2 / AbilCmd<br>BuildingArmorSwann / EngineeringBayResearchSwann,Research3 / AbilCmd<br>BuildingArmor2Swann / EngineeringBayResearchSwann,Research4 / AbilCmd<br>FireSuppressionSwann / EngineeringBayResearchSwann,Research7 / AbilCmd<br>FireSuppression2Swann / EngineeringBayResearchSwann,Research8 / AbilCmd<br>KMCAutoLoadersSwann / EngineeringBayResearchSwann,Research5 / AbilCmd<br>KMCAutoLoaders2Swann / EngineeringBayResearchSwann,Research6 / AbilCmd |
| FactorySwann | Footprint3x3Contour | Footprint3x3 | BuildInProgressSwann<br>DoubleBuildSwann<br>FactoryLiftOffSwann<br>FactoryResearchSwann<br>FactoryTrainSwann<br>que5<br>Rally | FireSuppressionSystem<br>TerranBuildingBurnDown | Rally / Rally,Rally1 / AbilCmd<br>LiftSwann / FactoryLiftOffSwann,Execute / AbilCmd<br>Halt / BuildInProgressSwann,Halt / AbilCmd<br>Cancel / que5,CancelLast / AbilCmd<br>CancelBuilding / BuildInProgressSwann,Cancel / AbilCmd<br>SelectBuilder / SelectBuilder<br>Research330mmBarrageCannonsSwann / FactoryResearchSwann,Research3 / AbilCmd<br>PredatorSwann / FactoryTrainSwann,Train11 / AbilCmd<br>GoliathSwann / FactoryTrainSwann,Train3 / AbilCmd<br>SiegeTankSwann / FactoryTrainSwann,Train2 / AbilCmd<br>ThorSwann / FactoryTrainSwann,Train5 / AbilCmd<br>HellionSwann / FactoryTrainSwann,Train6 / AbilCmd<br>DoubleBuildSwann / DoubleBuildSwann,Specialize1 / AbilCmd<br>MicroBotSwann / FactoryTrainSwann,Train12 / AbilCmd<br>AresClassWeaponsSystemSwann / FactoryResearchSwann,Research2 / AbilCmd<br>MaelstromRoundsSwann / FactoryResearchSwann,Research1 / AbilCmd<br>HellionTankSwann / FactoryTrainSwann,Train7 / AbilCmd<br>BuildCycloneSwann / FactoryTrainSwann,Train8 / AbilCmd |
| FactorySwannFlying |  |  | FactoryAddOns<br>FactoryLandSwann<br>move<br>stop | FireSuppressionSystem<br>TerranBuildingBurnDown | LandSwann / FactoryLandSwann,Execute / AbilCmd<br>Stop / stop,Stop / AbilCmd<br>Move / move,Move / AbilCmd<br>MoveHoldPosition / move,HoldPos / AbilCmd<br>MovePatrol / move,Patrol / AbilCmd |
| FusionCoreSwann | Footprint3x3Contour | Footprint3x3 | BuildInProgressSwann<br>que5 | FireSuppressionSystem<br>TerranBuildingBurnDown | Cancel / que5,CancelLast / AbilCmd<br>CancelBuilding / BuildInProgressSwann,Cancel / AbilCmd<br>Halt / BuildInProgressSwann,Halt / AbilCmd<br>SelectBuilder / SelectBuilder |
| GhostAcademySwann | Footprint3x3Contour | Footprint3x3 | BuildInProgressSwann<br>que5 | FireSuppressionSystem<br>TerranBuildingBurnDown | Cancel / que5,CancelLast / AbilCmd<br>CancelBuilding / BuildInProgressSwann,Cancel / AbilCmd<br>Halt / BuildInProgressSwann,Halt / AbilCmd<br>SelectBuilder / SelectBuilder |
| MercCompoundSwann | Footprint4x4Contour | Footprint4x4 | BuildInProgressSwann<br>que5<br>Rally | FireSuppressionSystem<br>TerranBuildingBurnDown<br>UnderConstruction | SelectBuilder / 255,255 / SelectBuilder<br>Rally / Rally,Rally1 / AbilCmd<br>Halt / BuildInProgressSwann,Halt / AbilCmd<br>CancelBuilding / BuildInProgressSwann,Cancel / AbilCmd |
| MissileTurretSwann | Footprint2x2Contour | Footprint2x2 | attack<br>BuildInProgressSwann<br>SalvageSharedSwann<br>stop | Detector11<br>FireSuppressionSystem<br>TerranBuildingBurnDown | Halt / BuildInProgressSwann,Halt / AbilCmd<br>Detector / Passive<br>CancelBuilding / BuildInProgressSwann,Cancel / AbilCmd<br>Stop / stop,Stop / AbilCmd<br>AttackBuilding / attack,Execute / AbilCmd<br>SelectBuilder / SelectBuilder<br>SalvageSwann / SalvageSharedSwann,On / AbilCmd |
| OrbitalCommandSwann | Footprint5x5Contour | Footprint5x5DropOff | BuildInProgressSwann<br>CalldownMULE<br>CommandCenterTrainSwann<br>OrbitalLiftOffSwann<br>que5CancelToSelection<br>RallyCommand<br>ScannerSweep<br>SupplyDropSwann | CommandCenterQueue<br>FireSuppressionSystem<br>TerranBuildingBurnDown | SCV / CommandCenterTrainSwann,Train1 / AbilCmd<br>Lift / OrbitalLiftOffSwann,0 / AbilCmd<br>CancelBuilding / BuildInProgressSwann,Cancel / AbilCmd<br>Cancel / que5CancelToSelection,CancelLast / AbilCmd<br>Scan / ScannerSweep,Execute / AbilCmd<br>Rally / RallyCommand,Rally1 / AbilCmd<br>CalldownMULE / CalldownMULE,Execute / AbilCmd<br>SupplyDrop / SupplyDropSwann,Execute / AbilCmd |
| OrbitalCommandSwannFlying |  |  | move<br>OrbitalCommandLandSwann<br>stop | CommandCenterQueue<br>FireSuppressionSystem<br>TerranBuildingBurnDown | Land / OrbitalCommandLandSwann,0 / AbilCmd<br>Stop / stop,Stop / AbilCmd<br>Move / move,Move / AbilCmd<br>MoveHoldPosition / move,HoldPos / AbilCmd<br>MovePatrol / move,Patrol / AbilCmd |
| PlanetaryFortressSwann | Footprint5x5Contour | Footprint5x5DropOff | attack<br>BuildInProgressSwann<br>CommandCenterTrainSwann<br>CommandCenterTransport<br>que5PassiveCancelToSelection<br>RallyCommand<br>stop | CommandCenterQueue<br>FireSuppressionSystem<br>TerranBuildingBurnDown | PlanetaryFortressLoad / CommandCenterTransport,LoadAll / AbilCmd<br>CommandCenterUnloadAll / CommandCenterTransport,UnloadAll / AbilCmd<br>StopPlanetaryFortress / stop,Stop / AbilCmd<br>AttackBuildingPFort / attack,Execute / AbilCmd<br>Cancel / que5PassiveCancelToSelection,CancelLast / AbilCmd<br>CancelBuilding / BuildInProgressSwann,Cancel / AbilCmd<br>SCV / CommandCenterTrainSwann,Train1 / AbilCmd<br>Rally / RallyCommand,Rally1 / AbilCmd |
| SCVSwann |  |  | attack<br>move<br>RepairSwann<br>SCVHarvest<br>stop<br>TerranBuildDropSwann<br>TerranBuildSwann |  | Move / move,Move / AbilCmd<br>Stop / stop,Stop / AbilCmd<br>MoveHoldPosition / move,HoldPos / AbilCmd<br>AttackWorker / attack,Execute / AbilCmd<br>MovePatrol / move,Patrol / AbilCmd<br>Repair / RepairSwann,Execute / AbilCmd<br>GatherTerr / SCVHarvest,Gather / AbilCmd<br>ReturnCargo / SCVHarvest,Return / AbilCmd<br>TerranBuild / Submenu<br>TerranBuildAdvanced / Submenu<br>Halt / TerranBuildSwann,Halt / AbilCmd<br>CommandCenteSwannR / TerranBuildSwann,Build1 / AbilCmd<br>RefinerySwann / TerranBuildSwann,Build3 / AbilCmd<br>SupplyDepotDropSwann / TerranBuildDropSwann,Build1 / AbilCmd<br>SupplyDepotSwann / TerranBuildSwann,Build2 / AbilCmd<br>EngineeringBaySwann / TerranBuildSwann,Build5 / AbilCmd<br>MissileTurretSwann / TerranBuildSwann,Build6 / AbilCmd<br>Cancel / CancelSubmenu<br>SensorToweSwannR / TerranBuildSwann,Build9 / AbilCmd<br>GrenadeTurretSwann / TerranBuildSwann,Build17 / AbilCmd<br>PerditionTurretSwann / TerranBuildSwann,Build18 / AbilCmd<br>FactorySwann / TerranBuildSwann,Build11 / AbilCmd<br>ArmorySwann / TerranBuildSwann,Build14 / AbilCmd<br>StarportSwann / TerranBuildSwann,Build12 / AbilCmd<br>Cancel / CancelSubmenu |
| SensorTowerSwann | Footprint1x1 | Footprint1x1 | BuildInProgressSwann | FireSuppressionSystem<br>SensorTowerRadar<br>TerranBuildingBurnDown | RadarField / Passive<br>Halt / BuildInProgressSwann,Halt / AbilCmd<br>CancelBuilding / BuildInProgressSwann,Cancel / AbilCmd<br>SelectBuilder / SelectBuilder |
| StarportSwann | Footprint3x3Contour | Footprint3x3 | BuildInProgressSwann<br>DoubleBuildSwann<br>que5<br>Rally<br>SarportResearchSwann<br>StarportLiftOffSwann<br>StarportTrainSwann | FireSuppressionSystem<br>TerranBuildingBurnDown | Rally / Rally,Rally1 / AbilCmd<br>LiftSwann / StarportLiftOffSwann,Execute / AbilCmd<br>Halt / BuildInProgressSwann,Halt / AbilCmd<br>Cancel / que5,CancelLast / AbilCmd<br>CancelBuilding / BuildInProgressSwann,Cancel / AbilCmd<br>SelectBuilder / SelectBuilder<br>WraithSwann / StarportTrainSwann,Train8 / AbilCmd<br>BuildScienceVesselSwann / StarportTrainSwann,Train9 / AbilCmd<br>BuildHerculesSwann / StarportTrainSwann,Train6 / AbilCmd<br>DoubleBuildSwann / DoubleBuildSwann,Specialize1 / AbilCmd<br>PulseAmplifierSwann / SarportResearchSwann,Research2 / AbilCmd<br>ImprovedNanoRepairSwann / SarportResearchSwann,Research1 / AbilCmd<br>HerculesSwann / SarportResearchSwann,Research3 / AbilCmd |
| StarportSwannFlying |  |  | move<br>StarportAddOns<br>StarportLandSwann<br>stop | FireSuppressionSystem<br>TerranBuildingBurnDown | LandSwann / StarportLandSwann,Execute / AbilCmd<br>Stop / stop,Stop / AbilCmd<br>Move / move,Move / AbilCmd<br>MoveHoldPosition / move,HoldPos / AbilCmd<br>MovePatrol / move,Patrol / AbilCmd |
| SupplyDepotSwann | Footprint2x2Contour | Footprint2x2 | BuildInProgressSwann<br>SupplyDepotLoweSwannR | FireSuppressionSystem<br>TerranBuildingBurnDown | Halt / BuildInProgressSwann,Halt / AbilCmd<br>CancelBuilding / BuildInProgressSwann,Cancel / AbilCmd<br>Lower / SupplyDepotLoweSwannR,0 / AbilCmd<br>SelectBuilder / SelectBuilder |
| PerditionTurretSwann | Footprint2x2Contour | Footprint2x2 | attack<br>BuildInProgressSwann<br>PerditionTurretBurrowSwann<br>SalvageSharedSwann<br>stop | FireSuppressionSystem<br>TerranBuildingBurnDown | Halt / BuildInProgressSwann,Halt / AbilCmd<br>CancelBuilding / BuildInProgressSwann,Cancel / AbilCmd<br>Attack / attack,Execute / AbilCmd<br>Stop / stop,Stop / AbilCmd<br>Salvage / SalvageSharedSwann,On / AbilCmd |
| PerditionTurretSwannUnderground |  |  | BuildInProgressSwann<br>PerditionTurretUnburrowSwann<br>SalvageSharedSwann | FireSuppressionSystem<br>TerranBuildingBurnDown | Cancel / BuildInProgressSwann,Cancel / AbilCmd<br>Attack / attack,Execute / AbilCmd<br>Salvage / SalvageSharedSwann,On / AbilCmd |
| GrenadeTurretSwann | Footprint2x2CreepNormalContour | Footprint2x2CreepNormal | attack<br>BuildInProgressSwann<br>SalvageSharedSwann<br>stop | FireSuppressionSystem<br>TerranBuildingBurnDown | Stop / stop,Stop / AbilCmd<br>Attack / attack,Execute / AbilCmd<br>SelectBuilder / BuildInProgressSwann,Cancel / SelectBuilder<br>Salvage / SalvageSharedSwann,On / AbilCmd<br>CancelBuilding / BuildInProgressSwann,Cancel / AbilCmd<br>Halt / BuildInProgressSwann,Halt / AbilCmd<br>KelMorianGrenadeTurretConcussiveGrenades / Passive<br>HaveHiSecAutoTracking / Passive<br>HaveImprovedTurretAttackSpeed / Passive |

## 兵种

| 单位ID | 脚印 | 部署脚印 | 技能 | 行为 | 按钮 |
| --- | --- | --- | --- | --- | --- |
| HellionSwann |  |  |  |  |  |
| HellionTankSwann |  |  |  |  |  |
| CycloneSwann |  |  |  |  |  |
| GoliathSwann |  |  | attack<br>move<br>stop |  | Move / move,Move / AbilCmd<br>Stop / stop,Stop / AbilCmd<br>MoveHoldPosition / move,HoldPos / AbilCmd<br>Attack / attack,Execute / AbilCmd<br>MovePatrol / move,Patrol / AbilCmd |
| PredatorSwann |  |  | attack<br>move<br>PredatorBlinkSwann<br>stop | ReaperJump | Move / move,Move / AbilCmd<br>Stop / stop,Stop / AbilCmd<br>MoveHoldPosition / move,HoldPos / AbilCmd<br>MovePatrol / move,Patrol / AbilCmd<br>Attack / attack,Execute / AbilCmd<br>AcquireMove / move,AcquireMove / AbilCmd<br>RetributionField / Passive<br>CliffJumper / Passive<br>PredatorBlinkSwann / PredatorBlinkSwann,Execute / AbilCmd |
| RefinerySwann |  |  | BuildInProgressSwann |  |  / BuildInProgressSwann,Halt / <br> / BuildInProgressSwann,Cancel / <br> |
| CasterSwann | Footprint3x3Contour | Footprint3x3 | CombatDropSwann |  | DrakkenLaserDrillAttack / attack,Execute / AbilCmd<br>DrakkenLaserDrillAttack / Passive<br>DrakkenLaserDrillBFG / DrakkenLaserDrillBFG,Execute / AbilCmd<br>DrakkenLaserDrillBFG / Passive<br>DrakkenLaserDrillNuke / DrakkenLaserDrillNuke,Execute / AbilCmd<br>DrakkenLaserDrillNuke / Passive<br>CombatDropSwann / CombatDropSwann,Execute / AbilCmd |
| SupplyDepotSwannDrop | Footprint2x2Contour | Footprint2x2 | BuildinProgressNonCancellable<br>DropToSupplyDepotSwann |  |  |
| SupplyDepotSwannLowered | Footprint2x2Underground |  | BuildInProgressSwann<br>SupplyDepotRaiseSwann | FireSuppressionSystem<br>TerranBuildingBurnDown | Raise / SupplyDepotRaiseSwann,0 / AbilCmd |
| MicrobotSwann |  |  | attack<br>move<br>stop |  | Move / move,Move / AbilCmd<br>Stop / stop,Stop / AbilCmd<br>MoveHoldPosition / move,HoldPos / AbilCmd<br>MovePatrol / move,Patrol / AbilCmd<br>Attack / attack,Execute / AbilCmd |
| SwannSwann |  |  | attack<br>CreatePredatorSwann<br>DutchPlaceTurretSwann<br>move<br>stop |  | Move / move,Move / AbilCmd<br>Stop / stop,Stop / AbilCmd<br>MoveHoldPosition / move,HoldPos / AbilCmd<br>MovePatrol / move,Patrol / AbilCmd<br>Attack / attack,Execute / AbilCmd<br>DutchPlaceTurretSwann / DutchPlaceTurretSwann,Execute / AbilCmd<br>CreatePredatorSwann / CreatePredatorSwann,Execute / AbilCmd |
| ThorSwann |  |  | 330mmBarrageCannonsSwann<br>attack<br>move<br>stop |  | Move / move,Move / AbilCmd<br>Stop / stop,Stop / AbilCmd<br>MoveHoldPosition / move,HoldPos / AbilCmd<br>Attack / attack,Execute / AbilCmd<br>MovePatrol / move,Patrol / AbilCmd<br>330mmBarrageCannonsSwann / 330mmBarrageCannonsSwann,Execute / AbilCmd<br>Cancel / 330mmBarrageCannonsSwann,Cancel / AbilCmd |
| WarbotSwann |  |  | attack<br>move<br>stop |  | Move / move,Move / AbilCmd<br>Stop / stop,Stop / AbilCmd<br>MoveHoldPosition / move,HoldPos / AbilCmd<br>MovePatrol / move,Patrol / AbilCmd<br>Attack / attack,Execute / AbilCmd |
| HerculesSwann |  |  | HerculesTransportSwann<br>HyperjumpSwann<br>move<br>stop |  | Move / move,Move / AbilCmd<br>Stop / stop,Stop / AbilCmd<br>MoveHoldPosition / move,HoldPos / AbilCmd<br>MovePatrol / move,Patrol / AbilCmd<br>HerculesLoad / HerculesTransportSwann,Load / AbilCmd<br>HerculesUnloadAll / HerculesTransportSwann,UnloadAt / AbilCmd<br>AcquireMove / move,AcquireMove / AbilCmd<br>RapidDeployment / Passive<br>HyperjumpSwann / HyperjumpSwann,Execute / AbilCmd |
| ScienceVesselSwann |  |  | DefensiveMatrixSwann<br>HyperjumpRSwann<br>IrradiateSwann<br>move<br>NanoRepairSwann<br>stop | Detector11 | Move / move,Move / AbilCmd<br>Stop / stop,Stop / AbilCmd<br>MoveHoldPosition / move,HoldPos / AbilCmd<br>MovePatrol / move,Patrol / AbilCmd<br>Attack / attack,Execute / AbilCmd<br>AcquireMove / move,AcquireMove / AbilCmd<br>IrradiateSwann / IrradiateSwann,Execute / AbilCmd<br>HealSwann / NanoRepairSwann,Execute / AbilCmd<br>Detector / Passive<br>DefensiveMatrixSwann / DefensiveMatrixSwann,Execute / AbilCmd<br>HyperjumpSwann / HyperjumpRSwann,Execute / AbilCmd |
| SiegeTankSwann |  |  | attack<br>move<br>SiegeModeSwann<br>stop |  | Move / move,Move / AbilCmd<br>Stop / stop,Stop / AbilCmd<br>MoveHoldPosition / move,HoldPos / AbilCmd<br>Attack / attack,Execute / AbilCmd<br>MovePatrol / move,Patrol / AbilCmd<br>SiegeMode / SiegeModeSwann,Execute / AbilCmd |
| SiegeTankSiegedSwann | FootprintSieged |  | attack<br>stop<br>UnsiegeSwann |  | Move / move,Move / AbilCmd<br>Stop / stop,Stop / AbilCmd<br>MoveHoldPosition / move,HoldPos / AbilCmd<br>AttackBuilding / attack,Execute / AbilCmd<br>MovePatrol / move,Patrol / AbilCmd<br>Unsiege / UnsiegeSwann,Execute / AbilCmd |
| WraithSwann |  |  | attack<br>move<br>stop<br>WraithCloakSwann | BurstLaserMovementSwann<br>CloakDistortionFieldSwann<br>GeminiMissileMovementSwann | Move / move,Move / AbilCmd<br>Stop / stop,Stop / AbilCmd<br>MoveHoldPosition / move,HoldPos / AbilCmd<br>Attack / attack,Execute / AbilCmd<br>MovePatrol / move,Patrol / AbilCmd<br>WraithCloakOn / WraithCloakSwann,On / AbilCmd<br>WraithCloakOff / WraithCloakSwann,Off / AbilCmd<br>PulseAmplifierSwann / Passive<br>CloakDistortionFieldSwann / Passive |

## 面板与技能

| 来源单位 | 类型 | Face | AbilCmd | Requirements |
| --- | --- | --- | --- | --- |
| ArmorySwann | 面板/技能 | Cancel | que5,CancelLast |  |
| ArmorySwann | 面板/技能 | CancelBuilding | BuildInProgressSwann,Cancel |  |
| ArmorySwann | 面板/技能 | Halt | BuildInProgressSwann,Halt |  |
| ArmorySwann | 面板/技能 | TerranVehicleAndShipPlatingLevel1 | ArmoryResearchSwann,Research6 |  |
| ArmorySwann | 面板/技能 | TerranVehicleAndShipPlatingLevel2 | ArmoryResearchSwann,Research7 |  |
| ArmorySwann | 面板/技能 | TerranVehicleAndShipPlatingLevel3 | ArmoryResearchSwann,Research8 |  |
| ArmorySwann | 面板/技能 | TerranVehicleAndShipPlatingLevel4Swann | ArmoryResearchSwann,Research9 |  |
| ArmorySwann | 面板/技能 | TerranVehicleAndShipPlatingLevel5Swann | ArmoryResearchSwann,Research10 |  |
| ArmorySwann | 面板/技能 | TerranVehicleAndShipWeaponsLevel1 | ArmoryResearchSwann,Research1 |  |
| ArmorySwann | 面板/技能 | TerranVehicleAndShipWeaponsLevel2 | ArmoryResearchSwann,Research2 |  |
| ArmorySwann | 面板/技能 | TerranVehicleAndShipWeaponsLevel3 | ArmoryResearchSwann,Research3 |  |
| ArmorySwann | 面板/技能 | TerranVehicleAndShipWeaponsLevel4Swann | ArmoryResearchSwann,Research4 |  |
| ArmorySwann | 面板/技能 | TerranVehicleAndShipWeaponsLevel5Swann | ArmoryResearchSwann,Research5 |  |
| ArmorySwann | 面板/技能 | VehicleRangeIncreaseSwann | ArmoryResearchSwann,Research13 |  |
| ArmorySwann | 面板/技能 | RegenerativeBioSteelSwann | ArmoryResearchSwann,Research14 |  |
| AutomatedRefinerySwann | 面板/技能 | Cancel | BuildInProgressSwann,Cancel |  |
| BarracksSwannFlying | 面板/技能 | LandSwann | BarracksLandSwann,Execute |  |
| BarracksSwannFlying | 面板/技能 | Reactor | BarracksAddOns,Build2 |  |
| BarracksSwannFlying | 面板/技能 | TechReactorAI | BarracksAddOns,Build3 |  |
| BarracksSwannFlying | 面板/技能 | TechLabBarracks | BarracksAddOns,Build1 |  |
| BarracksSwannFlying | 面板/技能 | TechReactor | BarracksAddOns,Build4 |  |
| BarracksSwannFlying | 面板/技能 | Stop | stop,Stop |  |
| BarracksSwannFlying | 面板/技能 | Move | move,Move |  |
| BarracksSwannFlying | 面板/技能 | MoveHoldPosition | move,HoldPos |  |
| BarracksSwannFlying | 面板/技能 | MovePatrol | move,Patrol |  |
| BarracksSwann | 面板/技能 | Rally | Rally,Rally1 |  |
| BarracksSwann | 面板/技能 | LiftSwann | BarracksLiftOffSwann,0 |  |
| BarracksSwann | 面板/技能 | Halt | BuildInProgressSwann,Halt |  |
| BarracksSwann | 面板/技能 | Reactor | BarracksAddOns,Build2 |  |
| BarracksSwann | 面板/技能 | TechLabBarracks | BarracksAddOns,Build1 |  |
| BarracksSwann | 面板/技能 | Cancel | que5,CancelLast |  |
| BarracksSwann | 面板/技能 | Cancel | BarracksAddOns,Halt |  |
| BarracksSwann | 面板/技能 | CancelBuilding | BuildInProgressSwann,Cancel |  |
| BarracksSwann | 面板/技能 | TechReactor | BarracksAddOns,Build4 |  |
| BunkeSwannR | 面板/技能 | AttackRedirect | AttackRedirect,Execute |  |
| BunkeSwannR | 面板/技能 | Stop | StopRedirect,Execute |  |
| BunkeSwannR | 面板/技能 | StimRedirect | StimpackRedirect,Execute |  |
| BunkeSwannR | 面板/技能 | StimRedirect | StimpackMarauderRedirect,Execute |  |
| BunkeSwannR | 面板/技能 | SetBunkerRallyPoint | Rally,Rally1 |  |
| BunkeSwannR | 面板/技能 | BunkerLoad | BunkerTransport,Load |  |
| BunkeSwannR | 面板/技能 | BunkerUnloadAll | BunkerTransport,UnloadAll |  |
| BunkeSwannR | 面板/技能 | Salvage | SalvageShared,On |  |
| BunkeSwannR | 面板/技能 | Halt | BuildInProgressSwann,Halt |  |
| BunkeSwannR | 面板/技能 | CancelBuilding | BuildInProgressSwann,Cancel |  |
| BunkeSwannR | 面板/技能 | Cancel | SalvageShared,Off |  |
| BunkeSwannR | 面板/技能 | StopBunker | BunkerStop,Stop |  |
| BunkeSwannR | 被动 | ShrikeTurret |  | ShrikeTurretResearched |
| BunkeSwannR | 面板/技能 | Attack | BunkerAttack,Execute |  |
| CommandCenterSwannFlying | 面板/技能 | Land | CommandCenterLandSwann,0 |  |
| CommandCenterSwannFlying | 面板/技能 | Stop | stop,Stop |  |
| CommandCenterSwannFlying | 面板/技能 | Move | move,Move |  |
| CommandCenterSwannFlying | 面板/技能 | CommandCenterLoad | CommandCenterTransport,LoadAll |  |
| CommandCenterSwannFlying | 面板/技能 | CommandCenterUnloadAll | CommandCenterTransport,UnloadAll |  |
| CommandCenterSwannFlying | 面板/技能 | MoveHoldPosition | move,HoldPos |  |
| CommandCenterSwannFlying | 面板/技能 | MovePatrol | move,Patrol |  |
| CommandCenterSwann | 面板/技能 | SCV | CommandCenterTrainSwann,Train1 |  |
| CommandCenterSwann | 面板/技能 | Rally | RallyCommand,Rally1 |  |
| CommandCenterSwann | 面板/技能 | CommandCenterLoad | CommandCenterTransport,LoadAll |  |
| CommandCenterSwann | 面板/技能 | CommandCenterUnloadAll | CommandCenterTransport,UnloadAll |  |
| CommandCenterSwann | 面板/技能 | Lift | CommandCenterLiftOffSwann,Execute |  |
| CommandCenterSwann | 面板/技能 | Halt | BuildInProgressSwann,Halt |  |
| CommandCenterSwann | 面板/技能 | Cancel | que5CancelToSelection,CancelLast |  |
| CommandCenterSwann | 面板/技能 | CancelBuilding | BuildInProgressSwann,Cancel |  |
| CommandCenterSwann | 面板/技能 | VespeneDroneSwann | VespeneDroneSwann,Execute |  |
| EngineeringBaySwann | 面板/技能 | Cancel | que5,CancelLast |  |
| EngineeringBaySwann | 面板/技能 | CancelBuilding | BuildInProgressSwann,Cancel |  |
| EngineeringBaySwann | 面板/技能 | Halt | BuildInProgressSwann,Halt |  |
| EngineeringBaySwann | 被动 | MissileTurretPassive |  |  |
| EngineeringBaySwann | 面板/技能 | HiSecAutoTrackingSwann | EngineeringBayResearchSwann,Research1 |  |
| EngineeringBaySwann | 面板/技能 | HiSecAutoTracking2Swann | EngineeringBayResearchSwann,Research2 |  |
| EngineeringBaySwann | 面板/技能 | BuildingArmorSwann | EngineeringBayResearchSwann,Research3 |  |
| EngineeringBaySwann | 面板/技能 | BuildingArmor2Swann | EngineeringBayResearchSwann,Research4 |  |
| EngineeringBaySwann | 面板/技能 | FireSuppressionSwann | EngineeringBayResearchSwann,Research7 |  |
| EngineeringBaySwann | 面板/技能 | FireSuppression2Swann | EngineeringBayResearchSwann,Research8 |  |
| EngineeringBaySwann | 面板/技能 | KMCAutoLoadersSwann | EngineeringBayResearchSwann,Research5 |  |
| EngineeringBaySwann | 面板/技能 | KMCAutoLoaders2Swann | EngineeringBayResearchSwann,Research6 |  |
| FactorySwann | 面板/技能 | Rally | Rally,Rally1 |  |
| FactorySwann | 面板/技能 | LiftSwann | FactoryLiftOffSwann,Execute |  |
| FactorySwann | 面板/技能 | Halt | BuildInProgressSwann,Halt |  |
| FactorySwann | 面板/技能 | Cancel | que5,CancelLast |  |
| FactorySwann | 面板/技能 | CancelBuilding | BuildInProgressSwann,Cancel |  |
| FactorySwann | 面板/技能 | Research330mmBarrageCannonsSwann | FactoryResearchSwann,Research3 |  |
| FactorySwann | 面板/技能 | PredatorSwann | FactoryTrainSwann,Train11 |  |
| FactorySwann | 面板/技能 | GoliathSwann | FactoryTrainSwann,Train3 |  |
| FactorySwann | 面板/技能 | SiegeTankSwann | FactoryTrainSwann,Train2 |  |
| FactorySwann | 面板/技能 | ThorSwann | FactoryTrainSwann,Train5 |  |
| FactorySwann | 面板/技能 | HellionSwann | FactoryTrainSwann,Train6 |  |
| FactorySwann | 面板/技能 | DoubleBuildSwann | DoubleBuildSwann,Specialize1 |  |
| FactorySwann | 面板/技能 | MicroBotSwann | FactoryTrainSwann,Train12 |  |
| FactorySwann | 面板/技能 | AresClassWeaponsSystemSwann | FactoryResearchSwann,Research2 |  |
| FactorySwann | 面板/技能 | MaelstromRoundsSwann | FactoryResearchSwann,Research1 |  |
| FactorySwann | 面板/技能 | HellionTankSwann | FactoryTrainSwann,Train7 |  |
| FactorySwann | 面板/技能 | BuildCycloneSwann | FactoryTrainSwann,Train8 |  |
| FactorySwannFlying | 面板/技能 | LandSwann | FactoryLandSwann,Execute |  |
| FactorySwannFlying | 面板/技能 | Stop | stop,Stop |  |
| FactorySwannFlying | 面板/技能 | Move | move,Move |  |
| FactorySwannFlying | 面板/技能 | MoveHoldPosition | move,HoldPos |  |
| FactorySwannFlying | 面板/技能 | MovePatrol | move,Patrol |  |
| FusionCoreSwann | 面板/技能 | Cancel | que5,CancelLast |  |
| FusionCoreSwann | 面板/技能 | CancelBuilding | BuildInProgressSwann,Cancel |  |
| FusionCoreSwann | 面板/技能 | Halt | BuildInProgressSwann,Halt |  |
| GhostAcademySwann | 面板/技能 | Cancel | que5,CancelLast |  |
| GhostAcademySwann | 面板/技能 | CancelBuilding | BuildInProgressSwann,Cancel |  |
| GhostAcademySwann | 面板/技能 | Halt | BuildInProgressSwann,Halt |  |
| GoliathSwann | 面板/技能 | Move | move,Move |  |
| GoliathSwann | 面板/技能 | Stop | stop,Stop |  |
| GoliathSwann | 面板/技能 | MoveHoldPosition | move,HoldPos |  |
| GoliathSwann | 面板/技能 | Attack | attack,Execute |  |
| GoliathSwann | 面板/技能 | MovePatrol | move,Patrol |  |
| MercCompoundSwann | 面板/技能 | Rally | Rally,Rally1 |  |
| MercCompoundSwann | 面板/技能 | Halt | BuildInProgressSwann,Halt |  |
| MercCompoundSwann | 面板/技能 | CancelBuilding | BuildInProgressSwann,Cancel |  |
| MissileTurretSwann | 面板/技能 | Halt | BuildInProgressSwann,Halt |  |
| MissileTurretSwann | 被动 | Detector |  | NotUnderConstruction |
| MissileTurretSwann | 面板/技能 | CancelBuilding | BuildInProgressSwann,Cancel |  |
| MissileTurretSwann | 面板/技能 | Stop | stop,Stop |  |
| MissileTurretSwann | 面板/技能 | AttackBuilding | attack,Execute |  |
| MissileTurretSwann | 面板/技能 | SalvageSwann | SalvageSharedSwann,On |  |
| OrbitalCommandSwann | 面板/技能 | SCV | CommandCenterTrainSwann,Train1 |  |
| OrbitalCommandSwann | 面板/技能 | Lift | OrbitalLiftOffSwann,0 |  |
| OrbitalCommandSwann | 面板/技能 | CancelBuilding | BuildInProgressSwann,Cancel |  |
| OrbitalCommandSwann | 面板/技能 | Cancel | que5CancelToSelection,CancelLast |  |
| OrbitalCommandSwann | 面板/技能 | Scan | ScannerSweep,Execute |  |
| OrbitalCommandSwann | 面板/技能 | Rally | RallyCommand,Rally1 |  |
| OrbitalCommandSwann | 面板/技能 | CalldownMULE | CalldownMULE,Execute |  |
| OrbitalCommandSwann | 面板/技能 | SupplyDrop | SupplyDropSwann,Execute |  |
| OrbitalCommandSwannFlying | 面板/技能 | Land | OrbitalCommandLandSwann,0 |  |
| OrbitalCommandSwannFlying | 面板/技能 | Stop | stop,Stop |  |
| OrbitalCommandSwannFlying | 面板/技能 | Move | move,Move |  |
| OrbitalCommandSwannFlying | 面板/技能 | MoveHoldPosition | move,HoldPos |  |
| OrbitalCommandSwannFlying | 面板/技能 | MovePatrol | move,Patrol |  |
| PlanetaryFortressSwann | 面板/技能 | PlanetaryFortressLoad | CommandCenterTransport,LoadAll |  |
| PlanetaryFortressSwann | 面板/技能 | CommandCenterUnloadAll | CommandCenterTransport,UnloadAll |  |
| PlanetaryFortressSwann | 面板/技能 | StopPlanetaryFortress | stop,Stop |  |
| PlanetaryFortressSwann | 面板/技能 | AttackBuildingPFort | attack,Execute |  |
| PlanetaryFortressSwann | 面板/技能 | Cancel | que5PassiveCancelToSelection,CancelLast |  |
| PlanetaryFortressSwann | 面板/技能 | CancelBuilding | BuildInProgressSwann,Cancel |  |
| PlanetaryFortressSwann | 面板/技能 | SCV | CommandCenterTrainSwann,Train1 |  |
| PlanetaryFortressSwann | 面板/技能 | Rally | RallyCommand,Rally1 |  |
| PredatorSwann | 面板/技能 | Move | move,Move |  |
| PredatorSwann | 面板/技能 | Stop | stop,Stop |  |
| PredatorSwann | 面板/技能 | MoveHoldPosition | move,HoldPos |  |
| PredatorSwann | 面板/技能 | MovePatrol | move,Patrol |  |
| PredatorSwann | 面板/技能 | Attack | attack,Execute |  |
| PredatorSwann | 面板/技能 | AcquireMove | move,AcquireMove |  |
| PredatorSwann | 被动 | RetributionField |  |  |
| PredatorSwann | 被动 | CliffJumper |  |  |
| PredatorSwann | 面板/技能 | PredatorBlinkSwann | PredatorBlinkSwann,Execute |  |
| SCVSwann | 面板/技能 | Move | move,Move |  |
| SCVSwann | 面板/技能 | Stop | stop,Stop |  |
| SCVSwann | 面板/技能 | MoveHoldPosition | move,HoldPos |  |
| SCVSwann | 面板/技能 | AttackWorker | attack,Execute |  |
| SCVSwann | 面板/技能 | MovePatrol | move,Patrol |  |
| SCVSwann | 面板/技能 | Repair | RepairSwann,Execute |  |
| SCVSwann | 面板/技能 | GatherTerr | SCVHarvest,Gather |  |
| SCVSwann | 面板/技能 | ReturnCargo | SCVHarvest,Return |  |
| SCVSwann | 面板/技能 | Halt | TerranBuildSwann,Halt |  |
| SCVSwann | 面板/技能 | CommandCenteSwannR | TerranBuildSwann,Build1 |  |
| SCVSwann | 面板/技能 | RefinerySwann | TerranBuildSwann,Build3 |  |
| SCVSwann | 面板/技能 | SupplyDepotDropSwann | TerranBuildDropSwann,Build1 |  |
| SCVSwann | 面板/技能 | SupplyDepotSwann | TerranBuildSwann,Build2 |  |
| SCVSwann | 面板/技能 | EngineeringBaySwann | TerranBuildSwann,Build5 |  |
| SCVSwann | 面板/技能 | MissileTurretSwann | TerranBuildSwann,Build6 |  |
| SCVSwann | 面板/技能 | SensorToweSwannR | TerranBuildSwann,Build9 |  |
| SCVSwann | 面板/技能 | GrenadeTurretSwann | TerranBuildSwann,Build17 |  |
| SCVSwann | 面板/技能 | PerditionTurretSwann | TerranBuildSwann,Build18 |  |
| SCVSwann | 面板/技能 | FactorySwann | TerranBuildSwann,Build11 |  |
| SCVSwann | 面板/技能 | ArmorySwann | TerranBuildSwann,Build14 |  |
| SCVSwann | 面板/技能 | StarportSwann | TerranBuildSwann,Build12 |  |
| SensorTowerSwann | 被动 | RadarField |  | NotUnderConstruction |
| SensorTowerSwann | 面板/技能 | Halt | BuildInProgressSwann,Halt |  |
| SensorTowerSwann | 面板/技能 | CancelBuilding | BuildInProgressSwann,Cancel |  |
| CasterSwann | 面板/技能 | DrakkenLaserDrillAttack | attack,Execute |  |
| CasterSwann | 被动 | DrakkenLaserDrillAttack |  | HaveDrakkenLaserDrill |
| CasterSwann | 面板/技能 | DrakkenLaserDrillBFG | DrakkenLaserDrillBFG,Execute |  |
| CasterSwann | 被动 | DrakkenLaserDrillBFG |  | HaveDrakkenLaserDrill |
| CasterSwann | 面板/技能 | DrakkenLaserDrillNuke | DrakkenLaserDrillNuke,Execute |  |
| CasterSwann | 被动 | DrakkenLaserDrillNuke |  | HaveDrakkenLaserDrill |
| CasterSwann | 面板/技能 | CombatDropSwann | CombatDropSwann,Execute |  |
| StarportSwann | 面板/技能 | Rally | Rally,Rally1 |  |
| StarportSwann | 面板/技能 | LiftSwann | StarportLiftOffSwann,Execute |  |
| StarportSwann | 面板/技能 | Halt | BuildInProgressSwann,Halt |  |
| StarportSwann | 面板/技能 | Cancel | que5,CancelLast |  |
| StarportSwann | 面板/技能 | CancelBuilding | BuildInProgressSwann,Cancel |  |
| StarportSwann | 面板/技能 | WraithSwann | StarportTrainSwann,Train8 |  |
| StarportSwann | 面板/技能 | BuildScienceVesselSwann | StarportTrainSwann,Train9 |  |
| StarportSwann | 面板/技能 | BuildHerculesSwann | StarportTrainSwann,Train6 |  |
| StarportSwann | 面板/技能 | DoubleBuildSwann | DoubleBuildSwann,Specialize1 |  |
| StarportSwann | 面板/技能 | PulseAmplifierSwann | SarportResearchSwann,Research2 |  |
| StarportSwann | 面板/技能 | ImprovedNanoRepairSwann | SarportResearchSwann,Research1 |  |
| StarportSwann | 面板/技能 | HerculesSwann | SarportResearchSwann,Research3 |  |
| StarportSwannFlying | 面板/技能 | LandSwann | StarportLandSwann,Execute |  |
| StarportSwannFlying | 面板/技能 | Stop | stop,Stop |  |
| StarportSwannFlying | 面板/技能 | Move | move,Move |  |
| StarportSwannFlying | 面板/技能 | MoveHoldPosition | move,HoldPos |  |
| StarportSwannFlying | 面板/技能 | MovePatrol | move,Patrol |  |
| SupplyDepotSwann | 面板/技能 | Halt | BuildInProgressSwann,Halt |  |
| SupplyDepotSwann | 面板/技能 | CancelBuilding | BuildInProgressSwann,Cancel |  |
| SupplyDepotSwann | 面板/技能 | Lower | SupplyDepotLoweSwannR,0 |  |
| SupplyDepotSwannLowered | 面板/技能 | Raise | SupplyDepotRaiseSwann,0 |  |
| MicrobotSwann | 面板/技能 | Move | move,Move |  |
| MicrobotSwann | 面板/技能 | Stop | stop,Stop |  |
| MicrobotSwann | 面板/技能 | MoveHoldPosition | move,HoldPos |  |
| MicrobotSwann | 面板/技能 | MovePatrol | move,Patrol |  |
| MicrobotSwann | 面板/技能 | Attack | attack,Execute |  |
| SwannSwann | 面板/技能 | Move | move,Move |  |
| SwannSwann | 面板/技能 | Stop | stop,Stop |  |
| SwannSwann | 面板/技能 | MoveHoldPosition | move,HoldPos |  |
| SwannSwann | 面板/技能 | MovePatrol | move,Patrol |  |
| SwannSwann | 面板/技能 | Attack | attack,Execute |  |
| SwannSwann | 面板/技能 | DutchPlaceTurretSwann | DutchPlaceTurretSwann,Execute |  |
| SwannSwann | 面板/技能 | CreatePredatorSwann | CreatePredatorSwann,Execute |  |
| ThorSwann | 面板/技能 | Move | move,Move |  |
| ThorSwann | 面板/技能 | Stop | stop,Stop |  |
| ThorSwann | 面板/技能 | MoveHoldPosition | move,HoldPos |  |
| ThorSwann | 面板/技能 | Attack | attack,Execute |  |
| ThorSwann | 面板/技能 | MovePatrol | move,Patrol |  |
| ThorSwann | 面板/技能 | 330mmBarrageCannonsSwann | 330mmBarrageCannonsSwann,Execute |  |
| ThorSwann | 面板/技能 | Cancel | 330mmBarrageCannonsSwann,Cancel |  |
| WarbotSwann | 面板/技能 | Move | move,Move |  |
| WarbotSwann | 面板/技能 | Stop | stop,Stop |  |
| WarbotSwann | 面板/技能 | MoveHoldPosition | move,HoldPos |  |
| WarbotSwann | 面板/技能 | MovePatrol | move,Patrol |  |
| WarbotSwann | 面板/技能 | Attack | attack,Execute |  |
| PerditionTurretSwann | 面板/技能 | Halt | BuildInProgressSwann,Halt |  |
| PerditionTurretSwann | 面板/技能 | CancelBuilding | BuildInProgressSwann,Cancel |  |
| PerditionTurretSwann | 面板/技能 | Attack | attack,Execute |  |
| PerditionTurretSwann | 面板/技能 | Stop | stop,Stop |  |
| PerditionTurretSwann | 面板/技能 | Salvage | SalvageSharedSwann,On |  |
| PerditionTurretSwannUnderground | 面板/技能 | Cancel | BuildInProgressSwann,Cancel |  |
| PerditionTurretSwannUnderground | 面板/技能 | Attack | attack,Execute |  |
| PerditionTurretSwannUnderground | 面板/技能 | Salvage | SalvageSharedSwann,On |  |
| GrenadeTurretSwann | 面板/技能 | Stop | stop,Stop |  |
| GrenadeTurretSwann | 面板/技能 | Attack | attack,Execute |  |
| GrenadeTurretSwann | 面板/技能 | Salvage | SalvageSharedSwann,On |  |
| GrenadeTurretSwann | 面板/技能 | CancelBuilding | BuildInProgressSwann,Cancel |  |
| GrenadeTurretSwann | 面板/技能 | Halt | BuildInProgressSwann,Halt |  |
| GrenadeTurretSwann | 被动 | KelMorianGrenadeTurretConcussiveGrenades |  | HaveSwannKelMorianGrenadeTurretUpgrade |
| GrenadeTurretSwann | 被动 | HaveHiSecAutoTracking |  | HaveTerranDefenseRangeBonus |
| GrenadeTurretSwann | 被动 | HaveImprovedTurretAttackSpeed |  | HaveSwannTurretIncreasedAttackSpeed |
| HerculesSwann | 面板/技能 | Move | move,Move |  |
| HerculesSwann | 面板/技能 | Stop | stop,Stop |  |
| HerculesSwann | 面板/技能 | MoveHoldPosition | move,HoldPos |  |
| HerculesSwann | 面板/技能 | MovePatrol | move,Patrol |  |
| HerculesSwann | 面板/技能 | HerculesLoad | HerculesTransportSwann,Load |  |
| HerculesSwann | 面板/技能 | HerculesUnloadAll | HerculesTransportSwann,UnloadAt |  |
| HerculesSwann | 面板/技能 | AcquireMove | move,AcquireMove |  |
| HerculesSwann | 被动 | RapidDeployment |  |  |
| HerculesSwann | 面板/技能 | HyperjumpSwann | HyperjumpSwann,Execute |  |
| ScienceVesselSwann | 面板/技能 | Move | move,Move |  |
| ScienceVesselSwann | 面板/技能 | Stop | stop,Stop |  |
| ScienceVesselSwann | 面板/技能 | MoveHoldPosition | move,HoldPos |  |
| ScienceVesselSwann | 面板/技能 | MovePatrol | move,Patrol |  |
| ScienceVesselSwann | 面板/技能 | Attack | attack,Execute |  |
| ScienceVesselSwann | 面板/技能 | AcquireMove | move,AcquireMove |  |
| ScienceVesselSwann | 面板/技能 | IrradiateSwann | IrradiateSwann,Execute |  |
| ScienceVesselSwann | 面板/技能 | HealSwann | NanoRepairSwann,Execute |  |
| ScienceVesselSwann | 被动 | Detector |  |  |
| ScienceVesselSwann | 面板/技能 | DefensiveMatrixSwann | DefensiveMatrixSwann,Execute |  |
| ScienceVesselSwann | 面板/技能 | HyperjumpSwann | HyperjumpRSwann,Execute |  |
| SiegeTankSwann | 面板/技能 | Move | move,Move |  |
| SiegeTankSwann | 面板/技能 | Stop | stop,Stop |  |
| SiegeTankSwann | 面板/技能 | MoveHoldPosition | move,HoldPos |  |
| SiegeTankSwann | 面板/技能 | Attack | attack,Execute |  |
| SiegeTankSwann | 面板/技能 | MovePatrol | move,Patrol |  |
| SiegeTankSwann | 面板/技能 | SiegeMode | SiegeModeSwann,Execute |  |
| SiegeTankSiegedSwann | 面板/技能 | Move | move,Move |  |
| SiegeTankSiegedSwann | 面板/技能 | Stop | stop,Stop |  |
| SiegeTankSiegedSwann | 面板/技能 | MoveHoldPosition | move,HoldPos |  |
| SiegeTankSiegedSwann | 面板/技能 | AttackBuilding | attack,Execute |  |
| SiegeTankSiegedSwann | 面板/技能 | MovePatrol | move,Patrol |  |
| SiegeTankSiegedSwann | 面板/技能 | Unsiege | UnsiegeSwann,Execute |  |
| WraithSwann | 面板/技能 | Move | move,Move |  |
| WraithSwann | 面板/技能 | Stop | stop,Stop |  |
| WraithSwann | 面板/技能 | MoveHoldPosition | move,HoldPos |  |
| WraithSwann | 面板/技能 | Attack | attack,Execute |  |
| WraithSwann | 面板/技能 | MovePatrol | move,Patrol |  |
| WraithSwann | 面板/技能 | WraithCloakOn | WraithCloakSwann,On |  |
| WraithSwann | 面板/技能 | WraithCloakOff | WraithCloakSwann,Off |  |
| WraithSwann | 被动 | PulseAmplifierSwann |  |  |
| WraithSwann | 被动 | CloakDistortionFieldSwann |  |  |

## 原始ID列表

- AbilData.xml：
  - 330mmBarrageCannonsSwann
  - CombatDropSwann
  - CommandCenterLandSwann
  - CommandCenterLiftOffSwann
  - CommandCenterTrainSwann
  - DefensiveMatrixSwann
  - DropToSupplyDepotSwann
  - FactoryLandSwann
  - FactoryLiftOffSwann
  - FactoryResearchSwann
  - FactoryTrainSwann
  - HerculesTransportSwann
  - IrradiateSwann
  - NanoRepairSwann
  - OrbitalCommandLandSwann
  - SupplyDepotLoweSwannR
  - SupplyDepotRaiseSwann
  - SupplyDropSwann
  - WraithCloakSwann
- ButtonData.xml：
  - 330mmBarrageCannonsSwann
  - BuildCycloneSwann
  - BuildHerculesSwann
  - BuildScienceVesselSwann
  - CloakDistortionFieldSwann
  - CombatDropSwann
  - CommandCenteSwannR
  - CommanderSwannArmoryUpgradePack
  - CommanderSwannCombatDrop
  - CommanderSwannEngineeringBayUpgradesPack
  - CommanderSwannFactoryUpgradesPack
  - CommanderSwannImprovedCombatDrop
  - CommanderSwannImprovedLaserDrill
  - CommanderSwannImprovedSCVs
  - CommanderSwannImprovedTurrets
  - CommanderSwannIncreasedVehicleHealth
  - CommanderSwannTechReactors
  - CommanderSwannUnlockAdditionalStarportTechLabUpgrades
  - CommanderSwannUnlockThor
  - CommanderSwannVehicleSpecialist
  - CommanderSwannVespeneDrone
  - DefensiveMatrixSwann
  - DrakkenLaserDrillAttack
  - FactorySwann
  - GoliathSwann
  - HellionSwann
  - HellionTankSwann
  - HerculesSwann
  - ImprovedNanoRepairSwann
  - IrradiateSwann
  - MaelstromRoundsSwann
  - PulseAmplifierSwann
  - RegenerativeBioSteelSwann
  - Research330mmBarrageCannonsSwann
  - SiegeTankSwann
  - SupplyDepotDropSwann
  - SupplyDepotSwann
  - SupplyDropSwann
  - ThorSwann
  - WraithSwann
- BehaviorData.xml：
  - 330mmBarrageCannonsSwann
  - CloakDistortionFieldSwann
  - CombatDropHSwann
  - CombatDropSwann
  - CommandCenterQueueSwann
  - DefensiveMatrixSwann
  - IrradiateSwann
  - SupplyDropEnRouteSwann
  - SupplyDropSwann
  - WraithCloakSwann
