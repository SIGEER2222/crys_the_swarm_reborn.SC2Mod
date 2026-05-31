# 官方合作指挥官全量缺口清单

- 生成时间：2026/5/31 21:11:33
- 官方数据：`C:\Users\22448\Downloads\重生虫心0.71汉化版（新）\reborn_workrepo\游戏数据\官方合作指挥官\commanders`
- Mod 数据：`C:\Users\22448\Downloads\重生虫心0.71汉化版（新）\reborn_workrepo\合作指挥官版起义狂潮\Mods\XM`
- 扫描范围：当前 XM 树下全部 XML / TXT / GALAXY 文件，共 786 个
- 判定方式：缺口按官方 JSON 条目 ID 与当前 Mod 中的 `id` 属性做精确比对；同名引用、localized key 和脚本文本命中只作为辅助线索，不视为已实现。
- 说明：这是精确定义扫描底稿，适合作为缺口排查和人工复核底稿，不应直接当作最终玩法收口判定。

## 总览

| 指挥官 | 模块 | 缺失总数 | 主要缺口 |
| --- | --- | ---: | --- |
| Abathur | `XMAbathur.SC2Mod` | 27 | units、prestiges、commander_perks、buttons |
| Alarak | `XMAlarak.SC2Mod` | 13 | units、upgrades、commander_perks、abilities、buttons |
| Artanis | `XMArtanis.SC2Mod` | 17 | units、commander_perks、abilities、buttons |
| Dehaka | `XMDehaka.SC2Mod` | 48 | upgrades、commander_perks、abilities、buttons |
| Fenix | `XMFenix.SC2Mod` | 15 | commander_perks、abilities、buttons |
| Horner | `XMHorner.SC2Mod` | 44 | units、upgrades、commander_perks、abilities、buttons |
| Karax | `XMKarax.SC2Mod` | 15 | upgrades、commander_perks、abilities、buttons |
| Kerrigan | `XMKerrigan.SC2Mod` | 34 | units、upgrades、commander_perks、buttons |
| Mengsk | `XMMengsk.SC2Mod` | 42 | upgrades、commander_perks、abilities、buttons |
| Nova | `XMNova.SC2Mod` | 54 | units、upgrades、commander_perks、abilities、buttons |
| Raynor | `XMRaynor.SC2Mod` | 38 | units、commander_perks、abilities、buttons |
| Stetmann | `XMStetmann.SC2Mod` | 36 | commander_perks、abilities、buttons |
| Stukov | `XMStukov.SC2Mod` | 60 | units、buildings、upgrades、commander_perks、buttons |
| Swann | `XMSwann.SC2Mod` | 42 | units、buildings、upgrades、commander_perks、abilities、buttons |
| Tychus | `XMTychus.SC2Mod` | 39 | upgrades、commander_perks、abilities、buttons |
| Vorazun | `XMVorazun.SC2Mod` | 32 | upgrades、commander_perks、abilities、buttons |
| Zagara | `XMZagara.SC2Mod` | 31 | commander_perks、buttons |
| Zeratul | `XMZeratul.SC2Mod` | 30 | buildings、upgrades、commander_perks、abilities、buttons |

## Abathur

- 模块：`XMAbathur.SC2Mod`
- 缺失总数：27
- 缺口分类：兵种、威望、指挥官进度、按钮

### 兵种

- 官方数量：12
- 缺失数量：1
- 仅有文本/引用命中的条目：1
- 守护者 `AbathurGuardian`

### 威望

- 官方数量：3
- 缺失数量：1
- 仅有文本/引用命中的条目：1
- CommanderPrestigeAbathurUltimateEvo `CommanderPrestigeAbathurUltimateEvo`

### 指挥官进度

- 官方数量：15
- 缺失数量：10
- 仅有文本/引用命中的条目：10
- 终极进化 `AbathurUnlockBrutaliskLeviathan`
- 剧毒巢穴 `AbathurImprovedToxicNests`
- 蟑螂温室升级包 `AbathurRoachWarrenUpgrades`
- 进化腔升级包 `AbathurEvolutionPitUpgrades`
- 新单位：飞蛇 `AbathurUnlockViper`
- 感染深渊升级包 `AbathurInfestationPitUpgrades`
- 共生体 `AbathurUnlockSymbiote`
- 尖塔升级包 `AbathurGreaterSpireUpgrades`
- 突变潜能 `AbathurFasterCheaperMorphs`
- 蟑螂进化：秽型虫 `AbathurRoachEvolutionVile`

### 按钮

- 官方数量：51
- 缺失数量：15
- 仅有文本/引用命中的条目：15
- 生物质收割者 `CommanderAbathurBaseTrait`
- 终极进化 `CommanderAbathurUnlockBrutaliskLeviathan`
- 剧毒巢穴 `CommanderAbathurToxicBonusBiomass`
- 蟑螂温室升级包 `CommanderAbathurUnlockRoachWarrenUpgrades`
- 强化愈合 `CommanderAbathurImprovedMend`
- 进化腔升级包 `CommanderAbathurUnlockEvolutionChamberUpgrades`
- 生物质恢复 `CommanderAbathurBiomassRefund`
- 新单位：飞蛇 `CommanderAbathurUnlockViper`
- 感染深渊升级包 `CommanderAbathurUnlockInfestationPitUpgrades`
- 共生体 `CommanderAbathurBrutaliskLeviathanSymbiote`
- 尖塔升级包 `CommanderAbathurUnlockGreaterSpireUpgrades`
- 突变潜能 `CommanderAbathurUnitEvolutionMorphTimesReduced`
- 蝗虫注射 `CommanderAbathurSpawnLocustsOnKill`
- 蟑螂进化：秽型虫 `CommanderAbathurRoachEvolutionVile`
- 生质汲取 `CommanderAbathurBiomassLifesteal`

## Alarak

- 模块：`XMAlarak.SC2Mod`
- 缺失总数：13
- 缺口分类：兵种、升级、指挥官进度、技能、按钮

### 兵种

- 官方数量：7
- 缺失数量：1
- 仅有文本/引用命中的条目：1
- 浩劫 `SentryTaldarim`

### 升级

- 官方数量：19
- 缺失数量：1
- 仅有文本/引用命中的条目：1
- HaveMonitor `HaveMonitor`

### 指挥官进度

- 官方数量：15
- 缺失数量：9
- 仅有文本/引用命中的条目：9
- 强化超载 `AlarakImprovedOvercharge`
- 死亡议会升级包 `AlarakTwilightCouncilUpgradesPack`
- 供奉我 `AlarakEmpowerMeSlaves`
- 机械研究所升级包 `AlarakRoboticsBayUpgradesPack`
- 新单位：晋升者 `AlarakUnlockAscendant`
- 浩劫升级包 `AlarakHavocUpgradesPack`
- 召唤死亡舰队 `AlarakDeathFleet`
- 晋升者升级包 `AlarakTemplarArchivesUpgradesPack`
- 阿拉纳克升级包 `AlarakPHLevel14`

