# Project X — Shared State Write Inventory

**Source baseline:** `Project X.html` on `main`, commit `2252c12b57e81a3fe773e3c8b5a335f63a8c6097`.  
**Method:** static token scan for direct `S.field` writes and reads. This is a triage inventory, not a complete AST/data-flow analysis.

## Directly written campaign fields

The scan detected direct writes to 42 distinct top-level fields:

`asel`, `barn`, `bbr`, `bfeed`, `bmode`, `bsel`, `buff`, `classXP`, `cls`, `coins`, `combatTraining`, `contracts`, `cv`, `dg`, `fishSeen`, `fsel`, `fz`, `hp`, `inv`, `items`, `jobs`, `kills`, `mf`, `mineExp`, `mines`, `mmode`, `ms`, `mute`, `mz`, `mzId`, `region`, `sel`, `sh`, `smeltCd`, `story`, `tab`, `tmode`, `trainingPoints`, `ubr`, `w5`, `wx`, `wz`.

The scan also observed reads of additional top-level fields not directly assigned in the scanned syntax: `clears`, `cost`, `eq`, `plots`, `rb`, `sk`, `trade`, `up`, and `xp`. Those are still important state dependencies and must not be omitted from the state contract.

## Interpretation

- The state surface is broader than the initial default object alone suggests; extension scripts add and update fields over time.
- Some fields may be mutated through nested objects, array methods, destructuring, aliases, or computed property names. The scan cannot prove that its field list is exhaustive.
- A field being written does not prove it belongs in the save file. Confirm persistence by inspecting the actual serialization path and representative runtime saves.
- UI selection fields and active modes may be persisted today. Do not silently “clean up” or stop saving them during extraction without compatibility tests.
- Fields such as `mineExp`, `mines`, `mz`, `mf`, `mmode`, `contracts`, `jobs`, `combatTraining`, `classXP`, and `trainingPoints` show that later features extend the original state shape.

## Required next pass

1. Parse every script block separately and attach its script ID / line range to each state write.
2. Record nested paths (for example `S.story.quests`) and array mutations.
3. Find aliases such as `const state = S` and writes through those aliases.
4. Trace serialization of `S` and determine which runtime-only fields are included.
5. Create a versioned state contract only after the above steps and browser save fixtures are available.

## Extraction rule

No system module may own a private copy of campaign data during the first migration. Until a state API is introduced and tested, the existing shared `S` object remains the compatibility boundary.
