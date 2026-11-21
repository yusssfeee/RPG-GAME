# AST-Backed Static Analysis — Phase 0

**Baseline:** `Project X.html` on `main` at `2252c12b57e81a3fe773e3c8b5a335f63a8c6097`  
**Blob SHA:** `5ade1cb528871ad410228697e21d317f80782160`  
**Branch:** `phase-0/baseline-audit`  
**Parser:** TypeScript compiler API 5.8.3, JavaScript ScriptKind  
**Runtime:** Node.js v22.16.0  
**Scope:** static AST scan of all non-empty inline script blocks; no game execution.

## Parse and source identity

| Check | Result |
|---|---:|
| Non-empty inline script blocks parsed | 52 |
| Parser diagnostics | 0 |
| Direct S.property AST references | 963 |
| Unique static S property names | 51 |
| Computed S[...] accesses | 0 |
| Simple alias/destructuring binding sites rooted at S | 16 |
| Direct S.property references passed as call arguments | 31 |

The input bytes hash to the pinned Git blob SHA above. This confirms that the analyzed local file is the exact source object pinned on `main`; it is not a newer working copy.

## AST property reference inventory

Counts below are syntax occurrences, not unique functions. Each direct S.property access is classified from its immediate AST context. Alias and call-argument columns are separate metadata and are not included in Refs.

| Field | Read | Direct write | Nested write | Indexed write | ++/-- | Delete | Mutator call | Alias bindings | Passed to call | Refs |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| up | 98 | 0 | 0 | 0 | 1 | 0 | 0 | 0 | 0 | 99 |
| inv | 9 | 1 | 22 | 50 | 6 | 0 | 0 | 0 | 3 | 88 |
| coins | 43 | 42 | 0 | 0 | 0 | 0 | 0 | 1 | 3 | 85 |
| tab | 64 | 20 | 0 | 0 | 0 | 0 | 0 | 2 | 0 | 84 |
| hp | 27 | 24 | 0 | 0 | 0 | 0 | 0 | 2 | 3 | 51 |
| cls | 32 | 5 | 0 | 0 | 0 | 0 | 0 | 1 | 2 | 37 |
| barn | 28 | 1 | 0 | 4 | 0 | 0 | 1 | 0 | 1 | 34 |
| dg | 26 | 4 | 1 | 0 | 2 | 0 | 0 | 0 | 0 | 33 |
| items | 11 | 1 | 0 | 11 | 1 | 1 | 0 | 0 | 0 | 25 |
| eq | 16 | 0 | 4 | 4 | 0 | 0 | 0 | 0 | 0 | 24 |
| plots | 21 | 0 | 0 | 0 | 0 | 0 | 1 | 0 | 1 | 22 |
| cv | 17 | 1 | 3 | 1 | 0 | 0 | 0 | 2 | 0 | 22 |
| mz | 18 | 3 | 0 | 0 | 0 | 0 | 0 | 0 | 2 | 21 |
| w5 | 15 | 4 | 1 | 1 | 0 | 0 | 0 | 0 | 0 | 21 |
| sh | 7 | 13 | 0 | 0 | 0 | 0 | 0 | 0 | 4 | 20 |
| wx | 16 | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 17 |
| mineExp | 13 | 4 | 0 | 0 | 0 | 0 | 0 | 1 | 1 | 17 |
| wz | 11 | 5 | 0 | 0 | 0 | 0 | 0 | 0 | 4 | 16 |
| mf | 11 | 3 | 0 | 0 | 1 | 0 | 0 | 0 | 0 | 15 |
| fz | 9 | 3 | 0 | 0 | 0 | 0 | 0 | 0 | 2 | 12 |
| contracts | 8 | 3 | 0 | 0 | 0 | 0 | 1 | 0 | 0 | 12 |
| jobs | 8 | 1 | 0 | 2 | 0 | 0 | 0 | 0 | 0 | 11 |
| fishSeen | 7 | 2 | 0 | 2 | 0 | 0 | 0 | 0 | 0 | 11 |
| classXP | 7 | 2 | 0 | 2 | 0 | 0 | 0 | 0 | 1 | 11 |
| trade | 9 | 0 | 1 | 0 | 0 | 0 | 0 | 4 | 0 | 10 |
| buff | 7 | 1 | 0 | 2 | 0 | 0 | 0 | 0 | 0 | 10 |
| combatTraining | 6 | 2 | 0 | 2 | 0 | 0 | 0 | 0 | 1 | 10 |
| trainingPoints | 7 | 3 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 10 |
| region | 7 | 2 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 9 |
| xp | 5 | 0 | 0 | 3 | 0 | 0 | 0 | 0 | 0 | 8 |
| mute | 6 | 2 | 0 | 0 | 0 | 0 | 0 | 1 | 0 | 8 |
| kills | 7 | 0 | 0 | 0 | 1 | 0 | 0 | 0 | 0 | 8 |
| mmode | 6 | 2 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 8 |
| bsel | 7 | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 8 |
| story | 6 | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 7 |
| sel | 6 | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 7 |
| asel | 5 | 2 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 7 |
| clears | 6 | 0 | 0 | 1 | 0 | 0 | 0 | 0 | 1 | 7 |
| bmode | 5 | 2 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 7 |
| tmode | 5 | 2 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 7 |
| mines | 4 | 1 | 0 | 1 | 0 | 0 | 0 | 0 | 1 | 6 |
| cost | 4 | 0 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | 5 |
| bfeed | 3 | 2 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 5 |
| mzId | 2 | 3 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 5 |
| rb | 3 | 0 | 1 | 1 | 0 | 0 | 0 | 2 | 0 | 5 |
| fsel | 3 | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 4 |
| ms | 2 | 1 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | 4 |
| sk | 3 | 0 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | 4 |
| ubr | 2 | 2 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 4 |
| bbr | 2 | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 3 |
| smeltCd | 1 | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 2 |

