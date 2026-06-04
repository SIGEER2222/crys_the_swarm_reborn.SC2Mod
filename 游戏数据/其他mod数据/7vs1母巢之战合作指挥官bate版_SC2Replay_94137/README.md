# 7vs1母巢之战合作指挥官 bate 版 Replay 外部数据说明

## 来源

- 原始 replay：`C:\Users\22448\Documents\StarCraft II\Accounts\858003288\3-S2-1-7691928\Replays\Multiplayer\7vs1母巢之战合作指挥官bate版.SC2Replay`
- 本地落地目录：`游戏数据/其他mod数据/7vs1母巢之战合作指挥官bate版_SC2Replay_94137/`
- 解包工具：`tools/mpq/mpqeditor/x64/MPQEditor.exe`
- Replay 元数据：
  - 标题：`7vs1母巢之战合作指挥官bate版`
  - 游戏版本：`5.0.14.94137`
  - DataBuild：`94137`
  - BaseBuild：`Base94137`
  - 时长：`2445`

## 目录结构

```text
7vs1母巢之战合作指挥官bate版_SC2Replay_94137/
├── README.md
├── 全指挥官索引.md
├── replay_extract/
│   ├── source.SC2Replay
│   └── extract/
│       ├── replay.gamemetadata.json
│       ├── replay.server.battlelobby
│       ├── replay.details
│       ├── replay.game.events
│       └── ...
└── s2ma_packages/
    ├── pkg01/
    │   ├── pkg01.s2ma
    │   └── extract/
    ├── pkg02/
    │   ├── pkg02.s2ma
    │   └── extract/
    ├── pkg03/
    │   ├── pkg03.s2ma
    │   └── extract/
    └── ...
```

## `.s2ma` 是什么

`.s2ma` 是星际争霸 II 从 Battle.net 下载地图或 Mod 后保存在本机的缓存包。Replay 本身通常不携带完整地图和 Mod 内容，只记录依赖关系；如果本机 Battle.net 缓存仍存在，就能从 `replay.server.battlelobby` 里找到引用的 `.s2ma` 路径，并把这些包解出来。

这批 `.s2ma` 是 replay 引用到的 Battle.net 缓存包，不是当前仓库的可维护源码。可以用来对照 Catalog、Galaxy 触发、地图依赖和全体合作指挥官运行链路，但不建议整包复制进当前 `XMFinal`。

## 包概览

| 包 | 文件数 | 初步判断 | 重点 |
| --- | ---: | --- | --- |
| `pkg01` | 265 | 大型协作指挥官依赖数据包，类似 Allied Commanders / StarCoop 数据快照 | `base.sc2data/GameData/UserData.xml` 有 `PlayerCommanders` 静态数据；`LibCOMI*` 有大量 commander 运行/触发数据 |
| `pkg02` | 71 | 实际地图包：`7vs1母巢之战合作指挥官bate版` | 有 `DocumentInfo`、`DocumentHeader`、`MapInfo`、`MapScript.galaxy`；依赖 `Allied Commanders/0.0/74766` |
| `pkg03` | 58 | 扩展 Mod：`合作指挥官+单位0人口` | 价值最高；包含 18 个 commander 选择码、等级/精通/种族设置、全局面板、专属机制触发等运行时逻辑 |
| `pkg04` | 195 | 依赖数据包，未完全归类 | 可作为 Catalog/资源补充参考 |
| `pkg05` | 20 | 小型界面/本地化依赖包 | 有 `DocumentInfo`、`DocumentHeader`，偏 Allied Commanders 本地化/界面 |
| `pkg06` - `pkg14` | 0 | 未解出有效文件 | 当前无明显参考价值 |

## 全指挥官入口

具体索引见：`全指挥官索引.md`

当前已确认 `pkg03` 的选择表覆盖 18 个合作指挥官：

- `TerranRaynor`
- `ZergKerrigan`
- `ProtossArtanis`
- `ZergDehaka`
- `ProtossVorazun`
- `TerranSwann`
- `ZergZagara`
- `ProtossKarax`
- `ZergAbathur`
- `ProtossAlarak`
- `TerranNova`
- `ZergStukov`
- `ProtossFenix`
- `TerranHorner`
- `TerranTychus`
- `ProtossZeratul`
- `ZergStetmann`
- `TerranMengsk`

注意：`pkg01/extract/base.sc2data/GameData/UserData.xml` 的 `PlayerCommanders` 静态实例当前只直接看到 16 个，缺 `ZergStetmann` 和 `TerranMengsk` 的完整实例；但 `pkg03` 运行时代码明确支持这两个 ID，`pkg01` 的 `LibCOMI*` 里也有相关运行值和文本线索。因此这两个 commander 应按“运行时可见，静态 UserData 实例需另找闭包来源”处理。

## 当前最有价值的文件

### `pkg01` 协作指挥官依赖数据

