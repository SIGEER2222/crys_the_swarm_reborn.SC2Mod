# 阿巴瑟移植关卡开局替换审计与开发计划

> 生成时间：2026-05-22
> 范围：`合作指挥官版起义狂潮/Maps/XM` 下所有已扫描地图，以及当前 `XMFinal/XMCore/XMAbathur/Launcher` 改动状态。

## 1. 当前结论

- `Launcher.SC2Map` 已能显示阿巴瑟候选。
- `XMFinal` 已能识别 `Commander == "Abathur"`，并已接入基础面板入口与生物质掉落/拾取触发。
- 标准基地开局走 `libE0EAE146_gf_InitializeBase(...)`，实际读取 `XMCore.SC2Mod/Base.SC2Data/GameData/UserData.xml` 中 `CommanderAch/Abathur` 的 `CommandCenter / Worker / SecondUnit`。
- 由于 `HatcheryAbathur / DroneAbathur / OverlordAbathur` 在实机中会导致基地消失，当前已回退为安全单位：`Hatchery / Drone / Overlord`。
- 顶部面板入口已经出现，但目前只有占位按钮；还没有真正的毒巢、共生体、终极进化等阿巴瑟技能内容。
- 多数标准基地关卡只需要通用基地替换；但多张无基地或半无基地关卡在地图脚本里硬编码了按指挥官给兵/运输机货舱/救援小队，需要逐图补 `Abathur` 分支。

## 2. 状态定义

| 状态 | 含义 |
|---|---|
| 已做-全局 | 已在公共 Mod/Launcher 层完成，适用于所有走公共逻辑的关卡 |
| 已做-临时 | 为避免崩溃/丢基地采用安全占位方案，不是最终阿巴瑟实现 |
| 未做-逐关 | 地图脚本存在按指挥官硬编码分支，必须在该地图里补 `Abathur` |
| 待验证 | 扫描显示可能无需改，但仍需进图验证任务逻辑 |

## 3. 全局已做/未做清单

### 3.1 已做

| 项目 | 状态 | 文件/位置 | 说明 |
|---|---|---|---|
| Launcher 候选 | 已做-全局 | `Maps/XM/Launcher.SC2Map` | `CommanderPreset` 从 8 个扩展到 9 个，追加 `Abathur` |
| Launcher 循环数量 | 已做-全局 | `Launcher.SC2Map/MapScript.galaxy` | `gv_commanderNum = 8`，即 0~8 共 9 个候选 |
| 阿巴瑟中文说明 | 已做-全局 | `XMCore.SC2Mod/zhCN.SC2Data/LocalizedData/GameStrings.txt`、Launcher 本地化 | 已补基础成就/说明文本 |
| 标准基地链路 | 已做-临时 | `XMCore.SC2Mod/.../UserData.xml` | `Abathur` 当前开局为 `Hatchery / Drone / Overlord`，确保不丢基地 |
| 面板入口 | 已做-临时 | `XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146.galaxy`、`XMAbathur.SC2Mod/.../UnitData.xml` | 已创建 `CoopCasterAbathur` 并调用 `CU_GPInit`，但按钮仍是占位 |
| 生物质触发入口 | 已做-待验证 | `XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146.galaxy` | 已合入 `AbathurBiomassDrop/Pickup`，避免跨库 include 黑屏 |

### 3.2 未做

| 项目 | 优先级 | 说明 |
|---|---:|---|
| 真正阿巴瑟基地/工蜂/王虫数据 | P0 | 不能直接用当前 `HatcheryAbathur`，会丢基地；需要补完整数据依赖或基于原生单位改造 |
| 阿巴瑟训练树/建筑树 | P0 | 当前仍是普通虫族基础体验，未接毒巢、蟑螂、刺蛇、宿主等阿巴瑟化训练路径 |
| 顶部面板内容 | P0 | 需要实装毒巢投放、共生体/终极进化、生物质状态等按钮 |
| 生物质表现与数值 | P0 | 已有触发入口，但拾取范围、加成行为、上限、UI 提示、掉落条件都需实机验证和完善 |
| 无基地关卡给兵 | P0 | 多张地图有硬编码指挥官分支，缺 `Abathur` |
| 官方/近似单位体系 | P1 | 需要确定采用官方合作阿巴瑟数据导入，还是在现有资源上做近似版 |

## 4. 指挥官替换矩阵

### 4.1 标准基地开局

| 指挥官 | 当前标准开局来源 | 阿巴瑟对应建议 | 当前实现 |
|---|---|---|---|
| Stukov | 感染建筑/感染工人体系 | 不直接映射；阿巴瑟使用虫族基地链 | 不涉及 |
| Dehaka | 原始虫族基地/单位 | 可参考其虫族单位分支强度，但不使用德哈卡英雄 | 不涉及 |
| Tychus | 人族佣兵/英雄开局 | 转为蟑螂/刺蛇/宿主小队 | 未做 |
| Mira | 人族混合佣兵/机械 | 转为蟑螂/刺蛇/异龙/腐化者 | 未做 |
| Nova | 精英人族小队 | 转为少量高质量蟑螂/刺蛇/破坏者 | 未做 |
| Mengsk | 帝国步兵/坦克/补给 | 转为跳虫/蟑螂/刺蛇/宿主 + 少量资源补偿 | 未做 |
| Swann | 机械单位/炮塔 | 转为防御向蟑螂/宿主/孢子/脊针爬虫 | 未做 |
| Stetmann | 机械虫族单位 | 可作为最接近参考：刺蛇/蟑螂/感染者/爆虫转阿巴瑟虫族等价 | 部分可复用思路 |
| Abathur | 应为孵化场、工蜂、王虫 + 阿巴瑟科技树 | 当前临时为 `Hatchery/Drone/Overlord` | 已做-临时 |

### 4.2 无基地/小队开局替换原则

| 原分支类型 | 常见单位 | 阿巴瑟建议替换 | 备注 |
|---|---|---|---|
| 步兵小队 | Marine、Marauder、Medic、TrooperMengsk、WarPig | `Zergling/Roach/Hydralisk` 或后续 `RoachAbathur/HydraliskAbathur` | 早期关卡优先轻量组合 |
| 重甲/坦克 | SiegeTank、Marauder、Goliath、Diamondback | `Roach/Ravager/SwarmHost` | 如果任务要求攻坚，给 Ravager 或 SwarmHost |
| 空军小队 | Wraith、Banshee、Viking、Liberator、Battlecruiser | `Mutalisk/Corruptor/BroodLord` | 空战关卡必须给对空 |
| 英雄开局 | TychusCoop、NovaCoop、DehakaCoop、SIStukov | 初期用 `Roach + Hydralisk`，后续接 `Brutalisk/Leviathan` | 避免直接创建不存在的阿巴瑟英雄 |
| 防守/阵地 | Bunker、Turret、SiegeTank、Swann 炮塔 | `SpineCrawler/SporeCrawler/SwarmHost/Roach` | 注意不能破坏任务目标/路径 |
| 资源补偿 | PalletMinerals、GasCanister | 保留或按阿巴瑟单位消耗调整 | 很多 Tychus/Mengsk 分支有资源补偿 |

## 5. 全地图开局审计表

