# 2026-06-01 ttosh03b 凯瑞甘修正与实测

## 现象

- `ttosh03b.SC2Map` 在凯瑞甘分支下仍然表现为黑屏。
- 这次实测没有再出现新的 `ScriptError.txt`。
- `Graphics.txt` 里仍能看到 `Lost D3D9 device` / `D3D9 Device Reset`，说明引擎层还存在画面重置现象。

## 本次修正

- 将 `ttosh03b.SC2Map` 的 `Kerrigan` 分支从“再创建一次 `K5Kerrigan`”改成直接复用 `InitializeBase()` 已经初始化好的英雄实例。
- 在 `InitializeBase()` 返回后立刻把 `gv_nova` 绑定到 `UnitLastCreated()`，避免后续逻辑拿到一个未额外挂接的第二英雄实例。

## 关键文件

- `合作指挥官版起义狂潮/Maps/XM/ttosh03b.SC2Map/MapScript.galaxy`

## 当前判断

- 逻辑层面，凯瑞甘分支的“重复生成 + 错位引用”问题已经修掉。
- 如果黑屏仍存在，更像是地图/引擎层的画面重置或后续脚本链问题，而不是这次这处英雄绑定错误。
