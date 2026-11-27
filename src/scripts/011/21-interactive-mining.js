/* ---------- interactive mining: zones, floors, blasting ---------- */
const ZN=[['Quarry',1,'coal','#8a8070'],['Deep Mine',5,'coal','#5a5a72'],['Crystal Cavern',9,'crystal','#44509a'],['Magma Depths',13,'obsidian','#8a3a2a']];
S.mz=S.mz||0;S.mf=S.mf||1;S.mmode=S.mmode||'pick';let mgrid=null;
const zOk=i=>L('mine')>=ZN[i][1];
function newGrid(){const z=ZN[S.mz],pool=[0,1,2,3,4].filter(i=>L('mine')>=ORE_L[i]&&i>=S.mz-1&&i<=S.mz+1+Math.floor(S.mf/4));
 mgrid=Array.from({length:20},()=>{const r=Math.random();let c='stone';if(r<.36){const o=pool[Math.floor(Math.pow(Math.random(),1.3)*pool.length)];c='ore'+(o==null?0:o)}else if(r<.5)c=z[2];else if(r<.54)c='gem';
  const hp=Math.max(1,Math.round((2+S.mz*2+Math.floor(S.mf/3))*(c.startsWith('ore')?1.5:c==='gem'?2:1)*(1-.08*S.up.gloves)));return{c,hp,max:hp}})}
function collect(t){let id=null,q=1+(Math.random()<.004*L('mine')+.06*S.up.lantern?1:0),xp=2;
 if(t.c.startsWith('ore')){const k=+t.c.slice(3);id=ORES[k].id;xp=[3,7,11,16,26][k]}else if(t.c==='gem'){id='agem';q=1;xp=20}else if(t.c!=='stone'){id=t.c;xp=5}
 if(id){S.inv[id]=inv(id)+q;fx('+'+q+' '+nm(id),'info','foe',false,rar(id)[1]);if(q>1)toast('Bonus ore! +1 '+nm(id),'bonus')}
 addXp('mine',xp);SFX.brk();gemRoll()}
const MG_C=5,MG_N=20;
const caveKey=i=>(ZN[i]&&ZN[i][4])||('c'+i);
function mineSync(){if(mgrid&&ZN[S.mz]){S.mines=S.mines||{};S.mines[caveKey(S.mz)]={f:S.mf,g:mgrid}}}
function mineFloorDone(){
  if(fight||!mgrid||!mgrid.every(x=>x.hp<=0))return false;
  const tier=(ZN[S.mz]&&ZN[S.mz][5])||0,c=earn(Math.round(1.75*(15*S.mf+10*tier)),'mine');
  S.coins+=c;toast('Floor '+S.mf+' cleared! +'+c+' coins','reward');S.mf++;newGrid();mineSync();return true}
function mineLoad(){
  const m=(S.mines||{})[caveKey(S.mz)];
  if(m&&Array.isArray(m.g)&&m.g.length===MG_N){S.mf=m.f||1;mgrid=m.g;mineFloorDone()}
  else{const first=!S.mines||!Object.keys(S.mines).length;S.mf=(m&&m.f)||(first?(S.mf||1):1);newGrid()}
  mineSync()}
function mineSelect(i){if(i===S.mz&&mgrid)return;mineSync();S.mz=i;S.mzId=caveKey(i);mgrid=null;mineLoad()}
function mineEnsure(){if(!mgrid)mineLoad();else mineFloorDone()}
function tapTile(i){const t=mgrid[i];if(!t||t.hp<=0)return;
 if(S.mmode==='blast'){if(inv('coal')<1){say('Blasting needs 1 Coal. Break coal tiles first.');SFX.err();return}S.inv.coal--;
  const x=i%MG_C;[i,i-MG_C,i+MG_C,...(x?[i-1]:[]),...(x<MG_C-1?[i+1]:[])].forEach(j=>{const u=mgrid[j];if(u&&u.hp>0){u.hp-=6;if(u.hp<=0)collect(u)}});SFX.boss()}
 else{t.hp-=item('p').pw;SFX.mine();if(t.hp<=0)collect(t)}
 if(window.__mineDig)window.__mineDig();
 mineFloorDone();mineSync()}
VIEWS.mine=()=>{mineEnsure();const z=ZN[S.mz];
 const tiles=mgrid.map((t,i)=>{const st='aspect-ratio:1;border-radius:10px;border:2px solid #241a35;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:0;';if(t.hp<=0)return'<div style="'+st+'background:#2a2a30;opacity:.4"></div>';
  const id=t.c.startsWith('ore')?ORES[+t.c.slice(3)].id:t.c==='stone'?null:t.c==='gem'?'agem':t.c;
  return'<button data-x="mt" data-i="'+i+'" style="'+st+'background:#5a5a66;cursor:pointer">'+(id?gIcon(id,'ic'):'')+'<div style="width:70%;height:4px;background:#0006;border-radius:3px;margin-top:2px"><div style="height:4px;width:'+Math.max(0,t.hp/t.max*100)+'%;background:#ffd84d;border-radius:3px"></div></div></button>'}).join('');
 return skillBar('mine')+'<div class="btns">'+ZN.map((q,i)=>'<button class="btn '+(i===S.mz?'':'alt')+'" data-x="mz" data-i="'+i+'"'+(zOk(i)?'':' disabled')+'>'+(zOk(i)?q[0]:'Lv '+q[1])+'</button>').join('')+'</div><div class="ttl">'+z[0]+', floor '+S.mf+'</div><div style="display:grid;grid-template-columns:repeat(5,1fr);gap:6px;background:'+z[3]+';padding:8px;border-radius:14px;border:3px solid #241a35">'+tiles+'</div><div class="btns"><button class="btn '+(S.mmode==='pick'?'':'alt')+'" data-x="mm" data-i="pick">Pick</button><button class="btn '+(S.mmode==='blast'?'':'alt')+'" data-x="mm" data-i="blast">Blast (1 Coal) x'+inv('coal')+'</button></div><p class="h">Tap tiles to break them. Ores, coal, crystals and gems show on the tiles. Blast breaks a tile and its neighbors. Clear the whole floor to go deeper: ores get richer, but beware of ambushes. Deeper zones unlock with Mining level.</p>'};
$('pane').addEventListener('click',e=>{const b=e.target.closest('[data-x]');if(!b)return;const a=b.dataset.x,i=b.dataset.i;
 if(a==='mz'){if(zOk(+i))mineSelect(+i)}else if(a==='mm')S.mmode=i;else if(a==='mt')tapTile(+i);else return;save();render()});
