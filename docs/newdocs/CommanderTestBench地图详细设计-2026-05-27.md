# CommanderTestBench 地图详细设计

日期：2026-05-27

## 目标

设计一张专用测试地图 `CommanderTestBench.SC2Map`，用于一次启动游戏后切换不同合作指挥官，并调用统一测试入口验证指挥官运行时闭包。

这份文档面向后续实际建图和写触发器，不只描述思路。它定义地图包结构、依赖、区域、Dialog UI、触发器、`XMFinal` 接口、日志、最小闭环和验收标准。

布局蓝图：

```text
docs/newdocs/测试台资源/CommanderTestBench布局蓝图-2026-05-27.svg
```

实际可加载地图包骨架：

```text
references/testbench/CommanderTestBench.SC2Map/
原始mod/Maps/XM/CommanderTestBench.SC2Map/
```

注意：SVG 只是说明图，SC2 不能加载 SVG。SC2 实际加载的是 `.SC2Map` 地图包目录。当前地图包已经用真实 `.SC2Map` 模板生成，并且 `MapScript.galaxy` 已改成调用 `XMFinal` 的 `XMTestBench_*` runtime API；仍需用 SC2 Editor 打开确认编译和运行。

当前优先打开 `原始mod/Maps/XM/CommanderTestBench.SC2Map/`。这份地图沿用现有战役地图的目录结构，`DocumentInfo` 中的 `file:Mods\XM\XMFinal.SC2Mod` 可以解析到 `原始mod/Mods/XM/XMFinal.SC2Mod`。`references/testbench/CommanderTestBench.SC2Map/` 保留为资料副本；直接从 `references/testbench` 打开时，依赖路径可能找不到 `XMFinal.SC2Mod`。

## 放置建议

推荐先作为独立测试资产，不放在失败半成品目录里：

```text
references/testbench/CommanderTestBench.SC2Map/
```

后续如果需要打包到游戏内，可以再复制或发布到正式 `Maps/XM/`。测试设计和实现不要以 `合作指挥官版起义狂潮/` 为权威来源。

当前已经同步一份直接加载副本：

```text
原始mod/Maps/XM/CommanderTestBench.SC2Map/
```

后续如果 SC2 Editor 重新生成触发器或脚本，优先以这份可加载副本为准，再把必要脚本同步回 `references/testbench`。

依赖：

```text
crys_the_swarm_reborn.SC2Mod
XMFinal.SC2Mod
```

如果当前本仓库还没有独立 `XMFinal.SC2Mod` 实体，则第一阶段先在现有 runtime owner 中预留同名接口，文档和触发器统一按 `XMFinal` 命名。

## 地图尺寸与区域

建议地图尺寸：

```text
160 x 160
```

玩家：

| 玩家 | 用途 |
|---|---|
| 1 | 测试玩家 |
| 2 | 敌对测试目标 |
| 15 | 中立/占位 |

区域布局：

| 区域 | 建议中心 | 建议大小 | 用途 |
|---|---:|---:|---|
| `XM_TB_BaseZone` | `(32, 118)` | `32 x 28` | 基地、工人、开局建筑 |
| `XM_TB_RosterZone` | `(92, 118)` | `64 x 28` | 全单位、全建筑展示 |
| `XM_TB_HeroZone` | `(32, 74)` | `32 x 28` | 英雄、形态、等级、专属技能 |
| `XM_TB_TechZone` | `(92, 74)` | `64 x 28` | 科技建筑、研究、升级验证 |
| `XM_TB_CargoZone` | `(32, 32)` | `32 x 24` | 运输机、货舱、空投 |
| `XM_TB_EnemyZone` | `(92, 32)` | `64 x 24` | 地面/空中/轻甲/重甲/建筑目标 |
| `XM_TB_PanelPoint` | `(132, 74)` | point | 顶部技能目标点 |
| `XM_TB_SummaryPoint` | `(132, 118)` | point | 摘要文本或标记 |

每个区域只负责一个测试维度，避免全单位展示把技能测试目标挤掉。

## 地图静态对象

第一版建议只放极少静态对象：

