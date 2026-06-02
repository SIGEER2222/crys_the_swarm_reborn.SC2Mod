# 凯拉克斯 / `Karax` 科技链路排查

- 描述：星灵指挥官
- 数据来源：当前 Mod，目录：`合作指挥官版起义狂潮/Mods/XM/XMKarax.SC2Mod`
- 当前 Mod 运行名册：module=`XMKarax.SC2Mod`，instance=`Karax`
- 统计：建筑 6、单位 8、英雄 0、建筑按钮 64、单位按钮 20、效果引用 11

## 指挥官默认/顶部技能

| 技能 | 类型 | 效果引用 | Catalog 来源 |
| --- | --- | --- | --- |
| `SOAOrbitalStrikeKarax,Execute` | 目标效果技能 | 持续效果:`SOAOrbitalStrikeCP`、区域枚举效果:`SOAOrbitalStrikeImpactSearch` | xmartanis:1、xmfinal:1、xmkarax:1 |
| `SOAThermalLanceActivate,On` | 行为/被动技能 | - | xmabathur:1、xmabathurreborn:1、xmalarak:1、xmartanis:1、另 8 个 |
| `` | 未解析 | - | - |
| `SOAMapWideChrono,Execute` | 瞬发效果技能 | 区域枚举效果:`SOAMapWideChronoSearch` | xmabathur:1、xmabathurreborn:1、xmalarak:1、xmartanis:1、另 8 个 |
| `` | 未解析 | - | - |
| `SOAPurifierBeam,Execute` | 目标效果技能 | - | xmfenix:1、xmfinal:1、xmzeratul:1 |
| `` | 未解析 | - | - |
| `` | 未解析 | - | - |
| `` | 未解析 | - | - |
| `` | 未解析 | - | - |
| `` | 未解析 | - | - |
| `SOARepairBeam,Execute` | 目标效果技能 | - | xmabathur:1、xmabathurreborn:1、xmalarak:1、xmartanis:1、另 8 个 |
| `SOAThermalLanceTargetingDummy,Execute` | 未解析 | - | - |
| `BuildInProgress,Cancel` | 未解析 | - | - |

## 建筑

### Gateway / `Gateway`

- 来源：名册 XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 exact，模块 XMKarax.SC2Mod，文件 `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
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

- 来源：名册 XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 exact，模块 XMKarax.SC2Mod，文件 `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值：无
- Catalog 技能链接：`attack`(基础)、`PhaseCannonProjection`(目标效果技能)、`stop`(基础)
- 已隐藏基础按钮：1 个（用 `--include-basic` 可展开）

| 位置 | 面板按钮 | Ability/Cmd | 类型 | 生产/研究目标 | 效果引用 | 需求 |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | 强化瞄准 / `KaraxTurretRange` | `-` | 未解析 | - | - | HaveKaraxTurretRange |
| 2,1 | 军械优化 / `KaraxTurretAttackSpeed` | `-` | 未解析 | - | - | HaveKaraxTurretAttackSpeed |

### 护盾充能器 / `ShieldBattery`

- 来源：名册 XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 exact，模块 XMKarax.SC2Mod，文件 `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值：类型 Structure，能量 200
- Catalog 技能链接：`BuildInProgress`(基础)、`ShieldBatteryRechargeChanneled`、`ShieldBatteryRechargeEx5`(目标效果技能)、`ShieldBatteryStructureBarrier`(目标效果技能)

| 位置 | 面板按钮 | Ability/Cmd | 类型 | 生产/研究目标 | 效果引用 | 需求 |
| --- | --- | --- | --- | --- | --- | --- |
| 2,1 | ShieldBatteryStructureBarrier / `ShieldBatteryStructureBarrier` | `ShieldBatteryStructureBarrier,Execute` | 目标效果技能 | - | 施加行为效果:`ShieldBatteryStructureBarrierAB` | - |
| 2,1 | StructureBarrierLocked / `StructureBarrierLocked` | `-` | 未解析 | - | - | KaraxLevel06 |
| 2,2 | 强化瞄准 / `KaraxTurretRange` | `-` | 未解析 | - | - | HaveKaraxTurretRange |
| 2,3 | 快速恢复 / `KaraxEnergyRegenUpgrade` | `-` | 未解析 | - | - | HaveKaraxEnergyRegenUpgrade |

### 太阳锻炉 / `SolarForge`

- 来源：名册 XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 exact，模块 XMKarax.SC2Mod，文件 `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值：类型 Structure，种族 Prot，生命 500，护盾 500，费用 200/200
- Catalog 技能链接：`BrokenSolarForge`(变形技能)、`BuildInProgress`(基础)、`que5Passive`、`SolarForgeResearch`(研究技能)
- 关联 Behavior：`ChronoBoostTarget`、`SolarForgeBeam`、`SolarForgePreventDestroy`
- 已隐藏基础按钮：3 个（用 `--include-basic` 可展开）

