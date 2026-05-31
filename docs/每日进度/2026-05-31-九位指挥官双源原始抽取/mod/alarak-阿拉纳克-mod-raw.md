# 阿拉纳克 / Alarak Mod 原始来源（中文整理）

- 模块：`XMAlarak.SC2Mod`
- 源目录：`C:\Users\22448\Downloads\重生虫心0.71汉化版（新）\reborn_workrepo\合作指挥官版起义狂潮\Mods\XM\XMAlarak.SC2Mod`
- 说明：直接从 UnitData.xml / AbilData.xml / ButtonData.xml / BehaviorData.xml 抽取，不引用旧汇总文档。

## 建筑

| 单位ID | 脚印 | 部署脚印 | 技能 | 行为 | 按钮 |
| --- | --- | --- | --- | --- | --- |
| AlarakSupplicantWarpTrainCreator |  |  | WarpGateTrainSupplicantTrue |  | WarpInSupplicant / WarpGateTrainSupplicantTrue,Train12 / AbilCmd |
| Gateway | Footprint3x3CreepNormalContour | Footprint3x3CreepNormal | GatewayTrain<br>que5notPassive<br>Rally<br>UpgradeToWarpGate | ChronoBoostTarget |  / que5notPassive,CancelLast / <br>Zealot / GatewayTrain,Train1 / AbilCmd<br>WarpInSupplicant / GatewayTrain,Train11 / AbilCmd<br>Stalker / GatewayTrain,Train2 / AbilCmd<br>WarpinAscendentLocked / Passive<br>Sentry / GatewayTrain,Train6 / AbilCmd<br>Monitor / GatewayTrain,Train10 / AbilCmd<br>SentryFenix / GatewayTrain,Train15 / AbilCmd<br>DarkArchon / GatewayTrain,Train9 / AbilCmd<br>WarpInDarkArchonLocked / Passive<br>AlarakMasteryUnitAttackSpeed / Passive |
| Nexus | Footprint5x5NormalCreepContour | Footprint5x5DropOffCreepNormal | NexusBuild<br>PhotonOvercharge | ChronoBoostTarget | CommanderPrestigeKaraxChronoBoostLocked / Passive |
| Pylon | Footprint2x2CreepNormalContour | Footprint2x2CreepNormal | DarkPylonMorph<br>PhotonOverchargeMorphPylon |  | System.Xml.XmlElement / System.Xml.XmlElement / System.Xml.XmlElement<br><br> |

## 兵种

