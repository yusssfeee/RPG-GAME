#!/usr/bin/env python3
"""Rebuild the single-file game from src/.
Usage: build.py <repo-root> <output.html> [--separate]
  --separate : emit every part of a split script as its own <script> tag (for testing that the
               split works when files are loaded separately). Default: parts are joined back into
               one <script>, so the output is byte-identical to the original single file."""
import re, sys, json, base64, pathlib
args = [a for a in sys.argv[1:] if not a.startswith('--')]; separate = '--separate' in sys.argv
root = pathlib.Path(args[0]); outp = pathlib.Path(args[1])
src = root/'src'; man = json.loads((src/'manifest.json').read_text(encoding='utf-8'))
blocks = {b['n']: b for b in man['blocks']}; mimes = {b['name']: b['mime'] for b in man['blobs']}
def bodies(b):
    if 'parts' in b: return [(src/p).read_text(encoding='utf-8') for p in b['parts']]
    return [(src/b['file']).read_text(encoding='utf-8')]
def block_html(b):
    if separate and 'parts' in b:
        return ''.join('<%s%s>%s</%s>' % (b['tag'], b['attrs'], t, b['tag']) for t in bodies(b))
    return '<%s%s>%s</%s>' % (b['tag'], b['attrs'], ''.join(bodies(b)), b['tag'])
h = (src/'index.template.html').read_text(encoding='utf-8')
h = re.sub(r'<!--@@BLOCK:(\d+)@@-->', lambda m: block_html(blocks[int(m.group(1))]), h)
h = re.sub(r'\{\{BLOB:([^}]+)\}\}', lambda m: 'data:%s;base64,%s' % (
    mimes[m.group(1)], base64.b64encode((src/'assets'/'embedded'/m.group(1)).read_bytes()).decode()), h)
outp.write_text(h, encoding='utf-8', newline='')
print('built', outp, len(h), 'chars', '(separate scripts)' if separate else '')
