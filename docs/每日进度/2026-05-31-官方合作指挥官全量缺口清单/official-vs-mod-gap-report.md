# 官方合作指挥官全量缺口清单

- 生成时间：2026/6/4 16:29:14
- 官方数据：`D:\MyWork\新建文件夹\mom.report.client\src\MyMod\crys_the_swarm_reborn.SC2Mod\游戏数据\官方合作指挥官\commanders`
- Mod 数据：`D:\MyWork\新建文件夹\mom.report.client\src\MyMod\crys_the_swarm_reborn.SC2Mod\合作指挥官版起义狂潮\Mods\XM`
- 扫描范围：当前 XM 树下全部 XML / TXT / GALAXY 文件，共 793 个
- 判定方式：缺口按官方 JSON 条目 ID 与当前 Mod 中的 `id` 属性做精确比对；同名引用、localized key 和脚本文本命中只作为辅助线索，不视为已实现。
- 说明：这是精确定义扫描底稿，适合作为缺口排查和人工复核底稿，不应直接当作最终玩法收口判定。

## 总览

| 指挥官 | 模块 | 缺失总数 | 主要缺口 |
| --- | --- | ---: | --- |
| Abathur | `XMAbathur.SC2Mod` | 22 | abilities、buttons |
| Alarak | `XMAlarak.SC2Mod` | 28 | units、upgrades、buttons |
| Artanis | `XMArtanis.SC2Mod` | 19 | abilities、buttons |
| Dehaka | `XMDehaka.SC2Mod` | 70 | upgrades、abilities、buttons |
| Fenix | `XMFenix.SC2Mod` | 17 | abilities、buttons |
| Horner | `XMHorner.SC2Mod` | 52 | units、upgrades、abilities、buttons |
| Karax | `XMKarax.SC2Mod` | 23 | abilities、buttons |
| Kerrigan | `XMKerrigan.SC2Mod` | 17 | abilities、buttons |
| Mengsk | `XMMengsk.SC2Mod` | 51 | upgrades、commander_perks、abilities、buttons |
| Nova | `XMNova.SC2Mod` | 78 | units、upgrades、abilities、buttons |
| Raynor | `XMRaynor.SC2Mod` | 74 | units、abilities、buttons |
| Stetmann | `XMStetmann.SC2Mod` | 50 | commander_perks、abilities、buttons |
| Stukov | `XMStukov.SC2Mod` | 47 | units、buildings、upgrades、abilities、buttons |
| Swann | `XMSwann.SC2Mod` | 59 | units、buildings、upgrades、abilities、buttons |
| Tychus | `XMTychus.SC2Mod` | 29 | upgrades、abilities、buttons |
| Vorazun | `XMVorazun.SC2Mod` | 21 | abilities、buttons |
| Zagara | `XMZagara.SC2Mod` | 28 | abilities、buttons |
| Zeratul | `XMZeratul.SC2Mod` | 35 | buildings、upgrades、abilities、buttons |

## Abathur

- 模块：`XMAbathur.SC2Mod`
- 缺失总数：22
- 缺口分类：技能、按钮

### 技能

- 官方数量：28
- 缺失数量：7
- 仅有文本/引用命中的条目：7
- 出地 `BurrowUltraliskUp`
- LocustLaunch `LocustLaunch`
- SwarmHostRootBurrow `MorphToSwarmHostBurrowed`
- 潜地 `BurrowRavagerAbathurDown`
- 吞噬 `ViperConsumeStructure`
- 绑架 `Yoink`
- 寄生弹 `ParasiticBomb`

### 按钮

- 官方数量：51
- 缺失数量：15
- 仅有文本/引用命中的条目：15
- 神经胶原重组 `GlialReconstitutionPassive`
- ZerglingBurrowMove `ZerglingBurrowMove`
- 出地 `BurrowUp`
- 攻击 `AttackBuilding`
- LocustLaunch `LocustLaunch`
- SwarmHostRootBurrow `SwarmHostRootBurrow`
- VilePassive `VilePassive`
- 潜地 `BurrowDown`
- 剧毒细菌 `ViperImprovedCastRangePassive`
- 麻痹勾刺 `ViperAbductImprovedStunPassive`
- 吞噬 `ViperConsume`
- 进化为利维坦 `CommanderPrestigeAbathurLeviathanLocked`
- 寄生弹 `ParasiticBomb`
- AttackGhost `AttackGhost`
- CommanderAbathurBrutaliskSymbiote `CommanderAbathurBrutaliskSymbiote`

## Alarak

- 模块：`XMAlarak.SC2Mod`
- 缺失总数：28
- 缺口分类：兵种、升级、按钮

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

### 按钮

