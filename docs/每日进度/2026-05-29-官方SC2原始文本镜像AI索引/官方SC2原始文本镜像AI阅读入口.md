# 官方 SC2 原始文本镜像 AI 阅读入口

- 镜像根目录：`游戏数据/官方SC2原始文本镜像`
- 生成时间：2026/5/29 11:17:54
- 文件数量：19821
- 总大小：442.98 MB

## 硬规则

- `references/sc2-build-96883-casc-export` 以及旧 `references/official-casc-export` 已废弃，只能看历史文档时作为旧线索，不能再作为官方事实源。
- 当前官方原始文本事实源是 `游戏数据/官方SC2原始文本镜像`。
- `游戏数据/官方合作指挥官/commanders/<Commander>/` 是从官方源导出的易读 JSON，可用于快速读名册、数值和命令卡，但遇到闭包疑问要回查本镜像。
- 当前实现目标仍是 `合作指挥官版起义狂潮/`，不要把官方镜像或 `原始mod/` 当成可直接运行的 active 线。

## 术语速查

| 术语 | 含义 | 典型路径 |
| --- | --- | --- |
| StarCoop | 官方合作模式共享 Mod。大多数合作指挥官的单位、建筑、技能、精通、等级加点覆盖层都在这里。 | `mods/starcoop/starcoop.sc2mod` |
| Commander 子包 | 后期独立指挥官补充包，目前重点是斯台特曼和蒙斯克。 | `mods/starcoop/commanders/<Commander>.sc2mod` |
| AlliedCommanders | 合作模式共享包和本地化补充，通常作为辅助查证。 | `mods/alliedcommanders.sc2mod` |
| Catalog 覆盖层 | `unitdata/abildata/effectdata/...` 这类 XML。最终定义可能跨 StarCoop 与底层多人/战役模块叠加。 | `base.sc2data/gamedata/*.xml` |
| UserData | 合作模式结构化数据，等级加点、精通、TechUnit、ArmyCategory 常从这里起步。 | `base.sc2data/gamedata/userdata.xml` |
| 本地化 | 中文名称、按钮说明、tooltip。中文优先查 `zhcn`，缺失时再看英文。 | `zhcn.sc2data/localizeddata/*.txt` |
| 触发器脚本 | 合作模式运行时触发、UI 和部分机制逻辑。Catalog 查不到闭包时继续看这里。 | `base.sc2data/*.galaxy`、`base.sc2data/triggerlibs/**/*.galaxy` |

## 最常用入口

| 路径 | 存在 | 用途 |
| --- | --- | --- |
| export-summary.json | 是 | 镜像导出摘要 |
| casc-export-file-list.txt | 是 | 原始 CASC 文本文件清单 |
| mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata | 是 | 官方合作通用 Catalog 主入口 |
| mods/starcoop/starcoop.sc2mod/base.sc2data/includes.xml | 是 | 官方合作 Galaxy include 入口 |
| mods/starcoop/starcoop.sc2mod/base.sc2data/libcomu.galaxy | 是 | 官方合作通用运行时脚本 |
| mods/starcoop/starcoop.sc2mod/base.sc2data/triggerlibs | 是 | 官方合作触发器库 |
| mods/starcoop/starcoop.sc2mod/zhcn.sc2data/localizeddata | 是 | 官方合作简中本地化 |
| mods/starcoop/commanders/egonstetmann.sc2mod/base.sc2data/gamedata | 是 | 斯台特曼独立官方 Catalog |
| mods/starcoop/commanders/arcturusmengsk.sc2mod/base.sc2data/gamedata | 是 | 蒙斯克独立官方 Catalog |
| mods/alliedcommanders.sc2mod | 是 | 合作模式共享包/本地化补充 |
| mods/voidmulti.sc2mod/base.sc2data/gamedata | 是 | 虚空多人基础覆盖层 |
| mods/swarmmulti.sc2mod/base.sc2data/gamedata | 是 | 虫群多人基础覆盖层 |
| mods/libertymulti.sc2mod/base.sc2data/gamedata | 是 | 自由多人基础覆盖层 |
| mods/core.sc2mod/base.sc2data/gamedata | 是 | 最底层核心 Catalog |

## 合作指挥官读取顺序

1. 先读 `游戏数据/官方合作指挥官/commanders/<Commander>/` 的 JSON，拿中文名、单位 ID、数值、命令卡和生产链候选。
2. 追官方合作通用 Catalog 时读 `mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/`。
3. 斯台特曼、蒙斯克额外读 `mods/starcoop/commanders/egonstetmann.sc2mod/` 与 `mods/starcoop/commanders/arcturusmengsk.sc2mod/`。
4. 如果 `starcoop` 只是覆盖层，继续向底层 `voidmulti`、`void`、`swarmmulti`、`swarm`、`libertymulti`、`liberty`、`core` 追基础单位/技能。
5. 最后只把修复落到 `合作指挥官版起义狂潮/Mods/XM/<Commander>.SC2Mod` 或当前 owner 明确要求的 active 模块。

## 单位/建筑/技能排查路线

