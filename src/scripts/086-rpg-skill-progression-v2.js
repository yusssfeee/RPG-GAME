
(()=>{
 'use strict';
 if(!window.S||!window.SK||!window.VIEWS||!window.CB||!window.CAB)return;

 /* Class identity is combat-only. Remove profession/tab XP and yield bonuses. */
 Object.keys(CB).forEach(k=>{
  CB[k].xp={};
  CB[k].yld={};
  CB[k].roll='Combat specialization';
 });
 const combatClassLines=k=>{
  const c=CLS[k]||{},out=[];
  if(c.atk!==undefined&&c.atk!==1)out.push((c.atk>1?'+':'')+Math.round((c.atk-1)*100)+'% damage');
  if(c.hp)out.push((c.hp>0?'+':'')+c.hp+' HP');
  if(c.cr)out.push('+'+c.cr+'% critical chance');
  if(c.def!==undefined&&c.def!==1)out.push((c.def>1?'+':'')+Math.round((c.def-1)*100)+'% defense');
  if(c.spd!==undefined&&c.spd!==1)out.push((c.spd>1?'slower':'faster')+' attack speed');
  if(window.CAB&&CAB.lines)CAB.lines(k).forEach(x=>out.push(x));
  return out;
 };
 if(window.V4)V4.bonusLines=combatClassLines;
 window.bonusLines=combatClassLines;

 /* Each skill already has its own level-based specialty. Milestones add a tiny,
    permanent combat refinement every 5 Combat levels, not currency. */
 const combatMilestones=()=>Math.floor(Math.max(0,L('combat'))/5);
 const oldMul=CAB.mul;
 CAB.mul=function(k){
  const v=oldMul.apply(this,arguments),m=combatMilestones();
  if(k==='atk')return v*(1+.005*m);
  if(k==='def')return v*(1+.0025*m);
  if(k==='spd')return v*(1-.005*m);
  return v;
 };
 const oldAdd=CAB.add;
 CAB.add=function(k){
  const v=oldAdd.apply(this,arguments);
  if(k==='hp')return v+Math.floor(L('combat')/5);
  return v;
 };

 /* Suppress the old +coins milestone reward while retaining normal XP and
    the game's own level-up notifications. */
 const baseAddXp=addXp;
 addXp=function(k,n){
  const coinsBefore=Number(S.coins)||0;
  const oldToast=window.toast;
  if(typeof oldToast==='function'){
   window.toast=function(msg,kind,col){
    if(kind==='reward'&&String(msg).includes('Milestone!')){
     const milestone=Math.floor(L(k)/5)*5;
     try{say(SKN[k]+' milestone '+milestone+': permanent skill improvement gained.')}catch(_){}
     return;
    }
    return oldToast.apply(this,arguments);
   };
  }
  try{return baseAddXp.apply(this,arguments)}
  finally{
   S.coins=coinsBefore;
   if(typeof oldToast==='function')window.toast=oldToast;
  }
 };

 const details={
  farm:'Each level speeds crop growth and improves harvest yield and crop sale value.',
  barn:'Each level speeds animal production and improves the chance of extra goods and their value.',
  fish:'Each level improves fish spawn pace, extra-catch chance and fish sale value.',
  mine:'Each level makes mining easier and improves bonus-ore chance and ore value.',
  smith:'Each level reduces crafting effort and improves bonus-item chance and equipment value.',
  alch:'Each level reduces brewing effort and improves double-brew chance and potion strength.',
  combat:'Each level improves combat stats. Every 5 levels also grants +0.5% damage, +0.25% defense, +0.5% attack speed and +1 maximum HP.',
  trade:'Each level improves caravan speed and haul capacity while reducing bandit risk.',
  wood:'Each level improves woodcutting power and bonus-log yield.',
  arcane:'Arcana levels improve access to arcane recipes and related crafting progression.',
  tailor:'Tailoring levels unlock better cloth recipes and crafted gear.',
  leather:'Leatherworking levels unlock better leather recipes and crafted gear.'
 };
 const nextDetails={
  farm:'Next level: faster crop cycles and a small improvement to harvest output.',
  barn:'Next level: faster animal cycles and a small improvement to extra-goods chance.',
  fish:'Next level: faster fish activity and a small improvement to extra-catch chance.',
  mine:'Next level: improved mining efficiency and bonus-resource chance.',
  smith:'Next level: improved crafting efficiency and bonus-item chance.',
  alch:'Next level: improved brewing efficiency and potion output.',
  combat:'Next level: +0.1 damage progression, +0.1% critical chance and +2 maximum HP from the existing combat scaling.',
  trade:'Next level: faster caravans, more cargo and slightly lower bandit risk.',
  wood:'Next level: stronger woodcutting swings and better bonus-log progression.',
  arcane:'Next level: progress toward higher Arcana recipes.',
  tailor:'Next level: progress toward higher Tailoring recipes.',
  leather:'Next level: progress toward higher Leatherworking recipes.'
 };
 const titleFor=k=>SKN[k]||k;
 VIEWS.prog=()=>{
  const total=SK.reduce((a,k)=>a+L(k),0);
  const clears=Object.values(S.clears||{}).reduce((a,b)=>a+b,0);
  let out='<div class="card2"><b>Total level '+total+'</b><span>'+S.kills+' wins · '+clears+' dungeons cleared</span></div>';
  out+='<div class="rpg-prog-intro"><b>Skill progression</b><br>Levels no longer award coins. Every skill improves its own specialty as it levels up. Combat also receives a small permanent stat bonus at every 5th level.</div>';
  out+=SK.map(k=>{
   const l=L(k),nx=(Math.floor(l/5)+1)*5,bar=skillBar(k);
   const next=(details[k]||'Each level improves this skill.')+' ';
   return '<div class="rpg-prog-item">'+bar+'<div class="benefit">'+(details[k]||'Each level improves this skill.')+'</div><div class="milestone">'+(k==='combat'?'Next combat milestone: Lv '+nx+' · small permanent combat-stat increase.':'Next level: '+(nextDetails[k]||'Further progress in this specialty.'))+'</div></div>';
  }).join('');
  return out;
 };

 /* Remove misleading profession perks from the Adventurer class panel;
    combat identity and signature abilities remain untouched. */
})();
