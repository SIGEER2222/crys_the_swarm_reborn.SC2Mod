# 阿巴瑟、斯旺、雷诺、凯瑞甘顶部面板专项审计

日期：2026-05-29

范围：只看 active 旧线 `合作指挥官版起义狂潮/` 的顶部面板，不扩展到建筑/单位生产面板。

数据口径：

- 当前实现目标：`合作指挥官版起义狂潮/Mods/XM/...`
- 官方对照：`游戏数据/官方合作指挥官/commanders` 与 `游戏数据/官方SC2原始文本镜像`
- 自动审计输出：`docs/每日进度/2026-05-29-合作指挥官建筑单位逐个对比/top-panel/active-old-line-top-panel-audit.json`

## 总结

| 指挥官 | 顶部面板入口 | 隐藏施法单位 | 静态结论 | 主要风险 |
|---|---|---|---|---|
| 阿巴瑟 | `CommanderPanelInit("CoopCasterAbathur", "Abathur")` | `CoopCasterAbathur` | 已接 2 格虫族顶部面板 | 剧毒巢穴是建造类按钮，脚本未看到显式费用/冷却字段 |
| 斯旺 | `CU_GPInit(1, "Swann", UnitLastCreated(), null)` | `CoopCasterSwann` | 已接 4 格人族顶部面板 | 激光钻机按钮依赖钻机单位和钻机升级；`0.0625 秒`不是大招真实冷却 |
| 雷诺 | `CommanderPanelInit("CoopCasterRaynor", "Raynor")` | `CoopCasterRaynor` | 已接 2 格雷诺顶部面板 | 官方同槽位带女妖锁图标；若实机显示锁，要查等级/升级授予 |
| 凯瑞甘 | `CommanderPanelInit("CoopCasterKerrigan", "Kerrigan")` | `CoopCasterKerrigan` | 无顶部面板；技能属于 `K5Kerrigan` 英雄命令卡 | 之前误把英雄技能当顶部面板，已撤回 top-panel 路由和 Row 0 改动 |

## 阿巴瑟

实现位置：

- `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146.galaxy`
- `合作指挥官版起义狂潮/Mods/XM/XMCore.SC2Mod/Base.SC2Data/Lib67C0F0E7.galaxy`
- `合作指挥官版起义狂潮/Mods/XM/XMAbathur.SC2Mod/Base.SC2Data/GameData/UnitData.xml`

面板：

- 路由：`Abathur` / `AbathurReborn` 都进入 `CU_GPInitAbathur`
- 模板：`Coop_GlobalCastingTemplates/ZergGlobalCommandPanelTemplate`
- 按钮数量：2

按钮明细：

| 位置 | 中文名 | 命令 | 具体效果 |
|---|---|---|---|
| 第 1 格 | 孵化剧毒巢穴 | `SpawnToxicNest,Build1` | 孵化一个可排放菌毯的剧毒巢穴；剧毒巢穴爆炸对附近敌方地面单位造成 125 点伤害。脚本未读到显式费用/冷却字段。 |
| 第 2 格 | 愈合 | `AbathurMend,Execute` | 立即治疗友方生物、机械单位和建筑 100 点生命值；随后 10 秒内额外恢复 50 点生命值。基础冷却 150 秒。 |

结论：

- 顶部面板静态链路是通的。
- 当前没有发现阿巴瑟顶部按钮挂到别的指挥官技能。
- 如果实机缺按钮，优先查 `CoopCasterAbathur` 是否被创建、`CU_GPInitAbathur` 是否执行、以及剧毒巢穴建造能力是否被地图/需求额外限制。

## 斯旺

实现位置：

- `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146.galaxy`
- `合作指挥官版起义狂潮/Mods/XM/XMCore.SC2Mod/Base.SC2Data/Lib67C0F0E7.galaxy`
- `合作指挥官版起义狂潮/Mods/XM/XMAbathur.SC2Mod/Base.SC2Data/GameData/UnitData.xml`
- `合作指挥官版起义狂潮/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/AbilData.xml`
- `合作指挥官版起义狂潮/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/RequirementData.xml`

说明：`CoopCasterSwann` 当前由共享 Catalog 命中到 `XMAbathur.SC2Mod` 里的定义，这不是“斯旺缺自己的 UnitData”。该结构与官方共享施法单位形态一致。

面板：

- 路由：`Swann` 进入 `CU_GPInitSwann`
- 模板：`Coop_GlobalCastingTemplates/TerranGlobalCommandPanelTemplate`
- 按钮数量：4

按钮明细：

