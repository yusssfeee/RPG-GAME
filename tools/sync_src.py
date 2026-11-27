#!/usr/bin/env python3
"""Bring src/ back in line with the canonical single file (Project X.html), after someone edited the single file only.
Self-verifying: the game rebuilt from src/ must equal the canonical file (CRLF-normalised), otherwise everything is rolled back.

  python tools/sync_src.py "Project X.html"           # update src/ from the canonical file
  python tools/sync_src.py "Project X.html" --check   # only report whether src/ rebuilds to the canonical file (exit 1 if not)

What it handles: edits INSIDE existing <script>/<style> blocks and in the page markup.
What it refuses (exit 2, nothing changed): blocks added/removed/reordered, a new embedded image, or an edit of a line that
marks the boundary of a split part (the first line of each part). Those need a manual re-split; see HANDOFF.md."""
import re, sys, json, base64, shutil, filecmp, pathlib, tempfile, subprocess
args = [a for a in sys.argv[1:] if not a.startswith('--')]; check_only = '--check' in sys.argv
if not args: sys.exit(__doc__)
canon = pathlib.Path(args[0]).resolve(); root = pathlib.Path(__file__).resolve().parent.parent; src = root/'src'
here = pathlib.Path(__file__).resolve().parent; mpath = src/'manifest.json'
def fail(msg, code=2): print(msg, file=sys.stderr); sys.exit(code)
def norm(b): return b.replace(b'\r\n', b'\n')
def build(tag):
    out = pathlib.Path(tempfile.mkdtemp())/(tag+'.html')
    subprocess.run([sys.executable, str(here/'build.py'), str(root), str(out)], check=True, stdout=subprocess.DEVNULL); return out
def same_as_canon(path): return norm(path.read_bytes()) == norm(canon.read_bytes())
if check_only:
    ok = same_as_canon(build('check')); print('OK: src/ rebuilds to the canonical file.' if ok else 'MISMATCH: src/ does not rebuild to the canonical file. Run: python tools/sync_src.py "%s"' % args[0]); sys.exit(0 if ok else 1)

man_text = mpath.read_text(encoding='utf-8'); man = json.loads(man_text)
html = canon.read_text(encoding='utf-8')            # universal newlines: CRLF -> LF
emb = src/'assets'/'embedded'
blob_map = {base64.b64encode((emb/b['name']).read_bytes()).decode(): b['name'] for b in man['blobs']}
raw_map = {base64.b64encode(p.read_bytes()).decode(): p.name for p in emb.glob('raw-*')}
BLOB = re.compile(r'data:([a-z/+\-0-9.]+);base64,([A-Za-z0-9+/=]{2000,})'); RAW = re.compile(r'''(["'])([A-Za-z0-9+/=]{5000,})\1''')
def tokenise(text, where):
    def b(m):
        if m.group(2) not in blob_map: fail('REFUSED: a new embedded image appears in %s (not in src/assets/embedded). Add it with the split tools first.' % where)
        return '{{BLOB:%s}}' % blob_map[m.group(2)]
    text = BLOB.sub(b, text)
    def r(m):
        if m.group(2) not in raw_map: fail('REFUSED: a new raw base64 image appears in %s.' % where)
        return m.group(1) + '{{RAW:%s}}' % raw_map[m.group(2)] + m.group(1)
    return RAW.sub(r, text)
BLK = re.compile(r'<(script|style)([^>]*)>(.*?)</\1>', re.S)
found = list(BLK.finditer(html)); blocks = man['blocks']
if len(found) != len(blocks): fail('REFUSED: the canonical file has %d script/style blocks, src/ has %d (blocks added or removed).' % (len(found), len(blocks)))
for i, (m, b) in enumerate(zip(found, blocks)):
    if m.group(1) != b['tag'] or m.group(2) != b['attrs']: fail('REFUSED: block #%d changed its tag or attributes (%s%s vs %s%s).' % (i, m.group(1), m.group(2), b['tag'], b['attrs']))
counter = iter(range(10**6))
template = tokenise(BLK.sub(lambda m: '<!--@@BLOCK:%03d@@-->' % blocks[next(counter)]['n'], html), 'the page markup')
tpl_path = src/'index.template.html'; updates = {}          # path -> new text
if template != tpl_path.read_text(encoding='utf-8'): updates[tpl_path] = template
for m, b in zip(found, blocks):
    new = tokenise(m.group(3), 'block %s' % b['n'])
    if 'parts' not in b:
        p = src/b['file']
        if new != p.read_text(encoding='utf-8'): updates[p] = new
        continue
    olds = [(src/p).read_text(encoding='utf-8') for p in b['parts']]
    if ''.join(olds) == new: continue
    new_lines = new.split('\n'); cuts = [0]; pos = 0
    for k in range(1, len(olds)):
        first = olds[k].split('\n')[0]; j = next((q for q in range(pos + 1, len(new_lines)) if new_lines[q] == first), None)
        if j is None: fail('REFUSED: in block %s the first line of part %s no longer exists (%r). Edit around it or re-split manually.' % (b['n'], b['parts'][k], first[:70]))
        cuts.append(j); pos = j
    for k, rel in enumerate(b['parts']):
        end = cuts[k+1] if k + 1 < len(cuts) else len(new_lines)
        txt = '\n'.join(new_lines[cuts[k]:end]) + ('\n' if k + 1 < len(cuts) else '')
        if txt != olds[k]: updates[src/rel] = txt
if not updates: print('Nothing to do: src/ already matches the canonical file.' if same_as_canon(build('same')) else 'src/ text equals the canonical text but the rebuild differs; investigate.'); sys.exit(0)
saved = {p: p.read_text(encoding='utf-8') for p in updates}
try:
    for p, t in updates.items(): p.write_text(t, encoding='utf-8', newline='\n')
    if not same_as_canon(build('after')): raise RuntimeError('the game rebuilt from the updated src/ differs from the canonical file')
except Exception as ex:
    for p, t in saved.items(): p.write_text(t, encoding='utf-8', newline='\n')
    fail('ROLLED BACK: %s' % ex, 1)
print('OK: updated %d file(s); the rebuilt game equals the canonical file.' % len(updates))
for p in sorted(updates): print('  ', p.relative_to(root).as_posix())
