# 泰凯斯 / `Tychus` 科技链路排查 / Tech Tree Diagnostics

- 描述 / Description：无 / None
- 数据来源 / Data source：当前 Mod / Current Mod，目录 / Directory：`合作指挥官版起义狂潮/Mods/XM/XMTychus.SC2Mod`
- 当前 Mod 运行名册 / Current Mod roster：module=`XMTychus.SC2Mod`，instance=`Tychus`
- 统计 / Stats：建筑 4、生产链补充建筑 0、单位 2、英雄 9、建筑按钮 50、单位按钮 15、效果引用 51
- 名称显示 / Name display：能从当前 Mod zhCN 解析时显示“中文名 / `英文ID`”；仅显示 `ID` 表示当前 Mod 未找到可用中文名。

## 初始化/开局单位 / Initial Opener

| 槽位 / Slot | 单位 / Unit | 预期类型 / Expected Kind | Catalog 父级 / Catalog Parent | 是否在运行名册 / In Runtime Roster | 来源 / Source |
| --- | --- | --- | --- | --- | --- |
| 初始基地 / Command Center | 指挥中心 / `TychusCommandCenter` | building | - | 否 / No | Catalog xmtychus，Instance Tychus，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMTychus.SC2Mod/Base.SC2Data/GameData/UserData.xml` |
| 初始工人 / Worker | `TychusSCV` | unit | - | 是 / Yes | Catalog xmtychus，Instance Tychus，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMTychus.SC2Mod/Base.SC2Data/GameData/UserData.xml`，名册状态 / Roster status exact |
| 第二初始单位 / Second Unit | 乔伊·雷酒吧 / `TychusResearchCenter` | unit | - | 否 / No | Catalog xmtychus，Instance Tychus，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMTychus.SC2Mod/Base.SC2Data/GameData/UserData.xml` |

## 指挥官默认/顶部技能 / Commander Default / Top-panel Skills

| 技能名 / Skill Name | Ability/Cmd | 类型 / Type | 效果引用 / Effect References | Catalog 来源 / Catalog Sources |
| --- | --- | --- | --- | --- |
| 医疗运输机空运 / `TychusMedicTransportLoad` | `TychusMedicTransportLoad,Execute` | 目标效果技能 / CAbilEffectTarget | 区域枚举效果 / CEffectEnumArea:`TychusMedicTransportPreS` | xmtychus:1 |
| 医疗运输机空运 / `TychusMedicTransportUnitsTopBar` | `-` | 未解析 / Unresolved | - | - |
| `TychusCalldownOdinTargeted` | `TychusCalldownOdinTargeted,Execute` | 目标效果技能 / CAbilEffectTarget | 创建单位效果 / CEffectCreateUnit:`TychusCalldownOdinCreateUnit`、区域枚举效果 / CEffectEnumArea:`TychusCalldownOdinSearchArea` | xmtychus:1 |

## 建筑 / Buildings

### 枪王藏身处 / `TychusMercCompound`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMTychus.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Structure，种族 / Race Terr，生命 / Life 750，费用 / Cost 150/0
- Catalog 技能链接 / Catalog ability links：`BuildInProgress`(基础 / Basic)、`TychusHeroResearch2`(研究技能 / CAbilResearch)
- 关联 Behavior / Linked behaviors：`TerranBuildingBurnDown`、`UnderConstruction`
- 已隐藏基础按钮 / Hidden basic buttons：3 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | 泰凯斯·芬利 / `TychusACHeroDesc` | `-` | 未解析 / Unresolved | - | - | - |
| 0,1 | 购买KD9a型聚爆核心 / `TychusHeroResearch2` | `TychusHeroResearch2,Research13` | 研究技能 / CAbilResearch | 升级 / Upgrade:`TychusACImplosionGrenades` | - | - |
| 0,2 | 购买钒钢弹壳 / `TychusHeroResearch2` | `TychusHeroResearch2,Research15` | 研究技能 / CAbilResearch | 升级 / Upgrade:`TychusACRageGrenades` | - | - |
| 0,3 | 购买凯莫瑞安碎甲弹 / `TychusHeroResearch2` | `TychusHeroResearch2,Research14` | 研究技能 / CAbilResearch | 升级 / Upgrade:`TychusACPiercingRounds` | - | - |
| 0,4 | `TychusHeroResearch2` | `TychusHeroResearch2,Research16` | 研究技能 / CAbilResearch | 升级 / Upgrade:`TychusACBandofBrothers` | - | - |
| 1,0 | “老油条”萨姆 / `TychusReaperDesc` | `-` | 未解析 / Unresolved | - | - | TychusPassiveReaper |
| 1,1 | 购买拉尔斯科技G7型炸弹 / `TychusHeroResearch2` | `TychusHeroResearch2,Research17` | 研究技能 / CAbilResearch | 升级 / Upgrade:`TychusReaperBombDamage` | - | - |
| 1,2 | 购买莫比斯拘束矩阵 / `TychusHeroResearch2` | `TychusHeroResearch2,Research19` | 研究技能 / CAbilResearch | 升级 / Upgrade:`TychusReaperBombStun` | - | - |
| 1,3 | 购买普罗希昂遮光服 / `TychusHeroResearch2` | `TychusHeroResearch2,Research20` | 研究技能 / CAbilResearch | 升级 / Upgrade:`TychusReaperEvasionBuff` | - | - |
| 1,4 | `TychusHeroResearch2` | `TychusHeroResearch2,Research18` | 研究技能 / CAbilResearch | 升级 / Upgrade:`TychusReaperBombCharges` | - | - |
| 2,0 | `TychusWarhoundDesc` | `-` | 未解析 / Unresolved | - | - | TychusPassiveWarhound |
| 2,1 | `TychusHeroResearch2` | `TychusHeroResearch2,Research23` | 研究技能 / CAbilResearch | 升级 / Upgrade:`TychusWarhoundHaywireMissiles` | - | - |
| 2,2 | `TychusHeroResearch2` | `TychusHeroResearch2,Research22` | 研究技能 / CAbilResearch | 升级 / Upgrade:`TychusWarhoundFear` | - | - |
| 2,3 | `TychusHeroResearch2` | `TychusHeroResearch2,Research24` | 研究技能 / CAbilResearch | 升级 / Upgrade:`TychusWarhoundDeathExplosion` | - | - |
| 2,4 | `TychusHeroResearch2` | `TychusHeroResearch2,Research21` | 研究技能 / CAbilResearch | 升级 / Upgrade:`TychusWarhoundTurretUpgrade` | - | - |

### 鬼手安全屋 / `TychusGhostAcademy`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMTychus.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Structure，种族 / Race Terr，生命 / Life 750，费用 / Cost 150/0
- Catalog 技能链接 / Catalog ability links：`BuildInProgress`(基础 / Basic)、`TychusHeroResearch2`(研究技能 / CAbilResearch)
- 关联 Behavior / Linked behaviors：`TerranBuildingBurnDown`、`UnderConstruction`
- 已隐藏基础按钮 / Hidden basic buttons：4 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | `TychusGhostDesc` | `-` | 未解析 / Unresolved | - | - | TychusPassiveGhost |
| 0,1 | `TychusHeroResearch2` | `TychusHeroResearch2,Research2` | 研究技能 / CAbilResearch | 升级 / Upgrade:`TychusGhostDominateBuff` | - | - |
| 0,2 | `TychusHeroResearch2` | `TychusHeroResearch2,Research1` | 研究技能 / CAbilResearch | 升级 / Upgrade:`TychusGhostDominatingDomination` | - | - |
| 0,3 | `TychusHeroResearch2` | `TychusHeroResearch2,Research4` | 研究技能 / CAbilResearch | 升级 / Upgrade:`TychusGhostPsychicSnare` | - | - |
| 0,4 | `TychusHeroResearch2` | `TychusHeroResearch2,Research3` | 研究技能 / CAbilResearch | 升级 / Upgrade:`TychusGhostConcentrationHelmet` | - | - |
| 1,0 | 纳克斯 / `TychusSpectreDesc` | `-` | 未解析 / Unresolved | - | - | TychusPassiveSpectre |
| 1,1 | 购买T4云爆弹 / `TychusHeroResearch2` | `TychusHeroResearch2,Research5` | 研究技能 / CAbilResearch | 升级 / Upgrade:`TychusSpectreSuperUltrasonicPulse` | - | - |
| 1,2 | 购买超声波放大器 / `TychusHeroResearch2` | `TychusHeroResearch2,Research7` | 研究技能 / CAbilResearch | 升级 / Upgrade:`TychusSpectreVisionSuit` | - | - |
| 1,3 | 购买水晶增幅器 / `TychusHeroResearch2` | `TychusHeroResearch2,Research6` | 研究技能 / CAbilResearch | 升级 / Upgrade:`TychusSpectreExtendedPulseGun` | - | - |
| 1,4 | `TychusHeroResearch2` | `TychusHeroResearch2,Research8` | 研究技能 / CAbilResearch | 升级 / Upgrade:`TychusSpectreBrillianceAura` | - | - |
| 2,0 | 莱纳·尼卡拉中尉 / `TychusMedicDesc` | `-` | 未解析 / Unresolved | - | - | TychusPassiveMedic |
| 2,1 | 购买尤摩扬纳米修复机器人 / `TychusHeroResearch2` | `TychusHeroResearch2,Research9` | 研究技能 / CAbilResearch | 升级 / Upgrade:`TychusMedicAdvancedHealingSpray` | - | - |
| 2,2 | 购买普罗希昂血清 / `TychusHeroResearch2` | `TychusHeroResearch2,Research11` | 研究技能 / CAbilResearch | 升级 / Upgrade:`TychusMedicSuperHealing` | - | - |
| 2,3 | 购买普罗希昂双管治疗射线护手 / `TychusHeroResearch2` | `TychusHeroResearch2,Research10` | 研究技能 / CAbilResearch | 升级 / Upgrade:`TychusMedicDoubleBeam` | - | - |
| 2,4 | `TychusHeroResearch2` | `TychusHeroResearch2,Research12` | 研究技能 / CAbilResearch | 升级 / Upgrade:`TychusMedicDefensiveMatrix` | - | - |

### 猛男军械库 / `TychusArmory`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMTychus.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Structure，种族 / Race Terr，生命 / Life 750，费用 / Cost 150/0
- Catalog 技能链接 / Catalog ability links：`BuildInProgress`(基础 / Basic)、`TychusHeroResearch`(研究技能 / CAbilResearch)
- 关联 Behavior / Linked behaviors：`TerranBuildingBurnDown`、`UnderConstruction`
- 已隐藏基础按钮 / Hidden basic buttons：3 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | 迈尔斯“布雷泽”刘易斯 / `TychusFirebatDesc` | `-` | 未解析 / Unresolved | - | - | TychusPassiveFirebat |
| 0,1 | 购买高容积储油罐 / `TychusHeroResearch` | `TychusHeroResearch,Research9` | 研究技能 / CAbilResearch | 升级 / Upgrade:`TychusFirebatPremiumPetroleum` | - | - |
| 0,2 | 购买哈迪斯浮油 / `TychusHeroResearch` | `TychusHeroResearch,Research10` | 研究技能 / CAbilResearch | 升级 / Upgrade:`TychusFirebatBlueFlameOil` | - | - |
| 0,3 | 购买狂焰牌燃料添加剂 / `TychusHeroResearch` | `TychusHeroResearch,Research11` | 研究技能 / CAbilResearch | 升级 / Upgrade:`TychusFirebatIncendiaryPetroleum` | - | - |
| 0,4 | `TychusHeroResearch` | `TychusHeroResearch,Research12` | 研究技能 / CAbilResearch | 升级 / Upgrade:`TychusFirebatShield` | - | - |
| 1,0 | `TychusHERCDesc` | `-` | 未解析 / Unresolved | - | - | TychusPassiveHERC |
| 1,1 | `TychusHeroResearch` | `TychusHeroResearch,Research5` | 研究技能 / CAbilResearch | 升级 / Upgrade:`TychusHercGrappleStun` | - | - |
| 1,2 | `TychusHeroResearch` | `TychusHeroResearch,Research6` | 研究技能 / CAbilResearch | 升级 / Upgrade:`TychusHercGrappleArmor` | - | - |
| 1,3 | `TychusHeroResearch` | `TychusHeroResearch,Research7` | 研究技能 / CAbilResearch | 升级 / Upgrade:`TychusHercRage` | - | - |
| 1,4 | `TychusHeroResearch` | `TychusHeroResearch,Research8` | 研究技能 / CAbilResearch | 升级 / Upgrade:`TychusHercCrit` | - | - |
| 2,0 | `TychusMarauderDesc` | `-` | 未解析 / Unresolved | - | - | TychusPassiveMarauder |
| 2,1 | `TychusHeroResearch` | `TychusHeroResearch,Research2` | 研究技能 / CAbilResearch | 升级 / Upgrade:`TychusMarauderHealingWardBuff` | - | - |
| 2,2 | `TychusHeroResearch` | `TychusHeroResearch,Research3` | 研究技能 / CAbilResearch | 升级 / Upgrade:`TychusMarauderHealingWardSpeedBuff` | - | - |
| 2,3 | `TychusHeroResearch` | `TychusHeroResearch,Research1` | 研究技能 / CAbilResearch | 升级 / Upgrade:`TychusMarauderSuperStim` | - | - |
| 2,4 | `TychusHeroResearch` | `TychusHeroResearch,Research4` | 研究技能 / CAbilResearch | 升级 / Upgrade:`TychusMarauderAttackSplash` | - | - |

### 战狼炮台 / `TychusWarhoundAutoTurret`

- 来源 / Source：名册 / Roster XMFinal CommanderBuildings.galaxy，状态 / Status galaxy，模块 / Module XMTychus.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146_CommanderBuildings.galaxy`
- 数值 / Stats：类型 / Type Structure，种族 / Race Terr，生命 / Life 150，费用 / Cost 150/0
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`BuildInProgress`(基础 / Basic)、`stop`(基础 / Basic)、`TychusWarhoundTurretTornadoSprayMissile`(瞬发效果技能 / CAbilEffectInstant)
- 关联 Behavior / Linked behaviors：`Detector7`、`FireSuppressionSystem`、`NoScrapDrop`、`TerranBuildingBurnDown`
- 已隐藏基础按钮 / Hidden basic buttons：2 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | SA-55型霹雳飞弹 / `TychusWarhoundTurretTornadoSprayMissile` | `TychusWarhoundTurretTornadoSprayMissile,Execute` | 瞬发效果技能 / CAbilEffectInstant | - | 持续效果 / CEffectCreatePersistent:`TychusWarhoundTurretTornadoMissileCP` | - |
| 1,1 | 莫比斯M34型恐惧弹 / `TychusWarhoundTurretFearUpgradePassive` | `-` | 未解析 / Unresolved | - | - | HaveTychusWarhoundFearUpgrade |
| 1,2 | D99型起爆器 / `TychusWarhoundTurretDeathExplosionUpgradePassive` | `-` | 未解析 / Unresolved | - | - | HaveTychusWarhoundDeathExplosionUpgrade |
| 1,3 | `TychusWarhoundTurretUpgradePassive` | `-` | 未解析 / Unresolved | - | - | HaveTychusWarhoundTurretUpgrade |
| 1,4 | `Detector` | `-` | 未解析 / Unresolved | - | - | - |

