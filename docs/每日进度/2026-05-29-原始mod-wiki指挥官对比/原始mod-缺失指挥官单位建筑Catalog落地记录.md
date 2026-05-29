# 原始mod 缺失指挥官单位建筑 Catalog 落地记录

生成时间：2026-05-29

## 结论

本轮已经实际修改 `原始mod` 的游戏数据，不只是改文档或 Galaxy 名册。原先 wiki/官方合作对比中“只有官方有、原始mod 没有直接 CUnit”的 6 类单位/建筑，已经补入：

`原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData`

官方事实回查口径已切到：

`游戏数据/官方SC2原始文本镜像`

旧 `references/sc2-build-96883-casc-export` 不再作为本轮事实源。

## 2026-05-29 追加：七指挥官基础 CUnit 灰区清零

阿拉纳克、阿塔尼斯、菲尼克斯、凯拉克斯、凯瑞甘、雷诺、沃拉尊此前仍有单位/建筑只命中底层基础镜像。本轮已经把 39 个基础单位/建筑 CUnit 补进 XMFinal，并连带补入同名 actor/button/model/weapon/effect 覆盖节点，7 个指挥官当前 `activeLevel=base` 均为 0。

详细单位、建筑、费用、生命/护盾、按钮/武器/行为效果见：

`docs/每日进度/2026-05-29-原始mod-wiki指挥官对比/七指挥官基础CUnit补齐记录.md`

## 已落地项

| 指挥官 | 单位/建筑 | CUnit | 当前效果 |
|---|---|---|---|
| 阿塔尼斯 | Reaver，星灵金甲虫/掠夺者，非人族劫掠者 | `Reaver` | 继承 `ReaverPr`；修理时间 42.9；命令卡有移动、停止、攻击、金甲虫弹药、弹药上限被动、溅射半径被动。 |
| 凯拉克斯 | 凯达林巨石 | `KhaydarinMonolith` | 继承 `KhaydarinMonolithPr`；生命 200；成本 300 晶体矿/100 高能瓦斯；修理时间 40；命令卡有建筑攻击、炮台射程升级、炮台攻速升级。 |
| 凯瑞甘 | 欧米茄坑道虫 | `GreaterNydusWorm` / `GreaterNydusWormAlly` | 生命 1000；护甲 2；回血 0.2734；成本 100 晶体矿/100 高能瓦斯；视野 10；最大货物数 500、总货舱 500、最大单体货物 8、卸载距离 10、装卸周期 0.05；带侦测、虫苔、盟友虫道创建链。 |
| 沃拉尊 | 黑暗执政官 | `DarkArchon` | 生命 10；护盾 350；能量初始 50、上限 200、回能 0.5625；移速 2.8125；人口 -4；成本 175 晶体矿/275 高能瓦斯；带神经错乱和精神控制。 |
| 沃拉尊 | 黑暗水晶塔 | `DarkPylon` | 生命 200；护盾 200；补给 8；成本 100 晶体矿；视野 9；召回 500 射程、60 秒冷却；隐形光环半径 6.5；矩阵过载目标持续 15 秒，移速 +25%、攻速 +15%。 |
| 扎加拉 | 胆汁喷射体 | `BileLauncherZagara` | 生命 400；护甲 1；回血 0.2734；成本 125 晶体矿/100 高能瓦斯；视野 11；武器 15 射程、7 秒周期、1.5 秒前摇；命中搜索半径 2，溅射伤害 75。 |

## 技能与效果数值

### 黑暗执政官

- `DarkArchonConfusion`：50 能量，8 秒冷却，9 射程。
- `DarkArchonConfusionSearch`：目标点 2 半径搜索。
- `DarkArchonConfusion` 行为：持续 10 秒，每 1 秒周期处理。
- `DarkArchonMindControl`：150 能量，30 秒冷却，9 射程。
- `DarkArchonMindControl` 行为：目标玩家改为施法者；结束效果 `MindControlDummyMU`；压制 Build/Merge/Research/Train/WarpTrain 类能力。

### 欧米茄坑道虫

- `GreaterNydusWormTransport`：装载距离 0.5，最大卸载距离 10。
- 货舱：`MaxCargoCount=500`，`TotalCargoSpace=500`，`MaxCargoSize=8`。
- 装卸：初始卸载延迟 0.5，装载周期 0.05，卸载周期 0.05。
- 盟友虫道：`GreaterNydusWormAllySearch` 搜索半径 500，创建 `GreaterNydusWormAlly`。

### 黑暗水晶塔

- `DarkPylonRecall`：500 射程，60 秒冷却。
- `DarkPylonRecallSearch`：目标点 5 半径搜索，传送落点范围 15。
- `DarkPylonPowerSource`：供能半径 6.5。
- `DarkPylonCloakAura`：每 0.25 秒搜索，隐形半径 6.5。
- `DarkPylonCloakTarget`：每次刷新持续 0.5 秒，给目标加 Cloak 状态。
- `MatrixOverload`：每 2 秒搜索半径 6。
- `MatrixOverloadTarget`：持续 15 秒，`MoveSpeedMultiplier=1.25`，`AttackSpeedMultiplier=1.15`。

### 胆汁喷射体

