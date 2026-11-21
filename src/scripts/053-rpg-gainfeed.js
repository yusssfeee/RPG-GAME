
/* ============================================================
   Gain feed
   Watches the inventory, the gear list and the coins. Whenever something goes up - from fishing, farming, mining, drops,
   crafting, buying, selling, anything - a small card with the item's icon, amount and name pops up and fades away.
   Items of the same kind merge into one card (+3, then +5 becomes +8).
   ============================================================ */
(()=>{'use strict';
 const LIFE=2600,MAXCARDS=9,BULK=14;
 let box=null,snap=null,snapS=null,started=performance.now();
 const cards=new Map();   // key -> {el,qty,t}
 const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 function iconOf(kind,id){
   try{
     if(kind==='coin')return icon('coin','#ffd15a');
     if(kind==='gear'){const it=IT.find(x=>x.id===id);if(it)return iIcon(it)}
     return gIcon(id);
   }catch(e){try{return icon('chest','#d6ad62')}catch(_){return ''}}
 }
 function nameOf(kind,id){
   if(kind==='coin')return 'Coins';
   if(kind==='gear'){const it=IT.find(x=>x.id===id);if(it)return it.n}
   try{return nm(id)}catch(e){return String(id).replace(/_/g,' ')}
 }
 function ensureBox(){if(!box||!box.isConnected){box=document.getElementById('gainfeed')||document.body.appendChild(Object.assign(document.createElement('div'),{id:'gainfeed'}))}return box}
 function show(kind,id,q){
   const key=kind+':'+id,b=ensureBox(),old=cards.get(key);
   if(old&&old.el.isConnected&&!old.el.classList.contains('out')){
     old.qty+=q;old.el.querySelector('.gq').textContent='+'+old.qty;
     old.el.classList.remove('bump');void old.el.offsetWidth;old.el.classList.add('bump');
     clearTimeout(old.t);old.t=setTimeout(()=>fade(key),LIFE);return;
   }
   const el=document.createElement('div');el.className='gn '+kind;
   el.innerHTML='<span class="gi">'+iconOf(kind,id)+'</span><span class="gq">+'+q+'</span><span class="gt">'+esc(nameOf(kind,id))+'</span>';
   b.appendChild(el);
   const c={el,qty:q,t:setTimeout(()=>fade(key),LIFE)};cards.set(key,c);
   while(b.children.length>MAXCARDS){const f=b.firstElementChild;for(const [k,v] of cards)if(v.el===f){clearTimeout(v.t);cards.delete(k)}f.remove()}
 }
 function fade(key){const c=cards.get(key);if(!c)return;c.el.classList.add('out');setTimeout(()=>{c.el.remove();if(cards.get(key)===c)cards.delete(key)},420)}
 function take(){return {inv:Object.assign({},S.inv),items:Object.assign({},S.items||{}),coins:S.coins}}
 function check(){
   let cur;
   try{if(typeof S==='undefined'||!S||!S.inv)return;cur=take()}catch(e){return}
   if(snapS!==S||!snap||performance.now()-started<1500){snapS=S;snap=cur;return}   // first look, new game or slot change: no popups
   const gains=[];
   for(const id in cur.inv){const d=(cur.inv[id]||0)-(snap.inv[id]||0);if(d>0)gains.push(['inv',id,d])}
   for(const id in cur.items){const d=(cur.items[id]||0)-(snap.items[id]||0);if(d>0)gains.push(['gear',id,d])}
   const dc=(cur.coins||0)-(snap.coins||0);
   snap=cur;
   if(gains.length>=BULK)return;                                  // a whole save was loaded, not a real gain
   if(dc>0)gains.push(['coin','coin',Math.round(dc)]);
   gains.forEach(g=>{try{show(g[0],g[1],g[2])}catch(e){}});
 }
 setInterval(check,150);
 window.__rpgGainFeed={check,show};
})();
