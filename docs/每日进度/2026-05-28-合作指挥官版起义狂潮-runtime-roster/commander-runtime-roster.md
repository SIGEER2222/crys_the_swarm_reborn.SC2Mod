# 合作指挥官版起义狂潮 runtime roster 映射

- 生成时间：2026/5/28 15:06:53
- 生成脚本：`scripts/sc2/generate-runtime-commander-roster.mjs`
- 目标 Mod：`D:\MyWork\新建文件夹\mom.report.client\src\MyMod\crys_the_swarm_reborn.SC2Mod\合作指挥官版起义狂潮`
- 目标 UserData：`D:\MyWork\新建文件夹\mom.report.client\src\MyMod\crys_the_swarm_reborn.SC2Mod\合作指挥官版起义狂潮\Mods\XM\XMFinal.SC2Mod\Base.SC2Data\GameData\UserData.xml`
- 口径：只读取官方 `heroes.json` / `units.json` / `buildings.json`，不把 command card 的单位/建筑噪声当 roster。
- `exact/resolved/alias` 可作为运行时工厂候选；`external-only/unresolved` 需要人工确认后再接初始化器或测试台。

## 汇总

| 指挥官 | 运行时 | 模块 | 总数 | exact | resolved | alias | external-only | unresolved |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Abathur | Abathur | `XMAbathur.SC2Mod` | 14 | 13 | 1 | 0 | 0 | 0 |
| Alarak | Alarak | `XMAlarak.SC2Mod` | 10 | 8 | 1 | 0 | 1 | 0 |
| Artanis | Artanis | `XMArtanis.SC2Mod` | 12 | 12 | 0 | 0 | 0 | 0 |
| Dehaka | Dehaka | `XMDehaka.SC2Mod` | 25 | 25 | 0 | 0 | 0 | 0 |
| Fenix | Fenix | `XMFenix.SC2Mod` | 12 | 12 | 0 | 0 | 0 | 0 |
| Horner | Mira | `XMMira.SC2Mod` | 10 | 0 | 0 | 10 | 0 | 0 |
| Karax | Karax | `XMKarax.SC2Mod` | 13 | 11 | 1 | 0 | 1 | 0 |
| Kerrigan | Kerrigan | `XMKerrigan.SC2Mod` | 10 | 6 | 1 | 0 | 3 | 0 |
| Mengsk | Mengsk | `XMMengsk.SC2Mod` | 27 | 27 | 0 | 0 | 0 | 0 |
| Nova | Nova | `XMNova.SC2Mod` | 16 | 9 | 2 | 4 | 1 | 0 |
| Raynor | Raynor | `XMRaynor.SC2Mod` | 16 | 16 | 0 | 0 | 0 | 0 |
| Stetmann | Stetmann | `XMStetmann.SC2Mod` | 34 | 34 | 0 | 0 | 0 | 0 |
| Stukov | Stukov | `XMStukov.SC2Mod` | 15 | 13 | 0 | 1 | 1 | 0 |
| Swann | Swann | `XMSwann.SC2Mod` | 15 | 1 | 0 | 11 | 3 | 0 |
| Tychus | Tychus | `XMTychus.SC2Mod` | 14 | 13 | 0 | 0 | 1 | 0 |
| Vorazun | Vorazun | `XMVorazun.SC2Mod` | 10 | 6 | 2 | 0 | 2 | 0 |
| Zagara | Zagara | `XMZagara.SC2Mod` | 9 | 4 | 2 | 0 | 3 | 0 |
| Zeratul | Zeratul | `XMZeratul.SC2Mod` | 12 | 12 | 0 | 0 | 0 | 0 |

## Abathur

- 运行时实例：`Abathur`
- 模块：`XMAbathur.SC2Mod`

| 类型 | 官方 ID | Runtime ID | 状态 | 来源模块 | 备注 |
| --- | --- | --- | --- | --- | --- |
| unit | `DevourerMP` | `Devourer` | resolved | `XMAbathur.SC2Mod` | resolved |

