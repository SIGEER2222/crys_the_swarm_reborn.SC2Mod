# MPQEditor 控制台指令速查

## 进入方式

- `MPQEditor.exe /console` 打开 MoPaQ 2000 控制台。
- `MPQEditor.exe /console script.txt` 会在进入后直接执行脚本。
- 命令前加 `/` 会显示控制台，例如 `/extract`；不加 `/` 也能直接执行。

## 命令表

| 命令 | 说明 | 语法 |
| --- | --- | --- |
| `new` / `n` | 新建 MPQ，必要时会把现有文件转成 MPQ。 | 新建时可带文件数上限。 |
| `open` / `o` | 打开现有 MPQ。 | 可附带 listfile。 |
| `openpatch` / `op` | 以补丁链方式打开多个 MPQ。 | 基础包在前，补丁包按旧到新排列。 |
| `add` / `a` | 向 MPQ 添加或替换文件。 | 可控制 WAVE、压缩、自动命名和递归打包。 |
| `extract` / `e` | 从 MPQ 提取文件。 | 可保留原路径、转小写、指定 listfile。 |
| `rename` / `r` | 重命名 MPQ 内文件。 | 直接改内部路径名。 |
| `move` / `m` | 移动 MPQ 内文件目录。 | 只改目录层级，不改文件名。 |
| `delete` / `d` | 删除 MPQ 内文件。 | 直接移除条目。 |
| `flush` / `f` | 把当前修改写回档案。 | 通常和 `compact` 一起理解。 |
| `compact` | 压缩并回收空洞。 | 处理完增删改后建议跑一次。 |
| `htsize` / `t` | 调整哈希表大小。 | 适合大包或大量文件时重整。 |
| `list` / `l` | 列出 MPQ 内文件。 | 可输出到屏幕或文本。 |
| `mksv` / `mksvf` | 生成每个文件的 MD5 列表。 | 命名在不同说明里有出入。 |
| `close` / `c` | 关闭当前 MPQ | `c[lose]` |
| `script` / `s` | 执行脚本文件。 | 可批量跑控制台命令。 |
| `chdir` / `cd` | 切换当前目录。 | 也写作 `cd`。 |
| `exit` / `x` | 退出控制台并关闭已打开 MPQ | `exit` |
| `quit` / `q` | 同 `exit` | `quit` |
| `help` / `h` | 查看命令帮助。 | 可跟单个命令名。 |
| `ver` / `v` | 查看版本 | `v[er]` |
| `version` | 查看版本 | `version` |
| `console` | 进入控制台模式 | `console` |

## 常用例子

```text
help extract
extract tmp_Launcher_abathur_root.SC2Map MapScript.galaxy tmp_verify_abathur_root /fp
extract tmp_Launcher_abathur_root.SC2Map Base.SC2Data\GameData\UserData.xml tmp_verify_abathur_root /fp
add tmp_Launcher_abathur.SC2Map tools\launcher_mpq\* * /r
compact tmp_Launcher_abathur.SC2Map
```

## 注意点

- `extract` 对乱码/混淆地图通常只能按真实存储名提取，`*` 可以提取全部文件。
- `add` 的音频选项在不同说明里有 `/wav` 和 `/wave` 两种写法。
- `mksv` / `mksvf` 的命名在不同说明里不完全一致。

## 来源

- Ladik's MPQ Editor HIVE 说明页
- `tools\mpq\mpqeditor\History.txt`
