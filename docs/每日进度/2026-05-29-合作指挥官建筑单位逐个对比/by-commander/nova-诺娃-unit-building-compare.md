# 诺娃 / Nova 建筑单位对比

- 当前 active Mod：`D:\MyWork\新建文件夹\mom.report.client\src\MyMod\crys_the_swarm_reborn.SC2Mod\合作指挥官版起义狂潮`
- 指挥官模块：`XMNova.SC2Mod`（存在：是）
- 旧线初始化开局单位：commandcenternova、scvnova、ghostacademynova
- Wiki主要部队文件：`wikitext/11-nova.wiki`
- Wiki主要部队：精英陆战队员、劫掠者突击手、特战幽灵、恶蝠游骑兵、强击歌利亚、重型攻城坦克、掠袭解放者、隐秘女妖、铁鸦II型、磁轨炮塔、导弹塔
- 判定口径：wiki用于中文主要部队名单；官方JSON用于ID、生产链、生命/人口/费用；active 侧先看本指挥官模块和 `XMCore/XMFinal`，再看 `XMFinal.SC2Mod/DocumentInfo` 实际运行闭包，最后只把官方镜像作为事实参考。

## 汇总

| Wiki项 | 官方行 | Wiki未匹配官方 | 官方补充未在Wiki | 当前Mod未命中 | 仅文本命中 | 运行闭包命中 | 仅官方合作镜像 | 底层继承候选 | 生产链异常 | 生产链运行闭包 | 生产链底层候选 | 官方面板缺口 | 特殊面板项 | 命令卡露出产物缺CUnit | 外来生产链露出 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 11 | 16 | 0 | 5 | 0 | 0 | 2 | 0 | 0 | 0 | 5 | 0 | 0 | 0 | 0 | 0 |

## 三方对照

