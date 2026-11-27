
(()=>{
 'use strict';
 if(!window.$||!window.S||!window.IT)return;
 const stage=()=>document.querySelector('#stg');
 const oldFx=window.fx;
 window.fx=function(value,kind,side,crit,color){
  const s=stage();if(!s)return;
  const el=document.createElement('span');
  el.className='fx '+(kind||'')+' rpg-float '+(side==='me'?'rpg-player':'rpg-enemy')+(crit?' crit':'');
  if(crit&&typeof BURST!=='undefined')el.innerHTML=BURST;
  const label=document.createElement('span');label.textContent=String(value);el.appendChild(label);
  if(color)el.style.color=color;
  const actor=side==='me'?s.querySelector('#me,.me'):s.querySelector('#eo');
  const sr=s.getBoundingClientRect();let x=side==='me'?18:65,y=side==='me'?65:31;
  if(actor){
   const r=actor.getBoundingClientRect();
   x=(r.left+r.width/2-sr.left)/Math.max(1,sr.width)*100;
   y=(r.top-sr.top)/Math.max(1,sr.height)*100;
   y=Math.max(10,Math.min(75,y-8));
  }
  x=Math.max(10,Math.min(90,x));
  el.style.left=x+'%';el.style.top=y+'%';
  s.appendChild(el);
  setTimeout(()=>{el.classList.add('rpg-float-out');el.remove()},1080);
 };
 /* Loot is presented in its own ordered side rail, never as a damage number. */
 const lootTimers=new WeakMap();
 window.drop=function(id,q,bonus){
  const s=stage();if(!s)return;
  let rail=s.querySelector('.rpg-loot-rail');
  if(!rail){rail=document.createElement('div');rail.className='rpg-loot-rail';rail.setAttribute('aria-live','polite');s.appendChild(rail)}
  let r=['Item','#d7bd82'];try{r=rar(id)||r}catch(_){}
  let iconHtml='';try{iconHtml=gIcon(id)}catch(_){}
  const row=document.createElement('div');row.className='rpg-loot-entry';row.style.setProperty('--loot-color',r[1]||'#d7bd82');
  const ico=document.createElement('span');ico.className='loot-icon';ico.innerHTML=iconHtml;
  const name=document.createElement('span');name.className='loot-name';name.textContent='+'+q+' '+nm(id)+(bonus?' · Bonus':'');
  row.append(ico,name);rail.appendChild(row);
  while(rail.children.length>6)rail.firstElementChild.remove();
  const timer=setTimeout(()=>{row.classList.add('out');setTimeout(()=>row.remove(),420)},2900);
  lootTimers.set(row,timer);
 };
 /* Interpolate all health bars and add a subtle hit/heal response without delaying HP values. */
 const observeBar=bar=>{
  if(bar.dataset.rpgObserved)return;bar.dataset.rpgObserved='1';
  const fill=bar.querySelector('i');if(!fill)return;
  const update=()=>{
   const w=parseFloat(fill.style.width)||0;
   fill.classList.toggle('rpg-low',w>0&&w<=25);
   const old=Number(fill.dataset.rpgLast||w);
   if(w<old){fill.classList.remove('rpg-hit','rpg-heal');void fill.offsetWidth;fill.classList.add('rpg-hit')}
   else if(w>old){fill.classList.remove('rpg-hit','rpg-heal');void fill.offsetWidth;fill.classList.add('rpg-heal')}
   fill.dataset.rpgLast=String(w);
   setTimeout(()=>fill.classList.remove('rpg-hit','rpg-heal'),430);
  };
  new MutationObserver(update).observe(fill,{attributes:true,attributeFilter:['style']});
  update();
 };
 const scan=()=>document.querySelectorAll('.bar2.hp,.bar2.ec,.bar2.sh').forEach(observeBar);
 scan();
 new MutationObserver(scan).observe(document.body,{childList:true,subtree:true});
})();
