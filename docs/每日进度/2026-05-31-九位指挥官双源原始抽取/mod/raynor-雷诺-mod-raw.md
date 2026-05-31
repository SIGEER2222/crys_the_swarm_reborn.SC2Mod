# 雷诺 / Raynor Mod 原始来源（中文整理）

- 模块：`XMRaynor.SC2Mod`
- 源目录：`C:\Users\22448\Downloads\重生虫心0.71汉化版（新）\reborn_workrepo\合作指挥官版起义狂潮\Mods\XM\XMRaynor.SC2Mod`
- 说明：直接从 UnitData.xml / AbilData.xml / ButtonData.xml / BehaviorData.xml 抽取，不引用旧汇总文档。

## 建筑

| 单位ID | 脚印 | 部署脚印 | 技能 | 行为 | 按钮 |
| --- | --- | --- | --- | --- | --- |
| Barracks | Footprint3x3CreepNormalContour | Footprint3x3CreepNormal | BarracksAddOns<br>BarracksLiftOff<br>BarracksTrain<br>BuildInProgress<br>Rally | ChronoBoostTarget | Rally / Rally,Rally1 / <br>Lift / BarracksLiftOff,Execute / <br>Halt / BuildInProgress,Halt / <br>Reactor / BarracksAddOns,Build2 / <br>TechLabBarracks / BarracksAddOns,Build1 / <br>Cancel / que5,CancelLast / <br>Cancel / BarracksAddOns,Halt / <br>CancelBuilding / BuildInProgress,Cancel / <br>SelectBuilder / SelectBuilder<br>Medic / BarracksTrain,Train5 / <br>Firebat / BarracksTrain,Train6 / AbilCmd<br>TechReactorAI / BarracksAddOns,Build3 / <br>TechReactorAI / BarracksAddOns,Build3 / <br>TechReactor / BarracksAddOns,Build4 / <br>OrbitalDropPodsPassive / Passive |
| BarracksFlying |  |  |  | ChronoBoostTarget | OrbitalDropPodsPassive / Passive |
| CoopAssistCasterRaynor |  |  | BansheeAirstrike |  | CancelBuilding / BuildInProgress,Cancel / AbilCmd<br>BansheeAirstrike / BansheeAirstrike,Execute / AbilCmd |
| CoopCasterRaynor |  |  | BansheeAirstrike<br>VoidCoopSummonHyperion | CommanderPrestigeRaynorAir | CancelBuilding / BuildInProgress,Cancel / AbilCmd<br>SummonHyperionVoid / VoidCoopSummonHyperion,Execute / AbilCmd<br>BansheeAirstrike / BansheeAirstrike,Execute / AbilCmd<br>BansheeAirstrikeLocked / Passive |
| Refinery |  |  |  |  |  |

## 兵种

| 单位ID | 脚印 | 部署脚印 | 技能 | 行为 | 按钮 |
| --- | --- | --- | --- | --- | --- |
| Banshee |  |  | attack<br>BansheeCloak<br>move<br>stop<br>VehicleAfterburners | AllUnitBehaviorController<br>VorazunCloakedShieldRegenPermanent | <br><br>IgniteAfterburners / VehicleAfterburners,Execute / AbilCmd<br>AfterburnersLocked / Passive |
| Battlecruiser |  |  | attack<br>BattlecruiserAttack<br>BattlecruiserMove<br>BattlecruiserStop<br>Hyperjump<br>HyperjumpNoVision<br>move<br>stop<br>VehicleAfterburners<br>Yamato | AllUnitBehaviorController |  / HyperjumpNoVision,Execute / <br>IgniteAfterburners / VehicleAfterburners,Execute / AbilCmd<br>AfterburnersLocked / Passive |
| Firebat |  |  | StimpackMarauder | AllUnitBehaviorController | <br><br>StimMarauder / StimpackMarauder,Execute / AbilCmd |
| Hyperion |  |  |  |  |  |
| Marauder |  |  | attack<br>move<br>StimpackMarauder<br>stop | AllUnitBehaviorController | StimMarauder / StimpackMarauder,Execute / AbilCmd |
| Marine |  |  | attack<br>move<br>Stimpack<br>stop | AllUnitBehaviorController | HaveShieldWall / Passive<br>Stim / Stimpack,Execute / AbilCmd |
| Medic |  |  | HealPlusMech | AllUnitBehaviorController | MedicHealPlusMech / HealPlusMech,Execute / AbilCmd |
| PointDefenseDrone |  |  |  | TargetingDroneDamageBuffer |  |
| Raynor |  |  |  |  |  |
| SiegeTank |  |  | attack<br>move<br>SiegeMode<br>SiegeTankWreckage<br>stop<br>VehicleAfterburners | AllUnitBehaviorController | <br>ImprovedSiegeMode / Passive<br>MaelstromRounds / Passive<br>IgniteAfterburners / VehicleAfterburners,Execute / AbilCmd<br>AfterburnersLocked / Passive |
| SiegeTankSieged |  |  | SiegeTankWreckage<br>VehicleAfterburners | AllUnitBehaviorController |  / 255,255 / <br>ImprovedSiegeMode / Passive<br>MaelstromRounds / Passive<br>IgniteAfterburners / VehicleAfterburners,Execute / AbilCmd<br>AfterburnersLocked / Passive |
| Vulture |  |  | VehicleAfterburners | AllUnitBehaviorController |  / 255,255 / <br>IgniteAfterburners / VehicleAfterburners,Execute / AbilCmd<br>AfterburnersLocked / Passive |