1. 玩家 2 的测试目标：
   - 地面轻甲目标。
   - 地面重甲目标。
   - 空中目标。
   - 建筑目标。
2. 若干路径/地形标记。
3. 可选的文字标签。

其它单位、建筑、英雄、caster、运输机都由测试入口创建，避免地图对象和 profile 脱节。

## 全局变量

测试地图只维护 UI 状态和测试运行状态。

```galaxy
const int gv_xmTbCommanderNum = 18;
const int gv_xmTbScenarioNum = 18;

string gv_xmTbCurrentCommander;
int gv_xmTbCurrentCommanderIndex;
string gv_xmTbCurrentScenario;
string gv_xmTbRunId;
int gv_xmTbWarnings;
int gv_xmTbErrors;
unitgroup gv_xmTbUnits;

int gv_xmTbRootDialog;
int gv_xmTbCommanderDialog;
int gv_xmTbScenarioDialog;
int gv_xmTbSummaryDialog;

int[gv_xmTbCommanderNum + 1] gv_xmTbCommanderButton;
int[gv_xmTbCommanderNum + 1] gv_xmTbCommanderBorder;
int[gv_xmTbScenarioNum + 1] gv_xmTbScenarioButton;

int gv_xmTbButtonClear;
int gv_xmTbButtonRerun;
int gv_xmTbButtonNextCommander;
int gv_xmTbButtonRunAll;
int gv_xmTbSummaryLabel;
```

测试地图不保存每个指挥官的单位表。指挥官清单可从 `CommanderPreset` 读取，场景清单可以在测试地图中固定，因为场景是测试维度，不是 commander 规则。

## 场景枚举

第一版固定 18 个场景：

| index | scenarioKind | 按钮文本 |
|---:|---|---|
| 1 | `standard_base` | 标准基地 |
| 2 | `power_fusion` | 应用融合 |
| 3 | `panel_cost_smoke` | 面板扣费 |
| 4 | `panel_effect_smoke` | 面板效果 |
| 5 | `full_buildings` | 全建筑 |
| 6 | `full_units` | 全单位 |
| 7 | `initial_units` | 初始审计 |
| 8 | `level15_units` | 满级清单 |
| 9 | `fusion_final_units` | 融合最终 |
| 10 | `hero_modes` | 英雄/形态 |
| 11 | `unit_ability_smoke` | 单位技能 |
| 12 | `unit_evolution_smoke` | 演化 |
| 13 | `tech_smoke` | 科技 |
| 14 | `cargo_light` | 轻型空投 |
| 15 | `cargo_heavy` | 重型空投 |
| 16 | `cargo_air` | 空军/支援 |
| 17 | `special_smoke` | 特殊机制 |
| 18 | `personal_smoke` | 个性机制 |

## Dialog UI

参考 `LauncherAuto.SC2Map` 的模式：

```galaxy
DialogControlCreateFromTemplate(DialogLastCreated(), c_triggerControlTypeButton, "CommanderSelectBtn/CommanderButtonTemplate");
DialogControlHookup(gv_xmTbCommanderButton[i], c_triggerControlTypeImage, "CommanderPortrait");
libNtve_gf_SetDialogItemImage(DialogControlLastCreated(), UserDataGetImagePath("CommanderPreset", "ID", "CommanderPortrait", j), PlayerGroupAll());
DialogControlHookup(gv_xmTbCommanderButton[i], c_triggerControlTypeImage, "SelectionBorder");
```

### 顶部指挥官条

位置：

```text
anchorTopLeft, x=40, y=20, width=1540, height=120
```

布局：

```text
18 个头像按钮，横向排列；不够宽时换行。
选中指挥官显示 SelectionBorder。
```

点击头像后：

```text
XMTestBench_Clear(1)
XMTestBench_SetCommander(1, commander)
XMTestBench_WriteSummary(1)
```

是否播放语音：

第一版建议不播放或只播放存在性已验证的声音。旧问题里已经出现“部分指挥官有语音，部分没有”，测试台不应因为头像点击声音缺失影响核心验证。声音可以作为 `personal_smoke` 的可选检查项。

