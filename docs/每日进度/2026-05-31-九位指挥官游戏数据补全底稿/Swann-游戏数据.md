# 斯旺 / `Swann` 游戏数据补全页

- 模块：`XMSwann.SC2Mod`
- 官方数据目录：`游戏数据/官方合作指挥官/commanders/Swann/`
- 官方条目数：兵种 9、建筑 6、英雄 0、等级加点 15、威望 3、升级 25、命令面板 15

## 指挥官基础

- 名称：斯旺
- 描述：擅长载具和防御建筑。
- 默认升级：SwannCommander
- 默认能力命令：EngineeringBayResearch、FactoryTechLabResearch:13、ArmoryResearchVoidCoop:3、ArmoryResearchVoidCoop:4、ArmoryResearchVoidCoop:5、ArmoryResearchVoidCoop、ArmoryResearchVoidCoop:1、ArmoryResearchVoidCoop:2
- 威望 ID：CommanderPrestigeSwannDrill、CommanderPrestigeSwannTurrets、CommanderPrestigeSwannHercules

## 兵种

- 飓风 `Cyclone`
- 恶蝠 `Hellbat`
- 大力神 `Hercules`
- 科学船 `ScienceVessel`
- 恶火 `Hellion`
- 怨灵战机 `Wraith`
- SCV `SCV`
- 歌利亚武装机器人 `Goliath`
- 攻城坦克 `Siege Tank`

## 建筑

- 补给站 `SupplyDepot`
- 德拉肯激光钻机 `MiniDrakkenLaserDrill`
- 毁灭炮塔 `KelMorianGrenadeTurret`
- 导弹塔 `MissileTurret`
- 末日炮塔 `PerditionTurret`
- 指挥中心 `CommandCenter`

## 英雄

- 无

## 等级加点

- 1级：载具专家 `Swann`
  - 斯旺建造SCV、战车和星舰的速度比其他指挥官快20%。建造重工厂和军械库不消耗高能瓦斯。
- 2级：战斗空投 `SwannSpecialDelivery`
  - 空投4台武装机器人，将着陆地点的敌方地面单位击晕。武装机器人可被控制，持续{Behavior,ARESTimedLife,Duration}秒。
- 3级：贝蒂家族 `SwannImprovedTurrets`
  - 毁灭炮塔的射程由6提高到至9，它们的攻击可使敌人减速30%。 导弹塔的生命值由250提高至325，它们的攻击能造成范围伤害。 末日炮塔的消耗降低50%。
- 4级：德拉肯激光钻机：脉冲炮 `SwannLaserDrillUpgrades`
  - 使德拉肯激光钻机能进行二次升级，将它的攻击伤害由30提高到50， 并解锁脉冲炮技能，对目标区域内的敌方单位和建筑造成600点伤害。通过顶部面板来激活脉冲炮。
- 5级：瓦斯采集器 `SwannUnlockVespeneDrone`
  - 解锁指挥中心的一项技能，可空投自动化采集器，从你的精炼厂和任何友方瓦斯采集建筑上收集额外的高能瓦斯。
- 6级：新单位：雷神 `SwannUnlockThor`
  - 重型突击机甲，可在重工厂中制造。 可以对地和对空。
- 7级：重工厂升级包 `SwannFactoryUpgrades`
  - 在重工厂的科技实验室中解锁以下升级： 使歌利亚武装机器人可以同时对地和对空。飓风的锁定技能伤害提高100%。解锁雷神的330毫米口径弹幕火炮技能，可对一个目标区域内的敌人造成伤害并将其击晕。
- 8级：高级建造 `SwannImprovedSCV`
  - 多台SCV可同时建造同一个建筑，缩短其建造时间。修理不消耗资源。
- 9级：军械库升级包 `SwannArmoryUpgrades`
  - 在军械库中解锁以下升级： 所有载具和飞船的射程提高1。所有载具和飞船会自动地缓慢恢复生命值。
- 10级：科技反应堆 `SwannTechReactor`
  - 整合科技实验室和反应堆，包含针对单位的升级，并使主建筑能同时建造两个单位。
