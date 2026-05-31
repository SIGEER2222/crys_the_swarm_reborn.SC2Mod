# 菲尼克斯 / Fenix Mod 原始来源（中文整理）

- 模块：`XMFenix.SC2Mod`
- 源目录：`C:\Users\22448\Downloads\重生虫心0.71汉化版（新）\reborn_workrepo\合作指挥官版起义狂潮\Mods\XM\XMFenix.SC2Mod`
- 说明：直接从 UnitData.xml / AbilData.xml / ButtonData.xml / BehaviorData.xml 抽取，不引用旧汇总文档。

## 建筑

| 单位ID | 脚印 | 部署脚印 | 技能 | 行为 | 按钮 |
| --- | --- | --- | --- | --- | --- |
| Assimilator |  |  |  |  |  |
| FenixAltarOfPsiStorms | Footprint4x4ContourCreepNormalContour | Footprint4x4CreepNormal | BrokenFenixAltarOfPsiStorms<br>BuildInProgress<br>FenixAltarOfPsiStormsResearch<br>que5 | ChronoBoostTarget<br>FenixAltarOfPsiStormsPreventDestroy | FenixKaldalisZealotDownloadUpgrade / FenixAltarOfPsiStormsResearch,Research1 / AbilCmd<br>System.Xml.XmlElement / System.Xml.XmlElement<br>FenixKaldalisZealotDownloadActive / Passive<br>FenixTalisAdeptDownloadUpgrade / FenixAltarOfPsiStormsResearch,Research2 / AbilCmd<br>System.Xml.XmlElement / System.Xml.XmlElement<br>FenixTalisAdeptDownloadActive / Passive<br>FenixMojoScoutDownloadUpgrade / FenixAltarOfPsiStormsResearch,Research3 / AbilCmd<br>System.Xml.XmlElement / System.Xml.XmlElement<br>FenixMojoScoutDownloadActive / Passive<br>FenixMojoScoutDownloadUpgradeLocked / Passive<br>FenixTaldarinImmortalDownloadUpgrade / FenixAltarOfPsiStormsResearch,Research4 / AbilCmd<br>System.Xml.XmlElement / System.Xml.XmlElement<br>FenixTaldarinImmortalDownloadActive / Passive<br>FenixTaldarinImmortalDownloadUpgradeLocked / Passive<br>FenixWarbringerColossusDownloadUpgrade / FenixAltarOfPsiStormsResearch,Research5 / AbilCmd<br>System.Xml.XmlElement / System.Xml.XmlElement<br>FenixWarbringerColossusDownloadActive / Passive<br>FenixWarbringerColossusDownloadUpgradeLocked / Passive<br>FenixClolarionCarrierDownloadUpgrade / FenixAltarOfPsiStormsResearch,Research6 / AbilCmd<br>System.Xml.XmlElement / System.Xml.XmlElement<br>FenixClolarionCarrierDownloadActive / Passive<br>FenixClolarionCarrierDownloadUpgradeLocked / Passive<br>Cancel / que5,CancelLast / AbilCmd<br>BrokenFenixAltarOfPsiStorms / BrokenFenixAltarOfPsiStorms,Execute / AbilCmd |
| Nexus | Footprint5x5NormalCreepContour | Footprint5x5DropOffCreepNormal | NexusBuild<br>PhotonOvercharge | ChronoBoostTarget | CommanderPrestigeKaraxChronoBoostLocked / Passive |
| Pylon | Footprint2x2CreepNormalContour | Footprint2x2CreepNormal | DarkPylonMorph<br>PhotonOverchargeMorphPylon |  | System.Xml.XmlElement / System.Xml.XmlElement / System.Xml.XmlElement<br><br> |
| SoACasterFenix |  |  | SOASummonFenix<br>SOASummonFenixArbiter<br>SOASummonFenixDragoon |  | CancelBuilding / BuildInProgress,Cancel / AbilCmd<br>SOASummonFenixPassive / Passive<br>SOASummonFenix / SOASummonFenix,Execute / AbilCmd<br>SOASummonFenixDragoonPassive / Passive<br>SOASummonFenixDragoon / SOASummonFenixDragoon,Execute / AbilCmd<br>SOASummonFenixArbiterPassive / Passive<br>SOASummonFenixArbiter / SOASummonFenixArbiter,Execute / AbilCmd<br>SOASummonFenixArbiterLocked / Passive |

## 兵种

