# 凯拉克斯 / `Karax` 科技链路排查 / Tech Tree Diagnostics

- 描述 / Description：星灵指挥官
- 数据来源 / Data source：当前 Mod / Current Mod，目录 / Directory：`合作指挥官版起义狂潮/Mods/XM/XMKarax.SC2Mod`
- 当前 Mod 运行名册 / Current Mod roster：module=`XMKarax.SC2Mod`，instance=`Karax`
- 统计 / Stats：建筑 6、生产链补充建筑 3、单位 8、英雄 0、建筑按钮 56、单位按钮 18、效果引用 11

## 指挥官默认/顶部技能 / Commander Default / Top-panel Skills

| 技能 / Ability | 类型 / Type | 效果引用 / Effect References | Catalog 来源 / Catalog Sources |
| --- | --- | --- | --- |
| `SOAOrbitalStrikeKarax,Execute` | 目标效果技能 / CAbilEffectTarget | 持续效果 / CEffectCreatePersistent:`SOAOrbitalStrikeCP`、区域枚举效果 / CEffectEnumArea:`SOAOrbitalStrikeImpactSearch` | xmkarax:1 |
| `SOAThermalLanceActivate,On` | 行为/被动技能 / CAbilBehavior | - | xmkarax:1 |
| `` | 未解析 / Unresolved | - | - |
| `SOAMapWideChrono,Execute` | 瞬发效果技能 / CAbilEffectInstant | 区域枚举效果 / CEffectEnumArea:`SOAMapWideChronoSearch` | xmkarax:1 |
| `` | 未解析 / Unresolved | - | - |
| `SOAPurifierBeam,Execute` | 目标效果技能 / CAbilEffectTarget | - | xmfinal:1 |
| `` | 未解析 / Unresolved | - | - |
| `` | 未解析 / Unresolved | - | - |
| `` | 未解析 / Unresolved | - | - |
| `` | 未解析 / Unresolved | - | - |
| `` | 未解析 / Unresolved | - | - |
| `SOARepairBeam,Execute` | 目标效果技能 / CAbilEffectTarget | - | xmkarax:1 |
| `SOAThermalLanceTargetingDummy,Execute` | 未解析 / Unresolved | - | - |
| `BuildInProgress,Cancel` | 未解析 / Unresolved | - | - |

## 建筑 / Buildings

### Gateway / `Gateway`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMKarax.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`GatewayTrain`(训练技能 / CAbilTrain)、`que5notPassive`(队列技能 / CAbilQueue)、`Rally`(CAbilRally / CAbilRally)、`UpgradeToWarpGate`(变形技能 / CAbilMorph)
- 关联 Behavior / Linked behaviors：`ChronoBoostTarget`
- 可生产/创建 / Produced or created：激励者 `SentryPurifier`、哨兵 `ZealotPurifier`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| - | que5notPassive / `-` | `que5notPassive,CancelLast` | 队列技能 / CAbilQueue | - | - | - |
| 0,0 | Zealot / `Zealot` | `GatewayTrain,Train1` | 训练技能 / CAbilTrain | 哨兵 `ZealotPurifier`、ZealotShakuras `ZealotShakuras`、单位 / Unit:哨兵 `ZealotPurifier` | - | - |
| 0,1 | Sentry / `Sentry` | `GatewayTrain,Train6` | 训练技能 / CAbilTrain | 激励者 `SentryPurifier`、SentryAiur `SentryAiur`、单位 / Unit:激励者 `SentryPurifier` | - | - |

### 光子炮台 / `PhotonCannon`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMKarax.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`PhaseCannonProjection`(目标效果技能 / CAbilEffectTarget)、`stop`(基础 / Basic)
- 已隐藏基础按钮 / Hidden basic buttons：1 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | 强化瞄准 / `KaraxTurretRange` | `-` | 未解析 / Unresolved | - | - | HaveKaraxTurretRange |
| 2,1 | 军械优化 / `KaraxTurretAttackSpeed` | `-` | 未解析 / Unresolved | - | - | HaveKaraxTurretAttackSpeed |

