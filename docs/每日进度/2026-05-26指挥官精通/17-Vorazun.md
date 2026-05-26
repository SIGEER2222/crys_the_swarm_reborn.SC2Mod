# 2026-05-26 Vorazun 指挥官加点与精通

`Upgrade` 保留内部 ID；效果对象和字段尽量使用中文名称，便于直接查看实际加成。

## 加点

### 1. 沃拉尊指挥
- 花费：10
- Upgrade：`VorazunCommander`
- 描述：启用沃拉尊合作指挥官基础升级、奈拉齐姆单位体系和亚顿之矛顶部面板。
- 具体效果：
  - 影响单位：哨兵、合作任务 施法者 沃拉尊
  - VoidSentryBlackHole：Range[0] 设为 500
  - 虚空圣堂武士：护盾上限 +80
  - 虚空圣堂武士：护盾Start +80
  - 界面/名称/说明文本改动：22 条

### 2. 召回
- 花费：10
- Upgrade：`SOARecall`
- 描述：解锁召回能力，将友军快速撤回到安全位置。
- 具体效果：
  - 未解析到直接数值效果（可能只用于解锁、触发或界面状态）。

### 3. 虚空水晶塔召回
- 花费：15
- Upgrade：`VoidPylonRecall`
- 描述：强化黑暗水晶塔召回，使前线单位能够围绕黑暗水晶塔快速转移。
- 具体效果：
  - 未解析到直接数值效果（可能只用于解锁、触发或界面状态）。

### 4. 黑暗水晶塔
- 花费：15
- Upgrade：`DarkPylonMorph`
- 描述：解锁黑暗水晶塔形态，为附近单位提供能量场和隐形支援。
- 具体效果：
  - ProtossBuild：InfoArray[Build2].Unit 设为 DarkPylon

### 5. 先知虫洞
- 花费：20
- Upgrade：`OracleWormhole`
- 描述：解锁先知虫洞科技，增强先知机动和战场控制。
- 具体效果：
  - 影响单位：Oracle

### 6. 静滞结界
- 花费：20
- Upgrade：`OracleStasisWardUpgrade`
- 描述：解锁先知静滞结界升级，提高区域控制能力。
- 具体效果：
  - 影响单位：Oracle
  - OracleStasisTrapActivateAB：Behavior 设为 OracleStasisTrapStunTarget
  - 界面/名称/说明文本改动：1 条

### 7. 干扰网
- 花费：25
- Upgrade：`CorsairDisruptionWeb`
- 描述：解锁海盗船干扰网，提高空军控制能力。
- 具体效果：
  - 影响单位：CorsairMP

### 8. 永久隐形
- 花费：30
- Upgrade：`CorsairPermanentCloak`
- 描述：赋予海盗船永久隐形，强化奈拉齐姆空军生存能力。
- 具体效果：
  - 影响单位：CorsairMP

## 精通

### 1. 初始与最大面板能量
- Upgrade：`MasteryVorazunStartingAndMaxSoAEnergy`
- 描述：提高沃拉尊顶部面板初始能量和最大能量。
- 具体效果：
  - 最高等级：30
  - 初始与最大面板能量显示值：效果数值 +3
  - 合作任务 施法者 沃拉尊：能量Start +3
  - 合作任务 施法者 沃拉尊：能量上限 +3

### 2. 暗影卫队持续时间
- Upgrade：`MasteryVorazunShadowGuardDuration`
- 描述：延长暗影卫队持续时间。
- 具体效果：
  - 最高等级：30
  - 暗影卫队持续时间显示值：效果数值 +2
  - ShadowGuardTimedLife：持续时间 +2.000000

### 3. 黑暗水晶塔半径
- Upgrade：`MasteryVorazunDarkPylonRadius`
- 描述：扩大黑暗水晶塔能量场和隐形范围。
- 具体效果：
  - 最高等级：30
  - 黑暗水晶塔半径显示值：效果数值 +2
  - Dark Pylon Cloak Search：AreaArray[0].半径 设为 .13
  - DarkPylonCloakingField：Scale +0.02
  - DarkPylonPowerPowerVisual：Scale +0.02
  - DarkPylonPowerRadiusLow：施放距离 +0.130000
  - DarkPylonUnpoweredRadiusLow：施放距离 +0.13
  - DarkPylonWarpInSplat：Scale +0.02
  - DarkPylonUnpoweredVisual：Scale +0.02

### 4. 黑洞持续时间
- Upgrade：`MasteryVorazunBlackHoleDuration`
- 描述：延长黑洞持续时间。
- 具体效果：
  - 最高等级：30
  - 黑洞持续时间显示值：效果数值 设为 .1875
  - VoidSentryBlackHolePersistent：PeriodCount +3

### 5. 时间停止强化
- Upgrade：`MasteryVorazunTimeStopHaste`
- 描述：强化时间停止期间的友军加速收益。
- 具体效果：
  - 最高等级：30
  - 时间停止强化显示值：效果数值 +0.01
  - 时间操纵：AccelerationMultiplier +0.01
  - 时间操纵：MoveSpeedMultiplier +0.01
  - 时间操纵：攻击速度倍率 +0.01
  - 时间操纵：VitalRegenMultiplier[能量] +0.01

### 6. 时空提速效率
- Upgrade：`MasteryVorazunChronoBoostSpeed`
- 描述：提高时空提速效率，加快生产和研究节奏。
- 具体效果：
  - 最高等级：30
  - 时空提速效率显示值：效果数值 +1
  - TimeWarpProduction：RateMultiplierArray[充能] +0.01
  - TimeWarpProduction：RateMultiplierArray[冷却] +0.01
  - TimeWarpProduction：RateMultiplierArray[Creep] +0.01
  - TimeWarpProduction：RateMultiplierArray[Morph] +0.01
  - TimeWarpProduction：RateMultiplierArray[Progress] +0.01
  - TimeWarpProduction：RateMultiplierArray[Queueable] +0.01
  - TimeWarpProduction：RateMultiplierArray[Spawn] +0.01

