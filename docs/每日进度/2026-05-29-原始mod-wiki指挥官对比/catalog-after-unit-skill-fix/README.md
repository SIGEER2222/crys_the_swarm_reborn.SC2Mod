# XMFinal Catalog 深层依赖扫描

生成时间：2026-05-29T08:55:26.125Z

## 范围

- 输入：`原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data` 下生成出的 commander ability/panel Galaxy profile。
- 检查：XMFinal 本地 Catalog 节点、manual fallback stub、递归引用中只由 XM 依赖或官方导出提供的节点。
- 这是静态 metadata 分析，不证明 SC2 实机施法、效果、费用、冷却、actor 或目标过滤已经闭环。

## 摘要

- Profile 使用的 Catalog ID：1213
- Profile 使用的 manual fallback ID：81
- Profile 使用的 metadata-only 本地节点：151
- 递归依赖风险行：1012
- 未解析引用：0
- 仅由 XM 依赖模块提供：186
- 仅由官方导出引用提供：826

## 输出文件

- `xmfinal-catalog-stub-inventory.tsv`
- `xmfinal-catalog-dependency-issues.tsv`
- `xmfinal-catalog-dependency-summary.json`

## 高风险 Profile ID

| 类型 | ID | 指挥官 | 完整度 | Manual Fallback | 风险行 | Missing | External |
|---|---:|---|---|---:|---:|---:|---:|
| ability | BansheeCloak | Raynor | manual-ability-stub | yes | 0 | 0 | 0 |
| ability | BurrowUltraliskDown | Kerrigan,Zagara | manual-ability-stub | yes | 0 | 0 | 0 |
| ability | BurrowUltraliskUp | Abathur,Kerrigan,Zagara | manual-ability-stub | yes | 0 | 0 | 0 |
| ability | CarrierHangar | Fenix,Karax | manual-ability-stub | yes | 0 | 0 | 0 |
| ability | Feedback | Artanis | manual-ability-stub | yes | 0 | 0 | 0 |
| ability | GhostHoldFire | Nova | manual-ability-stub | yes | 0 | 0 | 0 |
| ability | GhostWeaponsFree | Nova | manual-ability-stub | yes | 0 | 0 | 0 |
| ability | GravitonBeamVoidCampaign | Karax | manual-ability-stub | yes | 0 | 0 | 0 |
| ability | ImmortalBarrierBase | Artanis,Karax | manual-ability-stub | yes | 0 | 0 | 0 |
| ability | ImmortalOverload | Fenix | manual-ability-stub | yes | 0 | 0 | 0 |
| ability | K5DropPods | Kerrigan | manual-ability-stub | yes | 0 | 0 | 0 |
| ability | LiberatorAGTarget | Horner | manual-ability-stub | yes | 0 | 0 | 0 |
| ability | LockOnCancel | Swann | manual-ability-stub | yes | 0 | 0 | 0 |
| ability | LocustLaunch | Abathur | manual-ability-stub | yes | 0 | 0 | 0 |
| ability | LurkerHoldFire | Stetmann | manual-ability-stub | yes | 0 | 0 | 0 |
| ability | LurkerRemoveHoldFire | Stetmann | manual-ability-stub | yes | 0 | 0 | 0 |
| ability | MorphToBaneling | Zagara | manual-ability-stub | yes | 0 | 0 | 0 |
| ability | MorphToBroodLord | Zagara | manual-ability-stub | yes | 0 | 0 | 0 |
| ability | MorphToSwarmHostBurrowed | Abathur | manual-ability-stub | yes | 0 | 0 | 0 |
| ability | OracleStasisTrapBuild | Vorazun | manual-ability-stub | yes | 0 | 0 | 0 |
| ability | SiegeMode | Raynor,Swann | manual-ability-stub | yes | 0 | 0 | 0 |
| ability | SpawnBanelings | Kerrigan | manual-ability-stub | yes | 0 | 0 | 0 |
| ability | Stimpack | Raynor | manual-ability-stub | yes | 0 | 0 | 0 |
| ability | StimpackMarauder | Raynor,Tychus | manual-ability-stub | yes | 0 | 0 | 0 |
| ability | TacNukeStrike | Nova | manual-ability-stub | yes | 0 | 0 | 0 |
| ability | VoidRaySwarmDamageBoost | Vorazun | manual-ability-stub | yes | 0 | 0 | 0 |
| ability | VolatileBurstBuilding | Stetmann,Zagara | manual-ability-stub | yes | 0 | 0 | 0 |
| ability | Yoink | Abathur | manual-ability-stub | yes | 0 | 0 | 0 |
| button | BurrowDown | Abathur,Dehaka,Kerrigan,Stetmann,Stukov,Zagara | manual-button-with-metadata | yes | 0 | 0 | 0 |
| button | ChainReaction | Kerrigan | manual-button-stub | yes | 0 | 0 | 0 |

## 使用方式

1. `manual-*-stub` 和 `*-minimal` 行只代表 metadata-only smoke helper。
2. `missing` 依赖行是无需实机即可继续处理的离线候选项。
3. `xm-dependency` / `official-reference` 行是运行时依赖假设；如果实机 smoke 失败，再确认地图依赖是否加载，或把对应节点导入 XMFinal。

输出目录：`docs/每日进度/2026-05-29-原始mod-wiki指挥官对比/catalog-after-unit-skill-fix`

