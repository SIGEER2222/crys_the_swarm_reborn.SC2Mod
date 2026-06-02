# 沃拉尊 / `Vorazun` 科技链路排查 / Tech Tree Diagnostics

- 描述 / Description：无 / None
- 数据来源 / Data source：当前 Mod / Current Mod，目录 / Directory：`合作指挥官版起义狂潮/Mods/XM/XMVorazun.SC2Mod`
- 当前 Mod 运行名册 / Current Mod roster：module=`XMVorazun.SC2Mod`，instance=`Vorazun`
- 统计 / Stats：建筑 4、生产链补充建筑 2、单位 8、英雄 1、建筑按钮 17、单位按钮 21、效果引用 1
- 名称显示 / Name display：能从当前 Mod zhCN 解析时显示“中文名 / `英文ID`”；仅显示 `ID` 表示当前 Mod 未找到可用中文名。

## 指挥官默认/顶部技能 / Commander Default / Top-panel Skills

| 技能名 / Skill Name | Ability/Cmd | 类型 / Type | 效果引用 / Effect References | Catalog 来源 / Catalog Sources |
| --- | --- | --- | --- | --- |
| 部署黑暗水晶塔 / `SOADarkPylon` | `SOADarkPylon,Build1` | 建造技能 / CAbilBuild | - | xmvorazun:1 |
| 黑洞 / `VoidSentryBlackHole` | `VoidSentryBlackHole,Execute` | 目标效果技能 / CAbilEffectTarget | - | xmvorazun:1 |
| 部署暗影卫队 / `SOAShadowGuardCalldown` | `SOAShadowGuardCalldown,Execute` | 未解析 / Unresolved | - | - |
| `SOATimeFreeze` | `SOATimeFreeze,Execute` | 未解析 / Unresolved | - | - |
| `CommanderPrestigeVorazunTimeStop` | `CommanderPrestigeVorazunTimeStop,Execute` | 目标效果技能 / CAbilEffectTarget | - | xmvorazun:1 |
| 时间停止 / `SOATimeStopLocked` | `-` | 未解析 / Unresolved | - | - |
| `RecallOnDeathPassive` | `-` | 未解析 / Unresolved | - | - |
| `RecallonDeathPassiveLocked` | `-` | 未解析 / Unresolved | - | - |
| 阴影黯灭 / `SOAStrikefromtheShadows` | `-` | 未解析 / Unresolved | - | - |
| 阴影黯灭 / `StrikefromtheShadowsLocked` | `-` | 未解析 / Unresolved | - | - |
| `BuildInProgress` | `BuildInProgress,Cancel` | 未解析 / Unresolved | - | - |

## 建筑 / Buildings

### `Gateway`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMVorazun.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`GatewayTrain`(训练技能 / CAbilTrain)、`que5notPassive`(队列技能 / CAbilQueue)、`Rally`(CAbilRally / CAbilRally)、`UpgradeToWarpGate`(变形技能 / CAbilMorph)
- 关联 Behavior / Linked behaviors：`ChronoBoostTarget`
- 可生产/创建 / Produced or created：`DarkArchon`、虚空圣堂武士 / `DarkTemplarShakuras`、`Stalker`、哨兵 / `Zealot`、`ZealotShakuras`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| - | `que5notPassive` | `que5notPassive,CancelLast` | 队列技能 / CAbilQueue | - | - | - |
| 0,0 | `GatewayTrain` | `GatewayTrain,Train1` | 训练技能 / CAbilTrain | 哨兵 / `Zealot`、`ZealotShakuras`、单位 / Unit:哨兵 / `Zealot` | - | - |
| 0,2 | `GatewayTrain` | `GatewayTrain,Train2` | 训练技能 / CAbilTrain | `Stalker`、`StalkerShakuras`、龙骑士 / `Dragoon`、单位 / Unit:`Stalker` | - | - |
| 1,0 | `GatewayTrain` | `GatewayTrain,Train5` | 训练技能 / CAbilTrain | 虚空圣堂武士 / `DarkTemplarShakuras`、`DarkTemplarAiur`、`DarkTemplarTaldarim`、单位 / Unit:虚空圣堂武士 / `DarkTemplarShakuras` | - | - |
| 1,2 | `GatewayTrain` | `GatewayTrain,Train9` | 训练技能 / CAbilTrain | `DarkArchon`、单位 / Unit:`DarkArchon` | - | - |

