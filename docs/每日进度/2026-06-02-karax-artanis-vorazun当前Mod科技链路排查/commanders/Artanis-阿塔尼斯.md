# 阿塔尼斯 / `Artanis` 科技链路排查 / Tech Tree Diagnostics

- 描述 / Description：达拉姆大主教
- 数据来源 / Data source：当前 Mod / Current Mod，目录 / Directory：`合作指挥官版起义狂潮/Mods/XM/XMArtanis.SC2Mod`
- 当前 Mod 运行名册 / Current Mod roster：module=`XMArtanis.SC2Mod`，instance=`Artanis`
- 统计 / Stats：建筑 5、生产链补充建筑 4、单位 9、英雄 0、建筑按钮 46、单位按钮 25、效果引用 8

## 指挥官默认/顶部技能 / Commander Default / Top-panel Skills

| 技能 / Ability | 类型 / Type | 效果引用 / Effect References | Catalog 来源 / Catalog Sources |
| --- | --- | --- | --- |
| `SOAPylonPower,Execute` | 目标效果技能 / CAbilEffectTarget | 持续效果 / CEffectCreatePersistent:`SOAPylonPowerCoop` | xmartanis:1 |
| `SOAOrbitalStrikeActivate,On` | 未解析 / Unresolved | - | - |
| `CommanderPrestigeArtanisOrbitalStrikeShieldOverchargeTargeted,Execute` | 目标效果技能 / CAbilEffectTarget | 区域枚举效果 / CEffectEnumArea:`CommanderPrestigeArtanisOrbitalStrikeShieldOverchargeTargetedSearch` | xmartanis:1 |
| `SoASuperShield,Execute` | 未解析 / Unresolved | - | - |
| `SOAStrafeAttack,Execute` | 未解析 / Unresolved | - | - |
| `` | 未解析 / Unresolved | - | - |
| `` | 未解析 / Unresolved | - | - |
| `` | 未解析 / Unresolved | - | - |
| `` | 未解析 / Unresolved | - | - |
| `` | 未解析 / Unresolved | - | - |
| `` | 未解析 / Unresolved | - | - |
| `SOAOrbitalStrikeTargetingDummy,Execute` | 未解析 / Unresolved | - | - |
| `SOAOrbitalStrikeExecute,Execute` | 未解析 / Unresolved | - | - |
| `BuildInProgress,Cancel` | 未解析 / Unresolved | - | - |

## 建筑 / Buildings

### Gateway / `Gateway`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMArtanis.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`GatewayTrain`(训练技能 / CAbilTrain)、`que5notPassive`(队列技能 / CAbilQueue)、`Rally`(CAbilRally / CAbilRally)、`UpgradeToWarpGate`(变形技能 / CAbilMorph)
- 关联 Behavior / Linked behaviors：`ChronoBoostTarget`
- 可生产/创建 / Produced or created：龙骑士 `Dragoon`、高阶圣堂武士 `HighTemplar`、哨兵 `Zealot`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| - | que5notPassive / `-` | `que5notPassive,CancelLast` | 队列技能 / CAbilQueue | - | - | - |
| 0,0 | Zealot / `Zealot` | `GatewayTrain,Train1` | 训练技能 / CAbilTrain | 哨兵 `Zealot`、ZealotShakuras `ZealotShakuras`、单位 / Unit:哨兵 `Zealot` | - | - |
| 0,2 | Stalker / `Stalker` | `GatewayTrain,Train2` | 训练技能 / CAbilTrain | 龙骑士 `Dragoon`、StalkerShakuras `StalkerShakuras`、单位 / Unit:龙骑士 `Dragoon` | - | - |
| 1,0 | HighTemplar / `HighTemplar` | `GatewayTrain,Train8` | 训练技能 / CAbilTrain | 高阶圣堂武士 `HighTemplar`、单位 / Unit:高阶圣堂武士 `HighTemplar` | - | - |

