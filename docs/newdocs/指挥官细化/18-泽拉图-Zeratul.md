# 泽拉图（Zeratul）指挥官细化

日期：2026-05-27
最近复核：2026-06-05

## 当前口径

本文件统一按满级 `power_fusion` 口径编写：正文只讨论满级指挥官的最终态，不再把 1 级与 15 级拆成两套玩法态；等级 1-15 只保留为解锁门槛和审计锚点。精通默认 6 项全部 30 点，三个威望按正收益融合展开，不直接启用官方 `PlayerPrestige`。`initial` 仅用于官方基础状态审计和差异对照，默认测试和玩法都看 `power_fusion` 最终状态。

本文件按 `docs/newdocs/模块拆分` 的 11 个模块整理泽拉图。`游戏数据/官方合作指挥官/commanders/Zeratul/` 的 JSON 是索引入口，不等于完整玩法闭包；其中 `heroes.json` 数量为 0 是导出事实，但官方/当前模块实际英雄闭包需要继续追 raw XML，当前有效英雄为 `ZeratulCoop`。

## 链路提醒

- 泽拉图当前官方正向建筑是 `DarkShrine`、`Gateway`、`PhotonCannon`、`RoboticsWarp`；古代吸纳舱来自 `SOAAutoAssimilator` / 泽拉图经济机制，不应反推到其它神族指挥官。
- 泽拉图正向兵种按 `DisruptorZeratul`、`ImmortalZeratul`、`ObserverZeratul`、`SentryZeratul`、`StalkerZeratul`、`WarpPrismZeratul`、`ZealotZeratul` 过滤；`Observer` 只能作为官方槽位/旧导出线索，当前 runtime 正向单位必须落到私有 `ZeratulObserver`。
- 泽拉图形态闭包要把 `ZeratulObserverSiegeMode` 和 `ZeratulWarpPrismPhasing` 作为正向补充单位记录；它们不应被当作额外通用单位污染，也不应从 `Observer` / 普通 `WarpPrism` 反推。
- `VorazunLevel*`、`AlarakLevel*`、`KaraxTurret*` 等共享神族候选在泽拉图页只能作为污染项；泽拉图专属技能链应优先看 `ZeratulArtifact*`、`ZeratulRoboticsFacilityTrain*` 和对应 raw XML 闭包。

## 官方数据摘要

| 项 | 值 |
|---|---|
| CommanderId | `ProtossZeratul` |
| 中文名 | 泽拉图 |
| 默认升级 | `ZeratulCommander`, `SOAAutoAssimilator`, `ZeratulTopBarZealotSquad`, `ZeratulTopBarVoidRaySquad` |
| 默认能力命令 | `ZeratulBuild:1`, `NexusBuild:` |
| 威望 ID | `CommanderPrestigeZeratulVoidSeeker`, `CommanderPrestigeZeratulArtifactFragments`, `CommanderPrestigeZeratulTornadoes` |
| heroes.json 数量 | 0，表示官方 JSON 导出未列英雄，不表示玩法无英雄 |
| roster.json 数量 | 12 |
| units.json 数量 | 8 |
| buildings.json 数量 | 4 |
| command_cards.json 对象数 | 12 |
| upgrades.json 数量 | 27 |
| other-tech-entries.json 数量 | 0 |
| source | `mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/userdata.xml` |

roster 样例：

```text
DarkShrine, DisruptorZeratul, Gateway, ImmortalZeratul, Observer, ObserverZeratul, PhotonCannon, RoboticsWarp, SentryZeratul, StalkerZeratul, WarpPrismZeratul, ZealotZeratul
```

runtime 解释：上面的 `Observer` 是官方/导出槽位，当前 Mod 正向 runtime roster 应映射为 `Observer -> ZeratulObserver`，并补充 `ZeratulObserverSiegeMode`、`ZeratulWarpPrismPhasing` 两个形态。

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
| 默认能力 | - | ZeratulBuild:1 | - | 来自 commander.json |
| 默认能力 | - | NexusBuild: | - | 来自 commander.json |
| Lv1 萨尔纳加之力 | 1 | RallyZeratulTopBarRedirect: | `SOAAutoAssimilator`, `ZeratulArtifactTier0`, `SOAStrafeAttackUpgrade` | 泽拉图有100点的起始补给单位数，并且其单位拥有更高的生命值和伤害。建筑不需要水晶塔，但是单位无法直接向战场折跃。泽拉图的古代星灵枢纽可以自动建造古代吸纳舱。 |
| Lv3 时空通道强化包1 | 3 | ZeratulCalldownOdinTargeted: | - | 找到第二块神器碎片后解锁下列时空通道级别的神器升级： / 使萨尔纳加伏击者在闪现后会留下一个虚空恶灵，制造一次攻击，造成200%武器伤害。使萨尔纳加光盾卫士的能量恢复提高100%。使虚空圣堂武士的闪现可对沿途单位造成50点伤害。使超维空间炮和超维空间巨石将自身投射到目标位置... |
| Lv4 新单位：萨尔纳加禁绝者 | 4 | ZeratulBarracksTrain:4 | - | 机械干扰型单位。可以使用净化新星造成大量范围性伤害。在构造体设施中制造。 / 可以对地。 |
| Lv5 超维空间技术强化包 | 5 | ZeratulEngineeringBayResearch: | - | 解锁下列神器能力选项： / 在目标位置部署一座超维空间巨石。超维空间巨石可以击晕敌人，进行自我投射，并保护自己免受伤害。阴影投射的冷却时间减少25%，阴影屏障的技能可吸收的伤害量提高100%。 |
| Lv5 超维空间技术强化包 | 5 | ZeratulEngineeringBayResearch:1 | - | 解锁下列神器能力选项： / 在目标位置部署一座超维空间巨石。超维空间巨石可以击晕敌人，进行自我投射，并保护自己免受伤害。阴影投射的冷却时间减少25%，阴影屏障的技能可吸收的伤害量提高100%。 |
| Lv5 超维空间技术强化包 | 5 | ZeratulEngineeringBayResearch:2 | - | 解锁下列神器能力选项： / 在目标位置部署一座超维空间巨石。超维空间巨石可以击晕敌人，进行自我投射，并保护自己免受伤害。阴影投射的冷却时间减少25%，阴影屏障的技能可吸收的伤害量提高100%。 |
| Lv6 构造体强化包1 | 6 | ZeratulFactoryTrain:3 | - | 找到第二块神器碎片后，解锁下列构造体级别的神器升级： / 使萨尔纳加执行者的对空武器可以击退敌方空中单位，并且对轰击路线沿途的单位造成25%伤害。萨尔纳加禁绝者的净化新星的冷却时间缩短50%。萨尔纳加观察者的移动速度提高50%。 |
| Lv8 超能军团 | 8 | ZeratulFactoryTrain:1 | - | 找到第三块神器碎片后，传奇军团获得新的能力： / 特布鲁斯获得能量反蚀技能，可以抽取敌方单位的能量。特布鲁斯的狂热者军团获得冲锋技能，使他们可以拦截敌方地面单位。佐拉亚和她的虚空辉光舰军团获得棱镜射程技能，其武器射程随着攻击时间的延长而增加。塞达斯和他的黑暗执政官获得灵能漩... |
| Lv10 时空理论 | 10 | ZeratulBarracksTrain:2 | `ZeratulTalentQuickBuild` | 使萨尔纳加时空通道和构造体设施中生产单位的建造时间缩短50%。 |
| Lv12 黑暗代理 | 12 | ZeratulHeroResearch2:15 | `ZeratulSupportMechanicsUpgrade` | 将萨尔纳加光盾卫士的补给消耗减少至1。将一对萨尔纳加虚空阵列船的补给消耗减少至1。将萨尔纳加观察者的补给消耗降低至0。 |
| Lv12 黑暗代理 | 12 | ZeratulHeroResearch2:17 | `ZeratulSupportMechanicsUpgrade` | 将萨尔纳加光盾卫士的补给消耗减少至1。将一对萨尔纳加虚空阵列船的补给消耗减少至1。将萨尔纳加观察者的补给消耗降低至0。 |
| Lv12 黑暗代理 | 12 | ZeratulHeroResearch:11 | `ZeratulSupportMechanicsUpgrade` | 将萨尔纳加光盾卫士的补给消耗减少至1。将一对萨尔纳加虚空阵列船的补给消耗减少至1。将萨尔纳加观察者的补给消耗降低至0。 |
| Lv12 黑暗代理 | 12 | ZeratulHeroResearch2:7 | `ZeratulSupportMechanicsUpgrade` | 将萨尔纳加光盾卫士的补给消耗减少至1。将一对萨尔纳加虚空阵列船的补给消耗减少至1。将萨尔纳加观察者的补给消耗降低至0。 |
| Lv12 黑暗代理 | 12 | ZeratulHeroResearch2:11 | `ZeratulSupportMechanicsUpgrade` | 将萨尔纳加光盾卫士的补给消耗减少至1。将一对萨尔纳加虚空阵列船的补给消耗减少至1。将萨尔纳加观察者的补给消耗降低至0。 |
| Lv13 构造体强化包2 | 13 | ZeratulOdinPlatformResearch:1 | - | 找到第三块神器碎片后，解锁下列构造体级别的神器升级： / 萨尔纳加执行者的屏障吸收伤害量提高300%。当屏障激活时，萨尔纳加执行者破损的机体外壳会被完全修复。当萨尔纳加禁绝者的净化新星爆炸时，它会产生三个更小的新星，每一个对沿途的敌人造成50点伤害。虫洞模式下的萨尔纳加虚空... |
| Lv14 纯粹完美 | 14 | ZeratulHeroResearch:3 | `ZeratulTalentUltimatePurity` | 形体化身获得一项能力，可以召唤能独自施放微型灵能风暴的充能水晶。精华化身获得一项能力，可以将一个大范围内的所有敌人变形成更低一级的进化形态。 |
| Lv14 纯粹完美 | 14 | ZeratulHeroResearch2:20 | `ZeratulTalentUltimatePurity` | 形体化身获得一项能力，可以召唤能独自施放微型灵能风暴的充能水晶。精华化身获得一项能力，可以将一个大范围内的所有敌人变形成更低一级的进化形态。 |
| Lv14 纯粹完美 | 14 | ZeratulHeroResearch:7 | `ZeratulTalentUltimatePurity` | 形体化身获得一项能力，可以召唤能独自施放微型灵能风暴的充能水晶。精华化身获得一项能力，可以将一个大范围内的所有敌人变形成更低一级的进化形态。 |
| Lv14 纯粹完美 | 14 | ZeratulHeroResearch2:2 | `ZeratulTalentUltimatePurity` | 形体化身获得一项能力，可以召唤能独自施放微型灵能风暴的充能水晶。精华化身获得一项能力，可以将一个大范围内的所有敌人变形成更低一级的进化形态。 |
| Lv15 纯粹意志 | 15 | ZeratulEngineeringBayResearch:11 | - | 泽拉图每找到一块神器碎片，就会获得额外的护盾、暗影顺劈伤害提高以及额外的闪现使用次数。 |
| Lv15 纯粹意志 | 15 | ZeratulEngineeringBayResearch:12 | - | 泽拉图每找到一块神器碎片，就会获得额外的护盾、暗影顺劈伤害提高以及额外的闪现使用次数。 |
| Lv15 纯粹意志 | 15 | ZeratulEngineeringBayResearch:6 | - | 泽拉图每找到一块神器碎片，就会获得额外的护盾、暗影顺劈伤害提高以及额外的闪现使用次数。 |
| Lv15 纯粹意志 | 15 | ZeratulEngineeringBayResearch:7 | - | 泽拉图每找到一块神器碎片，就会获得额外的护盾、暗影顺劈伤害提高以及额外的闪现使用次数。 |

