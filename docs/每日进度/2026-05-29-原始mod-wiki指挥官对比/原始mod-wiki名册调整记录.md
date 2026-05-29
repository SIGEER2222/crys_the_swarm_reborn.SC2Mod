# 原始mod wiki 指挥官名册调整记录

生成时间：2026-05-29

## 口径

- 目标目录：`原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data`
- 生成 owner：`scripts/sc2/generate-xmfinal-commander-profiles.mjs`
- wiki 抓取包：`D:\MyWork\新建文件夹\mom.report.client\artifacts\2026-05-29-starcraft-coop-commanders`
- 处理原则：wiki 用来补中文主要部队清单；实际进入 XMFinal 名册的 ID 必须能被当前原始mod本地模块或基础官方 Catalog 验证。只在 `starcoop` 参考包有、当前原始mod依赖链没有直接 CUnit 的项，本轮先记为待接依赖，不直接塞进运行名册。

## 已落地到生成器

这些项目已经写入 `wikiSupplementalRosterUnits` / `wikiSupplementalBuildingUnits`，并重新生成到 XMFinal 的单位/建筑 profile。

| 指挥官 | wiki 项 | 落地 ID | 分类 | 效果 |
|---|---|---|---|---|
| 阿巴瑟 | 眼虫 | `Overseer` | 单位 | 阿巴瑟全单位测试名册增加侦测单位。 |
| 阿巴瑟 | 虫道网络 | `NydusNetwork` | 建筑 | 阿巴瑟建筑测试名册增加虫道网络。 |
| 阿塔尼斯 | 风暴战舰 | `Tempest` | 单位 | 阿塔尼斯全单位测试名册增加风暴战舰。 |
| 德哈卡 | 原始守护者 | `DehakaGuardian` | 单位 | 德哈卡全单位测试名册增加原始守护者。 |
| 菲尼克斯 | 干扰者 | `Disruptor` | 单位 | 菲尼克斯全单位测试名册增加干扰者。 |
| 霍纳与汉 | 突击炮舰 | `MercenarySpaceStationMira` | 建筑/生产单位 | 霍纳与汉建筑测试名册不再为空，增加突击炮舰生产平台。 |
| 霍纳与汉 | 导弹塔 | `MissileTurretMira` | 建筑 | 霍纳与汉建筑测试名册增加专属导弹塔。 |
| 凯瑞甘 | 潜伏者 | `LurkerMP` | 单位 | 凯瑞甘全单位测试名册增加潜伏者。 |
| 凯瑞甘 | 眼虫 | `Overseer` | 单位 | 凯瑞甘全单位测试名册增加侦测单位。 |
| 斯托科夫 | 被感染的响尾蛇战车 | `StukovInfestedDiamondBack` | 单位 | 斯托科夫全单位测试名册增加感染响尾蛇。 |
| 斯托科夫 | 被感染的解放者 | `SILiberator` | 单位 | 斯托科夫全单位测试名册增加感染解放者。 |
| 斯托科夫 | 被感染的女妖 | `StukovInfestedBanshee` | 单位 | 斯托科夫全单位测试名册增加感染女妖。 |
| 斯托科夫 | 眼虫 | `OverseerStukov` | 单位 | 斯托科夫全单位测试名册增加专属眼虫。 |
| 斯托科夫 | 被感染的地堡 | `SIInfestedBunker` | 建筑 | 斯托科夫建筑测试名册增加感染地堡。 |
| 斯托科夫 | 被感染的导弹塔 | `SIMissileTurret` | 建筑 | 斯托科夫建筑测试名册增加感染导弹塔。 |
| 斯旺 | 雷神 | `ThorSwann` | 单位 | 斯旺全单位测试名册增加专属雷神。 |
| 泰凯斯 | 自动机炮 | `TychusWarhoundAutoTurret` | 建筑/召唤物 | 泰凯斯建筑测试名册增加战狼自动机炮。 |
| 扎加拉 | 眼虫 | `Overseer` | 单位 | 扎加拉全单位测试名册增加侦测单位。 |

## 已修正但无需新增

