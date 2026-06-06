# 凯瑞甘 runtime 修复记录（2026-06-06）

## 背景

本记录用于跟踪当前 Mod 中凯瑞甘与 7v1 参考实现、官方合作指挥官链路之间的运行时差异。用户实测指出当前凯瑞甘至少存在以下现象：

- 初始英雄不是从主基地附近的复活建筑流程出来。
- 凯瑞甘形态不对。
- 定身波、资源掉落等技能能点击但实际不生效或效果不完整。
- 开局基地仍可能是虫族通用 `Hatchery/Drone/Overlord`，不是凯瑞甘私有单位。

本次修复边改代码边更新本文档。

## 问题清单

| 编号 | 问题 | 当前证据 | 修复状态 |
|---|---|---|---|
| KER-RT-01 | `ttosh03b` 地图绕过凯瑞甘 runtime，直接创建 `K5Kerrigan` | `合作指挥官版起义狂潮/Maps/XM/ttosh03b.SC2Map/MapScript.galaxy` 的 Kerrigan 分支直接 `CreateUnitsWithDefaultFacing("K5Kerrigan")`，未调用 `libE0EAE146_gf_KerriganRuntimeInit` | 已修复，静态验证通过 |
| KER-RT-02 | 凯瑞甘私有开局单位缺少硬兜底 | `LibE0EAE146_RuntimeSafety.galaxy` 目前只有 `Abathur`、`Zagara`、`AbathurReborn` 的硬兜底；`Kerrigan` 仍依赖 `UserDataGetUnit("CommanderAch", ...)`，在加载顺序或依赖异常时可能回落到 `XMCore` 通用虫族基地 | 已修复，静态验证通过 |
| KER-RT-03 | 资源掉落技能缺少“死亡单位转资源掉落”的运行时触发 | `XMKerrigan` 有 `KerriganVoidCoopEconDrop` 技能/行为/拾取物静态数据，但 `XMFinal` 没有对应 `TriggerAddEventUnitDied` 触发；7v1 参考中死亡单位带 `KerriganVoidCoopEconDrop` 后会按补给/混合体分档创建 `KerriganVoidCoopEconDrop*` | 已修复，静态验证通过，仍需实机确认拾取资源 |
| KER-RT-04 | 凯瑞甘初始英雄直接出现在点位，没有走复活建筑首刷流程 | 当前 `LibE0EAE146_KerriganRuntime.galaxy` 在 `lp_createHero == true` 时直接创建 `K5Kerrigan`；7v1 会创建英雄后立即击杀，让 `KerriganReviveCocoon`/首个复活计时流程成为可见首刷入口 | 已修复，静态验证通过，仍需实机确认倒计时/复活位置 |
| KER-RT-05 | 形态/威望三口径仍需独立设计 | 7v1 的非 P3 基线会将 `KerriganGhostCosmetic` 置 0、`KerriganInfestedCosmetic` 置 1；当前 runtime 明确采用非 P3 正向口径：保留基础英雄技能、P1 creep 正向、现有自定义 P2 正向，不强行授予 `CommanderPrestigeKerriganAssimilationAura`、`MindBolt`/`PsionicLift` | 非 P3 默认刀锋女王外观已修复；P3 仍待单独设计 |
| KER-RT-06 | 定身波不应先随机改静态链 | 当前静态链存在 `KerriganVoidCoopCrushingGripWave -> ... -> PsionicLiftInstantDamageSet`，未发现 7v1 额外死亡/事件触发依赖；优先修 runtime 入口、面板 caster、技能允许与资源掉落触发，再做实机复验 | 记录，待实机复验 |
| KER-RT-07 | `ttosh03b` 首刷复活期间 `gv_nova` 是死亡英雄引用，极端仇恨可能把敌人导向地图边界 | Kerrigan runtime 现在会创建英雄后立即 `UnitKill` 以触发复活茧；`gt_ExtremeAggro_Func` 原先只判断 `UnitIsValid(gv_nova)`，死亡但有效的英雄仍可能被取位置 | 已修复，`ExtremeAggro` 现在要求 `gv_nova` 有效且存活 |

## 本轮修复原则

- 不修改 `XMFinal.SC2Mod/DocumentHeader`。
- 不碰当前无关的雷诺脏改。
- 优先修当前可证实的运行时缺口：开局私有单位兜底、地图入口、资源掉落死亡触发、英雄引用与复活首刷。
- 不在本轮强行开启凯瑞甘 P3 人类形态；P3 需要后续单独确认命令卡、技能替换与 cosmetic 行为。

