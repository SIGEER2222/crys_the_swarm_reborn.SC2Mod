# 阿塔尼斯 / Artanis Mod 原始来源（中文整理）

- 模块：`XMArtanis.SC2Mod`
- 源目录：`C:\Users\22448\Downloads\重生虫心0.71汉化版（新）\reborn_workrepo\合作指挥官版起义狂潮\Mods\XM\XMArtanis.SC2Mod`
- 说明：直接从 UnitData.xml / AbilData.xml / ButtonData.xml / BehaviorData.xml 抽取，不引用旧汇总文档。

## 建筑

| 单位ID | 脚印 | 部署脚印 | 技能 | 行为 | 按钮 |
| --- | --- | --- | --- | --- | --- |
| Assimilator |  |  |  |  |  |
| Gateway | Footprint3x3CreepNormalContour | Footprint3x3CreepNormal | GatewayTrain<br>que5notPassive<br>Rally<br>UpgradeToWarpGate | ChronoBoostTarget |  / que5notPassive,CancelLast / <br>Zealot / GatewayTrain,Train1 / AbilCmd<br>WarpInSupplicant / GatewayTrain,Train11 / AbilCmd<br>Stalker / GatewayTrain,Train2 / AbilCmd<br>WarpinAscendentLocked / Passive<br>Sentry / GatewayTrain,Train6 / AbilCmd<br>Monitor / GatewayTrain,Train10 / AbilCmd<br>SentryFenix / GatewayTrain,Train15 / AbilCmd<br>DarkArchon / GatewayTrain,Train9 / AbilCmd<br>WarpInDarkArchonLocked / Passive<br>AlarakMasteryUnitAttackSpeed / Passive |
| Nexus | Footprint5x5NormalCreepContour | Footprint5x5DropOffCreepNormal | NexusBuild<br>PhotonOvercharge | ChronoBoostTarget | CommanderPrestigeKaraxChronoBoostLocked / Passive |
| Pylon | Footprint2x2CreepNormalContour | Footprint2x2CreepNormal | DarkPylonMorph<br>PhotonOverchargeMorphPylon |  | System.Xml.XmlElement / System.Xml.XmlElement / System.Xml.XmlElement<br><br> |
| SoACasterArtanis |  |  | CommanderPrestigeArtanisOrbitalStrikeShieldOverchargeTargeted<br>SOAOrbitalStrikeActivate<br>SOAOrbitalStrikeExecute<br>SOAOrbitalStrikeTargetingDummy<br>SOAPylonPower<br>SOAStrafeAttack<br>SOAStrafeAttackActivate<br>SOAStrafeAttackExecute<br>SoASuperShield |  | CancelBuilding / BuildInProgress,Cancel / AbilCmd<br>SOAPylonPower / SOAPylonPower,Execute / AbilCmd<br>SOAOrbitalStrike / SOAOrbitalStrikeActivate,On / AbilCmd<br>SOASuperShield / CommanderPrestigeArtanisOrbitalStrikeShieldOverchargeTargeted,Execute / AbilCmd<br>SOASuperShield / SoASuperShield,Execute / AbilCmd<br>SOAStrafeAttack / SOAStrafeAttack,Execute / AbilCmd<br>SOAStrafeAttackLocked / Passive<br>CommanderPrestigeArtanisGuardianShellLocked / Passive<br>SOAHeroicShield / Passive<br>SOAHeroicShieldLocked / Passive<br>SOAWarpTech / Passive<br>WarpHarmonizationLocked / Passive<br>SOAOrbitalStrike / SOAOrbitalStrikeTargetingDummy,Execute / AbilCmd<br>SOAOrbitalStrike / SOAOrbitalStrikeExecute,Execute / AbilCmd |

## 兵种

