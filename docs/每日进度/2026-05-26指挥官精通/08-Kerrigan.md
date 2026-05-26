# 2026-05-26 Kerrigan 指挥官加点与精通

`Upgrade` 保留内部 ID；效果对象和字段尽量使用中文名称，便于直接查看实际加成。

## 加点

### 1. 凯瑞甘指挥
- 花费：10
- Upgrade：`VoidCoopHeroicFortitude`
- 描述：启用凯瑞甘合作指挥官基础升级、虫群单位体系和英雄作战能力。
- 具体效果：
  - 影响单位：凯瑞甘、K5KerriganPsiStrike、K5KerriganBurrowed、扎加拉
  - 凯瑞甘：生命上限 +200
  - 凯瑞甘：初始生命值 +200
  - 凯瑞甘：生命RegenRate +5.000000
  - K5KerriganBurrowed：生命上限 +200
  - K5KerriganBurrowed：初始生命值 +200
  - K5KerriganBurrowed：生命RegenRate +5.000000
  - K5KerriganPsiStrike：生命上限 +200
  - K5KerriganPsiStrike：初始生命值 +200
  - K5KerriganPsiStrike：生命RegenRate +5.000000
  - 扎加拉：生命上限 +200
  - 扎加拉：初始生命值 +200
  - 扎加拉：生命RegenRate +5.000000

### 2. 技能冷却
- 花费：10
- Upgrade：`K5Cooldowns`
- 描述：降低凯瑞甘技能冷却时间，提高技能循环频率。
- 具体效果：
  - PrimalSlash：Cost[0].Vital[能量] +10
  - PsiStrikeWalk：Cost[0].Vital[能量] +10
  - 吸收光环：冷却时间 +24.000000
  - 定身波：冷却时间 +36.000000
  - MindBolt：Cost[0].Vital[能量] +10
  - PsionicLift：Cost[0].Vital[能量] +15

### 3. 狂怒
- 花费：15
- Upgrade：`K5Fury`
- 描述：解锁狂怒强化，提升凯瑞甘连续作战能力。
- 具体效果：
  - 未解析到直接数值效果（可能只用于解锁、触发或界面状态）。

### 4. 技能强化
- 花费：15
- Upgrade：`CommanderPrestigeKerriganAbilities`
- 描述：强化凯瑞甘技能体系，提高英雄爆发与控制收益。
- 具体效果：
  - CommanderPrestigeKerriganAbilitiesConvertRage：Chance +1
  - PrimalSlash：效果数值 -75
  - PsiStrikeDamage：效果数值 -25
  - PsionicLiftDamage：效果数值 -50
  - KerriganAssimilationLifesteal：VitalDamageLeechArray[护盾].KindArray[Spell] -.15
  - KerriganAssimilationLifesteal：VitalDamageLeechArray[护盾].KindArray[Melee] -.15
  - KerriganAssimilationLifesteal：VitalDamageLeechArray[护盾].KindArray[Ranged] -.15
  - KerriganAssimilationLifesteal：VitalDamageLeechArray[护盾].KindArray[Splash] -.15

### 5. 同化光环
- 花费：20
- Upgrade：`CommanderPrestigeKerriganAssimilationAura`
- 描述：强化同化光环，提高资源回收与进攻收益。
- 具体效果：
  - 未解析到直接数值效果（可能只用于解锁、触发或界面状态）。

### 6. 菌毯强化
- 花费：20
- Upgrade：`CommanderPrestigeKerriganCreep`
- 描述：强化菌毯相关能力，改善虫群机动与阵地展开。
- 具体效果：
  - KerriganMalignantCreepAttackSpeedDummy：效果数值 +0.3
  - KerriganMalignantCreepLifeRegenDummy：效果数值 +1
  - 虫后：SpeedMultiplierCreep -1.6665
  - 虫后：移动速度 +1.5623
  - QueenBuild：InfoArray[Build1].Unit 设为 CreepTumorQueenNoCreep

