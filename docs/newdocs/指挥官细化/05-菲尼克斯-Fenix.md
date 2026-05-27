# 菲尼克斯（Fenix）指挥官细化

日期：2026-05-27

## 当前口径

当前指挥官默认 15 级，不从 1 级开始；精通默认 6 项全部 30 点；威望默认只取正面收益，不直接启用官方 `PlayerPrestige`。`initial` 只作为官方基础状态审计和差异对照，默认测试和玩法应看 `power_fusion` 最终状态。

本文件按 `docs/newdocs/模块拆分` 的 11 个模块整理 菲尼克斯。依据 `游戏数据/官方合作指挥官/commanders/Fenix/` 的当前 JSON 生成；具体 Ability、Behavior、Weapon、Actor、Effect、Requirement 闭包仍需继续追 `references/sc2-build-96883-casc-export/` 或实机 `[XM_DBG]` 日志。

## 官方数据摘要

| 项 | 值 |
|---|---|
| CommanderId | `ProtossFenix` |
| 中文名 | 菲尼克斯 |
| 默认升级 | `FenixCommander`, `FenixResearchCostReduction` |
| 默认能力命令 | `CyberneticsCoreResearch:14`, `TwilightCouncilResearch:29`, `FleetBeaconResearch:`, `CyberneticsCoreResearch:6` |
| 威望 ID | `CommanderPrestigeFenixSuitSwap`, `CommanderPrestigeFenixDataWeb`, `CommanderPrestigeFenixAvenger` |
| heroes.json 数量 | 0 |
| roster.json 数量 | 12 |
| units.json 数量 | 8 |
| buildings.json 数量 | 4 |
| command_cards.json 对象数 | 12 |
| upgrades.json 数量 | 19 |
| other-tech-entries.json 数量 | 0 |
| source | `mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/userdata.xml` |

roster 样例：

```text
Adept, ColossusPurifier, Gateway, Observer, PhotonCannon, RoboticsBay, Scout, SentryFenix, TwilightCouncil, ZealotPurifier, Immortal, Carrier
```

## 15 级解锁摘要

- 1: 可变部署
- 2: 解锁：净化者议会
- 3: 解锁：塞布罗斯仲裁者战甲
- 4: 突击勇士研究包
- 5: 英雄智能：塔尔达林与摩约
- 6: 菲尼克斯升级包
- 7: 新单位：干扰者
- 8: 英雄智能：战争使者与科罗拉里昂
- 9: 特种单位升级包
- 10: 作战效能
- 11: 复仇协议
- 12: 强攻勇士升级包
- 13: 快速充能
- 14: 攻城勇士升级包
- 15: 战术数据网

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
| 默认能力 | - | CyberneticsCoreResearch:14 | - | 来自 commander.json |
| 默认能力 | - | TwilightCouncilResearch:29 | - | 来自 commander.json |
| 默认能力 | - | FleetBeaconResearch: | - | 来自 commander.json |
| 默认能力 | - | CyberneticsCoreResearch:6 | - | 来自 commander.json |
| Lv3 解锁：塞布罗斯仲裁者战甲 | 3 | SOASummonFenixArbiter: | - | 解锁菲尼克斯的塞布罗斯仲裁者战甲。塞布罗斯号仲裁者战甲可以使其自身以及附近的盟友隐身，将友方单位召回其所在位置，和使用静滞技能禁锢敌方单位。 |
| Lv4 突击勇士研究包 | 4 | TwilightCouncilResearch:25 | - | 在光影议会中解锁下列升级： / 卡尔达利斯的攻击造成范围性伤害塔里斯的回旋刃额外弹跳5次，并使受影响的单位承受额外的伤害 |
| Lv4 突击勇士研究包 | 4 | FenixTalisAdeptBounceShot: | - | 在光影议会中解锁下列升级： / 卡尔达利斯的攻击造成范围性伤害塔里斯的回旋刃额外弹跳5次，并使受影响的单位承受额外的伤害 |
| Lv4 突击勇士研究包 | 4 | TwilightCouncilResearch:29 | - | 在光影议会中解锁下列升级： / 卡尔达利斯的攻击造成范围性伤害塔里斯的回旋刃额外弹跳5次，并使受影响的单位承受额外的伤害 |
| Lv5 英雄智能：塔尔达林与摩约 | 5 | FenixAltarOfPsiStormsResearch:3 | - | 在净化者议会中解锁额外的智能人格： / 塔尔达林 - 不朽者摩约 - 侦察机 |
| Lv5 英雄智能：塔尔达林与摩约 | 5 | FenixAltarOfPsiStormsResearch:2 | - | 在净化者议会中解锁额外的智能人格： / 塔尔达林 - 不朽者摩约 - 侦察机 |
| Lv5 英雄智能：塔尔达林与摩约 | 5 | FenixMojoMissiles: | - | 在净化者议会中解锁额外的智能人格： / 塔尔达林 - 不朽者摩约 - 侦察机 |
| Lv6 菲尼克斯升级包 | 6 | ForgeResearch:15 | - | 在锻炉中解锁下列升级： / 所有菲尼克斯战甲获得+15攻击伤害菲尼克斯的塞布罗斯仲裁者战甲获得侦测能力 |
| Lv6 菲尼克斯升级包 | 6 | ForgeResearch:14 | - | 在锻炉中解锁下列升级： / 所有菲尼克斯战甲获得+15攻击伤害菲尼克斯的塞布罗斯仲裁者战甲获得侦测能力 |
| Lv8 英雄智能：战争使者与科罗拉里昂 | 8 | FenixAltarOfPsiStormsResearch:4 | `FenixWarbringerColossusIceBeam` | 在净化者议会中解锁额外的智能人格： / 战争使者 - 巨像科罗拉里昂 - 航母 |
| Lv8 英雄智能：战争使者与科罗拉里昂 | 8 | FenixAltarOfPsiStormsResearch:5 | `FenixWarbringerColossusIceBeam` | 在净化者议会中解锁额外的智能人格： / 战争使者 - 巨像科罗拉里昂 - 航母 |
| Lv9 特种单位升级包 | 9 | RoboticsBayResearch:18 | - | 解锁下列升级： / 干扰者成为永久隐形状态 (在机械研究所中研究)干扰者净化新星爆炸两次 (在机械研究所中研究)保护者的防护场持续时间延长100% (在控制芯核中研究) |
| Lv9 特种单位升级包 | 9 | RoboticsBayResearch:19 | - | 解锁下列升级： / 干扰者成为永久隐形状态 (在机械研究所中研究)干扰者净化新星爆炸两次 (在机械研究所中研究)保护者的防护场持续时间延长100% (在控制芯核中研究) |
| Lv9 特种单位升级包 | 9 | CyberneticsCoreResearch:14 | - | 解锁下列升级： / 干扰者成为永久隐形状态 (在机械研究所中研究)干扰者净化新星爆炸两次 (在机械研究所中研究)保护者的防护场持续时间延长100% (在控制芯核中研究) |
| Lv12 强攻勇士升级包 | 12 | RoboticsBayResearch:20 | - | 解锁下列升级： / 塔尔达林的攻击可储存对敌人造成的伤害，并在敌人被击杀后释放所有储存的伤害，造成范围性伤害 (在机械研究所中研究)允许摩约发射一轮反物质飞弹弹幕 (在舰队航标中研究) |
| Lv12 强攻勇士升级包 | 12 | FleetBeaconResearch:19 | - | 解锁下列升级： / 塔尔达林的攻击可储存对敌人造成的伤害，并在敌人被击杀后释放所有储存的伤害，造成范围性伤害 (在机械研究所中研究)允许摩约发射一轮反物质飞弹弹幕 (在舰队航标中研究) |
| Lv14 攻城勇士升级包 | 14 | RoboticsBayResearch:21 | - | 解锁下列升级： / 战争使者获得一项技能，可对敌方单位发射一次毁灭性轰击 (在机械研究所中研究)科罗拉里昂可以建造强击机轰炸敌方单位 (在舰队航标中研究) |
| Lv14 攻城勇士升级包 | 14 | FleetBeaconResearch:20 | - | 解锁下列升级： / 战争使者获得一项技能，可对敌方单位发射一次毁灭性轰击 (在机械研究所中研究)科罗拉里昂可以建造强击机轰炸敌方单位 (在舰队航标中研究) |
| Lv14 攻城勇士升级包 | 14 | FenixClolarionCarrierBomberHangar: | - | 解锁下列升级： / 战争使者获得一项技能，可对敌方单位发射一次毁灭性轰击 (在机械研究所中研究)科罗拉里昂可以建造强击机轰炸敌方单位 (在舰队航标中研究) |
| Lv14 攻城勇士升级包 | 14 | RoboticsBayResearch:22 | - | 解锁下列升级： / 战争使者获得一项技能，可对敌方单位发射一次毁灭性轰击 (在机械研究所中研究)科罗拉里昂可以建造强击机轰炸敌方单位 (在舰队航标中研究) |
| Lv14 攻城勇士升级包 | 14 | FenixWarbringerColossusPowerShot: | - | 解锁下列升级： / 战争使者获得一项技能，可对敌方单位发射一次毁灭性轰击 (在机械研究所中研究)科罗拉里昂可以建造强击机轰炸敌方单位 (在舰队航标中研究) |

