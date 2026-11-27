
/* Tap an equipment slot on the adventurer sheet to cycle that piece. */
document.addEventListener('click',e=>{
  const b=e.target&&e.target.closest?e.target.closest('[data-doll]'):null;
  if(!b)return;
  const k=b.dataset.doll;
  try{
    const owned=IT.filter(i=>i.c===k&&cnt(i.id)>0);
    if(owned.length<2)return;
    const cur=S.eq[k],at=owned.findIndex(x=>x.id===cur);
    const next=owned[(at+1)%owned.length];
    equip(next.id);
    render();
  }catch(_){}
});
