#!/usr/bin/env python3
"""Phase 2 (lossless, self-verifying; rolls everything back if the rebuilt game differs by a single byte):
  1. cut the two big wrapped scripts (rpg-v4, rpg-sprite-pack) into fragments at their section banners
     (src/scripts/016/*.js, src/scripts/014/*.js). Fragments are pieces of ONE function: they are joined
     back into one <script> by build.py and are not valid JavaScript on their own.
  2. move the raw base64 WebP/PNG atlases out of the goblin animation script into real image files
     (src/assets/embedded/raw-*.webp), leaving a {{RAW:file}} token that build.py expands again.
Usage (from the repo root):  python tools/phase2.py ."""
import re, sys, json, base64, shutil, filecmp, pathlib, tempfile, subprocess
root = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else '.').resolve()
src = root/'src'; mpath = src/'manifest.json'; here = pathlib.Path(__file__).resolve().parent
PLAN = [
 {'file': '016-rpg-v4.js', 'dir': '016', 'cuts': [
   (1, 'core-part-a', ''), (297, 'part-b-cooking-carpentry-woodcutting', '/* ================= part B'),
   (631, 'part-c-fishing-mining-blacksmith', '/* ================= part C'), (749, 'part-d-icons-trade-timed-crafting', '/* ================= part D'),
   (939, 'part-e-combat-overhaul', '/* ================= part E'), (1121, 'part-f-woodcutting-market-square', '/* ================= part F'),
   (1295, 'part-g-living-farm-barn', '/* ================= part G'), (1502, 'imported-skill-tree-intro', '/* ===== Imported non-mining'),
   (1608, 'skill-tree', '/* ================= 1) SKILL'), (1760, 'woodcutting-forests', '/* ================= 3) WOODCUT'),
   (2014, 'v8-rebirth', '/* ===== v8 · woodcutting')]},
 {'file': '014-rpg-sprite-pack.js', 'dir': '014', 'cuts': [
   (1, 'sprite-pack-part-1', ''), (81, 'sprite-pack-part-2', '/* ====================')]},
]
mtext = mpath.read_text(encoding='utf-8'); man = json.loads(mtext)
def block_for(rel):
    return next((b for b in man['blocks'] if b.get('file') == rel), None)
def build(tag):
    out = pathlib.Path(tempfile.mkdtemp())/(tag+'.html')
    subprocess.run([sys.executable, str(here/'build.py'), str(root), str(out)], check=True, stdout=subprocess.DEVNULL)
    return out
# ---- plan + pre-checks (nothing is touched until every check has passed) ----
frag_jobs = []
for t in PLAN:
    b = block_for('scripts/'+t['file'])
    if b is None:
        if any(p.startswith('scripts/%s/' % t['dir']) for x in man['blocks'] for p in x.get('parts', [])): continue
        sys.exit('ABORT: %s not found in manifest' % t['file'])
    L = (src/b['file']).read_text(encoding='utf-8').split('\n')
    for ln, nm, pre in t['cuts']:
        if ln > len(L) or not L[ln-1].startswith(pre): sys.exit('ABORT: %s line %d does not start with %r (file differs from the one this tool was made for)' % (t['file'], ln, pre))
    frag_jobs.append((t, b, L))
RAW = re.compile(r'''(["'])([A-Za-z0-9+/=]{5000,})\1''')
raw_jobs = []
for b in man['blocks']:
    if 'file' in b and b['file'].endswith('.js') and b['tag'] == 'script':
        txt = (src/b['file']).read_text(encoding='utf-8'); hits = []
        for m in RAW.finditer(txt):
            try: raw = base64.b64decode(m.group(2), validate=True)
            except Exception: continue
            ext = 'webp' if raw[:4] == b'RIFF' and raw[8:12] == b'WEBP' else 'png' if raw[:8] == b'\x89PNG\r\n\x1a\n' else None
            if ext and base64.b64encode(raw).decode() == m.group(2): hits.append((m, raw, ext))
        if hits: raw_jobs.append((b, txt, hits))
if not frag_jobs and not raw_jobs: sys.exit('Nothing to do (phase 2 already applied).')
# ---- apply ----
before = build('before'); created = []; restore = {}
try:
    for b, txt, hits in raw_jobs:
        slug = re.sub(r'^\d+-', '', pathlib.Path(b['file']).stem); new = []; last = 0
        for k, (m, raw, ext) in enumerate(hits, 1):
            name = 'raw-%s-%d.%s' % (slug, k, ext); p = src/'assets'/'embedded'/name; p.write_bytes(raw); created.append(p)
            new += [txt[last:m.start(2)], '{{RAW:%s}}' % name]; last = m.end(2)
        new.append(txt[last:]); restore[src/b['file']] = txt; (src/b['file']).write_text(''.join(new), encoding='utf-8', newline='\n')
    for t, b, L in frag_jobs:
        d = src/'scripts'/t['dir']; d.mkdir(exist_ok=True); created.append(d); parts = []
        for i, (ln, nm, pre) in enumerate(t['cuts']):
            end = t['cuts'][i+1][0]-1 if i+1 < len(t['cuts']) else len(L)
            txt = '\n'.join(L[ln-1:end]) + ('\n' if i+1 < len(t['cuts']) else '')
            rel = 'scripts/%s/%02d-%s.js' % (t['dir'], i, nm); (src/rel).write_text(txt, encoding='utf-8', newline='\n'); parts.append(rel)
        if ''.join((src/p).read_text(encoding='utf-8') for p in parts) != '\n'.join(L): raise RuntimeError('%s: fragments do not reassemble' % t['file'])
        b['parts'] = parts; b['fragments'] = True; b.pop('file')
    mpath.write_text(json.dumps(man, indent=1), encoding='utf-8')
    if not filecmp.cmp(before, build('after'), shallow=False): raise RuntimeError('rebuilt game differs from the original')
except Exception as ex:
    for p in created:
        shutil.rmtree(p, ignore_errors=True) if p.is_dir() else p.unlink(missing_ok=True)
    for p, txt in restore.items(): p.write_text(txt, encoding='utf-8', newline='\n')
    mpath.write_text(mtext, encoding='utf-8'); sys.exit('ROLLED BACK: %s' % ex)
for t, b, L in frag_jobs: (src/'scripts'/t['file']).unlink()
note = root/'SPLIT.md'
if note.exists() and 'Phase 2' not in note.read_text(encoding='utf-8'):
    note.write_text(note.read_text(encoding='utf-8') + '\n## Phase 2 (big wrapped scripts)\n`src/scripts/016/` (rpg-v4) and `src/scripts/014/` (rpg-sprite-pack) are FRAGMENTS of one function each, cut at section banners, '
      'in order; build.py joins them into one script (not valid JS alone). The goblin atlases are real WebP files `src/assets/embedded/raw-*.webp`, referenced by `{{RAW:file}}` tokens. Never reorder the NN prefixes.\n', encoding='utf-8')
print('OK: %d script(s) cut into fragments, %d raw image(s) extracted; rebuilt game is byte-identical to the original.' % (len(frag_jobs), sum(len(h) for _, _, h in raw_jobs)))
