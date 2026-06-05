# 指挥官细化文档入口

日期：2026-05-27

本目录按 18 个官方合作指挥官拆分。每个文档都以当前新版架构为前提，并按 `../模块拆分/` 的 11 个模块分别整理本指挥官自己的清单和待审计项。

本轮已按 `游戏数据/官方合作指挥官/commanders/<Commander>/` 的最新 JSON 重新生成，重点刷新 `heroes.json`、`units.json`、`buildings.json`、`command_cards.json` 的数量、清单和候选按钮。

统一口径：

1. 正文统一按满级 `power_fusion` 口径写，不再把 1 级和 15 级拆成两套玩法态；等级 1-15 只作解锁门槛和审计锚点。
2. 精通默认 6 项全部 30 点，三个威望按正收益融合展开，不直接启用官方 `PlayerPrestige`。
3. `full_units` 默认指向强度融合最终 roster，即 `power_fusion`。
4. `initial` 只用于官方基础状态审计和差异对照。
5. 单指挥官有效单位、建筑、技能链均按满级最终状态过滤；历史候选和共享卡污染只作审计输入，不得直接作为实现主链。
6. 具体实现前仍需追 `游戏数据/官方SC2原始文本镜像/` 闭包并补 `[XM_DBG]` 验证日志。
7. `heroes.json` 只按当前 JSON 事实写入英雄模块；`heroes.json=0` 不代表官方玩法一定没有英雄，只代表本轮提取数据未直接列出，需要官方原始文本镜像/实机补闭包。
8. 原始镜像里的 `AbilData`、`ArmyCategory`、`TechUnit`、`UpgradeData` 是共享 Catalog 事实，不是单指挥官归属事实；任何工蜂/SCV/探机共享建造菜单必须先过 `commanders/<Commander>/buildings.json`、满级 `power_fusion` 名册和满级威望闭包过滤。
9. `buildings.json` 是官方提取出的建筑名册，不等于劳工实际 command card 的全部建造按钮；人族闭包同时保留 `worker_build_commands`，用于回答 SCV/劳工/冲锋队可以实际点击哪些建筑命令。`raw-only` tech building 可作为功能性前置链，但不能反过来覆盖 official buildings.json 归属。
10. 当前 Mod 实现口径下，所有指挥官攻防升级均按五档处理；文档和实现必须追完整 `ButtonData -> UnitData CardLayouts -> AbilData Research -> RequirementData -> UpgradeData/Effect` 的 1-5 档闭包。共享 `UpgradeData` / `AbilData` 命中只能作为审计候选，只有当前指挥官自己的科技建筑面板实际暴露并能研究生效时，才计入该指挥官正向攻防链。

## 当前 Mod 开局初始化对照

2026-06-05 复核口径：本表记录 `合作指挥官版起义狂潮` 当前 Mod 实际初始化单位，不反推为官方原始 ID。单指挥官 `04. 初始化基地与特殊建筑` 中的“候选”表仍按官方/闭包候选保留；判断实机开局基地、工人、补给/第二单位时，以本表和 `CommanderAch` 当前实现为准。

验证入口：

```powershell
node .\scripts\sc2\validate-private-commander-openers.mjs
```

当前结果：`PASS: private commander opener validation passed commanders=11`。

