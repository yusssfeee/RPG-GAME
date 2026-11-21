
(()=>{'use strict';
  /* All animation art is embedded in this HTML. The supplied sword-and-shield sprite is registered as the generic Goblin. */
  const KIND_BY_NAME={'Goblin':'goblin','Goblin Archer':'archer','Goblin Chief':'orcChief'};
  const FRAME_COUNTS={goblin:9,archer:12,orcChief:8};
  const FRAME_MS={goblin:160,archer:112,orcChief:130};
  const FRAME_DATA=window.__RPG_GOBLIN_FRAMES||{};
  /* The generic Goblin frames are stored under the legacy key 'warrior' in this build. */
  if(!FRAME_DATA.goblin&&FRAME_DATA.warrior)FRAME_DATA.goblin=FRAME_DATA.warrior;
  const ATTACK_DATA=window.__RPG_GOBLIN_ATTACK_FRAMES||{};
  const HURT_DATA=window.__RPG_GOBLIN_HURT_FRAMES||{};
  const DEATH_DATA=window.__RPG_GOBLIN_DEATH_FRAMES||{};
  const HURT_MS={goblin:[120,120,170],archer:[130,130,130,130,130],orcChief:[110,110,110,110,110,110,110,110]};
  const DEATH_MS={goblin:[70,75,90,130,230],archer:[120,120,130,150,150,1000],orcChief:[]};
  const FRAME_CACHE=Object.create(null),ATTACK_CACHE=Object.create(null),HURT_CACHE=Object.create(null),DEATH_CACHE=Object.create(null);
  let activeHost=null,activeWrap=null,activeFoe=null,activeKind=null,activeMainImg=null,atkImg=null;
  let decoded=[],atkDecoded=[],hurtDecoded=[],deathDecoded=[];
  let frameIndex=-1,atkIndex=-1,cycleAt=0,lastTick=0,mode='legacy',atkState=null,hurtState=null,deathState=null;
  let hitTimer=null,pendingHurt=false;
  const kindFor=foe=>foe&&KIND_BY_NAME[foe.n]||null;
  /* Every frame lives in its own <img> inside one stack; switching frames only toggles opacity, so nothing is re-decoded and nothing blinks. */
  let stackPool=null,stackCur=null,atkFrameNodes=[],atkLayer=null;
  function poolEl(src){
    if(!stackPool||!activeMainImg)return null;
    let el=stackPool.get(src);
    if(!el){
      el=[...decoded,...hurtDecoded,...deathDecoded].find(frame=>frame&&frame.src===src)||null;
      if(!el){el=new Image();el.alt='';el.draggable=false;el.decoding='sync';el.src=src;}
      activeMainImg.appendChild(el);stackPool.set(src,el)
    }
    return el;
  }
  function pushFrame(src){
    const el=poolEl(src);if(!el)return;
    if(stackCur&&stackCur!==el)stackCur.style.opacity='0';
    el.style.opacity='1';stackCur=el;
  }
  function prefillPool(){
    if(!stackPool||stackPool.size)return;
    [decoded,hurtDecoded,deathDecoded].forEach(list=>(list||[]).forEach(f=>{if(f&&f.src)poolEl(f.src)}));
  }
  const clearHit=()=>{if(hitTimer){clearTimeout(hitTimer);hitTimer=null}};
  const loadOne=src=>new Promise(resolve=>{const im=new Image();im.decoding='sync';im.onload=()=>{const done=()=>resolve(im);if(im.decode)im.decode().then(done).catch(done);else done()};im.onerror=()=>resolve(null);im.src=src});
  const loadList=list=>Promise.all((list||[]).map(loadOne));
  function setMode(next){
    if(!activeWrap||!activeWrap.isConnected)return;
    mode=next;
    activeWrap.dataset.mode=next==='legacy'?'legacy':next==='loading'?'loading':'move';
    activeWrap.dataset.atk=next==='attack'?'1':'0';
    activeWrap.dataset.state=next;
    if(next!=='attack'){clearHit();atkState=null;if(atkFrameNodes[atkIndex])atkFrameNodes[atkIndex].classList.remove('is-current');atkIndex=-1}
    if(next==='move'){
      hurtState=null;prefillPool();
      if(activeMainImg){activeMainImg.style.transition='none';activeMainImg.style.opacity='1';activeMainImg.style.filter='';}
      cycleAt=performance.now();frameIndex=-1;showFrame(0);
    }
  }
  function showFrame(i){
    const frame=decoded[i];if(!activeMainImg||!frame||frameIndex===i)return;
    pushFrame(frame.src);frameIndex=i;
  }
  function buildAttackStack(){
    if(!atkImg||atkFrameNodes.length||!atkDecoded.length)return;
    atkDecoded.forEach((frame,i)=>{const el=frame;el.alt='';el.draggable=false;el.className='rpg-atk-frame';atkImg.appendChild(el);atkFrameNodes.push(el)});
  }
  function showAtk(i){
    if(!atkImg||!atkDecoded[i])return;buildAttackStack();
    if(atkIndex===i)return;
    if(atkFrameNodes[atkIndex])atkFrameNodes[atkIndex].classList.remove('is-current');
    if(atkFrameNodes[i])atkFrameNodes[i].classList.add('is-current');atkIndex=i;
  }
  function showHurt(i){
    const frame=hurtDecoded[i];if(!activeMainImg||!frame)return;
    pushFrame(frame.src);
  }
  function showDeath(i){
    const frame=deathDecoded[i];if(!activeMainImg||!frame)return;
    pushFrame(frame.src);
  }
  function decodeKind(kind,host,foe,wrap){
    const cached=FRAME_CACHE[kind]&&ATTACK_CACHE[kind];
    if(cached){
      decoded=FRAME_CACHE[kind];atkDecoded=ATTACK_CACHE[kind];hurtDecoded=HURT_CACHE[kind]||[];deathDecoded=DEATH_CACHE[kind]||[];buildAttackStack();
      if(activeHost===host&&activeFoe===foe&&wrap.isConnected)setMode('move');
      return;
    }
    Promise.all([
      loadList(FRAME_DATA[kind]),
      loadList(ATTACK_DATA[kind]&&ATTACK_DATA[kind].frames),
      loadList(HURT_DATA[kind]||[]),
      loadList(DEATH_DATA[kind]||[])
    ]).then(([idle,attack,hurt,death])=>{
      if(activeHost!==host||activeFoe!==foe||!wrap.isConnected)return;
      if(idle.length===FRAME_COUNTS[kind]&&idle.every(Boolean)){
        FRAME_CACHE[kind]=idle;decoded=idle;
        ATTACK_CACHE[kind]=attack.filter(Boolean);atkDecoded=ATTACK_CACHE[kind];buildAttackStack();
        HURT_CACHE[kind]=hurt.filter(Boolean);hurtDecoded=HURT_CACHE[kind];
        DEATH_CACHE[kind]=death.filter(Boolean);deathDecoded=DEATH_CACHE[kind];
        setMode('move');
      }else{
        /* Keep the legacy drawing hidden. If a partial set decoded, use it rather than flashing the old static sprite. */
        const usable=idle.filter(Boolean);
        if(usable.length){FRAME_CACHE[kind]=usable;decoded=usable;ATTACK_CACHE[kind]=attack.filter(Boolean);atkDecoded=ATTACK_CACHE[kind];buildAttackStack();HURT_CACHE[kind]=hurt.filter(Boolean);hurtDecoded=HURT_CACHE[kind];DEATH_CACHE[kind]=death.filter(Boolean);deathDecoded=DEATH_CACHE[kind];setMode('move');}
        else{setMode('loading');console.warn('[Goblin animations] No idle frames decoded; legacy artwork remains hidden.');}
      }
    }).catch(err=>{if(activeHost===host&&activeFoe===foe)setMode('legacy');console.warn('[Goblin animations] preload failed',err)});
  }
  function detach(){
    clearHit();pendingHurt=false;atkState=null;hurtState=null;deathState=null;
    activeHost=activeWrap=activeFoe=activeKind=activeMainImg=atkImg=null;stackPool=null;stackCur=null;atkFrameNodes=[];atkLayer=null;
    decoded=atkDecoded=hurtDecoded=deathDecoded=[];frameIndex=atkIndex=-1;mode='legacy';
  }
  function attach(){
    if(deathState)return;
    if(typeof S==='undefined'||S.tab!=='fight'||typeof fight==='undefined'||!fight){if(activeHost)detach();return;}
    const kind=kindFor(fight),host=document.getElementById('eo');
    if(!kind||!host){if(activeHost)detach();return;}
    if(host===activeHost&&activeWrap&&activeWrap.isConnected&&activeFoe===fight)return;
    detach();activeHost=host;activeFoe=fight;activeKind=kind;
    const legacy=document.createElement('div');legacy.className='rpg-goblin-legacy-layer';
    while(host.firstChild)legacy.appendChild(host.firstChild);
    const wrap=document.createElement('div');wrap.className='rpg-goblin-combat-wrap';wrap.dataset.kind=kind;wrap.dataset.mode='loading';wrap.dataset.state='loading';
    const move=document.createElement('div');move.className='rpg-goblin-move-layer';
    const img=document.createElement('div');img.className='rpg-goblin-stack';img.setAttribute('role','img');img.setAttribute('aria-label',kind==='archer'?'Goblin Archer':kind==='orcChief'?'Orc Berserker':'Goblin');move.appendChild(img);activeMainImg=img;stackPool=new Map();stackCur=null;
    const cfg=ATTACK_DATA[kind];
    if(cfg&&cfg.box){
      const ai=document.createElement('div');ai.className='rpg-atk-stack';ai.setAttribute('aria-hidden','true');
      const b=cfg.box,r=b.ref;
      ai.style.left=(b.left/r*100)+'%';ai.style.top=(b.top/r*100)+'%';ai.style.width=(b.w/r*100)+'%';ai.style.height=(b.h/r*100)+'%';
      move.appendChild(ai);atkImg=ai;
    }
    wrap.append(move,legacy);host.appendChild(wrap);activeWrap=wrap;
    decodeKind(kind,host,fight,wrap);
  }
  function startAttack(foe,args,heavy){
    const cfg=ATTACK_DATA[activeKind];if(!cfg||!atkDecoded.length)return false;
    const sum=n=>cfg.ms.slice(0,n).reduce((a,b)=>a+b,0);
    const hitAt=sum(cfg.hit),skip=heavy?hitAt:0;
    clearHit();pendingHurt=false;hurtState=null;
    atkState={start:performance.now()-skip,ms:cfg.ms,total:sum(cfg.ms.length),hitAt,fired:false,args:Array.from(args),foe};
    atkIndex=-1;setMode('attack');showAtk(heavy?Math.min(cfg.hit,atkDecoded.length-1):0);
    hitTimer=setTimeout(fireHit,Math.max(0,hitAt-skip));
    if(activeKind==='goblin')try{window.__rpgGobSfx.dagger(hitAt,skip)}catch(e){}
    return true;
  }
  const previousEnemyAttack=enemyAttack;
  function fireHit(){
    hitTimer=null;const st=atkState;if(!st||st.fired)return;if(st.armed)return;st.fired=true;
    if(fight!==st.foe||st.foe.dead||st.foe.hp<=0||activeFoe!==st.foe)return;
    previousEnemyAttack.apply(null,st.args);
  }
  function startHurt(){
    if(!activeWrap||!activeWrap.isConnected||!activeMainImg||deathState||mode==='death')return;
    if(mode==='attack'&&atkState&&!atkState.fired){pendingHurt=true;return;}
    clearHit();atkState=null;pendingHurt=false;hurtState={start:performance.now()};
    setMode('hurt');
    // The Archer has dedicated reaction frames. The generic Goblin gets a brief clean color flash without shifting its feet.
    if(hurtDecoded.length)showHurt(0);
    else if(activeMainImg)activeMainImg.style.filter='brightness(1.28) saturate(1.2) drop-shadow(0 0 7px #ff6655aa)';
  }
  function finishDeath(shouldRender){
    if(!deathState)return;
    const state=deathState;deathState=null;mode='legacy';pendingHurt=false;clearHit();atkState=null;hurtState=null;
    if(state.main&&state.main.isConnected){state.main.style.transition='none';state.main.style.opacity='1';state.main.style.filter='';}
    if(state.wrap&&state.wrap.isConnected){state.wrap.dataset.state='move';state.wrap.dataset.atk='0';}
    if(shouldRender!==false){try{render()}catch(e){console.warn('[Goblin animations] render after death failed',e)}}
  }
  function mixBlendModeReset(el){el.style.setProperty('mix-blend-mode','normal','important')}
 function beginDeath(foe){
    if(!activeHost||!activeWrap||!activeWrap.isConnected||activeFoe!==foe||deathState)return false;
    clearHit();pendingHurt=false;atkState=null;hurtState=null;mode='death';
    activeWrap.dataset.mode='move';activeWrap.dataset.atk='0';activeWrap.dataset.state='death';
    if(activeMainImg){activeMainImg.style.transition='none';activeMainImg.style.opacity='1';activeMainImg.style.filter='';}
    const seq=deathDecoded||[];
    const durations=DEATH_MS[activeKind]||[];
    const total=seq.length?durations.slice(0,seq.length).reduce((a,b)=>a+b,0):560;
    deathState={foe,wrap:activeWrap,main:activeMainImg,start:performance.now(),seq,durations,total,simple:!seq.length};
    if(seq.length)showDeath(0);
    else if(activeMainImg){
      // No Goblin death frames were supplied: keep the same Goblin art and fade it out in place (no scale or grayscale effect).
      setTimeout(()=>{if(deathState&&deathState.foe===foe&&activeMainImg){activeMainImg.style.transition='opacity 390ms linear';activeMainImg.style.opacity='0'}},80);
    }
    return true;
  }
  const previousFoeDown=foeDown;
  foeDown=function(){
    const foe=fight,kind=kindFor(foe),willDie=!!(kind&&activeFoe===foe&&activeWrap&&activeWrap.isConnected&&foe&&foe.hp<=0&&!foe.dead);
    if(willDie)beginDeath(foe); // Arm the render lock before the core advances or clears the encounter.
    const result=previousFoeDown.apply(this,arguments);
    if(willDie&&!result)finishDeath(false);
    return result;
  };
  const previousStrike=strike;
  strike=function(){
    const foe=fight,before=foe?foe.hp:Infinity,result=previousStrike.apply(this,arguments);
    if(foe&&kindFor(foe)&&activeFoe===foe&&fight===foe&&foe.hp<before&&foe.hp>0&&!foe.dead)startHurt();
    return result;
  };
  enemyAttack=function(heavy){
    const foe=fight,kind=kindFor(foe);
    if(kind&&ATTACK_DATA[kind]&&atkImg&&atkDecoded.length&&decoded.length===FRAME_COUNTS[kind]&&foe&&foe.hp>0&&!foe.dead&&activeFoe===foe&&activeWrap&&activeWrap.isConnected){
      if(atkState&&!atkState.fired){
        if(atkState.armed){atkState.fired=true;return previousEnemyAttack.apply(this,arguments);} // anticipated animation: land the hit exactly now
        return;
      }
      startAttack(foe,arguments,!!heavy);return;
    }
    return previousEnemyAttack.apply(this,arguments);
  };
  /* Regular Goblin: start the attack animation shortly BEFORE the attack lands so the blow connects on the hit frame. */
  function armAttack(untilSec){
    const cfg=ATTACK_DATA[activeKind];if(!cfg||!atkDecoded.length||deathState)return;
    const sum=n=>cfg.ms.slice(0,n).reduce((a,b)=>a+b,0);
    const hitAt=sum(cfg.hit),ahead=Math.max(0,hitAt-untilSec*1000);
    clearHit();pendingHurt=false;hurtState=null;
    atkState={start:performance.now()-ahead,ms:cfg.ms,total:sum(cfg.ms.length),hitAt,fired:false,armed:true,args:null,foe:activeFoe};
    atkIndex=-1;setMode('attack');showAtk(0);
    if(activeKind==='goblin')try{window.__rpgGobSfx.dagger(hitAt,ahead)}catch(e){}
  }
  const previousCombatTick=combatTick;
  combatTick=function(dt){
    try{
      const foe=fight;
      if(foe&&activeKind==='goblin'&&activeFoe===foe&&!foe.dead&&foe.hp>0&&!deathState&&(mode==='move'||mode==='hurt')&&activeWrap&&activeWrap.isConnected&&atkDecoded.length&&ATTACK_DATA.goblin){
        const cfg=ATTACK_DATA.goblin,hitSec=cfg.ms.slice(0,cfg.hit).reduce((a,b)=>a+b,0)/1000;
        const until=tele>0?tele:ecd;
        if(until>0&&until<=hitSec+Math.max(0,dt))armAttack(until);
      }
    }catch(e){console.warn('[Goblin animations] anticipation skipped',e)}
    return previousCombatTick.apply(this,arguments);
  };
  const previousRender=render;
  render=function(){
    if(deathState){if(S&&S.tab==='fight')return;finishDeath(false);}
    const result=previousRender.apply(this,arguments);requestAnimationFrame(attach);return result;
  };
  const previousStartFight=startFight;
  startFight=function(){if(deathState)finishDeath(false);detach();return previousStartFight.apply(this,arguments)};
  document.addEventListener('click',e=>{if(deathState&&e.target&&e.target.closest&&e.target.closest('#stg'))finishDeath(true)},true);
  const pane=document.getElementById('pane');
  if(pane){const observer=new MutationObserver(()=>attach());observer.observe(pane,{childList:true,subtree:true});}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',attach,{once:true});else requestAnimationFrame(attach);
  function tick(now){
    requestAnimationFrame(tick);
    if(now-lastTick<16)return;lastTick=now;
    if(!activeWrap||!activeWrap.isConnected||S.tab!=='fight')return;
    if(mode==='attack'){
      if(!atkState){setMode('move');return;}
      const t=now-atkState.start;
      if(t>=atkState.total){if(!atkState.fired)fireHit();atkState=null;setMode('move');if(pendingHurt)startHurt();return;}
      let acc=0,i=0;for(;i<atkState.ms.length;i++){acc+=atkState.ms[i];if(t<acc)break;}
      showAtk(Math.min(i,atkDecoded.length-1));return;
    }
    if(mode==='hurt'){
      const t=now-(hurtState?hurtState.start:now),seq=hurtDecoded,ms=HURT_MS[activeKind]||[];
      const total=seq.length?ms.slice(0,seq.length).reduce((a,b)=>a+b,0):260;
      if(t>=total){hurtState=null;setMode('move');return;}
      if(seq.length){let acc=0,i=0;for(;i<ms.length;i++){acc+=ms[i];if(t<acc)break;}showHurt(Math.min(i,seq.length-1));}
      return;
    }
    if(mode==='death'&&deathState){
      const st=deathState,t=now-st.start;
      if(st.seq.length){let acc=0,i=0;for(;i<st.durations.length;i++){acc+=st.durations[i];if(t<acc)break;}if(i<st.seq.length)showDeath(i);if(t>=st.total)finishDeath(true);}
      else if(t>=st.total)finishDeath(true);
      return;
    }
    if(mode!=='move'||!decoded.length||!activeMainImg)return;
    const duration=FRAME_MS[activeKind]||110,index=Math.floor(Math.max(0,now-cycleAt)/duration)%decoded.length;
    showFrame(index);
  }
  requestAnimationFrame(tick);
  window.__RPGGoblinCombatAnimation={frames:FRAME_COUNTS,kindFor,attack:Object.keys(ATTACK_DATA),hurt:Object.keys(HURT_DATA),death:Object.keys(DEATH_DATA),embedded:true};
})();