### 护盾充能器 / `ShieldBattery`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMKarax.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Structure
- Catalog 技能链接 / Catalog ability links：`BuildInProgress`(基础 / Basic)、`ShieldBatteryRechargeChanneled`、`ShieldBatteryRechargeEx5`(目标效果技能 / CAbilEffectTarget)、`ShieldBatteryStructureBarrier`(目标效果技能 / CAbilEffectTarget)

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,1 | ShieldBatteryStructureBarrier / `ShieldBatteryStructureBarrier` | `ShieldBatteryStructureBarrier,Execute` | 目标效果技能 / CAbilEffectTarget | - | 施加行为效果 / CEffectApplyBehavior:`ShieldBatteryStructureBarrierAB` | - |
| 2,1 | StructureBarrierLocked / `StructureBarrierLocked` | `-` | 未解析 / Unresolved | - | - | KaraxLevel06 |
| 2,2 | 强化瞄准 / `KaraxTurretRange` | `-` | 未解析 / Unresolved | - | - | HaveKaraxTurretRange |
| 2,3 | 快速恢复 / `KaraxEnergyRegenUpgrade` | `-` | 未解析 / Unresolved | - | - | HaveKaraxEnergyRegenUpgrade |

### 太阳锻炉 / `SolarForge`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMKarax.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Structure，种族 / Race Prot，生命 / Life 500，护盾 / Shields 500，费用 / Cost 200/200
- Catalog 技能链接 / Catalog ability links：`BrokenSolarForge`(变形技能 / CAbilMorph)、`BuildInProgress`(基础 / Basic)、`que5Passive`、`SolarForgeResearch`(研究技能 / CAbilResearch)
- 关联 Behavior / Linked behaviors：`ChronoBoostTarget`、`SolarForgeBeam`、`SolarForgePreventDestroy`
- 已隐藏基础按钮 / Hidden basic buttons：3 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | ResearchSolarEfficiencyLevel1 / `ResearchSolarEfficiencyLevel1` | `SolarForgeResearch,Research1` | 研究技能 / CAbilResearch | 升级 / Upgrade:SolarEfficiencyLevel1 `SolarEfficiencyLevel1` | - | - |
| 0,0 | ResearchSolarEfficiencyLevel2 / `ResearchSolarEfficiencyLevel2` | `SolarForgeResearch,Research2` | 研究技能 / CAbilResearch | 升级 / Upgrade:SolarEfficiencyLevel2 `SolarEfficiencyLevel2` | - | - |
| 0,0 | ResearchSolarEfficiencyLevel3 / `ResearchSolarEfficiencyLevel3` | `SolarForgeResearch,Research3` | 研究技能 / CAbilResearch | 升级 / Upgrade:SolarEfficiencyLevel3 `SolarEfficiencyLevel3` | - | - |
| 0,0 | ResearchSolarEfficiencyLevel3Locked / `ResearchSolarEfficiencyLevel3Locked` | `-` | 未解析 / Unresolved | - | - | KaraxLevel08 |
| 0,1 | ResearchSOARepairBeamExtraTarget / `ResearchSOARepairBeamExtraTarget` | `SolarForgeResearch,Research4` | 研究技能 / CAbilResearch | 升级 / Upgrade:SOARepairBeamExtraTarget `SOARepairBeamExtraTarget` | - | - |
| 0,1 | ResearchSOARepairBeamExtraTargetLocked / `ResearchSOARepairBeamExtraTargetLocked` | `-` | 未解析 / Unresolved | - | - | KaraxLevel08 |
| 0,2 | ResearchSOAOrbitalStrikeUpgrade / `ResearchSOAOrbitalStrikeUpgrade` | `SolarForgeResearch,Research5` | 研究技能 / CAbilResearch | 升级 / Upgrade:SOAOrbitalStrikeUpgrade `SOAOrbitalStrikeUpgrade` | - | - |
| 0,2 | ResearchSOAOrbitalStrikeUpgradeLocked / `ResearchSOAOrbitalStrikeUpgradeLocked` | `-` | 未解析 / Unresolved | - | - | KaraxLevel12 |
| 0,3 | ResearchSOASolarLanceUpgrade / `ResearchSOASolarLanceUpgrade` | `SolarForgeResearch,Research6` | 研究技能 / CAbilResearch | 升级 / Upgrade:SOASolarLanceUpgrade `SOASolarLanceUpgrade` | - | - |
| 0,3 | ResearchSOASolarLanceUpgradeLocked / `ResearchSOASolarLanceUpgradeLocked` | `-` | 未解析 / Unresolved | - | - | KaraxLevel12 |
| 2,0 | SolarEfficiencyPassiveLevel1 / `SolarEfficiencyPassiveLevel1` | `-` | 未解析 / Unresolved | - | - | HaveSolarEfficiencyLevel1 |
| 2,0 | SolarEfficiencyPassiveLevel2 / `SolarEfficiencyPassiveLevel2` | `-` | 未解析 / Unresolved | - | - | HaveSolarEfficiencyLevel2 |
| 2,0 | SolarEfficiencyPassiveLevel3 / `SolarEfficiencyPassiveLevel3` | `-` | 未解析 / Unresolved | - | - | HaveSolarEfficiencyLevel3 |
| 2,1 | SOARepairBeamExtraTargetPassive / `SOARepairBeamExtraTargetPassive` | `-` | 未解析 / Unresolved | - | - | HaveSOARepairBeamExtraTarget |
| 2,2 | SOAOrbitalStrikeUpgradePassive / `SOAOrbitalStrikeUpgradePassive` | `-` | 未解析 / Unresolved | - | - | HaveSOAOrbitalStrikeUpgrade |
| 2,3 | SOASolarLanceUpgradePassive / `SOASolarLanceUpgradePassive` | `-` | 未解析 / Unresolved | - | - | HaveSOASolarLanceUpgrade |
| 0,0 | BrokenSolarForge / `BrokenSolarForge` | `BrokenSolarForge,Execute` | 变形技能 / CAbilMorph | - | - | - |

