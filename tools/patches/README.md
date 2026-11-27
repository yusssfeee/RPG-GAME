# Historical patch scripts

Small, self-checking scripts that applied one-line fixes. **All three are already applied on `main` and on `modular-split`**; running them prints `ALREADY`.
Kept as templates for the pattern described in `HANDOFF.md` section 2: replace one exact string, refuse unless it occurs exactly once, write a `.bak`, be idempotent (check the NEW text first).

The `src/` paths below exist on the `modular-split` branch only (on `main` the same text is inside `Project X.html`: lines 1048, 1496, 7306).

| Script | Fix | Where |
|---|---|---|
| `apply_item_fix.py` | boot crash when the saved class gear is registered by a later script | `src/scripts/011/04-data.js` |
| `apply_burn_fix.py` | monster killed by burn stayed on screen | `src/scripts/011/14-combat.js` |
| `apply_ghost_fix.py` | ghost of the dead goblin on the next goblin | `src/scripts/060-rpg-goblin-combat-fix.js` |

Do not `git add` the `.bak` files they create.
