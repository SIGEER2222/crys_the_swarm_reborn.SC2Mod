# 泽拉图（Zeratul）指挥官细化

日期：2026-05-27

## 当前口径

当前指挥官默认 15 级，不从 1 级开始；精通默认 6 项全部 30 点；威望默认只取正面收益，不直接启用官方 `PlayerPrestige`。`initial` 只作为官方基础状态审计和差异对照，默认测试和玩法应看 `power_fusion` 最终状态。

本文件按 `docs/newdocs/模块拆分` 的 11 个模块整理 泽拉图。依据 `游戏数据/官方合作指挥官/commanders/Zeratul/` 的 JSON 摘要生成；具体 Ability、Behavior、Weapon、Actor、Effect、Requirement 闭包仍需继续追 `references/sc2-build-96883-casc-export/` 或实机 `[XM_DBG]` 日志。

## 官方数据摘要

| 项 | 值 |
|---|---|
| CommanderId | `ProtossZeratul` |
| 中文名 | 泽拉图 |
| 默认升级 | `ZeratulCommander, SOAAutoAssimilator, ZeratulTopBarZealotSquad, ZeratulTopBarVoidRaySquad` |
| 默认能力命令 | `ZeratulBuild:1, NexusBuild:` |
| 威望 ID | `CommanderPrestigeZeratulVoidSeeker, CommanderPrestigeZeratulArtifactFragments, CommanderPrestigeZeratulTornadoes` |
| heroes 数量 | 0 |
| roster 数量 | 12 |
| units 数量 | 8 |
| buildings 数量 | 4 |
| command card 对象数 | 12 |
| upgrades 数量 | 27 |
| source | `mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/userdata.xml` |

roster 样例：

```text
ImmortalZeratul, Gateway, DisruptorZeratul, PhotonCannon, DarkShrine, SentryZeratul, ZealotZeratul, WarpPrismZeratul, RoboticsWarp, Observer, ObserverZeratul, StalkerZeratul
```

## 15 级解锁摘要

- 1: 萨尔纳加之力
- 2: 预言成真
- 3: 时空通道强化包1
- 4: 新单位：萨尔纳加禁绝者
- 5: 超维空间技术强化包
- 6: 构造体强化包1
- 7: 虚空之路
- 8: 超能军团
- 9: 新单位：萨尔纳加虚空阵列船
- 10: 时空理论
- 11: 时空通道强化包2
- 12: 黑暗代理
- 13: 构造体强化包2
- 14: 纯粹完美
- 15: 纯粹意志

## 模块索引

| 序号 | 模块 | 本文件章节 |
|---|---|---|
| 01 | 顶部技能栏 | `01. 顶部技能栏` |
| 02 | 英雄单位及其技能 | `02. 英雄单位及其技能` |
| 03 | 普通单位技能及其进化功能 | `03. 普通单位技能及其进化功能` |
| 04 | 初始化基地与特殊建筑 | `04. 初始化基地与特殊建筑` |
| 05 | 指挥官兵种 | `05. 指挥官兵种` |
| 06 | 指挥官精通 | `06. 指挥官精通` |
| 07 | 指挥官建筑 | `07. 指挥官建筑` |
| 08 | 科技建筑及其升级选项 | `08. 科技建筑及其升级选项` |
| 09 | 特定地图运输机空投单位 | `09. 特定地图运输机空投单位` |
| 10 | 指挥官特殊机制 | `10. 指挥官特殊机制` |
| 11 | 指挥官个性化机制 | `11. 指挥官个性化机制` |

## 01. 顶部技能栏

Owner：`CommanderPanelProfile`、`CommanderPanelAbilityProfile`、`CommanderPanelCooldownProfile`、`CommanderPanelChargeProfile`、`CommanderPanelTargetingProfile`、`CommanderPanelModifierProfile`。

### 面板/全局能力候选

| 来源 | 等级 | AbilityCmd | 关联升级 | 说明 |
|---|---|---|---|---|
| Lv3 时空通道强化包1 | 3 | `ZeratulCalldownOdinTargeted:` | `-` | 找到第二块神器碎片后解锁下列时空通道级别的神器升级： / 使萨尔纳加伏击者在闪现后会留下一个虚空恶灵，制造一次攻击，造成200%武器伤害。使萨尔纳加光盾卫士的... |
| Lv10 时空理论 | 10 | `ZeratulBarracksTrain:2` | `ZeratulTalentQuickBuild` | 使萨尔纳加时空通道和构造体设施中生产单位的建造时间缩短50%。 |

### command card 命中

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 黑暗圣坛 | `ZeratulDarkTemplarBlink` | 闪现 | `-` | HaveZeratulArtifactTier1AndDarkShine | 使虚空圣堂武士可以传送至附近一处目标位置。 |
| 传送门 | `WarpInAdept` | 折跃使徒 | `GatewayTrain,Train7` | - | 远程特种单位。可以使用灵能传送。 / 可以对地。 |
| 传送门 | `UpgradeToWarpGate` | 变形为折跃门 | `UpgradeToWarpGate,Execute` | - | 将传送门升级为折跃门，使星灵可以利用折跃技术将地面单位召集到任何有水晶塔或折跃棱镜能量覆盖的区域。 |
| 追猎者 | `PredictiveBlinkPassive` | 预判闪现 | `-` | HaveZeratulArtifactTier1AndCyberCore | 使该单位可以传送到附近一处目标点。萨尔纳加伏击者一旦机体受到损坏就会自动闪现至安全位置。 |
| 追猎者 | `ZeratulStalkerShadowBlink` | 预判闪现 | `ZeratulStalkerBlink,Execute` | - | 将该单位传送到附近一处位置。 |

实现备注：面板只注册 profile 和转发 caster，地图不得按 commander 写 if/else。精通和威望影响面板冷却/充能/费用时，由本模块接收最终 modifier。

## 02. 英雄单位及其技能

Owner：`CommanderHeroProfile`、`CommanderHeroModeProfile`、`CommanderHeroAbilityProfile`、`CommanderHeroSkillTreeProfile`、`CommanderHeroReviveProfile`、`CommanderHeroModifierProfile`。

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| - | - | - | - | - | 官方 heroes.json 未列出英雄条目；召唤物/形态/特殊英雄需从 progression、command_cards 或 CASC 继续追 |

### 英雄/形态候选

- 萨尔纳加之力 (`ZeratulPHLevel1`)
- 预言成真 (`ZeratulPHLevel2`)
- 时空通道强化包1 (`ZeratulPHLevel3`)
- 新单位：萨尔纳加禁绝者 (`ZeratulPHLevel4`)
- 超维空间技术强化包 (`ZeratulPHLevel5`)
- 构造体强化包1 (`ZeratulPHLevel6`)
- 虚空之路 (`ZeratulPHLevel7`)
- 超能军团 (`ZeratulPHLevel8`)
- 新单位：萨尔纳加虚空阵列船 (`ZeratulPHLevel9`)
- 时空理论 (`ZeratulPHLevel10`)
- 时空通道强化包2 (`ZeratulPHLevel11`)
- 黑暗代理 (`ZeratulPHLevel12`)
- 构造体强化包2 (`ZeratulPHLevel13`)
- 纯粹完美 (`ZeratulPHLevel14`)
- 纯粹意志 (`ZeratulPHLevel15`)

口径：神器碎片改变科技、面板和单位强度，必须作为局内状态机接入。

待审计：Hero Unit、技能按钮、复活、形态切换、武器/Actor/Sound 闭包。

## 03. 普通单位技能及其进化功能

Owner：`CommanderUnitAbilityProfile`、`CommanderUnitStatProfile`、`CommanderUnitEvolutionProfile`、`CommanderUnitBehaviorProfile`、`CommanderUnitWeaponProfile`。

