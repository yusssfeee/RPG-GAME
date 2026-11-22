/* ================= 3) WOODCUTTING: choose forest + tree, then chop ================= */
const FOR5=[
 {id:'meadow',n:'Meadow Grove',type:'Temperate',l:1,bg:'bg_f1',f:'',t:[['oak',60],['birch',25],['maple',15]],trait:'Calm winds: wider timing window.',ring:1.12,bonus:0,xp:1},
 {id:'pine',n:'Pine Ridge',type:'Conifer',l:4,bg:'bg_f2',f:'',t:[['pine',50],['cedar',30],['birch',20]],trait:'Resin: +4% bonus-log chance.',ring:1,bonus:.04,xp:1},
 {id:'marsh',n:'Willow Marsh',type:'Wetland',l:6,bg:'bg_f4',f:'hue-rotate(35deg) saturate(.9)',t:[['willow',45],['maple',30],['birch',25]],trait:'Swaying branches: the spot drifts. +10% XP.',ring:1,bonus:0,xp:1.1,drift:true},
 {id:'ironwood',n:'Ironwood Hollow',type:'Hardwood',l:9,bg:'bg_f2',f:'sepia(.4) brightness(.8)',t:[['ironwood',40],['cedar',30],['pine',20],['redwood',10]],trait:'Dense timber: tougher trees, +15% XP.',ring:.92,bonus:0,xp:1.15,tough:true},
 {id:'redwood',n:'Redwood Cathedral',type:'Giant',l:12,bg:'bg_f3',f:'sepia(.45) saturate(1.3)',t:[['redwood',55],['cedar',25],['ironwood',20]],trait:'Giants: huge trees, +1 log per fall, +10% XP.',ring:1,bonus:0,xp:1.1,giant:true},
 {id:'elder',n:'Elderwood Depths',type:'Enchanted',l:13,bg:'bg_f3',f:'hue-rotate(230deg) saturate(1.2) brightness(.8)',t:[['elder',45],['redwood',30],['ironwood',25]],trait:'Arcane flickers: the spot teleports. +25% XP, crystals.',ring:.9,bonus:0,xp:1.25,flicker:true,rare:true}
];
{const c=document.createElement('style');c.textContent=['bg_f1','bg_f2','bg_f3','bg_f4'].map(k=>'.w5-'+k+'{background-image:url('+SPR4[k]+')}').join('');document.head.appendChild(c)}
const NEST='<svg viewBox="0 0 40 40"><ellipse cx="20" cy="27" rx="16" ry="9" fill="#7a4a24" stroke="#241a35" stroke-width="2"/><ellipse cx="14" cy="22" rx="4.5" ry="5.5" fill="#cfe8ff" stroke="#241a35" stroke-width="1.5"/><ellipse cx="25" cy="21" rx="4.5" ry="5.5" fill="#f4ead2" stroke="#241a35" stroke-width="1.5"/><path d="M6 28q14 8 28 0" fill="none" stroke="#b88a5a" stroke-width="2"/></svg>';
const W5={st:'pick',fo:(S.w5&&S.w5.f)||'meadow',sp:(S.w5&&S.w5.sp)||'any',tree:null,ring:null,rid:0,streak:0,best:0,frenzy:0,busy:false,stun:0,ev:null,evT:8,raf:0,last:0,fells:0,logs:0,hits:0,perf:0,ambT:0,skip:0,side:1,enter:false};
const foAt=id=>FOR5.find(f=>f.id===id)||FOR5[0];
const foOk=f=>L('wood')>=f.l;
const $s=()=>document.getElementById('w5s');
function pool5(){
  const f=foAt(W5.fo);
  if(W5.sp!=='any'){const t=TR2.find(x=>x.id===W5.sp);if(t&&L('wood')>=t.l&&f.t.some(x=>x[0]===t.id))return[[t,1]]}
  const p=f.t.map(([id,w])=>[TR2.find(x=>x.id===id),w]).filter(([t])=>t&&L('wood')>=t.l);
  return p.length?p:[[TR2[0],1]];
}
function newTree5(){
  const list=pool5();let r=Math.random()*list.reduce((a,x)=>a+x[1],0),t=list[0][0];
  for(const[tt,w]of list){r-=w;if(r<=0){t=tt;break}}
  const f=foAt(W5.fo);
  let hp=t.hp*(f.giant?1.5:1)*(f.tough?1.1:1)*(1-.08*S.up.axeup);
  hp=Math.max(2,Math.round(hp));
  W5.tree={t,hp,max:hp,hits:0,perf:0};W5.ring=null;W5.ev=null;W5.evT=6+Math.random()*6;
}
const w5RingDur=()=>{const f=foAt(W5.fo),t=W5.tree&&W5.tree.t;let d=Math.max(650,1150-L('wood')*9)*f.ring*(1+.03*nl('steady'));
  if(t&&t.id==='ironwood')d*=.88;if(t&&t.id==='elder')d*=.9;if(W5.frenzy>performance.now())d*=1.25;return d};