### TwilightCouncil / `TwilightCouncil`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMKarax.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`BuildInProgress`(基础 / Basic)、`TwilightCouncilResearch`(研究技能 / CAbilResearch)
- 关联 Behavior / Linked behaviors：`ChronoBoostTarget`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | ArmorResearchSupplicantShieldArmor / `ArmorResearchSupplicantShieldArmor` | `TwilightCouncilResearch,Research25` | 研究技能 / CAbilResearch | 升级 / Upgrade:AlarakSupplicantShieldArmor `AlarakSupplicantShieldArmor` | - | - |
| 0,0 | ResearchCharge / `ResearchCharge` | `TwilightCouncilResearch,Research1` | 研究技能 / CAbilResearch | - | - | - |
| 0,0 | ResearchShadowCharge / `ResearchShadowCharge` | `TwilightCouncilResearch,Research5` | 研究技能 / CAbilResearch | 升级 / Upgrade:ZealotResearchShadowCharge `ZealotResearchShadowCharge` | - | - |
| - | ResearchShadowStun / `ResearchShadowStun` | `TwilightCouncilResearch,Research9` | 研究技能 / CAbilResearch | 升级 / Upgrade:ZealotResearchShadowStun `ZealotResearchShadowStun` | - | - |
| 0,1 | ResearchAdeptFenixShadeSpawn / `ResearchAdeptFenixShadeSpawn` | `TwilightCouncilResearch,Research27` | 研究技能 / CAbilResearch | 升级 / Upgrade:AdeptFenixShadeSpawn `AdeptFenixShadeSpawn` | - | - |
| 1 | ResearchDragoonRange / `ResearchDragoonRange` | `TwilightCouncilResearch,Research6` | 研究技能 / CAbilResearch | 升级 / Upgrade:StalkerResearchDragoonRange `StalkerResearchDragoonRange` | - | - |
| 0,1 | ResearchReconstructionLocked / `ResearchReconstructionLocked` | `-` | 未解析 / Unresolved | - | - | KaraxLevel04 |
| 1 | ResearchStalkerTeleport / `ResearchStalkerTeleport` | `TwilightCouncilResearch,Research2` | 研究技能 / CAbilResearch | - | - | - |
| 0,1 | ZealotPurifierResearchReconstruction / `ZealotPurifierResearchReconstruction` | `TwilightCouncilResearch,Research10` | 研究技能 / CAbilResearch | 升级 / Upgrade:ZealotResearchReconstruction `ZealotResearchReconstruction` | - | - |
| 0,2 | ResearchAlarakSupplicantMaxShields / `ResearchAlarakSupplicantMaxShields` | `TwilightCouncilResearch,Research21` | 研究技能 / CAbilResearch | 升级 / Upgrade:AlarakSupplicantMaxShields `AlarakSupplicantMaxShields` | - | - |
| 0,2 | ResearchFenixKaldalisZealotCleave / `ResearchFenixKaldalisZealotCleave` | `TwilightCouncilResearch,Research30` | 研究技能 / CAbilResearch | 升级 / Upgrade:FenixKaldalisCleave `FenixKaldalisCleave` | - | - |
| 0,2 | ResearchFenixKaldalisZealotCleaveLocked / `ResearchFenixKaldalisZealotCleaveLocked` | `-` | 未解析 / Unresolved | - | - | FenixLevel04 |
| 0,2 | ResearchKaraxEnergyRegenLocked / `ResearchKaraxEnergyRegenLocked` | `-` | 未解析 / Unresolved | - | - | KaraxLevel04 |
| 0,2 | 研究快速恢复 / `ResearchKaraxEnergyRegenUpgrade` | `TwilightCouncilResearch,Research14` | 研究技能 / CAbilResearch | 升级 / Upgrade:KaraxEnergyRegenUpgrade `KaraxEnergyRegenUpgrade` | - | - |
| 0,2 | ResearchShadowStunLocked / `ResearchShadowStunLocked` | `-` | 未解析 / Unresolved | - | - | VorazunLevel04 |
| 0,2 | ResearchSupplicantMaxShieldsLocked / `ResearchSupplicantMaxShieldsLocked` | `-` | 未解析 / Unresolved | - | - | AlarakLevel04 |
| 2 | ResearchWhirlwind / `ResearchWhirlwind` | `TwilightCouncilResearch,Research3` | 研究技能 / CAbilResearch | 升级 / Upgrade:ZealotResearchWhirlwind `ZealotResearchWhirlwind` | - | - |
| 0,2 | ResearchWhirlwindLocked / `ResearchWhirlwindLocked` | `ChampionWarpTrain,Train4` | 未解析 / Unresolved | - | - | ArtanisLevel04 |
| 3 | AlarakResearchStalkerPhasingArmor / `AlarakResearchStalkerPhasingArmor` | `TwilightCouncilResearch,Research18` | 研究技能 / CAbilResearch | 升级 / Upgrade:AlarakStalkerPhasingArmor `AlarakStalkerPhasingArmor` | - | - |
| 0,3 | FenixTalisAdeptLearnBounceShotUpgrade / `FenixTalisAdeptLearnBounceShotUpgrade` | `TwilightCouncilResearch,Research26` | 研究技能 / CAbilResearch | 升级 / Upgrade:FenixChampionTalisAdeptBounceShotUpgrade `FenixChampionTalisAdeptBounceShotUpgrade` | - | - |
| 0,3 | FenixTalisAdeptLearnBounceShotUpgradeLocked / `FenixTalisAdeptLearnBounceShotUpgradeLocked` | `-` | 未解析 / Unresolved | - | - | FenixLevel04 |
| 0,3 | ResearchBlinkShieldRestoreLocked / `ResearchBlinkShieldRestoreLocked` | `-` | 未解析 / Unresolved | - | - | VorazunLevel04 |
| 3 | ResearchBlinkShieldRestoreUpgrade / `ResearchBlinkShieldRestoreUpgrade` | `TwilightCouncilResearch,Research8` | 研究技能 / CAbilResearch | 升级 / Upgrade:StalkerResearchBlinkShieldRestore `StalkerResearchBlinkShieldRestore` | - | - |
| 3 | ResearchDragoonChassis / `ResearchDragoonChassis` | `TwilightCouncilResearch,Research7` | 研究技能 / CAbilResearch | 升级 / Upgrade:StalkerResearchDragoonHealth `StalkerResearchDragoonHealth` | - | - |
| 3 | ResearchDragoonChassisLocked / `ResearchDragoonChassisLocked` | `-` | 未解析 / Unresolved | - | - | ArtanisLevel04 |
| 3 | ResearchEnergizerReclamation / `ResearchEnergizerReclamation` | `TwilightCouncilResearch,Research13` | 研究技能 / CAbilResearch | 升级 / Upgrade:EnergizerReclamation `EnergizerReclamation` | - | - |
| 3 | ResearchReclamationLocked / `ResearchReclamationLocked` | `-` | 未解析 / Unresolved | - | - | KaraxLevel04 |
| 0,3 | ResearchStalkerPhasingArmorLocked / `ResearchStalkerPhasingArmorLocked` | `-` | 未解析 / Unresolved | - | - | AlarakLevel04 |

