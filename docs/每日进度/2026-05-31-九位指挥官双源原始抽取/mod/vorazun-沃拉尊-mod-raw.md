# 沃拉尊 / Vorazun Mod 原始来源（中文整理）

- 模块：`XMVorazun.SC2Mod`
- 源目录：`C:\Users\22448\Downloads\重生虫心0.71汉化版（新）\reborn_workrepo\合作指挥官版起义狂潮\Mods\XM\XMVorazun.SC2Mod`
- 说明：直接从 UnitData.xml / AbilData.xml / ButtonData.xml / BehaviorData.xml 抽取，不引用旧汇总文档。

## 建筑

| 单位ID | 脚印 | 部署脚印 | 技能 | 行为 | 按钮 |
| --- | --- | --- | --- | --- | --- |
| Assimilator |  |  |  |  |  |
| Gateway | Footprint3x3CreepNormalContour | Footprint3x3CreepNormal | GatewayTrain<br>que5notPassive<br>Rally<br>UpgradeToWarpGate | ChronoBoostTarget |  / que5notPassive,CancelLast / <br>Zealot / GatewayTrain,Train1 / AbilCmd<br>WarpInSupplicant / GatewayTrain,Train11 / AbilCmd<br>Stalker / GatewayTrain,Train2 / AbilCmd<br>WarpinAscendentLocked / Passive<br>Sentry / GatewayTrain,Train6 / AbilCmd<br>Monitor / GatewayTrain,Train10 / AbilCmd<br>SentryFenix / GatewayTrain,Train15 / AbilCmd<br>DarkArchon / GatewayTrain,Train9 / AbilCmd<br>WarpInDarkArchonLocked / Passive<br>AlarakMasteryUnitAttackSpeed / Passive |
| Nexus | Footprint5x5NormalCreepContour | Footprint5x5DropOffCreepNormal | NexusBuild<br>PhotonOvercharge | ChronoBoostTarget | CommanderPrestigeKaraxChronoBoostLocked / Passive |
| Pylon | Footprint2x2CreepNormalContour | Footprint2x2CreepNormal | DarkPylonMorph<br>PhotonOverchargeMorphPylon |  | System.Xml.XmlElement / System.Xml.XmlElement / System.Xml.XmlElement<br><br> |
| SoACasterVorazun |  |  | CommanderPrestigeVorazunTimeStop<br>SOADarkPylon<br>SOAShadowGuardCalldown<br>SOATimeFreeze<br>VoidSentryBlackHole | CommanderPrestigeVorazunTimeStopCount | CancelBuilding / BuildInProgress,Cancel / AbilCmd<br>SOADarkPylon / SOADarkPylon,Build1 / AbilCmd<br>SOAVorazunBlackHole / VoidSentryBlackHole,Execute / AbilCmd<br>SOAShadowGuardCalldown / SOAShadowGuardCalldown,Execute / AbilCmd<br>SOATimeFreeze / SOATimeFreeze,Execute / AbilCmd<br>SOATimeFreeze / CommanderPrestigeVorazunTimeStop,Execute / AbilCmd<br>SOATimeStopLocked / Passive<br>RecallOnDeathPassive / Passive<br>RecallonDeathPassiveLocked / Passive<br>SOAStrikefromtheShadows / Passive<br>StrikefromtheShadowsLocked / Passive |

## 兵种

