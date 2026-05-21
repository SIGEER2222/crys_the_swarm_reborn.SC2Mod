# 合作指挥官版起义狂潮

这是一个 StarCraft II 项目包，不是单一 `.SC2Mod`。当前目录下同时包含地图、依赖 Mod 和启动地图。

项目路径：

```text
C:\Users\22448\Downloads\重生虫心0.71汉化版（新）\reborn_workrepo\合作指挥官版起义狂潮
```

## 顶层结构

```text
合作指挥官版起义狂潮/
├─ Maps/
│  └─ XM/
│     ├─ Launcher.SC2Map
│     ├─ traynor01.SC2Map
│     ├─ traynor02.SC2Map
│     ├─ traynor03.SC2Map
│     ├─ thanson01.SC2Map
│     ├─ thanson02.SC2Map
│     ├─ thanson03a.SC2Map
│     ├─ thanson03b.SC2Map
│     ├─ thorner01.SC2Map
│     ├─ thorner02.SC2Map
│     ├─ thorner03.SC2Map
│     ├─ thorner04.SC2Map
│     ├─ thorner05s.SC2Map
│     ├─ ttosh01.SC2Map
│     ├─ ttosh02.SC2Map
│     ├─ ttosh03a.SC2Map
│     ├─ ttosh03b.SC2Map
│     ├─ ttychus01.SC2Map
│     ├─ ttychus02.SC2Map
│     ├─ ttychus03.SC2Map
│     ├─ ttychus04.SC2Map
│     ├─ ttychus05.SC2Map
│     ├─ tvalerian01.SC2Map
│     ├─ tvalerian02a.SC2Map
│     ├─ tvalerian02b.SC2Map
│     ├─ tvalerian03.SC2Map
│     ├─ tzeratul01.SC2Map
│     ├─ tzeratul02.SC2Map
│     ├─ tzeratul03.SC2Map
│     └─ tzeratul04.SC2Map
└─ Mods/
   └─ XM/
      ├─ XMCore.SC2Mod
      ├─ XMFinal.SC2Mod
      ├─ XMMutator.SC2Mod
      ├─ XMNeut.SC2Mod
      ├─ XMShop.SC2Mod
      ├─ XMSCV.SC2Mod
      ├─ XMProbe.SC2Mod
      ├─ XMSwann.SC2Mod
      ├─ XMNova.SC2Mod
      ├─ XMMira.SC2Mod
      ├─ XMStukov.SC2Mod
      ├─ XMAlarak.SC2Mod
      ├─ XMMengsk.SC2Mod
      ├─ XMDehaka.SC2Mod
      └─ XMTychus.SC2Mod
```

## 主要组成

### `Maps/XM`

地图目录。这里包含起义狂潮各关卡地图和启动地图。

常见地图目录内容：

- `DocumentInfo`：地图文档信息。
- `MapInfo` / `MapInfo.version`：地图基本信息。
- `BankList.xml`：银行文件引用。
- `Objects`：地图内对象数据。
- `Preload.xml`：预加载资源。
- `Regions`：区域数据。
- `Triggers`：触发器数据。
- `MapScript.galaxy`：部分地图包含导出的 Galaxy 脚本。
- `Base.SC2Data/GameData`：部分地图自带局部数据覆盖。
- `zhCN.SC2Data/LocalizedData`：部分地图自带中文文本。
- `Minimap.tga`：小地图图像。
- `t3*` 文件：地形、高度、贴图、水体、路径等地图数据。

### `Mods/XM`

依赖 Mod 目录。这里放合作指挥官、商店、中立单位、突变因子、核心规则等共享数据。

从当前结构看，主要模块包括：

- `XMCore.SC2Mod`：核心公共数据。
- `XMFinal.SC2Mod`：最终整合或全局数据。
- `XMMutator.SC2Mod`：突变因子相关数据。
- `XMNeut.SC2Mod`：中立单位或公共中立资源。
- `XMShop.SC2Mod`：商店或购买系统相关数据。
- `XMSCV.SC2Mod` / `XMProbe.SC2Mod`：基础工人或建造相关数据。
- `XMSwann.SC2Mod`：斯旺相关数据。
- `XMNova.SC2Mod`：诺娃相关数据。
- `XMMira.SC2Mod`：米拉相关数据。
- `XMStukov.SC2Mod`：斯托科夫相关数据。
- `XMAlarak.SC2Mod`：阿拉纳克相关数据。
- `XMMengsk.SC2Mod`：蒙斯克相关数据。
- `XMDehaka.SC2Mod`：德哈卡相关数据。
- `XMTychus.SC2Mod`：泰凯斯相关数据。

每个 `.SC2Mod` 通常包含：

```text
Base.SC2Data/GameData/
zhCN.SC2Data/LocalizedData/
enUS.SC2Data/LocalizedData/
DocumentInfo
```

## 常见修改入口

### 改单位

优先看对应地图或 Mod 下的：

```text
Base.SC2Data/GameData/UnitData.xml
```

单位卡按钮、单位属性、武器、行为、技能挂载通常都在这里。

### 改技能

通常涉及：

```text
Base.SC2Data/GameData/AbilData.xml
Base.SC2Data/GameData/EffectData.xml
Base.SC2Data/GameData/BehaviorData.xml
```

### 改按钮和文本

通常涉及：

```text
Base.SC2Data/GameData/ButtonData.xml
zhCN.SC2Data/LocalizedData/GameStrings.txt
zhCN.SC2Data/LocalizedData/ObjectStrings.txt
enUS.SC2Data/LocalizedData/GameStrings.txt
enUS.SC2Data/LocalizedData/ObjectStrings.txt
```

### 改按钮显示条件或科技需求

通常涉及：

```text
Base.SC2Data/GameData/RequirementData.xml
Base.SC2Data/GameData/RequirementNodeData.xml
```

### 改表现、模型、声音

通常涉及：

```text
Base.SC2Data/GameData/ActorData.xml
Base.SC2Data/GameData/ModelData.xml
Base.SC2Data/GameData/SoundData.xml
```

### 改地图流程或任务逻辑

优先看具体 `.SC2Map` 下的：

```text
Triggers
MapScript.galaxy
Regions
Objects
```

## 项目特征

- 这是一个地图包 + 多个依赖 Mod 的组合项目。
- 地图集中在 `Maps/XM`。
- 指挥官和公共系统数据集中在 `Mods/XM`。
- 很多地图自身也带 `Base.SC2Data/GameData` 和本地化文本，说明它们可能存在地图级覆盖。
- 修改某个指挥官时，优先找对应 `XM*.SC2Mod`；修改某一关特殊逻辑时，优先找对应 `.SC2Map`。

## 注意事项

1. 修改共享系统前，先确认对象是在地图内定义，还是在 `Mods/XM` 的某个依赖 Mod 中定义。
2. 同名对象可能在地图和 Mod 中同时存在，地图级数据可能覆盖 Mod 数据。
3. 新增按钮、技能、行为时，要同步检查数据链：
   - 单位 `UnitData.xml`
   - 技能 `AbilData.xml`
   - 效果 `EffectData.xml`
   - 行为 `BehaviorData.xml`
   - 按钮 `ButtonData.xml`
   - 需求 `RequirementData.xml` / `RequirementNodeData.xml`
   - 文本 `GameStrings.txt` / `ObjectStrings.txt`
4. 修改中文文本优先看 `zhCN.SC2Data/LocalizedData`；需要英文兼容时同步 `enUS.SC2Data/LocalizedData`。
5. 如果要同步到游戏目录，应保持 `Maps/XM` 和 `Mods/XM` 的相对结构不变。
