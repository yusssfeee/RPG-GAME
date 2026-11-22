/* ================= part D · reference icons · trade map · timed crafting · alerts ================= */
const SPR4={"wp_gauntlet": "{{BLOB:b0282.webp}}", "wp_club": "{{BLOB:b0283.webp}}", "wp_leathervest": "{{BLOB:b0284.webp}}", "wp_bow": "{{BLOB:b0285.webp}}", "wp_ring": "{{BLOB:b0286.webp}}", "wp_katana": "{{BLOB:b0287.webp}}", "wp_robe": "{{BLOB:b0288.webp}}", "wp_saber": "{{BLOB:b0289.webp}}", "wp_hammer": "{{BLOB:b0290.webp}}", "wp_drakehelm": "{{BLOB:b0291.webp}}", "wp_staff": "{{BLOB:b0292.webp}}", "wp_rapier": "{{BLOB:b0293.webp}}", "wp_mithgaunt": "{{BLOB:b0294.webp}}", "wp_dragonfang": "{{BLOB:b0295.webp}}", "wp_obsshield": "{{BLOB:b0296.webp}}", "wp_starsteel": "{{BLOB:b0297.webp}}", "wp_dagger": "{{BLOB:b0298.webp}}", "wp_short": "{{BLOB:b0299.webp}}", "wp_axe": "{{BLOB:b0300.webp}}", "wp_spear": "{{BLOB:b0301.webp}}", "wp_great": "{{BLOB:b0302.webp}}", "wp_mithblade": "{{BLOB:b0303.webp}}", "wp_obscleaver": "{{BLOB:b0304.webp}}", "t_sapling": "{{BLOB:b0305.webp}}", "t_oak": "{{BLOB:b0306.webp}}", "t_pine": "{{BLOB:b0307.webp}}", "t_arcane": "{{BLOB:b0308.webp}}", "t_birch": "{{BLOB:b0309.webp}}", "t_elder": "{{BLOB:b0310.webp}}", "t_dark": "{{BLOB:b0311.webp}}", "t_fruit": "{{BLOB:b0312.webp}}", "m2_thread": "{{BLOB:b0313.webp}}", "m2_cloth": "{{BLOB:b0314.webp}}", "m2_silk": "{{BLOB:b0315.webp}}", "fs_silver": "{{BLOB:b0316.webp}}", "fs_gold": "{{BLOB:b0317.webp}}", "fs_blue": "{{BLOB:b0318.webp}}", "fs_pale": "{{BLOB:b0319.webp}}", "fs_trout": "{{BLOB:b0320.webp}}", "fs_angler": "{{BLOB:b0321.webp}}", "fs_puffer": "{{BLOB:b0322.webp}}", "fs_cod": "{{BLOB:b0323.webp}}", "fs_eel": "{{BLOB:b0324.webp}}", "fs_koi": "{{BLOB:b0325.webp}}", "m2_leather": "{{BLOB:b0326.webp}}", "m2_linen": "{{BLOB:b0327.webp}}", "m2_cured": "{{BLOB:b0328.webp}}", "m2_cured2": "{{BLOB:b0329.webp}}", "m2_mana": "{{BLOB:b0330.webp}}", "m2_rune": "{{BLOB:b0331.webp}}", "m2_essence": "{{BLOB:b0332.webp}}", "m2_focus": "{{BLOB:b0333.webp}}", "bg_f1": "{{BLOB:b0334.webp}}", "bg_f2": "{{BLOB:b0335.webp}}", "bg_f3": "{{BLOB:b0336.webp}}", "bg_f4": "{{BLOB:b0337.webp}}", "c_radish": "{{BLOB:b0338.webp}}", "c_sage": "{{BLOB:b0339.webp}}", "c_herb": "{{BLOB:b0340.webp}}", "c_wheat": "{{BLOB:b0341.webp}}", "c_pumpkin_g": "{{BLOB:b0342.webp}}", "c_hay": "{{BLOB:b0343.webp}}", "c_clover": "{{BLOB:b0344.webp}}", "c_corn": "{{BLOB:b0345.webp}}", "c_potato": "{{BLOB:b0346.webp}}", "c_turnip": "{{BLOB:b0347.webp}}", "c_garlic": "{{BLOB:b0348.webp}}", "c_strawberry": "{{BLOB:b0349.webp}}", "c_rice": "{{BLOB:b0350.webp}}", "c_grapes": "{{BLOB:b0351.webp}}", "c_apple": "{{BLOB:b0352.webp}}", "c_pumpkin": "{{BLOB:b0353.webp}}", "c_tomato_v": "{{BLOB:b0354.webp}}", "c_tomato": "{{BLOB:b0355.webp}}", "c_melon": "{{BLOB:b0356.webp}}", "c_cabbage": "{{BLOB:b0357.webp}}", "fe_none": "{{BLOB:b0358.webp}}", "fe_manure": "{{BLOB:b0359.webp}}", "fe_compost": "{{BLOB:b0360.webp}}", "fe_bone": "{{BLOB:b0361.webp}}", "fe_miracle": "{{BLOB:b0362.webp}}", "map_oak": "{{BLOB:b0363.webp}}"};
Object.keys(SPR4).forEach(k=>{if(k.startsWith('bg_')||k==='map_oak')return;P['spr:'+k]=()=>'<image href="'+SPR4[k]+'" x="0" y="0" width="64" height="64" preserveAspectRatio="xMidYMid meet"/>'});
window.V4MAP=SPR4.map_oak;
const spf=(k,f)=>()=>P['spr:'+k]().replace('/>',f?' style="filter:'+f+'"/>':'/>');
/* crops + fertilizers */
const CRK={Radish:'c_radish',Wheat:'c_wheat',Herb:'c_herb',Pumpkin:'c_pumpkin',Tomato:'c_tomato',Melon:'c_melon',Hay:'c_hay',Clover:'c_clover',Corn:'c_corn',Potato:'c_potato',Turnip:'c_turnip',Cabbage:'c_cabbage',Garlic:'c_garlic',Strawberry:'c_strawberry',Rice:'c_rice',Grapes:'c_grapes',Apple:'c_apple'};
CROPS.forEach(c=>{if(CRK[c.n])c.ic='spr:'+CRK[c.n]});
[['carrot','c_radish'],['radish','c_radish'],['wheat','c_wheat'],['herb','c_herb'],['pumpkin','c_pumpkin'],['tomato','c_tomato'],['melon','c_melon'],['hay','c_hay'],['corn','c_corn']].forEach(([n,k])=>{P[n]=spf(k)});
const FEK=['fe_none','fe_manure','fe_compost','fe_bone','fe_miracle'];
if(typeof fEls!=='undefined')fEls.forEach((b,i)=>{const c=b.firstElementChild;if(c)c.outerHTML=icon('spr:'+FEK[i])});
if(typeof seedEls!=='undefined')seedEls.forEach((b,i)=>{const c=b.firstElementChild;if(c&&CROPS[i])c.outerHTML=icon(CROPS[i].ic)});
/* fish */
const FSP={sardine:['fs_blue'],carp:['fs_gold'],bass:['fs_silver'],trout:['fs_trout'],salmon:['fs_trout','sepia(.7) saturate(2.5) hue-rotate(-25deg)'],tuna:['fs_cod','hue-rotate(200deg) saturate(1.8) brightness(.8)'],swordfish:['fs_cod','hue-rotate(150deg) saturate(1.5)'],puffer:['fs_puffer'],eel:['fs_eel'],angler:['fs_angler'],
 perch:['fs_pale','hue-rotate(40deg) saturate(2)'],bluegill:['fs_blue','hue-rotate(40deg) saturate(1.5)'],catfish:['fs_silver','sepia(.8) brightness(.6)'],koi:['fs_koi'],grayling:['fs_pale'],pike:['fs_trout','hue-rotate(60deg) saturate(1.4)'],sturgeon:['fs_cod','grayscale(.8) brightness(.8)'],
 mackerel:['fs_blue','hue-rotate(160deg) saturate(1.6)'],snapper:['fs_koi','hue-rotate(-20deg) saturate(1.4)'],moonfish:['fs_pale','brightness(1.4)'],lanternfish:['fs_angler','hue-rotate(100deg) saturate(1.6)'],ghostfish:['fs_pale','brightness(1.6) saturate(.2)'],voidray:['fs_angler','hue-rotate(250deg) saturate(1.5) brightness(.8)']};
