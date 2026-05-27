# 德哈卡（Dehaka）指挥官细化

日期：2026-05-27

## 当前口径

当前指挥官默认 15 级，不从 1 级开始；精通默认 6 项全部 30 点；威望默认只取正面收益，不直接启用官方 `PlayerPrestige`。`initial` 只作为官方基础状态审计和差异对照，默认测试和玩法应看 `power_fusion` 最终状态。

本文件按 `docs/newdocs/模块拆分` 的 11 个模块整理 德哈卡。依据 `游戏数据/官方合作指挥官/commanders/Dehaka/` 的 JSON 摘要生成；具体 Ability、Behavior、Weapon、Actor、Effect、Requirement 闭包仍需继续追 `references/sc2-build-96883-casc-export/` 或实机 `[XM_DBG]` 日志。

## 官方数据摘要

| 项 | 值 |
|---|---|
| CommanderId | `ZergDehaka` |
| 中文名 | 德哈卡 |
| 默认升级 | `DehakaCommander, SwarmHostFakeWeapon` |
| 默认能力命令 | `-` |
| 威望 ID | `CommanderPrestigeDehakaDevour, CommanderPrestigeDehakaPackLeaders, CommanderPrestigeDehakaClone` |
| heroes 数量 | 4 |
| roster 数量 | 25 |
| units 数量 | 14 |
| buildings 数量 | 7 |
| command card 对象数 | 25 |
| upgrades 数量 | 17 |
| source | `mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/userdata.xml` |

roster 样例：

```text
DehakaCoop, DehakaDrone, DehakaHatchery, DehakaAirTownHall, DehakaBarracks, DehakaCreeper, DehakaCreeperFlying, DehakaGlevig, DehakaGlevigStructure, DehakaMurvar, DehakaMurvarStructure, DehakaDakrun, DehakaDakrunStructure, DehakaHydraliskLevel2, DehakaMutaliskLevel3, DehakaNydusDestroyer, DehakaPrimalSwarmHost, DehakaRavasaur
```

## 15 级解锁摘要

- 1: 精华收集者
- 2: 新单位：掠食龙和原始点火虫
- 3: 掠食龙升级包
- 4: 深槽虫道
- 5: 原始洞察
- 6: 新单位：原始异龙和原始守护者
- 7: 原始异龙和原始守护者升级包
- 8: 新单位：掘地虫宿主和原始穿刺者
- 9: 原始点火虫和原始穿刺者升级包
- 10: 进化的虫群首领
- 11: 新单位：暴龙兽
- 12: 生存本能
- 13: 精英原始异虫升级包
- 14: 泽鲁斯的狡诈
- 15: 基因突变

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
| Lv2 新单位：掠食龙和原始点火虫 | 2 | `PrimalZerglingRavasaurMerge:` | `DehakaLevel02Tooltips` | 可以指挥单位进行原始战斗，强迫进化。解锁以下新进化： / 原始跳虫可以进化为掠食龙。原始蟑螂可以进化为原始点火虫。 |
| Lv2 新单位：掠食龙和原始点火虫 | 2 | `PrimalZerglingRavasaurMerge:1` | `DehakaLevel02Tooltips` | 可以指挥单位进行原始战斗，强迫进化。解锁以下新进化： / 原始跳虫可以进化为掠食龙。原始蟑螂可以进化为原始点火虫。 |
| Lv2 新单位：掠食龙和原始点火虫 | 2 | `PrimalRoachLevel2Merge:` | `DehakaLevel02Tooltips` | 可以指挥单位进行原始战斗，强迫进化。解锁以下新进化： / 原始跳虫可以进化为掠食龙。原始蟑螂可以进化为原始点火虫。 |
| Lv2 新单位：掠食龙和原始点火虫 | 2 | `PrimalRoachLevel2Merge:1` | `DehakaLevel02Tooltips` | 可以指挥单位进行原始战斗，强迫进化。解锁以下新进化： / 原始跳虫可以进化为掠食龙。原始蟑螂可以进化为原始点火虫。 |
| Lv3 掠食龙升级包 | 3 | `DehakaGlevigResearch:8` | `-` | 在格里维格的巢穴中解锁以下升级： / 掠食龙的移动速度和攻击射程提高。掠食龙对重甲敌人的伤害提高15点。 |
| Lv3 掠食龙升级包 | 3 | `DehakaGlevigResearch:9` | `-` | 在格里维格的巢穴中解锁以下升级： / 掠食龙的移动速度和攻击射程提高。掠食龙对重甲敌人的伤害提高15点。 |
| Lv4 深槽虫道 | 4 | `DehakaDeepTunnel:` | `-` | 德哈卡、原始蠕虫和大型原始蠕虫获得深槽虫道技能。 |
| Lv4 深槽虫道 | 4 | `NydusDestroyerDeepTunnel:` | `-` | 德哈卡、原始蠕虫和大型原始蠕虫获得深槽虫道技能。 |
| Lv4 深槽虫道 | 4 | `GreaterNydusDestroyerDeepTunnel:` | `-` | 德哈卡、原始蠕虫和大型原始蠕虫获得深槽虫道技能。 |
| Lv5 原始洞察 | 5 | `DehakaLearn:5` | `-` | 德哈卡的等级上限从10级提高至12级，并解锁以下突变选择： / 获得侦测隐形和潜地单位的技能。提高护甲。 |
| Lv5 原始洞察 | 5 | `DehakaLearn:8` | `-` | 德哈卡的等级上限从10级提高至12级，并解锁以下突变选择： / 获得侦测隐形和潜地单位的技能。提高护甲。 |
| Lv6 新单位：原始异龙和原始守护者 | 6 | `PrimalRoachGuardianMerge:` | `DehakaLevel06Tooltips` | 可以指挥单位进行原始战斗，强迫进化。解锁以下新进化： / 原始刺蛇可以进化为原始异龙。原始蟑螂可以进化为原始守护者。 |
| Lv6 新单位：原始异龙和原始守护者 | 6 | `PrimalRoachGuardianMerge:1` | `DehakaLevel06Tooltips` | 可以指挥单位进行原始战斗，强迫进化。解锁以下新进化： / 原始刺蛇可以进化为原始异龙。原始蟑螂可以进化为原始守护者。 |
| Lv6 新单位：原始异龙和原始守护者 | 6 | `PrimalHydraliskToMutalisk:` | `DehakaLevel06Tooltips` | 可以指挥单位进行原始战斗，强迫进化。解锁以下新进化： / 原始刺蛇可以进化为原始异龙。原始蟑螂可以进化为原始守护者。 |
| Lv6 新单位：原始异龙和原始守护者 | 6 | `PrimalHydraliskToMutalisk:1` | `DehakaLevel06Tooltips` | 可以指挥单位进行原始战斗，强迫进化。解锁以下新进化： / 原始刺蛇可以进化为原始异龙。原始蟑螂可以进化为原始守护者。 |
| Lv6 新单位：原始异龙和原始守护者 | 6 | `DehakaMurvarResearch:7` | `DehakaLevel06Tooltips` | 可以指挥单位进行原始战斗，强迫进化。解锁以下新进化： / 原始刺蛇可以进化为原始异龙。原始蟑螂可以进化为原始守护者。 |
| Lv6 新单位：原始异龙和原始守护者 | 6 | `DehakaMurvarResearch:9` | `DehakaLevel06Tooltips` | 可以指挥单位进行原始战斗，强迫进化。解锁以下新进化： / 原始刺蛇可以进化为原始异龙。原始蟑螂可以进化为原始守护者。 |
| Lv6 新单位：原始异龙和原始守护者 | 6 | `DehakaMurvarResearch:12` | `DehakaLevel06Tooltips` | 可以指挥单位进行原始战斗，强迫进化。解锁以下新进化： / 原始刺蛇可以进化为原始异龙。原始蟑螂可以进化为原始守护者。 |
| Lv7 原始异龙和原始守护者升级包 | 7 | `DehakaMurvarResearch:8` | `-` | 在穆尔瓦的巢穴中解锁以下升级： / 原始异龙死亡后会很快复活。原始守护者可以对敌方地面单位发射范围伤害孢子。 |
| Lv7 原始异龙和原始守护者升级包 | 7 | `DehakaMurvarResearch:10` | `-` | 在穆尔瓦的巢穴中解锁以下升级： / 原始异龙死亡后会很快复活。原始守护者可以对敌方地面单位发射范围伤害孢子。 |
| Lv7 原始异龙和原始守护者升级包 | 7 | `DehakaGuardianMineCharge:` | `-` | 在穆尔瓦的巢穴中解锁以下升级： / 原始异龙死亡后会很快复活。原始守护者可以对敌方地面单位发射范围伤害孢子。 |
| Lv8 新单位：掘地虫宿主和原始穿刺者 | 8 | `PrimalSwarmHostMerge:` | `DehakaLevel08Tooltips` | 可以指挥单位进行原始战斗，强迫进化。解锁以下新进化： / 原始刺蛇可以进化为穿刺者。原始宿主可以进化为掘地虫宿主。 |
| Lv8 新单位：掘地虫宿主和原始穿刺者 | 8 | `PrimalSwarmHostMerge:1` | `DehakaLevel08Tooltips` | 可以指挥单位进行原始战斗，强迫进化。解锁以下新进化： / 原始刺蛇可以进化为穿刺者。原始宿主可以进化为掘地虫宿主。 |
| Lv8 新单位：掘地虫宿主和原始穿刺者 | 8 | `PrimalHydraliskImpalerMerge:` | `DehakaLevel08Tooltips` | 可以指挥单位进行原始战斗，强迫进化。解锁以下新进化： / 原始刺蛇可以进化为穿刺者。原始宿主可以进化为掘地虫宿主。 |
| Lv8 新单位：掘地虫宿主和原始穿刺者 | 8 | `PrimalHydraliskImpalerMerge:1` | `DehakaLevel08Tooltips` | 可以指挥单位进行原始战斗，强迫进化。解锁以下新进化： / 原始刺蛇可以进化为穿刺者。原始宿主可以进化为掘地虫宿主。 |
| Lv9 原始点火虫和原始穿刺者升级包 | 9 | `DehakaGlevigResearch:2` | `-` | 在格里维格的巢穴中解锁以下升级： / 原始点火虫对轻甲单位造成额外伤害。穿刺者的攻击对敌人造成暴捶效果，使其受到持续伤害。德哈卡吞食被暴捶... |
| Lv9 原始点火虫和原始穿刺者升级包 | 9 | `DehakaGlevigResearch:10` | `-` | 在格里维格的巢穴中解锁以下升级： / 原始点火虫对轻甲单位造成额外伤害。穿刺者的攻击对敌人造成暴捶效果，使其受到持续伤害。德哈卡吞食被暴捶... |
| Lv10 进化的虫群首领 | 10 | `DehakaGlevigFirebreath:` | `DehakaPrimalBossUpgrades` | 虫群首领和原始蠕虫获得新技能： / 格里维格获得火焰吐息，可以造成范围伤害。穆尔瓦还会孵化爆裂掘地虫。达克伦可以把伤害反弹给敌方攻击单位。... |
| Lv10 进化的虫群首领 | 10 | `NydusDestroyerBeam:` | `DehakaPrimalBossUpgrades` | 虫群首领和原始蠕虫获得新技能： / 格里维格获得火焰吐息，可以造成范围伤害。穆尔瓦还会孵化爆裂掘地虫。达克伦可以把伤害反弹给敌方攻击单位。... |
| Lv10 进化的虫群首领 | 10 | `DehakaNydusDestroyerTimedNoFoodBeam:` | `DehakaPrimalBossUpgrades` | 虫群首领和原始蠕虫获得新技能： / 格里维格获得火焰吐息，可以造成范围伤害。穆尔瓦还会孵化爆裂掘地虫。达克伦可以把伤害反弹给敌方攻击单位。... |
| Lv11 新单位：暴龙兽 | 11 | `PrimalUltraliskLevel2Merge:` | `DehakaLevel11Tooltips` | 可以指挥单位进行原始战斗，强迫进化。解锁以下新进化： / 原始雷兽可以进化为暴龙兽。暴龙兽获得范围性伤害技能。 |
| Lv11 新单位：暴龙兽 | 11 | `PrimalUltraliskLevel2Merge:1` | `DehakaLevel11Tooltips` | 可以指挥单位进行原始战斗，强迫进化。解锁以下新进化： / 原始雷兽可以进化为暴龙兽。暴龙兽获得范围性伤害技能。 |
| Lv11 新单位：暴龙兽 | 11 | `DehakaDakrunResearch:4` | `DehakaLevel11Tooltips` | 可以指挥单位进行原始战斗，强迫进化。解锁以下新进化： / 原始雷兽可以进化为暴龙兽。暴龙兽获得范围性伤害技能。 |
| Lv12 生存本能 | 12 | `DehakaLearn:4` | `-` | 德哈卡的等级上限从12级提高至14级，并解锁以下突变选择： / 被动治疗附近的友方单位。可以对空。 |
| Lv12 生存本能 | 12 | `DehakaLearn:10` | `-` | 德哈卡的等级上限从12级提高至14级，并解锁以下突变选择： / 被动治疗附近的友方单位。可以对空。 |
| Lv13 精英原始异虫升级包 | 13 | `DehakaDakrunResearch:2` | `-` | 在穆尔瓦和达克伦的巢穴中解锁以下升级： / 原始雷兽和暴龙兽的攻击有几率击晕敌人。暴龙兽使附近友方单位获得额外护甲。掘地虫宿主的掘地虫的移... |
| Lv13 精英原始异虫升级包 | 13 | `DehakaDakrunResearch:3` | `-` | 在穆尔瓦和达克伦的巢穴中解锁以下升级： / 原始雷兽和暴龙兽的攻击有几率击晕敌人。暴龙兽使附近友方单位获得额外护甲。掘地虫宿主的掘地虫的移... |
| Lv13 精英原始异虫升级包 | 13 | `DehakaMurvarResearch:11` | `-` | 在穆尔瓦和达克伦的巢穴中解锁以下升级： / 原始雷兽和暴龙兽的攻击有几率击晕敌人。暴龙兽使附近友方单位获得额外护甲。掘地虫宿主的掘地虫的移... |