### 7. 能量恢复
- 花费：25
- Upgrade：`KerriganVoidCoopEnergyRegen`
- 描述：提高凯瑞甘能量恢复速度，提升技能释放频率。
- 具体效果：
  - 影响单位：凯瑞甘、K5KerriganPsiStrike、K5KerriganBurrowed
  - 凯瑞甘：能量RegenRate +3.330000
  - K5KerriganBurrowed：能量RegenRate +3.330000
  - K5KerriganPsiStrike：能量RegenRate +3.330000

### 8. 野性突变
- 花费：30
- Upgrade：`KerriganVoidCoopWildMutationUpgrade`
- 描述：解锁野性突变升级，增强虫群单位输出与生存能力。
- 具体效果：
  - 影响单位：凯瑞甘、K5KerriganPsiStrike、K5KerriganBurrowed
  - WildMutationSearch：AreaArray[0].半径 +0.5

## 精通

### 1. 能量恢复
- Upgrade：`MasteryKerriganEnergyRegen`
- 描述：提高凯瑞甘能量恢复速度。
- 具体效果：
  - 最高等级：30
  - 能量恢复显示值：效果数值 +1.5
  - 凯瑞甘：能量RegenRate +0.150000
  - K5KerriganBurrowed：能量RegenRate +0.150000

### 2. 普攻伤害
- Upgrade：`MasteryKerriganAutoAttackDamage`
- 描述：提高凯瑞甘普通攻击伤害。
- 具体效果：
  - 最高等级：30
  - 普攻伤害显示值：效果数值 +1
  - ChainReaction1Damage：效果数值 +1

### 3. 部队气矿消耗
- Upgrade：`MasteryKerriganArmyGasCost`
- 描述：降低凯瑞甘部队的瓦斯消耗。
- 具体效果：
  - 最高等级：30
  - 部队气矿消耗显示值：效果数值 +1

### 4. 定身波伤害
- Upgrade：`MasteryKerriganImmobilizationWaveDamage`
- 描述：提高定身波伤害。
- 具体效果：
  - 最高等级：30
  - 定身波伤害显示值：效果数值 +3.334
  - PsionicLiftDamage：效果数值 +3.334

