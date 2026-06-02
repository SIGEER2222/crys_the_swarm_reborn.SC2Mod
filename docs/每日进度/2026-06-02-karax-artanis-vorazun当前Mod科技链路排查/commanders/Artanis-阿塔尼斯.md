# 阿塔尼斯 / `Artanis` 科技链路排查

- 描述：达拉姆大主教
- 数据来源：当前 Mod，目录：`合作指挥官版起义狂潮/Mods/XM/XMArtanis.SC2Mod`
- 当前 Mod 运行名册：module=`XMArtanis.SC2Mod`，instance=`Artanis`
- 统计：建筑 5、单位 9、英雄 0、建筑按钮 76、单位按钮 26、效果引用 8

## 指挥官默认/顶部技能

| 技能 | 类型 | 效果引用 | Catalog 来源 |
| --- | --- | --- | --- |
| `SOAPylonPower,Execute` | 目标效果技能 | 持续效果:`SOAPylonPowerCoop` | xmabathur:1、xmabathurreborn:1、xmalarak:1、xmartanis:1、另 8 个 |
| `SOAOrbitalStrikeActivate,On` | 未解析 | - | - |
| `CommanderPrestigeArtanisOrbitalStrikeShieldOverchargeTargeted,Execute` | 目标效果技能 | 区域枚举效果:`CommanderPrestigeArtanisOrbitalStrikeShieldOverchargeTargetedSearch` | xmartanis:1、xmfinal:1 |
| `SoASuperShield,Execute` | 未解析 | - | - |
| `SOAStrafeAttack,Execute` | 未解析 | - | - |
| `` | 未解析 | - | - |
| `` | 未解析 | - | - |
| `` | 未解析 | - | - |
| `` | 未解析 | - | - |
| `` | 未解析 | - | - |
| `` | 未解析 | - | - |
| `SOAOrbitalStrikeTargetingDummy,Execute` | 未解析 | - | - |
| `SOAOrbitalStrikeExecute,Execute` | 未解析 | - | - |
| `BuildInProgress,Cancel` | 未解析 | - | - |

## 建筑

### Gateway / `Gateway`

- 来源：名册 XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 exact，模块 XMArtanis.SC2Mod，文件 `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值：无
- Catalog 技能链接：`GatewayTrain`(训练技能)、`que5notPassive`(队列技能)、`Rally`(CAbilRally)、`UpgradeToWarpGate`(变形技能)
- 关联 Behavior：`ChronoBoostTarget`
- 可生产/创建：DarkArchon `DarkArchon`（非本指挥官名册）、Monitor `Monitor`（非本指挥官名册）、保护者 `SentryFenix`（非本指挥官名册）、Supplicant `Supplicant`（非本指挥官名册）

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

- 来源：名册 XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 exact，模块 XMArtanis.SC2Mod，文件 `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值：无
- Catalog 技能链接：`attack`(基础)、`PhaseCannonProjection`(目标效果技能)、`stop`(基础)
- 已隐藏基础按钮：1 个（用 `--include-basic` 可展开）

| 位置 | 面板按钮 | Ability/Cmd | 类型 | 生产/研究目标 | 效果引用 | 需求 |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | 强化瞄准 / `KaraxTurretRange` | `-` | 未解析 | - | - | HaveKaraxTurretRange |
| 2,1 | 军械优化 / `KaraxTurretAttackSpeed` | `-` | 未解析 | - | - | HaveKaraxTurretAttackSpeed |

### RoboticsBay / `RoboticsBay`