## 生产链补充建筑 / Production-support Buildings

- 无 / None

## 单位 / Units

### `Marauder`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMTychus.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`move`(基础 / Basic)、`StimpackMarauder`、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | `StimpackMarauder` | `StimpackMarauder,Execute` | 未解析 / Unresolved | - | - | - |

### `TychusSCV`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMTychus.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race Terr，生命 / Life 45，费用 / Cost 50/0，补给 / Supply 1
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`move`(基础 / Basic)、`Repair`、`SCVHarvest`(采集技能 / CAbilHarvest)、喷漆-人类 / `SprayTerran`、`stop`(基础 / Basic)、`TychusTerranBuild`(建造技能 / CAbilBuild)
- 可生产/创建 / Produced or created：`Refinery`（非本指挥官名册 / not in current commander roster），耗时 / Time 30s、猛男军械库 / `TychusArmory`，耗时 / Time 30s、`TychusCommandCenter`（非本指挥官名册 / not in current commander roster），耗时 / Time 100s、`TychusEngineeringBay`（非本指挥官名册 / not in current commander roster），耗时 / Time 35s、鬼手安全屋 / `TychusGhostAcademy`，耗时 / Time 30s、`TychusMedivacPlatform`（非本指挥官名册 / not in current commander roster），耗时 / Time 60s、枪王藏身处 / `TychusMercCompound`，耗时 / Time 30s、`TychusResearchCenter`（非本指挥官名册 / not in current commander roster），耗时 / Time 40s、`TychusSCVAutoTurret`（非本指挥官名册 / not in current commander roster），耗时 / Time 25s
- 已隐藏基础按钮 / Hidden basic buttons：7 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | `SCVHarvest` | `SCVHarvest,Gather` | 采集技能 / CAbilHarvest | - | - | - |
| 1,1 | `SCVHarvest` | `SCVHarvest,Return` | 采集技能 / CAbilHarvest | - | - | - |
| 2,0 | `TerranBuild` | `-` | 未解析 / Unresolved | - | - | - |
| 2,2 | `Repair` | `Repair,Execute` | 未解析 / Unresolved | - | - | - |
| 2,3 | 喷漆-人类 / `SprayTerran` | `SprayTerran,Execute` | 未解析 / Unresolved | - | - | - |
| 0,0 | 建造指挥中心 / `TychusTerranBuild` | `TychusTerranBuild,Build6` | 建造技能 / CAbilBuild | `TychusCommandCenter`、单位 / Unit:`TychusCommandCenter` | - | - |
| 0,1 | `TychusTerranBuild` | `TychusTerranBuild,Build3` | 建造技能 / CAbilBuild | `Refinery`、单位 / Unit:`Refinery` | - | - |
| 1,0 | 建造乔伊·雷酒吧 / `TychusTerranBuild` | `TychusTerranBuild,Build13` | 建造技能 / CAbilBuild | `TychusResearchCenter`、单位 / Unit:`TychusResearchCenter` | - | - |
| 1,1 | 建造工程站 / `TychusTerranBuild` | `TychusTerranBuild,Build7` | 建造技能 / CAbilBuild | `TychusEngineeringBay`、单位 / Unit:`TychusEngineeringBay` | - | - |
| 1,2 | 制造自动机炮 / `TychusTerranBuild` | `TychusTerranBuild,Build5` | 建造技能 / CAbilBuild | `TychusSCVAutoTurret`、单位 / Unit:`TychusSCVAutoTurret` | - | - |
| 2,0 | 建造枪王藏身处 / `TychusTerranBuild` | `TychusTerranBuild,Build18` | 建造技能 / CAbilBuild | 枪王藏身处 / `TychusMercCompound`、单位 / Unit:枪王藏身处 / `TychusMercCompound` | - | - |
| 2,1 | 建造猛男军械库 / `TychusTerranBuild` | `TychusTerranBuild,Build16` | 建造技能 / CAbilBuild | 猛男军械库 / `TychusArmory`、单位 / Unit:猛男军械库 / `TychusArmory` | - | - |
| 2,2 | 建造鬼手安全屋 / `TychusTerranBuild` | `TychusTerranBuild,Build17` | 建造技能 / CAbilBuild | 鬼手安全屋 / `TychusGhostAcademy`、单位 / Unit:鬼手安全屋 / `TychusGhostAcademy` | - | - |
| 2,3 | 建造医疗运输机平台 / `TychusTerranBuild` | `TychusTerranBuild,Build14` | 建造技能 / CAbilBuild | `TychusMedivacPlatform`、单位 / Unit:`TychusMedivacPlatform` | - | - |