| 指挥官 | 当前 Mod 模块 | 初始化基地 `CommandCenter` | 初始化工人 `Worker` | 初始化第二单位 `SecondUnit` | 运行时追加对象 |
|---|---|---|---|---|---|
| 阿巴瑟 / Abathur | `XMAbathur.SC2Mod` | `HatcheryAbathur` | `DroneAbathur` | `OverlordAbathur` | `CoopCasterAbathur`；生物质初始化由 `LibE0EAE146_AbathurRuntime.galaxy` 承载 |
| 阿拉纳克 / Alarak | `XMAlarak.SC2Mod` | `NexusAlarak` | `ProbeAlarak` | `PylonAlarak` | `CoopCasterAlarak`；`createHero=true` 时创建 `AlarakCoop` |
| 阿塔尼斯 / Artanis | `XMArtanis.SC2Mod` | `NexusArtanis` | `ProbeArtanis` | `PylonArtanis` | `SoACasterArtanis`；`createHero=true` 时创建战役英雄 `ArtanisVoid` |
| 菲尼克斯 / Fenix | `XMFenix.SC2Mod` | `NexusFenix` | `ProbeFenix` | `PylonFenix` | `SoACasterFenix`、`FenixAltarOfPsiStorms`；`createHero=true` 时创建 `FenixCoop` |
| 凯拉克斯 / Karax | `XMKarax.SC2Mod` | `NexusKarax` | `ProbeKarax` | `PylonKarax` | `SoACasterKarax`、`SolarForgeKarax`；`createHero=true` 时创建 `KaraxChampion` |
| 凯瑞甘 / Kerrigan | `XMKerrigan.SC2Mod` | `HatcheryKerrigan` | `DroneKerrigan` | `OverlordKerrigan` | `K5Kerrigan` 作为英雄/主 caster；死亡复活锚点为 `KerriganReviveCocoon` |
| 雷诺 / Raynor | `XMRaynor.SC2Mod` | `CommandCenterRaynor` | `SCVRaynor` | `SupplyDepotRaynor` | 顶部/召唤链继续由 `CoopCasterRaynor`、`HyperionVoidCoop`、`BansheeAirstrike` 等私有链承载 |
| 斯旺 / Swann | `XMSwann.SC2Mod` | `CommandCenterSwann` | `SCVSwann` | `UnfinishedDrakkenLaserDrillCoop` | `CasterSwann`；钻机通过 `DrakkenLaserDrillUnit` 绑定，并由英雄结构 helper 兜底创建 |
| 沃拉尊 / Vorazun | `XMVorazun.SC2Mod` | `NexusVorazun` | `ProbeVorazun` | `PylonVorazun` | `SoACasterVorazun`；`createHero=true` 时创建 `VorazunChampion` |
| 扎加拉 / Zagara | `XMZagara.SC2Mod` | `HatcheryZagara` | `DroneZagara` | `OverlordZagara` | `CoopCasterZagara`；`createHero=true` 时创建 `ZagaraVoidCoop`，死亡复活锚点为 `ZagaraReviveCocoon` |
| 泽拉图 / Zeratul | `XMZeratul.SC2Mod` | `NexusZeratul` | `ProbeZeratul` | `VoidPylon` | `CoopCasterZeratul`、`CoopCasterZeratulSpecialization`、`ZeratulACArtifact`；`createHero=true` 时创建 `ZeratulCoop` |

防误读结论：`XMCore.SC2Mod` 里仍保留部分通用或旧开局项，例如 `Nexus/Probe/Pylon`、`Hatchery/Drone/Overlord`、`CommandCenter/SCV/SupplyDepot`。当前 `XMFinal` live `DocumentHeader` 已加载各指挥官私有模块，`InitializeBase` 通过 `CommanderAchUnit("CommandCenter"/"Worker"/"SecondUnit")` 取值，且 Zagara 另有 catalog-guarded fallback；因此上述 11 个指挥官的实机初始化不应再落回通用基地和通用兵种。

## 误归属防线

2026-06-03 阿巴瑟复盘结论：`NydusNetwork` 曾因共享 `ZergBuild,Build10` / `ArmyCategory NydusNetwork` 被误当成阿巴瑟建筑候选。根因不是官方阿巴瑟数据支持它，而是后续补官方闭包时绕过了 `commanders/Abathur/buildings.json` 和满级有效名册过滤。以后做单指挥官科技链时必须按这个顺序判定：

1. 先看 `游戏数据/官方合作指挥官/commanders/<Commander>/` 的 `buildings.json`、`units.json`、`heroes.json`、`progression.json`。
2. 再用 `游戏数据/官方SC2原始文本镜像/` 追 `ButtonData -> AbilData -> EffectData -> RequirementData` 闭包。
3. 共享 Catalog 命中只能作为“候选/审计输入”，不能单独升级为“本指挥官有效建筑/单位/技能链”。
4. 对工蜂/SCV/探机这类共享建造菜单，必须显式写出是否通过指挥官归属过滤；没通过的只能写成“排除/不计入/共享污染”。
5. 文档改动后运行 `node scripts/sc2/validate-commander-doc-ownership.mjs`，当前覆盖虫族系和神族系单页基础归属防线，并额外校验虫族/神族/人族生成闭包。

2026-06-03 虫族系复核结论：

