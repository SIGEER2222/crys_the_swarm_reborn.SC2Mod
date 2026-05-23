# -*- coding: utf-8 -*-
import subprocess, os

repo = r'C:\Users\22448\Downloads\重生虫心0.71汉化版（新）\reborn_workrepo'
doc_path = os.path.join(repo, 'docs', '指挥官', '指挥官文档整理状态-2026-05-23.md')
temp_path = os.path.join(os.environ['TEMP'], 'overview_content.txt')

ps = f'''
$path = '{doc_path}'
$c = Get-Content $path -Raw -Encoding Default
$c | Out-File '{temp_path}' -Encoding Default -NoNewline
Write-Output 'OK'
'''

result = subprocess.run(
    ['powershell', '-NoProfile', '-Command', ps],
    capture_output=True, text=True, encoding='utf-8', errors='replace'
)
print('PS stdout:', result.stdout.strip())
if result.returncode != 0:
    print('PS stderr:', result.stderr[:200])

if os.path.exists(temp_path):
    with open(temp_path, 'r', encoding='cp936', errors='replace') as f:
        content = f.read()
    print(f'Content length: {len(content)}')
    if len(content) > 4000:
        print('WARNING: File seems corrupted (too long)')
    else:
        print('File looks OK')
        print('First 80:', repr(content[:80]))
        content2 = content.replace('Abathur\r\nAlarak\r\nDehaka\r\nKerrigan\r\nMengsk\r\nMira\r\nNova\r\nStetmann\r\nStukov\r\nSwann\r\nTychus',
                                 'Abathur\r\nAlarak\r\nDehaka\r\nKerrigan\r\nMengsk\r\nMira\r\nNova\r\nStetmann\r\nStukov\r\nSwann\r\nTychus\r\nKarax')
        content2 = content2.replace('11 个指挥官模块数据规模', '12 个指挥官模块数据规模')
        content2 = content2.replace('11 个模块', '12 个模块')
        content2 = content2.replace('官方导入脚本和验证脚本列表',
                                   '官方导入脚本和验证脚本列表（包括 validate-karax-port.ps1）')
        tbl = '| `SC2Map结构与指挥官地图适配说明-2026-05-23.md` | 4937 bytes |'
        if tbl in content2:
            content2 = content2.replace(tbl, tbl + '\r\n| `Karax当前状态.md` | 新建 |')
            print('Added Karax to table')
        else:
            print('Table pattern not found')
        if content2 != content:
            print(f'Changes: {len(content2) - len(content)} chars')
            with open(temp_path, 'w', encoding='cp936', errors='replace') as f:
                f.write(content2)
            with open(temp_path, 'rb') as f:
                raw = f.read()
            with open(doc_path, 'wb') as f:
                f.write(raw)
            print('Written')
        else:
            print('No changes needed')
else:
    print('Temp file not found at', temp_path)