### 凯达琳巨石 / `KhaydarinMonolith`

- 来源 / Source：名册 / Roster XMFinal CommanderBuildings.galaxy，状态 / Status galaxy，模块 / Module XMKarax.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146_CommanderBuildings.galaxy`
- 数值 / Stats：类型 / Type Structure
- Catalog 技能链接 / Catalog ability links：无 / None

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | 强化瞄准 / `KaraxTurretRange` | `-` | 未解析 / Unresolved | - | - | HaveKaraxTurretRange |
| 2,1 | 军械优化 / `KaraxTurretAttackSpeed` | `-` | 未解析 / Unresolved | - | - | HaveKaraxTurretAttackSpeed |

## 生产链补充建筑 / Production-support Buildings

### RoboticsFacility / `RoboticsFacility`

- 来源 / Source：名册 / Roster inferred production building，状态 / Status produces:ImmortalAiur/Colossus/Observer，模块 / Module XMKarax.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMKarax.SC2Mod/Base.SC2Data/GameData/UnitData.xml`
- 数值 / Stats：类型 / Type Structure
- Catalog 技能链接 / Catalog ability links：无 / None
- 关联 Behavior / Linked behaviors：`ChronoBoostTarget`
- 可生产/创建 / Produced or created：巨像 `Colossus`、不朽者 `ImmortalAiur`、侦测器 `Observer`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | Immortal / `Immortal` | `RoboticsFacilityTrain,Train4` | 训练技能 / CAbilTrain | 不朽者 `ImmortalAiur`、单位 / Unit:不朽者 `ImmortalAiur` | - | - |
| 0,1 | Colossus / `Colossus` | `RoboticsFacilityTrain,Train3` | 训练技能 / CAbilTrain | 巨像 `Colossus`、单位 / Unit:巨像 `Colossus` | - | - |
| 0,2 | Observer / `Observer` | `RoboticsFacilityTrain,Train2` | 训练技能 / CAbilTrain | 侦测器 `Observer`、单位 / Unit:侦测器 `Observer` | - | - |
| 3 | WarpinDisruptor / `WarpinDisruptor` | `-` | 未解析 / Unresolved | - | - | - |

