param([string]$RepoRoot)
$ErrorActionPreference = "Stop"
if (-not $RepoRoot) { $RepoRoot = Split-Path -Parent (Split-Path -Parent (Split-Path -Parent $PSScriptRoot)) }
$path = Join-Path $RepoRoot "docs\指挥官\指挥官文档整理状态-2026-05-23.md"
if (-not (Test-Path $path)) { Write-Host "File not found"; exit 1 }

$enc = [System.Text.Encoding]::GetEncoding("gb2312")
$content = [System.IO.File]::ReadAllText($path, $enc)
$before = $content.Length

$oldTachyonList = "Abathur`r`nAlarak`r`nDehaka`r`nKerrigan`r`nMengsk`r`nMira`r`nNova`r`nStetmann`r`nStukov`r`nSwann`r`nTychus"
$newTachyonList = "Abathur`r`nAlarak`r`nDehaka`r`nKerrigan`r`nMengsk`r`nMira`r`nNova`r`nStetmann`r`nStukov`r`nSwann`r`nTychus`r`nKarax"
$content = $content -replace [regex]::Escape($oldTachyonList), $newTachyonList

$content = $content -replace [regex]::Escape("当前 11 个指挥官模块数据规模"), "当前 12 个指挥官模块数据规模"
$content = $content -replace [regex]::Escape("当前 11 个模块"), "当前 12 个模块"
$content = $content -replace [regex]::Escape("官方导入脚本和验证脚本列表"), "官方导入脚本和验证脚本列表（包括 validate-karax-port.ps1）"

$oldRow = [regex]::Escape("| `SC2Map结构与指挥官地图适配说明-2026-05-23.md` | 4937 bytes |")
$newRow = [regex]::Escape("| `SC2Map结构与指挥官地图适配说明-2026-05-23.md` | 4937 bytes |") + "`r`n| `Karax当前状态.md` | 新建 |"
$content = $content -replace $oldRow, ($newRow -replace [regex]::Escape("| `SC2Map结构与指挥官地图适配说明-2026-05-23.md` | 4937 bytes |"), "| `SC2Map结构与指挥官地图适配说明-2026-05-23.md` | 4937 bytes |`r`n| `Karax当前状态.md` | 新建 |")

if ($content.Length -eq $before) { Write-Host "No changes" } else { Write-Host "Changed by $($content.Length - $before) chars" }
[System.IO.File]::WriteAllText($path, $content, $enc)
Write-Host "Done"
