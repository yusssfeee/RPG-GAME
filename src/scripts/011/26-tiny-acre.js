/* ---------- Tiny Acre: Chronicle RPG expansion ---------- */
const CH_REGIONS=[
 {id:'meadow',n:'Sunmeadow Fields',sub:'The old road beyond your farm',l:1,foes:['Slime','Rat','Bat'],boss:'Meadow Guardian',col:'#83b96b',desc:'A gentle valley where the first signs of blight appeared.'},
 {id:'woods',n:'Whispering Woods',sub:'Ancient trees and hungry shadows',l:3,foes:['Goblin','Spider','Wolf','Ghost'],boss:'Thornfang Alpha',col:'#527d59',desc:'The trees whisper of a thorn-crowned beast guarding a lost shrine.'},
 {id:'ember',n:'Emberdeep Caverns',sub:'Ore veins beneath a sleeping volcano',l:7,foes:['Skeleton','Orc','Golem','Imp'],boss:'The Cinder Wyrm',col:'#b85b3c',desc:'A hot, echoing mine where something old stirs under the stone.'},
 {id:'frost',n:'Frostfall Ruins',sub:'A forgotten kingdom under blue ice',l:11,foes:['Ghost','Golem','Troll','Imp'],boss:'The Hollow Crown',col:'#779dc7',desc:'The final trail leads to a ruined throne and the source of the blight.'}
];
const CH_BOSSES=[
 {n:'Meadow Guardian',base:'Slime King',l:1,hp:1.5,atk:1.25,xp:36,c:55,desc:'A once-peaceful spirit twisted by the creeping blight.'},
 {n:'Thornfang Alpha',base:'Orc Warlord',l:3,hp:1.45,atk:1.25,xp:110,c:160,desc:'An ancient wolf-spirit wrapped in thorny roots.'},
 {n:'The Cinder Wyrm',base:'Dragon',l:7,hp:1.2,atk:1.15,xp:280,c:420,desc:'A volcanic dragon whose scales glow like a forge.'},
 {n:'The Hollow Crown',base:'Lich',l:11,hp:1.15,atk:1.1,xp:650,c:1100,desc:'The lost monarch that feeds the blight spreading across Tiny Acre.'}
];
// New hand-drawn SVG foes keep the original ink-outline/cel-shaded look.
const CH_ART={
 'Brambleling':'<g stroke="#241a35" stroke-width="3" stroke-linejoin="round"><path d="M18 70Q4 42 25 30L18 12 40 25Q52 8 62 25L83 12 76 38Q96 55 80 78L68 91 50 82 31 93Z" fill="#6c9b4c"/><path d="M24 58L42 63 36 70M76 58L58 63 64 70" fill="none"/><ellipse cx="39" cy="50" rx="5" ry="7" fill="#ffcf55"/><ellipse cx="61" cy="50" rx="5" ry="7" fill="#ffcf55"/><path d="M39 72Q50 79 61 72" fill="none"/></g>',
 'Cinder Wisp':'<g stroke="#241a35" stroke-width="3" stroke-linejoin="round"><path d="M50 8Q75 28 68 48Q88 69 62 88L51 77 38 94Q14 76 33 53Q17 29 50 8Z" fill="#ef7748"/><path d="M50 23Q65 42 49 58Q40 69 53 78Q27 70 43 50Q53 39 50 23Z" fill="#ffd56a" stroke="none"/><ellipse cx="42" cy="49" rx="4" ry="6" fill="#fff4bd"/><ellipse cx="59" cy="49" rx="4" ry="6" fill="#fff4bd"/></g>',
 'Frostling':'<g stroke="#241a35" stroke-width="3" stroke-linejoin="round"><path d="M50 9L61 28 81 20 72 41 91 54 69 62 73 85 51 74 31 91 31 68 9 60 28 45 18 25 39 31Z" fill="#8bd9f5"/><circle cx="41" cy="49" r="5" fill="#fff"/><circle cx="60" cy="49" r="5" fill="#fff"/><path d="M42 65h17" stroke="#4d8eb8"/></g>'
};
function chSvg(name){return '<svg class="art" viewBox="0 0 100 100" aria-label="'+name+'">'+(CH_ART[name]||CH_ART.Brambleling)+'</svg>'}
// Add original enemies to the existing encounter and loot systems.
FOES.push(
 {n:'Brambleling',hp:25,atk:5,xp:12,c:12,l:3,sp:2.2,a:CH_ART.Brambleling},
 {n:'Cinder Wisp',hp:88,atk:15,xp:48,c:58,l:7,sp:2.0,a:CH_ART['Cinder Wisp']},
 {n:'Frostling',hp:145,atk:21,xp:82,c:96,l:11,sp:1.8,a:CH_ART.Frostling},
 {n:'Meadow Guardian',b:1,hp:85,atk:9,xp:36,c:55,l:1,sp:2.3,a:CH_ART.Brambleling},
 {n:'Thornfang Alpha',b:1,hp:245,atk:18,xp:110,c:160,l:3,sp:2.1,a:CH_ART.Brambleling},
 {n:'The Cinder Wyrm',b:1,hp:480,atk:28,xp:280,c:420,l:7,sp:1.9,a:CH_ART['Cinder Wisp']},
 {n:'The Hollow Crown',b:1,hp:850,atk:38,xp:650,c:1100,l:11,sp:1.7,a:CH_ART.Frostling}
);
DROPS['Brambleling']=[['herb',.55,1,2],['hide',.25,1,1]];
DROPS['Cinder Wisp']=[['wisp',.7,1,2],['core',.2,1,1]];
DROPS['Frostling']=[['wisp',.5,1,2],['mithril',.22,1,1]];
DROPS['Meadow Guardian']=[['gel',1,4,8],['herb',1,3,5],['core',.5,1,1]];
DROPS['Thornfang Alpha']=[['fur',1,3,6],['horn',1,2,4],['core',.8,1,2]];
DROPS['The Cinder Wyrm']=[['scale',1,3,6],['core',1,2,4],['mithril',.8,2,4]];
DROPS['The Hollow Crown']=[['core',1,5,8],['scale',1,4,7],['starstone',.5,1,2]];
const CH_QUESTS=[
 {id:'first_steps',n:'A Road Beyond Home',d:'Defeat 3 creatures on your travels.',goal:3,key:'kills',reward:35,xp:15,story:'The road is no longer safe. Someone must discover what is poisoning the valley.'},
 {id:'field_warden',n:'The Field Warden',d:'Defeat the Meadow Guardian.',goal:1,key:'bosses',target:'Meadow Guardian',region:'meadow',reward:70,xp:35,story:'The guardian remembers a green light beneath the old shrine.'},
 {id:'wildwood',n:'Whispers in the Woods',d:'Defeat 8 creatures in the wilds.',goal:8,key:'kills',region:'woods',reward:95,xp:50,story:'The blight is spreading along roots that lead toward the mountains.'},
 {id:'thornfang',n:'The Thorn-Crowned Beast',d:'Defeat Thornfang Alpha.',goal:1,key:'bosses',target:'Thornfang Alpha',region:'woods',reward:150,xp:75,story:'A broken seal points to the ember caverns.'},
 {id:'embers',n:'Heart of the Mountain',d:'Defeat 15 creatures on your travels.',goal:15,key:'kills',region:'ember',reward:210,xp:100,story:'The forge-heart was stolen and carried north into the frozen ruins.'},
 {id:'wyrm',n:'Ashes to Ashes',d:'Defeat The Cinder Wyrm.',goal:1,key:'bosses',target:'The Cinder Wyrm',region:'ember',reward:350,xp:160,story:'The last seal is held by the Hollow Crown.'},
 {id:'crown',n:'Acre Restored',d:'Defeat The Hollow Crown.',goal:1,key:'bosses',target:'The Hollow Crown',region:'frost',reward:700,xp:300,story:'The blight fades. Your farm can grow in peace again.'},
 {id:'harvest',n:'A Farmer’s Promise',d:'Harvest 10 crops from your farm.',goal:10,key:'harvests',reward:45,xp:20,story:'A healthy harvest can sustain the journey ahead.'}
];
const chStory=()=>S.story||(S.story={kills:0,bosses:0,harvests:0,quests:{},points:0,skills:{power:0,ward:0,focus:0,fortune:0},relics:[]});
function chQuestValue(q){return q.key==='kills'?chStory().kills:q.key==='bosses'?(chStory().bossesByName?.[q.target]||0):chStory().harvests}
function chQuestState(q){return chStory().quests[q.id]||'open'}
function chUnlocked(r){return L('combat')>=r.l}
function chooseRegion(id){const r=CH_REGIONS.find(x=>x.id===id);if(!r)return false;if(!chUnlocked(r)){say('Reach combat level '+r.l+' to unlock '+r.n+'.');SFX.err();return false}S.region=id;say('Travel destination set: '+r.n+'.');SFX.coin();return true}
function chGrant(q){chStory().quests[q.id]='claimed';S.coins+=q.reward;addXp('combat',q.xp);chStory().points+=1;S.hp=maxHp();S.sh=maxSh();toast('Quest complete: <b>'+q.n+'</b><br>+'+q.reward+' coins · +1 skill point','reward');SFX.boss();save()}
function claimQuest(id){const q=CH_QUESTS.find(x=>x.id===id);if(!q||chQuestState(q)!=='ready')return false;chGrant(q);say('Quest reward claimed: '+q.n);return true}
function buyTalent(id){const st=chStory(),caps={power:5,ward:5,focus:5,fortune:5};if(!(id in caps)||st.points<1||st.skills[id]>=caps[id]){say(st.points<1?'Earn skill points by completing story quests.':'That talent is already maxed.');SFX.err();return false}st.points--;st.skills[id]++;say('Talent improved: '+({power:'Might',ward:'Warden',focus:'Focus',fortune:'Fortune'})[id]+' '+st.skills[id]+'/5');SFX.lvl();return true}
function challengeBoss(id){const b=CH_BOSSES.find(x=>x.n===id);if(!b)return false;const r=CH_REGIONS.find(x=>x.id===S.region);if(!r||L('combat')<b.l){say('You are not ready for this challenge.');SFX.err();return false}if(fight){say('Finish your current fight first.');return false}const base=FOES.find(x=>x.n===b.n);if(!base)return false;const k=1+.08*Math.max(0,L('combat')-b.l);startFight(mkFoe(b.n,k,'b',b.hp));fight.hp=Math.round(fight.hp);fight.max=fight.hp;fight.atk=Math.round(base.atk*b.atk*k);fight.xp=b.xp;fight.c=b.c;fight.sp=Math.max(1.3,base.sp||2);fight.heavy=true;S.tab='fight';say(b.n+' challenges you!');SFX.boss();return true}
const _chExplore=explore;
explore=function(){const r=CH_REGIONS.find(x=>x.id===S.region)||CH_REGIONS[0];if(!chUnlocked(r)){S.region='meadow';return _chExplore()}const roll=Math.random();if(roll<.12){const c=earn(rnd(10,22)+L('combat')*7,'combat');S.coins+=c;addXp('combat',3);say('You found a travel cache: '+c+' coins.');SFX.coin();return}if(roll<.19){S.hp=maxHp();S.sh=maxSh();say('You find a safe camp and recover.');SFX.eat();return}const pool=FOES.filter(f=>!f.b&&r.foes.includes(f.n)&&f.l<=L('combat')+1);const f=pool[Math.floor(Math.random()*pool.length)]||FOES.find(x=>x.n==='Slime');const scale=1+Math.max(0,L('combat')-f.l)*.07;startFight(mkFoe(f.n,scale,'f'));say(r.n+': a '+f.n+' blocks your path!');SFX.bite()};
const _chFoeDown=foeDown;
foeDown=function(){const f=fight;const wasBoss=!!(f&&f.b);const name=f&&f.n;const result=_chFoeDown();if(f){const st=chStory();st.kills++;if(wasBoss){st.bosses++;st.bossesByName=st.bossesByName||{};st.bossesByName[name]=(st.bossesByName[name]||0)+1;const b=CH_BOSSES.find(x=>x.n===name);if(b&&!st.relics.includes(name)){st.relics.push(name);st.points++;toast('Relic awakened: <b>'+name+'</b> · +1 skill point','reward')}}CH_QUESTS.forEach(q=>{if(chQuestState(q)==='open'&&chQuestValue(q)>=q.goal){st.quests[q.id]='ready';toast('Quest ready: <b>'+q.n+'</b>','reward')}});save()}return result};
const _chTapPlot=tapPlot;
tapPlot=function(i){const p=S.plots[i];const ready=p&&p.open&&p.c>=0&&prog(p)>=1;const before=chStory().harvests;const result=_chTapPlot(i);if(ready&&chStory().harvests===before){chStory().harvests++;CH_QUESTS.forEach(q=>{if(chQuestState(q)==='open'&&chQuestValue(q)>=q.goal){chStory().quests[q.id]='ready';toast('Quest ready: <b>'+q.n+'</b>','reward')}})}return result};
// A small, balanced talent layer supplements existing gear/levels without replacing them.
// Talent bonuses are integrated into the original stat formulas above to preserve their const bindings.
Object.assign(VIEWS,{
 chronicle(){
  const st=chStory(),reg=CH_REGIONS.find(r=>r.id===S.region)||CH_REGIONS[0];
  const active=CH_QUESTS.filter(q=>chQuestState(q)!=='claimed');
  const quests=active.map(q=>{const v=Math.min(q.goal,chQuestValue(q)),state=chQuestState(q),pct=v/q.goal;return '<div class="ch-quest '+(state==='claimed'?'done':'')+'"><div class="qhead">'+icon(q.key==='harvests'?'wheat':q.key==='bosses'?'crown':'sword')+'<div style="flex:1"><b>'+q.n+'</b><small>'+q.d+'</small></div><b>'+v+'/'+q.goal+'</b></div><div class="ch-progress"><i style="width:'+(pct*100)+'%"></i></div><small>'+(state==='ready'?q.story:'Reward: '+q.reward+' coins · '+q.xp+' Combat XP'+(q.region?' · '+(CH_REGIONS.find(r=>r.id===q.region)||{}).n:''))+'</small>'+(state==='ready'?'<button class="btn full" data-a="quest" data-i="'+q.id+'">Claim reward · +1 skill point</button>':'')+'</div>'}).join('');
  const regions=CH_REGIONS.map(r=>'<button class="ch-region '+(S.region===r.id?'on':'')+(!chUnlocked(r)?' lock':'')+'" data-a="region" data-i="'+r.id+'">'+icon(r.id==='meadow'?'sprout':r.id==='woods'?'tree':r.id==='ember'?'flame':'snowflake',r.col)+'<span><b>'+r.n+'</b><small>'+r.sub+'</small><small>'+(chUnlocked(r)?'Unlocked · Combat level '+r.l:'Locked · Requires combat level '+r.l)+'</small></span>'+(S.region===r.id?'✓':!chUnlocked(r)?'🔒':'→')+'</button>').join('');
  const boss=CH_BOSSES.find(b=>b.l===reg.l)||CH_BOSSES.filter(b=>b.l<=L('combat')).slice(-1)[0]||CH_BOSSES[0];
  const skills=[['power','Might','+3.5% attack damage per rank'],['ward','Warden','+4% defense and +2 max HP per rank'],['focus','Focus','+2% critical chance per rank'],['fortune','Fortune','+4% coins from rewards per rank']].map(([id,n,d])=>'<div class="ch-skill"><div><b>'+n+' · '+st.skills[id]+'/5</b><small>'+d+'</small></div><button data-a="talent" data-i="'+id+'" '+(st.points<1||st.skills[id]>=5?'disabled':'')+'>Upgrade</button></div>').join('');
  return '<div class="ch-hero"><div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;opacity:.8">The Blightbound Chronicle</div><h2 style="margin:5px 0 7px">A farm worth fighting for</h2><p style="margin:0;font-size:13px;max-width:280px">Follow the blight from the fields to the frozen throne. Grow stronger, uncover the lost seals, and bring the valley back to life.</p></div><div class="ch-kpis"><div class="ch-kpi"><b>'+L('combat')+'</b><small>Combat level</small></div><div class="ch-kpi"><b>'+st.kills+'</b><small>Creatures defeated</small></div><div class="ch-kpi"><b>'+st.points+'</b><small>Skill points</small></div></div><div class="ttl">Choose your destination</div><div class="col">'+regions+'</div><div class="card2"><b>'+reg.n+'</b><span>'+reg.desc+'</span><small>Enemies: '+reg.foes.join(', ')+'</small><div class="btns"><button class="btn" data-a="explore">Explore this region</button><button class="btn alt" data-a="boss" data-i="'+boss.n+'">Challenge: '+boss.n+'</button></div><small>Boss recommendation: combat level '+boss.l+'. Prepare with food, potions, armor, and a forged weapon.</small></div><div class="ttl">Talents</div><p class="ch-note">Skill points come from story quests and first-time boss victories. These bonuses stack with your existing equipment and skill levels.</p><div class="col">'+skills+'</div><div class="ttl">Story quests</div><div class="col">'+(quests||'<div class="card2">The valley is safe. Your chronicle is complete!</div>')+'</div><div class="ttl">Awakened relics</div><div class="card2">'+(st.relics.length?st.relics.map(x=>'✦ '+x).join('<br>'):'Defeat a regional boss to awaken your first relic.')+'</div><p class="ch-note">Your farm, barn, inventory, equipment, dungeons, crafting, and existing saves remain part of the same adventure.</p>';
 }
});
// Add the new tab without replacing the original navigation or views.
// Story Mode entry point and Chronicle tab removed; core RPG and Mine Expedition remain active.


