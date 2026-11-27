#!/usr/bin/env python3
"""Rebuild the single-file game from src/.
Usage: build.py <repo-root> <output.html> [--separate]
  --separate : emit every part of a split script as its own <script> tag (for testing that the
               split works when files are loaded separately). Default: parts are joined back into
               one <script>, so the output is byte-identical to the original single file.
               Parts of blocks marked "fragments" (pieces of one big function) are never separated."""
import re, sys, json, base64, pathlib
args = [a for a in sys.argv[1:] if not a.startswith('--')]; separate = '--separate' in sys.argv
external = '--external-assets' in sys.argv
prefix = next((a.split('=', 1)[1] for a in sys.argv if a.startswith('--assets-prefix=')), 'src/assets/embedded/')
if not prefix.endswith('/'): prefix += '/'
if not re.fullmatch(r'[A-Za-z0-9_./-]+', prefix): sys.exit('bad --assets-prefix (allowed: letters, digits, _ . / -)')
root = pathlib.Path(args[0]); outp = pathlib.Path(args[1])
src = root/'src'; man = json.loads((src/'manifest.json').read_text(encoding='utf-8'))
blocks = {b['n']: b for b in man['blocks']}; mimes = {b['name']: b['mime'] for b in man['blobs']}
def bodies(b):
    if 'parts' in b: return [(src/p).read_text(encoding='utf-8') for p in b['parts']]
    return [(src/b['file']).read_text(encoding='utf-8')]
def block_html(b):
    if separate and 'parts' in b and not b.get('fragments'):
        return ''.join('<%s%s>%s</%s>' % (b['tag'], b['attrs'], t, b['tag']) for t in bodies(b))
    return '<%s%s>%s</%s>' % (b['tag'], b['attrs'], ''.join(bodies(b)), b['tag'])
h = (src/'index.template.html').read_text(encoding='utf-8')
h = re.sub(r'<!--@@BLOCK:(\d+)@@-->', lambda m: block_html(blocks[int(m.group(1))]), h)
if external: h = re.sub(r'\{\{BLOB:([^}]+)\}\}', lambda m: prefix + m.group(1), h)
# ICON_FIT_HOOK: light build only. Canvas cannot read external files on file://, so icons use a pre-measured table (src/icon-fit.json).
if external:
    _fit = json.dumps(json.loads((src/'icon-fit.json').read_text(encoding='utf-8'))['fit'], separators=(',', ':'))
    _a1 = "const isData=h=>h.length>40&&h.charCodeAt(0)===100&&h.startsWith('data:image/');"
    _a2 = "function measure(href,done){"
    for _a in (_a1, _a2):
        if h.count(_a) != 1: sys.exit('icon-fit anchor found %d times: %s' % (h.count(_a), _a))
    h = h.replace(_a1, "const isData=h=>(h.length>40&&h.charCodeAt(0)===100&&h.startsWith('data:image/'))||h.startsWith('" + prefix + "');const FIT=" + _fit + ";")
    h = h.replace(_a2, "function measure(href,done){const f=href.startsWith('" + prefix + "')&&FIT[href.slice(" + str(len(prefix)) + ")];if(f){Promise.resolve().then(()=>done({x0:f[0],x1:f[1],y0:f[2],y1:f[3],ar:f[4],dens:f[5]}));return}")
h = re.sub(r'\{\{BLOB:([^}]+)\}\}', lambda m: 'data:%s;base64,%s' % (
    mimes[m.group(1)], base64.b64encode((src/'assets'/'embedded'/m.group(1)).read_bytes()).decode()), h)
h = re.sub(r'\{\{RAW:([^}]+)\}\}', lambda m: base64.b64encode((src/'assets'/'embedded'/m.group(1)).read_bytes()).decode(), h)
outp.write_text(h, encoding='utf-8', newline='')
print('built', outp, len(h), 'chars', '(separate scripts)' if separate else '')
