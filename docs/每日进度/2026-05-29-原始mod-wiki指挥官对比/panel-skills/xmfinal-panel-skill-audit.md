# XMFinal 原始mod指挥官面板技能审计

生成时间：2026-05-29T08:56:02.736Z

## 结论

- 范围：阿巴瑟、阿拉纳克、阿塔尼斯、德哈卡、菲尼克斯、霍纳与汉、凯拉克斯、凯瑞甘、蒙斯克、诺娃、雷诺、斯台特曼、斯托科夫、斯旺、泰凯斯、沃拉尊、扎加拉、泽拉图。
- 当前 `LibE0EAE146_CommanderPanels.galaxy` 已为这些指挥官登记面板技能 profile。
- 本表检查 ability、button、requirement、caster Catalog 是否能从本地 XMFinal 或其官方依赖解析，并列出费用、冷却、充能和可读效果。
- 注意：当前 smoke 只读取 Catalog metadata，不向 SC2 实机发出施法命令；目标选择、隐藏 caster、actor 播放和效果落地仍需要进图验证。

## 阿巴瑟

| 面板技能 | ability | button | requirement | caster | 费用/冷却/充能 | 具体效果 | 状态 |
|---|---|---|---|---|---|---|---|
| 愈合 | AbathurMend | AbathurMend | 无 | CoopCasterAbathur | 冷却 使用 150 秒 | 立即治疗友方生物和机械单位以及建筑100点生命值。在10秒内额外恢复50点生命值。；愈合：立即治疗友方生物、机械单位和建筑，并追加持续治疗；升级后最多储存 3 次使用次数。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |
| 孵化剧毒巢穴 | SpawnToxicNest | SpawnToxicNest | 无 | CoopCasterAbathur | 建造 ToxicNest | 孵化一个可排放菌毯的剧毒巢穴，可以爆炸并对附近的敌方地面单位造成125点伤害。；孵化剧毒巢穴：在指定点生成可铺菌毯的剧毒巢穴，触发后对附近敌方地面单位造成伤害。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |

## 阿拉纳克

| 面板技能 | ability | button | requirement | caster | 费用/冷却/充能 | 具体效果 | 状态 |
|---|---|---|---|---|---|---|---|
| 死亡舰队 | AlarakACSummonDeathfleetTarget | AlarakACSummonDeathfleet | NoAlarakMothership | CoopCasterAlarak | 冷却 初始 600 秒，使用 360 秒，位置 Player | 折跃可控制的塔达林母舰和4艘毁灭者，为你战斗60秒。；召唤死亡舰队母舰；本地能力节点显示初始冷却 600 秒、使用冷却 360 秒，并要求场上没有阿拉纳克母舰。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |
| 建筑超载 | AlarakStructureOvercharge | AlarakStructureOvercharge | 无 | CoopCasterAlarak | 充能 最大 3，每次 1，初始恢复 90 秒，恢复 90 秒 | 给目标友方建筑或相位模式下的战争棱镜充能，使其可以攻击附近的敌方地面和空中单位，造成40点伤害。该效果持续45秒。；给友方建筑或相位模式战争棱镜充能；本地效果链显示伤害 40、持续 45 秒、搜索半径 15。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |

## 阿塔尼斯

| 面板技能 | ability | button | requirement | caster | 费用/冷却/充能 | 具体效果 | 状态 |
|---|---|---|---|---|---|---|---|
| 轨道轰炸：打开目标模式 | SOAOrbitalStrikeActivate | SOAOrbitalStrike | HaveSOAOrbitalStrike | SoACasterArtanis | 能量 50；冷却 使用 60 秒 | 从高空轨道向战场发射5束激光，每一束造成50(100 vs 重甲单位)点范围伤害。；打开亚顿之矛轨道轰炸目标模式；真正落点由 execute 能力处理。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |
| 轨道轰炸：落点执行 | SOAOrbitalStrikeExecute | SOAOrbitalStrike | HaveSOAOrbitalStrike | SoACasterArtanis | 无显式费用/冷却字段 | 从高空轨道向战场发射5束激光，每一束造成50(100 vs 重甲单位)点范围伤害。；对目标点发射轨道轰炸；官方战役依赖提供该能力，当前本地 profile 已登记。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |
| 能量场 | SOAPylonPower | SOAPylonPower | HaveSOAPylonPower | SoACasterArtanis | 无显式费用/冷却字段 | 在目标位置投射一个能量场。再次使用这个技能会将能量场移动到一个新的位置。你的盟友也能使用这个能量场。；在指定点投放能量场，用于折跃和供能。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |
| 护盾超载 | SoASuperShield | SOASuperShield | HaveSOASuperShield | SoACasterArtanis | 能量 50；冷却 初始 180 秒，使用 180 秒 | 友方单位和建筑最多能吸收100点伤害，持续20秒。；全地图护盾超载；官方战役依赖提供该能力，按钮和需求已接入 profile。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |
| 太阳轰炸 | SOAStrafeAttack | SOAStrafeAttack | HaveSOAStrafeAttack | SoACasterArtanis | 冷却 初始 300 秒，使用 300 秒 | 从亚顿之矛上发射200发随机攻击轰炸目标区域，持续15秒。每一发攻击造成15(30 vs 重甲单位)点范围伤害。；发起太阳轰炸/扫射类面板能力；execute 项负责落点执行。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |
| 太阳轰炸：落点执行 | SOAStrafeAttackExecute | SOAStrafeAttack | 无 | SoACasterArtanis | 无显式费用/冷却字段 | 从亚顿之矛上发射200发随机攻击轰炸目标区域，持续15秒。每一发攻击造成15(30 vs 重甲单位)点范围伤害。；太阳轰炸执行项；当前作为 profile metadata 检查，不直接发射实机效果。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |

