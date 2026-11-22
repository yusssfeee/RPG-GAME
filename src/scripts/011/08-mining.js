/* ---------- mining ---------- */
let rock=null;
function newRock(){const el=ORES.filter((o,i)=>L('mine')>=ORE_L[i]),t=ORES.indexOf(el[Math.floor(Math.pow(Math.random(),1.6)*el.length)]);const hp=Math.max(2,Math.round([5,9,12,16,22][t]*(1-Math.min(.4,.005*L('mine'))-.08*S.up.gloves)));rock={t,hp,max:hp}}
newRock();
function mineAct(){
  rock.hp-=item('p').pw;SFX.mine();
  if(rock.hp<=0){const o=ORES[rock.t],q=1+(Math.random()<.004*L('mine')+.06*S.up.lantern?1:0);S.inv[o.id]=inv(o.id)+q;addXp('mine',[3,7,11,16,26][rock.t]);say('Mined '+q+' '+o.n+'.');if(q>1)toast('Bonus ore! +1 '+o.n,'bonus');SFX.brk();newRock();gemRoll()}
}