## 面板与技能

| 来源单位 | 类型 | Face | AbilCmd | Requirements |
| --- | --- | --- | --- | --- |
| Banshee | 面板/技能 | IgniteAfterburners | VehicleAfterburners,Execute |  |
| Banshee | 被动 | AfterburnersLocked |  | RaynorLevel11 |
| Barracks | 面板/技能 | Firebat | BarracksTrain,Train6 |  |
| Barracks | 被动 | OrbitalDropPodsPassive |  | HaveOrbitalDropPods |
| BarracksFlying | 被动 | OrbitalDropPodsPassive |  | HaveOrbitalDropPods |
| Battlecruiser | 面板/技能 | IgniteAfterburners | VehicleAfterburners,Execute |  |
| Battlecruiser | 被动 | AfterburnersLocked |  | RaynorLevel11 |
| CoopAssistCasterRaynor | 面板/技能 | CancelBuilding | BuildInProgress,Cancel |  |
| CoopAssistCasterRaynor | 面板/技能 | BansheeAirstrike | BansheeAirstrike,Execute |  |
| CoopCasterRaynor | 面板/技能 | CancelBuilding | BuildInProgress,Cancel |  |
| CoopCasterRaynor | 面板/技能 | SummonHyperionVoid | VoidCoopSummonHyperion,Execute |  |
| CoopCasterRaynor | 面板/技能 | BansheeAirstrike | BansheeAirstrike,Execute |  |
| CoopCasterRaynor | 被动 | BansheeAirstrikeLocked |  | RaynorLevel02 |
| Firebat | 面板/技能 | StimMarauder | StimpackMarauder,Execute |  |
| Marauder | 面板/技能 | StimMarauder | StimpackMarauder,Execute |  |
| Marine | 被动 | HaveShieldWall |  | HaveShieldWall |
| Marine | 面板/技能 | Stim | Stimpack,Execute |  |
| Medic | 面板/技能 | MedicHealPlusMech | HealPlusMech,Execute |  |
| SiegeTank | 被动 | ImprovedSiegeMode |  | HaveImprovedSiegeMode |
| SiegeTank | 被动 | MaelstromRounds |  | HaveMaelstromRounds |
| SiegeTank | 面板/技能 | IgniteAfterburners | VehicleAfterburners,Execute |  |
| SiegeTank | 被动 | AfterburnersLocked |  | RaynorLevel11 |
| SiegeTankSieged | 被动 | ImprovedSiegeMode |  | HaveImprovedSiegeMode |
| SiegeTankSieged | 被动 | MaelstromRounds |  | HaveMaelstromRounds |
| SiegeTankSieged | 面板/技能 | IgniteAfterburners | VehicleAfterburners,Execute |  |
| SiegeTankSieged | 被动 | AfterburnersLocked |  | RaynorLevel11 |
| Vulture | 面板/技能 | IgniteAfterburners | VehicleAfterburners,Execute |  |
| Vulture | 被动 | AfterburnersLocked |  | RaynorLevel11 |

## 原始ID列表

