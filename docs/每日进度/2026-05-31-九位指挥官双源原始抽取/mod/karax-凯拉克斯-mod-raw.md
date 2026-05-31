# 凯拉克斯 / Karax Mod 原始来源（中文整理）

- 模块：`XMKarax.SC2Mod`
- 源目录：`C:\Users\22448\Downloads\重生虫心0.71汉化版（新）\reborn_workrepo\合作指挥官版起义狂潮\Mods\XM\XMKarax.SC2Mod`
- 说明：直接从 UnitData.xml / AbilData.xml / ButtonData.xml / BehaviorData.xml 抽取，不引用旧汇总文档。

## 建筑

| 单位ID | 脚印 | 部署脚印 | 技能 | 行为 | 按钮 |
| --- | --- | --- | --- | --- | --- |
| Assimilator |  |  |  |  |  |
| Forge | Footprint3x3CreepNormalContour | Footprint3x3CreepNormal | ForgeResearchZeratul | ChronoBoostTarget | CommanderPrestigeKaraxPhotonCannonLocked / <br>CommanderPrestigeKaraxKhaydarinMonolithLocked / <br>System.Xml.XmlElement / System.Xml.XmlElement / System.Xml.XmlElement<br>ProtossAlarakWeaponsLevel1 / ForgeResearch,Research18 / AbilCmd<br>ProtossAlarakWeaponsLevel2 / ForgeResearch,Research19 / AbilCmd<br>ProtossAlarakWeaponsLevel3 / ForgeResearch,Research20 / AbilCmd<br>ProtossAlarakArmorLevel1 / ForgeResearch,Research21 / AbilCmd<br>ProtossAlarakArmorLevel2 / ForgeResearch,Research22 / AbilCmd<br>ProtossAlarakArmorLevel3 / ForgeResearch,Research23 / AbilCmd<br>PhotonCannonPassive / Passive<br>KhaydarinMonolithPassive / Passive<br>ResearchAlarakAttackStun / ForgeResearch,Research13 / AbilCmd<br>ResearchFenixSuitAttackDamage / ForgeResearch,Research15 / AbilCmd<br>ResearchTurretRange / Passive<br>ResearchAlarakAttackStunLocked / Passive<br>ResearchFenixSuitAttackDamageLocked / Passive<br>ResearchZeratulPhaseCannonWarp / Passive<br>ResearchKaraxTurretAttackSpeed / ForgeResearch,Research11 / AbilCmd<br>ResearchAlarakDestructionWaveDistance / ForgeResearch,Research14 / AbilCmd<br>ResearchTurretAttackSpeed / Passive<br>ResearchAlarakDestructionWaveDistanceLocked / Passive<br>ResearchFenixArbiterDetection / ForgeResearch,Research16 / AbilCmd<br>ResearchFenixArbiterDetectionLocked / Passive<br>CommanderPrestigeKaraxOptimizedAttackSpeedResearchLocked / Passive<br>ResearchStructureBarrier / ForgeResearch,Research12 / AbilCmd<br>ResearchStructureBarrierLocked / Passive<br>AStrongHeart / ForgeResearch,Research17 / AbilCmd |
| Nexus | Footprint5x5NormalCreepContour | Footprint5x5DropOffCreepNormal | NexusBuild<br>PhotonOvercharge | ChronoBoostTarget | CommanderPrestigeKaraxChronoBoostLocked / Passive |
| Pylon | Footprint2x2CreepNormalContour | Footprint2x2CreepNormal | DarkPylonMorph<br>PhotonOverchargeMorphPylon |  | System.Xml.XmlElement / System.Xml.XmlElement / System.Xml.XmlElement<br><br> |
| SoACasterKarax |  |  | SOAMapWideChrono<br>SOAOrbitalStrikeKarax<br>SOAPurifierBeam<br>SOARepairBeam<br>SOASuperChronoMapwide<br>SOAThermalLanceActivate<br>SOAThermalLanceTargetingDummy |  | CancelBuilding / BuildInProgress,Cancel / AbilCmd<br>SOAOrbitalStrikeKarax / SOAOrbitalStrikeKarax,Execute / AbilCmd<br>SOAThermalLance / SOAThermalLanceActivate,On / AbilCmd<br>CommanderPrestigeKaraxChronoWaveLocked / Passive<br>SOAMapWideChrono / SOAMapWideChrono,Execute / AbilCmd<br>SOAPurifierBeam / SOAPurifierBeam,Execute / AbilCmd<br>PurifierBeamLocked / Passive<br>SOARepairBeam / Passive<br>ReconstructionBeamLocked / Passive<br>SOAThermalLance / SOAThermalLanceTargetingDummy,Execute / AbilCmd<br>SOARepairBeam / SOARepairBeam,Execute / AbilCmd<br>CommanderPrestigeKaraxChronoFieldLocked / Passive<br>SOAChronoPassive / Passive<br>SOAChronoPassiveLocked / Passive |