1. 从易读 JSON 或 `userdata.xml` 找指挥官名册、`TechUnit`、`ArmyCategory`、`CampaignPerk`、`MasteryUpgrades`。
2. 用单位/建筑 ID 到 `unitdata.xml` 查命令卡、生产者、武器、Behavior、升级引用；没有本地 `CUnit` 不等于缺失，可能继承自底层模块。
3. 用命令卡按钮追 `buttondata.xml`、`abildata.xml`、`requirementdata.xml`、`requirementnodedata.xml`，确认玩家是否真的能点、能训练、能变形、能建造。
4. 用技能或升级引用继续追 `effectdata.xml`、`behaviordata.xml`、`weapondata.xml`、`validatordata.xml`，确认数值加成和触发条件。
5. 如果 Catalog 链不完整，再查 `base.sc2data/*.galaxy` 与 `triggerlibs/**/*.galaxy`；最后才回到 active 线对照 `合作指挥官版起义狂潮/Mods/XM/`。

## 快速搜索命令

```powershell
rg -n 'CampaignPerk|MasteryUpgrades' '游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/userdata.xml' '游戏数据/官方SC2原始文本镜像/mods/starcoop/commanders'
rg -n '<CUnit id="BroodLord"|<CAbil.* id="MutaliskMorphToBroodLord"|MorphToBroodLord' '游戏数据/官方SC2原始文本镜像/mods/starcoop' '游戏数据/官方SC2原始文本镜像/mods/voidmulti.sc2mod' '游戏数据/官方SC2原始文本镜像/mods/swarmmulti.sc2mod'
rg -n 'KerriganVoidCoop|HydraliskLurker|BroodLord' '游戏数据/官方SC2原始文本镜像/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata'
```

## StarCoop 关键 Catalog 文件

