/* ---------- alchemy ---------- */
let brewSel=null,brewHits=0;
const pOK=p=>p.r.every(x=>inv(x[0])>=x[1])&&L('alch')>=p.l;
function cauldronAct(){
  const p=ALLR.find(x=>x.id===brewSel);
  if(!p){say('Choose a recipe below, then tap the cauldron.');SFX.err();return}
  if(!pOK(p)){brewHits=0;say(missMsg('Alchemy','alch',p.l,p.r,0));SFX.err();return}
  brewHits++;SFX.splash();
  if(brewHits>=hitsNeed(L('alch'))){
    brewHits=0;const kept=Math.random()<.08*S.up.pouch;if(!kept)p.r.forEach(x=>S.inv[x[0]]-=x[1]);
    const n=1+(Math.random()<.004*L('alch')+.08*S.up.cauldron?1:0);S.inv[p.id]=inv(p.id)+n;addXp('alch',6+p.l*6);
    say('Brewed '+(n>1?n+'x ':'')+p.n+(kept?' (ingredients kept)':'')+'.');SFX.lvl()}
  else say('Keep stirring.');
}
function drink(id){
  const p=POTS.find(x=>x.id===id);if(!inv(id)){say('You have none.');SFX.err();return}
  S.inv[id]--;
  if(p.heal){const h=Math.round(p.heal*(1+.005*L('alch')));S.hp=Math.min(maxHp(),S.hp+h);fx('+'+h,'heal','me')}
  if(p.sh)S.sh=maxSh();
  if(p.buff)S.buff[p.buff]=Date.now()+(p.dur||90)*1000*(1+.005*L('alch'))*(1+.2*S.up.alembic);
  say('Used '+p.n+'.');SFX.eat();upd();
}
const healPots=()=>POTS.filter(p=>p.heal);
const healCount=()=>healPots().reduce((a,p)=>a+inv(p.id),0);
function useHeal(){const p=healPots().find(p=>inv(p.id)>0);if(!p){say('No healing potions. Brew some or buy one in the shop.');SFX.err();return false}drink(p.id);return false}
const buffText=()=>{const a=Object.keys(BN).filter(on).map(k=>BN[k]+' '+Math.ceil((S.buff[k]-Date.now())/1000)+'s');return a.length?'Active: '+a.join('   '):'No active potion effects'};

