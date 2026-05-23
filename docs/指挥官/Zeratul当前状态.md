# Zeratul 当前状态

日期：2026-05-23

## 已完成

### 独立模组
- XMZeratul.SC2Mod 已创建，位于 `合作指挥官版起义狂潮/Mods/XM/XMZeratul.SC2Mod`。
- DocumentInfo 声明依赖 `XMCore.SC2Mod`。
- 包含标准的 Base.SC2Data/GameData XML 文件结构
- 包含 zhCN.SC2Data/LocalizedData 目录

### XMCore 指挥官数据
- XMCore.SC2Mod/Base.SC2Data/GameData/UserData.xml 中 `<Instances Id="Zeratul">` 已完整定义。
- 包含完整的 TitU、TitP、DesU、DesP、Upg、Poi 配置。

### XMFinal 运行时
- `XMFinal.SC2Mod/DocumentInfo` 已包含对 XMZeratul.SC2Mod 的依赖。
- Galaxy 脚本已实现：
  - `libE0EAE146_gf_ApplyZeratulCommanderRuntime()`
  - `libE0EAE146_gf_ZeratulCreateMapStartSquad()`
  - 地图启动分支、皮肤配置、控制台等已完整。

### Launcher 候选
- LauncherAuto.SC2Map 中已有：
  - 指挥官列表包含 Zeratul
  - 头像配置已设置
  - UI 配置已就绪。

## 待完成

### 游戏数据导入
- 目前 Base.SC2Data/GameData XML 文件是空的，需要：
  - 从官方数据或 XMArtanis.SC2Mod 中提取 Zeratul 相关数据
  - 导入到 XMZeratul.SC2Mod 中的相应文件

### 中文本地化
- zhCN.SC2Data/LocalizedData/GameStrings.txt 需要填充中文文本

## 验证状态

- ⚠️ 静态结构基本完整，但核心游戏数据尚未导入
- ⚠️ 本地化文本尚未填充

