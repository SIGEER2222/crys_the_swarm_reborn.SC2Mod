# 沃拉尊 / `Vorazun` 科技链路排查

- 描述：无
- 数据来源：当前 Mod，目录：`合作指挥官版起义狂潮/Mods/XM/XMVorazun.SC2Mod`
- 当前 Mod 运行名册：module=`XMVorazun.SC2Mod`，instance=`Vorazun`
- 统计：建筑 4、单位 8、英雄 0、建筑按钮 46、单位按钮 25、效果引用 14

## 指挥官默认/顶部技能

| 技能 | 类型 | 效果引用 | Catalog 来源 |
| --- | --- | --- | --- |
| `SOADarkPylon,Build1` | 建造技能 | - | xmalarak:1、xmartanis:1、xmfenix:1、xmfinal:1、另 3 个 |
| `VoidSentryBlackHole,Execute` | 目标效果技能 | - | xmalarak:1、xmartanis:1、xmfenix:1、xmfinal:1、另 6 个 |
| `SOAShadowGuardCalldown,Execute` | 目标效果技能 | 创建单位效果:`ShadowGuardCU` | xmfinal:1 |
| `SOATimeFreeze,Execute` | 未解析 | - | - |
| `CommanderPrestigeVorazunTimeStop,Execute` | 目标效果技能 | - | xmabathur:1、xmabathurreborn:1、xmalarak:1、xmartanis:1、另 8 个 |
| `` | 未解析 | - | - |
| `` | 未解析 | - | - |
| `` | 未解析 | - | - |
| `` | 未解析 | - | - |
| `` | 未解析 | - | - |
| `BuildInProgress,Cancel` | 未解析 | - | - |

## 建筑

### Gateway / `Gateway`

- 来源：名册 XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 exact，模块 XMVorazun.SC2Mod，文件 `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值：无
- Catalog 技能链接：`GatewayTrain`(训练技能)、`que5notPassive`(队列技能)、`Rally`(CAbilRally)、`UpgradeToWarpGate`(变形技能)
- 关联 Behavior：`ChronoBoostTarget`
- 可生产/创建：DarkArchon `DarkArchon`、Monitor `Monitor`（非本指挥官名册）、保护者 `SentryFenix`（非本指挥官名册）、Supplicant `Supplicant`（非本指挥官名册）

| 位置 | 面板按钮 | Ability/Cmd | 类型 | 生产/研究目标 | 效果引用 | 需求 |
| --- | --- | --- | --- | --- | --- | --- |
| - | que5notPassive / `-` | `que5notPassive,CancelLast` | 队列技能 | - | - | - |
| 0,0 | WarpInSupplicant / `WarpInSupplicant` | `GatewayTrain,Train11` | 训练技能 | Supplicant `Supplicant`、单位:Supplicant `Supplicant` | - | - |
| 0,0 | Zealot / `Zealot` | `GatewayTrain,Train1` | 训练技能 | - | - | - |
| 0,1 | Monitor / `Monitor` | `GatewayTrain,Train10` | 训练技能 | Monitor `Monitor`、单位:Monitor `Monitor` | - | - |
| 0,1 | Sentry / `Sentry` | `GatewayTrain,Train6` | 训练技能 | - | - | - |
| 0,1 | SentryFenix / `SentryFenix` | `GatewayTrain,Train15` | 训练技能 | 保护者 `SentryFenix`、单位:保护者 `SentryFenix` | - | - |
| 0,2 | Stalker / `Stalker` | `GatewayTrain,Train2` | 训练技能 | - | - | - |
| 1,0 | WarpinAscendentLocked / `WarpinAscendentLocked` | `-` | 未解析 | - | - | AlarakLevel08 |
| 1,2 | DarkArchon / `DarkArchon` | `GatewayTrain,Train9` | 训练技能 | DarkArchon `DarkArchon`、单位:DarkArchon `DarkArchon` | - | - |
| 1,2 | WarpInDarkArchonLocked / `WarpInDarkArchonLocked` | `-` | 未解析 | - | - | VorazunLevel05 |
| 2,2 | AlarakMasteryUnitAttackSpeed / `AlarakMasteryUnitAttackSpeed` | `-` | 未解析 | - | - | HaveMasteryAlarakUnitAttackSpeed |

### 光子炮台 / `PhotonCannon`

- 来源：名册 XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 exact，模块 XMVorazun.SC2Mod，文件 `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值：无
- Catalog 技能链接：`attack`(基础)、`PhaseCannonProjection`(目标效果技能)、`stop`(基础)
- 已隐藏基础按钮：1 个（用 `--include-basic` 可展开）