## 德哈卡

| 面板技能 | ability | button | requirement | caster | 费用/冷却/充能 | 具体效果 | 状态 |
|---|---|---|---|---|---|---|---|
| 召唤达克伦 | DehakaDakrunTopBar | DehakaDakrunTopBar | DehakaSummonDakrun | CoopCasterDehaka | 冷却 使用 360 秒，位置 Player | 召唤原始虫群首领达克伦。达克伦是重甲巨兽，可以向目标位置冲锋，造成大量伤害，并击退该位置的敌方单位。达克伦在回到巢穴前会持续战斗60秒。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |
| 召唤格里维格 | DehakaGlevigTopBar | DehakaGlevigTopBar | DehakaSummonGlevig | CoopCasterDehaka | 建造 DehakaGlevig，建造时间 0.0625 秒，冷却 360 秒 | 召唤原始虫群首领格里维格和一小群原始异虫。格里维格是强大的静态远程攻击单位，可以造成范围伤害，还可以通过深槽虫道移动到新的位置。格里维格在回到巢穴前会持续战斗60秒。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |
| 召唤穆尔瓦 | DehakaMurvarTopBar | DehakaMurvarTopBar | DehakaSummonMurvar | CoopCasterDehaka | 冷却 使用 360 秒，位置 Player | 召唤原始虫群首领穆尔瓦。穆尔瓦可以孵化蝗虫，还可以制造一团云雾减速敌人，并使其无法攻击和使用能量技能。穆尔瓦在回到巢穴前会持续战斗60秒。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |
| 召唤大型原始蠕虫 | DehakaNydusDestroyerTopBar | DehakaNydusDestroyerTopBar | HaveDehakaGlevigStructure | CoopCasterDehaka | 建造 DehakaNydusDestroyerTimedNoFood，建造时间 0.0625 秒 | 召唤强力临时防御蠕虫，可以侦测隐形和潜地单位。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |

## 菲尼克斯

| 面板技能 | ability | button | requirement | caster | 费用/冷却/充能 | 具体效果 | 状态 |
|---|---|---|---|---|---|---|---|
| 塞布罗斯仲裁者战甲 | SOASummonFenixArbiter | SOASummonFenixArbiter | 无 | SoACasterFenix | 冷却 初始 240 秒，使用 15 秒，位置 Player，链接 SOASummonFenixArbiter | 折跃菲尼克斯的塞布罗斯仲裁者战甲。在使用这套战甲配置时，菲尼克斯能够为战场上的部队提供支援并禁锢敌方单位。 该战甲会一直保持激活状态，直至其被摧毁或有其它战甲被折跃。 可以对地和对空。；折跃菲尼克斯塞布罗斯仲裁者战甲；本地能力节点显示初始冷却 240 秒、换甲冷却 15 秒。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |
| 太阳能龙骑士战甲 | SOASummonFenixDragoon | SOASummonFenixDragoon | 无 | SoACasterFenix | 冷却 初始 240 秒，使用 15 秒，位置 Player，链接 SOASummonFenixDragoon | 折跃菲尼克斯的太阳能龙骑士战甲。在使用这套战甲配置时，菲尼克斯可以进行远程攻击并使用多种毁灭性技能。 该战甲会一直保持激活状态，直至其被摧毁或有其它战甲被折跃。 可以对地和对空。；折跃菲尼克斯太阳能龙骑士战甲；本地能力节点显示初始冷却 240 秒、换甲冷却 15 秒。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |
| 执政官战甲 | SOASummonFenix | SOASummonFenix | 无 | SoACasterFenix | 冷却 初始 240 秒，使用 15 秒，位置 Player，链接 SOASummonFenix | 折跃菲尼克斯的执政官战甲。在使用这套战甲配置时，菲尼克斯是一名强大的近战勇士，能够进行范围性攻击并吸收伤害。 该战甲会一直保持激活状态，直至其被摧毁或有其它战甲被折跃。 可以对地。；折跃菲尼克斯执政官战甲；本地能力节点显示初始冷却 240 秒、换甲冷却 15 秒。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |

## 霍纳与汉

