
(function(){
'use strict';
/* ---- nav height -> padding of the page ---- */
const nav=document.querySelector('nav');
const setNav=()=>document.documentElement.style.setProperty('--nav-h',nav.offsetHeight+'px');
setNav();if(window.ResizeObserver)new ResizeObserver(setNav).observe(nav);window.addEventListener('resize',setNav);
try{chTab.innerHTML=icon('book-open','#c9b8ff')+'Chronicle'}catch(e){}

/* ---- forge: every ore recipe now uses bars (1 bar = 2 ore) ---- */
const O2B={copper:'cbar',iron:'ibar',silver:'sbar',gold:'gbar',mithril:'mbar'};
IT.forEach(it=>{if(!it.r||it._bars)return;it._bars=1;const m={};
  it.r.forEach(([id,n])=>{if(O2B[id]){const b=O2B[id];m[b]=(m[b]||0)+Math.max(1,Math.ceil(n/2))}else m[id]=(m[id]||0)+n});
  it.r=Object.entries(m)});

/* ---- bat that looks like a bat ---- */
function batArt(body,belly,wing,eyeC){
  const fin='stroke="#2a1840" stroke-width="1.8" fill="none"';
  return '<ellipse cx="50" cy="94" rx="15" ry="3" fill="#000" opacity=".25" stroke="none"/>'
  +'<g class="bat-wl"><path d="M43 50C34 38 18 30 3 31Q9 40 12 49Q18 46 22 56Q28 53 31 63Q38 60 44 62Z" fill="'+wing+'"/><path d="M43 50L12 49M43 50L22 56M43 50L31 63M43 50L3 31" '+fin+'/></g>'
  +'<g class="bat-wr"><path d="M57 50C66 38 82 30 97 31Q91 40 88 49Q82 46 78 56Q72 53 69 63Q62 60 56 62Z" fill="'+wing+'"/><path d="M57 50L88 49M57 50L78 56M57 50L69 63M57 50L97 31" '+fin+'/></g>'
  +'<path d="M44 80l-3 8M56 80l3 8" stroke-width="3" fill="none"/>'
  +'<ellipse cx="50" cy="63" rx="13" ry="17" fill="'+body+'"/><ellipse cx="50" cy="67" rx="8" ry="11" fill="'+belly+'" stroke="none"/>'
  +'<path d="M38 34L32 10L48 27Z" fill="'+body+'"/><path d="M62 34L68 10L52 27Z" fill="'+body+'"/>'
  +'<path d="M38.5 30L35.5 17L44 26Z" fill="'+belly+'" stroke="none"/><path d="M61.5 30L64.5 17L56 26Z" fill="'+belly+'" stroke="none"/>'
  +'<circle cx="50" cy="42" r="15" fill="'+body+'"/>'+hl(44,34,5,3,-20)
  +eye(43,41,4.4,eyeC)+eye(57,41,4.4,eyeC)
  +'<ellipse cx="50" cy="47" rx="2.2" ry="1.6" fill="#1a0f26" stroke="none"/>'
  +'<path d="M44 50Q50 55 56 50Z" fill="#2a0f2e"/><path d="M45.5 50.5l2 5 2-5zM50.5 50.5l2 5 2-5z" fill="#fff" stroke-width="1.4"/>';
}
const BATS={'Bat':['#4a3478','#8a6cc8','#7a56b8','#f2b705'],'Crimson Bat':['#7a1a24','#e06070','#c9303d','#ffe14a'],'Void Bat':['#14143a','#4a4a9a','#2a2a5a','#6fe0ff']};
FOES.forEach(f=>{if(/bat/i.test(f.n)){const c=BATS[f.n]||BATS.Bat;f.a=batArt(c[0],c[1],c[2],c[3])}});
window.__batArt=batArt;

/* ============================================================
   Caravan expeditions (replaces the old town trading)
   ============================================================ */
const CVR=[
 {id:'meadow',n:'Greenvale Market Road',s:'Market',ic:'sack',x:30.8,y:76,l:1,t:20,cost:10,risk:.02,xp:6,coins:[4,10],d:'A short run to the village markets for farm goods.',loot:[['herb',.85,2,4],['egg',.7,1,3],['feather',.6,1,3],['hay',.6,2,4],['wool',.25,1,2],['milk',.15,1,1]]},
 {id:'wood',n:'Whispering Woodland Trail',s:'Woodland',ic:'axe',x:12.6,y:56.7,l:2,t:35,cost:30,risk:.06,xp:10,coins:[8,18],d:'Hunters and loggers trade timber and pelts.',loot:[['oak',.9,3,5],['birch',.6,2,3],['hide',.7,1,3],['fur',.4,1,2],['feather',.5,1,3],['herb',.5,1,3],['pine',.2,1,2]]},
 {id:'copper',n:'Copper Hills Pass',s:'Copper Hills',ic:'pick',x:36.1,y:53.3,l:3,t:50,cost:60,risk:.08,xp:15,coins:[12,28],d:'Miners haul ore down the mountain pass.',loot:[['copper',.95,5,9],['coal',.8,3,5],['iron',.6,2,4],['bone',.5,1,3],['fang',.25,1,2]]},
 {id:'coast',n:'Seaside Fisher Road',s:'Seaside',ic:'fish',x:61.9,y:78.4,l:4,t:60,cost:80,risk:.06,xp:20,coins:[15,35],d:'Fishermen sell their catch at the harbour.',loot:[['sardine',.9,4,8],['bass',.7,3,5],['trout',.5,1,3],['salmon',.35,1,2],['tuna',.15,1,1],['pearl',.06,1,1]]},
 {id:'sand',n:'Sandmoor Caravan Road',s:'Sandmoor',ic:'map',x:57.9,y:52.8,l:6,t:90,cost:150,risk:.12,xp:30,coins:[30,70],d:'Desert merchants carry silver, silk and crystals.',loot:[['silver',.9,3,5],['crystal',.6,1,3],['silk',.8,2,5],['truffle',.3,1,2],['gold',.2,1,1]]},
 {id:'iron',n:'Ironhold Mining Road',s:'Ironhold',ic:'anvil',x:83.5,y:49.2,l:8,t:110,cost:250,risk:.14,xp:40,coins:[50,110],d:'Dwarven carts bring rich metals and ready bars.',loot:[['iron',.95,6,10],['silver',.7,3,5],['gold',.55,2,4],['coal',.8,3,6],['ibar',.25,1,3]]},
 {id:'ember',n:'Emberdeep Highlands',s:'Emberdeep',ic:'wisp',x:85.5,y:23.7,l:10,t:140,cost:400,risk:.16,xp:55,coins:[80,160],d:'Volcanic trade routes full of gold and obsidian.',loot:[['gold',.9,4,7],['obsidian',.7,1,3],['mithril',.4,1,3],['core',.5,1,2],['scale',.25,1,2],['coal',.8,3,6]]},
 {id:'frost',n:'Frostfall Pass',s:'Frostfall',ic:'crystal',x:52,y:17.3,l:13,t:175,cost:650,risk:.18,xp:75,coins:[120,240],d:'A freezing pass guarded by hardy caravaneers.',loot:[['mithril',.9,4,7],['crystal',.8,2,5],['wisp',.6,2,4],['silkcloth',.4,1,3],['core',.5,1,3],['obsal',.15,1,1]]},
 {id:'star',n:'Starfall Expedition',s:'Starfall',ic:'starstone',x:19.5,y:18.7,l:16,t:220,cost:1000,risk:.22,xp:110,coins:[200,420],d:'A legendary journey to the meteor fields.',loot:[['mithril',1,6,10],['agem',.6,1,3],['scale',.6,2,4],['essence',.4,1,2],['starstone',.15,1,1],['core',.6,2,4]]}
];
const CV_ST={safe:{n:'Cautious',t:1.25,loot:.9,risk:.4,d:'Slower, 10% less loot, far fewer bandits'},bal:{n:'Balanced',t:1,loot:1,risk:1,d:'Standard journey'},bold:{n:'Daring',t:.85,loot:1.25,risk:1.8,d:'Faster, +25% loot, more bandits'}};
S.cv=Object.assign({runs:[],sel:'meadow',stance:'bal',done:{},log:[]},S.cv||{});
if(S.trade)S.trade.to=null;
const cvSlots=()=>1+Math.floor(L('trade')/6);
const cvSt=()=>CV_ST[S.cv.stance]||CV_ST.bal;
const cvDur=(r,st)=>Math.max(8,r.t*st.t*(1-Math.min(.4,.005*L('trade'))-.08*S.up.horse));
const cvYield=st=>(1+.10*S.up.wagon)*(1+.01*L('trade'))*st.loot;
const cvRisk=(r,st)=>{const b=r.risk*st.risk;return Math.min(.6,Math.max(b*.2,b-.03*S.up.guard-.001*L('trade')))};
const fmtT=s=>{s=Math.max(0,Math.round(s));return s>=60?Math.floor(s/60)+'m '+(s%60)+'s':s+'s'};
const cvRoute=id=>CVR.find(x=>x.id===id);

function cvSend(id){
  const r=cvRoute(id),st=cvSt();if(!r)return;
  if(L('trade')<r.l){say('This route needs Trading level '+r.l+'.');SFX.err();return}
  if(S.cv.runs.length>=cvSlots()){say('All your caravans are on the road. Wait for one to return.');SFX.err();return}
  if(S.coins<r.cost){say('Outfitting this caravan costs '+r.cost+' coins.');SFX.err();return}
  const dur=cvDur(r,st);S.coins-=r.cost;S.cv.runs.push({r:id,st:S.cv.stance,t0:Date.now(),dur});
  SFX.coin();say('Caravan sent along '+r.n+' ('+fmtT(dur)+').');
}
function cvCollect(i){
  const run=S.cv.runs[i];if(!run||Date.now()<run.t0+run.dur*1000)return;
  const r=cvRoute(run.r),st=CV_ST[run.st]||CV_ST.bal,y=cvYield(st),got={};
  r.loot.forEach(([id,ch,a,b])=>{if(Math.random()<ch){got[id]=Math.max(1,Math.round(rnd(a,b)*y))}});
  if(!Object.keys(got).length){const f=r.loot[0];got[f[0]]=Math.max(1,Math.round(f[2]*y))}
  let coins=Math.round(earn(rnd(r.coins[0],r.coins[1])*st.loot,'trade')*(1+.03*S.up.ledger)),note='';
  if(Math.random()<cvRisk(r,st)){
    Object.keys(got).forEach(id=>{got[id]=Math.max(0,got[id]-Math.floor(got[id]*(.4+Math.random()*.2)))});coins=Math.floor(coins/2);
    note=' Bandits ambushed the caravan and stole part of the cargo!';
  }else if(Math.random()<.1){
    const ks=Object.keys(got),k=ks[rnd(0,ks.length-1)];got[k]*=2;coins=Math.round(coins*1.5);note=' Lucky find: the merchants gave you extra goods!';
  }
  const parts=[];Object.keys(got).forEach(id=>{if(got[id]>0){S.inv[id]=inv(id)+got[id];parts.push('+'+got[id]+' '+nm(id))}});
  S.coins+=coins;addXp('trade',r.xp);S.cv.done[r.id]=(S.cv.done[r.id]||0)+1;
  S.cv.runs.splice(i,1);
  const line=r.n+': '+(parts.join(', ')||'nothing')+', +'+coins+' coins.'+note;
  S.cv.log.unshift(line);S.cv.log=S.cv.log.slice(0,5);
  say('Caravan home! '+line);SFX.win();
  toast('Caravan returned from <b>'+r.s+'</b><br><small>'+(parts.slice(0,3).join(', ')||'no cargo')+', +'+coins+' coins</small>',note.includes('Bandits')?'bonus':'reward');
}
function cvSellGoods(id){
  const g=TRADE.find(x=>x.id===id),n=inv(id);if(!g||!n){return}
  const m=Math.round(earn(g.b*n,'trade')*(1+.03*S.up.ledger));S.inv[id]=0;S.coins+=m;say('Sold '+n+' '+g.n+' for '+m+' coins.');SFX.coin();
}
const cvPos=(run,r,p)=>{const H={x:9.1,y:84};return p<.5?{x:H.x+(r.x-H.x)*p*2,y:H.y+(r.y-H.y)*p*2}:{x:r.x+(H.x-r.x)*(p-.5)*2,y:r.y+(H.y-r.y)*(p-.5)*2}};
const lootTier=ch=>ch>=.6?['','Common']:ch>=.3?['u','Uncommon']:['r','Rare'];

window.__cv={CVR,cvYield,cvRisk,cvDur,cvSt,cvSlots};
VIEWS.trade=function(){
  const C=S.cv,sel=cvRoute(C.sel)||CVR[0],st=cvSt(),tl=L('trade'),sl=cvSlots();
  const H={x:9.1,y:84},now=Date.now();
  const lines=CVR.map(r=>'<line x1="'+H.x+'" y1="'+H.y+'" x2="'+r.x+'" y2="'+r.y+'" stroke="'+(r.id===sel.id?'#c0503a':'#a8743b')+'" stroke-width="'+(r.id===sel.id?2.6:1.4)+'" stroke-dasharray="4 4" vector-effect="non-scaling-stroke" opacity="'+(tl>=r.l?1:.35)+'"/>').join('');
  const mapbg='<div class="bgs"><img src="'+(window.V4MAP||'')+'" alt="" draggable="false"><svg viewBox="0 0 100 100" preserveAspectRatio="none">'+lines+'</svg></div>';
  const nodes=CVR.map(r=>{const ok=tl>=r.l;return '<button class="town'+(r.id===sel.id?' here':'')+(ok?'':' lockd')+'" style="left:'+r.x+'%;top:'+r.y+'%" data-x="cvsel" data-i="'+r.id+'">'+icon(ok?r.ic:'lock')+'<span>'+(ok?r.s:'Lv '+r.l)+'</span></button>'}).join('');
  const home='<div class="town cv-home" style="left:'+H.x+'%;top:'+H.y+'%;pointer-events:none">'+icon('town')+'<span>Home</span></div>';
  const wagons=C.runs.map((run,i)=>{const r=cvRoute(run.r),p=Math.min(1,(now-run.t0)/(run.dur*1000)),q=cvPos(run,r,p);return '<div class="wagon" id="cvw'+i+'" style="left:'+q.x+'%;top:'+q.y+'%">'+icon('wagon')+'</div>'}).join('');
  const map='<div class="stage s-map cv-map" id="stg" data-a="miss">'+mapbg+nodes+home+wagons+'<div class="tip" style="position:absolute;bottom:6px;left:0;right:0;z-index:3;color:#3a2a10;text-shadow:none">Tap a place on the map to choose a route</div></div>';
  const runs=C.runs.map((run,i)=>{const r=cvRoute(run.r),p=Math.min(1,(now-run.t0)/(run.dur*1000)),ready=p>=1;
    return '<div class="card2 cv-run"><div class="row"><b>'+icon('wagon','#b8803f','ic')+' '+r.n+'</b><small>'+(CV_ST[run.st]||CV_ST.bal).n+'</small></div><div class="bar2"><i id="cvb'+i+'" style="width:'+(p*100)+'%"></i></div><div class="row"><span id="cvt'+i+'">'+(ready?'Returned! Collect your haul':fmtT(run.dur*(1-p))+' left')+'</span>'+(ready?'<button class="btn" data-x="cvget" data-i="'+i+'">Collect</button>':'')+'</div></div>'}).join('');
  const stances=Object.keys(CV_ST).map(k=>'<button class="btn '+(C.stance===k?'':'alt')+'" data-x="cvst" data-i="'+k+'">'+CV_ST[k].n+'</button>').join('');
  const ok=tl>=sel.l,dur=cvDur(sel,st),y=cvYield(st),risk=cvRisk(sel,st);
  const loot=sel.loot.map(([id,ch,a,b])=>{const t=lootTier(ch);return '<span class="'+t[0]+'" title="'+t[1]+'">'+gIcon(id,'ic')+nm(id)+' '+Math.max(1,Math.round(a*y))+'-'+Math.max(1,Math.round(b*y))+'</span>'}).join('');
  const detail='<div class="card2 cv-detail"><div class="cv-title">'+icon(ok?sel.ic:'lock',null,'ic')+'<b>'+sel.n+'</b><small>Trading Lv '+sel.l+'</small></div><small>'+sel.d+'</small>'
   +'<div class="cv-stats"><span>Time '+fmtT(dur)+'</span><span>Outfit '+sel.cost+' coins</span><span>Bandit risk '+Math.round(risk*100)+'%</span><span>Trading XP '+sel.xp+'</span><span>Done x'+(C.done[sel.id]||0)+'</span></div>'
   +'<div class="cv-loot">'+loot+'</div>'
   +'<div class="btns">'+stances+'</div><small>'+st.d+'</small>'
   +'<button class="btn full" data-x="cvgo" data-i="'+sel.id+'"'+(ok?'':' disabled')+'>'+(ok?(C.runs.length>=sl?'All caravans are out':'Send caravan'):'Requires Trading level '+sel.l)+'</button></div>';
  const list=CVR.map(r=>{const o=tl>=r.l;return '<button class="cv-row'+(r.id===sel.id?' on':'')+(o?'':' dim')+'" data-x="cvsel" data-i="'+r.id+'">'+icon(o?r.ic:'lock',null,'ic')+'<div><b>'+r.n+'</b><small>'+(o?fmtT(cvDur(r,st))+' · outfit '+r.cost+' coins':'Unlocks at Trading level '+r.l)+'</small></div><span class="tag">'+(o?'x'+(C.done[r.id]||0):'Lv '+r.l)+'</span></button>'}).join('');
  const goods=TRADE.filter(g=>inv(g.id)>0).map(g=>'<div class="rowd"><div class="rec">'+gIcon(g.id)+'<div><b>'+g.n+' x'+inv(g.id)+'</b><small>'+g.b+' coins each</small></div></div><button class="btn alt" data-x="cvsell" data-i="'+g.id+'">Sell all</button></div>').join('');
  return skillBar('trade')
   +'<p class="h">Caravans on the road: '+C.runs.length+' / '+sl+' &middot; Haul bonus +'+Math.round((y/st.loot-1)*100)+'% &middot; Trade levels unlock new routes and more caravans (1 extra per 6 levels).</p>'
   +map+(C.runs.length?'<div class="ttl">Caravans on the road</div><div class="col">'+runs+'</div>':'')
   +'<div class="ttl">Route</div>'+detail
   +'<div class="ttl">All routes</div><div class="col">'+list+'</div>'
   +(goods?'<div class="ttl">Old trade goods</div><div class="col">'+goods+'</div>':'')
   +(C.log.length?'<div class="ttl">Recent returns</div><div class="card2 cv-log">'+C.log.map(l=>'<div>'+l+'</div>').join('')+'</div>':'');
};
tradeTick=function(){
  const C=S.cv;if(!C||!C.runs.length)return;const now=Date.now();let changed=false;
  C.runs.forEach((run,i)=>{
    const r=cvRoute(run.r),p=Math.min(1,(now-run.t0)/(run.dur*1000));
    if(p>=1&&!run.ready){run.ready=true;changed=true;toast('Caravan returned from <b>'+r.s+'</b>. Collect it in the Trade tab.','reward');SFX.win()}
    if(S.tab==='trade'&&!run.ready){
      const b=$('cvb'+i);if(b)b.style.width=(p*100)+'%';
      const t=$('cvt'+i);if(t)t.textContent=fmtT(run.dur*(1-p))+' left';
      const w=$('cvw'+i);if(w){const q=cvPos(run,r,p);w.style.left=q.x+'%';w.style.top=q.y+'%'}
    }
  });
  if(changed){save();if(S.tab==='trade')render()}
};
setInterval(()=>{if(S.cv.runs.some(r=>!r.ready&&Date.now()>=r.t0+r.dur*1000)&&$('intro').hidden)tradeTick()},1000);
$('pane').addEventListener('click',e=>{
  const b=e.target.closest('[data-x]');if(!b)return;const a=b.dataset.x,i=b.dataset.i;
  if(a==='cvsel')S.cv.sel=i;else if(a==='cvst')S.cv.stance=i;else if(a==='cvgo')cvSend(i);
  else if(a==='cvget')cvCollect(+i);else if(a==='cvsell')cvSellGoods(i);else return;
  save();render();
});
if(S.tab==='trade')render();
window.__rpgV3Ready=true;
})();