### 光子炮台 / `PhotonCannon`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMVorazun.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`PhaseCannonProjection`、`stop`(基础 / Basic)
- 已隐藏基础按钮 / Hidden basic buttons：1 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

- 面板技能 / Panel skills：无 / None

### `TwilightCouncil`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMVorazun.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`BuildInProgress`(基础 / Basic)、`TwilightCouncilResearch`(研究技能 / CAbilResearch)
- 关联 Behavior / Linked behaviors：`ChronoBoostTarget`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | `TwilightCouncilResearch` | `TwilightCouncilResearch,Research1` | 研究技能 / CAbilResearch | - | - | - |
| 0,0 | `TwilightCouncilResearch` | `TwilightCouncilResearch,Research5` | 研究技能 / CAbilResearch | 升级 / Upgrade:`ZealotResearchShadowCharge` | - | - |
| 0,1 | `TwilightCouncilResearch` | `TwilightCouncilResearch,Research2` | 研究技能 / CAbilResearch | - | - | - |
| 0,2 | `TwilightCouncilResearch` | `TwilightCouncilResearch,Research9` | 研究技能 / CAbilResearch | 升级 / Upgrade:`ZealotResearchShadowStun` | - | - |
| 0,2 | `ResearchShadowStunLocked` | `-` | 未解析 / Unresolved | - | - | VorazunLevel04 |
| 0,3 | `ResearchBlinkShieldRestoreLocked` | `-` | 未解析 / Unresolved | - | - | VorazunLevel04 |
| 0,3 | `TwilightCouncilResearch` | `TwilightCouncilResearch,Research8` | 研究技能 / CAbilResearch | 升级 / Upgrade:`StalkerResearchBlinkShieldRestore` | - | - |

### `DarkPylon`

