/* ============================================================
   Pond fishing: ripple circles you cast into
   ============================================================ */
window.__pondMode=true;
let PS=null;
const css=document.createElement('style');
css.textContent=`
.rpg-fish-stage #lake{position:absolute;inset:0;z-index:3;overflow:hidden}
.pnd-spot{position:absolute;width:64px;height:64px;margin:-32px 0 0 -32px;padding:0;border:0;background:none;cursor:pointer;touch-action:manipulation;-webkit-tap-highlight-color:transparent;animation:pnd-in .5s ease-out both}
.pnd-spot i{position:absolute;inset:0;border-radius:50%;border:2px solid #e9fbffcc;box-shadow:0 0 10px #aef0ff88,inset 0 0 10px #aef0ff55;animation:pnd-ring 2.2s ease-out infinite}
.pnd-spot i.r2{animation-delay:1.1s}
.pnd-spot .disc{position:absolute;inset:8px;border-radius:50%;background:radial-gradient(circle,#bff3ff55,#1a6a8a40 70%,transparent);border:1px dashed #ffffffaa}
.pnd-spot .orb{position:absolute;inset:14px;animation:pnd-orbit 5s linear infinite}
.pnd-spot .orb svg{width:60%;height:60%;position:absolute;left:0;top:20%;filter:brightness(0) opacity(.38)}
.pnd-spot.wait i{border-color:#ffe9a8;animation-duration:1.2s}
.pnd-spot.bite i{border-color:#ff6a5a;box-shadow:0 0 14px #ff6a5a;animation-duration:.5s}
.pnd-spot.bite .disc{background:radial-gradient(circle,#ffb4a255,#c2302040 70%,transparent)}
.pnd-spot.leave{animation:pnd-out .4s ease-in both}
.pnd-spot .bob{position:absolute;left:50%;top:50%;width:30px;height:30px;margin:-22px 0 0 -15px;pointer-events:none;animation:pnd-drop .45s cubic-bezier(.2,.8,.3,1) both,pnd-bob 1.4s ease-in-out .45s infinite}
.pnd-spot.bite .bob{animation:pnd-drop .01s both,pnd-dip .22s ease-in-out infinite}
.pnd-spot .bang{position:absolute;left:50%;top:-14px;transform:translateX(-50%);min-width:24px;height:24px;border-radius:12px;background:#ee3d3a;color:#fff;font:800 16px/24px sans-serif;text-align:center;border:2px solid #fff;box-shadow:0 2px 6px #0008;animation:pnd-pop .25s ease-out both;pointer-events:none}
.pnd-line{position:absolute;height:2px;background:linear-gradient(90deg,#ffffffe0,#ffffff90);transform-origin:0 50%;z-index:2;pointer-events:none;box-shadow:0 0 3px #0006}
@keyframes pnd-in{from{opacity:0;transform:scale(.4)}to{opacity:1;transform:scale(1)}}
@keyframes pnd-out{to{opacity:0;transform:scale(.6)}}
@keyframes pnd-ring{0%{transform:scale(.55);opacity:.95}100%{transform:scale(1.25);opacity:0}}
@keyframes pnd-orbit{to{transform:rotate(360deg)}}
@keyframes pnd-drop{from{transform:translateY(-46px) scale(1.5);opacity:0}to{transform:none;opacity:1}}
@keyframes pnd-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(3px)}}
@keyframes pnd-dip{0%,100%{transform:translateY(0)}50%{transform:translateY(9px)}}
@keyframes pnd-pop{from{transform:translateX(-50%) scale(0)}to{transform:translateX(-50%) scale(1)}}
.pnd-info{margin-top:8px;padding:10px 12px;border:1px solid #6d8797;border-radius:12px;background:linear-gradient(145deg,#12303f,#0a1c29);color:#eaf8ff}
.pnd-chips{display:flex;flex-wrap:wrap;gap:6px;align-items:center}
.pnd-chips span{display:inline-block;border:1px solid #ffe2a1;background:#071b2bd9;border-radius:8px;padding:5px 8px;font-size:11px}
.pnd-chips #combo{border-color:#c5eaff;font-weight:700;margin-left:auto}
.pnd-hint{margin:8px 0 6px;font-size:12px;line-height:1.5;color:#d4ebf5}
.pnd-hint b{color:#ffe09a}
.pnd-loot{display:flex;flex-wrap:wrap;gap:6px}
.pnd-loot .rpg-fish-loot{display:inline-flex;align-items:center;gap:4px;font-size:11px;padding:3px 7px;border-radius:8px;background:#0006}
.pnd-loot .ic{width:22px;height:22px}

`;
document.head.appendChild(css);
VIEWS.fish=function(){
  school=[];combo=0;spawnT=0;PS={spots:[],n:0,spawnT:.3,line:null,caught:0};
  const idx=Math.min(Math.max(0,S.fz||0),ZF.length-1),z=ZF[idx];
  const labels=['Pond','Mountain River','Open Sea','Abyssal Trench'];
  const zones='<div class="rpg-water-zones">'+ZF.map((q,i)=>'<button class="rpg-water-zone '+(idx===i?'on':'')+'" data-x="fz" data-i="'+i+'" '+(L('fish')>=q[1]?'':'disabled')+'>'+icon(['fish','river','shark','kraken'][i],['#8fd9ec','#5ab8d1','#8cb5e6','#b28bff'][i])+'<b>'+labels[i]+'</b><small>'+(L('fish')>=q[1]?'Fish Lv '+q[1]+'+':'Unlock at Lv '+q[1])+'</small></button>').join('')+'</div>';
  const names=poolFish().slice(0,5).map(f=>'<span class="rpg-fish-loot">'+fIcon(f,'ic')+f.n+'</span>').join('');
  return '<div id="fskill">'+skillBar('fish')+'</div>'+zones+'<div class="stage s-fish rpg-fish-stage rpg-water-'+idx+'" id="stg" style="--rpg-water-hue:'+z[3]+'deg;--rpg-water-bright:'+z[4]+'">'+bg('fish').replace('rpg-water-bg','rpg-water-bg rpg-biome-'+idx)+'<div class="rpg-fish-atmosphere"></div><div id="lake"></div></div>'
   +'<div class="pnd-info"><div class="pnd-meter"><div class="pnd-mlab"><span id="fmlab">Tap a glowing ripple to cast</span><span id="fmcnt">Caught 0</span></div><div class="bar2 pnd-mbar idle" id="fmwrap"><i id="fmbar" style="width:0"></i></div></div><div class="pnd-chips"><span>🎣 '+labels[idx]+'</span><span>Fishing Lv '+L('fish')+'</span><span id="combo">Combo ×0</span></div>'
   +'<p class="pnd-hint"><b>1.</b> Tap a glowing ripple to cast your line. <b>2.</b> Wait for the bobber to dip and the <b>!</b> to appear. <b>3.</b> Tap the ripple again to reel the fish in. Quick chains build a combo.</p><div class="pnd-loot">'+names+'</div></div>';
};
function spotFish(){const a=poolFish();return a[Math.floor(Math.pow(Math.random(),.62/(1+.25*S.up.lure))*a.length)]}
function place(){
  for(let t=0;t<30;t++){const x=12+Math.random()*72,y=34+Math.random()*48;
    if(PS.spots.every(s=>Math.hypot((s.x-x)*1.6,(s.y-y)*2.2)>22))return[x,y]}
  return null;
}
function spawnSpot(){
  const lk=$('lake');if(!lk)return;const p=place();if(!p)return;
  const f=spotFish();if(!f)return;
  const el=document.createElement('button');el.className='pnd-spot';el.type='button';
  el.style.left=p[0]+'%';el.style.top=p[1]+'%';el.setAttribute('aria-label','Fishing spot');
  el.innerHTML='<i></i><i class="r2"></i><span class="disc"></span><span class="orb">'+fIcon(f)+'</span>';
  const s={id:'sp'+(++PS.n),x:p[0],y:p[1],f,st:'idle',t:9+Math.random()*6,el};if(window.V4&&V4.spotInit)V4.spotInit(s);
  el.dataset.spot=s.id;lk.appendChild(el);PS.spots.push(s);
}
function drop(s,leave){
  PS.spots=PS.spots.filter(x=>x!==s);
  if(PS.line&&PS.line.s===s){PS.line.el.remove();PS.line=null}
  if(leave){s.el.classList.add('leave');setTimeout(()=>s.el.remove(),400)}else s.el.remove();
}
function resetCombo(){combo=0;const c=$('combo');if(c)c.textContent='Combo ×0'}
function drawLine(s){
  const lk=$('lake');if(!lk)return;
  if(!PS.line){const l=document.createElement('div');l.className='pnd-line';lk.appendChild(l);PS.line={el:l,s}}
  PS.line.s=s;
  const W=lk.clientWidth,H=lk.clientHeight,ox=W*.12,oy=H+6,tx=W*s.x/100,ty=H*s.y/100-14;
  const dx=tx-ox,dy=ty-oy;PS.line.el.style.left=ox+'px';PS.line.el.style.top=oy+'px';
  PS.line.el.style.width=Math.hypot(dx,dy)+'px';PS.line.el.style.transform='rotate('+Math.atan2(dy,dx)+'rad)';
}
function cancelLine(){
  const cur=PS.spots.find(x=>x.st!=='idle');
  if(cur){cur.st='idle';cur.t=8;cur.el.classList.remove('wait','bite');const b=cur.el.querySelector('.bob'),g=cur.el.querySelector('.bang');if(b)b.remove();if(g)g.remove()}
  if(PS.line){PS.line.el.remove();PS.line=null}
}
function cast(s){
  cancelLine();
  s.st='wait';s.t=(.9+Math.random()*1.7)*Math.max(.4,1-.08*S.up.bait)/(on('fish')?1.6:1);s.t0=s.t;
  s.el.classList.add('wait');
  const b=document.createElement('span');b.className='bob';b.innerHTML=icon('bobber');s.el.appendChild(b);
  drawLine(s);try{SFX.water()}catch(e){}
}
function reel(s){
  const bob=s.el.querySelector('.bob')||s.el;
  school.push({f:s.f,id:s.id+':'+s.f.id,el:bob,x:0,v:0,dir:1});
  const key=s.id+':'+s.f.id;
  drop(s,false);
  catchFish(key);if(s.special&&window.V4&&V4.spotReward)V4.spotReward(s);
  PS.caught++;const fc=$('fmcnt');if(fc)fc.textContent='Caught '+PS.caught;const fs=$('fskill');if(fs)fs.innerHTML=skillBar('fish');
  PS.spawnT=Math.min(PS.spawnT,.5);
}
document.getElementById('pane').addEventListener('click',e=>{
  const b=e.target.closest('.pnd-spot');if(!b||!PS)return;
  const s=PS.spots.find(x=>x.id===b.dataset.spot);if(!s)return;
  if(s.st==='idle')cast(s);
  else if(s.st==='bite')reel(s);
  else{say('Too early! The fish was spooked.');try{SFX.err()}catch(e){}resetCombo();drop(s,true)}
});
let last=0,pondLoopRaf=0;
function loop(t){
  if(S.tab!=='fish'||!PS||!$('lake')||!$('intro').hidden){pondLoopRaf=0;return;}
  pondLoopRaf=requestAnimationFrame(loop);
  if(t-last<30)return; // 30 Hz is enough for the bait timer and reduces repeated DOM writes.
  const dt=Math.min(.1,(t-last)/1000)||0;last=t;
  PS.spawnT-=dt;
  const maxSpots=3+(L('fish')>=10?1:0);
  if(PS.spawnT<=0){if(PS.spots.length<maxSpots)spawnSpot();PS.spawnT=Math.max(.7,spawnGap()*.9)}
  [...PS.spots].forEach(s=>{
    s.t-=dt;
    if(s.st==='idle'&&s.t<=0)drop(s,true);
    else if(s.st==='wait'&&s.t<=0){
      s.st='bite';s.t=1.1+.06*S.up.rod;s.tb=s.t;s.el.classList.remove('wait');s.el.classList.add('bite');
      const g=document.createElement('span');g.className='bang';g.textContent='!';s.el.appendChild(g);
      try{SFX.coin()}catch(e){}
    }else if(s.st==='bite'&&s.t<=0){say('The fish got away...');resetCombo();drop(s,true)}
  });
  const cur=PS.spots.find(x=>x.st!=='idle'),ml=$('fmlab'),mb=$('fmbar'),mw=$('fmwrap');
  if(ml&&mb&&mw){
    if(!cur){ml.textContent='Tap a glowing ripple to cast';mb.style.width='0%';mw.className='bar2 pnd-mbar idle'}
    else if(cur.st==='wait'){ml.textContent='Waiting for a bite...';mb.style.width=Math.max(0,Math.min(100,(1-cur.t/(cur.t0||1))*100))+'%';mw.className='bar2 pnd-mbar'}
    else{ml.textContent='BITE! Tap the ripple now!';mb.style.width=Math.max(0,Math.min(100,cur.t/(cur.tb||1)*100))+'%';mw.className='bar2 pnd-mbar bite'}
  }
}
function startPondLoop(){
  if(!pondLoopRaf&&S.tab==='fish'&&PS&&$('lake')&&$('intro').hidden){last=0;pondLoopRaf=requestAnimationFrame(loop);}
}
const fishTabs=$('tabs'),fishPane=$('pane');
if(fishTabs)fishTabs.addEventListener('click',()=>setTimeout(startPondLoop,0));
// Also restart when the angler chooses a location from the fishing map.
if(fishPane)fishPane.addEventListener('click',()=>setTimeout(startPondLoop,0));
startPondLoop();
render();
window.__spritePackReady=true;
})();
