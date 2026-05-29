# Active old line 顶部面板链路审计

生成时间：2026-05-29T09:33:29.227Z

## 结论

- 口径：只看 `合作指挥官版起义狂潮` 的顶部全局施法面板链路，不看建筑/单位生产命令卡。
- 检查链路：`XMFinal` 初始化的隐藏 caster -> `XMCore.CU_GPInit` 路由 -> UI command panel 模板 -> caster `AbilArray/CardLayouts` -> ability/button/requirement Catalog。
- `静态链路已接` 代表按钮静态可见链路闭合；目标模式、施法 actor、实际效果落地仍需进图验证。

## 总表

| 指挥官 | 隐藏 caster | 路由 | UI 模板/槽位 | 第 0 行主动按钮 | 异常 | 状态 |
|---|---|---|---|---|---|---|
| 阿巴瑟 | CoopCasterAbathur | 已路由:CU_GPInitAbathur | Coop_GlobalCastingTemplates/ZergGlobalCommandPanelTemplate / 2 | 孵化剧毒巢穴:SpawnToxicNest,Build1<br>愈合:AbathurMend,Execute | 无 | 静态链路已接 |
| 阿巴瑟Reborn | CoopCasterAbathurReborn | 已路由:CU_GPInitAbathur | Coop_GlobalCastingTemplates/ZergGlobalCommandPanelTemplate / 2 | 孵化剧毒巢穴:SpawnToxicNest,Build1<br>愈合:AbathurRebornMend,Execute | 无 | 静态链路已接 |
| 阿拉纳克 | CoopCasterAlarak | 已路由:CU_GPInitAlarak | Coop_GlobalCastingTemplates/AlarakGlobalCommandPanelTemplate / 2 | 建筑超载:AlarakStructureOvercharge,Execute<br>召唤死亡舰队:AlarakACSummonDeathfleetTarget,Execute | 无 | 静态链路已接 |
| 阿塔尼斯 | SoACasterArtanis | 已路由:CU_GPInitProtoss | LotV_SoAMissionUIPanel/SoACommandPanelTemplate / 4 | 投射能量场:SOAPylonPower,Execute<br>轨道轰炸:SOAOrbitalStrikeActivate,On<br>护盾超载:CommanderPrestigeArtanisOrbitalStrikeShieldOverchargeTargeted,Execute<br>护盾超载:SoASuperShield,Execute<br>太阳轰炸:SOAStrafeAttack,Execute | 非第0行主动按钮 2 | 静态链路已接 |
| 德哈卡 | CoopCasterDehaka | 已路由:CU_GPInitDehaka | Coop_GlobalCastingTemplates/DehakaGlobalCommandPanelTemplate / 4 | 召唤大型原始蠕虫:DehakaNydusDestroyerTopBarDummy,Execute<br>召唤大型原始蠕虫:DehakaNydusDestroyerTopBar,Build1<br>召唤格里维格:DehakaGlevigTopBar,Build1<br>召唤穆尔瓦:DehakaMurvarTopBar,Execute<br>召唤达克伦:DehakaDakrunTopBar,Execute | 无 | 静态链路已接 |
| 菲尼克斯 | SoACasterFenix | 已路由:CU_GPInitFenix | Coop_TopBar_Fenix/FenixGlobalCasterCommandPanelTemplate / 3 | 执政官战甲:SOASummonFenix,Execute<br>太阳能龙骑士战甲:SOASummonFenixDragoon,Execute<br>塞布罗斯仲裁者战甲:SOASummonFenixArbiter,Execute | 无 | 静态链路已接 |
| 霍纳与汉 | CoopCasterHorner | 已路由:CU_GPInitHorner | Coop_GlobalCastingTemplates/TerranGlobalCommandPanelTemplate / 4 | 部署麦格天雷:HHTrainTopBar,Build1<br>精确打击:HHBomberPlatformAreaBombTopBarDummyTimer,Execute<br>精确打击:HHBomberPlatformAreaBombTopBarOrder,Execute<br>呼叫舰队:HornerAirFleetActivate,On<br>呼叫舰队:HornerAirFleetTargetingDummy,Execute<br>空间站调度:HHSummonMercenarySpaceStation,Execute | 无 | 静态链路已接 |
| 凯拉克斯 | SoACasterKarax | 已路由:CU_GPInitProtoss | LotV_SoAMissionUIPanel/SoACommandPanelTemplate / 4 | 轨道轰炸:SOAOrbitalStrikeKarax,Execute<br>太阳能射线枪:SOAThermalLanceActivate,On<br>时空波动:SOAMapWideChrono,Execute<br>净化光束:SOAPurifierBeam,Execute | 非第0行主动按钮 2 | 静态链路已接 |
| 凯瑞甘 | CoopCasterKerrigan | 无顶部面板:return | 无 | 无 | 无 | 无顶部面板（英雄命令卡） |
| 蒙斯克 | CoopCasterMengsk | 已路由:CU_GPInitMengsk | Coop_TopBar_Mengsk/MengskTopBar / 4 | 强制征召:BunkerDepotMengskDrop,Build1<br>战争恶犬:MengskZergCalldown,Execute<br>战争恶犬 (等级4):MengskZergCalldownLevel4,Execute<br>战争恶犬:MengskZergCalldownLevel3,Execute<br>战争恶犬:MengskZergCalldownLevel2,Execute<br>战争恶犬:MengskZergCalldownLevel1,Execute<br>核弹天劫:NuclearAnnihilationMengsk,Execute<br>辐射打击:GlobalExperimentalStrikeMengsk,Execute | 无 | 静态链路已接 |
| 诺娃 | CoopCasterNova | 已路由:CU_GPInitNova | Coop_GlobalCastingTemplates/TerranGlobalCommandPanelTemplate / 4 | 防御无人机:NovaDefensiveMatrixDrone,Execute<br>狮鹫号空袭:SOAStickyLine,Execute<br>极速恢复:NovaReviveInstantBuyback,Execute<br>战术空运:NovaGriffinTransportLoad,Execute | 无 | 静态链路已接 |
| 雷诺 | CoopCasterRaynor | 已路由:CU_GPInitRaynor | Coop_GlobalCastingTemplates/RaynorGlobalCommandPanelTemplate / 2 | 休伯利安号:VoidCoopSummonHyperion,Execute<br>女妖空袭:BansheeAirstrike,Execute | 无 | 静态链路已接 |
| 斯台特曼 | CoopCasterStetmann | 已路由:CU_GPInitStetmann | Coop_TopBar_Stetmann/StetmannTopBar / 4 | 切换成“艾的急切”设定:PowerFieldMovementSpeedOn,Execute<br>切换成“艾的呵护”设定:PowerFieldHPRegenerationOn,Execute<br>切换成“艾的滋润”设定:PowerFieldEnergyRegenerationOn,Execute<br>部署艾星:DeployPowerTowerStetmann,Build1 | 无 | 静态链路已接 |
| 斯托科夫 | CoopCasterStukov | 已路由:CU_GPInitStukov | Coop_GlobalCastingTemplates/StukovGlobalCommandPanelTemplate / 4 | 部署灵能发射器:SIStukovPlaceHordeT,Execute<br>感染建筑:SIStukovInfestStructureUpgraded,Execute<br>末日巨兽:StukovSummonApocalisk,Execute<br>亚历山大号:StukovSummonAleksander,Execute | 无 | 静态链路已接 |
| 斯旺 | CoopCasterSwann | 已路由:CU_GPInitSwann | Coop_GlobalCastingTemplates/TerranGlobalCommandPanelTemplate / 4 | 德拉肯激光钻机攻击:DrakkenLaserDrillAttackIssueOrder,Execute<br>汇聚射线:DrakkenLaserDrillConcentratedBeamIssueOrder,Execute<br>脉冲炮:DrakkenLaserDrillPulseCannonIssueOrder,Execute<br>战斗空投:SpecialDelivery,Execute | 无 | 静态链路已接 |
| 泰凯斯 | CoopCasterTychus | 已路由:CU_GPInitTychus | Coop_TopBar_Tychus/TychusTopBarTemplate / 2 | 空投奥丁:TychusCalldownOdinTargeted,Execute<br>医疗运输机空运:TychusMedicTransportLoad,Execute | 无 | 静态链路已接 |
| 沃拉尊 | SoACasterVorazun | 已路由:CU_GPInitProtoss | LotV_SoAMissionUIPanel/SoACommandPanelTemplate / 4 | 部署黑暗水晶塔:SOADarkPylon,Build1<br>黑洞:VoidSentryBlackHole,Execute<br>部署暗影卫队:SOAShadowGuardCalldown,Execute<br>时间停止:SOATimeFreeze,Execute<br>时间停止:CommanderPrestigeVorazunTimeStop,Execute | 无 | 静态链路已接 |
| 扎加拉 | CoopCasterZagara | 无顶部面板:return | 无 | 无 | 无 | 无顶部技能 |
| 泽拉图 | CoopCasterZeratul | 已路由:CU_GPInitZeratul | Coop_TopBar_Zeratul/ZeratulTopBar / 4 | 指引传奇军团:RallyZeratulTopBarRedirect,Rally1<br>特布鲁斯军团:ZeratulTopBarWarpTrain,Train1<br>佐拉亚军团:ZeratulTopBarWarpTrain,Train2<br>塞达斯军团:ZeratulTopBarWarpTrain,Train3<br>虚空抑制晶体:ZeratulTopBarWarpTrain,Train8<br>静滞射线:ZeratulMapWideStasisIssueOrder,Execute<br>部署超维空间巨石:ZeratulTopBarBuild,Build1<br>形体化身:ZeratulTopBarUltimateWarpTrain,Train2<br>精华化身:ZeratulTopBarUltimateWarpTrain,Train1 | 无 | 静态链路已接 |

