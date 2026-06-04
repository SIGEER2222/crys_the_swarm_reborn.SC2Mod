# 菲尼克斯 / `Fenix` 科技链路排查 / Tech Tree Diagnostics

- 描述 / Description：净化者执行官
- 数据来源 / Data source：当前 Mod / Current Mod，目录 / Directory：`合作指挥官版起义狂潮/Mods/XM/XMFenix.SC2Mod`
- 当前 Mod 运行名册 / Current Mod roster：module=`XMFenix.SC2Mod`，instance=`Fenix`
- 统计 / Stats：建筑 4、生产链补充建筑 1、单位 9、英雄 6、建筑按钮 66、单位按钮 13、效果引用 43
- 名称显示 / Name display：能从当前 Mod zhCN 解析时显示“中文名 / `英文ID`”；仅显示 `ID` 表示当前 Mod 未找到可用中文名。

## 初始化/开局单位 / Initial Opener

| 槽位 / Slot | 单位 / Unit | 预期类型 / Expected Kind | Catalog 父级 / Catalog Parent | 是否在运行名册 / In Runtime Roster | 来源 / Source |
| --- | --- | --- | --- | --- | --- |
| 初始基地 / Command Center | `NexusFenix` | building | `Nexus` | 否 / No | Catalog xmfenix，Instance Fenix，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFenix.SC2Mod/Base.SC2Data/GameData/UserData.xml` |
| 初始工人 / Worker | `ProbeFenix` | unit | `Probe` | 否 / No | Catalog xmfenix，Instance Fenix，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFenix.SC2Mod/Base.SC2Data/GameData/UserData.xml` |
| 第二初始单位 / Second Unit | `PylonFenix` | unit | `Pylon` | 否 / No | Catalog xmfenix，Instance Fenix，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFenix.SC2Mod/Base.SC2Data/GameData/UserData.xml` |

## 指挥官默认/顶部技能 / Commander Default / Top-panel Skills

| 技能名 / Skill Name | Ability/Cmd | 类型 / Type | 效果引用 / Effect References | Catalog 来源 / Catalog Sources |
| --- | --- | --- | --- | --- |
| `SOASummonFenix` | `SOASummonFenix,Execute` | 目标效果技能 / CAbilEffectTarget | 效果集合 / CEffectSet:`SOASummonFenixInitialSet` | xmfenix:1 |
| `SOASummonFenixPassive` | `-` | 未解析 / Unresolved | - | - |
| `SOASummonFenixDragoon` | `SOASummonFenixDragoon,Execute` | 目标效果技能 / CAbilEffectTarget | 效果集合 / CEffectSet:`SOASummonFenixDragoonInitialSet` | xmfenix:1 |
| `SOASummonFenixDragoonPassive` | `-` | 未解析 / Unresolved | - | - |
| `SOASummonFenixArbiter` | `SOASummonFenixArbiter,Execute` | 目标效果技能 / CAbilEffectTarget | 效果集合 / CEffectSet:`SOASummonFenixArbiterInitialSet` | xmfenix:1 |
| `SOASummonFenixArbiterLocked` | `-` | 未解析 / Unresolved | - | - |
| `SOASummonFenixArbiterPassive` | `-` | 未解析 / Unresolved | - | - |
| `BuildInProgress` | `BuildInProgress,Cancel` | 未解析 / Unresolved | - | - |

## 建筑 / Buildings

### `Gateway`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMFenix.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`GatewayTrain`(训练技能 / CAbilTrain)、`que5notPassive`(队列技能 / CAbilQueue)、`Rally`(CAbilRally / CAbilRally)、`UpgradeToWarpGate`(变形技能 / CAbilMorph)
- 关联 Behavior / Linked behaviors：`ChronoBoostTarget`
- 可生产/创建 / Produced or created：`DarkArchon`（非本指挥官名册 / not in current commander roster），耗时 / Time 55s、`Monitor`（非本指挥官名册 / not in current commander roster），耗时 / Time 37s、保护者 / `SentryFenix`，耗时 / Time 37s、`Supplicant`（非本指挥官名册 / not in current commander roster），耗时 / Time 28s

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| - | `que5notPassive` | `que5notPassive,CancelLast` | 队列技能 / CAbilQueue | - | - | - |
| 0,0 | `GatewayTrain` | `GatewayTrain,Train11` | 训练技能 / CAbilTrain | `Supplicant`、单位 / Unit:`Supplicant` | - | - |
| 0,0 | `GatewayTrain` | `GatewayTrain,Train1` | 训练技能 / CAbilTrain | `ZealotAiur`、`ZealotShakuras` | - | - |
| 0,1 | `GatewayTrain` | `GatewayTrain,Train10` | 训练技能 / CAbilTrain | `Monitor`、单位 / Unit:`Monitor` | - | - |
| 0,1 | `GatewayTrain` | `GatewayTrain,Train6` | 训练技能 / CAbilTrain | `SentryAiur`、激励者 / `SentryPurifier` | - | - |
| 0,1 | `GatewayTrain` | `GatewayTrain,Train15` | 训练技能 / CAbilTrain | 保护者 / `SentryFenix`、单位 / Unit:保护者 / `SentryFenix` | - | - |
| 0,2 | `GatewayTrain` | `GatewayTrain,Train2` | 训练技能 / CAbilTrain | `StalkerShakuras`、龙骑士 / `Dragoon` | - | - |
| 1,0 | `WarpinAscendentLocked` | `-` | 未解析 / Unresolved | - | - | AlarakLevel08 |
| 1,2 | `GatewayTrain` | `GatewayTrain,Train9` | 训练技能 / CAbilTrain | `DarkArchon`、单位 / Unit:`DarkArchon` | - | - |
| 1,2 | `WarpInDarkArchonLocked` | `-` | 未解析 / Unresolved | - | - | VorazunLevel05 |
| 2,2 | `AlarakMasteryUnitAttackSpeed` | `-` | 未解析 / Unresolved | - | - | HaveMasteryAlarakUnitAttackSpeed |

### 光子炮台 / `PhotonCannon`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMFenix.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`PhaseCannonProjection`、`stop`(基础 / Basic)
- 已隐藏基础按钮 / Hidden basic buttons：1 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | 强化瞄准 / `KaraxTurretRange` | `-` | 未解析 / Unresolved | - | - | HaveKaraxTurretRange |
| 2,1 | 军械优化 / `KaraxTurretAttackSpeed` | `-` | 未解析 / Unresolved | - | - | HaveKaraxTurretAttackSpeed |

### `RoboticsBay`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMFenix.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`BuildInProgress`(基础 / Basic)、`que5`(队列技能 / CAbilQueue)、`RoboticsBayResearch`(研究技能 / CAbilResearch)
- 关联 Behavior / Linked behaviors：`ChronoBoostTarget`
- 已隐藏基础按钮 / Hidden basic buttons：2 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| - | 掠夺者 / `ReaverPassive` | `-` | 未解析 / Unresolved | - | - | HaveVoidReaver |
| 0,0 | `RoboticsBayResearch` | `RoboticsBayResearch,Research2` | 研究技能 / CAbilResearch | - | - | - |
| 0,0 | `RoboticsBayResearch` | `RoboticsBayResearch,Research16` | 研究技能 / CAbilResearch | 升级 / Upgrade:`VanguardArmoredDamage` | - | - |
| 0,0 | `ZeratulResearchImmortalBarrierBase` | `-` | 未解析 / Unresolved | - | - | HaveZeratulArtifactTier1AndRoboticsBay |
| 0,1 | `RoboticsBayResearch` | `RoboticsBayResearch,Research15` | 研究技能 / CAbilResearch | 升级 / Upgrade:`AlarakVanguardIncreaseSplashArea` | - | - |
| 0,1 | `ResearchAlarakVanguardIncreaseSplashAreaLocked` | `-` | 未解析 / Unresolved | - | - | AlarakLevel06 |
| 0,1 | `RoboticsBayResearch` | `RoboticsBayResearch,Research9` | 研究技能 / CAbilResearch | 升级 / Upgrade:`ImmortalResearchBarrierAdvanced` | - | - |
| 0,2 | `FenixResearchDisruptorCloakLocked` | `-` | 未解析 / Unresolved | - | - | FenixLevel09 |
| 0,2 | `RoboticsBayResearch` | `RoboticsBayResearch,Research18` | 研究技能 / CAbilResearch | 升级 / Upgrade:`AlarakColossusChargedBlastAirAttack` | - | - |
| 0,2 | `RoboticsBayResearch` | `RoboticsBayResearch,Research19` | 研究技能 / CAbilResearch | 升级 / Upgrade:`DisruptorCloak` | - | - |
| 0,2 | `RoboticsBayResearch` | `RoboticsBayResearch,Research12` | 研究技能 / CAbilResearch | 升级 / Upgrade:`ColossusFireBeam` | - | - |
| 0,2 | `ResearchFireBeamLocked` | `-` | 未解析 / Unresolved | - | - | KaraxLevel09 |
| 0,2 | `ResearchIncreasedScarabCountLocked` | `-` | 未解析 / Unresolved | - | - | ArtanisLevel09 |
| 0,2 | `RoboticsBayResearch` | `RoboticsBayResearch,Research13` | 研究技能 / CAbilResearch | 升级 / Upgrade:`ReaverIncreasedScarabCount` | - | - |
| 0,3 | `FenixResearchDisruptorSecondExplosionLocked` | `-` | 未解析 / Unresolved | - | - | FenixLevel09 |
| 0,3 | `RoboticsBayResearch` | `RoboticsBayResearch,Research17` | 研究技能 / CAbilResearch | 升级 / Upgrade:`AlarakColossusChargedBlastChargeTime` | - | - |
| 0,3 | `ResearchChargedBlastChargeTimeLocked` | `-` | 未解析 / Unresolved | - | - | AlarakLevel06 |
| 0,3 | `RoboticsBayResearch` | `RoboticsBayResearch,Research20` | 研究技能 / CAbilResearch | 升级 / Upgrade:`DisruptorSecondExplosion` | - | - |
| 0,3 | `ResearchIncreasedScarabSplashRadiusLocked` | `-` | 未解析 / Unresolved | - | - | ArtanisLevel09 |
| 0,3 | `RoboticsBayResearch` | `RoboticsBayResearch,Research14` | 研究技能 / CAbilResearch | 升级 / Upgrade:`ReaverIncreasedScarabSplashRadius` | - | - |
| 1 | 巨像 / `ColossusPassive` | `-` | 未解析 / Unresolved | - | - | HaveColossus |
| 1,0 | 巨像 / `ColossusPassive` | `-` | 未解析 / Unresolved | - | - | HaveVoidColossusFireBeam |
| 1,0 | `ResearchZeratulImmortalRange` | `-` | 未解析 / Unresolved | - | - | HaveZeratulArtifactTier2AndRoboticsBay |
| 1,0 | `WrathwalkerPassive` | `-` | 未解析 / Unresolved | - | - | HaveVoidColossusTaldarim |
| 2 | `RoboticsBayResearch` | `RoboticsBayResearch,Research21` | 研究技能 / CAbilResearch | 升级 / Upgrade:`FenixImmortalDetonationShot` | - | - |
| 2 | `FenixImmortalResearchDetonationShotLocked` | `-` | 未解析 / Unresolved | - | - | FenixLevel12 |
| 2,0 | `ZeratulResearchImprovedBarrier` | `-` | 未解析 / Unresolved | - | - | HaveZeratulArtifactTier3AndRoboticsBay |
| 2,1 | `RoboticsBayResearch` | `RoboticsBayResearch,Research23` | 研究技能 / CAbilResearch | 升级 / Upgrade:`FenixWarbringerColossusPowerShot` | - | - |
| 2,1 | `ResearchFenixWarbringerColossusPowerShotLocked` | `-` | 未解析 / Unresolved | - | - | FenixLevel14 |

### `TwilightCouncil`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMFenix.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`BuildInProgress`(基础 / Basic)、`TwilightCouncilResearch`(研究技能 / CAbilResearch)
- 关联 Behavior / Linked behaviors：`ChronoBoostTarget`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | `TwilightCouncilResearch` | `TwilightCouncilResearch,Research25` | 研究技能 / CAbilResearch | 升级 / Upgrade:`AlarakSupplicantShieldArmor` | - | - |
| 0,0 | `TwilightCouncilResearch` | `TwilightCouncilResearch,Research1` | 研究技能 / CAbilResearch | - | - | - |
| 0,0 | `TwilightCouncilResearch` | `TwilightCouncilResearch,Research5` | 研究技能 / CAbilResearch | 升级 / Upgrade:`ZealotResearchShadowCharge` | - | - |
| - | `TwilightCouncilResearch` | `TwilightCouncilResearch,Research9` | 研究技能 / CAbilResearch | 升级 / Upgrade:`ZealotResearchShadowStun` | - | - |
| 0,1 | `TwilightCouncilResearch` | `TwilightCouncilResearch,Research27` | 研究技能 / CAbilResearch | 升级 / Upgrade:`AdeptFenixShadeSpawn` | - | - |
| 1 | `TwilightCouncilResearch` | `TwilightCouncilResearch,Research6` | 研究技能 / CAbilResearch | 升级 / Upgrade:`StalkerResearchDragoonRange` | - | - |
| 1 | `TwilightCouncilResearch` | `TwilightCouncilResearch,Research2` | 研究技能 / CAbilResearch | - | - | - |
| 0,2 | `TwilightCouncilResearch` | `TwilightCouncilResearch,Research21` | 研究技能 / CAbilResearch | 升级 / Upgrade:`AlarakSupplicantMaxShields` | - | - |
| 0,2 | `TwilightCouncilResearch` | `TwilightCouncilResearch,Research30` | 研究技能 / CAbilResearch | 升级 / Upgrade:`FenixKaldalisCleave` | - | - |
| 0,2 | `ResearchFenixKaldalisZealotCleaveLocked` | `-` | 未解析 / Unresolved | - | - | FenixLevel04 |
| 0,2 | `ResearchKaraxEnergyRegenLocked` | `-` | 未解析 / Unresolved | - | - | KaraxLevel04 |
| 0,2 | 研究快速恢复 / `TwilightCouncilResearch` | `TwilightCouncilResearch,Research14` | 研究技能 / CAbilResearch | 升级 / Upgrade:`KaraxEnergyRegenUpgrade` | - | - |
| 0,2 | `ResearchShadowStunLocked` | `-` | 未解析 / Unresolved | - | - | VorazunLevel04 |
| 0,2 | `ResearchSupplicantMaxShieldsLocked` | `-` | 未解析 / Unresolved | - | - | AlarakLevel04 |
| 2 | `TwilightCouncilResearch` | `TwilightCouncilResearch,Research3` | 研究技能 / CAbilResearch | 升级 / Upgrade:`ZealotResearchWhirlwind` | - | - |
| 3 | `TwilightCouncilResearch` | `TwilightCouncilResearch,Research18` | 研究技能 / CAbilResearch | 升级 / Upgrade:`AlarakStalkerPhasingArmor` | - | - |
| 0,3 | `TwilightCouncilResearch` | `TwilightCouncilResearch,Research26` | 研究技能 / CAbilResearch | 升级 / Upgrade:`FenixChampionTalisAdeptBounceShotUpgrade` | - | - |
| 0,3 | `FenixTalisAdeptLearnBounceShotUpgradeLocked` | `-` | 未解析 / Unresolved | - | - | FenixLevel04 |
| 0,3 | `ResearchBlinkShieldRestoreLocked` | `-` | 未解析 / Unresolved | - | - | VorazunLevel04 |
| 3 | `TwilightCouncilResearch` | `TwilightCouncilResearch,Research8` | 研究技能 / CAbilResearch | 升级 / Upgrade:`StalkerResearchBlinkShieldRestore` | - | - |
| 3 | `TwilightCouncilResearch` | `TwilightCouncilResearch,Research7` | 研究技能 / CAbilResearch | 升级 / Upgrade:`StalkerResearchDragoonHealth` | - | - |
| 3 | `ResearchDragoonChassisLocked` | `-` | 未解析 / Unresolved | - | - | ArtanisLevel04 |
| 3 | `TwilightCouncilResearch` | `TwilightCouncilResearch,Research13` | 研究技能 / CAbilResearch | 升级 / Upgrade:`EnergizerReclamation` | - | - |
| 0,3 | `ResearchStalkerPhasingArmorLocked` | `-` | 未解析 / Unresolved | - | - | AlarakLevel04 |

## 生产链补充建筑 / Production-support Buildings

### `WarpGate`

- 来源 / Source：名册 / Roster inferred production building，状态 / Status produces:SentryFenix，模块 / Module XMFenix.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFenix.SC2Mod/Base.SC2Data/GameData/UnitData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：无 / None
- 关联 Behavior / Linked behaviors：`ChronoBoostTarget`
- 可生产/创建 / Produced or created：保护者 / `SentryFenix`，耗时 / Time 5s

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| - | `WarpGateTrain` | `WarpGateTrain,Train4` | 折跃/部署训练技能 / CAbilWarpTrain | - | - | - |
| - | `WarpinAscendentLocked` | `-` | 未解析 / Unresolved | - | - | AlarakLevel08 |
| - | `WarpGateTrain` | `WarpGateTrain,Train11` | 折跃/部署训练技能 / CAbilWarpTrain | 单位 / Unit:`AlarakSupplicantWarpTrainDummy` | - | - |
| 0,0 | `WarpGateTrain` | `WarpGateTrain,Train1` | 折跃/部署训练技能 / CAbilWarpTrain | - | - | - |
| 0,1 | `WarpGateTrain` | `WarpGateTrain,Train10` | 折跃/部署训练技能 / CAbilWarpTrain | 单位 / Unit:`Monitor` | - | - |
| 0,1 | `WarpGateTrain` | `WarpGateTrain,Train15` | 折跃/部署训练技能 / CAbilWarpTrain | 保护者 / `SentryFenix`、单位 / Unit:保护者 / `SentryFenix` | - | - |
| 1,0 | `WarpGateTrain` | `WarpGateTrain,Train8` | 折跃/部署训练技能 / CAbilWarpTrain | - | - | - |
| 1,2 | `WarpGateTrain` | `WarpGateTrain,Train9` | 折跃/部署训练技能 / CAbilWarpTrain | 单位 / Unit:`DarkArchon` | - | - |
| 1,2 | `WarpInDarkArchonLocked` | `-` | 未解析 / Unresolved | - | - | VorazunLevel05 |
| 2,2 | `AlarakMasteryUnitAttackSpeed` | `-` | 未解析 / Unresolved | - | - | HaveMasteryAlarakUnitAttackSpeed |
| 0,0 | `WarpGateTrain` | `WarpGateTrain,Train12` | 折跃/部署训练技能 / CAbilWarpTrain | - | - | - |

## 单位 / Units

### 使徒 / `Adept`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMFenix.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：费用 / Cost 125/0
- Catalog 技能链接 / Catalog ability links：`AdeptPhaseShiftCancel`、`attack`(基础 / Basic)、`FenixAdeptShadeCooldown`(瞬发效果技能 / CAbilEffectInstant)、`FenixTalisAdeptMorph`(变形技能 / CAbilMorph)、`move`(基础 / Basic)、`ProgressRally`(CAbilRally / CAbilRally)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`FenixAdeptShadeCooldown`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | `AdeptFenixShadeSpawn` | `-` | 未解析 / Unresolved | - | - | HaveAdeptFenixShadeSpawn |

### `ColossusPurifier`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMFenix.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit
- Catalog 技能链接 / Catalog ability links：`FenixWarbringerColossusMorph`(变形技能 / CAbilMorph)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2 | - | `-` | 未解析 / Unresolved | - | - | HaveFireBeam |

### 侦测器 / `Observer`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMFenix.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`move`(基础 / Basic)、`ObserverMorphtoObserverSiege`、`stop`(基础 / Basic)、`Warpable`
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `HaveGraviticBoosters` | `-` | 未解析 / Unresolved | - | - | HaveGraviticBoosters |
| 2,2 | `ObserverMorphtoObserverSiege` | `ObserverMorphtoObserverSiege,Execute` | 未解析 / Unresolved | - | - | - |
| 2,4 | `Detector` | `-` | 未解析 / Unresolved | - | - | - |

### 侦察机 / `Scout`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMFenix.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，生命 / Life 150，护盾 / Shields 100，费用 / Cost 250/75
- Catalog 技能链接 / Catalog ability links：`FenixMojoScoutMorph`(变形技能 / CAbilMorph)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | `HaveFenixScoutWeaponRange` | `-` | 未解析 / Unresolved | - | - | HaveFenixScoutWeaponRange |

### 保护者 / `SentryFenix`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMFenix.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race Prot，生命 / Life 40，护盾 / Shields 40，费用 / Cost 50/100，补给 / Supply 2
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`FenixSentryGuardianZone`(目标效果技能 / CAbilEffectTarget)、`move`(基础 / Basic)、`ProgressRally`(CAbilRally / CAbilRally)、`SentryFenixPhasingMode`(变形技能 / CAbilMorph)、`stop`(基础 / Basic)、`Warpable`
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`
- 可生产/创建 / Produced or created：`SentryFenixPhasing`（非本指挥官名册 / not in current commander roster）
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | `FenixSentryGuardianZone` | `FenixSentryGuardianZone,Execute` | 目标效果技能 / CAbilEffectTarget | - | 持续效果 / CEffectCreatePersistent:`FenixSentryGuardianZoneCP`、区域枚举效果 / CEffectEnumArea:`FenixSentryGuardianZoneSearch` | - |
| 2,2 | `SentryFenixPhasingMode` | `SentryFenixPhasingMode,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:`SentryFenixPhasing` | - | - |
| 2,4 | `ProgressRally` | `ProgressRally,Rally1` | CAbilRally / CAbilRally | - | - | - |

### 军团士兵 / `ZealotPurifier`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMFenix.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit
- Catalog 技能链接 / Catalog ability links：`Charge`(CAbilAugment / CAbilAugment)、`FenixKaldalisZealotMorph`(变形技能 / CAbilMorph)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`FenixSuppressAvengingProtocol`

- 面板技能 / Panel skills：无 / None

### 不朽者 / `Immortal`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMFenix.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`FenixTaldarinImmortalMorph`(变形技能 / CAbilMorph)、`ImmortalOverload`、`move`(基础 / Basic)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`

