
(function(){
"use strict";
/* ================= RPG v4 · part A =================
   side notifications · classes · tabs · inventory · adventurer · barn
   ==================================================== */
const V4={};
window.V4=V4;
['cook','carp'].forEach(k=>{if(!SK.includes(k))SK.push(k);if(S.xp[k]==null)S.xp[k]=0});
SKN.cook='Cooking';SKN.carp='Carpentry';SKN.smith='Blacksmithing';SKN.combat='Adventuring';
SKI.cook=['spr:basket'];SKI.carp=['spr:hammer2'];
const esc=s=>String(s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));

/* ---------- 1. side notifications ---------- */
const st4=document.createElement('style');
st4.textContent=`
#toasts{display:none!important}
#v4n{position:fixed;right:8px;top:92px;width:min(244px,60vw);display:flex;flex-direction:column;gap:6px;z-index:70;pointer-events:none}
.v4c{--c:#8fb3c9;background:linear-gradient(135deg,#0c1d2cf2,#08131ff2);border:1px solid #ffffff1c;border-left:4px solid var(--c);border-radius:10px;padding:6px 8px;box-shadow:0 4px 14px #0008;color:#eef6ff;font-size:12px;animation:v4in .35s cubic-bezier(.2,.9,.3,1.2) both}
.v4c.out{animation:v4out .35s ease-in both}
.v4c.flash{animation:v4fl .35s ease-out}
.v4l{display:flex;align-items:center;gap:6px;line-height:1.15}
.v4l+.v4l,.v4l+.v4x,.v4x+.v4l,.v4m+.v4l{margin-top:3px}
.v4i{flex:none;width:24px;height:24px;display:inline-flex}
.v4i .ic{width:24px;height:24px}
.v4t{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.v4t b{font-weight:800}.v4t em{font-style:normal;font-weight:800;color:#fff}
.v4l small{font-size:9.5px;font-weight:700;letter-spacing:.3px;text-transform:uppercase;opacity:.95}
.v4x{display:flex;align-items:center;gap:5px;font-size:11px;color:#ffe08a;margin-top:3px}
.v4x .ic{width:16px;height:16px}
.v4m{font-size:11.5px;line-height:1.3}
@keyframes v4in{from{opacity:0;transform:translateX(40px) scale(.9)}to{opacity:1;transform:none}}
@keyframes v4out{to{opacity:0;transform:translateX(40px)}}
@keyframes v4fl{0%{transform:scale(1)}40%{transform:scale(1.06);filter:brightness(1.4)}100%{transform:scale(1)}}
@media(max-width:620px){#v4n{top:74px;width:min(214px,56vw)}.v4c{font-size:11px;padding:5px 7px}.v4i,.v4i .ic{width:20px;height:20px}}
`;
document.head.appendChild(st4);
const NB=document.body.appendChild(Object.assign(document.createElement('div'),{id:'v4n'}));
const HOLD=7000;
let pend=null,pt=0;const recent={};
const alive=c=>c&&c.isConnected&&!c.classList.contains('out');
const itemMeta=id=>{
  const g=IT.find(x=>x.id===id);
  if(g){const v=g.v||g.g||0,r=RAR.slice().reverse().find(x=>v>=x[2]*1.2)||RAR[0];return{n:g.n,r,ic:iIcon(g,'ic')}}
  const r=rar(id);return{n:nm(id),r,ic:gIcon(id,'ic')};
};
function note(kind,key,amt,extra){
  pend=pend||{items:{},xp:{},coins:0,texts:[]};
  if(kind==='item')pend.items[key]=(pend.items[key]||0)+amt;
  else if(kind==='xp')pend.xp[key]=(pend.xp[key]||0)+amt;
  else if(kind==='coins')pend.coins+=amt;
  else pend.texts.push([key,extra]);
  clearTimeout(pt);pt=setTimeout(flush,300);
}
function arm(c){clearTimeout(c._t);c._t=setTimeout(()=>{c.classList.add('out');setTimeout(()=>c.remove(),380)},HOLD)}
function bump(c){c.classList.remove('flash');void c.offsetWidth;c.classList.add('flash');arm(c)}
function flush(){
  const p=pend;pend=null;if(!p)return;
  const lines=[];let color=null,fresh=false,cardHost=null;
  const upd=(map,sel,fmt,key)=>{const r=recent[key];if(alive(r)){const el=r.querySelector(sel);if(el){r._q=r._q||{};r._q[key]=(r._q[key]||0)+map;el.innerHTML=fmt(r._q[key]);bump(r);return true}}return false};
  const items=Object.keys(p.items).filter(id=>p.items[id]>0);
  const html=[];const reg=[];
  items.forEach(id=>{
    const m=itemMeta(id),q=p.items[id];
    const done=(()=>{const r=recent['i:'+id];if(alive(r)){const el=r.querySelector('[data-k="'+id+'"] em');if(el){r._q=r._q||{};r._q[id]=(r._q[id]||q0(r,id))+q;el.textContent='×'+r._q[id];bump(r);return true}}return false})();
    if(done)return;
    if(!color)color=m.r[1];
    html.push('<div class="v4l" data-k="'+id+'"><span class="v4i">'+m.ic+'</span><span class="v4t"><b style="color:'+m.r[1]+'">'+esc(m.n)+'</b> <em>×'+q+'</em></span>'+(m.r[2]>=5?'<small style="color:'+m.r[1]+'">'+m.r[0]+'</small>':'')+'</div>');
    reg.push(['i:'+id,id,q]);
  });
  if(p.coins>0){
    const r=recent.coins;
    if(alive(r)){const el=r.querySelector('[data-co] b');r._co=(r._co||0)+p.coins;if(el){el.textContent='+'+r._co+' coins';bump(r)}}
    else{if(!color)color='#ffd84d';html.push('<div class="v4x" data-co><span class="v4i">'+icon('coin')+'</span><b>+'+p.coins+' coins</b></div>');reg.push(['coins',null,p.coins])}
  }
  Object.keys(p.xp).forEach(k=>{
    const r=recent['x:'+k];
    if(alive(r)){const el=r.querySelector('[data-xk="'+k+'"] b');if(el){r._xp=r._xp||{};r._xp[k]=(r._xp[k]||0)+p.xp[k];el.textContent='+'+r._xp[k]+' XP';bump(r);return}}
    const si=SKI[k]||['star'];
    html.push('<div class="v4x" data-xk="'+k+'">'+icon(si[0],si[1])+'<b>+'+p.xp[k]+' XP</b> <span>'+esc(SKN[k]||k)+'</span></div>');
    reg.push(['x:'+k,k,p.xp[k]]);
  });
  p.texts.forEach(([t,c])=>{if(!color)color=c;html.push('<div class="v4m">'+t+'</div>')});
  if(!html.length)return;
  const card=document.createElement('div');card.className='v4c';card.style.setProperty('--c',color||'#8fb3c9');card.innerHTML=html.join('');
  card._q={};card._xp={};card._co=p.coins;
  reg.forEach(([key,id,q])=>{recent[key]=card;if(key[0]==='i')card._q[id]=q;if(key[0]==='x')card._xp[id]=q});
  NB.appendChild(card);arm(card);
  while(NB.children.length>6)NB.firstChild.remove();
}
function q0(r,id){const em=r.querySelector('[data-k="'+id+'"] em');return em?parseInt(em.textContent.replace(/\D/g,''))||0:0}
V4.note=note;
toast=function(t,kind,col){
  note('text',t,0,col);
  const n=Date.now();if(n-(V4._snd||0)>5000){V4._snd=n;const b=kind==='reward'?660:880;try{tone(b,.35,'sine',.025);tone(b*1.5,.4,'sine',.02,0,.12)}catch(e){}}
};

/* ---------- 2. class bonuses ---------- */
Object.assign(CLS,{
 artisan:{n:'Artisan',d:'Hammer and chisel. Master of crafting trades.',atk:1,hp:10,def:1.05,cr:0,spd:1,dt:'phys'},
 homesteader:{n:'Homesteader',d:'Farmer at heart. Fields, barn and kitchen.',atk:.95,hp:10,def:1,cr:0,spd:1,dt:'phys'}
});
const CB={
 warrior:{xp:{smith:.15,mine:.10,combat:.10},yld:{smith:.08,mine:.06},roll:'Strong arms: better smithing and mining.',ico:'m_knight'},
 tank:{xp:{mine:.12,wood:.15,combat:.05},yld:{mine:.10,wood:.10},roll:'Iron constitution: tireless miner and woodsman.',ico:'m_bigknight'},
 archer:{xp:{fish:.18,combat:.08,cook:.10},yld:{fish:.12,fight:.12},roll:'Hunter: fishing, game meat and loot drops.',ico:'m_elf'},
 mage:{xp:{alch:.22,combat:.08,carp:.05},yld:{alch:.22,cook:.06},roll:'Alchemist: brews and potions come out in greater numbers.',ico:'m_banshee'},
 rogue:{xp:{trade:.20,fish:.06,combat:.10},yld:{fight:.14,fish:.06},roll:'Opportunist: caravans, rare loot and lucky catches.',ico:'m_vampire'},
 healer:{xp:{farm:.15,alch:.12,cook:.15},yld:{farm:.12,cook:.12,alch:.08},roll:'Gentle hands: gardens, healing brews and hearty meals.',ico:'m_zombie'},
 artisan:{xp:{smith:.18,carp:.22,wood:.12},yld:{smith:.10,carp:.14,wood:.10},roll:'Craftsman: blacksmithing, carpentry and lumber.',ico:'m_orcknight'},
 homesteader:{xp:{farm:.20,barn:.20,cook:.18},yld:{farm:.18,barn:.16,cook:.10},roll:'Homesteader: crops, animals and cooking.',ico:'scarecrow'}
};
V4.CB=CB;
const tabSkill={farm:'farm',barn:'barn',fish:'fish',mine:'mine',smith:'smith',alch:'alch',wood:'wood',carp:'carp',cook:'cook',fight:'combat'};
const bonusLines=k=>{
  const c=CB[k]||{xp:{},yld:{}},o=[];
  Object.keys(c.xp).forEach(s=>o.push('+'+Math.round(c.xp[s]*100)+'% '+SKN[s]+' XP'));
  Object.keys(c.yld).forEach(s=>o.push('+'+Math.round(c.yld[s]*100)+'% extra '+(s==='fight'?'loot':SKN[s]+' output')));
  const cl=CLS[k];if(cl){if(cl.atk!==1)o.push((cl.atk>1?'+':'')+Math.round((cl.atk-1)*100)+'% damage');if(cl.hp)o.push((cl.hp>0?'+':'')+cl.hp+' HP');if(cl.cr)o.push('+'+cl.cr+'% crit');if(cl.def!==1)o.push((cl.def>1?'+':'')+Math.round((cl.def-1)*100)+'% defense')}
  if(window.CAB&&CAB.lines)CAB.lines(k).forEach(l=>o.push(l));
  return o;
};
V4.bonusLines=bonusLines;
const _xp4=addXp;
addXp=function(k,n){
  const b=(CB[S.cls]&&CB[S.cls].xp[k])||0;
  n=Math.max(1,Math.round(n*(1+b)));
  if(S.xp[k]==null)S.xp[k]=0;
  _xp4(k,n);note('xp',k,n);
};
/* extra output: any new inventory item gained while working a skill has a chance of +1 */
V4.quiet=0;
S.inv=new Proxy(S.inv,{set(t,k,v){
  const o=t[k]||0;let nv=v;
  if(typeof v==='number'&&v>o){
    let d=v-o;
    if(!V4.quiet&&CB[S.cls]){const sk=tabSkill[S.tab],p=sk&&CB[S.cls].yld[sk];if(p&&Math.random()<p){nv=v+1;d++}}
    if(!V4.quiet)note('item',k,d);
  }
  t[k]=nv;return true;
}});
S.items=new Proxy(S.items,{set(t,k,v){const o=t[k]||0;t[k]=v;if(typeof v==='number'&&v>o&&!V4.quiet&&IT.find(x=>x.id===k))note('item',k,v-o);return true}});
{let _c=S.coins;Object.defineProperty(S,'coins',{get:()=>_c,set:v=>{const d=v-_c;_c=v;if(d>=1&&!V4.quiet)note('coins',null,d)},enumerable:true,configurable:true})}

/* ---------- 3. class picker ---------- */
const st5=document.createElement('style');
st5.textContent=`
#v4cls{position:fixed;inset:0;z-index:90;background:radial-gradient(circle at 50% 20%,#17324a,#050b14 80%);overflow:auto;padding:18px 12px 30px}
#v4cls h2{margin:6px 0 2px;text-align:center;font-size:24px;color:#ffe0a0}
#v4cls p.sub{text-align:center;margin:0 0 14px;color:#b9d2e3;font-size:13px}
.v4cg{display:grid;grid-template-columns:repeat(auto-fill,minmax(165px,1fr));gap:10px;max-width:980px;margin:0 auto}
.v4k{display:flex;flex-direction:column;gap:6px;text-align:left;border:2px solid #4a6a86;border-radius:14px;background:linear-gradient(160deg,#122a3f,#0a1827);color:#eaf6ff;padding:10px;cursor:pointer;font:inherit;transition:transform .15s,border-color .15s}
.v4k:hover{transform:translateY(-2px);border-color:#ffd778}
.v4k.sel{border-color:#ffd778;box-shadow:0 0 0 2px #ffd77855,0 0 18px #ffc75b55}
.v4k .hd{display:flex;gap:10px;align-items:center}
.v4k .pic{width:64px;height:64px;flex:none;border-radius:12px;background:#0a1624;border:1px solid #6d8797;overflow:hidden;display:flex}
.v4k .pic .ic{width:100%;height:100%}
.v4k b{font-size:16px;color:#ffe0a0}
.v4k small{display:block;color:#b9d2e3;line-height:1.3}
.v4k ul{margin:0;padding:0;list-style:none;font-size:11.5px;display:flex;flex-direction:column;gap:2px}
.v4k li:before{content:'▲ ';color:#5fe08a;font-size:9px}
#v4cls .go{display:block;margin:16px auto 0;min-width:240px}
`;
document.head.appendChild(st5);
function clsPicker(force){
  if(document.getElementById('v4cls'))return;
  const root=document.createElement('div');root.id='v4cls';let pick=force?null:(S.cls&&CLS[S.cls]?S.cls:null);
  const draw=()=>{root.innerHTML='<h2>Choose your adventurer</h2><p class="sub">Each path gives percentage bonuses to the trades it excels at. You can change class later in Upgrades.</p><div class="v4cg">'+Object.keys(CLS).map(k=>{const c=CLS[k];return '<button class="v4k'+(pick===k?' sel':'')+'" data-k="'+k+'"><div class="hd"><span class="pic">'+icon('spr:'+((CB[k]||{}).ico||'hero_face'))+'</span><div><b>'+c.n+'</b><small>'+((CB[k]||{}).roll||c.d)+'</small></div></div><ul>'+bonusLines(k).map(l=>'<li>'+l+'</li>').join('')+'</ul></button>'}).join('')+'</div><button class="btn go" '+(pick?'':'disabled')+'>'+(pick?'Begin as '+CLS[pick].n:'Pick a class')+'</button>'};
  draw();document.body.appendChild(root);
  root.addEventListener('click',e=>{
    const k=e.target.closest('.v4k');
    if(k){pick=k.dataset.k;draw();try{SFX.coin()}catch(_){}return}
    if(e.target.closest('.go')&&pick){const first=!S.cls||!CLS[S.cls];S.cls=pick;window.__applyClassKit&&window.__applyClassKit(pick,first);S.hp=maxHp();S.sh=maxSh();$('intro').hidden=true;save();root.remove();note('text','You are now a <b>'+CLS[pick].n+'</b>.',0,'#ffd778');render();upd()}
  });
}
V4.clsPicker=clsPicker;window.clsPicker=clsPicker;
$('play').addEventListener('click',()=>setTimeout(()=>{if(!S.cls||!CLS[S.cls])clsPicker()},60));

/* ---------- 4. tabs: rename + new ones ---------- */
const TL={chronicle:['book-open','Chronicle'],farm:['sprout','Farm'],barn:['egg','Barn'],fish:['fish','Fish'],mine:['pick','Mine'],wood:['axe','Wood'],carp:['spr:hammer2','Carpenter'],arcane:['core','Arcana'],tailor:['wool','Tailor'],leather:['hide','Leather'],smith:['anvil','Blacksmith'],alch:['flask','Brew'],cook:['spr:basket','Cooking'],fight:['sword','Adventuring'],trade:['wagon','Trade'],market:['coin','Shop'],adv:['spr:hero_face','Adventurer'],pack:['bag','Inventory'],upg:['charm','Upgrades'],prog:['ring','Progress']};
const TC4={chronicle:'#c9b8ff',fish:'#8fb3c9',mine:'#c9d6e4',alch:'#7ad8ff',fight:'#c9d6e4',wood:'#b8803f',arcane:'#b36bff'};
const tabs=$('tabs');
Object.keys(TL).forEach(k=>{
  let b=[...tabs.children].find(x=>x.dataset.k===k);
  if(!b){b=document.createElement('button');b.dataset.k=k;b.addEventListener('click',()=>{S.tab=k;try{SFX.coin()}catch(_){}save();render();window.scrollTo(0,0)});tabs.appendChild(b)}
  b.innerHTML=icon(TL[k][0],TC4[k])+TL[k][1];
});
[...tabs.children].forEach(b=>{if(!TL[b.dataset.k])b.remove()});
Object.keys(TL).forEach(k=>{const b=[...tabs.children].find(x=>x.dataset.k===k);if(b)tabs.appendChild(b)});
if(S.tab&&!TL[S.tab])S.tab='farm';


/* ---------- 5. new materials ---------- */
const addMat=(id,n,ic,col,v)=>{MATS[id]={n,ic,col,v};VAL[id]=v};
P.meat=()=>'<ellipse cx="38" cy="26" rx="19" ry="15" fill="#c9553d"/><ellipse cx="33" cy="21" rx="9" ry="5" fill="#ec8a72" opacity=".65"/><path d="M27 38l-11 14" stroke="#f4ead2" stroke-width="7" stroke-linecap="round"/><circle cx="13" cy="54" r="5.5" fill="#f4ead2"/><circle cx="19" cy="58" r="4.5" fill="#f4ead2"/>';
P.plume=()=>'<path d="M32 58C20 46 18 26 32 6c14 20 12 40 0 52z" fill="#2fa6a0"/><ellipse cx="32" cy="26" rx="8" ry="11" fill="#2b5fb8"/><ellipse cx="32" cy="26" rx="3.5" ry="5.5" fill="#6fe0c4"/><path d="M32 58V30" stroke="#6b4a2a" stroke-width="2"/>';
addMat('meat','Raw Meat','meat',null,12);
addMat('gooseegg','Goose Egg','spr:egg','#f4ead2',9);
addMat('plume','Peacock Plume','plume',null,40);
addMat('horsehair','Horse Hair','wool','#b88a5a',22);
addMat('drake_meat','Dragon Meat','meat','#ff7a5a',55);

addMat('clover','Clover Leaves','clover','#78c653',3);
addMat('hay','Dry Hay','hay','#dfb84d',2);
addMat('corn','Sweet Corn','corn','#f0c347',5);
MATS.herb={n:'Fresh Herbs',ic:'herb',v:4};VAL.herb=4;
P.herb='<path d="M31 58V14M31 34L15 22M31 42L48 26M31 49L14 40M31 54L49 43" stroke="#347b37" stroke-width="4" fill="none"/><path d="M15 22q-2-13 12-12 1 13-12 12zM48 26q4-14 16-8-2 13-16 8zM14 40q-1-12 12-11 1 12-12 11zM49 43q4-12 15-6-3 12-15 6z" fill="#65bd49" stroke="#347b37" stroke-width="2"/>';
P.clover='<path d="M32 58V30" stroke="#347b37" stroke-width="4" fill="none"/><g fill="#65bd49" stroke="#347b37" stroke-width="2"><path d="M30 30C12 30 9 14 22 11 30 10 34 18 32 26 34 15 45 8 53 17 58 27 47 33 36 31 48 34 48 49 37 52 27 54 24 43 30 30z"/></g><path d="M30 29l5 4" stroke="#c6ef7a" stroke-width="2"/>';
P.hay='<g fill="#d7a943" stroke="#9b6b2b" stroke-width="2"><path d="M13 51l18-37 21 4 10 33-8 11H19z"/><path d="M18 51l11-22 24-1 5 24z" fill="#efc65c"/><path d="M23 49l10-14 21 1" fill="none"/></g><path d="M31 18l-4-8m11 9l4-10" stroke="#f5df91" stroke-width="3"/>';
P.corn='<path d="M31 59V18" stroke="#3f8738" stroke-width="4"/><path d="M31 35Q12 17 9 27q4 17 22 19M33 42Q48 16 57 24q-1 18-24 25" fill="#5db84b" stroke="#347b37" stroke-width="2"/><path d="M32 16q-9 3-8 18 3 12 10 12 8-4 8-17-2-12-10-13z" fill="#f2c33f" stroke="#9c6e25" stroke-width="2"/><path d="M30 23v17m6-16v17" stroke="#ffe38a" stroke-width="2"/>';


/* ---------- 6. barn: more animals + bigger yard ---------- */
const spr100=(k,f)=>P['spr:'+k]().replace('width="64" height="64"','width="100" height="100"').replace('/>',f?' style="filter:'+f+'"/>':'/>');
ANIART.goose=SH+'<ellipse cx="50" cy="68" rx="28" ry="18" fill="#fbfbf4"/><path d="M66 60C76 44 70 30 60 26" stroke="#fbfbf4" stroke-width="11" fill="none" stroke-linecap="round"/><circle cx="58" cy="24" r="10" fill="#fbfbf4"/><path d="M50 24l-14 3 13 6z" fill="#ff9a2a"/><path d="M40 86v-8M58 86v-8" stroke="#ff9a2a" stroke-width="4"/>'+eye(58,22,3);
ANIART.turkey=SH+'<ellipse cx="46" cy="66" rx="24" ry="19" fill="#8a5a38"/><g fill="#b06a3a"><circle cx="70" cy="46" r="13"/><circle cx="80" cy="58" r="12"/><circle cx="62" cy="36" r="11"/></g><circle cx="28" cy="46" r="11" fill="#7a4a2c"/><path d="M18 46l-8 3 8 4z" fill="#ffb02a"/><path d="M22 54q3 9 7 0z" fill="#d93b3b"/><path d="M38 86v-8M54 86v-8" stroke="#d98a3a" stroke-width="4"/>'+eye(28,43,3);
ANIART.horse=SH+'<ellipse cx="54" cy="58" rx="30" ry="17" fill="#8b5a33"/><path d="M30 52L22 22l16-8 8 12z" fill="#8b5a33"/><ellipse cx="22" cy="20" rx="13" ry="9" fill="#8b5a33" transform="rotate(-25 22 20)"/><path d="M36 14q12 6 14 22" stroke="#2c1a10" stroke-width="7" fill="none"/><path d="M34 70v18M46 72v16M66 72v16M78 68v20" stroke="#6f4526" stroke-width="7" stroke-linecap="round"/><path d="M84 54q10 6 6 22" stroke="#2c1a10" stroke-width="6" fill="none"/>'+eye(18,18,3);
ANIART.boar=ANIART.pig.split('#f6a7b8').join('#6a4b3c').split('#e98aa0').join('#3c2a22');
ANIART.buffalo=spr100('m_bull','hue-rotate(110deg) saturate(.7) brightness(.9)');
ANIART.peacock=spr100('m_bird');
ANI.push(
 {id:'goose',n:'Goose',cost:95,t:35,give:['gooseegg'],extra:['feather',.6],meat:['meat',.1]},
 {id:'turkey',n:'Turkey',cost:140,t:50,give:['egg'],extra:['feather',.4],meat:['meat',.25]},
 {id:'boar',n:'Boar',cost:190,t:65,give:['truffle'],extra:['hide',.3],meat:['meat',.35]},
 {id:'buffalo',n:'Buffalo',cost:320,t:80,give:['milk'],extra:['hide',.3],meat:['meat',.3]},
 {id:'peacock',n:'Peacock',cost:300,t:70,give:['feather'],extra:['plume',.35]},
 {id:'horse',n:'Horse',cost:520,t:100,give:['horsehair'],extra:['hide',.25]}
);
({chicken:.08,sheep:.15,cow:.25,duck:.1,rabbit:.2,goat:.2,pig:.3,llama:.1}),Object.entries({chicken:.08,sheep:.15,cow:.25,duck:.1,rabbit:.2,goat:.2,pig:.3,llama:.1}).forEach(([id,p])=>{const a=ANI.find(x=>x.id===id);if(a)a.meat=['meat',p]});
ANI.slice(9).forEach((a,j)=>{const i=9+j,b=document.createElement('button');b.className='seed';b.innerHTML=mon(ANIART[a.id],'ic')+'<div>'+a.n+'</div><span>'+a.cost+' coins</span>';b.addEventListener('click',()=>{S.asel=i;try{SFX.plant()}catch(_){}save();render()});$('aseeds').appendChild(b);aEls.push(b)});
if(!Array.isArray(S.barn))S.barn=Array(12).fill(null);while(S.barn.length<12)S.barn.push(null);

/* quick-action bars for farm and barn */
{
 const mk=(host,id,html)=>{const d=document.createElement('div');d.id=id;d.className='v4bar';d.innerHTML=html;if(id==='v4fbar')host.parentNode.insertBefore(d,host);else host.parentNode.insertBefore(d,host.nextSibling);return d};
 const fb=mk($('grid'),'v4fbar','<button class="btn alt" data-q="harv">Harvest ready</button><button class="btn alt" data-q="water">Water all</button>');
 const bb=mk($('bgrid'),'v4bbar','<button class="btn alt" data-q="collect">Collect all</button>');
 fb.addEventListener('click',e=>{const b=e.target.closest('[data-q]');if(!b)return;let n=0;
   S.plots.forEach((p,i)=>{if(!p.open||p.c<0)return;const ready=prog(p)>=1;if(b.dataset.q==='harv'&&ready){tapPlot(i);n++}else if(b.dataset.q==='water'&&!ready&&!p.w){tapPlot(i);n++}});
   if(!n)say(b.dataset.q==='harv'?'Nothing is ready yet.':'Everything is already watered.');});
 bb.addEventListener('click',e=>{if(!e.target.closest('[data-q]'))return;let n=0;
   S.barn.forEach((p,i)=>{if(p&&i<cap()&&aProg(p)>=1){tapStall(i);n++}});if(!n)say('No animals are ready yet.');});
 const sync=()=>{fb.style.display=S.tab==='farm'?'':'none';bb.style.display=S.tab==='barn'?'':'none'};
 const _r=render;render=function(){const r=_r.apply(this,arguments);sync();return r};sync();
}

/* ---------- 7. Adventurer + Inventory ---------- */
const stc=document.createElement('style');
stc.textContent=`
.v4bar{display:flex;gap:8px;margin:2px 0}.v4bar .btn{flex:1;padding:8px 6px;font-size:13px}
.plot.ripe{animation:v4ripe 1.3s ease-in-out infinite}
@keyframes v4ripe{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
#bgrid{grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:6px!important}
#bgrid .plot{aspect-ratio:1!important}
#bgrid .plot .ic{width:62%!important;height:62%!important}
@media(min-width:900px){#bgrid{grid-template-columns:repeat(6,minmax(0,1fr))!important;max-width:760px;margin-inline:auto;width:100%}#aseeds{display:grid;grid-template-columns:repeat(8,minmax(0,1fr));gap:6px}}
#aseeds{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:5px}
#aseeds .seed .ic{width:34px!important;height:34px!important}
.inv{grid-template-columns:repeat(auto-fill,minmax(50px,1fr))!important;gap:5px!important}
.sq{padding:3px!important;border-radius:8px!important}
.sq .cnt{font-size:9.5px;padding:0 4px}
@media(min-width:900px){.inv{grid-template-columns:repeat(auto-fill,minmax(56px,60px))!important;justify-content:start}}
.v4eq{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}
.v4es{display:flex;flex-direction:column;align-items:center;gap:3px;text-align:center;border:2px solid var(--line);border-radius:12px;background:var(--card);padding:8px 4px;font-size:11px}
.v4es .ic{width:48px;height:48px}.v4es small{color:var(--mute);font-size:10px;line-height:1.2}.v4es i{font-style:normal;font-size:10px;color:#ffd778;text-transform:uppercase;letter-spacing:1px}
.v4cc{display:flex;gap:10px;align-items:center;border:2px solid var(--line);border-radius:12px;background:var(--card);padding:10px}
.v4cc .pic{width:64px;height:64px;border-radius:12px;overflow:hidden;flex:none;display:flex;background:#0a1624}.v4cc .pic .ic{width:100%;height:100%}
.v4cc ul{margin:4px 0 0;padding:0;list-style:none;font-size:11.5px}.v4cc li:before{content:'▲ ';color:#5fe08a;font-size:9px}
`;
document.head.appendChild(stc);
VIEWS.adv=()=>{
  const c=CLS[S.cls],eq=[['w','Weapon'],['a','Armor'],['p','Tool']].map(([k,l])=>{const it=item(k);return '<div class="v4es"><i>'+l+'</i>'+iIcon(it)+'<b>'+it.n+'</b><small>'+stat(it)+'</small></div>'}).join('');
  const st=[['ATK',atkPow().toFixed(1)],['Speed',(1/wInt()).toFixed(1)+'/s'],['Crit',critCh().toFixed(1)+'%'],['Crit dmg','x'+pc(critMul())],['Defense',defn().toFixed(1)],['HP',maxHp()],['Shield',maxSh()],['Kills',S.kills]].map(a=>'<div class="slot"><span>'+a[0]+'</span><b>'+a[1]+'</b></div>').join('');
  const extra=[['wood','Chops '+(1+Math.floor(L('wood')/8))+' damage per swing, '+pc(6*S.up.sawup)+'% bonus logs'],['carp','Better carpentry unlocks bows, staves and fine furniture'],['cook','Dishes heal more at higher levels']];
  const perk=perks().concat(extra).map(p=>'<div class="col" style="gap:2px">'+skillBar(p[0])+'<p class="h" style="margin:0 0 6px">'+p[1]+'</p></div>').join('');
  return '<div class="hero">'+mon(HERO,'art')+'<div class="info"><div><b>'+(c?c.n:'Adventurer')+'</b> · Adventuring level '+L('combat')+'</div><div class="bar2 hp"><i id="php"></i></div><div id="pht"></div></div></div>'
   +'<div class="ttl">Class</div><div class="v4cc"><span class="pic">'+icon('spr:'+((CB[S.cls]||{}).ico||'hero_face'))+'</span><div><b>'+(c?c.n:'No class')+'</b><ul>'+bonusLines(S.cls).map(l=>'<li>'+l+'</li>').join('')+'</ul></div><button class="btn alt" data-v4="cls" style="margin-left:auto">Change</button></div>'
   +'<div class="ttl">Equipment</div><div class="v4eq">'+eq+'</div>'
   +'<div class="ttl">Stats</div><div class="slots">'+st+'</div><p class="h">'+buffText()+'</p>'
   +'<div class="ttl">Skills and perks</div>'+perk;
};
VIEWS.pack=()=>{
  const gear=IT.filter(i=>cnt(i.id)>0).map(i=>{const e=S.eq[i.c]===i.id,free=cnt(i.id)-(e?1:0);return '<div class="rowd"><button class="rec'+(e?' eq':'')+'" data-a="equip" data-i="'+i.id+'">'+iIcon(i)+'<div><b>'+i.n+' ×'+cnt(i.id)+'</b><small>'+stat(i)+'</small></div><span class="tag">'+(e?'Equipped':'Equip')+'</span></button>'+(i.v&&free>0?'<button class="btn alt" data-a="selli" data-i="'+i.id+'">Sell '+earn(i.v*(1+.04*S.up.furnace),'smith')+'</button>':'')+'</div>'}).join('');
  const ids=[...ORES.map(o=>o.id),...Object.keys(MATS),...FISH.map(f=>f.id),...POTS.map(p=>p.id),...FERTS.filter(f=>f.r).map(f=>f.id),...TRADE.map(t=>t.id)].filter((id,i,a)=>a.indexOf(id)===i&&inv(id)>0);
  const cells=ids.map(id=>'<button class="sq" data-a="info" data-i="'+id+'" style="border-color:'+rar(id)[1]+'66">'+gIcon(id)+'<span class="cnt">'+inv(id)+'</span></button>');
  while(cells.length<30)cells.push('<div class="sq empty"></div>');
  return '<div class="hero" style="padding:8px"><div class="info"><div><b>Coins</b> '+S.coins+' · '+ids.length+' item types</div><div class="bar2 hp"><i id="php"></i></div><div id="pht"></div></div></div>'
   +'<div class="ttl">Backpack</div><div class="inv">'+cells.join('')+'</div><p class="h">Tap an item to see what it is and what it sells for. '+buffText()+'</p>'
   +'<div class="ttl">Gear in your bag</div><div class="col">'+gear+'</div>';
};
$('pane').addEventListener('click',e=>{
  const b=e.target.closest('[data-v4]');if(!b)return;
  if(b.dataset.v4==='cls'){clsPicker(true);return}
});


/* ================= part B · cooking · carpentry · woodcutting ================= */
const stb=document.createElement('style');
stb.textContent=`
.v4rl{display:flex;flex-direction:column;gap:6px}
.v4r{display:flex;align-items:center;gap:10px;text-align:left;border:2px solid var(--line);border-radius:12px;background:var(--card);color:inherit;padding:7px 9px;font:inherit;cursor:pointer;width:100%}
.v4r.on{border-color:#ffd778;box-shadow:0 0 0 1px #ffd77866}
.v4r.dim{opacity:.55}
.v4r .ic{width:36px;height:36px;flex:none}
.v4r div{flex:1;min-width:0}.v4r small{display:block;color:var(--mute);font-size:11px;line-height:1.3}
.v4r .no{color:#ff8a7a}.v4r .yes{color:#8fe3a2}
.v4pan{position:relative;height:150px;border:2px solid var(--line);border-radius:14px;overflow:hidden;background:radial-gradient(circle at 50% 120%,#7a3b16,#1a0f08 70%);display:flex;align-items:center;justify-content:center;margin-bottom:8px}
.v4pan .dish{width:74px;height:74px;transition:transform .2s}.v4pan .dish .ic{width:100%;height:100%}
.v4pan.sizzle .dish{animation:v4siz .25s infinite alternate}
.v4pan .steam{position:absolute;bottom:34px;width:10px;height:26px;border-radius:10px;background:#ffffff55;filter:blur(4px);opacity:0}
.v4pan.sizzle .steam{animation:v4st 1.2s ease-out infinite}
.v4pan .steam:nth-of-type(2){left:38%;animation-delay:.3s}.v4pan .steam:nth-of-type(3){left:50%;animation-delay:.6s}.v4pan .steam:nth-of-type(4){left:62%;animation-delay:.15s}
.v4pan .flame{position:absolute;bottom:-8px;left:20%;right:20%;height:34px;background:radial-gradient(ellipse at 50% 100%,#ffb02a,#ff5a1a 55%,transparent 72%);opacity:.0;transition:opacity .2s}
.v4pan.sizzle .flame{opacity:.95;animation:v4fl2 .3s infinite alternate}
.v4pan .res{position:absolute;top:8px;left:0;right:0;text-align:center;font-weight:800;color:#ffe08a;text-shadow:0 1px 3px #000;min-height:20px}
.v4mt{position:relative;height:22px;border-radius:11px;background:#0a1624;border:2px solid var(--line);overflow:hidden;margin:6px 0}
.v4mt .zn{position:absolute;top:0;bottom:0;background:linear-gradient(#5fe08a,#2f9b5a);opacity:.85}
.v4mt .mk{position:absolute;top:-2px;bottom:-2px;width:6px;margin-left:-3px;border-radius:3px;background:#fff;box-shadow:0 0 8px #fff}
@keyframes v4siz{from{transform:translateY(0) rotate(-3deg)}to{transform:translateY(-4px) rotate(3deg)}}
@keyframes v4st{0%{opacity:0;transform:translateY(0) scaleY(.6)}30%{opacity:.8}100%{opacity:0;transform:translateY(-70px) scaleY(1.6)}}
@keyframes v4fl2{from{transform:scaleY(.85)}to{transform:scaleY(1.1)}}
.v4busy{position:relative;overflow:hidden;pointer-events:none}
.v4busy:after{content:'';position:absolute;left:0;top:0;bottom:0;background:#ffffff33;animation:v4bz var(--ms,700ms) linear forwards}
@keyframes v4bz{from{width:0}to{width:100%}}
.v4zones{display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:6px;margin:6px 0}
.v4z{border:2px solid var(--line);border-radius:10px;background:var(--card);color:inherit;padding:6px;font:inherit;text-align:left;cursor:pointer}
.v4z.on{border-color:#ffd778}.v4z[disabled]{opacity:.45;cursor:default}.v4z small{display:block;color:var(--mute);font-size:10.5px}
.v4wd{position:relative;height:300px;border:2px solid var(--line);border-radius:16px;overflow:hidden;background:linear-gradient(#9ed3ff 0%,#d8f0ff 45%,#58853a 45.5%,#3f6a2b 100%);user-select:none;touch-action:manipulation}
.v4wd.pine{background:linear-gradient(#7fb0d8 0%,#cfe6f0 45%,#3d6a4a 45.5%,#27472f 100%)}
.v4wd.marsh{background:linear-gradient(#b9d6c3 0%,#e3efe4 45%,#6a8a4a 45.5%,#3d5a35 100%)}
.v4wd.deep{background:linear-gradient(#3d3a66 0%,#6a5a96 45%,#2c3a35 45.5%,#17221f 100%)}
.v4tree{position:absolute;left:50%;bottom:18px;width:190px;height:250px;margin-left:-95px;transform-origin:50% 100%;cursor:pointer}
.v4tree svg{width:100%;height:100%;overflow:visible}
.v4tree.hit{animation:v4sway .22s ease-out}
.v4tree.fall{animation:v4fall .8s ease-in forwards}
.v4tree.grow{animation:v4grow .5s ease-out}
@keyframes v4sway{0%{transform:rotate(0)}30%{transform:rotate(-3.5deg)}70%{transform:rotate(2.5deg)}100%{transform:rotate(0)}}
@keyframes v4fall{0%{transform:rotate(0)}30%{transform:rotate(6deg)}100%{transform:rotate(86deg) translateX(40px);opacity:.1}}
@keyframes v4grow{from{transform:scale(.2);opacity:0}to{transform:none;opacity:1}}
.v4chip{position:absolute;width:8px;height:5px;border-radius:2px;background:#c58a4a;pointer-events:none;animation:v4chip .6s ease-out forwards}
@keyframes v4chip{to{transform:translate(var(--dx),var(--dy)) rotate(280deg);opacity:0}}
.v4fx{position:absolute;pointer-events:none;font-weight:900;font-size:20px;color:#fff;text-shadow:0 2px 4px #000;animation:v4up .8s ease-out forwards}
.v4fx.crit{color:#ffd84d;font-size:26px}
@keyframes v4up{to{transform:translateY(-50px);opacity:0}}
.v4hpb{position:absolute;left:25%;right:25%;top:10px;height:12px;border-radius:7px;background:#0007;border:2px solid #241a35;overflow:hidden}
.v4hpb i{display:block;height:100%;background:linear-gradient(#7fe08a,#2f9b5a);transition:width .15s}
.v4nm{position:absolute;top:28px;left:0;right:0;text-align:center;color:#fff;font-weight:800;text-shadow:0 1px 3px #000;font-size:13px}
`;
document.head.appendChild(stb);

const cookSimStyle=document.createElement('style');cookSimStyle.textContent=`
.v4cook-sim{background:radial-gradient(ellipse at 50% 100%,#b34b17 0%,#4d2314 42%,#172435 78%);border-color:#d89a48;box-shadow:inset 0 -15px 25px #ff7c1c22,0 5px 18px #0005}
.v4cook-sim:before{content:'';position:absolute;left:calc(50% - 48px);bottom:8px;width:96px;height:32px;border-radius:12px 12px 24px 24px;background:linear-gradient(#586273,#232d3e 55%,#101722);border:3px solid #bd8b4c;box-shadow:0 6px 0 #58341c,0 0 18px #ff8a2a55;opacity:.78}
.v4cook-sim .dish{z-index:2;filter:drop-shadow(0 4px 5px #0009);transform:translateY(-6px) scale(1.08)}
.v4cook-sim.sizzle:before{animation:v4potbob .3s ease-in-out infinite alternate}
.v4cook-sim.stirred:before{box-shadow:0 6px 0 #58341c,0 0 25px #86d95f99}
@keyframes v4potbob{to{transform:translateY(-3px) rotate(1deg)}}
.v4mt .zn.stir{background:linear-gradient(#f8d76b,#b98627);opacity:.95}
.v4mt .zn.flip{background:linear-gradient(#70ef91,#269b55);opacity:.95}
.v4steps{display:grid;grid-template-columns:repeat(3,1fr);gap:5px;margin:7px 0 10px}
.v4steps span{border:1px solid var(--line);border-radius:9px;background:var(--card);padding:6px 4px;text-align:center;font-size:11px;font-weight:800;color:var(--mute)}
.v4steps span:nth-child(2){color:#f3cf68}.v4steps span:nth-child(3){color:#76d990}
.v4food-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:7px;margin:8px 0}
.v4food{display:flex;align-items:center;gap:8px;border:1px solid var(--line);border-radius:10px;background:var(--card);padding:7px;min-width:0}
.v4food .ic{width:34px;height:34px;flex:0 0 34px}.v4food .meta{flex:1;min-width:0}.v4food small{display:block;color:var(--mute);font-size:10px;line-height:1.3}
.v4food button{padding:6px 9px;white-space:nowrap;font-size:11px}
.v4buffs{display:flex;flex-wrap:wrap;gap:6px;margin:7px 0 12px}
.v4buffchip{border:1px solid #5fae73;border-radius:9px;background:#1d503b55;padding:6px 8px;color:#c8ffd1;font-size:11px;font-weight:800}
.v4buffchip small{display:block;color:#c5d8c8;font-size:9px;font-weight:600}
@media(max-width:600px){.v4food-grid{grid-template-columns:1fr}.v4steps span{font-size:10px;padding:5px 2px}}
`;
document.head.appendChild(cookSimStyle);
V4.timed=(btn,ms,fn)=>{btn.style.setProperty('--ms',ms+'ms');btn.classList.add('v4busy');setTimeout(fn,ms)};

/* ---------- Cooking ---------- */
const DISH=[
 {id:'d_grill',n:'Grilled Fish',ic:'spr:fish',l:1,xp:5,heal:30,v:14,r:[['@fish',1]]},
 {id:'d_roast',n:'Roast Meat',ic:'meat',col:'#e08a3a',l:1,xp:5,heal:40,v:16,r:[['@meat',1]]},
 {id:'d_omelet',n:'Omelette',ic:'spr:egg',l:2,xp:7,heal:46,v:20,r:[['egg',2],['milk',1]]},
 {id:'d_fishstew',n:'Fish Stew',ic:'spr:bucket',l:3,xp:10,heal:72,v:34,r:[['@fish',2],['herb',1]]},
 {id:'d_cornbread',n:'Honey Cornbread',ic:'spr:butter',l:4,xp:12,heal:84,v:40,r:[['corn',2],['honey',1],['egg',1]]},
 {id:'d_hearty',n:'Hearty Stew',ic:'spr:basket',l:5,xp:16,heal:115,v:55,r:[['@meat',2],['herb',1],['milk',1]]},
 {id:'d_feast',n:'Seafood Feast',ic:'spr:jam',l:8,xp:26,heal:175,v:95,r:[['@fish',3],['herb',2],['honey',1]]},
 {id:'d_dragon',n:'Dragon Steak',ic:'meat',col:'#ff6a4a',l:12,xp:50,heal:330,v:190,r:[['drake_meat',1],['herb',2],['honey',1]]}
];
DISH.forEach(d=>addMat(d.id,d.n,d.ic,d.col||null,d.v));

const EXTRA_DISH=[
 {id:'d_herbaltea',n:'Herbal Tea',ic:'herb',l:1,xp:10,heal:16,v:22,r:[['herb',2],['honey',1]],buff:'grow',dur:300},
 {id:'d_cloversalad',n:'Clover Salad',ic:'clover',l:2,xp:12,heal:26,v:30,r:[['clover',2],['egg',1]],buff:'spd',dur:240},
 {id:'d_hunterstew',n:"Hunter's Stew",ic:'meat',l:4,xp:16,heal:64,v:48,r:[['@meat',1],['corn',1],['herb',1]],buff:'atk',dur:240},
 {id:'d_guardiansoup',n:'Guardian Soup',ic:'spr:bucket',l:5,xp:19,heal:82,v:58,r:[['@fish',1],['milk',1],['clover',1]],buff:'def',dur:240},
 {id:'d_luckybites',n:'Lucky Herb Bites',ic:'clover',l:6,xp:22,heal:42,v:60,r:[['honey',1],['egg',1],['clover',2]],buff:'crit',dur:240}
];
EXTRA_DISH.forEach(d=>{DISH.push(d);addMat(d.id,d.n,d.ic,d.col||null,d.v)});
const COOK_BUFF_LABEL={grow:'New crops grow 50% faster',spd:'Attack speed +30%',atk:'Attack power +35%',def:'Defense +8',crit:'Critical chance +20%'};
const cookBuffLabel=d=>d&&d.buff?(COOK_BUFF_LABEL[d.buff]||'Temporary boost'):'';

V4.DISH=DISH;
const fishAsc=()=>FISH.slice().sort((a,b)=>a.v-b.v);
const resolve=(id)=>id==='@fish'?(fishAsc().find(f=>inv(f.id)>0)||{id:'@none'}).id:id==='@meat'?(inv('meat')>0?'meat':'@none'):id;
const nmR=id=>id==='@fish'?'Any fish':id==='@meat'?'Meat':nm(id);
const haveR=(id,n)=>id==='@fish'?FISH.reduce((a,f)=>a+inv(f.id),0)>=n:id==='@meat'?inv('meat')>=n:inv(id)>=n;
const haveN=id=>id==='@fish'?FISH.reduce((a,f)=>a+inv(f.id),0):id==='@meat'?inv('meat'):inv(id);
const canCook=d=>L('cook')>=d.l&&d.r.every(([id,n])=>haveR(id,n));
let ck={run:false,raf:0,t0:0,dur:1700,sel:null,stirred:false};
function cookTick(){
  const bar=$('v4ckbar'),mk=$('v4ckmk');if(!bar||!ck.run){ck.run=false;return}
  const p=Math.min(1,(performance.now()-ck.t0)/ck.dur);mk.style.left=(p*100)+'%';
  if(p>=1){finishCook(false);return}
  ck.raf=requestAnimationFrame(cookTick);
}
function startCook(){
  const d=DISH.find(x=>x.id===ck.sel);if(!d||ck.run)return;
  if(!canCook(d)){say(missMsg('Cooking','cook',d.l,d.r,0,{have:id=>id==='@fish'?FISH.reduce((a,f)=>a+inv(f.id),0):id==='@meat'?inv('meat'):inv(id),nm:nmR}));try{SFX.err()}catch(_){}return}
  ck.run=true;ck.stirred=false;ck.t0=performance.now();ck.dur=2100-Math.min(500,L('cook')*25);
  $('v4pan').classList.add('sizzle');$('v4pan').classList.remove('stirred');$('v4ckgo').textContent='Stir in the first zone';$('v4ckres').textContent='Watch the moving marker';
  try{SFX.forge()}catch(_){}
  ck.raf=requestAnimationFrame(cookTick);
}
function finishCook(flip){
  const d=DISH.find(x=>x.id===ck.sel),stirred=ck.stirred;ck.run=false;cancelAnimationFrame(ck.raf);
  const p=Math.min(1,(performance.now()-ck.t0)/ck.dur),perfect=flip&&stirred&&p>=.62&&p<=.86,early=flip&&p<.62,burnt=!flip;
  if(early){$('v4pan').classList.remove('sizzle');$('v4ckres').textContent='Too early! Nothing cooked.';$('v4ckgo').textContent='Cook';return}
  if(!canCook(d)){render();return}
  d.r.forEach(([id,n])=>{for(let i=0;i<n;i++){const r=resolve(id);if(r!=='@none')S.inv[r]=inv(r)-1}});
  let q=burnt?0:1+(perfect?1:0);
  if(burnt){$('v4ckres').textContent='Burnt! You lost the ingredients.';addXp('cook',Math.max(1,Math.round(d.xp/4)))}
  else{S.inv[d.id]=inv(d.id)+q;addXp('cook',Math.round(d.xp*(perfect?1.6:stirred?1.2:1)));$('v4ckres').textContent=perfect?'PERFECT! Double portion':stirred?'Well stirred! Cooked '+d.n:'Cooked '+d.n;try{SFX.win()}catch(_){}}
  $('v4pan').classList.remove('sizzle');save();setTimeout(render,burnt||!perfect?650:900);
}
VIEWS.cook=()=>{
  if(!ck.sel)ck.sel=DISH[0].id;const sel=DISH.find(x=>x.id===ck.sel);
  const list=DISH.map(d=>{const ok=L('cook')>=d.l;return '<button class="v4r'+(d.id===ck.sel?' on':'')+(ok?'':' dim')+'" data-v4="cksel" data-i="'+d.id+'">'+icon(d.ic,d.col||null)+'<div><b>'+d.n+'</b> <small style="display:inline">Heals '+Math.round(d.heal*(1+.03*L('cook')))+' · own ×'+inv(d.id)+(d.buff?' · '+cookBuffLabel(d):'')+'</small><small>'+(ok?d.r.map(([id,n])=>'<span class="'+(haveR(id,n)?'yes':'no')+'">'+n+' '+nmR(id)+' <em>(have '+haveN(id)+')</em></span>').join(' · '):'Requires Cooking level '+d.l)+'</small></div></button>'}).join('');
  return skillBar('cook')+'<div class="v4pan" id="v4pan"><div class="flame"></div><span class="dish">'+icon(sel.ic,sel.col||null)+'</span><i class="steam"></i><i class="steam"></i><i class="steam"></i><i class="steam"></i><div class="res" id="v4ckres"></div></div>'
   +'<div class="v4mt"><i class="zn stir" style="left:24%;width:17%"></i><i class="zn flip" style="left:62%;width:24%"></i><i class="mk" id="v4ckmk" style="left:0"></i></div><div id="v4ckbar" hidden></div>'
   +'<button class="btn full" id="v4ckgo" data-v4="ckgo">Cook</button><p class="h">Press Cook, then tap <b>Flip now!</b> while the marker is inside the green zone for a perfect double portion. Wait too long and the food burns. Cooked dishes heal you in Adventuring.</p>'
   +'<div class="ttl">Recipes</div><div class="v4rl">'+list+'</div>';
};
/* eat the best dish first */
const _eat4=eat;
eat=function(){
  const best=DISH.filter(d=>inv(d.id)>0).sort((a,b)=>b.heal-a.heal)[0];
  if(!best)return _eat4();
  S.inv[best.id]--;const h=Math.round(best.heal*(1+.03*L('cook')));S.hp=Math.min(maxHp(),S.hp+h);
  fx('+'+h,'heal','me');say('Ate '+best.n+' and healed '+h+'.');try{SFX.eat()}catch(_){}upd();return false;
};

function useCookedDish(id){
 const d=DISH.find(x=>x.id===id);if(!d||inv(id)<=0){say('You do not have that cooked meal.');try{SFX.err()}catch(_){}return false}
 S.inv[id]=Math.max(0,inv(id)-1);
 const h=Math.max(0,Math.round((d.heal||0)*(1+.03*L('cook'))));
 if(h){S.hp=Math.min(maxHp(),S.hp+h);fx('+'+h,'heal','me')}
 let buffMsg='';
 if(d.buff){
  S.buff=S.buff||{};
  const duration=Math.round((d.dur||180)*(1+.005*L('cook')));
  S.buff[d.buff]=Math.max(Date.now(),Number(S.buff[d.buff])||0)+duration*1000;
  buffMsg=' · '+cookBuffLabel(d)+' ('+Math.ceil(duration/60)+' min)';
 }
 say('Used '+d.n+(h?' · restored '+h+' HP':'')+buffMsg+'.');
 try{SFX.eat()}catch(_){}save();upd();render();return false;
}
const _eatWithBuffs=eat;
eat=function(){
 const best=DISH.filter(d=>inv(d.id)>0).sort((a,b)=>(b.heal||0)-(a.heal||0))[0];
 if(!best)return _eatWithBuffs();
 return useCookedDish(best.id);
};
const _cookViewBase=VIEWS.cook;
VIEWS.cook=function(){
 let html=_cookViewBase();
 html=html.replace('class="v4pan"','class="v4pan v4cook-sim"');
 html=html.replace('<div class="ttl">Recipes</div>', '<div class="v4steps"><span>1 · Prepare</span><span>2 · Stir in gold</span><span>3 · Flip in green</span></div><div class="ttl">Recipes</div>');
 const now=Date.now(),buffs=[['atk','Attack'],['def','Defense'],['spd','Speed'],['crit','Critical'],['grow','Crop growth']].filter(([k])=>(Number(S.buff&&S.buff[k])||0)>now);
 const buffHtml='<div class="ttl">Active meal buffs</div><div class="v4buffs">'+(buffs.length?buffs.map(([k,label])=>'<span class="v4buffchip">'+label+'<small>'+COOK_BUFF_LABEL[k]+' · '+Math.ceil((S.buff[k]-now)/60000)+' min left</small></span>').join(''):'<span class="h">No active meal buffs. Eat a prepared dish to gain a temporary boost.</span>')+'</div>';
 const owned=DISH.filter(d=>inv(d.id)>0);
 const foodHtml='<div class="ttl">Prepared food · '+owned.reduce((n,d)=>n+inv(d.id),0)+' portions</div><div class="v4food-grid">'+(owned.length?owned.map(d=>'<div class="v4food">'+icon(d.ic,d.col||null)+'<div class="meta"><b>'+d.n+' ×'+inv(d.id)+'</b><small>'+(d.heal?'+'+Math.round(d.heal*(1+.03*L('cook')))+' HP':'No healing')+(d.buff?' · '+cookBuffLabel(d)+' · '+Math.ceil(d.dur/60)+' min':'')+'</small></div><button class="btn alt" data-v4="ckeat" data-i="'+d.id+'">Use</button></div>').join(''):'<span class="h">Your prepared meals will appear here. Cook a recipe to build your food bag.</span>')+'</div>';
 return html+buffHtml+foodHtml;
};
/* meat from monsters */
const meatMobs=[[/rat/i,.6,1,2],[/wolf|fenrir|thornfang/i,.8,1,3],[/bat/i,.4,1,1],[/bear|boar/i,.8,2,3],[/orc|troll|goblin/i,.35,1,2],[/griffin|wyvern/i,.5,1,2],[/spider/i,.3,1,1]];
FOES.forEach(f=>{DROPS[f.n]=DROPS[f.n]||[];if(DROPS[f.n].some(x=>x[0]==='meat'||x[0]==='drake_meat'))return;
  if(/dragon|wyrm/i.test(f.n)){DROPS[f.n].push(['drake_meat',f.b?1:.4,1,2]);return}
  const m=meatMobs.find(x=>x[0].test(f.n));if(m)DROPS[f.n].push(['meat',m[1],m[2],m[3]])});

/* ---------- Carpenter ---------- */
const lg=(id,n,f,v)=>{addMat(id,n,'wood:'+id,null,v);P['wood:'+id]=()=>P['spr:wood']().replace('/>',' style="filter:'+f+'"/>')};
lg('maple','Maple Log','hue-rotate(-25deg) saturate(1.6) brightness(1.05)',6);
lg('willow','Willow Log','hue-rotate(40deg) saturate(.7) brightness(1.2)',9);
lg('cedar','Cedar Log','hue-rotate(-12deg) saturate(1.8) brightness(.85)',14);
lg('redwood','Redwood Log','hue-rotate(-35deg) saturate(2.2) brightness(.8)',24);
[['oak','spr:wood',null],['birch','wood:birch',null],['pine','wood:pine',null],['ironwood','wood:ironwood',null],['elder','wood:elder',null]].forEach(([id,ic])=>{if(MATS[id])MATS[id].ic=P[ic]?ic:'spr:wood'});
P['wood:birch']=()=>P['spr:wood']().replace('/>',' style="filter:saturate(.4) brightness(1.4)"/>');
P['wood:pine']=()=>P['spr:wood']().replace('/>',' style="filter:hue-rotate(70deg) saturate(1.2)"/>');
P['wood:ironwood']=()=>P['spr:wood']().replace('/>',' style="filter:grayscale(.85) brightness(.85)"/>');
P['wood:elder']=()=>P['spr:wood']().replace('/>',' style="filter:hue-rotate(210deg) saturate(1.3)"/>');
const GOODS=[
 {id:'plank',n:'Plank',ic:'spr:log',l:1,xp:4,v:5,out:2,r:[['oak',1]]},
 {id:'handle',n:'Tool Handle',ic:'spr:log',col:null,l:2,xp:5,v:8,out:2,r:[['birch',1]]},
 {id:'fence',n:'Fence Section',ic:'spr:fence',l:3,xp:8,v:18,out:1,r:[['plank',2]]},
 {id:'gate',n:'Garden Gate',ic:'spr:gate',l:4,xp:11,v:34,out:1,r:[['plank',4]]},
 {id:'barrel',n:'Barrel',ic:'spr:barrel',l:5,xp:14,v:48,out:1,r:[['plank',4],['cbar',1]]},
 {id:'scarecrow_i',n:'Scarecrow',ic:'spr:scarecrow',l:6,xp:18,v:70,out:1,r:[['plank',3],['hay',2]]},
 {id:'wheelb',n:'Wheelbarrow',ic:'spr:wheelbarrow',l:8,xp:24,v:105,out:1,r:[['plank',5],['ibar',1]]},
 {id:'arrows',n:'Arrow Bundle',ic:'feather',l:3,xp:9,v:22,out:1,r:[['birch',1],['feather',3]]},
 {id:'cedarchest',n:'Cedar Chest',ic:'spr:moneybag',l:10,xp:34,v:170,out:1,r:[['cedar',4],['plank',6],['gbar',1]]}
];
GOODS.forEach(g=>addMat(g.id,g.n,g.ic,g.col||null,g.v));
const cLv=()=>Math.max(L('carp'),Math.floor(L('wood')/2));
const needTxt=r=>r.map(([id,n])=>'<span class="'+(inv(id)>=n?'yes':'no')+'">'+n+' '+nm(id)+' <em>(have '+inv(id)+')</em></span>').join(' · ');
VIEWS.carp=()=>{
  const gear=IT.filter(i=>i.x==='wood').map(i=>{const ok=cLv()>=i.l,has=i.r.every(x=>inv(x[0])>=x[1])&&S.coins>=i.g;return '<button class="v4r'+(ok?'':' dim')+'" data-v4="cmake" data-i="'+i.id+'">'+iIcon(i)+'<div><b>'+i.n+'</b> <small style="display:inline">('+i.k+') · own ×'+cnt(i.id)+'</small><small>'+stat(i)+'</small><small>'+(ok?needTxt(i.r)+' · <span class="'+(S.coins>=i.g?'yes':'no')+'">'+i.g+' coins <em>(have '+S.coins+')</em></span>':'Requires Carpentry '+i.l)+'</small></div></button>'}).join('');
  const goods=GOODS.map(g=>{const ok=cLv()>=g.l;return '<button class="v4r'+(ok?'':' dim')+'" data-v4="cgood" data-i="'+g.id+'">'+icon(g.ic,g.col||null)+'<div><b>'+g.n+(g.out>1?' ×'+g.out:'')+'</b> <small style="display:inline">· own ×'+inv(g.id)+' · sells '+g.v+'</small><small>'+(ok?needTxt(g.r):'Requires Carpentry '+g.l)+'</small></div></button>'}).join('');
  return skillBar('carp')+'<p class="h">Chop logs in the Wood tab, then craft planks, farm gear and class weapons here. Weapons that match your class give +15% damage.</p><div class="ttl">Workshop goods</div><div class="v4rl">'+goods+'</div><div class="ttl">Weapons</div><div class="v4rl">'+gear+'</div>';
};
function carpGood(id,btn){
  const g=GOODS.find(x=>x.id===id);if(!g)return;
  if(cLv()<g.l||!g.r.every(([a,n])=>inv(a)>=n)){say(missMsg('Carpentry',null,g.l,g.r,0,{lv:cLv()}));try{SFX.err()}catch(_){}return}
  V4.timed(btn,650,()=>{g.r.forEach(([a,n])=>S.inv[a]=inv(a)-n);S.inv[g.id]=inv(g.id)+g.out;addXp('carp',g.xp);try{SFX.forge()}catch(_){}save();render()});
}
function carpMake(id,btn){
  const it=IT.find(x=>x.id===id);if(!it)return;
  if(cLv()<it.l||S.coins<it.g||!it.r.every(x=>inv(x[0])>=x[1])){say(missMsg('Carpentry',null,it.l,it.r,it.g,{lv:cLv()}));try{SFX.err()}catch(_){}return}
  V4.timed(btn,900,()=>{it.r.forEach(x=>S.inv[x[0]]-=x[1]);S.coins-=it.g;S.items[id]=cnt(id)+1;addXp('carp',10+it.l*3);try{SFX.forge()}catch(_){}save();render()});
}

/* ---------- Woodcutting ---------- */
const TR2=[
 {id:'oak',n:'Oak',l:1,hp:5,xp:3,trunk:'#7a4a24',leaf:'#3f8f3a',k:'round'},
 {id:'birch',n:'Birch',l:3,hp:7,xp:5,trunk:'#e6e2d2',leaf:'#7fc24a',k:'round'},
 {id:'maple',n:'Maple',l:4,hp:8,xp:6,trunk:'#7a4030',leaf:'#d9602a',k:'round'},
 {id:'pine',n:'Pine',l:5,hp:10,xp:8,trunk:'#5a3a22',leaf:'#2f6b3c',k:'cone'},
 {id:'willow',n:'Willow',l:7,hp:12,xp:10,trunk:'#6b5a3a',leaf:'#8fb860',k:'willow'},
 {id:'cedar',n:'Cedar',l:9,hp:14,xp:13,trunk:'#8a4a2c',leaf:'#2a5a46',k:'cone'},
 {id:'ironwood',n:'Ironwood',l:10,hp:17,xp:16,trunk:'#59606a',leaf:'#4a7a6a',k:'round'},
 {id:'redwood',n:'Redwood',l:12,hp:21,xp:21,trunk:'#8a3a22',leaf:'#2a6a3a',k:'cone'},
 {id:'elder',n:'Elderwood',l:13,hp:25,xp:28,trunk:'#4a3a7a',leaf:'#a46bff',k:'round'}
];
const FZ=[
 {n:'Meadow Grove',l:1,bg:'',t:[['oak',60],['birch',25],['maple',15]]},
 {n:'Pine Ridge',l:4,bg:'pine',t:[['pine',50],['birch',20],['cedar',30]]},
 {n:'Willow Marsh',l:6,bg:'marsh',t:[['willow',45],['maple',30],['birch',25]]},
 {n:'Ironwood Hollow',l:9,bg:'pine',t:[['ironwood',40],['cedar',30],['pine',20],['redwood',10]]},
 {n:'Elderwood Depths',l:12,bg:'deep',t:[['elder',40],['redwood',35],['ironwood',25]]}
];
V4.FZ=FZ;
let treeSvg=(t)=>{
  const tr=t.trunk,lf=t.leaf;let s='<svg viewBox="0 0 200 260">';
  s+='<ellipse cx="100" cy="252" rx="62" ry="8" fill="#0004"/>';
  if(t.k==='cone'){
    s+='<rect x="90" y="170" width="20" height="82" rx="4" fill="'+tr+'"/>';
    [[28,92,6],[60,76,48],[100,60,92],[142,46,134]].forEach(([y,w,yy],i)=>{s+='<path d="M100 '+(yy-40+i*0)+' L'+(100-w)+' '+(yy+34)+' L'+(100+w)+' '+(yy+34)+'Z" fill="'+lf+'"/>'});
  }else if(t.k==='willow'){
    s+='<rect x="92" y="120" width="16" height="132" rx="5" fill="'+tr+'"/><ellipse cx="100" cy="92" rx="78" ry="56" fill="'+lf+'"/>';
    for(let i=0;i<9;i++){s+='<path d="M'+(36+i*16)+' 110 q-6 50 0 90" stroke="'+lf+'" stroke-width="6" fill="none" stroke-linecap="round" opacity=".9"/>'}
  }else{
    s+='<rect x="88" y="130" width="24" height="122" rx="6" fill="'+tr+'"/><path d="M100 190 L70 160M100 176 L132 150" stroke="'+tr+'" stroke-width="8" stroke-linecap="round"/>';
    s+='<circle cx="100" cy="82" r="58" fill="'+lf+'"/><circle cx="58" cy="108" r="40" fill="'+lf+'"/><circle cx="142" cy="108" r="40" fill="'+lf+'"/><circle cx="82" cy="60" r="22" fill="#ffffff22"/>';
  }
  return s+'</svg>';
};
const WS={tree:null,mk:0,dir:1,zc:50,zw:24,raf:0,last:0,busy:false};
const pickTree=()=>{
  const z=FZ[Math.min(S.wz||0,FZ.length-1)],pool=z.t.map(([id,w])=>[TR2.find(x=>x.id===id),w]).filter(([t])=>L('wood')>=t.l);
  const list=pool.length?pool:[[TR2[0],1]];let r=Math.random()*list.reduce((a,x)=>a+x[1],0);
  for(const [t,w] of list){r-=w;if(r<=0)return t}return list[0][0];
};
function newTree2(){const t=pickTree(),hp=Math.max(2,Math.round(t.hp*(1-.08*S.up.axeup)));WS.tree={t,hp,max:hp};WS.zw=Math.max(12,26-Math.floor(t.hp/3));WS.zc=25+Math.random()*50}
const wzOk=i=>L('wood')>=FZ[i].l;
VIEWS.wood=()=>{
  if(!WS.tree)newTree2();S.wz=Math.min(S.wz||0,FZ.length-1);if(!wzOk(S.wz))S.wz=0;
  const z=FZ[S.wz],t=WS.tree.t;
  const zones=FZ.map((q,i)=>'<button class="v4z'+(i===S.wz?' on':'')+'" data-v4="wz" data-i="'+i+'" '+(wzOk(i)?'':'disabled')+'><b>'+(wzOk(i)?q.n:'🔒 '+q.n)+'</b><small>'+(wzOk(i)?q.t.map(x=>TR2.find(y=>y.id===x[0]).n).join(', '):'Woodcutting Lv '+q.l)+'</small></button>').join('');
  return skillBar('wood')+'<div class="v4zones">'+zones+'</div>'
   +'<div class="v4wd '+z.bg+'" id="v4wd" style="'+(V4.zoneBg?V4.zoneBg(S.wz):'')+'"><div class="v4nm" id="v4nm">'+t.n+' tree</div><div class="v4hpb"><i id="v4thp" style="width:'+(WS.tree.hp/WS.tree.max*100)+'%"></i></div><div class="v4tree" id="v4tree" data-v4="chop">'+treeSvg(t)+'</div></div>'
   +'<div class="v4mt" id="v4wm"><i class="zn" id="v4wz" style="left:'+(WS.zc-WS.zw/2)+'%;width:'+WS.zw+'%"></i><i class="mk" id="v4wk" style="left:'+WS.mk+'%"></i></div>'
   +'<button class="btn full" data-v4="chop">Swing axe</button>'
   +'<p class="h">Tap <b>Swing axe</b> (or the tree) when the marker is inside the green zone for a critical hit. Logs: '+TR2.map(x=>x.n+' '+inv(x.id)).join(', ')+'.</p>';
};
function woodLoop(ts){
  const k=$('v4wk');if(!k){WS.raf=0;return}
  const dt=Math.min(.05,(ts-(WS.last||ts))/1000);WS.last=ts;
  WS.mk+=WS.dir*dt*(95+L('wood')*0.5);if(WS.mk>=100){WS.mk=100;WS.dir=-1}if(WS.mk<=0){WS.mk=0;WS.dir=1}
  k.style.left=WS.mk+'%';WS.raf=requestAnimationFrame(woodLoop);
}
function chopSwing(){
  if(WS.busy||!WS.tree)return;const tr=$('v4tree'),wd=$('v4wd');if(!tr)return;
  const perfect=Math.abs(WS.mk-WS.zc)<=WS.zw/2;
  const dmg=(1+Math.floor(L('wood')/8))*(perfect?2:1);
  WS.tree.hp-=dmg;try{SFX.mine()}catch(_){}
  tr.classList.remove('hit');void tr.offsetWidth;tr.classList.add('hit');
  const r=wd.getBoundingClientRect(),cx=tr.offsetLeft+95;
  for(let i=0;i<(perfect?10:5);i++){const c=document.createElement('i');c.className='v4chip';c.style.left=(cx+(Math.random()*60-30))+'px';c.style.top=(120+Math.random()*60)+'px';c.style.setProperty('--dx',(Math.random()*120-60)+'px');c.style.setProperty('--dy',(Math.random()*-80-10)+'px');c.style.background=WS.tree.t.trunk;wd.appendChild(c);setTimeout(()=>c.remove(),650)}
  const f=document.createElement('span');f.className='v4fx'+(perfect?' crit':'');f.textContent=(perfect?'Perfect! ':'')+'-'+dmg;f.style.left=(cx-30)+'px';f.style.top='90px';wd.appendChild(f);setTimeout(()=>f.remove(),800);
  const hp=$('v4thp');if(hp)hp.style.width=Math.max(0,WS.tree.hp/WS.tree.max*100)+'%';
  WS.zc=20+Math.random()*60;const z=$('v4wz');if(z){z.style.left=(WS.zc-WS.zw/2)+'%';}
  if(WS.tree.hp<=0){
    WS.busy=true;const t=WS.tree.t;tr.classList.remove('hit');tr.classList.add('fall');try{SFX.brk()}catch(_){}
    let q=1+(Math.random()<.06*S.up.sawup+.004*L('wood')?1:0)+(perfect?1:0);
    S.inv[t.id]=inv(t.id)+q;addXp('wood',t.xp);
    if(Math.random()<.08){S.inv.honey=inv('honey')+1}
    if(Math.random()<.06){S.inv.feather=inv('feather')+1}
    setTimeout(()=>{newTree2();WS.busy=false;if(S.tab==='wood'){const w=$('v4tree');if(w){render();const n=$('v4tree');if(n){n.classList.add('grow')}}}save()},850);
  }
}
$('pane').addEventListener('click',e=>{
  const b=e.target.closest('[data-v4]');if(!b)return;const a=b.dataset.v4,i=b.dataset.i;
  if(a==='cksel'){if(!ck.run){ck.sel=i;render()}}
  else if(a==='ckgo'){
   if(!ck.run)startCook();
   else{
    const p=Math.min(1,(performance.now()-ck.t0)/ck.dur);
    if(!ck.stirred&&p>=.24&&p<=.44){ck.stirred=true;$('v4pan').classList.add('stirred');$('v4ckres').textContent='Great stir! Now flip in the green zone.';$('v4ckgo').textContent='Flip now!';try{SFX.water()}catch(_){}}
    else if(p<.62){$('v4ckres').textContent=ck.stirred?'Wait for the green flip zone!':'Stir when the marker reaches the gold zone!'}
    else finishCook(true);
   }
  }
  else if(a==='ckeat')useCookedDish(i);
  else if(a==='cmake')carpMake(i,b);
  else if(a==='cgood')carpGood(i,b);
  else if(a==='wz'){if(wzOk(+i)){S.wz=+i;newTree2();save();render()}}
  else if(a==='chop')chopSwing();
});
{const _r2=render;render=function(){const r=_r2.apply(this,arguments);
  if(S.tab==='wood'&&!WS.raf){WS.last=0;WS.raf=requestAnimationFrame(woodLoop)}
  if(S.tab!=='cook'){ck.run=false;cancelAnimationFrame(ck.raf)}
  return r}}


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


/* ================= part E · combat overhaul ================= */
const ste=document.createElement('style');
ste.textContent=`
.v4fighting .hud,.v4fighting .btns{display:none!important}
.v4fighting #stg .tip:not(#etxt):not(#warn){display:none}
#stg.s-fight{overflow:hidden}
.v4hero{position:absolute;left:6px;bottom:70px;display:flex;gap:6px;align-items:flex-end;z-index:6;pointer-events:none;width:62%;max-width:250px}
.v4av{position:relative;width:62px;height:62px;flex:none;border-radius:14px;border:2px solid #ffd778;background:#0a1624;overflow:hidden;box-shadow:0 0 10px #000a;transition:box-shadow .2s}
.v4av .ic{width:100%;height:100%}
.v4av.guard{box-shadow:0 0 0 3px #6ec1ff,0 0 18px #6ec1ff,inset 0 0 14px #6ec1ff88}
.v4av.psn{box-shadow:0 0 0 2px #7dff6a,0 0 16px #5fe05a}
.v4av.burn{box-shadow:0 0 0 2px #ffb02a,0 0 16px #ff6a1a}
.v4av.bleed{box-shadow:0 0 0 2px #ff4a4a,0 0 16px #c21f1f}
.v4av.slow{box-shadow:0 0 0 2px #9fe6ff,0 0 16px #6cc8ff;filter:saturate(.7) hue-rotate(-10deg)}
.v4av.v4lunge{animation:v4lg .3s ease-out}
.v4av.v4hurt{animation:v4hr .3s ease-out}
@keyframes v4lg{0%{transform:translateX(0)}35%{transform:translateX(46px) scale(1.12)}100%{transform:none}}
@keyframes v4hr{0%{transform:translateX(0)}25%{transform:translateX(-8px);filter:brightness(2) saturate(2)}60%{transform:translateX(5px)}100%{transform:none}}
.v4hb{flex:1;min-width:0;display:flex;flex-direction:column;gap:2px;font-size:10px;color:#fff;text-shadow:0 1px 2px #000}
.v4hb b{font-size:11px}
.v4b{position:relative;height:13px;border-radius:7px;background:#000a;border:1px solid #ffffff44;overflow:hidden}
.v4b i{display:block;height:100%;width:0;transition:width .15s}
.v4b span{position:absolute;inset:0;text-align:center;font-size:9px;line-height:13px;font-weight:800}
.v4b.hp i{background:linear-gradient(#ff7a7a,#c93030)}.v4b.sh i{background:linear-gradient(#9fd8ff,#3b86d8)}.v4b.en i{background:linear-gradient(#d9a8ff,#8a46d8)}
.v4b.cd{height:5px}.v4b.cd i{background:linear-gradient(#ffe48a,#ffb02a)}
.v4fighting #stg{justify-content:flex-start!important;min-height:430px!important;padding-top:10px!important;gap:4px!important}
.v4fighting #etxt{order:-3}.v4fighting #stg .mbar{order:-2}.v4fighting #warn{order:-1;min-height:16px}
.v4chips{position:absolute;right:6px;align-items:flex-end;top:96px;display:flex;flex-direction:column;gap:3px;z-index:6;pointer-events:none}
.v4chips span{font-size:10px;font-weight:800;padding:2px 7px;border-radius:9px;background:#000b;border:1px solid var(--c);color:var(--c);animation:v4in .25s both}
.v4abar{position:absolute;left:6px;right:6px;bottom:6px;display:flex;gap:6px;justify-content:center;z-index:7}
.v4ab{position:relative;flex:1;max-width:62px;aspect-ratio:1;border-radius:14px;border:2px solid #ffd778;background:linear-gradient(160deg,#1c3550,#0b1624);color:#fff;cursor:pointer;padding:3px;display:flex;flex-direction:column;align-items:center;justify-content:center;font:inherit;box-shadow:0 3px 8px #000a;transition:transform .1s,filter .15s}
.v4ab:active{transform:scale(.92)}
.v4ab .ic{width:70%;height:70%}
.v4ab em{position:absolute;left:0;right:0;bottom:-1px;font-style:normal;font-size:8.5px;font-weight:800;text-align:center;text-shadow:0 1px 2px #000;background:#000a;border-radius:0 0 10px 10px;line-height:12px}
.v4ab small{position:absolute;right:-3px;top:-6px;min-width:18px;height:18px;border-radius:9px;background:#8a46d8;border:1px solid #fff;font-size:10px;font-weight:800;line-height:16px;text-align:center}
.v4ab.off{filter:grayscale(.9) brightness(.55);border-color:#666}
.v4fxl{position:absolute;inset:0;pointer-events:none;z-index:5;overflow:hidden}
.v4p{position:absolute;pointer-events:none;border-radius:50%;animation:v4pt var(--d,.9s) ease-out forwards}
.v4p.psn{background:radial-gradient(circle at 35% 30%,#d6ffb0,#4fc23a 70%);border:1px solid #2c7d22}
.v4p.burn{background:radial-gradient(circle,#fff3a6,#ff8a1a 60%,#c2301a);border-radius:50% 50% 50% 0;transform:rotate(-45deg)}
.v4p.bleed{background:linear-gradient(#ff6a6a,#a31717);border-radius:50% 50% 50% 50%/60% 60% 40% 40%}
.v4p.slow{background:none;color:#bfeaff;text-shadow:0 0 6px #6cc8ff;border-radius:0}
.v4p.drain{background:radial-gradient(circle,#f0c8ff,#8a46d8);box-shadow:0 0 8px #b36bff}
.v4p.heal{background:none;color:#7dffb0;text-shadow:0 0 6px #2fe08a;border-radius:0}
.v4p.spark{background:radial-gradient(circle,#fff,#ffd84d 60%,transparent)}
.v4p.chip{background:#c9d6e4;border-radius:2px}
@keyframes v4pt{0%{opacity:1;transform:translate(0,0) scale(1)}100%{opacity:0;transform:translate(var(--dx,0),var(--dy,-40px)) scale(.4)}}
.v4sl{position:absolute;width:150px;height:150px;margin:-75px 0 0 -75px;z-index:5;pointer-events:none;border-radius:50%;background:conic-gradient(from 200deg,transparent 0 55%,#fff 62%,#9fe6ff 70%,transparent 78%);animation:v4slash .28s ease-out forwards}
.v4sl.big{width:210px;height:210px;margin:-105px 0 0 -105px;background:conic-gradient(from 190deg,transparent 0 45%,#fff3a6 56%,#ff8a1a 68%,transparent 80%)}
@keyframes v4slash{0%{opacity:0;transform:rotate(-70deg) scale(.6)}30%{opacity:1}100%{opacity:0;transform:rotate(40deg) scale(1.15)}}
.v4shk{animation:v4sk .25s linear}
@keyframes v4sk{0%,100%{transform:translate(0,0)}20%{transform:translate(-4px,3px)}40%{transform:translate(4px,-3px)}60%{transform:translate(-3px,-2px)}80%{transform:translate(3px,2px)}}
.v4red:after{content:'';position:absolute;inset:0;z-index:8;pointer-events:none;box-shadow:inset 0 0 60px 18px #e01a1acc;animation:v4rd .35s ease-out forwards}
@keyframes v4rd{from{opacity:1}to{opacity:0}}
.v4tele:after{content:'';position:absolute;inset:0;z-index:8;pointer-events:none;box-shadow:inset 0 0 50px 10px #ff3a1acc;animation:v4tl .35s ease-in-out infinite alternate}
@keyframes v4tl{from{opacity:.25}to{opacity:1}}
.s-fight .fx.crit{font-size:34px!important;color:#ffd84d!important;text-shadow:0 0 10px #ff8a1a,0 2px 3px #000}
#eo.v4focus{filter:drop-shadow(0 0 10px #ffd84d)}
#eo.v4elunge{animation:v4el .3s ease-out}
@keyframes v4el{0%{transform:translateY(0) scale(1)}40%{transform:translateY(34px) scale(1.12)}100%{transform:none}}
.v4ghost{position:fixed;z-index:80;pointer-events:none;animation:v4dis .85s ease-out forwards}
@keyframes v4dis{0%{opacity:1;filter:brightness(1)}25%{filter:brightness(3) saturate(0);transform:scale(1.08)}100%{opacity:0;filter:brightness(2) blur(8px);transform:scale(1.5) translateY(-30px)}}
.v4coin{position:fixed;z-index:81;width:10px;height:10px;border-radius:50%;background:radial-gradient(circle,#fff6b0,#ffb02a);pointer-events:none;animation:v4pt .9s ease-out forwards}
.v4ban{position:absolute;left:0;right:0;top:34%;text-align:center;z-index:9;font-size:28px;font-weight:900;color:#ffd84d;text-shadow:0 0 12px #ff8a1a,0 3px 4px #000;pointer-events:none;animation:v4up .9s ease-out forwards}
`;
document.head.appendChild(ste);
Object.assign(SFX,{
 shoo:()=>{tone(950,.1,'triangle',.05,-520);tone(700,.13,'triangle',.04,-380,.07)},
 poison:()=>{tone(320,.1,'sine',.05,260);tone(420,.1,'sine',.04,180,.07)},
 burn:()=>{tone(110,.22,'sawtooth',.05,-20);tone(240,.1,'square',.03,60,.06)},
 bleed:()=>tone(190,.12,'triangle',.05,-110),
 slow:()=>tone(950,.28,'sine',.05,-520),
 guard:()=>seq([660,990],'triangle',.12,.06),
 focus:()=>tone(1400,.3,'sine',.05,380),
 tele:()=>{tone(90,.55,'sawtooth',.07,50);tone(180,.4,'square',.03,0,.1)},
 drain:()=>{tone(520,.22,'sine',.05,-320);tone(260,.2,'sine',.04,200,.12)},
 slash:()=>{tone(700,.07,'sawtooth',.06,-500);tone(160,.1,'square',.05,-60,.03)},
 power:()=>{tone(220,.18,'sawtooth',.08,-140);tone(880,.14,'square',.06,-400,.04)}
});
const stgPos=el=>{const s=$('stg'),r=el.getBoundingClientRect(),q=s.getBoundingClientRect();return[r.left-q.left+r.width/2,r.top-q.top+r.height/2]};
V4.spawn=(cls,x,y,n,o)=>{
  const L2=$('v4fxl');if(!L2)return;o=o||{};
  for(let i=0;i<n;i++){const p=document.createElement('i');p.className='v4p '+cls;const sz=o.sz||(6+Math.random()*7);
    p.style.cssText='left:'+(x+(Math.random()-.5)*(o.sx||40))+'px;top:'+(y+(Math.random()-.5)*(o.sy||20))+'px;width:'+sz+'px;height:'+sz+'px;--dx:'+((Math.random()-.5)*(o.dx||50))+'px;--dy:'+(o.dy!=null?o.dy+Math.random()*-20:-30-Math.random()*40)+'px;--d:'+(o.d||(.6+Math.random()*.5))+'s';
    if(o.txt){p.textContent=o.txt;p.style.fontSize='14px';p.style.width='auto';p.style.height='auto'}
    L2.appendChild(p);setTimeout(()=>p.remove(),1400)}
};
V4.vfx=(kind,side)=>{
  const av=document.querySelector('.v4av'),eo=$('eo');if(!av||!$('v4fxl'))return;
  const [hx,hy]=stgPos(av),[ex,ey]=eo?stgPos(eo):[hx+120,hy-60];
  if(kind==='poison')V4.spawn('psn',hx,hy+10,6,{dy:-60});
  else if(kind==='burn')V4.spawn('burn',hx,hy+16,7,{dy:-55,sz:9});
  else if(kind==='bleed')V4.spawn('bleed',hx,hy-6,5,{dy:40,sz:6});
  else if(kind==='slow')V4.spawn('slow',hx,hy-20,5,{dy:35,txt:'❄',dx:60});
  else if(kind==='heal')V4.spawn('heal',hx,hy,6,{dy:-55,txt:'✚',dx:50});
  else if(kind==='block')V4.spawn('spark',hx+20,hy,8,{dy:-20,dx:80,sz:5});
  else if(kind==='drain')V4.spawn('drain',ex,ey,6,{dy:0,dx:20,sz:9});
};
V4.onHit=(crit,type)=>{
  const eo=$('eo'),s=$('stg');if(!eo||!s)return;
  const [ex,ey]=stgPos(eo),pw=V4._pow;V4._pow=false;
  const sl=document.createElement('div');sl.className='v4sl'+(pw||crit?' big':'');sl.style.left=ex+'px';sl.style.top=ey+'px';$('v4fxl')&&$('v4fxl').appendChild(sl);setTimeout(()=>sl.remove(),320);
  V4.spawn(crit?'spark':'chip',ex,ey,crit?12:6,{dx:120,dy:-30,sz:crit?6:4,sx:30,sy:30});
  const av=document.querySelector('.v4av');if(av)anim(av,'v4lunge');
  try{SFX.slash()}catch(_){}
  if(crit||pw){anim(s,'v4shk')}
};
V4.onHurt=heavy=>{
  const s=$('stg');if(!s)return;
  s.classList.remove('v4red');void s.offsetWidth;s.classList.add('v4red');setTimeout(()=>s.classList.remove('v4red'),380);
  const av=document.querySelector('.v4av');if(av)anim(av,'v4hurt');
  const eo=$('eo');if(eo)anim(eo,'v4elunge');
  if(heavy)anim(s,'v4shk');
};
{const _fx2=fx;fx=function(t,c,side,crit){
  _fx2.apply(this,arguments);const s=$('stg');if(!s||!$('v4fxl'))return;
  if(side==='foe'&&typeof t==='number')V4.onHit(crit,c);
  else if(side==='me'&&c==='taken')V4.onHurt(String(t).startsWith('HEAVY'));
  else if(side==='me'&&c==='heal')V4.vfx('heal','me');
  else if(side==='me'&&t==='Block!')V4.vfx('block','me');
  if(crit){const l=[...s.children].reverse().find(x=>x.classList&&x.classList.contains('fx'));if(l)l.classList.add('crit')}
}}
{const _pw=power;power=function(){V4._pow=true;try{SFX.power()}catch(_){}const r=_pw.apply(this,arguments);setTimeout(()=>V4._pow=false,50);return r}}
{const _g=guardAct;guardAct=function(){const e=en>=20;const r=_g.apply(this,arguments);if(e){try{SFX.guard()}catch(_){}V4.spawn('spark',...stgPos(document.querySelector('.v4av')||$('stg')),8,{dx:70,dy:-30,sz:5})}return r}}
{const _f=focusAct;focusAct=function(){const e=en>=40;const r=_f.apply(this,arguments);if(e){try{SFX.focus()}catch(_){}const s=$('stg');if(s){const b=document.createElement('div');b.className='v4ban';b.textContent='FOCUSED';s.appendChild(b);setTimeout(()=>b.remove(),900)}}return r}}
V4.chipsKey='';
{const _u=upd;upd=function(){
  _u.apply(this,arguments);
  const ch=$('v4chips');if(!ch)return;
  document.querySelectorAll('.v4ab[data-need]').forEach(b=>b.classList.toggle('off',en<+b.dataset.need));
  const pn=$('v4potn');if(pn)pn.textContent=healCount();
  const list=[];
  if(guardT>0)list.push(['Guard '+guardT.toFixed(1)+'s','#6ec1ff']);
  if(focus)list.push(['Focused','#ffd84d']);
  if(slowT>0)list.push(['Slowed '+Math.ceil(slowT)+'s','#9fe6ff']);
  if(dot.t>0)list.push([dot.k+' '+Math.ceil(dot.t)+'s',dot.k==='Poisoned'?'#7dff6a':dot.k==='Burning'?'#ffb02a':'#ff6a6a']);
  if(mom>1)list.push(['Momentum ×'+mom,'#ffe08a']);
  const k=list.map(x=>x[0]).join('|');
  if(k!==V4.chipsKey){V4.chipsKey=k;ch.innerHTML=list.map(x=>'<span style="--c:'+x[1]+'">'+x[0]+'</span>').join('')}
  const av=document.querySelector('.v4av');
  if(av){av.classList.toggle('guard',guardT>0);av.classList.toggle('slow',slowT>0);av.classList.toggle('psn',dot.t>0&&dot.k==='Poisoned');av.classList.toggle('burn',dot.t>0&&dot.k==='Burning');av.classList.toggle('bleed',dot.t>0&&dot.k==='Bleeding')}
  const eo=$('eo');if(eo)eo.classList.toggle('v4focus',!!focus);
}}
{let pdot=0,pslow=0,ptele=0,tacc=0;
 const _ct=combatTick;combatTick=function(dt){
  _ct.apply(this,arguments);
  if(!fight||!$('v4chips'))return;
  const s=$('stg');
  if(dot.t>0){
    if(!pdot){fx(dot.k+'!','info','me');try{dot.k==='Poisoned'?SFX.poison():dot.k==='Burning'?SFX.burn():SFX.bleed()}catch(_){}}
    tacc+=dt;if(tacc>=.6){tacc=0;V4.vfx(dot.k==='Poisoned'?'poison':dot.k==='Burning'?'burn':'bleed','me');try{dot.k==='Poisoned'?SFX.poison():dot.k==='Burning'?SFX.burn():SFX.bleed()}catch(_){}}
  }else tacc=0;
  pdot=dot.t>0;
  if(slowT>0&&!pslow){fx('Slowed!','info','me');try{SFX.slow()}catch(_){}V4.vfx('slow','me')}
  pslow=slowT>0;
  if(tele>0&&!ptele){try{SFX.tele()}catch(_){}}
  ptele=tele>0;if(s)s.classList.toggle('v4tele',tele>0);
 }}
{const _ea=enemyAttack;enemyAttack=function(h){const f=fight,hp0=f?f.hp:0;_ea.apply(this,arguments);if(fight&&fight===f&&f.ab==='drain'&&f.hp>hp0){V4.vfx('drain','foe');try{SFX.drain()}catch(_){}}}}
{const _fd=foeDown;foeDown=function(){
  const e=$('eo');
  if(e&&fight&&fight.hp<=0&&!fight.dead){
    const r=e.getBoundingClientRect();
    /* Shaman uses its own fixed-footprint dissolve; never create the grey, zooming V4 ghost clone for it. */
    if(!/^Goblin( Shaman| Archer)?$/.test(fight.n)){
      const g=e.cloneNode(true);g.removeAttribute('id');g.className='v4ghost';
      g.style.cssText='left:'+r.left+'px;top:'+r.top+'px;width:'+r.width+'px;height:'+r.height+'px';document.body.appendChild(g);setTimeout(()=>g.remove(),900);
    }
    for(let i=0;i<14;i++){const c=document.createElement('i');c.className='v4coin';c.style.left=(r.left+r.width/2)+'px';c.style.top=(r.top+r.height/2)+'px';c.style.setProperty('--dx',(Math.random()*220-110)+'px');c.style.setProperty('--dy',(Math.random()*-140-20)+'px');document.body.appendChild(c);setTimeout(()=>c.remove(),950)}
  }
  return _fd.apply(this,arguments);
}}
{const _r5=render;render=function(){const r=_r5.apply(this,arguments);$('pane').classList.toggle('v4fighting',S.tab==='fight'&&!!fight);V4.chipsKey='';if(S.tab==='fight'&&fight)upd();return r}}
V4.fightOverlay=()=>{
  const ci=(CB[S.cls]||{}).ico||'hero_face',cn=CLS[S.cls]?CLS[S.cls].n:'Adventurer';
  const ab=(a,need,ic,lab)=>'<button class="v4ab" data-a="'+a+'"'+(need?' data-need="'+need+'"':'')+'>'+ic+'<em>'+lab+'</em>'+(need?'<small>'+need+'</small>':'')+'</button>';
  return '<div class="v4hero"><div class="v4av" id="me">'+icon('spr:'+ci)+'</div><div class="v4hb"><b>'+cn+' · Lv '+L('combat')+'</b><div class="v4b hp"><i id="php"></i><span id="pht"></span></div>'+(maxSh()?'<div class="v4b sh"><i id="psh"></i><span id="psht"></span></div>':'')+'<div class="v4b en"><i id="pen"></i><span id="pent"></span></div><div class="v4b cd"><i id="cdf"></i></div></div></div>'
   +'<div class="v4chips" id="v4chips"></div><div class="v4fxl" id="v4fxl"></div>'
   +'<div class="v4abar">'+ab('power',30,icon('spr:wp_great'),'Power')+ab('guard',20,icon('spr:wp_obsshield'),'Guard')+ab('focus',40,icon('spr:gem_focus'),'Focus')+CAB.btn()+ab('eat',0,icon('spr:basket'),'Eat')+'<button class="v4ab" data-a="potion">'+icon('potion')+'<em>Potion</em><small id="v4potn" style="background:#2fa05a"></small></button>'+(S.dg?'':ab('flee',0,icon('spr:compass'),'Flee'))+'</div>';
};


/* ================= part F · woodcutting reborn · market square ================= */
const stf=document.createElement('style');
stf.textContent=`
.v4wd{height:340px!important}
.v4tree{width:210px!important;height:250px!important;margin-left:-105px!important;bottom:6px!important;transition:filter .2s}
.v4tgt{position:absolute;width:52px;height:52px;margin:-26px 0 0 -26px;pointer-events:none;z-index:3}
.v4tgt:before{content:'';position:absolute;inset:14px;border-radius:50%;background:radial-gradient(circle,#fff,#ffd84d 60%,#ff8a1a);box-shadow:0 0 10px #ffd84d;animation:v4tp .5s ease-in-out infinite alternate}
.v4tgt .rg{position:absolute;inset:0;border-radius:50%;border:3px solid #fff;box-shadow:0 0 8px #fff;transform:scale(2.4)}
.v4tgt .rg.go{border-color:#7dffb0;box-shadow:0 0 14px #7dffb0}
@keyframes v4tp{from{transform:scale(.85)}to{transform:scale(1.1)}}
.v4axe{position:absolute;right:6%;bottom:44px;width:120px;height:120px;transform:scaleX(-1) rotate(-12deg);transform-origin:80% 90%;pointer-events:none;z-index:4;filter:drop-shadow(0 4px 4px #0008)}
.v4axe .ic{width:100%;height:100%}
.v4axe.sw{animation:v4asw .3s cubic-bezier(.4,0,.2,1)}
@keyframes v4asw{0%{transform:scaleX(-1) rotate(-12deg)}35%{transform:scaleX(-1) translate(-20px,-30px) rotate(-70deg)}60%{transform:scaleX(-1) translate(60px,10px) rotate(28deg)}100%{transform:scaleX(-1) rotate(-12deg)}}
.v4notch{position:absolute;width:38px;height:9px;border-radius:2px;background:linear-gradient(#2b1608,#8a5a2a 60%,#d9a868);box-shadow:inset 0 1px 2px #000a;pointer-events:none}
.v4leaf{position:absolute;width:9px;height:6px;border-radius:50% 0;pointer-events:none;animation:v4lf 1.4s ease-in forwards}
@keyframes v4lf{0%{opacity:1;transform:translate(0,0) rotate(0)}100%{opacity:0;transform:translate(var(--dx),150px) rotate(300deg)}}
.v4log{position:absolute;width:34px;height:34px;pointer-events:none;z-index:6;animation:v4lg2 1s ease-in forwards}
.v4log .ic{width:100%;height:100%}
@keyframes v4lg2{0%{transform:translate(0,0) scale(.6);opacity:1}30%{transform:translate(var(--dx),-50px) scale(1.1)}100%{transform:translate(160px,-190px) scale(.5);opacity:0}}
.v4dust{position:absolute;width:26px;height:18px;border-radius:50%;background:#d9c7a0;opacity:.7;pointer-events:none;animation:v4ds .8s ease-out forwards}
@keyframes v4ds{to{opacity:0;transform:translate(var(--dx),-18px) scale(2.2)}}
.v4streak{position:absolute;left:8px;top:48px;font-weight:900;font-size:13px;color:#ffd84d;text-shadow:0 2px 3px #000;z-index:5;pointer-events:none}
.v4mood{position:absolute;left:0;right:0;bottom:6px;text-align:center;font-size:12px;color:#fff;text-shadow:0 1px 3px #000;z-index:5;pointer-events:none}
.v4tm{display:flex;gap:6px;margin:4px 0 8px}.v4tm button{flex:1;padding:9px 6px;border:2px solid var(--line);border-radius:12px;background:var(--card);color:inherit;font:inherit;font-weight:700;cursor:pointer}
.v4tm button.on{border-color:#ffd778;background:linear-gradient(#2a3b52,#162235)}
.v4kc{border:2px solid #8a7049;border-radius:12px;background:linear-gradient(135deg,#2a2013,#16110a);padding:8px 10px;margin-bottom:6px;display:flex;gap:10px;align-items:center}
.v4kc .ic{width:38px;height:38px;flex:none}.v4kc div{flex:1;min-width:0;font-size:12px}.v4kc b{color:#ffe0a0}
.v4kc .btn{padding:7px 10px;font-size:12px}
.v4g{display:flex;align-items:center;gap:9px;border:2px solid var(--line);border-radius:12px;background:var(--card);padding:6px 9px;margin-bottom:5px}
.v4g .ic{width:34px;height:34px;flex:none}.v4g div{flex:1;min-width:0;font-size:12px}.v4g .up{color:#7dffb0;font-weight:800}.v4g .dn{color:#ff8a7a;font-weight:800}
.v4g .btn{padding:6px 9px;font-size:11.5px}
#v4hg{position:fixed;inset:0;z-index:96;background:#000c;display:flex;align-items:center;justify-content:center;padding:14px}
#v4hg .box{width:min(400px,100%);border:3px solid #ffd778;border-radius:16px;background:linear-gradient(160deg,#2a1f12,#0d0a06);color:#fff;padding:14px;text-align:center;animation:v4pop .25s ease-out}
#v4hg .npc{width:84px;height:84px;margin:0 auto;border-radius:50%;overflow:hidden;border:3px solid #ffd778;background:#000;animation:v4npc 1.6s ease-in-out infinite}
@keyframes v4npc{50%{transform:translateY(-4px)}}
#v4hg .npc .ic{width:100%;height:100%}
#v4hg .say{margin:8px 0;font-style:italic;color:#e9d9b9;min-height:34px}
.v4pb{position:relative;display:flex;height:34px;border-radius:10px;overflow:hidden;border:2px solid #fff3;margin:8px 0}
.v4pb i{display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:800;font-style:normal;color:#0008;text-shadow:none}
.v4pb .nd{position:absolute;top:-3px;bottom:-3px;width:6px;margin-left:-3px;background:#fff;border-radius:3px;box-shadow:0 0 10px #fff}
`;
document.head.appendChild(stf);
Object.assign(SFX,{chop:()=>{tone(120,.09,'square',.09,-60);tone(420,.05,'sawtooth',.05,-260,.01)},creak:()=>{tone(210,.4,'sawtooth',.04,-70);tone(190,.3,'sawtooth',.03,-50,.18)},timber:()=>{tone(90,.7,'sawtooth',.09,-50);tone(60,.6,'square',.07,-20,.5)},ding:()=>tone(1500,.14,'triangle',.05)});
const ringDur=()=>Math.max(700,1100-L('wood')*10);
function newRing(){WS.ring={t0:performance.now(),dur:ringDur(),x:80+Math.random()*50,y:120+Math.random()*70};WS.ringNew=true}
VIEWS.wood=()=>{
  if(!WS.tree)newTree2();S.wz=Math.min(S.wz||0,FZ.length-1);if(!wzOk(S.wz))S.wz=0;
  const z=FZ[S.wz],t=WS.tree.t;
  const zones=FZ.map((q,i)=>'<button class="v4z'+(i===S.wz?' on':'')+'" data-v4="wz" data-i="'+i+'" '+(wzOk(i)?'':'disabled')+'><b>'+(wzOk(i)?q.n:'🔒 '+q.n)+'</b><small>'+(wzOk(i)?q.t.map(x=>TR2.find(y=>y.id===x[0]).n).join(', '):'Woodcutting Lv '+q.l)+'</small></button>').join('');
  newRing();
  return skillBar('wood')+'<div class="v4zones">'+zones+'</div>'
   +'<div class="v4wd '+z.bg+'" id="v4wd" data-v4="chop" style="'+(V4.zoneBg?V4.zoneBg(S.wz):'')+'"><div class="v4nm" id="v4nm">'+t.n+' tree</div><div class="v4hpb"><i id="v4thp" style="width:'+(WS.tree.hp/WS.tree.max*100)+'%"></i></div>'
   +'<div class="v4tree" id="v4tree">'+treeSvg(t)+'<div id="v4notches"></div><div class="v4tgt" id="v4tgt"><i class="rg" id="v4rg"></i></div></div>'
   +'<div class="v4axe" id="v4axe">'+icon('spr:axe')+'</div><div class="v4streak" id="v4streak"></div><div class="v4mood" id="v4mood">Tap when the ring closes on the glowing weak spot</div></div>'
   +'<button class="btn full" data-v4="chop">Swing axe</button>'
   +'<p class="h">Time your swing as the ring closes: <b>perfect</b> hits deal huge damage and chain into a streak. Logs: '+TR2.map(x=>x.n+' '+inv(x.id)).join(', ')+'.</p>';
};
woodLoop=function(ts){
  const tg=$('v4tgt');if(!tg){WS.raf=0;return}
  const rg=$('v4rg'),r=WS.ring;if(!r){newRing()}
  const e=(performance.now()-WS.ring.t0)/WS.ring.dur;
  if(e>1.1)newRing();
  if(WS.ringNew){tg.style.left=WS.ring.x+'px';tg.style.top=WS.ring.y+'px';WS.ringNew=false}
  const k=Math.min(1,Math.max(0,e));rg.style.transform='scale('+(2.4-1.4*k)+')';rg.classList.toggle('go',e>=.8);
  WS.raf=requestAnimationFrame(woodLoop);
};
chopSwing=function(){
  if(WS.busy||!WS.tree)return;const tr=$('v4tree'),wd=$('v4wd');if(!tr||!wd)return;
  const e=(performance.now()-WS.ring.t0)/WS.ring.dur,perfect=e>=.8&&e<=1.1,good=!perfect&&e>=.55;
  WS.streak=perfect?(WS.streak||0)+1:0;
  const base=1+Math.floor(L('wood')/8),mult=perfect?2.2+Math.min(1.5,.15*(WS.streak-1)):good?1.3:.6;
  const dmg=Math.max(1,Math.round(base*mult));
  const ax=$('v4axe');if(ax){ax.classList.remove('sw');void ax.offsetWidth;ax.classList.add('sw')}
  const rx=WS.ring.x,ry=WS.ring.y;
  setTimeout(()=>{
    if(!$('v4tree')||!WS.tree)return;
    WS.tree.hp-=dmg;try{SFX.chop();if(perfect)SFX.ding()}catch(_){}
    tr.classList.remove('hit');void tr.offsetWidth;tr.classList.add('hit');
    const col=WS.tree.t.trunk;
    for(let i=0;i<(perfect?12:6);i++){const c=document.createElement('i');c.className='v4chip';c.style.left=(tr.offsetLeft+rx)+'px';c.style.top=(tr.offsetTop+ry)+'px';c.style.setProperty('--dx',(Math.random()*140-70)+'px');c.style.setProperty('--dy',(Math.random()*-90-10)+'px');c.style.background=col;wd.appendChild(c);setTimeout(()=>c.remove(),650)}
    const n=document.createElement('i');n.className='v4notch';n.style.left=(rx-19)+'px';n.style.top=(ry-4)+'px';n.style.setProperty('--r',(Math.random()*24-12)+'deg');n.style.transform='rotate('+(Math.random()*24-12)+'deg)';n.style.width=(26+Math.min(30,dmg*4))+'px';const nb=$('v4notches');if(nb)nb.appendChild(n);
    for(let i=0;i<(perfect?7:3);i++){const l=document.createElement('i');l.className='v4leaf';l.style.background=WS.tree.t.leaf;l.style.left=(tr.offsetLeft+50+Math.random()*110)+'px';l.style.top=(tr.offsetTop+20+Math.random()*60)+'px';l.style.setProperty('--dx',(Math.random()*80-40)+'px');wd.appendChild(l);setTimeout(()=>l.remove(),1450)}
    const f=document.createElement('span');f.className='v4fx'+(perfect?' crit':'');f.textContent=(perfect?'PERFECT ':good?'':'weak ')+'-'+dmg;f.style.left=(tr.offsetLeft+rx-30)+'px';f.style.top=(tr.offsetTop+ry-40)+'px';wd.appendChild(f);setTimeout(()=>f.remove(),850);
    if(perfect)anim(wd,'v4shk');
    const sk=$('v4streak');if(sk)sk.textContent=WS.streak>1?'Streak ×'+WS.streak:'';
    const hp=$('v4thp');if(hp)hp.style.width=Math.max(0,WS.tree.hp/WS.tree.max*100)+'%';
    const md=$('v4mood');if(md)md.textContent=WS.tree.hp<=WS.tree.max*.3&&WS.tree.hp>0?'The trunk is creaking...':'';
    if(WS.tree.hp<=WS.tree.max*.3&&WS.tree.hp>0)try{SFX.creak()}catch(_){}
    newRing();
    if(WS.tree.hp<=0)fellTree(tr,wd,perfect);
  },170);
};
function fellTree(tr,wd,perfect){
  WS.busy=true;const t=WS.tree.t;tr.classList.remove('hit');
  const b=document.createElement('div');b.className='v4ban';b.textContent='TIMBER!';b.style.top='26%';wd.appendChild(b);setTimeout(()=>b.remove(),900);
  tr.classList.add('fall');try{SFX.timber()}catch(_){}
  const q=1+(Math.random()<.06*S.up.sawup+.004*L('wood')?1:0)+(perfect?1:0)+((WS.streak||0)>=3?1:0);
  setTimeout(()=>{
    anim(wd,'v4shk');
    for(let i=0;i<7;i++){const d=document.createElement('i');d.className='v4dust';d.style.left=(tr.offsetLeft+80+i*10)+'px';d.style.top=(tr.offsetTop+220)+'px';d.style.setProperty('--dx',(Math.random()*120-30)+'px');wd.appendChild(d);setTimeout(()=>d.remove(),850)}
    for(let i=0;i<Math.min(5,q+1);i++){const l=document.createElement('div');l.className='v4log';l.innerHTML=icon(t.id==='oak'?'spr:wood':'wood:'+t.id);l.style.left=(tr.offsetLeft+110+i*14)+'px';l.style.top=(tr.offsetTop+190)+'px';l.style.setProperty('--dx',(i*18-30)+'px');l.style.animationDelay=(i*80)+'ms';wd.appendChild(l);setTimeout(()=>l.remove(),1200)}
    S.inv[t.id]=inv(t.id)+q;addXp('wood',t.xp);
    if(Math.random()<.08)S.inv.honey=inv('honey')+1;
    if(Math.random()<.06)S.inv.feather=inv('feather')+1;
  },620);
  setTimeout(()=>{newTree2();WS.busy=false;WS.streak=0;if(S.tab==='wood'){render()}save()},1700);
}

/* ---------- Market Square ---------- */
S.tmode=S.tmode||'map';S.contracts=S.contracts||[];
const hsh=s=>{let h=7;for(const c of s)h=(h*31+c.charCodeAt(0))%9973;return h};
const mmult=id=>{const h=hsh(id),t=Date.now()/1000;return 1+.28*Math.sin(t/(110+h%80)+h)};
const mtrend=id=>{const h=hsh(id),t=Date.now()/1000;return Math.cos(t/(110+h%80)+h)>=0};
const NPCS=[
 {n:'Miser Gruff',ic:'m_goblin',say:['“Too dear! Far too dear!”','“I pay fair, never more.”'],seg:[['Insulted',.5,.12,'#a82a2a'],['Low',.8,.32,'#c26a2a'],['Fair',1,.30,'#c2b52a'],['Good',1.25,.20,'#5ab83a'],['Great',1.5,.06,'#ffd84d']]},
 {n:'Lady Vance',ic:'m_banshee',say:['“Quality, I do appreciate quality.”','“Name your price, darling.”'],seg:[['Insulted',.5,.08,'#a82a2a'],['Low',.8,.16,'#c26a2a'],['Fair',1,.28,'#c2b52a'],['Good',1.25,.28,'#5ab83a'],['Great',1.6,.20,'#ffd84d']]},
 {n:'Old Collector',ic:'m_orc_hood',say:['“Hmm... rare stuff, is it?”','“I know what this is worth.”'],seg:[['Insulted',.5,.10,'#a82a2a'],['Low',.8,.22,'#c26a2a'],['Fair',1,.26,'#c2b52a'],['Good',1.3,.26,'#5ab83a'],['Great',1.7,.16,'#ffd84d']]},
 {n:'Dock Trader',ic:'m_elf',say:['“Quick deal, I sail at dawn.”','“Let us not waste time.”'],seg:[['Insulted',.5,.10,'#a82a2a'],['Low',.85,.25,'#c26a2a'],['Fair',1,.30,'#c2b52a'],['Good',1.2,.24,'#5ab83a'],['Great',1.45,.11,'#ffd84d']]}
];
const marketIds=()=>Object.keys(S.inv).filter(id=>S.inv[id]>0&&(VAL[id]||0)>=2).sort((a,b)=>(VAL[b]||0)-(VAL[a]||0)).slice(0,30);
function genContract(){
  const pool=Object.keys(MATS).filter(id=>(VAL[id]||0)>=3&&(VAL[id]||0)<=40+L('trade')*14).concat(FISH.filter(f=>f.l<=L('fish')+3).map(f=>f.id));
  const id=pool[rnd(0,pool.length-1)],qty=3+rnd(0,2+Math.floor(L('trade')/3)),who=['Baker Hilda','Smith Roderic','Captain Mara','Innkeeper Bo','Alchemist Veyra','Farmer Tobin'][rnd(0,5)];
  return {id:'k'+Date.now()+rnd(0,999),item:id,qty,reward:Math.round((VAL[id]||5)*qty*(1.7+Math.random()*.7)),exp:Date.now()+(4+rnd(0,6))*60000,who};
}
function refreshContracts(){S.contracts=(S.contracts||[]).filter(c=>c.exp>Date.now());while(S.contracts.length<3)S.contracts.push(genContract())}
const kLeft=c=>fmt((c.exp-Date.now())/1000);
function marketView(){
  refreshContracts();
  const ids=marketIds();
  const hot=ids.map(id=>[id,mmult(id)]).sort((a,b)=>b[1]-a[1]).slice(0,3);
  const kc=S.contracts.map(c=>{const have=inv(c.item)>=c.qty;return '<div class="v4kc">'+gIcon(c.item,'ic')+'<div><b>'+c.who+'</b> wants <b>'+c.qty+' × '+nm(c.item)+'</b><br>Reward <b style="color:#ffd84d">'+c.reward+'</b> coins · <span class="v4kt" data-id="'+c.id+'">'+kLeft(c)+'</span> left · you have '+inv(c.item)+'</div><button class="btn'+(have?'':' alt')+'" data-v4="deliver" data-i="'+c.id+'" '+(have?'':'disabled')+'>Deliver</button></div>'}).join('');
  const rows=ids.map(id=>{const m=mmult(id),up=mtrend(id);return '<div class="v4g">'+gIcon(id,'ic')+'<div><b>'+nm(id)+'</b> ×'+inv(id)+'<br>Base '+VAL[id]+' · market <span class="'+(up?'up':'dn')+'">×'+m.toFixed(2)+' '+(up?'▲':'▼')+'</span></div><button class="btn alt" data-v4="sell" data-i="'+id+'" data-q="1">Haggle 1</button>'+(inv(id)>1?'<button class="btn" data-v4="sell" data-i="'+id+'" data-q="'+inv(id)+'">All ×'+inv(id)+'</button>':'')+'</div>'}).join('')||'<p class="h">Nothing to sell yet. Gather materials, fish and crafted goods first.</p>';
  return '<p class="h">Prices drift through the day. Sell when a good is ▲ in demand, and win the haggle for the best coin.'+(hot.length?' Hot now: '+hot.map(h=>nm(h[0])+' ×'+h[1].toFixed(2)).join(', ')+'.':'')+'</p><div class="ttl">Contract board</div>'+kc+'<div class="ttl">Your stalls</div>'+rows;
}
{const _tv=VIEWS.trade;VIEWS.trade=()=>{
  const bar='<div class="v4tm"><button data-v4="tmode" data-i="map" class="'+(S.tmode!=='market'?'on':'')+'">Caravan Routes</button><button data-v4="tmode" data-i="market" class="'+(S.tmode==='market'?'on':'')+'">Market Square</button></div>';
  return S.tmode==='market'?skillBar('trade')+bar+marketView():bar+_tv();
}}
function haggle(id,qty){
  if(document.getElementById('v4hg'))return;qty=Math.min(qty,inv(id));if(qty<1)return;
  const npc=NPCS[rnd(0,NPCS.length-1)];
  const segs=npc.seg.slice().sort(()=>Math.random()-.5);
  const root=document.createElement('div');root.id='v4hg';
  const base=(VAL[id]||1)*mmult(id)*(1+.01*L('trade'));
  root.innerHTML='<div class="box"><div class="npc">'+icon('spr:'+npc.ic)+'</div><b>'+npc.n+'</b><div class="say">'+npc.say[rnd(0,npc.say.length-1)]+'</div><div>Selling <b>'+qty+' × '+nm(id)+'</b> · fair price ≈ <b>'+Math.round(base*qty)+'</b></div><div class="v4pb" id="v4pb">'+segs.map(s=>'<i style="width:'+(s[2]*100)+'%;background:'+s[3]+'">'+(s[2]>.1?s[0]:'')+'</i>').join('')+'<span class="nd" id="v4nd"></span></div><button class="btn full" id="v4hgo">Strike the deal!</button></div>';
  document.body.appendChild(root);
  let p=0,dir=1,raf=0,last=0,done=false;const nd=root.querySelector('#v4nd');
  const loop=ts=>{if(done)return;const dt=Math.min(.05,(ts-(last||ts))/1000);last=ts;p+=dir*dt*(105+L('trade')*1.5);if(p>=100){p=100;dir=-1}if(p<=0){p=0;dir=1}nd.style.left=p+'%';raf=requestAnimationFrame(loop)};
  raf=requestAnimationFrame(loop);
  root.querySelector('#v4hgo').onclick=()=>{
    if(done)return;done=true;cancelAnimationFrame(raf);
    let acc=0,seg=segs[segs.length-1];for(const s of segs){acc+=s[2]*100;if(p<=acc){seg=s;break}}
    const total=Math.round(base*seg[1]*qty);
    S.inv[id]=inv(id)-qty;S.coins+=total;addXp('trade',3+qty+(seg[1]>=1.25?4:0));
    root.querySelector('.say').innerHTML='<b style="color:'+seg[3]+'">'+seg[0]+'!</b> Sold for <b style="color:#ffd84d">'+total+'</b> coins.';
    try{seg[1]>=1.25?SFX.win():seg[1]<.8?SFX.err():SFX.coin()}catch(_){}
    root.querySelector('#v4hgo').textContent='Done';root.querySelector('#v4hgo').onclick=()=>{root.remove();save();render()};
  };
}
$('pane').addEventListener('click',e=>{
  const b=e.target.closest('[data-v4]');if(!b)return;const a=b.dataset.v4,i=b.dataset.i;
  if(a==='tmode'){S.tmode=i;save();render()}
  else if(a==='sell')haggle(i,+b.dataset.q);
  else if(a==='deliver'){const c=S.contracts.find(x=>x.id===i);if(!c||inv(c.item)<c.qty)return;S.inv[c.item]=inv(c.item)-c.qty;S.coins+=c.reward;addXp('trade',10+c.qty*2);S.contracts=S.contracts.filter(x=>x!==c);try{SFX.win()}catch(_){}note('text','📜 Contract complete for <b>'+c.who+'</b>.',0,'#ffd778');save();render()}
});
setInterval(()=>{
  document.querySelectorAll('.v4kt').forEach(el=>{const c=(S.contracts||[]).find(x=>x.id===el.dataset.id);if(c)el.textContent=kLeft(c)});
  if(S.tab==='trade'&&S.tmode==='market'&&!document.getElementById('v4hg')&&Date.now()%20000<1000)render();
},1000);
V4.WS=WS;


/* ================= part G · living farm and barn ================= */
const stg2=document.createElement('style');
stg2.textContent=`
 .v4wx{display:flex;align-items:center;gap:9px;border:1px solid #6d9c83;border-radius:13px;padding:8px 11px;margin:5px 0 9px;font-size:12px;background:linear-gradient(110deg,#143b35,#173047 72%,#101d2a);position:relative;overflow:hidden;box-shadow:inset 0 0 0 1px #d8ffe31a,0 3px 12px #0003;min-height:48px}
.v4wx:before{content:'';position:absolute;inset:0;pointer-events:none;opacity:.32;background:radial-gradient(circle at 8% 50%,#fff8,transparent 27%),linear-gradient(90deg,transparent,#b8ffe311,transparent);background-size:100% 100%,200% 100%;animation:wxSheen 6s linear infinite}
.v4wx .g{font-size:25px;line-height:1;filter:drop-shadow(0 2px 3px #0005);z-index:1}.v4wx div{position:relative;z-index:1}.v4wx b{font-size:13px;color:#f8f1d6}.v4wx small{margin-left:auto;color:#ffe19a;font-weight:800;white-space:nowrap;position:relative;z-index:1}
.v4wx.k-clear{border-color:#e7c56d;background:linear-gradient(110deg,#554119,#31523e 75%,#1b3440)}
.v4wx.k-drizzle{border-color:#78c7e9;background:linear-gradient(110deg,#1e536b,#235b5a 75%,#17334a)}
.v4wx.k-mist{border-color:#a6c9cb;background:linear-gradient(110deg,#354e60,#345b58 75%,#1b3445)}
.v4wx.k-breeze{border-color:#8fd49b;background:linear-gradient(110deg,#21543e,#285a55 75%,#17374a)}
@keyframes wxSheen{0%{background-position:0 0,160% 0}100%{background-position:0 0,-160% 0}}
#grid{position:relative;overflow:hidden}
#grid.wx-drizzle:after{content:'';position:absolute;inset:0;z-index:5;pointer-events:none;border-radius:12px;background:repeating-linear-gradient(108deg,transparent 0 22px,#c7edff44 22px 23px),linear-gradient(180deg,#3f9ac21b,#c2eaff05);background-size:100% 100%;animation:wxDrizzle .9s linear infinite}
@keyframes wxDrizzle{to{background-position:-22px 20px}}
#grid.wx-clear:before{content:'';position:absolute;inset:0;z-index:5;pointer-events:none;border-radius:12px;background:radial-gradient(circle at 88% -6%,#ffe99b55,transparent 48%)}
#grid.wx-mist:before{content:'';position:absolute;inset:0;z-index:5;pointer-events:none;border-radius:12px;background:linear-gradient(110deg,transparent,#d9f5e31e,transparent);background-size:200% 100%;animation:wxMist 8s ease-in-out infinite alternate}
@keyframes wxMist{to{background-position:100% 0}}
#grid.wx-breeze:before{content:'';position:absolute;inset:0;z-index:5;pointer-events:none;border-radius:12px;background:repeating-linear-gradient(0deg,transparent 0 34px,#d7f9cf16 34px 35px);animation:wxWind 5s linear infinite}
@keyframes wxWind{to{background-position:0 -35px}}
.v4bar{position:relative;z-index:6;display:flex;gap:7px;margin:2px 0 8px;padding:5px;border:1px solid #d0ae64;border-radius:12px;background:linear-gradient(100deg,#182f26,#253c30);box-shadow:0 3px 9px #0003}
.v4bar .btn{flex:1;min-width:0;padding:9px 5px;font-size:12px;border-radius:9px;white-space:normal;line-height:1.15}
@media(max-width:430px){.v4bar{gap:4px;padding:4px}.v4bar .btn{font-size:10px;padding:8px 3px}}
.v4bd{position:absolute;left:3px;top:3px;display:flex;gap:2px;z-index:4;pointer-events:none}
.v4bd .ic{width:20px;height:20px;filter:drop-shadow(0 1px 2px #000)}
.v4bd .hr{font-size:15px;line-height:20px;text-shadow:0 1px 2px #000}
.v4bd .bang{background:#e03a3a;color:#fff;border:1px solid #fff;border-radius:10px;min-width:18px;height:18px;font:800 12px/16px sans-serif;text-align:center;animation:v4tw 1s infinite}
.plot.pest{box-shadow:0 0 0 3px #e03a3a,0 0 14px #e03a3a!important;animation:v4pst .5s infinite alternate}
@keyframes v4pst{from{transform:translateX(-1px)}to{transform:translateX(1px)}}
.plot.baby .e svg{transform:scale(.62);transform-origin:50% 90%}
.v4crow{position:fixed;z-index:90;width:46px;height:46px;pointer-events:none;animation:v4fly .9s ease-in forwards}
@keyframes v4fly{to{transform:translate(160px,-220px) scale(.4) rotate(25deg);opacity:0}}
#v4si,#v4bi{border:2px solid var(--line);border-radius:12px;background:var(--card);padding:8px 10px;margin:6px 0;font-size:12px}
#v4si .row,#v4bi .row{display:flex;gap:10px;align-items:center}#v4si .ic,#v4bi .hd .ic{width:44px;height:44px;flex:none}
#v4bi .bars{display:grid;grid-template-columns:auto 1fr;gap:3px 8px;align-items:center;margin:6px 0}
#v4bi .mb{height:9px;border-radius:5px;background:#0008;overflow:hidden;border:1px solid #fff3}#v4bi .mb i{display:block;height:100%}
#v4bi .acts{display:flex;flex-wrap:wrap;gap:6px}#v4bi .acts .btn{padding:7px 10px;font-size:12px}
.v4bd .hr{pointer-events:none}
`;
document.head.appendChild(stg2);
const nowMs=()=>Date.now();
/* ---------- weather ---------- */
const WXI={
  clear:['☀️','Clear Skies','Bright light gently speeds crop growth by 8%'],
  drizzle:['🌦️','Gentle Drizzle','Waters growing crops and gives them a small growth boost'],
  mist:['🌫️','Fertile Morning Mist','Keeps pests away and supports steady growth'],
  breeze:['🍃','Warm Garden Breeze','Speeds growth by 5% and reduces crow visits']
};
function wxTick(){
  const t=nowMs();
  if(!S.wx||!WXI[S.wx.k]||!Number.isFinite(Number(S.wx.t1))||t>Number(S.wx.t1)){
    const pool=['clear','clear','clear','drizzle','drizzle','mist','mist','breeze'];
    let k=pool[rnd(0,pool.length-1)];
    if(S.wx&&WXI[S.wx.k]&&k===S.wx.k)k=pool[(pool.indexOf(k)+3)%pool.length]||'clear';
    S.wx={k,t0:t,t1:t+(240+rnd(0,180))*1000};
    if(k==='drizzle'){
      S.plots.forEach(p=>{
        if(p.open&&p.c>=0&&prog(p)<1){
          const remaining=Math.max(0,p.d*1000-(t-p.at));
          if(!p.w){p.w=true;p.at-=Math.min(remaining*.16,12000)}
        }
      });
    }
    note('text',WXI[k][0]+' <b>'+WXI[k][1]+'</b>: '+WXI[k][2]+'.',0,k==='drizzle'?'#86d6ff':k==='clear'?'#ffd778':k==='mist'?'#b9d9e6':'#a4edb4');
    save();
  }
  V4.wx=S.wx;
  const growthMs={clear:85,drizzle:35,mist:62,breeze:52}[S.wx.k]||0;
  if(growthMs)S.plots.forEach(p=>{if(p.open&&p.c>=0&&prog(p)<1)p.at-=growthMs});
}/* ---------- crop stage sprites ---------- */
V4.stageIcon=(p,g)=>{
  const ic=CROPS[p.c].ic;if(!ic||!ic.startsWith('spr:'))return g<.5?'sprout':'leaf';
  const key=ic.slice(4),st=g<.34?1:g<.7?2:3,n='g'+st+':'+key;
  if(!P[n]){const sc=[0,.34,.56,.8][st],f=['','grayscale(.5) brightness(.7)','saturate(.75) brightness(.85)','brightness(.95)'][st];
    P[n]=()=>'<g transform="translate(32 60) scale('+sc+') translate(-32 -60)">'+P[ic]().replace('/>',' style="filter:'+f+'"/>')+'</g>'}
  return n;
};
/* ---------- farm: pests, badges, seed info ---------- */
V4.nextPest=nowMs()+100000;
const scareF=()=>Math.max(.2,1-.35*Math.min(1,inv('scarecrow_i'))-.12*Math.min(2,inv('fence'))-.06*(S.up.scare||0));
P['bird:dark']=spf('m_bird','brightness(.3) contrast(1.3)');
function pestTick(){
  const t=nowMs();
  S.plots.forEach((p,i)=>{
    if(!(p.open&&p.c>=0&&p.pest))return;
    if(prog(p)<1)p.at+=1000;
    if(t>p.pestEnd){const n=CROPS[p.c].n;p.c=-1;p.pest=false;note('text','🐦 Crows ate your <b>'+n+'</b>! Tap infested plots quickly.',0,'#ff8a7a');try{SFX.err()}catch(_){}save();if(S.tab==='farm')render()}
  });
  if(t>V4.nextPest){
    const c=S.plots.filter(p=>p.open&&p.c>=0&&!p.pest&&prog(p)<.9);
    const wx=S.wx&&S.wx.k,wxRisk=wx==='mist'?.38:wx==='breeze'?.68:1;if(c.length&&Math.random()<scareF()*wxRisk){const p=c[rnd(0,c.length-1)];p.pest=true;p.pestEnd=t+75000;note('text','🐦 <b>Crows</b> are attacking a '+CROPS[p.c].n+' plot! Tap it to shoo them.',0,'#ff8a7a')}
    V4.nextPest=t+(130+rnd(0,130))*1000*(wx==='mist'?1.9:wx==='breeze'?1.4:1);
  }
}
function shooCrow(el,i){
  const p=S.plots[i];p.pest=false;
  const r=el.getBoundingClientRect(),c=document.createElement('div');c.className='v4crow';c.innerHTML=icon('bird:dark');c.style.left=(r.left+r.width/2-23)+'px';c.style.top=(r.top+r.height/2-23)+'px';document.body.appendChild(c);setTimeout(()=>c.remove(),950);
  addXp('farm',2);try{SFX.shoo()}catch(_){}save();farmSync();
}
document.addEventListener('click',e=>{
  const b=e.target.closest&&e.target.closest('#grid .plot');if(!b)return;
  const i=[...b.parentNode.children].indexOf(b),p=S.plots[i];
  if(p&&p.pest){e.stopImmediatePropagation();e.preventDefault();shooCrow(b,i)}
},true);
function badge(el){let d=el.querySelector('.v4bd');if(!d){d=document.createElement('span');d.className='v4bd';el.appendChild(d)}return d}
let fkey='';
function farmSync(){
  const g=$('grid');if(!g||S.tab!=='farm')return;
  ['clear','drizzle','mist','breeze'].forEach(k=>g.classList.toggle('wx-'+k,!!S.wx&&S.wx.k===k));
  [...g.children].forEach((el,i)=>{const p=S.plots[i];if(!p)return;
    el.classList.toggle('pest',!!(p.open&&p.c>=0&&p.pest));
    const d=badge(el);const h=(p.open&&p.c>=0&&p.pest?icon('bird:dark'):'')+(p.open&&p.c>=0&&p.w&&prog(p)<1?'<span class="hr" style="color:#6ec1ff">💧</span>':'');
    if(d._h!==h){d._h=h;d.innerHTML=h}});
  const w=$('v4wx');if(w&&S.wx){const left=fmt((S.wx.t1-nowMs())/1000),k=S.wx.k;w.className='v4wx k-'+k;w.innerHTML='<span class="g">'+WXI[k][0]+'</span><div><b>'+WXI[k][1]+'</b><br><span style="color:var(--mute)">'+WXI[k][2]+'</span></div><small>'+left+'</small>'}
  const si=$('v4si'),c=CROPS[S.sel];
  if(si&&c){const gt=Math.round(c.t*Math.max(.2,1-farmGrow()-.08*S.up.can));const key=c.n+L('farm')+S.up.can+S.coins;const html='<div class="row">'+icon(c.ic)+'<div><b>'+c.n+'</b> · needs Farming '+c.l+'<br>Grows in ~'+gt+'s · '+(c.give?'gives '+c.q+' '+nm(c.give):'sells for '+c.sell+' coins')+' · +'+c.xp+' XP · seed '+c.cost+' coins<br><span style="color:var(--mute)">Scarecrows and fences from the Carpenter keep crows away'+(scareF()<1?' (crow risk now '+Math.round(scareF()*100)+'%)':'')+'.</span></div></div>';if(si._k!==html){si._k=html;si.innerHTML=html}}
}
{
  const seeds=$('seeds'),grid=$('grid');
  if(seeds&&!$('v4wx')){const w=document.createElement('div');w.id='v4wx';w.className='v4wx';seeds.parentNode.insertBefore(w,seeds)}
  if(seeds&&!$('v4si')){const d=document.createElement('div');d.id='v4si';seeds.parentNode.insertBefore(d,seeds.nextSibling)}
  const fbar=$('v4fbar');if(fbar&&!fbar.querySelector('[data-q="shoo"]')){fbar.insertAdjacentHTML('beforeend','<button class="btn alt" data-q="shoo">Shoo crows</button>');fbar.addEventListener('click',e=>{if(e.target.closest('[data-q="shoo"]')){let n=0;S.plots.forEach((p,i)=>{if(p.pest){shooCrow($('grid').children[i],i);n++}});if(!n)say('No crows around.')}})}
  const sync=()=>{const on=S.tab==='farm';['v4wx','v4si'].forEach(id=>{const e=$(id);if(e)e.style.display=on?'':'none'})};
  V4.farmSyncShow=sync;
}

/* ---------- barn: mood, hunger, sickness, foxes, breeding ---------- */
const aInfo=p=>ANI[p.t];
function bInit(p){if(p.m==null){p.m=70;p.fe=nowMs()+240000;p.pet=0}}
const hungry=p=>nowMs()>p.fe;
V4.nextFox=nowMs()+150000;
const foxF=()=>Math.max(.2,1-.22*Math.min(2,inv('fence'))-.2*Math.min(1,inv('gate'))-.06*(S.up.scare||0));
function barnTick(){
  const t=nowMs();
  S.barn.forEach((p,i)=>{if(!p)return;bInit(p);
    const stuck=hungry(p)||p.sick||p.fox;
    if(stuck&&aProg(p)<1)p.at+=1000;
    p.m=Math.max(0,Math.min(100,p.m-(hungry(p)?.35:.06)));
    if(hungry(p)&&!V4.seen.has('h'+i+':'+p.fe)){V4.seen.add('h'+i+':'+p.fe);if(i<cap())note('text','🌾 <b>'+aInfo(p).n+'</b> is hungry. Feed it in the Barn.',0,'#ffd778')}
    if(!p.sick&&p.m<25&&Math.random()<.015){p.sick=true;note('text','🤒 <b>'+aInfo(p).n+'</b> fell sick. A Healing Herb will cure it.',0,'#ff8a7a')}
    if(p.fox&&t>p.foxEnd){p.fox=false;p.m=Math.max(0,p.m-35);note('text','🦊 The fox scared your <b>'+aInfo(p).n+'</b>!',0,'#ff8a7a');try{SFX.err()}catch(_){}}
  });
  if(t>V4.nextFox){
    const c=S.barn.map((p,i)=>p&&i<cap()&&!p.fox&&!p.baby?i:-1).filter(i=>i>=0);
    if(c.length>=2&&Math.random()<foxF()){const i=c[rnd(0,c.length-1)],p=S.barn[i];p.fox=true;p.foxEnd=t+60000;note('text','🦊 A <b>fox</b> is sneaking up on your '+aInfo(p).n+'! Tap the stall to scare it away.',0,'#ff8a7a')}
    V4.nextFox=t+(160+rnd(0,160))*1000;
  }
}
const moodCol=m=>m>=70?'#7dff6a':m>=40?'#ffd84d':'#ff6a6a';
function barnSync(){
  const g=$('bgrid');if(!g||S.tab!=='barn')return;
  [...g.children].forEach((el,i)=>{const p=S.barn[i];if(!p||i>=cap()){const d=el.querySelector('.v4bd');if(d)d.innerHTML='';el.classList.remove('baby','pest');return}
    bInit(p);el.classList.toggle('baby',!!p.baby);el.classList.toggle('pest',!!p.fox);el.classList.toggle('on',S.bsel===i);
    const h='<span class="hr" style="color:'+moodCol(p.m)+'">♥</span>'+(hungry(p)?'<span class="hr">🌾</span>':'')+(p.sick?'<span class="hr">🤒</span>':'')+(p.fox?'<span class="bang">!</span>':'');
    const d=badge(el);if(d._h!==h){d._h=h;d.innerHTML=h}});
  const bi=$('v4bi');if(!bi)return;
  const p=S.barn[S.bsel];
  if(!p||S.bsel>=cap()){const k='none'+S.barn.filter(Boolean).length;if(bi._k!==k){bi._k=k;bi.innerHTML='<b>Barn</b> · '+S.barn.filter(Boolean).length+' animals. Tap a stall to buy or select an animal, then care for it here. Happy animals give bonus produce.'}return}
  const a=aInfo(p),left=Math.max(0,Math.ceil(p.d*(1-aProg(p)))),hl=Math.max(0,Math.round((p.fe-nowMs())/1000));
  const stat=p.baby?'Baby · grows up in '+fmt(left):p.sick?'Sick — produces nothing':p.fox?'Fox nearby! Scare it away':hungry(p)?'Hungry — production paused':aProg(p)>=1?'Ready to collect!':'Next produce in '+fmt(left);
  const pairs=S.barn.filter((q,j)=>q&&q.t===p.t&&j<cap()).length,free=S.barn.findIndex((q,j)=>!q&&j<cap());
  const key=[S.bsel,p.t,Math.floor(p.m/5),hungry(p),p.sick,p.fox,p.baby,stat,hl>>3,inv('hay'),inv('herb'),pairs,free].join('|');
  if(bi._k===key)return;bi._k=key;
  bi.innerHTML='<div class="row hd">'+mon(ANIART[a.id],'ic')+'<div style="flex:1"><b>'+a.n+(p.baby?' (baby)':'')+'</b><br>'+stat+'</div></div>'
   +'<div class="bars"><span>Mood</span><div class="mb"><i style="width:'+p.m+'%;background:'+moodCol(p.m)+'"></i></div><span>Fed</span><div class="mb"><i style="width:'+Math.min(100,hl/2.4)+'%;background:#d9a85a"></i></div></div>'
   +'<div class="acts"><button class="btn alt" data-v4b="feed">Feed ('+(inv('hay')>0?'1 hay':'3 coins')+')</button><button class="btn alt" data-v4b="pet">Pet</button>'
   +(p.sick?'<button class="btn" data-v4b="cure">Cure (1 herb)</button>':'')+(p.fox?'<button class="btn" data-v4b="shoo">Scare fox</button>':'')
   +(!p.baby&&pairs>=2&&free>=0?'<button class="btn alt" data-v4b="breed">Breed ('+Math.ceil(a.cost*.5)+' coins + 2 hay)</button>':'')
   +'<button class="btn alt" data-v4b="sell">Sell ('+Math.floor(a.cost*.5)+')</button></div>';
}
{
  const bgrid=$('bgrid'),bbar=$('v4bbar');
  if(bbar&&!$('v4bi')){const d=document.createElement('div');d.id='v4bi';bbar.parentNode.insertBefore(d,bbar.nextSibling)}
  document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('#bgrid .plot');if(!b)return;
    const i=[...b.parentNode.children].indexOf(b),p=S.barn[i];S.bsel=i;
    if(p&&p.fox&&i<cap()){e.stopImmediatePropagation();e.preventDefault();p.fox=false;addXp('barn',3);try{SFX.shoo()}catch(_){}note('text','🦊 You scared the fox away from your <b>'+aInfo(p).n+'</b>.',0,'#7dffb0');save();barnSync();return}
    setTimeout(barnSync,30)},true);
  const _ts=tapStall;
  tapStall=function(i){
    const p=S.barn[i];
    if(p&&i<cap()&&p.baby){if(aProg(p)>=1){p.baby=false;p.at=nowMs();p.d=aDur(aInfo(p));note('text','🐣 Your baby <b>'+aInfo(p).n+'</b> grew up!',0,'#7dffb0');save();render();return}say('The baby is still growing.');return}
    const ready=p&&i<cap()&&aProg(p)>=1&&!p.sick&&!hungry(p);
    if(p&&i<cap()&&aProg(p)>=1&&(p.sick||hungry(p))){say('Feed or cure the animal before collecting.');try{SFX.err()}catch(_){}return}
    const m=p?p.m:0;
    _ts(i);
    if(ready&&m>=80&&Math.random()<.3){const id=aInfo(p).give[0];S.inv[id]=inv(id)+1;note('text','💛 A happy animal gave a bonus item.',0,'#ffd778')}
  };
  const act=a=>{const p=S.barn[S.bsel];if(!p)return;bInit(p);const n=aInfo(p).n;
    if(a==='feed'){if(inv('hay')>0)S.inv.hay=inv('hay')-1;else if(S.coins>=3)S.coins-=3;else{say('You need 1 hay or 3 coins.');return}
      p.fe=Math.max(nowMs(),p.fe)+240000;p.fe=Math.min(p.fe,nowMs()+480000);p.m=Math.min(100,p.m+8);try{SFX.eat()}catch(_){}}
    else if(a==='pet'){if(nowMs()-p.pet<15000){say('Give it a moment before petting again.');return}p.pet=nowMs();p.m=Math.min(100,p.m+12);try{SFX.coin()}catch(_){}
      const el=$('bgrid').children[S.bsel];if(el){const c=document.createElement('i');c.className='v4sprk';c.textContent='♥';c.style.cssText='left:40%;top:30%;color:#ff6a8a;--dx:0px;--dy:-30px';el.appendChild(c);setTimeout(()=>c.remove(),700)}}
    else if(a==='cure'){if(inv('herb')<1){say('You need a Healing Herb.');return}S.inv.herb=inv('herb')-1;p.sick=false;p.m=Math.min(100,p.m+15);try{SFX.win()}catch(_){}}
    else if(a==='shoo'){p.fox=false}
    else if(a==='breed'){const an=aInfo(p),free=S.barn.findIndex((q,j)=>!q&&j<cap()),c=Math.ceil(an.cost*.5);
      if(inv('hay')<2||S.coins<c){say('Breeding needs '+c+' coins and 2 hay.');try{SFX.err()}catch(_){}return}
      if(nowMs()<(S.bbr||0)){say('Wait '+fmt(((S.bbr||0)-nowMs())/1000)+' before breeding again.');return}
      S.inv.hay=inv('hay')-2;S.coins-=c;S.bbr=nowMs()+60000;S.barn[free]={t:p.t,at:nowMs(),d:aDur(an)*1.4,baby:true,m:80,fe:nowMs()+240000,pet:0};note('text','🐣 A baby <b>'+an.n+'</b> was born!',0,'#7dffb0');try{SFX.win()}catch(_){}}
    else if(a==='sell'){const an=aInfo(p);S.coins+=Math.floor(an.cost*.5);S.barn[S.bsel]=null;say('Sold the '+an.n+'.')}
    save();render();barnSync();
  };
  const bi=$('v4bi');bi&&bi.addEventListener('click',e=>{const b=e.target.closest('[data-v4b]');if(b)act(b.dataset.v4b)});
}
/* ---------- tickers + hooks ---------- */
setInterval(()=>{if(!$('intro').hidden||document.getElementById('v4cls'))return;wxTick();pestTick();barnTick();farmSync();barnSync();V4.farmSyncShow()},1000);
{const _r6=render;render=function(){const r=_r6.apply(this,arguments);farmSync();barnSync();V4.farmSyncShow();return r}}