### 技能

- 官方数量：15
- 缺失数量：1
- 仅有文本/引用命中的条目：1
- 设定集结点 `ProgressRally`

### 按钮

- 官方数量：58
- 缺失数量：1
- 仅有文本/引用命中的条目：1
- 研究共鸣之刃 `AdeptResearchPiercingUpgrade`

## Artanis

- 模块：`XMArtanis.SC2Mod`
- 缺失总数：17
- 缺口分类：兵种、指挥官进度、技能、按钮

### 兵种

- 官方数量：7
- 缺失数量：1
- 仅有文本/引用命中的条目：1
- 龙骑士 `StalkerAiur`

### 指挥官进度

- 官方数量：15
- 缺失数量：10
- 仅有文本/引用命中的条目：10
- 亚顿之矛：守护之壳 `ArtanisUnlockHeroicShield`
- 超级折跃门 `ArtanisUnlockWarpGateCharges`
- 光影议会升级包 `ArtanisTwilightCouncilUpgrades`
- 圣堂武士文献馆升级包 `ArtanisTemplarArchivesUpgrades`
- 亚顿之矛：折跃谐振 `ArtanisUnlockWarpTech`
- 机械研究所升级包 `ArtanisRoboticsBayUpgrades`
- 亚顿之矛：太阳轰炸 `ArtanisUnlockStrafeAttack`
- 舰队航标升级包 `ArtanisFleetBeaconUpgrades`
- 亚顿之矛：护盾超载 `ArtanisImprovedSuperShields`
- 亚顿之矛：太阳打击 `ArtanisImprovedStrafeAttack`

### 技能

- 官方数量：27
- 缺失数量：3
- 仅有文本/引用命中的条目：3
- 亚顿之矛：折跃谐振 `UpgradeToRoboticsFacilityWarp`
- 亚顿之矛：太阳轰炸 `SOAStrafeAttackExecute`
- 设定集结点 `ProgressRally`

### 按钮

- 官方数量：68
- 缺失数量：3
- 仅有文本/引用命中的条目：3
- ColossusPassive `ColossusPassive`
- ReaverPassive `ReaverPassive`
- 研究共鸣之刃 `AdeptResearchPiercingUpgrade`

## Dehaka

- 模块：`XMDehaka.SC2Mod`
- 缺失总数：48
- 缺口分类：升级、指挥官进度、技能、按钮

### 升级

- 官方数量：17
- 缺失数量：5
- 仅有文本/引用命中的条目：5
- DehakaLevel02Tooltips `DehakaLevel02Tooltips`
- DehakaLevel06Tooltips `DehakaLevel06Tooltips`
- DehakaLevel08Tooltips `DehakaLevel08Tooltips`
- DehakaLevel11Tooltips `DehakaLevel11Tooltips`
- DehakaPrimalBossUpgrades `DehakaPrimalBossUpgrades`

### 指挥官进度

- 官方数量：15
- 缺失数量：15
- 仅有文本/引用命中的条目：15
- 精华收集者 `DehakaPHLevel01`
- 新单位：掠食龙和原始点火虫 `DehakaPHLevel02`
- 掠食龙升级包 `DehakaPHLevel03`
- 深槽虫道 `DehakaPHLevel04`
- 原始洞察 `DehakaPHLevel05`
- 新单位：原始异龙和原始守护者 `DehakaPHLevel06`
- 原始异龙和原始守护者升级包 `DehakaPHLevel07`
- 新单位：掘地虫宿主和原始穿刺者 `DehakaPHLevel08`
- 原始点火虫和原始穿刺者升级包 `DehakaPHLevel09`
- 进化的虫群首领 `DehakaPHLevel10`
- 新单位：暴龙兽 `DehakaPHLevel11`
- 生存本能 `DehakaPHLevel12`
- 精英原始异虫升级包 `DehakaPHLevel13`
- 泽鲁斯的狡诈 `DehakaPHLevel14`
- 基因突变 `DehakaPHLevel15`

### 技能

- 官方数量：61
- 缺失数量：5
- 仅有文本/引用命中的条目：5
- 采集 `DroneHarvest`
- 召唤建筑 `255`
- 喷漆 `SprayZerg`
- DehakaLocustFlyingSwoop `DehakaLocustFlyingSwoop`
- 设定集结点 `ProgressRally`

### 按钮

- 官方数量：138
- 缺失数量：23
- 仅有文本/引用命中的条目：23
- 精华收集者 `CommanderDehakaBaseTrait`
- 新单位：掠食龙和原始点火虫 `CommanderDehakaLevel02`
- 掠食龙升级包 `CommanderDehakaLevel03`
- 深槽虫道 `CommanderDehakaLevel04`
- 原始洞察 `CommanderDehakaLevel05`
- 新单位：原始异龙和原始守护者 `CommanderDehakaLevel06`
- 原始异龙和原始守护者升级包 `CommanderDehakaLevel07`
- 新单位：掘地虫宿主和原始穿刺者 `CommanderDehakaLevel08`
- 原始点火虫和原始穿刺者升级包 `CommanderDehakaLevel09`
- 进化的虫群首领 `CommanderDehakaLevel10`
- 新单位：暴龙兽 `CommanderDehakaLevel11`
- 生存本能 `CommanderDehakaLevel12`
- 精英原始异虫升级包 `CommanderDehakaLevel13`
- 泽鲁斯的狡诈 `CommanderDehakaLevel14`
- 基因突变 `CommanderDehakaLevel15`
- MoveChampions `MoveChampions`
- AttackChampions `AttackChampions`
- AttackWorker `AttackWorker`
- 采集 `GatherZerg`
- 返还资源 `ReturnCargo`
- PrimalBuildingUproot `PrimalBuildingUproot`
- 设定集结点 `SetRallyPoint2`
- DehakaLocustFlyingSwoop `DehakaLocustFlyingSwoop`

## Fenix

- 模块：`XMFenix.SC2Mod`
- 缺失总数：15
- 缺口分类：指挥官进度、技能、按钮

### 指挥官进度

- 官方数量：15
- 缺失数量：11
- 仅有文本/引用命中的条目：11
- 解锁：净化者议会 `FenixUnlockPurifierConclave`
- 解锁：塞布罗斯仲裁者战甲 `FenixUnlockArbiterSuit`
- 突击勇士研究包 `FenixPurifierAIResearchCache1`
- 英雄智能：塔尔达林与摩约 `FenixUnlockPurifierAI1`
- 菲尼克斯升级包 `FenixSuitUpgrades`
- 英雄智能：战争使者与科罗拉里昂 `FenixUnlockPurifierAI2`
- 特种单位升级包 `FenixDisruptorSentryResearchCache`
- 作战效能 `FenixStructureNoTechNoGas`
- 复仇协议 `FenixChampionTransferBuff`
- 强攻勇士升级包 `FenixPurifierAIResearchCache2`
- 攻城勇士升级包 `FenixPurifierAIResearchCache3`

