# Function Wrapper and Runtime Lifecycle Ledger

**Baseline source:** `Project X.html` on `main`  
**Git blob:** `5ade1cb528871ad410228697e21d317f80782160`  
**Branch:** `phase-0/baseline-audit`  
**Method:** source-order scan of assignments and timer APIs, followed by manual grouping. Static evidence only.

## 1. Wrapper-chain rule

A wrapper typically stores the previous function in a local variable and then replaces the shared function name. The wrapper therefore delegates to the implementation that existed at the moment its script executed. Moving script blocks, changing their order, or replacing a global directly can bypass earlier or later behavior.

The source must keep its current script order and classic-script environment during early migration. Do not convert these scripts to independent ES modules yet: module scope and execution order would change how top-level lexical bindings and globals are resolved.

## 2. Confirmed wrapper assignment order

The table records observed reassignment sites in ascending source order. It lists only notable runtime globals and is not a complete call graph.

### Render

| Line | Wrapper action |
|---:|---|
| 1777 | Captures `render`; delegates, then draws barn content when `S.tab==='barn'`. |
| 2928 | Captures current render; delegates, then synchronizes V4 UI. |
| 3309 | Captures current render; adds wood/cook-related synchronization. |
| 3426 | Captures current render; adds mining/farm UI behavior. |
| 3614 | Captures current render; adds another V4 synchronization layer. |
| 3795 | Captures current render; toggles fight-pane state and may call `upd()`. |
| 4183 | Captures current render; runs farm and barn synchronization. |
| 4686 | Captures current render; adds woodcutting scroll/scene behavior. |
| 6799 | Direct replacement site; inspect block 23 before moving it. |
| 7053 | Direct replacement site in goblin animation integration. |
| 7510 | Captures current render for combat visual attachment. |
| 8054 | Captures previous render; handles shaman death state and schedules attachment. |
| 8202 | Captures previous render; handles spear death state and schedules attachment. |
| 8572 | Captures old render; runs class/progression UI ensure step before delegation. |

### Combat and fishing globals

| Function | Assignment lines | Observed layering |
|---|---|---|
| `foeDown` | 1930, 2206, 3782, 4808, 4909, 4972, 7072, 7463, 8064, 8210, 8577 | Story/boss progress; mining cleanup; V4 effects; mining reward and redraw; combat visuals; shaman/spear death animation; class reward integration. |
| `playerDown` | 2206, 4977, 7463 | Mining encounter cleanup, mining expedition result handling, combat death integration. |
| `flee` | 2219, 4975 | Mining encounter cleanup and expedition return handling. |
| `startFight` | 4841, 4908, 7066, 7515, 8056, 8204 | Enemy setup, mining redraw, animation reset, death visual detach/attach for multiple enemy animation controllers. |
| `enemyAttack` | 3781, 4860, 7069, 7476, 8060, 8206 | V4 effects, mining combat logic, attack timing, shaman/spear animation state. |
| `catchFish` | 2299, 5716, 6089 | Fishing presentation, discovery/journal integration, audio integration. |
| `upd` | 3749 and other call sites | Existing update routine is wrapped to extend V4 UI state. |
| `save` | 4977 and 8570 | Mining expedition wrapper and class progression persistence integration. |

### Additional wrapped functions

- `addXp`: 1731, 1831, 2809, 4401, 4737, 8791, 8866. Level-up notifications, milestone rewards, and domain/class XP adjustments are layered.
- `fx`: 1727, 3737, 8900, 9022. Floating effects and combat UI extensions.
- `VIEWS.fish`: multiple replacements at 1864, 2238, 2344, 2431, 5548, 5699, 5908.
- `VIEWS.mine`: 1823, 2283, 4945, 5217.
- `VIEWS.fight`: 2227, 4869, 4910, 7060.
- `combatTick`: 3767, 7498, 8062, 8208.
- `strike`: 4855, 7471, 8058, 8641.

**Required before extraction:** turn this source-order list into a verified delegation graph by recording the exact captured variable, whether delegation is unconditional, whether return values are preserved, and what cleanup/side effects occur before and after delegation. A direct replacement (without calling the predecessor) must be distinguished from a wrapper.

## 3. Timer and animation-frame lifecycle inventory

The file contains many one-shot UI timers in addition to recurring work. The table below emphasizes recurring loops and stateful animation controllers. Source line numbers are approximate and refer to the pinned baseline.

