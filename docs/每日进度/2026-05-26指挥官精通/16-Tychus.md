# 2026-05-26 Tychus 指挥官加点与精通

`Upgrade` 保留内部 ID；效果对象和字段尽量使用中文名称，便于直接查看实际加成。

## 加点

### 1. 红色按钮
- 花费：20
- Upgrade：`TychusOdinRedButton`
- 描述：奥丁可以进行聚变打击
- 具体效果：
  - 未解析到直接数值效果（可能只用于解锁、触发或界面状态）。

### 2. 顺手牵羊
- 花费：10
- Upgrade：`TychusCoopEquipmentCostUpgrade`
- 描述：所有装备费用减少100矿气
- 具体效果：
  - TychusHeroResearch：InfoArray[Research1].Resource[Minerals] -100
  - TychusHeroResearch：InfoArray[Research1].Resource[Vespene] -100
  - TychusHeroResearch：InfoArray[Research2].Resource[Minerals] -100
  - TychusHeroResearch：InfoArray[Research2].Resource[Vespene] -100
  - TychusHeroResearch：InfoArray[Research3].Resource[Minerals] -100
  - TychusHeroResearch：InfoArray[Research3].Resource[Vespene] -100
  - TychusHeroResearch：InfoArray[Research5].Resource[Minerals] -100
  - TychusHeroResearch：InfoArray[Research5].Resource[Vespene] -100
  - TychusHeroResearch：InfoArray[Research6].Resource[Minerals] -100
  - TychusHeroResearch：InfoArray[Research6].Resource[Vespene] -100
  - TychusHeroResearch：InfoArray[Research7].Resource[Minerals] -100
  - TychusHeroResearch：InfoArray[Research7].Resource[Vespene] -100
  - TychusHeroResearch：InfoArray[Research9].Resource[Minerals] -100
  - TychusHeroResearch：InfoArray[Research9].Resource[Vespene] -100
  - TychusHeroResearch：InfoArray[Research10].Resource[Minerals] -100
  - TychusHeroResearch：InfoArray[Research10].Resource[Vespene] -100
  - TychusHeroResearch：InfoArray[Research11].Resource[Minerals] -100
  - TychusHeroResearch：InfoArray[Research11].Resource[Vespene] -100
  - TychusHeroResearch2：InfoArray[Research1].Resource[Minerals] -100
  - TychusHeroResearch2：InfoArray[Research1].Resource[Vespene] -100
  - TychusHeroResearch2：InfoArray[Research2].Resource[Minerals] -100
  - TychusHeroResearch2：InfoArray[Research2].Resource[Vespene] -100
  - TychusHeroResearch2：InfoArray[Research4].Resource[Minerals] -100
  - TychusHeroResearch2：InfoArray[Research4].Resource[Vespene] -100
  - TychusHeroResearch2：InfoArray[Research5].Resource[Minerals] -100
  - TychusHeroResearch2：InfoArray[Research5].Resource[Vespene] -100
  - TychusHeroResearch2：InfoArray[Research6].Resource[Minerals] -100
  - TychusHeroResearch2：InfoArray[Research6].Resource[Vespene] -100
  - TychusHeroResearch2：InfoArray[Research7].Resource[Minerals] -100
  - TychusHeroResearch2：InfoArray[Research7].Resource[Vespene] -100
  - TychusHeroResearch2：InfoArray[Research9].Resource[Minerals] -100
  - TychusHeroResearch2：InfoArray[Research9].Resource[Vespene] -100
  - TychusHeroResearch2：InfoArray[Research10].Resource[Minerals] -100
  - TychusHeroResearch2：InfoArray[Research10].Resource[Vespene] -100
  - TychusHeroResearch2：InfoArray[Research11].Resource[Minerals] -100
  - TychusHeroResearch2：InfoArray[Research11].Resource[Vespene] -100
  - TychusHeroResearch2：InfoArray[Research13].Resource[Minerals] -100
  - TychusHeroResearch2：InfoArray[Research13].Resource[Vespene] -100
  - TychusHeroResearch2：InfoArray[Research14].Resource[Minerals] -100
  - TychusHeroResearch2：InfoArray[Research14].Resource[Vespene] -100
  - TychusHeroResearch2：InfoArray[Research15].Resource[Minerals] -100
  - TychusHeroResearch2：InfoArray[Research15].Resource[Vespene] -100
  - TychusHeroResearch2：InfoArray[Research17].Resource[Minerals] -100
  - TychusHeroResearch2：InfoArray[Research17].Resource[Vespene] -100
  - TychusHeroResearch2：InfoArray[Research19].Resource[Minerals] -100
  - TychusHeroResearch2：InfoArray[Research19].Resource[Vespene] -100
  - TychusHeroResearch2：InfoArray[Research20].Resource[Minerals] -100
  - TychusHeroResearch2：InfoArray[Research20].Resource[Vespene] -100
  - TychusHeroResearch2：InfoArray[Research22].Resource[Minerals] -100
  - TychusHeroResearch2：InfoArray[Research22].Resource[Vespene] -100
  - TychusHeroResearch2：InfoArray[Research23].Resource[Minerals] -100
  - TychusHeroResearch2：InfoArray[Research23].Resource[Vespene] -100
  - TychusHeroResearch2：InfoArray[Research24].Resource[Minerals] -100
  - TychusHeroResearch2：InfoArray[Research24].Resource[Vespene] -100

