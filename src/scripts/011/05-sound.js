/* ---------- sound: ONE shared audio engine (single AudioContext for the whole game) ---------- */
const RA=window.RPGAudio=(()=>{
  const Native=window.AudioContext||window.webkitAudioContext;
  let ctx=null,bus=null;const nbufs=new WeakMap();
  const muted=()=>typeof S!=='undefined'&&!!S.mute;
  // browsers only allow a context to start after a tap/click; never create one before that
  const active=()=>!navigator.userActivation||navigator.userActivation.hasBeenActive;
  function make(){
    if(!Native)return null;
    try{ctx=new Native({latencyHint:'interactive'})}catch(e){try{ctx=new Native()}catch(_){ctx=null;return null}}
    // every sound goes through one master volume and one safety limiter, so stacked effects can never clip
    const lim=ctx.createDynamicsCompressor();
    lim.threshold.value=-9;lim.knee.value=6;lim.ratio.value=14;lim.attack.value=.002;lim.release.value=.2;
    bus=ctx.createGain();bus.gain.value=muted()?0:.9;
    bus.connect(lim);lim.connect(ctx.destination);
    return ctx}
  const get=()=>ctx||(active()?make():null);
  const api={
    vox:0,
    get ctx(){return ctx},
    out(){return bus},
    get(){return get()},
    resume(){const c=get();if(c&&c.state!=='running'&&!document.hidden){try{const p=c.resume();if(p&&p.catch)p.catch(()=>{})}catch(_){}}return c},
    /* context if it is running right now and sound is on, otherwise null (and a resume is requested) */
    ready(){if(muted())return null;const c=api.resume();return c&&c.state==='running'?c:null},
    /* run fn(ctx) now, or right after the context wakes up (sounds older than 0.4 s are dropped, never replayed in a burst) */
    run(fn){
      if(muted())return false;
      const c=get();if(!c)return false;
      const go=()=>{try{fn(c)}catch(e){(window.__audioErr=window.__audioErr||[]).push(String(e&&e.stack||e))}};
      if(c.state==='running'){go();return true}
      if(!document.hidden){let p;try{p=c.resume()}catch(_){}
        const t0=performance.now();
        if(p&&p.then)p.then(()=>{if(c.state==='running'&&!muted()&&performance.now()-t0<400)go()}).catch(()=>{})}
      return false},
    /* "Sound off" silences EVERYTHING instantly, including sounds that are already playing */
    sync(){if(!ctx)return;const t=ctx.currentTime;try{bus.gain.cancelScheduledValues(t);bus.gain.setTargetAtTime(muted()?0:.9,t,.03)}catch(_){}},
    /* loop-safe noise: the end is cross-faded into the start, so looping never clicks */
    noiseBuf(kind,c){
      c=c||ctx;if(!c)return null;
      let m=nbufs.get(c);if(!m){m={};nbufs.set(c,m)}
      if(m[kind])return m[kind];
      const sr=c.sampleRate,len=Math.floor(sr*3),fade=Math.floor(sr*.15),tot=len+fade,t=new Float32Array(tot);
      let b0=0,b1=0,b2=0,b3=0,b4=0,b5=0,b6=0,br=0;
      for(let i=0;i<tot;i++){const x=Math.random()*2-1;
        if(kind==='pink'){b0=.99886*b0+x*.0555179;b1=.99332*b1+x*.0750759;b2=.969*b2+x*.153852;b3=.8665*b3+x*.3104856;b4=.55*b4+x*.5329522;b5=-.7616*b5-x*.016898;t[i]=b0+b1+b2+b3+b4+b5+b6+x*.5362;b6=x*.115926}
        else if(kind==='brown'){br=(br+.02*x)/1.02;t[i]=br}
        else t[i]=x}
      const buf=c.createBuffer(1,len,sr),d=buf.getChannelData(0);
      for(let i=0;i<len;i++){
        if(i<fade){const a=i/fade*Math.PI/2;d[i]=t[i]*Math.sin(a)+t[len+i]*Math.cos(a)}else d[i]=t[i]}
      if(kind!=='white'){let e=0;for(let i=0;i<len;i++)e+=d[i]*d[i];const g=.25/Math.sqrt(e/len+1e-12);for(let i=0;i<len;i++)d[i]*=g}
      m[kind]=buf;return buf},
    /* stop repeat-spam (same sound within 55 ms) and avoid a double "hit + slash" on one blow */
    wrap(o){const last={};
      Object.keys(o).forEach(k=>{const f=o[k];if(typeof f!=='function'||f.__ra)return;
        const w=function(){const n=performance.now();
          if(n-(last[k]||-1e9)<55)return;
          if(k==='slash'&&(n-(last.hit||-1e9)<90||n-(last.crit||-1e9)<90))return;
          last[k]=n;return f.apply(this,arguments)};
        w.__ra=1;o[k]=w})}
  };
  const unlock=()=>{const c=get();if(c&&c.state!=='running'&&!document.hidden&&!muted()){try{const p=c.resume();if(p&&p.catch)p.catch(()=>{})}catch(_){}}};
  ['pointerdown','touchend','mousedown','keydown','click'].forEach(e=>document.addEventListener(e,unlock,{capture:true,passive:true}));
  document.addEventListener('visibilitychange',()=>{if(!ctx)return;
    if(document.hidden){try{ctx.suspend().catch(()=>{})}catch(_){}}
    else if(!muted()){try{ctx.resume().catch(()=>{})}catch(_){}}});
  setInterval(()=>api.sync(),300);
  return api})();