| 位置 | 面板按钮 | Ability/Cmd | 类型 | 生产/研究目标 | 效果引用 | 需求 |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | 强化瞄准 / `KaraxTurretRange` | `-` | 未解析 | - | - | HaveKaraxTurretRange |
| 2,1 | 军械优化 / `KaraxTurretAttackSpeed` | `-` | 未解析 | - | - | HaveKaraxTurretAttackSpeed |

### TwilightCouncil / `TwilightCouncil`

- 来源：名册 XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 exact，模块 XMVorazun.SC2Mod，文件 `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值：无
- Catalog 技能链接：`BuildInProgress`(基础)、`TwilightCouncilResearch`(研究技能)
- 关联 Behavior：`ChronoBoostTarget`

| 位置 | 面板按钮 | Ability/Cmd | 类型 | 生产/研究目标 | 效果引用 | 需求 |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | ArmorResearchSupplicantShieldArmor / `ArmorResearchSupplicantShieldArmor` | `TwilightCouncilResearch,Research25` | 研究技能 | 升级:AlarakSupplicantShieldArmor `AlarakSupplicantShieldArmor` | - | - |
| 0,0 | ResearchCharge / `ResearchCharge` | `TwilightCouncilResearch,Research1` | 研究技能 | - | - | - |
| 0,0 | ResearchShadowCharge / `ResearchShadowCharge` | `TwilightCouncilResearch,Research5` | 研究技能 | 升级:ZealotResearchShadowCharge `ZealotResearchShadowCharge` | - | - |
| - | ResearchShadowStun / `ResearchShadowStun` | `TwilightCouncilResearch,Research9` | 研究技能 | 升级:ZealotResearchShadowStun `ZealotResearchShadowStun` | - | - |
| 0,1 | ResearchAdeptFenixShadeSpawn / `ResearchAdeptFenixShadeSpawn` | `TwilightCouncilResearch,Research27` | 研究技能 | 升级:AdeptFenixShadeSpawn `AdeptFenixShadeSpawn` | - | - |
| 1 | ResearchDragoonRange / `ResearchDragoonRange` | `TwilightCouncilResearch,Research6` | 研究技能 | 升级:StalkerResearchDragoonRange `StalkerResearchDragoonRange` | - | - |
| 0,1 | ResearchReconstructionLocked / `ResearchReconstructionLocked` | `-` | 未解析 | - | - | KaraxLevel04 |
| 1 | ResearchStalkerTeleport / `ResearchStalkerTeleport` | `TwilightCouncilResearch,Research2` | 研究技能 | - | - | - |
| 0,1 | ZealotPurifierResearchReconstruction / `ZealotPurifierResearchReconstruction` | `TwilightCouncilResearch,Research10` | 研究技能 | 升级:ZealotResearchReconstruction `ZealotResearchReconstruction` | - | - |
| 0,2 | ResearchAlarakSupplicantMaxShields / `ResearchAlarakSupplicantMaxShields` | `TwilightCouncilResearch,Research21` | 研究技能 | 升级:AlarakSupplicantMaxShields `AlarakSupplicantMaxShields` | - | - |
| 0,2 | ResearchFenixKaldalisZealotCleave / `ResearchFenixKaldalisZealotCleave` | `TwilightCouncilResearch,Research30` | 研究技能 | 升级:FenixKaldalisCleave `FenixKaldalisCleave` | - | - |
| 0,2 | ResearchFenixKaldalisZealotCleaveLocked / `ResearchFenixKaldalisZealotCleaveLocked` | `-` | 未解析 | - | - | FenixLevel04 |
| 0,2 | ResearchKaraxEnergyRegenLocked / `ResearchKaraxEnergyRegenLocked` | `-` | 未解析 | - | - | KaraxLevel04 |
| 0,2 | 研究快速恢复 / `ResearchKaraxEnergyRegenUpgrade` | `TwilightCouncilResearch,Research14` | 研究技能 | 升级:KaraxEnergyRegenUpgrade `KaraxEnergyRegenUpgrade` | - | - |
| 0,2 | ResearchShadowStunLocked / `ResearchShadowStunLocked` | `-` | 未解析 | - | - | VorazunLevel04 |
| 0,2 | ResearchSupplicantMaxShieldsLocked / `ResearchSupplicantMaxShieldsLocked` | `-` | 未解析 | - | - | AlarakLevel04 |
| 2 | ResearchWhirlwind / `ResearchWhirlwind` | `TwilightCouncilResearch,Research3` | 研究技能 | 升级:ZealotResearchWhirlwind `ZealotResearchWhirlwind` | - | - |
| 0,2 | ResearchWhirlwindLocked / `ResearchWhirlwindLocked` | `ChampionWarpTrain,Train4` | 未解析 | - | - | ArtanisLevel04 |
| 3 | AlarakResearchStalkerPhasingArmor / `AlarakResearchStalkerPhasingArmor` | `TwilightCouncilResearch,Research18` | 研究技能 | 升级:AlarakStalkerPhasingArmor `AlarakStalkerPhasingArmor` | - | - |
| 0,3 | FenixTalisAdeptLearnBounceShotUpgrade / `FenixTalisAdeptLearnBounceShotUpgrade` | `TwilightCouncilResearch,Research26` | 研究技能 | 升级:FenixChampionTalisAdeptBounceShotUpgrade `FenixChampionTalisAdeptBounceShotUpgrade` | - | - |
| 0,3 | FenixTalisAdeptLearnBounceShotUpgradeLocked / `FenixTalisAdeptLearnBounceShotUpgradeLocked` | `-` | 未解析 | - | - | FenixLevel04 |
| 0,3 | ResearchBlinkShieldRestoreLocked / `ResearchBlinkShieldRestoreLocked` | `-` | 未解析 | - | - | VorazunLevel04 |
| 3 | ResearchBlinkShieldRestoreUpgrade / `ResearchBlinkShieldRestoreUpgrade` | `TwilightCouncilResearch,Research8` | 研究技能 | 升级:StalkerResearchBlinkShieldRestore `StalkerResearchBlinkShieldRestore` | - | - |
| 3 | ResearchDragoonChassis / `ResearchDragoonChassis` | `TwilightCouncilResearch,Research7` | 研究技能 | 升级:StalkerResearchDragoonHealth `StalkerResearchDragoonHealth` | - | - |
| 3 | ResearchDragoonChassisLocked / `ResearchDragoonChassisLocked` | `-` | 未解析 | - | - | ArtanisLevel04 |
| 3 | ResearchEnergizerReclamation / `ResearchEnergizerReclamation` | `TwilightCouncilResearch,Research13` | 研究技能 | 升级:EnergizerReclamation `EnergizerReclamation` | - | - |
| 3 | ResearchReclamationLocked / `ResearchReclamationLocked` | `-` | 未解析 | - | - | KaraxLevel04 |
| 0,3 | ResearchStalkerPhasingArmorLocked / `ResearchStalkerPhasingArmorLocked` | `-` | 未解析 | - | - | AlarakLevel04 |

### DarkPylon / `DarkPylon`

- 来源：名册 XMFinal CommanderBuildings.galaxy，状态 galaxy，模块 XMVorazun.SC2Mod，文件 `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146_CommanderBuildings.galaxy`
- 数值：类型 Structure，种族 Prot，生命 200，护盾 200，费用 100/0，提供补给 8
- Catalog 技能链接：`BuildInProgress`(基础)、`DarkPylonRecall`(目标效果技能)、`PhotonOverchargeMorphDarkPylon`(变形技能)
- 关联 Behavior：`DarkPylonCloakAura`、`DarkPylonCloakAuraInitial`、`DarkPylonPowerSource`、`MatrixOverload`
- 已隐藏基础按钮：1 个（用 `--include-basic` 可展开）

| 位置 | 面板按钮 | Ability/Cmd | 类型 | 生产/研究目标 | 效果引用 | 需求 |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | CloakingField / `CloakingField` | `-` | 未解析 | - | - | - |
| 1,1 | MatrixOverload / `MatrixOverload` | `-` | 未解析 | - | - | HaveSOAMatrixOverload |
| 2,0 | 召回 / `CommanderPrestigeVorazunRecallLocked` | `-` | 未解析 | - | - | CommanderPrestigeVorazunEmergencyRecall |
| 2,0 | 召回 / `DarkPylonRecall` | `DarkPylonRecall,Execute` | 目标效果技能 | - | 区域枚举效果:`DarkPylonRecallSearch` | - |
| 2,0 | 召回 / `DarkPylonRecallLocked` | `-` | 未解析 | - | - | VorazunLevel11 |

## 单位

### 虚空圣堂武士 / `DarkTemplarShakuras`

- 来源：名册 XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 exact，模块 XMVorazun.SC2Mod，文件 `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值：类型 Unit，费用 0/75
- Catalog 技能链接：`DarkArchonMerge`(合并技能)、`DarkTemplarShadowDash`(目标效果技能)、`DarkTemplarShadowFury`(目标效果技能)、`DarkTemplarVoidStasis`(目标效果技能)
- 关联 Behavior：`AllUnitBehaviorController`、`DarkTemplarRecallToDarkShrine`、`VorazunCloakedShieldRegenPermanent`

