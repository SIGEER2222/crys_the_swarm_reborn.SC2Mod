# 扎加拉 / Zagara Mod 原始来源（中文整理）

- 模块：`XMZagara.SC2Mod`
- 源目录：`C:\Users\22448\Downloads\重生虫心0.71汉化版（新）\reborn_workrepo\合作指挥官版起义狂潮\Mods\XM\XMZagara.SC2Mod`
- 说明：直接从 UnitData.xml / AbilData.xml / ButtonData.xml / BehaviorData.xml 抽取，不引用旧汇总文档。

## 建筑

| 单位ID | 脚印 | 部署脚印 | 技能 | 行为 | 按钮 |
| --- | --- | --- | --- | --- | --- |
| BileLauncherZagara | Footprint2x2CreepContour | Footprint2x2Creep | BileLauncherZagaraAttack<br>BuildInProgress<br>stop | OnCreep<br>UnderConstruction<br>ZergBuildingNotOnCreep | CancelBuilding / BuildInProgress,Cancel / AbilCmd<br>Stop / stop,Stop / AbilCmd<br>BileLauncherBombardment / BileLauncherZagaraAttack,Barrage / AbilCmd<br>ArtilleryDuctsPassive / Passive<br>RapidBombardmentPassive / Passive |
| Extractor |  |  |  |  |  |
| Hatchery |  |  | UpgradeToLairInstantFree | ChronoBoostTarget<br>HatcheryDoubleQueue<br>HatcheryLarvaDeath | QueenCoop / TrainQueen,Train4 / <br>RespawnZergling / ZerglingRespawn,Execute / <br>K5TwoDrones / Passive<br>RallyEgg / RallyHatchery,Rally3 / AbilCmd<br>Queen / TrainQueen,Train1 / AbilCmd<br>BuildCreepTumor / CreepTumorBuild,Build3 / AbilCmd<br>overlordspeed / LairResearch,Research7 / AbilCmd |
| Queen |  |  | BioMechanicalTransfusion<br>EvolveToBrutaliskQueen<br>que1 | AllUnitBehaviorController | BurrowDown / BurrowQueenDown,Execute / <br>DeepTunnel / DeepTunnel,Execute / <br>Cancel / KerriganEnhance,Off / <br>BuildCreepTumor / QueenBuild,Build3 / <br>QueenBurstHeal / QueenBurstHeal,Execute / <br>BiomassPassiveEnergy / Passive<br>BiomassPassiveEmpty / Passive<br>BioMechanicalTransfusion / BioMechanicalTransfusion,Execute / AbilCmd<br>CommanderPrestigeAbathurBrutaliskLocked / Passive<br>EvolveToBrutalisk / EvolveToBrutaliskQueen,Train1 / AbilCmd<br>EvolveToBrutaliskLocked / Passive<br>BioMechanicalTransfusionPassive / Passive |
| QueenBurrowed |  |  | EvolveToBrutaliskQueen<br>que1 | AllUnitBehaviorController | CommanderPrestigeAbathurBrutaliskLocked / Passive<br>EvolveToBrutalisk / EvolveToBrutaliskQueen,Train1 / AbilCmd<br>EvolveToBrutaliskLocked / Passive<br>BiomassPassiveEnergy / Passive<br>BiomassPassiveEmpty / Passive |
| Scourge |  |  | ScourgeDetonate<br>SuicideBuilding | AllUnitBehaviorController<br>NoScrapDrop<br>SupplyLT1 | ScourgeSplashDamagePassive / Passive<br>DetonateScourge / ScourgeDetonate,Execute / AbilCmd<br>EnableBuildingAttackScourge / SuicideBuilding,On / AbilCmd<br>DisableBuildingAttackScourge / SuicideBuilding,Off / AbilCmd<br>HaveScourgeGasCostReduction / Passive |

## 兵种

