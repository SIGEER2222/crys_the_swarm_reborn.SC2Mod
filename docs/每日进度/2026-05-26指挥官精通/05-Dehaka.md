# 2026-05-26 Dehaka 指挥官加点与精通

`Upgrade` 保留内部 ID；效果对象和字段尽量使用中文名称，便于直接查看实际加成。

## 加点

### 2. 起始点数
- 花费：15
- Upgrade：`DehakaBonusSkillPoint`
- 描述：德哈卡一开始就有额外突变点数
- 具体效果：
  - DehakaLearn：Points +1

### 3. 深槽虫道
- 花费：15
- Upgrade：`DeepTunnelDehaka`
- 描述：德哈卡、原始蠕虫和大型原始蠕虫获得深槽虫道技能
- 具体效果：
  - 影响单位：德哈卡、大型原始蠕虫、原始蠕虫

### 4. 二矿石头
- 花费：10
- Upgrade：`StoneDehaka`
- 描述：原始主巢、原始战争之巢移速增加，武器升级
- 具体效果：
  - 影响单位：原始战争之巢、原始主巢
  - 原始战争之巢：移动速度 +1.500000
  - 原始主巢：移动速度 +1.500000
  - 酸性喷吐：施放距离 +3
  - 酸性喷吐：攻击间隔倍率 +1
  - 酸性喷吐：MinScanRange +3
  - Dehaka Town Hall Base Weapon Damage：效果数值 +10

### 5. 高级攻防
- 花费：20
- Upgrade：`DehakaUpgrade`
- 描述：四、五级攻防
- 具体效果：
  - 未解析到直接数值效果（可能只用于解锁、触发或界面状态）。

### 6. 首领巢穴
- 花费：20
- Upgrade：`FastBuildDehaka`
- 描述：虫群首领巢穴建造速度提高，不需要额外条件
- 具体效果：
  - 影响单位：原始工蜂
  - 工蜂变异：Build3建造需求 设为 DehakaGlevigBuildU
  - 工蜂变异：Build3训练/建造时间 -45.000000
  - 工蜂变异：Build4建造需求 设为 DehakaMurvarBuildU
  - 工蜂变异：Build4训练/建造时间 -60.000000
  - 工蜂变异：Build5建造需求 设为 DehakaDakrunBuildU
  - 工蜂变异：Build5训练/建造时间 -60.000000

### 7. 首领进化
- 花费：20
- Upgrade：`EvolvedPackLeadersDehaka`
- 描述：虫群首领、原始蠕虫和大型原始蠕虫获得新技能
- 具体效果：
  - CoopMurvarSpawnCreepers：PeriodCount +4
  - 界面/名称/说明文本改动：1 条

### 8. 三大哥
- 花费：30
- Upgrade：`CommanderPrestigeDehakaPackLeaders`
- 描述：虫群首领和他们的随从伤害提高50%，生命值提高100%，冷却时间缩短120s，虫群首领可以为德哈卡吸收精华
- 具体效果：
  - DehakaDakrunTopBar：冷却时间 -120.000000
  - DehakaGlevigTopBar：Build1冷却时间 -120.000000
  - DehakaMurvarTopBar：冷却时间 -120.000000
  - DehakaTopBarSummonTimedLife：VitalMaxFractionArray[生命] +1
  - DehakaTopBarSummonTimedLife：DamageDealtFraction[Melee] +0.5
  - DehakaTopBarSummonTimedLife：DamageDealtFraction[NoProc] +0.5
  - DehakaTopBarSummonTimedLife：DamageDealtFraction[Ranged] +0.5
  - DehakaTopBarSummonTimedLife：DamageDealtFraction[Spell] +0.5
  - DehakaTopBarSummonTimedLife：DamageDealtFraction[Splash] +0.5

## 精通

### 1. 吞食增益
- Upgrade：`MasteryDehakaConsumeDuration`
- 描述：延长吞食获得被动持续时间3%
- 具体效果：
  - 最高等级：30
  - 吞食增益显示值：效果数值 +3
  - 吞食：对空效果：持续时间 +0.450000
  - 吞食：重甲效果：持续时间 +0.450000
  - DehakaConsumeEffectBiological：持续时间 +0.450000
  - 吞食：侦测效果：持续时间 +0.450000
  - 吞食：英雄效果：持续时间 +0.450000
  - 吞食：轻甲效果：持续时间 +0.450000
  - 吞食：巨型效果：持续时间 +0.450000
  - 吞食：机械效果：持续时间 +0.450000
  - 吞食：灵能效果：持续时间 +0.450000

### 2. 德哈卡攻速
- Upgrade：`MasteryDehakaAttackSpeed`
- 描述：提高德哈卡攻击速度1%
- 具体效果：
  - 最高等级：30
  - 影响单位：德哈卡、泽哈卡
  - 德哈卡攻速显示值：效果数值 +1
  - 利爪：攻击间隔倍率 +0.01

### 3. 大型蠕虫冷却
- Upgrade：`MasteryDehakaPrimalWurmCDR`
- 描述：大型原始蠕虫冷却时间-2%
- 具体效果：
  - 最高等级：30
  - 大型蠕虫冷却显示值：效果数值 +2
  - DehakaNydusDestroyerTopBar：Build1充能时间 -2.400000
  - DehakaNydusDestroyerTopBar：Build1初始充能时间 -2.400000

### 4. 补给上限
- Upgrade：`DehakaSupply`
- 描述：补给上限+2
- 具体效果：
  - 最高等级：30
  - 影响单位：Caster
  - Caster：补给占用 +2

### 5. 基因突变
- Upgrade：`MasteryDehakaGeneMutation`
- 描述：基因突变几率+2%
- 具体效果：
  - 最高等级：30
  - 基因突变显示值：效果数值 +1
  - DehakaGeneCarapaceAB：Chance +0.02
  - DehakaGene4CreepersAB：Chance +0.02
  - DehakaGeneThornsAuraAB：Chance +0.02
  - DehakaGeneFrenziedAB：Chance +0.02
  - DehakaGeneAttackSpeedAB：Chance +0.02
  - DehakaGeneLifeLeechAB：Chance +0.02

### 6. 首领持续时间
- Upgrade：`MasteryDehakaBossTimedLife`
- 描述：虫群首领持续时间+1%
- 具体效果：
  - 最高等级：30
  - DehakaTopBarSummonTimedLife：持续时间 +0.6

