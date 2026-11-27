
/* Goblin Archer can now also appear (as a random ordinary enemy) in the Goblin Warren. */
try{const dg=DG.find(d=>d.id==='goblin');if(dg&&!dg.mons.includes('Goblin Archer'))dg.mons.push('Goblin Archer')}catch(e){console.warn('Goblin Archer not added to Goblin Warren',e)}
