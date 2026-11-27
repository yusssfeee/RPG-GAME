
(()=>{
  const feed=[];
  const rarityName=id=>{const it=IT.find(x=>x.id===id);if(!it)return 'Gear';return it.l>=15?'Legendary':it.l>=11?'Epic':it.l>=7?'Rare':it.l>=4?'Uncommon':'Common'};
  const iconFor=id=>{
    const it=IT.find(x=>x.id===id);
    if(it)return iIcon(it);
    try{return gIcon(id)}catch(e){return icon('chest','#d6ad62')}
  };
  const panel=()=>{
    const rows=feed.slice(0,8);
    return '<section id="battle-loot-feed"><div class="bl-head"><b>⚔ Battle spoils</b><small>Latest drops · shown here after every victory</small></div>'+
      (rows.length?'<div class="bl-list">'+rows.map(x=>'<div class="bl-item '+(x.gear?'gear':'')+' '+(x.rare?'rare':'')+'">'+x.icon+'<span><strong>'+x.name+(x.qty>1?' ×'+x.qty:'')+'</strong><small>'+x.kind+'</small></span></div>').join('')+'</div>':'<div class="bl-empty">No loot yet. Defeat a creature to reveal its drops here.</div>')+'</section>';
  };
  const push=(entry)=>{feed.unshift(entry);while(feed.length>8)feed.pop()};
  const oldDown=foeDown;
  foeDown=function(){
    const f=fight;
    if(!f||f.dead||f.hp>0)return oldDown.apply(this,arguments);
    const beforeInv={...S.inv},beforeItems={...S.items};
    const result=oldDown.apply(this,arguments);
    if(!result)return result;
    const gearChance=f.fin?.42:f.b?.30:f.elite?.12:.055;
    if(Math.random()<gearChance){
      const low=Math.max(1,(f.l||1)-4),high=(f.l||1)+2;
      let pool=IT.filter(it=>(it.c==='w'||it.c==='a')&&it.r&&it.l>=low&&it.l<=high&&it.l>0);
      if(!pool.length)pool=IT.filter(it=>(it.c==='w'||it.c==='a')&&it.r&&it.l>0&&it.l<=high);
      if(pool.length){
        const chosen=pool[Math.floor(Math.random()*pool.length)];
        S.items[chosen.id]=(S.items[chosen.id]||0)+1;
        push({name:chosen.n,qty:1,kind:(chosen.c==='w'?'Weapon':'Armor')+' · '+rarityName(chosen.id),icon:iconFor(chosen.id),gear:true,rare:true});
        try{tone(740,.16,'triangle',.045,260);tone(1110,.22,'sine',.035,0,.08)}catch(e){}
        toast('<b style="color:#ffdc91">Gear found!</b> '+chosen.n+' — check your Pack','reward','#d6ad62');
      }
    }
    const ids=new Set([...Object.keys(beforeInv),...Object.keys(S.inv)]);
    for(const id of ids){
      if(id==='pot_hp1')continue;
      const q=(S.inv[id]||0)-(beforeInv[id]||0);
      if(q>0)push({name:nm(id),qty:q,kind:'Monster material',icon:iconFor(id),gear:false,rare:(rar(id)[2]>=12)});
    }
    if(inv('pot_hp1')>(beforeInv.pot_hp1||0))push({name:'Minor Healing Potion',qty:inv('pot_hp1')-(beforeInv.pot_hp1||0),kind:'Consumable',icon:icon('flask','#ff8295'),gear:false});
    const latest=feed.slice(0,8);
    if(latest.length){try{tone(520,.12,'triangle',.035,220);tone(780,.16,'sine',.025,0,.09)}catch(e){}}
    save();
    return result;
  };

  const oldStart=startFight;
  startFight=function(f){
    oldStart(f);
    if(!f)return;
    const n=String(f.n||'').toLowerCase();
    let base=150,shape='sawtooth',bend=-70;
    if(/slime|ooze/.test(n)){base=390;shape='sine';bend=-210}
    else if(/wolf|spider|bat|rat/.test(n)){base=260;shape='triangle';bend=-125}
    else if(/ghost|lich|skeleton|wraith|bone/.test(n)){base=520;shape='sine';bend=-390}
    else if(/golem|titan|colossus|troll/.test(n)){base=82;shape='square';bend=-32}
    else if(/dragon|infernal|orc|wyrm/.test(n)){base=115;shape='sawtooth';bend=-55}
    tone(base,.32,shape,.035,bend);
    tone(base*1.48,.24,'triangle',.018,-base*.5,.08);
  };
  const oldStrike=strike;
  strike=function(mult,heavy){
    if(fight){tone(heavy?260:390,heavy?.22:.11,'sawtooth',heavy?.035:.022,heavy?-190:-240);tone(heavy?90:150,.12,'sine',.018,-70,.035)}
    return oldStrike.apply(this,arguments);
  };
  const oldEnemyAttack=enemyAttack;
  enemyAttack=function(heavy){
    if(fight){
      const n=String(fight.n||'').toLowerCase();
      const f=/dragon|infernal|imp/.test(n)?105:/wolf|spider|bat/.test(n)?310:/ghost|lich/.test(n)?620:/golem|titan|troll/.test(n)?75:185;
      tone(f,heavy?.36:.19,'sawtooth',heavy?.045:.026,heavy?-f*.65:-f*.45);
    }
    return oldEnemyAttack.apply(this,arguments);
  };
  const oldView=VIEWS.fight;
  VIEWS.fight=function(){return oldView.apply(this,arguments)+panel()};
  window.BattleLootV6={getRecent:()=>feed.slice()};
})();
