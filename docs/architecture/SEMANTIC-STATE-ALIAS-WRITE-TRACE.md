# Semantic State and Alias Write Trace — Phase 0

**Baseline:** `Project X.html` on `main`  
**Baseline commit:** `2252c12b57e81a3fe773e3c8b5a335f63a8c6097`  
**Source blob:** `5ade1cb528871ad410228697e21d317f80782160`  
**Branch:** `phase-0/baseline-audit`  
**Analysis date:** 2026-11-21  
**Tooling:** TypeScript compiler API 5.8.3, JavaScript ScriptKind, Node.js 22.16.0

## 1. Scope and corrected AST method

The audit parsed all 52 non-empty inline script blocks. There were zero parser diagnostics. It began with direct `S.property` access nodes, then followed a limited set of simple local declarations and assignments whose right-hand side was rooted in `S` (for example `const p=S.barn[i]`, `const run=S.mineExp`, and `const T=S.trade`). This added alias-rooted references and write targets to the inventory.

A review of the write classifier also explicitly restricted increment/decrement writes to `++` and `--`; boolean negation such as `!p.open` is a read, not a write. The corrected totals below are the ones to use.

### Corrected aggregate

| Metric | Count |
|---|---:|
| Non-empty script blocks parsed | 52 |
| Parser diagnostics | 0 |
| Direct `S.property` references | 963 |
| Alias/destructuring binding sites | 49 |
| Alias-rooted property references traced | 246 |
| Combined direct + alias-rooted references | 1,209 |
| Reads | 822 |
| Direct `S.field = ...` writes | 176 |
| Nested path writes | 89 |
| Indexed path writes | 103 |
| Increment/decrement writes | 12 |
| Delete operations | 1 |
| Recognized mutator calls | 6 |
| Total syntactically recognized write/update operations | 387 |
| Writes through the tracked local aliases | 69 |

The 69 alias writes are included within the 387 write/update operations, not additional to them. The combined counts reconcile: 822 reads + 387 write/update operations = 1,209 traced references/operations.

## 2. Per-field AST reference and write inventory

Counts are syntax occurrences, not unique functions or gameplay transactions. “Direct refs” are code references rooted directly at `S`; “alias refs” are references reached through the limited local alias tracker. “Alias writes” is the subset of write/update operations occurring through those tracked aliases.

