
/* ============================================================
   Goblin family animations (Goblin, Goblin Archer, Goblin Chief / King)
   Sprites were cut from the supplied sprite sheet into 4 packed atlases.
   - standing : the enemy simply stands still in front of you (no idle movement)
   - attack   : plays once each time the enemy attacks you
   - death    : plays in place, cross-faded frame to frame; the scene (background / next room) only changes AFTER it ends
   ============================================================ */
(()=>{'use strict';
 const ATLAS={"goblin":{"w":1024,"h":698,"frames":[[398,168,124,154,-64.8],[524,168,116,154,-65.2],[0,168,112,156,-60.2],[0,0,120,166,-65.8],[122,0,134,164,-60.2],[412,0,136,160,-69.4],[114,168,128,156,-78.0],[704,0,132,158,-65.0],[838,0,130,158,-64.5],[550,0,152,160,-75.0],[258,0,152,162,-70.4],[244,168,152,156,-70.5],[0,438,118,104,-72.3],[314,438,136,98,-53.2],[0,326,122,110,-49.2],[642,168,124,114,-43.1],[124,326,152,110,-65.6],[278,326,132,110,-61.4],[548,326,162,106,-60.5],[712,326,194,106,-81.2],[412,326,134,108,-76.9],[768,168,148,114,-70.4],[452,438,96,92,-54.9],[120,438,98,102,-50.2],[220,438,92,102,-46.4],[550,438,108,88,-65.6],[660,438,118,88,-79.9],[780,438,114,82,-70.8],[452,544,124,76,-65.5],[0,544,104,78,-65.5],[896,438,104,82,-60.6],[166,624,124,66,-72.6],[762,544,156,72,-62.2],[106,544,158,78,-59.1],[578,544,182,74,-98.8],[0,624,164,72,-85.6],[266,544,184,78,-63.3]],"anims":{"idle":[0,1,2,3,4,5,6,7,8,9,10,11],"attack":[12,13,14,15,16,17,18,19,20,21],"hurt":[22,23,24,25,26],"death":[27,28,28,31,35,35]},"webp":"{{RAW:raw-rpg-goblin-anim-1.webp}}"},"archer":{"w":1024,"h":570,"frames":[[670,0,128,148,-80.6],[800,0,136,148,-78.3],[0,156,128,148,-70.9],[278,0,132,150,-73.8],[412,0,130,150,-80.8],[544,0,124,150,-76.1],[0,0,128,154,-68.9],[268,156,122,144,-66.5],[130,156,136,148,-71.2],[392,156,144,144,-66.7],[130,0,146,152,-67.0],[118,306,104,116,-61.4],[782,156,110,118,-56.8],[538,156,122,122,-56.1],[662,156,118,122,-63.1],[894,156,122,118,-61.8],[224,306,126,116,-58.8],[0,306,116,118,-54.6],[482,306,120,112,-56.9],[352,306,128,114,-74.6],[604,306,118,88,-67.3],[0,426,108,86,-76.4],[724,306,108,88,-65.1],[834,306,102,88,-68.8],[110,426,104,66,-57.0],[592,426,108,64,-61.2],[216,426,112,66,-59.8],[330,426,122,66,-59.2],[454,426,136,66,-55.8],[176,514,144,52,-51.0],[322,514,152,52,-50.7],[702,426,156,60,-87.1],[476,514,170,52,-55.8],[0,514,174,54,-67.6],[0,0,109,67,-59,"archer_x"],[0,67,155,63,-85,"archer_x"],[0,130,156,60,-87,"archer_x"]],"anims":{"idle":[0,1,2,3,4,5,6,7,8,9,10],"attack":[11,12,13,14,15,16,17,18,19],"hurt":[20,21,22,23],"death":[24,34,26,35,36]},"webp":"{{RAW:raw-rpg-goblin-anim-2.webp}}","deathMs":55},"chief":{"w":1024,"h":788,"frames":[[0,0,168,192,-110.2],[170,0,166,190,-94.6],[852,0,152,180,-101.8],[338,0,170,184,-98.2],[308,194,142,178,-92.6],[684,0,166,182,-101.3],[452,194,156,168,-79.2],[834,194,148,164,-72.9],[0,194,142,180,-83.7],[610,194,222,166,-143.5],[144,194,162,180,-98.0],[510,0,172,184,-119.5],[0,376,198,150,-150.2],[810,376,184,138,-139.6],[200,376,186,144,-134.4],[388,376,140,142,-66.8],[0,528,148,136,-74.4],[150,528,120,132,-77.8],[530,376,130,142,-79.4],[662,376,146,142,-68.6],[272,528,150,126,-92.2],[216,666,164,114,-113.3],[382,666,166,104,-114.4],[424,528,218,124,-134.9],[644,528,192,122,-120.4],[0,666,214,120,-146.2]],"anims":{"idle":[0,1,2,3,4,5,6,7,8,9,10,11],"attack":[12,13,14,15,16,17],"hurt":[18,19],"death":[20,21,23,22]},"webp":"{{RAW:raw-rpg-goblin-anim-3.webp}}"},"warrior_x":{"w":148,"h":64,"frames":[],"anims":{},"webp":"{{RAW:raw-rpg-goblin-anim-4.webp}}"},"archer_x":{"w":156,"h":190,"frames":[],"anims":{},"webp":"{{RAW:raw-rpg-goblin-anim-5.webp}}"}};
 const SPEED={attack:70,death:80};       // ms per frame (death was 170 -> shortened)
 const HOLD=220,FADE=260;               // how long the fallen enemy stays, then fades (was 650/650)
 /* The atlases live in ONE stylesheet as data: URLs (always allowed, unlike blob: which some viewers block).
    Sprites are only used once the image has really loaded; otherwise the game keeps the original static goblin art. */
 const READY={};
 {const st=document.createElement('style');st.id='rpg-goblin-atlas';
  st.textContent=Object.keys(ATLAS).map(k=>'.gf[data-k="'+k+'"]{background-image:url(data:image/webp;base64,'+ATLAS[k].webp+');background-size:'+ATLAS[k].w+'px '+ATLAS[k].h+'px}').join('\n');
  document.head.appendChild(st);
  Object.keys(ATLAS).forEach(k=>{const im=new Image();im.onload=()=>{READY[k]=true};im.onerror=()=>{READY[k]=false};im.src='data:image/webp;base64,'+ATLAS[k].webp});}
 const STYLE={   // sprite family, tint, size for each enemy
  'Goblin':null, // The new full-resolution Goblin animation is mounted by rpg-goblin-combat-fix.
  'Goblin Shaman':null, // Dedicated Goblin Wizard WebP animations are attached by the self-contained module at the end of this file.
  'Goblin Alchemist':{k:'goblin',f:'hue-rotate(-32deg) saturate(1.25)'},
  'Goblin Archer':null, // Full-resolution Archer frames and death are mounted by rpg-goblin-combat-fix.
  'Goblin Chief':{k:'chief'},
  'Goblin King':{k:'chief',f:'hue-rotate(-14deg) saturate(1.3) drop-shadow(0 0 8px #ffd84d99)',s:1.12}
 };
 const styleFor=n=>STYLE[n]||null;
 const lay=(g,k,i,op)=>{const f=ATLAS[k].frames[i];
   {const k2=f[5]||k;if(g.dataset.k!==k2)g.dataset.k=k2}g.style.width=f[2]+'px';g.style.height=f[3]+'px';g.style.left=f[4]+'px';g.style.backgroundPosition='-'+f[0]+'px -'+f[1]+'px';if(op!=null)g.style.opacity=op};
 const setFrame=(el,k,i)=>{if(el._i===i)return;el._i=i;lay(el.firstElementChild,k,i)};
 const html=(st)=>{
   const a=ATLAS[st.k],f=a.frames[a.anims.idle[0]],s=st.s||1;
   return '<div class="gspr"'+(st.f?' style="filter:'+st.f+'"':'')+'><div class="gsp" data-k="'+st.k+'" style="transform:scaleX(-1) scale('+s+')"><div class="gf" data-k="'+st.k+'" style="width:'+f[2]+'px;height:'+f[3]+'px;left:'+f[4]+'px;background-position:-'+f[0]+'px -'+f[1]+'px"></div></div></div>'};

 let AT=null;          // running attack animation {t0}
 let DY=null;          // running death animation  {el,k,t0,seq,done}
 const ease=x=>x*x*(3-2*x);
 let last=0;
 function tick(now){
   requestAnimationFrame(tick);
   if(now-last<16)return;last=now;
   if(AT){
     const el=document.querySelector('#eo .gsp');
     if(!el)AT=null;
     else{const k=el.dataset.k,seq=ATLAS[k].anims.attack,i=Math.floor(Math.max(0,now-AT.t0)/SPEED.attack);
       if(i>=seq.length){AT=null;setFrame(el,k,ATLAS[k].anims.idle[0])}else setFrame(el,k,seq[i])}
   }
   if(DY){
     const el=DY.el;
     if(!document.contains(el)){endDeath();return}
     const seq=DY.seq,ms=DY.ms||SPEED.death,span=(seq.length-1)*ms,t=Math.max(0,now-DY.t0);
     const p=Math.min(t,span)/ms,i=Math.min(seq.length-1,Math.floor(p)),fr=ease(Math.min(1,p-i));
     const A=el.firstElementChild,B=DY.B;
     lay(A,DY.k,seq[i],i<seq.length-1?1-fr:1);                              // current pose fades out ...
     if(i<seq.length-1)lay(B,DY.k,seq[i+1],fr);else B.style.opacity=0;      // ... while the next pose fades in
     if(t>span+HOLD&&!DY.fade){DY.fade=1;const g=el.parentElement;g.style.transition='opacity '+FADE+'ms ease';g.style.opacity='0'}
     if(t>span+HOLD+FADE)endDeath();
   }
 }
 requestAnimationFrame(tick);

 /* The scene must not change until the enemy is really dead: while the death animation runs, redraws of the fight tab are held back. */
 function endDeath(){if(!DY)return;DY=null;try{render()}catch(e){console.warn(e)}}
 const _rn=render;
 render=function(){
   if(DY){if(S.tab==='fight')return;DY=null}   // leaving the fight tab cancels the wait
   return _rn.apply(this,arguments)};
 document.addEventListener('click',e=>{if(DY&&e.target.closest&&e.target.closest('#stg'))endDeath()},true);   // tap the scene to skip

 /* ----- put the sprite into the fight scene ----- */
 const _vf=VIEWS.fight;
 VIEWS.fight=function(){
   const h=_vf.apply(this,arguments),st=fight&&styleFor(fight.n);
   if(!st||!READY[st.k])return h;     // not loaded (or blocked): keep the original goblin art, never an empty spot
   return h.replace(/(<div class="obj[^"]*" id="eo">)<svg[\s\S]*?<\/svg>(<\/div>)/,(m,a,b)=>a+html(st)+b);
 };
 const _sf=startFight;
 startFight=function(){AT=null;DY=null;return _sf.apply(this,arguments)};
 /* ----- events ----- */
 const _ea=enemyAttack;
 enemyAttack=function(){const f=fight,r=_ea.apply(this,arguments);
   if(f&&fight===f&&!f.dead&&f.hp>0&&styleFor(f.n))AT={t0:performance.now()};return r};
 const _fd=foeDown;
 foeDown=function(){
   const f=fight,s=document.querySelector('#eo .gsp'),r=_fd.apply(this,arguments);
   if(f&&s&&styleFor(f.n)){
     document.querySelectorAll('.v4ghost').forEach(x=>x.remove());   // the old white 'puff' clone would double the sprite; the coin burst stays
     if(r){
       const k=s.dataset.k,B=s.firstElementChild.cloneNode(false);B.style.opacity=0;s.appendChild(B);
       AT=null;DY={el:s,k,B,t0:performance.now(),seq:ATLAS[k].anims.death,ms:ATLAS[k].deathMs};
       const hb=document.getElementById('ehp'),tx=document.getElementById('etxt'),ef=document.getElementById('ef');   // enemy bars show it is dead
       if(hb)hb.style.width='0%';if(ef)ef.style.width='0%';if(tx)tx.textContent=tx.textContent.replace(/\d+(\s*\/\s*\d+)/,'0$1');
     }
   }
   return r};
window.__goblinAnim={ATLAS,styleFor};
})();