- 来源 / Source：名册 / Roster XMFinal CommanderBuildings.galaxy，状态 / Status galaxy，模块 / Module XMVorazun.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146_CommanderBuildings.galaxy`
- 数值 / Stats：类型 / Type Structure，种族 / Race Prot，生命 / Life 200，护盾 / Shields 200，提供补给 / Supply provided 8
- Catalog 技能链接 / Catalog ability links：`BuildInProgress`(基础 / Basic)、黑暗水晶塔召回 / `DarkPylonRecall`(目标效果技能 / CAbilEffectTarget)、Photon Overcharge Morph Dark Pylon / `PhotonOverchargeMorphDarkPylon`
- 关联 Behavior / Linked behaviors：`DarkPylonCloakAura`、`DarkPylonCloakAuraInitial`、`DarkPylonPowerSource`、`MatrixOverload`
- 已隐藏基础按钮 / Hidden basic buttons：1 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | `CloakingField` | `-` | 未解析 / Unresolved | - | - | - |
| 1,1 | `MatrixOverload` | `-` | 未解析 / Unresolved | - | - | HaveSOAMatrixOverload |
| 2,0 | 召回 / `CommanderPrestigeVorazunRecallLocked` | `-` | 未解析 / Unresolved | - | - | CommanderPrestigeVorazunEmergencyRecall |
| 2,0 | 召回 / `DarkPylonRecall` | `DarkPylonRecall,Execute` | 目标效果技能 / CAbilEffectTarget | - | 区域枚举效果 / CEffectEnumArea:`DarkPylonRecallSearch` | - |
| 2,0 | 召回 / `DarkPylonRecallLocked` | `-` | 未解析 / Unresolved | - | - | VorazunLevel11 |

## 生产链补充建筑 / Production-support Buildings

### `Stargate`

- 来源 / Source：名册 / Roster inferred production building，状态 / Status produces:Oracle/VoidRay/CorsairMP，模块 / Module XMVorazun.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMVorazun.SC2Mod/Base.SC2Data/GameData/UnitData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：无 / None
- 关联 Behavior / Linked behaviors：`ChronoBoostTarget`
- 可生产/创建 / Produced or created：`CorsairMP`、`Oracle`、`VoidRay`
- 已隐藏基础按钮 / Hidden basic buttons：1 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | `StargateTrain` | `StargateTrain,Train9` | 训练技能 / CAbilTrain | `Oracle`、单位 / Unit:`Oracle` | - | - |
| 1 | `StargateTrain` | `StargateTrain,Train5` | 训练技能 / CAbilTrain | `VoidRay`、单位 / Unit:`VoidRay` | - | - |
| 0,2 | `StargateTrain` | `StargateTrain,Train11` | 训练技能 / CAbilTrain | `CorsairMP`、单位 / Unit:`CorsairMP` | - | - |

### `WarpGate`

- 来源 / Source：名册 / Roster inferred production building，状态 / Status produces:DarkArchon/Zealot/ZealotShakuras/DarkTemplarShakuras，模块 / Module XMVorazun.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMVorazun.SC2Mod/Base.SC2Data/GameData/UnitData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：无 / None
- 关联 Behavior / Linked behaviors：`ChronoBoostTarget`
- 可生产/创建 / Produced or created：`DarkArchon`，耗时 / Time 5s、虚空圣堂武士 / `DarkTemplarShakuras`、哨兵 / `Zealot`、`ZealotShakuras`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| - | `WarpGateTrain` | `WarpGateTrain,Train4` | 折跃/部署训练技能 / CAbilWarpTrain | `DarkArchon` | - | - |
| 0,0 | `WarpGateTrain` | `WarpGateTrain,Train1` | 折跃/部署训练技能 / CAbilWarpTrain | 哨兵 / `Zealot`、`ZealotShakuras`、单位 / Unit:哨兵 / `Zealot` | - | - |
| 1,0 | `WarpGateTrain` | `WarpGateTrain,Train5` | 折跃/部署训练技能 / CAbilWarpTrain | 虚空圣堂武士 / `DarkTemplarShakuras`、单位 / Unit:虚空圣堂武士 / `DarkTemplarShakuras` | - | - |
| 1,2 | `WarpGateTrain` | `WarpGateTrain,Train9` | 折跃/部署训练技能 / CAbilWarpTrain | `DarkArchon`、单位 / Unit:`DarkArchon` | - | - |

## 单位 / Units

### 虚空圣堂武士 / `DarkTemplarShakuras`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMVorazun.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，费用 / Cost 0/75
- Catalog 技能链接 / Catalog ability links：`DarkArchonMerge`(合并技能 / CAbilMerge)、`DarkTemplarShadowDash`、`DarkTemplarShadowFury`、`DarkTemplarVoidStasis`
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`DarkTemplarRecallToDarkShrine`、`VorazunCloakedShieldRegenPermanent`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `DarkTemplarShadowDash` | `DarkTemplarShadowDash,Execute` | 未解析 / Unresolved | - | - | - |
| 1,0 | `DarkTemplarShadowFury` | `DarkTemplarShadowFury,Execute` | 未解析 / Unresolved | - | - | - |
| 2,0 | `DarkTemplarShadowFury` | `DarkTemplarShadowFury,Execute` | 未解析 / Unresolved | - | - | HaveResearchShadowFury |
| 2,1 | `ShadowDashLocked` | `-` | 未解析 / Unresolved | - | - | VorazunLevel06 |
| 2,2 | `DarkTemplarVoidStasis` | `DarkTemplarVoidStasis,Execute` | 未解析 / Unresolved | - | - | - |
| 2,2 | `VoidStasisLocked` | `-` | 未解析 / Unresolved | - | - | VorazunLevel06 |

### `Oracle`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMVorazun.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，费用 / Cost 100/75
- Catalog 技能链接 / Catalog ability links：无 / None
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`CorsairPermanentCloak`、`VorazunCloakedShieldRegenPermanent`
- 已隐藏基础按钮 / Hidden basic buttons：2 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0 | `OracleRevelation` | `OracleRevelation,Execute` | 未解析 / Unresolved | - | - | - |
| - | `OracleWeapon` | `OracleWeapon,On` | 未解析 / Unresolved | - | - | - |
| 2,3 | `HaveOracleStasisWardUpgrade` | `-` | 未解析 / Unresolved | - | - | HaveOracleStasisWardUpgrade |
| 2,4 | `PermanentlyCloakedOracle` | `-` | 未解析 / Unresolved | - | - | HaveCorsairPermanentCloak |

### `CorsairMP`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMVorazun.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`CorsairMPDisruptionWeb`、`move`(基础 / Basic)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`CorsairPermanentCloak`、`VorazunCloakedShieldRegenPermanent`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | `CorsairMPDisruptionWeb` | `CorsairMPDisruptionWeb,Execute` | 未解析 / Unresolved | - | - | HaveCorsairDisruptionWeb |
| 2,1 | `PermanentlyCloakedCorsair` | `-` | 未解析 / Unresolved | - | - | HaveCorsairPermanentCloak |

### 哨兵 / `Zealot`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMVorazun.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`Charge`(CAbilAugment / CAbilAugment)、`move`(基础 / Basic)、`ProgressRally`(CAbilRally / CAbilRally)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | `Charge` | `Charge,Execute` | CAbilAugment / CAbilAugment | - | - | - |

### `ZealotShakuras`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMVorazun.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit
- Catalog 技能链接 / Catalog ability links：无 / None
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`