| 地图 | 标准基地开局 | 特殊给兵/硬编码 | 已有 Abathur 分支 | 当前处理 | 下一步 |
|---|---:|---:|---:|---|---|
| thanson01.SC2Map | 是 | 是 | 否 | 基地链路已覆盖；特殊分支未补 Abathur | 补 `else if commander == "Abathur"` 分支 |
| thanson02.SC2Map | 是 | 是 | 否 | 基地链路已覆盖；特殊分支未补 Abathur | 补 `else if commander == "Abathur"` 分支 |
| thanson03a.SC2Map | 是 | 可能 | 否 | 标准基地链路已覆盖；特殊脚本待验证 | 进图验证基地/初始单位/任务事件 |
| thanson03b.SC2Map | 是 | 可能 | 否 | 标准基地链路已覆盖；特殊脚本待验证 | 进图验证基地/初始单位/任务事件 |
| thorner01.SC2Map | 是 | 可能 | 否 | 标准基地链路已覆盖；特殊脚本待验证 | 进图验证基地/初始单位/任务事件 |
| thorner02.SC2Map | 是 | 是 | 否 | 基地链路已覆盖；特殊分支未补 Abathur | 补 `else if commander == "Abathur"` 分支 |
| thorner03.SC2Map | 是 | 是 | 否 | 基地链路已覆盖；特殊分支未补 Abathur | 补 `else if commander == "Abathur"` 分支 |
| thorner04.SC2Map | 是 | 可能 | 否 | 标准基地链路已覆盖；特殊脚本待验证 | 进图验证基地/初始单位/任务事件 |
| thorner05s.SC2Map | 是 | 是 | 否 | 基地链路已覆盖；特殊分支未补 Abathur | 补 `else if commander == "Abathur"` 分支 |
| traynor01.SC2Map | 否 | 是 | 否 | 无基地/小队开局，未补 Abathur | 补 `else if commander == "Abathur"` 分支 |
| traynor02.SC2Map | 是 | 可能 | 否 | 标准基地链路已覆盖；特殊脚本待验证 | 进图验证基地/初始单位/任务事件 |
| traynor03.SC2Map | 是 | 可能 | 否 | 标准基地链路已覆盖；特殊脚本待验证 | 进图验证基地/初始单位/任务事件 |
| ttosh01.SC2Map | 是 | 可能 | 否 | 标准基地链路已覆盖；特殊脚本待验证 | 进图验证基地/初始单位/任务事件 |
| ttosh02.SC2Map | 是 | 可能 | 否 | 标准基地链路已覆盖；特殊脚本待验证 | 进图验证基地/初始单位/任务事件 |
| ttosh03a.SC2Map | 是 | 可能 | 否 | 标准基地链路已覆盖；特殊脚本待验证 | 进图验证基地/初始单位/任务事件 |
| ttosh03b.SC2Map | 否 | 是 | 否 | 无基地/小队开局，未补 Abathur | 补 `else if commander == "Abathur"` 分支 |
| ttychus01.SC2Map | 是 | 可能 | 否 | 标准基地链路已覆盖；特殊脚本待验证 | 进图验证基地/初始单位/任务事件 |
| ttychus02.SC2Map | 是 | 是 | 否 | 基地链路已覆盖；特殊分支未补 Abathur | 补 `else if commander == "Abathur"` 分支 |
| ttychus03.SC2Map | 是 | 是 | 否 | 基地链路已覆盖；特殊分支未补 Abathur | 补 `else if commander == "Abathur"` 分支 |
| ttychus04.SC2Map | 是 | 是 | 否 | 基地链路已覆盖；特殊分支未补 Abathur | 补 `else if commander == "Abathur"` 分支 |
| ttychus05.SC2Map | 是 | 是 | 否 | 基地链路已覆盖；特殊分支未补 Abathur | 补 `else if commander == "Abathur"` 分支 |
| tvalerian01.SC2Map | 否 | 是 | 否 | 无基地/小队开局，未补 Abathur | 补 `else if commander == "Abathur"` 分支 |
| tvalerian02a.SC2Map | 是 | 可能 | 否 | 标准基地链路已覆盖；特殊脚本待验证 | 进图验证基地/初始单位/任务事件 |
| tvalerian02b.SC2Map | 是 | 可能 | 否 | 标准基地链路已覆盖；特殊脚本待验证 | 进图验证基地/初始单位/任务事件 |
| tvalerian03.SC2Map | 是 | 可能 | 否 | 标准基地链路已覆盖；特殊脚本待验证 | 进图验证基地/初始单位/任务事件 |
| tzeratul01 | 否 | 是 | 否 | 无基地/小队开局，未补 Abathur | 补 `else if commander == "Abathur"` 分支 |
| tzeratul02.SC2Map | 是 | 可能 | 否 | 标准基地链路已覆盖；特殊脚本待验证 | 进图验证基地/初始单位/任务事件 |
| tzeratul03.SC2Map | 是 | 可能 | 否 | 标准基地链路已覆盖；特殊脚本待验证 | 进图验证基地/初始单位/任务事件 |
| tzeratul04.SC2Map | 是 | 可能 | 否 | 标准基地链路已覆盖；特殊脚本待验证 | 进图验证基地/初始单位/任务事件 |

## 6. 需要优先补 Abathur 分支的地图

| 优先级 | 地图 | 原因 | 建议阿巴瑟替换 |
|---:|---|---|---|
| 1 | tvalerian01.SC2Map | 无标准基地开局，玩家初始体验完全依赖脚本给兵 | 重甲向：Roach/Ravager/SwarmHost，后续替换为阿巴瑟专属变体 |
| 2 | traynor01.SC2Map | 无标准基地开局，玩家初始体验完全依赖脚本给兵 | 步兵向：Zergling/Roach/Hydralisk，按难度给数量 |
| 3 | tzeratul01 | 无标准基地开局，玩家初始体验完全依赖脚本给兵 | 英雄向：Roach + Hydralisk 起步，后续接 Brutalisk/Leviathan |
| 4 | ttosh03b.SC2Map | 无标准基地开局，玩家初始体验完全依赖脚本给兵 | 重甲向：Roach/Ravager/SwarmHost，后续替换为阿巴瑟专属变体 |
| 5 | ttychus02.SC2Map | 有标准基地，但额外给兵/运输机/救援/奖励按指挥官硬编码 | 重甲向：Roach/Ravager/SwarmHost，后续替换为阿巴瑟专属变体 |
| 6 | thorner03.SC2Map | 有标准基地，但额外给兵/运输机/救援/奖励按指挥官硬编码 | 英雄向：Roach + Hydralisk 起步，后续接 Brutalisk/Leviathan |
| 7 | thanson01.SC2Map | 有标准基地，但额外给兵/运输机/救援/奖励按指挥官硬编码 | 英雄向：Roach + Hydralisk 起步，后续接 Brutalisk/Leviathan |
| 8 | thorner02.SC2Map | 有标准基地，但额外给兵/运输机/救援/奖励按指挥官硬编码 | 步兵向：Zergling/Roach/Hydralisk，按难度给数量 |
| 9 | thorner05s.SC2Map | 有标准基地，但额外给兵/运输机/救援/奖励按指挥官硬编码 | 重甲向：Roach/Ravager/SwarmHost，后续替换为阿巴瑟专属变体 |
| 10 | ttychus04.SC2Map | 有标准基地，但额外给兵/运输机/救援/奖励按指挥官硬编码 | 空军向：Mutalisk/Corruptor，必要时 BroodLord/Guardian |
| 11 | ttychus05.SC2Map | 有标准基地，但额外给兵/运输机/救援/奖励按指挥官硬编码 | 空军向：Mutalisk/Corruptor，必要时 BroodLord/Guardian |
| 12 | ttychus03.SC2Map | 有标准基地，但额外给兵/运输机/救援/奖励按指挥官硬编码 | 步兵向：Zergling/Roach/Hydralisk，按难度给数量 |
| 13 | thanson02.SC2Map | 有标准基地，但额外给兵/运输机/救援/奖励按指挥官硬编码 | 步兵向：Zergling/Roach/Hydralisk，按难度给数量 |

## 7. 地图逐项备注

### thanson01.SC2Map

- 标准基地开局调用次数：`1`
- 创建单位调用扫描数：`116`
- 指挥官硬编码分支数：`7`
- 是否已有 `Abathur` 字符串：`False`
- 基地替换：走全局 `CommanderAch/Abathur`，当前临时生成 `Hatchery/Drone/Overlord`。
- 需要逐关补丁：是。需要添加 `Abathur` 分支。
- 扫描片段：

```text
libNtve_gf_CreateUnitsWithDefaultFacing(1, "CODFlatbedTruckthanson01", 0, gv_p4_COLONISTS, PointFromId(1157923452));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "CODFlatbedTruckthanson01", 0, gv_p4_COLONISTS, PointFromId(146838565));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "CODFlatbedTruckthanson01", 0, gv_p4_COLONISTS, PointFromId(948335075));
UnitCargoCreate(UnitLastCreated(), "CivilianFemale", 5);
UnitCargoCreate(UnitLastCreated(), "Civilian", 4);
if (auto8F0E1D21_val == "Tychus") {
UnitCargoCreate(UnitFromId(290), "TychusFirebat", 1);
else if (auto8F0E1D21_val == "Mira") {
UnitCargoCreate(UnitFromId(290), "HellionTankMira", 3);
else if (auto8F0E1D21_val == "Dehaka") {
libNtve_gf_CreateUnitsWithDefaultFacing(1, "DehakaCoop", 0, 1, PointFromId(2150));
else if (auto8F0E1D21_val == "Nova") {
```

