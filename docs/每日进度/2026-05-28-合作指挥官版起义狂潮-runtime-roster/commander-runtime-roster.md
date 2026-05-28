# 合作指挥官版起义狂潮 runtime roster 映射

- 生成时间：2026/5/28 22:45:36
- 生成脚本：`scripts/sc2/generate-runtime-commander-roster.mjs`
- 目标 Mod：`C:\Users\22448\Downloads\重生虫心0.71汉化版（新）\reborn_workrepo\合作指挥官版起义狂潮`
- 目标 UserData：`C:\Users\22448\Downloads\重生虫心0.71汉化版（新）\reborn_workrepo\合作指挥官版起义狂潮\Mods\XM\XMFinal.SC2Mod\Base.SC2Data\GameData\UserData.xml`
- 口径：只读取官方 `heroes.json` / `units.json` / `buildings.json`，不把 command card 的单位/建筑噪声当 roster。
- `exact/shared-exact/resolved/alias` 可作为运行时工厂候选；`state-only` 为埋地态/架设态/中间态，仅保留映射，不应作为最终 roster 输出；`external-only/unresolved` 需要人工确认后再接初始化器或测试台。

## 汇总

| 指挥官 | 运行时 | 模块 | 总数 | exact | shared-exact | resolved | alias | state-only | external-only | unresolved |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Abathur | Abathur | `XMAbathur.SC2Mod` | 14 | 9 | 0 | 0 | 0 | 5 | 0 | 0 |
| Alarak | Alarak | `XMAlarak.SC2Mod` | 10 | 8 | 2 | 0 | 0 | 0 | 0 | 0 |
| Artanis | Artanis | `XMArtanis.SC2Mod` | 12 | 12 | 0 | 0 | 0 | 0 | 0 | 0 |
| Dehaka | Dehaka | `XMDehaka.SC2Mod` | 25 | 25 | 0 | 0 | 0 | 0 | 0 | 0 |
| Fenix | Fenix | `XMFenix.SC2Mod` | 12 | 12 | 0 | 0 | 0 | 0 | 0 | 0 |
| Horner | Mira | `XMMira.SC2Mod` | 10 | 0 | 0 | 0 | 9 | 1 | 0 | 0 |
| Karax | Karax | `XMKarax.SC2Mod` | 13 | 11 | 1 | 1 | 0 | 0 | 0 | 0 |
| Kerrigan | Kerrigan | `XMKerrigan.SC2Mod` | 10 | 6 | 3 | 1 | 0 | 0 | 0 | 0 |
| Mengsk | Mengsk | `XMMengsk.SC2Mod` | 27 | 24 | 0 | 0 | 0 | 3 | 0 | 0 |
| Nova | Nova | `XMNova.SC2Mod` | 16 | 9 | 1 | 2 | 4 | 0 | 0 | 0 |
| Raynor | Raynor | `XMRaynor.SC2Mod` | 16 | 16 | 0 | 0 | 0 | 0 | 0 | 0 |
| Stetmann | Stetmann | `XMStetmann.SC2Mod` | 34 | 30 | 0 | 0 | 0 | 4 | 0 | 0 |
| Stukov | Stukov | `XMStukov.SC2Mod` | 15 | 15 | 0 | 0 | 0 | 0 | 0 | 0 |
| Swann | Swann | `XMSwann.SC2Mod` | 15 | 1 | 2 | 0 | 11 | 0 | 1 | 0 |
| Tychus | Tychus | `XMTychus.SC2Mod` | 14 | 13 | 1 | 0 | 0 | 0 | 0 | 0 |
| Vorazun | Vorazun | `XMVorazun.SC2Mod` | 10 | 6 | 4 | 0 | 0 | 0 | 0 | 0 |
| Zagara | Zagara | `XMZagara.SC2Mod` | 9 | 4 | 4 | 1 | 0 | 0 | 0 | 0 |
| Zeratul | Zeratul | `XMZeratul.SC2Mod` | 12 | 12 | 0 | 0 | 0 | 0 | 0 | 0 |

## Abathur

- 运行时实例：`Abathur`
- 模块：`XMAbathur.SC2Mod`

| 类型 | 官方 ID | Runtime ID | 状态 | 来源模块 | 备注 |
| --- | --- | --- | --- | --- | --- |
| unit | `GuardianMP` | `GuardianMP` | state-only | `XMAbathur.SC2Mod` | state-only runtime state variant; keep out of final roster output |
| unit | `DevourerMP` | `Devourer` | state-only | `XMAbathur.SC2Mod` | state-only runtime state variant; keep out of final roster output |
| unit | `Roach` | `Roach` | state-only | `XMAbathur.SC2Mod` | state-only runtime state variant; keep out of final roster output |
| unit | `RoachCorpser` | `RoachCorpser` | state-only | `XMAbathur.SC2Mod` | state-only runtime state variant; keep out of final roster output |
| unit | `RoachVile` | `RoachVile` | state-only | `XMAbathur.SC2Mod` | state-only runtime state variant; keep out of final roster output |