### command card 命中

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 萨尔纳加禁绝者 | `ZeratulPurificationNovaBattery` | 新星电池 | - | `HaveZeratulArtifactTier2AndRoboticsBay` | 净化新星的冷却时间缩短{(Abil,ZeratulPurificationNovaTargeted,Cost[0].Cooldown.TimeUse-$UpgradeEffectArrayValue:ZeratulArtifactTier2_RoboticsBay:Weap... |
| 折跃机械台 | `ZeratulChronometry` | 时空理论 | - | - | 被该建筑折跃的单位其建造时间缩短了。 |
| 萨尔纳加伏击者 | `ZeratulStalkerBlinkCharges` | 相位电池 | - | `HaveZeratulArtifactTier3AndCyberCore` | 该单位现在可以储存最多{$UpgradeEffectArrayValue:ZeratulArtifactTier3_CyberneticsCore:Abil,ZeratulStalkerBlink,Cost[0].Charge.CountStart$}层预判闪现充能，并且每... |
| 狂热者 | `Charge` | 冲锋 | `ZeratulCharge,Execute` | - | 允许狂热者能拦截附近的敌人。同时还会提高狂热者的移动速度。该技能每{Abil,Charge,Cost.Cooldown.TimeUse}秒最多只能使用一次。 |
| 狂热者 | `VoidZealotWhirlwind` | - | `ZeratulZealotWhirlwind,Execute` | - | - |

实现备注：面板只注册 profile 和转发 caster，地图不得按 commander 写 if/else。精通和威望影响面板冷却、充能、费用时，由本模块接收最终 modifier。

## 02. 英雄单位及其技能

Owner：`CommanderHeroProfile`、`CommanderHeroModeProfile`、`CommanderHeroAbilityProfile`、`CommanderHeroSkillTreeProfile`、`CommanderHeroReviveProfile`、`CommanderHeroModifierProfile`。

### 英雄单位清单

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 泽拉图 | `ZeratulCoop` | `ZeratulCoop` | Hero; Protoss; Psionic | 当前 raw XML 闭包为准 | `heroes.json=0` 只是官方 JSON 导出未列英雄；当前 `XMZeratul` raw XML 在 `commanders/futurecommanders.xml` 定义 `CUnit id="ZeratulCoop"`。 |

### 英雄技能按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| `ZeratulCoop` | `ZeratulBlink` | 闪现 | `ZeratulBlink,Execute` | - | 英雄本体闪现/位移链；受神器等级和精通/威望收益影响时要看对应 Upgrade/Effect。 |
| `ZeratulCoop` | `ZeratulShadowCleave` | 暗影顺劈 | `ZeratulShadowCleave,Execute` | - | 英雄范围伤害技能；威望 `CommanderPrestigeZeratulTornadoes` 还会扩展旋风类收益。 |
| `ZeratulCoop` | `ZeratulSummonVoidSeeker` | 召唤虚空追寻者 | `ZeratulTeleport,Execute` | `NotCommanderPrestigeZeratulVoidSeeker` | 非 P1/默认正向链，按钮 Face 与 Ability 名不同，不能只按 Face 搜 Ability。 |
| `ZeratulCoop` | `CommanderPrestigeZeratulVoidSeekerSummon` | 黎明使徒召唤 | `CommanderPrestigeZeratulVoidSeeker,Execute` | `CommanderPrestigeZeratulVoidSeeker` | P1 正收益链；当前 `power_fusion` 只取正收益时需避免误套官方负面代价。 |
| `ZeratulCoop` | `ProphecyVision` | 预言视觉 | `ProphecyVision,Execute` | `HaveProphecyArtifactsRemaining` | 寻找神器碎片的核心技能；当前 Mod 已补 `ProphecyVision` / `ProphecyArtifactHide` 兼容目录并在 runtime 监听预言施放。 |

### 英雄形态/模式候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| `ZeratulCoop` | `ZeratulSummonVoidSeeker` | 默认虚空追寻者投送 | `ZeratulTeleport,Execute` | `NotCommanderPrestigeZeratulVoidSeeker` | 这是英雄支援/传送链，不是第二个常驻英雄形态。 |
| `ZeratulCoop` | `CommanderPrestigeZeratulVoidSeekerSummon` | 黎明使徒威望变体 | `CommanderPrestigeZeratulVoidSeeker,Execute` | `CommanderPrestigeZeratulVoidSeeker` | 威望能力替换链；需要同时验证按钮、Ability、Effect、Requirement。 |

### 英雄相关等级解锁

| 等级 | 名称 | 升级 | AbilityCmd | 说明 |
|---|---|---|---|---|
| Lv1 | 萨尔纳加之力 | `SOAAutoAssimilator`, `ZeratulArtifactTier0`, `SOAStrafeAttackUpgrade` | `RallyZeratulTopBarRedirect:` | 泽拉图有100点的起始补给单位数，并且其单位拥有更高的生命值和伤害。建筑不需要水晶塔，但是单位无法直接向战场折跃。泽拉图的古代星灵枢纽可以自动建造古代吸纳舱。 |
| Lv2 | 预言成真 | `ZeratulThirdArtifactUpgrade` | - | 解锁泽拉图寻找第三块神器碎片的能力。一旦找齐所有神器碎片，泽拉图将解锁以下能力： / 召唤灵能潜能的具象体——形体化身。召唤进化潜能的具象体——精华化身。 |
| Lv3 | 时空通道强化包1 | - | `ZeratulCalldownOdinTargeted:` | 找到第二块神器碎片后解锁下列时空通道级别的神器升级： / 使萨尔纳加伏击者在闪现后会留下一个虚空恶灵，制造一次攻击，造成200%武器伤害。使萨尔纳加光盾卫士的能量恢复提高100%。使虚空圣堂武士的闪现可对沿途单位造成50点伤害。使超维空间炮和超维空间巨石将自身投射到目标位置... |
| Lv4 | 新单位：萨尔纳加禁绝者 | - | `ZeratulBarracksTrain:4` | 机械干扰型单位。可以使用净化新星造成大量范围性伤害。在构造体设施中制造。 / 可以对地。 |
| Lv5 | 超维空间技术强化包 | - | `ZeratulEngineeringBayResearch:`, `ZeratulEngineeringBayResearch:1`, `ZeratulEngineeringBayResearch:2` | 解锁下列神器能力选项： / 在目标位置部署一座超维空间巨石。超维空间巨石可以击晕敌人，进行自我投射，并保护自己免受伤害。阴影投射的冷却时间减少25%，阴影屏障的技能可吸收的伤害量提高100%。 |
| Lv6 | 构造体强化包1 | - | `ZeratulFactoryTrain:3` | 找到第二块神器碎片后，解锁下列构造体级别的神器升级： / 使萨尔纳加执行者的对空武器可以击退敌方空中单位，并且对轰击路线沿途的单位造成25%伤害。萨尔纳加禁绝者的净化新星的冷却时间缩短50%。萨尔纳加观察者的移动速度提高50%。 |
| Lv7 | 虚空之路 | `ZeratulCoopHeroHalfCostUpgrade` | - | 解锁下列神器能力选项： / 召唤塞达斯及其传奇般的黑暗执政官军团支援战场。该军团无法被直接控制，但可以使用顶部技能条对其进行指引。召唤一枚无敌的虚空抑制晶体，降低敌方单位的移动和攻击速度，并瘫痪邻近的敌方建筑。泽拉图及其单位的闪现技能的冷却时间缩短50%。 |
| Lv8 | 超能军团 | - | `ZeratulFactoryTrain:1` | 找到第三块神器碎片后，传奇军团获得新的能力： / 特布鲁斯获得能量反蚀技能，可以抽取敌方单位的能量。特布鲁斯的狂热者军团获得冲锋技能，使他们可以拦截敌方地面单位。佐拉亚和她的虚空辉光舰军团获得棱镜射程技能，其武器射程随着攻击时间的延长而增加。塞达斯和他的黑暗执政官获得灵能漩... |
| Lv9 | 新单位：萨尔纳加虚空阵列船 | `ZeratulCoopMedivacChargesUpgrade` | - | 飞行虫洞发生器。同一时间建造两个。可以部署后在萨尔纳加虚空阵列船之间生成数据链。 |
| Lv10 | 时空理论 | `ZeratulTalentQuickBuild` | `ZeratulBarracksTrain:2` | 使萨尔纳加时空通道和构造体设施中生产单位的建造时间缩短50%。 |
| Lv11 | 时空通道强化包2 | `ZeratulCoopEquipmentCostUpgrade`, `BacktotheShadows` | - | 找到三块神器碎片后，解锁下列时空通道级别的神器升级： / 使萨尔纳加伏击者可以储存最多3层预判闪现充能，并且每8秒重新获得一层充能。使萨尔纳加光盾卫士可以制造一道4.5射程的光环，将50%的投射物反射给敌方攻击者。当虚空圣堂武士受到致命伤害时，它将回撤至虚空并开始恢复生命值... |
| Lv12 | 黑暗代理 | `ZeratulSupportMechanicsUpgrade` | `ZeratulHeroResearch2:15`, `ZeratulHeroResearch2:17`, `ZeratulHeroResearch:11`, `ZeratulHeroResearch2:7`, `ZeratulHeroResearch2:11` | 将萨尔纳加光盾卫士的补给消耗减少至1。将一对萨尔纳加虚空阵列船的补给消耗减少至1。将萨尔纳加观察者的补给消耗降低至0。 |
| Lv13 | 构造体强化包2 | - | `ZeratulOdinPlatformResearch:1` | 找到第三块神器碎片后，解锁下列构造体级别的神器升级： / 萨尔纳加执行者的屏障吸收伤害量提高300%。当屏障激活时，萨尔纳加执行者破损的机体外壳会被完全修复。当萨尔纳加禁绝者的净化新星爆炸时，它会产生三个更小的新星，每一个对沿途的敌人造成50点伤害。虫洞模式下的萨尔纳加虚空... |
| Lv14 | 纯粹完美 | `ZeratulTalentUltimatePurity` | `ZeratulHeroResearch:3`, `ZeratulHeroResearch2:20`, `ZeratulHeroResearch:7`, `ZeratulHeroResearch2:2` | 形体化身获得一项能力，可以召唤能独自施放微型灵能风暴的充能水晶。精华化身获得一项能力，可以将一个大范围内的所有敌人变形成更低一级的进化形态。 |
| Lv15 | 纯粹意志 | - | `ZeratulEngineeringBayResearch:11`, `ZeratulEngineeringBayResearch:12`, `ZeratulEngineeringBayResearch:6`, `ZeratulEngineeringBayResearch:7` | 泽拉图每找到一块神器碎片，就会获得额外的护盾、暗影顺劈伤害提高以及额外的闪现使用次数。 |

口径：官方玩法存在泽拉图本体，`heroes.json` 未列只是 JSON 导出缺口；当前有效英雄闭包以 `XMZeratul.SC2Mod/Base.SC2Data/GameData/commanders/futurecommanders.xml` 的 `ZeratulCoop` 为准。当前 Mod 烟测已经按 `ZeratulCoop -> ZeratulBlink / ZeratulShadowCleave / ZeratulTeleport / ProphecyVision / CommanderPrestigeZeratulVoidSeeker` 检查，不再输出 `heroes=0` 的空英雄口径。

待审计：Hero Unit、Ability、Behavior、Weapon、Actor、Sound、复活/重生、能量/资源、形态切换和威望改写闭包。当前静态口径已确认标准复活 loop 由 `LibE0EAE146_HeroRevive.galaxy` 负责：泽拉图死亡后应在主基地附近创建 `HeroReviveUnit`，计时后复活 `ZeratulCoop`；还需实机验证计时 UI 和复活点。

## 03. 普通单位技能及其进化功能

Owner：`CommanderUnitAbilityProfile`、`CommanderUnitStatProfile`、`CommanderUnitEvolutionProfile`、`CommanderUnitBehaviorProfile`、`CommanderUnitWeaponProfile`。

### 单位技能按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 萨尔纳加禁绝者 | `AcquireMove` | 搜索移动 | `move,AcquireMove` | - | 命令选中的单位移至目标区域或跟随目标单位。进行搜索移动的单位不会与敌人交战。 |
| 萨尔纳加禁绝者 | `ZeratulPurificationNovaBattery` | 新星电池 | - | `HaveZeratulArtifactTier2AndRoboticsBay` | 净化新星的冷却时间缩短{(Abil,ZeratulPurificationNovaTargeted,Cost[0].Cooldown.TimeUse-$UpgradeEffectArrayValue:ZeratulArtifactTier2_RoboticsBay:Weap... |
| 萨尔纳加禁绝者 | `ZeratulPurificationNovaSplit` | 集束新星 | `ZeratulPurificationNovaTargeted,Execute` | `HaveZeratulArtifactTier3AndRoboticsBay` | 当净化新星爆炸时，它会产生三个更小的新星，每一个对沿途的敌人造成{Effect,ZeratulPurificationNovaSmallOrbSearchImpactDamage,Amount}点伤害。 |
| 萨尔纳加禁绝者 | `ZeratulPurificationNovaTargeted` | 净化新星 | `attack,Barrage` | - | 发射一团球形能量，触碰敌方单位时或在{Behavior,PurificationNovaTargettedTarget,Duration}秒后引爆，对附近的地面单位和建筑造成{Effect,ZeratulPurificationNovaDamage,Amount}点溅射伤害... |
| 萨尔纳加执行者 | `ZeratulImmortalBarrierPassive` | 屏障 | - | `HaveZeratulArtifactTier1AndRoboticsBay` | 使该单位可以吸收{Behavior,ImmortalBarrierBase,DamageResponse.ModifyLimit}点伤害。持续{Behavior,ImmortalBarrierBase,Duration}秒。 |
| 萨尔纳加执行者 | `HaveZeratulImmortalRange` | 原力炮 | - | `HaveZeratulArtifactTier2AndRoboticsBay` | 该单位的对空武器可以击退敌方空中单位，并且对轰击路线沿途的单位造成{Effect,ZeratulPhaseDisruptorsAir,AreaArray[0].Fraction*100}%伤害。 |
| 萨尔纳加执行者 | `HaveZeratulImmortalImprovedBarrier` | 永恒屏障 | - | `HaveZeratulArtifactTier3AndRoboticsBay` | 萨尔纳加执行者屏障吸收的伤害量提高{$UpgradeEffectArrayValue:ZeratulArtifactTier3_RoboticsBay:Behavior,ImmortalBarrierBase,DamageResponse.ModifyLimit$/Beha... |
| 萨尔纳加执行者 | `ImmortalBarrierBase` | - | `ZeratulImmortalBarrierBase,Execute` | - | 最多可吸收{Behavior,ImmortalBarrierBase,DamageResponse.ModifyLimit}点伤害，持续{Behavior,ImmortalBarrierBase,Duration}秒。 |
| 官方侦测器槽位 | `Observer` | 导出槽位/污染项 | - | - | 不作为泽拉图正向 runtime 技能链；当前 Mod 必须把该槽位映射到 `ZeratulObserver`，不要再检查通用 `ObserverMorphtoObserverSiege` / `HaveGraviticBoosters`。 |
| 萨尔纳加观察者 | `AcquireMove` | 搜索移动 | `move,AcquireMove` | - | 命令选中的单位移至目标区域或跟随目标单位。进行搜索移动的单位不会与敌人交战。 |
| 萨尔纳加观察者 | `ZeratulGraviticBoostersPassive` | 重力加速器 | - | `HaveZeratulArtifactTier2AndRoboticsBay` | 萨尔纳加观察者的移动速度提高{$UpgradeEffectArrayValue:ZeratulArtifactTier2_RoboticsBay:Unit,ZeratulObserver,Speed$/Unit,ZeratulObserver,Speed*100}% |
| 萨尔纳加观察者 | `ZeratulObserverSightRange` | 感应器阵列 | - | `HaveZeratulArtifactTier3AndRoboticsBay` | 萨尔纳加观察者的视野范围扩大{$UpgradeEffectArrayValue:ZeratulArtifactTier3_RoboticsBay:Unit,ZeratulObserver,Sight$/Unit,ZeratulObserver,Sight*100}%。 |
| 萨尔纳加观察者 | `PermanentlyCloakedZeratulObserver` | 永久隐形 | - | - | 该萨尔纳加观察者处于永久隐形状态。 |
| 萨尔纳加观察者 | `MorphtoZeratulObserverSiege` | 监察模式 | `ZeratulObserverMorphtoZeratulObserverSiege,Execute` | - | 使萨尔纳加观察者变形，进入监察模式。观察者的视野扩大{Unit,ZeratulObserverSiegeMode,Sight/Unit,ZeratulObserver,Sight-1*100}%，但失去移动能力。 |
| 萨尔纳加观察者 | `Detector` | 侦测单位 | - | - | 该单位能够侦测到隐形、潜地和幻像单位。 |
| 萨尔纳加光盾卫士 | `ZeratulShieldRechargePassive` | 护盾充能 | - | `HaveZeratulArtifactTier1AndCyberCore` | 使该单位可以给友方星灵单位的护盾进行充能。 |
| 萨尔纳加光盾卫士 | `ZeratulSentryEnergyRegen` | 星蚀协议 | - | `HaveZeratulArtifactTier2AndCyberCore` | 该单位的能量恢复提高{$UpgradeEffectArrayValue:ZeratulArtifactTier2_CyberneticsCore:Unit,ZeratulSentry,EnergyRegenRate$/Unit,ZeratulSentry,EnergyReg... |
| 萨尔纳加光盾卫士 | `ZeratulReflectionShieldPassive` | 反射护盾 | - | `HaveZeratulArtifactTier3AndCyberCore` | 使该单位可以制造一道光环，将{Effect,ZeratulReflectionShieldApplyBehavior,Chance*100}%投射物反射给敌方攻击者。 |
| 萨尔纳加光盾卫士 | `VoidSentryShieldRepair` | VoidSentryShieldRepair | `ZeratulSentryShieldRepair,Execute` | - | - |
| 萨尔纳加光盾卫士 | `ZeratulReflectionShield` | 反射护盾 | `ZeratulReflectionShield,Execute` | - | 制造一道光环，将{Effect,ZeratulReflectionShieldApplyBehavior,Chance*100}%的投射物反射给敌方攻击者。持续{Effect,ZeratulReflectionShieldCP,PeriodicPeriodArray[0]*... |
| 萨尔纳加伏击者 | `PredictiveBlinkPassive` | 预判闪现 | - | `HaveZeratulArtifactTier1AndCyberCore` | 使该单位可以传送到附近一处目标点。萨尔纳加伏击者一旦机体受到损坏就会自动闪现至安全位置。 |
| 萨尔纳加伏击者 | `ZeratulStalkerGhost` | 虚空复仇 | - | `HaveZeratulArtifactTier2AndCyberCore` | 闪现后会留下一个虚空恶灵，制造一次攻击，造成该单位{Effect,ZeratulStalkerGhostDamage,Amount/Effect,ZeratulParticleDisruptorsU,Amount*100}%武器伤害。该效果每{Behavior,Zeratu... |
| 萨尔纳加伏击者 | `ZeratulStalkerBlinkCharges` | 相位电池 | - | `HaveZeratulArtifactTier3AndCyberCore` | 该单位现在可以储存最多{$UpgradeEffectArrayValue:ZeratulArtifactTier3_CyberneticsCore:Abil,ZeratulStalkerBlink,Cost[0].Charge.CountStart$}层预判闪现充能，并且每... |
| 萨尔纳加伏击者 | `ZeratulStalkerShadowBlink` | 预判闪现 | `ZeratulStalkerBlink,Execute` | - | 将该单位传送到附近一处位置。 |
| 萨尔纳加虚空阵列船 | `AcquireMove` | 搜索移动 | `move,AcquireMove` | - | 命令选中的单位移至目标区域或跟随目标单位。进行搜索移动的单位不会与敌人交战。 |
| 萨尔纳加虚空阵列船 | `ZeratulWarpPrismWormholeMode` | 虫洞模式 | `ZeratulPhasingMode,Execute` | - | 命令萨尔纳加虚空阵列船变形成虫洞模式，使其可以在不同的虚空阵列船之间传输单位。该单位在该模式下无法移动。 |
| 萨尔纳加虚空阵列船 | `ZeratulWarpPrismSelectVoidRift` | 选择虫洞出口 | `ZeratulWarpPrismSelectVoidRift,Execute` | - | 选中当前处于自动卸载模式中的虚空阵列船。 |
| 狂热者 | `Charge` | 冲锋 | `ZeratulCharge,Execute` | - | 允许狂热者能拦截附近的敌人。同时还会提高狂热者的移动速度。该技能每{Abil,Charge,Cost.Cooldown.TimeUse}秒最多只能使用一次。 |
| 狂热者 | `VoidZealotWhirlwind` | - | `ZeratulZealotWhirlwind,Execute` | - | - |

### 进化/形态/切换候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 萨尔纳加观察者 | `MorphtoZeratulObserverSiege` | 监察模式 | `ZeratulObserverMorphtoZeratulObserverSiege,Execute` | - | 使萨尔纳加观察者变形，进入监察模式。观察者的视野扩大{Unit,ZeratulObserverSiegeMode,Sight/Unit,ZeratulObserver,Sight-1*100}%，但失去移动能力。 |
| 萨尔纳加观察者-监察模式 | `MorphtoZeratulObserver` | 回到移动模式 | `ZeratulObserverSiegeMorphtoZeratulObserver,Execute` | - | 从 `ZeratulObserverSiegeMode` 回变到 `ZeratulObserver`，这是私有观察者形态闭包的另一半。 |
| 萨尔纳加虚空阵列船 | `ZeratulWarpPrismWormholeMode` | 虫洞模式 | `ZeratulPhasingMode,Execute` | - | 命令萨尔纳加虚空阵列船变形成虫洞模式，使其可以在不同的虚空阵列船之间传输单位。该单位在该模式下无法移动。 |
| 萨尔纳加虚空阵列船-虫洞模式 | `ZeratulTransportMode` | 回到移动模式 | `ZeratulTransportMode,Execute` | - | 从 `ZeratulWarpPrismPhasing` 回到 `ZeratulWarpPrism`；当前 runtime roster 要把两种形态都纳入正向闭包。 |

实现备注：单位自身声明技能、被动、武器、Behavior 和升级后替换关系；科技建筑只触发研究，不在科技建筑内部判断所有兵种 if/else。

## 04. 初始化基地与特殊建筑

Owner：`CommanderBaseInitProfile`、`CommanderOpeningLoadoutProfile`、`CommanderSpecialStructureProfile`、`CommanderInitHookProfile`。

### 初始化建筑候选

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 黑暗圣坛 | `DarkShrine` | `DarkShrine` | Ground; Mechanical; Structure; FactionNerazim | 矿:150 气:150 人口:- 生命:500 护盾:500 能量:- | 为黑暗圣堂武士提供升级方案。 / 开启： / - 可以在传送门中折跃黑暗圣堂武士 / - 黑暗圣堂武士可以融合为执政官 |
| 传送门 | `Gateway` | `Gateway` | Ground; Mechanical; Structure; Melee | 矿:150 气:- 人口:- 生命:500 护盾:500 能量:- | 使星灵可以利用折跃技术召集地面单位。 / 开启： / - 狂热者 |
| 光子炮台 | `PhotonCannon` | `PhotonCannon, Zealot` | Ground; Mechanical; Structure; Melee | 矿:150 气:- 人口:- 生命:150 护盾:150 能量:- | 主力防御建筑。 / 可以对地和对空。 / 侦测单位 |
| 折跃机械台 | `RoboticsWarp` | `ZeratulRoboticsFacility, RoboticsFacilityWarp` | Ground; Armored/Mechanical/Structure; Structure; FactionXelNaga | 矿:200 气:100 人口:- 生命:450 护盾:450 能量:- | 建造萨尔纳加机械构造体。 / 开启： / - 萨尔纳加执行者 / - 萨尔纳加虚空阵列船 / - 萨尔纳加观察者 |

### 初始化/建造按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 传送门 | `WarpInSupplicant` | 折跃死徒 | `GatewayTrain,Train11` | - | 近战战士。在阿拉纳克濒临死亡时牺牲自己来为他治疗。死徒可以同时折跃两个。 / 可以对地。 |
| 传送门 | `SentryFenix` | 折跃保护者 | `GatewayTrain,Train15` | - | 净化者阵营 / 机械支援单位。可以使用防护场和相位模式。 / 可以对地和对空。 |
| 传送门 | `Stalker` | 折跃追猎者 | `GatewayTrain,Train2` | - | 远程支援型步战机甲。 / 可以对地和对空。 |
| 传送门 | `WarpInAdept` | 折跃使徒 | `GatewayTrain,Train7` | - | 远程特种单位。可以使用灵能传送。 / 可以对地。 |
| 传送门 | `DarkTemplar` | 折跃黑暗圣堂武士 | `GatewayTrain,Train5` | - | 致命的近战杀手，该单位永远处于隐形状态，敌人在不借助侦测单位帮助的情况下无法发现他。可以融合为执政官。 / 可以对地。 |
| 传送门 | `UpgradeToWarpGate` | 变形为折跃门 | `UpgradeToWarpGate,Execute` | - | 将传送门升级为折跃门，使星灵可以利用折跃技术将地面单位召集到任何有水晶塔或折跃棱镜能量覆盖的区域。 |
| 折跃机械台 | `ImmortalZeratul` | 折跃萨尔纳加执行者 | `ZeratulRoboticsFacilityTrain,Train6` | - | 步战机甲。可以使用屏障吸收伤害并击退敌方空中单位。 / 可以对空和对地。 |
| 折跃机械台 | `ZeratulWarpinDisruptor` | 折跃萨尔纳加禁绝者 | `ZeratulRoboticsFacilityTrain,Train7` | - | 机械干扰型单位。可以使用净化新星造成大量范围伤害。 / 可以对地。 |
| 折跃机械台 | `WarpInZeratulWarpPrism` | 折跃萨尔纳加虚空阵列船 | `ZeratulRoboticsFacilityTrain,Train5` | - | 飞行虫洞发生器。同一时间建造两个。可以部署后在萨尔纳加虚空阵列船之间生成数据链。 |
| 折跃机械台 | `ZeratulObserver` | 折跃萨尔纳加观察者 | `ZeratulRoboticsFacilityTrain,Train2` | - | 间谍型空中单位。敌人没有侦测手段将无法看到隐形单位。 / 侦测单位 |

实现备注：地图初始化只传 commander、出生点和场景语义；基地、工人、特殊建筑、初始科技和补给由本指挥官 initializer 自己组装。

## 05. 指挥官兵种

Owner：`CommanderRosterProfile`、`CommanderUnitFactoryProfile`、`CommanderUnitReplacementProfile`、`CommanderLevelStageRosterProfile`。

### 当前 units.json 兵种清单

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 萨尔纳加禁绝者 | `DisruptorZeratul` | `ZeratulDisruptor` | Ground; Armored/Mechanical; Unit; FactionXelNaga | 矿:450 气:450 人口:-3 生命:200 护盾:200 能量:- | 机械干扰型单位。可以使用净化新星造成大量范围性伤害。 / 可以对地。 |
| 萨尔纳加执行者 | `ImmortalZeratul` | `ZeratulImmortal` | Ground; Armored/Mechanical; Unit; FactionXelNaga | 矿:750 气:300 人口:-4 生命:400 护盾:200 能量:- | 步战机甲。可以使用屏障吸收伤害并击退敌方空中单位。 / 可以对空和对地。 |
| 官方侦测器槽位 | `Observer` | `ZeratulObserver` | Air; Light/Mechanical; Unit; FactionXelNaga | 矿:25 气:75 人口:-1 生命:40 护盾:20 能量:- | `Observer` 是官方/导出槽位；当前 Mod runtime 必须 alias 到私有 `ZeratulObserver`，不能直接创建通用 `Observer`。 |
| 萨尔纳加观察者 | `ObserverZeratul` | `ZeratulObserver` | Air; Light/Mechanical; Unit; FactionXelNaga | 矿:25 气:75 人口:-1 生命:40 护盾:20 能量:- | 间谍型空中单位。敌人没有侦测手段将无法看到隐形单位。 / 侦测单位 |
| 萨尔纳加观察者-监察模式 | `ZeratulObserverSiegeMode` | `ZeratulObserverSiegeMode` | Air; Light/Mechanical; Unit; FactionXelNaga | 同观察者形态 | 由 `ZeratulObserverMorphtoZeratulObserverSiege` 进入，再由 `ZeratulObserverSiegeMorphtoZeratulObserver` 回变；这是私有形态闭包。 |
| 萨尔纳加光盾卫士 | `SentryZeratul` | `ZeratulSentry` | Ground; Light/Mechanical/Psionic; Unit; FactionXelNaga | 矿:75 气:150 人口:-2 生命:120 护盾:120 能量:200 | 机械支援单位。可以使用护盾充能与反射护盾。 / 可以对空和对地。 |
| 萨尔纳加伏击者 | `StalkerZeratul` | `ZeratulStalker` | Ground; Armored/Mechanical; Unit; FactionXelNaga | 矿:300 气:50 人口:-2 生命:100 护盾:100 能量:- | 远程支援型步战机甲。受到威胁时会自动使用预判闪现。 / 可以对空和对地。 |
| 萨尔纳加虚空阵列船 | `WarpPrismZeratul` | `ZeratulWarpPrism` | Air; Armored/Mechanical/Psionic; Unit; FactionXelNaga | 矿:150 气:- 人口:-1 生命:200 护盾:200 能量:- | 飞行虫洞发生器。同一时间建造两个。可以部署后在萨尔纳加虚空阵列船之间生成数据链。 |
| 萨尔纳加虚空阵列船-虫洞模式 | `ZeratulWarpPrismPhasing` | `ZeratulWarpPrismPhasing` | Air; Armored/Mechanical/Psionic; Unit; FactionXelNaga | 同虚空阵列船形态 | 由 `ZeratulPhasingMode` 进入，含 `ZeratulWarpPrismPhasingRegenAura` 护盾恢复光环；这是私有形态闭包。 |
| 狂热者 | `ZealotZeratul` | `ZeratulSummonZealot` | Ground; Biological/Light; Unit; FactionXelNaga | 矿:100 气:- 人口:- 生命:100 护盾:50 能量:- | - |

### roster 中未归入 units/buildings/heroes 的对象

| 名称 | Catalog ID | 解析 Unit | 属性 | 备注 |
|---|---|---|---|---|
| - | - | - | - | roster 中没有额外未分类对象。 |

口径：`units.json` 是官方 JSON 索引入口；当前 Mod 的 `power_fusion` runtime roster 以私有单位为准，已把 `Observer` 官方槽位映射到 `ZeratulObserver`，并显式加入 `ZeratulObserverSiegeMode`、`ZeratulWarpPrismPhasing`。满级之后兵种会变化，测试台默认使用 `power_fusion` 而不是基础 `initial`。

## 06. 指挥官精通

Owner：`CommanderMasteryProfile`、`CommanderMasteryOptionProfile`、`CommanderMasteryModifierProfile`。

### 六项精通 30 点口径

| 组 | 精通 | Upgrade | 每点增量 | 30 点结果 | 说明 |
|---|---|---|---|---|---|
| 1 | 泽拉图攻击速度 | `MasteryZeratulZeratulAttackSpeed` | `1.5` | +45% | - |
| 1 | 战斗单位攻击速度 | `MasteryZeratulCombatUnitAttackSpeed` | `0.5` | +15% | - |
| 2 | 神器碎片刷新速度 | `MasteryZeratulArtifactFragmentSpawnRate` | `2` | -60秒 | - |
| 2 | 支援力量冷却时间缩减 | `MasteryZeratulSupportCalldownCooldownReduction` | `1` | -30% | - |
| 3 | 传奇军团费用 | `MasteryZeratulLegendaryLegionCost` | `1` | -30% | - |
| 3 | 化身冷却时间 | `MasteryZeratulAvatarCooldown` | `4` | -120秒 | - |

实现备注：当前默认六项精通全 30 点，不再做官方互斥取舍；若同一字段被多个精通/威望改写，必须进入 `CommanderModifierStackProfile` 明确叠加顺序。

## 07. 指挥官建筑

Owner：`CommanderBuildingProfile`、`CommanderBuildingAbilityProfile`、`CommanderBuildingReplacementProfile`。

### 当前 buildings.json 建筑清单

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 黑暗圣坛 | `DarkShrine` | `DarkShrine` | Ground; Mechanical; Structure; FactionNerazim | 矿:150 气:150 人口:- 生命:500 护盾:500 能量:- | 为黑暗圣堂武士提供升级方案。 / 开启： / - 可以在传送门中折跃黑暗圣堂武士 / - 黑暗圣堂武士可以融合为执政官 |
| 传送门 | `Gateway` | `Gateway` | Ground; Mechanical; Structure; Melee | 矿:150 气:- 人口:- 生命:500 护盾:500 能量:- | 使星灵可以利用折跃技术召集地面单位。 / 开启： / - 狂热者 |
| 光子炮台 | `PhotonCannon` | `PhotonCannon, Zealot` | Ground; Mechanical; Structure; Melee | 矿:150 气:- 人口:- 生命:150 护盾:150 能量:- | 主力防御建筑。 / 可以对地和对空。 / 侦测单位 |
| 折跃机械台 | `RoboticsWarp` | `ZeratulRoboticsFacility, RoboticsFacilityWarp` | Ground; Armored/Mechanical/Structure; Structure; FactionXelNaga | 矿:200 气:100 人口:- 生命:450 护盾:450 能量:- | 建造萨尔纳加机械构造体。 / 开启： / - 萨尔纳加执行者 / - 萨尔纳加虚空阵列船 / - 萨尔纳加观察者 |

### 建筑按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 黑暗圣坛 | `ResearchShadowFury` | 研究暗影之怒 | `DarkShrineResearch,Research1` | - | 使黑暗圣堂武士在目标之间腾跃，每次腾跃造成{Effect,DarkTemplarShadowFuryDamage,Amount} (+{Effect,DarkTemplarShadowFuryDamage,AttributeBonus[Light]} 对轻甲)点伤害。攻击{... |
| 黑暗圣坛 | `ResearchShadowDashLocked` | 研究闪现 | - | `VorazunLevel06` | 该科技将在指挥官等级6时解锁。 |
| 黑暗圣坛 | `ResearchVoidStasisLocked` | 研究虚空静滞 | - | `VorazunLevel06` | 该科技将在指挥官等级6时解锁。 |
| 黑暗圣坛 | `ResearchDarkArchonFullStartingEnergyLocked` | 研究阿古斯水晶 | - | `VorazunLevel09` | 该科技将在指挥官等级9时解锁。 |
| 黑暗圣坛 | `ResearchMindControlLocked` | 研究精神控制 | - | `VorazunLevel09` | 该科技将在指挥官等级9时解锁。 |
| 黑暗圣坛 | `DarkTemplarPassive` | DarkTemplarPassive | - | - | - |
| 黑暗圣坛 | `DarkArchonPassive` | DarkArchonPassive | - | `HaveVorazunCommander` | - |
| 黑暗圣坛 | `ZeratulDarkTemplarBlink` | 闪现 | - | `HaveZeratulArtifactTier1AndDarkShine` | 使虚空圣堂武士可以传送至附近一处目标位置。 |
| 黑暗圣坛 | `ResearchZeratulZealotBlinkHeal` | - | - | `HaveZeratulArtifactTier2AndDarkShine` | - |
| 黑暗圣坛 | `ResearchZeratulDarkTemplarShadowFury` | - | - | `HaveZeratulArtifactTier3AndDarkShine` | - |
| 传送门 | `WarpInSupplicant` | 折跃死徒 | `GatewayTrain,Train11` | - | 近战战士。在阿拉纳克濒临死亡时牺牲自己来为他治疗。死徒可以同时折跃两个。 / 可以对地。 |
| 传送门 | `SentryFenix` | 折跃保护者 | `GatewayTrain,Train15` | - | 净化者阵营 / 机械支援单位。可以使用防护场和相位模式。 / 可以对地和对空。 |
| 传送门 | `Stalker` | 折跃追猎者 | `GatewayTrain,Train2` | - | 远程支援型步战机甲。 / 可以对地和对空。 |
| 传送门 | `WarpInAdept` | 折跃使徒 | `GatewayTrain,Train7` | - | 远程特种单位。可以使用灵能传送。 / 可以对地。 |
| 传送门 | `WarpinAscendentLocked` | 折跃晋升者 | - | `AlarakLevel08` | 该单位将在指挥官等级8时解锁。 |
| 传送门 | `DarkTemplar` | 折跃黑暗圣堂武士 | `GatewayTrain,Train5` | - | 致命的近战杀手，该单位永远处于隐形状态，敌人在不借助侦测单位帮助的情况下无法发现他。可以融合为执政官。 / 可以对地。 |
| 传送门 | `WarpInDarkArchonLocked` | 折跃黑暗执政官 | - | `VorazunLevel05` | 该技能将在指挥官等级5时解锁。 |
| 传送门 | `UpgradeToWarpGate` | 变形为折跃门 | `UpgradeToWarpGate,Execute` | - | 将传送门升级为折跃门，使星灵可以利用折跃技术将地面单位召集到任何有水晶塔或折跃棱镜能量覆盖的区域。 |
| 传送门 | `AlarakMasteryUnitAttackSpeed` | 战斗精通 | - | `HaveMasteryAlarakUnitAttackSpeed` | 精通：折跃在该建筑旁边的单位获得{Effect,MasteryAlarakUnitAttackSpeedDisplayDummy,Amount}%攻击速度。 |
| 传送门 | `-` | - | `que5notPassive,CancelLast` | - | - |
| 光子炮台 | `KaraxTurretRange` | 强化瞄准 | - | `HaveKaraxTurretRange` | 防御性建筑的射程提高2。 |
| 光子炮台 | `KaraxTurretAttackSpeed` | 军械优化 | - | `HaveKaraxTurretAttackSpeed` | 防御性建筑的攻击速度提高25%。 |
| 光子炮台 | `Detector` | 侦测单位 | - | `NotUnderConstruction` | 该单位能够侦测到隐形、潜地和幻像单位。 |
| 折跃机械台 | `ImmortalZeratul` | 折跃萨尔纳加执行者 | `ZeratulRoboticsFacilityTrain,Train6` | - | 步战机甲。可以使用屏障吸收伤害并击退敌方空中单位。 / 可以对空和对地。 |
| 折跃机械台 | `ZeratulWarpinDisruptor` | 折跃萨尔纳加禁绝者 | `ZeratulRoboticsFacilityTrain,Train7` | - | 机械干扰型单位。可以使用净化新星造成大量范围伤害。 / 可以对地。 |
| 折跃机械台 | `WarpInZeratulWarpPrism` | 折跃萨尔纳加虚空阵列船 | `ZeratulRoboticsFacilityTrain,Train5` | - | 飞行虫洞发生器。同一时间建造两个。可以部署后在萨尔纳加虚空阵列船之间生成数据链。 |
| 折跃机械台 | `ZeratulObserver` | 折跃萨尔纳加观察者 | `ZeratulRoboticsFacilityTrain,Train2` | - | 间谍型空中单位。敌人没有侦测手段将无法看到隐形单位。 / 侦测单位 |
| 折跃机械台 | `ZeratulChronometry` | 时空理论 | - | - | 被该建筑折跃的单位其建造时间缩短了。 |
| 折跃机械台 | `ZeratulMasteryCombatMastery` | 战斗精通 | - | `HaveMasteryZeratulCombatUnitAttackSpeed` | 精通：通过该建筑部署的单位获得{Effect,MasteryZeratulCombatUnitAttackSpeedDisplayDummy,Amount}%攻击速度。 |

实现备注：建筑自己的技能、生产队列、变形、起飞/降落、特殊自动施法由建筑 profile 声明；地图和科技建筑不持有跨指挥官判断。

## 08. 科技建筑及其升级选项

Owner：`CommanderTechBuildingProfile`、`CommanderTechOptionProfile`、`CommanderUpgradeEffectProfile`。

### 15 级解锁与研究命令

| 等级 | 名称 | 解锁升级 | 解锁 AbilityCmd | 说明 |
|---|---|---|---|---|
| 1 | 萨尔纳加之力 | `SOAAutoAssimilator`, `ZeratulArtifactTier0`, `SOAStrafeAttackUpgrade` | `RallyZeratulTopBarRedirect:` | 泽拉图有100点的起始补给单位数，并且其单位拥有更高的生命值和伤害。建筑不需要水晶塔，但是单位无法直接向战场折跃。泽拉图的古代星灵枢纽可以自动建造古代吸纳舱。 |
| 2 | 预言成真 | `ZeratulThirdArtifactUpgrade` | - | 解锁泽拉图寻找第三块神器碎片的能力。一旦找齐所有神器碎片，泽拉图将解锁以下能力： / 召唤灵能潜能的具象体——形体化身。召唤进化潜能的具象体——精华化身。 |
| 3 | 时空通道强化包1 | - | `ZeratulCalldownOdinTargeted:` | 找到第二块神器碎片后解锁下列时空通道级别的神器升级： / 使萨尔纳加伏击者在闪现后会留下一个虚空恶灵，制造一次攻击，造成200%武器伤害。使萨尔纳加光盾卫士的能量恢复提高100%。使虚空圣堂武士的闪现可对沿途单位造成50点伤害。使超维空间炮和超维空间巨石将自身投射到目标位置... |
| 4 | 新单位：萨尔纳加禁绝者 | - | `ZeratulBarracksTrain:4` | 机械干扰型单位。可以使用净化新星造成大量范围性伤害。在构造体设施中制造。 / 可以对地。 |
| 5 | 超维空间技术强化包 | - | `ZeratulEngineeringBayResearch:`, `ZeratulEngineeringBayResearch:1`, `ZeratulEngineeringBayResearch:2` | 解锁下列神器能力选项： / 在目标位置部署一座超维空间巨石。超维空间巨石可以击晕敌人，进行自我投射，并保护自己免受伤害。阴影投射的冷却时间减少25%，阴影屏障的技能可吸收的伤害量提高100%。 |
| 6 | 构造体强化包1 | - | `ZeratulFactoryTrain:3` | 找到第二块神器碎片后，解锁下列构造体级别的神器升级： / 使萨尔纳加执行者的对空武器可以击退敌方空中单位，并且对轰击路线沿途的单位造成25%伤害。萨尔纳加禁绝者的净化新星的冷却时间缩短50%。萨尔纳加观察者的移动速度提高50%。 |
| 7 | 虚空之路 | `ZeratulCoopHeroHalfCostUpgrade` | - | 解锁下列神器能力选项： / 召唤塞达斯及其传奇般的黑暗执政官军团支援战场。该军团无法被直接控制，但可以使用顶部技能条对其进行指引。召唤一枚无敌的虚空抑制晶体，降低敌方单位的移动和攻击速度，并瘫痪邻近的敌方建筑。泽拉图及其单位的闪现技能的冷却时间缩短50%。 |
| 8 | 超能军团 | - | `ZeratulFactoryTrain:1` | 找到第三块神器碎片后，传奇军团获得新的能力： / 特布鲁斯获得能量反蚀技能，可以抽取敌方单位的能量。特布鲁斯的狂热者军团获得冲锋技能，使他们可以拦截敌方地面单位。佐拉亚和她的虚空辉光舰军团获得棱镜射程技能，其武器射程随着攻击时间的延长而增加。塞达斯和他的黑暗执政官获得灵能漩... |
| 9 | 新单位：萨尔纳加虚空阵列船 | `ZeratulCoopMedivacChargesUpgrade` | - | 飞行虫洞发生器。同一时间建造两个。可以部署后在萨尔纳加虚空阵列船之间生成数据链。 |
| 10 | 时空理论 | `ZeratulTalentQuickBuild` | `ZeratulBarracksTrain:2` | 使萨尔纳加时空通道和构造体设施中生产单位的建造时间缩短50%。 |
| 11 | 时空通道强化包2 | `ZeratulCoopEquipmentCostUpgrade`, `BacktotheShadows` | - | 找到三块神器碎片后，解锁下列时空通道级别的神器升级： / 使萨尔纳加伏击者可以储存最多3层预判闪现充能，并且每8秒重新获得一层充能。使萨尔纳加光盾卫士可以制造一道4.5射程的光环，将50%的投射物反射给敌方攻击者。当虚空圣堂武士受到致命伤害时，它将回撤至虚空并开始恢复生命值... |
| 12 | 黑暗代理 | `ZeratulSupportMechanicsUpgrade` | `ZeratulHeroResearch2:15`, `ZeratulHeroResearch2:17`, `ZeratulHeroResearch:11`, `ZeratulHeroResearch2:7`, `ZeratulHeroResearch2:11` | 将萨尔纳加光盾卫士的补给消耗减少至1。将一对萨尔纳加虚空阵列船的补给消耗减少至1。将萨尔纳加观察者的补给消耗降低至0。 |
| 13 | 构造体强化包2 | - | `ZeratulOdinPlatformResearch:1` | 找到第三块神器碎片后，解锁下列构造体级别的神器升级： / 萨尔纳加执行者的屏障吸收伤害量提高300%。当屏障激活时，萨尔纳加执行者破损的机体外壳会被完全修复。当萨尔纳加禁绝者的净化新星爆炸时，它会产生三个更小的新星，每一个对沿途的敌人造成50点伤害。虫洞模式下的萨尔纳加虚空... |
| 14 | 纯粹完美 | `ZeratulTalentUltimatePurity` | `ZeratulHeroResearch:3`, `ZeratulHeroResearch2:20`, `ZeratulHeroResearch:7`, `ZeratulHeroResearch2:2` | 形体化身获得一项能力，可以召唤能独自施放微型灵能风暴的充能水晶。精华化身获得一项能力，可以将一个大范围内的所有敌人变形成更低一级的进化形态。 |
| 15 | 纯粹意志 | - | `ZeratulEngineeringBayResearch:11`, `ZeratulEngineeringBayResearch:12`, `ZeratulEngineeringBayResearch:6`, `ZeratulEngineeringBayResearch:7` | 泽拉图每找到一块神器碎片，就会获得额外的护盾、暗影顺劈伤害提高以及额外的闪现使用次数。 |

### Upgrade 摘要

| Upgrade | 父级 | 显示名 | Effect数 | 说明 |
|---|---|---|---|---|
| `BacktotheShadows` | `-` | 撤回阴影 | 0 | - |
| `CommanderPrestigeZeratulArtifactFragments` | `CommanderPrestige` | 知识探求者 | 13 | 优点 / 泽拉图可以收集的神器碎片没有数量上限。 / 缺点 / 泽拉图的战斗单位消耗提高25%。 |
| `CommanderPrestigeZeratulTornadoes` | `CommanderPrestige` | 虚空先驱 | 1 | 优点 / 每收集一个神器碎片都会使泽拉图的暗影顺劈冷却时间缩短5秒。暗影顺劈生成一个龙卷风，可以对敌方单位造成伤害并使其减速。 / 缺点 / 泽拉图只能收集最多2个神器碎片。 |
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
| 黑暗圣坛 | `ResearchShadowFury` | 研究暗影之怒 | `DarkShrineResearch,Research1` | - | 使黑暗圣堂武士在目标之间腾跃，每次腾跃造成{Effect,DarkTemplarShadowFuryDamage,Amount} (+{Effect,DarkTemplarShadowFuryDamage,AttributeBonus[Light]} 对轻甲)点伤害。攻击{... |
| 黑暗圣坛 | `ResearchShadowDashLocked` | 研究闪现 | - | `VorazunLevel06` | 该科技将在指挥官等级6时解锁。 |
| 黑暗圣坛 | `ResearchVoidStasisLocked` | 研究虚空静滞 | - | `VorazunLevel06` | 该科技将在指挥官等级6时解锁。 |
| 黑暗圣坛 | `ResearchDarkArchonFullStartingEnergyLocked` | 研究阿古斯水晶 | - | `VorazunLevel09` | 该科技将在指挥官等级9时解锁。 |
| 黑暗圣坛 | `ResearchMindControlLocked` | 研究精神控制 | - | `VorazunLevel09` | 该科技将在指挥官等级9时解锁。 |
| 黑暗圣坛 | `ResearchZeratulZealotBlinkHeal` | - | - | `HaveZeratulArtifactTier2AndDarkShine` | - |
| 黑暗圣坛 | `ResearchZeratulDarkTemplarShadowFury` | - | - | `HaveZeratulArtifactTier3AndDarkShine` | - |
| 萨尔纳加禁绝者 | `ZeratulPurificationNovaBattery` | 新星电池 | - | `HaveZeratulArtifactTier2AndRoboticsBay` | 净化新星的冷却时间缩短{(Abil,ZeratulPurificationNovaTargeted,Cost[0].Cooldown.TimeUse-$UpgradeEffectArrayValue:ZeratulArtifactTier2_RoboticsBay:Weap... |
| 萨尔纳加禁绝者 | `ZeratulPurificationNovaSplit` | 集束新星 | `ZeratulPurificationNovaTargeted,Execute` | `HaveZeratulArtifactTier3AndRoboticsBay` | 当净化新星爆炸时，它会产生三个更小的新星，每一个对沿途的敌人造成{Effect,ZeratulPurificationNovaSmallOrbSearchImpactDamage,Amount}点伤害。 |
| 传送门 | `UpgradeToWarpGate` | 变形为折跃门 | `UpgradeToWarpGate,Execute` | - | 将传送门升级为折跃门，使星灵可以利用折跃技术将地面单位召集到任何有水晶塔或折跃棱镜能量覆盖的区域。 |
| 萨尔纳加执行者 | `ZeratulImmortalBarrierPassive` | 屏障 | - | `HaveZeratulArtifactTier1AndRoboticsBay` | 使该单位可以吸收{Behavior,ImmortalBarrierBase,DamageResponse.ModifyLimit}点伤害。持续{Behavior,ImmortalBarrierBase,Duration}秒。 |
| 萨尔纳加执行者 | `HaveZeratulImmortalRange` | 原力炮 | - | `HaveZeratulArtifactTier2AndRoboticsBay` | 该单位的对空武器可以击退敌方空中单位，并且对轰击路线沿途的单位造成{Effect,ZeratulPhaseDisruptorsAir,AreaArray[0].Fraction*100}%伤害。 |
| 萨尔纳加执行者 | `HaveZeratulImmortalImprovedBarrier` | 永恒屏障 | - | `HaveZeratulArtifactTier3AndRoboticsBay` | 萨尔纳加执行者屏障吸收的伤害量提高{$UpgradeEffectArrayValue:ZeratulArtifactTier3_RoboticsBay:Behavior,ImmortalBarrierBase,DamageResponse.ModifyLimit$/Beha... |
| 萨尔纳加观察者 | `ZeratulGraviticBoostersPassive` | 重力加速器 | - | `HaveZeratulArtifactTier2AndRoboticsBay` | 萨尔纳加观察者的移动速度提高{$UpgradeEffectArrayValue:ZeratulArtifactTier2_RoboticsBay:Unit,ZeratulObserver,Speed$/Unit,ZeratulObserver,Speed*100}% |
| 萨尔纳加观察者 | `ZeratulObserverSightRange` | 感应器阵列 | - | `HaveZeratulArtifactTier3AndRoboticsBay` | 萨尔纳加观察者的视野范围扩大{$UpgradeEffectArrayValue:ZeratulArtifactTier3_RoboticsBay:Unit,ZeratulObserver,Sight$/Unit,ZeratulObserver,Sight*100}%。 |
| 萨尔纳加光盾卫士 | `ZeratulShieldRechargePassive` | 护盾充能 | - | `HaveZeratulArtifactTier1AndCyberCore` | 使该单位可以给友方星灵单位的护盾进行充能。 |
| 萨尔纳加光盾卫士 | `ZeratulSentryEnergyRegen` | 星蚀协议 | - | `HaveZeratulArtifactTier2AndCyberCore` | 该单位的能量恢复提高{$UpgradeEffectArrayValue:ZeratulArtifactTier2_CyberneticsCore:Unit,ZeratulSentry,EnergyRegenRate$/Unit,ZeratulSentry,EnergyReg... |
| 萨尔纳加光盾卫士 | `ZeratulReflectionShieldPassive` | 反射护盾 | - | `HaveZeratulArtifactTier3AndCyberCore` | 使该单位可以制造一道光环，将{Effect,ZeratulReflectionShieldApplyBehavior,Chance*100}%投射物反射给敌方攻击者。 |
| 萨尔纳加伏击者 | `PredictiveBlinkPassive` | 预判闪现 | - | `HaveZeratulArtifactTier1AndCyberCore` | 使该单位可以传送到附近一处目标点。萨尔纳加伏击者一旦机体受到损坏就会自动闪现至安全位置。 |
| 萨尔纳加伏击者 | `ZeratulStalkerGhost` | 虚空复仇 | - | `HaveZeratulArtifactTier2AndCyberCore` | 闪现后会留下一个虚空恶灵，制造一次攻击，造成该单位{Effect,ZeratulStalkerGhostDamage,Amount/Effect,ZeratulParticleDisruptorsU,Amount*100}%武器伤害。该效果每{Behavior,Zeratu... |
| 萨尔纳加伏击者 | `ZeratulStalkerBlinkCharges` | 相位电池 | - | `HaveZeratulArtifactTier3AndCyberCore` | 该单位现在可以储存最多{$UpgradeEffectArrayValue:ZeratulArtifactTier3_CyberneticsCore:Abil,ZeratulStalkerBlink,Cost[0].Charge.CountStart$}层预判闪现充能，并且每... |

实现备注：科技建筑只负责展示/触发研究；每个单位升级效果由对应 `CommanderUnitTechProfile` 或 `CommanderUpgradeEffectProfile` 声明。

## 09. 特定地图运输机空投单位

Owner：`CommanderCargoLoadoutProfile`、`CommanderMapDropProfile`、`CommanderScenarioFallbackProfile`。

### 原始mod 已有实现线索

| 范围 | 文件 | 已有实现 | 含义 | 迁移状态 |
|---|---|---|---|---|
| 通用 | `原始mod/Mods/XM/XMCore.SC2Mod/Base.SC2Data/Lib67C0F0E7.galaxy` | SOAStickyPoint、SOAStickyLine、AddCasterGroup、DropPodT、DropPodZ、DropCargoAndExit | 已有顶部技能点选、隐藏施法者分组、空投舱视觉和卸载后撤离的通用基础。 | 应抽成 XMFinal 的通用投送 primitive。 |
| 通用 | `原始mod/Mods/XM/XMCore.SC2Mod/Base.SC2Data/GameData/UserData.xml` | SOAStickyPoint UserData: AbilityPre、AbilityFin、CasterUnit | 顶栏点目标技能已经有数据驱动配置位。 | 可复用为运输/空投顶部技能的配置入口。 |
| 通用 | `原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/AbilData.xml` | SpecOpsDropshipTransport | XMFinal 已经持有特种运输机运输能力定义。 | 运行时 owner 优先沿用并参数化。 |
| 通用 | `原始mod/Maps/XM/thanson01、ttychus01、ttychus04` | ColonyShipTransport、SpecialOpsDropship、UnitCargoCreate、卸载后返航/消失 | 地图侧已有运输机货舱、卸载、返航和剧情运输模式。 | 地图保留场景语义，单位组合改由 profile 解析。 |
| 通用 | `原始mod/Maps/XM/thorner04.SC2Map/MapScript.galaxy` | gf_DropKillTeamViaHercules 创建 Hercules、UnitCargoCreate 塞兵、卸货后攻击 | 已有可复用的大力神空投执行器，但主要服务敌方/剧情 kill team。 | 可参考执行流程；不能直接当玩家指挥官 loadout 来源。 |
| 通用 | `原始mod 全局搜索` | 未命中 XM_CreateCommanderCargoSquad 或 CommanderCargoLoadoutProfile | 原始mod 只有素材和地图硬编码，没有现成的指挥官货舱配置框架。 | 本模块需要新建 profile/factory 抽象，不能照搬地图 if/else。 |

### 场景 loadout 设计草案

| ScenarioKind | 推荐单位 | 用途 | 设计说明 | 来源状态 |
|---|---|---|---|---|
| `cargo_light` | ZealotZeratul x6, StalkerZeratul x3 | 萨尔纳加前锋 | 狂热者和伏击者。 | 设计草案；需按原始mod地图流程和实机日志继续校验。 |
| `cargo_heavy` | ImmortalZeratul x2, DisruptorZeratul x2, SentryZeratul x2 | 神器科技攻坚 | 执行者、禁绝者和光盾卫士。 | 设计草案；需按原始mod地图流程和实机日志继续校验。 |
| `cargo_air` | WarpPrismZeratul x1, ObserverZeratul x1, StalkerZeratul x4 | 虚空阵列投送 | 泽拉图空中场景以虚空阵列船投送地面单位。 | 设计草案；需按原始mod地图流程和实机日志继续校验。 |
| `bonus_reward` | ImmortalZeratul x3, DisruptorZeratul x2 | 神器奖励 | 高科技单位只在奖励节点出现。 | 设计草案；需按原始mod地图流程和实机日志继续校验。 |
| `replacement_squad` | ZealotZeratul x8, SentryZeratul x2 | 神器阶段测试 | 用于验证神器碎片后的单位替换。 | 设计草案；需按原始mod地图流程和实机日志继续校验。 |

### 接入规则

- 本模块不再从 `command_cards.json` 的运输/空投按钮自动推导货舱单位，也不把 `units.json` 全量清单当成可投放单位。
- 地图只传入 `mapId`、`scenarioKind`、目标点和运输模式；单位组合由 `CommanderCargoLoadoutProfile` 根据当前 commander、15 级 `power_fusion` roster 和场景限制解析。
- `原始mod` 已有运输机、空投舱、狮鹫运输、医疗运输机、坑道/深挖或感染运输容器时，应优先保留它的流程语义，只把硬编码单位替换为 profile 查询结果。
- 英雄、首领、终极进化、战列巡航舰、航母等高价值单位默认只能用于 `bonus_reward` 或显式允许英雄的地图场景。
实现备注：`CommanderMapDropProfile` 负责把地图事件映射为 `scenarioKind`；`CommanderScenarioFallbackProfile` 负责缺项降级并输出 `[XM_DBG][WARN][CARGO_FALLBACK]`。

## 10. 指挥官特殊机制

Owner：`CommanderSpecialMechanicProfile`、`CommanderSpecialResourceProfile`、`CommanderSpecialMechanicHookProfile`、`CommanderSpecialMechanicUnitProfile`。

本指挥官重点：神器碎片、泽拉图英雄、传奇军团和预言者构造体。

### 特殊机制命中项

- 萨尔纳加之力 (ZeratulPHLevel1)
- 预言成真 (ZeratulPHLevel2)
- 时空通道强化包1 (ZeratulPHLevel3)
- 新单位：萨尔纳加禁绝者 (ZeratulPHLevel4)
- 超维空间技术强化包 (ZeratulPHLevel5)
- 构造体强化包1 (ZeratulPHLevel6)
- 虚空之路 (ZeratulPHLevel7)
- 超能军团 (ZeratulPHLevel8)
- 新单位：萨尔纳加虚空阵列船 (ZeratulPHLevel9)
- 时空理论 (ZeratulPHLevel10)
- 时空通道强化包2 (ZeratulPHLevel11)
- 黑暗代理 (ZeratulPHLevel12)
- 构造体强化包2 (ZeratulPHLevel13)
- 纯粹完美 (ZeratulPHLevel14)
- 纯粹意志 (ZeratulPHLevel15)

### 特殊机制 Upgrade 候选

- 知识探求者 (`CommanderPrestigeZeratulArtifactFragments`)
- 虚空先驱 (`CommanderPrestigeZeratulTornadoes`)
- CommanderPrestigeZeratulTornadoesShadowCleave1 (`CommanderPrestigeZeratulTornadoesShadowCleave1`)
- CommanderPrestigeZeratulTornadoesShadowCleave2 (`CommanderPrestigeZeratulTornadoesShadowCleave2`)
- 黎明使徒 (`CommanderPrestigeZeratulVoidSeeker`)
- 精通 泽拉图 神器碎片刷新率 (`MasteryZeratulArtifactFragmentSpawnRate`)
- 精通 泽拉图 化身冷却时间 (`MasteryZeratulAvatarCooldown`)
- 精通 泽拉图 战斗单位攻击速度 (`MasteryZeratulCombatUnitAttackSpeed`)
- 精通 泽拉图 传奇军团费用 (`MasteryZeratulLegendaryLegionCost`)
- 精通 泽拉图 召唤支援力量 冷却时间缩减 (`MasteryZeratulSupportCalldownCooldownReduction`)
- 精通 泽拉图 泽拉图攻击速度 (`MasteryZeratulZeratulAttackSpeed`)
- ZeratulArtifactTier0 (`ZeratulArtifactTier0`)
- 找到第一块萨尔纳加神器碎片 (`ZeratulArtifactTier1`)
- 找到第二块萨尔纳加神器碎片 (`ZeratulArtifactTier2`)
- 泽拉图 (`ZeratulCommander`)
- ZeratulCoopEquipmentCostUpgrade (`ZeratulCoopEquipmentCostUpgrade`)
- ZeratulCoopHeroHalfCostUpgrade (`ZeratulCoopHeroHalfCostUpgrade`)
- ZeratulCoopMedivacChargesUpgrade (`ZeratulCoopMedivacChargesUpgrade`)
- 泽拉图 支援力量技术升级 (`ZeratulSupportMechanicsUpgrade`)
- 泽拉图 天赋 快速建造 (`ZeratulTalentQuickBuild`)
- 还有 4 项，后续从源 JSON 继续展开。

### 特殊机制按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 黑暗圣坛 | `ResearchVoidStasisLocked` | 研究虚空静滞 | - | `VorazunLevel06` | 该科技将在指挥官等级6时解锁。 |
| 黑暗圣坛 | `ZeratulDarkTemplarBlink` | 闪现 | - | `HaveZeratulArtifactTier1AndDarkShine` | 使虚空圣堂武士可以传送至附近一处目标位置。 |
| 黑暗圣坛 | `ResearchZeratulZealotBlinkHeal` | - | - | `HaveZeratulArtifactTier2AndDarkShine` | - |
| 黑暗圣坛 | `ResearchZeratulDarkTemplarShadowFury` | - | - | `HaveZeratulArtifactTier3AndDarkShine` | - |
| 萨尔纳加禁绝者 | `AcquireMove` | 搜索移动 | `move,AcquireMove` | - | 命令选中的单位移至目标区域或跟随目标单位。进行搜索移动的单位不会与敌人交战。 |
| 萨尔纳加禁绝者 | `ZeratulPurificationNovaBattery` | 新星电池 | - | `HaveZeratulArtifactTier2AndRoboticsBay` | 净化新星的冷却时间缩短{(Abil,ZeratulPurificationNovaTargeted,Cost[0].Cooldown.TimeUse-$UpgradeEffectArrayValue:ZeratulArtifactTier2_RoboticsBay:Weap... |
| 萨尔纳加禁绝者 | `ZeratulPurificationNovaSplit` | 集束新星 | `ZeratulPurificationNovaTargeted,Execute` | `HaveZeratulArtifactTier3AndRoboticsBay` | 当净化新星爆炸时，它会产生三个更小的新星，每一个对沿途的敌人造成{Effect,ZeratulPurificationNovaSmallOrbSearchImpactDamage,Amount}点伤害。 |
| 萨尔纳加禁绝者 | `ZeratulPurificationNovaTargeted` | 净化新星 | `attack,Barrage` | - | 发射一团球形能量，触碰敌方单位时或在{Behavior,PurificationNovaTargettedTarget,Duration}秒后引爆，对附近的地面单位和建筑造成{Effect,ZeratulPurificationNovaDamage,Amount}点溅射伤害... |
| 萨尔纳加执行者 | `ZeratulImmortalBarrierPassive` | 屏障 | - | `HaveZeratulArtifactTier1AndRoboticsBay` | 使该单位可以吸收{Behavior,ImmortalBarrierBase,DamageResponse.ModifyLimit}点伤害。持续{Behavior,ImmortalBarrierBase,Duration}秒。 |
| 萨尔纳加执行者 | `HaveZeratulImmortalRange` | 原力炮 | - | `HaveZeratulArtifactTier2AndRoboticsBay` | 该单位的对空武器可以击退敌方空中单位，并且对轰击路线沿途的单位造成{Effect,ZeratulPhaseDisruptorsAir,AreaArray[0].Fraction*100}%伤害。 |
| 萨尔纳加执行者 | `HaveZeratulImmortalImprovedBarrier` | 永恒屏障 | - | `HaveZeratulArtifactTier3AndRoboticsBay` | 萨尔纳加执行者屏障吸收的伤害量提高{$UpgradeEffectArrayValue:ZeratulArtifactTier3_RoboticsBay:Behavior,ImmortalBarrierBase,DamageResponse.ModifyLimit$/Beha... |
| 萨尔纳加执行者 | `ImmortalBarrierBase` | - | `ZeratulImmortalBarrierBase,Execute` | - | 最多可吸收{Behavior,ImmortalBarrierBase,DamageResponse.ModifyLimit}点伤害，持续{Behavior,ImmortalBarrierBase,Duration}秒。 |
| 萨尔纳加观察者 | `AcquireMove` | 搜索移动 | `move,AcquireMove` | - | 命令选中的单位移至目标区域或跟随目标单位。进行搜索移动的单位不会与敌人交战。 |
| 萨尔纳加观察者 | `ZeratulGraviticBoostersPassive` | 重力加速器 | - | `HaveZeratulArtifactTier2AndRoboticsBay` | 萨尔纳加观察者的移动速度提高{$UpgradeEffectArrayValue:ZeratulArtifactTier2_RoboticsBay:Unit,ZeratulObserver,Speed$/Unit,ZeratulObserver,Speed*100}% |
| 萨尔纳加观察者 | `ZeratulObserverSightRange` | 感应器阵列 | - | `HaveZeratulArtifactTier3AndRoboticsBay` | 萨尔纳加观察者的视野范围扩大{$UpgradeEffectArrayValue:ZeratulArtifactTier3_RoboticsBay:Unit,ZeratulObserver,Sight$/Unit,ZeratulObserver,Sight*100}%。 |
| 萨尔纳加观察者 | `PermanentlyCloakedZeratulObserver` | 永久隐形 | - | - | 该萨尔纳加观察者处于永久隐形状态。 |
| 萨尔纳加观察者 | `MorphtoZeratulObserverSiege` | 监察模式 | `ZeratulObserverMorphtoZeratulObserverSiege,Execute` | - | 使萨尔纳加观察者变形，进入监察模式。观察者的视野扩大{Unit,ZeratulObserverSiegeMode,Sight/Unit,ZeratulObserver,Sight-1*100}%，但失去移动能力。 |
| 萨尔纳加观察者 | `Detector` | 侦测单位 | - | - | 该单位能够侦测到隐形、潜地和幻像单位。 |
| 折跃机械台 | `ImmortalZeratul` | 折跃萨尔纳加执行者 | `ZeratulRoboticsFacilityTrain,Train6` | - | 步战机甲。可以使用屏障吸收伤害并击退敌方空中单位。 / 可以对空和对地。 |
| 折跃机械台 | `ZeratulWarpinDisruptor` | 折跃萨尔纳加禁绝者 | `ZeratulRoboticsFacilityTrain,Train7` | - | 机械干扰型单位。可以使用净化新星造成大量范围伤害。 / 可以对地。 |
| 折跃机械台 | `WarpInZeratulWarpPrism` | 折跃萨尔纳加虚空阵列船 | `ZeratulRoboticsFacilityTrain,Train5` | - | 飞行虫洞发生器。同一时间建造两个。可以部署后在萨尔纳加虚空阵列船之间生成数据链。 |
| 折跃机械台 | `ZeratulObserver` | 折跃萨尔纳加观察者 | `ZeratulRoboticsFacilityTrain,Train2` | - | 间谍型空中单位。敌人没有侦测手段将无法看到隐形单位。 / 侦测单位 |
| 折跃机械台 | `ZeratulChronometry` | 时空理论 | - | - | 被该建筑折跃的单位其建造时间缩短了。 |
| 折跃机械台 | `ZeratulMasteryCombatMastery` | 战斗精通 | - | `HaveMasteryZeratulCombatUnitAttackSpeed` | 精通：通过该建筑部署的单位获得{Effect,MasteryZeratulCombatUnitAttackSpeedDisplayDummy,Amount}%攻击速度。 |
| 萨尔纳加光盾卫士 | `ZeratulShieldRechargePassive` | 护盾充能 | - | `HaveZeratulArtifactTier1AndCyberCore` | 使该单位可以给友方星灵单位的护盾进行充能。 |
| 萨尔纳加光盾卫士 | `ZeratulSentryEnergyRegen` | 星蚀协议 | - | `HaveZeratulArtifactTier2AndCyberCore` | 该单位的能量恢复提高{$UpgradeEffectArrayValue:ZeratulArtifactTier2_CyberneticsCore:Unit,ZeratulSentry,EnergyRegenRate$/Unit,ZeratulSentry,EnergyReg... |
| 萨尔纳加光盾卫士 | `ZeratulReflectionShieldPassive` | 反射护盾 | - | `HaveZeratulArtifactTier3AndCyberCore` | 使该单位可以制造一道光环，将{Effect,ZeratulReflectionShieldApplyBehavior,Chance*100}%投射物反射给敌方攻击者。 |
| 萨尔纳加光盾卫士 | `VoidSentryShieldRepair` | VoidSentryShieldRepair | `ZeratulSentryShieldRepair,Execute` | - | - |
| 萨尔纳加光盾卫士 | `ZeratulReflectionShield` | 反射护盾 | `ZeratulReflectionShield,Execute` | - | 制造一道光环，将{Effect,ZeratulReflectionShieldApplyBehavior,Chance*100}%的投射物反射给敌方攻击者。持续{Effect,ZeratulReflectionShieldCP,PeriodicPeriodArray[0]*... |
| 萨尔纳加伏击者 | `PredictiveBlinkPassive` | 预判闪现 | - | `HaveZeratulArtifactTier1AndCyberCore` | 使该单位可以传送到附近一处目标点。萨尔纳加伏击者一旦机体受到损坏就会自动闪现至安全位置。 |
| 萨尔纳加伏击者 | `ZeratulStalkerGhost` | 虚空复仇 | - | `HaveZeratulArtifactTier2AndCyberCore` | 闪现后会留下一个虚空恶灵，制造一次攻击，造成该单位{Effect,ZeratulStalkerGhostDamage,Amount/Effect,ZeratulParticleDisruptorsU,Amount*100}%武器伤害。该效果每{Behavior,Zeratu... |
| 萨尔纳加伏击者 | `ZeratulStalkerBlinkCharges` | 相位电池 | - | `HaveZeratulArtifactTier3AndCyberCore` | 该单位现在可以储存最多{$UpgradeEffectArrayValue:ZeratulArtifactTier3_CyberneticsCore:Abil,ZeratulStalkerBlink,Cost[0].Charge.CountStart$}层预判闪现充能，并且每... |
| 萨尔纳加伏击者 | `ZeratulStalkerShadowBlink` | 预判闪现 | `ZeratulStalkerBlink,Execute` | - | 将该单位传送到附近一处位置。 |
| 萨尔纳加虚空阵列船 | `AcquireMove` | 搜索移动 | `move,AcquireMove` | - | 命令选中的单位移至目标区域或跟随目标单位。进行搜索移动的单位不会与敌人交战。 |
| 萨尔纳加虚空阵列船 | `ZeratulWarpPrismWormholeMode` | 虫洞模式 | `ZeratulPhasingMode,Execute` | - | 命令萨尔纳加虚空阵列船变形成虫洞模式，使其可以在不同的虚空阵列船之间传输单位。该单位在该模式下无法移动。 |
| 萨尔纳加虚空阵列船 | `ZeratulWarpPrismSelectVoidRift` | 选择虫洞出口 | `ZeratulWarpPrismSelectVoidRift,Execute` | - | 选中当前处于自动卸载模式中的虚空阵列船。 |
| 狂热者 | `Charge` | 冲锋 | `ZeratulCharge,Execute` | - | 允许狂热者能拦截附近的敌人。同时还会提高狂热者的移动速度。该技能每{Abil,Charge,Cost.Cooldown.TimeUse}秒最多只能使用一次。 |
| 狂热者 | `VoidZealotWhirlwind` | - | `ZeratulZealotWhirlwind,Execute` | - | - |

实现备注：凡是涉及局内状态、资源、堆叠、全局计时器、隐藏 caster、英雄成长或召唤首领的机制，都必须有 runtime hook 和 `[XM_DBG]` 日志。

## 11. 指挥官个性化机制

Owner：`CommanderPersonalMechanicProfile`、`CommanderPersonalMechanicEffectProfile`、`CommanderPersonalMechanicHookProfile`、`CommanderPersonalMechanicRequirementProfile`。

本指挥官重点：神器碎片会动态改写单位、建筑和技能，需要分阶段 profile 和日志。

### 威望正向融合输入

| 威望 ID | 名称 | Primary Upgrade | 禁用单位 | 启用单位 | 禁用 Ability | 补充 Upgrade |
|---|---|---|---|---|---|---|
| `CommanderPrestigeZeratulVoidSeeker` | - | `CommanderPrestigeZeratulVoidSeeker` | - | - | - | - |
| `CommanderPrestigeZeratulArtifactFragments` | - | `CommanderPrestigeZeratulArtifactFragments` | - | - | - | - |
| `CommanderPrestigeZeratulTornadoes` | - | `CommanderPrestigeZeratulTornadoes` | - | - | - | `ZeratulTornadoes1`, `ZeratulTornadoes2` |

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
hero_ability_smoke
hero_mode_smoke
unit_ability_smoke
tech_smoke
cargo_smoke
special_mechanic_smoke
personal_mechanic_smoke
```

补充：需要排查官方基础差异时才跑 `initial_units`，不要把它当作默认玩法状态。英雄指挥官还要单独验证 `hero_smoke`、`hero_ability_smoke`、`hero_mode_smoke`。

## `[XM_DBG]` 日志建议

```text
[XM_DBG][INFO][COMMANDER_PROFILE_LOAD] commander=Zeratul levelMode=FullLevel15 masteryMode=AllSixMax rosterStage=power_fusion result=ok
[XM_DBG][INFO][POWER_FUSION_APPLY] commander=Zeratul levelMode=FullLevel15 masteryMode=AllSixMax prestigeMode=SelectedPositive result=ok
[XM_DBG][INFO][ROSTER_LOAD] commander=Zeratul stage=power_fusion official_json_units=8 buildings=4 official_json_heroes=0 runtime_heroes=1 hero=ZeratulCoop observer_alias=Observer->ZeratulObserver forms=ZeratulObserverSiegeMode,ZeratulWarpPrismPhasing result=ok
[XM_DBG][INFO][HERO_PROFILE_LOAD] commander=Zeratul official_json_heroes=0 runtime_heroes=1 hero=ZeratulCoop abilities=ZeratulBlink,ZeratulShadowCleave,ZeratulTeleport,ProphecyVision,CommanderPrestigeZeratulVoidSeeker result=ok
[XM_DBG][INFO][MODULE_VERIFY] commander=Zeratul module=<01-11> profile=<profile> result=ok
[XM_DBG][WARN][CASC_AUDIT_REQUIRED] commander=Zeratul module=<module> object=<object> result=needs-casc-audit
```

## 第一轮待审计项

- 顶部技能的 caster、按钮、冷却、充能、目标转发闭包；尤其神器碎片拾取、预言技能、面板状态不能写死玩家 1。
- 英雄 `ZeratulCoop` 的 Ability、Behavior、Weapon、Actor、Sound、复活/重生闭包；当前静态烟测已覆盖五个英雄技能 ID，仍需实机点击验证效果和冷却。
- `power_fusion` 最终 roster 与 `level15` roster 的新增、替换、变体关系；当前静态口径已把 `Observer -> ZeratulObserver`、`ZeratulObserverSiegeMode`、`ZeratulWarpPrismPhasing` 纳入正向 runtime。
- 6 项精通的真实作用对象和最终数值。
- 3 个威望的正面收益、负面代价、disable/suppress、费用/冷却/上限变化。
- 科技建筑研究按钮、Requirement、Upgrade effect 是否完整。
- 特殊机制、英雄成长和个性化机制是否需要 runtime hook。