### thanson02.SC2Map

- 标准基地开局调用次数：`1`
- 创建单位调用扫描数：`59`
- 指挥官硬编码分支数：`1`
- 是否已有 `Abathur` 字符串：`False`
- 基地替换：走全局 `CommanderAch/Abathur`，当前临时生成 `Hatchery/Drone/Overlord`。
- 需要逐关补丁：是。需要添加 `Abathur` 分支。
- 扫描片段：

```text
libNtve_gf_CreateUnitsWithDefaultFacing(1, "Hunterling", 0, gv_pLAYER_04_INFESTEDREFUGEES, UnitGetPosition(UnitGroupRandomUnit(gv_infestedStructureGroup, c_unitCountAlive)));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "Spotter", 0, gv_pLAYER_04_INFESTEDREFUGEES, UnitGetPosition(UnitGroupRandomUnit(gv_infestedStructureGroup, c_unitCountAlive)));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "Kaboomer", 0, gv_pLAYER_04_INFESTEDREFUGEES, UnitGetPosition(UnitGroupRandomUnit(gv_infestedStructureGroup, c_unitCountAlive)));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "Choker", 0, gv_pLAYER_04_INFESTEDREFUGEES, UnitGetPosition(UnitGroupRandomUnit(gv_infestedStructureGroup, c_unitCountAlive)));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "Stank", 0, gv_pLAYER_09_BLIGHTSPREADERS, UnitGetPosition(UnitGroupRandomUnit(gv_infestedStructureGroup, c_unitCountAlive)));
UnitCargoCreate(UnitFromId(1105600807), "Marine", 4);
libE0EAE146_gf_InitializeBase(PointFromId(1225890600), 8, null, true);
libNtve_gf_CreateUnitsWithDefaultFacing(libNtve_gf_DifficultyValueInt(2, 2, 3, 5), "Roachling", 0, gv_pLAYER_06_INFESTORS, UnitGetPosition(EventUnit()));
libNtve_gf_CreateUnitsWithDefaultFacing(libNtve_gf_DifficultyValueInt(2, 2, 3, 4), "ZerglingCarbot", 0, gv_pLAYER_06_INFESTORS, UnitGetPosition(EventUnit()));
libNtve_gf_CreateUnitsWithDefaultFacing(libNtve_gf_DifficultyValueInt(2, 2, 3, 4), "HotSSplitterlingMedium", 0, gv_pLAYER_06_INFESTORS, UnitGetPosition(EventUnit()));
libNtve_gf_CreateUnitsWithDefaultFacing(libNtve_gf_DifficultyValueInt(2, 3, 4, 6), "Broodling", 0, gv_pLAYER_06_INFESTORS, UnitGetPosition(EventUnit()));
if (auto1B27F4F2_val == "Mira") {
```

### thanson03a.SC2Map

- 标准基地开局调用次数：`1`
- 创建单位调用扫描数：`60`
- 指挥官硬编码分支数：`0`
- 是否已有 `Abathur` 字符串：`False`
- 基地替换：走全局 `CommanderAch/Abathur`，当前临时生成 `Hatchery/Drone/Overlord`。
- 需要逐关补丁：暂未发现指挥官分支，但有单位创建/货舱创建，需进图验证是否影响玩家初始体验。
- 扫描片段：

```text
libE0EAE146_gf_InitializeBase(PointFromId(3259), 8, null, true);
UnitCargoCreate(EventUnitProgressUnit(), "Marine", 4);
UnitCargoCreate(EventUnitProgressUnit(), "Marauder", 1);
libNtve_gf_CreateUnitsWithDefaultFacing(1, "Gateway", c_unitCreateConstruct, gv_pLAYER02_PROTOSSVANGUARD, PointFromId(2359));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "Gateway", c_unitCreateConstruct, gv_pLAYER02_PROTOSSVANGUARD, PointFromId(1927));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "PhotonCannon", c_unitCreateConstruct, gv_pLAYER02_PROTOSSVANGUARD, PointFromId(1930));
```

### thanson03b.SC2Map

- 标准基地开局调用次数：`1`
- 创建单位调用扫描数：`32`
- 指挥官硬编码分支数：`0`
- 是否已有 `Abathur` 字符串：`False`
- 基地替换：走全局 `CommanderAch/Abathur`，当前临时生成 `Hatchery/Drone/Overlord`。
- 需要逐关补丁：暂未发现指挥官分支，但有单位创建/货舱创建，需进图验证是否影响玩家初始体验。
- 扫描片段：

```text
libNtve_gf_CreateUnitsWithDefaultFacing(1, "InfestedCivilianBurrowed", 0, gv_p03_VIROPHAGE, RegionRandomPoint(gv_infestationRegion[lp_colony]));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "InfestedTerranCampaignBurrowed", 0, gv_p03_VIROPHAGE, RegionRandomPoint(gv_infestationRegion[lp_colony]));
UnitCargoCreate(lv_overlord, "Drone", 1);
libNtve_gf_CreateUnitsWithDefaultFacing(1, "NydusCanal", 0, lp_player, lp_spawnPoint);
libNtve_gf_CreateUnitsWithDefaultFacing(1, lp_unitType, 0, lp_player, PointWithOffset(UnitGetPosition(lp_nydusWorm), 0.0, -1.0));
libNtve_gf_CreateUnitsWithDefaultFacing(libNtve_gf_DifficultyValueInt(2, 3, 4, 6), "Broodling", 0, gv_p03_VIROPHAGE, UnitGetPosition(EventUnit()));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "Civilian", 0, gv_p05_COLONIST, RegionRandomPoint(RegionFromId(6)));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "InfestedCivilian", 0, gv_p03_VIROPHAGE, RegionRandomPoint(RegionFromId(55)));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "Zergling", 0, gv_p03_VIROPHAGE, RegionRandomPoint(RegionFromId(55)));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "Feederling", 0, gv_p07_ZERG_INFESTED, RegionRandomPoint(RegionFromId(9)));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "Feederling", 0, gv_p07_ZERG_INFESTED, RegionRandomPoint(RegionFromId(9)));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "Virophage", c_unitCreateIgnorePlacement, gv_p07_ZERG_INFESTED, RegionGetCenter(RegionFromId(9)));
```

### thorner01.SC2Map

- 标准基地开局调用次数：`1`
- 创建单位调用扫描数：`19`
- 指挥官硬编码分支数：`0`
- 是否已有 `Abathur` 字符串：`False`
- 基地替换：走全局 `CommanderAch/Abathur`，当前临时生成 `Hatchery/Drone/Overlord`。
- 需要逐关补丁：暂未发现指挥官分支，但有单位创建/货舱创建，需进图验证是否影响玩家初始体验。
- 扫描片段：

```text
libE0EAE146_gf_InitializeBase(PointFromId(1386835410), 6, null, true);
UnitCargoCreate(autoFCAC8300_var, "Marine", 5);
UnitCargoCreate(autoFCAC8300_var, "MengskMarine", 1);
libNtve_gf_CreateUnitsWithDefaultFacing(1, "AdjutantCapsule", 0, 0, PointFromId(2001));
```

### thorner02.SC2Map

- 标准基地开局调用次数：`1`
- 创建单位调用扫描数：`50`
- 指挥官硬编码分支数：`7`
- 是否已有 `Abathur` 字符串：`False`
- 基地替换：走全局 `CommanderAch/Abathur`，当前临时生成 `Hatchery/Drone/Overlord`。
- 需要逐关补丁：是。需要添加 `Abathur` 分支。
- 扫描片段：