- 来源：名册 XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 exact，模块 XMArtanis.SC2Mod，文件 `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值：无
- Catalog 技能链接：`BuildInProgress`(基础)、`que5`(队列技能)、`RoboticsBayResearch`(研究技能)
- 关联 Behavior：`ChronoBoostTarget`
- 已隐藏基础按钮：2 个（用 `--include-basic` 可展开）

| 位置 | 面板按钮 | Ability/Cmd | 类型 | 生产/研究目标 | 效果引用 | 需求 |
| --- | --- | --- | --- | --- | --- | --- |
| - | 掠夺者 / `ReaverPassive` | `-` | 未解析 | - | - | HaveVoidReaver |
| 0,0 | ResearchGraviticBooster / `ResearchGraviticBooster` | `RoboticsBayResearch,Research2` | 研究技能 | - | - | - |
| 0,0 | ResearchVanguardArmoredDamage / `ResearchVanguardArmoredDamage` | `RoboticsBayResearch,Research16` | 研究技能 | 升级:VanguardArmoredDamage `VanguardArmoredDamage` | - | - |
| 0,0 | ZeratulResearchImmortalBarrierBase / `ZeratulResearchImmortalBarrierBase` | `-` | 未解析 | - | - | HaveZeratulArtifactTier1AndRoboticsBay |
| 0,1 | ResearchAlarakVanguardIncreaseSplashArea / `ResearchAlarakVanguardIncreaseSplashArea` | `RoboticsBayResearch,Research15` | 研究技能 | 升级:AlarakVanguardIncreaseSplashArea `AlarakVanguardIncreaseSplashArea` | - | - |
| 0,1 | ResearchAlarakVanguardIncreaseSplashAreaLocked / `ResearchAlarakVanguardIncreaseSplashAreaLocked` | `-` | 未解析 | - | - | AlarakLevel06 |
| 0,1 | ResearchBarrier / `ResearchBarrier` | `RoboticsBayResearch,Research9` | 研究技能 | 升级:ImmortalResearchBarrierAdvanced `ImmortalResearchBarrierAdvanced` | - | - |
| 0,1 | ResearchExtendedThermalLance / `ResearchExtendedThermalLance` | `RoboticsBayResearch,Research6` | 研究技能 | - | - | - |
| 0,2 | FenixResearchDisruptorCloakLocked / `FenixResearchDisruptorCloakLocked` | `-` | 未解析 | - | - | FenixLevel09 |
| 0,2 | ResearchAlarakColossusChargedBlastAirAttack / `ResearchAlarakColossusChargedBlastAirAttack` | `RoboticsBayResearch,Research18` | 研究技能 | 升级:AlarakColossusChargedBlastAirAttack `AlarakColossusChargedBlastAirAttack` | - | - |
| 0,2 | ResearchDisruptorCloak / `ResearchDisruptorCloak` | `RoboticsBayResearch,Research19` | 研究技能 | 升级:DisruptorCloak `DisruptorCloak` | - | - |
| 0,2 | ResearchFireBeam / `ResearchFireBeam` | `RoboticsBayResearch,Research12` | 研究技能 | 升级:ColossusFireBeam `ColossusFireBeam` | - | - |
| 0,2 | ResearchFireBeamLocked / `ResearchFireBeamLocked` | `-` | 未解析 | - | - | KaraxLevel09 |
| 0,2 | ResearchIncreasedScarabCountLocked / `ResearchIncreasedScarabCountLocked` | `-` | 未解析 | - | - | ArtanisLevel09 |
| 0,2 | ResearchReaverIncreasedScarabCount / `ResearchReaverIncreasedScarabCount` | `RoboticsBayResearch,Research13` | 研究技能 | 升级:ReaverIncreasedScarabCount `ReaverIncreasedScarabCount` | - | - |
| 0,3 | FenixResearchDisruptorSecondExplosionLocked / `FenixResearchDisruptorSecondExplosionLocked` | `-` | 未解析 | - | - | FenixLevel09 |
| 0,3 | ResearchAlarakColossusChargedBlastChargeTime / `ResearchAlarakColossusChargedBlastChargeTime` | `RoboticsBayResearch,Research17` | 研究技能 | 升级:AlarakColossusChargedBlastChargeTime `AlarakColossusChargedBlastChargeTime` | - | - |
| 0,3 | ResearchChargedBlastChargeTimeLocked / `ResearchChargedBlastChargeTimeLocked` | `-` | 未解析 | - | - | AlarakLevel06 |
| 0,3 | ResearchDisruptorSecondExplosion / `ResearchDisruptorSecondExplosion` | `RoboticsBayResearch,Research20` | 研究技能 | 升级:DisruptorSecondExplosion `DisruptorSecondExplosion` | - | - |
| 0,3 | ResearchIncreasedScarabSplashRadiusLocked / `ResearchIncreasedScarabSplashRadiusLocked` | `-` | 未解析 | - | - | ArtanisLevel09 |
| 0,3 | ResearchReaverIncreasedScarabSplashRadius / `ResearchReaverIncreasedScarabSplashRadius` | `RoboticsBayResearch,Research14` | 研究技能 | 升级:ReaverIncreasedScarabSplashRadius `ReaverIncreasedScarabSplashRadius` | - | - |
| 0,3 | ResearchShadowCannon / `ResearchShadowCannon` | `RoboticsBayResearch,Research10` | 研究技能 | 升级:ImmortalResearchShadowCannon `ImmortalResearchShadowCannon` | - | - |
| 0,3 | ResearchShadowCannonLocked / `ResearchShadowCannonLocked` | `-` | 未解析 | - | - | KaraxLevel09 |
| 1 | 巨像 / `ColossusPassive` | `-` | 未解析 | - | - | HaveColossus |
| 1,0 | 巨像 / `ColossusPassive` | `-` | 未解析 | - | - | HaveVoidColossusFireBeam |
| 1,0 | ResearchZeratulImmortalRange / `ResearchZeratulImmortalRange` | `-` | 未解析 | - | - | HaveZeratulArtifactTier2AndRoboticsBay |
| 1,0 | WrathwalkerPassive / `WrathwalkerPassive` | `-` | 未解析 | - | - | HaveVoidColossusTaldarim |
| 2 | FenixImmortalResearchDetonationShot / `FenixImmortalResearchDetonationShot` | `RoboticsBayResearch,Research21` | 研究技能 | 升级:FenixImmortalDetonationShot `FenixImmortalDetonationShot` | - | - |
| 2 | FenixImmortalResearchDetonationShotLocked / `FenixImmortalResearchDetonationShotLocked` | `-` | 未解析 | - | - | FenixLevel12 |
| 2,0 | ZeratulResearchImprovedBarrier / `ZeratulResearchImprovedBarrier` | `-` | 未解析 | - | - | HaveZeratulArtifactTier3AndRoboticsBay |
| 2,1 | ResearchFenixWarbringerColossusPowerShot / `ResearchFenixWarbringerColossusPowerShot` | `RoboticsBayResearch,Research23` | 研究技能 | 升级:FenixWarbringerColossusPowerShot `FenixWarbringerColossusPowerShot` | - | - |
| 2,1 | ResearchFenixWarbringerColossusPowerShotLocked / `ResearchFenixWarbringerColossusPowerShotLocked` | `-` | 未解析 | - | - | FenixLevel14 |

### RoboticsFacilityWarp / `RoboticsFacilityWarp`

- 来源：名册 XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 exact，模块 XMArtanis.SC2Mod，文件 `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值：类型 Structure
- Catalog 技能链接：`MorphBackToRoboticsFacility`(变形技能)、`RoboticsFacilityWarpTrain`(折跃/部署训练技能)
- 关联 Behavior：`ChronoBoostTarget`

