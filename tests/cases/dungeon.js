'use strict';
const H = require('../lib/harness');
module.exports = () => [
  // A whole Slime Cave through the real UI: kill -> room counter +1 -> door -> next foe ... -> exit.
  { name: 'dungeon.slime-cave-completes', run: async t => {
      const seed = await H.classSave(t.browser, t.game, 'mage');
      const g = await H.openGame(t.browser, t.game, { seed }); await H.enterGame(g.page); const p = g.page;
      await p.evaluate(() => { S.dg = { id: 'slime', room: 0 }; S.tab = 'fight'; startFight(mkFoe('Slime', 1)); render(); en = 100; fight.atk = 0; });
      const coins0 = await p.evaluate(() => S.coins);
      let fights = 0, done = false, exited = false;
      for (let i = 0; i < 40 && !done; i++) {
        const s = await p.evaluate(() => ({ fight: !!fight, room: S.dg && S.dg.room, dg: !!S.dg,
          acts: [...document.querySelectorAll('[data-a]')].filter(e => e.offsetParent).map(e => e.dataset.a) }));
        if (!s.dg && !s.fight) { done = true; break; }
        if (s.fight) {
          await p.evaluate(() => { if (fight) fight.atk = 0; });
          await H.killByClick(p); fights++; await p.waitForTimeout(1600);
          const r = await p.evaluate(() => S.dg && S.dg.room);
          H.assert(r === s.room + 1, 'after fight #' + fights + ' the room counter went ' + s.room + ' -> ' + r + ' (expected +1)');
          continue;
        }
        if (s.acts.includes('dgdoor')) { await p.locator('[data-a="dgdoor"]').first().click(); await p.waitForTimeout(900); continue; }
        if (s.acts.includes('dgout')) { await p.locator('[data-a="dgout"]').first().click(); exited = true; await p.waitForTimeout(900); continue; }
        await p.waitForTimeout(500);
      }
      const coins1 = await p.evaluate(() => S.coins);
      H.assert(done, 'the dungeon did not finish within 40 steps');
      H.assert(fights >= 3, 'only ' + fights + ' fights in the Slime Cave (expected at least 3)');
      H.assert(exited, 'the exit button (dgout) was never offered');
      H.assert(coins1 > coins0, 'no coins earned in the dungeon (' + coins0 + ' -> ' + coins1 + ')');
      H.assert(g.errors.length === 0, 'page errors: ' + g.errors[0]);
      await g.ctx.close(); } },
];
