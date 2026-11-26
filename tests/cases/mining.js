'use strict';
const H = require('../lib/harness');
module.exports = () => [
  // Mining through the real UI: pick the Quarry on the map, hit the vein until it breaks, ore must land in the backpack.
  // (Random creature encounters can appear: if one does, engage it and win it.)
  { name: 'mining.gather-yields-ore', run: async t => {
      const seed = await H.classSave(t.browser, t.game, 'mage');
      const g = await H.openGame(t.browser, t.game, { seed }); await H.enterGame(g.page); const p = g.page;
      await p.evaluate(() => { S.tab = 'mine'; render(); }); await p.waitForTimeout(500);
      await p.locator('[data-mine="cave"][data-i="0"]').first().click(); await p.waitForTimeout(800);
      let hitsDrop = false, collected = 0, gathers = 0, fights = 0, prevHits = null;
      for (let i = 0; i < 80 && collected < 2; i++) {
        const s = await p.evaluate(() => { const m = (document.getElementById('pane').innerText.replace(/\s+/g, ' ').match(/Hits left: ([\d.]+)\//));
          return { fight: !!fight, tab: S.tab, hits: m ? +m[1] : null,
                   acts: [...new Set([...document.querySelectorAll('#pane [data-mine]')].filter(e => e.offsetParent).map(e => e.dataset.mine))] }; });
        if (s.fight) { await p.evaluate(() => { if (fight) fight.atk = 0; }); await H.killByClick(p); fights++; await p.waitForTimeout(1500); continue; }
        if (s.tab !== 'mine') { await p.evaluate(() => { S.tab = 'mine'; render(); }); await p.waitForTimeout(500); continue; }
        if (s.hits !== null && prevHits !== null && s.hits < prevHits) hitsDrop = true;
        prevHits = s.hits;
        if (s.acts.includes('engage')) { await H.clickForce(p, '[data-mine="engage"]'); await p.waitForTimeout(500); continue; }
        if (!s.acts.includes('gather')) { await p.waitForTimeout(500); continue; }
        const before = await H.invTotal(p);
        await H.clickForce(p, '[data-mine="gather"]'); gathers++; await p.waitForTimeout(450);
        const fightNow = await p.evaluate(() => !!fight);
        if (!fightNow && (await H.invTotal(p)) > before) collected++;
      }
      H.assert(gathers > 0, 'the gather button could not be used');
      H.assert(hitsDrop, 'gathering never reduced the vein "Hits left" counter');
      H.assert(collected >= 1, 'no ore reached the backpack after ' + gathers + ' gathers');
      H.assert(g.errors.length === 0, 'page errors: ' + g.errors[0]);
      await g.ctx.close(); } },
];