## 英雄 / Heroes

### 泰凯斯·芬利 / `TychusCoop`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMTychus.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：生命 / Life 600，费用 / Cost 0/0，提供补给 / Supply provided 0
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`TychusACBandofBrothers`(瞬发效果技能 / CAbilEffectInstant)、粉碎者手雷 / `TychusShredderGrenade`(目标效果技能 / CAbilEffectTarget)
- 已隐藏基础按钮 / Hidden basic buttons：1 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | `TychusACBandofBrothers` | `TychusACBandofBrothers,Execute` | 瞬发效果技能 / CAbilEffectInstant | - | 效果集合 / CEffectSet:`TychusACBandofBrothersSet` | - |
| 0,0 | 粉碎者手雷 / `TychusShredderGrenade` | `TychusShredderGrenade,Execute` | 目标效果技能 / CAbilEffectTarget | - | 持续效果 / CEffectCreatePersistent:`TychusShredderGrenadeDelay`、区域枚举效果 / CEffectEnumArea:`TychusShredderGrenadeSearch` | - |
| 1,0 | KD9a型聚爆核心 / `TychusACImplosionGrenades` | `TychusACImplosionGrenades,255` | 未解析 / Unresolved | - | - | HaveTychusACImplosionGrenades |
| 1,1 | 钒钢弹壳 / `TychusACRageGrenades` | `TychusACRageGrenades,255` | 未解析 / Unresolved | - | - | HaveTychusACRageGrenades |
| 1,2 | 凯莫瑞安碎甲弹 / `TychusACPiercingRounds` | `TychusACPiercingRounds,255` | 未解析 / Unresolved | - | - | HaveTychusACPiercingRounds |
| 1,3 | `TychusACBandofBrothers` | `TychusACBandofBrothers,255` | 瞬发效果技能 / CAbilEffectInstant | - | 效果集合 / CEffectSet:`TychusACBandofBrothersSet` | HaveTychusACBandofBrothers |

