'use strict';
const fs = require('fs');
const H = require('../lib/harness');

module.exports = () => [
  { name: 'death-hold.shared-render-guard', run: async t => {
      const source = fs.readFileSync(t.game, 'utf8');
      const callSites = source.match(/__RPG_DEATH_RENDER_GUARD\(/g) || [];
      H.assert(callSites.length === 4, 'expected all four death controllers to use the shared render guard; found ' + callSites.length);

      const g = await H.openGame(t.browser, t.game);
      const result = await g.page.evaluate(() => {
        const guard = window.__RPG_DEATH_RENDER_GUARD;
        if (typeof guard !== 'function') return { available: false };
        const calls = [];
        const receiver = { id: 'receiver' };
        const previousRender = function (arg) { calls.push(['render', this.id, arg]); return 'render-result'; };
        const wrapped = guard(previousRender, () => true, () => calls.push(['leave']), () => calls.push(['after']));

        S.tab = 'fight';
        const blocked = wrapped.call(receiver, 'fight');
        const whileHeld = calls.slice();

        S.tab = 'farm';
        const passed = wrapped.call(receiver, 'farm');
        return { available: true, blocked, whileHeld, passed, calls };
      });
      H.assert(result.available, 'shared render guard is not installed');
      H.assert(result.blocked === undefined, 'render was not held during the fight death animation');
      H.assert(result.whileHeld.length === 0, 'held render invoked a callback');
      H.assert(result.passed === 'render-result', 'render return value was not preserved');
      H.assert(JSON.stringify(result.calls) === JSON.stringify([
        ['leave'], ['render', 'receiver', 'farm'], ['after'],
      ]), 'render guard callbacks or arguments were not preserved: ' + JSON.stringify(result.calls));
      H.assert(g.errors.length === 0, 'page errors: ' + g.errors[0]);
      await g.ctx.close(); } },
];