- 官方数量：58
- 缺失数量：26
- 仅有文本/引用命中的条目：26
- 吸收灵魂 `CommanderAlarakStrongestSurvive`
- 强化超载 `CommanderAlarakImprovedStructureOvercharge`
- 进攻战术 `CommanderAlarakImprovedDeadlyCharge`
- 死亡议会升级包 `CommanderAlarakTwilightCouncilUpgradesPack`
- 供奉我 `CommanderAlarakEmpowerMeSlaves`
- 机械研究所升级包 `CommanderAlarakRoboticsBayUpgradesPack`
- 闪电奔涌 `CommanderAlarakLightningStrikes`
- 新单位：晋升者 `CommanderAlarakUnlockAscendant`
- 浩劫升级包 `CommanderAlarakHavocUpgradesPack`
- 召唤死亡舰队 `CommanderAlarakUnlockDeathFleet`
- 超强能量 `CommanderAlarakEmpoweredAOEAttacks`
- 晋升者升级包 `CommanderAlarakTemplarArchivesUpgradesPack`
- 炽热天空 `CommanderAlarakImprovedDeathFleet`
- 阿拉纳克升级包 `CommanderAlarakForgeAlarakUpgrades`
- 高阶领主之怒 `CommanderAlarakSupplicantSacrificeCDR`
- 折跃晋升者 `WarpinAscendentLocked`
- 折跃黑暗执政官 `WarpInDarkArchonLocked`
- 混乱调和 `ResearchAlarakHighTemplarPsionicOrbTravelDistancePassive`
- 攻击 `AttackBuilding`
- 鲜血护盾 `PHSupplicantShieldArmor`
- 研究重构 `ResearchReconstructionLocked`
- 研究充能利刃 `ResearchFenixKaldalisZealotCleaveLocked`
- 研究回收 `ResearchReclamationLocked`
- 战争配置 `TaldarimWarpConduit`
- 装载 `WarpPrismLoad`
- 全部卸载 `WarpPrismUnloadAll`

## Artanis

- 模块：`XMArtanis.SC2Mod`
- 缺失总数：19
- 缺口分类：技能、按钮

### 技能

- 官方数量：27
- 缺失数量：3
- 仅有文本/引用命中的条目：3
- 高阶执政官 `FeedbackArchon`
- 监察模式 `ObserverMorphtoObserverSiege`
- MorphBackToRoboticsFacility `MorphBackToRoboticsFacility`

### 按钮

- 官方数量：68
- 缺失数量：16
- 仅有文本/引用命中的条目：16
- 能量反蚀 `FeedbackLocked`
- 灵能风暴 `PsionicStormLocked`
- 折跃晋升者 `WarpinAscendentLocked`
- 折跃黑暗执政官 `WarpInDarkArchonLocked`
- 暗影光炮 `ShadowCannonLocked`
- HaveAnionPulseCrystals `HaveAnionPulseCrystals`
- 攻击 `AttackBuilding`
- 研究物质散化 `ResearchAlarakVanguardIncreaseSplashAreaLocked`
- 神器强化：原力炮 `ResearchZeratulImmortalRange`
- 研究净化轰击 `ResearchFenixWarbringerColossusPowerShotLocked`
- 超级机械折跃台 `SuperiorWarpRoboticsFacilities`
- MorphBackToRoboticsFacility `MorphBackToRoboticsFacility`
- 研究重构 `ResearchReconstructionLocked`
- 研究充能利刃 `ResearchFenixKaldalisZealotCleaveLocked`
- 研究回收 `ResearchReclamationLocked`
- 旋风斩 `WhirlwindLocked`

## Dehaka

- 模块：`XMDehaka.SC2Mod`
- 缺失总数：70
- 缺口分类：升级、技能、按钮

### 升级

- 官方数量：17
- 缺失数量：5
- 仅有文本/引用命中的条目：5
- DehakaLevel02Tooltips `DehakaLevel02Tooltips`
- DehakaLevel06Tooltips `DehakaLevel06Tooltips`
- DehakaLevel08Tooltips `DehakaLevel08Tooltips`
- DehakaLevel11Tooltips `DehakaLevel11Tooltips`
- DehakaPrimalBossUpgrades `DehakaPrimalBossUpgrades`

### 技能

- 官方数量：61
- 缺失数量：6
- 仅有文本/引用命中的条目：6
- 采集 `DroneHarvest`
- 召唤建筑 `255`
- 喷漆 `SprayZerg`
- 设定工蜂集结点 `RallyCommand`
- DehakaLocustFlyingSwoop `DehakaLocustFlyingSwoop`
- 野蛮冲锋 `KraithCrashingCharge`

### 按钮