### 维嘉 / `TychusGhost`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMTychus.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、支配 / `TychusGhostDominate`(目标效果技能 / CAbilEffectTarget)、灵能投射器 / `TychusGhostPsychicSnare`(目标效果技能 / CAbilEffectTarget)
- 关联 Behavior / Linked behaviors：`TychusLoneWolf`、`TychusSquadDetector`
- 已隐藏基础按钮 / Hidden basic buttons：1 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | 支配 / `TychusGhostDominate` | `TychusGhostDominate,Execute` | 目标效果技能 / CAbilEffectTarget | - | 效果集合 / CEffectSet:`TychusGhostDominateSet` | - |
| 1,0 | 莫比斯灵能激发器 / `TychusGhostDominateBuff` | `TychusGhostDominateBuff,255` | 未解析 / Unresolved | - | - | HaveTychusGhostDominateBuff |
| 1,1 | 神经干扰器 / `TychusGhostDominatingDomination` | `TychusGhostDominatingDomination,255` | 未解析 / Unresolved | - | - | HaveTychusGhostConfusingDomination |
| 1,2 | 灵能投射器 / `TychusGhostPsychicSnare` | `TychusGhostPsychicSnare,Execute` | 目标效果技能 / CAbilEffectTarget | - | 施加行为效果 / CEffectApplyBehavior:`TychusGhostPsychicSnare`、发射弹体效果 / CEffectLaunchMissile:`TychusGhostPsychicSnareLM` | HaveTychusGhostPsychicSnare |
| 1,3 | `TychusGhostSnipe` | `TychusGhostSnipe,255` | 未解析 / Unresolved | - | - | HaveTychusGhostConcentrationHelmet |

