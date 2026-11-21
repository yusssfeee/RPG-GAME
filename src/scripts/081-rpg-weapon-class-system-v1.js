
(()=>{
 'use strict';
 if(typeof IT==='undefined'||typeof S==='undefined'||typeof CLS==='undefined')return;
 const addWeapon=(id,n,art,atk,sp,cr,level,rarity,kind,passive,magic)=>{
   const it=W(id,n,art,rarity,atk,sp,cr,level,0,[]);
   it.k=kind;it.allowed=[kind];it.passive=passive||'';it.magic=!!magic;it.starter=true;IT.push(it);return it;
 };
 const addArmor=(id,n,art,def,sh,hp,kind,passive)=>{
   const it=A(id,n,art,rarityColor(kind),def,sh,hp,0,0,[],0);
   it.allowed=[kind];it.passive=passive||'';it.starter=true;IT.push(it);return it;
 };
 function rarityColor(k){return ({warrior:0,tank:2,archer:8,mage:5,rogue:4,healer:6})[k]||0}
 const starters={
  warrior:{w:'w_start_warrior',a:'a_start_warrior'},
  tank:{w:'w_start_tank',a:'a_start_tank'},
  archer:{w:'w_start_archer',a:'a_start_archer'},
  mage:{w:'w_start_mage',a:'a_start_mage'},
  rogue:{w:'w_start_rogue',a:'a_start_rogue'},
  healer:{w:'w_start_healer',a:'a_start_healer'}
 };
 addWeapon('w_start_warrior','Recruit’s Longsword','sword',6,1,7,0,0,'warrior','Balanced Edge · +4% physical damage',false);
 addWeapon('w_start_tank','Ironbound Mace','hammer',5,1.35,3,0,2,'tank','Crushing Weight · +5% damage against armored foes',false);
 addWeapon('w_start_archer','Trailblazer Bow','bow',5,.78,13,0,8,'archer','Eagle Eye · +3% critical chance',false);
 addWeapon('w_start_mage','Apprentice Arcstaff','staff',5.25,.95,5,0,5,'mage','Arcane Focus · +5% magic damage',true);
 addWeapon('w_start_rogue','Quickfang Daggers','dagger',4,.62,13,0,4,'rogue','Backstab · +5% critical damage',false);
 addWeapon('w_start_healer','Dawnlight Staff','staff',4,1.05,4,0,6,'healer','Restoring Light · +3% healing',true);
 addArmor('a_start_warrior','Recruit’s Chain Vest','mail',3,0,7,'warrior','Stalwart · +2% defense');
 addArmor('a_start_tank','Ironwall Guard','plate',5,5,18,'tank','Bulwark · +5% shield strength');
 addArmor('a_start_archer','Ranger’s Leather','leather',2,0,5,'archer','Lightstep · +3% attack speed');
 addArmor('a_start_mage','Apprentice Mantle','robe',1,2,4,'mage','Mana Weave · +3% magic damage');
 addArmor('a_start_rogue','Shadowrunner Garb','leather',2,0,4,'rogue','Evasion · +2% critical chance');
 addArmor('a_start_healer','Novice Healer Robe','robe',2,3,8,'healer','Sanctuary · +3% healing');
 // Restrict every existing weapon to classes that can sensibly wield its weapon family.
 const family={
  sword:['warrior','tank'],great:['warrior','tank'],hammer:['warrior','tank'],
  bow:['archer'],dagger:['rogue'],rapier:['rogue','warrior'],
  staff:['mage','healer'],spear:['warrior','tank','mage','healer'],katana:['warrior','rogue'],axe:['warrior','tank']
 };
 IT.filter(x=>x.c==='w'&&!x.starter).forEach(x=>{
   const fam=String(x.a||'').toLowerCase();
   x.allowed=family[fam]||['warrior','tank'];
   if(x.k)x.allowed=[x.k];
   if(x.allowed.length===1)x.k=x.allowed[0];
   x.magic=x.k==='mage'||x.k==='healer'||fam==='staff';
 });
 // Class selection grants a complete, class-matched starter kit only on first selection.
 function applyClassKit(k,first){
  const kit=starters[k];if(!kit)return;
  if(first){
   S.items[kit.w]=(S.items[kit.w]||0)+1;S.items[kit.a]=(S.items[kit.a]||0)+1;
   // Remove the generic tutorial kit so the class kit is the true starting equipment.
   ['w_rusty','a_cloth'].forEach(id=>{if(S.items[id])delete S.items[id]});
   S.eq.w=kit.w;S.eq.a=kit.a;
  }else{
   const w=IT.find(x=>x.id===S.eq.w),a=IT.find(x=>x.id===S.eq.a);
   if(!w||w.c!=='w'||(w.allowed&&!w.allowed.includes(k)))S.eq.w=kit.w;
   if(!a||a.c!=='a'||(a.allowed&&!a.allowed.includes(k)))S.eq.a=kit.a;
   S.items[kit.w]=Math.max(1,S.items[kit.w]||0);S.items[kit.a]=Math.max(1,S.items[kit.a]||0);
  }
 }
 window.__applyClassKit=applyClassKit;
 // Guard the actual equip action too, not merely the inventory display.
 equip=function(id){
  const it=IT.find(x=>x.id===id);if(!it||cnt(id)<1)return;
  if(it.allowed&&!it.allowed.includes(S.cls)){say('This equipment is restricted to the '+it.allowed.map(k=>CLS[k]?.n||k).join(' / ')+' class.');try{SFX.err()}catch(_){}return}
  if(it.c==='w'||it.c==='a'){
   if(S.eq[it.c]!==id){S.eq[it.c]=id;say('Equipped '+it.n+'.');try{SFX.forge()}catch(_){}}
  }
 };
 // Rebuild the tooltip with clean, color-coded stat chips. No recipe HTML is ever printed.
 const oldTip=document.getElementById('rpg-item-tooltip-v2');
 if(oldTip)oldTip.remove();
 const pane=$('pane');if(!pane)return;
 const tip=document.createElement('div');tip.id='rpg-item-tooltip-v2';document.body.appendChild(tip);
 const esc=v=>String(v==null?'':v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const colors={phys:'#ff9b45',magic:'#58baff',speed:'#ffd34e',crit:'#ff626d',def:'#72d6a0',hp:'#f18ab2',special:'#c6a0ff',muted:'#bdc9d6'};
 const chip=(label,value,color)=>'<span style="color:'+color+';border-color:'+color+'55"><b>'+esc(label)+'</b> '+esc(value)+'</span>';
 function getDetails(id){
  const it=IT.find(x=>x.id===id),rarity=rar(id),qty=inv(id);
  const name=it?.n||nm(id);let chips=[],desc='',price=0,ico='';
  try{ico=it?iIcon(it):gIcon(id)}catch(_){}
  if(it){
   if(it.c==='w'){
    const magical=!!it.magic||['mage','healer'].includes(it.k);
    chips.push(chip(magical?'Magic damage':'Physical damage',it.atk,magical?colors.magic:colors.phys));
    chips.push(chip('Attack speed',(1/it.sp).toFixed(2)+'/s',colors.speed));
    if(it.cr)chips.push(chip('Critical chance','+'+it.cr+'%',colors.crit));
    chips.push(chip('Critical damage','×'+pc(critMul()),colors.crit));
    if(it.passive)chips.push(chip('Special trait',it.passive,colors.special));
    desc='Weapon · '+(magical?'Magic':'Physical')+' damage';
   }else if(it.c==='a'){
    chips.push(chip('Defense','+'+it.def,colors.def));
    if(it.sh)chips.push(chip('Shield','+'+it.sh,colors.magic));
    if(it.hp)chips.push(chip('Max HP','+'+it.hp,colors.hp));
    if(it.cr)chips.push(chip('Critical chance','+'+it.cr+'%',colors.crit));
    if(it.passive)chips.push(chip('Special trait',it.passive,colors.special));
    desc='Armor · '+(it.allowed?'Class restricted':'General use');
   }else if(it.c==='p'){chips.push(chip('Mining power','+'+it.pw,colors.special));desc='Mining tool'}
   const allowed=it.allowed?it.allowed.map(k=>CLS[k]?.n||k).join(', '):'All classes';
   chips.push(chip('Class',allowed,colors.muted));
   chips.push(chip('Required level',it.l||0,colors.muted));
   if(S.eq&&S.eq[it.c]===it.id)chips.push(chip('Status','Equipped',colors.def));
   if(it.v)price=earn(it.v,'smith');
  }else{
   const ore=ORES.find(x=>x.id===id),fish=FISH.find(x=>x.id===id),pot=POTS.find(x=>x.id===id),fert=FERTS.find(x=>x.id===id),tr=TRADE.find(x=>x.id===id);
   if(ore)desc='Mining material';else if(fish)desc='Fish caught while fishing';else if(pot)desc=pot.d||'Consumable potion';else if(fert)desc='Fertilizer';else if(tr)desc='Trade good';else desc=MATS[id]?.d||'Crafting material';
   price=earn(VAL[id]||tr?.b||fish?.v||pot?.v||0,catOf(id));
  }
  return {name,rarity,qty,chips,desc,price,ico};
 }
 function place(anchor){const r=anchor.getBoundingClientRect(),w=Math.min(320,innerWidth-24),h=tip.offsetHeight||150;let x=Math.max(12,Math.min(innerWidth-w-12,r.left+r.width/2-w/2)),y=r.top-h-9;if(y<8)y=Math.min(innerHeight-h-8,r.bottom+9);tip.style.left=x+'px';tip.style.top=Math.max(8,y)+'px'}
 let active=null,timer=null,longShown=false;
 function show(b){if(!b?.isConnected||!b.dataset.i)return;active=b;const d=getDetails(b.dataset.i),c=d.rarity?.[1]||'#c6a56a';tip.style.setProperty('--tip-rarity',c);tip.innerHTML='<div class="head"><span class="ico">'+d.ico+'</span><div><b style="color:'+esc(c)+'">'+esc(d.name)+'</b><small>'+(d.rarity?esc(d.rarity[0]):'Item')+' · Owned ×'+d.qty+'</small></div></div><div class="desc">'+esc(d.desc)+'</div><div class="stats">'+d.chips.join('')+'</div><div class="foot">'+(d.price?'Estimated sell value: '+d.price+' coins each':'No direct sell value')+'</div>';tip.classList.add('show');place(b)}
 function hide(){clearTimeout(timer);timer=null;tip.classList.remove('show');active=null;longShown=false}
 const target=e=>e.target.closest?.('#pane .sq[data-a="info"],#pane .rec[data-a="equip"],#pane .slot[data-a="info"]');
 pane.addEventListener('pointerover',e=>{if(e.pointerType==='touch')return;const b=target(e);if(b&&!b.contains(e.relatedTarget))show(b)});
 pane.addEventListener('pointerout',e=>{if(e.pointerType==='touch')return;const b=target(e);if(b&&active===b&&!b.contains(e.relatedTarget))hide()});
 pane.addEventListener('pointerdown',e=>{const b=target(e);if(!b||e.pointerType==='mouse')return;clearTimeout(timer);longShown=false;active=b;timer=setTimeout(()=>{show(b);longShown=true},430)});
 const cancel=()=>{clearTimeout(timer);timer=null};pane.addEventListener('pointerup',cancel);pane.addEventListener('pointercancel',cancel);pane.addEventListener('pointerleave',cancel);
 pane.addEventListener('click',e=>{const b=target(e);if(longShown&&b){e.preventDefault();e.stopImmediatePropagation();hide()}else if(!b)hide()},true);
 document.addEventListener('pointerdown',e=>{if(!e.target.closest('#rpg-item-tooltip-v2,#pane .sq[data-a="info"],#pane .rec[data-a="equip"],#pane .slot[data-a="info"]'))hide()});
 window.addEventListener('scroll',()=>{if(active&&tip.classList.contains('show'))place(active)},{passive:true});
 window.addEventListener('resize',()=>{if(active&&tip.classList.contains('show'))place(active)});
})();
