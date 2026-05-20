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

## 查链路工具

- `scripts\\find-unit-chain.ps1`
  输入单位 ID，输出单位 -> 武器/能力 -> 效果/行为 的主要链路
- `scripts\\find-upgrade-chain.ps1`
  输入升级、按钮、效果、行为等 ID，输出精确对象和跨文件引用
- `scripts\\export-unit-index.ps1`
  导出单位 ID / 中文名基础索引到 `references\\unit-index.tsv`
- `scripts\\build-object-index.ps1`
  导出分类型 JSON 索引与跨对象引用图到 `references\\index\\`
- `scripts\\validate-common-refs.ps1`
  检查常见 Ability / Effect / Behavior / Unit / Weapon / Requirement 断链，并输出报告

常用示例：

- `powershell -ExecutionPolicy Bypass -File .\\scripts\\find-unit-chain.ps1 -UnitId Devourer`
- `powershell -ExecutionPolicy Bypass -File .\\scripts\\find-upgrade-chain.ps1 -Id AbathurCasterBrainPoolPurchase`
- `powershell -ExecutionPolicy Bypass -File .\\scripts\\export-unit-index.ps1`
- `powershell -ExecutionPolicy Bypass -File .\\scripts\\build-object-index.ps1`
- `powershell -ExecutionPolicy Bypass -File .\\scripts\\validate-common-refs.ps1`

## 说明

- 参考资料下载时间：`2026-05-19`
- 当前基线来自原始目录 `reborn`