```text
libNtve_gf_CreateUnitsWithDefaultFacing(1, "ElevatorBlocker", c_unitCreateIgnorePlacement, 0, RegionGetCenter(lp_salvageRegion));
libNtve_gf_CreateUnitsWithDefaultFacing(1, lp_salvageType, c_unitCreateIgnorePlacement, gv_p05_SCRAP, RegionGetCenter(lp_salvageRegion));
UnitCargoCreate(auto8FA23EE3_var, "WarPig", 4);
libNtve_gf_CreateUnitsWithDefaultFacing(1, "ElevatorBlocker", c_unitCreateIgnorePlacement, 0, RegionGetCenter(RegionFromId(20)));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "ElevatorBlocker", c_unitCreateIgnorePlacement, 0, RegionGetCenter(RegionFromId(21)));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "ElevatorBlocker", c_unitCreateIgnorePlacement, 0, RegionGetCenter(RegionFromId(12)));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "ElevatorBlocker", c_unitCreateIgnorePlacement, 0, RegionGetCenter(RegionFromId(8)));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "ElevatorBlocker", c_unitCreateIgnorePlacement, 0, RegionGetCenter(RegionFromId(13)));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "ElevatorBlocker", c_unitCreateIgnorePlacement, 0, RegionGetCenter(RegionFromId(14)));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "ElevatorBlocker", c_unitCreateIgnorePlacement, 0, RegionGetCenter(RegionFromId(18)));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "ElevatorBlocker", c_unitCreateIgnorePlacement, 0, RegionGetCenter(RegionFromId(19)));
libE0EAE146_gf_InitializeBase(PointFromId(275), 5, null, true);
```

### thorner03.SC2Map

- 标准基地开局调用次数：`1`
- 创建单位调用扫描数：`52`
- 指挥官硬编码分支数：`8`
- 是否已有 `Abathur` 字符串：`False`
- 基地替换：走全局 `CommanderAch/Abathur`，当前临时生成 `Hatchery/Drone/Overlord`。
- 需要逐关补丁：是。需要添加 `Abathur` 分支。
- 扫描片段：

```text
if (auto06F49FBE_val == "Stukov") {
libNtve_gf_CreateUnitsWithDefaultFacing(1, "InfestedBunkerNeutUprooted", 0, 1, UnitGetPosition(UnitFromId(4)));
UnitCargoCreate(UnitLastCreated(), "SIInfestedTrooper", 6);
else if (auto06F49FBE_val == "Tychus") {
libNtve_gf_CreateUnitsWithDefaultFacing(1, "TychusCoop", 0, 1, UnitGetPosition(UnitFromId(4)));
else if (auto06F49FBE_val == "Mira") {
libNtve_gf_CreateUnitsWithDefaultFacing(6, "ReaperMira", 0, 1, UnitGetPosition(UnitFromId(4)));
libNtve_gf_CreateUnitsWithDefaultFacing(2, "MedicMira", 0, 1, UnitGetPosition(UnitFromId(4)));
else if (auto06F49FBE_val == "Dehaka") {
libNtve_gf_CreateUnitsWithDefaultFacing(1, "DehakaCoop", 0, 1, UnitGetPosition(UnitFromId(4)));
else if (auto06F49FBE_val == "Nova") {
libNtve_gf_CreateUnitsWithDefaultFacing(1, "NovaCoop", 0, 1, UnitGetPosition(UnitFromId(4)));
```

### thorner04.SC2Map

- 标准基地开局调用次数：`1`
- 创建单位调用扫描数：`202`
- 指挥官硬编码分支数：`0`
- 是否已有 `Abathur` 字符串：`False`
- 基地替换：走全局 `CommanderAch/Abathur`，当前临时生成 `Hatchery/Drone/Overlord`。
- 需要逐关补丁：暂未发现指挥官分支，但有单位创建/货舱创建，需进图验证是否影响玩家初始体验。
- 扫描片段：

```text
UnitCargoCreate(lp_bunker, lp_type, lp_qty);
UnitCargoCreate(lv_dropship, lp_type1, lp_qty1);
UnitCargoCreate(lv_dropship, lp_type2, lp_qty2);
UnitCargoCreate(autoD7C882A8_var, "MengskMarine", libNtve_gf_DifficultyValueInt(4, 4, 4, 4));
UnitCargoCreate(autoD7C882A8_var, "MengskMarauder", libNtve_gf_DifficultyValueInt(1, 1, 1, 1));
UnitCargoCreate(auto93E6C453_var, "MengskMarauder", libNtve_gf_DifficultyValueInt(3, 3, 3, 3));
UnitCargoCreate(autoFAB62C6A_var, "MengskMarine", libNtve_gf_DifficultyValueInt(6, 6, 6, 6));
UnitCargoCreate(auto1BF4CEF9_var, "MengskMarine", libNtve_gf_DifficultyValueInt(4, 4, 4, 4));
UnitCargoCreate(auto1BF4CEF9_var, "Ghost", libNtve_gf_DifficultyValueInt(1, 1, 1, 1));
UnitCargoCreate(auto96185DF6_var, "MengskMarine", libNtve_gf_DifficultyValueInt(4, 4, 4, 4));
UnitCargoCreate(auto96185DF6_var, "MengskMarauder", libNtve_gf_DifficultyValueInt(1, 1, 1, 1));
UnitCargoCreate(autoF02D41CE_var, "MengskMarine", libNtve_gf_DifficultyValueInt(4, 4, 4, 4));
```

### thorner05s.SC2Map

- 标准基地开局调用次数：`1`
- 创建单位调用扫描数：`39`
- 指挥官硬编码分支数：`7`
- 是否已有 `Abathur` 字符串：`False`
- 基地替换：走全局 `CommanderAch/Abathur`，当前临时生成 `Hatchery/Drone/Overlord`。
- 需要逐关补丁：是。需要添加 `Abathur` 分支。
- 扫描片段：

```text
if (autoD5EA1928_val == "Dehaka") {
libNtve_gf_CreateUnitsWithDefaultFacing(3, "DehakaRavasaur", 0, 1, PointFromId(163));
libNtve_gf_CreateUnitsWithDefaultFacing(3, "DehakaHydraliskLevel2", 0, 1, PointFromId(163));
else if (autoD5EA1928_val == "Mira") {
libNtve_gf_CreateUnitsWithDefaultFacing(4, "ReaperMira", 0, 1, PointFromId(163));
libNtve_gf_CreateUnitsWithDefaultFacing(2, "MedicMira", 0, 1, PointFromId(163));
libNtve_gf_CreateUnitsWithDefaultFacing(2, "MarauderMira", 0, 1, PointFromId(163));
else if (autoD5EA1928_val == "Stukov") {
libNtve_gf_CreateUnitsWithDefaultFacing(1, "SIInfestedBunkerUpgUprooted", 0, 1, PointFromId(163));
UnitCargoCreate(UnitLastCreated(), "SIInfestedTrooper", 4);
libNtve_gf_CreateUnitsWithDefaultFacing(1, "SIInfestedBunkerUpgUprooted", 0, 1, PointFromId(163));
UnitCargoCreate(UnitLastCreated(), "SIInfestedTrooper", 4);
```

### traynor01.SC2Map

- 标准基地开局调用次数：`0`
- 创建单位调用扫描数：`107`
- 指挥官硬编码分支数：`33`
- 是否已有 `Abathur` 字符串：`False`
- 基地替换：不走标准基地开局，需要看地图脚本给兵/剧情逻辑。
- 需要逐关补丁：是。需要添加 `Abathur` 分支。
- 扫描片段：

```text
if ((libE0EAE146_gv_commander == "Mengsk")) {
if (auto935BE165_val == "Mira") {
libNtve_gf_CreateUnitsWithDefaultFacing(3, "ReaperMira", 0, gv_p7_MISSINGSOLDIERS, RegionGetCenter(RegionFromId(55)));
libNtve_gf_CreateUnitsWithDefaultFacing(3, "ReaperMira", 0, gv_p7_MISSINGSOLDIERS, RegionGetCenter(RegionFromId(56)));
libNtve_gf_CreateUnitsWithDefaultFacing(3, "ReaperMira", 0, gv_p7_MISSINGSOLDIERS, RegionGetCenter(RegionFromId(58)));
else if (auto935BE165_val == "Dehaka") {
else if (auto935BE165_val == "Nova") {
libNtve_gf_CreateUnitsWithDefaultFacing(2, "Marine_BlackOps", 0, gv_p7_MISSINGSOLDIERS, RegionGetCenter(RegionFromId(55)));
libNtve_gf_CreateUnitsWithDefaultFacing(2, "Marine_BlackOps", 0, gv_p7_MISSINGSOLDIERS, RegionGetCenter(RegionFromId(56)));
libNtve_gf_CreateUnitsWithDefaultFacing(3, "Marine_BlackOps", 0, gv_p7_MISSINGSOLDIERS, RegionGetCenter(RegionFromId(58)));
else if (auto935BE165_val == "Mengsk") {
libNtve_gf_CreateUnitsWithDefaultFacing(3, "TrooperMengsk", 0, gv_p7_MISSINGSOLDIERS, RegionGetCenter(RegionFromId(55)));
```

