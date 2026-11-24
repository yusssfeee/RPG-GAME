'use strict';
const H = require('../lib/harness');
const CLASSES = ['warrior', 'tank', 'archer', 'mage', 'rogue', 'healer'];
module.exports = () => [
  { name: 'boot.fresh', run: async t => {
      const g = await H.openGame(t.browser, t.game);
      const f = await H.bootFacts(g.page);
      H.assert(g.errors.length === 0, 'page errors at boot: ' + g.errors[0]);
      H.assert(f.poster, 'title poster has no background image (late scripts did not run?)');
      H.assert(f.rebirth, 'Rebirth tab is missing');
      await g.ctx.close(); } },
  // Regression: saved class gear is registered by a LATE script; the main script used to crash at boot
  // (item('a') undefined -> maxSh() threw -> later scripts never ran: no art, no Rebirth, "old version").
  ...CLASSES.map(cls => ({ name: 'boot.class-gear.' + cls, run: async t => {
      const seed = await H.classSave(t.browser, t.game, cls);
      const g = await H.openGame(t.browser, t.game, { seed });
      const f = await H.bootFacts(g.page);
      const a = await g.page.evaluate(() => (item('a') || {}).id);
      H.assert(g.errors.length === 0, 'page errors with a ' + cls + ' save: ' + g.errors[0]);
      H.assert(f.poster && f.rebirth, 'boot incomplete with a ' + cls + ' save (poster=' + f.poster + ', rebirth=' + f.rebirth + ')');
      H.assert(a === 'a_start_' + cls, 'equipped armor resolved to ' + a);
      await g.ctx.close(); } })),
];
