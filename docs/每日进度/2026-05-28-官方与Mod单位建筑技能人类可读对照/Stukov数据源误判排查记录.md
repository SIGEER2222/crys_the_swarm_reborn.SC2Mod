# Stukov 数据源误判排查记录

- 日期：2026-05-28
- 范围：官方合作指挥官数据提取、Stukov 单位名册、人类可读对照报告
- 结论：问题不在报告格式，而在官方数据提取器对 `TechUnit` 的信任过高。Stukov 的 `TechUnit` 里混有普通异虫单位和残留单位，实际生产入口应以 Stukov 建筑命令卡和训练技能为准。

## 用户反馈

用户指出：

- Stukov 不应该有 `虫后 / SwarmQueen`。
- Stukov 不应该有 `跳虫 / Zergling`。
- Stukov 缺少 `被感染的女妖`。
- Stukov 缺少 `被感染的解放者`。
- 怀疑当前官方数据源或提取逻辑有问题。

## 问题位置

生成前的错误主要出现在：

- `游戏数据/官方合作指挥官/commanders/Stukov/units.json`
- `游戏数据/官方合作指挥官/commanders/Stukov/roster.json`
- `docs/每日进度/2026-05-28-官方与Mod单位建筑技能人类可读对照/official-vs-mod-readable-units-buildings-hero-skills.md`

错误表现：

| 错误项 | 错误原因 |
| --- | --- |
| `虫后 / SwarmQueen` 被列入 Stukov | `userdata.xml` 的 `TechUnit/SwarmQueen` 同时挂了 `ZergKerrigan`、`ZergZagara`、`ZergStukov`，但这不是 Stukov 当前星港可用单位名册。 |
| `跳虫 / Zergling` 被列入 Stukov | `userdata.xml` 的 `TechUnit/Zergling` 同时挂了多个异虫指挥官，其中包含 `ZergStukov`，提取器直接按 `PlayerCommanders` 收录导致误收。 |
| `被感染的怨灵战机 / SIWraith` 被列入 Stukov | `TechUnit/StukovInfestedWraith` 在 `userdata.xml` 仍存在，但当前 Stukov 星港面板没有对应生产入口。 |
| `被感染的女妖 / StukovInfestedBanshee` 缺失 | 它不在 `TechUnit` 列表里，但实际由 `SIStarportTrain,Train1` 生产。 |
| `被感染的解放者 / SILiberator` 缺失 | 它不在 `TechUnit` 列表里，但实际由 `SIStarportTrain,Train2` 生产。 |

## 证据链

### 1. `TechUnit` 确实带有误导性 Stukov 标记

文件：

`references/sc2-build-96883-casc-export/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/userdata.xml`

观察到：

- `Instances Id="SwarmQueen"` 下包含 `PlayerCommanders = ZergStukov`。
- `Instances Id="Zergling"` 下包含 `PlayerCommanders = ZergStukov`。
- `Instances Id="StukovInfestedWraith"` 下包含 `PlayerCommanders = ZergStukov`。
- 没有 `Instances Id="StukovInfestedBanshee"`。
- 没有 `Instances Id="SILiberator"`。

这说明：单独读取 `TechUnit + PlayerCommanders` 会把 Stukov 名册读歪。

### 2. Stukov 实际星港面板指向女妖和解放者

文件：

`references/sc2-build-96883-casc-export/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml`

关键入口：

| 建筑 | 按钮 | 技能命令 |
| --- | --- | --- |
| `SIStarport` | `SIBanshee` | `SIStarportTrain,Train1` |
| `SIStarport` | `SILiberator` | `SIStarportTrain,Train2` |

### 3. 训练技能确认实际单位

文件：

`references/sc2-build-96883-casc-export/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/abildata.xml`

关键入口：

| 技能命令 | 中间单位 | 实际单位链 |
| --- | --- | --- |
| `SIStarportTrain,Train1` | `SICocoonInfestedBanshee` | `SIMorphtoInfestedBanshee,Train1` -> `StukovInfestedBanshee` |
| `SIStarportTrain,Train2` | `SICocoonInfestedLiberator` | `SIMorphtoInfestedValkrie,Train1` -> `SILiberator` |

### 4. 中文名确认

文件：

`references/sc2-build-96883-casc-export/mods/starcoop/starcoop.sc2mod/zhcn.sc2data/localizeddata/gamestrings.txt`

关键文本：

| ID | 中文 |
| --- | --- |
| `Button/Name/SIBanshee` | 孵化被感染的女妖 |
| `Button/Name/SILiberator` | 孵化被感染的解放者 |
| `Unit/Name/StukovInfestedBanshee` | 被感染的女妖 |
| `Unit/Name/SILiberator` | 被感染的解放者 |

## 已修改内容

修改文件：

`scripts/sc2/export-official-coop-game-data.py`

