# 凯瑞甘移植进度

本文记录 Kerrigan 合作指挥官移植进度，供后续 AI/开发者继续接手。

## 参考原则

本次不以仍未完成的阿巴瑟作为完成度模板，而是参考已成功接入的德哈卡、斯托科夫、斯旺、诺娃等指挥官。

采用的成熟模式：

- 指挥官拥有独立 `XM*.SC2Mod` 模块。
- Launcher 通过 `CommanderPreset` 选择指挥官并写入 `CampaignXCore.SC2Bank`。
- 任务图通过 `libE0EAE146_gv_commander` 读取当前指挥官。
- 标准基地图走 `libE0EAE146_gf_InitializeBase`。
- 特殊剧情图按指挥官补地图分支。
- 顶部面板通过 `CoopGlobalCaster` 类型单位 + `lib67C0F0E7_gf_CU_GPInit` 接入。

## 数据来源

官方数据来源：

```text
references/official-casc-export/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata
```

导入脚本：

```text
scripts/import-official-kerrigan-data.ps1
```

导入摘要：

```text
references/official-kerrigan-import-summary.tsv
```

导入目标：

```text
合作指挥官版起义狂潮/Mods/XM/XMKerrigan.SC2Mod
```

当前导入了 4720 个官方 Kerrigan 相关 catalog 对象，包含但不限于：

- `Kerrigan`
- `K5Kerrigan`
- `K5KerriganBurrowed`
- `CoopCasterKerrigan`
- `PrimalSlash`
- `MindBolt`
- `PsiStrike`
- `PsionicLift`
- `KerriganChainLightning`
- `KerriganVoidCoopEconDrop`
- `KerriganSpawnBanelings`
- `KerriganAssimilationAura`
- `CommanderPrestigeKerriganAbilities`
- `CommanderPrestigeKerriganAssimilationAura`
- `CommanderPrestigeKerriganMalignantCreep`
- `MasteryKerrigan*`
- `KerriganLevel02` 到 `KerriganLevel15` 的 `UserData`

## 已创建模块

新增：

```text
合作指挥官版起义狂潮/Mods/XM/XMKerrigan.SC2Mod
```

模块包含：

- `DocumentHeader`
- `DocumentInfo`
- `GameData.version`
- `GameText.version`
- `Triggers.version`
- `PreloadAssetDB.txt`
- `Base.SC2Data/GameData/*.xml`
- `zhCN.SC2Data/LocalizedData/GameStrings.txt`

`DocumentInfo` 当前依赖：

```text
file:Mods\XM\XMCore.SC2Mod
```

## XMCore 接入

修改：

```text
合作指挥官版起义狂潮/Mods/XM/XMCore.SC2Mod/Base.SC2Data/GameData/UserData.xml
```

新增：

```text
CommanderAch/Kerrigan
```

第一阶段标准开局采用保守虫族单位：

```text
CommandCenter = Hatchery
Worker = Drone
SecondUnit = Overlord
```

第一阶段不直接使用未验证的 Kerrigan 专属基地单位，避免出现阿巴瑟曾遇到的“专属基地/工蜂导致基地消失”问题。

升级字段目前接入：

```text
Upg[0] = KerriganCommander
Upg[1] = KerriganHeroicFortitude
Upg[2] = K5Cooldowns
Upg[3] = KerriganLevel10
Upg[4] = CommanderPrestigeKerriganAbilities
Upg[5] = CommanderPrestigeKerriganAssimilationAura
Upg[6] = CommanderPrestigeKerriganMalignantCreep
Upg[7] = KerriganLevel15
```

精通字段目前接入：

```text
Poi[0] = MasteryKerriganAssimilationAuraDuration
Poi[1] = MasteryKerriganAttackDamage
Poi[2] = MasteryKerriganEnergyRegen
Poi[3] = MasteryKerriganArmyGasCost
Poi[4] = MasteryKerriganLarvaRate
Poi[5] = MasteryKerriganCocoonTimer
```

## Launcher 接入

修改：

```text
合作指挥官版起义狂潮/Maps/XM/LauncherAuto.SC2Map/MapScript.galaxy
合作指挥官版起义狂潮/Maps/XM/LauncherAuto.SC2Map/Base.SC2Data/GameData/UserData.xml
合作指挥官版起义狂潮/Maps/XM/LauncherAuto.SC2Map/zhCN.SC2Data/LocalizedData/GameStrings.txt
```