### 技能

- 官方数量：21
- 缺失数量：1
- 仅有文本/引用命中的条目：1
- 设定集结点 `ProgressRally`

### 按钮

- 官方数量：61
- 缺失数量：3
- 仅有文本/引用命中的条目：3
- ColossusPassive `ColossusPassive`
- ReaverPassive `ReaverPassive`
- 研究共鸣之刃 `AdeptResearchPiercingUpgrade`

## Horner

- 模块：`XMHorner.SC2Mod`
- 缺失总数：44
- 缺口分类：兵种、升级、指挥官进度、技能、按钮

### 兵种

- 官方数量：10
- 缺失数量：1
- 仅有文本/引用命中的条目：1
- 德摩斯维京战机 `HHViking`

### 升级

- 官方数量：21
- 缺失数量：11
- 仅有文本/引用命中的条目：11
- HHAirFleetYamato `HHAirFleetYamato`
- HHDoubleSupply `HHDoubleSupply`
- HHMiraBuildResearchTimeReduction `HHMiraBuildResearchTimeReduction`
- HHProgression12IconUpgrade `HHProgression12IconUpgrade`
- HHProgression14IconUpgrade `HHProgression14IconUpgrade`
- HHSpaceStationNuke `HHSpaceStationNuke`
- MasteryHornerAirStrikeDistance `MasteryHornerAirStrikeDistance`
- MasteryHornerBetterDeathRattle `MasteryHornerBetterDeathRattle`
- MasteryHornerBomberRadius `MasteryHornerBomberRadius`
- MasteryHornerDoubleSalvageChance `MasteryHornerDoubleSalvageChance`
- MasteryHornerMSOBonus `MasteryHornerMSOBonus`

### 指挥官进度

- 官方数量：15
- 缺失数量：15
- 仅有文本/引用命中的条目：15
- 霍纳夫妇 `HornerPHLevel1`
- 新单位：攻击战斗机 `HornerPHLevel2`
- 突击炮舰和忒伊亚铁鸦升级包 `HornerPHLevel3`
- 雇佣兵升级包 `HornerPHLevel4`
- 呼叫舰队 `HornerPHLevel5`
- 十万火急 `HornerPHLevel6`
- 帝国星港升级包 `HornerPHLevel7`
- 他和她的补给 `HornerPHLevel8`
- 恶火和恶蝠升级包 `HornerPHLevel9`
- 空间站调度 `HornerPHLevel10`
- 耐力训练 `HornerPHLevel11`
- 高级武器 `HornerPHLevel12`
- 聚变芯体升级包 `HornerPHLevel13`
- 爆爆乐 `HornerPHLevel14`
- 我的另一半 `HornerPHLevel15`

### 技能

- 官方数量：27
- 缺失数量：2
- 仅有文本/引用命中的条目：2
- 雇佣兵升级包 `HHMercCompoundResearch`
- 喷气背包 `255`

### 按钮

- 官方数量：51
- 缺失数量：15
- 仅有文本/引用命中的条目：15
- 霍纳夫妇 `CommanderHornerLevel01`
- 新单位：攻击战斗机 `CommanderHornerLevel02`
- 突击炮舰和忒伊亚铁鸦升级包 `CommanderHornerLevel03`
- 雇佣兵升级包 `CommanderHornerLevel04`
- 呼叫舰队 `CommanderHornerLevel05`
- 十万火急 `CommanderHornerLevel06`
- 帝国星港升级包 `CommanderHornerLevel07`
- 他和她的补给 `CommanderHornerLevel08`
- 恶火和恶蝠升级包 `CommanderHornerLevel09`
- 空间站调度 `CommanderHornerLevel10`
- 耐力训练 `CommanderHornerLevel11`
- 高级武器 `CommanderHornerLevel12`
- 聚变芯体升级包 `CommanderHornerLevel13`
- 爆爆乐 `CommanderHornerLevel14`
- 我的另一半 `CommanderHornerLevel15`

## Karax

- 模块：`XMKarax.SC2Mod`
- 缺失总数：15
- 缺口分类：升级、指挥官进度、技能、按钮

### 升级

- 官方数量：26
- 缺失数量：1
- 仅有文本/引用命中的条目：1
- 精通 凯纳克斯 单位活力 `MasteryKaraxUnitVital`

### 指挥官进度

- 官方数量：15
- 缺失数量：12
- 仅有文本/引用命中的条目：12
- 亚顿之矛：提速力场 `KaraxUnlockSOAChronoPassive`
- 新单位：凯达琳巨石 `KaraxUnlockKhaydarinMonolith`
- 光影议会升级包 `KaraxTwilightCouncilUpgradesPack`
- 亚顿之矛：时空过载 `KaraxMassChronoUpgrade`
- 锻炉升级包 `KaraxForgeUpgradesPack`
- 亚顿之矛：重构光束 `KaraxUnlockRepairBeam`
- 太阳锻炉升级包1 `KaraxSolarForgeUpgradesPack1`
- 机械研究所升级包 `KaraxRoboticsBayUpgradesPack`
- 亚顿之矛：净化光束 `KaraxUnlockPurifierBeam`
- 太阳锻炉升级包2 `KaraxSolarForgeUpgradesPack2`
- 亚顿之矛：净化协议 `KaraxPurifierBeamUpgrade`
- 舰队航标升级包 `KaraxFleetBeaconUpgrades`

### 技能

- 官方数量：21
- 缺失数量：1
- 仅有文本/引用命中的条目：1
- 恢复 `ShieldBatteryRechargeEx5`

### 按钮

- 官方数量：66
- 缺失数量：1
- 仅有文本/引用命中的条目：1
- 研究共鸣之刃 `AdeptResearchPiercingUpgrade`

## Kerrigan

- 模块：`XMKerrigan.SC2Mod`
- 缺失总数：34
- 缺口分类：兵种、升级、指挥官进度、按钮

### 兵种

- 官方数量：6
- 缺失数量：1
- 仅有文本/引用命中的条目：1
- 巢虫领主 `Broodlord`

### 升级

- 官方数量：25
- 缺失数量：1
- 仅有文本/引用命中的条目：1
- Omega Worm `VoidCoopGreaterNydusWorm`

### 指挥官进度

- 官方数量：15
- 缺失数量：14
- 仅有文本/引用命中的条目：14
- 定身波 `KerriganUnlockCrushingGripWave`
- 残酷无情 `KerriganImprovedLeapingStrike`
- 跳虫升级包 `KerriganZerglingUpgrades`
- 新单位：潜伏者 `KerriganUnlockLurker`
- 刺蛇与潜伏者升级包 `KerriganHydraLurkerUpgrades`
- 恶变菌毯 `KerriganMalignantCreep`
- 坑道虫欧米茄 `KerriganUnlockGreaterNydusWorm`
- 凯瑞甘升级包 `KerriganEvoUpgrades`
- 狂怒 `KerriganUnlockFury`
- 尖塔升级包 `KerriganSpireUpgrades`
- 跳虫进化：腾跃虫 `KerriganZerglingEvo`
- 雷兽升级包 `KerriganUltraUpgrades`
- 雷兽进化：暴龙兽 `KerriganUltraEvo`
- 刀锋女王 `KerriganImprovedEnergyRegen`