- 面板技能 / Panel skills：无 / None

### 航母 / `Carrier`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMFenix.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`CarrierHangar`、`CarrierRepairDroneHanger`(弹仓/机库技能 / CAbilArmMagazine)、`FenixClolarionCarrierMorph`(变形技能 / CAbilMorph)、`HangarQueue5`、`move`(基础 / Basic)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`Supply`

- 面板技能 / Panel skills：无 / None

### 干扰者 / `Disruptor`

- 来源 / Source：名册 / Roster XMFinal CommanderRosters.galaxy，状态 / Status galaxy，模块 / Module XMFenix.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146_CommanderRosters.galaxy`
- 数值 / Stats：类型 / Type Unit，护盾 / Shields 100，费用 / Cost 0/150
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`FenixPurificationNova`(目标效果技能 / CAbilEffectTarget)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`DisruptorPermanentCloak`、`VorazunCloakedShieldRegenPermanent`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| - | `FenixPurificationNova` | `FenixPurificationNova,Execute` | 目标效果技能 / CAbilEffectTarget | - | 持续效果 / CEffectCreatePersistent:`FenixPurificationNovaCP`、区域枚举效果 / CEffectEnumArea:`FenixPurificationNovaSearch` | - |
| 2,0 | `PurificationNovaTargeted` | `PurificationNovaTargeted,Execute` | 未解析 / Unresolved | - | - | - |
| 2,1 | `DisruptorCloakPassive` | `-` | 未解析 / Unresolved | - | - | HaveDisruptorPermanentCloak |
| 2,2 | `DisruptorSecondExplosion` | `-` | 未解析 / Unresolved | - | - | HaveDisruptor2ndExplode |

## 英雄 / Heroes

### 菲尼克斯 / `FenixArbiter`

- 来源 / Source：名册 / Roster inferred current Mod hero catalog unit，状态 / Status catalog ObjectType:Hero，模块 / Module XMFenix.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFenix.SC2Mod/Base.SC2Data/GameData/UnitData.xml`
- 数值 / Stats：类型 / Type Hero，种族 / Race Prot，生命 / Life 500，护盾 / Shields 500，能量 / Energy 500
- Catalog 技能链接 / Catalog ability links：`ArbiterMPRecall`、`attack`(基础 / Basic)、`FenixArbiterCloakingField`(行为/被动技能 / CAbilBehavior)、`FenixArbiterStasisField`(目标效果技能 / CAbilEffectTarget)、`move`(基础 / Basic)、`stop`(基础 / Basic)、`Warpable`
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`FenixArbiterDetector`、`SuppressEnergyRegen`
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | `Detector` | `-` | 未解析 / Unresolved | - | - | HaveFenixArbiterDetection |
| 2,0 | `FenixArbiterStasisField` | `FenixArbiterStasisField,Execute` | 目标效果技能 / CAbilEffectTarget | - | 区域枚举效果 / CEffectEnumArea:`FenixArbiterStasisFieldSearch` | - |
| 2,2 | `FenixArbiterCloakingField` | `FenixArbiterCloakingField,On` | 行为/被动技能 / CAbilBehavior | - | - | - |
| 2,2 | `FenixArbiterCloakingField` | `FenixArbiterCloakingField,Off` | 行为/被动技能 / CAbilBehavior | - | - | - |
| 2,3 | `ArbiterMPRecall` | `ArbiterMPRecall,Execute` | 未解析 / Unresolved | - | - | - |

