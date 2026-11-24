'use strict';
const H = require('../lib/harness');
// A unique max HP (777) makes the foe's HP header recognisable: after the foe is gone, "/ 777" must not stay on screen.
const STALE = '/ 777';
module.exports = () => [
  // Regression: a foe killed by the mage's burn reached 0 HP but stayed on screen (combatTick called foeDown() without render()).
  { name: 'kill.burn-clears-foe', run: async t => {
      const seed = await H.classSave(t.browser, t.game, 'mage');
      const g = await H.openGame(t.browser, t.game, { seed }); await H.enterGame(g.page);
      await H.startFoe(g.page, 'Slime', 777); await g.page.waitForTimeout(800);
      await H.killByBurn(g.page); await g.page.evaluate(() => { fight.max = 777; });
      await g.page.waitForTimeout(2500);
      const s = await g.page.evaluate(() => ({ fight: !!fight, kills: S.kills, text: document.body.innerText }));
      H.assert(!s.fight, 'fight is still active after the burn kill');
      H.assert(!s.text.includes(STALE), 'the dead foe is still drawn on screen (stale HP header "' + STALE + '")');
      H.assert(g.errors.length === 0, 'page errors: ' + g.errors[0]);
      await g.ctx.close(); } },
  { name: 'kill.click-clears-foe', run: async t => {
      const seed = await H.classSave(t.browser, t.game, 'mage');
      const g = await H.openGame(t.browser, t.game, { seed }); await H.enterGame(g.page);
      await H.startFoe(g.page, 'Slime', 777); await g.page.waitForTimeout(800);
      const before = await g.page.evaluate(() => ({ kills: S.kills, coins: S.coins }));
      await H.killByClick(g.page, 777); await g.page.waitForTimeout(2500);
      const s = await g.page.evaluate(() => ({ fight: !!fight, kills: S.kills, coins: S.coins, text: document.body.innerText }));
      H.assert(!s.fight, 'fight is still active after the click kill');
      H.assert(s.kills === before.kills + 1, 'kills ' + before.kills + ' -> ' + s.kills + ' (expected +1)');
      H.assert(s.coins > before.coins, 'no coins awarded');
      H.assert(!s.text.includes(STALE), 'the dead foe is still drawn on screen');
      H.assert(g.errors.length === 0, 'page errors: ' + g.errors[0]);
      await g.ctx.close(); } },
];