| 单位ID | 脚印 | 部署脚印 | 技能 | 行为 | 按钮 |
| --- | --- | --- | --- | --- | --- |
| Archon |  |  | attack<br>FeedbackArchon<br>move<br>ProgressRally<br>PsiStormArchon<br>stop | AllUnitBehaviorController<br>ArtanisHighArchon | Feedback / FeedbackArchon,Execute / AbilCmd<br>FeedbackLocked / Passive<br>PsiStorm / PsiStormArchon,Execute / AbilCmd<br>PsionicStormLocked / Passive<br>HighTemplarEnergyUpgrade / Passive<br>HealingPsionicStorm / Passive |
| Artanis |  |  |  |  |  |
| ArtanisAreaStunAirPlaceholder |  |  |  | AbilityTargetExclusionBehavior |  |
| ArtanisIonCannonsWeapon |  |  |  |  |  |
| ArtanisVoid |  |  |  |  |  |
| ArtanisVoidAiur6 |  |  |  |  |  |
| CommanderPrestigeArtanisOrbitalStrikesArchon |  |  | attack<br>move<br>stop | AllUnitBehaviorController<br>CommanderPrestigeArtanisOrbitalStrikesArchon | Move / move,Move / AbilCmd<br>Stop / stop,Stop / AbilCmd<br>MoveHoldPosition / move,HoldPos / AbilCmd<br>Attack / attack,Execute / AbilCmd<br>MovePatrol / move,Patrol / AbilCmd<br>Rally / ProgressRally,Rally1 / AbilCmd<br>CommanderPrestigeArtanisOrbitalStrikesPeriodicDamage / Passive |
| CommanderPrestigeArtanisOrbitalStrikesArchonEnergy |  |  |  | CommanderPrestigeArtanisOrbitalStrikesArchonEnergy |  |
| CommanderPrestigeArtanisOrbitalStrikesArchonPrecursor |  |  |  |  |  |
| Dragoon |  |  |  | AllUnitBehaviorController | <br>VoidStalkerDragoonRange / Passive |
| HighTemplar |  |  | ArchonWarp<br>Feedback<br>move<br>ProgressRally<br>PsiStorm<br>stop | AllUnitBehaviorController<br>DamageDisablesAttackHighTemplar | HighTemplarEnergyUpgrade / Passive<br>HealingPsionicStorm / Passive |
| Immortal |  |  | FenixTaldarinImmortalMorph | AllUnitBehaviorController |  |
| Reaver |  |  |  | AllUnitBehaviorController | PassiveReaverIncreasedScarabSplashRadius / Passive<br>HaveReaverIncreasedScarabCount / Passive |
| SMX2ProtossArtanis |  |  |  |  |  |
| Tempest |  |  | LightningBomb | AllUnitBehaviorController | LightningBomb / LightningBomb,Execute / AbilCmd<br>DisintegrationLocked / Passive |
| Zealot |  |  | attack<br>Charge<br>move<br>ProgressRally<br>stop | AllUnitBehaviorController | WhirlwindLocked / Passive |

## 面板与技能

