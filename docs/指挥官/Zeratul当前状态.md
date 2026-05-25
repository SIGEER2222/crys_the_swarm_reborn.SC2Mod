# Zeratul 当前状态

日期：2026-05-24

## 已完成

### 独立模组
- XMZeratul.SC2Mod 已创建，位于 `合作指挥官版起义狂潮/Mods/XM/XMZeratul.SC2Mod`。
- DocumentInfo 声明依赖 `XMCore.SC2Mod`。
- 包含标准的 Base.SC2Data/GameData XML 文件结构
- 包含 zhCN.SC2Data/LocalizedData 目录（已填充 100+ 条本地化字符串）

### XMCore 指挥官数据
- XMCore.SC2Mod/Base.SC2Data/GameData/UserData.xml 中 `<Instances Id="Zeratul">` 已完整定义。
- 包含完整的 TitU、TitP、DesU、DesP、Upg、Poi 配置。

### XMFinal 运行时
- `XMFinal.SC2Mod/DocumentInfo` 已包含对 XMZeratul.SC2Mod 的依赖。
- Galaxy 脚本已实现：
  - `libE0EAE146_gf_ApplyZeratulCommanderRuntime()`
  - `libE0EAE146_gf_ZeratulCreateMapStartSquad()`
  - 地图启动分支、皮肤配置、控制台等已完整。

### Launcher 候选
- LauncherAuto.SC2Map 中已有：
  - 指挥官列表包含 Zeratul
  - 头像配置已设置
  - UI 配置已就绪。

### 中文本地化
- zhCN.SC2Data/LocalizedData/GameStrings.txt 已填充 Zeratul 相关本地化字符串（100+ 条）
- 包括所有技能名称（虚空寻觅者号、灵能漩涡、虚空抑制等）、按钮提示、行为描述等

### 游戏数据
- UnitData.xml 已填充，包含以下核心单位：
  - Zeratul（指挥官单位）
  - MutatorAmonZeratul（突变因子版本）
  - Oracle（先知）
  - OracleStasisTrap（先知力场陷阱）
  - CarrierTaldarim（塔达林航母）
  - ColossusTaldarim（塔达林巨像）
  - DarkTemplarTaldarim（塔达林黑暗圣堂武士）
  - HighTemplarTaldarim（塔达林高阶圣堂武士）
  - ImmortalTaldarim（塔达林不朽者）
  - SentryTaldarim（塔达林机械哨兵）
  - VoidRayTaldarim（塔达林虚空辉光舰）
  - WarpPrismTaldarim（塔达林折跃棱镜）
  - ZealotTaldarim（塔达林狂热者）
  - StalkerTaldarim（塔达林追猎者）
  - ObserverTaldarim（塔达林观测者）
  - PhotonCannonTaldarim（塔达林光子炮台）
  - PylonTaldarim（塔达林水晶塔）
  - GatewayTaldarim（塔达林传送门）
  - CyberneticsCoreTaldarim（塔达林机械台）
  - RoboticsFacilityTaldarim（塔达林机械研究所）
  - StargateTaldarim（塔达林星门）
  - NexusTaldarim（塔达林枢纽）

### 泽拉图兵种接线
- 已将 `XMZeratul.SC2Mod/Base.SC2Data/GameData/UnitData.xml` 中错误混入的 Alarak / Vorazun / Fenix 卡面替换为泽拉图卡面。
- 已补充 `Probe` 的泽拉图建筑折跃入口：传送门、控制芯核、光子炮台、黑暗圣堂、机械台科技建筑、机械台。
- 已将 `Gateway` / `WarpGate` 接到 `ZeratulGatewayTrain`。
- 已将 `RoboticsFacility` / `RoboticsFacilityWarp` 接到 `ZeratulRoboticsFacilityTrain`。
- 已在 `GameStrings.txt` 中补齐 wiki 对应的 6 个泽拉图兵种中文名：
  - 萨尔纳加伏击者
  - 萨尔纳加光盾卫士
  - 萨尔纳加执行者
  - 萨尔纳加观察者
  - 萨尔纳加禁绝者
  - 萨尔纳加虚空阵列船

### 泽拉图英雄 / 顶部技能条 / 复活建筑
- 已在 `XMZeratul.SC2Mod/Base.SC2Data/GameData/UnitData.xml` 补入运行时实际会创建的 3 个关键单位：
  - `CoopCasterZeratul`：顶部技能条载体
  - `ZeratulCoop`：实际英雄本体
  - `ZeratulCoopReviveBeacon`：英雄复活建筑