### 莱纳·尼卡拉中尉 / `TychusMedic`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMTychus.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：生命 / Life 450
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、活力喷发 / `TychusMedicAoE`(瞬发效果技能 / CAbilEffectInstant)、`TychusMedicDefensiveMatrix`(目标效果技能 / CAbilEffectTarget)、`TychusMedivacDoubleHealPlusMech`(目标效果技能 / CAbilEffectTarget)、`TychusMedivacHealPlusMech`(目标效果技能 / CAbilEffectTarget)
- 关联 Behavior / Linked behaviors：`TychusLoneWolf`、`TychusSquadDetector`
- 已隐藏基础按钮 / Hidden basic buttons：2 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | 活力喷发 / `TychusMedicAoE` | `TychusMedicAoE,Execute` | 瞬发效果技能 / CAbilEffectInstant | - | 区域枚举效果 / CEffectEnumArea:`TychusMedicAoESearch` | - |
| 1,0 | 尤摩扬纳米修复机器人 / `TychusMedicHealingSprayUpgradePassive` | `-` | 未解析 / Unresolved | - | - | HaveTychusMedicAdvancedHealingSpray |
| 1,1 | 普罗希昂血清 / `TychusMedicHealUpgradeLevels` | `-` | 未解析 / Unresolved | - | - | HaveTychusMedicSuperHealing |
| 1,2 | 普罗希昂双管治疗射线护手 / `TychusMedicDoubleHeal` | `-` | 未解析 / Unresolved | - | - | HaveTychusMedicDoubleBeam |
| 1,3 | `TychusMedicDefensiveMatrix` | `TychusMedicDefensiveMatrix,Execute` | 目标效果技能 / CAbilEffectTarget | - | 效果集合 / CEffectSet:`TychusMedicDefensiveMatrixSet` | - |
| 1,4 | 超级治疗 / `TychusMedivacHealPlusMech` | `TychusMedivacHealPlusMech,Execute` | 目标效果技能 / CAbilEffectTarget | - | 创建治疗者效果 / CEffectCreateHealer:`TychusMedicHeal` | - |
| 1,4 | 超级治疗 / `TychusMedivacDoubleHealPlusMech` | `TychusMedivacDoubleHealPlusMech,Execute` | 目标效果技能 / CAbilEffectTarget | - | CEffectSwitch / CEffectSwitch:`TychusMedivacHealInitialSwitch` | - |