Object.keys(FSP).forEach(id=>{P['fish:'+id]=spf(FSP[id][0],FSP[id][1]);const f=FISH.find(x=>x.id===id);if(f)f.ic='fish:'+id});
P.fish=spf('fs_blue');
/* materials */
[['thread','m2_thread'],['cloth','m2_cloth'],['silkcloth','m2_silk'],['leather','m2_leather'],['cured','m2_cured'],['mana','m2_mana'],['rune','m2_rune'],['essence','m2_essence'],['focus','m2_focus'],['linen','m2_linen']].forEach(([id,k])=>{if(MATS[id])MATS[id].ic='spr:'+k});
/* weapons, armor, tools */
const WP={w_rusty:['wp_short','sepia(.8) brightness(.65) saturate(.7)'],w_dagger:['wp_dagger'],w_club:['wp_club'],w_short:['wp_short'],w_bow:['wp_bow'],w_axe:['wp_axe'],w_katana:['wp_katana'],w_spear:['wp_spear'],w_saber:['wp_saber'],w_hammer:['wp_hammer'],w_great:['wp_great'],w_staff:['wp_staff'],w_rapier:['wp_rapier'],w_mithril:['wp_mithblade'],w_dragon:['wp_dragonfang'],w_steel:['wp_short','brightness(1.25) saturate(.4)'],w_obs:['wp_obscleaver'],w_star:['wp_starsteel'],
 w_oakbow:['wp_bow','sepia(.35) saturate(1.3)'],w_pinebow:['wp_bow','hue-rotate(60deg)'],w_elderbow:['wp_bow','hue-rotate(230deg) saturate(1.3)'],w_oakstaff:['wp_spear','sepia(.3)'],w_birchstaff:['wp_spear','brightness(1.3) saturate(.5)'],w_elderstaff:['wp_spear','hue-rotate(230deg)'],w_birchdag:['wp_dagger','brightness(1.25) saturate(.6)'],w_ebon:['wp_dagger','grayscale(.6) brightness(.7)'],
 k_wand:['wp_staff','hue-rotate(40deg) brightness(1.1)'],k_scepter:['wp_rapier','hue-rotate(200deg)'],k_storm:['wp_starsteel','hue-rotate(60deg) brightness(1.2)'],
 a_cloth:['wp_robe','sepia(.8) saturate(.5) brightness(.9)'],a_leather:['wp_leathervest'],a_copper:['wp_gauntlet','hue-rotate(-15deg) saturate(1.4)'],a_fur:['wp_leathervest','sepia(.6) brightness(.8)'],a_iron:['wp_gauntlet'],a_silk:['wp_robe','hue-rotate(60deg)'],a_knight:['wp_mithgaunt','brightness(.9)'],a_silver:['wp_mithgaunt'],a_gold:['wp_drakehelm','sepia(1) saturate(3) hue-rotate(-10deg) brightness(1.1)'],a_brute:['wp_leathervest','hue-rotate(-20deg) saturate(1.5)'],a_mithril:['wp_mithgaunt','hue-rotate(10deg) saturate(1.6)'],a_dragon:['wp_drakehelm'],
 t_robe:['wp_robe','sepia(.5) saturate(.6) brightness(1.1)'],t_silk:['wp_robe','hue-rotate(40deg) brightness(1.1)'],t_arch:['wp_robe','hue-rotate(250deg) saturate(1.4)'],l_vest:['wp_leathervest','brightness(1.1)'],l_stud:['wp_leathervest','contrast(1.2) brightness(.9)'],l_cloak:['wp_leathervest','sepia(.5) brightness(.75)'],a_steel:['wp_mithgaunt','brightness(1.1) saturate(.5)'],a_obs:['wp_obsshield'],a_star:['wp_obsshield','hue-rotate(200deg) saturate(1.8) brightness(1.2)'],
 p_stone:['pick','grayscale(.8)'],p_copper:['pick','sepia(1) saturate(3) hue-rotate(-20deg)'],p_iron:['pick'],p_silver:['pick','brightness(1.4) saturate(.4)'],p_gold:['pick','sepia(1) saturate(4) hue-rotate(-5deg) brightness(1.2)'],p_mithril:['pick2','hue-rotate(10deg)'],p_steel:['pick','brightness(1.2) contrast(1.1)'],p_obs:['pick','brightness(.5) contrast(1.3)'],p_star:['pick2','hue-rotate(60deg) brightness(1.2)']};
