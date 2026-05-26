# 2026-05-26 Fenix 指挥官加点与精通

`Upgrade` 保留内部 ID；效果对象和字段尽量使用中文名称，便于直接查看实际加成。

## 加点

### 1. 净化者指挥
- 花费：10
- Upgrade：`FenixCommander`
- 描述：启用菲尼克斯合作指挥官基础升级、净化者单位体系和顶部面板。
- 具体效果：
  - 军团士兵：生命上限 +100
  - 军团士兵：初始生命值 +100
  - 军团士兵：护盾上限 +50
  - 军团士兵：护盾Start +50
  - 军团士兵：补给占用 -1
  - ZealotPsiBladesCleaveSet：0效果 设为 LegionnairePsiBladesBurst
  - PsiBlades：DisplayEffect 设为 LegionnairePsiBlades
  - 相位碎裂炮：Options[Hidden] 设为 0
  - 相位碎裂炮：Options[Disabled] 设为 0
  - GatewayTrain：Train1训练/建造时间 -8.000000
  - WarpGateTrain：Train7充能时间 -5.000000
  - WarpGateTrain：Train1充能时间 -5.000000
  - StargateTrain：Train6训练/建造时间 -15.000000
  - GatewayTrain：InfoArray[Train7].Unit[0] 设为 AdeptFenix
  - WarpGateTrain：InfoArray[Train7].Unit 设为 AdeptFenix
  - 军团士兵：矿物消耗 +60
  - 保护者：矿物消耗 -10
  - 保护者：瓦斯消耗 -20
  - 侦察机：矿物消耗 -70
  - 侦察机：瓦斯消耗 -15
  - 航母：矿物消耗 -70
  - 航母：瓦斯消耗 -50
  - 不朽者：矿物消耗 -50
  - 不朽者：瓦斯消耗 -20
  - ColossusPurifier：矿物消耗 -60
  - ColossusPurifier：瓦斯消耗 -40
  - 侦测器：矿物消耗 -5
  - 侦测器：瓦斯消耗 -15
  - 干扰者：矿物消耗 -30
  - 干扰者：瓦斯消耗 -30
  - CarrierHangar：InfoArray[Ammo1].初始数量 +1
  - CarrierHangar：Ammo1训练/建造时间 +5.000000
  - 界面/名称/说明文本改动：59 条

### 2. 研究费用优化
- 花费：10
- Upgrade：`FenixResearchCostReduction`
- 描述：降低菲尼克斯科技研究成本，帮助净化者部队更快成型。
- 具体效果：
  - FenixAltarOfPsiStormsResearch：InfoArray[Research1].Resource[Minerals] -100
  - FenixAltarOfPsiStormsResearch：InfoArray[Research2].Resource[Minerals] -100
  - FenixAltarOfPsiStormsResearch：InfoArray[Research2].Resource[Vespene] -50
  - FenixAltarOfPsiStormsResearch：InfoArray[Research3].Resource[Minerals] -100
  - FenixAltarOfPsiStormsResearch：InfoArray[Research3].Resource[Vespene] -50
  - FenixAltarOfPsiStormsResearch：InfoArray[Research4].Resource[Minerals] -100
  - FenixAltarOfPsiStormsResearch：InfoArray[Research4].Resource[Vespene] -50
  - FenixAltarOfPsiStormsResearch：InfoArray[Research5].Resource[Minerals] -100
  - FenixAltarOfPsiStormsResearch：InfoArray[Research5].Resource[Vespene] -50
  - FenixAltarOfPsiStormsResearch：InfoArray[Research6].Resource[Minerals] -100
  - FenixAltarOfPsiStormsResearch：InfoArray[Research6].Resource[Vespene] -50
  - ForgeResearch：InfoArray[Research15].Resource[Minerals] -75
  - ForgeResearch：InfoArray[Research15].Resource[Vespene] -75
  - ForgeResearch：InfoArray[Research16].Resource[Minerals] -50
  - ForgeResearch：InfoArray[Research16].Resource[Vespene] -50
  - ForgeResearch：InfoArray[Research17].Resource[Minerals] -12
  - ForgeResearch：InfoArray[Research17].Resource[Vespene] -12
  - CyberneticsCoreResearch：InfoArray[Research15].Resource[Minerals] -50
  - CyberneticsCoreResearch：InfoArray[Research15].Resource[Vespene] -50
  - TwilightCouncilResearch：InfoArray[Research26].Resource[Minerals] -50
  - TwilightCouncilResearch：InfoArray[Research26].Resource[Vespene] -50
  - TwilightCouncilResearch：InfoArray[Research27].Resource[Minerals] -50
  - TwilightCouncilResearch：InfoArray[Research27].Resource[Vespene] -50
  - TwilightCouncilResearch：InfoArray[Research30].Resource[Minerals] -50
  - TwilightCouncilResearch：InfoArray[Research30].Resource[Vespene] -50
  - FleetBeaconResearch：InfoArray[Research20].Resource[Minerals] -50
  - FleetBeaconResearch：InfoArray[Research20].Resource[Vespene] -50
  - FleetBeaconResearch：InfoArray[Research21].Resource[Minerals] -75
  - FleetBeaconResearch：InfoArray[Research21].Resource[Vespene] -75
  - FleetBeaconResearch：InfoArray[Research22].Resource[Minerals] -50
  - FleetBeaconResearch：InfoArray[Research22].Resource[Vespene] -50
  - RoboticsBayResearch：InfoArray[Research19].Resource[Minerals] -50
  - RoboticsBayResearch：InfoArray[Research19].Resource[Vespene] -50
  - RoboticsBayResearch：InfoArray[Research20].Resource[Minerals] -75
  - RoboticsBayResearch：InfoArray[Research20].Resource[Vespene] -75
  - RoboticsBayResearch：InfoArray[Research21].Resource[Minerals] -75
  - RoboticsBayResearch：InfoArray[Research21].Resource[Vespene] -75
  - RoboticsBayResearch：InfoArray[Research23].Resource[Minerals] -75
  - RoboticsBayResearch：InfoArray[Research23].Resource[Vespene] -75

