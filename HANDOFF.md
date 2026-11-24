# HANDOFF — where the project stands and how to continue

*Last updated: 2026-11-24. Updated after implementing combat death-render guard step 3.2.*
*`AGENTS.md` stays authoritative. This file is the **status log**: what is done, what is left, and the practical know-how. **Update it at the end of every work session** (commit hashes, test results, decisions).*

## 0. Read this first
1. Read `AGENTS.md`. Then read this file. Then check the current branch head before changing anything.
2. `Project X.html` (repo root, `main`) is the canonical game and the only thing the owner plays. Everything else is support material.
3. Report only tests you actually ran. If something could not be tested, say so (see section 6 for what was never tested).

## 1. The owner and how to work with them
- GitHub user `yusssfeee`. **Replies must be in Arabic.** Not a programmer: works from screenshots, runs commands you give them. Prefers one clear step at a time, with the expected output stated, and wants you to verify claims instead of guessing.
- Windows PC, PowerShell, Chrome. Local clone: `%USERPROFILE%\Downloads\rpg-split\RPG-GAME`.
  **Start every command block with `cd $HOME\Downloads\rpg-split\RPG-GAME`** — the terminal often opens in the user's home folder, which caused repeated "not a git repository" errors.
- A separate loose copy `%USERPROFILE%\Downloads\Project X.html` exists outside git. If the owner plays from it, run the same patch script on it too.
- Git on Windows warns `LF will be replaced by CRLF`: harmless. To compare a built file with `Project X.html`, normalise CRLF (command in section 9).
- Patch scripts create `*.bak` files. **Never `git add` them**; add files by explicit path. Also never add `check.html`, `apply_*.py` at the repo root, or the owner's save backups.
- The owner's game saves (`localStorage`) are personal data. Do not commit them. Test fixtures must be synthetic.

## 2. How changes get into the repo (important: AI limits)
- The AI sandbox has **no internet**. GitHub is reached only through the GitHub MCP tool: it can read files, read commits, and open a "create pull request" form that the **owner must submit**. It cannot push `Project X.html` (50 MB) or large source files.
- Working pattern that worked every time:
  1. Reproduce the problem in a headless browser (section 6). 2. Find the root cause in the code. 3. Write a tiny Python patch script (see `tools/patches/`) that replaces one exact string, refuses unless it matches exactly once, makes a `.bak`, and is idempotent. 4. Test the patched file on a copy. 5. The owner runs the script locally, checks `git diff --stat` (expect `1 insertion, 1 deletion`), commits, pushes a branch. 6. The AI verifies the commit on GitHub (`get_commit`). 7. PR is created and merged on the web. 8. The same fix is applied to `src/` on `modular-split` so the split stays byte-identical.
- Pitfall found the hard way: if the new text contains the old text, an idempotence check on the old text applies the fix twice. Check for the **new** text first.

## 3. Repository state
| Branch | Head | What it is |
|---|---|---|
| `main` | game last changed at `2eb31f4` | Single-file game + 3 fixes (below); later commits on `main` are docs/tests. Baseline before this work: `2252c12`. |
| `modular-split` | `f94f387` | Same game, byte-identical to `main`, plus a lossless `src/` split and `tools/`. **Not merged into `main`** (decision pending, section 7). |

Merged fixes on `main`: PR #5 (`5338430`, item fallback) · PR #6 (`986574f`, burn kill redraw) · PR #7 (`e1ffa72`, goblin ghost frame).
`modular-split` commits: phase 1 `f618fe3` · phase 2 `0f724e1` · fixes applied to `src/` `5f2c601` and `f94f387`.

**Invariant on `modular-split`:** `python tools/build.py . check.html` must equal `Project X.html` (after CRLF normalisation). Check it after every change.

