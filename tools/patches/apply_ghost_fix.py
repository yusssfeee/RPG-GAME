#!/usr/bin/env python3
"""Fix: after a Goblin / Goblin Archer dies, a ghost of its last death frame stayed visible on top of the
NEXT goblin. The frame <img> elements are cached and reused between fights, and the last death frame kept
opacity:1. The fix resets the opacity whenever a cached frame is put into a new stack.
Replaces ONE piece of code; refuses to touch a file unless the exact old text occurs exactly once.
Usage:  python apply_ghost_fix.py "Project X.html" [src/scripts/060-rpg-goblin-combat-fix.js ...]"""
import sys, pathlib
OLD = b"activeMainImg.appendChild(el);stackPool.set(src,el)"
NEW = b"el.style.opacity='0';activeMainImg.appendChild(el);stackPool.set(src,el)"
if len(sys.argv) < 2: sys.exit(__doc__)
for name in sys.argv[1:]:
    p = pathlib.Path(name); data = p.read_bytes(); n = data.count(OLD)
    if data.count(NEW) == 1: print("ALREADY  ", name)   # check first: NEW contains OLD, so OLD alone cannot tell
    elif n == 1:
        p.with_suffix(p.suffix + ".bak").write_bytes(data)
        p.write_bytes(data.replace(OLD, NEW)); print("PATCHED  ", name, "(backup: " + p.name + ".bak)")
    else: print("SKIPPED  ", name, "- expected exactly 1 match, found", n)