| 位置 | 面板按钮 | Ability/Cmd | 类型 | 生产/研究目标 | 效果引用 | 需求 |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | DarkTemplarShadowDash / `DarkTemplarShadowDash` | `DarkTemplarShadowDash,Execute` | 目标效果技能 | - | - | - |
| 1,0 | DarkTemplarShadowFury / `-` | `DarkTemplarShadowFury,Execute` | 目标效果技能 | - | - | - |
| 2,0 | VoidDarkTemplarShadowFury / `VoidDarkTemplarShadowFury` | `DarkTemplarShadowFury,Execute` | 目标效果技能 | - | - | - |
| 2,1 | ShadowDashLocked / `ShadowDashLocked` | `-` | 未解析 | - | - | VorazunLevel06 |
| 2,2 | VoidStasis / `VoidStasis` | `DarkTemplarVoidStasis,Execute` | 目标效果技能 | - | - | - |
| 2,2 | VoidStasisLocked / `VoidStasisLocked` | `-` | 未解析 | - | - | VorazunLevel06 |

### Oracle / `Oracle`

- 来源：名册 XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 exact，模块 XMVorazun.SC2Mod，文件 `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值：类型 Unit，费用 100/75
- Catalog 技能链接：无
- 关联 Behavior：`AllUnitBehaviorController`、`CorsairPermanentCloak`、`VorazunCloakedShieldRegenPermanent`
- 已隐藏基础按钮：1 个（用 `--include-basic` 可展开）

| 位置 | 面板按钮 | Ability/Cmd | 类型 | 生产/研究目标 | 效果引用 | 需求 |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | OracleRevelation / `OracleRevelation` | `OracleRevelation,Execute` | 目标效果技能 | - | - | - |
| 2,1 | OracleBuildStasisTrap / `OracleBuildStasisTrap` | `OracleStasisTrapBuild,Build1` | 建造技能 | - | - | - |
| 2,2 | OracleWeaponOn / `OracleWeaponOn` | `OracleWeapon,On` | 行为/被动技能 | - | - | - |
| 2,3 | HaveOracleStasisWardUpgrade / `HaveOracleStasisWardUpgrade` | `-` | 未解析 | - | - | HaveOracleStasisWardUpgrade |
| 2,4 | PermanentlyCloakedOracle / `PermanentlyCloakedOracle` | `-` | 未解析 | - | - | HaveCorsairPermanentCloak |

### CorsairMP / `CorsairMP`

- 来源：名册 XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 exact，模块 XMVorazun.SC2Mod，文件 `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值：类型 Unit
- Catalog 技能链接：`attack`(基础)、`CorsairMPDisruptionWeb`(目标效果技能)、`move`(基础)、`stop`(基础)
- 关联 Behavior：`AllUnitBehaviorController`、`CorsairPermanentCloak`、`VorazunCloakedShieldRegenPermanent`