/* ===== Imported non-mining skill tree + forestry systems (adapted) ===== */
/* ================================================================
   part G · v5 overhaul
   1) skill tree (no class section, lower percentages, many more nodes)
   2) bars are smelted on a timer, levels spread far apart, slower smithing XP
   3) woodcutting: choose forest + tree type first, new interactive chopping
   4) fishing animations that also run on phones
   ================================================================ */
const nl=k=>(S.sk&&S.sk[k])||0;
const f1=v=>Math.round(v*10)/10;
const ani=(el,kf,opt)=>{try{return el&&el.animate?el.animate(kf,opt):null}catch(_){return null}};
const sfx=n=>{try{SFX[n]&&SFX[n]()}catch(_){}};
const v5style=document.createElement('style');v5style.id='v5css';
v5style.textContent=`
/* ---- skill tree ---- */
.u5-intro{font-size:12px;color:var(--mute);margin:2px 0 6px;line-height:1.45}
.u5-chips{display:flex;gap:6px;overflow-x:auto;padding:2px 0 8px;-webkit-overflow-scrolling:touch}
.u5-chip{flex:0 0 auto;display:flex;flex-direction:column;align-items:center;gap:1px;min-width:76px;padding:6px 8px;border:2px solid var(--line);border-radius:12px;background:var(--card);color:inherit;font:inherit;font-size:11px;cursor:pointer}
.u5-chip .ic{width:26px;height:26px}.u5-chip small{color:var(--mute);font-size:10px}
.u5-chip.on{border-color:#ffd778;box-shadow:0 0 0 1px #ffd77866}
.u5-tl{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#ffd778;margin:6px 0 6px;display:flex;align-items:center;gap:8px}
.u5-tl:after{content:'';flex:1;height:1px;background:linear-gradient(90deg,#ffd77866,transparent)}
.u5-row{display:grid;grid-template-columns:repeat(auto-fit,minmax(175px,1fr));gap:8px}
.u5-link{height:16px;margin:2px auto 0;width:2px;background:linear-gradient(#ffd77899,#ffd77822)}
.u5-n{position:relative;border:2px solid var(--line);border-radius:12px;background:var(--card);padding:8px 9px;display:flex;flex-direction:column;gap:3px}
.u5-n.lock{opacity:.6}.u5-n.maxd{border-color:#ffd778;background:linear-gradient(160deg,#2a2013,#16110a)}
.u5-n .top{display:flex;align-items:center;gap:8px}.u5-n .top .ic{width:30px;height:30px;flex:none}
.u5-n .top b{font-size:13px;line-height:1.15}
.u5-pips{display:flex;gap:3px;flex-wrap:wrap}.u5-pips i{width:11px;height:11px;border-radius:50%;border:2px solid var(--line)}
.u5-pips i.f{background:#ffd778;border-color:#ffd778}
.u5-n .d{font-size:11.5px;color:var(--mute);line-height:1.3}
.u5-n .now{font-size:11.5px;color:#8fe3a2;font-weight:700}
.u5-n .rq{font-size:10.5px;color:#ff8a7a;line-height:1.3}
.u5-n .btn{padding:6px 8px;font-size:12px;margin-top:2px}
.u5-n .btn[disabled]{opacity:.5;cursor:default}
/* ---- woodcutting ---- */
.w5-head h3{margin:6px 0 2px;font-size:18px;color:#ffe0a0}
.w5-fgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:8px;margin:8px 0}
.w5-f{position:relative;overflow:hidden;border:2px solid var(--line);border-radius:14px;min-height:118px;padding:0;color:#fff;font:inherit;text-align:left;cursor:pointer;display:flex;flex-direction:column;justify-content:flex-end;background:#0a1220}
.w5-f .pic{position:absolute;inset:0;background-size:cover;background-position:center}
.w5-f .pic:after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,#0000 10%,#000d 100%)}
.w5-f .tx{position:relative;padding:8px 10px;display:flex;flex-direction:column;gap:2px}
.w5-f b{font-size:15px;text-shadow:0 1px 3px #000}
.w5-f .ty{font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:#ffe0a0}
.w5-f small{font-size:11px;color:#e6efe0;text-shadow:0 1px 2px #000;line-height:1.3}
.w5-f.on{border-color:#ffd778;box-shadow:0 0 0 2px #ffd77866,0 0 16px #ffc75b55}
.w5-f.lk{cursor:default}.w5-f.lk .pic{filter:grayscale(.9) brightness(.5)}
.w5-f .lv{position:absolute;right:8px;top:8px;z-index:1;font-size:11px;font-weight:800;background:#000a;border:1px solid #ffd77888;border-radius:8px;padding:2px 7px}
.w5-sel{border:2px solid #8a7049;border-radius:14px;background:linear-gradient(145deg,#2a2013,#16110a);padding:10px;margin:6px 0}
.w5-sel h4{margin:0 0 2px;font-size:15px;color:#ffe0a0}.w5-sel p{margin:0 0 8px;font-size:12px;color:var(--mute)}
.w5-sps{display:grid;grid-template-columns:repeat(auto-fill,minmax(112px,1fr));gap:6px;margin-bottom:10px}
.w5-sp{display:flex;align-items:center;gap:6px;text-align:left;border:2px solid var(--line);border-radius:10px;background:var(--card);color:inherit;font:inherit;font-size:12px;padding:5px 7px;cursor:pointer}
.w5-sp .ic{width:28px;height:28px;flex:none}.w5-sp small{display:block;color:var(--mute);font-size:10px}
.w5-sp.on{border-color:#ffd778;box-shadow:0 0 0 1px #ffd77866}.w5-sp.lk{opacity:.45;cursor:default}
.w5-bar{display:flex;align-items:center;gap:8px;margin:6px 0}
.w5-bar .info{flex:1;min-width:0;font-size:12px;color:var(--mute)}.w5-bar .info b{color:#ffe0a0}
.w5-bar .btn{padding:6px 10px;font-size:12px}
.w5-stage{position:relative;height:360px;border:3px solid #8a7049;border-radius:18px;overflow:hidden;background:#0a1220;touch-action:manipulation;-webkit-user-select:none;user-select:none;cursor:pointer;isolation:isolate;box-shadow:0 10px 28px #0006}
.w5-bg{position:absolute;inset:0;background-size:cover;background-position:center;z-index:0}
.w5-bg:after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,#07101d10 0%,#07101d30 55%,#07101d88 100%)}
.w5-rays{position:absolute;inset:0;z-index:1;pointer-events:none;background:linear-gradient(110deg,transparent 18%,#fff3b022 30%,transparent 42%,#fff3b016 56%,transparent 68%)}
.w5-amb{position:absolute;inset:0;z-index:2;pointer-events:none;overflow:hidden}
.w5-leaf{position:absolute;width:9px;height:6px;border-radius:50% 0;top:-10px;pointer-events:none}
.w5-hpbar{position:absolute;left:25%;right:25%;top:10px;height:12px;border-radius:7px;background:#0008;border:2px solid #241a35;overflow:hidden;z-index:5}
.w5-hpbar i{display:block;height:100%;background:linear-gradient(#7fe08a,#2f9b5a);transition:width .15s}
.w5-name{position:absolute;top:28px;left:0;right:0;text-align:center;color:#fff;font-weight:800;text-shadow:0 1px 3px #000;font-size:13px;z-index:5;pointer-events:none}
.w5-tree{position:absolute;left:50%;bottom:6px;width:210px;height:250px;margin-left:-105px;transform-origin:50% 100%;z-index:3;pointer-events:none}
.w5-tree svg{width:100%;height:100%;overflow:visible}
.w5-notches{position:absolute;inset:0;pointer-events:none}
.w5-notch{position:absolute;height:9px;border-radius:2px;background:linear-gradient(#2b1608,#8a5a2a 60%,#d9a868);box-shadow:inset 0 1px 2px #000a}
.w5-tgt{position:absolute;width:52px;height:52px;margin:-26px 0 0 -26px;pointer-events:none;z-index:6;display:none}
.w5-tgt:before{content:'';position:absolute;inset:14px;border-radius:50%;background:radial-gradient(circle,#fff,#ffd84d 60%,#ff8a1a);box-shadow:0 0 10px #ffd84d}
.w5-tgt .rg{position:absolute;inset:0;border-radius:50%;border:3px solid #fff;box-shadow:0 0 8px #fff;transform:scale(2.4)}
.w5-tgt .rg.go{border-color:#7dffb0;box-shadow:0 0 14px #7dffb0}
.w5-axe{position:absolute;right:6%;bottom:44px;width:120px;height:120px;transform:scaleX(-1) rotate(-12deg);transform-origin:80% 90%;pointer-events:none;z-index:7;filter:drop-shadow(0 4px 4px #0008)}
.w5-axe .ic{width:100%;height:100%}
.w5-streak{position:absolute;left:8px;top:40px;font-weight:900;font-size:13px;color:#ffd84d;text-shadow:0 2px 3px #000;z-index:6;pointer-events:none;line-height:1.35}
.w5-msg{position:absolute;left:0;right:0;bottom:8px;text-align:center;font-size:12px;color:#fff;text-shadow:0 1px 3px #000;z-index:6;pointer-events:none;padding:0 8px}
.w5-nest{position:absolute;z-index:8;width:46px;height:46px;margin:-23px 0 0 -23px;border:0;background:none;padding:0;cursor:pointer}
.w5-nest:before{content:'';position:absolute;inset:-5px;border-radius:50%;border:2px dashed #ffe9a8}
.w5-nest svg{width:100%;height:100%;filter:drop-shadow(0 2px 3px #000)}
.w5-dodge{position:absolute;z-index:8;left:10px;bottom:46px;padding:12px 18px;font:inherit;font-weight:900;border:3px solid #fff;border-radius:14px;background:#d6334f;color:#fff;font-size:16px;box-shadow:0 4px 0 #6a0f20;cursor:pointer}
.w5-warn{position:absolute;z-index:6;left:0;right:0;top:50px;text-align:center;font-weight:900;font-size:18px;color:#ff6b6b;text-shadow:0 2px 4px #000;pointer-events:none}
.w5-shadow{position:absolute;bottom:12px;width:70px;height:14px;border-radius:50%;background:#000b;z-index:2;pointer-events:none;margin-left:-35px}
.w5-branch{position:absolute;width:90px;height:12px;border-radius:6px;background:linear-gradient(#5a3a1e,#8a5a2a);z-index:7;pointer-events:none;margin-left:-45px;border:2px solid #241a35}
.w5-fx{position:absolute;pointer-events:none;font-weight:900;font-size:20px;color:#fff;text-shadow:0 2px 4px #000;z-index:9;white-space:nowrap}
.w5-fx.crit{color:#ffd84d;font-size:26px}
.w5-ban{position:absolute;left:0;right:0;text-align:center;font-weight:900;font-size:34px;color:#ffd84d;text-shadow:0 3px 0 #5a2a00,0 0 10px #000;z-index:9;pointer-events:none;letter-spacing:2px}
.w5-chip{position:absolute;width:8px;height:5px;border-radius:2px;pointer-events:none;z-index:6}
.w5-dust{position:absolute;width:26px;height:18px;border-radius:50%;background:#d9c7a0;opacity:.7;pointer-events:none;z-index:4}
.w5-log{position:absolute;width:34px;height:34px;pointer-events:none;z-index:9}.w5-log .ic{width:100%;height:100%}
.w5-enter{position:absolute;inset:0;z-index:20;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#050b14;color:#ffe0a0;text-align:center;pointer-events:none}
.w5-enter b{font-size:24px;letter-spacing:1px}.w5-enter small{color:#b9d2e3;margin-top:4px}
.w5-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0}
.w5-stats div{border:1px solid var(--line);border-radius:10px;background:var(--card);text-align:center;padding:5px 2px;font-size:10px;color:var(--mute)}
.w5-stats b{display:block;font-size:15px;color:var(--ink)}
.w5-logs{display:flex;flex-wrap:wrap;gap:6px}
.w5-logs span{display:inline-flex;align-items:center;gap:4px;font-size:11px;padding:3px 7px;border-radius:8px;background:#0006;border:1px solid var(--line)}
.w5-logs .ic{width:20px;height:20px}
/* ---- smelter ---- */
.s5-furn{border:2px solid #8a7049;border-radius:12px;background:linear-gradient(135deg,#2a2013,#16110a);padding:8px 10px;margin:6px 0;font-size:12px}
.s5-furn b{color:#ffe0a0}
.smelt-row .rec[disabled],.smelt-row .btn[disabled]{opacity:.5}
`;
document.head.appendChild(v5style);