### traynor02.SC2Map

- 标准基地开局调用次数：`1`
- 创建单位调用扫描数：`9`
- 指挥官硬编码分支数：`0`
- 是否已有 `Abathur` 字符串：`False`
- 基地替换：走全局 `CommanderAch/Abathur`，当前临时生成 `Hatchery/Drone/Overlord`。
- 需要逐关补丁：暂未发现指挥官分支，但有单位创建/货舱创建，需进图验证是否影响玩家初始体验。
- 扫描片段：

```text
UnitCargoCreate(auto530A092E_var, "Marine", libNtve_gf_DifficultyValueInt(5, 5, 6, 6));
UnitCargoCreate(auto575A01C5_var, "Marine", libNtve_gf_DifficultyValueInt(6, 6, 6, 6));
libE0EAE146_gf_InitializeBase(PointFromId(629145339), 5, null, true);
```

### traynor03.SC2Map

- 标准基地开局调用次数：`1`
- 创建单位调用扫描数：`104`
- 指挥官硬编码分支数：`0`
- 是否已有 `Abathur` 字符串：`False`
- 基地替换：走全局 `CommanderAch/Abathur`，当前临时生成 `Hatchery/Drone/Overlord`。
- 需要逐关补丁：暂未发现指挥官分支，但有单位创建/货舱创建，需进图验证是否影响玩家初始体验。
- 扫描片段：

```text
UnitCargoCreate(auto494E13CC_var, "Marine", libNtve_gf_DifficultyValueInt(5, 5, 6, 6));
libE0EAE146_gf_InitializeBase(PointFromId(776), 6, null, true);
libNtve_gf_CreateUnitsWithDefaultFacing(6, "WarPig", 0, 6, RegionGetCenter(RegionFromId(72)));
libNtve_gf_CreateUnitsWithDefaultFacing(6, "WarPig", 0, 6, RegionGetCenter(RegionFromId(3)));
libNtve_gf_CreateUnitsWithDefaultFacing(6, "WarPig", 0, 6, RegionGetCenter(RegionFromId(71)));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "NydusCanal", 0, gv_pLAYER02_ZERG, RegionGetCenter(RegionFromId(32)));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "NydusCanal", 0, gv_pLAYER02_ZERG, RegionGetCenter(RegionFromId(33)));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "NydusCanal", 0, gv_pLAYER02_ZERG, RegionGetCenter(RegionFromId(34)));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "NydusCanal", 0, gv_pLAYER03_ZERG, RegionGetCenter(RegionFromId(35)));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "NydusCanal", 0, gv_pLAYER03_ZERG, RegionGetCenter(RegionFromId(36)));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "NydusCanal", 0, gv_pLAYER03_ZERG, RegionGetCenter(RegionFromId(37)));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "NydusCanal", 0, gv_pLAYER03_ZERG, RegionGetCenter(RegionFromId(38)));
```

### ttosh01.SC2Map

- 标准基地开局调用次数：`1`
- 创建单位调用扫描数：`86`
- 指挥官硬编码分支数：`0`
- 是否已有 `Abathur` 字符串：`False`
- 基地替换：走全局 `CommanderAch/Abathur`，当前临时生成 `Hatchery/Drone/Overlord`。
- 需要逐关补丁：暂未发现指挥官分支，但有单位创建/货舱创建，需进图验证是否影响玩家初始体验。
- 扫描片段：

```text
libE0EAE146_gf_InitializeBase(PointFromId(673), 8, null, true);
libNtve_gf_CreateUnitsWithDefaultFacing(1, "NaturalMinerals", 0, 0, PointFromId(240));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "NaturalMinerals", 0, 0, PointFromId(295));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "NaturalMinerals", 0, 0, PointFromId(989));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "NaturalMinerals", 0, 0, PointFromId(1040));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "NaturalMinerals", 0, 0, PointFromId(1041));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "NaturalMinerals", 0, 0, PointFromId(1042));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "NaturalMinerals", 0, 0, PointFromId(1043));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "NaturalMinerals", 0, 0, PointFromId(1044));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "NaturalMinerals", 0, 0, PointFromId(1045));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "NaturalMinerals", 0, 0, PointFromId(1046));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "NaturalMinerals", 0, 0, PointFromId(1047));
```

### ttosh02.SC2Map

- 标准基地开局调用次数：`1`
- 创建单位调用扫描数：`22`
- 指挥官硬编码分支数：`0`
- 是否已有 `Abathur` 字符串：`False`
- 基地替换：走全局 `CommanderAch/Abathur`，当前临时生成 `Hatchery/Drone/Overlord`。
- 需要逐关补丁：暂未发现指挥官分支，但有单位创建/货舱创建，需进图验证是否影响玩家初始体验。
- 扫描片段：

```text
libE0EAE146_gf_InitializeBase(PointFromId(922334820), 7, null, true);
UnitCargoCreate(UnitLastCreated(), "SCV", 8);
UnitCargoCreate(EventUnitProgressUnit(), "Marine", 6);
```

### ttosh03a.SC2Map

- 标准基地开局调用次数：`1`
- 创建单位调用扫描数：`41`
- 指挥官硬编码分支数：`0`
- 是否已有 `Abathur` 字符串：`False`
- 基地替换：走全局 `CommanderAch/Abathur`，当前临时生成 `Hatchery/Drone/Overlord`。
- 需要逐关补丁：暂未发现指挥官分支，但有单位创建/货舱创建，需进图验证是否影响玩家初始体验。
- 扫描片段：

```text
UnitCargoCreate(UnitFromId(6), "Marine", 4);
UnitCargoCreate(UnitFromId(7), "Marine", 4);
libE0EAE146_gf_InitializeBase(PointFromId(1565427663), 8, null, true);
UnitCargoCreate(autoA4A0E9D5_var, "Marine", libNtve_gf_DifficultyValueInt(4, 4, 4, 4));
UnitCargoCreate(autoA4A0E9D5_var, "Marauder", libNtve_gf_DifficultyValueInt(1, 1, 1, 1));
UnitCargoCreate(auto4E511087_var, "Marine", libNtve_gf_DifficultyValueInt(4, 4, 4, 4));
UnitCargoCreate(auto4E511087_var, "Ghost", libNtve_gf_DifficultyValueInt(1, 1, 1, 1));
UnitCargoCreate(auto2356FB0B_var, "Marine", libNtve_gf_DifficultyValueInt(4, 4, 4, 4));
UnitCargoCreate(auto2356FB0B_var, "Ghost", libNtve_gf_DifficultyValueInt(1, 1, 1, 1));
UnitCargoCreate(auto4D2B505E_var, "Marine", libNtve_gf_DifficultyValueInt(4, 4, 4, 4));
UnitCargoCreate(auto4D2B505E_var, "Ghost", libNtve_gf_DifficultyValueInt(1, 1, 1, 1));
UnitCargoCreate(autoCB8C1964_var, "Marine", libNtve_gf_DifficultyValueInt(4, 4, 4, 4));
```

### ttosh03b.SC2Map

- 标准基地开局调用次数：`0`
- 创建单位调用扫描数：`54`
- 指挥官硬编码分支数：`8`
- 是否已有 `Abathur` 字符串：`False`
- 基地替换：不走标准基地开局，需要看地图脚本给兵/剧情逻辑。
- 需要逐关补丁：是。需要添加 `Abathur` 分支。
- 扫描片段：

