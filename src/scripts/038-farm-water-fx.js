
/* Watering effect, variant: drops  (rain | mist | shower | drops). Visuals are DOM/CSS, sound is synthesised with Web Audio (no files). */
(()=>{'use strict';
 const VARIANT='drops';
 const $=id=>document.getElementById(id);
 const fxScale=()=>document.documentElement.dataset.device==='mobile'?0.78:1;
 const reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches&&document.documentElement.dataset.device!=='mobile';
 const layer=document.createElement('div');layer.id='wf-layer';document.body.appendChild(layer);
  /* The layer stays on <body> (a farm re-render must not destroy it) but is
     sized and moved onto the plot grid, and clipped to it. */
  const syncLayer=()=>{
    const g=document.getElementById('grid');if(!g)return;
    const r=g.getBoundingClientRect();
    layer.style.width=r.width+'px';layer.style.height=r.height+'px';
    const k=fxScale();layer.style.transform='translate('+r.left+'px,'+r.top+'px) scale('+k+')';
  };
  addEventListener('scroll',syncLayer,{passive:true});
  addEventListener('resize',syncLayer,{passive:true});
 const rnd=(a,b)=>a+Math.random()*(b-a);
 const fail=e=>{(window.__wfErr=window.__wfErr||[]).push(String(e&&e.stack||e))};
 const el=(cls,css,html)=>{const e=document.createElement('div');e.className=cls;if(css)e.style.cssText=css;if(html)e.innerHTML=html;layer.appendChild(e);return e};
 const kill=(nodes,ms)=>setTimeout(()=>nodes.forEach(n=>n.remove()),ms);

 /* ================= SOUND (shared engine; every sound goes through RPGAudio's master + limiter) ================= */
 const RA=window.RPGAudio;
 let ctx=null,master=null,verbIn=null,B=null;
 const useCtx=(c,dest)=>{
   if(ctx===c&&master===dest&&verbIn&&B)return c;
   ctx=c;master=dest;
   B={w:RA.noiseBuf('white',c),p:RA.noiseBuf('pink',c),b:RA.noiseBuf('brown',c)};
   // small soft room: short decaying stereo noise, darkened so the tail sounds like air and never like hiss
   const len=Math.floor(c.sampleRate*.5),ir=c.createBuffer(2,len,c.sampleRate);
   for(let ch=0;ch<2;ch++){const d=ir.getChannelData(ch);let y=0;for(let i=0;i<len;i++){y+=.12*((Math.random()*2-1)-y);d[i]=y*3.2*Math.pow(1-i/len,3.2)}}   // one-pole low-passed: a soft, dark room tail
   const verb=c.createConvolver();verb.buffer=ir;verbIn=c.createGain();verbIn.gain.value=1;
   const dark=c.createBiquadFilter();dark.type='lowpass';dark.frequency.value=2800;
   verbIn.connect(verb);verb.connect(dark);dark.connect(master);
   return c};
 const audio=()=>{try{const c=RA.ready();return c?useCtx(c,RA.out()):null}catch(e){fail(e);return null}};
 // every sound goes through a panner, plus a small reverb send for air
 const bus=(pan,send)=>{const g=ctx.createGain(),sg=ctx.createGain();sg.gain.value=send;
   if(ctx.createStereoPanner){const p=ctx.createStereoPanner();p.pan.value=Math.max(-.8,Math.min(.8,pan));g.connect(p);p.connect(master);p.connect(sg)}else{g.connect(master);g.connect(sg)}
   sg.connect(verbIn);return g};
 const nz=(kind,t,len,off)=>{const s=ctx.createBufferSource();s.buffer=B[kind];s.loop=true;s.start(t,off===undefined?Math.random()*2:off);s.stop(t+len+.05);return s};
 const env=(g,t,len,v,a,r)=>{g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(Math.max(.0002,v),t+a);g.gain.setValueAtTime(Math.max(.0002,v),t+Math.max(a,len-r));g.gain.exponentialRampToValueAtTime(.0001,t+len)};
 /* continuous noise layer: kind, band (hp/lp), level, flutter (rate/depth).
    The flutter runs on its own gain stage that can never go below zero (before it was added straight onto the envelope: crackle at start/end). */
 const layerN=(out,kind,t,len,v,hp,lp,fl,fd,a,r)=>{
   const s=nz(kind,t,len),h=ctx.createBiquadFilter(),l=ctx.createBiquadFilter(),fg=ctx.createGain(),g=ctx.createGain();
   h.type='highpass';h.frequency.value=hp;l.type='lowpass';l.frequency.value=lp;env(g,t,len,v,a||.25,r||.5);
   s.connect(h).connect(l).connect(fg).connect(g).connect(out);
   if(fl){const d=Math.min(.9,fd||.3);fg.gain.value=1-d/2;
     const o=ctx.createOscillator(),og=ctx.createGain();o.type='sine';o.frequency.value=fl;og.gain.value=d/2;o.connect(og).connect(fg.gain);o.start(t);o.stop(t+len+.05)}
 };
 /* one drop hitting wet soil: noise tick + tiny soft "pat" */
 const tick=(out,t,v,lo,hi)=>{const s=nz('w',t,.05),f=ctx.createBiquadFilter(),g=ctx.createGain();
   f.type='bandpass';f.frequency.value=rnd(lo||2400,hi||6800);f.Q.value=rnd(1.8,3.4);
   g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+.002);g.gain.exponentialRampToValueAtTime(.0001,t+rnd(.02,.045));
   s.connect(f).connect(g).connect(out)};
 const pat=(out,t,v)=>{const o=ctx.createOscillator(),g=ctx.createGain();o.type='sine';o.frequency.setValueAtTime(rnd(190,260),t);o.frequency.exponentialRampToValueAtTime(90,t+.05);
   g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+.004);g.gain.exponentialRampToValueAtTime(.0001,t+.07);o.connect(g).connect(out);o.start(t);o.stop(t+.08)};
 /* water-drop "bloop": a bubble resonance rising in pitch, with a soft second partial */
 const bloop=(out,t,f,v)=>{[1,2.01].forEach((m,i)=>{const o=ctx.createOscillator(),g=ctx.createGain();o.type='sine';
   o.frequency.setValueAtTime(f*m,t);o.frequency.exponentialRampToValueAtTime(f*m*rnd(1.6,2.1),t+.07);
   g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v/(i?3.5:1),t+.006);g.gain.exponentialRampToValueAtTime(.0001,t+(i?.08:.16));
   o.connect(g).connect(out);o.start(t);o.stop(t+.18)})};
 const shimmer=(out,t,v)=>{const o=ctx.createOscillator(),g=ctx.createGain();o.type='sine';o.frequency.value=rnd(2800,4200);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+.01);g.gain.exponentialRampToValueAtTime(.0001,t+.28);o.connect(g).connect(out);o.start(t);o.stop(t+.3)};