| Field | Total refs | Direct refs | Alias refs | Reads | Direct writes | Nested writes | Indexed writes | ++/-- | Delete | Mutator calls | Alias writes |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| `up` | 99 | 99 | 0 | 98 | 0 | 0 | 0 | 1 | 0 | 0 | 0 |
| `barn` | 95 | 33 | 62 | 70 | 1 | 19 | 4 | 0 | 0 | 1 | 19 |
| `mineExp` | 93 | 17 | 76 | 58 | 4 | 18 | 13 | 0 | 0 | 0 | 31 |
| `inv` | 88 | 88 | 0 | 9 | 1 | 22 | 50 | 6 | 0 | 0 | 0 |
| `coins` | 85 | 85 | 0 | 43 | 42 | 0 | 0 | 0 | 0 | 0 | 0 |
| `tab` | 84 | 84 | 0 | 64 | 20 | 0 | 0 | 0 | 0 | 0 | 0 |
| `plots` | 52 | 21 | 31 | 41 | 0 | 10 | 0 | 0 | 0 | 1 | 10 |
| `hp` | 51 | 51 | 0 | 27 | 24 | 0 | 0 | 0 | 0 | 0 | 0 |
| `trade` | 44 | 10 | 34 | 35 | 0 | 9 | 0 | 0 | 0 | 0 | 8 |
| `cv` | 39 | 22 | 17 | 31 | 1 | 3 | 1 | 0 | 0 | 3 | 0 |
| `cls` | 37 | 37 | 0 | 32 | 5 | 0 | 0 | 0 | 0 | 0 | 0 |
| `dg` | 33 | 33 | 0 | 26 | 4 | 1 | 0 | 2 | 0 | 0 | 0 |
| `jobs` | 29 | 11 | 18 | 25 | 1 | 1 | 2 | 0 | 0 | 0 | 1 |
| `items` | 25 | 25 | 0 | 11 | 1 | 0 | 11 | 1 | 1 | 0 | 0 |
| `eq` | 24 | 24 | 0 | 16 | 0 | 4 | 4 | 0 | 0 | 0 | 0 |
| `mz` | 21 | 21 | 0 | 18 | 3 | 0 | 0 | 0 | 0 | 0 | 0 |
| `w5` | 21 | 21 | 0 | 15 | 4 | 1 | 1 | 0 | 0 | 0 | 0 |
| `sh` | 20 | 20 | 0 | 7 | 13 | 0 | 0 | 0 | 0 | 0 | 0 |
| `wx` | 17 | 17 | 0 | 16 | 1 | 0 | 0 | 0 | 0 | 0 | 0 |
| `wz` | 16 | 16 | 0 | 11 | 5 | 0 | 0 | 0 | 0 | 0 | 0 |
| `mf` | 15 | 15 | 0 | 11 | 3 | 0 | 0 | 1 | 0 | 0 | 0 |
| `rb` | 13 | 5 | 8 | 11 | 0 | 1 | 1 | 0 | 0 | 0 | 0 |
| `fz` | 12 | 12 | 0 | 9 | 3 | 0 | 0 | 0 | 0 | 0 | 0 |
| `contracts` | 11 | 11 | 0 | 7 | 3 | 0 | 0 | 0 | 0 | 1 | 0 |
| `fishSeen` | 11 | 11 | 0 | 7 | 2 | 0 | 2 | 0 | 0 | 0 | 0 |
| `classXP` | 11 | 11 | 0 | 7 | 2 | 0 | 2 | 0 | 0 | 0 | 0 |
| `buff` | 10 | 10 | 0 | 7 | 1 | 0 | 2 | 0 | 0 | 0 | 0 |
| `combatTraining` | 10 | 10 | 0 | 6 | 2 | 0 | 2 | 0 | 0 | 0 | 0 |
| `trainingPoints` | 10 | 10 | 0 | 7 | 3 | 0 | 0 | 0 | 0 | 0 | 0 |
| `region` | 9 | 9 | 0 | 7 | 2 | 0 | 0 | 0 | 0 | 0 | 0 |
| `xp` | 8 | 8 | 0 | 5 | 0 | 0 | 3 | 0 | 0 | 0 | 0 |
| `mute` | 8 | 8 | 0 | 6 | 2 | 0 | 0 | 0 | 0 | 0 | 0 |
| `kills` | 8 | 8 | 0 | 7 | 0 | 0 | 0 | 1 | 0 | 0 | 0 |
| `mmode` | 8 | 8 | 0 | 6 | 2 | 0 | 0 | 0 | 0 | 0 | 0 |
| `bsel` | 8 | 8 | 0 | 7 | 1 | 0 | 0 | 0 | 0 | 0 | 0 |
| `story` | 7 | 7 | 0 | 6 | 1 | 0 | 0 | 0 | 0 | 0 | 0 |
| `sel` | 7 | 7 | 0 | 6 | 1 | 0 | 0 | 0 | 0 | 0 | 0 |
| `asel` | 7 | 7 | 0 | 5 | 2 | 0 | 0 | 0 | 0 | 0 | 0 |
| `clears` | 7 | 7 | 0 | 6 | 0 | 0 | 1 | 0 | 0 | 0 | 0 |
| `bmode` | 7 | 7 | 0 | 5 | 2 | 0 | 0 | 0 | 0 | 0 | 0 |
| `tmode` | 7 | 7 | 0 | 5 | 2 | 0 | 0 | 0 | 0 | 0 | 0 |
| `mines` | 6 | 6 | 0 | 4 | 1 | 0 | 1 | 0 | 0 | 0 | 0 |
| `cost` | 5 | 5 | 0 | 4 | 0 | 0 | 1 | 0 | 0 | 0 | 0 |
| `bfeed` | 5 | 5 | 0 | 3 | 2 | 0 | 0 | 0 | 0 | 0 | 0 |
| `mzId` | 5 | 5 | 0 | 2 | 3 | 0 | 0 | 0 | 0 | 0 | 0 |
| `fsel` | 4 | 4 | 0 | 3 | 1 | 0 | 0 | 0 | 0 | 0 | 0 |
| `ms` | 4 | 4 | 0 | 2 | 1 | 0 | 1 | 0 | 0 | 0 | 0 |
| `sk` | 4 | 4 | 0 | 3 | 0 | 0 | 1 | 0 | 0 | 0 | 0 |
| `ubr` | 4 | 4 | 0 | 2 | 2 | 0 | 0 | 0 | 0 | 0 | 0 |
| `bbr` | 3 | 3 | 0 | 2 | 1 | 0 | 0 | 0 | 0 | 0 | 0 |
| `smeltCd` | 2 | 2 | 0 | 1 | 1 | 0 | 0 | 0 | 0 | 0 | 0 |

## 3. Most consequential alias-backed mutation paths

