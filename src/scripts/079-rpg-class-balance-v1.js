
(()=>{'use strict';
const R=Math.random,lv=()=>L('combat'),sc=()=>1+lv()/50,cls=()=>S&&S.cls;
/* ---- weapon families: every class now has a matching weapon type (+15% damage) ---- */
const AP={sword:'blade',katana:'blade',rapier:'blade',spear:'blade',great:'great',axe:'heavy',hammer:'heavy',club:'heavy',dagger:'rogue',bow:'archer',staff:'mage'};
const tag=it=>it?(it.k||AP[it.a]||''):'';
const WT={warrior:['blade','great'],tank:['heavy','great'],archer:['archer'],mage:['mage'],healer:['mage'],rogue:['rogue']};
/* ---- rebalanced stats (power index = damage x survivability, all combat classes ~equal) ---- */
const ST={
 warrior:{atk:.98,hp:10,def:1.08,cr:2,spd:1,d:'Vanguard. Balanced bruiser that grows deadlier as it gets hurt.'},
 tank:{atk:.85,hp:30,def:1.18,cr:0,spd:1.12,d:'Bulwark. Huge survivability, reflects damage, slower strikes.'},
 archer:{atk:.96,hp:0,def:1,cr:8,spd:.95,d:'Ranger. Fast bows, precise shots, bonus arrows.'},
 mage:{atk:1.1,hp:0,def:.92,cr:4,spd:1.05,d:'Arcanist. Magic that bypasses armor, burns foes, fast energy.'},
 rogue:{atk:.88,hp:-4,def:.94,cr:14,spd:.95,d:'Shadowblade. Evasive assassin with true damage and brutal crits.'},
 healer:{atk:.8,hp:0,def:.95,cr:3,spd:1,d:'Cleric. Self-sustaining magic user with a powerful mend.'},
 artisan:{atk:1,hp:10,def:1,cr:0,spd:1,d:'Tinkerer. Crafting master; breaks armor and reinforces gear.'},
 homesteader:{atk:.95,hp:6,def:1,cr:0,spd:1,d:'Provider. Farmer at heart; tough, with restorative meals.'}
};
Object.keys(ST).forEach(k=>{if(CLS[k])Object.assign(CLS[k],ST[k],{wt:WT[k]})});
delete CLS.healer.heal;
/* two outlier daggers were ~2x stronger than gear of the same tier */
const it=id=>IT.find(x=>x.id===id);
if(it('w_ebon'))it('w_ebon').atk=19;if(it('w_birchdag'))it('w_birchdag').atk=7;
if(window.V4&&V4.CB){const B=V4.CB;B.mage.yld.alch=.18;B.homesteader.yld.farm=.16;B.homesteader.yld.barn=.14;B.warrior.yld.smith=.1;B.warrior.yld.mine=.08}
/* ---- per-fight state ---- */
const T={};const clr=()=>Object.assign(T,{cd:0,fort:0,sun:0,mend:0,burn:null,bacc:0,hotT:0,hacc:0});clr();
const heal=p=>{const m=maxHp(),h=Math.max(1,Math.round(m*p));S.hp=Math.min(m,S.hp+h);fx('+'+h,'heal','me')};
function hitF(f,m,o){o=o||{};const crit=R()*100<Math.min(95,critCh()+(o.cr||0));
 let d=CAB.out(atkPow()*m*(.85+R()*.3)*(crit?critMul():1),f);
 const t=o.t||dmgType(),ar=(o.ig||t==='true')?0:t==='magic'?f.def*.5:f.def;
 d=Math.max(1,Math.round(d*30/(30+ar*CAB.fdef())));f.hp=Math.max(0,f.hp-d);
 fx(d,t,'foe',crit);try{crit?SFX.crit():SFX.hit()}catch(_){}anim($('eo'),'hurt');return d}
/* ---- one active ability per class ---- */
const A={
 warrior:{n:'Shield Bash',ic:'wp_gauntlet',cost:30,cd:9,d:'Hit for 1.5x damage, stun the foe for 2s (cancels heavy wind-ups) and guard for 1.2s.',run:(s,f)=>{hitF(f,1.5*s);tele=0;ecd=Math.max(ecd,2);guardT=Math.max(guardT,1.2);fx('Stunned!','info','foe')}},
 tank:{n:'Fortify',ic:'wp_obsshield',cost:35,cd:16,d:'For 6s take 60% less damage, and heal 8% max HP.',run:s=>{T.fort=6;heal(.08*s);fx('Fortified!','info','me')}},
 archer:{n:'Volley',ic:'wp_bow',cost:35,cd:10,d:'Fire 3 arrows at 0.8x damage each. Every arrow can crit.',run:(s,f)=>{for(let i=0;i<3;i++)hitF(f,.8*s)}},
 mage:{n:'Arcane Burst',ic:'gem_arcane',cost:40,cd:12,d:'2.6x magic damage that ignores all armor and ignites the foe.',run:(s,f)=>{hitF(f,2.6*s,{ig:1,t:'magic'});T.burn={t:4,dps:Math.max(1,atkPow()*.3)};T.bacc=0}},
 rogue:{n:'Shadow Strike',ic:'wp_dagger',cost:30,cd:8,d:'Two lightning strikes of 0.95x true damage with +15% crit chance.',run:(s,f)=>{for(let i=0;i<2;i++)hitF(f,.95*s,{ig:1,t:'true',cr:15})}},
 healer:{n:'Divine Mend',ic:'gem_star',cost:40,cd:18,d:'Heal 24% max HP and cleanse poison, burn, bleed and slow.',run:s=>{heal(.24*s);dot.t=0;slowT=0;fx('Cleansed','info','me')}},
 artisan:{n:'Sunder',ic:'wp_hammer',cost:30,cd:10,d:'Hit for 1.2x damage and break the foe armor by 40% for 8s.',run:(s,f)=>{hitF(f,1.2*s);T.sun=8;fx('Armor broken!','info','foe')}},
 homesteader:{n:'Hearty Meal',ic:'wheatsack',cost:30,cd:20,d:'Heal 12% max HP now, then 1.5% per second for 6s.',run:s=>{heal(.12*s);T.hotT=6;T.hacc=0;fx('Hearty Meal','info','me')}}
};
const PS={
 warrior:['Battle Fury: up to +20% damage as your HP drops.','Rally: heal 6% max HP on every kill.'],
 tank:['Iron Skin: take 10% less damage.','Thorns: reflect 20% of damage taken.'],
 archer:['Eagle Eye: foes dodge 12% less.','Double Shot: 15% chance of a bonus arrow.'],
 mage:['Arcane Burn: 20% chance to ignite.','Mana Flow: +1.5 energy per second.'],
 rogue:['Evasion: 12% chance to dodge.','Executioner: +25% damage under 35% foe HP, +15 energy per kill, crits hit +0.25x harder.'],
 healer:['Mending Light: heal 1.2% max HP per hit (once a second).'],
 artisan:['Fine Tuning: +4% damage, +4% defense, +12% armor shield.'],
 homesteader:['Sturdy Stock: +8% max HP.']
};
Object.assign(CAB,{
 match:c=>!!(c.wt&&c.wt.includes(tag(item('w')))),
 mul(k){const c=cls();
  if(k==='atk'){if(c==='warrior')return 1+Math.min(.2,Math.max(0,1-S.hp/maxHp())*.4);if(c==='artisan')return 1.04}
  else if(k==='def'&&c==='artisan')return 1.04;else if(k==='sh'&&c==='artisan')return 1.12;return 1},
 add(k){const c=cls();
  if(k==='hp'&&c==='homesteader')return Math.round(.08*(20+2*lv()+item('a').hp));
  if(k==='acc'&&c==='archer')return .12;if(k==='enr'&&c==='mage')return 1.5;if(k==='cdm'&&c==='rogue')return .25;return 0},
 out(d,f){return cls()==='rogue'&&f&&f.hp<f.max*.35?d*1.25:d},
 fdef:()=>T.sun>0?.6:1,
 dodge(f,h){if(cls()!=='rogue'||R()>=(h?.06:.12))return false;fx('Dodge!','info','me');return true},
 inc(d){const c=cls();if(c==='tank')d*=.9;if(T.fort>0)d*=.4;return Math.max(1,Math.round(d))},
 hurt(d,f){if(cls()==='tank'&&f&&f.hp>0){const r=Math.max(1,Math.round(d*.2*sc()));f.hp=Math.max(0,f.hp-r);fx(r,'true','foe')}},
 hit(d,crit,dt,h,f){const c=cls();
  if(c==='healer'&&T.mend<=0){heal(.012*sc());T.mend=1}
  if(c==='archer'&&!h&&f.hp>0&&R()<.15){fx('Double shot','info','foe');hitF(f,.6)}
  if(c==='mage'&&f.hp>0&&R()<.2){T.burn={t:3,dps:Math.max(1,d*.25)};T.bacc=0}},
 kill(){const c=cls();if(c==='warrior')heal(.06*sc());if(c==='rogue')en=Math.min(100,en+15)},
 reset:clr,
 tick(dt){const f=fight;if(!f)return;
  T.cd=Math.max(0,T.cd-dt);T.fort-=dt;T.sun-=dt;T.mend-=dt;en=Math.min(100,en+CAB.add('enr')*dt);
  if(T.burn&&T.burn.t>0){T.burn.t-=dt;T.bacc+=dt;if(T.bacc>=1){T.bacc-=1;const n=Math.max(1,Math.round(T.burn.dps));f.hp=Math.max(0,f.hp-n);fx(n,'magic','foe')}}
  if(T.hotT>0){T.hotT-=dt;T.hacc+=maxHp()*.015*sc()*dt;if(T.hacc>=1){const n=Math.floor(T.hacc);T.hacc-=n;S.hp=Math.min(maxHp(),S.hp+n);fx('+'+n,'heal','me')}}
  const a=A[cls()],b=a&&document.querySelector('.v4ab[data-a="cab"] small');
  if(b){const t=String(T.cd>0?Math.ceil(T.cd)+'s':a.cost);if(b.textContent!==t)b.textContent=t;b.parentNode.classList.toggle('cdn',T.cd>0)}},
 use(){const f=fight,a=A[cls()];if(!f||f.dead||!a)return false;
  if(T.cd>0){say(a.n+' is recharging ('+Math.ceil(T.cd)+'s).');SFX.err();return false}
  if(en<a.cost){say(a.n+' needs '+a.cost+' energy.');SFX.err();return false}
  en-=a.cost;T.cd=a.cd;say(a.n+'!');a.run(sc(),f);upd();return f.hp<=0?foeDown():false},
 btn(){const a=A[cls()];return a?'<button class="v4ab" data-a="cab" data-need="'+a.cost+'" title="'+a.d+'">'+icon('spr:'+a.ic)+'<em>'+a.n+'</em><small>'+a.cost+'</small></button>':''},
 lines(k){const a=A[k];return a?['★ '+a.n+' ('+a.cost+' energy, '+a.cd+'s): '+a.d].concat((PS[k]||[]).map(x=>'◆ '+x)):[]}
});
const st=document.createElement('style');st.textContent='.v4ab.cdn{opacity:.55}.v4cg{grid-template-columns:repeat(auto-fill,minmax(230px,1fr))!important}.v4k li{line-height:1.3}';document.head.appendChild(st);
window.CAB=CAB;
})();
