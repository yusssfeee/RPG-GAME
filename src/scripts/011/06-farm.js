/* ---------- farm ---------- */
const grid=$('grid'),els=[],seedEls=[];
const unlockCost=()=>Math.round((25+15*(S.plots.filter(p=>p.open).length-START))*(1-.08*S.up.plow));
const farmGrow=()=>Math.min(.4,.005*L('farm'));
S.plots.forEach((p,i)=>{
  const b=document.createElement('button');b.className='plot';
  b.innerHTML='<span class="e"></span><span class="l"></span><div class="bar"><i></i></div>';
  b.addEventListener('click',()=>tapPlot(i));grid.appendChild(b);
  els.push({b,e:b.children[0],l:b.children[1],bar:b.children[2],fill:b.children[2].firstChild,k:null});
});
CROPS.forEach((c,i)=>{
  const b=document.createElement('button');b.className='seed';
  b.innerHTML=icon(c.ic)+'<div>'+c.n+'</div><span></span>';
  b.addEventListener('click',()=>{if(L('farm')<c.l){say(c.n+' needs Farming level '+c.l+'.');SFX.err();return}S.sel=i;SFX.plant();save();render()});
  $('seeds').appendChild(b);seedEls.push(b);
});
const prog=p=>!p||p.c<0?0:Math.min(1,(Date.now()-p.at)/(p.d*1000));
const fEls=[];
[null,...FERTS].forEach((f,i)=>{const b=document.createElement('button');b.className='seed';b.innerHTML=(f?icon(f.id==='manure'?'manure':'sack',f.col):'<b style="font-size:20px;line-height:34px">–</b>')+'<div>'+(f?f.n:'None')+'</div><span></span>';b.addEventListener('click',()=>{S.fsel=i;SFX.plant();save();render()});$('fchips').appendChild(b);fEls.push(b)});
function tapPlot(i){
  const p=S.plots[i];
  if(!p.open){const c=unlockCost();if(S.coins>=c){S.coins-=c;p.open=true;say('New plot unlocked.');SFX.coin()}else{say('Unlocking this plot costs '+c+' coins.');SFX.err()}}
  else if(p.c<0){const c=CROPS[S.sel];
    if(S.coins<c.cost){say('Not enough coins for '+c.n+' seeds.');SFX.err()}
    else{S.coins-=c.cost;let f=null;const fo=S.fsel?FERTS[S.fsel-1]:null;
      if(fo){if(inv(fo.id)>0){S.inv[fo.id]--;f=fo}else say('Out of '+fo.n+', planted without it.')}
      p.c=S.sel;p.at=Date.now();p.f=f?f.id:null;p.d=c.t*Math.max(.2,1-farmGrow()-.08*S.up.can-(f?f.spd:0))*(on('grow')?.5:1);p.w=false;SFX.plant()}}
  else{const g=prog(p),c=CROPS[p.c];
    if(g>=1){const fo=FERTS.find(x=>x.id===p.f)||{dbl:0,tri:0},sk=.004*L('farm')+.06*S.up.fert;
      let q=1;if(Math.random()<1-(1-fo.dbl)*(1-sk))q=2;if(fo.tri&&Math.random()<fo.tri)q=3;
      if(c.give){const n=c.q*q;S.inv[c.give]=inv(c.give)+n;say('Harvested '+n+' '+nm(c.give)+(q>1?' (x'+q+' yield)':'')+'.')}
      else{const m=Math.round(earn(c.sell,'farm')*(1+.04*S.up.scare))*q;S.coins+=m;say('Harvested '+c.n+(q>1?' (x'+q+' yield)':'')+' for '+m+' coins.')}
      addXp('farm',c.xp*q);p.c=-1;SFX.harvest()}
    else if(!p.w){p.w=true;p.at-=(p.d*1000-(Date.now()-p.at))*.35;say('Watered. It grows faster now.');if(!(window.__farmWater&&window.__farmWater.play(i)))SFX.water()}
    else say('Already watered. Give it time.')}
  save();render();
}

