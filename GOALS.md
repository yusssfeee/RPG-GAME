# GOALS — development plan for any AI agent

*Created 2026-11-27. This file is the **plan** (what to do next and why). `AGENTS.md` stays authoritative for rules, and `HANDOFF.md` is the status log (what is done, how to test). If this file ever contradicts `AGENTS.md`, `AGENTS.md` wins.*

## How to use this file
1. Read `AGENTS.md`, then `HANDOFF.md`, then this file. Check the current `main` before changing anything.
2. Take the **first goal that is not done** and that the owner has not put on hold. Do one goal per branch and one Pull Request.
3. Keep the evidence labels honest: **MEASURED** means a real recording or test produced the number; **READ** means it was read from the code and never measured. Never present a READ item as a measured fact.
4. When you finish or learn something, update the goal's **Status** line and the *Evidence* section, then say so in your summary.

Status marks: `[ ]` not started, `[~]` in progress, `[x]` done.

## Rules that apply to every goal
- The owner is not a programmer and wants Arabic replies, **one clear step at a time**, with the expected output of every command and a place to stop (see `HANDOFF.md` section 1).
- Preserve gameplay, visuals, save compatibility and assets. Ask the owner before any change that touches saves, assets or the project structure.
- After ANY edit to `Project X.html`: `python tools/sync_src.py "Project X.html"`, then `... --check`, then `cd tests ; node run.js` (all cases must pass). Report only tests you actually ran.
- Patch style: a small Python script in `tools/patches/` that replaces one exact string, refuses unless it matches exactly once, makes a `.bak` (never `git add` it) and is idempotent.
- Do not rewrite `render` for speed. The evidence below shows it is not the main cost.

## Goals, most important first

### G1 — Cheaper Farm screen: CSS animations   `[~]`
**Why (MEASURED):** on the idle Farm screen, continuous CSS animations cost about 60% of the busy time (see Evidence). Two animations are responsible and they are independent:
- Weather banner shimmer `.v4wx:before` (`wxSheen`, animates `background-position`, never stops): causes Layerize and Paint (132 ms and 112 ms per 10 s, down to about 7 ms and 2 ms when disabled).
- Ripe plots `.plot.ripe` (`v4ripe`, infinite hop): causes Recalculate style and Pre-paint (about 150 ms and 70 ms per 10 s, down to about 4 ms and 5 ms when limited to 3 hops).

**Change:** `tools/patches/perf_p1_css.py` disables the shimmer (`animation:none`) and makes the ripe hop run 3 times instead of forever. The gold outline and the "Harvest" label stay as the permanent ready signal. `will-change:transform` was tried and did **not** help: do not use it.
**Tasks:**
- [ ] Apply the patch, run `sync_src.py`, `--check` and the test suite.
- [ ] Look at the Farm tab in a browser: ripe plots hop 3 times then stop; the weather banner looks normal.
- [ ] Re-record the same scenario (see "How to measure") and put the new numbers in Evidence.
- [ ] Find out (READ, unverified) whether the hop plays again every time the owner returns to the Farm tab, and tell the owner.
- [ ] Check the other infinite animations on this screen when their state is active (not measured yet): `.farm-wetsoil:after` (`wfSheen`), `.plot.pest` (`v4pst`), weather overlays inside `#grid` (`wxDrizzle`, `wxMist`, `wxWind`). Only change one if a recording shows it matters.

**Done when:** Recalculate style, Layerize and Pre-paint are each under about 10 ms per 10 s idle on the Farm screen, the suite passes, and the owner has seen the result.
**Owner decision already taken:** none yet. If the owner dislikes the 3-hop behaviour, change the number in the patch (each hop is 1.3 s) or restore the infinite hop; `Project X.html.bak` holds the previous file.

