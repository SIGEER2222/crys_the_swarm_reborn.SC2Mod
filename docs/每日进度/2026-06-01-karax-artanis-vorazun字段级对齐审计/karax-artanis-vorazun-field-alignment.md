# Karax / Artanis / Vorazun 字段级对齐审计

- 生成时间：2026/6/4 17:33:31
- 目的：补充现有 ID 缺口脚本的盲区，按“网上资料里的兵种技能/被动、建筑、顶部技能面板”做静态对齐审计。
- 口径：兵种技能/被动以仓内官方 `units.json` 为机器可读来源，并补入 StarCraft2Coop 页面明确列出的 Combat Units / Structures 漏项；在线主清单作为必须覆盖的子集，Observer 等支援/扩展项作为 supplemental 透明列出；非单位按钮承载的技能/被动以 `global_refs` 证明当前 Mod 全局 Catalog/脚本存在；建筑按 roster/catalog 存在性核对；顶部面板按当前 XMFinal caster command card 精确核对。
- 说明：`global-only` 表示技能按钮 ID 在当前 Mod 全局存在，但没有在候选单位的显式 LayoutButtons 中出现，可能来自父级继承、别名单位或待人工判断，不直接当作硬缺口。
- 说明：`global_refs` 表示在线技能/被动不是单位命令卡按钮本体，而是以升级、研究按钮、需求或测试台科技检查等全局 Catalog/脚本证据落地；其中标记为 unit-card / ability / passive requirement 的项还会额外要求出现在候选单位卡 LayoutButtons 的 Requirements 上。
- 注意：本报告是静态字段审计，不替代 SC2 实机验证。

## 总览

| 指挥官 | 在线资料 | 单位审计 | 在线主单位 | 建筑审计 | 在线主建筑 | 兵种技能硬问题 | global-only 提醒 | 全局证据 | 全局证据缺失 | 单位卡Req | 单位卡Req缺失 | 建筑问题 | 建筑数值问题 | 顶部面板问题 | 问题类型 |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| Karax | https://starcraft2coop.com/commanders/karax | 8 | 6 | 6 | 3 | 0 | 0 | 10 | 0 | 3 | 0 | 0 | 0 | 0 | 无 |
| Artanis | https://starcraft2coop.com/commanders/artanis | 9 | 8 | 5 | 0 | 0 | 0 | 6 | 0 | 2 | 0 | 0 | 0 | 0 | 无 |
| Vorazun | https://starcraft2coop.com/commanders/vorazun | 8 | 7 | 3 | 0 | 0 | 0 | 38 | 0 | 9 | 0 | 0 | 0 | 0 | 无 |

## Karax

- 模块：`XMKarax.SC2Mod`
- 在线资料：https://starcraft2coop.com/commanders/karax
- 单位审计：8（官方 JSON 8，在线补充 5）
- 在线主单位：6，问题 0；supplemental 单位 2
- 建筑审计：6（官方 JSON 5，在线补充 3）
- 在线主建筑：3，问题 0；supplemental 建筑 3
- 兵种技能硬问题：0
- global-only 提醒：0
- 全局技能/被动证据：10，缺失 0
- 单位卡 Requirement 证据：3，缺失 0
- 建筑问题：0
- 建筑数值问题：0
- 顶部面板问题：0

### 顶部面板
- 未发现静态字段问题。

### 兵种技能/被动硬问题
- 未发现硬缺口。

### 在线主单位覆盖
- Sentinel `ZealotPurifier`，resolved=`ZealotPurifier`/`Zealot`，found=`ZealotPurifier`/`Zealot`/`Supplicant`/`AlarakSupplicantWarpTrainDummy`、Energizer `SentryPurifier`，resolved=`SentryPurifier`/`Sentry`，found=`SentryPurifier`、Immortal `ImmortalAiur`，resolved=`ImmortalAiur`/`Immortal`/`RoboticsFacility`，found=`ImmortalAiur`/`Immortal`/`RoboticsFacility`、Colossus `Colossus`，resolved=`Colossus`/`RoboticsBay`/`RoboticsFacility`，found=`Colossus`/`RoboticsFacility`、Mirage `PhoenixPurifier`，resolved=`PhoenixPurifier`/`FleetBeacon`/`Phoenix`/`Stargate`，found=`PhoenixPurifier`/`FleetBeacon`/`Stargate`、Carrier `Carrier`，resolved=`Carrier`/`FleetBeacon`/`Stargate`，found=`Carrier`/`FleetBeacon`/`Stargate`
- supplemental：侦测器 `Observer`、折跃侦察机 `Scout`

