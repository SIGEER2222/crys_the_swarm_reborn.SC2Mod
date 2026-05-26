# 2026-05-26 Mira 指挥官加点与精通

`Upgrade` 保留内部 ID；效果对象和字段尽量使用中文名称，便于直接查看实际加成。

## 加点

### 1. 补给站
- 花费：5
- Upgrade：`DoubleSupplyMira`
- 描述：补给站血量和提供的补给翻倍
- 具体效果：
  - 影响单位：补给站
  - 补给站：补给占用 +8
  - 补给站：生命上限 +400
  - 补给站：初始生命值 +400
  - 界面/名称/说明文本改动：6 条

### 2. 开火
- 花费：20
- Upgrade：`BuildBomberPlatformMira`
- 描述：攻击战斗机平台数量无上限
- 具体效果：
  - 影响单位：SCV
  - Build：Build13建造需求 设为 

### 3. 麦格手雷
- 花费：10
- Upgrade：`MagGrenadeMira`
- 描述：麦格天雷布置和攻击速度提高
- 具体效果：
  - 影响单位：麦格天雷
  - MagPrepMorph：InfoArray[0].SectionArray[Actor].持续时间Array[持续时间] 乘以 0.200000
  - MagPrepMorph：InfoArray[0].SectionArray[Stats].持续时间Array[Delay] 乘以 0.200000
  - MagneticMineAttackMira：InitialDelay 乘以 0.200000

### 4. 十万火急
- 花费：20
- Upgrade：`BuildMercStarportMira`
- 描述：突击炮舰可建造数量提高到20
- 具体效果：
  - 影响单位：SCV
  - Build：Build11建造需求 设为 MercStarportUMira

### 5. 爆爆乐
- 花费：10
- Upgrade：`SpaceStationNukeMira`
- 描述：空间站调度会在毁灭时引发核爆装置
- 具体效果：
  - 未解析到直接数值效果（可能只用于解锁、触发或界面状态）。

### 6. 高级武器
- 花费：10
- Upgrade：`AirFleetYamatoMira`
- 描述：呼叫舰队用激光炮组轰击敌方目标，可以发射大和炮
- 具体效果：
  - 影响单位：AirFleetStraferMira
  - HornerAirFleetCP：PeriodCount 设为 2

### 7. 军工强化
- 花费：15
- Upgrade：`UpgradeMira`
- 描述：解锁四五级攻防
- 具体效果：
  - 未解析到直接数值效果（可能只用于解锁、触发或界面状态）。

### 8. 银翼
- 花费：20
- Upgrade：`WingComMira`
- 描述：帝国星港内单位充能时间缩短
- 具体效果：
  - 影响单位：帝国星港、阿斯忒瑞亚怨灵战机、德摩斯维京战机、攻城坦克、解放者、飓风、忒伊亚铁鸦、幽灵、至尊战列巡航舰
  - StarportTrainHornerMira：Train1每次消耗充能 设为 0.5
  - StarportTrainHornerMira：Train2每次消耗充能 设为 0.5
  - StarportTrainHornerMira：Train3每次消耗充能 设为 0.5
  - StarportTrainHornerMira：Train4每次消耗充能 设为 0.5
  - StarportTrainHornerMira：Train5每次消耗充能 设为 0.5
  - StarportTrainHornerMira：Train8每次消耗充能 设为 0.5
  - StarportTrainHornerMira：Train9每次消耗充能 设为 0.5
  - StarportTrainHornerMira：Train10每次消耗充能 设为 0.5

## 精通

### 1. 部队生命
- Upgrade：`ArmyLifeMira`
- 描述：提高突击炮舰训练单位的生命
- 具体效果：
  - 最高等级：30
  - 影响单位：恶蝠、恶火、寡妇雷、收割者、劫掠者、医疗运输机
  - 恶蝠：初始生命值 +2.5
  - 恶蝠：生命上限 +2.5
  - 恶火：初始生命值 +1
  - 恶火：生命上限 +1
  - 寡妇雷：初始生命值 +1
  - 寡妇雷：生命上限 +1
  - 收割者：初始生命值 +0.5
  - 收割者：生命上限 +0.5
  - 劫掠者：初始生命值 +1.5
  - 劫掠者：生命上限 +1.5
  - 医疗运输机：初始生命值 +1.5
  - 医疗运输机：生命上限 +1.5

### 2. 费用减免
- Upgrade：`WingCom2Mira`
- 描述：减少帝国星港内的单位瓦斯消耗
- 具体效果：
  - 最高等级：30
  - 影响单位：帝国星港、阿斯忒瑞亚怨灵战机、德摩斯维京战机、攻城坦克、解放者、飓风、忒伊亚铁鸦、幽灵、至尊战列巡航舰
  - 阿斯忒瑞亚怨灵战机：瓦斯消耗 -2
  - 德摩斯维京战机：瓦斯消耗 -2
  - 攻城坦克：瓦斯消耗 -1
  - 解放者：瓦斯消耗 -1
  - 飓风：瓦斯消耗 -1
  - 忒伊亚铁鸦：瓦斯消耗 -2
  - 幽灵：瓦斯消耗 -2
  - 至尊战列巡航舰：瓦斯消耗 -6

### 3. 麦格天雷
- Upgrade：`MagMineNMira`
- 描述：麦格天雷冷却时间减少
- 具体效果：
  - 最高等级：30
  - 影响单位：Caster
  - 麦格天雷：RateMultiplierArray[充能] +0.01

### 4. 流星雨
- Upgrade：`SpaceStationCooldownMira`
- 描述：空间站调度技能冷却时间减少
- 具体效果：
  - 最高等级：30
  - 影响单位：Caster
  - 空间站调度：冷却时间 -3.000000

### 5. 火力覆盖
- Upgrade：`AirFleetMira`
- 描述：呼叫舰队持续时间提高
- 具体效果：
  - 最高等级：30
  - 影响单位：Caster
  - AirFleetABMira：持续时间 +1.000000

### 6. 精确轰炸
- Upgrade：`StrikeFighterAMira`
- 描述：提高攻击战斗机打击半径
- 具体效果：
  - 最高等级：30
  - 影响单位：攻击战斗机
  - BomberAreaBombFireSearchMira：AreaArray[0].半径 +0.02
  - BomberAreaBombSearchAreaMira：AreaArray[0].半径 +0.02

