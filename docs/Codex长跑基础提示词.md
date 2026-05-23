# Codex 长跑基础提示词

这份提示词是给你直接复制给 Codex 用的。目标是让它在长任务里少停、自己推进，同时定期写心跳，方便外部 watchdog 监控。

## 基础版

```text
从现在开始按长跑自治模式执行。

目标：
- 把 <任务目标> 完整做完，不要只分析。

执行要求：
- 先自己阅读相关代码、文档、脚本和最近改动。
- 缺信息时按当前仓库现状做保守假设，不要频繁停下来问我。
- 可以自己补代码、补脚本、补文档、补验证。
- 没有专用工具时，先用现有能力推进，不要因为“缺工具”直接停下。
- 每完成一个阶段就继续下一个阶段，直到达到停止条件。
- 只有遇到破坏性操作、覆盖不明确改动、必须人工交互、或真实卡死时才允许来问我。

心跳要求：
- 任务开始时写一次 heartbeat。
- 每 5 到 10 分钟至少更新一次 heartbeat。
- 每完成一个明确阶段后再更新一次 heartbeat。
- 如果遇到 blocker，也写 heartbeat，并把 state 标成 blocked。
- 完成后写最终 heartbeat，并把 state 标成 completed。

本仓库 heartbeat 命令：
powershell -ExecutionPolicy Bypass -File .\scripts\codex-heartbeat.ps1 -Task "<任务名>" -Stage "<当前阶段>" -State "<starting|working|blocked|completed>" -Note "<一句话说明>"

停止条件：
- <验证1> 通过
- <验证2> 通过
- <文档> 已同步更新
- 最终输出包含：已完成项、验证结果、剩余风险
```

## 更稳的版本

如果任务特别长，建议再加一句：

```text
如果任务超过 30 分钟，请在仓库中留下可续跑痕迹，包括当前状态文档、验证脚本或结果日志，不要把关键判断只留在会话里。
```

## 配套 watchdog

如果你想让单会话 watchdog 变成“定时 PowerShell”，用：

```powershell
pwsh -NoProfile -ExecutionPolicy Bypass -File .\scripts\codex-watchdog-task.ps1 -Action install -Mode single -TaskName CodexSingleWatchdog -IntervalMinutes 5
```

查看状态：

```powershell
pwsh -NoProfile -ExecutionPolicy Bypass -File .\scripts\codex-watchdog-task.ps1 -Action status -TaskName CodexSingleWatchdog
```

停用：

```powershell
pwsh -NoProfile -ExecutionPolicy Bypass -File .\scripts\codex-watchdog-task.ps1 -Action uninstall -TaskName CodexSingleWatchdog
```

如果你只是想在另一个终端前台持续运行：

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\codex-watchdog.ps1
```

默认行为：

- 心跳文件路径：`runtime\codex\heartbeat.json`
- 超过 12 分钟不更新，判定为 stale
- 每 60 秒检查一次
- 检查结果写入：
  - `runtime\codex\watchdog-status.json`
  - `runtime\codex\watchdog.log`

如果你想弹窗提醒：

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\codex-watchdog.ps1 -Popup
```

如果你只想单次检查：

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\codex-watchdog.ps1 -Once
```

## 适用前提

这套方式的前提不是“Codex 有额外插件”，而是：

1. 你给它的任务目标足够明确
2. 你允许它自己继续推进
3. 它能在仓库里调用 `scripts\codex-heartbeat.ps1`

只要这三条满足，就算没有额外外部工具，也能大幅减少“跑跑停停”。