| 位置 | 中文名 | 命令 | 具体效果 |
|---|---|---|---|
| 第 1 格 | 德拉肯激光钻机攻击 | `DrakkenLaserDrillAttackIssueOrder,Execute` | 命令德拉肯激光钻机攻击目标； tooltip 为每秒 20 点伤害，射程无限。使用条件需要已完成 `DrakkenLaserDrillCoop`。 |
| 第 2 格 | 汇聚射线 | `DrakkenLaserDrillConcentratedBeamIssueOrder,Execute` | 对一条直线上的敌方单位造成 400 点伤害，长度覆盖整个地图。顶部代理按钮显示 `0.0625 秒`同步冷却，但真实能力 `DrakkenLaserDrillBFG` 基础冷却为 180 秒。 |
| 第 3 格 | 脉冲炮 | `DrakkenLaserDrillPulseCannonIssueOrder,Execute` | 对目标区域的敌方单位和建筑造成 600 点伤害。顶部代理按钮显示 `0.0625 秒`同步冷却，但真实能力 `DrakkenLaserDrillNuke` 基础冷却为 300 秒。 |
| 第 4 格 | 战斗空投 | `SpecialDelivery,Execute` | 召唤 4 台 ARES 武装机器人；降落区域中的敌方地面单位会被昏迷；ARES 可控制并战斗 60 秒。基础初始冷却 240 秒，使用冷却 240 秒。 |

锁图标与需求：

- 官方 `CoopCasterSwann` 同样有 `CommanderPrestigeSwannConcentratedBeamLocked`、`CommanderPrestigeSwannPulseCannonLocked`、`PulseCannonLocked`、`CombatDropLocked` 这些同槽位被动锁图标。
- 当前 active 旧线的共享 `CoopCasterSwann` 也保留这些锁图标。
- `HaveDrakkenLaserDrill` 需要场上已完成 `DrakkenLaserDrillCoop`。
- `HaveDrakkenLaserDrillBFG` 需要 `DrakkenLaserDrillBFG` 升级完成。
- `HaveDrakkenLaserDrillNuke` 需要 `DrakkenLaserDrillNuke` 升级完成。

结论：

- 斯旺顶部面板静态链路是通的。
- 不能把 `0.0625 秒`当作汇聚射线/脉冲炮真实冷却；它只是顶部代理按钮和钻机本体能力共用冷却链接时的极短同步值。
- 如果实机出现“按钮在但不能用”，优先查三件事：钻机单位是否创建完成、`DrakkenLaserDrillBFG` 是否授予、`DrakkenLaserDrillNuke` 是否授予。

## 雷诺

实现位置：

- `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146.galaxy`
- `合作指挥官版起义狂潮/Mods/XM/XMCore.SC2Mod/Base.SC2Data/Lib67C0F0E7.galaxy`
- `合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UnitData.xml`
- `合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/AbilData.xml`

面板：

- 路由：`Raynor` 进入 `CU_GPInitRaynor`
- 模板：`Coop_GlobalCastingTemplates/RaynorGlobalCommandPanelTemplate`
- 按钮数量：2

按钮明细：

| 位置 | 中文名 | 命令 | 具体效果 |
|---|---|---|---|
| 第 1 格 | 休伯利安号 | `VoidCoopSummonHyperion,Execute` | 召唤可控制的休伯利安号战列巡航舰，持续 60 秒。基础初始冷却 300 秒，使用冷却 360 秒；创建单位 `HyperionVoidCoop`。 |
| 第 2 格 | 女妖空袭 | `BansheeAirstrike,Execute` | 呼叫 5 架隐形黄昏之翼；空降区域内敌人受到 50 点伤害；黄昏之翼可控制并作战 60 秒。基础初始冷却 240 秒，使用冷却 240 秒。 |

精通影响：

- `MasteryRaynorHyperionCooldown`：每点使休伯利安号使用冷却减少 4 秒，最多 30 点时减少 120 秒；360 秒可降到 240 秒。
- `MasteryRaynorDuskWingCooldown`：每点使女妖空袭使用冷却减少 4 秒，最多 30 点时减少 120 秒；240 秒可降到 120 秒。
- 上面是 Catalog 层能力冷却影响；实机最终值取决于当前 Bank / 指挥官加点链路是否真的授予对应精通等级。

锁图标与需求：

- 官方 `CoopCasterRaynor` 在女妖空袭同一格同时放了 `BansheeAirstrike` 和 `BansheeAirstrikeLocked`。
- active 旧线 `XMRaynor` 也保留了这一结构，不是当前 Mod 新挂错的按钮。
- `BansheeAirstrikeLocked` 使用 `RaynorLevel02` 需求，官方含义是“2 级解锁女妖空袭”的锁提示链路。
- 当前通用初始化只通过 `CommanderAch`/Bank 授予雷诺的解锁与精通；不像凯瑞甘分支那样硬写 `CommanderLevel=15`。如果实机看到女妖格子变成锁，先查 `CommanderLevel`、`RaynorCommander`、`RaynorBansheeAirstrike` 是否在当前存档/初始化里被授予。