| 位置 | 面板按钮 | Ability/Cmd | 类型 | 生产/研究目标 | 效果引用 | 需求 |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | MorphBackToRoboticsFacility / `MorphBackToRoboticsFacility` | `MorphBackToRoboticsFacility,Execute` | 变形技能 | - | - | - |
| 0,2 | Observer / `Observer` | `RoboticsFacilityWarpTrain,Train2` | 折跃/部署训练技能 | - | - | - |
| 2,2 | SuperiorWarpRoboticsFacilities / `SuperiorWarpRoboticsFacilities` | `-` | 未解析 | - | - | HaveSuperiorWarpGates |

### TwilightCouncil / `TwilightCouncil`

- 来源：名册 XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 exact，模块 XMArtanis.SC2Mod，文件 `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
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

## 单位

### 执政官 / `Archon`

- 来源：名册 XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 exact，模块 XMArtanis.SC2Mod，文件 `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值：无
- Catalog 技能链接：`attack`(基础)、`FeedbackArchon`(目标效果技能)、`move`(基础)、`ProgressRally`(CAbilRally)、`PsiStormArchon`(目标效果技能)、`stop`(基础)、`Warpable`
- 关联 Behavior：`AllUnitBehaviorController`、`ArtanisHighArchon`

| 位置 | 面板按钮 | Ability/Cmd | 类型 | 生产/研究目标 | 效果引用 | 需求 |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | HighTemplarEnergyUpgrade / `HighTemplarEnergyUpgrade` | `-` | 未解析 | - | - | HaveHighTemplarEnergyUpgradeHighArchon |
| 1,1 | HealingPsionicStorm / `HealingPsionicStorm` | `-` | 未解析 | - | - | HaveHealingPsionicStormHighArchon |
| 2,0 | Feedback / `Feedback` | `FeedbackArchon,Execute` | 目标效果技能 | - | - | - |
| 2,0 | FeedbackLocked / `FeedbackLocked` | `-` | 未解析 | - | - | ArtanisLevel07 |
| 2,1 | PsionicStormLocked / `PsionicStormLocked` | `-` | 未解析 | - | - | ArtanisLevel07 |
| 2,1 | PsiStorm / `PsiStorm` | `PsiStormArchon,Execute` | 目标效果技能 | - | - | - |

