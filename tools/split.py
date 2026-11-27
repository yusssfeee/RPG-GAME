#!/usr/bin/env python3
"""Split 'Project X.html' into src/ (styles, scripts, template, embedded images).
Lossless: tools/build.py rebuilds a byte-identical single file."""
import re, sys, json, base64, pathlib
src_html = pathlib.Path(sys.argv[1]); out = pathlib.Path(sys.argv[2])
_m = out/'src'/'manifest.json'
if _m.exists() and '"parts"' in _m.read_text(encoding='utf-8'):
    sys.exit('REFUSED: src/ is already split into parts (phase 1). Re-running split.py would undo it.')
h = src_html.read_text(encoding='utf-8')
for d in ('styles','scripts','assets/embedded'): (out/'src'/d).mkdir(parents=True, exist_ok=True)

# 1) embedded images -> binary files, replaced by {{BLOB:name}} tokens
blob_re = re.compile(r'data:([a-z/+\-0-9.]+);base64,([A-Za-z0-9+/=]{2000,})')
blobs, seen = [], {}
def blob_sub(m):
    mime, b64 = m.group(1), m.group(2)
    if b64 in seen: return '{{BLOB:%s}}' % seen[b64]
    ext = {'image/webp':'webp','image/png':'png','image/jpeg':'jpg'}.get(mime, 'bin')
    name = 'b%04d.%s' % (len(blobs)+1, ext)
    raw = base64.b64decode(b64)
    if base64.b64encode(raw).decode() != b64: raise SystemExit('non-canonical base64: '+name)
    (out/'src'/'assets'/'embedded'/name).write_bytes(raw)
    blobs.append({'name':name,'mime':mime}); seen[b64] = name
    return '{{BLOB:%s}}' % name
h2 = blob_re.sub(blob_sub, h)

# 2) <style>/<script> blocks -> files, replaced by markers in the template
blk_re = re.compile(r'<(script|style)([^>]*)>(.*?)</\1>', re.S)
manifest, n = [], 0
def blk_sub(m):
    global n
    n += 1
    tag, attrs, body = m.groups()
    idm = re.search(r'id="([^"]+)"', attrs)
    slug = re.sub(r'[^A-Za-z0-9_-]+','-', idm.group(1)) if idm else 'anon'
    ext = 'js' if tag == 'script' else 'css'
    rel = '%ss/%03d-%s.%s' % ('script' if tag=='script' else 'style', n, slug, ext)
    (out/'src'/rel).write_text(body, encoding='utf-8', newline='')
    manifest.append({'n':n,'tag':tag,'attrs':attrs,'file':rel})
    return '<!--@@BLOCK:%03d@@-->' % n
tpl = blk_re.sub(blk_sub, h2)
(out/'src'/'index.template.html').write_text(tpl, encoding='utf-8', newline='')
(out/'src'/'manifest.json').write_text(json.dumps({'blocks':manifest,'blobs':blobs}, indent=1), encoding='utf-8')
print('blocks:', n, 'blobs:', len(blobs))
