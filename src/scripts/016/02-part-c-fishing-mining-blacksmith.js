/* ================= part C · fishing · mining · blacksmith · balance ================= */
const stc2=document.createElement('style');
stc2.textContent=`
.v4z b{font-size:13px}
.pnd-spot.special i{border-color:var(--sc);box-shadow:0 0 14px var(--sc),inset 0 0 12px var(--sc)}
.pnd-spot.special .disc{background:radial-gradient(circle,#ffffff66,var(--sc) 80%,transparent);animation:v4glow 1.3s ease-in-out infinite;border-style:solid;border-color:var(--sc)}
.pnd-spot.special:after{content:'★';position:absolute;right:-4px;top:-6px;color:var(--sc);font-size:18px;text-shadow:0 0 8px var(--sc),0 1px 2px #000;animation:v4tw 1s ease-in-out infinite}
@keyframes v4glow{0%,100%{opacity:.55;transform:scale(.92)}50%{opacity:1;transform:scale(1.06)}}
@keyframes v4tw{0%,100%{transform:scale(.8) rotate(0)}50%{transform:scale(1.25) rotate(25deg)}}
.rpg-minetile.v4vein{box-shadow:0 0 0 2px #ffd84d,0 0 12px #ffd84daa,inset 0 0 12px #ffd84d66!important}
.rpg-minetile.v4vein:before{content:'VEIN';position:absolute;left:2px;top:1px;font-size:7px;font-weight:900;color:#ffd84d;text-shadow:0 1px 2px #000;z-index:2;letter-spacing:.5px}
.rpg-minetile:after{content:'';position:absolute;inset:0;pointer-events:none;opacity:calc(var(--cr,0)*1.15);background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Cpath d='M20 2L17 12 24 17 15 24 22 30 18 38M17 12L8 10M24 17L33 14M15 24L6 28M22 30L31 34' stroke='%23000' stroke-width='1.6' fill='none' stroke-linecap='round'/%3E%3C/svg%3E") center/100% 100% no-repeat}
.rpg-minetile{position:relative}
.rpg-minetile.v4hit{animation:v4shake .22s ease-out}
@keyframes v4shake{0%{transform:translate(0,0)}25%{transform:translate(-3px,1px) rotate(-3deg)}60%{transform:translate(3px,-1px) rotate(3deg)}100%{transform:none}}
.v4rock{position:absolute;width:6px;height:6px;background:#9aa0aa;border-radius:1px;pointer-events:none;z-index:5;animation:v4chip .5s ease-out forwards}
#v4amb{position:fixed;inset:0;z-index:95;background:#000b;display:flex;align-items:center;justify-content:center;padding:14px}
#v4amb .box{width:min(380px,100%);border:3px solid #e0594a;border-radius:16px;background:linear-gradient(160deg,#2a1218,#0d1420);color:#fff;padding:14px;box-shadow:0 0 30px #e0594a88;animation:v4pop .3s ease-out}
#v4amb h3{margin:0 0 8px;color:#ff8a7a;letter-spacing:1px;text-align:center;animation:v4blink 1s infinite}
#v4amb .row{display:flex;gap:12px;align-items:center}#v4amb .row .art{width:96px;height:96px;flex:none;background:#0006;border-radius:12px}
#v4amb dl{margin:0;display:grid;grid-template-columns:auto 1fr;gap:2px 10px;font-size:13px}#v4amb dt{color:#9fb7c9}#v4amb dd{margin:0;font-weight:700}
#v4amb .drops{margin:8px 0 0;font-size:12px;color:#c9dbe8}
#v4amb .btns{display:flex;gap:8px;margin-top:12px}
@keyframes v4pop{from{transform:scale(.7);opacity:0}to{transform:none;opacity:1}}
@keyframes v4blink{50%{opacity:.55}}
.v4fxo{position:fixed;pointer-events:none;z-index:60;overflow:visible}
.v4fxo .hm{position:absolute;left:50%;top:6%;width:84px;height:84px;margin-left:-42px;transform-origin:85% 85%;animation:v4hm .32s ease-in both}
.v4fxo .hm .ic{width:100%;height:100%}
.v4fxo .sp{position:absolute;left:50%;top:56%;width:5px;height:5px;border-radius:50%;background:#ffcf4a;box-shadow:0 0 6px #ff8a1a;animation:v4sp .55s ease-out .22s both}
.v4fxo .gl{position:absolute;inset:0;background:radial-gradient(circle at 50% 56%,#ffb02a99,transparent 55%);opacity:0;animation:v4gl .5s ease-out .2s}
@keyframes v4hm{0%{transform:rotate(-70deg) translateY(-14px)}70%{transform:rotate(10deg)}100%{transform:rotate(0)}}
@keyframes v4sp{from{transform:translate(0,0) scale(1)}to{transform:translate(var(--dx),var(--dy)) scale(.2);opacity:0}}
@keyframes v4gl{0%{opacity:0}30%{opacity:1}100%{opacity:0}}
.v4big{position:absolute;left:0;right:0;top:20%;text-align:center;font-size:30px;font-weight:900;color:#ffd84d;text-shadow:0 2px 6px #000;animation:v4up .9s ease-out forwards}
`;
document.head.appendChild(stc2);

