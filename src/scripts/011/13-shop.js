/* ---------- shop ---------- */
const ALLU=UPG.flatMap(g=>g[1]);
function buy(k){
  if(k==='pot'){if(S.coins<25){say('A potion costs 25 coins.');SFX.err();return}S.coins-=25;S.inv.pot_hp1=inv('pot_hp1')+1;say('Bought a Minor Healing potion.');SFX.coin();return}
  const u=ALLU.find(x=>x.k===k),l=S.up[k];
  if(l>=u.max){say('That upgrade is maxed out.');return}
  if(S.coins<u.cost[l]){say('You need '+u.cost[l]+' coins.');SFX.err();return}
  S.coins-=u.cost[l];S.up[k]++;say(u.n[Math.min(u.n.length-1,Math.floor(S.up[k]/2))]+' (level '+S.up[k]+') bought.');SFX.lvl();
}