### Classification rules and limitations

- Direct write: assignment to the field itself, such as S.coins = ... or S.coins += ....
- Nested write: a field-rooted path is the assignment target, such as S.dg.someFlag = ....
- Indexed write: a field is accessed through an index on the target path, such as S.inv[id] = ....
- Mutator call: a direct call to a recognized mutating method on that field, for example push, splice, set, or delete. This is not proof that all mutations have been found.
- Alias bindings: simple declarations whose initializer refers directly to S.field, plus supported destructuring declarations. This is not a whole-program alias graph and does not trace later writes through the alias.
- Passed to call: direct S.field references passed as call arguments. This is a warning inventory; calls include pure utilities as well as helpers with possible side effects.
- The prior regex ledger counted raw text matches, including comments and strings. For example, its up count was 100 while the AST code-reference count is 99. Keep the regex table as a historical heuristic and use this AST table for code-syntax references.

This AST pass is stronger than a text scan, but is not complete semantic ownership or data-flow analysis. It does not prove exclusive ownership, propagate all alias writes, infer arbitrary helper side effects, resolve dynamic keys created outside the direct S[...] form, model getter/setter behavior, or validate runtime paths. It also does not associate each write with the event, timer, or subsystem that caused it. All high-coupling fields remain shared until those traces are complete.

## Function wrapper predecessor evidence

The AST scan found **100 callable assignments to identifier-named functions across 44 target names**. In **86** assignments it found a preceding same-script binding capturing the target and a matching use of that captured name, including .apply calls. The other assignments are unpaired in this simple scan; they may be direct replacements or require wider lexical/manual tracing. Object-property targets such as VIEWS.fish are covered by the companion wrapper ledger, not this identifier-only count.

Selected source-order predecessor evidence:

| Target | Assignment line | Captured predecessor | Delegation / return syntax |
|---|---:|---|---|
| render | 1777 | _r | calls predecessor; no explicit return |
| render | 2928 | _r | returns stored result |
| render | 3309 | _r2 | returns stored result |
| render | 3426 | _r3 | returns stored result |
| render | 3614 | _r4 | returns stored result |
| render | 3795 | _r5 | returns stored result |
| render | 4183 | _r6 | returns stored result |
| render | 4686 | _rw | returns stored result |
| render | 6799 | baseRender | returns stored result |
| render | 7053 | _rn | returns captured call |
| render | 7510, 8054, 8202 | previousRender | returns stored result |
| render | 8572 | oldRender | returns captured call |
| foeDown | 1930 | _chFoeDown | returns stored result |
| foeDown | 2206 | oldFoeDown | returns stored result |
| foeDown | 3782 | _fd | returns captured call |
| foeDown | 4808 | oldDown | returns captured call |
| foeDown | 4909 | oldDown | returns stored result |
| foeDown | 4972 | _mineExpDown | returns stored result |
| foeDown | 7072 | _fd | returns stored result |
| foeDown | 7463, 8064, 8210 | previousFoeDown | returns stored result |
| foeDown | 8577 | oldFoeDown | returns stored result |
| playerDown | 2213 | oldPlayerDown | returns stored result |
| playerDown | 4974 | _mineExpPlayerDown | returns stored result |
| flee | 2219 | oldFlee | returns stored result |
| flee | 4973 | _mineExpFlee | returns stored result |
| startFight | 4841, 4908 | oldStart | invokes predecessor; no explicit return |
| startFight | 7066 | _sf | returns captured call |
| startFight | 7515, 8056, 8204 | previousStartFight | returns stored result |
| enemyAttack | 3781 | _ea | invokes predecessor; no explicit return |
| enemyAttack | 4860 | oldEnemyAttack | returns captured call |
| enemyAttack | 7069 | _ea | returns stored result |
| enemyAttack | 7476, 8060, 8206 | previousEnemyAttack | returns stored result |
| catchFish | 2299 | oldCatchFish | returns captured call |
| upd | 3749 | _u | invokes predecessor; no explicit return |
| save | 4977 | _mineExpSave | returns captured call |
| save | 8570 | oldSave | returns captured call |
| addXp | 1731, 1831, 2809 | _ax, _ax2, _xp4 | invokes predecessor; no explicit return |
| addXp | 4401, 4737, 8791, 8866 | _xp5, _xp8, baseAddXp, _add | returns captured call/result |
| fx | 1727 | unpaired | possible direct replacement; inspect wider block |
| fx | 3737 | _fx2 | invokes predecessor; no explicit return |
| combatTick | 3767 | _ct | invokes predecessor; no explicit return |
| combatTick | 7498, 8062, 8208 | previousCombatTick | returns captured call |
| strike | 4855 | oldStrike | returns captured call |
| strike | 7471, 8058 | previousStrike | returns stored result |
| strike | 8641 | oldStrike | returns stored result |