### command card 命中

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 巨像 | `-` | - | - | `HaveFireBeam` | - |
| 保护者 | `FenixSentryGuardianZone` | 防护场 | `FenixSentryGuardianZone,Execute` | - | 制造一个护盾，使友方单位受到的所有攻击伤害降低{Behavior,FenixSentryGuardianZone,Modification.DamageTakenFraction[Melee]*(-100)}%， 持续{time:[d ref='Effect,FenixSe... |
| 不朽者 | `ImmortalOverload` | 屏障 | `ImmortalOverload,Execute` | - | 吸收最多{Behavior,ImmortalOverload,DamageResponse.ModifyLimit}点伤害，持续{Behavior,TakenDamage,Duration}秒。该效果每{Abil,ImmortalOverload,Cost[0].Coold... |

实现备注：面板只注册 profile 和转发 caster，地图不得按 commander 写 if/else。精通和威望影响面板冷却、充能、费用时，由本模块接收最终 modifier。

## 02. 英雄单位及其技能

Owner：`CommanderHeroProfile`、`CommanderHeroModeProfile`、`CommanderHeroAbilityProfile`、`CommanderHeroSkillTreeProfile`、`CommanderHeroReviveProfile`、`CommanderHeroModifierProfile`。

### 英雄单位清单

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| - | - | - | - | - | 官方 heroes.json 暂无条目；召唤物、形态、特殊英雄需从 progression、command_cards 或 CASC 继续追。 |

### 英雄技能按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| - | - | - | - | - | command_cards.json 未命中 heroes.json 对象按钮；英雄技能需从 CASC 或实机日志补。 |

### 英雄形态/模式候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| - | - | - | - | - | 未自动命中英雄形态或模式按钮。 |

### 英雄相关等级解锁

| 等级 | 名称 | 升级 | AbilityCmd | 说明 |
|---|---|---|---|---|
| Lv1 | 可变部署 | - | - | 菲尼克斯可以在战场上任意位置折跃多种战甲配置。战甲只有在未加入战场的状态下才能恢复生命值和能量值。菲尼克斯的战斗单位费用降低20%。 |
| Lv2 | 解锁：净化者议会 | - | - | 解锁净化者议会建筑，允许你研究星灵英雄的智能人格。研究完成后，这些智能人格会自动下载至任意可用的宿主单位上。智能人格已解锁：卡尔达利斯 - 军团士兵塔里斯 - 使徒 |
| Lv3 | 解锁：塞布罗斯仲裁者战甲 | - | `SOASummonFenixArbiter:` | 解锁菲尼克斯的塞布罗斯仲裁者战甲。塞布罗斯号仲裁者战甲可以使其自身以及附近的盟友隐身，将友方单位召回其所在位置，和使用静滞技能禁锢敌方单位。 |
| Lv4 | 突击勇士研究包 | - | `TwilightCouncilResearch:25`, `FenixTalisAdeptBounceShot:`, `TwilightCouncilResearch:29` | 在光影议会中解锁下列升级： / 卡尔达利斯的攻击造成范围性伤害塔里斯的回旋刃额外弹跳5次，并使受影响的单位承受额外的伤害 |
| Lv5 | 英雄智能：塔尔达林与摩约 | - | `FenixAltarOfPsiStormsResearch:3`, `FenixAltarOfPsiStormsResearch:2`, `FenixMojoMissiles:` | 在净化者议会中解锁额外的智能人格： / 塔尔达林 - 不朽者摩约 - 侦察机 |
| Lv6 | 菲尼克斯升级包 | - | `ForgeResearch:15`, `ForgeResearch:14` | 在锻炉中解锁下列升级： / 所有菲尼克斯战甲获得+15攻击伤害菲尼克斯的塞布罗斯仲裁者战甲获得侦测能力 |
| Lv7 | 新单位：干扰者 | `FenixUnlockDisruptor` | - | 机械干扰型单位。可以使用净化新星造成大量范围性伤害。可在机械台中进行折跃。 / 可以对地。 |
| Lv8 | 英雄智能：战争使者与科罗拉里昂 | `FenixWarbringerColossusIceBeam` | `FenixAltarOfPsiStormsResearch:4`, `FenixAltarOfPsiStormsResearch:5` | 在净化者议会中解锁额外的智能人格： / 战争使者 - 巨像科罗拉里昂 - 航母 |
| Lv9 | 特种单位升级包 | - | `RoboticsBayResearch:18`, `RoboticsBayResearch:19`, `CyberneticsCoreResearch:14` | 解锁下列升级： / 干扰者成为永久隐形状态 (在机械研究所中研究)干扰者净化新星爆炸两次 (在机械研究所中研究)保护者的防护场持续时间延长100% (在控制芯核中研究) |
| Lv10 | 作战效能 | `FenixNoTechNoGas` | - | 建筑不再有科技需求限制，晶体矿费用降低50%，瓦斯费用降低100%。 |
| Lv11 | 复仇协议 | `FenixChampionSwapBoost` | - | 每当智能人格英雄类型的宿主机体被摧毁时，智能人格英雄获得攻击和移动速度加成（每点补给提供10%），或者智能人格英雄转移至新的宿主机体时，获得50%速度加成。速度加成最多可以叠加到100%，在不刷新的情况下可以持续20秒。 |
| Lv12 | 强攻勇士升级包 | - | `RoboticsBayResearch:20`, `FleetBeaconResearch:19` | 解锁下列升级： / 塔尔达林的攻击可储存对敌人造成的伤害，并在敌人被击杀后释放所有储存的伤害，造成范围性伤害 (在机械研究所中研究)允许摩约发射一轮反物质飞弹弹幕 (在舰队航标中研究) |
| Lv13 | 快速充能 | `FenixOfflineSuitRegen` | - | 当前离线的菲尼克斯战甲生命恢复和护盾恢复速度加快20%。 |
| Lv14 | 攻城勇士升级包 | - | `RoboticsBayResearch:21`, `FleetBeaconResearch:20`, `FenixClolarionCarrierBomberHangar:`, `RoboticsBayResearch:22`, `FenixWarbringerColos... | 解锁下列升级： / 战争使者获得一项技能，可对敌方单位发射一次毁灭性轰击 (在机械研究所中研究)科罗拉里昂可以建造强击机轰炸敌方单位 (在舰队航标中研究) |
| Lv15 | 战术数据网 | `FenixNetworkedSuperiority` | - | 每有一个同类型的宿主机体，智能人格英雄的特殊技能便获得加成 (最多获得20个补给的加成)。 |

口径：官方玩法存在菲尼克斯多套战甲/人格载体，但当前 heroes.json 未列出，需要从 CASC/实机补 HeroModeProfile。

待审计：Hero Unit、Ability、Behavior、Weapon、Actor、Sound、复活/重生、能量/资源、形态切换和威望改写闭包。

## 03. 普通单位技能及其进化功能

Owner：`CommanderUnitAbilityProfile`、`CommanderUnitStatProfile`、`CommanderUnitEvolutionProfile`、`CommanderUnitBehaviorProfile`、`CommanderUnitWeaponProfile`。

### 单位技能按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 使徒 | `AdeptFenixShadeSpawn` | 灵能投射 | - | `HaveAdeptFenixShadeSpawn` | 攻击可召唤一个无敌的阴影体，攻击敌人一小段时间。 |
| 使徒 | `AdeptPiercingUpgrade` | 共鸣之刃 | - | `HaveAdeptPiercingAttack` | 使徒的攻击速度提高45%。 |
| 巨像 | `ExtendedThermalLance` | 加长热能射线枪 | - | `HaveKaraxExtendedThermalLance` | 使巨像的射程提高3。 |
| 巨像 | `-` | - | - | `HaveFireBeam` | - |
| 侦测器 | `AcquireMove` | 搜索移动 | `move,AcquireMove` | - | 命令选中的单位移至目标区域或跟随目标单位。进行搜索移动的单位不会与敌人交战。 |
| 侦测器 | `MorphtoObserverSiege` | 监察模式 | `ObserverMorphtoObserverSiege,Execute` | - | 把侦测器变形为监察模式。视野提高{(Unit,ObserverSiegeMode,Sight/Unit,Observer,Sight-1)*100}%，但无法移动且不再隐形。 |
| 侦测器 | `Detector` | 侦测单位 | - | - | 该单位能够侦测到隐形、潜地和幻像单位。 |
| 侦测器 | `HaveGraviticBoosters` | 重力加速器 | - | `HaveGraviticBoosters` | 提高侦测器的移动速度50%。 |
| 侦测器 | `-` | - | - | - | - |
| 机械研究所 | `ResearchVanguardArmoredDamage` | 研究聚变迫击炮 | `RoboticsBayResearch,Research16` | - | 提高先锋对重甲单位的伤害。 |
| 机械研究所 | `ResearchAlarakVanguardIncreaseSplashAreaLocked` | 研究物质散化 | - | `AlarakLevel06` | 该科技将在指挥官等级6时解锁。 |
| 机械研究所 | `FenixResearchDisruptorCloakLocked` | 研究隐形模块 | - | `FenixLevel09` | 该科技将在指挥官等级9时解锁。 |
| 机械研究所 | `FenixResearchDisruptorSecondExplosionLocked` | 研究净化回荡 | - | `FenixLevel09` | 该科技将在指挥官等级9时解锁。 |
| 机械研究所 | `ResearchZeratulImmortalRange` | 神器强化：原力炮 | - | `HaveZeratulArtifactTier2AndRoboticsBay` | 萨尔纳加执行者的歼灭炮可以击退敌方空中单位，并且对轰击路线沿途的单位造成{Effect,ZeratulPhaseDisruptorsAir,AreaArray[0].Fraction*100}%伤害。 |
| 机械研究所 | `ColossusPassive` | ColossusPassive | - | `HaveColossus` | - |
| 机械研究所 | `ZeratulResearchImprovedBarrier` | 神器强化：永恒屏障 | - | `HaveZeratulArtifactTier3AndRoboticsBay` | 萨尔纳加执行者屏障吸收的伤害量提高{$UpgradeEffectArrayValue:ZeratulArtifactTier3_RoboticsBay:Behavior,ImmortalBarrierBase,DamageResponse.ModifyLimit$/Beha... |
| 机械研究所 | `ResearchFenixWarbringerColossusPowerShotLocked` | 研究净化轰击 | - | `FenixLevel14` | 该科技将在指挥官等级14时解锁。 |
| 机械研究所 | `FenixImmortalResearchDetonationShotLocked` | 研究重力过载 | - | `FenixLevel12` | 该科技将在指挥官等级12时解锁。 |
| 机械研究所 | `ReaverPassive` | ReaverPassive | - | `HaveVoidReaver` | - |
| 折跃侦察机 | `HaveFenixScoutWeaponRange` | 战斗感应器阵列 | - | `HaveFenixScoutWeaponRange` | 侦察机获得+3对空攻击射程和+1对地攻击射程。 |
| 保护者 | `FenixSentryGuardianZone` | 防护场 | `FenixSentryGuardianZone,Execute` | - | 制造一个护盾，使友方单位受到的所有攻击伤害降低{Behavior,FenixSentryGuardianZone,Modification.DamageTakenFraction[Melee]*(-100)}%， 持续{time:[d ref='Effect,FenixSe... |
| 保护者 | `FenixSentryPhasingMode` | 相位模式 | `SentryFenixPhasingMode,Execute` | - | 保护者变形为相位模式。使保护者可以提供一个能量场，效果与水晶塔相同，但该模式下保护者无法移动。 |
| 哨兵 | `ReconstructionLocked` | 重构 | - | `KaraxLevel04` | 该技能将在指挥官等级4时解锁。 |
| 哨兵 | `-` | - | - | `ZealotPurifierReviveKaraxHide` | - |
| 不朽者 | `HardenedShield` | 刚毅护盾 | - | - | 不朽者的护盾尚未消失前，能够将受到的伤害降低至最多10点。 |
| 不朽者 | `ImmortalOverload` | 屏障 | `ImmortalOverload,Execute` | - | 吸收最多{Behavior,ImmortalOverload,DamageResponse.ModifyLimit}点伤害，持续{Behavior,TakenDamage,Duration}秒。该效果每{Abil,ImmortalOverload,Cost[0].Coold... |
| 航母 | `Interceptor` | 制造拦截机 | `CarrierHangar,Ammo1` | - | 制造拦截机。拦截机能够自动攻击航母的目标，是航母唯一的武器。 / 可以对地和对空。 |
| 航母 | `GravitonCatapult` | 引力弹射 | - | `UseGravitonCatapult` | 使航母发射拦截机的速度更快。 |
| 航母 | `-` | - | - | - | - |

### 进化/形态/切换候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 侦测器 | `MorphtoObserverSiege` | 监察模式 | `ObserverMorphtoObserverSiege,Execute` | - | 把侦测器变形为监察模式。视野提高{(Unit,ObserverSiegeMode,Sight/Unit,Observer,Sight-1)*100}%，但无法移动且不再隐形。 |
| 保护者 | `FenixSentryPhasingMode` | 相位模式 | `SentryFenixPhasingMode,Execute` | - | 保护者变形为相位模式。使保护者可以提供一个能量场，效果与水晶塔相同，但该模式下保护者无法移动。 |

实现备注：单位自身声明技能、被动、武器、Behavior 和升级后替换关系；科技建筑只触发研究，不在科技建筑内部判断所有兵种 if/else。

## 04. 初始化基地与特殊建筑

Owner：`CommanderBaseInitProfile`、`CommanderOpeningLoadoutProfile`、`CommanderSpecialStructureProfile`、`CommanderInitHookProfile`。

### 初始化建筑候选

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 传送门 | `Gateway` | `Gateway` | Ground; Mechanical; Structure; Melee | 矿:150 气:- 人口:- 生命:500 护盾:500 能量:- | 使星灵可以利用折跃技术召集地面单位。 / 开启： / - 狂热者 |
| 光子炮台 | `PhotonCannon` | `PhotonCannon, Zealot` | Ground; Mechanical; Structure; Melee | 矿:150 气:- 人口:- 生命:150 护盾:150 能量:- | 主力防御建筑。 / 可以对地和对空。 / 侦测单位 |
| 机械研究所 | `RoboticsBay` | `RoboticsBay` | Ground; Mechanical; Structure; Melee | 矿:150 气:150 人口:- 生命:500 护盾:500 能量:- | 为侦测器、折跃棱镜和巨像提供升级方案。 / 开启： / - 可以在机械台中折跃巨像 / - 可以在机械台中折跃干扰者 |
| 光影议会 | `TwilightCouncil` | `TwilightCouncil` | Ground; Mechanical; Structure; Melee | 矿:150 气:100 人口:- 生命:500 护盾:500 能量:- | 为狂热者、追猎者以及使徒提供升级方案。 |

### 初始化/建造按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 传送门 | `WarpInSupplicant` | 折跃死徒 | `GatewayTrain,Train11` | - | 近战战士。在阿拉纳克濒临死亡时牺牲自己来为他治疗。死徒可以同时折跃两个。 / 可以对地。 |
| 传送门 | `SentryFenix` | 折跃保护者 | `GatewayTrain,Train15` | - | 净化者阵营 / 机械支援单位。可以使用防护场和相位模式。 / 可以对地和对空。 |
| 传送门 | `Stalker` | 折跃追猎者 | `GatewayTrain,Train2` | - | 远程支援型步战机甲。 / 可以对地和对空。 |
| 传送门 | `WarpInAdept` | 折跃使徒 | `GatewayTrain,Train7` | - | 远程特种单位。可以使用灵能传送。 / 可以对地。 |
| 传送门 | `DarkTemplar` | 折跃黑暗圣堂武士 | `GatewayTrain,Train5` | - | 致命的近战杀手，该单位永远处于隐形状态，敌人在不借助侦测单位帮助的情况下无法发现他。可以融合为执政官。 / 可以对地。 |
| 传送门 | `UpgradeToWarpGate` | 变形为折跃门 | `UpgradeToWarpGate,Execute` | - | 将传送门升级为折跃门，使星灵可以利用折跃技术将地面单位召集到任何有水晶塔或折跃棱镜能量覆盖的区域。 |
| 机械研究所 | `ZeratulResearchImprovedBarrier` | 神器强化：永恒屏障 | - | `HaveZeratulArtifactTier3AndRoboticsBay` | 萨尔纳加执行者屏障吸收的伤害量提高{$UpgradeEffectArrayValue:ZeratulArtifactTier3_RoboticsBay:Behavior,ImmortalBarrierBase,DamageResponse.ModifyLimit$/Beha... |
| 光影议会 | `FenixTalisAdeptLearnBounceShotUpgradeLocked` | 研究衰弱系统 | - | `FenixLevel04` | 该科技将在指挥官等级4时解锁。 |
| 光影议会 | `AdeptResearchPiercingUpgrade` | 研究共鸣之刃 | - | - | 使徒的攻击速度提高45%。 |

实现备注：地图初始化只传 commander、出生点和场景语义；基地、工人、特殊建筑、初始科技和补给由本指挥官 initializer 自己组装。

## 05. 指挥官兵种

Owner：`CommanderRosterProfile`、`CommanderUnitFactoryProfile`、`CommanderUnitReplacementProfile`、`CommanderLevelStageRosterProfile`。

### 当前 units.json 兵种清单

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 使徒 | `Adept` | `Adept` | Ground; Biological/Light; Unit; Melee | 矿:125 气:25 人口:-2 生命:70 护盾:70 能量:- | - |
| 巨像 | `ColossusPurifier` | `ColossusPurifier, Colossus, RoboticsBay, RoboticsFacility` | Unit; FactionPurifier | 矿:- 气:- 人口:- 生命:- 护盾:- 能量:- | 步战机器人，装备强大的范围攻击武器。能够攀越悬崖。可升级武器使其攻击能在地面上留下火焰，对敌人造成持续性伤害。 / 可以对地。 |
| 侦测器 | `Observer` | `Observer` | Air; Light/Mechanical; Unit; Melee | 矿:25 气:75 人口:-1 生命:40 护盾:30 能量:- | 间谍型空中单位。拥有永久隐形的能力。 / 侦测单位 |
| 折跃侦察机 | `Scout` | `Scout, Stargate` | Unit; FactionPurifier | 矿:250 气:75 人口:- 生命:150 护盾:100 能量:- | 多功能高速战机。 / 可以对地和对空。 |
| 保护者 | `SentryFenix` | `SentryFenix` | Ground; Light/Mechanical/Psionic; Unit; FactionPurifier | 矿:50 气:100 人口:-2 生命:40 护盾:40 能量:- | 净化者阵营 / 机械支援单位。可以使用防护场和相位模式。 / 可以对地和对空。 |
| 哨兵 | `ZealotPurifier` | `ZealotPurifier, Zealot` | Unit; FactionPurifier | 矿:- 气:- 人口:- 生命:- 护盾:- 能量:- | 强大的近战战士。升级后可使用冲锋和重构技能。 / 可以对地。 |
| 不朽者 | `Immortal` | `Immortal, RoboticsBay, RoboticsFacility` | Ground; Armored/Mechanical; Unit; Melee | 矿:250 气:100 人口:-4 生命:200 护盾:100 能量:- | 攻击型步战机甲。可以使用屏障吸收伤害。 / 可以对地。 |
| 航母 | `Carrier` | `Carrier, FleetBeacon, Stargate` | Air; Armored/Massive/Mechanical; Unit; Melee | 矿:350 气:250 人口:-6 生命:300 护盾:150 能量:- | 星灵的主力战舰。能够制造并发射拦截机攻击敌人。 / 可以对地和对空。 |

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
| 1 | 菲尼克斯战甲武器攻击速度 | `MasteryFenixSuitAttackSpeed` | `2` | +60% | - |
| 1 | 菲尼克斯战甲离线能量恢复 | `MasteryFenixSuitEnergyRegen` | `0.75` | +22.5% | - |
| 2 | 智能人格英雄的攻击速度 | `MasteryFenixChampionAttackSpeed` | `1` | +30% | - |
| 2 | 智能人格英雄的生命值和护盾加成 | `MasteryFenixChampionLifeShieldBuff` | `2` | +60% | - |
| 3 | 时空提速速度 | `MasteryFenixChronoBoostExtra` | `1` | +30% | - |
| 3 | 额外起始补给 | `MasteryFenixExtraStartingSupply` | `2` | +60 | - |

实现备注：当前默认六项精通全 30 点，不再做官方互斥取舍；若同一字段被多个精通/威望改写，必须进入 `CommanderModifierStackProfile` 明确叠加顺序。

## 07. 指挥官建筑

Owner：`CommanderBuildingProfile`、`CommanderBuildingAbilityProfile`、`CommanderBuildingReplacementProfile`。

### 当前 buildings.json 建筑清单

| 名称 | Catalog ID | 解析 Unit | 属性 | 费用/人口/生命 | 备注 |
|---|---|---|---|---|---|
| 传送门 | `Gateway` | `Gateway` | Ground; Mechanical; Structure; Melee | 矿:150 气:- 人口:- 生命:500 护盾:500 能量:- | 使星灵可以利用折跃技术召集地面单位。 / 开启： / - 狂热者 |
| 光子炮台 | `PhotonCannon` | `PhotonCannon, Zealot` | Ground; Mechanical; Structure; Melee | 矿:150 气:- 人口:- 生命:150 护盾:150 能量:- | 主力防御建筑。 / 可以对地和对空。 / 侦测单位 |
| 机械研究所 | `RoboticsBay` | `RoboticsBay` | Ground; Mechanical; Structure; Melee | 矿:150 气:150 人口:- 生命:500 护盾:500 能量:- | 为侦测器、折跃棱镜和巨像提供升级方案。 / 开启： / - 可以在机械台中折跃巨像 / - 可以在机械台中折跃干扰者 |
| 光影议会 | `TwilightCouncil` | `TwilightCouncil` | Ground; Mechanical; Structure; Melee | 矿:150 气:100 人口:- 生命:500 护盾:500 能量:- | 为狂热者、追猎者以及使徒提供升级方案。 |

### 建筑按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
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
| 机械研究所 | `ResearchVanguardArmoredDamage` | 研究聚变迫击炮 | `RoboticsBayResearch,Research16` | - | 提高先锋对重甲单位的伤害。 |
| 机械研究所 | `ResearchAlarakVanguardIncreaseSplashAreaLocked` | 研究物质散化 | - | `AlarakLevel06` | 该科技将在指挥官等级6时解锁。 |
| 机械研究所 | `FenixResearchDisruptorCloakLocked` | 研究隐形模块 | - | `FenixLevel09` | 该科技将在指挥官等级9时解锁。 |
| 机械研究所 | `FenixResearchDisruptorSecondExplosionLocked` | 研究净化回荡 | - | `FenixLevel09` | 该科技将在指挥官等级9时解锁。 |
| 机械研究所 | `ResearchZeratulImmortalRange` | 神器强化：原力炮 | - | `HaveZeratulArtifactTier2AndRoboticsBay` | 萨尔纳加执行者的歼灭炮可以击退敌方空中单位，并且对轰击路线沿途的单位造成{Effect,ZeratulPhaseDisruptorsAir,AreaArray[0].Fraction*100}%伤害。 |
| 机械研究所 | `ColossusPassive` | ColossusPassive | - | `HaveColossus` | - |
| 机械研究所 | `ZeratulResearchImprovedBarrier` | 神器强化：永恒屏障 | - | `HaveZeratulArtifactTier3AndRoboticsBay` | 萨尔纳加执行者屏障吸收的伤害量提高{$UpgradeEffectArrayValue:ZeratulArtifactTier3_RoboticsBay:Behavior,ImmortalBarrierBase,DamageResponse.ModifyLimit$/Beha... |
| 机械研究所 | `ResearchFenixWarbringerColossusPowerShotLocked` | 研究净化轰击 | - | `FenixLevel14` | 该科技将在指挥官等级14时解锁。 |
| 机械研究所 | `FenixImmortalResearchDetonationShotLocked` | 研究重力过载 | - | `FenixLevel12` | 该科技将在指挥官等级12时解锁。 |
| 机械研究所 | `ReaverPassive` | ReaverPassive | - | `HaveVoidReaver` | - |
| 光影议会 | `ArmorResearchSupplicantShieldArmor` | 研究鲜血护盾 | `TwilightCouncilResearch,Research25` | - | 降低敌人对死徒的护盾造成的伤害。 |
| 光影议会 | `ResearchReconstructionLocked` | 研究重构 | - | `KaraxLevel04` | 该科技将在指挥官等级4时解锁。 |
| 光影议会 | `ResearchFenixKaldalisZealotCleaveLocked` | 研究充能利刃 | - | `FenixLevel04` | 该科技将在指挥官等级4时解锁。 |
| 光影议会 | `FenixTalisAdeptLearnBounceShotUpgradeLocked` | 研究衰弱系统 | - | `FenixLevel04` | 该科技将在指挥官等级4时解锁。 |
| 光影议会 | `ResearchDragoonRange` | 研究奇点充能 | `TwilightCouncilResearch,Research6` | - | 龙骑士的射程+2。 |
| 光影议会 | `ResearchWhirlwind` | 研究旋风斩 | `TwilightCouncilResearch,Research3` | - | 使狂热者可以使用旋风斩技能。旋风斩在激活时会对附近所有敌人造成伤害。 |
| 光影议会 | `ResearchReclamationLocked` | 研究回收 | - | `KaraxLevel04` | 该科技将在指挥官等级4时解锁。 |
| 光影议会 | `AdeptResearchPiercingUpgrade` | 研究共鸣之刃 | - | - | 使徒的攻击速度提高45%。 |
| 光影议会 | `ResearchShadowStun` | 研究黑暗缠绕 | `TwilightCouncilResearch,Research9` | - | 使百夫长能击晕附近的敌人，并使他们的护盾值在一小段时间内提高{Behavior,VoidZealotShadowChargeSelfBuff,Modification.VitalMaxArray[Shields]}点。重型单位则会被减速。 |

实现备注：建筑自己的技能、生产队列、变形、起飞/降落、特殊自动施法由建筑 profile 声明；地图和科技建筑不持有跨指挥官判断。

## 08. 科技建筑及其升级选项

Owner：`CommanderTechBuildingProfile`、`CommanderTechOptionProfile`、`CommanderUpgradeEffectProfile`。

### 15 级解锁与研究命令

| 等级 | 名称 | 解锁升级 | 解锁 AbilityCmd | 说明 |
|---|---|---|---|---|
| 1 | 可变部署 | - | - | 菲尼克斯可以在战场上任意位置折跃多种战甲配置。战甲只有在未加入战场的状态下才能恢复生命值和能量值。菲尼克斯的战斗单位费用降低20%。 |
| 2 | 解锁：净化者议会 | - | - | 解锁净化者议会建筑，允许你研究星灵英雄的智能人格。研究完成后，这些智能人格会自动下载至任意可用的宿主单位上。智能人格已解锁：卡尔达利斯 - 军团士兵塔里斯 - 使徒 |
| 3 | 解锁：塞布罗斯仲裁者战甲 | - | `SOASummonFenixArbiter:` | 解锁菲尼克斯的塞布罗斯仲裁者战甲。塞布罗斯号仲裁者战甲可以使其自身以及附近的盟友隐身，将友方单位召回其所在位置，和使用静滞技能禁锢敌方单位。 |
| 4 | 突击勇士研究包 | - | `TwilightCouncilResearch:25`, `FenixTalisAdeptBounceShot:`, `TwilightCouncilResearch:29` | 在光影议会中解锁下列升级： / 卡尔达利斯的攻击造成范围性伤害塔里斯的回旋刃额外弹跳5次，并使受影响的单位承受额外的伤害 |
| 5 | 英雄智能：塔尔达林与摩约 | - | `FenixAltarOfPsiStormsResearch:3`, `FenixAltarOfPsiStormsResearch:2`, `FenixMojoMissiles:` | 在净化者议会中解锁额外的智能人格： / 塔尔达林 - 不朽者摩约 - 侦察机 |
| 6 | 菲尼克斯升级包 | - | `ForgeResearch:15`, `ForgeResearch:14` | 在锻炉中解锁下列升级： / 所有菲尼克斯战甲获得+15攻击伤害菲尼克斯的塞布罗斯仲裁者战甲获得侦测能力 |
| 7 | 新单位：干扰者 | `FenixUnlockDisruptor` | - | 机械干扰型单位。可以使用净化新星造成大量范围性伤害。可在机械台中进行折跃。 / 可以对地。 |
| 8 | 英雄智能：战争使者与科罗拉里昂 | `FenixWarbringerColossusIceBeam` | `FenixAltarOfPsiStormsResearch:4`, `FenixAltarOfPsiStormsResearch:5` | 在净化者议会中解锁额外的智能人格： / 战争使者 - 巨像科罗拉里昂 - 航母 |
| 9 | 特种单位升级包 | - | `RoboticsBayResearch:18`, `RoboticsBayResearch:19`, `CyberneticsCoreResearch:14` | 解锁下列升级： / 干扰者成为永久隐形状态 (在机械研究所中研究)干扰者净化新星爆炸两次 (在机械研究所中研究)保护者的防护场持续时间延长100% (在控制芯核中研究) |
| 10 | 作战效能 | `FenixNoTechNoGas` | - | 建筑不再有科技需求限制，晶体矿费用降低50%，瓦斯费用降低100%。 |
| 11 | 复仇协议 | `FenixChampionSwapBoost` | - | 每当智能人格英雄类型的宿主机体被摧毁时，智能人格英雄获得攻击和移动速度加成（每点补给提供10%），或者智能人格英雄转移至新的宿主机体时，获得50%速度加成。速度加成最多可以叠加到100%，在不刷新的情况下可以持续20秒。 |
| 12 | 强攻勇士升级包 | - | `RoboticsBayResearch:20`, `FleetBeaconResearch:19` | 解锁下列升级： / 塔尔达林的攻击可储存对敌人造成的伤害，并在敌人被击杀后释放所有储存的伤害，造成范围性伤害 (在机械研究所中研究)允许摩约发射一轮反物质飞弹弹幕 (在舰队航标中研究) |
| 13 | 快速充能 | `FenixOfflineSuitRegen` | - | 当前离线的菲尼克斯战甲生命恢复和护盾恢复速度加快20%。 |
| 14 | 攻城勇士升级包 | - | `RoboticsBayResearch:21`, `FleetBeaconResearch:20`, `FenixClolarionCarrierBomberHangar:`, `RoboticsBayResearch:22`, `FenixWarbringerColos... | 解锁下列升级： / 战争使者获得一项技能，可对敌方单位发射一次毁灭性轰击 (在机械研究所中研究)科罗拉里昂可以建造强击机轰炸敌方单位 (在舰队航标中研究) |
| 15 | 战术数据网 | `FenixNetworkedSuperiority` | - | 每有一个同类型的宿主机体，智能人格英雄的特殊技能便获得加成 (最多获得20个补给的加成)。 |

### Upgrade 摘要

| Upgrade | 父级 | 显示名 | Effect数 | 说明 |
|---|---|---|---|---|
| `CommanderPrestigeFenixAvenger` | `CommanderPrestige` | 不屈意志 | 36 | 优点 / 复仇协议的效果提升100%。智能人格英雄死亡时返还其75%的基础单位消耗。 / 缺点 / 智能人格英雄不再获得额外的生命值或护盾，并且攻击距离降低。 |
| `CommanderPrestigeFenixAvengerMastery` | `CommanderPrestige` | - | 24 | - |
| `CommanderPrestigeFenixDataWeb` | `CommanderPrestige` | 网络管理员 | 65 | 优点 / 战术数据网的效果提升200%。所有战斗单位的消耗降低50%。 / 缺点 / 所有非英雄战斗单位的伤害降低50%，活力降低50%。 |
| `CommanderPrestigeFenixSuitSwap` | `CommanderPrestige` | 阿昆德拉 | 15 | 优点 / 所有战甲伤害提高100%，技能冷却时间缩短50%。生命值、护盾和能量恢复速度在储能期间增加100%。 / 缺点 / 所有战甲空投的冷却时间提高700%。每套战甲一次只能持续20秒。 |
| `CommanderPrestigeFenixSuitSwapMastery` | `CommanderPrestige` | - | 2 | - |
| `FenixChampionSwapBoost` | `-` | - | 0 | - |
| `FenixCommander` | `-` | Fenix | 95 | - |
| `FenixNetworkedSuperiority` | `-` | - | 0 | - |
| `FenixNoTechNoGas` | `-` | - | 23 | - |
| `FenixOfflineSuitRegen` | `-` | - | 6 | - |
| `FenixResearchCostReduction` | `-` | - | 39 | - |
| `FenixUnlockDisruptor` | `-` | - | 3 | - |
| `FenixWarbringerColossusIceBeam` | `-` | 菲尼克斯 战争使者 巨像 冰光束 | 3 | - |
| `MasteryFenixChampionAttackSpeed` | `-` | 智能人格英雄的攻击速度 | 13 | 提高智能人格英雄的攻击速度 |
| `MasteryFenixChampionLifeShieldBuff` | `-` | 智能人格英雄的生命值和护盾 | 33 | 提高智能人格英雄的生命值和护盾 |
| `MasteryFenixChronoBoostExtra` | `-` | 时空提速效能 | 8 | 提高时空提速的速度加成。 |
| `MasteryFenixExtraStartingSupply` | `-` | 额外起始补给 | 1 | 提高起始补给。 |
| `MasteryFenixSuitAttackSpeed` | `-` | 菲尼克斯战甲的攻击速度 | 4 | 提高菲尼克斯战甲的攻击速度。 |
| `MasteryFenixSuitEnergyRegen` | `-` | 菲尼克斯战甲离线时的能量恢复 | 4 | 提高战甲在离线状态下的能量恢复速度。 |

### 研究/升级按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 使徒 | `AdeptPiercingUpgrade` | 共鸣之刃 | - | `HaveAdeptPiercingAttack` | 使徒的攻击速度提高45%。 |
| 传送门 | `UpgradeToWarpGate` | 变形为折跃门 | `UpgradeToWarpGate,Execute` | - | 将传送门升级为折跃门，使星灵可以利用折跃技术将地面单位召集到任何有水晶塔或折跃棱镜能量覆盖的区域。 |
| 机械研究所 | `ResearchVanguardArmoredDamage` | 研究聚变迫击炮 | `RoboticsBayResearch,Research16` | - | 提高先锋对重甲单位的伤害。 |
| 机械研究所 | `ResearchAlarakVanguardIncreaseSplashAreaLocked` | 研究物质散化 | - | `AlarakLevel06` | 该科技将在指挥官等级6时解锁。 |
| 机械研究所 | `FenixResearchDisruptorCloakLocked` | 研究隐形模块 | - | `FenixLevel09` | 该科技将在指挥官等级9时解锁。 |
| 机械研究所 | `FenixResearchDisruptorSecondExplosionLocked` | 研究净化回荡 | - | `FenixLevel09` | 该科技将在指挥官等级9时解锁。 |
| 机械研究所 | `ResearchZeratulImmortalRange` | 神器强化：原力炮 | - | `HaveZeratulArtifactTier2AndRoboticsBay` | 萨尔纳加执行者的歼灭炮可以击退敌方空中单位，并且对轰击路线沿途的单位造成{Effect,ZeratulPhaseDisruptorsAir,AreaArray[0].Fraction*100}%伤害。 |
| 机械研究所 | `ColossusPassive` | ColossusPassive | - | `HaveColossus` | - |
| 机械研究所 | `ZeratulResearchImprovedBarrier` | 神器强化：永恒屏障 | - | `HaveZeratulArtifactTier3AndRoboticsBay` | 萨尔纳加执行者屏障吸收的伤害量提高{$UpgradeEffectArrayValue:ZeratulArtifactTier3_RoboticsBay:Behavior,ImmortalBarrierBase,DamageResponse.ModifyLimit$/Beha... |
| 机械研究所 | `ResearchFenixWarbringerColossusPowerShotLocked` | 研究净化轰击 | - | `FenixLevel14` | 该科技将在指挥官等级14时解锁。 |
| 机械研究所 | `FenixImmortalResearchDetonationShotLocked` | 研究重力过载 | - | `FenixLevel12` | 该科技将在指挥官等级12时解锁。 |
| 机械研究所 | `ReaverPassive` | ReaverPassive | - | `HaveVoidReaver` | - |
| 光影议会 | `ArmorResearchSupplicantShieldArmor` | 研究鲜血护盾 | `TwilightCouncilResearch,Research25` | - | 降低敌人对死徒的护盾造成的伤害。 |
| 光影议会 | `ResearchReconstructionLocked` | 研究重构 | - | `KaraxLevel04` | 该科技将在指挥官等级4时解锁。 |
| 光影议会 | `ResearchFenixKaldalisZealotCleaveLocked` | 研究充能利刃 | - | `FenixLevel04` | 该科技将在指挥官等级4时解锁。 |
| 光影议会 | `FenixTalisAdeptLearnBounceShotUpgradeLocked` | 研究衰弱系统 | - | `FenixLevel04` | 该科技将在指挥官等级4时解锁。 |
| 光影议会 | `ResearchDragoonRange` | 研究奇点充能 | `TwilightCouncilResearch,Research6` | - | 龙骑士的射程+2。 |
| 光影议会 | `ResearchWhirlwind` | 研究旋风斩 | `TwilightCouncilResearch,Research3` | - | 使狂热者可以使用旋风斩技能。旋风斩在激活时会对附近所有敌人造成伤害。 |
| 光影议会 | `ResearchReclamationLocked` | 研究回收 | - | `KaraxLevel04` | 该科技将在指挥官等级4时解锁。 |
| 光影议会 | `AdeptResearchPiercingUpgrade` | 研究共鸣之刃 | - | - | 使徒的攻击速度提高45%。 |
| 光影议会 | `ResearchShadowStun` | 研究黑暗缠绕 | `TwilightCouncilResearch,Research9` | - | 使百夫长能击晕附近的敌人，并使他们的护盾值在一小段时间内提高{Behavior,VoidZealotShadowChargeSelfBuff,Modification.VitalMaxArray[Shields]}点。重型单位则会被减速。 |

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
| `cargo_light` | ZealotPurifier x6, Adept x3 | 净化者前锋 | 轻型步兵和使徒机动补伤害。 | 设计草案；需按原始mod地图流程和实机日志继续校验。 |
| `cargo_heavy` | Immortal x2, ColossusPurifier x2, SentryFenix x2 | 机械推进 | 重甲、范围和保护者支援。 | 设计草案；需按原始mod地图流程和实机日志继续校验。 |
| `cargo_air` | Scout x4, Observer x1 | 空中支援 | 折跃侦察机为主，侦测器补视野。 | 设计草案；需按原始mod地图流程和实机日志继续校验。 |
| `bonus_reward` | Carrier x1, ColossusPurifier x2 | 奖励火力 | 航母只作为奖励/后期支援。 | 设计草案；需按原始mod地图流程和实机日志继续校验。 |
| `replacement_squad` | ZealotPurifier x4, Adept x4, SentryFenix x2 | 保存数据网测试 | 为人格载体/净化者机制预留验证空间。 | 设计草案；需按原始mod地图流程和实机日志继续校验。 |

### 接入规则

- 本模块不再从 `command_cards.json` 的运输/空投按钮自动推导货舱单位，也不把 `units.json` 全量清单当成可投放单位。
- 地图只传入 `mapId`、`scenarioKind`、目标点和运输模式；单位组合由 `CommanderCargoLoadoutProfile` 根据当前 commander、15 级 `power_fusion` roster 和场景限制解析。
- `原始mod` 已有运输机、空投舱、狮鹫运输、医疗运输机、坑道/深挖或感染运输容器时，应优先保留它的流程语义，只把硬编码单位替换为 profile 查询结果。
- 英雄、首领、终极进化、战列巡航舰、航母等高价值单位默认只能用于 `bonus_reward` 或显式允许英雄的地图场景。
实现备注：`CommanderMapDropProfile` 负责把地图事件映射为 `scenarioKind`；`CommanderScenarioFallbackProfile` 负责缺项降级并输出 `[XM_DBG][WARN][CARGO_FALLBACK]`。

## 10. 指挥官特殊机制

Owner：`CommanderSpecialMechanicProfile`、`CommanderSpecialResourceProfile`、`CommanderSpecialMechanicHookProfile`、`CommanderSpecialMechanicUnitProfile`。

本指挥官重点：菲尼克斯战甲切换、英雄人格载体和保存数据网。

### 特殊机制命中项

- 可变部署 (Fenix)
- 解锁：净化者议会 (FenixUnlockPurifierConclave)
- 解锁：塞布罗斯仲裁者战甲 (FenixUnlockArbiterSuit)
- 突击勇士研究包 (FenixPurifierAIResearchCache1)
- 英雄智能：塔尔达林与摩约 (FenixUnlockPurifierAI1)
- 菲尼克斯升级包 (FenixSuitUpgrades)
- 新单位：干扰者 (FenixUnlockDisruptor)
- 英雄智能：战争使者与科罗拉里昂 (FenixUnlockPurifierAI2)
- 特种单位升级包 (FenixDisruptorSentryResearchCache)
- 作战效能 (FenixStructureNoTechNoGas)
- 复仇协议 (FenixChampionTransferBuff)
- 强攻勇士升级包 (FenixPurifierAIResearchCache2)
- 快速充能 (FenixOfflineSuitRegen)
- 攻城勇士升级包 (FenixPurifierAIResearchCache3)
- 战术数据网 (FenixNetworkedSuperiority)

### 特殊机制 Upgrade 候选

- 不屈意志 (`CommanderPrestigeFenixAvenger`)
- CommanderPrestigeFenixAvengerMastery (`CommanderPrestigeFenixAvengerMastery`)
- 网络管理员 (`CommanderPrestigeFenixDataWeb`)
- 阿昆德拉 (`CommanderPrestigeFenixSuitSwap`)
- CommanderPrestigeFenixSuitSwapMastery (`CommanderPrestigeFenixSuitSwapMastery`)
- FenixChampionSwapBoost (`FenixChampionSwapBoost`)
- Fenix (`FenixCommander`)
- FenixNetworkedSuperiority (`FenixNetworkedSuperiority`)
- FenixNoTechNoGas (`FenixNoTechNoGas`)
- FenixOfflineSuitRegen (`FenixOfflineSuitRegen`)
- FenixResearchCostReduction (`FenixResearchCostReduction`)
- FenixUnlockDisruptor (`FenixUnlockDisruptor`)
- 菲尼克斯 战争使者 巨像 冰光束 (`FenixWarbringerColossusIceBeam`)
- 智能人格英雄的攻击速度 (`MasteryFenixChampionAttackSpeed`)
- 智能人格英雄的生命值和护盾 (`MasteryFenixChampionLifeShieldBuff`)
- 时空提速效能 (`MasteryFenixChronoBoostExtra`)
- 额外起始补给 (`MasteryFenixExtraStartingSupply`)
- 菲尼克斯战甲的攻击速度 (`MasteryFenixSuitAttackSpeed`)
- 菲尼克斯战甲离线时的能量恢复 (`MasteryFenixSuitEnergyRegen`)

### 特殊机制按钮候选

| 对象 | 按钮/Face | 显示名 | AbilityCmd | Requirement | 说明 |
|---|---|---|---|---|---|
| 使徒 | `AdeptFenixShadeSpawn` | 灵能投射 | - | `HaveAdeptFenixShadeSpawn` | 攻击可召唤一个无敌的阴影体，攻击敌人一小段时间。 |
| 传送门 | `SentryFenix` | 折跃保护者 | `GatewayTrain,Train15` | - | 净化者阵营 / 机械支援单位。可以使用防护场和相位模式。 / 可以对地和对空。 |
| 机械研究所 | `ResearchVanguardArmoredDamage` | 研究聚变迫击炮 | `RoboticsBayResearch,Research16` | - | 提高先锋对重甲单位的伤害。 |
| 机械研究所 | `FenixResearchDisruptorCloakLocked` | 研究隐形模块 | - | `FenixLevel09` | 该科技将在指挥官等级9时解锁。 |
| 机械研究所 | `FenixResearchDisruptorSecondExplosionLocked` | 研究净化回荡 | - | `FenixLevel09` | 该科技将在指挥官等级9时解锁。 |
| 机械研究所 | `ResearchFenixWarbringerColossusPowerShotLocked` | 研究净化轰击 | - | `FenixLevel14` | 该科技将在指挥官等级14时解锁。 |
| 机械研究所 | `FenixImmortalResearchDetonationShotLocked` | 研究重力过载 | - | `FenixLevel12` | 该科技将在指挥官等级12时解锁。 |
| 折跃侦察机 | `HaveFenixScoutWeaponRange` | 战斗感应器阵列 | - | `HaveFenixScoutWeaponRange` | 侦察机获得+3对空攻击射程和+1对地攻击射程。 |
| 保护者 | `FenixSentryGuardianZone` | 防护场 | `FenixSentryGuardianZone,Execute` | - | 制造一个护盾，使友方单位受到的所有攻击伤害降低{Behavior,FenixSentryGuardianZone,Modification.DamageTakenFraction[Melee]*(-100)}%， 持续{time:[d ref='Effect,FenixSe... |
| 保护者 | `FenixSentryPhasingMode` | 相位模式 | `SentryFenixPhasingMode,Execute` | - | 保护者变形为相位模式。使保护者可以提供一个能量场，效果与水晶塔相同，但该模式下保护者无法移动。 |
| 光影议会 | `ArmorResearchSupplicantShieldArmor` | 研究鲜血护盾 | `TwilightCouncilResearch,Research25` | - | 降低敌人对死徒的护盾造成的伤害。 |
| 光影议会 | `ResearchFenixKaldalisZealotCleaveLocked` | 研究充能利刃 | - | `FenixLevel04` | 该科技将在指挥官等级4时解锁。 |
| 光影议会 | `FenixTalisAdeptLearnBounceShotUpgradeLocked` | 研究衰弱系统 | - | `FenixLevel04` | 该科技将在指挥官等级4时解锁。 |

实现备注：凡是涉及局内状态、资源、堆叠、全局计时器、隐藏 caster、英雄成长或召唤首领的机制，都必须有 runtime hook 和 `[XM_DBG]` 日志。

## 11. 指挥官个性化机制

Owner：`CommanderPersonalMechanicProfile`、`CommanderPersonalMechanicEffectProfile`、`CommanderPersonalMechanicHookProfile`、`CommanderPersonalMechanicRequirementProfile`。

本指挥官重点：战甲切换、人格载体与保存数据网需要 HeroModeProfile + UnitReplacementProfile。

### 威望正向融合输入

| 威望 ID | 名称 | Primary Upgrade | 禁用单位 | 启用单位 | 禁用 Ability | 补充 Upgrade |
|---|---|---|---|---|---|---|
| `CommanderPrestigeFenixSuitSwap` | - | `CommanderPrestigeFenixSuitSwap` | - | - | - | `FenixSuitSwap1` |
| `CommanderPrestigeFenixDataWeb` | - | `CommanderPrestigeFenixDataWeb` | - | - | - | - |
| `CommanderPrestigeFenixAvenger` | - | `CommanderPrestigeFenixAvenger` | - | - | - | `FenixAvenger1` |

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
[XM_DBG][INFO][COMMANDER_PROFILE_LOAD] commander=Fenix levelMode=FullLevel15 masteryMode=AllSixMax rosterStage=power_fusion result=ok
[XM_DBG][INFO][POWER_FUSION_APPLY] commander=Fenix levelMode=FullLevel15 masteryMode=AllSixMax prestigeMode=SelectedPositive result=ok
[XM_DBG][INFO][ROSTER_LOAD] commander=Fenix stage=power_fusion units=8 buildings=4 heroes=0 result=ok
[XM_DBG][INFO][HERO_PROFILE_LOAD] commander=Fenix heroes=0 result=ok
[XM_DBG][INFO][MODULE_VERIFY] commander=Fenix module=<01-11> profile=<profile> result=ok
[XM_DBG][WARN][CASC_AUDIT_REQUIRED] commander=Fenix module=<module> object=<object> result=needs-casc-audit
```

## 第一轮待审计项

- 顶部技能的 caster、按钮、冷却、充能、目标转发闭包。
- 英雄或特殊英雄的 Unit、Ability、Behavior、Weapon、Actor、Sound、复活/重生闭包。
- `power_fusion` 最终 roster 与 `level15` roster 的新增、替换、变体关系。
- 6 项精通的真实作用对象和最终数值。
- 3 个威望的正面收益、负面代价、disable/suppress、费用/冷却/上限变化。
- 科技建筑研究按钮、Requirement、Upgrade effect 是否完整。
- 特殊机制、英雄成长和个性化机制是否需要 runtime hook。