## Alarak

- 运行时实例：`Alarak`
- 模块：`XMAlarak.SC2Mod`

| 类型 | 官方 ID | Runtime ID | 状态 | 来源模块 | 备注 |
| --- | --- | --- | --- | --- | --- |
| unit | `Stalker` | `Stalker` | shared-exact | `XMAbathur.SC2Mod,XMAbathurReborn.SC2Mod` | shared runtime unit from common imported pool |
| building | `PhotonCannon` | `PhotonCannon` | shared-exact | `XMAbathur.SC2Mod,XMAbathurReborn.SC2Mod,XMArtanis.SC2Mod,XMFenix.SC2Mod,XMKarax.SC2Mod,XMKerrigan.SC2Mod,XMRaynor.SC2Mod,XMVorazun.SC2Mod,XMZagara.SC2Mod,XMZeratul.SC2Mod` | shared runtime unit from common imported pool |

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
| unit | `HHHellionTank` | `HellionTankMira` | state-only | `XMMira.SC2Mod` | state-only runtime state variant; keep out of final roster output |
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
| unit | `SentryPurifier` | `SentryPurifier` | shared-exact | `XMAbathur.SC2Mod,XMAbathurReborn.SC2Mod,XMFenix.SC2Mod` | shared runtime unit from common imported pool |

## Kerrigan

- 运行时实例：`Kerrigan`
- 模块：`XMKerrigan.SC2Mod`

| 类型 | 官方 ID | Runtime ID | 状态 | 来源模块 | 备注 |
| --- | --- | --- | --- | --- | --- |
| unit | `BroodLord` | `BroodLord` | shared-exact | `XMAbathur.SC2Mod,XMAbathurReborn.SC2Mod` | shared runtime unit from common imported pool |
| unit | `SwarmQueen` | `Queen` | resolved | `XMKerrigan.SC2Mod` | resolved |
| building | `SpineCrawler` | `SpineCrawler` | shared-exact | `XMAbathur.SC2Mod,XMAbathurReborn.SC2Mod,XMFenix.SC2Mod` | shared runtime unit from common imported pool |
| building | `SporeCrawler` | `SporeCrawler` | shared-exact | `XMAbathur.SC2Mod,XMAbathurReborn.SC2Mod` | shared runtime unit from common imported pool |

## Mengsk

- 运行时实例：`Mengsk`
- 模块：`XMMengsk.SC2Mod`

| 类型 | 官方 ID | Runtime ID | 状态 | 来源模块 | 备注 |
| --- | --- | --- | --- | --- | --- |
| unit | `SiegeTankMengskSieged` | `SiegeTankMengskSieged` | state-only | `XMMengsk.SC2Mod` | state-only runtime state variant; keep out of final roster output |
| unit | `VikingMengskAssault` | `VikingMengskAssault` | state-only | `XMMengsk.SC2Mod` | state-only runtime state variant; keep out of final roster output |
| unit | `RavenMengskSieged` | `RavenMengskSieged` | state-only | `XMMengsk.SC2Mod` | state-only runtime state variant; keep out of final roster output |

## Nova

- 运行时实例：`Nova`
- 模块：`XMNova.SC2Mod`

| 类型 | 官方 ID | Runtime ID | 状态 | 来源模块 | 备注 |
| --- | --- | --- | --- | --- | --- |
| unit | `GhostNova` | `GhostFemale_BlackOps` | resolved | `XMNova.SC2Mod` | resolved |
| unit | `MercReaper` | `MercReaper` | shared-exact | `XMZagara.SC2Mod` | shared runtime unit from common imported pool |
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

| 类型 | 官方 ID | Runtime ID | 状态 | 来源模块 | 备注 |
| --- | --- | --- | --- | --- | --- |
| unit | `LurkerStetmannBurrowed` | `LurkerStetmannBurrowed` | state-only | `XMStetmann.SC2Mod` | state-only runtime state variant; keep out of final roster output |
| unit | `OverseerStetmannSiegeMode` | `OverseerStetmannSiegeMode` | state-only | `XMStetmann.SC2Mod` | state-only runtime state variant; keep out of final roster output |
| building | `SpineCrawlerUprootedStetmann` | `SpineCrawlerUprootedStetmann` | state-only | `XMStetmann.SC2Mod` | state-only runtime state variant; keep out of final roster output |
| building | `SporeCrawlerUprootedStetmann` | `SporeCrawlerUprootedStetmann` | state-only | `XMStetmann.SC2Mod` | state-only runtime state variant; keep out of final roster output |