结论：

- 雷诺顶部面板静态链路是通的，两个按钮本身对齐官方。
- 需要实机重点看女妖空袭是否被锁图标覆盖；若被覆盖，问题更可能在等级/Bank 授予链路，不是按钮 ID 错。

## 凯瑞甘

实现位置：

- `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146.galaxy`
- `合作指挥官版起义狂潮/Mods/XM/XMCore.SC2Mod/Base.SC2Data/Lib67C0F0E7.galaxy`
- `合作指挥官版起义狂潮/Mods/XM/XMKerrigan.SC2Mod/Base.SC2Data/GameData/UnitData.xml`
- `合作指挥官版起义狂潮/Mods/XM/XMKerrigan.SC2Mod/Base.SC2Data/GameData/AbilData.xml`

面板口径修正：

- 官方 `CoopCasterKerrigan` 是空壳，没有顶部按钮。
- `PrimalSlash`、`PsiStrikeWalk`、`KerriganVoidCoopEconDrop`、`KerriganVoidCoopCrushingGripWave` 属于 `K5Kerrigan` 英雄命令卡，不属于顶部面板。
- active 旧线里 `Kerrigan` 的 `CU_GPInit` 路由应直接 `return`，不创建顶部全局施法面板。
- active 旧线的 `CoopCasterKerrigan` 已清回官方空壳；真正应该核对的是 `K5Kerrigan` / `K5KerriganBurrowed` / 相关英雄形态命令卡。

英雄命令卡技能明细：

| 位置 | 中文名 | 命令 | 具体效果 |
|---|---|---|---|
| 英雄卡 Row 2 Col 0 | 跳击 | `PrimalSlash,Execute` | 凯瑞甘跳向目标并造成 150 点伤害；也可以不指定目标发动，用于快速移动。能力链里还接了升级/威望相关 switch。 |
| 英雄卡 Row 2 Col 1 | 灵能位移 | `PsiStrikeWalk,Execute` | 凯瑞甘飞速掠过敌人，对行进路线上的所有敌人造成 50 点伤害。脚本未读到显式费用/冷却字段。 |
| 英雄卡 Row 2 Col 2 | 吸收光环 | `KerriganVoidCoopEconDrop,Execute` | 附近所有被消灭的敌人掉落资源；持续 15 秒。基础冷却 120 秒。 |
| 英雄卡 Row 2 Col 3 | 定身波 | `KerriganVoidCoopCrushingGripWave,Execute` | 对凯瑞甘周围大范围敌人造成 100 点伤害，并击晕 10 秒；英雄单位会被减速。基础初始冷却 600 秒，使用冷却 180 秒。 |

精通影响：

- `MasteryKerriganPrimarySpeedDamage`：每点给跳击伤害 +3、灵能位移伤害 +1，并影响凯瑞甘普攻速度等；最多 30 点时跳击 +90、灵能位移 +30。
- `MasteryKerriganImmobilizationWaveDamage`：每点给定身波相关伤害 +3.334；最多 30 点时约 +100.02。
- `MasteryKerriganEnergyRegen`：每点给凯瑞甘能量恢复 +0.15，并显示为 +1.5%；最多 30 点时能量恢复 +4.5。
- 上面只说明 Catalog 精通效果；实机最终值取决于 Bank / 初始化是否授予对应精通等级。

结论：

- 凯瑞甘不应按顶部面板验收。
- 这四个技能要按英雄 `K5Kerrigan` 的命令卡验收。
- 还需要实机确认：英雄单位存在时 4 个技能是否正确显示和施放，尤其是跳击/灵能位移的无目标移动、吸收光环的掉落、定身波的范围/眩晕。

## 下一步实机验证清单

1. 阿巴瑟：进入地图后确认顶部有“孵化剧毒巢穴、愈合”；剧毒巢穴能放置并爆炸 125；愈合能立刻治疗 100，后续 10 秒再回 50。
2. 斯旺：确认钻机完成前/完成后按钮状态；确认汇聚射线真实冷却按 180 秒走、脉冲炮按 300 秒走，而不是 0.0625 秒。
3. 雷诺：确认女妖空袭格子是否可用；如果显示锁图标，检查 `CommanderLevel`、`RaynorCommander`、`RaynorBansheeAirstrike` 授予。
4. 凯瑞甘：不要看顶部面板；选中 `K5Kerrigan` 英雄后确认 Row 2 上的跳击、灵能位移、吸收光环、定身波是否显示并正常施放。