### 1. 为 Stukov 增加 curated 单位补充

位置：`CURATED_COMMANDER_UNIT_IDS`

新增：

```python
"Stukov": [
    "StukovInfestedBanshee",
    "SILiberator",
],
```

目的：补回不在 `TechUnit` 里、但由 Stukov 实际命令卡生产的单位。

### 2. 为 Stukov 增加生产链覆盖

位置：`TECH_PRODUCTION_COMMAND_OVERRIDES`

新增：

```python
"StukovInfestedBanshee": [
    {
        "producer_unit_id": "SIStarport",
        "button_face": "SIBanshee",
        "abil_cmd": "SIStarportTrain,Train1",
    },
],
"SILiberator": [
    {
        "producer_unit_id": "SIStarport",
        "button_face": "SILiberator",
        "abil_cmd": "SIStarportTrain,Train2",
    },
],
```

目的：让报告显示正确的建筑来源、按钮、费用、耗时。

### 3. 排除 Stukov 误导条目

位置：`COMMANDER_TECH_ENTRY_EXCLUDES`

新增：

```python
"Stukov": {
    "StukovInfestedWraith",
    "SwarmQueen",
    "Zergling",
},
```

目的：避免 `TechUnit` 残留/泛用条目继续污染 Stukov 单位名册。

### 4. 修正生产链解析的错误回填

位置：`resolve_production_metadata()` / `parse_command()`

新增逻辑：

- 当 `InfoArray.Unit` 指向 `Cocoon`、`SpawnerUnit`、`Egg` 等中间形态时，先尝试解析成真实产出单位；
- 只有在解析不到真实单位时，才回退到当前条目的 `unit_id`。

目的：

- 避免把 `SIStarportTrain,Train2 -> SICocoonInfestedLiberator` 这类命令错误回填成 `SIWraith`；
- 避免旧 `ArmyCategory` 上残留的 `AbilCommandArray` 被直接当成当前条目的有效生产入口。

### 5. 为 Stukov 增加“可信生产者”校验

位置：`COMMANDER_TRUSTED_PRODUCTION_RULES` + `has_trusted_commander_production()`

当前规则：

- `Stukov` 的最终 roster 只接受以下两类条目：
  - 命中可信生产者链的条目；
  - 显式 curated 补录条目（当前是 `StukovInfestedBanshee`、`SILiberator`）。
- 当前可信生产者集合为：
  - `SISCV`
  - `SICommandCenter`
  - `SIBarracks`
  - `SIFactory`
  - `SIStarport`

目的：

- 让 `SwarmQueen`、`Zergling`、`StukovInfestedWraith` 这种“能从旧残留命令或中间单位链误撞到候选入口”的条目自动出局；
- 不再只依赖 `Stukov` 的手工黑名单兜底。

## 已重新生成的文件

重新生成官方合作指挥官 JSON：

- `游戏数据/官方合作指挥官/commanders/Stukov/units.json`
- `游戏数据/官方合作指挥官/commanders/Stukov/roster.json`
- `游戏数据/官方合作指挥官/commanders/Stukov/command_cards.json`
- 以及同一输出目录下的相关官方 commander JSON 文件。

重新生成报告：

- `docs/每日进度/2026-05-28-官方与Mod单位建筑技能人类可读对照/official-vs-mod-readable-units-buildings-hero-skills.md`
- `docs/每日进度/2026-05-28-官方指挥官与mod差异对比/official-vs-mod-by-commander.md`
- `docs/每日进度/2026-05-28-官方指挥官与mod差异对比/official-vs-mod-by-commander.json`

## 验证结果

验证命令：

```powershell
node -e "const fs=require('fs'); const u=JSON.parse(fs.readFileSync('游戏数据/官方合作指挥官/commanders/Stukov/units.json','utf8')); const bad=u.filter(x=>/SwarmQueen|Zergling|Wraith|虫后|跳虫|怨灵/.test(JSON.stringify(x))); console.log('badMatches='+bad.length); console.log(u.map(x=>x.name+'('+x.unit_id+')').join(', '));"
```

结果：

```text
badMatches=0
被感染的平民(SIInfestedCivilian), 被感染的陆战队员(SIInfestedMarine), 被感染的攻城坦克(StukovInfestedSiegeTank), 被感染的女妖(StukovInfestedBanshee), 被感染的解放者(SILiberator)
```

当前报告 Stukov 作战单位：

| 单位 | ID | 来源 |
| --- | --- | --- |
| 被感染的平民 | `SIInfestedCivilian` | `SICommandCenter / SICommandCenterTrain` |
| 被感染的陆战队员 | `SIInfestedMarine` | `SIBarracks / SIBarracksTrain` |
| 被感染的攻城坦克 | `StukovInfestedSiegeTank` | `SIFactory / SIFactoryTrain` |
| 被感染的女妖 | `StukovInfestedBanshee` | `SIStarport / SIStarportTrain,Train1` |
| 被感染的解放者 | `SILiberator` | `SIStarport / SIStarportTrain,Train2` |

