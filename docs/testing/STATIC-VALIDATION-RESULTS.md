# Static Validation Results — Phase 0

**Source file:** `Project X.html`  
**Source ref:** `main`  
**Verified Git blob SHA:** `5ade1cb528871ad410228697e21d317f80782160`  
**File size:** 50,062,852 bytes  
**Validation date:** 2026-11-21  
**Scope:** non-mutating checks only

## 1. Source identity

The local inspection copy was verified against Git's blob-hash format:

```
5ade1cb528871ad410228697e21d317f80782160
```

This matches the blob SHA returned by GitHub for `Project X.html` on `main`. The local copy therefore corresponds byte-for-byte to the source file being audited.

## 2. JavaScript syntax check

The HTML contains 52 non-empty inline script blocks.

Each script block was extracted separately and passed through Node.js `v22.16.0` syntax validation using `node --check`.

| Check | Result |
|---|---:|
| Inline script blocks found | 52 |
| Non-empty script blocks checked | 52 |
| Script syntax errors | 0 |

This establishes that each extracted block is syntactically parseable as JavaScript in isolation. It does **not** prove that the combined page runs correctly in a browser, that globals resolve, or that runtime behavior is correct.

## 2A. AST-backed static analysis

The same pinned source was parsed with the TypeScript compiler API `5.8.3` using JavaScript ScriptKind in Node.js `v22.16.0`.

| Check | Result |
|---|---:|
| Non-empty inline script blocks parsed | 52 |
| Parser diagnostics | 0 |
| Direct `S.property` AST references | 963 |
| Unique static state property names | 51 |
| Simple alias/destructuring binding sites rooted at `S` | 16 |
| Direct `S.property` references passed as call arguments | 31 |
| Callable identifier-function assignments | 100 across 44 targets |
| Same-script capture/use pairings | 86 |
| `setTimeout` call sites | 111 |
| `setInterval` call sites | 15 |
| `requestAnimationFrame` call sites | 34 |
| `clearInterval` call sites | 0 |

These are syntax-level counts, not proof of semantic ownership, full alias propagation, correct runtime predecessor resolution, or timer disposal. Detailed classifications, per-field counts and limitations are in `../architecture/AST-BACKED-STATIC-ANALYSIS.md`.

## 2B. Fresh non-browser checks

These checks were run directly against the mounted local copy of the pinned file on 2026-11-21. They do not execute the page as a browser.

| Check | Result |
|---|---:|
| Git blob SHA recomputed locally | Matches `5ade1cb528871ad410228697e21d317f80782160` |
| File size | 50,062,852 bytes |
| Inline script tags | 52 total; 52 non-empty |
| Node.js `vm.Script` syntax compilation | 52/52; 0 failures |
| TypeScript parser diagnostics | 0 |
| External `<script src>` attributes | 0 |
| Relative `src`/`href` references found by the markup scan | 0 |
| Static markup IDs found | 30 |
| Duplicate static IDs found | 0 |

The markup attribute scan removes inline script and style contents first, then uses regular expressions. It is a lightweight structural check, not a standards-compliant HTML validator and it does not inspect IDs dynamically created by JavaScript.

## 2C. Pure-helper characterization

The existing `fmt` helper at line 3516 (script block 8, lines 2685–4772) was extracted exactly and evaluated in isolation using Node.js `vm`. It does not call the game, access the DOM or modify the source.

| Input | Expected | Actual | Result |
|---:|---|---|---|
| `0` | `0s` | `0s` | PASS |
| `1.4` | `1s` | `1s` | PASS |
| `59.6` | `1m 00s` | `1m 00s` | PASS |
| `60` | `1m 00s` | `1m 00s` | PASS |
| `61` | `1m 01s` | `1m 01s` | PASS |
| `125.2` | `2m 05s` | `2m 05s` | PASS |
| `-4` | `0s` | `0s` | PASS |

**Result:** 7/7 helper-only cases passed. The six uses of this formatter binding are at lines 3534, 3539, 3932, 4091, 4137 and 4174. A raw whole-file `fmt(` search returns ten textual matches because it also sees unrelated formatter scopes and a locally shadowing parameter; see `../architecture/FIRST-EXTRACTION-CANDIDATE.md`.

## 3. Browser startup attempt

A headless Chromium startup test was attempted against the exact source copy. Navigation was blocked by the execution environment with:

```
net::ERR_BLOCKED_BY_ADMINISTRATOR
```

The restriction occurred for both a local `file://` navigation and a temporary loopback HTTP URL. A fresh Browser read attempt in this session was explicitly rejected by the browser host security gate because the only open tab was `https://chatgpt.com`. The rejection stated that the agent must not try to reach the same content through an alternate browser surface, raw CDP, indirect execution, or another workaround. No workaround was attempted and no game URL was navigated to. As a result:

- No browser startup result is claimed.
- The system Chromium executable was present locally, but was not launched as an alternate route after the browser host security rejection.
- No console-error baseline was collected.
- No screenshots or gameplay assertions were produced.
- No save data was read or modified by a browser test.

This is an environment limitation, not evidence that the game itself fails to load.

## 4. What remains unverified

The following still require a browser environment in which the game can actually be opened:

1. Startup and intro flow.
2. Console and uncaught runtime errors.
3. Navigation across all primary tabs.
4. Save/reload equality and migration of legacy data.
5. Switching among all five campaign slots.
6. Representative farming, barn, crafting, fishing, mining, trading, and combat workflows.
7. Animation, audio, resize, visibility-change, and page-hide lifecycle behavior.

## 5. Phase 0 status

- [x] Confirmed the audited local source matches the GitHub `main` blob.
- [x] Parsed all 52 inline JavaScript blocks with Node.js syntax checking.
- [x] AST-backed syntax scan completed with zero diagnostics for all 52 non-empty inline script blocks.
- [x] Fresh Node.js syntax compilation passed for all 52 inline blocks.
- [x] Lightweight static markup scan found no external scripts, no relative `src`/`href` links and no duplicate static IDs.
- [x] Isolated `fmt` helper characterization passed 7/7 cases.
- [ ] Browser startup and console baseline.
- [ ] Gameplay regression run.
- [ ] Save-slot and persistence fixtures.
- [ ] Complete shared-state write ownership map.
- [ ] Complete wrapper and timer disposal ledgers.

**Conclusion:** static syntax validation passed. Phase 0 remains in progress; do not begin runtime extraction based on this result alone.
