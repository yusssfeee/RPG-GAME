# State Access, Wrapper Chain, and Lifecycle Audit

**Status:** Phase 0 evidence document — static inspection only  
**Source:** `Project X.html` at baseline commit `2252c12b57e81a3fe773e3c8b5a335f63a8c6097`  
**Branch:** `phase-0/baseline-audit`

## Safety boundary

This document records observations from source inspection. It does not change runtime code, save data, or the main branch. No claim of successful gameplay or browser regression testing is made here.

## 1. Shared state: observed access distribution

The game creates the primary state object in the core script (source line 1005):

- `let S={...}` defines the initial campaign state.
- `S_DEFAULTS` is a JSON deep-copy of that initial object.
- Save hydration and campaign-slot activation later replace the `S` object, rather than mutating every field in place.
- The save routine serializes the current `S` object after attempting `mineSync()`.

A static scan of direct `S.<property>` references across script blocks found the following high-traffic properties. Counts are textual property references, not unique functions or proven read/write counts.

| Property | Observed direct references | Main areas observed |
|---|---:|---|
| `up` | 100+ | upgrades, combat regeneration, skill effects |
| `inv` | 80+ | gathering, crafting, rewards, inventory |
| `tab` | 70+ | navigation, render guards, domain views |
| `coins` | 80+ | economy, rewards, purchases |
| `hp` | 50+ | combat, regeneration, class progression |
| `barn` | 30+ | animal simulation and barn UI |
| `items` | 20+ | equipment, crafting, combat rewards |
| `eq` | 20+ | equipment and class/weapon systems |
| `plots` | 20+ | farming and water effects |
| `cls` | 30+ | class selection and combat |
| `dg` | 30+ | dungeon / combat progression |
| `mineExp` | 17 | mining expedition and persistence |

The scan also found substantial access to `sh`, `mz`, `mf`, `fz`, `trade`, `story`, `buff`, `xp`, `kills`, `clears`, `fishSeen`, `classXP`, `combatTraining`, and `trainingPoints`.

### Script-block concentration

The largest direct state-access clusters are:

- Core script block 3 (starts around line 589): campaign state, core economy, farming, mining, fishing, combat and save flow.
- Block 8, `rpg-v4` (around line 2685): large cross-domain extension touching inventory, tabs, coins, barn, weather, crops, jobs, contracts, combat and upgrades.
- Blocks 10–12 (around lines 4895–5279): mining expedition, mine ambience and save-slot flow.
- Blocks 15–18 (around lines 5482–6194): fishing, fish discovery, farm plots and water effects.
- Blocks 25 and 46–49 (around lines 7108–8857): reward UI, equipment/classes, class progression and combat integration.

This is a concentration map, not an ownership map. A property referenced in a block may be read, written, or both. A complete field-by-field ownership ledger still requires classifying every assignment, mutation, alias, and indirect helper call.

## 2. Persistence and replacement semantics

The core source defines five campaign slots:

- Active slot key: `tinyacre-active-slot`.
- Slot data keys: `tinyacre-save-slot-1` through `tinyacre-save-slot-5`.
- Legacy compatibility key: `tinyacre-save`, used as a fallback for slot 1 and mirrored when slot 1 is saved.

Relevant core routines are grouped near lines 1018–1022:

- `save()` attempts `mineSync()`, serializes the current state, writes the active slot, and mirrors slot 1 to the legacy key.
- `freshCampaign()` creates a fresh state based on `S_DEFAULTS` and adds mining-expedition defaults.
- `hydrateCampaign(n)` merges a stored object with defaults and performs compatibility normalization for older save shapes.
- `activateCampaignSlot(n)` saves the current slot, changes the active slot, replaces `S` with the hydrated state, resets combat/runtime variables, and returns to the Farm tab.

**Migration constraint:** do not change storage keys, slot count, legacy fallback/mirror behavior, hydration defaults, or the replacement semantics of `S` during an early extraction. Any future persistence adapter must first pass round-trip fixtures for all five slots plus legacy slot-1 data.

## 3. Function replacement / wrapper chain

The source repeatedly reassigns shared global functions. The following sequence is based on textual assignment order in the HTML file; it is not a complete semantic call graph.

| Approx. source line | Function(s) reassigned | Observed purpose / dependency |
|---:|---|---|
| 1777 | `render` | Base render wrapper; adds barn rendering when the Barn tab is active. |
| 1930 | `foeDown` | Adds story kill / boss progression around the existing defeat handler. |
| 2206–2219 | `foeDown`, `playerDown`, `flee` | Mining-ambush cleanup and return behavior. |
| 2299 | `catchFish` | Fishing catch presentation / interaction behavior. |
| 2928 | `render` | V4 synchronization wrapper. |
| 3309, 3426, 3614, 3795, 4183 | `render` | Wood, mining, farm, fight-state, and farm/barn synchronization wrappers. |
| 3749 | `upd` | Extends the existing update function with V4 UI state. |
| 3782 | `foeDown` | Additional combat handling. |
| 4686 | `render` | Woodcutting scene / scroll synchronization. |
| 4808 | `foeDown` | Mining-expedition combat reward handling. |
| 4841 | `startFight` | Enemy-specific combat presentation setup. |
| 4908–4909 | `startFight`, `foeDown` | Schedules mining redraw after combat transitions. |
| 4972–4977 | `foeDown`, `flee`, `playerDown`, `save` | Mining-expedition result and persistence wrapper. |
| 5716–5725 | `catchFish` | Fishing discovery integration. |
| 6089–6092 | `catchFish` | Fishing audio integration. |
| 7053–7072 | `render`, `startFight`, `enemyAttack`, `foeDown` | Combat animation / timing integration. |
| 7463, 7510–7515 | `foeDown`, `render`, `startFight` | Death-state and combat animation lifecycle. |
| 8054–8210 | `render`, `startFight`, `foeDown` | Shaman / spear animation controllers and death cleanup. |
| 8570–8577 | `save`, `render`, `foeDown` | Class progression persistence and defeat rewards. |