- 官方数量：138
- 缺失数量：59
- 仅有文本/引用命中的条目：45
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
- 深槽虫道 `DehakaDeepTunnelLocked`
- 进化原始恢复 `EvolveDehakaPrimalRegenerationLocked`
- 进化敏锐感官 `EvolveDehakaKeenSensesLocked`
- 进化骨板 `EvolveDehakaChitinousPlatingLocked`
- 进化致命触击 `EvolveDehakaReachingtheSkyLocked`
- AttackWorker `AttackWorker`
- 采集 `GatherZerg`
- 返还资源 `ReturnCargo`
- 设定工蜂集结点 `RallySCV`
- PrimalBuildingUproot `PrimalBuildingUproot`
- 攻击 `AttackBuilding`
- 设定集结点 `SetRallyPoint2`
- DehakaLocustFlyingSwoop `DehakaLocustFlyingSwoop`
- 易燃酸液 `GlevigFireBreathLocked`
- 进化溶解强酸 `EvolveDissolvingAcidLocked`
- 进化膨胀腮腺 `EvolveEnlargedParotidGlandsLocked`
- 进化汇聚烈焰 `EvolveConcentratedFireLocked`
- 进化暴捶 `EvolveTenderizeLocked`
- 切割之爪 `EvolveSlicingGlaveLocked`
- 进化变换甲壳 `EvolveShiftingCarapaceLocked`
- 进化原始重组 `EvolvePrimalReconstitutionLocked`
- 进化爆裂孢子 `EvolveExplosiveSporesLocked`
- 进化原始狂怒 `EvolvePrimordialFuryLocked`
- 进化空中爆囊 `EvolveAerialBurstSacsLocked`
- 野蛮冲锋 `DakrunCrashingCharge`
- 大型尖刺厚皮 `DakrunGreaterSpikedHideLocked`
- 进化穿刺打击 `EvolveImpalingStrikeLocked`
- 进化尖刺弹幕 `EvolveBarrageofSpikesLocked`
- 进化暴龙的保护 `EvolveTyrantsProtectionLocked`
- 原始战斗 `PrimalCombatPrimalMutaliskLocked`
- 原始战斗 `PrimalCombatPrimalImpalerLocked`
- 潜地 `BurrowDown`
- 胆汁喷流 `BileStreamLocked`
- 潜地 `SwarmHostBurrowDown`
- 极速再生 `RapidRegeneration`
- 原始战斗 `PrimalCombatPrimalIgniterLocked`
- 原始战斗 `PrimalCombatPrimalGuardianLocked`
- 原始战斗 `PrimalCombatPrimalCreeperHostLocked`
- 原始战斗 `PrimalCombatTyrannozorLocked`
- 尖刺弹幕 `BarrageofSpikesLocked`
- 原始战斗 `PrimalCombatRavasaurLocked`
- ImpalerBurrowDown `ImpalerBurrowDown`

## Fenix

- 模块：`XMFenix.SC2Mod`
- 缺失总数：17
- 缺口分类：技能、按钮

### 技能

- 官方数量：21
- 缺失数量：3
- 仅有文本/引用命中的条目：3
- 监察模式 `ObserverMorphtoObserverSiege`
- 屏障 `ImmortalOverload`
- 制造拦截机 `CarrierHangar`

### 按钮

- 官方数量：61
- 缺失数量：14
- 仅有文本/引用命中的条目：14
- 共鸣之刃 `AdeptPiercingUpgrade`
- 折跃晋升者 `WarpinAscendentLocked`
- 折跃黑暗执政官 `WarpInDarkArchonLocked`
- 攻击 `AttackBuilding`
- 研究物质散化 `ResearchAlarakVanguardIncreaseSplashAreaLocked`
- 神器强化：原力炮 `ResearchZeratulImmortalRange`
- 研究净化轰击 `ResearchFenixWarbringerColossusPowerShotLocked`
- 研究重构 `ResearchReconstructionLocked`
- 研究充能利刃 `ResearchFenixKaldalisZealotCleaveLocked`
- 研究回收 `ResearchReclamationLocked`
- 重构 `ReconstructionLocked`
- 刚毅护盾 `HardenedShield`
- 屏障 `ImmortalOverload`
- 引力弹射 `GravitonCatapult`

## Horner

- 模块：`XMHorner.SC2Mod`
- 缺失总数：52
- 缺口分类：兵种、升级、技能、按钮

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

### 技能

- 官方数量：27
- 缺失数量：14
- 仅有文本/引用命中的条目：14
- 新单位：攻击战斗机 `HHBuild`
- 雇佣兵升级包 `HHMercCompoundResearch`
- 呼叫舰队 `HornerAirFleetActivate`
- 呼叫舰队 `HornerAirFleetTargetingDummy`
- 空间站调度 `HHSummonMercenarySpaceStation`
- 战术跳跃 `HHBattlecruiserHyperjump`
- 恶蝠模式 `MorphToHHHellionTank`
- 恶火模式 `MorphToHHHellion`
- 启动消音模式 `HHRavenMorphtoHHRavenSiege`
- 喷气背包 `255`
- 机甲模式 `HHAssaultMode`
- 激活地雷 `HHWidowMineBurrow`
- WraithCloakOff `HHWraithCloak`
- 防卫模式 `LiberatorAGTarget`

### 按钮

- 官方数量：51
- 缺失数量：26
- 仅有文本/引用命中的条目：26
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
- 我的另一半 `HHMSOHealth`
- 恶火模式 `MorphToHHHellion`
- 启动消音模式 `MorphtoHHRavenSiege`
- 喷气背包 `JetPack`
- LE9型集束炸弹 `HHReaperClusterBombs`
- HHVikingMorphSpeed `HHVikingMorphSpeed`
- 机甲模式 `AssaultMode`
- 激活地雷 `WidowMineBurrow`
- WraithCloakOff `WraithCloakOff`
- 强化弹道 `LiberatorAGRangeUpgrade`
- 防卫模式 `LiberatorAGMode`

## Karax

- 模块：`XMKarax.SC2Mod`
- 缺失总数：23
- 缺口分类：技能、按钮

### 技能