### 按钮

- 官方数量：61
- 缺失数量：18
- 仅有文本/引用命中的条目：18
- 变异甲壳 `CommanderKerriganMutatingCarapace`
- 定身波 `CommanderKerriganCrushingGripWave`
- 残酷无情 `CommanderKerriganImprovedLeapingStrike`
- 跳虫升级包 `CommanderZagaraZerglingUpgradesPack`
- 新单位：潜伏者 `CommanderKerriganUnlockLurker`
- 刺蛇与潜伏者升级包 `CommanderKerriganHydraliskandLurkerUpgradesPack`
- 恶变菌毯 `CommanderKerriganMalignantCreep`
- 坑道虫欧米茄 `CommanderKerriganGreaterNydusWorm`
- 凯瑞甘升级包 `CommanderKerriganKerriganUpgradesPack`
- 狂怒 `CommanderKerriganKerrigansFury`
- 尖塔升级包 `CommanderKerriganSpireUpgradesPack`
- 跳虫进化：腾跃虫 `CommanderKerriganZerglingEvolutionRaptor`
- 雷兽升级包 `CommanderKerriganUltraliskUpgradesPack`
- 雷兽进化：暴龙兽 `CommanderKerriganUltraliskEvolutionTorrasque`
- 召唤坑道虫 `SummonNydusWorm`
- 召唤虫道毁灭者 `SummonNydusCanalAttacker`
- 召唤菌塔 `SummonNydusCanalCreeper`
- 钻地鳞片 `NydusWormIncreasedArmorPassive`

## Mengsk

- 模块：`XMMengsk.SC2Mod`
- 缺失总数：42
- 缺口分类：升级、指挥官进度、技能、按钮

### 升级

- 官方数量：14
- 缺失数量：6
- 仅有文本/引用命中的条目：6
- CommanderPrestigeMengskRoyalGuardMastery `CommanderPrestigeMengskRoyalGuardMastery`
- MasteryMengskRoyalGuardCost `MasteryMengskRoyalGuardCost`
- MasteryMengskRoyalGuardExperienceGainRate `MasteryMengskRoyalGuardExperienceGainRate`
- MasteryMengskRoyalGuardImperialMandateRegeneration `MasteryMengskRoyalGuardImperialMandateRegeneration`
- 蒙斯克 `MengskCommander`
- NuclearAnnihilationMengskNumberMissiles `NuclearAnnihilationMengskNumberMissiles`

### 指挥官进度

- 官方数量：15
- 缺失数量：15
- 法律与秩序 `MengskPHLevel1`
- 扩展武器库 `MengskPHLevel2`
- 新单位：大地碎裂炮 `MengskPHLevel3`
- 辐射打击 `MengskPHLevel4`
- 绝对权威 `MengskPHLevel5`
- 工程站升级包 `MengskPHLevel6`
- 战争恶狼 `MengskPHLevel7`
- 皇家卫队基础升级包 `MengskPHLevel8`
- 新单位：黑色战锤 `MengskPHLevel9`
- 核弹天劫 `MengskPHLevel10`
- 神经毒素弹头 `MengskPHLevel11`
- 新单位：奥古斯格勒的骄傲 `MengskPHLevel12`
- 彻底毁灭 `MengskPHLevel13`
- 皇家卫队高级升级包 `MengskPHLevel14`
- 保证晋升 `MengskPHLevel15`

### 技能

- 官方数量：50
- 缺失数量：2
- 仅有文本/引用命中的条目：2
- 喷漆 `SprayTerran`
- 攻击 `AttackRedirect`

### 按钮

- 官方数量：145
- 缺失数量：19
- 仅有文本/引用命中的条目：4
- 法律与秩序 `CommanderMengskLevel01`
- 扩展武器库 `CommanderMengskLevel02`
- 新单位：大地碎裂炮 `CommanderMengskLevel03`
- 辐射打击 `CommanderMengskLevel04`
- 绝对权威 `CommanderMengskLevel05`
- 工程站升级包 `CommanderMengskLevel06`
- 战争恶狼 `CommanderMengskLevel07`
- 皇家卫队基础升级包 `CommanderMengskLevel08`
- 新单位：黑色战锤 `CommanderMengskLevel09`
- 核弹天劫 `CommanderMengskLevel10`
- 神经毒素弹头 `CommanderMengskLevel11`
- 新单位：奥古斯格勒的骄傲 `CommanderMengskLevel12`
- 彻底毁灭 `CommanderMengskLevel13`
- 皇家卫队高级升级包 `CommanderMengskLevel14`
- 保证晋升 `CommanderMengskLevel15`
- AttackWorker `AttackWorker`
- 返还资源 `ReturnCargo`
- 攻击 `AttackRedirect`
- 回收 `Salvage`

## Nova

- 模块：`XMNova.SC2Mod`
- 缺失总数：54
- 缺口分类：兵种、升级、指挥官进度、技能、按钮

### 兵种

- 官方数量：11
- 缺失数量：9
- 仅有文本/引用命中的条目：9
- 部署隐秘女妖 `BansheeNova`
- 部署强击歌利亚 `GoliathNova`
- 部署恶蝠游骑兵 `HellbatNova`
- 部署掠袭解放者 `LiberatorNova`
- 部署劫掠者突击手 `MarauderNova`
- 部署精英陆战队员 `MarineNova`
- 部署铁鸦II型 `RavenNova`
- 死神之首 `ReaperNova`
- 部署重型攻城坦克 `SiegeTankNova`

### 升级

- 官方数量：25
- 缺失数量：2
- 仅有文本/引用命中的条目：2
- AutoHarvester `AutoHarvester`
- 精通 诺娃 狮鹫号消耗 `MasteryNovaGriffinCost`

### 指挥官进度

- 官方数量：15
- 缺失数量：14
- 仅有文本/引用命中的条目：14
- 狮鹫号空袭 `NovaUnlockGriffinBombingRun`
- 突击模式 `NovaAssaultMode`
- 兵营升级包 `NovaBarracksTechLabUpgradeCache`
- 战术空运 `NovaUnlockGriffinTransport`
- 重工厂升级包 `NovaFactoryTechLabUpgradeCache`
- 自动化精炼厂 `NovaUnlockAutomatedRefinery`
- 隐秘行动升级包 `NovaGhostAcademyUpgradeCache`
- 战术聚变打击和全息诱饵 `NovaUnlockUltimates`
- 星港升级包 `NovaStarportTechLabUpgradeCache`
- 研究与开发 `NovaBetterResearh`
- 铁鸦升级包 `NovaStarportTechLabUpgradeCache2`
- 武器装备 `NovaImprovedGlobalPowers`
- 诺娃升级包 `NovaGhostAcademyUpgradeCache2`
- 随机应变 `NovaStanceUpgrade`

