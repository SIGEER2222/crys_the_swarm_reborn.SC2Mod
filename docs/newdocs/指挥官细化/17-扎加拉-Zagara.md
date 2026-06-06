# 扎加拉（Zagara）指挥官细化

日期：2026-05-27

## 当前口径

本文件统一按满级 `power_fusion` 口径编写：正文只讨论满级指挥官的最终态，不再把 1 级与 15 级拆成两套玩法态；等级 1-15 只保留为解锁门槛和审计锚点。精通默认 6 项全部 30 点，三个威望按正收益融合展开，不直接启用官方 `PlayerPrestige`。`initial` 仅用于官方基础状态审计和差异对照，默认测试和玩法都看 `power_fusion` 最终状态。

本文件按 `docs/newdocs/模块拆分` 的 11 个模块整理 扎加拉。依据 `游戏数据/官方合作指挥官/commanders/Zagara/` 的当前 JSON 生成；具体 Ability、Behavior、Weapon、Actor、Effect、Requirement 闭包仍需继续追 `游戏数据/官方SC2原始文本镜像/` 或实机 `[XM_DBG]` 日志。

## 链路提醒

- `buildings.json` 只是扎加拉官方链路的摘要；`BanelingNest`、`ScourgeNest`、`BileLauncherZagara` 这些关键对象要继续看 raw XML 才能闭环。
- 扎加拉的稳定追法是 `Commander JSON + roster.json + raw XML`，不要只用 `units.json` 或 `buildings.json` 判断她的完整建筑/生产链。
- `Drone` 仍是通用工蜂，专属建筑入口主要挂在 `ZergBuild` 的特殊按钮上。
- 当前 Mod 已在 `XMZagara.SC2Mod` 覆盖 `CommanderAch/Zagara` 开局三件套为 `HatcheryZagara`、`DroneZagara`、`OverlordZagara`；runtime 入口由 `XMFinal` 的 `LibE0EAE146_ZagaraRuntime.galaxy` 创建 `CoopCasterZagara`，并在需要英雄时创建 `ZagaraVoidCoop` 作为主施法单位。
- 2026-06-04 当前 Mod 运行名册和关键生产输出已切到 Zagara 私有单位：`InfestedAbominationZagara`、`BanelingZagara`、`ZagaraCorruptor`、`ScourgeZagara`、`SwarmQueenZagara`、`ZerglingZagara`、`OverseerZagara`、`RoachZagara`、`HunterKillerZagara`、`HunterKillerBurrowedZagara`。`LarvaTrainZagara`、`LarvaTrainSwarmZagara`、`TrainQueenZagara`、`ZagaraVoidCoopBanelingSpawnerTrain`、`MorphToOverseerZagara` 输出均已抽查为私有 ID；其中免费爆虫/进化爆虫链使用 `BanelingZagara`、`HotSHunterZagara`、`HotSSplitterlingBigZagara`，避免进化条件触发后回到共享单位。
- 2026-06-04 效果链闭包补充：玩家正链 `ZagaraVoidCoopSpawnHunterKillersInitialSet -> ZagaraVoidCoopSpawnHunterKillersCU` 产出 `HunterKillerBurrowedZagara`，随后 `ZagaraHunterKillerUnburrow -> BurrowHunterKillerZagaraUp -> HunterKillerZagara` 出土；`ZagaraVoidCoopMassRoachDropCP -> ZagaraVoidCoopInfestedPodsCP -> ZagaraVoidCoopInfestedPodsImpactSet -> ZagaraVoidCoopInfestedPodsImpactCU` 产出 `RoachZagara`；`ZagaraVoidCoopAberrationBanelingIncubationCU`、`ZagaraVoidCoopAberrationSplitterlingIncubationCU`、`ZagaraVoidCoopCorruptorScourgeIncubationCU` 分别产出 `BanelingZagara`、`HotSSplitterlingBigZagara`、`ScourgeZagara`。
- `MutatorAmonZagaraInfestedPodsImpactCU` 和 `MutatorAmonZagaraSpawnHunterKillersCU` 仍是 Amon/mutator 链，当前不计入玩家扎加拉闭包；排查共享 `Roach` / `HunterKillerBurrowed` 命中时必须先区分 `ZagaraVoidCoop*` 玩家链和 `MutatorAmonZagara*` 敌方/突变链。
- `ZagaraVoidCoop` 是扎加拉英雄技能的真实 caster；`CoopCasterZagara` 只作为兼容/global caster shell 保留，不能反过来把英雄技能挂到它身上。

## 2026-06-06 当前 Mod 完善状态

- 结论：扎加拉静态闭包已接近完成，但仍需通过实机验证免费爆虫/分裂虫、英雄复活、面板施法和私有形态切换是否全部生效。
- 本轮修复目标：把 `K5TwoDrones`、`ZagaraCommander`、`CommanderPrestigeZagaraMaxSupply`、`ZagaraScourgeCount` 等会影响正向生产的升级引用，从公共 `LarvaTrain` / `LarvaTrainSwarm` / `Baneling` / `HotSSplitterlingBig` 切到 `LarvaTrainZagara` / `LarvaTrainSwarmZagara` / `BanelingZagara` / `HotSSplitterlingBigZagara`。
- 本轮修复目标：给 `ZerglingZagara` 显式挂载私有 `MorphZerglingToBanelingZagara`、`MorphZerglingToHunterZagara`、`MorphZerglingToSplitterlingZagara`，避免满级/进化后点击变异按钮仍走公共爆虫、猎手或分裂虫产物。
- 本轮修复目标：把 `ZagaraVoidCoopBurrowed`、`HotSHunterZagara`、`HotSSplitterlingBigZagara`、`OverseerSiegeModeZagara` 以及扎加拉私有经济/科技建筑补进 `XMFinal` runtime roster 和 smoke 检查，防止以后按钮可见但测试链没有覆盖。
- 不计入正链：`ZagaraVoidCoopNydusWorm`、敌方/突变链 `MutatorAmonZagara*`、以及只在公共 Catalog 中可见但没有扎加拉 grant/profile 路径的历史候选。
- 2026-06-06 补充：`XMFinal` 现已为扎加拉补上满级 runtime 闭包，直接发放 `CommanderLevel=16`、等级解锁升级、6 项精通 30 点和 3 个威望正收益补丁，同时用 tech filter 屏蔽公共 `Drone/Larva/Overlord/Hatchery/.../OverseerSiegeMode`，只放行 `XMZagara` 私有经济、科技、兵种、英雄形态和顶部能力。
- 2026-06-06 补充：`CommanderRuntimeRoster/Zagara` 已扩到 34 项，现覆盖 `QueenZagara`、`ExtractorZagara`、`SpawningPoolZagara`、`EvolutionChamberZagara`、`SpireZagara`、`BanelingNestZagara`、`ScourgeNestZagara`、`CoopCasterZagara`、`ZagaraReviveCocoon`、`RoachMassDropDummy` 等运行时正链对象；对应 `CommanderBuildings` smoke 也扩到 12 项私有建筑。
- 2026-06-06 校验结果：`scripts/sc2/validate-zagara-official-runtime.mjs`、`scripts/sc2/validate-zagara-private-opener.mjs`、`scripts/sc2/validate-private-commander-openers.mjs` 当前全部通过。
- 剩余风险：`CommanderPrestigeZagaraZagara` 在官方 raw 中分别修改 `LarvaTrainSwarmling` 与 `LarvaTrain` 两条产线，而当前私有实现已把跳虫正向产线折叠到 `LarvaTrainZagara,Train2`。现阶段校验只确认“本地没有再回退到公共产线”，尚未把这条威望价格改动拆成两条完全等价的私有实现，后续若实机发现 P3 下裂变虫/跳虫矿物价格异常，需要优先回查这里。

