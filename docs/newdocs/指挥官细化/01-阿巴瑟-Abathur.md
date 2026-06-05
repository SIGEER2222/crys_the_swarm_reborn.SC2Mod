# 阿巴瑟（Abathur）指挥官细化

日期：2026-05-27

## 当前口径

本文件统一按满级 `power_fusion` 口径编写：正文只讨论满级指挥官的最终态，不再把 1 级与 15 级拆成两套玩法态；等级 1-15 只保留为解锁门槛和审计锚点。精通默认 6 项全部 30 点，三个威望按正收益融合展开，不直接启用官方 `PlayerPrestige`。`initial` 仅用于官方基础状态审计和差异对照，默认测试和玩法都看 `power_fusion` 最终状态。

本文件按 `docs/newdocs/模块拆分` 的 11 个模块整理 阿巴瑟。依据 `游戏数据/官方合作指挥官/commanders/Abathur/` 的当前 JSON 生成；具体 Ability、Behavior、Weapon、Actor、Effect、Requirement 闭包继续追 `游戏数据/官方SC2原始文本镜像/` 或实机 `[XM_DBG]` 日志。

重生阿巴瑟单独看：`docs/newdocs/额外指挥官/01-阿巴瑟-自定义Mod.md`。那份文档对应的是嵌套 Mod `crys_the_swarm_reborn.SC2Mod\crys_the_swarm_reborn.SC2Mod`，不要和本页官方合作指挥官口径混用。

## 链路提醒

- `Leviathan` 在官方口径里按单位/终极进化对象处理，不按英雄处理；`heroes.json` 仍为 0。
- `03. 普通单位技能及其进化功能` 和 `10. 指挥官特殊机制` 已经把阿巴瑟的关键链路拆开，重点是 `Ravager`、`Leviathan`、`Brutalisk`、`Deep Tunnel`。
- 实现时不要只看按钮是否显示；要同时核对 `ButtonData -> AbilData -> EffectData -> UnitData/UpgradeData -> RequirementData`，尤其是 `MorphRoachVileToRavager`、`RavagerAbathurCorrosiveBile` 和 `BurrowRavagerAbathur*`。
- 2026-06-03 修正：本文件有效实现口径只按满级 `power_fusion`。阿巴瑟有效蟑螂单位只有 `RoachVile`；`Roach` 只作基础训练入口/差异审计，`RoachCorpser` 只作外部或遗留候选，不进入满级主链。
- 2026-06-03 修正：官方 `buildings.json` 只列出 `SpineCrawler` 和 `SporeCrawler`。`NydusNetwork` 即使在共享 `ZergBuild` 或继承链里有痕迹，也不计入阿巴瑟有效建筑/科技链。
- 2026-06-04 当前 Mod runtime 已按满级口径收敛：`XMFinal CommanderRuntimeRoster` 不再把 `Roach` / `RoachCorpser` 当正链单位，只保留 `RoachVile -> MorphRoachVileToRavager -> RavagerAbathur`，并显式纳入 `SwarmHostAbathurBurrowed`、`RavagerAbathurBurrowed`、`ToxicNest`、`ToxicNestBurrowed`。测试台单位名册和能力 smoke 也同步切到 `AbathurGuardian / DevourerAbathur / MutaliskAbathur / SwarmHostAbathur / ViperAbathur / BrutaliskAbathur` 等当前 Mod ID；后续不要再把 `Roach/RoachCorpser` 补回 runtime 正链。

## 当前 Mod 实现闭包复核（2026-06-05）

范围：这里只复核官方合作指挥官阿巴瑟 `XMAbathur.SC2Mod`，不包含重生阿巴瑟 `XMAbathurReborn.SC2Mod`。

### 已闭合链路

- 依赖入口：`XMFinal.SC2Mod/DocumentHeader` 与 `DocumentInfo` 已加载 `file:Mods\XM\XMAbathur.SC2Mod`；`LibE0EAE146.galaxy` 已 include `LibE0EAE146_AbathurRuntime`，并在 `InitializeBase` 的 `Abathur` 分支调用 `libE0EAE146_gf_AbathurRuntimeInit(1, lp_secondUnit, lp_createHero)`。
- 开局三件套：`CommanderAch/Abathur` 指向 `HatcheryAbathur / DroneAbathur / OverlordAbathur`，不是通用 `Hatchery / Drone / Overlord`。
- 私有幼虫链：`HatcheryAbathur / LairAbathur / HiveAbathur` 挂载 `SpawnLarvaAbathur`；`SpawnLarvaAbathur` 生成 `LarvaAbathur`；`LarvaAbathur` 挂载 `LarvaTrainAbathur` 与 `LarvaTrainSwarmAbathur`。
- 工蜂建造链：`DroneAbathur` 使用 `ZergBuildAbathur`；`Build10` 已 removed，排除 `NydusNetwork` 与 `GreaterNydusWorm`，不允许把共享坑道链计入阿巴瑟正链。阿巴瑟可建造链保留 `HatcheryAbathur / ExtractorAbathur / SpawningPoolAbathur / EvolutionChamberAbathur / RoachWarrenAbathur / InfestationPitAbathur / SpireAbathur / SpineCrawlerAbathur / SporeCrawlerAbathur`。
- 满级训练链：`LarvaTrainSwarmAbathur,Train1` 生产 `RoachVile`，不生产通用 `Roach` 或 `RoachCorpser`；`RoachVile` 通过 `MorphRoachVileToRavager,Train1` 变异为 `RavagerAbathur`。
- 破坏者技能链：`RavagerAbathur` 挂载 `RavagerAbathurCorrosiveBile`、`BurrowRavagerAbathurDown`；`RavagerAbathurBurrowed` 挂载 `BurrowRavagerAbathurUp`。腐蚀胆汁使用 `RavagerAbathurCorrosiveBile,Execute`，有独立按钮、冷却与效果入口，不接普通 `RavagerCorrosiveBile`。
- 私有战斗/终极进化链：`MutaliskAbathur -> MutaliskMorphToDevourer -> DevourerAbathur`，`MutaliskAbathur -> MutaliskMorphToGuardian -> AbathurGuardian`；`RoachVile / RavagerAbathur / SwarmHostAbathur / SwarmHostAbathurBurrowed -> EvolveToBrutalisk* -> BrutaliskAbathur`；`MutaliskAbathur / AbathurGuardian / DevourerAbathur / ViperAbathur -> EvolveToLeviathan* -> LeviathanAbathur`；`SwarmHostAbathur <-> SwarmHostAbathurBurrowed` 和 `BrutaliskAbathur <-> BrutaliskAbathurBurrowed` 均走私有 morph 能力，不回落到公共形态。
- 阿巴瑟飞蛇技能/研究链路：`LarvaTrainAbathur,Train13` 生产 `ViperAbathur`，`ViperAbathur` 本体显式挂载 `ViperConsumeStructure`、`Yoink`、`ParasiticBomb`。命令卡闭合为 `ViperConsume -> ViperConsumeStructure,Execute`、`FaceEmbrace -> Yoink,Execute`、`ParasiticBomb -> ParasiticBomb,Execute`；本地 Catalog 补齐对应 `Button / Ability / Effect / Behavior / Missile Unit`，避免按钮能点但能力缺效果。感染深渊研究闭合为 `InfestationPitResearch,Research9 -> ViperImprovedCastRange` 和 `InfestationPitResearch,Research10 -> ViperAbductImprovedStun`，并接入 `Learn*` 需求、`Have*` 被动显示、`ViperImprovedCastRangePassive`、`ViperAbductImprovedStunPassive`。`ParasiticBomb` 按合作模式覆盖值消耗 125 能量，目标过滤为空中可见非己方/友军/中立/建筑目标；公共 `Viper` 不再作为阿巴瑟飞蛇技能链的正链 owner。
- 启动/空投 squad：`LibE0EAE146_CommanderStartSquads.galaxy` 的阿巴瑟分支已从公共 `Roach / RoachCorpser / Viper / Brutalisk / HotSLeviathan` 等切到当前有效 ID：`RoachVile / RavagerAbathur / SwarmHostAbathur / QueenCoopAbathur / MutaliskAbathur / AbathurGuardian / DevourerAbathur / ViperAbathur / BrutaliskAbathur / LeviathanAbathur`。
- 满级/精通兜底：`LibE0EAE146_AbathurRuntime.galaxy` 在初始化时强制 `CommanderLevel=16`、`AbathurCommander=1`，并补齐阿巴瑟 15 级核心升级与六项精通 30 点，避免 Bank 未满级时出现按钮显示但 Requirement 不满足。
- 污染防线：runtime 显式禁用 `NydusNetwork / GreaterNydusWorm / Roach / RoachCorpser / Ravager / SwarmHost / SwarmHostBurrowed / Mutalisk / GuardianMP / Devourer / Viper / Brutalisk / BrutaliskBurrowed / HotSLeviathan`，同时显式允许 `HatcheryAbathur / LarvaAbathur / DroneAbathur / MutaliskAbathur / AbathurGuardian / DevourerAbathur / SwarmHostAbathur / SwarmHostAbathurBurrowed / ViperAbathur / RoachVile / RavagerAbathur / RavagerAbathurBurrowed / BrutaliskAbathur / BrutaliskAbathurBurrowed / LeviathanAbathur / ToxicNest / ToxicNestBurrowed` 等正链单位。

### 本次根因

旧判断只证明了 `CommanderAch` 和 Catalog 私有入口存在，没有证明 `XMFinal` live dependency、`InitializeBase` runtime 分支、满级升级、精通和污染防线同时生效。阿巴瑟旧 runtime 只创建 `CoopCasterAbathur`、初始化面板和生物质；如果玩家 Bank 不是满级，`RoachVile`、破坏者、毒巢、共生体、精通等 Requirement 仍可能缺升级，表现就是按钮可见但点击后没有完整效果。

### 仍保留的边界

- 当前不直接启用 `CommanderPrestigeAbathurBiomass`、`CommanderPrestigeAbathurDeepTunnel`、`CommanderPrestigeAbathurUltEvo` 这些官方威望主升级，因为它们同时携带负面效果或禁用终极进化。威望正向融合如果以后要做，应单独做 shim，而不是直接开官方主升级。
- 本轮是静态闭包验证，不等同于 SC2 编辑器内实机测试。实机仍需重点测 `RoachVile -> RavagerAbathur`、腐蚀胆汁、潜地/出地、阿巴瑟飞蛇技能、感染深渊飞蛇研究、毒巢、愈合、生物质、终极进化。`Yoink` 当前采用本地最小可执行链路，不是完整搬运官方所有特殊分支；若实机出现拉取位置、维京/坦克形态或特殊目标异常，再补官方完整分支。

## 误判复盘（2026-06-03）

这次把 `NydusNetwork` 混入阿巴瑟链路的直接原因，是补官方生产闭包时读到了共享原始镜像里的 `ZergBuild,Build10`、`ArmyCategory NydusNetwork`、`TechUnit/NydusNetwork` 和相关 Unit/Effect/Upgrade 定义，却没有再用 `commanders/Abathur/buildings.json` 与满级 `power_fusion` 有效名册做归属过滤。

排查漏掉它的原因也明确：2026-06-02 当前 Mod 诊断页里阿巴瑟 `生产链补充建筑` 已经是 0，并且破坏者链已经显示 `RavagerAbathurCorrosiveBile`、`BurrowRavagerAbathurDown`；但后续补“官方闭包”时绕开了这份诊断结果，按共享 `Drone/ZergBuild` 菜单手工整理，导致共享 Catalog 命中被提升成阿巴瑟候选。以后阿巴瑟页中 `NydusNetwork` 或 `ZergBuild,Build10` 只能出现在“不计入/共享污染/排除”上下文；新增或整理文档后运行 `node scripts/sc2/validate-commander-doc-ownership.mjs` 做最低限度防回归。