## 兵种

| 单位ID | 脚印 | 部署脚印 | 技能 | 行为 | 按钮 |
| --- | --- | --- | --- | --- | --- |
| Carrier |  |  | attack<br>CarrierHangar<br>FenixClolarionCarrierMorph<br>HangarQueue5<br>move<br>stop | AllUnitBehaviorController<br>Supply |  |
| Colossus |  |  | attack<br>move<br>stop | AllUnitBehaviorController | ExtendedThermalLance / Passive |
| Immortal |  |  | FenixTaldarinImmortalMorph | AllUnitBehaviorController |  |
| KaraxChampion |  |  |  |  |  |
| KaraxMicroBotActivated |  |  |  |  |  |
| KaraxMicroBotDeactivated |  |  |  |  |  |

## 面板与技能

| 来源单位 | 类型 | Face | AbilCmd | Requirements |
| --- | --- | --- | --- | --- |
| Colossus | 被动 | ExtendedThermalLance |  | HaveKaraxExtendedThermalLance |
| Forge | 面板/技能 | ProtossAlarakWeaponsLevel1 | ForgeResearch,Research18 |  |
| Forge | 面板/技能 | ProtossAlarakWeaponsLevel2 | ForgeResearch,Research19 |  |
| Forge | 面板/技能 | ProtossAlarakWeaponsLevel3 | ForgeResearch,Research20 |  |
| Forge | 面板/技能 | ProtossAlarakArmorLevel1 | ForgeResearch,Research21 |  |
| Forge | 面板/技能 | ProtossAlarakArmorLevel2 | ForgeResearch,Research22 |  |
| Forge | 面板/技能 | ProtossAlarakArmorLevel3 | ForgeResearch,Research23 |  |
| Forge | 被动 | PhotonCannonPassive |  | HavePhotonCannon |
| Forge | 被动 | KhaydarinMonolithPassive |  | HaveKhaydarinMonolith |
| Forge | 面板/技能 | ResearchAlarakAttackStun | ForgeResearch,Research13 |  |
| Forge | 面板/技能 | ResearchFenixSuitAttackDamage | ForgeResearch,Research15 |  |
| Forge | 被动 | ResearchTurretRange |  | KaraxLevel06 |
| Forge | 被动 | ResearchAlarakAttackStunLocked |  | AlarakLevel14 |
| Forge | 被动 | ResearchFenixSuitAttackDamageLocked |  | FenixLevel06 |
| Forge | 被动 | ResearchZeratulPhaseCannonWarp |  | HaveZeratulPhaseCannonWarp |
| Forge | 面板/技能 | ResearchKaraxTurretAttackSpeed | ForgeResearch,Research11 |  |
| Forge | 面板/技能 | ResearchAlarakDestructionWaveDistance | ForgeResearch,Research14 |  |
| Forge | 被动 | ResearchTurretAttackSpeed |  | KaraxLevel06 |
| Forge | 被动 | ResearchAlarakDestructionWaveDistanceLocked |  | AlarakLevel14 |
| Forge | 面板/技能 | ResearchFenixArbiterDetection | ForgeResearch,Research16 |  |
| Forge | 被动 | ResearchFenixArbiterDetectionLocked |  | FenixLevel06 |
| Forge | 被动 | CommanderPrestigeKaraxOptimizedAttackSpeedResearchLocked |  | CommanderPrestigeKaraxArmy |
| Forge | 面板/技能 | ResearchStructureBarrier | ForgeResearch,Research12 |  |
| Forge | 被动 | ResearchStructureBarrierLocked |  | KaraxLevel06 |
| Forge | 面板/技能 | AStrongHeart | ForgeResearch,Research17 |  |
| Nexus | 被动 | CommanderPrestigeKaraxChronoBoostLocked |  | CommanderPrestigeKaraxTopBar |
| SoACasterKarax | 面板/技能 | CancelBuilding | BuildInProgress,Cancel |  |
| SoACasterKarax | 面板/技能 | SOAOrbitalStrikeKarax | SOAOrbitalStrikeKarax,Execute |  |
| SoACasterKarax | 面板/技能 | SOAThermalLance | SOAThermalLanceActivate,On |  |
| SoACasterKarax | 被动 | CommanderPrestigeKaraxChronoWaveLocked |  | CommanderPrestigeKaraxTopBar |
| SoACasterKarax | 面板/技能 | SOAMapWideChrono | SOAMapWideChrono,Execute |  |
| SoACasterKarax | 面板/技能 | SOAPurifierBeam | SOAPurifierBeam,Execute |  |
| SoACasterKarax | 被动 | PurifierBeamLocked |  | KaraxLevel10 |
| SoACasterKarax | 被动 | SOARepairBeam |  | HaveSOARepairBeam |
| SoACasterKarax | 被动 | ReconstructionBeamLocked |  | KaraxLevel07 |
| SoACasterKarax | 面板/技能 | SOAThermalLance | SOAThermalLanceTargetingDummy,Execute |  |
| SoACasterKarax | 面板/技能 | SOARepairBeam | SOARepairBeam,Execute |  |
| SoACasterKarax | 被动 | CommanderPrestigeKaraxChronoFieldLocked |  | CommanderPrestigeKaraxTopBar |
| SoACasterKarax | 被动 | SOAChronoPassive |  | HaveKaraxSOAChronoPassive |
| SoACasterKarax | 被动 | SOAChronoPassiveLocked |  | KaraxLevel02 |