| 单位ID | 脚印 | 部署脚印 | 技能 | 行为 | 按钮 |
| --- | --- | --- | --- | --- | --- |
| Baneling |  |  | attack<br>BurrowUltraliskDown<br>BurrowUltraliskUp<br>Explode<br>move<br>stop<br>VolatileBurstBuilding | AllUnitBehaviorController<br>NoScrapDrop<br>SupplyLT1 | <br><br><br> / Explode,Execute / <br>HaveCentrificalHooks / Passive |
| CoopCasterZagara |  |  |  |  |  |
| Overlord |  |  |  | AllUnitBehaviorController<br>GenerateCreepHealingBehavior<br>SupplyLT1 | HaveOverlordSpeed / Passive |
| SMX1Zagara |  |  |  |  |  |
| ZaGara |  |  |  |  |  |
| ZagaraAcidSalivaWeapon |  |  |  |  |  |
| ZaGaraBurrowed |  |  |  |  |  |
| ZagaraCorruptor |  |  | attack<br>Corruption<br>move<br>stop | AllUnitBehaviorController<br>CorruptorScourgeIncubation | Move / move,Move / AbilCmd<br>Stop / stop,Stop / AbilCmd<br>MoveHoldPosition / move,HoldPos / AbilCmd<br>Attack / attack,Execute / AbilCmd<br>MovePatrol / move,Patrol / AbilCmd<br>CorruptionAbility / Corruption,Execute / AbilCmd<br>ZagaraVoidCoopIncubateSourges / Passive<br>CorruptorScourgeIncubationLocked / Passive<br>Cancel / Corruption,Cancel / AbilCmd |
| ZagaraHunterKillerWeapon |  |  |  |  |  |
| ZagaraParasiteSporeWeapon |  |  |  |  |  |
| ZagaraReviveCocoon |  |  | ZagaraVoidCoopBanelingBarrage<br>ZagaraVoidCoopMassFrenzy<br>ZagaraVoidCoopMassRoachDrop<br>ZagaraVoidCoopSpawnHunterKillers | Unmoved<br>Unrepairable | ZagaraVoidCoopRelentlessSwarmer / Passive<br>ZagaraVoidCoopBanelingSpawner / Passive<br>VolatileNestLocked / Passive<br>ZagaraVoidCoopAttackUpgrade / Passive<br>MedusasBladesLocked / Passive<br>ZagaraVoidCoopBanelingBarrage / ZagaraVoidCoopBanelingBarrage,Execute / AbilCmd<br>ZagaraVoidCoopSpawnHunterKillers / ZagaraVoidCoopSpawnHunterKillers,Execute / AbilCmd<br>ZagaraVoidCoopMassFrenzy / ZagaraVoidCoopMassFrenzy,Execute / AbilCmd<br>MassRoachDrop / ZagaraVoidCoopMassRoachDrop,Execute / AbilCmd<br>ZagaraVoidCoopMassRoachDropLocked / Passive |
| ZagarasInitialCocoonBlocker | CocoonBlocker |  |  |  |  |
| ZagaraVoidCoop |  |  | attack<br>CommanderPrestigeZagaraZagaraDeepTunnel<br>move<br>stop<br>ZagaraVoidCoopBanelingBarrage<br>ZagaraVoidCoopBurrow<br>ZagaraVoidCoopCreepMaster<br>ZagaraVoidCoopDeepTunnel<br>ZagaraVoidCoopDevouringMaw<br>ZagaraVoidCoopMassFrenzy<br>ZagaraVoidCoopMassRoachDrop<br>ZagaraVoidCoopNydusWorm<br>ZagaraVoidCoopSpawnBroodlings<br>ZagaraVoidCoopSpawnHunterKillers<br>ZagaraVoidCoopSpawnMutalisk<br>ZagaraVoidCoopTransfusionWave<br>ZagaraVoidCoopWildInfestation | AllUnitBehaviorController<br>HeroCCImmunity<br>HeroicFortitude<br>KerriganUnburrowedDummy<br>KerriganVeterancyDummy<br>ZagaraVoidCoopCreepMasterRegen | MoveChampions / move,Move / AbilCmd<br>Stop / stop,Stop / AbilCmd<br>MoveHoldPosition / move,HoldPos / AbilCmd<br>MovePatrol / move,Patrol / AbilCmd<br>AttackChampions / attack,Execute / AbilCmd<br>ZagaraVoidCoopRelentlessSwarmer / Passive<br>ZagaraVoidCoopBanelingSpawner / Passive<br>VolatileNestLocked / Passive<br>ZagaraVoidCoopAttackUpgrade / Passive<br>MedusasBladesLocked / Passive<br>ZagaraVoidCoopBanelingBarrage / ZagaraVoidCoopBanelingBarrage,Execute / AbilCmd<br>ZagaraVoidCoopSpawnHunterKillers / ZagaraVoidCoopSpawnHunterKillers,Execute / AbilCmd<br>ZagaraVoidCoopMassFrenzy / ZagaraVoidCoopMassFrenzy,Execute / AbilCmd<br>MassRoachDrop / ZagaraVoidCoopMassRoachDrop,Execute / AbilCmd<br>ZagaraVoidCoopMassRoachDropLocked / Passive<br>BurrowDown / ZagaraVoidCoopBurrow,Execute / AbilCmd<br>CommanderPrestigeZagaraZagaraDeepTunnel / CommanderPrestigeZagaraZagaraDeepTunnel,Execute / AbilCmd |
| ZagaraVoidCoopBanelingBarrageWeapon |  |  |  |  |  |
| ZagaraVoidCoopBurrowed |  |  | ZagaraVoidCoopBanelingBarrage<br>ZagaraVoidCoopBurrow<br>ZagaraVoidCoopCreepMaster<br>ZagaraVoidCoopDeepTunnel<br>ZagaraVoidCoopDevouringMaw<br>ZagaraVoidCoopMassFrenzy<br>ZagaraVoidCoopMassRoachDrop<br>ZagaraVoidCoopNydusWorm<br>ZagaraVoidCoopSpawnBroodlings<br>ZagaraVoidCoopSpawnHunterKillers<br>ZagaraVoidCoopSpawnMutalisk<br>ZagaraVoidCoopTransfusionWave<br>ZagaraVoidCoopUnburrow<br>ZagaraVoidCoopWildInfestation | AllUnitBehaviorController<br>HeroCCImmunity<br>HeroicFortitude<br>KerriganVeterancyDummy<br>ZagaraVoidCoopBurrowedDisabler<br>ZagaraVoidCoopCreepMasterRegen | MoveChampions / move,Move / AbilCmd<br>Stop / stop,Stop / AbilCmd<br>MoveHoldPosition / move,HoldPos / AbilCmd<br>AttackChampions / attack,Execute / AbilCmd<br>AcquireMove / move,AcquireMove / AbilCmd<br>MovePatrol / move,Patrol / AbilCmd<br>ZagaraVoidCoopRelentlessSwarmer / Passive<br>ZagaraVoidCoopBanelingSpawner / Passive<br>VolatileNestLocked / Passive<br>ZagaraVoidCoopAttackUpgrade / Passive<br>MedusasBladesLocked / Passive<br>ZagaraVoidCoopBanelingBarrage / ZagaraVoidCoopBanelingBarrage,Execute / AbilCmd<br>ZagaraVoidCoopSpawnHunterKillers / ZagaraVoidCoopSpawnHunterKillers,Execute / AbilCmd<br>ZagaraVoidCoopMassFrenzy / ZagaraVoidCoopMassFrenzy,Execute / AbilCmd<br>MassRoachDrop / ZagaraVoidCoopMassRoachDrop,Execute / AbilCmd<br>ZagaraVoidCoopMassRoachDropLocked / Passive<br>BurrowUp / ZagaraVoidCoopUnburrow,Execute / AbilCmd |
| ZagaraVoidCoopCollectEssenceDummyAttackMissile |  |  |  |  |  |
| ZagaraVoidCoopDevouringMaw |  |  | attack<br>move<br>stop | ZagaraVoidCoopDevouringMawWormBehavior | Move / move,Move / AbilCmd<br>Stop / stop,Stop / AbilCmd<br>MoveHoldPosition / move,HoldPos / AbilCmd<br>Attack / attack,Execute / AbilCmd<br>MovePatrol / move,Patrol / AbilCmd |
| ZagaraVoidCoopRangedWeapon |  |  |  |  |  |
| ZagaraVoidCoopSpawnBroodlingsMissile |  |  |  |  |  |