### global-only 提醒
- 无。

### 全局技能/被动证据
- 侦察机 `PhoenixPurifier`：Phasing Armor unit-card requirement `HaveMiragePhaseArmor`、Phasing Armor upgrade `MiragePhaseArmor`、Phasing Armor research button `ResearchPhaseArmor`
- 巨像 `Colossus`：Fire Beam unit-card requirement `HaveFireBeam`、Fire Beam upgrade `ColossusFireBeam`、Fire Beam research button `ResearchFireBeam`
- 航母 `Carrier`：Repair Drones upgrade `CarrierRepairDrones`、Repair Drones unit-card requirement `HaveCarrierRepairDrones`、Repair Drones carrier hanger ability `CarrierRepairDroneHanger`、Repair Drones research button `ResearchCarrierRepairDrones`

### 单位卡 Requirement 证据
- 侦察机 `PhoenixPurifier`：Phasing Armor unit-card requirement `HaveMiragePhaseArmor`=(no-face)@?:2
- 巨像 `Colossus`：Fire Beam unit-card requirement `HaveFireBeam`=ColossusPassive@2:2
- 航母 `Carrier`：Repair Drones unit-card requirement `HaveCarrierRepairDrones`=RepairDrones@2:2

### 建筑 roster/catalog
- 未发现硬缺口。

### 在线主建筑覆盖
- Photon Cannon `PhotonCannon`、Khaydarin Monolith `KhaydarinMonolith`、Shield Battery `ShieldBattery`
- supplemental：传送门 `Gateway`、太阳锻炉 `SolarForge`、光影议会 `TwilightCouncil`

### 建筑数值字段
- 光子炮台 `PhotonCannon`：life=150 actual=150 source=online-expectation-fallback、shields=150 actual=150 source=online-expectation-fallback、damage=20 actual=20 source=online-expectation-fallback、range=7 actual=7 source=online-expectation-fallback、speed=1.25 actual=1.25 source=online-expectation-fallback
- 护盾充能器 `ShieldBattery`：life=200 actual=200 source=online-expectation-fallback、shields=200 actual=200 source=online-expectation-fallback、energy=200 actual=200 source=online-expectation-fallback、range=4 actual=4 source=online-expectation-fallback、shield_per_energy=3 actual=3 source=online-expectation-fallback
- Khaydarin Monolith `KhaydarinMonolith`：life=100 actual=100 source=online-expectation-fallback、shields=200 actual=200 source=online-expectation-fallback、damage=100 actual=100 source=online-expectation-fallback、range=13 actual=13 source=online-expectation-fallback、speed=3 actual=3 source=online-expectation-fallback

## Artanis

- 模块：`XMArtanis.SC2Mod`
- 在线资料：https://starcraft2coop.com/commanders/artanis
- 单位审计：9（官方 JSON 7，在线补充 4）
- 在线主单位：8，问题 0；supplemental 单位 1
- 建筑审计：5（官方 JSON 5，在线补充 0）
- 在线主建筑：0，问题 0；supplemental 建筑 5
- 兵种技能硬问题：0
- global-only 提醒：0
- 全局技能/被动证据：6，缺失 0
- 单位卡 Requirement 证据：2，缺失 0
- 建筑问题：0
- 建筑数值问题：0
- 顶部面板问题：0

### 顶部面板
- 未发现静态字段问题。

### 兵种技能/被动硬问题
- 未发现硬缺口。

### 在线主单位覆盖
- Zealot `Zealot`，resolved=`Zealot`，found=`Zealot`/`Supplicant`/`AlarakSupplicantWarpTrainDummy`、Dragoon `StalkerAiur`，resolved=`Dragoon`/`Stalker`，found=`Dragoon`、High Templar `HighTemplar`，resolved=`HighTemplar`/`TemplarArchive`，found=`HighTemplar`/`TemplarArchive`、Archon `Archon`，resolved=`Archon`，found=`Archon`、Immortal `ImmortalAiur`，resolved=`ImmortalAiur`/`Immortal`/`RoboticsFacility`，found=`ImmortalAiur`/`Immortal`/`RoboticsFacility`、Reaver `Reaver`，resolved=`Reaver`，found=`Reaver`、Phoenix `PhoenixAiur`，resolved=`PhoenixAiur`/`FleetBeacon`/`Phoenix`/`Stargate`，found=`PhoenixAiur`/`FleetBeacon`/`Stargate`、Tempest `Tempest`，resolved=`Tempest`，found=`Tempest`
- supplemental：侦测器 `Observer`

