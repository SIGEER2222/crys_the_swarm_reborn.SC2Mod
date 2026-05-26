# 2026-05-26 Stetmann 指挥官加点与精通

`Upgrade` 保留内部 ID；效果对象和字段尽量使用中文名称，便于直接查看实际加成。

## 加点

### 1. 超级盖瑞
- 花费：10
- Upgrade：`SuperGaryStetmannAbilities`
- 描述：盖瑞可以变形成超级盖瑞
- 具体效果：
  - 未解析到直接数值效果（可能只用于解锁、触发或界面状态）。

### 2. 永远的朋友
- 花费：15
- Upgrade：`StetmannDeathRespawnAddCharge`
- 描述：艾星影响区域内的单位死亡时会生成对应残骸，每4个可在解锁建筑无消耗重建一个
- 具体效果：
  - BanelingStetmannDeathMP：Chance 设为 1
  - BroodLordStetmannDeathMP：Chance 设为 1
  - CorruptorStetmannDeathMP：Chance 设为 1
  - HydraliskStetmannDeathMP：Chance 设为 1
  - InfestorStetmannDeathMP：Chance 设为 1
  - LurkerStetmannDeathMP：Chance 设为 1
  - UltraliskStetmannDeathMP：Chance 设为 1
  - ZerglingStetmannDeathMP：Chance 设为 1

### 3. 技术帝
- 花费：10
- Upgrade：`DeployPowerTowerTechLevel`
- 描述：部署艾星减少冷却时间，增加最大使用次数
- 具体效果：
  - 部署能量塔：Build1初始充能时间 -5.000000
  - 部署能量塔：Build1充能时间 -5.000000
  - 部署能量塔：Build1最大充能数 +4

### 4. 信号专家
- 花费：20
- Upgrade：`CommanderPrestigeStetmannStetellites`
- 描述：艾星成功部署后无敌，影响范围扩大
- 具体效果：
  - PowerTowerDeathStetmann：状态标记：Invulnerable 设为 1
  - PowerTowerStetmannRange：施放距离 +3.625000

### 5. 艾贡极限
- 花费：15
- Upgrade：`StetmannBuildingDoubleQueue`
- 描述：斯台特曼的建筑可以同时研究两项升级
- 具体效果：
  - 未解析到直接数值效果（可能只用于解锁、触发或界面状态）。

### 6. 最佳伙伴
- 花费：20
- Upgrade：`CommanderPrestigeStetmannGary`
- 描述：盖瑞的生命值和伤害提高100%
- 具体效果：
  - GaryStetmannDamage：效果数值 +30
  - SuperGaryStetmannDamage：效果数值 +45
  - GaryStetmannOrbDamage：效果数值 +25
  - 盖瑞：初始生命值 +500
  - 盖瑞：生命上限 +500
  - 超级盖瑞：初始生命值 +1000
  - 超级盖瑞：生命上限 +1000

### 7. 高级攻防
- 花费：20
- Upgrade：`UpgradeStetmann`
- 描述：解锁四、五级攻防
- 具体效果：
  - 未解析到直接数值效果（可能只用于解锁、触发或界面状态）。

## 精通

