from pathlib import Path

p = Path("Project X.html")
src = p.read_text(encoding="utf-8")
marker = 'id="rpg-audio-wood-interaction-upgrade"'
if marker in src:
    raise SystemExit("Enhancements already installed; refusing duplicate injection.")
if "</body>" not in src:
    raise SystemExit("Project X.html has no closing body tag; no changes made.")

patch = r"""
<script id="rpg-audio-wood-interaction-upgrade">
(()=>{'use strict';
 const A=()=>window.RPGAudio;
 function run(fn){try{const a=A();if(a&&a.run)a.run(fn)}catch(_){}}
 function osc(c,t,f0,f1,d,type='sine',v=.04){const a=A(),o=c.createOscillator(),g=c.createGain();o.type=type;o.frequency.setValueAtTime(f0,t);if(f1)o.frequency.exponentialRampToValueAtTime(Math.max(35,f1),t+d);g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(v,t+.008);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(a.out());o.onended=()=>{try{g.disconnect()}catch(_){}};o.start(t);o.stop(t+d+.03)}
 function nz(c,t,d,f0,f1,v=.07){const a=A(),b=a.noiseBuf('white',c);if(!b)return;const s=c.createBufferSource(),f=c.createBiquadFilter(),g=c.createGain();s.buffer=b;f.type='bandpass';f.Q.value=1.2;f.frequency.setValueAtTime(f0,t);f.frequency.exponentialRampToValueAtTime(Math.max(40,f1),t+d);g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(v,t+d*.25);g.gain.exponentialRampToValueAtTime(.0001,t+d);s.connect(f);f.connect(g);g.connect(a.out());s.onended=()=>{try{g.disconnect()}catch(_){}};s.start(t,Math.random());s.stop(t+d+.03)}
 function schedule(hit,ahead,fn){run(c=>{const t=c.currentTime+Math.max(0,(hit-(ahead||0))/1000);fn(c,t)})}
 const old=window.__rpgGobSfx||{};
 old.dagger=(hit,ahead)=>{schedule(hit-370,ahead,(c,t)=>nz(c,t,.2,900,3600,.12));schedule(hit-170,ahead,(c,t)=>{nz(c,t,.15,1800,6200,.15);osc(c,t,500,160,.16,'sawtooth',.04)});schedule(hit-4,ahead,(c,t)=>{nz(c,t,.07,3000,7000,.07);osc(c,t,1900,750,.12,'triangle',.055)})};
 old.archer=(hit,ahead)=>{schedule(hit-480,ahead,(c,t)=>{osc(c,t,170,420,.28,'triangle',.04);nz(c,t,.15,450,1400,.05)});schedule(hit-230,ahead,(c,t)=>{osc(c,t,650,1250,.12,'sine',.04);nz(c,t,.1,1000,2800,.06)});schedule(hit-140,ahead,(c,t)=>{nz(c,t,.24,4500,850,.12);osc(c,t,1300,430,.22,'sawtooth',.025)});schedule(hit-5,ahead,(c,t)=>{nz(c,t,.08,2400,6500,.08);osc(c,t,2100,700,.1,'triangle',.045)})};
 old.magic=()=>run(c=>{const t=c.currentTime;osc(c,t,135,520,.34,'sine',.055);osc(c,t,500,1900,.38,'triangle',.028);osc(c,t,1300,2500,.28,'sine',.02);nz(c,t+.12,.28,2800,850,.07);const z=t+.32;nz(c,z,.27,4800,600,.12);osc(c,z,1180,145,.3,'sawtooth',.05);osc(c,z,2200,720,.36,'sine',.045);osc(c,z,360,70,.32,'triangle',.03)});
 old.impact=k=>run(c=>{const t=c.currentTime;nz(c,t,.1,k==='archer'?1900:700,180,.08);osc(c,t,k==='archer'?1400:180,k==='archer'?480:65,.18,'triangle',.05)});
 old.hurt=k=>run(c=>{const t=c.currentTime;nz(c,t,.17,k==='archer'?1100:620,150,.075);osc(c,t,k==='archer'?300:145,65,.2,'sawtooth',.04)});
 old.death=k=>run(c=>{const t=c.currentTime;nz(c,t,.4,k==='archer'?850:500,80,.07);osc(c,t,k==='archer'?240:120,45,.42,'sine',.05)});
 window.__rpgGobSfx=old; // Keep old.vanish() unchanged: Shaman death sound remains exactly as before.
 const prevAttack=enemyAttack;
 enemyAttack=function(){if(typeof fight!=='undefined'&&fight&&fight.n==='Goblin Archer'){try{old.archer(470,0)}catch(_){}}return prevAttack.apply(this,arguments)};
 const prevStrike=strike;
 strike=function(){const foe=fight,before=foe&&foe.hp,result=prevStrike.apply(this,arguments);if(foe&&['Goblin','Goblin Archer'].includes(foe.n)&&foe.hp<before&&foe.hp>0)try{old.hurt(foe.n==='Goblin Archer'?'archer':'goblin')}catch(_){}return result};
 const prevDown=foeDown;
 foeDown=function(){const foe=fight;if(foe&&['Goblin','Goblin Archer'].includes(foe.n))try{old.death(foe.n==='Goblin Archer'?'archer':'goblin')}catch(_){}return prevDown.apply(this,arguments)};
 if(typeof wSwing==='function'){const prev=wSwing;wSwing=function(){try{run(c=>{const t=c.currentTime;nz(c,t,.18,650,180,.07);osc(c,t,170,520,.13,'sawtooth',.04)})}catch(_){}return prev.apply(this,arguments)}}
 if(typeof wFell==='function'){const prev=wFell;wFell=function(s,tr,T){try{run(c=>{const t=c.currentTime;nz(c,t,.8,350,45,.14);osc(c,t,90,35,.7,'sawtooth',.08);osc(c,t+.14,58,38,.55,'triangle',.06)})}catch(_){}const out=prev.apply(this,arguments);setTimeout(()=>{try{document.querySelectorAll('.w5-logs').forEach(el=>{const h=logsRow();el.innerHTML=h.substring(h.indexOf('>')+1,h.lastIndexOf('</div>'))});run(c=>{const t=c.currentTime;[660,880,1320].forEach((f,i)=>osc(c,t+i*.075,f,f*1.02,.2,'triangle',.035))})}catch(_){}},720);return out}}
 if(typeof wDoEv==='function'){const prev=wDoEv;wDoEv=function(act){const out=prev.apply(this,arguments);if(act==='nest')try{run(c=>{const t=c.currentTime;[880,1175,1568].forEach((f,i)=>osc(c,t+i*.06,f,f*1.08,.16,'sine',.035))})}catch(_){}return out}}
})();
</script>
"""
src = src.replace("</body>", patch + "\n</body>")
p.write_text(src, encoding="utf-8")
# Remove the one-shot helper files so the repository is left with only the game change.
Path(".github/workflows/apply-rpg-enhancements.yml").unlink(missing_ok=True)
Path(".github/scripts/apply-rpg-enhancements.py").unlink(missing_ok=True)
