# 2026-05-26 Stukov 指挥官加点与精通

`Upgrade` 保留内部 ID；效果对象和字段尽量使用中文名称，便于直接查看实际加成。

## 加点

### 1. 易燃外肢
- 花费：10
- Upgrade：`StukovApocaliskUpgrades`
- 描述：末日巨兽伤害提高
- 具体效果：
  - 影响单位：末日巨兽
  - ApocaliskBladesSD：效果数值 +25
  - ApocaliskBurrowChargeTargetDamage：效果数值 +50
  - ApocaliskBladesSD：Death 设为 Fire
  - ApocaliskBladesD：Death 设为 Fire
  - ApocaliskBurrowChargeTargetDamage：Death 设为 Fire
  - ApocaliskBladesD：效果数值 +20

### 2. 神经感染
- 花费：10
- Upgrade：`StukovAleksanderMindControl`
- 描述：亚历山大号触手攻击的敌方单位可被控制
- 具体效果：
  - 影响单位：亚历山大号
  - StukovAleksanderTentacleAB：Chance 设为 0
  - StukovAleksanderTentacleABU：Chance 设为 1

### 3. 增生地堡
- 花费：15
- Upgrade：`SIInfestedBunkerUpgraded`
- 描述：被感染的地堡载物空间+2，被感染的士兵孵化速度提高
- 具体效果：
  - 影响单位：被感染的地堡、地堡兽
  - 装载-卸载：MaxCargoCount +2
  - 装载-卸载：TotalCargoSpace +2
  - SIInfestedBunkerTrain：冷却时间 -10.000000
  - SIInfestedBunkerTrain：Cost[0].冷却.初始时间 -10.000000
  - SIInfestedBunkerIniCU：SpawnCount +2

### 4. 腐化征用
- 花费：15
- Upgrade：`SIImprovedMarineSpawning`
- 描述：孵化被感染的陆战队员储存次数+10，所有战斗部队孵化速度翻倍
- 具体效果：
  - 影响单位：被感染的兵营
  - 兵营训练：Train1最大充能数 +10
  - SIMorphtoInfestedMarine：Train1训练/建造时间 -5.000000
  - SIMorphtoInfestedBanshee：Train1训练/建造时间 -21.000000
  - SIMorphtoInfestedCivilian：Train1训练/建造时间 -4.000000
  - SIMorphtoInfestedDiamondBack：Train1训练/建造时间 -16.000000
  - SIMorphtoInfestedSiegeTank：Train1训练/建造时间 -16.000000
  - SIMorphtoInfestedValkrie：Train1训练/建造时间 -21.000000
  - SIMorphtoQueen：Train1训练/建造时间 -16.000000

### 5. 血肉焊机
- 花费：20
- Upgrade：`CommanderPrestigeStukovMech`
- 描述：重工厂和星港不再有科技需求，机械战斗单位消耗降低30%，被感染的攻城坦克弹药补充速度翻倍
- 具体效果：
  - 影响单位：被感染的攻城坦克、被感染的解放者、被感染的女妖、被感染的响尾蛇战车、SICocoonInfestedBanshee、SICocoonInfestedDiamondBack、SICocoonInfestedLiberator、SICocoonInfestedSiegeTank
  - 被感染的攻城坦克：矿物消耗 -60
  - 被感染的攻城坦克：瓦斯消耗 -30
  - 被感染的解放者：矿物消耗 -45
  - 被感染的解放者：瓦斯消耗 -37
  - 被感染的女妖：矿物消耗 -45
  - 被感染的女妖：瓦斯消耗 -30
  - 被感染的响尾蛇战车：矿物消耗 -70
  - 被感染的响尾蛇战车：瓦斯消耗 -22
  - SICocoonInfestedBanshee：瓦斯消耗 -30
  - SICocoonInfestedBanshee：矿物消耗 -45
  - SICocoonInfestedDiamondBack：矿物消耗 -70
  - SICocoonInfestedDiamondBack：瓦斯消耗 -22
  - SICocoonInfestedLiberator：瓦斯消耗 -37
  - SICocoonInfestedLiberator：矿物消耗 -45
  - SICocoonInfestedSiegeTank：矿物消耗 -60
  - SICocoonInfestedSiegeTank：瓦斯消耗 -30

### 6. 瘟疫守望者
- 花费：15
- Upgrade：`StukovBansheesDeploy`
- 描述：女妖可以装载地堡兽
- 具体效果：
  - 影响单位：被感染的女妖

### 7. 高级攻防
- 花费：20
- Upgrade：`SIUpgradeWeapon`
- 描述：4、5级攻防
- 具体效果：
  - 未解析到直接数值效果（可能只用于解锁、触发或界面状态）。

### 8. 斯图科夫
- 花费：15
- Upgrade：`SIStukov`
- 描述：斯图科夫加入战场
- 具体效果：
  - 未解析到直接数值效果（可能只用于解锁、触发或界面状态）。

## 精通

### 1. 易爆
- Upgrade：`MasteryStukovVolatileChance`
- 描述：被感染的平民有1%概率孵化为易爆感染体
- 具体效果：
  - 最高等级：30
  - Infested Civilian Volatile Spawn：Chance +0.01

### 2. 感染建筑
- Upgrade：`MasteryStukovInfestStructureCDR`
- 描述：感染建筑冷却时间-1.5s
- 具体效果：
  - 最高等级：30
  - SIStukovInfestStructureUpgraded：充能时间 -1.500000

### 3. 亚历山大
- Upgrade：`MasteryStukovAleksanderCDR`
- 描述：亚历山大号冷却时间-3s
- 具体效果：
  - 最高等级：30
  - StukovSummonAleksander：冷却时间 -3.000000

### 4. 末日巨兽
- Upgrade：`MasteryStukovApocaliskCDR`
- 描述：末日巨兽冷却时间-3s
- 具体效果：
  - 最高等级：30
  - 召唤末日巨兽：冷却时间 -3.000000

### 5. 感染步兵
- Upgrade：`MasteryStukovTimedLife`
- 描述：被感染的步兵持续时间+1s
- 具体效果：
  - 最高等级：30
  - SIBarracksTrainTimedLife：持续时间 +1.000000
  - SIInfestedBunkerTrainTimedLife：持续时间 +1.000000

### 6. 机械部队
- Upgrade：`MasteryStukovMechAttackSpeed`
- 描述：机械部队攻击速度+1%
- 具体效果：
  - 最高等级：30
  - 影响单位：被感染的解放者、被感染的女妖、被感染的响尾蛇战车、被感染的攻城坦克、虫巢女王
  - 病毒虫群：攻击间隔倍率 +0.01
  - 反冲火箭：攻击间隔倍率 +0.01
  - 腐液火炮：攻击间隔倍率 +0.01
  - 刺钉触须：攻击间隔倍率 +0.01
  - 烈性爆弹：攻击间隔倍率 +0.01
  - 酸性孢子：攻击间隔倍率 +0.01

