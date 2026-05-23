# -*- coding: utf-8 -*-
path = r'C:\Users\22448\Downloads\重生虫心0.71汉化版（新）\reborn_workrepo\docs\指挥官\指挥官文档整理状态-2026-05-23.md'
with open(path, 'rb') as f:
    raw = f.read()
content = raw.decode('gbk', errors='replace')

# Find Tachyus in the list section
idx = content.find('Tychus')
if idx >= 0:
    print('Found Tachyus at', idx)
    print('Context:', repr(content[idx:idx+30]))
    # Insert Karax after Tachyus (before the closing ```)
    # Pattern: Tychus\r\n```  -> Tychus\r\nKarax\r\n```
    old = 'Tychus\r\n\u0060\u0060\u0060'
    new = 'Tychus\r\nKarax\r\n\u0060\u0060\u0060'
    if old in content:
        content = content.replace(old, new)
        print('Added Karax to list')
    else:
        # Try without backslash r
        old2 = 'Tychus\n\u0060\u0060\u0060'
        if old2 in content:
            content = content.replace(old2, 'Tychus\nKarax\n\u0060\u0060\u0060')
            print('Added Karax to list (LF only)')
        else:
            print('Pattern not found')
            # Find the exact text around Tachyus
            end_idx = content.find('\u0060\u0060\u0060', idx)
            if end_idx >= 0:
                print('``` found at', end_idx)
                print('Segment:', repr(content[idx-5:end_idx+5]))

# Write back
with open(path, 'wb') as f:
    f.write(content.encode('gbk'))
print('Written, size:', len(content))