### 迈尔斯“布雷泽”刘易斯 / `TychusFirebat`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMTychus.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：生命 / Life 1000
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、浮油 / `TychusFirebatOilBomb`(目标效果技能 / CAbilEffectTarget)
- 关联 Behavior / Linked behaviors：`TychusFirebatShield`、`TychusLoneWolf`
- 已隐藏基础按钮 / Hidden basic buttons：1 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | 浮油 / `TychusFirebatOilBomb` | `TychusFirebatOilBomb,Execute` | 目标效果技能 / CAbilEffectTarget | - | 发射弹体效果 / CEffectLaunchMissile:`TychusFirebatOilBombLM`、区域枚举效果 / CEffectEnumArea:`TychusFirebatOilBombSearch` | - |
| 1,0 | 高容积储油罐 / `TychusFirebatPremiumPetroleum` | `TychusFirebatPremiumPetroleum,255` | 未解析 / Unresolved | - | - | HaveTychusFirebatPremiumPetroleum |
| 1,1 | 哈迪斯浮油 / `TychusFirebatBlueFlameOil` | `TychusFirebatBlueFlameOil,255` | 未解析 / Unresolved | - | - | HaveTychusFirebatBlueFlameOil |
| 1,2 | 狂焰牌燃料添加剂 / `TychusFirebatIncendiaryPetroleum` | `TychusFirebatIncendiaryPetroleum,255` | 未解析 / Unresolved | - | - | HaveTychusFirebatIncendiaryPetroleum |
| 1,3 | `TychusFirebatShield` | `TychusFirebatShield,255` | 未解析 / Unresolved | - | - | HaveTychusFirebatShield |

