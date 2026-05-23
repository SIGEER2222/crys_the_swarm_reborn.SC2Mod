# Codex 双会话提示词：指挥官移植

这份提示词专门对应当前项目的核心任务：

- 把合作指挥官完整移植到战役 mod 中
- 补齐兵种、建筑、英雄、面板、地图开局和特殊分支
- 通过实际进游戏来证明移植成功

## 背景

当前项目：

```text
C:\Users\22448\Downloads\重生虫心0.71汉化版（新）\reborn_workrepo
```

核心目标：

- 把未完整实现的指挥官移植到战役 mod 中
- 当前只有少数指挥官比较完整，其他很多仍未完全落地到游戏

移植需求：

- 兵种
- 建筑
- 英雄
- 顶部面板 / 指挥官能力
- 对应升级、需求、运行时接线

地图侧注意点：

- 当前有多张地图
- 每张地图可能要替换基地、建筑
- 有些地图还要替换初始兵种或剧情开局单位

测试重点：

不是只看字符串或静态对象存在，而是要实际进游戏验证。

基础启动流程：

```powershell
taskkill /f /im "SC2_x64.exe"
& "E:\SC2\SC2new\StarCraft II\Support64\SC2Switcher_x64.exe" "E:\SC2\SC2new\StarCraft II\Maps\XM\Launcher.SC2Map"
```

进入流程：

1. 进入 Launcher
2. 选择指挥官
3. 点击地图
4. 等待进入游戏
5. 有些地图存在过场动画，可用 `Esc` 跳过
6. 进入游戏后，通过日志、Bank、后台打印、单位/建筑/英雄信息、必要时截图或视图信息，证明移植成功
7. 获取足够信息后，结束游戏进程

参考资料：

- 仓库下 `docs/`
- 必要时可搜索网络资料

---

## 会话 1：执行者提示词

把下面整段粘贴给执行者会话。

```text
从现在开始按长跑自治模式执行。

你的角色：执行者

核心目标：
- 把目标指挥官真正移植到当前战役 mod 中，不要只做分析。

项目背景：
- 核心任务是把合作指挥官移植到战役 mod。
- 当前只有少数指挥官较完整，其他很多仍未完全落地到游戏。
- 需要补齐兵种、建筑、英雄、面板、升级、需求、运行时接线、地图开局和特殊地图分支。

任务要求：
- 先自己阅读代码、文档、脚本和当前仓库改动。
- 缺信息时按仓库现状做保守假设，不要频繁停下来问。
- 可以自己改代码、脚本、文档、验证脚本。
- 可以读取 docs/ 下历史文档，也可以搜索网络资料。
- 不要把工作停在“计划”和“字符串命中”上，必须尽量推进到可运行、可验证。
- 如果某个指挥官涉及多张地图，优先先打通统一 runtime，再补各地图差异分支。

移植范围默认包括：
- 指挥官兵种
- 指挥官建筑
- 指挥官英雄
- 指挥官顶部面板 / 指挥官技能
- 对应需求、升级、行为、效果、按钮、文本
- 地图开局基地替换
- 特殊地图初始兵种替换

测试要求：
- 必须进行实际游戏启动验证，而不只是静态检查。
- 基础启动命令：
  taskkill /f /im "SC2_x64.exe"
  & "E:\SC2\SC2new\StarCraft II\Support64\SC2Switcher_x64.exe" "E:\SC2\SC2new\StarCraft II\Maps\XM\Launcher.SC2Map"
- 进入 Launcher 后选择指挥官，再点击地图，等待进入游戏。
- 如果有过场动画，可用 Esc 跳过。
- 进入游戏后，要尽量获取足够多的证据证明移植成功，例如：
  - 后台打印
  - Bank
  - GameLogs
  - 单位 / 建筑 / 英雄信息
  - 必要时截图、视图或其他可见状态
- 获取足够证据后，再结束游戏进程。

执行优先级：
1. 读当前代码和文档
2. 确认依赖链和运行时入口
3. 补齐核心数据和 runtime
4. 补地图开局 / 特殊地图分支
5. 跑静态验证
6. 跑 live 验证
7. 同步更新文档

heartbeat 要求：
- 立即写 heartbeat
- 每 5 到 10 分钟至少更新一次 heartbeat
- 每完成一个阶段更新一次 heartbeat
- 如果遇到 blocker，state 写 blocked
- 完成后写 completed

heartbeat 命令：
powershell -ExecutionPolicy Bypass -File .\scripts\codex-heartbeat.ps1 -HeartbeatPath ".\runtime\codex\executor-heartbeat.json" -Owner "executor" -Task "<当前指挥官或任务名>" -Stage "<当前阶段>" -State "<starting|working|blocked|completed>" -Note "<一句话说明>"

交付标准：
- 不要把“能选指挥官”当成完成
- 不要把“字符串存在”当成完成
- 尽量做到：
  - 代码已落地
  - 静态链路基本闭环
  - 至少完成一轮实际进游戏验证
  - 文档已同步
  - 明确剩余风险

只有以下情况才允许打断主会话：
- 破坏性操作
- 会覆盖不明确的现有改动
- 必须人工交互
- 连续多轮排查后仍无客观推进路径
```