```text
libNtve_gf_CreateUnitsWithDefaultFacing(libNtve_gf_DifficultyValueInt(5, 5, 6, 8), "HotSRaptor", 0, lv_zergPlayer, lp_spawnPoint);
libNtve_gf_CreateUnitsWithDefaultFacing(libNtve_gf_DifficultyValueInt(1, 1, 1, 2), "RoachVile", 0, lv_zergPlayer, lp_spawnPoint);
libNtve_gf_CreateUnitsWithDefaultFacing(libNtve_gf_DifficultyValueInt(2, 2, 3, 4), "HotSRaptor", 0, lv_zergPlayer, lp_spawnPoint);
libNtve_gf_CreateUnitsWithDefaultFacing(libNtve_gf_DifficultyValueInt(1, 1, 1, 2), "Hydralisk", 0, lv_zergPlayer, lp_spawnPoint);
libNtve_gf_CreateUnitsWithDefaultFacing(libNtve_gf_DifficultyValueInt(1, 1, 1, 1), "Ravager", 0, lv_zergPlayer, lp_spawnPoint);
libNtve_gf_CreateUnitsWithDefaultFacing(libNtve_gf_DifficultyValueInt(2, 2, 2, 2), "HotSRaptor", 0, lv_zergPlayer, lp_spawnPoint);
libNtve_gf_CreateUnitsWithDefaultFacing(libNtve_gf_DifficultyValueInt(2, 2, 3, 3), "HotSRaptor", 0, lv_zergPlayer, lp_spawnPoint);
libNtve_gf_CreateUnitsWithDefaultFacing(libNtve_gf_DifficultyValueInt(0, 0, 1, 1), "Hydralisk", 0, lv_zergPlayer, lp_spawnPoint);
libNtve_gf_CreateUnitsWithDefaultFacing(libNtve_gf_DifficultyValueInt(2, 2, 2, 3), "HotSRaptor", 0, lv_zergPlayer, lp_spawnPoint);
libNtve_gf_CreateUnitsWithDefaultFacing(libNtve_gf_DifficultyValueInt(1, 1, 1, 1), "RoachCorpser", 0, lv_zergPlayer, lp_spawnPoint);
libNtve_gf_CreateUnitsWithDefaultFacing(libNtve_gf_DifficultyValueInt(5, 6, 8, 4), "HotSRaptor", 0, lv_zergPlayer, lp_spawnPoint);
libNtve_gf_CreateUnitsWithDefaultFacing(libNtve_gf_DifficultyValueInt(0, 0, 0, 1), "Ultralisk", 0, lv_zergPlayer, lp_spawnPoint);
```

### ttychus01.SC2Map

- 标准基地开局调用次数：`1`
- 创建单位调用扫描数：`53`
- 指挥官硬编码分支数：`0`
- 是否已有 `Abathur` 字符串：`False`
- 基地替换：走全局 `CommanderAch/Abathur`，当前临时生成 `Hatchery/Drone/Overlord`。
- 需要逐关补丁：暂未发现指挥官分支，但有单位创建/货舱创建，需进图验证是否影响玩家初始体验。
- 扫描片段：

```text
libE0EAE146_gf_InitializeBase(PointFromId(266969295), 6, null, true);
```

### ttychus02.SC2Map

- 标准基地开局调用次数：`1`
- 创建单位调用扫描数：`53`
- 指挥官硬编码分支数：`15`
- 是否已有 `Abathur` 字符串：`False`
- 基地替换：走全局 `CommanderAch/Abathur`，当前临时生成 `Hatchery/Drone/Overlord`。
- 需要逐关补丁：是。需要添加 `Abathur` 分支。
- 扫描片段：

```text
if (auto6309E628_val == "Dehaka") {
UnitCargoCreate(UnitLastCreated(), "DehakaPrimalSwarmHost", 2);
else if (auto6309E628_val == "Mira") {
UnitCargoCreate(UnitLastCreated(), "SiegeBreakerMira", 2);
else if (auto6309E628_val == "Stukov") {
UnitCargoCreate(UnitLastCreated(), "StukovInfestedSiegeTankUprooted", 1);
UnitCargoCreate(UnitLastCreated(), "StukovInfestedSiegeTankUprooted", 1);
else if (auto6309E628_val == "Nova") {
UnitCargoCreate(UnitLastCreated(), "SiegeTank_BlackOps", 2);
else if (auto6309E628_val == "Mengsk") {
UnitCargoCreate(UnitLastCreated(), "SiegeTankMengsk", 2);
else if (auto6309E628_val == "Swann") {
```

### ttychus03.SC2Map

- 标准基地开局调用次数：`1`
- 创建单位调用扫描数：`27`
- 指挥官硬编码分支数：`2`
- 是否已有 `Abathur` 字符串：`False`
- 基地替换：走全局 `CommanderAch/Abathur`，当前临时生成 `Hatchery/Drone/Overlord`。
- 需要逐关补丁：是。需要添加 `Abathur` 分支。
- 扫描片段：

```text
libE0EAE146_gf_InitializeBase(PointFromId(1485279121), 7, null, true);
if (autoBEEAC669_val == "Mira") {
else if (autoBEEAC669_val == "Mengsk") {
libNtve_gf_CreateUnitsWithDefaultFacing(1, lv_tYPE, 0, gv_p01_USER, lv_pOINT);
libNtve_gf_CreateUnitsWithDefaultFacing(1, "NydusCanal", 0, gv_p05_ZERG_BASE, RegionGetCenter(RegionFromId(79)));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "NydusCanal", 0, gv_p05_ZERG_BASE, RegionGetCenter(RegionFromId(80)));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "NydusCanal", 0, gv_p05_ZERG_BASE, RegionGetCenter(RegionFromId(38)));
libNtve_gf_CreateUnitsWithDefaultFacing(3, "Zergling", 0, gv_p05_ZERG_BASE, UnitGetPosition(lv_victoryWorm[lv_wormIndex]));
libNtve_gf_CreateUnitsWithDefaultFacing(5, "Zergling", 0, gv_p02_ZERG, PointFromId(2187));
libNtve_gf_CreateUnitsWithDefaultFacing(5, "Zergling", 0, gv_p02_ZERG, PointFromId(2187));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "Kerrigan", 0, gv_p07_ZERG_KERRIGAN, PointFromId(1));
```

### ttychus04.SC2Map

- 标准基地开局调用次数：`1`
- 创建单位调用扫描数：`45`
- 指挥官硬编码分支数：`7`
- 是否已有 `Abathur` 字符串：`False`
- 基地替换：走全局 `CommanderAch/Abathur`，当前临时生成 `Hatchery/Drone/Overlord`。
- 需要逐关补丁：是。需要添加 `Abathur` 分支。
- 扫描片段：

```text
libNtve_gf_CreateUnitsWithDefaultFacing(1, "Blocker16x16", c_unitCreateIgnorePlacement, 0, lp_ejectionTarget);
if (autoFDF18DCD_val == "Mira") {
libNtve_gf_CreateUnitsWithDefaultFacing(1, "WraithMira", 0, 1, PointFromId(394));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "WraithMira", 0, 1, PointFromId(395));
else if (autoFDF18DCD_val == "Dehaka") {
libNtve_gf_CreateUnitsWithDefaultFacing(1, "DehakaMutaliskLevel3", 0, 1, PointFromId(394));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "DehakaGuardian", 0, 1, PointFromId(394));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "DehakaMutaliskLevel3", 0, 1, PointFromId(395));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "DehakaGuardian", 0, 1, PointFromId(395));
else if (autoFDF18DCD_val == "Stukov") {
libNtve_gf_CreateUnitsWithDefaultFacing(1, "StukovInfestedBanshee", 0, 1, PointFromId(394));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "StukovInfestedBanshee", 0, 1, PointFromId(395));
```

### ttychus05.SC2Map

- 标准基地开局调用次数：`1`
- 创建单位调用扫描数：`33`
- 指挥官硬编码分支数：`7`
- 是否已有 `Abathur` 字符串：`False`
- 基地替换：走全局 `CommanderAch/Abathur`，当前临时生成 `Hatchery/Drone/Overlord`。
- 需要逐关补丁：是。需要添加 `Abathur` 分支。
- 扫描片段：

