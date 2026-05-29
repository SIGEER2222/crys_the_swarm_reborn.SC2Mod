# 合作指挥官建筑单位逐个对比

- 生成时间：2026/5/29 11:40:27
- Wiki抓取目录：`D:\MyWork\新建文件夹\mom.report.client\artifacts\2026-05-29-starcraft-coop-commanders`
- 官方JSON目录：`D:\MyWork\新建文件夹\mom.report.client\src\MyMod\crys_the_swarm_reborn.SC2Mod\游戏数据\官方合作指挥官\commanders`
- 官方原始文本镜像：`D:\MyWork\新建文件夹\mom.report.client\src\MyMod\crys_the_swarm_reborn.SC2Mod\游戏数据\官方SC2原始文本镜像`
- 当前 active Mod：`D:\MyWork\新建文件夹\mom.report.client\src\MyMod\crys_the_swarm_reborn.SC2Mod\合作指挥官版起义狂潮`
- 目标：先建立逐指挥官建筑/单位对比基线，后续修复时直接从“优先排查项”进入 XML。

## 总览

| 指挥官 | 模块 | Wiki项 | 官方行 | Wiki未匹配官方 | 官方补充未在Wiki | 当前Mod未命中 | 仅文本命中 | 仅官方合作镜像 | 底层继承候选 | 生产链异常 | 生产链底层候选 | 当前技能产物缺CUnit | 单独报告 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 斯旺 / Swann | XMSwann.SC2Mod | 11 | 15 | 0 | 6 | 0 | 0 | 0 | 4 | 0 | 0 | 14 | by-commander/swann-斯旺-unit-building-compare.md |

## 全局优先排查项

- 无。

## 当前 active 技能产物缺 CUnit

| 指挥官 | 产物ID | 命中状态 | 引用技能 | 引用文件 |
| --- | --- | --- | --- | --- |
| 斯旺 / Swann | BansheeSwann | 当前模块仅引用：BansheeSwann | StarportTrainSwann | 合作指挥官版起义狂潮/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| 斯旺 / Swann | BattlecruiserSwann | 当前模块仅引用：BattlecruiserSwann | StarportTrainSwann | 合作指挥官版起义狂潮/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| 斯旺 / Swann | BomberLaunchPadSwann | 当前模块仅引用：BomberLaunchPadSwann | TerranBuildSwann | 合作指挥官版起义狂潮/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| 斯旺 / Swann | CycloneSwann | 当前模块仅引用：CycloneSwann | FactoryTrainSwann | 合作指挥官版起义狂潮/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| 斯旺 / Swann | DiamondbackSwann | 当前模块仅引用：DiamondbackSwann | FactoryTrainSwann | 合作指挥官版起义狂潮/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| 斯旺 / Swann | HellionSwann | 当前模块仅引用：HellionSwann | FactoryTrainSwann | 合作指挥官版起义狂潮/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| 斯旺 / Swann | HellionTankSwann | 当前模块仅引用：HellionTankSwann | FactoryTrainSwann | 合作指挥官版起义狂潮/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| 斯旺 / Swann | LiberatorSwann | 当前模块仅引用：LiberatorSwann | StarportTrainSwann | 合作指挥官版起义狂潮/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| 斯旺 / Swann | MedivacSwann | 当前模块仅引用：MedivacSwann | StarportTrainSwann | 合作指挥官版起义狂潮/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| 斯旺 / Swann | RavenSwann | 当前模块仅引用：RavenSwann | StarportTrainSwann | 合作指挥官版起义狂潮/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| 斯旺 / Swann | RefineryRichSwann | 当前模块仅引用：RefineryRichSwann | TerranBuildSwann | 合作指挥官版起义狂潮/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| 斯旺 / Swann | VikingFighterSwann | 当前模块仅引用：VikingFighterSwann | StarportTrainSwann | 合作指挥官版起义狂潮/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| 斯旺 / Swann | VultureSwann | 当前模块仅引用：VultureSwann | FactoryTrainSwann | 合作指挥官版起义狂潮/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/AbilData.xml |
| 斯旺 / Swann | WidowMineSwann | 当前模块仅引用：WidowMineSwann | FactoryTrainSwann | 合作指挥官版起义狂潮/Mods/XM/XMSwann.SC2Mod/Base.SC2Data/GameData/AbilData.xml |

## 说明

- `当前模块CUnit`：本指挥官模块直接定义，可信度最高。
- `XM共享模块CUnit`：`XMCore/XMFinal` 定义，通常可被当前 active 线使用。
- `底层基础镜像CUnit`：新官方镜像的战役/多人基础层存在。当前 active 线可能继承，但仍要按 `DocumentInfo` 和实机确认。
- `官方合作镜像CUnit`：StarCoop 官方合作层存在，但 active 线不会自动读这个目录；这类更像待迁移/待补 Catalog。
- `仅文本/引用命中`：XML/Galaxy 里出现过该 token，但没有同 ID `CUnit` 定义，通常要继续查依赖或补 Catalog。
- `Wiki未匹配官方JSON`：wiki主要部队名称没有映射到官方 JSON，优先补别名表或查是否是召唤物/建筑别称。
- `官方补充未在Wiki`：官方 JSON 有但 wiki主要部队未列，不一定是缺失，常见于工人、英雄、基础建筑或展示项。