/* ================= 1) SKILL TREE ================= */
/* every old upgrade keeps its hook in the game code; the proxy below rescales
   the old per-level coefficient to the new (smaller) one and adds up related nodes */
const HOOK={can:.08,fert:.06,scare:.04,plow:.08,trough:.1,stalls:1,brush:.06,bin:.08,rod:.04,bait:.08,lure:.25,tongs:.07,bellows:.06,furnace:.04,cauldron:.08,alembic:.2,pouch:.08,charm:3,boots:.06,whet:.08,vigor:10,plating:.04,fury:.06,pierce:.05,regen:.4,wagon:.1,horse:.08,guard:.03,ledger:.03,ring:.08,axeup:.08,sawup:.06};
const ND=(k,br,tier,n,ic,col,per,fm,max,cost,req,o)=>Object.assign({k,br,tier,n,ic,col,per,fm,max,cost,req:req||[]},o||{});
const NODES=[
 /* Farming */
 ND('can','farm',1,'Watering Can','can',null,3,'+{v}% crop growth speed',5,40,[],{hook:'can',hp:.03}),
 ND('fert','farm',1,'Fertile Soil','sprout',null,2,'+{v}% double-harvest chance',5,50,[],{hook:'fert',hp:.02}),
 ND('scare','farm',2,'Scarecrow','sprout','#d9b25a',1.5,'+{v}% crop sale value',5,70,[['fert',2]],{hook:'scare',hp:.015}),
 ND('plow','farm',2,'Plow and Hoe','pick','#c9d6e4',3,'-{v}% plot unlock cost',4,80,[['can',2]],{hook:'plow',hp:.03}),
 ND('farmxp','farm',2,'Farmer’s Almanac','book-open','#c9b8ff',2,'+{v}% Farming XP',5,60,[['can',1],['fert',1]],{xp:'farm'}),
 ND('greenthumb','farm',3,'Green Thumb','herb','#6fd45a',1.5,'+{v}% double-harvest chance',3,220,[['scare',2],['farmxp',2]],{hook:'fert',hp:.015,pts:8}),
 /* Husbandry */
 ND('trough','barn',1,'Feed Trough','milk',null,3.5,'+{v}% animal production speed',5,50,[],{hook:'trough',hp:.035}),
 ND('stalls','barn',1,'Extra Stall','egg',null,1,'+{v} barn stall',8,120,[],{hook:'stalls',hp:1,cs:1.55}),
 ND('brush','barn',2,'Grooming Brush','wool',null,2,'+{v}% double-goods chance',5,70,[['trough',2]],{hook:'brush',hp:.02}),
 ND('bin','barn',2,'Compost Bin','manure',null,3,'+{v}% manure chance',4,55,[['trough',1]],{hook:'bin',hp:.03}),
 ND('barnxp','barn',2,'Animal Lore','book-open','#c9b8ff',2,'+{v}% Husbandry XP',5,60,[['trough',1]],{xp:'barn'}),
 ND('pampered','barn',3,'Pampered Herd','milk','#ffe9a8',1.5,'+{v}% double-goods chance',3,220,[['brush',2],['stalls',2]],{hook:'brush',hp:.015,pts:8}),
 /* Fishing */
 ND('rod','fish',1,'Better Rod','rod',null,1.6,'+{v}% extra-fish chance, slightly longer bite window',5,45,[],{hook:'rod',hp:.016}),
 ND('bait','fish',1,'Fine Bait','bobber',null,3,'-{v}% wait for a bite',5,50,[],{hook:'bait',hp:.03}),
 ND('lure','fish',2,'Shiny Lure','fish',null,2.5,'+{v}% big-fish luck',5,65,[['rod',1]],{hook:'lure',hp:.1}),
 ND('fishxp','fish',2,'Angler’s Tales','book-open','#c9b8ff',2,'+{v}% Fishing XP',5,55,[['rod',1]],{xp:'fish'}),
 ND('deepsea','fish',3,'Deep-Sea Tackle','fish','#8cb5e6',2.5,'+{v}% big-fish luck',3,200,[['lure',2],['bait',2]],{hook:'lure',hp:.1,pts:7}),

 /* Woodcutting */
 ND('axeup','wood',1,'Sharp Axe','axe','#c9d6e4',3,'trees have {v}% less HP',5,45,[],{hook:'axeup',hp:.03}),
 ND('sawup','wood',1,'Bow Saw','hammer','#b8803f',2.5,'+{v}% bonus-log chance',5,60,[],{hook:'sawup',hp:.025}),
 ND('woodxp','wood',2,'Forester’s Lore','book-open','#c9b8ff',2,'+{v}% Woodcutting XP',5,60,[['axeup',1]],{xp:'wood'}),
 ND('steady','wood',2,'Steady Swing','axe','#7dffb0',3,'the swing ring closes {v}% slower',4,80,[['axeup',2]]),
 ND('forester','wood',2,'Bird-Watcher','feather',null,4,'+{v}% nest chance, richer nests',4,80,[['sawup',1]]),
 ND('heartwood','wood',3,'Heartwood Strike','axe','#ffd84d',4,'+{v}% damage on perfect hits',3,240,[['steady',2],['sawup',2]],{pts:7}),
 /* Smithing */
 ND('tongs','smith',1,'Tongs','hammer','#c9d6e4',2.5,'recipes use {v}% less material',5,70,[],{hook:'tongs',hp:.025}),
 ND('bellows','smith',1,'Bellows','anvil',null,2,'+{v}% chance of a bonus item',5,80,[],{hook:'bellows',hp:.02}),
 ND('furnace','smith',2,'Forge Craft','ingot','#ff9a3d',1.5,'+{v}% gear sale value',5,90,[['tongs',2]],{hook:'furnace',hp:.015}),
 ND('smeltspeed','smith',2,'Hot Coals','ingot','#ff9a3d',3,'-{v}% smelting time',5,85,[['tongs',1]]),
 ND('forgespeed','smith',2,'Quick Hands','hammer','#ff9a3d',3,'-{v}% forging time',5,85,[['bellows',1]]),
 ND('smithxp','smith',2,'Apprentice Notes','book-open','#c9b8ff',2,'+{v}% Blacksmithing XP',5,70,[['tongs',1],['bellows',1]],{xp:'smith'}),
 ND('masterwork','smith',3,'Masterwork','anvil','#ffd84d',1.5,'+{v}% chance of a bonus item',3,250,[['furnace',2],['forgespeed',2]],{hook:'bellows',hp:.015,pts:9}),
 /* Alchemy */
 ND('cauldron','alch',1,'Better Cauldron','cauldron',null,3,'+{v}% double-brew chance',5,70,[],{hook:'cauldron',hp:.03}),
 ND('alembic','alch',1,'Alembic','flask','#7ad8ff',8,'+{v}% potion duration',5,60,[],{hook:'alembic',hp:.08}),
 ND('pouch','alch',2,'Herb Pouch','sack','#b8803f',3,'+{v}% chance to keep ingredients',5,80,[['cauldron',2]],{hook:'pouch',hp:.03}),
 ND('alchxp','alch',2,'Recipe Notes','book-open','#c9b8ff',2,'+{v}% Alchemy XP',5,60,[['alembic',1]],{xp:'alch'}),
 ND('elixir','alch',3,'Elixir Mastery','potion','#ff6b8a',2,'+{v}% double-brew chance',3,230,[['pouch',2],['alchxp',2]],{hook:'cauldron',hp:.02,pts:7}),
 /* Combat */
 ND('whet','fight',1,'Whetstone','sword','#c9d6e4',3,'+{v}% damage',5,55,[],{hook:'whet',hp:.03}),
 ND('vigor','fight',1,'Vitality','potion','#ff6b8a',4,'+{v} max HP',5,55,[],{hook:'vigor',hp:4}),
 ND('boots','fight',1,'Swift Boots','boots',null,2,'+{v}% attack speed',5,50,[],{hook:'boots',hp:.02}),
 ND('fury','fight',2,'Battle Fury','sword','#ff9a3d',2,'+{v}% damage',5,90,[['whet',2]],{hook:'fury',hp:.02}),
 ND('charm','fight',2,'Lucky Charm','charm',null,1,'+{v}% critical chance',5,60,[['whet',1]],{hook:'charm',hp:1}),
 ND('plating','fight',2,'Padded Armor','armor','#c9d6e4',1.5,'+{v}% defense',5,65,[['vigor',1]],{hook:'plating',hp:.015}),
 ND('regen','fight',2,'Second Wind','herb','#6fd45a',.15,'+{v} HP/s while fighting',4,90,[['vigor',2]],{hook:'regen',hp:.15}),
 ND('combatxp','fight',2,'War Stories','book-open','#c9b8ff',2,'+{v}% Adventuring XP',5,60,[['boots',1]],{xp:'combat'}),
 ND('keen','fight',3,'Keen Edge','rapier','#fff',.8,'+{v}% critical chance',4,150,[['charm',2]],{hook:'charm',hp:.8,pts:9}),
 ND('pierce','fight',3,'Armor Piercer','rapier','#fff',2,'+{v}% chance a hit ignores armor',4,160,[['fury',2]],{hook:'pierce',hp:.02,pts:9}),
 ND('ironwill','fight',3,'Iron Will','potion','#ffcc33',3,'+{v} max HP',4,150,[['plating',2]],{hook:'vigor',hp:3,pts:9}),
 ND('quick','fight',3,'Light Feet','boots','#7dffb0',1.5,'+{v}% attack speed',4,150,[['boots',2]],{hook:'boots',hp:.015,pts:9}),
 /* Trade */
 ND('wagon','trade',1,'Bigger Wagon','wagon',null,4,'+{v}% caravan loot and +{v} cargo space',5,60,[],{hook:'wagon',hp:.04}),
 ND('ring','trade',1,'Merchant’s Ring','ring',null,2.5,'+{v}% coins from sales and loot',5,80,[],{hook:'ring',hp:.025}),
 ND('horse','trade',2,'Fast Horse','boots',null,3,'caravans return {v}% faster',4,70,[['wagon',1]],{hook:'horse',hp:.03}),
 ND('guard','trade',2,'Caravan Guard','sword','#c9d6e4',1.2,'-{v}% bandit chance',4,80,[['wagon',2]],{hook:'guard',hp:.012}),
 ND('ledger','trade',2,'Ledger','coin',null,1.2,'+{v}% caravan coins',5,90,[['ring',2]],{hook:'ledger',hp:.012}),
 ND('tradexp','trade',2,'Market Savvy','book-open','#c9b8ff',2,'+{v}% Trading XP',5,60,[['ring',1]],{xp:'trade'}),
 ND('scholar','trade',2,'Quick Study','core','#b36bff',.8,'+{v}% XP in every skill',5,150,[['ring',1]],{xp:'*'}),
 ND('tycoon','trade',3,'Tycoon','ring','#ffd84d',2,'+{v}% coins from sales and loot',3,260,[['ledger',2],['horse',2]],{hook:'ring',hp:.02,pts:9})
];
const NMAP=Object.fromEntries(NODES.map(n=>[n.k,n]));
const BR=[
 {id:'farm',n:'Farming',ic:'sprout',col:null},{id:'barn',n:'Husbandry',ic:'egg',col:null},{id:'fish',n:'Fishing',ic:'fish',col:'#8fb3c9'},{id:'wood',n:'Woodcutting',ic:'axe',col:'#b8803f'},{id:'smith',n:'Smithing',ic:'anvil',col:null},
 {id:'alch',n:'Alchemy',ic:'flask',col:'#7ad8ff'},{id:'fight',n:'Combat',ic:'sword',col:'#c9d6e4'},{id:'trade',n:'Trade',ic:'coin',col:null}
];
/* Keep old campaign upgrade data, migrate compatible levels, and expose the new tree
   through S.up without importing or replacing any Mining upgrades. */