Object.keys(WP).forEach(id=>{P['it:'+id]=spf(WP[id][0],WP[id][1])});
const _ii=iIcon;iIcon=(it,cl)=>P['it:'+it.id]?icon('it:'+it.id,null,cl):_ii(it,cl);
P.ring=spf('wp_ring');
/* trees + forest backgrounds */
const TRS={oak:['t_oak'],birch:['t_birch'],maple:['t_oak','hue-rotate(-40deg) saturate(1.5)'],pine:['t_pine'],willow:['t_elder','hue-rotate(35deg) saturate(.9)'],cedar:['t_pine','hue-rotate(-35deg) brightness(.85)'],ironwood:['t_dark'],redwood:['t_elder','hue-rotate(-35deg) saturate(1.3)'],elder:['t_arcane']};
treeSvg=t=>{const m=TRS[t.id]||['t_oak'];return '<svg viewBox="0 0 64 64" style="overflow:visible"><ellipse cx="32" cy="61" rx="22" ry="3" fill="#0005"/>'+P['spr:'+m[0]]().replace('x="0" y="0" width="64" height="64"','x="0" y="-2" width="64" height="64"').replace('/>',m[1]?' style="filter:'+m[1]+'"/>':'/>')+'</svg>'};
const ZBG=['bg_f1','bg_f2','bg_f4','bg_f2','bg_f3'],ZBF=['','','','sepia(.5) brightness(.8)',''];
V4.zoneBg=i=>'background:linear-gradient(#0000,#0003),url('+SPR4[ZBG[i]||'bg_f1']+') center/cover;'+(ZBF[i]?'':'');
{const c=document.createElement('style');c.textContent=`
.v4wd{background-size:cover!important}.v4tree{width:200px;height:230px;margin-left:-100px;bottom:8px}
.cv-map{aspect-ratio:960/418;height:auto!important;min-height:0!important;padding:0!important}
.cv-map .bgs{position:absolute;inset:0}.cv-map .bgs img{width:100%;height:100%;display:block;pointer-events:none}
.cv-map .bgs svg{position:absolute;inset:0;width:100%;height:100%;opacity:.65}
.cv-map .town{transform:translate(-50%,-50%)!important;background:#1c1409d9!important;border:2px solid #ffd778!important;border-radius:10px;padding:2px 6px!important;font-size:10px!important;z-index:3}
.cv-map .town{width:30px;height:30px;border-radius:50%!important;padding:3px!important;display:flex;align-items:center;justify-content:center}
.cv-map .town span{display:none!important}.cv-map .tip{display:none!important}
.cv-map .town .ic{width:20px!important;height:20px!important}
@media(min-width:900px){.cv-map .town{width:40px;height:40px}.cv-map .town .ic{width:26px!important;height:26px!important}}
.cv-map .town.here{box-shadow:0 0 0 3px #e0594a,0 0 14px #e0594a;animation:v4pulse 1.2s infinite}
@keyframes v4pulse{50%{transform:translate(-50%,-50%) scale(1.12)}}
.cv-map .wagon{transform:translate(-50%,-70%)!important;transition:left 1s linear,top 1s linear;z-index:4;filter:drop-shadow(0 2px 3px #000a)}
.cv-map .wagon .ic{width:30px!important;height:30px!important}
#v4ti{margin-top:8px;font-size:12px}#v4ti .g{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:4px 10px;margin:6px 0}#v4ti b{color:#ffd778}
#v4ti .ok{color:#7dffb0}#v4ti .bad{color:#ff8a7a}
.v4job{border:2px solid #ffd778;border-radius:12px;background:linear-gradient(135deg,#1b2a3a,#0d1520);padding:8px 10px;margin-bottom:8px}
.v4job .hd{display:flex;align-items:center;gap:8px}.v4job .hd .ic{width:30px;height:30px}.v4job .hd b{flex:1}.v4job .jt{font-weight:800;color:#ffd778}
.v4job .bar2{margin:6px 0}.v4job .btn{padding:6px 10px;font-size:12px}
#v4mg{position:fixed;inset:0;z-index:95;background:#000b;display:flex;align-items:center;justify-content:center;padding:14px}
#v4mg .box{width:min(380px,100%);border:3px solid #ffd778;border-radius:16px;background:linear-gradient(160deg,#1b2a3a,#0b121c);color:#fff;padding:14px;text-align:center;animation:v4pop .25s ease-out}
#v4mg .box .ic{width:70px;height:70px}#v4mg h3{margin:4px 0}
#seeds{display:grid!important;grid-template-columns:repeat(auto-fill,minmax(88px,1fr));gap:6px}
#seeds .seed .ic{width:42px!important;height:42px!important}
@media(min-width:900px){#grid{max-width:800px;margin-inline:auto;width:100%}#seeds{max-width:800px;margin-inline:auto}}
.v4pop{animation:v4popit .5s ease-out}
@keyframes v4popit{0%{transform:scale(1)}40%{transform:scale(1.18)}100%{transform:scale(1)}}
.v4sprk{position:absolute;pointer-events:none;z-index:6;font-size:16px;animation:v4chip .7s ease-out forwards}
`;document.head.appendChild(c)}

