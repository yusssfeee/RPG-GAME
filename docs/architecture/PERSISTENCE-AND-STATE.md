# Project X — Persistence and Shared State Map

**Audited source:** `Project X.html`, `main` at `2252c12b57e81a3fe773e3c8b5a335f63a8c6097`.

## Persistence mechanism confirmed

- Persistence uses browser `localStorage`.
- Active slot selector key: `tinyacre-active-slot`.
- Legacy single-save compatibility key: `tinyacre-save`.
- Current slot key format: `tinyacre-save-slot-<n>`.
- `SAVE_SLOT_COUNT` is currently 5.
- Slot 1 reads the new slot key first, then falls back to the legacy `tinyacre-save` key.
- `save()` serializes the shared `S` object as JSON and writes the active slot; slot 1 is also mirrored to the legacy key.
- `save()` calls `mineSync()` before serialization (inside a guarded try/catch).
- No IndexedDB references were found in the static scan.

## Campaign state fields observed in the default object

The initial `S` object at approximately line 1004 includes:

| Field | Initial shape / role |
|---|---|
| `coins` | Number; starting currency |
| `sel`, `fsel`, `asel` | Selected crop / farm / animal UI indices |
| `plots` | Array of farm plot state |
| `barn` | Array of 12 animal slots, initially empty |
| `xp` | Skill XP object generated from the skill list |
| `inv` | Resource and consumable quantities |
| `items` | Owned item counts |
| `eq` | Equipped item slot map |
| `up` | Upgrade levels generated from upgrade definitions |
| `buff` | Temporary or persistent buff state |
| `hp`, `sh` | Health and shield |
| `tab` | Current selected view |
| `mute` | Audio mute flag |
| `kills` | Kill counter |
| `dg` | Dungeon runtime/progress state |
| `clears` | Dungeon clear counters |
| `trade` | Trade activity / route state |
| `cost` | Cost-related state |
| `region` | Current region, initially `meadow` |
| `story` | Story counters, quests, skill points, relics |

Additional fields are added or normalized by later code, including mining state such as `mines`, `mineExp`, `mz`, `mf`, and `mmode`. The full persisted schema must be derived from all writes and normalization bridges, not only the initial object literal.

## Load and compatibility behavior

- Initial startup reads the active slot and validates that the parsed object has `plots` with the expected plot count.
- Older saves missing `items` are migrated from legacy `own` item counts.
- Older potion field `inv.potion` is converted into `inv.pot_hp1`.
- Nested maps such as `xp`, `inv`, `items`, `eq`, `up`, `buff`, `trade`, and `story` are merged with defaults.
- Barn slots are extended to the current expected length when a sufficiently populated older barn is loaded.
- `hydrateCampaign(n)` starts from `freshCampaign()`, reads a selected slot, applies compatibility defaults, and returns the normalized campaign.
- `activateCampaignSlot(n)` saves the current slot, switches the active slot, hydrates the target, resets transient combat/effect state, runs optional subsystem initializers defensively, then refreshes the intro / main render / HUD.
- `beginFreshCampaign()` resets campaign state, clears relevant transient combat state, resets mining and tree subsystems, then saves the new campaign.
- A runtime guard / normalization layer wraps `freshCampaign` and `hydrateCampaign` in later source.

## High-risk compatibility points

1. **Shared mutable state:** many systems write directly to `S`. Extracting a system without an explicit state contract can break other systems.
2. **Save schema:** changing names, nesting, or value types in `S` can invalidate existing player saves.
3. **Migration order:** legacy conversions run during load. Moving them into modules can accidentally run them too late or twice.
4. **Save side effects:** `save()` calls `mineSync()`; separating mining must preserve this ordering or deliberately replace it with a tested persistence contract.
5. **Slot behavior:** preserve all five slots and the legacy slot-1 fallback/mirror until an explicit save migration is designed and tested.
6. **Transient vs persisted state:** combat timers, DOM nodes, active effects, and animation handles should not be serialized accidentally. Confirm the actual serialized object before changing its shape.
7. **Optional initializer failure:** slot activation deliberately guards subsystem initialization. Preserve the ability to load a campaign even if an optional extension fails.

## Proposed safe persistence boundary (not implemented)

A future persistence module should expose a narrow interface such as:

- `readSlot(slotNumber)`
- `writeSlot(slotNumber, campaignState)`
- `getActiveSlot()` / `setActiveSlot(slotNumber)`
- `normalizeCampaign(rawState)`
- `createFreshCampaign()`

The first extraction must be behavior-preserving: same key names, same JSON shape, same slot count, same legacy fallback, same error handling, and same initialization ordering. Do not implement this boundary until characterization tests exist.

## Phase 0 checks still required

- [ ] Enumerate all properties written to `S` outside the initial object.
- [ ] Identify which fields are serialized and which are transient.
- [ ] Record the full nested schema of `plots`, `barn`, `trade`, `story`, mining, dungeon, and inventory.
- [ ] Verify whether autosave is invoked from additional event/timer paths.
- [ ] Test slot 1 legacy import and slots 2–5 independently using disposable browser profiles.
- [ ] Confirm save/load behavior in the browser before any module extraction.
