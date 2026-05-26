# 2026-05-26 Mengsk 指挥官加点与精通

`Upgrade` 保留内部 ID；效果对象和字段尽量使用中文名称，便于直接查看实际加成。

## 加点

### 1. 天命皇权
- 花费：15
- Upgrade：`MengskEnergyStart`
- 描述：天命皇权上限提高，强制征召最大充能次数增加
- 具体效果：
  - 影响单位：合作任务施法者 蒙斯克 /// Coop Caster Mengsk
  - 合作任务施法者 蒙斯克 /// Coop Caster Mengsk：能量上限 +100
  - 强制征召：Build1最大充能数 +2
  - 强制征召：Build1初始充能数 +2

### 2. 八字克土
- 花费：15
- Upgrade：`EarthBrokenMengsk`
- 描述：冲锋队员在操作大地碎裂炮时会提供帝国支持度
- 具体效果：
  - 影响单位：大地碎裂炮
  - EarthBrokenMengskAB：Chance 设为 1
  - EarthBrokenMengskRB：Chance 设为 1

### 3. 战争恶狼
- 花费：15
- Upgrade：`WolvesOfWarMengsk`
- 描述：战争恶犬现在在更高级等级的天命皇权状态下部署额外的异龙和雷兽
- 具体效果：
  - 未解析到直接数值效果（可能只用于解锁、触发或界面状态）。

### 4. 毒性暴君
- 花费：20
- Upgrade：`ToxicTyrantMengsk`
- 描述：辐射打击造成的恐惧时间延长，持续伤害期间受到的伤害提高，消耗和冷却时间降低
- 具体效果：
  - 影响单位：合作任务施法者 蒙斯克 /// Coop Caster Mengsk、大地碎裂炮
  - 辐射打击：Cost[0].Vital[能量] -5
  - 辐射打击：冷却时间 -20.000000
  - 辐射打击：触发概率 设为 1
  - 恐惧：持续时间 +5

### 5. 彻底毁灭
- 花费：15
- Upgrade：`CompleteAnnihilationMengsk`
- 描述：核弹天劫降下的战术飞弹数量提高
- 具体效果：
  - 影响单位：合作任务施法者 蒙斯克 /// Coop Caster Mengsk
  - NuclearAnnihilationMengsk40：PeriodCount +20

### 6. 皇家卫队
- 花费：30
- Upgrade：`CommanderPrestigeMengskRoyalGuard`
- 描述：皇家卫队消耗的高能瓦斯降低，经验获取提高
- 具体效果：
  - 壁垒卫士：瓦斯消耗 -87
  - 元首鬼影：瓦斯消耗 -125
  - 冲击分队：瓦斯消耗 -106
  - 黑色战锤：瓦斯消耗 -150
  - 天空之怒：瓦斯消耗 -94
  - 奥古斯特格勒的骄傲：瓦斯消耗 -225

### 7. 精锐之师
- 花费：15
- Upgrade：`WeaponMengsk`
- 描述：可以升级4、5级攻防
- 具体效果：
  - 未解析到直接数值效果（可能只用于解锁、触发或界面状态）。

### 8. 死亡贩子
- 花费：30
- Upgrade：`CommanderPrestigeMengskTroopers`
- 描述：冲锋队员死后启动武器自毁。冲锋队员武器消耗40晶体矿和20瓦斯
- 具体效果：
  - 帝国 突击手 冲锋队：矿物消耗 -120
  - 帝国 突击手 冲锋队：瓦斯消耗 +20
  - 帝国 火箭筒 冲锋队：矿物消耗 -120
  - 帝国 火箭筒 冲锋队：瓦斯消耗 +20
  - 帝国 火焰器 冲锋队：矿物消耗 -120
  - 帝国 火焰器 冲锋队：瓦斯消耗 +20

## 精通

### 3. 成吨伤害
- Upgrade：`MasteryMengskTopPanelPower`
- 描述：提高辐射打击、核弹天劫以及战争恶犬的伤害
- 具体效果：
  - 最高等级：30
  - 成吨伤害显示值：效果数值 +1
  - ArtilleryMengskExperimentalStrikePeriodicDamage：效果数值 +0.05
  - NuclearAnnihilationMengskSmallNukeDamage：效果数值 +1.5
  - NuclearAnnihilationMengskDamage：效果数值 +5
  - ZerglingMengskAttackDamage：效果数值 +0.05
  - NeedleSpinesMengskDamage：效果数值 +0.12
  - HydraliskMengskMeleeDamage：效果数值 +0.12
  - MutaliskMengskGlaiveWurmDamage：效果数值 +0.09
  - MutaliskMengskGlaiveWurmSecondImpactDamage：效果数值 +0.03
  - MutaliskMengskGlaiveWurmThirdImpactDamage：效果数值 +0.01
  - UltraliskMengskKaiserBladesDamage：效果数值 +0.35
  - NuclearAnnihilationMengskDamage：AttributeBonus[Structure] +3
  - NuclearAnnihilationMengskSmallNukeDamage：AttributeBonus[Structure] +1

### 4. 皇卫费用
- Upgrade：`RoyalGuardCostMengsk`
- 描述：减少皇家卫队费用
- 具体效果：
  - 最高等级：30
  - 影响单位：奥古斯特格勒的骄傲、壁垒卫士、冲击分队、黑色战锤、天空之怒、元首鬼影
  - 奥古斯特格勒的骄傲：矿物消耗 -2
  - 奥古斯特格勒的骄傲：瓦斯消耗 -6
  - 壁垒卫士：矿物消耗 -1
  - 壁垒卫士：瓦斯消耗 -2
  - 冲击分队：矿物消耗 -1
  - 冲击分队：瓦斯消耗 -3
  - 黑色战锤：矿物消耗 -2
  - 黑色战锤：瓦斯消耗 -4
  - 天空之怒：矿物消耗 -1
  - 天空之怒：瓦斯消耗 -2
  - 元首鬼影：矿物消耗 -2
  - 元首鬼影：瓦斯消耗 -3

