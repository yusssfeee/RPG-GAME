// Measures every icon once and writes src/icon-fit.json (name -> [x0,x1,y0,y1,ar,dens]).
// Run from the repo root: node tools/measure_icons.js
const path = require('path'), fs = require('fs');
const root = path.resolve(__dirname, '..');
const { chromium } = require(path.join(root, 'tests', 'node_modules', 'playwright'));
const H = require(path.join(root, 'tests', 'lib', 'harness'));
const sig = s => s.length + ':' + s.slice(60, 120) + s.slice(s.length >> 1, (s.length >> 1) + 60) + s.slice(-60);
(async () => {
  const man = JSON.parse(fs.readFileSync(path.join(root, 'src', 'manifest.json'), 'utf8'));
  const dir = path.join(root, 'src', 'assets', 'embedded');
  const bySig = new Map();
  for (const b of man.blobs) {
    const s = 'data:' + b.mime + ';base64,' + fs.readFileSync(path.join(dir, b.name)).toString('base64');
    bySig.set(sig(s), b.name);
  }
  const browser = await chromium.launch();
  const game = path.join(root, 'Project X.html');
  const seed = await H.classSave(browser, game, 'mage');
  const g = await H.openGame(browser, game, { seed });
  await H.enterGame(g.page);
  await g.page.waitForTimeout(4000);
  const entries = await g.page.evaluate(() => [...window.__rpgIconFit.cache.entries()]);
  await g.ctx.close(); await browser.close();
  const fit = {}; let unmatched = 0, failed = 0;
  for (const [k, v] of entries) {
    if (!v) { failed++; continue; }
    const name = bySig.get(k);
    if (!name) { unmatched++; continue; }
    fit[name] = [v.x0, v.x1, v.y0, v.y1, v.ar, v.dens];
  }
  const names = Object.keys(fit).sort();
  const out = { version: 1, order: ['x0', 'x1', 'y0', 'y1', 'ar', 'dens'], fit: {} };
  for (const n of names) out.fit[n] = fit[n];
  fs.writeFileSync(path.join(root, 'src', 'icon-fit.json'), JSON.stringify(out) + '\n');
  console.log('entries', entries.length, '| written', names.length, '| unmatched (left to live measuring)', unmatched, '| failed', failed);
})().catch(e => { console.log('ERROR', e.message); process.exit(1); });
