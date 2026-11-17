from pathlib import Path
import re
import shutil
import subprocess
import tempfile

GAME = Path("Project X.html")
if not GAME.is_file():
    raise SystemExit("Canonical source Project X.html is missing.")

src = GAME.read_text(encoding="utf-8")
if 'id="rpg-audio-wood-interaction-upgrade"' not in src:
    raise SystemExit("Expected prior enhancement block is missing; aborting.")
if src.count('id="rpg-audio-wood-interaction-upgrade"') != 1:
    raise SystemExit("Duplicate enhancement marker; aborting.")

def replace_once(old: str, new: str, label: str) -> None:
    global src
    count = src.count(old)
    if count != 1:
        raise SystemExit(f"{label}: expected exactly one match, found {count}")
    src = src.replace(old, new, 1)

def vanish_signature(text: str) -> str:
    start = text.find("vanish(){run(c=>{")
    if start < 0:
        raise SystemExit("Original Shaman vanish sound function is missing.")
    end = text.find("\n    })}", start)
    if end < 0:
        raise SystemExit("Could not isolate the Shaman vanish sound.")
    return text[start:end + 7]

original_vanish = vanish_signature(src)

# Synchronize Archer's bow/arrow sound design with its actual attack animation hit frame.
replace_once(
    "if(activeKind==='goblin')try{window.__rpgGobSfx.dagger(hitAt,skip)}catch(e){}\n    return true;",
    "if(activeKind==='goblin')try{window.__rpgGobSfx.dagger(hitAt,skip)}catch(e){}\n"
    "    if(activeKind==='archer')try{window.__rpgGobSfx.archer(hitAt,skip)}catch(e){}\n"
    "    return true;",
    "Archer attack sound hook"
)

# Improve feedback inside the active V5/V8 woodcutting loop itself.
replace_once(
    "if(e>1.12){W5.streak=0;wStreakUI();wmsg('Too slow! Swing as the ring closes.');",
    "if(e>1.12){W5.streak=0;wStreakUI();sfx('woodMiss');wmsg('Too slow! Swing as the ring closes.');",
    "wood timing-miss cue"
)
replace_once(
    "T.hp-=dmg;sfx('chop');if(perfect)sfx('ding');",
    "T.hp-=dmg;sfx('chop');if(perfect)sfx('woodPerfect');else if(good)sfx('woodGood');else sfx('woodWeak');",
    "wood impact grade sounds"
)
replace_once(
    "(perfect?'PERFECT ':good?'':'weak ')+(aimed?'+aim ':'')+'-'+dmg",
    "(perfect?'PERFECT':good?'GOOD':'WEAK')+(aimed?' · WEAK SPOT':'')+' -'+dmg",
    "wood impact grade label"
)
replace_once(
    "else{wmsg(T.hp<=T.max*.3?'The trunk is creaking...':'');if(T.hp<=T.max*.3)sfx('creak');w5NewRing(300)}",
    "else{wmsg(T.hp<=T.max*.3?'The trunk is creaking...':(perfect?'Perfect strike! Combo ×'+W5.streak:good?'Good hit! Keep your timing tight.':'Weak strike — wait for the ring to close.'));if(T.hp<=T.max*.3)sfx('creak');w5NewRing(300)}",
    "wood quality guidance"
)
reward_line = "wmsg('Clean cut '+'★'.repeat(stars)+'☆'.repeat(3-stars)+' · +'+q+' '+t.n+' log'+(q>1?'s':''));"
replace_once(reward_line, reward_line + "sfx('woodReward');", "wood harvest reward cue")
replace_once(
    "wmsg('Nest looted: '+n+' '+nm(id)+'.');sfx('coin');wEndEv();save();",
    "wmsg('Nest looted: '+n+' '+nm(id)+'.');sfx('woodNest');wEndEv();save();",
    "wood nest reward cue"
)
replace_once(
    "wmsg('Dodged the branch!');addXp('wood',3);sfx('coin');wEndEv();",
    "wmsg('Dodged the branch!');addXp('wood',3);sfx('woodDodge');wEndEv();",
    "wood branch-dodge cue"
)