### 3. 飞的
- 花费：15
- Upgrade：`TychusCoopMedivacChargesUpgrade`
- 描述：医疗运输机平台最大数量提高到3个
- 具体效果：
  - 建造(SCV)：Build14建造需求 设为 TychusMedivacPlatform

### 4. 终极装备
- 花费：15
- Upgrade：`TychusGearCache`
- 描述：解锁不法之徒的终极装备
- 具体效果：
  - 未解析到直接数值效果（可能只用于解锁、触发或界面状态）。

### 5. 遛狗师
- 花费：25
- Upgrade：`CommanderPrestigeTychusOdin`
- 描述：奥丁持续时间提高60s，冷却时间缩短40%
- 具体效果：
  - TychusCalldownOdinTargeted：冷却时间 -120.000000
  - TychusCalldownOdinTeleportCasterOffset：Chance -1
  - TychusCalldownOdinTransferGroup：Chance -1
  - TychusCalldownOdinUISwap：Chance -1
  - TychusOdinTimedLife：持续时间 +60
  - 界面/名称/说明文本改动：2 条

### 6. 技术专员
- 花费：20
- Upgrade：`CommanderPrestigeTychusSquadAbilities`
- 描述：不法之徒主动技能冷却时间缩短35%
- 具体效果：
  - 影响单位：泰凯斯·芬利、迈尔斯“布雷泽”刘易斯、维嘉、凯文“响尾蛇”韦斯特、罗布“弹头哥”博斯韦尔、詹姆斯“天狼星”赛克斯、莱纳·尼卡拉中尉、“老油条”萨姆、纳克斯
  - TychusOutlawUnlockDurationDummy：效果数值 +120
  - 粉碎者手雷：冷却时间 -7.000000
  - 爆破炸弹：初始充能时间 -10.500000
  - 爆破炸弹：充能时间 -10.500000
  - TychusWarhoundBuildAutoTurret：初始充能时间 -5.250000
  - TychusWarhoundBuildAutoTurret：充能时间 -5.250000
  - TychusFirebatOilBomb：冷却时间 -5.250000
  - TychusHercGrapple：冷却时间 -5.250000
  - TychusMarauderBuildHealingWard：初始充能时间 -10.500000
  - TychusMarauderBuildHealingWard：充能时间 -10.500000
  - 超声波脉冲：初始充能时间 -10.500000
  - 超声波脉冲：充能时间 -10.500000
  - TychusGhostDominate：初始充能时间 -10.500000
  - TychusGhostDominate：充能时间 -10.500000
  - TychusMedicAoE：冷却时间 -10.500000
  - TychusOutlawCostFactor：效果数值 +0.5

### 7. 全副武装
- 花费：20
- Upgrade：`TychusUpgrade`
- 描述：解锁4、5级攻防
- 具体效果：
  - 未解析到直接数值效果（可能只用于解锁、触发或界面状态）。