已完成：

- `gv_commanderNum` 从 `8` 改为 `9`，即 0 到 9 共 10 个候选。
- `CommanderPreset` 字段 Count 从 9 扩展到 10。
- 新增第 10 个候选 `Kerrigan`。
- 新增头像 `Assets\Textures\ui_btn_commanderportrait_kerrigan.dds`。
- 新增中文文本 `凯瑞甘` 和升级/精通说明文本。

当前候选顺序：

```text
Stukov
Dehaka
Tychus
Mira
Nova
Mengsk
Swann
Stetmann
Abathur
Kerrigan
```

## XMFinal 初始化接入

修改：

```text
合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146.galaxy
```

已完成：

- `CommanderBaseInit` 增加 `Kerrigan` 控制台和补给处理。
- 标准基地初始化增加 `Kerrigan` 分支。
- 创建 `CoopCasterKerrigan`。
- 调用 `lib67C0F0E7_gf_CU_GPInit(1, "Kerrigan", UnitLastCreated(), null)`。
- 显示顶部面板。
- 若 `lp_createHero == true`，在 `lp_secondUnit` 创建 `K5Kerrigan`。

## 技能面板接入状态修正

实机核对后需要修正：凯瑞甘官方合作指挥官并不是德哈卡/斯旺那种强依赖顶部召唤面板的类型。凯瑞甘的核心技能主要在英雄本体 `K5Kerrigan` 的命令卡上，包括跳斩、灵能位移/风暴、同化光环等。当前第一阶段创建的 `CoopCasterKerrigan` 和 `CU_GPInitKerrigan` 只是通用顶部面板占位，不应被视为“凯瑞甘顶部技能面板已完成”。

当前结论：

- `K5Kerrigan`：核心英雄与主要技能载体，已导入并已用于标准基地/特殊剧情图。
- `CoopCasterKerrigan`：官方数据存在，当前已导入，但尚未确认其是否需要在本战役框架中显示顶部按钮。
- `CU_GPInitKerrigan`：当前为通用虫族面板占位，后续可以删除、隐藏，或仅在确认官方全局技能需求后再完善。
- 后续重点应优先接通凯瑞甘建筑/训练链，而不是优先打磨顶部面板。

## 凯瑞甘建筑与兵种清单

### 当前已导入且可作为凯瑞甘核心体系的建筑

| 类型 | ID | 状态 |
|---|---|---|
| 主基地 | `Hatchery` | 已导入，当前 CommanderAch 开局使用 |
| 主基地升级 | `Lair` | 已导入，训练链未专项验证 |
| 主基地升级 | `Hive` | 已导入，训练链未专项验证 |
| 采气 | `Extractor` | 已导入，训练链未专项验证 |
| 基础科技 | `SpawningPool` | 已导入，训练链未专项验证 |
| 攻防科技 | `EvolutionChamber` | 已导入，训练链未专项验证 |
| 蟑螂科技 | `RoachWarren` | 已导入，训练链未专项验证 |
| 凯瑞甘蟑螂科技 | `GreaterRoachWarren` | 已导入，训练链未专项验证 |
| 刺蛇科技 | `HydraliskDen` | 已导入，训练链未专项验证 |
| 潜伏者科技 | `LurkerDen` | 已导入，训练链未专项验证 |
| 飞龙科技 | `Spire` | 已导入，训练链未专项验证 |
| 大龙塔 | `GreaterSpire` | 已导入，训练链未专项验证 |
| 雷兽科技 | `UltraliskCavern` | 已导入，训练链未专项验证 |
| 毒爆虫巢 | `BanelingNest` | 已导入，训练链未专项验证 |
| 坑道网络 | `NydusNetwork` | 已导入，训练链未专项验证 |
| 强化坑道 | `GreaterNydusWorm` | 已导入，训练链未专项验证 |

当前补充确认：`BanelingNest` 已经通过导入脚本补入。

### 当前已导入且可作为凯瑞甘核心体系的单位