function w5NewRing(delay){
  const f=foAt(W5.fo),t=W5.tree&&W5.tree.t;
  W5.ring={id:++W5.rid,t0:performance.now()+(delay||0),dur:w5RingDur(),x:78+Math.random()*60,y:70+Math.random()*130,
    drift:!!f.drift||(t&&t.id==='willow'),flick:!!f.flicker||(t&&t.id==='elder'),flicked:false,ph:Math.random()*6.28,used:false,cx:105,cy:130};
}
function pickHTML(){
  const lv=L('wood'),f=foAt(W5.fo);
  const cards=FOR5.map(q=>{const ok=foOk(q);
    return '<button class="w5-f'+(q.id===W5.fo?' on':'')+(ok?'':' lk')+'" data-w5="forest" data-i="'+q.id+'"><span class="pic w5-'+q.bg+'" style="'+(q.f?'filter:'+q.f:'')+'"></span>'+(ok?'':'<span class="lv">Lv '+q.l+'</span>')
     +'<span class="tx"><span class="ty">'+q.type+' forest'+w8Txt(q.id)+'</span><b>'+(ok?'':'🔒 ')+q.n+'</b><small>'+(ok?q.trait:'Reach Woodcutting level '+q.l+' to enter.')+'</small></span></button>'}).join('');
  const sps=[...new Set(f.t.map(x=>x[0]))].map(id=>TR2.find(t=>t.id===id));
  const sp='<button class="w5-sp'+(W5.sp==='any'?' on':'')+'" data-w5="species" data-i="any">'+icon('spr:axe')+'<span><b>Any tree</b><small>Whatever grows here</small></span></button>'
   +sps.map(t=>{const ok=lv>=t.l;return '<button class="w5-sp'+(W5.sp===t.id?' on':'')+(ok?'':' lk')+'" data-w5="species" data-i="'+t.id+'">'+gIcon(t.id,'ic')+'<span><b>'+t.n+'</b><small>'+(ok?'HP '+t.hp+' · XP '+t.xp:'Lv '+t.l)+'</small></span></button>'}).join('');
  return skillBar('wood')+'<div class="w5-head"><h3>Choose your forest</h3><p class="h">Each forest grows different trees and has its own quirk. Pick one, then choose which tree type to hunt.</p></div>'
   +'<div class="w5-fgrid">'+cards+'</div>'
   +'<div class="w5-sel"><h4>'+f.n+'</h4><p>'+f.trait+'</p><div class="ttl" style="margin:0 0 6px">Tree type</div><div class="w5-sps">'+sp+'</div><button class="btn full" data-w5="enter"'+(foOk(f)?'':' disabled')+'>Enter '+f.n+'</button></div>'
   +'<div class="ttl">Your logs</div>'+logsRow();
}
const logsRow=()=>'<div class="w5-logs">'+TR2.map(x=>'<span>'+gIcon(x.id,'ic')+x.n+' '+inv(x.id)+'</span>').join('')+'</div>';
function sceneHTML(){
  const f=foAt(W5.fo);if(!W5.tree)newTree5();const T=W5.tree,t=T.t;W5.ev=null;
  const spn=W5.sp==='any'?'Any tree':(TR2.find(x=>x.id===W5.sp)||{n:'Any tree'}).n;
  return '<div id="w5skill">'+skillBar('wood')+'</div>'
   +'<div class="w5-bar"><button class="btn alt" data-w5="leave">◀ Leave forest</button><div class="info"><b>'+f.n+'</b> · '+f.type+'<br>Target: '+spn+'</div></div>'
   +'<div class="w5-stage" id="w5s" data-w5="tap"><div class="w5-bg w5-'+f.bg+'" style="'+(f.f?'filter:'+f.f:'')+'"></div><div class="w5-rays"></div><div class="w5-amb" id="w5amb"></div>'
   +'<div class="w5-hpbar"><i id="w5hp" style="width:'+(T.hp/T.max*100)+'%"></i></div><div class="w5-name" id="w5nm">'+t.n+' tree</div>'
   +'<div class="w5-tree" id="w5tree">'+treeSvg(t)+'<div class="w5-notches" id="w5notch"></div></div>'
   +'<div class="w5-tgt" id="w5tgt"><i class="rg" id="w5rg"></i></div>'
   +'<div class="w5-axe" id="w5axe">'+icon('spr:axe')+'</div><div class="w5-streak" id="w5streak"></div>'
   +'<div class="w5-msg" id="w5msg">Tap when the ring closes on the glowing spot. Tap the spot itself for bonus damage.</div></div>'
   +'<button class="btn full" data-w5="swing" style="margin-top:8px">Swing axe</button>'
   +'<div class="w5-stats"><div><b id="w5s1">'+W5.fells+'</b>trees felled</div><div><b id="w5s2">'+W5.logs+'</b>logs</div><div><b id="w5s3">'+W5.best+'</b>best streak</div><div><b id="w5s4">'+(W5.hits?Math.round(100*W5.perf/W5.hits)+'%':'–')+'</b>perfect</div></div>'
   +'<p class="h">Hit as the ring closes: <b>perfect</b> strikes chain into a streak, five in a row starts a Frenzy. Watch for bird nests (tap them for loot) and falling branches (tap Dodge).</p>'
   +'<div class="ttl">Your logs</div>'+logsRow();
}
VIEWS.wood=()=>{
  if(W5.stateRef!==S){
    W5.stateRef=S;const cfg=S.w5&&typeof S.w5==='object'?S.w5:{};
    W5.fo=FOR5.some(f=>f.id===cfg.f)?cfg.f:'meadow';
    W5.sp=cfg.sp==='any'||TR2.some(t=>t.id===cfg.sp)?(cfg.sp||'any'):'any';
    W5.st='pick';W5.tree=null;W5.ring=null;W5.ev=null;W5.busy=false;W5.enter=false;W5.streak=0;W5.frenzy=0;
  }
  if(!foOk(foAt(W5.fo))){W5.fo='meadow';W5.sp='any'}
  return W5.st==='scene'?sceneHTML():pickHTML();
};
woodLoop=function(){WS.raf=0};
/* ---------- little helpers ---------- */
const wmsg=t=>{const m=document.getElementById('w5msg');if(m)m.textContent=t};
function wStreakUI(){const e=document.getElementById('w5streak');if(!e)return;const now=performance.now();let h='';if(W5.streak>1)h+='Streak ×'+W5.streak;if(W5.frenzy>now)h+=(h?'<br>':'')+'FRENZY '+Math.ceil((W5.frenzy-now)/1000)+'s';e.innerHTML=h}
function wStatsUI(){[['w5s1',W5.fells],['w5s2',W5.logs],['w5s3',W5.best],['w5s4',W5.hits?Math.round(100*W5.perf/W5.hits)+'%':'–']].forEach(([id,v])=>{const e=document.getElementById(id);if(e)e.textContent=v})}
function wFly(p,cls,css,kf,dur,ease){const e=document.createElement('i');e.className=cls;Object.assign(e.style,css);p.appendChild(e);ani(e,kf,{duration:dur,easing:ease||'ease-out',fill:'forwards'});setTimeout(()=>e.remove(),dur+80);return e}
function wText(s,x,y,txt,crit){const e=document.createElement('span');e.className='w5-fx'+(crit?' crit':'');e.textContent=txt;e.style.left=x+'px';e.style.top=y+'px';s.appendChild(e);ani(e,[{transform:'translateY(0)',opacity:1},{transform:'translateY(-54px)',opacity:0}],{duration:850,easing:'ease-out',fill:'forwards'});setTimeout(()=>e.remove(),900)}
function wBanner(s,txt,top){const e=document.createElement('div');e.className='w5-ban';e.textContent=txt;e.style.top=top||'26%';s.appendChild(e);ani(e,[{transform:'scale(.4)',opacity:0},{transform:'scale(1.15)',opacity:1,offset:.25},{transform:'scale(1)',opacity:1,offset:.7},{transform:'scale(1)',opacity:0}],{duration:1000,fill:'forwards'});setTimeout(()=>e.remove(),1050)}
/* ---------- the swing ---------- */
function wSwing(e,viaBtn){
  const now=performance.now(),s=$s(),tr=document.getElementById('w5tree'),tg=document.getElementById('w5tgt');
  if(!s||!tr||W5.busy||W5.stun>now||!W5.tree)return;
  const r=W5.ring;if(!r||r.used||now<r.t0)return;
  const el=(now-r.t0)/r.dur,perfect=el>=.82&&el<=1.1,good=!perfect&&el>=.55;
  let aimed=false;
  if(e&&!viaBtn&&tg&&typeof e.clientX==='number'){const b=tg.getBoundingClientRect();aimed=Math.hypot(e.clientX-(b.left+b.width/2),e.clientY-(b.top+b.height/2))<=46}
  r.used=true;
  W5.streak=perfect?W5.streak+1:0;if(W5.streak>W5.best)W5.best=W5.streak;
  const T=W5.tree;T.hits++;W5.hits++;if(perfect){T.perf++;W5.perf++}
  let mult=perfect?2.2+Math.min(1.5,.15*(W5.streak-1)):good?1.3:.6;
  if(perfect)mult*=1+.04*nl('heartwood')+(foAt(W5.fo).pb||0);if(aimed)mult*=1.15;if(W5.frenzy>now)mult*=1.35;
  const dmg=Math.max(1,Math.round((1+Math.floor(L('wood')/8))*mult));
  const rx=r.cx,ry=r.cy;W5.side=rx<105?-1:1;
  const ax=document.getElementById('w5axe');
  ani(ax,[{transform:'scaleX(-1) rotate(-12deg)'},{transform:'scaleX(-1) translate(-20px,-30px) rotate(-70deg)',offset:.35},{transform:'scaleX(-1) translate(60px,10px) rotate(28deg)',offset:.6},{transform:'scaleX(-1) rotate(-12deg)'}],{duration:300,easing:'cubic-bezier(.4,0,.2,1)'});
  setTimeout(()=>{
    const s2=$s(),t2=document.getElementById('w5tree');if(!s2||!t2||W5.tree!==T)return;
    T.hp-=dmg;sfx('chop');if(perfect)sfx('ding');
    ani(t2,[{transform:'rotate(0)'},{transform:'rotate(-3.5deg)',offset:.3},{transform:'rotate(2.5deg)',offset:.7},{transform:'rotate(0)'}],{duration:220,easing:'ease-out'});
    const sx=t2.offsetLeft+rx,sy=t2.offsetTop+ry;
    for(let i=0;i<(perfect?12:6);i++)wFly(s2,'w5-chip',{left:sx+'px',top:sy+'px',background:T.t.trunk},[{transform:'translate(0,0) rotate(0)',opacity:1},{transform:'translate('+(Math.random()*140-70)+'px,'+(Math.random()*-90-10)+'px) rotate(280deg)',opacity:0}],600);
    for(let i=0;i<(perfect?7:3);i++)wFly(s2,'w5-leaf',{left:(t2.offsetLeft+50+Math.random()*110)+'px',top:(t2.offsetTop+20+Math.random()*60)+'px',background:T.t.leaf},[{transform:'translate(0,0) rotate(0)',opacity:1},{transform:'translate('+(Math.random()*80-40)+'px,150px) rotate(300deg)',opacity:0}],1400,'ease-in');
    const nb=document.getElementById('w5notch');if(nb){const n=document.createElement('i');n.className='w5-notch';n.style.left=(rx-19)+'px';n.style.top=(ry-4)+'px';n.style.width=(26+Math.min(30,dmg*4))+'px';n.style.transform='rotate('+(Math.random()*24-12)+'deg)';nb.appendChild(n)}
    wText(s2,sx-30,sy-40,(perfect?'PERFECT ':good?'':'weak ')+(aimed?'+aim ':'')+'-'+dmg,perfect);
    if(perfect)ani(s2,[{transform:'translate(0,0)'},{transform:'translate(-3px,2px)'},{transform:'translate(3px,-2px)'},{transform:'translate(0,0)'}],{duration:180});
    if(perfect&&W5.streak%5===0){W5.frenzy=performance.now()+7000;wBanner(s2,'FRENZY!','18%');sfx('win')}
    const hp=document.getElementById('w5hp');if(hp)hp.style.width=Math.max(0,T.hp/T.max*100)+'%';
    wStreakUI();wStatsUI();
    if(T.hp<=0){wFell(s2,t2,T)}
    else{wmsg(T.hp<=T.max*.3?'The trunk is creaking...':'');if(T.hp<=T.max*.3)sfx('creak');w5NewRing(300)}
  },170);
}
function wFell(s,tr,T){
  W5.busy=true;wEndEv();const t=T.t,f=foAt(W5.fo),side=W5.side;
  const ratio=T.hits?T.perf/T.hits:0,stars=ratio>=.7?3:ratio>=.4?2:1;
  let q=1;if(ratio>=.6&&T.hits>=3)q++;if(W5.frenzy>performance.now())q++;if(f.giant)q++;
  if(Math.random()<.06*S.up.sawup+.004*L('wood')+f.bonus+.03*w8Tier(f.id))q++;if(f.extra&&Math.random()<f.extra)q++;
  wBanner(s,'TIMBER!','24%');sfx('timber');
  ani(tr,[{transform:'rotate(0)'},{transform:'rotate('+6*side+'deg)',offset:.3},{transform:'rotate('+86*side+'deg) translateX('+40*side+'px)',opacity:.1}],{duration:800,easing:'ease-in',fill:'forwards'});
  setTimeout(()=>{
    const s2=$s();
    if(s2){
      ani(s2,[{transform:'translate(0,0)'},{transform:'translate(-4px,3px)'},{transform:'translate(4px,-2px)'},{transform:'translate(0,0)'}],{duration:240});
      for(let i=0;i<7;i++)wFly(s2,'w5-dust',{left:(tr.offsetLeft+80+i*10)+'px',top:(tr.offsetTop+220)+'px'},[{transform:'translate(0,0) scale(1)',opacity:.7},{transform:'translate('+(Math.random()*120-30)+'px,-18px) scale(2.2)',opacity:0}],800);
      for(let i=0;i<Math.min(5,q+1);i++){const l=document.createElement('div');l.className='w5-log';l.innerHTML=gIcon(t.id,'ic');l.style.left=(tr.offsetLeft+110+i*14)+'px';l.style.top=(tr.offsetTop+190)+'px';s2.appendChild(l);
        ani(l,[{transform:'translate(0,0) scale(.6)',opacity:1},{transform:'translate('+(i*18-30)+'px,-50px) scale(1.1)',offset:.3},{transform:'translate(160px,-190px) scale(.5)',opacity:0}],{duration:1000,delay:i*80,easing:'ease-in',fill:'both'});setTimeout(()=>l.remove(),1300)}
    }
    S.inv[t.id]=inv(t.id)+q;
    addXp('wood',Math.max(1,Math.round(t.xp*f.xp*(.9+.1*stars)*(1+.04*w8Tier(f.id)))));
    if(Math.random()<.08)S.inv.honey=inv('honey')+1;
    if(Math.random()<.06)S.inv.feather=inv('feather')+1;
    if(f.rare&&Math.random()<.05)S.inv.crystal=inv('crystal')+1;if(f.drop&&Math.random()<f.drop[1])S.inv[f.drop[0]]=inv(f.drop[0])+1;w8Add(f.id);
    W5.fells++;W5.logs+=q;wStatsUI();
    wmsg('Clean cut '+'★'.repeat(stars)+'☆'.repeat(3-stars)+' · +'+q+' '+t.n+' log'+(q>1?'s':''));
    const sk=document.getElementById('w5skill');if(sk)sk.innerHTML=skillBar('wood');
    save();
  },620);
  setTimeout(()=>{
    newTree5();W5.streak=0;W5.busy=false;
    const t2=document.getElementById('w5tree');
    if(t2&&S.tab==='wood'&&W5.st==='scene'){
      t2.getAnimations&&t2.getAnimations().forEach(a=>a.cancel());
      t2.innerHTML=treeSvg(W5.tree.t)+'<div class="w5-notches" id="w5notch"></div>';
      ani(t2,[{transform:'scale(.2)',opacity:0},{transform:'scale(1)',opacity:1}],{duration:450,easing:'ease-out'});
      const nm2=document.getElementById('w5nm');if(nm2)nm2.textContent=W5.tree.t.n+' tree';
      const hp=document.getElementById('w5hp');if(hp)hp.style.width='100%';
      wStreakUI();
    }
  },1700);
}
/* ---------- random events: nests and falling branches ---------- */
function wSpawnEv(s,now){
  W5.evT=9+Math.random()*7;
  if(Math.random()<Math.min(.85,.6+.04*nl('forester'))){
    const b=document.createElement('button');b.type='button';b.className='w5-nest';b.dataset.w5='nest';
    b.style.left=(s.clientWidth*(.3+Math.random()*.4))+'px';b.style.top=(70+Math.random()*60)+'px';b.innerHTML=NEST;s.appendChild(b);
    ani(b,[{transform:'scale(.2)',opacity:0},{transform:'scale(1)',opacity:1}],{duration:250,fill:'forwards'});
    W5.ev={type:'nest',els:[b],end:now+3000};wmsg('A bird’s nest! Tap it before it flies away.');
  }else{
    const x=s.clientWidth*(.25+Math.random()*.5);
    const sh=document.createElement('div');sh.className='w5-shadow';sh.style.left=x+'px';s.appendChild(sh);
    ani(sh,[{opacity:.2,transform:'scale(.4)'},{opacity:1,transform:'scale(1)'}],{duration:1300,fill:'forwards'});
    const wn=document.createElement('div');wn.className='w5-warn';wn.textContent='⚠ FALLING BRANCH!';s.appendChild(wn);
    ani(wn,[{opacity:1},{opacity:.3},{opacity:1},{opacity:.3},{opacity:1}],{duration:1300});
    const d=document.createElement('button');d.type='button';d.className='w5-dodge';d.dataset.w5='dodge';d.textContent='DODGE!';s.appendChild(d);
    W5.ev={type:'branch',els:[sh,wn,d],x,end:now+1400};
  }
}
function wEndEv(){const ev=W5.ev;if(!ev)return;ev.els.forEach(e=>e&&e.remove());W5.ev=null}
function wBranchFall(s,x,hit){
  const b=document.createElement('div');b.className='w5-branch';b.style.left=x+'px';b.style.top='-20px';s.appendChild(b);
  ani(b,[{transform:'translateY(0) rotate(-20deg)'},{transform:'translateY('+(s.clientHeight-36)+'px) rotate(10deg)'}],{duration:hit?230:330,easing:'ease-in',fill:'forwards'});
  setTimeout(()=>{ani(b,[{opacity:1},{opacity:0}],{duration:300,fill:'forwards'});setTimeout(()=>b.remove(),320)},hit?260:360);
}
function wDoEv(act){
  const ev=W5.ev,s=$s();if(!ev||!s)return;
  if(ev.type==='nest'&&act==='nest'){
    const pool=[['feather',55],['egg',30],['honey',15]];let r=Math.random()*100,id='feather';for(const[i,w]of pool){r-=w;if(r<=0){id=i;break}}
    const n=1+(Math.random()<.25+.06*nl('forester')?1:0);S.inv[id]=inv(id)+n;
    wText(s,s.clientWidth/2-40,90,'+'+n+' '+nm(id),true);wmsg('Nest looted: '+n+' '+nm(id)+'.');sfx('coin');wEndEv();save();
  }else if(ev.type==='branch'&&act==='dodge'){
    wBranchFall(s,ev.x,false);wText(s,12,s.clientHeight-100,'Dodged!',true);wmsg('Dodged the branch!');addXp('wood',3);sfx('coin');wEndEv();
  }
}
/* ---------- main loop ---------- */
function w5Loop(){
  const s=$s();
  if(!s||S.tab!=='wood'||W5.st!=='scene'){W5.raf=0;return}
  const now=performance.now(),dt=Math.min(.1,(now-(W5.last||now))/1000);W5.last=now;
  if(!W5.tree)newTree5();
  if(!W5.ring&&!W5.busy&&W5.stun<=now)w5NewRing(0);
  const tg=document.getElementById('w5tgt'),rg=document.getElementById('w5rg'),tr=document.getElementById('w5tree'),r=W5.ring;
  if(tg&&rg&&tr){
    if(!r||r.used||W5.busy||now<r.t0)tg.style.display='none';
    else{
      const e=(now-r.t0)/r.dur;
      if(e>1.12){W5.streak=0;wStreakUI();wmsg('Too slow! Swing as the ring closes.');w5NewRing(220);tg.style.display='none'}
      else{
        if(r.flick&&!r.flicked&&e>.55){r.flicked=true;r.x=78+Math.random()*60;r.y=70+Math.random()*130;
          wFly(s,'w5-chip',{left:(tr.offsetLeft+r.x)+'px',top:(tr.offsetTop+r.y)+'px',background:'#d4a8ff',width:'14px',height:'14px',borderRadius:'50%'},[{transform:'scale(1)',opacity:1},{transform:'scale(3)',opacity:0}],400)}
        r.cx=r.x+(r.drift?Math.sin(now/260+r.ph)*20:0);r.cy=r.y;
        tg.style.display='block';tg.style.left=(tr.offsetLeft+r.cx)+'px';tg.style.top=(tr.offsetTop+r.cy)+'px';
        const k=Math.min(1,Math.max(0,e));rg.style.transform='scale('+(2.4-1.4*k)+')';rg.classList.toggle('go',e>=.82&&e<=1.08);
      }
    }
  }
  if(W5.frenzy>0)wStreakUI();
  if(!W5.busy&&!W5.ev&&W5.stun<=now){W5.evT-=dt;if(W5.evT<=0)wSpawnEv(s,now)}
  const ev=W5.ev;
  if(ev&&now>=ev.end){
    if(ev.type==='nest'){const b=ev.els[0];ani(b,[{opacity:1,transform:'translateY(0)'},{opacity:0,transform:'translateY(-30px)'}],{duration:300,fill:'forwards'});wmsg('The nest is gone.');W5.ev=null;setTimeout(()=>b.remove(),320)}
    else{
      wBranchFall(s,ev.x,true);const x=ev.x;wEndEv();
      setTimeout(()=>{const s2=$s();if(!s2)return;W5.stun=performance.now()+1100;W5.streak=0;W5.ring=null;wStreakUI();wText(s2,x-30,s2.clientHeight-90,'Ouch! Streak lost',false);wmsg('A branch knocked you off balance!');sfx('err');
        ani(s2,[{transform:'translate(0,0)'},{transform:'translate(-5px,4px)'},{transform:'translate(5px,-3px)'},{transform:'translate(0,0)'}],{duration:260})},240);
    }
  }
  W5.ambT-=dt;const am=document.getElementById('w5amb');
  if(am&&W5.ambT<=0&&am.children.length<9){W5.ambT=.7+Math.random()*.8;const f=foAt(W5.fo),l=document.createElement('i');l.className='w5-leaf';l.style.left=(Math.random()*100)+'%';l.style.background=(W5.tree?W5.tree.t.leaf:'#6fbf5a');l.style.opacity='.8';am.appendChild(l);
    ani(l,[{transform:'translate(0,0) rotate(0)'},{transform:'translate('+(Math.random()*120-40)+'px,'+(s.clientHeight+30)+'px) rotate('+(Math.random()*540)+'deg)'}],{duration:5000+Math.random()*3000,easing:'ease-in-out',fill:'forwards'});setTimeout(()=>l.remove(),8200)}
  W5.raf=requestAnimationFrame(w5Loop);
}
/* ---------- input ---------- */
const WFAST=new Set(['tap','swing','dodge','nest']);
function wAct(b,e){
  const a=b.dataset.w5,i=b.dataset.i;
  if(a==='forest'){const f=foAt(i);if(!foOk(f)){say('Reach Woodcutting level '+f.l+' to enter '+f.n+'.');sfx('err');return}W5.fo=i;W5.sp='any';S.w5=Object.assign(S.w5||{},{f:W5.fo,sp:W5.sp});save();render()}
  else if(a==='species'){const t=TR2.find(x=>x.id===i);if(i!=='any'&&(!t||L('wood')<t.l)){sfx('err');return}W5.sp=i;S.w5=Object.assign(S.w5||{},{f:W5.fo,sp:W5.sp});save();render()}
  else if(a==='enter'){const f=foAt(W5.fo);if(!foOk(f))return;S.w5=Object.assign(S.w5||{},{f:W5.fo,sp:W5.sp});W5.st='scene';W5.tree=null;W5.ring=null;W5.streak=0;W5.fells=0;W5.logs=0;W5.hits=0;W5.perf=0;W5.best=0;W5.frenzy=0;W5.stun=0;W5.busy=true;W5.enter=true;newTree5();save();sfx('creak');render()}
  else if(a==='leave'){W5.st='pick';W5.tree=null;W5.ring=null;W5.ev=null;W5.busy=false;render()}
  else if(a==='tap')wSwing(e,false);
  else if(a==='swing')wSwing(e,true);
  else if(a==='nest'||a==='dodge')wDoEv(a);
}
$('pane').addEventListener('pointerdown',e=>{const b=e.target.closest('[data-w5]');if(!b||!WFAST.has(b.dataset.w5)||b.disabled)return;W5.skip=performance.now()+900;wAct(b,e)});
$('pane').addEventListener('click',e=>{const b=e.target.closest('[data-w5]');if(!b||b.disabled)return;if(WFAST.has(b.dataset.w5)&&performance.now()<W5.skip)return;wAct(b,e)});
{const _rw=render;render=function(){
  const r=_rw.apply(this,arguments);
  if(S.tab==='wood'&&W5.st==='scene'){
    const s=$s();
    if(s&&W5.enter){W5.enter=false;try{s.scrollIntoView({block:'center'})}catch(_){}const f=foAt(W5.fo),o=document.createElement('div');o.className='w5-enter';o.innerHTML='<b>Entering '+f.n+'</b><small>'+f.trait+'</small>';s.appendChild(o);
      ani(o,[{opacity:1},{opacity:1,offset:.6},{opacity:0}],{duration:1000,fill:'forwards'});setTimeout(()=>{o.remove();W5.busy=false;if(!W5.ring)w5NewRing(0)},1000)}
    if(!W5.raf){W5.last=0;W5.raf=requestAnimationFrame(w5Loop)}
  }
  return r}}