| 文件 | 大小 | 用途 |
| --- | --- | --- |
| abildata.xml | 877.6 KB | 合作模式技能、训练、建造、变形 Catalog 覆盖层 |
| accumulatordata.xml | 2 KB | 其他 Catalog/数据文件 |
| achievementdata.xml | 0.1 KB | 其他 Catalog/数据文件 |
| achievementtermdata.xml | 0.1 KB | 其他 Catalog/数据文件 |
| actordata.xml | 3011.5 KB | Actor 事件、模型/音效/变形表现 |
| actorsupportdata.xml | 0.1 KB | 其他 Catalog/数据文件 |
| alertdata.xml | 1.1 KB | 其他 Catalog/数据文件 |
| armycategorydata.xml | 78.4 KB | 合作军队分类、TechUnit/ArmyCategory 关联 |
| armyunitdata.xml | 0.2 KB | 其他 Catalog/数据文件 |
| armyupgradedata.xml | 0.2 KB | 其他 Catalog/数据文件 |
| artifactdata.xml | 0.1 KB | 其他 Catalog/数据文件 |
| artifactslotdata.xml | 0.1 KB | 其他 Catalog/数据文件 |
| assets.txt | 5.9 KB | 其他 Catalog/数据文件 |
| attachmethoddata.xml | 4.5 KB | 其他 Catalog/数据文件 |
| bankconditiondata.xml | 0.1 KB | 其他 Catalog/数据文件 |
| beamdata.xml | 0.1 KB | 其他 Catalog/数据文件 |
| behaviordata.xml | 591.7 KB | Buff/Behavior、周期效果、属性修改 |
| boostdata.xml | 0.1 KB | 其他 Catalog/数据文件 |
| bundledata.xml | 0.1 KB | 其他 Catalog/数据文件 |
| buttondata.xml | 470.7 KB | 按钮图标、名称、tooltip key |
| cameradata.xml | 0.1 KB | 其他 Catalog/数据文件 |
| campaigndata.xml | 0.1 KB | 其他 Catalog/数据文件 |
| characterdata.xml | 8.6 KB | 其他 Catalog/数据文件 |
| cliffdata.xml | 0.1 KB | 其他 Catalog/数据文件 |
| cliffmeshdata.xml | 0.1 KB | 其他 Catalog/数据文件 |
| collectionskin.xml | 0.1 KB | 其他 Catalog/数据文件 |
| colorstyledata.xml | 0.1 KB | 其他 Catalog/数据文件 |
| commanderdata.xml | 1.9 KB | 合作指挥官选择与元信息 |
| configdata.xml | 0.1 KB | 其他 Catalog/数据文件 |
| consoleskindata.xml | 0.2 KB | 其他 Catalog/数据文件 |
| conversationdata.xml | 4492.3 KB | 其他 Catalog/数据文件 |
| conversationstatedata.xml | 0.1 KB | 其他 Catalog/数据文件 |
| cursordata.xml | 0.1 KB | 其他 Catalog/数据文件 |
| datacollectiondata.xml | 0.1 KB | 其他 Catalog/数据文件 |
| datacollectionpatterndata.xml | 0.1 KB | 其他 Catalog/数据文件 |
| decalpackdata.xml | 0.1 KB | 其他 Catalog/数据文件 |
| dspdata.xml | 0.1 KB | 其他 Catalog/数据文件 |
| effectdata.xml | 1475.8 KB | 伤害、搜索、创建、ApplyBehavior 等效果闭包 |
| emoticondata.xml | 0.1 KB | 其他 Catalog/数据文件 |
| emoticonpackdata.xml | 0.1 KB | 其他 Catalog/数据文件 |
| errordata.xml | 0.1 KB | 其他 Catalog/数据文件 |
| footprintdata.xml | 37.2 KB | 其他 Catalog/数据文件 |
| fowdata.xml | 0.1 KB | 其他 Catalog/数据文件 |
| futuremaps.xml | 0.1 KB | 其他 Catalog/数据文件 |
| gamedata.xml | 4 KB | 其他 Catalog/数据文件 |
| gameuidata.xml | 0.1 KB | 其他 Catalog/数据文件 |
| herddata.xml | 0.1 KB | 其他 Catalog/数据文件 |
| herdnodedata.xml | 0.1 KB | 其他 Catalog/数据文件 |
| heroabildata.xml | 0.1 KB | 其他 Catalog/数据文件 |
| herodata.xml | 0.1 KB | 其他 Catalog/数据文件 |
| herostatdata.xml | 0.1 KB | 其他 Catalog/数据文件 |
| itemclassdata.xml | 0.1 KB | 其他 Catalog/数据文件 |
| itemcontainerdata.xml | 0.1 KB | 其他 Catalog/数据文件 |
| itemdata.xml | 0.5 KB | 其他 Catalog/数据文件 |
| kineticdata.xml | 0.4 KB | 其他 Catalog/数据文件 |
| lensflaresetdata.xml | 0.1 KB | 其他 Catalog/数据文件 |
| lightdata.xml | 72.7 KB | 其他 Catalog/数据文件 |
| locationdata.xml | 0.2 KB | 其他 Catalog/数据文件 |
| lootdata.xml | 0.1 KB | 其他 Catalog/数据文件 |
| mapdata.xml | 2.7 KB | 其他 Catalog/数据文件 |
| modeldata.xml | 1642 KB | 模型资源引用 |
| mountdata.xml | 0.1 KB | 其他 Catalog/数据文件 |
| moverdata.xml | 88.1 KB | 其他 Catalog/数据文件 |
| objectivedata.xml | 10.7 KB | 其他 Catalog/数据文件 |
| physicsmaterialdata.xml | 0.1 KB | 其他 Catalog/数据文件 |
| pingdata.xml | 0.1 KB | 其他 Catalog/数据文件 |
| playerresponsedata.xml | 1.3 KB | 其他 Catalog/数据文件 |
| portraitpackdata.xml | 0.1 KB | 其他 Catalog/数据文件 |
| preloaddata.xml | 0.1 KB | 其他 Catalog/数据文件 |
| premiummapdata.xml | 0.1 KB | 其他 Catalog/数据文件 |
| racebannerpackdata.xml | 0.1 KB | 其他 Catalog/数据文件 |
| racedata.xml | 10.6 KB | 其他 Catalog/数据文件 |
| requirementdata.xml | 337.1 KB | 命令卡显示、解锁、科技前置 Requirement |
| requirementnodedata.xml | 606.9 KB | Requirement 节点细节 |
| reverbdata.xml | 0.1 KB | 其他 Catalog/数据文件 |
| rewarddata.xml | 0.1 KB | 其他 Catalog/数据文件 |
| sc2data.xml | 0.1 KB | 其他 Catalog/数据文件 |
| sc2events.xml | 0.1 KB | 其他 Catalog/数据文件 |
| scoreresultdata.xml | 0.1 KB | 其他 Catalog/数据文件 |
| scorevaluedata.xml | 0.1 KB | 其他 Catalog/数据文件 |
| shapedata.xml | 0.3 KB | 其他 Catalog/数据文件 |
| skindata.xml | 154.2 KB | 其他 Catalog/数据文件 |
| skinpackdata.xml | 0.1 KB | 其他 Catalog/数据文件 |
| sounddata.xml | 3173 KB | 其他 Catalog/数据文件 |
| soundexclusivitydata.xml | 6.3 KB | 其他 Catalog/数据文件 |
| soundmixsnapshotdata.xml | 1.3 KB | 其他 Catalog/数据文件 |
| soundtrackdata.xml | 1.4 KB | 其他 Catalog/数据文件 |
| spraydata.xml | 0.1 KB | 其他 Catalog/数据文件 |
| spraypackdata.xml | 0.1 KB | 其他 Catalog/数据文件 |
| stimpackdata.xml | 0.1 KB | 其他 Catalog/数据文件 |
| taccooldowndata.xml | 3.4 KB | 其他 Catalog/数据文件 |
| tacticaldata.xml | 0.1 KB | 其他 Catalog/数据文件 |
| talentdata.xml | 0.1 KB | 其他 Catalog/数据文件 |
| talentprofiledata.xml | 0.1 KB | 其他 Catalog/数据文件 |
| targetfinddata.xml | 0.4 KB | 其他 Catalog/数据文件 |
| targetsortdata.xml | 2.8 KB | 其他 Catalog/数据文件 |
| terraindata.xml | 0.2 KB | 其他 Catalog/数据文件 |
| terrainobjectdata.xml | 0.1 KB | 其他 Catalog/数据文件 |
| terraintexdata.xml | 0.1 KB | 其他 Catalog/数据文件 |
| texturedata.xml | 11.3 KB | 其他 Catalog/数据文件 |
| texturesheetdata.xml | 0.1 KB | 其他 Catalog/数据文件 |
| tiledata.xml | 0.2 KB | 其他 Catalog/数据文件 |
| trophydata.xml | 0.1 KB | 其他 Catalog/数据文件 |
| turretdata.xml | 3 KB | 其他 Catalog/数据文件 |
| unitdata.xml | 1753 KB | 合作模式单位/建筑 Catalog 覆盖层 |
| upgradedata.xml | 1269.3 KB | 等级、精通、科技升级实际 Effect 引用 |
| userdata.xml | 1599 KB | CampaignPerk、MasteryUpgrades、TechUnit 等合作模式结构化用户数据 |
| validatordata.xml | 317.4 KB | 其他 Catalog/数据文件 |
| voiceoverdata.xml | 141.3 KB | 其他 Catalog/数据文件 |
| voicepackdata.xml | 0.1 KB | 其他 Catalog/数据文件 |
| warchestdata.xml | 0.1 KB | 其他 Catalog/数据文件 |
| warchestseasondata.xml | 0.1 KB | 其他 Catalog/数据文件 |
| waterdata.xml | 0.1 KB | 其他 Catalog/数据文件 |
| weapondata.xml | 179.6 KB | 武器、攻击间隔、效果入口 |

