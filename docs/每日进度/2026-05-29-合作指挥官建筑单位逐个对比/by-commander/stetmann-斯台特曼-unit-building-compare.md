# 斯台特曼 / Stetmann 建筑单位对比

- 当前 active Mod：`D:\MyWork\新建文件夹\mom.report.client\src\MyMod\crys_the_swarm_reborn.SC2Mod\合作指挥官版起义狂潮`
- 指挥官模块：`XMStetmann.SC2Mod`（存在：是）
- 旧线初始化开局单位：hatcherystetmann、dronestetmann、garysden
- Wiki主要部队文件：`wikitext/12-stetmann.wiki`
- Wiki主要部队：机械跳虫、机械爆虫、机械刺蛇、机械潜伏者、机械感染者、机械雷兽、机械腐化者、机械巢式战列空母、机械眼虫、机械脊针爬虫、机械孢子爬虫
- 判定口径：wiki用于中文主要部队名单；官方JSON用于ID、生产链、生命/人口/费用；active 侧先看本指挥官模块和 `XMCore/XMFinal`，再看 `XMFinal.SC2Mod/DocumentInfo` 实际运行闭包，最后只把官方镜像作为事实参考。

## 汇总

| Wiki项 | 官方行 | Wiki未匹配官方 | 官方补充未在Wiki | 当前Mod未命中 | 仅文本命中 | 运行闭包命中 | 仅官方合作镜像 | 底层继承候选 | 生产链异常 | 生产链运行闭包 | 生产链底层候选 | 官方面板缺口 | 特殊面板项 | 命令卡露出产物缺CUnit | 外来生产链露出 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 11 | 34 | 0 | 23 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |

## 三方对照