### command card 命中

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 达克伦的巢穴 | `EvolveImpalingStrikeLocked` | 进化穿刺打击 | `-` | DehakaLevel13 | 该科技将在指挥官等级13时解锁。 |
| 掘地虫宿主 | `DehakaSpawnLocustsBomb` | 孵化爆裂掘地虫 | `DehakaSpawnCreeperTargeted,Execute` | - | 通过孵化爆裂掘地虫进行攻击的攻城单位。掘地虫持续{Behavior,DehakaLocustTimedLife,Duration}秒。 / 掘地虫可以对地。 |
| 掘地虫宿主 | `DehakaFlyingCreeperLocusts` | 飞行爆裂掘地虫 | `-` | - | 掘地虫宿主孵化的掘地虫可以飞行。掘地虫可以俯冲轰炸地面目标。 |

实现备注：面板只注册 profile 和转发 caster，地图不得按 commander 写 if/else。精通和威望影响面板冷却/充能/费用时，由本模块接收最终 modifier。

## 02. 英雄单位及其技能

Owner：`CommanderHeroProfile`、`CommanderHeroModeProfile`、`CommanderHeroAbilityProfile`、`CommanderHeroSkillTreeProfile`、`CommanderHeroReviveProfile`、`CommanderHeroModifierProfile`。

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 德哈卡 | `DehakaCoop` | `DehakaCoop` | Ground; Biological/Heroic | 矿:- 气:- 人口字段:- 生命:600 | 原始虫群首领。可以从死亡的敌人身上收集精华，用以进化和增强力量。 / 可以对地。 |
| 格里维格 | `DehakaGlevig` | `DehakaGlevig` | Ground; Armored/Biological/Heroic/MapBoss/Massive/User1 | 矿:- 气:- 人口字段:- 生命:1500 | 邪恶危险的虫群首领，能够喷吐酸液、钻入地下并且孵化虫卵。 |
| 穆尔瓦 | `DehakaMurvar` | `DehakaMurvar` | Ground; Armored/Biological/Heroic/MapBoss/Massive | 矿:500 气:- 人口字段:- 生命:2500 | 永恒的虫母。孵化掘地虫并吐出酸液来减缓对手的移动速度。 |
| 达克伦 | `DehakaDakrun` | `DehakaDakrun` | Ground; Armored/Biological/Heroic/MapBoss/Massive | 矿:- 气:- 人口字段:- 生命:4000 | 体型巨大的虫群首领，擅长向敌人冲锋，能够对缺乏警觉的猎物射出一阵脊针箭雨。 |

### 英雄/形态候选

- 精华收集者 (`DehakaPHLevel01`)
- 新单位：掠食龙和原始点火虫 (`DehakaPHLevel02`)
- 掠食龙升级包 (`DehakaPHLevel03`)
- 深槽虫道 (`DehakaPHLevel04`)
- 原始洞察 (`DehakaPHLevel05`)
- 新单位：原始异龙和原始守护者 (`DehakaPHLevel06`)
- 原始异龙和原始守护者升级包 (`DehakaPHLevel07`)
- 新单位：掘地虫宿主和原始穿刺者 (`DehakaPHLevel08`)
- 原始点火虫和原始穿刺者升级包 (`DehakaPHLevel09`)
- 进化的虫群首领 (`DehakaPHLevel10`)
- 新单位：暴龙兽 (`DehakaPHLevel11`)
- 生存本能 (`DehakaPHLevel12`)
- 精英原始异虫升级包 (`DehakaPHLevel13`)
- 泽鲁斯的狡诈 (`DehakaPHLevel14`)

口径：德哈卡吞噬/精华/突变成长需要 runtime hook 记录资源、等级和技能解锁。

待审计：Hero Unit、技能按钮、复活、形态切换、武器/Actor/Sound 闭包。

## 03. 普通单位技能及其进化功能

Owner：`CommanderUnitAbilityProfile`、`CommanderUnitStatProfile`、`CommanderUnitEvolutionProfile`、`CommanderUnitBehaviorProfile`、`CommanderUnitWeaponProfile`。

