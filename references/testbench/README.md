# CommanderTestBench runtime assets

`CommanderTestBench.SC2Map/` is the actual SC2 map-package skeleton for the commander testbench.

It was created by copying an existing loadable `.SC2Map` folder template, then replacing `MapScript.galaxy` with a CommanderTestBench UI. This is different from the SVG in `docs/newdocs/测试台资源/`: the SVG is only a human-readable blueprint, while this folder is the asset SC2 can attempt to load.

Current status:

1. The map package keeps real SC2 binary components from the source template: `MapInfo`, `Objects`, `Regions`, `t3Terrain.xml`, terrain binary files, `ComponentList.SC2Components`, and dependencies.
2. `MapScript.galaxy` has been replaced with a CommanderTestBench UI:
   - 18 commander buttons.
   - 18 scenario buttons.
   - summary panel.
   - Clear / Rerun / Next Commander / Run Smoke buttons.
   - `[XM_DBG]` debug output.
3. Runtime calls to `XMFinal` are wired through `XMTestBench_*`:
   - `standard_base` sets a runtime commander override, then calls the current legacy `Initialize` / `InitializeBase` adapter.
   - The testbench override uses `AchBit=255` and six masteries at 30 without saving to the real `CampaignXCore` Bank.
   - `panel_cost_smoke` and `panel_effect_smoke` call `XM_InvokeCommanderPanelAbility` by command, not by mouse simulation.
   - roster, tech, transport, special, and personal-mechanic scenarios still log profile-stub warnings until the commander profiles are implemented.
4. The original template `Triggers` editor data is still present. Treat `MapScript.galaxy` as the current source of truth until the trigger editor data is regenerated or replaced.
5. This directory is under `references/testbench` and is intended to be a local reference copy.
6. A direct-load copy also exists at `原始mod/Maps/XM/CommanderTestBench.SC2Map/`. Open that copy in the SC2 Editor first, because its `DocumentInfo` dependency `file:Mods\XM\XMFinal.SC2Mod` resolves under the same `原始mod` directory layout as the existing campaign maps.

Next step:

Open `原始mod/Maps/XM/CommanderTestBench.SC2Map` in the SC2 Editor and confirm it loads. Use the buttons to switch commanders and run `standard_base`, `power_fusion`, and the panel smoke scenarios first. If the editor regenerates trigger data, keep the generated `MapScript.galaxy` aligned with the runtime API calls, then copy the updated script back to this reference copy if needed.