| Wiki项 | 匹配 | 分类 | 官方名称 | ID | 当前Mod | 生产链状态 | 当前面板 | 生产/建造/变形 | 数值 | 定义文件 | 备注 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 机械跳虫 | 精确匹配 | 单位 | 机械跳虫 | ZerglingStetmann | 当前模块CUnit：ZerglingStetmann；官方合作镜像CUnit：ZerglingStetmann | 生产链已命中 | 当前面板已露出：LarvaTrainStetmann,Train3 -> ZerglingStetmann | LarvaStetmann / LarvaTrainStetmann / 25晶体矿，24秒 | 生命35，人口0.5，视野8；25晶体矿，24秒 | 合作指挥官版起义狂潮/Mods/XM/XMStetmann.SC2Mod/Base.SC2Data/GameData/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/commanders/egonstetmann.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 机械爆虫 | 精确匹配 | 单位 | 机械爆虫 | BanelingStetmann | 当前模块CUnit：BanelingStetmann；官方合作镜像CUnit：BanelingStetmann | 生产链已命中 | 当前面板已露出：MorphToBanelingStetmann,Execute -> BanelingStetmann | ZerglingStetmann / MorphToBanelingStetmann / 25晶体矿，15瓦斯，12秒 | 生命30，人口0.5，视野8；25晶体矿，15瓦斯，12秒 | 合作指挥官版起义狂潮/Mods/XM/XMStetmann.SC2Mod/Base.SC2Data/GameData/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/commanders/egonstetmann.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 机械刺蛇 | 精确匹配 | 单位 | 机械刺蛇 | HydraliskStetmann | 当前模块CUnit：HydraliskStetmann；官方合作镜像CUnit：HydraliskStetmann | 生产链已命中 | 当前面板已露出：LarvaTrainStetmann,Train5 -> HydraliskStetmann | LarvaStetmann / LarvaTrainStetmann / 100晶体矿，50瓦斯，33秒 | 生命80，人口2，视野9；100晶体矿，50瓦斯，33秒 | 合作指挥官版起义狂潮/Mods/XM/XMStetmann.SC2Mod/Base.SC2Data/GameData/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/commanders/egonstetmann.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 机械潜伏者 | 精确匹配 | 单位 | 机械潜伏者 | LurkerStetmann | 当前模块CUnit：LurkerStetmann；官方合作镜像CUnit：LurkerStetmann | 生产链已命中 | 当前面板已露出：MorphToLurkerStetmann,Execute -> LurkerStetmann | HydraliskStetmann / MorphToLurkerStetmann / 50晶体矿，100瓦斯，25秒 | 生命200，人口3，视野10；50晶体矿，100瓦斯，25秒 | 合作指挥官版起义狂潮/Mods/XM/XMStetmann.SC2Mod/Base.SC2Data/GameData/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/commanders/egonstetmann.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 机械感染者 | 精确匹配 | 单位 | 机械感染者 | InfestorStetmann | 当前模块CUnit：InfestorStetmann；官方合作镜像CUnit：InfestorStetmann | 生产链已命中 | 当前面板已露出：LarvaTrainStetmann,Train7 -> InfestorStetmann | LarvaStetmann / LarvaTrainStetmann / 100晶体矿，150瓦斯，50秒 | 生命90，人口2，视野10；100晶体矿，150瓦斯，50秒 | 合作指挥官版起义狂潮/Mods/XM/XMStetmann.SC2Mod/Base.SC2Data/GameData/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/commanders/egonstetmann.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 机械雷兽 | 精确匹配 | 单位 | 机械雷兽 | UltraliskStetmann | 当前模块CUnit：UltraliskStetmann；官方合作镜像CUnit：UltraliskStetmann | 生产链已命中 | 当前面板已露出：LarvaTrainStetmann,Train9 -> UltraliskStetmann | LarvaStetmann / LarvaTrainStetmann / 300晶体矿，200瓦斯，55秒 | 生命500，人口6，视野9；300晶体矿，200瓦斯，55秒 | 合作指挥官版起义狂潮/Mods/XM/XMStetmann.SC2Mod/Base.SC2Data/GameData/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/commanders/egonstetmann.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 机械腐化者 | 精确匹配 | 单位 | 机械腐化者 | CorruptorStetmann | 当前模块CUnit：CorruptorStetmann；官方合作镜像CUnit：CorruptorStetmann | 生产链已命中 | 当前面板已露出：LarvaTrainStetmann,Train6 -> CorruptorStetmann | LarvaStetmann / LarvaTrainStetmann / 150晶体矿，100瓦斯，33秒 | 生命200，人口2，视野10；150晶体矿，100瓦斯，33秒 | 合作指挥官版起义狂潮/Mods/XM/XMStetmann.SC2Mod/Base.SC2Data/GameData/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/commanders/egonstetmann.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 机械巢式战列空母 | 精确匹配 | 单位 | 机械巢式战列空母 | BroodLordStetmann | 当前模块CUnit：BroodLordStetmann；官方合作镜像CUnit：BroodLordStetmann | 生产链已命中 | 当前面板已露出：MorphToCBroodLordStetmann,Execute -> BroodLordStetmann | CorruptorStetmann / MorphToCBroodLordStetmann / 300晶体矿，250瓦斯，33.8332秒 | 生命550，人口8，视野12；300晶体矿，250瓦斯，33.8332秒 | 合作指挥官版起义狂潮/Mods/XM/XMStetmann.SC2Mod/Base.SC2Data/GameData/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/commanders/egonstetmann.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 机械眼虫 | 精确匹配 | 单位 | 机械眼虫 | OverseerStetmann | 当前模块CUnit：OverseerStetmann；官方合作镜像CUnit：OverseerStetmann | 生产链已命中 | 当前面板已露出：MorphToOverseerStetmann,Execute -> OverseerStetmann | OverlordStetmann / MorphToOverseerStetmann / 50晶体矿，50瓦斯，16.6665秒 | 生命200，视野11；50晶体矿，50瓦斯，16.6665秒 | 合作指挥官版起义狂潮/Mods/XM/XMStetmann.SC2Mod/Base.SC2Data/GameData/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/commanders/egonstetmann.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 机械脊针爬虫 | 精确匹配 | 建筑 | 机械脊针爬虫 | SpineCrawlerStetmann | 当前模块CUnit：SpineCrawlerStetmann；官方合作镜像CUnit：SpineCrawlerStetmann | 生产链已命中 | 当前面板已露出：ZergBuildStetmann,Build15 -> SpineCrawlerStetmann | DroneStetmann / ZergBuildStetmann / 150晶体矿，30秒 | 生命300，视野11；150晶体矿，30秒 | 合作指挥官版起义狂潮/Mods/XM/XMStetmann.SC2Mod/Base.SC2Data/GameData/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/commanders/egonstetmann.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
| 机械孢子爬虫 | 精确匹配 | 建筑 | 机械孢子爬虫 | SporeCrawlerStetmann | 当前模块CUnit：SporeCrawlerStetmann；官方合作镜像CUnit：SporeCrawlerStetmann | 生产链已命中 | 当前面板已露出：ZergBuildStetmann,Build16 -> SporeCrawlerStetmann | DroneStetmann / ZergBuildStetmann / 125晶体矿，30秒 | 生命400，视野11；125晶体矿，30秒 | 合作指挥官版起义狂潮/Mods/XM/XMStetmann.SC2Mod/Base.SC2Data/GameData/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/commanders/egonstetmann.sc2mod/base.sc2data/gamedata/unitdata.xml |  |
|  | 官方补充 | 单位 | 机械工蜂 | DroneStetmann | 当前模块CUnit：DroneStetmann；官方合作镜像CUnit：DroneStetmann | 生产链已命中 | 当前面板已露出：LarvaTrainStetmann,Train1 -> DroneStetmann | LarvaStetmann / LarvaTrainStetmann / 50晶体矿，17秒 | 生命40，人口1，视野8；50晶体矿，17秒 | 合作指挥官版起义狂潮/Mods/XM/XMStetmann.SC2Mod/Base.SC2Data/GameData/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/commanders/egonstetmann.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 单位 | 盖瑞 | GaryStetmann | 当前模块CUnit：GaryStetmann；官方合作镜像CUnit：GaryStetmann | 官方JSON无生产链 | 官方JSON无生产链 |  | 生命500，视野11 | 合作指挥官版起义狂潮/Mods/XM/XMStetmann.SC2Mod/Base.SC2Data/GameData/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/commanders/egonstetmann.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 单位 | 超级盖瑞 | SuperGaryStetmann | 当前模块CUnit：SuperGaryStetmann；官方合作镜像CUnit：SuperGaryStetmann | 生产链已命中 | 当前面板已露出：MorphToSuperGaryStetmann,Execute -> SuperGaryStetmann | GaryStetmann / MorphToSuperGaryStetmann / 450晶体矿，300瓦斯，15秒 | 生命1000，视野11；450晶体矿，300瓦斯，15秒 | 合作指挥官版起义狂潮/Mods/XM/XMStetmann.SC2Mod/Base.SC2Data/GameData/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/commanders/egonstetmann.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 单位 | 机械蟑螂 | RoachStetmann | 当前模块CUnit：RoachStetmann；官方合作镜像CUnit：RoachStetmann | 官方JSON无生产链 | 官方JSON无生产链 |  | 生命75，视野9 | 合作指挥官版起义狂潮/Mods/XM/XMStetmann.SC2Mod/Base.SC2Data/GameData/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/commanders/egonstetmann.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 单位 | 机械破坏者 | RavagerStetmann | 当前模块CUnit：RavagerStetmann；官方合作镜像CUnit：RavagerStetmann | 生产链已命中 | 当前面板已露出：MorphToRavagerStetmann,Execute -> RavagerStetmann | RoachStetmann / MorphToRavagerStetmann / 12秒 | 生命80，视野9；12秒 | 合作指挥官版起义狂潮/Mods/XM/XMStetmann.SC2Mod/Base.SC2Data/GameData/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/commanders/egonstetmann.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 单位 | 机械潜伏者 | LurkerStetmannBurrowed | 当前模块CUnit：LurkerStetmannBurrowed；官方合作镜像CUnit：LurkerStetmannBurrowed | 官方JSON无生产链 | 官方JSON无生产链 |  | 生命200，人口3，视野10；150晶体矿，150瓦斯 | 合作指挥官版起义狂潮/Mods/XM/XMStetmann.SC2Mod/Base.SC2Data/GameData/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/commanders/egonstetmann.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 单位 | 机械眼虫 | OverseerStetmannSiegeMode | 当前模块CUnit：OverseerStetmannSiegeMode；官方合作镜像CUnit：OverseerStetmannSiegeMode | 官方JSON无生产链 | 官方JSON无生产链 |  | 生命200，视野16.5；150晶体矿，50瓦斯 | 合作指挥官版起义狂潮/Mods/XM/XMStetmann.SC2Mod/Base.SC2Data/GameData/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/commanders/egonstetmann.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 机械孵化场 | HatcheryStetmann | 当前模块CUnit：HatcheryStetmann；官方合作镜像CUnit：HatcheryStetmann | 生产链已命中 | 当前面板已露出：ZergBuildStetmann,Build1 -> HatcheryStetmann | DroneStetmann / ZergBuildStetmann / 350晶体矿，60秒 | 生命1500，视野10；350晶体矿，60秒 | 合作指挥官版起义狂潮/Mods/XM/XMStetmann.SC2Mod/Base.SC2Data/GameData/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/commanders/egonstetmann.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 机械虫穴 | LairStetmann | 当前模块CUnit：LairStetmann；官方合作镜像CUnit：LairStetmann | 生产链已命中 | 当前面板已露出：UpgradeToLairStetmann,Execute -> LairStetmann | HatcheryStetmann / UpgradeToLairStetmann / 150晶体矿，100瓦斯，60秒 | 生命2000，视野11；150晶体矿，100瓦斯，60秒 | 合作指挥官版起义狂潮/Mods/XM/XMStetmann.SC2Mod/Base.SC2Data/GameData/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/commanders/egonstetmann.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 机械主巢 | HiveStetmann | 当前模块CUnit：HiveStetmann；官方合作镜像CUnit：HiveStetmann | 生产链已命中 | 当前面板已露出：UpgradeToHiveStetmann,Execute -> HiveStetmann | LairStetmann / UpgradeToHiveStetmann / 200晶体矿，150瓦斯，60秒 | 生命2500，视野12；200晶体矿，150瓦斯，60秒 | 合作指挥官版起义狂潮/Mods/XM/XMStetmann.SC2Mod/Base.SC2Data/GameData/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/commanders/egonstetmann.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 机械萃取房 | ExtractorStetmann | 当前模块CUnit：ExtractorStetmann；官方合作镜像CUnit：ExtractorStetmann | 生产链已命中 | 当前面板已露出：ZergBuildStetmann,Build3 -> ExtractorStetmann | DroneStetmann / ZergBuildStetmann / 75晶体矿，30秒 | 生命500，视野9；75晶体矿，30秒 | 合作指挥官版起义狂潮/Mods/XM/XMStetmann.SC2Mod/Base.SC2Data/GameData/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/commanders/egonstetmann.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 机械分裂池 | SpawningPoolStetmann | 当前模块CUnit：SpawningPoolStetmann；官方合作镜像CUnit：SpawningPoolStetmann | 生产链已命中 | 当前面板已露出：ZergBuildStetmann,Build4 -> SpawningPoolStetmann | DroneStetmann / ZergBuildStetmann / 250晶体矿，30秒 | 生命1000，视野9；250晶体矿，30秒 | 合作指挥官版起义狂潮/Mods/XM/XMStetmann.SC2Mod/Base.SC2Data/GameData/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/commanders/egonstetmann.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 机械进化腔 | EvolutionChamberStetmann | 当前模块CUnit：EvolutionChamberStetmann；官方合作镜像CUnit：EvolutionChamberStetmann | 生产链已命中 | 当前面板已露出：ZergBuildStetmann,Build5 -> EvolutionChamberStetmann | DroneStetmann / ZergBuildStetmann / 125晶体矿，40秒 | 生命750，视野9；125晶体矿，40秒 | 合作指挥官版起义狂潮/Mods/XM/XMStetmann.SC2Mod/Base.SC2Data/GameData/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/commanders/egonstetmann.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 机械爆虫巢穴 | BanelingNestStetmann | 当前模块CUnit：BanelingNestStetmann；官方合作镜像CUnit：BanelingNestStetmann | 生产链已命中 | 当前面板已露出：ZergBuildStetmann,Build11 -> BanelingNestStetmann | DroneStetmann / ZergBuildStetmann / 150晶体矿，50瓦斯，30秒 | 生命850，视野9；150晶体矿，50瓦斯，30秒 | 合作指挥官版起义狂潮/Mods/XM/XMStetmann.SC2Mod/Base.SC2Data/GameData/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/commanders/egonstetmann.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 机械刺蛇巢 | HydraliskDenStetmann | 当前模块CUnit：HydraliskDenStetmann；官方合作镜像CUnit：HydraliskDenStetmann | 生产链已命中 | 当前面板已露出：ZergBuildStetmann,Build6 -> HydraliskDenStetmann | DroneStetmann / ZergBuildStetmann / 150晶体矿，100瓦斯，40秒 | 生命850，视野9；150晶体矿，100瓦斯，40秒 | 合作指挥官版起义狂潮/Mods/XM/XMStetmann.SC2Mod/Base.SC2Data/GameData/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/commanders/egonstetmann.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 机械潜伏者巢穴 | LurkerDenStetmann | 当前模块CUnit：LurkerDenStetmann；官方合作镜像CUnit：LurkerDenStetmann | 生产链已命中 | 当前面板已露出：UpgradeToLurkerDenStetmann,Execute -> LurkerDenStetmann | HydraliskDenStetmann / UpgradeToLurkerDenStetmann / 100晶体矿，50瓦斯，30秒 | 生命850，视野9；100晶体矿，50瓦斯，30秒 | 合作指挥官版起义狂潮/Mods/XM/XMStetmann.SC2Mod/Base.SC2Data/GameData/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/commanders/egonstetmann.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 机械感染深渊 | InfestationPitStetmann | 当前模块CUnit：InfestationPitStetmann；官方合作镜像CUnit：InfestationPitStetmann | 生产链已命中 | 当前面板已露出：ZergBuildStetmann,Build9 -> InfestationPitStetmann | DroneStetmann / ZergBuildStetmann / 150晶体矿，100瓦斯，40秒 | 生命850，视野9；150晶体矿，100瓦斯，40秒 | 合作指挥官版起义狂潮/Mods/XM/XMStetmann.SC2Mod/Base.SC2Data/GameData/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/commanders/egonstetmann.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 机械尖塔 | SpireStetmann | 当前模块CUnit：SpireStetmann；官方合作镜像CUnit：SpireStetmann | 生产链已命中 | 当前面板已露出：ZergBuildStetmann,Build7 -> SpireStetmann | DroneStetmann / ZergBuildStetmann / 250晶体矿，200瓦斯，40秒 | 生命850，视野9；250晶体矿，200瓦斯，40秒 | 合作指挥官版起义狂潮/Mods/XM/XMStetmann.SC2Mod/Base.SC2Data/GameData/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/commanders/egonstetmann.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 机械巨型尖塔 | GreaterSpireStetmann | 当前模块CUnit：GreaterSpireStetmann；官方合作镜像CUnit：GreaterSpireStetmann | 生产链已命中 | 当前面板已露出：UpgradeToGreaterSpireStetmann,Execute -> GreaterSpireStetmann | SpireStetmann / UpgradeToGreaterSpireStetmann / 100晶体矿，150瓦斯，30秒 | 生命1000，视野9；100晶体矿，150瓦斯，30秒 | 合作指挥官版起义狂潮/Mods/XM/XMStetmann.SC2Mod/Base.SC2Data/GameData/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/commanders/egonstetmann.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 机械雷兽窟 | UltraliskCavernStetmann | 当前模块CUnit：UltraliskCavernStetmann；官方合作镜像CUnit：UltraliskCavernStetmann | 生产链已命中 | 当前面板已露出：ZergBuildStetmann,Build8 -> UltraliskCavernStetmann | DroneStetmann / ZergBuildStetmann / 200晶体矿，200瓦斯，50秒 | 生命850，视野9；200晶体矿，200瓦斯，50秒 | 合作指挥官版起义狂潮/Mods/XM/XMStetmann.SC2Mod/Base.SC2Data/GameData/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/commanders/egonstetmann.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 机械脊针爬虫 | SpineCrawlerUprootedStetmann | 当前模块CUnit：SpineCrawlerUprootedStetmann；官方合作镜像CUnit：SpineCrawlerUprootedStetmann | 官方JSON无生产链 | 官方JSON无生产链 |  | 生命300，视野11；150晶体矿 | 合作指挥官版起义狂潮/Mods/XM/XMStetmann.SC2Mod/Base.SC2Data/GameData/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/commanders/egonstetmann.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 机械孢子爬虫 | SporeCrawlerUprootedStetmann | 当前模块CUnit：SporeCrawlerUprootedStetmann；官方合作镜像CUnit：SporeCrawlerUprootedStetmann | 官方JSON无生产链 | 官方JSON无生产链 |  | 生命400，视野11；125晶体矿 | 合作指挥官版起义狂潮/Mods/XM/XMStetmann.SC2Mod/Base.SC2Data/GameData/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/commanders/egonstetmann.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |
|  | 官方补充 | 建筑 | 艾星 | PowerTowerStetmann | 当前模块CUnit：PowerTowerStetmann；官方合作镜像CUnit：PowerTowerStetmann | 生产链已命中 | 当前面板已露出：DeployPowerTowerStetmann,Build1 -> PowerTowerStetmann | CoopCasterStetmann / DeployPowerTowerStetmann / 2秒 | 生命5，视野12；2秒 | 合作指挥官版起义狂潮/Mods/XM/XMStetmann.SC2Mod/Base.SC2Data/GameData/unitdata.xml<br>游戏数据/官方SC2原始文本镜像/mods/starcoop/commanders/egonstetmann.sc2mod/base.sc2data/gamedata/unitdata.xml | 官方JSON有，wiki主要部队未列。 |

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
| 单位 | 机械工蜂 | DroneStetmann | 当前模块CUnit：DroneStetmann；官方合作镜像CUnit：DroneStetmann | LarvaStetmann / LarvaTrainStetmann / 50晶体矿，17秒 | 生命40，人口1，视野8；50晶体矿，17秒 |
| 单位 | 盖瑞 | GaryStetmann | 当前模块CUnit：GaryStetmann；官方合作镜像CUnit：GaryStetmann | 官方JSON无生产链 | 生命500，视野11 |
| 单位 | 超级盖瑞 | SuperGaryStetmann | 当前模块CUnit：SuperGaryStetmann；官方合作镜像CUnit：SuperGaryStetmann | GaryStetmann / MorphToSuperGaryStetmann / 450晶体矿，300瓦斯，15秒 | 生命1000，视野11；450晶体矿，300瓦斯，15秒 |
| 单位 | 机械蟑螂 | RoachStetmann | 当前模块CUnit：RoachStetmann；官方合作镜像CUnit：RoachStetmann | 官方JSON无生产链 | 生命75，视野9 |
| 单位 | 机械破坏者 | RavagerStetmann | 当前模块CUnit：RavagerStetmann；官方合作镜像CUnit：RavagerStetmann | RoachStetmann / MorphToRavagerStetmann / 12秒 | 生命80，视野9；12秒 |
| 单位 | 机械潜伏者 | LurkerStetmannBurrowed | 当前模块CUnit：LurkerStetmannBurrowed；官方合作镜像CUnit：LurkerStetmannBurrowed | 官方JSON无生产链 | 生命200，人口3，视野10；150晶体矿，150瓦斯 |
| 单位 | 机械眼虫 | OverseerStetmannSiegeMode | 当前模块CUnit：OverseerStetmannSiegeMode；官方合作镜像CUnit：OverseerStetmannSiegeMode | 官方JSON无生产链 | 生命200，视野16.5；150晶体矿，50瓦斯 |
| 建筑 | 机械孵化场 | HatcheryStetmann | 当前模块CUnit：HatcheryStetmann；官方合作镜像CUnit：HatcheryStetmann | DroneStetmann / ZergBuildStetmann / 350晶体矿，60秒 | 生命1500，视野10；350晶体矿，60秒 |
| 建筑 | 机械虫穴 | LairStetmann | 当前模块CUnit：LairStetmann；官方合作镜像CUnit：LairStetmann | HatcheryStetmann / UpgradeToLairStetmann / 150晶体矿，100瓦斯，60秒 | 生命2000，视野11；150晶体矿，100瓦斯，60秒 |
| 建筑 | 机械主巢 | HiveStetmann | 当前模块CUnit：HiveStetmann；官方合作镜像CUnit：HiveStetmann | LairStetmann / UpgradeToHiveStetmann / 200晶体矿，150瓦斯，60秒 | 生命2500，视野12；200晶体矿，150瓦斯，60秒 |
| 建筑 | 机械萃取房 | ExtractorStetmann | 当前模块CUnit：ExtractorStetmann；官方合作镜像CUnit：ExtractorStetmann | DroneStetmann / ZergBuildStetmann / 75晶体矿，30秒 | 生命500，视野9；75晶体矿，30秒 |
| 建筑 | 机械分裂池 | SpawningPoolStetmann | 当前模块CUnit：SpawningPoolStetmann；官方合作镜像CUnit：SpawningPoolStetmann | DroneStetmann / ZergBuildStetmann / 250晶体矿，30秒 | 生命1000，视野9；250晶体矿，30秒 |
| 建筑 | 机械进化腔 | EvolutionChamberStetmann | 当前模块CUnit：EvolutionChamberStetmann；官方合作镜像CUnit：EvolutionChamberStetmann | DroneStetmann / ZergBuildStetmann / 125晶体矿，40秒 | 生命750，视野9；125晶体矿，40秒 |
| 建筑 | 机械爆虫巢穴 | BanelingNestStetmann | 当前模块CUnit：BanelingNestStetmann；官方合作镜像CUnit：BanelingNestStetmann | DroneStetmann / ZergBuildStetmann / 150晶体矿，50瓦斯，30秒 | 生命850，视野9；150晶体矿，50瓦斯，30秒 |
| 建筑 | 机械刺蛇巢 | HydraliskDenStetmann | 当前模块CUnit：HydraliskDenStetmann；官方合作镜像CUnit：HydraliskDenStetmann | DroneStetmann / ZergBuildStetmann / 150晶体矿，100瓦斯，40秒 | 生命850，视野9；150晶体矿，100瓦斯，40秒 |
| 建筑 | 机械潜伏者巢穴 | LurkerDenStetmann | 当前模块CUnit：LurkerDenStetmann；官方合作镜像CUnit：LurkerDenStetmann | HydraliskDenStetmann / UpgradeToLurkerDenStetmann / 100晶体矿，50瓦斯，30秒 | 生命850，视野9；100晶体矿，50瓦斯，30秒 |
| 建筑 | 机械感染深渊 | InfestationPitStetmann | 当前模块CUnit：InfestationPitStetmann；官方合作镜像CUnit：InfestationPitStetmann | DroneStetmann / ZergBuildStetmann / 150晶体矿，100瓦斯，40秒 | 生命850，视野9；150晶体矿，100瓦斯，40秒 |
| 建筑 | 机械尖塔 | SpireStetmann | 当前模块CUnit：SpireStetmann；官方合作镜像CUnit：SpireStetmann | DroneStetmann / ZergBuildStetmann / 250晶体矿，200瓦斯，40秒 | 生命850，视野9；250晶体矿，200瓦斯，40秒 |
| 建筑 | 机械巨型尖塔 | GreaterSpireStetmann | 当前模块CUnit：GreaterSpireStetmann；官方合作镜像CUnit：GreaterSpireStetmann | SpireStetmann / UpgradeToGreaterSpireStetmann / 100晶体矿，150瓦斯，30秒 | 生命1000，视野9；100晶体矿，150瓦斯，30秒 |
| 建筑 | 机械雷兽窟 | UltraliskCavernStetmann | 当前模块CUnit：UltraliskCavernStetmann；官方合作镜像CUnit：UltraliskCavernStetmann | DroneStetmann / ZergBuildStetmann / 200晶体矿，200瓦斯，50秒 | 生命850，视野9；200晶体矿，200瓦斯，50秒 |
| 建筑 | 机械脊针爬虫 | SpineCrawlerUprootedStetmann | 当前模块CUnit：SpineCrawlerUprootedStetmann；官方合作镜像CUnit：SpineCrawlerUprootedStetmann | 官方JSON无生产链 | 生命300，视野11；150晶体矿 |
| 建筑 | 机械孢子爬虫 | SporeCrawlerUprootedStetmann | 当前模块CUnit：SporeCrawlerUprootedStetmann；官方合作镜像CUnit：SporeCrawlerUprootedStetmann | 官方JSON无生产链 | 生命400，视野11；125晶体矿 |
| 建筑 | 艾星 | PowerTowerStetmann | 当前模块CUnit：PowerTowerStetmann；官方合作镜像CUnit：PowerTowerStetmann | CoopCasterStetmann / DeployPowerTowerStetmann / 2秒 | 生命5，视野12；2秒 |

## 当前 active 命令卡露出产物缺 CUnit

说明：只扫描当前指挥官模块里已挂到单位命令卡 `AbilCmd="技能,命令"` 的 `CAbilTrain/CAbilWarpTrain/CAbilBuild/CAbilMorph` 产物。产物在当前模块、XM共享模块、XMFinal运行闭包和底层基础镜像都没有 `CUnit` 时列在这里；这类才是当前 Mod 玩家按钮链路的直接风险。XML 注释已在扫描前剔除。

- 无。

## 当前 active 外来生产链露出

说明：这些按钮的产物能在 XMFinal 运行闭包或官方合作镜像中解析，但生产者不属于该指挥官官方体系。它们不是“缺 CUnit”，更像跨指挥官命令卡污染或共享基础单位需要加选择门槛。

- 无。

## 当前 active 隐藏技能产物缺 CUnit

说明：这些产物在当前模块的技能 `InfoArray` 中存在，但没有发现对应命令卡 `AbilCmd="技能,命令"`。它们通常是旧官方/编辑器残留或未开放设计，默认不按玩家可点建筑按钮修。

- 无。

