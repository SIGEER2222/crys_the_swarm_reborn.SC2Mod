# 2026-05-28 Abathur / Alarak / Kerrigan / Zeratul 完成确认与兵种建筑面板

## 结论

- 当前 `合作指挥官版起义狂潮/` 基线上，`Abathur`、`Alarak`、`Kerrigan`、`Zeratul` 的严格静态校验已再次通过，可按“当前静态链路已闭环”处理。
- 本轮确认通过的脚本：
  - `scripts/validate-abathur-port.ps1 -RequireLauncherCandidate -RequireXMFinalDependency`
  - `scripts/validate-alarak-port.ps1 -RequireLauncherCandidate -RequireXMFinalDependency`
  - `scripts/validate-kerrigan-port.ps1 -RequireLauncherCandidate -RequireXMFinalDependency`
  - `scripts/validate-zeratul-port.ps1 -RequireLauncherCandidate -RequireXMFinalDependency`
- 本轮还顺手修正了 `scripts/validate-coop-commander-current.ps1` 的严格校验路径拼接错误，避免 `Join-Path` 把数组错误传给 `AdditionalChildPath`。
- 边界说明：本轮没有重新做实机进图/战斗回归，因此这里的“完成”含义是“当前源码、依赖、Launcher 候选、XMFinal 接线、关键运行时样本均已闭环”，不是“本轮已完成新的 live 战斗验收”。

## 证据来源

- 严格校验脚本：`scripts/validate-*-port.ps1`
- 运行时编队：`合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146.galaxy`
- 面板/命令卡：
  - `合作指挥官版起义狂潮/Mods/XM/XMAbathur.SC2Mod/Base.SC2Data/GameData/UnitData.xml`
  - `合作指挥官版起义狂潮/Mods/XM/XMAlarak.SC2Mod/Base.SC2Data/GameData/UnitData.xml`
  - `合作指挥官版起义狂潮/Mods/XM/XMKerrigan.SC2Mod/Base.SC2Data/GameData/UnitData.xml`
  - `合作指挥官版起义狂潮/Mods/XM/XMZeratul.SC2Mod/Base.SC2Data/GameData/commanders/futurecommanders.xml`
- 单位/建筑可读清单：
  - `docs/每日进度/2026-05-28-官方与Mod单位建筑技能人类可读对照/official-vs-mod-readable-units-buildings-hero-skills.md`
  - 注意：该对照稿部分章节存在数据源污染，本记录只引用了与当前指挥官一致、且已被 Catalog/命令卡交叉核对过的条目。

## Abathur

### 当前完成结论

- `CoopCasterAbathur` 已由 `XMFinal` 初始化并接入 Abathur 面板。
- 当前顶栏是精简版虫族全局面板，不是完整官方独立模板；现状仍以“2 键面板”运作。
- 运行时编队样本已闭环：
  - `light`: `RoachVile x2`, `RavagerAbathur x1`
  - `heavy`: `RoachVile x2`, `RavagerAbathur x1`, `SwarmHost x1`
  - `air`: `Mutalisk x2`, `Devourer x1`
  - `hero`: `RoachVile x2`, `RavagerAbathur x1`, `SwarmHost x1`, `QueenCoop x1`
  - `ultimate`: `Brutalisk x1`, 若解锁则追加 `HotSLeviathan x1`

### 兵种

- `GuardianMP` 守护者
- `DevourerMP` / `Devourer` 吞噬者
- `Mutalisk` 异龙
- `Roach` / `RoachCorpser` / `RoachVile` 蟑螂系
- `RavagerAbathur` 破坏者
- `SwarmHost` 虫群宿主
- `SwarmQueen` 虫后
- `Viper` 飞蛇
- `Brutalisk` 莽兽
- `Leviathan` 利维坦

### 建筑

- `SpineCrawler` 脊针爬虫
- `SporeCrawler` 孢子爬虫

### 面板

