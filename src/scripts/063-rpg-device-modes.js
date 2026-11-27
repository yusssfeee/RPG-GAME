
/* Device modes: phone vs desktop, notification behaviour, farm icon sizing. */
(()=>{
  'use strict';
  const root=document.documentElement;
  const isMobile=()=>{
    try{if(matchMedia('(pointer:coarse)').matches)return true}catch(_){}
    return Math.min(innerWidth,screen.width||9999)<=700;
  };
  const apply=()=>{root.dataset.device=isMobile()?'mobile':'desktop'};
  apply();
  addEventListener('resize',apply,{passive:true});

  /* remember the active tab so CSS can react to it */
  const syncTab=()=>{
    const b=document.querySelector('#tabs button.on');
    if(b&&b.dataset&&b.dataset.k)document.body.dataset.tab=b.dataset.k;
  };
  syncTab();
  const tabHost=document.getElementById('tabs');
  if(tabHost&&window.MutationObserver){
    new MutationObserver(syncTab).observe(tabHost,{subtree:true,attributes:true,attributeFilter:['class']});
  }

  /* tab change: notifications fade out quickly instead of disappearing at once */
  const hurry=()=>{
    const n=document.getElementById('v4n');
    if(n)[...n.children].forEach(c=>{
      clearTimeout(c._t);
      try{c.animate([{opacity:1,transform:'translateY(0)'},{opacity:0,transform:'translateY(-6px)'}],{duration:420,easing:'ease',fill:'forwards'})}
      catch(_){c.style.opacity='0'}
      setTimeout(()=>c.remove(),440);
    });
    const m=document.getElementById('msg');
    if(m&&m.textContent){
      m.style.transition='opacity .35s ease';
      m.style.opacity='0';
      setTimeout(()=>{m.textContent='';m.style.opacity=''},360);
    }
  };
  document.addEventListener('click',e=>{
    const btn=e.target&&e.target.closest?e.target.closest('#tabs button'):null;
    if(btn){hurry();setTimeout(()=>{try{btn.scrollIntoView({block:'nearest',inline:'center',behavior:'smooth'})}catch(_){}},60)}
  },true);

  /* keep the page clear of the (wrapping) bottom tab bar */
  const nav=document.querySelector('nav');
  if(nav){
    const sync=()=>{const h=nav.getBoundingClientRect().height;if(h>0)root.style.setProperty('--nav-h',Math.round(h)+'px')};
    sync();
    if(window.ResizeObserver)new ResizeObserver(sync).observe(nav);
    else addEventListener('resize',sync);
  }
})();