### 左侧场景面板

位置：

```text
anchorLeft, x=30, y=160, width=260, height=760
```

场景按钮按两列排列：

```text
标准基地 / 应用融合
面板扣费 / 面板效果
全建筑 / 全单位
初始审计 / 满级清单
融合最终 / 英雄形态
单位技能 / 演化
科技 / 轻型空投
重型空投 / 空军支援
特殊机制 / 个性机制
```

点击场景后：

```text
XMTestBench_Clear(1)
XMTestBench_RunScenario(1, scenarioKind)
XMTestBench_WriteSummary(1)
```

当前 Raynor 试点状态：

| 场景 | 当前行为 |
|---|---|
| `full_units` / `level15_units` / `fusion_final_units` | 通过 `XMFinal` 的 Raynor profile 生成 Marine、Medic、Firebat、Marauder、Vulture、SiegeTank、Viking、Banshee、Battlecruiser、SCV |
| `full_buildings` | 通过 Raynor profile 生成 CommandCenter、OrbitalCommand、SupplyDepot、Barracks、Bunker、MissileTurret，并补充 EngineeringBay、Factory、Armory、Starport、TechLab/Reactor 等测试用科技支撑建筑 |
| `panel_cost_smoke` | 命中 Raynor 面板 profile，默认解析到 `VoidCoopSummonHyperion`，记录资源快照和 catalog 冷却字段；因官方 `CoopCasterRaynor` 尚未导入 `XMFinal` 依赖链，暂不实放技能 |

地图初始化会给玩家 1 充足矿物和瓦斯，但不会开启矿物/瓦斯费用忽略。这样 `panel_cost_smoke` 后续接入真实施放时，资源变化仍然可信。全单位展示所需的补给压力由 `c_playerStateFoodIgnored` 处理。

### 右侧摘要面板

位置：

```text
anchorRight, x=30, y=160, width=420, height=760
```

显示：

```text
Commander:
Scenario:
Run:
Created:
Missing:
Warnings:
Errors:
Last:
```

摘要来自 `XMFinal` 的测试状态，测试地图只显示字符串，不自己判断对象闭包。

### 底部操作条

位置：

```text
anchorBottom, x=0, y=30, width=900, height=80
```

按钮：

| 按钮 | 行为 |
|---|---|
| 清理 | `XMTestBench_Clear(1)` |
| 重跑当前 | `XMTestBench_Clear(1)` + `XMTestBench_RunScenario(1, gv_xmTbCurrentScenario)` |
| 下一个指挥官 | 切到下一个 commander，运行当前场景 |
| 跑全量冒烟 | 进入自动队列 |
| 调试开关 | 切换 `XMDebug` 开关 |

## 触发器结构

建议触发器：

```text
gt_XMTB_Init
gt_XMTB_BuildUI
gt_XMTB_CommanderClick
gt_XMTB_ScenarioClick
gt_XMTB_ActionClick
gt_XMTB_RunAllStart
gt_XMTB_RunAllStep
gt_XMTB_DebugChat
```

函数：

```text
gf_XMTB_Log(level, event, message)
gf_XMTB_NewRunId()
gf_XMTB_GetCommanderByIndex(index)
gf_XMTB_GetScenarioByIndex(index)
gf_XMTB_SetSelectedCommanderVisual(index)
gf_XMTB_UpdateSummary()
gf_XMTB_RunCurrentScenario()
gf_XMTB_RunAllNext()
```

## 初始化流程

```text
Map Init
  -> Hide unnecessary campaign UI
  -> Set alliances and resources
  -> Create enemy target units
  -> Build test Dialog UI
  -> Load last test commander from XMDebug bank or default Raynor
  -> XMTestBench_SetCommander(player=1, commander)
  -> XMTestBench_WriteSummary(player=1)
```

伪代码：