### Wrapper-chain risk

A later wrapper commonly captures the current function in a local variable (for example, `const oldRender=render`) and then replaces the global. Consequently:

1. Script order is behaviorally significant.
2. Moving a script earlier or later can change which implementation a wrapper captures.
3. Extracting a function without preserving its wrapper order can silently bypass features.
4. A compatibility layer must preserve the existing global entry points until all callers and wrappers are migrated and tested.

Before modular extraction, create an explicit wrapper ledger with: global name, assignment line, captured predecessor variable, invocation order, side effects before/after delegation, and conditions under which delegation is skipped.

## 4. Timers, animation frames, and recurring work

Static scanning found timer and animation scheduling distributed across the core and enhancement scripts. Important recurring loops include:

| Approx. line | Scheduling mechanism | Observed responsibility |
|---:|---|---|
| 1138 | `setInterval(..., 300)` | Audio/runtime synchronization API. |
| 1689–1691 | `requestAnimationFrame` | Main simulation loop, including trade/fishing/combat ticks. |
| 1693 | `setInterval(..., 250)` | Core periodic UI/update/save cadence; save is triggered every 40 ticks. |
| 1755 | `setInterval(..., 1000)` | Combat HP regeneration from the regen upgrade. |
| 1774 | `setInterval(..., 1000)` | Barn hunger/mood simulation. |
| 2673 | `setInterval(..., 1000)` | Trading completion tick. |
| 3095–3106 | `requestAnimationFrame` / cancel | Cooking loop. |
| 3269–3311 | `requestAnimationFrame` / cancel | Woodcutting loop. |
| 3536, 3596, 3972 | `setInterval` | V4 domain simulation / periodic updates. |
| 3561–3565, 3870, 3954–3957 | `requestAnimationFrame` / cancel | Additional domain animation loops. |
| 4182 | `setInterval(..., 1000)` | Weather, pests, barn, farm and synchronization ticks. |
| 4670–4692 | `requestAnimationFrame` | Woodcutting challenge loop. |
| 5239 | `setInterval(..., 300)` | Mine ambience state watcher. |
| 6103 | `setInterval(..., 450)` | Fishing ambience watcher. |
| 6436 | `setInterval(..., 150)` | Farm-water visual watcher. |
| 6974 | `setInterval(..., 1000)` | Icon auto-fit scan. |
| 7028–7048 | `requestAnimationFrame` | Goblin animation tick. |
| 7161 | `setInterval(..., 150)` | Gain-feed UI cleanup/check. |
| 7512–7548 | `requestAnimationFrame` | Combat/death visual attachment and animation. |
| 7988–8212 | `setTimeout` / RAF | Shaman and spear animation frame sequencing / cleanup. |
| 8087 | `setInterval(..., 90)` | Combat death visual cleanup. |

There are also many short-lived UI timers for toast removal, animation sequencing, transitions, and delayed redraws. The list above intentionally highlights recurring or lifecycle-sensitive work; it is not a complete inventory of every timeout.

### Lifecycle concerns

- Several loops are started without a clearly paired global teardown in the inspected source.
- Some loops are gated by the active tab or intro visibility but remain scheduled.
- Some animation loops keep a frame ID and cancel it; others schedule recursively and rely on state guards.
- The file includes multiple independent watchers that inspect DOM state on intervals.
- Switching campaign slots resets gameplay state, but a separate audit is needed to prove that every domain-specific timer, RAF loop, audio node, and transient DOM effect is stopped or safely detached.

**Required before extraction:** assign an owner to every recurring loop; record its start condition, stop condition, stored handle, and cleanup path. Add explicit lifecycle tests for tab changes, slot changes, combat exit, intro visibility, and page hide.

## 5. Recommended safe next steps

1. Finish the field-level `S` ledger: classify direct reads, direct writes, nested mutations, and indirect writes through helpers for every property.
2. Finish the wrapper ledger for all reassigned globals, especially `render`, `save`, `upd`, `foeDown`, `playerDown`, `flee`, `startFight`, and `catchFish`.
3. Finish the timer/RAF inventory with owner and cleanup evidence, not just source occurrence counts.
4. Establish a browser baseline with a disposable copy of save data: console errors, startup, navigation, save/reload equality, five-slot switching, and representative domain workflows.
5. Only then select a low-risk extraction candidate. Prefer a pure constant/data module or isolated utility whose dependencies and side effects can be demonstrated, not a high-coupling domain system.

## 6. Verification status

- [x] Source file inspected statically.
- [x] Shared-state access hotspots mapped by script block.
- [x] Major function reassignment points catalogued.
- [x] Major recurring timer / RAF sites catalogued.
- [ ] Complete field-by-field read/write ownership ledger.
- [ ] Complete wrapper predecessor/delegation ledger.
- [ ] Complete timer owner and disposal ledger.
- [ ] Browser console baseline.
- [ ] Save/reload and five-slot regression fixtures.
- [ ] Gameplay regression run.
- [ ] Extraction candidate approved.

**Phase 0 remains in progress. No runtime code has been extracted or changed.**