| 面板技能 | ability | button | requirement | caster | 费用/冷却/充能 | 具体效果 | 状态 |
|---|---|---|---|---|---|---|---|
| 呼叫舰队：打开目标模式 | HornerAirFleetActivate | HornerAirFleet | HornerHanLevel05 | CoopCasterHorner | 冷却 初始 420 秒，使用 360 秒 | 呼叫霍纳的舰队进行近轨道火力支援。舰队会对目标区域内的随机敌方单位造成巨量伤害。；呼叫舰队目标模式：打开舰队轰炸落点选择；执行链由 air_fleet_target 负责。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |
| 呼叫舰队：落点执行 | HornerAirFleetTargetingDummy | HornerAirFleet | HornerHanLevel05 | CoopCasterHorner | 冷却 使用 0.25 秒 | 呼叫霍纳的舰队进行近轨道火力支援。舰队会对目标区域内的随机敌方单位造成巨量伤害。；呼叫舰队：舰队在目标区域进行打击；本地 profile 检查目标 dummy/按钮/caster 是否齐全。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |
| 磁力地雷 | HHTrainTopBar | HHMagneticMines | 无 | CoopCasterHorner | 建造 HHMagneticMine_SpawnerUnit | 在目标位置部署5枚麦格天雷。麦格天雷会被敌方的移动引爆，并造成50点范围伤害。；磁力地雷：从顶部条投放磁力地雷；本地能力为 HHTrainTopBar 的 Build1 项。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |
| 精确打击 | HHBomberPlatformAreaBombTopBarOrder | HHBomberAreaBombTopBar | HornerHanLevel02 | CoopCasterHorner | 充能 最大 1000，每次 1 | 冷却时间：60 向目标位置发射攻击战斗机，对该位置的敌方地面单位造成175 (+225对非英雄建筑) 点伤害。；精确打击：调用轰炸机平台对目标区域进行轰炸；同排 dummy 用于无平台/计时状态展示。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |
| 精确打击：平台计时占位 | HHBomberPlatformAreaBombTopBarDummyTimer | HHBomberAreaBombTopBarDummy | 无 | CoopCasterHorner | 冷却 使用 60 秒 | 向目标位置发射攻击战斗机，对该位置的敌方地面单位造成175 (+225对非英雄建筑) 点伤害。；精确打击占位：显示轰炸机平台计时/不可用状态，不代表实际轰炸执行。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |
| 空间站调度 | HHSummonMercenarySpaceStation | HHSummonSpaceStation | HornerHanLevel10 | CoopCasterHorner | 冷却 初始 300 秒，使用 360 秒，位置 Player | 空间站对撞击的英雄单位造成500点伤害，撞击范围内的其它一切存在都将被立即摧毁。攻击型无人机会攻击附近的目标。持续10秒。；空间站调度：在目标区域召唤雇佣兵空间站并进行范围支援。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |

## 凯拉克斯

| 面板技能 | ability | button | requirement | caster | 费用/冷却/充能 | 具体效果 | 状态 |
|---|---|---|---|---|---|---|---|
| 时空波动 | SOAMapWideChrono | SOAMapWideChrono | HaveSOAMapWideChrono | SoACasterKarax | 冷却 初始 300 秒，使用 240 秒 | 使所有友方建筑的生产速度提高200%，持续20秒。；时空波动影响全图友方单位/建筑；本地行为显示持续 20 秒，速度/冷却/生产等倍率为 2。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |
| 轨道轰炸 | SOAOrbitalStrikeKarax | SOAOrbitalStrikeKarax | HaveSOAOrbitalStrike | SoACasterKarax | 能量 5 | 从高空轨道向战场发射多束激光，每一束造成50(100 vs 重甲单位)点范围伤害。；凯拉克斯轨道轰炸；本地能力节点显示能量消耗 5，冷却/充能链接到独立冷却键。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |
| 净化光束 | SOAPurifierBeam | SOAPurifierBeam | 无 | SoACasterKarax | 冷却 初始 450 秒，使用 360 秒 | 发射一道激光，在15秒内造成750 (1500 vs 重甲单位)伤害。若不手动控制，则激光会自动寻找目标。；净化光束；本地能力节点显示初始冷却 450 秒、使用冷却 360 秒。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |
| 太阳能射线枪：打开目标模式 | SOAThermalLanceActivate | SOAThermalLance | 无 | SoACasterKarax | 冷却 使用 120 秒 | 发射3道激光扫射目标位置，每道激光造成200点伤害。；太阳能射线枪目标模式；本地 activate 节点显示冷却 120 秒。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |
| 太阳能射线枪：划线执行 | SOAThermalLanceExecute | SOAThermalLance | 无 | SoACasterKarax | 无显式费用/冷却字段 | 发射3道激光扫射目标位置，每道激光造成200点伤害。；太阳能射线枪划线执行；当前执行节点只有效果入口，费用主要在 activate/目标模式链上。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |

## 凯瑞甘

| 面板技能 | ability | button | requirement | caster | 费用/冷却/充能 | 具体效果 | 状态 |
|---|---|---|---|---|---|---|---|
| 吸收光环 | KerriganVoidCoopEconDrop | KerriganVoidCoopEconDrop | 无 | K5Kerrigan | 冷却 使用 120 秒，位置 Player | 附近所有被消灭的敌人掉落资源。效果持续15秒。；吸收光环：附近敌人死亡掉落资源；本地能力节点显示冷却 120 秒。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |
| 定身波 | KerriganVoidCoopCrushingGripWave | KerriganVoidCoopCrushingGripWave | 无 | K5Kerrigan | 冷却 初始 600 秒，使用 180 秒，位置 Player | 对凯瑞甘周围大范围内的敌人造成100点伤害，并击晕他们10秒。 英雄单位会被减速。；定身波：全屏控制/伤害链；本地能力节点显示初始冷却 600 秒、使用冷却 180 秒，前置眩晕 1.625 秒。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |
| 毁灭漩涡 | KerriganMaelstrom | KerriganMaelstrom | 无 | K5Kerrigan | 能量 100；冷却 使用 120 秒，位置 Unit | 毁灭漩涡：本地能力节点显示消耗 100 能量、冷却 120 秒，行为持续 9 秒、每 0.5 秒搜索半径 4。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |

## 蒙斯克

