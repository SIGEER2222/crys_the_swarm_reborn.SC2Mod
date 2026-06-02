# 沃拉尊 / `Vorazun` 科技链路排查 / Tech Tree Diagnostics

- 描述 / Description：无 / None
- 数据来源 / Data source：当前 Mod / Current Mod，目录 / Directory：`合作指挥官版起义狂潮/Mods/XM/XMVorazun.SC2Mod`
- 当前 Mod 运行名册 / Current Mod roster：module=`XMVorazun.SC2Mod`，instance=`Vorazun`
- 统计 / Stats：建筑 4、生产链补充建筑 2、单位 8、英雄 0、建筑按钮 38、单位按钮 22、效果引用 11

## 指挥官默认/顶部技能 / Commander Default / Top-panel Skills

| 技能 / Ability | 类型 / Type | 效果引用 / Effect References | Catalog 来源 / Catalog Sources |
| --- | --- | --- | --- |
| `SOADarkPylon,Build1` | 建造技能 / CAbilBuild | - | xmvorazun:1 |
| `VoidSentryBlackHole,Execute` | 目标效果技能 / CAbilEffectTarget | - | xmvorazun:1 |
| `SOAShadowGuardCalldown,Execute` | 目标效果技能 / CAbilEffectTarget | 创建单位效果 / CEffectCreateUnit:`ShadowGuardCU` | xmfinal:1 |
| `SOATimeFreeze,Execute` | 未解析 / Unresolved | - | - |
| `CommanderPrestigeVorazunTimeStop,Execute` | 目标效果技能 / CAbilEffectTarget | - | xmvorazun:1 |
| `` | 未解析 / Unresolved | - | - |
| `` | 未解析 / Unresolved | - | - |
| `` | 未解析 / Unresolved | - | - |
| `` | 未解析 / Unresolved | - | - |
| `` | 未解析 / Unresolved | - | - |
| `BuildInProgress,Cancel` | 未解析 / Unresolved | - | - |

## 建筑 / Buildings

### Gateway / `Gateway`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMVorazun.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`GatewayTrain`(训练技能 / CAbilTrain)、`que5notPassive`(队列技能 / CAbilQueue)、`Rally`(CAbilRally / CAbilRally)、`UpgradeToWarpGate`(变形技能 / CAbilMorph)
- 关联 Behavior / Linked behaviors：`ChronoBoostTarget`
- 可生产/创建 / Produced or created：DarkArchon `DarkArchon`、虚空圣堂武士 `DarkTemplarShakuras`、Stalker `Stalker`、哨兵 `Zealot`、ZealotShakuras `ZealotShakuras`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| - | que5notPassive / `-` | `que5notPassive,CancelLast` | 队列技能 / CAbilQueue | - | - | - |
| 0,0 | Zealot / `Zealot` | `GatewayTrain,Train1` | 训练技能 / CAbilTrain | 哨兵 `Zealot`、ZealotShakuras `ZealotShakuras`、单位 / Unit:哨兵 `Zealot` | - | - |
| 0,2 | Stalker / `Stalker` | `GatewayTrain,Train2` | 训练技能 / CAbilTrain | Stalker `Stalker`、StalkerShakuras `StalkerShakuras`、龙骑士 `Dragoon`、单位 / Unit:Stalker `Stalker` | - | - |
| 1,0 | DarkTemplar / `DarkTemplar` | `GatewayTrain,Train5` | 训练技能 / CAbilTrain | 虚空圣堂武士 `DarkTemplarShakuras`、DarkTemplarAiur `DarkTemplarAiur`、DarkTemplarTaldarim `DarkTemplarTaldarim`、单位 / Unit:虚空圣堂武士 `DarkTemplarShakuras` | - | - |
| 1,2 | DarkArchon / `DarkArchon` | `GatewayTrain,Train9` | 训练技能 / CAbilTrain | DarkArchon `DarkArchon`、单位 / Unit:DarkArchon `DarkArchon` | - | - |

