
(()=>{
 'use strict';
 if(!window.CAB||!window.VIEWS||typeof save!=='function')return;
 const TRAIN=[
  {k:'attack',n:'Weapon Mastery',ic:'spr:wp_great',d:'+2% damage per rank.',cost:70,pts:1,max:10},
  {k:'defense',n:'Iron Discipline',ic:'spr:wp_obsshield',d:'+2.5% defense per rank.',cost:75,pts:1,max:10},
  {k:'speed',n:'Quick Reflexes',ic:'spr:wp_dagger',d:'+2% attack speed per rank.',cost:90,pts:1,max:10},
  {k:'mana',n:'Mana Flow',ic:'spr:gem_arcane',d:'+0.25 Energy regeneration per second per rank.',cost:95,pts:1,max:10},
  {k:'stamina',n:'Stamina Recovery',ic:'spr:wp_gauntlet',d:'+1 Energy on successful hits and 2% less heavy-strike recovery per rank.',cost:90,pts:1,max:10},
  {k:'vitality',n:'Vitality',ic:'spr:gem_star',d:'+3 maximum HP per rank.',cost:80,pts:1,max:10},
  {k:'critical',n:'Precision',ic:'spr:gem_focus',d:'+0.6% critical chance per rank.',cost:110,pts:1,max:10},
  {k:'recovery',n:'Battle Recovery',ic:'spr:herb',d:'+0.1% of maximum HP recovered per second during combat per rank.',cost:125,pts:1,max:10}
 ];
 const safeObj=(v)=>v&&typeof v==='object'&&!Array.isArray(v)?v:{};
 function ensure(){
  if(!S.classXP)S.classXP={};
  if(!S.combatTraining)S.combatTraining={};
  TRAIN.forEach(x=>{if(!Number.isFinite(+S.combatTraining[x.k]))S.combatTraining[x.k]=0});
  if(!Number.isFinite(+S.trainingPoints))S.trainingPoints=0;
  S.classXP=safeObj(S.classXP);
  S.combatTraining=safeObj(S.combatTraining);
  Object.keys(CLS||{}).forEach(k=>{if(!Number.isFinite(+S.classXP[k]))S.classXP[k]=0});
 }
 const rank=k=>Math.max(0,Math.min(10,Number(S.combatTraining&&S.combatTraining[k])||0));
 const currentClass=()=>{try{return cls()}catch(_){return S.cls||'warrior'}};
 const classXP=()=>Math.max(0,Number(S.classXP[currentClass()])||0);
 const classLevel=()=>lvl(classXP());
 const nextXp=lv=>10*lv*lv;
 const prevXp=lv=>10*(lv-1)*(lv-1);
 const progress=()=>{const lv=classLevel(),x=classXP();return Math.max(0,Math.min(100,(x-prevXp(lv))/(nextXp(lv)-prevXp(lv))*100))};
 const oldSave=save;
 save=function(){ensure();return oldSave.apply(this,arguments)};
 const oldRender=render;
 render=function(){ensure();return oldRender.apply(this,arguments)};
 ensure();

 /* Separate class mastery XP is earned only by defeating enemies with the currently selected class. */
 const oldFoeDown=foeDown;
 foeDown=function(){
  const f=fight,ck=currentClass();
  const result=oldFoeDown.apply(this,arguments);
  if(result&&f){
   ensure();
   const before=lvl(Number(S.classXP[ck])||0);
   S.classXP[ck]=(Number(S.classXP[ck])||0)+Math.max(2,Math.round((f.xp||2)*1.2));
   S.trainingPoints=Math.min(999,(Number(S.trainingPoints)||0)+(f.fin?4:f.b?3:f.elite?2:1));
   const after=lvl(S.classXP[ck]);
   if(after>before){say(CLS[ck].n+' Class Level '+after+'!');SFX.lvl()}
   save();
  }
  return result;
 };

 /* Gate the existing class signature ability; no ability is usable before Class Level 3. */
 const ABILITY_LEVEL=3;
 const oldAbilityBtn=CAB.btn;
 CAB.btn=function(){
  ensure();
  const h=oldAbilityBtn.apply(this,arguments);
  if(!h||classLevel()>=ABILITY_LEVEL)return h;
  return h
   .replace('<button class="v4ab"','<button class="v4ab rpg-ability-locked" disabled')
   .replace(/<em>[\s\S]*?<\/em>/,'<em>Locked · Class Lv '+ABILITY_LEVEL+'</em>')
   .replace(/<small>[\s\S]*?<\/small>/,'<small>🔒 '+classLevel()+'/'+ABILITY_LEVEL+'</small>')
   .replace(/title="[^"]*"/,'title="Defeat enemies to raise this class level."');
 };
 const oldAbilityUse=CAB.use;
 CAB.use=function(){
  ensure();
  if(classLevel()<ABILITY_LEVEL){
   say('This class ability unlocks at Class Level '+ABILITY_LEVEL+'. Current level: '+classLevel()+'.');
   try{SFX.err()}catch(_){}
   return false;
  }
  return oldAbilityUse.apply(this,arguments);
 };

 /* Apply the training ranks to the real combat calculations. */
 const oldMul=CAB.mul;
 CAB.mul=function(k){
  const base=oldMul.apply(this,arguments);
  if(k==='atk')return base*(1+.02*rank('attack'));
  if(k==='def')return base*(1+.025*rank('defense'));
  return base;
 };
 const oldAdd=CAB.add;
 CAB.add=function(k){
  const base=oldAdd.apply(this,arguments);
  if(k==='enr')return base+.25*rank('mana');
  if(k==='hp')return base+3*rank('vitality');
  return base;
 };
 const oldWInt=wInt;
 wInt=function(){return Math.max(.25,oldWInt()/(1+.02*rank('speed')))};
 const oldCrit=critCh;
 critCh=function(){return Math.min(80,oldCrit()+.6*rank('critical'))};

 const recoverStamina=()=>{
  const bonus=rank('stamina');
  if(bonus>0)en=Math.min(100,en+bonus);
 };
 const oldStrike=strike;
 strike=function(mult,heavy){
  const f=fight,before=f&&f.hp;
  const result=oldStrike.apply(this,arguments);
  if(f&&fight===f&&f.hp<before){
   recoverStamina();
   if(heavy&&rank('stamina')>0)cd=Math.max(0,cd*(1-.02*rank('stamina')));
  }
  return result;
 };
 const oldHitF=hitF;
 if(typeof oldHitF==='function'){
  hitF=function(f,m,o){
   const before=f&&f.hp,r=oldHitF.apply(this,arguments);
   if(f&&f.hp<before)recoverStamina();
   return r;
  };
 }
 let recoveryCarry=0;
 const oldTick=CAB.tick;
 CAB.tick=function(dt){
  const r=oldTick.apply(this,arguments);
  if(fight&&rank('recovery')>0&&dt>0){
   recoveryCarry+=maxHp()*.001*rank('recovery')*dt;
   if(recoveryCarry>=1){
    const n=Math.floor(recoveryCarry);recoveryCarry-=n;
    const old=S.hp;S.hp=Math.min(maxHp(),S.hp+n);
    if(S.hp>old)fx('+'+(S.hp-old),'heal','me');
   }
  }else if(!fight)recoveryCarry=0;
  return r;
 };

 const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 const costAt=(x,r)=>Math.round(x.cost*Math.pow(1.48,r));
 function card(x){
  const r=rank(x.k),price=costAt(x,r),points=x.pts+Math.floor(r/3),needLv=1+r*2;
  const ok=r<x.max&&S.coins>=price&&S.trainingPoints>=points&&L('combat')>=needLv;
  const req=L('combat')<needLv?'Combat Lv '+needLv+' required':S.trainingPoints<points?'Need '+points+' training point(s)':S.coins<price?'Not enough coins':r>=x.max?'MAX RANK':'Train';
  return '<article class="rpg-train-card"><div class="head">'+icon(x.ic)+'<b>'+x.n+'</b></div><div class="rank">Rank '+r+'/'+x.max+'</div><p>'+x.d+'</p><div class="cost">'+price+' coins · '+points+' training point(s) · Combat Lv '+needLv+'</div><button type="button" data-rpg-train="'+x.k+'" '+(ok?'':'disabled')+'>'+(ok?'Train':'🔒 '+req)+'</button></article>';
 }
 VIEWS.training=()=>{
  ensure();
  const c=CLS[currentClass()]||{n:'Adventurer',ico:'hero_face'};
  const lv=classLevel(),xp=classXP(),p=progress();
  const ability=lv>=ABILITY_LEVEL
   ?'<span style="color:#8de0a7;font-weight:800">Unlocked</span>'
   :'<span style="color:#ffd58a;font-weight:800">Locked until Class Lv '+ABILITY_LEVEL+'</span>';
  return '<div class="rpg-train-wrap">'
   +'<button class="btn alt" type="button" data-rpg-train-back="1">← Back to Adventurer</button>'
   +'<div class="rpg-train-hero"><div class="portrait">'+icon('spr:'+((CB[currentClass()]||{}).ico||'hero_face'))+'</div><div style="min-width:0;flex:1"><b>'+esc(c.n)+' · Class Level '+lv+'</b><small>'+xp+' / '+nextXp(lv)+' Mastery XP · Signature ability: '+ability+'</small><div class="rpg-train-progress"><i style="width:'+p.toFixed(1)+'%"></i></div></div><div class="rpg-train-points">✦ '+S.trainingPoints+' pts</div></div>'
   +'<div class="ttl">Combat Training</div><p class="h">Defeat monsters to earn training points. Spend coins and points to permanently improve this save.</p>'
   +'<div class="rpg-train-grid">'+TRAIN.map(card).join('')+'</div>'
   +'<div class="rpg-train-note">Class mastery is tracked separately for each class. Your signature ability unlocks at Class Level 3. Training upgrades apply to every class, so switching classes will not erase them.</div>'
   +'</div>';
 };

 /* Add an entry point inside Adventurer, keeping the existing navigation bar unchanged. */
 const oldAdv=VIEWS.adv;
 if(typeof oldAdv==='function'){
  VIEWS.adv=function(){
   ensure();
   const h=oldAdv.apply(this,arguments);
   const ck=currentClass(),lv=classLevel();
   return h
    +'<div class="ttl">Class Mastery</div><div class="card2"><b>'+(CLS[ck]||{n:'Class'}).n+' · Level '+lv+'</b><p class="h">'+classXP()+' Mastery XP · Signature ability '+(lv>=ABILITY_LEVEL?'unlocked':'unlocks at Class Level '+ABILITY_LEVEL)+'</p><div class="rpg-train-progress"><i style="width:'+progress().toFixed(1)+'%"></i></div><button class="btn" type="button" data-rpg-open-training="1" style="margin-top:9px">⚔ Combat Training & Development</button></div>';
  };
 }
 const pane=$('pane');
 if(pane){
  pane.addEventListener('click',e=>{
   const open=e.target.closest&&e.target.closest('[data-rpg-open-training]');
   if(open){S.tab='training';save();render();window.scrollTo(0,0);return}
   const back=e.target.closest&&e.target.closest('[data-rpg-train-back]');
   if(back){S.tab='adv';save();render();window.scrollTo(0,0);return}
   const b=e.target.closest&&e.target.closest('[data-rpg-train]');
   if(!b)return;
   const x=TRAIN.find(q=>q.k===b.dataset.rpgTrain);if(!x)return;
   ensure();
   const r=rank(x.k),price=costAt(x,r),points=x.pts+Math.floor(r/3),needLv=1+r*2;
   if(r>=x.max||L('combat')<needLv||S.trainingPoints<points||S.coins<price){try{SFX.err()}catch(_){}return}
   S.coins-=price;S.trainingPoints-=points;S.combatTraining[x.k]=r+1;
   if(x.k==='vitality')S.hp=Math.min(maxHp(),S.hp+3);
   say(x.n+' increased to Rank '+(r+1)+'.');
   try{SFX.lvl()}catch(_){}
   save();render();upd();
  });
 }
 window.RPGCombatProgression={
  getClassLevel:()=>classLevel(),
  getTraining:()=>({...S.combatTraining}),
  getTrainingPoints:()=>S.trainingPoints
 };
})();
