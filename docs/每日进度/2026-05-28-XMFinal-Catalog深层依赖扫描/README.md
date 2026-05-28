# XMFinal Catalog 深层依赖扫描

生成时间：2026-05-28T07:01:20.803Z

## 范围

- 输入：`原始mod/Mods/XM/XMFinal.SC2Mod/Base.SC2Data` 下生成出的 commander ability/panel Galaxy profile。
- 检查：XMFinal 本地 Catalog 节点、manual fallback stub、递归引用中只由 XM 依赖或官方导出提供的节点。
- 这是静态 metadata 分析，不证明 SC2 实机施法、效果、费用、冷却、actor 或目标过滤已经闭环。

## 摘要

- Profile 使用的 Catalog ID：1015
- Profile 使用的 manual fallback ID：86
- Profile 使用的 metadata-only 本地节点：139
- 递归依赖风险行：501
- 未解析引用：84
- 仅由 XM 依赖模块提供：260
- 仅由官方导出引用提供：157

## 输出文件

- `xmfinal-catalog-stub-inventory.tsv`
- `xmfinal-catalog-dependency-issues.tsv`
- `xmfinal-catalog-dependency-summary.json`

## 高风险 Profile ID

| 类型 | ID | 指挥官 | 完整度 | Manual Fallback | 风险行 | Missing | External |
|---|---:|---|---|---:|---:|---:|---:|
| ability | TychusMedivacDoubleHealPlusMech | Tychus | ability-with-chain | no | 8 | 5 | 3 |
| ability | TychusTerranBuild | Tychus | ability-with-chain | no | 20 | 4 | 16 |
| ability | DehakaUltraliskCrashingCharge | Dehaka | ability-with-chain | no | 7 | 4 | 3 |
| ability | MedivacMengskDoubleBeamHeal | Mengsk | ability-with-chain | no | 6 | 4 | 2 |
| ability | HHWidowMineAttack | Horner | ability-minimal | no | 5 | 3 | 2 |
| ability | HHWraithCloak | Horner | ability-with-chain | no | 4 | 3 | 1 |
| ability | ZeratulZealotWhirlwind | Zeratul | ability-with-chain | no | 3 | 3 | 0 |
| ability | ZergBuildStetmann | Stetmann | ability-with-chain | no | 21 | 2 | 19 |
| ability | ScienceVesselNanoRepairDouble | Swann | ability-with-chain | no | 4 | 2 | 2 |
| ability | SymbioteCarapace | Abathur | ability-with-chain | no | 4 | 2 | 2 |
| ability | ZeratulSentryShieldRepair | Zeratul | ability-with-chain | no | 4 | 2 | 2 |
| ability | MirageGravitonBeamVoidCampaign | Karax | ability-with-chain | no | 3 | 2 | 1 |
| ability | RavenTargetLock | Horner | ability-with-chain | no | 3 | 2 | 1 |
| ability | ZeratulCharge | Zeratul | ability-with-chain | no | 3 | 2 | 1 |
| ability | MorphRoachToRavager | Abathur | ability-with-chain | no | 16 | 1 | 15 |
| ability | MorphRoachVileToRavager | Abathur | ability-with-chain | no | 16 | 1 | 15 |
| ability | TerranBuildMengsk | Mengsk | ability-with-chain | no | 14 | 1 | 13 |
| ability | DehakaLearn | Dehaka | ability-with-chain | no | 5 | 1 | 4 |
| ability | BroodLordStetmannBomberMagazine | Stetmann | ability-with-chain | no | 4 | 1 | 3 |
| ability | EMPBlackOps | Nova | ability-with-chain | no | 4 | 1 | 3 |
| ability | MedivacMengskTransport | Mengsk | ability-minimal | no | 4 | 1 | 3 |
| ability | MorphToBanelingStetmann | Stetmann | ability-with-chain | no | 4 | 1 | 3 |
| ability | MorphToCBroodLordStetmann | Stetmann | ability-with-chain | no | 4 | 1 | 3 |
| ability | MorphToLurkerStetmann | Stetmann | ability-with-chain | no | 4 | 1 | 3 |
| ability | MorphToRavagerStetmann | Stetmann | ability-with-chain | no | 4 | 1 | 3 |
| ability | TychusMedicDefensiveMatrix | Tychus | ability-with-chain | no | 4 | 1 | 3 |
| ability | AscendantSacrificeInstant | Alarak | ability-with-chain | no | 3 | 1 | 2 |
| ability | BattlecruiserMengskYamato | Mengsk | ability-with-chain | no | 3 | 1 | 2 |
| ability | BroodLordStetmannYamatoGun | Stetmann | ability-with-chain | no | 3 | 1 | 2 |
| ability | CorruptorStetmannMissilePods | Stetmann | ability-with-chain | no | 3 | 1 | 2 |

## 使用方式

1. `manual-*-stub` 和 `*-minimal` 行只代表 metadata-only smoke helper。
2. `missing` 依赖行是无需实机即可继续处理的离线候选项。
3. `xm-dependency` / `official-reference` 行是运行时依赖假设；如果实机 smoke 失败，再确认地图依赖是否加载，或把对应节点导入 XMFinal。

输出目录：`docs/每日进度/2026-05-28-XMFinal-Catalog深层依赖扫描`