- 面板技能 / Panel skills：无 / None

### `Stalker`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMVorazun.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`BlinkShieldRestore`(目标效果技能 / CAbilEffectTarget)、`BlinkSlayer`(目标效果技能 / CAbilEffectTarget)
- 关联 Behavior / Linked behaviors：`AlarakStalkerPhasingArmor`、`AllUnitBehaviorController`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| - | `BlinkShieldRestore` | `BlinkShieldRestore,Execute` | 目标效果技能 / CAbilEffectTarget | - | - | - |
| 1,0 | `StalkerPassive` | `-` | 未解析 / Unresolved | - | - | HaveVoidStalkerBlinkShieldRestore |
| 2,0 | `Blink` | `Blink,Execute` | 目标效果技能 / CAbilEffectTarget | - | - | - |
| 2,1 | `BlinkShieldRestoreUpgrade` | `-` | 未解析 / Unresolved | - | - | HaveBlinkShieldRestore |

### `VoidRay`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMVorazun.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：无 / None
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`

- 面板技能 / Panel skills：无 / None

### `DarkArchon`

- 来源 / Source：名册 / Roster XMFinal CommanderRosters.galaxy，状态 / Status galaxy，模块 / Module XMVorazun.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146_CommanderRosters.galaxy`
- 数值 / Stats：类型 / Type Unit
- Catalog 技能链接 / Catalog ability links：`DarkArchonMindControl`(目标效果技能 / CAbilEffectTarget)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `MindControlLocked` | `-` | 未解析 / Unresolved | - | - | VorazunLevel09 |
| 2,0 | `DarkArchonConfusion` | `DarkArchonConfusion,Execute` | 未解析 / Unresolved | - | - | - |
| 2,1 | `DarkArchonMindControl` | `DarkArchonMindControl,Execute` | 目标效果技能 / CAbilEffectTarget | - | - | HaveDarkArchonMindControl |
| 2,2 | `HaveDarkArchonFullStartingEnergy` | `-` | 未解析 / Unresolved | - | - | HaveDarkArchonFullStartingEnergy |

## 英雄 / Heroes

### `VorazunShadowGuard`

- 来源 / Source：名册 / Roster inferred current Mod hero catalog unit，状态 / Status catalog ObjectType:Hero，模块 / Module XMVorazun.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMVorazun.SC2Mod/Base.SC2Data/GameData/UnitData.xml`
- 数值 / Stats：类型 / Type Hero，种族 / Race Prot，生命 / Life 150，护盾 / Shields 150
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`move`(基础 / Basic)、`ProgressRally`(CAbilRally / CAbilRally)、闪现 / `ShadowGuardShadowDash`、暗影之怒 / `ShadowGuardShadowFury`、虚空静滞 / `ShadowGuardVoidStasis`、`stop`(基础 / Basic)、`Warpable`
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`ShadowGuardDetectionDisableAura`、`VoidDetectorRadar`、`VorazunCloakedShieldRegenPermanent`
- 已隐藏基础按钮 / Hidden basic buttons：5 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | 暗影之怒 / `ShadowGuardShadowFury` | `ShadowGuardShadowFury,Execute` | 未解析 / Unresolved | - | - | - |
| 2,1 | 闪现 / `ShadowGuardShadowDash` | `ShadowGuardShadowDash,Execute` | 未解析 / Unresolved | - | - | - |
| 2,2 | 虚空静滞 / `ShadowGuardVoidStasis` | `ShadowGuardVoidStasis,Execute` | 未解析 / Unresolved | - | - | - |
| 2,3 | 永久隐形 / `ShadowGuardPermanentlyCloaked` | `-` | 未解析 / Unresolved | - | - | - |