/* ---------- trade map info ---------- */
V4.tradeInfo=()=>{
  const old=$('v4ti');if(old)old.remove();
  const C=window.__cv,d=document.querySelector('.cv-detail');if(!C||!d)return;
  const sel=C.CVR.find(r=>r.id===S.cv.sel);if(!sel)return;
  const st=C.cvSt(),y=C.cvYield(st),dur=C.cvDur(sel,st),risk=C.cvRisk(sel,st);
  const lootV=sel.loot.reduce((a,[id,ch,lo,hi])=>a+ch*(lo+hi)/2*y*(VAL[id]||4),0),coinsV=(sel.coins[0]+sel.coins[1])/2*y;
  const gross=lootV+coinsV,net=gross*(1-risk*.5)-sel.cost,perMin=net/(dur/60);
  const rl=risk<.06?['Low','ok']:risk<.14?['Medium','']:['High','bad'];
  const nx=C.CVR.find(r=>r.l>L('trade'));
  const el=document.createElement('div');el.id='v4ti';el.className='card2';
  el.innerHTML='<b>Route intelligence</b><div class="g"><span>Travel time: <b>'+Math.round(dur)+'s</b> each way</span><span>Outfit: <b>'+sel.cost+'</b> coins</span><span>Bandit risk: <b class="'+rl[1]+'">'+rl[0]+' ('+Math.round(risk*100)+'%)</b></span><span>Rough haul value: <b>'+Math.round(gross)+'</b> coins</span><span>Expected profit: <b class="'+(net>0?'ok':'bad')+'">'+(net>0?'+':'')+Math.round(net)+'</b></span><span>Profit per minute: <b>'+Math.round(perMin)+'</b></span><span>Times completed: <b>'+(S.cv.done[sel.id]||0)+'</b></span><span>Free caravans: <b>'+(C.cvSlots()-S.cv.runs.length)+' / '+C.cvSlots()+'</b></span></div>'
   +'<small>Tip: '+(risk>=.14?'Use the Cautious stance or buy guards to protect the cargo.':risk>=.06?'Balanced stance is a good fit for this route.':'This road is safe. Daring stance earns more.')+(nx?' Next route: '+nx.n+' at Trading level '+nx.l+'.':' Every route unlocked.')+'</small>';
  d.parentNode.insertBefore(el,d.nextSibling);
};

