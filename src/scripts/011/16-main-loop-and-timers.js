/* ---------- main loop and timers ---------- */
let last=0;
function loop(t){
  const dt=Math.min(.1,(t-last)/1000)||0;last=t;
  if($('intro').hidden){
    tradeTick();
    if(S.tab==='fish'&&!window.__pondMode){
      const lk=$('lake');
      if(lk){
        spawnT-=dt;if(spawnT<=0&&school.length<6){spawnFish();spawnT=spawnGap()}
        const w=lk.clientWidth;
        school=school.filter(s=>{s.x+=s.v*dt;s.el.style.transform='translateX('+s.x+'px) scaleX('+(s.dir>0?-1:1)+')';if(s.x<-100||s.x>w+100){s.el.remove();return false}return true});
      }
    }
    if(fight&&S.tab==='fight')combatTick(dt);
  }
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
let tk=0;
setInterval(()=>{
  tk++;
  if(own()&&$('intro').hidden)render();
  shT-=.25;
  if(shT<=0&&S.sh<maxSh()){S.sh=Math.min(maxSh(),S.sh+(fight?.5:1))}
  if(tk%8===0&&!fight&&S.hp<maxHp()){S.hp=Math.min(maxHp(),S.hp+1)}
  if(tk%4===0)upd();
  if(tk%40===0)save();
},250);

