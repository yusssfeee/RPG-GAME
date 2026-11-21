# AI Handoff — Project X Modularization

> **Read this file first when another AI assistant resumes this repository.** It is the current handoff record for the incremental migration project. Re-check live GitHub refs and rerun the relevant tests before relying on any status below.

**Last handoff update:** 2026-11-21  
**Repository:** `yusssfeee/RGP-GAME`  
**Working audit branch:** `phase-0/baseline-audit`  
**Reference branch:** `main`  
**Reference source:** `Project X.html`

---

## 1. Mission and intended outcome

The goal is to migrate the existing browser RPG into a maintainable, full modular architecture **incrementally and without rewriting the game from scratch**. Preserve existing gameplay, progression, visuals, controls, save compatibility and balance during the migration.

The accepted direction is:

- **Architecture target:** full modular structure.
- **Migration priority:** modular boundaries and gradual extraction.
- **Tooling constraint:** prefer free/local/open-source tooling and static hosting; do not introduce paid services as a requirement.
- **Migration method:** characterize the legacy behavior, isolate one responsibility at a time, retain compatibility adapters, verify, then proceed.
- **Legacy game:** remains the frozen reference until the modular version has passed the same regression checks.

The detailed architecture plan is in [MODULARIZATION-ROADMAP.md](architecture/MODULARIZATION-ROADMAP.md).

## 2. Non-negotiable change-control rules

1. Do not rewrite the game or redesign gameplay as part of the architecture migration.
2. Do not modify `main` or the reference `Project X.html` during Phase 0.
3. Keep Phase 0 commits documentation-only until the browser, persistence, state ownership and lifecycle exit gates have been satisfied.
4. Do not delete old game versions, save data, embedded assets, or compatibility keys as part of this work.
5. Preserve the five campaign slots and the legacy slot-1 compatibility key `tinyacre-save`.
6. Preserve the current script execution order and classic-script scope while early extraction work is underway. Do not convert everything to ES modules in one step.
7. Do not move combat, inventory/equipment, persistence, `S`, `render`, or timer controllers as the first extraction.
8. Keep each later code extraction isolated in its own reviewable commit with a clear rollback path.
9. Never report a browser, gameplay, save/reload, console, or visual test as PASS unless it was actually executed and its evidence was recorded.
10. If a browser host security policy blocks an action, respect the refusal. Do not bypass it with CDP, a second browser, shell-driven browser automation, or an indirect route.

## 3. Frozen baseline identity

The audit source was checked against Git's blob-hash format.

| Item | Pinned value |
|---|---|
| Baseline commit on `main` | `2252c12b57e81a3fe773e3c8b5a335f63a8c6097` |
| `Project X.html` Git blob SHA | `5ade1cb528871ad410228697e21d317f80782160` |
| File size | 50,062,852 bytes |
| Non-empty inline script blocks | 52 |
| Style blocks in prior source inventory | 41 |
| Working audit branch | `phase-0/baseline-audit` |

The local copy used for the latest checks was `/mnt/data/files/Project X.html`. Its Git blob SHA was recomputed and matched the pinned blob exactly.

**Always re-check the current `main` head before beginning new implementation work.** If it has moved, decide whether to pin a new baseline or continue against the historical source; do not silently mix source versions.

## 4. Current repository state

The working branch is `phase-0/baseline-audit`. It is an audit/documentation branch. A verified compare during this handoff showed the branch ahead of `main`, not behind, with every changed path under `docs/` and no runtime/game source files changed. The exact ahead count changes as this handoff and checklist are updated, so obtain a fresh comparison before the next implementation step. Do not merge this branch into `main` automatically.

Useful branch link: https://github.com/yusssfeee/RGP-GAME/tree/phase-0/baseline-audit

## 5. Work completed so far

### 5.1 Baseline and source map

The original source was pinned, its script blocks and feature sections inventoried, and the storage/persistence entry points documented. The main shared state object is `S`; the game stores five campaign slots in localStorage and retains a legacy slot-1 mirror/fallback under `tinyacre-save`.

### 5.2 Shared-state and dependency audit

A first raw-text inventory found 51 direct `S.property` names. That earlier report is explicitly heuristic. An additional AST pass now records direct code-syntax references plus a limited same-script local alias trace; the new detailed report is `architecture/SEMANTIC-STATE-ALIAS-WRITE-TRACE.md`.

Key observed high-coupling areas include `inv`, `items`, `eq`, `coins`, `tab`, `hp`, `up`, `barn`, `plots`, `wx`, `wz`, `mf`, `fz`, `dg`, `mineExp`, `story`, `classXP`, and `combatTraining`. The corrected syntax inventory now has 1,209 direct-plus-tracked-alias references across the 51 fields (822 reads and 387 write/update operations). It found 49 simple same-script alias/destructuring binding sites, 246 alias-rooted references and 69 writes via those tracked aliases. This is not full whole-program data flow.