```galaxy
bool gt_XMTB_Init_Func(bool testConds, bool runActions) {
    libNtve_gf_HideGameUI(false, PlayerGroupAll());
    PlayerSetState(1, c_playerStateMinerals, 100000);
    PlayerSetState(1, c_playerStateVespene, 100000);
    PlayerSetState(1, c_playerStateSuppliesUsed, 0);
    PlayerSetState(1, c_playerStateSuppliesMade, 200);

    gv_xmTbUnits = UnitGroupEmpty();
    gv_xmTbCurrentCommander = "Raynor";
    gv_xmTbCurrentScenario = "standard_base";
    gv_xmTbRunId = gf_XMTB_NewRunId();

    gf_XMTB_CreateEnemyTargets();
    gf_XMTB_BuildUI();
    XMTestBench_SetCommander(1, gv_xmTbCurrentCommander);
    XMTestBench_WriteSummary(1);
    gf_XMTB_UpdateSummary();
    return true;
}
```

## 点击指挥官流程

```text
Dialog click
  -> 判断 EventDialogControl 是否属于 commander dialog
  -> 找到 commander index
  -> 更新选中边框
  -> Clear
  -> SetCommander
  -> WriteSummary
```

伪代码：

```galaxy
bool gt_XMTB_CommanderClick_Func(bool testConds, bool runActions) {
    int i = 1;
    int j = 1;

    if (DialogControlGetDialog(EventDialogControl()) != gv_xmTbCommanderDialog) {
        return true;
    }

    for (; i <= gv_xmTbCommanderNum; i += 1) {
        if (EventDialogControl() == gv_xmTbCommanderButton[i]) {
            gv_xmTbCurrentCommanderIndex = i;
            gv_xmTbCurrentCommander = gf_XMTB_GetCommanderByIndex(i);
            gf_XMTB_SetSelectedCommanderVisual(i);
            XMTestBench_Clear(1);
            XMTestBench_SetCommander(1, gv_xmTbCurrentCommander);
            XMTestBench_WriteSummary(1);
            gf_XMTB_UpdateSummary();
            return true;
        }
    }
    return true;
}
```

## 点击场景流程

```text
Dialog click
  -> 判断 EventDialogControl 是否属于 scenario dialog
  -> 找到 scenarioKind
  -> Clear
  -> RunScenario
  -> WriteSummary
```

伪代码：

```galaxy
bool gt_XMTB_ScenarioClick_Func(bool testConds, bool runActions) {
    int i = 1;

    if (DialogControlGetDialog(EventDialogControl()) != gv_xmTbScenarioDialog) {
        return true;
    }

    for (; i <= gv_xmTbScenarioNum; i += 1) {
        if (EventDialogControl() == gv_xmTbScenarioButton[i]) {
            gv_xmTbCurrentScenario = gf_XMTB_GetScenarioByIndex(i);
            gf_XMTB_RunCurrentScenario();
            return true;
        }
    }
    return true;
}
```

`gf_XMTB_RunCurrentScenario`：

```galaxy
void gf_XMTB_RunCurrentScenario() {
    XMTestBench_Clear(1);
    XMTestBench_SetCommander(1, gv_xmTbCurrentCommander);
    XMTestBench_RunScenario(1, gv_xmTbCurrentScenario);
    XMTestBench_WriteSummary(1);
    gf_XMTB_UpdateSummary();
}
```

## Run All Smoke

第一版不要一次性在一个 tick 里跑完，容易卡死或让创建/Actor 初始化没时间完成。用计时器分步：

```text
RunAllStart
  -> commanderIndex = 1
  -> scenarioIndex = 1
  -> enable RunAllStep every 0.75s

RunAllStep
  -> SetCommander
  -> RunScenario
  -> WriteSummary
  -> scenarioIndex++
  -> if scenarioIndex > smokeScenarioCount then commanderIndex++, scenarioIndex=1
  -> if commanderIndex > 18 then stop
```

第一版 `Run All Smoke` 场景只跑：

```text
power_fusion
standard_base
panel_cost_smoke
full_buildings
full_units
```

当前实现先限定为当前 commander 的 5 个基础场景，不循环 18 个 commander。每个场景前调用 `Clear`，每个场景后输出 `TEST_RUN_ALL_STEP`，最后按累计 warnings/errors 输出 `TEST_RUN_ALL_DONE result=ok|warning|error`，避免 UI 最终只显示最后一个场景却误报整体通过。