| 单位ID | 脚印 | 部署脚印 | 技能 | 行为 | 按钮 |
| --- | --- | --- | --- | --- | --- |
| AlarakAAWeapon |  |  |  |  |  |
| AlarakChampion |  |  |  |  |  |
| AlarakCoop |  |  | AlarakACDeadlyCharge<br>AlarakEmpower<br>AlarakKnockback<br>attack<br>DestructionWaveNoOffset<br>move<br>ProgressRally<br>stop<br>Warpable | AlarakEmpowerDisplay<br>AlarakTheStrongestSurvive<br>AllUnitBehaviorController<br>HeroCCImmunity<br>SoulAbsorption | MoveChampions / move,Move / AbilCmd<br>Stop / stop,Stop / AbilCmd<br>MoveHoldPosition / move,HoldPos / AbilCmd<br>AttackChampions / attack,Execute / AbilCmd<br>MovePatrol / move,Patrol / AbilCmd<br>Rally / ProgressRally,Rally1 / AbilCmd<br>AlarakDeadlyCharge / AlarakACDeadlyCharge,Execute / AbilCmd<br>SoulAbsorption / Passive<br>AlarakKnockback / AlarakKnockback,Execute / AbilCmd<br>AlarakEmpower / AlarakEmpower,Execute / AbilCmd<br>AlarakEmpowerLocked / Passive<br>AlarakDestructionWaveDistance / Passive<br>AlarakDestructionWaveDistanceLocked / Passive<br>AlarakLightningStrikes / Passive<br>AlarakLightningStrikesLocked / Passive<br>AlarakAreaDamageUpgrade / Passive<br>AlarakAreaDamageUpgradeLocked / Passive<br>AlarakAttackStun / Passive<br>AlarakAttackStunLocked / Passive |
| AlarakReviveBeacon |  |  | AlarakACDeadlyCharge<br>AlarakEmpower<br>AlarakKnockback<br>AlarakRevive<br>que1<br>RallyReviveBeacon | AlarakReviveDisable<br>DisableRallyFor1Second<br>SuppressCollision<br>Unmoved<br>Unrepairable | Move / move,Move / AbilCmd<br>Stop / stop,Stop / AbilCmd<br>MoveHoldPosition / move,HoldPos / AbilCmd<br>Attack / attack,Execute / AbilCmd<br>MovePatrol / move,Patrol / AbilCmd<br>Rally / RallyReviveBeacon,Rally1 / AbilCmd<br>AlarakDeadlyCharge / AlarakACDeadlyCharge,Execute / AbilCmd<br>SoulAbsorption / Passive<br>AlarakKnockback / AlarakKnockback,Execute / AbilCmd<br>AlarakEmpower / AlarakEmpower,Execute / AbilCmd<br>AlarakEmpowerLocked / Passive<br>AlarakDestructionWaveDistance / Passive<br>AlarakDestructionWaveDistanceLocked / Passive<br>AlarakLightningStrikes / Passive<br>AlarakLightningStrikesLocked / Passive<br>AlarakAreaDamageUpgrade / Passive<br>AlarakAreaDamageUpgradeLocked / Passive<br>AlarakAttackStun / Passive<br>AlarakAttackStunLocked / Passive |
| AlarakRushPlaceholder |  |  |  |  |  |
| AlarakStructureOverchargeWeapon |  |  |  |  |  |
| AlarakSupplicantWarpTrainDummy |  |  | Warpable |  |  |
| AlarakTheStrongestSurviveDummyAttackMissile |  |  |  |  |  |
| AlarakTheStrongestSurviveDummySecondaryAttackMissile |  |  |  |  |  |
| CoopCasterAlarak |  |  | AlarakACSummonDeathfleetTarget<br>AlarakStructureOvercharge |  | AlarakStructureOvercharge / AlarakStructureOvercharge,Execute / AbilCmd<br>CommanderPrestigeAlarakDeathFleetLocked / Passive<br>AlarakACSummonDeathfleet / AlarakACSummonDeathfleetTarget,Execute / AbilCmd<br>AlarakDeathFleetLocked / Passive |
| PitAlarak |  |  |  | Benign<br>Unmoved |  |
| Supplicant |  |  | AdeptPhaseShiftCancel<br>attack<br>move<br>ProgressRally<br>stop<br>WarpableAnywhere | AllUnitBehaviorController<br>UnderConstructionOrDeadTracker | Move / move,Move / AbilCmd<br>Stop / stop,Stop / AbilCmd<br>MoveHoldPosition / move,HoldPos / AbilCmd<br>Attack / attack,Execute / AbilCmd<br>MovePatrol / move,Patrol / AbilCmd<br>Rally / ProgressRally,Rally1 / AbilCmd<br>Cancel / AdeptPhaseShiftCancel,Execute / AbilCmd<br>AlarakACMyLifefortheHighlord / Passive<br>AlarakSupplicantMaxShields / Passive<br>PHSupplicantShieldArmor / Passive<br>AlarakSupplicantSacrificeCDR / Passive<br>SupplicantSacrificeCDRLocked / Passive |

## 面板与技能