## 逐指挥官按钮效果

### 阿巴瑟

- 隐藏 caster：`CoopCasterAbathur`（合作指挥官版起义狂潮/Mods/XM/XMAbathur.SC2Mod/Base.SC2Data/GameData/UnitData.xml）
- 顶部路由：`CU_GPInitAbathur`
- **孵化剧毒巢穴**：孵化一个可排放菌毯的剧毒巢穴，可以爆炸并对附近的敌方地面单位造成125点伤害。；无显式费用/冷却字段（命令：`SpawnToxicNest,Build1`，位置：第 1 行第 1 列）
- **愈合**：立即治疗友方生物和机械单位以及建筑100点生命值。在10秒内额外恢复50点生命值。；冷却 150 秒；效果：CEffectEnumArea:AbathurMendSearch（命令：`AbathurMend,Execute`，位置：第 1 行第 2 列）

### 阿巴瑟Reborn

- 隐藏 caster：`CoopCasterAbathurReborn`（合作指挥官版起义狂潮/Mods/XM/XMAbathurReborn.SC2Mod/Base.SC2Data/GameData/UnitData.xml）
- 顶部路由：`CU_GPInitAbathur`
- **孵化剧毒巢穴**：孵化一个可排放菌毯的剧毒巢穴，可以爆炸并对附近的敌方地面单位造成125点伤害。；无显式费用/冷却字段（命令：`SpawnToxicNest,Build1`，位置：第 1 行第 1 列）
- **愈合**：冷却 150 秒；效果：CEffectEnumArea:AbathurRebornMendSearch（命令：`AbathurRebornMend,Execute`，位置：第 1 行第 2 列）

