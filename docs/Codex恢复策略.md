# Codex 恢复策略

这份文档只回答一个问题：

如果 Codex 夜里停住了，第二天怎么快速恢复。

## 现实限制

当前这套方案能做到：

- 双会话持续留 heartbeat
- watchdog 发现 stale / drift / task mismatch
- 自动生成恢复材料

当前这套方案做不到：

- 在没有外部可编程 API 的情况下，自动往 Codex 桌面会话里继续发送下一条消息
- 让已经完成或停住的桌面会话自己无条件永动

所以这套系统的正确目标不是“绝对不停机”，而是：

- 一旦停了，能立刻知道
- 一旦停了，能立刻恢复
- 不需要第二天重新翻半小时上下文

## 恢复文件

当 `scripts/codex-dual-watchdog.ps1` 检测到异常时，会自动生成：

- `runtime/codex/recovery-context.json`
- `runtime/codex/recovery-note.md`

其中：

- `recovery-context.json` 适合脚本和结构化读取
- `recovery-note.md` 适合人直接看

## 第二天恢复顺序

1. 先看：
   - `runtime/codex/dual-watchdog-status.json`
   - `runtime/codex/recovery-note.md`
2. 再看：
   - `runtime/codex/executor-heartbeat.json`
   - `runtime/codex/reviewer-heartbeat.json`
3. 最后决定：
   - 继续原任务
   - 先解决 reviewer 指出的 drift / blocker

## 对执行者的要求

如果执行者准备停在一个 blocker 上，不要只写：

- `blocked`

而要尽量在 heartbeat note 里写清：

- 当前阶段
- 已拿到的证据
- 当前真实 blocker
- 下一步最应该做什么

这样 watchdog 生成的恢复摘要才有价值。

## 对监督者的要求

监督者最重要的不是重复执行者内容，而是写出：

- 当前是不是偏离方向
- 当前是不是假完成
- 现在应该盯哪个验证点

恢复时，优先相信监督者对风险的判断。
