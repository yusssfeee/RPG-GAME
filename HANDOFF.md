# HANDOFF — where the project stands and how to continue

*Last updated: 2026-11-27. Step 3.2 (shared death-render guard, PR #10) was done earlier. On 2026-11-27 `modular-split` was synced with `Project X.html` (`tools/sync_src.py`), merged into `main` by PR #12, and all 29 regression cases passed. See sections 3 and 7.*
*`AGENTS.md` stays authoritative. This file is the **status log**: what is done, what is left, and the practical know-how. **Update it at the end of every work session** (commit hashes, test results, decisions).*

## 0. Read this first
1. Read `AGENTS.md`. Then read this file. Then check the current branch head before changing anything.
2. `Project X.html` (repo root, `main`) is the canonical game and the only thing the owner plays. Everything else is support material.
3. **Several AI agents work on this repository** (Claude, Codex, ...). Re-read `main` and this file before every task, and never overwrite a file from an older copy: edit the current version (or do a real 3-way merge).
4. Report only tests you actually ran. If something could not be tested, say so (see section 6 for what was never tested).

## 1. The owner and how to work with them
- GitHub user `yusssfeee`. **Replies must be in Arabic.** Not a programmer: works from screenshots, runs commands you give them. Prefers one clear step at a time, with the expected output stated, and wants you to verify claims instead of guessing.
- Windows PC, PowerShell, Chrome. Local clone: `%USERPROFILE%\Downloads\rpg-split\RPG-GAME` (the clone currently used for work and tests is `%USERPROFILE%\Downloads\rpg-split\RPG-GAME-tests`; `RPG-GAME` and `RPG-GAME-clean` are older copies).
  **Start every command block with `cd $HOME\Downloads\rpg-split\RPG-GAME`** — the terminal often opens in the user's home folder, which caused repeated "not a git repository" errors.
- A separate loose copy `%USERPROFILE%\Downloads\Project X.html` exists outside git. If the owner plays from it, run the same patch script on it too.
- PowerShell blocks `.ps1` scripts (`running scripts is disabled on this system`), so `npm`/`npx` fail: give the owner `npm.cmd` / `npx.cmd` instead. Clicking inside the PowerShell window pauses a running command (selection mode); tell the owner to press `Esc` and not to click while tests run.
- Git on Windows warns `LF will be replaced by CRLF`: harmless. To compare a built file with `Project X.html`, normalise CRLF (command in section 9).
- Patch scripts create `*.bak` files. **Never `git add` them**; add files by explicit path. Also never add `check.html`, `apply_*.py` at the repo root, or the owner's save backups.
- If the owner's main folder holds **uncommitted work** (e.g. a feature in progress: modified `Project X.html`, `docs/`, `*.bak`), do not run git operations there. Use a separate clean clone (`git clone https://github.com/yusssfeee/RPG-GAME.git RPG-GAME-clean`) for your branch.
- Never `npm install` inside `tests/` without `tests/.gitignore` (it excludes `node_modules/`), and never `git add tests` blindly: read `git status` first. If junk got staged, `git restore --staged <path>` unstages without deleting anything.
- The owner's game saves (`localStorage`) are personal data. Do not commit them. Test fixtures must be synthetic.

## 2. How changes get into the repo (important: AI limits)
- The AI sandbox has **no internet**. GitHub is reached only through the GitHub MCP tool: it can read files, read commits, and open a "create pull request" form that the **owner must submit**. It cannot push `Project X.html` (50 MB) or large source files.
- Working pattern that worked every time:
  1. Reproduce the problem in a headless browser (section 6). 2. Find the root cause in the code. 3. Write a tiny Python patch script (see `tools/patches/`) that replaces one exact string, refuses unless it matches exactly once, makes a `.bak`, and is idempotent. 4. Test the patched file on a copy. 5. The owner runs the script locally, checks `git diff --stat` (expect `1 insertion, 1 deletion`), commits, pushes a branch. 6. The AI verifies the commit on GitHub (`get_commit`). 7. PR is created and merged on the web. 8. The same fix is applied to `src/` on `modular-split` so the split stays byte-identical.
- Pitfall found the hard way: if the new text contains the old text, an idempotence check on the old text applies the fix twice. Check for the **new** text first.

## 3. Repository state
| Branch | Head | What it is |
|---|---|---|
| `main` | merge commit `d4d459e` (PR #12) | Single-file game with 3 fixes and the shared death render guard (PR #10), **plus the modular split**: `src/`, `tools/` (`build.py`, `split.py`, `split_main.py`, `phase2.py`, `sync_src.py`, `patches/`), `tests/`, `HANDOFF.md`. |
| `modular-split` | `b9077b8` | Fully merged into `main` by PR #12 (11 commits). Can be deleted. |

Merged fixes on `main`: PR #5 (`5338430`, item fallback) · PR #6 (`986574f`, burn kill redraw) · PR #7 (`e1ffa72`, goblin ghost frame) · PR #10 (shared death render guard, step 3.2) · PR #12 (modular split + sync + tests dependency).
`modular-split` commits: phase 1 `f618fe3` · phase 2 `0f724e1` · fixes applied to `src/` `5f2c601` and `f94f387` · sync with Codex goblin changes `d974144` (adds `tools/sync_src.py`) · playwright dependency `b9077b8`.

**Invariant (now on `main`):** `src/` must rebuild to exactly `Project X.html`. Check with `python tools/sync_src.py "Project X.html" --check` (expected: `OK: src/ rebuilds to the canonical file.`) after every change to `Project X.html`. `Project X.html` remains the canonical file; `src/` is derived from it.

## 4. `src/` layout (on `main` since PR #12)
- `src/manifest.json` — ordered list of 93 blocks (52 scripts, 41 styles) and 527 embedded images. `src/index.template.html` — page markup with markers `<!--@@BLOCK:NNN@@-->`.
- Tokens inside sources: `{{BLOB:bNNNN.ext}}` = `data:` URI image; `{{RAW:file}}` = raw base64 (goblin atlases). `build.py` expands both.
- `src/scripts/NNN-*.js` — the 52 original inline scripts **in load order. Never reorder.**
- `src/scripts/011/` — the main script split into 27 parts (header + 26 sections: art, data, sound, farm, barn, mining, fishing, forge, alchemy, trading caravan, shop, combat, scenes, main loop, title screen, ...). Each part is valid JS on its own.
- `src/scripts/016/` (rpg-v4, 11 parts) and `src/scripts/014/` (sprite pack, 2 parts) are **fragments of one function**: not valid alone, marked `"fragments": true`, joined into one `<script>` at build.
- `src/assets/embedded/` — 527 images + `raw-rpg-goblin-anim-1..5.webp`.
- `tools/`: `build.py` (`--separate` loads parts as separate scripts, to test the split), `split.py` (original → `src/`, refuses once parts exist), `split_main.py` (phase 1), `phase2.py`, `patches/` (historical fix scripts; all already applied — use as templates).
- `SPLIT.md` documents the split.

## 5. Architecture facts (verified with a JS parser, not guessed)
- 52 scripts; **39 are one big IIFE** (private scope, cannot be split into separate files). The main script (1361 lines) is plain and was split by section banners; no statement crosses a banner and nothing uses a later-declared function at load time.
- **Layering:** 55 globals are re-assigned by later scripts, each wrapping the previous definition. Most wrapped: `render` 14, `foeDown` 11, `addXp` 7, `VIEWS.fish` 6, `enemyAttack` 6, `startFight` 6, `combatTick` 4, `strike` 4, `VIEWS.fight` 4. Load order is therefore semantic.
- **Combat = 39 layers:** goblin animation controllers 18 (`050` atlas sprites, `060` Goblin/Archer frame stacks, `074` Shaman, `078` Spear — the same death-hold pattern written four times, each with its own `deathState` that blocks `render`), mining 10 (`013`, `020`), audio/loot 5 (`018`), rpg-v4 part E 3, class training 2 (`084`), story counter 1 (`011`).
- Saves: `localStorage` keys `tinyacre-save-slot-1..5`, `tinyacre-active-slot`, legacy `tinyacre-save`, `gob_eq`. One state object `S`; hydrated by `hydrateCampaign`. The game **autosaves on `pagehide`** into the in-memory active slot.
- Starter class gear (`a_start_mage`, `w_start_mage`...) is registered by a **late** script, after the main script already loaded the save.
- Mage burn is applied inside `combatTick` (class-balance script), not through a click.

## 6. Fixed bugs (root causes) and testing know-how
| Symptom | Root cause | Fix (where) |
|---|---|---|
| After reload: title screen without art, no Rebirth, "old version" | `item('a')` returned `undefined` at boot for a saved class armor not yet registered → `maxSh()` threw → main script aborted | `item()` falls back to the default starter item (`Project X.html:1048`, `src/scripts/011/04-data.js`) |
| Monster killed by mage burn stays on screen at 0 HP | `combatTick` guard called `foeDown()` without `render()` (click path redraws, DoT path did not) | `if(f&&f.hp<=0&&foeDown())render();` (`:1496`, `src/scripts/011/14-combat.js`) |
| Ghost of the dead goblin on the next Goblin/Archer | Cached frame `<img>` reused across fights; last death frame kept `opacity:1` | `el.style.opacity='0'` in `poolEl` (`:7306`, `src/scripts/060-rpg-goblin-combat-fix.js`) |

**Headless testing (Playwright + Chromium, `file://`) — non-obvious rules:**
- Seed `localStorage` with `context.addInitScript` **before** the first load (guard with a `sessionStorage` flag). Seeding after load is overwritten by the `pagehide` autosave.
- To reach gameplay: click `#intro button.go` ("Start") → a slot chooser opens → click the n-th `text=▶ Continue`. The combat loop only runs once `#intro` is hidden.
- Start a fight: `S.tab='fight'; startFight(mkFoe('Slime',1)); render(); en=100;`. `FOES` is an **array of objects**; names are `FOES.map(f=>f.n)`.
- Kill with a **real click** on `.v4ab[data-a="power"]` after `fight.hp=1; en=100; cd=0`. Calling `strike()` directly does not redraw (the click handler does) and gives misleading screenshots.
- Burn kill: `fight.hp=fight.max=500; CAB.use(); fight.hp=1;`.
- Boot check: 0 page errors; `#poster` has a background image; `[data-k="reb"]` exists; `S.cls`, `S.coins`, `item('a')` as expected.
- Tab content lives in `#pane` (`#stg` exists only in the fight view). Mining uses `data-mine="cave|gather|engage|reset"` rather than `data-a`, and its ore button floats continuously: Playwright rejects it as "not stable", so click it with `force: true`. A forced click lands on the right element.
- Detect leftovers by counting **visible** `<img>`/sprites in `#stg` after repeated spawn-and-kill rounds (also with a 300 ms gap); some monsters draw with CSS sprites, so element counts cannot see a pixel-level ghost — take screenshots.
- **Regression suite:** `tests/` (read `tests/README.md`). `node tests/run.js` runs 29 headless cases in about 5 minutes (needs Playwright). Validation: the cases for the three fixed bugs fail on the builds before each fix; the cases added later (tabs, dungeon, mining, animations) fail on deliberately broken copies of `main`; `death-hold.shared-render-guard` (added with PR #10) has not been run against a broken build.
- **Latest run of all 29 cases:** 29 passed, 0 failed in about 128 s, run locally on Windows with `node run.js` (single process) on `main` after PR #12 (2026-11-27), with `python tools/sync_src.py "Project X.html" --check` reporting `OK`. Before that it was also 29/29 on `modular-split` after syncing `src/`.
- Setup on a fresh machine: from `tests/` run `npm.cmd i playwright` and `npx.cmd playwright install chromium`, then `node run.js`.

**Never tested:** a full manual playthrough; the *logic* of farming, fishing, forge, alchemy, trade, cooking and the other skill tabs (they are only rendered by `tabs.render-all`); Goblin King/Alchemist were only checked by element counts. Mining and one dungeon are now driven by `tests/`, but whether the older mining-ambush layers in `013` (`tapTile` / `mineAmbushActive`) are dead code is still **unverified** (the ambush trigger is closure-local and was never observed firing in the mining flow).

## 7. Status and what remains
**Done**
- [x] Analysis of dependencies, load order, layering, save format.
- [x] Phase 1 — main script split into 27 files, rebuild byte-identical (`f618fe3`).
- [x] Phase 2 — `rpg-v4` and sprite pack fragmented; goblin atlases extracted to WebP; goblin script 1.24 MB → 9 KB (`0f724e1`).
- [x] Three gameplay fixes on `main`, mirrored in `src/`.

- [x] **Sync and merge `modular-split` into `main`** (2026-11-27): `tools/sync_src.py` updated 4 files in `src/scripts/` (`050`, `060`, `074`, `078`), `--check` reported OK, 29/29 tests passed, PR #12 merged into `main`.

**Open decision**
- `src/` adds ~40 MB (images stored twice) and does not change the game. `Project X.html` is still the canonical file that is edited; `src/` is kept in sync with `tools/sync_src.py` (see `AGENTS.md`). Only change this rule if the owner decides to edit `src/` instead and rebuild `Project X.html` from it.

**Next (Phase 3 — changes real code; show each step to the owner before doing it)**
- [x] **3.1 Safety net, no game change:** `tests/` (20 cases, synthetic saves): boot with each class's saved gear, burn/click kill redraw, ghost frames for 8 foe kinds at two respawn speeds, reload after a fight. Extended afterwards with `tabs.render-all`, `dungeon.slime-cave-completes`, `mining.gather-yields-ore` and `anim.attack-hurt.<kind>` (29 cases with `death-hold`). **Still to add before refactoring a system:** a differential trace (DOM/state at fixed times) to compare before/after, and cases for the logic of the other skills.
- [x] **3.2** `window.__RPG_DEATH_RENDER_GUARD` now shares the render hold across the atlas, standard Goblin, Shaman, and Spear death controllers. Per-controller death cleanup and animation drawing remain local. Added `death-hold.shared-render-guard`; 21/21 regression cases passed locally.
- [ ] **3.3** Turn the remaining nested wrappers (`foeDown`, `startFight`, `enemyAttack`, ...) into explicit ordered hook lists.
- [ ] Verify whether the `013` mining-ambush layers (`tapTile` / `mineAmbushActive`) are superseded by `020`; remove only with evidence.
- [ ] `013-rpg-game-enhancements.js` (52 KB, no banners) is still unsplit.
- [ ] Keep this file current.

## 7a. Phase 4 — Performance plan (added 2026-11-27)
**Goal:** the game must open fast and stay smooth, especially on phones, without changing gameplay or save compatibility. Work in the priority order below. **Each item ends with the normal routine** (`sync_src.py`, `--check`, `node run.js`, see section 9). Report only what you measured.

### Measured evidence (owner's Chrome on Windows, DevTools > Performance, Farm tab idle for 10 s, 12 ripe corn plots)
| Metric (self time) | Baseline | After injecting `*{animation:none!important;transition:none!important}` |
|---|---|---|
| Recalculate style | 171 ms | 3.6 ms |
| Layerize | 132 ms | 5.8 ms |
| Pre-paint | 71 ms | 4.6 ms |
| Commit | 66 ms | 18 ms |
| Total busy time | ~917 ms | ~344 ms |

Both totals include ~100 ms of profiler overhead; without it the work dropped from ~816 ms to ~235 ms (about 3.5x less). Paint was not visible in the second screenshot and was not compared.
- **Conclusion:** continuous CSS animations are the main measured cost on the Farm screen. The 250 ms `render()` loop is **not** proven to be the main cost. **Do not rewrite `render` for performance reasons.**
- **Not yet known:** which animation is responsible. Pending experiment: after a reload, inject `#grid,#grid *,#grid::before,#grid::after,#grid *::before,#grid *::after{animation:none!important}` and record again; if the numbers drop, split further (weather overlays / ripe plots / wet soil).
- This was a desktop run with a single recording per condition. Re-measure with `CPU: 4x slowdown` to approximate a phone, and repeat a recording before trusting a small difference.

### Static findings (read from the code, **not** measured)
- `Project X.html` is ~50 MB: ~48 MB are base64 images (367 WebP, 153 PNG, 10 JPEG); the code is ~2 MB. Base64 is ~33% larger than the real files.
- 15 `setInterval` calls, none ever cleared (fast ones: 90, 150, 150, 300, 300, 450 ms). 4 permanent `requestAnimationFrame` loops: `loop`, `fishMotion` (runs even outside the fish tab), and two goblin `tick` functions (run outside fights). Together ~87 ms per 10 s (about 10% of the busy time). 15 `MutationObserver`s, some observing `#pane` or `body` with `subtree`.
- `save()` runs `JSON.stringify(S)` at ~75 call sites and every 10 s; slot 1 is written twice (`tinyacre-save-slot-1` and legacy `tinyacre-save`); write errors are swallowed by `catch(e){}`, so a full or blocked storage fails silently.
- `rpg-icon-autofit` only handles hrefs starting with `data:image/` and reads pixels through a canvas (`getImageData`). If images become external files it silently stops fitting icons, and on `file://` the canvas is tainted (fine on GitHub Pages).
- Candidate animations for the measured cost (**unverified**): weather overlays that animate `background-position` (`wxSheen`, `wxDrizzle`, `wxMist`, `wxWind`; `.v4wx:before`, `#grid.wx-*`), `.plot.ripe` (`v4ripe`, `transform`, one layer per plot), `.farm-wetsoil:after` (`wfSheen`), `.plot.pest` (`v4pst`). In total 133 `@keyframes` and 59 `infinite` animations exist.
- Line numbers seen during the analysis (`Project X.html`, 2026-11-27): `loop` 1675, `fishMotion` 2260, goblin `tick` 7027 and 7527, cave sound interval 5239. They drift with every edit: search by name.

### Ordered goals (most important first)
- [-] **P1 — Fix the Farm CSS animations.** **DROPPED by the owner on 2026-11-27: never applied; do not implement or re-propose it.** (Record of the original idea follows.) Finish the narrowing experiment above, then fix in CSS only: animate only `transform` and `opacity`; avoid animating `background-position`, `box-shadow` or `filter` on large overlays; pause animations when the pane is hidden. No JS or save changes. *Done when:* the same recording shows clearly lower Recalculate style, Layerize and Paint, and before/after screenshots look the same.
- [ ] **P2 — Light build for publishing.** Add a `--external-assets` mode to `tools/build.py` that writes a **second** output (never `Project X.html`) referencing the files in `src/assets/embedded/`. The canonical file and the `sync_src.py --check` invariant stay untouched. *Prerequisite:* handle `rpg-icon-autofit` (search `isData` and `measure(`), then test over `http` (GitHub Pages) as well as `file://`. Ask the owner before enabling Pages.
- [ ] **P3 — Stop needless loops.** Run `fishMotion` only while a school exists, the goblin ticks only during fights, and pause timers while `document.hidden`; slow or make event driven the 90/150 ms intervals (gain feed `check`, farm water `watch`, goblin death `clean`). Expected gain is small (~10%): do it after P1.
- [ ] **P4 — Save hardening, same format.** Show a visible warning when `localStorage.setItem` fails; add export/import of a save file; coalesce bursts of `save()`. Removing the double write of slot 1 touches saves: **ask the owner first** (`AGENTS.md`). Add a `saveVersion` only with a migration for old saves.
- [ ] **P5 — Performance regression test in `tests/`.** A Playwright case on the Farm tab with a synthetic save: count `render` calls and long tasks over 10 s and store the baseline in `tests/README.md`. This also covers part of the "differential trace" prerequisite for step 3.3.
- [ ] **P6 — Step 3.3** (nested wrappers into ordered hook lists): the riskiest and gives no speed gain, so it comes last and only after P5.
- **Never:** rewrite `render` for speed; change the save format or delete save keys without asking; edit `src/` by hand without the check.
- The logic of farming and barn is **untested** (section 6, "Never tested") and P1 and P3 touch their screens: run `tabs.render-all` and look at screenshots before and after.

## 8. Rules for the next AI
- Smallest safe, reversible change. Analyse before changing structure. Ask before destructive changes to saves, assets or structure. Do not invent: if a file or access is missing, say exactly what and stop.
- Before step 3.3, add the still-missing differential DOM/state trace test (attack/hurt invariants, dungeon progression and mining are now covered by `tests/`).
- Preserve behaviour and save compatibility. Do not rewrite from scratch.
- Performance work follows section 7a in priority order. Measure before and after with the same method (DevTools Performance recording of the same screen) and report the numbers.
- Verify everything you claim (rebuild, hash/byte comparison, headless run). Verify on GitHub after the owner pushes.
- Never ask the owner to run multi-step commands without stating the expected output of each step and where to stop and send a screenshot.

## 9. Command cheat sheet (PowerShell, from the repo folder)
After any edit to `Project X.html` (this is the normal routine now):
```powershell
cd $HOME\Downloads\rpg-split\RPG-GAME-tests
python tools/sync_src.py "Project X.html"           # expect: OK: updated N file(s) ...
python tools/sync_src.py "Project X.html" --check   # expect: OK: src/ rebuilds to the canonical file.
cd tests ; node run.js                              # expect: 29 passed, 0 failed
```
Older manual check (still valid):
```powershell
cd $HOME\Downloads\rpg-split\RPG-GAME
git checkout modular-split ; git fetch origin ; git merge origin/main -m "Merge origin/main into modular-split"
python tools/build.py . check.html
python -c "a=open('Project X.html','rb').read().replace(b'\r\n',b'\n');b=open('check.html','rb').read().replace(b'\r\n',b'\n');print(a==b)"   # must print True
git add <explicit paths> ; git status      # review before committing; never add .bak / check.html
```
