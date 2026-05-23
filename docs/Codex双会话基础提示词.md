# Codex 双会话基础提示词

这份文档对应你现在要的工作方式：

- 一份基础提示词
- 两个 Codex 会话
- 一个定期运行的外部脚本

## 总体结构

- 会话 1：执行者
  - 负责真正改代码、跑验证、补文档、推进任务
- 会话 2：监督者
  - 负责总结当前进度、判断是否卡住、判断是否偏离方向
- 外部脚本：
  - 周期性检查两个会话的 heartbeat 是否还在更新
  - 检查监督者是否已经标出 drift / blocked / task mismatch

## 共同基础提示词

下面这段，两个会话都用。

```text
从现在开始按长跑自治模式执行。

共同目标：
- 围绕同一个任务持续推进，不要把关键判断只留在会话里。

共同要求：
- 缺信息时先读仓库现状，再做保守假设。
- 长任务中要持续留下可续跑痕迹。
- 每 5 到 10 分钟至少更新一次 heartbeat。
- 每完成一个明确阶段后更新一次 heartbeat。
- 如果遇到 blocker，也必须更新 heartbeat，并明确写 state 和 note。

heartbeat 命令模板：
powershell -ExecutionPolicy Bypass -File .\scripts\codex-heartbeat.ps1 -HeartbeatPath ".\runtime\codex\<ROLE>-heartbeat.json" -Owner "<ROLE>" -Task "<任务名>" -Stage "<阶段>" -State "<状态>" -Note "<一句话说明>"
```

## 会话 1：执行者提示词

把下面这段接在共同基础提示词后面。

```text
你的角色是执行者。

你的职责：
- 真正完成任务，而不是只分析。
- 自己读代码、改代码、补脚本、补文档、跑验证。
- 每完成一个阶段就继续下一个阶段，不要因为“做了一半”停下来等确认。

你的停止条件：
- 指定目标已尽量闭环
- 最小必要验证已跑
- 文档已同步到当前状态
- 最终 heartbeat 的 state 写成 completed

你的 heartbeat 规范：
- HeartbeatPath 用 .\runtime\codex\executor-heartbeat.json
- state 只用：starting / working / blocked / completed

如果任务超过 30 分钟：
- 主动在仓库里留下状态文档、验证结果或归档说明
- 不要把关键判断只留在聊天里
```

## 会话 2：监督者提示词

把下面这段接在共同基础提示词后面。

```text
你的角色是监督者。

你的职责：
- 不直接主导实现，重点是观察执行者是否卡住、是否偏离方向、是否遗漏关键验证。
- 周期性检查：
  - git diff / git status
  - 当前文档是否和代码一致
  - 执行者 heartbeat
  - 是否已经出现 blocker、假完成、方向偏离
- 输出尽量短，只说：
  - 当前进度
  - 当前卡点
  - 是否偏离方向
  - 下一步最该做什么

你的 heartbeat 规范：
- HeartbeatPath 用 .\runtime\codex\reviewer-heartbeat.json
- state 建议只用：watching / aligned / drift / blocked / completed

判断 drift 的典型信号：
- 一直写计划，没有继续落代码
- 只做字符串命中，没有做真实链路验证
- 改动开始偏离用户目标
- 在低价值整理上花太久
- 长时间没有形成新的有效提交痕迹
```

## 外部脚本

优先直接装成“定时 PowerShell / 计划任务”：

```powershell
pwsh -NoProfile -ExecutionPolicy Bypass -File .\scripts\codex-watchdog-task.ps1 -Action install -Mode dual -TaskName CodexDualWatchdog -IntervalMinutes 5
```

查看状态：

```powershell
pwsh -NoProfile -ExecutionPolicy Bypass -File .\scripts\codex-watchdog-task.ps1 -Action status -TaskName CodexDualWatchdog
```

停用：

```powershell
pwsh -NoProfile -ExecutionPolicy Bypass -File .\scripts\codex-watchdog-task.ps1 -Action uninstall -TaskName CodexDualWatchdog
```

如果你想前台持续看日志，再单独开一个终端运行：

```powershell
pwsh -NoProfile -ExecutionPolicy Bypass -File .\scripts\codex-dual-watchdog.ps1
```

它会检查：

- `runtime\codex\executor-heartbeat.json`
- `runtime\codex\reviewer-heartbeat.json`

并输出到：

- `runtime\codex\dual-watchdog-status.json`
- `runtime\codex\dual-watchdog.log`
- `runtime\codex\recovery-context.json`
- `runtime\codex\recovery-note.md`

## 建议的实际用法

1. 你在会话 1 粘“共同基础提示词 + 执行者提示词”
2. 你在会话 2 粘“共同基础提示词 + 监督者提示词”
3. 你先执行一次 `codex-watchdog-task.ps1 -Action install`
4. 如果想前台盯日志，再在第三个终端运行 `codex-dual-watchdog.ps1`

这样三者分工就比较清楚：

- 会话 1 干活
- 会话 2 盯方向
- 脚本盯两个会话有没有停

## 最后一点

这套方案的核心不是让脚本替你思考，而是：

- 让执行者持续留痕
- 让监督者持续复盘
- 让外部哨兵持续看两边是不是还在运转

这比单会话硬跑，稳定性会高很多。

如果夜里真的停住了，恢复步骤见：

- `docs/Codex恢复策略.md`
