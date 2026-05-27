# 泰凯斯（Tychus）指挥官细化

日期：2026-05-27

## 当前口径

当前指挥官默认 15 级，不从 1 级开始；精通默认 6 项全部 30 点；威望默认只取正面收益，不直接启用官方 `PlayerPrestige`。`initial` 只作为官方基础状态审计和差异对照，默认测试和玩法应看 `power_fusion` 最终状态。

本文件按 `docs/newdocs/模块拆分` 的 11 个模块整理 泰凯斯。依据 `游戏数据/官方合作指挥官/commanders/Tychus/` 的 JSON 摘要生成；具体 Ability、Behavior、Weapon、Actor、Effect、Requirement 闭包仍需继续追 `references/sc2-build-96883-casc-export/` 或实机 `[XM_DBG]` 日志。

## 官方数据摘要

| 项 | 值 |
|---|---|
| CommanderId | `TerranTychus` |
| 中文名 | 泰凯斯 |
| 默认升级 | `TychusCommander` |
| 默认能力命令 | `TychusFakeReviveTrain:1, TychusFakeReviveTrain:2, TychusFakeReviveTrain:3, TychusFakeReviveTrain:4` |
| 威望 ID | `CommanderPrestigeTychusSquadAbilities, CommanderPrestigeTychusLoneWolf, CommanderPrestigeTychusOdin` |
| heroes 数量 | 9 |
| roster 数量 | 14 |
| units 数量 | 2 |
| buildings 数量 | 3 |
| command card 对象数 | 14 |
| upgrades 数量 | 20 |
| source | `mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/userdata.xml` |

roster 样例：

```text
Marauder, TychusCoop, TychusMercCompound, TychusGhost, TychusGhostAcademy, TychusMedic, TychusFirebat, TychusArmory, TychusHERC, TychusSpectre, TychusWarhound, TychusReaper, TychusMarauder, TychusSCV
```

## 15 级解锁摘要

- 1: 有点过去的意思
- 2: 兄弟越多越好
- 3: 奥丁降世
- 4: 新不法之徒：凯文“响尾蛇”韦斯特
- 5: 工程站升级包
- 6: 新不法之徒：詹姆斯“天狼星”赛克斯
- 7: 闪亮登场第一人
- 8: 新不法之徒：罗布“弹头哥”博斯韦尔
- 9: 要搭飞的吗？
- 10: 新不法之徒：维嘉
- 11: 顺手牵羊
- 12: 初级终极装备包
- 13: 全副武装
- 14: 高级终极装备包
- 15: 红色按钮

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
| Lv3 奥丁降世 | 3 | `TychusCalldownOdinTargeted:` | `-` | 解锁可以在目标位置空投奥丁，搭乘泰凯斯并让其成为驾驶员，落地时造成150点伤害。奥丁可以操控并战斗60秒。呼叫奥丁请使用顶部控制面板技能。 |

