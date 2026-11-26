'use strict';
const H = require('../lib/harness');
// Invariant for the goblin animations: while a foe attacks and is hit, the number of visible frame images never exceeds the
// idle baseline, and after the activity stops it settles on the baseline again (no frame is left drawn on top of another).
// atk=1 keeps a level-1 player alive for the whole run; max HP 900 keeps the foe alive through the player's hits.
const KINDS = [['Goblin', true], ['Goblin Archer', true], ['Goblin Shaman', true], ['Goblin Spear', true], ['Goblin Chief', false]];
module.exports = () => KINDS.map(([kind, mustAnimate]) => ({ name: 'anim.attack-hurt.' + kind.toLowerCase().replace(/ /g, '-'), run: async t => {
  const seed = await H.classSave(t.browser, t.game, 'mage');
  const g = await H.openGame(t.browser, t.game, { seed }); await H.enterGame(g.page); const p = g.page;
  await p.evaluate(n => { S.tab = 'fight'; startFight(mkFoe(n, 1)); render(); en = 100; fight.atk = 1; fight.max = fight.hp = 900; }, kind);
  const base = await H.firstLoadedImgs(p); const counts = [], sigs = new Set();
  for (let i = 0; i < 40; i++) {
    if (i === 10 || i === 20 || i === 30) { await p.evaluate(() => { en = 100; cd = 0; }); await H.clickForce(p, '.v4ab[data-a="power"]'); }
    counts.push(await H.visibleImgs(p)); sigs.add(await H.visibleImgSig(p)); await p.waitForTimeout(200);
  }
  const alive = await p.evaluate(() => !!fight);
  await p.evaluate(() => { fight.atk = 0; }); await p.waitForTimeout(2500);
  const fin = await H.settledImgs(p);
  H.assert(alive, 'the fight ended early (player or foe died): the scenario is invalid');
  H.assert(Math.max(...counts) <= base, 'more frames visible than the idle baseline ' + base + ': max ' + Math.max(...counts) + ' (series ' + counts.join('') + ')');
  H.assert(fin === base, 'after the attacks stopped ' + fin + ' frame(s) stay visible, baseline is ' + base);
  if (mustAnimate) H.assert(sigs.size >= 2, 'no animation frame ever changed in 8 s (the animation did not run)');
  H.assert(g.errors.length === 0, 'page errors: ' + g.errors[0]);
  await g.ctx.close(); } }));
