# 指挥官命令卡归属误挂排查与扫描

- 生成时间：2026/5/30 10:25:10
- 官方 JSON：`C:\Users\22448\Downloads\重生虫心0.71汉化版（新）\reborn_workrepo\游戏数据\官方合作指挥官\commanders`
- XMFinal Profile：`C:\Users\22448\Downloads\重生虫心0.71汉化版（新）\reborn_workrepo\原始mod\Mods\XM\XMFinal.SC2Mod\Base.SC2Data`
- 目的：复用凯瑞甘跳虫误挂爆虫链的排查路子，批量找出共享命令卡把别的指挥官按钮/技能带进来的候选。

## 排查路子

1. 先看现象落点：不是只搜单位名，而是从 `command_cards.json` 的按钮行开始看 `face`、`abil_cmd`、`requirements`、按钮本体 ID。凯瑞甘问题就是 `Zergling` 命令卡里带了 `ZagaraVoidCoopZerglingDodge`、`MorphZerglingToBaneling`、`MorphToBaneling`。
2. 再判定归属：如果按钮/技能/需求 ID 里出现其他指挥官标识，或命中特殊归属规则（例如扎加拉跳虫闪避、基础跳虫变爆虫链、斯托科夫感染体野性突变），就标成误挂候选。
3. 分清两种风险：`OfficialJson` 说明官方导出 JSON 的共享命令卡里有候选；`XMFinalProfile` 说明候选已经进入当前生成出的 XMFinal 测试/运行时 Profile，优先级更高。
4. 修复时不要直接改官方导出 JSON；应在 `generate-xmfinal-commander-profiles.mjs` 和可读报告导出脚本里加过滤/映射，再重跑生成并用 `rg` 验证目标指挥官段不再出现。

## 已落地过滤规则

- `Kerrigan / Zergling`、`Stukov / Zergling`：过滤扎加拉跳虫闪避和基础跳虫变爆虫链，字段包括 `ZagaraVoidCoopZerglingDodge`、`Baneling`、`MorphZerglingToBaneling`、`MorphToBaneling`、`HaveMasteryZagaraZerglingDodgeChance`。
- `Abathur / Mutalisk`：过滤斯托科夫感染体野性突变，字段包括 `StukovInfestedWildMutation`。
- `Raynor / SiegeTank`：过滤斯旺不朽协议，字段包括 `CommanderSwannImmortalityProtocol`、`HaveSwannCommanderImmortalityProtocol`。
- `Artanis / ImmortalAiur`：过滤凯拉克斯暗影炮，字段包括 `ShadowCannonLocked`、`ImmortalShakurasShadowCannon`、`KaraxLevel09`。
- `Fenix / ColossusPurifier`、`Fenix / ZealotPurifier`：过滤凯拉克斯热能长枪/重构链，字段包括 `ExtendedThermalLance`、`HaveKaraxExtendedThermalLance`、`ReconstructionLocked`、`KaraxLevel04`、`ZealotPurifierReviveKaraxHide`。
- `Karax / Scout`：过滤菲尼克斯摩约侦察机射程升级，字段包括 `HaveFenixScoutWeaponRange`。
- `Swann / SCV`：过滤雷诺聚变芯体等级锁，字段包括 `BuildFusionCoreLocked`、`RaynorLevel06`。
- `Swann / SiegeTank`：过滤雷诺推进器等级锁，字段包括 `AfterburnersLocked`、`RaynorLevel11`。
- `Vorazun / Stalker`：过滤阿拉纳克杀戮者/机械威望按钮，字段包括 `AlarakStalkerPhasingArmor`、`HaveAlarakStalkerPhasingArmor`、`CommanderPrestigeAlarakMechBuff`、`CommanderPrestigeAlarakMech`。
- `Vorazun / Zealot`：过滤亚坦尼斯旋风等级锁，字段包括 `WhirlwindLocked`、`ArtanisLevel04`。
- 规则位置：`scripts/sc2/generate-xmfinal-commander-profiles.mjs` 与 `scripts/sc2/export-official-vs-mod-readable-report.mjs`。审计脚本只负责发现和报告，不修改官方 JSON。