## 关键模块 Catalog 文件索引

| 模块 | 文件 | 路径 |
| --- | --- | --- |
| mods/starcoop/starcoop.sc2mod | userdata.xml | mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/userdata.xml |
| mods/starcoop/starcoop.sc2mod | unitdata.xml | mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml |
| mods/starcoop/starcoop.sc2mod | abildata.xml | mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/abildata.xml |
| mods/starcoop/starcoop.sc2mod | upgradedata.xml | mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/upgradedata.xml |
| mods/starcoop/starcoop.sc2mod | requirementdata.xml | mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/requirementdata.xml |
| mods/starcoop/starcoop.sc2mod | requirementnodedata.xml | mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/requirementnodedata.xml |
| mods/starcoop/starcoop.sc2mod | effectdata.xml | mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/effectdata.xml |
| mods/starcoop/starcoop.sc2mod | behaviordata.xml | mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/behaviordata.xml |
| mods/starcoop/starcoop.sc2mod | buttondata.xml | mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/buttondata.xml |
| mods/starcoop/starcoop.sc2mod | weapondata.xml | mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/weapondata.xml |
| mods/starcoop/starcoop.sc2mod | actordata.xml | mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/actordata.xml |
| mods/starcoop/starcoop.sc2mod | modeldata.xml | mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/modeldata.xml |
| mods/starcoop/starcoop.sc2mod | commanderdata.xml | mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/commanderdata.xml |
| mods/starcoop/starcoop.sc2mod | armycategorydata.xml | mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/armycategorydata.xml |
| mods/starcoop/starcoop.sc2mod | commanders/futurecommanders.xml | mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/commanders/futurecommanders.xml |
| mods/starcoop/starcoop.sc2mod | commanders/commandertychus.xml | mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/commanders/commandertychus.xml |
| mods/starcoop/commanders/egonstetmann.sc2mod | userdata.xml | mods/starcoop/commanders/egonstetmann.sc2mod/base.sc2data/gamedata/userdata.xml |
| mods/starcoop/commanders/egonstetmann.sc2mod | unitdata.xml | mods/starcoop/commanders/egonstetmann.sc2mod/base.sc2data/gamedata/unitdata.xml |
| mods/starcoop/commanders/egonstetmann.sc2mod | abildata.xml | mods/starcoop/commanders/egonstetmann.sc2mod/base.sc2data/gamedata/abildata.xml |
| mods/starcoop/commanders/egonstetmann.sc2mod | upgradedata.xml | mods/starcoop/commanders/egonstetmann.sc2mod/base.sc2data/gamedata/upgradedata.xml |
| mods/starcoop/commanders/egonstetmann.sc2mod | requirementdata.xml | mods/starcoop/commanders/egonstetmann.sc2mod/base.sc2data/gamedata/requirementdata.xml |
| mods/starcoop/commanders/egonstetmann.sc2mod | requirementnodedata.xml | mods/starcoop/commanders/egonstetmann.sc2mod/base.sc2data/gamedata/requirementnodedata.xml |
| mods/starcoop/commanders/egonstetmann.sc2mod | effectdata.xml | mods/starcoop/commanders/egonstetmann.sc2mod/base.sc2data/gamedata/effectdata.xml |
| mods/starcoop/commanders/egonstetmann.sc2mod | behaviordata.xml | mods/starcoop/commanders/egonstetmann.sc2mod/base.sc2data/gamedata/behaviordata.xml |
| mods/starcoop/commanders/egonstetmann.sc2mod | buttondata.xml | mods/starcoop/commanders/egonstetmann.sc2mod/base.sc2data/gamedata/buttondata.xml |
| mods/starcoop/commanders/egonstetmann.sc2mod | weapondata.xml | mods/starcoop/commanders/egonstetmann.sc2mod/base.sc2data/gamedata/weapondata.xml |
| mods/starcoop/commanders/egonstetmann.sc2mod | actordata.xml | mods/starcoop/commanders/egonstetmann.sc2mod/base.sc2data/gamedata/actordata.xml |
| mods/starcoop/commanders/egonstetmann.sc2mod | modeldata.xml | mods/starcoop/commanders/egonstetmann.sc2mod/base.sc2data/gamedata/modeldata.xml |
| mods/starcoop/commanders/arcturusmengsk.sc2mod | userdata.xml | mods/starcoop/commanders/arcturusmengsk.sc2mod/base.sc2data/gamedata/userdata.xml |
| mods/starcoop/commanders/arcturusmengsk.sc2mod | unitdata.xml | mods/starcoop/commanders/arcturusmengsk.sc2mod/base.sc2data/gamedata/unitdata.xml |
| mods/starcoop/commanders/arcturusmengsk.sc2mod | abildata.xml | mods/starcoop/commanders/arcturusmengsk.sc2mod/base.sc2data/gamedata/abildata.xml |
| mods/starcoop/commanders/arcturusmengsk.sc2mod | upgradedata.xml | mods/starcoop/commanders/arcturusmengsk.sc2mod/base.sc2data/gamedata/upgradedata.xml |
| mods/starcoop/commanders/arcturusmengsk.sc2mod | requirementdata.xml | mods/starcoop/commanders/arcturusmengsk.sc2mod/base.sc2data/gamedata/requirementdata.xml |
| mods/starcoop/commanders/arcturusmengsk.sc2mod | requirementnodedata.xml | mods/starcoop/commanders/arcturusmengsk.sc2mod/base.sc2data/gamedata/requirementnodedata.xml |
| mods/starcoop/commanders/arcturusmengsk.sc2mod | effectdata.xml | mods/starcoop/commanders/arcturusmengsk.sc2mod/base.sc2data/gamedata/effectdata.xml |
| mods/starcoop/commanders/arcturusmengsk.sc2mod | behaviordata.xml | mods/starcoop/commanders/arcturusmengsk.sc2mod/base.sc2data/gamedata/behaviordata.xml |
| mods/starcoop/commanders/arcturusmengsk.sc2mod | buttondata.xml | mods/starcoop/commanders/arcturusmengsk.sc2mod/base.sc2data/gamedata/buttondata.xml |
| mods/starcoop/commanders/arcturusmengsk.sc2mod | weapondata.xml | mods/starcoop/commanders/arcturusmengsk.sc2mod/base.sc2data/gamedata/weapondata.xml |
| mods/starcoop/commanders/arcturusmengsk.sc2mod | actordata.xml | mods/starcoop/commanders/arcturusmengsk.sc2mod/base.sc2data/gamedata/actordata.xml |
| mods/starcoop/commanders/arcturusmengsk.sc2mod | modeldata.xml | mods/starcoop/commanders/arcturusmengsk.sc2mod/base.sc2data/gamedata/modeldata.xml |
| mods/starcoop/commanders/arcturusmengsk.sc2mod | commanderdata.xml | mods/starcoop/commanders/arcturusmengsk.sc2mod/base.sc2data/gamedata/commanderdata.xml |
| mods/starcoop/commanders/arcturusmengsk.sc2mod | armycategorydata.xml | mods/starcoop/commanders/arcturusmengsk.sc2mod/base.sc2data/gamedata/armycategorydata.xml |
| mods/voidmulti.sc2mod | userdata.xml | mods/voidmulti.sc2mod/base.sc2data/gamedata/userdata.xml |
| mods/voidmulti.sc2mod | unitdata.xml | mods/voidmulti.sc2mod/base.sc2data/gamedata/unitdata.xml |
| mods/voidmulti.sc2mod | abildata.xml | mods/voidmulti.sc2mod/base.sc2data/gamedata/abildata.xml |
| mods/voidmulti.sc2mod | upgradedata.xml | mods/voidmulti.sc2mod/base.sc2data/gamedata/upgradedata.xml |
| mods/voidmulti.sc2mod | requirementdata.xml | mods/voidmulti.sc2mod/base.sc2data/gamedata/requirementdata.xml |
| mods/voidmulti.sc2mod | requirementnodedata.xml | mods/voidmulti.sc2mod/base.sc2data/gamedata/requirementnodedata.xml |
| mods/voidmulti.sc2mod | effectdata.xml | mods/voidmulti.sc2mod/base.sc2data/gamedata/effectdata.xml |
| mods/voidmulti.sc2mod | behaviordata.xml | mods/voidmulti.sc2mod/base.sc2data/gamedata/behaviordata.xml |
| mods/voidmulti.sc2mod | buttondata.xml | mods/voidmulti.sc2mod/base.sc2data/gamedata/buttondata.xml |
| mods/voidmulti.sc2mod | weapondata.xml | mods/voidmulti.sc2mod/base.sc2data/gamedata/weapondata.xml |
| mods/voidmulti.sc2mod | actordata.xml | mods/voidmulti.sc2mod/base.sc2data/gamedata/actordata.xml |
| mods/voidmulti.sc2mod | modeldata.xml | mods/voidmulti.sc2mod/base.sc2data/gamedata/modeldata.xml |
| mods/voidmulti.sc2mod | commanderdata.xml | mods/voidmulti.sc2mod/base.sc2data/gamedata/commanderdata.xml |
| mods/voidmulti.sc2mod | armycategorydata.xml | mods/voidmulti.sc2mod/base.sc2data/gamedata/armycategorydata.xml |
| mods/void.sc2mod | userdata.xml | mods/void.sc2mod/base.sc2data/gamedata/userdata.xml |
| mods/void.sc2mod | unitdata.xml | mods/void.sc2mod/base.sc2data/gamedata/unitdata.xml |
| mods/void.sc2mod | abildata.xml | mods/void.sc2mod/base.sc2data/gamedata/abildata.xml |
| mods/void.sc2mod | upgradedata.xml | mods/void.sc2mod/base.sc2data/gamedata/upgradedata.xml |
| mods/void.sc2mod | requirementdata.xml | mods/void.sc2mod/base.sc2data/gamedata/requirementdata.xml |
| mods/void.sc2mod | requirementnodedata.xml | mods/void.sc2mod/base.sc2data/gamedata/requirementnodedata.xml |
| mods/void.sc2mod | effectdata.xml | mods/void.sc2mod/base.sc2data/gamedata/effectdata.xml |
| mods/void.sc2mod | behaviordata.xml | mods/void.sc2mod/base.sc2data/gamedata/behaviordata.xml |
| mods/void.sc2mod | buttondata.xml | mods/void.sc2mod/base.sc2data/gamedata/buttondata.xml |
| mods/void.sc2mod | weapondata.xml | mods/void.sc2mod/base.sc2data/gamedata/weapondata.xml |
| mods/void.sc2mod | actordata.xml | mods/void.sc2mod/base.sc2data/gamedata/actordata.xml |
| mods/void.sc2mod | modeldata.xml | mods/void.sc2mod/base.sc2data/gamedata/modeldata.xml |
| mods/void.sc2mod | commanderdata.xml | mods/void.sc2mod/base.sc2data/gamedata/commanderdata.xml |
| mods/void.sc2mod | armycategorydata.xml | mods/void.sc2mod/base.sc2data/gamedata/armycategorydata.xml |
| mods/swarmmulti.sc2mod | userdata.xml | mods/swarmmulti.sc2mod/base.sc2data/gamedata/userdata.xml |
| mods/swarmmulti.sc2mod | unitdata.xml | mods/swarmmulti.sc2mod/base.sc2data/gamedata/unitdata.xml |
| mods/swarmmulti.sc2mod | abildata.xml | mods/swarmmulti.sc2mod/base.sc2data/gamedata/abildata.xml |
| mods/swarmmulti.sc2mod | upgradedata.xml | mods/swarmmulti.sc2mod/base.sc2data/gamedata/upgradedata.xml |
| mods/swarmmulti.sc2mod | requirementdata.xml | mods/swarmmulti.sc2mod/base.sc2data/gamedata/requirementdata.xml |
| mods/swarmmulti.sc2mod | requirementnodedata.xml | mods/swarmmulti.sc2mod/base.sc2data/gamedata/requirementnodedata.xml |
| mods/swarmmulti.sc2mod | effectdata.xml | mods/swarmmulti.sc2mod/base.sc2data/gamedata/effectdata.xml |
| mods/swarmmulti.sc2mod | behaviordata.xml | mods/swarmmulti.sc2mod/base.sc2data/gamedata/behaviordata.xml |
| mods/swarmmulti.sc2mod | buttondata.xml | mods/swarmmulti.sc2mod/base.sc2data/gamedata/buttondata.xml |
| mods/swarmmulti.sc2mod | weapondata.xml | mods/swarmmulti.sc2mod/base.sc2data/gamedata/weapondata.xml |
| mods/swarmmulti.sc2mod | actordata.xml | mods/swarmmulti.sc2mod/base.sc2data/gamedata/actordata.xml |
| mods/swarmmulti.sc2mod | modeldata.xml | mods/swarmmulti.sc2mod/base.sc2data/gamedata/modeldata.xml |
| mods/swarmmulti.sc2mod | commanderdata.xml | mods/swarmmulti.sc2mod/base.sc2data/gamedata/commanderdata.xml |
| mods/swarmmulti.sc2mod | armycategorydata.xml | mods/swarmmulti.sc2mod/base.sc2data/gamedata/armycategorydata.xml |
| mods/swarm.sc2mod | userdata.xml | mods/swarm.sc2mod/base.sc2data/gamedata/userdata.xml |
| mods/swarm.sc2mod | unitdata.xml | mods/swarm.sc2mod/base.sc2data/gamedata/unitdata.xml |
| mods/swarm.sc2mod | abildata.xml | mods/swarm.sc2mod/base.sc2data/gamedata/abildata.xml |
| mods/swarm.sc2mod | upgradedata.xml | mods/swarm.sc2mod/base.sc2data/gamedata/upgradedata.xml |
| mods/swarm.sc2mod | requirementdata.xml | mods/swarm.sc2mod/base.sc2data/gamedata/requirementdata.xml |
| mods/swarm.sc2mod | requirementnodedata.xml | mods/swarm.sc2mod/base.sc2data/gamedata/requirementnodedata.xml |
| mods/swarm.sc2mod | effectdata.xml | mods/swarm.sc2mod/base.sc2data/gamedata/effectdata.xml |
| mods/swarm.sc2mod | behaviordata.xml | mods/swarm.sc2mod/base.sc2data/gamedata/behaviordata.xml |
| mods/swarm.sc2mod | buttondata.xml | mods/swarm.sc2mod/base.sc2data/gamedata/buttondata.xml |
| mods/swarm.sc2mod | weapondata.xml | mods/swarm.sc2mod/base.sc2data/gamedata/weapondata.xml |
| mods/swarm.sc2mod | actordata.xml | mods/swarm.sc2mod/base.sc2data/gamedata/actordata.xml |
| mods/swarm.sc2mod | modeldata.xml | mods/swarm.sc2mod/base.sc2data/gamedata/modeldata.xml |
| mods/swarm.sc2mod | commanderdata.xml | mods/swarm.sc2mod/base.sc2data/gamedata/commanderdata.xml |
| mods/swarm.sc2mod | armycategorydata.xml | mods/swarm.sc2mod/base.sc2data/gamedata/armycategorydata.xml |
| mods/libertymulti.sc2mod | userdata.xml | mods/libertymulti.sc2mod/base.sc2data/gamedata/userdata.xml |
| mods/libertymulti.sc2mod | unitdata.xml | mods/libertymulti.sc2mod/base.sc2data/gamedata/unitdata.xml |
| mods/libertymulti.sc2mod | abildata.xml | mods/libertymulti.sc2mod/base.sc2data/gamedata/abildata.xml |
| mods/libertymulti.sc2mod | upgradedata.xml | mods/libertymulti.sc2mod/base.sc2data/gamedata/upgradedata.xml |
| mods/libertymulti.sc2mod | requirementdata.xml | mods/libertymulti.sc2mod/base.sc2data/gamedata/requirementdata.xml |
| mods/libertymulti.sc2mod | requirementnodedata.xml | mods/libertymulti.sc2mod/base.sc2data/gamedata/requirementnodedata.xml |
| mods/libertymulti.sc2mod | effectdata.xml | mods/libertymulti.sc2mod/base.sc2data/gamedata/effectdata.xml |
| mods/libertymulti.sc2mod | behaviordata.xml | mods/libertymulti.sc2mod/base.sc2data/gamedata/behaviordata.xml |
| mods/libertymulti.sc2mod | buttondata.xml | mods/libertymulti.sc2mod/base.sc2data/gamedata/buttondata.xml |
| mods/libertymulti.sc2mod | weapondata.xml | mods/libertymulti.sc2mod/base.sc2data/gamedata/weapondata.xml |
| mods/libertymulti.sc2mod | actordata.xml | mods/libertymulti.sc2mod/base.sc2data/gamedata/actordata.xml |
| mods/libertymulti.sc2mod | modeldata.xml | mods/libertymulti.sc2mod/base.sc2data/gamedata/modeldata.xml |
| mods/libertymulti.sc2mod | commanderdata.xml | mods/libertymulti.sc2mod/base.sc2data/gamedata/commanderdata.xml |
| mods/libertymulti.sc2mod | armycategorydata.xml | mods/libertymulti.sc2mod/base.sc2data/gamedata/armycategorydata.xml |
| mods/liberty.sc2mod | userdata.xml | mods/liberty.sc2mod/base.sc2data/gamedata/userdata.xml |
| mods/liberty.sc2mod | unitdata.xml | mods/liberty.sc2mod/base.sc2data/gamedata/unitdata.xml |
| mods/liberty.sc2mod | abildata.xml | mods/liberty.sc2mod/base.sc2data/gamedata/abildata.xml |
| mods/liberty.sc2mod | upgradedata.xml | mods/liberty.sc2mod/base.sc2data/gamedata/upgradedata.xml |
| mods/liberty.sc2mod | requirementdata.xml | mods/liberty.sc2mod/base.sc2data/gamedata/requirementdata.xml |
| mods/liberty.sc2mod | requirementnodedata.xml | mods/liberty.sc2mod/base.sc2data/gamedata/requirementnodedata.xml |
| mods/liberty.sc2mod | effectdata.xml | mods/liberty.sc2mod/base.sc2data/gamedata/effectdata.xml |
| mods/liberty.sc2mod | behaviordata.xml | mods/liberty.sc2mod/base.sc2data/gamedata/behaviordata.xml |
| mods/liberty.sc2mod | buttondata.xml | mods/liberty.sc2mod/base.sc2data/gamedata/buttondata.xml |
| mods/liberty.sc2mod | weapondata.xml | mods/liberty.sc2mod/base.sc2data/gamedata/weapondata.xml |
| mods/liberty.sc2mod | actordata.xml | mods/liberty.sc2mod/base.sc2data/gamedata/actordata.xml |
| mods/liberty.sc2mod | modeldata.xml | mods/liberty.sc2mod/base.sc2data/gamedata/modeldata.xml |
| mods/liberty.sc2mod | commanderdata.xml | mods/liberty.sc2mod/base.sc2data/gamedata/commanderdata.xml |
| mods/liberty.sc2mod | armycategorydata.xml | mods/liberty.sc2mod/base.sc2data/gamedata/armycategorydata.xml |
| mods/core.sc2mod | userdata.xml | mods/core.sc2mod/base.sc2data/gamedata/userdata.xml |
| mods/core.sc2mod | unitdata.xml | mods/core.sc2mod/base.sc2data/gamedata/unitdata.xml |
| mods/core.sc2mod | abildata.xml | mods/core.sc2mod/base.sc2data/gamedata/abildata.xml |
| mods/core.sc2mod | upgradedata.xml | mods/core.sc2mod/base.sc2data/gamedata/upgradedata.xml |
| mods/core.sc2mod | requirementdata.xml | mods/core.sc2mod/base.sc2data/gamedata/requirementdata.xml |
| mods/core.sc2mod | requirementnodedata.xml | mods/core.sc2mod/base.sc2data/gamedata/requirementnodedata.xml |
| mods/core.sc2mod | effectdata.xml | mods/core.sc2mod/base.sc2data/gamedata/effectdata.xml |
| mods/core.sc2mod | behaviordata.xml | mods/core.sc2mod/base.sc2data/gamedata/behaviordata.xml |
| mods/core.sc2mod | buttondata.xml | mods/core.sc2mod/base.sc2data/gamedata/buttondata.xml |
| mods/core.sc2mod | weapondata.xml | mods/core.sc2mod/base.sc2data/gamedata/weapondata.xml |
| mods/core.sc2mod | actordata.xml | mods/core.sc2mod/base.sc2data/gamedata/actordata.xml |
| mods/core.sc2mod | modeldata.xml | mods/core.sc2mod/base.sc2data/gamedata/modeldata.xml |
| mods/core.sc2mod | commanderdata.xml | mods/core.sc2mod/base.sc2data/gamedata/commanderdata.xml |
| mods/core.sc2mod | armycategorydata.xml | mods/core.sc2mod/base.sc2data/gamedata/armycategorydata.xml |

