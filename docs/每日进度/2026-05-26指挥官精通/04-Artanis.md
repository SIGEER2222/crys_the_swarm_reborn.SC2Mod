# 2026-05-26 Artanis 指挥官加点与精通

`Upgrade` 保留内部 ID；效果对象和字段尽量使用中文名称，便于直接查看实际加成。

## 加点

### 1. 艾尔指挥
- 花费：10
- Upgrade：`ArtanisCommander`
- 描述：启用阿塔尼斯合作指挥官基础升级、艾尔星灵单位体系和亚顿之矛顶部面板。
- 具体效果：
  - 影响单位：哨兵、高阶圣堂武士、狂热者
  - WarpGateTrain：Train1训练/建造时间 -4.500000
  - WarpGateTrain：Train2训练/建造时间 -4.500000
  - WarpGateTrain：Train3训练/建造时间 -4.500000
  - WarpGateTrain：Train4训练/建造时间 -4.500000
  - WarpGateTrain：Train5训练/建造时间 -4.500000
  - WarpGateTrain：Train6训练/建造时间 -4.500000
  - WarpGateTrain：Train7训练/建造时间 -4.500000
  - WarpGateTrain：Train9训练/建造时间 -4.500000
  - StargateWarpTrain：Train1训练/建造时间 -4.500000
  - StargateWarpTrain：Train3训练/建造时间 -4.500000
  - StargateWarpTrain：Train5训练/建造时间 -4.500000
  - StargateWarpTrain：Train6训练/建造时间 -4.500000
  - StargateWarpTrain：Train9训练/建造时间 -4.500000
  - StargateWarpTrain：Train10训练/建造时间 -4.500000
  - StargateWarpTrain：Train11训练/建造时间 -4.500000
  - StargateWarpTrain：Train12训练/建造时间 -4.500000
  - StargateWarpTrain：Train13训练/建造时间 -4.500000
  - RoboticsFacilityWarpTrain：Train1训练/建造时间 -4.500000
  - RoboticsFacilityWarpTrain：Train2训练/建造时间 -4.500000
  - RoboticsFacilityWarpTrain：Train3训练/建造时间 -4.500000
  - RoboticsFacilityWarpTrain：Train4训练/建造时间 -4.500000
  - RoboticsFacilityWarpTrain：Train5训练/建造时间 -4.500000
  - RoboticsFacilityWarpTrain：Train19训练/建造时间 -4.500000
  - SOAPylon Power：Cost[0].Vital[能量] -50
  - SOAPylon Power：冷却时间 -30.000000
  - SOAOrbitalStrikeActivate：冷却时间 -30.000000
  - SOAOrbitalStrikeActivate：Cost[0].Vital[能量] -25
  - Tempest：MinScanRange 设为 10.5
  - Tempest：施放距离 设为 10
  - 界面/名称/说明文本改动：29 条

### 2. 轨道打击
- 花费：10
- Upgrade：`SOAOrbitalStrike`
- 描述：解锁轨道打击，允许从顶部面板连续打击目标区域。
- 具体效果：
  - 未解析到直接数值效果（可能只用于解锁、触发或界面状态）。

### 3. 守护之壳
- 花费：15
- Upgrade：`SOAHeroicShield`
- 描述：解锁守护之壳，为濒死友军提供短暂保护。
- 具体效果：
  - 守护之壳显示值：效果数值 +15
  - 精通 阿塔尼斯 守护者之壳治疗：生命变化Fraction +0.15
  - 精通 阿塔尼斯 守护者之壳治疗：护盾变化Fraction +0.15

### 4. 能量场投射
- 花费：15
- Upgrade：`SOAWarpTech`
- 描述：解锁能量场投射，在目标区域提供临时星灵能量场。
- 具体效果：
  - 影响单位：Probe

### 5. 快速折跃
- 花费：20
- Upgrade：`SOAWarpGateCharges`
- 描述：解锁阿塔尼斯折跃科技与折跃充能强化。
- 具体效果：
  - 未解析到直接数值效果（可能只用于解锁、触发或界面状态）。

### 6. 高阶执政官解锁
- 花费：20
- Upgrade：`ArtanisUnlockHighArchon`
- 描述：开放高阶执政官生产与相关科技。
- 具体效果：
  - 执政官：能量Start +50
  - 执政官：能量上限 +200
  - 执政官：能量RegenRate +0.562500
  - 界面/名称/说明文本改动：6 条

