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

This is a manual regression plan, not an automated test suite. Do not mark a scenario PASS until it has actually been executed. Automated tests may be added later, after the game's state and persistence boundaries have been mapped.

## Change policy

During Phase 0, documentation and test planning only. Do not modify `Project X.html`, embedded JavaScript/CSS, images, save formats, or runtime assets.
