# Karax / Artanis / Vorazun 字段级对齐审计

- 生成时间：2026/6/2 08:47:27
- 目的：补充现有 ID 缺口脚本的盲区，按“网上资料里的兵种技能/被动、建筑、顶部技能面板”做静态对齐审计。
- 口径：兵种技能/被动以仓内官方 `units.json` 为机器可读来源，并补入 StarCraft2Coop 页面明确列出的 Combat Units / Structures 漏项；在线主清单作为必须覆盖的子集，Observer 等支援/扩展项作为 supplemental 透明列出；非单位按钮承载的技能/被动以 `global_refs` 证明当前 Mod 全局 Catalog/脚本存在；建筑按 roster/catalog 存在性核对；顶部面板按当前 XMFinal caster command card 精确核对。
- 说明：`global-only` 表示技能按钮 ID 在当前 Mod 全局存在，但没有在候选单位的显式 LayoutButtons 中出现，可能来自父级继承、别名单位或待人工判断，不直接当作硬缺口。
- 说明：`global_refs` 表示在线技能/被动不是单位命令卡按钮本体，而是以升级、研究按钮、需求或测试台科技检查等全局 Catalog/脚本证据落地。
- 注意：本报告是静态字段审计，不替代 SC2 实机验证。

## 总览

| 指挥官 | 在线资料 | 单位审计 | 在线主单位 | 建筑审计 | 在线主建筑 | 兵种技能硬问题 | global-only 提醒 | 全局证据 | 全局证据缺失 | 建筑问题 | 顶部面板问题 | 问题类型 |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| Karax | https://starcraft2coop.com/commanders/karax | 8 | 6 | 6 | 3 | 0 | 0 | 0 | 0 | 0 | 0 | 无 |
| Artanis | https://starcraft2coop.com/commanders/artanis | 9 | 8 | 5 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 无 |
| Vorazun | https://starcraft2coop.com/commanders/vorazun | 8 | 7 | 3 | 0 | 0 | 0 | 3 | 0 | 0 | 0 | 无 |

## Karax

- 模块：`XMKarax.SC2Mod`
- 在线资料：https://starcraft2coop.com/commanders/karax
- 单位审计：8（官方 JSON 8，在线补充 0）
- 在线主单位：6，问题 0；supplemental 单位 2
- 建筑审计：6（官方 JSON 5，在线补充 1）
- 在线主建筑：3，问题 0；supplemental 建筑 3
- 兵种技能硬问题：0
- global-only 提醒：0
- 全局技能/被动证据：0，缺失 0
- 建筑问题：0
- 顶部面板问题：0

### 顶部面板
- 未发现静态字段问题。

### 兵种技能/被动硬问题
- 未发现硬缺口。

### 在线主单位覆盖
- Sentinel `ZealotPurifier`、Energizer `SentryPurifier`、Immortal `ImmortalAiur`、Colossus `Colossus`、Mirage `PhoenixPurifier`、Carrier `Carrier`
- supplemental：侦测器 `Observer`、折跃侦察机 `Scout`

### global-only 提醒
- 无。

### 全局技能/被动证据
- 无。

### 建筑 roster/catalog
- 未发现硬缺口。

### 在线主建筑覆盖
- Photon Cannon `PhotonCannon`、Khaydarin Monolith `KhaydarinMonolith`、Shield Battery `ShieldBattery`
- supplemental：传送门 `Gateway`、太阳锻炉 `SolarForge`、光影议会 `TwilightCouncil`

## Artanis

- 模块：`XMArtanis.SC2Mod`
- 在线资料：https://starcraft2coop.com/commanders/artanis
- 单位审计：9（官方 JSON 7，在线补充 2）
- 在线主单位：8，问题 0；supplemental 单位 1
- 建筑审计：5（官方 JSON 5，在线补充 0）
- 在线主建筑：0，问题 0；supplemental 建筑 5
- 兵种技能硬问题：0
- global-only 提醒：0
- 全局技能/被动证据：0，缺失 0
- 建筑问题：0
- 顶部面板问题：0

### 顶部面板
- 未发现静态字段问题。

### 兵种技能/被动硬问题
- 未发现硬缺口。

### 在线主单位覆盖
- Zealot `Zealot`、Dragoon `StalkerAiur`、High Templar `HighTemplar`、Archon `Archon`、Immortal `ImmortalAiur`、Reaver `Reaver`、Phoenix `PhoenixAiur`、Tempest `Tempest`
- supplemental：侦测器 `Observer`

### global-only 提醒
- 无。

### 全局技能/被动证据
- 无。

### 建筑 roster/catalog
- 未发现硬缺口。

### 在线主建筑覆盖
- 该页面没有单独建模的在线主建筑清单。
- supplemental：传送门 `Gateway`、光子炮台 `PhotonCannon`、机械研究所 `RoboticsBay`、折跃机械台 `RoboticsWarpandStarWarpGate`、光影议会 `TwilightCouncil`

## Vorazun

- 模块：`XMVorazun.SC2Mod`
- 在线资料：https://starcraft2coop.com/commanders/vorazun
- 单位审计：8（官方 JSON 7，在线补充 2）
- 在线主单位：7，问题 0；supplemental 单位 1
- 建筑审计：3（官方 JSON 3，在线补充 0）
- 在线主建筑：0，问题 0；supplemental 建筑 3
- 兵种技能硬问题：0
- global-only 提醒：0
- 全局技能/被动证据：3，缺失 0
- 建筑问题：0
- 顶部面板问题：0

### 顶部面板
- 未发现静态字段问题。

### 兵种技能/被动硬问题
- 未发现硬缺口。

### 在线主单位覆盖
- Centurion `ZealotShakuras`、Stalker `Stalker`、Dark Templar `DarkTemplarShakuras`、Dark Archon `DarkArchon`、Corsair `PhoenixShakuras`、Void Ray `VoidRay`、Oracle `Oracle`
- supplemental：狂热者 `Zealot`

### global-only 提醒
- 无。

### 全局技能/被动证据
- 百夫长 `ZealotShakuras`：Shadow Charge upgrade package `VoidZealotShadowCharge`、Darkcoil upgrade `ZealotResearchShadowStun`、Darkcoil research button `ResearchShadowStun`

### 建筑 roster/catalog
- 未发现硬缺口。

### 在线主建筑覆盖
- 该页面没有单独建模的在线主建筑清单。
- supplemental：传送门 `Gateway`、光子炮台 `PhotonCannon`、光影议会 `TwilightCouncil`