### G2 — Light build for publishing   `[ ]`
**Why (READ):** `Project X.html` is about 50 MB; about 48 MB are 530 base64 images (367 WebP, 153 PNG, 10 JPEG) and the code is about 2 MB. Base64 is about a third larger than the real files, and the whole file must download and parse before the game starts. On a phone or a slow connection this is the biggest cost at first load. Not measured yet.
**Change:** add an `--external-assets` mode to `tools/build.py` that writes a **second** output (never `Project X.html`) referencing the files already in `src/assets/embedded/`. The canonical file and the `sync_src.py --check` invariant stay untouched.
**Prerequisite:** the `rpg-icon-autofit` script (search `isData` and `measure(`) only handles hrefs that start with `data:image/` and reads pixels through a canvas (`getImageData`). With external files it would silently stop fitting icons, and on `file://` the canvas is tainted (it works on GitHub Pages). Handle and test this first.
**Tasks:**
- [ ] Make `rpg-icon-autofit` work with external images, or prove it is not needed.
- [ ] Add the build mode and test the light build over `http` as well as `file://`.
- [ ] Measure first load (DevTools Network + Performance, with throttling) for both builds.
- [ ] Ask the owner before enabling GitHub Pages.

**Done when:** the light build plays the same as the canonical file (screenshots of the tabs match) and first-load size drops from about 50 MB to a few MB for the HTML.

### G3 — Stop needless loops and timers   `[ ]`
**Why (READ for the design, MEASURED for the size):** 15 `setInterval` calls are never cleared (90, 150, 150, 300, 300, 450 ms among them) and 4 `requestAnimationFrame` loops run forever: `loop`, `fishMotion` (even outside the fish tab) and two goblin `tick` functions (even outside fights). Together about 90 to 140 ms per 10 s, roughly 3% of one core on the owner's desktop; the number varies between recordings (the `loop` self time was 36, 87 and 73 ms). The effect should matter more on phones.
**Tasks:**
- [ ] Run `fishMotion` only while a school exists and the goblin ticks only during fights.
- [ ] Pause timers while `document.hidden`; slow down or make event-driven the 90 and 150 ms intervals (gain-feed `check`, farm water `watch`, goblin death `clean`).
- [ ] Measure before and after with `CPU: 4x slowdown` to approximate a phone.

**Done when:** the loops are idle when their screen is not shown, the suite passes, and the 4x-slowdown recording shows less busy time.

### G4 — Save hardening, same format   `[ ]`
**Why (READ):** `save()` serialises the whole state at about 75 call sites and every 10 s; write errors are swallowed by `catch(e){}`, so a full or blocked storage fails silently and the player thinks progress was saved; slot 1 is written twice (`tinyacre-save-slot-1` and the legacy `tinyacre-save`); `localStorage` is easily cleared by the browser.
**Tasks:**
- [ ] Show a visible warning when `localStorage.setItem` fails.
- [ ] Add export and import of a save file.
- [ ] Coalesce bursts of `save()` into one write.
- [ ] A `saveVersion` field only together with a migration for old saves, plus a fixture of an old save in `tests/` that must load.
- [ ] The double write of slot 1: **ask the owner first**.

**Done when:** a failed write is visible to the player, an exported save re-imports identically, and old saves still load.

### G5 — Performance regression test   `[ ]`
Add a Playwright case in `tests/` that loads a synthetic save, stays on the Farm tab for 10 s and records numbers (number of `render` calls, long tasks, style recalculations). Store the baseline in `tests/README.md`. This also covers part of the "differential trace" prerequisite of step 3.3. **Done when:** a future change that brings back an infinite animation or a hot loop makes the case fail or print a clearly worse number.

### G6 — Step 3.3: nested wrappers into ordered hook lists   `[ ]`
`render` is wrapped 14 times and `foeDown` 11 times by stacked patches. This helps maintenance, not speed, and it is the riskiest goal because it touches combat, so it comes **last** and only after G5. Follow `HANDOFF.md` for the exact plan. Farming and barn logic is untested (`HANDOFF.md` section 6): add tests before changing it.

