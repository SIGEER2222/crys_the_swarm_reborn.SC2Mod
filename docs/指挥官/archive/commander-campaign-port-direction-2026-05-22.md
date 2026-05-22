# 指挥官移植方向复核（战役接入）

日期：2026-05-22

## 结论

当前大方向是对的，但要收紧成下面这个口径：

1. **不要把“合作模式阿巴瑟”直接塞进每一张战役地图。**
2. **也不要把别人的自定义合作 mod 当成来源。**
3. **正确做法是：**
   - 官方/可靠来源的数据放进独立 `SC2Mod`
   - 战役运行时接线放进一个统一的整合 mod
   - 各张战役地图只依赖这个整合 mod，并保留自己的 mission trigger / terrain / story logic

如果目标是“把指挥官和兵种加到战役里”，本质上不是“改地图本体数据”，而是：

- 用 **mod dependency** 承载指挥官的数据、单位、按钮、升级、UI、触发库
- 用 **map dependency + mission trigger hook** 把它接进具体战役流程

这比“每张图各自拷数据”稳定得多，也符合 SC2 Editor 的依赖模型。

## 为什么这个方向更对

外部资料对这一点基本一致：

- SC2 的 **mod** 本来就是用来把数据和地图拆开的；地图通过 **Dependencies** 使用 mod。  
  来源：SC2 Editor Tutorials《Mods》《Creating Mods》
- 标准战役资产本身也是通过 **dependency mod** 提供的；战役单位、战役按钮、语音、剧情资源都不在单一地图里。  
  来源：SC2 Editor Tutorials《Standard Dependencies》
- 社区经验也明确指出：**战役单位/战役资源要先加 campaign dependency，用户 mod 要通过 Add Other/Add Standard 接进地图。**  
  来源：HIVE《START HERE - The StarCraft II Editor FAQ!》

所以，从工程角度看：

- **对的**：`XMAbathur` 放指挥官数据，`XMFinal` 做战役运行时整合，地图依赖 `XMFinal`
- **不对的**：把阿巴瑟对象、按钮、升级、UI、逻辑分散复制到每张战役图里

## 在战役里加“指挥官/兵种”的正确架构

推荐分四层：

### 1. 标准依赖层

根据你要用的资源选标准依赖：

- `Liberty` / `Liberty Campaign`
- `Swarm` / `Swarm Campaign`
- `Void` / `Void Campaign`

如果你要的是合作/战役系虫族资源，通常不能只靠纯 melee 依赖，往往还要 campaign 依赖。

### 2. 指挥官数据层

每个指挥官单独一个数据 mod，例如：

- `XMAbathur.SC2Mod`

这里放：

- `UnitData`
- `AbilData`
- `ButtonData`
- `BehaviorData`
- `EffectData`
- `RequirementData`
- `UpgradeData`
- `ActorData`
- `ModelData`
- `SoundData`
- `GameStrings`

这层只负责“对象存在且闭环”。

### 3. 战役整合层

一个统一整合 mod，例如：

- `XMFinal.SC2Mod`

这里放：

- 指挥官选择后的 runtime 初始化
- 开局单位替换
- 面板施法者创建
- 生物质/终极进化/修复/毒巢等触发逻辑
- 与战役任务触发、Bank、地图 helper 的接线

这层负责“对象怎么在战役里活起来”。

### 4. 地图层

每张战役地图：

- 只依赖 `XMFinal.SC2Mod`
- 保留 mission-specific 逻辑
- 只在必要处做少量分支

例如：

- 开局给基地 / 无基地图给兵
- 运输机载具图给 cargo squad
- 特殊目标图给奖励兵种或替换分支

## 在 SC2 Editor 里实际怎么加

### A. 把指挥官 mod 接进战役图

在地图里：

1. `File -> Dependencies`
2. 如果是官方战役资源，先 `Add Standard`
3. 如果是你自己的 commander mod，选 `Add Other`
4. 把整合 mod 加进来

本项目对应的目标形态应该是：

- 地图依赖 `XMFinal.SC2Mod`
- `XMFinal.SC2Mod` 再依赖 `XMCore.SC2Mod`、`XMAbathur.SC2Mod` 和所需官方 campaign dependency

这样地图本身不需要直接认识阿巴瑟每一个对象。

### B. 把兵种加到战役里

有两种正路：

1. **数据驱动替换开局**
   - 在统一的 commander/userdata 表里记录：
     - `CommandCenter`
     - `Worker`
     - `SecondUnit`
   - mission init 时按 commander 读表创建

