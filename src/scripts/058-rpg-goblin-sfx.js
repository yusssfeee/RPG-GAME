
/* Procedural sound effects (Web Audio, no files): goblin dagger flurry, shaman magic orb, shaman vanish.
   Uses the game's shared audio engine (RPGAudio), so mute / autoplay-unlock rules still apply. */
(function(){
  const RAe=()=>window.RPGAudio;
  function run(fn){try{const r=RAe();if(r&&r.run)r.run(fn)}catch(e){}}
  function noise(c,t,dur,f0,f1,q,vol,type){
    const r=RAe(),buf=r.noiseBuf('white',c);if(!buf)return;
    const src=c.createBufferSource();src.buffer=buf;src.loop=true;
    const fl=c.createBiquadFilter();fl.type=type||'bandpass';fl.Q.value=q||1;
    fl.frequency.setValueAtTime(f0,t);fl.frequency.exponentialRampToValueAtTime(Math.max(40,f1),t+dur);
    const g=c.createGain();g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(vol,t+dur*.3);g.gain.exponentialRampToValueAtTime(.0001,t+dur);
    src.connect(fl);fl.connect(g);g.connect(r.out());
    src.onended=()=>{try{g.disconnect()}catch(_){}};
    src.start(t,Math.random()*2);src.stop(t+dur+.05);
  }
  function osc(c,t,f0,f1,dur,type,vol,att){
    const r=RAe(),o=c.createOscillator(),g=c.createGain();
    o.type=type||'sine';o.frequency.setValueAtTime(f0,t);
    if(f1&&f1!==f0)o.frequency.exponentialRampToValueAtTime(Math.max(30,f1),t+dur);
    const a=Math.min(att||.01,dur*.4);
    g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(vol,t+a);g.gain.exponentialRampToValueAtTime(.0001,t+dur);
    o.connect(g);g.connect(r.out());
    o.onended=()=>{try{g.disconnect()}catch(_){}};
    o.start(t);o.stop(t+dur+.03);
  }
  /* event list helper: ms offsets relative to the start of the animation; events already in the past are skipped */
  function at(c,evMs,aheadMs,fn){const rel=(evMs-(aheadMs||0))/1000;if(rel<-.03)return;fn(c.currentTime+Math.max(0,rel))}
  window.__rpgGobSfx={
    /* two quick dagger swishes and a metallic ting on the hit frame */
    dagger(hitMs,aheadMs){run(c=>{
      at(c,hitMs-325,aheadMs,t=>noise(c,t,.17,1500,5200,1.3,.15));
      at(c,hitMs-185,aheadMs,t=>noise(c,t,.17,2000,6200,1.3,.14));
      at(c,hitMs-10,aheadMs,t=>{osc(c,t,2700,2300,.12,'triangle',.045,.004);osc(c,t,4100,3300,.09,'sine',.03,.004);noise(c,t,.06,3500,7000,2,.06)});
    })},
    /* rising charge, then a zap when the orb is released (matches the 0.32 s wind-up) */
    magic(){run(c=>{
      const t=c.currentTime;
      osc(c,t,260,900,.32,'sine',.05,.08);
      osc(c,t,1100,2300,.32,'triangle',.018,.1);
      const z=t+.32;
      noise(c,z,.24,3200,700,1.1,.11);
      osc(c,z,950,210,.26,'sawtooth',.045,.006);
      osc(c,z,1760,880,.3,'sine',.05,.006);
    })},
    /* airy shimmer that fades away: descending sparkles, a breathy sweep and a low fade-out */
    vanish(){run(c=>{
      const t=c.currentTime;
      [2349,1976,1568,1319,988].forEach((f,i)=>osc(c,t+i*.07,f,f*.96,.16,'sine',.034,.006));
      noise(c,t,.55,7000,1400,.8,.09,'bandpass');
      osc(c,t,320,90,.55,'sine',.05,.03);
    })}
  };
})();
