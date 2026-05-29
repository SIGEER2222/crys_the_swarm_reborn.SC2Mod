# 官方合作模式因子提取

## 结论

- 官方 `Mutators` 因子定义：`69`
- 单因子启用包：`63`
- 每周突变组合包：`176`
- 官方 `MutatorChallenges` 组合定义：`181`
- 已按名称回连到官方组合的组合包：`172`
- 暂未回连的组合包：`4`
- JSON 明细：`D:\MyWork\新建文件夹\mom.report.client\src\MyMod\crys_the_swarm_reborn.SC2Mod\docs\每日进度\2026-05-29-官方合作模式因子提取\official-coop-mutator-factors.json`

## 数据来源

- 原始文本镜像：`D:\MyWork\新建文件夹\mom.report.client\src\MyMod\crys_the_swarm_reborn.SC2Mod\游戏数据\官方SC2原始文本镜像`
- 因子定义：`mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/userdata.xml` 的 `CUser id="Mutators"`
- 每周突变组合：同文件的 `CUser id="MutatorChallenges"`
- 因子包启用证据：`mods/mutators/*/*.galaxy` 中的 `EnableDisableMutator` / `SetMutatorWeeklyChallengeOn`

## 因子主表

| 因子ID | 中文名 | 英文名 | 自定义可选 | 随机池 | 单因子包 | 中文说明 |
| --- | --- | --- | --- | --- | --- | --- |
| `AfraidOfTheDark` | 极度谨慎 | Extreme Caution | 否 | 否 | - | 你的单位不会接受你在他们看不见的地方所下达的任何命令。 |
| `AllEnemiesCloaked` | 来去无踪 | We Move Unseen | 是 | 是 | mutatorwemoveunseen.sc2mod | 所有敌方单位永久隐形。 |
| `Avenger` | 复仇战士 | Avenger | 是 | 是 | mutatoravenger.sc2mod | 当附近的敌方单位死亡时，敌方单位的攻击速度、移动速度、护甲、生命值以及生命回复速度提高。 |
| `Barrier` | 减伤屏障 | Barrier | 是 | 是 | mutatorbarrier.sc2mod | 敌方单位和建筑在第一次受到伤害时会获得一个临时护盾。 |
| `BlackFog` | 暗无天日 | Darkness | 是 | 是 | mutatordarkness.sc2mod | 先前探索过的区域若离开了玩家的视野范围将会重新变成一片黑色。 |
| `Blizzard` | 暴风雪 | Blizzard | 是 | 是 | mutatorblizzard.sc2mod | 风暴雷云在地图上飘荡，对位于其行进路线上的玩家单位造成伤害并将其冻结。 |
| `BoomBots` | 炸弹机器人 | Boom Bots | 是 | 否 | mutatorboombots.sc2mod | 对一切都毫不在意的机器人携带着聚变弹头朝你的基地进发。一名玩家必须识别出拆弹的顺序，另一名玩家则必须正确输入才能解除危机。 |
| `ConcussiveAttacks` | 震荡攻击 | Concussive Attacks | 是 | 是 | mutatorconcussiveattacks.sc2mod | 玩家单位会被所有敌方攻击减速。 |
| `CycleRandom` | 混乱工作室 | Chaos Studios | 否 | 否 | mutatorcyclerandomly.sc2mod | 突变因子会随机选择，并且在任务中周期性轮换。 |
| `DamageBounce` | 伤害散射 | Diffusion | 是 | 是 | mutatordiffusion.sc2mod | 对敌人造成的伤害将平摊给所有附近的单位，包括你的单位。 |
| `DamageReflect` | 双重压力 | Double-Edged | 是 | 是 | mutatordoubleedged.sc2mod | 你的单位也会受到他们自身造成的所有伤害，但是会持续恢复。 |
| `DeathAOE` | 自毁程序 | Self Destruction | 是 | 是 | mutatorselfdestruction.sc2mod | 敌方单位死亡时发生爆炸，并对附近的玩家单位造成伤害。 |
| `DeathPull` | 致命勾引 | Fatal Attraction | 是 | 是 | mutatorpullofthevoid.sc2mod | 敌方单位或建筑被摧毁后，你附近的任何单位将被牵拉至被它们的位置。 |
| `DropPods` | 进攻部署 | Aggressive Deployment | 是 | 是 | mutatoraggressivedeployment.sc2mod | 周期性地将额外的敌方单位部署到战场上。 |
| `Entomb` | 晶矿护盾 | Mineral Shields | 是 | 是 | mutatorentomb.sc2mod | 玩家基地中的晶体矿簇会被周期性包覆一层护盾，必须将其摧毁才能继续采集资源。 |
| `Evolve` | 力量蜕变 | Transmutation | 是 | 是 | mutatorevolution.sc2mod | 敌方单位造成伤害时有一定几率变形成更强大的单位。 |
| `Fear` | 无边恐惧 | Fear | 是 | 否 | mutatorfear.sc2mod | 玩家的单位在受到伤害时会不时地停止攻击，并且害怕地到处乱跑。 |
| `FireFight` | 焦土政策 | Scorched Earth | 是 | 是 | mutatorfirefight.sc2mod | 敌方单位死亡时会点燃地面。 |
| `Fireworks` | 焰火秀 | Fireworks | 否 | 否 | mutatorfireworks.sc2mod | 敌人死亡时会发射灿烂的烟花，对你周围的单位造成伤害。 |
| `FoodHunt` | 捕杀火鸡 | Turkey Shoot | 否 | 否 | mutatorfoodhunt.sc2mod | 补给只能通过击杀火鸡产生，它们在整个地图上漫游。这么做可能会激怒其它的火鸡。 |
| `GiftFight` | 礼尚往来 | Gift Exchange | 否 | 否 | mutatorgiftexchange.sc2mod | 地图上会周期性地放置一些礼物。你们不抢就会便宜了埃蒙哟！ |
| `HardenedWill` | 坚强意志 | Hardened Will | 是 | 否 | mutatorhardenedwill.sc2mod | 敌方英雄单位附近有任何非英雄敌方单位时，其所受到的伤害最高不超过10点。 |
| `HeroesFromTheStorm` | 风暴英雄 | Heroes from the Storm | 是 | 否 | mutatorheroesfromthestorm.sc2mod | 每一轮攻击波次都会由实力越来越强的英雄率领。 |
| `HybridNuke` | 相互摧毁 | Mutually Assured Destruction | 是 | 否 | mutatormutuallyassureddestruction.sc2mod | 敌方混合体死亡时会引爆一发核弹。 |
| `InfestedTerranSpawner` | 丧尸大战 | Outbreak | 是 | 是 | mutatoroutbreak.sc2mod | 敌方被感染的人类会不断地出现在地图上。 |
| `Inspiration` | 鼓舞人心 | Inspiration | 是 | 否 | mutatorinspiration.sc2mod | 敌方英雄单位提高小范围内所有敌人的攻击速度和护甲。 |
| `Insubordination` | 刺头兵 | Insubordination | 否 | 否 | - | 你的单位不会准确地执行命令。 |
| `JustDie` | 给我死吧！ | Just Die! | 是 | 是 | mutatorjustdie.sc2mod | 敌方单位死亡后会自动复活。 |
| `KillBots` | 杀戮机器人 | Kill Bots | 是 | 否 | mutatorkillbots.sc2mod | 来源不明的进攻性机器人已被释放到了科普卢星区，意图制造毁灭。经过用心险恶的工程改造后，它们在达到预先设定的击杀数量之前都是无敌的存在。只有在那之后，它们才能被阻止。不过，你能撑到最后吗？ |
| `KillKarma` | 杀生业报 | Naughty List | 否 | 否 | mutatornaughtyornice.sc2mod | 玩家的单位和建筑每消灭一个敌人，其所受到的伤害就会提高。 |
| `LaserDrill` | 激光钻机 | Laser Drill | 是 | 是 | mutatorlaserdrill.sc2mod | 一台敌方激光钻机会不停地攻击位于敌人视野范围内的玩家单位。 |
| `LavaBurst` | 岩浆爆发 | Lava Burst | 是 | 是 | mutatorlavaburst.sc2mod | 岩浆会周期性地在随机位置从地下喷发，并对玩家的空中和地面单位造成伤害。 |
| `LazyWorkers` | 上班偷睡 | Nap Time | 否 | 否 | - | 玩家的工人单位会周期性地陷入沉睡，必须使用命令面板上的“苏醒”技能才能将其唤醒。 |
| `LifeLeech` | 生命吸取 | Life Leech | 是 | 是 | mutatorlifeleech.sc2mod | 敌方单位和建筑在造成伤害时偷取生命值或护盾。 |
| `LongRange` | 超远视距 | Long Range | 是 | 否 | mutatorlongrange.sc2mod | 敌方单位和建筑的武器射程与视野范围提高。 |
| `Magnificent` | 强磁雷场 | Mag-nificent | 是 | 否 | mutatormagnificent.sc2mod | 麦格天雷会在任务一开始布满整个地图。 |
| `MissileBarrage` | 飞弹大战 | Missile Command | 是 | 是 | mutatormissilemadness.sc2mod | 你的建筑会不停地遭受飞弹轰炸的袭击，你必须将它们击落。 |
| `MomentOfSilence` | 默哀 | Moment Of Silence | 是 | 否 | mutatormomentofsilence.sc2mod | 敌方英雄单位死亡时，在其周围的所有玩家单位都会反思自己的过错，无法攻击或使用技能。 |
| `NoResources` | 小捞油水 | Slim Pickings | 是 | 是 | mutatoreconomiccrisis.sc2mod | 玩家的工人单位采集资源的效率降低，但是地图上会生成可以拾取的资源。 |
| `Nukes` | 核弹打击 | Going Nuclear | 是 | 是 | mutatornukes.sc2mod | 核弹会随机在整张地图上进行发射。 |
| `OopsAllCasters` | 灵能爆表 | Power Overwhelming | 是 | 否 | mutatorpsionicawakening.sc2mod | 所有敌方单位拥有能量并且使用随机技能。 |
| `OrbitalStrike` | 轨道轰炸 | Orbital Strike | 是 | 是 | mutatororbitalstrike.sc2mod | 敌人会在地图上周期性地施放轨道轰炸。 |
| `OrderCosts` | 拿钱说话 | Micro Transactions | 是 | 是 | mutatormicrotransactions.sc2mod | 对你的单位发出指令会消耗资源，数量取决于该单位的生产价格。 |
| `PhotonOverload` | 光子过载 | Photon Overload | 是 | 是 | mutatorphotonoverload.sc2mod | 所有敌方建筑会攻击附近的敌对单位。 |
| `Plague` | 黑死病 | Black Death | 是 | 是 | mutatorblackdeath.sc2mod | 一些敌方单位携带着一种疫病，不仅会持续造成伤害，还会传染给附近的其它单位。此类敌人被消灭时，他们会把这种疫病传染给你的单位。 |
| `Polarity` | 极性不定 | Polarity | 是 | 是 | mutatorpolarity.sc2mod | 每一个敌方单位不是对你的单位免疫，就是对你盟友的单位免疫。 |
| `Propagate` | 同化体 | Propagators | 是 | 是 | mutatorpropagators.sc2mod | 无形的软泥怪缓慢爬向你的基地，被其接触到的任何单位和建筑都将变成和它们一样的复制体。 |
| `PurifierBeam` | 净化光束 | Purifier Beam | 是 | 是 | mutatorpurifierbeam.sc2mod | 地图上会出现一道敌人的净化光束并朝附近的玩家单位移动。 |
| `Random` | 随机 | Random | 是 | 否 | - | 激活一个尚未在该游戏中被选择的突变因子。 |
| `Reanimators` | 虚空重生者 | Void Reanimators | 是 | 是 | mutatorvoidreanimators.sc2mod | 虚空重生者游荡在战场上，不断地复活你的敌人。 |
| `RedEnvelopes` | 幸运红包 | Lucky Envelopes | 否 | 否 | mutatorredenvelopes.sc2mod | 塞满物资的节日红包，被随机丢弃在地图的各个角落。 |
| `ReducedVision` | 短视症 | Shortsighted | 是 | 否 | mutatorshortsighted.sc2mod | 玩家单位及其建筑的视野范围缩短。 |
| `SharedSupply` | 补给共享 | Sharing Is Caring | 否 | 否 | mutatorsharedsupply.sc2mod | 你和你的搭档共享补给，双方的部队单位会占用你们共有的补给。 |
| `SideStep` | 闪避机动 | Evasive Maneuvers | 是 | 是 | mutatorsidestep.sc2mod | 敌方单位受到伤害时将传送一小段距离。 |
| `Sluggish` | 消极战斗 | Sluggishness | 否 | 否 | - | 你的单位先加速，然后再减速。 |
| `SpawnBroodlings` | 异形寄生 | Alien Incubation | 是 | 是 | mutatoralienincubation.sc2mod | 所有敌方单位在死亡时会孵化巢虫。 |
| `SpiderMines` | 扫雷专家 | Minesweeper | 是 | 否 | mutatorwidowmaker.sc2mod | 数量庞大的寡妇雷和蜘蛛雷遍布整个战场。 |
| `StoneZealots` | 石像狂热者 | Stone Zealots | 否 | 否 | - | 敌人已部署石像狂热者。 |
| `StructureSteal` | 强行征用 | Eminent Domain | 是 | 是 | mutatoreminentdomain.sc2mod | 敌人摧毁你的建筑后将获得建筑的控制权。 |
| `TemporalField` | 时空力场 | Temporal Field | 是 | 是 | mutatortemporalfield.sc2mod | 地图上会周期性地部署敌人的时空力场。 |
| `TimeWarp` | 时间扭曲 | Time Warp | 是 | 是 | mutatortimewarp.sc2mod | 地图上会周期性地部署敌人的时间扭曲。 |
| `Tornadoes` | 龙卷风暴 | Twister | 是 | 是 | mutatortornadoes.sc2mod | 多股龙卷风在地图上移动，对位于其行进路线上的玩家单位造成伤害并将其击退。 |
| `TrickOrTreat` | 不给糖果就捣蛋 | Trick or Treat | 否 | 否 | mutatortrickortreat.sc2mod | 平民们会拜访你的糖果碗寻找零食，这些零食是通过花费晶体矿产生的。如果没有零食可以享用，平民们就会变身成随机的敌方单位。 |
| `UberDarkness` | 惧怕黑暗 | Afraid of the Dark | 否 | 否 | mutatortotaleclipse.sc2mod | 通过各种方式提供的视野都会受到极大的限制，只有你镜头中的视野一切正常。 |
| `UndyingEvil` | 不死邪魔 | Undying Evil | 否 | 否 | - | 有只怪物缠上你了，而且你杀它的次数越多，你下一次遇到的它越强大。 |
| `UnitSpeed` | 速度狂魔 | Speed Freaks | 是 | 是 | mutatorspeedfreaks.sc2mod | 敌方单位移动速度提高。 |
| `Vertigo` | 迷失方向 | Vertigo | 是 | 否 | mutatorvertigo.sc2mod | 你的镜头会随机改变位置。 |
| `VoidRifts` | 虚空裂隙 | Void Rifts | 是 | 是 | mutatorvoidrifts.sc2mod | 虚空裂隙周期性地出现在随机位置，并会不断地生成敌方单位，直至其被摧毁。 |
| `WalkingInfested` | 行尸走肉 | Walking Infested | 是 | 是 | mutatorwalkinginfested.sc2mod | 敌方单位在死亡时生成大量的被感染的人类，具体数量由死亡单位的生命值决定。 |