/* ---------- timed crafting jobs ---------- */
S.jobs=S.jobs||{smith:null,carp:null};
const fmt=s=>{s=Math.max(0,Math.round(s));return s>=60?Math.floor(s/60)+'m '+String(s%60).padStart(2,'0')+'s':s+'s'};
const jobLeft=j=>Math.max(0,(j.t0+j.dur*1000-Date.now())/1000);
const spd=k=>1-Math.min(.45,.012*L(k));
function startJob(k,j){j.t0=Date.now();S.jobs[k]=j;save();try{SFX.forge()}catch(_){}render()}
function finishJob(k){
  const j=S.jobs[k];if(!j)return;S.jobs[k]=null;
  if(j.t==='it'){
    const it=IT.find(x=>x.id===j.id);let n=1;
    if(k==='smith'&&Math.random()<.003*L('smith')+.06*S.up.bellows)n=2;
    S.items[j.id]=cnt(j.id)+n;
    let s='';if(it&&sc(it)>sc(item(it.c))){S.eq[it.c]=it.id;s=' Equipped.'}
    addXp(k,j.xp);note('text','✔ <b>'+j.n+'</b> is ready'+(n>1?' (double!)':'')+'.'+s,0,'#7dffb0');
  }else{S.inv[j.id]=inv(j.id)+j.out;addXp(k,j.xp);note('text','✔ <b>'+j.n+'</b> finished at the workshop.',0,'#7dffb0')}
  try{SFX.lvl()}catch(_){}save();if(S.tab===k||(k==='smith'&&S.tab==='smith'))render();
}
const jobCard=k=>{
  const j=S.jobs[k];if(!j)return '';const left=jobLeft(j),p=1-left/j.dur,cost=Math.max(5,Math.ceil(left*.6));
  const ic=j.t==='it'?iIcon(IT.find(x=>x.id===j.id)||IT[0]):gIcon(j.id,'ic');
  return '<div class="v4job" data-k="'+k+'"><div class="hd">'+ic+'<b>'+(k==='smith'?'Forging ':'Crafting ')+j.n+'</b><span class="jt">'+fmt(left)+'</span></div><div class="bar2"><i class="jf" style="width:'+(p*100)+'%"></i></div><button class="btn alt" data-v4="rush" data-i="'+k+'">Rush it ('+cost+' coins)</button></div>';
};
setInterval(()=>{
  ['smith','carp'].forEach(k=>{const j=S.jobs[k];if(!j)return;
    if(jobLeft(j)<=0){finishJob(k);return}
    const c=document.querySelector('.v4job[data-k="'+k+'"]');if(c){c.querySelector('.jt').textContent=fmt(jobLeft(j));c.querySelector('.jf').style.width=((1-jobLeft(j)/j.dur)*100)+'%';const b=c.querySelector('[data-v4="rush"]');if(b)b.textContent='Rush it ('+Math.max(5,Math.ceil(jobLeft(j)*.6))+' coins)'}});
},400);
{const _s=VIEWS.smith;VIEWS.smith=()=>jobCard('smith')+_s();const _c=VIEWS.carp;VIEWS.carp=()=>jobCard('carp')+_c()}
anvilAct=function(){
  const it=IT.find(x=>x.id===forgeSel);
  if(!it){say('Choose something to forge from the list below.');try{SFX.err()}catch(_){}return}
  if(S.jobs.smith){say('The forge is busy. Wait for the current item or rush it.');try{SFX.err()}catch(_){}return}
  if(!hasMats(it)){forgeHits=0;say(missMsg('Smithing','smith',it.l,it.r,it.g,{q:qEff}));try{SFX.err()}catch(_){}return}
  const hits=it.c==='w'?hitsNeed(L('smith')):1;forgeHits++;try{SFX.forge()}catch(_){}
  if(forgeHits>=hits){
    forgeHits=0;it.r.forEach(x=>S.inv[x[0]]-=qEff(x[1]));S.coins-=it.g;
    const base=(it.c==='w'?20:it.c==='a'?16:14)+it.l*(it.c==='w'?12:it.c==='a'?10:9);
    startJob('smith',{k:'smith',t:'it',id:it.id,n:it.n,xp:6+it.l*6,dur:Math.max(8,Math.round(base*spd('smith')))});
    say('Forging started. It will be ready soon.');
  }else say('Keep hammering ('+forgeHits+'/'+hits+').');
};
/* mini-game for carpentry weapons */
function minigame(title,ic,rounds,cb){
  const root=document.createElement('div');root.id='v4mg';let n=0,perf=0,mk=0,dir=1,raf=0,last=0,zc=30+Math.random()*40,zw=20;
  root.innerHTML='<div class="box">'+ic+'<h3>'+title+'</h3><p class="h">Tap <b>Carve</b> when the marker is in the green zone. Round <span id="v4mr">1</span>/'+rounds+'</p><div class="v4mt"><i class="zn" id="v4mz"></i><i class="mk" id="v4mm"></i></div><button class="btn full" id="v4mb">Carve</button></div>';
  document.body.appendChild(root);
  const z=root.querySelector('#v4mz'),m=root.querySelector('#v4mm'),setz=()=>{z.style.left=(zc-zw/2)+'%';z.style.width=zw+'%'};setz();
  const loop=ts=>{const dt=Math.min(.05,(ts-(last||ts))/1000);last=ts;mk+=dir*dt*(110+n*18);if(mk>=100){mk=100;dir=-1}if(mk<=0){mk=0;dir=1}m.style.left=mk+'%';raf=requestAnimationFrame(loop)};
  raf=requestAnimationFrame(loop);
  root.querySelector('#v4mb').onclick=()=>{
    if(Math.abs(mk-zc)<=zw/2){perf++;try{SFX.mine()}catch(_){}}else{try{SFX.err()}catch(_){}}
    n++;if(n>=rounds){cancelAnimationFrame(raf);root.remove();cb(perf);return}
    root.querySelector('#v4mr').textContent=n+1;zc=25+Math.random()*50;zw=Math.max(12,zw-2);setz();
  };
}
function carpGood(id,btn){
  const g=GOODS.find(x=>x.id===id);if(!g)return;
  if(S.jobs.carp){say('The workbench is busy. Wait or rush the current job.');try{SFX.err()}catch(_){}return}
  if(cLv()<g.l||!g.r.every(([a,n])=>inv(a)>=n)){say(missMsg('Carpentry',null,g.l,g.r,0,{lv:cLv()}));try{SFX.err()}catch(_){}return}
  g.r.forEach(([a,n])=>S.inv[a]=inv(a)-n);
  startJob('carp',{k:'carp',t:'gd',id:g.id,n:g.n,out:g.out,xp:g.xp,dur:Math.max(4,Math.round((4+g.l*3)*spd('carp')))});
}
function carpMake(id,btn){
  const it=IT.find(x=>x.id===id);if(!it)return;
  if(S.jobs.carp){say('The workbench is busy. Wait or rush the current job.');try{SFX.err()}catch(_){}return}
  if(cLv()<it.l||S.coins<it.g||!it.r.every(x=>inv(x[0])>=x[1])){say(missMsg('Carpentry',null,it.l,it.r,it.g,{lv:cLv()}));try{SFX.err()}catch(_){}return}
  minigame('Carve the '+it.n,iIcon(it),3,perf=>{
    it.r.forEach(x=>S.inv[x[0]]-=x[1]);S.coins-=it.g;
    const base=18+it.l*9,f=1-.14*perf;
    startJob('carp',{k:'carp',t:'it',id:it.id,n:it.n,xp:Math.round((10+it.l*3)*(1+.15*perf)),dur:Math.max(8,Math.round(base*spd('carp')*f))});
    note('text',perf>=3?'<b>Masterwork cuts!</b> Crafting time slashed.':perf?perf+'/3 clean cuts — faster crafting.':'Rough cuts. Normal crafting time.',0,perf>=2?'#ffd778':'#9fb7c9');
  });
}
$('pane').addEventListener('click',e=>{
  const b=e.target.closest('[data-v4="rush"]');if(!b)return;const k=b.dataset.i,j=S.jobs[k];if(!j)return;
  const cost=Math.max(5,Math.ceil(jobLeft(j)*.6));
  if(S.coins<cost){say('Not enough coins to rush ('+cost+').');try{SFX.err()}catch(_){}return}
  S.coins-=cost;j.dur=0;finishJob(k);
});

