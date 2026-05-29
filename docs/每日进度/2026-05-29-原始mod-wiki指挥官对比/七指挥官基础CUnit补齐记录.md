# 七指挥官基础 CUnit 补齐记录

生成时间：2026-05-29

## 本轮结论

本轮已把阿拉纳克、阿塔尼斯、菲尼克斯、凯拉克斯、凯瑞甘、雷诺、沃拉尊这 7 个指挥官原本只落在“底层基础镜像 CUnit”的单位/建筑补进：

`原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData`

本轮导入的是官方 StarCoop 覆盖层里与这些单位/建筑同名的 Catalog 节点，共 76 个：

| Catalog 类型 | 数量 | 作用 |
|---|---:|---|
| `CUnit` | 39 | 让 XMFinal 本地直接拥有这些单位/建筑定义。 |
| `CActorUnit` | 24 | 补同名单位 actor，降低模型/单位表现缺口。 |
| `CWeaponLegacy` | 5 | 补同名武器覆盖：`Adept`、`Lurker`、`LurkerMP`、`PhotonCannon`、`Tempest`。 |
| `CModel` | 4 | 补同名模型覆盖：`Immortal`、`Lurker`、`Observer`、`PhotonCannon`。 |
| `CButton` | 3 | 补同名按钮覆盖：`Carrier`、`Gateway`、`Tempest`。 |
| `CEffectCreatePersistent` | 1 | 补 `Lurker` 同名持续效果。 |

导入明细：

`docs/每日进度/2026-05-29-原始mod-wiki指挥官对比/xmfinal-base-roster-import-summary.tsv`

## 单位技能/攻击链修正

追加检查发现，单纯补 `CUnit` 仍不足以证明单位能攻击。`原始mod/Mods/XM/XMFinal.SC2Mod/DocumentInfo` 原本只挂了自由之翼剧情依赖，虫群之心/虚空之遗单位会缺底层 `stop`、`move`、`attack`、武器和效果链。

本轮已追加处理：

- `DocumentInfo` 新增 `Void.SC2Campaign` 和 `SwarmStory.SC2Campaign` 运行时依赖，让使徒、风暴战舰、潜伏者、海盗船、先知等单位能继承底层控制技能与武器链。
- 额外导入 StarCoop 战斗相关 Catalog 节点 89 个：第一批 86 个，补武器、效果、按钮、行为、升级、验证器等；第二批 3 个，专补菲尼克斯干扰者 `DisruptorPsiBlast` 武器链。
- 凯瑞甘 `Zergling` 本地覆盖删除 `AbilArray`/`LayoutButtons` 的 5、6、7 号变异入口，避免新增 Swarm/Void 依赖后又继承爆虫/猎手/分裂跳虫变异。当前保留 `stop`、`attack`、`move`、`que1`、`BurrowZerglingDown` 和 `Claws` 武器。

新增审计输出：

- `docs/每日进度/2026-05-29-原始mod-wiki指挥官对比/combat-links/xmfinal-unit-combat-links.md`
- `docs/每日进度/2026-05-29-原始mod-wiki指挥官对比/combat-links/xmfinal-starcoop-combat-catalog-import-summary.tsv`
- `docs/每日进度/2026-05-29-原始mod-wiki指挥官对比/combat-links/xmfinal-disruptor-combat-catalog-import-summary.tsv`

当前专项结论：39 个单位/建筑里，实际运行时攻击/武器风险项为 0；9 个是非战斗或无武器对象；28 个仍没有在 XMFinal 本地节点直接写出 `attack`/武器，但已由当前 `DocumentInfo` 运行时依赖链提供，不再按实机攻击风险处理。

## 逐指挥官补齐效果

