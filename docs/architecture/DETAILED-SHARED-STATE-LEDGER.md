# Detailed Shared-State Read/Write Ledger

**Baseline:** `Project X.html` on `main`  
**Git blob:** `5ade1cb528871ad410228697e21d317f80782160`  
**Branch:** `phase-0/baseline-audit`  
**Method:** static line scan of direct `S.property` tokens; no runtime instrumentation.

## Important interpretation

The counts below are a reproducible *textual heuristic*, not a complete JavaScript data-flow analysis. The scanner classifies a direct token as a read, a simple write/update, an indexed write, or a recognized mutating method call. It cannot reliably classify conditional expressions, aliasing (for example `const x=S.inv`), object destructuring, dynamic keys (`S[k]`), helper functions that mutate an object passed to them, getters/setters, or mutations hidden in callbacks. Nested object writes such as `S.up.x = ...` are not necessarily counted as writes to the top-level `up` field. Therefore these figures must not be used as proof that a property has no writers.

## 1. Direct property reference inventory

The table covers all 51 property names found by the direct `S.<identifier>` scan. Counts are token occurrences, not unique functions.

| Property | Read tokens | Direct write/update | Indexed write | Recognized mutator | Total tokens |
|---|---:|---:|---:|---:|---:|
| `up` | 100 | 0 | 0 | 0 | 100 |
| `inv` | 53 | 1 | 34 | 0 | 88 |
| `coins` | 43 | 42 | 0 | 0 | 85 |
| `tab` | 26 | 58 | 0 | 0 | 84 |
| `hp` | 27 | 24 | 0 | 0 | 51 |
| `cls` | 33 | 6 | 0 | 0 | 39 |
| `dg` | 29 | 4 | 0 | 0 | 33 |
| `barn` | 27 | 1 | 4 | 1 | 33 |
| `items` | 13 | 1 | 11 | 0 | 25 |
| `eq` | 14 | 0 | 10 | 0 | 24 |
| `cv` | 21 | 1 | 0 | 0 | 22 |
| `plots` | 20 | 0 | 0 | 1 | 21 |
| `mz` | 18 | 3 | 0 | 0 | 21 |
| `w5` | 16 | 5 | 0 | 0 | 21 |
| `sh` | 7 | 13 | 0 | 0 | 20 |
| `wx` | 16 | 1 | 0 | 0 | 17 |
| `mineExp` | 12 | 5 | 0 | 0 | 17 |
| `wz` | 11 | 5 | 0 | 0 | 16 |
| `mf` | 11 | 4 | 0 | 0 | 15 |
| `fz` | 9 | 3 | 0 | 0 | 12 |
| `jobs` | 8 | 1 | 2 | 0 | 11 |
| `contracts` | 7 | 3 | 0 | 1 | 11 |
| `fishSeen` | 7 | 2 | 2 | 0 | 11 |
| `classXP` | 7 | 2 | 2 | 0 | 11 |
| `trade` | 10 | 0 | 0 | 0 | 10 |
| `buff` | 7 | 1 | 2 | 0 | 10 |
| `combatTraining` | 6 | 2 | 2 | 0 | 10 |
| `trainingPoints` | 7 | 3 | 0 | 0 | 10 |
| `region` | 5 | 4 | 0 | 0 | 9 |
| `xp` | 3 | 0 | 5 | 0 | 8 |
| `mute` | 6 | 2 | 0 | 0 | 8 |
| `kills` | 7 | 1 | 0 | 0 | 8 |
| `mmode` | 1 | 7 | 0 | 0 | 8 |
| `bsel` | 6 | 2 | 0 | 0 | 8 |
| `story` | 6 | 1 | 0 | 0 | 7 |
| `sel` | 6 | 1 | 0 | 0 | 7 |
| `asel` | 5 | 2 | 0 | 0 | 7 |
| `clears` | 6 | 0 | 1 | 0 | 7 |
| `bmode` | 1 | 6 | 0 | 0 | 7 |
| `tmode` | 2 | 5 | 0 | 0 | 7 |
| `mines` | 4 | 1 | 1 | 0 | 6 |
| `cost` | 4 | 0 | 1 | 0 | 5 |
| `bfeed` | 2 | 3 | 0 | 0 | 5 |
| `mzId` | 2 | 3 | 0 | 0 | 5 |
| `rb` | 5 | 0 | 0 | 0 | 5 |
| `fsel` | 3 | 1 | 0 | 0 | 4 |
| `ms` | 2 | 1 | 1 | 0 | 4 |
| `sk` | 3 | 0 | 1 | 0 | 4 |
| `ubr` | 2 | 2 | 0 | 0 | 4 |
| `bbr` | 2 | 1 | 0 | 0 | 3 |
| `smeltCd` | 1 | 1 | 0 | 0 | 2 |

