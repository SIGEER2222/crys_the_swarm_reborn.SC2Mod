# 2026-05-26 Swann 指挥官加点与精通

`Upgrade` 保留内部 ID；效果对象和字段尽量使用中文名称，便于直接查看实际加成。

## 加点

### 1. 狮群领主
- 花费：10
- Upgrade：`Vanguard1Swann`
- 描述：重工生产掠食者和警戒机器人充能次数翻倍，充能时间减少
- 具体效果：
  - 影响单位：重工厂
  - FactoryTrain：Train11最大充能数 +10
  - FactoryTrain：Train12最大充能数 +10
  - FactoryTrain：Train11初始充能时间 -15
  - FactoryTrain：Train11充能时间 -15
  - FactoryTrain：Train12初始充能时间 -15
  - FactoryTrain：Train12充能时间 -15

### 2. 双倍SCV
- 花费：10
- Upgrade：`ProductiveUpgradeSwann`
- 描述：指挥中心可以同时生产两个SCV
- 具体效果：
  - 最高等级：30
  - 影响单位：工程站、军械库
  - EngineeringBayResearch：InfoArray[Research1].Resource[Minerals] -1
  - EngineeringBayResearch：InfoArray[Research1].Resource[Vespene] -1
  - EngineeringBayResearch：Research1训练/建造时间 -1.000000
  - EngineeringBayResearch：InfoArray[Research2].Resource[Minerals] -1
  - EngineeringBayResearch：InfoArray[Research2].Resource[Vespene] -1
  - EngineeringBayResearch：Research2训练/建造时间 -1.000000
  - EngineeringBayResearch：InfoArray[Research3].Resource[Minerals] -1
  - EngineeringBayResearch：InfoArray[Research3].Resource[Vespene] -1
  - EngineeringBayResearch：Research3训练/建造时间 -1.000000
  - EngineeringBayResearch：InfoArray[Research4].Resource[Minerals] -1
  - EngineeringBayResearch：InfoArray[Research4].Resource[Vespene] -1
  - EngineeringBayResearch：Research4训练/建造时间 -1.000000
  - EngineeringBayResearch：InfoArray[Research5].Resource[Minerals] -1
  - EngineeringBayResearch：InfoArray[Research5].Resource[Vespene] -1
  - EngineeringBayResearch：Research5训练/建造时间 -1.000000
  - EngineeringBayResearch：InfoArray[Research6].Resource[Minerals] -1
  - EngineeringBayResearch：InfoArray[Research6].Resource[Vespene] -1
  - EngineeringBayResearch：Research6训练/建造时间 -1.000000
  - EngineeringBayResearch：InfoArray[Research7].Resource[Minerals] -1
  - EngineeringBayResearch：InfoArray[Research7].Resource[Vespene] -1
  - EngineeringBayResearch：Research7训练/建造时间 -1.000000
  - EngineeringBayResearch：InfoArray[Research8].Resource[Minerals] -1
  - EngineeringBayResearch：InfoArray[Research8].Resource[Vespene] -1
  - EngineeringBayResearch：Research8训练/建造时间 -1.000000
  - ArmoryResearchSwann：InfoArray[Research1].Resource[Minerals] -1
  - ArmoryResearchSwann：InfoArray[Research1].Resource[Vespene] -1
  - ArmoryResearchSwann：Research1训练/建造时间 -2.000000
  - ArmoryResearchSwann：InfoArray[Research2].Resource[Minerals] -2
  - ArmoryResearchSwann：InfoArray[Research2].Resource[Vespene] -2
  - ArmoryResearchSwann：Research2训练/建造时间 -2.000000
  - ArmoryResearchSwann：InfoArray[Research3].Resource[Minerals] -2
  - ArmoryResearchSwann：InfoArray[Research3].Resource[Vespene] -2
  - ArmoryResearchSwann：Research3训练/建造时间 -2.000000
  - ArmoryResearchSwann：InfoArray[Research4].Resource[Minerals] -2
  - ArmoryResearchSwann：InfoArray[Research4].Resource[Vespene] -2
  - ArmoryResearchSwann：Research4训练/建造时间 -2.000000
  - ArmoryResearchSwann：InfoArray[Research5].Resource[Minerals] -2
  - ArmoryResearchSwann：InfoArray[Research5].Resource[Vespene] -2
  - ArmoryResearchSwann：Research5训练/建造时间 -2.000000
  - ArmoryResearchSwann：InfoArray[Research6].Resource[Minerals] -1
  - ArmoryResearchSwann：InfoArray[Research6].Resource[Vespene] -1
  - ArmoryResearchSwann：Research6训练/建造时间 -2.000000
  - ArmoryResearchSwann：InfoArray[Research7].Resource[Minerals] -2
  - ArmoryResearchSwann：InfoArray[Research7].Resource[Vespene] -2
  - ArmoryResearchSwann：Research7训练/建造时间 -2.000000
  - ArmoryResearchSwann：InfoArray[Research8].Resource[Minerals] -2
  - ArmoryResearchSwann：InfoArray[Research8].Resource[Vespene] -2
  - ArmoryResearchSwann：Research8训练/建造时间 -2.000000
  - ArmoryResearchSwann：InfoArray[Research9].Resource[Minerals] -2
  - ArmoryResearchSwann：InfoArray[Research9].Resource[Vespene] -2
  - ArmoryResearchSwann：Research9训练/建造时间 -2.000000
  - ArmoryResearchSwann：InfoArray[Research10].Resource[Minerals] -2
  - ArmoryResearchSwann：InfoArray[Research10].Resource[Vespene] -2
  - ArmoryResearchSwann：Research10训练/建造时间 -2.000000
  - ArmoryResearchSwann：InfoArray[Research13].Resource[Minerals] -1
  - ArmoryResearchSwann：InfoArray[Research13].Resource[Vespene] -1
  - ArmoryResearchSwann：Research13训练/建造时间 -2.000000
  - ArmoryResearchSwann：InfoArray[Research14].Resource[Minerals] -1
  - ArmoryResearchSwann：InfoArray[Research14].Resource[Vespene] -1
  - ArmoryResearchSwann：Research14训练/建造时间 -1.000000