| 来源单位 | 类型 | Face | AbilCmd | Requirements |
| --- | --- | --- | --- | --- |
| Archon | 面板/技能 | Feedback | FeedbackArchon,Execute |  |
| Archon | 被动 | FeedbackLocked |  | ArtanisLevel07 |
| Archon | 面板/技能 | PsiStorm | PsiStormArchon,Execute |  |
| Archon | 被动 | PsionicStormLocked |  | ArtanisLevel07 |
| Archon | 被动 | HighTemplarEnergyUpgrade |  | HaveHighTemplarEnergyUpgradeHighArchon |
| Archon | 被动 | HealingPsionicStorm |  | HaveHealingPsionicStormHighArchon |
| CommanderPrestigeArtanisOrbitalStrikesArchon | 面板/技能 | Move | move,Move |  |
| CommanderPrestigeArtanisOrbitalStrikesArchon | 面板/技能 | Stop | stop,Stop |  |
| CommanderPrestigeArtanisOrbitalStrikesArchon | 面板/技能 | MoveHoldPosition | move,HoldPos |  |
| CommanderPrestigeArtanisOrbitalStrikesArchon | 面板/技能 | Attack | attack,Execute |  |
| CommanderPrestigeArtanisOrbitalStrikesArchon | 面板/技能 | MovePatrol | move,Patrol |  |
| CommanderPrestigeArtanisOrbitalStrikesArchon | 面板/技能 | Rally | ProgressRally,Rally1 |  |
| CommanderPrestigeArtanisOrbitalStrikesArchon | 被动 | CommanderPrestigeArtanisOrbitalStrikesPeriodicDamage |  |  |
| Dragoon | 被动 | VoidStalkerDragoonRange |  | HaveSingularityCharge |
| Gateway | 面板/技能 | Zealot | GatewayTrain,Train1 |  |
| Gateway | 面板/技能 | WarpInSupplicant | GatewayTrain,Train11 |  |
| Gateway | 面板/技能 | Stalker | GatewayTrain,Train2 |  |
| Gateway | 被动 | WarpinAscendentLocked |  | AlarakLevel08 |
| Gateway | 面板/技能 | Sentry | GatewayTrain,Train6 |  |
| Gateway | 面板/技能 | Monitor | GatewayTrain,Train10 |  |
| Gateway | 面板/技能 | SentryFenix | GatewayTrain,Train15 |  |
| Gateway | 面板/技能 | DarkArchon | GatewayTrain,Train9 |  |
| Gateway | 被动 | WarpInDarkArchonLocked |  | VorazunLevel05 |
| Gateway | 被动 | AlarakMasteryUnitAttackSpeed |  | HaveMasteryAlarakUnitAttackSpeed |
| HighTemplar | 被动 | HighTemplarEnergyUpgrade |  | HaveHighTemplarEnergyUpgrade |
| HighTemplar | 被动 | HealingPsionicStorm |  | HaveHealingPsionicStorm |
| Nexus | 被动 | CommanderPrestigeKaraxChronoBoostLocked |  | CommanderPrestigeKaraxTopBar |
| Reaver | 被动 | PassiveReaverIncreasedScarabSplashRadius |  | HaveReaverIncreasedScarabSplashRadius |
| Reaver | 被动 | HaveReaverIncreasedScarabCount |  | HaveReaverIncreasedScarabCount |
| SoACasterArtanis | 面板/技能 | CancelBuilding | BuildInProgress,Cancel |  |
| SoACasterArtanis | 面板/技能 | SOAPylonPower | SOAPylonPower,Execute |  |
| SoACasterArtanis | 面板/技能 | SOAOrbitalStrike | SOAOrbitalStrikeActivate,On |  |
| SoACasterArtanis | 面板/技能 | SOASuperShield | CommanderPrestigeArtanisOrbitalStrikeShieldOverchargeTargeted,Execute |  |
| SoACasterArtanis | 面板/技能 | SOASuperShield | SoASuperShield,Execute |  |
| SoACasterArtanis | 面板/技能 | SOAStrafeAttack | SOAStrafeAttack,Execute |  |
| SoACasterArtanis | 被动 | SOAStrafeAttackLocked |  | ArtanisLevel10 |
| SoACasterArtanis | 被动 | CommanderPrestigeArtanisGuardianShellLocked |  | CommanderPrestigeArtanisOrbitalStrikes |
| SoACasterArtanis | 被动 | SOAHeroicShield |  | HaveSOAHeroicShield |
| SoACasterArtanis | 被动 | SOAHeroicShieldLocked |  | ArtanisLevel02 |
| SoACasterArtanis | 被动 | SOAWarpTech |  | HaveSOAWarpTech |
| SoACasterArtanis | 被动 | WarpHarmonizationLocked |  | ArtanisLevel08 |
| SoACasterArtanis | 面板/技能 | SOAOrbitalStrike | SOAOrbitalStrikeTargetingDummy,Execute |  |
| SoACasterArtanis | 面板/技能 | SOAOrbitalStrike | SOAOrbitalStrikeExecute,Execute |  |
| Tempest | 面板/技能 | LightningBomb | LightningBomb,Execute |  |
| Tempest | 被动 | DisintegrationLocked |  | ArtanisLevel12 |
| Zealot | 被动 | WhirlwindLocked |  | ArtanisLevel04 |

## 原始ID列表

- AbilData.xml：
  - AlarakACDeadlyCharge
  - AlarakEmpower
  - AlarakStructureOvercharge
  - AlarakZealotFrenziedOverload
  - ApocaliskBurrowCharge
  - ArchonWarp
  - Charge
  - ChargeBuster
  - ChargedBuster
  - CommanderPrestigeArtanisOrbitalStrikeShieldOverchargeTargeted
  - CyberneticsCoreResearch
  - DarkArchonMerge
  - DarkArchonMindControl
  - DarkPylonMorph
  - DarkPylonRecall
  - DuskWingBansheeCloakingField
  - FenixArbiterStasisField
  - FenixKaldalisZealotCharge
  - FenixSoAWhirlwind
  - FenixThunderousChargeCoop
  - FenixWarbringerColossusPowerShot
  - FusionCoreResearch
  - GatewayTrain
  - GravitonBeam
  - HHD8Charge
  - HHD8SingleCharge
  - InfestedBansheeCloakingField
  - MorphBackToGateway
  - NexusBuild
  - PhotonOverchargeMorphDarkPylonBack
  - PhotonOverchargeMorphPylonBack
  - PsiStormArchon
  - ShieldBatteryStructureBarrier
  - SOADarkPylon
  - SOAMapWideChrono
  - SOAOrbitalStrikeKarax
  - SOAPylonPower
  - UltraliskBurrowCharge
  - VoidHighTemplarMindBlast
  - VoidHighTemplarPsiOrb
  - VoidZealotWhirlwind
