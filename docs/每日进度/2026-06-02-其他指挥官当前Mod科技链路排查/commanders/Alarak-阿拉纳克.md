# 阿拉纳克 / `Alarak` 科技链路排查 / Tech Tree Diagnostics

- 描述 / Description：无 / None
- 数据来源 / Data source：当前 Mod / Current Mod，目录 / Directory：`合作指挥官版起义狂潮/Mods/XM/XMAlarak.SC2Mod`
- 当前 Mod 运行名册 / Current Mod roster：module=`XMAlarak.SC2Mod`，instance=`Alarak`
- 统计 / Stats：建筑 3、生产链补充建筑 2、单位 7、英雄 1、建筑按钮 37、单位按钮 31、效果引用 17
- 名称显示 / Name display：能从当前 Mod zhCN 解析时显示“中文名 / `英文ID`”；仅显示 `ID` 表示当前 Mod 未找到可用中文名。

## 指挥官默认/顶部技能 / Commander Default / Top-panel Skills

| 技能名 / Skill Name | Ability/Cmd | 类型 / Type | 效果引用 / Effect References | Catalog 来源 / Catalog Sources |
| --- | --- | --- | --- | --- |
| `AlarakStructureOvercharge` | `AlarakStructureOvercharge,Execute` | 目标效果技能 / CAbilEffectTarget | 效果集合 / CEffectSet:`AlarakStructureOverchargeSet` | xmalarak:1 |
| `AlarakACSummonDeathfleetTarget` | `AlarakACSummonDeathfleetTarget,Execute` | 目标效果技能 / CAbilEffectTarget | 效果集合 / CEffectSet:`AlarakACSummonDeathFleetInitialSet` | xmalarak:1 |
| `AlarakDeathFleetLocked` | `-` | 未解析 / Unresolved | - | - |
| `CommanderPrestigeAlarakDeathFleetLocked` | `-` | 未解析 / Unresolved | - | - |

## 建筑 / Buildings

### `Gateway`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMAlarak.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`GatewayTrain`(训练技能 / CAbilTrain)、`que5notPassive`(队列技能 / CAbilQueue)、`Rally`(CAbilRally / CAbilRally)、`UpgradeToWarpGate`(变形技能 / CAbilMorph)
- 关联 Behavior / Linked behaviors：`ChronoBoostTarget`
- 可生产/创建 / Produced or created：`DarkArchon`（非本指挥官名册 / not in current commander roster），耗时 / Time 55s、`Monitor`，耗时 / Time 37s、保护者 / `SentryFenix`（非本指挥官名册 / not in current commander roster），耗时 / Time 37s、`Supplicant`，耗时 / Time 28s

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

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMAlarak.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`PhaseCannonProjection`、`stop`(基础 / Basic)
- 已隐藏基础按钮 / Hidden basic buttons：1 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | 强化瞄准 / `KaraxTurretRange` | `-` | 未解析 / Unresolved | - | - | HaveKaraxTurretRange |
| 2,1 | 军械优化 / `KaraxTurretAttackSpeed` | `-` | 未解析 / Unresolved | - | - | HaveKaraxTurretAttackSpeed |

### `TwilightCouncil`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMAlarak.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
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

### `RoboticsFacility`