| 单位ID | 脚印 | 部署脚印 | 技能 | 行为 | 按钮 |
| --- | --- | --- | --- | --- | --- |
| Adept |  |  | AdeptPhaseShiftCancel<br>attack<br>FenixAdeptShadeCooldown<br>FenixTalisAdeptMorph<br>move<br>ProgressRally<br>stop | AllUnitBehaviorController<br>FenixAdeptShadeCooldown | System.Xml.XmlElement / System.Xml.XmlElement |
| AdeptFenix |  |  | attack<br>FenixAdeptShadeCooldown<br>FenixTalisAdeptMorph<br>move<br>ProgressRally<br>stop<br>Warpable | AllUnitBehaviorController<br>FenixAdeptShadeCooldown<br>FenixSuppressAvengingProtocol | Move / move,Move / AbilCmd<br>Stop / stop,Stop / AbilCmd<br>MoveHoldPosition / move,HoldPos / AbilCmd<br>Attack / attack,Execute / AbilCmd<br>MovePatrol / move,Patrol / AbilCmd<br>Rally / ProgressRally,Rally1 / AbilCmd<br>Cancel / AdeptPhaseShiftCancel,Execute / AbilCmd<br>System.Xml.XmlElement / System.Xml.XmlElement |
| Carrier |  |  | attack<br>CarrierHangar<br>FenixClolarionCarrierMorph<br>HangarQueue5<br>move<br>stop | AllUnitBehaviorController<br>Supply |  |
| Colossus |  |  |  | AllUnitBehaviorController | ExtendedThermalLance / Passive |
| Disruptor |  |  | attack<br>FenixPurificationNova | AllUnitBehaviorController<br>DisruptorPermanentCloak<br>VorazunCloakedShieldRegenPermanent | FenixPurificationNova / FenixPurificationNova,Execute / <br>PurificationNovaTargeted / PurificationNovaTargeted,Execute / AbilCmd<br>DisruptorCloakPassive / Passive<br>DisruptorSecondExplosion / Passive |
| FenixAdeptShade |  |  | attack<br>move<br>stop | NoBiomassDrop | Move / move,Move / AbilCmd<br>Stop / stop,Stop / AbilCmd<br>MoveHoldPosition / move,HoldPos / AbilCmd<br>MovePatrol / move,Patrol / AbilCmd<br>Attack / attack,Execute / AbilCmd<br>Rally / ProgressRally,Rally1 / AbilCmd<br>Cancel / AdeptShadePhaseShiftCancel,Execute / AbilCmd |
| FenixAdeptShadeWeapon |  |  |  |  |  |
| FenixAltarOfPsiStormsBroken | Footprint4x4ContourCreepNormalContour | Footprint4x4CreepNormal | BuildInProgress<br>RepairFenixAltarOfPsiStorms | FenixAltarOfPsiStormsPreventDestroy<br>Unrepairable |  |
| FenixAltarOfPsiStormsBrokenStage2 | Footprint4x4ContourCreepNormalContour | Footprint4x4CreepNormal | BuildInProgress<br>RepairFenixAltarOfPsiStormsStage2 | ChronoBoostTarget<br>FenixAltarOfPsiStormsPreventDestroy |  |
| FenixArbiter |  |  | ArbiterMPRecall<br>attack<br>FenixArbiterCloakingField<br>FenixArbiterStasisField<br>move<br>stop<br>Warpable | AllUnitBehaviorController<br>FenixArbiterDetector<br>SuppressEnergyRegen | Move / move,Move / AbilCmd<br>Stop / stop,Stop / AbilCmd<br>MoveHoldPosition / move,HoldPos / AbilCmd<br>Attack / attack,Execute / AbilCmd<br>MovePatrol / move,Patrol / AbilCmd<br>FenixArbiterStasisField / FenixArbiterStasisField,Execute / AbilCmd<br>FenixArbiterCloakField / FenixArbiterCloakingField,On / AbilCmd<br>FenixArbiterCloakFieldOff / FenixArbiterCloakingField,Off / AbilCmd<br>ArbiterMPRecall / ArbiterMPRecall,Execute / AbilCmd<br>Detector / Passive |
| FenixArbiterWeaponMissile |  |  |  |  |  |
| FenixChampion |  |  |  |  |  |
| FenixChampionPlaceholder |  |  |  | AbilityTargetExclusionBehavior |  |
| FenixClolarionBomber |  |  | attack<br>move<br>stop | ReleaseBombersWanderDelay<br>TriggerInheritsParentBuffs | Move / move,Move / AbilCmd<br>Stop / stop,Stop / AbilCmd<br>MoveHoldPosition / move,HoldPos / AbilCmd<br>Attack / attack,Execute / AbilCmd<br>MovePatrol / move,Patrol / AbilCmd |
| FenixClolarionBomberStructureWeapon |  |  |  |  |  |
| FenixClolarionBomberWeapon |  |  |  |  |  |
| FenixClolarionCarrier |  |  | attack<br>FenixClolarionCarrierBomberDummy<br>FenixClolarionCarrierBomberHangar<br>FenixClolarionCarrierHangar<br>FenixClolarionHangarQueue5<br>move<br>stop<br>Warpable | AllUnitBehaviorController | Move / move,Move / AbilCmd<br>Stop / stop,Stop / AbilCmd<br>MoveHoldPosition / move,HoldPos / AbilCmd<br>Attack / attack,Execute / AbilCmd<br>MovePatrol / move,Patrol / AbilCmd<br>FenixClolarionInterceptor / FenixClolarionCarrierHangar,Ammo1 / AbilCmd<br>FenixChampionCarrierBombersLocked / Passive<br>FenixClolarionBomberDummy / FenixClolarionCarrierBomberDummy,Ammo1 / AbilCmd<br>FenixClolarionBomber / FenixClolarionCarrierBomberHangar,Ammo1 / AbilCmd<br>Cancel / FenixClolarionHangarQueue5,CancelLast / AbilCmd<br>FenixClolarionSolarBeam / Passive |
| FenixClolarionInterceptor |  |  | attack<br>move<br>stop | TriggerInheritsParentBuffs | Move / move,Move / AbilCmd<br>Stop / stop,Stop / AbilCmd<br>MoveHoldPosition / move,HoldPos / AbilCmd<br>Attack / attack,Execute / AbilCmd<br>MovePatrol / move,Patrol / AbilCmd |
| FenixCoop |  |  | attack<br>FenixSoAWhirlwind<br>FenixThunderousChargeCoop<br>move<br>ProgressRally<br>stop<br>VoidShieldCapacitor<br>Warpable | AllUnitBehaviorController<br>SuppressEnergyRegen | Move / move,Move / AbilCmd<br>Stop / stop,Stop / AbilCmd<br>MoveHoldPosition / move,HoldPos / AbilCmd<br>Attack / attack,Execute / AbilCmd<br>MovePatrol / move,Patrol / AbilCmd<br>Rally / ProgressRally,Rally1 / AbilCmd<br>FenixThunderousChargeCoop / FenixThunderousChargeCoop,Execute / AbilCmd<br>FenixWhirlwind / FenixSoAWhirlwind,Execute / AbilCmd<br>VoidShieldCapacitor / VoidShieldCapacitor,Execute / AbilCmd |
| FenixDragoon |  |  | attack<br>ChargedBuster<br>FenixDragoonAirBomb<br>FenixDragoonArsenalOvercharge<br>move<br>ProgressRally<br>stop | AllUnitBehaviorController<br>SuppressEnergyRegen | Move / move,Move / AbilCmd<br>Stop / stop,Stop / AbilCmd<br>MoveHoldPosition / move,HoldPos / AbilCmd<br>Attack / attack,Execute / AbilCmd<br>MovePatrol / move,Patrol / AbilCmd<br>Rally / ProgressRally,Rally1 / AbilCmd<br>FenixDragoonChargedBuster / ChargedBuster,Execute / AbilCmd<br>FenixDragoonAirBomb / FenixDragoonAirBomb,Execute / AbilCmd<br>System.Xml.XmlElement / System.Xml.XmlElement / System.Xml.XmlElement<br>FenixDragoonChargeBusterPassive / Passive |
| FenixDragoonAirBombUpgradedWeapon |  |  |  |  |  |
| FenixDragoonAirBombWeapon |  |  |  |  |  |
| FenixDragoonAttackMissile |  |  |  |  |  |
| FenixDragoonChargedBlastAttackMissile |  |  |  |  |  |
| FenixKaldalisZealot |  |  | attack<br>FenixKaldalisZealotCharge<br>move<br>ProgressRally<br>stop<br>Warpable | AllUnitBehaviorController | Move / move,Move / AbilCmd<br>Stop / stop,Stop / AbilCmd<br>MoveHoldPosition / move,HoldPos / AbilCmd<br>Attack / attack,Execute / AbilCmd<br>MovePatrol / move,Patrol / AbilCmd<br>Rally / ProgressRally,Rally1 / AbilCmd<br>FenixKaldalisZealotCharge / FenixKaldalisZealotCharge,Execute / AbilCmd<br>FenixKaldalisZealotCleaveLocked / Passive<br>FenixKaldalisZealotCleave / Passive |
| FenixManaDummy1 |  |  |  | PreventKnockback<br>TimeStopImmune<br>Unmoved<br>Unrepairable |  |
| FenixManaDummy2 |  |  |  | PreventKnockback<br>TimeStopImmune<br>Unmoved<br>Unrepairable |  |
| FenixManaDummy3 |  |  |  | PreventKnockback<br>TimeStopImmune<br>Unmoved<br>Unrepairable |  |
| FenixMojoScout |  |  | attack<br>FenixMojoMissiles<br>move<br>stop<br>Warpable | AllUnitBehaviorController | Move / move,Move / AbilCmd<br>Stop / stop,Stop / AbilCmd<br>MoveHoldPosition / move,HoldPos / AbilCmd<br>Attack / attack,Execute / AbilCmd<br>MovePatrol / move,Patrol / AbilCmd<br>FenixChampionScoutAOEMissilesLocked / Passive<br>FenixMojoMissiles / FenixMojoMissiles,Execute / AbilCmd<br>FenixMojoScoutAirStunPassive / Passive |
| FenixMojoScoutAirWeaponLeft |  |  |  |  |  |
| FenixMojoScoutAirWeaponRight |  |  |  |  |  |
| FenixMojoScoutAOEAirWeaponLeft |  |  |  |  |  |
| FenixMojoScoutAOEAirWeaponRight |  |  |  |  |  |
| FenixProbiusProbe |  |  |  |  |  |
| FenixPurificationNova |  |  |  |  |  |
| FenixSentryPhotonOverchargeWeapon |  |  |  |  |  |
| FenixSOA |  |  |  |  |  |
| FenixTaldarinImmortal |  |  | attack<br>ImmortalOverload<br>move<br>stop<br>Warpable | AllUnitBehaviorController | Move / move,Move / AbilCmd<br>Stop / stop,Stop / AbilCmd<br>MoveHoldPosition / move,HoldPos / AbilCmd<br>Attack / attack,Execute / AbilCmd<br>MovePatrol / move,Patrol / AbilCmd<br>ImmortalOverload / ImmortalOverload,Execute / AbilCmd<br>FenixImmortalGravitonCannon / Passive<br>FenixImmortalDetonationShotLocked / Passive<br>FenixImmortalDetonationShot / Passive |
| FenixTalisAdept |  |  | attack<br>FenixTalisAdeptBounceShot<br>FenixTalisShadeCooldown<br>move<br>ProgressRally<br>stop<br>Warpable | AllUnitBehaviorController<br>FenixTalisShadeCooldown | Move / move,Move / AbilCmd<br>Stop / stop,Stop / AbilCmd<br>MoveHoldPosition / move,HoldPos / AbilCmd<br>Attack / attack,Execute / AbilCmd<br>MovePatrol / move,Patrol / AbilCmd<br>Rally / ProgressRally,Rally1 / AbilCmd<br>FenixTalisShadeSpawnShade / Passive<br>FenixTalisAdeptBounceShot / FenixTalisAdeptBounceShot,Execute / AbilCmd<br>FenixTalisAdeptBounceShotLocked / Passive |
| FenixTalisAdeptBounceShotLM1Weapon |  |  |  |  |  |
| FenixTalisAdeptBounceShotLM2Weapon |  |  |  |  |  |
| FenixTalisAdeptBounceShotLM3Weapon |  |  |  |  |  |
| FenixTalisAdeptBounceShotLM4Weapon |  |  |  |  |  |
| FenixTalisAdeptBounceShotLM5Weapon |  |  |  |  |  |
| FenixTalisAdeptBounceShotLM6Weapon |  |  |  |  |  |
| FenixTalisAdeptBounceShotLM7Weapon |  |  |  |  |  |
| FenixTalisAdeptBounceShotLM8Weapon |  |  |  |  |  |
| FenixTalisAdeptPhaseShift |  |  | attack<br>move<br>stop | NoBiomassDrop | Move / move,Move / AbilCmd<br>Stop / stop,Stop / AbilCmd<br>MoveHoldPosition / move,HoldPos / AbilCmd<br>MovePatrol / move,Patrol / AbilCmd<br>Attack / attack,Execute / AbilCmd<br>Rally / ProgressRally,Rally1 / AbilCmd<br>Cancel / AdeptShadePhaseShiftCancel,Execute / AbilCmd |
| FenixTalisAdeptUpgradeWeapon |  |  |  |  |  |
| FenixTalisAdeptWeapon |  |  |  |  |  |
| FenixTalisShadeWeapon |  |  |  |  |  |
| FenixThunderousChargeCoopPlaceholder |  |  |  |  |  |
| FenixWarbringerColossus |  |  | attack<br>FenixWarbringerColossusPowerShot<br>move<br>ProgressRally<br>stop<br>Warpable | AllUnitBehaviorController<br>FenixWarbringerColossusPowerShotAutoCast | Move / move,Move / AbilCmd<br>Stop / stop,Stop / AbilCmd<br>MoveHoldPosition / move,HoldPos / AbilCmd<br>Attack / attack,Execute / AbilCmd<br>MovePatrol / move,Patrol / AbilCmd<br>FenixWarbringerColossusPowerShotLocked / Passive<br>FenixWarbringerColossusPowerShot / FenixWarbringerColossusPowerShot,Execute / AbilCmd<br>CliffWalk / Passive<br>ColossusIceBeam / Passive<br>Rally / ProgressRally,Rally1 / AbilCmd |
| FenixWarbringerColossusPowerShotAttackMissile |  |  |  |  |  |
| Immortal |  |  | attack<br>FenixTaldarinImmortalMorph<br>ImmortalOverload<br>move<br>stop | AllUnitBehaviorController |  |
| Scout |  |  | FenixMojoScoutMorph | AllUnitBehaviorController | HaveFenixScoutWeaponRange / Passive |
| SentryFenix |  |  | attack<br>FenixSentryGuardianZone<br>move<br>ProgressRally<br>SentryFenixPhasingMode<br>stop<br>Warpable | AllUnitBehaviorController | Move / move,Move / AbilCmd<br>Stop / stop,Stop / AbilCmd<br>MoveHoldPosition / move,HoldPos / AbilCmd<br>MovePatrol / move,Patrol / AbilCmd<br>Attack / attack,Execute / AbilCmd<br>Rally / ProgressRally,Rally1 / AbilCmd<br>FenixSentryGuardianZone / FenixSentryGuardianZone,Execute / AbilCmd<br>FenixSentryPhasingMode / SentryFenixPhasingMode,Execute / AbilCmd |
| SentryFenixPhasing |  |  | attack<br>FenixSentryGuardianZone<br>move<br>SentryFenixMobileMode<br>stop | AllUnitBehaviorController<br>FenixSentryGuardianZonePhasingMode<br>SentryPowerSource | Move / move,Move / AbilCmd<br>Stop / stop,Stop / AbilCmd<br>MoveHoldPosition / move,HoldPos / AbilCmd<br>MovePatrol / move,Patrol / AbilCmd<br>Attack / attack,Execute / AbilCmd<br>FenixSentryMobileMode / SentryFenixMobileMode,Execute / AbilCmd<br>FenixSentryGuardianZonePassive / Passive |