### 3. 瓦斯采集器
- 花费：10
- Upgrade：`VespeneDroneSwann`
- 描述：指挥中心可以使用瓦斯采集器
- 具体效果：
  - 影响单位：指挥中心

### 4. 战斗空投
- 花费：15
- Upgrade：`CombatDropSwann`
- 描述：战斗空投的战斗机器人数量提高4
- 具体效果：
  - 影响单位：Caster
  - CombatDropCUSwann：SpawnCount +4

### 5. 机械专业
- 花费：15
- Upgrade：`UnitLifeSwann`
- 描述：斯旺的机械单位生命提高20%
- 具体效果：
  - 影响单位：大力神、掠食者、歌利亚武装机器人、攻城坦克、警戒机器人、科学船、雷神、怨灵战机、SCV
  - 大力神：初始生命值 +120
  - 大力神：生命上限 +120
  - 掠食者：初始生命值 +40
  - 掠食者：生命上限 +40
  - 歌利亚武装机器人：初始生命值 +30
  - 歌利亚武装机器人：生命上限 +30
  - 攻城坦克：初始生命值 +40
  - 攻城坦克：生命上限 +40
  - 警戒机器人：初始生命值 +20
  - 警戒机器人：生命上限 +20
  - 科学船：初始生命值 +40
  - 科学船：生命上限 +40
  - 雷神：初始生命值 +80
  - 雷神：生命上限 +80
  - 怨灵战机：初始生命值 +40
  - 怨灵战机：生命上限 +40
  - SCV：初始生命值 +20
  - SCV：生命上限 +20

### 6. 强化钻机
- 花费：25
- Upgrade：`DrakkenLaserDrillUSwann`
- 描述：激光钻机造成范围伤害并减速
- 具体效果：
  - 影响单位：德拉肯激光钻机
  - LaserDrillTripodS：Chance 设为 1
  - Laser Drill Tripod Coop Create Persistent：PeriodCount 设为 2
  - LaserDrillTripodAB：Chance 设为 1

### 7. 高级攻防
- 花费：20
- Upgrade：`UpgradeSwann`
- 描述：解锁四、五级攻防
- 具体效果：
  - 未解析到直接数值效果（可能只用于解锁、触发或界面状态）。

### 8. 炮塔专精
- 花费：30
- Upgrade：`GreaseMonkeySwann`
- 描述：解锁新的炮塔升级
- 具体效果：
  - 未解析到直接数值效果（可能只用于解锁、触发或界面状态）。

## 精通

### 1. 汇聚射线
- Upgrade：`MasterySwannConcentratedBeam`
- 描述：提高汇聚射线宽度和伤害
- 具体效果：
  - 最高等级：30
  - 汇聚射线显示值：效果数值 +8
  - 汇聚射线显示值：效果数值 +2
  - Drakken Laser Drill BFG Search：AreaArray[0].RectangleWidth +0.08
  - Drakken Laser Drill BFG Damage：效果数值 +8
  - LaserDrillTripodBFGGuide：Width +0.080000

