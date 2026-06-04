# 阿塔尼斯 / `Artanis` 科技链路排查 / Tech Tree Diagnostics

- 描述 / Description：达拉姆大主教
- 数据来源 / Data source：当前 Mod / Current Mod，目录 / Directory：`合作指挥官版起义狂潮/Mods/XM/XMArtanis.SC2Mod`
- 当前 Mod 运行名册 / Current Mod roster：module=`XMArtanis.SC2Mod`，instance=`Artanis`
- 统计 / Stats：建筑 5、生产链补充建筑 4、单位 9、英雄 0、建筑按钮 22、单位按钮 27、效果引用 12
- 名称显示 / Name display：能从当前 Mod zhCN 解析时显示“中文名 / `英文ID`”；仅显示 `ID` 表示当前 Mod 未找到可用中文名。

## 初始化/开局单位 / Initial Opener

| 槽位 / Slot | 单位 / Unit | 预期类型 / Expected Kind | Catalog 父级 / Catalog Parent | 是否在运行名册 / In Runtime Roster | 来源 / Source |
| --- | --- | --- | --- | --- | --- |
| 初始基地 / Command Center | `Nexus` | building | - | 否 / No | Catalog xmcore，Instance Artanis，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMCore.SC2Mod/Base.SC2Data/GameData/UserData.xml` |
| 初始工人 / Worker | `Probe` | unit | - | 否 / No | Catalog xmcore，Instance Artanis，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMCore.SC2Mod/Base.SC2Data/GameData/UserData.xml` |
| 第二初始单位 / Second Unit | `Pylon` | unit | - | 否 / No | Catalog xmcore，Instance Artanis，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMCore.SC2Mod/Base.SC2Data/GameData/UserData.xml` |

## 指挥官默认/顶部技能 / Commander Default / Top-panel Skills

| 技能名 / Skill Name | Ability/Cmd | 类型 / Type | 效果引用 / Effect References | Catalog 来源 / Catalog Sources |
| --- | --- | --- | --- | --- |
| `SOAPylonPower` | `SOAPylonPower,Execute` | 目标效果技能 / CAbilEffectTarget | 持续效果 / CEffectCreatePersistent:`SOAPylonPowerCoop` | xmartanis:1 |
| `SOAOrbitalStrikeActivate` | `SOAOrbitalStrikeActivate,On` | 未解析 / Unresolved | - | - |
| `CommanderPrestigeArtanisOrbitalStrikeShieldOverchargeTargeted` | `CommanderPrestigeArtanisOrbitalStrikeShieldOverchargeTargeted,Execute` | 目标效果技能 / CAbilEffectTarget | 区域枚举效果 / CEffectEnumArea:`CommanderPrestigeArtanisOrbitalStrikeShieldOverchargeTargetedSearch` | xmartanis:1 |
| `SoASuperShield` | `SoASuperShield,Execute` | 瞬发效果技能 / CAbilEffectInstant | 修改单位效果 / CEffectModifyUnit:`SOASuperShieldDummy` | xmartanis:1 |
| `SOAStrafeAttack` | `SOAStrafeAttack,Execute` | 未解析 / Unresolved | - | - |
| `SOAStrafeAttackLocked` | `-` | 未解析 / Unresolved | - | - |
| `CommanderPrestigeArtanisGuardianShellLocked` | `-` | 未解析 / Unresolved | - | - |
| `SOAHeroicShield` | `-` | 未解析 / Unresolved | - | - |
| `SOAHeroicShieldLocked` | `-` | 未解析 / Unresolved | - | - |
| `SOAWarpTech` | `-` | 未解析 / Unresolved | - | - |
| `WarpHarmonizationLocked` | `-` | 未解析 / Unresolved | - | - |
| `SOAOrbitalStrikeTargetingDummy` | `SOAOrbitalStrikeTargetingDummy,Execute` | 未解析 / Unresolved | - | - |
| `SOAOrbitalStrikeExecute` | `SOAOrbitalStrikeExecute,Execute` | 未解析 / Unresolved | - | - |
| `BuildInProgress` | `BuildInProgress,Cancel` | 未解析 / Unresolved | - | - |

## 建筑 / Buildings

### `Gateway`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMArtanis.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`GatewayTrain`(训练技能 / CAbilTrain)、`que5notPassive`(队列技能 / CAbilQueue)、`Rally`(CAbilRally / CAbilRally)、`UpgradeToWarpGate`(变形技能 / CAbilMorph)
- 关联 Behavior / Linked behaviors：`ChronoBoostTarget`
- 可生产/创建 / Produced or created：龙骑士 / `Dragoon`、高阶圣堂武士 / `HighTemplar`、哨兵 / `Zealot`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| - | `que5notPassive` | `que5notPassive,CancelLast` | 队列技能 / CAbilQueue | - | - | - |
| 0,0 | `GatewayTrain` | `GatewayTrain,Train1` | 训练技能 / CAbilTrain | 哨兵 / `Zealot`、`ZealotShakuras`、单位 / Unit:哨兵 / `Zealot` | - | - |
| 0,2 | `GatewayTrain` | `GatewayTrain,Train2` | 训练技能 / CAbilTrain | 龙骑士 / `Dragoon`、`StalkerShakuras`、单位 / Unit:龙骑士 / `Dragoon` | - | - |
| 1,0 | `GatewayTrain` | `GatewayTrain,Train8` | 训练技能 / CAbilTrain | 高阶圣堂武士 / `HighTemplar`、单位 / Unit:高阶圣堂武士 / `HighTemplar` | - | - |

### 光子炮台 / `PhotonCannon`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMArtanis.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`PhaseCannonProjection`、`stop`(基础 / Basic)
- 已隐藏基础按钮 / Hidden basic buttons：1 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

- 面板技能 / Panel skills：无 / None

### `RoboticsBay`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMArtanis.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`BuildInProgress`(基础 / Basic)、`que5`(队列技能 / CAbilQueue)、`RoboticsBayResearch`(研究技能 / CAbilResearch)
- 关联 Behavior / Linked behaviors：`ChronoBoostTarget`
- 已隐藏基础按钮 / Hidden basic buttons：2 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| - | 掠夺者 / `ReaverPassive` | `-` | 未解析 / Unresolved | - | - | HaveVoidReaver |
| 0,0 | `RoboticsBayResearch` | `RoboticsBayResearch,Research2` | 研究技能 / CAbilResearch | - | - | - |
| 0,1 | `RoboticsBayResearch` | `RoboticsBayResearch,Research9` | 研究技能 / CAbilResearch | 升级 / Upgrade:`ImmortalResearchBarrierAdvanced` | - | - |
| 0,2 | `ResearchIncreasedScarabCountLocked` | `-` | 未解析 / Unresolved | - | - | ArtanisLevel09 |
| 0,2 | `RoboticsBayResearch` | `RoboticsBayResearch,Research13` | 研究技能 / CAbilResearch | 升级 / Upgrade:`ReaverIncreasedScarabCount` | - | - |
| 0,3 | `ResearchIncreasedScarabSplashRadiusLocked` | `-` | 未解析 / Unresolved | - | - | ArtanisLevel09 |
| 0,3 | `RoboticsBayResearch` | `RoboticsBayResearch,Research14` | 研究技能 / CAbilResearch | 升级 / Upgrade:`ReaverIncreasedScarabSplashRadius` | - | - |

### `RoboticsFacilityWarp`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMArtanis.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Structure
- Catalog 技能链接 / Catalog ability links：`MorphBackToRoboticsFacility`、`RoboticsFacilityWarpTrain`(折跃/部署训练技能 / CAbilWarpTrain)
- 关联 Behavior / Linked behaviors：`ChronoBoostTarget`
- 可生产/创建 / Produced or created：不朽者 / `ImmortalAiur`、侦测器 / `Observer`、掠夺者 / `Reaver`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | `RoboticsFacilityWarpTrain` | `RoboticsFacilityWarpTrain,Train4` | 折跃/部署训练技能 / CAbilWarpTrain | 不朽者 / `ImmortalAiur`、`ImmortalShakuras`、`ImmortalTaldarim`、单位 / Unit:不朽者 / `ImmortalAiur` | - | - |
| 1 | `MorphBackToRoboticsFacility` | `MorphBackToRoboticsFacility,Execute` | 未解析 / Unresolved | - | - | - |
| 0,1 | `RoboticsFacilityWarpTrain` | `RoboticsFacilityWarpTrain,Train3` | 折跃/部署训练技能 / CAbilWarpTrain | 掠夺者 / `Reaver`、`ColossusTaldarim`、单位 / Unit:掠夺者 / `Reaver` | - | - |
| 0,2 | `RoboticsFacilityWarpTrain` | `RoboticsFacilityWarpTrain,Train2` | 折跃/部署训练技能 / CAbilWarpTrain | 侦测器 / `Observer`、单位 / Unit:侦测器 / `Observer` | - | - |
| 2,2 | `SuperiorWarpRoboticsFacilities` | `-` | 未解析 / Unresolved | - | - | HaveSuperiorWarpGates |

### `TwilightCouncil`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMArtanis.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`BuildInProgress`(基础 / Basic)、`TwilightCouncilResearch`(研究技能 / CAbilResearch)
- 关联 Behavior / Linked behaviors：`ChronoBoostTarget`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | `TwilightCouncilResearch` | `TwilightCouncilResearch,Research1` | 研究技能 / CAbilResearch | - | - | - |
| 1 | `TwilightCouncilResearch` | `TwilightCouncilResearch,Research6` | 研究技能 / CAbilResearch | 升级 / Upgrade:`StalkerResearchDragoonRange` | - | - |
| 2 | `TwilightCouncilResearch` | `TwilightCouncilResearch,Research3` | 研究技能 / CAbilResearch | 升级 / Upgrade:`ZealotResearchWhirlwind` | - | - |
| 0,2 | `ChampionWarpTrain` | `ChampionWarpTrain,Train4` | 未解析 / Unresolved | - | - | ArtanisLevel04 |
| 3 | `TwilightCouncilResearch` | `TwilightCouncilResearch,Research7` | 研究技能 / CAbilResearch | 升级 / Upgrade:`StalkerResearchDragoonHealth` | - | - |
| 3 | `ResearchDragoonChassisLocked` | `-` | 未解析 / Unresolved | - | - | ArtanisLevel04 |

## 生产链补充建筑 / Production-support Buildings

### `RoboticsFacility`

- 来源 / Source：名册 / Roster inferred production building，状态 / Status produces:ImmortalAiur，模块 / Module XMArtanis.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMArtanis.SC2Mod/Base.SC2Data/GameData/UnitData.xml`
- 数值 / Stats：类型 / Type Structure
- Catalog 技能链接 / Catalog ability links：无 / None
- 关联 Behavior / Linked behaviors：`ChronoBoostTarget`
- 可生产/创建 / Produced or created：不朽者 / `ImmortalAiur`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | `RoboticsFacilityTrain` | `RoboticsFacilityTrain,Train4` | 训练技能 / CAbilTrain | 不朽者 / `ImmortalAiur` | - | - |
| 0,1 | `BuildReaverLocked` | `-` | 未解析 / Unresolved | - | - | ArtanisLevel05 |
| 0,1 | `RoboticsFacilityTrain` | `RoboticsFacilityTrain,Train3` | 训练技能 / CAbilTrain | - | - | - |
| 3 | `WarpinDisruptor` | `-` | 未解析 / Unresolved | - | - | - |
| 0,3 | `RoboticsFacilityTrain` | `RoboticsFacilityTrain,Train30` | 训练技能 / CAbilTrain | 单位 / Unit:`WarpPrismTaldarim` | - | - |
| 0,3 | `RoboticsFacilityTrain` | `RoboticsFacilityTrain,Train1` | 训练技能 / CAbilTrain | - | - | - |
| 2,0 | `TransformToRoboticsWarpFacilityLocked` | `-` | 未解析 / Unresolved | - | - | ArtanisLevel08 |