### 阿拉纳克

- 隐藏 caster：`CoopCasterAlarak`（合作指挥官版起义狂潮/Mods/XM/XMAlarak.SC2Mod/Base.SC2Data/GameData/UnitData.xml）
- 顶部路由：`CU_GPInitAlarak`
- **建筑超载**：给目标友方建筑或相位模式下的战争棱镜充能，使其可以攻击附近的敌方地面和空中单位，造成40点伤害。该效果持续45秒。；效果：组合：施加行为 AlarakStructureOvercharge，持续 45 秒；施加行为 AlarakStructureOverchargeShield，持续 45 秒（命令：`AlarakStructureOvercharge,Execute`，位置：第 1 行第 1 列）
- **召唤死亡舰队**：折跃可控制的塔达林母舰和4艘毁灭者，为你战斗60秒。；初始 600 秒，冷却 360 秒；效果：组合：CEffectEnumArea:DeathFleetClearOldUnits；召唤/创建 SOAMothershipv4（命令：`AlarakACSummonDeathfleetTarget,Execute`，位置：第 1 行第 2 列）

### 阿塔尼斯

- 隐藏 caster：`SoACasterArtanis`（合作指挥官版起义狂潮/Mods/XM/XMArtanis.SC2Mod/Base.SC2Data/GameData/UnitData.xml）
- 顶部路由：`CU_GPInitProtoss`
- **投射能量场**：在目标位置投射一个能量场。再次使用这个技能会将能量场移动到一个新的位置。你的盟友也能使用这个能量场。；效果：持续效果：1 次，周期效果 SOAPylonPowerCoopCreateUnitSet（命令：`SOAPylonPower,Execute`，位置：第 1 行第 1 列）
- **轨道轰炸**：从高空轨道向战场发射5束激光，每一束造成50(100 vs 重甲单位)点范围伤害。；Energy 消耗 50；冷却 60 秒（命令：`SOAOrbitalStrikeActivate,On`，位置：第 1 行第 2 列）
- **护盾超载**：友方单位和建筑最多能吸收100点伤害，持续20秒。；Energy 消耗 25；初始 180 秒，冷却 90 秒；效果：CEffectEnumArea:CommanderPrestigeArtanisOrbitalStrikeShieldOverchargeTargetedSearch（命令：`CommanderPrestigeArtanisOrbitalStrikeShieldOverchargeTargeted,Execute`，位置：第 1 行第 3 列）
- **护盾超载**：友方单位和建筑最多能吸收100点伤害，持续20秒。；Energy 消耗 50；初始 180 秒，冷却 180 秒；效果：CEffectModifyUnit:SOASuperShieldDummy（命令：`SoASuperShield,Execute`，位置：第 1 行第 3 列）
- **太阳轰炸**：从亚顿之矛上发射200发随机攻击轰炸目标区域，持续15秒。每一发攻击造成15(30 vs 重甲单位)点范围伤害。；初始 300 秒，冷却 300 秒；效果：组合效果 SOAStrafeAttackCreateTargeter（命令：`SOAStrafeAttack,Execute`，位置：第 1 行第 4 列）
- 注意：还有 2 个主动按钮不在第 0 行，顶部模板通常不会露出：`SOAOrbitalStrikeTargetingDummy,Execute`、`SOAOrbitalStrikeExecute,Execute`

### 德哈卡

