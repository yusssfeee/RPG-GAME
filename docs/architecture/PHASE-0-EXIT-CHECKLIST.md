# Phase 0 — Exit Checklist and Audit Handoff

Reference source: `Project X.html`, `main`, commit `2252c12b57e81a3fe773e3c8b5a335f63a8c6097`.

Working branch: `phase-0/baseline-audit`.

## What is verified so far

- [x] Baseline source is identified and pinned to a commit.
- [x] Isolated audit branch exists; `main` remains unchanged.
- [x] High-level source/script inventory exists.
- [x] Feature extension blocks and approximate line ranges are mapped.
- [x] Main state object `S` and five-slot localStorage save contract are identified.
- [x] Legacy slot-1 compatibility key `tinyacre-save` is identified.
- [x] Save/load/hydration and mining save synchronization touchpoints are documented.
- [x] Cross-feature shared-state and function-wrapper risks are documented.
- [x] Proposed modularization roadmap and regression checklist exist.
- [x] Documentation-only diff has been confirmed against `main`.

## Not yet verified — do not mark complete

- [ ] Full property-by-property read/write ownership for every field in `S`.
- [ ] Full function-wrapper chain with exact original and replacement order.
- [ ] Exact timer and animation-frame ownership, including disposal behavior.
- [ ] Browser execution of the legacy baseline.
- [ ] Console-error baseline from a real browser session.
- [ ] Representative save fixtures for all five slots and legacy slot-1 import.
- [ ] Save -> reload -> compare state checks using disposable test data.
- [ ] Screenshots or recordings of key screens and gameplay flows.
- [ ] Approval of the first extraction candidate.

## Important measurement notes

Different static scans may report slightly different occurrence counts because their matching rules differ. For example, counting direct `addEventListener` text matches is not the same as counting runtime listener registrations, and counting `<img>` tags is not the same as counting embedded image data URIs. Use the detailed source/dependency map as the current reference for its explicitly stated scan method; do not combine counts from different methods as if they were one metric.

## Safe next step

Complete the state read/write ledger and wrapper-chain ledger, then run the browser regression checklist against the frozen baseline using a disposable save. Until those checks are performed, Phase 0 remains in progress and no gameplay source should be extracted or modified.

## Change-control guarantee

This branch is an audit/documentation branch. Keep all commits here limited to documentation until the exit gates above are satisfied. The original `Project X.html` remains untouched.