- `XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146.galaxy` 的运行时逻辑实际创建的是 `CoopCasterZeratul` 和 `ZeratulCoop`，不是本地那个空壳 `Zeratul`。
- 顶栏按钮、英雄技能按钮、复活按钮依赖的能力对象继续沿用前置 `XMRaynor.SC2Mod` 已存在的数据；`XMZeratul` 这里补的是本地覆盖层缺失的单位外壳和卡面入口。
- 已补本地化：
  - `Unit/Name/ZeratulCoop=泽拉图`
  - `Unit/Name/ZeratulCoopReviveBeacon=泽拉图复活信标`

### 泽拉图战役图依赖修正
- 已将 `tzeratul02.SC2Map`、`tzeratul03.SC2Map`、`tzeratul04.SC2Map` 的 `DocumentInfo` 依赖从仅 `XMFinal + XMAlarak` 改为：
  - `XMFinal.SC2Mod`
  - `XMAlarak.SC2Mod`
  - `XMZeratul.SC2Mod`
- 关键点不是删掉 `XMAlarak`，而是让 `XMZeratul` 作为最后加载的覆盖层生效。
- 这一步直接修复“游戏里出现的是阿拉纳克/普通星灵单位，而不是泽拉图单位”的问题来源。

### 通用战役图依赖修正
- 用户后续实测的并不是 `tzeratul02/03/04`，而是 `欢迎来到丛林`，对应 `ttosh02.SC2Map`。
- 继续排查后发现问题不只在泽拉图专属战役图，而是在一批通用战役图里，`DocumentInfo` 仍然只加载：
  - `XMFinal.SC2Mod`
  - `XMAlarak.SC2Mod`
- 这些图虽然运行时会按 `CampaignXCore.SC2Bank` 里的 `Ach/Commander` 进入不同指挥官分支，但如果压根没加载 `XMZeratul.SC2Mod`，那么：
  - 泽拉图的建筑卡面不会覆盖进来
  - 泽拉图的训练入口不会覆盖进来
  - 泽拉图英雄 / 顶栏载体 / 复活建筑的本地外壳也不会参与加载
- 已把下列通用战役图统一补上 `XMZeratul.SC2Mod` 依赖，且保持在 `XMAlarak` 之后：
  - `thanson01/02/03a/03b`
  - `thorner01/02/03/04/05s`
  - `traynor01/02/03`
  - `ttosh01/02/03a/03b`
  - `ttychus01/02/03/04/05`
  - `tvalerian01/02a/02b/03`
- 这一步是为了解决用户在 `ttosh02` 这类非泽拉图专属任务图里测试时，顶部技能、建筑、兵种、英雄都仍然不是泽拉图的问题。

### 地图脚本 / 对象层接线
- `tzeratul04.SC2Map/MapScript.galaxy` 里确实有指挥官特化逻辑，不是纯静态剧情图：
  - `Zeratul` 入口直接创建 `ZeratulCoop`
  - 产线和剧情刷兵会按单位名分支
- 已把 `XMFinal` 的泽拉图 runtime 面板按钮显式放行：
  - `ZeratulTopBarWarpTrain`
  - `ZeratulMapWideStasisIssueOrder`
  - `ZeratulTopBarUltimateWarpTrain`
  - `ZeratulTopBarBuild`
- 已把 `tzeratul04.SC2Map/MapScript.galaxy` 里旧的 `Zealot / Stalker / Immortal / HighTemplar / Colossus` 生成点替成泽拉图单位：
  - `ZeratulSummonZealot`
  - `ZeratulStalker`
  - `ZeratulImmortal`
  - `ZeratulSummonKarass`
  - `ZeratulDisruptor`
- 已把 `tzeratul03.SC2Map/Objects` 里可确认的泽拉图侧预摆单位替换为泽拉图对象，包含：
  - `Observer` -> `ZeratulObserver`
  - `WarpPrism` -> `ZeratulWarpPrism`
  - `Gateway` -> `ZeratulGateway`
  - `RoboticsFacility` -> `ZeratulRoboticsFacility`
  - `CyberneticsCore` -> `ZeratulCyberneticsCore`
  - `DarkShrine` -> `ZeratulDarkShrine`
  - `StalkerShakuras / ZealotShakuras / ImmortalShakuras / DarkTemplar` -> 对应泽拉图兵种
- 像 `Pylon / PhotonCannon / ShieldBattery / Stargate / Forge / Nexus` 这类建筑在本地没有明确的泽拉图等价单位名，所以暂时保留地图原值，不硬替。

