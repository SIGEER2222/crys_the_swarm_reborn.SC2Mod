# Karax / Artanis / Vorazun 完成度审计

- 生成时间：2026/6/2 13:14:56
- 目标：为“兵种及技能/被动、建筑、顶部技能面板与在线指挥官资料一致”提供可复核的静态完成度矩阵。
- 范围：本报告使用仓内官方合作指挥官数据、字段级审计报告、官方-vs-Mod 缺口报告、当前 Mod 科技链路诊断，以及 StarCraft2Coop 在线资料入口和页面显式补充项。
- 说明：本机无 SC2 测试环境，本报告只证明静态数据层对齐，不替代实机运行。

## 总览

| 指挥官 | 状态 | 单位 | 建筑 | 顶部面板按钮 | 在线资料 |
| --- | --- | ---: | ---: | ---: | --- |
| Karax | PASS | 8 | 6 | 4 | https://starcraft2coop.com/commanders/karax |
| Artanis | PASS | 9 | 5 | 4 | https://starcraft2coop.com/commanders/artanis |
| Vorazun | PASS | 8 | 3 | 5 | https://starcraft2coop.com/commanders/vorazun |

## Karax

- 模块：`XMKarax.SC2Mod`
- 单位口径：8（官方 JSON 8，在线补充 4）
- 在线主单位：6，supplemental 单位：2
- 建筑口径：6（官方 JSON 5，在线补充 3）
- 在线主建筑：3，supplemental 建筑：3
- 当前 Mod 运行名册：单位 8，建筑 6，生产链补充建筑 3，顶部面板 face 12
- 当前 Mod 生产链补充建筑：RoboticsFacility、Stargate、WarpGate
- 当前 Mod 可追踪生产/合体/变形目标：8（Carrier、Colossus、ImmortalAiur、Observer、PhoenixPurifier、Scout、SentryPurifier、ZealotPurifier）
- 单位：ImmortalAiur、Observer、PhoenixPurifier、Scout、SentryPurifier、ZealotPurifier、Colossus、Carrier
- 建筑：Gateway、PhotonCannon、ShieldBattery、SolarForge、TwilightCouncil、KhaydarinMonolith
- 顶部面板：SOAOrbitalStrikeKarax、SOAThermalLance、SOAMapWideChrono、SOAPurifierBeam

| 检查项 | 状态 | 证据 |
| --- | --- | --- |
| 存在可人工复核的 StarCraft2Coop 在线资料入口 | PASS | https://starcraft2coop.com/commanders/karax |
| 官方合作指挥官数据到当前 Mod 的静态缺口总数为 0 | PASS | total_missing=0 |
| 官方 units.json 中的兵种均进入字段级单位审计 | PASS | 8/8 |
| StarCraft2Coop 页面补充的显式兵种也进入字段级单位审计 | PASS | expected_units=8, audited_units=8, online_added=4 |
| StarCraft2Coop Combat Units 主清单均被当前审计覆盖 | PASS | online_primary_units=6, supplemental_units=2, issues=0 |
| 在线主兵种解析 ID 均命中当前 Mod/XMFinal 单位 | PASS | resolved_unit_reports=6, missing=0 |
| 字段级单位口径均能映射到当前 Mod 运行名册单位 | PASS | runtime_units=8, missing=0 |
| 当前 Mod 可追踪生产/合体/变形目标覆盖字段级单位口径 | PASS | produced_unit_ids=Carrier/Colossus/ImmortalAiur/Observer/PhoenixPurifier/Scout/SentryPurifier/ZealotPurifier, missing=0 |
| 当前 Mod 未暴露未解释的额外生产/合体/变形单位 | PASS | extra=0 |
| 兵种技能/被动不存在硬缺口或字段不匹配 | PASS | unit_skill_issues=0 |
| 兵种技能/被动不再依赖 global-only 提醒项 | PASS | global_only=0 |
| 兵种技能/被动全局 Catalog/脚本证据均存在 | PASS | global_refs=10, missing=0 |
| 标记为单位卡的技能/被动 Requirement 均出现在候选单位卡按钮 | PASS | unit_card_requirements=3, missing=0 |
| 官方 buildings.json 中的建筑均进入字段级建筑审计 | PASS | 5/6 |
| StarCraft2Coop 页面补充的显式建筑也进入字段级建筑审计 | PASS | expected_buildings=6, audited_buildings=6, online_added=3 |
| StarCraft2Coop Structures 主清单均被当前审计覆盖 | PASS | online_primary_structures=3, supplemental_buildings=3, issues=0 |
| 建筑 roster/catalog 不存在静态缺口 | PASS | building_issues=0 |
| 字段级建筑口径均能映射到当前 Mod 运行名册建筑 | PASS | runtime_buildings=6, missing=0 |
| 当前 Mod 运行名册未出现未解释的额外建筑 | PASS | extra=0, allowed=0 |
| 建筑 HP/Shield/Energy/Damage/Range/Speed 等在线数值字段不存在静态不匹配 | PASS | building_stat_issues=0 |
| 顶部技能面板按钮字段全部匹配预期 | PASS | top_panel_issues=0 |
| 顶部技能面板预期按钮均出现在当前 Mod runtime 面板 | PASS | runtime_faces=12, missing=0 |
| 当前 Mod runtime 顶部面板未出现未解释的额外按钮 | PASS | extra=0, allowed=CancelBuilding/CommanderPrestigeKaraxChronoFieldLocked/CommanderPrestigeKaraxChronoWaveLocked/PurifierBeamLocked/ReconstructionBeamLocked/SOAChronoPassive/SOAChronoPassiveLocked/SOARepairBeam |
| 当前 Mod 面板未暴露其他指挥官的等级/升级/锁定需求 | PASS | cross_requirements=0 |
| 当前 Mod 面板未暴露其他指挥官专属按钮/命令身份 | PASS | cross_identities=0 |