/* ---- watering sound v3: "trickle" ----
    Real water is thousands of tiny bubbles. Here a soft stream is built from many short, quiet, randomly pitched
    sine bubbles (no noise generator at all, so no hiss), and each drop that lands on the soil adds a muted thud. */
 const bubble=(dest,t,f,v)=>{
   const o=ctx.createOscillator(),g=ctx.createGain(),d=.022+.05*Math.sqrt(500/f);
   o.type='sine';o.frequency.setValueAtTime(f,t);o.frequency.exponentialRampToValueAtTime(f*1.55,t+d*.8);
   g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(Math.max(.0002,v),t+.006);g.gain.exponentialRampToValueAtTime(.0001,t+d);
   o.connect(g).connect(dest);o.start(t);o.stop(t+d+.02)};
 const trickle=(out,t,len,soft)=>{
   const lp=ctx.createBiquadFilter(),g=ctx.createGain();lp.type='lowpass';lp.frequency.value=1900;lp.Q.value=.3;g.gain.value=1;lp.connect(g).connect(out);
   const n=Math.round(len*42);
   for(let i=0;i<n;i++){
     const x=rnd(0,1),tt=t+x*len,env=Math.min(1,x*len/.3)*Math.min(1,(len-x*len)/.5);     // swell in, tail out
     bubble(lp,tt,360*Math.pow(4.2,Math.pow(rnd(0,1),1.5)),.05*soft*env*rnd(.35,1));
   }};
 const thump=(out,t,v)=>{                                    // a drop reaching damp soil: muted, round, low
   const o=ctx.createOscillator(),g=ctx.createGain(),lp=ctx.createBiquadFilter();
   o.type='sine';o.frequency.setValueAtTime(170,t);o.frequency.exponentialRampToValueAtTime(85,t+.13);
   lp.type='lowpass';lp.frequency.value=500;
   g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(Math.max(.0002,v),t+.01);g.gain.exponentialRampToValueAtTime(.0001,t+.16);
   o.connect(lp).connect(g).connect(out);o.start(t);o.stop(t+.2)};