## 单因子包启用关系

| 包 | 因子ID | 包中文名 | 包说明 |
| --- | --- | --- | --- |
| `mutatoraggressivedeployment.sc2mod` | `DropPods` | 进攻部署 |  |
| `mutatoralienincubation.sc2mod` | `SpawnBroodlings` | 异形寄生 |  |
| `mutatoravenger.sc2mod` | `Avenger` | 复仇战士 |  |
| `mutatorbarrier.sc2mod` | `Barrier` | 减伤屏障 |  |
| `mutatorblackdeath.sc2mod` | `Plague` | 黑死病 |  |
| `mutatorblizzard.sc2mod` | `Blizzard` | 暴风雪 |  |
| `mutatorboombots.sc2mod` | `BoomBots` | 炸弹机器人 |  |
| `mutatorconcussiveattacks.sc2mod` | `ConcussiveAttacks` | 震荡攻击 |  |
| `mutatorcustom.sc2mod` | - | 自定义突变 |  |
| `mutatorcyclerandomly.sc2mod` | `CycleRandom` | 混乱工作室 |  |
| `mutatordarkness.sc2mod` | `BlackFog` | 暗无天日 |  |
| `mutatordiffusion.sc2mod` | `DamageBounce` | 伤害散射 |  |
| `mutatordoubleedged.sc2mod` | `DamageReflect` | 双刃剑 |  |
| `mutatoreconomiccrisis.sc2mod` | `NoResources` | 小捞油水 |  |
| `mutatoreminentdomain.sc2mod` | `StructureSteal` | 强行征用 |  |
| `mutatorentomb.sc2mod` | `Entomb` | 晶矿护盾 |  |
| `mutatorevolution.sc2mod` | `Evolve` | 力量蜕变 |  |
| `mutatorfear.sc2mod` | `Fear` | 无边恐惧 |  |
| `mutatorfirefight.sc2mod` | `FireFight` | 焦土政策 |  |
| `mutatorfireworks.sc2mod` | `Fireworks` | 生命烟花 |  |
| `mutatorfoodhunt.sc2mod` | `FoodHunt` | 捕杀火鸡 |  |
| `mutatorgiftexchange.sc2mod` | `GiftFight` | 礼尚往来 |  |
| `mutatorhardenedwill.sc2mod` | `HardenedWill` | 坚强意志 |  |
| `mutatorheroesfromthestorm.sc2mod` | `HeroesFromTheStorm` | 风暴英雄 |  |
| `mutatorinspiration.sc2mod` | `Inspiration` | 鼓舞人心 |  |
| `mutatorjustdie.sc2mod` | `JustDie` | 给我死吧！ |  |
| `mutatorkillbots.sc2mod` | `KillBots` | 杀戮机器人 |  |
| `mutatorlaserdrill.sc2mod` | `LaserDrill` | 激光钻机 |  |
| `mutatorlavaburst.sc2mod` | `LavaBurst` | 熔岩爆裂 |  |
| `mutatorlifeleech.sc2mod` | `LifeLeech` | 生命吸取 |  |
| `mutatorlongrange.sc2mod` | `LongRange` | 超远视距 |  |
| `mutatormagnificent.sc2mod` | `Magnificent` | 强磁雷场 |  |
| `mutatormicrotransactions.sc2mod` | `OrderCosts` | 拿钱说话 |  |
| `mutatormissilemadness.sc2mod` | `MissileBarrage` | 飞弹大战 |  |
| `mutatormomentofsilence.sc2mod` | `MomentOfSilence` | 默哀 |  |
| `mutatormutuallyassureddestruction.sc2mod` | `HybridNuke` | 相互摧毁 |  |
| `mutatornaughtyornice.sc2mod` | `KillKarma` | 杀生业报 |  |
| `mutatornukes.sc2mod` | `Nukes` | 核弹打击 |  |
| `mutatororbitalstrike.sc2mod` | `OrbitalStrike` | 轨道轰炸 |  |
| `mutatoroutbreak.sc2mod` | `InfestedTerranSpawner` | 丧尸大战 |  |
| `mutatorphotonoverload.sc2mod` | `PhotonOverload` | 光子过载 |  |
| `mutatorpolarity.sc2mod` | `Polarity` | 极性不定 |  |
| `mutatorpropagators.sc2mod` | `Propagate` | 异形同化 |  |
| `mutatorpsionicawakening.sc2mod` | `OopsAllCasters` | 灵能爆表 |  |
| `mutatorpullofthevoid.sc2mod` | `DeathPull` | 致命勾引 |  |
| `mutatorpurifierbeam.sc2mod` | `PurifierBeam` | 净化光束 |  |
| `mutatorredenvelopes.sc2mod` | `RedEnvelopes` | 幸运红包 |  |
| `mutatorselfdestruction.sc2mod` | `DeathAOE` | 自毁程序 |  |
| `mutatorsharedsupply.sc2mod` | `SharedSupply` | 补给共享 |  |
| `mutatorshortsighted.sc2mod` | `ReducedVision` | 短视症 |  |
| `mutatorsidestep.sc2mod` | `SideStep` | 闪避机动 |  |
| `mutatorspeedfreaks.sc2mod` | `UnitSpeed` | 速度狂魔 |  |
| `mutatortemporalfield.sc2mod` | `TemporalField` | 时空力场 |  |
| `mutatortimewarp.sc2mod` | `TimeWarp` | 时间扭曲 |  |
| `mutatortornadoes.sc2mod` | `Tornadoes` | 龙卷风暴 |  |
| `mutatortotaleclipse.sc2mod` | `UberDarkness` | 惧怕黑暗 |  |
| `mutatortrickortreat.sc2mod` | `TrickOrTreat` | 不给糖果就捣蛋 |  |
| `mutatorvertigo.sc2mod` | `Vertigo` | 迷失方向 |  |
| `mutatorvoidreanimators.sc2mod` | `Reanimators` | 虚空重生者 |  |
| `mutatorvoidrifts.sc2mod` | `VoidRifts` | 虚空裂隙 |  |
| `mutatorwalkinginfested.sc2mod` | `WalkingInfested` | 行尸走肉 |  |
| `mutatorwemoveunseen.sc2mod` | `AllEnemiesCloaked` | 来去无踪 |  |
| `mutatorwidowmaker.sc2mod` | `SpiderMines` | 扫雷专家 |  |