- 隐藏 caster：`CoopCasterDehaka`（合作指挥官版起义狂潮/Mods/XM/XMAbathur.SC2Mod/Base.SC2Data/GameData/UnitData.xml，共享 Catalog 定义）
- 顶部路由：`CU_GPInitDehaka`
- **召唤大型原始蠕虫**：召唤强力临时防御蠕虫，可以侦测隐形和潜地单位。；无显式费用/冷却字段（命令：`DehakaNydusDestroyerTopBarDummy,Execute`，位置：第 1 行第 1 列）
- **召唤大型原始蠕虫**：召唤强力临时防御蠕虫，可以侦测隐形和潜地单位。；无显式费用/冷却字段（命令：`DehakaNydusDestroyerTopBar,Build1`，位置：第 1 行第 1 列）
- **召唤格里维格**：召唤原始虫群首领格里维格和一小群原始异虫。格里维格是强大的静态远程攻击单位，可以造成范围伤害，还可以通过深槽虫道移动到新的位置。格里维格在回到巢穴前会持续战斗60秒。；无显式费用/冷却字段（命令：`DehakaGlevigTopBar,Build1`，位置：第 1 行第 2 列）
- **召唤穆尔瓦**：召唤原始虫群首领穆尔瓦。穆尔瓦可以孵化蝗虫，还可以制造一团云雾减速敌人，并使其无法攻击和使用能量技能。穆尔瓦在回到巢穴前会持续战斗60秒。；初始 60 秒，冷却 360 秒；效果：召唤/创建 DehakaMurvar（命令：`DehakaMurvarTopBar,Execute`，位置：第 1 行第 3 列）
- **召唤达克伦**：召唤原始虫群首领达克伦。达克伦是重甲巨兽，可以向目标位置冲锋，造成大量伤害，并击退该位置的敌方单位。达克伦在回到巢穴前会持续战斗60秒。；初始 60 秒，冷却 360 秒；效果：召唤/创建 DehakaDakrun（命令：`DehakaDakrunTopBar,Execute`，位置：第 1 行第 4 列）

### 菲尼克斯

- 隐藏 caster：`SoACasterFenix`（合作指挥官版起义狂潮/Mods/XM/XMFenix.SC2Mod/Base.SC2Data/GameData/UnitData.xml）
- 顶部路由：`CU_GPInitFenix`
- **执政官战甲**：折跃菲尼克斯的执政官战甲。在使用这套战甲配置时，菲尼克斯是一名强大的近战勇士，能够进行范围性攻击并吸收伤害。该战甲会一直保持激活状态，直至其被摧毁或有其它战甲被折跃。可以对地。；效果：组合：持续效果；组合：CEffectRemoveBehavior:SOASummonFenixActiveRB；CEffectRemoveBehavior:SOASummonFenixDragoonActiveRB；CEffectRemoveBehavior:SOASummonFenixArbiterActiveRB；召唤/创建 FenixCoop；施加行为 SOASummonFenixActive（命令：`SOASummonFenix,Execute`，位置：第 1 行第 1 列）
- **太阳能龙骑士战甲**：折跃菲尼克斯的太阳能龙骑士战甲。在使用这套战甲配置时，菲尼克斯可以进行远程攻击并使用多种毁灭性技能。该战甲会一直保持激活状态，直至其被摧毁或有其它战甲被折跃。可以对地和对空。；效果：组合：持续效果；组合：CEffectRemoveBehavior:SOASummonFenixActiveRB；CEffectRemoveBehavior:SOASummonFenixDragoonActiveRB；CEffectRemoveBehavior:SOASummonFenixArbiterActiveRB；召唤/创建 FenixDragoon；施加行为 SOASummonFenixDragoonActive（命令：`SOASummonFenixDragoon,Execute`，位置：第 1 行第 2 列）
- **塞布罗斯仲裁者战甲**：折跃菲尼克斯的塞布罗斯仲裁者战甲。在使用这套战甲配置时，菲尼克斯能够为战场上的部队提供支援并禁锢敌方单位。该战甲会一直保持激活状态，直至其被摧毁或有其它战甲被折跃。可以对地和对空。；效果：组合：持续效果；组合：CEffectRemoveBehavior:SOASummonFenixActiveRB；CEffectRemoveBehavior:SOASummonFenixDragoonActiveRB；CEffectRemoveBehavior:SOASummonFenixArbiterActiveRB；召唤/创建 FenixArbiter；施加行为 SOASummonFenixArbiterActive（命令：`SOASummonFenixArbiter,Execute`，位置：第 1 行第 3 列）

### 霍纳与汉

