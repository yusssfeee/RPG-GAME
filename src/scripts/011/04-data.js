/* ---------- data ---------- */
const TC=['#8f8579','#d9803f','#c9d6e4','#ffcc33','#f0f4ff','#7ad8ff','#ff6a5a','#eee6d0','#b8803f','#e9d9ff','#c9b8a0'];
const SK=['farm','barn','fish','mine','smith','alch','combat','trade','wood','arcane','tailor','leather'];
const SKN={farm:'Farming',barn:'Husbandry',fish:'Fishing',mine:'Mining',smith:'Smithing',alch:'Alchemy',combat:'Combat',trade:'Trading',wood:'Woodcutting',arcane:'Arcana',tailor:'Tailoring',leather:'Leatherworking'};
const SKI={farm:['sprout'],barn:['egg'],fish:['fish','#8fb3c9'],mine:['pick','#c9d6e4'],smith:['anvil'],alch:['flask','#7ad8ff'],combat:['sword','#c9d6e4'],trade:['coin'],wood:['axe','#b8803f'],arcane:['core','#b36bff'],tailor:['wool'],leather:['hide']};
const CROPS=[
 {n:'Radish',ic:'carrot',cost:2,t:6,sell:5,xp:2,l:1},
 {n:'Wheat',ic:'wheat',cost:6,t:16,sell:17,xp:5,l:1},
 {n:'Herbs',ic:'herb',cost:5,t:20,sell:0,xp:3,l:1,give:'herb',q:2},
 {n:'Pumpkin',ic:'pumpkin',cost:20,t:45,sell:68,xp:14,l:2},
 {n:'Tomato',ic:'tomato',cost:30,t:70,sell:120,xp:22,l:4},
 {n:'Melon',ic:'melon',cost:60,t:120,sell:270,xp:40,l:7},
 {n:'Hay',ic:'wheat',cost:3,t:12,sell:0,xp:2,l:1,give:'hay',q:3},
 {n:'Clover',ic:'leaf',cost:6,t:20,sell:0,xp:3,l:2,give:'clover',q:3},
 {n:'Corn',ic:'wheat',cost:10,t:35,sell:0,xp:6,l:4,give:'corn',q:3},
  {n:'Potato',ic:'spr:potato',cost:10,t:28,sell:36,xp:8,l:2},
  {n:'Turnip',ic:'spr:turnip',cost:14,t:36,sell:52,xp:11,l:3},
  {n:'Cabbage',ic:'spr:cabbage',cost:24,t:55,sell:92,xp:17,l:3},
  {n:'Garlic',ic:'spr:garlic',cost:34,t:75,sell:140,xp:23,l:5},
  {n:'Strawberry',ic:'spr:strawberry',cost:50,t:100,sell:215,xp:32,l:6},
  {n:'Rice',ic:'spr:rice',cost:70,t:140,sell:320,xp:46,l:8},
  {n:'Grapes',ic:'spr:grapes',cost:90,t:170,sell:430,xp:58,l:9},
  {n:'Apple',ic:'spr:apple',cost:130,t:230,sell:680,xp:85,l:11}
];
const CROP_ART_KEY_BY_NAME={"Radish":"radish","Wheat":"wheat","Herbs":"herb","Pumpkin":"pumpkin","Tomato":"tomato","Melon":"melon","Hay":"hay","Clover":"clover","Corn":"corn","Potato":"potato","Turnip":"turnip","Cabbage":"cabbage","Garlic":"garlic","Strawberry":"strawberry","Rice":"rice","Grapes":"grapes","Apple":"apple"};
CROPS.forEach(c=>{const k=CROP_ART_KEY_BY_NAME[c.n];if(k)c.ic="pixelcrop:"+k});
const FISH=[
 {id:'sardine',n:'Sardine',ic:'fish',col:'#8fb3c9',v:4,xp:3,l:1},
 {id:'bass',n:'Bass',ic:'fish',col:'#f0a23a',v:10,xp:6,l:3},
 {id:'puffer',n:'Pufferfish',ic:'puffer',v:24,xp:12,l:5},
 {id:'squid',n:'Squid',ic:'squid',v:40,xp:18,l:7},
 {id:'shark',n:'Shark',ic:'shark',v:85,xp:35,l:9}
];
const ORES=[{id:'copper',n:'Copper Ore',col:'#e0833f',v:4},{id:'iron',n:'Iron Ore',col:'#d6e0ec',v:9},{id:'silver',n:'Silver Ore',col:'#f2f6ff',v:20},{id:'gold',n:'Gold Ore',col:'#ffcc33',v:40},{id:'mithril',n:'Mithril Ore',col:'#7ad8ff',v:90}];
const ORE_L=[1,3,5,7,10];
const MATS={
 gel:{n:'Slime Gel',ic:'gel',col:'#5fe08a',v:3},hide:{n:'Hide',ic:'hide',col:'#b8803f',v:5},fur:{n:'Wolf Fur',ic:'hide',col:'#c9b8a0',v:8},
 fang:{n:'Fang',ic:'fang',v:7},bone:{n:'Bone',ic:'bone',v:6},wing:{n:'Bat Wing',ic:'wing',col:'#8a66cc',v:6},silk:{n:'Spider Silk',ic:'silk',v:9},
 horn:{n:'Horn',ic:'horn',v:14},wisp:{n:'Wisp Essence',ic:'wisp',v:14},core:{n:'Magic Core',ic:'core',col:'#53d4ff',v:30},scale:{n:'Dragon Scale',ic:'scale',col:'#ff6a5a',v:60},
 herb:{n:'Healing Herb',ic:'herb',v:4},egg:{n:'Egg',ic:'egg',v:6},feather:{n:'Feather',ic:'feather',v:3},wool:{n:'Wool',ic:'wool',v:18},milk:{n:'Milk',ic:'milk',v:30},honey:{n:'Honey',ic:'honey',v:28}
};
MATS.manure={n:'Manure',ic:'manure',v:2};
[['oak','Oak Log',4,'#8a5a2b'],['birch','Birch Log',7,'#e8e0c8'],['pine','Pine Log',10,'#3b7a4a'],['ironwood','Ironwood Log',16,'#8a8a9a'],['elder','Elderwood Log',36,'#b36bff'],['agem','Arcane Gem',90,'#b36bff'],['starstone','Starstone',260,'#ffa530']].forEach(m=>MATS[m[0]]={n:m[1],ic:m[0]==='agem'||m[0]==='starstone'?'core':'club',col:m[3],v:m[2]});
const W=(id,n,a,col,atk,sp,cr,l,g,r)=>({id,c:'w',n,a,col,atk,sp,cr,l,g,r});
const A=(id,n,a,col,def,sh,hp,l,g,r,cr)=>({id,c:'a',n,a,col,def,sh,hp,l,g,r,cr:cr||0});
const K=(id,n,col,pw,l,g,r)=>({id,c:'p',n,a:'pick',col,pw,l,g,r});
const IT=[
 W('w_rusty','Rusty Sword','sword',0,3,1,5),
 W('w_dagger','Dagger','dagger',1,4,.55,14,1,10,[['copper',4]]),
 W('w_club','Bone Club','club',7,6,1.1,6,1,8,[['bone',5],['hide',2]]),
 W('w_short','Short Sword','sword',1,7,.9,6,1,20,[['copper',6]]),
 W('w_bow','Hunter Bow','bow',8,9,.8,15,2,30,[['bone',3],['silk',3],['hide',2]]),
 W('w_axe','Hand Axe','axe',2,12,1.2,8,3,45,[['iron',6]]),
 W('w_katana','Katana','katana',2,11,.7,20,4,80,[['iron',8]]),
 W('w_spear','Spear','spear',2,16,1,10,5,110,[['iron',10],['fang',3]]),
 W('w_saber','Silver Saber','katana',4,18,.75,18,6,150,[['silver',8],['fang',4]]),
 W('w_hammer','War Hammer','hammer',3,30,1.8,8,7,160,[['gold',8]]),
 W('w_great','Greatsword','great',3,26,1.15,12,8,260,[['gold',10],['bone',6]]),
 W('w_staff','Mage Staff','staff',5,24,.9,22,9,300,[['silver',6],['core',2],['wisp',3]]),
 W('w_rapier','Golden Rapier','rapier',3,21,.5,26,10,400,[['gold',10],['core',1]]),
 W('w_mithril','Mithril Blade','sword',5,38,.8,24,11,600,[['mithril',10],['core',2]]),
 W('w_dragon','Dragonfang Blade','great',6,55,.9,28,13,1200,[['scale',8],['fang',6],['mithril',4],['gold',6]]),
 A('a_cloth','Cloth Tunic','tunic',0,0,0,0),
 A('a_leather','Leather Armor','leather',8,3,0,14,1,15,[['hide',6]]),
 A('a_copper','Copper Mail','mail',1,4,8,6,1,30,[['copper',8]]),
 A('a_fur','Wolf Fur Cloak','cloak',10,5,6,22,3,40,[['fur',6],['hide',3]]),
 A('a_iron','Iron Mail','mail',2,9,18,12,3,90,[['iron',10]]),
 A('a_silk','Spider Silk Robe','robe',9,4,28,8,4,80,[['silk',8],['wisp',1]],6),
 A('a_knight','Knight Plate','plate',2,15,30,20,5,180,[['iron',14],['hide',4]]),
 A('a_silver','Silver Mail','mail',4,17,34,22,6,220,[['silver',10],['hide',4]]),
 A('a_gold','Golden Armor','plate',3,22,45,30,7,300,[['gold',12]]),
 A('a_brute','Brute Armor','leather',7,20,20,60,8,250,[['hide',10],['horn',5],['fur',4]]),
 A('a_mithril','Mithril Armor','plate',5,30,60,40,10,520,[['mithril',12],['core',2]]),
 A('a_dragon','Dragon Scale Armor','plate',6,40,80,60,13,1000,[['scale',12],['horn',4],['mithril',4]]),
 K('p_stone','Stone Pick',0,1),
 K('p_copper','Copper Pick',1,1.5,1,10,[['copper',5]]),
 K('p_iron','Iron Pick',2,2,3,40,[['iron',7]]),
 K('p_silver','Silver Pick',4,2.5,6,100,[['silver',8]]),
 K('p_gold','Gold Pick',3,3,7,120,[['gold',10]]),
 K('p_mithril','Mithril Pick',5,3.5,10,400,[['mithril',10],['core',1]])
];
[['w_oakbow','Oak Bow','bow',8,11,.75,14,2,25,[['oak',6],['silk',2]],'archer'],['w_pinebow','Pine Longbow','bow',8,22,.8,18,5,70,[['pine',8],['feather',4]],'archer'],['w_elderbow','Elder Warbow','bow',9,40,.75,24,12,200,[['elder',10],['scale',2]],'archer'],
['w_oakstaff','Oak Staff','spear',8,10,1,8,2,25,[['oak',5],['wisp',2]],'mage'],['w_birchstaff','Birch Stave','spear',4,18,.95,10,4,60,[['birch',6],['core',1]],'mage'],['w_elderstaff','Elder Staff','spear',9,42,.9,12,12,220,[['elder',10],['core',3]],'mage'],
['w_birchdag','Birch Stiletto','dagger',4,8,.45,25,3,40,[['birch',4],['iron',2]],'rogue'],['w_ebon','Ironwood Fang','dagger',5,26,.45,30,8,140,[['ironwood',6],['fang',4]],'rogue']].forEach(a=>IT.push({...W(...a.slice(0,10)),x:'wood',k:a[10]}));
[['hay','Hay',1,'#d8c060','wheat'],['clover','Clover',2,'#5fd05f','herb'],['corn','Corn',3,'#ffcc33','wheat'],['truffle','Truffle',40,'#6b4a30','herb'],['gmilk','Goat Milk',22,'#fffdf4','milk'],['duckegg','Duck Egg',9,'#cfe8ff','egg'],['pelt','Rabbit Pelt',12,'#d9c8b8','hide'],['llama','Llama Wool',35,'#e8c9a0','wool'],['mana','Mana Dust',8,'#7ad8ff','core'],['rune','Rune Shard',22,'#b36bff','core'],['essence','Arcane Essence',55,'#ff7ad9','core'],['thread','Thread',4,'#e8e0c8','wool'],['cloth','Cloth',14,'#c9d6e4','wool'],['silkcloth','Silk Cloth',34,'#ffe9a8','silk'],['leather','Leather',9,'#b8803f','hide'],['cured','Cured Leather',22,'#8a5a2b','hide']].forEach(m=>MATS[m[0]]={n:m[1],ic:m[4],col:m[3],v:m[2]});
[['coal','Coal',6,'#3a3a44','ore'],['crystal','Crystal Shard',35,'#7ad8ff','core'],['obsidian','Obsidian',50,'#4a2a6a','ore'],['focus','Crystal Focus',90,'#7ad8ff','core']].forEach(m=>MATS[m[0]]={n:m[1],ic:m[4],col:m[3],v:m[2]});
[['cbar','Copper Bar',14,'#e0833f'],['ibar','Iron Bar',30,'#d6e0ec'],['sbar','Silver Bar',70,'#f2f6ff'],['gbar','Gold Bar',140,'#ffcc33'],['mbar','Mithril Bar',300,'#7ad8ff'],['steel','Steel Bar',90,'#aab4c4'],['obsal','Obsidian Alloy',150,'#6a3a9a'],['starsteel','Starsteel Bar',500,'#ffa530']].forEach(m=>MATS[m[0]]={n:m[1],ic:'ingot',col:m[3],v:m[2]});
MATS.pearl={n:'Pearl',ic:'core',col:'#f4f0ff',v:120};
FISH.push({id:'carp',n:'Carp',ic:'fish',col:'#c9a050',v:7,xp:4,l:1},{id:'trout',n:'Trout',ic:'fish',col:'#e08a7a',v:14,xp:8,l:4},{id:'salmon',n:'Salmon',ic:'fish',col:'#ff8a6a',v:24,xp:12,l:6},{id:'tuna',n:'Tuna',ic:'fish',col:'#4a78c0',v:52,xp:22,l:8},{id:'swordfish',n:'Swordfish',ic:'fish',col:'#7ab8e0',v:75,xp:28,l:9},{id:'eel',n:'Abyss Eel',ic:'fish',col:'#5fd0a0',v:100,xp:40,l:12},{id:'angler',n:'Anglerfish',ic:'fish',col:'#9a56d8',v:130,xp:50,l:13},{id:'kraken',n:'Baby Kraken',ic:'squid',col:'#a04adf',v:230,xp:80,l:16});
const VAL={};ORES.forEach(o=>VAL[o.id]=o.v);Object.keys(MATS).forEach(k=>VAL[k]=MATS[k].v);FISH.forEach(f=>VAL[f.id]=f.v);
IT.forEach(i=>i.v=i.r?Math.round(.8*(i.g+i.r.reduce((a,x)=>a+x[1]*VAL[x[0]],0))):0);
const POTS=[
 {id:'pot_hp1',n:'Minor Healing',col:'#ff6b8a',l:1,r:[['gel',2],['herb',1]],heal:40,d:'Heals 40 HP'},
 {id:'pot_hp2',n:'Healing Potion',col:'#ff3b6a',l:3,r:[['gel',4],['herb',3]],heal:100,d:'Heals 100 HP'},
 {id:'pot_hp3',n:'Greater Healing',col:'#d4144a',l:6,r:[['gel',6],['herb',5],['wisp',1]],heal:220,d:'Heals 220 HP'},
 {id:'pot_sh',n:'Shield Tonic',col:'#4aa3ff',l:2,r:[['silk',2],['gel',2]],sh:1,d:'Fully restores your shield'},
 {id:'pot_atk',n:'Attack Tonic',col:'#ff8a3a',l:2,r:[['fang',2],['bone',1]],buff:'atk',d:'+35% damage for 90s'},
 {id:'pot_spd',n:'Swift Draught',col:'#ffe14a',l:3,r:[['wing',2],['feather',2]],buff:'spd',d:'+30% attack speed for 90s'},
 {id:'pot_crit',n:'Sharp Eye',col:'#c46bff',l:4,r:[['core',1],['honey',1]],buff:'crit',d:'+20% crit chance for 90s'},
 {id:'pot_def',n:'Ironskin',col:'#9aa6b8',l:4,r:[['hide',2],['bone',2]],buff:'def',d:'+8 defense for 90s'},
 {id:'pot_grow',n:'Growth Tonic',col:'#6fd45a',l:2,r:[['herb',3],['milk',1]],buff:'grow',dur:180,d:'Crops planted grow 2x faster (3 min)'},
 {id:'pot_luck',n:'Angler’s Brew',col:'#4adfd0',l:2,r:[['egg',2],['herb',2]],buff:'fish',dur:120,d:'Fish appear 2x faster (2 min)'}
];
const FERTS=[
 {id:'manure',n:'Manure',col:'#7a4a2a',spd:.15,dbl:.2,tri:0},
 {id:'f_compost',n:'Compost',col:'#8a6a3a',l:1,r:[['manure',2],['herb',1]],d:'Crops grow 30% faster, 40% double yield',spd:.3,dbl:.4,tri:0},
 {id:'f_bone',n:'Bone Meal',col:'#eee6d0',l:5,r:[['bone',3],['manure',1]],d:'Crops grow 45% faster, 55% double yield',spd:.45,dbl:.55,tri:0},
 {id:'f_super',n:'Miracle Mix',col:'#7ad8ff',l:10,r:[['manure',3],['herb',3],['core',1]],d:'60% faster, always double, 30% triple',spd:.6,dbl:1,tri:.3}
];
const ALLR=POTS.concat(FERTS.filter(f=>f.r));
const TRADE=[
 {id:'t_grain',n:'Grain',ic:'sack',col:'#e6c34a',b:10},{id:'t_fish',n:'Salted Fish',ic:'fish',col:'#c9b8a0',b:14},
 {id:'t_cloth',n:'Wool Cloth',ic:'roll',col:'#f4efe0',b:22},{id:'t_iron',n:'Iron Ingots',ic:'ingot',col:'#c9d6e4',b:30},
 {id:'t_spice',n:'Spices',ic:'jar',col:'#e0603a',b:45},{id:'t_wine',n:'Wine',ic:'bottle',col:'#a04adf',b:50},
 {id:'t_silk',n:'Silk Rolls',ic:'roll',col:'#e9d9ff',b:60},{id:'t_gem',n:'Gems',ic:'core',col:'#ff7ad9',b:120}
];
const TOWNS=[
 {id:'green',n:'Greenvale',x:16,y:70,m:[.6,1.1,.7,1.5,1.5,1.1,1.3,1.5],c:[1,.9,1,.9]},
 {id:'iron',n:'Ironhold',x:74,y:24,m:[1.5,1.4,1.3,.6,1.2,1.5,1.2,.65],c:[1.3,.8,1.2,1.3]},
 {id:'port',n:'Seaport',x:80,y:74,m:[1.1,.6,1.5,1.4,.65,1.3,1.1,1.2],c:[.8,1.2,1,1.1]},
 {id:'mist',n:'Mistwood',x:32,y:22,m:[1.4,1.2,.9,1.1,1.6,.6,.65,1.1],c:[1.1,1.3,.9,1.2]},
 {id:'dunes',n:'Sandmoor',x:50,y:56,m:[1.3,1.5,1.2,1.3,.6,1.2,1.5,.7],c:[1.4,1.1,1.1,1.3]}
];
const BN={atk:'Attack',spd:'Speed',crit:'Crit',def:'Defense',grow:'Growth',fish:'Fishing'};
const ANI=[
 {id:'chicken',n:'Chicken',cost:30,t:20,give:['egg'],extra:['feather',.35]},
 {id:'sheep',n:'Sheep',cost:80,t:45,give:['wool']},
 {id:'bee',n:'Bees',cost:120,t:40,give:['honey']},
 {id:'cow',n:'Cow',cost:200,t:60,give:['milk'],extra:['hide',.15]},
 {id:'duck',n:'Duck',cost:45,t:25,give:['duckegg'],extra:['feather',.5]},
 {id:'rabbit',n:'Rabbit',cost:70,t:30,give:['pelt']},
 {id:'goat',n:'Goat',cost:110,t:50,give:['gmilk']},
 {id:'pig',n:'Pig',cost:150,t:55,give:['truffle'],extra:['hide',.25]},
 {id:'llama',n:'Llama',cost:260,t:75,give:['llama'],extra:['wool',.3]}
];
Object.assign(ANIART,{
 duck:SH+'<ellipse cx="52" cy="64" rx="28" ry="20" fill="#ffe45c"/><circle cx="34" cy="42" r="15" fill="#ffe45c"/><path d="M20 44q-12 2-12 6 10 4 14 0z" fill="#ff9a2a"/><path d="M74 60q14-6 10-16-10 4-12 14z" fill="#f2d040"/>'+eye(34,38,3.6),
 rabbit:SH+'<ellipse cx="50" cy="66" rx="26" ry="22" fill="#e8dccc"/><circle cx="36" cy="48" r="15" fill="#e8dccc"/><ellipse cx="30" cy="20" rx="6" ry="16" fill="#e8dccc"/><ellipse cx="44" cy="18" rx="6" ry="16" fill="#e8dccc"/><circle cx="76" cy="68" r="7" fill="#fff"/>'+eye(34,46,3.6),
 goat:SH+'<rect x="26" y="46" width="52" height="30" rx="12" fill="#f4efe6"/><rect x="10" y="32" width="26" height="26" rx="10" fill="#f4efe6"/><path d="M14 32l-4-14 10 10zM30 32l6-14 2 14z" fill="#8a7a60"/><path d="M16 56l4 10 4-10z" fill="#d8c8a8"/>'+eye(22,44,3.4),
 pig:SH+'<ellipse cx="50" cy="62" rx="30" ry="22" fill="#f6a7b8"/><circle cx="30" cy="48" r="16" fill="#f6a7b8"/><ellipse cx="20" cy="52" rx="7" ry="5" fill="#e98aa0"/><path d="M24 36l-6-10 12 4zM38 34l4-12 8 8z" fill="#e98aa0"/>'+eye(30,44,3.5),
 llama:SH+'<rect x="30" y="50" width="46" height="28" rx="12" fill="#e8c9a0"/><rect x="18" y="14" width="16" height="44" rx="8" fill="#e8c9a0"/><rect x="10" y="12" width="22" height="16" rx="7" fill="#f4dcb8"/><path d="M16 12l-2-10 6 8zM28 12l4-10 0 10z" fill="#c9a070"/>'+eye(20,18,3)
});
const DROPS={Slime:[['gel',1,1,2]],Rat:[['hide',.7,1,1],['fang',.2,1,1]],Bat:[['wing',.7,1,1],['fang',.25,1,1]],Goblin:[['hide',.6,1,2],['bone',.4,1,1],['copper',.25,1,2]],Spider:[['silk',.8,1,2],['fang',.3,1,1]],Wolf:[['fur',.8,1,2],['fang',.5,1,1],['hide',.3,1,1]],Skeleton:[['bone',.9,1,3],['iron',.25,1,1]],Orc:[['hide',.7,1,2],['horn',.4,1,1],['iron',.3,1,2]],Ghost:[['wisp',.8,1,1],['silk',.2,1,1]],Golem:[['core',.5,1,1],['iron',.6,1,3],['silver',.3,1,1]],Troll:[['hide',.8,1,3],['horn',.5,1,2],['fur',.4,1,2]],Imp:[['horn',.6,1,2],['core',.4,1,1],['wisp',.4,1,2],['gold',.3,1,1]],'Slime King':[['gel',1,5,8],['core',1,1,1]],'Orc Warlord':[['horn',1,3,3],['iron',1,3,4],['hide',1,4,4],['silver',.6,2,3]],Dragon:[['scale',1,5,8],['fang',1,3,3],['core',1,2,2],['gold',1,4,5],['mithril',.5,1,2]],Lich:[['wisp',1,6,6],['bone',1,6,6],['core',1,4,4],['mithril',1,3,4]]};
const CV=(base,name,reps,o)=>{const b=FOES.find(f=>f.n===base);let a=b.a;reps.forEach(r=>{a=a.split(r[0]).join(r[1])});const l=o.l||b.l;FOES.push({...b,...o,n:name,l,a:a+(o.x||''),sp:o.b?2.2:Math.max(1.4,2.5-.1*l)});if(!DROPS[name])DROPS[name]=DROPS[base]||[]};
const CR='<path d="M32 30l4-14 7 8 7-12 7 12 7-8 4 14z" fill="#ffcc33"/>';
CV('Slime','Blue Slime',[['#58d36a','#4aa3e8']],{hp:14,atk:3,xp:6,c:5,l:2});
CV('Slime','Acid Slime',[['#58d36a','#b8e03a']],{hp:20,atk:4,xp:9,c:8,l:3});
CV('Slime King','Ooze Titan',[['#4aa3e8','#a04adf'],['#ffcc33','#ff7ad9']],{b:1,hp:120,atk:9,xp:90,c:120,l:5,x:'<path d="M26 34L16 12l16 10zM74 34l10-22-16 10z" fill="#5a2a8a"/>'});
CV('Goblin','Goblin Shaman',[['#86cf5e','#b79ae0'],['#7cc356','#a280d0']],{hp:24,atk:6,xp:12,c:12,l:4});
CV('Goblin','Goblin Archer',[['#86cf5e','#d6b062'],['#7cc356','#c09a4a']],{hp:40,atk:11,xp:20,c:20,l:8});
CV('Goblin','Goblin Spear',[['#86cf5e','#b58a45'],['#7cc356','#9b7138']],{hp:48,atk:13,xp:24,c:24,l:8});
CV('Goblin','Goblin Chief',[['#86cf5e','#5f9f40']],{b:1,hp:90,atk:9,xp:60,c:70,l:4,x:CR});
CV('Goblin','Goblin King',[['#86cf5e','#3f7f38'],['#8a5a2b','#c0303d']],{b:1,hp:210,atk:14,xp:140,c:180,l:6,x:CR});
CV('Spider','Giant Spider',[['#4a3a5c','#7a2a3a'],['#5a4872','#8a3a4a']],{hp:60,atk:10,xp:30,c:30,l:5});
CV('Spider','Broodmother',[['#4a3a5c','#8a2a5a'],['#5a4872','#a04a7a']],{b:1,hp:140,atk:12,xp:90,c:100,l:6});
CV('Spider','Arachne Queen',[['#4a3a5c','#3a2a8a'],['#5a4872','#5a4aa8']],{b:1,hp:300,atk:17,xp:200,c:260,l:8,x:CR});
CV('Wolf','Dire Wolf',[['#9296aa','#555a6a'],['#6c6f7c','#3a3e4a']],{hp:60,atk:12,xp:28,c:28,l:8});
CV('Wolf','Alpha Wolf',[['#9296aa','#3a3a4a'],['#6c6f7c','#2a2a36'],['#f2b705','#ff4a4a']],{b:1,hp:200,atk:17,xp:120,c:150,l:9});
CV('Wolf','Fenrir',[['#9296aa','#e8f0ff'],['#6c6f7c','#b8c8e8'],['#f2b705','#4ac8ff']],{b:1,hp:420,atk:23,xp:280,c:380,l:11});
CV('Skeleton','Skeleton Knight',[['#efe9d6','#9aa6b8'],['#f6f1e2','#b8c4d6']],{hp:80,atk:15,xp:40,c:40,l:11});
CV('Skeleton','Bone Lord',[['#efe9d6','#e8c860'],['#f6f1e2','#f4e08a']],{b:1,hp:260,atk:20,xp:160,c:200,l:12,x:CR});
CV('Orc','Orc Berserker',[['#6aa043','#a04a3a']],{hp:120,atk:20,xp:60,c:60,l:14});
CV('Orc','Orc Emperor',[['#6aa043','#3a2a4a']],{b:1,hp:700,atk:34,xp:420,c:600,l:16,x:'<path d="M20 44C20 10 80 10 80 44z" fill="#ffcc33"/>'});
CV('Golem','Obsidian Golem',[['#8f8fa0','#5a4a7a'],['#7a7a8a','#4a3a6a'],['#a0a0b2','#6a5a8a']],{hp:260,atk:28,xp:100,c:120,l:18});
CV('Golem','Crystal Golem',[['#8f8fa0','#6bc8ff'],['#7a7a8a','#4aa8e0'],['#a0a0b2','#9ae0ff']],{b:1,hp:520,atk:34,xp:300,c:360,l:19});
CV('Golem','Titan Colossus',[['#8f8fa0','#ffd84d'],['#7a7a8a','#d9b020'],['#a0a0b2','#ffe680']],{b:1,hp:1100,atk:44,xp:600,c:900,l:21});
CV('Imp','Flame Imp',[['#e04a3e','#ff8a2a'],['#b33030','#d96a1a']],{hp:260,atk:38,xp:140,c:160,l:22});
CV('Imp','Infernal Duke',[['#e04a3e','#a01a4a'],['#b33030','#701036'],['#8a2020','#4a0a2a']],{b:1,hp:800,atk:46,xp:700,c:1100,l:23});
Object.assign(DROPS,{'Ooze Titan':[['gel',1,8,12],['core',1,2,3],['silver',1,2,3]],'Goblin Chief':[['hide',1,3,4],['iron',1,2,3]],'Goblin King':[['hide',1,5,6],['bone',1,4,5],['core',1,2,2],['silver',1,2,3]],'Broodmother':[['silk',1,4,5],['fang',1,3,3]],'Arachne Queen':[['silk',1,8,10],['fang',1,5,5],['core',1,3,3],['gold',1,2,3]],'Alpha Wolf':[['fur',1,4,5],['fang',1,4,4]],'Fenrir':[['fur',1,8,10],['fang',1,6,6],['core',1,3,3],['silver',1,4,5]],'Bone Lord':[['bone',1,6,8],['core',1,2,2],['silver',1,3,4]],'Orc Emperor':[['horn',1,5,6],['hide',1,8,8],['iron',1,6,8],['gold',1,3,4],['core',1,3,3]],'Crystal Golem':[['core',1,4,5],['silver',1,4,5],['iron',1,6,6]],'Titan Colossus':[['core',1,6,6],['gold',1,6,8],['mithril',1,3,4]],'Infernal Duke':[['horn',1,5,5],['wisp',1,5,5],['core',1,4,4],['gold',1,5,5]]});
const TR={Slime:{ab:'slow'},'Blue Slime':{ab:'slow'},'Acid Slime':{ab:'poison'},Rat:{ab:'bleed',dodge:.1},Bat:{dodge:.2,ab:'drain'},'Goblin Shaman':{ab:'burn'},'Goblin Archer':{dodge:.15,ab:'bleed'},Spider:{ab:'poison'},'Giant Spider':{ab:'poison',def:4},Broodmother:{ab:'poison',heavy:1},'Arachne Queen':{ab:'poison',heavy:1},Wolf:{ab:'bleed'},'Dire Wolf':{ab:'bleed',def:3},'Alpha Wolf':{ab:'bleed',heavy:1},Fenrir:{ab:'bleed',heavy:1,dodge:.1},Skeleton:{def:6},'Skeleton Knight':{def:10},Ghost:{dodge:.35,ab:'drain'},'Bone Lord':{def:10,heavy:1},Lich:{ab:'drain',heavy:1,dodge:.1},Orc:{def:4,heavy:1},'Orc Berserker':{ab:'bleed',heavy:1},'Orc Warlord':{def:8,heavy:1},'Orc Emperor':{def:12,heavy:1},Troll:{reg:.01,heavy:1},Golem:{def:14,heavy:1},'Obsidian Golem':{def:18,heavy:1},'Crystal Golem':{def:16,heavy:1},'Titan Colossus':{def:22,heavy:1},Imp:{dodge:.1,ab:'burn'},'Flame Imp':{dodge:.1,ab:'burn'},'Infernal Duke':{ab:'burn',heavy:1},Dragon:{ab:'burn',heavy:1,def:10},'Slime King':{ab:'slow',heavy:1},'Ooze Titan':{ab:'slow',heavy:1,reg:.005},'Goblin Chief':{heavy:1},'Goblin King':{heavy:1,ab:'burn'}};
const DG=[
 {id:'slime',n:'Slime Cave',l:1,mons:['Slime','Blue Slime','Acid Slime'],elite:'Acid Slime',boss:'Slime King',final:'Ooze Titan',dm:1,bm:1,ch:60},
 {id:'goblin',n:'Goblin Warren',l:3,mons:['Goblin','Rat','Goblin Shaman','Goblin Spear'],elite:'Goblin Shaman',boss:'Goblin Chief',final:'Goblin King',dm:1.3,bm:1,ch:140},
 {id:'spider',n:'Spider Nest',l:5,mons:['Bat','Spider','Rat'],elite:'Giant Spider',boss:'Broodmother',final:'Arachne Queen',dm:1.6,bm:1,ch:240},
 {id:'wolf',n:'Wolf Forest',l:8,mons:['Wolf','Dire Wolf','Goblin Archer'],elite:'Dire Wolf',boss:'Alpha Wolf',final:'Fenrir',dm:1.8,bm:1,ch:400},
 {id:'crypt',n:'Haunted Crypt',l:11,mons:['Skeleton','Ghost','Bat'],elite:'Skeleton Knight',boss:'Bone Lord',final:'Lich',dm:2.2,bm:1,fm:.8,ch:650},
 {id:'orc',n:'Orc Stronghold',l:14,mons:['Orc','Troll','Goblin Archer'],elite:'Orc Berserker',boss:'Orc Warlord',final:'Orc Emperor',dm:2.6,bm:2.4,ch:950},
 {id:'golem',n:'Crystal Mines',l:18,mons:['Golem','Imp','Troll'],elite:'Obsidian Golem',boss:'Crystal Golem',final:'Titan Colossus',dm:3,bm:1,ch:1400},
 {id:'inferno',n:'Dragon Inferno',l:22,mons:['Imp','Troll','Dire Wolf'],elite:'Flame Imp',boss:'Infernal Duke',final:'Dragon',dm:3.4,bm:1,fm:4,ch:2200}
];
const DGR=['f','f','e','r','b','f','z'];
const DGN={f:'Monsters',e:'Elite guard',r:'Campfire',b:'Dungeon boss',z:'Greater boss and treasure'};
const U=(k,n,ic,d,base,max,col)=>({k,n:n.split('|'),ic,d,max:max||6,col,cost:[...Array(max||6)].map((_,i)=>Math.round(base*Math.pow(1.6,i)))});
const UPG=[
 ['Farming',[U('can','Wooden Can|Copper Can|Sprinkler','can','Crops grow 8% faster',30),U('fert','Hand Spreader|Wheel Spreader|Mist Sprayer','sprout','+6% double harvest chance',50),U('scare','Scarecrow|Guardian Scarecrow|Golden Scarecrow','sprout','+4% crop sale value',60),U('plow','Hoe|Plow|Tractor','pick','Plots cost 8% less to unlock',70)]],
 ['Husbandry',[U('trough','Feed Trough|Grain Trough|Auto Feeder','milk','Animals produce 10% faster',60),U('stalls','Extra Stall|Big Stall','egg','+1 barn stall',120,8),U('brush','Brush|Grooming Kit|Spa Corner','wool','+6% double goods chance',70),U('bin','Manure Pile|Compost Bin|Fermenter','manure','+8% manure chance',50)]],
 ['Fishing',[U('rod','Bamboo Rod|Steel Rod|Master Rod','rod','Bigger fish targets, +4% extra fish',40),U('bait','Worms|Bait Box|Chum Barrel','bobber','Fish appear 8% faster',45),U('lure','Feather Lure|Glow Lure|Deep Lure','fish','Bigger fish show up more',65,5)]],
 ['Mining',[U('gloves','Work Gloves|Leather Gloves|Steel Gauntlets','pick','Rocks break 8% easier',40),U('lantern','Torch|Lantern|Crystal Lamp','ore','+6% double ore chance',55,6,'#ffcc33'),U('cart','Wheelbarrow|Mine Cart|Rail Cart','ingot','+4% ore sale value',60,6,'#c9d6e4')]],
 ['Smithing',[U('tongs','Tongs|Steel Tongs|Master Tongs','hammer','Recipes use 7% less material',70,6,'#c9d6e4'),U('bellows','Bellows|Twin Bellows|Dragon Bellows','anvil','+6% chance to forge 2 items',80),U('furnace','Forge|Blast Furnace|Magma Furnace','ingot','+4% gear sale value',90,6,'#ff9a3d')]],
 ['Alchemy',[U('cauldron','Pot|Cauldron|Grand Cauldron','cauldron','+8% double brew chance',70),U('alembic','Flask Rack|Alembic|Distillery','flask','Potion effects last 20% longer',60,6,'#7ad8ff'),U('pouch','Pouch|Satchel|Bag of Holding','sack','8% chance ingredients are kept',80,6,'#b8803f')]],
 ['Combat',[U('charm','Clover|Lucky Charm|Fate Charm','charm','+3% critical chance',60),U('boots','Sandals|Swift Boots|Wind Boots','boots','Attack 6% faster',50),U('whet','Whetstone|Honing Kit|Master Hone','sword','+8% damage',55,6,'#c9d6e4'),U('vigor','Bandage|Tonic Belt|Vital Charm','potion','+10 max HP',55,6,'#ff6b8a'),U('plating','Padding|Plating|Aegis','armor','+4% defense',65,6,'#c9d6e4')]],
 ['Trading',[U('wagon','Handcart|Wagon|Caravan','wagon','+10% caravan haul size',60),U('horse','Mule|Horse|Warhorse','boots','Caravans return 8% faster',70),U('guard','Hired Hand|Guard|Bodyguard','sword','Bandits strike caravans less often',80,6,'#c9d6e4'),U('ledger','Notebook|Ledger|Guild Seal','coin','+3% coins from caravans',90)]],
 ['General',[U('ring','Copper Band|Silver Band|Merchant Ring','ring','+8% coins from sales and loot',80)]]
];
UPG[6][1].push(U('fury','Ember|Blaze|Inferno','sword','+6% damage',90,6,'#ff9a3d'),U('pierce','Needle|Awl|Piercer','rapier','+5% chance a hit deals true damage',100,6,'#fff'),U('regen','Moss|Bloom|Lifebloom','herb','Regenerate 0.4 HP/s per star in fights',90,6,'#6fd45a'));
UPG[3][1].push(U('gemeye','Loupe|Prism|Third Eye','core','+0.5% arcane gem chance, fewer ambushes',110,6,'#b36bff'));
UPG.splice(8,0,['Woodcutting',[U('axeup','Hatchet|Felling Axe|Giant Axe','axe','Trees fall 8% faster',45,6,'#c9d6e4'),U('sawup','Hand Saw|Bow Saw|Sawmill','hammer','+6% bonus logs per star',60,6,'#b8803f')]]);
const N=12,START=6;
let S={coins:10,sel:0,fsel:0,asel:0,plots:[],barn:Array(12).fill(null),xp:Object.fromEntries(SK.map(k=>[k,0])),inv:{},items:{w_rusty:1,a_cloth:1,p_stone:1},eq:{w:'w_rusty',a:'a_cloth',p:'p_stone'},up:Object.fromEntries(UPG.flatMap(g=>g[1].map(u=>[u.k,0]))),buff:{},hp:30,sh:0,tab:'farm',mute:false,kills:0,dg:null,clears:{},trade:{at:'green',to:null,from:null,t0:0,dur:0,pr:null},cost:{},region:'meadow',story:{kills:0,bosses:0,harvests:0,quests:{},points:0,skills:{power:0,ward:0,focus:0,fortune:0},relics:[]}};
const S_DEFAULTS=JSON.parse(JSON.stringify(S));
// Independent campaign slots. Slot 1 also imports the previous single-save format.
const SAVE_SLOT_COUNT=5;
let activeSaveSlot=Math.max(1,Math.min(SAVE_SLOT_COUNT,Number(localStorage.getItem('tinyacre-active-slot')||1)));
const slotKey=n=>'tinyacre-save-slot-'+n;
const readSlot=n=>{try{return localStorage.getItem(slotKey(n))||(n===1?localStorage.getItem('tinyacre-save'):null)}catch(e){return null}};
let hasSave=false;
try{const legacy=readSlot(activeSaveSlot);const o=JSON.parse(legacy||'null');
 if(o&&o.plots&&o.plots.length===N){hasSave=true;
  if(!o.items){o.items={};Object.keys(o.own||{}).forEach(k=>o.items[k]=1)}
  o.inv=o.inv||{};if(o.inv.potion){o.inv.pot_hp1=(o.inv.pot_hp1||0)+o.inv.potion;delete o.inv.potion}
  S={...S,...o,xp:{...S.xp,...o.xp},inv:{...o.inv},items:{...S.items,...o.items},eq:{...S.eq,...o.eq},up:{...S.up,...o.up},buff:{...(o.buff||{})},barn:(o.barn&&o.barn.length>=8?o.barn.concat(Array(Math.max(0,12-o.barn.length)).fill(null)):S.barn),trade:{...S.trade,...(o.trade||{})},cost:{...(o.cost||{})},region:o.region||'meadow',story:{kills:0,bosses:0,harvests:0,quests:{},points:0,skills:{power:0,ward:0,focus:0,fortune:0},relics:[],...(o.story||{}),skills:{power:0,ward:0,focus:0,fortune:0,...((o.story||{}).skills||{})},quests:{...((o.story||{}).quests||{})},relics:[...(((o.story||{}).relics)||[])]}}}}catch(e){}