const HSRC={};NODES.forEach(n=>{if(n.hook)(HSRC[n.hook]=HSRC[n.hook]||[]).push(n)});
let skillTreeState=null;
const upProxy=new Proxy({},{
  get(_,k){
    if(typeof k!=='string')return undefined;
    if(HOOK[k]!==undefined&&(HSRC[k]||[]).length){let v=0;HSRC[k].forEach(n=>{v+=nl(n.k)*n.hp});return v/HOOK[k]}
    if(NMAP[k])return nl(k);
    const legacy=(skillTreeState&&skillTreeState.__rpgLegacyUp&&typeof skillTreeState.__rpgLegacyUp==='object')?skillTreeState.__rpgLegacyUp:{};
    return Object.prototype.hasOwnProperty.call(legacy,k)?legacy[k]:0;
  },
  set(){return true},has(){return true},ownKeys(){return[]},getOwnPropertyDescriptor(){return undefined}
});
const installSkillTreeState=state=>{
  if(!state||typeof state!=='object'||Array.isArray(state))return state;
  skillTreeState=state;
  const legacy=state.__rpgLegacyUp&&typeof state.__rpgLegacyUp==='object'?state.__rpgLegacyUp:
    (state.up&&typeof state.up==='object'&&!Array.isArray(state.up)?{...state.up}:{});
  if(!state.sk||typeof state.sk!=='object'||Array.isArray(state.sk))state.sk={};
  NODES.forEach(n=>{
    if(!Object.prototype.hasOwnProperty.call(state.sk,n.k)){
      const old=Number(legacy[n.k]);if(Number.isFinite(old)&&old>0)state.sk[n.k]=Math.min(n.max,Math.floor(old));
    }
    const v=Number(state.sk[n.k]);state.sk[n.k]=Number.isFinite(v)?Math.max(0,Math.min(n.max,Math.floor(v))):0;
  });
  state.__rpgLegacyUp=legacy; // enumerable so legacy (including old mining values) survive JSON saves
  Object.defineProperty(state,'up',{value:upProxy,enumerable:false,configurable:true,writable:true});
  if(!BR.some(b=>b.id===state.ubr))state.ubr='farm';
  return state;
};
installSkillTreeState(S);
const xpBonus=k=>{if(k==='mine')return 0;let b=0;NODES.forEach(n=>{if(n.xp&&(n.xp===k||n.xp==='*'))b+=nl(n.k)*n.per/100});return b};
{const _xp5=addXp;addXp=function(k,n){
  if(k==='mine')return _xp5.call(this,k,n);
  const b=xpBonus(k);if(b>0)n=Math.max(1,Math.round(n*(1+b)));
  return _xp5.call(this,k,n)}}
