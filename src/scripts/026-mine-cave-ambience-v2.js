
(()=>{
 const caveKinds={quarry:'dust',deep:'deep',crystal:'crystal',magma:'magma'};
 const ambientHTML=(id)=>{const kind=caveKinds[id]||'dust';let dots='';for(let i=0;i<24;i++){const x=(i*37+13)%97,y=(i*53+9)%88,d=4+(i%7)*1.25;dots+='<i style="--x:'+x+'%;--y:'+y+'%;--dur:'+d+'s;animation-delay:-'+(i%d)+'s"></i>';}return '<div class="mine-atmosphere '+kind+'" aria-hidden="true">'+dots+'</div>'};
 const oldMine=VIEWS.mine;
 VIEWS.mine=function(){let html=oldMine.apply(this,arguments);const id=(S.mineExp&&S.mineExp.selected)?(['quarry','deep','crystal','magma'][S.mineExp.cave||0]||'quarry'):null;if(id)html=html.replace(/(<div class="rpg-mine-scene"[^>]*>)/, '$1'+ambientHTML(id));return html};
 const RA=window.RPGAudio,caveIds=['quarry','deep','crystal','magma'];
 let bed=null,active=null;
 // the cave drone may only play while you are standing in the mine, sound is on and the page is visible
 const wanted=()=>{try{if(S.mute||document.hidden||S.tab!=='mine'||!(S.mineExp&&S.mineExp.selected))return null;return caveIds[S.mineExp.cave||0]||'quarry'}catch(_){return null}};
 function stopBed(fast){
   const b=bed;bed=null;active=null;if(!b)return;
   try{const t=b.c.currentTime,g=b.master.gain;g.cancelScheduledValues(t);g.setValueAtTime(g.value,t);g.linearRampToValueAtTime(0,t+(fast?.06:.45))}catch(_){}
   // every oscillator and noise source is really stopped and released (before, they ran forever)
   setTimeout(()=>{b.nodes.forEach(n=>{try{n.stop()}catch(_){}try{n.disconnect()}catch(_){}});try{b.master.disconnect()}catch(_){}},fast?160:700)}
 function build(c,id){
   const now=c.currentTime,nodes=[],master=c.createGain();
   master.gain.setValueAtTime(0,now);master.gain.linearRampToValueAtTime(.55,now+1.6);master.connect(RA.out());
   const src=c.createBufferSource();src.buffer=RA.noiseBuf('white',c);src.loop=true;
   const filter=c.createBiquadFilter();filter.type='lowpass';filter.frequency.value=id==='crystal'?900:id==='magma'?260:id==='deep'?420:620;
   const ng=c.createGain();ng.gain.value=id==='magma'?.22:.12;
   src.connect(filter);filter.connect(ng);ng.connect(master);src.start();nodes.push(src);
   if(id==='crystal'){[523.25,659.25,783.99].forEach((f,i)=>{const o=c.createOscillator(),g=c.createGain();o.type='sine';o.frequency.value=f;g.gain.value=.018;o.connect(g);g.connect(master);o.start();g.gain.setTargetAtTime(.004,now+i*.7,1.5);nodes.push(o)})}
   if(id==='magma'){const o=c.createOscillator(),g=c.createGain(),l=c.createOscillator(),lg=c.createGain(),lp=c.createBiquadFilter();o.type='sawtooth';o.frequency.value=48;lp.type='lowpass';lp.frequency.value=220;g.gain.value=.035;l.frequency.value=.22;lg.gain.value=13;l.connect(lg);lg.connect(o.frequency);o.connect(lp);lp.connect(g);g.connect(master);o.start();l.start();nodes.push(o,l)}
   if(id==='quarry'){const o=c.createOscillator(),g=c.createGain();o.type='sine';o.frequency.value=82;g.gain.value=.018;o.connect(g);g.connect(master);o.start();nodes.push(o)}
   bed={c,master,nodes}}
 function startBed(id){const c=RA.ready();if(!c)return;if(bed&&active===id)return;stopBed(true);active=id;build(c,id)}
 setInterval(()=>{const w=wanted();if(!w){if(bed)stopBed()}else if(!bed||active!==w)startBed(w)},300);
 document.addEventListener('visibilitychange',()=>{if(document.hidden&&bed)stopBed(true)});
})();
