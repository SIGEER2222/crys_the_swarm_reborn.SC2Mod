# 原始mod wiki 指挥官名册调整记录

生成时间：2026-05-29

## 口径

- 目标目录：`原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data`
- 生成 owner：`scripts/sc2/generate-xmfinal-commander-profiles.mjs`
- wiki 抓取包：`D:\MyWork\新建文件夹\mom.report.client\artifacts\2026-05-29-starcraft-coop-commanders`
- 官方原始文本镜像：`游戏数据/官方SC2原始文本镜像`
- 处理原则：wiki 用来补中文主要部队清单；实际进入 XMFinal 名册的 ID 必须能被当前 `原始mod` 本地模块或 `游戏数据/官方SC2原始文本镜像` 中的官方 Catalog 验证。本轮已把原先缺少直接 CUnit 的 6 类单位/建筑补到 `原始mod` 本地 Catalog，不再停留在“只写入 profile 名册”的状态。

## 已落地到生成器

这些项目已经写入 `wikiSupplementalRosterUnits` / `wikiSupplementalBuildingUnits`，并重新生成到 XMFinal 的单位/建筑 profile。

| 指挥官 | wiki 项 | 落地 ID | 分类 | 效果 |
|---|---|---|---|---|
| 阿巴瑟 | 眼虫 | `Overseer` | 单位 | 阿巴瑟全单位测试名册增加侦测单位。 |
| 阿巴瑟 | 虫道网络 | `NydusNetwork` | 建筑 | 阿巴瑟建筑测试名册增加虫道网络。 |
| 阿塔尼斯 | 掠夺者/金甲虫 | `Reaver` | 单位 | 阿塔尼斯全单位测试名册增加金甲虫；本地 Catalog 已补直接 CUnit，继承 `ReaverPr`，修理时间 42.9，并显示金甲虫弹药、弹药上限、溅射半径被动按钮。 |
| 阿塔尼斯 | 风暴战舰 | `Tempest` | 单位 | 阿塔尼斯全单位测试名册增加风暴战舰。 |
| 德哈卡 | 原始守护者 | `DehakaGuardian` | 单位 | 德哈卡全单位测试名册增加原始守护者。 |
| 菲尼克斯 | 干扰者 | `Disruptor` | 单位 | 菲尼克斯全单位测试名册增加干扰者。 |
| 霍纳与汉 | 突击炮舰 | `MercenarySpaceStationMira` | 建筑/生产单位 | 霍纳与汉建筑测试名册不再为空，增加突击炮舰生产平台。 |
| 霍纳与汉 | 导弹塔 | `MissileTurretMira` | 建筑 | 霍纳与汉建筑测试名册增加专属导弹塔。 |
| 凯拉克斯 | 凯达琳巨石 | `KhaydarinMonolith` | 建筑 | 凯拉克斯建筑测试名册增加凯达林巨石；生命 200，成本 300 晶体矿/100 高能瓦斯，修理时间 40，并保留炮台射程/攻速升级显示。 |
| 凯瑞甘 | 潜伏者 | `LurkerMP` | 单位 | 凯瑞甘全单位测试名册增加潜伏者。 |
| 凯瑞甘 | 眼虫 | `Overseer` | 单位 | 凯瑞甘全单位测试名册增加侦测单位。 |
| 凯瑞甘 | 虫道网络欧米茄 | `GreaterNydusWorm` | 建筑 | 凯瑞甘建筑测试名册增加欧米茄坑道虫；生命 1000、护甲 2、成本 100/100、货舱 500、装卸周期 0.05，并带侦测、虫苔和盟友虫道创建链。 |
| 斯托科夫 | 被感染的响尾蛇战车 | `StukovInfestedDiamondBack` | 单位 | 斯托科夫全单位测试名册增加感染响尾蛇。 |
| 斯托科夫 | 被感染的解放者 | `SILiberator` | 单位 | 斯托科夫全单位测试名册增加感染解放者。 |
| 斯托科夫 | 被感染的女妖 | `StukovInfestedBanshee` | 单位 | 斯托科夫全单位测试名册增加感染女妖。 |
| 斯托科夫 | 眼虫 | `OverseerStukov` | 单位 | 斯托科夫全单位测试名册增加专属眼虫。 |
| 斯托科夫 | 被感染的地堡 | `SIInfestedBunker` | 建筑 | 斯托科夫建筑测试名册增加感染地堡。 |
| 斯托科夫 | 被感染的导弹塔 | `SIMissileTurret` | 建筑 | 斯托科夫建筑测试名册增加感染导弹塔。 |
| 斯旺 | 雷神 | `ThorSwann` | 单位 | 斯旺全单位测试名册增加专属雷神。 |
| 泰凯斯 | 自动机炮 | `TychusWarhoundAutoTurret` | 建筑/召唤物 | 泰凯斯建筑测试名册增加战狼自动机炮。 |
| 沃拉尊 | 黑暗执政官 | `DarkArchon` | 单位 | 沃拉尊全单位测试名册增加黑暗执政官；生命 10、护盾 350、能量 50/200、回能 0.5625、成本 175/275，并带神经错乱和精神控制。 |
| 沃拉尊 | 黑暗水晶塔 | `DarkPylon` | 建筑 | 沃拉尊建筑测试名册增加黑暗水晶塔；生命/护盾 200/200、补给 8、召回 500 射程/60 秒冷却、隐形光环 6.5、矩阵过载 15 秒。 |
| 扎加拉 | 眼虫 | `Overseer` | 单位 | 扎加拉全单位测试名册增加侦测单位。 |
| 扎加拉 | 胆汁喷射体 | `BileLauncherZagara` | 建筑 | 扎加拉建筑测试名册增加胆汁喷射体；生命 400、护甲 1、成本 125/100，武器 15 射程、7 秒周期、75 溅射伤害、半径 2。 |

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