## 面板与技能

| 来源单位 | 类型 | Face | AbilCmd | Requirements |
| --- | --- | --- | --- | --- |
| AdeptFenix | 面板/技能 | Move | move,Move |  |
| AdeptFenix | 面板/技能 | Stop | stop,Stop |  |
| AdeptFenix | 面板/技能 | MoveHoldPosition | move,HoldPos |  |
| AdeptFenix | 面板/技能 | Attack | attack,Execute |  |
| AdeptFenix | 面板/技能 | MovePatrol | move,Patrol |  |
| AdeptFenix | 面板/技能 | Rally | ProgressRally,Rally1 |  |
| AdeptFenix | 面板/技能 | Cancel | AdeptPhaseShiftCancel,Execute |  |
| Colossus | 被动 | ExtendedThermalLance |  | HaveKaraxExtendedThermalLance |
| Disruptor | 面板/技能 | PurificationNovaTargeted | PurificationNovaTargeted,Execute |  |
| Disruptor | 被动 | DisruptorCloakPassive |  | HaveDisruptorPermanentCloak |
| Disruptor | 被动 | DisruptorSecondExplosion |  | HaveDisruptor2ndExplode |
| FenixAdeptShade | 面板/技能 | Move | move,Move |  |
| FenixAdeptShade | 面板/技能 | Stop | stop,Stop |  |
| FenixAdeptShade | 面板/技能 | MoveHoldPosition | move,HoldPos |  |
| FenixAdeptShade | 面板/技能 | MovePatrol | move,Patrol |  |
| FenixAdeptShade | 面板/技能 | Attack | attack,Execute |  |
| FenixAdeptShade | 面板/技能 | Rally | ProgressRally,Rally1 |  |
| FenixAdeptShade | 面板/技能 | Cancel | AdeptShadePhaseShiftCancel,Execute |  |
| FenixAltarOfPsiStorms | 面板/技能 | FenixKaldalisZealotDownloadUpgrade | FenixAltarOfPsiStormsResearch,Research1 |  |
| FenixAltarOfPsiStorms | 被动 | FenixKaldalisZealotDownloadActive |  | HaveFenixKaldalisZealotActive |
| FenixAltarOfPsiStorms | 面板/技能 | FenixTalisAdeptDownloadUpgrade | FenixAltarOfPsiStormsResearch,Research2 |  |
| FenixAltarOfPsiStorms | 被动 | FenixTalisAdeptDownloadActive |  | HaveFenixTalisAdeptActive |
| FenixAltarOfPsiStorms | 面板/技能 | FenixMojoScoutDownloadUpgrade | FenixAltarOfPsiStormsResearch,Research3 |  |
| FenixAltarOfPsiStorms | 被动 | FenixMojoScoutDownloadActive |  | HaveFenixMojoScoutActive |
| FenixAltarOfPsiStorms | 被动 | FenixMojoScoutDownloadUpgradeLocked |  | FenixLevel05 |
| FenixAltarOfPsiStorms | 面板/技能 | FenixTaldarinImmortalDownloadUpgrade | FenixAltarOfPsiStormsResearch,Research4 |  |
| FenixAltarOfPsiStorms | 被动 | FenixTaldarinImmortalDownloadActive |  | HaveFenixTaldarinImmortalActive |
| FenixAltarOfPsiStorms | 被动 | FenixTaldarinImmortalDownloadUpgradeLocked |  | FenixLevel05 |
| FenixAltarOfPsiStorms | 面板/技能 | FenixWarbringerColossusDownloadUpgrade | FenixAltarOfPsiStormsResearch,Research5 |  |
| FenixAltarOfPsiStorms | 被动 | FenixWarbringerColossusDownloadActive |  | HaveFenixWarbringerColossusActive |
| FenixAltarOfPsiStorms | 被动 | FenixWarbringerColossusDownloadUpgradeLocked |  | FenixLevel08 |
| FenixAltarOfPsiStorms | 面板/技能 | FenixClolarionCarrierDownloadUpgrade | FenixAltarOfPsiStormsResearch,Research6 |  |
| FenixAltarOfPsiStorms | 被动 | FenixClolarionCarrierDownloadActive |  | HaveFenixClolarionCarrierActive |
| FenixAltarOfPsiStorms | 被动 | FenixClolarionCarrierDownloadUpgradeLocked |  | FenixLevel08 |
| FenixAltarOfPsiStorms | 面板/技能 | Cancel | que5,CancelLast |  |
| FenixAltarOfPsiStorms | 面板/技能 | BrokenFenixAltarOfPsiStorms | BrokenFenixAltarOfPsiStorms,Execute |  |
| FenixArbiter | 面板/技能 | Move | move,Move |  |
| FenixArbiter | 面板/技能 | Stop | stop,Stop |  |
| FenixArbiter | 面板/技能 | MoveHoldPosition | move,HoldPos |  |
| FenixArbiter | 面板/技能 | Attack | attack,Execute |  |
| FenixArbiter | 面板/技能 | MovePatrol | move,Patrol |  |
| FenixArbiter | 面板/技能 | FenixArbiterStasisField | FenixArbiterStasisField,Execute |  |
| FenixArbiter | 面板/技能 | FenixArbiterCloakField | FenixArbiterCloakingField,On |  |
| FenixArbiter | 面板/技能 | FenixArbiterCloakFieldOff | FenixArbiterCloakingField,Off |  |
| FenixArbiter | 面板/技能 | ArbiterMPRecall | ArbiterMPRecall,Execute |  |
| FenixArbiter | 被动 | Detector |  | HaveFenixArbiterDetection |
| FenixClolarionBomber | 面板/技能 | Move | move,Move |  |
| FenixClolarionBomber | 面板/技能 | Stop | stop,Stop |  |
| FenixClolarionBomber | 面板/技能 | MoveHoldPosition | move,HoldPos |  |
| FenixClolarionBomber | 面板/技能 | Attack | attack,Execute |  |
| FenixClolarionBomber | 面板/技能 | MovePatrol | move,Patrol |  |
| FenixClolarionCarrier | 面板/技能 | Move | move,Move |  |
| FenixClolarionCarrier | 面板/技能 | Stop | stop,Stop |  |
| FenixClolarionCarrier | 面板/技能 | MoveHoldPosition | move,HoldPos |  |
| FenixClolarionCarrier | 面板/技能 | Attack | attack,Execute |  |
| FenixClolarionCarrier | 面板/技能 | MovePatrol | move,Patrol |  |
| FenixClolarionCarrier | 面板/技能 | FenixClolarionInterceptor | FenixClolarionCarrierHangar,Ammo1 |  |
| FenixClolarionCarrier | 被动 | FenixChampionCarrierBombersLocked |  | FenixLevel14 |
| FenixClolarionCarrier | 面板/技能 | FenixClolarionBomberDummy | FenixClolarionCarrierBomberDummy,Ammo1 |  |
| FenixClolarionCarrier | 面板/技能 | FenixClolarionBomber | FenixClolarionCarrierBomberHangar,Ammo1 |  |
| FenixClolarionCarrier | 面板/技能 | Cancel | FenixClolarionHangarQueue5,CancelLast |  |
| FenixClolarionCarrier | 被动 | FenixClolarionSolarBeam |  |  |
| FenixClolarionInterceptor | 面板/技能 | Move | move,Move |  |
| FenixClolarionInterceptor | 面板/技能 | Stop | stop,Stop |  |
| FenixClolarionInterceptor | 面板/技能 | MoveHoldPosition | move,HoldPos |  |
| FenixClolarionInterceptor | 面板/技能 | Attack | attack,Execute |  |
| FenixClolarionInterceptor | 面板/技能 | MovePatrol | move,Patrol |  |
| FenixCoop | 面板/技能 | Move | move,Move |  |
| FenixCoop | 面板/技能 | Stop | stop,Stop |  |
| FenixCoop | 面板/技能 | MoveHoldPosition | move,HoldPos |  |
| FenixCoop | 面板/技能 | Attack | attack,Execute |  |
| FenixCoop | 面板/技能 | MovePatrol | move,Patrol |  |
| FenixCoop | 面板/技能 | Rally | ProgressRally,Rally1 |  |
| FenixCoop | 面板/技能 | FenixThunderousChargeCoop | FenixThunderousChargeCoop,Execute |  |
| FenixCoop | 面板/技能 | FenixWhirlwind | FenixSoAWhirlwind,Execute |  |
| FenixCoop | 面板/技能 | VoidShieldCapacitor | VoidShieldCapacitor,Execute |  |
| FenixDragoon | 面板/技能 | Move | move,Move |  |
| FenixDragoon | 面板/技能 | Stop | stop,Stop |  |
| FenixDragoon | 面板/技能 | MoveHoldPosition | move,HoldPos |  |
| FenixDragoon | 面板/技能 | Attack | attack,Execute |  |
| FenixDragoon | 面板/技能 | MovePatrol | move,Patrol |  |
| FenixDragoon | 面板/技能 | Rally | ProgressRally,Rally1 |  |
| FenixDragoon | 面板/技能 | FenixDragoonChargedBuster | ChargedBuster,Execute |  |
| FenixDragoon | 面板/技能 | FenixDragoonAirBomb | FenixDragoonAirBomb,Execute |  |
| FenixDragoon | 被动 | FenixDragoonChargeBusterPassive |  |  |
| FenixKaldalisZealot | 面板/技能 | Move | move,Move |  |
| FenixKaldalisZealot | 面板/技能 | Stop | stop,Stop |  |
| FenixKaldalisZealot | 面板/技能 | MoveHoldPosition | move,HoldPos |  |
| FenixKaldalisZealot | 面板/技能 | Attack | attack,Execute |  |
| FenixKaldalisZealot | 面板/技能 | MovePatrol | move,Patrol |  |
| FenixKaldalisZealot | 面板/技能 | Rally | ProgressRally,Rally1 |  |
| FenixKaldalisZealot | 面板/技能 | FenixKaldalisZealotCharge | FenixKaldalisZealotCharge,Execute |  |
| FenixKaldalisZealot | 被动 | FenixKaldalisZealotCleaveLocked |  | FenixLevel04 |
| FenixKaldalisZealot | 被动 | FenixKaldalisZealotCleave |  | HaveKaldalisCleave |
| FenixMojoScout | 面板/技能 | Move | move,Move |  |
| FenixMojoScout | 面板/技能 | Stop | stop,Stop |  |
| FenixMojoScout | 面板/技能 | MoveHoldPosition | move,HoldPos |  |
| FenixMojoScout | 面板/技能 | Attack | attack,Execute |  |
| FenixMojoScout | 面板/技能 | MovePatrol | move,Patrol |  |
| FenixMojoScout | 被动 | FenixChampionScoutAOEMissilesLocked |  | FenixLevel12 |
| FenixMojoScout | 面板/技能 | FenixMojoMissiles | FenixMojoMissiles,Execute |  |
| FenixMojoScout | 被动 | FenixMojoScoutAirStunPassive |  |  |
| FenixTaldarinImmortal | 面板/技能 | Move | move,Move |  |
| FenixTaldarinImmortal | 面板/技能 | Stop | stop,Stop |  |
| FenixTaldarinImmortal | 面板/技能 | MoveHoldPosition | move,HoldPos |  |
| FenixTaldarinImmortal | 面板/技能 | Attack | attack,Execute |  |
| FenixTaldarinImmortal | 面板/技能 | MovePatrol | move,Patrol |  |
| FenixTaldarinImmortal | 面板/技能 | ImmortalOverload | ImmortalOverload,Execute |  |
| FenixTaldarinImmortal | 被动 | FenixImmortalGravitonCannon |  |  |
| FenixTaldarinImmortal | 被动 | FenixImmortalDetonationShotLocked |  | FenixLevel12 |
| FenixTaldarinImmortal | 被动 | FenixImmortalDetonationShot |  | HaveImmortalDetonationExplosion |
| FenixTalisAdept | 面板/技能 | Move | move,Move |  |
| FenixTalisAdept | 面板/技能 | Stop | stop,Stop |  |
| FenixTalisAdept | 面板/技能 | MoveHoldPosition | move,HoldPos |  |
| FenixTalisAdept | 面板/技能 | Attack | attack,Execute |  |
| FenixTalisAdept | 面板/技能 | MovePatrol | move,Patrol |  |
| FenixTalisAdept | 面板/技能 | Rally | ProgressRally,Rally1 |  |
| FenixTalisAdept | 被动 | FenixTalisShadeSpawnShade |  |  |
| FenixTalisAdept | 面板/技能 | FenixTalisAdeptBounceShot | FenixTalisAdeptBounceShot,Execute |  |
| FenixTalisAdept | 被动 | FenixTalisAdeptBounceShotLocked |  | FenixLevel04 |
| FenixTalisAdeptPhaseShift | 面板/技能 | Move | move,Move |  |
| FenixTalisAdeptPhaseShift | 面板/技能 | Stop | stop,Stop |  |
| FenixTalisAdeptPhaseShift | 面板/技能 | MoveHoldPosition | move,HoldPos |  |
| FenixTalisAdeptPhaseShift | 面板/技能 | MovePatrol | move,Patrol |  |
| FenixTalisAdeptPhaseShift | 面板/技能 | Attack | attack,Execute |  |
| FenixTalisAdeptPhaseShift | 面板/技能 | Rally | ProgressRally,Rally1 |  |
| FenixTalisAdeptPhaseShift | 面板/技能 | Cancel | AdeptShadePhaseShiftCancel,Execute |  |
| FenixWarbringerColossus | 面板/技能 | Move | move,Move |  |
| FenixWarbringerColossus | 面板/技能 | Stop | stop,Stop |  |
| FenixWarbringerColossus | 面板/技能 | MoveHoldPosition | move,HoldPos |  |
| FenixWarbringerColossus | 面板/技能 | Attack | attack,Execute |  |
| FenixWarbringerColossus | 面板/技能 | MovePatrol | move,Patrol |  |
| FenixWarbringerColossus | 被动 | FenixWarbringerColossusPowerShotLocked |  | FenixLevel14 |
| FenixWarbringerColossus | 面板/技能 | FenixWarbringerColossusPowerShot | FenixWarbringerColossusPowerShot,Execute |  |
| FenixWarbringerColossus | 被动 | CliffWalk |  |  |
| FenixWarbringerColossus | 被动 | ColossusIceBeam |  |  |
| FenixWarbringerColossus | 面板/技能 | Rally | ProgressRally,Rally1 |  |
| Nexus | 被动 | CommanderPrestigeKaraxChronoBoostLocked |  | CommanderPrestigeKaraxTopBar |
| Scout | 被动 | HaveFenixScoutWeaponRange |  | HaveFenixScoutWeaponRange |
| SentryFenix | 面板/技能 | Move | move,Move |  |
| SentryFenix | 面板/技能 | Stop | stop,Stop |  |
| SentryFenix | 面板/技能 | MoveHoldPosition | move,HoldPos |  |
| SentryFenix | 面板/技能 | MovePatrol | move,Patrol |  |
| SentryFenix | 面板/技能 | Attack | attack,Execute |  |
| SentryFenix | 面板/技能 | Rally | ProgressRally,Rally1 |  |
| SentryFenix | 面板/技能 | FenixSentryGuardianZone | FenixSentryGuardianZone,Execute |  |
| SentryFenix | 面板/技能 | FenixSentryPhasingMode | SentryFenixPhasingMode,Execute |  |
| SentryFenixPhasing | 面板/技能 | Move | move,Move |  |
| SentryFenixPhasing | 面板/技能 | Stop | stop,Stop |  |
| SentryFenixPhasing | 面板/技能 | MoveHoldPosition | move,HoldPos |  |
| SentryFenixPhasing | 面板/技能 | MovePatrol | move,Patrol |  |
| SentryFenixPhasing | 面板/技能 | Attack | attack,Execute |  |
| SentryFenixPhasing | 面板/技能 | FenixSentryMobileMode | SentryFenixMobileMode,Execute |  |
| SentryFenixPhasing | 被动 | FenixSentryGuardianZonePassive |  |  |
| SoACasterFenix | 面板/技能 | CancelBuilding | BuildInProgress,Cancel |  |
| SoACasterFenix | 被动 | SOASummonFenixPassive |  | HaveFenixSoAPassive |
| SoACasterFenix | 面板/技能 | SOASummonFenix | SOASummonFenix,Execute |  |
| SoACasterFenix | 被动 | SOASummonFenixDragoonPassive |  | HaveFenixDragoonSoAPassive |
| SoACasterFenix | 面板/技能 | SOASummonFenixDragoon | SOASummonFenixDragoon,Execute |  |
| SoACasterFenix | 被动 | SOASummonFenixArbiterPassive |  | HaveFenixArbiterSoAPassive |
| SoACasterFenix | 面板/技能 | SOASummonFenixArbiter | SOASummonFenixArbiter,Execute |  |
| SoACasterFenix | 被动 | SOASummonFenixArbiterLocked |  | FenixLevel03 |