- 官方数量：21
- 缺失数量：4
- 仅有文本/引用命中的条目：4
- 监察模式 `ObserverMorphtoObserverSiege`
- 引力光束 `MirageGravitonBeamVoidCampaign`
- 恢复 `ShieldBatteryRechargeChanneled`
- 制造拦截机 `CarrierHangar`

### 按钮

- 官方数量：66
- 缺失数量：19
- 仅有文本/引用命中的条目：19
- 折跃晋升者 `WarpinAscendentLocked`
- 折跃黑暗执政官 `WarpInDarkArchonLocked`
- 暗影光炮 `ShadowCannonLocked`
- 阴离子脉冲水晶 `AnionPulseCrystal`
- 攻击 `AttackBuilding`
- 强固屏障 `StructureBarrierLocked`
- 研究太阳能利用率等级3 `ResearchSolarEfficiencyLevel3Locked`
- 研究强化修理系统 `ResearchSOARepairBeamExtraTargetLocked`
- 研究相位爆裂 `ResearchSOAOrbitalStrikeUpgradeLocked`
- 研究太阳耀斑 `ResearchSOASolarLanceUpgradeLocked`
- 太阳能利用率等级3 `SolarEfficiencyPassiveLevel3`
- 强化修理系统 `SOARepairBeamExtraTargetPassive`
- 太阳耀斑 `SOASolarLanceUpgradePassive`
- 研究重构 `ResearchReconstructionLocked`
- 研究充能利刃 `ResearchFenixKaldalisZealotCleaveLocked`
- 研究回收 `ResearchReclamationLocked`
- 重构 `ReconstructionLocked`
- 悬崖攀越 `CliffWalk`
- 引力弹射 `GravitonCatapult`

## Kerrigan

- 模块：`XMKerrigan.SC2Mod`
- 缺失总数：17
- 缺口分类：技能、按钮

### 技能

- 官方数量：28
- 缺失数量：3
- 仅有文本/引用命中的条目：3
- 潜地 `BurrowUltraliskDown`
- 出地 `BurrowUltraliskUp`
- MorphToBaneling `MorphToBaneling`

### 按钮

- 官方数量：61
- 缺失数量：14
- 仅有文本/引用命中的条目：14
- 孔状软骨 `BroodlordSpeed`
- 变异为潜伏者 `BuildLurkerLocked`
- 潜地 `BurrowDown`
- 出地 `BurrowUp`
- 狂暴 `FrenzyLocked`
- 肌腱扩增 `MuscularAugmentsCoop`
- 削铁刃虫 `SeveringGlave`
- 召唤坑道虫 `SummonNydusWorm`
- 召唤虫道毁灭者 `SummonNydusCanalAttacker`
- 召唤菌塔 `SummonNydusCanalCreeper`
- 设定集结点 `SetRallyPoint`
- 装载 `NydusCanalLoad`
- 钻地鳞片 `NydusWormIncreasedArmorPassive`
- 攻击 `AttackBuilding`

## Mengsk

- 模块：`XMMengsk.SC2Mod`
- 缺失总数：51
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
- 缺失数量：4
- 仅有文本/引用命中的条目：4
- 喷漆 `SprayTerran`
- 升级为行星要塞 `UpgradeToPlanetaryFortress`
- 攻击 `AttackRedirect`
- 掩护射击模式 `ThorMengskSiegeTargeted`

### 按钮

- 官方数量：145
- 缺失数量：26
- 仅有文本/引用命中的条目：10
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
- 建造高级建筑 `TerranBuildAdvanced`
- 暂停 `Halt`
- 升级为行星要塞 `UpgradeToPlanetaryFortress`
- 攻击 `AttackRedirect`
- 攻击 `AttackBuilding`
- 回收 `Salvage`
- 装载 `MedivacLoad`
- 全部卸载 `MedivacUnloadAll`
- 攻击 `AttackBuildingWithoutSimpleCommandCard`

## Nova

- 模块：`XMNova.SC2Mod`
- 缺失总数：78
- 缺口分类：兵种、升级、技能、按钮

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

### 技能

- 官方数量：45
- 缺失数量：15
- 仅有文本/引用命中的条目：14
- 高级隐形力场 `255`
- TechReactorAI `BarracksAddOns`
- 升空 `BarracksLiftOff`
- 停火 `GhostHoldFire`
- 自由射击 `GhostWeaponsFree`
- 战术聚变打击 `TacNukeStrike`
- 稳定瞄准 `ChannelSnipe`
- EMP弹 `EMP`
- MagrailMunitions `MagrailMunitionsMarauder`
- 超级强化剂 `SuperStimpackMarine`
- 高级建造 `AdvancedConstructionAuto`
- 建造磁轨炮塔 `TerranBuildFullRefund`
- 瓦斯采集器 `VespeneDroneCast`
- 升级为行星要塞 `UpgradeToPlanetaryFortress`
- 设定集结点 `RallyCommand`

### 按钮