## 官方数据摘要

| 项                          | 值                                                                                                                                            |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| CommanderId                | `ZergAbathur`                                                                                                                                |
| 中文名                        | 阿巴瑟                                                                                                                                          |
| 默认升级                       | `AbathurCommander`                                                                                                                           |
| 默认能力命令                     | `MutaliskMorphToDevourer:`, `MutaliskMorphToGuardian:`, `TrainQueen:`, `MorphRoachToRavager:`, `SpireResearch:6`, `MorphRoachVileToRavager:` |
| 威望 ID                      | `CommanderPrestigeAbathurBiomass`, `CommanderPrestigeAbathurDeepTunnel`, `CommanderPrestigeAbathurUltimateEvo`                               |
| heroes.json 数量             | 0                                                                                                                                            |
| roster.json 数量             | 14                                                                                                                                           |
| units.json 数量              | 12                                                                                                                                           |
| buildings.json 数量          | 2                                                                                                                                            |
| command\_cards.json 对象数    | 12                                                                                                                                           |
| upgrades.json 数量           | 22                                                                                                                                           |
| other-tech-entries.json 数量 | 0                                                                                                                                            |
| source                     | `mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/userdata.xml`                                                                           |

roster 样例：

```text
AbathurGuardian, Devourer, Mutalisk, Roach, SpineCrawler, SporeCrawler, SwarmHost, SwarmQueen, RoachCorpser, RoachVile, Ravager, Viper, Brutalisk, Leviathan
```

## 15 级最终解锁摘要（审计锚点）

- 1: 生物质收割者
- 2: 终极进化
- 3: 剧毒巢穴
- 4: 蟑螂温室升级包
- 5: 强化愈合
- 6: 进化腔升级包
- 7: 生物质恢复
- 8: 新单位：飞蛇
- 9: 感染深渊升级包
- 10: 共生体
- 11: 尖塔升级包
- 12: 突变潜能
- 13: 蝗虫注射
- 14: 蟑螂进化：秽型虫
- 15: 生质汲取

## 模块索引

| 序号 | 模块           | 本文件章节              |
| -- | ------------ | ------------------ |
| 01 | 顶部技能栏        | `01. 顶部技能栏`        |
| 02 | 英雄单位及其技能     | `02. 英雄单位及其技能`     |
| 03 | 普通单位技能及其进化功能 | `03. 普通单位技能及其进化功能` |
| 04 | 初始化基地与特殊建筑   | `04. 初始化基地与特殊建筑`   |
| 05 | 指挥官兵种        | `05. 指挥官兵种`        |
| 06 | 指挥官精通        | `06. 指挥官精通`        |
| 07 | 指挥官建筑        | `07. 指挥官建筑`        |
| 08 | 科技建筑及其升级选项   | `08. 科技建筑及其升级选项`   |
| 09 | 特定地图运输机空投单位  | `09. 特定地图运输机空投单位`  |
| 10 | 指挥官特殊机制      | `10. 指挥官特殊机制`      |
| 11 | 指挥官个性化机制     | `11. 指挥官个性化机制`     |

## 01. 顶部技能栏

Owner：`CommanderPanelProfile`、`CommanderPanelAbilityProfile`、`CommanderPanelCooldownProfile`、`CommanderPanelChargeProfile`、`CommanderPanelTargetingProfile`、`CommanderPanelModifierProfile`。

### 面板/全局能力候选

| 来源          | 等级 | AbilityCmd                   | 关联升级 | 说明                                                                      |
| ----------- | -- | ---------------------------- | ---- | ----------------------------------------------------------------------- |
| 默认能力        | -  | MutaliskMorphToDevourer:     | -    | 来自 commander.json                                                       |
| 默认能力        | -  | MutaliskMorphToGuardian:     | -    | 来自 commander.json                                                       |
| 默认能力        | -  | TrainQueen:                  | -    | 来自 commander.json                                                       |
| 默认能力        | -  | MorphRoachToRavager:         | -    | 来自 commander.json                                                       |
| 默认能力        | -  | SpireResearch:6              | -    | 来自 commander.json                                                       |
| 默认能力        | -  | MorphRoachVileToRavager:     | -    | 来自 commander.json                                                       |
| Lv2 终极进化    | 2  | EvolveToLeviathanMutalisk:   | -    | 使用100层生物质解锁地面单位进化成莽兽的技能。空中单位使用100层生物质可以进化成利维坦。                          |
| Lv2 终极进化    | 2  | EvolveToLeviathanGuardianMP: | -    | 使用100层生物质解锁地面单位进化成莽兽的技能。空中单位使用100层生物质可以进化成利维坦。                          |
| Lv2 终极进化    | 2  | EvolveToLeviathanDevourer:   | -    | 使用100层生物质解锁地面单位进化成莽兽的技能。空中单位使用100层生物质可以进化成利维坦。                          |
| Lv4 蟑螂温室升级包 | 4  | RoachWarrenResearch:5        | -    | 在蟑螂温室中解锁以下升级： / 蟑螂生命值低于50%时获得+6护甲。破坏者的腐蚀胆汁技能造成的伤害提高40点。                 |
| Lv4 蟑螂温室升级包 | 4  | RoachWarrenResearch:7        | -    | 在蟑螂温室中解锁以下升级： / 蟑螂生命值低于50%时获得+6护甲。破坏者的腐蚀胆汁技能造成的伤害提高40点。                 |
| Lv6 进化腔升级包  | 6  | BioMechanicalTransfusion:    | -    | 在进化腔中解锁以下升级： / 允许孵化场、虫穴和主巢同时生成两只虫后。使虫后的速效哺液的治疗量提高10点，并且可以治疗生物和机械单位。     |
| Lv6 进化腔升级包  | 6  | evolutionchamberresearch:10  | -    | 在进化腔中解锁以下升级： / 允许孵化场、虫穴和主巢同时生成两只虫后。使虫后的速效哺液的治疗量提高10点，并且可以治疗生物和机械单位。     |
| Lv6 进化腔升级包  | 6  | evolutionchamberresearch:11  | -    | 在进化腔中解锁以下升级： / 允许孵化场、虫穴和主巢同时生成两只虫后。使虫后的速效哺液的治疗量提高10点，并且可以治疗生物和机械单位。     |
| Lv9 感染深渊升级包 | 9  | AbathurDeepTunnel:           | -    | 在感染深渊中解锁以下升级： / 解锁虫群宿主的深槽虫道技能，使其能快速潜地前往目标位置。解锁飞蛇的麻痹勾刺技能，延长其绑架技能造成的昏迷时间。 |
| Lv9 感染深渊升级包 | 9  | InfestationPitResearch:9     | -    | 在感染深渊中解锁以下升级： / 解锁虫群宿主的深槽虫道技能，使其能快速潜地前往目标位置。解锁飞蛇的麻痹勾刺技能，延长其绑架技能造成的昏迷时间。 |
| Lv9 感染深渊升级包 | 9  | InfestationPitResearch:11    | -    | 在感染深渊中解锁以下升级： / 解锁虫群宿主的深槽虫道技能，使其能快速潜地前往目标位置。解锁飞蛇的麻痹勾刺技能，延长其绑架技能造成的昏迷时间。 |
| Lv11 尖塔升级包  | 11 | SpireResearch:10             | -    | 在尖塔和巨型尖塔中解锁以下升级： / 提升守护者的攻击射程。使吞噬者的攻击可以造成范围伤害。升级异龙的攻击，对重甲单位造成100%加成伤害。  |
| Lv11 尖塔升级包  | 11 | SpireResearch:11             | -    | 在尖塔和巨型尖塔中解锁以下升级： / 提升守护者的攻击射程。使吞噬者的攻击可以造成范围伤害。升级异龙的攻击，对重甲单位造成100%加成伤害。  |
| Lv11 尖塔升级包  | 11 | SpireResearch:8              | -    | 在尖塔和巨型尖塔中解锁以下升级： / 提升守护者的攻击射程。使吞噬者的攻击可以造成范围伤害。升级异龙的攻击，对重甲单位造成100%加成伤害。  |

### command card 命中

