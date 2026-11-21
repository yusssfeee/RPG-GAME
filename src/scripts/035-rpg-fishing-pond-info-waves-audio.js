
(function rpgFishingPondInfoWavesAudio(){
  'use strict';
  if(window.__rpgFishingPondPolishReady)return;
  if(typeof VIEWS==='undefined'||typeof VIEWS.fish!=='function')return;
  window.__rpgFishingPondPolishReady=true;
  const baseFishView=VIEWS.fish;
  const motion='';
  VIEWS.fish=function(){
    let html=baseFishView.apply(this,arguments);
    if(typeof html!=='string'||!html.includes('<div id="lake"></div>'))return html;
    const hasBanner=html.includes('class="pond-stage-banner"');
    const match=hasBanner?html.match(/<div class="pnd-chips">[\s\S]*?<\/div>/):null;
    let meta='';
    if(match){meta=match[0].replace('class="pnd-chips"','class="pond-stage-meta"');html=html.replace(match[0],'');}
    const marker=/(<div class="pond-stage-banner">[\s\S]*?<small>[\s\S]*?<\/small>)(<\/div>)(<div id="lake"><\/div>)/;
    if(marker.test(html))html=html.replace(marker,(all,a,b,c)=>a+meta+b+motion+c);
    else html=html.replace('<div id="lake"></div>',motion+'<div id="lake"></div>');
    return html;
  };

  // Gentle locally synthesized water ambience and splash/bubble sounds.
  // Audio starts only after a direct tap in the fishing scene and respects Sound Off.
  let audio=null,ambienceGain=null,noiseSource=null,ambienceFilter=null,ambienceLfo=null,ambienceOn=false,lastSound=0,lastCatchSfxAt=0;
  const enabled=()=>!((typeof S!=='undefined'&&S.mute)||false)&&typeof S!=='undefined'&&S.tab==='fish';
  function getAudio(){
    if(!enabled())return null;
    try{audio=window.RPGAudio.ready();return audio;}catch(_){return null;}
  }
  function startAmbience(){
    const c=getAudio();if(!c||ambienceOn)return;
    try{
      noiseSource=c.createBufferSource();noiseSource.buffer=window.RPGAudio.noiseBuf('pink',c);noiseSource.loop=true;
      ambienceFilter=c.createBiquadFilter();ambienceFilter.type='lowpass';ambienceFilter.frequency.value=780;ambienceFilter.Q.value=.35;
      ambienceGain=c.createGain();ambienceGain.gain.value=.0001;
      noiseSource.connect(ambienceFilter).connect(ambienceGain).connect(window.RPGAudio.out());noiseSource.start();
      ambienceGain.gain.setTargetAtTime(.06,c.currentTime,.8);
      // Slow filter movement gives the bed a soft flowing-water character.
      ambienceLfo=c.createOscillator();const lfoGain=c.createGain();
      ambienceLfo.type='sine';ambienceLfo.frequency.value=.13;lfoGain.gain.value=170;
      ambienceLfo.connect(lfoGain).connect(ambienceFilter.frequency);ambienceLfo.start();
      ambienceOn=true;
    }catch(_){ambienceOn=false;}
  }
  function stopAmbience(){
    if(!audio||!ambienceGain||!ambienceOn)return;
    try{const g=ambienceGain;g.gain.cancelScheduledValues(audio.currentTime);g.gain.setTargetAtTime(.0001,audio.currentTime,.12);const n=noiseSource;setTimeout(()=>{try{n&&n.stop()}catch(_){}},650);}catch(_){}
    try{ambienceLfo&&ambienceLfo.stop()}catch(_){}noiseSource=null;ambienceGain=null;ambienceFilter=null;ambienceLfo=null;ambienceOn=false;
  }
  function splash(strength){
    const c=getAudio();if(!c)return;const now=c.currentTime,vol=Math.max(.45,Math.min(1.5,strength||1));
    try{
      // Broad, short water impact: low-pass body + bright, filtered surface spray.
      const makeNoise=(duration,frequency,q,peak,delay=0)=>{
        const n=Math.max(1,Math.floor(c.sampleRate*duration)),buf=c.createBuffer(1,n,c.sampleRate),a=buf.getChannelData(0);
        let prev=0;
        for(let i=0;i<n;i++){
          const white=Math.random()*2-1;prev=prev*.48+white*.52;
          const env=Math.pow(1-i/n,2.15);
          a[i]=(white*.58+prev*.42)*env;
        }
        const src=c.createBufferSource(),filter=c.createBiquadFilter(),gain=c.createGain();
        src.buffer=buf;filter.type='bandpass';filter.frequency.value=frequency;filter.Q.value=q;
        gain.gain.setValueAtTime(.0001,now+delay);
        gain.gain.exponentialRampToValueAtTime(peak*vol,now+delay+.009);
        gain.gain.exponentialRampToValueAtTime(.0001,now+delay+duration);
        src.connect(filter).connect(gain).connect(window.RPGAudio.out());src.start(now+delay);src.stop(now+delay+duration+.02);
      };
      makeNoise(.34,620,.62,.085);
      makeNoise(.19,1850,.8,.038,.012);
      makeNoise(.12,3400,.7,.014,.035);
      // Rounded water displacement / hollow plop.
      const o=c.createOscillator(),g=c.createGain(),f=c.createBiquadFilter();
      o.type='sine';o.frequency.setValueAtTime(245,now);o.frequency.exponentialRampToValueAtTime(78,now+.24);
      f.type='lowpass';f.frequency.value=520;g.gain.setValueAtTime(.0001,now);
      g.gain.exponentialRampToValueAtTime(.052*vol,now+.014);
      g.gain.exponentialRampToValueAtTime(.0001,now+.27);
      o.connect(f).connect(g).connect(window.RPGAudio.out());o.start(now);o.stop(now+.29);
      // A few tiny droplets after the main splash.
      for(let i=0;i<3;i++){
        const t=.075+i*.052,drop=c.createOscillator(),dg=c.createGain();
        drop.type='sine';drop.frequency.setValueAtTime(1250+i*370,now+t);
        drop.frequency.exponentialRampToValueAtTime(650+i*180,now+t+.055);
        dg.gain.setValueAtTime(.0001,now+t);dg.gain.exponentialRampToValueAtTime(.009*vol,now+t+.006);
        dg.gain.exponentialRampToValueAtTime(.0001,now+t+.065);
        drop.connect(dg).connect(window.RPGAudio.out());drop.start(now+t);drop.stop(now+t+.07);
      }
    }catch(_){}
  }
  function waterImpact(spot){
    try{
      const lake=document.getElementById('lake');if(!lake||!spot)return;
      const rect=lake.getBoundingClientRect(),sr=spot.getBoundingClientRect();
      const x=sr.left+sr.width/2-rect.left,y=sr.top+sr.height/2-rect.top;
      const fx=document.createElement('span');fx.className='pond-impact';
      fx.style.left=x+'px';fx.style.top=y+'px';
      fx.innerHTML='<i></i><i></i><i></i><b></b><em></em><em></em><em></em>';
      lake.appendChild(fx);setTimeout(()=>fx.remove(),1250);
    }catch(_){}
  }
  function fishChirp(){
    const c=getAudio();if(!c)return;const now=c.currentTime;
    try{[0,1].forEach((i)=>{const o=c.createOscillator(),g=c.createGain();o.type='sine';o.frequency.setValueAtTime(i?1040:760,now+i*.075);o.frequency.exponentialRampToValueAtTime(i?680:520,now+i*.075+.11);g.gain.setValueAtTime(.0001,now+i*.075);g.gain.exponentialRampToValueAtTime(.022,now+i*.075+.012);g.gain.exponentialRampToValueAtTime(.0001,now+i*.075+.13);o.connect(g).connect(window.RPGAudio.out());o.start(now+i*.075);o.stop(now+i*.075+.14);});}catch(_){}
  }

  // Delicate droplets that follow the catch splash: several bright, irregular plinks.
  // A catch has a compact splash followed by irregular droplets and a soft hollow plip.
  // Everything is synthesized locally; it works after the first user interaction and respects mute.
  function catchWaterDrops(){
    const c=getAudio();if(!c)return;const now=c.currentTime;
    try{
      const notes=[
        {t:.035,f:1180,v:.024},{t:.105,f:2060,v:.020},{t:.182,f:2740,v:.014},
        {t:.265,f:1510,v:.018},{t:.348,f:3150,v:.011},{t:.425,f:2260,v:.012}
      ];
      notes.forEach((d,i)=>{
        const o=c.createOscillator(),g=c.createGain(),filter=c.createBiquadFilter();
        o.type='sine';
        o.frequency.setValueAtTime(d.f,now+d.t);
        o.frequency.exponentialRampToValueAtTime(Math.max(420,d.f*(.48+(i%3)*.06)),now+d.t+.105);
        filter.type='lowpass';filter.frequency.value=3900;filter.Q.value=.55;
        g.gain.setValueAtTime(.0001,now+d.t);
        g.gain.exponentialRampToValueAtTime(d.v,now+d.t+.006);
        g.gain.exponentialRampToValueAtTime(.0001,now+d.t+.135);
        o.connect(filter).connect(g).connect(window.RPGAudio.out());
        o.start(now+d.t);o.stop(now+d.t+.145);
      });
      // Filtered micro-splashes add the soft fizz of water droplets rather than metallic clicks.
      [.025,.105,.205].forEach((t,i)=>{
        const n=Math.floor(c.sampleRate*(i===0?.12:.085));
        const buf=c.createBuffer(1,n,c.sampleRate),data=buf.getChannelData(0);
        for(let j=0;j<n;j++)data[j]=(Math.random()*2-1)*Math.pow(1-j/n,3.4);
        const src=c.createBufferSource(),f=c.createBiquadFilter(),g=c.createGain();
        src.buffer=buf;f.type='bandpass';f.frequency.value=1750+i*680;f.Q.value=.7;
        g.gain.setValueAtTime(.0001,now+t);
        g.gain.exponentialRampToValueAtTime(.018-i*.003,now+t+.008);
        g.gain.exponentialRampToValueAtTime(.0001,now+t+(i===0?.12:.09));
        src.connect(f).connect(g).connect(window.RPGAudio.out());src.start(now+t);src.stop(now+t+(i===0?.13:.1));
      });
      const bubble=c.createOscillator(),bg=c.createGain(),bf=c.createBiquadFilter();
      bubble.type='sine';bubble.frequency.setValueAtTime(390,now+.11);
      bubble.frequency.exponentialRampToValueAtTime(118,now+.31);
      bf.type='lowpass';bf.frequency.value=600;
      bg.gain.setValueAtTime(.0001,now+.11);
      bg.gain.exponentialRampToValueAtTime(.022,now+.125);
      bg.gain.exponentialRampToValueAtTime(.0001,now+.33);
      bubble.connect(bf).connect(bg).connect(window.RPGAudio.out());bubble.start(now+.11);bubble.stop(now+.34);
    }catch(_){}
  }
  function catchSfx(){
    if(!enabled())return;
    const stamp=Date.now();
    if(stamp-lastCatchSfxAt<280)return;
    lastCatchSfxAt=stamp;
    splash(1.24);
    catchWaterDrops();
    fishChirp();
  }

  document.addEventListener('pointerdown',e=>{
    const stage=e.target&&e.target.closest&&e.target.closest('.rpg-fish-stage');if(!stage||!enabled())return;
    startAmbience();
    const spot=e.target.closest('.pnd-spot');if(spot&&typeof PS!=='undefined'&&PS){
      const s=PS.spots.find(x=>x.id===spot.dataset.spot);
      if(s){
        const now=Date.now();
        if(now-lastSound>160){
          lastSound=now;
          const catching=(s.st==='bite');
          if(catching)catchSfx();else splash(.95);
          waterImpact(spot);
        }
      }
    }
  },true);

  // A soft water/fish response when the bobber enters the bite state.
  const pane=document.getElementById('pane');
  if(pane&&window.MutationObserver){
    const observer=new MutationObserver(records=>{
      if(!enabled())return;
      for(const rec of records){for(const node of rec.addedNodes||[]){
        if(node.nodeType!==1)continue;
        if((node.classList&&node.classList.contains('bang'))||(node.matches&&node.matches('.pnd-spot .bang'))||(node.querySelector&&node.querySelector('.pnd-spot .bang'))){fishChirp();break;}
      }}
    });
    observer.observe(pane,{childList:true,subtree:true});
  }
  // Catching a fish adds a short, brighter splash while preserving the original reward function.
  if(typeof catchFish==='function'&&!catchFish.__pondAudioWrapped){
    const original=catchFish;
    const wrapped=function(key){const existed=typeof school!=='undefined'&&school.some(x=>x.id===key);const result=original.apply(this,arguments);if(existed)catchSfx();return result;};
    wrapped.__pondAudioWrapped=true;catchFish=wrapped;
  }
  // Fade the ambient layer when leaving Fish, muting, or hiding the page.
  let wasFish=false;
  function audioWatch(){
    const on=enabled()&&!!document.querySelector('.rpg-fish-stage');
    if(!on){if(ambienceOn)stopAmbience();wasFish=false;}
    else if(wasFish&&audio&&audio.state==='suspended'){try{audio.resume()}catch(_){}}
    if(on)wasFish=true;
  }
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stopAmbience();});
  setInterval(audioWatch,450);
})();