### 菲尼克斯 / `FenixCoop`

- 来源 / Source：名册 / Roster inferred current Mod hero catalog unit，状态 / Status catalog ObjectType:Hero，模块 / Module XMFenix.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFenix.SC2Mod/Base.SC2Data/GameData/UnitData.xml`
- 数值 / Stats：类型 / Type Hero，种族 / Race Prot，生命 / Life 500，护盾 / Shields 500，能量 / Energy 500
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`FenixSoAWhirlwind`(瞬发效果技能 / CAbilEffectInstant)、`FenixThunderousChargeCoop`(目标效果技能 / CAbilEffectTarget)、`move`(基础 / Basic)、`ProgressRally`(CAbilRally / CAbilRally)、`stop`(基础 / Basic)、`VoidShieldCapacitor`(瞬发效果技能 / CAbilEffectInstant)、`Warpable`
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`SuppressEnergyRegen`
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | `FenixThunderousChargeCoop` | `FenixThunderousChargeCoop,Execute` | 目标效果技能 / CAbilEffectTarget | - | 区域枚举效果 / CEffectEnumArea:`FenixThunderousChargeCoopDamageSearch`、创建单位效果 / CEffectCreateUnit:`FenixThunderousChargeCoopPlacementCU` | - |
| 2,2 | `FenixSoAWhirlwind` | `FenixSoAWhirlwind,Execute` | 瞬发效果技能 / CAbilEffectInstant | - | - | - |
| 2,3 | `VoidShieldCapacitor` | `VoidShieldCapacitor,Execute` | 瞬发效果技能 / CAbilEffectInstant | - | - | - |
| 2,4 | `ProgressRally` | `ProgressRally,Rally1` | CAbilRally / CAbilRally | - | - | - |

### 菲尼克斯 / `FenixDragoon`

- 来源 / Source：名册 / Roster inferred current Mod hero catalog unit，状态 / Status catalog ObjectType:Hero，模块 / Module XMFenix.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFenix.SC2Mod/Base.SC2Data/GameData/UnitData.xml`
- 数值 / Stats：类型 / Type Hero，种族 / Race Prot，生命 / Life 500，护盾 / Shields 500，能量 / Energy 500
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`ChargedBuster`(目标效果技能 / CAbilEffectTarget)、`FenixDragoonAirBomb`(目标效果技能 / CAbilEffectTarget)、`FenixDragoonArsenalOvercharge`(行为/被动技能 / CAbilBehavior)、`move`(基础 / Basic)、`ProgressRally`(CAbilRally / CAbilRally)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`SuppressEnergyRegen`
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | `ChargedBuster` | `ChargedBuster,Execute` | 目标效果技能 / CAbilEffectTarget | - | 区域枚举效果 / CEffectEnumArea:`ChargedBusterSearch`、效果集合 / CEffectSet:`ChargedBusterStartSet` | - |
| 2,2 | `FenixDragoonAirBomb` | `FenixDragoonAirBomb,Execute` | 目标效果技能 / CAbilEffectTarget | - | 区域枚举效果 / CEffectEnumArea:`FenixDragoonAirBombSearch`、效果集合 / CEffectSet:`FenixDragoonAirBombStartSet` | - |
| 2,3 | `FenixDragoonArsenalOvercharge` | `FenixDragoonArsenalOvercharge,On` | 行为/被动技能 / CAbilBehavior | - | - | - |
| 2,3 | `FenixDragoonChargeBusterPassive` | `-` | 未解析 / Unresolved | - | - | - |
| 2,4 | `ProgressRally` | `ProgressRally,Rally1` | CAbilRally / CAbilRally | - | - | - |

