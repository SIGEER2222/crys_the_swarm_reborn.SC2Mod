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

