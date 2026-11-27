
/* Fishing waters map + polished fishing entry flow. The four existing ZF waters,
   their unlock levels, fish pools, rewards and pond minigame are unchanged. */
(function rpgFishingWaterMap(){
  'use strict';
  if (window.__rpgFishingWaterMapReady) return;
  if (typeof VIEWS === 'undefined' || typeof VIEWS.fish !== 'function' || typeof ZF === 'undefined' || !Array.isArray(ZF)) return;

  const originalFishingView = VIEWS.fish;
  let fishingScreen = 'map';
  const places = [
    {name:'Pond', title:'Pond', subtitle:'Reeds • calm water', desc:'Small fish gather near the reeds.', icon:'fish', color:'#86d9e8', pos:[24,25]},
    {name:'Mountain River', title:'Mountain River', subtitle:'Rapids • cool current', desc:'Fast river fish dart around the dock.', icon:'bobber', color:'#65c5df', pos:[76,24]},
    {name:'Open Sea', title:'Open Sea', subtitle:'Deep blue • ocean current', desc:'Heavier sea fish roam the open water.', icon:'shark', color:'#80b9f0', pos:[76,70]},
    {name:'Abyssal Trench', title:'Abyssal Trench', subtitle:'Darkwater • rare catches', desc:'Rare deepwater creatures glow below the surface.', icon:'squid', color:'#bd9aff', pos:[25,78]}
  ];
  const safeIndex = () => Math.max(0, Math.min(ZF.length - 1, Number.isInteger(Number(S.fz)) ? Number(S.fz) : 0));
  const locked = i => L('fish') < ZF[i][1];

  const mapMarkup = () => {
    const active = safeIndex();
    const nodes = places.slice(0, ZF.length).map((p, i) => {
      const isLocked = locked(i);
      const isCurrent = active === i;
      const req = ZF[i][1];
      return `<button type="button" class="pond-map-point${isCurrent?' current':''}${isLocked?' locked':''}" data-pond-location="${i}" style="--pond-x:${p.pos[0]}%;--pond-y:${p.pos[1]}%;--pond-color:${p.color}" ${isLocked?'disabled aria-disabled="true"':''} aria-label="${isLocked?'Locked: ':''}Fish at ${p.name}. ${isLocked?'Unlock at Fishing level '+req:'Open fishing area'}">
        <span class="pond-map-pin">${icon(p.icon,p.color)}</span>
        <span class="pond-map-copy"><b>${p.name}</b><small>${isLocked?'Unlock at Fishing Lv '+req:p.subtitle}</small></span>
        <span class="pond-map-state">${isLocked?'LOCKED':isCurrent?'SELECTED':'ENTER'}</span>
      </button>`;
    }).join('');
    const unlocked = places.slice(0, ZF.length).filter((p,i)=>!locked(i)).length;
    return `<section class="pond-map-shell">
      <div id="fskill">${skillBar('fish')}</div>
      <div class="pond-map-heading">
        <div><span class="pond-eyebrow">ANGLER'S ATLAS</span><h2>Choose Your Waters</h2><p>Explore the fishing map. Each water has its own fish and atmosphere.</p></div>
        <div class="pond-map-count"><b>${unlocked}/${ZF.length}</b><small>WATERS OPEN</small></div>
      </div>
      <div class="pond-map-canvas" role="group" aria-label="Fishing waters map">
        <svg class="pond-map-art" viewBox="0 0 1000 560" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="pondAtlasSea" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#244b60"/><stop offset=".48" stop-color="#12384f"/><stop offset="1" stop-color="#071d35"/></linearGradient>
            <linearGradient id="pondAtlasRiver" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#b9e7d1"/><stop offset="1" stop-color="#64bed1"/></linearGradient>
            <filter id="pondAtlasGlow"><feGaussianBlur stdDeviation="7"/></filter>
          </defs>
          <rect width="1000" height="560" fill="url(#pondAtlasSea)"/>
          <path d="M0 0H1000V104C900 120 878 170 785 178S655 131 572 164 444 236 349 207 216 140 126 183 42 220 0 205Z" fill="#6b896b" opacity=".72"/>
          <path d="M0 0H1000V78C876 102 858 142 786 149S653 111 580 141 444 207 355 181 220 113 126 156 42 186 0 175Z" fill="#a5a77c" opacity=".27"/>
          <path d="M-20 230C120 182 182 255 305 252S498 179 578 210 718 295 816 263 940 205 1020 231" fill="none" stroke="url(#pondAtlasRiver)" stroke-width="42" opacity=".27"/>
          <path d="M-20 230C120 182 182 255 305 252S498 179 578 210 718 295 816 263 940 205 1020 231" fill="none" stroke="#9be7ed" stroke-width="3" opacity=".65" stroke-dasharray="10 13"/>
          <path d="M620 300C728 267 825 321 1020 295V580H540C565 482 548 389 620 300Z" fill="#07192e" opacity=".6"/>
          <path d="M0 0H1000M0 560H1000" stroke="#d3e4d6" stroke-opacity=".15" stroke-width="2"/>
          <g fill="none" stroke="#d2e9d8" stroke-opacity=".16" stroke-width="2"><path d="M-30 80C110 15 220 25 320 75S500 124 610 54 830 10 1030 70"/><path d="M-30 105C110 40 220 50 320 100S500 149 610 79 830 35 1030 95"/><path d="M-30 130C110 65 220 75 320 125S500 174 610 104 830 60 1030 120"/><path d="M-30 395C110 330 220 340 320 390S500 439 610 369 830 325 1030 385"/><path d="M-30 420C110 355 220 365 320 415S500 464 610 394 830 350 1030 410"/></g>
          <path d="M190 135C340 70 510 115 730 113S845 255 780 364 600 470 285 442" fill="none" stroke="#ffe4a0" stroke-width="4" stroke-dasharray="8 12" opacity=".72"/>
          <path d="M190 135C340 70 510 115 730 113S845 255 780 364 600 470 285 442" fill="none" stroke="#ffe4a0" stroke-width="13" opacity=".12" filter="url(#pondAtlasGlow)"/>
          <g fill="#d3edf0" opacity=".55"><circle cx="80" cy="310" r="3"/><circle cx="115" cy="350" r="2"/><circle cx="455" cy="330" r="3"/><circle cx="890" cy="440" r="2"/><circle cx="930" cy="470" r="3"/><circle cx="520" cy="500" r="2"/></g>
        </svg>
        <div class="pond-map-compass"><b>N</b><span>✦</span></div>
        ${nodes}
        <div class="pond-map-scale">✦ THE FOUR WATERS <span>•</span> FOLLOW THE GOLDEN CURRENT</div>
      </div>
      <div class="pond-map-footer"><span><i class="pond-dot open"></i> Available</span><span><i class="pond-dot selected"></i> Your last waters</span><span><i class="pond-dot locked"></i> Locked by Fishing level</span></div>
      <p class="pond-map-note">Your fishing level opens new waters. Your rod, bait, fish collection and rewards remain unchanged.</p>
    </section>`;
  };

  VIEWS.fish = function(){
    if (fishingScreen === 'map') return mapMarkup();
    let html = originalFishingView.apply(this, arguments);
    // The water selector now lives on the map; keep the original ZF zone data and gameplay intact.
    html = html.replace(/<div class="rpg-water-zones">[\s\S]*?<\/div>/, '');
    const i = safeIndex(), p = places[i] || places[0];
    html = html.replace('<div id="fskill">', `<div class="pond-fishing-nav"><button type="button" class="pond-back-map" data-pond-nav="map">← Waters Map</button><span>${icon(p.icon,p.color)}<b>${p.title}</b><small>${p.subtitle}</small></span><em>Fishing Lv ${L('fish')}</em></div><div id="fskill">`);
    html = html.replace('<div id="lake"></div>', `<div class="pond-stage-banner"><span>${p.title}</span><small>${p.desc}</small></div><div id="lake"></div>`);
    return html;
  };

  const pane = document.getElementById('pane');
  if (pane) pane.addEventListener('click', e => {
    const back = e.target.closest('[data-pond-nav="map"]');
    if (back) {
      e.preventDefault();
      fishingScreen = 'map';
      render();
      window.scrollTo({top:0,behavior:'smooth'});
      return;
    }
    const point = e.target.closest('[data-pond-location]');
    if (!point) return;
    const i = Number(point.dataset.pondLocation);
    if (!Number.isInteger(i) || i < 0 || i >= ZF.length) return;
    if (locked(i)) {
      say('This water unlocks at Fishing level '+ZF[i][1]+'.');
      try { SFX.err(); } catch (_) {}
      return;
    }
    S.fz = i;
    fishingScreen = 'fishing';
    try { SFX.water(); } catch (_) {}
    save();
    render();
    window.scrollTo({top:0,behavior:'smooth'});
  });

  const style = document.createElement('style');
  style.id = 'rpg-fishing-water-map-style';
  style.textContent = `
  .pond-map-shell{display:flex;flex-direction:column;gap:12px;min-width:0}
  .pond-map-heading{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px 16px;border:1px solid #8faeae;border-radius:15px;background:linear-gradient(120deg,#112a3a,#1a3c4a 58%,#1a2c43);box-shadow:0 8px 20px #0003;color:#f3fbff}
  .pond-eyebrow{font-size:9px;font-weight:900;letter-spacing:2.5px;color:#9ce4df}
  .pond-map-heading h2{margin:4px 0 5px;font:900 clamp(22px,4vw,30px)/1.05 Georgia,serif;color:#ffe5a8;text-shadow:0 2px 4px #0008}
  .pond-map-heading p{margin:0;color:#c9dce9;font-size:12px;line-height:1.4}
  .pond-map-count{flex:none;min-width:76px;padding:9px 8px;border:1px solid #c9a96c;border-radius:11px;text-align:center;background:#081d2acc}
  .pond-map-count b{display:block;color:#ffe2a0;font-size:21px}.pond-map-count small{font-size:8px;letter-spacing:1px;color:#b9cbd7;font-weight:900}
  .pond-map-canvas{position:relative;isolation:isolate;height:clamp(410px,54vh,550px);min-height:410px;overflow:hidden;border:2px solid #bd9d61;border-radius:17px;background:linear-gradient(135deg,#27475a,#0b2036);box-shadow:0 12px 28px #0005,inset 0 0 0 2px #fff1}
  .pond-map-canvas:after{content:"";position:absolute;inset:0;z-index:0;pointer-events:none;background:linear-gradient(180deg,#08152308,#06152324),radial-gradient(ellipse at 18% 25%,#85d2ba22,transparent 34%),radial-gradient(ellipse at 78% 72%,#6b71bd20,transparent 35%)}
  .pond-map-art{position:absolute;inset:0;width:100%;height:100%;z-index:0}
  .pond-map-pin{width:38px;height:38px;display:grid;place-items:center;flex:none;border:1px solid #fff9;border-radius:11px;background:linear-gradient(145deg,#264d5b,#10283b);box-shadow:0 4px 12px #0006}
  .pond-map-pin .ic{width:28px;height:28px;filter:drop-shadow(0 2px 2px #0008)}
  .pond-map-point{position:absolute;z-index:2;left:var(--pond-x);top:var(--pond-y);transform:translate(-50%,-50%);width:min(202px,43%);min-height:76px;display:flex;align-items:center;gap:8px;padding:8px;border:1px solid #b6d4d6;border-radius:13px;background:linear-gradient(125deg,#10283aef,#0b1b2deF);color:#eff9ff;text-align:left;font:inherit;cursor:pointer;touch-action:manipulation;-webkit-tap-highlight-color:transparent;box-shadow:0 6px 16px #0007,inset 0 0 0 1px #ffffff12;transition:transform .16s,border-color .16s,filter .16s}
  .pond-map-point:hover:not(:disabled){transform:translate(-50%,-53%);border-color:#ffe2a0;filter:brightness(1.12)}
  .pond-map-point.current{border-color:#ffdb85;box-shadow:0 0 0 1px #ffdc8b88,0 0 18px #ffd16a55,0 6px 16px #0007}
  .pond-map-point.current .pond-map-pin{border-color:#ffe3a4;background:linear-gradient(145deg,#8e7140,#3a372b)}
  .pond-map-copy{display:flex;flex-direction:column;gap:4px;min-width:0;flex:1}
  .pond-map-copy b{font-size:12px;line-height:1.1;color:#ffe7b4}
  .pond-map-copy small{font-size:9px;line-height:1.2;color:#c4d9e4}
  .pond-map-state{position:absolute;right:7px;top:-7px;padding:3px 6px;border:1px solid #c5a568;border-radius:6px;background:#091b29;color:#f8dfa7;font-size:7px;font-weight:900;letter-spacing:.7px}
  .pond-map-point.current .pond-map-state{background:#80602f;color:#fff3ce}
  .pond-map-point:disabled,.pond-map-point.locked{cursor:not-allowed;filter:grayscale(.72);opacity:.68}
  .pond-map-point:disabled .pond-map-state{border-color:#8296a5;color:#bbc7ce}
  .pond-map-compass{position:absolute;z-index:2;right:13px;top:12px;width:34px;height:44px;display:flex;flex-direction:column;align-items:center;justify-content:center;border:1px solid #d2c398;border-radius:8px;background:#091c2bc9;color:#ffe4a0;font-size:12px}
  .pond-map-compass span{font-size:19px;line-height:1}
  .pond-map-scale{position:absolute;left:12px;bottom:10px;z-index:2;padding:6px 9px;border:1px solid #d4bf8a66;border-radius:7px;background:#071b2bbd;color:#dbe9ec;font-size:8px;font-weight:900;letter-spacing:1px}
  .pond-map-scale span{color:#ffd983;padding:0 4px}
  .pond-map-footer{display:flex;flex-wrap:wrap;gap:8px 16px;padding:10px 12px;border:1px solid #3b5369;border-radius:11px;background:linear-gradient(110deg,#101f31,#172b3e);color:#cbdce7;font-size:10px}
  .pond-map-footer span{display:flex;align-items:center;gap:6px}
  .pond-dot{width:8px;height:8px;border-radius:50%;background:#65d9c5;box-shadow:0 0 7px currentColor}.pond-dot.selected{background:#ffcf71}.pond-dot.locked{background:#7f91a2}
  .pond-map-note{margin:0;color:#a9bdcd;font-size:10px;line-height:1.4;text-align:center}
  .pond-fishing-nav{display:flex;align-items:center;gap:10px;padding:8px 10px;border:1px solid #55778a;border-radius:12px;background:linear-gradient(110deg,#112d40,#0c1e31);box-shadow:0 4px 13px #0003;color:#edfaff}
  .pond-back-map{flex:none;border:1px solid #d6b875;border-radius:9px;padding:8px 10px;background:linear-gradient(180deg,#2b5365,#173447);color:#ffe8b2;font:700 11px/1.2 "Trebuchet MS",sans-serif;cursor:pointer}
  .pond-fishing-nav>span{display:flex;align-items:center;gap:6px;flex:1;min-width:0}.pond-fishing-nav .ic{width:26px;height:26px}
  .pond-fishing-nav b{font:700 12px Georgia,serif;color:#ffe4aa}.pond-fishing-nav small{display:block;font-size:9px;color:#adcbd7}.pond-fishing-nav em{font-style:normal;flex:none;color:#a6e7eb;font-size:10px;font-weight:800}
  .pond-stage-banner{position:absolute;left:11px;top:10px;z-index:4;display:flex;flex-direction:column;gap:3px;max-width:70%;padding:7px 10px;border:1px solid #c2dce2;border-radius:9px;background:#071d2bd9;box-shadow:0 3px 12px #0004;pointer-events:none;text-align:left}
  .pond-stage-banner span{font:800 13px Georgia,serif;color:#ffe6ad}.pond-stage-banner small{font-size:9px;color:#d1e7eb}
  .rpg-fish-stage #lake{touch-action:manipulation}
  .rpg-fish-stage .pnd-spot{filter:drop-shadow(0 5px 7px #001b28aa)}
  .pnd-info{border-color:#507b8b;box-shadow:0 7px 18px #0004,inset 0 0 0 1px #ffffff08}
  @media(max-width:560px){
    .pond-map-heading{padding:11px 12px}.pond-map-heading p{max-width:240px;font-size:10px}.pond-map-count{min-width:63px;padding:7px 5px}.pond-map-count b{font-size:18px}
    .pond-map-canvas{height:465px;min-height:465px}
    .pond-map-point{width:min(166px,45%);min-height:68px;padding:6px;gap:6px;border-radius:10px}
    .pond-map-pin{width:31px;height:31px;border-radius:8px}.pond-map-pin .ic{width:23px;height:23px}
    .pond-map-copy b{font-size:10px}.pond-map-copy small{font-size:8px}.pond-map-state{font-size:6px;right:5px}
    .pond-map-scale{font-size:7px;left:7px;bottom:7px}
    .pond-fishing-nav{gap:6px;padding:7px}.pond-back-map{font-size:10px;padding:7px}.pond-fishing-nav b{font-size:10px}.pond-fishing-nav small{font-size:8px}.pond-fishing-nav em{font-size:9px}
  }
  @media(max-width:360px){.pond-map-point{width:46%;}.pond-map-copy b{font-size:9px}.pond-map-copy small{font-size:7px}.pond-map-pin{width:27px;height:27px}.pond-map-heading h2{font-size:21px}}
  @media(prefers-reduced-motion:reduce){.pond-map-point{transition:none!important}}
  `;
  document.head.appendChild(style);
  window.__rpgFishingWaterMapReady = true;
  /* The original boot render runs before this late view wrapper is installed.
     Re-render once when a saved session opens directly on Fish so the atlas is
     visible immediately instead of briefly showing the legacy zone buttons. */
  if (typeof S !== 'undefined' && S.tab === 'fish' && typeof render === 'function') {
    try { render(); } catch (err) { console.error('Fishing atlas initial render failed:', err); }
  }
})();

