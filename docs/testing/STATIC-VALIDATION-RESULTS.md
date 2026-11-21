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

Several launch paths were tested against the exact pinned local copy. The final attempt used a regular Chromium window running in a temporary Xvfb virtual display and a disposable user-data directory. This avoided the unavailable physical X display and did not use the user's normal browser profile or save data.

| Item | Result |
|---|---|
| Browser | Chromium 144.0.7559.96 (Debian GNU/Linux 13) |
| Display | Xvfb virtual display `:98`, 1365 × 900 |
| Profile | Fresh disposable directory under `/tmp/px-game-xvfb-profile` |
| URL attempted | `file:///mnt/data/files/Project%20X.html` |
| Browser process | Started and displayed the target URL |
| Document result | **BLOCKED before game load** |

The visible browser page showed the organization policy message:

> “file” links are blocked — Your organization doesn’t allow you to view this site

This is a browser/organization access restriction. The game HTML and its JavaScript did not load. No game startup, gameplay, or application-console conclusion can be drawn from this attempt.

Other attempts:
- A regular Chromium GUI launch on the container's advertised `:0` display failed because no X server was available there.
- Headless Chromium attempts with disposable profiles did not return a DOM dump before the execution timeout. Their logs contained D-Bus, EGL/graphics and Mojo/zygote environment diagnostics; no page DOM or game JavaScript console was obtained.
- Earlier attempts against local `file://` and loopback HTTP had returned `net::ERR_BLOCKED_BY_ADMINISTRATOR`.

No route was used to bypass the organization policy. No proxy, file re-hosting, raw CDP, injected script, or alternate browser surface was attempted after the policy page was observed.

See [BROWSER-BASELINE-ATTEMPT.md](BROWSER-BASELINE-ATTEMPT.md) for the complete attempt record and safe continuation instructions.

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
- [x] Corrected AST same-script alias/write trace and manual classification of the 14 unpaired identifier-function assignments are documented; whole-program semantic ownership remains open.
- [ ] Complete runtime wrapper/delegation and timer disposal verification.

**Conclusion:** static syntax and isolated helper characterization passed. Chromium launched, but the organization's file-link policy blocked the game before it loaded. Phase 0 remains in progress; do not begin runtime extraction based on this result alone.
