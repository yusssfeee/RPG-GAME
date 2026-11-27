
(()=>{
 const root=document.getElementById('seeds');
 if(!root||root.dataset.picker==='v3')return;
 const buttons=[...root.querySelectorAll('.seed')];
 if(!buttons.length)return;
 const nameOf=b=>(b.querySelector('div')?.textContent||'').trim();
 const byName=new Map(buttons.map(b=>[nameOf(b),b]));
 const groups=[
  ['veg','Vegetables','pumpkin','Sold for coins. Easy to start with.',['Radish','Potato','Pumpkin','Turnip','Cabbage','Tomato','Garlic','Melon']],
  ['fruit','Fruits','strawberry','High-value crops that need a higher Farming level.',['Strawberry','Grapes','Apple']],
  ['grain','Grains','wheat','Wheat and rice sell for coins; hay and corn give barn items.',['Hay','Wheat','Corn','Rice']],
  ['herb','Herbs','herb','Give items instead of coins: herbs for brewing, clover for the barn.',['Herbs','Clover']]
 ];
 const artOf=k=>{try{return window.__RPG_PIXEL_CROP_ART[k][3]||''}catch(_){return ''}};
 // Inside each category: lowest required Farming level first, then cheapest seed.
 const info=n=>{try{return CROPS.find(c=>c.n===n)||null}catch(_){return null}};
 const order=(a,b)=>{const x=info(a),y=info(b);return x&&y?((x.l-y.l)||(x.cost-y.cost)):0};
 const cats=[];const used=new Set();
 for(const [key,title,art,desc,names] of groups){
  const list=names.filter(n=>byName.has(n)).sort(order).map(n=>byName.get(n));
  if(list.length){list.forEach(b=>used.add(b));cats.push({key,title,art,desc,list})}
 }
 // Anything new/unclassified stays reachable.
 const rest=buttons.filter(b=>!used.has(b));
 if(rest.length)cats.push({key:'other',title:'Other',art:'',desc:'More crops.',list:rest});

 const tabs=document.createElement('div');tabs.className='crop-tabs';tabs.setAttribute('role','tablist');tabs.setAttribute('aria-label','Crop categories');
 const caption=document.createElement('div');caption.className='crop-caption';
 const strip=document.createElement('div');strip.className='crop-strip';strip.setAttribute('role','group');strip.setAttribute('aria-label','Seeds');
 cats.forEach(c=>{
  const t=document.createElement('button');t.type='button';t.className='crop-tab';t.setAttribute('role','tab');
  const src=artOf(c.art);
  t.innerHTML=(src?'<img alt="" draggable="false">':'')+'<span class="nm"></span><b></b>';
  if(src)t.querySelector('img').src=src;
  t.querySelector('.nm').textContent=c.title;t.querySelector('b').textContent=String(c.list.length);
  t.setAttribute('aria-label',c.title+', '+c.list.length+' crops');
  t.addEventListener('click',()=>show(c.key,true));
  c.tab=t;tabs.appendChild(t);
  c.list.forEach(b=>{b.dataset.cat=c.key;strip.appendChild(b)});
 });

 function show(key,reset){
  cats.forEach(c=>{
   const on=c.key===key;
   c.tab.classList.toggle('on',on);c.tab.setAttribute('aria-selected',on?'true':'false');
   c.list.forEach(b=>{if(on)b.removeAttribute('data-off');else b.setAttribute('data-off','1')});
  });
  const cur=cats.find(c=>c.key===key);
  if(cur){caption.innerHTML='<strong></strong><span></span>';caption.firstChild.textContent=cur.title+' ('+cur.list.length+')';caption.lastChild.textContent=cur.desc+' Sorted by level.'}
  if(reset)strip.scrollLeft=0;
 }
 function revealSelected(){
  const sel=strip.querySelector('.seed.on');if(!sel)return;
  if(sel.dataset.off==='1')show(sel.dataset.cat,false);
  strip.scrollLeft=Math.max(0,sel.offsetLeft-12);
 }

 // Dim seeds that the player's Farming level can't plant yet (render() writes "Lv N needed").
 const syncLock=b=>b.classList.toggle('locked',/needed/i.test(b.querySelector('span')?.textContent||''));
 const textWatch=new MutationObserver(ms=>{const seen=new Set();ms.forEach(m=>{const b=(m.target.nodeType===1?m.target:m.target.parentElement)?.closest('.seed');if(b&&!seen.has(b)){seen.add(b);syncLock(b)}})});
 // If a different seed becomes the selected one (loading a save, etc.), follow it to its tab.
 const selWatch=new MutationObserver(ms=>ms.forEach(m=>{
  const was=/(^|\s)on(\s|$)/.test(m.oldValue||''),now=m.target.classList.contains('on');
  if(!was&&now&&m.target.dataset.off==='1'){show(m.target.dataset.cat,false);strip.scrollLeft=Math.max(0,m.target.offsetLeft-12)}
 }));
 buttons.forEach(b=>{syncLock(b);textWatch.observe(b,{childList:true,characterData:true,subtree:true});selWatch.observe(b,{attributes:true,attributeFilter:['class'],attributeOldValue:true})});

 root.replaceChildren(tabs,caption,strip);root.classList.add('crop-picker');root.dataset.picker='v3';
 let first=cats[0]&&cats[0].key;
 try{const cur=byName.get(CROPS[S.sel].n);if(cur&&cur.dataset.cat)first=cur.dataset.cat}catch(_){}
 if(first){show(first,true);requestAnimationFrame(revealSelected)}
})();