## mods 目录概览

| 模块 | 文件数 | 大小 |
| --- | --- | --- |
| alliedcommanders.sc2mod | 16 | 0 MB |
| balancemulti.sc2mod | 173 | 2.65 MB |
| balancemultilanmethodcleanedup.sc2mod | 168 | 2.53 MB |
| balancemultislowwarpprism.sc2mod | 168 | 2.49 MB |
| challenges.sc2mod | 36 | 0.26 MB |
| core.sc2mod | 1035 | 28.76 MB |
| frontiers.sc2mod | 21 | 0.46 MB |
| glue.sc2mod | 169 | 0.01 MB |
| liberty.sc2mod | 219 | 30.15 MB |
| libertymulti.sc2mod | 173 | 0.36 MB |
| missionpacks | 167 | 9.9 MB |
| mutators | 7390 | 1.34 MB |
| novastoryassets.sc2mod | 594 | 22.33 MB |
| starcoop | 431 | 86.47 MB |
| swarm.sc2mod | 213 | 10.43 MB |
| swarmmulti.sc2mod | 164 | 0.97 MB |
| void.sc2mod | 215 | 15.4 MB |
| voidmulti.sc2mod | 173 | 3.1 MB |
| voidprologue.sc2mod | 111 | 5.3 MB |
| war3.sc2mod | 1 | 0.11 MB |
| war3data.sc2mod | 91 | 11.63 MB |
| warcoop | 926 | 23.08 MB |

