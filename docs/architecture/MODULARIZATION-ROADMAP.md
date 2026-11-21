# Project X — Incremental Modularization Plan

**Strategy:** Full modular architecture, incremental migration, behavior preservation.  
**Reference build:** `Project X.html` on `main` at `2252c12b57e81a3fe773e3c8b5a335f63a8c6097`.  
**Working branch:** `phase-0/baseline-audit`.

## Non-negotiable constraints

1. Never rewrite the game from scratch.
2. Keep the current single-file game as the known-good reference until the replacement has passed regression checks.
3. Do not remove, rename, or reshape saved fields during early extraction.
4. Preserve all five save slots and the legacy slot-1 key fallback / mirror.
5. Preserve script initialization order and function-wrapper composition until explicit module lifecycle APIs replace them.
6. Move one bounded responsibility at a time; compare behavior after every extraction.
7. Do not mix gameplay refactors, balance changes, visual redesign, and architecture changes in the same commit.
8. Keep the toolchain free and avoid paid runtime services.

## Proposed target layout

This is the intended destination, not a folder tree to create all at once.

```text
project/
  index.html
  src/
    main.js                 # boot and composition root
    core/
      state.js              # shared state facade / compatibility bridge
      defaults.js           # campaign defaults and static catalogs
      events.js             # event bus only if proven necessary
      lifecycle.js          # init / dispose coordination
      loop.js               # main frame + periodic tick orchestration
      utils/
    persistence/
      save-service.js       # slot read/write, legacy fallback, hydration
      migrations.js         # explicit, versioned save migrations
    systems/
      farming/
      animals/
      fishing/
      mining/
      woodcutting/
      crafting/
      inventory/
      economy/
      combat/
      dungeons/
      quests/
      progression/
      jobs/
      contracts/
    ui/
      navigation/
      views/
      hud/
      dialogs/
      actions/
    assets/
      registry.js           # only after data URLs and loaders are characterized
  tests/
    characterization/
    fixtures/
  docs/
  Project X.html            # frozen legacy reference during migration
```

Do not create empty folders or move code merely to match this diagram. Add a module only when its boundary and dependencies are understood.

## Tooling approach

- Use standard JavaScript ES modules and a free local development server/build tool.
- A lightweight Vite setup is the preferred candidate if a build step is needed; it is free/open-source and compatible with static hosting.
- Keep the deployment static. No paid database, hosted backend, or subscription service is required for the first modularization stages.
- GitHub remains the source-control and review history. Work on feature branches and merge only after the checks pass.
- Keep the legacy HTML directly runnable as a fallback until the modular build has been exercised on the target hosting path.

The exact toolchain should be validated against the project's current GitHub Pages / hosting setup before introducing configuration files.

## Migration stages

### Stage 0 — Baseline and architecture audit
**Status:** in progress.

- [x] Freeze the baseline commit and create an isolated audit branch.
- [x] Inventory core source blocks, feature extensions, storage keys, and shared state.
- [x] Record the high-level dependency graph and wrapper risks.
- [ ] Finish the field-level state ownership ledger.
- [ ] Finish the function replacement / wrapper call-chain ledger.
- [ ] Execute browser regression checks using a disposable save.
- [ ] Record baseline screenshots, console output, and save fixtures.

**Exit gate:** no extraction until the source map, persistence contract, and browser baseline are reviewed.

### Stage 1 — Characterization and compatibility layer
- Add tests or executable checks around existing pure calculations and state normalization.
- Capture representative save fixtures for each slot shape and legacy slot-1 import.
- Define a compatibility facade that exposes the current globals without changing their behavior.
- Add explicit startup and teardown ownership for timers/listeners only after they are inventoried.
- Do not move feature code yet.

**Exit gate:** tests can detect changes to save hydration, inventory transactions, progression math, and core rendering.

### Stage 2 — Low-risk pure utilities and static data
- Extract only functions proven pure (no DOM, timer, audio, global mutation, or hidden state).
- Move static catalogs only after confirming every consumer and initialization dependency.
- Keep compatibility exports/globals so old callers continue to work.
- Compare outputs against the legacy implementation.

**Exit gate:** same values for all known inputs and no load-order regressions.

### Stage 3 — Persistence boundary
- Extract slot selection, reading, writing, normalization, and migration behind a small service.
- Preserve exact storage keys, JSON field names, five-slot behavior, and old-save conversion.
- Keep mining save synchronization and existing save wrappers composed in the same order initially.
- Add round-trip tests and legacy fixture tests.

**Exit gate:** old saves load, new saves round-trip, slot switching works, and reset affects only the active slot.

### Stage 4 — Domain systems, one at a time
Suggested sequence, subject to dependency evidence:
1. Farming and animals (well-bounded state collections, but timers and shared XP must be mapped).
2. Fishing (pond UI, discovery, audio, and animation are coupled; separate simulation from presentation).
3. Mining (save synchronization and expedition extension make it higher risk than it first appears).
4. Woodcutting / jobs / contracts (extension bridge and V4 state need ownership clarified).
5. Crafting and inventory/equipment (shared resource and item invariants).
6. Economy / trade.
7. Combat / dungeons / classes / progression (highest cross-feature coupling; defer until contracts stabilize).
8. Quests and remaining progression systems.

For every system: define input/output contract, state ownership, lifecycle, UI action API, tests, and rollback point before moving it.

### Stage 5 — UI and orchestration
- Separate view templates from domain rules.
- Replace delegated DOM action maps with explicit UI-to-system commands gradually.
- Extract HUD, navigation, dialogs, and visual feedback without changing game rules.
- Move the main loop last, after each system has an explicit tick/init/dispose contract.

### Stage 6 — Asset pipeline (separate project track)
- Keep all 534 inline image data occurrences unchanged in early phases.
- Inventory unique assets and calculate hashes before any extraction.
- Move images to external files only after testing paths, loading order, fallbacks, and animation timing on the real hosting origin.
- Preserve the current embedded build as a rollback artifact.

## Per-extraction checklist

- [ ] Record baseline behavior and current source lines.
- [ ] Identify all reads/writes and callers.
- [ ] Identify DOM, CSS, event, timer, audio, and asset dependencies.
- [ ] Identify save-schema effects.
- [ ] Add characterization tests / fixtures.
- [ ] Extract one responsibility only.
- [ ] Keep compatibility adapter for old names.
- [ ] Compare gameplay, UI, console, and save results.
- [ ] Confirm no duplicate listeners or timer loops after repeated entry/exit.
- [ ] Commit separately and document rollback.

## First implementation candidate

Do not choose the first module solely by size. Choose a small pure utility after the AST/call-site audit proves it has no side effects. The persistence layer is central and important, but it should not be the first code extraction until save fixtures and round-trip checks exist.

## Current decision

The next task remains Phase 0 completion: field ownership, wrapper chains, and browser baseline. No module extraction or gameplay code change is authorized by this plan itself.
