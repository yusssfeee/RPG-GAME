'use strict';
const H = require('../lib/harness');
module.exports = () => [
  // The game autosaves on pagehide; the next load hydrates that save. A fight + reload must boot cleanly.
  { name: 'save.reload-after-fight', run: async t => {
      const seed = await H.classSave(t.browser, t.game, 'mage');
      const g = await H.openGame(t.browser, t.game, { seed }); await H.enterGame(g.page);
      await H.startFoe(g.page, 'Slime'); await g.page.waitForTimeout(800);
      await H.killByClick(g.page); await g.page.waitForTimeout(2000);
      await g.page.reload({ waitUntil: 'load' }); await g.page.waitForTimeout(2500);
      const f = await H.bootFacts(g.page);
      H.assert(g.errors.length === 0, 'page errors after reload: ' + g.errors[0]);
      H.assert(f.poster && f.rebirth, 'boot incomplete after reload (poster=' + f.poster + ', rebirth=' + f.rebirth + ')');
      await g.ctx.close(); } },
];