| 来源单位 | 类型 | Face | AbilCmd | Requirements |
| --- | --- | --- | --- | --- |
| AlarakCoop | 面板/技能 | MoveChampions | move,Move |  |
| AlarakCoop | 面板/技能 | Stop | stop,Stop |  |
| AlarakCoop | 面板/技能 | MoveHoldPosition | move,HoldPos |  |
| AlarakCoop | 面板/技能 | AttackChampions | attack,Execute |  |
| AlarakCoop | 面板/技能 | MovePatrol | move,Patrol |  |
| AlarakCoop | 面板/技能 | Rally | ProgressRally,Rally1 |  |
| AlarakCoop | 面板/技能 | AlarakDeadlyCharge | AlarakACDeadlyCharge,Execute |  |
| AlarakCoop | 被动 | SoulAbsorption |  |  |
| AlarakCoop | 面板/技能 | AlarakKnockback | AlarakKnockback,Execute |  |
| AlarakCoop | 面板/技能 | AlarakEmpower | AlarakEmpower,Execute |  |
| AlarakCoop | 被动 | AlarakEmpowerLocked |  | AlarakLevel05 |
| AlarakCoop | 被动 | AlarakDestructionWaveDistance |  | HaveAlarakDestructionWaveDistance |
| AlarakCoop | 被动 | AlarakDestructionWaveDistanceLocked |  | AlarakLevel14 |
| AlarakCoop | 被动 | AlarakLightningStrikes |  | HaveAlarakLightningStrikes |
| AlarakCoop | 被动 | AlarakLightningStrikesLocked |  | AlarakLevel07 |
| AlarakCoop | 被动 | AlarakAreaDamageUpgrade |  | HaveAlarakAreaDamageUpgrade |
| AlarakCoop | 被动 | AlarakAreaDamageUpgradeLocked |  | AlarakLevel11 |
| AlarakCoop | 被动 | AlarakAttackStun |  | HaveAlarakAttackStunUpgrade |
| AlarakCoop | 被动 | AlarakAttackStunLocked |  | AlarakLevel14 |
| AlarakReviveBeacon | 面板/技能 | Move | move,Move |  |
| AlarakReviveBeacon | 面板/技能 | Stop | stop,Stop |  |
| AlarakReviveBeacon | 面板/技能 | MoveHoldPosition | move,HoldPos |  |
| AlarakReviveBeacon | 面板/技能 | Attack | attack,Execute |  |
| AlarakReviveBeacon | 面板/技能 | MovePatrol | move,Patrol |  |
| AlarakReviveBeacon | 面板/技能 | Rally | RallyReviveBeacon,Rally1 |  |
| AlarakReviveBeacon | 面板/技能 | AlarakDeadlyCharge | AlarakACDeadlyCharge,Execute |  |
| AlarakReviveBeacon | 被动 | SoulAbsorption |  |  |
| AlarakReviveBeacon | 面板/技能 | AlarakKnockback | AlarakKnockback,Execute |  |
| AlarakReviveBeacon | 面板/技能 | AlarakEmpower | AlarakEmpower,Execute |  |
| AlarakReviveBeacon | 被动 | AlarakEmpowerLocked |  | AlarakLevel05 |
| AlarakReviveBeacon | 被动 | AlarakDestructionWaveDistance |  | HaveAlarakDestructionWaveDistance |
| AlarakReviveBeacon | 被动 | AlarakDestructionWaveDistanceLocked |  | AlarakLevel14 |
| AlarakReviveBeacon | 被动 | AlarakLightningStrikes |  | HaveAlarakLightningStrikes |
| AlarakReviveBeacon | 被动 | AlarakLightningStrikesLocked |  | AlarakLevel07 |
| AlarakReviveBeacon | 被动 | AlarakAreaDamageUpgrade |  | HaveAlarakAreaDamageUpgrade |
| AlarakReviveBeacon | 被动 | AlarakAreaDamageUpgradeLocked |  | AlarakLevel11 |
| AlarakReviveBeacon | 被动 | AlarakAttackStun |  | HaveAlarakAttackStunUpgrade |
| AlarakReviveBeacon | 被动 | AlarakAttackStunLocked |  | AlarakLevel14 |
| AlarakSupplicantWarpTrainCreator | 面板/技能 | WarpInSupplicant | WarpGateTrainSupplicantTrue,Train12 |  |
| CoopCasterAlarak | 面板/技能 | AlarakStructureOvercharge | AlarakStructureOvercharge,Execute |  |
| CoopCasterAlarak | 被动 | CommanderPrestigeAlarakDeathFleetLocked |  | CommanderPrestigeAlarakEmpowerMe |
| CoopCasterAlarak | 面板/技能 | AlarakACSummonDeathfleet | AlarakACSummonDeathfleetTarget,Execute |  |
| CoopCasterAlarak | 被动 | AlarakDeathFleetLocked |  | AlarakLevel10 |
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
| Nexus | 被动 | CommanderPrestigeKaraxChronoBoostLocked |  | CommanderPrestigeKaraxTopBar |
| Supplicant | 面板/技能 | Move | move,Move |  |
| Supplicant | 面板/技能 | Stop | stop,Stop |  |
| Supplicant | 面板/技能 | MoveHoldPosition | move,HoldPos |  |
| Supplicant | 面板/技能 | Attack | attack,Execute |  |
| Supplicant | 面板/技能 | MovePatrol | move,Patrol |  |
| Supplicant | 面板/技能 | Rally | ProgressRally,Rally1 |  |
| Supplicant | 面板/技能 | Cancel | AdeptPhaseShiftCancel,Execute |  |
| Supplicant | 被动 | AlarakACMyLifefortheHighlord |  |  |
| Supplicant | 被动 | AlarakSupplicantMaxShields |  | HaveAlarakSupplicantMaxShields |
| Supplicant | 被动 | PHSupplicantShieldArmor |  | HaveSupplicantShieldArmor |
| Supplicant | 被动 | AlarakSupplicantSacrificeCDR |  | HaveAlarakSupplicantSacrificeCDR |
| Supplicant | 被动 | SupplicantSacrificeCDRLocked |  | AlarakLevel15 |

