# CommanderTestBench runtime assets

`CommanderTestBench.SC2Map/` is the actual SC2 map-package skeleton for the commander testbench.

It was created by copying an existing loadable `.SC2Map` folder template, then replacing `MapScript.galaxy` with a minimal testbench stub. This is different from the SVG in `docs/newdocs/测试台资源/`: the SVG is only a human-readable blueprint, while this folder is the asset SC2 can attempt to load.

Current status:

1. The map package keeps real SC2 binary components from the source template: `MapInfo`, `Objects`, `Regions`, `t3Terrain.xml`, terrain binary files, `ComponentList.SC2Components`, and dependencies.
2. `MapScript.galaxy` has been replaced with a CommanderTestBench stub UI:
   - 18 commander buttons.
   - 18 scenario buttons.
   - summary panel.
   - Clear / Rerun / Next Commander / Run All Stub buttons.
   - `[XM_DBG]` debug output.
3. Runtime calls to `XMFinal` are not wired yet. The map currently logs stub events instead of creating commander units.
4. The original template `Triggers` editor data is still present. Treat `MapScript.galaxy` as the current source of truth until the trigger editor data is regenerated or replaced.
5. This directory is currently ignored by `.gitignore` through `runtime/*`. It exists on this workstation and can be opened locally, but it will not be included in Git unless the ignore rule is changed or the map is moved to a tracked asset directory.

Next step:

Open `CommanderTestBench.SC2Map` in the SC2 Editor and confirm it loads. If the editor regenerates trigger data, keep the generated `MapScript.galaxy` aligned with the `XMTestBench_*` design in `docs/newdocs/CommanderTestBench地图详细设计-2026-05-27.md`.