## 修复进度

- 已处理：新增 `Kerrigan` 私有开局硬兜底，优先返回 `HatcheryKerrigan/DroneKerrigan/OverlordKerrigan`。
- 已处理：为 `KerriganRuntimeInit` 增加 hero 引用保存与 `libE0EAE146_gf_KerriganHeroForPlayer` 查询 helper。
- 已处理：为 `KerriganRuntimeInit` 初始化资源掉落死亡触发，按 7v1 的 `SupplyLT1/HybridUnitDummy/Food` 分档创建 `KerriganVoidCoopEconDrop*`。
- 已处理：按非 P3 基线设置 `KerriganGhostCosmetic=0`、`KerriganInfestedCosmetic=1`，避免默认凯瑞甘显示成人类/ghost 外观。
- 已处理：让 `ttosh03b` Kerrigan 分支调用 runtime，而不是直刷 `K5Kerrigan`。
- 已处理：扩展 `validate-private-commander-openers.mjs`，防止 `ttosh03b` 直刷、Kerrigan 私有开局兜底缺失、资源掉落死亡触发缺失回归。
- 已处理：`ttosh03b` 的 `ExtremeAggro` 增加 `UnitIsAlive(gv_nova)` 防御，避免 Kerrigan 初始复活茧等待期间把攻击目标导向被送到地图边界的死亡英雄。

## 7v1 对照结论

- 资源掉落：7v1 的 `libKMIS_gt_KerriganEconDrop_Func` 同样只处理带 `KerriganVoidCoopEconDrop` 行为的死亡单位，并按 `SupplyLT1`、`HybridUnitDummy`、`Food=-1/-2/-3/-4/<-4` 创建 `KerriganVoidCoopEconDropLT1/1/2/3/4/5`。本仓已对齐这个核心映射。
- 资源掉落归属：7v1 会给击杀者及互相结盟的指挥官都创建资源单位；本仓当前 XMFinal runtime 是 player 1 单指挥官口径，先只给 `libE0EAE146_gv_kerriganEconDropPlayer` 创建，避免引入未验证的多人同盟扩散。
- 形态：7v1 非 P3 基线明确设置 `KerriganGhostCosmetic=0`、`KerriganInfestedCosmetic=1`。本仓已按这个非 P3 口径设置默认刀锋女王外观。

## 验证记录

- 通过：`node --check .\scripts\sc2\validate-private-commander-openers.mjs`
- 通过：`node .\scripts\sc2\validate-private-commander-openers.mjs`，输出 `PASS: private commander opener validation passed commanders=11`
- 通过：`node --check .\scripts\sc2\validate-ttosh03b-abathur-reborn-init.mjs`
- 通过：`node .\scripts\sc2\validate-ttosh03b-abathur-reborn-init.mjs`，输出 `PASS: ttosh03b 重生阿巴瑟初始化校验通过 map_dependencies=1 xmfinal_dependencies=25`
- 通过：`node --check .\scripts\sc2\validate-kerrigan-official-runtime.mjs`
- 通过：`node .\scripts\sc2\validate-kerrigan-official-runtime.mjs`，输出 `Kerrigan official runtime validation passed`
- 未执行：`powershell -ExecutionPolicy Bypass -File .\scripts\sc2\check-galaxy-line-limit.ps1`，仓内没有该脚本。
- 替代通过：本次 touched 的 XMFinal runtime 文件行数为 `LibE0EAE146_KerriganRuntime.galaxy=257`、`LibE0EAE146_RuntimeSafety.galaxy=97`、`LibE0EAE146_h.galaxy=97`。
- 通过：`git diff --check`，仅出现 CRLF 转换 warning，无 whitespace error。

## 剩余风险

- 资源掉落链路已具备死亡触发与资源单位创建，但仍需实机确认拾取后 `KR0..KR5` 资源修改效果是否按当前地图玩家关系正确结算。
- 初始复活流程已改为创建英雄后击杀，依赖 `KerriganReviveCocoon`、`KerriganFirstReviveTimer` 和主基地附近定位；仍需实机确认倒计时显示、复活位置和地图脚本中 `gv_nova` 的死亡期引用是否符合预期。
- P3 人类形态、`MindBolt`、`PsionicLift`、`CommanderPrestigeKerriganAssimilationAuraShared` 没有在本轮强行启用；后续如果要支持三威望，需要单独做命令卡/技能替换闭包。
