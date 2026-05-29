# Alarak 当前状态

日期：2026-05-23

## 2026-05-28 补充口径

- 当前请以 `docs/每日进度/2026-05-28-Abathur-Alarak-Kerrigan-Zeratul完成确认与兵种建筑面板.md` 为最新交接口径。
- `Alarak` 已再次通过当前严格静态校验；现阶段应视为“静态链路已闭环，待统一 live 复验”。
- 这页保留历史排查与设计背景，但不再把阿拉纳克归类为“仍有本地接线缺口”的指挥官。

## 已完成

### 独立模组和官方数据
- `XMAlarak.SC2Mod` 已存在。
- 仓内已经导入一批官方 Alarak 相关对象，关键对象包括：
  - `AlarakCoop` - 阿拉纳克英雄单位
  - `AlarakRushPlaceholder` - 全局 caster 入口
  - `AlarakACDeadlyCharge` - 致命冲锋
  - `AlarakACSummonDeathfleet` - 召唤死亡舰队
  - `CommanderPrestigeAlarakDeathFleet` - 威望：死亡舰队
  - **Structure Overcharge（建筑超载）** - 完整效果链：
    - `AlarakStructureOverchargeAB` - 应用行为
    - `AlarakStructureOverchargeShieldAB` - 护盾行为
    - `AlarakStructureOverchargeDamage` - 伤害效果
    - `AlarakStructureOverchargeWeapon` - 武器
    - 6 个优先级效果（Priority1-6）支持不同单位类型
  - **Supplicant Sacrifice（侍祭牺牲）** - 完整效果链：
    - `AlarakSupplicantSacrificeCDR*` - 冷却缩减效果
    - 支持多种单位类型

### 专属面板模板 ✅

阿拉纳克有官方专属面板模板，与德哈卡类似：
- `AlarakCasterPanelTemplate` - 面板模板
- `AlarakGlobalCommandPanelTemplate` - 命令面板模板
- `UI_AlarakCastingPanel.SC2Cutscene` - 面板动画
- 初始化 **2 个按钮**（按钮索引 1-2）
- 还有一个 `GemButton`（用于选择塔达林单位种类）

### 公共 UI 与面板入口
- `XMCore.SC2Mod` 已存在 `CommanderAch/Alarak`。
- `XMCore.SC2Mod/Base.SC2Data/Lib67C0F0E7.galaxy` 已存在 `lib67C0F0E7_gf_CU_GPInitAlarak`。
- `XMFinal` 已存在 `Commander == "Alarak"` 的控制台皮肤和面板初始化分支。

### 战役运行时分支

按当前 `XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146.galaxy`：

1. 创建 `CoopCasterAlarak` 作为全局 caster 入口
2. 调用 `CU_GPInit(1, "Alarak", UnitLastCreated(), null)` 初始化面板
3. 如果需要创建英雄（`lp_createHero == true`），创建 `AlarakCoop` 英雄

### 地图分支
已确认以下地图有阿拉纳克分支记录：
- `traynor01`、`ttosh03b`、`tvalerian01`、`thanson01`
- `thorner02`、`thorner03`、`thorner05s`
- `ttychus02`、`ttychus03`、`ttychus04`、`ttychus05`

## 待完善

### 技能/成长接线验证 ⚠️

已确认并修正的一处错配：
- `CommanderAch/Alarak` 第 4 个升级曾误写为 `AlarakLightningStrikes`
- 实际应为 `AlarakSupplicantSacrificeLightningStrikes`

已确认的成长映射（Mastery）：
- `Poi[0] = MasteryAlarakAutoAttackDamage`
- `Poi[1] = MasteryAlarakUnitAttackSpeed`
- `Poi[2] = MasteryAlarakEmpowerMeSlavesDuration`
- `Poi[3] = MasteryAlarakDeathFleetCDR`
- `Poi[4] = MasteryAlarakOverchargeShieldsDamage`
- `Poi[5] = MasteryAlarakChronoBoost`

### 地图编队收口

部分无基地 / cargo 图仍偏向"先能跑"的编队搭配，后续可继续向更完整的塔达林体系收拢：
- `Supplicant`
- `Slayer`
- `Ascendant`
- `Vanguard`
- `WrathWalker`
- `Death Fleet`

### Launcher 候选

当前仓内 `LauncherAuto.SC2Map` 默认并不把 Alarak 暴露成正式候选。这是入口层还没收口。

## 当前状态评估

可以确认的是：
- ✅ 独立模组已成立
- ✅ 技能数据完整（Structure Overcharge、Supplicant Sacrifice、Death Fleet）
- ✅ 专属面板模板已正确配置
- ✅ 战役运行时分支已接入
- ✅ 特殊地图分支已覆盖
- ⚠️ **Launcher 候选入口还没收口**
- ⚠️ **成长映射需要实机验证**

## 建议后续顺序

1. **高优先级**: 把 Alarak 加回正式 Launcher 候选
2. **中优先级**: 实机验证顶栏 2 个主动技能（Structure Overcharge、Death Fleet）
3. **中优先级**: 验证英雄命令卡被动图标和效果
4. **低优先级**: 把部分地图编队继续往正式塔达林单位链收紧

## 历史资料

旧阶段稿仍保留在 `Alarak移植进度-2026-05-22.md`，适合追溯阶段判断。
