
(()=>{
 'use strict';
 // These game values are classic-script lexical bindings, not window properties.
 if(typeof $!=='function'||typeof IT==='undefined'||typeof VIEWS==='undefined')return;
 const pane=$('pane');if(!pane)return;
 const tip=document.createElement('div');tip.id='rpg-item-tooltip-v2';document.body.appendChild(tip);
 let active=null,holdTimer=null,longShown=false;
 const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 function details(id){
  const gear=IT.find(x=>x.id===id);
  const ore=ORES.find(x=>x.id===id),fish=FISH.find(x=>x.id===id),pot=POTS.find(x=>x.id===id),
        fert=FERTS.find(x=>x.id===id),trade=TRADE.find(x=>x.id===id);
  const name=gear?.n||ore?.n||fish?.n||pot?.n||fert?.n||trade?.n||nm(id);
  const rarity=rar(id),qty=inv(id),chips=[];
  let description='',price=0,iconHtml='';
  try{iconHtml=gear?iIcon(gear):gIcon(id)}catch(_){}
  if(gear){
   description=stat(gear)+(gear.d?' · '+gear.d:'');
   if(gear.r)description+=' · Recipe: '+need(gear);
   chips.push('Required level: '+gear.l,'Slot: '+String(gear.c||'').toUpperCase());
   if(gear.a)chips.push('Attack +'+gear.a);
   if(gear.dfn)chips.push('Defense +'+gear.dfn);
   if(gear.v)price=earn(gear.v*(gear.c==='w'?1:1));
   if(S.eq&&S.eq[gear.c]===gear.id)chips.push('Currently equipped');
  }else if(ore){description='Mining material';price=earn(VAL[id]||0,catOf(id))}
  else if(fish){description='Fish caught while fishing';price=earn(fish.v||VAL[id]||0,'fish')}
  else if(pot){description=pot.d||'Consumable potion';if(pot.heal)chips.push('Restores '+pot.heal+' HP');if(pot.sh)chips.push('Restores '+pot.sh+' shield');if(pot.buff)chips.push('Combat buff');price=earn(pot.v||VAL[id]||0,'alch')}
  else if(fert){description='Fertilizer used to improve crop growth or harvest';price=earn(fert.v||VAL[id]||0,'farm')}
  else if(trade){description='Trade good · Base market value '+trade.b+' coins';price=earn(trade.b||0,'trade')}
  else if(MATS&&MATS[id]){description=MATS[id].d||'Crafting material';price=earn(VAL[id]||0,catOf(id))}
  else{description=infoText(id);price=earn(VAL[id]||0,catOf(id))}
  if(!chips.length&&gear)chips.push(stat(gear));
  return {name,rarity,qty,description,price,iconHtml,chips};
 }
 function position(anchor){
  const r=anchor.getBoundingClientRect(),w=Math.min(290,innerWidth-24);
  const h=tip.offsetHeight||130;
  let x=Math.max(12,Math.min(innerWidth-w-12,r.left+r.width/2-w/2));
  let y=r.top-h-9;if(y<8)y=Math.min(innerHeight-h-8,r.bottom+9);
  tip.style.left=x+'px';tip.style.top=Math.max(8,y)+'px';
 }
 function show(anchor){
  if(!anchor||!anchor.isConnected)return;
  const id=anchor.dataset.i;if(!id)return;
  active=anchor;
  const d=details(id),color=d.rarity&&d.rarity[1]?d.rarity[1]:'#c6a56a';
  tip.style.setProperty('--tip-rarity',color);
  tip.innerHTML='<div class="head"><span class="ico">'+d.iconHtml+'</span><div><b style="color:'+esc(color)+'">'+esc(d.name)+'</b><small>'+(d.rarity?esc(d.rarity[0]):'Item')+' · Owned ×'+d.qty+'</small></div></div>'
   +'<div class="desc">'+esc(d.description)+'</div>'
   +(d.chips.length?'<div class="stats">'+d.chips.map(x=>'<span>'+esc(x)+'</span>').join('')+'</div>':'')
   +'<div class="foot">'+(d.price?'Estimated sell value: '+d.price+' coins each':'No direct sell value')+'</div>';
  tip.classList.add('show');position(anchor);
 }
 function hide(){clearTimeout(holdTimer);holdTimer=null;tip.classList.remove('show');active=null;longShown=false}
 function target(e){return e.target.closest&&e.target.closest('#pane .sq[data-a="info"],#pane .rec[data-a="equip"],#pane .slot[data-a="info"]')}
 pane.addEventListener('pointerover',e=>{
  if(e.pointerType==='touch')return;
  const b=target(e);if(b&&!b.contains(e.relatedTarget))show(b);
 });
 pane.addEventListener('pointerout',e=>{
  if(e.pointerType==='touch')return;
  const b=target(e);if(b&&active===b&&!b.contains(e.relatedTarget))hide();
 });
 pane.addEventListener('pointerdown',e=>{
  const b=target(e);if(!b||e.pointerType==='mouse')return;
  clearTimeout(holdTimer);longShown=false;active=b;
  holdTimer=setTimeout(()=>{show(b);longShown=true},420);
 });
 const cancel=()=>{clearTimeout(holdTimer);holdTimer=null};
 pane.addEventListener('pointerup',cancel);
 pane.addEventListener('pointercancel',cancel);
 pane.addEventListener('pointerleave',cancel);
 pane.addEventListener('click',e=>{
  const b=target(e);
  if(longShown&&b){e.preventDefault();e.stopImmediatePropagation();hide();return}
  if(!b&&active)hide();
 },true);
 document.addEventListener('pointerdown',e=>{if(!e.target.closest('#rpg-item-tooltip-v2,#pane .sq[data-a="info"],#pane .rec[data-a="equip"],#pane .slot[data-a="info"]'))hide()});
 window.addEventListener('scroll',()=>{if(active&&tip.classList.contains('show'))position(active)},{passive:true});
 window.addEventListener('resize',()=>{if(active&&tip.classList.contains('show'))position(active)});
 // Keep the old tap-to-read message, but show the richer tooltip on hover/press-and-hold.
})();
