# 2026-06-05 XMFinal DocumentHeader 黑屏排查记录

用途：下次直启地图黑屏、卡住、没有进入游戏时，优先按这份文档排查。重点场景是：

- 启动命令能拉起 SC2，但画面黑屏或卡住。
- `C:\Users\22448\Documents\StarCraft II\GameLogs` 没有新的 `ScriptError.txt`。
- 地图只依赖 `XMFinal.SC2Mod`，但指挥官私有模块依赖由 `XMFinal` 统一加载。

## 本次结论

本次 Kerrigan 直启 `ttosh03b.SC2Map` 黑屏的关键问题不是地图脚本里的 Kerrigan 初始化逻辑，而是 live 目录里的：

`E:\SC2\SC2new\StarCraft II\Mods\XM\XMFinal.SC2Mod\DocumentHeader`

和：

`E:\SC2\SC2new\StarCraft II\Mods\XM\XMFinal.SC2Mod\DocumentInfo`

依赖表不一致。

`DocumentInfo` 已经被收敛成当前 Kerrigan/Raynor 可验证的活跃依赖，但 SC2 直启更早读取二进制 `DocumentHeader`。live `DocumentHeader` 当时仍保留旧的 25 个指挥官依赖，导致加载阶段卡住，甚至还没进入正常 Galaxy/MapScript 报错阶段。

修复提交：

```text
56f0d206 fix sc2 live dependency header drift
```

修复方式：

- `scripts/sync-all-to-live.ps1` 在使用 `-MutateXMFinalDocumentMeta` 同步 `XMFinal.SC2Mod` 后，会读取 live `DocumentInfo` 中非注释的 `<Value>` 依赖。
- 脚本会用这些活跃依赖重写 live `XMFinal.SC2Mod\DocumentHeader` 的二进制依赖表。
- 脚本会先备份 live `DocumentHeader`。
- source 文件 `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/DocumentHeader` 仍然禁止修改。

## 快速判断树

### 1. 先看这次有没有真正进到脚本阶段

日志目录：

```powershell
$logRoot = "$env:USERPROFILE\Documents\StarCraft II\GameLogs"
Get-ChildItem -LiteralPath $logRoot |
  Sort-Object LastWriteTime -Descending |
  Select-Object -First 20 Name, LastWriteTime, Length
```

判断：

- 有新的 `ScriptError.txt`：已经进入脚本编译/运行阶段，继续看 `ScriptError.txt` 里的 `Near line ...`。
- 只有新的 `SystemInfo.txt` 和 `Graphics.txt`，没有新的 `Alerts.txt`：通常还没进入正常 catalog/script alert 阶段，优先怀疑依赖、打包、DocumentHeader、DocumentInfo、资源加载。
- 有新的 `Alerts.txt`，没有新的 `ScriptError.txt`：至少已经过了更早的加载阶段，继续查 `Alerts.txt` 里的 catalog/资源警告。
- 有 `SIGEER ... Crash`：说明进程崩溃或被终止，仍要结合前面的 `Alerts.txt` / `ScriptError.txt` 判断崩溃前走到哪里。

### 2. 如果没有新的 ScriptError，不要继续盯 MapScript 行号

没有新的 `ScriptError.txt` 时，不能用旧的 `ScriptError.txt` 作为本轮根因。旧日志只说明旧问题存在过，不代表当前黑屏还卡在同一处。

本次反例：

- 旧日志 `2026-06-05 18.19.18 ScriptError.txt` 报 `脚本读取失败：函数已声明但尚未定义`。
- 后续黑屏启动只产生 `SystemInfo.txt` / `Graphics.txt`，没有新的 `ScriptError.txt`。
- 这说明后续问题已经更早，旧 ScriptError 不再是当前启动失败的直接证据。

### 3. 核对 XMFinal live 依赖是否漂移

当前 `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/DocumentInfo` 的活跃依赖数应为 16：

```text
bnet:自由之翼剧情 (战役)/0.0/999,file:Campaigns/LibertyStory.SC2Campaign
file:Mods\XM\XMMutator.SC2Mod
file:Mods\XM\XMNeut.SC2Mod
file:Mods\XM\XMMira.SC2Mod
file:Mods\XM\XMMengsk.SC2Mod
file:Mods\XM\XMProbe.SC2Mod
file:Mods\XM\XMSCV.SC2Mod
file:Mods\XM\XMTychus.SC2Mod
file:Mods\XM\XMDehaka.SC2Mod
file:Mods\XM\XMStukov.SC2Mod
file:Mods\XM\XMShop.SC2Mod
file:Mods\XM\XMNova.SC2Mod
file:Mods\XM\XMSwann.SC2Mod
file:Mods\XM\XMStetmann.SC2Mod
file:Mods\XM\XMKerrigan.SC2Mod
file:Mods\XM\XMRaynor.SC2Mod
```

注意：

- `XMAbathur.SC2Mod`、`XMAbathurReborn.SC2Mod` 等当前仍在 `DocumentInfo` 注释区，不能算活跃依赖。
- 旧文档里出现的 “XMFinal 依赖数 25” 是过期状态，不能作为当前 live 判断依据。

## 标准恢复动作

如果怀疑 live 依赖漂移，优先运行：

```powershell
pwsh -NoProfile -ExecutionPolicy Bypass -File .\scripts\sync-all-to-live.ps1 -MutateXMFinalDocumentMeta
```

预期输出里应出现：