- 官方数量：102
- 缺失数量：52
- 仅有文本/引用命中的条目：51
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
- 暂停 `Halt`
- 升空 `Lift`
- MengskUnits `MengskUnits`
- 研究卡度休斯反应堆 `ResearchCaduceusReactorLocked`
- 研究作战效能 `ResearchOperationalEfficiencyLocked`
- 研究狱火爆弹 `ResearchInfernalProjectilesLocked`
- AttackGhost `AttackGhost`
- PermanentlyCloakedGhost `PermanentlyCloakedGhost`
- 停火 `GhostHoldFire`
- 自由射击 `WeaponsFree`
- 战术聚变打击 `NukeCalldown`
- 稳定瞄准 `ChannelSnipe`
- EMP弹 `EMP`
- 隐形 `CloakOnGhost`
- 取消隐形 `CloakOff`
- 智能伺服器 `MAFServosLiberator`
- 压制弹 `SuperConcussiveShells`
- MagrailMunitions `MagrailMunitions`
- CombatShield `CombatShield`
- 超级强化剂 `MarineSuperStimpack`
- LaserTargetingSystemMarine `LaserTargetingSystemMarine`
- 隐秘检伤 `RavenBioMechanicalRepairDroneCloakedHealBeam`
- 攻击 `AttackBuilding`
- HellstormMissileBatteries `HellstormMissileBatteries`
- 回收 `Salvage`
- AttackWorker `AttackWorker`
- 兵营已禁用 `SwannBarracks`
- 返还资源 `ReturnCargo`
- 高级建造 `AdvancedConstructionAuto`
- 高级建造 `AdvancedConstructionLocked`
- 建造磁轨炮塔 `BuildLaserTurret`
- 建造聚变芯体 `BuildFusionCoreLocked`
- 瓦斯采集器 `VespeneDrone`
- 升级为行星要塞 `UpgradeToPlanetaryFortress`
- 装载 `CommandCenterLoad`
- 全部卸载 `CommandCenterUnloadAll`

## Raynor

- 模块：`XMRaynor.SC2Mod`
- 缺失总数：74
- 缺口分类：兵种、技能、按钮

### 兵种

- 官方数量：10
- 缺失数量：1
- 仅有文本/引用命中的条目：1
- 攻城坦克 `Siege Tank`

### 技能

- 官方数量：44
- 缺失数量：23
- 仅有文本/引用命中的条目：23
- TechReactorAI `BarracksAddOns`
- 升空 `BarracksLiftOff`
- 降下 `SupplyDepotLower`
- 攻击 `AttackRedirect`
- 使用强化剂 `StimpackMarauderRedirect`
- 装载 `BunkerTransport`
- SalvageEffect `SalvageEffect`
- 255 `255`
- 使用强化剂 `StimpackMarauder`
- 高级建造 `AdvancedConstructionAuto`
- 建造磁轨炮塔 `TerranBuildFullRefund`
- 瓦斯采集器 `VespeneDroneCast`
- 升级为行星要塞 `UpgradeToPlanetaryFortress`
- 设定集结点 `RallyCommand`
- 轨道空投：额外补给 `SupplyDrop`
- 析象扫描 `ScannerSweep`
- 升空 `OrbitalLiftOff`
- 空投：补给站 `OrbitalCommandSupplyDepotDrop`
- HyperjumpNoVision `HyperjumpNoVision`
- BattlecruiserStop `BattlecruiserStop`
- BattlecruiserMove `BattlecruiserMove`
- BattlecruiserAttack `BattlecruiserAttack`
- 攻城模式 `SiegeMode`

### 按钮

- 官方数量：91
- 缺失数量：50
- 仅有文本/引用命中的条目：50
- 快速招募 `CommanderRaynorInfantrySpecialist`
- 女妖空袭 `CommanderRaynorBansheeAirStrike`
- 纳米投射器 `CommanderRaynorFirebatandMedicRange`
- 步兵升级包 `CommanderRaynorInfantryUpgradePack`
- 休伯利安号：定点防御无人机 `CommanderRaynorHyperionAbility`
- 新单位：战列巡航舰 `CommanderRaynorUnlockBattlecruiser`
- 战斗地堡 `CommanderRaynorEngineeringBayUpgradePack`
- 轨道空投 `CommanderRaynorOrbitalDropPods`
- 重工厂升级包 `CommanderRaynorFactoryUpgradePack`
- 钒合金板 `CommanderRaynorArmorVanadiumPH`
- 军械库升级包 `CommanderRaynorAdditionalArmoryUpgrades`
- 轨道空投补给站 `CommanderRaynorOrbitalDepots`
- 星港升级包 `CommanderRaynorStarportUpgradePack`
- 休伯利安号：高级瞄准系统 `CommanderRaynorHyperionAdvancedTargetingSystems`
- 佣兵军火 `CommanderRaynorImprovedInfantryWeapons`
- TechReactorAI `TechReactorAI`
- 暂停 `Halt`
- 升空 `Lift`
- MengskUnits `MengskUnits`
- 降下 `Lower`
- 攻击 `AttackRedirect`
- FortifiedBunker `FortifiedBunker`
- 设定地堡集结点 `SetBunkerRallyPoint`
- 使用强化剂 `StimRedirect`
- 装载 `BunkerLoad`
- 全部卸载 `BunkerUnloadAll`
- 攻击 `AttackBuilding`
- HellstormMissileBatteries `HellstormMissileBatteries`
- 回收 `Salvage`
- 使用强化剂 `StimMarauder`
- AttackWorker `AttackWorker`
- 兵营已禁用 `SwannBarracks`
- 返还资源 `ReturnCargo`
- 高级建造 `AdvancedConstructionAuto`
- 高级建造 `AdvancedConstructionLocked`
- 建造磁轨炮塔 `BuildLaserTurret`
- 建造聚变芯体 `BuildFusionCoreLocked`
- 隐形 `CloakOnBanshee`
- 取消隐形 `CloakOff`
- 瓦斯采集器 `VespeneDrone`
- 升级为行星要塞 `UpgradeToPlanetaryFortress`
- 装载 `CommandCenterLoad`
- 全部卸载 `CommandCenterUnloadAll`
- 震荡弹 `ConcussiveGrenade`
- 轨道空投：额外补给 `SupplyDrop`
- 析象扫描 `Scan`
- 空投：补给站 `OrbitalCommandCalldownSupplyDepot`
- 大和炮 `YamatoGun`
- 永生程序 `CommanderSwannImmortalityProtocol`
- 攻城模式 `SiegeMode`