| 位置 | 面板按钮 | Ability/Cmd | 类型 | 生产/研究目标 | 效果引用 | 需求 |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | CorsairMPDisruptionWeb / `CorsairMPDisruptionWeb` | `CorsairMPDisruptionWeb,Execute` | 目标效果技能 | - | - | - |
| 2,1 | PermanentlyCloakedCorsair / `PermanentlyCloakedCorsair` | `-` | 未解析 | - | - | HaveCorsairPermanentCloak |

### 哨兵 / `Zealot`

- 来源：名册 XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 exact，模块 XMVorazun.SC2Mod，文件 `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值：无
- Catalog 技能链接：`attack`(基础)、`Charge`(CAbilAugment)、`move`(基础)、`ProgressRally`(CAbilRally)、`stop`(基础)
- 关联 Behavior：`AllUnitBehaviorController`

| 位置 | 面板按钮 | Ability/Cmd | 类型 | 生产/研究目标 | 效果引用 | 需求 |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | Charge / `Charge` | `Charge,Execute` | CAbilAugment | - | - | - |
| 2,1 | WhirlwindLocked / `WhirlwindLocked` | `-` | 未解析 | - | - | ArtanisLevel04 |

### ZealotShakuras / `ZealotShakuras`

- 来源：名册 XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 exact，模块 XMVorazun.SC2Mod，文件 `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值：类型 Unit
- Catalog 技能链接：无
- 关联 Behavior：`AllUnitBehaviorController`