/* ---------- more fish ---------- */
const addFish=(id,n,l,v,xp,f,zone)=>{FISH.push({id,n,ic:'fish:'+id,col:'#8fb3c9',v,xp,l});VAL[id]=v;P['fish:'+id]=()=>P['spr:fish']().replace('/>',' style="filter:'+f+'"/>');ZF[zone][2].push(id)};
[['perch','Perch',2,6,4,'hue-rotate(60deg) saturate(1.5)',0],['bluegill','Bluegill',3,8,5,'hue-rotate(160deg) saturate(1.6)',0],['catfish','Catfish',6,16,9,'sepia(.9) brightness(.7)',0],['koi','Golden Koi',9,45,20,'sepia(1) saturate(3.5) hue-rotate(-25deg) brightness(1.1)',0],
 ['grayling','Grayling',5,13,7,'hue-rotate(200deg) saturate(1.2) brightness(1.1)',1],['pike','Pike',6,20,10,'hue-rotate(80deg) saturate(1.7)',1],['sturgeon','Sturgeon',10,60,26,'grayscale(.7) brightness(.8)',1],
 ['mackerel','Mackerel',8,22,11,'hue-rotate(190deg) saturate(1.8)',2],['snapper','Red Snapper',9,32,14,'sepia(1) saturate(3) hue-rotate(-40deg)',2],['moonfish','Moonfish',11,70,30,'brightness(1.4) saturate(.3)',2],
 ['lanternfish','Lanternfish',13,80,34,'hue-rotate(120deg) saturate(2.5) brightness(1.3)',3],['ghostfish','Ghostfish',14,110,42,'brightness(1.8) saturate(0)',3],['voidray','Void Ray',15,150,55,'hue-rotate(260deg) saturate(2) brightness(.6)',3]
].forEach(a=>addFish(...a));
/* special glowing fishing spots */
const SPK={treasure:'#ffd84d',rare:'#c277ff',school:'#5fe9ff'};
V4.spotInit=s=>{
  if(Math.random()>=Math.min(.35,.12+.008*L('fish')))return;
  const kind=['treasure','rare','school'][rnd(0,2)];s.special=true;s.kind=kind;s.t+=8;
  s.el.classList.add('special');s.el.style.setProperty('--sc',SPK[kind]);
  s.el.setAttribute('aria-label',{treasure:'Treasure spot',rare:'Rare fish spot',school:'School of fish'}[kind]);
  if(kind==='rare'){const pool=poolFish().slice().sort((a,b)=>b.v-a.v);s.f=pool[0]||s.f;const o=s.el.querySelector('.orb');if(o)o.innerHTML=fIcon(s.f)}
};
V4.spotReward=s=>{
  const col=SPK[s.kind],pool=poolFish();
  if(s.kind==='treasure'){
    const c=Math.round(earn(rnd(25,70)+L('fish')*6,'fish'));S.coins+=c;
    if(Math.random()<.45)S.inv.pearl=inv('pearl')+1;if(Math.random()<.35)S.inv.crystal=inv('crystal')+1;if(Math.random()<.06)S.inv.agem=inv('agem')+1;
    note('text','<b style="color:'+col+'">Treasure spot!</b> A sunken chest.',0,col);
  }else if(s.kind==='rare'){
    S.inv[s.f.id]=inv(s.f.id)+1;addXp('fish',s.f.xp);if(Math.random()<.3)S.inv.pearl=inv('pearl')+1;
    note('text','<b style="color:'+col+'">Rare catch!</b> Double the fish.',0,col);
  }else{
    const n=rnd(2,3);for(let i=0;i<n;i++){const f=pool[rnd(0,pool.length-1)];S.inv[f.id]=inv(f.id)+1}
    addXp('fish',6);note('text','<b style="color:'+col+'">School of fish!</b> Extra catches.',0,col);
  }
};

