#!/usr/bin/env python3
"""Phase 1: split the main script src/scripts/011-anon.js into one file per section
(src/scripts/011/NN-<section>.js). Lossless and self-verifying: the rebuilt single file must be
byte-identical before and after, otherwise everything is rolled back.
Usage (from the repo root):  python tools/split_main.py ."""
import re, sys, json, shutil, filecmp, pathlib, tempfile, subprocess
root = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else '.').resolve()
src = root/'src'; mpath = src/'manifest.json'; here = pathlib.Path(__file__).resolve().parent
man = json.loads(mpath.read_text(encoding='utf-8'))
if any('parts' in b for b in man['blocks']): sys.exit('Already split (a block has "parts"). Nothing to do.')
cands = [b for b in man['blocks'] if b.get('file', '').endswith('011-anon.js')]
if len(cands) != 1 or cands[0]['tag'] != 'script': sys.exit('ABORT: expected exactly one script block 011-anon.js')
blk = cands[0]; old = src/blk['file']; body = old.read_text(encoding='utf-8'); lines = body.split('\n')
BAN = re.compile(r'/\* -{3,} (.*?) -{3,} \*/')
cuts = [0] + [i for i, l in enumerate(lines) if i > 0 and BAN.match(l)]
if len(cuts) != 27: sys.exit('ABORT: expected 26 section banners, found %d' % (len(cuts) - 1))
def build(tag):
    out = pathlib.Path(tempfile.mkdtemp())/(tag+'.html')
    subprocess.run([sys.executable, str(here/'build.py'), str(root), str(out)], check=True, stdout=subprocess.DEVNULL)
    return out
before = build('before'); saved = dict(blk)
pdir = src/'scripts'/'011'; pdir.mkdir(exist_ok=True); parts = []
try:
    for k, s in enumerate(cuts):
        e = cuts[k+1] if k+1 < len(cuts) else len(lines)
        txt = '\n'.join(lines[s:e]) + ('\n' if k+1 < len(cuts) else '')
        m = BAN.match(lines[s]); nm = re.sub(r'[^a-z0-9]+', '-', (m.group(1).split(':')[0] if m else 'header').lower()).strip('-')[:28]
        rel = 'scripts/011/%02d-%s.js' % (k, nm); (src/rel).write_text(txt, encoding='utf-8', newline='\n'); parts.append(rel)
    if ''.join((src/p).read_text(encoding='utf-8') for p in parts) != body: raise RuntimeError('parts do not reassemble to the original')
    blk.pop('file'); blk['parts'] = parts
    mpath.write_text(json.dumps(man, indent=1), encoding='utf-8')
    after = build('after')
    if not filecmp.cmp(before, after, shallow=False): raise RuntimeError('rebuilt game differs from the original')
except Exception as ex:
    shutil.rmtree(pdir, ignore_errors=True); blk.clear(); blk.update(saved)
    mpath.write_text(json.dumps(man, indent=1), encoding='utf-8'); sys.exit('ROLLED BACK: %s' % ex)
old.unlink()
note = root/'SPLIT.md'
if note.exists() and 'Phase 1' not in note.read_text(encoding='utf-8'):
    note.write_text(note.read_text(encoding='utf-8') + '\n## Phase 1 (main script split)\n`src/scripts/011/NN-<section>.js` are the 26 sections of the old `011-anon.js` (+ a 1-line header), '
      'in load order. `build.py` joins them back into ONE script, so the single file is byte-identical. '
      '`python tools/build.py . out.html --separate` loads them as separate scripts, to test the split. Do not reorder NN.\n', encoding='utf-8')
print('OK: %d parts written; rebuilt game is byte-identical to the original; old 011-anon.js removed.' % len(parts))