### global-only 提醒
- 无。

### 全局技能/被动证据
- 凤凰 `PhoenixAiur`：Double Graviton Beam unit-card requirement `HaveResearchDoubleGravitonBeamPassive`、Double Graviton Beam upgrade `VoidPhoenixDoubleGraviton`、Double Graviton Beam research button `ResearchDoubleGravitonBeam`
- 龙骑士 `StalkerAiur`：Trillic Compression Systems unit-card requirement `HaveDragoonHealth`、Trillic Compression Systems upgrade `StalkerResearchDragoonHealth`、Trillic Compression Systems research button `ResearchDragoonChassis`

### 单位卡 Requirement 证据
- 凤凰 `PhoenixAiur`：Double Graviton Beam unit-card requirement `HaveResearchDoubleGravitonBeamPassive`=(no-face)@?:?
- 龙骑士 `StalkerAiur`：Trillic Compression Systems unit-card requirement `HaveDragoonHealth`=(no-face)@?:2

### 建筑 roster/catalog
- 未发现硬缺口。

### 在线主建筑覆盖
- 该页面没有单独建模的在线主建筑清单。
- supplemental：传送门 `Gateway`、光子炮台 `PhotonCannon`、机械研究所 `RoboticsBay`、折跃机械台 `RoboticsWarpandStarWarpGate`、光影议会 `TwilightCouncil`

### 建筑数值字段
- 无。

## Vorazun

- 模块：`XMVorazun.SC2Mod`
- 在线资料：https://starcraft2coop.com/commanders/vorazun
- 单位审计：8（官方 JSON 7，在线补充 7）
- 在线主单位：7，问题 0；supplemental 单位 1
- 建筑审计：3（官方 JSON 3，在线补充 0）
- 在线主建筑：0，问题 0；supplemental 建筑 3
- 兵种技能硬问题：0
- global-only 提醒：0
- 全局技能/被动证据：38，缺失 0
- 单位卡 Requirement 证据：9，缺失 0
- 建筑问题：0
- 建筑数值问题：0
- 顶部面板问题：0

### 顶部面板
- 未发现静态字段问题。

### 兵种技能/被动硬问题
- 未发现硬缺口。

### 在线主单位覆盖
- Centurion `ZealotShakuras`，resolved=`ZealotShakuras`/`Zealot`，found=`ZealotShakuras`/`Zealot`/`Supplicant`/`AlarakSupplicantWarpTrainDummy`、Stalker `Stalker`，resolved=`Stalker`/`StalkerShakuras`，found=`Stalker`/`StalkerShakuras`、Dark Templar `DarkTemplarShakuras`，resolved=`DarkTemplarShakuras`/`DarkShrine`/`DarkTemplar`，found=`DarkTemplarShakuras`/`DarkShrine`、Dark Archon `DarkArchon`，resolved=`DarkArchon`，found=`DarkArchon`、Corsair `PhoenixShakuras`，resolved=`CorsairMP`/`FleetBeacon`/`Phoenix`/`PhoenixAiur`/`Stargate`，found=`CorsairMP`/`FleetBeacon`/`Stargate`、Void Ray `VoidRay`，resolved=`VoidRay`/`Stargate`，found=`VoidRay`/`Stargate`、Oracle `Oracle`，resolved=`Oracle`，found=`Oracle`
- supplemental：狂热者 `Zealot`

### global-only 提醒
- 无。