### `Stargate`

- 来源 / Source：名册 / Roster inferred production building，状态 / Status produces:PhoenixAiur/Tempest，模块 / Module XMArtanis.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMArtanis.SC2Mod/Base.SC2Data/GameData/UnitData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：无 / None
- 关联 Behavior / Linked behaviors：`ChronoBoostTarget`
- 可生产/创建 / Produced or created：凤凰 / `PhoenixAiur`、风暴战舰 / `Tempest`，耗时 / Time 5s
- 已隐藏基础按钮 / Hidden basic buttons：1 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | `StargateTrain` | `StargateTrain,Train1` | 训练技能 / CAbilTrain | 凤凰 / `PhoenixAiur` | - | - |
| - | `StargateTrain` | `StargateTrain,Train10` | 训练技能 / CAbilTrain | 风暴战舰 / `Tempest`、单位 / Unit:风暴战舰 / `Tempest` | - | - |
| 2,0 | `TransformToStarWarpGateLocked` | `-` | 未解析 / Unresolved | - | - | ArtanisLevel08 |

### `StargateWarp`

- 来源 / Source：名册 / Roster inferred production building，状态 / Status produces:Tempest，模块 / Module XMArtanis.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMArtanis.SC2Mod/Base.SC2Data/GameData/UnitData.xml`
- 数值 / Stats：类型 / Type Structure
- Catalog 技能链接 / Catalog ability links：无 / None
- 关联 Behavior / Linked behaviors：`ChronoBoostTarget`
- 可生产/创建 / Produced or created：风暴战舰 / `Tempest`，耗时 / Time 5s
- 已隐藏基础按钮 / Hidden basic buttons：3 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0 | `StargateWarpTrain` | `StargateWarpTrain,Train10` | 折跃/部署训练技能 / CAbilWarpTrain | 风暴战舰 / `Tempest`、单位 / Unit:风暴战舰 / `Tempest` | - | - |
| 1 | `BuildTempestLocked` | `-` | 未解析 / Unresolved | - | - | ArtanisLevel11 |
| 1 | `StargateWarpTrain` | `StargateWarpTrain,Train3` | 折跃/部署训练技能 / CAbilWarpTrain | - | - | - |
| 1 | `MorphBackToStargate` | `MorphBackToStargate,Execute` | 未解析 / Unresolved | - | - | - |
| 0,3 | `StargateWarpTrain` | `StargateWarpTrain,Train14` | 折跃/部署训练技能 / CAbilWarpTrain | 单位 / Unit:`SOAMothershipv4` | - | - |
| 2,2 | `SuperiorWarpStargates` | `-` | 未解析 / Unresolved | - | - | HaveSuperiorWarpGates |

### `WarpGate`

- 来源 / Source：名册 / Roster inferred production building，状态 / Status produces:Zealot/HighTemplar，模块 / Module XMArtanis.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMArtanis.SC2Mod/Base.SC2Data/GameData/UnitData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：无 / None
- 关联 Behavior / Linked behaviors：`ChronoBoostTarget`
- 可生产/创建 / Produced or created：高阶圣堂武士 / `HighTemplar`、哨兵 / `Zealot`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| - | `WarpGateTrain` | `WarpGateTrain,Train4` | 折跃/部署训练技能 / CAbilWarpTrain | - | - | - |
| 0,0 | `WarpGateTrain` | `WarpGateTrain,Train1` | 折跃/部署训练技能 / CAbilWarpTrain | 哨兵 / `Zealot`、单位 / Unit:哨兵 / `Zealot` | - | - |
| 1,0 | `WarpGateTrain` | `WarpGateTrain,Train8` | 折跃/部署训练技能 / CAbilWarpTrain | 高阶圣堂武士 / `HighTemplar`、单位 / Unit:高阶圣堂武士 / `HighTemplar` | - | - |

## 单位 / Units

### 执政官 / `Archon`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMArtanis.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`FeedbackArchon`、`move`(基础 / Basic)、`ProgressRally`(CAbilRally / CAbilRally)、`PsiStormArchon`(目标效果技能 / CAbilEffectTarget)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`ArtanisHighArchon`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | `HighTemplarEnergyUpgrade` | `-` | 未解析 / Unresolved | - | - | HaveHighTemplarEnergyUpgradeHighArchon |
| 1,1 | `HealingPsionicStorm` | `-` | 未解析 / Unresolved | - | - | HaveHealingPsionicStormHighArchon |
| 2,0 | `FeedbackArchon` | `FeedbackArchon,Execute` | 未解析 / Unresolved | - | - | - |
| 2,0 | `FeedbackLocked` | `-` | 未解析 / Unresolved | - | - | ArtanisLevel07 |
| 2,1 | `PsionicStormLocked` | `-` | 未解析 / Unresolved | - | - | ArtanisLevel07 |
| 2,1 | `PsiStormArchon` | `PsiStormArchon,Execute` | 目标效果技能 / CAbilEffectTarget | - | - | - |

### 不朽者 / `ImmortalAiur`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMArtanis.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit
- Catalog 技能链接 / Catalog ability links：`ImmortalBarrierBase`、`ImmortalShakurasShadowCannon`(目标效果技能 / CAbilEffectTarget)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| - | `ImmortalBarrierBase` | `ImmortalBarrierBase,Execute` | 未解析 / Unresolved | - | - | - |
| - | `ImmortalShakurasShadowCannon` | `ImmortalShakurasShadowCannon,Execute` | 目标效果技能 / CAbilEffectTarget | - | 施加行为效果 / CEffectApplyBehavior:`ImmortalShakurasShadowCannonInitialDisableAttackAB`、持续效果 / CEffectCreatePersistent:`ImmortalShakurasShadowCannonTargetingCP` | - |
| 1,0 | `HaveBarrier` | `-` | 未解析 / Unresolved | - | - | HaveBarrier |

### 侦测器 / `Observer`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMArtanis.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`move`(基础 / Basic)、`ObserverMorphtoObserverSiege`、`stop`(基础 / Basic)、`Warpable`
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `HaveGraviticBoosters` | `-` | 未解析 / Unresolved | - | - | HaveGraviticBoosters |
| 2,2 | `ObserverMorphtoObserverSiege` | `ObserverMorphtoObserverSiege,Execute` | 未解析 / Unresolved | - | - | - |
| 2,4 | `Detector` | `-` | 未解析 / Unresolved | - | - | - |

### 凤凰 / `PhoenixAiur`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMArtanis.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：无 / None
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`VorazunCommanderCloak`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| - | - | `-` | 未解析 / Unresolved | - | - | HaveResearchDoubleGravitonBeamPassive |
| 2,2 | `HaveAnionPulseCrystals` | `-` | 未解析 / Unresolved | - | - | HavePhoenixRangeUpgrade |

### 龙骑士 / `Dragoon`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMArtanis.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，生命 / Life 100
- Catalog 技能链接 / Catalog ability links：无 / None
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2 | - | `-` | 未解析 / Unresolved | - | - | HaveDragoonHealth |
| 2,1 | `VoidStalkerDragoonRange` | `-` | 未解析 / Unresolved | - | - | HaveSingularityCharge |

### 哨兵 / `Zealot`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMArtanis.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`Charge`(CAbilAugment / CAbilAugment)、`move`(基础 / Basic)、`ProgressRally`(CAbilRally / CAbilRally)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | `Charge` | `Charge,Execute` | CAbilAugment / CAbilAugment | - | - | - |
| 2,1 | `WhirlwindLocked` | `-` | 未解析 / Unresolved | - | - | ArtanisLevel04 |

### 高阶圣堂武士 / `HighTemplar`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMArtanis.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`ArchonWarp`(合并技能 / CAbilMerge)、`Feedback`、`move`(基础 / Basic)、`ProgressRally`(CAbilRally / CAbilRally)、`PsiStorm`(目标效果技能 / CAbilEffectTarget)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`DamageDisablesAttackHighTemplar`
- 可生产/创建 / Produced or created：执政官 / `Archon`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | `HighTemplarEnergyUpgrade` | `-` | 未解析 / Unresolved | - | - | HaveHighTemplarEnergyUpgrade |
| 1,1 | `HealingPsionicStorm` | `-` | 未解析 / Unresolved | - | - | HaveHealingPsionicStorm |
| 2,0 | `Feedback` | `Feedback,Execute` | 未解析 / Unresolved | - | - | - |
| 2,1 | `PsiStorm` | `PsiStorm,Execute` | 目标效果技能 / CAbilEffectTarget | - | - | - |
| 2,3 | `ArchonWarp` | `ArchonWarp,SelectedUnits` | 合并技能 / CAbilMerge | 单位 / Unit:执政官 / `Archon` | - | - |

### 风暴战舰 / `Tempest`

- 来源 / Source：名册 / Roster XMFinal CommanderRosters.galaxy，状态 / Status galaxy，模块 / Module XMArtanis.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146_CommanderRosters.galaxy`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`LightningBomb`(目标效果技能 / CAbilEffectTarget)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | `DisintegrationLocked` | `-` | 未解析 / Unresolved | - | - | ArtanisLevel12 |
| 2,0 | `LightningBomb` | `LightningBomb,Execute` | 目标效果技能 / CAbilEffectTarget | - | - | - |

### 掠夺者 / `Reaver`

- 来源 / Source：名册 / Roster XMFinal CommanderRosters.galaxy，状态 / Status galaxy，模块 / Module XMArtanis.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146_CommanderRosters.galaxy`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：无 / None
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,1 | `HaveReaverIncreasedScarabCount` | `-` | 未解析 / Unresolved | - | - | HaveReaverIncreasedScarabCount |
| 2,2 | `PassiveReaverIncreasedScarabSplashRadius` | `-` | 未解析 / Unresolved | - | - | HaveReaverIncreasedScarabSplashRadius |

## 英雄 / Heroes

- 无 / None
