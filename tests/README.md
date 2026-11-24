# Regression tests (headless Chromium)

Automated checks that drive the **real game file** in a headless browser. Added as step 3.1 of `HANDOFF.md` **before** any refactor of the combat code, so that a change can be compared against known-good behaviour.

```
npm i playwright && npx playwright install chromium     # once (or set PLAYWRIGHT_PATH to an existing install)
node tests/run.js                                       # all 20 cases on "Project X.html", ~3 minutes
node tests/run.js --game check.html                     # test a rebuilt file (modular-split: python tools/build.py . check.html)
node tests/run.js --only ghost. --jobs 2                # a subset / fewer parallel browsers
node tests/run.js --list ; node tests/run.js --full     # list cases / more rounds
```
Exit code is 1 if any case fails. Lower `--jobs` if the machine is slow (timings are load-sensitive).

## What each case protects
| Case | Bug it guards (see HANDOFF.md section 6) |
|---|---|
| `boot.fresh` | Fresh game boots with 0 page errors, title art and the Rebirth tab present |
| `boot.class-gear.<class>` (6 classes) | PR #5 — saved starter gear registered by a late script crashed the boot; later scripts never ran ("old version", no art, no Rebirth) |
| `kill.burn-clears-foe` | PR #6 — a foe killed by the mage's burn stayed on screen at 0 HP |
| `kill.click-clears-foe` | Normal kill: fight ends, kills +1, coins awarded, foe removed from the screen |
| `ghost.<kind>.gap<ms>` (Goblin, Goblin Archer at 2500 and 300 ms; Shaman, Spear, Chief, King, Alchemist, Slime) | PR #7 — a ghost of the previous foe's death frame stayed visible on the next goblin |
| `save.reload-after-fight` | A fight followed by a reload (pagehide autosave, then hydrate) boots cleanly |

## Validation of the tests themselves (run on the builds before each fix)
| Build | boot.class-gear | kill.burn | kill.click | ghost Goblin/Archer | ghost other kinds |
|---|---|---|---|---|---|
| original `2252c12` (no fixes) | **fail 6/6** (`reading 'sh'`) | **fail** | **fail** (boot crash) | not run | not run |
| + item fix (PR #5) | not run separately | **fail** | pass | **fail 4/4** | pass 5/5 |
| + burn fix (PR #6) | not run separately | pass | pass | **fail 4/4** | pass 5/5 |
| `main` (all three fixes) | pass 6/6 | pass | pass | pass 4/4 | pass 5/5 (20/20 overall) |

## How it works / rules
- Saves are **generated from a fresh game** (`save()` after setting the class and gear), never from real progress. Do not commit real saves.
- `localStorage` is seeded with `addInitScript` **before** the first load; seeding afterwards is overwritten by the game's `pagehide` autosave.
- Entering the game: click `#intro button.go` → slot chooser → n-th `▶ Continue`. The combat loop only runs once `#intro` is hidden.
- Kills use a **real click** on `.v4ab[data-a="power"]`: calling `strike()` directly does not redraw the scene and gives misleading results.
- Ghost cases make the foe harmless (`fight.atk = 0`): e.g. the Goblin King kills a level-1 player in ~3 s, ending the fight early. The first round waits (max 8 s) for the animation frames to decode, later rounds wait for the visible-image count to settle.
- The cases use these game globals: `S, FOES, mkFoe, startFight, render, fight, en, cd, CAB, item, save, activeSaveSlot`. If the game renames one, update `lib/harness.js` first.

## Known limits
- Image counts cannot see a pixel-level ghost for monsters drawn with CSS sprites (King, Alchemist, Chief use atlases); take screenshots when in doubt.
- Not covered yet: attack/hurt animation traces per goblin kind, dungeon progression, mining (automation could not drive the mining screen), farming, fishing, forge, alchemy, trade.

## Adding a case
Create or extend a file in `tests/cases/` exporting `({ full }) => [ { name, run: async t => {...} } ]`. `t.browser` and `t.game` are provided; use `lib/harness.js` and throw (or `H.assert`) to fail. Add a case **before** changing a system, and confirm it fails on a build that has the bug.