### 不朽者 / `ImmortalAiur`

- 来源：名册 XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 exact，模块 XMArtanis.SC2Mod，文件 `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值：类型 Unit
- Catalog 技能链接：`ImmortalBarrierBase`(瞬发效果技能)、`ImmortalShakurasShadowCannon`(目标效果技能)
- 关联 Behavior：`AllUnitBehaviorController`

| 位置 | 面板按钮 | Ability/Cmd | 类型 | 生产/研究目标 | 效果引用 | 需求 |
| --- | --- | --- | --- | --- | --- | --- |
| - | ImmortalBarrierBase / `ImmortalBarrierBase` | `ImmortalBarrierBase,Execute` | 瞬发效果技能 | - | - | - |
| - | ImmortalShakurasShadowCannon / `ImmortalShakurasShadowCannon` | `ImmortalShakurasShadowCannon,Execute` | 目标效果技能 | - | - | - |
| 1,0 | HaveBarrier / `HaveBarrier` | `-` | 未解析 | - | - | HaveBarrier |
| 2,1 | ShadowCannonLocked / `ShadowCannonLocked` | `-` | 未解析 | - | - | KaraxLevel09 |

### 侦测器 / `Observer`

- 来源：名册 XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 exact，模块 XMArtanis.SC2Mod，文件 `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值：无
- Catalog 技能链接：`attack`(基础)、`move`(基础)、`ObserverMorphtoObserverSiege`(变形技能)、`stop`(基础)、`Warpable`
- 关联 Behavior：`AllUnitBehaviorController`

| 位置 | 面板按钮 | Ability/Cmd | 类型 | 生产/研究目标 | 效果引用 | 需求 |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | HaveGraviticBoosters / `HaveGraviticBoosters` | `-` | 未解析 | - | - | HaveGraviticBoosters |
| 2,2 | MorphtoObserverSiege / `MorphtoObserverSiege` | `ObserverMorphtoObserverSiege,Execute` | 变形技能 | - | - | - |
| 2,4 | Detector / `Detector` | `-` | 未解析 | - | - | - |

### 凤凰 / `PhoenixAiur`

- 来源：名册 XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 exact，模块 XMArtanis.SC2Mod，文件 `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值：无
- Catalog 技能链接：无
- 关联 Behavior：`AllUnitBehaviorController`、`VorazunCommanderCloak`
- 已隐藏基础按钮：1 个（用 `--include-basic` 可展开）

| 位置 | 面板按钮 | Ability/Cmd | 类型 | 生产/研究目标 | 效果引用 | 需求 |
| --- | --- | --- | --- | --- | --- | --- |
| 2,2 | HaveAnionPulseCrystals / `HaveAnionPulseCrystals` | `-` | 未解析 | - | - | HavePhoenixRangeUpgrade |

### 龙骑士 / `Dragoon`

- 来源：名册 XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 exact，模块 XMArtanis.SC2Mod，文件 `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值：类型 Unit，生命 100
- Catalog 技能链接：无
- 关联 Behavior：`AllUnitBehaviorController`
- 已隐藏基础按钮：1 个（用 `--include-basic` 可展开）