### 卡尔达利斯 / `FenixKaldalisZealot`

- 来源 / Source：名册 / Roster inferred current Mod hero catalog unit，状态 / Status catalog ObjectType:Hero，模块 / Module XMFenix.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFenix.SC2Mod/Base.SC2Data/GameData/UnitData.xml`
- 数值 / Stats：类型 / Type Hero，种族 / Race Prot，生命 / Life 400，护盾 / Shields 200，费用 / Cost 200/100，补给 / Supply 3
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`FenixKaldalisZealotCharge`(CAbilAugment / CAbilAugment)、`move`(基础 / Basic)、`ProgressRally`(CAbilRally / CAbilRally)、`stop`(基础 / Basic)、`Warpable`
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | `FenixKaldalisZealotCharge` | `FenixKaldalisZealotCharge,Execute` | CAbilAugment / CAbilAugment | - | 发射弹体效果 / CEffectLaunchMissile:`FenixKaldalisZealotChargeLaunch` | - |
| 2,1 | `FenixKaldalisZealotCleave` | `-` | 未解析 / Unresolved | - | - | HaveKaldalisCleave |
| 2,1 | `FenixKaldalisZealotCleaveLocked` | `-` | 未解析 / Unresolved | - | - | FenixLevel04 |
| 2,4 | `ProgressRally` | `ProgressRally,Rally1` | CAbilRally / CAbilRally | - | - | - |

### 摩约 / `FenixMojoScout`

- 来源 / Source：名册 / Roster inferred current Mod hero catalog unit，状态 / Status catalog ObjectType:Hero，模块 / Module XMFenix.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFenix.SC2Mod/Base.SC2Data/GameData/UnitData.xml`
- 数值 / Stats：类型 / Type Hero，种族 / Race Prot，生命 / Life 300，护盾 / Shields 200，费用 / Cost 225/75，补给 / Supply 3
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、压制程序 / `FenixMojoMissiles`(CAbilAugment / CAbilAugment)、`move`(基础 / Basic)、`stop`(基础 / Basic)、`Warpable`
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | `FenixChampionScoutAOEMissilesLocked` | `-` | 未解析 / Unresolved | - | - | FenixLevel12 |
| 2,0 | 压制程序 / `FenixMojoMissiles` | `FenixMojoMissiles,Execute` | CAbilAugment / CAbilAugment | - | - | - |
| 2,4 | `FenixMojoScoutAirStunPassive` | `-` | 未解析 / Unresolved | - | - | - |

