# Project X — Shared State Write Inventory

**Source baseline:** `Project X.html` on `main`, commit `2252c12b57e81a3fe773e3c8b5a335f63a8c6097`.  
**Method:** original static token scan for direct `S.field` writes and reads. This is a historical triage inventory, not a complete AST/data-flow analysis. Use [SEMANTIC-STATE-ALIAS-WRITE-TRACE.md](SEMANTIC-STATE-ALIAS-WRITE-TRACE.md) for the later corrected AST and simple local-alias counts.

## Directly written campaign fields

The scan detected direct writes to 42 distinct top-level fields:

`asel`, `barn`, `bbr`, `bfeed`, `bmode`, `bsel`, `buff`, `classXP`, `cls`, `coins`, `combatTraining`, `contracts`, `cv`, `dg`, `fishSeen`, `fsel`, `fz`, `hp`, `inv`, `items`, `jobs`, `kills`, `mf`, `mineExp`, `mines`, `mmode`, `ms`, `mute`, `mz`, `mzId`, `region`, `sel`, `sh`, `smeltCd`, `story`, `tab`, `tmode`, `trainingPoints`, `ubr`, `w5`, `wx`, `wz`.

The scan also observed reads of additional top-level fields not directly assigned in the scanned syntax: `clears`, `cost`, `eq`, `plots`, `rb`, `sk`, `trade`, `up`, and `xp`. Those are still important state dependencies and must not be omitted from the state contract.

## Superseding AST trace

A later AST pass with corrected write classification and simple same-script alias tracking recorded 1,209 direct-plus-tracked-alias references/operations across 51 fields: 822 reads and 387 write/update operations. Of those 387 writes/updates, 69 occurred through tracked aliases such as `p=S.barn[i]`, `run=S.mineExp`, `p=S.plots[i]`, and `T=S.trade`. These alias writes are included in the 387 total, not additional to it.

The alias tracker does not trace every callback parameter, arbitrary helper mutation, alias passed across script blocks, or dynamic/computed key. Keep ownership marked shared until those paths and runtime save/load behavior are verified.

## Interpretation

- The state surface is broader than the initial default object alone suggests; extension scripts add and update fields over time.
- Some fields may be mutated through nested objects, array methods, destructuring, aliases, or computed property names. The scan cannot prove that its field list is exhaustive.
- A field being written does not prove it belongs in the save file. Confirm persistence by inspecting the actual serialization path and representative runtime saves.
- UI selection fields and active modes may be persisted today. Do not silently “clean up” or stop saving them during extraction without compatibility tests.
- Fields such as `mineExp`, `mines`, `mz`, `mf`, `mmode`, `contracts`, `jobs`, `combatTraining`, `classXP`, and `trainingPoints` show that later features extend the original state shape.

## Required next pass

1. Parse every script block separately and attach its script ID / line range to each state write.
2. Record nested paths (for example `S.story.quests`) and array mutations.
3. Continue alias tracing beyond the simple same-script paths already documented, especially callback parameters, helper functions and references passed between script blocks.
4. Trace serialization of `S` and determine which runtime-only fields are included.
5. Create a versioned state contract only after the above steps and browser save fixtures are available.

## Extraction rule

No system module may own a private copy of campaign data during the first migration. Until a state API is introduced and tested, the existing shared `S` object remains the compatibility boundary.