## Stetmann

- 模块：`XMStetmann.SC2Mod`
- 缺失总数：50
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
- 缺失数量：7
- 仅有文本/引用命中的条目：7
- 采集 `DroneHarvest`
- 基础变异 `255`
- 喷漆 `SprayZerg`
- RallyBlock `RallyBlock`
- 停火 `LurkerHoldFire`
- 取消停火 `LurkerRemoveHoldFire`
- 准备机械巢虫 `BroodLordStetmannBroodlingEscortArmAugment`

### 按钮

- 官方数量：159
- 缺失数量：33
- 仅有文本/引用命中的条目：19
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
- RallyBlock `RallyBlock`
- 取消 `CancelMutateMorph`
- 回收机械感染者 `InfestorStetmannRespawnLocked`
- 攻击 `AttackBuilding`
- StetmannStetzoneAbsorption `StetmannStetzoneAbsorption`
- MoveChampions `MoveChampions`
- AttackChampions `AttackChampions`
- 潜地 `BurrowDown`
- 关闭对建筑攻击 `DisableBuildingAttack`
- LurkerBurrowDown `LurkerBurrowDown`
- 停火 `LurkerHoldFire`
- 取消停火 `LurkerCancelHoldFire`
- 出地 `LurkerBurrowUp`
- 潜地 `BurrowMove`

## Stukov

- 模块：`XMStukov.SC2Mod`
- 缺失总数：47
- 缺口分类：兵种、建筑、升级、技能、按钮

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

### 技能

- 官方数量：33
- 缺失数量：2
- 仅有文本/引用命中的条目：2
- 设定集结点 `RallyCommand`
- 装载 `CommanderPrestigeStukovBansheeTransport`

### 按钮

- 官方数量：74
- 缺失数量：23
- 仅有文本/引用命中的条目：21
- 新单位：虫巢女王 `CommanderStukovQueenClassic`
- 易燃外肢 `CommanderStukovApocaliskUpgraded`
- 虫巢女王升级包 `CommanderStukovQueenClassicUpgradeCache`
- 升级步兵护甲等级3 `TerranInfantryArmorLevel3`
- 研究再生型钢板 `ResearchRegenerativePlatingLocked`
- 进化钙化装甲 `EvolveCalcifiedArmorLocked`
- 暂停 `Halt`
- 升级战车及舰船钢板等级3 `TerranVehicleAndShipPlatingLevel3`
- AttackWorker `AttackWorker`
- 潜地 `BurrowDown`
- 进化3级感染 `EvolveInfestationLevel3Locked`
- 进化巢虫育生 `EvolveBroodlingGestationLocked`
- 进化入侵繁殖 `EvolveAggressiveIncubationLocked`
- 全部卸载 `CommandCenterUnloadAll`
- 攻击 `AttackBuilding`
- 孵化虫巢女王 `SpawnBroodQueenLocked`
- 降下 `Lower`
- 停止排放菌毯 `StopGenerateCreep`
- MoveChampions `MoveChampions`
- AttackChampions `AttackChampions`
- 取消隐形 `CloakOff`
- 装载 `CommanderPrestigeStukovBansheeTransportLoad`
- 全部卸载 `SIBansheeUnloadAll`

## Swann

- 模块：`XMSwann.SC2Mod`
- 缺失总数：59
- 缺口分类：兵种、建筑、升级、技能、按钮

### 兵种

- 官方数量：9
- 缺失数量：2
- 仅有文本/引用命中的条目：2
- 恶蝠 `Hellbat`
- 攻城坦克 `Siege Tank`

### 建筑

- 官方数量：6
- 缺失数量：1
- 德拉肯激光钻机 `MiniDrakkenLaserDrill`

### 升级

- 官方数量：25
- 缺失数量：10
- 仅有文本/引用命中的条目：10
- AdvancedConstruction `AdvancedConstruction`
- 精通 斯旺 建筑生命值 `MasterySwannBuildingHealth`
- 精通 斯旺 战斗空投 `MasterySwannCombatDrop`
- 精通 斯旺 永生程序 `MasterySwannImmortalityProtocol`
- 精通 斯旺 激光钻机建造时间 `MasterySwannLaserDrillBuildTime`
- 精通 斯旺 瓦斯采集器消耗 `MasterySwannVespeneHarvesterCost`
- Swann Commander Immortality Protocol `SwannCommanderImmortalityProtocol`
- Swann Commander Vehicle Health `SwannCommanderVehicleHealth`
- Swann Commander Worker Free Repairs `SwannCommanderWorkerFreeRepairs`
- Swann Turret Upgrades `SwannKelMorianTurretUpgrades`