- 阿巴瑟：`NydusNetwork` / `ZergBuild,Build10` 只能写在排除、共享污染或不计入上下文。
- 凯瑞甘：`NydusNetwork` 是官方正向建筑，但这是“非阿巴瑟排除项”；`ZagaraVoidCoopZerglingDodge`、`MorphZerglingToBaneling`、`MorphToBaneling,Execute` 不在凯瑞甘满级主链中，只能写成排除/共享污染。
- 扎加拉：`ZagaraVoidCoopZerglingDodge` 与跳虫/爆虫链属于扎加拉正向链路；普通 `NydusNetwork` 不在扎加拉 `buildings.json`。
- 斯台特曼：单位、建筑按 `*Stetmann` 私有 ID 追；普通虫族 `MorphZerglingToBaneling` 和普通 `NydusNetwork` 不能正向写入。
- 斯托科夫：当前有效主链使用 `SI*` / `StukovInfestedBanshee` / `SILiberator`；普通 `Zergling`、`SwarmQueen`、`QueenCoop`、扎加拉跳虫被动、普通爆虫变异、雷兽潜地链和历史 Wraith 只能作为排除/污染候选。
- 德哈卡：官方坑道类对象是 `DehakaNydusDestroyer`；不要把普通 `NydusNetwork` 或共享 `ZergBuild,Build10` 当作德哈卡建筑链。

2026-06-03 神族系复核结论：

- 神族共享建筑与虫族不同：`Gateway`、`PhotonCannon`、`TwilightCouncil` 可能同时是多个指挥官的官方正向建筑，不能仅凭共享 ID 判错。
- 真正高风险的是共享建筑 command card 上的跨指挥官专属按钮和 Requirement，例如 `AlarakLevel*`、`FenixLevel*`、`KaraxLevel*`、`VorazunLevel*`、`ZeratulArtifact*`、`AutomatedAssimilatorZeratul`。
- 阿拉纳克、阿塔尼斯、菲尼克斯、凯拉克斯、沃拉尊、泽拉图的正向 units/buildings 必须先按各自 `commanders/<Commander>/units.json` 与 `buildings.json` 过滤；候选表中出现其它神族指挥官锁定项，只能作为共享污染待审计项。
- 非泽拉图指挥官不得把 `AutomatedAssimilatorZeratul` / `NexusBuild,Build1` 当作正向经济建筑；泽拉图的古代吸纳舱应从 `SOAAutoAssimilator` / 泽拉图经济机制继续追闭包。
- 当前校验脚本对神族采用“严格正向段落扫描”：只在 `当前 units.json 兵种清单` 与 `当前 buildings.json 建筑清单` 这类正向表中硬拦截跨指挥官 token；候选表仍允许保留，但必须按本节规则视为待审计输入。

## 当前数据覆盖

- heroes.json 已有条目：德哈卡/Dehaka=4，凯瑞甘/Kerrigan=1，泰凯斯/Tychus=9，扎加拉/Zagara=1。
- heroes.json 暂无条目：阿巴瑟/Abathur，阿拉纳克/Alarak，阿塔尼斯/Artanis，菲尼克斯/Fenix，霍纳与汉/Horner，凯拉克斯/Karax，蒙斯克/Mengsk，诺娃/Nova，雷诺/Raynor，斯台特曼/Stetmann，斯托科夫/Stukov，斯旺/Swann，沃拉尊/Vorazun，泽拉图/Zeratul。
- units/buildings 已按最新 JSON 重算；例如阿巴瑟当前是 `heroes=0 / units=12 / buildings=2`，不再沿用上一轮把利维坦写入 heroes.json 的旧判断。

