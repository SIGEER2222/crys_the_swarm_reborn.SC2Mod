# 官方合作指挥官数据导出

## 口径

- 官方源：`游戏数据/官方合作指挥官/_source-cache/live-casc-export`
- 输出目录：`游戏数据/官方合作指挥官`
- 指挥官范围：18 个官方合作指挥官。
- 包含：科技面板兵种/建筑、英雄条目、命令面板按钮、图标引用、等级加点、威望、精通、关联升级。
- 中文文本优先读取 `zhCN`，缺失时回退 `enUS`。

## 总览

| 指挥官 | 兵种 | 建筑 | 英雄 | 其他 Tech 条目 | 等级加点 | 威望 | 精通 | 关联升级 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| 雷诺 / `Raynor` | 10 | 6 | 0 | 0 | 15 | 3 | 6 | 33 |
| 凯瑞甘 / `Kerrigan` | 5 | 4 | 1 | 0 | 15 | 3 | 6 | 25 |
| 阿塔尼斯 / `Artanis` | 6 | 6 | 0 | 0 | 15 | 3 | 6 | 28 |
| 斯旺 / `Swann` | 9 | 6 | 0 | 0 | 15 | 3 | 6 | 25 |
| 扎加拉 / `Zagara` | 5 | 3 | 1 | 0 | 15 | 3 | 6 | 23 |
| 沃拉尊 / `Vorazun` | 4 | 6 | 0 | 0 | 15 | 3 | 6 | 26 |
| 凯拉克斯 / `Karax` | 7 | 6 | 0 | 0 | 15 | 3 | 6 | 26 |
| 阿巴瑟 / `Abathur` | 10 | 4 | 1 | 0 | 15 | 3 | 6 | 22 |
| 阿拉纳克 / `Alarak` | 7 | 3 | 0 | 0 | 15 | 3 | 6 | 19 |
| 诺娃 / `Nova` | 11 | 5 | 0 | 0 | 15 | 3 | 6 | 25 |
| 斯托科夫 / `Stukov` | 5 | 10 | 0 | 0 | 15 | 3 | 6 | 29 |
| 菲尼克斯 / `Fenix` | 8 | 4 | 0 | 0 | 15 | 3 | 6 | 19 |
| 德哈卡 / `Dehaka` | 14 | 7 | 4 | 0 | 15 | 3 | 6 | 17 |
| 霍纳与汉 / `Horner` | 10 | 0 | 0 | 0 | 15 | 3 | 6 | 21 |
| 泰凯斯 / `Tychus` | 2 | 3 | 9 | 0 | 15 | 3 | 6 | 20 |
| 泽拉图 / `Zeratul` | 8 | 4 | 0 | 0 | 15 | 3 | 6 | 27 |
| 斯台特曼 / `Stetmann` | 16 | 18 | 0 | 0 | 15 | 3 | 6 | 13 |
| 蒙斯克 / `Mengsk` | 16 | 11 | 0 | 0 | 15 | 3 | 6 | 14 |

## 目录

- `commanders/<Commander>/commander.json`：指挥官基础信息、默认升级、默认能力命令。
- `commanders/<Commander>/roster.json`：官方 TechUnit 全量名册，含单位分类与单位元数据。
- `commanders/<Commander>/units.json` / `buildings.json` / `heroes.json`：按 `UnitData.EditorCategories.ObjectType` 切分，附带入口按钮与图标引用。
- `commanders/<Commander>/command_cards.json`：单位/建筑/英雄的 `CardLayouts` 面板按钮，含按钮图标引用。
- `commanders/<Commander>/progression.json`：15 级加点与 6 组精通。
- `commanders/<Commander>/prestiges.json`：3 个威望及其主升级、补充升级、禁用单位/技能。
- `commanders/<Commander>/upgrades.json`：默认升级、加点、精通、威望引用到的升级详情。