## 原始ID列表

- AbilData.xml：
  - AlarakACSummonDeathfleet
  - AlarakACSummonDeathfleetTarget
  - AlarakStructureOvercharge
  - AscendantSacrifice
  - AscendantSacrificeInstant
  - Blink
  - BlinkSlayer
  - Charge
  - DarkPylonMorph
  - GatewayTrain
  - NexusBuild
  - ObserverTargetLock
  - PhotonOverchargeMorphPylonBack
  - SOADarkPylon
  - SOAPylonPower
  - SOAThermalLanceActivate
  - SOAThermalLanceExecute
  - VoidHighTemplarMindBlast
  - WarpGateTrainSupplicantTrue
- ButtonData.xml：
  - AlarackACHavocDetection
  - AlarackACResearchHavocDetection
  - AlarakACSummonDeathfleet
  - AlarakColossusAerialTracking
  - AlarakHavocAbilityRange
  - AlarakHighTemplarImprovedSacrifice
  - AlarakMothershipMassTeleport
  - AlarakResearchStalkerPhasingArmor
  - AlarakStalkerPhasingArmor
  - AlarakStructureOvercharge
  - AlarakSupplicantMaxShields
  - AlarakSupplicantSacrificeCDR
  - AlarakTargetLockBuff
  - AlarakVanguardIncreaseSplashArea
  - AscendantPassive
  - Charge
  - Gateway
  - HavocPermanentCloak
  - ResearchAlarakHavocAbilityRange
  - ResearchAlarakHavocAbilityRangeLocked
  - ResearchAlarakTargetLockBuff
  - ResearchHavocPermanentCloak
  - ResearchTargetLockBuffLocked
  - SlayerPassive
  - SOADarkPylon
  - SOAPylonPower
  - SupplicantSacrificeCDRLocked
  - VanguardArmoredDamage
  - VanguardMovingShot
  - WarpInSupplicant
  - WarpInSupplicantHidden
  - WarpInWarPrism
  - WrathwalkerPassive
- BehaviorData.xml：
  - AlarakACHavocDetection
  - AlarakStalkerPhasingArmor
  - AlarakStalkerPhasingArmorBuff
  - AlarakStructureOvercharge
  - AlarakStructureOverchargeShield
  - AlarakTheStrongestSurviveSupplicantSacrificeDamage
  - AscendantSacrificeSelfBuff
  - HavocPermanentCloak
  - ObserverTargetLock
  - PhaseBlinkDamage
  - SOAThermalLanceActivate
  - SupplicantCancelCheck
  - SupplicantCreatorCheck
  - SupplicantCreatorWarpGateCheck
  - SupplicantWarpPowerCheck