- AbilData.xml：
  - BansheeAirstrike
  - BarracksTechLabResearch
  - BarracksTrain
  - CommandCenterTrain
  - CommanderPrestigeVorazunTimeStop
  - CommanderPrestigeZagaraZagaraDeepTunnel
  - DehakaAirAttackUpgrade
  - DehakaArmorUpgrade
  - DeploySpiderMines
  - DuskWingBansheeCloakingField
  - GhostCloak
  - heal
  - HealingDroneHeal
  - HealPlusMech
  - HHCommandCenterLand
  - HHCommandCenterLiftOff
  - HHVikingRockets
  - HyperionAdvancedPDD
  - HyperionVoidCoopHyperjump
  - HyperionVoidCoopYamatoCannon
  - Hyperjump
  - InfestedBansheeCloakingField
  - MakeVultureSpiderMines
  - MarauderMagrailMunitions
  - Medivac_BlackOpsHeal
  - PlaceHealingDrone
  - QueenBurstHeal
  - SiegeTankJumpJet
  - SIStukovInfestStructureUpgraded
  - StimpackHERC
  - StukovInfestedSiegeTankDeepTunnel
  - StukovInfestedSiegeTankRoot
  - UpgradeToGreaterSpireBroodlord
  - UpgradeToGreaterSpireViper
  - UpgradeToHive
  - UpgradeToLair
  - UpgradeToOrbital
  - UpgradeToWarpGate
  - VehicleAfterburners
  - VoidCoopSummonHyperion
  - Yamato
- ButtonData.xml：
  - AfterburnersLocked
  - AlarakAreaDamageUpgrade
  - AresClassWeaponsSystemviking
  - BansheeAirstrike
  - BansheeAirstrikeLocked
  - BioMechanicalHeal
  - BuildBattlecruiserLocked
  - BuildHealingDrone
  - CerberusMines
  - CloakOnBanshee_Raynor
  - CloakOnBanshee_Stukov
  - CloakOnDustWing
  - CommanderPrestigeAbathurBrutaliskLocked
  - CommanderPrestigeKaraxKhaydarinMonolithBuildLocked
  - CommanderPrestigeKaraxKhaydarinMonolithLocked
  - CommanderPrestigeKaraxOptimizedAttackSpeedResearchLocked
  - CommanderPrestigeKaraxPhotonCannonBuildLocked
  - CommanderPrestigeKaraxPhotonCannonLocked
  - CommanderPrestigeKerriganNydusWormBuildLocked
  - CommanderPrestigeRaynorMULELocked
  - CommanderPrestigeZagaraHeroicFortitudeResearchLocked
  - CommanderPrestigeZagaraMedusaBladesResearchLocked
  - CommanderPrestigeZagaraZagaraDeepTunnel
  - CommanderVorazunDarkArchonPassiveLocked
  - CycloneLockOnDamageUpgrade
  - DehakaAirAttackUpgrade
  - DehakaArmorUpgrade
  - DeploySpiderMines
  - FenixClolarionCarrierDownloadUpgrade
  - FenixKaldalisZealotDownloadUpgrade
  - FenixMojoScoutDownloadUpgrade
  - FenixTaldarinImmortalDownloadUpgrade
  - FenixTalisAdeptDownloadUpgrade
  - FenixTalisAdeptLearnBounceShotUpgrade
  - FenixWarbringerColossusDownloadUpgrade
  - HHBattlecruiserShots
  - HHVikingPiercingAttacks
  - HHVikingRockets
  - HHWraithPermaCloak
  - HyperionAdvancedPDD
  - IgniteAfterburners
  - InfestedSiegeTankArmoredDamage
  - KaraxEnergyRegenUpgrade
  - LearnDehakaArmorUpgrade
  - LockOnRangeUpgrade
  - MarauderMagrailMunitions
  - MedicHeal
  - MedicHealPlusMech
  - Medivac_BlackOpsHeal
  - MercVulture
  - NeoSteelFrameCommandCenter
  - OrbitalDropPodsPassive
  - ResearchAbathurMutaliskHealthScalingUpgrade
  - ResearchAdvancedHealingAI
  - ResearchBanshee_BlackOpsAirstrike
  - ResearchBansheeCloak_Raynor
  - ResearchCerberusMines
  - ResearchCorsairPermanentCloak
  - ResearchCorsairPermanentCloakLocked
  - ResearchCycloneLockOnDamageUpgrade
  - ResearchDeploySpiderMines
  - ResearchDisruptorCloak
  - ResearchFenixSentryGuardianZoneUpgrade
  - ResearchFenixSentryGuardianZoneUpgradeLocked
  - ResearchHavocPermanentCloak
  - ResearchHHTacticalJumpCharges
  - ResearchHHVikingPiercingAttacks
  - ResearchHHVikingRockets
  - ResearchHHWraithPermaCloak
  - ResearchIncineratorGauntlets
  - ResearchInterceptorLaunchSpeedUpgrade
  - ResearchJuggernautPlating
  - ResearchKaraxEnergyRegenUpgrade
  - ResearchMarauderMagrailMunitions
  - ResearchMedivacCloakedHealBeam
  - ResearchNovaConcussiveShells
  - ResearchOracleStasisWardUpgrade
  - ResearchOracleStasisWardUpgradeLocked
  - ResearchRaynorAfterburners
  - ResearchRipwaveMissiles
  - ResearchShockwaveMissileBattery
  - ResearchSiegeTankJumpJets
  - ResearchStabilizerMedpacks
  - ResearchXN51CloakTechnology
  - SICommandCenter
  - SICommandCenterLoad
  - SiegeTankJumpJet
  - SIStukovInfestStructureUpgraded
  - SOAOrbitalStrike
  - StabilizerMedPacks
  - Stim
  - StukovInfestedSiegeTankAmmo
  - StukovInfestedSiegeTankDeepTunnel
  - StukovInfestedSiegeTankRoot
  - SwannCommanderRebuild
  - TrainBansheeNova
  - TrainSiegeTankNova
  - Vulture
