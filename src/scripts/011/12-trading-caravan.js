/* ---------- trading caravan ---------- */
const cargoUsed=()=>TRADE.reduce((a,g)=>a+inv(g.id),0);
const cargoCap=()=>20+10*S.up.wagon+Math.floor(L('trade')/2);
const town=id=>TOWNS.find(t=>t.id===id);
function tradePrices(t){const pr={};TRADE.forEach((g,i)=>pr[g.id]=Math.max(1,Math.round(g.b*t.m[i]*(.9+Math.random()*.2))));return pr}
const travelTime=(a,b)=>Math.max(6,(Math.hypot(a.x-b.x,a.y-b.y)*.55+6)*(1-Math.min(.4,.005*L('trade'))-.08*S.up.horse));
function tradeGo(id){const T=S.trade;if(T.to||id===T.at)return false;const a=town(T.at),b=town(id);T.from=T.at;T.to=id;T.t0=Date.now();T.dur=travelTime(a,b);SFX.coin();say('Heading to '+b.n+' ('+Math.round(T.dur)+'s).')}
function arrive(){
  const T=S.trade;T.at=T.to;T.to=null;T.pr=tradePrices(town(T.at));addXp('trade',4);let s='Arrived in '+town(T.at).n+'.';
  if(cargoUsed()>0&&Math.random()<Math.max(0,.18-.03*S.up.guard-.001*L('trade'))){const lost=[];TRADE.forEach(g=>{const n=Math.floor(inv(g.id)*(.15+Math.random()*.15));if(n){S.inv[g.id]-=n;lost.push(n+' '+g.n)}});if(lost.length)s+=' Bandits raided your wagon and took '+lost.join(', ')+'.'}
  say(s);SFX.win();save();
}
function tradeBuy(id,n){
  const g=TRADE.find(x=>x.id===id),p=S.trade.pr[id],room=cargoCap()-cargoUsed();n=Math.min(n,room,Math.floor(S.coins/p));
  if(n<1){say(room<1?'Your wagon is full.':'Not enough coins.');SFX.err();return}
  const have=inv(id),c=S.cost[id]||0;S.cost[id]=(c*have+p*n)/(have+n);S.inv[id]=have+n;S.coins-=p*n;say('Bought '+n+' '+g.n+' for '+p*n+' coins.');SFX.coin();
}
function tradeSell(id){
  const g=TRADE.find(x=>x.id===id),n=inv(id);if(!n){say('You have no '+g.n+'.');SFX.err();return}
  const p=S.trade.pr[id],m=Math.round(p*n*(1+.004*L('trade'))*(1+.08*S.up.ring)*(1+.03*S.up.ledger)),profit=m-(S.cost[id]||0)*n;
  S.inv[id]=0;S.coins+=m;addXp('trade',Math.max(1,Math.round(profit/8)));say('Sold '+n+' '+g.n+' for '+m+' coins'+(profit>0?' (profit '+Math.round(profit)+')':'')+'.');SFX.coin();
}
const TCATS=[['fish','Fish','fish',FISH.map(f=>f.id)],['ore','Ore','mine',ORES.map(o=>o.id)],['mon','Monster loot','combat',['gel','hide','fur','fang','bone','wing','silk','horn','wisp','core','scale']],['farm','Farm goods','farm',['herb','egg','feather','wool','milk','honey','manure']]];
const catTotal=(c,i)=>{const cm=town(S.trade.at).c[i];return earn(c[3].reduce((a,id)=>a+inv(id)*VAL[id],0)*cm*(1+.004*L('trade')),c[2])};
function tradeCat(i){const c=TCATS[i],m=catTotal(c,i);if(!m){say('Nothing of that kind to sell.');SFX.err();return}c[3].forEach(id=>S.inv[id]=0);S.coins+=m;addXp('trade',Math.max(1,Math.round(m/20)));say('Sold '+c[1].toLowerCase()+' here for '+m+' coins.');SFX.coin()}
function tradeTick(){
  const T=S.trade;if(!T.to)return;const p=(Date.now()-T.t0)/(T.dur*1000);
  if(p>=1){arrive();render();return}
  if(S.tab==='trade'){const b=$('tbar');if(b)b.style.width=p*100+'%';const t=$('ttxt');if(t)t.textContent=Math.ceil(T.dur*(1-p))+'s left';const w=$('wagon');if(w){const a=town(T.from),c=town(T.to);w.style.left=(a.x+(c.x-a.x)*p)+'%';w.style.top=(a.y+(c.y-a.y)*p)+'%'}}
}