| 面板技能 | ability | button | requirement | caster | 费用/冷却/充能 | 具体效果 | 状态 |
|---|---|---|---|---|---|---|---|
| 强制征召 | BunkerDepotMengskDrop | BunkerDepotMengskDrop | 无 | CoopCasterMengsk | 建造 BunkerDepotMengskDrop，建造时间 3 秒，能量 25 | 空投一个补给地堡，里面有6名不幸的冲锋队员在值守。；强制征召：向目标位置空投补给地堡/征召支援。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |
| 辐射打击 | ArtilleryMengskGlobalExperimentalStrike | ArtilleryMengskExperimentalStrike | MengskLevel04 | CoopCasterMengsk | 能量 25；冷却 使用 30 秒，位置 Global | 为你所有的大地碎裂炮装填试验性弹头，瞄准地图上的任意位置进行发射。弹头随机落在目标位置附近，使整个区域浸泡在充满辐射的生化材料中，任何进入其中的敌人每秒承受5点伤害。受到影响的单位无法隐形。；辐射打击：大地碎裂炮向目标区域发射污染弹，造成区域伤害/污染效果。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |
| 战争恶犬：等级1 | MengskZergCalldownLevel1 | MengskZergCalldownLevel1 | 无 | CoopCasterMengsk | 能量 25 | 战争恶犬等级1：按当前帝国天命层级召唤异虫支援；等级越高单位规模越大。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |
| 战争恶犬：等级2 | MengskZergCalldownLevel2 | MengskZergCalldownLevel1 | 无 | CoopCasterMengsk | 能量 50 | 战争恶犬等级2：按当前帝国天命层级召唤异虫支援；等级越高单位规模越大。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |
| 战争恶犬：等级3 | MengskZergCalldownLevel3 | MengskZergCalldownLevel1 | 无 | CoopCasterMengsk | 能量 75 | 战争恶犬等级3：按当前帝国天命层级召唤异虫支援；等级越高单位规模越大。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |
| 战争恶犬：等级4 | MengskZergCalldownLevel4 | MengskZergCalldownLevel1 | 无 | CoopCasterMengsk | 能量 100 | 战争恶犬等级4：按当前帝国天命层级召唤异虫支援；等级越高单位规模越大。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |
| 核弹天劫 | NuclearAnnihilationMengsk | NuclearAnnihilationMengsk | MengskLevel10 | CoopCasterMengsk | 能量 100；冷却 使用 300 秒 | 发射仿佛无穷无尽的20枚战术飞弹，地毯式轰炸目标区域，每一枚飞弹对一个小范围区域造成150(+100对建筑)点伤害，最后还有一枚核子飞弹尾随其后，对一个大范围区域造成500(+300对建筑)点伤害。；核弹天劫：向目标区域连续投放核弹级打击；需要对应等级/非威望锁定状态。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |

## 诺娃

| 面板技能 | ability | button | requirement | caster | 费用/冷却/充能 | 具体效果 | 状态 |
|---|---|---|---|---|---|---|---|
| 格里芬轰炸 | NovaGriffinBombingRunExecute | NovaGriffinBombingRun | 无 | CoopCasterNova | 冷却 使用 0.25 秒 | 短暂延迟后，呼叫狮鹫号对其航线沿途的所有目标造成500点伤害。；格里芬轰炸：对目标线/区域实施轰炸；当前本地能力为 execute 节点。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |
| 格里芬运输 | NovaGriffinTransportLoadUnits | NovaGriffinTransportUnits | 无 | CoopCasterNova | 冷却 初始 120 秒，使用 120 秒 | 立即将目标区域内的友方单位运送至选定位置。；格里芬运输：装载并运输诺娃部队；当前 profile 只检查 load 能力和按钮。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |
| 全息诱饵 | NovaCoopDecoyTarget | NovaCoopDecoy | HaveNovaCombatSuit | CoopCasterNova | 冷却 初始 600 秒，使用 420 秒，位置 Global | 部署一个诺娃的全息复制体，可自动攻击敌方单位，持续存在60秒。；全息诱饵：在目标位置投放诱饵单位，需要诺娃作战服。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |
| 战术核弹 | NovaCoopCasterNuke | NovaCoopCasterNuke | HaveShadowOpsandNovaStealthSuit | CoopCasterNova | 充能 最大 1，每次 1，初始恢复 600 秒，恢复 420 秒 | 通过空投对目标区域进行聚变打击。聚变打击需要[未解析:Effect,NovaCoopCasterNukePersistent,InitialDelay+Effect,NovaCoopCasterNukePersistent,ExpireDelay]秒才能生效，但可对大范围内的目标造成最多600点伤害。；战术核弹：从幽灵学院/隐形套装链路发射核弹，使用 charge/cooldown 控制。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |

## 雷诺

| 面板技能 | ability | button | requirement | caster | 费用/冷却/充能 | 具体效果 | 状态 |
|---|---|---|---|---|---|---|---|
| 女妖空袭 | BansheeAirstrike | BansheeAirstrike | 无 | CoopCasterRaynor | 冷却 初始 240 秒，使用 240 秒，位置 Unit | 呼叫5架隐形的黄昏之翼，向空降区域内所有敌人造成50点伤害。黄昏之翼可以被控制并作战，持续60秒。；呼叫 5 架隐形黄昏之翼；本地能力节点显示初始冷却 240 秒、使用冷却 240 秒。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |
| 休伯利安号 | VoidCoopSummonHyperion | SummonHyperionVoid | 无 | CoopCasterRaynor | 冷却 初始 300 秒，使用 360 秒，位置 Unit | 召唤休伯利安号战列巡航舰进行临时支援，休伯利安号可被控制，并持续60秒。；召唤可控休伯利安号；本地能力节点显示初始冷却 300 秒、使用冷却 360 秒。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |

## 斯台特曼

| 面板技能 | ability | button | requirement | caster | 费用/冷却/充能 | 具体效果 | 状态 |
|---|---|---|---|---|---|---|---|
| 切换成“艾的呵护”设定 | PowerFieldHPRegenerationOn | PowerFieldHPRegeneration | 无 | CoopCasterStetmann | 无显式费用/冷却字段 | 允许“爱心区域”给予斯台特曼的单位[未解析:$UpgradeEffectArrayValue:PowerFieldHPRegeneration:Behavior,PowerFieldBuffSelfStetmann,PowerStageArray[1].Modification.VitalRegenArray[Life]$ + Effect,MasteryStetmannStetzoneBonusesHPRegenerationSelfDisplayDummy,Amount]点每秒生命恢复。盟友单位获得[未解析:$UpgradeEffectArrayValue:PowerFieldHPRegeneration:Behavior,PowerFieldBuffAllyStetmann,PowerStageArray[1].Modification.VitalRegenArray[Life]$ + Effect,MasteryStetmannStetzoneBonusesHPRegenerationAllyDisplayDummy,Amount]点每秒生命恢复。；艾的呵护：切换斯台特区到生命恢复配置，给范围内友方单位提供治疗向增益。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |
| 切换成“艾的滋润”设定 | PowerFieldEnergyRegenerationOn | PowerFieldEnergyRegeneration | 无 | CoopCasterStetmann | 无显式费用/冷却字段 | “爱心区域”每秒给予斯台特曼的单位[未解析:$UpgradeEffectArrayValue:PowerFieldEnergyRegeneration:Behavior,PowerFieldBuffSelfStetmann,PowerStageArray[1].Modification.VitalRegenArray[Energy]$ + Effect,MasteryStetmannStetzoneBonusesEnergyRegenerationSelfDisplayDummy,Amount]点艾能恢复。盟友单位每秒获得[未解析:$UpgradeEffectArrayValue:PowerFieldEnergyRegeneration:Behavior,PowerFieldBuffAllyStetmann,PowerStageArray[1].Modification.VitalRegenArray[Energy]$ + Effect,MasteryStetmannStetzoneBonusesEnergyRegenerationAllyDisplayDummy,Amount]点能量恢复。；艾的滋润：切换斯台特区到能量恢复配置，给范围内友方单位提供能量恢复向增益。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |
| 切换成“艾的急切”设定 | PowerFieldMovementSpeedOn | PowerFieldMovementSpeed | 无 | CoopCasterStetmann | 无显式费用/冷却字段 | 允许“爱心区域”给予斯台特曼的单位[未解析:$UpgradeEffectArrayValue:PowerFieldMovementSpeed:Behavior,PowerFieldBuffSelfStetmann,PowerStageArray[1].Modification.MoveSpeedMultiplier$*100+Effect,MasteryStetmannStetzoneBonusesMovementSpeedSelfDisplayDummy,Amount]%移动速度加成。盟友单位获得[未解析:$UpgradeEffectArrayValue:PowerFieldMovementSpeed:Behavior,PowerFieldBuffAllyStetmann,PowerStageArray[1].Modification.AccelerationMultiplier$*100+Effect,MasteryStetmannStetzoneBonusesMovementSpeedAllyDisplayDummy,Amount]%移动速度加成。；艾的急切：切换斯台特区到移动速度配置，给范围内友方单位提供加速向增益。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |
| 部署艾星 | DeployPowerTowerStetmann | PowerTowerStetmannLevel1 | 无 | CoopCasterStetmann | 建造 PowerTowerStetmann，建造时间 2 秒 | 在目标位置部署一颗艾星。艾星必须放置在“爱心区域”中。；部署艾星：在目标点部署斯台特卫星，展开斯台特区。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |

## 斯托科夫

| 面板技能 | ability | button | requirement | caster | 费用/冷却/充能 | 具体效果 | 状态 |
|---|---|---|---|---|---|---|---|
| 亚历山大号 | StukovSummonAleksander | StukovSummonAleksander | StukovLevel10 | CoopCasterStukov | 冷却 初始 360 秒，使用 360 秒，位置 Player | 在目标位置呼叫亚历山大号被感染的战列巡航舰。亚历山大号可以被控制，持续作战60秒。；亚历山大号：召唤可控制的 UED 旗舰支援，具备感染/控制相关效果。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |
| 末日巨兽 | StukovSummonApocalisk | StukovSummonApocalisk | StukovLevel04 | CoopCasterStukov | 冷却 初始 240 秒，使用 300 秒，位置 Player | 在目标位置孵化一只末日巨兽。末日巨兽可以被控制，持续作战60秒。；末日巨兽：召唤末日巨兽；拥有潜地冲锋、范围伤害与对空攻击。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |
| 感染建筑 | SIStukovInfestStructure | SIStukovInfestStructure | 无 | CoopCasterStukov | 冷却 初始 180 秒，使用 90 秒 | 感染目标友方建筑，每秒治疗25点生命，并使其在20.03 秒内持续孵化60.09只巢虫。；感染建筑：使目标敌方建筑失效并生成感染体；升级版本效果更强。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |
| 感染建筑（升级） | SIStukovInfestStructureUpgraded | SIStukovInfestStructureUpgraded | 无 | CoopCasterStukov | 充能 最大 3，每次 1，恢复 90 秒 | 感染友方或敌方建筑，使其在20.03秒内孵化[未解析:Effect,SIStukovInfestStructureBroodlingsCU,SpawnCount*Behavior,SIStukovInfestStructureEnemyTarget,Duration*Behavior,SIStukovInfestStructureEnemyTarget,PeriodicEffectRateMultiplier/Behavior,SIStukovInfestStructureEnemyTarget,Period]只巢虫。在效果持续时间内，友方建筑每秒恢复25点生命值，敌方建筑则会丧失功能。；感染建筑（升级）：升级后的感染建筑顶部条能力，强化感染/生成效果。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |
| 部署灵能发射器 | SIStukovPlaceHordeRally | SIStukovPlaceHordeRallyTopBar | 无 | CoopCasterStukov | 无显式费用/冷却字段 | 将当前已有和后续新造的被感染的步兵单位派往指定地点。；灵能发射器：设置感染人群的集结/行军目标点。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |

## 斯旺

| 面板技能 | ability | button | requirement | caster | 费用/冷却/充能 | 具体效果 | 状态 |
|---|---|---|---|---|---|---|---|
| 作战空投 | SpecialDelivery | SpecialDelivery | 无 | CoopCasterSwann | 冷却 初始 240 秒，使用 240 秒，位置 Player | 召唤4台武装机器人，使降落区域中的敌方地面单位昏迷。武装机器人可以控制并会战斗60秒。；作战空投：在目标区域投放斯旺的战斗支援部队。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |
| 汇聚射线 | DrakkenLaserDrillConcentratedBeamIssueOrder | DrakkenLaserDrillBFGIO | HaveLaserDrillBFG | CoopCasterSwann | 无显式费用/冷却字段 | 对一条直线上的敌方单位造成400点伤害，长度为整个地图。；汇聚射线：激光钻机发射直线高伤害射线。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |
| 德拉肯激光钻机攻击 | DrakkenLaserDrillAttackIssueOrder | DrakkenLaserDrillAttackIssueOrder | HaveLaserDrill | CoopCasterSwann | 无显式费用/冷却字段 | 使用德拉肯激光钻机进行攻击，造成每秒20点伤害。射程无限。；激光钻机攻击：命令德拉肯激光钻机攻击指定目标。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |
| 脉冲炮 | DrakkenLaserDrillPulseCannonIssueOrder | DrakkenLaserDrillPulseCannonIO | HaveLaserDrillNuke | CoopCasterSwann | 无显式费用/冷却字段 | 对目标区域的敌方单位和建筑造成600点伤害。；脉冲炮：激光钻机发射大范围高伤害脉冲炮。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |

## 泰凯斯

| 面板技能 | ability | button | requirement | caster | 费用/冷却/充能 | 具体效果 | 状态 |
|---|---|---|---|---|---|---|---|
| 医疗运输机空运 | TychusMedicTransportLoadUnits | TychusMedicTransportUnitsTopBar | HaveMedivacPlatformGlobal | CoopCasterTychus | 冷却 使用 120 秒 | 立即将目标区域内的所有不法之徒运送到指定位置，下机时获得治疗和隐身效果。如果这些单位受到攻击，他们获得的治疗和隐身效果都会消失。；医疗运输机空运：立即把目标区域不法之徒运输到指定位置，下机获得治疗和隐身，受击后效果消失。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |
| 巨炮乱射 | TychusOdinBarrage | TychusOdinRedButton | 无 | TychusOdin | 充能 最大 1，每次 1 | 击晕一个大范围内的所有敌人，并在5秒内造成1000点伤害。；巨炮乱射：大范围击晕敌人，并在持续时间内造成多段伤害。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |
| 空投奥丁 | TychusCalldownOdinTargeted | TychusCalldownOdin | TychusLevel03 | CoopCasterTychus | 冷却 初始 600 秒，使用 360 秒，位置 Player | 将奥丁空投至目标位置，落地时造成150点伤害。奥丁需要泰凯斯驾驶。如果泰凯斯失去作战能力，空投奥丁还会将其复活。奥丁可以被控制60秒。；空投奥丁：将奥丁空投到目标位置，落地造成伤害；奥丁由泰凯斯驾驶，可持续一段时间。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |
| 红色按钮 | TychusOdinNuclearStrike | TychusOdinNuclearStrike | 无 | TychusOdin | 充能 最大 1，每次 1 | 朝目标位置呼叫一次聚变打击。聚变打击需要[未解析:Effect,OdinNukePersistent,InitialDelay+Effect,OdinNukePersistent,ExpireDelay]秒才能生效，但可对大范围内的目标造成最多1000点伤害。；红色按钮：向目标位置呼叫聚变打击，延迟后对大范围目标造成高额伤害。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |

## 沃拉尊