### 单位技能按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 干扰者 | `MoveHoldPosition` | 原地防御 | `move,HoldPos` | - | 命令选中的单位待在原地，并攻击射程内的敌方目标。接受命令的单位不会对敌人进行追击或移向敌人与其交战。 |
| 干扰者 | `MovePatrol` | 巡逻 | `move,Patrol` | - | 命令选中的单位在当前位置与目标区域间进行巡逻。巡逻的单位会对敌人发起攻击或移向附近的敌人与其交战。 |
| 干扰者 | `AcquireMove` | 搜索移动 | `move,AcquireMove` | - | 命令选中的单位移至目标区域或跟随目标单位。进行搜索移动的单位不会与敌人交战。 |
| 干扰者 | `ZeratulPurificationNovaBattery` | 新星电池 | `-` | HaveZeratulArtifactTier2AndRoboticsBay | 净化新星的冷却时间缩短{(Abil,ZeratulPurificationNovaTargeted,Cost[0].Cooldown.TimeUse-$U... |
| 干扰者 | `ZeratulPurificationNovaSplit` | 集束新星 | `ZeratulPurificationNovaTargeted,Execute` | HaveZeratulArtifactTier3AndRoboticsBay | 当净化新星爆炸时，它会产生三个更小的新星，每一个对沿途的敌人造成{Effect,ZeratulPurificationNovaSmallOrbSearch... |
| 干扰者 | `ZeratulPurificationNovaTargeted` | 净化新星 | `attack,Barrage` | - | 发射一团球形能量，触碰敌方单位时或在{Behavior,PurificationNovaTargettedTarget,Duration}秒后引爆，对附近... |
| 不朽者 | `MoveHoldPosition` | 原地防御 | `move,HoldPos` | - | 命令选中的单位待在原地，并攻击射程内的敌方目标。接受命令的单位不会对敌人进行追击或移向敌人与其交战。 |
| 不朽者 | `MovePatrol` | 巡逻 | `move,Patrol` | - | 命令选中的单位在当前位置与目标区域间进行巡逻。巡逻的单位会对敌人发起攻击或移向附近的敌人与其交战。 |
| 不朽者 | `ZeratulImmortalBarrierPassive` | 屏障 | `-` | HaveZeratulArtifactTier1AndRoboticsBay | 使该单位可以吸收{Behavior,ImmortalBarrierBase,DamageResponse.ModifyLimit}点伤害。持续{Behav... |
| 不朽者 | `HaveZeratulImmortalRange` | 原力炮 | `-` | HaveZeratulArtifactTier2AndRoboticsBay | 该单位的对空武器可以击退敌方空中单位，并且对轰击路线沿途的单位造成{Effect,ZeratulPhaseDisruptorsAir,AreaArray[... |
| 不朽者 | `HaveZeratulImmortalImprovedBarrier` | 永恒屏障 | `-` | HaveZeratulArtifactTier3AndRoboticsBay | 萨尔纳加执行者屏障吸收的伤害量提高{$UpgradeEffectArrayValue:ZeratulArtifactTier3_RoboticsBay:B... |
| 不朽者 | `ImmortalBarrierBase` | ImmortalBarrierBase | `ZeratulImmortalBarrierBase,Execute` | - | 最多可吸收{Behavior,ImmortalBarrierBase,DamageResponse.ModifyLimit}点伤害，持续{Behavior... |
| 侦测器 | `MoveHoldPosition` | 原地防御 | `move,HoldPos` | - | 命令选中的单位待在原地，并攻击射程内的敌方目标。接受命令的单位不会对敌人进行追击或移向敌人与其交战。 |
| 侦测器 | `MovePatrol` | 巡逻 | `move,Patrol` | - | 命令选中的单位在当前位置与目标区域间进行巡逻。巡逻的单位会对敌人发起攻击或移向附近的敌人与其交战。 |
| 侦测器 | `AcquireMove` | 搜索移动 | `move,AcquireMove` | - | 命令选中的单位移至目标区域或跟随目标单位。进行搜索移动的单位不会与敌人交战。 |
| 侦测器 | `MorphtoObserverSiege` | 监察模式 | `ObserverMorphtoObserverSiege,Execute` | - | 把侦测器变形为监察模式。视野提高{(Unit,ObserverSiegeMode,Sight/Unit,Observer,Sight-1)*100}%，但... |
| 侦测器 | `MorphtoObserverSiege` | 监察模式 | `ObserverMorphtoObserverSiege,Execute` | - | 把侦测器变形为监察模式。视野提高{(Unit,ObserverSiegeMode,Sight/Unit,Observer,Sight-1)*100}%，但... |
| 侦测器 | `Detector` | 侦测单位 | `-` | - | 该单位能够侦测到隐形、潜地和幻像单位。 |
| 侦测器 | `Detector` | 侦测单位 | `-` | - | 该单位能够侦测到隐形、潜地和幻像单位。 |
| 侦测器 | `HaveGraviticBoosters` | 重力加速器 | `-` | HaveGraviticBoosters | 提高侦测器的移动速度50%。 |
| 侦测器 | `MoveHoldPosition` | 原地防御 | `move,HoldPos` | - | 命令选中的单位待在原地，并攻击射程内的敌方目标。接受命令的单位不会对敌人进行追击或移向敌人与其交战。 |
| 侦测器 | `MovePatrol` | 巡逻 | `move,Patrol` | - | 命令选中的单位在当前位置与目标区域间进行巡逻。巡逻的单位会对敌人发起攻击或移向附近的敌人与其交战。 |
| 侦测器 | `AcquireMove` | 搜索移动 | `move,AcquireMove` | - | 命令选中的单位移至目标区域或跟随目标单位。进行搜索移动的单位不会与敌人交战。 |
| 侦测器 | `MorphtoObserverSiege` | 监察模式 | `ObserverMorphtoObserverSiege,Execute` | - | 把侦测器变形为监察模式。视野提高{(Unit,ObserverSiegeMode,Sight/Unit,Observer,Sight-1)*100}%，但... |
| 侦测器 | `MorphtoObserverSiege` | 监察模式 | `ObserverMorphtoObserverSiege,Execute` | - | 把侦测器变形为监察模式。视野提高{(Unit,ObserverSiegeMode,Sight/Unit,Observer,Sight-1)*100}%，但... |
| 侦测器 | `Detector` | 侦测单位 | `-` | - | 该单位能够侦测到隐形、潜地和幻像单位。 |
| 侦测器 | `Detector` | 侦测单位 | `-` | - | 该单位能够侦测到隐形、潜地和幻像单位。 |
| 侦测器 | `HaveGraviticBoosters` | 重力加速器 | `-` | HaveGraviticBoosters | 提高侦测器的移动速度50%。 |
| 机械哨兵 | `MoveHoldPosition` | 原地防御 | `move,HoldPos` | - | 命令选中的单位待在原地，并攻击射程内的敌方目标。接受命令的单位不会对敌人进行追击或移向敌人与其交战。 |
| 机械哨兵 | `MovePatrol` | 巡逻 | `move,Patrol` | - | 命令选中的单位在当前位置与目标区域间进行巡逻。巡逻的单位会对敌人发起攻击或移向附近的敌人与其交战。 |
| 机械哨兵 | `ZeratulShieldRechargePassive` | 护盾充能 | `-` | HaveZeratulArtifactTier1AndCyberCore | 使该单位可以给友方星灵单位的护盾进行充能。 |
| 机械哨兵 | `ZeratulSentryEnergyRegen` | 星蚀协议 | `-` | HaveZeratulArtifactTier2AndCyberCore | 该单位的能量恢复提高{$UpgradeEffectArrayValue:ZeratulArtifactTier2_CyberneticsCore:Unit... |
| 机械哨兵 | `ZeratulReflectionShieldPassive` | 反射护盾 | `-` | HaveZeratulArtifactTier3AndCyberCore | 使该单位可以制造一道光环，将{Effect,ZeratulReflectionShieldApplyBehavior,Chance*100}%投射物反射给... |
| 机械哨兵 | `VoidSentryShieldRepair` | VoidSentryShieldRepair | `ZeratulSentryShieldRepair,Execute` | - | - |
| 机械哨兵 | `ZeratulReflectionShield` | 反射护盾 | `ZeratulReflectionShield,Execute` | - | 制造一道光环，将{Effect,ZeratulReflectionShieldApplyBehavior,Chance*100}%的投射物反射给敌方攻击者... |
| 追猎者 | `MoveHoldPosition` | 原地防御 | `move,HoldPos` | - | 命令选中的单位待在原地，并攻击射程内的敌方目标。接受命令的单位不会对敌人进行追击或移向敌人与其交战。 |
| 追猎者 | `MovePatrol` | 巡逻 | `move,Patrol` | - | 命令选中的单位在当前位置与目标区域间进行巡逻。巡逻的单位会对敌人发起攻击或移向附近的敌人与其交战。 |
| 追猎者 | `PredictiveBlinkPassive` | 预判闪现 | `-` | HaveZeratulArtifactTier1AndCyberCore | 使该单位可以传送到附近一处目标点。萨尔纳加伏击者一旦机体受到损坏就会自动闪现至安全位置。 |
| 追猎者 | `ZeratulStalkerGhost` | 虚空复仇 | `-` | HaveZeratulArtifactTier2AndCyberCore | 闪现后会留下一个虚空恶灵，制造一次攻击，造成该单位{Effect,ZeratulStalkerGhostDamage,Amount/Effect,Zera... |
| 追猎者 | `ZeratulStalkerBlinkCharges` | 相位电池 | `-` | HaveZeratulArtifactTier3AndCyberCore | 该单位现在可以储存最多{$UpgradeEffectArrayValue:ZeratulArtifactTier3_CyberneticsCore:Abi... |
| 追猎者 | `ZeratulStalkerShadowBlink` | 预判闪现 | `ZeratulStalkerBlink,Execute` | - | 将该单位传送到附近一处位置。 |
| 泽拉图 折跃棱镜 | `MoveHoldPosition` | 原地防御 | `move,HoldPos` | - | 命令选中的单位待在原地，并攻击射程内的敌方目标。接受命令的单位不会对敌人进行追击或移向敌人与其交战。 |
| 泽拉图 折跃棱镜 | `MovePatrol` | 巡逻 | `move,Patrol` | - | 命令选中的单位在当前位置与目标区域间进行巡逻。巡逻的单位会对敌人发起攻击或移向附近的敌人与其交战。 |
| 泽拉图 折跃棱镜 | `AcquireMove` | 搜索移动 | `move,AcquireMove` | - | 命令选中的单位移至目标区域或跟随目标单位。进行搜索移动的单位不会与敌人交战。 |
| 泽拉图 折跃棱镜 | `ZeratulWarpPrismWormholeMode` | 虫洞模式 | `ZeratulPhasingMode,Execute` | - | 命令萨尔纳加虚空阵列船变形成虫洞模式，使其可以在不同的虚空阵列船之间传输单位。该单位在该模式下无法移动。 |
| 泽拉图 折跃棱镜 | `ZeratulWarpPrismSelectVoidRift` | 选择虫洞出口 | `ZeratulWarpPrismSelectVoidRift,Execute` | - | 选中当前处于自动卸载模式中的虚空阵列船。 |
| 狂热者 | `MoveHoldPosition` | 原地防御 | `move,HoldPos` | - | 命令选中的单位待在原地，并攻击射程内的敌方目标。接受命令的单位不会对敌人进行追击或移向敌人与其交战。 |
| 狂热者 | `MovePatrol` | 巡逻 | `move,Patrol` | - | 命令选中的单位在当前位置与目标区域间进行巡逻。巡逻的单位会对敌人发起攻击或移向附近的敌人与其交战。 |
| 狂热者 | `Charge` | 冲锋 | `ZeratulCharge,Execute` | - | 允许狂热者能拦截附近的敌人。同时还会提高狂热者的移动速度。该技能每{Abil,Charge,Cost.Cooldown.TimeUse}秒最多只能使用一次。 |
| 狂热者 | `VoidZealotWhirlwind` | VoidZealotWhirlwind | `ZeratulZealotWhirlwind,Execute` | - | - |

### 进化/形态/切换候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 传送门 | `SentryFenix` | 折跃保护者 | `GatewayTrain,Train15` | - | 净化者阵营 / 机械支援单位。可以使用防护场和相位模式。 / 可以对地和对空。 |
| 传送门 | `UpgradeToWarpGate` | 变形为折跃门 | `UpgradeToWarpGate,Execute` | - | 将传送门升级为折跃门，使星灵可以利用折跃技术将地面单位召集到任何有水晶塔或折跃棱镜能量覆盖的区域。 |
| 侦测器 | `MorphtoObserverSiege` | 监察模式 | `ObserverMorphtoObserverSiege,Execute` | - | 把侦测器变形为监察模式。视野提高{(Unit,ObserverSiegeMode,Sight/Unit,Observer,Sight-1)*100}%，但... |
| 侦测器 | `MorphtoObserverSiege` | 监察模式 | `ObserverMorphtoObserverSiege,Execute` | - | 把侦测器变形为监察模式。视野提高{(Unit,ObserverSiegeMode,Sight/Unit,Observer,Sight-1)*100}%，但... |
| 侦测器 | `MorphtoObserverSiege` | 监察模式 | `ObserverMorphtoObserverSiege,Execute` | - | 把侦测器变形为监察模式。视野提高{(Unit,ObserverSiegeMode,Sight/Unit,Observer,Sight-1)*100}%，但... |
| 侦测器 | `MorphtoObserverSiege` | 监察模式 | `ObserverMorphtoObserverSiege,Execute` | - | 把侦测器变形为监察模式。视野提高{(Unit,ObserverSiegeMode,Sight/Unit,Observer,Sight-1)*100}%，但... |
| 折跃机械台 | `MorphBackToRoboticsFacility` | MorphBackToRoboticsFacility | `MorphBackToRoboticsFacility,Execute` | - | - |
| 泽拉图 折跃棱镜 | `ZeratulWarpPrismWormholeMode` | 虫洞模式 | `ZeratulPhasingMode,Execute` | - | 命令萨尔纳加虚空阵列船变形成虫洞模式，使其可以在不同的虚空阵列船之间传输单位。该单位在该模式下无法移动。 |
| 泽拉图 折跃棱镜 | `ZeratulWarpPrismSelectVoidRift` | 选择虫洞出口 | `ZeratulWarpPrismSelectVoidRift,Execute` | - | 选中当前处于自动卸载模式中的虚空阵列船。 |

实现备注：单位自己声明技能、形态和升级接入口；科技建筑只展示符合条件的研究项，不直接拥有单位升级逻辑。

## 04. 初始化基地与特殊建筑

Owner：`CommanderRuntimeProfile`、`CommanderScenarioLoadout`、`CommanderSpecialStructureProfile`、`CommanderInitialCasterProfile`。

### 初始化建筑候选

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| - | - | - | - | - | 官方 buildings.json 未自动命中基地/补给/气矿类建筑；需要从地图初始化和 CASC 回补。 |

### 特殊建筑候选

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| - | - | - | - | - | 官方 buildings.json 未自动命中特殊建筑；特殊结构可能由触发器或隐藏 caster 创建。 |

实现备注：测试台切换指挥官时调用本指挥官 initializer，负责替换主基地、工人、运输机/投放单位、隐藏 caster 和特殊建筑。

## 05. 指挥官兵种

Owner：`CommanderRosterProfile`、`CommanderUnitProfile`、`CommanderUnitTrainProfile`、`CommanderUnitStageProfile`、`CommanderUnitRequirementProfile`。

来源：官方提取 `units.json`。这里列的是当前已提取 Catalog 对象；满级替换、威望正向融合或进化变体仍以 `power_fusion` 审计结果为准。

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 不朽者 | `ImmortalZeratul` | `ZeratulImmortal` | Ground; Armored/Mechanical | 矿:750 气:300 人口字段:-4 生命:400 | 步战机甲。可以使用屏障吸收伤害并击退敌方空中单位。 / 可以对空和对地。 |
| 干扰者 | `DisruptorZeratul` | `ZeratulDisruptor` | Ground; Armored/Mechanical | 矿:450 气:450 人口字段:-3 生命:200 | 机械干扰型单位。可以使用净化新星造成大量范围性伤害。 / 可以对地。 |
| 机械哨兵 | `SentryZeratul` | `ZeratulSentry` | Ground; Light/Mechanical/Psionic | 矿:75 气:150 人口字段:-2 生命:120 | 机械支援单位。可以使用护盾充能与反射护盾。 / 可以对空和对地。 |
| 狂热者 | `ZealotZeratul` | `ZeratulSummonZealot` | Ground; Biological/Light | 矿:100 气:- 人口字段:- 生命:100 | - |
| 泽拉图 折跃棱镜 | `WarpPrismZeratul` | `ZeratulWarpPrism` | Air; Armored/Mechanical/Psionic | 矿:150 气:- 人口字段:-1 生命:200 | 飞行虫洞发生器。同一时间建造两个。可以部署后在萨尔纳加虚空阵列船之间生成数据链。 |
| 侦测器 | `Observer` | `Observer` | Air; Light/Mechanical | 矿:25 气:75 人口字段:-1 生命:40 | 间谍型空中单位。拥有永久隐形的能力。 / 侦测单位 |
| 侦测器 | `ObserverZeratul` | `Observer, ZeratulObserver` | Air; Light/Mechanical | 矿:25 气:75 人口字段:-1 生命:40 | 间谍型空中单位。拥有永久隐形的能力。 / 侦测单位 |
| 追猎者 | `StalkerZeratul` | `ZeratulStalker` | Ground; Armored/Mechanical | 矿:300 气:50 人口字段:-2 生命:100 | 远程支援型步战机甲。受到威胁时会自动使用预判闪现。 / 可以对空和对地。 |

三阶段口径：`initial` 只做审计，`level15` 表示满级解锁，`power_fusion` 表示 15 级 + 六精通全满 + 威望正向收益后的默认运行清单。

## 06. 指挥官精通

Owner：`CommanderMasteryProfile`、`CommanderMasteryEffectProfile`、`CommanderMasteryModifierProfile`。

| 组 | 名称 | Upgrade | 每点 | 30点口径 |
|---|---|---|---|---|
| 1 | 泽拉图攻击速度 | `MasteryZeratulZeratulAttackSpeed` | 1.5 | +45% |
| 1 | 战斗单位攻击速度 | `MasteryZeratulCombatUnitAttackSpeed` | 0.5 | +15% |
| 2 | 神器碎片刷新速度 | `MasteryZeratulArtifactFragmentSpawnRate` | 2 | -60秒 |
| 2 | 支援力量冷却时间缩减 | `MasteryZeratulSupportCalldownCooldownReduction` | 1 | -30% |
| 3 | 传奇军团费用 | `MasteryZeratulLegendaryLegionCost` | 1 | -30% |
| 3 | 化身冷却时间 | `MasteryZeratulAvatarCooldown` | 4 | -120秒 |

实现备注：当前默认六项全部 30 点。表里的 30 点口径由 `point_increments * 30` 推导，最终数值仍需以 Upgrade Effect 闭包验证。

## 07. 指挥官建筑

Owner：`CommanderBuildingProfile`、`CommanderBuildingAbilityProfile`、`CommanderBuildingTrainProfile`、`CommanderBuildingStageProfile`、`CommanderBuildingBehaviorProfile`。

来源：官方提取 `buildings.json`。

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 传送门 | `Gateway` | `Gateway` | Ground; Mechanical | 矿:150 气:- 人口字段:- 生命:500 | 使星灵可以利用折跃技术召集地面单位。 / 开启： / - 狂热者 |
| 光子炮台 | `PhotonCannon` | `PhotonCannon, Zealot` | Ground; Mechanical | 矿:150 气:- 人口字段:- 生命:150 | 主力防御建筑。 / 可以对地和对空。 / 侦测单位 |
| 黑暗圣坛 | `DarkShrine` | `DarkShrine` | Ground; Mechanical | 矿:150 气:150 人口字段:- 生命:500 | 为黑暗圣堂武士提供升级方案。 / 开启： / - 可以在传送门中折跃黑暗圣堂武士 / - 黑暗圣堂武士可以融合为执政官 |
| 折跃机械台 | `RoboticsWarp` | `RoboticsFacilityWarp, ZeratulRoboticsFacility` | -; Mechanical | 矿:- 气:- 人口字段:- 生命:- | 允许折跃星灵机械单位。 / 开启： / - 不朽者 / - 侦测器 |

### 建筑按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 黑暗圣坛 | `ResearchShadowFury` | 研究暗影之怒 | `DarkShrineResearch,Research1` | - | 使黑暗圣堂武士在目标之间腾跃，每次腾跃造成{Effect,DarkTemplarShadowFuryDamage,Amount} (+{Effect,Da... |
| 黑暗圣坛 | `ResearchShadowDashLocked` | 研究闪现 | `-` | VorazunLevel06 | 该科技将在指挥官等级6时解锁。 |
| 黑暗圣坛 | `ResearchVoidStasisLocked` | 研究虚空静滞 | `-` | VorazunLevel06 | 该科技将在指挥官等级6时解锁。 |
| 黑暗圣坛 | `ResearchDarkArchonFullStartingEnergyLocked` | 研究阿古斯水晶 | `-` | VorazunLevel09 | 该科技将在指挥官等级9时解锁。 |
| 黑暗圣坛 | `ResearchMindControlLocked` | 研究精神控制 | `-` | VorazunLevel09 | 该科技将在指挥官等级9时解锁。 |
| 黑暗圣坛 | `DarkTemplarPassive` | DarkTemplarPassive | `-` | - | - |
| 黑暗圣坛 | `DarkArchonPassive` | DarkArchonPassive | `-` | HaveVorazunCommander | - |
| 黑暗圣坛 | `ZeratulDarkTemplarBlink` | 闪现 | `-` | HaveZeratulArtifactTier1AndDarkShine | 使虚空圣堂武士可以传送至附近一处目标位置。 |
| 黑暗圣坛 | `ResearchZeratulZealotBlinkHeal` | ResearchZeratulZealotBlinkHeal | `-` | HaveZeratulArtifactTier2AndDarkShine | - |
| 黑暗圣坛 | `ResearchZeratulDarkTemplarShadowFury` | ResearchZeratulDarkTemplarShadowFury | `-` | HaveZeratulArtifactTier3AndDarkShine | - |
| 传送门 | `WarpInSupplicant` | 折跃死徒 | `GatewayTrain,Train11` | - | 近战战士。在阿拉纳克濒临死亡时牺牲自己来为他治疗。死徒可以同时折跃两个。 / 可以对地。 |
| 传送门 | `SentryFenix` | 折跃保护者 | `GatewayTrain,Train15` | - | 净化者阵营 / 机械支援单位。可以使用防护场和相位模式。 / 可以对地和对空。 |
| 传送门 | `Stalker` | 折跃追猎者 | `GatewayTrain,Train2` | - | 远程支援型步战机甲。 / 可以对地和对空。 |
| 传送门 | `WarpInAdept` | 折跃使徒 | `GatewayTrain,Train7` | - | 远程特种单位。可以使用灵能传送。 / 可以对地。 |
| 传送门 | `WarpinAscendentLocked` | 折跃晋升者 | `-` | AlarakLevel08 | 该单位将在指挥官等级8时解锁。 |
| 传送门 | `DarkTemplar` | 折跃黑暗圣堂武士 | `GatewayTrain,Train5` | - | 致命的近战杀手，该单位永远处于隐形状态，敌人在不借助侦测单位帮助的情况下无法发现他。可以融合为执政官。 / 可以对地。 |
| 传送门 | `WarpInDarkArchonLocked` | 折跃黑暗执政官 | `-` | VorazunLevel05 | 该技能将在指挥官等级5时解锁。 |
| 传送门 | `UpgradeToWarpGate` | 变形为折跃门 | `UpgradeToWarpGate,Execute` | - | 将传送门升级为折跃门，使星灵可以利用折跃技术将地面单位召集到任何有水晶塔或折跃棱镜能量覆盖的区域。 |
| 传送门 | `AlarakMasteryUnitAttackSpeed` | 战斗精通 | `-` | HaveMasteryAlarakUnitAttackSpeed | 精通：折跃在该建筑旁边的单位获得{Effect,MasteryAlarakUnitAttackSpeedDisplayDummy,Amount}%攻击速度。 |
| 传送门 | `-` | - | `que5notPassive,CancelLast` | - | - |
| 光子炮台 | `AttackBuilding` | 攻击 | `attack,Execute` | - | 锁定并且攻击目标，直到超出射程或对方被摧毁。 |
| 光子炮台 | `KaraxTurretRange` | 强化瞄准 | `-` | HaveKaraxTurretRange | 防御性建筑的射程提高2。 |
| 光子炮台 | `KaraxTurretAttackSpeed` | 军械优化 | `-` | HaveKaraxTurretAttackSpeed | 防御性建筑的攻击速度提高25%。 |
| 光子炮台 | `Detector` | 侦测单位 | `-` | NotUnderConstruction | 该单位能够侦测到隐形、潜地和幻像单位。 |
| 折跃机械台 | `Observer` | 折跃侦测器 | `RoboticsFacilityWarpTrain,Train2` | - | 间谍型空中单位。拥有永久隐形的能力。 / 侦测单位 |
| 折跃机械台 | `SuperiorWarpRoboticsFacilities` | 超级机械折跃台 | `-` | HaveSuperiorWarpGates | 机械折跃台最多能拥有3次充能。 |
| 折跃机械台 | `MorphBackToRoboticsFacility` | MorphBackToRoboticsFacility | `MorphBackToRoboticsFacility,Execute` | - | - |

实现备注：建筑声明自身生产、研究、行为和阶段；训练单位的最终可用性由兵种/科技/精通/威望共同裁决。

## 08. 科技建筑及其升级选项

Owner：`CommanderTechBuildingProfile`、`CommanderUnitTechProfile`、`CommanderUpgradeProfile`、`CommanderUpgradeRequirementProfile`、`CommanderUpgradeEffectProfile`。

### 15 级解锁与研究命令

| 等级 | 名称 | 解锁升级 | 解锁 AbilityCmd | 说明 |
|---|---|---|---|---|
| 1 | 萨尔纳加之力 | `SOAAutoAssimilator, ZeratulArtifactTier0, SOAStrafeAttackUpgrade` | `RallyZeratulTopBarRedirect:` | 泽拉图有100点的起始补给单位数，并且其单位拥有更高的生命值和伤害。建筑不需要水晶塔，但是单位无法直接向战场折跃。泽拉图的古代星灵枢纽可以自动建造古代吸纳舱。 |
| 2 | 预言成真 | `ZeratulThirdArtifactUpgrade` | `-` | 解锁泽拉图寻找第三块神器碎片的能力。一旦找齐所有神器碎片，泽拉图将解锁以下能力： / 召唤灵能潜能的具象体——形体化身。召唤进化潜能的具象体——精华化身。 |
| 3 | 时空通道强化包1 | `-` | `ZeratulCalldownOdinTargeted:` | 找到第二块神器碎片后解锁下列时空通道级别的神器升级： / 使萨尔纳加伏击者在闪现后会留下一个虚空恶灵，制造一次攻击，造成200%武器伤害。使萨尔纳加光盾卫士的能量恢复提高10... |
| 4 | 新单位：萨尔纳加禁绝者 | `-` | `ZeratulBarracksTrain:4` | 机械干扰型单位。可以使用净化新星造成大量范围性伤害。在构造体设施中制造。 / 可以对地。 |
| 5 | 超维空间技术强化包 | `-` | `ZeratulEngineeringBayResearch:, ZeratulEngineeringBayResearch:1, ZeratulEngineeringBayResearch:2` | 解锁下列神器能力选项： / 在目标位置部署一座超维空间巨石。超维空间巨石可以击晕敌人，进行自我投射，并保护自己免受伤害。阴影投射的冷却时间减少25%，阴影屏障的技能可吸收的伤... |
| 6 | 构造体强化包1 | `-` | `ZeratulFactoryTrain:3` | 找到第二块神器碎片后，解锁下列构造体级别的神器升级： / 使萨尔纳加执行者的对空武器可以击退敌方空中单位，并且对轰击路线沿途的单位造成25%伤害。萨尔纳加禁绝者的净化新星的冷... |
| 7 | 虚空之路 | `ZeratulCoopHeroHalfCostUpgrade` | `-` | 解锁下列神器能力选项： / 召唤塞达斯及其传奇般的黑暗执政官军团支援战场。该军团无法被直接控制，但可以使用顶部技能条对其进行指引。召唤一枚无敌的虚空抑制晶体，降低敌方单位的移... |
| 8 | 超能军团 | `-` | `ZeratulFactoryTrain:1` | 找到第三块神器碎片后，传奇军团获得新的能力： / 特布鲁斯获得能量反蚀技能，可以抽取敌方单位的能量。特布鲁斯的狂热者军团获得冲锋技能，使他们可以拦截敌方地面单位。佐拉亚和她的... |
| 9 | 新单位：萨尔纳加虚空阵列船 | `ZeratulCoopMedivacChargesUpgrade` | `-` | 飞行虫洞发生器。同一时间建造两个。可以部署后在萨尔纳加虚空阵列船之间生成数据链。 |
| 10 | 时空理论 | `ZeratulTalentQuickBuild` | `ZeratulBarracksTrain:2` | 使萨尔纳加时空通道和构造体设施中生产单位的建造时间缩短50%。 |
| 11 | 时空通道强化包2 | `ZeratulCoopEquipmentCostUpgrade, BacktotheShadows` | `-` | 找到三块神器碎片后，解锁下列时空通道级别的神器升级： / 使萨尔纳加伏击者可以储存最多3层预判闪现充能，并且每8秒重新获得一层充能。使萨尔纳加光盾卫士可以制造一道4.5射程的... |
| 12 | 黑暗代理 | `ZeratulSupportMechanicsUpgrade` | `ZeratulHeroResearch2:15, ZeratulHeroResearch2:17, ZeratulHeroResearch:11, ZeratulHeroResearch2:7, ZeratulHeroResearch2:11` | 将萨尔纳加光盾卫士的补给消耗减少至1。将一对萨尔纳加虚空阵列船的补给消耗减少至1。将萨尔纳加观察者的补给消耗降低至0。 |
| 13 | 构造体强化包2 | `-` | `ZeratulOdinPlatformResearch:1` | 找到第三块神器碎片后，解锁下列构造体级别的神器升级： / 萨尔纳加执行者的屏障吸收伤害量提高300%。当屏障激活时，萨尔纳加执行者破损的机体外壳会被完全修复。当萨尔纳加禁绝者... |
| 14 | 纯粹完美 | `ZeratulTalentUltimatePurity` | `ZeratulHeroResearch:3, ZeratulHeroResearch2:20, ZeratulHeroResearch:7, ZeratulHeroResearch2:2` | 形体化身获得一项能力，可以召唤能独自施放微型灵能风暴的充能水晶。精华化身获得一项能力，可以将一个大范围内的所有敌人变形成更低一级的进化形态。 |
| 15 | 纯粹意志 | `-` | `ZeratulEngineeringBayResearch:11, ZeratulEngineeringBayResearch:12, ZeratulEngineeringBayResearch:6, ZeratulEngineeringBayResearch:7` | 泽拉图每找到一块神器碎片，就会获得额外的护盾、暗影顺劈伤害提高以及额外的闪现使用次数。 |

### Upgrade 摘要

| Upgrade | 父级 | 显示名 | Effect数 | 说明 |
|---|---|---|---|---|
| `BacktotheShadows` | `-` | 撤回阴影 | 0 | - |
| `CommanderPrestigeZeratulArtifactFragments` | `CommanderPrestige` | 知识探求者 | 13 | 优点 / 泽拉图可以收集的神器碎片没有数量上限。 / 缺点 / 泽拉图的战斗单位消耗提高25%。 |
| `CommanderPrestigeZeratulTornadoes` | `CommanderPrestige` | 虚空先驱 | 1 | 优点 / 每收集一个神器碎片都会使泽拉图的暗影顺劈冷却时间缩短5秒。暗影顺劈生成一个龙卷风，可以对敌方单位造成伤害并使其减速。 / 缺点 / 泽拉图只能收集最多2... |
| `CommanderPrestigeZeratulTornadoesShadowCleave1` | `CommanderPrestige` | - | 1 | - |
| `CommanderPrestigeZeratulTornadoesShadowCleave2` | `CommanderPrestige` | - | 1 | - |
| `CommanderPrestigeZeratulVoidSeeker` | `CommanderPrestige` | 黎明使徒 | 0 | 优点 / 泽拉图可以部署虚空寻觅者号，可以使目标区域内的友方单位获得超级隐形，持续15秒。 / 缺点 / 虚空寻觅者号不再能够运输泽拉图。 |
| `MasteryZeratulArtifactFragmentSpawnRate` | `-` | 精通 泽拉图 神器碎片刷新率 | 1 | 缩短神器碎片在地图上刷新所需时间。 |
| `MasteryZeratulAvatarCooldown` | `-` | 精通 泽拉图 化身冷却时间 | 3 | 降低泽拉图的召唤化身的冷却时间。 |
| `MasteryZeratulCombatUnitAttackSpeed` | `-` | 精通 泽拉图 战斗单位攻击速度 | 7 | 提高泽拉图的战斗单位的攻击速度。 |
| `MasteryZeratulLegendaryLegionCost` | `-` | 精通 泽拉图 传奇军团费用 | 4 | 降低召唤泽拉图传奇军团的晶体矿费用。 |
| `MasteryZeratulSupportCalldownCooldownReduction` | `-` | 精通 泽拉图 召唤支援力量 冷却时间缩减 | 8 | 降低召唤泽拉图支援力量的冷却时间。 |
| `MasteryZeratulZeratulAttackSpeed` | `-` | 精通 泽拉图 泽拉图攻击速度 | 3 | 提高泽拉图的攻击速度。 |
| `SOAAutoAssimilator` | `-` | - | 0 | - |
| `SOAStrafeAttackUpgrade` | `-` | SOAStrafe Attack Upgrade | 1 | - |
| `ZeratulArtifactTier0` | `-` | - | 0 | - |
| `ZeratulArtifactTier1` | `-` | 找到第一块萨尔纳加神器碎片 | 10 | - |
| `ZeratulArtifactTier2` | `-` | 找到第二块萨尔纳加神器碎片 | 10 | - |
| `ZeratulCommander` | `-` | 泽拉图 | 15 | - |
| `ZeratulCoopEquipmentCostUpgrade` | `-` | - | 0 | - |
| `ZeratulCoopHeroHalfCostUpgrade` | `-` | - | 0 | - |
| `ZeratulCoopMedivacChargesUpgrade` | `-` | - | 0 | - |
| `ZeratulSupportMechanicsUpgrade` | `-` | 泽拉图 支援力量技术升级 | 5 | - |
| `ZeratulTalentQuickBuild` | `-` | 泽拉图 天赋 快速建造 | 7 | - |
| `ZeratulTalentUltimatePurity` | `-` | 泽拉图 天赋 终极纯粹 | 0 | - |
| `ZeratulThirdArtifactUpgrade` | `-` | ZeratulThirdArtifactUpgrade | 1 | - |
| `ZeratulTopBarVoidRaySquad` | `-` | - | 0 | - |
| `ZeratulTopBarZealotSquad` | `-` | - | 0 | - |

### 研究/升级按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 黑暗圣坛 | `ResearchShadowFury` | 研究暗影之怒 | `DarkShrineResearch,Research1` | - | 使黑暗圣堂武士在目标之间腾跃，每次腾跃造成{Effect,DarkTemplarShadowFuryDamage,Amount} (+{Effect,Da... |
| 黑暗圣坛 | `ResearchShadowDashLocked` | 研究闪现 | `-` | VorazunLevel06 | 该科技将在指挥官等级6时解锁。 |
| 黑暗圣坛 | `ResearchVoidStasisLocked` | 研究虚空静滞 | `-` | VorazunLevel06 | 该科技将在指挥官等级6时解锁。 |
| 黑暗圣坛 | `ResearchDarkArchonFullStartingEnergyLocked` | 研究阿古斯水晶 | `-` | VorazunLevel09 | 该科技将在指挥官等级9时解锁。 |
| 黑暗圣坛 | `ResearchMindControlLocked` | 研究精神控制 | `-` | VorazunLevel09 | 该科技将在指挥官等级9时解锁。 |
| 黑暗圣坛 | `ResearchZeratulZealotBlinkHeal` | ResearchZeratulZealotBlinkHeal | `-` | HaveZeratulArtifactTier2AndDarkShine | - |
| 黑暗圣坛 | `ResearchZeratulDarkTemplarShadowFury` | ResearchZeratulDarkTemplarShadowFury | `-` | HaveZeratulArtifactTier3AndDarkShine | - |
| 干扰者 | `ZeratulPurificationNovaBattery` | 新星电池 | `-` | HaveZeratulArtifactTier2AndRoboticsBay | 净化新星的冷却时间缩短{(Abil,ZeratulPurificationNovaTargeted,Cost[0].Cooldown.TimeUse-$U... |
| 传送门 | `UpgradeToWarpGate` | 变形为折跃门 | `UpgradeToWarpGate,Execute` | - | 将传送门升级为折跃门，使星灵可以利用折跃技术将地面单位召集到任何有水晶塔或折跃棱镜能量覆盖的区域。 |
| 不朽者 | `HaveZeratulImmortalImprovedBarrier` | 永恒屏障 | `-` | HaveZeratulArtifactTier3AndRoboticsBay | 萨尔纳加执行者屏障吸收的伤害量提高{$UpgradeEffectArrayValue:ZeratulArtifactTier3_RoboticsBay:B... |
| 机械哨兵 | `ZeratulSentryEnergyRegen` | 星蚀协议 | `-` | HaveZeratulArtifactTier2AndCyberCore | 该单位的能量恢复提高{$UpgradeEffectArrayValue:ZeratulArtifactTier2_CyberneticsCore:Unit... |
| 追猎者 | `ZeratulStalkerBlinkCharges` | 相位电池 | `-` | HaveZeratulArtifactTier3AndCyberCore | 该单位现在可以储存最多{$UpgradeEffectArrayValue:ZeratulArtifactTier3_CyberneticsCore:Abi... |

实现备注：科技建筑只负责展示/触发研究；每个单位升级效果由对应 `CommanderUnitTechProfile` 或 `CommanderUpgradeEffectProfile` 声明。

## 09. 特定地图运输机空投单位

Owner：`CommanderCargoLoadoutProfile`、`CommanderMapDropProfile`、`CommanderScenarioFallbackProfile`。

### 运输/空投能力候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 黑暗圣坛 | `ZeratulDarkTemplarBlink` | 闪现 | `-` | HaveZeratulArtifactTier1AndDarkShine | 使虚空圣堂武士可以传送至附近一处目标位置。 |
| 传送门 | `WarpInSupplicant` | 折跃死徒 | `GatewayTrain,Train11` | - | 近战战士。在阿拉纳克濒临死亡时牺牲自己来为他治疗。死徒可以同时折跃两个。 / 可以对地。 |
| 传送门 | `SentryFenix` | 折跃保护者 | `GatewayTrain,Train15` | - | 净化者阵营 / 机械支援单位。可以使用防护场和相位模式。 / 可以对地和对空。 |
| 传送门 | `Stalker` | 折跃追猎者 | `GatewayTrain,Train2` | - | 远程支援型步战机甲。 / 可以对地和对空。 |
| 传送门 | `WarpInAdept` | 折跃使徒 | `GatewayTrain,Train7` | - | 远程特种单位。可以使用灵能传送。 / 可以对地。 |
| 传送门 | `WarpinAscendentLocked` | 折跃晋升者 | `-` | AlarakLevel08 | 该单位将在指挥官等级8时解锁。 |
| 传送门 | `DarkTemplar` | 折跃黑暗圣堂武士 | `GatewayTrain,Train5` | - | 致命的近战杀手，该单位永远处于隐形状态，敌人在不借助侦测单位帮助的情况下无法发现他。可以融合为执政官。 / 可以对地。 |
| 传送门 | `WarpInDarkArchonLocked` | 折跃黑暗执政官 | `-` | VorazunLevel05 | 该技能将在指挥官等级5时解锁。 |
| 传送门 | `UpgradeToWarpGate` | 变形为折跃门 | `UpgradeToWarpGate,Execute` | - | 将传送门升级为折跃门，使星灵可以利用折跃技术将地面单位召集到任何有水晶塔或折跃棱镜能量覆盖的区域。 |
| 传送门 | `AlarakMasteryUnitAttackSpeed` | 战斗精通 | `-` | HaveMasteryAlarakUnitAttackSpeed | 精通：折跃在该建筑旁边的单位获得{Effect,MasteryAlarakUnitAttackSpeedDisplayDummy,Amount}%攻击速度。 |
| 折跃机械台 | `Observer` | 折跃侦测器 | `RoboticsFacilityWarpTrain,Train2` | - | 间谍型空中单位。拥有永久隐形的能力。 / 侦测单位 |
| 折跃机械台 | `SuperiorWarpRoboticsFacilities` | 超级机械折跃台 | `-` | HaveSuperiorWarpGates | 机械折跃台最多能拥有3次充能。 |
| 追猎者 | `PredictiveBlinkPassive` | 预判闪现 | `-` | HaveZeratulArtifactTier1AndCyberCore | 使该单位可以传送到附近一处目标点。萨尔纳加伏击者一旦机体受到损坏就会自动闪现至安全位置。 |
| 追猎者 | `ZeratulStalkerShadowBlink` | 预判闪现 | `ZeratulStalkerBlink,Execute` | - | 将该单位传送到附近一处位置。 |
| 泽拉图 折跃棱镜 | `ZeratulWarpPrismWormholeMode` | 虫洞模式 | `ZeratulPhasingMode,Execute` | - | 命令萨尔纳加虚空阵列船变形成虫洞模式，使其可以在不同的虚空阵列船之间传输单位。该单位在该模式下无法移动。 |
| 泽拉图 折跃棱镜 | `ZeratulWarpPrismSelectVoidRift` | 选择虫洞出口 | `ZeratulWarpPrismSelectVoidRift,Execute` | - | 选中当前处于自动卸载模式中的虚空阵列船。 |

### 可投放单位候选

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 不朽者 | `ImmortalZeratul` | `ZeratulImmortal` | Ground; Armored/Mechanical | 矿:750 气:300 人口字段:-4 生命:400 | 步战机甲。可以使用屏障吸收伤害并击退敌方空中单位。 / 可以对空和对地。 |
| 干扰者 | `DisruptorZeratul` | `ZeratulDisruptor` | Ground; Armored/Mechanical | 矿:450 气:450 人口字段:-3 生命:200 | 机械干扰型单位。可以使用净化新星造成大量范围性伤害。 / 可以对地。 |
| 机械哨兵 | `SentryZeratul` | `ZeratulSentry` | Ground; Light/Mechanical/Psionic | 矿:75 气:150 人口字段:-2 生命:120 | 机械支援单位。可以使用护盾充能与反射护盾。 / 可以对空和对地。 |
| 狂热者 | `ZealotZeratul` | `ZeratulSummonZealot` | Ground; Biological/Light | 矿:100 气:- 人口字段:- 生命:100 | - |
| 泽拉图 折跃棱镜 | `WarpPrismZeratul` | `ZeratulWarpPrism` | Air; Armored/Mechanical/Psionic | 矿:150 气:- 人口字段:-1 生命:200 | 飞行虫洞发生器。同一时间建造两个。可以部署后在萨尔纳加虚空阵列船之间生成数据链。 |
| 侦测器 | `Observer` | `Observer` | Air; Light/Mechanical | 矿:25 气:75 人口字段:-1 生命:40 | 间谍型空中单位。拥有永久隐形的能力。 / 侦测单位 |
| 侦测器 | `ObserverZeratul` | `Observer, ZeratulObserver` | Air; Light/Mechanical | 矿:25 气:75 人口字段:-1 生命:40 | 间谍型空中单位。拥有永久隐形的能力。 / 侦测单位 |
| 追猎者 | `StalkerZeratul` | `ZeratulStalker` | Ground; Armored/Mechanical | 矿:300 气:50 人口字段:-2 生命:100 | 远程支援型步战机甲。受到威胁时会自动使用预判闪现。 / 可以对空和对地。 |

实现备注：运输机空投不要读取地图硬编码单位组，应从 `CommanderCargoLoadoutProfile` 读取当前 commander 的 `power_fusion` 单位清单和场景过滤规则。

## 10. 指挥官特殊机制

Owner：`CommanderSpecialMechanicProfile`、`CommanderSpecialResourceProfile`、`CommanderSpecialMechanicHookProfile`、`CommanderSpecialMechanicUnitProfile`。

本指挥官重点：神器碎片、预言视野、泽拉图英雄和神器科技替换是主特殊机制。

### 特殊机制命中项

- 萨尔纳加之力 (`ZeratulPHLevel1`)
- 预言成真 (`ZeratulPHLevel2`)
- 时空通道强化包1 (`ZeratulPHLevel3`)
- 超维空间技术强化包 (`ZeratulPHLevel5`)
- 构造体强化包1 (`ZeratulPHLevel6`)
- 虚空之路 (`ZeratulPHLevel7`)
- 超能军团 (`ZeratulPHLevel8`)
- 时空通道强化包2 (`ZeratulPHLevel11`)
- 构造体强化包2 (`ZeratulPHLevel13`)
- 纯粹完美 (`ZeratulPHLevel14`)
- 纯粹意志 (`ZeratulPHLevel15`)

### 特殊机制 Upgrade 候选

- 知识探求者 (`CommanderPrestigeZeratulArtifactFragments`)
- 虚空先驱 (`CommanderPrestigeZeratulTornadoes`)
- 精通 泽拉图 神器碎片刷新率 (`MasteryZeratulArtifactFragmentSpawnRate`)
- ZeratulArtifactTier0 (`ZeratulArtifactTier0`)
- 找到第一块萨尔纳加神器碎片 (`ZeratulArtifactTier1`)
- 找到第二块萨尔纳加神器碎片 (`ZeratulArtifactTier2`)
- ZeratulThirdArtifactUpgrade (`ZeratulThirdArtifactUpgrade`)

### 特殊机制按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 黑暗圣坛 | `ZeratulDarkTemplarBlink` | 闪现 | `-` | HaveZeratulArtifactTier1AndDarkShine | 使虚空圣堂武士可以传送至附近一处目标位置。 |
| 黑暗圣坛 | `ResearchZeratulZealotBlinkHeal` | ResearchZeratulZealotBlinkHeal | `-` | HaveZeratulArtifactTier2AndDarkShine | - |
| 黑暗圣坛 | `ResearchZeratulDarkTemplarShadowFury` | ResearchZeratulDarkTemplarShadowFury | `-` | HaveZeratulArtifactTier3AndDarkShine | - |
| 干扰者 | `ZeratulPurificationNovaBattery` | 新星电池 | `-` | HaveZeratulArtifactTier2AndRoboticsBay | 净化新星的冷却时间缩短{(Abil,ZeratulPurificationNovaTargeted,Cost[0].Cooldown.TimeUse-$U... |
| 干扰者 | `ZeratulPurificationNovaSplit` | 集束新星 | `ZeratulPurificationNovaTargeted,Execute` | HaveZeratulArtifactTier3AndRoboticsBay | 当净化新星爆炸时，它会产生三个更小的新星，每一个对沿途的敌人造成{Effect,ZeratulPurificationNovaSmallOrbSearch... |
| 不朽者 | `ZeratulImmortalBarrierPassive` | 屏障 | `-` | HaveZeratulArtifactTier1AndRoboticsBay | 使该单位可以吸收{Behavior,ImmortalBarrierBase,DamageResponse.ModifyLimit}点伤害。持续{Behav... |
| 不朽者 | `HaveZeratulImmortalRange` | 原力炮 | `-` | HaveZeratulArtifactTier2AndRoboticsBay | 该单位的对空武器可以击退敌方空中单位，并且对轰击路线沿途的单位造成{Effect,ZeratulPhaseDisruptorsAir,AreaArray[... |
| 不朽者 | `HaveZeratulImmortalImprovedBarrier` | 永恒屏障 | `-` | HaveZeratulArtifactTier3AndRoboticsBay | 萨尔纳加执行者屏障吸收的伤害量提高{$UpgradeEffectArrayValue:ZeratulArtifactTier3_RoboticsBay:B... |
| 机械哨兵 | `ZeratulShieldRechargePassive` | 护盾充能 | `-` | HaveZeratulArtifactTier1AndCyberCore | 使该单位可以给友方星灵单位的护盾进行充能。 |
| 机械哨兵 | `ZeratulSentryEnergyRegen` | 星蚀协议 | `-` | HaveZeratulArtifactTier2AndCyberCore | 该单位的能量恢复提高{$UpgradeEffectArrayValue:ZeratulArtifactTier2_CyberneticsCore:Unit... |
| 机械哨兵 | `ZeratulReflectionShieldPassive` | 反射护盾 | `-` | HaveZeratulArtifactTier3AndCyberCore | 使该单位可以制造一道光环，将{Effect,ZeratulReflectionShieldApplyBehavior,Chance*100}%投射物反射给... |
| 机械哨兵 | `VoidSentryShieldRepair` | VoidSentryShieldRepair | `ZeratulSentryShieldRepair,Execute` | - | - |
| 追猎者 | `PredictiveBlinkPassive` | 预判闪现 | `-` | HaveZeratulArtifactTier1AndCyberCore | 使该单位可以传送到附近一处目标点。萨尔纳加伏击者一旦机体受到损坏就会自动闪现至安全位置。 |
| 追猎者 | `ZeratulStalkerGhost` | 虚空复仇 | `-` | HaveZeratulArtifactTier2AndCyberCore | 闪现后会留下一个虚空恶灵，制造一次攻击，造成该单位{Effect,ZeratulStalkerGhostDamage,Amount/Effect,Zera... |
| 追猎者 | `ZeratulStalkerBlinkCharges` | 相位电池 | `-` | HaveZeratulArtifactTier3AndCyberCore | 该单位现在可以储存最多{$UpgradeEffectArrayValue:ZeratulArtifactTier3_CyberneticsCore:Abi... |

实现备注：凡是涉及局内状态、资源、堆叠、全局计时器、隐藏 caster 的机制，都必须有 runtime hook 和 `[XM_DBG]` 日志。

## 11. 指挥官个性化机制

Owner：`CommanderPersonalMechanicProfile`、`CommanderPersonalMechanicEffectProfile`、`CommanderPersonalMechanicHookProfile`、`CommanderPersonalMechanicRequirementProfile`。

本指挥官重点：神器碎片改变科技、面板和单位强度，必须作为局内状态机接入。

### 威望正向融合输入

| 威望 ID | Primary Upgrade | 禁用单位 | 启用单位 | 禁用 Ability | 补充 Upgrade |
|---|---|---|---|---|---|
| `CommanderPrestigeZeratulVoidSeeker` | `CommanderPrestigeZeratulVoidSeeker` | `-` | `-` | `-` | `-` |
| `CommanderPrestigeZeratulArtifactFragments` | `CommanderPrestigeZeratulArtifactFragments` | `-` | `-` | `-` | `-` |
| `CommanderPrestigeZeratulTornadoes` | `CommanderPrestigeZeratulTornadoes` | `-` | `-` | `-` | `ZeratulTornadoes1, ZeratulTornadoes2` |

融合规则：只取正面收益，跳过负面代价、禁用项、费用/冷却/上限惩罚；不能直接启用官方 `PlayerPrestige`。禁用项在本表中保留是为了审计，不代表最终要执行。

## 强度融合规则

1. `XM_ApplyCommanderFullLevel`：应用 15 级全部解锁，补齐升级、能力命令、研究按钮和 roster 变化。
2. `XM_ApplyCommanderAllMasteries`：6 项精通全部按 30 点应用。
3. `XM_ApplyCommanderPrestigeEffects`：只取威望正面收益，跳过负面代价、禁用项、费用/冷却/上限惩罚。
4. `XM_RunCommanderPowerFusionHook`：只处理无法静态声明的行为，例如特殊资源、英雄形态、顶部技能联动。
5. `XM_VerifyCommanderPowerFusion`：输出 `[XM_DBG]` 验证日志。

## 测试台优先场景

```text
standard_base
full_buildings
level15_units
fusion_final_units
panel_smoke
hero_smoke
unit_ability_smoke
tech_smoke
cargo_smoke
special_mechanic_smoke
personal_mechanic_smoke
```

补充：需要排查官方基础差异时才跑 `initial_units`，不要把它当作默认玩法状态。

## `[XM_DBG]` 日志建议

```text
[XM_DBG][INFO][COMMANDER_PROFILE_LOAD] commander=Zeratul levelMode=FullLevel15 masteryMode=AllSixMax rosterStage=power_fusion result=ok
[XM_DBG][INFO][POWER_FUSION_APPLY] commander=Zeratul levelMode=FullLevel15 masteryMode=AllSixMax prestigeMode=SelectedPositive result=ok
[XM_DBG][INFO][ROSTER_LOAD] commander=Zeratul stage=power_fusion units=8 buildings=4 result=ok
[XM_DBG][INFO][MODULE_VERIFY] commander=Zeratul module=<01-11> profile=<profile> result=ok
[XM_DBG][WARN][CASC_AUDIT_REQUIRED] commander=Zeratul module=<module> object=<object> result=needs-casc-audit
```

## 第一轮待审计项

- 顶部技能的 caster、按钮、冷却、充能、目标转发闭包。
- 英雄或特殊英雄的 Unit、Ability、Behavior、Weapon、Actor、Sound 闭包。
- `power_fusion` 最终 roster 与 `level15` roster 的新增、替换、变体关系。
- 6 项精通的真实作用对象和最终数值。
- 3 个威望的正面收益、负面代价、disable/suppress、费用/冷却/上限变化。
- 科技建筑研究按钮、Requirement、Upgrade effect 是否完整。
- 特殊机制和个性化机制是否需要 runtime hook。
