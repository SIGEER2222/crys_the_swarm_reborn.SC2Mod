# 结构化 XML 修改工具

这套工具的目标不是替代索引脚本，而是把“修改”这一步也结构化。

适合处理的内容：

- 按对象 `id` 定位 XML 节点
- 用 XPath 精准修改节点属性
- 批量更新 `GameStrings.txt` 一类键值文本
- 把一次改动固化成可重复执行的 patch 文件

## 位置

- C# 项目：`tools/Sc2ModTool`
- PowerShell 入口：`scripts/sc2mod-edit.ps1`
- 示例 patch：`tools/patches/aberration-carapace.patch.json`

## 命令

查对象在哪个 XML：

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\sc2mod-edit.ps1 find -Id ImposingPresence
```

执行 patch：

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\sc2mod-edit.ps1 apply -Patch .\tools\patches\aberration-carapace.patch.json
```

先预演，不落盘：

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\sc2mod-edit.ps1 apply -Patch .\tools\patches\aberration-carapace.patch.json -WhatIf
```

## patch 格式

当前支持五种操作：

1. `setXmlAttribute`
2. `appendObject`
3. `insertChild`
4. `setStringValue`
5. `replaceTextInFile`

### `setXmlAttribute`

字段：

- `file`：相对 `crys_the_swarm_reborn.SC2Mod` 的路径
- `objectId`：对象 id
- `objectType`：可选，建议写上，避免重名命中多个节点
- `xpath`：相对对象节点的 XPath，`.` 表示对象本身
- `attribute`：要设置的属性名
- `value`：目标值
- `createPath`：可选，`true` 时允许按 `./A/B` 这种简单路径补创建节点

注意：

- SC2 的很多“属性”不是写在对象节点本身上
- 更常见的是 `./Alignment/@value`、`./InfoIcon/@value`、`./SearchFilters/@value` 这种结构
- 所以实际写 patch 时，通常是：
  `xpath` 指到子节点，再把 `attribute` 写成 `value`

### `setStringValue`

字段：

- `file`：相对 `crys_the_swarm_reborn.SC2Mod` 的路径
- `key`：文本 key
- `value`：文本值

### `appendObject`

适合往 `GameData.xml` 一类 catalog 文件里新增整段对象。

字段：

- `file`：相对 `crys_the_swarm_reborn.SC2Mod` 的路径
- `xml`：完整对象 XML 片段
- `afterObjectId`：可选，把对象插在某个已有对象后面
- `afterObjectType`：可选，和 `afterObjectId` 配合缩小匹配范围

行为：

- 如果新对象自带 `id`，且仓里已有同 id 同内容对象，会自动 `skip`
- 如果同 id 但内容不同，会直接报错，避免静默覆盖

### `insertChild`

适合给现有对象追加一行子节点，比如：

- 给单位加一个 `BehaviorArray`
- 给对象加一个 `ValidatorArray`
- 给卡片加一个 `LayoutButtons`

字段：

- `file`
- `objectId`
- `objectType`
- `xml`：子节点 XML 片段
- `afterXPath`：可选，插到某个现有子节点后面
- `uniqueXPath`：可选，如果命中就直接 `skip`

### `replaceTextInFile`

适合改 `.galaxy`、`.ps1`、`.md` 这类纯文本文件。

字段：

- `file`
- `find`
- `replace`
- `expectedCount`：可选，要求命中次数，防止误替换

## 当前边界

现在还没做：

- 删除节点
- 数组节点按 `index` 智能排序插入
- 基于 schema 的字段级校验
- 自动同步到游戏 live 目录

如果后面我们高频遇到“新增整段技能链”的需求，再继续给这个工具补：

- `removeNode`
- `sync-live`
