/* ---------- combat: dungeons, abilities, statuses ---------- */
let fight=null,cd=0,ecd=0,shT=0,en=100,guardT=0,focus=false,slowT=0,eatk=0,tele=0,mom=0,dot={t:0,dps:0,k:''},dotAcc=0;
const anim=(e,c)=>{if(!e)return;e.classList.remove(c);void e.offsetWidth;e.classList.add(c)};
function fx(t,c,side){const s=$('stg');if(!s)return;const e=document.createElement('span');e.className='fx '+c;e.textContent=t;e.style.left=side==='me'?'18%':(30+Math.random()*34)+'%';e.style.top=side==='me'?'60%':'26%';s.appendChild(e);setTimeout(()=>e.remove(),900)}
const statusText=()=>[guardT>0?'Guarding':'',focus?'Focused':'',slowT>0?'Slowed '+Math.ceil(slowT)+'s':'',dot.t>0?dot.k+' '+Math.ceil(dot.t)+'s':'',mom>0?'Momentum x'+mom:''].filter(Boolean).join('   ')||'No status effects';
function upd(){
  S.sh=Math.min(S.sh,maxSh());S.hp=Math.min(S.hp,maxHp());
  const set=(id,w,t)=>{const e=$(id);if(!e)return;if(w!=null)e.style.width=Math.max(0,Math.min(1,w)*100)+'%';if(t!=null)e.textContent=t};
  set('php',S.hp/maxHp());set('pht',null,Math.ceil(S.hp)+' / '+maxHp());
  set('psh',maxSh()?S.sh/maxSh():0);set('psht',null,Math.ceil(S.sh)+' / '+maxSh());
  set('pen',en/100);set('pent',null,Math.floor(en)+' / 100');
  if(fight){const f=fight;set('ehp',f.hp/f.max);set('etxt',null,(f.fin?'GREATER BOSS ':f.b?'BOSS ':f.elite?'ELITE ':'')+f.n+' '+Math.max(0,Math.ceil(f.hp))+' / '+f.max+(f.def?'   Armor '+f.def:'')+(f.rage?'   ENRAGED':''))}
  set('bPot',null,'Heal potion ('+healCount()+')');set('bf',null,buffText());set('st',null,statusText());
}
function mkFoe(name,m,flag,bm){
  const f=FOES.find(x=>x.n===name),t=TR[name]||{},boss=flag==='b'||flag==='z',k=boss?(bm||1):m,hp=Math.round(f.hp*k);
  return {...f,...t,hp,max:hp,atk:f.atk*k,xp:Math.round(f.xp*(boss?1:m)),c:Math.round(f.c*(boss?1:m)),b:boss?1:0,fin:flag==='z',elite:flag==='e',sp:f.sp*(flag==='e'?.9:1),def:t.def||0,dodge:t.dodge||0};
}
function startFight(f){if(!f)return;f.dead=false;fight=f;CAB.reset();cd=0;ecd=f.sp*1.3;eatk=0;tele=0;mom=0;focus=false;guardT=0;slowT=0;dot={t:0,dps:0,k:''};dotAcc=0}
function explore(){
  const r=Math.random(),l=L('combat');
  if(r<.15){const c=earn(rnd(8,20)+l*6,'combat');S.coins+=c;addXp('combat',2);say('You found a chest with '+c+' coins.');SFX.coin()}
  else if(r<.25){S.hp=maxHp();S.sh=maxSh();say('You rested at a quiet shrine and healed fully.');SFX.eat()}
  else{const el=FOES.filter(x=>!x.b&&x.l<=l+1),f=el[Math.floor(Math.sqrt(Math.random())*el.length)];startFight(mkFoe(f.n,1,'f'));say('A '+f.n+' appears!');SFX.bite()}
}
/* dungeon flow */
const dgDef=()=>DG.find(d=>d.id===S.dg.id);
function dgEnter(id){const d=DG.find(x=>x.id===id);if(!d||L('combat')<d.l||S.dg)return false;S.dg={id,room:0,chest:false};say('You enter the '+d.n+'. '+DGR.length+' rooms await.');SFX.boss()}
function dgLeave(){S.dg=null;say('You left the dungeon. Progress in it is lost.');SFX.err()}
function dgDoor(){
  const d=dgDef(),r=DGR[S.dg.room],m=d.dm*(1+.1*S.dg.room);let f;
  if(r==='b')f=mkFoe(d.boss,1,'b',d.bm);
  else if(r==='z')f=mkFoe(d.final,1,'z',d.fm||1);
  else if(r==='e')f=mkFoe(d.elite,(1+.1*S.dg.room)*1.3,'e');
  else f=mkFoe((d.id==='goblin'&&S.dg.room===0)?'Goblin Spear':d.mons[rnd(0,d.mons.length-1)],m,'f');
  startFight(f);
  if(r==='z'){say('The greater boss guards the treasure: '+f.n+'!');SFX.boss()}else if(r==='b'){say('Dungeon boss: '+f.n+'!');SFX.boss()}else{say('A '+f.n+' attacks!');SFX.bite()}
}
function dgCamp(){S.hp=Math.min(maxHp(),S.hp+maxHp()*.4);S.sh=maxSh();S.dg.room++;say('You rest by the fire: 40% health and a full shield.');SFX.eat()}
function dgChest(){toast('Treasure chest opened!','reward');
  const d=dgDef(),first=!S.clears[d.id];
  const c=earn(d.ch*(first?2.5:1)*(.8+Math.random()*.4),'combat');S.coins+=c;const got=[];
  (DROPS[d.final]||[]).forEach(x=>{const q=rnd(x[2],x[3]);S.inv[x[0]]=inv(x[0])+q;got.push(q+' '+nm(x[0]))});
  if(Math.random()<.16){const pool=IT.filter(i=>i.r&&i.l<=d.l+3);const g=pool[rnd(0,pool.length-1)];S.items[g.id]=cnt(g.id)+1;got.push(g.n)}
  S.inv.pot_hp2=inv('pot_hp2')+1;got.push('Healing Potion');
  S.clears[d.id]=(S.clears[d.id]||0)+1;addXp('combat',d.l*25);
  say('Treasure! '+c+' coins'+(first?' (first clear bonus)':'')+', '+got.join(', ')+'.');SFX.lvl();S.dg=null;
}
/* fighting */
function foeDown(){
  const f=fight;
  if(!f || f.dead || f.hp>0) return false;
  f.dead=true; f.hp=0;CAB.kill(f);
  const c=earn(f.c,'combat');S.coins+=c;addXp('combat',f.xp);S.kills++;
  const got=[];(DROPS[f.n]||[]).forEach(d=>{if(f.b||Math.random()<Math.min(1,d[1]*(f.elite?1.5:1))){const q=rnd(d[2],d[3])*(f.elite?2:1);S.inv[d[0]]=inv(d[0])+q;got.push(q+' '+nm(d[0]));drop(d[0],q,f.elite||f.b)}});
  if(Math.random()<.1){S.inv.pot_hp1=inv('pot_hp1')+1;got.push('1 Minor Healing')}
  say('Defeated the '+f.n+': '+c+' coins'+(got.length?'. Loot: '+got.join(', '):'')+'.');
  SFX.death(f);
  try{if(window.__gwDeath)window.__gwDeath(f.n);}catch(_){}
  fight=null;cd=0;ecd=0;tele=0;dot={t:0,dps:0,k:''};dotAcc=0;guardT=0;focus=false;slowT=0;mom=0;
  SFX.win();
  if(S.dg){S.dg.room++;if(f.fin)S.dg.chest=true}
  return true;
}
function playerDown(){const was=!!S.dg;CAB.reset();S.hp=Math.ceil(maxHp()/2);S.sh=0;S.coins=Math.floor(S.coins*.8);fight=null;S.dg=null;dot.t=0;say('You were knocked out and lost 20% of your coins.'+(was?' The dungeon run is over.':''));render()}
function strike(mult,heavy){
  const f=fight;if(!f||f.dead||f.hp<=0)return false;
  const crit=focus||Math.random()*100<critCh();focus=false;
  cd=wInt()*(heavy?1.3:1);
  if(Math.random()<Math.max(0,f.dodge-CAB.add('acc'))){fx('Miss','info','foe');mom=0;SFX.err();upd();return false}
  let d=atkPow()*mult*(.85+Math.random()*.3)*(1+.04*mom)*(crit?critMul():1);
  const dt=dmgType();d=CAB.out(d,f);d=Math.max(1,Math.round(d*30/(30+(dt==='true'?0:dt==='magic'?f.def*.5:f.def)*CAB.fdef())));
  const hpBefore=f.hp;
  f.hp=Math.max(0,hpBefore-d);en=Math.min(100,en+8);mom=Math.min(5,mom+1);
  crit?SFX.crit():SFX.hit();
  fx(d,dt,'foe',crit);CAB.hit(d,crit,dt,heavy,f);anim($('me'),'slash');anim($('eo'),'hurt');
  // Resolve lethal damage before any life-drain effect; a dead monster can never revive.
  if(f.hp<=0){f.hp=0;return foeDown()}
  if(f.ab==='drain'){const dealt=Math.min(hpBefore,d);f.hp=Math.min(f.max,f.hp+Math.round(dealt*.3))}
  if(f.b&&!f.rage&&f.hp<f.max*.5){f.rage=true;f.atk*=1.3;say(f.n+' is enraged!');SFX.boss()}
  upd();return false;
}
function attack(){if(!fight||cd>0)return false;return strike(1,false)}
function power(){if(!fight)return false;if(en<30){say('Power Strike needs 30 energy.');SFX.err();return false}en-=30;return strike(2.2,true)}
function guardAct(){if(!fight)return false;if(en<20){say('Guard needs 20 energy.');SFX.err();return false}en-=20;guardT=2.2;say('You raise your guard.');SFX.hit();upd();return false}
function focusAct(){if(!fight)return false;if(en<40){say('Focus needs 40 energy.');SFX.err();return false}en-=40;focus=true;say('Focused: your next hit is a critical.');SFX.crit();upd();return false}
function enemyAttack(heavy){
  const f=fight;if(!f||f.dead||f.hp<=0)return;let d=Math.max(1,Math.round(f.atk*(.85+Math.random()*.3)*(heavy?2:1)*25/(25+defn())));
  if(CAB.dodge(f,heavy)){upd();return}const blocked=guardT>0;
  if(blocked){d=Math.max(1,Math.round(d*.25));en=Math.min(100,en+10);fx('Block!','info','me');SFX.hit();
    const r=Math.max(1,Math.round(atkPow()*.6*30/(30+f.def)));f.hp=Math.max(0,f.hp-r);fx(String(r),'phys','foe');if(f.hp<=0){f.hp=0;foeDown();render();return}}
  d=CAB.inc(d,f,heavy,blocked);const s=Math.min(S.sh,d);S.sh-=s;S.hp-=d-s;shT=3;mom=0;CAB.hurt(d,f);
  if(!blocked){SFX.hurt();fx((heavy?'HEAVY -':'-')+d,'taken','me');anim($('stg'),'ouch');anim($('me'),'hurt')}
  if(!blocked&&f.ab&&Math.random()<.5){
    if(f.ab==='slow'){slowT=4}else if(f.ab==='burn'){dot={t:3,dps:f.atk*.25,k:'Burning'}}else if(f.ab==='drain'){f.hp=Math.min(f.max,f.hp+Math.round(d*.5))}else{dot={t:f.ab==='poison'?5:4,dps:f.atk*.18,k:f.ab==='poison'?'Poisoned':'Bleeding'}}
  }
  if(S.hp<=0){playerDown();return}
  upd();
}
function combatTick(dt){
  const f=fight;if(!f||f.dead||f.hp<=0){if(f&&f.hp<=0&&foeDown())render();return}
  en=Math.min(100,en+8*dt);guardT=Math.max(0,guardT-dt);CAB.tick(dt);
  const sl=slowT>0?1.4:1;slowT=Math.max(0,slowT-dt);if(cd>0)cd=Math.max(0,cd-dt/sl);
  if(dot.t>0){dot.t-=dt;dotAcc+=dot.dps*dt;if(dotAcc>=1){const d=Math.floor(dotAcc);dotAcc-=d;S.hp-=d;if(S.hp<=0){playerDown();return}}}
  if(f.reg)f.hp=Math.min(f.max,f.hp+f.max*f.reg*dt);
  if(tele>0){tele-=dt;if(tele<=0){enemyAttack(true);if(fight!==f||f.dead)return}}
  else{ecd-=dt;if(ecd<=0){eatk++;ecd=f.sp*(f.rage?.8:1)*(.85+Math.random()*.3);if(f.heavy&&eatk%3===0){tele=.9;SFX.bite()}else{enemyAttack(false);if(fight!==f||f.dead)return}}}
  const cdf=$('cdf');if(cdf)cdf.style.width=(100-cd/wInt()*100)+'%';
  const ef=$('ef');if(ef)ef.style.width=(tele>0?100:Math.min(100,Math.max(0,(1-ecd/f.sp)*100)))+'%';
  const w=$('warn');if(w)w.textContent=tele>0?'HEAVY ATTACK incoming! Guard now!':'';
  upd();
}
function flee(){if(S.dg){say('You cannot flee inside a dungeon.');SFX.err();return false}if(Math.random()<.6){fight=null;dot.t=0;say('You got away.');return}say('You couldn’t escape.');enemyAttack(false);return false}
function eat(){const f=FISH.find(f=>inv(f.id)>0);if(!f){say('You have no fish to eat.');SFX.err();return false}S.inv[f.id]--;const h=Math.round(f.v*1.2)+4;S.hp=Math.min(maxHp(),S.hp+h);fx('+'+h,'heal','me');say('Ate a '+f.n+' and healed '+h+'.');SFX.eat();upd();return false}

