/* ---------- scenes ---------- */
const bar=(p,c)=>'<div class="bar2 '+(c||'')+'"><i style="width:'+Math.max(0,p*100)+'%"></i></div>';
const stage=(cls,a,bgk,obj,extra,tip,boss)=>'<div class="stage '+cls+'" id="stg" data-a="'+a+'">'+bg(bgk,boss)+'<div class="obj '+(extra||'')+'" id="eo">'+obj+'</div>'+tip+'</div>';
const hb=(l,c,a,b)=>'<div class="hb"><span>'+l+'</span><div class="bar2 '+c+'"><i id="'+a+'"></i></div><b id="'+b+'"></b></div>';
const hud=f=>'<div class="hud">'+hb('HP','hp','php','pht')+(maxSh()?hb('Shield','sh','psh','psht'):'')+hb('Energy','en','pen','pent')+(f?hb('Attack','cd','cdf','cdt'):'')+'</div><p class="h" id="st"></p><p class="h">ATK '+atkPow().toFixed(1)+'   DEF '+defn().toFixed(1)+'   CRIT '+critCh().toFixed(1)+'%</p><p class="h" id="bf"></p>'+(f?'<div class="btns"><button class="btn" data-a="power">Power Strike 30</button><button class="btn" data-a="guard">Guard 20</button><button class="btn" data-a="focus">Focus 40</button></div>':'')+'<div class="btns"><button class="btn alt" data-a="eat">Eat food</button><button class="btn alt" id="bPot" data-a="potion"></button>'+(f&&!S.dg?'<button class="btn alt" data-a="flee">Flee</button>':'')+'</div>';
const ownTag=n=>n>0?'Own ×'+n:'';
const pc=x=>Math.round(x*10)/10;
const perks=()=>{const l=k=>L(k);return [
 ['farm','Grows '+pc((farmGrow()+.08*S.up.can)*100)+'% faster, '+pc((.4*l('farm')+6*S.up.fert))+'% double harvest, crops sell +'+pc(.5*l('farm')+4*S.up.scare)+'%'],
 ['barn','Animals '+pc((Math.min(.4,.005*l('barn'))+.1*S.up.trough)*100)+'% faster, '+pc(.4*l('barn')+6*S.up.brush)+'% double goods, goods sell +'+pc(.5*l('barn'))+'%'],
 ['fish',Math.round(60/spawnGap())+' fish/min, '+pc(.4*l('fish')+4*S.up.rod)+'% extra fish, fish sell +'+pc(.5*l('fish'))+'%'],
 ['mine','Rocks '+pc((Math.min(.4,.005*l('mine'))+.08*S.up.gloves)*100)+'% easier, '+pc(.4*l('mine')+6*S.up.lantern)+'% double ore, ore sells +'+pc(.5*l('mine')+4*S.up.cart)+'%'],
 ['smith',hitsNeed(l('smith'))+' hit(s) per item, recipes '+pc((Math.min(.3,.004*l('smith'))+.07*S.up.tongs)*100)+'% cheaper, '+pc(.3*l('smith')+6*S.up.bellows)+'% bonus item, gear sells +'+pc(.5*l('smith')+4*S.up.furnace)+'%'],
 ['alch',hitsNeed(l('alch'))+' stir(s) per brew, '+pc(.4*l('alch')+8*S.up.cauldron)+'% double brew, potions '+pc(.5*l('alch'))+'% stronger'],
 ['combat','Per 10 levels: +1 damage, +1% crit chance, +0.5 crit multiplier. Now +'+pc(l('combat')/10)+' dmg, +'+pc(l('combat')/10)+'% crit, x'+pc(critMul())+' crits, +'+2*l('combat')+' HP'],
 ['trade','Caravans '+pc((Math.min(.4,.005*l('trade'))+.08*S.up.horse)*100)+'% faster, hauls +'+pc(l('trade')+10*S.up.wagon)+'%, bandits -'+pc(3*S.up.guard+.1*l('trade'))+'%, +'+pc(3*S.up.ledger)+'% coins']]};