const brPts=id=>NODES.filter(n=>n.br===id).reduce((a,n)=>a+nl(n.k),0);
const nCost=n=>{const l=nl(n.k);return Math.round(n.cost*Math.pow(n.cs||1.55,l)/5)*5||5};
const reqMiss=n=>{const m=[];n.req.forEach(([k,l])=>{if(nl(k)<l)m.push(NMAP[k].n+' Lv '+l)});if(n.pts&&brPts(n.br)<n.pts)m.push(n.pts+' points in this branch (you have '+brPts(n.br)+')');return m};
S.ubr=S.ubr||'farm';
VIEWS.upg=()=>{
  const br=BR.find(b=>b.id===S.ubr)||BR[0],tot=NODES.reduce((a,n)=>a+nl(n.k),0);
  const chips=BR.map(b=>'<button class="u5-chip'+(b.id===br.id?' on':'')+'" data-v5="ubr" data-i="'+b.id+'">'+icon(b.ic,b.col)+'<span>'+b.n+'</span><small>'+brPts(b.id)+' pts</small></button>').join('');
  const tl=['Foundations','Specialties','Mastery'];
  let h='<div class="ttl">Skill tree</div><p class="u5-intro">Spend coins to learn skills. Each skill grows a little with every level, and deeper skills unlock once you have learned the ones they depend on. '+NODES.length+' skills, '+tot+' levels learned.</p><div class="u5-chips">'+chips+'</div>';
  [1,2,3].forEach(t=>{
    const ns=NODES.filter(n=>n.br===br.id&&n.tier===t);if(!ns.length)return;
    if(t>1)h+='<div class="u5-link"></div>';
    h+='<div class="u5-tl">Tier '+['I','II','III'][t-1]+' · '+tl[t-1]+'</div><div class="u5-row">'+ns.map(n=>{
      const l=nl(n.k),miss=reqMiss(n),mx=l>=n.max,cost=nCost(n),can=!mx&&!miss.length&&S.coins>=cost;
      const pips=Array.from({length:n.max},(_,i)=>'<i class="'+(i<l?'f':'')+'"></i>').join('');
      const now=l>0?'Now: '+n.fm.replace(/\{v\}/g,f1(l*n.per)):'Each level: '+n.fm.replace(/\{v\}/g,f1(n.per));
      return '<div class="u5-n'+(miss.length&&!l?' lock':'')+(mx?' maxd':'')+'"><div class="top">'+icon(n.ic,n.col)+'<b>'+n.n+'</b></div><div class="u5-pips">'+pips+'</div><div class="d">'+now+'</div>'
       +(miss.length?'<div class="rq">Needs: '+miss.join(', ')+'</div>':'')
       +(mx?'<button class="btn alt" disabled>Mastered</button>':'<button class="btn'+(can?'':' alt')+'" data-v5="ubuy" data-i="'+n.k+'" '+(miss.length?'disabled':'')+'>'+(l?'Upgrade':'Learn')+' · '+cost+' coins</button>')+'</div>'}).join('')+'</div>';
  });
  return h;
};
function buyNode(k){
  const n=NMAP[k];if(!n)return;const l=nl(k);
  if(l>=n.max)return;if(reqMiss(n).length){say('Learn the skills it depends on first.');sfx('err');return}
  const c=nCost(n);if(S.coins<c){say('You need '+c+' coins.');sfx('err');return}
  S.coins-=c;S.sk[k]=l+1;say(n.n+' is now level '+(l+1)+'.');sfx('lvl');
  if(k==='vigor'||k==='ironwill')S.hp=Math.min(maxHp(),S.hp+(n.hp||0));
  save();render();
}