# Replace the old helper which attempted to call V4-private functions from outside their closure.
new_audio_block = r'''<script id="rpg-audio-wood-interaction-upgrade">
(()=>{'use strict';
 const A=()=>window.RPGAudio;
 function run(fn){try{const a=A();if(a&&a.run)a.run(fn)}catch(_){}}
 function osc(c,t,f0,f1,d,type='sine',v=.04){const a=A(),o=c.createOscillator(),g=c.createGain();o.type=type;o.frequency.setValueAtTime(f0,t);if(f1)o.frequency.exponentialRampToValueAtTime(Math.max(35,f1),t+d);g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(v,t+.008);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(a.out());o.onended=()=>{try{g.disconnect()}catch(_){}};o.start(t);o.stop(t+d+.03)}
 function nz(c,t,d,f0,f1,v=.07){const a=A(),b=a.noiseBuf('white',c);if(!b)return;const src=c.createBufferSource(),f=c.createBiquadFilter(),g=c.createGain();src.buffer=b;f.type='bandpass';f.Q.value=1.2;f.frequency.setValueAtTime(f0,t);f.frequency.exponentialRampToValueAtTime(Math.max(40,f1),t+d);g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(v,t+d*.25);g.gain.exponentialRampToValueAtTime(.0001,t+d);src.connect(f);f.connect(g);g.connect(a.out());src.onended=()=>{try{g.disconnect()}catch(_){}};src.start(t,Math.random());src.stop(t+d+.03)}
 function schedule(hit,ahead,fn){run(c=>{const delta=hit-(ahead||0);if(delta< -35)return;fn(c,c.currentTime+Math.max(0,delta/1000))})}
 const old=window.__rpgGobSfx||{};
 // Goblin: battle grunt, fast blade swishes, and a metallic strike.
 old.dagger=(hit,ahead)=>{
  schedule(hit-365,ahead,(c,t)=>{nz(c,t,.16,620,1700,.075);osc(c,t,145,92,.16,'sawtooth',.025)});
  schedule(hit-225,ahead,(c,t)=>{nz(c,t,.14,1350,4300,.12);osc(c,t,520,270,.12,'triangle',.025)});
  schedule(hit-105,ahead,(c,t)=>{nz(c,t,.12,2100,6500,.13);osc(c,t,760,390,.1,'sawtooth',.022)});
  schedule(hit-6,ahead,(c,t)=>{nz(c,t,.07,3200,7200,.08);osc(c,t,2050,760,.12,'triangle',.05);osc(c,t,1180,640,.1,'sine',.026)});
 };
 // Archer: bow tension, string snap, arrow flight, then impact at the attack hit frame.
 old.archer=(hit,ahead)=>{
  schedule(hit-350,ahead,(c,t)=>{osc(c,t,175,360,.2,'triangle',.035);nz(c,t,.12,420,1350,.045)});
  schedule(hit-205,ahead,(c,t)=>{osc(c,t,840,1480,.085,'sine',.04);osc(c,t,390,210,.1,'triangle',.025)});
  schedule(hit-112,ahead,(c,t)=>{nz(c,t,.2,5200,900,.11);osc(c,t,1750,520,.19,'sawtooth',.022)});
  schedule(hit-6,ahead,(c,t)=>{nz(c,t,.075,2550,6800,.075);osc(c,t,2250,680,.105,'triangle',.045)});
 };
 // Shaman attack: arcane charge, airy release and layered magic bolt.
 // old.vanish() is deliberately untouched: preserve the Shaman's magical death sound.
 old.magic=()=>run(c=>{
  const t=c.currentTime;
  osc(c,t,118,420,.34,'sine',.052);
  osc(c,t,430,1620,.38,'triangle',.03);
  osc(c,t,980,2260,.3,'sine',.022);
  nz(c,t+.1,.3,3000,900,.075);
  const z=t+.32;
  nz(c,z,.25,5200,520,.12);
  osc(c,z,1260,135,.29,'sawtooth',.048);
  osc(c,z,2260,760,.32,'sine',.046);
  osc(c,z,330,68,.35,'triangle',.032);
 });
 old.hurt=k=>run(c=>{const t=c.currentTime;nz(c,t,.17,k==='archer'?1100:620,150,.075);osc(c,t,k==='archer'?300:145,65,.2,'sawtooth',.04)});
 old.death=k=>run(c=>{const t=c.currentTime;nz(c,t,.4,k==='archer'?850:500,80,.07);osc(c,t,k==='archer'?240:120,45,.42,'sine',.05)});
 window.__rpgGobSfx=old; // Keep the original old.vanish() completely unchanged.
 const baseDeath=SFX.death;
 SFX.death=function(foe){const n=String(foe&&foe.n||'').toLowerCase();if(n==='goblin'||n==='goblin archer'){try{old.death(n==='goblin archer'?'archer':'goblin')}catch(_){}return}return baseDeath.apply(this,arguments)};
 Object.assign(SFX,{
  chop:()=>{tone(128,.105,'square',.075,-76);tone(470,.07,'sawtooth',.043,-300,.012);tone(1680,.035,'triangle',.018,-720,.025)},
  woodPerfect:()=>{tone(215,.11,'sawtooth',.065,-130);tone(1040,.13,'triangle',.052,220,.015);tone(1710,.09,'sine',.032,260,.045)},
  woodGood:()=>{tone(185,.09,'square',.05,-82);tone(640,.075,'triangle',.03,130,.02)},
  woodWeak:()=>{tone(96,.12,'square',.05,-42);tone(250,.07,'sawtooth',.027,-140,.02)},
  woodMiss:()=>{tone(340,.09,'sine',.026,-230);tone(125,.12,'triangle',.02,-70,.025)},
  creak:()=>{tone(160,.42,'sawtooth',.048,-68);tone(86,.5,'square',.038,-30,.12)},
  timber:()=>{tone(96,.76,'sawtooth',.085,-58);tone(54,.82,'square',.065,-20,.09);tone(185,.34,'sine',.035,-105,.16)},
  ding:()=>{tone(1360,.12,'triangle',.045,0);tone(1780,.16,'sine',.027,0,.05)},
  woodReward:()=>{tone(660,.13,'triangle',.036,70);tone(880,.14,'triangle',.034,90,.085);tone(1320,.19,'sine',.03,0,.17)},
  woodNest:()=>{tone(960,.12,'sine',.032,150,.0);tone(1210,.13,'sine',.03,170,.065);tone(1560,.16,'triangle',.027,180,.13)},
  woodDodge:()=>{tone(430,.1,'sawtooth',.04,-260);tone(720,.07,'triangle',.026,240,.03)}
 });
 const prevStrike=strike;
 strike=function(){const foe=fight,before=foe&&foe.hp,result=prevStrike.apply(this,arguments);if(foe&&['Goblin','Goblin Archer'].includes(foe.n)&&foe.hp<before&&foe.hp>0)try{old.hurt(foe.n==='Goblin Archer'?'archer':'goblin')}catch(_){}return result};
})();
</script>'''
marker_start = '<script id="rpg-audio-wood-interaction-upgrade">'
i = src.find(marker_start)
j = src.find("</script>", i) + len("</script>")
src = src[:i] + new_audio_block + src[j:]

