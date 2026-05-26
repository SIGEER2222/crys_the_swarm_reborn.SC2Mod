# 2026-05-26 Nova 指挥官加点与精通

`Upgrade` 保留内部 ID；效果对象和字段尽量使用中文名称，便于直接查看实际加成。

## 加点

### 1. 防御无人机
- 花费：15
- Upgrade：`NovaGlobalPowerUpgrades`
- 描述：防御无人机充能次数提高，冷却时间缩短
- 具体效果：
  - 影响单位：合作任务施法者诺娃
  - NovaDefensiveMatrixDrone：最大充能数 +2
  - NovaDefensiveMatrixDrone：初始充能时间 -30.000000
  - NovaDefensiveMatrixDrone：充能时间 -30.000000

### 2. 随机应变
- 花费：10
- Upgrade：`NovaStanceDance`
- 描述：潜行与突击模式冷却时间缩短，切换后获得临时效果
- 具体效果：
  - 影响单位：诺娃
  - Nova Kit Swap：冷却时间 -15.000000
  - Nova Kit Swap：OffCost[0].冷却.使用时间 -15.000000
  - NovaStealthSuitInitialSet：Chance 设为 1
  - NovaCombatSuitInitialSet：Chance 设为 1

### 3. 雇佣兵
- 花费：20
- Upgrade：`MercNova`
- 描述：重工厂和星港不再有科技需求，建造的第一个生产部队的建筑充能时间减半
- 具体效果：
  - 影响单位：SCV
  - TerranBuildNova：Build11建造需求 设为 FactoryNovaU
  - TerranBuildNova：Build12建造需求 设为 StarportNovaU
  - BarracksTrainSpeedNova：Chance 设为 1
  - FactoryTrainSpeedNova：Chance 设为 1
  - StarportTrainSpeedNova：Chance 设为 1

### 4. 研究与开发
- 花费：10
- Upgrade：`ResearchSpeedNova`
- 描述：攻防升级速度翻倍
- 具体效果：
  - 影响单位：工程站、军械库
  - EngineeringBayResearch：Research1训练/建造时间 除以 2.000000
  - EngineeringBayResearch：Research2训练/建造时间 除以 2.000000
  - EngineeringBayResearch：Research3训练/建造时间 除以 2.000000
  - EngineeringBayResearch：Research4训练/建造时间 除以 2.000000
  - EngineeringBayResearch：Research5训练/建造时间 除以 2.000000
  - EngineeringBayResearch：Research6训练/建造时间 除以 2.000000
  - EngineeringBayResearch：Research7训练/建造时间 除以 2.000000
  - EngineeringBayResearch：Research8训练/建造时间 除以 2.000000
  - EngineeringBayResearch：Research9训练/建造时间 除以 2.000000
  - EngineeringBayResearch：Research10训练/建造时间 除以 2.000000
  - ArmoryResearch：Research1训练/建造时间 除以 2.000000
  - ArmoryResearch：Research2训练/建造时间 除以 2.000000
  - ArmoryResearch：Research3训练/建造时间 除以 2.000000
  - ArmoryResearch：Research4训练/建造时间 除以 2.000000
  - ArmoryResearch：Research5训练/建造时间 除以 2.000000
  - ArmoryResearch：Research6训练/建造时间 除以 2.000000
  - ArmoryResearch：Research7训练/建造时间 除以 2.000000
  - ArmoryResearch：Research8训练/建造时间 除以 2.000000
  - ArmoryResearch：Research9训练/建造时间 除以 2.000000
  - ArmoryResearch：Research10训练/建造时间 除以 2.000000

### 5. 战术调度员
- 花费：15
- Upgrade：`GriffinTransportNova`
- 描述：战术空运冷却时间缩短
- 具体效果：
  - 影响单位：合作任务施法者诺娃
  - NovaGriffinTransportLoad：Cost[0].冷却.初始时间 -90.000000
  - NovaGriffinTransportLoad：冷却时间 -90.000000

### 6. Bomber
- 花费：15
- Upgrade：`BomberNova`
- 描述：破坏无人机和战术聚变打击的冷却时间缩短，伤害范围扩大
- 具体效果：
  - 影响单位：诺娃
  - Boom! Damage：AreaArray[0].半径 +2
  - Nova Coop Caster Nuke Damage：AreaArray[0].半径 +4
  - 创建炸弹机器人：冷却时间 -20.000000
  - Nova Coop Caster Nuke：充能时间 -210.000000