### Stargate / `Stargate`

- 来源 / Source：名册 / Roster inferred production building，状态 / Status produces:PhoenixPurifier/Scout/Carrier，模块 / Module XMKarax.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMKarax.SC2Mod/Base.SC2Data/GameData/UnitData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：无 / None
- 关联 Behavior / Linked behaviors：`ChronoBoostTarget`
- 可生产/创建 / Produced or created：航母 `Carrier`、侦察机 `PhoenixPurifier`、侦察机 `Scout`
- 已隐藏基础按钮 / Hidden basic buttons：1 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | Phoenix / `Phoenix` | `StargateTrain,Train1` | 训练技能 / CAbilTrain | 侦察机 `PhoenixPurifier`、单位 / Unit:侦察机 `PhoenixPurifier` | - | - |
| 0,1 | WarpInScout / `WarpInScout` | `StargateTrain,Train6` | 训练技能 / CAbilTrain | 侦察机 `Scout`、单位 / Unit:侦察机 `Scout` | - | - |
| 0,2 | Carrier / `Carrier` | `StargateTrain,Train3` | 训练技能 / CAbilTrain | 航母 `Carrier`、单位 / Unit:航母 `Carrier` | - | - |

### WarpGate / `WarpGate`

- 来源 / Source：名册 / Roster inferred production building，状态 / Status produces:ZealotPurifier/SentryPurifier，模块 / Module XMKarax.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMKarax.SC2Mod/Base.SC2Data/GameData/UnitData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：无 / None
- 关联 Behavior / Linked behaviors：`ChronoBoostTarget`
- 可生产/创建 / Produced or created：激励者 `SentryPurifier`、哨兵 `ZealotPurifier`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| - | WarpGateTrain / `-` | `WarpGateTrain,Train4` | 折跃/部署训练技能 / CAbilWarpTrain | - | - | - |
| 0,0 | Zealot / `Zealot` | `WarpGateTrain,Train1` | 折跃/部署训练技能 / CAbilWarpTrain | 哨兵 `ZealotPurifier`、单位 / Unit:哨兵 `ZealotPurifier` | - | - |
| 0,1 | Sentry / `Sentry` | `WarpGateTrain,Train6` | 折跃/部署训练技能 / CAbilWarpTrain | 激励者 `SentryPurifier`、单位 / Unit:激励者 `SentryPurifier` | - | - |
| 0,0 | WarpInSupplicant / `WarpInSupplicant` | `WarpGateTrain,Train12` | 折跃/部署训练技能 / CAbilWarpTrain | - | - | - |

