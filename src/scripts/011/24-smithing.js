/* ---------- smithing: smelter and deeper tiers ---------- */
const RB=[['cbar',1,2,[['copper',2]]],['ibar',3,5,[['iron',2],['coal',1]]],['sbar',6,10,[['silver',2],['coal',1]]],['gbar',7,20,[['gold',2],['coal',2]]],['mbar',10,40,[['mithril',2],['coal',2]]],['steel',12,60,[['ibar',2],['coal',3]]],['obsal',15,90,[['obsidian',3],['mbar',1]]],['starsteel',19,200,[['starstone',1],['mbar',2],['essence',1]]]].map(r=>[r[0],0,r[1],r[2],r[3]]);
IT.push(W('w_steel','Steel Sword','sword',2,30,.8,22,12,500,[['steel',6]]),A('a_steel','Steel Plate','plate',2,34,66,44,12,600,[['steel',10],['hide',4]]),K('p_steel','Steel Pick',2,4,12,300,[['steel',5]]),
 W('w_obs','Obsidian Cleaver','great',10,48,.85,26,15,900,[['obsal',6],['coal',6]]),A('a_obs','Obsidian Armor','plate',10,42,84,56,15,1200,[['obsal',10],['hide',5]]),K('p_obs','Obsidian Pick',10,4.5,15,800,[['obsal',5]]),
 W('w_star','Starsteel Edge','katana',3,68,.7,30,19,2200,[['starsteel',6],['scale',4]]),A('a_star','Starsteel Aegis','plate',3,54,110,80,19,2600,[['starsteel',10],['scale',6]]),K('p_star','Starsteel Pick',3,5,19,1500,[['starsteel',6]]));
const craftSec=lv=>Math.min(120,Math.round(10*Math.pow(1.18,(lv||1)-1)));
const smV=()=>skillBar('smith')+'<div class="btns">'+[['bar','Smelter'],['w','Weapons'],['a','Armor'],['p','Tools']].map(c=>'<button class="btn '+(c[0]===forgeCat?'':'alt')+'" data-a="cat" data-i="'+c[0]+'">'+c[1]+'</button>').join('')+'</div><p class="h">Smelt ore into bars using coal from the Mine. All weapons, armor and tools are forged from bars (1 bar = 2 ore).</p><div class="col">'+RB.map(r=>'<div class="smelt-row"><button class="rec'+(L('smith')>=r[2]?'':' dim')+'" data-x="sm" data-i="'+r[0]+'">'+gIcon(r[0])+'<div><b>'+nm(r[0])+' ×'+inv(r[0])+'</b><small>Smithing '+r[2]+': '+reqText(r[4])+', '+coinText(r[3])+'</small></div></button><button class="btn alt" data-x="sm" data-n="5" data-i="'+r[0]+'">×5</button></div>').join('')+'</div>';
const _sm=VIEWS.smith;VIEWS.smith=()=>forgeCat==='bar'?smV():_sm();
$('pane').addEventListener('click',e=>{const b=e.target.closest('[data-x="sm"]');if(!b)return;const r=RB.find(x=>x[0]===b.dataset.i),n=+(b.dataset.n||1);let done=0;
 const wait=Math.ceil(((S.smeltCd||0)-Date.now())/1000);
 if(wait>0){say('The forge is still hot — '+wait+'s left before the next bar.');SFX.err();return}
 for(let k=0;k<n;k++){
  if(L('smith')<r[2]||S.coins<r[3]||!r[4].every(x=>inv(x[0])>=x[1])){if(!done){say(missMsg('Smithing','smith',r[2],r[4],r[3]));SFX.err()}break}
  r[4].forEach(x=>S.inv[x[0]]-=x[1]);S.coins-=r[3];S.inv[r[0]]=inv(r[0])+1;addXp('smith',4+r[2]*2);done++}
 if(done){SFX.forge();S.smeltCd=Date.now()+craftSec(r[2])*1000;say('Smelted '+done+' '+nm(r[0])+'. Next bar in '+craftSec(r[2])+'s.')}save();render()});