### 单位技能按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 德哈卡 | `MoveChampions` | MoveChampions | `move,Move` | - | - |
| 德哈卡 | `MoveHoldPosition` | 原地防御 | `move,HoldPos` | - | 命令选中的单位待在原地，并攻击射程内的敌方目标。接受命令的单位不会对敌人进行追击或移向敌人与其交战。 |
| 德哈卡 | `MovePatrol` | 巡逻 | `move,Patrol` | - | 命令选中的单位在当前位置与目标区域间进行巡逻。巡逻的单位会对敌人发起攻击或移向附近的敌人与其交战。 |
| 德哈卡 | `AttackChampions` | AttackChampions | `attack,Execute` | - | - |
| 德哈卡 | `DehakaMendingAura` | 原始恢复 | `DehakaMendingAura,Off` | - | 德哈卡附近的友方单位每秒恢复{Effect,DehakaMendingAuraHealA,VitalArray[Life].Change * 2}点生命值。 |
| 德哈卡 | `DehakaDetector` | 敏锐感官 | `DehakaDetector,Off` | - | 侦测隐形、潜地和幻像单位。 |
| 德哈卡 | `DehakaArmorUpgrade` | 骨板 | `DehakaArmorUpgrade,Off` | - | 护甲提高{Behavior,DehakaArmorUpgrade1,Modification.LifeArmorBonus}点。 |
| 德哈卡 | `DehakaAirAttack` | 致命触击 | `DehakaAirAttackUpgrade,Off` | - | 允许德哈卡攻击空中单位。 |
| 德哈卡 | `DehakaLearnAbilities` | 进化突变 | `-` | - | 你有尚未分配的突变点数。点击此处进行分配。 |
| 德哈卡 | `DehakaLeapStomp` | 跳跃 | `DehakaLeapStomp,Execute` | - | 德哈卡跳向目标位置，对附近的敌方地面单位造成{$AccumulatedValue:Effect,DehakaStompDamageC,Amount$}点伤害。 |
| 德哈卡 | `DehakaIntimidatingRoar` | 破胆咆哮 | `DehakaIntimidatingRoar,Execute` | - | 德哈卡恐吓附近的敌人，使其移动速度降低{Behavior,DehakaIntimidatingRoar,Modification.AdditiveMove... |
| 德哈卡 | `DehakaConsume` | 吞食 | `DehakaConsume,Execute` | - | 立刻杀死目标敌方单位，恢复{Effect,DehakaConsumeEffectHealOther,VitalArray[Life].ChangeFrac... |
| 德哈卡 | `MammothBreath` | 灼热吐息 | `MammothBreath,Execute` | - | 德哈卡的灼热气息烧焦了土地，对沿途所有敌方地面单位造成武器伤害（{$AccumulatedValue:Effect,MammothBreathDamage... |
| 德哈卡 | `DehakaDeepTunnelLocked` | 深槽虫道 | `-` | DehakaLevel04 | 该技能将在指挥官等级4时解锁。 |
| 德哈卡 | `EvolveDehakaPrimalRegenerationLocked` | 进化原始恢复 | `-` | DehakaLevel12 | 该技能将在指挥官等级12时解锁。 |
| 德哈卡 | `EvolveDehakaKeenSensesLocked` | 进化敏锐感官 | `-` | DehakaLevel05 | 该技能将在指挥官等级5时解锁。 |
| 德哈卡 | `EvolveDehakaChitinousPlatingLocked` | 进化骨板 | `-` | DehakaLevel05 | 该技能将在指挥官等级5时解锁。 |
| 德哈卡 | `EvolveDehakaReachingtheSkyLocked` | 进化致命触击 | `-` | DehakaLevel12 | 该技能将在指挥官等级12时解锁。 |
| 德哈卡 | `LearnDehakaLeapStomp` | 进化跳跃 | `DehakaLearn,Learn2` | - | 德哈卡跳向目标位置，对范围内的所有敌方地面单位造成25+50%武器伤害。 / 2级 - 跳跃范围提高6码，伤害提高至25+75%武器伤害。 / 3级 - ... |
| 德哈卡 | `LearnDehakaIntimidatingRoar` | 进化破胆咆哮 | `DehakaLearn,Learn8` | - | 德哈卡威慑附近的敌人，使他们的移动速度降低75%，攻击速度降低25%，持续{Behavior,DehakaIntimidatingRoar,Duratio... |
| 德哈卡 | `LearnDehakaConsume` | 进化吞食 | `DehakaLearn,Learn3` | - | 德哈卡立刻杀死目标敌人，恢复{Effect,DehakaConsumeEffectHealOther,VitalArray[Life].ChangeFra... |
| 德哈卡 | `LearnDehakaMammothBreath` | 进化灼热吐息 | `DehakaLearn,Learn4` | - | 德哈卡的灼热气息烧焦了土地，对沿途所有敌方地面单位造成武器伤害（{$AccumulatedValue:Effect,MammothBreathDamage... |
| 原始工蜂 | `MapObjectInteract` | MapObjectInteract | `MapObjectInteract,Execute` | - | - |
| 原始工蜂 | `MoveHoldPosition` | 原地防御 | `move,HoldPos` | - | 命令选中的单位待在原地，并攻击射程内的敌方目标。接受命令的单位不会对敌人进行追击或移向敌人与其交战。 |
| 原始工蜂 | `MovePatrol` | 巡逻 | `move,Patrol` | - | 命令选中的单位在当前位置与目标区域间进行巡逻。巡逻的单位会对敌人发起攻击或移向附近的敌人与其交战。 |
| 原始工蜂 | `AttackWorker` | AttackWorker | `attack,Execute` | - | - |
| 原始工蜂 | `GatherZerg` | 采集 | `DroneHarvest,Gather` | - | 命令工蜂从选中的矿脉或瓦斯气泉采集资源。 |
| 原始工蜂 | `DehakaBuild` | 召唤建筑 | `255,255` | - | 可以召唤的建筑列表。 |
| 原始工蜂 | `Spray` | 喷漆 | `SprayZerg,Execute` | - | 命令单位将你当前所选喷漆图案喷绘在目标位置的地表上。 |
| 原始工蜂 | `DehakaHatchery` | 召唤原始主巢 | `DehakaDroneMorph,Build1` | - | 基础建筑。用于孵化原始工蜂和接收采集到的资源。为原始异虫提供升级方案。 / 开启： / - 原始工蜂 |
| 原始工蜂 | `DehakaBarracks` | 召唤原始战争之巢 | `DehakaDroneMorph,Build2` | - | 原始异虫生产建筑。 / 开启： / - 原始跳虫 |
| 原始工蜂 | `DehakaGlevigStructure` | 召唤格里维格的巢穴 | `DehakaDroneMorph,Build3` | - | 为原始蟑螂、原始刺蛇、穿刺者和掠食龙提供升级方案。 / 开启： / - 使原始战争之巢可以孵化原始蟑螂 / - 使原始战争之巢可以孵化原始刺蛇 / - 使... |
| 原始工蜂 | `DehakaMurvarStructure` | 召唤穆尔瓦的巢穴 | `DehakaDroneMorph,Build4` | - | 为原始异龙、原始守护者和掘地虫宿主提供升级方案。 / 开启： / - 可以在原始战争之巢中孵化原始宿主。 |
| 原始工蜂 | `DehakaDakrunStructure` | 召唤达克伦的巢穴 | `DehakaDroneMorph,Build5` | - | 为原始雷兽和暴龙兽提供升级方案。 / 开启： / - 使原始战争之巢可以孵化原始雷兽。 |
| 原始工蜂 | `DehakaNydusDestroyer` | 召唤原始蠕虫 | `DehakaDroneMorph,Build6` | - | 强力防御建筑。 / 可以对地和对空。 / 侦测单位 |
| 掘地虫 | `MoveHoldPosition` | 原地防御 | `move,HoldPos` | - | 命令选中的单位待在原地，并攻击射程内的敌方目标。接受命令的单位不会对敌人进行追击或移向敌人与其交战。 |
| 掘地虫 | `MovePatrol` | 巡逻 | `move,Patrol` | - | 命令选中的单位在当前位置与目标区域间进行巡逻。巡逻的单位会对敌人发起攻击或移向附近的敌人与其交战。 |
| 爆裂掘地虫 | `MoveHoldPosition` | 原地防御 | `move,HoldPos` | - | 命令选中的单位待在原地，并攻击射程内的敌方目标。接受命令的单位不会对敌人进行追击或移向敌人与其交战。 |
| 爆裂掘地虫 | `MovePatrol` | 巡逻 | `move,Patrol` | - | 命令选中的单位在当前位置与目标区域间进行巡逻。巡逻的单位会对敌人发起攻击或移向附近的敌人与其交战。 |
| 爆裂掘地虫 | `DehakaLocustFlyingSwoop` | DehakaLocustFlyingSwoop | `DehakaLocustFlyingSwoop,Execute` | - | - |
| 格里维格 | `MoveHoldPosition` | 原地防御 | `move,HoldPos` | - | 命令选中的单位待在原地，并攻击射程内的敌方目标。接受命令的单位不会对敌人进行追击或移向敌人与其交战。 |
| 格里维格 | `MovePatrol` | 巡逻 | `move,Patrol` | - | 命令选中的单位在当前位置与目标区域间进行巡逻。巡逻的单位会对敌人发起攻击或移向附近的敌人与其交战。 |
| 格里维格 | `GlevigFireBreathLocked` | 易燃酸液 | `-` | DehakaLevel10 | 该技能将在指挥官等级10时解锁。 |
| 格里维格 | `GlevigSpitfirePassive` | 助燃腺体 | `-` | - | 格里维格的普通攻击造成范围伤害。 |
| 格里维格 | `CommanderPrestigeDehakaPackLeadersRetreat` | 为陛下让路 | `CommanderPrestigeDehakaPackLeadersRetreat,Execute` | - | 强迫这个虫群首领撤退，并让德哈卡返回战场。 |
| 格里维格 | `GlevigTunnel` | 深槽虫道 | `GlevigDeepTunnel,Execute` | - | 格里维格潜地后到达目标位置并喷发，震退范围内的单位并造成伤害。 |
| 穆尔瓦 | `MoveHoldPosition` | 原地防御 | `move,HoldPos` | - | 命令选中的单位待在原地，并攻击射程内的敌方目标。接受命令的单位不会对敌人进行追击或移向敌人与其交战。 |
| 穆尔瓦 | `MovePatrol` | 巡逻 | `move,Patrol` | - | 命令选中的单位在当前位置与目标区域间进行巡逻。巡逻的单位会对敌人发起攻击或移向附近的敌人与其交战。 |
| 穆尔瓦 | `CoopMurvarSpawnCreepers` | 孵化虫群 | `CoopMurvarSpawnCreepers,Execute` | - | 孵化6只原始蝗虫进行战斗，持续{Behavior,DehakaLocustTimedLife,Duration}秒。 |
| 穆尔瓦 | `MurvarPukeCoop` | 压制恶臭 | `MurvarCoopPuke,Execute` | - | 制造一团云雾，减速敌方单位和建筑，并使其无法攻击和使用能量技能，持续{(Effect,CoopMurvarPukeCP,PeriodCount) * Ef... |
| 穆尔瓦 | `CommanderPrestigeDehakaPackLeadersRetreat` | 为陛下让路 | `CommanderPrestigeDehakaPackLeadersRetreat,Execute` | - | 强迫这个虫群首领撤退，并让德哈卡返回战场。 |
| 达克伦 | `MoveHoldPosition` | 原地防御 | `move,HoldPos` | - | 命令选中的单位待在原地，并攻击射程内的敌方目标。接受命令的单位不会对敌人进行追击或移向敌人与其交战。 |
| 达克伦 | `MovePatrol` | 巡逻 | `move,Patrol` | - | 命令选中的单位在当前位置与目标区域间进行巡逻。巡逻的单位会对敌人发起攻击或移向附近的敌人与其交战。 |
| 达克伦 | `DakrunCrashingCharge` | 野蛮冲锋 | `KraithCrashingCharge,Execute` | - | 向目标位置冲锋，击退该位置的单位并造成{Effect,DehakaDakrunCrashingChargeDamage,Amount}点伤害。 |
| 达克伦 | `DakrunGreaterSpikedHideLocked` | 大型尖刺厚皮 | `-` | DehakaLevel10 | 该技能将在指挥官等级10时解锁。 |
| 达克伦 | `CommanderPrestigeDehakaPackLeadersRetreat` | 为陛下让路 | `CommanderPrestigeDehakaPackLeadersRetreat,Execute` | - | 强迫这个虫群首领撤退，并让德哈卡返回战场。 |
| 原始刺蛇 | `MoveHoldPosition` | 原地防御 | `move,HoldPos` | - | 命令选中的单位待在原地，并攻击射程内的敌方目标。接受命令的单位不会对敌人进行追击或移向敌人与其交战。 |
| 原始刺蛇 | `MovePatrol` | 巡逻 | `move,Patrol` | - | 命令选中的单位在当前位置与目标区域间进行巡逻。巡逻的单位会对敌人发起攻击或移向附近的敌人与其交战。 |
| 原始刺蛇 | `DehakaHydraliskSpeed` | 肌腱扩增 | `-` | HaveDehakaHydraliskSpeed | 提高移动速度和攻击射程。 |
| 原始刺蛇 | `PrimalCombatPrimalMutaliskLocked` | 原始战斗 | `-` | DehakaLevel06 | 该单位将在指挥官等级6时解锁。 |
| ... | ... | ... | ... | ... | 还有 79 项，后续从 command_cards.json 继续展开 |

### 进化/形态/切换候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 德哈卡 | `DehakaLearnAbilities` | 进化突变 | `-` | - | 你有尚未分配的突变点数。点击此处进行分配。 |
| 德哈卡 | `EvolveDehakaPrimalRegenerationLocked` | 进化原始恢复 | `-` | DehakaLevel12 | 该技能将在指挥官等级12时解锁。 |
| 德哈卡 | `EvolveDehakaKeenSensesLocked` | 进化敏锐感官 | `-` | DehakaLevel05 | 该技能将在指挥官等级5时解锁。 |
| 德哈卡 | `EvolveDehakaChitinousPlatingLocked` | 进化骨板 | `-` | DehakaLevel05 | 该技能将在指挥官等级5时解锁。 |
| 德哈卡 | `EvolveDehakaReachingtheSkyLocked` | 进化致命触击 | `-` | DehakaLevel12 | 该技能将在指挥官等级12时解锁。 |
| 德哈卡 | `LearnDehakaLeapStomp` | 进化跳跃 | `DehakaLearn,Learn2` | - | 德哈卡跳向目标位置，对范围内的所有敌方地面单位造成25+50%武器伤害。 / 2级 - 跳跃范围提高6码，伤害提高至25+75%武器伤害。 / 3级 - ... |
| 德哈卡 | `LearnDehakaIntimidatingRoar` | 进化破胆咆哮 | `DehakaLearn,Learn8` | - | 德哈卡威慑附近的敌人，使他们的移动速度降低75%，攻击速度降低25%，持续{Behavior,DehakaIntimidatingRoar,Duratio... |
| 德哈卡 | `LearnDehakaConsume` | 进化吞食 | `DehakaLearn,Learn3` | - | 德哈卡立刻杀死目标敌人，恢复{Effect,DehakaConsumeEffectHealOther,VitalArray[Life].ChangeFra... |
| 德哈卡 | `LearnDehakaMammothBreath` | 进化灼热吐息 | `DehakaLearn,Learn4` | - | 德哈卡的灼热气息烧焦了土地，对沿途所有敌方地面单位造成武器伤害（{$AccumulatedValue:Effect,MammothBreathDamage... |
| 原始工蜂 | `DehakaHatchery` | 召唤原始主巢 | `DehakaDroneMorph,Build1` | - | 基础建筑。用于孵化原始工蜂和接收采集到的资源。为原始异虫提供升级方案。 / 开启： / - 原始工蜂 |
| 原始工蜂 | `DehakaBarracks` | 召唤原始战争之巢 | `DehakaDroneMorph,Build2` | - | 原始异虫生产建筑。 / 开启： / - 原始跳虫 |
| 原始工蜂 | `DehakaGlevigStructure` | 召唤格里维格的巢穴 | `DehakaDroneMorph,Build3` | - | 为原始蟑螂、原始刺蛇、穿刺者和掠食龙提供升级方案。 / 开启： / - 使原始战争之巢可以孵化原始蟑螂 / - 使原始战争之巢可以孵化原始刺蛇 / - 使... |
| 原始工蜂 | `DehakaMurvarStructure` | 召唤穆尔瓦的巢穴 | `DehakaDroneMorph,Build4` | - | 为原始异龙、原始守护者和掘地虫宿主提供升级方案。 / 开启： / - 可以在原始战争之巢中孵化原始宿主。 |
| 原始工蜂 | `DehakaDakrunStructure` | 召唤达克伦的巢穴 | `DehakaDroneMorph,Build5` | - | 为原始雷兽和暴龙兽提供升级方案。 / 开启： / - 使原始战争之巢可以孵化原始雷兽。 |
| 原始工蜂 | `DehakaNydusDestroyer` | 召唤原始蠕虫 | `DehakaDroneMorph,Build6` | - | 强力防御建筑。 / 可以对地和对空。 / 侦测单位 |
| 原始主巢 | `DehakaDrone` | 孵化原始工蜂 | `DehakaHatcheryTrainEgg,Train1` | - | 基础工作单位。用于采集晶体矿和高能瓦斯。可以召唤建筑。 / 可以对地。 |
| 原始主巢 | `DehakaLearnPrimalWeaponsLevel3` | 进化原始攻击等级3 | `DehakaHatcheryResearch,Research3` | - | 使所有原始异虫的攻击力最大化。 |
| 原始主巢 | `DehakaLearnPrimalArmorLevel3` | 进化原始甲壳等级3 | `DehakaHatcheryResearch,Research6` | - | 使所有原始异虫的护甲最大化。 |
| 原始主巢 | `PrimalBuildingUproot` | PrimalBuildingUproot | `DehakaHatcheryUproot,Execute` | - | - |
| 原始主巢 | `PrimalBuildingUproot` | PrimalBuildingUproot | `DehakaAirTownHallUproot,Execute` | - | - |
| 原始战争之巢 | `DehakaZergling` | 孵化原始跳虫 | `DehakaBarracksTrainEgg,Train1` | - | 迅捷的肉搏型生物。 / 可以对地。 |
| 原始战争之巢 | `DehakaRoach` | 孵化原始蟑螂 | `DehakaBarracksTrainEgg,Train2` | - | 突击单位。潜地时能快速恢复生命值。 / 可以对地。 |
| 原始战争之巢 | `DehakaHydralisk` | 孵化原始刺蛇 | `DehakaBarracksTrainEgg,Train3` | - | 远程攻击单位。 / 可以对地和对空。 |
| 原始战争之巢 | `DehakaSwarmHost` | 孵化原始宿主 | `DehakaBarracksTrainEgg,Train4` | - | 通过孵化蝗虫进行攻击的攻城单位。 / 蝗虫可以对地。 |
| 原始战争之巢 | `DehakaUltralisk` | 孵化原始雷兽 | `DehakaBarracksTrainEgg,Train5` | - | 重型攻击猛兽。可以向一个目标冲锋，造成范围伤害并击退敌方单位。 / 可以对地。 |
| 原始战争之巢 | `PrimalBuildingUproot` | PrimalBuildingUproot | `DehakaBarracksUproot,Execute` | - | - |
| 格里维格的巢穴 | `EvolveDissolvingAcidLocked` | 进化溶解强酸 | `-` | DehakaLevel03 | 该科技将在指挥官等级3时解锁。 |
| 格里维格的巢穴 | `EvolveEnlargedParotidGlandsLocked` | 进化膨胀腮腺 | `-` | DehakaLevel03 | 该科技将在指挥官等级3时解锁。 |
| 格里维格的巢穴 | `DehakaRoachMoveSpeed` | 进化神经胶原重组 | `DehakaGlevigResearch,Research7` | - | 使原始蟑螂和原始点火虫的移动速度提高。 |
| 格里维格的巢穴 | `EvolveConcentratedFireLocked` | 进化汇聚烈焰 | `-` | DehakaLevel09 | 该科技将在指挥官等级9时解锁。 |
| ... | ... | ... | ... | ... | 还有 48 项，后续从 command_cards.json 继续展开 |

实现备注：单位自己声明技能、形态和升级接入口；科技建筑只展示符合条件的研究项，不直接拥有单位升级逻辑。

## 04. 初始化基地与特殊建筑

Owner：`CommanderRuntimeProfile`、`CommanderScenarioLoadout`、`CommanderSpecialStructureProfile`、`CommanderInitialCasterProfile`。

### 初始化建筑候选

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 原始主巢 | `DehakaHatchery` | `DehakaHatchery` | Ground; Armored/Biological/Structure | 矿:450 气:- 人口字段:-6 生命:1500 | 基础建筑。用于孵化原始工蜂和接收采集到的资源。为原始异虫提供升级方案。 / 开启： / - 原始工蜂 |
| 原始主巢 | `DehakaAirTownHall` | `DehakaAirTownHall` | Ground; Armored/Biological/Structure | 矿:450 气:- 人口字段:24 生命:1500 | 基础建筑。用于孵化原始工蜂和接收采集到的资源。为原始异虫提供升级方案。 / 开启： / - 原始工蜂 |
| 格里维格的巢穴 | `DehakaGlevigStructure` | `DehakaGlevigStructure` | Ground; Armored/Biological/Structure | 矿:250 气:100 人口字段:- 生命:1500 | 为原始蟑螂、原始刺蛇、穿刺者和掠食龙提供升级方案。 / 开启： / - 使原始战争之巢可以孵化原始蟑螂 / - 使原始战争之巢可以孵化原始刺蛇 / -... |
| 穆尔瓦的巢穴 | `DehakaMurvarStructure` | `DehakaMurvarStructure` | Ground; Armored/Biological/Structure | 矿:250 气:200 人口字段:- 生命:1500 | 为原始异龙、原始守护者和掘地虫宿主提供升级方案。 / 开启： / - 可以在原始战争之巢中孵化原始宿主。 |
| 达克伦的巢穴 | `DehakaDakrunStructure` | `DehakaDakrunStructure` | Ground; Armored/Biological/Structure | 矿:250 气:200 人口字段:- 生命:1500 | 为原始雷兽和暴龙兽提供升级方案。 / 开启： / - 使原始战争之巢可以孵化原始雷兽。 |

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
| 原始工蜂 | `DehakaDrone` | `DehakaDrone` | Ground; Biological/Light | 矿:50 气:- 人口字段:-1 生命:40 | 基础工作单位。用于采集晶体矿和高能瓦斯。可以召唤建筑。 / 可以对地。 |
| 掘地虫 | `DehakaCreeper` | `DehakaCreeper` | Ground; Biological/Light | 矿:- 气:- 人口字段:- 生命:130 | - |
| 爆裂掘地虫 | `DehakaCreeperFlying` | `DehakaCreeperFlying` | Air; Biological/Light | 矿:- 气:- 人口字段:- 生命:130 | 孵化自掘地虫宿主。爆裂掘地虫持续{Behavior,DehakaCreeperTimedLife,Duration}秒。 / 可以对地。 |
| 原始刺蛇 | `DehakaHydraliskLevel2` | `DehakaHydraliskLevel2` | Ground; Biological/Light | 矿:100 气:50 人口字段:-2 生命:100 | - |
| 原始异龙 | `DehakaMutaliskLevel3` | `DehakaMutaliskLevel3` | Air; Biological/Light | 矿:100 气:100 人口字段:-3 生命:200 | - |
| 掘地虫宿主 | `DehakaPrimalSwarmHost` | `DehakaPrimalSwarmHost` | Ground; Armored/Biological | 矿:100 气:75 人口字段:-5 生命:160 | 通过孵化掘地虫进行攻击的攻城单位。 / 掘地虫可以对地。 |
| 掠食龙 | `DehakaRavasaur` | `DehakaRavasaur` | Ground; Armored/Biological | 矿:150 气:50 人口字段:-2 生命:90 | 远程单位。可以远距离发射大量酸性液体。 / 可以对地。 |
| 原始蟑螂 | `DehakaRoachLevel2` | `DehakaRoachLevel2` | Ground; Armored/Biological | 矿:75 气:25 人口字段:-2 生命:175 | - |
| 原始点火虫 | `DehakaRoachLevel3` | `DehakaRoachLevel3` | Ground; Armored/Biological | 矿:75 气:25 人口字段:-3 生命:350 | 突击单位。可造成范围伤害。潜地时能快速恢复生命值。 / 可以对地。 |
| 原始宿主 | `DehakaSwarmHost` | `DehakaSwarmHost` | Ground; Armored/Biological | 矿:100 气:75 人口字段:-3 生命:160 | 通过孵化蝗虫进行攻击的攻城单位。 / 蝗虫可以对地。 |
| 原始雷兽 | `DehakaUltraliskLevel2` | `DehakaUltraliskLevel2` | Ground; Armored/Biological/Massive | 矿:300 气:200 人口字段:-6 生命:625 | - |
| 暴龙兽 | `DehakaUltraliskLevel3` | `DehakaUltraliskLevel3` | Ground; Armored/Biological/Massive | 矿:450 气:300 人口字段:-9 生命:1000 | 重型攻击猛兽。可造成地面范围伤害。 / 可以对地和对空。 |
| 原始跳虫 | `DehakaZerglingLevel2` | `DehakaZerglingLevel2` | Ground; Biological/Light | 矿:50 气:- 人口字段:-1 生命:90 | - |
| 穿刺者 | `ImpalerDehaka` | `ImpalerDehaka` | Ground; Armored/Biological | 矿:200 气:100 人口字段:-3 生命:200 | 远程反重甲伏击单位。必须潜地后才能发动攻击。 / 可以对地。 |

三阶段口径：`initial` 只做审计，`level15` 表示满级解锁，`power_fusion` 表示 15 级 + 六精通全满 + 威望正向收益后的默认运行清单。

## 06. 指挥官精通

Owner：`CommanderMasteryProfile`、`CommanderMasteryEffectProfile`、`CommanderMasteryModifierProfile`。

| 组 | 名称 | Upgrade | 每点 | 30点口径 |
|---|---|---|---|---|
| 1 | 提升吞食治疗 | `MasteryDehakaConsumeHealing` | 1 | +30% |
| 1 | 吞噬加成持续时间 | `MasteryDehakaConsumeDuration` | 3 | +90% |
| 2 | 原始蠕虫冷却时间缩短 | `MasteryDehakaPrimalWurmCDR` | 2 | +60% |
| 2 | 原始首领生命计时持续时间 | `MasteryDehakaBossTimedLife` | 1 | +30% |
| 3 | 基因突变几率 | `MasteryDehakaGeneMutation` | 1 | +30% |
| 3 | 德哈卡攻击速度 | `MasteryDehakaAttackSpeed` | 1 | +30% |

实现备注：当前默认六项全部 30 点。表里的 30 点口径由 `point_increments * 30` 推导，最终数值仍需以 Upgrade Effect 闭包验证。

## 07. 指挥官建筑

Owner：`CommanderBuildingProfile`、`CommanderBuildingAbilityProfile`、`CommanderBuildingTrainProfile`、`CommanderBuildingStageProfile`、`CommanderBuildingBehaviorProfile`。

来源：官方提取 `buildings.json`。

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 原始主巢 | `DehakaHatchery` | `DehakaHatchery` | Ground; Armored/Biological/Structure | 矿:450 气:- 人口字段:-6 生命:1500 | 基础建筑。用于孵化原始工蜂和接收采集到的资源。为原始异虫提供升级方案。 / 开启： / - 原始工蜂 |
| 原始主巢 | `DehakaAirTownHall` | `DehakaAirTownHall` | Ground; Armored/Biological/Structure | 矿:450 气:- 人口字段:24 生命:1500 | 基础建筑。用于孵化原始工蜂和接收采集到的资源。为原始异虫提供升级方案。 / 开启： / - 原始工蜂 |
| 原始战争之巢 | `DehakaBarracks` | `DehakaBarracks` | Ground; Armored/Biological/Structure | 矿:250 气:- 人口字段:-2 生命:400 | 原始异虫生产建筑。 / 开启： / - 原始跳虫 |
| 格里维格的巢穴 | `DehakaGlevigStructure` | `DehakaGlevigStructure` | Ground; Armored/Biological/Structure | 矿:250 气:100 人口字段:- 生命:1500 | 为原始蟑螂、原始刺蛇、穿刺者和掠食龙提供升级方案。 / 开启： / - 使原始战争之巢可以孵化原始蟑螂 / - 使原始战争之巢可以孵化原始刺蛇 / -... |
| 穆尔瓦的巢穴 | `DehakaMurvarStructure` | `DehakaMurvarStructure` | Ground; Armored/Biological/Structure | 矿:250 气:200 人口字段:- 生命:1500 | 为原始异龙、原始守护者和掘地虫宿主提供升级方案。 / 开启： / - 可以在原始战争之巢中孵化原始宿主。 |
| 达克伦的巢穴 | `DehakaDakrunStructure` | `DehakaDakrunStructure` | Ground; Armored/Biological/Structure | 矿:250 气:200 人口字段:- 生命:1500 | 为原始雷兽和暴龙兽提供升级方案。 / 开启： / - 使原始战争之巢可以孵化原始雷兽。 |
| 原始蠕虫 | `DehakaNydusDestroyer` | `DehakaNydusDestroyer` | Ground; Armored/Biological/Structure/User1 | 矿:300 气:- 人口字段:-2 生命:500 | 强力防御建筑。 / 可以对地和对空。 / 侦测单位 |

### 建筑按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 原始主巢 | `DehakaDrone` | 孵化原始工蜂 | `DehakaHatcheryTrainEgg,Train1` | - | 基础工作单位。用于采集晶体矿和高能瓦斯。可以召唤建筑。 / 可以对地。 |
| 原始主巢 | `BuildDehakaExtractor` | 变异萃取房 | `DehakaHatcheryBuild,Build1` | - | 建造在瓦斯气泉上，用于采集高能瓦斯。 |
| 原始主巢 | `RallySCV` | 设定工蜂集结点 | `RallyCommand,Rally1` | - | 将工作单位派往指定地点。派往资源点的工作单位会自动开始采集。 |
| 原始主巢 | `DehakaLearnPrimalWeaponsLevel3` | 进化原始攻击等级3 | `DehakaHatcheryResearch,Research3` | - | 使所有原始异虫的攻击力最大化。 |
| 原始主巢 | `DehakaLearnPrimalArmorLevel3` | 进化原始甲壳等级3 | `DehakaHatcheryResearch,Research6` | - | 使所有原始异虫的护甲最大化。 |
| 原始主巢 | `PrimalBuildingUproot` | PrimalBuildingUproot | `DehakaHatcheryUproot,Execute` | - | - |
| 原始主巢 | `CancelBuilding` | 取消 | `PrimalBuildInProgress,Cancel` | - | 取消建造，摧毁尚未建造完成的建筑并返还部分资源。 |
| 原始主巢 | `AttackBuilding` | 攻击 | `attack,Execute` | - | 锁定并且攻击目标，直到超出射程或对方被摧毁。 |
| 原始主巢 | `DehakaMutalisk` | DehakaMutalisk | `DehakaTownHallTrain,Train7` | - | 飞行生物。能够利用弹射攻击对多个目标造成伤害。 / 可以对地和对空。 |
| 原始主巢 | `DehakaGuardian` | DehakaGuardian | `DehakaTownHallTrain,Train8` | - | 远程对地飞行单位。 / 可以对地。 |
| 原始主巢 | `DehakaViper` | DehakaViper | `DehakaTownHallTrain,Train9` | - | - |
| 原始主巢 | `SetRallyPoint2` | 设定集结点 | `Rally,Rally1` | - | 将生成的单位派往指定地点。 |
| 原始主巢 | `PrimalBuildingUproot` | PrimalBuildingUproot | `DehakaAirTownHallUproot,Execute` | - | - |
| 原始主巢 | `CancelBuilding` | 取消 | `BuildInProgress,Cancel` | - | 取消建造，摧毁尚未建造完成的建筑并返还部分资源。 |
| 原始战争之巢 | `DehakaZergling` | 孵化原始跳虫 | `DehakaBarracksTrainEgg,Train1` | - | 迅捷的肉搏型生物。 / 可以对地。 |
| 原始战争之巢 | `DehakaRoach` | 孵化原始蟑螂 | `DehakaBarracksTrainEgg,Train2` | - | 突击单位。潜地时能快速恢复生命值。 / 可以对地。 |
| 原始战争之巢 | `DehakaHydralisk` | 孵化原始刺蛇 | `DehakaBarracksTrainEgg,Train3` | - | 远程攻击单位。 / 可以对地和对空。 |
| 原始战争之巢 | `DehakaSwarmHost` | 孵化原始宿主 | `DehakaBarracksTrainEgg,Train4` | - | 通过孵化蝗虫进行攻击的攻城单位。 / 蝗虫可以对地。 |
| 原始战争之巢 | `DehakaUltralisk` | 孵化原始雷兽 | `DehakaBarracksTrainEgg,Train5` | - | 重型攻击猛兽。可以向一个目标冲锋，造成范围伤害并击退敌方单位。 / 可以对地。 |
| 原始战争之巢 | `SetRallyPoint2` | 设定集结点 | `Rally,Rally1` | - | 将生成的单位派往指定地点。 |
| 原始战争之巢 | `PrimalBuildingUproot` | PrimalBuildingUproot | `DehakaBarracksUproot,Execute` | - | - |
| 原始战争之巢 | `CancelBuilding` | 取消 | `PrimalBuildInProgress,Cancel` | - | 取消建造，摧毁尚未建造完成的建筑并返还部分资源。 |
| 格里维格的巢穴 | `EvolveDissolvingAcidLocked` | 进化溶解强酸 | `-` | DehakaLevel03 | 该科技将在指挥官等级3时解锁。 |
| 格里维格的巢穴 | `EvolveEnlargedParotidGlandsLocked` | 进化膨胀腮腺 | `-` | DehakaLevel03 | 该科技将在指挥官等级3时解锁。 |
| 格里维格的巢穴 | `DehakaRoachMoveSpeed` | 进化神经胶原重组 | `DehakaGlevigResearch,Research7` | - | 使原始蟑螂和原始点火虫的移动速度提高。 |
| 格里维格的巢穴 | `EvolveConcentratedFireLocked` | 进化汇聚烈焰 | `-` | DehakaLevel09 | 该科技将在指挥官等级9时解锁。 |
| 格里维格的巢穴 | `ResearchDehakaHydraliskSpeed` | 进化肌腱扩增 | `DehakaGlevigResearch,Research8` | - | 提高原始刺蛇的移动速度和攻击射程。 |
| 格里维格的巢穴 | `EvolveTenderizeLocked` | 进化暴捶 | `-` | DehakaLevel09 | 该科技将在指挥官等级9时解锁。 |
| 格里维格的巢穴 | `PrimalWurmPassive` | 原始蠕虫 | `-` | - | 格里维格的巢穴使你可以召唤原始蠕虫。 |
| 格里维格的巢穴 | `DehakaRoachPassive` | 原始蟑螂 | `-` | - | 格里维格的巢穴使你可以孵化原始蟑螂。 |
| 格里维格的巢穴 | `PrimalIgniterPassive` | 原始点火虫 | `-` | PrimalIgniterPassive | 格里维格的巢穴使你可以进化原始点火虫。 |
| 格里维格的巢穴 | `PrimalHydraliskPassive` | 原始刺蛇 | `-` | - | 格里维格的巢穴使你可以孵化原始刺蛇。 |
| 格里维格的巢穴 | `PrimalImpalerPassive` | 原始穿刺者 | `-` | PrimalImpalerPassive | 格里维格的巢穴使你可以进化原始穿刺者。 |
| 格里维格的巢穴 | `CancelBuilding` | 取消 | `PrimalBuildInProgress,Cancel` | - | 取消建造，摧毁尚未建造完成的建筑并返还部分资源。 |
| 穆尔瓦的巢穴 | `EvolveSlicingGlaveLocked` | 切割之爪 | `-` | DehakaLevel06 | 该科技将在指挥官等级6时解锁。 |
| 穆尔瓦的巢穴 | `EvolveShiftingCarapaceLocked` | 进化变换甲壳 | `-` | DehakaLevel06 | 该科技将在指挥官等级6时解锁。 |
| 穆尔瓦的巢穴 | `EvolvePrimalReconstitutionLocked` | 进化原始重组 | `-` | DehakaLevel07 | 该科技将在指挥官等级7时解锁。 |
| 穆尔瓦的巢穴 | `EvolveExplosiveSporesLocked` | 进化爆裂孢子 | `-` | DehakaLevel07 | 该科技将在指挥官等级7时解锁。 |
| 穆尔瓦的巢穴 | `EvolvePrimordialFuryLocked` | 进化原始狂怒 | `-` | DehakaLevel06 | 该科技将在指挥官等级6时解锁。 |
| 穆尔瓦的巢穴 | `EvolveAerialBurstSacsLocked` | 进化空中爆囊 | `-` | DehakaLevel13 | 该科技将在指挥官等级13时解锁。 |
| 穆尔瓦的巢穴 | `PrimalHostPassive` | 原始宿主 | `-` | - | 穆尔瓦的巢穴使你可以孵化原始宿主。 |
| 穆尔瓦的巢穴 | `CreeperHostPassive` | 掘地虫宿主 | `-` | CreeperHostPassive | 穆尔瓦的巢穴使你可以进化掘地虫宿主。 |
| 穆尔瓦的巢穴 | `PrimalMutaliskPassive` | 原始异龙 | `-` | PrimalMutaliskPassive | 穆尔瓦的巢穴使你可以进化原始异龙。 |
| 穆尔瓦的巢穴 | `PrimalGuardianPassive` | 原始守护者 | `-` | PrimalGuardianPassive | 穆尔瓦的巢穴使你可以进化原始守护者。 |
| 穆尔瓦的巢穴 | `CancelBuilding` | 取消 | `PrimalBuildInProgress,Cancel` | - | 取消建造，摧毁尚未建造完成的建筑并返还部分资源。 |
| 达克伦的巢穴 | `ResearchDehakaUltraliskCrashingCharge` | 进化野蛮冲锋 | `DehakaDakrunResearch,Research1` | - | 原始雷兽可以向目标位置冲锋，击退范围内的单位并造成{Effect,DehakaUltraliskCrashingChargeDamage,Amount}点伤害。 |
| 达克伦的巢穴 | `ResearchDehakaUltraliskRegen` | 进化治疗适性 | `DehakaDakrunResearch,Research2` | - | 原始雷兽和暴龙兽在脱离战斗后可快速恢复生命值。 |
| 达克伦的巢穴 | `EvolveImpalingStrikeLocked` | 进化穿刺打击 | `-` | DehakaLevel13 | 该科技将在指挥官等级13时解锁。 |
| 达克伦的巢穴 | `EvolveBarrageofSpikesLocked` | 进化尖刺弹幕 | `-` | DehakaLevel11 | 该科技将在指挥官等级11时解锁。 |
| 达克伦的巢穴 | `EvolveTyrantsProtectionLocked` | 进化暴龙的保护 | `-` | DehakaLevel13 | 该科技将在指挥官等级13时解锁。 |
| 达克伦的巢穴 | `PrimalUltraliskPassive` | 原始雷兽 | `-` | - | 达克伦的巢穴使你可以孵化原始雷兽。 |
| 达克伦的巢穴 | `TyrannozorPassive` | 暴龙兽 | `-` | TyrannozorPassive | 达克伦的巢穴使你可以进化暴龙兽。 |
| 达克伦的巢穴 | `CancelBuilding` | 取消 | `PrimalBuildInProgress,Cancel` | - | 取消建造，摧毁尚未建造完成的建筑并返还部分资源。 |
| 原始蠕虫 | `AttackBuilding` | 攻击 | `attack,Execute` | - | 锁定并且攻击目标，直到超出射程或对方被摧毁。 |
| 原始蠕虫 | `Detector` | 侦测单位 | `-` | - | 该单位能够侦测到隐形、潜地和幻像单位。 |
| 原始蠕虫 | `BileStreamLocked` | 胆汁喷流 | `-` | DehakaLevel10 | 该技能将在指挥官等级10时解锁。 |
| 原始蠕虫 | `CancelBuilding` | 取消 | `BuildInProgress,Cancel` | - | 取消建造，摧毁尚未建造完成的建筑并返还部分资源。 |

实现备注：建筑声明自身生产、研究、行为和阶段；训练单位的最终可用性由兵种/科技/精通/威望共同裁决。

## 08. 科技建筑及其升级选项

Owner：`CommanderTechBuildingProfile`、`CommanderUnitTechProfile`、`CommanderUpgradeProfile`、`CommanderUpgradeRequirementProfile`、`CommanderUpgradeEffectProfile`。

### 15 级解锁与研究命令

| 等级 | 名称 | 解锁升级 | 解锁 AbilityCmd | 说明 |
|---|---|---|---|---|
| 1 | 精华收集者 | `-` | `-` | 德哈卡可以收集精华、变强和选择突变。德哈卡孵化速度比其他英雄单位都要快，而且可以吞食原始工蜂来缩短复活时间。 |
| 2 | 新单位：掠食龙和原始点火虫 | `DehakaLevel02Tooltips` | `PrimalZerglingRavasaurMerge:, PrimalZerglingRavasaurMerge:1, PrimalRoachLevel2Merge:, PrimalRoachLevel2Merge:1` | 可以指挥单位进行原始战斗，强迫进化。解锁以下新进化： / 原始跳虫可以进化为掠食龙。原始蟑螂可以进化为原始点火虫。 |
| 3 | 掠食龙升级包 | `-` | `DehakaGlevigResearch:8, DehakaGlevigResearch:9` | 在格里维格的巢穴中解锁以下升级： / 掠食龙的移动速度和攻击射程提高。掠食龙对重甲敌人的伤害提高15点。 |
| 4 | 深槽虫道 | `-` | `DehakaDeepTunnel:, NydusDestroyerDeepTunnel:, GreaterNydusDestroyerDeepTunnel:` | 德哈卡、原始蠕虫和大型原始蠕虫获得深槽虫道技能。 |
| 5 | 原始洞察 | `-` | `DehakaLearn:5, DehakaLearn:8` | 德哈卡的等级上限从10级提高至12级，并解锁以下突变选择： / 获得侦测隐形和潜地单位的技能。提高护甲。 |
| 6 | 新单位：原始异龙和原始守护者 | `DehakaLevel06Tooltips` | `PrimalRoachGuardianMerge:, PrimalRoachGuardianMerge:1, PrimalHydraliskToMutalisk:, PrimalHydraliskToMutalisk:1, DehakaMurvarResearch:7, DehakaMurvarResearch:9, DehakaMurvarResearch:12` | 可以指挥单位进行原始战斗，强迫进化。解锁以下新进化： / 原始刺蛇可以进化为原始异龙。原始蟑螂可以进化为原始守护者。 |
| 7 | 原始异龙和原始守护者升级包 | `-` | `DehakaMurvarResearch:8, DehakaMurvarResearch:10, DehakaGuardianMineCharge:` | 在穆尔瓦的巢穴中解锁以下升级： / 原始异龙死亡后会很快复活。原始守护者可以对敌方地面单位发射范围伤害孢子。 |
| 8 | 新单位：掘地虫宿主和原始穿刺者 | `DehakaLevel08Tooltips` | `PrimalSwarmHostMerge:, PrimalSwarmHostMerge:1, PrimalHydraliskImpalerMerge:, PrimalHydraliskImpalerMerge:1` | 可以指挥单位进行原始战斗，强迫进化。解锁以下新进化： / 原始刺蛇可以进化为穿刺者。原始宿主可以进化为掘地虫宿主。 |
| 9 | 原始点火虫和原始穿刺者升级包 | `-` | `DehakaGlevigResearch:2, DehakaGlevigResearch:10` | 在格里维格的巢穴中解锁以下升级： / 原始点火虫对轻甲单位造成额外伤害。穿刺者的攻击对敌人造成暴捶效果，使其受到持续伤害。德哈卡吞食被暴捶的敌人后产生的冷却时间是通常的25%。 |
| 10 | 进化的虫群首领 | `DehakaPrimalBossUpgrades` | `DehakaGlevigFirebreath:, NydusDestroyerBeam:, DehakaNydusDestroyerTimedNoFoodBeam:` | 虫群首领和原始蠕虫获得新技能： / 格里维格获得火焰吐息，可以造成范围伤害。穆尔瓦还会孵化爆裂掘地虫。达克伦可以把伤害反弹给敌方攻击单位。原始蠕虫和大型原始蠕虫获得发射强力酸... |
| 11 | 新单位：暴龙兽 | `DehakaLevel11Tooltips` | `PrimalUltraliskLevel2Merge:, PrimalUltraliskLevel2Merge:1, DehakaDakrunResearch:4` | 可以指挥单位进行原始战斗，强迫进化。解锁以下新进化： / 原始雷兽可以进化为暴龙兽。暴龙兽获得范围性伤害技能。 |
| 12 | 生存本能 | `-` | `DehakaLearn:4, DehakaLearn:10` | 德哈卡的等级上限从12级提高至14级，并解锁以下突变选择： / 被动治疗附近的友方单位。可以对空。 |
| 13 | 精英原始异虫升级包 | `-` | `DehakaDakrunResearch:2, DehakaDakrunResearch:3, DehakaMurvarResearch:11` | 在穆尔瓦和达克伦的巢穴中解锁以下升级： / 原始雷兽和暴龙兽的攻击有几率击晕敌人。暴龙兽使附近友方单位获得额外护甲。掘地虫宿主的掘地虫的移动速度提高，而且可以对空。 |
| 14 | 泽鲁斯的狡诈 | `DehakaBonusSkillPoint` | `-` | 德哈卡的等级上限从14级提高至15级，并且一开始就有额外的突变点数。 |
| 15 | 基因突变 | `-` | `-` | 原始战斗进化有几率变异，可以提供永久被动加成，提高生命值、攻击速度、获得生命吸取等。 |

### Upgrade 摘要

| Upgrade | 父级 | 显示名 | Effect数 | 说明 |
|---|---|---|---|---|
| `CommanderPrestigeDehakaClone` | `CommanderPrestige` | 原生双雄 | 0 | 优点 / 德哈卡孵化一个克隆体。 / 缺点 / 如果二者任意一方死亡，另一方也会死亡。 |
| `CommanderPrestigeDehakaDevour` | `CommanderPrestige` | 吞噬者 | 5 | 优点 / 吞食会为所有附近的友方单位提供同样的增益效果。 / 缺点 / 德哈卡的基础护甲值变为0，失去灼热吐息技能，并且其最高等级降低4级。 |
| `CommanderPrestigeDehakaPackLeaders` | `CommanderPrestige` | 原始竞争者 | 3 | 优点 / 虫群首领和他们的随从伤害提高50%，生命值提高100%。虫群首领的冷却时间缩短33%。虫群首领可以为德哈卡吸收精华。 / 缺点 / 当虫群首领激活时，德... |
| `DehakaBonusSkillPoint` | `-` | - | 1 | - |
| `DehakaCommander` | `-` | 德哈卡 | 1 | - |
| `DehakaLevel02Tooltips` | `-` | - | 4 | - |
| `DehakaLevel06Tooltips` | `-` | - | 2 | - |
| `DehakaLevel08Tooltips` | `-` | - | 2 | - |
| `DehakaLevel11Tooltips` | `-` | - | 2 | - |
| `DehakaPrimalBossUpgrades` | `-` | DehakaPrimalBossUpgrades | 2 | - |
| `MasteryDehakaAttackSpeed` | `-` | 德哈卡攻击速度 | 2 | 提高德哈卡的攻击速度。 |
| `MasteryDehakaBossTimedLife` | `-` | 虫群首领激活持续时间 | 2 | 延长召唤的虫群首领的持续时间。 |
| `MasteryDehakaConsumeDuration` | `-` | 吞食增益持续时间 | 11 | 延长从吞食获得的被动技能的持续时间。 |
| `MasteryDehakaConsumeHealing` | `-` | 吞食治疗提升 | 3 | 提高吞食敌人获得的生命值(乘法)。 |
| `MasteryDehakaGeneMutation` | `-` | 基因突变几率 | 7 | 提高单位在原始战斗中获得基因突变的几率(累加)。 |
| `MasteryDehakaPrimalWurmCDR` | `-` | 大型原始蠕虫冷却时间 | 3 | 缩短召唤大型原始蠕虫技能的冷却时间。 |
| `SwarmHostFakeWeapon` | `-` | - | 2 | - |

### 研究/升级按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 德哈卡 | `DehakaArmorUpgrade` | 骨板 | `DehakaArmorUpgrade,Off` | - | 护甲提高{Behavior,DehakaArmorUpgrade1,Modification.LifeArmorBonus}点。 |
| 德哈卡 | `DehakaAirAttack` | 致命触击 | `DehakaAirAttackUpgrade,Off` | - | 允许德哈卡攻击空中单位。 |
| 原始工蜂 | `DehakaHatchery` | 召唤原始主巢 | `DehakaDroneMorph,Build1` | - | 基础建筑。用于孵化原始工蜂和接收采集到的资源。为原始异虫提供升级方案。 / 开启： / - 原始工蜂 |
| 原始工蜂 | `DehakaGlevigStructure` | 召唤格里维格的巢穴 | `DehakaDroneMorph,Build3` | - | 为原始蟑螂、原始刺蛇、穿刺者和掠食龙提供升级方案。 / 开启： / - 使原始战争之巢可以孵化原始蟑螂 / - 使原始战争之巢可以孵化原始刺蛇 / - 使... |
| 原始工蜂 | `DehakaMurvarStructure` | 召唤穆尔瓦的巢穴 | `DehakaDroneMorph,Build4` | - | 为原始异龙、原始守护者和掘地虫宿主提供升级方案。 / 开启： / - 可以在原始战争之巢中孵化原始宿主。 |
| 原始工蜂 | `DehakaDakrunStructure` | 召唤达克伦的巢穴 | `DehakaDroneMorph,Build5` | - | 为原始雷兽和暴龙兽提供升级方案。 / 开启： / - 使原始战争之巢可以孵化原始雷兽。 |
| 原始主巢 | `DehakaLearnPrimalWeaponsLevel3` | 进化原始攻击等级3 | `DehakaHatcheryResearch,Research3` | - | 使所有原始异虫的攻击力最大化。 |
| 原始主巢 | `DehakaLearnPrimalArmorLevel3` | 进化原始甲壳等级3 | `DehakaHatcheryResearch,Research6` | - | 使所有原始异虫的护甲最大化。 |
| 格里维格的巢穴 | `EvolveDissolvingAcidLocked` | 进化溶解强酸 | `-` | DehakaLevel03 | 该科技将在指挥官等级3时解锁。 |
| 格里维格的巢穴 | `EvolveEnlargedParotidGlandsLocked` | 进化膨胀腮腺 | `-` | DehakaLevel03 | 该科技将在指挥官等级3时解锁。 |
| 格里维格的巢穴 | `DehakaRoachMoveSpeed` | 进化神经胶原重组 | `DehakaGlevigResearch,Research7` | - | 使原始蟑螂和原始点火虫的移动速度提高。 |
| 格里维格的巢穴 | `EvolveConcentratedFireLocked` | 进化汇聚烈焰 | `-` | DehakaLevel09 | 该科技将在指挥官等级9时解锁。 |
| 格里维格的巢穴 | `ResearchDehakaHydraliskSpeed` | 进化肌腱扩增 | `DehakaGlevigResearch,Research8` | - | 提高原始刺蛇的移动速度和攻击射程。 |
| 格里维格的巢穴 | `EvolveTenderizeLocked` | 进化暴捶 | `-` | DehakaLevel09 | 该科技将在指挥官等级9时解锁。 |
| 穆尔瓦的巢穴 | `EvolveSlicingGlaveLocked` | 切割之爪 | `-` | DehakaLevel06 | 该科技将在指挥官等级6时解锁。 |
| 穆尔瓦的巢穴 | `EvolveShiftingCarapaceLocked` | 进化变换甲壳 | `-` | DehakaLevel06 | 该科技将在指挥官等级6时解锁。 |
| 穆尔瓦的巢穴 | `EvolvePrimalReconstitutionLocked` | 进化原始重组 | `-` | DehakaLevel07 | 该科技将在指挥官等级7时解锁。 |
| 穆尔瓦的巢穴 | `EvolveExplosiveSporesLocked` | 进化爆裂孢子 | `-` | DehakaLevel07 | 该科技将在指挥官等级7时解锁。 |
| 穆尔瓦的巢穴 | `EvolvePrimordialFuryLocked` | 进化原始狂怒 | `-` | DehakaLevel06 | 该科技将在指挥官等级6时解锁。 |
| 穆尔瓦的巢穴 | `EvolveAerialBurstSacsLocked` | 进化空中爆囊 | `-` | DehakaLevel13 | 该科技将在指挥官等级13时解锁。 |
| 达克伦的巢穴 | `ResearchDehakaUltraliskCrashingCharge` | 进化野蛮冲锋 | `DehakaDakrunResearch,Research1` | - | 原始雷兽可以向目标位置冲锋，击退范围内的单位并造成{Effect,DehakaUltraliskCrashingChargeDamage,Amount}点伤害。 |
| 达克伦的巢穴 | `ResearchDehakaUltraliskRegen` | 进化治疗适性 | `DehakaDakrunResearch,Research2` | - | 原始雷兽和暴龙兽在脱离战斗后可快速恢复生命值。 |
| 达克伦的巢穴 | `EvolveImpalingStrikeLocked` | 进化穿刺打击 | `-` | DehakaLevel13 | 该科技将在指挥官等级13时解锁。 |
| 达克伦的巢穴 | `EvolveBarrageofSpikesLocked` | 进化尖刺弹幕 | `-` | DehakaLevel11 | 该科技将在指挥官等级11时解锁。 |
| 达克伦的巢穴 | `EvolveTyrantsProtectionLocked` | 进化暴龙的保护 | `-` | DehakaLevel13 | 该科技将在指挥官等级13时解锁。 |
| 掠食龙 | `DehakaRavasaurVSArmor` | 溶解强酸 | `-` | HaveDehakaRavasaurVSArmor | 对重甲目标造成+{$UpgradeEffectArrayValue:DehakaRavasaurVSArmor:Effect,DehakaRavasaur... |

实现备注：科技建筑只负责展示/触发研究；每个单位升级效果由对应 `CommanderUnitTechProfile` 或 `CommanderUpgradeEffectProfile` 声明。

## 09. 特定地图运输机空投单位

Owner：`CommanderCargoLoadoutProfile`、`CommanderMapDropProfile`、`CommanderScenarioFallbackProfile`。

### 运输/空投能力候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| - | - | - | - | - | 未自动命中运输/空投命令；地图运输机清单需使用 power_fusion roster 生成。 |

### 可投放单位候选

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 原始工蜂 | `DehakaDrone` | `DehakaDrone` | Ground; Biological/Light | 矿:50 气:- 人口字段:-1 生命:40 | 基础工作单位。用于采集晶体矿和高能瓦斯。可以召唤建筑。 / 可以对地。 |
| 掘地虫 | `DehakaCreeper` | `DehakaCreeper` | Ground; Biological/Light | 矿:- 气:- 人口字段:- 生命:130 | - |
| 爆裂掘地虫 | `DehakaCreeperFlying` | `DehakaCreeperFlying` | Air; Biological/Light | 矿:- 气:- 人口字段:- 生命:130 | 孵化自掘地虫宿主。爆裂掘地虫持续{Behavior,DehakaCreeperTimedLife,Duration}秒。 / 可以对地。 |
| 原始刺蛇 | `DehakaHydraliskLevel2` | `DehakaHydraliskLevel2` | Ground; Biological/Light | 矿:100 气:50 人口字段:-2 生命:100 | - |
| 原始异龙 | `DehakaMutaliskLevel3` | `DehakaMutaliskLevel3` | Air; Biological/Light | 矿:100 气:100 人口字段:-3 生命:200 | - |
| 掘地虫宿主 | `DehakaPrimalSwarmHost` | `DehakaPrimalSwarmHost` | Ground; Armored/Biological | 矿:100 气:75 人口字段:-5 生命:160 | 通过孵化掘地虫进行攻击的攻城单位。 / 掘地虫可以对地。 |
| 掠食龙 | `DehakaRavasaur` | `DehakaRavasaur` | Ground; Armored/Biological | 矿:150 气:50 人口字段:-2 生命:90 | 远程单位。可以远距离发射大量酸性液体。 / 可以对地。 |
| 原始蟑螂 | `DehakaRoachLevel2` | `DehakaRoachLevel2` | Ground; Armored/Biological | 矿:75 气:25 人口字段:-2 生命:175 | - |
| 原始点火虫 | `DehakaRoachLevel3` | `DehakaRoachLevel3` | Ground; Armored/Biological | 矿:75 气:25 人口字段:-3 生命:350 | 突击单位。可造成范围伤害。潜地时能快速恢复生命值。 / 可以对地。 |
| 原始宿主 | `DehakaSwarmHost` | `DehakaSwarmHost` | Ground; Armored/Biological | 矿:100 气:75 人口字段:-3 生命:160 | 通过孵化蝗虫进行攻击的攻城单位。 / 蝗虫可以对地。 |
| 原始雷兽 | `DehakaUltraliskLevel2` | `DehakaUltraliskLevel2` | Ground; Armored/Biological/Massive | 矿:300 气:200 人口字段:-6 生命:625 | - |
| 暴龙兽 | `DehakaUltraliskLevel3` | `DehakaUltraliskLevel3` | Ground; Armored/Biological/Massive | 矿:450 气:300 人口字段:-9 生命:1000 | 重型攻击猛兽。可造成地面范围伤害。 / 可以对地和对空。 |
| 原始跳虫 | `DehakaZerglingLevel2` | `DehakaZerglingLevel2` | Ground; Biological/Light | 矿:50 气:- 人口字段:-1 生命:90 | - |
| 穿刺者 | `ImpalerDehaka` | `ImpalerDehaka` | Ground; Armored/Biological | 矿:200 气:100 人口字段:-3 生命:200 | 远程反重甲伏击单位。必须潜地后才能发动攻击。 / 可以对地。 |

实现备注：运输机空投不要读取地图硬编码单位组，应从 `CommanderCargoLoadoutProfile` 读取当前 commander 的 `power_fusion` 单位清单和场景过滤规则。

## 10. 指挥官特殊机制

Owner：`CommanderSpecialMechanicProfile`、`CommanderSpecialResourceProfile`、`CommanderSpecialMechanicHookProfile`、`CommanderSpecialMechanicUnitProfile`。

本指挥官重点：精华、德哈卡等级成长、原始首领召唤是主特殊机制。

### 特殊机制命中项

- 精华收集者 (`DehakaPHLevel01`)
- 新单位：原始异龙和原始守护者 (`DehakaPHLevel06`)
- 原始异龙和原始守护者升级包 (`DehakaPHLevel07`)

### 特殊机制 Upgrade 候选

- 原始竞争者 (`CommanderPrestigeDehakaPackLeaders`)

### 特殊机制按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 德哈卡 | `MoveChampions` | MoveChampions | `move,Move` | - | - |
| 德哈卡 | `AttackChampions` | AttackChampions | `attack,Execute` | - | - |
| 原始主巢 | `DehakaGuardian` | DehakaGuardian | `DehakaTownHallTrain,Train8` | - | 远程对地飞行单位。 / 可以对地。 |
| 穆尔瓦 | `CoopMurvarSpawnCreepers` | 孵化虫群 | `CoopMurvarSpawnCreepers,Execute` | - | 孵化6只原始蝗虫进行战斗，持续{Behavior,DehakaLocustTimedLife,Duration}秒。 |
| 穆尔瓦的巢穴 | `CreeperHostPassive` | 掘地虫宿主 | `-` | CreeperHostPassive | 穆尔瓦的巢穴使你可以进化掘地虫宿主。 |
| 穆尔瓦的巢穴 | `PrimalGuardianPassive` | 原始守护者 | `-` | PrimalGuardianPassive | 穆尔瓦的巢穴使你可以进化原始守护者。 |
| 掘地虫宿主 | `DehakaGeneCreepersPassive` | 进化孵化囊 | `-` | HaveDehakaGeneCreepers | 该掘地虫宿主孵化的掘地虫数量翻倍。 |
| 掘地虫宿主 | `DehakaSpawnLocustsBomb` | 孵化爆裂掘地虫 | `DehakaSpawnCreeperTargeted,Execute` | - | 通过孵化爆裂掘地虫进行攻击的攻城单位。掘地虫持续{Behavior,DehakaLocustTimedLife,Duration}秒。 / 掘地虫可以对地。 |
| 掘地虫宿主 | `DehakaFlyingCreeperLocusts` | 飞行爆裂掘地虫 | `-` | - | 掘地虫宿主孵化的掘地虫可以飞行。掘地虫可以俯冲轰炸地面目标。 |
| 掘地虫宿主 | `DehakaCreeperAirSuicide` | 空中爆囊 | `-` | HaveDehakaSwarmHostCreepers | 掘地虫可以对空，并提高他们的移动速度。 |
| 原始蟑螂 | `PrimalCombatPrimalGuardianLocked` | 原始战斗 | `-` | DehakaLevel06 | 该单位将在指挥官等级6时解锁。 |
| 原始宿主 | `PrimalCombatPrimalCreeperHostLocked` | 原始战斗 | `-` | DehakaLevel08 | 该单位将在指挥官等级8时解锁。 |

实现备注：凡是涉及局内状态、资源、堆叠、全局计时器、隐藏 caster 的机制，都必须有 runtime hook 和 `[XM_DBG]` 日志。

## 11. 指挥官个性化机制

Owner：`CommanderPersonalMechanicProfile`、`CommanderPersonalMechanicEffectProfile`、`CommanderPersonalMechanicHookProfile`、`CommanderPersonalMechanicRequirementProfile`。

本指挥官重点：德哈卡吞噬/精华/突变成长需要 runtime hook 记录资源、等级和技能解锁。

### 威望正向融合输入

| 威望 ID | Primary Upgrade | 禁用单位 | 启用单位 | 禁用 Ability | 补充 Upgrade |
|---|---|---|---|---|---|
| `CommanderPrestigeDehakaDevour` | `CommanderPrestigeDehakaDevour` | `-` | `-` | `DehakaLearn:3, MammothBreath:` | `-` |
| `CommanderPrestigeDehakaPackLeaders` | `CommanderPrestigeDehakaPackLeaders` | `-` | `-` | `-` | `-` |
| `CommanderPrestigeDehakaClone` | `CommanderPrestigeDehakaClone` | `-` | `-` | `-` | `-` |

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
[XM_DBG][INFO][COMMANDER_PROFILE_LOAD] commander=Dehaka levelMode=FullLevel15 masteryMode=AllSixMax rosterStage=power_fusion result=ok
[XM_DBG][INFO][POWER_FUSION_APPLY] commander=Dehaka levelMode=FullLevel15 masteryMode=AllSixMax prestigeMode=SelectedPositive result=ok
[XM_DBG][INFO][ROSTER_LOAD] commander=Dehaka stage=power_fusion units=14 buildings=7 result=ok
[XM_DBG][INFO][MODULE_VERIFY] commander=Dehaka module=<01-11> profile=<profile> result=ok
[XM_DBG][WARN][CASC_AUDIT_REQUIRED] commander=Dehaka module=<module> object=<object> result=needs-casc-audit
```

## 第一轮待审计项

- 顶部技能的 caster、按钮、冷却、充能、目标转发闭包。
- 英雄或特殊英雄的 Unit、Ability、Behavior、Weapon、Actor、Sound 闭包。
- `power_fusion` 最终 roster 与 `level15` roster 的新增、替换、变体关系。
- 6 项精通的真实作用对象和最终数值。
- 3 个威望的正面收益、负面代价、disable/suppress、费用/冷却/上限变化。
- 科技建筑研究按钮、Requirement、Upgrade effect 是否完整。
- 特殊机制和个性化机制是否需要 runtime hook。