- `s2ma_packages/pkg01/extract/base.sc2data/GameData/UserData.xml`
  - `CUser id="PlayerCommanders"` 是合作指挥官元数据入口
  - 可查 `Race`、`SpawnRace`、`CommanderData`、`GlobalCastUnit`、`HeroUnit`、`HeroStructure`、`DefaultUpgrades`、`Prestige`
- `s2ma_packages/pkg01/extract/base.sc2data/LibCOMI.SC2Lib`
  - 大量 commander 触发/运行值
  - 可补查 `ZergStetmann`、`TerranMengsk` 这类在 `GameData/UserData.xml` 中未见完整实例的线索
- `s2ma_packages/pkg01/extract/*/LocalizedData/GameStrings.txt`
  - 指挥官名称、说明、按钮/单位文本
  - `enus.sc2data` 适合先作为英文原始文本入口

### `pkg02` 地图包

- `s2ma_packages/pkg02/extract/DocumentInfo`
  - `ModType = Interface`
  - 依赖 `bnet:Allied Commanders/0.0/74766`
- `s2ma_packages/pkg02/extract/DocumentHeader`
  - 标题和说明确认这是用于加载合作指挥官 Mod 的 `7vs1母巢之战合作指挥官bate版`
  - 说明中提到已知问题：`雷诺光头没有技能`
- `s2ma_packages/pkg02/extract/MapScript.galaxy`
  - 可用于观察该地图如何挂载外部合作指挥官依赖

### `pkg03` 扩展 Mod

- `s2ma_packages/pkg03/extract/DocumentInfo`
  - `ModType = ExtensionMod`
  - 依赖：
    - `bnet:Void Multi (Mod)/0.0/999,file:Mods/VoidMulti.SC2Mod`
    - `bnet:Co-op Mission/0.0/999,file:Mods/StarCoop/StarCoop.SC2Mod`
- `s2ma_packages/pkg03/extract/Base.SC2Data/LibKPVP.galaxy`
  - 全体 commander 选择入口
  - `libKPVP_gf_set_commander_for_player` 会设置玩家 commander、等级、经验和出生种族
  - `GameAttributePlayerValue("[bnet:local/0.0/223536]1", player)` 对应 18 个 commander 选择码
- `s2ma_packages/pkg03/extract/Base.SC2Data/LibKCOR.galaxy`
  - commander 核心 API
  - 重点函数：
    - `libKCOR_gf_ActiveCommanderForPlayer`
    - `libKCOR_gf_CC_PlayerCommanderSet`
    - `libKCOR_gf_CC_CommanderGlobalCastUnitType`
    - `libKCOR_gf_CC_ApplyPrestigeTech`
    - `libKCOR_gf_CC_PlayerPrestigeEnable`
- `s2ma_packages/pkg03/extract/Base.SC2Data/LibKCUI.galaxy`
  - 全局面板 UI 分发
  - 明确覆盖 Protoss/Terran/Zerg 的多个 commander 面板初始化入口
- `s2ma_packages/pkg03/extract/Base.SC2Data/LibKMIS.galaxy`
  - 大量 commander 专属机制触发
  - 重点不是单个 commander，而是查各 commander 的 `CM_<Commander>` 触发初始化、全局施法单位、英雄/建筑事件、精通/威望机制

## 对当前 `XMFinal` 的参考价值

这批数据适合做全指挥官对照：

- commander 选择码如何映射到 `TerranRaynor`、`ZergKerrigan` 这类官方 `PlayerCommanders` ID
- `PlayerCommanders` 静态数据如何声明 `GlobalCastUnit`、英雄、英雄建筑、默认升级和威望
- 运行时如何按玩家设置 commander、等级、经验和种族
- 全局面板如何按 commander 分发到对应 `CU_GPInit*`
- commander 专属触发如何在 `LibKMIS` 里集中初始化和按需启用

这不是只服务某一个指挥官的数据源；后续应按全体 commander 建索引，再针对当前 `XMFinal` 缺口逐个比对。

## 使用边界

- 可以作为外部参考：
  - 全 commander 选择链路
  - `PlayerCommanders` / `GlobalCastUnit` 数据结构
  - `LibKCOR` 的 commander 核心 API
  - `LibKCUI` 的全局面板分发
  - `LibKMIS` 的 commander 专属触发组织方式
- 不应直接作为官方设计基准：
  - 本仓库官方事实源仍优先读取 `游戏数据/官方合作指挥官/commanders/<Commander>/`
  - 官方原始文本镜像仍优先读取 `游戏数据/官方SC2原始文本镜像/`
- 不应整包复制：
  - `pkg03` 的 `LibKMIS.galaxy` 超过百万字节，包含大量无关 PvP/StarCoop/commander 逻辑
  - 当前更合适的做法是按 commander、函数和数据点对照，局部补当前 `XMFinal` 缺失链路

## 后续建议

1. 先使用 `全指挥官索引.md` 做全 commander 数据和运行时入口对照。
2. 再按当前 `XMFinal` 已接入/未接入状态逐个 commander 建差异表。
3. 静态补齐后再进入地图测试；不要只凭 XML 或字符串命中声明某个 commander 已完成。