### 3. 卡尔达利斯上线
- 花费：15
- Upgrade：`FenixChampionKaldalisZealot`
- 描述：解锁狂热者勇士卡尔达利斯及其相关升级链。
- 具体效果：
  - 未解析到直接数值效果（可能只用于解锁、触发或界面状态）。

### 4. 塔莉丝上线
- 花费：15
- Upgrade：`FenixChampionTalisAdept`
- 描述：解锁使徒勇士塔莉丝及其弹射攻击升级链。
- 具体效果：
  - 未解析到直接数值效果（可能只用于解锁、触发或界面状态）。

### 5. 塔达林上线
- 花费：20
- Upgrade：`FenixChampionTaldarinImmortal`
- 描述：解锁不朽者勇士塔达林及其爆破射击升级链。
- 具体效果：
  - 未解析到直接数值效果（可能只用于解锁、触发或界面状态）。

### 6. 战争使者上线
- 花费：20
- Upgrade：`FenixChampionWarbringerColossus`
- 描述：解锁巨像勇士战争使者及其强力射击升级链。
- 具体效果：
  - 未解析到直接数值效果（可能只用于解锁、触发或界面状态）。

### 7. 莫乔上线
- 花费：25
- Upgrade：`FenixChampionMojoScout`
- 描述：解锁侦察机勇士莫乔及其范围导弹升级链。
- 具体效果：
  - 未解析到直接数值效果（可能只用于解锁、触发或界面状态）。

### 8. 科罗拉里昂上线
- 花费：30
- Upgrade：`FenixChampionClolarionCarrier`
- 描述：解锁航母勇士科罗拉里昂及其轰炸机升级链。
- 具体效果：
  - 未解析到直接数值效果（可能只用于解锁、触发或界面状态）。

## 精通

### 1. 战甲攻速
- Upgrade：`MasteryFenixSuitAttackSpeed`
- 描述：提高菲尼克斯三套战甲的攻击节奏。
- 具体效果：
  - 最高等级：30
  - 影响单位：FenixSOA、菲尼克斯
  - 战甲攻速显示值：效果数值 +2
  - FenixSOAWeapon：攻击间隔倍率 +0.02
  - 相位碎裂炮：攻击间隔倍率 +0.02
  - 裂空光炮：攻击间隔倍率 +0.02

### 2. 战甲能量恢复
- Upgrade：`MasteryFenixSuitEnergyRegen`
- 描述：提高菲尼克斯战甲能量恢复速度，提升技能循环。
- 具体效果：
  - 最高等级：30
  - 战甲能量恢复显示值：效果数值 +0.75
  - FenixManaDummy1：能量RegenRate +0.015615
  - FenixManaDummy2：能量RegenRate +0.015615
  - FenixManaDummy3：能量RegenRate +0.015615