/* ---- watering sound v4: "bamboo fountain" ---- */
 const BAMBOO=[392,440,494,587,659];
 const tok=(out,t,f,v)=>{                                    // hollow bamboo knock: soft, woody, short
   [[1,1,.2],[2.4,.14,.07]].forEach(([m,a,d])=>{
     const o=ctx.createOscillator(),g=ctx.createGain(),lp=ctx.createBiquadFilter();
     o.type='sine';o.frequency.setValueAtTime(f*m*1.04,t);o.frequency.exponentialRampToValueAtTime(f*m,t+.03);
     lp.type='lowpass';lp.frequency.value=1800;lp.Q.value=.3;
     g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(Math.max(.0002,v*a),t+.006);g.gain.exponentialRampToValueAtTime(.0001,t+d);
     o.connect(lp).connect(g).connect(out);o.start(t);o.stop(t+d+.02)})};
 const rill=(out,t,len,soft)=>{                              // sparse, quiet trickle running into the bamboo
   const lp=ctx.createBiquadFilter();lp.type='lowpass';lp.frequency.value=1500;lp.Q.value=.3;lp.connect(out);
   const n=Math.round(len*13);
   for(let i=0;i<n;i++){const x=rnd(0,1),env=Math.min(1,x*len/.3)*Math.min(1,(len-x*len)/.5);bubble(lp,t+x*len,420*Math.pow(3.2,Math.pow(rnd(0,1),1.4)),.05*soft*env*rnd(.4,1))}};

 const SOUND={
   rain(out,t,k,soft,plan){const len=2.0;
     layerN(out,'p',t,len,.2*soft,700,6200,.8,.25,.3,.6);
     layerN(out,'w',t,len,.03*soft,3800,9500,11,.35,.3,.6);
     const n=k>5?14:70;for(let i=0;i<n;i++)tick(out,t+.1+Math.random()*(len-.4),rnd(.02,.05)*soft,2200,7000);
     for(let i=0;i<(k>5?2:7);i++)bloop(out,t+.3+Math.random()*1.4,rnd(900,2100),rnd(.05,.09)*soft);
   },
   mist(out,t,k,soft,plan){const len=1.8;
     layerN(out,'w',t,len,.06*soft,3200,9800,7.5,.5,.12,.5);
     layerN(out,'p',t,len,.1*soft,1500,5200,.9,.2,.25,.6);
     const n=k>5?10:34;for(let i=0;i<n;i++)tick(out,t+.15+Math.random()*(len-.5),rnd(.015,.04)*soft,4200,9000);
     if(k<4){bloop(out,t+1.45,rnd(1500,2200),.05);shimmer(out,t+1.1,.01)}
   },
   shower(out,t,k,soft,plan){const len=1.6;
     layerN(out,'b',t,len,.45*soft,60,1100,1.4,.3,.15,.5);
     layerN(out,'p',t,len,.2*soft,1100,7000,2,.3,.15,.5);
     layerN(out,'w',t,len,.035*soft,4200,10000,13,.4,.15,.5);
     const n=k>5?24:110;for(let i=0;i<n;i++)tick(out,t+.08+Math.random()*(len-.3),rnd(.025,.07)*soft,1800,6800);
     for(let i=0;i<(k>5?4:16);i++)pat(out,t+.1+Math.random()*(len-.3),rnd(.03,.07)*soft);
   },
   /* Gentle watering (v2): a soft, dark "pour" swell + a few clean round water drops.
      Everything stays below ~1.6 kHz and is sine-based, so there is no hiss, no clicks and no sparkle. */
   drops(out,t,k,soft,plan){
     if(plan.bed||plan.pour)rill(out,t,Math.min(plan.len+.2,2.0),soft);
     plan.snd.forEach((h,i)=>{tok(out,t+h,BAMBOO[(i*3+k)%BAMBOO.length]*rnd(.99,1.01),.085*soft*(1-i*.03));bubble(out,t+h+.02,rnd(700,1100),.04*soft)});
   }
 };
 function sound(delay,k,pan,plan){
   RA.run(()=>{try{const c=audio();if(!c)return;
     // "Water all" on a full farm: the first three plots get the full sound, the rest only a few quiet drops, so it stays clean
     const snd=k<3?plan.hits:(k<9?plan.hits.filter((_,i)=>i%2===0):[]);
     if(!snd.length&&VARIANT==='drops')return;
     const out=bus(pan,VARIANT==='drops'?.1:VARIANT==='shower'?.16:.24);
     SOUND[VARIANT](out,c.currentTime+delay,k,k>2?.55:1,Object.assign({},plan,{snd,bed:k<3,pour:k<3}))}catch(e){fail(e)}})
 }

 /* ================= VISUALS ================= */
 const ringAt=(add,x,y,w,dl,len)=>add('wf-ring','left:'+x+'px;top:'+y+'px;width:'+w+'px;height:'+(w*.4)+'px;--dl:'+dl+'s;--len:'+(len||.9)+'s');
 const arcAt=(add,x,y,n,dl,spread,h)=>{for(let i=0;i<n;i++){const dir=i%2?1:-1;add('wf-sx','left:'+x+'px;top:'+(y-2)+'px;--dx:'+(dir*rnd(spread*.3,spread))+'px;--dur:'+rnd(.3,.5)+'s;--dl:'+(dl+rnd(0,.05))+'s','<i style="--sz:'+rnd(2.5,4.5)+'px;--h:'+rnd(h*.5,h)+'px"></i>')}};
 const mistAt=(add,x,y,w,hh,dl,len)=>add('wf-mist','left:'+x+'px;top:'+y+'px;width:'+w+'px;height:'+hh+'px;--dl:'+dl+'s;--len:'+(len||1.5)+'s');
 const streak=(add,x,y0,y1,dl,dur,w,h,op,tilt)=>{const dx=(y1-y0)*Math.tan(tilt*Math.PI/180);
   add('wf-rain','left:'+x+'px;top:'+y0+'px;--fall:'+(y1-y0)+'px;--dx:'+dx+'px;--dur:'+dur+'s;--dl:'+dl+'s;--w:'+w+'px;--h:'+h+'px;--op:'+op+';--tilt:'+tilt+'deg');return x+dx};

 const VIS={
   rain(plot,r,k,light,add,plan){                         // fine rain in layers of depth
     const top=r.top-r.height*.1,n=light?9:(k<=3?36:12);
     for(let i=0;i<n;i++){const z=Math.random(),x=r.left+rnd(.02,.98)*r.width,y1=r.top+r.height*rnd(.5,.88),dl=.08+rnd(0,1.35),dur=.62-.26*z;
       const xe=streak(add,x,top+rnd(-5,5),y1,dl,dur,1.2+z*1.5,9+z*11,.4+z*.55,9);
       add('wf-pat','left:'+xe+'px;top:'+y1+'px;--dl:'+(dl+dur*.85)+'s');
       if(i%5===0)arcAt(add,xe,y1,2,dl+dur*.85,8,10)}
     if(k<=3&&!light)[.5,1].forEach(d=>ringAt(add,r.left+r.width/2+rnd(-5,5),r.top+r.height*.72,r.width*(.7+d*.2),.5+d*.4));
     mistAt(add,r.left+r.width/2,r.top+r.height*.7,r.width*1.1,r.width*.7,.4,1.6)},
   mist(plan_plot,r,k,light,add,plan){                    // fine sprinkler spray in pulses, faint rainbow
     const sx=r.left+r.width/2,sy=r.top-r.height*.04,n=light?14:(k<=3?60:18);
     for(let i=0;i<n;i++){const pulse=Math.floor(i/6),ang=rnd(-42,42)*Math.PI/180,trav=r.height*rnd(.55,.95),dl=.1+pulse*.15+rnd(0,.06);
       add('wf-spray','left:'+sx+'px;top:'+sy+'px;--dx:'+(Math.tan(ang)*trav)+'px;--dy:'+trav+'px;--dur:'+rnd(.55,.85)+'s;--dl:'+dl+'s;--sz:'+rnd(1.8,3.4)+'px')}
     mistAt(add,sx,sy+r.height*.25,r.width*1.3,r.height*.9,.2,1.5);mistAt(add,sx,r.top+r.height*.7,r.width*1.1,r.width*.7,.55,1.4);
     if(k<=2&&!light)add('wf-rainbow','left:'+(sx-r.width*.7)+'px;top:'+(r.top-r.height*.1)+'px;width:'+r.width*1.4+'px;height:'+r.width*.7+'px;--dl:.45s');
     for(let i=0;i<4;i++)add('wf-pat','left:'+(sx+rnd(-r.width*.35,r.width*.35))+'px;top:'+(r.top+r.height*rnd(.6,.85))+'px;--dl:'+(.4+i*.3)+'s')},
   shower(plot,r,k,light,add,plan){                       // heavy: long fast streaks, crown splashes
     const top=r.top-r.height*.12,n=light?12:(k<=3?58:16);
     for(let i=0;i<n;i++){const x=r.left+rnd(.02,.98)*r.width,y1=r.top+r.height*rnd(.5,.9),dl=.05+rnd(0,1.05),dur=rnd(.26,.38);
       const xe=streak(add,x,top-rnd(0,14),y1,dl,dur,2+Math.random(),17+Math.random()*10,.85,7);
       add('wf-pat','left:'+xe+'px;top:'+y1+'px;--dl:'+(dl+dur*.85)+'s');
       if(i%2===0)arcAt(add,xe,y1,3,dl+dur*.85,12,16)}
     if(k<=3&&!light)[0,.28,.6].forEach((d,i)=>ringAt(add,r.left+r.width/2+rnd(-5,5),r.top+r.height*.72,r.width*(.8+i*.2),.4+d,.8));
     mistAt(add,r.left+r.width/2,r.top+r.height*.68,r.width*1.25,r.width*.85,.3,1.3)},
   drops(plot,r,k,light,add,plan){                        // slow heavy drops, one by one, with ripples
     const top=r.top-r.height*.1;
     plan.hits.forEach((h,i)=>{const x=r.left+r.width*(.22+(i*.37)%.56),y1=r.top+r.height*rnd(.6,.8),dur=.5,dl=Math.max(0,h-dur);
       add('wf-bigdrop','left:'+x+'px;top:'+top+'px;--fall:'+(y1-top)+'px;--dur:'+dur+'s;--dl:'+dl+'s');
       ringAt(add,x,y1,r.width*.5,h,.8);if(i%2===0)ringAt(add,x,y1,r.width*.8,h+.1,1);
       arcAt(add,x,y1,4,h,9,12);add('wf-glint','left:'+x+'px;top:'+(y1-3)+'px;--dl:'+(h+.05)+'s','✦')});
     mistAt(add,r.left+r.width/2,r.top+r.height*.7,r.width*.9,r.width*.6,.7,1.6)}
 };
 const PERK={rain:900,mist:1000,shower:800,drops:1500};

 /* Phone path: a small splash drawn inside the plot itself. No overlay, no
   z-index games, no reduced-motion switch — it simply shows. */