### 5. 研究速度
- Upgrade：`MasteryKerriganResearchSpeedandCost`
- 描述：提高研究速度并降低关键研究成本。
- 具体效果：
  - 最高等级：30
  - 研究速度显示值：效果数值 +2
  - SpawningPoolResearch：Research1训练/建造时间 -1.200000
  - SpawningPoolResearch：InfoArray[Research1].Resource[Minerals] -3
  - SpawningPoolResearch：InfoArray[Research1].Resource[Vespene] -3
  - SpawningPoolResearch：Research2训练/建造时间 -1.200000
  - SpawningPoolResearch：InfoArray[Research2].Resource[Minerals] -2
  - SpawningPoolResearch：InfoArray[Research2].Resource[Vespene] -2
  - SpawningPoolResearch：Research3训练/建造时间 -1.200000
  - SpawningPoolResearch：InfoArray[Research3].Resource[Minerals] -3
  - SpawningPoolResearch：InfoArray[Research3].Resource[Vespene] -3
  - SpawningPoolResearch：Research4训练/建造时间 -1.800000
  - SpawningPoolResearch：InfoArray[Research4].Resource[Minerals] -3
  - SpawningPoolResearch：InfoArray[Research4].Resource[Vespene] -3
  - evolutionchamberresearch：Research1训练/建造时间 -3.200000
  - evolutionchamberresearch：InfoArray[Research1].Resource[Minerals] -2
  - evolutionchamberresearch：InfoArray[Research1].Resource[Vespene] -2
  - evolutionchamberresearch：Research2训练/建造时间 -3.800000
  - evolutionchamberresearch：InfoArray[Research2].Resource[Minerals] -3
  - evolutionchamberresearch：InfoArray[Research2].Resource[Vespene] -3
  - evolutionchamberresearch：Research3训练/建造时间 -4.400000
  - evolutionchamberresearch：InfoArray[Research3].Resource[Minerals] -4
  - evolutionchamberresearch：InfoArray[Research3].Resource[Vespene] -4
  - evolutionchamberresearch：Research4训练/建造时间 -3.200000
  - evolutionchamberresearch：InfoArray[Research4].Resource[Minerals] -2
  - evolutionchamberresearch：InfoArray[Research4].Resource[Vespene] -2
  - evolutionchamberresearch：Research5训练/建造时间 -3.800000
  - evolutionchamberresearch：Research6训练/建造时间 -4.400000
  - evolutionchamberresearch：InfoArray[Research6].Resource[Minerals] -5
  - evolutionchamberresearch：InfoArray[Research6].Resource[Vespene] -5
  - evolutionchamberresearch：Research7训练/建造时间 -3.200000
  - evolutionchamberresearch：InfoArray[Research7].Resource[Minerals] -2
  - evolutionchamberresearch：InfoArray[Research7].Resource[Vespene] -2
  - evolutionchamberresearch：Research8训练/建造时间 -3.800000
  - evolutionchamberresearch：InfoArray[Research8].Resource[Minerals] -3
  - evolutionchamberresearch：InfoArray[Research8].Resource[Vespene] -3
  - evolutionchamberresearch：Research9训练/建造时间 -4.400000
  - evolutionchamberresearch：InfoArray[Research9].Resource[Minerals] -4
  - evolutionchamberresearch：InfoArray[Research9].Resource[Vespene] -4
  - evolutionchamberresearch：Research20训练/建造时间 -1.200000
  - evolutionchamberresearch：InfoArray[Research20].Resource[Minerals] -2
  - evolutionchamberresearch：InfoArray[Research20].Resource[Vespene] -2
  - evolutionchamberresearch：Research21训练/建造时间 -1.800000
  - evolutionchamberresearch：InfoArray[Research21].Resource[Minerals] -3
  - evolutionchamberresearch：InfoArray[Research21].Resource[Vespene] -3
  - evolutionchamberresearch：Research22训练/建造时间 -2.400000
  - evolutionchamberresearch：InfoArray[Research22].Resource[Minerals] -4
  - evolutionchamberresearch：InfoArray[Research22].Resource[Vespene] -4
  - HydraliskDenResearch：Research3训练/建造时间 -1.200000
  - HydraliskDenResearch：InfoArray[Research3].Resource[Minerals] -3
  - HydraliskDenResearch：InfoArray[Research3].Resource[Vespene] -3
  - HydraliskDenResearch：Research4训练/建造时间 -2.400000
  - HydraliskDenResearch：InfoArray[Research4].Resource[Minerals] -3
  - HydraliskDenResearch：InfoArray[Research4].Resource[Vespene] -3
  - HydraliskDenResearch：Research5训练/建造时间 -1.800000
  - HydraliskDenResearch：InfoArray[Research5].Resource[Minerals] -3
  - HydraliskDenResearch：InfoArray[Research5].Resource[Vespene] -3
  - HydraliskDenResearch：Research6训练/建造时间 -2.400000
  - HydraliskDenResearch：InfoArray[Research6].Resource[Minerals] -4
  - HydraliskDenResearch：InfoArray[Research6].Resource[Vespene] -4
  - Research (Lurker Den)：Research1训练/建造时间 -2.400000
  - Research (Lurker Den)：InfoArray[Research1].Resource[Minerals] -4
  - Research (Lurker Den)：InfoArray[Research1].Resource[Vespene] -4
  - SpireResearch：Research1训练/建造时间 -3.200000
  - SpireResearch：InfoArray[Research1].Resource[Minerals] -2
  - SpireResearch：InfoArray[Research1].Resource[Vespene] -2
  - SpireResearch：Research2训练/建造时间 -3.800000
  - SpireResearch：Research3训练/建造时间 -4.400000
  - SpireResearch：InfoArray[Research3].Resource[Minerals] -5
  - SpireResearch：InfoArray[Research3].Resource[Vespene] -5
  - SpireResearch：Research4训练/建造时间 -3.200000
  - SpireResearch：InfoArray[Research4].Resource[Minerals] -2
  - SpireResearch：InfoArray[Research4].Resource[Vespene] -2
  - SpireResearch：Research5训练/建造时间 -3.800000
  - SpireResearch：Research6训练/建造时间 -4.400000
  - SpireResearch：InfoArray[Research6].Resource[Minerals] -5
  - SpireResearch：InfoArray[Research6].Resource[Vespene] -5
  - SpireResearch：Research7训练/建造时间 -1.800000
  - SpireResearch：InfoArray[Research7].Resource[Minerals] -3
  - SpireResearch：InfoArray[Research7].Resource[Vespene] -3
  - SpireResearch：Research8训练/建造时间 -1.200000
  - SpireResearch：InfoArray[Research8].Resource[Minerals] -3
  - SpireResearch：InfoArray[Research8].Resource[Vespene] -3
  - SpireResearch：Research9训练/建造时间 -2.400000
  - SpireResearch：InfoArray[Research9].Resource[Minerals] -4
  - SpireResearch：InfoArray[Research9].Resource[Vespene] -4
  - SpireResearch：Research10训练/建造时间 -1.200000
  - SpireResearch：InfoArray[Research10].Resource[Minerals] -3
  - SpireResearch：InfoArray[Research10].Resource[Vespene] -3
  - SpireResearch：Research14训练/建造时间 -1.800000
  - SpireResearch：InfoArray[Research14].Resource[Minerals] -3
  - SpireResearch：InfoArray[Research14].Resource[Vespene] -3
  - SpireResearch：Research15训练/建造时间 -2.400000
  - SpireResearch：InfoArray[Research15].Resource[Minerals] -4
  - SpireResearch：InfoArray[Research15].Resource[Vespene] -4
  - UltraliskCavernResearch：Research3训练/建造时间 -1.200000
  - UltraliskCavernResearch：InfoArray[Research3].Resource[Minerals] -2
  - UltraliskCavernResearch：InfoArray[Research3].Resource[Vespene] -2
  - UltraliskCavernResearch：Research4训练/建造时间 -1.200000
  - UltraliskCavernResearch：InfoArray[Research4].Resource[Minerals] -3
  - UltraliskCavernResearch：InfoArray[Research4].Resource[Vespene] -3
  - UltraliskCavernResearch：Research5训练/建造时间 -1.200000
  - UltraliskCavernResearch：InfoArray[Research5].Resource[Minerals] -3
  - UltraliskCavernResearch：InfoArray[Research5].Resource[Vespene] -3
  - LairResearch：Research2训练/建造时间 -1.200000
  - LairResearch：InfoArray[Research2].Resource[Minerals] -1
  - LairResearch：InfoArray[Research2].Resource[Vespene] -1
  - LairResearch：Research3训练/建造时间 -1.200000
  - LairResearch：InfoArray[Research3].Resource[Minerals] -2
  - LairResearch：InfoArray[Research3].Resource[Vespene] -2
  - LairResearch：Research7训练/建造时间 -1.200000
  - LairResearch：InfoArray[Research7].Resource[Minerals] -1
  - LairResearch：InfoArray[Research7].Resource[Vespene] -1

### 6. 主属性速度伤害
- Upgrade：`MasteryKerriganPrimarySpeedDamage`
- 描述：强化凯瑞甘主属性相关速度和伤害收益。
- 具体效果：
  - 最高等级：30
  - 主属性速度伤害：效果数值 +3
  - 主属性速度伤害：效果数值 +1
  - 主属性速度伤害：效果数值 +0.5
  - K5Ranged：攻击间隔倍率 +0.01
  - PrimalSlash：效果数值 +3
  - PsiStrikeDamage：效果数值 +1
  - MindBoltDamage：效果数值 +3
  - PsionicLiftPeriodicDamage：效果数值 +0.05

