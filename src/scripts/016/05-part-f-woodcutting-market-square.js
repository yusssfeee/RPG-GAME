/* ================= part F · woodcutting reborn · market square ================= */
const stf=document.createElement('style');
stf.textContent=`
.v4wd{height:340px!important}
.v4tree{width:210px!important;height:250px!important;margin-left:-105px!important;bottom:6px!important;transition:filter .2s}
.v4tgt{position:absolute;width:52px;height:52px;margin:-26px 0 0 -26px;pointer-events:none;z-index:3}
.v4tgt:before{content:'';position:absolute;inset:14px;border-radius:50%;background:radial-gradient(circle,#fff,#ffd84d 60%,#ff8a1a);box-shadow:0 0 10px #ffd84d;animation:v4tp .5s ease-in-out infinite alternate}
.v4tgt .rg{position:absolute;inset:0;border-radius:50%;border:3px solid #fff;box-shadow:0 0 8px #fff;transform:scale(2.4)}
.v4tgt .rg.go{border-color:#7dffb0;box-shadow:0 0 14px #7dffb0}
@keyframes v4tp{from{transform:scale(.85)}to{transform:scale(1.1)}}
.v4axe{position:absolute;right:6%;bottom:44px;width:120px;height:120px;transform:scaleX(-1) rotate(-12deg);transform-origin:80% 90%;pointer-events:none;z-index:4;filter:drop-shadow(0 4px 4px #0008)}
.v4axe .ic{width:100%;height:100%}
.v4axe.sw{animation:v4asw .3s cubic-bezier(.4,0,.2,1)}
@keyframes v4asw{0%{transform:scaleX(-1) rotate(-12deg)}35%{transform:scaleX(-1) translate(-20px,-30px) rotate(-70deg)}60%{transform:scaleX(-1) translate(60px,10px) rotate(28deg)}100%{transform:scaleX(-1) rotate(-12deg)}}
.v4notch{position:absolute;width:38px;height:9px;border-radius:2px;background:linear-gradient(#2b1608,#8a5a2a 60%,#d9a868);box-shadow:inset 0 1px 2px #000a;pointer-events:none}
.v4leaf{position:absolute;width:9px;height:6px;border-radius:50% 0;pointer-events:none;animation:v4lf 1.4s ease-in forwards}
@keyframes v4lf{0%{opacity:1;transform:translate(0,0) rotate(0)}100%{opacity:0;transform:translate(var(--dx),150px) rotate(300deg)}}
.v4log{position:absolute;width:34px;height:34px;pointer-events:none;z-index:6;animation:v4lg2 1s ease-in forwards}
.v4log .ic{width:100%;height:100%}
@keyframes v4lg2{0%{transform:translate(0,0) scale(.6);opacity:1}30%{transform:translate(var(--dx),-50px) scale(1.1)}100%{transform:translate(160px,-190px) scale(.5);opacity:0}}
.v4dust{position:absolute;width:26px;height:18px;border-radius:50%;background:#d9c7a0;opacity:.7;pointer-events:none;animation:v4ds .8s ease-out forwards}
@keyframes v4ds{to{opacity:0;transform:translate(var(--dx),-18px) scale(2.2)}}
.v4streak{position:absolute;left:8px;top:48px;font-weight:900;font-size:13px;color:#ffd84d;text-shadow:0 2px 3px #000;z-index:5;pointer-events:none}
.v4mood{position:absolute;left:0;right:0;bottom:6px;text-align:center;font-size:12px;color:#fff;text-shadow:0 1px 3px #000;z-index:5;pointer-events:none}
.v4tm{display:flex;gap:6px;margin:4px 0 8px}.v4tm button{flex:1;padding:9px 6px;border:2px solid var(--line);border-radius:12px;background:var(--card);color:inherit;font:inherit;font-weight:700;cursor:pointer}
.v4tm button.on{border-color:#ffd778;background:linear-gradient(#2a3b52,#162235)}
.v4kc{border:2px solid #8a7049;border-radius:12px;background:linear-gradient(135deg,#2a2013,#16110a);padding:8px 10px;margin-bottom:6px;display:flex;gap:10px;align-items:center}
.v4kc .ic{width:38px;height:38px;flex:none}.v4kc div{flex:1;min-width:0;font-size:12px}.v4kc b{color:#ffe0a0}
.v4kc .btn{padding:7px 10px;font-size:12px}
.v4g{display:flex;align-items:center;gap:9px;border:2px solid var(--line);border-radius:12px;background:var(--card);padding:6px 9px;margin-bottom:5px}
.v4g .ic{width:34px;height:34px;flex:none}.v4g div{flex:1;min-width:0;font-size:12px}.v4g .up{color:#7dffb0;font-weight:800}.v4g .dn{color:#ff8a7a;font-weight:800}
.v4g .btn{padding:6px 9px;font-size:11.5px}
#v4hg{position:fixed;inset:0;z-index:96;background:#000c;display:flex;align-items:center;justify-content:center;padding:14px}
#v4hg .box{width:min(400px,100%);border:3px solid #ffd778;border-radius:16px;background:linear-gradient(160deg,#2a1f12,#0d0a06);color:#fff;padding:14px;text-align:center;animation:v4pop .25s ease-out}
#v4hg .npc{width:84px;height:84px;margin:0 auto;border-radius:50%;overflow:hidden;border:3px solid #ffd778;background:#000;animation:v4npc 1.6s ease-in-out infinite}
@keyframes v4npc{50%{transform:translateY(-4px)}}
#v4hg .npc .ic{width:100%;height:100%}
#v4hg .say{margin:8px 0;font-style:italic;color:#e9d9b9;min-height:34px}
.v4pb{position:relative;display:flex;height:34px;border-radius:10px;overflow:hidden;border:2px solid #fff3;margin:8px 0}
.v4pb i{display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:800;font-style:normal;color:#0008;text-shadow:none}
.v4pb .nd{position:absolute;top:-3px;bottom:-3px;width:6px;margin-left:-3px;background:#fff;border-radius:3px;box-shadow:0 0 10px #fff}
`;
document.head.appendChild(stf);
Object.assign(SFX,{chop:()=>{tone(120,.09,'square',.09,-60);tone(420,.05,'sawtooth',.05,-260,.01)},creak:()=>{tone(210,.4,'sawtooth',.04,-70);tone(190,.3,'sawtooth',.03,-50,.18)},timber:()=>{tone(90,.7,'sawtooth',.09,-50);tone(60,.6,'square',.07,-20,.5)},ding:()=>tone(1500,.14,'triangle',.05)});
const ringDur=()=>Math.max(700,1100-L('wood')*10);
function newRing(){WS.ring={t0:performance.now(),dur:ringDur(),x:80+Math.random()*50,y:120+Math.random()*70};WS.ringNew=true}
VIEWS.wood=()=>{
  if(!WS.tree)newTree2();S.wz=Math.min(S.wz||0,FZ.length-1);if(!wzOk(S.wz))S.wz=0;
  const z=FZ[S.wz],t=WS.tree.t;
  const zones=FZ.map((q,i)=>'<button class="v4z'+(i===S.wz?' on':'')+'" data-v4="wz" data-i="'+i+'" '+(wzOk(i)?'':'disabled')+'><b>'+(wzOk(i)?q.n:'🔒 '+q.n)+'</b><small>'+(wzOk(i)?q.t.map(x=>TR2.find(y=>y.id===x[0]).n).join(', '):'Woodcutting Lv '+q.l)+'</small></button>').join('');
  newRing();
  return skillBar('wood')+'<div class="v4zones">'+zones+'</div>'
   +'<div class="v4wd '+z.bg+'" id="v4wd" data-v4="chop" style="'+(V4.zoneBg?V4.zoneBg(S.wz):'')+'"><div class="v4nm" id="v4nm">'+t.n+' tree</div><div class="v4hpb"><i id="v4thp" style="width:'+(WS.tree.hp/WS.tree.max*100)+'%"></i></div>'
   +'<div class="v4tree" id="v4tree">'+treeSvg(t)+'<div id="v4notches"></div><div class="v4tgt" id="v4tgt"><i class="rg" id="v4rg"></i></div></div>'
   +'<div class="v4axe" id="v4axe">'+icon('spr:axe')+'</div><div class="v4streak" id="v4streak"></div><div class="v4mood" id="v4mood">Tap when the ring closes on the glowing weak spot</div></div>'
   +'<button class="btn full" data-v4="chop">Swing axe</button>'
   +'<p class="h">Time your swing as the ring closes: <b>perfect</b> hits deal huge damage and chain into a streak. Logs: '+TR2.map(x=>x.n+' '+inv(x.id)).join(', ')+'.</p>';
};
woodLoop=function(ts){
  const tg=$('v4tgt');if(!tg){WS.raf=0;return}
  const rg=$('v4rg'),r=WS.ring;if(!r){newRing()}
  const e=(performance.now()-WS.ring.t0)/WS.ring.dur;
  if(e>1.1)newRing();
  if(WS.ringNew){tg.style.left=WS.ring.x+'px';tg.style.top=WS.ring.y+'px';WS.ringNew=false}
  const k=Math.min(1,Math.max(0,e));rg.style.transform='scale('+(2.4-1.4*k)+')';rg.classList.toggle('go',e>=.8);
  WS.raf=requestAnimationFrame(woodLoop);
};
chopSwing=function(){
  if(WS.busy||!WS.tree)return;const tr=$('v4tree'),wd=$('v4wd');if(!tr||!wd)return;
  const e=(performance.now()-WS.ring.t0)/WS.ring.dur,perfect=e>=.8&&e<=1.1,good=!perfect&&e>=.55;
  WS.streak=perfect?(WS.streak||0)+1:0;
  const base=1+Math.floor(L('wood')/8),mult=perfect?2.2+Math.min(1.5,.15*(WS.streak-1)):good?1.3:.6;
  const dmg=Math.max(1,Math.round(base*mult));
  const ax=$('v4axe');if(ax){ax.classList.remove('sw');void ax.offsetWidth;ax.classList.add('sw')}
  const rx=WS.ring.x,ry=WS.ring.y;
  setTimeout(()=>{
    if(!$('v4tree')||!WS.tree)return;
    WS.tree.hp-=dmg;try{SFX.chop();if(perfect)SFX.ding()}catch(_){}
    tr.classList.remove('hit');void tr.offsetWidth;tr.classList.add('hit');
    const col=WS.tree.t.trunk;
    for(let i=0;i<(perfect?12:6);i++){const c=document.createElement('i');c.className='v4chip';c.style.left=(tr.offsetLeft+rx)+'px';c.style.top=(tr.offsetTop+ry)+'px';c.style.setProperty('--dx',(Math.random()*140-70)+'px');c.style.setProperty('--dy',(Math.random()*-90-10)+'px');c.style.background=col;wd.appendChild(c);setTimeout(()=>c.remove(),650)}
    const n=document.createElement('i');n.className='v4notch';n.style.left=(rx-19)+'px';n.style.top=(ry-4)+'px';n.style.setProperty('--r',(Math.random()*24-12)+'deg');n.style.transform='rotate('+(Math.random()*24-12)+'deg)';n.style.width=(26+Math.min(30,dmg*4))+'px';const nb=$('v4notches');if(nb)nb.appendChild(n);
    for(let i=0;i<(perfect?7:3);i++){const l=document.createElement('i');l.className='v4leaf';l.style.background=WS.tree.t.leaf;l.style.left=(tr.offsetLeft+50+Math.random()*110)+'px';l.style.top=(tr.offsetTop+20+Math.random()*60)+'px';l.style.setProperty('--dx',(Math.random()*80-40)+'px');wd.appendChild(l);setTimeout(()=>l.remove(),1450)}
    const f=document.createElement('span');f.className='v4fx'+(perfect?' crit':'');f.textContent=(perfect?'PERFECT ':good?'':'weak ')+'-'+dmg;f.style.left=(tr.offsetLeft+rx-30)+'px';f.style.top=(tr.offsetTop+ry-40)+'px';wd.appendChild(f);setTimeout(()=>f.remove(),850);
    if(perfect)anim(wd,'v4shk');
    const sk=$('v4streak');if(sk)sk.textContent=WS.streak>1?'Streak ×'+WS.streak:'';
    const hp=$('v4thp');if(hp)hp.style.width=Math.max(0,WS.tree.hp/WS.tree.max*100)+'%';
    const md=$('v4mood');if(md)md.textContent=WS.tree.hp<=WS.tree.max*.3&&WS.tree.hp>0?'The trunk is creaking...':'';
    if(WS.tree.hp<=WS.tree.max*.3&&WS.tree.hp>0)try{SFX.creak()}catch(_){}
    newRing();
    if(WS.tree.hp<=0)fellTree(tr,wd,perfect);
  },170);
};
function fellTree(tr,wd,perfect){
  WS.busy=true;const t=WS.tree.t;tr.classList.remove('hit');
  const b=document.createElement('div');b.className='v4ban';b.textContent='TIMBER!';b.style.top='26%';wd.appendChild(b);setTimeout(()=>b.remove(),900);
  tr.classList.add('fall');try{SFX.timber()}catch(_){}
  const q=1+(Math.random()<.06*S.up.sawup+.004*L('wood')?1:0)+(perfect?1:0)+((WS.streak||0)>=3?1:0);
  setTimeout(()=>{
    anim(wd,'v4shk');
    for(let i=0;i<7;i++){const d=document.createElement('i');d.className='v4dust';d.style.left=(tr.offsetLeft+80+i*10)+'px';d.style.top=(tr.offsetTop+220)+'px';d.style.setProperty('--dx',(Math.random()*120-30)+'px');wd.appendChild(d);setTimeout(()=>d.remove(),850)}
    for(let i=0;i<Math.min(5,q+1);i++){const l=document.createElement('div');l.className='v4log';l.innerHTML=icon(t.id==='oak'?'spr:wood':'wood:'+t.id);l.style.left=(tr.offsetLeft+110+i*14)+'px';l.style.top=(tr.offsetTop+190)+'px';l.style.setProperty('--dx',(i*18-30)+'px');l.style.animationDelay=(i*80)+'ms';wd.appendChild(l);setTimeout(()=>l.remove(),1200)}
    S.inv[t.id]=inv(t.id)+q;addXp('wood',t.xp);
    if(Math.random()<.08)S.inv.honey=inv('honey')+1;
    if(Math.random()<.06)S.inv.feather=inv('feather')+1;
  },620);
  setTimeout(()=>{newTree2();WS.busy=false;WS.streak=0;if(S.tab==='wood'){render()}save()},1700);
}