- 11级：工程站升级包 `SwannEngineeringBayUpgrades`
  - 在工程站中解锁以下升级： 所有建筑会自动灭火，并将自身修理至50%的最大生命值。所有炮台的攻击速度提高25%。
- 12级：永生程序 `SwannImmortalityProtocol`
  - 解锁重建能力。使被摧毁的雷神和攻城坦克能在战场上重建。
- 13级：星港升级包 `SwannStarportUpgrades`
  - 在星港的科技实验室中解锁以下升级： 使怨灵战机的隐形可以闪避所受20%的伤害。解锁科学船的防御矩阵技能，可将目标包围在一个护盾中。护盾持续20秒，并能吸收200点伤害。
- 14级：加量不加价 `SwannImprovedSpecialDelivery`
  - 提高战斗空投所投放的武装机器人数量，由4台提升至6台。通过顶部面板来召唤战斗空投。
- 15级：机械专业 `SwannVehicleHealth`
  - 斯旺的SCV、战车以及星舰的生命值提高20%。

## 威望

- CommanderPrestigeSwannDrill `CommanderPrestigeSwannDrill`
- CommanderPrestigeSwannTurrets `CommanderPrestigeSwannTurrets`
- CommanderPrestigeSwannHercules `CommanderPrestigeSwannHercules`

## 升级

- AdvancedConstruction `AdvancedConstruction`
- 重武器专家 `CommanderPrestigeSwannDrill`
  - 优点 激光钻机可以造成100%的溅射伤害，使目标减速70%，并且锁定目标的速度加快50%。 缺点 激光钻机的技能不可用。
- 运载总监 `CommanderPrestigeSwannHercules`
  - 优点 大力神拥有两倍的装载容量并且可以立即卸载单位。科学船可以使用战术跳跃并且冷却时间缩短50%。 缺点 顶部技能条的冷却时间增加50%。
- 机械修理工 `CommanderPrestigeSwannTurrets`
  - 优点 炮塔升级效果提高100%。 缺点 战斗单位消耗的高能瓦斯提高50%。
- CommanderPrestigeSwannTurretsArmor `CommanderPrestigeSwannTurretsArmor`
- CommanderPrestigeSwannTurretsAttackSpeed `CommanderPrestigeSwannTurretsAttackSpeed`
- CommanderPrestigeSwannTurretsRange `CommanderPrestigeSwannTurretsRange`
- 瞬时自动追踪 `HiSecAutoTracking`
- 精通 斯旺 建筑生命值 `MasterySwannBuildingHealth`
  - 提高斯旺建筑物的生命值。
- 精通 斯旺 战斗空投 `MasterySwannCombatDrop`
  - 提高武装机器人的持续时间和生命值。
- 精通 斯旺 汇聚射线 `MasterySwannConcentratedBeam`
  - 提高汇聚射线的宽度和伤害。
- 精通 斯旺 永生程序 `MasterySwannImmortalityProtocol`
  - 减少永生程序的资源消耗与建造时间。
- 精通 斯旺 激光钻机建造时间 `MasterySwannLaserDrillBuildTime`
  - 减少德拉肯激光钻机的初始建造时间、重建时间、升级时间以及升级费用。
- 精通 斯旺 瓦斯采集器消耗 `MasterySwannVespeneHarvesterCost`
- 斯旺 `SwannCommander`
- Swann Commander Immortality Protocol `SwannCommanderImmortalityProtocol`
- Swann Commander Vehicle Health `SwannCommanderVehicleHealth`
- Swann Commander Worker Free Repairs `SwannCommanderWorkerFreeRepairs`
- Swann Improved Special Delivery `SwannImprovedSpecialDelivery`
- Swann Turret Upgrades `SwannKelMorianTurretUpgrades`
- Swann Special Delivery `SwannSpecialDelivery`
- KMC自动填弹装置 `SwannTurretIncreasedAttackSpeed`
- Swann Unlock Thor `SwannUnlockThor`
- TechReactor `TechReactor`
- 精钢装甲 `TerranBuildingArmor`