The local alias tracker found 49 binding sites. Not every binding is a live mutable object reference: destructured primitives and scalar snapshots are included in that count. The strongest object-reference findings are:

| State root | Representative alias bindings | Consequence |
|---|---|---|
| `S.barn` | `p=S.barn[i]` at lines 1235, 1653, 1768, 2381, 4121, 4128, 4133, 4151, 4156, 4164 | Animal objects are mutated through `p` across core barn actions and later farm/barn enhancements. Observed writes include production time, duration, hunger/mood, fox state, baby state, illness, feed/pet timers and readiness. 19 alias writes were attributed to this root. |
| `S.mineExp` | `run=S.mineExp` at line 4925 | Mining expedition state is normalized and updated through `run` for cave, depth, resources, selection, encounter and pending-advance fields; 31 alias writes were found. |
| `S.plots` | `p=S.plots[i]` at lines 1208, 1931, 3612, 4072, 4078, 4086 | Farm plot records are mutated through `p`, including planted crop/time/duration, watering and pest state; 10 alias writes were found. |
| `S.trade` | `T=S.trade` at lines 1360, 1362, 1380, 1602 | The legacy trading route object is updated via `T` for route origin/destination, departure time, duration and prices; eight alias writes were found. |
| `S.jobs` | `j=S.jobs[k]` at lines 3520, 3531, 3536, 3587 | Job records are read and updated through `j`; at least one direct alias write resets job duration. |
| `S.cv` | `C=S.cv` at lines 2631 and 2660; `run=S.cv.runs[i]` at 2603 | Caravan state is held locally during render/tick paths. Callback parameters and their transitive object mutations are not fully propagated by this simple alias scanner. |

Other tracked binding examples include `x=S.xp[k]` (1185), `l=S.up[k]` (1389, 1558, 1585, 1746), `h=S.hp` (1731), `tabBefore=S.tab` (2196), `mineAmbushFloor=S.mf` (2199), `_c=S.coins` (2826), `k=S.wx.k` (4090), `r=S.rb` (4743 and 4753), destructured `cls/mute` (4753), `lastTab=S.tab` (6785 and 6805), `cur=S.eq[id]` (7740 and 7810), and `old=S.hp` (8665). These are binding-site records, not a claim that every local is a live mutable reference.

### Why this changes the ownership picture

A direct `S.property` scan misses many writes when a script stores `S.barn[i]`, `S.plots[i]`, `S.trade`, or `S.mineExp` in a local variable and later mutates it. In particular, `barn`, `mineExp`, `plots`, `trade`, `jobs`, and `cv` need domain-level ownership boundaries that account for shared object identity and callbacks.

## 4. State object replacement and persistence lifecycle

The AST scan found these assignments to the top-level `S` binding:

| Line | Assignment | Role |
|---:|---|---|
| 1004 | `let S={...}` | Initial in-memory campaign object. |
| 1016 | `S={...S,...o,...}` | Legacy/current save hydration during startup. |
| 1026 | `S=hydrateCampaign(activeSaveSlot)` | Active campaign-slot switch. |
| 1040 | `S=freshCampaign()` | Start a fresh campaign through the core flow. |
| 5353 | `S=freshCampaign()` | Fresh campaign path in the later slot chooser. |
| 5437 | `S=normalizeCampaign(S)` | Runtime guard normalizes the active campaign object. |
| 5463 | `S=normalize(S)` | Wood-upgrade bridge normalizes the active campaign object. |
| 5477 | `S=normalize(S)` | Wrapped slot activation normalizes the state after delegating. |

The table above includes the initial declaration plus seven subsequent assignment sites; the report's direct-assignment list contains seven `S = ...` assignment expressions in addition to the declaration.

Persistence contract still to preserve:
- Five campaign slots.
- Active slot key: `tinyacre-active-slot`.
- Per-slot key pattern: `tinyacre-save-slot-${n}`.
- Legacy compatibility key: `tinyacre-save`, used as a fallback for slot 1 and mirrored on slot-1 saves.
- `save()` attempts `mineSync()` before serializing the current `S`.
- Slot activation saves the old active slot first, hydrates the new `S`, resets the visible tab to Farm, clears combat transients, and invokes optional mining/wood/player/render loaders.
- Migration logic retains legacy `own` -> `items` and `inv.potion` -> `inv.pot_hp1` conversions.

A future modular state facade must account for replacement of the whole `S` object, not just mutation of fields within one persistent object. Any subsystem caching a reference to the old `S` or one of its child objects must refresh on slot/new-campaign/hydration boundaries. The current wood scene explicitly tracks this with `W5.stateRef!==S` around line 4511; mining expedition state also has an optional slot-load integration.