### 光子炮台 / `PhotonCannon`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMVorazun.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`PhaseCannonProjection`(目标效果技能 / CAbilEffectTarget)、`stop`(基础 / Basic)
- 已隐藏基础按钮 / Hidden basic buttons：1 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

- 面板技能 / Panel skills：无 / None

### TwilightCouncil / `TwilightCouncil`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 / Status exact，模块 / Module XMVorazun.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
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

### DarkPylon / `DarkPylon`

- 来源 / Source：名册 / Roster XMFinal CommanderBuildings.galaxy，状态 / Status galaxy，模块 / Module XMVorazun.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146_CommanderBuildings.galaxy`
- 数值 / Stats：类型 / Type Structure，种族 / Race Prot，生命 / Life 200，护盾 / Shields 200，提供补给 / Supply provided 8
- Catalog 技能链接 / Catalog ability links：`BuildInProgress`(基础 / Basic)、`DarkPylonRecall`(目标效果技能 / CAbilEffectTarget)、`PhotonOverchargeMorphDarkPylon`(变形技能 / CAbilMorph)
- 关联 Behavior / Linked behaviors：`DarkPylonCloakAura`、`DarkPylonCloakAuraInitial`、`DarkPylonPowerSource`、`MatrixOverload`
- 已隐藏基础按钮 / Hidden basic buttons：1 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | CloakingField / `CloakingField` | `-` | 未解析 / Unresolved | - | - | - |
| 1,1 | MatrixOverload / `MatrixOverload` | `-` | 未解析 / Unresolved | - | - | HaveSOAMatrixOverload |
| 2,0 | 召回 / `CommanderPrestigeVorazunRecallLocked` | `-` | 未解析 / Unresolved | - | - | CommanderPrestigeVorazunEmergencyRecall |
| 2,0 | 召回 / `DarkPylonRecall` | `DarkPylonRecall,Execute` | 目标效果技能 / CAbilEffectTarget | - | 区域枚举效果 / CEffectEnumArea:`DarkPylonRecallSearch` | - |
| 2,0 | 召回 / `DarkPylonRecallLocked` | `-` | 未解析 / Unresolved | - | - | VorazunLevel11 |

## 生产链补充建筑 / Production-support Buildings

### Stargate / `Stargate`

- 来源 / Source：名册 / Roster inferred production building，状态 / Status produces:Oracle/VoidRay/CorsairMP，模块 / Module XMVorazun.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMVorazun.SC2Mod/Base.SC2Data/GameData/UnitData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：无 / None
- 关联 Behavior / Linked behaviors：`ChronoBoostTarget`
- 可生产/创建 / Produced or created：CorsairMP `CorsairMP`、Oracle `Oracle`、VoidRay `VoidRay`
- 已隐藏基础按钮 / Hidden basic buttons：1 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | Oracle / `Oracle` | `StargateTrain,Train9` | 训练技能 / CAbilTrain | Oracle `Oracle`、单位 / Unit:Oracle `Oracle` | - | - |
| 1 | VoidRay / `VoidRay` | `StargateTrain,Train5` | 训练技能 / CAbilTrain | VoidRay `VoidRay`、单位 / Unit:VoidRay `VoidRay` | - | - |
| 0,2 | CorsairMP / `CorsairMP` | `StargateTrain,Train11` | 训练技能 / CAbilTrain | CorsairMP `CorsairMP`、单位 / Unit:CorsairMP `CorsairMP` | - | - |

### WarpGate / `WarpGate`

- 来源 / Source：名册 / Roster inferred production building，状态 / Status produces:DarkArchon/Zealot/ZealotShakuras/DarkTemplarShakuras，模块 / Module XMVorazun.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMVorazun.SC2Mod/Base.SC2Data/GameData/UnitData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：无 / None
- 关联 Behavior / Linked behaviors：`ChronoBoostTarget`
- 可生产/创建 / Produced or created：DarkArchon `DarkArchon`，耗时 / Time 5s、虚空圣堂武士 `DarkTemplarShakuras`、哨兵 `Zealot`、ZealotShakuras `ZealotShakuras`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| - | WarpGateTrain / `-` | `WarpGateTrain,Train4` | 折跃/部署训练技能 / CAbilWarpTrain | DarkArchon `DarkArchon` | - | - |
| 0,0 | Zealot / `Zealot` | `WarpGateTrain,Train1` | 折跃/部署训练技能 / CAbilWarpTrain | 哨兵 `Zealot`、ZealotShakuras `ZealotShakuras`、单位 / Unit:哨兵 `Zealot` | - | - |
| 1,0 | DarkTemplar / `DarkTemplar` | `WarpGateTrain,Train5` | 折跃/部署训练技能 / CAbilWarpTrain | 虚空圣堂武士 `DarkTemplarShakuras`、单位 / Unit:虚空圣堂武士 `DarkTemplarShakuras` | - | - |
| 1,2 | DarkArchon / `DarkArchon` | `WarpGateTrain,Train9` | 折跃/部署训练技能 / CAbilWarpTrain | DarkArchon `DarkArchon`、单位 / Unit:DarkArchon `DarkArchon` | - | - |
| 0,0 | WarpInSupplicant / `WarpInSupplicant` | `WarpGateTrain,Train12` | 折跃/部署训练技能 / CAbilWarpTrain | - | - | - |

## 单位 / Units

### 虚空圣堂武士 / `DarkTemplarShakuras`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMVorazun.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，费用 / Cost 0/75
- Catalog 技能链接 / Catalog ability links：`DarkArchonMerge`(合并技能 / CAbilMerge)、`DarkTemplarShadowDash`(目标效果技能 / CAbilEffectTarget)、`DarkTemplarShadowFury`(目标效果技能 / CAbilEffectTarget)、`DarkTemplarVoidStasis`(目标效果技能 / CAbilEffectTarget)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`DarkTemplarRecallToDarkShrine`、`VorazunCloakedShieldRegenPermanent`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | DarkTemplarShadowDash / `DarkTemplarShadowDash` | `DarkTemplarShadowDash,Execute` | 目标效果技能 / CAbilEffectTarget | - | - | - |
| 1,0 | DarkTemplarShadowFury / `-` | `DarkTemplarShadowFury,Execute` | 目标效果技能 / CAbilEffectTarget | - | - | - |
| 2,0 | VoidDarkTemplarShadowFury / `VoidDarkTemplarShadowFury` | `DarkTemplarShadowFury,Execute` | 目标效果技能 / CAbilEffectTarget | - | - | - |
| 2,1 | ShadowDashLocked / `ShadowDashLocked` | `-` | 未解析 / Unresolved | - | - | VorazunLevel06 |
| 2,2 | VoidStasis / `VoidStasis` | `DarkTemplarVoidStasis,Execute` | 目标效果技能 / CAbilEffectTarget | - | - | - |
| 2,2 | VoidStasisLocked / `VoidStasisLocked` | `-` | 未解析 / Unresolved | - | - | VorazunLevel06 |

### Oracle / `Oracle`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMVorazun.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit，费用 / Cost 100/75
- Catalog 技能链接 / Catalog ability links：无 / None
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`CorsairPermanentCloak`、`VorazunCloakedShieldRegenPermanent`
- 已隐藏基础按钮 / Hidden basic buttons：1 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | OracleRevelation / `OracleRevelation` | `OracleRevelation,Execute` | 目标效果技能 / CAbilEffectTarget | - | - | - |
| 2,1 | OracleBuildStasisTrap / `OracleBuildStasisTrap` | `OracleStasisTrapBuild,Build1` | 建造技能 / CAbilBuild | - | - | - |
| 2,2 | OracleWeaponOn / `OracleWeaponOn` | `OracleWeapon,On` | 行为/被动技能 / CAbilBehavior | - | - | - |
| 2,3 | HaveOracleStasisWardUpgrade / `HaveOracleStasisWardUpgrade` | `-` | 未解析 / Unresolved | - | - | HaveOracleStasisWardUpgrade |
| 2,4 | PermanentlyCloakedOracle / `PermanentlyCloakedOracle` | `-` | 未解析 / Unresolved | - | - | HaveCorsairPermanentCloak |

### CorsairMP / `CorsairMP`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMVorazun.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`CorsairMPDisruptionWeb`(目标效果技能 / CAbilEffectTarget)、`move`(基础 / Basic)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`、`CorsairPermanentCloak`、`VorazunCloakedShieldRegenPermanent`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | CorsairMPDisruptionWeb / `CorsairMPDisruptionWeb` | `CorsairMPDisruptionWeb,Execute` | 目标效果技能 / CAbilEffectTarget | - | - | - |
| 2,1 | PermanentlyCloakedCorsair / `PermanentlyCloakedCorsair` | `-` | 未解析 / Unresolved | - | - | HaveCorsairPermanentCloak |