if vanish_signature(src) != original_vanish:
    raise SystemExit("Shaman vanish sound changed; aborting.")

# Syntax check the exact changed inline scripts with Node.js before writing.
if not shutil.which("node"):
    raise SystemExit("Node.js is required for the inline-script syntax checks.")
def check_js(label: str, code: str, folder: Path) -> None:
    path = folder / (label + ".js")
    path.write_text(code, encoding="utf-8")
    result = subprocess.run(["node", "--check", str(path)], capture_output=True, text=True)
    if result.returncode:
        raise SystemExit(f"{label} syntax check failed:\n{result.stderr}")

with tempfile.TemporaryDirectory() as tmp:
    td = Path(tmp)
    audio_match = re.search(
        r'<script id="rpg-audio-wood-interaction-upgrade">([\s\S]*?)</script>', src
    )
    combat_match = re.search(
        r'<script id="rpg-goblin-combat-fix">([\s\S]*?)</script>', src
    )
    wood_pos = src.find("function wSwing(e,viaBtn)")
    wood_open = src.rfind("<script", 0, wood_pos)
    wood_tag_end = src.find(">", wood_open) + 1
    wood_close = src.find("</script>", wood_pos)
    if not audio_match or not combat_match or min(wood_pos, wood_open, wood_close) < 0:
        raise SystemExit("Could not isolate all changed scripts for syntax checks.")
    wood_code = src[wood_tag_end:wood_close]
    check_js("audio", audio_match.group(1), td)
    check_js("combat", combat_match.group(1), td)
    check_js("woodcutting", wood_code, td)

if src.count(marker_start) != 1:
    raise SystemExit("Duplicate audio patch marker detected.")
if "old.archer(470,0)" in src:
    raise SystemExit("Fixed-delay Archer hook remains.")
if "if(typeof wSwing==='function')" in src:
    raise SystemExit("Out-of-scope wood wrapper remains.")

GAME.write_text(src, encoding="utf-8")
print("Updated Project X.html")
print(f"Characters: {len(src)}")
print("Node syntax checks: audio, combat, woodcutting passed")
print("Shaman vanish signature: unchanged")
print("Archer animation-timed SFX and wood feedback: installed")