$('pane').addEventListener('click',e=>{
  const b=e.target.closest('[data-v5]');if(!b||b.disabled)return;
  const a=b.dataset.v5,i=b.dataset.i;
  if(a==='ubr'){S.ubr=i;save();render()}
  else if(a==='ubuy')buyNode(i);
});

/* ================= 3) WOODCUTTING: choose forest + tree, then chop ================= */
const FOR5=[
 {id:'meadow',n:'Meadow Grove',type:'Temperate',l:1,bg:'bg_f1',f:'',t:[['oak',60],['birch',25],['maple',15]],trait:'Calm winds: wider timing window.',ring:1.12,bonus:0,xp:1},
 {id:'pine',n:'Pine Ridge',type:'Conifer',l:4,bg:'bg_f2',f:'',t:[['pine',50],['cedar',30],['birch',20]],trait:'Resin: +4% bonus-log chance.',ring:1,bonus:.04,xp:1},
 {id:'marsh',n:'Willow Marsh',type:'Wetland',l:6,bg:'bg_f4',f:'hue-rotate(35deg) saturate(.9)',t:[['willow',45],['maple',30],['birch',25]],trait:'Swaying branches: the spot drifts. +10% XP.',ring:1,bonus:0,xp:1.1,drift:true},
 {id:'ironwood',n:'Ironwood Hollow',type:'Hardwood',l:9,bg:'bg_f2',f:'sepia(.4) brightness(.8)',t:[['ironwood',40],['cedar',30],['pine',20],['redwood',10]],trait:'Dense timber: tougher trees, +15% XP.',ring:.92,bonus:0,xp:1.15,tough:true},
 {id:'redwood',n:'Redwood Cathedral',type:'Giant',l:12,bg:'bg_f3',f:'sepia(.45) saturate(1.3)',t:[['redwood',55],['cedar',25],['ironwood',20]],trait:'Giants: huge trees, +1 log per fall, +10% XP.',ring:1,bonus:0,xp:1.1,giant:true},
 {id:'elder',n:'Elderwood Depths',type:'Enchanted',l:13,bg:'bg_f3',f:'hue-rotate(230deg) saturate(1.2) brightness(.8)',t:[['elder',45],['redwood',30],['ironwood',25]],trait:'Arcane flickers: the spot teleports. +25% XP, crystals.',ring:.9,bonus:0,xp:1.25,flicker:true,rare:true}
];
{const c=document.createElement('style');c.textContent=['bg_f1','bg_f2','bg_f3','bg_f4'].map(k=>'.w5-'+k+'{background-image:url('+SPR4[k]+')}').join('');document.head.appendChild(c)}
const NEST='<svg viewBox="0 0 40 40"><ellipse cx="20" cy="27" rx="16" ry="9" fill="#7a4a24" stroke="#241a35" stroke-width="2"/><ellipse cx="14" cy="22" rx="4.5" ry="5.5" fill="#cfe8ff" stroke="#241a35" stroke-width="1.5"/><ellipse cx="25" cy="21" rx="4.5" ry="5.5" fill="#f4ead2" stroke="#241a35" stroke-width="1.5"/><path d="M6 28q14 8 28 0" fill="none" stroke="#b88a5a" stroke-width="2"/></svg>';
const W5={st:'pick',fo:(S.w5&&S.w5.f)||'meadow',sp:(S.w5&&S.w5.sp)||'any',tree:null,ring:null,rid:0,streak:0,best:0,frenzy:0,busy:false,stun:0,ev:null,evT:8,raf:0,last:0,fells:0,logs:0,hits:0,perf:0,ambT:0,skip:0,side:1,enter:false};
const foAt=id=>FOR5.find(f=>f.id===id)||FOR5[0];
const foOk=f=>L('wood')>=f.l;
const $s=()=>document.getElementById('w5s');
function pool5(){
  const f=foAt(W5.fo);
  if(W5.sp!=='any'){const t=TR2.find(x=>x.id===W5.sp);if(t&&L('wood')>=t.l&&f.t.some(x=>x[0]===t.id))return[[t,1]]}
  const p=f.t.map(([id,w])=>[TR2.find(x=>x.id===id),w]).filter(([t])=>t&&L('wood')>=t.l);
  return p.length?p:[[TR2[0],1]];
}
function newTree5(){
  const list=pool5();let r=Math.random()*list.reduce((a,x)=>a+x[1],0),t=list[0][0];
  for(const[tt,w]of list){r-=w;if(r<=0){t=tt;break}}
  const f=foAt(W5.fo);
  let hp=t.hp*(f.giant?1.5:1)*(f.tough?1.1:1)*(1-.08*S.up.axeup);
  hp=Math.max(2,Math.round(hp));
  W5.tree={t,hp,max:hp,hits:0,perf:0};W5.ring=null;W5.ev=null;W5.evT=6+Math.random()*6;
}
const w5RingDur=()=>{const f=foAt(W5.fo),t=W5.tree&&W5.tree.t;let d=Math.max(650,1150-L('wood')*9)*f.ring*(1+.03*nl('steady'));
  if(t&&t.id==='ironwood')d*=.88;if(t&&t.id==='elder')d*=.9;if(W5.frenzy>performance.now())d*=1.25;return d};