| Wiki项 | 匹配 | 分类 | 官方名称 | ID | 当前Mod | 生产链状态 | 当前面板 | 生产/建造/变形 | 数值 | 定义文件 | 备注 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 精英陆战队员 | 疑似别名 | 单位 | 部署精英陆战队员 | Marine_BlackOps | 当前模块CUnit：Marine_BlackOps；XMFinal运行闭包CUnit：Marine_BlackOps；官方合作镜像CUnit：Marine_BlackOps | 生产链已命中 | 当前面板已露出同命令，产物ID需别名核对：BarracksTrainNova,Train1 ->；官方期望 marinenova | Barracks / BarracksTrainNova / 600晶体矿，300秒 | 生命150，人口1，视野10；600晶体矿，300秒 | 合作指挥官版起义狂潮/Mods/XM/XMNova.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMVorazun.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMKarax.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 劫掠者突击手 | 疑似别名 | 单位 | 部署劫掠者突击手 | Marauder_BlackOps | 当前模块CUnit：Marauder_BlackOps；XMFinal运行闭包CUnit：Marauder_BlackOps；官方合作镜像CUnit：Marauder_BlackOps | 生产链已命中 | 当前面板已露出同命令，产物ID需别名核对：BarracksTrainNova,Train2 ->；官方期望 maraudernova | Barracks / BarracksTrainNova / 500晶体矿，130瓦斯，300秒 | 生命350，人口2，视野8；500晶体矿，130瓦斯，300秒 | 合作指挥官版起义狂潮/Mods/XM/XMNova.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMVorazun.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMKarax.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 特战幽灵 | 疑似别名 | 单位 | 幽灵 | GhostNova | XMFinal运行闭包CUnit：GhostNova；底层基础镜像CUnit：GhostNova；官方合作镜像CUnit：GhostNova | 生产链已命中 | 当前面板已露出同命令，产物ID需别名核对：BarracksTrainNova,Train3 ->；官方期望 ghostfemale_blackops/ghostnova | Barracks / BarracksTrainNova / 1000晶体矿，500瓦斯，300秒 | 生命125，人口2，视野11；1000晶体矿，500瓦斯，300秒 | 合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMKarax.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMFenix.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMAbathurReborn.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 恶蝠游骑兵 | 疑似别名 | 单位 | 部署恶蝠游骑兵 | HellbatBlackOps | 当前模块CUnit：HellbatBlackOps；XMFinal运行闭包CUnit：HellbatBlackOps；官方合作镜像CUnit：HellbatBlackOps | 生产链已命中 | 当前面板已露出同命令，产物ID需别名核对：MorphToHellbatBlackOps,Execute -> HellbatBlackOps；官方期望 hellbatnova/hellionblackops | HellionBlackOps / MorphToHellbatBlackOps / 0晶体矿，4秒 | 生命550，人口2，视野10；0晶体矿，4秒 | 合作指挥官版起义狂潮/Mods/XM/XMNova.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZagara.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMVorazun.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 强击歌利亚 | 疑似别名 | 单位 | 部署强击歌利亚 | Goliath_BlackOps | 当前模块CUnit：Goliath_BlackOps；XMFinal运行闭包CUnit：Goliath_BlackOps；官方合作镜像CUnit：Goliath_BlackOps | 生产链在 XMFinal 运行闭包命中 | 当前面板已露出同命令，产物ID需别名核对：FactoryTrainNova,Train1 ->；官方期望 goliathnova | Factory / FactoryTrainNova / 750晶体矿，250瓦斯，300秒 | 生命450，人口3，视野9；750晶体矿，250瓦斯，300秒 | 合作指挥官版起义狂潮/Mods/XM/XMNova.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZagara.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMVorazun.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 重型攻城坦克 | 疑似别名 | 单位 | 部署重型攻城坦克 | SiegeTank_BlackOps | 当前模块CUnit：SiegeTank_BlackOps；XMFinal运行闭包CUnit：SiegeTank_BlackOps；官方合作镜像CUnit：SiegeTank_BlackOps | 生产链在 XMFinal 运行闭包命中 | 当前面板已露出同命令，产物ID需别名核对：FactoryTrainNova,Train2 ->；官方期望 siegetanknova/siegetanksiegednova | Factory / FactoryTrainNova / 800晶体矿，600瓦斯，300秒 | 生命400，人口3，视野11；800晶体矿，600瓦斯，300秒 | 合作指挥官版起义狂潮/Mods/XM/XMNova.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZagara.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMVorazun.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 掠袭解放者 | 疑似别名 | 单位 | 部署掠袭解放者 | Liberator_BlackOps | 当前模块CUnit：Liberator_BlackOps；XMFinal运行闭包CUnit：Liberator_BlackOps；官方合作镜像CUnit：Liberator_BlackOps | 生产链在 XMFinal 运行闭包命中 | 当前面板已露出同命令，产物ID需别名核对：StarportTrainNova,Train3 ->；官方期望 liberatornova | Starport / StarportTrainNova / 750晶体矿，750瓦斯，300秒 | 生命450，人口3，视野10；750晶体矿，750瓦斯，300秒 | 合作指挥官版起义狂潮/Mods/XM/XMNova.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZagara.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMVorazun.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 隐秘女妖 | 疑似别名 | 单位 | 部署隐秘女妖 | Banshee_BlackOps | 当前模块CUnit：Banshee_BlackOps；XMFinal运行闭包CUnit：Banshee_BlackOps；官方合作镜像CUnit：Banshee_BlackOps | 生产链在 XMFinal 运行闭包命中 | 当前面板已露出同命令，产物ID需别名核对：StarportTrainNova,Train1 ->；官方期望 bansheenova | Starport / StarportTrainNova / 700晶体矿，375瓦斯，300秒 | 生命350，人口3，视野10；700晶体矿，375瓦斯，300秒 | 合作指挥官版起义狂潮/Mods/XM/XMNova.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZagara.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMVorazun.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 铁鸦II型 | 疑似别名 | 单位 | 部署铁鸦II型 | Raven_BlackOps | 当前模块CUnit：Raven_BlackOps；XMFinal运行闭包CUnit：Raven_BlackOps；官方合作镜像CUnit：Raven_BlackOps | 生产链在 XMFinal 运行闭包命中 | 当前面板已露出同命令，产物ID需别名核对：StarportTrainNova,Train2 ->；官方期望 ravennova | Starport / StarportTrainNova / 100晶体矿，200瓦斯，300秒 | 生命350，人口2，视野11；100晶体矿，200瓦斯，300秒 | 合作指挥官版起义狂潮/Mods/XM/XMNova.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZagara.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMVorazun.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 磁轨炮塔 | 别名匹配 | 建筑 | 自动机炮 | AutoTurret | 当前模块CUnit：NovaACLaserTurret, AutoTurret_BlackOps；XMFinal运行闭包CUnit：AutoTurret, NovaACLaserTurret, AutoTurret_BlackOps；底层基础镜像CUnit：AutoTurret；官方合作镜像CUnit：AutoTurret, NovaACLaserTurret, AutoTurret_BlackOps | 生产链已命中 | 当前面板已露出同命令，产物ID需别名核对：BuildAutoTurret_BlackOps,Execute ->；官方期望 novaaclaserturret/autoturret_blackops | Raven_BlackOps / BuildAutoTurret_BlackOps / 100晶体矿 | 生命100，视野7；100晶体矿 | 合作指挥官版起义狂潮/Mods/XM/XMNova.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZagara.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMVorazun.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
| 导弹塔 | 精确匹配 | 建筑 | 导弹塔 | MissileTurret | 当前模块CUnit：MissileTurretNova；XMFinal运行闭包CUnit：MissileTurret；底层基础镜像CUnit：MissileTurret；官方合作镜像CUnit：MissileTurret | 生产链已命中 | 当前面板已露出：TerranBuildNova,Build6 -> MissileTurretNova | SCV / TerranBuild / 100晶体矿，25秒 | 生命250，视野11；100晶体矿，25秒 | 合作指挥官版起义狂潮/Mods/XM/XMNova.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMAbathurReborn.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMAbathur.SC2Mod/Base.SC2Data/GameData/UnitData.xml |  |
|  | 官方补充 | 单位 | 死神之首 | MercReaper | XMFinal运行闭包CUnit：MercReaper；底层基础镜像CUnit：MercReaper；官方合作镜像CUnit：MercReaper | 官方JSON无生产链 | 官方JSON无生产链 |  |  | 合作指挥官版起义狂潮/Mods/XM/XMZagara.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>游戏数据/官方SC2原始文本镜像/campaigns/swarm.sc2campaign/base.sc2data/gamedata/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 单位 | SCV | SCV | 当前模块CUnit：SCVNova；XMFinal运行闭包CUnit：SCV；底层基础镜像CUnit：SCV；官方合作镜像CUnit：SCV | 生产链已命中 | 当前面板已露出：CommandCenterTrainNova,Train1 -> SCVNova | CommandCenter / CommandCenterTrain / 50晶体矿，17秒 | 生命45，人口1，视野8；50晶体矿，17秒 | 合作指挥官版起义狂潮/Mods/XM/XMNova.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMAbathurReborn.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMAbathur.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 兵营 | Barracks | 当前模块CUnit：BarracksNova；XMFinal运行闭包CUnit：Barracks；底层基础镜像CUnit：Barracks；官方合作镜像CUnit：Barracks | 生产链已命中 | 当前面板已露出：TerranBuildNova,Build4 -> BarracksNova | SCV / TerranBuild / 150晶体矿，65秒 | 生命1000，视野9；150晶体矿，65秒 | 合作指挥官版起义狂潮/Mods/XM/XMNova.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZeratul.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZagara.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 幽灵军校 | GhostAcademyNova | 当前模块CUnit：GhostAcademyNova；XMFinal运行闭包CUnit：GhostAcademyNova；官方合作镜像CUnit：GhostAcademyNova | 生产链已命中 | 当前面板已露出：TerranBuild,Build15 -> GhostAcademyNova | SCV / TerranBuild / 150晶体矿，50瓦斯，40秒 | 生命1250，视野9；150晶体矿，50瓦斯，40秒 | 合作指挥官版起义狂潮/Mods/XM/XMNova.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZeratul.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZagara.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 指挥中心 | CommandCenter | 当前模块CUnit：CommandCenterNova；XMFinal运行闭包CUnit：CommandCenter；底层基础镜像CUnit：CommandCenter；官方合作镜像CUnit：CommandCenter | 生产链已命中 | 当前面板已露出：TerranBuildNova,Build1 -> CommandCenterNova | SCV / TerranBuild / 400晶体矿，100秒 | 生命1500，视野11；400晶体矿，100秒 | 合作指挥官版起义狂潮/Mods/XM/XMNova.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZeratul.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMRaynor.SC2Mod/Base.SC2Data/GameData/UnitData.xml<br>合作指挥官版起义狂潮/Mods/XM/XMZagara.SC2Mod/Base.SC2Data/GameData/UnitData.xml | 官方JSON有，wiki主要部队未列。 |