/* ---------- completion alerts ---------- */
const seen=new Set();V4.seen=seen;let firstPass=true;
setInterval(()=>{
  if(!$('intro').hidden||document.getElementById('v4cls'))return;
  const readyP=[],readyA=[];
  S.plots.forEach((p,i)=>{if(p.open&&p.c>=0&&prog(p)>=1){const k='p'+i+':'+p.at;if(!seen.has(k)){seen.add(k);readyP.push(CROPS[p.c].n)}}});
  S.barn.forEach((p,i)=>{if(p&&i<cap()&&aProg(p)>=1){const k='a'+i+':'+p.at;if(!seen.has(k)){seen.add(k);readyA.push(ANI[p.t]?ANI[p.t].n:'Animal')}}});
  if(readyP.length)note('text','🌱 <b>'+readyP.length+'</b> crop'+(readyP.length>1?'s':'')+' ready to harvest: '+[...new Set(readyP)].join(', ')+'.',0,'#7dffb0');
  if(readyA.length)note('text','🐾 <b>'+readyA.length+'</b> animal'+(readyA.length>1?'s':'')+' ready to collect: '+[...new Set(readyA)].join(', ')+'.',0,'#ffd778');
  (S.cv.runs||[]).forEach(r=>{const k='c'+r.t0;if(Date.now()>=r.t0+r.dur*1000&&!seen.has(k)){seen.add(k);const rt=window.__cv&&window.__cv.CVR.find(x=>x.id===r.r);note('text','🐪 Caravan returned from <b>'+(rt?rt.n:'the road')+'</b>. Collect the haul in Trade.',0,'#ffb35a')}});
  firstPass=false;
},1000);

