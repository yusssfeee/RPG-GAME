import pathlib, sys
p = pathlib.Path('tools/build.py')
s = p.read_bytes().decode('utf-8')
OLD = """if any(c in prefix for c in '\\'"\\\\'): sys.exit('bad --assets-prefix')"""
NEW = """if not re.fullmatch(r'[A-Za-z0-9_./-]+', prefix): sys.exit('bad --assets-prefix (allowed: letters, digits, _ . / -)')"""
if NEW in s:
    print('already applied'); sys.exit(0)
if s.count(OLD) != 1:
    print('REFUSED: anchor count', s.count(OLD)); sys.exit(1)
p.write_bytes(s.replace(OLD, NEW).encode('utf-8'))
print('OK: patched')
