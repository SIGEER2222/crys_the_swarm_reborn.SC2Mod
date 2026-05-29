# 诺娃 / Nova 建筑单位对比

- 当前 active Mod：`D:\MyWork\新建文件夹\mom.report.client\src\MyMod\crys_the_swarm_reborn.SC2Mod\合作指挥官版起义狂潮`
- 指挥官模块：`XMNova.SC2Mod`（存在：是）
- Wiki主要部队文件：`wikitext/11-nova.wiki`
- Wiki主要部队：精英陆战队员、劫掠者突击手、特战幽灵、恶蝠游骑兵、强击歌利亚、重型攻城坦克、掠袭解放者、隐秘女妖、铁鸦II型、磁轨炮塔、导弹塔
- 判定口径：wiki用于中文主要部队名单；官方JSON用于ID、生产链、生命/人口/费用；active Mod只检查`合作指挥官版起义狂潮`的本指挥官模块加`XMCore/XMFinal`。

## 汇总

| Wiki项 | 官方行 | Wiki未匹配官方 | 官方补充未在Wiki | 当前Mod未命中 | 仅文本命中 | 生产链异常 |
| --- | --- | --- | --- | --- | --- | --- |
| 11 | 16 | 0 | 5 | 0 | 7 | 2 |

## 三方对照

| Wiki项 | 匹配 | 分类 | 官方名称 | ID | 当前Mod | 生产链状态 | 生产/建造/变形 | 数值 | 定义文件 | 备注 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 精英陆战队员 | 疑似别名 | 单位 | 部署精英陆战队员 | Marine_BlackOps | CUnit已定义：Marine_BlackOps | 生产链已命中 | Barracks / BarracksTrainNova / 600晶体矿，300秒 | 生命150，人口1，视野10；600晶体矿，300秒 | Mods/XM/XMNova.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 劫掠者突击手 | 疑似别名 | 单位 | 部署劫掠者突击手 | Marauder_BlackOps | CUnit已定义：Marauder_BlackOps | 生产链已命中 | Barracks / BarracksTrainNova / 500晶体矿，130瓦斯，300秒 | 生命350，人口2，视野8；500晶体矿，130瓦斯，300秒 | Mods/XM/XMNova.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 特战幽灵 | 疑似别名 | 单位 | 幽灵 | GhostNova | 仅文本/引用命中：GhostNova | 生产链已命中 | Barracks / BarracksTrainNova / 1000晶体矿，500瓦斯，300秒 | 生命125，人口2，视野11；1000晶体矿，500瓦斯，300秒 |  |  |
| 恶蝠游骑兵 | 疑似别名 | 单位 | 部署恶蝠游骑兵 | HellbatBlackOps | CUnit已定义：HellbatBlackOps | 生产链已命中 | Factory / FactoryTrainNova / 500晶体矿，300秒 | 生命550，人口2，视野10；500晶体矿，300秒 | Mods/XM/XMNova.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 强击歌利亚 | 疑似别名 | 单位 | 部署强击歌利亚 | Goliath_BlackOps | CUnit已定义：Goliath_BlackOps | 生产链已命中 | Factory / FactoryTrainNova / 750晶体矿，250瓦斯，300秒 | 生命450，人口3，视野9；750晶体矿，250瓦斯，300秒 | Mods/XM/XMNova.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 重型攻城坦克 | 疑似别名 | 单位 | 部署重型攻城坦克 | SiegeTank_BlackOps | CUnit已定义：SiegeTank_BlackOps | 生产链已命中 | Factory / FactoryTrainNova / 800晶体矿，600瓦斯，300秒 | 生命400，人口3，视野11；800晶体矿，600瓦斯，300秒 | Mods/XM/XMNova.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 掠袭解放者 | 疑似别名 | 单位 | 部署掠袭解放者 | Liberator_BlackOps | CUnit已定义：Liberator_BlackOps | 生产链已命中 | Starport / StarportTrainNova / 750晶体矿，750瓦斯，300秒 | 生命450，人口3，视野10；750晶体矿，750瓦斯，300秒 | Mods/XM/XMNova.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 隐秘女妖 | 疑似别名 | 单位 | 部署隐秘女妖 | Banshee_BlackOps | CUnit已定义：Banshee_BlackOps | 生产链已命中 | Starport / StarportTrainNova / 700晶体矿，375瓦斯，300秒 | 生命350，人口3，视野10；700晶体矿，375瓦斯，300秒 | Mods/XM/XMNova.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 铁鸦II型 | 疑似别名 | 单位 | 部署铁鸦II型 | Raven_BlackOps | CUnit已定义：Raven_BlackOps | 生产链已命中 | Starport / StarportTrainNova / 100晶体矿，200瓦斯，300秒 | 生命350，人口2，视野11；100晶体矿，200瓦斯，300秒 | Mods/XM/XMNova.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 磁轨炮塔 | 别名匹配 | 建筑 | 自动机炮 | AutoTurret | 仅文本/引用命中：AutoTurret | 技能缺失 TerranBuildFullRefund | SCV / TerranBuildFullRefund / 50晶体矿，25秒 | 生命100，视野7；50晶体矿，25秒 |  |  |
| 导弹塔 | 精确匹配 | 建筑 | 导弹塔 | MissileTurret | 仅文本/引用命中：MissileTurret | 生产链已命中 | SCV / TerranBuild / 100晶体矿，25秒 | 生命250，视野11；100晶体矿，25秒 |  |  |
|  | 官方补充 | 单位 | 死神之首 | MercReaper | 仅文本/引用命中：MercReaper | 官方JSON无生产链 |  |  |  | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 单位 | SCV | SCV | 仅文本/引用命中：SCV | 技能缺失 CommandCenterTrain | CommandCenter / CommandCenterTrain / 50晶体矿，17秒 | 生命45，人口1，视野8；50晶体矿，17秒 |  | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 兵营 | Barracks | 仅文本/引用命中：Barracks | 生产链已命中 | SCV / TerranBuild / 150晶体矿，65秒 | 生命1000，视野9；150晶体矿，65秒 |  | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 幽灵军校 | GhostAcademyNova | CUnit已定义：GhostAcademyNova | 生产链已命中 | SCV / TerranBuild / 150晶体矿，50瓦斯，40秒 | 生命1250，视野9；150晶体矿，50瓦斯，40秒 | Mods/XM/XMNova.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 指挥中心 | CommandCenter | 仅文本/引用命中：CommandCenter | 生产链已命中 | SCV / TerranBuild / 400晶体矿，100秒 | 生命1500，视野11；400晶体矿，100秒 |  | 官方JSON有，wiki主要部队未列。 |