## 单位 / Units

### 不朽者 / `ImmortalAiur`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMKarax.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit
- Catalog 技能链接 / Catalog ability links：`ImmortalBarrierBase`(瞬发效果技能 / CAbilEffectInstant)、`ImmortalShakurasShadowCannon`(目标效果技能 / CAbilEffectTarget)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| - | ImmortalBarrierBase / `ImmortalBarrierBase` | `ImmortalBarrierBase,Execute` | 瞬发效果技能 / CAbilEffectInstant | - | - | - |
| - | ImmortalShakurasShadowCannon / `ImmortalShakurasShadowCannon` | `ImmortalShakurasShadowCannon,Execute` | 目标效果技能 / CAbilEffectTarget | - | - | - |
| 1,0 | HaveBarrier / `HaveBarrier` | `-` | 未解析 / Unresolved | - | - | HaveBarrier |
| 2,1 | ShadowCannonLocked / `ShadowCannonLocked` | `-` | 未解析 / Unresolved | - | - | KaraxLevel09 |

### 侦测器 / `Observer`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMKarax.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`move`(基础 / Basic)、`ObserverMorphtoObserverSiege`(变形技能 / CAbilMorph)、`stop`(基础 / Basic)、`Warpable`
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | HaveGraviticBoosters / `HaveGraviticBoosters` | `-` | 未解析 / Unresolved | - | - | HaveGraviticBoosters |
| 2,2 | MorphtoObserverSiege / `MorphtoObserverSiege` | `ObserverMorphtoObserverSiege,Execute` | 变形技能 / CAbilMorph | - | - | - |
| 2,4 | Detector / `Detector` | `-` | 未解析 / Unresolved | - | - | - |

