# -*- coding: utf-8 -*-
import os

repo_root = r'C:\Users\22448\Downloads\重生虫心0.71汉化版（新）\reborn_workrepo'
overview_path = os.path.join(repo_root, 'docs', '指挥官', '指挥官文档整理状态-2026-05-23.md')

# Read with PowerShell's default encoding (GBK on Chinese Windows)
import subprocess

ps_script = r'''
$path = Join-Path (Split-Path -Parent (Split-Path -Parent (Split-Path -Parent '%REPO%'))) 'docs\指挥官\指挥官文档整理状态-2026-05-23.md'
Write-Output "FILE:$path"
if (Test-Path $path) {
    $content = Get-Content $path -Raw -Encoding Default
    Write-Output "LEN:$($content.Length)"
    Write-Output "CONTENT_START"
    Write-Output $content
    Write-Output "CONTENT_END"
} else {
    Write-Error "File not found: $path"
}
''' % {'REPO': repo_root.replace('\\', '\\\\')}

result = subprocess.run(
    ['powershell', '-NoProfile', '-Command', ps_script],
    capture_output=True, text=True, encoding='utf-8', errors='replace'
)

output = result.stdout
if result.returncode != 0:
    print("Error:", result.stderr)
    exit(1)

lines = output.split('\n')
content_start = None
for i, line in enumerate(lines):
    if line == 'CONTENT_START':
        content_start = i + 1
    elif line == 'CONTENT_END':
        content_end = i
        break

if content_start is None:
    print("Could not find CONTENT_START in output")
    print(output[:500])
    exit(1)

content = '\n'.join(lines[content_start:content_end])
print(f"Read {len(content)} chars")
print("First 100 chars:", repr(content[:100]))

# Make replacements
import re

old_list = 'Abathur\r\nAlarak\r\nDehaka\r\nKerrigan\r\nMengsk\r\nMira\r\nNova\r\nStetmann\r\nStukov\r\nSwann\r\nTychus'
new_list = 'Abathur\r\nAlarak\r\nDehaka\r\nKerrigan\r\nMengsk\r\nMira\r\nNova\r\nStetmann\r\nStukov\r\nSwann\r\nTychus\r\nKarax'

content_new = content.replace(old_list, new_list)

# Find and replace the Chinese parts using regex on the latin-1-like representation
# We look for the pattern "當前 11 個..." by finding the 11 followed by known phrases
content_new = re.sub(
    r'(當前|鐣跺墠) 11 (個指揮官模塊數據規模|鍊嬫ā濉?)',
    lambda m: m.group(0).replace(' 11 ', ' 12 '),
    content_new
)

# Also handle ASCII patterns
content_new = re.sub(
    r'(?<![0-9])11(?!-)(?= 個)',
    '12',
    content_new
)

# Find and add the new table row - look for the table row pattern
old_table_pattern = r'(\| `SC2Map結.*?\| 4937 bytes \|)(\r?\n)'
match = re.search(r'(\| `SC2Map結.*?\| 4937 bytes \|)(\r?\n)', content_new)
if match:
    new_table = match.group(1) + match.group(2) + '| `Karax當前狀態.md` | 新建 |\n'
    content_new = content_new[:match.start()] + new_table + content_new[match.end():]
    print("Added Karax row to table")
else:
    print("Table row not found")

# Also add to scripts list
if '官方導入腳本和驗證腳本列表' in content_new:
    content_new = content_new.replace(
        '官方導入腳本和驗證腳本列表',
        '官方導入腳本和驗證腳本列表（包括 validate-karax-port.ps1）'
    )
    print("Updated scripts list")

print(f"New length: {len(content_new)}")
print("Changed:", content_new != content)

# Write back using PowerShell's default encoding
ps_write = r'''
$path = Join-Path (Split-Path -Parent (Split-Path -Parent (Split-Path -Parent '%REPO%'))) 'docs\指揮官\指揮官文檔整理狀態-2026-05-23.md'
$content = @'
%s
'@
Set-Content -Path $path -Value $content -Encoding Default -NoNewline
Write-Host "Written to $path"
''' % content_new

result2 = subprocess.run(
    ['powershell', '-NoProfile', '-Command', ps_write],
    capture_output=True, text=True, encoding='utf-8', errors='replace'
)
print("Write result:", result2.stdout)
if result2.returncode != 0:
    print("Write error:", result2.stderr[:500])
