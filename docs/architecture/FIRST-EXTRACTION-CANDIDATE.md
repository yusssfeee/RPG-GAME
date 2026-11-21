# First Extraction Candidate — Pure Duration Formatter

**Decision:** selected as the proposed first extraction candidate; implementation is gated and has NOT been performed.  
**Baseline:** `Project X.html`, `main`, blob `5ade1cb528871ad410228697e21d317f80782160`.

## Candidate

The local duration formatter declared in the RPG v4 enhancement block:

- Declaration: approximately line 3516.
- Current implementation:

```js
const fmt=s=>{
  s=Math.max(0,Math.round(s));
  return s>=60
    ? Math.floor(s/60)+'m '+String(s%60).padStart(2,'0')+'s'
    : s+'s';
};
```

## Why this is the lowest-risk candidate found so far

- Pure transformation: accepts a numeric-like duration and returns a string.
- Uses only built-in `Math` and `String` methods.
- Does not read or mutate `S`.
- Does not access the DOM, audio, timers, storage, event listeners, or mutable game registries.
- Does not call gameplay functions or depend on campaign state.
- Its current lexical scope is within the RPG v4 enhancement IIFE, so the initial migration can preserve the same classic-script loading model.

## Observed call sites

The source scan found the declaration and these uses in the same enhancement block:

| Approx. line | Use |
|---:|---|
| 3534 | Remaining time shown in the timed crafting job card. |
| 3539 | Timed crafting job progress text refresh. |
| 3932 | Caravan/trade remaining-time label. |
| 4091 | Weather countdown display. |
| 4137 | Barn production/baby growth countdown. |
| 4174 | Breeding cooldown message. |

No call sites outside this block were found by the literal `fmt(` scan. This must be rechecked immediately before implementation.

## Proposed extraction shape

In the first actual code extraction, create a tiny shared utility file (for example `js/shared/format-duration.js`) that exposes one named classic-script function, then load it before the RPG v4 enhancement block. Replace the local `fmt` declaration with an alias to that helper, or update only the six call sites to the shared name.

Do not introduce ES module imports in this first step. The existing page uses classic scripts and shared lexical/global bindings; changing module scope or script ordering would expand the risk unnecessarily.

## Required characterization tests

Before changing the source, add tests for at least:

| Input | Expected output |
|---:|---|
| `0` | `0s` |
| `1.4` | `1s` |
| `59.6` | `1m 00s` |
| `60` | `1m 00s` |
| `61` | `1m 01s` |
| `125.2` | `2m 05s` |
| `-4` | `0s` |

Also test the exact same helper through all six UI call sites, especially the weather, barn and caravan countdowns.

## Gate before implementation

Do not extract this helper until:

1. A browser environment can open the frozen baseline.
2. The baseline console is recorded.
3. The existing output is captured for representative durations.
4. The first utility test can run without requiring game state.
5. The branch is still based on the same `main` commit, or the audit is rebased and repeated against the new baseline.

## Scope boundary

This is a candidate decision only. No source code, script tags, or gameplay behavior has been changed. The first extraction should be a separate, reviewable commit and must retain a one-step rollback path.