### 3. 勇士攻速
- Upgrade：`MasteryFenixChampionAttackSpeed`
- 描述：提高勇士单位攻击速度，强化净化者精英输出。
- 具体效果：
  - 最高等级：30
  - 影响单位：卡尔达利斯、塔里斯、摩约、塔尔达林、战争使者、拦截机、轰炸机、科罗拉里昂
  - 勇士攻速显示值：效果数值 +1
  - 灵能利刃：攻击间隔倍率 +0.01
  - 净化者刃炮：攻击间隔倍率 +0.01
  - 反物质飞弹：攻击间隔倍率 +0.01
  - 光子冲击炮：攻击间隔倍率 +0.01
  - 重力碎裂炮：攻击间隔倍率 +0.01
  - 时空射线枪：攻击间隔倍率 +0.01
  - FenixClolarionInterceptorBeam：攻击间隔倍率 +0.01
  - FenixClolarionBomber：攻击间隔倍率 +0.01
  - 拦截机：攻击间隔倍率 +0.01
  - 强击机：攻击间隔倍率 +0.01
  - 太阳能射线：攻击间隔倍率 +0.01
  - FenixClolarionChargeBeamWeaponCP：PeriodicEffectRateMultiplier +0.01

### 4. 勇士生命护盾
- Upgrade：`MasteryFenixChampionLifeShieldBuff`
- 描述：提高勇士单位生命值和护盾，增强持续作战能力。
- 具体效果：
  - 最高等级：30
  - 勇士生命护盾显示值：效果数值 +2
  - 战争使者：生命上限 +8
  - 战争使者：初始生命值 +8
  - 战争使者：护盾上限 +6
  - 战争使者：护盾Start +6
  - 塔里斯：生命上限 +3.6
  - 塔里斯：初始生命值 +3.6
  - 塔里斯：护盾上限 +3.6
  - 塔里斯：护盾Start +3.6
  - 摩约：生命上限 +6
  - 摩约：初始生命值 +6
  - 摩约：护盾上限 +4
  - 摩约：护盾Start +4
  - 卡尔达利斯：生命上限 +8
  - 卡尔达利斯：初始生命值 +8
  - 卡尔达利斯：护盾上限 +4
  - 卡尔达利斯：护盾Start +4
  - 塔尔达林：生命上限 +8
  - 塔尔达林：初始生命值 +8
  - 塔尔达林：护盾上限 +4
  - 塔尔达林：护盾Start +4
  - 科罗拉里昂：生命上限 +12
  - 科罗拉里昂：初始生命值 +12
  - 科罗拉里昂：护盾上限 +6
  - 科罗拉里昂：护盾Start +6
  - 拦截机：生命上限 +0.8
  - 拦截机：初始生命值 +0.8
  - 拦截机：护盾上限 +0.8
  - 拦截机：护盾Start +0.8
  - 轰炸机：生命上限 +1.6
  - 轰炸机：初始生命值 +1.6
  - 轰炸机：护盾上限 +1.6
  - 轰炸机：护盾Start +1.6

### 5. 时空提速强化
- Upgrade：`MasteryFenixChronoBoostExtra`
- 描述：强化时空提速相关收益，加快生产和研究节奏。
- 具体效果：
  - 最高等级：30
  - 时空提速强化显示值：效果数值 +1
  - TimeWarpProduction：RateMultiplierArray[充能] +0.01
  - TimeWarpProduction：RateMultiplierArray[冷却] +0.01
  - TimeWarpProduction：RateMultiplierArray[Creep] +0.01
  - TimeWarpProduction：RateMultiplierArray[Morph] +0.01
  - TimeWarpProduction：RateMultiplierArray[Progress] +0.01
  - TimeWarpProduction：RateMultiplierArray[Queueable] +0.01
  - TimeWarpProduction：RateMultiplierArray[Spawn] +0.01

### 6. 研究费用降低
- Upgrade：`MasteryFenixReducedResearchCosts`
- 描述：进一步降低菲尼克斯研究费用，加速关键科技落地。
- 具体效果：
  - 最高等级：30
  - 研究费用降低显示值：效果数值 +1