| 位置 | 面板按钮 | Ability/Cmd | 类型 | 生产/研究目标 | 效果引用 | 需求 |
| --- | --- | --- | --- | --- | --- | --- |
| 2,1 | VoidStalkerDragoonRange / `VoidStalkerDragoonRange` | `-` | 未解析 | - | - | HaveSingularityCharge |

### 哨兵 / `Zealot`

- 来源：名册 XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 exact，模块 XMArtanis.SC2Mod，文件 `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值：无
- Catalog 技能链接：`attack`(基础)、`Charge`(CAbilAugment)、`move`(基础)、`ProgressRally`(CAbilRally)、`stop`(基础)
- 关联 Behavior：`AllUnitBehaviorController`

| 位置 | 面板按钮 | Ability/Cmd | 类型 | 生产/研究目标 | 效果引用 | 需求 |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | Charge / `Charge` | `Charge,Execute` | CAbilAugment | - | - | - |
| 2,1 | WhirlwindLocked / `WhirlwindLocked` | `-` | 未解析 | - | - | ArtanisLevel04 |

### 高阶圣堂武士 / `HighTemplar`

- 来源：名册 XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 exact，模块 XMArtanis.SC2Mod，文件 `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值：无
- Catalog 技能链接：`ArchonWarp`(合并技能)、`Feedback`(目标效果技能)、`move`(基础)、`ProgressRally`(CAbilRally)、`PsiStorm`(目标效果技能)、`stop`(基础)
- 关联 Behavior：`AllUnitBehaviorController`、`DamageDisablesAttackHighTemplar`

| 位置 | 面板按钮 | Ability/Cmd | 类型 | 生产/研究目标 | 效果引用 | 需求 |
| --- | --- | --- | --- | --- | --- | --- |
| 1,0 | HighTemplarEnergyUpgrade / `HighTemplarEnergyUpgrade` | `-` | 未解析 | - | - | HaveHighTemplarEnergyUpgrade |
| 1,1 | HealingPsionicStorm / `HealingPsionicStorm` | `-` | 未解析 | - | - | HaveHealingPsionicStorm |
| 2,0 | Feedback / `Feedback` | `Feedback,Execute` | 目标效果技能 | - | - | - |
| 2,1 | PsiStorm / `PsiStorm` | `PsiStorm,Execute` | 目标效果技能 | - | - | - |
| 2,3 | AWrp / `AWrp` | `ArchonWarp,SelectedUnits` | 合并技能 | - | - | - |

### 风暴战舰 / `Tempest`

- 来源：名册 XMFinal CommanderRosters.galaxy，状态 galaxy，模块 XMArtanis.SC2Mod，文件 `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146_CommanderRosters.galaxy`
- 数值：无
- Catalog 技能链接：`LightningBomb`(目标效果技能)
- 关联 Behavior：`AllUnitBehaviorController`

| 位置 | 面板按钮 | Ability/Cmd | 类型 | 生产/研究目标 | 效果引用 | 需求 |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | DisintegrationLocked / `DisintegrationLocked` | `-` | 未解析 | - | - | ArtanisLevel12 |
| 2,0 | LightningBomb / `LightningBomb` | `LightningBomb,Execute` | 目标效果技能 | - | - | - |

### 掠夺者 / `Reaver`

- 来源：名册 XMFinal CommanderRosters.galaxy，状态 galaxy，模块 XMArtanis.SC2Mod，文件 `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146_CommanderRosters.galaxy`
- 数值：无
- Catalog 技能链接：无
- 关联 Behavior：`AllUnitBehaviorController`

| 位置 | 面板按钮 | Ability/Cmd | 类型 | 生产/研究目标 | 效果引用 | 需求 |
| --- | --- | --- | --- | --- | --- | --- |
| 2,1 | HaveReaverIncreasedScarabCount / `HaveReaverIncreasedScarabCount` | `-` | 未解析 | - | - | HaveReaverIncreasedScarabCount |
| 2,2 | PassiveReaverIncreasedScarabSplashRadius / `PassiveReaverIncreasedScarabSplashRadius` | `-` | 未解析 | - | - | HaveReaverIncreasedScarabSplashRadius |

## 英雄

- 无
