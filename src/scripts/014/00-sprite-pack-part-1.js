
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