`panel_cost_smoke` 进入第一版全量冒烟。`panel_effect_smoke` 先保留手动按钮或安全白名单，等目标、清理和日志稳定后再加入全量。运输机和个性机制先保留手动按钮，等基础闭环稳定后再加入全量。

## XMFinal 需要提供的接口

测试地图需要的 public API：

```galaxy
void XMTestBench_SetCommander(int player, string commander);
void XMTestBench_Clear(int player);
void XMTestBench_RunScenario(int player, string scenarioKind);
void XMTestBench_RunRoster(int player, string rosterKind);
void XMTestBench_RunPowerFusion(int player);
void XMTestBench_RunHeroSmoke(int player);
void XMTestBench_RunUnitAbilitySmoke(int player);
void XMTestBench_RunPanelCostSmoke(int player);
void XMTestBench_RunPanelEffectSmoke(int player);
void XMTestBench_RunTechSmoke(int player);
void XMTestBench_RunTransportSmoke(int player, string cargoKind);
void XMTestBench_RunSpecialSmoke(int player);
void XMTestBench_RunPersonalSmoke(int player);
void XMTestBench_WriteSummary(int player);
string XMTestBench_GetSummaryText(int player);
int XMTestBench_GetWarningCount(int player);
int XMTestBench_GetErrorCount(int player);
```

内部状态建议：

```galaxy
string gv_xmTestCommander[16];
string gv_xmTestScenario[16];
string gv_xmTestRunId[16];
int gv_xmTestCreatedCount[16];
int gv_xmTestMissingCount[16];
int gv_xmTestWarningCount[16];
int gv_xmTestErrorCount[16];
unitgroup gv_xmTestUnitGroup[16];
```

测试地图可以保留自己的 `gv_xmTbUnits`，但最终清理应交给 `XMTestBench_Clear`，因为 caster、面板、hook 状态也属于 runtime。

## XMFinal 场景分发

`XMTestBench_RunScenario` 不要把全部逻辑写成地图 if/else。允许集中分发：

```galaxy
void XMTestBench_RunScenario(int player, string scenarioKind) {
    XMDbg_Info("TEST_SCENARIO_START", ...);

    if (scenarioKind == "standard_base") {
        XM_InitCommanderStandardBase(player, XM_TB_Point("BaseZone"));
    }
    else if (scenarioKind == "power_fusion") {
        XM_ApplyCommanderPowerFusion(player, gv_xmTestCommander[player]);
    }
    else if (scenarioKind == "full_units") {
        XMTestBench_RunRoster(player, "fusion_final_units");
    }
    else if (scenarioKind == "panel_cost_smoke") {
        XMTestBench_RunPanelCostSmoke(player);
    }
    else if (scenarioKind == "panel_effect_smoke") {
        XMTestBench_RunPanelEffectSmoke(player);
    }
    else if (scenarioKind == "full_buildings") {
        XMTestBench_RunRoster(player, "full_buildings");
    }
    else if (scenarioKind == "hero_modes") {
        XMTestBench_RunHeroSmoke(player);
    }
    else if (scenarioKind == "tech_smoke") {
        XMTestBench_RunTechSmoke(player);
    }
    else {
        XMDbg_Warn("TEST_SCENARIO_SKIPPED", ...);
    }

    XMTestBench_WriteSummary(player);
    XMDbg_Info("TEST_SCENARIO_DONE", ...);
}
```

这里的分支是按测试场景分发，不是按 commander 分发。commander 差异应来自 profile 或 commander hook。

## 顶部面板场景

顶部面板需要独立测试，因为它既不是普通单位命令卡，也不是科技建筑按钮。面板测试分两步：

```text
panel_cost_smoke
  -> 只验证按钮可用、扣费、充能、冷却、精通/威望修正

panel_effect_smoke
  -> 在扣费正确后，再验证目标点、目标单位和实际效果
```

### 目标点和目标单位

测试地图需要给面板技能准备稳定目标：