const VIEWS={
 fish(){
  school=[];combo=0;spawnT=0;
  return skillBar('fish')+'<div class="stage s-fish" id="stg" data-a="miss">'+bg('fish')+'<div id="lake"></div><div class="tip" id="combo" style="position:absolute;top:8px;left:0;right:0;z-index:3">Combo x0</div></div><p class="h">Tap the fish as they swim by. Chain catches for combo bonuses. Higher levels spawn fish faster and unlock bigger fish.</p>';
 },
 mine(){
  const o=ORES[rock.t];
  return skillBar('mine')+stage('s-mine','mine','mine',oIcon(o,'art'),'pop','<div class="tip">'+o.n+' vein</div><div class="mbar">'+bar(rock.hp/rock.max)+'</div><div class="tip">Tap the rock to mine it</div>')+'<p class="h">'+item('p').n+', mining power '+item('p').pw+'.</p>';
 },
 smith(){
  const cats=[['bar','Smelter'],['w','Weapons'],['a','Armor'],['p','Tools']];
  const chips='<div class="btns">'+cats.map(c=>'<button class="btn '+(c[0]===forgeCat?'':'alt')+'" data-a="cat" data-i="'+c[0]+'">'+c[1]+'</button>').join('')+'</div>';
  const sel=IT.find(x=>x.id===forgeSel&&x.r);
  const tip=sel?'<div class="tip">Forging '+sel.n+'</div><div class="tip">'+need(sel)+'</div><div class="tip">'+'●'.repeat(forgeHits)+'○'.repeat(hitsNeed(L('smith'))-forgeHits)+'  Tap the anvil to hammer</div>':'<div class="tip">Choose an item below, then tap the anvil</div>';
  const list=IT.filter(i=>i.c===forgeCat&&i.r&&!i.x).map(i=>'<button class="rec'+(sel&&sel.id===i.id?' on':'')+(L('smith')>=i.l?'':' dim')+'" data-a="rec" data-i="'+i.id+'">'+iIcon(i)+'<div><b>'+i.n+'</b><small>'+stat(i)+'</small><small>'+needHtml(i)+'</small></div><span class="tag">'+ownTag(cnt(i.id))+'</span></button>').join('');
  return skillBar('smith')+stage('s-forge','anvil','forge',icon('anvil',0,'art'),'pop',tip)+chips+'<div class="col">'+list+'</div><p class="h">You can craft the same item again and again. Spare copies go to your Pack, where you can sell them.</p>';
 },
 alch(){
  const sel=POTS.find(p=>p.id===brewSel);
  const tip=sel?'<div class="tip">Brewing '+sel.n+'</div><div class="tip">'+sel.r.map(x=>x[1]+' '+nm(x[0])).join(', ')+'</div><div class="tip">'+'●'.repeat(brewHits)+'○'.repeat(hitsNeed(L('alch'))-brewHits)+'  Tap the cauldron to stir</div>':'<div class="tip">Choose a recipe below, then tap the cauldron</div>';
  const list=POTS.map(p=>'<div class="rowd"><button class="rec'+(brewSel===p.id?' on':'')+(L('alch')>=p.l?'':' dim')+'" data-a="bsel" data-i="'+p.id+'">'+icon('flask',p.col)+'<div><b>'+p.n+'</b><small>'+p.d+'</small><small>Alchemy '+p.l+'</small><small><span class="reqs">'+p.r.map(x=>'<span class="rq">'+gIcon(x[0])+'<b>'+x[1]+'</b></span>').join('')+'</span></small></div><span class="tag">'+ownTag(inv(p.id))+'</span></button>'+(inv(p.id)?'<button class="btn alt" data-a="drink" data-i="'+p.id+'">Drink</button>':'')+'</div>').join('');
  return skillBar('alch')+'<p class="h">'+buffText()+'</p>'+stage('s-forge','cauldron','brew',icon('cauldron',0,'art'),'pop',tip)+'<div class="col">'+list+'</div>';
 },
 fight(){
  const h=skillBar('combat');
  if(!fight)return h+stage('s-road','explore','road',icon('road',0,'art'),'pop','<div class="tip">Tap the road to explore</div><div class="tip">'+(S.kills%6===5?'A boss awaits ahead!':'Boss in '+(5-S.kills%6)+' fights')+'</div>')+hud(false);
  return h+stage('s-fight','atk','arena',mon(fight.a),'','<div class="tip" id="etxt"></div><div class="mbar"><div class="bar2 hp"><i id="ehp"></i></div></div><div class="mbar"><div class="bar2 ec"><i id="ef"></i></div></div><div class="tip">Tap the enemy to attack</div>'+(window.V4&&V4.fightOverlay?V4.fightOverlay():'<div class="me" id="me">'+mon(HERO,'')+'</div>')+'',fight.b)+hud(true);
 },
 market(){
  const ids=[...ORES.map(o=>o.id),...Object.keys(MATS),...FISH.map(f=>f.id)].filter(id=>inv(id)>0);
  let h='<div class="ttl">Sell materials</div>'+(ids.length?ids.map(id=>'<div class="rowd"><div class="rec">'+gIcon(id)+'<div><b>'+nm(id)+' ×'+inv(id)+'</b><small>'+earn(VAL[id])+' coins each</small></div></div><button class="btn alt" data-a="s1" data-i="'+id+'">Sell 1</button><button class="btn alt" data-a="sa" data-i="'+id+'">All</button></div>').join(''):'<p class="h">Nothing to sell yet. Farm, fish, mine and fight to collect materials. Spare weapons and armor are sold from the Pack.</p>');
  h+='<div class="ttl">Supplies</div><button class="rec" data-a="buy" data-i="pot">'+icon('flask','#ff6b8a')+'<div><b>Minor Healing Potion</b><small>Heals 40 HP. You have '+inv('pot_hp1')+'</small></div><span class="tag">25 coins</span></button>';
  UPG.forEach(g=>{h+='<div class="ttl">'+g[0]+' upgrades</div>'+g[1].map(u=>{const l=S.up[u.k],mx=u.max||5;return '<button class="rec" data-a="buy" data-i="'+u.k+'">'+icon(u.ic,u.col)+'<div><b>'+u.n+' '+l+'/'+mx+'</b><small>'+u.d+'</small></div><span class="tag">'+(l>=mx?'Maxed':u.cost[l]+' coins')+'</span></button>'}).join('')});
  return h;
 },
 pack(){
  const eq=['w','a','p'].map(k=>{const it=item(k);return '<button class="slot" data-a="info" data-i="'+it.id+'">'+iIcon(it)+'<span>'+it.n+'</span></button>'}).join('');
  const st=[['ATK',atkPow()],['Speed',(1/wInt()).toFixed(1)+'/s'],['Crit',critCh()+'%'],['Defense',defn()],['HP',maxHp()],['Shield',maxSh()]].map(a=>'<div class="slot"><span>'+a[0]+'</span><b>'+a[1]+'</b></div>').join('');
  const gear=IT.filter(i=>cnt(i.id)>0).map(i=>{const e=S.eq[i.c]===i.id,free=cnt(i.id)-(e?1:0);return '<div class="rowd"><button class="rec'+(e?' eq':'')+'" data-a="equip" data-i="'+i.id+'">'+iIcon(i)+'<div><b>'+i.n+' ×'+cnt(i.id)+'</b><small>'+stat(i)+'</small></div><span class="tag">'+(e?'Equipped':'Equip')+'</span></button>'+(i.v&&free>0?'<button class="btn alt" data-a="selli" data-i="'+i.id+'">Sell '+earn(i.v)+'</button>':'')+'</div>'}).join('');
  const pots=POTS.filter(p=>inv(p.id)>0).map(p=>'<button class="slot" data-a="info" data-i="'+p.id+'">'+icon('flask',p.col)+'<span>'+p.n+' ×'+inv(p.id)+'</span></button>').join('');
  const mats=[...ORES.map(o=>o.id),...Object.keys(MATS),...FISH.map(f=>f.id)].filter(id=>inv(id)>0).map(id=>'<button class="slot" data-a="info" data-i="'+id+'">'+gIcon(id)+'<span>'+nm(id)+' ×'+inv(id)+'</span></button>').join('');
  return '<div class="hero">'+mon(HERO,'art')+'<div class="info"><div>Combat level '+L('combat')+', '+S.kills+' wins</div><div class="bar2 hp"><i id="php"></i></div><div id="pht"></div></div></div>'
   +'<div class="ttl">Stats</div><div class="slots">'+st+'</div><div class="ttl">Equipped</div><div class="slots">'+eq+'</div><div class="ttl">Gear in your bag</div><div class="col">'+gear+'</div>'
   +'<div class="ttl">Potions</div>'+(pots?'<div class="slots">'+pots+'</div>':'<p class="h">No potions yet. Brew some in the Brew tab.</p>')+'<p class="h">'+buffText()+'</p>'
   +'<div class="ttl">Materials</div>'+(mats?'<div class="slots">'+mats+'</div>':'<p class="h">Nothing yet.</p>')
   +'<div class="ttl">Skills and perks</div><div class="col">'+perks().map(p=>skillBar(p[0])+'<p class="h">'+p[1]+'</p>').join('')+'</div>';
 }
};
Object.assign(VIEWS,{
 alch(){
  const sel=ALLR.find(p=>p.id===brewSel),fmt=p=>reqText(p.r);
  const tip=sel?'<div class="tip">Brewing '+sel.n+'</div><div class="tip">'+fmt(sel)+'</div><div class="tip">'+'●'.repeat(brewHits)+'○'.repeat(hitsNeed(L('alch'))-brewHits)+'  Tap the cauldron to stir</div>':'<div class="tip">Choose a recipe below, then tap the cauldron</div>';
  const row=p=>'<div class="rowd"><button class="rec'+(brewSel===p.id?' on':'')+(L('alch')>=p.l?'':' dim')+'" data-a="bsel" data-i="'+p.id+'">'+gIcon(p.id)+'<div><b>'+p.n+'</b><small>'+p.d+'</small><small>Alchemy '+p.l+': '+fmt(p)+'</small></div><span class="tag">'+ownTag(inv(p.id))+'</span></button>'+((p.heal||p.sh||p.buff)&&inv(p.id)?'<button class="btn alt" data-a="drink" data-i="'+p.id+'">Drink</button>':'')+'</div>';
  return skillBar('alch')+'<p class="h">'+buffText()+'</p>'+stage('s-forge','cauldron','brew',icon('cauldron',0,'art'),'pop',tip)+'<div class="ttl">Potions</div><div class="col">'+POTS.map(row).join('')+'</div><div class="ttl">Fertilizers</div><p class="h">Spend them when planting in the Farm tab. Animals make manure, the base ingredient.</p><div class="col">'+FERTS.filter(f=>f.r).map(row).join('')+'</div>';
 },
 market(){
  const ids=[...ORES.map(o=>o.id),...Object.keys(MATS),...FISH.map(f=>f.id)].filter(id=>inv(id)>0);
  let h='<div class="ttl">Sell materials</div>'+(ids.length?ids.map(id=>'<div class="rowd"><div class="rec">'+gIcon(id)+'<div><b>'+nm(id)+' ×'+inv(id)+'</b><small>'+earn(VAL[id]*(catOf(id)==='mine'?1+.04*S.up.cart:1),catOf(id))+' coins each</small></div></div><button class="btn alt" data-a="s1" data-i="'+id+'">Sell 1</button><button class="btn alt" data-a="sa" data-i="'+id+'">All</button></div>').join(''):'<p class="h">Nothing to sell yet. Spare weapons and armor are sold from the Pack. Travelling merchants can sell for more in the Trade tab.</p>');
  h+='<div class="ttl">Supplies</div><button class="rec" data-a="buy" data-i="pot">'+icon('flask','#ff6b8a')+'<div><b>Minor Healing Potion</b><small>Heals 40 HP. You have '+inv('pot_hp1')+'</small></div><span class="tag">25 coins</span></button>';
  UPG.forEach(g=>{h+='<div class="ttl">'+g[0]+' upgrades</div>'+g[1].map(u=>{const l=S.up[u.k],nmx=u.n[Math.min(u.n.length-1,Math.floor(l/2))];return '<button class="rec" data-a="buy" data-i="'+u.k+'">'+icon(u.ic,u.col)+'<div><b>'+nmx+' '+l+'/'+u.max+'</b><small>'+u.d+'</small></div><span class="tag">'+(l>=u.max?'Maxed':u.cost[l]+' coins')+'</span></button>'}).join('')});
  return h;
 },
 pack(){
  const eq=['w','a','p'].map(k=>{const it=item(k);return '<button class="slot" data-a="info" data-i="'+it.id+'">'+iIcon(it)+'<span>'+it.n+'</span></button>'}).join('');
  const st=[['ATK',atkPow().toFixed(1)],['Speed',(1/wInt()).toFixed(1)+'/s'],['Crit',critCh().toFixed(1)+'%'],['Crit dmg','x'+pc(critMul())],['Defense',defn().toFixed(1)],['HP',maxHp()],['Shield',maxSh()]].map(a=>'<div class="slot"><span>'+a[0]+'</span><b>'+a[1]+'</b></div>').join('');
  const gear=IT.filter(i=>cnt(i.id)>0).map(i=>{const e=S.eq[i.c]===i.id,free=cnt(i.id)-(e?1:0);return '<div class="rowd"><button class="rec'+(e?' eq':'')+'" data-a="equip" data-i="'+i.id+'">'+iIcon(i)+'<div><b>'+i.n+' ×'+cnt(i.id)+'</b><small>'+stat(i)+'</small></div><span class="tag">'+(e?'Equipped':'Equip')+'</span></button>'+(i.v&&free>0?'<button class="btn alt" data-a="selli" data-i="'+i.id+'">Sell '+earn(i.v*(1+.04*S.up.furnace),'smith')+'</button>':'')+'</div>'}).join('');
  const ids=[...ORES.map(o=>o.id),...Object.keys(MATS),...FISH.map(f=>f.id),...POTS.map(p=>p.id),...FERTS.filter(f=>f.r).map(f=>f.id),...TRADE.map(t=>t.id)].filter(id=>inv(id)>0);
  const cells=ids.map(id=>'<button class="sq" data-a="info" data-i="'+id+'">'+gIcon(id)+'<span class="cnt">'+inv(id)+'</span></button>');
  while(cells.length<25||cells.length%5)cells.push('<div class="sq empty"></div>');
  return '<div class="hero">'+mon(HERO,'art')+'<div class="info"><div>Combat level '+L('combat')+', '+S.kills+' wins</div><div class="bar2 hp"><i id="php"></i></div><div id="pht"></div></div></div>'
   +'<div class="ttl">Stats</div><div class="slots">'+st+'</div><div class="ttl">Equipped</div><div class="slots">'+eq+'</div>'
   +'<div class="ttl">Backpack</div><div class="inv">'+cells.join('')+'</div><p class="h">Tap a square to see what it is and what it sells for. '+buffText()+'</p>'
   +'<div class="ttl">Gear in your bag</div><div class="col">'+gear+'</div>'
   +'<div class="ttl">Skills and perks</div><div class="col">'+perks().map(p=>skillBar(p[0])+'<p class="h">'+p[1]+'</p>').join('')+'</div>';
 },
 trade(){
  const T=S.trade,cur=town(T.at),trav=!!T.to;if(!T.pr)T.pr=tradePrices(cur);
  let wp=cur;if(trav){const a=town(T.from),b=town(T.to),p=Math.min(1,(Date.now()-T.t0)/(T.dur*1000));wp={x:a.x+(b.x-a.x)*p,y:a.y+(b.y-a.y)*p}}
  const lines=TOWNS.flatMap((a,i)=>TOWNS.slice(i+1).map(b=>'<line x1="'+a.x+'" y1="'+a.y+'" x2="'+b.x+'" y2="'+b.y+'" stroke="#a8743b" stroke-width="1.5" stroke-dasharray="4 4" vector-effect="non-scaling-stroke"/>')).join('');
  const mapbg='<div class="bgs"><img src="'+(window.V4MAP||'')+'" alt="" draggable="false"><svg viewBox="0 0 100 100" preserveAspectRatio="none">'+lines+'</svg></div>';
  const nodes=TOWNS.map(t=>'<button class="town'+(t.id===T.at&&!trav?' here':'')+'" style="left:'+t.x+'%;top:'+t.y+'%" data-a="go" data-i="'+t.id+'">'+icon('town')+'<span>'+t.n+'</span></button>').join('');
  const map='<div class="stage s-map" id="stg" data-a="miss">'+mapbg+nodes+'<div id="wagon" class="wagon" style="left:'+wp.x+'%;top:'+wp.y+'%">'+icon('wagon')+'</div><div class="tip" style="position:absolute;bottom:6px;left:0;right:0;z-index:3;color:#3a2a10;text-shadow:none">'+(trav?'On the road…':'Tap a town to travel there')+'</div></div>';
  if(trav)return skillBar('trade')+map+'<div class="card2">Traveling to '+town(T.to).n+'<div class="bar2"><i id="tbar" style="width:0"></i></div><span id="ttxt"></span></div>';
  const pr=T.pr,hint=g=>{const p=pr[g.id];return p<g.b*.85?'Cheap':p>g.b*1.2?'High':'Fair'};
  const goods=TRADE.map(g=>'<div class="rowd"><div class="rec">'+icon(g.ic,g.col)+'<div><b>'+g.n+' ×'+inv(g.id)+'</b><small>'+pr[g.id]+' coins, '+hint(g)+(inv(g.id)&&S.cost[g.id]?', paid ~'+Math.round(S.cost[g.id]):'')+'</small></div></div><button class="btn alt" data-a="tb" data-i="'+g.id+'">Buy</button><button class="btn alt" data-a="tb10" data-i="'+g.id+'">×10</button><button class="btn alt" data-a="ts" data-i="'+g.id+'">Sell all</button></div>').join('');
  const cats=TCATS.map((c,i)=>'<button class="rec" data-a="tc" data-i="'+i+'">'+gIcon(c[3][0])+'<div><b>Sell all '+c[1].toLowerCase()+'</b><small>Local demand x'+town(T.at).c[i]+'</small></div><span class="tag">'+catTotal(c,i)+' coins</span></button>').join('');
  const hints=TOWNS.filter(t=>t.id!==T.at).map(t=>{const lo=TRADE.filter((g,i)=>t.m[i]<.85).map(g=>g.n),hi=TRADE.filter((g,i)=>t.m[i]>1.25).map(g=>g.n);return '<div class="rec"><div><b>'+t.n+' ('+Math.round(travelTime(cur,t))+'s)</b><small>Cheap: '+(lo.join(', ')||'none')+'</small><small>Pays well for: '+(hi.join(', ')||'none')+'</small></div></div>'}).join('');
  return skillBar('trade')+map+'<div class="ttl">'+cur.n+' market</div><p class="h">Cargo '+cargoUsed()+' / '+cargoCap()+'. Buy cheap here, sell high in another town. Wagon upgrades are in the Shop.</p><div class="col">'+goods+'</div><div class="ttl">Sell your own goods here</div><div class="col">'+cats+'</div><div class="ttl">Other towns</div><div class="col">'+hints+'</div>';
 }
});
Object.assign(VIEWS,{
 fight(){
  const h=skillBar('combat');
  if(fight){const f=fight;return h+stage('s-fight','atk',S.dg?'dungeon':'arena',mon(f.a),'','<div class="tip" id="etxt"></div><div class="mbar"><div class="bar2 hp"><i id="ehp"></i></div></div><div class="mbar"><div class="bar2 ec"><i id="ef"></i></div></div><div class="tip" id="warn" style="color:#ff8a8a;font-weight:700"></div><div class="tip">Tap the enemy to attack</div>'+(window.V4&&V4.fightOverlay?V4.fightOverlay():'<div class="me" id="me">'+mon(HERO,'')+'</div>')+'',f.b)+hud(true)}
  if(S.dg){
    const d=dgDef(),r=DGR[S.dg.room],dots=DGR.map((x,i)=>i<S.dg.room?'●':(i===S.dg.room&&!S.dg.chest?'◆':'○')).join(' ')+(S.dg.chest?'  ★':'');
    let st;
    if(S.dg.chest)st=stage('s-fight','dgchest','treasure',icon('chest',0,'art'),'pop','<div class="tip">The greater boss is down! Tap the chest to open it</div>');
    else if(r==='r')st=stage('s-fight','camp','camp',icon('campfire',0,'art'),'pop','<div class="tip">A safe campfire. Tap it to rest (40% health, full shield)</div>');
    else st=stage('s-fight','dgdoor','dungeon',icon('door',0,'art'),'pop','<div class="tip">Room '+(S.dg.room+1)+' of '+DGR.length+': '+DGN[r]+'</div><div class="tip">Tap the door to enter</div>');
    return h+st+'<div class="card2"><b>'+d.n+'</b><span>'+dots+'</span></div>'+hud(false)+'<div class="btns"><button class="btn alt" data-a="dgout">Leave dungeon</button></div>';
  }
  const list=DG.filter(d=>L('combat')>=d.l).map(d=>'<button class="rec" data-a="dgin" data-i="'+d.id+'">'+mon(FOES.find(f=>f.n===d.final).a,'ic')+'<div><b>'+d.n+'</b><small>Recommended combat level '+d.l+'+. '+DGR.length+' rooms, a boss, a greater boss and a treasure chest.</small><small>Cleared ×'+(S.clears[d.id]||0)+'</small></div><span class="tag">Enter</span></button>').join('');
  return h+stage('s-road','explore','road',icon('road',0,'art'),'pop','<div class="tip">Tap the road to wander and fight</div>')+'<div class="ttl">Dungeons</div>'+(list?'<div class="col">'+list+'</div>':'<p class="h">Wander the road to grow stronger. Dungeons are discovered as your combat level rises.</p>')+hud(false);
 }
});
const TABS=[['farm','sprout','Farm'],['barn','egg','Barn'],['fish','fish','Fish','#8fb3c9'],['mine','pick','Mine','#c9d6e4'],['smith','anvil','Forge'],['alch','flask','Brew','#7ad8ff'],['fight','sword','Fight','#c9d6e4'],['trade','wagon','Trade'],['market','coin','Shop'],['pack','bag','Pack']];
TABS.forEach(([k,i,n,c])=>{const b=document.createElement('button');b.dataset.k=k;b.innerHTML=icon(i,c)+n;b.addEventListener('click',()=>{S.tab=k;SFX.coin();save();render();window.scrollTo(0,0)});$('tabs').appendChild(b)});
const own=()=>S.tab==='farm'||S.tab==='barn';
function rp(){if(!own()){try{$('pane').innerHTML=VIEWS[S.tab]?VIEWS[S.tab]():'';upd()}catch(e){if(window.__ready)throw e}}}
$('pane').addEventListener('click',e=>{
  const b=e.target.closest('[data-a]');if(!b)return;const a=b.dataset.a,i=b.dataset.i;
  const r=({catch:()=>catchFish(i),miss:()=>false,mine:mineAct,explore,atk:attack,eat,potion:useHeal,flee,buy:()=>buy(i),rec:()=>{forgeSel=i;forgeHits=0;SFX.coin()},anvil:anvilAct,cat:()=>{forgeCat=i;forgeSel=null;forgeHits=0},equip:()=>equip(i),selli:()=>sellItem(i),s1:()=>sellMat(i,false),sa:()=>sellMat(i,true),bsel:()=>{brewSel=i;brewHits=0;SFX.coin()},cauldron:cauldronAct,drink:()=>drink(i),go:()=>tradeGo(i),tb:()=>tradeBuy(i,1),tb10:()=>tradeBuy(i,10),ts:()=>tradeSell(i),tc:()=>tradeCat(+i),info:()=>{say(infoText(i));return false},power,guard:guardAct,focus:focusAct,cab:()=>CAB.use(),dgin:()=>dgEnter(i),dgdoor:dgDoor,dgout:dgLeave,dgchest:dgChest,camp:dgCamp,region:()=>chooseRegion(i),talent:()=>buyTalent(i),quest:()=>claimQuest(i),boss:()=>challengeBoss(i)})[a]();
  save();if(r!==false)render();
});
$('mute').addEventListener('click',()=>{S.mute=!S.mute;RA.sync();save();render();SFX.coin()});window.addEventListener('load',()=>RA.wrap(SFX));
$('title').addEventListener('click',()=>{showIntro();$('intro').hidden=false});

