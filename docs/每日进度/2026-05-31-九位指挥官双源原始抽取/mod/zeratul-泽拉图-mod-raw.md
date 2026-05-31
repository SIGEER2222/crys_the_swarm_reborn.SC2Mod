# 泽拉图 / Zeratul Mod 原始来源（中文整理）

- 模块：`XMZeratul.SC2Mod`
- 源目录：`C:\Users\22448\Downloads\重生虫心0.71汉化版（新）\reborn_workrepo\合作指挥官版起义狂潮\Mods\XM\XMZeratul.SC2Mod`
- 说明：直接从 UnitData.xml / AbilData.xml / ButtonData.xml / BehaviorData.xml 抽取，不引用旧汇总文档。

## 建筑

| 单位ID | 脚印 | 部署脚印 | 技能 | 行为 | 按钮 |
| --- | --- | --- | --- | --- | --- |
| Nexus | Footprint5x5NormalCreepContour | Footprint5x5DropOffCreepNormal | NexusBuild<br>PhotonOvercharge | ChronoBoostTarget | CommanderPrestigeKaraxChronoBoostLocked / Passive<br>AutomatedAssimilatorZeratul / NexusBuild,Build1 / AbilCmd |
| Probe |  |  | MapObjectInteract<br>MutatorRemoveWorkerSleep<br>SprayProtoss<br>ZeratulBuild | AllUnitBehaviorController | MapObjectInteract / MapObjectInteract,Execute / AbilCmd<br>MutatorWorkerSleep / MutatorRemoveWorkerSleep,Execute / AbilCmd<br>Spray / SprayProtoss,Execute / AbilCmd<br>WarpInWarpGate / ProtossBuild,Build30 / <br>Gateway / ProtossBuild,Build4 / <br>Gateway / ProtossBuild,Build26 / AbilCmd<br>ZeratulGateway / ZeratulBuild,Build2 / AbilCmd<br>ZeratulCyberneticsCore / ZeratulBuild,Build3 / AbilCmd<br>ZeratulPhotonCannon / ZeratulBuild,Build4 / AbilCmd<br>CommanderPrestigeKaraxPhotonCannonBuildLocked / Passive<br>BuildKhaydarinMonolithLocked / Passive<br>CommanderPrestigeKaraxKhaydarinMonolithBuildLocked / Passive<br>ShieldBattery / ProtossBuild,Build22 / AbilCmd<br>WarpInStarWarpGate / ProtossBuild,Build19 / <br><br>WarpInRoboticsWarpFacility / ProtossBuild,Build18 / <br><br>Stargate / ProtossBuild,Build10 / <br>RoboticsFacility / ProtossBuild,Build14 / AbilCmd<br>System.Xml.XmlElement / System.Xml.XmlElement<br>ZeratulRoboticsFacility / ZeratulBuild,Build7 / AbilCmd<br>ZeratulDarkShrine / ZeratulBuild,Build5 / AbilCmd<br>ZeratulRoboticsBay / ZeratulBuild,Build6 / AbilCmd<br>TwilightCouncil / ProtossBuild,Build7 / AbilCmd |

## 兵种

| 单位ID | 脚印 | 部署脚印 | 技能 | 行为 | 按钮 |
| --- | --- | --- | --- | --- | --- |
| CommanderPrestigeZeratulTornadoesTornado |  |  | attack<br>move<br>stop | CommanderPrestigeZeratulTornadoes | Move / move,Move / AbilCmd<br>Stop / stop,Stop / AbilCmd<br>MoveHoldPosition / move,HoldPos / AbilCmd<br>Attack / attack,Execute / AbilCmd<br>MovePatrol / move,Patrol / AbilCmd |
| Zeratul |  |  |  |  |  |
| ZeratulVoid |  |  |  |  |  |
| ZeratulVoidAiur01 |  |  |  |  |  |

## 面板与技能

