/* ---------- AI painted environment pack: locally embedded, offline-ready ---------- */
const AI_BG = {
  slimecave:'{{BLOB:b0084.jpg}}',
  warren:'{{BLOB:b0085.jpg}}',
  spidernest:'{{BLOB:b0086.jpg}}',
  forest:'{{BLOB:b0087.jpg}}',
  crypt:'{{BLOB:b0088.jpg}}',
  stronghold:'{{BLOB:b0089.jpg}}',
  crystal:'{{BLOB:b0090.jpg}}',
  inferno:'{{BLOB:b0091.jpg}}',
  frost:'{{BLOB:b0092.jpg}}'
};
const AI_TITLE_BG = '{{BLOB:b0093.jpg}}';
const _bgSvgFallback = bg;
const _AI_DUNGEON_BG = {slime:'slimecave',goblin:'warren',spider:'spidernest',wolf:'forest',crypt:'crypt',orc:'stronghold',golem:'crystal',inferno:'inferno'};
function _aiBackgroundMarkup(key){
  const src = AI_BG[key] || AI_BG.forest;
  return '<div class="bgs ai-bgs ai-bg-'+key+'" style="background-image:url(\''+src+'\')"></div>';
}
bg = function(k,boss){
  if(k==='arena' || k==='dungeon' || k==='battle'){
    const dungeon = S.dg && typeof DG!=='undefined' ? DG.find(d=>d.id===S.dg.id) : null;
    const region = (()=>{try{return CH_REGIONS.find(r=>r.id===S.region)||null}catch(e){return null}})();
    let key;
    if(dungeon) key = _AI_DUNGEON_BG[dungeon.id] || 'crypt';
    else if(region) key = ({meadow:'forest',woods:'forest',ember:'inferno',frost:'frost'})[region.id] || 'forest';
    else key = 'forest';
    return _aiBackgroundMarkup(key);
  }
  if(AI_BG[k]) return _aiBackgroundMarkup(k);
  return _bgSvgFallback(k,boss);
};

