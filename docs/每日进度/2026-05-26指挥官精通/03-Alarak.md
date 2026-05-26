# 2026-05-26 Alarak 指挥官加点与精通

`Upgrade` 保留内部 ID；效果对象和字段尽量使用中文名称，便于直接查看实际加成。

## 加点

### 1. 阿拉纳克指挥
- 花费：10
- Upgrade：`AlarakCommander`
- 描述：启用阿拉纳克合作指挥官基础升级、塔达林单位体系和顶部面板。
- 具体效果：
  - 影响单位：Stalker
  - StalkerEntropyLanceSearchSet：0效果 设为 AlarakParticleDisruptorsU
  - ParticleDisruptors：DisplayEffect 设为 AlarakParticleDisruptorsU
  - 界面/名称/说明文本改动：43 条

### 2. 浩劫视野
- 花费：10
- Upgrade：`AlarakHavocAbilityRange`
- 描述：提高浩劫的技能与视野范围，增强塔达林部队的远程支援能力。
- 具体效果：
  - 影响单位：Monitor
  - ObserverTargetLock：Range[0] +3
  - ObserverFakeWeapon：施放距离 +3
  - ObserverFakeWeapon：MinScanRange +3
  - ForceFieldMonitor：Range[0] +3
  - ObserverSquadSightSearch：AreaArray[0].半径 +3
  - SquadSightRange：施放距离 +3.000000

### 3. 毁灭舰队
- 花费：15
- Upgrade：`AlarakImprovedDeathFleet`
- 描述：强化毁灭舰队的持续作战表现。
- 具体效果：
  - 影响单位：阿拉纳克
  - AlarakDestroyerCreationCP：PeriodCount +4
  - 界面/名称/说明文本改动：2 条

### 4. 致命冲锋
- 花费：15
- Upgrade：`AlarakImprovedDeadlyCharge`
- 描述：强化阿拉纳克的致命冲锋，提高英雄突进与爆发能力。
- 具体效果：
  - 影响单位：阿拉纳克
  - 致命冲锋：冷却时间 -5.000000
  - 致命冲锋：Range[0] +3
  - 界面/名称/说明文本改动：2 条

### 5. 供奉者冷却
- 花费：20
- Upgrade：`AlarakSupplicantSacrificeCDR`
- 描述：降低供奉者牺牲相关冷却，提高阿拉纳克前线续航。
- 具体效果：
  - 影响单位：SupplicantAlarak

### 6. 供奉者护盾
- 花费：20
- Upgrade：`AlarakSupplicantShieldRegen`
- 描述：强化供奉者的护盾恢复能力，提高部队稳定性。
- 具体效果：
  - 影响单位：SupplicantAlarak
  - SupplicantAlarak：ShieldRegenRate +2

### 7. 闪电牺牲
- 花费：25
- Upgrade：`AlarakSupplicantSacrificeLightningStrikes`
- 描述：使供奉者牺牲触发额外闪电打击，补充范围输出。
- 具体效果：
  - 影响单位：SupplicantAlarak

### 8. 结构超载
- 花费：30
- Upgrade：`AlarakStructureImprovedOvercharge`
- 描述：强化结构超载，提高防御建筑和水晶塔支援强度。
- 具体效果：
  - 未解析到直接数值效果（可能只用于解锁、触发或界面状态）。

## 精通

### 1. 攻击伤害
- Upgrade：`MasteryAlarakAutoAttackDamage`
- 描述：提高阿拉纳克普通攻击伤害。
- 具体效果：
  - 最高等级：30
  - 攻击伤害显示值：效果数值 +1
  - AlarakBaneBladesDamage：效果数值 +1
  - AlarakBaneBladesAoED：效果数值 +1
  - AlarakAADamage：效果数值 +1

### 2. 部队攻速
- Upgrade：`MasteryAlarakUnitAttackSpeed`
- 描述：提高阿拉纳克部队的攻击速度。
- 具体效果：
  - 最高等级：30
  - 影响单位：战争棱镜、SupplicantAlarak、ImmortalTaldarim、HighTemplarTaldarim、ColossusTaldarim
  - 部队攻速显示值：效果数值 +0.5
  - 相位轰击：攻击间隔倍率 +0.005
  - 血球：攻击间隔倍率 +0.005
  - ParticleDisruptors：攻击间隔倍率 +0.005
  - AscendantWeapon：攻击间隔倍率 +0.005
  - ImmortalTaldarim：攻击间隔倍率 +0.005
  - 充能爆裂弹：攻击间隔倍率 +0.005
  - ColossusTaldarimChargedBeam：攻击间隔倍率 +0.005

### 3. 强化我持续时间
- Upgrade：`MasteryAlarakEmpowerMeSlavesDuration`
- 描述：延长强化我的持续时间，提高爆发窗口。
- 具体效果：
  - 最高等级：30
  - 强化我持续时间显示值：效果数值 +1
  - AlarakEmpowerCaster：持续时间 +1

### 4. 毁灭舰队冷却
- Upgrade：`MasteryAlarakDeathFleetCDR`
- 描述：降低毁灭舰队冷却时间。
- 具体效果：
  - 最高等级：30
  - 毁灭舰队冷却显示值：效果数值 +4
  - 召唤死亡舰队：冷却时间 -4

### 5. 结构超载强度
- Upgrade：`MasteryAlarakOverchargeShieldsDamage`
- 描述：提高结构超载的护盾和伤害收益。
- 具体效果：
  - 最高等级：30
  - 结构超载强度显示值：效果数值 +8
  - 结构超载强度：效果数值 +2
  - 强化超载：DamageResponse.ModifyLimit +8
  - 建筑超载：PeriodicEffectRateMultiplier +0.02
  - 建筑超载：攻击间隔倍率 +0.02

### 6. 时空提速
- Upgrade：`MasteryAlarakChronoBoost`
- 描述：提高时空提速效果，加快生产和研究节奏。
- 具体效果：
  - 最高等级：30
  - 时空提速显示值：效果数值 +1
  - TimeWarpProduction：RateMultiplierArray[充能] +0.01
  - TimeWarpProduction：RateMultiplierArray[冷却] +0.01
  - TimeWarpProduction：RateMultiplierArray[Creep] +0.01
  - TimeWarpProduction：RateMultiplierArray[Morph] +0.01
  - TimeWarpProduction：RateMultiplierArray[Progress] +0.01
  - TimeWarpProduction：RateMultiplierArray[Queueable] +0.01
  - TimeWarpProduction：RateMultiplierArray[Spawn] +0.01

