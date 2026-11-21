
/* ============================================================
   Icon auto-fit
   Every picture-based icon (animals, items, ores, bars, potions ...) was drawn inside a 64x64 / 100x100 box
   together with a different amount of empty transparent margin, so the same slot size produced tiny or huge icons.
   This module measures the real (visible) content of each sprite once, then re-frames it so that every icon fills
   the same share of its slot, in the farm, barn, shop, bag, forge and everywhere else.
   Sprites are never re-encoded or changed on disk; only the position/size of the <image> inside its SVG is adjusted.
   ============================================================ */
(()=>{'use strict';
 const FILL=.88;        // share of the slot that the visible artwork fills
 const FILL_BOX=.92;    // opaque rectangular pictures (framed portraits) look bigger, so they get a little less
 const ALPHA=96;        // pixels fainter than this (soft shadows, glows) do not count as "content"
 const SEL='svg.ic image,.sq svg image';
 const XL='http://www.w3.org/1999/xlink';
 const cache=new Map(),waiting=new Map();
 const idle=fn=>window.requestIdleCallback?requestIdleCallback(fn,{timeout:250}):setTimeout(fn,16);
 const sig=s=>s.length+':'+s.slice(60,120)+s.slice(s.length>>1,(s.length>>1)+60)+s.slice(-60);
 const hrefOf=el=>el.getAttribute('href')||el.getAttributeNS(XL,'href')||'';
 const isData=h=>h.length>40&&h.charCodeAt(0)===100&&h.startsWith('data:image/');

 function measure(href,done){
   const im=new Image();
   im.onload=()=>{
     try{
       const iw=im.naturalWidth||1,ih=im.naturalHeight||1,sc=Math.min(1,192/Math.max(iw,ih));
       const w=Math.max(1,Math.round(iw*sc)),h=Math.max(1,Math.round(ih*sc));
       const cv=document.createElement('canvas');cv.width=w;cv.height=h;
       const cx=cv.getContext('2d',{willReadFrequently:true});cx.drawImage(im,0,0,w,h);
       const d=cx.getImageData(0,0,w,h).data;
       let x0=w,y0=h,x1=-1,y1=-1,n=0;
       for(let y=0;y<h;y++){const row=y*w*4;for(let x=0;x<w;x++){if(d[row+x*4+3]>=ALPHA){n++;if(x<x0)x0=x;if(x>x1)x1=x;if(y<y0)y0=y;if(y>y1)y1=y}}}
       if(x1<0){done(0);return}
       const bw=x1-x0+1,bh=y1-y0+1;
       done({x0:x0/w,x1:(x1+1)/w,y0:y0/h,y1:(y1+1)/h,ar:iw/ih,dens:n/(bw*bh)});
     }catch(e){done(0)}
   };
   im.onerror=()=>done(0);
   im.decoding='async';im.src=href;
 }

 function place(el,m){
   const svg=el.ownerSVGElement;if(!svg||!svg.viewBox||!svg.viewBox.baseVal)return;
   if(svg.classList.contains('art')||svg.classList.contains('rpg-gate-art'))return;   // big monster / scenery art keeps its own framing
   const V=svg.viewBox.baseVal.width,VH=svg.viewBox.baseVal.height;
   if(!V||Math.abs(V-VH)>.5)return;
   const x=parseFloat(el.getAttribute('x')||0),y=parseFloat(el.getAttribute('y')||0),w=parseFloat(el.getAttribute('width')),h=parseFloat(el.getAttribute('height'));
   if(Math.abs(x)>.5||Math.abs(y)>.5||Math.abs(w-V)>.5||Math.abs(h-V)>.5)return;   // only plain full-box sprites are re-framed
   const fw=m.x1-m.x0,fh=m.y1-m.y0;if(fw<.06&&fh<.06)return;
   const cw=fw*m.ar,ch=fh,asp=Math.max(cw,ch)/Math.max(.001,Math.min(cw,ch)),fill=m.dens>.9?FILL_BOX:(asp>1.8?.98:FILL);   // very wide/tall sprites may use the full slot
   const k=V*fill/Math.max(cw,ch);
   el.setAttribute('width',(m.ar*k).toFixed(2));el.setAttribute('height',k.toFixed(2));
   el.setAttribute('x',(V/2-((m.x0+m.x1)/2)*m.ar*k).toFixed(2));
   el.setAttribute('y',(V/2-((m.y0+m.y1)/2)*k).toFixed(2));
   el.setAttribute('preserveAspectRatio','none');
   el.setAttribute('data-fit','1');
 }

 function handle(el){
   if(el.getAttribute('data-fit'))return;
   const href=hrefOf(el);if(!isData(href))return;
   const s=sig(href),m=cache.get(s);
   if(m!==undefined){if(m)place(el,m);else el.setAttribute('data-fit','0');return}
   if(waiting.has(s))return;
   waiting.set(s,1);
   measure(href,r=>{cache.set(s,r);waiting.delete(s);sweep()});
 }
 /* Hand-drawn vector animals (goose, turkey, horse ...) get the same treatment, measured with getBBox. */
 function vec(svg){
   if(svg.getAttribute('data-fit'))return;
   const vb=svg.viewBox&&svg.viewBox.baseVal;
   const g=svg.firstElementChild;
   if(svg.classList.contains('art')||!vb||vb.width!==100||vb.height!==100||!g||g.tagName!=='g'||g.getAttribute('stroke')!=='#241a35'||g.querySelector('image')){svg.setAttribute('data-fit','0');return}
   if(!svg.getClientRects().length)return;      // tab is hidden right now: measure later, when it is shown
   svg.setAttribute('data-fit','1');
   try{
     let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;
     [...g.children].forEach(c=>{
       if(c.tagName==='ellipse'&&c.getAttribute('opacity')&&parseFloat(c.getAttribute('cy'))>88)return;   // ground shadow does not count
       const b=c.getBBox();if(!b.width&&!b.height)return;
       x0=Math.min(x0,b.x);y0=Math.min(y0,b.y);x1=Math.max(x1,b.x+b.width);y1=Math.max(y1,b.y+b.height);
     });
     const w=x1-x0,h=y1-y0;if(!(w>8&&h>8))return;
     const k=Math.max(.85,Math.min(1.6,100*FILL/Math.max(w,h)));
     g.setAttribute('transform','translate('+(50-(x0+x1)/2*k).toFixed(2)+' '+(50-(y0+y1)/2*k).toFixed(2)+') scale('+k.toFixed(3)+')');
   }catch(_){}
 }
 function sweep(){document.querySelectorAll(SEL).forEach(handle);document.querySelectorAll('svg.ic').forEach(vec)}
 function scan(n){
   if(n.matches&&n.matches(SEL)){handle(n);return}
   if(n.querySelectorAll)n.querySelectorAll(SEL).forEach(handle);
   if(n.matches&&n.matches('svg.ic'))vec(n);
   else if(n.querySelectorAll)n.querySelectorAll('svg.ic').forEach(vec);
 }

 new MutationObserver(ms=>{for(const m of ms)for(const n of m.addedNodes)if(n.nodeType===1)scan(n)})
   .observe(document.documentElement,{childList:true,subtree:true});

 /* Warm the cache in the background (before the player reaches the menus), so icons never flash un-framed. */
 function warm(){
   const hrefs=new Set();
   const grab=str=>{if(typeof str!=='string')return;const re=/href="(data:image\/[^"]+)"/g;let r;while((r=re.exec(str)))hrefs.add(r[1])};
   try{if(typeof TINY_AI_ASSETS!=='undefined')Object.values(TINY_AI_ASSETS).forEach(v=>{if(isData(v))hrefs.add(v)})}catch(_){}
   try{if(typeof P!=='undefined')Object.keys(P).forEach(k=>{try{const f=P[k];grab(typeof f==='function'?f('#d6ad62'):f)}catch(_){}})}catch(_){}
   try{if(typeof ANIART!=='undefined')Object.values(ANIART).forEach(grab)}catch(_){}
   const q=[...hrefs].filter(h=>!cache.has(sig(h)));
   const next=()=>{
     if(!q.length){sweep();return}
     const h=q.shift(),s=sig(h);
     if(cache.has(s)||waiting.has(s)){next();return}
     waiting.set(s,1);
     measure(h,r=>{cache.set(s,r);waiting.delete(s);idle(next)});
   };
   next();
 }
 setInterval(()=>{document.querySelectorAll('svg.ic:not([data-fit])').forEach(vec)},1000);
 const start=()=>{sweep();setTimeout(()=>idle(warm),300)};
 if(document.readyState==='complete')start();else addEventListener('load',start,{once:true});
 window.__rpgIconFit={sweep,cache,measure};
})();