| 类型 | ID | 状态 |
|---|---|---|
| 英雄 | `K5Kerrigan` | 已导入，已用于开局/特殊图 |
| 英雄潜地形态 | `K5KerriganBurrowed` | 已导入 |
| 复活茧 | `KerriganReviveCocoon` | 已导入，复活闭环未接通 |
| 工蜂 | `Drone` | 已导入，当前 CommanderAch 开局使用 |
| 王虫 | `Overlord` | 已导入，当前 CommanderAch 开局使用 |
| 监察王虫 | `Overseer` | 已导入，训练链未专项验证 |
| 跳虫 | `Zergling` | 已导入 |
| 猛禽跳虫 | `HotSRaptor` | 已导入 |
| 女王 | `Queen` | 已导入 |
| 蟑螂 | `Roach` | 已导入 |
| 邪恶蟑螂/变体 | `RoachVile` | 已导入 |
| 刺蛇 | `Hydralisk` | 已导入 |
| 穿刺者/潜伏者系 | `HydraliskImpaler` | 已导入 |
| 飞龙 | `Mutalisk` | 已导入 |
| 飞龙变巢虫领主链 | `MutaliskBroodlord` | 已导入 |
| 飞龙变飞蛇链 | `MutaliskViper` | 已导入 |
| 虫群宿主 | `SwarmHost` | 已导入 |
| 虫群宿主 MP | `SwarmHostMP` | 已导入 |
| 雷兽 | `Ultralisk` | 已导入 |
| 托拉斯克 | `HotSTorrasque` | 已导入 |
| 毒爆虫 | `Baneling` | 已导入 |

当前未在 `XMKerrigan` 导入结果中确认：

- `BroodLord`
- `Lurker`

注意：部分官方合作链路使用变体 ID，例如 `MutaliskBroodlord`、`HydraliskImpaler`，不一定直接使用普通 `BroodLord` / `Lurker` ID。

## 技能面板接入

修改：

```text
合作指挥官版起义狂潮/Mods/XM/XMCore.SC2Mod/Base.SC2Data/Lib67C0F0E7.galaxy
合作指挥官版起义狂潮/Mods/XM/XMCore.SC2Mod/Base.SC2Data/Lib67C0F0E7_h.galaxy
```

已完成：

- `CU_GPInit` 增加 `Kerrigan` 分派。
- 新增 `lib67C0F0E7_gf_CU_GPInitKerrigan`。
- 第一阶段使用通用虫族顶部面板：

```text
ZergCasterPanelTemplate
ZergGlobalCommandPanelTemplate
UI_ZergCastingPanel.SC2Cutscene
```

目前按钮数量按 2 个 Hook，后续需要根据 `CoopCasterKerrigan` 的真实命令卡和实机显示再扩展。

## 关键地图分支

已参考德哈卡/斯托科夫/诺娃等已完成指挥官，在关键特殊地图中加入 Kerrigan 分支。

### `traynor01`

类型：无基地剧情英雄图。

处理：

- 在 intro dropship 中创建 `K5Kerrigan`。
- 将 `gv_raynor` 绑定为 `UnitCargoLastCreated()`。

### `ttosh03b`

类型：无基地 Nova 剧情图。

处理：

- 创建 `K5Kerrigan`。
- 将 `gv_nova` 绑定为 `UnitLastCreated()`。

### `tvalerian01`

类型：阵容替换图。

处理：

- 使用虫族单位替代德哈卡原始虫族阵容：
  - `Roach`
  - `Hydralisk`
  - `SwarmHostMP`
  - `Ultralisk`
  - `Mutalisk`

### `thanson01`

类型：特殊英雄/剧情图。

处理：

- 在德哈卡同类位置创建 `K5Kerrigan`。

### `thorner02`

类型：运输机支援图。

处理：

- 创建 `Medivac`。
- 货舱加入 2 个 `Hydralisk`。
- 调用 `DropCargoAndExit`。

### `thorner03`

类型：特殊英雄/救援图。

处理：

- 在任务单位附近创建 `K5Kerrigan`。

### `thorner05s`

类型：奖励给兵图。

处理：

- 给 3 个 `Hydralisk`。
- 给 3 个 `Zergling`。

### `ttychus02`

类型：运输机货舱图。

处理：

- 在 SpecialOpsDropship 货舱加入 2 个 `Hydralisk`。

### `ttychus03`

类型：原图含剧情/敌方 Kerrigan，风险较高。

处理：

