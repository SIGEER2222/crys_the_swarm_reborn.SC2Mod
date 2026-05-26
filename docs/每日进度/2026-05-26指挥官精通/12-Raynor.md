# 2026-05-26 Raynor 指挥官加点与精通

`Upgrade` 保留内部 ID；效果对象和字段尽量使用中文名称，便于直接查看实际加成。

## 加点

### 1. 游骑兵指挥
- 花费：10
- Upgrade：`RaynorCommander`
- 描述：启用雷诺基础合作指挥官升级，并开放游骑兵人族单位体系。
- 具体效果：
  - BarracksTrain：Train1训练/建造时间 -12.500000
  - BarracksTrain：Train4训练/建造时间 -15.000000
  - BarracksTrain：Train5训练/建造时间 -12.500000
  - BarracksTrain：Train6训练/建造时间 -15.000000
  - FactoryTrain：Train2训练/建造时间 -22.500000
  - FactoryTrain：Train10训练/建造时间 -12.500000
  - MakeVultureSpiderMines：Specialize1训练/建造时间 -6.000000
  - StarportTrain：Train2训练/建造时间 -30.000000
  - StarportTrain：Train4训练/建造时间 -45.000000
  - StarportTrain：Train5训练/建造时间 -21.000000
  - TerranBuild：Build4训练/建造时间 -32.000000
  - Battlecruiser：能量Start 设为 0
  - Battlecruiser：能量上限 设为 0
  - Yamato：冷却时间 设为 60
  - Yamato：Cost[0].Vital[能量] 设为 0
  - 空对空激光炮组：Options[Disabled] 设为 1
  - 空对地激光炮组：Options[Disabled] 设为 1
  - 切换激光炮组：Options[Disabled] 设为 0
  - BansheeCloak：Cost[0].Vital[能量] 设为 0
  - DuskWingBansheeCloakingField：Cost[0].Vital[能量] 设为 0
  - 界面/名称/说明文本改动：34 条

### 2. 女妖空袭
- 花费：10
- Upgrade：`RaynorBansheeAirstrike`
- 描述：解锁顶部面板女妖空袭，快速打击指定区域。
- 具体效果：
  - 未解析到直接数值效果（可能只用于解锁、触发或界面状态）。

### 3. 休伯利安瞄准系统
- 花费：15
- Upgrade：`RaynorCommanderHyperionAdvancedTargetingSystems`
- 描述：强化休伯利安号的目标锁定与持续输出能力。
- 具体效果：
  - 影响单位：休伯利安号

### 4. 战列巡航舰解锁
- 花费：15
- Upgrade：`RaynorUnlockBattlecruiser`
- 描述：开放战列巡航舰生产与相关科技链。
- 具体效果：
  - 界面/名称/说明文本改动：2 条

### 5. 强化兴奋剂
- 花费：20
- Upgrade：`RaynorCommanderStimUpgrade`
- 描述：强化陆战队员、劫掠者等生化部队的兴奋剂表现。
- 具体效果：
  - 影响单位：Marine、Marauder、Firebat、WarPig、HammerSecurity、DevilDog
  - Stimpack：生命消耗 -5
  - StimpackMarauder：生命消耗 -10
  - 强化剂：生命消耗 -10
  - Stimpack：攻击速度倍率 设为 1.75
  - StimpackMarauder：攻击速度倍率 设为 1.75

### 6. 火蝠与医疗兵协同
- 花费：20
- Upgrade：`RaynorFirebatMedicRange`
- 描述：提高火蝠和医疗兵的协同能力，增强前线续航。
- 具体效果：
  - 影响单位：Medic、Firebat
  - heal：Range[0] +2
  - heal：AutoCastRange +2
  - HealPlusMech：Range[0] +2
  - HealPlusMech：AutoCastRange +2
  - Firebat：施放距离 +2

### 7. 步兵射程强化
- 花费：25
- Upgrade：`RaynorCommanderTerranInfantryWeaponRange`
- 描述：提高雷诺步兵部队的射程表现。
- 具体效果：
  - 影响单位：Marine、Marauder、Reaper、Firebat、Ghost、Spectre、WarPig、HammerSecurity、DevilDog
  - GuassRifle：施放距离 +1
  - PunisherGrenades：施放距离 +1
  - P38ScytheGuassPistol：施放距离 +1
  - D8Charge：施放距离 +1
  - Firebat：施放距离 +1
  - C10CanisterRifle：施放距离 +1
  - Specter：施放距离 +1
  - KelmorianMinerGaussRifle：施放距离 +1
  - HammerSecurity：施放距离 +1
  - DevilDogFlameThrower：施放距离 +1