### 技能

- 官方数量：45
- 缺失数量：3
- 仅有文本/引用命中的条目：2
- 高级隐形力场 `255`
- 升空 `BarracksLiftOff`
- 稳定瞄准 `ChannelSnipe`

### 按钮

- 官方数量：102
- 缺失数量：26
- 仅有文本/引用命中的条目：25
- 隐秘行动 `CommanderNovaBaseTrait`
- 狮鹫号空袭 `CommanderNovaUnlockBombingRun`
- 突击模式 `CommanderNovaUnlockEquipmentChange`
- 兵营升级包 `CommanderNovaBarracksTechLabUpgradesPack`
- 战术空运 `CommanderNovaUnlockGriffinTransport`
- 重工厂升级包 `CommanderNovaFactoryTechLabUpgradesPack`
- 自动化精炼厂 `CommanderNovaAutoRefineries`
- 隐秘行动升级包 `CommanderNovaTechLabandGhostAcademyUpgradesPack`
- 战术聚变打击和全息诱饵 `CommanderNovaUnlockNukeandHoloDecoy`
- 星港升级包 `CommanderNovaBansheeLiberatorStarportTechLabUpgradesPack`
- 研究与开发 `CommanderNovaResearchCostandTimeReduction`
- 铁鸦升级包 `CommanderNovaRavenStarportTechLabUpgradesPack`
- 武器装备 `CommanderNovaDefensiveMatrixDroneCharges`
- 诺娃升级包 `CommanderNovaGhostAcademyUpgradesPack2`
- 随机应变 `CommanderNovaKitSwapCooldownandEnergy`
- TechReactorAI `TechReactorAI`
- 升空 `Lift`
- MengskUnits `MengskUnits`
- 稳定瞄准 `ChannelSnipe`
- MagrailMunitions `MagrailMunitions`
- HellstormMissileBatteries `HellstormMissileBatteries`
- 回收 `Salvage`
- AttackWorker `AttackWorker`
- 返还资源 `ReturnCargo`
- 装载 `CommandCenterLoad`
- 全部卸载 `CommandCenterUnloadAll`

## Raynor

- 模块：`XMRaynor.SC2Mod`
- 缺失总数：38
- 缺口分类：兵种、指挥官进度、技能、按钮

### 兵种

- 官方数量：10
- 缺失数量：1
- 仅有文本/引用命中的条目：1
- 攻城坦克 `Siege Tank`

### 指挥官进度

- 官方数量：15
- 缺失数量：12
- 仅有文本/引用命中的条目：12
- 纳米投射器 `RaynorUnlockFirebat`
- 步兵升级包 `RaynorBarracksUpgrades`
- 休伯利安号：定点防御无人机 `RaynorHyperionAdvancedPDDDrone`
- 战斗地堡 `RaynorEngineeringBayUpgrades`
- 轨道空投 `RaynorOrbitalDropPods`
- 重工厂升级包 `RaynorFactoryUpgrades`
- 钒合金板 `RaynorArmorVanadium`
- 军械库升级包 `RaynorArmoryUpgrades`
- 轨道空投补给站 `RaynorOrbitalDepots`
- 星港升级包 `RaynorStarportUpgrades`
- 休伯利安号：高级瞄准系统 `RaynorHyperionAdvancedTargetingAura`
- 佣兵军火 `RaynorImprovedInfantryAttackSpeed`

### 技能

- 官方数量：44
- 缺失数量：11
- 仅有文本/引用命中的条目：11
- 升空 `BarracksLiftOff`
- 降下 `SupplyDepotLower`
- 攻击 `AttackRedirect`
- 使用强化剂 `StimpackMarauderRedirect`
- SalvageEffect `SalvageEffect`
- 255 `255`
- 析象扫描 `ScannerSweep`
- 升空 `OrbitalLiftOff`
- BattlecruiserStop `BattlecruiserStop`
- BattlecruiserMove `BattlecruiserMove`
- BattlecruiserAttack `BattlecruiserAttack`

### 按钮

- 官方数量：91
- 缺失数量：14
- 仅有文本/引用命中的条目：14
- TechReactorAI `TechReactorAI`
- 升空 `Lift`
- MengskUnits `MengskUnits`
- 降下 `Lower`
- 攻击 `AttackRedirect`
- 装载 `BunkerLoad`
- 全部卸载 `BunkerUnloadAll`
- HellstormMissileBatteries `HellstormMissileBatteries`
- 回收 `Salvage`
- AttackWorker `AttackWorker`
- 返还资源 `ReturnCargo`
- 装载 `CommandCenterLoad`
- 全部卸载 `CommandCenterUnloadAll`
- 析象扫描 `Scan`

## Stetmann

- 模块：`XMStetmann.SC2Mod`
- 缺失总数：36
- 缺口分类：指挥官进度、技能、按钮

### 指挥官进度

- 官方数量：15
- 缺失数量：10
- 仅有文本/引用命中的条目：3
- 保证斯台特满意 `StetmannLevel1`
- “艾的滋润” `StetmannLevel2`
- 盖瑞：艾星超载 `StetmannLevel3`
- 机械跳虫与机械爆虫升级包 `StetmannLevel4`
- 机械杰作 `StetmannLevel5`
- 新单位：机械潜伏者 `StetmannLevel6`
- 斯台特曼技术帝 `StetmannLevel7`
- 机械刺蛇与机械潜伏者升级包 `StetmannLevel8`
- 永远的朋友 `StetmannLevel9`
- 可爱的小坏蛋们 `StetmannLevel13`

### 技能

- 官方数量：73
- 缺失数量：3
- 仅有文本/引用命中的条目：3
- 采集 `DroneHarvest`
- 基础变异 `255`
- 喷漆 `SprayZerg`

### 按钮

- 官方数量：159
- 缺失数量：23
- 仅有文本/引用命中的条目：9
- 保证斯台特满意 `CommanderStetmannLevel01`
- “艾的滋润” `CommanderStetmannLevel02`
- 盖瑞：艾星超载 `CommanderStetmannLevel03`
- 机械跳虫与机械爆虫升级包 `CommanderStetmannLevel04`
- 机械杰作 `CommanderStetmannLevel05`
- 新单位：机械潜伏者 `CommanderStetmannLevel06`
- 斯台特曼技术帝 `CommanderStetmannLevel07`
- 机械刺蛇与机械潜伏者升级包 `CommanderStetmannLevel08`
- 永远的朋友 `CommanderStetmannLevel09`
- 机械感染者升级包 `CommanderStetmannLevel10`
- 新单位：机械巢式战列空母 `CommanderStetmannLevel11`
- 机械雷兽升级包 `CommanderStetmannLevel12`
- 可爱的小坏蛋们 `CommanderStetmannLevel13`
- 机械尖塔升级包 `CommanderStetmannLevel14`
- 艾贡极限 `CommanderStetmannLevel15`
- AttackWorker `AttackWorker`
- 采集 `GatherZerg`
- 返还资源 `ReturnCargo`
- 设定集结点 `SetRallyPoint2`
- 取消 `CancelMutateMorph`
- StetmannStetzoneAbsorption `StetmannStetzoneAbsorption`
- MoveChampions `MoveChampions`
- AttackChampions `AttackChampions`