## Stukov

- 运行时实例：`Stukov`
- 模块：`XMStukov.SC2Mod`
- 非精确映射：无

## Swann

- 运行时实例：`Swann`
- 模块：`XMSwann.SC2Mod`

| 类型 | 官方 ID | Runtime ID | 状态 | 来源模块 | 备注 |
| --- | --- | --- | --- | --- | --- |
| unit | `Cyclone` | `Cyclone` | shared-exact | `XMAbathur.SC2Mod,XMAbathurReborn.SC2Mod,XMArtanis.SC2Mod,XMFenix.SC2Mod,XMKarax.SC2Mod,XMKerrigan.SC2Mod,XMRaynor.SC2Mod,XMVorazun.SC2Mod,XMZagara.SC2Mod,XMZeratul.SC2Mod` | shared runtime unit from common imported pool |
| unit | `HellionTank` | `HellionTank` | external-only | `XMAbathur.SC2Mod,XMAbathurReborn.SC2Mod,XMArtanis.SC2Mod,XMFenix.SC2Mod,XMKarax.SC2Mod,XMKerrigan.SC2Mod,XMRaynor.SC2Mod,XMVorazun.SC2Mod,XMZagara.SC2Mod,XMZeratul.SC2Mod` | catalog exists outside commander/shared modules; review before using in runtime factories |
| unit | `Hercules` | `HerculesSwann` | alias | `XMSwann.SC2Mod` | manual-alias |
| unit | `ScienceVessel` | `ScienceVesselSwann` | alias | `XMSwann.SC2Mod` | manual-alias |
| unit | `Hellion` | `Hellion` | shared-exact | `XMAbathur.SC2Mod,XMAbathurReborn.SC2Mod,XMArtanis.SC2Mod,XMFenix.SC2Mod,XMKarax.SC2Mod,XMKerrigan.SC2Mod,XMRaynor.SC2Mod,XMVorazun.SC2Mod,XMZagara.SC2Mod,XMZeratul.SC2Mod` | shared runtime unit from common imported pool |
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
| unit | `Marauder` | `Marauder` | shared-exact | `XMAbathur.SC2Mod,XMAbathurReborn.SC2Mod,XMRaynor.SC2Mod` | shared runtime unit from common imported pool |

## Vorazun

- 运行时实例：`Vorazun`
- 模块：`XMVorazun.SC2Mod`

| 类型 | 官方 ID | Runtime ID | 状态 | 来源模块 | 备注 |
| --- | --- | --- | --- | --- | --- |
| unit | `Oracle` | `Oracle` | shared-exact | `XMAbathur.SC2Mod,XMAbathurReborn.SC2Mod` | shared runtime unit from common imported pool |
| unit | `ZealotShakuras` | `ZealotShakuras` | shared-exact | `XMAbathur.SC2Mod,XMAbathurReborn.SC2Mod` | shared runtime unit from common imported pool |
| unit | `Stalker` | `Stalker` | shared-exact | `XMAbathur.SC2Mod,XMAbathurReborn.SC2Mod` | shared runtime unit from common imported pool |
| unit | `VoidRay` | `VoidRay` | shared-exact | `XMAbathur.SC2Mod,XMAbathurReborn.SC2Mod` | shared runtime unit from common imported pool |

## Zagara

- 运行时实例：`Zagara`
- 模块：`XMZagara.SC2Mod`

| 类型 | 官方 ID | Runtime ID | 状态 | 来源模块 | 备注 |
| --- | --- | --- | --- | --- | --- |
| unit | `Corruptor` | `Corruptor` | shared-exact | `XMAbathur.SC2Mod,XMAbathurReborn.SC2Mod` | shared runtime unit from common imported pool |
| unit | `SwarmQueen` | `Queen` | resolved | `XMZagara.SC2Mod` | resolved |
| unit | `Zergling` | `Zergling` | shared-exact | `XMAbathur.SC2Mod,XMAbathurReborn.SC2Mod,XMKerrigan.SC2Mod` | shared runtime unit from common imported pool |
| building | `SpineCrawler` | `SpineCrawler` | shared-exact | `XMAbathur.SC2Mod,XMAbathurReborn.SC2Mod,XMFenix.SC2Mod` | shared runtime unit from common imported pool |
| building | `SporeCrawler` | `SporeCrawler` | shared-exact | `XMAbathur.SC2Mod,XMAbathurReborn.SC2Mod` | shared runtime unit from common imported pool |

## Zeratul

- 运行时实例：`Zeratul`
- 模块：`XMZeratul.SC2Mod`
- 非精确映射：无