### 哨兵 / `Zealot`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMVorazun.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`attack`(基础 / Basic)、`Charge`(CAbilAugment / CAbilAugment)、`move`(基础 / Basic)、`ProgressRally`(CAbilRally / CAbilRally)、`stop`(基础 / Basic)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | Charge / `Charge` | `Charge,Execute` | CAbilAugment / CAbilAugment | - | - | - |

### ZealotShakuras / `ZealotShakuras`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMVorazun.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：类型 / Type Unit
- Catalog 技能链接 / Catalog ability links：无 / None
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`

- 面板技能 / Panel skills：无 / None

### Stalker / `Stalker`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMVorazun.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`BlinkSlayer`(目标效果技能 / CAbilEffectTarget)
- 关联 Behavior / Linked behaviors：`AlarakStalkerPhasingArmor`、`AllUnitBehaviorController`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| - | BlinkSlayer / `-` | `BlinkSlayer,Execute` | 目标效果技能 / CAbilEffectTarget | - | 效果集合 / CEffectSet:`PhaseBlinkSet` | - |
| 1,4 | CommanderPrestigeAlarakMechBuff / `CommanderPrestigeAlarakMechBuff` | `-` | 未解析 / Unresolved | - | - | CommanderPrestigeAlarakMech |
| 2,0 | Blink / `Blink` | `Blink,Execute` | 目标效果技能 / CAbilEffectTarget | - | - | - |
| 2,1 | AlarakStalkerPhasingArmor / `AlarakStalkerPhasingArmor` | `-` | 未解析 / Unresolved | - | - | HaveAlarakStalkerPhasingArmor |

### VoidRay / `VoidRay`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 / Status exact，模块 / Module XMVorazun.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：无 / None
- Catalog 技能链接 / Catalog ability links：`ProgressRally`(CAbilRally / CAbilRally)、`VoidRaySwarmDamageBoost`(瞬发效果技能 / CAbilEffectInstant)、`Warpable`
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | VoidRaySwarmDamageBoost / `VoidRaySwarmDamageBoost` | `VoidRaySwarmDamageBoost,Execute` | 瞬发效果技能 / CAbilEffectInstant | - | - | - |

### DarkArchon / `DarkArchon`

- 来源 / Source：名册 / Roster XMFinal CommanderRosters.galaxy，状态 / Status galaxy，模块 / Module XMVorazun.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146_CommanderRosters.galaxy`
- 数值 / Stats：类型 / Type Unit
- Catalog 技能链接 / Catalog ability links：`DarkArchonConfusion`(目标效果技能 / CAbilEffectTarget)、`DarkArchonMindControl`(目标效果技能 / CAbilEffectTarget)
- 关联 Behavior / Linked behaviors：`AllUnitBehaviorController`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | MindControlLocked / `MindControlLocked` | `-` | 未解析 / Unresolved | - | - | VorazunLevel09 |
| 2,0 | DarkArchonConfusion / `DarkArchonConfusion` | `DarkArchonConfusion,Execute` | 目标效果技能 / CAbilEffectTarget | - | 区域枚举效果 / CEffectEnumArea:`DarkArchonConfusionSearch` | - |
| 2,2 | HaveDarkArchonFullStartingEnergy / `HaveDarkArchonFullStartingEnergy` | `-` | 未解析 / Unresolved | - | - | HaveDarkArchonFullStartingEnergy |

## 英雄 / Heroes

- 无 / None