| 对象 | 位置 | 用途 |
|---|---:|---|
| `XM_TB_PanelPoint` | `(132, 74)` | 点目标技能默认落点 |
| `XM_TB_EnemyGroundLight` | `EnemyZone` | 轻甲地面目标 |
| `XM_TB_EnemyGroundArmored` | `EnemyZone` | 重甲地面目标 |
| `XM_TB_EnemyAir` | `EnemyZone` | 空中目标 |
| `XM_TB_EnemyStructure` | `EnemyZone` | 建筑目标 |

这些目标由 `gt_XMTB_Init` 创建，切换 commander 时默认不清理。`XMTestBench_Clear` 只清理测试生成物，不能误删这些固定目标；如果效果测试杀死了目标，需要 `XMTestBench_ResetPanelTargets` 重建。

### XMFinal 面板接口

除通用 `XMTestBench_RunScenario` 外，建议 `XMFinal` 增加面板专用测试入口：

```galaxy
void XMTestBench_RunPanelCostSmoke(int player);
void XMTestBench_RunPanelEffectSmoke(int player);
void XMTestBench_ResetPanelTargets(int player);
void XMTestBench_SnapshotPanelState(int player, string panelAbilityId, string phase);
void XMTestBench_InvokePanelAbilityAtPoint(int player, string panelAbilityId, point targetPoint);
void XMTestBench_InvokePanelAbilityOnUnit(int player, string panelAbilityId, unit targetUnit);
```

`panel_cost_smoke` 的验证顺序：

```text
InitPanel
  -> For each CommanderPanelAbilityProfile row
  -> Snapshot before minerals/gas/energy/charges/cooldown
  -> Invoke ability on safe target
  -> Snapshot after
  -> Compare expected cost, charge delta, cooldown delta
  -> Log result
```

`panel_effect_smoke` 的验证顺序：

```text
ResetPanelTargets
  -> For each safe panel ability
  -> Snapshot target life/behavior/unit count
  -> Invoke ability
  -> Wait effect window
  -> Verify damage, behavior, summon, reveal, teleport or hook result
  -> Log result
```

### 面板技能分类

| 类型 | 示例 | 自动化策略 |
|---|---|---|
| 点目标伤害 | 轨道轰炸、核弹、太阳能射线 | 可自动，比较目标生命或行为 |
| 点目标召唤 | 休伯利安、女妖、空投 | 可自动，比较生成单位和归属 |
| 单位目标 | 需要点选敌方或友方单位的技能 | 可自动，使用固定目标单位 |
| 区域控制 | 时间停止、黑洞类 | 先白名单，比较行为或全局状态 |
| 全局修正 | 冷却/充能/资源类 | 优先由 `panel_cost_smoke` 判定 |
| 特殊 hook | 指挥官专属 runtime 技能 | 必须有 hook 日志，效果可先人工确认 |

### 面板日志

```text
[XM_DBG][INFO][PANEL_COST_BEFORE] commander=Raynor ability=Hyperion minerals=100000 gas=100000 energy=200 charges=1 cooldown=0
[XM_DBG][INFO][PANEL_COST_AFTER] commander=Raynor ability=Hyperion minerals=100000 gas=100000 energy=200 charges=0 cooldown=240 result=ok
[XM_DBG][ERROR][PANEL_COST_MISMATCH] commander=Karax ability=OrbitalStrike field=energy expectedDelta=-5 actualDelta=0
[XM_DBG][INFO][PANEL_EFFECT_START] commander=Nova ability=Nuke target=XM_TB_PanelPoint mode=Point
[XM_DBG][INFO][PANEL_EFFECT_HIT] commander=Nova ability=Nuke target=EnemyGroundArmored beforeLife=1000 afterLife=250 result=ok
[XM_DBG][WARN][PANEL_EFFECT_MANUAL] commander=Vorazun ability=TimeStop reason=global-state-skill
```

第一版通过标准：Raynor、Nova、Karax 至少各有一个顶部面板技能能跑完 `panel_cost_smoke`；其中至少一个点目标技能能跑完 `panel_effect_smoke`。