| 面板技能 | ability | button | requirement | caster | 费用/冷却/充能 | 具体效果 | 状态 |
|---|---|---|---|---|---|---|---|
| 黑洞 | VoidSentryBlackHole | SOAVorazunBlackHole | 无 | SoACasterVorazun | 能量 25 | 制造一个黑洞，将敌方单位吸入并使它们昏迷。持续8秒。；黑洞；本地能力节点显示消耗 25 能量，效果链来自黑洞能力。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |
| 黑暗水晶塔 | SOADarkPylon | SOADarkPylon | 无 | SoACasterVorazun | 建造 DarkPylon，建造时间 3 秒，能量 25，冷却 60 秒 | 折跃一座黑暗水晶塔，提供补给和能量。黑暗水晶塔还会使附近的友方单位和建筑隐形。；召唤黑暗水晶塔；本地建造项显示消耗 25 能量、建造 3 秒、冷却 60 秒。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |
| 暗影卫队 | SOAShadowGuardCalldown | SOAShadowGuardCalldown | 无 | SoACasterVorazun | 能量 50；冷却 初始 180 秒，使用 180 秒 | 向目标位置部署2名精英黑暗圣堂武士，持续60秒。；召唤暗影卫队；本地效果显示生成 2 个 VorazunShadowGuard，能力消耗 50 能量、初始/使用冷却 180 秒。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |
| 时间停止 | SOATimeFreeze | SOATimeFreeze | HaveSOATimeFreeze | SoACasterVorazun | 冷却 初始 300 秒，使用 300 秒 | 改变时间与空间，使所有敌人原地静止20秒。射程无限。；时间停止：冻结所有敌人；官方战役/合作文本提供效果说明，当前 profile 已接 ability/button/requirement/caster。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |
| 时间停止（威望版） | CommanderPrestigeVorazunTimeStop | SOATimeFreeze | HaveSOATimeFreeze | SoACasterVorazun | 冷却 初始 300 秒，使用 300 秒 | 改变时间与空间，使所有敌人原地静止20秒。射程无限。；时间停止威望版：本地能力节点显示初始冷却 300 秒、使用冷却 300 秒，并复用时间停止按钮。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |

## 扎加拉

| 面板技能 | ability | button | requirement | caster | 费用/冷却/充能 | 具体效果 | 状态 |
|---|---|---|---|---|---|---|---|
| 爆虫弹幕 | ZagaraVoidCoopBanelingBarrage | ZagaraVoidCoopBanelingBarrage | 无 | ZagaraVoidCoop | 能量 50；冷却 使用 10 秒，位置 Player，链接 ZagaraVoidCoopBanelingBarrage | 向目标点发射4枚爆虫，每枚爆虫会造成40点爆炸伤害(80 vs 建筑)。；爆虫弹幕：扎加拉向目标区域投放/发射爆虫，对地面区域造成爆炸伤害。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |
| 猎杀者 | ZagaraVoidCoopSpawnHunterKillers | ZagaraVoidCoopSpawnHunterKillers | 无 | ZagaraVoidCoop | 能量 60；冷却 使用 30 秒，位置 Player，链接 ZagaraVoidCoopSpawnHunterKillers | 在目标点孵化4只屠猎者，持续20秒。；猎杀者：召唤猎杀者支援扎加拉作战。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |
| 群体狂暴 | ZagaraVoidCoopMassFrenzy | ZagaraVoidCoopMassFrenzy | 无 | ZagaraVoidCoop | 能量 25；冷却 使用 90 秒，位置 Player，链接 ZagaraVoidCoopMassFrenzy | 使地图上所有友方单位的攻击速度提高25%，移动速度提高25%，持续15秒。；群体狂暴：提高友方单位的攻击速度和移动速度。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |
| 感染空投 | ZagaraVoidCoopMassRoachDrop | MassRoachDrop | ZagaraLevel02 | ZagaraVoidCoop | 冷却 初始 600 秒，使用 180 秒，位置 Player，链接 ZagaraVoidCoopInfestedPods | 空投10个空投囊到目标区域，每个空投囊造成50点伤害，并投放总计10只蟑螂，持续30秒。；感染空投：向战场空投装有蟑螂的孢子，蟑螂一段时间后死亡。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |

## 泽拉图

