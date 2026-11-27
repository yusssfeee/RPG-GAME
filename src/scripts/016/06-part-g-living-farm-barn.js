/* ================= part G · living farm and barn ================= */
const stg2=document.createElement('style');
stg2.textContent=`
 .v4wx{display:flex;align-items:center;gap:9px;border:1px solid #6d9c83;border-radius:13px;padding:8px 11px;margin:5px 0 9px;font-size:12px;background:linear-gradient(110deg,#143b35,#173047 72%,#101d2a);position:relative;overflow:hidden;box-shadow:inset 0 0 0 1px #d8ffe31a,0 3px 12px #0003;min-height:48px}
.v4wx:before{content:'';position:absolute;inset:0;pointer-events:none;opacity:.32;background:radial-gradient(circle at 8% 50%,#fff8,transparent 27%),linear-gradient(90deg,transparent,#b8ffe311,transparent);background-size:100% 100%,200% 100%;animation:wxSheen 6s linear infinite}
.v4wx .g{font-size:25px;line-height:1;filter:drop-shadow(0 2px 3px #0005);z-index:1}.v4wx div{position:relative;z-index:1}.v4wx b{font-size:13px;color:#f8f1d6}.v4wx small{margin-left:auto;color:#ffe19a;font-weight:800;white-space:nowrap;position:relative;z-index:1}
.v4wx.k-clear{border-color:#e7c56d;background:linear-gradient(110deg,#554119,#31523e 75%,#1b3440)}
.v4wx.k-drizzle{border-color:#78c7e9;background:linear-gradient(110deg,#1e536b,#235b5a 75%,#17334a)}
.v4wx.k-mist{border-color:#a6c9cb;background:linear-gradient(110deg,#354e60,#345b58 75%,#1b3445)}
.v4wx.k-breeze{border-color:#8fd49b;background:linear-gradient(110deg,#21543e,#285a55 75%,#17374a)}
@keyframes wxSheen{0%{background-position:0 0,160% 0}100%{background-position:0 0,-160% 0}}
#grid{position:relative;overflow:hidden}
#grid.wx-drizzle:after{content:'';position:absolute;inset:0;z-index:5;pointer-events:none;border-radius:12px;background:repeating-linear-gradient(108deg,transparent 0 22px,#c7edff44 22px 23px),linear-gradient(180deg,#3f9ac21b,#c2eaff05);background-size:100% 100%;animation:wxDrizzle .9s linear infinite}
@keyframes wxDrizzle{to{background-position:-22px 20px}}
#grid.wx-clear:before{content:'';position:absolute;inset:0;z-index:5;pointer-events:none;border-radius:12px;background:radial-gradient(circle at 88% -6%,#ffe99b55,transparent 48%)}
#grid.wx-mist:before{content:'';position:absolute;inset:0;z-index:5;pointer-events:none;border-radius:12px;background:linear-gradient(110deg,transparent,#d9f5e31e,transparent);background-size:200% 100%;animation:wxMist 8s ease-in-out infinite alternate}
@keyframes wxMist{to{background-position:100% 0}}
#grid.wx-breeze:before{content:'';position:absolute;inset:0;z-index:5;pointer-events:none;border-radius:12px;background:repeating-linear-gradient(0deg,transparent 0 34px,#d7f9cf16 34px 35px);animation:wxWind 5s linear infinite}
@keyframes wxWind{to{background-position:0 -35px}}
.v4bar{position:relative;z-index:6;display:flex;gap:7px;margin:2px 0 8px;padding:5px;border:1px solid #d0ae64;border-radius:12px;background:linear-gradient(100deg,#182f26,#253c30);box-shadow:0 3px 9px #0003}
.v4bar .btn{flex:1;min-width:0;padding:9px 5px;font-size:12px;border-radius:9px;white-space:normal;line-height:1.15}
@media(max-width:430px){.v4bar{gap:4px;padding:4px}.v4bar .btn{font-size:10px;padding:8px 3px}}
.v4bd{position:absolute;left:3px;top:3px;display:flex;gap:2px;z-index:4;pointer-events:none}
.v4bd .ic{width:20px;height:20px;filter:drop-shadow(0 1px 2px #000)}
.v4bd .hr{font-size:15px;line-height:20px;text-shadow:0 1px 2px #000}
.v4bd .bang{background:#e03a3a;color:#fff;border:1px solid #fff;border-radius:10px;min-width:18px;height:18px;font:800 12px/16px sans-serif;text-align:center;animation:v4tw 1s infinite}
.plot.pest{box-shadow:0 0 0 3px #e03a3a,0 0 14px #e03a3a!important;animation:v4pst .5s infinite alternate}
@keyframes v4pst{from{transform:translateX(-1px)}to{transform:translateX(1px)}}
.plot.baby .e svg{transform:scale(.62);transform-origin:50% 90%}
.v4crow{position:fixed;z-index:90;width:46px;height:46px;pointer-events:none;animation:v4fly .9s ease-in forwards}
@keyframes v4fly{to{transform:translate(160px,-220px) scale(.4) rotate(25deg);opacity:0}}
#v4si,#v4bi{border:2px solid var(--line);border-radius:12px;background:var(--card);padding:8px 10px;margin:6px 0;font-size:12px}
#v4si .row,#v4bi .row{display:flex;gap:10px;align-items:center}#v4si .ic,#v4bi .hd .ic{width:44px;height:44px;flex:none}
#v4bi .bars{display:grid;grid-template-columns:auto 1fr;gap:3px 8px;align-items:center;margin:6px 0}
#v4bi .mb{height:9px;border-radius:5px;background:#0008;overflow:hidden;border:1px solid #fff3}#v4bi .mb i{display:block;height:100%}
#v4bi .acts{display:flex;flex-wrap:wrap;gap:6px}#v4bi .acts .btn{padding:7px 10px;font-size:12px}
.v4bd .hr{pointer-events:none}
`;
document.head.appendChild(stg2);
const nowMs=()=>Date.now();
/* ---------- weather ---------- */
const WXI={
  clear:['☀️','Clear Skies','Bright light gently speeds crop growth by 8%'],
  drizzle:['🌦️','Gentle Drizzle','Waters growing crops and gives them a small growth boost'],
  mist:['🌫️','Fertile Morning Mist','Keeps pests away and supports steady growth'],
  breeze:['🍃','Warm Garden Breeze','Speeds growth by 5% and reduces crow visits']
};
function wxTick(){
  const t=nowMs();
  if(!S.wx||!WXI[S.wx.k]||!Number.isFinite(Number(S.wx.t1))||t>Number(S.wx.t1)){
    const pool=['clear','clear','clear','drizzle','drizzle','mist','mist','breeze'];
    let k=pool[rnd(0,pool.length-1)];
    if(S.wx&&WXI[S.wx.k]&&k===S.wx.k)k=pool[(pool.indexOf(k)+3)%pool.length]||'clear';
    S.wx={k,t0:t,t1:t+(240+rnd(0,180))*1000};
    if(k==='drizzle'){
      S.plots.forEach(p=>{
        if(p.open&&p.c>=0&&prog(p)<1){
          const remaining=Math.max(0,p.d*1000-(t-p.at));
          if(!p.w){p.w=true;p.at-=Math.min(remaining*.16,12000)}
        }
      });
    }
    note('text',WXI[k][0]+' <b>'+WXI[k][1]+'</b>: '+WXI[k][2]+'.',0,k==='drizzle'?'#86d6ff':k==='clear'?'#ffd778':k==='mist'?'#b9d9e6':'#a4edb4');
    save();
  }
  V4.wx=S.wx;
  const growthMs={clear:85,drizzle:35,mist:62,breeze:52}[S.wx.k]||0;
  if(growthMs)S.plots.forEach(p=>{if(p.open&&p.c>=0&&prog(p)<1)p.at-=growthMs});
}/* ---------- crop stage sprites ---------- */
V4.stageIcon=(p,g)=>{
  const ic=CROPS[p.c].ic;if(!ic||!ic.startsWith('spr:'))return g<.5?'sprout':'leaf';
  const key=ic.slice(4),st=g<.34?1:g<.7?2:3,n='g'+st+':'+key;
  if(!P[n]){const sc=[0,.34,.56,.8][st],f=['','grayscale(.5) brightness(.7)','saturate(.75) brightness(.85)','brightness(.95)'][st];
    P[n]=()=>'<g transform="translate(32 60) scale('+sc+') translate(-32 -60)">'+P[ic]().replace('/>',' style="filter:'+f+'"/>')+'</g>'}
  return n;
};
/* ---------- farm: pests, badges, seed info ---------- */
V4.nextPest=nowMs()+100000;
const scareF=()=>Math.max(.2,1-.35*Math.min(1,inv('scarecrow_i'))-.12*Math.min(2,inv('fence'))-.06*(S.up.scare||0));
P['bird:dark']=spf('m_bird','brightness(.3) contrast(1.3)');
function pestTick(){
  const t=nowMs();
  S.plots.forEach((p,i)=>{
    if(!(p.open&&p.c>=0&&p.pest))return;
    if(prog(p)<1)p.at+=1000;
    if(t>p.pestEnd){const n=CROPS[p.c].n;p.c=-1;p.pest=false;note('text','🐦 Crows ate your <b>'+n+'</b>! Tap infested plots quickly.',0,'#ff8a7a');try{SFX.err()}catch(_){}save();if(S.tab==='farm')render()}
  });
  if(t>V4.nextPest){
    const c=S.plots.filter(p=>p.open&&p.c>=0&&!p.pest&&prog(p)<.9);
    const wx=S.wx&&S.wx.k,wxRisk=wx==='mist'?.38:wx==='breeze'?.68:1;if(c.length&&Math.random()<scareF()*wxRisk){const p=c[rnd(0,c.length-1)];p.pest=true;p.pestEnd=t+75000;note('text','🐦 <b>Crows</b> are attacking a '+CROPS[p.c].n+' plot! Tap it to shoo them.',0,'#ff8a7a')}
    V4.nextPest=t+(130+rnd(0,130))*1000*(wx==='mist'?1.9:wx==='breeze'?1.4:1);
  }
}
function shooCrow(el,i){
  const p=S.plots[i];p.pest=false;
  const r=el.getBoundingClientRect(),c=document.createElement('div');c.className='v4crow';c.innerHTML=icon('bird:dark');c.style.left=(r.left+r.width/2-23)+'px';c.style.top=(r.top+r.height/2-23)+'px';document.body.appendChild(c);setTimeout(()=>c.remove(),950);
  addXp('farm',2);try{SFX.shoo()}catch(_){}save();farmSync();
}
document.addEventListener('click',e=>{
  const b=e.target.closest&&e.target.closest('#grid .plot');if(!b)return;
  const i=[...b.parentNode.children].indexOf(b),p=S.plots[i];
  if(p&&p.pest){e.stopImmediatePropagation();e.preventDefault();shooCrow(b,i)}
},true);
function badge(el){let d=el.querySelector('.v4bd');if(!d){d=document.createElement('span');d.className='v4bd';el.appendChild(d)}return d}
let fkey='';
function farmSync(){
  const g=$('grid');if(!g||S.tab!=='farm')return;
  ['clear','drizzle','mist','breeze'].forEach(k=>g.classList.toggle('wx-'+k,!!S.wx&&S.wx.k===k));
  [...g.children].forEach((el,i)=>{const p=S.plots[i];if(!p)return;
    el.classList.toggle('pest',!!(p.open&&p.c>=0&&p.pest));
    const d=badge(el);const h=(p.open&&p.c>=0&&p.pest?icon('bird:dark'):'')+(p.open&&p.c>=0&&p.w&&prog(p)<1?'<span class="hr" style="color:#6ec1ff">💧</span>':'');
    if(d._h!==h){d._h=h;d.innerHTML=h}});
  const w=$('v4wx');if(w&&S.wx){const left=fmt((S.wx.t1-nowMs())/1000),k=S.wx.k;w.className='v4wx k-'+k;w.innerHTML='<span class="g">'+WXI[k][0]+'</span><div><b>'+WXI[k][1]+'</b><br><span style="color:var(--mute)">'+WXI[k][2]+'</span></div><small>'+left+'</small>'}
  const si=$('v4si'),c=CROPS[S.sel];
  if(si&&c){const gt=Math.round(c.t*Math.max(.2,1-farmGrow()-.08*S.up.can));const key=c.n+L('farm')+S.up.can+S.coins;const html='<div class="row">'+icon(c.ic)+'<div><b>'+c.n+'</b> · needs Farming '+c.l+'<br>Grows in ~'+gt+'s · '+(c.give?'gives '+c.q+' '+nm(c.give):'sells for '+c.sell+' coins')+' · +'+c.xp+' XP · seed '+c.cost+' coins<br><span style="color:var(--mute)">Scarecrows and fences from the Carpenter keep crows away'+(scareF()<1?' (crow risk now '+Math.round(scareF()*100)+'%)':'')+'.</span></div></div>';if(si._k!==html){si._k=html;si.innerHTML=html}}
}
{
  const seeds=$('seeds'),grid=$('grid');
  if(seeds&&!$('v4wx')){const w=document.createElement('div');w.id='v4wx';w.className='v4wx';seeds.parentNode.insertBefore(w,seeds)}
  if(seeds&&!$('v4si')){const d=document.createElement('div');d.id='v4si';seeds.parentNode.insertBefore(d,seeds.nextSibling)}
  const fbar=$('v4fbar');if(fbar&&!fbar.querySelector('[data-q="shoo"]')){fbar.insertAdjacentHTML('beforeend','<button class="btn alt" data-q="shoo">Shoo crows</button>');fbar.addEventListener('click',e=>{if(e.target.closest('[data-q="shoo"]')){let n=0;S.plots.forEach((p,i)=>{if(p.pest){shooCrow($('grid').children[i],i);n++}});if(!n)say('No crows around.')}})}
  const sync=()=>{const on=S.tab==='farm';['v4wx','v4si'].forEach(id=>{const e=$(id);if(e)e.style.display=on?'':'none'})};
  V4.farmSyncShow=sync;
}

