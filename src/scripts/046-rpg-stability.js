
(function rpgStability(){
  'use strict';
  if(window.__rpgStabilityReady)return;window.__rpgStabilityReady=true;
  const $id=id=>document.getElementById(id);

  /* 1. Pre-game screens: the bottom menu and the notification dock are hidden until the game itself is open. */
  const intro=$id('intro');
  const syncPre=()=>{
    const pre=(intro&&!intro.hidden)||!!$id('rpg-slot-screen')||!!$id('v4cls');
    document.body.classList.toggle('rpg-pregame',!!pre);
  };
  if(window.MutationObserver){
    if(intro)new MutationObserver(syncPre).observe(intro,{attributes:true,attributeFilter:['hidden']});
    new MutationObserver(syncPre).observe(document.body,{childList:true});
  }
  syncPre();

  /* 2. One dock for every notification: above the bottom menu, outside the play area. */
  const dock=document.createElement('div');dock.id='rpg-dock';dock.setAttribute('aria-live','polite');
  document.body.appendChild(dock);
  const nb=$id('v4n');if(nb)dock.appendChild(nb);
  const msg=$id('msg');if(msg)dock.appendChild(msg);   // the status line no longer pushes the page down

  /* 3. Preload and decode every embedded image once, before the game opens. */
  (function preload(){
    const play=$id('play'),cta=document.querySelector('#intro .cta');
    const dropCover=()=>{const c=$id('rpg-boot');if(!c||c.__out)return;c.__out=true;requestAnimationFrame(()=>{c.classList.add('out');setTimeout(()=>c.remove(),520)})};
    try{
      const poster=$id('poster'),m=poster&&(poster.style.backgroundImage||'').match(/url\(["']?(data:image[^"')]+)/);
      if(m){const im=new Image();im.decoding='async';im.src=m[1];(im.decode?im.decode():Promise.resolve()).catch(()=>{}).then(dropCover);window.__rpgTitleImg=im}
      else dropCover();
    }catch(e){dropCover()}
    setTimeout(dropCover,6000);
    const urls=new Set();
    document.querySelectorAll('script,style').forEach(el=>{
      const t=el.textContent;if(!t||t.length<3000)return;
      const m=t.match(/data:image\/[a-z0-9.+-]+;base64,[A-Za-z0-9+\/=]+/gi);
      if(m)m.forEach(u=>urls.add(u));
    });
    const list=[...urls],total=list.length;
    if(!total)return;
    const keep=window.__rpgImgKeep=[];
    let bar=null,box=null,label=null;
    if(cta&&play){
      box=document.createElement('div');box.id='rpg-preload';
      box.innerHTML='<b><i></i></b><span>Loading artwork…</span>';
      bar=box.querySelector('i');label=box.querySelector('span');
      cta.insertBefore(box,play);
      play.disabled=true;
    }
    let finished=false,done=0,next=0,active=0;
    const finish=()=>{
      if(finished)return;finished=true;
      if(play)play.disabled=false;
      if(box){box.classList.add('done');setTimeout(()=>box.remove(),600)}
    };
    const pump=()=>{
      while(active<6&&next<total){
        const im=new Image();im.decoding='async';keep.push(im);im.src=list[next++];active++;
        (im.decode?im.decode():Promise.resolve()).catch(()=>{}).then(()=>{
          active--;done++;
          if(bar)bar.style.width=Math.round(done/total*100)+'%';
          if(done>=total)finish();else pump();
        });
      }
    };
    pump();
    setTimeout(finish,5000);   // never keep the player waiting on a slow device
  })();

  /* 4. Re-rendering a tab must never shrink the page for a moment (that is what threw mobile players to the top). */
  if(typeof render==='function'&&typeof S!=='undefined'){
    const baseRender=render;let lastTab=S.tab;
    // render() runs 4x per second on Farm/Barn and used to rebuild the coin counter, skill bar and weather strip every time
    // (re-parsing their icons -> flicker). Identical writes are now skipped.
    const ihDesc=Object.getOwnPropertyDescriptor(Element.prototype,'innerHTML');
    const guardHtml=el=>{
      if(!el||el.__ihGuard||!ihDesc||!ihDesc.set)return;el.__ihGuard=true;
      Object.defineProperty(el,'innerHTML',{configurable:true,get(){return ihDesc.get.call(this)},set(v){
        v=String(v);if(this.__lastH===v&&this.childNodes.length===this.__lastN)return;
        ihDesc.set.call(this,v);this.__lastH=v;this.__lastN=this.childNodes.length;
      }});
    };
    const GUARDED=['coins','fsk','bsk','v4wx','bx'];
    const scroller=()=>document.scrollingElement||document.documentElement;
    render=function(){
      GUARDED.forEach(id=>guardHtml($id(id)));
      const pane=$id('pane');
      const tabChanged=S.tab!==lastTab;
      const keepSize=!!pane&&!pane.hidden&&!tabChanged&&S.tab!=='farm'&&S.tab!=='barn';
      let y=0;
      if(keepSize){y=scroller().scrollTop;pane.style.minHeight=pane.offsetHeight+'px';}
      lastTab=S.tab;
      const result=baseRender.apply(this,arguments);
      if(keepSize){
        if(Math.abs(scroller().scrollTop-y)>1)scroller().scrollTop=y;
        clearTimeout(pane._mhT);pane._mhT=setTimeout(()=>{pane.style.minHeight=''},450);
      }
      if(tabChanged){const on=document.querySelector('#tabs button.on');if(on&&on.scrollIntoView){try{on.scrollIntoView({inline:'nearest',block:'nearest'})}catch(_){}}}
      return result;
    };
  }

  /* 4b. Saved plants are drawn at boot; make sure they are redrawn with the current crop art (stall() skips unchanged keys). */
  try{if(typeof els!=='undefined'&&Array.isArray(els))els.forEach(x=>{if(x)x.k=null});if(typeof render==='function')render()}catch(e){}

  /* 5. Fishing layout: title, combo and meter above the water; fish journal beside it (PC) or under it (phone). */
  if(typeof VIEWS!=='undefined'&&typeof VIEWS.fish==='function'&&!VIEWS.fish.__layoutWrapped){
    const baseFish=VIEWS.fish;
    const wrapped=function(){
      const html=baseFish.apply(this,arguments);
      if(typeof html!=='string'||html.indexOf('rpg-fish-stage')<0)return html;
      try{
        const t=document.createElement('template');t.innerHTML=html;
        const stage=t.content.querySelector('.rpg-fish-stage');
        if(!stage||!stage.parentNode||stage.closest('.fish-layout'))return html;
        const banner=stage.querySelector('.pond-stage-banner'),meter=stage.querySelector('.pond-live-meter'),cat=stage.querySelector('.pond-fish-catalog');
        if(!banner&&!meter&&!cat)return html;
        const hud=document.createElement('div');hud.className='fish-hud';
        const row=document.createElement('div');row.className='fish-hud-row';
        if(banner){
          const ttl=document.createElement('div');ttl.className='fish-hud-title';
          const meta=banner.querySelector('.pond-stage-meta');
          [...banner.children].forEach(c=>{if(c!==meta)ttl.appendChild(c)});
          row.appendChild(ttl);if(meta)row.appendChild(meta);banner.remove();
        }
        hud.appendChild(row);if(meter)hud.appendChild(meter);
        const layout=document.createElement('div');layout.className='fish-layout';
        stage.parentNode.insertBefore(layout,stage);
        layout.appendChild(stage);if(cat)layout.appendChild(cat);
        layout.parentNode.insertBefore(hud,layout);
        return t.innerHTML;
      }catch(e){console.error('Fishing layout:',e);return html}
    };
    wrapped.__layoutWrapped=true;VIEWS.fish=wrapped;
    // A saved session that opens directly on Fish needs one fresh render to use the new layout.
    try{if(S.tab==='fish'&&typeof render==='function')render()}catch(e){console.error(e)}
  }
})();