## 面板与技能

| 来源单位 | 类型 | Face | AbilCmd | Requirements |
| --- | --- | --- | --- | --- |
| Baneling | 被动 | HaveCentrificalHooks |  | ZagaraHaveCentrificalHooks |
| BileLauncherZagara | 面板/技能 | CancelBuilding | BuildInProgress,Cancel |  |
| BileLauncherZagara | 面板/技能 | Stop | stop,Stop |  |
| BileLauncherZagara | 面板/技能 | BileLauncherBombardment | BileLauncherZagaraAttack,Barrage |  |
| BileLauncherZagara | 被动 | ArtilleryDuctsPassive |  | HaveArtilleryDucts |
| BileLauncherZagara | 被动 | RapidBombardmentPassive |  | HaveRapidBombardment |
| Hatchery | 被动 | K5TwoDrones |  | HaveK5TwoDrones |
| Hatchery | 面板/技能 | RallyEgg | RallyHatchery,Rally3 |  |
| Hatchery | 面板/技能 | Queen | TrainQueen,Train1 |  |
| Hatchery | 面板/技能 | BuildCreepTumor | CreepTumorBuild,Build3 |  |
| Hatchery | 面板/技能 | overlordspeed | LairResearch,Research7 |  |
| Overlord | 被动 | HaveOverlordSpeed |  | HavePneumatizedCarapace |
| Queen | 被动 | BiomassPassiveEnergy |  | BiomassBuffVisible |
| Queen | 被动 | BiomassPassiveEmpty |  | BiomassBuffEmptyVisible |
| Queen | 面板/技能 | BioMechanicalTransfusion | BioMechanicalTransfusion,Execute |  |
| Queen | 被动 | CommanderPrestigeAbathurBrutaliskLocked |  | CommanderPrestigeAbathurBiomass |
| Queen | 面板/技能 | EvolveToBrutalisk | EvolveToBrutaliskQueen,Train1 |  |
| Queen | 被动 | EvolveToBrutaliskLocked |  | AbathurLevel02 |
| Queen | 被动 | BioMechanicalTransfusionPassive |  | HaveBioMechanicalTransfusionPassive |
| QueenBurrowed | 被动 | CommanderPrestigeAbathurBrutaliskLocked |  | CommanderPrestigeAbathurBiomass |
| QueenBurrowed | 面板/技能 | EvolveToBrutalisk | EvolveToBrutaliskQueen,Train1 |  |
| QueenBurrowed | 被动 | EvolveToBrutaliskLocked |  | AbathurLevel02 |
| QueenBurrowed | 被动 | BiomassPassiveEnergy |  | BiomassBuffVisible |
| QueenBurrowed | 被动 | BiomassPassiveEmpty |  | BiomassBuffEmptyVisible |
| Scourge | 被动 | ScourgeSplashDamagePassive |  | HaveScourgeSplashDamage |
| Scourge | 面板/技能 | DetonateScourge | ScourgeDetonate,Execute |  |
| Scourge | 面板/技能 | EnableBuildingAttackScourge | SuicideBuilding,On |  |
| Scourge | 面板/技能 | DisableBuildingAttackScourge | SuicideBuilding,Off |  |
| Scourge | 被动 | HaveScourgeGasCostReduction |  | HaveScourgeGasCostReduction |
| ZagaraCorruptor | 面板/技能 | Move | move,Move |  |
| ZagaraCorruptor | 面板/技能 | Stop | stop,Stop |  |
| ZagaraCorruptor | 面板/技能 | MoveHoldPosition | move,HoldPos |  |
| ZagaraCorruptor | 面板/技能 | Attack | attack,Execute |  |
| ZagaraCorruptor | 面板/技能 | MovePatrol | move,Patrol |  |
| ZagaraCorruptor | 面板/技能 | CorruptionAbility | Corruption,Execute |  |
| ZagaraCorruptor | 被动 | ZagaraVoidCoopIncubateSourges |  | HaveZagaraVoidCoopAberrationBanelingIncubation |
| ZagaraCorruptor | 被动 | CorruptorScourgeIncubationLocked |  | ZagaraLevel08 |
| ZagaraCorruptor | 面板/技能 | Cancel | Corruption,Cancel |  |
| ZagaraReviveCocoon | 被动 | ZagaraVoidCoopRelentlessSwarmer |  |  |
| ZagaraReviveCocoon | 被动 | ZagaraVoidCoopBanelingSpawner |  | HaveZagaraVoidCoopBanelingSpawner |
| ZagaraReviveCocoon | 被动 | VolatileNestLocked |  | ZagaraLevel07 |
| ZagaraReviveCocoon | 被动 | ZagaraVoidCoopAttackUpgrade |  | HaveZagaraVoidCoopAttackUpgrade |
| ZagaraReviveCocoon | 被动 | MedusasBladesLocked |  | ZagaraLevel09 |
| ZagaraReviveCocoon | 面板/技能 | ZagaraVoidCoopBanelingBarrage | ZagaraVoidCoopBanelingBarrage,Execute |  |
| ZagaraReviveCocoon | 面板/技能 | ZagaraVoidCoopSpawnHunterKillers | ZagaraVoidCoopSpawnHunterKillers,Execute |  |
| ZagaraReviveCocoon | 面板/技能 | ZagaraVoidCoopMassFrenzy | ZagaraVoidCoopMassFrenzy,Execute |  |
| ZagaraReviveCocoon | 面板/技能 | MassRoachDrop | ZagaraVoidCoopMassRoachDrop,Execute |  |
| ZagaraReviveCocoon | 被动 | ZagaraVoidCoopMassRoachDropLocked |  | ZagaraLevel02 |
| ZagaraVoidCoop | 面板/技能 | MoveChampions | move,Move |  |
| ZagaraVoidCoop | 面板/技能 | Stop | stop,Stop |  |
| ZagaraVoidCoop | 面板/技能 | MoveHoldPosition | move,HoldPos |  |
| ZagaraVoidCoop | 面板/技能 | MovePatrol | move,Patrol |  |
| ZagaraVoidCoop | 面板/技能 | AttackChampions | attack,Execute |  |
| ZagaraVoidCoop | 被动 | ZagaraVoidCoopRelentlessSwarmer |  |  |
| ZagaraVoidCoop | 被动 | ZagaraVoidCoopBanelingSpawner |  | HaveZagaraVoidCoopBanelingSpawner |
| ZagaraVoidCoop | 被动 | VolatileNestLocked |  | ZagaraLevel07 |
| ZagaraVoidCoop | 被动 | ZagaraVoidCoopAttackUpgrade |  | HaveZagaraVoidCoopAttackUpgrade |
| ZagaraVoidCoop | 被动 | MedusasBladesLocked |  | ZagaraLevel09 |
| ZagaraVoidCoop | 面板/技能 | ZagaraVoidCoopBanelingBarrage | ZagaraVoidCoopBanelingBarrage,Execute |  |
| ZagaraVoidCoop | 面板/技能 | ZagaraVoidCoopSpawnHunterKillers | ZagaraVoidCoopSpawnHunterKillers,Execute |  |
| ZagaraVoidCoop | 面板/技能 | ZagaraVoidCoopMassFrenzy | ZagaraVoidCoopMassFrenzy,Execute |  |
| ZagaraVoidCoop | 面板/技能 | MassRoachDrop | ZagaraVoidCoopMassRoachDrop,Execute |  |
| ZagaraVoidCoop | 被动 | ZagaraVoidCoopMassRoachDropLocked |  | ZagaraLevel02 |
| ZagaraVoidCoop | 面板/技能 | BurrowDown | ZagaraVoidCoopBurrow,Execute |  |
| ZagaraVoidCoop | 面板/技能 | CommanderPrestigeZagaraZagaraDeepTunnel | CommanderPrestigeZagaraZagaraDeepTunnel,Execute |  |
| ZagaraVoidCoopBurrowed | 面板/技能 | MoveChampions | move,Move |  |
| ZagaraVoidCoopBurrowed | 面板/技能 | Stop | stop,Stop |  |
| ZagaraVoidCoopBurrowed | 面板/技能 | MoveHoldPosition | move,HoldPos |  |
| ZagaraVoidCoopBurrowed | 面板/技能 | AttackChampions | attack,Execute |  |
| ZagaraVoidCoopBurrowed | 面板/技能 | AcquireMove | move,AcquireMove |  |
| ZagaraVoidCoopBurrowed | 面板/技能 | MovePatrol | move,Patrol |  |
| ZagaraVoidCoopBurrowed | 被动 | ZagaraVoidCoopRelentlessSwarmer |  |  |
| ZagaraVoidCoopBurrowed | 被动 | ZagaraVoidCoopBanelingSpawner |  | HaveZagaraVoidCoopBanelingSpawner |
| ZagaraVoidCoopBurrowed | 被动 | VolatileNestLocked |  | ZagaraLevel07 |
| ZagaraVoidCoopBurrowed | 被动 | ZagaraVoidCoopAttackUpgrade |  | HaveZagaraVoidCoopAttackUpgrade |
| ZagaraVoidCoopBurrowed | 被动 | MedusasBladesLocked |  | ZagaraLevel09 |
| ZagaraVoidCoopBurrowed | 面板/技能 | ZagaraVoidCoopBanelingBarrage | ZagaraVoidCoopBanelingBarrage,Execute |  |
| ZagaraVoidCoopBurrowed | 面板/技能 | ZagaraVoidCoopSpawnHunterKillers | ZagaraVoidCoopSpawnHunterKillers,Execute |  |
| ZagaraVoidCoopBurrowed | 面板/技能 | ZagaraVoidCoopMassFrenzy | ZagaraVoidCoopMassFrenzy,Execute |  |
| ZagaraVoidCoopBurrowed | 面板/技能 | MassRoachDrop | ZagaraVoidCoopMassRoachDrop,Execute |  |
| ZagaraVoidCoopBurrowed | 被动 | ZagaraVoidCoopMassRoachDropLocked |  | ZagaraLevel02 |
| ZagaraVoidCoopBurrowed | 面板/技能 | BurrowUp | ZagaraVoidCoopUnburrow,Execute |  |
| ZagaraVoidCoopDevouringMaw | 面板/技能 | Move | move,Move |  |
| ZagaraVoidCoopDevouringMaw | 面板/技能 | Stop | stop,Stop |  |
| ZagaraVoidCoopDevouringMaw | 面板/技能 | MoveHoldPosition | move,HoldPos |  |
| ZagaraVoidCoopDevouringMaw | 面板/技能 | Attack | attack,Execute |  |
| ZagaraVoidCoopDevouringMaw | 面板/技能 | MovePatrol | move,Patrol |  |

