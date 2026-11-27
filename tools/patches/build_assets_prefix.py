import pathlib, sys
p = pathlib.Path('tools/build.py')
s = p.read_bytes().decode('utf-8')
if 'assets-prefix' in s:
    print('already applied'); sys.exit(0)
E = "external = '--external-assets' in sys.argv"
R = "if external: h = re.sub(r'\\{\\{BLOB:([^}]+)\\}\\}', lambda m: 'src/assets/embedded/' + m.group(1), h)"
I1 = """h = h.replace(_a1, "const isData=h=>(h.length>40&&h.charCodeAt(0)===100&&h.startsWith('data:image/'))||h.startsWith('src/assets/embedded/');const FIT=" + _fit + ";")"""
I2 = """h = h.replace(_a2, "function measure(href,done){const f=href.startsWith('src/assets/embedded/')&&FIT[href.slice(20)];"""
for a in (E, R, I1, I2):
    if s.count(a) != 1:
        print('REFUSED: anchor count', s.count(a), a[:70]); sys.exit(1)
nl = '\r\n' if '\r\n' in s else '\n'
P = ("prefix = next((a.split('=', 1)[1] for a in sys.argv if a.startswith('--assets-prefix=')), 'src/assets/embedded/')" + nl +
     "if not prefix.endswith('/'): prefix += '/'" + nl +
     "if any(c in prefix for c in '\\'\"\\\\'): sys.exit('bad --assets-prefix')")
s = s.replace(E, E + nl + P)
s = s.replace(R, R.replace("'src/assets/embedded/' + m.group(1)", "prefix + m.group(1)"))
s = s.replace(I1, I1.replace("h.startsWith('src/assets/embedded/');const FIT=\" + _fit", "h.startsWith('\" + prefix + \"');const FIT=\" + _fit"))
s = s.replace(I2, I2.replace("href.startsWith('src/assets/embedded/')&&FIT[href.slice(20)]", "href.startsWith('\" + prefix + \"')&&FIT[href.slice(\" + str(len(prefix)) + \")]"))
p.write_bytes(s.encode('utf-8'))
print('OK: patched')