| 位置 | 面板按钮 | Ability/Cmd | 类型 | 生产/研究目标 | 效果引用 | 需求 |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | ResearchSolarEfficiencyLevel1 / `ResearchSolarEfficiencyLevel1` | `SolarForgeResearch,Research1` | 研究技能 | 升级:SolarEfficiencyLevel1 `SolarEfficiencyLevel1` | - | - |
| 0,0 | ResearchSolarEfficiencyLevel2 / `ResearchSolarEfficiencyLevel2` | `SolarForgeResearch,Research2` | 研究技能 | 升级:SolarEfficiencyLevel2 `SolarEfficiencyLevel2` | - | - |
| 0,0 | ResearchSolarEfficiencyLevel3 / `ResearchSolarEfficiencyLevel3` | `SolarForgeResearch,Research3` | 研究技能 | 升级:SolarEfficiencyLevel3 `SolarEfficiencyLevel3` | - | - |
| 0,0 | ResearchSolarEfficiencyLevel3Locked / `ResearchSolarEfficiencyLevel3Locked` | `-` | 未解析 | - | - | KaraxLevel08 |
| 0,1 | ResearchSOARepairBeamExtraTarget / `ResearchSOARepairBeamExtraTarget` | `SolarForgeResearch,Research4` | 研究技能 | 升级:SOARepairBeamExtraTarget `SOARepairBeamExtraTarget` | - | - |
| 0,1 | ResearchSOARepairBeamExtraTargetLocked / `ResearchSOARepairBeamExtraTargetLocked` | `-` | 未解析 | - | - | KaraxLevel08 |
| 0,2 | ResearchSOAOrbitalStrikeUpgrade / `ResearchSOAOrbitalStrikeUpgrade` | `SolarForgeResearch,Research5` | 研究技能 | 升级:SOAOrbitalStrikeUpgrade `SOAOrbitalStrikeUpgrade` | - | - |
| 0,2 | ResearchSOAOrbitalStrikeUpgradeLocked / `ResearchSOAOrbitalStrikeUpgradeLocked` | `-` | 未解析 | - | - | KaraxLevel12 |
| 0,3 | ResearchSOASolarLanceUpgrade / `ResearchSOASolarLanceUpgrade` | `SolarForgeResearch,Research6` | 研究技能 | 升级:SOASolarLanceUpgrade `SOASolarLanceUpgrade` | - | - |
| 0,3 | ResearchSOASolarLanceUpgradeLocked / `ResearchSOASolarLanceUpgradeLocked` | `-` | 未解析 | - | - | KaraxLevel12 |
| 2,0 | SolarEfficiencyPassiveLevel1 / `SolarEfficiencyPassiveLevel1` | `-` | 未解析 | - | - | HaveSolarEfficiencyLevel1 |
| 2,0 | SolarEfficiencyPassiveLevel2 / `SolarEfficiencyPassiveLevel2` | `-` | 未解析 | - | - | HaveSolarEfficiencyLevel2 |
| 2,0 | SolarEfficiencyPassiveLevel3 / `SolarEfficiencyPassiveLevel3` | `-` | 未解析 | - | - | HaveSolarEfficiencyLevel3 |
| 2,1 | SOARepairBeamExtraTargetPassive / `SOARepairBeamExtraTargetPassive` | `-` | 未解析 | - | - | HaveSOARepairBeamExtraTarget |
| 2,2 | SOAOrbitalStrikeUpgradePassive / `SOAOrbitalStrikeUpgradePassive` | `-` | 未解析 | - | - | HaveSOAOrbitalStrikeUpgrade |
| 2,3 | SOASolarLanceUpgradePassive / `SOASolarLanceUpgradePassive` | `-` | 未解析 | - | - | HaveSOASolarLanceUpgrade |
| 0,0 | BrokenSolarForge / `BrokenSolarForge` | `BrokenSolarForge,Execute` | 变形技能 | - | - | - |

