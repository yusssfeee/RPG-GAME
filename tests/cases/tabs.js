'use strict';
const H = require('../lib/harness');
module.exports = () => [
  // Smoke test: every tab view (fishing, mining, smithing, alchemy, trade, woodcutting, ..., Rebirth) can be rendered.
  { name: 'tabs.render-all', run: async t => {
      const seed = await H.classSave(t.browser, t.game, 'mage');
      const g = await H.openGame(t.browser, t.game, { seed }); await H.enterGame(g.page);
      const keys = await g.page.evaluate(() => Object.keys(VIEWS));
      H.assert(keys.length >= 15, 'only ' + keys.length + ' tab views are registered');
      for (const k of keys) {
        const before = g.errors.length;
        try { await g.page.evaluate(k => { S.tab = k; render(); }, k); }
        catch (e) { throw new Error('rendering tab "' + k + '" threw: ' + e.message.split('\n')[0].slice(0, 120)); }
        await g.page.waitForTimeout(250);
        const len = (await H.paneText(g.page)).length;
        H.assert(len > 40, 'tab "' + k + '" rendered almost nothing (' + len + ' characters)');
        H.assert(g.errors.length === before, 'page error while rendering tab "' + k + '": ' + g.errors[before]);
      }
      await g.ctx.close(); } },
];
