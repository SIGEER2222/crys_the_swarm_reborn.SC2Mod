# 官方与当前 Mod 单位/建筑/英雄技能对照

- 生成时间：2026/5/28 15:07:31
- 官方数据：`D:\MyWork\新建文件夹\mom.report.client\src\MyMod\crys_the_swarm_reborn.SC2Mod\游戏数据\官方合作指挥官\commanders`
- Mod 数据：`D:\MyWork\新建文件夹\mom.report.client\src\MyMod\crys_the_swarm_reborn.SC2Mod\合作指挥官版起义狂潮`
- 状态说明：`单位已定义`/`技能已定义` 表示当前 Mod XML 里有同 ID Catalog；`已命中`/`部分命中` 只表示文本引用存在，仍需进游戏或继续读 Catalog 链确认实际效果。

## Kerrigan / Kerrigan

- 模块：`XMKerrigan.SC2Mod`
- 模块存在：是

### 英雄单位与技能

#### 凯瑞甘（`K5Kerrigan`）

- 英雄状态：单位已定义：K5Kerrigan
- 生命/护盾：800 / 200

| 官方技能 | 按钮/技能ID | 类型 | 需求 | 当前 Mod | 说明 |
| --- | --- | --- | --- | --- | --- |
| K5ZerglingRespawn | K5ZerglingRespawn | Passive |  | 按钮已定义：K5ZerglingRespawn |  |
| K5Cooldowns | K5Cooldowns | Passive | HaveK5Cooldowns | 按钮已定义：K5Cooldowns |  |
| 刀锋女王 | CommanderKerriganKerriganEnergyRegeneration | Passive | HaveKerriganVoidCoopEnergyRegen | 按钮已定义：CommanderKerriganKerriganEnergyRegeneration | 凯瑞甘的能量恢复速度提高50%。 |
| 连锁反应 | KerriganChainLightning | 未知 | KerriganLevel09 | 按钮已定义：KerriganChainLightning | 该科技将在指挥官等级9时解锁。 |
| SpawnBanelings | SpawnBanelings / SpawnBanelings | AbilCmd |  | 技能已定义：SpawnBanelings |  |
| K5DropPods | K5DropPods / K5DropPods | AbilCmd |  | 技能已定义：K5DropPods |  |
| K5Fury | K5Fury | 未知 | HaveK5Fury | 按钮已定义：K5Fury |  |
| PrimalSlash | PrimalSlash / PrimalSlash | 未知 |  | 技能已定义：PrimalSlash | 凯瑞甘跳向目标并造成{Effect,PrimalSlash,Amount}点伤害。可以不指定目标发动技能来迅速移动。 |
| MindBolt | MindBolt / MindBolt | AbilCmd |  | 技能已定义：MindBolt |  |
| K5HeroicFortitude | K5HeroicFortitude | Passive | HaveK5HeroicFortitude | 按钮已定义：K5HeroicFortitude |  |
| PsiStrike | PsiStrike / PsiStrikeWalk | 未知 |  | 技能已定义：PsiStrikeWalk | 凯瑞甘飞速掠过敌人，并对其行进路线上的所有敌人造成{Effect,PsiStrikeDamage,Amount}点伤害。 |
| PsionicLift | PsionicLift / PsionicLift | 未知 |  | 技能已定义：PsionicLift | 目标区域中的敌人会昏迷，且在{time:[d ref='Effect,PsionicLiftControllerShort,D… |
| 吸收光环 | KerriganVoidCoopEconDrop / KerriganVoidCoopEconDrop | 未知 |  | 技能已定义：KerriganVoidCoopEconDrop | 附近所有被消灭的敌人掉落资源。效果持续{Behavior,KerriganVoidCoopEconDropCaster,Dur… |
| PrimalHeal | PrimalHeal / PrimalHeal | 未知 |  | 技能已定义：PrimalHeal |  |
| WildMutation | WildMutation / WildMutation | 未知 |  | 技能已定义：WildMutation |  |
| ChainReaction | ChainReaction | 未知 | HaveK5ChainLightning | 按钮已定义：ChainReaction |  |
| 技能专精 | K5CooldownsLocked | 未知 | KerriganLevel09 | 按钮已定义：K5CooldownsLocked | 该科技将在指挥官等级9时解锁。 |

### 作战单位
| 单位 | ID | 当前 Mod | 生产/变形来源 | 生产链 | 生命 | 人口 |
| --- | --- | --- | --- | --- | --- | --- |
| 巢虫领主 | BroodLord | 已命中 | Corruptor / MorphToBroodLord / 150晶体矿，150瓦斯，33.8332秒 | 部分命中：Corruptor | 225 | 4 |
| 刺蛇 | Hydralisk | 单位已定义：Hydralisk | Larva / LarvaTrain / 100晶体矿，50瓦斯，33秒 | 生产链已命中 | 90 | 2 |
| 异龙 | MutaliskBroodlord | 单位已定义：MutaliskBroodlord | Drone / ZergBuild / 92.4秒 | 生产链已命中 |  |  |
| 虫后 | SwarmQueen | 已命中 | Hatchery / TrainQueen / 50秒 | 生产链已命中 |  |  |
| 雷兽 | Ultralisk | 单位已定义：Ultralisk | Larva / LarvaTrain / 275晶体矿，200瓦斯，55秒 | 生产链已命中 | 500 | 6 |
| 跳虫 | Zergling | 单位已定义：Zergling | Larva / LarvaTrain / 25晶体矿，24秒 | 生产链已命中 | 35 | 0.5 |

### 建筑
| 建筑 | ID | 当前 Mod | 建造来源 | 建造链 | 生命 |
| --- | --- | --- | --- | --- | --- |
| 虫道网络 | NydusNetwork | 单位已定义：NydusNetwork | Drone / ZergBuild / 200晶体矿，150瓦斯，50秒 | 生产链已命中 | 850 |
| 脊针爬虫 | SpineCrawler | 已命中 | Drone / ZergBuild / 150晶体矿，50秒 | 生产链已命中 | 300 |
| 孢子爬虫 | SporeCrawler | 已命中 | Drone / ZergBuild / 125晶体矿，30秒 | 生产链已命中 | 300 |

