# Phase 0 — Exit Checklist and Audit Handoff

Reference source: `Project X.html`, `main`, commit `2252c12b57e81a3fe773e3c8b5a335f63a8c6097`.

Working branch: `phase-0/baseline-audit`.

## What is verified so far

- [x] Baseline source is identified and pinned to a commit.
- [x] Isolated audit branch exists; `main` remains unchanged.
- [x] High-level source/script inventory exists.
- [x] Feature extension blocks and approximate line ranges are mapped.
- [x] Main state object `S and five-slot localStorage save contract are identified.
- [x] Legacy slot-1 compatibility key `tinyacre-save` is identified.
- [x] Save/load/hydration and mining save synchronization touchpoints are documented.
- [x] Cross-feature shared-state and function-wrapper risks are documented.
- [x] Direct textual inventory of 51 `S.property` names and heuristic access classifications is documented.
- [x] Major global wrapper assignment sites are catalogued in source order.
- [x] Major recurring interval and RAF sites are catalogued with observed cleanup notes.
- [x] Static JavaScript syntax validation passed for all 52 non-empty inline script blocks.
- [x] Local audit source was verified against the GitHub blob SHA for `Project X.html` on `main`.
- [x] Proposed modularization roadmap and regression checklist exist.
- [x] Documentation-only diff has been confirmed against `main`.

## New detailed audit documents

- [Detailed shared-state ledger](DETAILED-SHARED-STATE-LEDGER.md) — 51 direct property tokens; heuristic read/write counts and high-coupling risk notes.
- [Function wrapper and runtime lifecycle ledger](FUNCTION-WRAPPER-AND-RUNTIME-LIFECYCLE-LEDGER.md) — major wrapper reassignment order, recurring timers/RAF, and cleanup observations.
- [State access, wrapper and lifecycle audit](STATE-ACCESS-WRAPPER-AND-LIFECYCLE-AUDIT.md) — combined high-level findings.
- [Static validation results](../testing/STATIC-VALIDATION-RESULTS.md) — source identity, syntax check and browser-environment limitation.

## Not yet verified — do not mark complete

- [ ] Semantic, AST-backed read/write ownership for every field in `S`, including aliases, nested mutations, dynamic keys and helper side effects.
- [ ] Complete wrapper predecessor/delegation graph, including direct replacements and skipped delegation.
- [ ] Exact runtime timer/RAF owner and disposal guarantees for every exit path.
- [ ] Browser execution of the legacy baseline. The available headless browser attempt was blocked by the execution environment (`ERR_BLOCKED_BY_ADMINISTRATOR`).
- [ ] Console-error baseline from a real browser session.
- [ ] Representative save fixtures for all five slots and legacy slot-1 import.
- [ ] Save -> reload -> compare state checks using disposable test data.
- [ ] Screenshots or recordings of key screens and gameplay flows.
- [ ] Approval of the first extraction candidate.

## Important measurement notes

Static counts are dependent on the scan method. The 51-property ledger counts direct `S.<identifier>` tokens and classifies only simple textual patterns. It is not a full JavaScript data-flow analysis: aliasing, dynamic property access, nested mutation and helper side effects need AST/manual tracing. Similarly, counting `addEventListener` text matches is not the same as counting runtime listener registrations, and counting `<img>` tags is not the same as counting embedded image data URIs.

The syntax check proves that each extracted inline script block parses as JavaScript in isolation. It does not prove that all blocks execute together successfully or that browser/gameplay behavior is correct.

## Safe next step

Finish semantic state ownership and exact wrapper/timer lifecycle verification, then run the browser regression checklist against the frozen baseline using disposable save data. Until browser and persistence checks are complete, Phase 0 remains in progress and no gameplay source should be extracted or modified.

## Change-control guarantee

This branch is an audit/documentation branch. Keep all commits here limited to documentation until the exit gates above are satisfied. The original `Project X.html` and `main` remain untouched.