```text
libNtve_gf_CreateUnitsWithDefaultFacing(1, "VoidRift", 0, gv_pLAYER_02_NYON, RegionRandomPoint(gv_voidRiftSpawns));
if (auto901728B1_val == "Stukov") {
libNtve_gf_CreateUnitsWithDefaultFacing(3, "StukovInfestedBanshee", 0, 1, PointFromId(1709600040));
libNtve_gf_CreateUnitsWithDefaultFacing(3, "SILiberator", 0, 1, PointFromId(2080109945));
else if (auto901728B1_val == "Mira") {
libNtve_gf_CreateUnitsWithDefaultFacing(1, "BattlecruiserMira", 0, 1, PointFromId(1709600040));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "BattlecruiserMira", 0, 1, PointFromId(2080109945));
else if (auto901728B1_val == "Dehaka") {
libNtve_gf_CreateUnitsWithDefaultFacing(3, "DehakaMutaliskLevel3", 0, 1, PointFromId(1709600040));
libNtve_gf_CreateUnitsWithDefaultFacing(3, "DehakaMutaliskLevel3", 0, 1, PointFromId(2080109945));
else if (auto901728B1_val == "Nova") {
libNtve_gf_CreateUnitsWithDefaultFacing(2, "Liberator_BlackOps", 0, 1, PointFromId(1709600040));
```

### tvalerian01.SC2Map

- 标准基地开局调用次数：`0`
- 创建单位调用扫描数：`331`
- 指挥官硬编码分支数：`66`
- 是否已有 `Abathur` 字符串：`False`
- 基地替换：不走标准基地开局，需要看地图脚本给兵/剧情逻辑。
- 需要逐关补丁：是。需要添加 `Abathur` 分支。
- 扫描片段：

```text
if (auto412F2E68_val == "Stukov") {
libNtve_gf_CreateUnitsWithDefaultFacing(1, "SIInfestedBunkerUpg", 0, gv_p12_MOEBIUS, PointFromId(385406063));
UnitCargoCreate(UnitLastCreated(), "SIInfestedTrooper", 4);
libNtve_gf_CreateUnitsWithDefaultFacing(2, "StukovInfestedSiegeTank", 0, gv_p12_MOEBIUS, PointFromId(855382681));
libNtve_gf_CreateUnitsWithDefaultFacing(2, "StukovInfestedDiamondBack", 0, gv_p12_MOEBIUS, PointFromId(898485624));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "SIInfestedBunkerUpg", 0, gv_p12_MOEBIUS, PointFromId(95514741));
UnitCargoCreate(UnitLastCreated(), "SIInfestedTrooper", 4);
libNtve_gf_CreateUnitsWithDefaultFacing(1, "SIInfestedBunkerUpg", 0, gv_p12_MOEBIUS, PointFromId(95514741));
UnitCargoCreate(UnitLastCreated(), "SIInfestedTrooper", 4);
libNtve_gf_CreateUnitsWithDefaultFacing(2, "StukovInfestedDiamondBack", 0, gv_p12_MOEBIUS, PointFromId(1089641768));
libNtve_gf_CreateUnitsWithDefaultFacing(2, "StukovInfestedSiegeTank", 0, gv_p12_MOEBIUS, PointFromId(665));
libNtve_gf_CreateUnitsWithDefaultFacing(2, "StukovInfestedDiamondBack", 0, gv_p12_MOEBIUS, PointFromId(344935602));
```

### tvalerian02a.SC2Map

- 标准基地开局调用次数：`1`
- 创建单位调用扫描数：`71`
- 指挥官硬编码分支数：`0`
- 是否已有 `Abathur` 字符串：`False`
- 基地替换：走全局 `CommanderAch/Abathur`，当前临时生成 `Hatchery/Drone/Overlord`。
- 需要逐关补丁：暂未发现指挥官分支，但有单位创建/货舱创建，需进图验证是否影响玩家初始体验。
- 扫描片段：

```text
libE0EAE146_gf_InitializeBase(PointFromId(255194360), 8, null, true);
UnitCargoCreate(auto71ED18DF_var, "MengskMarine", 4);
UnitCargoCreate(auto71ED18DF_var, "MengskMarauder", 1);
UnitCargoCreate(EventUnitProgressUnit(), "MengskMarine", 4);
libNtve_gf_CreateUnitsWithDefaultFacing(1, "CreepTumor", 0, gv_p2_JORMUNGAND, PointFromId(1904));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "CreepTumor", 0, gv_p2_JORMUNGAND, PointFromId(1905));
```

### tvalerian02b.SC2Map

- 标准基地开局调用次数：`1`
- 创建单位调用扫描数：`90`
- 指挥官硬编码分支数：`0`
- 是否已有 `Abathur` 字符串：`False`
- 基地替换：走全局 `CommanderAch/Abathur`，当前临时生成 `Hatchery/Drone/Overlord`。
- 需要逐关补丁：暂未发现指挥官分支，但有单位创建/货舱创建，需进图验证是否影响玩家初始体验。
- 扫描片段：

```text
libE0EAE146_gf_InitializeBase(PointFromId(95382482), 8, null, true);
libNtve_gf_CreateUnitsWithDefaultFacing(1, "MineralCrystal", 0, 0, PointFromId(201));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "MineralCrystal", 0, 0, PointFromId(204));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "MineralCrystal", 0, 0, PointFromId(217));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "MineralCrystal", 0, 0, PointFromId(218));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "MineralCrystal", 0, 0, PointFromId(224));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "NaturalGas", 0, 0, PointFromId(87));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "NaturalGas", 0, 0, PointFromId(89));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "NaturalGas", 0, 0, PointFromId(91));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "NaturalGas", 0, 0, PointFromId(93));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "NaturalGas", 0, 0, PointFromId(98));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "MineralCrystal", 0, 0, PointFromId(236));
```

### tvalerian03.SC2Map

- 标准基地开局调用次数：`1`
- 创建单位调用扫描数：`58`
- 指挥官硬编码分支数：`0`
- 是否已有 `Abathur` 字符串：`False`
- 基地替换：走全局 `CommanderAch/Abathur`，当前临时生成 `Hatchery/Drone/Overlord`。
- 需要逐关补丁：暂未发现指挥官分支，但有单位创建/货舱创建，需进图验证是否影响玩家初始体验。
- 扫描片段：

```text
libNtve_gf_CreateUnitsWithDefaultFacing(12, "MutaliskBroodlord", 0, 2, lp_s);
libNtve_gf_CreateUnitsWithDefaultFacing(4, "Corruptor", 0, 2, lp_s);
libNtve_gf_CreateUnitsWithDefaultFacing(8, "MutaliskBroodlord", 0, 2, lp_s);
libNtve_gf_CreateUnitsWithDefaultFacing(3, "Guardian", 0, 2, lp_s);
libNtve_gf_CreateUnitsWithDefaultFacing(3, "DevourerMP", 0, 2, lp_s);
libNtve_gf_CreateUnitsWithDefaultFacing(8, "MutaliskBroodlord", 0, 2, lp_s);
libNtve_gf_CreateUnitsWithDefaultFacing(3, "BroodLord", 0, 2, lp_s);
libNtve_gf_CreateUnitsWithDefaultFacing(1, "NydusCanal", 0, gv_p03_KILYSA, lp_p);
libNtve_gf_CreateUnitsWithDefaultFacing(8, "HotSRaptor", 0, gv_p03_KILYSA, lp_p);
libNtve_gf_CreateUnitsWithDefaultFacing(5, "RoachVile", 0, gv_p03_KILYSA, lp_p);
libNtve_gf_CreateUnitsWithDefaultFacing(3, "HydraliskImpaler", 0, gv_p03_KILYSA, lp_p);
libNtve_gf_CreateUnitsWithDefaultFacing(3, "InfestedAbomination", 0, gv_p03_KILYSA, lp_p);
```

### tzeratul01

- 标准基地开局调用次数：`0`
- 创建单位调用扫描数：`114`
- 指挥官硬编码分支数：`9`
- 是否已有 `Abathur` 字符串：`False`
- 基地替换：不走标准基地开局，需要看地图脚本给兵/剧情逻辑。
- 需要逐关补丁：是。需要添加 `Abathur` 分支。
- 扫描片段：