/* ---------- farm: plant all + harvest sparkle ---------- */
{
  const fb=$('v4fbar');
  if(fb&&!fb.querySelector('[data-q="plant"]'))fb.insertAdjacentHTML('afterbegin','<button class="btn alt" data-q="plant">Plant all</button>');
  fb&&fb.addEventListener('click',e=>{const b=e.target.closest('[data-q="plant"]');if(!b)return;let n=0;
    S.plots.forEach((p,i)=>{if(p.open&&p.c<0&&S.coins>=CROPS[S.sel].cost){tapPlot(i);n++}});if(!n)say('No empty plots, or not enough coins for seeds.');});
  document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('#grid .plot');V4.lastPlot=null;if(!t)return;const i=[...t.parentNode.children].indexOf(t),p=S.plots[i];if(p&&p.open&&p.c>=0&&prog(p)>=1)V4.lastPlot=i},true);
  const _r4=render;render=function(){const r=_r4.apply(this,arguments);
    if(S.tab==='farm'&&V4.lastPlot!=null){const t=$('grid')&&$('grid').children[V4.lastPlot];
      if(t){t.classList.add('v4pop');['✨','🌿','⭐','🪙'].forEach((s,k)=>{const c=document.createElement('i');c.className='v4sprk';c.textContent=s;c.style.left=(20+k*20)+'%';c.style.top='30%';c.style.setProperty('--dx',(k%2?1:-1)*(8+k*6)+'px');c.style.setProperty('--dy',(-26-k*6)+'px');t.appendChild(c);setTimeout(()=>c.remove(),700)})}
      V4.lastPlot=null}
    if(S.tab==='trade')V4.tradeInfo();
    return r};
}