### 光子炮台 / `PhotonCannon`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMArtanis.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`PhaseCannonProjection`(目标效果技能 / CAbilEffectTarget)、`stop`(基础 / Basic)
- 已隐藏基础按钮 / Hidden basic buttons：1 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

- 面板技能 / Panel skills：无 / None

### RoboticsBay / `RoboticsBay`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMArtanis.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`BuildInProgress`(基础 / Basic)、`que5`(队列技能 / CAbilQueue)、`RoboticsBayResearch`(研究技能 / CAbilResearch)
- 关联 Behavior / Linked behaviors：`ChronoBoostTarget`
- 已隐藏基础按钮 / Hidden basic buttons：2 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| - | 掠夺者 / `ReaverPassive` | `-` | 未解析 / Unresolved | - | - | HaveVoidReaver |
| 0,0 | ResearchGraviticBooster / `ResearchGraviticBooster` | `RoboticsBayResearch,Research2` | 研究技能 / CAbilResearch | - | - | - |
| 0,0 | ResearchVanguardArmoredDamage / `ResearchVanguardArmoredDamage` | `RoboticsBayResearch,Research16` | 研究技能 / CAbilResearch | 升级 / Upgrade:VanguardArmoredDamage `VanguardArmoredDamage` | - | - |
| 0,1 | ResearchAlarakVanguardIncreaseSplashArea / `ResearchAlarakVanguardIncreaseSplashArea` | `RoboticsBayResearch,Research15` | 研究技能 / CAbilResearch | 升级 / Upgrade:AlarakVanguardIncreaseSplashArea `AlarakVanguardIncreaseSplashArea` | - | - |
| 0,1 | ResearchBarrier / `ResearchBarrier` | `RoboticsBayResearch,Research9` | 研究技能 / CAbilResearch | 升级 / Upgrade:ImmortalResearchBarrierAdvanced `ImmortalResearchBarrierAdvanced` | - | - |
| 0,2 | ResearchAlarakColossusChargedBlastAirAttack / `ResearchAlarakColossusChargedBlastAirAttack` | `RoboticsBayResearch,Research18` | 研究技能 / CAbilResearch | 升级 / Upgrade:AlarakColossusChargedBlastAirAttack `AlarakColossusChargedBlastAirAttack` | - | - |
| 0,2 | ResearchDisruptorCloak / `ResearchDisruptorCloak` | `RoboticsBayResearch,Research19` | 研究技能 / CAbilResearch | 升级 / Upgrade:DisruptorCloak `DisruptorCloak` | - | - |
| 0,2 | ResearchFireBeam / `ResearchFireBeam` | `RoboticsBayResearch,Research12` | 研究技能 / CAbilResearch | 升级 / Upgrade:ColossusFireBeam `ColossusFireBeam` | - | - |
| 0,2 | ResearchIncreasedScarabCountLocked / `ResearchIncreasedScarabCountLocked` | `-` | 未解析 / Unresolved | - | - | ArtanisLevel09 |
| 0,2 | ResearchReaverIncreasedScarabCount / `ResearchReaverIncreasedScarabCount` | `RoboticsBayResearch,Research13` | 研究技能 / CAbilResearch | 升级 / Upgrade:ReaverIncreasedScarabCount `ReaverIncreasedScarabCount` | - | - |
| 0,3 | ResearchAlarakColossusChargedBlastChargeTime / `ResearchAlarakColossusChargedBlastChargeTime` | `RoboticsBayResearch,Research17` | 研究技能 / CAbilResearch | 升级 / Upgrade:AlarakColossusChargedBlastChargeTime `AlarakColossusChargedBlastChargeTime` | - | - |
| 0,3 | ResearchDisruptorSecondExplosion / `ResearchDisruptorSecondExplosion` | `RoboticsBayResearch,Research20` | 研究技能 / CAbilResearch | 升级 / Upgrade:DisruptorSecondExplosion `DisruptorSecondExplosion` | - | - |
| 0,3 | ResearchIncreasedScarabSplashRadiusLocked / `ResearchIncreasedScarabSplashRadiusLocked` | `-` | 未解析 / Unresolved | - | - | ArtanisLevel09 |
| 0,3 | ResearchReaverIncreasedScarabSplashRadius / `ResearchReaverIncreasedScarabSplashRadius` | `RoboticsBayResearch,Research14` | 研究技能 / CAbilResearch | 升级 / Upgrade:ReaverIncreasedScarabSplashRadius `ReaverIncreasedScarabSplashRadius` | - | - |
| 1 | 巨像 / `ColossusPassive` | `-` | 未解析 / Unresolved | - | - | HaveColossus |
| 1,0 | 巨像 / `ColossusPassive` | `-` | 未解析 / Unresolved | - | - | HaveVoidColossusFireBeam |
| 1,0 | WrathwalkerPassive / `WrathwalkerPassive` | `-` | 未解析 / Unresolved | - | - | HaveVoidColossusTaldarim |
| 2 | FenixImmortalResearchDetonationShot / `FenixImmortalResearchDetonationShot` | `RoboticsBayResearch,Research21` | 研究技能 / CAbilResearch | 升级 / Upgrade:FenixImmortalDetonationShot `FenixImmortalDetonationShot` | - | - |
| 2,1 | ResearchFenixWarbringerColossusPowerShot / `ResearchFenixWarbringerColossusPowerShot` | `RoboticsBayResearch,Research23` | 研究技能 / CAbilResearch | 升级 / Upgrade:FenixWarbringerColossusPowerShot `FenixWarbringerColossusPowerShot` | - | - |