| 序号 | 文档 | 指挥官 | heroes | units | buildings | roster | command cards | upgrades |
|---|---|---|---|---|---|---|---|---|
| 1 | `01-阿巴瑟-Abathur.md` | 阿巴瑟/Abathur | 0 | 12 | 2 | 14 | 12 | 22 |
| 2 | `02-阿拉纳克-Alarak.md` | 阿拉纳克/Alarak | 0 | 7 | 3 | 10 | 10 | 19 |
| 3 | `03-阿塔尼斯-Artanis.md` | 阿塔尼斯/Artanis | 0 | 7 | 5 | 12 | 12 | 28 |
| 4 | `04-德哈卡-Dehaka.md` | 德哈卡/Dehaka | 4 | 14 | 7 | 25 | 25 | 17 |
| 5 | `05-菲尼克斯-Fenix.md` | 菲尼克斯/Fenix | 0 | 8 | 4 | 12 | 12 | 19 |
| 6 | `06-霍纳与汉-Horner.md` | 霍纳与汉/Horner | 0 | 10 | 0 | 10 | 9 | 21 |
| 7 | `07-凯拉克斯-Karax.md` | 凯拉克斯/Karax | 0 | 8 | 5 | 13 | 13 | 26 |
| 8 | `08-凯瑞甘-Kerrigan.md` | 凯瑞甘/Kerrigan | 1 | 6 | 3 | 10 | 9 | 25 |
| 9 | `09-蒙斯克-Mengsk.md` | 蒙斯克/Mengsk | 0 | 16 | 11 | 27 | 27 | 14 |
| 10 | `10-诺娃-Nova.md` | 诺娃/Nova | 0 | 11 | 5 | 16 | 16 | 25 |
| 11 | `11-雷诺-Raynor.md` | 雷诺/Raynor | 0 | 10 | 6 | 16 | 15 | 33 |
| 12 | `12-斯台特曼-Stetmann.md` | 斯台特曼/Stetmann | 0 | 16 | 18 | 34 | 34 | 13 |
| 13 | `13-斯托科夫-Stukov.md` | 斯托科夫/Stukov | 0 | 6 | 9 | 15 | 14 | 29 |
| 14 | `14-斯旺-Swann.md` | 斯旺/Swann | 0 | 9 | 6 | 15 | 15 | 25 |
| 15 | `15-泰凯斯-Tychus.md` | 泰凯斯/Tychus | 9 | 2 | 3 | 14 | 14 | 20 |
| 16 | `16-沃拉尊-Vorazun.md` | 沃拉尊/Vorazun | 0 | 7 | 3 | 10 | 9 | 26 |
| 17 | `17-扎加拉-Zagara.md` | 扎加拉/Zagara | 1 | 6 | 2 | 9 | 8 | 23 |
| 18 | `18-泽拉图-Zeratul.md` | 泽拉图/Zeratul | 0 | 8 | 4 | 12 | 12 | 27 |

## 使用方式

先看单指挥官文档的 `01. 顶部技能栏` 到 `11. 指挥官个性化机制`，再回到 `../模块拆分/` 中对应模块补实现。每个指挥官文档是工作清单，不是最终闭包证明；标记为“候选”或“待审计”的内容必须继续追 `游戏数据/官方SC2原始文本镜像/`、Requirement 闭包或实机日志。

注意：`command_cards.json` 中部分共享单位会带出其它指挥官的按钮或锁定提示，例如同一个 SCV、兵营、导弹塔对象上可能出现诺娃、斯旺、雷诺等不同 commander 的 Requirement。单指挥官文档中的按钮表只作为候选输入，真正实现时必须按当前 commander 的满级 `power_fusion`、六精通全满和威望正向融合后的 Requirement 过滤。

英雄模块同样是候选输入：如果 `heroes.json` 已有条目，则优先把对应 command card 技能归入 `02. 英雄单位及其技能`；如果 `heroes.json` 暂无条目但官方玩法存在英雄，例如诺娃、泽拉图、超级盖瑞、阿拉纳克、菲尼克斯，文档会继续标记为 CASC/实机待补。

## 闭包证明文档

2026-06-03 已新增虫族指挥官官方闭包导出：

- `docs/newdocs/指挥官细化/虫族闭包/虫族指挥官完整闭包-2026-06-03.md`
- `docs/newdocs/指挥官细化/虫族闭包/zerg-commander-closure.json`
- 生成脚本：`scripts/sc2/export-zerg-commander-closure.mjs`

这份闭包按官方 commander JSON 先做归属过滤，再用官方原始文本镜像补 `AbilData / EffectData / RequirementData` 摘要。它覆盖阿巴瑟、凯瑞甘、扎加拉、斯台特曼、斯托科夫、德哈卡 6 名虫族指挥官的顶部/等级解锁技能、15 级最终解锁、6 项精通、3 个威望、工蜂/私有劳工建造项、幼虫变异、形态进化、建筑训练/召唤、非默认技能按钮、raw effect 闭包和排除/复核候选。

虫族闭包的额外防线：

- 阿巴瑟满级有效蟑螂主线只保留 `RoachVile`，`Roach` / `RoachCorpser` 只保留为审计项。
- 阿巴瑟 `Ravager` 只接受 `RoachVile -> MorphRoachVileToRavager -> RavagerAbathur`，并显式补 `RavagerAbathurCorrosiveBile`、`BurrowRavagerAbathurDown`、`BurrowRavagerAbathurUp`。
- 阿巴瑟 worker build 不应包含普通 `NydusNetwork` / `ZergBuild,Build10`，这两项只能作为共享污染排除；凯瑞甘仍保留官方正向 `NydusNetwork`。
- 斯台特曼 worker build 必须走 `ZergBuildStetmann` 私有链；德哈卡坑道类对象必须是 `DehakaNydusDestroyer`；斯托科夫保持 `SI*` 感染链。