function w5NewRing(delay){
  const f=foAt(W5.fo),t=W5.tree&&W5.tree.t;
  W5.ring={id:++W5.rid,t0:performance.now()+(delay||0),dur:w5RingDur(),x:78+Math.random()*60,y:70+Math.random()*130,
    drift:!!f.drift||(t&&t.id==='willow'),flick:!!f.flicker||(t&&t.id==='elder'),flicked:false,ph:Math.random()*6.28,used:false,cx:105,cy:130};
}
function pickHTML(){
  const lv=L('wood'),f=foAt(W5.fo);
  const cards=FOR5.map(q=>{const ok=foOk(q);
    return '<button class="w5-f'+(q.id===W5.fo?' on':'')+(ok?'':' lk')+'" data-w5="forest" data-i="'+q.id+'"><span class="pic w5-'+q.bg+'" style="'+(q.f?'filter:'+q.f:'')+'"></span>'+(ok?'':'<span class="lv">Lv '+q.l+'</span>')
     +'<span class="tx"><span class="ty">'+q.type+' forest'+w8Txt(q.id)+'</span><b>'+(ok?'':'🔒 ')+q.n+'</b><small>'+(ok?q.trait:'Reach Woodcutting level '+q.l+' to enter.')+'</small></span></button>'}).join('');
  const sps=[...new Set(f.t.map(x=>x[0]))].map(id=>TR2.find(t=>t.id===id));
  const sp='<button class="w5-sp'+(W5.sp==='any'?' on':'')+'" data-w5="species" data-i="any">'+icon('spr:axe')+'<span><b>Any tree</b><small>Whatever grows here</small></span></button>'
   +sps.map(t=>{const ok=lv>=t.l;return '<button class="w5-sp'+(W5.sp===t.id?' on':'')+(ok?'':' lk')+'" data-w5="species" data-i="'+t.id+'">'+gIcon(t.id,'ic')+'<span><b>'+t.n+'</b><small>'+(ok?'HP '+t.hp+' · XP '+t.xp:'Lv '+t.l)+'</small></span></button>'}).join('');
  return skillBar('wood')+'<div class="w5-head"><h3>Choose your forest</h3><p class="h">Each forest grows different trees and has its own quirk. Pick one, then choose which tree type to hunt.</p></div>'
   +'<div class="w5-fgrid">'+cards+'</div>'
   +'<div class="w5-sel"><h4>'+f.n+'</h4><p>'+f.trait+'</p><div class="ttl" style="margin:0 0 6px">Tree type</div><div class="w5-sps">'+sp+'</div><button class="btn full" data-w5="enter"'+(foOk(f)?'':' disabled')+'>Enter '+f.n+'</button></div>'
   +'<div class="ttl">Your logs</div>'+logsRow();
}
const logsRow=()=>'<div class="w5-logs">'+TR2.map(x=>'<span>'+gIcon(x.id,'ic')+x.n+' '+inv(x.id)+'</span>').join('')+'</div>';
function sceneHTML(){
  const f=foAt(W5.fo);if(!W5.tree)newTree5();const T=W5.tree,t=T.t;W5.ev=null;
  const spn=W5.sp==='any'?'Any tree':(TR2.find(x=>x.id===W5.sp)||{n:'Any tree'}).n;
  return '<div id="w5skill">'+skillBar('wood')+'</div>'
   +'<div class="w5-bar"><button class="btn alt" data-w5="leave">◀ Leave forest</button><div class="info"><b>'+f.n+'</b> · '+f.type+'<br>Target: '+spn+'</div></div>'
   +'<div class="w5-stage" id="w5s" data-w5="tap"><div class="w5-bg w5-'+f.bg+'" style="'+(f.f?'filter:'+f.f:'')+'"></div><div class="w5-rays"></div><div class="w5-amb" id="w5amb"></div>'
   +'<div class="w5-hpbar"><i id="w5hp" style="width:'+(T.hp/T.max*100)+'%"></i></div><div class="w5-name" id="w5nm">'+t.n+' tree</div>'
   +'<div class="w5-tree" id="w5tree">'+treeSvg(t)+'<div class="w5-notches" id="w5notch"></div></div>'
   +'<div class="w5-tgt" id="w5tgt"><i class="rg" id="w5rg"></i></div>'
   +'<div class="w5-axe" id="w5axe">'+icon('spr:axe')+'</div><div class="w5-streak" id="w5streak"></div>'
   +'<div class="w5-msg" id="w5msg">Tap when the ring closes on the glowing spot. Tap the spot itself for bonus damage.</div></div>'
   +'<button class="btn full" data-w5="swing" style="margin-top:8px">Swing axe</button>'
   +'<div class="w5-stats"><div><b id="w5s1">'+W5.fells+'</b>trees felled</div><div><b id="w5s2">'+W5.logs+'</b>logs</div><div><b id="w5s3">'+W5.best+'</b>best streak</div><div><b id="w5s4">'+(W5.hits?Math.round(100*W5.perf/W5.hits)+'%':'–')+'</b>perfect</div></div>'
   +'<p class="h">Hit as the ring closes: <b>perfect</b> strikes chain into a streak, five in a row starts a Frenzy. Watch for bird nests (tap them for loot) and falling branches (tap Dodge).</p>'
   +'<div class="ttl">Your logs</div>'+logsRow();
}
VIEWS.wood=()=>{
  if(W5.stateRef!==S){
    W5.stateRef=S;const cfg=S.w5&&typeof S.w5==='object'?S.w5:{};
    W5.fo=FOR5.some(f=>f.id===cfg.f)?cfg.f:'meadow';
    W5.sp=cfg.sp==='any'||TR2.some(t=>t.id===cfg.sp)?(cfg.sp||'any'):'any';
    W5.st='pick';W5.tree=null;W5.ring=null;W5.ev=null;W5.busy=false;W5.enter=false;W5.streak=0;W5.frenzy=0;
  }
  if(!foOk(foAt(W5.fo))){W5.fo='meadow';W5.sp='any'}
  return W5.st==='scene'?sceneHTML():pickHTML();
};
woodLoop=function(){WS.raf=0};
/* ---------- little helpers ---------- */
const wmsg=t=>{const m=document.getElementById('w5msg');if(m)m.textContent=t};
function wStreakUI(){const e=document.getElementById('w5streak');if(!e)return;const now=performance.now();let h='';if(W5.streak>1)h+='Streak ×'+W5.streak;if(W5.frenzy>now)h+=(h?'<br>':'')+'FRENZY '+Math.ceil((W5.frenzy-now)/1000)+'s';e.innerHTML=h}
function wStatsUI(){[['w5s1',W5.fells],['w5s2',W5.logs],['w5s3',W5.best],['w5s4',W5.hits?Math.round(100*W5.perf/W5.hits)+'%':'–']].forEach(([id,v])=>{const e=document.getElementById(id);if(e)e.textContent=v})}
function wFly(p,cls,css,kf,dur,ease){const e=document.createElement('i');e.className=cls;Object.assign(e.style,css);p.appendChild(e);ani(e,kf,{duration:dur,easing:ease||'ease-out',fill:'forwards'});setTimeout(()=>e.remove(),dur+80);return e}
function wText(s,x,y,txt,crit){const e=document.createElement('span');e.className='w5-fx'+(crit?' crit':'');e.textContent=txt;e.style.left=x+'px';e.style.top=y+'px';s.appendChild(e);ani(e,[{transform:'translateY(0)',opacity:1},{transform:'translateY(-54px)',opacity:0}],{duration:850,easing:'ease-out',fill:'forwards'});setTimeout(()=>e.remove(),900)}
function wBanner(s,txt,top){const e=document.createElement('div');e.className='w5-ban';e.textContent=txt;e.style.top=top||'26%';s.appendChild(e);ani(e,[{transform:'scale(.4)',opacity:0},{transform:'scale(1.15)',opacity:1,offset:.25},{transform:'scale(1)',opacity:1,offset:.7},{transform:'scale(1)',opacity:0}],{duration:1000,fill:'forwards'});setTimeout(()=>e.remove(),1050)}
/* ---------- the swing ---------- */
function wSwing(e,viaBtn){
  const now=performance.now(),s=$s(),tr=document.getElementById('w5tree'),tg=document.getElementById('w5tgt');
  if(!s||!tr||W5.busy||W5.stun>now||!W5.tree)return;
  const r=W5.ring;if(!r||r.used||now<r.t0)return;
  const el=(now-r.t0)/r.dur,perfect=el>=.82&&el<=1.1,good=!perfect&&el>=.55;
  let aimed=false;
  if(e&&!viaBtn&&tg&&typeof e.clientX==='number'){const b=tg.getBoundingClientRect();aimed=Math.hypot(e.clientX-(b.left+b.width/2),e.clientY-(b.top+b.height/2))<=46}
  r.used=true;
  W5.streak=perfect?W5.streak+1:0;if(W5.streak>W5.best)W5.best=W5.streak;
  const T=W5.tree;T.hits++;W5.hits++;if(perfect){T.perf++;W5.perf++}
  let mult=perfect?2.2+Math.min(1.5,.15*(W5.streak-1)):good?1.3:.6;
  if(perfect)mult*=1+.04*nl('heartwood')+(foAt(W5.fo).pb||0);if(aimed)mult*=1.15;if(W5.frenzy>now)mult*=1.35;
  const dmg=Math.max(1,Math.round((1+Math.floor(L('wood')/8))*mult));
  const rx=r.cx,ry=r.cy;W5.side=rx<105?-1:1;
  const ax=document.getElementById('w5axe');
  ani(ax,[{transform:'scaleX(-1) rotate(-12deg)'},{transform:'scaleX(-1) translate(-20px,-30px) rotate(-70deg)',offset:.35},{transform:'scaleX(-1) translate(60px,10px) rotate(28deg)',offset:.6},{transform:'scaleX(-1) rotate(-12deg)'}],{duration:300,easing:'cubic-bezier(.4,0,.2,1)'});
  setTimeout(()=>{
    const s2=$s(),t2=document.getElementById('w5tree');if(!s2||!t2||W5.tree!==T)return;
    T.hp-=dmg;sfx('chop');if(perfect)sfx('ding');
    ani(t2,[{transform:'rotate(0)'},{transform:'rotate(-3.5deg)',offset:.3},{transform:'rotate(2.5deg)',offset:.7},{transform:'rotate(0)'}],{duration:220,easing:'ease-out'});
    const sx=t2.offsetLeft+rx,sy=t2.offsetTop+ry;
    for(let i=0;i<(perfect?12:6);i++)wFly(s2,'w5-chip',{left:sx+'px',top:sy+'px',background:T.t.trunk},[{transform:'translate(0,0) rotate(0)',opacity:1},{transform:'translate('+(Math.random()*140-70)+'px,'+(Math.random()*-90-10)+'px) rotate(280deg)',opacity:0}],600);
    for(let i=0;i<(perfect?7:3);i++)wFly(s2,'w5-leaf',{left:(t2.offsetLeft+50+Math.random()*110)+'px',top:(t2.offsetTop+20+Math.random()*60)+'px',background:T.t.leaf},[{transform:'translate(0,0) rotate(0)',opacity:1},{transform:'translate('+(Math.random()*80-40)+'px,150px) rotate(300deg)',opacity:0}],1400,'ease-in');
    const nb=document.getElementById('w5notch');if(nb){const n=document.createElement('i');n.className='w5-notch';n.style.left=(rx-19)+'px';n.style.top=(ry-4)+'px';n.style.width=(26+Math.min(30,dmg*4))+'px';n.style.transform='rotate('+(Math.random()*24-12)+'deg)';nb.appendChild(n)}
    wText(s2,sx-30,sy-40,(perfect?'PERFECT ':good?'':'weak ')+(aimed?'+aim ':'')+'-'+dmg,perfect);
    if(perfect)ani(s2,[{transform:'translate(0,0)'},{transform:'translate(-3px,2px)'},{transform:'translate(3px,-2px)'},{transform:'translate(0,0)'}],{duration:180});
    if(perfect&&W5.streak%5===0){W5.frenzy=performance.now()+7000;wBanner(s2,'FRENZY!','18%');sfx('win')}
    const hp=document.getElementById('w5hp');if(hp)hp.style.width=Math.max(0,T.hp/T.max*100)+'%';
    wStreakUI();wStatsUI();
    if(T.hp<=0){wFell(s2,t2,T)}
    else{wmsg(T.hp<=T.max*.3?'The trunk is creaking...':'');if(T.hp<=T.max*.3)sfx('creak');w5NewRing(300)}
  },170);
}
function wFell(s,tr,T){
  W5.busy=true;wEndEv();const t=T.t,f=foAt(W5.fo),side=W5.side;
  const ratio=T.hits?T.perf/T.hits:0,stars=ratio>=.7?3:ratio>=.4?2:1;
  let q=1;if(ratio>=.6&&T.hits>=3)q++;if(W5.frenzy>performance.now())q++;if(f.giant)q++;
  if(Math.random()<.06*S.up.sawup+.004*L('wood')+f.bonus+.03*w8Tier(f.id))q++;if(f.extra&&Math.random()<f.extra)q++;
  wBanner(s,'TIMBER!','24%');sfx('timber');
  ani(tr,[{transform:'rotate(0)'},{transform:'rotate('+6*side+'deg)',offset:.3},{transform:'rotate('+86*side+'deg) translateX('+40*side+'px)',opacity:.1}],{duration:800,easing:'ease-in',fill:'forwards'});
  setTimeout(()=>{
    const s2=$s();
    if(s2){
      ani(s2,[{transform:'translate(0,0)'},{transform:'translate(-4px,3px)'},{transform:'translate(4px,-2px)'},{transform:'translate(0,0)'}],{duration:240});
      for(let i=0;i<7;i++)wFly(s2,'w5-dust',{left:(tr.offsetLeft+80+i*10)+'px',top:(tr.offsetTop+220)+'px'},[{transform:'translate(0,0) scale(1)',opacity:.7},{transform:'translate('+(Math.random()*120-30)+'px,-18px) scale(2.2)',opacity:0}],800);
      for(let i=0;i<Math.min(5,q+1);i++){const l=document.createElement('div');l.className='w5-log';l.innerHTML=gIcon(t.id,'ic');l.style.left=(tr.offsetLeft+110+i*14)+'px';l.style.top=(tr.offsetTop+190)+'px';s2.appendChild(l);
        ani(l,[{transform:'translate(0,0) scale(.6)',opacity:1},{transform:'translate('+(i*18-30)+'px,-50px) scale(1.1)',offset:.3},{transform:'translate(160px,-190px) scale(.5)',opacity:0}],{duration:1000,delay:i*80,easing:'ease-in',fill:'both'});setTimeout(()=>l.remove(),1300)}
    }
    S.inv[t.id]=inv(t.id)+q;
    addXp('wood',Math.max(1,Math.round(t.xp*f.xp*(.9+.1*stars)*(1+.04*w8Tier(f.id)))));
    if(Math.random()<.08)S.inv.honey=inv('honey')+1;
    if(Math.random()<.06)S.inv.feather=inv('feather')+1;
    if(f.rare&&Math.random()<.05)S.inv.crystal=inv('crystal')+1;if(f.drop&&Math.random()<f.drop[1])S.inv[f.drop[0]]=inv(f.drop[0])+1;w8Add(f.id);
    W5.fells++;W5.logs+=q;wStatsUI();
    wmsg('Clean cut '+'★'.repeat(stars)+'☆'.repeat(3-stars)+' · +'+q+' '+t.n+' log'+(q>1?'s':''));
    const sk=document.getElementById('w5skill');if(sk)sk.innerHTML=skillBar('wood');
    save();
  },620);
  setTimeout(()=>{
    newTree5();W5.streak=0;W5.busy=false;
    const t2=document.getElementById('w5tree');
    if(t2&&S.tab==='wood'&&W5.st==='scene'){
      t2.getAnimations&&t2.getAnimations().forEach(a=>a.cancel());
      t2.innerHTML=treeSvg(W5.tree.t)+'<div class="w5-notches" id="w5notch"></div>';
      ani(t2,[{transform:'scale(.2)',opacity:0},{transform:'scale(1)',opacity:1}],{duration:450,easing:'ease-out'});
      const nm2=document.getElementById('w5nm');if(nm2)nm2.textContent=W5.tree.t.n+' tree';
      const hp=document.getElementById('w5hp');if(hp)hp.style.width='100%';
      wStreakUI();
    }
  },1700);
}
/* ---------- random events: nests and falling branches ---------- */
function wSpawnEv(s,now){
  W5.evT=9+Math.random()*7;
  if(Math.random()<Math.min(.85,.6+.04*nl('forester'))){
    const b=document.createElement('button');b.type='button';b.className='w5-nest';b.dataset.w5='nest';
    b.style.left=(s.clientWidth*(.3+Math.random()*.4))+'px';b.style.top=(70+Math.random()*60)+'px';b.innerHTML=NEST;s.appendChild(b);
    ani(b,[{transform:'scale(.2)',opacity:0},{transform:'scale(1)',opacity:1}],{duration:250,fill:'forwards'});
    W5.ev={type:'nest',els:[b],end:now+3000};wmsg('A bird’s nest! Tap it before it flies away.');
  }else{
    const x=s.clientWidth*(.25+Math.random()*.5);
    const sh=document.createElement('div');sh.className='w5-shadow';sh.style.left=x+'px';s.appendChild(sh);
    ani(sh,[{opacity:.2,transform:'scale(.4)'},{opacity:1,transform:'scale(1)'}],{duration:1300,fill:'forwards'});
    const wn=document.createElement('div');wn.className='w5-warn';wn.textContent='⚠ FALLING BRANCH!';s.appendChild(wn);
    ani(wn,[{opacity:1},{opacity:.3},{opacity:1},{opacity:.3},{opacity:1}],{duration:1300});
    const d=document.createElement('button');d.type='button';d.className='w5-dodge';d.dataset.w5='dodge';d.textContent='DODGE!';s.appendChild(d);
    W5.ev={type:'branch',els:[sh,wn,d],x,end:now+1400};
  }
}
function wEndEv(){const ev=W5.ev;if(!ev)return;ev.els.forEach(e=>e&&e.remove());W5.ev=null}
function wBranchFall(s,x,hit){
  const b=document.createElement('div');b.className='w5-branch';b.style.left=x+'px';b.style.top='-20px';s.appendChild(b);
  ani(b,[{transform:'translateY(0) rotate(-20deg)'},{transform:'translateY('+(s.clientHeight-36)+'px) rotate(10deg)'}],{duration:hit?230:330,easing:'ease-in',fill:'forwards'});
  setTimeout(()=>{ani(b,[{opacity:1},{opacity:0}],{duration:300,fill:'forwards'});setTimeout(()=>b.remove(),320)},hit?260:360);
}
function wDoEv(act){
  const ev=W5.ev,s=$s();if(!ev||!s)return;
  if(ev.type==='nest'&&act==='nest'){
    const pool=[['feather',55],['egg',30],['honey',15]];let r=Math.random()*100,id='feather';for(const[i,w]of pool){r-=w;if(r<=0){id=i;break}}
    const n=1+(Math.random()<.25+.06*nl('forester')?1:0);S.inv[id]=inv(id)+n;
    wText(s,s.clientWidth/2-40,90,'+'+n+' '+nm(id),true);wmsg('Nest looted: '+n+' '+nm(id)+'.');sfx('coin');wEndEv();save();
  }else if(ev.type==='branch'&&act==='dodge'){
    wBranchFall(s,ev.x,false);wText(s,12,s.clientHeight-100,'Dodged!',true);wmsg('Dodged the branch!');addXp('wood',3);sfx('coin');wEndEv();
  }
}
/* ---------- main loop ---------- */
function w5Loop(){
  const s=$s();
  if(!s||S.tab!=='wood'||W5.st!=='scene'){W5.raf=0;return}
  const now=performance.now(),dt=Math.min(.1,(now-(W5.last||now))/1000);W5.last=now;
  if(!W5.tree)newTree5();
  if(!W5.ring&&!W5.busy&&W5.stun<=now)w5NewRing(0);
  const tg=document.getElementById('w5tgt'),rg=document.getElementById('w5rg'),tr=document.getElementById('w5tree'),r=W5.ring;
  if(tg&&rg&&tr){
    if(!r||r.used||W5.busy||now<r.t0)tg.style.display='none';
    else{
      const e=(now-r.t0)/r.dur;
      if(e>1.12){W5.streak=0;wStreakUI();wmsg('Too slow! Swing as the ring closes.');w5NewRing(220);tg.style.display='none'}
      else{
        if(r.flick&&!r.flicked&&e>.55){r.flicked=true;r.x=78+Math.random()*60;r.y=70+Math.random()*130;
          wFly(s,'w5-chip',{left:(tr.offsetLeft+r.x)+'px',top:(tr.offsetTop+r.y)+'px',background:'#d4a8ff',width:'14px',height:'14px',borderRadius:'50%'},[{transform:'scale(1)',opacity:1},{transform:'scale(3)',opacity:0}],400)}
        r.cx=r.x+(r.drift?Math.sin(now/260+r.ph)*20:0);r.cy=r.y;
        tg.style.display='block';tg.style.left=(tr.offsetLeft+r.cx)+'px';tg.style.top=(tr.offsetTop+r.cy)+'px';
        const k=Math.min(1,Math.max(0,e));rg.style.transform='scale('+(2.4-1.4*k)+')';rg.classList.toggle('go',e>=.82&&e<=1.08);
      }
    }
  }
  if(W5.frenzy>0)wStreakUI();
  if(!W5.busy&&!W5.ev&&W5.stun<=now){W5.evT-=dt;if(W5.evT<=0)wSpawnEv(s,now)}
  const ev=W5.ev;
  if(ev&&now>=ev.end){
    if(ev.type==='nest'){const b=ev.els[0];ani(b,[{opacity:1,transform:'translateY(0)'},{opacity:0,transform:'translateY(-30px)'}],{duration:300,fill:'forwards'});wmsg('The nest is gone.');W5.ev=null;setTimeout(()=>b.remove(),320)}
    else{
      wBranchFall(s,ev.x,true);const x=ev.x;wEndEv();
      setTimeout(()=>{const s2=$s();if(!s2)return;W5.stun=performance.now()+1100;W5.streak=0;W5.ring=null;wStreakUI();wText(s2,x-30,s2.clientHeight-90,'Ouch! Streak lost',false);wmsg('A branch knocked you off balance!');sfx('err');
        ani(s2,[{transform:'translate(0,0)'},{transform:'translate(-5px,4px)'},{transform:'translate(5px,-3px)'},{transform:'translate(0,0)'}],{duration:260})},240);
    }
  }
  W5.ambT-=dt;const am=document.getElementById('w5amb');
  if(am&&W5.ambT<=0&&am.children.length<9){W5.ambT=.7+Math.random()*.8;const f=foAt(W5.fo),l=document.createElement('i');l.className='w5-leaf';l.style.left=(Math.random()*100)+'%';l.style.background=(W5.tree?W5.tree.t.leaf:'#6fbf5a');l.style.opacity='.8';am.appendChild(l);
    ani(l,[{transform:'translate(0,0) rotate(0)'},{transform:'translate('+(Math.random()*120-40)+'px,'+(s.clientHeight+30)+'px) rotate('+(Math.random()*540)+'deg)'}],{duration:5000+Math.random()*3000,easing:'ease-in-out',fill:'forwards'});setTimeout(()=>l.remove(),8200)}
  W5.raf=requestAnimationFrame(w5Loop);
}
/* ---------- input ---------- */
const WFAST=new Set(['tap','swing','dodge','nest']);
function wAct(b,e){
  const a=b.dataset.w5,i=b.dataset.i;
  if(a==='forest'){const f=foAt(i);if(!foOk(f)){say('Reach Woodcutting level '+f.l+' to enter '+f.n+'.');sfx('err');return}W5.fo=i;W5.sp='any';S.w5=Object.assign(S.w5||{},{f:W5.fo,sp:W5.sp});save();render()}
  else if(a==='species'){const t=TR2.find(x=>x.id===i);if(i!=='any'&&(!t||L('wood')<t.l)){sfx('err');return}W5.sp=i;S.w5=Object.assign(S.w5||{},{f:W5.fo,sp:W5.sp});save();render()}
  else if(a==='enter'){const f=foAt(W5.fo);if(!foOk(f))return;S.w5=Object.assign(S.w5||{},{f:W5.fo,sp:W5.sp});W5.st='scene';W5.tree=null;W5.ring=null;W5.streak=0;W5.fells=0;W5.logs=0;W5.hits=0;W5.perf=0;W5.best=0;W5.frenzy=0;W5.stun=0;W5.busy=true;W5.enter=true;newTree5();save();sfx('creak');render()}
  else if(a==='leave'){W5.st='pick';W5.tree=null;W5.ring=null;W5.ev=null;W5.busy=false;render()}
  else if(a==='tap')wSwing(e,false);
  else if(a==='swing')wSwing(e,true);
  else if(a==='nest'||a==='dodge')wDoEv(a);
}
$('pane').addEventListener('pointerdown',e=>{const b=e.target.closest('[data-w5]');if(!b||!WFAST.has(b.dataset.w5)||b.disabled)return;W5.skip=performance.now()+900;wAct(b,e)});
$('pane').addEventListener('click',e=>{const b=e.target.closest('[data-w5]');if(!b||b.disabled)return;if(WFAST.has(b.dataset.w5)&&performance.now()<W5.skip)return;wAct(b,e)});
{const _rw=render;render=function(){
  const r=_rw.apply(this,arguments);
  if(S.tab==='wood'&&W5.st==='scene'){
    const s=$s();
    if(s&&W5.enter){W5.enter=false;try{s.scrollIntoView({block:'center'})}catch(_){}const f=foAt(W5.fo),o=document.createElement('div');o.className='w5-enter';o.innerHTML='<b>Entering '+f.n+'</b><small>'+f.trait+'</small>';s.appendChild(o);
      ani(o,[{opacity:1},{opacity:1,offset:.6},{opacity:0}],{duration:1000,fill:'forwards'});setTimeout(()=>{o.remove();W5.busy=false;if(!W5.ring)w5NewRing(0)},1000)}
    if(!W5.raf){W5.last=0;W5.raf=requestAnimationFrame(w5Loop)}
  }
  return r}}



