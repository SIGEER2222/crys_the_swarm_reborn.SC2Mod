# 雷诺 / `Raynor` 科技链路排查 / Tech Tree Diagnostics

- 描述 / Description：无 / None
- 数据来源 / Data source：当前 Mod / Current Mod，目录 / Directory：`合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod`
- 当前 Mod 运行名册 / Current Mod roster：module=`XMRaynor.SC2Mod`，instance=`Raynor`
- 统计 / Stats：建筑 6、生产链补充建筑 0、单位 12、英雄 0、建筑按钮 8、单位按钮 18、效果引用 5
- 名称显示 / Name display：能从当前 Mod zhCN 解析时显示“中文名 / `英文ID`”；仅显示 `ID` 表示当前 Mod 未找到可用中文名。

## 初始化/开局单位 / Initial Opener

| 槽位 / Slot | 单位 / Unit | 预期类型 / Expected Kind | Catalog 父级 / Catalog Parent | 是否在运行名册 / In Runtime Roster | 来源 / Source |
| --- | --- | --- | --- | --- | --- |
| 初始基地 / Command Center | `CommandCenter` | building | - | 否 / No | Catalog xmraynor，Instance Raynor，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UserData.xml` |
| 初始工人 / Worker | `SCVRaynor` | unit | `SCV` | 是 / Yes | Catalog xmraynor，Instance Raynor，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UserData.xml`，名册状态 / Roster status alias |
| 第二初始单位 / Second Unit | `SupplyDepot` | unit | - | 否 / No | Catalog xmraynor，Instance Raynor，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UserData.xml` |

## 指挥官默认/顶部技能 / Commander Default / Top-panel Skills

| 技能名 / Skill Name | Ability/Cmd | 类型 / Type | 效果引用 / Effect References | Catalog 来源 / Catalog Sources |
| --- | --- | --- | --- | --- |
| `VoidCoopSummonHyperion` | `VoidCoopSummonHyperion,Execute` | 目标效果技能 / CAbilEffectTarget | 创建单位效果 / CEffectCreateUnit:`SummonHyperionCreateUnit` | xmraynor:1 |
| `BansheeAirstrike` | `BansheeAirstrike,Execute` | 目标效果技能 / CAbilEffectTarget | 区域枚举效果 / CEffectEnumArea:`BansheeAirstrikeSearch` | xmraynor:1 |
| `BansheeAirstrikeLocked` | `-` | 未解析 / Unresolved | - | - |
| `BuildInProgress` | `BuildInProgress,Cancel` | 未解析 / Unresolved | - | - |

## 建筑 / Buildings

### `BarracksRaynor`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，官方ID / Official ID Barracks，状态 / Status alias，模块 / Module XMRaynor.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：种族 / Race Terr
- Catalog 技能链接 / Catalog ability links：`BarracksTrainRaynor`(训练技能 / CAbilTrain)
- 可生产/创建 / Produced or created：`FirebatRaynor`、`MarauderRaynor`、`MarineRaynor`、`MedicRaynor`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | `BarracksTrainRaynor` | `BarracksTrainRaynor,Train1` | 训练技能 / CAbilTrain | `MarineRaynor`、单位 / Unit:`MarineRaynor` | - | - |
| 0,1 | `BarracksTrainRaynor` | `BarracksTrainRaynor,Train4` | 训练技能 / CAbilTrain | `MarauderRaynor`、单位 / Unit:`MarauderRaynor` | - | - |
| 0,2 | `BarracksTrainRaynor` | `BarracksTrainRaynor,Train6` | 训练技能 / CAbilTrain | `FirebatRaynor`、单位 / Unit:`FirebatRaynor` | - | - |
| 0,3 | `BarracksTrainRaynor` | `BarracksTrainRaynor,Train5` | 训练技能 / CAbilTrain | `MedicRaynor`、单位 / Unit:`MedicRaynor` | - | - |

### `SupplyDepotRaynor`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，官方ID / Official ID SupplyDepot，状态 / Status alias，模块 / Module XMRaynor.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：种族 / Race Terr
- Catalog 技能链接 / Catalog ability links：无 / None

- 面板技能 / Panel skills：无 / None

### `BunkerRaynor`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，官方ID / Official ID Bunker，状态 / Status alias，模块 / Module XMRaynor.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：种族 / Race Terr
- Catalog 技能链接 / Catalog ability links：无 / None

- 面板技能 / Panel skills：无 / None

### `MissileTurretRaynor`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，官方ID / Official ID MissileTurret，状态 / Status alias，模块 / Module XMRaynor.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：种族 / Race Terr
- Catalog 技能链接 / Catalog ability links：无 / None

- 面板技能 / Panel skills：无 / None

### `CommandCenterRaynor`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，官方ID / Official ID CommandCenter，状态 / Status alias，模块 / Module XMRaynor.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：种族 / Race Terr
- Catalog 技能链接 / Catalog ability links：`CommandCenterTrainRaynor`(训练技能 / CAbilTrain)、`UpgradeToOrbitalRaynor`(变形技能 / CAbilMorph)
- 可生产/创建 / Produced or created：`SCVRaynor`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 0,0 | `CommandCenterTrainRaynor` | `CommandCenterTrainRaynor,Train1` | 训练技能 / CAbilTrain | `SCVRaynor`、单位 / Unit:`SCVRaynor` | - | - |
| 2,0 | `UpgradeToOrbitalRaynor` | `UpgradeToOrbitalRaynor,Execute` | 变形技能 / CAbilMorph | - | - | - |

### `OrbitalCommandRaynor`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderBuildings.galaxy，官方ID / Official ID OrbitalCommand，状态 / Status alias，模块 / Module XMRaynor.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：种族 / Race Terr
- Catalog 技能链接 / Catalog ability links：`CommandCenterTrainRaynor`(训练技能 / CAbilTrain)、`OrbitalCommandSupplyDepotDropRaynor`(建造技能 / CAbilBuild)
- 可生产/创建 / Produced or created：`SCVRaynor`、`SupplyDepotRaynor`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| - | `OrbitalCommandSupplyDepotDropRaynor` | `OrbitalCommandSupplyDepotDropRaynor,Build1` | 建造技能 / CAbilBuild | `SupplyDepotRaynor`、单位 / Unit:`SupplyDepotRaynor` | - | - |
| 0,0 | `CommandCenterTrainRaynor` | `CommandCenterTrainRaynor,Train1` | 训练技能 / CAbilTrain | `SCVRaynor`、单位 / Unit:`SCVRaynor` | - | - |

## 生产链补充建筑 / Production-support Buildings

- 无 / None

## 单位 / Units

### `MarineRaynor`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，官方ID / Official ID Marine，状态 / Status alias，模块 / Module XMRaynor.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：种族 / Race Terr
- Catalog 技能链接 / Catalog ability links：无 / None

- 面板技能 / Panel skills：无 / None

### `MedicRaynor`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，官方ID / Official ID Medic，状态 / Status alias，模块 / Module XMRaynor.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：种族 / Race Terr
- Catalog 技能链接 / Catalog ability links：无 / None

- 面板技能 / Panel skills：无 / None

### `VultureRaynor`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，官方ID / Official ID Vulture，状态 / Status alias，模块 / Module XMRaynor.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：种族 / Race Terr
- Catalog 技能链接 / Catalog ability links：无 / None

- 面板技能 / Panel skills：无 / None

### `FirebatRaynor`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，官方ID / Official ID Firebat，状态 / Status alias，模块 / Module XMRaynor.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：种族 / Race Terr
- Catalog 技能链接 / Catalog ability links：无 / None

- 面板技能 / Panel skills：无 / None

### `SCVRaynor`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，官方ID / Official ID SCV，状态 / Status alias，模块 / Module XMRaynor.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：种族 / Race Terr
- Catalog 技能链接 / Catalog ability links：`TerranBuildRaynor`(建造技能 / CAbilBuild)
- 可生产/创建 / Produced or created：`ArmoryRaynor`（非本指挥官名册 / not in current commander roster）、`BarracksRaynor`、`BunkerRaynor`、`CommandCenterRaynor`、`EngineeringBayRaynor`（非本指挥官名册 / not in current commander roster）、`FactoryRaynor`（非本指挥官名册 / not in current commander roster）、`FusionCoreRaynor`（非本指挥官名册 / not in current commander roster）、`MissileTurretRaynor`、`RefineryRaynor`（非本指挥官名册 / not in current commander roster）、`SensorTowerRaynor`（非本指挥官名册 / not in current commander roster）、`StarportRaynor`（非本指挥官名册 / not in current commander roster）、`SupplyDepotRaynor`
- 已隐藏基础按钮 / Hidden basic buttons：3 个（用 `--include-basic` 可展开 / use `--include-basic` to expand）

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | `TerranBuild` | `-` | 未解析 / Unresolved | - | - | - |
| 2,1 | `TerranBuildAdvanced` | `-` | 未解析 / Unresolved | - | - | - |
| 0,0 | `TerranBuildRaynor` | `TerranBuildRaynor,Build1` | 建造技能 / CAbilBuild | `CommandCenterRaynor`、单位 / Unit:`CommandCenterRaynor` | - | - |
| 0,1 | `TerranBuildRaynor` | `TerranBuildRaynor,Build3` | 建造技能 / CAbilBuild | `RefineryRaynor`、单位 / Unit:`RefineryRaynor` | - | - |
| 0,2 | `TerranBuildRaynor` | `TerranBuildRaynor,Build2` | 建造技能 / CAbilBuild | `SupplyDepotRaynor`、单位 / Unit:`SupplyDepotRaynor` | - | - |
| 1,0 | `TerranBuildRaynor` | `TerranBuildRaynor,Build4` | 建造技能 / CAbilBuild | `BarracksRaynor`、单位 / Unit:`BarracksRaynor` | - | - |
| 1,1 | `TerranBuildRaynor` | `TerranBuildRaynor,Build5` | 建造技能 / CAbilBuild | `EngineeringBayRaynor`、单位 / Unit:`EngineeringBayRaynor` | - | - |
| 2,0 | `TerranBuildRaynor` | `TerranBuildRaynor,Build7` | 建造技能 / CAbilBuild | `BunkerRaynor`、单位 / Unit:`BunkerRaynor` | - | - |
| 2,1 | `TerranBuildRaynor` | `TerranBuildRaynor,Build6` | 建造技能 / CAbilBuild | `MissileTurretRaynor`、单位 / Unit:`MissileTurretRaynor` | - | - |
| 2,2 | `TerranBuildRaynor` | `TerranBuildRaynor,Build9` | 建造技能 / CAbilBuild | `SensorTowerRaynor`、单位 / Unit:`SensorTowerRaynor` | - | - |
| 1,0 | `TerranBuildRaynor` | `TerranBuildRaynor,Build11` | 建造技能 / CAbilBuild | `FactoryRaynor`、单位 / Unit:`FactoryRaynor` | - | - |
| 1,1 | `TerranBuildRaynor` | `TerranBuildRaynor,Build14` | 建造技能 / CAbilBuild | `ArmoryRaynor`、单位 / Unit:`ArmoryRaynor` | - | - |
| 2,0 | `TerranBuildRaynor` | `TerranBuildRaynor,Build12` | 建造技能 / CAbilBuild | `StarportRaynor`、单位 / Unit:`StarportRaynor` | - | - |
| 2,1 | `TerranBuildRaynor` | `TerranBuildRaynor,Build16` | 建造技能 / CAbilBuild | `FusionCoreRaynor`、单位 / Unit:`FusionCoreRaynor` | - | - |

### `VikingRaynor`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，官方ID / Official ID Viking，状态 / Status alias，模块 / Module XMRaynor.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：种族 / Race Terr
- Catalog 技能链接 / Catalog ability links：`AssaultModeRaynor`(变形技能 / CAbilMorph)
- 可生产/创建 / Produced or created：`VikingAssaultRaynor`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,1 | `AssaultModeRaynor` | `AssaultModeRaynor,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:`VikingAssaultRaynor` | - | - |