- `BileLauncherZagaraBombardment`：射程 15，周期 7，前摇 1.5。
- `BileLauncherZagaraBombardmentDelayCP`：1.5 秒后发射。
- `BileLauncherZagaraBombardment` mover：弹道驱动，速度 10，最大速度 18.75，重力 20。
- `BileLauncherZagaraBombardmentDamageSearch`：半径 2。
- `BileLauncherZagaraBombardmentDamage`：溅射伤害 75。
- `BileLauncherZagara` 炮塔：`YawRate=119.8828`。

## 修改的游戏数据文件

| 文件 | 主要改动 |
|---|---|
| `UnitData.xml` | 新增/补齐 `DarkArchon`、`KhaydarinMonolith`、`GreaterNydusWorm`、`GreaterNydusWormAlly`、`Reaver`、`DarkPylon`、`BileLauncherZagara`、`BileLauncherZagaraMissile`。 |
| `AbilData.xml` | 新增黑暗执政官神经错乱/精神控制、欧米茄运输/集结、黑暗水晶塔召回、胆汁喷射体攻击。 |
| `ButtonData.xml` | 新增上述单位/建筑和被动升级按钮，包含召回、隐形光环、矩阵过载、胆汁轰击等命令卡入口。 |
| `RequirementData.xml` | 新增对应等级/升级显示与使用需求。 |
| `BehaviorData.xml` | 新增欧米茄盟友虫道、黑暗水晶塔供能/隐形/矩阵过载、黑暗执政官神经错乱/精神控制行为。 |
| `EffectData.xml` | 新增精神控制、神经错乱、欧米茄盟友虫道创建、召回、矩阵过载、胆汁喷射体发射和伤害链。 |
| `ValidatorData.xml` | 新增本轮效果链需要的过滤器和指挥官/目标校验器。 |
| `WeaponData.xml` | 新增 `BileLauncherZagaraBombardment`。 |
| `ModelData.xml` | 新增欧米茄坑道虫、黑暗水晶塔、凯达林巨石、黑暗执政官、胆汁喷射体相关模型引用。 |
| `ActorData.xml` | 新增上述单位/建筑 actor，补胆汁导弹和攻击 actor。 |
| `FootprintData.xml` | 新增 2x2 虫苔/黑暗水晶塔、3x3 欧米茄放置 footprint。 |
| `MoverData.xml` | 新增胆汁喷射体导弹 mover。 |
| `TurretData.xml` | 新增胆汁喷射体炮塔和黑暗水晶塔旋转炮塔。 |

## 名册与脚本同步

- `scripts/sc2/generate-xmfinal-commander-profiles.mjs`
  - 阿塔尼斯加入 `Reaver`。
  - 凯拉克斯加入 `KhaydarinMonolith`。
  - 凯瑞甘加入 `GreaterNydusWorm`。
  - 沃拉尊加入 `DarkArchon`、`DarkPylon`。
  - 扎加拉加入 `BileLauncherZagara`。
- 已重新生成：
  - `LibE0EAE146_CommanderRosters.galaxy`
  - `LibE0EAE146_CommanderBuildings.galaxy`
  - `LibE0EAE146_CommanderUnitAbilities.galaxy`
- 审计脚本已切换到 `游戏数据/官方SC2原始文本镜像`：
  - `scripts/sc2/audit-xmfinal-commander-profiles.mjs`
  - `scripts/sc2/audit-xmfinal-catalog-dependencies.mjs`
  - `scripts/sc2/compare-wiki-commander-roster-vs-active-mod.mjs`

## 主动未接的链

黑暗水晶塔没有接 `PhotonOverchargeMorphDarkPylon`。官方光子过载链会继续牵出 `DarkPylonOvercharged`、`PhotonOverchargeMorphDarkPylonBack`、`MothershipCoreWeapon`、过载武器/导弹/actor 等完整闭包；只接半截会制造更隐蔽的坏按钮。本轮只保留合作核心效果：召回、隐形光环、矩阵过载。

## 验证记录

已通过静态验证：

- XML 解析：本轮涉及的 `UnitData.xml`、`AbilData.xml`、`ButtonData.xml`、`RequirementData.xml`、`BehaviorData.xml`、`EffectData.xml`、`ValidatorData.xml`、`WeaponData.xml`、`ModelData.xml`、`ActorData.xml`、`TurretData.xml`、`MoverData.xml`、`FootprintData.xml` 均可解析。
- Profile 生成器：`node .\scripts\sc2\generate-xmfinal-commander-profiles.mjs --check` 通过。
- Profile/Catalog 审计：`PROFILE_HARD_MISSING=0`，`ROSTER_BUILDING_CATALOG_MISSING_ENTRIES=0`，`ABILITY_CATALOG_HARD_MISSING_PARTS=0`。
- 深层 Catalog 依赖审计：剩余 `XMFINAL_CATALOG_DEP_MISSING=4`，均为既有能力链缺口，不是本轮新增单位/建筑造成。
- Galaxy 行数：`原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data` 下新增/维护的 Galaxy 文件未超过 1000 行。

剩余 4 个既有深层缺口：

| 能力 | 缺口 |
|---|---|
| `BroodLordStetmannBomberMagazine` | `effect InterceptorFate` |
| `DehakaLearn` | `button LearnDehakaGiveEssence` |
| `GhostMengskHoldFire` | `button HoldFireMengsk` |
| `HHWraithCloak` | `button CloakOn` |

这些缺口属于已有 profile 能力链，不影响本轮 6 类单位/建筑的 Catalog 落地判断。