| 对象 | 按钮/Face        | 显示名 | AbilityCmd                      | Requirement | 说明                                                                                                                                              |
| -- | -------------- | --- | ------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| 飞蛇 | `ViperConsume` | 吞噬  | `ViperConsumeStructure,Execute` | -           | 缠绕目标建筑，造成{-1 \* (Effect,ViperConsumeStructureModifyTarget,VitalArray\[0].Change \* Effect,ViperConsumeStructureCreatePersistent,PeriodCount)... |

实现备注：面板只注册 profile 和转发 caster，地图不得按 commander 写 if/else。精通和威望影响面板冷却、充能、费用时，由本模块接收最终 modifier。

## 02. 英雄单位及其技能

Owner：`CommanderHeroProfile`、`CommanderHeroModeProfile`、`CommanderHeroAbilityProfile`、`CommanderHeroSkillTreeProfile`、`CommanderHeroReviveProfile`、`CommanderHeroModifierProfile`。

### 英雄单位清单

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注                                                                       |
| -- | ---------- | ------- | -- | -------- | ------------------------------------------------------------------------ |
| -  | -          | -       | -  | -        | 官方 heroes.json 暂无条目；召唤物、形态、特殊英雄需从 progression、command\_cards 或 CASC 继续追。 |

### 英雄技能按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明                                                           |
| -- | ------- | --- | ---------- | ----------- | ------------------------------------------------------------ |
| -  | -       | -   | -          | -           | command\_cards.json 未命中 heroes.json 对象按钮；英雄技能需从 CASC 或实机日志补。 |

### 英雄形态/模式候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明              |
| -- | ------- | --- | ---------- | ----------- | --------------- |
| -  | -       | -   | -          | -           | 未自动命中英雄形态或模式按钮。 |

### 英雄相关等级解锁

| 等级 | 名称 | 升级 | AbilityCmd | 说明                             |
| -- | -- | -- | ---------- | ------------------------------ |
| -  | -  | -  | -          | 未自动命中英雄相关等级解锁；需要从 CASC 或实机日志补。 |

口径：heroes.json 当前没有条目；终极进化、莽兽、利维坦先按特殊机制和进化候选整理，是否提升为英雄由 HeroProfile 闭包确认。

待审计：Hero Unit、Ability、Behavior、Weapon、Actor、Sound、复活/重生、能量/资源、形态切换和威望改写闭包。

## 03. 普通单位技能及其进化功能

Owner：`CommanderUnitAbilityProfile`、`CommanderUnitStatProfile`、`CommanderUnitEvolutionProfile`、`CommanderUnitBehaviorProfile`、`CommanderUnitWeaponProfile`。

### 单位技能按钮候选

注意：本表是早期 `command_cards.json` 自动候选输入，不等同于满级有效实现表。共享卡污染需要过滤，例如 `Mutalisk` 上的 `StukovInfestedWildMutation` 不是阿巴瑟技能，破坏者也必须使用 `RavagerAbathurCorrosiveBile` 而不是普通 `RavagerCorrosiveBile`。满级实现以本节后面的“满级有效单位技能链补充”为准。

| 对象      | 按钮/Face                       | 显示名                 | AbilityCmd                            | Requirement                        | 说明                                                                     |
| ------- | ----------------------------- | ------------------- | ------------------------------------- | ---------------------------------- | ---------------------------------------------------------------------- |
| 守护者     | `GuardianAttackRangeIncrease` | 加长散射                | -                                     | `HaveGuardianAttackRangeIncrease`  | 守护者的攻击射程提高{Upgrade,GuardianAttackRangeIncrease,EffectArray\[0].Value}。 |
| 守护者     | `EvolveToLeviathanLocked`     | 进化为利维坦              | -                                     | `AbathurLevel02`                   | 该技能将在指挥官等级2时解锁。                                                        |
| 守护者     | `BiomassPassiveEmpty`         | 生物质搜集               | -                                     | `BiomassBuffEmptyVisible`          | 该单位可以通过击杀敌方单位搜集生物质来获得能量。                                               |
| 吞噬者     | `DevourerAoEDamage`           | 腐蚀喷涌                | -                                     | `HaveDevourerAoEDamage`            | 吞噬者攻击现在会造成范围性伤害。                                                       |
| 吞噬者     | `CorrosiveAcidDevourer`       | 腐蚀强酸                | `CorrosiveAcid,Execute`               | -                                  | 对目标区域内的所有敌方单位发射强酸，降低他们的攻击速度和护甲。叠加3次。                                   |
| 吞噬者     | `EvolveToLeviathanLocked`     | 进化为利维坦              | -                                     | `AbathurLevel02`                   | 该技能将在指挥官等级2时解锁。                                                        |
| 吞噬者     | `BiomassPassiveEmpty`         | 生物质搜集               | -                                     | `BiomassBuffEmptyVisible`          | 该单位可以通过击杀敌方单位搜集生物质来获得能量。                                               |
| 异龙      | `-`                           | -                   | -                                     | -                                  | -                                                                      |
| 异龙（排除）  | `StukovInfestedWildMutation`  | 斯托科夫 感染体 野性突变       | `StukovInfestedWildMutation,Execute`  | -                                  | 共享卡污染，不计入阿巴瑟满级有效技能链。                                                   |
| 异龙      | `EvolveToLeviathanLocked`     | 进化为利维坦              | -                                     | `AbathurLevel02`                   | 该技能将在指挥官等级2时解锁。                                                        |
| 异龙      | `BiomassPassiveEmpty`         | 生物质搜集               | -                                     | `BiomassBuffEmptyVisible`          | 该单位可以通过击杀敌方单位搜集生物质来获得能量。                                               |
| 异龙      | `MorphtoDevourer`             | -                   | `MutaliskMorphToDevourer,Train1`      | -                                  | 强大的对空飞行单位。可以使用腐蚀强酸。 / 可以对空。                                            |
| 蟑螂      | `GlialReconstitutionPassive`  | 神经胶原重组              | -                                     | `HaveGlialReconstitution`          | 移动速度提高。                                                                |
| 蟑螂      | `ZerglingBurrowMove`          | ZerglingBurrowMove  | -                                     | `HaveOrganicCarapace`              | -                                                                      |
| 蟑螂      | `HotSRoachDamage`             | HotSRoachDamage     | -                                     | `HaveHotSRoachDamage`              | -                                                                      |
| 蟑螂      | `HotSRoachShield`             | HotSRoachShield     | -                                     | `HaveHotSRoachShield`              | -                                                                      |
| 蟑螂      | `-`                           | -                   | -                                     | -                                  | -                                                                      |
| 蟑螂（满级前） | `Ravager`                     | 变异为破坏者              | `MorphRoachToRavager,Train1`          | -                                  | 满级有效主链改走 `RoachVile` -> `MorphRoachVileToRavager`。                     |
| 蟑螂      | `DeepTunnelLocked`            | 深槽虫道                | -                                     | `AbathurLevel09DeepTunnelImproved` | 该技能将在指挥官等级9时解锁。                                                        |
| 蟑螂      | `EvolveToBrutaliskLocked`     | 进化为莽兽               | -                                     | `AbathurLevel02`                   | 该技能将在指挥官等级2时解锁。                                                        |
| 蟑螂      | `BiomassPassiveEmpty`         | 生物质搜集               | -                                     | `BiomassBuffEmptyVisible`          | 该单位可以通过击杀敌方单位搜集生物质来获得能量。                                               |
| 蟑螂（排除）  | `BurrowUp`                    | 出地                  | -                                     | -                                  | 候选表遗留；满级有效蟑螂以 `RoachVile` 表为准，不从本行接潜地/出地能力。                            |
| 虫群宿主    | `-`                           | -                   | -                                     | -                                  | -                                                                      |
| 虫群宿主    | `LocustLaunch`                | -                   | `LocustLaunch,Execute`                | -                                  | -                                                                      |
| 虫群宿主    | `DeepTunnelLocked`            | 深槽虫道                | -                                     | `AbathurLevel09`                   | 该技能将在指挥官等级9时解锁。                                                        |
| 虫群宿主    | `EvolveToBrutaliskLocked`     | 进化为莽兽               | -                                     | `AbathurLevel02`                   | 该技能将在指挥官等级2时解锁。                                                        |
| 虫群宿主    | `BiomassPassiveEmpty`         | 生物质搜集               | -                                     | `BiomassBuffEmptyVisible`          | 该单位可以通过击杀敌方单位搜集生物质来获得能量。                                               |
| 虫群宿主    | `AbathurDeepTunnel`           | 深槽虫道                | `AbathurDeepTunnel,Execute`           | -                                  | 快速潜地前往可见目标位置。                                                          |
| 虫群宿主    | `SwarmHostRootBurrow`         | SwarmHostRootBurrow | `MorphToSwarmHostBurrowed,Execute`    | -                                  | -                                                                      |
| 蟑螂      | `-`                           | -                   | -                                     | -                                  | -                                                                      |
| 蟑螂      | `-`                           | -                   | -                                     | `HaveOrganicCarapace`              | -                                                                      |
| 蟑螂（满级前） | `Ravager`                     | 变异为破坏者              | `MorphRoachToRavager,Train1`          | -                                  | 满级有效主链改走 `RoachVile` -> `MorphRoachVileToRavager`。                     |
| 蟑螂      | `VilePassive`                 | VilePassive         | -                                     | -                                  | -                                                                      |
| 蟑螂      | `GlialReconstitutionPassive`  | 神经胶原重组              | -                                     | `HaveGlialReconstitution`          | 移动速度提高。                                                                |
| 蟑螂      | `ZerglingBurrowMove`          | ZerglingBurrowMove  | -                                     | `HaveOrganicCarapace`              | -                                                                      |
| 蟑螂      | `-`                           | -                   | -                                     | -                                  | -                                                                      |
| 蟑螂      | `HotSRoachShield`             | HotSRoachShield     | -                                     | `HaveHotSRoachShield`              | -                                                                      |
| 蟑螂      | `Ravager`                     | 变异为破坏者              | `MorphRoachVileToRavager,Train1`      | -                                  | 远程火炮单位。可以使用腐蚀胆汁。 / 可以对地。                                               |
| 蟑螂      | `DeepTunnelLocked`            | 深槽虫道                | -                                     | `AbathurLevel09DeepTunnelImproved` | 该技能将在指挥官等级9时解锁。                                                        |
| 蟑螂      | `EvolveToBrutaliskLocked`     | 进化为莽兽               | -                                     | `AbathurLevel02`                   | 该技能将在指挥官等级2时解锁。                                                        |
| 蟑螂      | `BiomassPassiveEmpty`         | 生物质搜集               | -                                     | `BiomassBuffEmptyVisible`          | 该单位可以通过击杀敌方单位搜集生物质来获得能量。                                               |
| 蟑螂      | `BrutaliskDeepTunnel`         | 深槽虫道                | `AbathurDeepTunnelImproved,Execute`   | -                                  | 快速潜地前往目标位置。                                                            |
| 破坏者     | `RavagerAbathurCorrosiveBile` | 腐蚀胆汁                | `RavagerAbathurCorrosiveBile,Execute` | -                                  | 阿巴瑟专用破坏者技能；不要接普通 `RavagerCorrosiveBile`。                               |
| 破坏者     | `BurrowDown`                  | 潜地                  | `BurrowRavagerAbathurDown,Execute`    | -                                  | 阿巴瑟破坏者潜地能力；不要接雷兽潜地命令。                                                  |
| 破坏者     | `BurrowUp`                    | 出地                  | `BurrowRavagerAbathurUp,Execute`      | -                                  | 阿巴瑟破坏者出地能力；需和潜地单位形态一起核对。                                               |
| ...     | ...                           | ...                 | ...                                   | ...                                | 还有 23 项，后续从 command\_cards.json 继续展开。                                  |

### 进化/形态/切换候选

| 对象      | 按钮/Face                   | 显示名                 | AbilityCmd                         | Requirement           | 说明                                                 |
| ------- | ------------------------- | ------------------- | ---------------------------------- | --------------------- | -------------------------------------------------- |
| 守护者     | `EvolveToLeviathanLocked` | 进化为利维坦              | -                                  | `AbathurLevel02`      | 该技能将在指挥官等级2时解锁。                                    |
| 吞噬者     | `EvolveToLeviathanLocked` | 进化为利维坦              | -                                  | `AbathurLevel02`      | 该技能将在指挥官等级2时解锁。                                    |
| 异龙      | `EvolveToLeviathanLocked` | 进化为利维坦              | -                                  | `AbathurLevel02`      | 该技能将在指挥官等级2时解锁。                                    |
| 异龙      | `MorphtoDevourer`         | -                   | `MutaliskMorphToDevourer,Train1`   | -                     | 强大的对空飞行单位。可以使用腐蚀强酸。 / 可以对空。                        |
| 蟑螂      | `ZerglingBurrowMove`      | ZerglingBurrowMove  | -                                  | `HaveOrganicCarapace` | -                                                  |
| 蟑螂（满级前） | `Ravager`                 | 变异为破坏者              | `MorphRoachToRavager,Train1`       | -                     | 满级有效主链改走 `RoachVile` -> `MorphRoachVileToRavager`。 |
| 蟑螂      | `EvolveToBrutaliskLocked` | 进化为莽兽               | -                                  | `AbathurLevel02`      | 该技能将在指挥官等级2时解锁。                                    |
| 蟑螂（排除）  | `BurrowUp`                | 出地                  | -                                  | -                     | 候选表遗留；满级有效蟑螂以 `RoachVile` 表为准，不从本行接潜地/出地能力。        |
| 脊针爬虫    | `SpineCrawlerUproot`      | 站起                  | `SpineCrawlerUproot,Execute`       | -                     | 使脊针爬虫站起。站起的脊针爬虫能够移动，但无法攻击。在菌毯上的移动速度大幅提升。           |
| 孢子爬虫    | `SporeCrawlerUproot`      | 站起                  | `SporeCrawlerUproot,Execute`       | -                     | 使孢子爬虫站起。站起的孢子爬虫能够移动，但无法攻击。在菌毯上的移动速度大幅提升。           |
| 虫群宿主    | `EvolveToBrutaliskLocked` | 进化为莽兽               | -                                  | `AbathurLevel02`      | 该技能将在指挥官等级2时解锁。                                    |
| 虫群宿主    | `SwarmHostRootBurrow`     | SwarmHostRootBurrow | `MorphToSwarmHostBurrowed,Execute` | -                     | -                                                  |
| 蟑螂（满级前） | `Ravager`                 | 变异为破坏者              | `MorphRoachToRavager,Train1`       | -                     | 满级有效主链改走 `RoachVile` -> `MorphRoachVileToRavager`。 |
| 蟑螂      | `ZerglingBurrowMove`      | ZerglingBurrowMove  | -                                  | `HaveOrganicCarapace` | -                                                  |
| 蟑螂      | `Ravager`                 | 变异为破坏者              | `MorphRoachVileToRavager,Train1`   | -                     | 远程火炮单位。可以使用腐蚀胆汁。 / 可以对地。                           |
| 蟑螂      | `EvolveToBrutaliskLocked` | 进化为莽兽               | -                                  | `AbathurLevel02`      | 该技能将在指挥官等级2时解锁。                                    |
| 破坏者     | `BurrowDown`              | 潜地                  | `BurrowRavagerAbathurDown,Execute` | -                     | 阿巴瑟破坏者潜地能力；不要接雷兽潜地命令。                              |
| 破坏者     | `BurrowUp`                | 出地                  | `BurrowRavagerAbathurUp,Execute`   | -                     | 阿巴瑟破坏者出地能力；需和 `RavagerAbathurBurrowed` 形态一起核对。     |
| 飞蛇      | `EvolveToLeviathanLocked` | 进化为利维坦              | -                                  | `AbathurLevel02`      | 该技能将在指挥官等级2时解锁。                                    |
| 莽兽      | `BurrowDown`              | 潜地                  | `BurrowBrutaliskAbathurDown,Execute` | -                     | 当前 Mod 私有莽兽潜地链；不能回落到公共 `BurrowBrutaliskDown`。                     |

实现备注：单位自身声明技能、被动、武器、Behavior 和升级后替换关系；科技建筑只触发研究，不在科技建筑内部判断所有兵种 if/else。

## 04. 初始化基地与特殊建筑

Owner：`CommanderBaseInitProfile`、`CommanderOpeningLoadoutProfile`、`CommanderSpecialStructureProfile`、`CommanderInitHookProfile`。

### 初始化建筑候选

| 名称   | Catalog ID     | 解析 Unit        | 属性                                                     | 费用/人口/生命                        | 备注                  |
| ---- | -------------- | -------------- | ------------------------------------------------------ | ------------------------------- | ------------------- |
| 脊针爬虫 | `SpineCrawler` | `SpineCrawler` | Ground; Armored/Biological/Structure; Structure; Melee | 矿:150 气:- 人口:- 生命:300 护盾:- 能量:- | 对地防御建筑。 / 可以对地。     |
| 孢子爬虫 | `SporeCrawler` | `SporeCrawler` | Ground; Armored/Biological/Structure; Structure; Melee | 矿:125 气:- 人口:- 生命:300 护盾:- 能量:- | 防空建筑。 / 可以对空 / 侦测单位 |

### 初始化/建造按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明       |
| -- | ------- | --- | ---------- | ----------- | -------- |
| -  | -       | -   | -          | -           | 暂无自动命中项。 |

实现备注：地图初始化只传 commander、出生点和场景语义；基地、工人、特殊建筑、初始科技和补给由本指挥官 initializer 自己组装。

## 05. 指挥官兵种

Owner：`CommanderRosterProfile`、`CommanderUnitFactoryProfile`、`CommanderUnitReplacementProfile`、`CommanderLevelStageRosterProfile`。

### 当前 units.json 兵种清单

| 名称   | Catalog ID        | 解析 Unit                                  | 属性                                                    | 费用/人口/生命                             | 备注                                                                                                                                             |
| ---- | ----------------- | ---------------------------------------- | ----------------------------------------------------- | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| 守护者  | `AbathurGuardian` | `GuardianMP`                             | Air; Armored/Biological/Massive; Unit; FactionEvolved | 矿:150 气:200 人口:-2 生命:150 护盾:- 能量:-   | 超远距离对地空军。 / 可以对地。                                                                                                                              |
| 吞噬者  | `Devourer`        | `Devourer`                               | Unit; FactionEvolved                                  | 矿:- 气:- 人口:- 生命:- 护盾:- 能量:-          | 强大的对空飞行单位。可以使用腐蚀强酸。 / 可以对空。                                                                                                                    |
| 异龙   | `Mutalisk`        | `Mutalisk, Spire`                        | Air; Biological/Light; Unit; Melee                    | 矿:100 气:100 人口:-2 生命:120 护盾:- 能量:-   | 飞行生物。能够利用弹射攻击同时伤害多个目标。 / 可以对地和对空。                                                                                                              |
| 蟑螂   | `Roach`           | `Roach, RoachWarren`                     | Ground; Armored/Biological; Unit; Melee               | 矿:75 气:25 人口:-2 生命:145 护盾:- 能量:-     | 突击单位。潜地后能快速恢复生命值。可以变异为破坏者。 / 可以对地。                                                                                                             |
| 虫群宿主 | `SwarmHost`       | `SwarmHost, InfestationPit, SwarmHostMP` | Unit                                                  | 矿:- 气:- 人口:- 生命:- 护盾:- 能量:-          | 孵化2只蝗虫。蝗虫有{Behavior,LocustMPTimedLife,Duration}秒的限时生命。 / 可以对地。                                                                                 |
| 虫后   | `SwarmQueen`      | `SwarmQueen, Queen, QueenCoop`           | Unit                                                  | 矿:- 气:- 人口:- 生命:- 护盾:- 能量:-          | 支援单位。可以使用孵化菌毯肿瘤和速效哺液技能。 / 可以对地和对空。                                                                                                             |
| 蟑螂   | `RoachCorpser`    | `RoachCorpser, RoachWarren`              | Unit                                                  | 矿:- 气:- 人口:- 生命:145 护盾:- 能量:-        | 蟑螂所伤的敌人若被迅速消灭后，会生成两只小蟑螂。                                                                                                                       |
| 蟑螂   | `RoachVile`       | `RoachVile, RoachWarren`                 | Unit; FactionEvolved                                  | 矿:- 气:- 人口:- 生命:145 护盾:- 能量:-        | 攻击能使敌人的移动和攻击速度降低{(1 - Behavior,VileAcidSlowFlatAmount,Modification.MoveSpeedMultiplier) \* 100}%。英雄单位的移动和攻击速度降低{(1 - Behavior,VileAcidSlow\... |
| 破坏者  | `Ravager`         | `Ravager`                                | Ground; Biological; Unit; Melee                       | 矿:100 气:0 人口:-3 生命:120 护盾:- 能量:-     | 远程火炮单位。可以使用腐蚀胆汁。 / 可以对地。                                                                                                                       |
| 飞蛇   | `Viper`           | `Viper`                                  | Air; Psionic; Unit; Melee                             | 矿:100 气:200 人口:-3 生命:150 护盾:- 能量:200 | 飞行的施法者，战地的控场大师。可使用寄生弹、吞噬、蔽目毒云和绑架技能。                                                                                                            |
| 莽兽   | `Brutalisk`       | `Brutalisk`                              | Unit; FactionEvolved                                  | 矿:500 气:300 人口:- 生命:- 护盾:- 能量:-      | 重型突击巨兽，其体型和力量均远超雷兽。 / 可以对地和对空                                                                                                                  |
| 利维坦  | `Leviathan`       | `Leviathan, HotSLeviathan`               | Unit                                                  | 矿:- 气:- 人口:- 生命:- 护盾:- 能量:-          | 统治天空的巨型飞行怪兽。 / 可以对空和对地。                                                                                                                        |

### roster 中未归入 units/buildings/heroes 的对象

| 名称 | Catalog ID | 解析 Unit | 属性 | 备注                 |
| -- | ---------- | ------- | -- | ------------------ |
| -  | -          | -       | -  | roster 中没有额外未分类对象。 |

口径：`units.json` 是当前提取出的兵种清单；`roster.json` 仍作为审计入口，用于发现满级后新增、替换、召唤或特殊形态对象。满级之后兵种会变化，测试台默认使用 `power_fusion` 而不是基础 `initial`。

## 06. 指挥官精通

Owner：`CommanderMasteryProfile`、`CommanderMasteryOptionProfile`、`CommanderMasteryModifierProfile`。

### 六项精通 30 点口径

| 组 | 精通             | Upgrade                                   | 每点增量     | 30 点结果   | 说明 |
| - | -------------- | ----------------------------------------- | -------- | -------- | -- |
| 1 | 剧毒巢穴伤害         | `MasteryAbathurToxicNestDamageAndRespawn` | `2`      | +60%     | -  |
| 1 | 愈合治疗持续时间       | `MasteryAbathurMendHeal`                  | `10`     | +300%    | -  |
| 2 | 共生体技能强化        | `MasteryAbathurSymbioteCarapace`          | `3.3298` | +99.894% | -  |
| 2 | 双倍生物质几率        | `MasteryAbathurDoubleBiomass`             | `1.5`    | +45%     | -  |
| 3 | 剧毒巢穴最大充能数和冷却时间 | `MasteryAbathurToxicNestCharge`           | `1`      | +30%     | -  |
| 3 | 建筑变异和研究时间      | `MasteryAbathurTechFastBuild`             | `2`      | -60%     | -  |

实现备注：当前默认六项精通全 30 点，不再做官方互斥取舍；若同一字段被多个精通/威望改写，必须进入 `CommanderModifierStackProfile` 明确叠加顺序。

## 07. 指挥官建筑

Owner：`CommanderBuildingProfile`、`CommanderBuildingAbilityProfile`、`CommanderBuildingReplacementProfile`。

### 当前 buildings.json 建筑清单

| 名称   | Catalog ID     | 解析 Unit        | 属性                                                     | 费用/人口/生命                        | 备注                  |
| ---- | -------------- | -------------- | ------------------------------------------------------ | ------------------------------- | ------------------- |
| 脊针爬虫 | `SpineCrawler` | `SpineCrawler` | Ground; Armored/Biological/Structure; Structure; Melee | 矿:150 气:- 人口:- 生命:300 护盾:- 能量:- | 对地防御建筑。 / 可以对地。     |
| 孢子爬虫 | `SporeCrawler` | `SporeCrawler` | Ground; Armored/Biological/Structure; Structure; Melee | 矿:125 气:- 人口:- 生命:300 护盾:- 能量:- | 防空建筑。 / 可以对空 / 侦测单位 |

### 建筑按钮候选

| 对象   | 按钮/Face              | 显示名  | AbilityCmd                   | Requirement            | 说明                                       |
| ---- | -------------------- | ---- | ---------------------------- | ---------------------- | ---------------------------------------- |
| 脊针爬虫 | `SpineCrawlerUproot` | 站起   | `SpineCrawlerUproot,Execute` | -                      | 使脊针爬虫站起。站起的脊针爬虫能够移动，但无法攻击。在菌毯上的移动速度大幅提升。 |
| 脊针爬虫 | `-`                  | -    | -                            | -                      | -                                        |
| 孢子爬虫 | `SporeCrawlerUproot` | 站起   | `SporeCrawlerUproot,Execute` | -                      | 使孢子爬虫站起。站起的孢子爬虫能够移动，但无法攻击。在菌毯上的移动速度大幅提升。 |
| 孢子爬虫 | `Detector`           | 侦测单位 | -                            | `NotUnderConstruction` | 该单位能够侦测到隐形、潜地和幻像单位。                      |
| 孢子爬虫 | `-`                  | -    | -                            | -                      | -                                        |

实现备注：建筑自己的技能、生产队列、变形、起飞/降落、特殊自动施法由建筑 profile 声明；地图和科技建筑不持有跨指挥官判断。

## 08. 科技建筑及其升级选项

Owner：`CommanderTechBuildingProfile`、`CommanderTechOptionProfile`、`CommanderUpgradeEffectProfile`。

### 官方生产/变异闭包补充（2026-06-03 核对）

来源口径：本节只使用官方数据，主入口是 `游戏数据/官方合作指挥官/commanders/Abathur/*.json`，再回查 `游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/*.xml` 与基础虫族 `liberty/swarm` XML。`Drone` 是共享虫族工蜂，不能把共享卡上所有按钮都直接算作阿巴瑟专属链路。

#### 工蜂建筑菜单

| 归类      | 建筑/按钮                                | AbilityCmd                                        | 官方链路判断                                                                                                             |
| ------- | ------------------------------------ | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| 基础经济    | `Hatchery`                           | `ZergBuild,Build1`                                | 普通虫族基础继承；阿巴瑟仍使用孵化场/虫穴/主巢作为基地链。                                                                                     |
| 基础经济    | `Extractor`                          | `ZergBuild,Build3`                                | 普通气矿建筑。                                                                                                            |
| 明确禁用    | `SpawningPool`                       | `ZergBuild,Build4`                                | `starcoop` 将 `Build4` 置为 `Restricted`，并在工蜂卡上用 `AbathurSpawningPool` 被动覆盖；中文文本为“分裂池已禁用”，提示“阿巴瑟的基础生产设施是蟑螂温室，而不是分裂池。” |
| 基础科技    | `EvolutionChamber`                   | `ZergBuild,Build5`                                | `starcoop` 置为 `Available`；用于阿巴瑟进化腔升级包。                                                                             |
| 主生产科技   | `RoachWarren`                        | `ZergBuild,Build14`                               | `starcoop` 置为 `Available`；`HaveBanelingNest2` 在 `starcoop` 中实际映射到 `CountUnitAlias_RoachWarren`，因此蟑螂链以蟑螂温室为核心。      |
| 防御建筑    | `SpineCrawler`                       | `ZergBuild,Build15`                               | `starcoop` 置为 `Available`；官方 `buildings.json` 明确列为阿巴瑟建筑。                                                           |
| 防御建筑    | `SporeCrawler`                       | `ZergBuild,Build16`                               | `starcoop` 置为 `Available`；官方 `buildings.json` 明确列为阿巴瑟建筑。                                                           |
| 空军科技    | `Spire`                              | `ZergBuild,Build7`                                | `starcoop` 置为 `Available`；异龙由幼虫在尖塔后变异。                                                                             |
| 空军高阶    | `GreaterSpire`                       | `UpgradeToGreaterSpire,Execute`                   | 不是工蜂直接建造；由 `Spire` 变形，基础要求 `HaveHive`，守护者/吞噬者要求 `HaveGreaterSpire`。                                                |
| 施法/宿主科技 | `InfestationPit`                     | `ZergBuild,Build9`                                | `starcoop` 置为 `Available`；飞蛇和虫群宿主的幼虫变异要求 `HaveInfestationPit`。                                                     |
| 基地高阶    | `Lair` / `Hive`                      | `UpgradeToLair,Execute` / `UpgradeToHive,Execute` | `starcoop` 将两者 Execute 置为 `Available`，用于绕开普通虫族“分裂池/感染深渊”前置的阿巴瑟链。                                                   |
| 明确不计入   | `NydusNetwork`                       | `ZergBuild,Build10`                               | 不在官方 `commanders/Abathur/buildings.json` 中，也不解锁阿巴瑟满级主战单位；共享 `ZergBuild` 或继承链痕迹不能当作阿巴瑟有效建筑。                         |
| 共享卡遗留   | `BanelingNest` / `UltraliskCavern`   | `ZergBuild,Build11` / `ZergBuild,Build8`          | XML 上 `starcoop` 置为 `Available`，但阿巴瑟官方 `units.json`/等级链没有以它们为生产前置的主战单位；实现时不要用它们解锁阿巴瑟兵种。                            |
| 共享卡污染   | `ScourgeNest` / `ZagaraBileLauncher` | `ZergBuild,Build25` / `ZergBuild,Build27`         | 这是共享 `Drone` 卡上的扎加拉链路，不应计入阿巴瑟。                                                                                     |
| 明确不走    | `HydraliskDen`                       | `ZergBuild,Build6`                                | `starcoop` 置为 `Restricted`；阿巴瑟没有刺蛇主链。                                                                              |

#### 幼虫与单位生产

| 单位                     | 来源                           | AbilityCmd                                                  | 解锁建筑/要求                                             | 备注                                                                         |
| ---------------------- | ---------------------------- | ----------------------------------------------------------- | --------------------------------------------------- | -------------------------------------------------------------------------- |
| `Drone`                | `Larva`                      | `LarvaTrain,Train1`                                         | 基地基础链                                               | 经济单位；不是阿巴瑟主战单位。                                                            |
| `Overlord`             | `Larva`                      | `LarvaTrain,Train3`                                         | 基地基础链                                               | 补给单位；不是阿巴瑟主战单位。                                                            |
| `Roach`                | `Larva`                      | `LarvaTrain,Train10`                                        | `HaveBanelingNest2`，在 `starcoop` 中映射为 `RoachWarren` | 只作为满级前训练入口/差异审计；满级有效蟑螂必须落到 `RoachVile`，不要把 `Roach` 当最终可投放或最终科技链单位。         |
| `RoachVile`            | 等级替换/进化                      | `MorphRoachVileToRavager,Train1` 等后续按钮挂在本单位上                | 14 级 `AbathurRoachEvolutionVile`                    | “蟑螂进化：秽型虫”；这是阿巴瑟满级唯一有效蟑螂主线。                                                |
| `RoachCorpser`         | 外部/遗留候选                      | `LarvaTrainSwarm,Train20`（官方 XML 中该 InfoArray 被注释）          | `HaveBanelingNest2`                                 | 出现在官方 TechUnit/roster 文本里，但不进入满级有效主链；实现和投放时先排除。                            |
| `SwarmQueen` / `Queen` | `Hatchery` / `Lair` / `Hive` | `TrainQueen,Train1`，另有 `TrainQueen,Train4` 的 `QueenCoop` 分支 | 城镇大厅训练；`commander.json` 默认启用 `TrainQueen`           | `TrainQueen,Train4` 在 XML 仍有普通虫族 `HaveSpawningPool` 遗留语义，阿巴瑟主链应落到城镇大厅训练闭包。 |
| `Mutalisk`             | `Larva`                      | `LarvaTrain,Train5`                                         | `HaveSpire`                                         | 空军基础单位。                                                                    |
| `SwarmHostMP`          | `Larva`                      | `LarvaTrain,Train16`                                        | `HaveInfestationPit`                                | 虫群宿主主链；`Train15` 是普通 HotS 旧分支，不作为阿巴瑟主入口。                                   |
| `Viper`                | `Larva`                      | `LarvaTrain,Train13`                                        | `HaveInfestationPit`                                | `starcoop` 将飞蛇生产时间改为 29，并把要求落到感染深渊；8 级解锁“新单位：飞蛇”。                          |

#### 进化/变异单位

| 目标单位                          | 来源单位                                                            | AbilityCmd                       | 要求/说明                                                                                                                  |
| ----------------------------- | --------------------------------------------------------------- | -------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `RavagerAbathur`              | `RoachVile`                                                     | `MorphRoachVileToRavager,Train1` | 满级有效主入口；9 秒；按钮 `Ravager`；要求 `HaveLair`；使用 `RavagerVileAbathurCocoon`。                                                  |
| `RavagerAbathur`              | `Roach` / `RoachCorpser`                                        | `MorphRoachToRavager,Train1`     | 满级前/遗留审计入口；不要作为阿巴瑟满级实现主链。                                                                                              |
| `AbathurGuardian`             | `MutaliskAbathur`                                               | `MutaliskMorphToGuardian,Train1` | 15 秒；要求 `HaveGreaterSpire`；当前 Mod 输出私有守护者，不输出公共 `GuardianMP`。                                                                  |
| `DevourerAbathur`             | `MutaliskAbathur`                                               | `MutaliskMorphToDevourer,Train1` | 15 秒；要求 `HaveGreaterSpire`；当前 Mod 输出私有吞噬者，不输出公共 `Devourer`。                                                                  |
| `BrutaliskAbathur`            | 满级有效地面/生物质单位：`RoachVile`、`RavagerAbathur`、`SwarmHostAbathur` 等 | `EvolveToBrutalisk*`             | 5 秒；`BrutaliskMorphAvailable` 要求 2 级终极进化、未选择禁用终极进化的生物质威望，并满足生物质/数量限制。`Roach`、`RoachCorpser`、`DefilerMP` 分支只作审计，不进满级主链。 |
| `LeviathanAbathur`            | 空中/生物质单位：`MutaliskAbathur`、`AbathurGuardian`、`DevourerAbathur`、`ViperAbathur` | `EvolveToLeviathan*`             | 5 秒；`LeviathanMorphAvailable` 要求 2 级终极进化、未选择禁用终极进化的生物质威望，并满足生物质/数量限制。`Leviathan` 按终极进化单位处理，不按英雄处理；当前 Mod 不输出公共 `HotSLeviathan`。 |

实现提醒：阿巴瑟如果在当前 Mod 中私有化经济链，应优先私有化 `Drone/ZergBuild/LarvaTrain/TrainQueen`，并把 `SpawningPool disabled`、`HaveBanelingNest2 -> RoachWarren`、`Viper/SwarmHost -> InfestationPit`、`Guardian/Devourer -> GreaterSpire`、`Ravager -> Lair` 这些官方闭包一并带过去。

#### 满级有效单位技能链补充

口径：以下只列满级 `power_fusion` 有效链路。基础攻击、移动、停止等通用命令不列；锁定按钮只在说明列提示，不作为最终可用技能。

| 满级单位                          | 按钮/Face                             | AbilityCmd                             | Ability / Effect 闭包                                                                                                                                                                                                                                      | 冷却/范围/资源                                                                        | 实现验收点                                                                     |
| ----------------------------- | ----------------------------------- | -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `RoachVile`                   | `Ravager`                           | `MorphRoachVileToRavager,Train1`       | `CAbilTrain MorphRoachVileToRavager` -> `RavagerVileAbathurCocoon` -> `RavagerAbathur`                                                                                                                                                                   | 9 秒；要求 `HaveLair`                                                               | 满级只从 `RoachVile` 接破坏者，不从 `Roach` 或 `RoachCorpser` 接主链。                    |
| `RoachVile`                   | `BrutaliskDeepTunnel`               | `AbathurDeepTunnelImproved,Execute`    | `AbathurDeepTunnelImproved` -> `AbathurDeepTunnelCU`                                                                                                                                                                                                     | 冷却 30；范围 500；施法引导 2 秒，收尾 1 秒，完成 0.5 秒；要求 `HaveAbathurImpalerDeepTunnelImproved` | 按当前威望正向融合口径可作为深槽虫道能力；如果实现纯非威望阿巴瑟，需要重新过滤该 Requirement。                     |
| `RoachVile`                   | `EvolveToBrutalisk`                 | `EvolveToBrutaliskRoachVile,Train1`    | parent `EvolveToBrutalisk` -> `BrutaliskCocoonRoachVile` -> `BrutaliskAbathur`                                                                                                                                                                           | 5 秒；要求 `BrutaliskMorphAvailable`                                                | 终极进化数量、生物质和禁用终极进化威望都要进 Requirement 验收；当前 Mod 输出私有莽兽。                                    |
| `RavagerAbathur`              | `RavagerAbathurCorrosiveBile`       | `RavagerAbathurCorrosiveBile,Execute`  | `RavagerCorrosiveBileAoeLaunchSet` -> `RavagerCorrosiveBileAoeCP` -> `RavagerCorrosiveBileAoeLaunchDown` -> `RavagerCorrosiveBileAoeSearch` -> `RavagerCorrosiveBileAoeSet` -> `RavagerCorrosiveBileAoeDamage` + `RavagerCorrosiveBileAoeForceFieldKill` | 冷却 10；范围 12；基础伤害 60；基础命中半径 0.5                                                  | 这是阿巴瑟专用链；不能接普通 `RavagerCorrosiveBile`。满级研究后伤害升级应 +40，范围升级应把搜索/光标半径置为 1.5。 |
| `RavagerAbathur`              | `BurrowDown`                        | `BurrowRavagerAbathurDown,Execute`     | `BurrowRavagerAbathurDown` -> `RavagerAbathurBurrowed`                                                                                                                                                                                                   | 通用潜地链                                                                           | 必须和 `RavagerAbathurBurrowed` 的出地、深槽虫道、终极进化按钮一起验证，否则会出现潜地后断技能。             |
| `RavagerAbathur`              | `BrutaliskDeepTunnel`               | `AbathurDeepTunnelImproved,Execute`    | `AbathurDeepTunnelImproved` -> `AbathurDeepTunnelCU`                                                                                                                                                                                                     | 冷却 30；范围 500；要求 `HaveAbathurImpalerDeepTunnelImproved`                          | 满级/威望正向融合下可用；按钮存在不代表 Requirement 已满足。                                     |
| `RavagerAbathur`              | `EvolveToBrutalisk`                 | `EvolveToBrutaliskRavager,Train1`      | parent `EvolveToBrutalisk` -> `BrutaliskCocoonRavager` -> `BrutaliskAbathur`                                                                                                                                                                             | 5 秒；要求 `BrutaliskMorphAvailable`                                                | 破坏者进莽兽链和腐蚀胆汁链相互独立，不能因变异按钮接上就跳过技能验证。                                       |
| `MutaliskAbathur`             | `MorphToGuardian`                   | `MutaliskMorphToGuardian,Train1`       | `MutaliskMorphToGuardian` -> `GuardianCocoon` -> `AbathurGuardian`                                                                                                                                                                                        | 15 秒；要求 `HaveGreaterSpire`                                                      | command card 抽取可能漏按钮，XML 闭包必须补上；当前 Mod 输出私有守护者。                                          |
| `MutaliskAbathur`             | `MorphtoDevourer`                   | `MutaliskMorphToDevourer,Train1`       | `MutaliskMorphToDevourer` -> `DevourerCocoonMP` -> `DevourerAbathur`                                                                                                                                                                                      | 15 秒；要求 `HaveGreaterSpire`                                                      | 排除 `StukovInfestedWildMutation` 这类共享卡污染；当前 Mod 输出私有吞噬者。                                  |
| `MutaliskAbathur`             | `EvolveToLeviathan`                 | `EvolveToLeviathanMutalisk,Train1`     | parent `EvolveToLeviathan` -> `LeviathanCocoon` -> `LeviathanAbathur`                                                                                                                                                                                     | 5 秒；要求 `LeviathanMorphAvailable`                                                | 利维坦按终极进化单位，不按英雄单位；当前 Mod 输出私有利维坦。                                                        |
| `AbathurGuardian`             | `GuardianAttackRangeIncrease`       | Passive                                | `GuardianAttackRangeIncrease` upgrade 被动                                                                                                                                                                                                                 | -                                                                               | 满级应显示/生效守护者射程升级。                                                          |
| `AbathurGuardian`             | `EvolveToLeviathan`                 | `EvolveToLeviathanGuardianMP,Train1`   | parent `EvolveToLeviathan` -> `LeviathanAbathur`                                                                                                                                                                                                          | 5 秒；要求 `LeviathanMorphAvailable`                                                | 守护者来自异龙变异，不是幼虫直出；当前 Mod 输出私有利维坦。                                                         |
| `DevourerAbathur`             | `CorrosiveAcidDevourer`             | `CorrosiveAcid,Execute`                | `CorrosiveAcid` -> `CorrosiveAcidLM`                                                                                                                                                                                                                     | 冷却 45；范围 10；自动施放默认开启                                                            | 吞噬者攻击范围升级和腐蚀强酸都要保留；当前 Mod 实际 UnitData 为 `DevourerAbathur`。          |
| `DevourerAbathur`             | `EvolveToLeviathan`                 | `EvolveToLeviathanDevourer,Train1`     | parent `EvolveToLeviathan` -> `LeviathanAbathur`                                                                                                                                                                                                          | 5 秒；要求 `LeviathanMorphAvailable`                                                | 满级空军终极进化入口之一；当前 Mod 输出私有利维坦。                                                             |
| `SwarmHostAbathur`            | `LocustLaunch`                      | `LocustLaunch,Execute`                 | `LocustLaunch` 蝗虫发射链                                                                                                                                                                                                                                     | 依能力定义                                                                           | 破阵/阵地单位的主技能，不能只接终极进化。                                                     |
| `SwarmHostAbathur`            | `AbathurDeepTunnel`                 | `AbathurDeepTunnel,Execute`            | `AbathurDeepTunnel` -> `AbathurDeepTunnelCU`                                                                                                                                                                                                             | 冷却 30；范围 500；要求 `HaveAbathurImpalerDeepTunnel`                                  | 9 级感染深渊升级包解锁；和改良版深槽虫道分开验证。                                                |
| `SwarmHostAbathur`            | `SwarmHostRootBurrow`               | `MorphToSwarmHostBurrowedAbathur,Execute` | 虫群宿主扎根/潜地形态切换 -> `SwarmHostAbathurBurrowed`                                                                                                                                                                                                      | -                                                                               | 潜地形态也要验证 `EvolveToBrutaliskSwarmHost`，避免形态切换后按钮丢失。                        |
| `SwarmHostAbathur`            | `EvolveToBrutalisk`                 | `EvolveToBrutaliskSwarmHost,Train1`    | parent `EvolveToBrutalisk` -> `BrutaliskCocoonSwarmhost` -> `BrutaliskAbathur`                                                                                                                                                                            | 5 秒；要求 `BrutaliskMorphAvailable`                                                | 满级地面终极进化入口之一；当前 Mod 输出私有莽兽。                                                             |
| `ViperAbathur`                | `ViperConsume`                      | `ViperConsumeStructure,Execute`        | 吞噬建筑回能链                                                                                                                                                                                                                                                  | 持续 20 秒；能量收益按 `ViperConsumeStructureModifyCaster`                               | 只能以己方建筑为目标；不要让按钮能点但目标过滤错误。                                                |
| `ViperAbathur`                | `FaceEmbrace`                       | `Yoink,Execute`                        | 绑架目标拉取链                                                                                                                                                                                                                                                  | 受飞蛇施法距离/麻痹勾刺升级影响                                                                | 满级应包含 `ViperImprovedCastRange` 和 `ViperAbductImprovedStun` 被动。            |
| `ViperAbathur`                | `ParasiticBomb`                     | `ParasiticBomb,Execute`                | `ParasiticBomb` 施加持续伤害云                                                                                                                                                                                                                                  | 消耗 125 能量；目标过滤为空中可见敌人                                                           | 只能选空中目标；如果地面可点就是过滤错。                                                      |
| `ViperAbathur`                | `EvolveToLeviathan`                 | `EvolveToLeviathanViper,Train1`        | parent `EvolveToLeviathan` -> `LeviathanAbathur`                                                                                                                                                                                                          | 5 秒；要求 `LeviathanMorphAvailable`                                                | 满级空军终极进化入口之一；当前 Mod 输出私有利维坦。                                                             |
| `BrutaliskAbathur`            | `SymbioteCarapace`                  | `SymbioteCarapace,Execute`             | 共生体甲壳护盾                                                                                                                                                                                                                                                  | 持续 8 秒                                                                          | 10 级共生体后必须可用；同时验证 `AbathurSymbioteHangerBrutalisk,Ammo1` 被动。              |
| `BrutaliskAbathur`            | `BrutaliskDeepTunnel`               | `BrutaliskDeepTunnel,Execute`          | `BrutaliskDeepTunnel` -> `BrutaliskDeepTunnelCU`                                                                                                                                                                                                         | 冷却 10；范围 500；不要求目标视野                                                            | 莽兽是终极进化单位，深槽虫道与普通 `AbathurDeepTunnel` 分开。                                 |
| `BrutaliskAbathur`            | `BurrowDown`                        | `BurrowBrutaliskAbathurDown,Execute`   | `BurrowBrutaliskAbathurDown` -> `BrutaliskAbathurBurrowed`                                                                                                                                                                                              | -                                                                               | 潜地后必须保留私有出地链，避免回落到公共 `BrutaliskBurrowed`。                                                      |
| `BrutaliskAbathurBurrowed`    | `BurrowUp`                          | `BurrowBrutaliskAbathurUp,Execute`     | `BurrowBrutaliskAbathurUp` -> `BrutaliskAbathur`                                                                                                                                                                                                        | -                                                                               | 私有莽兽出地链；不能接公共 `BurrowBrutaliskUp`。                                                        |
| `LeviathanAbathur`            | `SymbioteCarapace`                  | `SymbioteCarapace,Execute`             | 共生体甲壳护盾                                                                                                                                                                                                                                                  | 持续 8 秒                                                                          | 利维坦不是英雄，但 UnitData 上有共生体能力。                                               |
| `LeviathanAbathur`            | `AbathurBrutaliskLeviathanSymbiote` | `AbathurSymbioteHangerLeviathan,Ammo1` | 共生体挂载/弹药被动                                                                                                                                                                                                                                               | 要求 `HaveBrutaliskLeviathanSymbiote`                                             | 10 级共生体满级口径下必须生效。                                                         |

满级研究补充：

- `RoachWarrenResearch,Research7` -> `RavagerCorrosiveBileRadiusIncrease`：按钮 `EvolveCorrosiveBileRadiusIncrease`，资源 150/150，时间 90；升级将 `RavagerCorrosiveBileAoeSearch` 和光标半径置为 1.5。
- `RoachWarrenResearch,Research8` -> `RavagerCorrosiveBileDamageIncrease`：按钮 `EvolveCorrosiveBileDamageIncrease`，资源 200/200，时间 120；升级将 `RavagerCorrosiveBileAoeDamage,Amount` 增加 40。
- `AbathurMorphTimeCostReduced`：官方 XML 明确减少 `MorphRoachToRavager`、`MutaliskMorphToDevourer`、`MutaliskMorphToGuardian` 的变异时间和部分单位成本；当前未在 `upgradedata.xml` 里看到对 `MorphRoachVileToRavager` 的直接引用。当前 Mod 如果只走满级 `RoachVile` 链，需要单独验证或补齐秽型虫变破坏者的满级减时/减费效果。

### 15 级解锁与研究命令

| 等级 | 名称       | 解锁升级                                                                                         | 解锁 AbilityCmd                                                                              | 说明                                                                      |
| -- | -------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------- |
| 1  | 生物质收割者   | `SwarmQueenVisual`                                                                           | -                                                                                          | 从死亡的敌人身上搜集生物质可以提升阿巴瑟单位的生命值、攻击速度和能量恢复。蟑螂不消耗高能瓦斯。幼虫孵化速度提高。                |
| 2  | 终极进化     | -                                                                                            | `EvolveToLeviathanMutalisk:`, `EvolveToLeviathanGuardianMP:`, `EvolveToLeviathanDevourer:` | 使用100层生物质解锁地面单位进化成莽兽的技能。空中单位使用100层生物质可以进化成利维坦。                          |
| 3  | 剧毒巢穴     | `AbathurToxicNestIcreasedBiomass`, `AbathurHiddenToxicNest`, `AbathurToxicNestRespawnTalent` | -                                                                                          | 受到剧毒巢穴伤害的敌人掉落额外的生物质，并且攻击和移动速度有所降低。剧毒巢穴有一定几率在死亡时重生。敌人无法选中剧毒巢穴。           |
| 4  | 蟑螂温室升级包  | -                                                                                            | `RoachWarrenResearch:5`, `RoachWarrenResearch:7`                                           | 在蟑螂温室中解锁以下升级： / 蟑螂生命值低于50%时获得+6护甲。破坏者的腐蚀胆汁技能造成的伤害提高40点。                 |
| 5  | 强化愈合     | `AbathurImprovedMend`                                                                        | -                                                                                          | 愈合可以储存最多3次充能，冷却时间缩短30秒。                                                 |
| 6  | 进化腔升级包   | -                                                                                            | `BioMechanicalTransfusion:`, `evolutionchamberresearch:10`, `evolutionchamberresearch:11`  | 在进化腔中解锁以下升级： / 允许孵化场、虫穴和主巢同时生成两只虫后。使虫后的速效哺液的治疗量提高10点，并且可以治疗生物和机械单位。     |
| 7  | 生物质恢复    | `AbathurBiomassRefund`                                                                       | -                                                                                          | 被击杀后，你的单位有50%的几率掉落所有生物质。                                                |
| 8  | 新单位：飞蛇   | -                                                                                            | -                                                                                          | 飞行的施法单位，战地的控场大师。可使用寄生弹、吞噬、蔽目毒云和绑架技能。可以对空。                               |
| 9  | 感染深渊升级包  | -                                                                                            | `AbathurDeepTunnel:`, `InfestationPitResearch:9`, `InfestationPitResearch:11`              | 在感染深渊中解锁以下升级： / 解锁虫群宿主的深槽虫道技能，使其能快速潜地前往目标位置。解锁飞蛇的麻痹勾刺技能，延长其绑架技能造成的昏迷时间。 |
| 10 | 共生体      | `AbathurEnableSymbiote`                                                                      | -                                                                                          | 莽兽和利维坦获得附身的共生体，攻击敌人并使用可吸收伤害的甲壳保护它们的宿主。                                  |
| 11 | 尖塔升级包    | -                                                                                            | `SpireResearch:10`, `SpireResearch:11`, `SpireResearch:8`                                  | 在尖塔和巨型尖塔中解锁以下升级： / 提升守护者的攻击射程。使吞噬者的攻击可以造成范围伤害。升级异龙的攻击，对重甲单位造成100%加成伤害。  |
| 12 | 突变潜能     | `AbathurMorphTimeCostReduced`                                                                | -                                                                                          | 破坏者、守护者、吞噬者的变异时间和资源消耗减少50%。                                             |
| 13 | 蝗虫注射     | `AbathurEnemyDeathCreateLocusts`                                                             | -                                                                                          | 敌方单位在死亡时有一定几率孵化友方蝗虫。                                                    |
| 14 | 蟑螂进化：秽型虫 | -                                                                                            | -                                                                                          | 将阿巴瑟的蟑螂升级成秽型虫变种。 / 突击单位。潜地时能快速恢复生命值。攻击可以削弱目标，降低其攻击和移动速度。 / 可以对地。        |
| 15 | 生质汲取     | `AbathurBiomassLifeLeech`                                                                    | -                                                                                          | 阿巴瑟的单位每拥有一层生物质即可进行自我治疗，数值相当于它们造成伤害的1%。                                  |

### Upgrade 摘要

| Upgrade                                     | 父级                  | 显示名                                 | Effect数 | 说明                                                                                      |
| ------------------------------------------- | ------------------- | ----------------------------------- | ------- | --------------------------------------------------------------------------------------- |
| `AbathurBiomassLifeLeech`                   | `-`                 | 阿巴瑟生物质生命汲取                          | 20      | -                                                                                       |
| `AbathurBiomassRefund`                      | `-`                 | 阿巴瑟生物质返还                            | 1       | -                                                                                       |
| `AbathurCommander`                          | `-`                 | 阿巴瑟                                 | 40      | -                                                                                       |
| `AbathurEnableSymbiote`                     | `-`                 | 阿巴瑟启用共生激素                           | 2       | -                                                                                       |
| `AbathurEnemyDeathCreateLocusts`            | `-`                 | 阿巴瑟 敌人死亡生成蝗虫                        | 0       | -                                                                                       |
| `AbathurHiddenToxicNest`                    | `-`                 | 阿巴瑟隐秘剧毒巢穴                           | 0       | -                                                                                       |
| `AbathurImprovedMend`                       | `-`                 | 强化愈合                                | 7       | -                                                                                       |
| `AbathurMorphTimeCostReduced`               | `-`                 | 变异时间消耗减少                            | 11      | -                                                                                       |
| `AbathurToxicNestIcreasedBiomass`           | `-`                 | 阿巴瑟 剧毒巢穴 增加生物质                      | 2       | -                                                                                       |
| `AbathurToxicNestRespawnTalent`             | `-`                 | 阿巴瑟剧毒巢穴重生天赋                         | 1       | -                                                                                       |
| `CommanderPrestigeAbathurBiomass`           | `CommanderPrestige` | CommanderPrestigeAbathurBiomass     | 2       | 优点 / 战斗单位可以额外持有25层生物质，并且在死亡时有额外50%的几率掉落他们的生物质。 / 缺点 / 终极进化不可用。                          |
| `CommanderPrestigeAbathurDeepTunnel`        | `CommanderPrestige` | CommanderPrestigeAbathurDeepTunnel  | 15      | 优点 / 蝗虫的攻击射程、移动速度和持续时间提高50%。深槽虫道的升级不再需要主巢，不再需要视野，并且蟑螂和破坏者可以使用。 / 缺点 / 战斗单位增加25%的高能瓦斯消耗。 |
| `CommanderPrestigeAbathurDeepTunnelLevel12` | `CommanderPrestige` | -                                   | 4       | -                                                                                       |
| `CommanderPrestigeAbathurUltEvo`            | `CommanderPrestige` | CommanderPrestigeAbathurUltimateEvo | 13      | -                                                                                       |
| `CommanderPrestigeAbathurUltEvoLevel15`     | `CommanderPrestige` | -                                   | 12      | -                                                                                       |
| `MasteryAbathurDoubleBiomass`               | `-`                 | 精通 阿巴瑟 双倍生物质                        | 1       | 敌方单位和建筑有一定几率掉落双倍生物质。                                                                    |
| `MasteryAbathurMendHeal`                    | `-`                 | 精通 阿巴瑟 愈合治疗持续时间                     | 3       | 提高愈合周期性治疗的持续时间。                                                                         |
| `MasteryAbathurSymbioteCarapace`            | `-`                 | 精通 阿巴瑟 共生体甲壳与伤害                     | 3       | 提高共生体技能造成的伤害和吸收的伤害。                                                                     |
| `MasteryAbathurTechFastBuild`               | `-`                 | 精通 阿巴瑟 科技快速建造                       | 132     | 减少变异建筑和研究进化所需要的时间。                                                                      |
| `MasteryAbathurToxicNestCharge`             | `-`                 | 精通 阿巴瑟 剧毒巢穴充能                       | 5       | 提高剧毒巢穴的最大使用次数，并缩短剧毒巢穴的充能冷却时间。 / 每点使冷却时间缩短1%。                                            |
| `MasteryAbathurToxicNestDamageAndRespawn`   | `-`                 | 精通 阿巴瑟 剧毒巢穴伤害                       | 2       | 提高剧毒巢穴的伤害。                                                                              |
| `SwarmQueenVisual`                          | `-`                 | -                                   | 2       | -                                                                                       |

### 研究/升级按钮候选

| 对象  | 按钮/Face                             | 显示名                               | AbilityCmd                             | Requirement                         | 说明                                                                     |
| --- | ----------------------------------- | --------------------------------- | -------------------------------------- | ----------------------------------- | ---------------------------------------------------------------------- |
| 守护者 | `GuardianAttackRangeIncrease`       | 加长散射                              | -                                      | `HaveGuardianAttackRangeIncrease`   | 守护者的攻击射程提高{Upgrade,GuardianAttackRangeIncrease,EffectArray\[0].Value}。 |
| 飞蛇  | `ViperImprovedCastRangePassive`     | 剧毒细菌                              | -                                      | `HaveViperImprovedCastRange`        | 所有飞蛇技能获得+{Upgrade,ViperImprovedCastRange,EffectArray\[0].Value}的施法范围。  |
| 飞蛇  | `ViperAbductImprovedStunPassive`    | 麻痹勾刺                              | -                                      | `HaveViperAbductImprovedStun`       | 绑架使单位昏迷额外{Upgrade,ViperAbductImprovedStun,EffectArray\[0].Value}秒。     |
| 莽兽  | `CommanderAbathurBrutaliskSymbiote` | CommanderAbathurBrutaliskSymbiote | `AbathurSymbioteHangerBrutalisk,Ammo1` | `HaveBrutaliskgainsSymbioteUpgrade` | -                                                                      |

实现备注：科技建筑只负责展示/触发研究；每个单位升级效果由对应 `CommanderUnitTechProfile` 或 `CommanderUpgradeEffectProfile` 声明。

## 09. 特定地图运输机空投单位

Owner：`CommanderCargoLoadoutProfile`、`CommanderMapDropProfile`、`CommanderScenarioFallbackProfile`。

### 原始mod 已有实现线索

| 范围 | 文件                                                                | 已有实现                                                                           | 含义                                   | 迁移状态                                       |
| -- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------ | ------------------------------------ | ------------------------------------------ |
| 通用 | `原始mod/Mods/XM/XMCore.SC2Mod/Base.SC2Data/Lib67C0F0E7.galaxy`     | SOAStickyPoint、SOAStickyLine、AddCasterGroup、DropPodT、DropPodZ、DropCargoAndExit | 已有顶部技能点选、隐藏施法者分组、空投舱视觉和卸载后撤离的通用基础。   | 应抽成 XMFinal 的通用投送 primitive。               |
| 通用 | `原始mod/Mods/XM/XMCore.SC2Mod/Base.SC2Data/GameData/UserData.xml`  | SOAStickyPoint UserData: AbilityPre、AbilityFin、CasterUnit                      | 顶栏点目标技能已经有数据驱动配置位。                   | 可复用为运输/空投顶部技能的配置入口。                        |
| 通用 | `原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/AbilData.xml` | SpecOpsDropshipTransport                                                       | XMFinal 已经持有特种运输机运输能力定义。             | 运行时 owner 优先沿用并参数化。                        |
| 通用 | `原始mod/Maps/XM/thanson01、ttychus01、ttychus04`                     | ColonyShipTransport、SpecialOpsDropship、UnitCargoCreate、卸载后返航/消失                | 地图侧已有运输机货舱、卸载、返航和剧情运输模式。             | 地图保留场景语义，单位组合改由 profile 解析。                |
| 通用 | `原始mod/Maps/XM/thorner04.SC2Map/MapScript.galaxy`                 | gf\_DropKillTeamViaHercules 创建 Hercules、UnitCargoCreate 塞兵、卸货后攻击               | 已有可复用的大力神空投执行器，但主要服务敌方/剧情 kill team。 | 可参考执行流程；不能直接当玩家指挥官 loadout 来源。             |
| 通用 | `原始mod 全局搜索`                                                      | 未命中 XM\_CreateCommanderCargoSquad 或 CommanderCargoLoadoutProfile               | 原始mod 只有素材和地图硬编码，没有现成的指挥官货舱配置框架。     | 本模块需要新建 profile/factory 抽象，不能照搬地图 if/else。 |

### 场景 loadout 设计草案

| ScenarioKind        | 推荐单位                                    | 用途      | 设计说明                                      | 来源状态                       |
| ------------------- | --------------------------------------- | ------- | ----------------------------------------- | -------------------------- |
| `cargo_light`       | Roach x4, SwarmQueen x1                 | 救援/早期运输 | 蟑螂抗线，虫后补治疗，不提前给终极进化。                      | 设计草案；需按原始mod地图流程和实机日志继续校验。 |
| `cargo_heavy`       | Ravager x3, SwarmHost x2, SwarmQueen x1 | 阵地突破    | 用腐蚀胆汁和虫群宿主压阵；Brutalisk 只放 bonus，避免剧情初段过强。 | 设计草案；需按原始mod地图流程和实机日志继续校验。 |
| `cargo_air`         | Mutalisk x6, Viper x1                   | 空中支援    | 异龙负责清杂，飞蛇用于控制；Leviathan 不作为普通空投。          | 设计草案；需按原始mod地图流程和实机日志继续校验。 |
| `bonus_reward`      | Brutalisk x1 或 Leviathan x1             | 奖励/高潮战斗 | 只能在高强度奖励或终局事件使用，并输出特殊机制日志。                | 设计草案；需按原始mod地图流程和实机日志继续校验。 |
| `replacement_squad` | RoachVile x4, Ravager x2                | 满级替换    | 体现 15 级蟑螂变种和破坏者链。                         | 设计草案；需按原始mod地图流程和实机日志继续校验。 |

### 接入规则

- 本模块不再从 `command_cards.json` 的运输/空投按钮自动推导货舱单位，也不把 `units.json` 全量清单当成可投放单位。
- 地图只传入 `mapId`、`scenarioKind`、目标点和运输模式；单位组合由 `CommanderCargoLoadoutProfile` 根据当前 commander、15 级 `power_fusion` roster 和场景限制解析。
- `原始mod` 已有运输机、空投舱、狮鹫运输、医疗运输机、坑道/深挖或感染运输容器时，应优先保留它的流程语义，只把硬编码单位替换为 profile 查询结果。
- 英雄、首领、终极进化、战列巡航舰、航母等高价值单位默认只能用于 `bonus_reward` 或显式允许英雄的地图场景。
  实现备注：`CommanderMapDropProfile` 负责把地图事件映射为 `scenarioKind`；`CommanderScenarioFallbackProfile` 负责缺项降级并输出 `[XM_DBG][WARN][CARGO_FALLBACK]`。

## 10. 指挥官特殊机制

Owner：`CommanderSpecialMechanicProfile`、`CommanderSpecialResourceProfile`、`CommanderSpecialMechanicHookProfile`、`CommanderSpecialMechanicUnitProfile`。

本指挥官重点：生物质、毒巢、终极进化、共生体。

### 特殊机制命中项

- 终极进化 (AbathurUnlockBrutaliskLeviathan)
- 剧毒巢穴 (AbathurImprovedToxicNests)
- 生物质恢复 (AbathurBiomassRefund)
- 共生体 (AbathurUnlockSymbiote)
- 生质汲取 (AbathurBiomassLifeLeech)

### 特殊机制 Upgrade 候选

- 阿巴瑟生物质生命汲取 (`AbathurBiomassLifeLeech`)
- 阿巴瑟生物质返还 (`AbathurBiomassRefund`)
- 阿巴瑟启用共生激素 (`AbathurEnableSymbiote`)
- 阿巴瑟隐秘剧毒巢穴 (`AbathurHiddenToxicNest`)
- 阿巴瑟 剧毒巢穴 增加生物质 (`AbathurToxicNestIcreasedBiomass`)
- 阿巴瑟剧毒巢穴重生天赋 (`AbathurToxicNestRespawnTalent`)
- CommanderPrestigeAbathurBiomass (`CommanderPrestigeAbathurBiomass`)
- CommanderPrestigeAbathurUltimateEvo (`CommanderPrestigeAbathurUltEvo`)
- 精通 阿巴瑟 双倍生物质 (`MasteryAbathurDoubleBiomass`)
- 精通 阿巴瑟 共生体甲壳与伤害 (`MasteryAbathurSymbioteCarapace`)
- 精通 阿巴瑟 剧毒巢穴充能 (`MasteryAbathurToxicNestCharge`)
- 精通 阿巴瑟 剧毒巢穴伤害 (`MasteryAbathurToxicNestDamageAndRespawn`)

### 特殊机制按钮候选

| 对象   | 按钮/Face                                   | 显示名                               | AbilityCmd                             | Requirement                         | 说明                                                                            |
| ---- | ----------------------------------------- | --------------------------------- | -------------------------------------- | ----------------------------------- | ----------------------------------------------------------------------------- |
| 守护者  | `EvolveToLeviathanLocked`                 | 进化为利维坦                            | -                                      | `AbathurLevel02`                    | 该技能将在指挥官等级2时解锁。                                                               |
| 守护者  | `BiomassPassiveEmpty`                     | 生物质搜集                             | -                                      | `BiomassBuffEmptyVisible`           | 该单位可以通过击杀敌方单位搜集生物质来获得能量。                                                      |
| 吞噬者  | `EvolveToLeviathanLocked`                 | 进化为利维坦                            | -                                      | `AbathurLevel02`                    | 该技能将在指挥官等级2时解锁。                                                               |
| 吞噬者  | `BiomassPassiveEmpty`                     | 生物质搜集                             | -                                      | `BiomassBuffEmptyVisible`           | 该单位可以通过击杀敌方单位搜集生物质来获得能量。                                                      |
| 异龙   | `EvolveToLeviathanLocked`                 | 进化为利维坦                            | -                                      | `AbathurLevel02`                    | 该技能将在指挥官等级2时解锁。                                                               |
| 异龙   | `BiomassPassiveEmpty`                     | 生物质搜集                             | -                                      | `BiomassBuffEmptyVisible`           | 该单位可以通过击杀敌方单位搜集生物质来获得能量。                                                      |
| 蟑螂   | `EvolveToBrutaliskLocked`                 | 进化为莽兽                             | -                                      | `AbathurLevel02`                    | 该技能将在指挥官等级2时解锁。                                                               |
| 蟑螂   | `BiomassPassiveEmpty`                     | 生物质搜集                             | -                                      | `BiomassBuffEmptyVisible`           | 该单位可以通过击杀敌方单位搜集生物质来获得能量。                                                      |
| 虫群宿主 | `EvolveToBrutaliskLocked`                 | 进化为莽兽                             | -                                      | `AbathurLevel02`                    | 该技能将在指挥官等级2时解锁。                                                               |
| 虫群宿主 | `BiomassPassiveEmpty`                     | 生物质搜集                             | -                                      | `BiomassBuffEmptyVisible`           | 该单位可以通过击杀敌方单位搜集生物质来获得能量。                                                      |
| 蟑螂   | `EvolveToBrutaliskLocked`                 | 进化为莽兽                             | -                                      | `AbathurLevel02`                    | 该技能将在指挥官等级2时解锁。                                                               |
| 蟑螂   | `BiomassPassiveEmpty`                     | 生物质搜集                             | -                                      | `BiomassBuffEmptyVisible`           | 该单位可以通过击杀敌方单位搜集生物质来获得能量。                                                      |
| 蟑螂   | `BrutaliskDeepTunnel`                     | 深槽虫道                              | `AbathurDeepTunnelImproved,Execute`    | -                                   | 快速潜地前往目标位置。                                                                   |
| 飞蛇   | `BiomassPassiveEmpty`                     | 生物质搜集                             | -                                      | `BiomassBuffEmptyVisible`           | 该单位可以通过击杀敌方单位搜集生物质来获得能量。                                                      |
| 飞蛇   | `CommanderPrestigeAbathurLeviathanLocked` | 进化为利维坦                            | -                                      | `CommanderPrestigeAbathurBiomass`   | 该技能被指挥官威望锁定。                                                                  |
| 飞蛇   | `EvolveToLeviathanLocked`                 | 进化为利维坦                            | -                                      | `AbathurLevel02`                    | 该技能将在指挥官等级2时解锁。                                                               |
| 莽兽   | `SymbioteCarapace`                        | 甲壳                                | `SymbioteCarapace,Execute`             | -                                   | 为自己添加护盾{Behavior,SymbioteCarapace,Modification.VitalMaxArray\[Shields]}，持续8秒。 |
| 莽兽   | `AbathurBrutaliskLeviathanSymbioteLocked` | 共生体                               | -                                      | `AbathurLevel10`                    | 该技能将在指挥官等级10时解锁。                                                              |
| 莽兽   | `AbathurBrutaliskLeviathanSymbiote`       | 共生体 | `AbathurSymbioteHangerBrutalisk,Ammo1` | `HaveBrutaliskLeviathanSymbiote` | 当前 Mod 私有莽兽/利维坦共生体被动显示。                                                                             |
| 莽兽   | `BrutaliskDeepTunnel`                     | 深槽虫道                              | `BrutaliskDeepTunnel,Execute`          | -                                   | 快速潜地前往目标位置。                                                                   |
| 莽兽   | `BurrowDown`                              | 潜地                                | `BurrowBrutaliskAbathurDown,Execute`          | -                                   | 当前 Mod 私有莽兽潜地链；潜地后进入 `BrutaliskAbathurBurrowed`，不要接公共 `BurrowBrutaliskDown`。                                                |

实现备注：凡是涉及局内状态、资源、堆叠、全局计时器、隐藏 caster、英雄成长或召唤首领的机制，都必须有 runtime hook 和 `[XM_DBG]` 日志。

## 11. 指挥官个性化机制

Owner：`CommanderPersonalMechanicProfile`、`CommanderPersonalMechanicEffectProfile`、`CommanderPersonalMechanicHookProfile`、`CommanderPersonalMechanicRequirementProfile`。

本指挥官重点：生物质驱动单位成长，终极进化和毒巢需要 runtime hook 记录堆叠、拾取和单位替换。

### 威望正向融合输入

| 威望 ID                                 | 名称 | Primary Upgrade                      | 禁用单位 | 启用单位 | 禁用 Ability | 补充 Upgrade            |
| ------------------------------------- | -- | ------------------------------------ | ---- | ---- | ---------- | --------------------- |
| `CommanderPrestigeAbathurBiomass`     | -  | `CommanderPrestigeAbathurBiomass`    | -    | -    | -          | -                     |
| `CommanderPrestigeAbathurDeepTunnel`  | -  | `CommanderPrestigeAbathurDeepTunnel` | -    | -    | -          | `AbathurDeepTunnel1`  |
| `CommanderPrestigeAbathurUltimateEvo` | -  | `CommanderPrestigeAbathurUltEvo`     | -    | -    | -          | `AbathurUltimateEvo1` |

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
[XM_DBG][INFO][COMMANDER_PROFILE_LOAD] commander=Abathur levelMode=FullLevel15 masteryMode=AllSixMax rosterStage=power_fusion result=ok
[XM_DBG][INFO][POWER_FUSION_APPLY] commander=Abathur levelMode=FullLevel15 masteryMode=AllSixMax prestigeMode=SelectedPositive result=ok
[XM_DBG][INFO][ROSTER_LOAD] commander=Abathur stage=power_fusion units=12 buildings=2 heroes=0 result=ok
[XM_DBG][INFO][HERO_PROFILE_LOAD] commander=Abathur heroes=0 result=ok
[XM_DBG][INFO][MODULE_VERIFY] commander=Abathur module=<01-11> profile=<profile> result=ok
[XM_DBG][WARN][CASC_AUDIT_REQUIRED] commander=Abathur module=<module> object=<object> result=needs-casc-audit
```

## 第一轮待审计项

- 顶部技能的 caster、按钮、冷却、充能、目标转发闭包。
- 英雄或特殊英雄的 Unit、Ability、Behavior、Weapon、Actor、Sound、复活/重生闭包。
- `power_fusion` 最终 roster 与 `level15` roster 的新增、替换、变体关系。
- 6 项精通的真实作用对象和最终数值。
- 3 个威望的正面收益、负面代价、disable/suppress、费用/冷却/上限变化。
- 科技建筑研究按钮、Requirement、Upgrade effect 是否完整。
- 特殊机制、个性化机制是否需要 runtime hook。
