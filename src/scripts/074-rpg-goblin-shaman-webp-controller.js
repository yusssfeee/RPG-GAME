
(()=>{'use strict';
 const DATA=window.__RPG_GOBLIN_SHAMAN_WEBP;
 if(!DATA||!DATA.idle||!DATA.attackFrames||!DATA.hurtFrames||!DATA.deathFrames)return;
 const MODES=['idle','attack','hurt','death'];
 const FRAMES={attack:DATA.attackFrames,hurt:DATA.hurtFrames,death:DATA.deathFrames};
 const FRAME_MS={attack:[145,175,235,195,160],hurt:[195,195,195,195],death:[105,125,155,215]};
 const ATTACK_WINDUP_S=.32; // projectile-release frame starts at the exact damage tick
 const RETURN_MS={attack:1010,hurt:860};
 const DEATH_END_AT=600; // four selected poses: 160ms + 190ms + 240ms transitions, then 330ms final-pose hold
 const isShaman=foe=>!!foe&&foe.n==='Goblin Shaman';
 const cache=Object.create(null);
 let activeHost=null,activeWrap=null,activeLegacy=null,activeImage=null,activeFoe=null;
 let loaded=false,loadPromise=null,pendingMode='idle',actionTimer=null,deathState=null;
 let currentMode='idle',modeUntil=0,attackArmed=false,pendingHurt=false;
 let frameTimer=null,playToken=0;
 const clearAction=()=>{if(actionTimer){clearTimeout(actionTimer);actionTimer=null}};
 function stopFrames(){if(frameTimer){clearTimeout(frameTimer);frameTimer=null}playToken++}
 function loadImage(src){return new Promise(resolve=>{const im=new Image();im.decoding='async';im.onload=()=>resolve(im);im.onerror=()=>resolve(null);im.src=src})}
 function preload(){
   if(loadPromise)return loadPromise;
   loadPromise=Promise.all([loadImage(DATA.idle),...Object.keys(FRAMES).map(k=>Promise.all(FRAMES[k].map(loadImage)))]).then(list=>{
     cache.idle=list[0];cache.attack=list[1];cache.hurt=list[2];cache.death=list[3];
     loaded=!!cache.idle&&['attack','hurt','death'].every(k=>cache[k]&&cache[k].length===FRAMES[k].length&&cache[k].every(Boolean));
     return loaded;
   }).catch(()=>{loaded=false;return false});
   return loadPromise;
 }
 function sourceFor(mode){
   if(mode==='idle')return DATA.idle;
   const arr=cache[mode]||[];return arr[0]?.src||FRAMES[mode]?.[0]||'';
 }
 function imageFor(mode){
   const next=document.createElement('img');next.alt='Goblin Shaman '+mode+' animation';next.dataset.mode=mode;
   next.draggable=false;next.decoding='async';next.src=sourceFor(mode);return next;
 }
 function playFrames(mode){
   stopFrames();const seq=cache[mode],durations=FRAME_MS[mode];
   if(!seq||!seq.length||!activeImage)return;
   try{if(mode==='attack')window.__rpgGobSfx.magic();else if(mode==='death')window.__rpgGobSfx.vanish()}catch(e){}
   const token=playToken;let i=0;
   activeImage.dataset.mode=mode;activeImage.style.filter='none';activeImage.style.transform='none';activeImage.src=seq[0].src;
   const advance=()=>{
     if(token!==playToken||currentMode!==mode||!activeImage||!activeImage.isConnected)return;
     i++;if(i>=seq.length)return; // keep the final pose visible until the state timer ends
     activeImage.src=seq[i].src;
     frameTimer=setTimeout(advance,durations[i]);
   };
   frameTimer=setTimeout(advance,durations[0]);
 }
 function setMode(mode,force){
   if(deathState&&mode!=='death')return;
   const now=performance.now();
   if(!force&&mode==='hurt'&&currentMode==='attack'&&now<modeUntil){pendingHurt=true;return}
   if(!force&&mode==='attack'&&currentMode==='attack'&&now<modeUntil)return;
   clearAction();stopFrames();currentMode=mode;pendingMode=mode;
   const duration=RETURN_MS[mode]||0;modeUntil=duration?now+duration:0;
   if(!loaded||!activeWrap||!activeWrap.isConnected||!activeImage)return;
   const next=imageFor(mode);if(activeImage.isConnected)activeImage.replaceWith(next);else activeWrap.appendChild(next);activeImage=next;
   if(mode==='attack'||mode==='hurt')playFrames(mode);
   if(duration)actionTimer=setTimeout(()=>{
     if(!deathState&&currentMode===mode&&activeWrap&&activeWrap.isConnected&&activeFoe===fight&&fight&&!fight.dead){
       if(mode==='attack'&&pendingHurt){pendingHurt=false;setMode('hurt',true)}else setMode('idle',true);
     }
   },duration);
 }
 function restoreLegacy(){
   if(activeHost&&activeLegacy&&activeLegacy.isConnected){while(activeLegacy.firstChild)activeHost.insertBefore(activeLegacy.firstChild,activeWrap||activeLegacy);activeLegacy.remove()}
   if(activeWrap&&activeWrap.isConnected)activeWrap.remove();
   if(activeHost)activeHost.classList.remove('rpg-shaman-host','rpg-shaman-death-lock');
   activeHost=activeWrap=activeLegacy=activeImage=activeFoe=null;
   currentMode='idle';modeUntil=0;attackArmed=false;pendingHurt=false;pendingMode='idle';
 }
 function detach(){clearAction();stopFrames();restoreLegacy()}
 function attach(){
   if(deathState)return;
   if(typeof S==='undefined'||S.tab!=='fight'||typeof fight==='undefined'||!fight||!isShaman(fight)){if(activeHost)detach();return}
   const host=document.getElementById('eo');if(!host)return;
   if(host===activeHost&&activeWrap&&activeWrap.isConnected&&activeFoe===fight)return;
   detach();activeHost=host;activeFoe=fight;host.classList.add('rpg-shaman-host');
   const legacy=document.createElement('div');legacy.className='rpg-shaman-legacy gws-hidden';while(host.firstChild)legacy.appendChild(host.firstChild);
   const wrap=document.createElement('div');wrap.className='rpg-shaman-wrap';
   const img=imageFor('idle');wrap.appendChild(img);host.append(wrap,legacy);activeLegacy=legacy;activeWrap=wrap;activeImage=img;
   preload().then(ok=>{
     if(activeHost!==host||activeFoe!==fight||!wrap.isConnected)return;
     if(!ok){wrap.remove();legacy.classList.add('gws-hidden');host.classList.remove('rpg-shaman-host');activeHost=activeWrap=activeLegacy=activeImage=activeFoe=null;return;}
     legacy.classList.add('gws-hidden');wrap.style.opacity='1';setMode(pendingMode||'idle',true);
   });
 }
 function clearDeathTimers(state){if(state)clearTimeout(state.endTimer)}
 function finishDeath(shouldRender){
   const state=deathState;if(!state)return;
   clearDeathTimers(state);stopFrames();deathState=null;attackArmed=false;pendingHurt=false;
   if(state.host&&state.host.isConnected)state.host.classList.remove('rpg-shaman-death-lock');
   if(shouldRender!==false){try{render()}catch(e){console.warn('[Goblin Wizard] Could not refresh after death:',e)}}
 }
 function mixBlendModeReset(el){el.style.setProperty('mix-blend-mode','normal','important')}
 function beginDeath(foe){
   if(!activeHost||!activeWrap||!activeWrap.isConnected||activeFoe!==foe)return;
   clearAction();stopFrames();currentMode='death';modeUntil=0;attackArmed=false;pendingHurt=false;
   const state={foe,wrap:activeWrap,host:activeHost};deathState=state;
   // Older V4 code cloned the Shaman into a full-screen grayscale/zoom ghost; remove any stale clone.
   document.querySelectorAll('.v4ghost').forEach(g=>{if(g.querySelector('.rpg-shaman-wrap,.rpg-shaman-legacy'))g.remove()});
   state.host.classList.add('rpg-shaman-death-lock');
   const next=imageFor('death');if(activeImage&&activeImage.isConnected)activeImage.replaceWith(next);else activeWrap.appendChild(next);activeImage=next;
   state.wrap.style.width='100%';state.wrap.style.height='100%';state.wrap.style.transform='none';
   state.wrap.style.animation='none';state.wrap.style.transition='none';state.wrap.style.opacity='1';
   next.style.transform='none';next.style.filter='drop-shadow(0 4px 6px #0009)';
   playFrames('death');
   state.endTimer=setTimeout(()=>finishDeath(true),DEATH_END_AT);
 }
 const previousRender=render;
 render=function(){if(deathState){if(S&&S.tab==='fight')return;finishDeath(false)}const result=previousRender.apply(this,arguments);requestAnimationFrame(attach);return result};
 const previousStartFight=startFight;
 startFight=function(){if(deathState)finishDeath(false);detach();const result=previousStartFight.apply(this,arguments);requestAnimationFrame(attach);return result};
 const previousStrike=strike;
 strike=function(){const foe=fight,before=foe&&foe.hp;const result=previousStrike.apply(this,arguments);if(isShaman(foe)&&fight===foe&&!foe.dead&&foe.hp<before)setMode('hurt',false);return result};
 const previousEnemyAttack=enemyAttack;
 enemyAttack=function(){const foe=fight;if(isShaman(foe)&&!foe.dead&&foe.hp>0&&!attackArmed)setMode('attack',true);const result=previousEnemyAttack.apply(this,arguments);if(isShaman(foe))attackArmed=false;return result};
 const previousCombatTick=combatTick;
 combatTick=function(dt){const foe=fight;if(isShaman(foe)&&!foe.dead&&foe.hp>0&&!deathState){const untilImpact=tele>0?tele:ecd;if(untilImpact>0&&untilImpact<=ATTACK_WINDUP_S+Math.max(0,dt)&&!attackArmed){attackArmed=true;setMode('attack',true)}}return previousCombatTick.apply(this,arguments)};
 const previousFoeDown=foeDown;
 foeDown=function(){const foe=fight,shaman=isShaman(foe)&&activeFoe===foe;const result=previousFoeDown.apply(this,arguments);if(shaman&&result)beginDeath(foe);return result};
 document.addEventListener('click',e=>{if(deathState&&e.target&&e.target.closest&&e.target.closest('#stg'))finishDeath(true)},true);
 const pane=document.getElementById('pane');if(pane){const observer=new MutationObserver(attach);observer.observe(pane,{childList:true,subtree:true})}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',attach,{once:true});else requestAnimationFrame(attach);
 window.__RPGGoblinShamanAnimation={assets:DATA.meta,embedded:true,preload,attackWindupMs:Math.round(ATTACK_WINDUP_S*1000),attackDurationMs:RETURN_MS.attack,hurtDurationMs:RETURN_MS.hurt,deathDurationMs:DEATH_END_AT,deathFrameCount:FRAMES.death.length};
})();
