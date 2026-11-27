
/* ---------- Tiny Acre AI creature art pack: local, embedded assets ---------- */
(function applyTinyAcreAIArt(){
  const TINY_AI_ASSETS = {"cow":"{{BLOB:b0094.png}}","sheep":"{{BLOB:b0095.png}}","chicken":"{{BLOB:b0096.png}}","duck":"{{BLOB:b0097.png}}","goat":"{{BLOB:b0098.png}}","horse":"{{BLOB:b0099.png}}","pig":"{{BLOB:b0100.png}}","rabbit":"{{BLOB:b0101.png}}","cat":"{{BLOB:b0102.png}}","llama":"{{BLOB:b0103.png}}","bee":"{{BLOB:b0104.png}}","pet":"{{BLOB:b0105.png}}","fish":"{{BLOB:b0106.png}}","slime":"{{BLOB:b0107.png}}","brambleling":"{{BLOB:b0108.png}}","wolf":"{{BLOB:b0109.png}}","goblin":"{{BLOB:b0110.png}}","spider":"{{BLOB:b0111.png}}","cinderwisp":"{{BLOB:b0112.png}}","frostling":"{{BLOB:b0113.png}}","forestguardian":"{{BLOB:b0114.png}}","rockgolem":"{{BLOB:b0115.png}}","icedrake":"{{BLOB:b0116.png}}","firebehemoth":"{{BLOB:b0117.png}}","cavebat":"{{BLOB:b0118.png}}","skeleton":"{{BLOB:b0119.png}}","troll":"{{BLOB:b0120.png}}","lich":"{{BLOB:b0121.png}}","snowbeast":"{{BLOB:b0122.png}}","mushroom":"{{BLOB:b0123.png}}","boar":"{{BLOB:b0124.png}}","pixie":"{{BLOB:b0104.png}}"};
  const aiStyle=document.createElement('style');
  aiStyle.textContent='#aseeds .seed svg.ic{width:48px;height:48px;filter:drop-shadow(0 1px 1px rgba(36,26,53,.14))}#bgrid .plot .e svg.ic:has(image){width:64px;height:64px;filter:drop-shadow(0 2px 2px rgba(36,26,53,.18))}';
  document.head.appendChild(aiStyle);
  // General fish icons now use a locally embedded AI illustration as well.
  if (typeof P!=='undefined') P.fish=(c)=>'<g style="'+(c==='#f0a23a'?'filter:hue-rotate(38deg) saturate(1.3)':'')+'"><image href="'+TINY_AI_ASSETS.fish+'" x="0" y="0" width="64" height="64" preserveAspectRatio="xMidYMid meet"/></g>';
  const animalArt = {
    chicken:'chicken', sheep:'sheep', bee:'bee', cow:'cow', duck:'duck',
    rabbit:'rabbit', goat:'goat', pig:'pig', llama:'llama'
  };
  const imageMarkup = (key, tint) => {
    const data = TINY_AI_ASSETS[key] || TINY_AI_ASSETS.goblin;
    const style = tint ? ' style="filter:hue-rotate('+tint+'deg) saturate(1.12) contrast(1.02)"' : '';
    return '<g'+style+'><image href="'+data+'" x="0" y="0" width="100" height="100" preserveAspectRatio="xMidYMid meet"/></g>';
  };
  Object.entries(animalArt).forEach(([id,key]) => { if (ANIART[id] !== undefined) ANIART[id] = imageMarkup(key); });

  function artForFoe(name){
    const n=String(name||'').toLowerCase();
    // Signature story bosses receive their own AI illustrations.
    if(n==='meadow guardian') return ['forestguardian',0];
    if(n==='thornfang alpha') return ['wolf',68];
    if(n==='the cinder wyrm'||n==='ember dragon'||n==='dragon'||n==='magma colossus'||n==='infernal duke') return ['firebehemoth',0];
    if(n==='the hollow crown'||n==='void lich'||n==='shadow lord'||n==='lich'||n==='banshee'||n==='ghost') return ['lich',0];
    if(n==='frost wyrm'||n==='ice drake') return ['icedrake',0];
    if(n==='frost titan'||n==='frostling') return ['frostling',0];
    if(n==='brambleling') return ['brambleling',0];
    if(n==='cinder wisp') return ['cinderwisp',0];
    if(/slime|ooze/.test(n)){
      let tint=0;
      if(/blue|king/.test(n)) tint=155;
      if(/acid/.test(n)) tint=55;
      if(/frost/.test(n)) tint=185;
      if(/magma/.test(n)) tint=320;
      if(/void|titan/.test(n)) tint=255;
      return ['slime',tint];
    }
    if(/rat/.test(n)) return ['rabbit',25];
    if(/bat/.test(n)||/shadow imp|\bimp\b/.test(n)) return ['cavebat',/shadow/.test(n)?235:0];
    if(/goblin/.test(n)) return ['goblin',/shaman/.test(n)?265:/archer/.test(n)?22:0];
    if(/spider|arachne|broodmother/.test(n)) return ['spider',/queen/.test(n)?275:0];
    if(/frost wolf/.test(n)||/snow wolf/.test(n)) return ['snowbeast',0];
    if(/wolf|fenrir|dire wolf/.test(n)) return ['wolf',/fenrir|alpha/.test(n)?42:0];
    if(/skeleton|drowned bones|bone lord/.test(n)) return ['skeleton',/drowned/.test(n)?185:0];
    if(/golem|colossus|stone titan/.test(n)) return ['rockgolem',/crystal/.test(n)?195:/obsidian/.test(n)?260:0];
    if(/orc|troll|warlord|emperor|sea warlord/.test(n)) return ['troll',/orc|warlord|emperor/.test(n)?48:0];
    if(/ghost|lich|banshee|shadow|void|hollow crown/.test(n)) return ['lich',/banshee/.test(n)?280:0];
    if(/dragon|wyrm/.test(n)) return ['icedrake',/frost|ice/.test(n)?0:205];
    if(/bramble|guardian|ent/.test(n)) return ['forestguardian',0];
    if(/cinder|flame|magma|fire/.test(n)) return ['cinderwisp',0];
    if(/frost|ice|snow/.test(n)) return ['frostling',0];
    if(/mushroom/.test(n)) return ['mushroom',0];
    if(/boar/.test(n)) return ['boar',0];
    return ['goblin',0];
  }

  // Replace every enemy form, including generated variants, elites and bosses.
  FOES.forEach(f => { const [key,tint]=artForFoe(f.n); f.a=imageMarkup(TINY_AI_ASSETS[key]?key:'goblin',tint); });

  // The animal selection buttons are built once; refresh their contents while preserving click handlers.
  if (typeof aEls!=='undefined' && typeof ANI!=='undefined') {
    aEls.forEach((b,i)=>{ const a=ANI[i]; if(a) b.innerHTML=mon(ANIART[a.id],'ic')+'<div>'+a.n+'</div><span>'+a.cost+' coins</span>'; });
  }
  // Update animals already visible in the barn and keep their handlers/state intact.
  if (typeof bEls!=='undefined' && typeof S!=='undefined') {
    bEls.forEach((x,i)=>{ const p=S.barn&&S.barn[i]; if(p&&ANI[p.t]) x.e.innerHTML=mon(ANIART[ANI[p.t].id],'ic'); });
  }
  const fishTab=document.querySelector('nav button[data-k="fish"]');
  if(fishTab && typeof icon==='function') fishTab.innerHTML=icon('fish','#8fb3c9')+'Fish';
  if(typeof render==='function') render();
  window.__tinyAcreAIArtReady=true;
})();