| 单位ID | 脚印 | 部署脚印 | 技能 | 行为 | 按钮 |
| --- | --- | --- | --- | --- | --- |
| DarkArchon |  |  |  | AllUnitBehaviorController | MindControlLocked / Passive<br>DarkArchonConfusion / DarkArchonConfusion,Execute / AbilCmd<br>HaveDarkArchonFullStartingEnergy / Passive |
| SMX2ProtossVorazun |  |  |  |  |  |
| VorazunChampion |  |  |  |  |  |
| VorazunShadowGuard |  |  | attack<br>move<br>ProgressRally<br>ShadowGuardShadowDash<br>ShadowGuardShadowFury<br>ShadowGuardVoidStasis<br>stop<br>Warpable | AllUnitBehaviorController<br>ShadowGuardDetectionDisableAura<br>VoidDetectorRadar<br>VorazunCloakedShieldRegenPermanent | Move / move,Move / AbilCmd<br>Stop / stop,Stop / AbilCmd<br>MoveHoldPosition / move,HoldPos / AbilCmd<br>Attack / attack,Execute / AbilCmd<br>MovePatrol / move,Patrol / AbilCmd<br>ShadowGuardBlink / ShadowGuardShadowDash,Execute / AbilCmd<br>VoidShadowGuardShadowFury / ShadowGuardShadowFury,Execute / AbilCmd<br>VoidStasis / ShadowGuardVoidStasis,Execute / AbilCmd<br>ShadowGuardPermanentlyCloaked / Passive |

## 面板与技能

| 来源单位 | 类型 | Face | AbilCmd | Requirements |
| --- | --- | --- | --- | --- |
| DarkArchon | 被动 | MindControlLocked |  | VorazunLevel09 |
| DarkArchon | 面板/技能 | DarkArchonConfusion | DarkArchonConfusion,Execute |  |
| DarkArchon | 被动 | HaveDarkArchonFullStartingEnergy |  | HaveDarkArchonFullStartingEnergy |
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
| SoACasterVorazun | 面板/技能 | CancelBuilding | BuildInProgress,Cancel |  |
| SoACasterVorazun | 面板/技能 | SOADarkPylon | SOADarkPylon,Build1 |  |
| SoACasterVorazun | 面板/技能 | SOAVorazunBlackHole | VoidSentryBlackHole,Execute |  |
| SoACasterVorazun | 面板/技能 | SOAShadowGuardCalldown | SOAShadowGuardCalldown,Execute |  |
| SoACasterVorazun | 面板/技能 | SOATimeFreeze | SOATimeFreeze,Execute |  |
| SoACasterVorazun | 面板/技能 | SOATimeFreeze | CommanderPrestigeVorazunTimeStop,Execute |  |
| SoACasterVorazun | 被动 | SOATimeStopLocked |  | VorazunLevel10 |
| SoACasterVorazun | 被动 | RecallOnDeathPassive |  | HaveSOARecallonDeath |
| SoACasterVorazun | 被动 | RecallonDeathPassiveLocked |  | VorazunLevel13 |
| SoACasterVorazun | 被动 | SOAStrikefromtheShadows |  | HaveVorazunCloakDamageBoost |
| SoACasterVorazun | 被动 | StrikefromtheShadowsLocked |  | VorazunLevel15 |
| VorazunShadowGuard | 面板/技能 | Move | move,Move |  |
| VorazunShadowGuard | 面板/技能 | Stop | stop,Stop |  |
| VorazunShadowGuard | 面板/技能 | MoveHoldPosition | move,HoldPos |  |
| VorazunShadowGuard | 面板/技能 | Attack | attack,Execute |  |
| VorazunShadowGuard | 面板/技能 | MovePatrol | move,Patrol |  |
| VorazunShadowGuard | 面板/技能 | ShadowGuardBlink | ShadowGuardShadowDash,Execute |  |
| VorazunShadowGuard | 面板/技能 | VoidShadowGuardShadowFury | ShadowGuardShadowFury,Execute |  |
| VorazunShadowGuard | 面板/技能 | VoidStasis | ShadowGuardVoidStasis,Execute |  |
| VorazunShadowGuard | 被动 | ShadowGuardPermanentlyCloaked |  |  |

## 原始ID列表

