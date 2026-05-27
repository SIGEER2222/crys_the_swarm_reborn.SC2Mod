# 指挥官细化文档入口

日期：2026-05-27

本目录按 18 个官方合作指挥官拆分。每个文档都以当前新版架构为前提，并按 `../模块拆分/` 的 11 个模块分别整理本指挥官自己的清单和待审计项。

本轮已按 `游戏数据/官方合作指挥官/commanders/<Commander>/` 的最新 JSON 重新生成，重点刷新 `heroes.json`、`units.json`、`buildings.json`、`command_cards.json` 的数量、清单和候选按钮。

统一口径：

1. 当前指挥官默认 15 级，不从 1 级开始。
2. 精通默认 6 项全部 30 点。
3. 威望默认只取正面收益，不直接启用官方 `PlayerPrestige`。
4. `full_units` 默认指向强度融合最终 roster，即 `power_fusion`。
5. `initial` 只用于官方基础状态审计和差异对照。
6. 具体实现前仍需追 CASC 闭包并补 `[XM_DBG]` 验证日志。
7. `heroes.json` 只按当前 JSON 事实写入英雄模块；`heroes.json=0` 不代表官方玩法一定没有英雄，只代表本轮提取数据未直接列出，需要 CASC/实机补闭包。

## 当前数据覆盖

- heroes.json 已有条目：德哈卡/Dehaka=4，凯瑞甘/Kerrigan=1，泰凯斯/Tychus=9，扎加拉/Zagara=1。
- heroes.json 暂无条目：阿巴瑟/Abathur，阿拉纳克/Alarak，阿塔尼斯/Artanis，菲尼克斯/Fenix，霍纳与汉/Horner，凯拉克斯/Karax，蒙斯克/Mengsk，诺娃/Nova，雷诺/Raynor，斯台特曼/Stetmann，斯托科夫/Stukov，斯旺/Swann，沃拉尊/Vorazun，泽拉图/Zeratul。
- units/buildings 已按最新 JSON 重算；例如阿巴瑟当前是 `heroes=0 / units=12 / buildings=2`，不再沿用上一轮把利维坦写入 heroes.json 的旧判断。

| 序号 | 文档 | 指挥官 | heroes | units | buildings | roster | command cards | upgrades |
|---|---|---|---|---|---|---|---|---|
| 1 | `01-阿巴瑟-Abathur.md` | 阿巴瑟/Abathur | 0 | 12 | 2 | 14 | 12 | 22 |
| 2 | `02-阿拉纳克-Alarak.md` | 阿拉纳克/Alarak | 0 | 7 | 3 | 10 | 10 | 19 |
| 3 | `03-阿塔尼斯-Artanis.md` | 阿塔尼斯/Artanis | 0 | 7 | 5 | 12 | 12 | 28 |
| 4 | `04-德哈卡-Dehaka.md` | 德哈卡/Dehaka | 4 | 14 | 7 | 25 | 25 | 17 |
| 5 | `05-菲尼克斯-Fenix.md` | 菲尼克斯/Fenix | 0 | 8 | 4 | 12 | 12 | 19 |
| 6 | `06-霍纳与汉-Horner.md` | 霍纳与汉/Horner | 0 | 10 | 0 | 10 | 9 | 21 |
| 7 | `07-凯拉克斯-Karax.md` | 凯拉克斯/Karax | 0 | 8 | 5 | 13 | 13 | 26 |
| 8 | `08-凯瑞甘-Kerrigan.md` | 凯瑞甘/Kerrigan | 1 | 6 | 3 | 10 | 9 | 25 |
| 9 | `09-蒙斯克-Mengsk.md` | 蒙斯克/Mengsk | 0 | 16 | 11 | 27 | 27 | 14 |
| 10 | `10-诺娃-Nova.md` | 诺娃/Nova | 0 | 11 | 5 | 16 | 16 | 25 |
| 11 | `11-雷诺-Raynor.md` | 雷诺/Raynor | 0 | 10 | 6 | 16 | 15 | 33 |
| 12 | `12-斯台特曼-Stetmann.md` | 斯台特曼/Stetmann | 0 | 16 | 18 | 34 | 34 | 13 |
| 13 | `13-斯托科夫-Stukov.md` | 斯托科夫/Stukov | 0 | 6 | 9 | 15 | 14 | 29 |
| 14 | `14-斯旺-Swann.md` | 斯旺/Swann | 0 | 9 | 6 | 15 | 15 | 25 |
| 15 | `15-泰凯斯-Tychus.md` | 泰凯斯/Tychus | 9 | 2 | 3 | 14 | 14 | 20 |
| 16 | `16-沃拉尊-Vorazun.md` | 沃拉尊/Vorazun | 0 | 7 | 3 | 10 | 9 | 26 |
| 17 | `17-扎加拉-Zagara.md` | 扎加拉/Zagara | 1 | 6 | 2 | 9 | 8 | 23 |
| 18 | `18-泽拉图-Zeratul.md` | 泽拉图/Zeratul | 0 | 8 | 4 | 12 | 12 | 27 |

## 使用方式

先看单指挥官文档的 `01. 顶部技能栏` 到 `11. 指挥官个性化机制`，再回到 `../模块拆分/` 中对应模块补实现。每个指挥官文档是工作清单，不是最终闭包证明；标记为“候选”或“待审计”的内容必须继续追 `references/sc2-build-96883-casc-export/`、Requirement 闭包或实机日志。

注意：`command_cards.json` 中部分共享单位会带出其它指挥官的按钮或锁定提示，例如同一个 SCV、兵营、导弹塔对象上可能出现诺娃、斯旺、雷诺等不同 commander 的 Requirement。单指挥官文档中的按钮表只作为候选输入，真正实现时必须按当前 commander、15 级、六精通全满和威望正向融合后的 Requirement 过滤。

英雄模块同样是候选输入：如果 `heroes.json` 已有条目，则优先把对应 command card 技能归入 `02. 英雄单位及其技能`；如果 `heroes.json` 暂无条目但官方玩法存在英雄，例如诺娃、泽拉图、超级盖瑞、阿拉纳克、菲尼克斯，文档会继续标记为 CASC/实机待补。