### RoboticsFacilityWarp / `RoboticsFacilityWarp`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMArtanis.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Structure
- Catalog 技能链接 / Catalog ability links：`MorphBackToRoboticsFacility`(变形技能 / CAbilMorph)、`RoboticsFacilityWarpTrain`(折跃/部署训练技能 / CAbilWarpTrain)
- 关联 Behavior / Linked behaviors：`ChronoBoostTarget`
- 可生产/创建 / Produced or created：不朽者 `ImmortalAiur`、侦测器 `Observer`、掠夺者 `Reaver`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | Immortal / `Immortal` | `RoboticsFacilityWarpTrain,Train4` | 折跃/部署训练技能 / CAbilWarpTrain | 不朽者 `ImmortalAiur`、ImmortalShakuras `ImmortalShakuras`、ImmortalTaldarim `ImmortalTaldarim`、单位 / Unit:不朽者 `ImmortalAiur` | - | - |
| 1 | MorphBackToRoboticsFacility / `MorphBackToRoboticsFacility` | `MorphBackToRoboticsFacility,Execute` | 变形技能 / CAbilMorph | - | - | - |
| 0,1 | Reaver / `Reaver` | `RoboticsFacilityWarpTrain,Train3` | 折跃/部署训练技能 / CAbilWarpTrain | 掠夺者 `Reaver`、ColossusTaldarim `ColossusTaldarim`、单位 / Unit:掠夺者 `Reaver` | - | - |
| 0,2 | Observer / `Observer` | `RoboticsFacilityWarpTrain,Train2` | 折跃/部署训练技能 / CAbilWarpTrain | 侦测器 `Observer`、单位 / Unit:侦测器 `Observer` | - | - |
| 2,2 | SuperiorWarpRoboticsFacilities / `SuperiorWarpRoboticsFacilities` | `-` | 未解析 / Unresolved | - | - | HaveSuperiorWarpGates |

