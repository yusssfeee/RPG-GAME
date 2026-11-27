import pathlib, re, sys
p = pathlib.Path('GOALS.md')
s = p.read_bytes().decode('utf-8')
if 'Status (2026-11-28)' in s:
    print('already applied'); sys.exit(0)
nl = '\r\n' if '\r\n' in s else '\n'
blk = pathlib.Path('tools/patches/g2_block_a.txt').read_text(encoding='utf-8').rstrip()
blk += "\n**NOT MEASURED:** load time; `http` / GitHub Pages; desktop Chrome (only Chromium); classes other than mage; icons that appear during fights; why the light build's icon cache holds 28 entries instead of 224 (fit counts are equal, so it may be harmless, unverified); browser load with `--assets-prefix=./assets`; bot 'possible issues' never expanded."
blk += "\n**Corrections:** the `isData` length threshold is 40 (not 400); there are 19 tabs (not 20).\n"
H = re.compile(r'(### G2 .{1,3} Light build for publishing\s+)`\[ \]`')
T1 = "- [ ] Make `rpg-icon-autofit` work with external images, or prove it is not needed."
T2 = "- [ ] Add the build mode and test the light build over `http` as well as `file://`."
D = "**Done when:** the light build plays the same as the canonical file"
if len(H.findall(s)) != 1 or s.count(T1) != 1 or s.count(T2) != 1 or s.count(D) != 1:
    print('REFUSED:', len(H.findall(s)), s.count(T1), s.count(T2), s.count(D)); sys.exit(1)
s = H.sub(lambda m: m.group(1) + '`[~]`', s)
s = s.replace(T1, T1.replace('[ ]', '[x]'))
s = s.replace(T2, T2.replace('[ ]', '[~]') + ' (`file://` tested; `http` not yet)')
s = s.replace(D, blk.replace('\n', nl) + nl + D)
p.write_bytes(s.encode('utf-8'))
print('OK: patched')