Notes:
- At line 6799, render captures baseRender before replacement; it is a wrapper, not a direct replacement.
- At line 7053, render captures _rn before replacement; it is also a wrapper.
- Corrected companion-ledger line references: playerDown is assigned at 2213 and 4974; flee at 2219 and 4973. Do not confuse nearby foeDown assignments with these names.
- The matching is syntactic and local to an inline script block. It does not prove that the captured function is the full runtime predecessor when later script blocks, globals, or lexical bindings alter resolution.
- “Calls without explicit return” describes syntax only. Do not alter this behavior until all callers and observable effects are tested.

### Unpaired identifier-function assignments requiring inspection

The AST scan found these 14 assignments without a same-script captured predecessor and matching use. This only means the simple local capture matcher did not pair them; it does not prove that each assignment overwrites an existing runtime function.

| Target | Assignment line |
|---|---:|
| fx | 1727 |
| tapStall | 1769 |
| newGrid | 2176 |
| spawnFish | 2247 |
| oIcon | 2338 |
| fIcon | 2345 |
| tradeTick | 2660 |
| toast | 2777 |
| treeSvg | 3465 |
| anvilAct | 3542 |
| woodLoop | 3863 |
| chopSwing | 3872 |
| woodLoop | 4520 |
| equip | 8421 |

Classify each as a new definition, export/assignment, direct replacement, or indirect wrapper only after inspecting the containing block and its surrounding lexical scope. Do not presume they all need predecessor delegation.

## Timer and animation call-site inventory

| API | AST call sites |
|---|---:|
| setTimeout | 111 |
| setInterval | 15 |
| requestAnimationFrame | 34 |
| requestIdleCallback | 1 |
| clearTimeout | 26 |
| clearInterval | 0 |
| cancelAnimationFrame | 4 |
| cancelIdleCallback | 0 |

All recurring interval creation sites:

| Source line | Purpose |
|---:|---|
| 1138 | Audio API synchronization watcher |
| 1693 | Core 250 ms tick |
| 1755 | Player regeneration |
| 1774 | Barn simulation |
| 2673 | Trade completion polling |
| 3536 | Smith/carpenter job completion polling |
| 3596 | V4 periodic domain/ready-state tick |
| 3972 | Contract/UI completion polling |
| 4182 | Weather, pests, barn and farm synchronization |
| 5239 | Mine ambience watcher |
| 6103 | Fishing ambience watcher |
| 6436 | Farm water visual watcher |
| 6974 | SVG icon auto-fit watcher |
| 7161 | Gain-feed cleanup/check watcher |
| 8087 | Shaman death visual cleanup poll |

No setInterval result was directly assigned to an obvious handle at its call site in this scan, and no clearInterval call was found. This indicates page-lifetime recurring intervals in the current source; it does not automatically prove a defect because some are intentionally global. It does mean that stopping them on tab or campaign-slot changes must not be assumed.

requestAnimationFrame appears at 34 call sites, including initial and recursive scheduling. Thirteen calls are visibly assigned to named handles such as pondLoopRaf, ck.raf, WS.raf, raf, or W5.raf; 21 are not directly assigned to a named handle in the same syntax context. Four cancelAnimationFrame calls were found. These counts are not complete per-controller lifecycle proof.

## Phase 0 decision

1. AST syntax inventory for S properties, function assignment/capture patterns, and timer API call sites is now available.
2. Full semantic state ownership remains open: alias propagation, helper side effects, hydration/default paths, timer/event writes and domain responsibility still need manual/data-flow tracing.
3. Exact predecessor graph remains open where captures are unpaired, property assignments are involved, or runtime script ordering affects bindings.
4. Timer disposal guarantees remain open. AST callsite inventory does not run the game or prove user-visible lifecycle outcomes.
5. Browser baseline is still blocked: the headless run previously returned ERR_BLOCKED_BY_ADMINISTRATOR, and the connected local browser context was unavailable in this pass.
6. Do not extract fmt or any other runtime helper until browser baseline, save fixtures and the remaining Phase 0 gates are satisfied.

**Status:** AST syntax analysis completed for the pinned source; Phase 0 remains in progress. No runtime source was changed.