### TwilightCouncil / `TwilightCouncil`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMArtanis.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
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
| 1 | ResearchStalkerTeleport / `ResearchStalkerTeleport` | `TwilightCouncilResearch,Research2` | 研究技能 / CAbilResearch | - | - | - |
| 0,2 | ResearchAlarakSupplicantMaxShields / `ResearchAlarakSupplicantMaxShields` | `TwilightCouncilResearch,Research21` | 研究技能 / CAbilResearch | 升级 / Upgrade:AlarakSupplicantMaxShields `AlarakSupplicantMaxShields` | - | - |
| 0,2 | ResearchFenixKaldalisZealotCleave / `ResearchFenixKaldalisZealotCleave` | `TwilightCouncilResearch,Research30` | 研究技能 / CAbilResearch | 升级 / Upgrade:FenixKaldalisCleave `FenixKaldalisCleave` | - | - |
| 0,2 | 研究快速恢复 / `ResearchKaraxEnergyRegenUpgrade` | `TwilightCouncilResearch,Research14` | 研究技能 / CAbilResearch | 升级 / Upgrade:KaraxEnergyRegenUpgrade `KaraxEnergyRegenUpgrade` | - | - |
| 2 | ResearchWhirlwind / `ResearchWhirlwind` | `TwilightCouncilResearch,Research3` | 研究技能 / CAbilResearch | 升级 / Upgrade:ZealotResearchWhirlwind `ZealotResearchWhirlwind` | - | - |
| 0,2 | ResearchWhirlwindLocked / `ResearchWhirlwindLocked` | `ChampionWarpTrain,Train4` | 未解析 / Unresolved | - | - | ArtanisLevel04 |
| 3 | AlarakResearchStalkerPhasingArmor / `AlarakResearchStalkerPhasingArmor` | `TwilightCouncilResearch,Research18` | 研究技能 / CAbilResearch | 升级 / Upgrade:AlarakStalkerPhasingArmor `AlarakStalkerPhasingArmor` | - | - |
| 0,3 | FenixTalisAdeptLearnBounceShotUpgrade / `FenixTalisAdeptLearnBounceShotUpgrade` | `TwilightCouncilResearch,Research26` | 研究技能 / CAbilResearch | 升级 / Upgrade:FenixChampionTalisAdeptBounceShotUpgrade `FenixChampionTalisAdeptBounceShotUpgrade` | - | - |
| 3 | ResearchBlinkShieldRestoreUpgrade / `ResearchBlinkShieldRestoreUpgrade` | `TwilightCouncilResearch,Research8` | 研究技能 / CAbilResearch | 升级 / Upgrade:StalkerResearchBlinkShieldRestore `StalkerResearchBlinkShieldRestore` | - | - |
| 3 | ResearchDragoonChassis / `ResearchDragoonChassis` | `TwilightCouncilResearch,Research7` | 研究技能 / CAbilResearch | 升级 / Upgrade:StalkerResearchDragoonHealth `StalkerResearchDragoonHealth` | - | - |
| 3 | ResearchDragoonChassisLocked / `ResearchDragoonChassisLocked` | `-` | 未解析 / Unresolved | - | - | ArtanisLevel04 |
| 3 | ResearchEnergizerReclamation / `ResearchEnergizerReclamation` | `TwilightCouncilResearch,Research13` | 研究技能 / CAbilResearch | 升级 / Upgrade:EnergizerReclamation `EnergizerReclamation` | - | - |

## 生产链补充建筑 / Production-support Buildings

### RoboticsFacility / `RoboticsFacility`

