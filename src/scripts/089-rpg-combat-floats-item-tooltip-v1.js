
(()=>{
 'use strict';
 if(!window.$||!window.VIEWS||!window.IT||!window.S)return;

 /* Replace the old random-position damage text with actor-anchored floating feedback. */
 const floatOld=window.fx;
 window.fx=function(text,kind,side,crit,color){
  const stage=$('stg');if(!stage)return;
  const el=document.createElement('span');
  el.className='fx '+(kind||'')+' rpg-float '+(side==='me'?'rpg-player':'rpg-enemy')+(crit?' crit':'');
  if(crit&&typeof BURST!=='undefined')el.innerHTML=BURST;
  const label=document.createElement('span');label.textContent=String(text);el.appendChild(label);
  if(color)el.style.color=color;
  const actor=side==='me'?stage.querySelector('#me,.me'):stage.querySelector('#eo');
  const sr=stage.getBoundingClientRect();
  let x=side==='me'?18:65,y=side==='me'?65:31;
  if(actor){
   const r=actor.getBoundingClientRect();
   x=((r.left+r.width/2-sr.left)/Math.max(1,sr.width))*100;
   y=((r.top-sr.top)/Math.max(1,sr.height))*100;
   y=Math.max(9,Math.min(77,y+(side==='me'?-8:-9)));
  }
  x=Math.max(10,Math.min(90,x));
  el.style.left=x+'%';el.style.top=y+'%';
  stage.appendChild(el);
  setTimeout(()=>el.remove(),850);
 };

 /* A single reusable tooltip supports mouse hover and mobile long-press. */
 const tip=document.createElement('div');tip.id='rpg-item-tooltip';document.body.appendChild(tip);
 let active=null,hold=null,shown=false,suppressClick=false;
 const escape=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 function getMeta(id){
  const it=IT.find(x=>x.id===id);
  const ore=ORES.find(x=>x.id===id),fish=FISH.find(x=>x.id===id),pot=POTS.find(x=>x.id===id),
        fert=FERTS.find(x=>x.id===id),trade=TRADE.find(x=>x.id===id),mat=MATS[id];
  let name=it?.n||ore?.n||fish?.n||pot?.n||fert?.n||trade?.n||mat?.n||nm(id);
  let rarity=rar(id),desc=[],price=VAL[id]||0;
  if(it){desc.push(stat(it));if(it.d)desc.push(it.d);price=it.v||price}
  if(ore){desc.push('Mining material');price=VAL[id]||price}
  if(fish){desc.push('Caught fish');price=fish.v||price}
  if(pot){desc.push(pot.d||'Consumable potion');price=pot.v||price}
  if(fert){desc.push('Fertilizer for crops');price=fert.v||price}
  if(trade){desc.push('Trade good');desc.push('Base trade value: '+trade.b+' coins');price=trade.b||price}
  if(mat){desc.push(mat.d||'Crafting material');price=mat.v||price}
  if(!desc.length)desc.push('Adventure resource');
  let iconHtml='';try{iconHtml=it?iIcon(it):gIcon(id)}catch(_){}
  return {name,rarity,desc:desc.join(' · '),price,iconHtml,qty:inv(id)};
 }
 function place(anchor){
  const r=anchor.getBoundingClientRect(),w=Math.min(270,innerWidth-24),h=tip.offsetHeight||110;
  let x=Math.max(12,Math.min(innerWidth-w-12,r.left+r.width/2-w/2));
  let y=r.top-h-9;if(y<8)y=Math.min(innerHeight-h-8,r.bottom+9);
  tip.style.left=x+'px';tip.style.top=Math.max(8,y)+'px';
 }
 function show(anchor){
  if(!anchor||!anchor.isConnected)return;
  const id=anchor.dataset.i;if(!id)return;
  active=anchor;
  const m=getMeta(id),color=(m.r&&m.r[1])||'#c6a56a';
  tip.style.setProperty('--rarity',color);
  tip.innerHTML='<div class="rpt-head"><span class="rpt-icon">'+m.iconHtml+'</span><div><b style="color:'+escape(color)+'">'+escape(m.name)+'</b><small>'+(m.r?escape(m.r[0]):'Item')+' · Owned ×'+m.qty+'</small></div></div><div class="rpt-desc">'+escape(m.desc)+'</div><div class="rpt-foot">'+(m.price?'Sell value: about '+earn(m.price,catOf(id))+' coins each':'No direct sale value')+' · Hold to inspect</div>';
  tip.classList.add('show');place(anchor);shown=true;
 }
 function hide(){
  clearTimeout(hold);hold=null;tip.classList.remove('show');active=null;shown=false;
 }
 const pane=$('pane');
 if(pane){
  pane.addEventListener('pointerover',e=>{
   if(e.pointerType==='touch')return;
   const b=e.target.closest&&e.target.closest('.sq[data-a="info"],.rec[data-a="equip"]');
   if(b)show(b);
  });
  pane.addEventListener('pointerout',e=>{
   if(e.pointerType==='touch')return;
   if(active&&e.target.closest&&e.target.closest('.sq[data-a="info"],.rec[data-a="equip"]')===active&&!active.contains(e.relatedTarget))hide();
  });
  pane.addEventListener('pointerdown',e=>{
   const b=e.target.closest&&e.target.closest('.sq[data-a="info"],.rec[data-a="equip"]');if(!b||e.pointerType==='mouse')return;
   clearTimeout(hold);active=b;shown=false;
   hold=setTimeout(()=>{show(b);suppressClick=true;},480);
  });
  ['pointerup','pointercancel','pointerleave'].forEach(ev=>pane.addEventListener(ev,()=>{clearTimeout(hold);hold=null}));
  pane.addEventListener('click',e=>{
   const b=e.target.closest&&e.target.closest('.sq[data-a="info"],.rec[data-a="equip"]');
   if(suppressClick&&b){e.preventDefault();e.stopImmediatePropagation();suppressClick=false;return}
   if(!b&&shown)hide();
  },true);
 }
 window.addEventListener('scroll',()=>{if(active&&shown)place(active)},{passive:true});
 window.addEventListener('resize',()=>{if(active&&shown)place(active)});
 document.addEventListener('pointerdown',e=>{if(shown&&!e.target.closest('#rpg-item-tooltip,.sq[data-a="info"]'))hide()});
})();