| 来源单位 | 类型 | Face | AbilCmd | Requirements |
| --- | --- | --- | --- | --- |
| CommanderPrestigeZeratulTornadoesTornado | 面板/技能 | Move | move,Move |  |
| CommanderPrestigeZeratulTornadoesTornado | 面板/技能 | Stop | stop,Stop |  |
| CommanderPrestigeZeratulTornadoesTornado | 面板/技能 | MoveHoldPosition | move,HoldPos |  |
| CommanderPrestigeZeratulTornadoesTornado | 面板/技能 | Attack | attack,Execute |  |
| CommanderPrestigeZeratulTornadoesTornado | 面板/技能 | MovePatrol | move,Patrol |  |
| Nexus | 被动 | CommanderPrestigeKaraxChronoBoostLocked |  | CommanderPrestigeKaraxTopBar |
| Nexus | 面板/技能 | AutomatedAssimilatorZeratul | NexusBuild,Build1 |  |
| Probe | 面板/技能 | MapObjectInteract | MapObjectInteract,Execute |  |
| Probe | 面板/技能 | MutatorWorkerSleep | MutatorRemoveWorkerSleep,Execute |  |
| Probe | 面板/技能 | Spray | SprayProtoss,Execute |  |
| Probe | 面板/技能 | Gateway | ProtossBuild,Build26 |  |
| Probe | 面板/技能 | ZeratulGateway | ZeratulBuild,Build2 |  |
| Probe | 面板/技能 | ZeratulCyberneticsCore | ZeratulBuild,Build3 |  |
| Probe | 面板/技能 | ZeratulPhotonCannon | ZeratulBuild,Build4 |  |
| Probe | 被动 | CommanderPrestigeKaraxPhotonCannonBuildLocked |  | CommanderPrestigeKaraxArmy |
| Probe | 被动 | BuildKhaydarinMonolithLocked |  | KaraxLevel05 |
| Probe | 被动 | CommanderPrestigeKaraxKhaydarinMonolithBuildLocked |  | CommanderPrestigeKaraxArmy |
| Probe | 面板/技能 | ShieldBattery | ProtossBuild,Build22 |  |
| Probe | 面板/技能 | RoboticsFacility | ProtossBuild,Build14 |  |
| Probe | 面板/技能 | ZeratulRoboticsFacility | ZeratulBuild,Build7 |  |
| Probe | 面板/技能 | ZeratulDarkShrine | ZeratulBuild,Build5 |  |
| Probe | 面板/技能 | ZeratulRoboticsBay | ZeratulBuild,Build6 |  |
| Probe | 面板/技能 | TwilightCouncil | ProtossBuild,Build7 |  |

## 原始ID列表

- AbilData.xml：
  - AlarakACDeadlyCharge
  - AlarakStructureOvercharge
  - Blink
  - BlinkSlayer
  - Charge
  - ChargeBuster
  - ChargedBuster
  - DarkArchonMindControl
  - FenixKaldalisZealotCharge
  - FenixPurificationNova
  - FenixSoAWhirlwind
  - FenixThunderousChargeCoop
  - MutatorAmonZeratulBlink
  - NexusBuild
  - NovaBlink
  - PhotonOverchargeMorphDarkPylonBack
  - ShieldBatteryStructureBarrier
  - VoidZealotWhirlwind
- ButtonData.xml：
  - AlarakColossusChargedBlastChargeTime
  - AlarakDeadlyCharge
  - AlarakStructureOvercharge
  - BlinkNova
  - Charge
  - FenixDragoonChargeBuster
  - FenixDragoonChargedBuster
  - FenixKaldalisZealotCharge
  - FenixPurificationNova
  - FenixThunderousChargeCoop
  - ImmortalBarrierBase
  - MaelstromRounds
  - MutatorAmonZeratulBlink
  - ResearchAlarakColossusChargedBlastAirAttack
  - ResearchAlarakColossusChargedBlastChargeTime
  - ResearchBarrier
  - ResearchBlinkCharges
  - ResearchBlinkShieldRestore
  - ResearchDarkArchonMindControl
  - ResearchHHTacticalJumpCharges
  - ResearchMaelstromRounds
  - ResearchMindControlLocked
  - ResearchShadowCharge
  - ResearchStructureBarrier
  - ResearchWarpGateCharges
  - ResearchWhirlwind
  - ShieldBatteryStructureBarrier
  - VoidZealotWhirlwind
  - ZeratulBlink
  - ZeratulDarkArchonMindControl
  - ZeratulZorayaVoidPrismaticRange
- BehaviorData.xml：
  - AlarakStructureOvercharge
  - AlarakStructureOverchargeShield
  - ChargeBuster
  - ChargeBusterExpiring
  - DarkArchonMindControl
  - DarkPylonPowerSourceMasteryVorazunDarkPylonRadius10
  - DarkPylonPowerSourceMasteryVorazunDarkPylonRadius13
  - DarkPylonPowerSourceMasteryVorazunDarkPylonRadius16
  - FenixClolarionChargeBeamPhase2
  - FenixClolarionChargeBeamPhase3
  - FenixProbiusProbe
  - FenixSOAWhirlwind
  - FenixThunderousChargeCoopCharging
  - KaraxUnitSpawnBarrier
  - ShieldBatteryStructureBarrier