## Alarak

- 运行时实例：`Alarak`
- 模块：`XMAlarak.SC2Mod`

| 类型 | 官方 ID | Runtime ID | 状态 | 来源模块 | 备注 |
| --- | --- | --- | --- | --- | --- |
| unit | `Stalker` | `Stalker` | external-only | `XMAbathur.SC2Mod,XMAbathurReborn.SC2Mod` | catalog exists outside commander/shared modules; review before using in runtime factories |
| building | `PhotonCannon` | `Zealot` | resolved | `XMAlarak.SC2Mod` | resolved |

## Artanis

- 运行时实例：`Artanis`
- 模块：`XMArtanis.SC2Mod`
- 非精确映射：无

## Dehaka

- 运行时实例：`Dehaka`
- 模块：`XMDehaka.SC2Mod`
- 非精确映射：无

## Fenix

- 运行时实例：`Fenix`
- 模块：`XMFenix.SC2Mod`
- 非精确映射：无

## Horner

- 运行时实例：`Mira`
- 模块：`XMMira.SC2Mod`

| 类型 | 官方 ID | Runtime ID | 状态 | 来源模块 | 备注 |
| --- | --- | --- | --- | --- | --- |
| unit | `HHBattlecruiser` | `BattlecruiserMira` | alias | `XMMira.SC2Mod` | manual-alias |
| unit | `HHHellion` | `HellionMira` | alias | `XMMira.SC2Mod` | manual-alias |
| unit | `HHHellionTank` | `HellionTankMira` | alias | `XMMira.SC2Mod` | manual-alias |
| unit | `HHRaven` | `RavenMira` | alias | `XMMira.SC2Mod` | manual-alias |
| unit | `HHReaper` | `ReaperMira` | alias | `XMMira.SC2Mod` | manual-alias |
| unit | `HHVikingFighter` | `VikingFighterMira` | alias | `XMMira.SC2Mod` | manual-alias |
| unit | `HHWidowMine` | `WidowMineMira` | alias | `XMMira.SC2Mod` | manual-alias |
| unit | `HHWraith` | `WraithMira` | alias | `XMMira.SC2Mod` | manual-alias |
| unit | `Predator` | `CycloneMira` | alias | `XMMira.SC2Mod` | manual-alias |
| unit | `Liberator` | `LiberatorMira` | alias | `XMMira.SC2Mod` | manual-alias |

## Karax

- 运行时实例：`Karax`
- 模块：`XMKarax.SC2Mod`

| 类型 | 官方 ID | Runtime ID | 状态 | 来源模块 | 备注 |
| --- | --- | --- | --- | --- | --- |
| unit | `PhoenixPurifier` | `FleetBeacon` | resolved | `XMCore.SC2Mod,XMKarax.SC2Mod` | resolved |
| unit | `SentryPurifier` | `SentryPurifier` | external-only | `XMAbathur.SC2Mod,XMAbathurReborn.SC2Mod,XMFenix.SC2Mod` | catalog exists outside commander/shared modules; review before using in runtime factories |

## Kerrigan

- 运行时实例：`Kerrigan`
- 模块：`XMKerrigan.SC2Mod`

| 类型 | 官方 ID | Runtime ID | 状态 | 来源模块 | 备注 |
| --- | --- | --- | --- | --- | --- |
| unit | `BroodLord` | `BroodLord` | external-only | `XMAbathur.SC2Mod,XMAbathurReborn.SC2Mod` | catalog exists outside commander/shared modules; review before using in runtime factories |
| unit | `SwarmQueen` | `Queen` | resolved | `XMKerrigan.SC2Mod` | resolved |
| building | `SpineCrawler` | `SpineCrawler` | external-only | `XMAbathur.SC2Mod,XMAbathurReborn.SC2Mod,XMFenix.SC2Mod` | catalog exists outside commander/shared modules; review before using in runtime factories |
| building | `SporeCrawler` | `SporeCrawler` | external-only | `XMAbathur.SC2Mod,XMAbathurReborn.SC2Mod` | catalog exists outside commander/shared modules; review before using in runtime factories |