## Artanis

- 模块：`XMArtanis.SC2Mod`
- 单位口径：9（官方 JSON 7，在线补充 4）
- 在线主单位：8，supplemental 单位：1
- 建筑口径：5（官方 JSON 5，在线补充 0）
- 在线主建筑：0，supplemental 建筑：5
- 当前 Mod 运行名册：单位 9，建筑 5，生产链补充建筑 4，顶部面板 face 11
- 当前 Mod 生产链补充建筑：RoboticsFacility、Stargate、StargateWarp、WarpGate
- 当前 Mod 可追踪生产/合体/变形目标：9（Archon、Dragoon、HighTemplar、ImmortalAiur、Observer、PhoenixAiur、Reaver、Tempest、Zealot）
- 单位：Archon、ImmortalAiur、Observer、PhoenixAiur、StalkerAiur、Zealot、HighTemplar、Tempest、Reaver
- 建筑：Gateway、PhotonCannon、RoboticsBay、RoboticsWarpandStarWarpGate、TwilightCouncil
- 顶部面板：SOAPylonPower、SOAOrbitalStrike、SOASuperShield、SOAStrafeAttack

| 检查项 | 状态 | 证据 |
| --- | --- | --- |
| 存在可人工复核的 StarCraft2Coop 在线资料入口 | PASS | https://starcraft2coop.com/commanders/artanis |
| 官方合作指挥官数据到当前 Mod 的静态缺口总数为 0 | PASS | total_missing=0 |
| 官方 units.json 中的兵种均进入字段级单位审计 | PASS | 7/9 |
| StarCraft2Coop 页面补充的显式兵种也进入字段级单位审计 | PASS | expected_units=9, audited_units=9, online_added=4 |
| StarCraft2Coop Combat Units 主清单均被当前审计覆盖 | PASS | online_primary_units=8, supplemental_units=1, issues=0 |
| 在线主兵种解析 ID 均命中当前 Mod/XMFinal 单位 | PASS | resolved_unit_reports=8, missing=0 |
| 字段级单位口径均能映射到当前 Mod 运行名册单位 | PASS | runtime_units=9, missing=0 |
| 当前 Mod 可追踪生产/合体/变形目标覆盖字段级单位口径 | PASS | produced_unit_ids=Archon/Dragoon/HighTemplar/ImmortalAiur/Observer/PhoenixAiur/Reaver/Tempest/Zealot, missing=0 |
| 当前 Mod 未暴露未解释的额外生产/合体/变形单位 | PASS | extra=0 |
| 兵种技能/被动不存在硬缺口或字段不匹配 | PASS | unit_skill_issues=0 |
| 兵种技能/被动不再依赖 global-only 提醒项 | PASS | global_only=0 |
| 兵种技能/被动全局 Catalog/脚本证据均存在 | PASS | global_refs=6, missing=0 |
| 标记为单位卡的技能/被动 Requirement 均出现在候选单位卡按钮 | PASS | unit_card_requirements=2, missing=0 |
| 官方 buildings.json 中的建筑均进入字段级建筑审计 | PASS | 5/5 |
| StarCraft2Coop 页面补充的显式建筑也进入字段级建筑审计 | PASS | expected_buildings=5, audited_buildings=5, online_added=0 |
| StarCraft2Coop Structures 主清单均被当前审计覆盖 | PASS | online_primary_structures=0, supplemental_buildings=5, issues=0 |
| 建筑 roster/catalog 不存在静态缺口 | PASS | building_issues=0 |
| 字段级建筑口径均能映射到当前 Mod 运行名册建筑 | PASS | runtime_buildings=5, missing=0 |
| 当前 Mod 运行名册未出现未解释的额外建筑 | PASS | extra=0, allowed=0 |
| 建筑 HP/Shield/Energy/Damage/Range/Speed 等在线数值字段不存在静态不匹配 | PASS | building_stat_issues=0 |
| 顶部技能面板按钮字段全部匹配预期 | PASS | top_panel_issues=0 |
| 顶部技能面板预期按钮均出现在当前 Mod runtime 面板 | PASS | runtime_faces=11, missing=0 |
| 当前 Mod runtime 顶部面板未出现未解释的额外按钮 | PASS | extra=0, allowed=CancelBuilding/CommanderPrestigeArtanisGuardianShellLocked/SOAHeroicShield/SOAHeroicShieldLocked/SOAStrafeAttackLocked/SOAWarpTech/WarpHarmonizationLocked |
| 当前 Mod 面板未暴露其他指挥官的等级/升级/锁定需求 | PASS | cross_requirements=0 |
| 当前 Mod 面板未暴露其他指挥官专属按钮/命令身份 | PASS | cross_identities=0 |

