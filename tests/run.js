#!/usr/bin/env node
'use strict';
// Usage: node tests/run.js [--game "Project X.html"] [--only substring] [--jobs 3] [--full] [--list]
const fs = require('fs'), path = require('path');
const H = require('./lib/harness');
const args = process.argv.slice(2);
const opt = (n, d) => { const i = args.indexOf('--' + n); return i >= 0 && args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : d; };
const game = opt('game', path.join(__dirname, '..', 'Project X.html'));
const only = opt('only', ''), jobs = +opt('jobs', 3), full = args.includes('--full');
const cases = fs.readdirSync(path.join(__dirname, 'cases')).filter(f => f.endsWith('.js')).sort()
  .flatMap(f => require('./cases/' + f)({ full })).filter(c => c.name.includes(only));
if (args.includes('--list')) { cases.forEach(c => console.log(c.name)); process.exit(0); }
if (!fs.existsSync(game)) { console.error('Game file not found: ' + game); process.exit(2); }
(async () => {
  const browser = await H.launch(); const results = []; let next = 0; const t0 = Date.now();
  const worker = async () => {
    while (next < cases.length) {
      const c = cases[next++]; const t1 = Date.now(); let err = null;
      try { await Promise.race([c.run({ browser, game }), new Promise((_, rej) => setTimeout(() => rej(new Error('timeout after 120 s')), 120000))]); }
      catch (e) { err = e.message.split('\n')[0]; }
      results.push({ name: c.name, ok: !err, err }); 
      console.log((err ? 'FAIL ' : 'PASS ') + c.name.padEnd(40) + ((Date.now() - t1) / 1000).toFixed(1).padStart(6) + 's' + (err ? '\n       -> ' + err : ''));
    }
  };
  await Promise.all(Array.from({ length: Math.max(1, jobs) }, worker));
  await browser.close();
  const bad = results.filter(r => !r.ok);
  console.log('\n' + (results.length - bad.length) + ' passed, ' + bad.length + ' failed, ' + results.length + ' total in ' + ((Date.now() - t0) / 1000).toFixed(0) + ' s  [' + path.basename(game) + ']');
  process.exit(bad.length ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