### TwilightCouncil / `TwilightCouncil`

- 来源：名册 XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，状态 exact，模块 XMKarax.SC2Mod，文件 `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
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

### 凯达琳巨石 / `KhaydarinMonolith`

- 来源：名册 XMFinal CommanderBuildings.galaxy，状态 galaxy，模块 XMKarax.SC2Mod，文件 `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146_CommanderBuildings.galaxy`
- 数值：类型 Structure，生命 100，费用 300/100
- Catalog 技能链接：无
- 已隐藏基础按钮：3 个（用 `--include-basic` 可展开）

| 位置 | 面板按钮 | Ability/Cmd | 类型 | 生产/研究目标 | 效果引用 | 需求 |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | 强化瞄准 / `KaraxTurretRange` | `-` | 未解析 | - | - | HaveKaraxTurretRange |
| 2,1 | 军械优化 / `KaraxTurretAttackSpeed` | `-` | 未解析 | - | - | HaveKaraxTurretAttackSpeed |

## 单位

### 不朽者 / `ImmortalAiur`

- 来源：名册 XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 exact，模块 XMKarax.SC2Mod，文件 `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
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

- 来源：名册 XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 exact，模块 XMKarax.SC2Mod，文件 `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值：无
- Catalog 技能链接：`attack`(基础)、`move`(基础)、`ObserverMorphtoObserverSiege`(变形技能)、`stop`(基础)、`Warpable`
- 关联 Behavior：`AllUnitBehaviorController`

| 位置 | 面板按钮 | Ability/Cmd | 类型 | 生产/研究目标 | 效果引用 | 需求 |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | HaveGraviticBoosters / `HaveGraviticBoosters` | `-` | 未解析 | - | - | HaveGraviticBoosters |
| 2,2 | MorphtoObserverSiege / `MorphtoObserverSiege` | `ObserverMorphtoObserverSiege,Execute` | 变形技能 | - | - | - |
| 2,4 | Detector / `Detector` | `-` | 未解析 | - | - | - |

### 侦察机 / `PhoenixPurifier`

- 来源：名册 XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 exact，模块 XMKarax.SC2Mod，文件 `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值：类型 Unit
- Catalog 技能链接：`MirageGravitonBeamVoidCampaign`(目标效果技能)
- 关联 Behavior：`AllUnitBehaviorController`
- 已隐藏基础按钮：1 个（用 `--include-basic` 可展开）

| 位置 | 面板按钮 | Ability/Cmd | 类型 | 生产/研究目标 | 效果引用 | 需求 |
| --- | --- | --- | --- | --- | --- | --- |
| - | GravitonBeam / `GravitonBeam` | `MirageGravitonBeamVoidCampaign,Execute` | 目标效果技能 | - | 持续效果:`GravitonBeamVoidCampaign` | - |
| - | GravitonBeamVoidCampaign / `GravitonBeamVoidCampaign` | `GravitonBeamVoidCampaign,Execute` | 目标效果技能 | - | - | - |
| 2,1 | AnionPulseCrystal / `AnionPulseCrystal` | `-` | 未解析 | - | - | HaveKaraxPhoenixRangeUpgrade |

### 侦察机 / `Scout`

