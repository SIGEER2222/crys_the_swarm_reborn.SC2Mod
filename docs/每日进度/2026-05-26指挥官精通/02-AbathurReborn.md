# 2026-05-26 AbathurReborn 指挥官加点与精通

`Upgrade` 保留内部 ID；效果对象和字段尽量使用中文名称，便于直接查看实际加成。

## 加点

### 1. 生物质收集
- 花费：10
- Upgrade：`AbathurRebornCommander`
- 描述：敌方非建筑单位死亡后掉落生物质，阿巴瑟单位靠近后可以拾取。
- 具体效果：
  - SpawnLarva：0延迟 -6
  - SpawnLarva：0最大数量 +3
  - 异虫建造：Build14建造需求 设为 拥有孵化场
  - 异虫建造：Build15建造需求 设为 拥有爆虫巢
  - 异虫建造：Build16建造需求 设为 拥有爆虫巢
  - 蟑螂：矿物消耗 +25
  - 蟑螂（潜地）：矿物消耗 +25
  - 蟑螂：瓦斯消耗 -25
  - 蟑螂（潜地）：瓦斯消耗 -25
  - 蟑螂尸体变体：矿物消耗 +25
  - 蟑螂尸体变体（潜地）：矿物消耗 +25
  - 蟑螂尸体变体：瓦斯消耗 -25
  - 蟑螂尸体变体（潜地）：瓦斯消耗 -25
  - 邪恶蟑螂：矿物消耗 +25
  - 邪恶蟑螂（潜地）：矿物消耗 +25
  - 邪恶蟑螂：瓦斯消耗 -25
  - 邪恶蟑螂（潜地）：瓦斯消耗 -25
  - 升级为虫穴：Execute命令需求 设为 拥有爆虫巢
  - 升级为主巢：Execute命令需求 设为 拥有感染深渊
  - 莽兽：矿物消耗 -500
  - 莽兽：瓦斯消耗 -300
  - 莽兽（潜地）：矿物消耗 -500
  - 莽兽（潜地）：瓦斯消耗 -300
  - 莽兽：补给占用 设为 -2
  - 莽兽（潜地）：补给占用 设为 -2
  - 利维坦：补给占用 设为 -2
  - 界面/名称/说明文本改动：14 条

### 2. 毒巢网络
- 花费：10
- Upgrade：`AbathurRebornBiomassLifeLeech`
- 描述：解锁毒巢投放，并启用毒巢充能与伏击链路。
- 具体效果：
  - 1层生物质：生命偷取（近战） +0.01
  - 1层生物质：生命偷取（远程） +0.01
  - 1层生物质：生命偷取（技能） +0.01
  - 1层生物质：生命偷取（溅射） +0.01
  - 10层生物质：生命偷取（近战） +0.10
  - 10层生物质：生命偷取（远程） +0.10
  - 10层生物质：生命偷取（技能） +0.10
  - 10层生物质：生命偷取（溅射） +0.10
  - 100层生物质：生命偷取（近战） +1.00
  - 100层生物质：生命偷取（远程） +1.00
  - 100层生物质：生命偷取（技能） +1.00
  - 100层生物质：生命偷取（溅射） +1.00
  - 界面/名称/说明文本改动：8 条

### 3. 共生体适应
- 花费：15
- Upgrade：`AbathurRebornImprovedToxicNest`
- 描述：共生体相关单位和效果解锁到正式强化状态。
- 具体效果：
  - 影响单位：剧毒巢穴
  - 孵化剧毒巢穴：Build1最大充能数 +2
  - 孵化剧毒巢穴：Build1充能时间 -5.000000
  - 孵化剧毒巢穴：Build1初始充能时间 -5.000000
  - 孵化剧毒巢穴：Build1初始充能数 +2

### 4. 进化腔升级
- 花费：15
- Upgrade：`AbathurRebornImprovedMend`
- 描述：开放阿巴瑟核心科技与关键升级链。
- 具体效果：
  - 影响单位：CoopCasterAbathurReborn
  - AbathurRebornMend：充能时间 +120.000000
  - AbathurRebornMend：每次消耗充能 +1
  - AbathurRebornMend：冷却时间 -150
  - AbathurRebornMend：初始充能数 +1
  - AbathurRebornMend：最大充能数 +3
  - 界面/名称/说明文本改动：2 条