### 7. 掠夺者解锁
- 花费：25
- Upgrade：`ArtanisUnlockReaver`
- 描述：开放掠夺者生产与圣甲虫强化科技。
- 具体效果：
  - 界面/名称/说明文本改动：3 条

### 8. 风暴战舰解锁
- 花费：30
- Upgrade：`ArtanisUnlockTempest`
- 描述：开放风暴战舰生产与分解相关科技。
- 具体效果：
  - 界面/名称/说明文本改动：3 条

## 精通

### 1. 护盾超载强度
- Upgrade：`MasteryArtanisShieldOvercharge`
- 描述：提高护盾超载提供的保护强度。
- 具体效果：
  - 最高等级：30
  - 护盾超载强度显示值：效果数值 +6
  - 护盾超载强度显示值：效果数值 设为 .6
  - SOASuperShield：DamageResponse.ModifyLimit +6
  - SOASuperShield：持续时间 +0.600000

### 2. 护盾超载冷却
- Upgrade：`MasteryArtanisShieldOverchargeCDR`
- 描述：降低护盾超载的使用冷却。
- 具体效果：
  - 最高等级：30
  - SoASuperShield：冷却时间 -2.000000
  - 护盾超载冷却显示值：效果数值 +2
  - SoASuperShield：Cost[0].冷却.初始时间 -2.000000

### 3. 能量场折跃急速
- Upgrade：`MasteryArtanisSoAPowerFieldHaste`
- 描述：提高能量场内折跃单位的部署速度。
- 具体效果：
  - 最高等级：30
  - 能量场折跃急速显示值：效果数值 +2
  - 折跃急速：AccelerationMultiplier +0.02
  - 折跃急速：MoveSpeedMultiplier +0.02
  - 折跃急速：攻击速度倍率 +0.02
  - 折跃急速：VitalRegenMultiplier[能量] +0.02
  - 折跃急速：RateMultiplierArray[冷却] +0.02
  - 正在折跃：PowerStageArray[1].LevelLossEffect 设为 MasteryArtanisSoAPowerFieldHaste_Target

### 4. 折跃充能恢复
- Upgrade：`MasteryArtanisWarpChargeCooldown`
- 描述：加快折跃充能恢复，提升前线增援频率。
- 具体效果：
  - 最高等级：30
  - 折跃充能恢复显示值：效果数值 +2
  - WarpGateTrain：Train1充能时间 -0.560000
  - WarpGateTrain：Train2充能时间 -0.640000
  - WarpGateTrain：Train3充能时间 -0.640000
  - WarpGateTrain：Train4充能时间 -0.900000
  - WarpGateTrain：Train5充能时间 -0.900000
  - WarpGateTrain：Train6充能时间 -0.640000
  - WarpGateTrain：Train7充能时间 -0.560000
  - RoboticsFacilityWarpTrain：Train1充能时间 -0.800000
  - RoboticsFacilityWarpTrain：Train2充能时间 -0.600000
  - RoboticsFacilityWarpTrain：Train3充能时间 -0.600000
  - RoboticsFacilityWarpTrain：Train4充能时间 -0.880000
  - RoboticsFacilityWarpTrain：Train5充能时间 -1.200000
  - StargateWarpTrain：Train1充能时间 -0.560000
  - StargateWarpTrain：Train3充能时间 -1.920000
  - StargateWarpTrain：Train4充能时间 -0.560000
  - StargateWarpTrain：Train5充能时间 -0.960000
  - StargateWarpTrain：Train6充能时间 -0.720000
  - StargateWarpTrain：Train10充能时间 -1.200000

### 5. 守护之壳治疗
- Upgrade：`MasteryArtanisGuardianShellHeal`
- 描述：增强守护之壳触发后的治疗收益。
- 具体效果：
  - 最高等级：30
  - 守护之壳治疗显示值：效果数值 +0.5
  - 精通 阿塔尼斯 守护者之壳治疗：生命变化Fraction +0.005
  - 精通 阿塔尼斯 守护者之壳治疗：护盾变化Fraction +0.005

### 6. 初始与最大太阳能量
- Upgrade：`MasteryArtanisStartingAndMaxSoAEnergy`
- 描述：提高亚顿之矛初始和最大能量。
- 具体效果：
  - 最高等级：30
  - 初始与最大太阳能量显示值：效果数值 +3
  - 阿塔尼斯技能面板：能量Start +3
  - 阿塔尼斯技能面板：能量上限 +3

