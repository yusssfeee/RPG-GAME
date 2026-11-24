'use strict';
const H = require('../lib/harness');
// Regression: after a Goblin / Goblin Archer died, its last death frame (cached <img>, opacity 1) stayed visible
// on top of the NEXT goblin. Generic check: the settled number of visible images for a freshly spawned foe must not grow.
const MUST = ['Goblin', 'Goblin Archer'];
const OTHERS = ['Goblin Shaman', 'Goblin Spear', 'Goblin Chief', 'Goblin King', 'Goblin Alchemist', 'Slime'];
function ghostCase(kind, rounds, gap) {
  return { name: 'ghost.' + kind.toLowerCase().replace(/ /g, '-') + '.gap' + gap, run: async t => {
    const seed = await H.classSave(t.browser, t.game, 'mage');
    const g = await H.openGame(t.browser, t.game, { seed }); await H.enterGame(g.page);
    const counts = [];
    for (let r = 1; r <= rounds; r++) {
      await H.startFoe(g.page, kind, 0, true);
      counts.push(r === 1 ? await H.firstLoadedImgs(g.page) : await H.settledImgs(g.page));
      await H.killByClick(g.page); await g.page.waitForTimeout(gap);
    }
    H.assert(counts.every(c => c === counts[0]), 'visible images per spawn changed between rounds: [' + counts.join(', ') + '] (a ghost of the previous foe is drawn)');
    H.assert(g.errors.length === 0, 'page errors: ' + g.errors[0]);
    await g.ctx.close(); } };
}
module.exports = ({ full }) => [
  ...MUST.flatMap(k => [ghostCase(k, 3, 2500), ghostCase(k, 3, 300)]),
  ...OTHERS.map(k => ghostCase(k, full ? 4 : 2, 2000)),
];