/* ---------- Market Square ---------- */
S.tmode=S.tmode||'map';S.contracts=S.contracts||[];
const hsh=s=>{let h=7;for(const c of s)h=(h*31+c.charCodeAt(0))%9973;return h};
const mmult=id=>{const h=hsh(id),t=Date.now()/1000;return 1+.28*Math.sin(t/(110+h%80)+h)};
const mtrend=id=>{const h=hsh(id),t=Date.now()/1000;return Math.cos(t/(110+h%80)+h)>=0};
const NPCS=[
 {n:'Miser Gruff',ic:'m_goblin',say:['“Too dear! Far too dear!”','“I pay fair, never more.”'],seg:[['Insulted',.5,.12,'#a82a2a'],['Low',.8,.32,'#c26a2a'],['Fair',1,.30,'#c2b52a'],['Good',1.25,.20,'#5ab83a'],['Great',1.5,.06,'#ffd84d']]},
 {n:'Lady Vance',ic:'m_banshee',say:['“Quality, I do appreciate quality.”','“Name your price, darling.”'],seg:[['Insulted',.5,.08,'#a82a2a'],['Low',.8,.16,'#c26a2a'],['Fair',1,.28,'#c2b52a'],['Good',1.25,.28,'#5ab83a'],['Great',1.6,.20,'#ffd84d']]},
 {n:'Old Collector',ic:'m_orc_hood',say:['“Hmm... rare stuff, is it?”','“I know what this is worth.”'],seg:[['Insulted',.5,.10,'#a82a2a'],['Low',.8,.22,'#c26a2a'],['Fair',1,.26,'#c2b52a'],['Good',1.3,.26,'#5ab83a'],['Great',1.7,.16,'#ffd84d']]},
 {n:'Dock Trader',ic:'m_elf',say:['“Quick deal, I sail at dawn.”','“Let us not waste time.”'],seg:[['Insulted',.5,.10,'#a82a2a'],['Low',.85,.25,'#c26a2a'],['Fair',1,.30,'#c2b52a'],['Good',1.2,.24,'#5ab83a'],['Great',1.45,.11,'#ffd84d']]}
];
const marketIds=()=>Object.keys(S.inv).filter(id=>S.inv[id]>0&&(VAL[id]||0)>=2).sort((a,b)=>(VAL[b]||0)-(VAL[a]||0)).slice(0,30);
function genContract(){
  const pool=Object.keys(MATS).filter(id=>(VAL[id]||0)>=3&&(VAL[id]||0)<=40+L('trade')*14).concat(FISH.filter(f=>f.l<=L('fish')+3).map(f=>f.id));
  const id=pool[rnd(0,pool.length-1)],qty=3+rnd(0,2+Math.floor(L('trade')/3)),who=['Baker Hilda','Smith Roderic','Captain Mara','Innkeeper Bo','Alchemist Veyra','Farmer Tobin'][rnd(0,5)];
  return {id:'k'+Date.now()+rnd(0,999),item:id,qty,reward:Math.round((VAL[id]||5)*qty*(1.7+Math.random()*.7)),exp:Date.now()+(4+rnd(0,6))*60000,who};
}
function refreshContracts(){S.contracts=(S.contracts||[]).filter(c=>c.exp>Date.now());while(S.contracts.length<3)S.contracts.push(genContract())}
const kLeft=c=>fmt((c.exp-Date.now())/1000);
function marketView(){
  refreshContracts();
  const ids=marketIds();
  const hot=ids.map(id=>[id,mmult(id)]).sort((a,b)=>b[1]-a[1]).slice(0,3);
  const kc=S.contracts.map(c=>{const have=inv(c.item)>=c.qty;return '<div class="v4kc">'+gIcon(c.item,'ic')+'<div><b>'+c.who+'</b> wants <b>'+c.qty+' × '+nm(c.item)+'</b><br>Reward <b style="color:#ffd84d">'+c.reward+'</b> coins · <span class="v4kt" data-id="'+c.id+'">'+kLeft(c)+'</span> left · you have '+inv(c.item)+'</div><button class="btn'+(have?'':' alt')+'" data-v4="deliver" data-i="'+c.id+'" '+(have?'':'disabled')+'>Deliver</button></div>'}).join('');
  const rows=ids.map(id=>{const m=mmult(id),up=mtrend(id);return '<div class="v4g">'+gIcon(id,'ic')+'<div><b>'+nm(id)+'</b> ×'+inv(id)+'<br>Base '+VAL[id]+' · market <span class="'+(up?'up':'dn')+'">×'+m.toFixed(2)+' '+(up?'▲':'▼')+'</span></div><button class="btn alt" data-v4="sell" data-i="'+id+'" data-q="1">Haggle 1</button>'+(inv(id)>1?'<button class="btn" data-v4="sell" data-i="'+id+'" data-q="'+inv(id)+'">All ×'+inv(id)+'</button>':'')+'</div>'}).join('')||'<p class="h">Nothing to sell yet. Gather materials, fish and crafted goods first.</p>';
  return '<p class="h">Prices drift through the day. Sell when a good is ▲ in demand, and win the haggle for the best coin.'+(hot.length?' Hot now: '+hot.map(h=>nm(h[0])+' ×'+h[1].toFixed(2)).join(', ')+'.':'')+'</p><div class="ttl">Contract board</div>'+kc+'<div class="ttl">Your stalls</div>'+rows;
}
{const _tv=VIEWS.trade;VIEWS.trade=()=>{
  const bar='<div class="v4tm"><button data-v4="tmode" data-i="map" class="'+(S.tmode!=='market'?'on':'')+'">Caravan Routes</button><button data-v4="tmode" data-i="market" class="'+(S.tmode==='market'?'on':'')+'">Market Square</button></div>';
  return S.tmode==='market'?skillBar('trade')+bar+marketView():bar+_tv();
}}
function haggle(id,qty){
  if(document.getElementById('v4hg'))return;qty=Math.min(qty,inv(id));if(qty<1)return;
  const npc=NPCS[rnd(0,NPCS.length-1)];
  const segs=npc.seg.slice().sort(()=>Math.random()-.5);
  const root=document.createElement('div');root.id='v4hg';
  const base=(VAL[id]||1)*mmult(id)*(1+.01*L('trade'));
  root.innerHTML='<div class="box"><div class="npc">'+icon('spr:'+npc.ic)+'</div><b>'+npc.n+'</b><div class="say">'+npc.say[rnd(0,npc.say.length-1)]+'</div><div>Selling <b>'+qty+' × '+nm(id)+'</b> · fair price ≈ <b>'+Math.round(base*qty)+'</b></div><div class="v4pb" id="v4pb">'+segs.map(s=>'<i style="width:'+(s[2]*100)+'%;background:'+s[3]+'">'+(s[2]>.1?s[0]:'')+'</i>').join('')+'<span class="nd" id="v4nd"></span></div><button class="btn full" id="v4hgo">Strike the deal!</button></div>';
  document.body.appendChild(root);
  let p=0,dir=1,raf=0,last=0,done=false;const nd=root.querySelector('#v4nd');
  const loop=ts=>{if(done)return;const dt=Math.min(.05,(ts-(last||ts))/1000);last=ts;p+=dir*dt*(105+L('trade')*1.5);if(p>=100){p=100;dir=-1}if(p<=0){p=0;dir=1}nd.style.left=p+'%';raf=requestAnimationFrame(loop)};
  raf=requestAnimationFrame(loop);
  root.querySelector('#v4hgo').onclick=()=>{
    if(done)return;done=true;cancelAnimationFrame(raf);
    let acc=0,seg=segs[segs.length-1];for(const s of segs){acc+=s[2]*100;if(p<=acc){seg=s;break}}
    const total=Math.round(base*seg[1]*qty);
    S.inv[id]=inv(id)-qty;S.coins+=total;addXp('trade',3+qty+(seg[1]>=1.25?4:0));
    root.querySelector('.say').innerHTML='<b style="color:'+seg[3]+'">'+seg[0]+'!</b> Sold for <b style="color:#ffd84d">'+total+'</b> coins.';
    try{seg[1]>=1.25?SFX.win():seg[1]<.8?SFX.err():SFX.coin()}catch(_){}
    root.querySelector('#v4hgo').textContent='Done';root.querySelector('#v4hgo').onclick=()=>{root.remove();save();render()};
  };
}
$('pane').addEventListener('click',e=>{
  const b=e.target.closest('[data-v4]');if(!b)return;const a=b.dataset.v4,i=b.dataset.i;
  if(a==='tmode'){S.tmode=i;save();render()}
  else if(a==='sell')haggle(i,+b.dataset.q);
  else if(a==='deliver'){const c=S.contracts.find(x=>x.id===i);if(!c||inv(c.item)<c.qty)return;S.inv[c.item]=inv(c.item)-c.qty;S.coins+=c.reward;addXp('trade',10+c.qty*2);S.contracts=S.contracts.filter(x=>x!==c);try{SFX.win()}catch(_){}note('text','📜 Contract complete for <b>'+c.who+'</b>.',0,'#ffd778');save();render()}
});
setInterval(()=>{
  document.querySelectorAll('.v4kt').forEach(el=>{const c=(S.contracts||[]).find(x=>x.id===el.dataset.id);if(c)el.textContent=kLeft(c)});
  if(S.tab==='trade'&&S.tmode==='market'&&!document.getElementById('v4hg')&&Date.now()%20000<1000)render();
},1000);
V4.WS=WS;