## Vorazun

- 模块：`XMVorazun.SC2Mod`
- 单位口径：8（官方 JSON 7，在线补充 7）
- 在线主单位：7，supplemental 单位：1
- 建筑口径：3（官方 JSON 3，在线补充 0）
- 在线主建筑：0，supplemental 建筑：3
- 当前 Mod 运行名册：单位 8，建筑 4，生产链补充建筑 2，顶部面板 face 10
- 当前 Mod 生产链补充建筑：Stargate、WarpGate
- 当前 Mod 可追踪生产/合体/变形目标：8（CorsairMP、DarkArchon、DarkTemplarShakuras、Oracle、Stalker、VoidRay、Zealot、ZealotShakuras）
- 单位：DarkTemplarShakuras、Oracle、PhoenixShakuras、Zealot、ZealotShakuras、Stalker、VoidRay、DarkArchon
- 建筑：Gateway、PhotonCannon、TwilightCouncil
- 顶部面板：SOADarkPylon、SOAVorazunBlackHole、SOAShadowGuardCalldown、SOATimeFreeze、RecallOnDeathPassive

| 检查项 | 状态 | 证据 |
| --- | --- | --- |
| 存在可人工复核的 StarCraft2Coop 在线资料入口 | PASS | https://starcraft2coop.com/commanders/vorazun |
| 官方合作指挥官数据到当前 Mod 的静态缺口总数为 0 | PASS | total_missing=0 |
| 官方 units.json 中的兵种均进入字段级单位审计 | PASS | 7/8 |
| StarCraft2Coop 页面补充的显式兵种也进入字段级单位审计 | PASS | expected_units=8, audited_units=8, online_added=7 |
| StarCraft2Coop Combat Units 主清单均被当前审计覆盖 | PASS | online_primary_units=7, supplemental_units=1, issues=0 |
| 在线主兵种解析 ID 均命中当前 Mod/XMFinal 单位 | PASS | resolved_unit_reports=7, missing=0 |
| 字段级单位口径均能映射到当前 Mod 运行名册单位 | PASS | runtime_units=8, missing=0 |
| 当前 Mod 可追踪生产/合体/变形目标覆盖字段级单位口径 | PASS | produced_unit_ids=CorsairMP/DarkArchon/DarkTemplarShakuras/Oracle/Stalker/VoidRay/Zealot/ZealotShakuras, missing=0 |
| 当前 Mod 未暴露未解释的额外生产/合体/变形单位 | PASS | extra=0 |
| 兵种技能/被动不存在硬缺口或字段不匹配 | PASS | unit_skill_issues=0 |
| 兵种技能/被动不再依赖 global-only 提醒项 | PASS | global_only=0 |
| 兵种技能/被动全局 Catalog/脚本证据均存在 | PASS | global_refs=38, missing=0 |
| 标记为单位卡的技能/被动 Requirement 均出现在候选单位卡按钮 | PASS | unit_card_requirements=9, missing=0 |
| 官方 buildings.json 中的建筑均进入字段级建筑审计 | PASS | 3/3 |
| StarCraft2Coop 页面补充的显式建筑也进入字段级建筑审计 | PASS | expected_buildings=3, audited_buildings=3, online_added=0 |
| StarCraft2Coop Structures 主清单均被当前审计覆盖 | PASS | online_primary_structures=0, supplemental_buildings=3, issues=0 |
| 建筑 roster/catalog 不存在静态缺口 | PASS | building_issues=0 |
| 字段级建筑口径均能映射到当前 Mod 运行名册建筑 | PASS | runtime_buildings=4, missing=0 |
| 当前 Mod 运行名册未出现未解释的额外建筑 | PASS | extra=0, allowed=DarkPylon |
| 建筑 HP/Shield/Energy/Damage/Range/Speed 等在线数值字段不存在静态不匹配 | PASS | building_stat_issues=0 |
| 顶部技能面板按钮字段全部匹配预期 | PASS | top_panel_issues=0 |
| 顶部技能面板预期按钮均出现在当前 Mod runtime 面板 | PASS | runtime_faces=10, missing=0 |
| 当前 Mod runtime 顶部面板未出现未解释的额外按钮 | PASS | extra=0, allowed=CancelBuilding/RecallonDeathPassiveLocked/SOAStrikefromtheShadows/SOATimeStopLocked/StrikefromtheShadowsLocked |
| 当前 Mod 面板未暴露其他指挥官的等级/升级/锁定需求 | PASS | cross_requirements=0 |
| 当前 Mod 面板未暴露其他指挥官专属按钮/命令身份 | PASS | cross_identities=0 |
