# XMFinal Catalog 深层依赖扫描

生成时间：2026-05-29T02:39:21.270Z

## 范围

- 输入：`原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data` 下生成出的 commander ability/panel Galaxy profile。
- 检查：XMFinal 本地 Catalog 节点、manual fallback stub、递归引用中只由 XM 依赖或官方导出提供的节点。
- 这是静态 metadata 分析，不证明 SC2 实机施法、效果、费用、冷却、actor 或目标过滤已经闭环。

## 摘要

- Profile 使用的 Catalog ID：1011
- Profile 使用的 manual fallback ID：86
- Profile 使用的 metadata-only 本地节点：139
- 递归依赖风险行：443
- 未解析引用：28
- 仅由 XM 依赖模块提供：259
- 仅由官方导出引用提供：156

## 输出文件

- `xmfinal-catalog-stub-inventory.tsv`
- `xmfinal-catalog-dependency-issues.tsv`
- `xmfinal-catalog-dependency-summary.json`

## 高风险 Profile ID

| 类型 | ID | 指挥官 | 完整度 | Manual Fallback | 风险行 | Missing | External |
|---|---:|---|---|---:|---:|---:|---:|
| ability | MedivacMengskDoubleBeamHeal | Mengsk | ability-with-chain | no | 6 | 2 | 2 |
| ability | ZeratulZealotWhirlwind | Zeratul | ability-with-chain | no | 3 | 2 | 0 |
| ability | DehakaLearn | Dehaka | ability-with-chain | no | 5 | 1 | 4 |
| ability | BroodLordStetmannBomberMagazine | Stetmann | ability-with-chain | no | 4 | 1 | 3 |
| ability | EMPBlackOps | Nova | ability-with-chain | no | 4 | 1 | 3 |
| ability | MorphToBanelingStetmann | Stetmann | ability-with-chain | no | 4 | 1 | 3 |
| ability | MorphToCBroodLordStetmann | Stetmann | ability-with-chain | no | 4 | 1 | 3 |
| ability | MorphToLurkerStetmann | Stetmann | ability-with-chain | no | 4 | 1 | 3 |
| ability | MorphToRavagerStetmann | Stetmann | ability-with-chain | no | 4 | 1 | 3 |
| ability | TychusMedivacDoubleHealPlusMech | Tychus | ability-with-chain | no | 8 | 1 | 3 |
| ability | CorruptorStetmannMissilePods | Stetmann | ability-with-chain | no | 3 | 1 | 2 |
| ability | SymbioteCarapace | Abathur | ability-with-chain | no | 4 | 1 | 2 |
| ability | TychusShredderGrenade | Tychus | ability-with-chain | no | 3 | 1 | 2 |
| ability | DehakaMorphToPrimalSwarmHostBurrowed | Dehaka | ability-with-chain | no | 2 | 1 | 1 |
| ability | DehakaMorphToSwarmHostBurrowed | Dehaka | ability-with-chain | no | 2 | 1 | 1 |
| ability | GaryStetmannRecall | Stetmann | ability-with-chain | no | 2 | 1 | 1 |
| ability | GhostMengskHoldFire | Mengsk | ability-minimal | no | 2 | 1 | 1 |
| ability | HHWraithCloak | Horner | ability-with-chain | no | 4 | 1 | 1 |
| ability | RavenTargetLock | Horner | ability-with-chain | no | 3 | 1 | 1 |
| ability | SuperGaryStetmannRecall | Stetmann | ability-with-chain | no | 2 | 1 | 1 |
| ability | WarpPrismTransport | Alarak | ability-minimal | no | 2 | 1 | 1 |
| ability | ZeratulPhasingMode | Zeratul | ability-with-chain | no | 2 | 1 | 1 |
| ability | ZeratulReflectionShield | Zeratul | ability-with-chain | no | 2 | 1 | 1 |
| ability | ScourgeDetonate | Zagara | ability-with-chain | no | 1 | 1 | 0 |
| ability | ZagaraVoidCoopBanelingBarrage | Zagara | ability-with-chain | no | 1 | 1 | 0 |
| ability | ZagaraVoidCoopSpawnHunterKillers | Zagara | ability-with-chain | no | 1 | 1 | 0 |
| ability | BansheeCloak | Raynor | manual-ability-stub | yes | 0 | 0 | 0 |
| ability | BurrowUltraliskDown | Kerrigan,Stukov,Zagara | manual-ability-stub | yes | 0 | 0 | 0 |
| ability | BurrowUltraliskUp | Abathur,Kerrigan,Stukov,Zagara | manual-ability-stub | yes | 0 | 0 | 0 |
| ability | CarrierHangar | Fenix,Karax | manual-ability-stub | yes | 0 | 0 | 0 |

## 使用方式

1. `manual-*-stub` 和 `*-minimal` 行只代表 metadata-only smoke helper。
2. `missing` 依赖行是无需实机即可继续处理的离线候选项。
3. `xm-dependency` / `official-reference` 行是运行时依赖假设；如果实机 smoke 失败，再确认地图依赖是否加载，或把对应节点导入 XMFinal。

输出目录：`docs/每日进度/2026-05-28-XMFinal-Catalog深层依赖扫描`