- 来源 / Source：名册 / Roster inferred production building，状态 / Status produces:ImmortalAiur，模块 / Module XMArtanis.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMArtanis.SC2Mod/Base.SC2Data/GameData/UnitData.xml`
- 数值 / Stats：类型 / Type Structure
- Catalog 技能链接 / Catalog ability links：无 / None
- 关联 Behavior / Linked behaviors：`ChronoBoostTarget`
- 可生产/创建 / Produced or created：不朽者 `ImmortalAiur`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | Immortal / `Immortal` | `RoboticsFacilityTrain,Train4` | 训练技能 / CAbilTrain | 不朽者 `ImmortalAiur` | - | - |
| 0,1 | BuildReaverLocked / `BuildReaverLocked` | `-` | 未解析 / Unresolved | - | - | ArtanisLevel05 |
| 0,1 | Colossus / `Colossus` | `RoboticsFacilityTrain,Train3` | 训练技能 / CAbilTrain | - | - | - |
| 3 | WarpinDisruptor / `WarpinDisruptor` | `-` | 未解析 / Unresolved | - | - | - |
| 0,3 | WarpInWarPrism / `WarpInWarPrism` | `RoboticsFacilityTrain,Train30` | 训练技能 / CAbilTrain | 单位 / Unit:WarpPrismTaldarim `WarpPrismTaldarim` | - | - |
| 0,3 | WarpPrism / `WarpPrism` | `RoboticsFacilityTrain,Train1` | 训练技能 / CAbilTrain | - | - | - |
| 2,0 | TransformToRoboticsWarpFacilityLocked / `TransformToRoboticsWarpFacilityLocked` | `-` | 未解析 / Unresolved | - | - | ArtanisLevel08 |

### Stargate / `Stargate`

- 来源 / Source：名册 / Roster inferred production building，状态 / Status produces:PhoenixAiur/Tempest，模块 / Module XMArtanis.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMArtanis.SC2Mod/Base.SC2Data/GameData/UnitData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：无 / None
- 关联 Behavior / Linked behaviors：`ChronoBoostTarget`
- 可生产/创建 / Produced or created：凤凰 `PhoenixAiur`、风暴战舰 `Tempest`，耗时 / Time 5s
- 已隐藏基础按钮 / Hidden basic buttons：1 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | Phoenix / `Phoenix` | `StargateTrain,Train1` | 训练技能 / CAbilTrain | 凤凰 `PhoenixAiur` | - | - |
| - | Tempest / `Tempest` | `StargateTrain,Train10` | 训练技能 / CAbilTrain | 风暴战舰 `Tempest`、单位 / Unit:风暴战舰 `Tempest` | - | - |
| 2,0 | TransformToStarWarpGateLocked / `TransformToStarWarpGateLocked` | `-` | 未解析 / Unresolved | - | - | ArtanisLevel08 |

### StargateWarp / `StargateWarp`

- 来源 / Source：名册 / Roster inferred production building，状态 / Status produces:Tempest，模块 / Module XMArtanis.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMArtanis.SC2Mod/Base.SC2Data/GameData/UnitData.xml`
- 数值 / Stats：类型 / Type Structure
- Catalog 技能链接 / Catalog ability links：无 / None
- 关联 Behavior / Linked behaviors：`ChronoBoostTarget`
- 可生产/创建 / Produced or created：风暴战舰 `Tempest`，耗时 / Time 5s
- 已隐藏基础按钮 / Hidden basic buttons：3 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0 | Tempest / `Tempest` | `StargateWarpTrain,Train10` | 折跃/部署训练技能 / CAbilWarpTrain | 风暴战舰 `Tempest`、单位 / Unit:风暴战舰 `Tempest` | - | - |
| 1 | BuildTempestLocked / `BuildTempestLocked` | `-` | 未解析 / Unresolved | - | - | ArtanisLevel11 |
| 1 | Carrier / `Carrier` | `StargateWarpTrain,Train3` | 折跃/部署训练技能 / CAbilWarpTrain | - | - | - |
| 1 | MorphBackToStargate / `MorphBackToStargate` | `MorphBackToStargate,Execute` | 未解析 / Unresolved | - | - | - |
| 0,3 | CarrierTaldarimMothership / `CarrierTaldarimMothership` | `StargateWarpTrain,Train14` | 折跃/部署训练技能 / CAbilWarpTrain | 单位 / Unit:SOAMothershipv4 `SOAMothershipv4` | - | - |
| 2,2 | SuperiorWarpStargates / `SuperiorWarpStargates` | `-` | 未解析 / Unresolved | - | - | HaveSuperiorWarpGates |

### WarpGate / `WarpGate`

