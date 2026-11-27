/* ---------- barn v2: feeding, mood, petting ---------- */
const FEEDS=[['hay','Hay',35,0],['clover','Clover',50,10],['corn','Corn',70,5]];
S.bfeed=S.bfeed||'hay';S.bmode=S.bmode||'pet';
const bst=p=>{if(p.f==null){p.f=60;p.m=50}return p};
function feedA(p){const f=FEEDS.find(x=>x[0]===S.bfeed);if(inv(f[0])<1){say('No '+f[1]+'. Grow some in the Farm tab.');SFX.err();return}if(p.f>=98){say('It is full.');return}S.inv[f[0]]--;p.f=Math.min(100,p.f+f[2]);p.m=Math.min(100,p.m+f[3]);say('Fed the '+ANI[p.t].n+' with '+f[1]+'.');SFX.eat()}
function petA(p){const n=Date.now();if(n-(p.pc||0)<2500){say('Let it rest a moment.');return}p.pc=n;p.m=Math.min(100,p.m+6);if(p.f>0)p.at-=1500;say('You pet the '+ANI[p.t].n+(p.f>0?'. It works a little faster.':'. It looks hungry.'));SFX.water()}
tapStall=function(i){if(i>=cap()){say('Buy an Extra Stall in the Upgrades tab to unlock this one.');SFX.err();return}const p=S.barn[i];
 if(!p){const a=ANI[S.asel];if(S.coins<a.cost){say('A '+a.n+' costs '+a.cost+' coins.');SFX.err()}else{S.coins-=a.cost;S.barn[i]={t:S.asel,at:Date.now(),d:aDur(a),f:60,m:50};SFX.coin()}}
 else if(aProg(bst(p))>=1){const a=ANI[p.t],q=Math.random()<.004*L('barn')+.06*S.up.brush+(p.m>=60?.1:0)?2:1;let s='Collected';a.give.forEach(id=>{S.inv[id]=inv(id)+q;s+=' '+q+' '+nm(id)});if(a.extra&&Math.random()<a.extra[1]){S.inv[a.extra[0]]=inv(a.extra[0])+1;s+=' and a '+nm(a.extra[0])}if(Math.random()<Math.min(1,.5+.08*S.up.bin)){S.inv.manure=inv('manure')+q;s+=' and '+q+' manure'}if(q>1)toast('Double harvest!'+(p.m>=60?' (happy animal)':''),'bonus');addXp('barn',3+ANI.indexOf(a)*2);say(s+'.');SFX.harvest();p.at=Date.now();p.d=aDur(a);p.m=Math.max(0,p.m-10)}
 else if(S.bmode==='feed')feedA(bst(p));else petA(bst(p));
 save();render()};
setInterval(()=>{S.barn.forEach(p=>{if(!p)return;bst(p);if(aProg(p)>=1)return;if(p.f>0)p.f=Math.max(0,p.f-.5);else{p.at+=1000;p.m=Math.max(0,p.m-.4)}})},1000);
const _st=stall;stall=function(x,k,lab,show,ripe,g){const i=bEls.indexOf(x),p=i>=0&&k.startsWith('A:')?S.barn[i]:null;if(p){bst(p);lab+=p.f<=0&&!ripe?' Hungry':' '+'♥'.repeat(1+Math.floor(p.m/34))}_st(x,k,lab,show,ripe,g)};
function drawBx(){const b=$('bx');if(!b)return;b.innerHTML='<div class="btns"><button class="btn '+(S.bmode==='pet'?'':'alt')+'" data-x="bmode" data-i="pet">Pet</button><button class="btn '+(S.bmode==='feed'?'':'alt')+'" data-x="bmode" data-i="feed">Feed</button></div>'+(S.bmode==='feed'?'<div class="col">'+FEEDS.map(f=>'<button class="rec'+(S.bfeed===f[0]?' on':'')+'" data-x="bfeed" data-i="'+f[0]+'"><div><b>'+f[1]+' ×'+inv(f[0])+'</b><small>Food +'+f[2]+(f[3]?', mood +'+f[3]:'')+'</small></div></button>').join('')+'</div>':'')+'<p class="h">Pick an animal and tap a stall to buy it. Hungry animals stop working. Petting makes them faster and happier, and happy animals (♥♥♥) double their harvest more often. Grow Hay, Clover and Corn in the Farm tab.</p>'}
const _r=render;render=function(){_r();if(S.tab==='barn')drawBx()};
$('barn').addEventListener('click',e=>{const b=e.target.closest('[data-x]');if(!b)return;if(b.dataset.x==='bmode')S.bmode=b.dataset.i;else if(b.dataset.x==='bfeed')S.bfeed=b.dataset.i;else return;save();render()});