## campaigns 目录概览

| 模块 | 文件数 | 大小 |
| --- | --- | --- |
| liberty.sc2campaign | 1470 | 35.8 MB |
| libertystory.sc2campaign | 175 | 14.26 MB |
| swarm.sc2campaign | 1734 | 35.18 MB |
| swarmstory.sc2campaign | 180 | 22.7 MB |
| swarmstoryutil.sc2mod | 53 | 1.46 MB |
| void.sc2campaign | 1283 | 46.92 MB |
| voidstory.sc2campaign | 182 | 27.28 MB |

## 文件类型统计

| 扩展名 | 文件数 | 大小 |
| --- | --- | --- |
| .txt | 11572 | 238.3 MB |
| .xml | 4203 | 133.76 MB |
| .version | 2058 | 0.08 MB |
| .galaxy | 1048 | 55.08 MB |
| .sc2layout | 542 | 13.97 MB |
| .sc2components | 372 | 0.41 MB |
| .sc2style | 23 | 0.59 MB |
| .json | 2 | 0.79 MB |
| .sc2locale | 1 | 0 MB |

## 注意点

- `zhcn.sc2data/localizeddata/*.txt` 是简中本地化，`zhtw.sc2data` 是繁中。需要中文名和 tooltip 时优先查简中。
- `base.sc2data/gamedata/*.xml` 是 Catalog 覆盖层。一个单位的最终定义可能分散在多个模块，不能只看首次命中的文件。
- `preloadassetdb.txt` 更像资源/ID 预载清单，不能单独证明单位可生产、技能可点击。
- 历史文档中写 `references/sc2-build-96883-casc-export` 或 `references/official-casc-export` 的地方，需要按本文件重新映射到 `游戏数据/官方SC2原始文本镜像`。