## 原始ID列表

- AbilData.xml：
  - AlarakACDeadlyCharge
  - AlarakStructureOvercharge
  - ApocaliskBurrowCharge
  - Banshee_BlackOpsAirstrike
  - BansheeAirstrike
  - BrokenSolarForge
  - CarrierAiurHanger
  - CarrierRepairDroneHanger
  - Charge
  - ChargeBuster
  - ChargedBuster
  - DarkPylonMorph
  - DarkPylonRecall
  - DrakkenLaserDrillPulseCannonIssueOrder
  - EnergizerReclamation
  - FenixClolarionCarrierHangar
  - FenixKaldalisZealotCharge
  - FenixThunderousChargeCoop
  - FenixWarbringerColossusPowerShot
  - ForgeResearch
  - GravitonBeam
  - HHD8Charge
  - HHD8SingleCharge
  - MutatorAmonPhaseCannon
  - MutatorAmonReclamation
  - NexusBuild
  - NovaPsiStrike
  - PhotonOverchargeMorphPylonBack
  - PsiStrikeWalk
  - RepairSolarForge
  - ShieldBatteryStructureBarrier
  - SOADarkPylon
  - SOAOrbitalStrikeKarax
  - SOAPylonPower
  - SolarForgeResearch
  - UltraliskBurrowCharge
  - UpgradeToOrbital