- 来源 / Source：名册 / Roster inferred production building，状态 / Status produces:ImmortalTaldarim/ColossusTaldarim/WarpPrismTaldarim，模块 / Module XMAlarak.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMAlarak.SC2Mod/Base.SC2Data/GameData/UnitData.xml`
- 数值 / Stats：类型 / Type Structure
- Catalog 技能链接 / Catalog ability links：无 / None
- 关联 Behavior / Linked behaviors：`ChronoBoostTarget`
- 可生产/创建 / Produced or created：`ColossusTaldarim`、`ImmortalTaldarim`、`WarpPrismTaldarim`，耗时 / Time 50s

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | `RoboticsFacilityTrain` | `RoboticsFacilityTrain,Train4` | 训练技能 / CAbilTrain | `ImmortalTaldarim` | - | - |
| 0,1 | `BuildReaverLocked` | `-` | 未解析 / Unresolved | - | - | ArtanisLevel05 |
| 0,1 | `RoboticsFacilityTrain` | `RoboticsFacilityTrain,Train3` | 训练技能 / CAbilTrain | `ColossusTaldarim` | - | - |
| 0,3 | `FenixWarpinDisruptorLocked` | `-` | 未解析 / Unresolved | - | - | FenixLevel07 |
| 3 | `WarpinDisruptor` | `-` | 未解析 / Unresolved | - | - | - |
| 0,3 | `RoboticsFacilityTrain` | `RoboticsFacilityTrain,Train30` | 训练技能 / CAbilTrain | `WarpPrismTaldarim`、单位 / Unit:`WarpPrismTaldarim` | - | - |
| 0,3 | `RoboticsFacilityTrain` | `RoboticsFacilityTrain,Train1` | 训练技能 / CAbilTrain | - | - | - |
| 2,0 | `TransformToRoboticsWarpFacilityLocked` | `-` | 未解析 / Unresolved | - | - | ArtanisLevel08 |
| 2,2 | `AlarakMasteryUnitAttackSpeed` | `-` | 未解析 / Unresolved | - | - | HaveMasteryAlarakUnitAttackSpeed |

### `WarpGate`

- 来源 / Source：名册 / Roster inferred production building，状态 / Status produces:Monitor，模块 / Module XMAlarak.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMAlarak.SC2Mod/Base.SC2Data/GameData/UnitData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：无 / None
- 关联 Behavior / Linked behaviors：`ChronoBoostTarget`
- 可生产/创建 / Produced or created：`Monitor`，耗时 / Time 5s

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| - | `WarpGateTrain` | `WarpGateTrain,Train4` | 折跃/部署训练技能 / CAbilWarpTrain | - | - | - |
| - | `WarpinAscendentLocked` | `-` | 未解析 / Unresolved | - | - | AlarakLevel08 |
| - | `WarpGateTrain` | `WarpGateTrain,Train11` | 折跃/部署训练技能 / CAbilWarpTrain | 单位 / Unit:`AlarakSupplicantWarpTrainDummy` | - | - |
| 0,0 | `WarpGateTrain` | `WarpGateTrain,Train1` | 折跃/部署训练技能 / CAbilWarpTrain | - | - | - |
| 0,1 | `WarpGateTrain` | `WarpGateTrain,Train10` | 折跃/部署训练技能 / CAbilWarpTrain | `Monitor`、单位 / Unit:`Monitor` | - | - |
| 0,1 | `WarpGateTrain` | `WarpGateTrain,Train15` | 折跃/部署训练技能 / CAbilWarpTrain | 单位 / Unit:保护者 / `SentryFenix` | - | - |
| 1,0 | `WarpGateTrain` | `WarpGateTrain,Train8` | 折跃/部署训练技能 / CAbilWarpTrain | - | - | - |
| 1,2 | `WarpGateTrain` | `WarpGateTrain,Train9` | 折跃/部署训练技能 / CAbilWarpTrain | 单位 / Unit:`DarkArchon` | - | - |
| 1,2 | `WarpInDarkArchonLocked` | `-` | 未解析 / Unresolved | - | - | VorazunLevel05 |
| 2,2 | `AlarakMasteryUnitAttackSpeed` | `-` | 未解析 / Unresolved | - | - | HaveMasteryAlarakUnitAttackSpeed |
| 0,0 | `WarpGateTrain` | `WarpGateTrain,Train12` | 折跃/部署训练技能 / CAbilWarpTrain | - | - | - |

## 单位 / Units

### `ColossusTaldarim`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMAlarak.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit
- Catalog 技能链接 / Catalog ability links：无 / None
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,4 | `CommanderPrestigeAlarakMechBuff` | `-` | 未解析 / Unresolved | - | - | CommanderPrestigeAlarakMech |
| 2,2 | `AlarakColossusAerialTracking` | `-` | 未解析 / Unresolved | - | - | HaveColossusChargedBlastAirAttack |
| 2,3 | `AlarakColossusChargedBlastChargeTime` | `-` | 未解析 / Unresolved | - | - | HaveColossusChargedBlastChargeTime |

### `HighTemplarTaldarim`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMAlarak.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，能量 / Energy 200
- Catalog 技能链接 / Catalog ability links：`AscendantSacrificeInstant`(瞬发效果技能 / CAbilEffectInstant)、`attack`(基础 / Basic)、`BuildInProgress`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| - | `AscendantSacrificeInstant` | `AscendantSacrificeInstant,Execute` | 瞬发效果技能 / CAbilEffectInstant | - | 区域枚举效果 / CEffectEnumArea:`AscendantSacrificeSearch` | - |
| 1,0 | `ResearchAlarakHighTemplarPsionicOrbTravelDistancePassive` | `-` | 未解析 / Unresolved | - | - | HaveHighTemplarPsionicOrbTravelDistance |
| 1,2 | `AlarakHighTemplarImprovedSacrifice` | `-` | 未解析 / Unresolved | - | - | HaveHighTemplarImprovedSacrifice |

### `ImmortalTaldarim`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMAlarak.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit
- Catalog 技能链接 / Catalog ability links：无 / None
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,4 | `CommanderPrestigeAlarakMechBuff` | `-` | 未解析 / Unresolved | - | - | CommanderPrestigeAlarakMech |
| 2,1 | `VanguardArmoredDamage` | `-` | 未解析 / Unresolved | - | - | HaveVanguardArmoredDamage |
| 2,2 | `AlarakVanguardIncreaseSplashArea` | `-` | 未解析 / Unresolved | - | - | HaveAlarakVanguardIncreaseSplashArea |

### `Monitor`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMAlarak.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，能量 / Energy 0
- Catalog 技能链接 / Catalog ability links：无 / None
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`Detector11`、`HavocPermanentCloak`、`VorazunCloakedShieldRegenPermanent`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | `HavocPermanentCloak` | `-` | 未解析 / Unresolved | - | - | HaveAlarakHavocPermanentCloak |
| 1,1 | `AlarakTargetLockBuff` | `-` | 未解析 / Unresolved | - | - | HaveAlarakHavocTargetLockBuff |
| 1,2 | `AlarakHavocAbilityRange` | `-` | 未解析 / Unresolved | - | - | HaveAlarakHavocAbilityRange |
| 2,3 | `Detector` | `-` | 未解析 / Unresolved | - | - | - |

### `Supplicant`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMAlarak.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race Prot，生命 / Life 75，护盾 / Shields 125，费用 / Cost 75/0，补给 / Supply 2
- Catalog 技能链接 / Catalog ability links：`AdeptPhaseShiftCancel`、`attack`(基础 / Basic)、`move`(基础 / Basic)、`ProgressRally`(CAbilRally / CAbilRally)、`stop`(基础 / Basic)、`WarpableAnywhere`(CAbilWarpable / CAbilWarpable)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`UnderConstructionOrDeadTracker`
- 已隐藏基础按钮 / Hidden basic buttons：6 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | `AlarakACMyLifefortheHighlord` | `-` | 未解析 / Unresolved | - | - | - |
| 2,1 | `PHSupplicantShieldArmor` | `-` | 未解析 / Unresolved | - | - | HaveSupplicantShieldArmor |
| 2,2 | `AlarakSupplicantMaxShields` | `-` | 未解析 / Unresolved | - | - | HaveAlarakSupplicantMaxShields |
| 2,3 | `AlarakSupplicantSacrificeCDR` | `-` | 未解析 / Unresolved | - | - | HaveAlarakSupplicantSacrificeCDR |
| 2,3 | `SupplicantSacrificeCDRLocked` | `-` | 未解析 / Unresolved | - | - | AlarakLevel15 |
| 2,4 | `ProgressRally` | `ProgressRally,Rally1` | CAbilRally / CAbilRally | - | - | - |

### `WarpPrismTaldarim`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMAlarak.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，种族 / Race Prot，生命 / Life 100，护盾 / Shields 100，费用 / Cost 200/0，补给 / Supply 2
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`move`(基础 / Basic)、相位模式 / `PhasingModeTaldarim`(变形技能 / CAbilMorph)、`stop`(基础 / Basic)、`Warpable`、`WarpPrismTransport`(运输技能 / CAbilTransport)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`
- 已隐藏基础按钮 / Hidden basic buttons：6 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | `TaldarimWarpConduit` | `-` | 未解析 / Unresolved | - | - | - |
| 1,4 | `CommanderPrestigeAlarakMechBuff` | `-` | 未解析 / Unresolved | - | - | CommanderPrestigeAlarakMech |
| 2,0 | 相位模式 / `PhasingModeTaldarim` | `PhasingModeTaldarim,Execute` | 变形技能 / CAbilMorph | - | - | - |
| 2,2 | `WarpPrismTransport` | `WarpPrismTransport,Load` | 运输技能 / CAbilTransport | - | 效果集合 / CEffectSet:`CoopCargoDeathDummy` | - |
| 2,3 | `WarpPrismTransport` | `WarpPrismTransport,UnloadAt` | 运输技能 / CAbilTransport | - | 效果集合 / CEffectSet:`CoopCargoDeathDummy` | - |