### 地图初始化入口修正
- 已在以下三张泽拉图战役图的 `gt_Initialization_Func` 入口，补上启动前强制写入：
  - `BankLoad("CampaignXCore", 1)`
  - `BankValueSetFromString(BankLastCreated(), "Ach", "Commander", "Zeratul")`
  - `BankSave(BankLastCreated())`
- 具体文件：
  - `合作指挥官版起义狂潮/Maps/XM/tzeratul02.SC2Map/MapScript.galaxy`
  - `合作指挥官版起义狂潮/Maps/XM/tzeratul03.SC2Map/MapScript.galaxy`
  - `合作指挥官版起义狂潮/Maps/XM/tzeratul04.SC2Map/MapScript.galaxy`
- 这样做的原因是：用户实测“顶部技能、建筑、兵种、英雄泽拉图，都没有”，这已经超出单纯单位卡面缺失的范围，更像是 `XMFinal` 启动时根本没有读到 `Commander = Zeratul`。
- `XMFinal` 的运行时、开局模板、技能面板、英雄创建全部依赖 `CampaignXCore.SC2Bank` 里的 `Ach/Commander`。如果这里不是 `Zeratul`，那么：
  - 顶栏不会进入 `ApplyZeratulCommanderRuntime()`
  - `InitializeBase()` 不会创建 `CoopCasterZeratul`
  - 不会创建 `ZeratulCoop`
  - 开局建筑、探机、第二单位和编队也会按别的指挥官模板走
- 因此这次修复把“泽拉图战役图必须以泽拉图身份启动”固定到了地图初始化入口，而不是继续依赖 launcher 或旧 bank 恰好写对。

### 欢迎来到丛林 实测修正
- 用户实测的核心问题图是 `合作指挥官版起义狂潮/Maps/XM/ttosh02.SC2Map`（欢迎来到丛林）。
- 这张图虽然已经：
  - 加载了 `XMFinal.SC2Mod`
  - 已补上 `XMZeratul.SC2Mod`
  - 在 `MapScript.galaxy` 中调用了 `libE0EAE146_gf_Initialize(false)` 与 `libE0EAE146_gf_InitializeBase(...)`
- 但实机检查 `CampaignXCore.SC2Bank` 时，`Ach/Commander` 当前仍然是 `Stetmann`，不是 `Zeratul`。
- 这说明 `ttosh02` 的问题已经不是“泽拉图单位覆盖层没接进去”，而是地图启动时吃到的指挥官身份本身就不是泽拉图。
- 已对 `ttosh02.SC2Map/MapScript.galaxy` 做与 `tzeratul02/03/04` 同类处理：
  - 在 `gt_Initialization_Func` 中，先写 `Ach/Commander = Zeratul`
  - 再执行 `libE0EAE146_gf_Initialize(false)`
- 同时补上了 `ttosh02.SC2Map/DocumentInfo` 的显式依赖顺序：
  - `XMFinal.SC2Mod`
  - `XMZeratul.SC2Mod`
- 这样 `欢迎来到丛林` 进入图时会强制走泽拉图分支，不再依赖 launcher 当前 bank 恰好写对。

### 顶部技能条能力缺口修正
- 后续根据实机 `ScriptError.txt` 继续定位，发现问题不再是 bank 或地图依赖，而是运行时直接报：
  - `Invalid ability id specified: 'ZeratulTopBarWarpTrain'`
  - `Invalid ability id specified: 'ZeratulMapWideStasisIssueOrder'`
  - `Invalid ability id specified: 'ZeratulTopBarUltimateWarpTrain'`
  - `Invalid ability id specified: 'ZeratulTopBarBuild'`
- 报错位置来自 `XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146.galaxy` 中的 `TechTreeAbilityAllow(...)`，说明：
  - `XMFinal` 的泽拉图运行时分支已经在执行
  - 地图初始化和 `Commander = Zeratul` 已经生效
  - 真正缺的是 `XMZeratul` 覆盖层里这 4 个顶部技能条能力对象
- 已在 `XMZeratul.SC2Mod/Base.SC2Data/GameData/AbilData.xml` 补入：
  - `ZeratulTopBarWarpTrain`
  - `ZeratulMapWideStasisIssueOrder`
  - `ZeratulTopBarUltimateWarpTrain`
  - `ZeratulTopBarBuild`