### 1. 升级费用
- Upgrade：`MasteryStetmannUpgradeResearchCost`
- 描述：减少武器和护甲升级的研究费用
- 具体效果：
  - 最高等级：30
  - 影响单位：机械进化腔、机械尖塔、机械巨型尖塔
  - 研发：InfoArray[Research2].Resource[Vespene] -3
  - 研发：InfoArray[Research1].Resource[Minerals] -2
  - 研发：InfoArray[Research1].Resource[Vespene] -2
  - 研发：InfoArray[Research2].Resource[Minerals] -3
  - 研发：InfoArray[Research3].Resource[Minerals] -4
  - 研发：InfoArray[Research3].Resource[Vespene] -4
  - 研发：InfoArray[Research4].Resource[Minerals] -2
  - 研发：InfoArray[Research4].Resource[Vespene] -2
  - 研发：InfoArray[Research5].Resource[Minerals] -3
  - 研发：InfoArray[Research5].Resource[Vespene] -3
  - 研发：InfoArray[Research6].Resource[Minerals] -4
  - 研发：InfoArray[Research6].Resource[Vespene] -4
  - 研发：InfoArray[Research7].Resource[Minerals] -2
  - 研发：InfoArray[Research7].Resource[Vespene] -2
  - 研发：InfoArray[Research8].Resource[Minerals] -3
  - 研发：InfoArray[Research8].Resource[Vespene] -3
  - 研发：InfoArray[Research9].Resource[Minerals] -5
  - 研发：InfoArray[Research9].Resource[Vespene] -5
  - 研发：InfoArray[Research3].Resource[Minerals] -5
  - 研发：InfoArray[Research3].Resource[Vespene] -5
  - 研发：InfoArray[Research6].Resource[Minerals] -5
  - 研发：InfoArray[Research6].Resource[Vespene] -5
  - 研发：InfoArray[Research15].Resource[Minerals] -5
  - 研发：InfoArray[Research15].Resource[Vespene] -5
  - 研发：InfoArray[Research16].Resource[Minerals] -5
  - 研发：InfoArray[Research16].Resource[Vespene] -5
  - 研发：InfoArray[Research17].Resource[Minerals] -5
  - 研发：InfoArray[Research17].Resource[Vespene] -5
  - 研发：InfoArray[Research18].Resource[Minerals] -5
  - 研发：InfoArray[Research18].Resource[Vespene] -5
  - 研发：InfoArray[Research13].Resource[Minerals] -4
  - 研发：InfoArray[Research13].Resource[Vespene] -4
  - 研发：InfoArray[Research14].Resource[Minerals] -4
  - 研发：InfoArray[Research14].Resource[Vespene] -4
  - 研发：InfoArray[Research15].Resource[Minerals] -4
  - 研发：InfoArray[Research15].Resource[Vespene] -4
  - 研发：InfoArray[Research16].Resource[Minerals] -4
  - 研发：InfoArray[Research16].Resource[Vespene] -4

### 2. 盖瑞技能
- Upgrade：`MasteryStetmannGaryAbilityCooldown`
- 描述：减少盖瑞和超级高瑞技能的冷却时间
- 具体效果：
  - 最高等级：30
  - 影响单位：盖瑞、超级盖瑞
  - 盖瑞能量塔超载：充能时间 -0.450000
  - 超级盖瑞能量塔超载：充能时间 -0.450000
  - 盖瑞电球：充能时间 -0.300000
  - 超级盖瑞电球：充能时间 -0.300000
  - 超级盖瑞召回：充能时间 -1.800000
  - 盖瑞召回：充能时间 -1.800000
  - PowerFieldSuperGaryStetmann：冷却时间 -1.200000
  - 盖瑞技能显示值：效果数值 +1

### 4. 艾能上限
- Upgrade：`MasteryStetmannMaximumEgonergyPool`
- 描述：提高机械单位艾能池上限
- 具体效果：
  - 最高等级：30
  - 影响单位：机械跳虫、机械爆虫、机械刺蛇、机械潜伏者、机械感染者、机械腐化者、机械巢式战列空母
  - 机械跳虫：能量上限 +1
  - 机械跳虫：能量Start +1
  - 机械爆虫：能量上限 +1
  - 机械爆虫：能量Start +1
  - 机械刺蛇：能量上限 +2
  - 机械刺蛇：能量Start +2
  - 机械潜伏者：能量上限 +4
  - 机械潜伏者：能量Start +4
  - 机械感染者：能量上限 +8
  - 机械感染者：能量Start +8
  - 机械雷兽：能量上限 +6
  - 机械雷兽：能量Start +6
  - 机械腐化者：能量上限 +4
  - 机械腐化者：能量Start +4
  - 机械巢式战列空母：能量上限 +8
  - 机械巢式战列空母：能量Start +8
  - 艾能上限显示值：效果数值 +2

### 5. 艾星冷却
- Upgrade：`MasteryStetmannDeployStetelliteCooldown`
- 描述：减少部署艾星的冷却时间
- 具体效果：
  - 最高等级：30
  - 影响单位：合作模式 施法者 斯台特曼 /// Coop Caster Stetmann
  - 部署能量塔：Build1初始充能时间 -0.3
  - 部署能量塔：Build1充能时间 -0.3
  - 艾星冷却显示值：效果数值 +0.3