- 隐藏 caster：`CoopCasterHorner`（合作指挥官版起义狂潮/Mods/XM/XMAbathur.SC2Mod/Base.SC2Data/GameData/UnitData.xml，共享 Catalog 定义）
- 顶部路由：`CU_GPInitHorner`
- **部署麦格天雷**：在目标位置部署5枚麦格天雷。麦格天雷会被敌方的移动引爆，并造成50点范围伤害。；无显式费用/冷却字段（命令：`HHTrainTopBar,Build1`，位置：第 1 行第 1 列）
- **精确打击**：向目标位置发射攻击战斗机，对该位置的敌方地面单位造成175 (+225对非英雄建筑) 点伤害。；冷却 60 秒；效果：持续效果（命令：`HHBomberPlatformAreaBombTopBarDummyTimer,Execute`，位置：第 1 行第 2 列）
- **精确打击**：冷却时间：60 向目标位置发射攻击战斗机，对该位置的敌方地面单位造成175 (+225对非英雄建筑) 点伤害。；最大充能 1000；效果：持续效果（命令：`HHBomberPlatformAreaBombTopBarOrder,Execute`，位置：第 1 行第 2 列）
- **呼叫舰队**：呼叫霍纳的舰队进行近轨道火力支援。舰队会对目标区域内的随机敌方单位造成巨量伤害。；初始 420 秒，冷却 360 秒（命令：`HornerAirFleetActivate,On`，位置：第 1 行第 3 列）
- **呼叫舰队**：呼叫霍纳的舰队进行近轨道火力支援。舰队会对目标区域内的随机敌方单位造成巨量伤害。；冷却 0.25 秒（命令：`HornerAirFleetTargetingDummy,Execute`，位置：第 1 行第 3 列）
- **空间站调度**：空间站对撞击的英雄单位造成500点伤害，撞击范围内的其它一切存在都将被立即摧毁。攻击型无人机会攻击附近的目标。持续10秒。；初始 300 秒，冷却 360 秒；效果：召唤/创建 HHMercenarySpaceStation（命令：`HHSummonMercenarySpaceStation,Execute`，位置：第 1 行第 4 列）

### 凯拉克斯

- 隐藏 caster：`SoACasterKarax`（合作指挥官版起义狂潮/Mods/XM/XMKarax.SC2Mod/Base.SC2Data/GameData/UnitData.xml）
- 顶部路由：`CU_GPInitProtoss`
- **轨道轰炸**：从高空轨道向战场发射多束激光，每一束造成50(100 vs 重甲单位)点范围伤害。；Energy 消耗 5；链接 Abil/SOAOrbitalStrikeKaraxExecute；效果：持续效果（命令：`SOAOrbitalStrikeKarax,Execute`，位置：第 1 行第 1 列）
- **太阳能射线枪**：发射3道激光扫射目标位置，每道激光造成200点伤害。；冷却 120 秒（命令：`SOAThermalLanceActivate,On`，位置：第 1 行第 2 列）
- **时空波动**：使所有友方建筑的生产速度提高200%，持续20秒。；初始 300 秒，冷却 240 秒；效果：CEffectEnumArea:SOAMapWideChronoSearch（命令：`SOAMapWideChrono,Execute`，位置：第 1 行第 3 列）
- **净化光束**：发射一道激光，在15秒内造成750 (1500 vs 重甲单位)伤害。若不手动控制，则激光会自动寻找目标。；初始 450 秒，冷却 360 秒（命令：`SOAPurifierBeam,Execute`，位置：第 1 行第 4 列）
- 注意：还有 2 个主动按钮不在第 0 行，顶部模板通常不会露出：`SOAThermalLanceTargetingDummy,Execute`、`SOARepairBeam,Execute`

### 凯瑞甘

- 隐藏 caster：`CoopCasterKerrigan`（合作指挥官版起义狂潮/Mods/XM/XMKerrigan.SC2Mod/Base.SC2Data/GameData/UnitData.xml）
- 顶部路由：`return`
- 官方 CoopCasterKerrigan 是空壳；指挥官技能在 K5Kerrigan 英雄命令卡，不属于顶部面板。

### 蒙斯克