const mobileWater=plot=>{
  if(!plot)return;
  const old=plot.querySelector('.wf-mob');if(old)old.remove();
  const w=document.createElement('span');w.className='wf-mob';
  w.innerHTML='<i></i><i></i><i></i><i></i><i></i><u></u>';
    plot.classList.remove('wf-splash');void plot.offsetWidth;plot.classList.add('wf-splash');setTimeout(()=>{try{plot.classList.remove('wf-splash')}catch(_){}},950);
  plot.appendChild(w);
  setTimeout(()=>{try{w.remove()}catch(_){}},1250);
};
function visual(plot,k,light,plan){
   try{
     const r=plot.getBoundingClientRect();if(!r.width||r.bottom<0||r.top>innerHeight)return;
      if(document.documentElement.dataset.device==='mobile'){mobileWater(plot);return}
     const gridEl=$('grid');
      if(gridEl)syncLayer();
      const gr=gridEl?gridEl.getBoundingClientRect():null;
      const shift=css=>{if(!gr||!css)return css;return String(css)
        .replace(/left:(-?[\d.]+)px/,(m,x)=>'left:'+((+x-gr.left)*fxScale())+'px')
        .replace(/top:(-?[\d.]+)px/,(m,y)=>'top:'+((+y-gr.top)*fxScale())+'px')};
      const made=[],add=(cls,css,html)=>{const e=el(cls,shift(css),html);made.push(e);return e};
     if(!reduce)VIS[VARIANT](plot,r,k,light,add,plan);else ringAt(add,r.left+r.width/2,r.top+r.height*.72,r.width*.8,.1);
     plot.classList.remove('wf-flash');void plot.offsetWidth;plot.classList.add('wf-flash');setTimeout(()=>plot.classList.remove('wf-flash'),1700);
     const e=plot.querySelector('.e');if(e)setTimeout(()=>{e.classList.remove('wf-perk');void e.offsetWidth;e.classList.add('wf-perk');setTimeout(()=>e.classList.remove('wf-perk'),850)},light?300:PERK[VARIANT]);
     kill(made,3600);
   }catch(e){fail(e)}
 }

 /* ================= WET SOIL ================= */
 function setWet(i,on){
   const g=$('grid'),plot=g&&g.children[i];if(!plot)return;
   let w=plot.querySelector(':scope>.farm-wetsoil');
   if(on&&!w){w=document.createElement('span');w.className='farm-wetsoil';plot.insertBefore(w,plot.firstChild);requestAnimationFrame(()=>w.classList.add('on'))}
   else if(!on&&w){w.classList.remove('on');setTimeout(()=>w.remove(),950)}
 }

 /* ================= ENTRY + STATE WATCHER ================= */
 let last=[],batchT=0,batchN=0,inited=false;
 const makePlan=k=>{ // timing shared by picture and sound (used by the drip variant)
   if(VARIANT!=='drops')return{len:2,hits:[]};
   const n=k>5?3:7,hits=[];let t=.55;for(let i=0;i<n;i++){hits.push(t);t+=rnd(.2,.34)}return{len:t+.4,hits}};
 function play(i,opts){
   const o=opts||{};last[i]=true;setWet(i,true);
   const g=$('grid'),plot=g&&g.children[i],intro=$('intro');
   if(!plot||S.tab!=='farm'||(intro&&!intro.hidden))return false;
   const now=performance.now();if(now-batchT>300)batchN=0;batchT=now;const k=batchN++,delay=Math.min(1.1,k*.07),plan=makePlan(k);
   setTimeout(()=>visual(plot,k,!!o.light,plan),delay*1000);
   if(!o.light){const r=plot.getBoundingClientRect();sound(delay,k,(r.left+r.width/2)/innerWidth*2-1,plan)}
   return true;
 };
 function watch(){
   const g=$('grid');if(!g||typeof S==='undefined'||!Array.isArray(S.plots))return;
   S.plots.forEach((p,i)=>{
     const wet=!!(p&&p.open&&p.c>=0&&p.w&&!(typeof prog==='function'&&prog(p)>=1));
     const was=last[i]===true;
     if(wet&&!was){if(inited)play(i,{light:true});else{last[i]=true;setWet(i,true)}}
     else if(!wet&&was){last[i]=false;setWet(i,false)}
   });
   inited=true;
 }
 window.__farmWater={play,watch,variant:VARIANT,_test:(c,dest,k)=>{useCtx(c,dest);const plan=makePlan(k||0);SOUND[VARIANT](bus(0,.3),c.currentTime,k||0,1,Object.assign({},plan,{snd:plan.hits,bed:true,pour:true}));return plan}};
 setInterval(watch,150);
})();