## Mengsk

- 运行时实例：`Mengsk`
- 模块：`XMMengsk.SC2Mod`
- 非精确映射：无

## Nova

- 运行时实例：`Nova`
- 模块：`XMNova.SC2Mod`

| 类型 | 官方 ID | Runtime ID | 状态 | 来源模块 | 备注 |
| --- | --- | --- | --- | --- | --- |
| unit | `GhostNova` | `GhostFemale_BlackOps` | resolved | `XMNova.SC2Mod` | resolved |
| unit | `MercReaper` | `MercReaper` | external-only | `XMZagara.SC2Mod` | catalog exists outside commander/shared modules; review before using in runtime factories |
| unit | `SCV` | `SCVNova` | alias | `XMNova.SC2Mod` | manual-alias |
| building | `Barracks` | `BarracksNova` | alias | `XMNova.SC2Mod` | manual-alias |
| building | `AutoTurret` | `NovaACLaserTurret` | resolved | `XMNova.SC2Mod` | resolved |
| building | `MissileTurret` | `MissileTurretNova` | alias | `XMNova.SC2Mod` | manual-alias |
| building | `CommandCenter` | `CommandCenterNova` | alias | `XMNova.SC2Mod` | manual-alias |

## Raynor

- 运行时实例：`Raynor`
- 模块：`XMRaynor.SC2Mod`
- 非精确映射：无

## Stetmann

- 运行时实例：`Stetmann`
- 模块：`XMStetmann.SC2Mod`
- 非精确映射：无

## Stukov

- 运行时实例：`Stukov`
- 模块：`XMStukov.SC2Mod`

| 类型 | 官方 ID | Runtime ID | 状态 | 来源模块 | 备注 |
| --- | --- | --- | --- | --- | --- |
| unit | `SwarmQueen` | `SIQueen` | alias | `XMStukov.SC2Mod` | manual-alias |
| unit | `Zergling` | `Zergling` | external-only | `XMAbathur.SC2Mod,XMAbathurReborn.SC2Mod,XMKerrigan.SC2Mod` | catalog exists outside commander/shared modules; review before using in runtime factories |

## Swann

- 运行时实例：`Swann`
- 模块：`XMSwann.SC2Mod`

| 类型 | 官方 ID | Runtime ID | 状态 | 来源模块 | 备注 |
| --- | --- | --- | --- | --- | --- |
| unit | `Cyclone` | `Cyclone` | external-only | `XMAbathur.SC2Mod,XMAbathurReborn.SC2Mod,XMArtanis.SC2Mod,XMFenix.SC2Mod,XMKarax.SC2Mod,XMKerrigan.SC2Mod,XMRaynor.SC2Mod,XMVorazun.SC2Mod,XMZagara.SC2Mod,XMZeratul.SC2Mod` | catalog exists outside commander/shared modules; review before using in runtime factories |
| unit | `HellionTank` | `HellionTank` | external-only | `XMAbathur.SC2Mod,XMAbathurReborn.SC2Mod,XMArtanis.SC2Mod,XMFenix.SC2Mod,XMKarax.SC2Mod,XMKerrigan.SC2Mod,XMRaynor.SC2Mod,XMVorazun.SC2Mod,XMZagara.SC2Mod,XMZeratul.SC2Mod` | catalog exists outside commander/shared modules; review before using in runtime factories |
| unit | `Hercules` | `HerculesSwann` | alias | `XMSwann.SC2Mod` | manual-alias |
| unit | `ScienceVessel` | `ScienceVesselSwann` | alias | `XMSwann.SC2Mod` | manual-alias |
| unit | `Hellion` | `Hellion` | external-only | `XMAbathur.SC2Mod,XMAbathurReborn.SC2Mod,XMArtanis.SC2Mod,XMFenix.SC2Mod,XMKarax.SC2Mod,XMKerrigan.SC2Mod,XMRaynor.SC2Mod,XMVorazun.SC2Mod,XMZagara.SC2Mod,XMZeratul.SC2Mod` | catalog exists outside commander/shared modules; review before using in runtime factories |
| unit | `Wraith` | `WraithSwann` | alias | `XMSwann.SC2Mod` | manual-alias |
| unit | `SCV` | `SCVSwann` | alias | `XMSwann.SC2Mod` | manual-alias |
| unit | `Goliath` | `GoliathSwann` | alias | `XMSwann.SC2Mod` | manual-alias |
| unit | `SiegeTank` | `SiegeTankSwann` | alias | `XMSwann.SC2Mod` | manual-alias |
| building | `SupplyDepot` | `SupplyDepotSwann` | alias | `XMSwann.SC2Mod` | manual-alias |
| building | `KelMorianGrenadeTurret` | `GrenadeTurretSwann` | alias | `XMSwann.SC2Mod` | manual-alias |
| building | `MissileTurret` | `MissileTurretSwann` | alias | `XMSwann.SC2Mod` | manual-alias |
| building | `PerditionTurret` | `PerditionTurretSwann` | alias | `XMSwann.SC2Mod` | manual-alias |
| building | `CommandCenter` | `CommandCenterSwann` | alias | `XMSwann.SC2Mod` | manual-alias |