- 隐藏 caster：`CoopCasterMengsk`（合作指挥官版起义狂潮/Mods/XM/XMMengsk.SC2Mod/Base.SC2Data/GameData/UnitData.xml）
- 顶部路由：`CU_GPInitMengsk`
- **强制征召**：空投一个补给地堡，里面有6名不幸的冲锋队员在值守。；无显式费用/冷却字段（命令：`BunkerDepotMengskDrop,Build1`，位置：第 1 行第 1 列）
- **战争恶犬**：在目标位置部署6只跳虫奴仆，持续60秒。异虫奴仆会四处寻找攻击最近的敌人。 部署基于天命皇权值的额外数量的异虫奴仆。；效果：组合：CEffectEnumTrackedUnits:MengskZergCalldownTT（命令：`MengskZergCalldown,Execute`，位置：第 1 行第 3 列）
- **战争恶犬 (等级4)**：Energy 消耗 100；冷却 180 秒，链接 Abil/MengskZergCalldown；效果：组合：持续效果：5 次，周期效果 UltraliskMengskCU；持续效果：2 次，周期效果 MutaliskMengskAr；持续效果：2 次，周期效果 HydraliskMengskAr；持续效果：6 次，周期效果 ZerglingMengskSpawnTriggerAr（命令：`MengskZergCalldownLevel4,Execute`，位置：第 1 行第 3 列）
- **战争恶犬**：Energy 消耗 75；冷却 180 秒，链接 Abil/MengskZergCalldown；效果：组合：持续效果：2 次，周期效果 MutaliskMengskAr；持续效果：2 次，周期效果 HydraliskMengskAr；持续效果：6 次，周期效果 ZerglingMengskSpawnTriggerAr（命令：`MengskZergCalldownLevel3,Execute`，位置：第 1 行第 3 列）
- **战争恶犬**：Energy 消耗 50；冷却 180 秒，链接 Abil/MengskZergCalldown；效果：组合：持续效果：2 次，周期效果 HydraliskMengskAr；持续效果：6 次，周期效果 ZerglingMengskSpawnTriggerAr（命令：`MengskZergCalldownLevel2,Execute`，位置：第 1 行第 3 列）
- **战争恶犬**：Energy 消耗 25；冷却 180 秒，链接 Abil/MengskZergCalldown；效果：持续效果：6 次，周期效果 ZerglingMengskSpawnTriggerAr（命令：`MengskZergCalldownLevel1,Execute`，位置：第 1 行第 3 列）
- **核弹天劫**：发射仿佛无穷无尽的20枚战术飞弹，地毯式轰炸目标区域，每一枚飞弹对一个小范围区域造成150(+100对建筑)点伤害，最后还有一枚核子飞弹尾随其后，对一个大范围区域造成500(+300对建筑)点伤害。；Energy 消耗 100；冷却 300 秒；效果：组合：持续效果：1 次，周期效果 NuclearAnnihilationMengskBigNukeDamageSearch；持续效果：20 次，周期效果 NuclearAnnihilationMengsk40Ar（命令：`NuclearAnnihilationMengsk,Execute`，位置：第 1 行第 4 列）
- **辐射打击**：为你所有的大地碎裂炮装填试验性弹头，瞄准地图上的任意位置进行发射。弹头随机落在目标位置附近，使整个区域浸泡在充满辐射的生化材料中，任何进入其中的敌人每秒承受5点伤害。受到影响的单位无法隐形。；Energy 消耗 25；冷却 30 秒（命令：`GlobalExperimentalStrikeMengsk,Execute`，位置：第 1 行第 2 列）

### 诺娃

- 隐藏 caster：`CoopCasterNova`（合作指挥官版起义狂潮/Mods/XM/XMNova.SC2Mod/Base.SC2Data/GameData/UnitData.xml）
- 顶部路由：`CU_GPInitNova`
- **防御无人机**：为友方单位提供护盾，可吸收最多200点伤害，持续60秒。；Minerals 消耗 100（命令：`NovaDefensiveMatrixDrone,Execute`，位置：第 1 行第 1 列）
- **狮鹫号空袭**：短暂延迟后，呼叫狮鹫号对其航线沿途的所有目标造成500点伤害。；效果：组合效果 StickyLine（命令：`SOAStickyLine,Execute`，位置：第 1 行第 2 列）
- **极速恢复**：立即在目标位置复活诺娃。花费的资源数量由复活的剩余时间决定。不会影响任务刚开始时的初始冷却时间。；Minerals 消耗 450；冷却 0.1 秒；效果：组合效果 NovaReviveInstantBuybackDummy（命令：`NovaReviveInstantBuyback,Execute`，位置：第 1 行第 4 列）
- **战术空运**：立即将目标区域内的友方单位运送至选定位置。；Minerals 消耗 200；初始 120 秒，冷却 120 秒；效果：CEffectEnumArea:NovaGriffinTransportPreS（命令：`NovaGriffinTransportLoad,Execute`，位置：第 1 行第 3 列）

### 雷诺

- 隐藏 caster：`CoopCasterRaynor`（合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UnitData.xml）
- 顶部路由：`CU_GPInitRaynor`
- **休伯利安号**：召唤休伯利安号战列巡航舰进行临时支援，休伯利安号可被控制，并持续60秒。；初始 300 秒，冷却 360 秒；效果：召唤/创建 HyperionVoidCoop（命令：`VoidCoopSummonHyperion,Execute`，位置：第 1 行第 1 列）
- **女妖空袭**：呼叫5架隐形的黄昏之翼，向空降区域内所有敌人造成50点伤害。黄昏之翼可以被控制并作战，持续60秒。；初始 240 秒，冷却 240 秒（命令：`BansheeAirstrike,Execute`，位置：第 1 行第 2 列）

### 斯台特曼