## 5. Wrapper corrections and manually classified unpaired assignments

The identifier-only AST matcher found 14 function assignments without a local same-script captured predecessor. Manual source review classified them as follows:

| Target | Line | Prior implementation | Manual classification |
|---|---:|---|---|
| `fx` | 1727 | Core `fx` at 1399 | Direct replacement introducing stage-based critical/damage feedback. Later wrapped at 3737, then replaced through `window.fx` at 8900 and 9022. |
| `tapStall` | 1769 | Core `tapStall` at 1234 | Direct replacement with barn purchase/collection/feed/pet logic. A later wrapper around 4156 captures `_ts` and adds baby/illness/fox behavior. |
| `newGrid` | 2176 | Core `newGrid` at 1796 | Direct mining-grid generator replacement. |
| `spawnFish` | 2247 | Core `spawnFish` at 1260 | Direct replacement adding current fishing-pool and scene-aware spawning. |
| `oIcon` | 2338 | Core `oIcon` at 1060 | Icon helper replacement using sprite mapping. |
| `fIcon` | 2345 | Core `fIcon` at 1061 | Icon helper replacement using fish catalog icon metadata. |
| `tradeTick` | 2660 | Core `tradeTick` at 1380 | Direct replacement: advances `S.cv.runs`, not the legacy `S.trade` route. This is a high-priority browser regression scenario. |
| `toast` | 2777 | Core `toast` at 1729 | Direct replacement routed through V4 `note()` UI/audio. |
| `treeSvg` | 3465 | Earlier `treeSvg` at 3232 | Direct tree-art SVG replacement. |
| `anvilAct` | 3542 | Core `anvilAct` at 1311 | Direct Smithing implementation replacement. |
| `woodLoop` | 3863 | Core `woodLoop` at 3265 | Direct V4 timed woodcutting ring-loop replacement. |
| `chopSwing` | 3872 | Core `chopSwing` at 3271 | Direct V4 chop mechanic replacement. |
| `woodLoop` | 4520 | V4 `woodLoop` at 3863 | Later stub/no-op assigning `WS.raf=0` when V5 wood scene takes over; ordering is behaviorally significant. |
| `equip` | 8421 | Core `equip` at 1324 | Direct replacement adding class-restriction guard to the actual equip action. |

Additional object-property replacements missed by the identifier-only matcher:
- `window.fx` is replaced at line 8900, then replaced again at 9022. The local captures `floatOld` and `oldFx` are not invoked in those replacements, so these are not delegating wrappers.
- `window.drop` is replaced at 9044 to present loot in a separate side rail.
- A temporary `window.toast` override at 8795 is restored at 8807 in a `finally` block around XP processing; it is a scoped suppression hook, not a permanent wrapper.
- `VIEWS.fish`, `VIEWS.mine`, `VIEWS.fight` and other object-property wrappers remain in the companion wrapper ledger.

### High-risk finding: trade tick replacement

The original `tradeTick` at lines 1380–1384 advances the `S.trade` route, calls `arrive()`, awards Trade XP and refreshes the old trade UI when a journey ends. The main RAF loop calls `tradeTick()` at line 1678.

The later assignment at line 2660 replaces that function and instead processes `S.cv.runs`. It does not delegate to the previous function. A separate interval at line 2673 calls the replacement. This means the original `S.trade` arrival flow is no longer advanced by the main loop after this reassignment. Treat this as a **potential compatibility regression requiring browser/gameplay confirmation**, not as a proven bug until it is established whether the old trade screen is still reachable/intended or superseded.

## 6. What this analysis does not prove

- The alias tracker follows simple same-script declarations and assignments; it is not whole-program points-to/data-flow analysis.
- It does not fully trace aliases passed into helper functions, callback parameters such as `forEach(run => ...)`, aliases across script-block boundaries, destructured nested objects, closure captures, dynamically computed keys, or arbitrary helper mutations.
- Recognized mutator methods are a small allowlist, not a complete mutation model.
- Counts are AST syntax occurrences. They do not prove which player action or timer causes a write, whether a write is reachable, or whether a state is persisted.
- The wrapper table is manually inspected source evidence, not a runtime invocation graph. Runtime global/lexical resolution and return-value expectations still need execution tests.
- No browser gameplay run or save/reload comparison was completed during this static pass.

**Conclusion:** Step 1 static source tracing is materially improved. Shared-state ownership remains cross-domain; do not extract `S`, `trade`, `barn`, `mineExp`, `plots`, `inv`, `items`, `eq`, or timer controllers until their runtime contracts and regression behavior are recorded.
