#!/usr/bin/env python3
"""Rebuild the single-file game from src/. Usage: build.py <repo-root> <output.html>"""
import re, sys, json, base64, pathlib
root = pathlib.Path(sys.argv[1]); outp = pathlib.Path(sys.argv[2])
src = root/'src'; man = json.loads((src/'manifest.json').read_text(encoding='utf-8'))
blocks = {b['n']: b for b in man['blocks']}; mimes = {b['name']: b['mime'] for b in man['blobs']}
h = (src/'index.template.html').read_text(encoding='utf-8')
h = re.sub(r'<!--@@BLOCK:(\d+)@@-->', lambda m: '<%s%s>%s</%s>' % (
    blocks[int(m.group(1))]['tag'], blocks[int(m.group(1))]['attrs'],
    (src/blocks[int(m.group(1))]['file']).read_text(encoding='utf-8'), blocks[int(m.group(1))]['tag']), h)
h = re.sub(r'\{\{BLOB:([^}]+)\}\}', lambda m: 'data:%s;base64,%s' % (
    mimes[m.group(1)], base64.b64encode((src/'assets'/'embedded'/m.group(1)).read_bytes()).decode()), h)
outp.write_text(h, encoding='utf-8', newline='')
print('built', outp, len(h), 'chars')