## 2. Highest-coupling fields and why they are risky

- `inv`, `items`, `eq`: inventory/equipment data is touched by gathering, crafting, rewards, shops, class/equipment UI, and combat. Indexed writes and nested object mutations mean a superficial assignment scan undercounts changes.
- `coins`: high read/write traffic across purchases, rewards, trading, quests, milestones, and progression.
- `tab`: both navigation state and a condition used by simulation/render loops. Tab changes can start/stop or gate domain work.
- `hp`: shared between player combat, regeneration, healing, class/progression effects, and defeat handling.
- `up`: extremely high read traffic and nested upgrade access; many systems depend on it even if direct top-level writes are few.
- `barn`, `plots`, `wx`, `wz`, `mf`, `fz`: simulation state shared between domain updates, persistence, and UI synchronization.
- `dg`, `mineExp`, `story`, `classXP`, `combatTraining`: progression and combat state cross several enhancement blocks.

## 3. Script-block ownership is not yet exclusive

The source has a large core block and numerous later enhancement blocks. The following are *observed touch areas*, not exclusive ownership:

| Area | Approximate source lines | Fields frequently touched |
|---|---:|---|
| Core campaign and systems | 589–1950 | `inv`, `coins`, `hp`, `up`, `tab`, `cls`, `xp`, `plots`, `eq`, `items` |
| AI/art and enhancements | 1951–2684 | `tab`, `cls`, `hp`, `inv`, fishing/mining state |
| RPG v4 systems | 2685–4791 | `tab`, `coins`, `inv`, `barn`, `plots`, `wx`, `wz`, `jobs`, `contracts`, `trade`, `up` |
| Mining expedition and campaign bridge | 4895–5481 | `mineExp`, `mz`, `hp`, `tab`, `inv`, `coins` |
| Fishing and water effects | 5482–6440 | `fz`, `fishSeen`, `inv`, `plots`, `mf`, `wx` |
| Farm picker/stability and visual helpers | 6441–6987 | primarily UI, DOM and simulation watchers |
| Enemy animation / combat integration | 6988–8856 | `hp`, `dg`, `cls`, `eq`, `items`, `up`, `tab` |
| Class/training integrations | 8857–9178 | `cls`, `classXP`, `combatTraining`, `trainingPoints`, `up`, `eq`, `items` |

## 4. Required completion method for true ownership

A complete ledger must be built from AST-based analysis plus manual tracing. For each field, record:

1. All direct assignments and compound assignments.
2. All nested writes and mutating method calls.
3. All aliases and references passed to helper functions.
4. All hydration/default/normalization code paths.
5. All event handlers, timers, and callbacks that can mutate it.
6. Whether the field is persisted, derived, transient, or UI-only.
7. The owning domain and the compatibility API required during migration.

Until those items are checked, ownership should be marked **shared / not yet exclusive**, not assigned to the script with the most references.

## 5. Migration decision

Do not extract `S` or any of its high-coupling fields in the first modularization step. Preserve the current state object shape and access semantics behind the existing global bindings. The first extraction should be a pure, isolated helper or immutable constant only after its full call-site set and load-order dependencies are confirmed.

**Status:** detailed textual inventory complete; semantic ownership analysis remains open. Phase 0 remains in progress.
