# CommanderTestBench 19 人启动验证

验证命令：

```powershell
pwsh -NoProfile -ExecutionPolicy Bypass -File .\scripts\launch-xm-map.ps1 -Commander <Commander> -MapPath "E:\SC2\SC2new\StarCraft II\Maps\XM\CommanderTestBench.SC2Map"
```

验证结果：

- `Raynor` OK
- `Kerrigan` OK
- `Artanis` OK
- `Swann` OK
- `Zagara` OK
- `Vorazun` OK
- `Karax` OK
- `Abathur` OK
- `AbathurReborn` OK
- `Alarak` OK
- `Nova` OK
- `Stukov` OK
- `Fenix` OK
- `Dehaka` OK
- `Horner` OK
- `Tychus` OK
- `Zeratul` OK
- `Stetmann` OK
- `Mengsk` OK

说明：

- 批量启动期间未见新的 `ScriptError.txt` 报错内容。
- 各轮 `SC2_x64.exe` 都能重新拉起，说明测试地图至少已经通过启动层面验证。
- 这份结果先作为后续做 19 指挥官逐个补全和深度 smoke 的起点。