## 官方数据摘要

| 项 | 值 |
|---|---|
| CommanderId | `ZergZagara` |
| 中文名 | 扎加拉 |
| 默认升级 | `ZagaraCommander`, `K5TwoDrones`, `MasteryZagaraLarvaRatePassive` |
| 默认能力命令 | `ZagaraVoidCoopBanelingBarrage:`, `ZagaraVoidCoopMassFrenzy:`, `ZagaraVoidCoopSpawnHunterKillers:`, `ZergBuild:24`, `evolutionchamberrese... |
| 威望 ID | `CommanderPrestigeZagaraMaxSupply`, `CommanderPrestigeZagaraCorruptorsAberrations`, `CommanderPrestigeZagaraZagara` |
| heroes.json 数量 | 1 |
| roster.json 数量 | 9 |
| units.json 数量 | 6 |
| buildings.json 数量 | 2 |
| command_cards.json 对象数 | 8 |
| upgrades.json 数量 | 23 |
| other-tech-entries.json 数量 | 0 |
| source | `mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/userdata.xml` |

roster 样例：

```text
Aberration, Baneling, Corruptor, Scourge, SpineCrawler, SporeCrawler, SwarmQueen, Zergling, ZagaraVoidCoop
```

## 15 级解锁摘要

- 1: 无尽虫群
- 2: 感染空投
- 3: 幼虫注射
- 4: 爆蚊升级包
- 5: 新单位：胆汁喷射体
- 6: 跳虫升级包
- 7: 爆虫巢穴：哺育腔
- 8: 孕育爆虫和爆蚊
- 9: 进化腔升级包
- 10: 遮天蔽日
- 11: 爆虫巢穴升级包
- 12: 跳虫进化：裂变虫
- 13: 胆汁喷射体升级包
- 14: 爆虫进化：分裂虫
- 15: 虫母

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
| 默认能力 | - | ZagaraVoidCoopBanelingBarrage: | - | 来自 commander.json |
| 默认能力 | - | ZagaraVoidCoopMassFrenzy: | - | 来自 commander.json |
| 默认能力 | - | ZagaraVoidCoopSpawnHunterKillers: | - | 来自 commander.json |
| 默认能力 | - | ZergBuild:24 | - | 来自 commander.json |
| 默认能力 | - | evolutionchamberresearch:19 | - | 来自 commander.json |
| 默认能力 | - | evolutionchamberresearch:12 | - | 来自 commander.json |
| 默认能力 | - | evolutionchamberresearch:13 | - | 来自 commander.json |
| 默认能力 | - | evolutionchamberresearch:14 | - | 来自 commander.json |
| Lv2 感染空投 | 2 | ZagaraVoidCoopMassRoachDrop: | - | 扎加拉可以在地图上的任何位置空投有限时生命的蟑螂。空投囊在着陆时会造成伤害。 |
| Lv4 爆蚊升级包 | 4 | ScourgeNestResearch: | - | 在爆蚊巢穴中解锁新的研究项目： / 爆蚊死后会对小范围内造成相当于它们50%攻击力的伤害。变异爆蚊所需的高能瓦斯数量减少50点。 |
| Lv4 爆蚊升级包 | 4 | ScourgeNestResearch:1 | - | 在爆蚊巢穴中解锁新的研究项目： / 爆蚊死后会对小范围内造成相当于它们50%攻击力的伤害。变异爆蚊所需的高能瓦斯数量减少50点。 |
| Lv4 爆蚊升级包 | 4 | ScourgeDetonate: | - | 在爆蚊巢穴中解锁新的研究项目： / 爆蚊死后会对小范围内造成相当于它们50%攻击力的伤害。变异爆蚊所需的高能瓦斯数量减少50点。 |
| Lv6 跳虫升级包 | 6 | SpawningPoolResearch:2 | - | 在分裂池中解锁新的研究项目： / 跳虫最大生命值提高10点。跳虫的攻击会使目标的护甲值降低到0，持续10秒。 |
| Lv6 跳虫升级包 | 6 | SpawningPoolResearch:3 | - | 在分裂池中解锁新的研究项目： / 跳虫最大生命值提高10点。跳虫的攻击会使目标的护甲值降低到0，持续10秒。 |
| Lv9 进化腔升级包 | 9 | evolutionchamberresearch:22 | - | 在进化腔中解锁新的研究项目： / 扎加拉的攻击可造成范围伤害。溅射主目标附近的敌人。畸变体使位于他们下方的单位获得50%伤害减免。 |
| Lv9 进化腔升级包 | 9 | evolutionchamberresearch:9 | - | 在进化腔中解锁新的研究项目： / 扎加拉的攻击可造成范围伤害。溅射主目标附近的敌人。畸变体使位于他们下方的单位获得50%伤害减免。 |
| Lv11 爆虫巢穴升级包 | 11 | BanelingNestResearch:2 | - | 在爆虫巢穴中解锁新的研究项目： / 爆虫对主目标的伤害提高100%。溅射伤害保持原样。爆虫的溅射范围提高50%。 |
| Lv11 爆虫巢穴升级包 | 11 | BanelingNestResearch:3 | - | 在爆虫巢穴中解锁新的研究项目： / 爆虫对主目标的伤害提高100%。溅射伤害保持原样。爆虫的溅射范围提高50%。 |
| Lv13 胆汁喷射体升级包 | 13 | SpawningPoolResearch:4 | - | 在分裂池中解锁新的研究项目： / 提高胆汁喷射体的轰炸射程。减少胆汁喷射体的轰炸冷却时间。 |
| Lv13 胆汁喷射体升级包 | 13 | SpawningPoolResearch:5 | - | 在分裂池中解锁新的研究项目： / 提高胆汁喷射体的轰炸射程。减少胆汁喷射体的轰炸冷却时间。 |

### command card 命中

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| - | - | - | - | - | 暂无自动命中项。 |

实现备注：面板只注册 profile 和转发 caster，地图不得按 commander 写 if/else。精通和威望影响面板冷却、充能、费用时，由本模块接收最终 modifier。

## 02. 英雄单位及其技能

Owner：`CommanderHeroProfile`、`CommanderHeroModeProfile`、`CommanderHeroAbilityProfile`、`CommanderHeroSkillTreeProfile`、`CommanderHeroReviveProfile`、`CommanderHeroModifierProfile`。

### 英雄单位清单

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 扎加拉 | `ZagaraVoidCoop` | `ZagaraVoidCoop` | Ground; Biological/Heroic/Psionic; Hero; FactionEvolved | 矿:- 气:- 人口:- 生命:600 护盾:- 能量:200 | 扎加拉是凯瑞甘手下的第一批虫母之一。她拥有大量的能量，可以孵化特殊的异虫单位来攻击她的敌人。 |

### 英雄技能按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 扎加拉 | `ZagaraVoidCoopRelentlessSwarmer` | - | - | - | - |
| 扎加拉 | `VolatileNestLocked` | 哺育腔 | - | `ZagaraLevel07` | 该技能将在指挥官等级7时解锁。 |
| 扎加拉 | `MedusasBladesLocked` | 美杜莎之刃 | - | `ZagaraLevel09` | 该科技将在指挥官等级9时解锁。 |
| 扎加拉 | `CommanderPrestigeZagaraZagaraDeepTunnel` | 深槽虫道 | `CommanderPrestigeZagaraZagaraDeepTunnel,Execute` | - | 快速潜地前往目标位置。 |
| 扎加拉 | `ZagaraVoidCoopBanelingBarrage` | - | `ZagaraVoidCoopBanelingBarrage,Execute` | - | - |
| 扎加拉 | `ZagaraVoidCoopSpawnHunterKillers` | ZagaraVoidCoopSpawnHunterKillers | `ZagaraVoidCoopSpawnHunterKillers,Execute` | - | - |
| 扎加拉 | `ZagaraVoidCoopMassFrenzy` | 群体狂暴 | `ZagaraVoidCoopMassFrenzy,Execute` | - | 使地图上所有友方单位的攻击速度提高{(Behavior,ZagaraVoidCoopMassFrenzyTarget,Modification.AttackSpeedMultiplier - 1) * 100}%，移动速度提高{(Behavior,ZagaraVoidCoo... |
| 扎加拉 | `ZagaraVoidCoopMassRoachDropLocked` | 感染空投 | - | `ZagaraLevel02` | 该技能将在指挥官等级2时解锁。 |
| 扎加拉 | `BurrowDown` | 潜地 | `ZagaraVoidCoopBurrow,Execute` | - | 命令单位潜入地下。单位潜地后无法移动或攻击，但处于隐形状态。 |

### 英雄形态/模式候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 扎加拉 | `BurrowDown` | 潜地 | `ZagaraVoidCoopBurrow,Execute` | - | 命令单位潜入地下。单位潜地后无法移动或攻击，但处于隐形状态。 |

### 英雄相关等级解锁

| 等级 | 名称 | 升级 | AbilityCmd | 说明 |
|---|---|---|---|---|
| Lv1 | 无尽虫群 | - | - | 扎加拉的补给上限为100，但她的作战单位消耗更少的资源并可更快孵化。一次可孵化两只工蜂。虫后只占用1点人口补给。幼虫孵化速度提高。 |
| Lv2 | 感染空投 | - | `ZagaraVoidCoopMassRoachDrop:` | 扎加拉可以在地图上的任何位置空投有限时生命的蟑螂。空投囊在着陆时会造成伤害。 |
| Lv3 | 幼虫注射 | `QueenDoubleInjectLarva` | - | 虫后的孵化幼虫技能孵化的幼虫数量由4个提高到8个。 |
| Lv4 | 爆蚊升级包 | - | `ScourgeNestResearch:`, `ScourgeNestResearch:1`, `ScourgeDetonate:` | 在爆蚊巢穴中解锁新的研究项目： / 爆蚊死后会对小范围内造成相当于它们50%攻击力的伤害。变异爆蚊所需的高能瓦斯数量减少50点。 |
| Lv5 | 新单位：胆汁喷射体 | `ZagaraBileLaunchers` | - | 解锁将工蜂变异为胆汁喷射体的能力，这是一种可对地面和空中目标造成范围伤害的防御建筑。 |
| Lv6 | 跳虫升级包 | - | `SpawningPoolResearch:2`, `SpawningPoolResearch:3` | 在分裂池中解锁新的研究项目： / 跳虫最大生命值提高10点。跳虫的攻击会使目标的护甲值降低到0，持续10秒。 |
| Lv7 | 爆虫巢穴：哺育腔 | `ZagaraVoidCoopBanelingSpawner` | - | 爆虫巢穴会周期性地孵化免费的爆虫。 |
| Lv8 | 孕育爆虫和爆蚊 | `ZagaraVoidCoopAberrationBanelingIncubation` | - | 畸变体死亡时，它们的尸体上会孵化出2只爆虫。腐化者死亡时会孵化2只爆蚊。 |
| Lv9 | 进化腔升级包 | - | `evolutionchamberresearch:22`, `evolutionchamberresearch:9` | 在进化腔中解锁新的研究项目： / 扎加拉的攻击可造成范围伤害。溅射主目标附近的敌人。畸变体使位于他们下方的单位获得50%伤害减免。 |
| Lv10 | 遮天蔽日 | `ZagaraVoidCoopImprovedMassRoachDrop` | - | 感染空投所空投的蟑螂总量由10个提高到20个。 |
| Lv11 | 爆虫巢穴升级包 | - | `BanelingNestResearch:2`, `BanelingNestResearch:3` | 在爆虫巢穴中解锁新的研究项目： / 爆虫对主目标的伤害提高100%。溅射伤害保持原样。爆虫的溅射范围提高50%。 |
| Lv12 | 跳虫进化：裂变虫 | `CoopZerglingSwarmling` | - | 将扎加拉的跳虫升级为裂变虫变种。 / 迅捷的肉搏型生物。一次可孵化三个。几乎立即变异。可变异为爆虫。 / 可以对地。 |
| Lv13 | 胆汁喷射体升级包 | - | `SpawningPoolResearch:4`, `SpawningPoolResearch:5` | 在分裂池中解锁新的研究项目： / 提高胆汁喷射体的轰炸射程。减少胆汁喷射体的轰炸冷却时间。 |
| Lv14 | 爆虫进化：分裂虫 | `CoopBanelingSplitterling` | - | 将扎加拉的爆虫进化为分裂虫变种。 / 自毁型单位。死亡时能够造成小范围的伤害。在其死后分裂成若干个小单位。 / 可以对地。 |
| Lv15 | 虫母 | `ZagaraVoidCoopImprovedAbilities` | - | 扎加拉的爆虫冲锋和召唤屠猎者技能的能量消耗降低50%。 / 爆虫冲锋和召唤屠猎者的单位数量提高50%。 |

口径：heroes.json 已列出英雄条目，英雄单位、英雄技能和英雄形态都归本模块。

待审计：Hero Unit、Ability、Behavior、Weapon、Actor、Sound、复活/重生、能量/资源、形态切换和威望改写闭包。

当前 Mod 已静态验证：`tmp/commander-check-2026-06-04-raynor-zagara-depth4/commander-tech-tree-diagnostics.json` 中 `ZagaraVoidCoopSpawnHunterKillers` 展开到 `HunterKillerBurrowedZagara` 且 `in_current_commander_roster=true`；`ZagaraVoidCoopMassRoachDrop` 展开到 `RoachZagara` 且 `in_current_commander_roster=true`。后续若再补 Actor/Sound，应沿用这些私有 Unit ID，不要回退到共享 `Roach` 或 `HunterKillerBurrowed`。

## 03. 普通单位技能及其进化功能

Owner：`CommanderUnitAbilityProfile`、`CommanderUnitStatProfile`、`CommanderUnitEvolutionProfile`、`CommanderUnitBehaviorProfile`、`CommanderUnitWeaponProfile`。

### 单位技能按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 畸变体 | `AberrationProtectiveCover` | 肉身掩体 | - | `HaveAberrationArmorAura` | 使身下的单位获得{Behavior,AberrationArmorAuraTarget,DamageResponse.ModifyFraction*100}%伤害减免。 |
| 畸变体 | `AberrationBanelingIncubationLocked` | 爆虫孕育 | - | `ZagaraLevel08` | 该技能将在指挥官等级8时解锁。 |
| 爆虫 | `-` | - | - | - | - |
| 爆虫 | `Explode` | 爆炸 | `Explode,Execute` | - | 使爆虫在原地自爆，对附近的敌方单位和建筑造成伤害。 |
| 爆虫 | `EnableBuildingAttack` | 开启对建筑攻击 | `VolatileBurstBuilding,On` | - | 允许爆虫自动将建筑视为攻击目标。 / 爆虫可对建筑造成{Effect,VolatileBurstU2,Amount}点伤害值。 |
| 爆虫 | `HaveCentrificalHooks` | 环心镰钩 | - | `ZagaraHaveCentrificalHooks` | 提高爆虫的移动速度。 |
| 爆虫 | `BurrowDown` | 潜地 | `BurrowUltraliskDown,Execute` | - | 命令单位潜入地下。单位潜地后无法移动或攻击，但处于隐形状态。 |
| 爆虫 | `BurrowUp` | 出地 | `BurrowUltraliskUp,Execute` | - | 命令单位钻回地表。 |
| 爆虫 | `-` | - | `Explode,Execute` | - | - |
| 腐化者 | `CorruptionAbility` | 腐化 | `Corruption,Execute` | - | 用异虫黏液覆盖目标敌方单位，使其受到的伤害提高{Behavior,Corruption,DamageResponse.ModifyFraction*100-100}%，持续{Behavior,Corruption,Duration}秒。 |
| 腐化者 | `BroodLord` | 变异为巢虫领主 | `MorphToBroodLord,Execute` | - | 大型飞行作战生物。通过投射出的巢虫来攻击目标。巢虫是一种可以对地的小型生物。 / 可以对地。 |
| 腐化者 | `CausticSpray` | 腐蚀喷液 | `CausticSpray,Execute` | - | 喷出一股强酸，每秒造成{Effect,CausticLevel1Damage,Amount/Effect,CausticSprayLevel1Persistent,PeriodicPeriodArray[0]}点伤害，持续{Effect,CausticSprayLevel1... |
| 爆蚊 | `ScourgeSplashDamagePassive` | 剧毒孢子 | - | `HaveScourgeSplashDamage` | 爆蚊在死亡时在小范围内造成相当于它们攻击伤害一半的伤害。 |
| 爆蚊 | `DetonateScourge` | 引爆 | `ScourgeDetonate,Execute` | - | 爆蚊轰炸当前区域，并对附近的敌方空军造成伤害。 |
| 爆蚊 | `DisableBuildingAttackScourge` | 关闭对建筑攻击 | `SuicideBuilding,Off` | - | 阻止爆蚊自动将建筑视为攻击目标。爆蚊仍会接受明确的攻击建筑指令。 |
| 爆蚊 | `HaveScourgeGasCostReduction` | 简化基因组 | - | `HaveScourgeGasCostReduction` | 变异爆蚊所需消耗的高能瓦斯量减少50。 |
| 跳虫 | `-` | - | - | `HaveMPMetabolicBoost` | - |
| 跳虫 | `-` | - | - | - | - |
| 跳虫 | `ZerglingArmorShred` | 切割利爪 | - | `HaveZerglingArmorShred` | 跳虫的攻击会使目标的护甲降低到0，持续{Behavior,ZerglingArmorShredTarget,Duration}秒。 |
| 跳虫 | `ZagaraVoidCoopZerglingDodge` | 闪避 | - | `HaveMasteryZagaraZerglingDodgeChance` | 跳虫有{Effect,MasteryZagaraZerglingDodgeChanceDisplayDummy,Amount}%的几率躲避一次攻击。 |
| 跳虫 | `-` | - | - | `HaveMPAdrenalGlands` | - |
| 跳虫 | `Baneling` | 变异为爆虫 | `MorphZerglingToBaneling,Train1` | - | 自毁型单位。爆炸时能够造成小范围的伤害。 / 可以对地。 |
| 跳虫 | `BurrowDown` | 潜地 | `BurrowUltraliskDown,Execute` | - | 命令单位潜入地下。单位潜地后无法移动或攻击，但处于隐形状态。 |
| 跳虫 | `BurrowUp` | 出地 | `BurrowUltraliskUp,Execute` | - | 命令单位钻回地表。 |
| 跳虫 | `-` | - | `MorphToBaneling,Execute` | - | - |

### 进化/形态/切换候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 爆虫 | `BurrowDown` | 潜地 | `BurrowUltraliskDown,Execute` | - | 命令单位潜入地下。单位潜地后无法移动或攻击，但处于隐形状态。 |
| 爆虫 | `BurrowUp` | 出地 | `BurrowUltraliskUp,Execute` | - | 命令单位钻回地表。 |
| 腐化者 | `BroodLord` | 变异为巢虫领主 | `MorphToBroodLord,Execute` | - | 大型飞行作战生物。通过投射出的巢虫来攻击目标。巢虫是一种可以对地的小型生物。 / 可以对地。 |
| 脊针爬虫 | `SpineCrawlerUproot` | 站起 | `SpineCrawlerUproot,Execute` | - | 使脊针爬虫站起。站起的脊针爬虫能够移动，但无法攻击。在菌毯上的移动速度大幅提升。 |
| 孢子爬虫 | `SporeCrawlerUproot` | 站起 | `SporeCrawlerUproot,Execute` | - | 使孢子爬虫站起。站起的孢子爬虫能够移动，但无法攻击。在菌毯上的移动速度大幅提升。 |
| 跳虫 | `-` | - | - | `HaveMPAdrenalGlands` | - |
| 跳虫 | `Baneling` | 变异为爆虫 | `MorphZerglingToBaneling,Train1` | - | 自毁型单位。爆炸时能够造成小范围的伤害。 / 可以对地。 |
| 跳虫 | `BurrowDown` | 潜地 | `BurrowUltraliskDown,Execute` | - | 命令单位潜入地下。单位潜地后无法移动或攻击，但处于隐形状态。 |
| 跳虫 | `BurrowUp` | 出地 | `BurrowUltraliskUp,Execute` | - | 命令单位钻回地表。 |
| 跳虫 | `-` | - | `MorphToBaneling,Execute` | - | - |
| 扎加拉 | `BurrowDown` | 潜地 | `ZagaraVoidCoopBurrow,Execute` | - | 命令单位潜入地下。单位潜地后无法移动或攻击，但处于隐形状态。 |

实现备注：单位自身声明技能、被动、武器、Behavior 和升级后替换关系；科技建筑只触发研究，不在科技建筑内部判断所有兵种 if/else。

## 04. 初始化基地与特殊建筑

Owner：`CommanderBaseInitProfile`、`CommanderOpeningLoadoutProfile`、`CommanderSpecialStructureProfile`、`CommanderInitHookProfile`。

### 初始化建筑候选

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 脊针爬虫 | `SpineCrawler` | `SpineCrawler` | Ground; Armored/Biological/Structure; Structure; Melee | 矿:150 气:- 人口:- 生命:300 护盾:- 能量:- | 对地防御建筑。 / 可以对地。 |
| 孢子爬虫 | `SporeCrawler` | `SporeCrawler` | Ground; Armored/Biological/Structure; Structure; Melee | 矿:125 气:- 人口:- 生命:300 护盾:- 能量:- | 防空建筑。 / 可以对空 / 侦测单位 |

### 初始化/建造按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| - | - | - | - | - | 暂无自动命中项。 |

实现备注：地图初始化只传 commander、出生点和场景语义；基地、工人、特殊建筑、初始科技和补给由本指挥官 initializer 自己组装。

## 05. 指挥官兵种

Owner：`CommanderRosterProfile`、`CommanderUnitFactoryProfile`、`CommanderUnitReplacementProfile`、`CommanderLevelStageRosterProfile`。

### 当前 units.json 兵种清单

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 畸变体 | `Aberration` | `InfestedAbomination` | Unit; FactionEvolved | 矿:- 气:- 人口:- 生命:- 护盾:- 能量:- | 畸变体可以造成很高的伤害，同时也可以承受大量的伤害。 / 可以对地。 |
| 爆虫 | `Baneling` | `Baneling, BanelingNest` | Ground; Biological; Unit; Melee | 矿:50 气:25 人口:-0.5 生命:30 护盾:- 能量:- | 自毁型单位。爆炸时能够造成小范围的伤害。 / 可以对地。 |
| 腐化者 | `Corruptor` | `Corruptor` | Air; Armored/Biological; Unit; Melee | 矿:150 气:100 人口:-2 生命:200 护盾:- 能量:0 | 对空型飞行生物。可以使用腐蚀喷液。能够变异为巢虫领主。 / 可以对空。 |
| 爆蚊 | `Scourge` | `Scourge` | Unit; FactionEvolved | 矿:12 气:37 人口:- 生命:- 护盾:- 能量:- | 自毁式飞行单位。一只幼虫可变异为两只爆蚊。 / 可以对空。 |
| 虫后 | `SwarmQueen` | `SwarmQueen, Queen, QueenCoop` | Unit | 矿:- 气:- 人口:- 生命:- 护盾:- 能量:- | 支援单位。可以使用孵化菌毯肿瘤和速效哺液技能。 / 可以对地和对空。 |
| 跳虫 | `Zergling` | `Zergling, SpawningPool` | Ground; Biological/Light; Unit; Melee | 矿:25 气:- 人口:-0.5 生命:35 护盾:- 能量:- | 迅捷的肉搏型生物。可以变异为爆虫。 / 可以对地。 |

### roster 中未归入 units/buildings/heroes 的对象

| 名称 | Catalog ID | 解析 Unit | 属性 | 备注 |
|---|---|---|---|---|
| - | - | - | - | roster 中没有额外未分类对象。 |

口径：`units.json` 是当前提取出的兵种清单；`roster.json` 仍作为审计入口，用于发现满级后新增、替换、召唤或特殊形态对象。满级之后兵种会变化，测试台默认使用 `power_fusion` 而不是基础 `initial`。

## 06. 指挥官精通

Owner：`CommanderMasteryProfile`、`CommanderMasteryOptionProfile`、`CommanderMasteryModifierProfile`。

### 六项精通 30 点口径

| 组 | 精通 | Upgrade | 每点增量 | 30 点结果 | 说明 |
|---|---|---|---|---|---|
| 1 | 生命值和能量回复速度 | `MasteryZagaraHealthAndEnergyRegen` | `1` | +30% | - |
| 1 | 自动攻击伤害 | `MasteryZagaraAutoAttackDamage` | `1` | +30伤害 | - |
| 2 | 群体狂暴速度提升 | `MasteryZagaraMassFrenzySpeedBoost` | `1.5` | +45% | - |
| 2 | 跳虫躲闪几率 | `MasteryZagaraZerglingDodgeChance` | `1.5` | +45% | - |
| 3 | 空投蟑螂伤害和生命值 | `MasteryZagaraRoachDropDamageAndHealth` | `2` | +60% | - |
| 3 | 爆虫伤害 | `MasteryZagaraBanelingsDamage` | `1` | +30伤害 | - |

实现备注：当前默认六项精通全 30 点，不再做官方互斥取舍；若同一字段被多个精通/威望改写，必须进入 `CommanderModifierStackProfile` 明确叠加顺序。

## 07. 指挥官建筑

Owner：`CommanderBuildingProfile`、`CommanderBuildingAbilityProfile`、`CommanderBuildingReplacementProfile`。

### 当前 buildings.json 建筑清单

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 脊针爬虫 | `SpineCrawler` | `SpineCrawler` | Ground; Armored/Biological/Structure; Structure; Melee | 矿:150 气:- 人口:- 生命:300 护盾:- 能量:- | 对地防御建筑。 / 可以对地。 |
| 孢子爬虫 | `SporeCrawler` | `SporeCrawler` | Ground; Armored/Biological/Structure; Structure; Melee | 矿:125 气:- 人口:- 生命:300 护盾:- 能量:- | 防空建筑。 / 可以对空 / 侦测单位 |

### 建筑按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 脊针爬虫 | `SpineCrawlerUproot` | 站起 | `SpineCrawlerUproot,Execute` | - | 使脊针爬虫站起。站起的脊针爬虫能够移动，但无法攻击。在菌毯上的移动速度大幅提升。 |
| 脊针爬虫 | `-` | - | - | - | - |
| 孢子爬虫 | `SporeCrawlerUproot` | 站起 | `SporeCrawlerUproot,Execute` | - | 使孢子爬虫站起。站起的孢子爬虫能够移动，但无法攻击。在菌毯上的移动速度大幅提升。 |
| 孢子爬虫 | `Detector` | 侦测单位 | - | `NotUnderConstruction` | 该单位能够侦测到隐形、潜地和幻像单位。 |
| 孢子爬虫 | `-` | - | - | - | - |

实现备注：建筑自己的技能、生产队列、变形、起飞/降落、特殊自动施法由建筑 profile 声明；地图和科技建筑不持有跨指挥官判断。

## 08. 科技建筑及其升级选项

Owner：`CommanderTechBuildingProfile`、`CommanderTechOptionProfile`、`CommanderUpgradeEffectProfile`。

### 15 级解锁与研究命令

| 等级 | 名称 | 解锁升级 | 解锁 AbilityCmd | 说明 |
|---|---|---|---|---|
| 1 | 无尽虫群 | - | - | 扎加拉的补给上限为100，但她的作战单位消耗更少的资源并可更快孵化。一次可孵化两只工蜂。虫后只占用1点人口补给。幼虫孵化速度提高。 |
| 2 | 感染空投 | - | `ZagaraVoidCoopMassRoachDrop:` | 扎加拉可以在地图上的任何位置空投有限时生命的蟑螂。空投囊在着陆时会造成伤害。 |
| 3 | 幼虫注射 | `QueenDoubleInjectLarva` | - | 虫后的孵化幼虫技能孵化的幼虫数量由4个提高到8个。 |
| 4 | 爆蚊升级包 | - | `ScourgeNestResearch:`, `ScourgeNestResearch:1`, `ScourgeDetonate:` | 在爆蚊巢穴中解锁新的研究项目： / 爆蚊死后会对小范围内造成相当于它们50%攻击力的伤害。变异爆蚊所需的高能瓦斯数量减少50点。 |
| 5 | 新单位：胆汁喷射体 | `ZagaraBileLaunchers` | - | 解锁将工蜂变异为胆汁喷射体的能力，这是一种可对地面和空中目标造成范围伤害的防御建筑。 |
| 6 | 跳虫升级包 | - | `SpawningPoolResearch:2`, `SpawningPoolResearch:3` | 在分裂池中解锁新的研究项目： / 跳虫最大生命值提高10点。跳虫的攻击会使目标的护甲值降低到0，持续10秒。 |
| 7 | 爆虫巢穴：哺育腔 | `ZagaraVoidCoopBanelingSpawner` | - | 爆虫巢穴会周期性地孵化免费的爆虫。 |
| 8 | 孕育爆虫和爆蚊 | `ZagaraVoidCoopAberrationBanelingIncubation` | - | 畸变体死亡时，它们的尸体上会孵化出2只爆虫。腐化者死亡时会孵化2只爆蚊。 |
| 9 | 进化腔升级包 | - | `evolutionchamberresearch:22`, `evolutionchamberresearch:9` | 在进化腔中解锁新的研究项目： / 扎加拉的攻击可造成范围伤害。溅射主目标附近的敌人。畸变体使位于他们下方的单位获得50%伤害减免。 |
| 10 | 遮天蔽日 | `ZagaraVoidCoopImprovedMassRoachDrop` | - | 感染空投所空投的蟑螂总量由10个提高到20个。 |
| 11 | 爆虫巢穴升级包 | - | `BanelingNestResearch:2`, `BanelingNestResearch:3` | 在爆虫巢穴中解锁新的研究项目： / 爆虫对主目标的伤害提高100%。溅射伤害保持原样。爆虫的溅射范围提高50%。 |
| 12 | 跳虫进化：裂变虫 | `CoopZerglingSwarmling` | - | 将扎加拉的跳虫升级为裂变虫变种。 / 迅捷的肉搏型生物。一次可孵化三个。几乎立即变异。可变异为爆虫。 / 可以对地。 |
| 13 | 胆汁喷射体升级包 | - | `SpawningPoolResearch:4`, `SpawningPoolResearch:5` | 在分裂池中解锁新的研究项目： / 提高胆汁喷射体的轰炸射程。减少胆汁喷射体的轰炸冷却时间。 |
| 14 | 爆虫进化：分裂虫 | `CoopBanelingSplitterling` | - | 将扎加拉的爆虫进化为分裂虫变种。 / 自毁型单位。死亡时能够造成小范围的伤害。在其死后分裂成若干个小单位。 / 可以对地。 |
| 15 | 虫母 | `ZagaraVoidCoopImprovedAbilities` | - | 扎加拉的爆虫冲锋和召唤屠猎者技能的能量消耗降低50%。 / 爆虫冲锋和召唤屠猎者的单位数量提高50%。 |

### Upgrade 摘要

| Upgrade | 父级 | 显示名 | Effect数 | 说明 |
|---|---|---|---|---|
| `CommanderPrestigeZagaraCorruptorsAberrations` | `CommanderPrestige` | 构造体之母 | 16 | 优点 / 畸变体和腐化者的消耗降低25%，生命值提高50%，并且生命值恢复速度大幅提高。 / 缺点 / 没有免费的爆虫。 |
| `CommanderPrestigeZagaraMaxSupply` | `CommanderPrestige` | 爆蚊虫后 | 8 | 优点 / 最大补给上限提高50。孵化跳虫和爆蚊时，每个虫卵可以额外孵化一个单位。爆虫巢穴可以额外孵化4个免费的爆虫，爆蚊巢穴可以额外孵化4个免费的爆蚊。 / 缺点 / 扎加拉不可用。 |
| `CommanderPrestigeZagaraMaxSupplyScourgeCostUpgrade` | `CommanderPrestige` | - | 1 | - |
| `CommanderPrestigeZagaraZagara` | `CommanderPrestige` | 顶级掠食者 | 18 | 优点 / 扎加拉的技能冷却时间缩短，生命值和能量回复速度提高，并且可以进入深槽虫道。 / 缺点 / 群体狂暴只能影响扎加拉和她召唤的单位。战斗单位的消耗提高25%。 |
| `CommanderPrestigeZagaraZagaraMastery` | `CommanderPrestige` | - | 4 | - |
| `CoopBanelingSplitterling` | `-` | Coop Baneling Splitterling | 0 | - |
| `CoopZerglingSwarmling` | `-` | Coop Zergling Swarmling | 0 | - |
| `K5TwoDrones` | `-` | - | 5 | 可以一次孵化两只工蜂。资源消耗和制造时间减少50%。 |
| `MasteryZagaraAutoAttackDamage` | `-` | 精通 扎加拉 自动攻击伤害 | 3 | 提高扎加拉的攻击伤害。 |
| `MasteryZagaraBanelingsDamage` | `-` | 精通 扎加拉 爆虫伤害 | 6 | 提高扎加拉的爆虫及其爆虫冲锋技能的伤害。 |
| `MasteryZagaraHealthAndEnergyRegen` | `-` | 精通 扎加拉 生命值和能量恢复 | 9 | 提高扎加拉和虫后的生命值与能量恢复。 |
| `MasteryZagaraLarvaRatePassive` | `-` | Zagara Larva Rate Passive | 1 | - |
| `MasteryZagaraMassFrenzySpeedBoost` | `-` | 专精扎加拉群体狂暴速度加成 | 3 | 提高群体狂暴的攻击速度和移动速度。 |
| `MasteryZagaraRoachDropDamageAndHealth` | `-` | 精通 扎加拉 蟑螂空投伤害和生命值 | 4 | 提高感染空投的伤害，以及每只蟑螂的生命值和伤害。 |
| `MasteryZagaraZerglingDodgeChance` | `-` | 专精扎加拉跳虫躲避几率 | 2 | 使跳虫有几率躲避一次攻击。 |
| `QueenDoubleInjectLarva` | `-` | Queen Double Inject Larva | 1 | - |
| `ScourgeGasCostReduction` | `-` | Simplified Genome | 1 | - |
| `ZagaraBileLaunchers` | `-` | Zagara Bile Launchers | 3 | - |
| `ZagaraCommander` | `-` | Commander - Zerg - Zagara | 156 | - |
| `ZagaraVoidCoopAberrationBanelingIncubation` | `-` | Zagara Void Coop Aberration Baneling Incubation | 0 | - |
| `ZagaraVoidCoopBanelingSpawner` | `-` | - | 0 | 爆虫巢穴自动孵化爆虫。 |
| `ZagaraVoidCoopImprovedAbilities` | `-` | Zagara Void Coop Improved Abilities | 4 | - |
| `ZagaraVoidCoopImprovedMassRoachDrop` | `-` | Zagara Void Coop Improved Infested Drop | 1 | - |

### 研究/升级按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| - | - | - | - | - | 暂无自动命中项。 |

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
| `cargo_light` | Zergling x12, Baneling x6 | 虫群突袭 | 跳虫和爆虫快速清场。 | 设计草案；需按原始mod地图流程和实机日志继续校验。 |
| `cargo_heavy` | Aberration x3, SwarmQueen x2, Baneling x8 | 重型虫群 | 畸变体抗线，虫后支援。 | 设计草案；需按原始mod地图流程和实机日志继续校验。 |
| `cargo_air` | Corruptor x4, Scourge x8 | 空中虫群 | 腐化者和爆蚊制空。 | 设计草案；需按原始mod地图流程和实机日志继续校验。 |
| `bonus_reward` | ZagaraVoidCoop x1, Aberration x3 | 英雄奖励 | 只有允许英雄时投放扎加拉。 | 设计草案；需按原始mod地图流程和实机日志继续校验。 |
| `replacement_squad` | Zergling x20, Baneling x10 | 数量上限测试 | 用于验证虫群数量和免费爆虫。 | 设计草案；需按原始mod地图流程和实机日志继续校验。 |

### 接入规则

- 本模块不再从 `command_cards.json` 的运输/空投按钮自动推导货舱单位，也不把 `units.json` 全量清单当成可投放单位。
- 地图只传入 `mapId`、`scenarioKind`、目标点和运输模式；单位组合由 `CommanderCargoLoadoutProfile` 根据当前 commander、15 级 `power_fusion` roster 和场景限制解析。
- `原始mod` 已有运输机、空投舱、狮鹫运输、医疗运输机、坑道/深挖或感染运输容器时，应优先保留它的流程语义，只把硬编码单位替换为 profile 查询结果。
- 英雄、首领、终极进化、战列巡航舰、航母等高价值单位默认只能用于 `bonus_reward` 或显式允许英雄的地图场景。
实现备注：`CommanderMapDropProfile` 负责把地图事件映射为 `scenarioKind`；`CommanderScenarioFallbackProfile` 负责缺项降级并输出 `[XM_DBG][WARN][CARGO_FALLBACK]`。

## 10. 指挥官特殊机制

Owner：`CommanderSpecialMechanicProfile`、`CommanderSpecialResourceProfile`、`CommanderSpecialMechanicHookProfile`、`CommanderSpecialMechanicUnitProfile`。

本指挥官重点：扎加拉英雄、虫群数量、免费爆虫和虫巢部队。

### 特殊机制命中项

- 无尽虫群 (Zagara)
- 感染空投 (ZagaraUnlockMassRoachDrop)
- 幼虫注射 (ZagaraQueenDoubleInjectLarva)
- 爆蚊升级包 (ZagaraScourgeUpgrades)
- 新单位：胆汁喷射体 (ZagaraUnlockBileLaunchers)
- 跳虫升级包 (ZagaraZerglingUpgrades)
- 爆虫巢穴：哺育腔 (ZagaraBanelingNestSpawner)
- 孕育爆虫和爆蚊 (ZagaraBanelingIncubation)
- 进化腔升级包 (ZagaraAberrationUpgrades)
- 遮天蔽日 (ZagaraImprovedMassRoachDrop)
- 爆虫巢穴升级包 (ZagaraBanelingUpgrades)
- 跳虫进化：裂变虫 (ZagaraZerglingEvo)
- 胆汁喷射体升级包 (ZagaraBileLauncherUpgrades)
- 爆虫进化：分裂虫 (ZagaraBanelingEvo)
- 虫母 (ZagaraImprovedAbilities)

### 特殊机制 Upgrade 候选

- 构造体之母 (`CommanderPrestigeZagaraCorruptorsAberrations`)
- 爆蚊虫后 (`CommanderPrestigeZagaraMaxSupply`)
- CommanderPrestigeZagaraMaxSupplyScourgeCostUpgrade (`CommanderPrestigeZagaraMaxSupplyScourgeCostUpgrade`)
- 顶级掠食者 (`CommanderPrestigeZagaraZagara`)
- CommanderPrestigeZagaraZagaraMastery (`CommanderPrestigeZagaraZagaraMastery`)
- Coop Baneling Splitterling (`CoopBanelingSplitterling`)
- Coop Zergling Swarmling (`CoopZerglingSwarmling`)
- 精通 扎加拉 自动攻击伤害 (`MasteryZagaraAutoAttackDamage`)
- 精通 扎加拉 爆虫伤害 (`MasteryZagaraBanelingsDamage`)
- 精通 扎加拉 生命值和能量恢复 (`MasteryZagaraHealthAndEnergyRegen`)
- Zagara Larva Rate Passive (`MasteryZagaraLarvaRatePassive`)
- 专精扎加拉群体狂暴速度加成 (`MasteryZagaraMassFrenzySpeedBoost`)
- 精通 扎加拉 蟑螂空投伤害和生命值 (`MasteryZagaraRoachDropDamageAndHealth`)
- 专精扎加拉跳虫躲避几率 (`MasteryZagaraZerglingDodgeChance`)
- Simplified Genome (`ScourgeGasCostReduction`)
- Zagara Bile Launchers (`ZagaraBileLaunchers`)
- Commander - Zerg - Zagara (`ZagaraCommander`)
- Zagara Void Coop Aberration Baneling Incubation (`ZagaraVoidCoopAberrationBanelingIncubation`)
- ZagaraVoidCoopBanelingSpawner (`ZagaraVoidCoopBanelingSpawner`)
- Zagara Void Coop Improved Abilities (`ZagaraVoidCoopImprovedAbilities`)
- 还有 1 项，后续从源 JSON 继续展开。

### 特殊机制按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 畸变体 | `AberrationBanelingIncubationLocked` | 爆虫孕育 | - | `ZagaraLevel08` | 该技能将在指挥官等级8时解锁。 |
| 爆虫 | `-` | - | - | - | - |
| 爆虫 | `Explode` | 爆炸 | `Explode,Execute` | - | 使爆虫在原地自爆，对附近的敌方单位和建筑造成伤害。 |
| 爆虫 | `EnableBuildingAttack` | 开启对建筑攻击 | `VolatileBurstBuilding,On` | - | 允许爆虫自动将建筑视为攻击目标。 / 爆虫可对建筑造成{Effect,VolatileBurstU2,Amount}点伤害值。 |
| 爆虫 | `HaveCentrificalHooks` | 环心镰钩 | - | `ZagaraHaveCentrificalHooks` | 提高爆虫的移动速度。 |
| 爆虫 | `BurrowDown` | 潜地 | `BurrowUltraliskDown,Execute` | - | 命令单位潜入地下。单位潜地后无法移动或攻击，但处于隐形状态。 |
| 爆虫 | `BurrowUp` | 出地 | `BurrowUltraliskUp,Execute` | - | 命令单位钻回地表。 |
| 爆虫 | `-` | - | `Explode,Execute` | - | - |
| 爆蚊 | `ScourgeSplashDamagePassive` | 剧毒孢子 | - | `HaveScourgeSplashDamage` | 爆蚊在死亡时在小范围内造成相当于它们攻击伤害一半的伤害。 |
| 爆蚊 | `DetonateScourge` | 引爆 | `ScourgeDetonate,Execute` | - | 爆蚊轰炸当前区域，并对附近的敌方空军造成伤害。 |
| 爆蚊 | `DisableBuildingAttackScourge` | 关闭对建筑攻击 | `SuicideBuilding,Off` | - | 阻止爆蚊自动将建筑视为攻击目标。爆蚊仍会接受明确的攻击建筑指令。 |
| 爆蚊 | `HaveScourgeGasCostReduction` | 简化基因组 | - | `HaveScourgeGasCostReduction` | 变异爆蚊所需消耗的高能瓦斯量减少50。 |
| 跳虫 | `ZagaraVoidCoopZerglingDodge` | 闪避 | - | `HaveMasteryZagaraZerglingDodgeChance` | 跳虫有{Effect,MasteryZagaraZerglingDodgeChanceDisplayDummy,Amount}%的几率躲避一次攻击。 |
| 跳虫 | `Baneling` | 变异为爆虫 | `MorphZerglingToBaneling,Train1` | - | 自毁型单位。爆炸时能够造成小范围的伤害。 / 可以对地。 |
| 跳虫 | `-` | - | `MorphToBaneling,Execute` | - | - |
| 扎加拉 | `ZagaraVoidCoopRelentlessSwarmer` | - | - | - | - |
| 扎加拉 | `VolatileNestLocked` | 哺育腔 | - | `ZagaraLevel07` | 该技能将在指挥官等级7时解锁。 |
| 扎加拉 | `MedusasBladesLocked` | 美杜莎之刃 | - | `ZagaraLevel09` | 该科技将在指挥官等级9时解锁。 |
| 扎加拉 | `CommanderPrestigeZagaraZagaraDeepTunnel` | 深槽虫道 | `CommanderPrestigeZagaraZagaraDeepTunnel,Execute` | - | 快速潜地前往目标位置。 |
| 扎加拉 | `ZagaraVoidCoopBanelingBarrage` | - | `ZagaraVoidCoopBanelingBarrage,Execute` | - | - |
| 扎加拉 | `ZagaraVoidCoopSpawnHunterKillers` | ZagaraVoidCoopSpawnHunterKillers | `ZagaraVoidCoopSpawnHunterKillers,Execute` | - | - |
| 扎加拉 | `ZagaraVoidCoopMassFrenzy` | 群体狂暴 | `ZagaraVoidCoopMassFrenzy,Execute` | - | 使地图上所有友方单位的攻击速度提高{(Behavior,ZagaraVoidCoopMassFrenzyTarget,Modification.AttackSpeedMultiplier - 1) * 100}%，移动速度提高{(Behavior,ZagaraVoidCoo... |
| 扎加拉 | `ZagaraVoidCoopMassRoachDropLocked` | 感染空投 | - | `ZagaraLevel02` | 该技能将在指挥官等级2时解锁。 |
| 扎加拉 | `BurrowDown` | 潜地 | `ZagaraVoidCoopBurrow,Execute` | - | 命令单位潜入地下。单位潜地后无法移动或攻击，但处于隐形状态。 |

实现备注：凡是涉及局内状态、资源、堆叠、全局计时器、隐藏 caster、英雄成长或召唤首领的机制，都必须有 runtime hook 和 `[XM_DBG]` 日志。

## 11. 指挥官个性化机制

Owner：`CommanderPersonalMechanicProfile`、`CommanderPersonalMechanicEffectProfile`、`CommanderPersonalMechanicHookProfile`、`CommanderPersonalMechanicRequirementProfile`。

本指挥官重点：英雄、免费爆虫、虫群数量与单位上限调整要统一由 profile 控制。

### 威望正向融合输入

| 威望 ID | 名称 | Primary Upgrade | 禁用单位 | 启用单位 | 禁用 Ability | 补充 Upgrade |
|---|---|---|---|---|---|---|
| `CommanderPrestigeZagaraMaxSupply` | - | `CommanderPrestigeZagaraMaxSupply` | - | - | `evolutionchamberresearch:19`, `evolutionchamberresearch:22` | `ZagaraMaxSupply1` |
| `CommanderPrestigeZagaraCorruptorsAberrations` | - | `CommanderPrestigeZagaraCorruptorsAberrations` | - | - | `ZagaraVoidCoopBanelingSpawnerTrain:`, `ZagaraVoidCoopBanelingSpawnerTrain:1`, `ZagaraVoidCoopBanelingSpawnerTrain:2` | - |
| `CommanderPrestigeZagaraZagara` | - | `CommanderPrestigeZagaraZagara` | - | - | - | `ZagaraZagara1` |

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
[XM_DBG][INFO][COMMANDER_PROFILE_LOAD] commander=Zagara levelMode=FullLevel15 masteryMode=AllSixMax rosterStage=power_fusion result=ok
[XM_DBG][INFO][POWER_FUSION_APPLY] commander=Zagara levelMode=FullLevel15 masteryMode=AllSixMax prestigeMode=SelectedPositive result=ok
[XM_DBG][INFO][ROSTER_LOAD] commander=Zagara stage=power_fusion units=6 buildings=2 heroes=1 result=ok
[XM_DBG][INFO][HERO_PROFILE_LOAD] commander=Zagara heroes=1 result=ok
[XM_DBG][INFO][MODULE_VERIFY] commander=Zagara module=<01-11> profile=<profile> result=ok
[XM_DBG][WARN][CASC_AUDIT_REQUIRED] commander=Zagara module=<module> object=<object> result=needs-casc-audit
```

## 第一轮待审计项

- 顶部技能的 caster、按钮、冷却、充能、目标转发闭包。
- 英雄或特殊英雄的 Unit、Ability、Behavior、Weapon、Actor、Sound、复活/重生闭包。
- `power_fusion` 最终 roster 与 `level15` roster 的新增、替换、变体关系。
- 6 项精通的真实作用对象和最终数值。
- 3 个威望的正面收益、负面代价、disable/suppress、费用/冷却/上限变化。
- 科技建筑研究按钮、Requirement、Upgrade effect 是否完整。
- 特殊机制、英雄成长和个性化机制是否需要 runtime hook。
