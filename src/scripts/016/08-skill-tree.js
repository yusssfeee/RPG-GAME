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