```text
NORMALIZED_XMFINAL_DOCUMENTHEADER=16
```

或者：

```text
NORMALIZED_XMFINAL_DOCUMENTHEADER=unchanged
```

含义：

- `NORMALIZED_XMFINAL_DOCUMENTHEADER=16`：脚本刚把 live `DocumentHeader` 重写成 16 个活跃依赖。
- `NORMALIZED_XMFINAL_DOCUMENTHEADER=unchanged`：live `DocumentHeader` 已经和 live `DocumentInfo` 活跃依赖一致。

禁止动作：

- 不要直接修改 `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/DocumentHeader`。
- 不要把某个指挥官依赖直接加到 `ttosh03b.SC2Map`。
- 不要因为地图黑屏就先改 MapScript；没有新的 `ScriptError.txt` 时，MapScript 通常还不是第一嫌疑。

## 本次证据时间线

### 修复前

启动命令：

```powershell
pwsh -NoProfile -ExecutionPolicy Bypass -File "C:\Users\22448\Downloads\重生虫心0.71汉化版（新）\reborn_workrepo\scripts\launch-xm-map.ps1" -Commander Kerrigan -MapPath "E:\SC2\SC2new\StarCraft II\Maps\XM\ttosh03b.SC2Map"
```

日志现象：

```text
2026-06-05 19.54.05 SystemInfo.txt
2026-06-05 19.54.08 Graphics.txt
```

没有同时间新的：

```text
Alerts.txt
ScriptError.txt
```

判断：失败发生在正常 alert/script 日志之前，优先查 live 依赖和 metadata。

### 手动验证后

手动把 live `XMFinal.SC2Mod\DocumentHeader` 重写为 `DocumentInfo` 活跃依赖后，启动产生：

```text
2026-06-05 20.04.40 Alerts.txt
```

判断：依赖漂移修复后，SC2 至少能推进到 alert 阶段。

### 脚本修复后

提交 `56f0d206` 后，用同步脚本再次规范化 live `DocumentHeader`，启动产生：

```text
2026-06-05 20.14.06 SystemInfo.txt
2026-06-05 20.14.08 Graphics.txt
2026-06-05 20.14.37 Alerts.txt
```

没有新的 `ScriptError.txt`。

判断：`DocumentHeader` 漂移导致的更早加载阻塞已被解除。后续如果仍有玩法、基地、英雄、catalog 警告问题，应从新的 `Alerts.txt` 或实机画面继续排，而不是回到旧的 `ScriptError.txt`。

## 下次排查顺序

1. 列出 `GameLogs` 最新 20 个文件，确认本轮有没有 `ScriptError.txt`。
2. 如果没有 `ScriptError.txt`，确认有没有 `Alerts.txt`。
3. 如果只有 `SystemInfo.txt` / `Graphics.txt`，先跑 `sync-all-to-live.ps1 -MutateXMFinalDocumentMeta`。
4. 再启动同一张地图，观察是否开始产生 `Alerts.txt`。
5. 如果有 `Alerts.txt`，优先筛 `Error`、`Warning`、`Catalog`、`Dependency`、`Could not`、`Missing`。
6. 如果有新的 `ScriptError.txt`，再按 Galaxy 行号查 `MapScript.galaxy` 或对应 `Lib*.galaxy`。
7. 如果进了游戏但基地/英雄不对，再查 `CommanderAchUnit("CommandCenter"/"Worker"/"SecondUnit")`、指挥官 runtime include、以及对应私有 `SC2Mod` 是否在 `XMFinal` 活跃依赖里。

## 常用命令

查看最新日志：

```powershell
$logRoot = "$env:USERPROFILE\Documents\StarCraft II\GameLogs"
Get-ChildItem -LiteralPath $logRoot |
  Sort-Object LastWriteTime -Descending |
  Select-Object -First 20 Name, LastWriteTime, Length
```

同步并规范化 live `XMFinal` metadata：

```powershell
pwsh -NoProfile -ExecutionPolicy Bypass -File .\scripts\sync-all-to-live.ps1 -MutateXMFinalDocumentMeta
```

启动 Kerrigan + `ttosh03b`：

```powershell
pwsh -NoProfile -ExecutionPolicy Bypass -File .\scripts\launch-xm-map.ps1 -Commander Kerrigan -MapPath "E:\SC2\SC2new\StarCraft II\Maps\XM\ttosh03b.SC2Map"
```

检查 `DocumentInfo` 活跃依赖数量：

```powershell
$documentInfo = ".\合作指挥官版起义狂潮\Mods\XM\XMFinal.SC2Mod\DocumentInfo"
$text = Get-Content -LiteralPath $documentInfo -Raw
$active = [regex]::Replace($text, '<!--[\s\S]*?-->', '')
[regex]::Matches($active, '<Value>([^<]+)</Value>') |
  ForEach-Object { $_.Groups[1].Value }
```

## 剩余风险

- 本次验证证明黑屏能从“没有 Alerts/ScriptError 的更早加载阻塞”推进到产生 `Alerts.txt`，但没有完成 Kerrigan 实机画面级验证。
- `Alerts.txt` 里仍可能存在全局 catalog 警告，需按最新日志逐项区分“阻塞启动”和“遗留噪音”。
- 当前只应激活已验证的 Kerrigan/Raynor 私有依赖；阿巴瑟、菲尼克斯、泽拉图等指挥官私有依赖不要因为旧文档或旧 `DocumentHeader` 记录而批量重新启用。