## Stukov

- 模块：`XMStukov.SC2Mod`
- 缺失总数：60
- 缺口分类：兵种、建筑、升级、指挥官进度、按钮

### 兵种

- 官方数量：6
- 缺失数量：2
- 仅有文本/引用命中的条目：2
- 被感染的平民 `StukovInfestedCivilian`
- 被感染的陆战队员 `StukovInfestedMarine`

### 建筑

- 官方数量：9
- 缺失数量：9
- 仅有文本/引用命中的条目：2
- 被感染的工程站 `StukovEvolutionChamber`
- 被感染的军械库 `StukovInfestedArmory`
- 被感染的兵营 `StukovInfestedBarracks`
- 被感染的移民营 `StukovInfestedCivilianStructure`
- 被感染的指挥中心 `StukovInfestedCommandCenter`
- 被感染的重工厂 `StukovInfestedFactory`
- 被感染的精炼厂 `StukovInfestedRefinery`
- 被感染的星港 `StukovInfestedStarport`
- 被感染的补给站 `StukovInfestedSupplyDepot`

### 升级

- 官方数量：29
- 缺失数量：11
- 仅有文本/引用命中的条目：11
- 指挥官特质 斯托科夫 1 `CommanderStukovPH1`
- 指挥官特质 斯托科夫 10 `CommanderStukovPH10`
- 指挥官特质 斯托科夫 12 `CommanderStukovPH12`
- CommanderStukovPH13 `CommanderStukovPH13`
- 指挥官特质 斯托科夫 2 `CommanderStukovPH2`
- 指挥官特质 斯托科夫 3 `CommanderStukovPH3`
- 指挥官特质 斯托科夫 4 `CommanderStukovPH4`
- 指挥官特质 斯托科夫 5 `CommanderStukovPH5`
- 指挥官特质 斯托科夫 6 `CommanderStukovPH6`
- 指挥官特质 斯托科夫 8 `CommanderStukovPH8`
- CommanderStukovPH9 `CommanderStukovPH9`

### 指挥官进度

- 官方数量：15
- 缺失数量：15
- 仅有文本/引用命中的条目：15
- 感染 `CommanderStukovAutoCreep`
- 恶意繁殖 `CommanderStukovImprovedInfestStructure`
- 传染病 `CommanderStukovExtraInfestedCivilians`
- 末日巨兽 `CommanderStukovApocalisk`
- 被感染的工程站升级包 `CommanderStukovBunkerResearch`
- 腐化征用 `CommanderStukovImprovedMarineSpawning`
- 被感染的步兵升级包 `CommanderStukovInfestedCivilianResearch`
- 新单位：虫巢女王 `CommanderStukovUnlockQueenClassic`
- 被感染的重工厂升级包 `CommanderStukovInfestedFactoryResearchPack`
- 亚历山大号 `CommanderStukovAleksander`
- 被感染的星港升级包 `CommanderStukovInfestedStarportResearchPack`
- 易燃外肢 `CommanderStukovApocaliskUpgrades`
- 虫巢女王升级包 `CommanderStukovQueenClassicResearchPack`
- 增生地堡 `CommanderStukovBunkerBonuses`
- 神经感染 `CommanderStukovAleksanderMindControl`

### 按钮

- 官方数量：74
- 缺失数量：23
- 仅有文本/引用命中的条目：23
- 感染 `CommanderStukovAutoCreep`
- 恶意繁殖 `CommanderStukovImprovedInfestStructure`
- 传染病 `CommanderStukovExtraInfestedCivilians`
- 末日巨兽 `CommanderStukovApocalisk`
- 被感染的工程站升级包 `CommanderStukovBunkerResearch`
- 腐化征用 `CommanderStukovImprovedMarineSpawning`
- 被感染的步兵升级包 `CommanderStukovInfestedCivilianResearch`
- 新单位：虫巢女王 `CommanderStukovQueenClassic`
- 被感染的重工厂升级包 `CommanderStukovInfestedFactoryResearchPack`
- 亚历山大号 `CommanderStukovAleksander`
- 被感染的星港升级包 `CommanderStukovInfestedStarportResearchPack`
- 易燃外肢 `CommanderStukovApocaliskUpgraded`
- 虫巢女王升级包 `CommanderStukovQueenClassicUpgradeCache`
- 增生地堡 `CommanderStukovBunkerBonuses`
- 神经感染 `CommanderStukovAleksanderMindControl`
- 升级步兵护甲等级3 `TerranInfantryArmorLevel3`
- 升级战车及舰船钢板等级3 `TerranVehicleAndShipPlatingLevel3`
- AttackWorker `AttackWorker`
- 全部卸载 `CommandCenterUnloadAll`
- 降下 `Lower`
- 停止排放菌毯 `StopGenerateCreep`
- MoveChampions `MoveChampions`
- AttackChampions `AttackChampions`

## Swann

- 模块：`XMSwann.SC2Mod`
- 缺失总数：42
- 缺口分类：兵种、建筑、升级、指挥官进度、技能、按钮

### 兵种

- 官方数量：9
- 缺失数量：2
- 仅有文本/引用命中的条目：2
- 恶蝠 `Hellbat`
- 攻城坦克 `Siege Tank`

### 建筑

- 官方数量：6
- 缺失数量：1
- 仅有文本/引用命中的条目：1
- 德拉肯激光钻机 `MiniDrakkenLaserDrill`

### 升级

- 官方数量：25
- 缺失数量：13
- 仅有文本/引用命中的条目：13
- AdvancedConstruction `AdvancedConstruction`
- 精通 斯旺 建筑生命值 `MasterySwannBuildingHealth`
- 精通 斯旺 战斗空投 `MasterySwannCombatDrop`
- 精通 斯旺 永生程序 `MasterySwannImmortalityProtocol`
- 精通 斯旺 激光钻机建造时间 `MasterySwannLaserDrillBuildTime`
- 精通 斯旺 瓦斯采集器消耗 `MasterySwannVespeneHarvesterCost`
- Swann Commander Immortality Protocol `SwannCommanderImmortalityProtocol`
- Swann Commander Vehicle Health `SwannCommanderVehicleHealth`
- Swann Commander Worker Free Repairs `SwannCommanderWorkerFreeRepairs`
- Swann Improved Special Delivery `SwannImprovedSpecialDelivery`
- Swann Turret Upgrades `SwannKelMorianTurretUpgrades`
- Swann Special Delivery `SwannSpecialDelivery`
- Swann Unlock Thor `SwannUnlockThor`

