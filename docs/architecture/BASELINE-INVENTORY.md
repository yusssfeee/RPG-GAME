# Project X — Architecture Baseline (Phase 0)

## Scope and safety rules

- Baseline source: `Project X.html` on `main`, commit `2252c12b57e81a3fe773e3c8b5a335f63a8c6097`.
- This document is an inventory, not a refactor.
- Phase 0 must not change gameplay code, visual assets, save data formats, or runtime behavior.
- The legacy single-file build remains the reference implementation until each future extraction has a verified parity check.
- Keep the migration incremental, free-tool compatible, and modular; do not rewrite the game from scratch.

## Initial static inventory

The initial source inspection reported:

| Area | Count / observation |
|---|---:|
| HTML source | 9,178 lines |
| JavaScript blocks | 52 |
| CSS blocks | 41 |
| Embedded images | 530 |

These counts are an initial snapshot and should be re-measured against the branch head before implementation work.

## Identified gameplay/system areas

The initial review identified these areas. This is a functional inventory only; exact function names, ownership, and dependency edges still require a line-by-line source map.

1. Farming / crops
2. Barn / animal care
3. Fishing
4. Mining
5. Woodcutting
6. Crafting
7. Economy / currency and trading
8. Inventory and item handling
9. Combat
10. Towers
11. Quests
12. Progression

## Required source map

Before extracting any module, record for each system:

- Entry points: UI handlers, timers, startup hooks, and event listeners.
- State read and written.
- Functions called across system boundaries.
- DOM elements and CSS selectors it owns or assumes.
- Persistence touchpoints: local storage, IndexedDB, or other save/load paths.
- Asset references and embedded data dependencies.
- Initialization order and teardown behavior, if any.

Do not infer a dependency from naming alone; confirm it from actual call sites.

## Target modular boundaries (provisional)

The following boundaries are candidates, not approved extraction units:

- `core/`: startup, shared state, event coordination, utilities.
- `systems/farming/`
- `systems/animals/`
- `systems/fishing/`
- `systems/mining/`
- `systems/woodcutting/`
- `systems/crafting/`
- `systems/economy/`
- `systems/inventory/`
- `systems/combat/`
- `systems/towers/`
- `systems/quests/`
- `systems/progression/`
- `ui/`: screens, dialogs, HUD, and input bindings.
- `data/`: definitions and balance/configuration data.
- `assets/`: only if/when assets are separated without changing paths or loading behavior.

No files should be moved into these folders until the dependency map and baseline checks exist.

## Phase 0 deliverables

- [x] Create an isolated development branch.
- [ ] Complete a symbol/function inventory with source line ranges.
- [ ] Map cross-system calls and shared mutable state.
- [ ] Identify all save/load and migration-sensitive paths.
- [ ] Record a reproducible baseline test procedure.
- [ ] Record known risks and unresolved questions.
- [ ] Confirm the branch contains documentation-only changes.

## Exit criteria

Phase 0 is complete only when the source map, dependency map, persistence map, and baseline test record are reviewed. No gameplay refactor is part of Phase 0.