### `Stalker`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMAlarak.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`BlinkShieldRestore`(目标效果技能 / CAbilEffectTarget)、`BlinkSlayer`(目标效果技能 / CAbilEffectTarget)
- 关联 Behavior / Linked behaviors：`AlarakStalkerPhasingArmor`、`AllUnitBehaviorController`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| - | `BlinkSlayer` | `BlinkSlayer,Execute` | 目标效果技能 / CAbilEffectTarget | - | 效果集合 / CEffectSet:`PhaseBlinkSet` | - |
| - | `BlinkShieldRestore` | `BlinkShieldRestore,Execute` | 目标效果技能 / CAbilEffectTarget | - | - | - |
| 1,0 | `StalkerPassive` | `-` | 未解析 / Unresolved | - | - | HaveVoidStalkerBlinkShieldRestore |
| 1,4 | `CommanderPrestigeAlarakMechBuff` | `-` | 未解析 / Unresolved | - | - | CommanderPrestigeAlarakMech |
| 2,0 | `Blink` | `Blink,Execute` | 目标效果技能 / CAbilEffectTarget | - | - | - |
| 2,1 | `AlarakStalkerPhasingArmor` | `-` | 未解析 / Unresolved | - | - | HaveAlarakStalkerPhasingArmor |
| 2,1 | `BlinkShieldRestoreUpgrade` | `-` | 未解析 / Unresolved | - | - | HaveBlinkShieldRestore |