## 原始ID列表

- AbilData.xml：
  - AbathurSymbioteHangerBrutalisk
  - AlarakACDeadlyCharge
  - AlarakStructureOvercharge
  - ApocaliskBurrowCharge
  - BrutaliskDeepTunnel
  - BurrowBrutaliskDown
  - BurrowBrutaliskUp
  - CarrierAiurHanger
  - CarrierRepairDroneHanger
  - Charge
  - ChargeBuster
  - ChargedBuster
  - DarkPylonMorph
  - DarkPylonRecall
  - EvolveBrutalisk
  - EvolveToBrutalisk
  - EvolveToBrutaliskDefiler
  - EvolveToBrutaliskQueen
  - EvolveToBrutaliskRavager
  - EvolveToBrutaliskRoach
  - EvolveToBrutaliskRoachVile
  - EvolveToBrutaliskSwarmHost
  - EvolveToLeviathanMutalisk
  - FenixAdeptShadeCooldown
  - FenixClolarionCarrierBomberDummy
  - FenixClolarionCarrierBomberHangar
  - FenixClolarionCarrierHangar
  - FenixClolarionCarrierMorph
  - FenixClolarionHangarQueue5
  - FenixClolarionInterceptorMorph
  - FenixDragoonArsenalOvercharge
  - FenixDragoonChargedBlast
  - FenixKaldalisZealotCharge
  - FenixKaldalisZealotGuardianShield
  - FenixKaldalisZealotMorph
  - FenixKaldalisZealotReviveDeath
  - FenixKaldalisZealotReviveRebuild
  - FenixMojoMissiles
  - FenixMojoScoutMorph
  - FenixPurificationNova
  - FenixSentryPhotonOvercharge
  - FenixSOACharge
  - FenixTaldarinImmortalMorph
  - FenixTalisAdeptBounceShot
  - FenixTalisAdeptMorph
  - FenixTalisAdeptPhaseShift
  - FenixTalisAdeptPhaseShiftCancel
  - FenixTalisAdeptShadePhaseShiftCancel
  - FenixTalisShadeCooldown
  - FenixThunderousChargeCoop
  - FenixWarbringerColossusMorph
  - FenixWarbringerColossusPowerShot
  - HHD8Charge
  - HHD8SingleCharge
  - MutaliskMorphToDevourer
  - MutaliskMorphToGuardian
  - NexusBuild
  - PhotonOverchargeMorphDarkPylonBack
  - PhotonOverchargeMorphPylonBack
  - RoboticsBayResearch
  - RoboticsFacilityTrain
  - RoboticsFacilityWarpTrain
  - ShieldBatteryStructureBarrier
  - SOADarkPylon
  - SOAPylonPower
  - UltraliskBurrowCharge
  - ZagaraVoidCoopSpawnMutalisk