## 优先排查项

| Wiki项 | 匹配 | 分类 | 官方名称 | ID | 当前Mod | 生产链状态 | 生产/建造/变形 | 数值 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 特战幽灵 | 疑似别名 | 单位 | 幽灵 | GhostNova | 仅文本/引用命中：GhostNova | 生产链已命中 | Barracks / BarracksTrainNova / 1000晶体矿，500瓦斯，300秒 | 生命125，人口2，视野11；1000晶体矿，500瓦斯，300秒 |
| 磁轨炮塔 | 别名匹配 | 建筑 | 自动机炮 | AutoTurret | 仅文本/引用命中：AutoTurret | 技能缺失 TerranBuildFullRefund | SCV / TerranBuildFullRefund / 50晶体矿，25秒 | 生命100，视野7；50晶体矿，25秒 |
| 导弹塔 | 精确匹配 | 建筑 | 导弹塔 | MissileTurret | 仅文本/引用命中：MissileTurret | 生产链已命中 | SCV / TerranBuild / 100晶体矿，25秒 | 生命250，视野11；100晶体矿，25秒 |
|  | 官方补充 | 单位 | 死神之首 | MercReaper | 仅文本/引用命中：MercReaper | 官方JSON无生产链 |  |  |
|  | 官方补充 | 单位 | SCV | SCV | 仅文本/引用命中：SCV | 技能缺失 CommandCenterTrain | CommandCenter / CommandCenterTrain / 50晶体矿，17秒 | 生命45，人口1，视野8；50晶体矿，17秒 |
|  | 官方补充 | 建筑 | 兵营 | Barracks | 仅文本/引用命中：Barracks | 生产链已命中 | SCV / TerranBuild / 150晶体矿，65秒 | 生命1000，视野9；150晶体矿，65秒 |
|  | 官方补充 | 建筑 | 指挥中心 | CommandCenter | 仅文本/引用命中：CommandCenter | 生产链已命中 | SCV / TerranBuild / 400晶体矿，100秒 | 生命1500，视野11；400晶体矿，100秒 |

## Wiki未匹配官方JSON

- 无。

## 官方有但Wiki主要部队未列

| 分类 | 官方名称 | ID | 当前Mod | 生产链 | 数值 |
| --- | --- | --- | --- | --- | --- |
| 单位 | 死神之首 | MercReaper | 仅文本/引用命中：MercReaper | 官方JSON无生产链 |  |
| 单位 | SCV | SCV | 仅文本/引用命中：SCV | CommandCenter / CommandCenterTrain / 50晶体矿，17秒 | 生命45，人口1，视野8；50晶体矿，17秒 |
| 建筑 | 兵营 | Barracks | 仅文本/引用命中：Barracks | SCV / TerranBuild / 150晶体矿，65秒 | 生命1000，视野9；150晶体矿，65秒 |
| 建筑 | 幽灵军校 | GhostAcademyNova | CUnit已定义：GhostAcademyNova | SCV / TerranBuild / 150晶体矿，50瓦斯，40秒 | 生命1250，视野9；150晶体矿，50瓦斯，40秒 |
| 建筑 | 指挥中心 | CommandCenter | 仅文本/引用命中：CommandCenter | SCV / TerranBuild / 400晶体矿，100秒 | 生命1500，视野11；400晶体矿，100秒 |