function tone(f,d,type,v,s,t0){
  if(!(f>0)||!(d>0))return;
  RA.run(c=>{
    if(RA.vox>=32)return;   // too many voices at once (fast fights): skip the extra ones instead of crackling
    const t=c.currentTime+(t0||0),vol=v||.06,att=Math.min(.006,d*.25);
    const o=c.createOscillator(),g=c.createGain();
    o.type=type||'square';o.frequency.setValueAtTime(f,t);
    if(s)o.frequency.exponentialRampToValueAtTime(Math.max(30,f+s),t+d);
    g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(vol,t+att);   // 6 ms attack: no click at the start of a note
    g.gain.exponentialRampToValueAtTime(.0001,t+d);
    o.connect(g);g.connect(RA.out());
    RA.vox++;o.onended=()=>{RA.vox--;try{g.disconnect()}catch(_){}};
    o.start(t);o.stop(t+d+.03)});
}
const seq=(a,type,d,v)=>a.forEach((f,i)=>tone(f,d,type,v,0,i*.08));
const SFX={
 plant:()=>tone(220,.12,'triangle',.08,120),
 water:()=>{tone(520,.13,'sine',.032,380);tone(690,.11,'sine',.018,300,.09)},
 harvest:()=>seq([523,659,784],'triangle',.12,.07),
 mine:()=>tone(300,.05,'square',.05,-120),
 brk:()=>{tone(140,.2,'sawtooth',.08,-80);tone(900,.1,'triangle',.05,0,.05)},
 splash:()=>tone(400,.15,'sine',.06,-250),
 bite:()=>{tone(880,.08,'square',.06);tone(880,.08,'square',.06,0,.12)},
 catch:()=>tone(700,.1,'triangle',.07,300),
 hit:()=>tone(160,.1,'sawtooth',.08,-100),
 crit:()=>{tone(1200,.08,'square',.07);tone(1800,.14,'triangle',.06,0,.05)},
 hurt:()=>tone(200,.25,'sawtooth',.08,-150),
 win:()=>seq([392,523,659,784],'square',.14,.05),
 boss:()=>{tone(110,.6,'sawtooth',.09,-30);tone(165,.6,'sawtooth',.06,-30,.12)},
 lvl:()=>seq([523,659,784,1046],'triangle',.18,.08),
 err:()=>tone(130,.15,'square',.05),
 forge:()=>{tone(200,.08,'square',.08,-60);tone(1200,.08,'triangle',.05,0,.08)},
 eat:()=>tone(350,.1,'sine',.06,200),
 coin:()=>seq([988,1318],'square',.1,.05),
 death:(f)=>{
   const n=String(f&&f.n||'').toLowerCase();
   if(/slime|ooze/.test(n)){seq([430,320,210],'sine',.13,.045);tone(150,.2,'sine',.04,-90,.18)}
   else if(/goblin|orc|imp|troll/.test(n)){tone(230,.15,'sawtooth',.065,-130);tone(115,.22,'square',.05,-65,.09)}
   else if(/spider|bat|wolf|dire/.test(n)){tone(740,.1,'triangle',.05,-430);tone(180,.2,'sawtooth',.04,-80,.07)}
   else if(/skeleton|ghost|lich|bone|wraith/.test(n)){seq([780,520,260],'sine',.14,.045)}
   else if(/golem|titan|colossus/.test(n)){tone(100,.25,'square',.075,-55);tone(320,.14,'triangle',.04,-220,.1)}
   else if(/dragon|wyrm|infernal|cinder/.test(n)){tone(145,.23,'sawtooth',.075,-90);tone(72,.28,'sawtooth',.055,-28,.08)}
   else{tone(330,.12,'triangle',.055,-180);tone(175,.18,'sine',.045,-90,.08)}
 }
};
function addXp(k,n){const o=L(k);S.xp[k]+=n;const l=L(k);if(l>o){say('Level up! '+SKN[k]+' is now level '+l+'.');SFX.lvl();if(k==='combat'){const nd=DG.filter(d=>d.l>o&&d.l<=l);if(nd.length)say('New dungeon discovered: '+nd.map(d=>d.n).join(', ')+'! Open the Fight tab.')}}}
function skillBar(k){const x=S.xp[k],l=lvl(x),a=10*(l-1)**2,b=10*l*l,i=SKI[k];return '<div class="sk"><span>'+icon(i[0],i[1])+SKN[k]+' '+l+'</span><div class="bar2"><i style="width:'+((x-a)/(b-a)*100)+'%"></i></div><small>'+(x-a)+'/'+(b-a)+'</small></div>'}
const hitsNeed=l=>l>=20?1:l>=10?2:3;

