# Project X — Source and Dependency Map (Phase 0)

## Audit target and method

- Repository: `yusssfeee/RGP-GAME`
- Baseline branch: `main`
- Baseline commit: `2252c12b57e81a3fe773e3c8b5a335f63a8c6097`
- File: `Project X.html`
- Blob SHA audited: `5ade1cb528871ad410228697e21d317f80782160`
- Static audit only. No browser execution, gameplay tests, or save mutation was performed.

## Verified size and structure

| Measure | Observed |
|---|---:|
| Source lines | 9,179 |
| File bytes | 50,062,262 |
| Script blocks | 52 |
| Style blocks | 41 |
| `data:image/` occurrences | 534 |
| Function / arrow-function declarations matched by static scan | 483 |
| Distinct names among those declarations | 436 |
| HTML `id` attributes | 273 |
| Event listener registrations matched | 99 |

The 534 count is the number of inline image data URI occurrences, not a verified count of unique image assets. The earlier rough count of 530 should be superseded by this scan count. The function scan is regex-based and may omit class methods, callbacks, or declarations in other forms; it is not a complete AST inventory.

## Core game runtime

The primary runtime is the large anonymous script at lines 589–1950. It owns the main game state, catalogs, primary gameplay functions, UI rendering, input dispatch, timers, combat, and the initial save/load implementation.

Key source locations:

| Concern | Approx. lines | Evidence / responsibility |
|---|---:|---|
| Game data catalogs | 591–1002 | Crops, fish, ores, materials, equipment, recipes, animals, drops, dungeons, upgrades |
| Main state object `S` and defaults | 1003–1005 | Shared mutable campaign state |
| Save-slot constants and loading | 1007–1016 | Five independent slots and legacy slot-1 fallback |
| Core save function | 1017–1018 | Serializes `S` to localStorage |
| Campaign creation / hydration | 1019–1020 | New campaign defaults and old-save normalization |
| Slot activation / reset | 1021–1039 | Rehydrates state and resets transient combat / UI state |
| Shared state helpers | 1041–1067 | DOM lookup, levels, inventory, equipment, buffs, stats |
| Audio engine | 1072 onward | Shared AudioContext and SFX |
| Farming | 1189 onward | Plot controls, planting, growth, harvest |
| Barn / husbandry | 1228 onward | Animal stalls and production |
| Mining base loop | 1250 onward | Rock generation and mining actions |
| Fishing base loop | 1259 onward | Fish spawn, movement, catch |
| Combat / dungeon | approx. 1400–1590 | Enemy state, combat loop, dungeon progression and rewards |
| View rendering / navigation | approx. 1590–1710 | `VIEWS`, tabs, pane event delegation, render |
| Campaign title and reset UI | 1710–1730 | Start / new game behavior |
| Main timers | approx. 1780 onward | Animation frame loop and periodic save |
| Initial game render | near 1950 | Runtime bootstrapping |

Line locations are navigation anchors and can shift when the source changes.

## Script block map

The following named extension blocks are layered after the core script. They are not independent modules merely because they have script IDs.

| Lines | Script ID / role |
|---|---|
| 1951–2026 | AI art helpers |
| 2027–2308 | `rpg-game-enhancements` |
| 2309–2534 | `rpg-sprite-pack` |
| 2536–2683 | `rpg-v3-patch` |
| 2685–4772 | `rpg-v4` — large feature layer |
| 4792–4872 | `battle-loot-audio-v6` |
| 4895–4992 | `mine-expedition-v7` |
| 5212–5242 | `mine-cave-ambience-v2` |
| 5279–5370 | `rpg-start-slot-flow` |
| 5372–5448 | `rpg-campaign-runtime-guards` |
| 5449–5481 | `rpg-wood-upgrade-campaign-bridge` |
| 5482–5651 | `rpg-fishing-water-map` |
| 5653–5784 | `rpg-fishing-live-hud-and-discovery` |
| 5900–6105 | `rpg-fishing-pond-info-waves-audio` |
| 6194–6438 | `farm-water-fx` |
| 6441–6461 | `rpg-crop-legacy-icon-bridge` |
| 6483–6511 | `rpg-crop-art-actual-dom-repair` |
| 6560–6633 | `rpg-crop-compact-picker-v3` |
| 6713–6853 | `rpg-stability` |
| 6859–6979 | `rpg-icon-autofit` |
| 6988–7086 | `rpg-goblin-anim` |
| 7108–7164 | `rpg-gainfeed` |
| 7166–7166 | Goblin frame data |
| 7167–7169 | Goblin attack frame data |
| 7195–7211 | Goblin regular animation data |
| 7212–7266 | Goblin SFX |
| 7267–7277 | Orc chief animation data |
| 7278–7551 | `rpg-goblin-combat-fix` |
| 7552–7555 | Goblin archer dungeon patch |
| 7557–7565 | Goblin spear dungeon patch |
| 7566–7620 | `rpg-device-modes` |
| 7732–7747 | Doll / equipment swap patch |
| 7774–7821 | Equipment screen |
| 7852–7888 | Equipment screen v2 |
| 7888–7892 | Goblin state frame data |
| 7893–7902 | Goblin shaman WebP data |
| 7942–8070 | Goblin shaman WebP controller |
| 8071–8089 | Goblin death cleanup |
| 8089–8091 | Goblin spear animation data |
| 8114–8215 | Goblin spear animation controller |
| 8217–8305 | `rpg-class-balance-v1` |
| 8307–8355 | `rpg-class-effects-refined-v2` |
| 8358–8483 | `rpg-weapon-class-system-v1` |
| 8538–8734 | `rpg-dungeon-clarity-training-v1` |
| 8746–8856 | `rpg-skill-progression-v2` |
| 8857–8868 | `rpg-skill-progression-final-fixes` |
| 8893–8988 | `rpg-combat-floats-item-tooltip-v1` |
| 9016–9078 | `rpg-combat-feedback-v2` |
| 9095–9178 | `rpg-item-tooltip-fix-v2` |

