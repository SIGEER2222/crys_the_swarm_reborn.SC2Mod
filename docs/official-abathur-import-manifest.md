# Official Abathur Import Manifest

Status: official SC2 export extracted from local install and imported into `XMAbathur.SC2Mod`.

Disallowed source: `crys_the_swarm_reborn.SC2Mod`

## Scope

This manifest records the source policy for the current Abathur port. Abathur data in `XMAbathur.SC2Mod` is treated as an official StarCraft II co-op data import/rebuild sourced from the local SC2 install export path, primarily:

- `mods/starcoop/starcoop.sc2mod`
- `mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/...`

`crys_the_swarm_reborn.SC2Mod` is reference-only. It may be used to compare XML or Galaxy writing style, but it is not an allowed source for Abathur units, buttons, upgrades, triggers, values, text, models, sounds, or other gameplay assets.

## Import Summary

The detailed object list is stored in:

- `references/official-abathur-import-summary.tsv`
- `references/official-abathur-selected-ids.txt`
- `references/official-abathur-extract-list.txt`
- `references/official-abathur-casc-search.tsv`

Current summary from `references/official-abathur-import-summary.tsv`:

| Field | Value |
|---|---|
| Import record count | 1500 records, excluding the TSV header |
| Official source root | `mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/...` |
| Target module | `合作指挥官版起义狂潮\Mods\XM\XMAbathur.SC2Mod` |
| Runtime owner | `XMFinal.SC2Mod` |
| Data owner | `XMAbathur.SC2Mod` |

## Catalog Coverage

The import summary includes official catalog objects across the Abathur closure, including:

- `AbilData`
- `ActorData`
- `BehaviorData`
- `ButtonData`
- `EffectData`
- `ModelData`
- `RequirementData`
- `SoundData`
- `UnitData`
- `UpgradeData`
- `ValidatorData`
- `WeaponData`

Representative imported object families include `Abathur`, `Biomass`, `ToxicNest`, `Symbiote`, `UltimateEvolution`, `Brutalisk`, and `Leviathan`.

## Target Policy

- `XMAbathur.SC2Mod` carries Abathur catalog data.
- `XMFinal.SC2Mod` owns runtime events, commander recognition, map helpers, debug gating, biomass runtime entry points, and top-panel wiring.
- Current docs describe Abathur as part of the 18-commander baseline; remaining work is unified live regression and local mechanism refinement, not a fresh import phase.

## Validation Policy

Static validation should confirm:

- This manifest exists.
- The two required source-policy lines above remain unchanged.
- Abathur import records point to official `mods/starcoop/starcoop.sc2mod` export paths or current XM target files.
- No Abathur manifest source is attributed to `crys_the_swarm_reborn.SC2Mod`.