- 这些能力定义按官方 `starcoop` 导出的 `futurecommanders.xml` 对照后，采用最小补丁方式手工接入，没有再次整包覆盖 `UnitData.xml`。
- 这样做的原因是：
  - `XMZeratul` 本地已经有用户需要的建筑卡面、兵种入口、英雄壳、复活建筑壳
  - 整包重导会把这些本地接线重新冲回官方原值
  - 当前最小修复目标是先消除 `invalid ability id`，让顶部技能条能够被 `XMFinal` 正常放行和创建

## 对比方式

本次不是从别的模组整包复制单位，而是按下面三层对比后只修本地接线：

1. wiki 基准清单
- 对比文件：`docs/维基指挥官/兵种/泽拉图 Zeratul/units.json`
- 作用：确定泽拉图当前应该具备的标准兵种集合。

2. 运行时真实来源
- 对比文件：`合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/commanders/futurecommanders.xml`
- 作用：确认运行时已经存在的泽拉图对象、训练能力和需求对象，例如：
  - `ZeratulBuild`
  - `ZeratulGatewayTrain`
  - `ZeratulRoboticsFacilityTrain`
  - `ZeratulGateway`
  - `ZeratulRoboticsFacility`

3. 本地指挥官覆盖层
- 对比文件：`合作指挥官版起义狂潮/Mods/XM/XMZeratul.SC2Mod/Base.SC2Data/GameData/UnitData.xml`
- 作用：检查本地是否把建筑卡面、训练入口、英雄本体、顶栏载体、复活建筑真正接到泽拉图对象。
- 结论：问题分两层：
  - 兵种层：`XMZeratul` 仍在使用错误的混合卡面和训练链接，导致游戏里出来的不是泽拉图兵种。
  - 英雄层：`XMZeratul` 缺少 `CoopCasterZeratul`、`ZeratulCoop`、`ZeratulCoopReviveBeacon` 这 3 个运行时关键单位外壳，导致英雄、技能面板、复活建筑没有本地接入。

3.1. 顶栏能力对象补对比
- 对比文件：
  - `合作指挥官版起义狂潮/Mods/XM/XMZeratul.SC2Mod/Base.SC2Data/GameData/AbilData.xml`
  - `references/official-casc-export/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/commanders/futurecommanders.xml`
  - `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146.galaxy`
- 作用：
  - 先看 `XMFinal` 运行时究竟要放行哪些 ability id
  - 再看 `XMZeratul` 本地覆盖层是否真的定义了这些 ability id
  - 最后用官方导出的 `futurecommanders.xml` 补齐缺失能力本体
- 结论：
  - `XMFinal` 已明确调用 4 个泽拉图顶部能力 id
  - `XMZeratul` 原先的 `UnitData.xml` 已经引用这些 id，但 `AbilData.xml` 里并没有对应定义
  - 所以运行时不是“按钮没显示”，而是初始化期就因为 `ability id` 无效直接报错
  - 修复方式是只把这 4 个能力对象补入 `XMZeratul/AbilData.xml`，不再整包重导 `UnitData.xml`

4. 地图实际加载链
- 对比文件：
  - `合作指挥官版起义狂潮/Maps/XM/tzeratul02.SC2Map/DocumentInfo`
  - `合作指挥官版起义狂潮/Maps/XM/tzeratul03.SC2Map/DocumentInfo`
  - `合作指挥官版起义狂潮/Maps/XM/tzeratul04.SC2Map/DocumentInfo`
  - `合作指挥官版起义狂潮/Maps/XM/ttosh02.SC2Map/DocumentInfo`
- 作用：确认实机进入的泽拉图地图到底加载了哪些指挥官模组，以及覆盖顺序是什么。
- 结论：
  - 之前三张图只加载了 `XMFinal.SC2Mod` 和 `XMAlarak.SC2Mod`，根本没有把 `XMZeratul.SC2Mod` 接进来。
  - `ttosh02` 以及同批通用战役图也存在同样问题，不是只有泽拉图专属三图漏依赖。
  - 因此即使 `XMZeratul` 内部单位、英雄、技能条已经补了，地图运行时也不会吃到这些覆盖。
  - 修复方式是把 `XMZeratul.SC2Mod` 追加到依赖尾部，让泽拉图覆盖层最后生效。

5. 地图初始化 / bank 身份链
- 对比文件：
  - `合作指挥官版起义狂潮/Maps/XM/LauncherAuto.SC2Map/MapScript.galaxy`
  - `合作指挥官版起义狂潮/Maps/XM/ttosh02.SC2Map/MapScript.galaxy`
  - `合作指挥官版起义狂潮/Maps/XM/tzeratul02.SC2Map/MapScript.galaxy`
  - `合作指挥官版起义狂潮/Maps/XM/tzeratul03.SC2Map/MapScript.galaxy`
  - `合作指挥官版起义狂潮/Maps/XM/tzeratul04.SC2Map/MapScript.galaxy`
  - `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146.galaxy`