```text
if (auto267AB7ED_val == "Stukov") {
libNtve_gf_CreateUnitsWithDefaultFacing(1, "SIStukov", 0, 1, PointFromId(524));
else if (auto267AB7ED_val == "Dehaka") {
libNtve_gf_CreateUnitsWithDefaultFacing(1, "DehakaCoop", 0, 1, PointFromId(524));
else if (auto267AB7ED_val == "Mira") {
libNtve_gf_CreateUnitsWithDefaultFacing(2, "MedicMira", 0, 1, PointFromId(524));
libNtve_gf_CreateUnitsWithDefaultFacing(2, "GhostMira", 0, 1, PointFromId(524));
else if (auto267AB7ED_val == "Tychus") {
libNtve_gf_CreateUnitsWithDefaultFacing(1, "TychusCoop", 0, 1, PointFromId(524));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "TychusMedic", 0, 1, PointFromId(524));
else if (auto267AB7ED_val == "Nova") {
libNtve_gf_CreateUnitsWithDefaultFacing(2, "MercMedic", 0, 1, PointFromId(524));
```

### tzeratul02.SC2Map

- 标准基地开局调用次数：`1`
- 创建单位调用扫描数：`12`
- 指挥官硬编码分支数：`0`
- 是否已有 `Abathur` 字符串：`False`
- 基地替换：走全局 `CommanderAch/Abathur`，当前临时生成 `Hatchery/Drone/Overlord`。
- 需要逐关补丁：暂未发现指挥官分支，但有单位创建/货舱创建，需进图验证是否影响玩家初始体验。
- 扫描片段：

```text
libE0EAE146_gf_InitializeBase(PointFromId(82), 6, null, true);
```

### tzeratul03.SC2Map

- 标准基地开局调用次数：`1`
- 创建单位调用扫描数：`67`
- 指挥官硬编码分支数：`0`
- 是否已有 `Abathur` 字符串：`False`
- 基地替换：走全局 `CommanderAch/Abathur`，当前临时生成 `Hatchery/Drone/Overlord`。
- 需要逐关补丁：暂未发现指挥官分支，但有单位创建/货舱创建，需进图验证是否影响玩家初始体验。
- 扫描片段：

```text
UnitCargoCreate(UnitFromId(685), "Zeratul", 1);
libE0EAE146_gf_InitializeBase(PointFromId(2109449659), 7, null, true);
libNtve_gf_CreateUnitsWithDefaultFacing(1, "Overmind", c_unitCreateIgnorePlacement, gv_p05_ZERG_LOW_GROUND_NOAI, PointFromId(230));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "PathingBlocker2x2", c_unitCreateIgnorePlacement, gv_p05_ZERG_LOW_GROUND_NOAI, PointFromId(1057));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "PathingBlocker2x2", c_unitCreateIgnorePlacement, gv_p05_ZERG_LOW_GROUND_NOAI, PointFromId(1062));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "PathingBlocker2x2", c_unitCreateIgnorePlacement, gv_p05_ZERG_LOW_GROUND_NOAI, PointFromId(1063));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "PathingBlocker2x2", c_unitCreateIgnorePlacement, gv_p05_ZERG_LOW_GROUND_NOAI, PointFromId(1064));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "Spire", 0, gv_p05_ZERG_LOW_GROUND_NOAI, PointFromId(675));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "SpawningPool", 0, gv_p05_ZERG_LOW_GROUND_NOAI, PointFromId(321));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "SporeCrawler", 0, gv_p05_ZERG_LOW_GROUND_NOAI, PointFromId(569));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "SporeCrawler", 0, gv_p05_ZERG_LOW_GROUND_NOAI, PointFromId(568));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "Egg", 0, gv_p05_ZERG_LOW_GROUND_NOAI, RegionRandomPoint(RegionFromId(23)));
```

### tzeratul04.SC2Map

- 标准基地开局调用次数：`1`
- 创建单位调用扫描数：`86`
- 指挥官硬编码分支数：`0`
- 是否已有 `Abathur` 字符串：`False`
- 基地替换：走全局 `CommanderAch/Abathur`，当前临时生成 `Hatchery/Drone/Overlord`。
- 需要逐关补丁：暂未发现指挥官分支，但有单位创建/货舱创建，需进图验证是否影响玩家初始体验。
- 扫描片段：

```text
libNtve_gf_CreateUnitsWithDefaultFacing(1, "NydusCanal", 0, 7, lp_p);
libNtve_gf_CreateUnitsWithDefaultFacing(5, "HotSSwarmling", 0, 7, UnitGetPosition(lv_u));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "NydusCanal", 0, 7, lp_p);
libNtve_gf_CreateUnitsWithDefaultFacing(3, "RoachVile", 0, 7, UnitGetPosition(lv_u));
libNtve_gf_CreateUnitsWithDefaultFacing(4, "HydraliskImpaler", 0, 7, lp_p);
libNtve_gf_CreateUnitsWithDefaultFacing(1, "SpineCrawlerUprooted", 0, lv_pLAYER, RegionGetCenter(lv_sPAWN));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "SporeCrawlerUprooted", 0, lv_pLAYER, RegionGetCenter(lv_sPAWN));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "InvisiblePylon", 0, gv_p08_ARCHIVE, PointFromId(846));
libE0EAE146_gf_InitializeBase(PointFromId(1655098256), 10, PointFromId(1603034641), true);
libNtve_gf_CreateUnitsWithDefaultFacing(1, "Hive", 0, gv_p04_ZERG_NW, PointFromId(1130));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "Hive", 0, gv_p04_ZERG_NW, PointFromId(1131));
libNtve_gf_CreateUnitsWithDefaultFacing(1, "Hive", 0, gv_p04_ZERG_NW, PointFromId(1132));
```

## 8. 后续开发计划

### 阶段 A：稳定基础，不再丢基地

- [ ] 保持 `CommandCenter/Worker/SecondUnit = Hatchery/Drone/Overlord`，直到阿巴瑟专属单位数据完整。
- [ ] 在 `XMFinal` 的阿巴瑟分支内只创建确定存在的单位/效果，避免黑屏或基地消失。
- [ ] 每次修改后启动 `Launcher.SC2Map`，检查 `Documents/StarCraft II/GameLogs/*ScriptError.txt`。

### 阶段 B：阿巴瑟核心机制

- [ ] 生物质掉落：验证敌方非建筑死亡是否生成 `BiomassPickupAbathur`。
- [ ] 生物质拾取：验证玩家非建筑单位靠近拾取后是否增加自定义值/行为。
- [ ] 生物质加成：实现生命、攻速、伤害或护甲加成；需要上限和 UI 提示。
- [ ] 生物质视觉：给掉落物、拾取提示、单位状态补图标/文字。

### 阶段 C：顶部面板

- [ ] 将当前 Move/Stop 占位按钮替换为阿巴瑟按钮。
- [ ] 毒巢投放：按钮、目标点效果、冷却、充能。
- [ ] 共生体/治疗/强化相关技能：确认采用官方技能还是近似实现。
- [ ] 终极进化：实现残暴虫/利维坦入口，至少能从高生物质单位触发。

### 阶段 D：单位与建筑树

- [ ] 基于原生 `Hatchery/Drone/Overlord` 补阿巴瑟训练树，先不要再直接切换到 `HatcheryAbathur`。
- [ ] 补虫族基础：跳虫、蟑螂、刺蛇、异龙、宿主、腐化者。
- [ ] 补阿巴瑟特色：破坏者、守护者、吞噬者、残暴虫、利维坦。
- [ ] 补科技需求、按钮、中文文本、图标。

### 阶段 E：逐关补丁

- [ ] 先补无基地关卡：`traynor01`、`ttosh03b`、`tvalerian01`、`tzeratul01`。
- [ ] 再补有基地但存在特殊给兵的关卡：`thanson01`、`thorner02`、`thorner03`、`thorner05s`、`ttychus02`、`ttychus04`、`ttychus05` 等。
- [ ] 每补一张图，记录该图的阿巴瑟分支单位、是否同步、是否实机验证。

### 阶段 F：验证清单

- [ ] Launcher 候选显示阿巴瑟。
- [ ] 选择阿巴瑟后银行 `Ach/Commander` 保存为 `Abathur`。
- [ ] 标准基地图开局有基地、工蜂、王虫。
- [ ] 无基地图开局有阿巴瑟对应小队。
- [ ] 顶部面板有阿巴瑟技能按钮而非占位按钮。
- [ ] 敌人死亡掉生物质。
- [ ] 单位能拾取生物质并获得加成。
- [ ] 没有新的 `ScriptError.txt`。
