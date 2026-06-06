# 7vs1 Preset 测试结果

生成时间：2026-06-06 00:15:44 +08:00

地图：

```text
E:\SC2\SC2new\StarCraft II\Maps\7vs1\7vs1CoopTest.SC2Map
```

已知非阻断 warning：

```text
无法覆盖选项[startingrally]，因为其无法被覆盖，也无法被找到。
```

## 覆盖结论

- 覆盖 commander：18/18
- 缺失 commander：无
- Batch1：通过，只有已知 `startingrally` warning
- Batch2：通过，只有已知 `startingrally` warning
- Batch3：通过，只有已知 `startingrally` warning
- TychusP1：通过，只有已知 `startingrally` warning

## 测试矩阵

| Preset | P1 | P2 | P3 | P4 | P5 | P6 | P7 | ScriptError | Blocking errors |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ---: |
| Batch1 | TerranRaynor | ZergKerrigan | ProtossArtanis | TerranNova | ZergAbathur | ProtossFenix | ProtossVorazun | `C:\Users\22448\Documents\StarCraft II\GameLogs\2026-06-06 00.13.15 ScriptError.txt` | 0 |
| Batch2 | TerranSwann | ZergZagara | ProtossKarax | TerranHorner | ZergDehaka | ProtossAlarak | ZergStukov | `C:\Users\22448\Documents\StarCraft II\GameLogs\2026-06-06 00.14.04 ScriptError.txt` | 0 |
| Batch3 | ProtossZeratul | ZergStetmann | TerranMengsk | ProtossArtanis | TerranRaynor | ZergKerrigan | ProtossVorazun | `C:\Users\22448\Documents\StarCraft II\GameLogs\2026-06-06 00.14.49 ScriptError.txt` | 0 |
| TychusP1 | TerranTychus | TerranRaynor | ZergKerrigan | ProtossArtanis | TerranNova | ZergAbathur | ProtossFenix | `C:\Users\22448\Documents\StarCraft II\GameLogs\2026-06-06 00.15.44 ScriptError.txt` | 0 |

## 覆盖列表

- ProtossAlarak
- ProtossArtanis
- ProtossFenix
- ProtossKarax
- ProtossVorazun
- ProtossZeratul
- TerranHorner
- TerranMengsk
- TerranNova
- TerranRaynor
- TerranSwann
- TerranTychus
- ZergAbathur
- ZergDehaka
- ZergKerrigan
- ZergStetmann
- ZergStukov
- ZergZagara

## 判断

这些结果证明当前 local smoke test harness 可以按 preset 初始化全部 18 个 commander，并进入 7vs1 地图脚本运行期。测试结论不等于多人 Battle.net lobby 完整行为已验证；当前验证范围是 `SC2Switcher` 本地直开、7 槽 commander runtime 初始化、主基地/工人锚点创建和 ScriptError 阻断错误排除。
