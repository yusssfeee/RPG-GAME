
/* Fishing scene HUD and discovery journal.
   Keeps the existing pond timers, spot states, pools and catch/reward math intact. */
(function rpgFishingLiveHudAndDiscovery(){
  'use strict';
  if (window.__rpgFishingHudReady) return;
  if (typeof VIEWS === 'undefined' || typeof VIEWS.fish !== 'function' || typeof poolFish !== 'function' || typeof fIcon !== 'function') return;
  window.__rpgFishingHudReady = true;

  const isKnown = f => !!(S && S.fishSeen && S.fishSeen[f.id]) || (typeof inv === 'function' && inv(f.id) > 0);
  const catalogMarkup = () => {
    const fish = poolFish().slice();
    const knownCount = fish.filter(isKnown).length;
    const entries = fish.map(f => {
      const known = isKnown(f);
      return `<div class="pond-fish-entry ${known?'known':'unknown'}" data-fish-entry="${f.id}" aria-label="${known?f.n:'Undiscovered fish'}">
        <span class="pond-fish-icon">${fIcon(f,'ic')}</span>
        <span class="pond-fish-label">${known?f.n:'???'}</span>
        ${known?'<span class="pond-fish-check">✓</span>':'<span class="pond-fish-lock">?</span>'}
      </div>`;
    }).join('');
    return `<aside class="pond-fish-catalog" aria-label="Fish that can be caught here">
      <div class="pond-fish-catalog-head"><b>FISH</b><small>${knownCount}/${fish.length} found</small></div>
      <div class="pond-fish-catalog-list">${entries || '<small class="pond-fish-empty">No fish available at this level</small>'}</div>
    </aside>`;
  };
  const refreshCatalog = () => {
    const root = document.querySelector('.pond-fish-catalog');
    if (!root) return;
    const holder = document.createElement('div');
    holder.innerHTML = catalogMarkup();
    const next = holder.firstElementChild;
    if (next) root.replaceWith(next);
  };
  const markKnown = id => {
    if (!id || !Array.isArray(FISH) || !FISH.some(f => f.id === id)) return;
    if (!S.fishSeen || typeof S.fishSeen !== 'object') S.fishSeen = {};
    if (!S.fishSeen[id]) {
      S.fishSeen[id] = true;
      try { if (typeof save === 'function') save(); } catch (_) {}
      refreshCatalog();
    }
  };

  // Wrap the established fishing view only; leave map markup and pond simulation untouched.
  const baseFishView = VIEWS.fish;
  VIEWS.fish = function(){
    let html = baseFishView.apply(this, arguments);
    if (typeof html !== 'string') return html;
    // The right-side discovery catalog replaces the legacy fish-name strip below the water scene.
    // Remove only that old list; keep the side catalog, pond scene, meter and fishing simulation.
    html = html.replace(/<div class="pnd-loot">[\s\S]*?<\/div>/g, '');
    if (!html.includes('<div id="lake"></div>') || !html.includes('class="pnd-meter"')) return html;
    const meterMatch = html.match(/<div class="pnd-meter">[\s\S]*?<\/div><\/div>/);
    if (!meterMatch) return html;
    const meter = meterMatch[0];
    html = html.replace(meter, '');
    const overlays = `<div class="pond-live-meter">${meter}</div>${catalogMarkup()}`;
    html = html.replace('<div id="lake"></div>', `<div id="lake"></div>${overlays}`);
    return html;
  };

  // New catches permanently reveal their silhouette, even after the fish is consumed or sold.
  if (typeof catchFish === 'function' && !catchFish.__pondDiscoveryWrapped) {
    const originalCatchFish = catchFish;
    const wrappedCatchFish = function(key){
      const fishId = String(key || '').split(':').pop();
      const result = originalCatchFish.apply(this, arguments);
      markKnown(fishId);
      return result;
    };
    wrappedCatchFish.__pondDiscoveryWrapped = true;
    catchFish = wrappedCatchFish;
  }

  // Treasure/rare/school fishing rewards also count as first discoveries.
  if (typeof V4 !== 'undefined' && typeof V4.spotReward === 'function' && !V4.spotReward.__pondDiscoveryWrapped) {
    const originalSpotReward = V4.spotReward;
    const wrappedSpotReward = function(){
      const result = originalSpotReward.apply(this, arguments);
      FISH.forEach(f => { if (typeof inv === 'function' && inv(f.id) > 0) markKnown(f.id); });
      return result;
    };
    wrappedSpotReward.__pondDiscoveryWrapped = true;
    V4.spotReward = wrappedSpotReward;
  }

  // Backfill old saves: fish already present in inventory are considered discovered.
  try {
    if (!S.fishSeen || typeof S.fishSeen !== 'object') S.fishSeen = {};
    FISH.forEach(f => { if (inv(f.id) > 0) S.fishSeen[f.id] = true; });
  } catch (_) {}

  const style = document.createElement('style');
  style.id = 'rpg-fishing-live-hud-style';
  style.textContent = `
  .rpg-fish-stage{--pond-catalog-w:clamp(66px,23vw,92px)}
  .pond-live-meter{position:absolute;z-index:8;left:10px;right:calc(var(--pond-catalog-w) + 17px);top:59px;pointer-events:none}
  .pond-live-meter .pnd-meter{margin:0;padding:6px 8px;border:1px solid #b7dbe5;border-radius:9px;background:linear-gradient(105deg,#061c2deF,#0b3040d9);box-shadow:0 4px 12px #0006}
  .pond-live-meter .pnd-mlab{font-size:10px;line-height:1.15;margin-bottom:4px;text-shadow:0 1px 3px #000}
  .pond-live-meter .pnd-mlab span:first-child{max-width:72%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .pond-live-meter .pnd-mlab span:last-child{white-space:nowrap;color:#ffe3a4}
  .pond-live-meter .pnd-mbar{height:8px;border-radius:8px;overflow:hidden}
  .pond-live-meter .pnd-mbar i{display:block;height:100%;border-radius:8px}
  .pond-fish-catalog{position:absolute;z-index:8;top:82px;right:7px;bottom:9px;width:var(--pond-catalog-w);display:flex;flex-direction:column;gap:5px;padding:6px 5px;border:1px solid #c1d6db;border-radius:10px;background:linear-gradient(155deg,#071e2cE8,#071421F2);box-shadow:0 5px 15px #0007;pointer-events:none;overflow:hidden}
  .pond-fish-catalog-head{display:flex;flex-direction:column;gap:2px;padding:0 2px 4px;border-bottom:1px solid #d3e4e455;text-align:center}
  .pond-fish-catalog-head b{font:900 9px/1 Georgia,serif;letter-spacing:1.3px;color:#ffe4a5}
  .pond-fish-catalog-head small{font-size:8px;color:#b9d5df}
  .pond-fish-catalog-list{display:flex;flex-direction:column;gap:5px;min-height:0;overflow:hidden}
  .pond-fish-entry{position:relative;min-height:35px;display:flex;align-items:center;gap:4px;padding:3px 4px;border:1px solid #7fa3b355;border-radius:7px;background:#17384caa;overflow:hidden}
  .pond-fish-icon{width:25px;height:25px;flex:none;display:grid;place-items:center;border-radius:6px;background:#0a2132;border:1px solid #9bc5d344}
  .pond-fish-icon .ic{width:20px;height:20px}
  .pond-fish-entry.unknown .pond-fish-icon .ic{filter:brightness(0) invert(1) opacity(.38)}
  .pond-fish-label{min-width:0;flex:1;font-size:8px;line-height:1.1;color:#e1f1f5;overflow-wrap:anywhere}
  .pond-fish-entry.unknown .pond-fish-label{font-size:10px;font-weight:900;letter-spacing:1px;color:#a8c5d0}
  .pond-fish-check{color:#78e2ba;font-size:10px;font-weight:900}.pond-fish-lock{width:12px;height:12px;flex:none;display:grid;place-items:center;border-radius:50%;background:#496376;color:#e7f6fa;font-size:8px;font-weight:900}
  .pond-fish-empty{font-size:8px;line-height:1.25;color:#d0e2e8;text-align:center}
  .pond-stage-banner{right:calc(var(--pond-catalog-w) + 17px);max-width:none}
  .rpg-fish-stage #lake{right:calc(var(--pond-catalog-w) + 8px);width:auto}
  @media(max-width:380px){
    .rpg-fish-stage{--pond-catalog-w:66px}
    .pond-live-meter{left:7px;right:calc(var(--pond-catalog-w) + 14px);top:57px}
    .pond-live-meter .pnd-meter{padding:5px 6px}.pond-live-meter .pnd-mlab{font-size:9px}
    .pond-fish-catalog{right:5px;top:80px;bottom:8px;padding:5px 4px;gap:4px}
    .pond-fish-entry{min-height:32px;gap:3px;padding:2px}.pond-fish-icon{width:22px;height:22px}.pond-fish-icon .ic{width:18px;height:18px}.pond-fish-label{font-size:7px}
    .pond-stage-banner{left:7px;top:7px;padding:6px 7px}
  }
  @media(prefers-reduced-motion:reduce){.pond-fish-entry,.pond-fish-icon{transition:none!important}}
  `;
  document.head.appendChild(style);
})();