- 来源 / Source：名册 / Roster inferred production building，状态 / Status produces:Zealot/HighTemplar，模块 / Module XMArtanis.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMArtanis.SC2Mod/Base.SC2Data/GameData/UnitData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：无 / None
- 关联 Behavior / Linked behaviors：`ChronoBoostTarget`
- 可生产/创建 / Produced or created：高阶圣堂武士 `HighTemplar`、哨兵 `Zealot`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| - | WarpGateTrain / `-` | `WarpGateTrain,Train4` | 折跃/部署训练技能 / CAbilWarpTrain | - | - | - |
| 0,0 | Zealot / `Zealot` | `WarpGateTrain,Train1` | 折跃/部署训练技能 / CAbilWarpTrain | 哨兵 `Zealot`、单位 / Unit:哨兵 `Zealot` | - | - |
| 1,0 | HighTemplar / `HighTemplar` | `WarpGateTrain,Train8` | 折跃/部署训练技能 / CAbilWarpTrain | 高阶圣堂武士 `HighTemplar`、单位 / Unit:高阶圣堂武士 `HighTemplar` | - | - |
| 0,0 | WarpInSupplicant / `WarpInSupplicant` | `WarpGateTrain,Train12` | 折跃/部署训练技能 / CAbilWarpTrain | - | - | - |

## 单位 / Units

### 执政官 / `Archon`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMArtanis.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`FeedbackArchon`(目标效果技能 / CAbilEffectTarget)、`move`(基础 / Basic)、`ProgressRally`(CAbilRally / CAbilRally)、`PsiStormArchon`(目标效果技能 / CAbilEffectTarget)、`stop`(基础 / Basic)、`Warpable`
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`ArtanisHighArchon`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | HighTemplarEnergyUpgrade / `HighTemplarEnergyUpgrade` | `-` | 未解析 / Unresolved | - | - | HaveHighTemplarEnergyUpgradeHighArchon |
| 1,1 | HealingPsionicStorm / `HealingPsionicStorm` | `-` | 未解析 / Unresolved | - | - | HaveHealingPsionicStormHighArchon |
| 2,0 | Feedback / `Feedback` | `FeedbackArchon,Execute` | 目标效果技能 / CAbilEffectTarget | - | - | - |
| 2,0 | FeedbackLocked / `FeedbackLocked` | `-` | 未解析 / Unresolved | - | - | ArtanisLevel07 |
| 2,1 | PsionicStormLocked / `PsionicStormLocked` | `-` | 未解析 / Unresolved | - | - | ArtanisLevel07 |
| 2,1 | PsiStorm / `PsiStorm` | `PsiStormArchon,Execute` | 目标效果技能 / CAbilEffectTarget | - | - | - |

### 不朽者 / `ImmortalAiur`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMArtanis.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit
- Catalog 技能链接 / Catalog ability links：`ImmortalBarrierBase`(瞬发效果技能 / CAbilEffectInstant)、`ImmortalShakurasShadowCannon`(目标效果技能 / CAbilEffectTarget)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| - | ImmortalBarrierBase / `ImmortalBarrierBase` | `ImmortalBarrierBase,Execute` | 瞬发效果技能 / CAbilEffectInstant | - | - | - |
| - | ImmortalShakurasShadowCannon / `ImmortalShakurasShadowCannon` | `ImmortalShakurasShadowCannon,Execute` | 目标效果技能 / CAbilEffectTarget | - | - | - |
| 1,0 | HaveBarrier / `HaveBarrier` | `-` | 未解析 / Unresolved | - | - | HaveBarrier |

### 侦测器 / `Observer`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMArtanis.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`move`(基础 / Basic)、`ObserverMorphtoObserverSiege`(变形技能 / CAbilMorph)、`stop`(基础 / Basic)、`Warpable`
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | HaveGraviticBoosters / `HaveGraviticBoosters` | `-` | 未解析 / Unresolved | - | - | HaveGraviticBoosters |
| 2,2 | MorphtoObserverSiege / `MorphtoObserverSiege` | `ObserverMorphtoObserverSiege,Execute` | 变形技能 / CAbilMorph | - | - | - |
| 2,4 | Detector / `Detector` | `-` | 未解析 / Unresolved | - | - | - |