2026-06-03 已新增神族指挥官官方闭包导出：

- `docs/newdocs/指挥官细化/神族闭包/神族指挥官完整闭包-2026-06-03.md`
- `docs/newdocs/指挥官细化/神族闭包/protoss-commander-closure.json`
- 生成脚本：`scripts/sc2/export-protoss-commander-closure.mjs`

这份闭包按官方 commander JSON 先做归属过滤，再用官方原始文本镜像补 `AbilData / EffectData / RequirementData` 摘要。它覆盖神族 6 名指挥官的顶部/等级解锁技能、兵种生产链、建筑链、农民建造项、非默认技能按钮、raw effect 闭包和排除/复核候选。后续实现神族指挥官时，优先看这份闭包，而不是直接从共享 `Gateway` / `PhotonCannon` command card 反推归属。

2026-06-03 已新增人族指挥官官方闭包导出：

- `docs/newdocs/指挥官细化/人族闭包/人族指挥官完整闭包-2026-06-03.md`
- `docs/newdocs/指挥官细化/人族闭包/terran-commander-closure.json`
- 生成脚本：`scripts/sc2/export-terran-commander-closure.mjs`

这份闭包按官方 commander JSON 先做归属过滤，再用官方原始文本镜像补 `AbilData / EffectData / RequirementData` 摘要。它覆盖雷诺、斯旺、霍纳与汉、诺娃、蒙斯克、泰凯斯 6 名人族指挥官的顶部/等级解锁技能、兵种生产链、建筑链、SCV/劳工/冲锋队建造项、非默认技能按钮、raw effect 闭包和排除/复核候选。

2026-06-03 追加修正：人族闭包新增 `worker_build_commands`，把 `buildings.json` 建筑名册与实际劳工建造命令分开。示例：Raynor `buildings.json` 只有 6 项，但 SCV raw 建造命令还包括 `Refinery`、`EngineeringBay`、`Factory`、`Starport`、`Armory`、`FusionCore` 等功能性前置；Nova 的 `AutoTurret` 通过 `TerranBuildFullRefund,Build1 -> NovaACLaserTurret` 归一到 official `AutoTurret`；Swann 的 `KelMorianGrenadeTurret` 只在 Swann 链路保留。

本轮额外修正的人族误归属防线：

- `HH*` / `HHSCV` / `HHCommandCenter` 只允许进入霍纳与汉链路，不能因为目标是 `SCV`、补给站或导弹塔而被雷诺/斯旺/诺娃误收。
- `KelMorian*` / `DrakkenLaser*` 只允许进入斯旺链路，不能从共享 SCV 建造卡反推到其它人族指挥官。
- `BlackOps` 只允许进入诺娃链路；但 `SalvageShared` 的 `NotHaveAutoTurret_BlackOpsTimedLife` 是共享负条件，不代表回收按钮归诺娃。
- `CanBuildArmory`、`CanBuildStarport`、`CanMorphOrbitalCommand` 中的 `CommanderPrestigeRaynorAirCompleteOnly` 是通用 Terran 科技绕过条件，不代表这些建筑/变形只归雷诺。
- 霍纳与汉官方 `buildings.json` 为空，因此人族闭包中 Horner 的建筑清单和农民可建造清单必须保持为 0。
- Horner `Liberator` 上继承到的 `VehicleAfterburners` 因 `HaveVehicleAfterburners -> CountUpgradeRaynorCommanderCompleteOnly` 被排除，不计入霍纳正向技能链。
- Horner `Liberator` 的 `StarportTrainNova,Train3`、Tychus `Marauder` 的 `BarracksTrainNova,Train2` 都是 Nova 训练链共享污染，只能作为排除候选。
- Mengsk 的 `Rally,Rally1` 不能一刀切判错；只有带 `other_commander_token:Nova` / `requirement_reference_belongs_to_other_commander:Nova` 的共享行才按 Nova 污染排除，蒙斯克自己的 `CommandCenterMengskRally` 和冲锋队/补给地堡集结链仍是正向链路。