- ButtonData.xml：
  - AdeptFenixShadeSpawn
  - AdeptPassive
  - AdeptShadeDebuff
  - AlarakColossusChargedBlastChargeTime
  - AlarakDeadlyCharge
  - AlarakStructureOvercharge
  - ApocaliskBurrowCharge
  - Brutalisk
  - BrutaliskDeepTunnel
  - Carrier
  - CarrierTaldarimMothership
  - Charge
  - ColossusTaldarim
  - CommanderFenixDisruptorSentryResearchPack
  - CommanderFenixUnlockDisruptor
  - CommanderPrestigeAbathurBrutaliskLocked
  - DarkPylonRecall
  - DisruptorSecondExplosion
  - EvolveBrutalisk
  - EvolveBurrowChargeLocked
  - EvolveMutaliskRapidRegeneration
  - EvolveToBrutalisk
  - EvolveToBrutaliskLocked
  - FenixChampionCarrierBombersLocked
  - FenixChampionScoutAOEMissilesLocked
  - FenixClolarionBomber
  - FenixClolarionBomberDummy
  - FenixClolarionCarrier
  - FenixClolarionCarrierDownloadActive
  - FenixClolarionCarrierDownloadInactive
  - FenixClolarionCarrierDownloadUpgrade
  - FenixClolarionCarrierDownloadUpgradeLocked
  - FenixClolarionCarrierUpgrade
  - FenixClolarionInterceptor
  - FenixClolarionSolarBeam
  - FenixDragoonArsenalOvercharge
  - FenixDragoonChargeBuster
  - FenixDragoonChargeBusterPassive
  - FenixDragoonChargedBlast
  - FenixDragoonChargedBuster
  - FenixImmortalDetonationShot
  - FenixImmortalDetonationShotLocked
  - FenixImmortalGravitonCannon
  - FenixImmortalResearchDetonationShot
  - FenixImmortalResearchDetonationShotLocked
  - FenixKaldalisZealot
  - FenixKaldalisZealotCharge
  - FenixKaldalisZealotCleave
  - FenixKaldalisZealotCleaveLocked
  - FenixKaldalisZealotDownloadActive
  - FenixKaldalisZealotDownloadInactive
  - FenixKaldalisZealotDownloadUpgrade
  - FenixKaldalisZealotGuardianShield
  - FenixKaldalisZealotResearchGuardianShield
  - FenixKaldalisZealotUpgrade
  - FenixMojoMissiles
  - FenixMojoScout
  - FenixMojoScoutAirStunPassive
  - FenixMojoScoutDownloadActive
  - FenixMojoScoutDownloadInactive
  - FenixMojoScoutDownloadUpgrade
  - FenixMojoScoutDownloadUpgradeLocked
  - FenixMojoScoutUpgrade
  - FenixPurificationNova
  - FenixResearchDisruptorCloakLocked
  - FenixResearchDisruptorSecondExplosionLocked
  - FenixSentryPhotonOvercharge
  - FenixTaldarinImmortal
  - FenixTaldarinImmortalDownloadActive
  - FenixTaldarinImmortalDownloadInactive
  - FenixTaldarinImmortalDownloadUpgrade
  - FenixTaldarinImmortalDownloadUpgradeLocked
  - FenixTaldarinImmortalUpgrade
  - FenixTalisAdept
  - FenixTalisAdeptBounceShot
  - FenixTalisAdeptBounceShotLocked
  - FenixTalisAdeptDownloadActive
  - FenixTalisAdeptDownloadInactive
  - FenixTalisAdeptDownloadUpgrade
  - FenixTalisAdeptKillBounce
  - FenixTalisAdeptLearnBounceShotUpgrade
  - FenixTalisAdeptLearnBounceShotUpgradeLocked
  - FenixTalisAdeptPhaseShift
  - FenixTalisAdeptPiercingUpgrade
  - FenixTalisAdeptResearchPiercingUpgrade
  - FenixTalisAdeptShieldUpgrade
  - FenixTalisAdeptUpgrade
  - FenixTalisShadeSpawnShade
  - FenixThunderousChargeCoop
  - FenixWarbringerColossus
  - FenixWarbringerColossusDownloadActive
  - FenixWarbringerColossusDownloadInactive
  - FenixWarbringerColossusDownloadUpgrade
  - FenixWarbringerColossusDownloadUpgradeLocked
  - FenixWarbringerColossusIceBeam
  - FenixWarbringerColossusPowerShot
  - FenixWarbringerColossusPowerShotLocked
  - FenixWarbringerColossusUpgrade
  - FenixWarpinDisruptorLocked
  - HaveFenixScoutWeaponRange
  - ImmortalBarrierBase
  - ImmortalTaldarim
  - ResearchAbathurMutaliskHealthScalingUpgrade
  - ResearchAdeptFenixShadeSpawn
  - ResearchAdeptShadeDebuff
  - ResearchAlarakColossusChargedBlastAirAttack
  - ResearchAlarakColossusChargedBlastChargeTime
  - ResearchBarrier
  - ResearchBlinkCharges
  - ResearchCarrierRepairDrones
  - ResearchDisruptorCloak
  - ResearchDisruptorSecondExplosion
  - ResearchFenixChampionCarrierBombers
  - ResearchFenixChampionCarrierBombersLocked
  - ResearchFenixChampionScoutAOEMissiles
  - ResearchFenixChampionScoutAOEMissilesLocked
  - ResearchFenixKaldalisZealotCleave
  - ResearchFenixScoutWeaponRange
  - ResearchFenixTalisAdeptShieldUpgrade
  - ResearchFenixWarbringerColossusPowerShot
  - ResearchHHTacticalJumpCharges
  - ResearchShadowCharge
  - ResearchStructureBarrier
  - ResearchStructureBarrierLocked
  - ResearchWarpGateCharges
  - ShieldBatteryStructureBarrier
  - SOADarkPylon
  - SOAPylonPower
  - TransformToRoboticsWarpFacilityLocked
  - WarpInAdept
  - WarpinDisruptor