## 原始ID列表

- AbilData.xml：
  - BanelingNestResearch
  - BioMechanicalTransfusion
  - BurrowQueenUpCoop
  - CommanderPrestigeZagaraMaxSupplyScourgeSpawner
  - CorrosiveAcid
  - Corruption
  - EvolveToBrutaliskQueen
  - MutatorAmonZagaraBanelingBarrage
  - OverlordTransport
  - QueenBuild
  - QueenBurstHeal
  - RallyBanelingNest
  - ScourgeNestResearch
  - SIQueenFungalGrowth
  - SpawningPoolResearch
  - SpawnLarva
  - TrainQueen
  - Transfusion
  - ZagaraVoidCoopBanelingBarrage
  - ZagaraVoidCoopBanelingSpawner
  - ZagaraVoidCoopBanelingSpawnerTrain
  - ZagaraVoidCoopTransfusionWave
- ButtonData.xml：
  - AbathurSpawningPool
  - AberrationBanelingIncubationLocked
  - AberrationProtectiveCover
  - BioMechanicalTransfusion
  - CommanderPrestigeZagaraMaxSupplyScourgeSpawn
  - CorrosiveAcidDevourer
  - CorruptorPassive
  - DehakaHatchery
  - DisableBuildingAttackScourge
  - EnableBuildingAttackScourge
  - EvolveAberrationArmorAura
  - EvolveAberrationArmorAuraLocked
  - EvolveBanelingCorrosiveBile
  - EvolveBanelingHeal
  - EvolveBanelingRupture
  - EvolveBioMechanicalTransfusion
  - EvolveBioMechanicalTransfusionLocked
  - EvolveCorrosiveAcidLocked
  - EvolveHardenedCarapace
  - EvolveHardenedCarapaceLocked
  - EvolveHardenedCarapaceZagaraLocked
  - EvolveHatcheryDoubleQueue
  - EvolveHatcheryDoubleQueueLocked
  - EvolveQueenClassicFullStartingEnergy
  - EvolveQueenClassicImprovedEnsnare
  - EvolveRuptureLocked
  - EvolveScourgeGasCostReduction
  - EvolveScourgeSplashDamage
  - EvolveZerglingArmorShred
  - EvolveZerglingArmorShredLocked
  - EvolveZerglingArmorShredZagaraLocked
  - HaveOverlordSpeed
  - Queen
  - QueenClassic
  - QueenCoop
  - QueenofBladesLocked
  - Scourge
  - ScourgeNest
  - SIOverlord
  - SIQueenFungalGrowth
  - VolatileNestLocked
  - ZagaraQueenInjectLarvaLocked
  - ZagaraVoidCoopBanelingBarrage
  - ZagaraVoidCoopBanelingSpawner
  - ZagaraVoidCoopIncubateBanelings
  - ZagaraVoidCoopZerglingDodge
  - ZerglingArmorShred
- BehaviorData.xml：
  - AbberationBanelingIncubation
  - AberrationArmorAura
  - AberrationArmorAuraTarget
  - MasteryZagaraZerglingDodgeChance
  - QueenSpawnLarvaHiddenStack
  - QueenSpawnLarvaTimer
  - SIQueenFungalGrowth
  - SpawnLarva
  - ZagaraVoidCoopAberrationBanelingIncubationBirthHeight
  - ZerglingArmorShredTarget
