# 2026-06-01 ttosh03b 与 CommanderTestBench 启动验证记录

## ttosh03b

验证命令：

```powershell
pwsh -NoProfile -ExecutionPolicy Bypass -File ".\scripts\launch-xm-map.ps1" -Commander Nova -MapPath "E:\SC2\SC2new\StarCraft II\Maps\XM\ttosh03b.SC2Map"
pwsh -NoProfile -ExecutionPolicy Bypass -File ".\scripts\launch-xm-map.ps1" -Commander Kerrigan -MapPath "E:\SC2\SC2new\StarCraft II\Maps\XM\ttosh03b.SC2Map"
pwsh -NoProfile -ExecutionPolicy Bypass -File ".\scripts\launch-xm-map.ps1" -Commander Abathur -MapPath "E:\SC2\SC2new\StarCraft II\Maps\XM\ttosh03b.SC2Map"
pwsh -NoProfile -ExecutionPolicy Bypass -File ".\scripts\launch-xm-map.ps1" -Commander AbathurReborn -MapPath "E:\SC2\SC2new\StarCraft II\Maps\XM\ttosh03b.SC2Map"
```

结论：

- `Nova` 可起图。
- `Kerrigan` 可起图。
- `Abathur` 可起图。
- `AbathurReborn` 已回退到 `CoopCasterAbathur`，可起图。

关键修复：

- `AbathurReborn` 入口从专用 caster 回退到 `CoopCasterAbathur`，避免缺失目录条目导致 intro 崩溃。

补充复测：

- `Kerrigan` 这轮也可进图，当前截图可见英雄头像和地面单位，说明不再停留在黑屏阶段。
- `Abathur` 可进图，但 `Alerts.txt` 里出现 `Scope[HatcheryAbathur, Unit] Unable to create unit actor. Creating fallback sphere unit.`，说明它的起始建筑演员还需要继续核对。
- `AbathurReborn` 仍表现为回退到 `CoopCasterAbathur` 的同路结果，画面和 `Abathur` 基本一致，符合当前“stub 回退”的定位。
- 2026-06-01 13:45 这轮把 `ttosh03b` 里 `InitializeBase()` 之后那三句重复的 `UserDataGetUnit("CommanderAch", ...)` 直接创建删掉后，重新启动 `Abathur + ttosh03b`，最新落盘只剩启动日志，没有再写出新的 `ScriptError.txt`；说明这条空单位类型报错已经从这个入口上移除了。

补跑结果：

- 2026-06-01 13:58 `Kerrigan + ttosh03b` 重新启动后，最新 `ScriptError.txt` 仍未新增；最新 `Alerts.txt` 里能搜到的凯瑞甘条目只有 `K5KerriganPsiStrike` / `K5Kerrigan` 的 `CAbil` 技能过多警告，没有再出现 `无法找到目录条目''` 这类启动级错误。
- 2026-06-01 14:01 `Abathur + ttosh03b` 重新启动后，最新 `ScriptError.txt` 仍未新增；最新 `Alerts.txt` 里未在抽样检索中命中 `Abathur/HatcheryAbathur` 关键字，当前先按“无新脚本错误、需继续看实机表现”处理。

## CommanderTestBench

验证命令：

```powershell
pwsh -NoProfile -ExecutionPolicy Bypass -File .\scripts\launch-xm-map.ps1 -Commander <Commander> -MapPath "E:\SC2\SC2new\StarCraft II\Maps\XM\CommanderTestBench.SC2Map"
```

结果摘要：

- 19 个指挥官批量启动均可拉起进程，没有新的 `ScriptError.txt`。
- `CampaignXCore.SC2Bank` 已写入 `TestBench_*` section。
- `Nova` / `Kerrigan` / `Abathur` 的 `standard_base`、`full_buildings`、`full_units`、`panel_cost_smoke` 记录均为 `Errors=0`、`Missing=0`。
- 当前 bank 里唯一可见的缺口来自 `TestBench_AbathurCustom_full_buildings`，属于自定义 Abathur 测试线，不在 19 指挥官主线内。

最新复测：

- `CommanderTestBench` 已改成只起 UI、不在 `MapInit` 自动跑 boot smoke。
- 2026-06-01 14:40 这轮用 `Kerrigan + CommanderTestBench` 重新启动后，最新 `ScriptError.txt` 没有新增，最新 `Alerts.txt` 为空，说明启动阶段已经不再触发之前的无效位置错误。
- 2026-06-01 15:04 这轮把 `CommanderTestBench` 临时改成对 `Kerrigan` 自动跑 `hero_ability_smoke`，结果已写入 `Documents\StarCraft II\Banks\CampaignXCore.SC2Bank` 的 `TestBench_Kerrigan_hero_ability_smoke`：`Created=14`、`Missing=0`、`Warnings=0`、`Errors=0`，`Last=TEST_ABILITIES_Kerrigan`。
- 这次复测同时把 `KerriganCreateMapStartSquad` 的入口/完成/回退日志补到了 `XMFinal`，便于后续从 `KERRIGAN_START_SQUAD_*` 事件追踪起始编队。
- 2026-06-01 15:14-15:19 重新用 `ttosh03b` 跑了 `Nova` / `Kerrigan` / `Abathur` / `AbathurReborn`，并通过 `CampaignXCore.SC2Bank` 的 `TTOSH03B` section 记录到阶段 `intro:after-cargo`，对应 `Detail` 分别落到 `last=NovaCoop`、`last=K5Kerrigan`、`last=QueenCoop`、`last=QueenCoop`；说明 map 入口已经走到后续电影前，不是起图即黑在最前面。
- `ttosh03b` 里新增了 `TTOSH03B` bank 调试段，后续再排黑屏时可以直接看 `Phase / Detail / Commander`，不用只靠屏幕和 `Alerts` 猜。
- 2026-06-01 16:20 左右把 `CommanderTestBench` 的启动序列改成自动跑 `power_fusion` / `standard_base` / `full_buildings` / `full_units` / `hero_ability_smoke` / `unit_ability_smoke` / `unit_evolution_smoke` / `tech_smoke` / `panel_cost_smoke` / `panel_effect_smoke`，并额外写了一个 `CommanderTestBench` state section 用来区分当前这次启动。
- 2026-06-01 16:20 这轮用 `Kerrigan + CommanderTestBench` 复测后，`CommanderTestBench` state section 已落到 `phase=auto-boot-done`、`commander=Kerrigan`、`scenario=panel_effect_smoke`、`last=RUN_BOOT`；`TestBench_Kerrigan_panel_effect_smoke` 读到 `Created=3`、`Missing=0`、`Warnings=0`、`Errors=0`、`Last=PANEL_PROFILE_HIT`。同轮抽查 `TestBench_Kerrigan_full_buildings/full_units/hero_ability_smoke/unit_ability_smoke/unit_evolution_smoke/tech_smoke/panel_cost_smoke` 仍显示 `Created=0`、`Last=TEST_COMMANDER_SET`，说明这些更重的基线项目前还需要继续核对 wiring。
- 2026-06-01 15:26-15:35 这轮把 `CommanderTestBench` 的 `MapInit` 改成统一自动 `boot smoke` 后，重新分别启动 `Nova` / `Kerrigan` / `Abathur` / `AbathurReborn`，`CampaignXCore.SC2Bank` 里对应的 `TestBench_*_standard_base`、`*_full_buildings`、`*_full_units`、`*_panel_cost_smoke` 继续保持 `Errors=0`、`MissingIds=""`；这说明自动 smoke 链路在这四个指挥官上是通的，接下来可以直接拿它继续扫剩余指挥官。