- 仅加入 `gf_KerriganCommanderBranchMarker` 标记函数，显式区分合作指挥官 Kerrigan 与原剧情 Kerrigan 相关变量。
- 暂未大幅改动剧情凯瑞甘逻辑，避免破坏原任务。

### `ttychus04`

类型：空军支援图。

处理：

- 两个点各创建 1 个 `Mutalisk`。

### `ttychus05`

类型：强化空军/支援图。

处理：

- 两个点各创建 3 个 `Mutalisk`。

## 验证脚本

新增：

```text
scripts/validate-kerrigan-port.ps1
```

验证内容：

- `XMKerrigan.SC2Mod` 是否存在。
- `K5Kerrigan` 是否导入。
- `CoopCasterKerrigan` 是否导入。
- `PsiStrike` 是否导入。
- `MasteryKerrigan*` 是否导入。
- `KerriganLevel15` UserData 是否导入。
- `CommanderData/Kerrigan` 是否导入。
- `XMCore CommanderAch/Kerrigan` 是否存在。
- `CU_GPInitKerrigan` 是否存在。
- `XMFinal` 是否有控制台/面板/英雄初始化。
- Launcher 是否出现 `Kerrigan` 和 `凯瑞甘`。
- 11 张关键地图是否有 Kerrigan 分支。
- 本文档是否存在。

## 训练链核查结果

新增验证脚本：

```text
scripts/validate-kerrigan-tech-chain.ps1
```

当前验证结果：

```text
Kerrigan tech chain validation passed.
Kerrigan port validation passed.
```

核查结论：

- `K5Kerrigan` 的核心技能位于英雄本体命令卡，不是顶部面板。
- 英雄命令卡已确认包含：
  - `PrimalSlash`
  - `MindBolt`
  - `PsiStrikeWalk`
  - `PsionicLift`
  - `KerriganVoidCoopEconDrop`
  - `PrimalHeal`
  - `WildMutation`
  - `KerriganAssimilation` 被动
  - `SpawnBanelings`
  - `Apocalypse`
  - `K5DropPods`
- 核心生产/科技建筑已确认存在命令卡按钮，包括：
  - `Hatchery/Lair/Hive`
  - `SpawningPool`
  - `RoachWarren/GreaterRoachWarren`
  - `HydraliskDen/LurkerDen`
  - `Spire/GreaterSpire`
  - `UltraliskCavern`
  - `NydusNetwork`
- 特色单位按钮不一定直接使用单位 ID，例如 `HotSRaptor` 不一定对应同名 `CButton`；部分链路通过被动按钮、建筑升级或变形命令表现。

## 当前已知缺口

第一阶段仍未完成：

- 凯瑞甘专属顶部面板模板尚未建立，当前使用通用虫族面板。
- `CoopCasterKerrigan` 的顶部按钮数量和实机技能释放需要进游戏验证。
- `K5Kerrigan` 的死亡/复活/复活茧逻辑尚未像德哈卡那样建立完整事件闭环。
- 标准基地仍使用普通 `Hatchery/Drone/Overlord`，尚未改为官方合作凯瑞甘专属基地链。
- 威望/精通目前以字段接入和数据导入为主，未逐项实机确认效果。
- 特殊地图的给兵主要使用保守虫族单位，后续可逐图平衡为更符合凯瑞甘特色的编队。
- `ttychus03` 因原图存在剧情凯瑞甘，当前仅作安全标记，后续需要专门审计。

## 实机验证命令

如果游戏已经运行，需要先结束 SC2 进程，再启动：

```powershell
& "E:\SC2\SC2new\StarCraft II\Support64\SC2Switcher_x64.exe" "E:\SC2\SC2new\StarCraft II\Maps\XM\Launcher.SC2Map"
```

## 下一步建议

1. 运行 `scripts/validate-kerrigan-port.ps1`。
2. 同步工作区内容到实际游戏目录。
3. 结束已有 SC2 进程并启动 Launcher。
4. 在 Launcher 检查凯瑞甘头像、中文文本和 Bank 写入。
5. 选择凯瑞甘进入标准基地图，检查基地、工蜂、王虫、`K5Kerrigan`、顶部面板。
6. 优先验证 `traynor01` 和 `ttosh03b` 这类无基地剧情图是否因 `gv_raynor/gv_nova` 绑定正常推进。
