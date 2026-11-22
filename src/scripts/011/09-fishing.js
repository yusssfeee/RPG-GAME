/* ---------- fishing: a school of fish swims by, tap them ---------- */
let school=[],spawnT=0,combo=0,lastC=0;
function spawnFish(){
  const lk=$('lake');if(!lk)return;
  const el=poolFish(),f=el[Math.floor(Math.pow(Math.random(),.5/(1+.25*S.up.lure))*el.length)],w=lk.clientWidth||360,dir=Math.random()<.5?1:-1;
  const b=document.createElement('button');b.className='swim';b.dataset.a='catch';b.dataset.i=f.id+':'+Math.random().toString(36).slice(2,7);
  const sz=56+6*S.up.rod;b.style.width=b.style.height=sz+'px';b.style.top=(50+Math.random()*34)+'%';b.innerHTML=fIcon(f);
  const s={f,id:b.dataset.i,x:dir>0?-sz-10:w+10,v:dir*(70+f.l*12+Math.random()*40),el:b,dir};
  lk.appendChild(b);school.push(s);
}
function catchFish(key){
  const s=school.find(x=>x.id===key);if(!s)return false;
  school=school.filter(x=>x!==s);s.el.remove();
  const now=Date.now();combo=now-lastC<1500?combo+1:1;lastC=now;
  const q=1+(Math.random()<.004*L('fish')+.04*S.up.rod?1:0)+(combo%5===0?1:0);
  S.inv[s.f.id]=inv(s.f.id)+q;addXp('fish',s.f.xp);SFX.catch();fishBonus();
  fx('+'+q+' '+s.f.n,'info','foe');const c=$('combo');if(c)c.textContent='Combo x'+combo;
  return false;
}
const spawnGap=()=>Math.max(.35,1.5*(1-.005*L('fish'))*(1-.08*S.up.bait))/(on('fish')?2:1);