- AbilData.xml：
  - ArchonWarp
  - Blink
  - BlinkSlayer
  - Charge
  - CommanderPrestigeVorazunTimeStop
  - CyberneticsCoreResearch
  - DarkArchonMerge
  - DarkArchonMindControl
  - DarkPylonMorph
  - DarkPylonRecall
  - DarkShrineResearch
  - FusionCoreResearch
  - GatewayTrain
  - MorphBackToGateway
  - NexusBuild
  - NovaBlink
  - PhotonOverchargeMorphDarkPylonBack
  - PhotonOverchargeMorphPylonBack
  - Rally
  - RallyReviveBeacon
  - RoboticsFacilityWarpTrain
  - SIStukovPlaceHordeRally
  - SOADarkPylon
  - SOAPylonPower
  - SOARecall
  - SpawnChangeling
  - StargateTrain
  - StargateWarpTrain
  - TimeWarp
  - TwilightCouncilResearch
  - UpgradeToWarpGate
  - VoidDarkTemplarShadowFury
  - VoidSentryBlackHole
  - VorazunGatewayHangar
  - VorazunStargateHangar
  - VorazunWarpGateTrain
  - WarpableNova
  - WarpGateTrain
  - WarpPrismTransport
- ButtonData.xml：
  - AlarakResearchStalkerPhasingArmor
  - AlarakStalkerForceBlast
  - AlarakStalkerPhasingArmor
  - BlinkNova
  - BuildVespeneGasDrill
  - Charge
  - CommanderPrestigeVorazunRecallLocked
  - CommanderVorazunDarkArchonPassiveLocked
  - DarkArchon
  - DarkPylonRecall
  - FenixWarpinDisruptorLocked
  - Gateway
  - OracleBuildStasisTrap
  - PermanentlyCloakedCorsair
  - ResearchAlarakStalkerForceBlast
  - ResearchBlinkCharges
  - ResearchBlinkShieldRestore
  - ResearchCorsairDisruptionWeb
  - ResearchCorsairPermanentCloak
  - ResearchCorsairPermanentCloakLocked
  - ResearchDarkArchonFullStartingEnergy
  - ResearchDarkArchonFullStartingEnergyLocked
  - ResearchDarkArchonMindControl
  - ResearchDarkTemplarRecall
  - ResearchMindControlLocked
  - ResearchOracleStasisWardUpgrade
  - ResearchOracleStasisWardUpgradeLocked
  - ResearchOracleWormhole
  - ResearchPrismaticRangeLocked
  - ResearchShadowCharge
  - ResearchShadowFury
  - ResearchStalkerTeleport
  - ResearchVoidRayVoidPrismaticRange
  - ResearchVoidStasis
  - ResearchVoidStasisLocked
  - ResearchWarpGateCharges
  - SIStukovPlaceHordeRally
  - SIStukovPlaceHordeRallyTopBar
  - SOADarkPylon
  - SOAPylonPower
  - SOAVorazunBlackHole
  - Stargate
  - TimeWarp
  - TransformToRoboticsWarpFacilityLocked
  - VoidSentryBlackHole
  - VoidStalkerDragoonRange
  - VoidStasis
  - VorazunDarkTemplarRadar
  - WarpInAdept
  - WarpinDisruptor
  - WarpInSupplicant
  - WarpInWarPrism
  - WarpPrism
  - ZeratulBlink
- BehaviorData.xml：
  - AlarakReviveWarpIn
  - AlarakReviveWarpInIntro
  - AlarakStalkerPhasingArmor
  - AlarakStalkerPhasingArmorBuff
  - CarryHarvestableVespeneGeyserGas
  - CarryHarvestableVespeneGeyserGasProtoss
  - CarryHarvestableVespeneGeyserGasZerg
  - CommanderPrestigeVorazunTimeStopCount
  - CommanderPrestigeVorazunTimeStopDeathWatch
  - CorsairPermanentCloak
  - DarkArchonMindControl
  - NovaBlinkAbsorb
  - OnDeathVorazunRecallOnDeath
  - OracleStasisTrapStunTarget
  - PhaseBlinkDamage
  - ShadowGuardSpawnDelay
  - ShadowGuardSpawnPrecursor
  - ShadowGuardTimedLife
  - ShadowGuardTimedLifeExpire
  - SOARecallOnDeathRecentlyRecalled
  - SOASummonFenixWarpIn
  - SOASummonFenixWarpOutAnimation
  - SymbioteRecall
  - TimeStopHaste
  - TimeWarpProduction
  - VoidSentryBlackHole
  - VorazunDarkTemplarRadar
  - WarpGateAutoCastDisabler