### 侦察机 / `PhoenixPurifier`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMKarax.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit
- Catalog 技能链接 / Catalog ability links：`MirageGravitonBeamVoidCampaign`(目标效果技能 / CAbilEffectTarget)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`
- 已隐藏基础按钮 / Hidden basic buttons：1 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| - | GravitonBeam / `GravitonBeam` | `MirageGravitonBeamVoidCampaign,Execute` | 目标效果技能 / CAbilEffectTarget | - | 持续效果 / CEffectCreatePersistent:`GravitonBeamVoidCampaign` | - |
| - | GravitonBeamVoidCampaign / `GravitonBeamVoidCampaign` | `GravitonBeamVoidCampaign,Execute` | 目标效果技能 / CAbilEffectTarget | - | - | - |
| 2,1 | AnionPulseCrystal / `AnionPulseCrystal` | `-` | 未解析 / Unresolved | - | - | HaveKaraxPhoenixRangeUpgrade |

### 侦察机 / `Scout`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMKarax.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，生命 / Life 150，护盾 / Shields 100，费用 / Cost 250/75
- Catalog 技能链接 / Catalog ability links：`FenixMojoScoutMorph`(变形技能 / CAbilMorph)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`

- 面板技能 / Panel skills：无 / None

### 激励者 / `SentryPurifier`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMKarax.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit
- Catalog 技能链接 / Catalog ability links：`EnergizerReclamation`(目标效果技能 / CAbilEffectTarget)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`VoidSentryChronoBeamRally`、`VoidSentryChronoBeamRallyB`
- 已隐藏基础按钮 / Hidden basic buttons：1 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,1 | EnergizerReclamation / `EnergizerReclamation` | `EnergizerReclamation,Execute` | 目标效果技能 / CAbilEffectTarget | - | 效果集合 / CEffectSet:`ReclamationSet`、效果集合 / CEffectSet:`SentryReclamationSet` | - |
| 2,1 | ReclamationLocked / `ReclamationLocked` | `-` | 未解析 / Unresolved | - | - | KaraxLevel04 |
| 2,4 | 快速恢复 / `KaraxEnergyRegenUpgrade` | `-` | 未解析 / Unresolved | - | - | HaveKaraxEnergyRegenUpgrade |

### 哨兵 / `ZealotPurifier`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMKarax.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit
- Catalog 技能链接 / Catalog ability links：`Charge`(CAbilAugment / CAbilAugment)、`FenixKaldalisZealotMorph`(变形技能 / CAbilMorph)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`FenixSuppressAvengingProtocol`
- 已隐藏基础按钮 / Hidden basic buttons：1 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | Charge / `Charge` | `Charge,Execute` | CAbilAugment / CAbilAugment | - | - | - |
| 2,1 | ReconstructionLocked / `ReconstructionLocked` | `-` | 未解析 / Unresolved | - | - | KaraxLevel04 |

### 巨像 / `Colossus`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMKarax.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`move`(基础 / Basic)、`ProgressRally`(CAbilRally / CAbilRally)、`stop`(基础 / Basic)、`Warpable`
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,1 | ExtendedThermalLance / `ExtendedThermalLance` | `-` | 未解析 / Unresolved | - | - | HaveKaraxExtendedThermalLance |

### 航母 / `Carrier`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMKarax.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`CarrierHangar`(弹仓/机库技能 / CAbilArmMagazine)、`FenixClolarionCarrierMorph`(变形技能 / CAbilMorph)、`HangarQueue5`、`move`(基础 / Basic)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`Supply`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | Interceptor / `Interceptor` | `CarrierHangar,Ammo1` | 弹仓/机库技能 / CAbilArmMagazine | - | - | - |
| 2,1 | GravitonCatapult / `GravitonCatapult` | `-` | 未解析 / Unresolved | - | - | UseGravitonCatapult |

## 英雄 / Heroes

- 无 / None
