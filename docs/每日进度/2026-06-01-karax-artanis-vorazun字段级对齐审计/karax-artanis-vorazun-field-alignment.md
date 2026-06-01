# Karax / Artanis / Vorazun 字段级对齐审计

- 生成时间：2026/6/1 17:30:04
- 目的：补充现有 ID 缺口脚本的盲区，按“网上资料里的兵种技能/被动、建筑、顶部技能面板”做静态对齐审计。
- 口径：兵种技能/被动以仓内官方 `units.json` 为机器可读来源，并补入 StarCraft2Coop 页面明确列出的 Combat Units / Structures 漏项；建筑按 roster/catalog 存在性核对；顶部面板按当前 XMFinal caster command card 精确核对。
- 说明：`global-only` 表示技能按钮 ID 在当前 Mod 全局存在，但没有在候选单位的显式 LayoutButtons 中出现，可能来自父级继承、别名单位或待人工判断，不直接当作硬缺口。
- 注意：本报告是静态字段审计，不替代 SC2 实机验证。

## 总览

| 指挥官 | 在线资料 | 单位审计 | 建筑审计 | 兵种技能硬问题 | global-only 提醒 | 建筑问题 | 顶部面板问题 | 问题类型 |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| Karax | https://starcraft2coop.com/commanders/karax | 8 | 6 | 0 | 0 | 0 | 0 | 无 |
| Artanis | https://starcraft2coop.com/commanders/artanis | 9 | 5 | 0 | 0 | 0 | 0 | 无 |
| Vorazun | https://starcraft2coop.com/commanders/vorazun | 8 | 3 | 0 | 0 | 0 | 0 | 无 |

## Karax

- 模块：`XMKarax.SC2Mod`
- 在线资料：https://starcraft2coop.com/commanders/karax
- 单位审计：8（官方 JSON 8，在线补充 0）
- 建筑审计：6（官方 JSON 5，在线补充 1）
- 兵种技能硬问题：0
- global-only 提醒：0
- 建筑问题：0
- 顶部面板问题：0

### 顶部面板
- 未发现静态字段问题。

### 兵种技能/被动硬问题
- 未发现硬缺口。

### global-only 提醒
- 无。

### 建筑 roster/catalog
- 未发现硬缺口。

## Artanis

- 模块：`XMArtanis.SC2Mod`
- 在线资料：https://starcraft2coop.com/commanders/artanis
- 单位审计：9（官方 JSON 7，在线补充 2）
- 建筑审计：5（官方 JSON 5，在线补充 0）
- 兵种技能硬问题：0
- global-only 提醒：0
- 建筑问题：0
- 顶部面板问题：0

### 顶部面板
- 未发现静态字段问题。

### 兵种技能/被动硬问题
- 未发现硬缺口。

### global-only 提醒
- 无。

### 建筑 roster/catalog
- 未发现硬缺口。

## Vorazun

- 模块：`XMVorazun.SC2Mod`
- 在线资料：https://starcraft2coop.com/commanders/vorazun
- 单位审计：8（官方 JSON 7，在线补充 1）
- 建筑审计：3（官方 JSON 3，在线补充 0）
- 兵种技能硬问题：0
- global-only 提醒：0
- 建筑问题：0
- 顶部面板问题：0

### 顶部面板
- 未发现静态字段问题。

### 兵种技能/被动硬问题
- 未发现硬缺口。

### global-only 提醒
- 无。

### 建筑 roster/catalog
- 未发现硬缺口。