## 每周突变组合

| 顺序 | 组合ID | 中文名 | 地图ID | 因子 | 组合包 | 包内数值 |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `TimeLock` | 时空枷锁 | `AC_UlnarLocks` | `Magnificent`, `UnitSpeed`, `TimeWarp` | `mutatorcombotrainofthedead.sc2mod` | `1` |
| 2 | `TempleOfPain` | 痛苦神庙 | `AC_ShakurasTemple` | `Barrier`, `Avenger`, `Entomb` | `mutatorcombofirststrike.sc2mod` | `2` |
| 3 | `WarIsHell` | 战场炼狱 | `AC_CharThrasher` | `FireFight`, `SideStep`, `LavaBurst` | `mutatorcombotimelock.sc2mod` | `3` |
| 4 | `ShuttleSurprise` | 特别快递 | `AC_KaldirShuttle` | `SpawnBroodlings`, `DropPods`, `DeathAOE` | `mutatorcombobadweather.sc2mod` | `4` |
| 5 | `FirstStrike` | 先发制人 | `AC_SlaynPayload` | `LongRange`, `ReducedVision`, `LaserDrill` | `mutatorcombowhiteout.sc2mod` | `5` |
| 6 | `BadWeather` | 恶劣天气 | `AC_KorhalRift` | `Tornadoes`, `VoidRifts` | `mutatorcombowarishell.sc2mod` | `6` |
| 7 | `EvilSoA` | 末日之矛 | `AC_UlnarLocks` | `OrbitalStrike`, `TemporalField`, `PurifierBeam` | `mutatorcombotempleofpain.sc2mod` | `7` |
| 8 | `WhiteOut` | 雪茫危机 | `AC_KaldirShuttle` | `Blizzard`, `NoResources` | `mutatorcombospearofyourdoom.sc2mod` | `8` |
| 9 | `Urban Warfare` | 城市巷战 | `AC_KorhalRift` | `PhotonOverload`, `AllEnemiesCloaked`, `SpiderMines` | `mutatorcomboshuttlesurprise.sc2mod` | `9` |
| 10 | `ChaosStudios` | 混乱工作室 | `AC_CharThrasher` | `CycleRandom` | `mutatorcombourbanwarfare.sc2mod` | `10` |
| 11 | `PerfectStorm` | 完美风暴 | `AC_SlaynPayload` | `Blizzard`, `Tornadoes`, `ReducedVision` | `mutatorcombochaosstudios.sc2mod` | `11` |
| 12 | `Pain Train` | 全面核战 | `AC_TarsonisTrain` | `Nukes`, `Fear`, `DeathAOE` | `mutatorcomboperfectstorm.sc2mod` | `12` |
| 13 | `Vampires` | 血魔入侵 | `AC_SlaynPayload` | `LifeLeech`, `SideStep`, `ConcussiveAttacks` | `mutatorcombopaintrain.sc2mod` | `13` |
| 14 | `DarkRitual` | 黑暗仪式 | `AC_ShakurasTemple` | `OopsAllCasters`, `UnitSpeed` | `mutatorcombodarkritual.sc2mod` | `14` |
| 15 | `CountdownToDestruction` | 燃烧军团 | `AC_UlnarLocks` | `VoidRifts`, `Avenger`, `FireFight` | `mutatorcombooutoforder.sc2mod` | `15` |
| 16 | `OutOfControl` | 失心疯 | `AC_SlaynPayload` | `Fear`, `SideStep`, `Vertigo` | `mutatorcombocountdowntodestruction.sc2mod` | `16` |
| 17 | `EnvironmentalDestruction` | 烈焰战场 | `AC_VeridiaCourier` | `MissileBarrage`, `PurifierBeam`, `Nukes` | `mutatorcomboflippingout.sc2mod` | `17` |
| 18 | `CommFailure` | 完全失控 | `AC_VeridiaCourier` | `OrderCosts`, `BlackFog`, `TimeWarp` | `mutatorcombotrifecta.sc2mod` | `18` |
| 19 | `RelentlessDead` | 残暴亡灵 | `AC_CharThrasher` | `UndyingEvil`, `Reanimators`, `WalkingInfested` | `mutatorcomboenvironmentaldestruction.sc2mod` | `19` |
| 20 | `Trifecta` | 三重威胁 | `AC_KaldirShuttle` | `LaserDrill`, `InfestedTerranSpawner`, `OrbitalStrike` | `mutatorcombogrowingthreat.sc2mod` | `20` |
| 21 | `GrowingThreat` | 威胁递增 | `AC_BelshirEscort` | `Evolve`, `HybridNuke`, `SpawnBroodlings` | `mutatorcombodeadlyharvest.sc2mod` | `21` |
| 22 | `DeadlyHarvest` | 资源危机 | `AC_KorhalRift` | `Magnificent`, `Fear`, `NoResources` | `mutatorcombofalsedichotomy.sc2mod` | `22` |
| 23 | `FalseDichotomy` | 外交豁免 | `AC_TarsonisTrain` | `Polarity`, `SideStep`, `Barrier` | `mutatorcomboburningtide.sc2mod` | `23` |
| 24 | `BurningTide` | 玩火自焚 | `AC_ShakurasTemple` | `WalkingInfested`, `FireFight`, `SpawnBroodlings` | `mutatorcomboterrazineoverload.sc2mod` | `24` |
| 25 | `UpAndAtom` | 天轰地爆 | `AC_CharThrasher` | `DeathAOE`, `HybridNuke`, `Nukes` | `mutatorcomboupandatom.sc2mod` | `25` |
| 26 | `TerrazineOverload` | 地嗪过量 | `AC_BelshirEscort` | `UnitSpeed`, `Avenger`, `DropPods` | `mutatorcombohalloween.sc2mod` | `26` |
| 27 | `ChaosStudios2` | 混乱工作室2 | `AC_UlnarLocks` | `CycleRandom` | `mutatorcombothanksgiving.sc2mod` | `27` |
| 28 | `OctHoliday` | 惊魂之夜 | `AC_KorhalRift` | `UberDarkness`, `TrickOrTreat` | `mutatorcombooverwhelmingpower.sc2mod` | `28` |
| 29 | `NovHoliday` | 捉鸡行动 | `AC_TarsonisTrain` | `FoodHunt`, `SharedSupply` | `mutatorcomboshirchaos.sc2mod` | `29` |
| 30 | `OPO` | 能量超负 | `AC_VeridiaCourier` | `OopsAllCasters`, `PhotonOverload`, `LongRange` | `mutatorcombosurvivalofthefittest.sc2mod` | `30` |
| 31 | `ShirMadness` | 拉克希尔大乱斗 | `AC_SlaynPayload` | `InfestedTerranSpawner`, `UnitSpeed`, `JustDie` | `mutatorcomboterrorsinthemist.sc2mod` | `31` |
| 32 | `DeathFromAboveBelow` | 天地双杀 | `AC_KaldirShuttle` | `Reanimators`, `PurifierBeam` | `mutatorcomboultimateprice.sc2mod` | `32` |
| 33 | `SurvivalOfTheFittest` | 适者生存 | `AC_CharThrasher` | `Barrier`, `Evolve` | - | - |
| 34 | `TerrorsInTheMist` | 丛林激斗 | `AC_BelshirEscort` | `AllEnemiesCloaked`, `DropPods`, `TemporalField` | `mutatorcombosickmicro.sc2mod` | `34` |
| 35 | `UltimatePrice` | 终极代价 | `AC_UlnarLocks` | `OrderCosts`, `MissileBarrage`, `Entomb` | `mutatorcomboportalpower.sc2mod` | `35` |
| 36 | `UndergroundPound` | 火葬仪式 | `AC_JarbanPointCapture` | `Reanimators`, `FireFight` | `mutatorcomboblastfromthepast.sc2mod` | `36` |
| 37 | `ShieldsUp` | 高举盾牌！ | `AC_KaldirShuttle` | `DamageBounce`, `Entomb`, `ReducedVision` | `mutatorcomboshieldsup.sc2mod` | `37` |
| 38 | `SickMicro` | 死疫横生 | `AC_BelshirEscort` | `Plague`, `OrderCosts` | `mutatorcombocremation.sc2mod` | `38` |
| 39 | `NeutronBomb` | 旧忆重惊 | `AC_ShakurasTemple` | `StructureSteal`, `HybridNuke` | - | - |
| 40 | `DankPortal` | 星门异动 | `AC_CharThrasher` | `VoidRifts`, `OopsAllCasters` | - | - |
| 41 | `ChaosStudios3` | 灾难之轮 | `AC_VeridiaCourier` | `CycleRandom` | - | - |
| 42 | `DecHoliday` | 暴力之夜 | `AC_KaldirShuttle` | `GiftFight`, `KillKarma` | - | - |
| 43 | `InjusticeLeague` | 至暗之时 | `AC_KorhalRift` | `HeroesFromTheStorm`, `Inspiration`, `HardenedWill` | `mutatorcombochristmas.sc2mod` | `43` |
| 44 | `LunarNewYear` | 乌历新年 | `AC_UlnarLocks` | `Fireworks`, `RedEnvelopes` | - | - |
| 45 | `Frostbite` | 噬骨之寒 | `AC_MeinhoffDayNight` | `Magnificent`, `Blizzard` | `mutatorcombolunarnewyear.sc2mod` | `45` |
| 46 | `OccupationalHazard` | 强行霸占 | `AC_KorhalRift` | `MissileBarrage`, `LaserDrill`, `StructureSteal` | `mutatorcombofrostbite.sc2mod` | `46` |
| 47 | `GraveDanger` | 死亡危机 | `AC_ShakurasTemple` | `Reanimators`, `Evolve`, `WalkingInfested` | `mutatorcombooccupationalhazard.sc2mod` | `47` |
| 48 | `MoMoneyMoProblems` | 没钱麻烦大了 | `AC_VeridiaCourier` | `NoResources`, `DeathAOE`, `Tornadoes` | `mutatorcombodeadgame.sc2mod` | `48` |
| 49 | `FieldsOfDeath` | 雷鸣弹啸 | `AC_BelshirEscort` | `Polarity`, `SpiderMines` | `mutatorcombomomoneymoproblems.sc2mod` | `49` |
| 50 | `DeadByDawn` | 疫鬼狂潮 | `AC_MeinhoffDayNight` | `UnitSpeed`, `Plague`, `Fear` | `mutatorcombofieldsofdeath.sc2mod` | `50` |
| 51 | `UnseenThreat` | 隐形威胁 | `AC_JarbanPointCapture` | `AllEnemiesCloaked`, `PurifierBeam` | `mutatorcombodeadbydawn.sc2mod` | `51` |
| 52 | `ChaosStudios4` | 悲惨之轮 | `AC_TarsonisTrain` | `CycleRandom` | `mutatorcombounseenthreat.sc2mod` | `52` |
| 53 | `DangerousAmbition` | 现世现报 | `AC_SlaynPayload` | `DamageReflect`, `DeathAOE`, `HybridNuke` | `mutatorcomboinstantkarma.sc2mod` | `3136` |
| 54 | `PropagatorIntro` | 异形进击 | `AC_UlnarLocks` | `Propagate`, `TemporalField` | `mutatorcombofutileresistance.sc2mod` | `3132` |
| 55 | `CertainDemise` | 无间死局 | `AC_SlaynPayload` | `Avenger`, `Reanimators` | `mutatorcombocertaindemise.sc2mod` | `3110` |
| 56 | `DeadHeat` | 烈火金刚 | `AC_VeridiaCourier` | `DeathPull`, `DeathAOE`, `WalkingInfested` | `mutatorcombodeadheat.sc2mod` | `3112` |
| 57 | `DeliveryGuaranteed` | 火线快递 | `AC_KaldirShuttle` | `JustDie`, `Nukes`, `Barrier` | `mutatorcombodeliveryguaranteed.sc2mod` | `3113` |
| 58 | `ColdIsTheVoid` | 寒冷即是虚空 | `AC_TarsonisTrain` | `Blizzard`, `Reanimators`, `VoidRifts` | `mutatorcombocoldisthevoid.sc2mod` | `3131` |
| 59 | `HardTarget` | 硬骨头 | `AC_CharThrasher` | `HardenedWill`, `Polarity`, `Barrier` | `mutatorcombohardtarget.sc2mod` | `3133` |
| 60 | `TideOfTerror` | 火海惊魂 | `AC_VeridiaCourier` | `VoidRifts`, `Fear` | `mutatorcombofearandlava.sc2mod` | `3134` |
| 61 | `SlowAndSteady` | 步步为营 | `AC_BelshirEscort` | `TimeWarp`, `UnitSpeed`, `ConcussiveAttacks` | `mutatorcomboslowandsteady.sc2mod` | `3135` |
| 62 | `UnwelcomeVisitors` | 仁至义尽 | `AC_ShakurasTemple` | `JustDie`, `LongRange`, `Inspiration` | `mutatorcombowornoutwelcome.sc2mod` | `3137` |
| 63 | `MothIntoFlame` | 飞蛾扑火 | `AC_KorhalRift` | `DeathPull`, `PurifierBeam`, `SpawnBroodlings` | `mutatorcombomothstotheflame.sc2mod` | `3138` |
| 64 | `CharnelHouse` | 疫区逃生 | `AC_JarbanPointCapture` | `BlackFog`, `PhotonOverload`, `Plague` | `mutatorcombocharnelhouse.sc2mod` | `3139` |
| 65 | `BattleBots` | 机器人大战 | `AC_BelshirEscort` | `KillBots`, `MomentOfSilence` | `mutatorcombokillbotwars.sc2mod` | `3161` |
| 66 | `EyeForAnEye` | 自作自受 | `AC_AiurSiege` | `DamageReflect`, `HybridNuke` | `mutatorcombowhatgoesaround.sc2mod` | `3166` |
| 67 | `MagneticPull` | 磁性牵引 | `AC_CharThrasher` | `Magnificent`, `DeathPull`, `AllEnemiesCloaked` | `mutatorcombomagneticpull.sc2mod` | `3162` |
| 68 | `DeathFromBelow` | 地发杀机 | `AC_JarbanPointCapture` | `FireFight`, `LavaBurst`, `SpiderMines` | `mutatorcombodeathfrombelow.sc2mod` | `3163` |
| 69 | `DeathFromAbove` | 天发杀机 | `AC_KaldirShuttle` | `DropPods`, `OrbitalStrike`, `MissileBarrage` | `mutatorcombowatchtheskies.sc2mod` | `3164` |
| 70 | `ThinkFast` | 兵贵神速 | `AC_KorhalRift` | `UnitSpeed`, `Propagate` | `mutatorcombothinkfast.sc2mod` | `3165` |
| 71 | `BannableOffense` | 封禁行为 | `AC_CybrosEscort` | `OopsAllCasters`, `SideStep` | `mutatorcombobannableoffense.sc2mod` | `3167` |
| 72 | `VampireHybrids` | 嗜血夜魔 | `AC_PartAndParcel` | `LifeLeech`, `ReducedVision`, `Fear` | `mutatorcombomastersofmidnight.sc2mod` | `3168` |
| 73 | `NightDrive` | 雷场夜战 | `AC_CradleOfDeath` | `UberDarkness`, `Magnificent` | `mutatorcombonightdrive.sc2mod` | `3169` |
| 74 | `GetOutMore` | 极限压迫 | `AC_MeinhoffDayNight` | `StructureSteal`, `Entomb`, `DeathAOE` | `mutatorcombogetoutmore.sc2mod` | `3170` |
| 75 | `QuickKillers` | 杀劫迫临 | `AC_ShakurasTemple` | `KillBots`, `Inspiration`, `UnitSpeed` | `mutatorcomboquickkillers.sc2mod` | `3171` |
| 76 | `UnstableEnvironment` | 时空气象战 | `AC_AiurSiege` | `Tornadoes`, `LavaBurst` | `mutatorcombounstableenvironment.sc2mod` | `3172` |
| 77 | `RememberPropagator` | 死亡无声 | `AC_CharThrasher` | `Propagate`, `MomentOfSilence` | `mutatorcomborestinpeace.sc2mod` | `3173` |
| 78 | `EndlessInfection` | 无尽感染 | `AC_KaldirShuttle` | `Plague`, `SpawnBroodlings`, `WalkingInfested` | `mutatorcomboendlessinfection.sc2mod` | `3174` |
| 79 | `MissileCommanders` | 顽强作战 | `AC_SlaynPayload` | `MissileBarrage`, `Inspiration`, `HardenedWill` | `mutatorcombobattlehardened.sc2mod` | `3175` |
| 80 | `ColdAdaptation` | 寒冷适应 | `AC_JarbanPointCapture` | `Blizzard`, `Evolve` | - | - |
| 81 | `BotFarm` | 进步的代价 | `AC_CybrosEscort` | `KillBots`, `OrderCosts` | `mutatorcombopriceofprogress.sc2mod` | `3177` |
| 82 | `NegativeReinforcement` | 消极增援 | `AC_PartAndParcel` | `DeathPull`, `Avenger` | `mutatorcombonegativereinforcement.sc2mod` | `3178` |
| 83 | `KarmaticInvaders` | 报应不爽 | `AC_BelshirEscort` | `VoidRifts`, `DamageReflect` | `mutatorcomboretribution.sc2mod` | `3179` |
| 84 | `RiseFromAshes` | 灰烬重生 | `AC_AiurSiege` | `DeathAOE`, `Reanimators`, `LavaBurst` | `mutatorcomborisefromashes.sc2mod` | `3180` |
| 85 | `WarpZone` | 扭曲空间 | `AC_UlnarLocks` | `TemporalField`, `TimeWarp`, `Tornadoes` | `mutatorcombowarpzone.sc2mod` | `3181` |
| 86 | `WellTrained` | 训练有素 | `AC_TarsonisTrain` | `Inspiration`, `DropPods`, `Avenger` | `mutatorcombowelltrained.sc2mod` | `3182` |
| 87 | `NukeFromOrbit` | 末日报告 | `AC_VeridiaCourier` | `Propagate`, `Nukes`, `OrbitalStrike` | `mutatorcombodoomsdayreport.sc2mod` | `3183` |
| 88 | `SafetyViolation` | 安全违规 | `AC_JarbanPointCapture` | `DeathAOE`, `LaserDrill`, `Magnificent` | `mutatorcombosafetyviolation.sc2mod` | `3184` |
| 89 | `Double Life` | 重生圣殿 | `AC_ShakurasTemple` | `JustDie`, `LifeLeech`, `Barrier` | `mutatorcombotempleofrebirth.sc2mod` | `3185` |
| 90 | `FrenziedProtectors` | 疯狂超频 | `AC_CybrosEscort` | `UnitSpeed`, `PhotonOverload`, `Avenger` | `mutatorcombooverclocked.sc2mod` | `3186` |
| 91 | `AttritionWarfare` | 消耗战 | `AC_CharThrasher` | `DamageBounce`, `SpiderMines` | `mutatorcomboattritionwarfare.sc2mod` | `3187` |
| 92 | `TogetherForever` | 永不分离 | `AC_SlaynPayload` | `JustDie`, `Polarity` | `mutatorcombotogetherforever.sc2mod` | `3188` |
| 93 | `SpectreOfDeath` | 死亡鬼影 | `AC_PartAndParcel` | `Reanimators`, `AllEnemiesCloaked` | `mutatorcombospecterofdeath.sc2mod` | `3189` |
| 94 | `DistantThreat` | 远距威胁 | `AC_MeinhoffDayNight` | `LongRange`, `PurifierBeam`, `TimeWarp` | `mutatorcombodistantthreat.sc2mod` | `3190` |
| 95 | `RadiationZone` | 辐射区 | `AC_KorhalRift` | `Nukes`, `InfestedTerranSpawner`, `Plague` | `mutatorcomboradiationzone.sc2mod` | `3191` |
| 96 | `InnerPower` | 心灵力量 | `AC_ShakurasTemple` | `SpawnBroodlings`, `OopsAllCasters` | `mutatorcomboinnerpower.sc2mod` | `3192` |
| 97 | `MovingFees` | 调遣军费 | `AC_CradleOfDeath` | `OrderCosts`, `FireFight` | `mutatorcombomovingfees.sc2mod` | `3193` |
| 98 | `MemorableBoss` | 梦魇敌酋 | `AC_KaldirShuttle` | `MomentOfSilence`, `HeroesFromTheStorm` | `mutatorcombomemorableboss.sc2mod` | `3194` |
| 99 | `FlipMyBase` | 基地翻转 | `AC_BelshirEscort` | `MissileBarrage`, `PurifierBeam`, `StructureSteal` | `mutatorcomboflipmybase.sc2mod` | `3195` |
| 100 | `Firewall` | 防火墙 | `AC_CybrosEscort` | `LavaBurst`, `SpiderMines`, `Barrier` | `mutatorcombofirewall.sc2mod` | `3196` |
| 101 | `DeathAndTaxes` | 死亡税金 | `AC_MeinhoffDayNight` | `OrderCosts`, `NoResources`, `Plague` | `mutatorcombodeathandtaxes.sc2mod` | `3197` |
| 102 | `ChaosStudios7` | 灾难之轮 | `AC_JarbanPointCapture` | `CycleRandom` | - | - |
| 103 | `RubberAndGlue` | 感痛身受 | `AC_KaldirShuttle` | `DamageReflect`, `DamageBounce`, `TemporalField` | `mutatorcomborubberandglue.sc2mod` | `3198` |
| 104 | `HellTrain` | 地狱列车 | `AC_TarsonisTrain` | `JustDie`, `FireFight` | `mutatorcombohelltrain.sc2mod` | `3199` |
| 105 | `InfectionDetected` | 感染危机 | `AC_CybrosEscort` | `SpawnBroodlings`, `InfestedTerranSpawner`, `DeathAOE` | `mutatorcomboinfectiondetected.sc2mod` | `3200` |
| 106 | `OpportunitiesUnleashed` | 机会尽出 | `AC_BelshirEscort` | `UnitSpeed`, `Barrier`, `OopsAllCasters` | `mutatorcomboopportunitiesunleashed.sc2mod` | `3201` |
| 107 | `OneForAll` | 一将千军 | `AC_ShakurasTemple` | `HardenedWill`, `Evolve`, `Inspiration` | `mutatorcombooneforall.sc2mod` | `3202` |
| 108 | `ExperimentalArtillery` | 实验巨炮 | `AC_PartAndParcel` | `LaserDrill`, `PhotonOverload`, `LongRange` | `mutatorcomboexperimentalartillery.sc2mod` | `3203` |
| 109 | `NuclearFamily` | 核族入侵 | `AC_SlaynPayload` | `HybridNuke`, `InfestedTerranSpawner`, `HardenedWill` | `mutatorcombonuclearfamily.sc2mod` | `3204` |
| 110 | `DieTogether` | 同归于尽 | `AC_AiurSiege` | `JustDie`, `Polarity` | `mutatorcombodietogether.sc2mod` | `3205` |
| 111 | `BurningEvacuation` | 烈火营救 | `AC_JarbanPointCapture` | `StructureSteal`, `FireFight`, `Avenger` | `mutatorcomboburningevacuation.sc2mod` | `3206` |
| 112 | `AssemblyOfVengeance` | 复仇者集结 | `AC_ShakurasTemple` | `HeroesFromTheStorm`, `Avenger` | `mutatorcomboassemblyofvengeance.sc2mod` | `3207` |
| 113 | `RailroadSwitch` | 铁轨换线 | `AC_TarsonisTrain` | `JustDie`, `Polarity` | `mutatorcomborailroadswitch.sc2mod` | `3208` |
| 114 | `HostileTerritory` | 敌对领地 | `AC_MeinhoffDayNight` | `Barrier`, `PhotonOverload`, `OopsAllCasters` | `mutatorcombohostileterritory.sc2mod` | `3209` |
| 115 | `MediaBlackout` | 媒体抹黑 | `AC_VeridiaCourier` | `BlackFog`, `MissileBarrage`, `AllEnemiesCloaked` | `mutatorcombomediablackout.sc2mod` | `3210` |
| 116 | `ThunderDome` | 雷霆穹顶 | `AC_UlnarLocks` | `HeroesFromTheStorm`, `Magnificent` | `mutatorcombothunderdome.sc2mod` | `3211` |
| 117 | `DodgeThis` | 躲灾避祸 | `AC_AiurSiege` | `BlackFog`, `Nukes`, `OrbitalStrike` | `mutatorcombododgethis.sc2mod` | `3212` |
| 118 | `BinaryChoice` | 二元选择 | `AC_CybrosEscort` | `Polarity`, `Reanimators` | `mutatorcombobinarychoice.sc2mod` | `3213` |
| 119 | `TheAscended` | 升格蜕变 | `AC_SlaynPayload` | `Inspiration`, `Evolve` | `mutatorcombotheascended.sc2mod` | `3214` |
| 120 | `EnhancedDefenses` | 森严壁垒 | `AC_CradleOfDeath` | `Barrier`, `Nukes`, `PhotonOverload` | `mutatorcomboenhanceddefenses.sc2mod` | `3215` |
| 121 | `DoubleTrouble` | 双重麻烦 | `AC_KaldirShuttle` | `KillBots`, `Propagate` | `mutatorcombodoubletrouble.sc2mod` | `3216` |
| 122 | `AndDropsandRifts` | 星沉地裂 | `AC_PartAndParcel` | `DropPods`, `VoidRifts` | `mutatorcomboanddropsandrifts.sc2mod` | `3217` |
| 123 | `CatchTheTrain` | 赶夜车 | `AC_TarsonisTrain` | `UberDarkness`, `ReducedVision`, `UnitSpeed` | `mutatorcombocatchthetrain.sc2mod` | `3218` |
| 124 | `TempleOfTerror` | 恐惧神庙 | `AC_ShakurasTemple` | `SpawnBroodlings`, `UberDarkness`, `Fear` | `mutatorcombotempleofterror.sc2mod` | `3219` |
| 125 | `ShiningBright` | 光炫神迷 | `AC_BelshirEscort` | `ConcussiveAttacks`, `LaserDrill`, `PurifierBeam` | `mutatorcomboshiningbright.sc2mod` | `3220` |
| 126 | `EndlessSparkles` | 无尽花火 | `AC_JarbanPointCapture` | `SpawnBroodlings`, `DeathAOE` | `mutatorcomboendlesssparkles.sc2mod` | `3221` |
| 127 | `GraveyardShift` | 坟场夜班 | `AC_MeinhoffDayNight` | `UberDarkness`, `PurifierBeam` | `mutatorcombograveyardshift.sc2mod` | `3222` |
| 128 | `RoboticRevival` | 机器重生 | `AC_PartAndParcel` | `Fear`, `JustDie`, `LaserDrill` | `mutatorcomboroboticrevival.sc2mod` | `3224` |
| 129 | `SecretStorm` | 秘密突击 | `AC_UlnarLocks` | `DropPods`, `Tornadoes`, `AllEnemiesCloaked` | `mutatorcombosecretstorm.sc2mod` | `3223` |
| 130 | `Undermined` | 暗地破坏 | `AC_KorhalRift` | `SpiderMines`, `VoidRifts` | `mutatorcomboundermined.sc2mod` | `3225` |
| 131 | `Astigmatism` | 散光 | `AC_CybrosEscort` | `LongRange`, `ReducedVision`, `AllEnemiesCloaked` | `mutatorcomboastigmatism.sc2mod` | `3226` |
| 132 | `NeverSayDie` | 永不言死 | `AC_BelshirEscort` | `Barrier`, `JustDie`, `LifeLeech` | `mutatorcomboneversaydie.sc2mod` | `3227` |
| 133 | `MedievalTimes` | 中世纪 | `AC_AiurSiege` | `Plague`, `Evolve` | `mutatorcombomedievaltimes.sc2mod` | `3228` |
| 134 | `Onslaught` | 全力猛攻 | `AC_MeinhoffDayNight` | `DropPods`, `InfestedTerranSpawner`, `Reanimators` | `mutatorcomboonslaught.sc2mod` | `3229` |
| 135 | `EquivalentExchange` | 等价交换 | `AC_CharThrasher` | `DamageBounce`, `JustDie` | `mutatorcomboequivalentexchange.sc2mod` | `3230` |
| 136 | `EncroachingMadness` | 迫近的疯狂 | `AC_BelshirEscort` | `StructureSteal`, `PurifierBeam`, `VoidRifts` | `mutatorcomboencroachingmadness.sc2mod` | `3231` |
| 137 | `SeasonofGiving` | 感恩季 | `AC_CradleOfDeath` | `Blizzard`, `GiftFight`, `KillKarma` | `mutatorcomboseasonofgiving.sc2mod` | `3232` |
| 138 | `ChoicesChoices` | 决择抉择 | `AC_ShakurasTemple` | `HardenedWill`, `Inspiration`, `HybridNuke` | `mutatorcombochoiceschoices.sc2mod` | `3233` |
| 139 | `PureVengeance` | 过度反应 | `AC_AiurSiege` | `Avenger`, `OopsAllCasters` | `mutatorcombopure vengeance.sc2mod` | `3234` |
| 140 | `HotAreTheNukes` | 火焰净化 | `AC_TarsonisTrain` | `Nukes`, `LavaBurst`, `FireFight` | `mutatorcombohotarethenukes.sc2mod` | `3235` |
| 141 | `BonusRifts` | 极速增援 | `AC_JarbanPointCapture` | `TemporalField`, `VoidRifts` | `mutatorcombobonusrifts.sc2mod` | `3236` |
| 142 | `BlindTribute` | 盲目进贡 | `AC_SlaynPayload` | `KillBots`, `ReducedVision` | `mutatorcomboblindtribute.sc2mod` | `3237` |
| 143 | `BarrierToEntry` | 进击壁垒 | `AC_UlnarLocks` | `Barrier`, `Entomb`, `JustDie` | `mutatorcombobarriertoentry.sc2mod` | `3238` |
| 144 | `DescentOfTheMasses` | 虫人海啸 | `AC_CradleOfDeath` | `SpawnBroodlings`, `MissileBarrage`, `InfestedTerranSpawner` | `mutatorcombodescentofthemasses.sc2mod` | `3239` |
| 145 | `GettingAlong` | 心有灵犀 | `AC_VeridiaCourier` | `Polarity`, `SharedSupply` | `mutatorcombogettingalong.sc2mod` | `3240` |
| 146 | `KnockKnock` | 夜半敲门 | `AC_MeinhoffDayNight` | `Avenger`, `Propagate` | `mutatorcomboknockknock.sc2mod` | `3241` |
| 147 | `DanceDanceEvolution` | Dance Dance Evolution | `AC_BelshirEscort` | `MomentOfSilence`, `UnitSpeed`, `Evolve` | `mutatorcombodancedanceevolution.sc2mod` | `3242` |
| 148 | `TrainOfPain` | Train of Pain | `AC_TarsonisTrain` | `DamageReflect`, `Nukes`, `HybridNuke` | `mutatorcombotrainofpain.sc2mod` | `3243` |
| 149 | `ResilientRifts` | Resilient Rifts | `AC_KorhalRift` | `JustDie`, `VoidRifts` | `mutatorcomboresilientrifts.sc2mod` | `3244` |
| 150 | `SilentKiller` | 鬼魅杀手 | `AC_AiurSiege` | `Plague`, `InfestedTerranSpawner`, `AllEnemiesCloaked` | `mutatorcombosilentkiller.sc2mod` | `3245` |
| 151 | `CallItAComeback` | Call It A Comeback | `AC_ShakurasTemple` | `Avenger`, `StructureSteal`, `JustDie` | `mutatorcombocallitacomeback.sc2mod` | `3246` |
| 152 | `ExplosiveHunt` | Explosive Hunt | `AC_PartAndParcel` | `SpiderMines`, `NoResources` | `mutatorcomboexplosivehunt.sc2mod` | `3247` |
| 153 | `TaxDay` | Tax Day | `AC_KaldirShuttle` | `Fear`, `OrderCosts` | `mutatorcombotaxday.sc2mod` | `3248` |
| 154 | `AggressiveRecruitment` | Aggressive Recruitment | `AC_CybrosEscort` | `Propagate`, `UnitSpeed`, `AllEnemiesCloaked` | `mutatorcomboaggressiverecruitment.sc2mod` | `3249` |
| 155 | `ScaryScavengers` | Scary Scavengers | `AC_MeinhoffDayNight` | `InfestedTerranSpawner`, `NoResources` | `mutatorcomboscaryscavengers.sc2mod` | `3250` |
| 156 | `CallOfTheVoid` | 虚空召唤 | `AC_CharThrasher` | `Reanimators`, `VoidRifts` | `mutatorcombocallofthevoid.sc2mod` | `3251` |
| 157 | `InTheNameOfLove` | 因爱之名 | `AC_CradleOfDeath` | `ConcussiveAttacks`, `TimeWarp`, `PurifierBeam` | `mutatorcombointhenameoflove.sc2mod` | `3252` |
| 158 | `LockedAndLoaded` | 荷枪实弹 | `AC_UlnarLocks` | `KillBots`, `Entomb`, `TemporalField` | `mutatorcombolockedandloaded.sc2mod` | `3253` |
| 159 | `OfMinesAndMiners` | Of Mines and Miners | `AC_JarbanPointCapture` | `Magnificent`, `SpiderMines`, `MissileBarrage` | `mutatorcomboofminesandminers.sc2mod` | `3254` |
| 160 | `TheLeagueOfVermillains` | The League Of Vermillains | `AC_VeridiaCourier` | `SideStep`, `HeroesFromTheStorm` | `mutatorcombotheleagueofvermillains.sc2mod` | `3255` |
| 161 | `ChainExplosion` | Chain Explosion | `AC_SlaynPayload` | `LavaBurst`, `WalkingInfested` | - | - |
| 162 | `OperationCooperation` | 合作无间 | `AC_UlnarLocks` | `Polarity`, `Propagate` | `mutatorcombooperationcooperation.sc2mod` | `3256` |
| 163 | `Hot'n'Cold` | 冰火之歌 | `AC_KaldirShuttle` | `Blizzard`, `LavaBurst`, `FireFight` | `mutatorcombohotncold.sc2mod` | `3257` |
| 164 | `WhatWeDointheShadows` | 吸血鬼生活 | `AC_CharThrasher` | `BlackFog`, `ReducedVision`, `AllEnemiesCloaked` | `mutatorcombowhatwedointheshadows.sc2mod` | `3258` |
| 165 | `HardwareMalfunction` | 硬件故障 | `AC_CybrosEscort` | `KillBots`, `LaserDrill`, `SpiderMines` | `mutatorcombohardwaremalfunction.sc2mod` | `3259` |
| 166 | `SharedPain` | 分担痛苦 | `AC_PartAndParcel` | `DamageBounce`, `DeathPull` | `mutatorcombosharedpain.sc2mod` | `3260` |
| 167 | `TheLongestNight` | 漫漫长夜 | `AC_MeinhoffDayNight` | `JustDie`, `LongRange`, `PhotonOverload` | `mutatorcombothelongestnight.sc2mod` | `3261` |
| 168 | `TheQuickandtheUndead` | 迅捷亡尸 | `AC_AiurSiege` | `UnitSpeed`, `Reanimators` | `mutatorcombothequickandtheundead.sc2mod` | `3262` |
| 169 | `DecadeofDecadence` | 征战十年 | `AC_KorhalRift` | `Fireworks`, `RedEnvelopes`, `GiftFight` | `mutatorcombodecadeofdecadence.sc2mod` | `3263` |
| 170 | `BubblePop` | 泡泡世界 | `AC_CradleOfDeath` | `Barrier`, `Entomb`, `TimeWarp` | `mutatorcombobubblepop.sc2mod` | `3264` |
| 171 | `CoordinatedDefense` | 协同防御 | `AC_VeridiaCourier` | `MissileBarrage`, `Polarity` | `mutatorcombocoordinateddefense.sc2mod` | `3265` |
| 172 | `BeggarsCan'tBeChoosers` | 饥不择食 | `AC_UlnarLocks` | `Magnificent`, `SpiderMines`, `NoResources` | `mutatorcombobeggarscan'tbechoosers.sc2mod` | `3266` |
| 173 | `MyBots!` | 我的机器人！ | `AC_BelshirEscort` | `BoomBots`, `KillBots` | `mutatorcombomybots!.sc2mod` | `3267` |
| 174 | `MultitaskingTrainer` | 多线操作训练 | `AC_CybrosEscort` | `OrderCosts`, `VoidRifts` | `mutatorcombomultitaskingtrainer.sc2mod` | `3268` |
| 175 | `HelloMyOldFriend` | 老友重聚 | `AC_AiurSiege` | `Plague`, `BlackFog`, `MomentOfSilence` | `mutatorcombohellomyoldfriend.sc2mod` | `3269` |
| 176 | `OfOneMind` | 万众一心 | `AC_KorhalRift` | `BoomBots`, `Polarity`, `SharedSupply` | `mutatorcomboofonemind.sc2mod` | `3270` |
| 177 | `BlastingOffAgain` | 发射升空 | `AC_KaldirShuttle` | `Nukes`, `LavaBurst`, `OopsAllCasters` | `mutatorcomboblastingoffagain.sc2mod` | `3271` |
| 178 | `EnterTheNexus` | 进入时空枢纽 | `AC_CradleOfDeath` | `HeroesFromTheStorm`, `Blizzard` | `mutatorcomboenterthenexus.sc2mod` | `3272` |
| 179 | `DeathIsFleeting` | 死亡转瞬即逝 | `AC_MeinhoffDayNight` | `Reanimators`, `JustDie` | `mutatorcombodeathisfleeting.sc2mod` | `3273` |
| 180 | `MassManufacturing` | 批量生产 | `AC_PartAndParcel` | `Propagate`, `VoidRifts` | `mutatorcombomassmanufacturing.sc2mod` | `3274` |
| 181 | `FireInTheHole` | 小心手雷 | `AC_JarbanPointCapture` | `BoomBots`, `MissileBarrage` | `mutatorcombofireinthehole.sc2mod` | `3275` |