- 顶栏施法体：`CoopCasterAbathur`
- 当前可见按钮：
  - `SpawnToxicNest`：毒巢
  - `AbathurMend`：愈合
- 当前未把 Abathur 做成独立完整官方全局模板，面板维持这 2 个核心按钮。

## Alarak

### 当前完成结论

- `CoopCasterAlarak` 顶栏和 `AlarakCoop` 英雄命令卡都已存在且已接上 `XMFinal`。
- 运行时编队样本已闭环：
  - `light`: `Supplicant x3`, `Stalker x1`, `Monitor x1`
  - `heavy`: `Supplicant x2`, `Stalker x1`, `ImmortalTaldarim x1`, `HighTemplarTaldarim x1`
  - `air`: `Monitor x2`, `WarpPrismTaldarim x1`, `Stalker x1`
  - `hero`: `Supplicant x2`, `Stalker x1`, `Monitor x1`, `ImmortalTaldarim x1`, `HighTemplarTaldarim x1`

### 兵种

- `Supplicant` 死徒
- `Stalker` 追猎者
- `Monitor` 浩劫
- `HighTemplarTaldarim` 晋升者
- `ImmortalTaldarim` 无情先锋
- `WarpPrismTaldarim` 战争棱镜
- `ColossusTaldarim` 天罚行者

### 建筑

- `Gateway` 传送门
- `PhotonCannon` 光子炮台
- `TwilightCouncil` 光影议会

### 面板

- 顶栏施法体：`CoopCasterAlarak`
- 顶栏按钮：
  - `AlarakStructureOvercharge`：结构过载
  - `AlarakACSummonDeathfleetTarget`：死亡舰队
  - 另有等级/威望锁按钮：`AlarakDeathFleetLocked`、`CommanderPrestigeAlarakDeathFleetLocked`
- 英雄：`AlarakCoop`
- 英雄命令卡核心按钮：
  - `AlarakACDeadlyCharge`：致命冲锋
  - `AlarakKnockback`：毁灭波
  - `AlarakEmpower`：奴役强化 / Empower Me
  - `SoulAbsorption`：灵魂吸收被动
  - 等级/科技被动位：
    - `AlarakDestructionWaveDistance`
    - `AlarakLightningStrikes`
    - `AlarakAreaDamageUpgrade`
    - `AlarakAttackStun`

## Kerrigan

### 当前完成结论

- `K5Kerrigan` 英雄本体是当前唯一真值，当前静态链路没有再退回旧的 `Kerrigan` 壳。
- 当前不是“顶栏施法体为主”的指挥官，而是以英雄命令卡为主。
- 运行时编队样本已闭环：
  - `light`: `HotSRaptor x4`, `HydraliskLurker x2`
  - `heavy`: `HydraliskLurker x2`, `QueenCoop x1`, `Ultralisk x1`
  - `air`: `Mutalisk x2`, `MutaliskBroodlord x1`
  - `hero`: `K5Kerrigan x1`, `HotSRaptor x3`, `HydraliskLurker x2`, `QueenCoop x1`
  - `ultimate`: `Ultralisk x1`, `Mutalisk x2`

### 兵种

- `Zergling` 跳虫
- `Hydralisk` 刺蛇
- `SwarmQueen` 虫后
- `MutaliskBroodlord` 异龙系
- `BroodLord` 巢虫领主
- `Ultralisk` 雷兽

### 建筑

- `NydusNetwork` 虫道网络
- `SpineCrawler` 脊针爬虫
- `SporeCrawler` 孢子爬虫

### 面板

- 英雄：`K5Kerrigan`
- 英雄命令卡核心主动按钮：
  - `PrimalSlash`
  - `MindBolt`
  - `PsiStrikeWalk`
  - `PsionicLift`
  - `KerriganVoidCoopEconDrop`
  - `PrimalHeal`
  - `WildMutation`
  - `KerriganVoidCoopCrushingGripWave`
  - `SpawnBanelings`
  - `K5DropPods`
  - `Apocalypse`