## 4. `src/` layout (branch `modular-split` only)
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
- Detect leftovers by counting **visible** `<img>`/sprites in `#stg` after repeated spawn-and-kill rounds (also with a 300 ms gap); some monsters draw with CSS sprites, so element counts cannot see a pixel-level ghost — take screenshots.
- **Regression suite:** `tests/` (read `tests/README.md`). `node tests/run.js` runs 21 headless cases in about 3 minutes (needs Playwright). It was validated on the older builds: it fails on each bug it guards and passes on current `main`.
- **Latest local run:** 21/21 passed on `Project X.html` after step 3.2, including `death-hold.shared-render-guard`.

**Never tested:** a full manual playthrough of farming, mining, fishing, forge, alchemy, trade; Goblin Chief/Shaman/Spear/King/Alchemist were only checked by element counts; the mining screen could not be driven by automation (no buttons found), so whether the older mining-ambush layers in `013` are dead code is **unverified**.

## 7. Status and what remains
**Done**
- [x] Analysis of dependencies, load order, layering, save format.
- [x] Phase 1 — main script split into 27 files, rebuild byte-identical (`f618fe3`).
- [x] Phase 2 — `rpg-v4` and sprite pack fragmented; goblin atlases extracted to WebP; goblin script 1.24 MB → 9 KB (`0f724e1`).
- [x] Three gameplay fixes on `main`, mirrored in `src/`.

**Pending decision (ask the owner)**
- [ ] Merge `modular-split` into `main`? It adds `src/`, `tools/`, ~40 MB (images stored twice) and does not change the game. If `src/` becomes the place to edit, `Project X.html` must be rebuilt from it each time; AGENTS.md currently names `Project X.html` as the only canonical source, so keep that rule until the owner decides.

**Next (Phase 3 — changes real code; show each step to the owner before doing it)**
- [x] **3.1 Safety net, no game change:** `tests/` (20 cases, synthetic saves): boot with each class's saved gear, burn/click kill redraw, ghost frames for 8 foe kinds at two respawn speeds, reload after a fight. **Still to add before refactoring a system:** attack/hurt animation traces per goblin kind, dungeon progression, mining, and a differential trace (DOM/state at fixed times) to compare before/after.
- [x] **3.2** `window.__RPG_DEATH_RENDER_GUARD` now shares the render hold across the atlas, standard Goblin, Shaman, and Spear death controllers. Per-controller death cleanup and animation drawing remain local. Added `death-hold.shared-render-guard`; 21/21 regression cases passed locally.
- [ ] **3.3** Turn the remaining nested wrappers (`foeDown`, `startFight`, `enemyAttack`, ...) into explicit ordered hook lists.
- [ ] Verify whether the `013` mining-ambush layers (`tapTile` / `mineAmbushActive`) are superseded by `020`; remove only with evidence.
- [ ] `013-rpg-game-enhancements.js` (52 KB, no banners) is still unsplit.
- [ ] Keep this file current.

## 8. Rules for the next AI
- Smallest safe, reversible change. Analyse before changing structure. Ask before destructive changes to saves, assets or structure. Do not invent: if a file or access is missing, say exactly what and stop.
- Before step 3.3, add the still-missing attack/hurt animation traces, dungeon progression, mining, and differential DOM/state trace tests noted in step 3.1.
- Preserve behaviour and save compatibility. Do not rewrite from scratch.
- Verify everything you claim (rebuild, hash/byte comparison, headless run). Verify on GitHub after the owner pushes.
- Never ask the owner to run multi-step commands without stating the expected output of each step and where to stop and send a screenshot.

## 9. Command cheat sheet (PowerShell, from the repo folder)
```powershell
cd $HOME\Downloads\rpg-split\RPG-GAME
git checkout modular-split ; git fetch origin ; git merge origin/main -m "Merge origin/main into modular-split"
python tools/build.py . check.html
python -c "a=open('Project X.html','rb').read().replace(b'\r\n',b'\n');b=open('check.html','rb').read().replace(b'\r\n',b'\n');print(a==b)"   # must print True
git add <explicit paths> ; git status      # review before committing; never add .bak / check.html
```
