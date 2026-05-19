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
  本地保存的参考资料副本和索引说明
- `scripts/`
  同步脚本

## Live 目录

当前同步目标：

- `E:\\SC2\\SC2new\\StarCraft II\\Mods\\crys_the_swarm_reborn.SC2Mod`

## 使用方式

1. 在本工作仓修改 `crys_the_swarm_reborn.SC2Mod`
2. 用 `git diff` 检查改动
3. 运行 `scripts\\sync-to-live.ps1`
4. 进游戏验证

## 说明

- 参考资料下载时间：`2026-05-19`
- 当前基线来自原始目录 `reborn`