当前 Stukov 报告中不再列出：

- `虫后 / SwarmQueen`
- `跳虫 / Zergling`
- `被感染的怨灵战机 / SIWraith`

## 根因总结

这次不是“官方 CASC 没有数据”，而是“官方数据层级用途不同”叠加“生产链解析回填过宽”：

- `TechUnit` 更像合作模式选择/展示/科技名册的混合数据，不一定等于当前指挥官实际可生产单位。
- Stukov 这种经过多次改版或有残留条目的指挥官，`TechUnit.PlayerCommanders` 会出现过时或泛用绑定。
- 旧版提取器在遇到 `Cocoon` / `SpawnerUnit` / 旧 `ArmyCategory` 命令时，会把中间形态回填成当前条目的 `unit_id`，从而把 `SIStarportTrain,Train2` 这类实际对应解放者的命令伪装成 `SIWraith` 的有效入口。
- 真正判断单位是否属于某指挥官，应同时看：
  - 指挥官建筑命令卡；
  - 训练/变形技能；
  - 生产出的实际单位；
  - 中文按钮和单位名；
  - 当前 Mod 是否已有对应 Catalog。

## 后续其他指挥官如何避免同类问题

### 1. 不要只信 `TechUnit.PlayerCommanders`

以后每个指挥官名册至少分三类：

| 类型 | 处理方式 |
| --- | --- |
| `TechUnit` 有、命令卡也有 | 可作为正常单位。 |
| `TechUnit` 有、命令卡没有 | 标记为疑似残留/展示项，不能直接列入实际单位。 |
| `TechUnit` 没有、命令卡有 | 应补入 curated roster，并记录生产链证据。 |

### 2. 报告里要优先显示“生产链证据”

只显示“官方有哪些 ID”不够。应优先显示：

- 哪个建筑生产；
- 哪个按钮；
- 哪个 `AbilCmd`；
- 最终产出单位；
- 当前 Mod 是否定义了单位和技能。

如果生产者是 `未知来源`，或只命中泛用 `LarvaTrain` / `ProtossBuild` / `TrainQueen`，需要人工复核。

### 3. 对以下指挥官优先做同类复核

| 指挥官 | 风险点 |
| --- | --- |
| `Stukov` | 感染单位、茧变形、旧怨灵/女妖/解放者切换历史。 |
| `Kerrigan` | 跳虫变种、英雄单位、装甲归零等升级效果容易被普通跳虫覆盖。 |
| `Zagara` | 裂变虫、爆虫链、多只孵化等效果不能只看普通 `Zergling`。 |
| `Abathur` | 生物质、终极进化、单位变体容易被基础单位覆盖。 |
| `Dehaka` | 原始单位、等级形态、首领单位有多段变体。 |
| `Stetmann` | 机械异虫单位 ID 与普通异虫相似，容易误判为基础单位。 |
| `Zeratul` | 召唤/投射/神器解锁单位容易和普通星灵单位混淆。 |

### 4. 提取器后续建议

建议后续把当前 Stukov 手工修正沉淀成通用审计规则：

1. 对每个指挥官输出 `TechUnit-only` 列表：有 TechUnit 归属，但没有任何本指挥官建筑生产链。
2. 对每个指挥官输出 `CommandCard-only` 列表：有本指挥官建筑命令卡生产链，但没有 TechUnit。
3. `TechUnit-only` 默认不进入最终“实际作战单位”，除非有明确例外。
4. `CommandCard-only` 默认进入候选补充名单，并要求记录 `producer / button / abil_cmd / produced_unit`。
5. 对 `Cocoon`、`SpawnerUnit`、`Dummy`、`Burrowed`、`Sieged` 这类中间形态，必须追到最终可选中/可战斗单位。

## 当前限制

当前环境没有 SC2，无法进游戏确认面板实际显示和运行时行为。本次验证是基于 CASC XML、官方中文字符串、当前 Mod XML 命中情况和生成报告的静态验证。

## 本轮重跑说明

- 本轮重新导出使用：
  - `references/sc2-build-96883-casc-export`
- 本轮重新生成：
  - `游戏数据/官方合作指挥官/commanders/Stukov/units.json`
  - `游戏数据/官方合作指挥官/commanders/Stukov/roster.json`
  - `docs/每日进度/2026-05-28-官方与Mod单位建筑技能人类可读对照/official-vs-mod-readable-units-buildings-hero-skills.md`
  - `docs/每日进度/2026-05-28-官方指挥官与mod差异对比/official-vs-mod-by-commander.md`
  - `docs/每日进度/2026-05-28-官方指挥官与mod差异对比/official-vs-mod-by-commander.json`