## 本轮已补 Catalog 的原缺口

这些项之前不能直接加入 XMFinal 运行名册，因为 `原始mod` 没有直接可用的目标 CUnit。本轮已在 `原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/GameData` 补最小可创建、显示、按钮、能力和主要效果闭包。

| 指挥官 | wiki 项 | 落地 ID | 具体效果 |
|---|---|---|---|
| 阿塔尼斯 | 掠夺者/金甲虫 | `Reaver` | 继承 `ReaverPr`；修理时间 42.9；命令卡显示移动、停止、攻击、金甲虫弹药、弹药上限被动、溅射半径被动。 |
| 凯拉克斯 | 凯达林巨石 | `KhaydarinMonolith` | 继承 `KhaydarinMonolithPr`；生命 200；成本 300 晶体矿/100 高能瓦斯；修理时间 40；保留建筑攻击、炮台射程升级、炮台攻速升级按钮。 |
| 凯瑞甘 | 虫道网络欧米茄 | `GreaterNydusWorm` / `GreaterNydusWormAlly` | 生命 1000；护甲 2；回血 0.2734；成本 100/100；视野 10；最大货物数 500、总货舱 500、最大单体货物 8、卸载距离 10、装卸周期 0.05；带侦测、虫苔、盟友虫道创建链。 |
| 沃拉尊 | 黑暗执政官 | `DarkArchon` | 生命 10；护盾 350；能量初始 50/上限 200；回能 0.5625；移速 2.8125；人口 -4；成本 175/275；神经错乱 50 能量、8 秒冷却、9 射程、2 半径；精神控制 150 能量、30 秒冷却、9 射程。 |
| 沃拉尊 | 黑暗水晶塔 | `DarkPylon` | 生命 200；护盾 200；补给 8；成本 100；视野 9；召回 500 射程、60 秒冷却、搜索半径 5、落点 15；隐形光环半径 6.5；矩阵过载每 2 秒搜索半径 6，给目标 15 秒移速 +25%、攻速 +15%。 |
| 扎加拉 | 胆汁喷射体 | `BileLauncherZagara` | 生命 400；护甲 1；回血 0.2734；成本 125/100；视野 11；武器 15 射程、7 秒周期、1.5 秒前摇；导弹速度 10、最大速度 18.75、重力 20；命中半径 2、溅射伤害 75；炮塔转速 119.8828。 |

黑暗水晶塔本轮没有接 `PhotonOverchargeMorphDarkPylon`。原因是官方链会继续拖入 `DarkPylonOvercharged`、`MothershipCoreWeapon`、过载形态返回和导弹/武器/actor 全闭包；只接半截会比不接更危险。本轮保留合作核心效果：召回、隐形光环、矩阵过载。

## 生成与验证

- 已运行：`node .\scripts\sc2\generate-xmfinal-commander-profiles.mjs --write`
- 已确认：`node .\scripts\sc2\generate-xmfinal-commander-profiles.mjs --check` 全部 `PROFILE_GENERATOR_OK`
- 已运行：`node .\scripts\sc2\audit-xmfinal-commander-profiles.mjs`
- 结果：`PROFILE_HARD_MISSING=0`，`ROSTER_BUILDING_CATALOG_MISSING_ENTRIES=0`，`ABILITY_CATALOG_HARD_MISSING_PARTS=0`；`ABILITY_CATALOG_MISSING_ENTRIES=4` 均为斯托科夫官方外部引用项，不是本轮新增单位/建筑硬缺口。
- 已运行：`node .\scripts\sc2\audit-xmfinal-catalog-dependencies.mjs --output-dir '.\docs\每日进度\2026-05-29-原始mod-wiki指挥官对比\catalog-after-gamedata'`
- 结果：`XMFINAL_CATALOG_DEP_MISSING=4`，剩余项是既有能力链缺口：`BroodLordStetmannBomberMagazine -> InterceptorFate`、`DehakaLearn -> LearnDehakaGiveEssence`、`GhostMengskHoldFire -> HoldFireMengsk`、`HHWraithCloak -> CloakOn`。
- 已运行：`powershell -ExecutionPolicy Bypass -File .\scripts\sc2\check-galaxy-line-limit.ps1 -Root '.\原始mod\Mods\XM\XMFinal.SC2Mod\Base.SC2Data'`
- 结果：`原始mod` 下 XMFinal 12 个 Galaxy 文件全部低于 1000 行。

## 输出文件

- 对比总表：`docs/每日进度/2026-05-29-原始mod-wiki指挥官对比/commander-unit-building-wiki-vs-active-mod.md`
- 逐指挥官对比：`docs/每日进度/2026-05-29-原始mod-wiki指挥官对比/by-commander/`
- 官方 vs 原始mod 可读对照：`docs/每日进度/2026-05-29-原始mod-wiki指挥官对比/official-vs-originalmod-readable/official-vs-mod-readable-units-buildings-hero-skills.md`