### 8. 武器攻速强化
- 花费：30
- Upgrade：`RaynorCommanderTerranWeaponAttackSpeed`
- 描述：提高雷诺部队的武器攻击节奏。
- 具体效果：
  - 影响单位：Marine、Marauder、Firebat、秃鹫、攻城坦克、SiegeTankSieged、维京战机、维京、Banshee、Battlecruiser、DuskWing、休伯利安号
  - GuassRifle：攻击间隔倍率 +0.15
  - PunisherGrenades：攻击间隔倍率 +0.15
  - Firebat：攻击间隔倍率 +0.15
  - Vulture：攻击间隔倍率 +0.15
  - 90mmCannons：攻击间隔倍率 +0.15
  - CrucioShockCannon：攻击间隔倍率 +0.15
  - TwinGatlingCannon：攻击间隔倍率 +0.15
  - LanzerTorpedoes：攻击间隔倍率 +0.15
  - BacklashRockets：攻击间隔倍率 +0.15
  - 空对空激光炮组：攻击间隔倍率 +0.15
  - 空对地激光炮组：攻击间隔倍率 +0.15
  - ATSLaserBatteryDummy：攻击间隔倍率 +0.15
  - 切换激光炮组：攻击间隔倍率 +0.15
  - DuskWingBanshee：攻击间隔倍率 +0.15
  - HyperionVoidCoopAir：攻击间隔倍率 +0.15
  - HyperionVoidCoopGround：攻击间隔倍率 +0.15

## 精通

### 1. 兴奋剂持续时间
- Upgrade：`MasteryRaynorStimDuration`
- 描述：提高兴奋剂相关持续收益。
- 具体效果：
  - 最高等级：30
  - 影响单位：Marine、Marauder
  - 兴奋剂持续时间显示值：效果数值 设为 .3
  - StimpackMarauder：持续时间 设为 .3
  - Stimpack：持续时间 设为 .3

### 2. 机械攻速
- Upgrade：`MasteryRaynorMechAttackSpeed`
- 描述：提高雷诺机械部队的攻击速度。
- 具体效果：
  - 最高等级：30
  - 影响单位：秃鹫、攻城坦克、SiegeTankSieged、维京战机、维京、Banshee、Battlecruiser
  - 机械攻速显示值：效果数值 +1
  - Vulture：攻击间隔倍率 +0.01
  - 90mmCannons：攻击间隔倍率 +0.01
  - CrucioShockCannon：攻击间隔倍率 +0.01
  - TwinGatlingCannon：攻击间隔倍率 +0.01
  - LanzerTorpedoes：攻击间隔倍率 +0.01
  - BacklashRockets：攻击间隔倍率 +0.01
  - 空对空激光炮组：攻击间隔倍率 +0.01
  - 空对地激光炮组：攻击间隔倍率 +0.01
  - ATSLaserBatteryDummy：攻击间隔倍率 +0.01
  - 切换激光炮组：攻击间隔倍率 +0.01

### 3. 休伯利安冷却
- Upgrade：`MasteryRaynorHyperionCooldown`
- 描述：降低休伯利安号呼叫冷却时间。
- 具体效果：
  - 最高等级：30
  - 休伯利安冷却显示值：效果数值 +4
  - 召唤休伯利安号：冷却时间 -4.000000

### 4. 女妖空袭冷却
- Upgrade：`MasteryRaynorDuskWingCooldown`
- 描述：降低女妖空袭冷却时间。
- 具体效果：
  - 最高等级：30
  - 女妖空袭冷却显示值：效果数值 +4
  - 女妖空袭：冷却时间 -4.000000

### 5. 空投舱加速
- Upgrade：`MasteryRaynorDropPodHaste`
- 描述：强化空投舱部署后的战斗节奏。
- 具体效果：
  - 最高等级：30
  - 空投舱加速显示值：效果数值 +2
  - 空投舱急速：AccelerationMultiplier +0.02
  - 空投舱急速：MoveSpeedMultiplier +0.02
  - 空投舱急速：攻击速度倍率 +0.02
  - 空投舱急速：VitalRegenMultiplier[能量] +0.02
  - 空投舱急速：RateMultiplierArray[冷却] +0.02

### 6. 初始补给
- Upgrade：`MasteryRaynorStartingSupply`
- 描述：提高开局补给上限，减少早期供给压力。
- 具体效果：
  - 最高等级：30
  - 初始补给显示值：效果数值 +2
  - 雷诺技能面板：补给占用 +2