| 指挥官 | 单位/建筑 | CUnit | 当前生产/建造/变形 | 当前数值/效果 |
|---|---|---|---|---|
| 阿拉纳克 | 追猎者/杀戮者 | `Stalker` | `Gateway / GatewayTrain`；125 晶体矿、50 瓦斯、38 秒 | 生命 80、护盾 80、人口 2、视野 10。 |
| 阿拉纳克 | 光子炮台 | `PhotonCannon` | `Gateway / GatewayTrain`；150 晶体矿、28 秒 | 生命 150、护盾 150、视野 11；补同名武器和模型覆盖。 |
| 阿拉纳克 | 传送门 | `Gateway` | `Probe / ProtossBuild`；150 晶体矿、65 秒 | 生命 500、护盾 500、视野 9；补同名按钮和 actor 覆盖。 |
| 阿塔尼斯 | 狂热者 | `Zealot` | `Gateway / GatewayTrain`；100 晶体矿、38 秒 | 生命 100、护盾 50、人口 2、视野 9。 |
| 阿塔尼斯 | 高阶圣堂武士 | `HighTemplar` | `Gateway / GatewayTrain`；50 晶体矿、150 瓦斯、55 秒 | 生命 40、护盾 40、人口 2、视野 10。 |
| 阿塔尼斯 | 执政官 | `Archon` | `ArchonWarp`；16.6667 秒 | 生命 10、护盾 350、人口 4、视野 9。 |
| 阿塔尼斯 | 侦测器 | `Observer` | `RoboticsFacilityWarp / RoboticsFacilityWarpTrain`；25 晶体矿、75 瓦斯 | 生命 40、护盾 30、人口 1、视野 11；补同名模型覆盖。 |
| 阿塔尼斯 | 风暴战舰 | `Tempest` | 当前官方 JSON 未给出费用；本轮补本地 CUnit | StarCoop 覆盖含 `LightningBomb` 技能按钮、等级 12 瓦解被动占位、修理时间 40，并补同名按钮/武器。 |
| 阿塔尼斯 | 光子炮台 | `PhotonCannon` | `Gateway / GatewayTrain`；150 晶体矿、28 秒 | 生命 150、护盾 150、视野 11；补同名武器和模型覆盖。 |
| 阿塔尼斯 | 传送门 | `Gateway` | `Probe / ProtossBuild`；150 晶体矿、65 秒 | 生命 500、护盾 500、视野 9；补同名按钮和 actor 覆盖。 |
| 菲尼克斯 | 使徒 | `Adept` | `Gateway / GatewayTrain`；125 晶体矿、25 瓦斯、42 秒 | 生命 70、护盾 70、人口 2、视野 9；补同名武器。 |
| 菲尼克斯 | 不朽者 | `Immortal` | `RoboticsFacility / RoboticsFacilityTrain`；250 晶体矿、100 瓦斯、55 秒 | 生命 200、护盾 100、人口 4、视野 9；补同名模型。 |
| 菲尼克斯 | 侦测器 | `Observer` | `RoboticsFacilityWarp / RoboticsFacilityWarpTrain`；25 晶体矿、75 瓦斯 | 生命 40、护盾 30、人口 1、视野 11；补同名模型。 |
| 菲尼克斯 | 干扰者 | `Disruptor` | 当前官方 JSON 未给出完整费用；本轮补本地 CUnit | 护盾 100；装甲属性；带 `FenixPurificationNova`、`PurificationNovaTargeted`、永久隐形被动、二段爆炸被动、`DisruptorPsiBlast` 武器；修理时间 24。 |
| 菲尼克斯 | 航母 | `Carrier` | `Stargate / StargateTrain`；350 晶体矿、250 瓦斯、90 秒 | 生命 300、护盾 150、人口 6、视野 12；补同名按钮。 |
| 菲尼克斯 | 传送门 | `Gateway` | `Probe / ProtossBuild`；150 晶体矿、65 秒 | 生命 500、护盾 500、视野 9；补同名按钮和 actor 覆盖。 |
| 菲尼克斯 | 光子炮台 | `PhotonCannon` | `Gateway / GatewayTrain`；150 晶体矿、28 秒 | 生命 150、护盾 150、视野 11；补同名武器和模型覆盖。 |
| 凯拉克斯 | 巨像 | `Colossus` | `RoboticsFacility / RoboticsFacilityTrain`；300 晶体矿、200 瓦斯、75 秒 | 生命 250、护盾 100、人口 6、视野 10。 |
| 凯拉克斯 | 侦测器 | `Observer` | `RoboticsFacilityWarp / RoboticsFacilityWarpTrain`；25 晶体矿、75 瓦斯 | 生命 40、护盾 30、人口 1、视野 11；补同名模型。 |
| 凯拉克斯 | 航母 | `Carrier` | `Stargate / StargateTrain`；350 晶体矿、250 瓦斯、90 秒 | 生命 300、护盾 150、人口 6、视野 12；补同名按钮。 |
| 凯拉克斯 | 光子炮台 | `PhotonCannon` | `Gateway / GatewayTrain`；150 晶体矿、28 秒 | 生命 150、护盾 150、视野 11；补同名武器和模型覆盖。 |
| 凯拉克斯 | 护盾充能器 | `ShieldBattery` | `Probe / ProtossBuild`；100 晶体矿、40 秒 | 生命 200、护盾 200、视野 9。 |
| 凯拉克斯 | 传送门 | `Gateway` | `Probe / ProtossBuild`；150 晶体矿、65 秒 | 生命 500、护盾 500、视野 9；补同名按钮和 actor 覆盖。 |
| 凯瑞甘 | 跳虫 | `Zergling` | `SILarva / SILarvaTrain`；25 晶体矿、24 秒 | 生命 35、人口 0.5、视野 8。当前未给跳虫挂爆虫变异。 |
| 凯瑞甘 | 刺蛇 | `Hydralisk` | `Larva / LarvaTrain`；100 晶体矿、50 瓦斯、33 秒 | 生命 90、人口 2、视野 9。 |
| 凯瑞甘 | 潜伏者 | `LurkerMP` / `Lurker` | 当前官方 JSON 未给出完整费用；本轮补本地 CUnit | `LurkerMP` 带战术 AI `AIThinkLurkerMP`；同时补 `Lurker` CUnit、同名武器、模型和持续效果。 |
| 凯瑞甘 | 巢虫领主 | `BroodLord` | `Corruptor / MorphToBroodLord`；150 晶体矿、150 瓦斯、33.8332 秒 | 生命 225、人口 4、视野 12。 |
| 凯瑞甘 | 雷兽 | `Ultralisk` | `Larva / LarvaTrain`；275 晶体矿、200 瓦斯、55 秒 | 生命 500、人口 6、视野 9；StarCoop 覆盖保留潜地冲锋/组织同化/几丁质甲壳等命令卡入口。 |
| 凯瑞甘 | 眼虫 | `Overseer` | 当前官方 JSON 未给出完整费用；本轮补本地 CUnit | 侦测行为 `Detector11`；能量 0；带监视模式变形按钮 `OverseerMorphtoOverseerSiege` 和速度升级被动。 |
| 凯瑞甘 | 脊针爬虫 | `SpineCrawler` | `Drone / ZergBuild`；150 晶体矿、50 秒 | 生命 300、视野 11。 |
| 凯瑞甘 | 孢子爬虫 | `SporeCrawler` | `SIDrone / SIBasicBuild`；125 晶体矿、50 秒 | 生命 300、视野 11。 |
| 凯瑞甘 | 虫道网络 | `NydusNetwork` | `Drone / ZergBuild`；200 晶体矿、150 瓦斯、50 秒 | 生命 850、视野 9；这是普通虫道网络，欧米茄坑道虫仍按 `GreaterNydusWorm` 另行保留。 |
| 雷诺 | 陆战队员 | `Marine` | `Barracks / BarracksTrain`；50 晶体矿、25 秒 | 生命 45、人口 1、视野 9；命令卡保留盾墙被动入口。 |
| 雷诺 | 劫掠者 | `Marauder` | `Barracks / BarracksTrain`；100 晶体矿、25 瓦斯、30 秒 | 生命 125、人口 2、视野 10。 |
| 雷诺 | 攻城坦克 | `SiegeTank` | `Factory / FactoryTrain`；150 晶体矿、125 瓦斯、45 秒 | 生命 175、人口 3、视野 11。 |
| 雷诺 | 女妖 | `Banshee` | `Starport / StarportTrain`；150 晶体矿、100 瓦斯、60 秒 | 生命 140、人口 3、视野 10。 |
| 雷诺 | 战列巡航舰 | `Battlecruiser` | 对比脚本当前解析为 `SCV / TerranBuild`；400 晶体矿、300 瓦斯、65 秒 | 生命 550、人口 6、视野 12；生产链后续需以实机按钮再核。 |
| 雷诺 | 轨道控制基地 | `OrbitalCommand` | `CommandCenter / UpgradeToOrbital`；150 晶体矿、0 秒 | 生命 1500、视野 11。 |
| 雷诺 | 地堡 | `Bunker` | `SCV / TerranBuild`；100 晶体矿、20 秒 | 生命 400、视野 10。 |
| 雷诺 | 导弹塔 | `MissileTurret` | `SCV / TerranBuild`；100 晶体矿、25 秒 | 生命 250、视野 11。 |
| 雷诺 | SCV | `SCV` | `CommandCenter / CommandCenterTrain`；50 晶体矿、17 秒 | 生命 45、人口 1、视野 8。 |
| 雷诺 | 兵营 | `Barracks` | `SCV / TerranBuild`；150 晶体矿、65 秒 | 生命 1000、视野 9。 |
| 雷诺 | 补给站 | `SupplyDepot` | `SCV / TerranBuild`；100 晶体矿、30 秒 | 生命 400、视野 9。 |
| 雷诺 | 指挥中心 | `CommandCenter` | `SCV / TerranBuild`；400 晶体矿、100 秒 | 生命 1500、视野 11。 |
| 沃拉尊 | 追猎者 | `Stalker` | `Gateway / GatewayTrain`；125 晶体矿、50 瓦斯、38 秒 | 生命 80、护盾 80、人口 2、视野 10。 |
| 沃拉尊 | 海盗船 | `CorsairMP` | `StargateWarpTrain`；150 晶体矿、100 瓦斯 | 生命 120、护盾 60、人口 2、视野 9。 |
| 沃拉尊 | 虚空辉光舰 | `VoidRay` | `Stargate / StargateTrain`；250 晶体矿、150 瓦斯、60.2 秒 | 生命 150、护盾 100、人口 4、视野 10。 |
| 沃拉尊 | 先知 | `Oracle` | `Stargate / StargateTrain`；100 晶体矿、75 瓦斯、30 秒 | 生命 100、护盾 60、人口 3、视野 10。 |
| 沃拉尊 | 光子炮台 | `PhotonCannon` | `Gateway / GatewayTrain`；150 晶体矿、28 秒 | 生命 150、护盾 150、视野 11；补同名武器和模型覆盖。 |
| 沃拉尊 | 狂热者 | `Zealot` | `Gateway / GatewayTrain`；100 晶体矿、38 秒 | 生命 100、护盾 50、人口 2、视野 9。 |
| 沃拉尊 | 传送门 | `Gateway` | `Probe / ProtossBuild`；150 晶体矿、65 秒 | 生命 500、护盾 500、视野 9；补同名按钮和 actor 覆盖。 |

