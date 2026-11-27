
(()=>{'use strict';
 const DATA=window.__RPG_GOBLIN_SPEAR_DATA;
 if(!DATA||!DATA.idleFrames?.length||!DATA.attackFrames?.length||!DATA.deathFrames?.length)return;
 const FRAME_MS={idle:1000/16,attack:[145,175,190,190],death:[130,150,180,220,300]};
 const ATTACK_WINDUP_S=.32, ATTACK_RETURN_MS=900, DEATH_END_AT=1250;
 const isSpear=foe=>!!foe&&foe.n==='Goblin Spear';
 const cache={idle:[],attack:[],death:[]};
 let loaded=false,loadPromise=null,activeHost=null,activeWrap=null,activeLegacy=null,activeImage=null,activeFoe=null;
 let frameTimer=null,actionTimer=null,playToken=0,currentMode='idle',modeUntil=0,attackArmed=false,deathState=null;
 const clearAction=()=>{if(actionTimer){clearTimeout(actionTimer);actionTimer=null}};
 function stopFrames(){if(frameTimer){clearTimeout(frameTimer);frameTimer=null}playToken++}
 function loadImage(src){return new Promise(resolve=>{const im=new Image();im.decoding='async';im.onload=()=>resolve(im);im.onerror=()=>resolve(null);im.src=src})}
 function preload(){
  if(loadPromise)return loadPromise;
  loadPromise=Promise.all([
   Promise.all(DATA.idleFrames.map(loadImage)),
   Promise.all(DATA.attackFrames.map(loadImage)),
   Promise.all(DATA.deathFrames.map(loadImage))
  ]).then(([i,a,d])=>{cache.idle=i;cache.attack=a;cache.death=d;loaded=[i,a,d].every(x=>x.length&&x.every(Boolean));return loaded})
   .catch(()=>{loaded=false;return false});
  return loadPromise;
 }
 function setImage(src,mode){
  if(!activeWrap||!activeWrap.isConnected)return;
  const im=document.createElement('img');im.alt='Goblin Spear '+mode+' animation';im.dataset.mode=mode;im.draggable=false;im.decoding='async';im.style.filter='none';im.style.transform='none';im.src=src;
  if(activeImage&&activeImage.isConnected)activeImage.replaceWith(im);else activeWrap.appendChild(im);
  activeImage=im;
 }
 function playIdle(){
  stopFrames();if(!loaded||!activeImage||!activeWrap?.isConnected)return;
  currentMode='idle';const token=playToken;let i=0;activeImage.dataset.mode='idle';activeImage.style.filter='none';activeImage.style.transform='scale(.68)';activeImage.src=cache.idle[0].src;
  const advance=()=>{if(token!==playToken||currentMode!=='idle'||!activeImage?.isConnected)return;
   i=(i+1)%cache.idle.length;activeImage.src=cache.idle[i].src;frameTimer=setTimeout(advance,FRAME_MS.idle)};
  frameTimer=setTimeout(advance,FRAME_MS.idle);
 }
 function playAction(mode){
  stopFrames();const seq=cache[mode];if(!seq?.length||!activeImage)return;
  const token=playToken;let i=0;activeImage.dataset.mode=mode;activeImage.src=seq[0].src;
  const advance=()=>{if(token!==playToken||currentMode!==mode||!activeImage?.isConnected)return;
   i++;if(i>=seq.length)return;activeImage.src=seq[i].src;frameTimer=setTimeout(advance,FRAME_MS[mode][Math.min(i,FRAME_MS[mode].length-1)])};
  frameTimer=setTimeout(advance,FRAME_MS[mode][0]);
 }
 function setMode(mode,force){
  if(deathState&&mode!=='death')return;
  const now=performance.now();if(!force&&mode==='attack'&&currentMode==='attack'&&now<modeUntil)return;
  clearAction();stopFrames();currentMode=mode;modeUntil=mode==='attack'?now+ATTACK_RETURN_MS:0;
  if(!loaded||!activeWrap?.isConnected)return;
  if(mode==='attack')playAction('attack');
  if(mode==='idle')playIdle();
  if(mode==='attack')actionTimer=setTimeout(()=>{if(!deathState&&currentMode==='attack'&&activeFoe===fight&&fight&&!fight.dead)playIdle()},ATTACK_RETURN_MS);
 }
 function restoreLegacy(){
  if(activeHost&&activeLegacy&&activeLegacy.isConnected){while(activeLegacy.firstChild)activeHost.insertBefore(activeLegacy.firstChild,activeWrap||activeLegacy);activeLegacy.remove()}
  if(activeWrap?.isConnected)activeWrap.remove();
  if(activeHost){activeHost.classList.remove('rpg-spear-host');activeHost.style.removeProperty('filter');activeHost.style.removeProperty('transform');activeHost.style.removeProperty('opacity')}
  activeHost=activeWrap=activeLegacy=activeImage=activeFoe=null;currentMode='idle';attackArmed=false;
 }
 function detach(){clearAction();stopFrames();restoreLegacy()}
 function attach(){
  if(deathState)return;
  if(typeof S==='undefined'||S.tab!=='fight'||typeof fight==='undefined'||!fight||!isSpear(fight)){if(activeHost)detach();return}
  const host=document.getElementById('eo');if(!host)return;
  if(host===activeHost&&activeWrap?.isConnected&&activeFoe===fight)return;
  detach();activeHost=host;activeFoe=fight;host.classList.add('rpg-spear-host');
  const legacy=document.createElement('div');legacy.className='rpg-spear-legacy spear-hidden';while(host.firstChild)legacy.appendChild(host.firstChild);
  const wrap=document.createElement('div');wrap.className='rpg-spear-wrap';
  const img=document.createElement('img');img.alt='Goblin Spear idle animation';img.src=DATA.idleFrames[0];wrap.appendChild(img);
  host.append(wrap,legacy);activeLegacy=legacy;activeWrap=wrap;activeImage=img;
  preload().then(ok=>{if(activeHost!==host||activeFoe!==fight||!wrap.isConnected)return;
   if(!ok){wrap.remove();legacy.classList.add('spear-hidden');host.classList.remove('rpg-spear-host');activeHost=activeWrap=activeLegacy=activeImage=activeFoe=null;return}
   legacy.classList.add('spear-hidden');wrap.style.opacity='1';playIdle();
  });
 }
 function mixBlendModeReset(el){el.style.setProperty('mix-blend-mode','normal','important')}
 function beginDeath(foe){
  if(!activeHost||!activeWrap?.isConnected||activeFoe!==foe||!loaded)return;
  clearAction();stopFrames();currentMode='death';attackArmed=false;deathState={foe,host:activeHost,wrap:activeWrap};
  const seq=cache.death;
  document.querySelectorAll('.v4ghost').forEach(g=>{if(g.querySelector('.rpg-spear-wrap,.rpg-spear-legacy'))g.remove()});
  [activeHost,activeWrap].forEach(el=>{if(el){el.style.setProperty('filter','none','important');el.style.setProperty('transform','none','important');el.style.setProperty('opacity','1','important');el.style.setProperty('animation','none','important');mixBlendModeReset(el)}});
  setImage(seq[0].src,'death');activeImage.style.setProperty('filter','none','important');activeImage.style.setProperty('transform','scale(.58)','important');activeImage.style.setProperty('opacity','1','important');activeImage.style.setProperty('mix-blend-mode','normal','important');const token=playToken;let i=0;
  const advance=()=>{if(token!==playToken||!deathState||!activeImage?.isConnected)return;
   i++;if(i>=seq.length)return;activeImage.src=seq[i].src;activeImage.style.setProperty('filter','none','important');activeImage.style.setProperty('transform','scale(.58)','important');activeImage.style.setProperty('opacity','1','important');activeImage.style.setProperty('mix-blend-mode','normal','important');activeImage.style.setProperty('object-fit','contain','important');frameTimer=setTimeout(advance,FRAME_MS.death[Math.min(i,FRAME_MS.death.length-1)])};
  frameTimer=setTimeout(advance,FRAME_MS.death[0]);
  deathState.endTimer=setTimeout(()=>{const state=deathState;if(!state)return;clearTimeout(state.endTimer);deathState=null;detach();try{render()}catch(e){}},DEATH_END_AT);
 }
 const previousRender=render;
 render=window.__RPG_DEATH_RENDER_GUARD(previousRender,()=>!!deathState,()=>{clearTimeout(deathState.endTimer);deathState=null;detach()},()=>requestAnimationFrame(attach));
 const previousStartFight=startFight;
 startFight=function(){if(deathState){clearTimeout(deathState.endTimer);deathState=null}detach();const result=previousStartFight.apply(this,arguments);requestAnimationFrame(attach);return result};
 const previousEnemyAttack=enemyAttack;
 enemyAttack=function(){const foe=fight;if(isSpear(foe)&&!foe.dead&&foe.hp>0&&!attackArmed)setMode('attack',true);const result=previousEnemyAttack.apply(this,arguments);if(isSpear(foe))attackArmed=false;return result};
 const previousCombatTick=combatTick;
 combatTick=function(dt){const foe=fight;if(isSpear(foe)&&!foe.dead&&foe.hp>0&&!deathState){const untilImpact=tele>0?tele:ecd;if(untilImpact>0&&untilImpact<=ATTACK_WINDUP_S+Math.max(0,dt)&&!attackArmed){attackArmed=true;setMode('attack',true)}}return previousCombatTick.apply(this,arguments)};
 const previousFoeDown=foeDown;
 foeDown=function(){const foe=fight,spear=isSpear(foe)&&activeFoe===foe&&foe&&foe.hp<=0&&!foe.dead;const armed=spear?beginDeath(foe):false;const result=previousFoeDown.apply(this,arguments);if(armed&&!result){clearTimeout(deathState&&deathState.endTimer);deathState=null;detach()}return result};
 const pane=document.getElementById('pane');if(pane){const observer=new MutationObserver(attach);observer.observe(pane,{childList:true,subtree:true})}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',attach,{once:true});else requestAnimationFrame(attach);
 window.__RPGGoblinSpearAnimation={preload,embedded:true,idleFrames:DATA.meta.idleFrames,attackFrames:DATA.attackFrames.length,deathFrames:DATA.deathFrames.length,attackWindupMs:Math.round(ATTACK_WINDUP_S*1000),deathDurationMs:DEATH_END_AT};
})();