- 隐藏 caster：`CoopCasterStetmann`（合作指挥官版起义狂潮/Mods/XM/XMStetmann.SC2Mod/Base.SC2Data/GameData/unitdata.xml）
- 顶部路由：`CU_GPInitStetmann`
- **切换成“艾的急切”设定**：允许“爱心区域”给予斯台特曼的单位100%移动速度加成。盟友单位获得50%移动速度加成。；冷却 1 秒，链接 Abil/PowerFieldChange（命令：`PowerFieldMovementSpeedOn,Execute`，位置：第 1 行第 2 列）
- **切换成“艾的呵护”设定**：允许“爱心区域”给予斯台特曼的单位10点每秒生命恢复。盟友单位获得5点每秒生命恢复。；冷却 1 秒，链接 Abil/PowerFieldChange（命令：`PowerFieldHPRegenerationOn,Execute`，位置：第 1 行第 3 列）
- **切换成“艾的滋润”设定**：“爱心区域”每秒给予斯台特曼的单位5点艾能恢复。盟友单位每秒获得2.5点能量恢复。；冷却 1 秒，链接 Abil/PowerFieldChange（命令：`PowerFieldEnergyRegenerationOn,Execute`，位置：第 1 行第 4 列）
- **部署艾星**：在目标位置部署一颗艾星。艾星必须放置在“爱心区域”中。；无显式费用/冷却字段（命令：`DeployPowerTowerStetmann,Build1`，位置：第 1 行第 1 列）

### 斯托科夫

- 隐藏 caster：`CoopCasterStukov`（合作指挥官版起义狂潮/Mods/XM/XMStukov.SC2Mod/Base.SC2Data/GameData/UnitData.xml）
- 顶部路由：`CU_GPInitStukov`
- **部署灵能发射器**：将当前已有和后续新造的被感染的步兵单位派往指定地点。；效果：CEffectTeleport:SIStukovPlaceHordeTC（命令：`SIStukovPlaceHordeT,Execute`，位置：第 1 行第 1 列）
- **感染建筑**：感染友方或敌方建筑，使其在20.03秒内孵化60.09只巢虫。在效果持续时间内，友方建筑每秒恢复25点生命值，敌方建筑则会丧失功能。；效果：组合：施加行为 SIStukovInfestStructureEnemyTarget，持续 20.03 秒；施加行为 SIStukovInfestStructureFriendlyTarget，持续 20.03 秒（命令：`SIStukovInfestStructureUpgraded,Execute`，位置：第 1 行第 2 列）
- **末日巨兽**：在目标位置孵化一只末日巨兽。末日巨兽可以被控制，持续作战60秒。；初始 240 秒，冷却 300 秒；效果：召唤/创建 StukovApocalisk（命令：`StukovSummonApocalisk,Execute`，位置：第 1 行第 3 列）
- **亚历山大号**：在目标位置呼叫亚历山大号被感染的战列巡航舰。亚历山大号可以被控制，持续作战60秒。；初始 360 秒，冷却 360 秒；效果：召唤/创建 StukovAleksander（命令：`StukovSummonAleksander,Execute`，位置：第 1 行第 4 列）

### 斯旺

- 隐藏 caster：`CoopCasterSwann`（合作指挥官版起义狂潮/Mods/XM/XMAbathur.SC2Mod/Base.SC2Data/GameData/UnitData.xml，共享 Catalog 定义）
- 顶部路由：`CU_GPInitSwann`
- **德拉肯激光钻机攻击**：使用德拉肯激光钻机进行攻击，造成每秒20点伤害。射程无限。；链接 Abil/DrakkenLaserDrillIssueAttackOrder；效果：持续效果（命令：`DrakkenLaserDrillAttackIssueOrder,Execute`，位置：第 1 行第 1 列）
- **汇聚射线**：对一条直线上的敌方单位造成400点伤害，长度为整个地图。；冷却 0.0625 秒，链接 Abil/DrakkenLaserDrillBFG（命令：`DrakkenLaserDrillConcentratedBeamIssueOrder,Execute`，位置：第 1 行第 2 列）
- **脉冲炮**：对目标区域的敌方单位和建筑造成600点伤害。；冷却 0.0625 秒，链接 Abil/DrakkenLaserDrillNuke（命令：`DrakkenLaserDrillPulseCannonIssueOrder,Execute`，位置：第 1 行第 3 列）
- **战斗空投**：召唤4台武装机器人，使降落区域中的敌方地面单位昏迷。武装机器人可以控制并会战斗60秒。；初始 240 秒，冷却 240 秒；效果：组合：召唤/创建 VoidCoopARES x4（命令：`SpecialDelivery,Execute`，位置：第 1 行第 4 列）

### 泰凯斯

- 隐藏 caster：`CoopCasterTychus`（合作指挥官版起义狂潮/Mods/XM/XMTychus.SC2Mod/Base.SC2Data/GameData/UnitData.xml）
- 顶部路由：`CU_GPInitTychus`
- **空投奥丁**：将奥丁空投至目标位置，落地时造成150点伤害。奥丁需要泰凯斯驾驶。如果泰凯斯失去作战能力，空投奥丁还会将其复活。奥丁可以被控制60秒。；初始 300 秒，冷却 300 秒；效果：召唤/创建 TychusOdin（命令：`TychusCalldownOdinTargeted,Execute`，位置：第 1 行第 2 列）
- **医疗运输机空运**：立即将目标区域内的所有不法之徒运送到指定位置，下机时获得治疗和隐身效果。如果这些单位受到攻击，他们获得的治疗和隐身效果都会消失。；冷却 120 秒；效果：CEffectEnumArea:TychusMedicTransportPreS（命令：`TychusMedicTransportLoad,Execute`，位置：第 1 行第 1 列）