### 2. 战斗空投
- Upgrade：`CombatDropTLSwann`
- 描述：提高武装机器人持续时间和生命
- 具体效果：
  - 最高等级：30
  - 影响单位：Caster、武装机器人
  - CombatDropTLSwann：持续时间 +1.000000
  - 武装机器人：初始生命值 +10
  - 武装机器人：生命上限 +10

### 3. 高效升级
- Upgrade：`ProductiveUpgradeSwann`
- 描述：工程站和军械库以更快和更低的消耗研发升级
- 具体效果：
  - 最高等级：30
  - 影响单位：工程站、军械库
  - EngineeringBayResearch：InfoArray[Research1].Resource[Minerals] -1
  - EngineeringBayResearch：InfoArray[Research1].Resource[Vespene] -1
  - EngineeringBayResearch：Research1训练/建造时间 -1.000000
  - EngineeringBayResearch：InfoArray[Research2].Resource[Minerals] -1
  - EngineeringBayResearch：InfoArray[Research2].Resource[Vespene] -1
  - EngineeringBayResearch：Research2训练/建造时间 -1.000000
  - EngineeringBayResearch：InfoArray[Research3].Resource[Minerals] -1
  - EngineeringBayResearch：InfoArray[Research3].Resource[Vespene] -1
  - EngineeringBayResearch：Research3训练/建造时间 -1.000000
  - EngineeringBayResearch：InfoArray[Research4].Resource[Minerals] -1
  - EngineeringBayResearch：InfoArray[Research4].Resource[Vespene] -1
  - EngineeringBayResearch：Research4训练/建造时间 -1.000000
  - EngineeringBayResearch：InfoArray[Research5].Resource[Minerals] -1
  - EngineeringBayResearch：InfoArray[Research5].Resource[Vespene] -1
  - EngineeringBayResearch：Research5训练/建造时间 -1.000000
  - EngineeringBayResearch：InfoArray[Research6].Resource[Minerals] -1
  - EngineeringBayResearch：InfoArray[Research6].Resource[Vespene] -1
  - EngineeringBayResearch：Research6训练/建造时间 -1.000000
  - EngineeringBayResearch：InfoArray[Research7].Resource[Minerals] -1
  - EngineeringBayResearch：InfoArray[Research7].Resource[Vespene] -1
  - EngineeringBayResearch：Research7训练/建造时间 -1.000000
  - EngineeringBayResearch：InfoArray[Research8].Resource[Minerals] -1
  - EngineeringBayResearch：InfoArray[Research8].Resource[Vespene] -1
  - EngineeringBayResearch：Research8训练/建造时间 -1.000000
  - ArmoryResearchSwann：InfoArray[Research1].Resource[Minerals] -1
  - ArmoryResearchSwann：InfoArray[Research1].Resource[Vespene] -1
  - ArmoryResearchSwann：Research1训练/建造时间 -2.000000
  - ArmoryResearchSwann：InfoArray[Research2].Resource[Minerals] -2
  - ArmoryResearchSwann：InfoArray[Research2].Resource[Vespene] -2
  - ArmoryResearchSwann：Research2训练/建造时间 -2.000000
  - ArmoryResearchSwann：InfoArray[Research3].Resource[Minerals] -2
  - ArmoryResearchSwann：InfoArray[Research3].Resource[Vespene] -2
  - ArmoryResearchSwann：Research3训练/建造时间 -2.000000
  - ArmoryResearchSwann：InfoArray[Research4].Resource[Minerals] -2
  - ArmoryResearchSwann：InfoArray[Research4].Resource[Vespene] -2
  - ArmoryResearchSwann：Research4训练/建造时间 -2.000000
  - ArmoryResearchSwann：InfoArray[Research5].Resource[Minerals] -2
  - ArmoryResearchSwann：InfoArray[Research5].Resource[Vespene] -2
  - ArmoryResearchSwann：Research5训练/建造时间 -2.000000
  - ArmoryResearchSwann：InfoArray[Research6].Resource[Minerals] -1
  - ArmoryResearchSwann：InfoArray[Research6].Resource[Vespene] -1
  - ArmoryResearchSwann：Research6训练/建造时间 -2.000000
  - ArmoryResearchSwann：InfoArray[Research7].Resource[Minerals] -2
  - ArmoryResearchSwann：InfoArray[Research7].Resource[Vespene] -2
  - ArmoryResearchSwann：Research7训练/建造时间 -2.000000
  - ArmoryResearchSwann：InfoArray[Research8].Resource[Minerals] -2
  - ArmoryResearchSwann：InfoArray[Research8].Resource[Vespene] -2
  - ArmoryResearchSwann：Research8训练/建造时间 -2.000000
  - ArmoryResearchSwann：InfoArray[Research9].Resource[Minerals] -2
  - ArmoryResearchSwann：InfoArray[Research9].Resource[Vespene] -2
  - ArmoryResearchSwann：Research9训练/建造时间 -2.000000
  - ArmoryResearchSwann：InfoArray[Research10].Resource[Minerals] -2
  - ArmoryResearchSwann：InfoArray[Research10].Resource[Vespene] -2
  - ArmoryResearchSwann：Research10训练/建造时间 -2.000000
  - ArmoryResearchSwann：InfoArray[Research13].Resource[Minerals] -1
  - ArmoryResearchSwann：InfoArray[Research13].Resource[Vespene] -1
  - ArmoryResearchSwann：Research13训练/建造时间 -2.000000
  - ArmoryResearchSwann：InfoArray[Research14].Resource[Minerals] -1
  - ArmoryResearchSwann：InfoArray[Research14].Resource[Vespene] -1
  - ArmoryResearchSwann：Research14训练/建造时间 -1.000000

