# Phase 0 — Exit Checklist and Audit Handoff

Reference source: `Project X.html`, `main`, commit `2252c12b57e81a3fe773e3c8b5a335f63a8c6097`.

Working branch: `phase-0/baseline-audit`.

**AI continuation:** read [docs/AI-HANDOFF.md](../AI-HANDOFF.md) first when resuming this project in another assistant/session.

## What is verified so far

- [x] Baseline source is identified and pinned to a commit.
- [x] Isolated audit branch exists; `main` remains unchanged.
- [x] High-level source/script inventory exists.
- [x] Feature extension blocks and approximate line ranges are mapped.
- [x] Main state object `S` and five-slot localStorage save contract are identified.
- [x] Legacy slot-1 compatibility key `tinyacre-save` is identified.
- [x] Save/load/hydration and mining save synchronization touchpoints are documented.
- [x] Cross-feature shared-state and function-wrapper risks are documented.
- [x] Direct textual inventory of 51 `S.property` names and heuristic access classifications is documented.
- [x] Major global wrapper assignment sites are catalogued in source order.
- [x] Selected identifier-function predecessor captures are cross-checked with AST syntax: 100 callable assignments across 44 targets; 86 same-script capture/use pairings.
- [x] Major recurring interval and RAF sites are catalogued with observed cleanup notes.
- [x] AST timer callsite counts documented: 15 `setInterval`, 34 `requestAnimationFrame`, 111 `setTimeout`; zero `clearInterval` call sites found.
- [x] Static JavaScript syntax validation passed for all 52 non-empty inline script blocks.
- [x] Local audit source was verified against the GitHub blob SHA for `Project X.html` on `main`.
- [x] Proposed modularization roadmap and regression checklist exist.
- [x] First low-risk pure-helper extraction candidate identified and characterized with isolated tests.
- [x] Documentation-only diff has been confirmed against `main`.

## Detailed audit documents

- [Detailed shared-state ledger](DETAILED-SHARED-STATE-LEDGER.md) — historical heuristic read/write counts and high-coupling risk notes.
- [Semantic state/alias write trace](SEMANTIC-STATE-ALIAS-WRITE-TRACE.md) — corrected AST totals, alias-backed writes, state replacement/save lifecycle, and manual function replacement findings.
- [AST-backed static analysis](AST-BACKED-STATIC-ANALYSIS.md) — syntax-level field references, selected wrapper predecessor captures, timer API call counts and limitations.
- [Function wrapper and runtime lifecycle ledger](FUNCTION-WRAPPER-AND-RUNTIME-LIFECYCLE-LEDGER.md) — major wrapper reassignment order, recurring timers/RAF, and cleanup observations.
- [State access, wrapper and lifecycle audit](STATE-ACCESS-WRAPPER-AND-LIFECYCLE-AUDIT.md) — combined high-level findings.
- [First extraction candidate](FIRST-EXTRACTION-CANDIDATE.md) — pure duration formatter, proposed as the first isolated utility to extract after browser baseline gates.
- [Static validation results](../testing/STATIC-VALIDATION-RESULTS.md) — source identity, syntax checks, isolated helper characterization and browser-environment limitation.
- [AI handoff](../AI-HANDOFF.md) — complete continuation instructions, completed work, blockers and next steps for another assistant.

## Not yet verified — do not mark complete

- [ ] Finish whole-program semantic ownership and data-flow tracing for every `S` field, including callback parameters, helper side effects, aliases crossing script-block boundaries, dynamic/computed keys and all references passed to helpers. The current tracker follows simple same-script aliases only.
- [ ] Complete runtime wrapper predecessor/delegation graph for all paired wrappers, object-property assignments and caller return-value expectations. The 14 previously unpaired identifier assignments have been manually classified.
- [ ] Exact runtime timer/RAF owner and disposal guarantees for every exit path, including repeated tab/slot navigation and page visibility changes.
- [ ] Browser execution of the legacy baseline. Prior headless Chromium attempts were blocked with `ERR_BLOCKED_BY_ADMINISTRATOR`; the latest connected Browser read was explicitly denied by the browser host security gate on the current ChatGPT tab. No game URL was opened and no workaround was attempted.
- [ ] Console-error baseline from a real browser session.
- [ ] Representative save fixtures for all five slots and legacy slot-1 import.
- [ ] Save -> reload -> compare state checks using disposable test data.
- [ ] Screenshots or recordings of key screens and gameplay flows.
- [ ] Approval to implement the first extraction in a runtime-code commit.

## Important measurement notes

Static counts are dependent on the scan method. The 51-property ledger began as a raw-text heuristic and may count comments/strings. The new AST report records code-syntax references (963 nodes across 51 fields) and classifications for immediate syntax contexts, but it is not a full JavaScript data-flow analysis: alias propagation, dynamic property access, nested mutation through arbitrary aliases and helper side effects still need manual tracing. Similarly, counting `addEventListener` text matches is not the same as counting runtime listener registrations, and counting `<img>` tags is not the same as counting embedded image data URIs.

The syntax check proves that each extracted inline script block parses as JavaScript in isolation. It does not prove that all blocks execute together successfully or that browser/gameplay behavior is correct. The isolated formatter tests characterize the existing helper's outputs but do not replace browser regression.

## Safe next step

Continue from the completed simple-alias and manual-unpaired-assignment trace: finish callback/helper data-flow review, then run the browser regression checklist against the frozen baseline using a dedicated disposable browser profile and save data. Verify the high-risk legacy-trade `tradeTick` replacement as a specific scenario. The new AST inventory narrows the static-analysis gaps but does not close these semantic/runtime gates. Only after those gates pass should the pure duration formatter be extracted in a separate reviewable code commit. Until then, Phase 0 remains in progress and no gameplay source should be extracted or modified.

## Change-control guarantee

This branch is an audit/documentation branch. Keep all commits here limited to documentation until the exit gates above are satisfied. The original `Project X.html` and `main` remain untouched.
