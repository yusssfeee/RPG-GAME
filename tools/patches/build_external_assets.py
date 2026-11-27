#!/usr/bin/env python3
"""Adds --external-assets to tools/build.py (idempotent; refuses unless each anchor matches exactly once)."""
import pathlib, shutil, sys
p = pathlib.Path(__file__).resolve().parent.parent / 'build.py'
s = p.read_bytes().decode('utf-8')
nl = '\r\n' if '\r\n' in s else '\n'
NEW1 = "external = '--external-assets' in sys.argv"
if NEW1 in s:
    print('already applied'); sys.exit(0)
A1 = r"""args = [a for a in sys.argv[1:] if not a.startswith('--')]; separate = '--separate' in sys.argv"""
A2 = r"""h = re.sub(r'\{\{BLOB:([^}]+)\}\}', lambda m: 'data:%s;base64,%s' % ("""
for a in (A1, A2):
    if s.count(a) != 1:
        print('REFUSED: anchor found', s.count(a), 'times:', a[:60]); sys.exit(1)
B2 = r"""if external: h = re.sub(r'\{\{BLOB:([^}]+)\}\}', lambda m: 'src/assets/embedded/' + m.group(1), h)"""
s = s.replace(A1, A1 + nl + NEW1).replace(A2, B2 + nl + A2)
shutil.copyfile(p, str(p) + '.bak')
p.write_bytes(s.encode('utf-8'))
print('OK: patched', p)