### `BansheeRaynor`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，官方ID / Official ID Banshee，状态 / Status alias，模块 / Module XMRaynor.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：种族 / Race Terr
- Catalog 技能链接 / Catalog ability links：无 / None

- 面板技能 / Panel skills：无 / None

### `MarauderRaynor`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，官方ID / Official ID Marauder，状态 / Status alias，模块 / Module XMRaynor.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：种族 / Race Terr
- Catalog 技能链接 / Catalog ability links：无 / None

- 面板技能 / Panel skills：无 / None

### `BattlecruiserRaynor`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，官方ID / Official ID Battlecruiser，状态 / Status alias，模块 / Module XMRaynor.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：种族 / Race Terr
- Catalog 技能链接 / Catalog ability links：无 / None

- 面板技能 / Panel skills：无 / None

### `SiegeTankRaynor`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，官方ID / Official ID SiegeTank，状态 / Status alias，模块 / Module XMRaynor.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：种族 / Race Terr
- Catalog 技能链接 / Catalog ability links：`SiegeModeRaynor`(变形技能 / CAbilMorph)
- 可生产/创建 / Produced or created：`SiegeTankSiegedRaynor`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | `SiegeModeRaynor` | `SiegeModeRaynor,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:`SiegeTankSiegedRaynor` | - | - |

### `VikingAssaultRaynor`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，官方ID / Official ID VikingAssault，状态 / Status alias，模块 / Module XMRaynor.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：种族 / Race Terr
- Catalog 技能链接 / Catalog ability links：`FighterModeRaynor`(变形技能 / CAbilMorph)
- 可生产/创建 / Produced or created：`VikingRaynor`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,0 | `FighterModeRaynor` | `FighterModeRaynor,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:`VikingRaynor` | - | - |

### `SiegeTankSiegedRaynor`

- 来源 / Source：名册 / Roster XMFinal CommanderRuntimeRoster + XMFinal CommanderRosters.galaxy，官方ID / Official ID SiegeTankSieged，状态 / Status alias，模块 / Module XMRaynor.SC2Mod，文件 / File `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData/UserData.xml`
- 数值 / Stats：种族 / Race Terr
- Catalog 技能链接 / Catalog ability links：`UnsiegeRaynor`(变形技能 / CAbilMorph)
- 可生产/创建 / Produced or created：`SiegeTankRaynor`

| 位置 / Slot | 面板按钮 / Panel Button | Ability/Cmd | 类型 / Type | 生产/研究目标 / Production or Research Target | 效果引用 / Effect References | 需求 / Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| 2,1 | `UnsiegeRaynor` | `UnsiegeRaynor,Execute` | 变形技能 / CAbilMorph | 单位 / Unit:`SiegeTankRaynor` | - | - |

## 英雄 / Heroes

- 无 / None