### 沃拉尊

- 隐藏 caster：`SoACasterVorazun`（合作指挥官版起义狂潮/Mods/XM/XMVorazun.SC2Mod/Base.SC2Data/GameData/UnitData.xml）
- 顶部路由：`CU_GPInitProtoss`
- **部署黑暗水晶塔**：折跃一座黑暗水晶塔，提供补给和能量。黑暗水晶塔还会使附近的友方单位和建筑隐形。；无显式费用/冷却字段（命令：`SOADarkPylon,Build1`，位置：第 1 行第 1 列）
- **黑洞**：制造一个黑洞，将敌方单位吸入并使它们昏迷。持续8秒。；Energy 消耗 25（命令：`VoidSentryBlackHole,Execute`，位置：第 1 行第 2 列）
- **部署暗影卫队**：向目标位置部署2名精英黑暗圣堂武士，持续60秒。；Energy 消耗 50；初始 180 秒，冷却 180 秒；效果：召唤/创建 VorazunShadowGuard x2（命令：`SOAShadowGuardCalldown,Execute`，位置：第 1 行第 3 列）
- **时间停止**：改变时间与空间，使所有敌人原地静止20秒。射程无限。；初始 300 秒，冷却 300 秒（命令：`SOATimeFreeze,Execute`，位置：第 1 行第 4 列）
- **时间停止**：改变时间与空间，使所有敌人原地静止20秒。射程无限。；初始 300 秒，冷却 300 秒（命令：`CommanderPrestigeVorazunTimeStop,Execute`，位置：第 1 行第 4 列）

### 扎加拉

- 隐藏 caster：`CoopCasterZagara`（合作指挥官版起义狂潮/Mods/XM/XMZagara.SC2Mod/Base.SC2Data/GameData/UnitData.xml）
- 顶部路由：`return`
- 当前隐藏 caster 没有顶部主动技能。

### 泽拉图

- 隐藏 caster：`CoopCasterZeratul`（合作指挥官版起义狂潮/Mods/XM/XMZeratul.SC2Mod/Base.SC2Data/GameData/commanders/futurecommanders.xml）
- 顶部路由：`CU_GPInitZeratul`
- **指引传奇军团**：将传奇军团派往新的位置。；无显式费用/冷却字段（命令：`RallyZeratulTopBarRedirect,Rally1`，位置：第 1 行第 1 列）
- **特布鲁斯军团**：召唤特布鲁斯及其传奇般的狂热者军团支援战场。该军团无法被直接控制，但可以使用顶部技能条对其进行指引。军团将参战60秒。；无显式费用/冷却字段（命令：`ZeratulTopBarWarpTrain,Train1`，位置：第 1 行第 1 列）
- **佐拉亚军团**：召唤佐拉亚及其传奇般的虚空辉光舰军团支援战场。该军团无法被直接控制，但可以使用顶部技能条对其进行指引。军团将参战60秒。；无显式费用/冷却字段（命令：`ZeratulTopBarWarpTrain,Train2`，位置：第 1 行第 1 列）
- **塞达斯军团**：召唤塞达斯及其传奇般的黑暗执政官军团支援战场。该军团无法被直接控制，但可以使用顶部技能条对其进行指引。军团将参战60秒。；无显式费用/冷却字段（命令：`ZeratulTopBarWarpTrain,Train3`，位置：第 1 行第 1 列）
- **虚空抑制晶体**：召唤一枚无敌的虚空抑制晶体，使敌方单位的移动和攻击速度降低70%，并瘫痪邻近的敌方建筑。虚空抑制晶体可以被控制30秒。；无显式费用/冷却字段（命令：`ZeratulTopBarWarpTrain,Train8`，位置：第 1 行第 2 列）
- **静滞射线**：从神器储放台中迸射出一道光束，使敌人陷入静滞状态，持续15秒。该状态下的敌人无法移动、攻击，也无法被攻击或受到技能影响。；冷却 90 秒，链接 Abil/ZeratulMapWideStasis（命令：`ZeratulMapWideStasisIssueOrder,Execute`，位置：第 1 行第 2 列）
- **部署超维空间巨石**：在目标位置部署超维空间巨石。超维空间巨石可以击晕敌人，进行自我投射，保护自己免受伤害。；无显式费用/冷却字段（命令：`ZeratulTopBarBuild,Build1`，位置：第 1 行第 2 列）
- **形体化身**：在目标位置召唤灵能潜能的具象体——形体化身。形体化身可被操控作战60秒。；无显式费用/冷却字段（命令：`ZeratulTopBarUltimateWarpTrain,Train2`，位置：第 1 行第 4 列）
- **精华化身**：在目标位置召唤进化潜能的具象体——精华化身。精华化身可被操控作战60秒。；无显式费用/冷却字段（命令：`ZeratulTopBarUltimateWarpTrain,Train1`，位置：第 1 行第 4 列）