## 英雄 / Heroes

### `AlarakCoop`

- 来源 / Source：名册 / Roster inferred current Mod hero catalog unit，状态 / Status catalog ObjectType:Hero，模块 / Module XMAlarak.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMAlarak.SC2Mod/Base.SC2Data/GameData/UnitData.xml`
- 数值 / Stats：类型 / Type Hero，种族 / Race Prot，生命 / Life 200，护盾 / Shields 200
- Catalog 技能链接 / Catalog ability links：`AlarakACDeadlyCharge`(目标效果技能 / CAbilEffectTarget)、`AlarakEmpower`(瞬发效果技能 / CAbilEffectInstant)、`AlarakKnockback`(目标效果技能 / CAbilEffectTarget)、`attack`(基础 / Basic)、`DestructionWaveNoOffset`、`move`(基础 / Basic)、`ProgressRally`(CAbilRally / CAbilRally)、`stop`(基础 / Basic)、`Warpable`
- 关联 Behavior / Linked behaviors：`AlarakEmpowerDisplay`、`AlarakTheStrongestSurvive`、`AllUnitBehaviorController`、`HeroCCImmunity`、`SoulAbsorption`
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | `AlarakLightningStrikes` | `-` | 未解析 / Unresolved | - | - | HaveAlarakLightningStrikes |
| 1,0 | `AlarakLightningStrikesLocked` | `-` | 未解析 / Unresolved | - | - | AlarakLevel07 |
| 1,1 | `AlarakAttackStun` | `-` | 未解析 / Unresolved | - | - | HaveAlarakAttackStunUpgrade |
| 1,1 | `AlarakAttackStunLocked` | `-` | 未解析 / Unresolved | - | - | AlarakLevel14 |
| 1,2 | `AlarakDestructionWaveDistance` | `-` | 未解析 / Unresolved | - | - | HaveAlarakDestructionWaveDistance |
| 1,2 | `AlarakDestructionWaveDistanceLocked` | `-` | 未解析 / Unresolved | - | - | AlarakLevel14 |
| 1,3 | `AlarakAreaDamageUpgrade` | `-` | 未解析 / Unresolved | - | - | HaveAlarakAreaDamageUpgrade |
| 1,3 | `AlarakAreaDamageUpgradeLocked` | `-` | 未解析 / Unresolved | - | - | AlarakLevel11 |
| 2,0 | `AlarakACDeadlyCharge` | `AlarakACDeadlyCharge,Execute` | 目标效果技能 / CAbilEffectTarget | - | - | - |
| 2,1 | `SoulAbsorption` | `-` | 未解析 / Unresolved | - | - | - |
| 2,2 | `AlarakKnockback` | `AlarakKnockback,Execute` | 目标效果技能 / CAbilEffectTarget | - | 效果集合 / CEffectSet:`AlarakKnockback` | - |
| 2,3 | `AlarakEmpower` | `AlarakEmpower,Execute` | 瞬发效果技能 / CAbilEffectInstant | - | 效果集合 / CEffectSet:`AlarakEmpowerMe` | - |
| 2,3 | `AlarakEmpowerLocked` | `-` | 未解析 / Unresolved | - | - | AlarakLevel05 |
| 2,4 | `ProgressRally` | `ProgressRally,Rally1` | CAbilRally / CAbilRally | - | - | - |