- 来源：名册 XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 exact，模块 XMKarax.SC2Mod，文件 `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值：类型 Unit，生命 150，护盾 100，费用 250/75
- Catalog 技能链接：`FenixMojoScoutMorph`(变形技能)
- 关联 Behavior：`AllUnitBehaviorController`

| 位置 | 面板按钮 | Ability/Cmd | 类型 | 生产/研究目标 | 效果引用 | 需求 |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | HaveFenixScoutWeaponRange / `HaveFenixScoutWeaponRange` | `-` | 未解析 | - | - | HaveFenixScoutWeaponRange |

### 激励者 / `SentryPurifier`

- 来源：名册 XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 exact，模块 XMKarax.SC2Mod，文件 `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值：类型 Unit
- Catalog 技能链接：`EnergizerReclamation`(目标效果技能)
- 关联 Behavior：`AllUnitBehaviorController`、`VoidSentryChronoBeamRally`、`VoidSentryChronoBeamRallyB`
- 已隐藏基础按钮：1 个（用 `--include-basic` 可展开）

| 位置 | 面板按钮 | Ability/Cmd | 类型 | 生产/研究目标 | 效果引用 | 需求 |
| --- | --- | --- | --- | --- | --- | --- |
| 2,1 | EnergizerReclamation / `EnergizerReclamation` | `EnergizerReclamation,Execute` | 目标效果技能 | - | 效果集合:`ReclamationSet`、效果集合:`SentryReclamationSet` | - |
| 2,1 | ReclamationLocked / `ReclamationLocked` | `-` | 未解析 | - | - | KaraxLevel04 |
| 2,4 | 快速恢复 / `KaraxEnergyRegenUpgrade` | `-` | 未解析 | - | - | HaveKaraxEnergyRegenUpgrade |

### 哨兵 / `ZealotPurifier`

- 来源：名册 XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 exact，模块 XMKarax.SC2Mod，文件 `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值：类型 Unit
- Catalog 技能链接：`Charge`(CAbilAugment)、`FenixKaldalisZealotMorph`(变形技能)
- 关联 Behavior：`AllUnitBehaviorController`、`FenixSuppressAvengingProtocol`
- 已隐藏基础按钮：1 个（用 `--include-basic` 可展开）

| 位置 | 面板按钮 | Ability/Cmd | 类型 | 生产/研究目标 | 效果引用 | 需求 |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | Charge / `Charge` | `Charge,Execute` | CAbilAugment | - | - | - |
| 2,1 | ReconstructionLocked / `ReconstructionLocked` | `-` | 未解析 | - | - | KaraxLevel04 |

### 巨像 / `Colossus`

- 来源：名册 XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 exact，模块 XMKarax.SC2Mod，文件 `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值：无
- Catalog 技能链接：`attack`(基础)、`move`(基础)、`ProgressRally`(CAbilRally)、`stop`(基础)、`Warpable`
- 关联 Behavior：`AllUnitBehaviorController`

| 位置 | 面板按钮 | Ability/Cmd | 类型 | 生产/研究目标 | 效果引用 | 需求 |
| --- | --- | --- | --- | --- | --- | --- |
| 2,1 | ExtendedThermalLance / `ExtendedThermalLance` | `-` | 未解析 | - | - | HaveKaraxExtendedThermalLance |
| 2,4 | Rally / `Rally` | `ProgressRally,Rally1` | CAbilRally | - | - | - |

### 航母 / `Carrier`

- 来源：名册 XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，状态 exact，模块 XMKarax.SC2Mod，文件 `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值：无
- Catalog 技能链接：`attack`(基础)、`CarrierHangar`(弹仓/机库技能)、`FenixClolarionCarrierMorph`(变形技能)、`HangarQueue5`、`move`(基础)、`stop`(基础)
- 关联 Behavior：`AllUnitBehaviorController`、`Supply`

| 位置 | 面板按钮 | Ability/Cmd | 类型 | 生产/研究目标 | 效果引用 | 需求 |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | Interceptor / `Interceptor` | `CarrierHangar,Ammo1` | 弹仓/机库技能 | - | - | - |
| 2,1 | GravitonCatapult / `GravitonCatapult` | `-` | 未解析 | - | - | UseGravitonCatapult |

## 英雄

- 无