## Tychus

- 运行时实例：`Tychus`
- 模块：`XMTychus.SC2Mod`

| 类型 | 官方 ID | Runtime ID | 状态 | 来源模块 | 备注 |
| --- | --- | --- | --- | --- | --- |
| unit | `Marauder` | `Marauder` | external-only | `XMAbathur.SC2Mod,XMAbathurReborn.SC2Mod,XMRaynor.SC2Mod` | catalog exists outside commander/shared modules; review before using in runtime factories |

## Vorazun

- 运行时实例：`Vorazun`
- 模块：`XMVorazun.SC2Mod`

| 类型 | 官方 ID | Runtime ID | 状态 | 来源模块 | 备注 |
| --- | --- | --- | --- | --- | --- |
| unit | `Oracle` | `Oracle` | external-only | `XMAbathur.SC2Mod,XMAbathurReborn.SC2Mod` | catalog exists outside commander/shared modules; review before using in runtime factories |
| unit | `ZealotShakuras` | `Zealot` | resolved | `XMVorazun.SC2Mod` | resolved |
| unit | `Stalker` | `Stalker` | external-only | `XMAbathur.SC2Mod,XMAbathurReborn.SC2Mod` | catalog exists outside commander/shared modules; review before using in runtime factories |
| unit | `VoidRay` | `Stargate` | resolved | `XMVorazun.SC2Mod` | resolved |

## Zagara

- 运行时实例：`Zagara`
- 模块：`XMZagara.SC2Mod`

| 类型 | 官方 ID | Runtime ID | 状态 | 来源模块 | 备注 |
| --- | --- | --- | --- | --- | --- |
| unit | `Corruptor` | `Corruptor` | external-only | `XMAbathur.SC2Mod,XMAbathurReborn.SC2Mod` | catalog exists outside commander/shared modules; review before using in runtime factories |
| unit | `SwarmQueen` | `Queen` | resolved | `XMZagara.SC2Mod` | resolved |
| unit | `Zergling` | `SpawningPool` | resolved | `XMZagara.SC2Mod` | resolved |
| building | `SpineCrawler` | `SpineCrawler` | external-only | `XMAbathur.SC2Mod,XMAbathurReborn.SC2Mod,XMFenix.SC2Mod` | catalog exists outside commander/shared modules; review before using in runtime factories |
| building | `SporeCrawler` | `SporeCrawler` | external-only | `XMAbathur.SC2Mod,XMAbathurReborn.SC2Mod` | catalog exists outside commander/shared modules; review before using in runtime factories |

## Zeratul

- 运行时实例：`Zeratul`
- 模块：`XMZeratul.SC2Mod`
- 非精确映射：无