Do not assign exclusive module ownership based on access frequency. The fields remain shared until full write/alias/helper/event/timer tracing has been completed.

### 5.3 Function wrapper and lifecycle inventory

Many functions are extended by later script blocks that capture the current function and then replace it. The order matters. The audit records major chains for `render`, `foeDown`, `playerDown`, `flee`, `startFight`, `enemyAttack`, `catchFish`, `upd`, `save`, `addXp`, `fx`, `combatTick`, `strike`, and several `VIEWS.*` entries.

A new AST scan found 100 callable assignments to identifier-named functions across 44 target names. In 86 assignments, the simple matcher found a preceding same-script binding and a matching invocation. Fourteen assignments were unpaired by that matcher and are listed for manual review in the AST report. An unpaired assignment is **not automatically a direct replacement**; it may be a new definition or a pattern the matcher cannot recognize. For the pinned source, a manual review has now classified all 14 listed identifier assignments; see the semantic alias/wrapper trace. A high-priority potential behavior gap was found: `tradeTick` at line 2660 replaces the old `S.trade` route tick from line 1380 with a tick for `S.cv.runs`, without delegation. Treat as a regression scenario to confirm in the browser, not as a proven bug.

Timer API scan counts: 111 `setTimeout`, 15 `setInterval`, 34 `requestAnimationFrame`, one `requestIdleCallback`, 26 `clearTimeout`, zero `clearInterval`, four `cancelAnimationFrame`, and zero `cancelIdleCallback` calls. These are syntax call-site counts, not proof of the runtime owner or cleanup behavior.

### 5.4 First extraction candidate

The proposed first candidate is the pure duration formatter `fmt` around line 3516 in script block 8 (source lines 2685–4772). It uses only built-in `Math` and `String` methods and has six binding-specific uses at lines 3534, 3539, 3932, 4091, 4137 and 4174.

The exact helper was evaluated separately in Node.js using a VM sandbox. Seven characterization inputs passed. This is **not** a browser integration test, and extraction has **not** been implemented or approved for the runtime source.

## 6. Latest verification evidence (2026-11-21)

All checks in this section were run against the exact pinned source copy and were non-mutating.

| Check | Result | What it proves |
|---|---:|---|
| Recomputed Git blob SHA | Exact match | Local source equals the pinned Git blob |
| TypeScript parser (5.8.3) | 52 blocks, 0 parser diagnostics | Script blocks parse independently |
| Node.js `vm.Script` compilation | 52/52, 0 failures | All extracted blocks compile as standalone script source |
| Lightweight static markup scan | 30 IDs, 0 duplicate static IDs | No duplicates found by this limited markup scan |
| External script tags | 0 | No `<script src>` attributes found |
| Relative `src`/`href` scan | 0 | No relative references found by this simple scan |
| Isolated `fmt` characterization | 7/7 PASS | The formatter returns expected output for seven inputs |

Limitations:
- Parsing each inline script separately does not prove the combined page executes in a browser.
- The markup checks use a lightweight regular-expression scan, not a standards-compliant HTML validator. They do not include DOM nodes created dynamically by JavaScript.
- The isolated `fmt` test does not execute its UI call sites.
- No gameplay, audio, animation, persistence, save/reload, or browser-console result is available.

Detailed output and method: [STATIC-VALIDATION-RESULTS.md](testing/STATIC-VALIDATION-RESULTS.md).

## 7. Browser test attempt and blocker

The user asked for the game to be launched and tested. This was attempted, but no game-page browser execution was achieved in this session.

1. A previous headless Chromium attempt against both a local `file://` URL and a temporary loopback HTTP URL was blocked by the execution environment with `net::ERR_BLOCKED_BY_ADMINISTRATOR`. This result is recorded in the static validation report.
2. In the current session, the Browser tab list showed only the current ChatGPT tab.
3. Reading that tab was explicitly rejected by the browser host security gate because its URL was `https://chatgpt.com`. The rejection stated that the agent must not try to reach the same content through another browser surface, raw CDP, indirect execution, or a workaround.
4. No workaround was attempted. No game URL was opened, no browser console was read, and no gameplay actions were carried out.

This is an **environment/tool access blocker**, not evidence that `Project X.html` is broken. Do not change the game to “fix” this blocker.

To continue browser verification, use a supported browser-testing session/mode when available and obey any host restrictions. If browser interaction is still denied, stop and document the blocker; ask the user to provide an approved testing surface or run the test manually and share the console output. Do not claim the game works or fails based on the blocked attempt.