| 指挥官 | wiki 项 | 当前处理 | 原因 |
|---|---|---|---|
| 斯托科夫 | 虫巢女王 | 归到现有 `SwarmQueen -> SIQueen` | 当前生成器已经通过别名创建 `SIQueen`，不是缺项。 |
| 斯旺 | 爆弹比利 | 归到 `KelMorianGrenadeTurret` | 当前原始mod已有斯旺毁灭炮塔，wiki 是中文别称。 |
| 斯旺 | 热辣贝蒂 | 归到 `PerditionTurret` | 当前原始mod已有斯旺末日炮塔，wiki 是中文别称。 |
| 斯旺 | 转转小子 | 归到 `MissileTurret` | 当前原始mod已有导弹塔，wiki 是中文别称。 |
| 诺娃 | 磁轨炮塔 | 维持 `AutoTurret` | 当前建筑 profile 已有自动机炮。 |
| 泽拉图 | 虚空圣堂武士 | 维持 `ZeratulSummonZealot` | 当前单位 profile 已有该召唤狂热者 ID。 |
| 泽拉图 | 超维空间炮 | 维持 `PhotonCannon` | 当前建筑 profile 已有光子炮台；原始mod未提供单独 `ZeratulPhotonCannon`。 |

## 暂未落地

这些项 wiki 和官方合作资料能证明存在，但当前原始mod依赖链没有直接可用的目标 CUnit；本轮不直接加入 XMFinal 运行名册，避免测试时出现缺 Catalog。

| 指挥官 | wiki 项 | 期望 ID | 当前证据 | 暂不加入原因 |
|---|---|---|---|---|
| 阿塔尼斯 | 掠夺者 | `Reaver` | `starcoop` 有 `Reaver`；原始mod只有 `ReaverPr` / 胶水屏 dummy。 | 当前原始mod没有直接 `Reaver` CUnit。 |
| 凯拉克斯 | 凯达琳巨石 | `KhaydarinMonolith` | `starcoop` 有 `KhaydarinMonolith`；原始mod只有 `KhaydarinMonolithPr` / 胶水屏 dummy。 | 当前原始mod没有直接 `KhaydarinMonolith` CUnit。 |
| 凯瑞甘 | 虫道网络欧米茄 | `GreaterNydusWorm` / `GreaterNydusWormAlly` | 官方等级解锁写明欧米茄坑道虫，`starcoop` 有对应 CUnit。 | 当前原始mod没有直接欧米茄 CUnit；不能再把它等同成普通 `NydusNetwork`。 |
| 沃拉尊 | 黑暗执政官 | `DarkArchon` | `starcoop` 有 `DarkArchon`；原始mod只有胶水屏 dummy。 | 当前原始mod没有直接 `DarkArchon` CUnit。 |
| 沃拉尊 | 黑暗水晶塔 | `DarkPylon` | `starcoop` 有 `DarkPylon`；原始mod只有胶水屏 dummy。 | 当前原始mod没有直接 `DarkPylon` CUnit。 |
| 扎加拉 | 胆汁喷射体 | `BileLauncherZagara` | `starcoop` 有 `BileLauncherZagara`；原始mod只有胶水屏 dummy。 | 当前原始mod没有直接 `BileLauncherZagara` CUnit。 |

## 生成与验证

- 已运行：`node .\scripts\sc2\generate-xmfinal-commander-profiles.mjs --write`
- 已确认：`node .\scripts\sc2\generate-xmfinal-commander-profiles.mjs --check` 全部 `PROFILE_GENERATOR_OK`
- 已运行：`node .\scripts\sc2\audit-xmfinal-commander-profiles.mjs`
- 结果：`PROFILE_HARD_MISSING=0`，`ROSTER_BUILDING_CATALOG_MISSING_ENTRIES=0`，`ABILITY_CATALOG_MISSING_ENTRIES=0`
- 已运行：`powershell -ExecutionPolicy Bypass -File .\scripts\sc2\check-galaxy-line-limit.ps1 -Root '.\原始mod\Mods\XM\XMFinal.SC2Mod\Base.SC2Data'`
- 结果：`原始mod` 下 XMFinal 12 个 Galaxy 文件全部低于 1000 行。

## 输出文件

- 对比总表：`docs/每日进度/2026-05-29-原始mod-wiki指挥官对比/commander-unit-building-wiki-vs-active-mod.md`
- 逐指挥官对比：`docs/每日进度/2026-05-29-原始mod-wiki指挥官对比/by-commander/`
- 官方 vs 原始mod 可读对照：`docs/每日进度/2026-05-29-原始mod-wiki指挥官对比/official-vs-originalmod-readable/official-vs-mod-readable-units-buildings-hero-skills.md`