### 全局技能/被动证据
- 黑暗圣堂武士 `DarkTemplarShakuras`：Shadow Fury unit-card requirement `HaveResearchShadowFury`、Shadow Fury upgrade `DarkTemplarResearchShadowFury`、Shadow Fury research button `ResearchShadowFury`、Blink ability `DarkTemplarShadowDash`、Blink upgrade `DarkTemplarResearchShadowDash`、Blink research button `ResearchShadowDash`、Void Stasis ability `DarkTemplarVoidStasis`、Void Stasis upgrade `DarkTemplarResearchVoidStasis`、Void Stasis research button `ResearchVoidStasis`
- 先知 `Oracle`：Stealth Drive unit-card requirement `HaveCorsairPermanentCloak`、Stealth Drive upgrade `CorsairPermanentCloak`、Stealth Drive research button `ResearchCorsairPermanentCloak`、Stasis Calibration unit-card requirement `HaveOracleStasisWardUpgrade`、Stasis Calibration upgrade `OracleStasisWardUpgrade`、Stasis Calibration research button `ResearchOracleStasisWardUpgrade`
- 海盗船 `PhoenixShakuras`：Disruption Web ability requirement `HaveCorsairDisruptionWeb`、Disruption Web upgrade `CorsairDisruptionWeb`、Disruption Web research button `ResearchCorsairDisruptionWeb`、Stealth Drive unit-card requirement `HaveCorsairPermanentCloak`、Stealth Drive upgrade `CorsairPermanentCloak`、Stealth Drive research button `ResearchCorsairPermanentCloak`
- 百夫长 `ZealotShakuras`：Shadow Charge upgrade package `VoidZealotShadowCharge`、Darkcoil upgrade `ZealotResearchShadowStun`、Darkcoil research button `ResearchShadowStun`
- 追猎者 `Stalker`：Vorazun Stalker trained unit `StalkerShakuras`、Phase Reactor unit-card requirement `HaveVoidStalkerBlinkShieldRestore`、Phase Reactor passive requirement `HaveBlinkShieldRestore`、Phase Reactor upgrade `StalkerResearchBlinkShieldRestore`、Phase Reactor research button `ResearchBlinkShieldRestore`
- 虚空辉光舰 `VoidRay`：Prismatic Range research requirement `LearnVoidRayPrismaticRange`、Prismatic Range upgrade `VoidRayPrismaticRange`、Prismatic Range research button `ResearchVoidRayVoidPrismaticRange`
- Dark Archon `DarkArchon`：Argus Crystal unit-card requirement `HaveDarkArchonFullStartingEnergy`、Argus Crystal upgrade `DarkArchonFullStartingEnergy`、Argus Crystal research button `ResearchDarkArchonFullStartingEnergy`、Mind Control ability requirement `HaveDarkArchonMindControl`、Mind Control upgrade and ability `DarkArchonMindControl`、Mind Control research button `ResearchDarkArchonMindControl`

### 单位卡 Requirement 证据
- 黑暗圣堂武士 `DarkTemplarShakuras`：Shadow Fury unit-card requirement `HaveResearchShadowFury`=VoidDarkTemplarShadowFury@2:0
- 先知 `Oracle`：Stealth Drive unit-card requirement `HaveCorsairPermanentCloak`=PermanentlyCloakedOracle@2:4、Stasis Calibration unit-card requirement `HaveOracleStasisWardUpgrade`=HaveOracleStasisWardUpgrade@2:3
- 海盗船 `PhoenixShakuras`：Disruption Web ability requirement `HaveCorsairDisruptionWeb`=CorsairMPDisruptionWeb@2:0、Stealth Drive unit-card requirement `HaveCorsairPermanentCloak`=PermanentlyCloakedCorsair@2:1
- 追猎者 `Stalker`：Phase Reactor unit-card requirement `HaveVoidStalkerBlinkShieldRestore`=StalkerPassive@1:0、Phase Reactor passive requirement `HaveBlinkShieldRestore`=BlinkShieldRestoreUpgrade@2:1/BlinkShieldRestoreUpgrade@2:1
- Dark Archon `DarkArchon`：Argus Crystal unit-card requirement `HaveDarkArchonFullStartingEnergy`=HaveDarkArchonFullStartingEnergy@2:2、Mind Control ability requirement `HaveDarkArchonMindControl`=DarkArchonMindControl@2:1

### 建筑 roster/catalog
- 未发现硬缺口。

### 在线主建筑覆盖
- 该页面没有单独建模的在线主建筑清单。
- supplemental：传送门 `Gateway`、光子炮台 `PhotonCannon`、光影议会 `TwilightCouncil`

### 建筑数值字段
- 无。