### 指挥官进度

- 官方数量：15
- 缺失数量：14
- 仅有文本/引用命中的条目：14
- 战斗空投 `SwannSpecialDelivery`
- 贝蒂家族 `SwannImprovedTurrets`
- 德拉肯激光钻机：脉冲炮 `SwannLaserDrillUpgrades`
- 瓦斯采集器 `SwannUnlockVespeneDrone`
- 新单位：雷神 `SwannUnlockThor`
- 重工厂升级包 `SwannFactoryUpgrades`
- 高级建造 `SwannImprovedSCV`
- 军械库升级包 `SwannArmoryUpgrades`
- 科技反应堆 `SwannTechReactor`
- 工程站升级包 `SwannEngineeringBayUpgrades`
- 永生程序 `SwannImmortalityProtocol`
- 星港升级包 `SwannStarportUpgrades`
- 加量不加价 `SwannImprovedSpecialDelivery`
- 机械专业 `SwannVehicleHealth`

### 技能

- 官方数量：34
- 缺失数量：3
- 仅有文本/引用命中的条目：3
- 重工厂升级包 `330mmBarrageCannons`
- 降下 `SupplyDepotLower`
- 255 `255`

### 按钮

- 官方数量：79
- 缺失数量：9
- 仅有文本/引用命中的条目：9
- MoveChampions `MoveChampions`
- AttackChampions `AttackChampions`
- 降下 `Lower`
- 回收 `Salvage`
- HellstormMissileBatteries `HellstormMissileBatteries`
- AttackWorker `AttackWorker`
- 返还资源 `ReturnCargo`
- 装载 `CommandCenterLoad`
- 全部卸载 `CommandCenterUnloadAll`

## Tychus

- 模块：`XMTychus.SC2Mod`
- 缺失总数：39
- 缺口分类：升级、指挥官进度、技能、按钮

### 升级

- 官方数量：20
- 缺失数量：3
- 仅有文本/引用命中的条目：3
- CommanderPrestigeTychusLoneWolfRecruitment `CommanderPrestigeTychusLoneWolfRecruitment`
- 指挥官 - 人类 - 泰凯斯 `TychusCommander`
- TychusCoopFifthHeroUpgrade `TychusCoopFifthHeroUpgrade`

### 指挥官进度

- 官方数量：15
- 缺失数量：15
- 仅有文本/引用命中的条目：15
- 有点过去的意思 `TychusPHLevel1`
- 兄弟越多越好 `TychusPHLevel2`
- 奥丁降世 `TychusPHLevel3`
- 新不法之徒：凯文“响尾蛇”韦斯特 `TychusPHLevel4`
- 工程站升级包 `TychusPHLevel5`
- 新不法之徒：詹姆斯“天狼星”赛克斯 `TychusPHLevel6`
- 闪亮登场第一人 `TychusPHLevel7`
- 新不法之徒：罗布“弹头哥”博斯韦尔 `TychusPHLevel8`
- 要搭飞的吗？ `TychusPHLevel9`
- 新不法之徒：维嘉 `TychusPHLevel10`
- 顺手牵羊 `TychusPHLevel11`
- 初级终极装备包 `TychusPHLevel12`
- 全副武装 `TychusPHLevel13`
- 高级终极装备包 `TychusPHLevel14`
- 红色按钮 `TychusPHLevel15`

### 技能

- 官方数量：58
- 缺失数量：3
- 仅有文本/引用命中的条目：3
- 震荡弹 `255`
- 88式劝服者 `TychusGhostSnipe`
- 喷漆 `SprayTerran`

### 按钮

- 官方数量：122
- 缺失数量：18
- 仅有文本/引用命中的条目：18
- 有点过去的意思 `CommanderTychusLevel01`
- 兄弟越多越好 `CommanderTychusLevel02`
- 奥丁降世 `CommanderTychusLevel03`
- 新不法之徒：凯文“响尾蛇”韦斯特 `CommanderTychusLevel04`
- 工程站升级包 `CommanderTychusLevel05`
- 新不法之徒：詹姆斯“天狼星”赛克斯 `CommanderTychusLevel06`
- 闪亮登场第一人 `CommanderTychusLevel07`
- 新不法之徒：罗布“弹头哥”博斯韦尔 `CommanderTychusLevel08`
- 要搭飞的吗？ `CommanderTychusLevel09`
- 新不法之徒：维嘉 `CommanderTychusLevel10`
- 顺手牵羊 `CommanderTychusLevel11`
- 初级终极装备包 `CommanderTychusLevel12`
- 全副武装 `CommanderTychusLevel13`
- 高级终极装备包 `CommanderTychusLevel14`
- 红色按钮 `CommanderTychusLevel15`
- AttackChampions `AttackChampions`
- AttackWorker `AttackWorker`
- 返还资源 `ReturnCargo`

## Vorazun

- 模块：`XMVorazun.SC2Mod`
- 缺失总数：32
- 缺口分类：升级、指挥官进度、技能、按钮

### 升级

- 官方数量：26
- 缺失数量：3
- 仅有文本/引用命中的条目：3
- SOATime Freeze Upgrade `SOATimeFreezeUpgrade`
- Shadow Guard Spawn Count `ShadowGuardSpawnCount`
- VoidZealotShadowCharge `VoidZealotShadowCharge`

### 指挥官进度

- 官方数量：15
- 缺失数量：12
- 仅有文本/引用命中的条目：12
- 亚顿之矛：轨道吸纳舱 `VorazunOrbitalAssimilator`
- 暗影军团 `VorazunImprovedShadowGuard`
- 光影议会升级包 `VorazunTwilightCouncilUpgrades`
- 黑暗圣堂武士升级包 `VorazunDarkTemplarUpgrades`
- 暗影之幕 `VorazunImprovedShieldRegeneration`
- 黑暗执政官升级包 `VorazunDarkArchonUpgrades`
- 亚顿之矛：时间停止 `VorazunUnlockTimeStop`
- 黑暗水晶塔：召回 `VorazunUnlockDarkPylonRecall`
- 舰队航标升级包 `VorazunFleetBeaconUpgrades`
- 黑暗圣堂武士召回 `VorazunUnlockSOARecallOnDeath`
- 亚顿之矛：时空理论 `VorazunImprovedTimeStop`
- 阴影黯灭 `VorazunCloakedUnitDamageBoost`

### 技能

- 官方数量：23
- 缺失数量：1
- 仅有文本/引用命中的条目：1
- 设定集结点 `ProgressRally`

### 按钮

