# Karax 当前状态

日期：2026-05-23

## 已经成立

### 独立模组

- `XMKarax.SC2Mod` 已存在，位于 `合作指挥官版起义狂潮/Mods/XM/XMKarax.SC2Mod`。
- DocumentInfo 声明依赖 `XMCore.SC2Mod`。
- 包含 16 个 GameData XML 文件（UnitData / AbilData / ButtonData / UpgradeData / BehaviorData / EffectData / CommanderData / etc.）。
- 包含完整中文 GameStrings。
- 已从官方 starcoop 导入 6282 条记录（见 `references/official-karax-import-summary.tsv`）。

### 关键 GameData 对象

| 对象类型 | ID |
|---|---|
| Unit | SoACasterKarax（亚顿之矛） |
| Unit | SolarForge（太阳锻炉） |
| Unit | KhaydarinMonolith（凯达琳巨石） |
| Unit | Energizer |
| Unit | KaraxChampion |
| Abil | SOAOrbitalStrikeKarax / SOAOrbitalStrikeActivate |
| Abil | SOAThermalLanceActivate |
| Abil | SOAMapWideChrono |
| Abil | SolarForgeResearch |
| Upgrade | KaraxCommander |
| Upgrade | SOASolarLanceUpgrade |
| Upgrade | KaraxTurretRange |
| Upgrade | KaraxTurretAttackSpeed |
| Upgrade | KaraxEnergyRegenUpgrade |
| Commander | ProtossKarax |
| 全部 Mastery | MasteryKarax* (6个) |
| 全部 Prestige | CommanderPrestigeKarax* (7个) |

### XMCore CommanderAch

`XMCore.SC2Mod/Base.SC2Data/GameData/UserData.xml` 中 `<Instances Id="Karax">` 已完整定义：

- TitU (7项)：亚顿之矛 / 轨道轰炸 / 净化光束 / 时空波动 / 太阳锻炉 / 强化瞄准 / 军械优化 / 快速恢复
- TitP (5项)：建筑提速 / 强化建筑生命值和护盾 / 重构光束额外目标 / 强化时空波动 / 增加初始能量 / 单位消耗降低
- DesU / DesP：完整的启用说明和强化说明
- Upg (8项)：KaraxCommander + SOAOrbitalStrike + SOAThermalLance + SOAMapWideChrono + SOASolarLanceUpgrade + KaraxTurretRange + KaraxTurretAttackSpeed + KaraxEnergyRegenUpgrade
- Poi (6项)：全部 6 个 Mastery 映射
- CommandCenter: Nexus / SecondUnit: Pylon / Worker: Probe

### XMFinal DocumentInfo

`XMFinal.SC2Mod/DocumentInfo` 已包含：
```
<Value>file:Mods\XM\XMKarax.SC2Mod</Value>
```

### Galaxy Runtime 函数

`XMFinal/Base.SC2Data/LibE0EAE146.galaxy` 已包含：

- `libE0EAE146_gf_ApplyKaraxCommanderRuntime()` — 激活 13 个 TechTreeAbilityAllow、设置 KaraxCommander 和 CommanderLevel(15)
- `libE0EAE146_gf_KaraxCreateMapStartSquad(string, int, point)` — 支持 light/heavy/air/hero 四种开局
- `libE0EAE146_gf_KaraxCreateMapStartSquadInRegion(string, int, region)` — 区域封装
- 调度分支：`libE0EAE146_gv_commander == "Karax"` → `ApplyKaraxCommanderRuntime()`
- 面板分支：`auto09490B45_val == "Karax"` → 创建 SoACasterKarax + CU_GPInit + KaraxCreateMapStartSquad
- 控制台皮肤：`autoC0933116_val == "Karax"` → `ConsoleProtoss_Karax` + 人口上限 +60

### Launcher 候选

`合作指挥官版起义狂潮/Maps/XM/LauncherAuto.SC2Map`：

- `Base.SC2Data/GameData/UserData.xml`：Commander String[13]="Karax"、CommanderPortrait[13]="ui_btn_commanderportrait_karax.dds"、Por[13]="ID_Por_013"
- `zhCN.SC2Data/LocalizedData/GameStrings.txt`：ID_Por_013 + 28 行 Karax 成就文本（TitU/TitP/DesU/DesP）

### 中文文本

| Key | 文本 |
|---|---|
| GameStrings/Karax | 凯拉克斯 |
| Unit/Name/SoACasterKarax | 亚顿之矛 |
| Unit/Name/SolarForge | 太阳锻炉 |
| Abil/Name/SOAMapWideChrono | 时空波动 |
| Abil/Name/SOAOrbitalStrikeKarax | 轨道轰炸 |
| Abil/Name/SOAThermalLanceActivate | 净化光束 |

### 面板模板说明

**当前配置**: `CU_GPInit(1, "Karax", UnitLastCreated(), null)`

**说明**: 
- 第四个参数传入 `null` 表示使用默认面板模板
- 官方数据中**没有独立的 `KaraxGlobalCommandPanelTemplate`**
- 这与阿巴瑟类似，凯拉克斯不像德哈卡那样有专属的面板模板
- 传入 `null` 是正确的做法，使用默认的 Protoss 面板模板

## 待收口

### 实机验证 ⚠️

当前所有链路均为静态确认，尚未实机验证。需在游戏中实际选 Karax 进图确认：

1. Launcher 中 Karax 头像和文本是否正常显示
2. 选择 Karax 后是否正确创建 SoACasterKarax（亚顿之矛）
3. 轨道轰炸 / 净化光束 / 时空波动 三个主动技能是否可使用
4. 太阳锻炉升级是否生效
5. 防御建筑（光子炮台等）是否按 Karax 体系运作
6. Mastery 面板是否正确读取 6 个 Poi 映射

### 地图分支

Karax 作为 Protoss 三雄之一（Artanis 体系），需要在关键合作地图中有对应的开局分支。当前 `libE0EAE146_gf_KaraxCreateMapStartSquad` 只提供 Zealot + SentryPhasing 的 light/heavy/air/hero 组合，但各地图需要：

- 指定开局编队
- 连接面板按钮
- 基地 / 开局资源配置

### 声望（Prestige）

XMKarax 包含 7 个 Prestige 定义，但 Galaxy runtime 中尚未接入 Prestige 分支逻辑（类似 Artanis/Vorazun 的声望选择）。

## 验证脚本

静态校验已通过：
```
scripts/validate-karax-port.ps1
```

覆盖：模块结构 / GameData 对象 / XMCore CommanderAch / XMFinal Galaxy / Launcher 候选，共 39 项检查。

## 结论

Karax 的数据层和 runtime 调度层已完整接入 XMFinal 体系，中文文本和 Launcher 候选也已配置。当前状态为**静态链路闭环，实机待验证收口**。