### 塔里斯 / `FenixTalisAdept`

- 来源 / Source：名册 / Roster inferred current Mod hero catalog unit，状态 / Status catalog ObjectType:Hero，模块 / Module XMFenix.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFenix.SC2Mod/Base.SC2Data/GameData/UnitData.xml`
- 数值 / Stats：类型 / Type Hero，种族 / Race Prot，生命 / Life 180，护盾 / Shields 180，费用 / Cost 200/100，补给 / Supply 2
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`FenixTalisAdeptBounceShot`(CAbilAugment / CAbilAugment)、`FenixTalisShadeCooldown`(瞬发效果技能 / CAbilEffectInstant)、`move`(基础 / Basic)、`ProgressRally`(CAbilRally / CAbilRally)、`stop`(基础 / Basic)、`Warpable`
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`FenixTalisShadeCooldown`
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | `FenixTalisShadeSpawnShade` | `-` | 未解析 / Unresolved | - | - | - |
| 2,1 | `FenixTalisAdeptBounceShot` | `FenixTalisAdeptBounceShot,Execute` | CAbilAugment / CAbilAugment | - | 发射弹体效果 / CEffectLaunchMissile:`FenixTalisAdeptBounceShotLM1` | - |
| 2,1 | `FenixTalisAdeptBounceShotLocked` | `-` | 未解析 / Unresolved | - | - | FenixLevel04 |
| 2,4 | `ProgressRally` | `ProgressRally,Rally1` | CAbilRally / CAbilRally | - | - | - |