/* ---------- mining ---------- */
V4.nextMine=()=>{
  const nx=ZN.find((z,i)=>L('mine')<z[1]);
  return nx?'<p class="h" style="margin:2px 0 6px">⛏ An unexplored shaft will open at Mining level '+nx[1]+'.</p>':'';
};
{const _col=collect;collect=function(t){
  _col(t);
  if(t&&t.vein&&t.c&&t.c.startsWith('ore')){
    const id=ORES[+t.c.slice(3)].id,q=rnd(2,4);S.inv[id]=inv(id)+q;addXp('mine',6);
    note('text','<b style="color:#ffd84d">Rich vein!</b> Extra '+nm(id)+'.',0,'#ffd84d');
  }
}}
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('.rpg-minetile');V4.lastTile=t?+t.dataset.i:null},true);
V4.ambush=f=>{
  const fo=fight;if(!fo)return;
  const old=ecd;ecd=999;
  const drops=(DROPS[fo.n]||[]).map(d=>nm(d[0])).slice(0,4).join(', ')||'unknown';
  const root=document.createElement('div');root.id='v4amb';
  root.innerHTML='<div class="box"><h3>⚠ AMBUSH!</h3><div class="row"><div class="art">'+mon(fo.a,'art')+'</div><dl><dt>Enemy</dt><dd>'+fo.n+'</dd><dt>Level</dt><dd>'+(fo.l||'?')+'</dd><dt>Health</dt><dd>'+fo.max+'</dd><dt>Attack</dt><dd>'+Math.round(fo.atk)+'</dd><dt>Speed</dt><dd>'+(1/fo.sp).toFixed(1)+'/s</dd>'+(fo.def?'<dt>Armor</dt><dd>'+fo.def+'</dd>':'')+'</dl></div><p class="drops">Possible loot: '+drops+'</p><div class="btns"><button class="btn" id="v4af">Fight!</button><button class="btn alt" id="v4aq">Retreat</button></div></div>';
  document.body.appendChild(root);
  root.querySelector('#v4af').onclick=()=>{root.remove();ecd=fo.sp*1.3;cd=0;render()};
  root.querySelector('#v4aq').onclick=()=>{root.remove();ecd=fo.sp*1.3;try{flee()}catch(e){}render()};
};

/* ---------- blacksmith animation ---------- */
$('pane').addEventListener('click',e=>{
  const a=e.target.closest('[data-a="anvil"]');if(!a)return;
  const stg=$('stg');if(!stg)return;const r=stg.getBoundingClientRect(),before=forgeHits;
  const o=document.createElement('div');o.className='v4fxo';o.style.cssText='left:'+r.left+'px;top:'+r.top+'px;width:'+r.width+'px;height:'+r.height+'px';
  let h='<div class="gl"></div><div class="hm">'+icon('spr:hammer2')+'</div>';
  for(let i=0;i<14;i++)h+='<i class="sp" style="--dx:'+(Math.random()*160-80)+'px;--dy:'+(Math.random()*-110-10)+'px"></i>';
  o.innerHTML=h;document.body.appendChild(o);
  stg.style.transition='transform .1s';setTimeout(()=>{stg.style.transform='translate(2px,3px)';setTimeout(()=>stg.style.transform='',90)},230);
  setTimeout(()=>{if(forgeHits===0&&before>0){const b=document.createElement('div');b.className='v4big';b.textContent='Forging started';o.appendChild(b)}},40);
  setTimeout(()=>o.remove(),1100);
},true);

/* ---------- balance ---------- */
DG.forEach((d,i)=>{if(i>0)d.l=Math.ceil(d.l*1.35);if(d.ch)d.ch=Math.round(d.ch*.55)});
if(typeof CH_QUESTS!=='undefined')CH_QUESTS.forEach(q=>{if(q.reward)q.reward=Math.round(q.reward*.6);if(q.xp)q.xp=Math.round(q.xp*.8);if(q.goal>2)q.goal=Math.ceil(q.goal*1.25)});
{const _mk=mkFoe;mkFoe=function(n,m,flag,bm){const f=_mk(n,m,flag,bm),boss=f.b;f.hp=Math.round(f.hp*(boss?1.5:1.35));f.max=f.hp;f.atk*=boss?1.3:1.2;f.def=Math.round(((f.def||0)+(boss?2:1))*10)/10;f.c=Math.round(f.c*.8);return f}}

/* mine hit animation after each render */
{const _r3=render;render=function(){const r=_r3.apply(this,arguments);
  if(S.tab==='mine'&&V4.lastTile!=null){const t=document.querySelector('.rpg-minetile[data-i="'+V4.lastTile+'"]');
    if(t){t.classList.add('v4hit');for(let i=0;i<5;i++){const c=document.createElement('i');c.className='v4rock';c.style.left='45%';c.style.top='45%';c.style.setProperty('--dx',(Math.random()*40-20)+'px');c.style.setProperty('--dy',(Math.random()*-30-6)+'px');t.appendChild(c);setTimeout(()=>c.remove(),520)}}
    V4.lastTile=null}
  return r}}