function stall(x,k,lab,show,ripe,g){x.b.classList.toggle('ripe',ripe);x.bar.style.display=show?'block':'none';if(show)x.fill.style.width=(g*100)+'%';if(x.k!==k){x.k=k;x.e.innerHTML=k===''?'':k.startsWith('A:')?mon(ANIART[k.slice(2)],'ic'):icon(k)}if(x.l.textContent!==lab)x.l.textContent=lab}
const setT=(el,t)=>{if(el&&el.textContent!==t)el.textContent=t};
function render(){
  $('coins').innerHTML=icon('coin')+S.coins;setT($('mute'),S.mute?'Sound off':'Sound on');
  [...$('tabs').children].forEach(b=>b.classList.toggle('on',b.dataset.k===S.tab));
  $('farm').hidden=S.tab!=='farm';$('barn').hidden=S.tab!=='barn';$('pane').hidden=own();
  if(!own()){rp();return}
  if(S.tab==='barn'){
    $('bsk').innerHTML=skillBar('barn');aEls.forEach((b,i)=>b.classList.toggle('on',i===S.asel));
    bEls.forEach((x,i)=>{const p=S.barn[i];x.b.classList.toggle('locked',i>=cap());
      if(i>=cap())stall(x,'lock','Locked',false,false,0);
      else if(!p)stall(x,'','Empty',false,false,0);
      else{const g=aProg(p);stall(x,'A:'+ANI[p.t].id,g>=1?'Collect':Math.ceil(p.d*(1-g))+'s',true,g>=1,g)}});
    return;
  }
  $('fsk').innerHTML=skillBar('farm');
  fEls.forEach((b,i)=>{b.classList.toggle('on',i===S.fsel);const f=i?FERTS[i-1]:null;setT(b.children[2],f?'×'+inv(f.id):'')});
  const FL=L('farm');
  seedEls.forEach((b,i)=>{b.classList.toggle('on',i===S.sel);setT(b.children[2],FL<CROPS[i].l?'Lv '+CROPS[i].l+' needed':(CROPS[i].give?CROPS[i].cost+' for '+CROPS[i].q+' items':CROPS[i].cost+' to '+CROPS[i].sell))});
  S.plots.forEach((p,i)=>{
    const x=els[i];x.b.classList.toggle('locked',!p.open);
    if(!p.open)stall(x,'lock',unlockCost()+' coins',false,false,0);
    else if(p.c<0)stall(x,'','Empty',false,false,0);
    else{const g=prog(p),crop=CROPS[p.c],artKey=CROP_ART_KEY_BY_NAME[crop.n],stage=Math.min(3,Math.floor(g*4));stall(x,artKey?('pixelcrop:'+artKey+':'+stage):crop.ic,g>=1?'Harvest':Math.ceil(p.d*(1-g))+'s',true,g>=1,g)}
  });
}
render();