### 技能

- 官方数量：34
- 缺失数量：16
- 仅有文本/引用命中的条目：16
- 战斗空投 `SpecialDelivery`
- 瓦斯采集器 `VespeneDroneCast`
- 重工厂升级包 `330mmBarrageCannons`
- 星港升级包 `DefensiveMatrixTarget`
- 锁定 `LockOn`
- 取消 `LockOnCancel`
- 战术跳跃 `CommanderPrestigeSwannHerculesScienceVesselTacticalJump`
- ScienceVesselNanoRepairDouble `ScienceVesselNanoRepairDouble`
- VoidScienceVesselNanoRepair `VoidScienceVesselNanoRepair`
- 降下 `SupplyDepotLower`
- 255 `255`
- 高级建造 `AdvancedConstructionAuto`
- 建造磁轨炮塔 `TerranBuildFullRefund`
- 升级为行星要塞 `UpgradeToPlanetaryFortress`
- 设定集结点 `RallyCommand`
- 攻城模式 `SiegeMode`

### 按钮

- 官方数量：79
- 缺失数量：30
- 仅有文本/引用命中的条目：30
- 永生程序 `CommanderSwannImmortalityProtocol`
- 锁定 `LockOn`
- 取消 `LockOnCancel`
- 研究地狱火预燃器 `ResearchHighCapacityBarrels`
- 地狱火装甲 `HellArmor`
- 战术跳跃 `HyperjumpHercules`
- 快速部署 `RapidDeploymentHercules`
- 防御矩阵 `DefensiveMatrixTarget`
- 强化纳米修复 `ImprovedNanoRepair`
- MoveChampions `MoveChampions`
- AttackChampions `AttackChampions`
- 降下 `Lower`
- 暂停 `Halt`
- 震荡榴弹 `KelMorianGrenadeTurretConcussiveGrenades`
- 回收 `Salvage`
- 攻击 `AttackBuilding`
- HellstormMissileBatteries `HellstormMissileBatteries`
- 脉冲增幅器 `ImprovedBurstLaser`
- AttackWorker `AttackWorker`
- 兵营已禁用 `SwannBarracks`
- 返还资源 `ReturnCargo`
- 高级建造 `AdvancedConstructionAuto`
- 高级建造 `AdvancedConstructionLocked`
- 建造磁轨炮塔 `BuildLaserTurret`
- 建造聚变芯体 `BuildFusionCoreLocked`
- 瓦斯采集器 `VespeneDrone`
- 升级为行星要塞 `UpgradeToPlanetaryFortress`
- 装载 `CommandCenterLoad`
- 全部卸载 `CommandCenterUnloadAll`
- 攻城模式 `SiegeMode`

## Tychus

- 模块：`XMTychus.SC2Mod`
- 缺失总数：29
- 缺口分类：升级、技能、按钮

### 升级

- 官方数量：20
- 缺失数量：3
- 仅有文本/引用命中的条目：3
- CommanderPrestigeTychusLoneWolfRecruitment `CommanderPrestigeTychusLoneWolfRecruitment`
- 指挥官 - 人类 - 泰凯斯 `TychusCommander`
- TychusCoopFifthHeroUpgrade `TychusCoopFifthHeroUpgrade`

### 技能

- 官方数量：58
- 缺失数量：4
- 仅有文本/引用命中的条目：4
- 使用强化剂 `StimpackMarauder`
- 震荡弹 `255`
- 88式劝服者 `TychusGhostSnipe`
- 喷漆 `SprayTerran`

### 按钮

- 官方数量：122
- 缺失数量：22
- 仅有文本/引用命中的条目：22
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
- 使用强化剂 `StimMarauder`
- 震荡弹 `ConcussiveGrenade`
- AttackChampions `AttackChampions`
- 暂停 `Halt`
- AttackWorker `AttackWorker`
- 采集 `GatherTerr`
- 返还资源 `ReturnCargo`

## Vorazun

- 模块：`XMVorazun.SC2Mod`
- 缺失总数：21
- 缺口分类：技能、按钮

### 技能

- 官方数量：23
- 缺失数量：7
- 仅有文本/引用命中的条目：7
- 黑暗圣堂武士升级包 `DarkTemplarVoidStasis`
- DarkTemplarShadowFury `DarkTemplarShadowFury`
- 天启 `OracleRevelation`
- 静滞结界 `OracleStasisTrapBuild`
- 激活脉冲光线 `OracleWeapon`
- 干扰网 `CorsairMPDisruptionWeb`
- 校准棱镜 `VoidRaySwarmDamageBoost`

### 按钮