/* ===== v8 · woodcutting: 3 new areas + area mastery · Rebirth system ===== */
[['frostpine','Frostpine Log','hue-rotate(150deg) saturate(.6) brightness(1.3)',30],['ashwood','Ashwood Log','grayscale(.9) brightness(.6)',38],['spiritwood','Spiritwood Log','hue-rotate(120deg) saturate(1.5) brightness(1.4)',52]].forEach(a=>lg(...a));
TR2.push({id:'frostpine',n:'Frostpine',l:16,hp:28,xp:34,trunk:'#7a8aa0',leaf:'#bfe3ff',k:'cone'},{id:'ashwood',n:'Ashwood',l:19,hp:32,xp:42,trunk:'#3a3036',leaf:'#ff7a3a',k:'round'},{id:'spiritwood',n:'Spiritwood',l:22,hp:38,xp:55,trunk:'#6fe0d0',leaf:'#c8fff0',k:'round'});
Object.assign(TRS,{frostpine:['t_pine','hue-rotate(120deg) saturate(.5) brightness(1.4)'],ashwood:['t_dark','hue-rotate(-30deg) saturate(1.8)'],spiritwood:['t_elder','hue-rotate(100deg) brightness(1.3)']});
FOR5.push(
 {id:'frost',n:'Frostpine Summit',type:'Alpine',l:16,bg:'bg_f2',f:'hue-rotate(150deg) saturate(.6) brightness(1.15)',t:[['frostpine',60],['pine',20],['cedar',20]],trait:'Brittle ice: perfect hits deal +40% damage. +30% XP.',ring:.9,bonus:0,xp:1.3,pb:.4},
 {id:'ash',n:'Ashen Grove',type:'Volcanic',l:19,bg:'bg_f3',f:'sepia(.6) hue-rotate(-25deg) saturate(1.8) brightness(.7)',t:[['ashwood',55],['redwood',25],['ironwood',20]],trait:'Embers: tough bark, 15% chance of coal per tree. +40% XP.',ring:.88,bonus:0,xp:1.4,tough:true,drop:['coal',.15]},
 {id:'spirit',n:'Spirit Glade',type:'Mythic',l:22,bg:'bg_f4',f:'hue-rotate(150deg) saturate(1.3) brightness(.9)',t:[['spiritwood',50],['elder',30],['frostpine',20]],trait:'Whispering spirits: the spot teleports, 30% extra log. +60% XP.',ring:.85,bonus:0,xp:1.6,flicker:true,rare:true,extra:.3});
/* area mastery: fell trees in an area to earn permanent bonuses there */
const W8T=[25,100,300];
const w8Get=id=>((S.w5&&S.w5.m)||{})[id]||0;
const w8Tier=id=>W8T.filter(x=>w8Get(id)>=x).length;
const w8Add=id=>{S.w5=S.w5||{};S.w5.m=S.w5.m||{};S.w5.m[id]=(S.w5.m[id]||0)+1};
const w8Txt=id=>{const n=w8Get(id),t=w8Tier(id);return ' · '+'★'.repeat(t)+'☆'.repeat(3-t)+' '+n+(t<3?'/'+W8T[t]:'')};

/* ---------- Rebirth: restart from zero, keep permanent perks ---------- */
const RB8={arm:0,carry:null};
const HK8={can:.08,trough:.1,ring:.08,sawup:.06,axeup:.08,bait:.08,whet:.08};
const PK8=[
 {id:'xp',n:'Ancestral Wisdom',ic:'book-open',col:'#c9b8ff',v:10,max:25,c:4,fm:'+{v}% XP in every skill'},
 {id:'gold',n:'Golden Touch',ic:'coin',col:null,v:6,max:20,c:4,fm:'+{v}% coins from sales and loot',h:[['ring',.06]]},
 {id:'grow',n:'Verdant Pulse',ic:'sprout',col:null,v:8,max:15,c:3,fm:'+{v}% crop growth speed',h:[['can',.08]]},
 {id:'herd',n:'Herd Spirit',ic:'egg',col:null,v:8,max:15,c:3,fm:'+{v}% animal production speed',h:[['trough',.08]]},
 {id:'wood',n:'Woodsman’s Soul',ic:'axe',col:'#b8803f',v:5,w:4,max:12,c:4,fm:'+{v}% bonus logs, trees have {w}% less HP',h:[['sawup',.05],['axeup',.04]]},
 {id:'fish',n:'Tide Caller',ic:'fish',col:'#8fb3c9',v:6,max:12,c:3,fm:'-{v}% wait for a fish bite',h:[['bait',.06]]},
 {id:'might',n:'Battle Memory',ic:'sword',col:'#c9d6e4',v:5,max:12,c:4,fm:'+{v}% damage in combat',h:[['whet',.05]]},
 {id:'start',n:'Head Start',ic:'coin',col:'#ffd778',v:150,max:10,c:2,fm:'Begin every life with +{v} coins'}];
const rl=(st,id)=>(st&&st.rb&&st.rb.up&&st.rb.up[id])||0;
const RBX={};PK8.forEach(p=>(p.h||[]).forEach(([k,per])=>{const pr=RBX[k];RBX[k]=st=>(pr?pr(st):0)+rl(st,p.id)*per/HK8[k]}));
const rbInstall=st=>{
 if(!st||typeof st!=='object'||Array.isArray(st))return st;
 installSkillTreeState(st);
 const r=st.rb&&typeof st.rb==='object'?st.rb:{};
 st.rb={n:+r.n||0,sp:+r.sp||0,tot:+r.tot||0,up:r.up&&typeof r.up==='object'?r.up:{}};
 const base=st.up;
 Object.defineProperty(st,'up',{value:new Proxy({},{get(_,k){const v=base[k];return typeof k==='string'&&RBX[k]?(+v||0)+RBX[k](st):v},set(){return true},has(){return true},ownKeys(){return[]},getOwnPropertyDescriptor(){return undefined}}),enumerable:false,configurable:true,writable:true});
 return st};
S_DEFAULTS.rb={n:0,sp:0,tot:0,up:{}};
{const _fc=freshCampaign;freshCampaign=function(){const x=_fc.apply(this,arguments);if(RB8.carry)x.rb=RB8.carry;return x}}
{const _xp8=addXp;addXp=function(k,n){const l=rl(S,'xp');if(l>0)n=Math.max(1,Math.round(n*(1+.1*l)));return _xp8.call(this,k,n)}}
const rbLv=()=>SK.reduce((a,k)=>a+Math.max(0,L(k)-1),0);
const RB_MIN=60;
const rbGain=()=>{const s=rbLv();return s<RB_MIN?0:Math.floor(Math.pow(s,1.15)/5)};
const pCost=(p,l)=>Math.ceil(p.c*Math.pow(1.45,l));
const pFm=(p,l)=>p.fm.replace('{v}',f1(l*p.v)).replace('{w}',f1(l*(p.w||0)));
VIEWS.reb=()=>{
 const r=S.rb,g=rbGain(),s=rbLv(),armed=RB8.arm>Date.now();
 const cards=PK8.map(p=>{const l=rl(S,p.id),mx=l>=p.max,c=pCost(p,l),can=!mx&&r.sp>=c;
  return '<div class="rb-p"><div class="top">'+icon(p.ic,p.col)+'<b>'+p.n+'</b><small>Lv '+l+'/'+p.max+'</small></div><div class="d">'+(l?'Now: '+pFm(p,l):'Not learned')+'</div>'
   +(mx?'<button class="btn alt" disabled>Maxed</button>':'<div class="d">Next: '+pFm(p,l+1)+'</div><button class="btn'+(can?'':' alt')+'" data-rb="buy" data-i="'+p.id+'">Upgrade · '+c+' ✦</button>')+'</div>'}).join('');
 return '<div class="ttl">Rebirth</div><div class="rb-top"><h3>Begin again, stronger</h3><p class="h">Rebirth resets your farm, barn, skills, items, coins, mines and woodcutting mastery back to zero, but you keep your class and every Spirit Seed perk below. Each life gets faster than the last.</p>'
  +'<div class="rb-big"><div><b>'+r.n+'</b>rebirths</div><div><b>'+r.sp+' ✦</b>Spirit Seeds</div><div><b>'+r.tot+' ✦</b>earned in total</div><div><b>'+s+'</b>skill levels now</div></div>'
  +(g?'<p class="h">Rebirth now to gain <b>'+g+' ✦</b> Spirit Seeds.</p><button class="btn full" data-rb="go">'+(armed?'Tap again to confirm — everything resets!':'Rebirth now')+'</button>'
     :'<p class="h">Reach a combined <b>'+RB_MIN+'</b> skill levels (you have '+s+') to be able to rebirth.</p><button class="btn full alt" disabled>Not ready yet</button>')+'</div>'
  +'<div class="ttl">Permanent perks</div><div class="rb-grid">'+cards+'</div>'};
function doRebirth(){
 const g=rbGain();if(!g)return;const r=S.rb,cls=S.cls,mute=S.mute;
 RB8.carry={n:r.n+1,sp:r.sp+g,tot:r.tot+g,up:{...r.up}};
 try{beginFreshCampaign()}finally{RB8.carry=null}
 S.cls=cls;S.mute=mute;S.coins+=150*rl(S,'start');S.hp=maxHp();S.sh=maxSh();S.tab='reb';RB8.arm=0;
 save();render();upd();say('Reborn! +'+g+' Spirit Seeds. A new life begins.');sfx('lvl');window.scrollTo(0,0)}
$('pane').addEventListener('click',e=>{
 const b=e.target.closest('[data-rb]');if(!b||b.disabled)return;
 if(b.dataset.rb==='go'){if(RB8.arm>Date.now())doRebirth();else{RB8.arm=Date.now()+5000;render();setTimeout(()=>{if(RB8.arm&&RB8.arm<=Date.now()){RB8.arm=0;if(S.tab==='reb')render()}},5100)}}
 else if(b.dataset.rb==='buy'){const p=PK8.find(x=>x.id===b.dataset.i),l=rl(S,p.id),c=pCost(p,l);
  if(l>=p.max)return;if(S.rb.sp<c){say('You need '+c+' Spirit Seeds.');sfx('err');return}
  S.rb.sp-=c;S.rb.up[p.id]=l+1;say(p.n+' is now level '+(l+1)+'.');sfx('lvl');save();render();upd()}});
{const st=document.createElement('style');st.textContent='.rb-top{border:2px solid #8a7049;border-radius:14px;background:linear-gradient(145deg,#2a2013,#16110a);padding:10px;margin:6px 0}.rb-top h3{margin:0 0 4px;color:#ffe0a0;font-size:18px}.rb-big{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0}.rb-big div{text-align:center;border:1px solid var(--line);border-radius:10px;background:var(--card);padding:5px 2px;font-size:10px;color:var(--mute)}.rb-big b{display:block;font-size:15px;color:var(--ink)}.rb-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:8px}.rb-p{border:2px solid var(--line);border-radius:12px;background:var(--card);padding:8px 9px;display:flex;flex-direction:column;gap:4px}.rb-p .top{display:flex;align-items:center;gap:8px}.rb-p .top .ic{width:30px;height:30px;flex:none}.rb-p .top b{flex:1;font-size:13px}.rb-p .top small{color:var(--mute);font-size:10px}.rb-p .d{font-size:11.5px;color:var(--mute);line-height:1.3}.rb-p .btn{padding:6px 8px;font-size:12px;margin-top:2px}.rb-p .btn[disabled]{opacity:.5}';document.head.appendChild(st)}
TL.reb=['core','Rebirth'];TC4.reb='#ffd778';
{const b=document.createElement('button');b.dataset.k='reb';b.innerHTML=icon('core','#ffd778')+'Rebirth';b.addEventListener('click',()=>{S.tab='reb';try{SFX.coin()}catch(_){}save();render();window.scrollTo(0,0)});tabs.appendChild(b)}

V4.v5={NODES,W5,S5:()=>S.sk,installState:rbInstall};

render();window.__v4Ready=true;
})();