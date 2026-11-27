/* ================= part E · combat overhaul ================= */
const ste=document.createElement('style');
ste.textContent=`
.v4fighting .hud,.v4fighting .btns{display:none!important}
.v4fighting #stg .tip:not(#etxt):not(#warn){display:none}
#stg.s-fight{overflow:hidden}
.v4hero{position:absolute;left:6px;bottom:70px;display:flex;gap:6px;align-items:flex-end;z-index:6;pointer-events:none;width:62%;max-width:250px}
.v4av{position:relative;width:62px;height:62px;flex:none;border-radius:14px;border:2px solid #ffd778;background:#0a1624;overflow:hidden;box-shadow:0 0 10px #000a;transition:box-shadow .2s}
.v4av .ic{width:100%;height:100%}
.v4av.guard{box-shadow:0 0 0 3px #6ec1ff,0 0 18px #6ec1ff,inset 0 0 14px #6ec1ff88}
.v4av.psn{box-shadow:0 0 0 2px #7dff6a,0 0 16px #5fe05a}
.v4av.burn{box-shadow:0 0 0 2px #ffb02a,0 0 16px #ff6a1a}
.v4av.bleed{box-shadow:0 0 0 2px #ff4a4a,0 0 16px #c21f1f}
.v4av.slow{box-shadow:0 0 0 2px #9fe6ff,0 0 16px #6cc8ff;filter:saturate(.7) hue-rotate(-10deg)}
.v4av.v4lunge{animation:v4lg .3s ease-out}
.v4av.v4hurt{animation:v4hr .3s ease-out}
@keyframes v4lg{0%{transform:translateX(0)}35%{transform:translateX(46px) scale(1.12)}100%{transform:none}}
@keyframes v4hr{0%{transform:translateX(0)}25%{transform:translateX(-8px);filter:brightness(2) saturate(2)}60%{transform:translateX(5px)}100%{transform:none}}
.v4hb{flex:1;min-width:0;display:flex;flex-direction:column;gap:2px;font-size:10px;color:#fff;text-shadow:0 1px 2px #000}
.v4hb b{font-size:11px}
.v4b{position:relative;height:13px;border-radius:7px;background:#000a;border:1px solid #ffffff44;overflow:hidden}
.v4b i{display:block;height:100%;width:0;transition:width .15s}
.v4b span{position:absolute;inset:0;text-align:center;font-size:9px;line-height:13px;font-weight:800}
.v4b.hp i{background:linear-gradient(#ff7a7a,#c93030)}.v4b.sh i{background:linear-gradient(#9fd8ff,#3b86d8)}.v4b.en i{background:linear-gradient(#d9a8ff,#8a46d8)}
.v4b.cd{height:5px}.v4b.cd i{background:linear-gradient(#ffe48a,#ffb02a)}
.v4fighting #stg{justify-content:flex-start!important;min-height:430px!important;padding-top:10px!important;gap:4px!important}
.v4fighting #etxt{order:-3}.v4fighting #stg .mbar{order:-2}.v4fighting #warn{order:-1;min-height:16px}
.v4chips{position:absolute;right:6px;align-items:flex-end;top:96px;display:flex;flex-direction:column;gap:3px;z-index:6;pointer-events:none}
.v4chips span{font-size:10px;font-weight:800;padding:2px 7px;border-radius:9px;background:#000b;border:1px solid var(--c);color:var(--c);animation:v4in .25s both}
.v4abar{position:absolute;left:6px;right:6px;bottom:6px;display:flex;gap:6px;justify-content:center;z-index:7}
.v4ab{position:relative;flex:1;max-width:62px;aspect-ratio:1;border-radius:14px;border:2px solid #ffd778;background:linear-gradient(160deg,#1c3550,#0b1624);color:#fff;cursor:pointer;padding:3px;display:flex;flex-direction:column;align-items:center;justify-content:center;font:inherit;box-shadow:0 3px 8px #000a;transition:transform .1s,filter .15s}
.v4ab:active{transform:scale(.92)}
.v4ab .ic{width:70%;height:70%}
.v4ab em{position:absolute;left:0;right:0;bottom:-1px;font-style:normal;font-size:8.5px;font-weight:800;text-align:center;text-shadow:0 1px 2px #000;background:#000a;border-radius:0 0 10px 10px;line-height:12px}
.v4ab small{position:absolute;right:-3px;top:-6px;min-width:18px;height:18px;border-radius:9px;background:#8a46d8;border:1px solid #fff;font-size:10px;font-weight:800;line-height:16px;text-align:center}
.v4ab.off{filter:grayscale(.9) brightness(.55);border-color:#666}
.v4fxl{position:absolute;inset:0;pointer-events:none;z-index:5;overflow:hidden}
.v4p{position:absolute;pointer-events:none;border-radius:50%;animation:v4pt var(--d,.9s) ease-out forwards}
.v4p.psn{background:radial-gradient(circle at 35% 30%,#d6ffb0,#4fc23a 70%);border:1px solid #2c7d22}
.v4p.burn{background:radial-gradient(circle,#fff3a6,#ff8a1a 60%,#c2301a);border-radius:50% 50% 50% 0;transform:rotate(-45deg)}
.v4p.bleed{background:linear-gradient(#ff6a6a,#a31717);border-radius:50% 50% 50% 50%/60% 60% 40% 40%}
.v4p.slow{background:none;color:#bfeaff;text-shadow:0 0 6px #6cc8ff;border-radius:0}
.v4p.drain{background:radial-gradient(circle,#f0c8ff,#8a46d8);box-shadow:0 0 8px #b36bff}
.v4p.heal{background:none;color:#7dffb0;text-shadow:0 0 6px #2fe08a;border-radius:0}
.v4p.spark{background:radial-gradient(circle,#fff,#ffd84d 60%,transparent)}
.v4p.chip{background:#c9d6e4;border-radius:2px}
@keyframes v4pt{0%{opacity:1;transform:translate(0,0) scale(1)}100%{opacity:0;transform:translate(var(--dx,0),var(--dy,-40px)) scale(.4)}}
.v4sl{position:absolute;width:150px;height:150px;margin:-75px 0 0 -75px;z-index:5;pointer-events:none;border-radius:50%;background:conic-gradient(from 200deg,transparent 0 55%,#fff 62%,#9fe6ff 70%,transparent 78%);animation:v4slash .28s ease-out forwards}
.v4sl.big{width:210px;height:210px;margin:-105px 0 0 -105px;background:conic-gradient(from 190deg,transparent 0 45%,#fff3a6 56%,#ff8a1a 68%,transparent 80%)}
@keyframes v4slash{0%{opacity:0;transform:rotate(-70deg) scale(.6)}30%{opacity:1}100%{opacity:0;transform:rotate(40deg) scale(1.15)}}
.v4shk{animation:v4sk .25s linear}
@keyframes v4sk{0%,100%{transform:translate(0,0)}20%{transform:translate(-4px,3px)}40%{transform:translate(4px,-3px)}60%{transform:translate(-3px,-2px)}80%{transform:translate(3px,2px)}}
.v4red:after{content:'';position:absolute;inset:0;z-index:8;pointer-events:none;box-shadow:inset 0 0 60px 18px #e01a1acc;animation:v4rd .35s ease-out forwards}
@keyframes v4rd{from{opacity:1}to{opacity:0}}
.v4tele:after{content:'';position:absolute;inset:0;z-index:8;pointer-events:none;box-shadow:inset 0 0 50px 10px #ff3a1acc;animation:v4tl .35s ease-in-out infinite alternate}
@keyframes v4tl{from{opacity:.25}to{opacity:1}}
.s-fight .fx.crit{font-size:34px!important;color:#ffd84d!important;text-shadow:0 0 10px #ff8a1a,0 2px 3px #000}
#eo.v4focus{filter:drop-shadow(0 0 10px #ffd84d)}
#eo.v4elunge{animation:v4el .3s ease-out}
@keyframes v4el{0%{transform:translateY(0) scale(1)}40%{transform:translateY(34px) scale(1.12)}100%{transform:none}}
.v4ghost{position:fixed;z-index:80;pointer-events:none;animation:v4dis .85s ease-out forwards}
@keyframes v4dis{0%{opacity:1;filter:brightness(1)}25%{filter:brightness(3) saturate(0);transform:scale(1.08)}100%{opacity:0;filter:brightness(2) blur(8px);transform:scale(1.5) translateY(-30px)}}
.v4coin{position:fixed;z-index:81;width:10px;height:10px;border-radius:50%;background:radial-gradient(circle,#fff6b0,#ffb02a);pointer-events:none;animation:v4pt .9s ease-out forwards}
.v4ban{position:absolute;left:0;right:0;top:34%;text-align:center;z-index:9;font-size:28px;font-weight:900;color:#ffd84d;text-shadow:0 0 12px #ff8a1a,0 3px 4px #000;pointer-events:none;animation:v4up .9s ease-out forwards}
`;
document.head.appendChild(ste);
Object.assign(SFX,{
 shoo:()=>{tone(950,.1,'triangle',.05,-520);tone(700,.13,'triangle',.04,-380,.07)},
 poison:()=>{tone(320,.1,'sine',.05,260);tone(420,.1,'sine',.04,180,.07)},
 burn:()=>{tone(110,.22,'sawtooth',.05,-20);tone(240,.1,'square',.03,60,.06)},
 bleed:()=>tone(190,.12,'triangle',.05,-110),
 slow:()=>tone(950,.28,'sine',.05,-520),
 guard:()=>seq([660,990],'triangle',.12,.06),
 focus:()=>tone(1400,.3,'sine',.05,380),
 tele:()=>{tone(90,.55,'sawtooth',.07,50);tone(180,.4,'square',.03,0,.1)},
 drain:()=>{tone(520,.22,'sine',.05,-320);tone(260,.2,'sine',.04,200,.12)},
 slash:()=>{tone(700,.07,'sawtooth',.06,-500);tone(160,.1,'square',.05,-60,.03)},
 power:()=>{tone(220,.18,'sawtooth',.08,-140);tone(880,.14,'square',.06,-400,.04)}
});
const stgPos=el=>{const s=$('stg'),r=el.getBoundingClientRect(),q=s.getBoundingClientRect();return[r.left-q.left+r.width/2,r.top-q.top+r.height/2]};
V4.spawn=(cls,x,y,n,o)=>{
  const L2=$('v4fxl');if(!L2)return;o=o||{};
  for(let i=0;i<n;i++){const p=document.createElement('i');p.className='v4p '+cls;const sz=o.sz||(6+Math.random()*7);
    p.style.cssText='left:'+(x+(Math.random()-.5)*(o.sx||40))+'px;top:'+(y+(Math.random()-.5)*(o.sy||20))+'px;width:'+sz+'px;height:'+sz+'px;--dx:'+((Math.random()-.5)*(o.dx||50))+'px;--dy:'+(o.dy!=null?o.dy+Math.random()*-20:-30-Math.random()*40)+'px;--d:'+(o.d||(.6+Math.random()*.5))+'s';
    if(o.txt){p.textContent=o.txt;p.style.fontSize='14px';p.style.width='auto';p.style.height='auto'}
    L2.appendChild(p);setTimeout(()=>p.remove(),1400)}
};
V4.vfx=(kind,side)=>{
  const av=document.querySelector('.v4av'),eo=$('eo');if(!av||!$('v4fxl'))return;
  const [hx,hy]=stgPos(av),[ex,ey]=eo?stgPos(eo):[hx+120,hy-60];
  if(kind==='poison')V4.spawn('psn',hx,hy+10,6,{dy:-60});
  else if(kind==='burn')V4.spawn('burn',hx,hy+16,7,{dy:-55,sz:9});
  else if(kind==='bleed')V4.spawn('bleed',hx,hy-6,5,{dy:40,sz:6});
  else if(kind==='slow')V4.spawn('slow',hx,hy-20,5,{dy:35,txt:'❄',dx:60});
  else if(kind==='heal')V4.spawn('heal',hx,hy,6,{dy:-55,txt:'✚',dx:50});
  else if(kind==='block')V4.spawn('spark',hx+20,hy,8,{dy:-20,dx:80,sz:5});
  else if(kind==='drain')V4.spawn('drain',ex,ey,6,{dy:0,dx:20,sz:9});
};
V4.onHit=(crit,type)=>{
  const eo=$('eo'),s=$('stg');if(!eo||!s)return;
  const [ex,ey]=stgPos(eo),pw=V4._pow;V4._pow=false;
  const sl=document.createElement('div');sl.className='v4sl'+(pw||crit?' big':'');sl.style.left=ex+'px';sl.style.top=ey+'px';$('v4fxl')&&$('v4fxl').appendChild(sl);setTimeout(()=>sl.remove(),320);
  V4.spawn(crit?'spark':'chip',ex,ey,crit?12:6,{dx:120,dy:-30,sz:crit?6:4,sx:30,sy:30});
  const av=document.querySelector('.v4av');if(av)anim(av,'v4lunge');
  try{SFX.slash()}catch(_){}
  if(crit||pw){anim(s,'v4shk')}
};
V4.onHurt=heavy=>{
  const s=$('stg');if(!s)return;
  s.classList.remove('v4red');void s.offsetWidth;s.classList.add('v4red');setTimeout(()=>s.classList.remove('v4red'),380);
  const av=document.querySelector('.v4av');if(av)anim(av,'v4hurt');
  const eo=$('eo');if(eo)anim(eo,'v4elunge');
  if(heavy)anim(s,'v4shk');
};
{const _fx2=fx;fx=function(t,c,side,crit){
  _fx2.apply(this,arguments);const s=$('stg');if(!s||!$('v4fxl'))return;
  if(side==='foe'&&typeof t==='number')V4.onHit(crit,c);
  else if(side==='me'&&c==='taken')V4.onHurt(String(t).startsWith('HEAVY'));
  else if(side==='me'&&c==='heal')V4.vfx('heal','me');
  else if(side==='me'&&t==='Block!')V4.vfx('block','me');
  if(crit){const l=[...s.children].reverse().find(x=>x.classList&&x.classList.contains('fx'));if(l)l.classList.add('crit')}
}}
{const _pw=power;power=function(){V4._pow=true;try{SFX.power()}catch(_){}const r=_pw.apply(this,arguments);setTimeout(()=>V4._pow=false,50);return r}}
{const _g=guardAct;guardAct=function(){const e=en>=20;const r=_g.apply(this,arguments);if(e){try{SFX.guard()}catch(_){}V4.spawn('spark',...stgPos(document.querySelector('.v4av')||$('stg')),8,{dx:70,dy:-30,sz:5})}return r}}
{const _f=focusAct;focusAct=function(){const e=en>=40;const r=_f.apply(this,arguments);if(e){try{SFX.focus()}catch(_){}const s=$('stg');if(s){const b=document.createElement('div');b.className='v4ban';b.textContent='FOCUSED';s.appendChild(b);setTimeout(()=>b.remove(),900)}}return r}}
V4.chipsKey='';
{const _u=upd;upd=function(){
  _u.apply(this,arguments);
  const ch=$('v4chips');if(!ch)return;
  document.querySelectorAll('.v4ab[data-need]').forEach(b=>b.classList.toggle('off',en<+b.dataset.need));
  const pn=$('v4potn');if(pn)pn.textContent=healCount();
  const list=[];
  if(guardT>0)list.push(['Guard '+guardT.toFixed(1)+'s','#6ec1ff']);
  if(focus)list.push(['Focused','#ffd84d']);
  if(slowT>0)list.push(['Slowed '+Math.ceil(slowT)+'s','#9fe6ff']);
  if(dot.t>0)list.push([dot.k+' '+Math.ceil(dot.t)+'s',dot.k==='Poisoned'?'#7dff6a':dot.k==='Burning'?'#ffb02a':'#ff6a6a']);
  if(mom>1)list.push(['Momentum ×'+mom,'#ffe08a']);
  const k=list.map(x=>x[0]).join('|');
  if(k!==V4.chipsKey){V4.chipsKey=k;ch.innerHTML=list.map(x=>'<span style="--c:'+x[1]+'">'+x[0]+'</span>').join('')}
  const av=document.querySelector('.v4av');
  if(av){av.classList.toggle('guard',guardT>0);av.classList.toggle('slow',slowT>0);av.classList.toggle('psn',dot.t>0&&dot.k==='Poisoned');av.classList.toggle('burn',dot.t>0&&dot.k==='Burning');av.classList.toggle('bleed',dot.t>0&&dot.k==='Bleeding')}
  const eo=$('eo');if(eo)eo.classList.toggle('v4focus',!!focus);
}}
{let pdot=0,pslow=0,ptele=0,tacc=0;
 const _ct=combatTick;combatTick=function(dt){
  _ct.apply(this,arguments);
  if(!fight||!$('v4chips'))return;
  const s=$('stg');
  if(dot.t>0){
    if(!pdot){fx(dot.k+'!','info','me');try{dot.k==='Poisoned'?SFX.poison():dot.k==='Burning'?SFX.burn():SFX.bleed()}catch(_){}}
    tacc+=dt;if(tacc>=.6){tacc=0;V4.vfx(dot.k==='Poisoned'?'poison':dot.k==='Burning'?'burn':'bleed','me');try{dot.k==='Poisoned'?SFX.poison():dot.k==='Burning'?SFX.burn():SFX.bleed()}catch(_){}}
  }else tacc=0;
  pdot=dot.t>0;
  if(slowT>0&&!pslow){fx('Slowed!','info','me');try{SFX.slow()}catch(_){}V4.vfx('slow','me')}
  pslow=slowT>0;
  if(tele>0&&!ptele){try{SFX.tele()}catch(_){}}
  ptele=tele>0;if(s)s.classList.toggle('v4tele',tele>0);
 }}
{const _ea=enemyAttack;enemyAttack=function(h){const f=fight,hp0=f?f.hp:0;_ea.apply(this,arguments);if(fight&&fight===f&&f.ab==='drain'&&f.hp>hp0){V4.vfx('drain','foe');try{SFX.drain()}catch(_){}}}}
{const _fd=foeDown;foeDown=function(){
  const e=$('eo');
  if(e&&fight&&fight.hp<=0&&!fight.dead){
    const r=e.getBoundingClientRect();
    /* Shaman uses its own fixed-footprint dissolve; never create the grey, zooming V4 ghost clone for it. */
    if(!/^Goblin( Shaman| Archer)?$/.test(fight.n)){
      const g=e.cloneNode(true);g.removeAttribute('id');g.className='v4ghost';
      g.style.cssText='left:'+r.left+'px;top:'+r.top+'px;width:'+r.width+'px;height:'+r.height+'px';document.body.appendChild(g);setTimeout(()=>g.remove(),900);
    }
    for(let i=0;i<14;i++){const c=document.createElement('i');c.className='v4coin';c.style.left=(r.left+r.width/2)+'px';c.style.top=(r.top+r.height/2)+'px';c.style.setProperty('--dx',(Math.random()*220-110)+'px');c.style.setProperty('--dy',(Math.random()*-140-20)+'px');document.body.appendChild(c);setTimeout(()=>c.remove(),950)}
  }
  return _fd.apply(this,arguments);
}}
{const _r5=render;render=function(){const r=_r5.apply(this,arguments);$('pane').classList.toggle('v4fighting',S.tab==='fight'&&!!fight);V4.chipsKey='';if(S.tab==='fight'&&fight)upd();return r}}
V4.fightOverlay=()=>{
  const ci=(CB[S.cls]||{}).ico||'hero_face',cn=CLS[S.cls]?CLS[S.cls].n:'Adventurer';
  const ab=(a,need,ic,lab)=>'<button class="v4ab" data-a="'+a+'"'+(need?' data-need="'+need+'"':'')+'>'+ic+'<em>'+lab+'</em>'+(need?'<small>'+need+'</small>':'')+'</button>';
  return '<div class="v4hero"><div class="v4av" id="me">'+icon('spr:'+ci)+'</div><div class="v4hb"><b>'+cn+' · Lv '+L('combat')+'</b><div class="v4b hp"><i id="php"></i><span id="pht"></span></div>'+(maxSh()?'<div class="v4b sh"><i id="psh"></i><span id="psht"></span></div>':'')+'<div class="v4b en"><i id="pen"></i><span id="pent"></span></div><div class="v4b cd"><i id="cdf"></i></div></div></div>'
   +'<div class="v4chips" id="v4chips"></div><div class="v4fxl" id="v4fxl"></div>'
   +'<div class="v4abar">'+ab('power',30,icon('spr:wp_great'),'Power')+ab('guard',20,icon('spr:wp_obsshield'),'Guard')+ab('focus',40,icon('spr:gem_focus'),'Focus')+CAB.btn()+ab('eat',0,icon('spr:basket'),'Eat')+'<button class="v4ab" data-a="potion">'+icon('potion')+'<em>Potion</em><small id="v4potn" style="background:#2fa05a"></small></button>'+(S.dg?'':ab('flee',0,icon('spr:compass'),'Flee'))+'</div>';
};