## 暂未回连的组合包

| 包 | 包中文名 | 包英文名 | 包内数值 | 备注 |
| --- | --- | --- | --- | --- |
| `mutatorcombochainexplosions.sc2mod` | 爆炸之链 | Chain Explosions | `3256` | 未在 `MutatorChallenges` 中找到同名组合；需后续人工或更深触发闭包确认。 |
| `mutatorcombochillingadaptation.sc2mod` | 寒栗进化 | Chilling Adaptation | `3176` | 未在 `MutatorChallenges` 中找到同名组合；需后续人工或更深触发闭包确认。 |
| `mutatorcombocontestwinner.sc2mod` | 黑暗时刻 | Mutation Creation Contest Winner | `3111` | 未在 `MutatorChallenges` 中找到同名组合；需后续人工或更深触发闭包确认。 |
| `mutatorcombofools.sc2mod` | 杀机讯发 | Sudden but Inevitable | `999` | 未在 `MutatorChallenges` 中找到同名组合；需后续人工或更深触发闭包确认。 |

## 非启用型包

| 包 | 中文名 | 英文名 | 备注 |
| --- | --- | --- | --- |
| `mutatorcustom.sc2mod` | 自定义突变 | Custom Mutators | 未找到 `EnableDisableMutator(true, ...)` 或 `SetMutatorWeeklyChallengeOn(...)`；当前看作自定义入口/容器包。 |

## 脚本说明

- 直接读取已导出的官方文本镜像，不需要本机安装 SC2。
- 默认输出 JSON 与 Markdown，可用 `--mirror-root` / `--output-dir` 指定输入输出。
- `MutatorChallenges` 的 `顺序` 是 UserData 中非 `[Default]` 实例的出现顺序，从 1 递增。
- 组合包里的 `SetMutatorWeeklyChallengeOn(n)` 保留为 `包内数值`；该数值并不总是等于 UserData 顺序，脚本优先用组合包 `DocInfo/Name` 和官方组合名做回连。

```powershell
node .\scripts\sc2\export-official-coop-mutator-factors.mjs
```
