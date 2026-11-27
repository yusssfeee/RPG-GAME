#!/usr/bin/env python3
"""Light build only: inject the pre-measured icon table and hooks for 048-rpg-icon-autofit (idempotent)."""
import pathlib, shutil, sys
p = pathlib.Path(__file__).resolve().parent.parent / 'build.py'
s = p.read_bytes().decode('utf-8')
nl = '\r\n' if '\r\n' in s else '\n'
if 'ICON_FIT_HOOK' in s:
    print('already applied'); sys.exit(0)
ANCHOR = r"""if external: h = re.sub(r'\{\{BLOB:([^}]+)\}\}', lambda m: 'src/assets/embedded/' + m.group(1), h)"""
if s.count(ANCHOR) != 1:
    print('REFUSED: anchor found', s.count(ANCHOR), 'times'); sys.exit(1)
BLOCK = r'''# ICON_FIT_HOOK: light build only. Canvas cannot read external files on file://, so icons use a pre-measured table (src/icon-fit.json).
if external:
    _fit = json.dumps(json.loads((src/'icon-fit.json').read_text(encoding='utf-8'))['fit'], separators=(',', ':'))
    _a1 = "const isData=h=>h.length>400&&h.charCodeAt(0)===100&&h.startsWith('data:image/');"
    _a2 = "function measure(href,done){"
    for _a in (_a1, _a2):
        if h.count(_a) != 1: sys.exit('icon-fit anchor found %d times: %s' % (h.count(_a), _a))
    h = h.replace(_a1, "const isData=h=>(h.length>400&&h.charCodeAt(0)===100&&h.startsWith('data:image/'))||h.startsWith('src/assets/embedded/');const FIT=" + _fit + ";")
    h = h.replace(_a2, "function measure(href,done){const f=href.startsWith('src/assets/embedded/')&&FIT[href.slice(20)];if(f){Promise.resolve().then(()=>done({x0:f[0],x1:f[1],y0:f[2],y1:f[3],ar:f[4],dens:f[5]}));return}")'''
shutil.copyfile(p, str(p) + '.bak2')
p.write_bytes(s.replace(ANCHOR, ANCHOR + nl + BLOCK.replace('\n', nl)).encode('utf-8'))
print('OK: patched', p)