- 官方数量：55
- 缺失数量：14
- 仅有文本/引用命中的条目：14
- 闪现 `ShadowDashLocked`
- 虚空静滞 `VoidStasisLocked`
- 折跃晋升者 `WarpinAscendentLocked`
- 折跃黑暗执政官 `WarpInDarkArchonLocked`
- 天启 `OracleRevelation`
- 激活脉冲光线 `OracleWeaponOn`
- 永久隐形 `PermanentlyCloakedOracle`
- 干扰网 `CorsairMPDisruptionWeb`
- 攻击 `AttackBuilding`
- 研究重构 `ResearchReconstructionLocked`
- 研究充能利刃 `ResearchFenixKaldalisZealotCleaveLocked`
- 研究回收 `ResearchReclamationLocked`
- 旋风斩 `WhirlwindLocked`
- 校准棱镜 `VoidRaySwarmDamageBoost`

## Zagara

- 模块：`XMZagara.SC2Mod`
- 缺失总数：28
- 缺口分类：技能、按钮

### 技能

- 官方数量：23
- 缺失数量：5
- 仅有文本/引用命中的条目：5
- 爆蚊升级包 `ScourgeDetonate`
- 潜地 `BurrowUltraliskDown`
- 出地 `BurrowUltraliskUp`
- 变异为巢虫领主 `MorphToBroodLord`
- MorphToBaneling `MorphToBaneling`

### 按钮

- 官方数量：46
- 缺失数量：23
- 仅有文本/引用命中的条目：23
- 无尽虫群 `CommanderZagaraRelentless`
- 感染空投 `CommanderZagaraMassRoachDrop`
- 幼虫注射 `CommanderZagaraImprovedInjectLarva`
- 爆蚊升级包 `CommanderZagaraScourgeUpgradesPack`
- 新单位：胆汁喷射体 `CommanderZagaraUnlockBileLauncher`
- 爆虫巢穴：哺育腔 `CommanderZagaraVolatileBanelingNest`
- 孕育爆虫和爆蚊 `CommanderZagaraIncubateBanelings`
- 进化腔升级包 `CommanderZagaraEvolutionChamberUpgradesPack`
- 遮天蔽日 `CommanderZagaraImprovedMassRoachDrop`
- 爆虫巢穴升级包 `CommanderZagaraBanelingNestUpgradesPack`
- 跳虫进化：裂变虫 `CommanderZagaraZerglingEvolutionSwarmling`
- 胆汁喷射体升级包 `CommanderZagaraBileLauncherUpgradesPack`
- 爆虫进化：分裂虫 `CommanderZagaraBanelingEvolutionSplitterling`
- 虫母 `CommanderZagaraMasterSpawner`
- 开启对建筑攻击 `EnableBuildingAttack`
- 潜地 `BurrowDown`
- 出地 `BurrowUp`
- 腐化 `CorruptionAbility`
- 剧毒孢子 `ScourgeSplashDamagePassive`
- 引爆 `DetonateScourge`
- 攻击 `AttackBuilding`
- MoveChampions `MoveChampions`
- AttackChampions `AttackChampions`

## Zeratul

- 模块：`XMZeratul.SC2Mod`
- 缺失总数：35
- 缺口分类：建筑、升级、技能、按钮

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

### 技能

- 官方数量：27
- 缺失数量：9
- 仅有文本/引用命中的条目：9
- 萨尔纳加之力 `RallyZeratulTopBarRedirect`
- 时空通道强化包1 `ZeratulCalldownOdinTargeted`
- 新单位：萨尔纳加禁绝者 `ZeratulBarracksTrain`
- 超维空间技术强化包 `ZeratulEngineeringBayResearch`
- 构造体强化包1 `ZeratulFactoryTrain`
- 黑暗代理 `ZeratulHeroResearch2`
- 黑暗代理 `ZeratulHeroResearch`
- 构造体强化包2 `ZeratulOdinPlatformResearch`
- 监察模式 `ObserverMorphtoObserverSiege`

### 按钮

- 官方数量：71
- 缺失数量：21
- 仅有文本/引用命中的条目：21
- 萨尔纳加之力 `CommanderZeratulLevel01`
- 预言成真 `CommanderZeratulLevel02`
- 时空通道强化包1 `CommanderZeratulLevel03`
- 新单位：萨尔纳加禁绝者 `CommanderZeratulLevel04`
- 超维空间技术强化包 `CommanderZeratulLevel05`
- 构造体强化包1 `CommanderZeratulLevel06`
- 虚空之路 `CommanderZeratulLevel07`
- 超能军团 `CommanderZeratulLevel08`
- 新单位：萨尔纳加虚空阵列船 `CommanderZeratulLevel09`
- 时空理论 `CommanderZeratulLevel10`
- 时空通道强化包2 `CommanderZeratulLevel11`
- 黑暗代理 `CommanderZeratulLevel12`
- 构造体强化包2 `CommanderZeratulLevel13`
- 纯粹完美 `CommanderZeratulLevel14`
- 纯粹意志 `CommanderZeratulLevel15`
- DarkTemplarPassive `DarkTemplarPassive`
- DarkArchonPassive `DarkArchonPassive`
- 折跃晋升者 `WarpinAscendentLocked`
- 折跃黑暗执政官 `WarpInDarkArchonLocked`
- 攻击 `AttackBuilding`
- 预判闪现 `PredictiveBlinkPassive`