2. **地图辅助函数发兵**
   - 无基地图、运输图、奖励图不要每张硬写一遍
   - 用统一 helper，例如：
     - `CreateMapStartSquad(kind, player, point)`
     - `CreateCargoSquad(container, kind)`

这比在地图里手放一堆单位更适合做“指挥官化战役”。

### C. 把指挥官技能加到战役里

“技能存在”不等于“技能能在战役里用”。完整链路通常是：

1. `CoopCaster` / 全局施法者单位存在
2. 该单位挂了正确能力
3. 顶部面板模板能识别该 caster
4. 解锁升级/需求已经授予玩家
5. 技能效果对应的数据对象存在
6. 如果技能依赖 runtime 事件，则触发器已启用

也就是说：

- **按钮、图标、Tooltip 在数据层**
- **施法者创建、面板初始化、事件启用在整合层**

### D. 把“指挥官成长”加到战役里

战役化指挥官最稳的方式是：

- 用 `Bank` 或统一状态表记录 commander 选择和成长
- 进入 mission 后统一授予 upgrade / mastery 映射
- 地图只消费结果，不自己解释成长规则

## 对当前项目的建议

### 正确的部分

- `XMAbathur` 作为阿巴瑟数据模组：**方向正确**
- `XMFinal` 作为 runtime 唯一入口：**方向正确**
- 地图只依赖 `XMFinal`，不逐图直接依赖阿巴瑟子模组：**方向正确**

### 需要避免的部分

1. **不要把参考 mod 当来源**
   - 只能参考写法，不能复制对象、数值、素材、触发

2. **不要把 runtime 分散在 commander mod 和地图里**
   - 否则最容易出现双触发、断链、不同地图行为不一致

3. **不要把 mission-specific 逻辑和 commander 通用逻辑混写**
   - 通用逻辑进 `XMFinal`
   - 特殊地图只保留“何时调用 helper”

## 一个更稳的判断标准

如果一项改动符合下面三条，基本就在正确方向上：

1. **新增指挥官数据只改 mod，不必改几十张地图的数据对象**
2. **战役地图只需要加依赖和少量入口分支**
3. **同一指挥官的开局、面板、成长、战斗机制由统一 runtime 负责**

## 推荐落地顺序

1. 先把 **依赖链** 固定
2. 再把 **开局单位创建** 固定
3. 再把 **顶部面板 + 施法者** 固定
4. 再把 **成长映射到 upgrade/mastery** 固定
5. 最后补 **生物质 / 终极进化 / 特殊地图 helper**

如果这五步顺序反过来，很容易出现“对象都在，但进图像没移植”的假象。

## 结论性建议

一句话版：

> 方向应该是“官方数据进指挥官 mod，战役接线进统一整合 mod，地图只做依赖和入口”，而不是“把合作指挥官整个抄进每张战役图”。

这也是把“指挥官、兵种加到战役里”最稳、最可维护、最容易继续扩展到第二个指挥官的做法。

## 参考链接

- SC2 Editor Tutorials - Mods  
  https://s2editor-guides.readthedocs.io/New_Tutorials/01_Introduction/006_Mods/
- SC2 Editor Tutorials - Creating Mods  
  https://s2editor-guides.readthedocs.io/New_Tutorials/01_Introduction/007_Creating_Mods/
- SC2 Editor Tutorials - Standard Dependencies  
  https://s2editor-guides.readthedocs.io/New_Tutorials/01_Introduction/013_Standard_Dependencies/
- SC2 Editor Tutorials - Test A Mod Offline  
  https://s2editor-guides.readthedocs.io/New_Tutorials/07_Lessons/082_Test_a_Mod_Offline/
- HIVE - START HERE - The StarCraft II Editor FAQ!  
  https://www.hiveworkshop.com/threads/start-here-the-starcraft-ii-editor-faq.174665/
- Blizzard News - New Maps and Mods Tutorial: Data Module  
  https://news.blizzard.com/en-us/article/4121678/new-maps-and-mods-tutorial-data-module

补充说明：

- 关于“地图也是依赖链最上层覆盖”的描述，我参考了 GameDev StackExchange 上对 SC2 元数据加载模型的解释；它不是官方文档，但和 Editor 的依赖覆盖行为相符。  
  https://gamedev.stackexchange.com/questions/25806/how-does-starcraft-2-load-its-metadata
