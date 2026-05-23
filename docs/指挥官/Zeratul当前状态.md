# Zeratul 当前状态

日期：2026-05-23

## 已完成

### 独立模组
- XMZeratul.SC2Mod 已创建，位于 `合作指挥官版起义狂潮/Mods/XM/XMZeratul.SC2Mod`。
- DocumentInfo 声明依赖 `XMCore.SC2Mod`。
- 包含标准的 Base.SC2Data/GameData XML 文件结构
- 包含 zhCN.SC2Data/LocalizedData 目录（已填充 100+ 条本地化字符串）

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

### 中文本地化
- zhCN.SC2Data/LocalizedData/GameStrings.txt 已填充 Zeratul 相关本地化字符串（100+ 条）
- 包括所有技能名称（虚空寻觅者号、灵能漩涡、虚空抑制等）、按钮提示、行为描述等

### 游戏数据
- UnitData.xml 已填充，包含以下核心单位：
  - Zeratul（指挥官单位）
  - MutatorAmonZeratul（突变因子版本）
  - Oracle（先知）
  - OracleStasisTrap（先知力场陷阱）
  - CarrierTaldarim（塔达林航母）
  - ColossusTaldarim（塔达林巨像）
  - DarkTemplarTaldarim（塔达林黑暗圣堂武士）
  - HighTemplarTaldarim（塔达林高阶圣堂武士）
  - ImmortalTaldarim（塔达林不朽者）
  - SentryTaldarim（塔达林机械哨兵）
  - VoidRayTaldarim（塔达林虚空辉光舰）
  - WarpPrismTaldarim（塔达林折跃棱镜）
  - ZealotTaldarim（塔达林狂热者）
  - StalkerTaldarim（塔达林追猎者）
  - ObserverTaldarim（塔达林观测者）
  - PhotonCannonTaldarim（塔达林光子炮台）
  - PylonTaldarim（塔达林水晶塔）
  - GatewayTaldarim（塔达林传送门）
  - CyberneticsCoreTaldarim（塔达林机械台）
  - RoboticsFacilityTaldarim（塔达林机械研究所）
  - StargateTaldarim（塔达林星门）
  - NexusTaldarim（塔达林枢纽）

## 待完成（可选）

### 扩展游戏数据
- UpgradeData.xml、AbilData.xml、BehaviorData.xml 等目前为空
- 这些文件用于扩展或覆盖基础游戏数据，当前为空不影响基本功能
- 如需完整功能，可以从官方数据或相似指挥官模组（如 XMArtanis）中提取并填充

## 验证状态

- ✅ 静态结构完整
- ✅ 核心游戏数据已导入（UnitData.xml，包含 22 个单位定义）
- ✅ 本地化文本已填充（100+ 条）

