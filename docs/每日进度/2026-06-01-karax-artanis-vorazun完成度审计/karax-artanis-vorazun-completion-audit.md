# Karax / Artanis / Vorazun 完成度审计

- 生成时间：2026/6/1 17:11:30
- 目标：为“兵种及技能/被动、建筑、顶部技能面板与在线指挥官资料一致”提供可复核的静态完成度矩阵。
- 范围：本报告使用仓内官方合作指挥官数据、字段级审计报告、官方-vs-Mod 缺口报告，以及 StarCraft2Coop 在线资料入口。
- 说明：本机无 SC2 测试环境，本报告只证明静态数据层对齐，不替代实机运行。

## 总览

| 指挥官 | 状态 | 单位 | 建筑 | 顶部面板按钮 | 在线资料 |
| --- | --- | ---: | ---: | ---: | --- |
| Karax | PASS | 8 | 5 | 3 | https://starcraft2coop.com/commanders/karax.php |
| Artanis | PASS | 7 | 5 | 3 | https://starcraft2coop.com/commanders/artanis |
| Vorazun | PASS | 7 | 3 | 5 | https://starcraft2coop.com/commanders/vorazun |

## Karax

- 模块：`XMKarax.SC2Mod`
- 单位：ImmortalAiur、Observer、PhoenixPurifier、Scout、SentryPurifier、ZealotPurifier、Colossus、Carrier
- 建筑：Gateway、PhotonCannon、ShieldBattery、SolarForge、TwilightCouncil
- 顶部面板：SOAOrbitalStrikeKarax、SOAThermalLance、SOAMapWideChrono

| 检查项 | 状态 | 证据 |
| --- | --- | --- |
| 存在可人工复核的 StarCraft2Coop 在线资料入口 | PASS | https://starcraft2coop.com/commanders/karax.php |
| 官方合作指挥官数据到当前 Mod 的静态缺口总数为 0 | PASS | total_missing=0 |
| 官方 units.json 中的兵种均进入字段级单位审计 | PASS | 8/8 |
| 兵种技能/被动不存在硬缺口或字段不匹配 | PASS | unit_skill_issues=0 |
| 兵种技能/被动不再依赖 global-only 提醒项 | PASS | global_only=0 |
| 官方 buildings.json 中的建筑均进入字段级建筑审计 | PASS | 5/5 |
| 建筑 roster/catalog 不存在静态缺口 | PASS | building_issues=0 |
| 顶部技能面板按钮字段全部匹配预期 | PASS | top_panel_issues=0 |

## Artanis

- 模块：`XMArtanis.SC2Mod`
- 单位：Archon、ImmortalAiur、Observer、PhoenixAiur、StalkerAiur、Zealot、HighTemplar
- 建筑：Gateway、PhotonCannon、RoboticsBay、RoboticsWarpandStarWarpGate、TwilightCouncil
- 顶部面板：SOAPylonPower、SOAOrbitalStrike、SOASuperShield

| 检查项 | 状态 | 证据 |
| --- | --- | --- |
| 存在可人工复核的 StarCraft2Coop 在线资料入口 | PASS | https://starcraft2coop.com/commanders/artanis |
| 官方合作指挥官数据到当前 Mod 的静态缺口总数为 0 | PASS | total_missing=0 |
| 官方 units.json 中的兵种均进入字段级单位审计 | PASS | 7/7 |
| 兵种技能/被动不存在硬缺口或字段不匹配 | PASS | unit_skill_issues=0 |
| 兵种技能/被动不再依赖 global-only 提醒项 | PASS | global_only=0 |
| 官方 buildings.json 中的建筑均进入字段级建筑审计 | PASS | 5/5 |
| 建筑 roster/catalog 不存在静态缺口 | PASS | building_issues=0 |
| 顶部技能面板按钮字段全部匹配预期 | PASS | top_panel_issues=0 |

## Vorazun

- 模块：`XMVorazun.SC2Mod`
- 单位：DarkTemplarShakuras、Oracle、PhoenixShakuras、Zealot、ZealotShakuras、Stalker、VoidRay
- 建筑：Gateway、PhotonCannon、TwilightCouncil
- 顶部面板：SOADarkPylon、SOAVorazunBlackHole、SOAShadowGuardCalldown、SOATimeFreeze、RecallOnDeathPassive

| 检查项 | 状态 | 证据 |
| --- | --- | --- |
| 存在可人工复核的 StarCraft2Coop 在线资料入口 | PASS | https://starcraft2coop.com/commanders/vorazun |
| 官方合作指挥官数据到当前 Mod 的静态缺口总数为 0 | PASS | total_missing=0 |
| 官方 units.json 中的兵种均进入字段级单位审计 | PASS | 7/7 |
| 兵种技能/被动不存在硬缺口或字段不匹配 | PASS | unit_skill_issues=0 |
| 兵种技能/被动不再依赖 global-only 提醒项 | PASS | global_only=0 |
| 官方 buildings.json 中的建筑均进入字段级建筑审计 | PASS | 3/3 |
| 建筑 roster/catalog 不存在静态缺口 | PASS | building_issues=0 |
| 顶部技能面板按钮字段全部匹配预期 | PASS | top_panel_issues=0 |
