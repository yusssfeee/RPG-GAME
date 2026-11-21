# Project X — Shared State Ownership Audit (Phase 0)

## Purpose and limits

This is a static property-reference scan of `S.<property>` in the baseline source. It is intended to identify cross-feature coupling before modules are extracted. It does not prove exclusive ownership: dynamic property access, aliases, object destructuring, and indirect mutations may not appear in this scan.

Baseline: `Project X.html`, `main`, commit `2252c12b57e81a3fe773e3c8b5a335f63a8c6097`.

## Main shared state

The campaign object `S` is initialized in the core runtime around line 1004. It is the de facto shared database for the whole game. The scan found 51 distinct statically referenced top-level properties.

### High-coupling properties

| Property | Approx. static references | Script blocks touching it | Initial interpretation |
|---|---:|---:|---|
| `up` | 100 | 3, 5, 6, 7, 8 | Shared upgrade levels read by many systems |
| `inv` | 88 | 3, 5, 7, 8, 9, 10, 25 | Shared consumable/material inventory |
| `coins` | 85 | 3, 7, 8, 25, 47, 48 | Shared economy balance |
| `tab` | 84 | 3, 5, 6, 7, 8, 10, 11, 15, 17, 18, 22, 24, 31, 40, 43, 47 | Active UI tab; also consulted by feature loops/controllers |
| `hp` | 51 | 3, 8, 44, 47 | Player health; combat and class progression |
| `cls` | 39 | 3, 8, 12, 36, 37, 44, 45, 46, 47, 49 | Selected player class and class-dependent logic |
| `dg` | 33 | 3, 5, 8, 10 | Dungeon state shared by combat and presentation |
| `barn` | 33 | 3, 4, 6, 8 | Animal/stall state |
| `items` | 25 | 3, 8, 9, 25, 46 | Owned equipment / item quantities |
| `eq` | 24 | 3, 8, 35, 36, 46, 52 | Equipped gear; multiple UI and combat patches |
| `cv` | 22 | 7, 8 | V3/V4 feature state; exact ownership needs call-site tracing |
| `plots` | 21 | 3, 8, 18 | Farm plot state |
| `mz` | 21 | 3, 5 | Mining / map-related state; confirm exact semantic ownership |
| `sh` | 20 | 3, 8 | Player shield |
| `mineExp` | 17 | 10, 11 | Mining expedition save payload |
| `wz` | 16 | 8 | Woodcutting-related state; confirm exact semantic ownership |
| `mf` | 15 | 3, 5 | Mining feature state; confirm exact semantic ownership |
| `fz` | 12 | 3, 5, 6, 15 | Fishing feature state; confirm exact semantic ownership |
| `jobs` | 11 | 8 | V4 jobs / production state |
| `contracts` | 11 | 8 | V4 contract state |
| `fishSeen` | 11 | 16 | Fishing discovery catalog |

## Remaining statically observed state properties

| Property | References | Script blocks |
|---|---:|---|
| `xp` | 8 | 3, 8 |
| `trade` | 10 | 3, 7 |
| `buff` | 10 | 3, 8 |
| `story` | 7 | 3 |
| `mute` | 8 | 3, 8, 11, 17 |
| `sel` | 7 | 3, 8, 21 |
| `fsel` | 4 | 3 |
| `asel` | 7 | 3, 8 |
| `cost` | 5 | 3 |
| `clears` | 7 | 3, 5, 48 |
| `kills` | 8 | 3, 8, 48 |
| `bfeed` | 5 | 3 |
| `bmode` | 7 | 3 |
| `mmode` | 8 | 3, 5 |
| `mines` | 6 | 3 |
| `mzId` | 5 | 3, 5 |
| `ms` | 4 | 3 |
| `smeltCd` | 2 | 3 |
| `tmode` | 7 | 8 |
| `wx` | 17 | 8 |
| `bsel` | 8 | 8 |
| `bbr` | 3 | 8 |
| `sk` | 4 | 8 |
| `ubr` | 4 | 8 |
| `w5` | 21 | 8 |
| `rb` | 5 | 8 |
| `classXP` | 11 | 47 |
| `combatTraining` | 10 | 47 |
| `trainingPoints` | 10 | 47 |

The property names above are recorded as-is from source. Some short names are not sufficiently descriptive to define a future API. Do not rename them as part of the first extraction; first document their schema and read/write call sites.

## Cross-cutting function replacement / wrapper observations

The source reassigns several core functions after their original definitions. The static scan found wrapper-style reassignment sites including:

- `render`: multiple feature patches, including V4 and later UI/animation systems.
- `foeDown`: battle loot, mining expedition, class/combat, and enemy animation features.
- `playerDown` and `flee`: mining expedition flow.
- `startFight`: battle loot, mining and goblin animation controllers.
- `catchFish`: fishing discovery.
- `upd`: V4 / HUD extension.
- `save`: mining expedition and class/training feature layer.

Important locations include lines 4977 (mine expedition wraps `save`) and 8570 (class/training layer also wraps `save`). The wrapper chain must be preserved and tested. A module extraction that changes script order or replaces a function without composing the existing wrapper chain can silently disable features.

## Initial ownership hypotheses

These are candidates for future module ownership, not changes to apply now:

- **Campaign / Save service:** `S`, slot selection, hydration, default merging, legacy normalization, save versioning.
- **Player profile:** class, XP, health, shield, buffs, skills, story and progression.
- **Inventory / equipment:** `inv`, `items`, `eq`, item metadata and transaction invariants.
- **Economy:** `coins`, trade pricing, costs, shop, sale/purchase operations.
- **Farm:** `plots`, crop selection, fertilizer selection and crop timers.
- **Husbandry:** `barn`, animal production and stall upgrades.
- **Mining:** `mineExp`, `mines`, mining map/feature state; clarify `mz`, `mf`, `ms`, `mzId`.
- **Fishing:** `fishSeen`, `fz`, fishing discovery and pond state.
- **Woodcutting / V4 production:** `wz`, `wx`, `w5`, `jobs`, `contracts`; validate each field's actual meaning.
- **Combat / dungeons:** `hp`, `sh`, `dg`, `clears`, `kills`, combat training.
- **UI preferences / navigation:** `tab`, `mute`, selection fields and display modes.

## Required next step before state extraction

For every property, create a read/write ledger with:
1. Initial default and type.
2. All assignments and mutation sites.
3. All readers and derived calculations.
4. Save/load migration behavior.
5. Owning feature and any cross-feature consumers.
6. Whether the field is persistent campaign data or transient UI/runtime state.

Then introduce typed state accessors or domain services behind compatibility adapters. Only after parity tests should direct `S.<field>` access be reduced.

## Phase 0 status

- [x] Static top-level `S.<property>` reference inventory.
- [x] Initial cross-feature coupling counts.
- [x] Initial function-wrapper reassignment scan.
- [ ] Validate each field's meaning at all read/write call sites.
- [ ] Build complete save schema and migration table.
- [ ] Confirm runtime behavior in a browser with disposable saves.
- [ ] Approve first extraction candidate.

No game runtime code was changed.
