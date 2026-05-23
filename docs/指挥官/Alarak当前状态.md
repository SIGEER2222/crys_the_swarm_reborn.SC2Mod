# Alarak 当前状态

日期：2026-05-23

这份文档只描述当前仓库里已经成立的 Alarak 链路，以及还没收口的点。旧的阶段推进记录仍保留在 `Alarak移植进度-2026-05-22.md`，但它不是当前入口文档。

## 已经成立

### 独立模组和官方数据

- `XMAlarak.SC2Mod` 已存在。
- 仓内已经导入一批官方 Alarak 相关对象，当前静态校验通过的关键对象至少包括：
  - `AlarakCoop`
  - `AlarakRushPlaceholder`
  - `AlarakACDeadlyCharge`
  - `AlarakACSummonDeathfleet`
  - `CommanderPrestigeAlarakDeathFleet`

### 公共 UI 与面板入口

- `XMCore.SC2Mod` 已存在 `CommanderAch/Alarak`。
- `XMCore.SC2Mod/Base.SC2Data/Lib67C0F0E7.galaxy` 已存在 `lib67C0F0E7_gf_CU_GPInitAlarak`。
- `XMFinal` 已存在 `Commander == "Alarak"` 的控制台皮肤和面板初始化分支。

### 战役运行时分支

按当前 `XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146.galaxy`：

- `Alarak` 已有标准初始化分支。
- 当前会先创建 `AlarakRushPlaceholder` 作为全局 caster 入口。
- 随后会创建 `AlarakCoop` 英雄并执行 `CU_GPInit(1, "Alarak", ...)`。

### 地图分支

当前静态校验要求且已命中的关键地图分支包括：

- `traynor01`
- `ttosh03b`
- `tvalerian01`
- `thanson01`
- `thorner02`
- `thorner03`
- `thorner05s`
- `ttychus02`
- `ttychus04`
- `ttychus05`
- `ttychus03`

这说明 Alarak 已经不只是“模组里有对象”，而是已经进入战役地图分支体系。

## 当前 blocker

### `XMFinal` 依赖此前缺少 `XMAlarak`

当前工作区已经把下面这条依赖补回：

- `XMFinal.SC2Mod/DocumentInfo -> file:Mods\XM\XMAlarak.SC2Mod`

如果 live 环境仍使用旧版 `DocumentInfo` / `DocumentHeader`，就会在进图时出现 `AlarakCoop` 之类目录对象找不到的问题。

当前修正方式不是把 `XMAlarak` 塞回 `XMFinal` 全局依赖，而是把它挂到实际使用 Alarak 的地图层 `DocumentInfo` 上。

### Launcher 候选还没收口

当前仓内 `LauncherAuto.SC2Map` 默认并不把 Alarak 暴露成正式候选。这不是数据链缺失，而是入口层还没收口。

因此现在最准确的判断是：

- Alarak 的数据链和 runtime 分支已经在。
- 但 live 入口和候选展示还没做到“稳定可交付”。

### 地图里仍有待收口的技能/成长接线

当前不再把“基地 / 工人 / 建筑看起来像不像正式 Alarak”当成首要 blocker。按当前实机判断，这部分已经可以视为 Alarak 体系在战役里的有效落地。

现在更需要收口的是技能与成长接线，尤其是：

- `CommanderAch/Alarak` 的升级映射必须和 `XMAlarak` 实际升级 ID 一致。
- 英雄命令卡上的被动槽位依赖真实升级对象，而不是按钮名或行为名。
- 顶栏应按官方口径理解为 2 个主动技能：`Structure Overcharge` 和 `Death Fleet`。

已确认并修正的一处错配：

- `CommanderAch/Alarak` 第 4 个升级曾误写为 `AlarakLightningStrikes`
- 实际应为 `AlarakSupplicantSacrificeLightningStrikes`

已确认并准备按官方对象继续收口的一组成长映射：

- `Poi[0] = MasteryAlarakAutoAttackDamage`
- `Poi[1] = MasteryAlarakUnitAttackSpeed`
- `Poi[2] = MasteryAlarakEmpowerMeSlavesDuration`
- `Poi[3] = MasteryAlarakDeathFleetCDR`
- `Poi[4] = MasteryAlarakOverchargeShieldsDamage`
- `Poi[5] = MasteryAlarakChronoBoost`

如果这类映射不收口，就会出现：

- live 里英雄命令卡被动图标缺失
- 被动效果没有实际生效
- 后续 AI 误以为是按钮或单位没导入

地图分支层面，现有部分无基地 / cargo 图仍偏向“先能跑”的编队搭配，后续可继续向更完整的塔达林体系收拢：

- `Supplicant`
- `Slayer`
- `Ascendant`
- `Vanguard`
- `Wrathwalker`
- `Death Fleet`

## 当前最准确的判断

不应再把 Alarak 描述成“还没接进来”，因为这已经不符合仓内现状。

更准确的说法是：

1. `XMAlarak.SC2Mod` 已经成立。
2. `XMCore` 和 `XMFinal` 都已有 Alarak 接线。
3. 关键地图分支已经开始覆盖。
4. 当前主要缺口是技能/成长接线收口、live 依赖同步、Launcher 候选入口，以及把部分地图编队继续往正式塔达林单位链收紧。

## 本轮 live 结果

已实机确认可进图的地图包括：

- `traynor01`
- `ttosh03b`
- `tvalerian01`
- `thanson01`
- `thorner02`
- `thorner03`
- `thorner05s`
- `ttychus02`
- `ttychus04`
- `ttychus05`
- `ttychus03`

其中 `ttychus03` 之前缺的是地图层依赖，已补回。

## 建议后续顺序

1. 先把 `XMFinal` 的 `DocumentInfo` / `DocumentHeader` 同步到 live。
2. 直接跑 live 验证，确认 `AlarakCoop` 不再报 catalog 缺失。
3. 再决定是否把 Alarak 加回正式 Launcher 候选。
4. 最后收口面板效果和地图中的正式塔达林编队。

## 历史资料

旧阶段稿仍保留：

- `Alarak移植进度-2026-05-22.md`

它适合追溯阶段判断，不适合替代当前状态文档。