- ButtonData.xml：
  - AlarakColossusChargedBlastChargeTime
  - AlarakDeadlyCharge
  - AlarakLightningStrikes
  - AlarakResearchStalkerPhasingArmor
  - AlarakStalkerPhasingArmor
  - AlarakStructureOvercharge
  - ApocaliskBurrowCharge
  - Banshee_BlackOpsAirstrike
  - BansheeAirstrike
  - BrokenSolarForge
  - BuildKelMorianRocketTurret
  - BuildVespeneGasDrill
  - Carrier
  - CarrierTaldarimMothership
  - Charge
  - ColossusTaldarim
  - CommanderKaraxForgeUpgradesPack
  - CommanderKaraxOrbitalAssault
  - CommanderKaraxPurifierBeamUpgrade
  - CommanderKaraxSolarForgeUpgradesPack1
  - CommanderKaraxSolarForgeUpgradesPack2
  - CommanderKaraxUnitSpawnBarrier
  - CommanderKaraxUnlockPurifierBeam
  - CommanderKaraxUnlockSOAPassiveOrbitalStrike
  - CommanderPrestigeKaraxChronoWaveLocked
  - CommanderPrestigeKaraxPhotonCannonBuildLocked
  - CommanderPrestigeKaraxPhotonCannonLocked
  - DarkPylonRecall
  - DrakkenLaserDrillPulseCannonIO
  - EnergizerReclamation
  - EvolveBurrowChargeLocked
  - ExtendedThermalLance
  - FenixClolarionCarrier
  - FenixClolarionCarrierDownloadUpgrade
  - FenixImmortalDetonationShot
  - FenixImmortalResearchDetonationShot
  - FenixKaldalisZealotCharge
  - FenixTaldarinImmortal
  - FenixTaldarinImmortalDownloadUpgrade
  - FenixThunderousChargeCoop
  - FenixWarbringerColossus
  - FenixWarbringerColossusDownloadUpgrade
  - FenixWarbringerColossusPowerShot
  - GravitonBeam
  - HaveBarrier
  - ImmortalBarrierBase
  - ImmortalTaldarim
  - KaraxCarrierInterceptorLaunchSpeedPassive
  - KelMorianRocketTurretPassive
  - MutatorAmonPhaseCannon
  - MutatorAmonReclamation
  - OrbitalDropPodsPassive
  - PhoenixAiurGravitonBeam
  - PsiStrike
  - ReclamationLocked
  - RepairSolarForge
  - Research330mmBarrageCannon
  - ResearchAlarakColossusChargedBlastAirAttack
  - ResearchAlarakColossusChargedBlastChargeTime
  - ResearchBanshee_BlackOpsAirstrike
  - ResearchBarrier
  - ResearchBlinkCharges
  - ResearchCarrierRepairDrones
  - ResearchChronoBeam
  - ResearchDoubleGravitonBeam
  - ResearchDoubleGravitonBeamLocked
  - ResearchEnergizerReclamation
  - ResearchFenixChampionCarrierBombers
  - ResearchFenixChampionCarrierBombersLocked
  - ResearchFenixWarbringerColossusPowerShot
  - ResearchFireBeam
  - ResearchHHTacticalJumpCharges
  - ResearchImprovedScatterCannon
  - ResearchRepairDronesLocked
  - ResearchShadowCannon
  - ResearchShadowCharge
  - ResearchSOAOrbitalStrikeUpgrade
  - ResearchSOASolarLanceUpgrade
  - ResearchStructureBarrier
  - ResearchStructureBarrierLocked
  - ResearchWarpGateCharges
  - ShieldBatteryRecharge
  - ShieldBatteryStructureBarrier
  - SOADarkPylon
  - SOAOrbitalStrike
  - SOAOrbitalStrikeKarax
  - SOAOrbitalStrikeUpgradePassive
  - SOAPassiveOrbitalStrike
  - SOAPylonPower
  - SolarForge
  - ZealotPurifierResearchReconstruction
- BehaviorData.xml：
  - AlarakLightningStrikes
  - AlarakStalkerPhasingArmor
  - AlarakStalkerPhasingArmorBuff
  - AlarakStructureOvercharge
  - AlarakStructureOverchargeShield
  - BansheeAirstrikeTimedLife
  - CarryHarvestableVespeneGeyserGas
  - CarryHarvestableVespeneGeyserGasProtoss
  - CarryHarvestableVespeneGeyserGasZerg
  - ChargeBuster
  - ChargeBusterExpiring
  - FenixClolarionChargeBeamPhase2
  - FenixClolarionChargeBeamPhase3
  - FenixThunderousChargeCoopCharging
  - KaraxUnitSpawnBarrier
  - KaraxUnitSpawnBarrierDisabled
  - KaraxVoidCoopSOAEnergyRecharge
  - MutatorAmonPhaseCannonInitialStun
  - MutatorAmonPhaseCannonTimedLife
  - MutatorAmonReclamation
  - MutatorBarrier
  - OrbitalStrikeSlow
  - OrbitalStrikeStun
  - Reclamation
  - SentryReclamation
  - ShieldBatteryStructureBarrier
  - SOAPassiveOrbitalStrike
  - SOASolarLanceFireBeam
  - SolarForgeBeam
  - SolarForgePreventDestroy
  - SolarForgeRepair
  - VorazunCloakDamageBoostPermanentUltraliskBurrowCharge
