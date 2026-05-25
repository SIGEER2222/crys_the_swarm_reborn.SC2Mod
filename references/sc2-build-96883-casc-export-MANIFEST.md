# SC2 Build 96883 CASC Export

Date: 2026-05-25

Source storage:

- `E:\SC2\SC2new\StarCraft II\SC2Data`
- Product: `s2`
- Build: `96883`
- Total CASC files reported by tool: `779385`

Extraction tool:

- `tools\casc\CascDump`

Export root:

- `references\sc2-build-96883-casc-export`

Extract list:

- `references\sc2-build-96883-casc-export-extract-list.txt`

Scope:

- Text/catalog resources under `mods\starcoop\...`
- Text/catalog resources under `mods\alliedcommanders.sc2mod\...`
- Includes `starcoop.sc2mod`, `arcturusmengsk.sc2mod`, `egonstetmann.sc2mod`, and localized text files found in the current installed CASC data.

Counts:

- Extracted files: `337`
- Extracted bytes: `89905556`

Verified key files:

- `mods\starcoop\starcoop.sc2mod\base.sc2data\gamedata\unitdata.xml`
- `mods\starcoop\starcoop.sc2mod\base.sc2data\gamedata\abildata.xml`
- `mods\starcoop\starcoop.sc2mod\base.sc2data\gamedata\commanderdata.xml`
- `mods\starcoop\starcoop.sc2mod\base.sc2data\gamedata\commanders\futurecommanders.xml`
- `mods\starcoop\starcoop.sc2mod\zhcn.sc2data\localizeddata\gamestrings.txt`
- `mods\starcoop\commanders\arcturusmengsk.sc2mod\base.sc2data\gamedata\unitdata.xml`
- `mods\starcoop\commanders\egonstetmann.sc2mod\base.sc2data\gamedata\unitdata.xml`
- `mods\alliedcommanders.sc2mod\componentlist.sc2components`

Notes:

- This is a direct local CASC extraction from the installed game data, not a live in-match runtime dump.
- Binary model/texture/sound assets were not extracted in this pass. The current scope is sufficient for unit/building/ability/upgrade/localization static comparison.
- Existing `references\official-casc-export` was not overwritten.