### 罗布“弹头哥”博斯韦尔 / `TychusHERC`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMTychus.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：生命 / Life 1000
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、猛烈撞击 / `TychusHercGrapple`(目标效果技能 / CAbilEffectTarget)
- 关联 Behavior / Linked behaviors：`TychusHercCritPassive`、`TychusHERCShieldCooldownDisplay`、`TychusLoneWolf`
- 可生产/创建 / Produced or created：`HERCPlacement`（非本指挥官名册 / not in current commander roster）
- 已隐藏基础按钮 / Hidden basic buttons：1 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | 猛烈撞击 / `TychusHercGrapple` | `TychusHercGrapple,Execute` | 目标效果技能 / CAbilEffectTarget | 效果创建 / Effect creates:`HERCPlacement` | 创建单位效果 / CEffectCreateUnit:`TychusHercGrappleCreatePlaceholder`、区域枚举效果 / CEffectEnumArea:`TychusHercGrappleLaunchCasterImpactSearch` | - |
| 1,0 | X-71型震击靴 / `TychusHercGrappleStun` | `TychusHercGrappleStun,255` | 未解析 / Unresolved | - | - | HaveTychusHercGrappleImpacts |
| 1,1 | 临界响应系统 / `TychusHercGrappleArmorLevels` | `-` | 未解析 / Unresolved | - | - | - |
| 1,2 | 红线能量电池 / `TychusHercRage` | `TychusHercRage,255` | 未解析 / Unresolved | - | - | HaveTychusHercRage |
| 1,3 | `TychusHercCrit` | `TychusHercCrit,255` | 未解析 / Unresolved | - | - | HaveTychusHercCrit |

### 纳克斯 / `TychusSpectre`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMTychus.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、超声波脉冲 / `TychusSpectreUltrasonicPulse`(目标效果技能 / CAbilEffectTarget)
- 关联 Behavior / Linked behaviors：`TychusLoneWolf`、`TychusSquadDetector`
- 已隐藏基础按钮 / Hidden basic buttons：1 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | 超声波脉冲 / `TychusSpectreUltrasonicPulse` | `TychusSpectreUltrasonicPulse,Execute` | 目标效果技能 / CAbilEffectTarget | - | 持续效果 / CEffectCreatePersistent:`TychusSpectreUltrasonicPulseCPLv1`、区域枚举效果 / CEffectEnumArea:`TychusSpectreUltrasonicSearchLv1` | - |
| 1,0 | T4云爆弹 / `TychusSpectreSuperUltrasonicPulse` | `TychusSpectreSuperUltrasonicPulse,255` | 未解析 / Unresolved | - | - | HaveTychusSpectreSuperUltrasonicPulse |
| 1,1 | 超声波放大器 / `TychusSpectreVisionSuit` | `TychusSpectreVisionSuit,255` | 未解析 / Unresolved | - | - | HaveTychusSpectreVisionSuit |
| 1,2 | 水晶增幅器 / `TychusSpectreExtendedPulseGun` | `TychusSpectreExtendedPulseGun,255` | 未解析 / Unresolved | - | - | HaveTychusSpectreExtendedPulseGun |
| 1,3 | `TychusSpectreBrillianceAura` | `TychusSpectreBrillianceAura,255` | 未解析 / Unresolved | - | - | HaveTychusSpectreBrillianceAura |