The gaps between ranges include markup, data, and style blocks. Preserve source order when investigating behavior.

## Shared state and persistence map

### Main campaign state

The main mutable object is `S` (initialized near line 1004). It contains core economy, selections, farm plots, barn, skill XP, inventory, owned items, equipment, upgrades, buffs, health/shield, active tab, combat counters, dungeon state, trade state, region, and story progression.

Extensions add fields to this same object. Examples observed in source include:
- `S.mineExp`: mining expedition state.
- `S.fishSeen`: discovered-fish catalog state.
- Additional class, woodcutting, and V4 feature fields should be fully enumerated before any state split.

### Browser storage

Observed storage identifiers and call sites:

- `tinyacre-active-slot`: active save-slot number.
- `tinyacre-save-slot-1` through `tinyacre-save-slot-5`: constructed by `slotKey(n)`.
- `tinyacre-save`: legacy single-save key retained as slot-1 compatibility fallback / mirror.

The core save writes serialized `S` to the active slot and mirrors slot 1 to the legacy key. Slot activation reads the selected slot, normalizes legacy inventory fields, merges defaults, and resets transient combat/UI state.

The mine expedition extension explicitly persists its state inside `S.mineExp` and wraps the core `save()` function. It also flushes on `pagehide` and when document visibility changes to hidden. This means save behavior depends on extension initialization order and wrapper chaining.

### Persistence risks

1. **Save schema is implicit.** There is no separately versioned, centralized schema or migration registry visible in the audited save path.
2. **Save wrappers exist.** The mining extension wraps `save()`; other extensions may wrap save or mutate `S`. Extraction must preserve wrapper order and invocation semantics until replaced by a tested persistence service.
3. **Compatibility is intentional.** The legacy `tinyacre-save` key is still read and written for slot 1. Do not remove it as cleanup.
4. **State is mutated across features.** A module boundary cannot be chosen from UI tab names alone; feature patches write into shared campaign state.
5. **Transient state is separate.** Combat timers, active DOM nodes, animation pools, audio contexts, observers, and active minigames should not be serialized as campaign data.

## Confirmed architectural coupling / risk observations

- The core script declares many top-level functions and mutable variables; later scripts refer directly to them.
- Extensions patch core behavior by reassigning functions such as `save`, `foeDown`, `flee`, `playerDown`, `startFight`, `catchFish`, and view functions.
- The UI uses shared global objects/functions such as `S`, `VIEWS`, `CAB`, `V4`, `SFX`, `render`, `upd`, and `save`.
- The main pane uses delegated click handling via `data-a` actions; navigation is built from `TABS`.
- Dynamic view markup is generated as HTML strings and injected into the DOM. Some feature controllers observe DOM mutations and attach/re-attach behavior.
- Sprite / animation controllers rely on embedded image data, preload/decode behavior, DOM attachment, and mutation observers.
- The document contains repeated HTML ID values in the static scan. Some may be in generated templates or mutually exclusive views; they must be checked in a live DOM before treating them as actual simultaneous duplicate IDs.

## Provisional dependency model

This is a hypothesis to validate against call sites, not an approved extraction order:

1. **Data catalogs** — mostly static definitions; currently referenced directly by many systems.
2. **Core campaign state + persistence** — central dependency for nearly every gameplay feature.
3. **Shared utilities** — DOM lookup, item/inventory helpers, level/XP helpers, stat calculation, audio.
4. **Feature domains** — farming, husbandry, fishing, mining, woodcutting, crafting, economy/trading, inventory/equipment, combat/dungeons, quests/progression.
5. **UI / presentation** — navigation, view renderers, dialogs, HUD, effects, animation controllers.
6. **Compatibility adapters** — temporary wrappers that preserve legacy global names while modules are extracted.

Do not move data or features yet. Build a symbol read/write and call graph first.

## Recommended next audit actions

- Enumerate every property read/written on `S`, grouped by feature and source line.
- Enumerate all assignments/wrappers of shared global functions and objects.
- Trace the exact `save()` call chain, including V4 and feature-specific wrappers.
- Map DOM IDs, data actions, and each renderer/controller that owns them.
- Inspect every legacy-save normalization branch and define a versioned migration plan.
- Establish a real browser baseline using a disposable save before the first code change.

## Phase 0 status

- [x] Isolated audit branch created from `main`.
- [x] Baseline inventory document added.
- [x] Manual regression checklist added.
- [x] Initial source-block / function / persistence scan completed.
- [ ] Complete per-property state ownership map.
- [ ] Complete cross-module function call and wrapper map.
- [ ] Execute baseline browser scenarios and record actual results.
- [ ] Review and approve extraction sequence.

**No gameplay source, embedded image, CSS, or save data was changed in this audit.**
