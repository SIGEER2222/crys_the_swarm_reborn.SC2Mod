# 2026-06-01 继续测试：CommanderTestBench 与 ttosh03b

## 本轮结论

- `CommanderTestBench.SC2Map` 不适合直接在 `MapInit` 时自动跑 `XMTestBench_RunBootSmoke()`。
- 原因是这张图上的运行原点会落到无效位置，自动创建单位时会报 `无效的位置：80.5,40.5 / 86.5,40.5`。
- `ttosh03b.SC2Map` 的 `Kerrigan` 分支继续实测时，仍会出现 `Lost D3D9 device / D3D9 Device Reset`，但没有新增 `ScriptError.txt`。

## 本轮改动

- 给 `CommanderTestBench.SC2Map/MapScript.galaxy` 加了启动日志，并尝试把 boot smoke 接到 `MapInit`。
- 实测后发现自动 smoke 会撞到无效原点，因此已回退为仅建 UI，不再在 `MapInit` 自动开跑。
- `ttosh03b.SC2Map/MapScript.galaxy` 之前的 `Kerrigan` 修正仍保留。

## 观察到的日志

- `ttosh03b` 这次启动时，`Alerts.txt` 里仍有 `K5KerriganPsiStrike` / `K5Kerrigan` 的“技能过多”告警。
- `Graphics.txt` 在进入过程中仍出现 `Lost D3D9 device`。
- 这轮没有看到新的脚本级错误。

## 当前判断

- `CommanderTestBench` 需要有效起点或单独的安全原点适配，不能直接拿来做自动 smoke 回归。
- `ttosh03b` 的 `Kerrigan` 问题目前更像图形/加载层的重置，而不是触发器脚本报错。

## 11:45 复测

- 重新启动 `ttosh03b.SC2Map` 后，最新日志仍停在 `Lost D3D9 device` / `D3D9 Device Reset from unknown returned e_errorKindGfx(0)`。
- `Alerts.txt` 里仍只看到 `K5Kerrigan` / `K5KerriganPsiStrike` 的“技能过多”警告，没有新的 `ScriptError.txt`。
- 这说明当前还没进到足够稳定的实机状态，暂时无法用这轮启动结果验证“技能点是否真正生效”。

## 12:03 Kerrigan 复测

- 这轮已成功以 `Kerrigan` 启动 `ttosh03b.SC2Map`，并进入实际游戏画面。
- 当前屏幕里能看到 `Kerrigan` 的英雄头像和地面单位，说明不是卡在黑屏或纯加载阶段。
- 最新 `Graphics.txt` 仍然只记录到 `Lost D3D9 device` / `D3D9 Device Reset from unknown returned e_errorKindGfx(0)`，没有新增脚本级错误。
- 最新 `Alerts.txt` 里可见 `K5Kerrigan` / `K5KerriganPsiStrike` 的“技能过多”警告，说明这条分支的技能映射还需要继续核对，但至少已能稳定进图。
- 当前截图证据：`C:\Users\22448\AppData\Local\Temp\sc2-live-120508.png`