## 优先排查项

- 无。

## 官方生产面板缺口

说明：按官方 JSON 的生产链，映射到当前指挥官别名后，再检查当前指挥官模块里是否存在同一 `AbilCmd` 的单位命令卡按钮。`当前技能有槽但面板未露出` 是斯旺工厂这类问题的专门口径。

- 无。

## 非缺口特殊机制

说明：这些项来自官方 JSON/ArmyCategory/Catalog，但官方自身也不是普通玩家命令卡入口；保留说明，避免后续继续误补按钮。

- 无。

## Wiki未匹配官方JSON

- 无。

## 官方有但Wiki主要部队未列

| 分类 | 官方名称 | ID | 当前Mod | 生产链 | 数值 |
| --- | --- | --- | --- | --- | --- |
| 单位 | 死神之首 | MercReaper | XMFinal运行闭包CUnit：MercReaper；底层基础镜像CUnit：MercReaper；官方合作镜像CUnit：MercReaper | 官方JSON无生产链 |  |
| 单位 | SCV | SCV | 当前模块CUnit：SCVNova；XMFinal运行闭包CUnit：SCV；底层基础镜像CUnit：SCV；官方合作镜像CUnit：SCV | CommandCenter / CommandCenterTrain / 50晶体矿，17秒 | 生命45，人口1，视野8；50晶体矿，17秒 |
| 建筑 | 兵营 | Barracks | 当前模块CUnit：BarracksNova；XMFinal运行闭包CUnit：Barracks；底层基础镜像CUnit：Barracks；官方合作镜像CUnit：Barracks | SCV / TerranBuild / 150晶体矿，65秒 | 生命1000，视野9；150晶体矿，65秒 |
| 建筑 | 幽灵军校 | GhostAcademyNova | 当前模块CUnit：GhostAcademyNova；XMFinal运行闭包CUnit：GhostAcademyNova；官方合作镜像CUnit：GhostAcademyNova | SCV / TerranBuild / 150晶体矿，50瓦斯，40秒 | 生命1250，视野9；150晶体矿，50瓦斯，40秒 |
| 建筑 | 指挥中心 | CommandCenter | 当前模块CUnit：CommandCenterNova；XMFinal运行闭包CUnit：CommandCenter；底层基础镜像CUnit：CommandCenter；官方合作镜像CUnit：CommandCenter | SCV / TerranBuild / 400晶体矿，100秒 | 生命1500，视野11；400晶体矿，100秒 |

## 当前 active 命令卡露出产物缺 CUnit

说明：只扫描当前指挥官模块里已挂到单位命令卡 `AbilCmd="技能,命令"` 的 `CAbilTrain/CAbilWarpTrain/CAbilBuild/CAbilMorph` 产物。产物在当前模块、XM共享模块、XMFinal运行闭包和底层基础镜像都没有 `CUnit` 时列在这里；这类才是当前 Mod 玩家按钮链路的直接风险。XML 注释已在扫描前剔除。

- 无。

## 当前 active 外来生产链露出

说明：这些按钮的产物能在 XMFinal 运行闭包或官方合作镜像中解析，但生产者不属于该指挥官官方体系。它们不是“缺 CUnit”，更像跨指挥官命令卡污染或共享基础单位需要加选择门槛。

- 无。

## 当前 active 隐藏技能产物缺 CUnit

说明：这些产物在当前模块的技能 `InfoArray` 中存在，但没有发现对应命令卡 `AbilCmd="技能,命令"`。它们通常是旧官方/编辑器残留或未开放设计，默认不按玩家可点建筑按钮修。

- 无。