### 5. 残暴进化
- 花费：20
- Upgrade：`AbathurRebornSymbiote`
- 描述：允许地面单位通过生物质阈值进化为残暴兽。
- 具体效果：
  - 最高等级：2

### 6. 空中终极进化
- 花费：20
- Upgrade：`AbathurRebornEnableSymbiote`
- 描述：允许空中单位通过生物质阈值进化为利维坦。
- 具体效果：
  - 影响单位：莽兽、利维坦
  - AbathurRebornSymbioteHangerBrutalisk：InfoArray[Ammo1].初始数量 +1
  - AbathurRebornSymbioteHangerLeviathan：InfoArray[Ammo1].初始数量 +1

### 7. 变异甲壳
- 花费：25
- Upgrade：`AbathurRebornMorphTimeCostReduced`
- 描述：强化高生物质单位的生存与持续作战能力。
- 具体效果：
  - 影响单位：蟑螂、邪恶蟑螂、异龙
  - 蟑螂变异为破坏者：Train1训练/建造时间 -4.5
  - 异龙变异为吞噬者：Train1训练/建造时间 -7.5
  - 异龙变异为守护者：Train1训练/建造时间 -7.5
  - 破坏者：矿物消耗 -12
  - 破坏者：瓦斯消耗 -37
  - RavagerAbathurRebornBurrowed：矿物消耗 -12
  - RavagerAbathurRebornBurrowed：瓦斯消耗 -37
  - 吞噬者：矿物消耗 -75
  - 吞噬者：瓦斯消耗 -25
  - 守护者：矿物消耗 -25
  - 守护者：瓦斯消耗 -50

### 8. 巢群强化
- 花费：30
- Upgrade：`AbathurRebornToxicNestIcreasedBiomass`
- 描述：完成阿巴瑟最终强化，巩固全军综合战力。
- 具体效果：
  - 影响单位：剧毒巢穴
  - 界面/名称/说明文本改动：2 条

## 精通

### 1. 生物质效率
- Upgrade：`MasteryAbathurRebornDoubleBiomass`
- 描述：提高生物质掉落、拾取与成长收益。
- 具体效果：
  - 最高等级：30
  - 生物质效率显示值：效果数值 +1.5

### 2. 毒巢强化
- Upgrade：`AbathurRebornToxicNestRespawnTalent`
- 描述：强化毒巢充能、爆发与相关衍生效果。
- 具体效果：
  - 影响单位：剧毒巢穴
  - 剧毒巢穴复生：触发概率 设为 0.6

### 3. 共生体强化
- Upgrade：`AbathurRebornImprovedMend`
- 描述：强化修复与共生体带来的持续收益。
- 具体效果：
  - 影响单位：CoopCasterAbathurReborn
  - AbathurRebornMend：充能时间 +120.000000
  - AbathurRebornMend：每次消耗充能 +1
  - AbathurRebornMend：冷却时间 -150
  - AbathurRebornMend：初始充能数 +1
  - AbathurRebornMend：最大充能数 +3
  - 界面/名称/说明文本改动：2 条

### 4. 终极进化生命值
- Upgrade：`MasteryAbathurRebornSymbioteCarapace`
- 描述：提高终极进化单位的生命值上限。
- 具体效果：
  - 最高等级：30
  - 终极进化生命值显示值：效果数值 +3.3334
  - 共生体甲壳：护盾上限 +6.6667
  - 共生体刺击伤害：效果数值 +0.6667

### 5. 进化单位攻击
- Upgrade：`MasteryAbathurRebornSymbioteCDR`
- 描述：提高进化单位与主力部队的攻击表现。
- 具体效果：
  - 最高等级：30
  - 进化单位攻击显示值：效果数值 +2
  - 共生体甲壳：冷却时间 -0.400000
  - 共生体刺击：冷却时间 -0.020000

### 6. 恢复强化
- Upgrade：`MasteryAbathurRebornBiomassRefund`
- 描述：提高恢复效果与持续作战续航。
- 具体效果：
  - 最高等级：30
  - 恢复强化显示值：效果数值 +1

