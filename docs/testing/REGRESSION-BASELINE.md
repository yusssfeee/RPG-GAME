# Gameplay Regression Baseline

## Purpose

Provide a repeatable before/after checklist for future modular extraction. Run the same checks against the legacy single-file build before and after each extraction.

## Test environment record

For every test run, record:

- Date and time
- Browser and version
- Operating system
- Commit SHA and branch
- Viewport size and zoom
- Whether the browser console has errors
- Whether a clean profile or an existing save was used

Do not use a valuable player save as the only test fixture. Preserve a separate disposable test save.

## Baseline scenarios

### Startup and navigation
- [ ] Game loads from a clean browser profile.
- [ ] Main menu and primary screens open.
- [ ] No uncaught JavaScript errors appear during startup.
- [ ] Screen transitions do not leave duplicate event handlers or overlays.

### Persistence
- [ ] Save is created successfully.
- [ ] Reload restores the same player progress and resources.
- [ ] Inventory, currency, quest progress, and unlocked content persist.
- [ ] Existing saves from the baseline build still load.
- [ ] Missing or malformed optional fields do not crash loading.

### Inventory and economy
- [ ] Items can be added, removed, and moved through the normal UI.
- [ ] Stack limits and quantity changes remain correct.
- [ ] Purchases and sales update both inventory and currency consistently.
- [ ] Invalid transactions do not create or destroy resources.

### Legacy trade and V4 caravan compatibility

A static source review found that `tradeTick` at line 2660 replaces the earlier implementation at line 1380. The earlier function advances the legacy `S.trade` route and calls `arrive()`; the replacement processes `S.cv.runs` and does not delegate to the previous implementation. This is a potential compatibility risk and must be resolved by observing intended/reachable UI behavior, not by assuming it is a confirmed bug.

**Legacy trade route — run independently:**
- [ ] From a clean disposable campaign, open the legacy trade UI and start a route with a known departure/destination.
- [ ] Confirm the route countdown advances and arrival occurs after the expected duration.
- [ ] Confirm arrival rewards, Trade XP, inventory/currency changes and UI state are applied exactly once.
- [ ] Save/reload during travel and confirm the trip resumes or resolves according to the existing contract.
- [ ] Repeat after switching campaign slots; confirm the old campaign's route does not leak into the new slot.

**V4 caravan (`S.cv.runs`) — run independently:**
- [ ] Start a caravan run and confirm it appears in the V4 run list.
- [ ] Confirm the completion timer advances and the ready state appears once.
- [ ] Collect the caravan and confirm goods/rewards, log entries, coins and UI update exactly once.
- [ ] Save/reload before and after completion and confirm run state is restored without duplicate collection.
- [ ] Switch campaign slots and confirm caravan timers/results remain isolated to their originating campaign.

**Comparison:**
- [ ] Confirm which legacy trade and V4 caravan entry points are reachable in the current UI.
- [ ] Record actual calls/results for the legacy route tick and V4 caravan tick separately.
- [ ] Do not change `tradeTick` until the intended compatibility behavior and caller expectations are confirmed.
- [ ] Mark each scenario PASS / FAIL / BLOCKED with console output and screenshots; currently these scenarios are not executed because the browser policy blocks the game file before load.

### Farming and animals
- [ ] Planting, growth progression, and harvesting work.
- [ ] Resource and time costs are applied once.
- [ ] Animal interactions and their resource outputs work.

### Gathering and crafting
- [ ] Fishing success/failure paths resolve correctly.
- [ ] Mining actions and rewards resolve correctly.
- [ ] Woodcutting actions and rewards resolve correctly.
- [ ] Crafting consumes the required ingredients and grants the intended result.

### Combat, towers, quests, progression
- [ ] Combat starts, resolves, and returns to the expected game state.
- [ ] Tower interactions and progression gates work.
- [ ] Quest acceptance, progress, completion, and rewards work.
- [ ] Unlocks and progression milestones remain consistent.

### Visual and input regression
- [ ] HUD values match underlying game state.
- [ ] Buttons, keyboard controls, and pointer interactions still work.
- [ ] Dialogs and overlays open and close correctly.
- [ ] No missing images, broken paths, or major layout regressions appear.

## Evidence format

For each scenario, record:

| Field | Value |
|---|---|
| Scenario | |
| Result | PASS / FAIL / BLOCKED |
| Steps and inputs | |
| Expected result | |
| Actual result | |
| Console output | |
| Screenshot / recording reference | |
| Commit SHA | |

## Important limitations

This is a manual regression plan, not an automated test suite. Do not mark a scenario PASS until it has actually been executed. In particular, the new legacy trade and V4 caravan scenarios are intentionally unchecked pending an approved browser environment. Automated tests may be added later, after the game's state and persistence boundaries have been mapped.

## Change policy

During Phase 0, documentation and test planning only. Do not modify `Project X.html`, embedded JavaScript/CSS, images, save formats, or runtime assets.
