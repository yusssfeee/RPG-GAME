#!/usr/bin/env python3
"""Fix: a monster killed by damage-over-time (mage burn, tank counter damage) reached 0 HP but
stayed on screen, because combatTick's guard called foeDown() without render().
Replaces ONE line; refuses to touch a file unless the exact old line occurs exactly once.
Usage:  python apply_burn_fix.py "Project X.html" [other files ...]"""
import sys, pathlib
OLD = b"const f=fight;if(!f||f.dead||f.hp<=0){if(f&&f.hp<=0)foeDown();return}"
NEW = b"const f=fight;if(!f||f.dead||f.hp<=0){if(f&&f.hp<=0&&foeDown())render();return}"
if len(sys.argv) < 2: sys.exit(__doc__)
for name in sys.argv[1:]:
    p = pathlib.Path(name); data = p.read_bytes(); n = data.count(OLD)
    if n == 1:
        p.with_suffix(p.suffix + ".bak").write_bytes(data)
        p.write_bytes(data.replace(OLD, NEW)); print("PATCHED  ", name, "(backup: " + p.name + ".bak)")
    elif data.count(NEW) == 1: print("ALREADY  ", name)
    else: print("SKIPPED  ", name, "- expected exactly 1 match, found", n)