## 当前结论

- XMFinalProfile 疑似误挂候选：0 行。
- OfficialJson 共享命令卡候选：92 行。
- 凯瑞甘官方 JSON 中仍能看到共享 Zergling 候选：4 行，这是数据源层面的共享命令卡现象。
- 凯瑞甘 XMFinal Profile 中同类 Zergling 候选：0 行，当前应为 0。

## 按指挥官汇总

| 指挥官 | P1 Profile | P2 OfficialJson | 合计 |
| --- | --- | --- | --- |
| Abathur | 0 | 2 | 2 |
| Alarak | 0 | 8 | 8 |
| Artanis | 0 | 20 | 20 |
| Fenix | 0 | 13 | 13 |
| Karax | 0 | 7 | 7 |
| Kerrigan | 0 | 5 | 5 |
| Nova | 0 | 5 | 5 |
| Raynor | 0 | 6 | 6 |
| Stetmann | 0 | 1 | 1 |
| Swann | 0 | 2 | 2 |
| Vorazun | 0 | 12 | 12 |
| Zeratul | 0 | 11 | 11 |

## P1：已进入 XMFinal Profile 的候选

- 无。

## P1 人工复核摘要

- 无。

## P2：官方 JSON 共享命令卡候选

| 指挥官 | 对象 | 按钮 | 技能 | 需求 | 疑似归属 | 原因 | 文件 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Abathur | 异龙 Mutalisk | StukovInfestedWildMutation | StukovInfestedWildMutation |  | Stukov | 斯托科夫感染体野性突变不应从共享异龙命令卡串到其他异虫指挥官 | Abathur/command_cards.json |
| Abathur | 异龙 Mutalisk | StukovInfestedWildMutation | StukovInfestedWildMutation |  | Stukov | 字段 ID/Key 中出现其他指挥官标识 | Abathur/command_cards.json |
| Alarak | 传送门 Gateway | SentryFenix | GatewayTrain |  | Fenix | 字段 ID/Key 中出现其他指挥官标识 | Alarak/command_cards.json |
| Alarak | 传送门 Gateway | WarpInDarkArchonLocked |  | VorazunLevel05 | Vorazun | 字段 ID/Key 中出现其他指挥官标识 | Alarak/command_cards.json |
| Alarak | 光子炮台 PhotonCannon | KaraxTurretAttackSpeed |  | HaveKaraxTurretAttackSpeed | Karax | 字段 ID/Key 中出现其他指挥官标识 | Alarak/command_cards.json |
| Alarak | 光子炮台 PhotonCannon | KaraxTurretRange |  | HaveKaraxTurretRange | Karax | 字段 ID/Key 中出现其他指挥官标识 | Alarak/command_cards.json |
| Alarak | 光影议会 TwilightCouncil | FenixTalisAdeptLearnBounceShotUpgradeLocked |  | FenixLevel04 | Fenix | 字段 ID/Key 中出现其他指挥官标识 | Alarak/command_cards.json |
| Alarak | 光影议会 TwilightCouncil | ResearchFenixKaldalisZealotCleaveLocked |  | FenixLevel04 | Fenix | 字段 ID/Key 中出现其他指挥官标识 | Alarak/command_cards.json |
| Alarak | 光影议会 TwilightCouncil | ResearchReclamationLocked |  | KaraxLevel04 | Karax | 字段 ID/Key 中出现其他指挥官标识 | Alarak/command_cards.json |
| Alarak | 光影议会 TwilightCouncil | ResearchReconstructionLocked |  | KaraxLevel04 | Karax | 字段 ID/Key 中出现其他指挥官标识 | Alarak/command_cards.json |
| Artanis | 传送门 Gateway | AlarakMasteryUnitAttackSpeed |  | HaveMasteryAlarakUnitAttackSpeed | Alarak | 字段 ID/Key 中出现其他指挥官标识 | Artanis/command_cards.json |
| Artanis | 传送门 Gateway | SentryFenix | GatewayTrain |  | Fenix | 字段 ID/Key 中出现其他指挥官标识 | Artanis/command_cards.json |
| Artanis | 传送门 Gateway | WarpinAscendentLocked |  | AlarakLevel08 | Alarak | 字段 ID/Key 中出现其他指挥官标识 | Artanis/command_cards.json |
| Artanis | 传送门 Gateway | WarpInDarkArchonLocked |  | VorazunLevel05 | Vorazun | 字段 ID/Key 中出现其他指挥官标识 | Artanis/command_cards.json |
| Artanis | 不朽者 ImmortalAiur | ImmortalShakurasShadowCannon | ImmortalShakurasShadowCannon |  | Karax | 凯拉克斯不朽者暗影炮不应从共享不朽者命令卡串到其他星灵指挥官 | Artanis/command_cards.json |
| Artanis | 不朽者 ImmortalAiur | ShadowCannonLocked |  | KaraxLevel09 | Karax | 凯拉克斯不朽者暗影炮不应从共享不朽者命令卡串到其他星灵指挥官 | Artanis/command_cards.json |
| Artanis | 不朽者 ImmortalAiur | ShadowCannonLocked |  | KaraxLevel09 | Karax | 字段 ID/Key 中出现其他指挥官标识 | Artanis/command_cards.json |
| Artanis | 光子炮台 PhotonCannon | KaraxTurretAttackSpeed |  | HaveKaraxTurretAttackSpeed | Karax | 字段 ID/Key 中出现其他指挥官标识 | Artanis/command_cards.json |
| Artanis | 光子炮台 PhotonCannon | KaraxTurretRange |  | HaveKaraxTurretRange | Karax | 字段 ID/Key 中出现其他指挥官标识 | Artanis/command_cards.json |
| Artanis | 机械研究所 RoboticsBay | FenixImmortalResearchDetonationShotLocked |  | FenixLevel12 | Fenix | 字段 ID/Key 中出现其他指挥官标识 | Artanis/command_cards.json |
| Artanis | 机械研究所 RoboticsBay | FenixResearchDisruptorCloakLocked |  | FenixLevel09 | Fenix | 字段 ID/Key 中出现其他指挥官标识 | Artanis/command_cards.json |
| Artanis | 机械研究所 RoboticsBay | FenixResearchDisruptorSecondExplosionLocked |  | FenixLevel09 | Fenix | 字段 ID/Key 中出现其他指挥官标识 | Artanis/command_cards.json |
| Artanis | 机械研究所 RoboticsBay | ResearchAlarakVanguardIncreaseSplashAreaLocked |  | AlarakLevel06 | Alarak | 字段 ID/Key 中出现其他指挥官标识 | Artanis/command_cards.json |
| Artanis | 机械研究所 RoboticsBay | ResearchFenixWarbringerColossusPowerShotLocked |  | FenixLevel14 | Fenix | 字段 ID/Key 中出现其他指挥官标识 | Artanis/command_cards.json |
| Artanis | 机械研究所 RoboticsBay | ResearchZeratulImmortalRange |  | HaveZeratulArtifactTier2AndRoboticsBay | Zeratul | 字段 ID/Key 中出现其他指挥官标识 | Artanis/command_cards.json |
| Artanis | 机械研究所 RoboticsBay | ZeratulResearchImprovedBarrier |  | HaveZeratulArtifactTier3AndRoboticsBay | Zeratul | 字段 ID/Key 中出现其他指挥官标识 | Artanis/command_cards.json |
| Artanis | 光影议会 TwilightCouncil | FenixTalisAdeptLearnBounceShotUpgradeLocked |  | FenixLevel04 | Fenix | 字段 ID/Key 中出现其他指挥官标识 | Artanis/command_cards.json |
| Artanis | 光影议会 TwilightCouncil | ResearchFenixKaldalisZealotCleaveLocked |  | FenixLevel04 | Fenix | 字段 ID/Key 中出现其他指挥官标识 | Artanis/command_cards.json |
| Artanis | 光影议会 TwilightCouncil | ResearchReclamationLocked |  | KaraxLevel04 | Karax | 字段 ID/Key 中出现其他指挥官标识 | Artanis/command_cards.json |
| Artanis | 光影议会 TwilightCouncil | ResearchReconstructionLocked |  | KaraxLevel04 | Karax | 字段 ID/Key 中出现其他指挥官标识 | Artanis/command_cards.json |
| Fenix | 巨像 ColossusPurifier | ExtendedThermalLance |  | HaveKaraxExtendedThermalLance | Karax | 字段 ID/Key 中出现其他指挥官标识 | Fenix/command_cards.json |
| Fenix | 传送门 Gateway | AlarakMasteryUnitAttackSpeed |  | HaveMasteryAlarakUnitAttackSpeed | Alarak | 字段 ID/Key 中出现其他指挥官标识 | Fenix/command_cards.json |
| Fenix | 传送门 Gateway | WarpinAscendentLocked |  | AlarakLevel08 | Alarak | 字段 ID/Key 中出现其他指挥官标识 | Fenix/command_cards.json |
| Fenix | 传送门 Gateway | WarpInDarkArchonLocked |  | VorazunLevel05 | Vorazun | 字段 ID/Key 中出现其他指挥官标识 | Fenix/command_cards.json |
| Fenix | 光子炮台 PhotonCannon | KaraxTurretAttackSpeed |  | HaveKaraxTurretAttackSpeed | Karax | 字段 ID/Key 中出现其他指挥官标识 | Fenix/command_cards.json |
| Fenix | 光子炮台 PhotonCannon | KaraxTurretRange |  | HaveKaraxTurretRange | Karax | 字段 ID/Key 中出现其他指挥官标识 | Fenix/command_cards.json |
| Fenix | 机械研究所 RoboticsBay | ResearchAlarakVanguardIncreaseSplashAreaLocked |  | AlarakLevel06 | Alarak | 字段 ID/Key 中出现其他指挥官标识 | Fenix/command_cards.json |
| Fenix | 机械研究所 RoboticsBay | ResearchZeratulImmortalRange |  | HaveZeratulArtifactTier2AndRoboticsBay | Zeratul | 字段 ID/Key 中出现其他指挥官标识 | Fenix/command_cards.json |
| Fenix | 机械研究所 RoboticsBay | ZeratulResearchImprovedBarrier |  | HaveZeratulArtifactTier3AndRoboticsBay | Zeratul | 字段 ID/Key 中出现其他指挥官标识 | Fenix/command_cards.json |
| Fenix | 光影议会 TwilightCouncil | ResearchReclamationLocked |  | KaraxLevel04 | Karax | 字段 ID/Key 中出现其他指挥官标识 | Fenix/command_cards.json |
| Fenix | 光影议会 TwilightCouncil | ResearchReconstructionLocked |  | KaraxLevel04 | Karax | 字段 ID/Key 中出现其他指挥官标识 | Fenix/command_cards.json |
| Fenix | 哨兵 ZealotPurifier |  |  | ZealotPurifierReviveKaraxHide | Karax | 字段 ID/Key 中出现其他指挥官标识 | Fenix/command_cards.json |
| Fenix | 哨兵 ZealotPurifier | ReconstructionLocked |  | KaraxLevel04 | Karax | 字段 ID/Key 中出现其他指挥官标识 | Fenix/command_cards.json |
| Karax | 传送门 Gateway | AlarakMasteryUnitAttackSpeed |  | HaveMasteryAlarakUnitAttackSpeed | Alarak | 字段 ID/Key 中出现其他指挥官标识 | Karax/command_cards.json |
| Karax | 传送门 Gateway | SentryFenix | GatewayTrain |  | Fenix | 字段 ID/Key 中出现其他指挥官标识 | Karax/command_cards.json |
| Karax | 传送门 Gateway | WarpinAscendentLocked |  | AlarakLevel08 | Alarak | 字段 ID/Key 中出现其他指挥官标识 | Karax/command_cards.json |
| Karax | 传送门 Gateway | WarpInDarkArchonLocked |  | VorazunLevel05 | Vorazun | 字段 ID/Key 中出现其他指挥官标识 | Karax/command_cards.json |
| Karax | 折跃侦察机 Scout | HaveFenixScoutWeaponRange |  | HaveFenixScoutWeaponRange | Fenix | 字段 ID/Key 中出现其他指挥官标识 | Karax/command_cards.json |
| Karax | 光影议会 TwilightCouncil | FenixTalisAdeptLearnBounceShotUpgradeLocked |  | FenixLevel04 | Fenix | 字段 ID/Key 中出现其他指挥官标识 | Karax/command_cards.json |
| Karax | 光影议会 TwilightCouncil | ResearchFenixKaldalisZealotCleaveLocked |  | FenixLevel04 | Fenix | 字段 ID/Key 中出现其他指挥官标识 | Karax/command_cards.json |
| Kerrigan | 虫道网络 NydusNetwork | ZagaraVoidCoopNydusWorm |  |  | Zagara | 字段 ID/Key 中出现其他指挥官标识 | Kerrigan/command_cards.json |
| Kerrigan | 跳虫 Zergling |  | MorphToBaneling |  | Zagara | 基础跳虫变爆虫链只应进入扎加拉链路，凯瑞甘/斯托科夫这类共享 Zergling 命令卡不能直接继承 | Kerrigan/command_cards.json |
| Kerrigan | 跳虫 Zergling | Baneling | MorphZerglingToBaneling |  | Zagara | 基础跳虫变爆虫链只应进入扎加拉链路，凯瑞甘/斯托科夫这类共享 Zergling 命令卡不能直接继承 | Kerrigan/command_cards.json |
| Kerrigan | 跳虫 Zergling | ZagaraVoidCoopZerglingDodge |  | HaveMasteryZagaraZerglingDodgeChance | Zagara | 扎加拉跳虫闪避精通只应进入扎加拉链路 | Kerrigan/command_cards.json |
| Kerrigan | 跳虫 Zergling | ZagaraVoidCoopZerglingDodge |  | HaveMasteryZagaraZerglingDodgeChance | Zagara | 字段 ID/Key 中出现其他指挥官标识 | Kerrigan/command_cards.json |
| Nova | 兵营 Barracks | MengskUnits |  |  | Mengsk | 字段 ID/Key 中出现其他指挥官标识 | Nova/command_cards.json |
| Nova | 导弹塔 MissileTurret | HaveImprovedTurretAttackSpeed |  | HaveSwannTurretIncreasedAttackSpeed | Swann | 字段 ID/Key 中出现其他指挥官标识 | Nova/command_cards.json |
| Nova | SCV SCV | AdvancedConstructionLocked |  | SwannLevel08 | Swann | 字段 ID/Key 中出现其他指挥官标识 | Nova/command_cards.json |
| Nova | SCV SCV | BuildFusionCoreLocked |  | RaynorLevel06 | Raynor | 字段 ID/Key 中出现其他指挥官标识 | Nova/command_cards.json |
| Nova | SCV SCV | SwannBarracks |  | HaveSwannCommander | Swann | 字段 ID/Key 中出现其他指挥官标识 | Nova/command_cards.json |
| Raynor | 兵营 Barracks | MengskUnits |  |  | Mengsk | 字段 ID/Key 中出现其他指挥官标识 | Raynor/command_cards.json |
| Raynor | 兵营 Barracks | TrainGhostNova | BarracksTrainNova |  | Nova | 字段 ID/Key 中出现其他指挥官标识 | Raynor/command_cards.json |
| Raynor | 导弹塔 MissileTurret | HaveImprovedTurretAttackSpeed |  | HaveSwannTurretIncreasedAttackSpeed | Swann | 字段 ID/Key 中出现其他指挥官标识 | Raynor/command_cards.json |
| Raynor | SCV SCV | AdvancedConstructionLocked |  | SwannLevel08 | Swann | 字段 ID/Key 中出现其他指挥官标识 | Raynor/command_cards.json |
| Raynor | SCV SCV | SwannBarracks |  | HaveSwannCommander | Swann | 字段 ID/Key 中出现其他指挥官标识 | Raynor/command_cards.json |
| Raynor | 攻城坦克 SiegeTank | CommanderSwannImmortalityProtocol |  | HaveSwannCommanderImmortalityProtocol | Swann | 字段 ID/Key 中出现其他指挥官标识 | Raynor/command_cards.json |
| Stetmann | 机械萃取房 ExtractorStetmann | K5GasBonuses |  | HaveK5GasBonuses | Kerrigan | 字段 ID/Key 中出现其他指挥官标识 | Stetmann/command_cards.json |
| Swann | SCV SCV | BuildFusionCoreLocked |  | RaynorLevel06 | Raynor | 字段 ID/Key 中出现其他指挥官标识 | Swann/command_cards.json |
| Swann | 攻城坦克 SiegeTank | AfterburnersLocked |  | RaynorLevel11 | Raynor | 字段 ID/Key 中出现其他指挥官标识 | Swann/command_cards.json |
| Vorazun | 传送门 Gateway | AlarakMasteryUnitAttackSpeed |  | HaveMasteryAlarakUnitAttackSpeed | Alarak | 字段 ID/Key 中出现其他指挥官标识 | Vorazun/command_cards.json |
| Vorazun | 传送门 Gateway | SentryFenix | GatewayTrain |  | Fenix | 字段 ID/Key 中出现其他指挥官标识 | Vorazun/command_cards.json |
| Vorazun | 传送门 Gateway | WarpinAscendentLocked |  | AlarakLevel08 | Alarak | 字段 ID/Key 中出现其他指挥官标识 | Vorazun/command_cards.json |
| Vorazun | 光子炮台 PhotonCannon | KaraxTurretAttackSpeed |  | HaveKaraxTurretAttackSpeed | Karax | 字段 ID/Key 中出现其他指挥官标识 | Vorazun/command_cards.json |
| Vorazun | 光子炮台 PhotonCannon | KaraxTurretRange |  | HaveKaraxTurretRange | Karax | 字段 ID/Key 中出现其他指挥官标识 | Vorazun/command_cards.json |
| Vorazun | 追猎者 Stalker | AlarakStalkerPhasingArmor |  | HaveAlarakStalkerPhasingArmor | Alarak | 字段 ID/Key 中出现其他指挥官标识 | Vorazun/command_cards.json |
| Vorazun | 追猎者 Stalker | CommanderPrestigeAlarakMechBuff |  | CommanderPrestigeAlarakMech | Alarak | 字段 ID/Key 中出现其他指挥官标识 | Vorazun/command_cards.json |
| Vorazun | 光影议会 TwilightCouncil | FenixTalisAdeptLearnBounceShotUpgradeLocked |  | FenixLevel04 | Fenix | 字段 ID/Key 中出现其他指挥官标识 | Vorazun/command_cards.json |
| Vorazun | 光影议会 TwilightCouncil | ResearchFenixKaldalisZealotCleaveLocked |  | FenixLevel04 | Fenix | 字段 ID/Key 中出现其他指挥官标识 | Vorazun/command_cards.json |
| Vorazun | 光影议会 TwilightCouncil | ResearchReclamationLocked |  | KaraxLevel04 | Karax | 字段 ID/Key 中出现其他指挥官标识 | Vorazun/command_cards.json |
| Vorazun | 光影议会 TwilightCouncil | ResearchReconstructionLocked |  | KaraxLevel04 | Karax | 字段 ID/Key 中出现其他指挥官标识 | Vorazun/command_cards.json |
| Vorazun | 狂热者 Zealot | WhirlwindLocked |  | ArtanisLevel04 | Artanis | 字段 ID/Key 中出现其他指挥官标识 | Vorazun/command_cards.json |
| Zeratul | 黑暗圣坛 DarkShrine | DarkArchonPassive |  | HaveVorazunCommander | Vorazun | 字段 ID/Key 中出现其他指挥官标识 | Zeratul/command_cards.json |
| Zeratul | 黑暗圣坛 DarkShrine | ResearchDarkArchonFullStartingEnergyLocked |  | VorazunLevel09 | Vorazun | 字段 ID/Key 中出现其他指挥官标识 | Zeratul/command_cards.json |
| Zeratul | 黑暗圣坛 DarkShrine | ResearchMindControlLocked |  | VorazunLevel09 | Vorazun | 字段 ID/Key 中出现其他指挥官标识 | Zeratul/command_cards.json |
| Zeratul | 黑暗圣坛 DarkShrine | ResearchShadowDashLocked |  | VorazunLevel06 | Vorazun | 字段 ID/Key 中出现其他指挥官标识 | Zeratul/command_cards.json |
| Zeratul | 黑暗圣坛 DarkShrine | ResearchVoidStasisLocked |  | VorazunLevel06 | Vorazun | 字段 ID/Key 中出现其他指挥官标识 | Zeratul/command_cards.json |
| Zeratul | 传送门 Gateway | AlarakMasteryUnitAttackSpeed |  | HaveMasteryAlarakUnitAttackSpeed | Alarak | 字段 ID/Key 中出现其他指挥官标识 | Zeratul/command_cards.json |
| Zeratul | 传送门 Gateway | SentryFenix | GatewayTrain |  | Fenix | 字段 ID/Key 中出现其他指挥官标识 | Zeratul/command_cards.json |
| Zeratul | 传送门 Gateway | WarpinAscendentLocked |  | AlarakLevel08 | Alarak | 字段 ID/Key 中出现其他指挥官标识 | Zeratul/command_cards.json |
| Zeratul | 传送门 Gateway | WarpInDarkArchonLocked |  | VorazunLevel05 | Vorazun | 字段 ID/Key 中出现其他指挥官标识 | Zeratul/command_cards.json |
| Zeratul | 光子炮台 PhotonCannon | KaraxTurretAttackSpeed |  | HaveKaraxTurretAttackSpeed | Karax | 字段 ID/Key 中出现其他指挥官标识 | Zeratul/command_cards.json |
| Zeratul | 光子炮台 PhotonCannon | KaraxTurretRange |  | HaveKaraxTurretRange | Karax | 字段 ID/Key 中出现其他指挥官标识 | Zeratul/command_cards.json |

## 后续处理建议

1. 优先处理 P1：它们已经进入 `LibE0EAE146_CommanderUnitAbilities.galaxy` / `LibE0EAE146_CommanderHeroAbilities.galaxy`。
2. 对 P2 不要一刀切删除：先确认它是否只是官方共享命令卡的多指挥官条目；只有当当前指挥官确实不该拥有该按钮/技能时，才加过滤。
3. 每修一组后重跑：`node .\scripts\sc2\generate-xmfinal-commander-profiles.mjs --write`，再重跑本脚本和人类可读对照报告。