### 触发方式

自动测试不模拟鼠标点击。SC2 里强行模拟玩家点顶部面板和目标选择不稳定，也很难区分“UI 没接上”和“技能逻辑坏了”。测试台采用两层触发：

| 层级 | 触发方式 | 目的 |
|---|---|---|
| 逻辑/效果测试 | 命令触发 | 稳定验证扣费、冷却、充能、目标转发和实际效果 |
| UI 接线测试 | 人工点击或测试按钮点击 | 验证 Dialog 按钮能映射到正确 `panelAbilityId` |

因此真正的公共入口必须是：

```galaxy
XM_InvokeCommanderPanelAbility(player, commander, panelAbilityId, target)
```

实际顶部面板 UI 点击后调用它：

```text
TopPanelButtonClick
  -> resolve panelAbilityId
  -> enter target mode or use default target
  -> XM_InvokeCommanderPanelAbility(...)
```

测试台命令触发也调用它：

```text
XMTestBench_RunPanelCostSmoke
  -> Snapshot before
  -> XM_InvokeCommanderPanelAbility(player, commander, panelAbilityId, safeTarget)
  -> Snapshot after
  -> Compare cost/charge/cooldown

XMTestBench_RunPanelEffectSmoke
  -> Reset targets
  -> XM_InvokeCommanderPanelAbility(player, commander, panelAbilityId, testTarget)
  -> Verify effect
```

这样 UI 和自动测试不会走两套逻辑。区别只是目标来源不同：玩家点击时目标来自鼠标选点，自动测试时目标来自 `XM_TB_PanelPoint` 或固定敌方单位。

底层执行按技能类型分派：

| 技能实现 | 命令触发方式 |
|---|---|
| caster ability | 对面板 caster 下发对应 ability command，目标为点或单位 |
| runtime hook | 调用 commander hook，并显式传入目标 |
| summon/drop | 走统一 invoke 入口，由 ability 或 hook 创建单位 |
| global skill | 走统一 invoke 入口，效果验证可先标记手动或白名单 |

UI 接线测试只需要验证：

```text
buttonId -> panelAbilityId -> XM_InvokeCommanderPanelAbility
```

日志：

```text
[XM_DBG][INFO][PANEL_UI_CLICK] commander=Raynor button=HyperionButton ability=Hyperion result=ok
[XM_DBG][INFO][PANEL_TEST_INVOKE] commander=Raynor ability=Hyperion trigger=command target=XM_TB_PanelPoint result=ok
[XM_DBG][ERROR][PANEL_UI_BINDING_MISSING] commander=Vorazun button=TimeStopButton result=missing
```

## Profile 数据要求

测试台要跑起来，至少需要这些 profile 或等价临时数据：

```text
CommanderRuntimeProfile
CommanderScenarioLoadout
CommanderRosterProfile
CommanderPowerFusionProfile
CommanderHeroProfile
CommanderUnitAbilityProfile
CommanderUnitTechProfile
CommanderSpecialMechanicProfile
```

第一阶段可以只做临时导出表，但必须有清晰字段：

```text
commander
scenarioKind
rosterKind
objectKind
objectId
count
spawnZone
createMode
requiredUnlock
expectedAbilities
expectedBehaviors
expectedWeapons
```

不要把这些表手写在测试地图触发器里。

## 三指挥官最小闭环

第一版只要求接通：

```text
Raynor
Nova
Abathur
```

必测按钮：

| 指挥官 | 必测场景 | 关键检查 |
|---|---|---|
| Raynor | `standard_base`、`power_fusion`、`panel_cost_smoke`、`panel_effect_smoke`、`full_units`、`tech_smoke` | 基地、星轨/矿骡、顶部面板扣费和召唤效果、空军威望收益、步兵/机械/星港单位 |
| Nova | `standard_base`、`panel_cost_smoke`、`panel_effect_smoke`、`hero_modes`、`unit_ability_smoke`、`full_units` | 诺娃英雄、形态切换、攻击方式变化、核弹/面板效果、精英单位 |
| Abathur | `full_units`、`unit_evolution_smoke`、`special_smoke` | 生物质、终极进化、利维坦/莽兽候选、heroes.json 缺口日志 |

