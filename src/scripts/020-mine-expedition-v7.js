
(()=>{
 // Aggregate identical loot entries so quantities are cumulative in the battle feed.
 const feed=window.BattleLootV6;
 if(feed&&feed.getRecent){
   const panel=document.querySelector('#battle-loot-feed');
   const oldFight=VIEWS.fight;
   const aggregate=()=>{
     const raw=feed.getRecent(),map=new Map();
     raw.forEach(x=>{const k=(x.name||'')+'|'+(x.kind||'');if(!map.has(k))map.set(k,{...x,qty:0});map.get(k).qty+=x.qty||1});
     return [...map.values()].slice(0,8);
   };
   const redraw=()=>{const el=document.querySelector('#battle-loot-feed');if(!el)return;const rows=aggregate();el.querySelector('.bl-list')?.remove();const empty=el.querySelector('.bl-empty');if(rows.length){if(empty)empty.remove();const d=document.createElement('div');d.className='bl-list';d.innerHTML=rows.map(x=>'<div class="bl-item '+(x.gear?'gear':'')+' '+(x.rare?'rare':'')+'">'+x.icon+'<span><strong>'+x.name+' ×'+x.qty+'</strong><small>'+x.kind+'</small></span></div>').join('');el.appendChild(d)}else if(!empty){const d=document.createElement('div');d.className='bl-empty';d.textContent='No loot yet.';el.appendChild(d)}};
   const oldStart=startFight;startFight=function(f){oldStart(f);setTimeout(redraw,0)};
   const oldDown=foeDown;foeDown=function(){const r=oldDown.apply(this,arguments);setTimeout(redraw,0);return r};
   const oldFightView2=VIEWS.fight;VIEWS.fight=function(){let html=oldFightView2.apply(this,arguments);if(S.dg&&!fight){const gate='<svg class="rpg-gate-art" viewBox="0 0 120 130" width="116" height="126"><defs><linearGradient id="gateGlow" x2="0" y2="1"><stop stop-color="#8ee8ff"/><stop offset="1" stop-color="#6049a6"/></linearGradient></defs><path d="M12 126V55Q12 8 60 8T108 55v71Z" fill="#171a35" stroke="#d4b777" stroke-width="5"/><path d="M25 126V57Q25 22 60 22T95 57v69Z" fill="url(#gateGlow)" opacity=".8"/><path d="M60 29v90M35 72h50" stroke="#fff2c6" stroke-width="3" opacity=".65"/><circle cx="60" cy="62" r="9" fill="#fff2c6"/></svg>';html=html.replace(/(<div class="obj [^"]*" id="eo">)[\s\S]*?(<\/div>)/,'$1'+gate+'$2')}return html};
 }
 // Sequential, selectable cave expedition. Each cave has its own saved depth.
 const CAVES=[
  {id:'quarry',n:'Quarry',lv:1,emoji:'<svg viewBox="0 0 24 24" width="26" height="26" style="display:block" aria-hidden="true"><path d="M3 19h18l-3-6-4 2-3-5-5 4z" fill="#9aa0a6" stroke="#241a35" stroke-width="1.6" stroke-linejoin="round"/><path d="M10 10l3 5-4 2z" fill="#c9ced6"/></svg>',desc:'Stone, coal and copper',pool:['copper','tin','iron'],extra:'coal',bg:'#514b4a'},
  {id:'deep',n:'Deep Mine',lv:5,emoji:'⛏️',desc:'Iron, silver and dark ore',pool:['iron','silver','gold'],extra:'coal',bg:'#373b50'},
  {id:'crystal',n:'Crystal Cavern',lv:9,emoji:'💎',desc:'Crystals and precious veins',pool:['silver','gold','mithril'],extra:'crystal',bg:'#343b70'},
  {id:'magma',n:'Magma Depths',lv:13,emoji:'🌋',desc:'Obsidian and rare minerals',pool:['gold','mithril','obsidian'],extra:'obsidian',bg:'#71372d'}
 ];
 const resIcon=id=>({stone:'🪨',coal:'⚫',crystal:'💠',obsidian:'⬛',agem:'💎'}[id]||'⛏️');
 const oreArt=id=>{const p={stone:['#9ca3af','#596579','#d9e0e8'],coal:['#505563','#202431','#9298a8'],copper:['#e18b55','#87472e','#ffc18a'],tin:['#c5cbd2','#707d8b','#f0f4f7'],iron:['#a5aab5','#4c5667','#e0e5ed'],silver:['#d8e3ee','#778da7','#fff'],gold:['#f6c84b','#98651d','#fff0a1'],mithril:['#65dce9','#286d91','#c1ffff'],crystal:['#b18aff','#5635a6','#eadbff'],obsidian:['#7257a6','#201a36','#c4a8ff'],agem:['#62e6c5','#176d72','#c8fff1']};const c=p[id]||p.stone;return '<svg viewBox="0 0 140 120" aria-label="'+id+' ore"><defs><linearGradient id="oreSpec'+id+'" x1="0" y1="0" x2="1" y2="1"><stop stop-color="'+c[2]+'"/><stop offset=".5" stop-color="'+c[0]+'"/><stop offset="1" stop-color="'+c[1]+'"/></linearGradient></defs><ellipse cx="70" cy="105" rx="48" ry="8" fill="#0008"/><path d="M16 83 27 47 53 24 87 17 119 45 126 79 101 101 40 104Z" fill="url(#oreSpec'+id+')" stroke="#fff8" stroke-width="2"/><path d="m27 48 26-24 15 25-12 48-30-15Z" fill="'+c[0]+'"/><path d="m68 49 19-32 32 28-17 28-25 6Z" fill="'+c[2]+'"/><path d="m68 49 19-32 4 39-23 22Z" fill="#fff8"/><path d="m56 97 12-48 25 24 9 27Z" fill="'+c[1]+'"/></svg>'};
 window.__oreArt=oreArt;
 const resName=id=>{try{return nm(id)}catch(e){return id}};
 // Migrate partial/legacy save data before any view is rendered. Older saves may
 // contain mineExp without depth/resources, which previously crashed VIEWS.mine.
 if(!S.mineExp||typeof S.mineExp!=='object'||Array.isArray(S.mineExp))S.mineExp={};
 let run=S.mineExp;
 run.cave=Number.isInteger(Number(run.cave))?Math.min(CAVES.length-1,Math.max(0,Number(run.cave))):0;
 run.depth=run.depth&&typeof run.depth==='object'&&!Array.isArray(run.depth)?run.depth:{};
 run.resources=run.resources&&typeof run.resources==='object'&&!Array.isArray(run.resources)?run.resources:{};
 run.selected=run.selected===true;
 const cave=()=>CAVES[Math.min(CAVES.length-1,Math.max(0,Number(run.cave)||0))];
 const depth=()=>{const n=Number(run.depth[cave().id]);return Number.isFinite(n)&&n>=1?n:1};
 // Equipped pickaxes now directly affect every V7 mining strike. The square-root
 // curve keeps upgrades meaningful without letting even endgame tools one-shot veins.
 const miningStrikePower=()=>{const tool=item('p')||{pw:1};const toolPower=Math.max(1,Number(tool.pw)||1);const skillBonus=Math.min(1.5,Math.floor(Math.max(0,L('mine')-1)/15)*.5);return Math.round((toolPower+skillBonus)*10)/10};
 const rollResource=()=>{const c=cave(),d=depth(),pool=c.pool.filter(id=>MATS[id]||ORES.some(o=>o.id===id));let id=pool[Math.floor(Math.random()*pool.length)]||'coal';if(Math.random()<.18)id=c.extra;if(Math.random()<.08)id='agem';const vein=Math.random()<.055,hard={stone:4,coal:4,copper:5,tin:5,iron:6,silver:7,gold:8,mithril:9,crystal:7,obsidian:10,agem:8}[id]||5;const maxHits=hard+(vein?2:0);return{id,vein,qty:vein?rnd(3,5):1+(Math.random()<.13?1:0),maxHits,hits:maxHits,xp:Math.max(3,Math.round((d+L('mine'))*(vein?1.7:1.15)))}};
 let current=run.selected?(run.resources[cave().id]||(run.resources[cave().id]=rollResource())):null,mineFightPending=false,mineEncounter=(run.encounter&&typeof run.encounter==='object'?{...run.encounter}:null),transitioning=false;
 // Recover safely from interrupted saves without restoring mined ore or losing a completed reward.
 if(current&&(!current.id||!Number.isFinite(Number(current.hits))||!Number.isFinite(Number(current.maxHits))||Number(current.maxHits)<1||Number(current.hits)<0||!Number.isFinite(Number(current.qty))||!Number.isFinite(Number(current.xp))))current=run.resources[cave().id]=rollResource();
 // A zero-hit vein has already paid out its reward. If the player closed during the travel animation,
 // finish that transition once on reload; if an encounter is pending, leave depth unchanged until victory.
 if(current&&Number(current.hits)===0&&!mineEncounter){run.depth[cave().id]=depth()+1;current=run.resources[cave().id]=rollResource();run.pendingAdvance=false;}
 const advance=()=>{transitioning=false;mineEncounter=null;run.encounter=null;run.pendingAdvance=false;run.depth[cave().id]=depth()+1;current=rollResource();run.resources[cave().id]=current;save();render()};
 const expeditionWalk=(done)=>{const scene=document.querySelector('#pane .rpg-mine-scene')||document.querySelector('#pane');if(!scene){done();return}scene.classList.add('mine-walk-out');setTimeout(()=>{scene.classList.remove('mine-walk-out');done()},720)};
 VIEWS.mine=function(){const c=cave(),d=depth();
  const sceneBg='radial-gradient(ellipse at 50% 110%,'+c.bg+' 0,#171b2b 78%),'+(c.id==='magma'?'repeating-linear-gradient(125deg,#ff713018 0 3px,transparent 3px 28px)':c.id==='crystal'?'radial-gradient(circle at 20% 20%,#9c83ff33,transparent 35%),radial-gradient(circle at 80% 30%,#4be4ff22,transparent 30%)':c.id==='deep'?'repeating-linear-gradient(90deg,#aab7d00b 0 2px,transparent 2px 42px)':'radial-gradient(ellipse at 50% 0,#b5a28b22,transparent 55%)');
  const event=!run.selected?'':transitioning?'<div class="rpg-mine-scene rpg-mine-event"><b>🚶 Moving deeper into the cave…</b><small>A new mineral vein is being revealed.</small></div>':mineEncounter?'<div class="rpg-mine-scene rpg-mine-event rpg-mine-ambush"><div class="creature">'+(mineEncounter.ico||'👹')+'</div><b>'+mineEncounter.n+' blocks the tunnel!</b><small>You spotted a creature ahead. Prepare before engaging.</small><button class="btn" data-mine="engage">⚔ Engage monster</button></div>':'<div class="rpg-mine-scene" style="background:'+sceneBg+'"><button class="rpg-mine-resource" data-mine="gather"><span class="big">'+oreArt(current.id)+'</span><b>'+resName(current.id)+'</b><small>'+(current.vein?'<b style="color:#ffd84d">✦ RICH VEIN</b> · ':'')+'Hits left: '+(Math.round(current.hits*10)/10)+'/'+current.maxHits+' · '+current.qty+' potential</small><span class="mine-hitbar"><i style="width:'+Math.max(0,current.hits/current.maxHits*100)+'%"></i></span><em>Strike to mine</em></button><div class="rpg-mine-hint">Strike the resource until it breaks. Then travel deeper; a creature may appear instead.</div></div>';
  const map='<div class="mine-world-map"><div class="mine-map-art">'+((document.getElementById('mm-tpl')||{}).innerHTML||'')+'</div><div class="mine-map-title">🧭 MINING FRONTIER · WORLD MAP</div><div class="mine-map-path"></div>'+CAVES.map((x,i)=>'<button class="mine-map-pin '+(i===run.cave?'active':'')+'" style="--x:'+([15,72,27,78][i])+'%;--y:'+([25,48,73,82][i])+'%" data-mine="cave" data-i="'+i+'" '+(L('mine')<x.lv?'disabled':'')+'><span>'+x.emoji+'</span><b>'+x.n+'</b><small>'+(L('mine')<x.lv?'🔒 Lv '+x.lv:'Depth '+(run.depth[x.id]||1))+'</small></button>').join('')+'</div>';const picker=skillBar('mine')+'<div class="ttl">Choose a cave on the map</div>'+map+'<div class="rpg-mine-hint">Select a cave location on the map to begin mining.</div>';
  if(!run.selected)return picker;
  return skillBar('mine')+'<div class="ttl">Choose another cave</div>'+map+'<div class="ttl">'+c.emoji+' '+c.n+' · Depth '+d+'</div>'+event+'<div class="card2"><b>Expedition progress</b><span>Depth '+d+' · '+c.n+'</span><small>Equipped: '+(item('p')?.n||'Stone Pick')+' · Strike strength '+miningStrikePower()+' · Better picks break veins in fewer strikes, but never instantly.</small><small>Each resource advances you one level deeper. A monster may appear instead of the next resource.</small></div><div class="btns"><button class="btn alt" data-mine="reset">Return to cave entrance</button></div>'};
 const minePane=$('pane');
 // Handle Mine Expedition controls in capture phase so no older mining listener can consume the click.
 minePane.addEventListener('click',e=>{const b=e.target&&e.target.closest?e.target.closest('[data-mine]'):null;if(!b)return;
  e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();const a=b.dataset.mine;let soft=false;
  if(a==='cave'){const i=Number(b.dataset.i);if(!Number.isInteger(i)||!CAVES[i]||L('mine')<CAVES[i].lv)return;const changed=i!==run.cave||!run.selected;run.cave=i;run.selected=true;if(changed){current=run.resources[CAVES[i].id]||(run.resources[CAVES[i].id]=rollResource());}}
  if(a==='reset'){transitioning=false;mineEncounter=null;run.depth[cave().id]=1;current=run.resources[cave().id]||(run.resources[cave().id]=rollResource());}
  if(a==='engage'&&mineEncounter){const foe=mineEncounter;mineEncounter=null;mineFightPending=true;mineExpeditionEnemy=foe;const caveLevel=cave().lv,depthBonus=Math.min(2,Math.floor((depth()-1)/8));const scale=1+Math.min(.22,depthBonus*.06);startFight(mkFoe(foe.n,scale,'f'));S.tab='fight';say('You chose to engage the creature.');}
  if(a==='gather'){
    if(!run.selected||mineEncounter)return;
    const r=current||(current=run.resources[cave().id]||(run.resources[cave().id]=rollResource()));
    if(!r||r.hits<=0)return;
    const power=miningStrikePower();r.hits=Math.max(0,Math.round((r.hits-power)*10)/10);if(window.__mineImpact)window.__mineImpact(b,r.hits===0);try{SFX.mine();mineClink(r.hits===0)}catch(_){}
    run.resources[cave().id]=r;soft=true;if(r.hits>0){const sm=b.querySelector('small'),bar=b.querySelector('.mine-hitbar i');if(sm)sm.innerHTML=sm.innerHTML.replace(/Hits left: [\d.]+\/[\d.]+/,'Hits left: '+r.hits+'/'+r.maxHits);if(bar)bar.style.width=Math.max(0,r.hits/r.maxHits*100)+'%';}
    else{transitioning=true;run.pendingAdvance=true;S.inv[r.id]=inv(r.id)+r.qty;addXp('mine',r.xp);toast('Found '+r.qty+' '+resName(r.id)+' · Mining XP +'+r.xp,'reward');
      const caveLevel=cave().lv,depthBonus=Math.min(2,Math.floor((depth()-1)/8)),targetLevel=caveLevel+depthBonus;
      const nextEvent=()=>{if(Math.random()<.14){const pool=FOES.filter(f=>!f.b&&f.l>=Math.max(1,targetLevel-1)&&f.l<=targetLevel+1);const candidates=pool.length?pool:FOES.filter(f=>!f.b).sort((x,y)=>Math.abs(x.l-targetLevel)-Math.abs(y.l-targetLevel)).slice(0,5);const foe=candidates[Math.floor(Math.random()*candidates.length)]||FOES.find(f=>!f.b);if(foe){transitioning=false;run.pendingAdvance=false;mineEncounter={...foe};say('A creature blocks the tunnel. Choose when to engage.');save();render();return;}}advance()};expeditionWalk(nextEvent);
    }
  }
  save();if(!soft)render();if(a==='cave'){setTimeout(()=>{const target=minePane.querySelector('.rpg-mine-scene');if(target)target.scrollIntoView({behavior:'smooth',block:'start'});},90)}
 },true);
 let mineExpeditionEnemy=null;
 const _mineExpDown=foeDown;foeDown=function(){const was=mineFightPending&&fight&&fight.hp<=0;const result=_mineExpDown.apply(this,arguments);if(was&&!fight){mineFightPending=false;mineExpeditionEnemy=null;S.tab='mine';advance();say('The tunnel is clear. A new resource vein appears ahead.');save();render()}return result};
 const _mineExpFlee=flee;flee=function(){const was=mineFightPending,foe=mineExpeditionEnemy;const result=_mineExpFlee.apply(this,arguments);if(was&&!fight){mineFightPending=false;mineEncounter=foe?{...foe}:null;mineExpeditionEnemy=null;S.tab='mine';say('You retreat to the creature encounter. The cleared depth is unchanged.');save();render()}return result};
 const _mineExpPlayerDown=playerDown;playerDown=function(){const was=mineFightPending,foe=mineExpeditionEnemy;const result=_mineExpPlayerDown.apply(this,arguments);if(was&&!fight){mineFightPending=false;mineEncounter=foe?{...foe}:null;mineExpeditionEnemy=null;S.tab='mine';say('You recover at the cave entrance. The creature and depth remain unchanged.');save();render()}return result};
 // Persist the complete V7 expedition through the game's existing localStorage save.
 // The active vein is stored per cave; encounters survive reload and can be fought again.
 const _mineExpSave=save;save=function(){
  run.resources=run.resources||{};
  if(run.selected&&current)run.resources[cave().id]=current;
  run.encounter=mineEncounter?{...mineEncounter}:(mineFightPending&&mineExpeditionEnemy?{...mineExpeditionEnemy}:null);
  run.pendingAdvance=!!transitioning||!!run.pendingAdvance;
  S.mineExp=run;
  return _mineExpSave.apply(this,arguments);
 };
 // Flush the same save on tab hiding/closing; ordinary gameplay actions already save immediately.
 const minePersistOnExit=()=>{try{save()}catch(e){try{localStorage.setItem('tinyacre-save',JSON.stringify(S))}catch(_){}}};
 window.addEventListener('pagehide',minePersistOnExit);
 document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')minePersistOnExit()});
 window.__resetMineExpedition=()=>{run={cave:0,depth:{},resources:{},selected:false,encounter:null,pendingAdvance:false};current=null;mineFightPending=false;mineEncounter=null;mineExpeditionEnemy=null;transitioning=false;S.mineExp=run};
 window.__loadMineExpedition=()=>{run=S.mineExp&&typeof S.mineExp==='object'?S.mineExp:{cave:0,depth:{},resources:{},selected:false,encounter:null,pendingAdvance:false};run.cave=Number.isInteger(Number(run.cave))?Math.min(CAVES.length-1,Math.max(0,Number(run.cave))):0;run.depth=run.depth&&typeof run.depth==='object'?run.depth:{};run.resources=run.resources&&typeof run.resources==='object'?run.resources:{};run.selected=run.selected===true;current=run.selected?(run.resources[cave().id]||(run.resources[cave().id]=rollResource())):null;mineFightPending=false;mineEncounter=run.encounter&&typeof run.encounter==='object'?{...run.encounter}:null;mineExpeditionEnemy=null;transitioning=false;S.mineExp=run};
})();
