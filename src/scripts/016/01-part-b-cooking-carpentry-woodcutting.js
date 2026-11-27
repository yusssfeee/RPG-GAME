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


