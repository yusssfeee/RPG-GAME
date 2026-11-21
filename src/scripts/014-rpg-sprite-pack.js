
/* ============================================================
   Sprite pack (from the supplied reference sheets) + new pond fishing
   ============================================================ */
(function(){
'use strict';
const SPR={"ore_copper": "{{BLOB:b0128.webp}}", "ore_iron": "{{BLOB:b0129.webp}}", "ore_silver": "{{BLOB:b0130.webp}}", "ore_gold": "{{BLOB:b0131.webp}}", "ore_mithril": "{{BLOB:b0132.webp}}", "ore_teal": "{{BLOB:b0133.webp}}", "ore_coalgem": "{{BLOB:b0134.webp}}", "bar_iron": "{{BLOB:b0135.webp}}", "bar_copper": "{{BLOB:b0136.webp}}", "bar_dark": "{{BLOB:b0137.webp}}", "bar_steel": "{{BLOB:b0138.webp}}", "bar_gold": "{{BLOB:b0139.webp}}", "bar_silver": "{{BLOB:b0140.webp}}", "bar_blue": "{{BLOB:b0141.webp}}", "bar_green": "{{BLOB:b0142.webp}}", "bar_purple": "{{BLOB:b0143.webp}}", "gem_ruby": "{{BLOB:b0144.webp}}", "gem_sapphire": "{{BLOB:b0145.webp}}", "gem_arcane": "{{BLOB:b0146.webp}}", "gem_star": "{{BLOB:b0147.webp}}", "gem_focus": "{{BLOB:b0148.webp}}", "gem_fire": "{{BLOB:b0149.webp}}", "gem_core": "{{BLOB:b0150.webp}}", "gem_diamond": "{{BLOB:b0151.webp}}", "pick": "{{BLOB:b0152.webp}}", "pick2": "{{BLOB:b0153.webp}}", "hammer": "{{BLOB:b0154.webp}}", "lantern": "{{BLOB:b0155.webp}}", "barrel": "{{BLOB:b0156.webp}}", "lantern2": "{{BLOB:b0157.webp}}", "axe_min": "{{BLOB:b0158.webp}}", "dynamite": "{{BLOB:b0159.webp}}", "crystal": "{{BLOB:b0160.webp}}", "crystal2": "{{BLOB:b0161.webp}}", "crystal_p": "{{BLOB:b0162.webp}}", "pearl": "{{BLOB:b0163.webp}}", "flame": "{{BLOB:b0164.webp}}", "scale": "{{BLOB:b0165.webp}}", "nugget": "{{BLOB:b0166.webp}}", "potion": "{{BLOB:b0167.webp}}", "backpack": "{{BLOB:b0168.webp}}", "backpack2": "{{BLOB:b0169.webp}}", "rope": "{{BLOB:b0170.webp}}", "stone": "{{BLOB:b0171.webp}}", "wood": "{{BLOB:b0172.webp}}", "ice": "{{BLOB:b0173.webp}}", "coal": "{{BLOB:b0174.webp}}", "obsidian": "{{BLOB:b0175.webp}}", "gel": "{{BLOB:b0176.webp}}", "compass": "{{BLOB:b0177.webp}}", "map": "{{BLOB:b0178.webp}}", "gloves": "{{BLOB:b0179.webp}}", "wheat": "{{BLOB:b0180.webp}}", "corn": "{{BLOB:b0181.webp}}", "potato": "{{BLOB:b0182.webp}}", "carrot": "{{BLOB:b0183.webp}}", "turnip": "{{BLOB:b0184.webp}}", "radish": "{{BLOB:b0185.webp}}", "pumpkin": "{{BLOB:b0186.webp}}", "tomato": "{{BLOB:b0187.webp}}", "cabbage": "{{BLOB:b0188.webp}}", "strawberry": "{{BLOB:b0189.webp}}", "grapes": "{{BLOB:b0190.webp}}", "apple": "{{BLOB:b0191.webp}}", "rice": "{{BLOB:b0192.webp}}", "hops": "{{BLOB:b0193.webp}}", "garlic": "{{BLOB:b0194.webp}}", "axe": "{{BLOB:b0195.webp}}", "can": "{{BLOB:b0196.webp}}", "sickle": "{{BLOB:b0197.webp}}", "trowel": "{{BLOB:b0198.webp}}", "log": "data:image/webp;base64,UklGRrQFAABXRUJQVlA4WAoAAAAQAAAAXwAAXwAAQUxQSN4BAAABkENrt2k7/1qxbdtOOtvs7KSyU9m2bdtWZdu2jbvXCs87Z9wVY0TEBOD7kZg8WkQEz0zWEIBUBePH+zx+3PRpASZTCBwl2eBbu7+888SGUgwwmUGMOP2W7X2uXu8NqJMDYCMIaLTolao6j6LqDjRPABsJUerfVXFO1KuI6PtlLRKBLIjW4rGGNOLiRF/WtoBR/YE69VVCuj4OyID26tRnkQcVwOFGiL5EfFOnw0HhxshxRSWACWRAgQeBjIIB+e8HILqpiG3qdDGBbFth3jLzln8HFXhgXY7LgciysCPEWqfOv5CuNSDK8gBE7vQkhDkh6ooAnE6JZt1YWDeOzMOvoOXmrbYu0iTbwGip/lvR7IdmrG2i75qBbXtZ3oQWgVQ2odozFf8qGUDIdNa6DP99kPGcdamPqLMt8gzbQBhj3ri/OVS2YWwAL8rbMCGAN3Vs6ObEJxXpCAo/RuVXKv44fVAUbEGJR+KPOF0SFxR+hESbNSQREye6LiMIFlLeLarivIkTDc3KACMJheY+VhXnnBNxTkRU9UDzBGAjwIhRqdv+kHo9Oa5JdoBgJgHItvnQjj07L17ds6Z7t1bZADDBUGKibMnjxo+bK1/8WPicCdYSvk7MBIuZiIiZCN+ZVlA4ILADAAAQFACdASpgAGAAPkkijkUioiESOzWsKASEsYBqVsme18uPgD3VZ6XnbsYA63TyDaxq2XLEeX3E12yHph3GPoOf07/kem5pv+kv+H7h38b/qP+14AD9SSvkZTAsWwt4D10Rg56BPsM+Zzo8k03ZUw4laask7CV16ELns0debRFN1EsmU6e/K5ijMLKe7zNGLvRWu3mu1vj2dkgtSQGL/ghYY944RRbXHFgAAP7+Btiv4i/c5o6gBqEc5OuGs15nzHgFxtJEUQyVEvzNQ27unym39TRjqhZN7w1I7vuMpEyNhvAdtu4m6pi8eh8INQwJgf/J45/PZ+lHIqtvB77v0Iqv7Gk8eu99Ctnc7exJF+JATN1OGPNE/huW0YBXgpZahIc+KX+UL0NAa2rpSMyv9wZdhmL0UIzq3p6j1/XP7D9SprgyAHzfDsq//7SiuTZWe13pu9w838nQHm+mif6cSC6ZCFY7tLL4BiDv0GvsU01Y1b6bJRyoSsD+XENAJaacmP0lDKrIO8nKPBEPR+gVLz0/gINLwXVjZP/FrX3HpTGHJu/HNeV/BU+gjB/6F///kMf/yOH//kM5nCOHnrp0SZn3Zf/00v6fGf0f2//nHh12HeqL2oSJfw7Z9FRXlw6lMRvNwWgiUQ+99Lf8kisxxP27vK/krWl/dQS40oCieaDol0mD8pj3nflBLDXA9xaty3Nc+KO4c89vBMY7kYBltb/o8/NA/MXjFO+p9B4cUDRMOdoe9vzfh//43skQeGn7+TdZ8p/zfn/47YqEXvpW6PtnIh6Uin1lj9xSAdjj7o3+lyg13skf88gWPs4a/KDtD0RpDNxZQ/J+RO5m9tuFFKyAzbnMFaue+spG4H4VAaL/7Ki3BTABToNORE3Zrs5XunTf4UYsalWcKQHgDvP7tNbL5x0nDrnESAWCR/9WQTHWf+T7de9/Kp+FSLcOZwBtw4/r6gWL/jNTp840ePcKMgB4G5g30dmyiirMjfR5CYBCvYG3Q8Ir/sAqs1oW4YrhO+faLhMSmqhBBWrnDIBykw7qgW6GNEOdXLQjCQinkrIeO5WufxfFnoUiNVVKnyFQrvEwEnru5KGnA7fuR+mBMSX3+e8QfnisHKWc2vF98lbGVc5vKwogMOXDYEpeWuNj6S23uP5ov8wUrY/9iaN73UK+RUyOfJgPRyX7kyJb26Wsf0esBV9FzIdNcz4zGwE5ze+K3z48b7EZA9uPcWQwMVtA1FgWNxepcEMlj0h774PgAA==", "hammer2": "{{BLOB:b0199.webp}}", "wheatsack": "{{BLOB:b0200.webp}}", "growsack": "{{BLOB:b0201.webp}}", "nails": "{{BLOB:b0202.webp}}", "moneybag": "{{BLOB:b0203.webp}}", "gate2": "{{BLOB:b0204.webp}}", "bucket2": "{{BLOB:b0205.webp}}", "fish": "{{BLOB:b0206.webp}}", "hoe": "{{BLOB:b0207.webp}}", "shovel": "{{BLOB:b0208.webp}}", "fork": "{{BLOB:b0209.webp}}", "bucket": "{{BLOB:b0210.webp}}", "seedsack": "{{BLOB:b0211.webp}}", "gloves2": "{{BLOB:b0212.webp}}", "brush": "{{BLOB:b0213.webp}}", "egg": "{{BLOB:b0214.webp}}", "milk": "{{BLOB:b0215.webp}}", "sheep": "{{BLOB:b0216.webp}}", "honey": "{{BLOB:b0217.webp}}", "chicken": "{{BLOB:b0218.webp}}", "fence": "{{BLOB:b0219.webp}}", "gate": "{{BLOB:b0220.webp}}", "scarecrow": "{{BLOB:b0221.webp}}", "hay": "{{BLOB:b0222.webp}}", "wheelbarrow": "{{BLOB:b0223.webp}}", "basket": "{{BLOB:b0224.webp}}", "jam": "{{BLOB:b0225.webp}}", "butter": "{{BLOB:b0226.webp}}", "spinwheel": "{{BLOB:b0227.webp}}", "sun": "{{BLOB:b0228.webp}}", "m_slime_blue": "{{BLOB:b0229.webp}}", "m_slime_green": "{{BLOB:b0230.webp}}", "m_fire": "{{BLOB:b0231.webp}}", "m_drake": "{{BLOB:b0232.webp}}", "m_minotaur": "{{BLOB:b0233.webp}}", "m_knight": "{{BLOB:b0234.webp}}", "m_crystal": "{{BLOB:b0235.webp}}", "m_lizard": "{{BLOB:b0236.webp}}", "m_banshee": "{{BLOB:b0237.webp}}", "m_spider": "{{BLOB:b0238.webp}}", "m_rat": "{{BLOB:b0239.webp}}", "m_goblin": "{{BLOB:b0240.webp}}", "m_bear": "{{BLOB:b0241.webp}}", "m_orc_hood": "{{BLOB:b0242.webp}}", "m_hobgob": "{{BLOB:b0243.webp}}", "m_bull": "{{BLOB:b0244.webp}}", "m_goat": "{{BLOB:b0245.webp}}", "m_lion": "{{BLOB:b0246.webp}}", "m_wolf": "{{BLOB:b0247.webp}}", "m_orc": "{{BLOB:b0248.webp}}", "m_troll": "{{BLOB:b0249.webp}}", "m_demon": "{{BLOB:b0250.webp}}", "m_vampire": "{{BLOB:b0251.webp}}", "m_elf": "{{BLOB:b0252.webp}}", "m_wyvern": "{{BLOB:b0253.webp}}", "m_firedrake": "{{BLOB:b0254.webp}}", "m_griffin": "{{BLOB:b0255.webp}}", "m_lich": "{{BLOB:b0256.webp}}", "m_zombie": "{{BLOB:b0257.webp}}", "m_orcknight": "{{BLOB:b0258.webp}}", "m_skeleton": "{{BLOB:b0259.webp}}", "m_necro": "{{BLOB:b0260.webp}}", "m_ghost": "{{BLOB:b0261.webp}}", "m_bird": "{{BLOB:b0262.webp}}", "m_snake": "{{BLOB:b0263.webp}}", "m_mimic": "{{BLOB:b0264.webp}}", "m_golem": "{{BLOB:b0265.webp}}", "m_bigknight": "{{BLOB:b0266.webp}}", "m_bigdragon": "{{BLOB:b0267.webp}}", "m_biglion": "{{BLOB:b0268.webp}}", "f_slime": "{{BLOB:b0269.webp}}", "f_goblin": "{{BLOB:b0270.webp}}", "f_orc": "{{BLOB:b0271.webp}}", "f_dragon": "{{BLOB:b0272.webp}}", "f_shadowwolf": "{{BLOB:b0273.webp}}", "f_griffin": "{{BLOB:b0274.webp}}", "f_vampire": "{{BLOB:b0275.webp}}", "f_minotaur": "{{BLOB:b0276.webp}}", "f_bear": "{{BLOB:b0277.webp}}", "f_skeleton": "{{BLOB:b0278.webp}}", "f_kobold": "{{BLOB:b0279.webp}}", "f_wraith": "{{BLOB:b0280.webp}}", "hero_face": "{{BLOB:b0281.webp}}"};
const img=(k,f,s)=>'<image href="'+SPR[k]+'" x="0" y="0" width="'+(s||64)+'" height="'+(s||64)+'" preserveAspectRatio="xMidYMid meet"'+(f?' style="filter:'+f+'"':'')+'/>';
const hueOf=h=>{if(!h||h[0]!=='#')return null;let x=h.slice(1);if(x.length===3)x=x.split('').map(c=>c+c).join('');const r=parseInt(x.slice(0,2),16)/255,g=parseInt(x.slice(2,4),16)/255,b=parseInt(x.slice(4,6),16)/255;const mx=Math.max(r,g,b),mn=Math.min(r,g,b),d=mx-mn;if(d<.08)return null;let H=mx===r?((g-b)/d)%6:mx===g?(b-r)/d+2:(r-g)/d+4;H*=60;return H<0?H+360:H};
/* every sprite is also reachable as icon('spr:name') */
Object.keys(SPR).forEach(k=>{P['spr:'+k]=()=>img(k)});
const alias=(names,k,f)=>names.forEach(n=>{P[n]=()=>img(k,f)});
alias(['pick'],'pick');alias(['axe'],'axe');alias(['hammer'],'hammer2');alias(['can'],'can');
alias(['bag'],'backpack');alias(['sack'],'wheatsack');alias(['jar'],'jam');alias(['wagon'],'wheelbarrow');
alias(['egg'],'egg');alias(['milk'],'milk');alias(['honey'],'honey');alias(['wool'],'sheep');
alias(['gel'],'gel');alias(['stone'],'stone');alias(['coal'],'coal');alias(['crystal'],'crystal');alias(['obsidian'],'obsidian');
alias(['arcane-gem'],'gem_arcane');alias(['starstone'],'gem_star');alias(['focus'],'gem_focus');alias(['pearl'],'pearl');
alias(['core'],'gem_core');alias(['scale'],'scale');alias(['wisp'],'flame');
alias(['copper-bar','cbar','copper-ingot'],'bar_copper');alias(['iron-bar','ibar','iron-ingot'],'bar_iron');
alias(['silver-bar','sbar','silver-ingot'],'bar_silver');alias(['gold-bar','gbar','gold-ingot'],'bar_gold');
alias(['mithril-bar','mbar','mithril-ingot'],'bar_blue');alias(['ingot','steel','steel-ingot'],'bar_steel');
alias(['obsidian-alloy','obsal'],'bar_dark');alias(['starsteel','starsteel-ingot'],'bar_purple');
alias(['oak-log'],'wood');alias(['birch-log'],'wood','saturate(.45) brightness(1.35)');alias(['pine-log'],'wood','hue-rotate(70deg) saturate(1.2)');
alias(['ironwood-log'],'wood','grayscale(.85) brightness(.85)');alias(['elderwood-log'],'wood','hue-rotate(210deg) saturate(1.3)');
alias(['wheat'],'wheat');alias(['carrot','radish'],'radish');alias(['pumpkin'],'pumpkin');alias(['tomato'],'tomato');
alias(['herb'],'hops');alias(['hay'],'hay');alias(['chest'],'moneybag');alias(['map','roll'],'map');
const potion=c=>{const h=hueOf(c);return img('potion',h==null?'':'hue-rotate('+Math.round(h-350)+'deg) saturate(1.1)')};
P.flask=potion;P.potion=potion;P.bottle=potion;
/* ores */
oIcon=(o,cl)=>icon(SPR['ore_'+o.id]?'spr:ore_'+o.id:'ore',o.col,cl);
P.ore=c=>{const m={'#e0833f':'ore_copper','#d6e0ec':'ore_iron','#f2f6ff':'ore_silver','#ffcc33':'ore_gold','#7ad8ff':'ore_mithril'}[c];return m?img(m):img('ore_iron')};
/* fish */
const FF={sardine:'',bass:'sepia(.8) saturate(2.6) hue-rotate(-12deg)',carp:'sepia(.75) saturate(1.6)',trout:'hue-rotate(-45deg) saturate(1.9)',salmon:'sepia(1) saturate(3.2) hue-rotate(-28deg)',tuna:'hue-rotate(205deg) brightness(.8) saturate(1.4)',swordfish:'hue-rotate(165deg) saturate(1.3)'};
const fishVec={};['puffer','squid','shark','eel','angler','kraken'].forEach(n=>{fishVec[n]=P[n]});
FISH.forEach(f=>{if(FF[f.id]!==undefined){P['fish:'+f.id]=()=>img('fish',FF[f.id]);f.ic='fish:'+f.id}});
P.fish=()=>img('fish');
fIcon=(f,cl)=>icon(f.ic,f.col,cl);
/* crops with a matching picture */
CROPS.forEach(c=>{if(c.n==='Hay')c.ic='spr:hay';if(c.n==='Corn')c.ic='spr:corn';if(c.n==='Wheat')c.ic='spr:wheat';if(c.n==='Radish')c.ic='spr:radish'});
/* monsters */
const T=(k,f)=>[k,f||''];
function foeSprite(name){
  const n=name.toLowerCase();
  if(/slime|ooze/.test(n)){let f='hue-rotate(-75deg) saturate(1.1)';if(/king/.test(n))f='';else if(/blue/.test(n))f='';else if(/acid/.test(n))f='hue-rotate(-115deg) saturate(1.3)';else if(/frost/.test(n))f='hue-rotate(15deg) brightness(1.25)';else if(/magma/.test(n))f='hue-rotate(165deg) saturate(1.4)';else if(/ooze/.test(n))f='hue-rotate(75deg) brightness(.85)';return T('f_slime',f)}
  if(/^rat/.test(n))return T('m_rat');
  if(/bat/.test(n))return T('m_wyvern',/crimson/.test(n)?'hue-rotate(-30deg) saturate(1.6)':/void/.test(n)?'hue-rotate(230deg)':'');
  if(/frost titan/.test(n))return T('m_troll','hue-rotate(120deg) brightness(1.2)');
  if(/colossus|golem|titan/.test(n)){if(/crystal/.test(n))return T('m_crystal');if(/obsidian/.test(n))return T('m_crystal','brightness(.55) saturate(1.3)');if(/magma/.test(n))return T('m_golem','hue-rotate(-25deg) saturate(2) brightness(1.05)');if(/sand/.test(n))return T('m_golem','sepia(.6) brightness(1.2)');return T('m_golem')}
  if(/imp|duke/.test(n)){if(/duke/.test(n))return T('f_vampire');if(/flame/.test(n))return T('m_fire');if(/shadow/.test(n))return T('m_demon','hue-rotate(240deg)');return T('m_demon')}
  if(/goblin/.test(n)){if(/king|chief/.test(n))return T('m_hobgob');return T('f_goblin',/shaman/.test(n)?'hue-rotate(120deg)':/archer/.test(n)?'hue-rotate(-35deg)':/alchemist/.test(n)?'hue-rotate(60deg) saturate(1.3)':'')}
  if(/spider|arachne|broodmother/.test(n))return T('m_spider',/arachne|brood/.test(n)?'hue-rotate(80deg) saturate(1.4)':'');
  if(/wolf|fenrir|thornfang/.test(n))return T('f_shadowwolf',/frost/.test(n)?'hue-rotate(150deg) brightness(1.35)':/fenrir/.test(n)?'hue-rotate(95deg) saturate(1.5)':/thornfang/.test(n)?'hue-rotate(-60deg) saturate(1.4)':'');
  if(/bone lord/.test(n))return T('m_necro');
  if(/skeleton|bones/.test(n))return T('f_skeleton',/drowned/.test(n)?'hue-rotate(150deg)':'');
  if(/troll/.test(n))return T('m_troll');
  if(/warlord|emperor/.test(n))return T('m_orcknight');
  if(/orc/.test(n))return T(/shaman/.test(n)?'m_orc_hood':'f_orc',/berserker/.test(n)?'hue-rotate(-30deg) saturate(1.5)':'');
  if(/banshee/.test(n))return T('m_banshee');
  if(/ghost/.test(n))return T('m_ghost');
  if(/wyrm|dragon|drake/.test(n))return T('f_dragon',/frost/.test(n)?'hue-rotate(150deg) saturate(.9)':'');
  if(/void lich/.test(n))return T('f_wraith','hue-rotate(60deg)');
  if(/lich|hollow crown|shadow lord/.test(n))return T('m_lich');
  if(/bramble/.test(n))return T('f_kobold','hue-rotate(-50deg) saturate(1.3)');
  if(/wisp/.test(n))return T('m_fire');
  if(/frostling/.test(n))return T('m_zombie');
  if(/guardian/.test(n))return T('f_bear');
  return T('m_goblin');
}
FOES.forEach(f=>{const [k,fl]=foeSprite(f.n);f.a=img(k,fl,100)});
HERO=img('hero_face','',100);
/* animals that now have a reference picture */
ANIART.chicken=img('chicken','',100);ANIART.sheep=img('sheep','',100);
if(typeof aEls!=='undefined')aEls.forEach((b,i)=>{const a=ANI[i];if(a)b.innerHTML=mon(ANIART[a.id],'ic')+'<div>'+a.n+'</div><span>'+a.cost+' coins</span>'});
if(typeof bEls!=='undefined'&&S.barn)bEls.forEach((x,i)=>{const p=S.barn[i];if(p&&ANI[p.t])x.e.innerHTML=mon(ANIART[ANI[p.t].id],'ic')});
/* refresh icons that were built once at start-up */
if(typeof seedEls!=='undefined')seedEls.forEach((b,i)=>{const s=b.firstElementChild;if(s)s.outerHTML=icon(CROPS[i].ic)});
const tabIc={chronicle:['book-open','#c9b8ff'],wood:['axe','#b8803f'],upg:['charm',null],arcane:['core','#b36bff'],tailor:['wool',null],leather:['hide',null],prog:['ring',null]};
TABS.forEach(([k,i,n,c])=>{tabIc[k]=[i,c]});
[...$('tabs').children].forEach(b=>{const t=tabIc[b.dataset.k];if(!t)return;const label=b.dataset.k==='chronicle'?'RPG Chronicle':b.textContent.replace(/undefined/g,'');b.innerHTML=icon(t[0],t[1])+label});

/* ============================================================
   Pond fishing: ripple circles you cast into
   ============================================================ */
window.__pondMode=true;
let PS=null;
const css=document.createElement('style');
css.textContent=`
.rpg-fish-stage #lake{position:absolute;inset:0;z-index:3;overflow:hidden}
.pnd-spot{position:absolute;width:64px;height:64px;margin:-32px 0 0 -32px;padding:0;border:0;background:none;cursor:pointer;touch-action:manipulation;-webkit-tap-highlight-color:transparent;animation:pnd-in .5s ease-out both}
.pnd-spot i{position:absolute;inset:0;border-radius:50%;border:2px solid #e9fbffcc;box-shadow:0 0 10px #aef0ff88,inset 0 0 10px #aef0ff55;animation:pnd-ring 2.2s ease-out infinite}
.pnd-spot i.r2{animation-delay:1.1s}
.pnd-spot .disc{position:absolute;inset:8px;border-radius:50%;background:radial-gradient(circle,#bff3ff55,#1a6a8a40 70%,transparent);border:1px dashed #ffffffaa}
.pnd-spot .orb{position:absolute;inset:14px;animation:pnd-orbit 5s linear infinite}
.pnd-spot .orb svg{width:60%;height:60%;position:absolute;left:0;top:20%;filter:brightness(0) opacity(.38)}
.pnd-spot.wait i{border-color:#ffe9a8;animation-duration:1.2s}
.pnd-spot.bite i{border-color:#ff6a5a;box-shadow:0 0 14px #ff6a5a;animation-duration:.5s}
.pnd-spot.bite .disc{background:radial-gradient(circle,#ffb4a255,#c2302040 70%,transparent)}
.pnd-spot.leave{animation:pnd-out .4s ease-in both}
.pnd-spot .bob{position:absolute;left:50%;top:50%;width:30px;height:30px;margin:-22px 0 0 -15px;pointer-events:none;animation:pnd-drop .45s cubic-bezier(.2,.8,.3,1) both,pnd-bob 1.4s ease-in-out .45s infinite}
.pnd-spot.bite .bob{animation:pnd-drop .01s both,pnd-dip .22s ease-in-out infinite}
.pnd-spot .bang{position:absolute;left:50%;top:-14px;transform:translateX(-50%);min-width:24px;height:24px;border-radius:12px;background:#ee3d3a;color:#fff;font:800 16px/24px sans-serif;text-align:center;border:2px solid #fff;box-shadow:0 2px 6px #0008;animation:pnd-pop .25s ease-out both;pointer-events:none}
.pnd-line{position:absolute;height:2px;background:linear-gradient(90deg,#ffffffe0,#ffffff90);transform-origin:0 50%;z-index:2;pointer-events:none;box-shadow:0 0 3px #0006}
@keyframes pnd-in{from{opacity:0;transform:scale(.4)}to{opacity:1;transform:scale(1)}}
@keyframes pnd-out{to{opacity:0;transform:scale(.6)}}
@keyframes pnd-ring{0%{transform:scale(.55);opacity:.95}100%{transform:scale(1.25);opacity:0}}
@keyframes pnd-orbit{to{transform:rotate(360deg)}}
@keyframes pnd-drop{from{transform:translateY(-46px) scale(1.5);opacity:0}to{transform:none;opacity:1}}
@keyframes pnd-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(3px)}}
@keyframes pnd-dip{0%,100%{transform:translateY(0)}50%{transform:translateY(9px)}}
@keyframes pnd-pop{from{transform:translateX(-50%) scale(0)}to{transform:translateX(-50%) scale(1)}}
.pnd-info{margin-top:8px;padding:10px 12px;border:1px solid #6d8797;border-radius:12px;background:linear-gradient(145deg,#12303f,#0a1c29);color:#eaf8ff}
.pnd-chips{display:flex;flex-wrap:wrap;gap:6px;align-items:center}
.pnd-chips span{display:inline-block;border:1px solid #ffe2a1;background:#071b2bd9;border-radius:8px;padding:5px 8px;font-size:11px}
.pnd-chips #combo{border-color:#c5eaff;font-weight:700;margin-left:auto}
.pnd-hint{margin:8px 0 6px;font-size:12px;line-height:1.5;color:#d4ebf5}
.pnd-hint b{color:#ffe09a}
.pnd-loot{display:flex;flex-wrap:wrap;gap:6px}
.pnd-loot .rpg-fish-loot{display:inline-flex;align-items:center;gap:4px;font-size:11px;padding:3px 7px;border-radius:8px;background:#0006}
.pnd-loot .ic{width:22px;height:22px}

`;
document.head.appendChild(css);
VIEWS.fish=function(){
  school=[];combo=0;spawnT=0;PS={spots:[],n:0,spawnT:.3,line:null,caught:0};
  const idx=Math.min(Math.max(0,S.fz||0),ZF.length-1),z=ZF[idx];
  const labels=['Pond','Mountain River','Open Sea','Abyssal Trench'];
  const zones='<div class="rpg-water-zones">'+ZF.map((q,i)=>'<button class="rpg-water-zone '+(idx===i?'on':'')+'" data-x="fz" data-i="'+i+'" '+(L('fish')>=q[1]?'':'disabled')+'>'+icon(['fish','river','shark','kraken'][i],['#8fd9ec','#5ab8d1','#8cb5e6','#b28bff'][i])+'<b>'+labels[i]+'</b><small>'+(L('fish')>=q[1]?'Fish Lv '+q[1]+'+':'Unlock at Lv '+q[1])+'</small></button>').join('')+'</div>';
  const names=poolFish().slice(0,5).map(f=>'<span class="rpg-fish-loot">'+fIcon(f,'ic')+f.n+'</span>').join('');
  return '<div id="fskill">'+skillBar('fish')+'</div>'+zones+'<div class="stage s-fish rpg-fish-stage rpg-water-'+idx+'" id="stg" style="--rpg-water-hue:'+z[3]+'deg;--rpg-water-bright:'+z[4]+'">'+bg('fish').replace('rpg-water-bg','rpg-water-bg rpg-biome-'+idx)+'<div class="rpg-fish-atmosphere"></div><div id="lake"></div></div>'
   +'<div class="pnd-info"><div class="pnd-meter"><div class="pnd-mlab"><span id="fmlab">Tap a glowing ripple to cast</span><span id="fmcnt">Caught 0</span></div><div class="bar2 pnd-mbar idle" id="fmwrap"><i id="fmbar" style="width:0"></i></div></div><div class="pnd-chips"><span>🎣 '+labels[idx]+'</span><span>Fishing Lv '+L('fish')+'</span><span id="combo">Combo ×0</span></div>'
   +'<p class="pnd-hint"><b>1.</b> Tap a glowing ripple to cast your line. <b>2.</b> Wait for the bobber to dip and the <b>!</b> to appear. <b>3.</b> Tap the ripple again to reel the fish in. Quick chains build a combo.</p><div class="pnd-loot">'+names+'</div></div>';
};
function spotFish(){const a=poolFish();return a[Math.floor(Math.pow(Math.random(),.62/(1+.25*S.up.lure))*a.length)]}
function place(){
  for(let t=0;t<30;t++){const x=12+Math.random()*72,y=34+Math.random()*48;
    if(PS.spots.every(s=>Math.hypot((s.x-x)*1.6,(s.y-y)*2.2)>22))return[x,y]}
  return null;
}
function spawnSpot(){
  const lk=$('lake');if(!lk)return;const p=place();if(!p)return;
  const f=spotFish();if(!f)return;
  const el=document.createElement('button');el.className='pnd-spot';el.type='button';
  el.style.left=p[0]+'%';el.style.top=p[1]+'%';el.setAttribute('aria-label','Fishing spot');
  el.innerHTML='<i></i><i class="r2"></i><span class="disc"></span><span class="orb">'+fIcon(f)+'</span>';
  const s={id:'sp'+(++PS.n),x:p[0],y:p[1],f,st:'idle',t:9+Math.random()*6,el};if(window.V4&&V4.spotInit)V4.spotInit(s);
  el.dataset.spot=s.id;lk.appendChild(el);PS.spots.push(s);
}
function drop(s,leave){
  PS.spots=PS.spots.filter(x=>x!==s);
  if(PS.line&&PS.line.s===s){PS.line.el.remove();PS.line=null}
  if(leave){s.el.classList.add('leave');setTimeout(()=>s.el.remove(),400)}else s.el.remove();
}
function resetCombo(){combo=0;const c=$('combo');if(c)c.textContent='Combo ×0'}
function drawLine(s){
  const lk=$('lake');if(!lk)return;
  if(!PS.line){const l=document.createElement('div');l.className='pnd-line';lk.appendChild(l);PS.line={el:l,s}}
  PS.line.s=s;
  const W=lk.clientWidth,H=lk.clientHeight,ox=W*.12,oy=H+6,tx=W*s.x/100,ty=H*s.y/100-14;
  const dx=tx-ox,dy=ty-oy;PS.line.el.style.left=ox+'px';PS.line.el.style.top=oy+'px';
  PS.line.el.style.width=Math.hypot(dx,dy)+'px';PS.line.el.style.transform='rotate('+Math.atan2(dy,dx)+'rad)';
}
function cancelLine(){
  const cur=PS.spots.find(x=>x.st!=='idle');
  if(cur){cur.st='idle';cur.t=8;cur.el.classList.remove('wait','bite');const b=cur.el.querySelector('.bob'),g=cur.el.querySelector('.bang');if(b)b.remove();if(g)g.remove()}
  if(PS.line){PS.line.el.remove();PS.line=null}
}
function cast(s){
  cancelLine();
  s.st='wait';s.t=(.9+Math.random()*1.7)*Math.max(.4,1-.08*S.up.bait)/(on('fish')?1.6:1);s.t0=s.t;
  s.el.classList.add('wait');
  const b=document.createElement('span');b.className='bob';b.innerHTML=icon('bobber');s.el.appendChild(b);
  drawLine(s);try{SFX.water()}catch(e){}
}
function reel(s){
  const bob=s.el.querySelector('.bob')||s.el;
  school.push({f:s.f,id:s.id+':'+s.f.id,el:bob,x:0,v:0,dir:1});
  const key=s.id+':'+s.f.id;
  drop(s,false);
  catchFish(key);if(s.special&&window.V4&&V4.spotReward)V4.spotReward(s);
  PS.caught++;const fc=$('fmcnt');if(fc)fc.textContent='Caught '+PS.caught;const fs=$('fskill');if(fs)fs.innerHTML=skillBar('fish');
  PS.spawnT=Math.min(PS.spawnT,.5);
}
document.getElementById('pane').addEventListener('click',e=>{
  const b=e.target.closest('.pnd-spot');if(!b||!PS)return;
  const s=PS.spots.find(x=>x.id===b.dataset.spot);if(!s)return;
  if(s.st==='idle')cast(s);
  else if(s.st==='bite')reel(s);
  else{say('Too early! The fish was spooked.');try{SFX.err()}catch(e){}resetCombo();drop(s,true)}
});
let last=0,pondLoopRaf=0;
function loop(t){
  if(S.tab!=='fish'||!PS||!$('lake')||!$('intro').hidden){pondLoopRaf=0;return;}
  pondLoopRaf=requestAnimationFrame(loop);
  if(t-last<30)return; // 30 Hz is enough for the bait timer and reduces repeated DOM writes.
  const dt=Math.min(.1,(t-last)/1000)||0;last=t;
  PS.spawnT-=dt;
  const maxSpots=3+(L('fish')>=10?1:0);
  if(PS.spawnT<=0){if(PS.spots.length<maxSpots)spawnSpot();PS.spawnT=Math.max(.7,spawnGap()*.9)}
  [...PS.spots].forEach(s=>{
    s.t-=dt;
    if(s.st==='idle'&&s.t<=0)drop(s,true);
    else if(s.st==='wait'&&s.t<=0){
      s.st='bite';s.t=1.1+.06*S.up.rod;s.tb=s.t;s.el.classList.remove('wait');s.el.classList.add('bite');
      const g=document.createElement('span');g.className='bang';g.textContent='!';s.el.appendChild(g);
      try{SFX.coin()}catch(e){}
    }else if(s.st==='bite'&&s.t<=0){say('The fish got away...');resetCombo();drop(s,true)}
  });
  const cur=PS.spots.find(x=>x.st!=='idle'),ml=$('fmlab'),mb=$('fmbar'),mw=$('fmwrap');
  if(ml&&mb&&mw){
    if(!cur){ml.textContent='Tap a glowing ripple to cast';mb.style.width='0%';mw.className='bar2 pnd-mbar idle'}
    else if(cur.st==='wait'){ml.textContent='Waiting for a bite...';mb.style.width=Math.max(0,Math.min(100,(1-cur.t/(cur.t0||1))*100))+'%';mw.className='bar2 pnd-mbar'}
    else{ml.textContent='BITE! Tap the ripple now!';mb.style.width=Math.max(0,Math.min(100,cur.t/(cur.tb||1)*100))+'%';mw.className='bar2 pnd-mbar bite'}
  }
}
function startPondLoop(){
  if(!pondLoopRaf&&S.tab==='fish'&&PS&&$('lake')&&$('intro').hidden){last=0;pondLoopRaf=requestAnimationFrame(loop);}
}
const fishTabs=$('tabs'),fishPane=$('pane');
if(fishTabs)fishTabs.addEventListener('click',()=>setTimeout(startPondLoop,0));
// Also restart when the angler chooses a location from the fishing map.
if(fishPane)fishPane.addEventListener('click',()=>setTimeout(startPondLoop,0));
startPondLoop();
render();
window.__spritePackReady=true;
})();