- BehaviorData.xml：
  - AdvancedPointDefenseDroneTimedLife
  - BansheeAirstrikeTimedLife
  - BansheeBlackOpsPermanentCloak
  - BansheeCloak_Raynor
  - BansheeCloak_Stukov
  - CloakDistortionField
  - CommanderPrestigeArtanisPowerField
  - CommanderPrestigeDehakaPackLeaders
  - CommanderPrestigeDehakaPackLeadersExitGame
  - CommanderPrestigeDehakaPackLeadersExitGameEnd
  - CommanderPrestigeDehakaPackLeadersTracker
  - CommanderPrestigeKerriganCreepGrowth
  - CommanderPrestigeNovaSuperCloak
  - CommanderPrestigeNovaSuperCloakCombat
  - CommanderPrestigeRaynorAir
  - CommanderPrestigeTychusLoneWolf
  - CommanderPrestigeZeratulTornadoes
  - CommanderPrestigeZeratulTornadoesDoT
  - CorsairPermanentCloak
  - DehakaAirAttackUpgrade
  - DehakaConsumeDisableCommandCard
  - DuskWingBansheeCloak
  - GenerateCreepHealingBehavior
  - HHHyperjumpTeleportOut
  - HyperionVoidCoopDamageAura
  - HyperionVoidCoopDamageAuraTarget
  - HyperionVoidCoopPauseSecondary
  - HyperionVoidCoopSecondaryWeapons
  - HyperionVoidCoopSpawn
  - HyperionVoidCoopTimedLife
  - HyperionVoidCoopTimedLifeExpire
  - HyperjumpTeleport
  - HyperjumpTeleportIn
  - HyperjumpTeleportOut
  - InfestedSiegeTankAmmoAuto
  - MarineMercVeterancyAura
  - NovaPermanentlyCloaked
  - RaynorCommanderPermanentlyCloakedUpgrade
  - RaynorMedicSafeguard
  - RaynorMedicSafeguardMastery
  - SiegeTankJumpJetCreateTimeOut
  - SiegeTankMercVeterancyAura
  - SiegeTankSiegeModeProgressiveRangeIncease
  - SISiegeTankSiegedTentacle
  - StukovInfestedSiegeTankAmmo
  - StukovInfestedSiegeTankAmmoRestockSearch
  - StukovInfestedSiegeTankOnCreep
  - SupplyLT1
  - SwannCommanderMechWreckageBurning
  - VehicleAfterburners
  - VorazunCloakDamageBoostPermanent
  - VorazunCloakDamageBoostPermanentUltraliskBurrowCharge
  - VorazunCloakedShieldRegen
  - VorazunCloakedShieldRegenPermanent