### command card 命中

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 泰凯斯·芬利 | `TychusOdinNuclearStrike` | 红色按钮 | `TychusOdinNuclearStrike,Execute` | - | 朝目标位置呼叫一次聚变打击。聚变打击需要{Effect,OdinNukePersistent,InitialDelay+Effect,OdinNukePe... |
| 枪王藏身处 | `TychusReaperBombDamageLearn` | 购买拉尔斯科技G7型炸弹 | `TychusHeroResearch2,Research17` | - | “老油条”萨姆的爆破炸弹的伤害提高100%。 |
| 枪王藏身处 | `TychusReaperBombStunLearn` | 购买莫比斯拘束矩阵 | `TychusHeroResearch2,Research19` | - | 击晕被“老油条”萨姆的爆破炸弹击中的单位，并解除其侦测能力。 |
| 枪王藏身处 | `TychusReaperBombChargesLearn` | 购买强化版爆破套件 | `TychusHeroResearch2,Research18` | - | “老油条”萨姆每攻击一次，爆破炸弹的充能时间便缩短{-2*Effect,TychusReaperBombChargeAttackAdd,Cost[0].C... |
| 维嘉 | `TychusOdinNuclearStrike` | 红色按钮 | `TychusOdinNuclearStrike,Execute` | - | 朝目标位置呼叫一次聚变打击。聚变打击需要{Effect,OdinNukePersistent,InitialDelay+Effect,OdinNukePe... |
| 莱纳·尼卡拉中尉 | `TychusOdinNuclearStrike` | 红色按钮 | `TychusOdinNuclearStrike,Execute` | - | 朝目标位置呼叫一次聚变打击。聚变打击需要{Effect,OdinNukePersistent,InitialDelay+Effect,OdinNukePe... |
| 迈尔斯“布雷泽”刘易斯 | `TychusFirebatOilBomb` | 浮油 | `TychusFirebatOilBomb,Execute` | - | 给敌方地面单位浇上浮油，使其攻击和移动速度降低{(1 - Behavior,TychusFirebatOilBombed,Modification.Mov... |
| 迈尔斯“布雷泽”刘易斯 | `TychusOdinNuclearStrike` | 红色按钮 | `TychusOdinNuclearStrike,Execute` | - | 朝目标位置呼叫一次聚变打击。聚变打击需要{Effect,OdinNukePersistent,InitialDelay+Effect,OdinNukePe... |
| 罗布“弹头哥”博斯韦尔 | `TychusOdinNuclearStrike` | 红色按钮 | `TychusOdinNuclearStrike,Execute` | - | 朝目标位置呼叫一次聚变打击。聚变打击需要{Effect,OdinNukePersistent,InitialDelay+Effect,OdinNukePe... |
| 纳克斯 | `TychusOdinNuclearStrike` | 红色按钮 | `TychusOdinNuclearStrike,Execute` | - | 朝目标位置呼叫一次聚变打击。聚变打击需要{Effect,OdinNukePersistent,InitialDelay+Effect,OdinNukePe... |
| 詹姆斯“天狼星”赛克斯 | `TychusOdinNuclearStrike` | 红色按钮 | `TychusOdinNuclearStrike,Execute` | - | 朝目标位置呼叫一次聚变打击。聚变打击需要{Effect,OdinNukePersistent,InitialDelay+Effect,OdinNukePe... |
| “老油条”萨姆 | `TychusReaperBomb` | 爆破炸弹 | `TychusReaperBomb,Execute` | - | 标记一个目标单位，在{Behavior,TychusReaperBomb,Duration}秒后造成{Effect,TychusReaperBombU,A... |
| “老油条”萨姆 | `TychusReaperBombDamage` | 拉尔斯科技G7型炸弹 | `TychusReaperBombDamage,Off` | HaveTychusReaperBombDamage | 爆破炸弹的伤害提高100%。 |
| “老油条”萨姆 | `TychusReaperBombStun` | 莫比斯拘束矩阵 | `TychusReaperBombStun,Off` | HaveTychusReaperBombStun | 击晕被爆破炸弹击中的单位，并解除其侦测能力。 |
| “老油条”萨姆 | `TychusReaperBombCharges` | 强化版爆破套件 | `TychusReaperBombCharges,Off` | HaveTychusReaperBombCharges | “老油条”萨姆每攻击一次，爆破炸弹的充能时间便缩短{-2*Effect,TychusReaperBombChargeAttackAdd,Cost[0].C... |
| “老油条”萨姆 | `TychusOdinNuclearStrike` | 红色按钮 | `TychusOdinNuclearStrike,Execute` | - | 朝目标位置呼叫一次聚变打击。聚变打击需要{Effect,OdinNukePersistent,InitialDelay+Effect,OdinNukePe... |
| 凯文“响尾蛇”韦斯特 | `TychusOdinNuclearStrike` | 红色按钮 | `TychusOdinNuclearStrike,Execute` | - | 朝目标位置呼叫一次聚变打击。聚变打击需要{Effect,OdinNukePersistent,InitialDelay+Effect,OdinNukePe... |
| SCV | `BuildTychusMedivacPlatform` | 建造医疗运输机平台 | `TychusTerranBuild,Build14` | - | 运输平台。可以立即将目标区域内的泰凯斯作战单位运送至目标位置，空降时对其进行治疗并使其隐形。 |

实现备注：面板只注册 profile 和转发 caster，地图不得按 commander 写 if/else。精通和威望影响面板冷却/充能/费用时，由本模块接收最终 modifier。

## 02. 英雄单位及其技能

Owner：`CommanderHeroProfile`、`CommanderHeroModeProfile`、`CommanderHeroAbilityProfile`、`CommanderHeroSkillTreeProfile`、`CommanderHeroReviveProfile`、`CommanderHeroModifierProfile`。

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 泰凯斯·芬利 | `TychusCoop` | `TychusCoop` | Ground; Biological | 矿:0 气:0 人口字段:0 生命:600 | - |
| 维嘉 | `TychusGhost` | `TychusGhost` | Ground; Biological/Psionic | 矿:500 气:100 人口字段:-10 生命:500 | 鬼手之一，擅长控制敌方单位。可以使用支配。可以升级成侦测单位。 / 可以对空和对地。 |
| 莱纳·尼卡拉中尉 | `TychusMedic` | `TychusMedic` | Ground; Biological/Light | 矿:500 气:100 人口字段:-10 生命:450 | 鬼手之一，擅长治疗友方单位与阻止伤害。可以使用活力喷发。可以升级成侦测单位。 |
| 迈尔斯“布雷泽”刘易斯 | `TychusFirebat` | `TychusFirebat` | Ground; Armored/Biological | 矿:500 气:100 人口字段:-10 生命:1000 | 猛男之一，擅长对付大群弱小的地面单位。可以使用浮油。 / 可以对地。 |
| 罗布“弹头哥”博斯韦尔 | `TychusHERC` | `TychusHERC` | Ground; Biological | 矿:500 气:100 人口字段:-10 生命:1000 | 猛男之一，擅长承受伤害并将其返还。可以使用猛烈撞击。 / 可以对地。 |
| 纳克斯 | `TychusSpectre` | `TychusSpectre` | Ground; Biological/Psionic | 矿:500 气:100 人口字段:-10 生命:500 | 鬼手之一，擅长对付大群敌人。可以使用超声波脉冲。可以升级成侦测单位。 / 可以对空和对地。 |
| 詹姆斯“天狼星”赛克斯 | `TychusWarhound` | `TychusWarhound` | Ground; Armored/Mechanical | 矿:500 气:100 人口字段:-10 生命:650 | 枪王之一，擅长部署炮台并为自己及炮台注入特殊技能。可以使用部署战狼炮台。 / 可以对空和对地。 |
| “老油条”萨姆 | `TychusReaper` | `TychusReaper` | Ground; Biological/Light | 矿:500 气:100 人口字段:-10 生命:375 | 枪王之一，擅长对单体目标造成大量伤害。可以使用爆破炸弹。 / 可以对空和对地。 |
| 凯文“响尾蛇”韦斯特 | `TychusMarauder` | `TychusMarauder` | Ground; Armored/Biological | 矿:500 气:100 人口字段:-10 生命:625 | 猛男之一，擅长支援友方单位和对付地面重甲单位。可以使用部署恢复器。 / 可以对地。 |

### 英雄/形态候选

- 有点过去的意思 (`TychusPHLevel1`)
- 兄弟越多越好 (`TychusPHLevel2`)
- 奥丁降世 (`TychusPHLevel3`)
- 新不法之徒：凯文“响尾蛇”韦斯特 (`TychusPHLevel4`)
- 工程站升级包 (`TychusPHLevel5`)
- 新不法之徒：詹姆斯“天狼星”赛克斯 (`TychusPHLevel6`)
- 闪亮登场第一人 (`TychusPHLevel7`)
- 新不法之徒：罗布“弹头哥”博斯韦尔 (`TychusPHLevel8`)
- 要搭飞的吗？ (`TychusPHLevel9`)
- 新不法之徒：维嘉 (`TychusPHLevel10`)
- 顺手牵羊 (`TychusPHLevel11`)
- 初级终极装备包 (`TychusPHLevel12`)
- 全副武装 (`TychusPHLevel13`)
- 高级终极装备包 (`TychusPHLevel14`)
- 红色按钮 (`TychusPHLevel15`)

口径：每个不法之徒等价英雄单位，装备购买和队伍上限必须模块化。

待审计：Hero Unit、技能按钮、复活、形态切换、武器/Actor/Sound 闭包。

## 03. 普通单位技能及其进化功能

Owner：`CommanderUnitAbilityProfile`、`CommanderUnitStatProfile`、`CommanderUnitEvolutionProfile`、`CommanderUnitBehaviorProfile`、`CommanderUnitWeaponProfile`。

### 单位技能按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 劫掠者 | `MoveHoldPosition` | 原地防御 | `move,HoldPos` | - | 命令选中的单位待在原地，并攻击射程内的敌方目标。接受命令的单位不会对敌人进行追击或移向敌人与其交战。 |
| 劫掠者 | `MovePatrol` | 巡逻 | `move,Patrol` | - | 命令选中的单位在当前位置与目标区域间进行巡逻。巡逻的单位会对敌人发起攻击或移向附近的敌人与其交战。 |
| 劫掠者 | `StimMarauder` | 使用强化剂 | `StimpackMarauder,Execute` | - | 给单位注入强效的刺激物，大幅提高其移动和攻击速度，持续{Behavior,Stimpack,Duration}秒。该单位会受到相当于其生命值{Abil,S... |
| 劫掠者 | `ConcussiveGrenade` | 震荡弹 | `255` | UsePunisherGrenades | 被劫掠者击中的目标会暂时减速。 / 重型单位对该效果免疫 |
| 泰凯斯·芬利 | `TychusShredderGrenade` | 粉碎者手雷 | `TychusShredderGrenade,Execute` | - | 对目标区域内的敌方单位造成{Effect,TychusShredderGrenadeDamage,Amount}点伤害。 |
| 泰凯斯·芬利 | `MoveHoldPosition` | 原地防御 | `move,HoldPos` | - | 命令选中的单位待在原地，并攻击射程内的敌方目标。接受命令的单位不会对敌人进行追击或移向敌人与其交战。 |
| 泰凯斯·芬利 | `MovePatrol` | 巡逻 | `move,Patrol` | - | 命令选中的单位在当前位置与目标区域间进行巡逻。巡逻的单位会对敌人发起攻击或移向附近的敌人与其交战。 |
| 泰凯斯·芬利 | `AttackChampions` | AttackChampions | `attack,Execute` | - | - |
| 泰凯斯·芬利 | `TychusACImplosionGrenades` | KD9a型聚爆核心 | `TychusACImplosionGrenades,Off` | HaveTychusACImplosionGrenades | 粉碎者手雷将被影响的单位拖拽至效果范围中心，使其昏迷{Behavior,TychusShredderGrenadeStun,Duration}秒。 |
| 泰凯斯·芬利 | `TychusACRageGrenades` | 钒钢弹壳 | `TychusACRageGrenades,Off` | HaveTychusACRageGrenades | 泰凯斯的粉碎者手雷的伤害提高{$UpgradeEffectArrayValue:TychusACRageGrenades:Effect,TychusShr... |
| 泰凯斯·芬利 | `TychusACPiercingRounds` | 凯莫瑞安碎甲弹 | `TychusACPiercingRounds,Off` | HaveTychusACPiercingRounds | 泰凯斯的攻击使目标的护甲降低{-1*Behavior,TychusACArmorDebuff,Modification.LifeArmorBonus}点，... |
| 泰凯斯·芬利 | `TychusACBandofBrothers` | 神射手联网头盔 | `TychusACBandofBrothers,Off` | HaveTychusACBandofBrothers | 每有一名不法之徒在泰凯斯身边，泰凯斯的武器伤害便提高{Behavior,TychusACBandofBrothersBuff,Modification.D... |
| 泰凯斯·芬利 | `TychusOdinNuclearStrike` | 红色按钮 | `TychusOdinNuclearStrike,Execute` | - | 朝目标位置呼叫一次聚变打击。聚变打击需要{Effect,OdinNukePersistent,InitialDelay+Effect,OdinNukePe... |
| 泰凯斯·芬利 | `TychusHeroCommonAbil2` | 泰凯斯不法之徒普通技能2 | `TychusHeroCommonAbil2,Execute` | - | - |
| 泰凯斯·芬利 | `TychusHeroCommonAbil3` | 泰凯斯不法之徒普通技能3 | `TychusHeroCommonAbil3,Execute` | - | - |
| 泰凯斯·芬利 | `TychusHeroCommonAbil4` | 泰凯斯不法之徒普通技能4 | `TychusHeroCommonAbil4,Execute` | - | - |
| 泰凯斯·芬利 | `TychusHeroCommonAbil5` | 泰凯斯不法之徒普通技能5 | `TychusHeroCommonAbil5,Execute` | - | - |
| 维嘉 | `TychusGhostDominate` | 支配 | `TychusGhostDominate,Execute` | - | 短时间内控制目标敌方单位，使其伤害提高{Behavior,TychusGhostDominate,Modification.DamageDealtFrac... |
| 维嘉 | `MoveHoldPosition` | 原地防御 | `move,HoldPos` | - | 命令选中的单位待在原地，并攻击射程内的敌方目标。接受命令的单位不会对敌人进行追击或移向敌人与其交战。 |
| 维嘉 | `MovePatrol` | 巡逻 | `move,Patrol` | - | 命令选中的单位在当前位置与目标区域间进行巡逻。巡逻的单位会对敌人发起攻击或移向附近的敌人与其交战。 |
| 维嘉 | `AttackChampions` | AttackChampions | `attack,Execute` | - | - |
| 维嘉 | `TychusGhostDominateBuff` | 莫比斯灵能激发器 | `TychusGhostDominateBuff,Off` | HaveTychusGhostDominateBuff | 支配完全恢复被支配单位的生命值、护盾值以及能量值，并使被支配单位的攻击速度提高{Behavior,TychusGhostDominateUpgraded,... |
| 维嘉 | `TychusGhostConfusingDomination` | 神经干扰器 | `TychusGhostDominatingDomination,Off` | HaveTychusGhostConfusingDomination | 位于被支配单位周围的敌人将会互相攻击，持续{Behavior,TychusGhostConfusion,Duration}秒。 |
| 维嘉 | `TychusGhostPsychicSnare` | 灵能投射器 | `TychusGhostPsychicSnare,Execute` | HaveTychusGhostPsychicSnare | 将最多{Abil,TychusGhostPsychicSnare,Cost[0].Charge.CountMax}名敌方空中单位困在地面，让友方单位可以视... |
| 维嘉 | `TychusGhostConcentrationHelmet` | 88式劝服者 | `TychusGhostSnipe,255` | HaveTychusGhostConcentrationHelmet | 支配的持续时间延长{$UpgradeEffectArrayValue:TychusGhostConcentrationHelmet:Behavior,Ty... |
| 维嘉 | `TychusOdinNuclearStrike` | 红色按钮 | `TychusOdinNuclearStrike,Execute` | - | 朝目标位置呼叫一次聚变打击。聚变打击需要{Effect,OdinNukePersistent,InitialDelay+Effect,OdinNukePe... |
| 维嘉 | `TychusHeroCommonAbil2` | 泰凯斯不法之徒普通技能2 | `TychusHeroCommonAbil2,Execute` | - | - |
| 维嘉 | `TychusHeroCommonAbil3` | 泰凯斯不法之徒普通技能3 | `TychusHeroCommonAbil3,Execute` | - | - |
| 维嘉 | `TychusHeroCommonAbil4` | 泰凯斯不法之徒普通技能4 | `TychusHeroCommonAbil4,Execute` | - | - |
| 维嘉 | `TychusHeroCommonAbil5` | 泰凯斯不法之徒普通技能5 | `TychusHeroCommonAbil5,Execute` | - | - |
| 莱纳·尼卡拉中尉 | `TychusMedicAoE` | 活力喷发 | `TychusMedicAoE,Execute` | - | 立即治疗尼卡拉中尉周围区域内的友方单位{Effect,TychusMedicAoESearchAlliance,VitalArray[Life].Chan... |
| 莱纳·尼卡拉中尉 | `MoveHoldPosition` | 原地防御 | `move,HoldPos` | - | 命令选中的单位待在原地，并攻击射程内的敌方目标。接受命令的单位不会对敌人进行追击或移向敌人与其交战。 |
| 莱纳·尼卡拉中尉 | `MovePatrol` | 巡逻 | `move,Patrol` | - | 命令选中的单位在当前位置与目标区域间进行巡逻。巡逻的单位会对敌人发起攻击或移向附近的敌人与其交战。 |
| 莱纳·尼卡拉中尉 | `AcquireMove` | 搜索移动 | `move,AcquireMove` | - | 命令选中的单位移至目标区域或跟随目标单位。进行搜索移动的单位不会与敌人交战。 |
| 莱纳·尼卡拉中尉 | `TychusMedicHealingSprayUpgradePassive` | 尤摩扬纳米修复机器人 | `-` | HaveTychusMedicAdvancedHealingSpray | 使活力喷发的直接治疗和周期性治疗效果提高100%。 |
| 莱纳·尼卡拉中尉 | `TychusMedicHealUpgradeLevels` | 普罗希昂血清 | `-` | HaveTychusMedicSuperHealing | 使超级治疗的治疗速度提高100%。 |
| 莱纳·尼卡拉中尉 | `TychusMedicDoubleHeal` | 普罗希昂双管治疗射线护手 | `-` | HaveTychusMedicDoubleBeam | 超级治疗可以同时对两名目标施放。 |
| 莱纳·尼卡拉中尉 | `TychusMedicDefensiveMatrix` | XM-77型矩阵发生器 | `TychusMedicDefensiveMatrix,Execute` | - | 使一名目标友方单位被护盾环绕，该护盾可在{Behavior,TychusMedicDefensiveMatrix,Duration}秒内吸收{Behavi... |
| 莱纳·尼卡拉中尉 | `TychusMedicHeal` | 超级治疗 | `TychusMedivacDoubleHealPlusMech,Execute` | - | 每秒治疗{Effect,TychusMedicHeal,RechargeVitalRate}点生命。 |
| 莱纳·尼卡拉中尉 | `TychusOdinNuclearStrike` | 红色按钮 | `TychusOdinNuclearStrike,Execute` | - | 朝目标位置呼叫一次聚变打击。聚变打击需要{Effect,OdinNukePersistent,InitialDelay+Effect,OdinNukePe... |
| 莱纳·尼卡拉中尉 | `TychusHeroCommonAbil2` | 泰凯斯不法之徒普通技能2 | `TychusHeroCommonAbil2,Execute` | - | - |
| 莱纳·尼卡拉中尉 | `TychusHeroCommonAbil3` | 泰凯斯不法之徒普通技能3 | `TychusHeroCommonAbil3,Execute` | - | - |
| 莱纳·尼卡拉中尉 | `TychusHeroCommonAbil4` | 泰凯斯不法之徒普通技能4 | `TychusHeroCommonAbil4,Execute` | - | - |
| 莱纳·尼卡拉中尉 | `TychusHeroCommonAbil5` | 泰凯斯不法之徒普通技能5 | `TychusHeroCommonAbil5,Execute` | - | - |
| 迈尔斯“布雷泽”刘易斯 | `TychusFirebatOilBomb` | 浮油 | `TychusFirebatOilBomb,Execute` | - | 给敌方地面单位浇上浮油，使其攻击和移动速度降低{(1 - Behavior,TychusFirebatOilBombed,Modification.Mov... |
| 迈尔斯“布雷泽”刘易斯 | `MoveHoldPosition` | 原地防御 | `move,HoldPos` | - | 命令选中的单位待在原地，并攻击射程内的敌方目标。接受命令的单位不会对敌人进行追击或移向敌人与其交战。 |
| 迈尔斯“布雷泽”刘易斯 | `MovePatrol` | 巡逻 | `move,Patrol` | - | 命令选中的单位在当前位置与目标区域间进行巡逻。巡逻的单位会对敌人发起攻击或移向附近的敌人与其交战。 |
| 迈尔斯“布雷泽”刘易斯 | `AttackChampions` | AttackChampions | `attack,Execute` | - | - |
| 迈尔斯“布雷泽”刘易斯 | `TychusFirebatPremiumPetroleum` | 高容积储油罐 | `TychusFirebatPremiumPetroleum,Off` | HaveTychusFirebatPremiumPetroleum | 使浮油的范围扩大100%。 |
| 迈尔斯“布雷泽”刘易斯 | `TychusFirebatBlueFlameOil` | 哈迪斯浮油 | `TychusFirebatBlueFlameOil,Off` | HaveTychusFirebatBlueFlameOil | 提高燃油的点燃效果所造成的伤害，每秒对轻甲单位造成+{($UpgradeEffectArrayValue:TychusFirebatBlueFlameOi... |
| 迈尔斯“布雷泽”刘易斯 | `TychusFirebatIncendiaryPetroleum` | 狂焰牌燃料添加剂 | `TychusFirebatIncendiaryPetroleum,Off` | HaveTychusFirebatIncendiaryPetroleum | 被点燃的单位死亡时，他们将爆炸，将被点燃的状态扩散到区域内的敌方单位身上。 |
| 迈尔斯“布雷泽”刘易斯 | `TychusFirebatShield` | XCMC-670型战斗装甲 | `TychusFirebatShield,Off` | HaveTychusFirebatShield | 使布雷泽受到的所有伤害降低至{Behavior,TychusFirebatShield,DamageResponse.ClampMaximum}点。 |
| 迈尔斯“布雷泽”刘易斯 | `TychusOdinNuclearStrike` | 红色按钮 | `TychusOdinNuclearStrike,Execute` | - | 朝目标位置呼叫一次聚变打击。聚变打击需要{Effect,OdinNukePersistent,InitialDelay+Effect,OdinNukePe... |
| 迈尔斯“布雷泽”刘易斯 | `TychusHeroCommonAbil2` | 泰凯斯不法之徒普通技能2 | `TychusHeroCommonAbil2,Execute` | - | - |
| 迈尔斯“布雷泽”刘易斯 | `TychusHeroCommonAbil3` | 泰凯斯不法之徒普通技能3 | `TychusHeroCommonAbil3,Execute` | - | - |
| 迈尔斯“布雷泽”刘易斯 | `TychusHeroCommonAbil4` | 泰凯斯不法之徒普通技能4 | `TychusHeroCommonAbil4,Execute` | - | - |
| 迈尔斯“布雷泽”刘易斯 | `TychusHeroCommonAbil5` | 泰凯斯不法之徒普通技能5 | `TychusHeroCommonAbil5,Execute` | - | - |
| 罗布“弹头哥”博斯韦尔 | `TychusHercGrapple` | 猛烈撞击 | `TychusHercGrapple,Execute` | - | “弹头哥”将自己拉向目标位置，撞击时造成{Effect,TychusHercGrappleLaunchCasterImpactDamage,Amount}... |
| 罗布“弹头哥”博斯韦尔 | `MoveHoldPosition` | 原地防御 | `move,HoldPos` | - | 命令选中的单位待在原地，并攻击射程内的敌方目标。接受命令的单位不会对敌人进行追击或移向敌人与其交战。 |
| 罗布“弹头哥”博斯韦尔 | `MovePatrol` | 巡逻 | `move,Patrol` | - | 命令选中的单位在当前位置与目标区域间进行巡逻。巡逻的单位会对敌人发起攻击或移向附近的敌人与其交战。 |
| ... | ... | ... | ... | ... | 还有 78 项，后续从 command_cards.json 继续展开 |

### 进化/形态/切换候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| - | - | - | - | - | 未自动命中进化或形态切换；后续按 Unit/Ability/Behavior 闭包审计。 |

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
| 枪王藏身处 | `TychusMercCompound` | `TychusMercCompound` | Ground; Armored/Mechanical/Structure | 矿:150 气:- 人口字段:- 生命:750 | 为几大枪王(泰凯斯、“老油条”萨姆、“天狼星”)提供装备升级。 / 开启： / - 乔伊·雷酒吧的“老油条”萨姆 / - 乔伊·雷酒吧的“天狼星” |
| 鬼手安全屋 | `TychusGhostAcademy` | `TychusGhostAcademy` | Ground; Armored/Mechanical/Structure | 矿:150 气:- 人口字段:- 生命:750 | 为几大鬼手(维嘉、纳克斯、尼卡拉中尉)提供装备升级。 / 开启： / - 乔伊·雷酒吧的维嘉 / - 乔伊·雷酒吧的纳克斯 / - 乔伊·雷酒吧的尼卡拉中尉 |
| 猛男军械库 | `TychusArmory` | `TychusArmory` | Ground; Armored/Mechanical/Structure | 矿:150 气:- 人口字段:- 生命:750 | 为几大猛男(“布雷泽”、“弹头哥”、“响尾蛇”)提供装备升级。 / 开启： / - 乔伊·雷酒吧的“布雷泽” / - 乔伊·雷酒吧的“弹头哥” / -... |

实现备注：测试台切换指挥官时调用本指挥官 initializer，负责替换主基地、工人、运输机/投放单位、隐藏 caster 和特殊建筑。

## 05. 指挥官兵种

Owner：`CommanderRosterProfile`、`CommanderUnitProfile`、`CommanderUnitTrainProfile`、`CommanderUnitStageProfile`、`CommanderUnitRequirementProfile`。

来源：官方提取 `units.json`。这里列的是当前已提取 Catalog 对象；满级替换、威望正向融合或进化变体仍以 `power_fusion` 审计结果为准。

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 劫掠者 | `Marauder` | `Marauder` | Ground; Armored/Biological | 矿:100 气:25 人口字段:-2 生命:125 | 重型突击步兵。 / 可以对地。 |
| SCV | `TychusSCV` | `TychusSCV` | Ground; Biological/Light/Mechanical | 矿:50 气:- 人口字段:-1 生命:45 | 基础工作单位。用于采集资源、建造人类建筑和修理。 / 可以对地 |

三阶段口径：`initial` 只做审计，`level15` 表示满级解锁，`power_fusion` 表示 15 级 + 六精通全满 + 威望正向收益后的默认运行清单。

## 06. 指挥官精通

Owner：`CommanderMasteryProfile`、`CommanderMasteryEffectProfile`、`CommanderMasteryModifierProfile`。

| 组 | 名称 | Upgrade | 每点 | 30点口径 |
|---|---|---|---|---|
| 1 | 泰凯斯攻击速度 | `MasteryTychusCommanderAttackSpeed` | 1 | +30% |
| 1 | 泰凯斯粉碎者手雷冷却时间 | `MasteryTychusGrenadeCooldown` | 1 | -30% |
| 2 | 三种不法之徒研究强化 | `MasteryTychusUpgradesIncrease` | 0.5 | +15% |
| 2 | 不法之徒可用性 | `MasteryTychusHeroCooldown` | 2 | -60秒 |
| 3 | 医疗运输机空运冷却时间 | `MasteryTychusMedivacBuff` | 1.5 | -45秒 |
| 3 | 奥丁冷却时间 | `MasteryTychusOdinCooldown` | -4 | --120秒 |

实现备注：当前默认六项全部 30 点。表里的 30 点口径由 `point_increments * 30` 推导，最终数值仍需以 Upgrade Effect 闭包验证。

## 07. 指挥官建筑

Owner：`CommanderBuildingProfile`、`CommanderBuildingAbilityProfile`、`CommanderBuildingTrainProfile`、`CommanderBuildingStageProfile`、`CommanderBuildingBehaviorProfile`。

来源：官方提取 `buildings.json`。

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 枪王藏身处 | `TychusMercCompound` | `TychusMercCompound` | Ground; Armored/Mechanical/Structure | 矿:150 气:- 人口字段:- 生命:750 | 为几大枪王(泰凯斯、“老油条”萨姆、“天狼星”)提供装备升级。 / 开启： / - 乔伊·雷酒吧的“老油条”萨姆 / - 乔伊·雷酒吧的“天狼星” |
| 鬼手安全屋 | `TychusGhostAcademy` | `TychusGhostAcademy` | Ground; Armored/Mechanical/Structure | 矿:150 气:- 人口字段:- 生命:750 | 为几大鬼手(维嘉、纳克斯、尼卡拉中尉)提供装备升级。 / 开启： / - 乔伊·雷酒吧的维嘉 / - 乔伊·雷酒吧的纳克斯 / - 乔伊·雷酒吧的尼卡拉中尉 |
| 猛男军械库 | `TychusArmory` | `TychusArmory` | Ground; Armored/Mechanical/Structure | 矿:150 气:- 人口字段:- 生命:750 | 为几大猛男(“布雷泽”、“弹头哥”、“响尾蛇”)提供装备升级。 / 开启： / - 乔伊·雷酒吧的“布雷泽” / - 乔伊·雷酒吧的“弹头哥” / -... |

### 建筑按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 枪王藏身处 | `TychusACHeroDesc` | 泰凯斯·芬利 | `-` | - | 一个有着大自我的大块头，还手握一挺特大号的枪。他经历过的大风大浪多了去了，再大的麻烦在他眼里都不够大。尽管与自己的好哥们吉米有些过节，但他俩还是被看到经常... |
| 枪王藏身处 | `TychusACImplosionGrenadesLearn` | 购买KD9a型聚爆核心 | `TychusHeroResearch2,Research13` | - | 泰凯斯的粉碎者手雷可以将被影响的单位拖拽至效果范围中心，使其昏迷{Behavior,TychusShredderGrenadeStun,Duration}秒。 |
| 枪王藏身处 | `TychusACRageGrenadesLearn` | 购买钒钢弹壳 | `TychusHeroResearch2,Research15` | - | 泰凯斯的粉碎者手雷的伤害提高{$UpgradeEffectArrayValue:TychusACRageGrenades:Effect,TychusShr... |
| 枪王藏身处 | `TychusACPiercingRoundsLearn` | 购买凯莫瑞安碎甲弹 | `TychusHeroResearch2,Research14` | - | 泰凯斯的攻击使目标的护甲降低{-1*Behavior,TychusACArmorDebuff,Modification.LifeArmorBonus}点，... |
| 枪王藏身处 | `TychusACBandofBrothersLearn` | 购买神射手联网头盔 | `TychusHeroResearch2,Research16` | - | 每有一名不法之徒在泰凯斯身边，泰凯斯的武器伤害便提高{Behavior,TychusACBandofBrothersBuff,Modification.D... |
| 枪王藏身处 | `TychusReaperDesc` | “老油条”萨姆 | `-` | TychusPassiveReaper | 一直以新福尔松监狱常客而自居的萨姆，在获得成为收割者的荣誉入伍机会之前，又接连两次犯事遭到了监禁。在后来熟练掌握作战飞行服之后，他很快就叛逃了，随后便成为... |
| 枪王藏身处 | `TychusReaperBombDamageLearn` | 购买拉尔斯科技G7型炸弹 | `TychusHeroResearch2,Research17` | - | “老油条”萨姆的爆破炸弹的伤害提高100%。 |
| 枪王藏身处 | `TychusReaperBombStunLearn` | 购买莫比斯拘束矩阵 | `TychusHeroResearch2,Research19` | - | 击晕被“老油条”萨姆的爆破炸弹击中的单位，并解除其侦测能力。 |
| 枪王藏身处 | `TychusReaperBombChargesLearn` | 购买强化版爆破套件 | `TychusHeroResearch2,Research18` | - | “老油条”萨姆每攻击一次，爆破炸弹的充能时间便缩短{-2*Effect,TychusReaperBombChargeAttackAdd,Cost[0].C... |
| 枪王藏身处 | `TychusWarhoundDesc` | 詹姆斯“天狼星”赛克斯 | `-` | TychusPassiveWarhound | 干了一辈子雇佣兵的“天狼星”很少有美好的回忆，伴随他更多的是噩梦。年少的时候，他和一支专业的佣兵队伍一起共事，也是在那时候他和“弹头哥”还有艾尔姆斯成了朋... |
| 枪王藏身处 | `TychusWarhoundHaywireMissilesUpgrade` | 购买SA-55型霹雳飞弹 | `TychusHeroResearch2,Research23` | - | 给“天狼星”装备飞弹，可对{Effect,TychusWarhoundTornadoMissileCP,PeriodCount}名空中目标造成{Effec... |
| 枪王藏身处 | `TychusWarhoundFearUpgrade` | 购买莫比斯M34型恐惧弹 | `TychusHeroResearch2,Research22` | - | 使“天狼星”的每次攻击有{Effect,TychusWarhoundFearSearch,Chance*100}%几率在一个小区域内施放恐惧。区域内的敌方... |
| 枪王藏身处 | `CancelBuilding` | 取消 | `BuildInProgress,Cancel` | - | 取消建造，摧毁尚未建造完成的建筑并返还部分资源。 |
| 鬼手安全屋 | `TychusGhostDesc` | 维嘉 | `-` | TychusPassiveGhost | 性格嚣张且下手狠毒的维嘉声称，她是通过伪造自己的死亡而成功逃离了帝国幽灵军校。然而，没有哪个雇佣兵有机会近距离接触到官方记录，来证实她的说辞。但有一点可以... |
| 鬼手安全屋 | `TychusGhostDominateBuffLearn` | 购买莫比斯灵能激发器 | `TychusHeroResearch2,Research2` | - | 维嘉的支配技能可以完全恢复被支配单位的生命值、护盾值以及能量值，并使被支配单位的攻击速度提高{Behavior,TychusGhostDominateUp... |
| 鬼手安全屋 | `TychusGhostConfusingDominationLearn` | 购买神经干扰器 | `TychusHeroResearch2,Research1` | - | 维嘉的支配技能使被支配单位周围的敌人陷入混乱，迫使他们互相攻击，持续{Behavior,TychusGhostConfusion,Duration}秒。 |
| 鬼手安全屋 | `TychusGhostPsychicSnareLearn` | 购买灵能投射器 | `TychusHeroResearch2,Research4` | - | 给予维嘉一项能力，使其可以将最多{Abil,TychusGhostPsychicSnare,Cost[0].Charge.CountMax}名敌方空中单位... |
| 鬼手安全屋 | `TychusGhostConcentrationHelmetLearn` | 购买88式劝服者 | `TychusHeroResearch2,Research3` | - | 维嘉支配的持续时间延长{$UpgradeEffectArrayValue:TychusGhostConcentrationHelmet:Behavior,... |
| 鬼手安全屋 | `TychusSpectreDesc` | 纳克斯 | `-` | TychusPassiveSpectre | 在“影刃计划”失败后，幽魂特工在整个星区中几乎销声匿迹。虽然纳克斯的记忆是一团迷雾，但有时候他的噩梦里会出现莫比斯军团、黑暗的声音以及有关世界末日奇奇怪怪... |
| 鬼手安全屋 | `TychusSpectreSuperUltrasonicPulseLearn` | 购买T4云爆弹 | `TychusHeroResearch2,Research5` | - | 纳克斯的超声波脉冲的伤害提高50%。 |
| 鬼手安全屋 | `TychusSpectreVisionSuitLearn` | 购买超声波放大器 | `TychusHeroResearch2,Research7` | - | 使纳克斯的超声波脉冲的范围扩大{($UpgradeEffectArrayValue:TychusSpectreVisionSuit:Effect,Tych... |
| 鬼手安全屋 | `TychusSpectreBrillianceAuraLearn` | 购买N3网络 | `TychusHeroResearch2,Research8` | - | 给予纳克斯一项能力，使其可以让附近的所有不法之徒的主要技能的充能时间和冷却时间缩短20%。 |
| 鬼手安全屋 | `TychusMedicDesc` | 莱纳·尼卡拉中尉 | `-` | TychusPassiveMedic | 尼卡拉苦学医术多年，为的就是有朝一日能够出人头地。后来她无意中得知了死水移民地的医师薪水，再后来她也干起了雇佣兵这一行，名和利她全都要。 |
| 鬼手安全屋 | `TychusMedicHealingSprayUpgrade` | 购买尤摩扬纳米修复机器人 | `TychusHeroResearch2,Research9` | - | 使尼卡拉中尉的活力喷发的直接治疗和周期性治疗效果提高100%。 |
| 鬼手安全屋 | `TychusMedicHealUpgrade` | 购买普罗希昂血清 | `TychusHeroResearch2,Research11` | - | 使尼卡拉中尉超级治疗的治疗速度提高100%。 |
| 鬼手安全屋 | `CancelBuilding` | 取消 | `BuildInProgress,Cancel` | - | 取消建造，摧毁尚未建造完成的建筑并返还部分资源。 |
| 猛男军械库 | `TychusFirebatDesc` | 迈尔斯“布雷泽”刘易斯 | `-` | TychusPassiveFirebat | 布雷泽从小就对火焰痴迷，对能成为“雷诺的游骑兵”旗下的火蝠兵更是激动万分。除了喜欢在做好事的时候放几把火过过瘾，他没什么别的爱好，不过他还是愿意三天两头地... |
| 猛男军械库 | `TychusFirebatPremiumPetroleumLearn` | 购买高容积储油罐 | `TychusHeroResearch,Research9` | - | 使布雷泽的浮油范围扩大100%。 |
| 猛男军械库 | `TychusFirebatBlueFlameOilLearn` | 购买哈迪斯浮油 | `TychusHeroResearch,Research10` | - | 提高布雷泽的燃油的点燃效果所造成的伤害，每秒对轻甲单位造成+{($UpgradeEffectArrayValue:TychusFirebatBlueFla... |
| 猛男军械库 | `TychusFirebatIncendiaryPetroleumLearn` | 购买狂焰牌燃料添加剂 | `TychusHeroResearch,Research11` | - | 被布雷泽的浮油点燃的单位死亡时，他们将爆炸，将被点燃的状态扩散到区域内的敌方单位身上。 |
| 猛男军械库 | `TychusFirebatShieldLearn` | 购买XCMC-670型战斗装甲 | `TychusHeroResearch,Research12` | - | 使布雷泽受到的所有伤害降低至{Behavior,TychusFirebatShield,DamageResponse.ClampMaximum}点。 |
| 猛男军械库 | `TychusHERCDesc` | 罗布“弹头哥”博斯韦尔 | `-` | TychusPassiveHERC | “弹头哥”从没有遇到过一样他不能炸爆、钻爆或是射爆的棘手玩意。他收集了各种稀奇古怪的武器，最新的一批货就是自己直接从尤摩扬手上搞来的赫克军品。这下不用说了... |
| 猛男军械库 | `TychusHercGrappleImpacts` | 购买X-71型震击靴 | `TychusHeroResearch,Research5` | - | “弹头哥”的猛烈撞击的范围以及昏迷持续时间都提高100%。 |
| 猛男军械库 | `TychusHercGrappleArmor` | 购买临界响应系统 | `TychusHeroResearch,Research6` | - | 当“弹头哥”受到致命伤害时，他在{Behavior,TychusHERCShield,Duration}秒内对伤害免疫，并且恢复所有生命值。该效果每{Be... |
| 猛男军械库 | `TychusHercCrit` | 购买M.A.L.I.C.E.弹药 | `TychusHeroResearch,Research8` | - | 使“弹头哥”的攻击有{Behavior,TychusHercCritPassive,DamageResponse.Chance*100}%几率造成{Beh... |
| 猛男军械库 | `TychusMarauderDesc` | 凯文“响尾蛇”韦斯特 | `-` | TychusPassiveMarauder | “响尾蛇”是少数几个从帝国武装部队中荣誉退伍的雇佣兵之一，他也是一个严格坚持自己准则的男人。尽管他会拒绝任何可能伤害无辜的工作，不过“响尾蛇”在做事上绝对... |
| 猛男军械库 | `TychusMarauderHealingWardBuffLearn` | 购买尤摩扬信号调制器 | `TychusHeroResearch,Research2` | - | 使“响尾蛇”的恢复器的治疗速度提高100%。 |
| 猛男军械库 | `TychusMarauderHealingWardSpeedBuffLearn` | 购买莫比斯攻击性合剂 | `TychusHeroResearch,Research3` | - | 在“响尾蛇”的恢复器效果范围内的单位获得{Behavior,TychusMarauderHealingWardTargetUpgrade,Modifica... |
| 猛男军械库 | `CancelBuilding` | 取消 | `BuildInProgress,Cancel` | - | 取消建造，摧毁尚未建造完成的建筑并返还部分资源。 |

实现备注：建筑声明自身生产、研究、行为和阶段；训练单位的最终可用性由兵种/科技/精通/威望共同裁决。

## 08. 科技建筑及其升级选项

Owner：`CommanderTechBuildingProfile`、`CommanderUnitTechProfile`、`CommanderUpgradeProfile`、`CommanderUpgradeRequirementProfile`、`CommanderUpgradeEffectProfile`。

### 15 级解锁与研究命令

| 等级 | 名称 | 解锁升级 | 解锁 AbilityCmd | 说明 |
|---|---|---|---|---|
| 1 | 有点过去的意思 | `-` | `-` | 泰凯斯有100单位的最大补给上限，可以从乔伊·雷酒吧中招募个个都是传奇人物的不法之徒。英雄单位。当一名不法之徒被击杀时，他们会逃离死亡并且可以在酒吧中重新招募。 |
| 2 | 兄弟越多越好 | `TychusCoopFifthHeroUpgrade` | `-` | 解锁可以招募泰凯斯战斗天团第5人。 |
| 3 | 奥丁降世 | `-` | `TychusCalldownOdinTargeted:` | 解锁可以在目标位置空投奥丁，搭乘泰凯斯并让其成为驾驶员，落地时造成150点伤害。奥丁可以操控并战斗60秒。呼叫奥丁请使用顶部控制面板技能。 |
| 4 | 新不法之徒：凯文“响尾蛇”韦斯特 | `-` | `TychusBarracksTrain:4` | 猛男之一，擅长支援友方单位和对付地面重甲单位。可以使用部署恢复器。在乔伊·雷酒吧中招募。 / 可以对地。 |
| 5 | 工程站升级包 | `-` | `TychusEngineeringBayResearch:, TychusEngineeringBayResearch:1` | 在工程站中解锁以下升级： / 使泰凯斯、“老油条”萨姆、“天狼星”的攻击速度提高25%。使“布雷泽”、“弹头哥”、“响尾蛇”的生命值提高25%。 |
| 6 | 新不法之徒：詹姆斯“天狼星”赛克斯 | `-` | `TychusFactoryTrain:3` | 枪王之一，擅长部署炮台并为自己及炮台注入特殊技能。可以使用部署战狼炮台。在乔伊·雷酒吧中招募。 / 可以对空和对地。 |
| 7 | 闪亮登场第一人 | `TychusCoopHeroHalfCostUpgrade` | `-` | 使泰凯斯招募第一个不法之徒的晶体矿和瓦斯气费用减少50%。 |
| 8 | 新不法之徒：罗布“弹头哥”博斯韦尔 | `-` | `TychusFactoryTrain:1` | 猛男之一，擅长承受伤害并将其返还。可以使用猛烈撞击。招募于乔伊·雷酒吧。 / 可以对地。 |
| 9 | 要搭飞的吗？ | `TychusCoopMedivacChargesUpgrade` | `-` | 使医疗运输机平台的最大数量从1个提高至3个。 |
| 10 | 新不法之徒：维嘉 | `-` | `TychusBarracksTrain:2` | 鬼手之一，擅长控制敌方单位。可以使用支配。可以升级成侦测单位。在乔伊·雷酒吧中招募。 / 可以对空和对地。 |
| 11 | 顺手牵羊 | `TychusCoopEquipmentCostUpgrade` | `-` | 使所有装备费用减少100晶体矿和100瓦斯气。 |
| 12 | 初级终极装备包 | `-` | `TychusHeroResearch2:15, TychusHeroResearch2:17, TychusHeroResearch:11, TychusHeroResearch2:7, TychusHeroResearch2:11` | 解锁以下升级： / 泰凯斯获得受战场上不法之徒数量影响的武器伤害(在枪王藏身处中购买)。“老油条”萨姆获得一项能力，每次攻击可以缩短爆破炸弹的充能时间(在枪王藏身处中购买)。... |
| 13 | 全副武装 | `-` | `TychusEngineeringBayResearch:11, TychusEngineeringBayResearch:12, TychusEngineeringBayResearch:6, TychusEngineeringBayResearch:7` | 在工程站中解锁以下升级： / 4级与5级的不法之徒武器研究升级。4级与5级的不法之徒护甲研究升级。 |
| 14 | 高级终极装备包 | `-` | `TychusHeroResearch:3, TychusHeroResearch2:20, TychusHeroResearch:7, TychusHeroResearch2:2` | 解锁以下升级： / 提高“天狼星”的战狼炮台的生命值与攻击伤害(在枪王藏身处中购买)。“响尾蛇”获得可以造成范围性伤害的技能(在猛男军械库中购买)。“弹头哥”获得每次攻击有3... |
| 15 | 红色按钮 | `-` | `TychusOdinPlatformResearch:1` | 在工程站中解锁以下升级： / 将奥丁的巨炮乱射技能替换成红色按钮技能，使奥丁可以进行聚变打击。 |

### Upgrade 摘要

| Upgrade | 父级 | 显示名 | Effect数 | 说明 |
|---|---|---|---|---|
| `CommanderPrestigeTychusLoneWolf` | `CommanderPrestige` | 独狼 | 56 | 优点 / 每当有一名招募的不法之徒离开其他不法之徒的视野范围时，其造成的伤害提高30%，并且受到的伤害降低50%。 / 缺点 / 终极装备不可用。装备的费用提高25%。 |
| `CommanderPrestigeTychusLoneWolfPerk` | `CommanderPrestige` | - | 54 | - |
| `CommanderPrestigeTychusLoneWolfRecruitment` | `CommanderPrestige` | - | 8 | - |
| `CommanderPrestigeTychusOdin` | `CommanderPrestige` | 忠诚遛狗师 | 7 | 优点 / 奥丁不再需要泰凯斯作为驾驶员，持续时间提高100%，并且冷却时间缩短40%。 / 缺点 / 巨炮乱射和红色按钮不可用。 |
| `CommanderPrestigeTychusOdinMastery` | `CommanderPrestige` | - | 1 | - |
| `CommanderPrestigeTychusSquadAbilities` | `CommanderPrestige` | - | 16 | - |
| `CommanderPrestigeTychusSquadAbilitiesMastery` | `CommanderPrestige` | - | 1 | - |
| `CommanderPrestigeTychusSquadAbilitiesMasteryGrenadeCooldown` | `CommanderPrestige` | - | 2 | - |
| `MasteryTychusCommanderAttackSpeed` | `-` | 泰凯斯攻击速度 | 2 | 提高泰凯斯的攻击速度。 |
| `MasteryTychusGrenadeCooldown` | `-` | 泰凯斯粉碎者手雷冷却 | 2 | 缩短泰凯斯的粉碎者手雷的冷却时间。 |
| `MasteryTychusHeroCooldown` | `-` | 不法之徒可用性 | 2 | 缩短不法之徒可以作战所需要的时间。 |
| `MasteryTychusMedivacBuff` | `-` | 医疗运输机空运冷却时间 | 2 | 减少医疗运输机空运技能的冷却时间。 |
| `MasteryTychusOdinCooldown` | `-` | 奥丁冷却 | 2 | 缩短奥丁技能的冷却时间。不会影响任务刚开始时的初始冷却时间。 |
| `MasteryTychusUpgradesIncrease` | `-` | 三种不法之徒研究强化 | 3 | 提高泰凯斯的三种不法之徒的升级效果，还会提高枪王的攻击速度，猛男的生命值以及鬼手的视野范围。 |
| `TychusCommander` | `-` | 指挥官 - 人类 - 泰凯斯 | 95 | - |
| `TychusCoopEquipmentCostUpgrade` | `-` | - | 54 | - |
| `TychusCoopFifthHeroUpgrade` | `-` | - | 0 | - |
| `TychusCoopHeroHalfCostUpgrade` | `-` | - | 0 | - |
| `TychusCoopMedivacChargesUpgrade` | `-` | - | 1 | - |
| `TychusHeroCount` | `-` | 泰凯斯英雄计数 | 0 | - |

### 研究/升级按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 泰凯斯·芬利 | `TychusACRageGrenades` | 钒钢弹壳 | `TychusACRageGrenades,Off` | HaveTychusACRageGrenades | 泰凯斯的粉碎者手雷的伤害提高{$UpgradeEffectArrayValue:TychusACRageGrenades:Effect,TychusShr... |
| 枪王藏身处 | `TychusACImplosionGrenadesLearn` | 购买KD9a型聚爆核心 | `TychusHeroResearch2,Research13` | - | 泰凯斯的粉碎者手雷可以将被影响的单位拖拽至效果范围中心，使其昏迷{Behavior,TychusShredderGrenadeStun,Duration}秒。 |
| 枪王藏身处 | `TychusACRageGrenadesLearn` | 购买钒钢弹壳 | `TychusHeroResearch2,Research15` | - | 泰凯斯的粉碎者手雷的伤害提高{$UpgradeEffectArrayValue:TychusACRageGrenades:Effect,TychusShr... |
| 枪王藏身处 | `TychusACPiercingRoundsLearn` | 购买凯莫瑞安碎甲弹 | `TychusHeroResearch2,Research14` | - | 泰凯斯的攻击使目标的护甲降低{-1*Behavior,TychusACArmorDebuff,Modification.LifeArmorBonus}点，... |
| 枪王藏身处 | `TychusACBandofBrothersLearn` | 购买神射手联网头盔 | `TychusHeroResearch2,Research16` | - | 每有一名不法之徒在泰凯斯身边，泰凯斯的武器伤害便提高{Behavior,TychusACBandofBrothersBuff,Modification.D... |
| 枪王藏身处 | `TychusReaperBombDamageLearn` | 购买拉尔斯科技G7型炸弹 | `TychusHeroResearch2,Research17` | - | “老油条”萨姆的爆破炸弹的伤害提高100%。 |
| 枪王藏身处 | `TychusReaperBombStunLearn` | 购买莫比斯拘束矩阵 | `TychusHeroResearch2,Research19` | - | 击晕被“老油条”萨姆的爆破炸弹击中的单位，并解除其侦测能力。 |
| 枪王藏身处 | `TychusReaperBombChargesLearn` | 购买强化版爆破套件 | `TychusHeroResearch2,Research18` | - | “老油条”萨姆每攻击一次，爆破炸弹的充能时间便缩短{-2*Effect,TychusReaperBombChargeAttackAdd,Cost[0].C... |
| 枪王藏身处 | `TychusWarhoundHaywireMissilesUpgrade` | 购买SA-55型霹雳飞弹 | `TychusHeroResearch2,Research23` | - | 给“天狼星”装备飞弹，可对{Effect,TychusWarhoundTornadoMissileCP,PeriodCount}名空中目标造成{Effec... |
| 枪王藏身处 | `TychusWarhoundFearUpgrade` | 购买莫比斯M34型恐惧弹 | `TychusHeroResearch2,Research22` | - | 使“天狼星”的每次攻击有{Effect,TychusWarhoundFearSearch,Chance*100}%几率在一个小区域内施放恐惧。区域内的敌方... |
| 维嘉 | `TychusGhostDominateBuff` | 莫比斯灵能激发器 | `TychusGhostDominateBuff,Off` | HaveTychusGhostDominateBuff | 支配完全恢复被支配单位的生命值、护盾值以及能量值，并使被支配单位的攻击速度提高{Behavior,TychusGhostDominateUpgraded,... |
| 维嘉 | `TychusGhostConcentrationHelmet` | 88式劝服者 | `TychusGhostSnipe,255` | HaveTychusGhostConcentrationHelmet | 支配的持续时间延长{$UpgradeEffectArrayValue:TychusGhostConcentrationHelmet:Behavior,Ty... |
| 鬼手安全屋 | `TychusGhostDominateBuffLearn` | 购买莫比斯灵能激发器 | `TychusHeroResearch2,Research2` | - | 维嘉的支配技能可以完全恢复被支配单位的生命值、护盾值以及能量值，并使被支配单位的攻击速度提高{Behavior,TychusGhostDominateUp... |
| 鬼手安全屋 | `TychusGhostConfusingDominationLearn` | 购买神经干扰器 | `TychusHeroResearch2,Research1` | - | 维嘉的支配技能使被支配单位周围的敌人陷入混乱，迫使他们互相攻击，持续{Behavior,TychusGhostConfusion,Duration}秒。 |
| 鬼手安全屋 | `TychusGhostPsychicSnareLearn` | 购买灵能投射器 | `TychusHeroResearch2,Research4` | - | 给予维嘉一项能力，使其可以将最多{Abil,TychusGhostPsychicSnare,Cost[0].Charge.CountMax}名敌方空中单位... |
| 鬼手安全屋 | `TychusGhostConcentrationHelmetLearn` | 购买88式劝服者 | `TychusHeroResearch2,Research3` | - | 维嘉支配的持续时间延长{$UpgradeEffectArrayValue:TychusGhostConcentrationHelmet:Behavior,... |
| 鬼手安全屋 | `TychusSpectreSuperUltrasonicPulseLearn` | 购买T4云爆弹 | `TychusHeroResearch2,Research5` | - | 纳克斯的超声波脉冲的伤害提高50%。 |
| 鬼手安全屋 | `TychusSpectreVisionSuitLearn` | 购买超声波放大器 | `TychusHeroResearch2,Research7` | - | 使纳克斯的超声波脉冲的范围扩大{($UpgradeEffectArrayValue:TychusSpectreVisionSuit:Effect,Tych... |
| 鬼手安全屋 | `TychusSpectreBrillianceAuraLearn` | 购买N3网络 | `TychusHeroResearch2,Research8` | - | 给予纳克斯一项能力，使其可以让附近的所有不法之徒的主要技能的充能时间和冷却时间缩短20%。 |
| 鬼手安全屋 | `TychusMedicHealingSprayUpgrade` | 购买尤摩扬纳米修复机器人 | `TychusHeroResearch2,Research9` | - | 使尼卡拉中尉的活力喷发的直接治疗和周期性治疗效果提高100%。 |
| 鬼手安全屋 | `TychusMedicHealUpgrade` | 购买普罗希昂血清 | `TychusHeroResearch2,Research11` | - | 使尼卡拉中尉超级治疗的治疗速度提高100%。 |
| 莱纳·尼卡拉中尉 | `TychusMedicHealingSprayUpgradePassive` | 尤摩扬纳米修复机器人 | `-` | HaveTychusMedicAdvancedHealingSpray | 使活力喷发的直接治疗和周期性治疗效果提高100%。 |
| 莱纳·尼卡拉中尉 | `TychusMedicHealUpgradeLevels` | 普罗希昂血清 | `-` | HaveTychusMedicSuperHealing | 使超级治疗的治疗速度提高100%。 |
| 迈尔斯“布雷泽”刘易斯 | `TychusFirebatBlueFlameOil` | 哈迪斯浮油 | `TychusFirebatBlueFlameOil,Off` | HaveTychusFirebatBlueFlameOil | 提高燃油的点燃效果所造成的伤害，每秒对轻甲单位造成+{($UpgradeEffectArrayValue:TychusFirebatBlueFlameOi... |
| 猛男军械库 | `TychusFirebatPremiumPetroleumLearn` | 购买高容积储油罐 | `TychusHeroResearch,Research9` | - | 使布雷泽的浮油范围扩大100%。 |
| 猛男军械库 | `TychusFirebatBlueFlameOilLearn` | 购买哈迪斯浮油 | `TychusHeroResearch,Research10` | - | 提高布雷泽的燃油的点燃效果所造成的伤害，每秒对轻甲单位造成+{($UpgradeEffectArrayValue:TychusFirebatBlueFla... |
| 猛男军械库 | `TychusFirebatIncendiaryPetroleumLearn` | 购买狂焰牌燃料添加剂 | `TychusHeroResearch,Research11` | - | 被布雷泽的浮油点燃的单位死亡时，他们将爆炸，将被点燃的状态扩散到区域内的敌方单位身上。 |
| 猛男军械库 | `TychusFirebatShieldLearn` | 购买XCMC-670型战斗装甲 | `TychusHeroResearch,Research12` | - | 使布雷泽受到的所有伤害降低至{Behavior,TychusFirebatShield,DamageResponse.ClampMaximum}点。 |
| 猛男军械库 | `TychusHercGrappleImpacts` | 购买X-71型震击靴 | `TychusHeroResearch,Research5` | - | “弹头哥”的猛烈撞击的范围以及昏迷持续时间都提高100%。 |
| 猛男军械库 | `TychusHercGrappleArmor` | 购买临界响应系统 | `TychusHeroResearch,Research6` | - | 当“弹头哥”受到致命伤害时，他在{Behavior,TychusHERCShield,Duration}秒内对伤害免疫，并且恢复所有生命值。该效果每{Be... |
| 猛男军械库 | `TychusHercCrit` | 购买M.A.L.I.C.E.弹药 | `TychusHeroResearch,Research8` | - | 使“弹头哥”的攻击有{Behavior,TychusHercCritPassive,DamageResponse.Chance*100}%几率造成{Beh... |
| 猛男军械库 | `TychusMarauderHealingWardBuffLearn` | 购买尤摩扬信号调制器 | `TychusHeroResearch,Research2` | - | 使“响尾蛇”的恢复器的治疗速度提高100%。 |
| 猛男军械库 | `TychusMarauderHealingWardSpeedBuffLearn` | 购买莫比斯攻击性合剂 | `TychusHeroResearch,Research3` | - | 在“响尾蛇”的恢复器效果范围内的单位获得{Behavior,TychusMarauderHealingWardTargetUpgrade,Modifica... |
| 纳克斯 | `TychusSpectreVisionSuit` | 超声波放大器 | `TychusSpectreVisionSuit,Off` | HaveTychusSpectreVisionSuit | 超声波脉冲的范围扩大{($UpgradeEffectArrayValue:TychusSpectreVisionSuit:Effect,TychusSpe... |
| 詹姆斯“天狼星”赛克斯 | `TychusWarhoundFearUpgradePassive` | 莫比斯M34型恐惧弹 | `-` | HaveTychusWarhoundFearUpgrade | 自动攻击的每一击有{Effect,TychusWarhoundFearSearch,Chance*100}%几率在一个小区域内施放恐惧。 区域内的敌方单位... |
| 詹姆斯“天狼星”赛克斯 | `TychusWarhoundDeathExplosionUpgradePassive` | D99型起爆器 | `-` | HaveTychusWarhoundDeathExplosionUpgrade | 当“天狼星”被击败后，他将触发一次爆炸，对其周围一个范围内的敌方单位造成{Effect,TychusWarhoundDeathExplosion,Amou... |
| 詹姆斯“天狼星”赛克斯 | `TychusWarhoundTurretUpgradePassive` | 尤摩扬炮台架 | `-` | HaveTychusWarhoundTurretUpgrade | 使战狼炮台的生命值与武器伤害提高{Behavior,TychusWarhoundTurretUpgrade,Modification.AttackSpee... |
| “老油条”萨姆 | `TychusReaperBombDamage` | 拉尔斯科技G7型炸弹 | `TychusReaperBombDamage,Off` | HaveTychusReaperBombDamage | 爆破炸弹的伤害提高100%。 |
| 凯文“响尾蛇”韦斯特 | `TychusMarauderHealingWardBuff` | 尤摩扬信号调制器 | `TychusMarauderHealingWardBuff,Off` | HaveTychusMarauderHealingWardBuffUpgrade | 使恢复器的治疗速度提高100%。 |
| 凯文“响尾蛇”韦斯特 | `TychusMarauderHealingWardSpeedBuff` | 莫比斯攻击性合剂 | `TychusMarauderHealingWardSpeedBuff,Off` | HaveTychusMarauderHealingWardSpeedBuffUpgrade | 在恢复器效果范围内的单位获得{Behavior,TychusMarauderHealingWardTargetUpgrade,Modification.A... |
| SCV | `TychusEngineeringBay` | 建造工程站 | `TychusTerranBuild,Build7` | - | 为泰凯斯、不法之徒、奥丁提供升级方案。 / 开启： / - SCV可以建造自动炮塔 |
| SCV | `TychusMercCompound` | 建造枪王藏身处 | `TychusTerranBuild,Build18` | - | 为几大枪王(泰凯斯、“老油条”萨姆、“天狼星”)提供装备升级。 / 开启： / - 乔伊·雷酒吧的“老油条”萨姆 / - 乔伊·雷酒吧的“天狼星” |
| SCV | `TychusArmory` | 建造猛男军械库 | `TychusTerranBuild,Build16` | - | 为几大猛男(“布雷泽”、“弹头哥”、“响尾蛇”)提供装备升级。 / 开启： / - 乔伊·雷酒吧的“布雷泽” / - 乔伊·雷酒吧的“弹头哥” / - 乔... |
| SCV | `TychusGhostAcademy` | 建造鬼手安全屋 | `TychusTerranBuild,Build17` | - | 为几大鬼手(维嘉、纳克斯、尼卡拉中尉)提供装备升级。 / 开启： / - 乔伊·雷酒吧的维嘉 / - 乔伊·雷酒吧的纳克斯 / - 乔伊·雷酒吧的尼卡拉中尉 |

实现备注：科技建筑只负责展示/触发研究；每个单位升级效果由对应 `CommanderUnitTechProfile` 或 `CommanderUpgradeEffectProfile` 声明。

## 09. 特定地图运输机空投单位

Owner：`CommanderCargoLoadoutProfile`、`CommanderMapDropProfile`、`CommanderScenarioFallbackProfile`。

### 运输/空投能力候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| SCV | `BuildTychusMedivacPlatform` | 建造医疗运输机平台 | `TychusTerranBuild,Build14` | - | 运输平台。可以立即将目标区域内的泰凯斯作战单位运送至目标位置，空降时对其进行治疗并使其隐形。 |

### 可投放单位候选

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 劫掠者 | `Marauder` | `Marauder` | Ground; Armored/Biological | 矿:100 气:25 人口字段:-2 生命:125 | 重型突击步兵。 / 可以对地。 |
| SCV | `TychusSCV` | `TychusSCV` | Ground; Biological/Light/Mechanical | 矿:50 气:- 人口字段:-1 生命:45 | 基础工作单位。用于采集资源、建造人类建筑和修理。 / 可以对地 |

实现备注：运输机空投不要读取地图硬编码单位组，应从 `CommanderCargoLoadoutProfile` 读取当前 commander 的 `power_fusion` 单位清单和场景过滤规则。

## 10. 指挥官特殊机制

Owner：`CommanderSpecialMechanicProfile`、`CommanderSpecialResourceProfile`、`CommanderSpecialMechanicHookProfile`、`CommanderSpecialMechanicUnitProfile`。

本指挥官重点：无法训练常规军队，依赖不法之徒招募、装备、酒馆体系。

### 特殊机制命中项

- 有点过去的意思 (`TychusPHLevel1`)
- 新不法之徒：凯文“响尾蛇”韦斯特 (`TychusPHLevel4`)
- 新不法之徒：詹姆斯“天狼星”赛克斯 (`TychusPHLevel6`)
- 闪亮登场第一人 (`TychusPHLevel7`)
- 新不法之徒：罗布“弹头哥”博斯韦尔 (`TychusPHLevel8`)
- 新不法之徒：维嘉 (`TychusPHLevel10`)
- 顺手牵羊 (`TychusPHLevel11`)
- 初级终极装备包 (`TychusPHLevel12`)
- 全副武装 (`TychusPHLevel13`)
- 高级终极装备包 (`TychusPHLevel14`)

### 特殊机制 Upgrade 候选

- 独狼 (`CommanderPrestigeTychusLoneWolf`)
- 不法之徒可用性 (`MasteryTychusHeroCooldown`)
- 三种不法之徒研究强化 (`MasteryTychusUpgradesIncrease`)

### 特殊机制按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 泰凯斯·芬利 | `AttackChampions` | AttackChampions | `attack,Execute` | - | - |
| 泰凯斯·芬利 | `TychusACBandofBrothers` | 神射手联网头盔 | `TychusACBandofBrothers,Off` | HaveTychusACBandofBrothers | 每有一名不法之徒在泰凯斯身边，泰凯斯的武器伤害便提高{Behavior,TychusACBandofBrothersBuff,Modification.D... |
| 泰凯斯·芬利 | `TychusHeroCommonAbil2` | 泰凯斯不法之徒普通技能2 | `TychusHeroCommonAbil2,Execute` | - | - |
| 泰凯斯·芬利 | `TychusHeroCommonAbil3` | 泰凯斯不法之徒普通技能3 | `TychusHeroCommonAbil3,Execute` | - | - |
| 泰凯斯·芬利 | `TychusHeroCommonAbil4` | 泰凯斯不法之徒普通技能4 | `TychusHeroCommonAbil4,Execute` | - | - |
| 泰凯斯·芬利 | `TychusHeroCommonAbil5` | 泰凯斯不法之徒普通技能5 | `TychusHeroCommonAbil5,Execute` | - | - |
| 枪王藏身处 | `TychusACBandofBrothersLearn` | 购买神射手联网头盔 | `TychusHeroResearch2,Research16` | - | 每有一名不法之徒在泰凯斯身边，泰凯斯的武器伤害便提高{Behavior,TychusACBandofBrothersBuff,Modification.D... |
| 枪王藏身处 | `TychusWarhoundHaywireMissilesUpgrade` | 购买SA-55型霹雳飞弹 | `TychusHeroResearch2,Research23` | - | 给“天狼星”装备飞弹，可对{Effect,TychusWarhoundTornadoMissileCP,PeriodCount}名空中目标造成{Effec... |
| 维嘉 | `AttackChampions` | AttackChampions | `attack,Execute` | - | - |
| 维嘉 | `TychusHeroCommonAbil2` | 泰凯斯不法之徒普通技能2 | `TychusHeroCommonAbil2,Execute` | - | - |
| 维嘉 | `TychusHeroCommonAbil3` | 泰凯斯不法之徒普通技能3 | `TychusHeroCommonAbil3,Execute` | - | - |
| 维嘉 | `TychusHeroCommonAbil4` | 泰凯斯不法之徒普通技能4 | `TychusHeroCommonAbil4,Execute` | - | - |
| 维嘉 | `TychusHeroCommonAbil5` | 泰凯斯不法之徒普通技能5 | `TychusHeroCommonAbil5,Execute` | - | - |
| 鬼手安全屋 | `TychusGhostDesc` | 维嘉 | `-` | TychusPassiveGhost | 性格嚣张且下手狠毒的维嘉声称，她是通过伪造自己的死亡而成功逃离了帝国幽灵军校。然而，没有哪个雇佣兵有机会近距离接触到官方记录，来证实她的说辞。但有一点可以... |
| 鬼手安全屋 | `TychusSpectreVisionSuitLearn` | 购买超声波放大器 | `TychusHeroResearch2,Research7` | - | 使纳克斯的超声波脉冲的范围扩大{($UpgradeEffectArrayValue:TychusSpectreVisionSuit:Effect,Tych... |
| 鬼手安全屋 | `TychusSpectreBrillianceAuraLearn` | 购买N3网络 | `TychusHeroResearch2,Research8` | - | 给予纳克斯一项能力，使其可以让附近的所有不法之徒的主要技能的充能时间和冷却时间缩短20%。 |
| 莱纳·尼卡拉中尉 | `TychusHeroCommonAbil2` | 泰凯斯不法之徒普通技能2 | `TychusHeroCommonAbil2,Execute` | - | - |
| 莱纳·尼卡拉中尉 | `TychusHeroCommonAbil3` | 泰凯斯不法之徒普通技能3 | `TychusHeroCommonAbil3,Execute` | - | - |
| 莱纳·尼卡拉中尉 | `TychusHeroCommonAbil4` | 泰凯斯不法之徒普通技能4 | `TychusHeroCommonAbil4,Execute` | - | - |
| 莱纳·尼卡拉中尉 | `TychusHeroCommonAbil5` | 泰凯斯不法之徒普通技能5 | `TychusHeroCommonAbil5,Execute` | - | - |
| 迈尔斯“布雷泽”刘易斯 | `AttackChampions` | AttackChampions | `attack,Execute` | - | - |
| 迈尔斯“布雷泽”刘易斯 | `TychusHeroCommonAbil2` | 泰凯斯不法之徒普通技能2 | `TychusHeroCommonAbil2,Execute` | - | - |
| 迈尔斯“布雷泽”刘易斯 | `TychusHeroCommonAbil3` | 泰凯斯不法之徒普通技能3 | `TychusHeroCommonAbil3,Execute` | - | - |
| 迈尔斯“布雷泽”刘易斯 | `TychusHeroCommonAbil4` | 泰凯斯不法之徒普通技能4 | `TychusHeroCommonAbil4,Execute` | - | - |
| 迈尔斯“布雷泽”刘易斯 | `TychusHeroCommonAbil5` | 泰凯斯不法之徒普通技能5 | `TychusHeroCommonAbil5,Execute` | - | - |
| 猛男军械库 | `TychusMarauderDesc` | 凯文“响尾蛇”韦斯特 | `-` | TychusPassiveMarauder | “响尾蛇”是少数几个从帝国武装部队中荣誉退伍的雇佣兵之一，他也是一个严格坚持自己准则的男人。尽管他会拒绝任何可能伤害无辜的工作，不过“响尾蛇”在做事上绝对... |
| 罗布“弹头哥”博斯韦尔 | `AttackChampions` | AttackChampions | `attack,Execute` | - | - |
| 罗布“弹头哥”博斯韦尔 | `TychusHeroCommonAbil2` | 泰凯斯不法之徒普通技能2 | `TychusHeroCommonAbil2,Execute` | - | - |
| 罗布“弹头哥”博斯韦尔 | `TychusHeroCommonAbil3` | 泰凯斯不法之徒普通技能3 | `TychusHeroCommonAbil3,Execute` | - | - |
| 罗布“弹头哥”博斯韦尔 | `TychusHeroCommonAbil4` | 泰凯斯不法之徒普通技能4 | `TychusHeroCommonAbil4,Execute` | - | - |
| 罗布“弹头哥”博斯韦尔 | `TychusHeroCommonAbil5` | 泰凯斯不法之徒普通技能5 | `TychusHeroCommonAbil5,Execute` | - | - |
| 纳克斯 | `AttackChampions` | AttackChampions | `attack,Execute` | - | - |
| 纳克斯 | `TychusSpectreVisionSuit` | 超声波放大器 | `TychusSpectreVisionSuit,Off` | HaveTychusSpectreVisionSuit | 超声波脉冲的范围扩大{($UpgradeEffectArrayValue:TychusSpectreVisionSuit:Effect,TychusSpe... |
| 纳克斯 | `TychusSpectreBrillianceAura` | N3网络 | `TychusSpectreBrillianceAura,Off` | HaveTychusSpectreBrillianceAura | 附近所有不法之徒的主要技能的充能时间和冷却时间缩短20%。 |
| 纳克斯 | `TychusHeroCommonAbil2` | 泰凯斯不法之徒普通技能2 | `TychusHeroCommonAbil2,Execute` | - | - |
| 纳克斯 | `TychusHeroCommonAbil3` | 泰凯斯不法之徒普通技能3 | `TychusHeroCommonAbil3,Execute` | - | - |
| 纳克斯 | `TychusHeroCommonAbil4` | 泰凯斯不法之徒普通技能4 | `TychusHeroCommonAbil4,Execute` | - | - |
| 纳克斯 | `TychusHeroCommonAbil5` | 泰凯斯不法之徒普通技能5 | `TychusHeroCommonAbil5,Execute` | - | - |
| 詹姆斯“天狼星”赛克斯 | `TychusWarhoundAutoTurret` | 部署战狼炮台 | `TychusWarhoundBuildAutoTurret,Execute` | - | 部署一门自动防御炮台。炮台获得与“天狼星”相同的装备加成。{Behavior,TychusWarhoundAutoTurretTimedLife,Dura... |
| 詹姆斯“天狼星”赛克斯 | `AttackChampions` | AttackChampions | `attack,Execute` | - | - |
| ... | ... | ... | ... | ... | 还有 19 项，后续从 command_cards.json 继续展开 |

实现备注：凡是涉及局内状态、资源、堆叠、全局计时器、隐藏 caster 的机制，都必须有 runtime hook 和 `[XM_DBG]` 日志。

## 11. 指挥官个性化机制

Owner：`CommanderPersonalMechanicProfile`、`CommanderPersonalMechanicEffectProfile`、`CommanderPersonalMechanicHookProfile`、`CommanderPersonalMechanicRequirementProfile`。

本指挥官重点：每个不法之徒等价英雄单位，装备购买和队伍上限必须模块化。

### 威望正向融合输入

| 威望 ID | Primary Upgrade | 禁用单位 | 启用单位 | 禁用 Ability | 补充 Upgrade |
|---|---|---|---|---|---|
| `CommanderPrestigeTychusSquadAbilities` | `CommanderPrestigeTychusSquadAbilities` | `-` | `-` | `-` | `TychusSquadAbilities1, TychusSquadAbilities2` |
| `CommanderPrestigeTychusLoneWolf` | `CommanderPrestigeTychusLoneWolf` | `-` | `-` | `TychusHeroResearch2:15, TychusHeroResearch2:17, TychusHeroResearch2:20, TychusHeroResearch:7, TychusHeroResearch:3, TychusHeroResearch:11, TychusHeroResearch2:2, TychusHeroResearch2:7, TychusHeroResearch2:11` | `TychusLoneWolf1, TychusLoneWolf2` |
| `CommanderPrestigeTychusOdin` | `CommanderPrestigeTychusOdin` | `-` | `-` | `TychusOdinBarrage:, TychusOdinNuclearStrike:, TychusOdinPlatformResearch:1` | `TychusOdin1` |

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
[XM_DBG][INFO][COMMANDER_PROFILE_LOAD] commander=Tychus levelMode=FullLevel15 masteryMode=AllSixMax rosterStage=power_fusion result=ok
[XM_DBG][INFO][POWER_FUSION_APPLY] commander=Tychus levelMode=FullLevel15 masteryMode=AllSixMax prestigeMode=SelectedPositive result=ok
[XM_DBG][INFO][ROSTER_LOAD] commander=Tychus stage=power_fusion units=2 buildings=3 result=ok
[XM_DBG][INFO][MODULE_VERIFY] commander=Tychus module=<01-11> profile=<profile> result=ok
[XM_DBG][WARN][CASC_AUDIT_REQUIRED] commander=Tychus module=<module> object=<object> result=needs-casc-audit
```

## 第一轮待审计项

- 顶部技能的 caster、按钮、冷却、充能、目标转发闭包。
- 英雄或特殊英雄的 Unit、Ability、Behavior、Weapon、Actor、Sound 闭包。
- `power_fusion` 最终 roster 与 `level15` roster 的新增、替换、变体关系。
- 6 项精通的真实作用对象和最终数值。
- 3 个威望的正面收益、负面代价、disable/suppress、费用/冷却/上限变化。
- 科技建筑研究按钮、Requirement、Upgrade effect 是否完整。
- 特殊机制和个性化机制是否需要 runtime hook。
