'use strict';
// Shared helpers for the headless (Playwright + Chromium) regression tests.
// The tests drive the real game file. They use a few game globals (S, FOES, mkFoe, startFight, render,
// fight, en, cd, CAB, item, save, IT) — see tests/README.md. Saves are generated from a fresh game,
// never from a person's real progress.
const path = require('path');
const { pathToFileURL } = require('url');

function loadPlaywright() {
  const tries = [process.env.PLAYWRIGHT_PATH, 'playwright'].filter(Boolean);
  for (const t of tries) { try { return require(t); } catch (e) { /* try next */ } }
  throw new Error('Playwright not found. Run "npm i playwright" (and "npx playwright install chromium"), or set PLAYWRIGHT_PATH to its folder.');
}
const assert = (cond, msg) => { if (!cond) throw new Error(msg); };

async function launch() { return loadPlaywright().chromium.launch(); }

// Open the game file. opts.seed = { localStorageKey: value } is written BEFORE the game's scripts run
// (seeding after load is overwritten by the game's pagehide autosave).
async function openGame(browser, gameFile, opts = {}) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  if (opts.seed) {
    await ctx.addInitScript(seed => {
      if (!sessionStorage.getItem('__seeded')) {
        localStorage.clear();
        for (const k in seed) localStorage.setItem(k, seed[k]);
        sessionStorage.setItem('__seeded', '1');
      }
    }, opts.seed);
  }
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(String(e.message).slice(0, 160)));
  await page.goto(pathToFileURL(path.resolve(gameFile)).href, { waitUntil: 'load', timeout: 120000 });
  await page.waitForFunction(() => typeof S !== 'undefined' && typeof startFight === 'function', null, { timeout: 30000 }).catch(() => {});
  await page.waitForTimeout(1500);
  return { ctx, page, errors };
}

// Title screen -> slot chooser -> Continue on the given slot. The combat loop only runs once #intro is hidden.
async function enterGame(page, slot = 1) {
  await page.click('#intro button.go');
  await page.waitForSelector('text=▶ Continue', { timeout: 10000 });
  await page.locator('text=▶ Continue').nth(slot - 1).click();
  await page.waitForFunction(() => document.getElementById('intro').hidden === true, null, { timeout: 10000 });
  await page.waitForTimeout(800);
}

// Build a synthetic save from a fresh game. `mutate` is JS source run in the page (it may change S).
// Returns a localStorage map ready to be used as opts.seed. activeSlot is 1.
async function makeSave(browser, gameFile, mutate) {
  const { ctx, page } = await openGame(browser, gameFile);
  await page.evaluate(src => { new Function(src)(); activeSaveSlot = 1; save(); }, mutate);
  const map = await page.evaluate(() => { const o = {}; for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); o[k] = localStorage.getItem(k); } return o; });
  await ctx.close();
  map['tinyacre-active-slot'] = '1';
  return map;
}
const classSave = (browser, game, cls) => makeSave(browser, game,
  `S.cls=${JSON.stringify(cls)};S.eq={w:'w_start_${cls}',a:'a_start_${cls}',p:'p_stone'};`);

// harmless=true sets the foe's attack to 0 so a level-1 player survives the long waits (e.g. the Goblin King kills them in ~3 s).
const startFoe = (page, name, maxHp, harmless) => page.evaluate(([n, m, h]) => {
  S.tab = 'fight'; startFight(mkFoe(n, 1)); render(); en = 100;
  if (m) { fight.max = m; fight.hp = m; }
  if (h) fight.atk = 0;
}, [name, maxHp || 0, !!harmless]);
// Real click on the Power button (calling strike() directly does not redraw, the click handler does).
const killByClick = async (page, maxHp) => {
  await page.evaluate(m => { if (m) fight.max = m; fight.hp = 1; en = 100; cd = 0; }, maxHp || 0);
  await page.locator('.v4ab[data-a="power"]').first().click({ timeout: 3000 });
};
// Mage burn: the Arcane Burst ability sets a burn that finishes the foe inside combatTick.
const killByBurn = page => page.evaluate(() => { fight.hp = fight.max; en = 100; CAB.use(); fight.hp = 1; });

const visibleImgs = page => page.evaluate(() => {
  const stg = document.getElementById('stg') || document.body;
  const vis = e => { const r = e.getBoundingClientRect(), cs = getComputedStyle(e);
    return r.width > 2 && r.height > 2 && cs.visibility !== 'hidden' && cs.display !== 'none' && parseFloat(cs.opacity) > 0.05; };
  return [...stg.querySelectorAll('img')].filter(vis).length;
});
// Visible-image count once it has stopped changing (first use of an animation decodes frames asynchronously,
// so a fixed wait gives 0 on a cold start and 1 later). Polls every 250 ms, needs 4 equal reads in a row, max 7 s.
async function settledImgs(page) {
  let last = -1, same = 0;
  for (let i = 0; i < 28; i++) {
    const c = await visibleImgs(page);
    same = c === last ? same + 1 : 0; last = c;
    if (same >= 3 && i >= 4) return c;
    await page.waitForTimeout(250);
  }
  return last;
}
// Baseline for a freshly spawned foe: wait (max 8 s) until at least one image is drawn. Frames of an animation are
// decoded asynchronously on first use and can take seconds under load; kinds drawn with CSS sprites stay at 0.
async function firstLoadedImgs(page) {
  for (let i = 0; i < 32; i++) {
    const c = await visibleImgs(page);
    if (c >= 1) { await page.waitForTimeout(500); return visibleImgs(page); }
    await page.waitForTimeout(250);
  }
  return 0;
}
// Some game buttons float/animate all the time (e.g. the mining ore), so Playwright never sees them as "stable".
// A forced click still lands on the element (it is the topmost element at its centre).
const clickForce = (page, selector) => page.locator(selector).first().click({ force: true, timeout: 2500 });
const paneText = page => page.evaluate(() => (document.getElementById('pane') || document.body).innerText.replace(/\s+/g, ' ').trim());
// Which animation frames are drawn right now: the lengths of the visible <img> sources (cheap fingerprint).
const visibleImgSig = page => page.evaluate(() => {
  const stg = document.getElementById('stg') || document.body;
  const vis = e => { const r = e.getBoundingClientRect(), cs = getComputedStyle(e);
    return r.width > 2 && r.height > 2 && cs.visibility !== 'hidden' && cs.display !== 'none' && parseFloat(cs.opacity) > 0.05; };
  return [...stg.querySelectorAll('img')].filter(vis).map(i => i.src.length).join(',');
});
const invTotal = page => page.evaluate(() => Object.values(S.inv || {}).reduce((a, b) => a + (+b || 0), 0));
const pageText = page => page.evaluate(() => document.body.innerText);
const bootFacts = page => page.evaluate(() => ({
  poster: !!((document.getElementById('poster') || { style: {} }).style.backgroundImage),
  rebirth: !!document.querySelector('[data-k="reb"]'),
  scripts: document.scripts.length,
}));

module.exports = { clickForce, paneText, visibleImgSig, invTotal, assert, launch, openGame, enterGame, makeSave, classSave, startFoe, killByClick, killByBurn, visibleImgs, settledImgs, firstLoadedImgs, pageText, bootFacts };
