param(
    [string]$RepoRoot = (Split-Path -Parent $PSScriptRoot)
)

$ErrorActionPreference = 'Stop'
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new($false)

$outputRoot = Join-Path $RepoRoot 'docs/每日进度/2026-05-31-九位指挥官双源原始抽取'
$internetDir = Join-Path $outputRoot 'internet'
$modDir = Join-Path $outputRoot 'mod'

if (-not (Test-Path $outputRoot)) {
    throw "输出目录不存在: $outputRoot"
}

function Replace-All {
    param(
        [string]$Text,
        [hashtable]$Map
    )

    $result = $Text
    foreach ($entry in $Map.GetEnumerator()) {
        $result = $result.Replace([string]$entry.Key, [string]$entry.Value)
    }

    return $result
}

$internetReplacements = [ordered]@{
    '# 雷诺 / Raynor 互联网原始来源' = '# 雷诺 / Raynor 互联网原始来源（中文整理）'
    '# 阿拉纳克 / Alarak 互联网原始来源' = '# 阿拉纳克 / Alarak 互联网原始来源（中文整理）'
    '# 阿塔尼斯 / Artanis 互联网原始来源' = '# 阿塔尼斯 / Artanis 互联网原始来源（中文整理）'
    '# 菲尼克斯 / Fenix 互联网原始来源' = '# 菲尼克斯 / Fenix 互联网原始来源（中文整理）'
    '# 凯拉克斯 / Karax 互联网原始来源' = '# 凯拉克斯 / Karax 互联网原始来源（中文整理）'
    '# 斯旺 / Swann 互联网原始来源' = '# 斯旺 / Swann 互联网原始来源（中文整理）'
    '# 沃拉尊 / Vorazun 互联网原始来源' = '# 沃拉尊 / Vorazun 互联网原始来源（中文整理）'
    '# 扎加拉 / Zagara 互联网原始来源' = '# 扎加拉 / Zagara 互联网原始来源（中文整理）'
    '# 泽拉图 / Zeratul 互联网原始来源' = '# 泽拉图 / Zeratul 互联网原始来源（中文整理）'
    '## Level Unlocks' = '## 等级解锁'
    '## Calldowns' = '## 呼叫支援'
    '## Combat Units' = '## 作战单位'
    '## Build Order' = '## 开局顺序'
    '## Masteries' = '## 精通'
    '## Prestiges' = '## 威望'
    '| Name | Description | Cooldown | Energy Cost |' = '| 名称 | 描述 | 冷却 | 能量消耗 |'
    '| Name | Description | Recommended Usage | Numbers |' = '| 名称 | 描述 | 推荐用法 | 数值 |'
    '| Name | Effect | / | Research Time |' = '| 名称 | 效果 | / | 研究时间 |'
    '- Highlighted rows denote large power spikes for the commander.' = '- 高亮行表示该指挥官的重要强势节点。'
}

$modReplacements = [ordered]@{
    '# 雷诺 / Raynor Mod 原始来源' = '# 雷诺 / Raynor Mod 原始来源（中文整理）'
    '# 阿拉纳克 / Alarak Mod 原始来源' = '# 阿拉纳克 / Alarak Mod 原始来源（中文整理）'
    '# 阿塔尼斯 / Artanis Mod 原始来源' = '# 阿塔尼斯 / Artanis Mod 原始来源（中文整理）'
    '# 菲尼克斯 / Fenix Mod 原始来源' = '# 菲尼克斯 / Fenix Mod 原始来源（中文整理）'
    '# 凯拉克斯 / Karax Mod 原始来源' = '# 凯拉克斯 / Karax Mod 原始来源（中文整理）'
    '# 斯旺 / Swann Mod 原始来源' = '# 斯旺 / Swann Mod 原始来源（中文整理）'
    '# 沃拉尊 / Vorazun Mod 原始来源' = '# 沃拉尊 / Vorazun Mod 原始来源（中文整理）'
    '# 扎加拉 / Zagara Mod 原始来源' = '# 扎加拉 / Zagara Mod 原始来源（中文整理）'
    '# 泽拉图 / Zeratul Mod 原始来源' = '# 泽拉图 / Zeratul Mod 原始来源（中文整理）'
    '## 建筑' = '## 建筑'
    '## 兵种' = '## 兵种'
    '## 面板与技能' = '## 面板与技能'
    '## 原始ID列表' = '## 原始ID列表'
    '| CUnit | 脚印 | 部署脚印 | Ability | Behavior | 按钮 |' = '| 单位ID | 脚印 | 部署脚印 | 技能 | 行为 | 按钮 |'
    '| 来源CUnit | 类型 | Face | AbilCmd | Requirements |' = '| 来源单位 | 类型 | Face | AbilCmd | Requirements |'
}

$filesChanged = 0

foreach ($file in Get-ChildItem -Path $internetDir -Filter *.md -File) {
    $text = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
    $updated = Replace-All -Text $text -Map $internetReplacements
    if ($updated -ne $text) {
        [System.IO.File]::WriteAllText($file.FullName, $updated, [System.Text.Encoding]::UTF8)
        $filesChanged++
    }
}

foreach ($file in Get-ChildItem -Path $modDir -Filter *.md -File) {
    $text = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
    $updated = Replace-All -Text $text -Map $modReplacements
    if ($updated -ne $text) {
        [System.IO.File]::WriteAllText($file.FullName, $updated, [System.Text.Encoding]::UTF8)
        $filesChanged++
    }
}

$readmePath = Join-Path $outputRoot 'README.md'
$readme = @'
# 九位指挥官双源原始抽取

- 目录说明：`internet/` 是公开网站原文原始抽取，`mod/` 是当前 Mod 代码 XML 原始抽取。
- 语言说明：外层说明、标题和表头已改为中文；来源正文仍保留原始文本，便于后续人工或其他 AI 继续整理。
- 适用范围：阿拉纳克、阿塔尼斯、菲尼克斯、凯拉克斯、雷诺、斯旺、沃拉尊、扎加拉、泽拉图。

建议先看每位指挥官同名的 `internet` 和 `mod` 两份文件，再做内容对照。
'@
[System.IO.File]::WriteAllText($readmePath, $readme, [System.Text.Encoding]::UTF8)

Write-Host "已本地化 $filesChanged 个文件，并写入中文说明: $readmePath"