### 7. 高级装备
- 花费：15
- Upgrade：`UpgradeNova`
- 描述：可以升级4、5级攻防
- 具体效果：
  - 影响单位：军械库、工程站

### 8. 渗透专家
- 花费：20
- Upgrade：`SuperCloakNova`
- 描述：可开启超隐模式，期间无法使用狙击
- 具体效果：
  - 未解析到直接数值效果（可能只用于解锁、触发或界面状态）。

## 精通

### 1. 战术技能
- Upgrade：`MasteryNovaNukeAndHoloDecoyCooldown`
- 描述：缩短战术聚变打击和全息诱饵冷却时间
- 具体效果：
  - 最高等级：30
  - 影响单位：诺娃
  - 战术技能显示值：效果数值 +3
  - Nova Coop Caster Nuke：充能时间 -3.000000
  - 全息诱饵：冷却时间 -3
  - Nova Coop Caster Nuke：初始充能时间 -3.000000
  - 全息诱饵：Cost[0].冷却.初始时间 -3

### 3. 主要技能
- Upgrade：`MasteryNovaPrimaryAbilityImprovement`
- 描述：诺娃主要技能伤害和伤害吸收效果提高
- 具体效果：
  - 最高等级：30
  - 影响单位：诺娃
  - 主要技能显示值：效果数值 +1.67
  - NovaSnipeR：效果数值 +3.3334
  - Boom! Damage：效果数值 +3.3334
  - Boom! Damage：AttributeBonus[Structure] +3.3334
  - NovaWeaponHellfireShotgunBlastDamage：效果数值 +0.835
  - NovaWeaponHellfireShotgunBlastDamage：AttributeBonus[Light] +0.835
  - 单人防御矩阵：护盾上限 +3.334

### 4. 单位攻速
- Upgrade：`MasteryNovaArmyAttackSpeed`
- 描述：提高诺娃战斗单位的攻击速度
- 具体效果：
  - 最高等级：30
  - 影响单位：隐秘女妖、特战幽灵、强击歌利亚、掠袭解放者、劫掠者突击手、精英陆战队员、重型攻城坦克、恶火游骑兵、恶蝠游骑兵
  - 单位攻速显示值：效果数值 +0.5
  - 反冲火箭：攻击间隔倍率 +0.005
  - C-10型霰弹步枪：攻击间隔倍率 +0.005
  - 机关炮：攻击间隔倍率 +0.005
  - 地狱火飞弹：攻击间隔倍率 +0.005
  - 康科德火炮：攻击间隔倍率 +0.005
  - 列克星敦火箭：攻击间隔倍率 +0.005
  - 惩罚者榴弹：攻击间隔倍率 +0.005
  - C-14型电磁枪：攻击间隔倍率 +0.005
  - 90毫米口径火炮：攻击间隔倍率 +0.005
  - 弧光震击炮：攻击间隔倍率 +0.005
  - 地狱火喷射器：攻击间隔倍率 +0.005
  - 凝固汽油喷射器：攻击间隔倍率 +0.005

### 5. 能量恢复
- Upgrade：`MasteryNovaEnergyRegen`
- 描述：提高诺娃的能量恢复
- 具体效果：
  - 最高等级：30
  - 能量恢复显示值：效果数值 +1
  - 诺娃：能量RegenRate +0.1

### 6. 部队费用
- Upgrade：`ArmyNova`
- 描述：减少部队费用
- 具体效果：
  - 最高等级：30
  - 影响单位：兵营、重工厂、星港
  - 训练：InfoArray[Train1].Resource[Minerals] -6
  - 训练：InfoArray[Train2].Resource[Minerals] -5
  - 训练：InfoArray[Train2].Resource[Vespene] -1
  - 训练：InfoArray[Train3].Resource[Minerals] -10
  - 训练：InfoArray[Train3].Resource[Vespene] -5
  - 训练：InfoArray[Train1].Resource[Minerals] -7
  - 训练：InfoArray[Train1].Resource[Vespene] -2
  - 训练：InfoArray[Train2].Resource[Minerals] -8
  - 训练：InfoArray[Train2].Resource[Vespene] -6
  - 训练：InfoArray[Train3].Resource[Minerals] -5
  - 训练：InfoArray[Train1].Resource[Vespene] -3
  - 训练：InfoArray[Train2].Resource[Minerals] -1
  - 训练：InfoArray[Train2].Resource[Vespene] -2
  - 训练：InfoArray[Train3].Resource[Minerals] -7
  - 训练：InfoArray[Train3].Resource[Vespene] -7