## 命令面板

### 飓风 `Cyclone`

- 默认面板
  - 移动 `Move` / move,Move
  - 停止 `Stop` / stop,Stop
  - 原地防御 `MoveHoldPosition` / move,HoldPos
  - 巡逻 `MovePatrol` / move,Patrol
  - 攻击 `Attack` / attack,Execute
  - 电磁力场加速器 `CycloneLockOnDamageUpgrade` / 无
  - 锁定 `LockOn` / LockOn,Execute
  - 瞄准光学镜 `LockOnRangeUpgrade` / 无
  - 取消 `LockOnCancel` / LockOnCancel,Execute
  - 锁定 `LockOn` / LockOn,Execute
  - 电磁力场加速器 `CycloneLockOnDamageUpgrade` / 无
  - 取消 `LockOnCancel` / LockOnCancel,Execute

### 恶蝠 `Hellbat`

- 默认面板
  - 移动 `Move` / move,Move
  - 停止 `Stop` / stop,Stop
  - 原地防御 `MoveHoldPosition` / move,HoldPos
  - 巡逻 `MovePatrol` / move,Patrol
  - 攻击 `Attack` / attack,Execute
  - 研究地狱火预燃器 `ResearchHighCapacityBarrels` / 无
  - 恶火模式 `MorphToHellion` / MorphToHellion,Execute
  - 地狱火预燃器 `PassiveInfernalPreIgniter` / 无
  - 地狱火装甲 `HellArmor` / 无

### 大力神 `Hercules`

- 默认面板
  - 战术跳跃 `HyperjumpHercules` / Hyperjump,Execute
  - 快速部署 `RapidDeploymentHercules` / 无

### 科学船 `ScienceVessel`

- 默认面板
  - 战术跳跃 `FleetwideJump` / CommanderPrestigeSwannHerculesScienceVesselTacticalJump,Execute
  - NanoRepair `NanoRepair` / NanoRepair,Execute
  - 防御矩阵 `DefensiveMatrixTarget` / DefensiveMatrixTarget,Execute
  - 强化纳米修复 `ImprovedNanoRepair` / 无
  -  `` / 无
  - MoveChampions `MoveChampions` / 无
  - AttackChampions `AttackChampions` / 无
  - ScienceVesselNanoRepairDouble,Execute `` / ScienceVesselNanoRepairDouble,Execute
  - VoidScienceVesselNanoRepair,Execute `` / VoidScienceVesselNanoRepair,Execute

### 补给站 `SupplyDepot`

- 默认面板
  - 选择建造单位 `SelectBuilder` / 无
  - 降下 `Lower` / SupplyDepotLower,Execute
  - 暂停 `Halt` / BuildInProgress,Halt
  - 取消 `CancelBuilding` / BuildInProgress,Cancel

### 恶火 `Hellion`

- 默认面板
  - 移动 `Move` / move,Move
  - 停止 `Stop` / stop,Stop
  - 原地防御 `MoveHoldPosition` / move,HoldPos
  - 巡逻 `MovePatrol` / move,Patrol
  - 攻击 `Attack` / attack,Execute
  - 研究地狱火预燃器 `ResearchHighCapacityBarrels` / 无
  - 恶蝠模式 `MorphToHellionTank` / MorphToHellionTank,Execute
  - 地狱火预燃器 `PassiveInfernalPreIgniter` / 无
  - 地狱火装甲 `HellArmor` / 无

### 德拉肯激光钻机 `MiniDrakkenLaserDrill`

- 默认面板
  - 损坏的德拉肯激光钻机 `BrokenDrakkenLaserDrill` / BrokenDrakkenLaserDrill,Execute
  - 升级2级激光钻机 `ResearchDrakkenLaserDrillNuke` / DrakkenLaserDrillResearch,Research2
  - 取消 `Cancel` / DrakkenLaserDrillAttack,Cancel

### 毁灭炮塔 `KelMorianGrenadeTurret`