### 6. 建筑变形
- Upgrade：`MasteryStetmannStructureMorphRate`
- 描述：减少变形建筑所花费的时间
- 具体效果：
  - 最高等级：30
  - 影响单位：机械孵化场、机械虫穴、机械主巢、机械萃取房、机械分裂池、机械爆虫巢穴、机械进化腔、机械脊针爬虫、机械孢子爬虫、机械刺蛇巢、机械潜伏者巢穴、机械感染深渊、机械尖塔、机械巨型尖塔、机械雷兽窟
  - 变形单位 (工蜂 -> 斯台特曼建筑)：Build1训练/建造时间 -1.200000
  - 变形单位 (工蜂 -> 斯台特曼建筑)：Build11训练/建造时间 -0.600000
  - 变形单位 (工蜂 -> 斯台特曼建筑)：Build15训练/建造时间 -0.600000
  - 变形单位 (工蜂 -> 斯台特曼建筑)：Build16训练/建造时间 -0.600000
  - 变形单位 (工蜂 -> 斯台特曼建筑)：Build3训练/建造时间 -0.600000
  - 变形单位 (工蜂 -> 斯台特曼建筑)：Build4训练/建造时间 -0.600000
  - 变形单位 (工蜂 -> 斯台特曼建筑)：Build5训练/建造时间 -0.800000
  - 变形单位 (工蜂 -> 斯台特曼建筑)：Build6训练/建造时间 -0.800000
  - 变形单位 (工蜂 -> 斯台特曼建筑)：Build7训练/建造时间 -0.800000
  - 变形单位 (工蜂 -> 斯台特曼建筑)：Build8训练/建造时间 -1.000000
  - 变形单位 (工蜂 -> 斯台特曼建筑)：Build9训练/建造时间 -0.800000
  - 变形建筑 (孵化场 斯台特曼 -> 虫穴 斯台特曼)：InfoArray[0].SectionArray[Abils].持续时间Array[Delay] -1.200000
  - 变形建筑 (孵化场 斯台特曼 -> 虫穴 斯台特曼)：InfoArray[0].SectionArray[Actor].持续时间Array[持续时间] -1.200000
  - 变形建筑 (孵化场 斯台特曼 -> 虫穴 斯台特曼)：InfoArray[0].SectionArray[Stats].持续时间Array[Delay] -1.200000
  - 变形建筑 (虫穴 斯台特曼 -> 主巢 斯台特曼)：InfoArray[0].SectionArray[Abils].持续时间Array[Delay] -1.200000
  - 变形建筑 (虫穴 斯台特曼 -> 主巢 斯台特曼)：InfoArray[0].SectionArray[Actor].持续时间Array[持续时间] -1.200000
  - 变形建筑 (虫穴 斯台特曼 -> 主巢 斯台特曼)：InfoArray[0].SectionArray[Stats].持续时间Array[Delay] -1.200000
  - 变形建筑 (刺蛇巢 斯台特曼 -> 潜伏者巢穴 斯台特曼)：InfoArray[0].SectionArray[Abils].持续时间Array[Delay] -0.600000
  - 变形建筑 (刺蛇巢 斯台特曼 -> 潜伏者巢穴 斯台特曼)：InfoArray[0].SectionArray[Actor].持续时间Array[持续时间] -0.600000
  - 变形建筑 (刺蛇巢 斯台特曼 -> 潜伏者巢穴 斯台特曼)：InfoArray[0].SectionArray[Stats].持续时间Array[Delay] -0.600000
  - 变形建筑 (尖塔 斯台特曼 -> 巨型尖塔 斯台特曼)：InfoArray[0].SectionArray[Abils].持续时间Array[Delay] -0.600000
  - 变形建筑 (尖塔 斯台特曼 -> 巨型尖塔 斯台特曼)：InfoArray[0].SectionArray[Actor].持续时间Array[持续时间] -0.600000
  - 变形建筑 (尖塔 斯台特曼 -> 巨型尖塔 斯台特曼)：InfoArray[0].SectionArray[Stats].持续时间Array[Delay] -0.600000
  - 建筑变形显示值：效果数值 +2