### 4. 建筑生命
- Upgrade：`StructureLifeSwann`
- 描述：提高建筑生命
- 具体效果：
  - 最高等级：30
  - 影响单位：爆弹比利、补给站、德拉肯激光钻机、感应塔、工程站、精炼厂、军械库、热辣贝蒂、星港、StarportSwannFlying、指挥中心、CommandCenterSwannFlying、重工厂、FactorySwannFlying、转转小子
  - 爆弹比利：初始生命值 +6
  - 爆弹比利：生命上限 +6
  - 补给站：初始生命值 +8
  - 补给站：生命上限 +8
  - 德拉肯激光钻机：初始生命值 +60
  - 德拉肯激光钻机：生命上限 +60
  - 感应塔：初始生命值 +4
  - 感应塔：生命上限 +4
  - 工程站：初始生命值 +17
  - 工程站：生命上限 +17
  - 精炼厂：初始生命值 +10
  - 精炼厂：生命上限 +10
  - 军械库：初始生命值 +15
  - 军械库：生命上限 +15
  - 热辣贝蒂：初始生命值 +7
  - 热辣贝蒂：生命上限 +7
  - 星港：初始生命值 +26
  - 星港：生命上限 +26
  - StarportSwannFlying：初始生命值 +26
  - StarportSwannFlying：生命上限 +26
  - 指挥中心：初始生命值 +30
  - 指挥中心：生命上限 +30
  - CommandCenterSwannFlying：初始生命值 +30
  - CommandCenterSwannFlying：生命上限 +30
  - 重工厂：初始生命值 +25
  - 重工厂：生命上限 +25
  - FactorySwannFlying：初始生命值 +25
  - FactorySwannFlying：生命上限 +25
  - 转转小子：初始生命值 +6
  - 转转小子：生命上限 +6

### 5. 脉冲炮
- Upgrade：`DrakkenLaserDrillNukeTSwann`
- 描述：脉冲炮冷却时间减少
- 具体效果：
  - 最高等级：30
  - 影响单位：德拉肯激光钻机
  - 德拉肯激光钻机脉冲炮：冷却时间 -2.000000

### 6. 钻机升级
- Upgrade：`DrakkenLaserDrillBuildSwann`
- 描述：减少激光钻机重建时间、升级时间和升级费用
- 具体效果：
  - 最高等级：30
  - 影响单位：德拉肯激光钻机
  - 德拉肯激光钻机研究：InfoArray[Research1].Resource[Minerals] -4
  - 德拉肯激光钻机研究：InfoArray[Research1].Resource[Vespene] -4
  - 德拉肯激光钻机研究：Research1训练/建造时间 -4.000000
  - 德拉肯激光钻机研究：InfoArray[Research2].Resource[Minerals] -6
  - 德拉肯激光钻机研究：InfoArray[Research2].Resource[Vespene] -6
  - 德拉肯激光钻机研究：Research2训练/建造时间 -6.000000
  - 建造德拉肯激光钻机合作模式：InfoArray[0].SectionArray[Abils].持续时间Array[Delay] -1.000000
  - 建造德拉肯激光钻机合作模式：InfoArray[0].SectionArray[Actor].持续时间Array[Delay] -1.000000
  - 建造德拉肯激光钻机合作模式：InfoArray[0].SectionArray[Collide].持续时间Array[持续时间] -1.000000
  - 建造德拉肯激光钻机合作模式：InfoArray[0].SectionArray[Stats].持续时间Array[Delay] -1.000000