- 默认面板
  - 停止 `Stop` / stop,Stop
  - 攻击 `Attack` / attack,Execute
  - 震荡榴弹 `KelMorianGrenadeTurretConcussiveGrenades` / 无
  - 选择建造单位 `SelectBuilder` / BuildInProgress,Cancel
  - 回收 `Salvage` / SalvageShared,On
  - 瞬时自动追踪 `HaveHiSecAutoTracking` / 无
  - KMC自动填弹装置 `HaveImprovedTurretAttackSpeed` / 无
  - 暂停 `Halt` / BuildInProgress,Halt
  - 取消 `CancelBuilding` / BuildInProgress,Cancel

### 导弹塔 `MissileTurret`

- 默认面板
  - 停止 `Stop` / stop,Stop
  - 攻击 `AttackBuilding` / attack,Execute
  - HellstormMissileBatteries `HellstormMissileBatteries` / 无
  - 选择建造单位 `SelectBuilder` / 无
  - 选择建造单位 `SelectBuilder` / 无
  - 回收 `Salvage` / SalvageShared,On
  - 瞬时自动追踪 `HaveHiSecAutoTracking` / 无
  - KMC自动填弹装置 `HaveImprovedTurretAttackSpeed` / 无
  - 侦测单位 `Detector` / 无
  - 取消 `CancelBuilding` / BuildInProgress,Cancel
  - 暂停 `Halt` / BuildInProgress,Halt
  - 攻击 `AttackBuilding` / attack,Execute

### 末日炮塔 `PerditionTurret`

- 默认面板
  - 停止 `Stop` / stop,Stop
  - 攻击 `Attack` / attack,Execute
  - 选择建造单位 `SelectBuilder` / 无
  - 回收 `Salvage` / SalvageShared,On
  - 瞬时自动追踪 `HaveHiSecAutoTracking` / 无
  - KMC自动填弹装置 `HaveImprovedTurretAttackSpeed` / 无
  - 取消 `CancelBuilding` / BuildInProgress,Cancel
  - 侦测单位 `Detector` / 无

### 怨灵战机 `Wraith`

- 默认面板
  - 脉冲增幅器 `ImprovedBurstLaser` / 无
  - 255,255 `` / 255,255
  - 255,255 `` / 255,255

### SCV `SCV`

- 默认面板
  - 建造幽灵军校 `GhostAcademyNova` / TerranBuild,Build15
  - 停止 `Stop` / stop,Stop
  - 原地防御 `MoveHoldPosition` / move,HoldPos
  - 巡逻 `MovePatrol` / move,Patrol
  - AttackWorker `AttackWorker` / attack,Execute
  - 兵营已禁用 `SwannBarracks` / 无
  - 返还资源 `ReturnCargo` / SCVHarvest,Return
  - 高级建造 `AdvancedConstructionAuto` / AdvancedConstructionAuto,Execute
  - 高级建造 `AdvancedConstructionLocked` / 无
  - 建造磁轨炮塔 `BuildLaserTurret` / TerranBuildFullRefund,Build1
  - 建造聚变芯体 `BuildFusionCoreLocked` / 无
  - 建造感应塔 `SensorTower` / TerranBuild,Build9
  - PsiDisruptor `PsiDisruptor` / TerranBuild,Build8
  - 暂停 `Halt` / TerranBuild,Halt
  - 建造毁灭炮塔 `BuildKelMorianRocketTurret` / TerranBuild,Build27
- TBl1
  - 建造指挥中心 `CommandCenter` / TerranBuild,Build1
  - 建造精炼厂 `Refinery` / TerranBuild,Build3
  - 建造补给站 `SupplyDepot` / TerranBuild,Build2
  - 建造兵营 `Barracks` / TerranBuild,Build4
  - 建造工程站 `EngineeringBay` / TerranBuild,Build5
  - 建造地堡 `Bunker` / TerranBuild,Build7
  - 建造导弹塔 `MissileTurret` / TerranBuild,Build6
  - 建造感应塔 `SensorTower` / TerranBuild,Build9
  - 取消 `Cancel` / 无