| Line(s) | Mechanism / handle | Responsibility | Observed cleanup / risk |
|---:|---|---|---|
| 1138 | `setInterval` | Audio API synchronization, every 300 ms | No paired clear found in the same small block; verify owner and page lifecycle. |
| 1689–1691 | RAF `loop` | Main game simulation loop | Self-schedules; no visible central stop path in this block. |
| 1693 | `setInterval` | Core 250 ms update/tick cadence | Persistent game loop; needs a single owner and page-hide policy. |
| 1755 | `setInterval` | Player HP regeneration, 1 s | Gated by fight/tab/upgrade but interval continues. |
| 1774 | `setInterval` | Barn hunger/mood simulation, 1 s | Global recurring simulation. |
| 2262–2264 | RAF `fishMotion` | Fishing scene motion | Self-scheduling; verify stop when leaving fishing. |
| 2501, 2524 | `pondLoopRaf` | Fishing pond animation | Handle is retained and loop start is gated; verify cancel on tab/intro changes. |
| 2673 | `setInterval` | Trading completion check, 1 s | Global recurring check, gated by active runs and intro visibility. |
| 2737 | `pt` timeout | Persistence/UI flush debounce | Existing timeout is cleared before re-arm. |
| 3095–3106 | `ck.raf` | Cooking mini-game | RAF handle cancelled when the cook action ends; verify cancel on navigation/slot change. |
| 3269–3311 | `WS.raf` | Woodcutting loop | RAF handle and busy state; later code also references WS.raf. Verify all exit paths. |
| 3536, 3596 | intervals | V4 domain periodic ticks | Need exact owner mapping and tab/intro teardown. |
| 3561–3565 | `raf` | Timing mini-game loop | Cancels on completion; verify cancellation on modal close/navigation. |
| 3870, 3954–3957 | `WS.raf`, `raf` | Additional wood/trade mini-game loops | Explicit cancellation exists for one loop; confirm every abort path. |
| 3972 | interval | V4 periodic domain simulation | Global recurring callback; requires owner/teardown record. |
| 4182 | interval | Weather, pests, barn, farm synchronization | Gated while intro/class picker is visible; interval itself persists. |
| 4670–4692 | `W5.raf` | Woodcutting challenge loop | Handle retained; completion path resets busy state. |
| 5239 | interval | Mine ambience watcher, 300 ms | Switches ambience based on wanted state; persistent watcher. |
| 6103 | interval | Fishing ambience watcher, 450 ms | Persistent audio watcher; must stop/dispose audio sources. |
| 6436 | interval | Farm water visual watcher, 150 ms | Persistent DOM watcher. |
| 6974 | interval | SVG icon auto-fit scan, 1 s | Persistent document-wide DOM scan. |
| 7028–7048 | RAF `tick` | Goblin animation | Self-schedules; confirm it stops when fight pane is absent. |
| 7161 | interval | Gain-feed cleanup/check, 150 ms | Persistent UI watcher. |
| 7512–7548 | RAF `tick` | Combat visual attachment/update | Self-schedules; paired detach exists in some combat transitions. |
| 7988–8002 | `frameTimer`, `actionTimer` | Goblin action animation | Clear helpers and play token exist; ensure all replacement/exit paths call them. |
| 8031, 8051 | death-state timeout | Shaman death sequence | `clearDeathTimers` and render/startFight cleanup exist. |
| 8087 | interval | Shaman death visual cleanup, 90 ms | Persistent cleanup poll; no obvious central stop handle. |
| 8124–8199 | `frameTimer`, `actionTimer` | Spear idle/attack/death animation | Clear helpers, play token and death timeout exist; verify cleanup for all state transitions. |
| 8476–8477, 8974–8977, 9161–9164 | hold timers | Touch long-press tooltips | Clear on pointerup/cancel/leave in their respective controllers. |

## 4. One-shot timers and delayed DOM work

The source also uses many short timeouts for toasts, particles, floating numbers, hit effects, delayed renders, transitions, scroll adjustments, audio source stops, and boot overlays. Examples include lines 573, 1069, 1399, 1729, 2278–2279, 2739, 3057, 3114, 3279–3288, 3415–3417, 3724–3791, 3880–3911, 4074, 4154, 4525, 4908–4909, 4969, 5226, 6746–6781, 6810, 7138–7146, 7419, 7458, 7597–7608, 8342–8343, 8919, 9040–9069.

Most are intentionally short-lived visual effects. They still matter if they close over a stale DOM node, old campaign state, or an old fight object after tab/slot changes. They should not all be moved into one generic timer module; ownership should remain with the domain that creates the effect.

## 5. Lifecycle requirements before modularization

For every persistent interval or RAF controller, record these fields in a follow-up runtime ledger:

- **Owner:** exact function or IIFE that creates it.
- **Handle:** variable storing the interval/RAF ID.
- **Start condition:** initial load, tab activation, combat start, mini-game start, or state change.
- **Stop condition:** tab exit, mini-game completion, combat end, slot switch, intro overlay, visibility change, or page hide.
- **Cleanup:** exact clear/cancel call and whether it is guaranteed on every exit path.
- **Stale callback protection:** token/version or state identity check preventing an old callback from mutating a new campaign.
- **Persistence interaction:** whether callback can mutate `S` or call `save()`.

The most important risks are the main RAF loop, global 250 ms tick, regeneration/barn/trade/weather intervals, audio watchers, farm visual watcher, icon scan, gain-feed watcher, and the recurring combat cleanup loop.

## 6. First extraction candidate

**No extraction is approved yet.** The safest candidate class is a small pure helper with no access to `S`, DOM, audio, timers, or mutable global registries. A candidate should only be selected after its complete call-site list and script-order dependencies are checked and the browser baseline is available. Avoid extracting `render`, combat functions, persistence, inventory/equipment, any timer controller, or the main state object in the first pass.

## 7. Verification status

- [x] Direct `S.property` textual inventory (51 properties).
- [x] Major global function reassignment sites catalogued.
- [x] Major persistent interval / RAF sites catalogued.
- [ ] AST-backed field read/write analysis and alias tracing.
- [ ] Exact wrapper predecessor/delegation graph.
- [ ] Runtime timer handle and disposal verification.
- [ ] Browser execution, console baseline and gameplay regression.
- [ ] Save fixtures for five slots plus legacy import.
- [ ] Approve a first pure-helper extraction candidate.

**Phase 0 remains open. No runtime code has been modified.**