- 已接入的被动/等级位：
  - `K5ZerglingRespawn`
  - `K5HeroicFortitude`
  - `K5Cooldowns`
  - `K5Fury`
  - `ChainReaction`
  - `CommanderKerriganKerriganEnergyRegeneration`
- `K5KerriganBurrowed` 保留了同系技能位，说明埋地/形态切换的命令卡没有断链。

## Zeratul

### 当前完成结论

- `CoopCasterZeratul` 顶栏、`ZeratulCoop` 英雄本体、以及 Zeratul 专属兵种/建筑链都已存在。
- 运行时编队样本已闭环：
  - `light`: `ZeratulSummonZealot x2`, `ZeratulStalker x2`, `ZeratulSentry x1`
  - `heavy`: `ZeratulStalker x2`, `ZeratulImmortal x1`, `ZeratulDisruptor x1`, `ZeratulSentry x1`
  - `air`: `ZeratulWarpPrism x1`, `ZeratulObserver x1`, `Observer x1`
  - `hero`: `ZeratulCoop x1`, `ZeratulStalker x2`, `ZeratulImmortal x1`, `ZeratulSentry x1`
  - `ultimate`: `ZeratulXelNagaConstruct x1`, `ZeratulXelNagaConstructCyan x1`

### 兵种

- `ZeratulSummonZealot` 狂热者
- `ZeratulStalker` 萨尔纳加伏击者
- `ZeratulSentry` 萨尔纳加光盾卫士
- `ZeratulImmortal` 萨尔纳加执行者
- `ZeratulDisruptor` 萨尔纳加禁绝者
- `ZeratulWarpPrism` 萨尔纳加虚空阵列船
- `ZeratulObserver` 萨尔纳加观察者
- `Observer` 侦测器

### 建筑

- `DarkShrine` 黑暗圣坛
- `Gateway` 传送门
- `PhotonCannon` 光子炮台
- `ZeratulRoboticsFacility` 折跃机械台

### 面板

- 顶栏施法体：`CoopCasterZeratul`
- 顶栏核心按钮：
  - `ZeratulTopBarWarpTrain`：召唤军团槽位，当前卡面对应 `Karass` / `Mohandar` / `Dark Archon`
  - `ZeratulMapWideStasisIssueOrder`：全图静滞
  - `ZeratulTopBarBuild`：凯达林巨石 / 顶栏建筑投放
  - `ZeratulTopBarUltimateWarpTrain`：终极神器能力 2 选 1
- 顶栏同时包含神器阶段/升级被动位：
  - `ZeratulArtifactUpgradeTier1B`
  - `ZeratulArtifactUpgradeTier2A`
  - `ZeratulArtifactUpgradeTier2B`
  - `ZeratulStructureBarrierChose`
  - `ZeratulArtifactUpgradeTier3A`
  - `ZeratulArtifactUpgradeTier3B`
- 英雄：`ZeratulCoop`
- 英雄命令卡核心按钮：
  - `ZeratulBlink`
  - `ZeratulTeleport` / `CommanderPrestigeZeratulVoidSeeker`
  - `ZeratulShadowCleave`
  - `ProphecyVision`
  - 被动位：`ZeratulShadowPhase`

## 现阶段可直接采用的口径

- 如果只问“这 4 个在当前 `合作指挥官版起义狂潮` 是否可以视为完成”，当前可以回答：可以，前提是把“完成”限定为“严格静态链路已闭环，且已有当前运行时编队与面板证据”。
- 如果后续要继续压到实机验收，优先顺序建议是：
  - `Kerrigan`
  - `Zeratul`
  - `Abathur`
  - `Alarak`
- 原因不是静态链路谁更差，而是 `K5Kerrigan` / `ZeratulCoop` 这两条线更依赖英雄本体、地图壳和专属能力在实机中的一致性。
