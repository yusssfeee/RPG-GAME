/* ---------- barn ---------- */
const bgrid=$('bgrid'),bEls=[],aEls=[];
const cap=()=>4+S.up.stalls;
for(let i=0;i<12;i++){const b=document.createElement('button');b.className='plot';b.innerHTML='<span class="e"></span><span class="l"></span><div class="bar"><i></i></div>';b.addEventListener('click',()=>tapStall(i));bgrid.appendChild(b);bEls.push({b,e:b.children[0],l:b.children[1],bar:b.children[2],fill:b.children[2].firstChild,k:null})}
ANI.forEach((a,i)=>{const b=document.createElement('button');b.className='seed';b.innerHTML=mon(ANIART[a.id],'ic')+'<div>'+a.n+'</div><span>'+a.cost+' coins</span>';b.addEventListener('click',()=>{S.asel=i;SFX.plant();save();render()});$('aseeds').appendChild(b);aEls.push(b)});
const aDur=a=>a.t*(1-Math.min(.4,.005*L('barn'))-.1*S.up.trough);
const aProg=p=>p?Math.min(1,(Date.now()-p.at)/(p.d*1000)):0;
function tapStall(i){
  if(i>=cap()){say('Buy an Extra Stall in the Shop to unlock this one.');SFX.err();return}
  const p=S.barn[i];
  if(!p){const a=ANI[S.asel];if(S.coins<a.cost){say('A '+a.n+' costs '+a.cost+' coins.');SFX.err()}else{S.coins-=a.cost;S.barn[i]={t:S.asel,at:Date.now(),d:aDur(a)};SFX.coin()}}
  else if(aProg(p)>=1){
    const a=ANI[p.t],q=Math.random()<.004*L('barn')+.06*S.up.brush?2:1;let s='Collected';
    a.give.forEach(id=>{S.inv[id]=inv(id)+q;s+=' '+q+' '+nm(id)});
    if(a.extra&&Math.random()<a.extra[1]){S.inv[a.extra[0]]=inv(a.extra[0])+1;s+=' and a '+nm(a.extra[0])}
    if(a.meat&&Math.random()<a.meat[1]*(1+.01*L('barn'))){S.inv[a.meat[0]]=inv(a.meat[0])+1;s+=' and '+nm(a.meat[0])}
    if(Math.random()<Math.min(1,.5+.08*S.up.bin)){S.inv.manure=inv('manure')+q;s+=' and '+q+' manure'}
    if(q>1)toast('Double harvest!','bonus');addXp('barn',3+ANI.indexOf(a)*2);say(s+'.');SFX.harvest();p.at=Date.now();p.d=aDur(a)}
  else say('Not ready yet.');
  save();render();
}