### 8. 独狼
- 花费：30
- Upgrade：`TychusLoneWolf`
- 描述：不法之徒12码范围内无其他不法之徒时，受到的伤害降低50%，且每招募一个不法之徒，伤害提高30%
- 具体效果：
  - 被控制：DamageDealtFraction[Melee] +0.3
  - 被控制：DamageDealtFraction[NoProc] +0.3
  - 被控制：DamageDealtFraction[Ranged] +0.3
  - 被控制：DamageDealtFraction[Spell] +0.3
  - 被控制：DamageDealtFraction[Splash] +0.3
  - TychusWarhoundAutoTurretTimedLife：DamageDealtFraction[Melee] +0.3
  - TychusWarhoundAutoTurretTimedLife：DamageDealtFraction[NoProc] +0.3
  - TychusWarhoundAutoTurretTimedLife：DamageDealtFraction[Ranged] +0.3
  - TychusWarhoundAutoTurretTimedLife：DamageDealtFraction[Spell] +0.3
  - TychusWarhoundAutoTurretTimedLife：DamageDealtFraction[Splash] +0.3
  - 被控制：DamageTakenFraction[Melee] -0.5
  - 被控制：DamageTakenFraction[NoProc] -0.5
  - 被控制：DamageTakenFraction[Ranged] -0.5
  - 被控制：DamageTakenFraction[Spell] -0.5
  - 被控制：DamageTakenFraction[Splash] -0.5
  - TychusWarhoundAutoTurretTimedLife：DamageTakenFraction[Melee] -0.5
  - TychusWarhoundAutoTurretTimedLife：DamageTakenFraction[NoProc] -0.5
  - TychusWarhoundAutoTurretTimedLife：DamageTakenFraction[Ranged] -0.5
  - TychusWarhoundAutoTurretTimedLife：DamageTakenFraction[Spell] -0.5
  - TychusWarhoundAutoTurretTimedLife：DamageTakenFraction[Splash] -0.5

## 精通

### 1. 泰凯斯攻速
- Upgrade：`MasteryTychusCommanderAttackSpeed`
- 描述：提高泰凯斯攻击速度1%
- 具体效果：
  - 最高等级：30
  - 影响单位：泰凯斯·芬利
  - 泰凯斯攻速显示值：效果数值 +1
  - 蜜语说服者：攻击间隔倍率 +0.01

### 2. 手雷冷却
- Upgrade：`MasteryTychusGrenadeCooldown`
- 描述：缩短泰凯斯粉碎者手雷冷却时间1%
- 具体效果：
  - 最高等级：30
  - 手雷冷却显示值：效果数值 +0.2
  - 粉碎者手雷：冷却时间 -0.200000

### 3. 不法之徒
- Upgrade：`TychusSquadSpecialization`
- 描述：提高枪王攻击速度，猛男生命值，鬼手的视野范围（需研究闪击GDM面罩）
- 具体效果：
  - 最高等级：30
  - 影响单位：泰凯斯·芬利、迈尔斯“布雷泽”刘易斯、维嘉、凯文“响尾蛇”韦斯特、罗布“弹头哥”博斯韦尔、詹姆斯“天狼星”赛克斯、莱纳·尼卡拉中尉、“老油条”萨姆、纳克斯
  - 蜜语说服者：攻击间隔倍率 +0.005
  - 交涉者：攻击间隔倍率 +0.005
  - 大汤姆：攻击间隔倍率 +0.005
  - 迈尔斯“布雷泽”刘易斯：初始生命值 +5
  - 迈尔斯“布雷泽”刘易斯：生命上限 +5
  - 凯文“响尾蛇”韦斯特：初始生命值 +3.125
  - 凯文“响尾蛇”韦斯特：生命上限 +3.125
  - 罗布“弹头哥”博斯韦尔：初始生命值 +5
  - 罗布“弹头哥”博斯韦尔：生命上限 +5
  - TychusSquadDetector：Detect +0.05
  - TychusSquadDetector：SightBonus +0.05

### 5. 运输机冷却
- Upgrade：`MasteryTychusMedivacBuff`
- 描述：医疗运输机空运技能冷却时间-1.5s
- 具体效果：
  - 最高等级：30
  - 运输机冷却显示值：效果数值 +1.5
  - TychusMedicTransportLoad：冷却时间 -1.500000

### 6. 奥丁冷却
- Upgrade：`MasteryTychusOdinCooldown`
- 描述：召唤奥丁技能的冷却时间-3s
- 具体效果：
  - 最高等级：30
  - 奥丁冷却显示值：效果数值 +4
  - TychusCalldownOdinTargeted：冷却时间 -3.000000