/* ---------- barn: mood, hunger, sickness, foxes, breeding ---------- */
const aInfo=p=>ANI[p.t];
function bInit(p){if(p.m==null){p.m=70;p.fe=nowMs()+240000;p.pet=0}}
const hungry=p=>nowMs()>p.fe;
V4.nextFox=nowMs()+150000;
const foxF=()=>Math.max(.2,1-.22*Math.min(2,inv('fence'))-.2*Math.min(1,inv('gate'))-.06*(S.up.scare||0));
function barnTick(){
  const t=nowMs();
  S.barn.forEach((p,i)=>{if(!p)return;bInit(p);
    const stuck=hungry(p)||p.sick||p.fox;
    if(stuck&&aProg(p)<1)p.at+=1000;
    p.m=Math.max(0,Math.min(100,p.m-(hungry(p)?.35:.06)));
    if(hungry(p)&&!V4.seen.has('h'+i+':'+p.fe)){V4.seen.add('h'+i+':'+p.fe);if(i<cap())note('text','🌾 <b>'+aInfo(p).n+'</b> is hungry. Feed it in the Barn.',0,'#ffd778')}
    if(!p.sick&&p.m<25&&Math.random()<.015){p.sick=true;note('text','🤒 <b>'+aInfo(p).n+'</b> fell sick. A Healing Herb will cure it.',0,'#ff8a7a')}
    if(p.fox&&t>p.foxEnd){p.fox=false;p.m=Math.max(0,p.m-35);note('text','🦊 The fox scared your <b>'+aInfo(p).n+'</b>!',0,'#ff8a7a');try{SFX.err()}catch(_){}}
  });
  if(t>V4.nextFox){
    const c=S.barn.map((p,i)=>p&&i<cap()&&!p.fox&&!p.baby?i:-1).filter(i=>i>=0);
    if(c.length>=2&&Math.random()<foxF()){const i=c[rnd(0,c.length-1)],p=S.barn[i];p.fox=true;p.foxEnd=t+60000;note('text','🦊 A <b>fox</b> is sneaking up on your '+aInfo(p).n+'! Tap the stall to scare it away.',0,'#ff8a7a')}
    V4.nextFox=t+(160+rnd(0,160))*1000;
  }
}
const moodCol=m=>m>=70?'#7dff6a':m>=40?'#ffd84d':'#ff6a6a';
function barnSync(){
  const g=$('bgrid');if(!g||S.tab!=='barn')return;
  [...g.children].forEach((el,i)=>{const p=S.barn[i];if(!p||i>=cap()){const d=el.querySelector('.v4bd');if(d)d.innerHTML='';el.classList.remove('baby','pest');return}
    bInit(p);el.classList.toggle('baby',!!p.baby);el.classList.toggle('pest',!!p.fox);el.classList.toggle('on',S.bsel===i);
    const h='<span class="hr" style="color:'+moodCol(p.m)+'">♥</span>'+(hungry(p)?'<span class="hr">🌾</span>':'')+(p.sick?'<span class="hr">🤒</span>':'')+(p.fox?'<span class="bang">!</span>':'');
    const d=badge(el);if(d._h!==h){d._h=h;d.innerHTML=h}});
  const bi=$('v4bi');if(!bi)return;
  const p=S.barn[S.bsel];
  if(!p||S.bsel>=cap()){const k='none'+S.barn.filter(Boolean).length;if(bi._k!==k){bi._k=k;bi.innerHTML='<b>Barn</b> · '+S.barn.filter(Boolean).length+' animals. Tap a stall to buy or select an animal, then care for it here. Happy animals give bonus produce.'}return}
  const a=aInfo(p),left=Math.max(0,Math.ceil(p.d*(1-aProg(p)))),hl=Math.max(0,Math.round((p.fe-nowMs())/1000));
  const stat=p.baby?'Baby · grows up in '+fmt(left):p.sick?'Sick — produces nothing':p.fox?'Fox nearby! Scare it away':hungry(p)?'Hungry — production paused':aProg(p)>=1?'Ready to collect!':'Next produce in '+fmt(left);
  const pairs=S.barn.filter((q,j)=>q&&q.t===p.t&&j<cap()).length,free=S.barn.findIndex((q,j)=>!q&&j<cap());
  const key=[S.bsel,p.t,Math.floor(p.m/5),hungry(p),p.sick,p.fox,p.baby,stat,hl>>3,inv('hay'),inv('herb'),pairs,free].join('|');
  if(bi._k===key)return;bi._k=key;
  bi.innerHTML='<div class="row hd">'+mon(ANIART[a.id],'ic')+'<div style="flex:1"><b>'+a.n+(p.baby?' (baby)':'')+'</b><br>'+stat+'</div></div>'
   +'<div class="bars"><span>Mood</span><div class="mb"><i style="width:'+p.m+'%;background:'+moodCol(p.m)+'"></i></div><span>Fed</span><div class="mb"><i style="width:'+Math.min(100,hl/2.4)+'%;background:#d9a85a"></i></div></div>'
   +'<div class="acts"><button class="btn alt" data-v4b="feed">Feed ('+(inv('hay')>0?'1 hay':'3 coins')+')</button><button class="btn alt" data-v4b="pet">Pet</button>'
   +(p.sick?'<button class="btn" data-v4b="cure">Cure (1 herb)</button>':'')+(p.fox?'<button class="btn" data-v4b="shoo">Scare fox</button>':'')
   +(!p.baby&&pairs>=2&&free>=0?'<button class="btn alt" data-v4b="breed">Breed ('+Math.ceil(a.cost*.5)+' coins + 2 hay)</button>':'')
   +'<button class="btn alt" data-v4b="sell">Sell ('+Math.floor(a.cost*.5)+')</button></div>';
}
{
  const bgrid=$('bgrid'),bbar=$('v4bbar');
  if(bbar&&!$('v4bi')){const d=document.createElement('div');d.id='v4bi';bbar.parentNode.insertBefore(d,bbar.nextSibling)}
  document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('#bgrid .plot');if(!b)return;
    const i=[...b.parentNode.children].indexOf(b),p=S.barn[i];S.bsel=i;
    if(p&&p.fox&&i<cap()){e.stopImmediatePropagation();e.preventDefault();p.fox=false;addXp('barn',3);try{SFX.shoo()}catch(_){}note('text','🦊 You scared the fox away from your <b>'+aInfo(p).n+'</b>.',0,'#7dffb0');save();barnSync();return}
    setTimeout(barnSync,30)},true);
  const _ts=tapStall;
  tapStall=function(i){
    const p=S.barn[i];
    if(p&&i<cap()&&p.baby){if(aProg(p)>=1){p.baby=false;p.at=nowMs();p.d=aDur(aInfo(p));note('text','🐣 Your baby <b>'+aInfo(p).n+'</b> grew up!',0,'#7dffb0');save();render();return}say('The baby is still growing.');return}
    const ready=p&&i<cap()&&aProg(p)>=1&&!p.sick&&!hungry(p);
    if(p&&i<cap()&&aProg(p)>=1&&(p.sick||hungry(p))){say('Feed or cure the animal before collecting.');try{SFX.err()}catch(_){}return}
    const m=p?p.m:0;
    _ts(i);
    if(ready&&m>=80&&Math.random()<.3){const id=aInfo(p).give[0];S.inv[id]=inv(id)+1;note('text','💛 A happy animal gave a bonus item.',0,'#ffd778')}
  };
  const act=a=>{const p=S.barn[S.bsel];if(!p)return;bInit(p);const n=aInfo(p).n;
    if(a==='feed'){if(inv('hay')>0)S.inv.hay=inv('hay')-1;else if(S.coins>=3)S.coins-=3;else{say('You need 1 hay or 3 coins.');return}
      p.fe=Math.max(nowMs(),p.fe)+240000;p.fe=Math.min(p.fe,nowMs()+480000);p.m=Math.min(100,p.m+8);try{SFX.eat()}catch(_){}}
    else if(a==='pet'){if(nowMs()-p.pet<15000){say('Give it a moment before petting again.');return}p.pet=nowMs();p.m=Math.min(100,p.m+12);try{SFX.coin()}catch(_){}
      const el=$('bgrid').children[S.bsel];if(el){const c=document.createElement('i');c.className='v4sprk';c.textContent='♥';c.style.cssText='left:40%;top:30%;color:#ff6a8a;--dx:0px;--dy:-30px';el.appendChild(c);setTimeout(()=>c.remove(),700)}}
    else if(a==='cure'){if(inv('herb')<1){say('You need a Healing Herb.');return}S.inv.herb=inv('herb')-1;p.sick=false;p.m=Math.min(100,p.m+15);try{SFX.win()}catch(_){}}
    else if(a==='shoo'){p.fox=false}
    else if(a==='breed'){const an=aInfo(p),free=S.barn.findIndex((q,j)=>!q&&j<cap()),c=Math.ceil(an.cost*.5);
      if(inv('hay')<2||S.coins<c){say('Breeding needs '+c+' coins and 2 hay.');try{SFX.err()}catch(_){}return}
      if(nowMs()<(S.bbr||0)){say('Wait '+fmt(((S.bbr||0)-nowMs())/1000)+' before breeding again.');return}
      S.inv.hay=inv('hay')-2;S.coins-=c;S.bbr=nowMs()+60000;S.barn[free]={t:p.t,at:nowMs(),d:aDur(an)*1.4,baby:true,m:80,fe:nowMs()+240000,pet:0};note('text','🐣 A baby <b>'+an.n+'</b> was born!',0,'#7dffb0');try{SFX.win()}catch(_){}}
    else if(a==='sell'){const an=aInfo(p);S.coins+=Math.floor(an.cost*.5);S.barn[S.bsel]=null;say('Sold the '+an.n+'.')}
    save();render();barnSync();
  };
  const bi=$('v4bi');bi&&bi.addEventListener('click',e=>{const b=e.target.closest('[data-v4b]');if(b)act(b.dataset.v4b)});
}
/* ---------- tickers + hooks ---------- */
setInterval(()=>{if(!$('intro').hidden||document.getElementById('v4cls'))return;wxTick();pestTick();barnTick();farmSync();barnSync();V4.farmSyncShow()},1000);
{const _r6=render;render=function(){const r=_r6.apply(this,arguments);farmSync();barnSync();V4.farmSyncShow();return r}}


