# SC2 Mod Workrepo

这个目录是《重生虫心》mod 的独立工作仓。

目标：

- 在安装目录外维护可追踪的改动
- 把参考资料和设计文档固定到本地
- 改完后再同步覆盖到游戏实际读取目录

## 当前结构

- `crys_the_swarm_reborn.SC2Mod/`
  当前工作副本，后续 XML、文本和触发器都在这里改
- `references/`
  本地保存的参考资料副本、索引和工具说明
- `scripts/`
  同步脚本和链路查询脚本

## Live 目录

当前同步目标：

- `E:\\SC2\\SC2new\\StarCraft II\\Mods\\crys_the_swarm_reborn.SC2Mod`

## 使用方式

1. 在本工作仓修改 `crys_the_swarm_reborn.SC2Mod`
2. 用 `git diff` 检查改动
3. 运行 `scripts\\sync-to-live.ps1`
4. 进游戏验证

## Codex 自治规则

如果后续希望 Codex 在这个仓库里少打断、连续推进、自己收口，优先看：

- `AGENTS.md`
- `docs\\Codex自治执行规则.md`
- `docs\\Codex长跑基础提示词.md`
- `docs\\Codex双会话基础提示词.md`
- `docs\\Codex恢复策略.md`

配套心跳与 watchdog：

- `scripts\\codex-heartbeat.ps1`
- `scripts\\codex-watchdog.ps1`
- `scripts\\codex-dual-watchdog.ps1`
- `scripts\\codex-watchdog-task.ps1`

如果你想用“定时 PowerShell / 计划任务”方式长期盯双会话，优先用：

- 安装：
  `pwsh -NoProfile -ExecutionPolicy Bypass -File .\\scripts\\codex-watchdog-task.ps1 -Action install -Mode dual -TaskName CodexDualWatchdog -IntervalMinutes 5`
- 查看状态：
  `pwsh -NoProfile -ExecutionPolicy Bypass -File .\\scripts\\codex-watchdog-task.ps1 -Action status -TaskName CodexDualWatchdog`
- 卸载：
  `pwsh -NoProfile -ExecutionPolicy Bypass -File .\\scripts\\codex-watchdog-task.ps1 -Action uninstall -TaskName CodexDualWatchdog`

## 索引工具

现在统一从 `scripts\\mod-index.ps1` 进入，老脚本仍然保留做兼容。

## 结构化修改工具

现在新增一套 C# 小工具，专门负责“结构化修改”而不是继续手抠 XML：

- 项目：`tools\\Sc2ModTool`
- 入口：`scripts\\sc2mod-edit.ps1`
- 说明：`docs\\结构化XML修改工具.md`

常用命令：

- `powershell -ExecutionPolicy Bypass -File .\\scripts\\sc2mod-edit.ps1 find -Id ImposingPresence`
- `powershell -ExecutionPolicy Bypass -File .\\scripts\\sc2mod-edit.ps1 apply -Patch .\\tools\\patches\\aberration-carapace.patch.json`

当前 patch 能力：

- 改现有 XML 属性：`setXmlAttribute`
- 新增整段 catalog 对象：`appendObject`
- 给现有对象插子节点：`insertChild`
- 改本地化键值：`setStringValue`
- 改触发器/脚本纯文本：`replaceTextInFile`

### 常用命令

- `powershell -ExecutionPolicy Bypass -File .\\scripts\\mod-index.ps1 build`
  重建对象索引、文本缓存和 `references\\unit-index.tsv`
- `powershell -ExecutionPolicy Bypass -File .\\scripts\\mod-index.ps1 lookup -Id SwarmHost`
  查任意 ID 的精确对象、入站/出站引用、本地化文本、原始文件命中
- `powershell -ExecutionPolicy Bypass -File .\\scripts\\mod-index.ps1 unit -Id Brutalisk`
  查单位主链路，适合顺藤摸瓜看武器/能力/效果/行为
- `powershell -ExecutionPolicy Bypass -File .\\scripts\\mod-index.ps1 upgrade -Id QueenNornQueenPurchase`
  查升级、按钮、效果、行为等对象在各 XML 里的引用
- `powershell -ExecutionPolicy Bypass -File .\\scripts\\mod-index.ps1 validate`
  跑常见断链校验，并输出到 `references\\latest-validate-report.md`
- `powershell -ExecutionPolicy Bypass -File .\\scripts\\mod-index.ps1 export`
  只重导单位中文索引

### 生成产物

`references\\index\\` 里现在会有：

- 分类型对象索引：
  `units-index.json` / `abilities-index.json` / `effects-index.json` / `behaviors-index.json` / `weapons-index.json` / `buttons-index.json` / `requirements-index.json` / `validators-index.json` / `upgrades-index.json`
- 跨对象引用：
  `references-index.json`
- 统一反查缓存：
  `lookup-index.json`
- 查找文件清单：
  `lookup-search-files.json`
- 文本表缓存：
  `zhCN-game-strings.json` / `zhCN-object-strings.json` / `zhCN-trigger-strings.json`
  `enUS-game-strings.json` / `enUS-object-strings.json` / `enUS-trigger-strings.json`
- 汇总：
  `catalog-summary.json`

### 什么时候用哪个

- 想先找“这个单位挂了哪些能力/武器/按钮”：`unit`
- 想查“这个升级或按钮到底在哪些地方生效”：`upgrade`
- 想查“一个 ID 在哪里定义、谁引用了它、文本里又出现在哪”：`lookup`
- 改完一轮后想确认没明显断链：`validate`

## 旧脚本

如果需要，也可以直接调用旧脚本：

- `scripts\\find-unit-chain.ps1`
- `scripts\\find-upgrade-chain.ps1`
- `scripts\\export-unit-index.ps1`
- `scripts\\build-object-index.ps1`
- `scripts\\validate-common-refs.ps1`

## 说明

- 参考资料下载时间：`2026-05-19`
- 当前基线来自原始目录 `reborn`