- TBl2
  - 建造幽灵军校 `GhostAcademy` / TerranBuild,Build10
  - 建造重工厂 `Factory` / TerranBuild,Build11
  - 建造军械库 `Armory` / TerranBuild,Build14
  - 建造星港 `Starport` / TerranBuild,Build12
  - 建造聚变芯体 `FusionCore` / TerranBuild,Build16
  - 取消 `Cancel` / 无

### 指挥中心 `CommandCenter`

- 默认面板
  - 制造SCV `SCV` / CommandCenterTrain,Train1
  - 瓦斯采集器 `VespeneDrone` / VespeneDroneCast,Execute
  - 升级为轨道控制基地 `OrbitalCommand` / UpgradeToOrbital,Execute
  - 升级为行星要塞 `UpgradeToPlanetaryFortress` / UpgradeToPlanetaryFortress,Execute
  - 耐力训练 `MasteryNovaArmyOOCRegenSpeedAppend` / 无
  - 选择建造单位 `SelectBuilder` / CommandCenterTrain,Train1
  - 设定集结点 `Rally` / RallyCommand,Rally2
  - 装载 `CommandCenterLoad` / CommandCenterTransport,LoadAll
  - 全部卸载 `CommandCenterUnloadAll` / CommandCenterTransport,UnloadAll
  - 精钢指挥中心 `NeoSteelFrameCommandCenter` / 无
  - 暂停 `Halt` / BuildInProgress,Halt
  - 取消 `CancelBuilding` / BuildInProgress,Cancel
  -  `` / 无

### 歌利亚武装机器人 `Goliath`

- 默认面板
  - 255,255 `` / 255,255
  - 255,255 `` / 255,255

### 攻城坦克 `Siege Tank`

- 默认面板
  - 移动 `Move` / move,Move
  - 停止 `Stop` / stop,Stop
  - 原地防御 `MoveHoldPosition` / move,HoldPos
  - 巡逻 `MovePatrol` / move,Patrol
  - 攻击 `Attack` / attack,Execute
  - 永生程序 `CommanderSwannImmortalityProtocol` / 无
  - 攻城模式 `SiegeMode` / SiegeMode,Execute
  - 后燃推进系统 `AfterburnersLocked` / 无
  - MaelstromRounds `MaelstromRounds` / 无
  -  `` / 无

## 当前待核对项

### 兵种

- 恶蝠 `Hellbat`
- 攻城坦克 `Siege Tank`

### 建筑

- 德拉肯激光钻机 `MiniDrakkenLaserDrill`

### 升级

- AdvancedConstruction `AdvancedConstruction`
- 精通 斯旺 建筑生命值 `MasterySwannBuildingHealth`
- 精通 斯旺 战斗空投 `MasterySwannCombatDrop`
- 精通 斯旺 永生程序 `MasterySwannImmortalityProtocol`
- 精通 斯旺 激光钻机建造时间 `MasterySwannLaserDrillBuildTime`
- 精通 斯旺 瓦斯采集器消耗 `MasterySwannVespeneHarvesterCost`
- Swann Commander Immortality Protocol `SwannCommanderImmortalityProtocol`
- Swann Commander Vehicle Health `SwannCommanderVehicleHealth`
- Swann Commander Worker Free Repairs `SwannCommanderWorkerFreeRepairs`
- Swann Turret Upgrades `SwannKelMorianTurretUpgrades`

### 技能

- 重工厂升级包 `330mmBarrageCannons`
- 降下 `SupplyDepotLower`
- 255 `255`

### 按钮

- MoveChampions `MoveChampions`
- AttackChampions `AttackChampions`
- 降下 `Lower`
- 回收 `Salvage`
- HellstormMissileBatteries `HellstormMissileBatteries`
- AttackWorker `AttackWorker`
- 返还资源 `ReturnCargo`
- 装载 `CommandCenterLoad`
- 全部卸载 `CommandCenterUnloadAll`