if(!S.plots.length)for(let i=0;i<N;i++)S.plots.push({open:i<START,c:-1,at:0,d:0,w:false});
function save(){try{mineSync()}catch(e){}try{const data=JSON.stringify(S);localStorage.setItem(slotKey(activeSaveSlot),data);if(activeSaveSlot===1)localStorage.setItem('tinyacre-save',data)}catch(e){}}
function freshCampaign(){const x=JSON.parse(JSON.stringify(S_DEFAULTS));x.cls=null;x.hp=30;x.sh=0;x.plots=Array.from({length:N},(_,i)=>({open:i<START,c:-1,at:0,d:0,w:false}));x.mines={};x.mineExp={cave:0,depth:{},resources:{},selected:false,encounter:null,pendingAdvance:false};return x}
function hydrateCampaign(n){let x=freshCampaign(),raw=readSlot(n);try{const o=JSON.parse(raw||'null');if(o&&o.plots&&o.plots.length===N){if(!o.items){o.items={};Object.keys(o.own||{}).forEach(k=>o.items[k]=1)}o.inv=o.inv||{};if(o.inv.potion){o.inv.pot_hp1=(o.inv.pot_hp1||0)+o.inv.potion;delete o.inv.potion}x={...x,...o,xp:{...x.xp,...o.xp},inv:{...o.inv},items:{...x.items,...o.items},eq:{...x.eq,...o.eq},up:{...x.up,...o.up},buff:{...(o.buff||{})},barn:(o.barn&&o.barn.length>=8?o.barn.concat(Array(Math.max(0,12-o.barn.length)).fill(null)):x.barn),trade:{...x.trade,...(o.trade||{})},cost:{...(o.cost||{})},region:o.region||'meadow',story:{...x.story,...(o.story||{}),skills:{...x.story.skills,...((o.story||{}).skills||{})},quests:{...((o.story||{}).quests||{})},relics:[...(((o.story||{}).relics)||[])]}}}}catch(e){}return x}
function activateCampaignSlot(n){
  const safe=(label,fn)=>{try{if(typeof fn==='function')fn()}catch(err){console.error('[RPG slot load] '+label,err)}};
  safe('save current slot',save);
  activeSaveSlot=Math.max(1,Math.min(SAVE_SLOT_COUNT,Number(n)||1));
  try{localStorage.setItem('tinyacre-active-slot',String(activeSaveSlot))}catch(e){}
  S=hydrateCampaign(activeSaveSlot);hasSave=!!readSlot(activeSaveSlot);
  // Always enter through the stable Farm screen; saved tab names can refer to removed/renamed views.
  S.tab='farm';
  fight=null;cd=0;ecd=0;eatk=0;tele=0;mom=0;focus=false;guardT=0;slowT=0;dot={t:0,dps:0,k:''};dotAcc=0;
  safe('clear combat effects',()=>{school.forEach(x=>x.el&&x.el.remove());school=[];combo=0;lastC=0;mgrid=null});
  // Optional extension initializers must never prevent the core campaign from opening.
  safe('Mine Expedition loader',()=>{if(window.__loadMineExpedition)window.__loadMineExpedition()});
  safe('mine state loader',()=>{if(typeof mineLoad==='function')mineLoad()});
  safe('wood/tree initializer',()=>{if(typeof newTree==='function')newTree()});
  safe('player stats',()=>{if(S.hp<=0)S.hp=maxHp();S.sh=Math.min(S.sh,maxSh())});
  safe('title screen refresh',showIntro);
  safe('main render',render);
  safe('HUD refresh',upd);
}
function beginFreshCampaign(){S=freshCampaign();fight=null;cd=0;ecd=0;eatk=0;tele=0;mom=0;focus=false;guardT=0;slowT=0;dot={t:0,dps:0,k:''};dotAcc=0;school.forEach(x=>x.el&&x.el.remove());school=[];combo=0;lastC=0;mgrid=null;if(window.__resetMineExpedition)window.__resetMineExpedition();if(typeof mineLoad==='function')mineLoad();if(typeof newTree==='function')newTree();S.hp=maxHp();S.sh=maxSh();hasSave=true;eraseArm=false;save();$('intro').hidden=true;render();upd();say('A new adventure begins! Your selected slot has been reset.')}
const $=id=>document.getElementById(id);
const rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const lvl=x=>1+Math.floor(Math.sqrt(x/10));
const L=k=>lvl(S.xp[k]);
const inv=k=>S.inv[k]||0;
const cnt=id=>S.items[id]||0;
const on=k=>(S.buff[k]||0)>Date.now();
const item=k=>IT.find(i=>i.id===S.eq[k])||IT.find(i=>i.id==={w:'w_rusty',a:'a_cloth',p:'p_stone'}[k]);
const CAB={mul:()=>1,add:()=>0,out:d=>d,fdef:()=>1,match:c=>!!(c.k&&(item('w').k||'')===c.k),dodge:()=>false,inc:d=>d,hurt(){},hit(){},tick(){},reset(){},kill(){},use:()=>false,btn:()=>'',lines:()=>[]};
const maxHp=()=>20+2*L('combat')+item('a').hp+10*S.up.vigor+cm('hp')+CAB.add('hp')+2*(S.story?.skills?.ward||0);
const maxSh=()=>Math.round(item('a').sh*CAB.mul('sh'));
const defn=()=>(item('a').def+(on('def')?8:0))*(1+.04*S.up.plating)*cm('def')*CAB.mul('def')*(1+.04*(S.story?.skills?.ward||0));
const wInt=()=>Math.max(.25,cm('spd')*item('w').sp*(1-.06*S.up.boots)/(on('spd')?1.3:1));
const critCh=()=>Math.min(80,cm('cr')+item('w').cr+(item('a').cr||0)+3*S.up.charm+L('combat')/10+(on('crit')?20:0)+2*(S.story?.skills?.focus||0));
const atkPow=()=>cm('atk')*(1+.06*S.up.fury)*(item('w').atk+L('combat')/10)*(1+.08*S.up.whet)*(on('atk')?1.35:1)*(1+.035*(S.story?.skills?.power||0))*CAB.mul('atk');
const critMul=()=>2+.05*L('combat')+CAB.add('cdm');
const catOf=id=>ORES.some(o=>o.id===id)?'mine':FISH.some(f=>f.id===id)?'fish':['egg','feather','wool','milk','honey','manure','hay','clover','corn','truffle','gmilk','duckegg','pelt','llama'].includes(id)?'barn':id==='herb'?'farm':'combat';
const earn=(n,k)=>Math.round(n*(1+.08*S.up.ring)*(1+.005*(k?L(k):0))*(1+.04*(S.story?.skills?.fortune||0)));
const nm=id=>(MATS[id]||ORES.find(o=>o.id===id)||FISH.find(f=>f.id===id)||ALLR.find(p=>p.id===id)||FERTS.find(f=>f.id===id)||TRADE.find(t=>t.id===id)||{}).n||id;
let oIcon=(o,cl)=>icon('ore',o.col,cl);
let fIcon=(f,cl)=>icon(f.ic,f.col,cl);
let iIcon=(it,cl)=>icon(it.a,TC[it.col],cl);
const MINE_ART_IDS={copper:1,iron:1,silver:1,gold:1,mithril:1,coal:1,crystal:1,obsidian:1,agem:1,stone:1,tin:1};
let mineIconUid=0;
const mineIcon=(id,cl)=>window.__oreArt('%s'.replace('%s',id)).replace(/oreSpec([a-z]+)/g,'oreSpec$1_i'+(++mineIconUid)).replace('<svg ','<svg class="'+(cl||'ic')+' ore-art" ');
const gIcon=(id,cl)=>{if(window.__oreArt&&MINE_ART_IDS[id]&&(MATS[id]||ORES.some(o=>o.id===id)))return mineIcon(id,cl);const m=MATS[id];if(m)return icon(m.ic,m.col,cl);const o=ORES.find(x=>x.id===id);if(o)return oIcon(o,cl);const f=FISH.find(x=>x.id===id);if(f)return fIcon(f,cl);const p=POTS.find(x=>x.id===id);if(p)return icon('flask',p.col,cl);const q=FERTS.find(x=>x.id===id);if(q)return icon(q.id==='manure'?'manure':'sack',q.col,cl);const t=TRADE.find(x=>x.id===id);return icon(t.ic,t.col,cl)};
const infoText=id=>{const t=TRADE.find(x=>x.id===id);return nm(id)+': '+inv(id)+' owned'+(t?', trade good, base price '+t.b:VAL[id]?', sells for about '+earn(VAL[id],catOf(id))+' each':'')};
let msgT;
function say(s){$('msg').textContent=s;clearTimeout(msgT);msgT=setTimeout(()=>{$('msg').textContent=''},3500)}

