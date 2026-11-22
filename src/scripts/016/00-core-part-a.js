
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