## 验证结果

- 7 个指挥官当前 `activeLevel=base` 行数均为 0。
- 全量对比报告已恢复为 18 个指挥官结果。
- XML 解析通过：`UnitData.xml`、`ActorData.xml`、`ButtonData.xml`、`EffectData.xml`、`ModelData.xml`、`WeaponData.xml` 以及既有相关 Catalog 均可解析。
- `node .\scripts\sc2\generate-xmfinal-commander-profiles.mjs --check` 通过。
- `node .\scripts\sc2\audit-xmfinal-commander-profiles.mjs`：`PROFILE_HARD_MISSING=0`，`ROSTER_BUILDING_CATALOG_MISSING_ENTRIES=0`，`ABILITY_CATALOG_HARD_MISSING_PARTS=0`。
- 深层依赖审计：`XMFINAL_CATALOG_DEP_MISSING=4`，仍为既有缺口，不是本轮 39 个 CUnit 新增造成。
- 单位攻击/武器链专项审计：`XMFINAL_UNIT_COMBAT_RISK=0`，`XMFINAL_UNIT_COMBAT_LOCAL_EXPLICIT_GAPS=28`。
- Galaxy 行数检查通过，`原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data` 下维护文件未超过 1000 行。

## 仍需实机确认

本轮解决的是“单位/建筑 CUnit 只在底层基础镜像命中”的灰区。生产链仍有不少训练/建造技能来自底层基础镜像，例如 `GatewayTrain`、`ProtossBuild`、`TerranBuild`、`LarvaTrain` 等。它们当前不是 CUnit 缺口，但仍应在测试地图里确认按钮能点、模型能显示、训练后能选中且无报错。