- BehaviorData.xml：
  - AdeptPsionicTransferDamageDebuff
  - AlarakStructureOvercharge
  - AlarakStructureOverchargeShield
  - ChargeBuster
  - ChargeBusterExpiring
  - EvolveBrutaliskTimedLife
  - FenixAdeptShadeCooldown
  - FenixAdeptShadeSpawnShadTimedLife
  - FenixChampionSwapBoostAdept
  - FenixChampionSwapBoostCarrier
  - FenixChampionSwapBoostColossus
  - FenixChampionSwapBoostImmortal
  - FenixChampionSwapBoostScout
  - FenixClolarionCarrierInterceptorMorphWarpAway
  - FenixClolarionChargeBeamActive
  - FenixClolarionChargeBeamCounter
  - FenixClolarionChargeBeamPhase2
  - FenixClolarionChargeBeamPhase3
  - FenixDragoonChargedBlast
  - FenixDragoonChargedBlastInitialDisableAttack
  - FenixImmortalDetonation
  - FenixKaldalisZealotChargeSlow
  - FenixKaldalisZealotChargeStun
  - FenixKaldalisZealotRevive
  - FenixKaldalisZealotReviveSupressed
  - FenixMojoScoutAirStun
  - FenixSentryPhotonOvercharge
  - FenixTalisAdeptBounceShotMarker
  - FenixTalisAdeptDeathCheck
  - FenixTalisAdeptPhaseShift
  - FenixTalisAdeptPhaseShiftCancelDummy
  - FenixTalisAdeptPhaseShiftCaster
  - FenixTalisAdeptPhaseShiftTimer
  - FenixTalisShadeCooldown
  - FenixThunderousChargeCoopCharging
  - FenixThunderousChargeCoopOnDeathKnockback
  - FenixThunderousChargeCoopPrecursor
  - FenixThunderousChargeCoopSlow
  - FenixThunderousChargeCoopStun
  - FenixWarbringerColossusIceFlatAmount
  - FenixWarbringerColossusIceFlatAmountHeroic
  - FenixWarbringerColossusIceFlatAmountStructure
  - FenixWarbringerColossusIceFlatAmountStructureStun
  - FenixWarbringerColossusPowerShotAutoCast
  - KaraxUnitSpawnBarrier
  - PrecursorFenixImmortalUnitKnockback
  - PurificationNovaNotification
  - PurificationNovaUpgradedTargettedTarget
  - ShieldBatteryStructureBarrier
  - VorazunCloakDamageBoostPermanentUltraliskBurrowCharge