- ButtonData.xml：
  - AlarakColossusChargedBlastChargeTime
  - AlarakDeadlyCharge
  - AlarakEmpower
  - AlarakStructureOvercharge
  - AlarakZealotFrenziedOverload
  - ApocaliskBurrowCharge
  - BuildReaverLocked
  - Charge
  - CloakingField
  - CommanderArtanisHighArchon
  - CommanderArtanisImprovedSolarBombardment
  - CommanderArtanisSpearofAdunShieldOvercharge
  - CommanderArtanisSpearofAdunSolarBombardment
  - CommanderArtanisUnlockReaver
  - CommanderArtanisUnlockTempest
  - CommanderArtanisWarpgateCharges
  - CommanderPrestigeArtanisOrbitalStrikesPeriodicDamage
  - CommanderVorazunDarkArchonPassiveLocked
  - DarkArchon
  - DarkPylonRecall
  - EvolveBurrowChargeLocked
  - FenixArbiterStasisField
  - FenixDragoonChargeBuster
  - FenixDragoonChargedBuster
  - FenixImmortalDetonationShot
  - FenixImmortalResearchDetonationShot
  - FenixKaldalisZealot
  - FenixKaldalisZealotCharge
  - FenixKaldalisZealotDownloadUpgrade
  - FenixTaldarinImmortal
  - FenixTaldarinImmortalDownloadUpgrade
  - FenixThunderousChargeCoop
  - FenixWarbringerColossusPowerShot
  - Gateway
  - GravitonBeam
  - HaveReaverIncreasedScarabCount
  - HighTemplarEnergyUpgrade
  - HighTemplarTaldarim
  - ImmortalBarrierBase
  - ImmortalTaldarim
  - PassiveReaverIncreasedScarabSplashRadius
  - PhoenixAiurGravitonBeam
  - ReaverScarabs
  - ResearchAlarakColossusChargedBlastAirAttack
  - ResearchAlarakColossusChargedBlastChargeTime
  - ResearchAlarakZealotFrenziedOverload
  - ResearchBarrier
  - ResearchBlinkCharges
  - ResearchChronoBeam
  - ResearchDarkArchonFullStartingEnergy
  - ResearchDarkArchonFullStartingEnergyLocked
  - ResearchDarkArchonMindControl
  - ResearchDisintegrationLocked
  - ResearchDoubleGravitonBeam
  - ResearchDoubleGravitonBeamLocked
  - ResearchDragoonChassis
  - ResearchDragoonRange
  - ResearchFenixKaldalisZealotCleave
  - ResearchFenixWarbringerColossusPowerShot
  - ResearchHHTacticalJumpCharges
  - ResearchReaverIncreasedScarabCount
  - ResearchReaverIncreasedScarabSplashRadius
  - ResearchShadowCharge
  - ResearchStructureBarrier
  - ResearchStructureBarrierLocked
  - ResearchTempestDisintegration
  - ResearchTriLithiumPowerCells
  - ResearchWarpGateCharges
  - ResearchWhirlwind
  - ShieldBatteryStructureBarrier
  - SOADarkPylon
  - SOAMapWideChrono
  - SOAOrbitalStrike
  - SOAOrbitalStrikeKarax
  - SOAOrbitalStrikeUpgradePassive
  - SOAPylonPower
  - Tempest
  - TempestPassive
  - VoidStalkerDragoonRange
  - VoidZealotWhirlwind
  - ZealotPurifierResearchReconstruction
- BehaviorData.xml：
  - AlarakEmpowerCaster
  - AlarakStructureOvercharge
  - AlarakStructureOverchargeShield
  - AlarakZealotFrenziedOverload
  - ArtanisHighArchon
  - ChargeBuster
  - ChargeBusterExpiring
  - ChronoBoostBlackOpsFactory
  - ChronoBoostBlackOpsStarport
  - ChronoBoostTarget
  - ChronoFieldBlackOpsBarracks
  - ChronoFieldBlackOpsFactory
  - ChronoFieldBlackOpsStarport
  - ChronoFieldHHStarport
  - CommanderPrestigeArtanisOrbitalStrikesArchon
  - CommanderPrestigeArtanisOrbitalStrikesArchonEnergy
  - CommanderPrestigeArtanisPowerField
  - DarkArchonMindControl
  - FenixArbiterStasisField
  - FenixClolarionChargeBeamActive
  - FenixClolarionChargeBeamCounter
  - FenixClolarionChargeBeamPhase2
  - FenixClolarionChargeBeamPhase3
  - FenixSOAWhirlwind
  - FenixThunderousChargeCoopCharging
  - KaraxUnitSpawnBarrier
  - MasteryArtanisSoAPowerFieldHaste
  - MasteryArtanisSoAPowerFieldHaste_Target
  - OrbitalStrikeSlow
  - OrbitalStrikeStun
  - PowerUserWarpable
  - ShieldBatteryStructureBarrier
  - SOAMapWideChrono
  - SOAMapWideChronoPassiveTarget
  - SOAPylonPowerAlly
  - SOAPylonPowerCoopTracker
  - VorazunCloakDamageBoostPermanentUltraliskBurrowCharge