- 官方数量：55
- 缺失数量：16
- 仅有文本/引用命中的条目：16
- 亚顿之影 `CommanderVorazunShadowStalk`
- 亚顿之矛：轨道吸纳舱 `CommanderVorazunSpearofAdunOrbitalAssimilators`
- 暗影军团 `CommanderVorazunShadowGuardIncreasedSpawnCount`
- 光影议会升级包 `CommanderVorazunTwilightCouncilUpgradesPack`
- 新单位：黑暗执政官 `CommanderVorazunUnlockDarkArchon`
- 黑暗圣堂武士升级包 `CommanderVorazunDarkTemplarUpgradesPack`
- 暗影之幕 `CommanderVorazunImprovedShieldRegeneration`
- 亚顿之矛：事件视界 `CommanderVorazunImprovedSpearofAdunBlackhole`
- 黑暗执政官升级包 `CommanderVorazunDarkArchonUpgradesPack`
- 亚顿之矛：时间停止 `CommanderVorazunSpearofAdunTimeStop`
- 黑暗水晶塔：召回 `CommanderVorazunDarkPylonRecall`
- 舰队航标升级包 `CommanderVorazunFleetBeaconUpgradesPack`
- 黑暗圣堂武士召回 `DarkTemplarRecall`
- 亚顿之矛：时空理论 `CommanderVorazunImprovedTimeStop`
- 阴影黯灭 `CommanderVorazunCloakedUnitsDamageBoost`
- 研究共鸣之刃 `AdeptResearchPiercingUpgrade`

## Zagara

- 模块：`XMZagara.SC2Mod`
- 缺失总数：31
- 缺口分类：指挥官进度、按钮

### 指挥官进度

- 官方数量：15
- 缺失数量：14
- 仅有文本/引用命中的条目：14
- 感染空投 `ZagaraUnlockMassRoachDrop`
- 幼虫注射 `ZagaraQueenDoubleInjectLarva`
- 爆蚊升级包 `ZagaraScourgeUpgrades`
- 新单位：胆汁喷射体 `ZagaraUnlockBileLaunchers`
- 跳虫升级包 `ZagaraZerglingUpgrades`
- 爆虫巢穴：哺育腔 `ZagaraBanelingNestSpawner`
- 孕育爆虫和爆蚊 `ZagaraBanelingIncubation`
- 进化腔升级包 `ZagaraAberrationUpgrades`
- 遮天蔽日 `ZagaraImprovedMassRoachDrop`
- 爆虫巢穴升级包 `ZagaraBanelingUpgrades`
- 跳虫进化：裂变虫 `ZagaraZerglingEvo`
- 胆汁喷射体升级包 `ZagaraBileLauncherUpgrades`
- 爆虫进化：分裂虫 `ZagaraBanelingEvo`
- 虫母 `ZagaraImprovedAbilities`

### 按钮

- 官方数量：46
- 缺失数量：17
- 仅有文本/引用命中的条目：17
- 无尽虫群 `CommanderZagaraRelentless`
- 感染空投 `CommanderZagaraMassRoachDrop`
- 幼虫注射 `CommanderZagaraImprovedInjectLarva`
- 爆蚊升级包 `CommanderZagaraScourgeUpgradesPack`
- 新单位：胆汁喷射体 `CommanderZagaraUnlockBileLauncher`
- 跳虫升级包 `CommanderZagaraZerglingUpgradesPack`
- 爆虫巢穴：哺育腔 `CommanderZagaraVolatileBanelingNest`
- 孕育爆虫和爆蚊 `CommanderZagaraIncubateBanelings`
- 进化腔升级包 `CommanderZagaraEvolutionChamberUpgradesPack`
- 遮天蔽日 `CommanderZagaraImprovedMassRoachDrop`
- 爆虫巢穴升级包 `CommanderZagaraBanelingNestUpgradesPack`
- 跳虫进化：裂变虫 `CommanderZagaraZerglingEvolutionSwarmling`
- 胆汁喷射体升级包 `CommanderZagaraBileLauncherUpgradesPack`
- 爆虫进化：分裂虫 `CommanderZagaraBanelingEvolutionSplitterling`
- 虫母 `CommanderZagaraMasterSpawner`
- MoveChampions `MoveChampions`
- AttackChampions `AttackChampions`

## Zeratul

- 模块：`XMZeratul.SC2Mod`
- 缺失总数：30
- 缺口分类：建筑、升级、指挥官进度、技能、按钮

### 建筑

- 官方数量：4
- 缺失数量：1
- 仅有文本/引用命中的条目：1
- 折跃机械台 `RoboticsWarp`

### 升级

- 官方数量：27
- 缺失数量：4
- 仅有文本/引用命中的条目：4
- 撤回阴影 `BacktotheShadows`
- ZeratulCoopEquipmentCostUpgrade `ZeratulCoopEquipmentCostUpgrade`
- ZeratulCoopHeroHalfCostUpgrade `ZeratulCoopHeroHalfCostUpgrade`
- ZeratulCoopMedivacChargesUpgrade `ZeratulCoopMedivacChargesUpgrade`

### 指挥官进度

- 官方数量：15
- 缺失数量：15
- 仅有文本/引用命中的条目：15
- 萨尔纳加之力 `ZeratulPHLevel1`
- 预言成真 `ZeratulPHLevel2`
- 时空通道强化包1 `ZeratulPHLevel3`
- 新单位：萨尔纳加禁绝者 `ZeratulPHLevel4`
- 超维空间技术强化包 `ZeratulPHLevel5`
- 构造体强化包1 `ZeratulPHLevel6`
- 虚空之路 `ZeratulPHLevel7`
- 超能军团 `ZeratulPHLevel8`
- 新单位：萨尔纳加虚空阵列船 `ZeratulPHLevel9`
- 时空理论 `ZeratulPHLevel10`
- 时空通道强化包2 `ZeratulPHLevel11`
- 黑暗代理 `ZeratulPHLevel12`
- 构造体强化包2 `ZeratulPHLevel13`
- 纯粹完美 `ZeratulPHLevel14`
- 纯粹意志 `ZeratulPHLevel15`

### 技能

- 官方数量：27
- 缺失数量：8
- 仅有文本/引用命中的条目：8
- 时空通道强化包1 `ZeratulCalldownOdinTargeted`
- 新单位：萨尔纳加禁绝者 `ZeratulBarracksTrain`
- 超维空间技术强化包 `ZeratulEngineeringBayResearch`
- 构造体强化包1 `ZeratulFactoryTrain`
- 黑暗代理 `ZeratulHeroResearch2`
- 黑暗代理 `ZeratulHeroResearch`
- 构造体强化包2 `ZeratulOdinPlatformResearch`
- 设定集结点 `ProgressRally`

### 按钮

- 官方数量：71
- 缺失数量：2
- 仅有文本/引用命中的条目：2
- DarkTemplarPassive `DarkTemplarPassive`
- DarkArchonPassive `DarkArchonPassive`