## 8. Phase 0 work still required

Do not close Phase 0 until each relevant item has evidence.

### Static/semantic work
- Finish whole-program semantic read/write ownership for every `S` field, including callback parameters, helper side effects, aliases crossing script-block boundaries, dynamic/computed keys and arbitrary object references passed into helpers. Simple same-script alias paths have been traced, but they are not complete points-to analysis.
- The 14 previously unpaired identifier assignments have now been manually classified; verify their assumptions against browser behavior, and complete return-value/caller review for paired and object-property wrappers.
- Complete the function predecessor/delegation graph, distinguishing wrappers, new definitions and direct replacements. Record whether predecessor calls are conditional, whether return values are preserved, and what runs before/after delegation.
- For all persistent intervals and RAF controllers, record exact owner, handle, start/stop conditions, cleanup, stale-callback protection, state mutations, and save interactions.

### Runtime/persistence work
- Open the baseline in an approved browser context.
- Capture startup console output and baseline screenshots for key screens.
- Test navigation, dialogs, pointer/keyboard inputs, resize and visibility changes.
- Use disposable test data, not the user's only valuable save.
- Build representative fixtures for all five campaign slots and legacy slot-1 import.
- Verify save -> reload -> compare state, slot switching, and active-slot reset behavior.
- Exercise representative farming, barn, crafting, fishing, mining, woodcutting, trade, quests and combat flows.
- Observe timer/RAF cleanup when leaving views, ending minigames, ending combat, switching slots, and hiding/reloading the page.

The checklist is maintained in [PHASE-0-EXIT-CHECKLIST.md](architecture/PHASE-0-EXIT-CHECKLIST.md), and scenarios are in [REGRESSION-BASELINE.md](testing/REGRESSION-BASELINE.md).

## 9. Recommended next-AI sequence

1. Read this handoff, then the modularization roadmap, Phase 0 exit checklist, static validation report, AST report, shared-state ledger, wrapper/lifecycle ledger, persistence maps, and regression baseline.
2. Re-fetch current branch files and compare `phase-0/baseline-audit` with `main`; verify that no runtime source file has entered the audit branch.
3. Continue static analysis by manually reviewing the unpaired function assignments and the highest-risk state fields. Amend reports with exact evidence and keep heuristic vs AST vs runtime observations distinct.
4. Arrange an approved browser testing context. If available, run the frozen baseline with disposable saves and capture console/screenshots and scenario results. If blocked by a host policy, stop; do not bypass it.
5. Test the legacy `S.trade` trip flow and V4 caravan flow separately because the later `tradeTick` assignment replaces the earlier implementation without delegation.
6. Complete persistence fixtures and lifecycle checks before authorizing any source extraction.
7. Only after the Phase 0 gates pass and the user agrees to proceed, create a separate implementation branch based on the documented baseline/audit branch and extract one pure helper. Start with `fmt`; preserve the classic-script loading model initially.
8. Run before/after browser regressions and characterization tests, review the diff, document rollback, and only then propose integration. Never merge on behalf of the user without explicit approval.

## 10. Key documents

| Document | Purpose |
|---|---|
| [Modularization roadmap](architecture/MODULARIZATION-ROADMAP.md) | Target architecture, migration phases, guardrails |
| [Phase 0 exit checklist](architecture/PHASE-0-EXIT-CHECKLIST.md) | What is done and what still blocks extraction |
| [AST-backed analysis](architecture/AST-BACKED-STATIC-ANALYSIS.md) | Syntax-level state references, wrapper and timer call-site audit |
| [Detailed shared-state ledger](architecture/DETAILED-SHARED-STATE-LEDGER.md) | Prior heuristic field inventory and coupling notes |
| [Semantic alias/write trace](architecture/SEMANTIC-STATE-ALIAS-WRITE-TRACE.md) | Corrected AST direct+alias totals, per-field writes, S replacement boundaries, and manual replacement findings |
| [Wrapper/lifecycle ledger](architecture/FUNCTION-WRAPPER-AND-RUNTIME-LIFECYCLE-LEDGER.md) | Wrapper order and persistent timer inventory |
| [First extraction candidate](architecture/FIRST-EXTRACTION-CANDIDATE.md) | `fmt` candidate and isolated characterization |
| [Static validation](testing/STATIC-VALIDATION-RESULTS.md) | Source identity, parser checks and browser blocker |
| [Gameplay regression baseline](testing/REGRESSION-BASELINE.md) | Manual test scenarios and evidence format |

---

**Current status: Phase 0 is still in progress.** Static analysis and isolated helper checks have advanced. The game has not been successfully launched in a browser in this work session. No runtime/game source has been changed, and no code extraction or merge has been performed.