验收：

1. 进入地图后默认选中 Raynor。
2. 点击 Nova 后上一轮单位被清理。
3. 点击 Abathur 后不会沿用 Nova 面板或旧 caster。
4. `full_units` 使用 `fusion_final_units`。
5. 顶部面板先能验证扣费/冷却/充能，再验证至少一个指向性效果。
6. 每次点击都输出 `[XM_DBG][TEST_*]`。

## 日志与摘要

`XMTestBench_WriteSummary` 负责生成摘要字符串：

```text
Commander: Nova
Scenario: hero_modes
Run: 20260527-001
Created: 12
Missing: 2
Warnings: 1
Errors: 0
Last: TEST_SCENARIO_DONE
```

同时写日志：

```text
[XM_DBG][INFO][TEST_SUMMARY] commander=Nova scenario=hero_modes created=12 missing=2 warnings=1 errors=0
```

如果 Debug Bank 开启，写入：

```text
XMDebug.SC2Bank
  Run/Id
  Run/Commander
  Run/Scenario
  Run/LastPhase
  Run/WarningCount
  Run/ErrorCount
```

## 清理规则

`XMTestBench_Clear` 必须清理：

1. 测试 unit group。
2. 测试 caster。
3. 临时行为或计时器。
4. 临时 Dialog 子面板。
5. 运输机货舱单位。
6. 测试目标以外的敌对单位。

暂时不强求回滚：

1. 玩家升级等级。
2. 已注册触发器。
3. 某些全局 commander 变量。
4. Bank 中上一轮 summary。

这些不回滚项必须进入日志：

```text
[XM_DBG][WARN][TEST_CLEAR_PARTIAL] field=Upgrades reason=not-resettable-in-same-session
```

## 风险控制

第一版不要做这些事：

1. 不做所有指挥官全能力实战模拟。
2. 不在测试地图里复制正式地图触发器。
3. 不把 `合作指挥官版起义狂潮` 的旧实现当作可复用权威。
4. 不在同局切换里断言威望负面一定完全跳过。
5. 不把声音播放作为头像切换的硬性通过条件。

优先让基础链路可见、可重跑、可定位。

## 建图步骤

### 步骤 1：创建地图包

用编辑器新建空白地图，保存为：

```text
references/testbench/CommanderTestBench.SC2Map
```

设置依赖：

```text
crys_the_swarm_reborn.SC2Mod
XMFinal.SC2Mod
```

### 步骤 2：创建区域

按本文区域表创建 8 个区域/点，并使用固定命名。

### 步骤 3：创建 UI 触发器

先只做：

```text
gt_XMTB_Init
gt_XMTB_BuildUI
gt_XMTB_CommanderClick
gt_XMTB_ScenarioClick
gt_XMTB_ActionClick
```

### 步骤 4：接 XMFinal 空实现

在 `XMFinal` 中先提供空实现，保证地图可编译：

```galaxy
XMTestBench_SetCommander
XMTestBench_Clear
XMTestBench_RunScenario
XMTestBench_WriteSummary
XMTestBench_GetSummaryText
```

空实现也要写 `[XM_DBG]`，不要静默。

### 步骤 5：接 Raynor 标准基地

第一个真实动作只接：

```text
Raynor + standard_base
```

通过后再接 `full_units`，然后接 Nova/Abathur。

## 第一版通过标准

1. 地图能打开并显示 18 个 commander 头像。
2. 点击头像能切换选中边框，并写 `TEST_COMMANDER_SET`。
3. 点击 `标准基地` 能调用 `XMTestBench_RunScenario`。
4. 点击 `清理` 能删除测试 group。
5. 摘要面板能显示当前 commander、scenario、warnings、errors。
6. Raynor/Nova/Abathur 至少能跑一个场景。
7. 失败对象能以 `[XM_DBG][ERROR][TEST_MISSING_OBJECT]` 输出。

达到这些后，再扩 `Run All Smoke` 和 18 指挥官全量。