| 面板技能 | ability | button | requirement | caster | 费用/冷却/充能 | 具体效果 | 状态 |
|---|---|---|---|---|---|---|---|
| 精华化身 | ZeratulTopBarUltimateWarpTrain | ZeratulArtifactUpgradeTier3B | HaveZeratulArtifactUpgradeTier3B | CoopCasterZeratul | 建造 ZeratulXelNagaConstruct，建造时间 1 秒，冷却 300 秒；建造 ZeratulXelNagaConstructCyan，建造时间 1 秒，冷却 300 秒 | 在目标位置召唤进化潜能的具象体——精华化身。精华化身可被操控作战60秒。；精华化身：泽拉图终极神器分支之一，通过终极折跃训练能力召唤。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |
| 形体化身 | ZeratulTopBarUltimateWarpTrain | ZeratulArtifactUpgradeTier3A | HaveZeratulArtifactUpgradeTier3A | CoopCasterZeratul | 建造 ZeratulXelNagaConstruct，建造时间 1 秒，冷却 300 秒；建造 ZeratulXelNagaConstructCyan，建造时间 1 秒，冷却 300 秒 | 在目标位置召唤灵能潜能的具象体——形体化身。形体化身可被操控作战60秒。；形体化身：泽拉图终极神器分支之一，通过终极折跃训练能力召唤。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |
| 塞达斯军团 | ZeratulTopBarWarpTrain | ZeratulSummonDarkArchon | HaveZeratulArtifactUpgradeTier0C | CoopCasterZeratul | 建造 ZeratulSummonKarass，建造时间 1 秒，冷却 120 秒；建造 Mohandar，建造时间 1 秒，冷却 120 秒；建造 ZeratulHeroDarkArchon，建造时间 1 秒，冷却 120 秒；建造 ZeratulKhaydarinMonolith，建造时间 1 秒；建造 ZeratulXelNagaConstruct，冷却 300 秒；建造 ZeratulSuppressionCrystal | 召唤塞达斯及其传奇般的黑暗执政官军团支援战场。该军团无法被直接控制，但可以使用顶部技能条对其进行指引。军团将参战60秒。；塞达斯军团：折跃传奇军团分支，生成黑暗执政官相关支援。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |
| 特布鲁斯军团 | ZeratulTopBarWarpTrain | ZeratulSummonKarass | HaveZeratulArtifactUpgradeTier0A | CoopCasterZeratul | 建造 ZeratulSummonKarass，建造时间 1 秒，冷却 120 秒；建造 Mohandar，建造时间 1 秒，冷却 120 秒；建造 ZeratulHeroDarkArchon，建造时间 1 秒，冷却 120 秒；建造 ZeratulKhaydarinMonolith，建造时间 1 秒；建造 ZeratulXelNagaConstruct，冷却 300 秒；建造 ZeratulSuppressionCrystal | 召唤特布鲁斯及其传奇般的狂热者军团支援战场。该军团无法被直接控制，但可以使用顶部技能条对其进行指引。军团将参战60秒。；特布鲁斯军团：折跃传奇军团分支，生成狂热者/特布鲁斯相关支援。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |
| 部署超维空间巨石 | ZeratulTopBarBuild | ZeratulKhaydarinMonolith | HaveZeratulArtifactUpgradeTier1C | CoopCasterZeratul | 建造 ZeratulKhaydarinMonolith，建造时间 1 秒 | 在目标位置部署超维空间巨石。超维空间巨石可以击晕敌人，进行自我投射，保护自己免受伤害。；部署超维空间巨石：在目标位置部署超维空间巨石防御建筑。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |
| 静滞射线 | ZeratulMapWideStasisIssueOrder | ZeratulMapWideStasis | HaveZeratulArtifactUpgradeTier1A | CoopCasterZeratul | 无显式费用/冷却字段 | 从神器储放台中迸射出一道光束，使敌人陷入静滞状态，持续15秒。该状态下的敌人无法移动、攻击，也无法被攻击或受到技能影响。；静滞射线：发射线形静滞射线，使命中的敌人无法移动、攻击或受到伤害。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |
| 佐拉亚军团 | ZeratulTopBarWarpTrain | ZeratulSummonMohandar | HaveZeratulArtifactUpgradeTier0B | CoopCasterZeratul | 建造 ZeratulSummonKarass，建造时间 1 秒，冷却 120 秒；建造 Mohandar，建造时间 1 秒，冷却 120 秒；建造 ZeratulHeroDarkArchon，建造时间 1 秒，冷却 120 秒；建造 ZeratulKhaydarinMonolith，建造时间 1 秒；建造 ZeratulXelNagaConstruct，冷却 300 秒；建造 ZeratulSuppressionCrystal | 召唤佐拉亚及其传奇般的虚空辉光舰军团支援战场。该军团无法被直接控制，但可以使用顶部技能条对其进行指引。军团将参战60秒。；佐拉亚军团：折跃传奇军团分支，生成虚空辉光舰相关支援。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |
| 指引传奇军团 | RallyZeratulTopBarRedirect | RallyZeratulTopBarRedirect | HaveZeratulLegionUnits | CoopCasterZeratul | 无显式费用/冷却字段 | 将传奇军团派往新的位置。；指引传奇军团：重定向已召唤传奇军团的集结/攻击目标。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |
| 虚空抑制晶体 | ZeratulTopBarWarpTrain | ZeratulSuppressionCrystal | HaveZeratulArtifactUpgradeTier1B | CoopCasterZeratul | 建造 ZeratulSummonKarass，建造时间 1 秒，冷却 120 秒；建造 Mohandar，建造时间 1 秒，冷却 120 秒；建造 ZeratulHeroDarkArchon，建造时间 1 秒，冷却 120 秒；建造 ZeratulKhaydarinMonolith，建造时间 1 秒；建造 ZeratulXelNagaConstruct，冷却 300 秒；建造 ZeratulSuppressionCrystal | 召唤一枚无敌的虚空抑制晶体，使敌方单位的移动和攻击速度降低70%，并瘫痪邻近的敌方建筑。虚空抑制晶体可以被控制30秒。；虚空抑制晶体：部署晶体并提供抑制场，压制范围内敌人。 | profile 已接；ability/button/requirement/caster 可解析；未实机施法 |

## 剩余风险

- `profile 已接` 只代表测试台能扫到条目，并且 Catalog metadata 可解析；它不等价于进图后按钮一定出现、目标模式一定正确、效果一定播放。
- 阿塔尼斯、沃拉尊的部分 SOA 技能来自 `Void.SC2Campaign` 依赖；XMFinal 的 `DocumentInfo` 已依赖该战役包，但仍要实机验证目标模式和按钮状态。
- 凯瑞甘、雷诺、阿拉纳克、凯拉克斯等技能已把合作 Catalog 节点导入 XMFinal，但部分效果链还依赖 actor/model/sound/validator 的递归闭包，当前静态审计只能证明没有硬缺 ID。