### 詹姆斯“天狼星”赛克斯 / `TychusWarhound`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMTychus.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：生命 / Life 650
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`TychusWarhoundBuildAutoTurret`(目标效果技能 / CAbilEffectTarget)、`TychusWarhoundTornadoSprayMissile`(瞬发效果技能 / CAbilEffectInstant)
- 可生产/创建 / Produced or created：战狼炮台 / `TychusWarhoundAutoTurret`
- 已隐藏基础按钮 / Hidden basic buttons：1 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | 部署战狼炮台 / `TychusWarhoundBuildAutoTurret` | `TychusWarhoundBuildAutoTurret,Execute` | 目标效果技能 / CAbilEffectTarget | 效果创建 / Effect creates:战狼炮台 / `TychusWarhoundAutoTurret` | 创建单位效果 / CEffectCreateUnit:`TychusWarhoundAutoTurretRelease` | - |
| 1,0 | SA-55型霹雳飞弹 / `TychusWarhoundTornadoSprayMissile` | `TychusWarhoundTornadoSprayMissile,Execute` | 瞬发效果技能 / CAbilEffectInstant | - | 持续效果 / CEffectCreatePersistent:`TychusWarhoundTornadoMissileCP` | - |
| 1,1 | 莫比斯M34型恐惧弹 / `TychusWarhoundFearUpgradePassive` | `-` | 未解析 / Unresolved | - | - | HaveTychusWarhoundFearUpgrade |
| 1,2 | D99型起爆器 / `TychusWarhoundDeathExplosionUpgradePassive` | `-` | 未解析 / Unresolved | - | - | HaveTychusWarhoundDeathExplosionUpgrade |
| 1,3 | `TychusWarhoundTurretUpgradePassive` | `-` | 未解析 / Unresolved | - | - | HaveTychusWarhoundTurretUpgrade |

### “老油条”萨姆 / `TychusReaper`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMTychus.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：生命 / Life 375
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、爆破炸弹 / `TychusReaperBomb`(目标效果技能 / CAbilEffectTarget)、`TychusReaperSuperCloak`(瞬发效果技能 / CAbilEffectInstant)
- 关联 Behavior / Linked behaviors：`ReaperJump`、`TychusLoneWolf`、`TychusReaperSuperCloakController`
- 已隐藏基础按钮 / Hidden basic buttons：1 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | 爆破炸弹 / `TychusReaperBomb` | `TychusReaperBomb,Execute` | 目标效果技能 / CAbilEffectTarget | - | 发射弹体效果 / CEffectLaunchMissile:`TychusReaperBombDamageLM` | - |
| 1,0 | 拉尔斯科技G7型炸弹 / `TychusReaperBombDamage` | `TychusReaperBombDamage,255` | 未解析 / Unresolved | - | - | HaveTychusReaperBombDamage |
| 1,1 | 莫比斯拘束矩阵 / `TychusReaperBombStun` | `TychusReaperBombStun,255` | 未解析 / Unresolved | - | - | HaveTychusReaperBombStun |
| 1,2 | 普罗希昂遮光服 / `TychusReaperSuperCloak` | `TychusReaperSuperCloak,Execute` | 瞬发效果技能 / CAbilEffectInstant | - | 施加行为效果 / CEffectApplyBehavior:`TychusReaperSuperCloakAB` | HaveTychusReaperSuperCloak |
| 1,3 | `TychusReaperBombCharges` | `TychusReaperBombCharges,255` | 未解析 / Unresolved | - | - | HaveTychusReaperBombCharges |

### 凯文“响尾蛇”韦斯特 / `TychusMarauder`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMTychus.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：生命 / Life 625
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`TychusMarauderBuildHealingWard`(目标效果技能 / CAbilEffectTarget)、`TychusMarauderSuperStimpack`(瞬发效果技能 / CAbilEffectInstant)
- 可生产/创建 / Produced or created：`TychusMarauderHealingWard`（非本指挥官名册 / not in current commander roster）
- 已隐藏基础按钮 / Hidden basic buttons：1 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | 部署恢复器 / `TychusMarauderBuildHealingWard` | `TychusMarauderBuildHealingWard,Execute` | 目标效果技能 / CAbilEffectTarget | 效果创建 / Effect creates:`TychusMarauderHealingWard` | 创建单位效果 / CEffectCreateUnit:`TychusMarauderHealingWardRelease` | - |
| 1,0 | 尤摩扬信号调制器 / `TychusMarauderHealingWardBuff` | `TychusMarauderHealingWardBuff,255` | 未解析 / Unresolved | - | - | HaveTychusMarauderHealingWardBuffUpgrade |
| 1,1 | 莫比斯攻击性合剂 / `TychusMarauderHealingWardSpeedBuff` | `TychusMarauderHealingWardSpeedBuff,255` | 未解析 / Unresolved | - | - | HaveTychusMarauderHealingWardSpeedBuffUpgrade |
| 1,2 | 秘密储备强化剂 / `TychusMarauderSuperStimpack` | `TychusMarauderSuperStimpack,Execute` | 瞬发效果技能 / CAbilEffectInstant | - | 施加行为效果 / CEffectApplyBehavior:`TychusMarauderSuperStim` | - |
| 1,3 | `TychusMarauderAttackSplash` | `TychusMarauderAttackSplash,255` | 未解析 / Unresolved | - | - | HaveTychusMarauderAttackSplash |
