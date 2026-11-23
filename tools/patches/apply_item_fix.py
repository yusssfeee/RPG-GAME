#!/usr/bin/env python3
"""Fix: crash at load when the saved equipment id is registered by a later script
(e.g. a_start_mage / w_start_mage from rpg-weapon-class-system-v1).
Replaces ONE line; refuses to touch a file unless the exact old line occurs exactly once.
Usage:  python apply_item_fix.py "Project X.html" [src/scripts/001-anon.js ...]"""
import sys, pathlib
OLD = b"const item=k=>IT.find(i=>i.id===S.eq[k]);"
NEW = b"const item=k=>IT.find(i=>i.id===S.eq[k])||IT.find(i=>i.id==={w:'w_rusty',a:'a_cloth',p:'p_stone'}[k]);"
if len(sys.argv) < 2: sys.exit(__doc__)
for name in sys.argv[1:]:
    p = pathlib.Path(name); data = p.read_bytes(); n = data.count(OLD)
    if n == 1:
        p.with_suffix(p.suffix + ".bak").write_bytes(data)      # backup next to the file
        p.write_bytes(data.replace(OLD, NEW)); print("PATCHED  ", name, "(backup: " + p.name + ".bak)")
    elif data.count(NEW) == 1: print("ALREADY  ", name)
    else: print("SKIPPED  ", name, "- expected exactly 1 match, found", n)