### G7 — Housekeeping   `[ ]`
Small, independent, low risk. Ask the owner before editing `AGENTS.md` (it is authoritative).
- [ ] Confirm `.gitignore` contains `.env` (there is no `.env` today; this is a cheap precaution).
- [ ] Add a GitHub Actions workflow that runs `sync_src.py --check` and the test suite on every Pull Request (free for public repositories). Feasibility with Playwright in CI is not verified: design it and test it on a branch.
- [ ] In `AGENTS.md` replace the fixed "29 cases" by "all cases must pass" and fix the title "RGP-GAME" to "RPG-GAME".
- [ ] Add a repository description and topics, and review or close the open Pull Requests.
- [ ] Test the game on a real phone (touch, button size, performance).

## Evidence (all MEASURED unless marked)
Method: owner's Chrome on Windows, DevTools > Performance, Farm tab idle for 10 s, 12 ripe corn plots, file opened from disk. Values are self time in ms per recording; "busy" excludes the profiler's own overhead. "n/v" means the row was not among the visible top rows. Recordings vary by tens of ms, so treat differences under about 20% as noise. One recording per condition.

| Condition | Recalc style | Layerize | Pre-paint | Paint | Commit | Busy |
|---|---|---|---|---|---|---|
| Baseline | 171 | 132 | 71 | 112 | 66 | ~816 |
| All animations and transitions off | 3.6 | 5.8 | 4.6 | n/v | 18 | ~235 |
| `#grid` animations off | 32 | 122 | 18 | 98 | 25 | ~498 |
| `#grid` + `#v4wx` + `#wf-layer` off | 3.1 | 5.9 | 4.3 | n/v | 17.6 | ~228 |
| `#v4wx` only off | 150 | 7.9 | 73 | n/v | 29 | ~614 |
| `.plot.ripe` only off | 33 | 123 | 16.8 | 98.5 | 28.5 | ~511 |
| `#v4wx` off + `will-change` on ripe | 134 | 7.0 | 67 | 2.4 | 32 | ~495 |
| `#v4wx` off + ripe hop limited to 3 (the G1 change) | 3.6 | 5.0 | 4.5 | n/v | 20 | ~290 |

What this shows:
- The 250 ms `render()` is not the main cost: `render` itself was about 10 ms per 10 s, and with all animations off Layerize stayed at about 6 ms while `render()` kept running.
- Layerize and Paint come from the weather shimmer; Recalculate style and Pre-paint come from the ripe hop.
- The last row was recorded after the hop had finished, so it measures the steady idle state. The first seconds after a plot ripens cost what the baseline did.
- The animations in `#wf-layer` (water effects) are one-shot (`forwards`) and were not a measured cause.

READ only (code reading, line numbers of 2026-11-27 will drift, search by name): 15 never-cleared `setInterval`, 4 permanent `requestAnimationFrame` loops (`loop` about line 1675, `fishMotion` 2260, goblin `tick` 7027 and 7527), 15 `MutationObserver`s, 133 `@keyframes` and 59 `infinite` animations in total, the icon-autofit script limited to `data:image/` (about line 6878), and the save behaviour described in G4.

## How to measure (same method every time)
1. Open `Project X.html` in Chrome from disk, press Start, then Continue, and open the **Farm** tab with the same save. Do not touch the page.
2. F12 > **Performance**: press Record, wait 10 s, press Stop.
3. Open **Bottom-up**, sort by **Self time** (descending) and read the top rows. Subtract "Profiling overhead" to get busy time.
4. To test an idea without editing the game, paste a style rule in the **Console** (reload with F5 to undo), for example:
   `document.head.appendChild(Object.assign(document.createElement('style'),{textContent:'#v4wx::before{animation:none!important}'}))`
5. For a phone-like run set **CPU: 4x slowdown** in the Performance settings.
6. Compare only recordings made the same way, on the same screen and save. Say how many recordings you made.