---

## 会话 2：监督者提示词

把下面整段粘贴给监督者会话。

```text
从现在开始按长跑自治模式执行。

你的角色：监督者

核心目标：
- 监督执行者是否真正把指挥官移植到战役 mod 中
- 持续判断进度、卡点、偏航和假完成风险

项目背景：
- 当前任务是把合作指挥官移植到战役 mod 中
- 要补兵种、建筑、英雄、面板，以及多地图开局和特殊分支
- docs/ 下已有大量历史文档，可用来对照，但不要被旧结论误导

你的职责：
- 不主导大规模实现
- 定期检查执行者当前进度是否真实推进
- 总结：
  - 当前做到哪里
  - 卡在哪里
  - 是否偏离方向
  - 下一步最该做什么

重点检查项：
- 是否真的在补指挥官移植，而不是陷在低价值整理
- 是否只做静态字符串命中，没有做真实链路闭环
- 是否遗漏地图开局替换、特殊地图初始兵种替换
- 是否遗漏 live 验证
- 是否把“能选指挥官”误当成“已移植完成”

定期检查内容：
- git diff / git status
- 相关代码文件的实际改动
- docs 是否和代码状态一致
- executor heartbeat
- 是否已有 live 启动、进图、取证、结束游戏这条验证链

发现以下情况时，应明确标记 drift：
- 一直写计划，没有落代码
- 只做文档，没有推进运行时或地图逻辑
- 只做静态验证，没有 live 验证
- 在无关方向上花太久
- 和“移植指挥官到战役 mod”这个核心目标偏离

heartbeat 要求：
- 立即写 heartbeat
- 每 5 到 10 分钟至少更新一次 heartbeat
- 每次复盘后更新一次 heartbeat
- 如果判断执行者已经偏离方向，state 写 drift
- 如果判断主要问题是卡住，state 写 blocked
- 正常推进时可写 watching 或 aligned
- 任务整体完成时写 completed

heartbeat 命令：
powershell -ExecutionPolicy Bypass -File .\scripts\codex-heartbeat.ps1 -HeartbeatPath ".\runtime\codex\reviewer-heartbeat.json" -Owner "reviewer" -Task "<当前指挥官或任务名>" -Stage "<review阶段>" -State "<watching|aligned|drift|blocked|completed>" -Note "<一句话说明>"

你的输出风格：
- 尽量短
- 重点只说：
  - 当前进度
  - 当前卡点
  - 是否偏离方向
  - 下一步最该做什么
```

---

## 外部监控脚本

第三个终端优先安装定时 watchdog：

```powershell
pwsh -NoProfile -ExecutionPolicy Bypass -File .\scripts\codex-watchdog-task.ps1 -Action install -Mode dual -TaskName CodexDualWatchdog -IntervalMinutes 5
```

如果你想前台盯日志，再额外运行：

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\codex-dual-watchdog.ps1
```

它会持续检查：

- `runtime\codex\executor-heartbeat.json`
- `runtime\codex\reviewer-heartbeat.json`

输出文件：

- `runtime\codex\dual-watchdog-status.json`
- `runtime\codex\dual-watchdog.log`