- 作用：确认地图真正进入 `XMFinal` 前，`CampaignXCore.SC2Bank` 的 `Ach/Commander` 是谁。
- 结论：
  - `LauncherAuto` 的确会把 `gv_commander` 写入 `Ach/Commander`。
  - 当前用户实测这条链在 `ttosh02` 上落地后，bank 实际值仍是 `Stetmann`，不是 `Zeratul`。
  - `XMFinal` 又把几乎所有开局接线都挂在这个 bank 值上，所以只要这里偏了，玩家看到的就会是“顶部技能、建筑、兵种、英雄全都不是泽拉图”。
  - 修复方式不是继续堆单位定义，而是在实际测试图的地图初始化里先把 `Ach/Commander` 锁成 `Zeratul`，再执行 `libE0EAE146_gf_Initialize(false)`。
  - 当前已覆盖：
    - `tzeratul02/03/04`
    - `ttosh02`
  - `ttosh02` 还额外显式把 `XMZeratul.SC2Mod` 放到了 `XMFinal` 后面，避免依赖传递不稳定。

## 当前结论

- `XMFinal` 的依赖链已经会先加载 `XMRaynor`，再加载 `XMZeratul`，因此泽拉图的真实单位/能力对象运行时已可用。
- 兵种侧已修到 `XMZeratul` 的建筑卡面与训练入口覆盖。
- 英雄侧已把 `XMFinal` 运行时明确创建的三个关键单位壳补回 `XMZeratul`，因此英雄本体、顶部技能条、复活建筑都具备了本地接入点。
- 地图侧已把 `tzeratul02/03/04` 的实际加载链补上 `XMZeratul.SC2Mod`，因此实机将不再只落到 `XMAlarak` 的覆盖结果。
- 通用战役图侧也已把 `ttosh02` 等一整批 `XMFinal + XMAlarak` 地图补上 `XMZeratul.SC2Mod`，因此泽拉图不再只在专属战役图里可见。
- 地图初始化侧已把 `tzeratul02/03/04` 与当前实测图 `ttosh02` 在进入 `XMFinal.Initialize(false)` 前先强制写 `Ach/Commander = Zeratul`，因此 `XMFinal` 的顶栏、开局模板、英雄创建会稳定走泽拉图分支。
- `ttosh02` 的最新硬错误已进一步缩小到顶部技能条能力对象缺失；当前已把 `ZeratulTopBarWarpTrain / ZeratulMapWideStasisIssueOrder / ZeratulTopBarUltimateWarpTrain / ZeratulTopBarBuild` 手工补进 `XMZeratul.AbilData.xml`，并同步到 live 目录。
- `MapScript.galaxy` 的确是分地图承载指挥官逻辑的，阿拉纳克 / 泽拉图都不只是“换一个 mod 依赖”就能完全正确。
- 本次仍然没有把整套泽拉图能力/效果/按钮对象从 `XMRaynor` 重复复制到 `XMZeratul`，因为这些对象已由依赖链前置提供；这里只补本地覆盖层缺失部分，避免重复定义。

## 待完成（可选）

### 扩展游戏数据
- UpgradeData.xml、AbilData.xml、BehaviorData.xml 等目前为空
- 这些文件用于扩展或覆盖基础游戏数据，当前为空不影响基本功能
- 如需完整功能，可以从官方数据或相似指挥官模组（如 XMArtanis）中提取并填充

## 验证状态

- ✅ 静态结构完整
- ✅ 核心游戏数据已导入（UnitData.xml，包含 22 个单位定义）
- ✅ 本地化文本已填充（100+ 条）
- ✅ 泽拉图兵种训练入口已切到泽拉图能力
- ✅ 泽拉图英雄本体 / 顶栏载体 / 复活建筑已补入本地覆盖层
- ✅ 泽拉图战役图的初始化入口已强制锁定 `Commander = Zeratul`
- ✅ 通用战役图里原先遗漏 `XMZeratul.SC2Mod` 的地图已整批补齐依赖
- ✅ `tzeratul04` 的指挥官生成脚本已切回泽拉图单位名
- ✅ `tzeratul03` 的预摆单位已替成可确认的泽拉图单位