### 凤凰 / `PhoenixAiur`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMArtanis.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：无 / None
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`VorazunCommanderCloak`
- 已隐藏基础按钮 / Hidden basic buttons：1 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,2 | HaveAnionPulseCrystals / `HaveAnionPulseCrystals` | `-` | 未解析 / Unresolved | - | - | HavePhoenixRangeUpgrade |

### 龙骑士 / `Dragoon`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMArtanis.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，生命 / Life 100
- Catalog 技能链接 / Catalog ability links：无 / None
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`
- 已隐藏基础按钮 / Hidden basic buttons：1 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,1 | VoidStalkerDragoonRange / `VoidStalkerDragoonRange` | `-` | 未解析 / Unresolved | - | - | HaveSingularityCharge |

### 哨兵 / `Zealot`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMArtanis.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`Charge`(CAbilAugment / CAbilAugment)、`move`(基础 / Basic)、`ProgressRally`(CAbilRally / CAbilRally)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | Charge / `Charge` | `Charge,Execute` | CAbilAugment / CAbilAugment | - | - | - |
| 2,1 | WhirlwindLocked / `WhirlwindLocked` | `-` | 未解析 / Unresolved | - | - | ArtanisLevel04 |

### 高阶圣堂武士 / `HighTemplar`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMArtanis.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`ArchonWarp`(合并技能 / CAbilMerge)、`Feedback`(目标效果技能 / CAbilEffectTarget)、`move`(基础 / Basic)、`ProgressRally`(CAbilRally / CAbilRally)、`PsiStorm`(目标效果技能 / CAbilEffectTarget)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`DamageDisablesAttackHighTemplar`
- 可生产/创建 / Produced or created：执政官 `Archon`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | HighTemplarEnergyUpgrade / `HighTemplarEnergyUpgrade` | `-` | 未解析 / Unresolved | - | - | HaveHighTemplarEnergyUpgrade |
| 1,1 | HealingPsionicStorm / `HealingPsionicStorm` | `-` | 未解析 / Unresolved | - | - | HaveHealingPsionicStorm |
| 2,0 | Feedback / `Feedback` | `Feedback,Execute` | 目标效果技能 / CAbilEffectTarget | - | - | - |
| 2,1 | PsiStorm / `PsiStorm` | `PsiStorm,Execute` | 目标效果技能 / CAbilEffectTarget | - | - | - |
| 2,3 | AWrp / `AWrp` | `ArchonWarp,SelectedUnits` | 合并技能 / CAbilMerge | 单位 / Unit:执政官 `Archon` | - | - |

### 风暴战舰 / `Tempest`

- 来源 / Source：名册 / Roster XMFinal CommanderRosters.galaxy，状态 / Status galaxy，模块 / Module XMArtanis.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146_CommanderRosters.galaxy`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`LightningBomb`(目标效果技能 / CAbilEffectTarget)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | DisintegrationLocked / `DisintegrationLocked` | `-` | 未解析 / Unresolved | - | - | ArtanisLevel12 |
| 2,0 | LightningBomb / `LightningBomb` | `LightningBomb,Execute` | 目标效果技能 / CAbilEffectTarget | - | - | - |

### 掠夺者 / `Reaver`

- 来源 / Source：名册 / Roster XMFinal CommanderRosters.galaxy，状态 / Status galaxy，模块 / Module XMArtanis.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146_CommanderRosters.galaxy`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：无 / None
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,1 | HaveReaverIncreasedScarabCount / `HaveReaverIncreasedScarabCount` | `-` | 未解析 / Unresolved | - | - | HaveReaverIncreasedScarabCount |
| 2,2 | PassiveReaverIncreasedScarabSplashRadius / `PassiveReaverIncreasedScarabSplashRadius` | `-` | 未解析 / Unresolved | - | - | HaveReaverIncreasedScarabSplashRadius |

## 英雄 / Heroes

- 无 / None
