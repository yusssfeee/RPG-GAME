# Project X — Dependency and Persistence Map (Phase 0)

## High-level runtime graph

```text
HTML document / CSS / embedded art
            |
            v
Base data and catalogs (items, crops, foes, regions, recipes, upgrades)
            |
            v
Shared campaign state: S  <---->  localStorage save slots
            |                         |
            |                         +-- legacy key fallback
            |                         +-- normalization / hydration
            |                         +-- pagehide + visibility flushes
            v
Core helpers (levels, inventory, stats, XP, economy, icons, notifications)
            |
            +--> Farming / crop growth / water effects
            +--> Barn / animals / feed / mood
            +--> Fishing / pond / cooking / discovery
            +--> Mining grid / mine expedition / cave audio
            +--> Woodcutting / carpentry / jobs
            +--> Crafting / smithing / alchemy / equipment
            +--> Trade / contracts / market / travel
            +--> Combat / classes / weapons / dungeons / skill progression
            |
            v
Views / delegated DOM actions / render() / upd() / main loop
            |
            v
Later patch scripts augment or wrap earlier functions and shared state
```

This is a provisional dependency graph inferred from source structure and call sites. It must be validated before extracting modules.

## Confirmed persistence touchpoints

| Approx. line | Behavior | Migration requirement |
|---:|---|---|
| 1004–1005 | Initialize shared state `S` and clone `S_DEFAULTS` | Preserve default field shape and defaults |
| 1007–1010 | Five save slots; active-slot key; slot key helper; legacy single-save fallback | Preserve all key names and slot semantics |
| 1012–1017 | Read and hydrate old save data; compatibility for missing items and old potion field | Preserve old-save import behavior |
| 1018 | Serialize `S` to active slot and legacy key for slot 1 | Keep writes compatible until explicit versioned migration |
| 1019–1020 | Fresh campaign and slot hydration | Preserve reset and fallback semantics |
| 1021–1039 | Slot activation, state reset, guarded optional subsystem initialization | Preserve initialization ordering and guard behavior |
| 1717–1721 | Confirmed reset flow removes active slot save and starts a fresh campaign | Never change destructive confirmation behavior casually |
| 4986–4990 | Mine expedition flush on pagehide/visibilitychange; campaign extension load/reset hooks | Preserve lifecycle persistence |
| 5384 onward | Campaign state normalization for extension fields | Must run before systems assume extension data exists |

Observed storage keys include:
- `tinyacre-active-slot`
- `tinyacre-save-slot-1` through `tinyacre-save-slot-5`
- `tinyacre-save` (legacy compatibility key)

The source has additional save-related code and migration paths; this list is a confirmed minimum, not an exhaustive schema.

## Confirmed coupling points

1. **Shared state coupling:** core and feature systems read/write the same `S` object. A subsystem boundary cannot be defined only by which screen displays it.
2. **UI-to-domain coupling:** delegated clicks on `#pane` inspect `data-a` and dispatch to a map of action handlers (around lines 1637–1641). Many views also create direct listeners. Moving a handler without its UI contract can break controls.
3. **Render coupling:** `render()`, `rp()`, and `upd()` are central UI refresh paths. The main animation loop calls `tradeTick()`, `combatTick()`, and fishing movement logic (around lines 1675–1691); a periodic interval refreshes farming/barn state, stats, and autosaves (around lines 1693–1701).
4. **Save coupling:** `save()` invokes `mineSync()` before serializing `S`. Mining therefore participates in the central save lifecycle.
5. **Extension coupling:** campaign activation calls optional window hooks such as `__loadMineExpedition`, `__resetMineExpedition`, and `mineLoad`, and initializes wood/tree state. Later script blocks wrap or extend existing functions.
6. **Asset coupling:** crop art, monster art, and animation data are embedded or attached through global registries/controllers. Their payloads are large and should be separated only as a distinct asset-delivery project after loader compatibility is tested.

## Event and lifecycle inventory

A static scan found approximately:
- 101 `addEventListener` call sites.
- 190 timer / animation-frame API call sites.
- 12 localStorage API call sites.
- 116 occurrences of `data-a` / `data-x` UI action attributes.
- 9 JSON parse/stringify call sites.

These are source occurrence counts, not unique runtime listeners or measured active timers. Some are inside optional patches or lifecycle handlers.

## Provisional dependency order for future extraction

Do not extract yet. When Phase 0 is complete, use this order as a hypothesis to test:

1. Shared types/defaults/catalogs and persistence contract.
2. Pure utility functions (formatting, level math, pricing helpers) after proving they have no DOM/state side effects.
3. Inventory/economy primitives and stat calculations.
4. Individual domain systems, one at a time, with explicit dependencies injected rather than hidden globals.
5. UI rendering and action binding, after domain APIs stabilize.
6. Asset registries/controllers, only with verified load order and fallback behavior.
7. Main orchestration / game loop last, after lifecycle ownership is clear.

## Risk register

| Risk | Why it matters | Required mitigation |
|---|---|---|
| Save incompatibility | Existing player progress could be lost or reset | Freeze current schema; create fixture saves; test round-trip and old-save import |
| Script order changes | Patch scripts wrap functions declared earlier | Record exact order and test every wrapper before/after extraction |
| Duplicate listeners/timers | Reinitialization may double actions or resource ticks | Give each module explicit init/dispose lifecycle; test repeated entry/exit |
| Hidden global dependencies | Modules may rely on `S`, DOM IDs, or window hooks | Inventory reads/writes and inject explicit interfaces |
| Render timing changes | Async loading or different update cadence can change gameplay | Preserve synchronous behavior initially; compare timing and screenshots |
| Embedded asset regressions | Large base64 payloads and animation controllers are fragile | Keep assets untouched in early phases; hash and compare payloads |
| Unhandled extension errors | Existing guarded initializers protect campaign startup | Preserve isolation and error reporting at module boundaries |

## Phase 0 status

- [x] Source snapshot retrieved and measured.
- [x] Function/arrow-function navigation map generated (618 candidates).
- [x] Persistence touchpoints and key save semantics identified.
- [x] Main UI action delegation and core loops identified.
- [ ] Complete field-level `S` read/write ownership map.
- [ ] Build representative old/new save fixtures and test procedure.
- [ ] Validate all script initialization dependencies and patch wrappers.
- [ ] Run a real browser baseline test on a disposable save.

## Safety gate

No gameplay code has been changed. Do not begin module extraction until the unchecked items are resolved and the baseline game has been manually exercised. The `main` branch remains the untouched reference.
