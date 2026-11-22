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