- 面板技能：无

### Stalker / `Stalker`

- 来源：名册 XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 exact，模块 XMVorazun.SC2Mod，文件 `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值：无
- Catalog 技能链接：`BlinkSlayer`(目标效果技能)
- 关联 Behavior：`AlarakStalkerPhasingArmor`、`AllUnitBehaviorController`

| 位置 | 面板按钮 | Ability/Cmd | 类型 | 生产/研究目标 | 效果引用 | 需求 |
| --- | --- | --- | --- | --- | --- | --- |
| - | BlinkSlayer / `-` | `BlinkSlayer,Execute` | 目标效果技能 | - | 效果集合:`PhaseBlinkSet` | - |
| 1,4 | CommanderPrestigeAlarakMechBuff / `CommanderPrestigeAlarakMechBuff` | `-` | 未解析 | - | - | CommanderPrestigeAlarakMech |
| 2,0 | Blink / `Blink` | `Blink,Execute` | 目标效果技能 | - | - | - |
| 2,1 | AlarakStalkerPhasingArmor / `AlarakStalkerPhasingArmor` | `-` | 未解析 | - | - | HaveAlarakStalkerPhasingArmor |

### VoidRay / `VoidRay`

- 来源：名册 XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 exact，模块 XMVorazun.SC2Mod，文件 `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值：无
- Catalog 技能链接：`ProgressRally`(CAbilRally)、`VoidRaySwarmDamageBoost`(瞬发效果技能)、`Warpable`
- 关联 Behavior：`AllUnitBehaviorController`

| 位置 | 面板按钮 | Ability/Cmd | 类型 | 生产/研究目标 | 效果引用 | 需求 |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | VoidRaySwarmDamageBoost / `VoidRaySwarmDamageBoost` | `VoidRaySwarmDamageBoost,Execute` | 瞬发效果技能 | - | - | - |

### DarkArchon / `DarkArchon`

- 来源：名册 XMFinal CommanderRosters.galaxy，状态 galaxy，模块 XMVorazun.SC2Mod，文件 `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146_CommanderRosters.galaxy`
- 数值：类型 Unit，生命 10，护盾 350，能量 200，费用 175/275，补给 4
- Catalog 技能链接：`DarkArchonConfusion`(目标效果技能)、`DarkArchonMindControl`(目标效果技能)
- 关联 Behavior：`AllUnitBehaviorController`
- 已隐藏基础按钮：5 个（用 `--include-basic` 可展开）

| 位置 | 面板按钮 | Ability/Cmd | 类型 | 生产/研究目标 | 效果引用 | 需求 |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | MindControlLocked / `MindControlLocked` | `-` | 未解析 | - | - | VorazunLevel09 |
| 2,0 | DarkArchonConfusion / `DarkArchonConfusion` | `DarkArchonConfusion,Execute` | 目标效果技能 | - | 区域枚举效果:`DarkArchonConfusionSearch` | - |
| 2,1 | DarkArchonMindControl / `DarkArchonMindControl` | `DarkArchonMindControl,Execute` | 目标效果技能 | - | 效果集合:`DarkArchonMindControlSet` | - |
| 2,1 | MindControlLocked / `MindControlLocked` | `-` | 未解析 | - | - | VorazunLevel09 |
| 2,2 | HaveDarkArchonFullStartingEnergy / `HaveDarkArchonFullStartingEnergy` | `-` | 未解析 | - | - | HaveDarkArchonFullStartingEnergy |

## 英雄

- 无
