# Official Abathur Import Manifest

> Status: official SC2 export extracted from local install and imported into `XMAbathur.SC2Mod`.
>
> Constraint: `crys_the_swarm_reborn.SC2Mod` is reference-only. It is not a source for units, buttons, upgrades, triggers, values, or assets.

## Current target layout

- `合作指挥官版起义狂潮/Mods/XM/XMAbathur.SC2Mod`: Abathur catalog data
- `合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod`: runtime glue and trigger entry
- `合作指挥官版起义狂潮/Mods/XM/XMCore.SC2Mod`: commander registry, labels, shared UI

## Required official source families

| Family | Official source | Target | Status | Notes |
|---|---|---|---|---|
| UnitData | SC2 official co-op Abathur export | `XMAbathur.SC2Mod/Base.SC2Data/GameData/UnitData.xml` | imported | Official `CoopCasterAbathur`, `BiomassPickup`, `Brutalisk`, `Leviathan`, `ToxicNest`, symbiote chain |
| AbilData | SC2 official co-op Abathur export | `XMAbathur.SC2Mod/Base.SC2Data/GameData/AbilData.xml` | imported | Official Mend, Toxic Nest, symbiote, brutalisk, leviathan, biomass abilities |
| EffectData | SC2 official co-op Abathur export | `XMAbathur.SC2Mod/Base.SC2Data/GameData/EffectData.xml` | imported | Official biomass pickup / symbiote / toxic nest effect chain |
| BehaviorData | SC2 official co-op Abathur export | `XMAbathur.SC2Mod/Base.SC2Data/GameData/BehaviorData.xml` | imported | Official biomass stack and toxic nest behaviors |
| ButtonData | SC2 official co-op Abathur export | `XMAbathur.SC2Mod/Base.SC2Data/GameData/ButtonData.xml` | imported | Real command card faces and tooltips |
| RequirementData | SC2 official co-op Abathur export | `XMAbathur.SC2Mod/Base.SC2Data/GameData/RequirementData.xml` | imported | Tech tree and prestige gates |
| UpgradeData | SC2 official co-op Abathur export | `XMAbathur.SC2Mod/Base.SC2Data/GameData/UpgradeData.xml` | imported | 8 achievement ladder plus prestige / mastery wiring |
| ActorData | SC2 official co-op Abathur export | `XMAbathur.SC2Mod/Base.SC2Data/GameData/ActorData.xml` | imported | Official Abathur visuals and biomass actors |
| ModelData | SC2 official co-op Abathur export | `XMAbathur.SC2Mod/Base.SC2Data/GameData/ModelData.xml` | imported | Abathur commander and symbiote models |
| SoundData | SC2 official co-op Abathur export | `XMAbathur.SC2Mod/Base.SC2Data/GameData/SoundData.xml` | imported | Abathur UI and alert sounds |
| Text | SC2 official co-op Abathur export | `XMCore.SC2Mod/zhCN.SC2Data/LocalizedData/*` | partial | Localized strings still need cleanup for the last placeholder labels |

## Current local placeholders

| Object | File | Notes |
|---|---|---|
| `CoopCasterAbathur` | `XMAbathur.SC2Mod/Base.SC2Data/GameData/UnitData.xml` | now official unit entry |
| `BiomassPickup` | `XMAbathur.SC2Mod/Base.SC2Data/GameData/UnitData.xml` | now official biomass pickup unit |
| `AbathurCollectBiomass` | `XMAbathur.SC2Mod/Base.SC2Data/GameData/EffectData.xml` | official biomass collection effect |
| `AbathurBiomass` | `XMAbathur.SC2Mod/Base.SC2Data/GameData/BehaviorData.xml` | biomass stack behavior now backed by official chain |

## Extracted sources

- `references/official-casc-export/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/*`
- `references/official-abathur-import-summary.tsv`

## Current state

- Official Abathur import completed from local SC2 install.
- `XMFinal` now uses official `BiomassPickup` / `AbathurCollectBiomass`.
- `crys_the_swarm_reborn.SC2Mod` remains reference-only.

## Source rule

- Allowed source: official SC2 installation export only.
- Disallowed source: `crys_the_swarm_reborn.SC2Mod`.
- Allowed reference: current XM files and existing map scripts only for integration patterns.
