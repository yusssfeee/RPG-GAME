/* ---------- forge ---------- */
let forgeSel=null,forgeHits=0,forgeCat='bar';
const qEff=q=>Math.max(1,Math.ceil(q*(1-Math.min(.3,.004*L('smith'))-.07*S.up.tongs)));
const stat=it=>it.c==='w'?'ATK '+it.atk+'  SPD '+(1/it.sp).toFixed(1)+'/s  CRIT '+it.cr+'%':it.c==='a'?'DEF '+it.def+'  Shield '+it.sh+'  HP +'+it.hp+(it.cr?'  CRIT +'+it.cr+'%':''):'Mining power '+it.pw;
/* have-vs-need display shared by every crafting station */
const hvCls=(h,n)=>h>=n?'ok':'no';
const reqText=(reqs,q,haveFn,nmFn)=>(reqs||[]).map(x=>{const n=Math.ceil(q?q(x[1]):x[1]),h=haveFn?haveFn(x[0]):inv(x[0]);return '<span class="rqt '+hvCls(h,n)+'">'+n+' '+(nmFn||nm)(x[0])+' <em>(have '+h+')</em></span>'}).join(', ');
const coinText=g=>'<span class="rqt '+hvCls(S.coins,g)+'">'+g+' coins <em>(have '+S.coins+')</em></span>';
const need=it=>'Smithing '+it.l+', '+reqText(it.r,qEff)+', '+coinText(it.g);
const needHtml=it=>'<span class="reqs">'+it.r.map(x=>{const n=qEff(x[1]),h=inv(x[0]);return '<span class="rq '+hvCls(h,n)+'" title="'+nm(x[0])+': have '+h+', need '+n+'">'+gIcon(x[0])+'<b>'+h+'/'+n+'</b></span>'}).join('')+'<span class="rq '+hvCls(S.coins,it.g)+'" title="Coins: have '+S.coins+', need '+it.g+'">'+icon('coin')+'<b>'+S.coins+'/'+it.g+'</b></span></span>';
const craftMiss=(label,reqs,coins)=>{
  const miss=[];
  (reqs||[]).forEach(x=>{const needQ=Math.ceil(x[1]),have=inv(x[0]);if(have<needQ)miss.push((needQ-have)+' '+nm(x[0]))});
  if(coins&&S.coins<coins)miss.push((coins-S.coins)+' coins');
  return miss.length?('Still needed for '+label+': '+miss.join(', ')+'.'):('Requires '+label+'.');
};
/* Universal "what am I missing?" message used by every crafting station (forge, smelter, alchemy, cooking, carpentry, woodcraft, arcana, tailoring, leatherworking). */
const missMsg=(skillName,skillKey,needLv,reqs,coins,opt)=>{
  try{
    const q=(opt&&opt.q)||(x=>x),have=(opt&&opt.have)||(id=>inv(id)),nmF=(opt&&opt.nm)||nm;
    const parts=[];
    (reqs||[]).forEach(x=>{const n=Math.ceil(q(x[1])),h=have(x[0]);if(h<n)parts.push((n-h)+' '+nmF(x[0])+' ('+h+'/'+n+')')});
    if(coins&&S.coins<coins)parts.push((coins-S.coins)+' coins ('+S.coins+'/'+coins+')');
    const out=[];
    if(parts.length)out.push('Missing: '+parts.join(', '));
    const lv=(opt&&opt.lv!=null)?opt.lv:(skillKey?L(skillKey):null);
    if(lv!=null&&lv<needLv)out.push(skillName+' level '+needLv+' needed (you have '+lv+')');
    return out.length?out.join(' · ')+'.':'Requirements not met.';
  }catch(e){return 'You are missing materials or the required level.'}
};
const hasMats=it=>it.r.every(x=>inv(x[0])>=qEff(x[1]))&&S.coins>=it.g&&L('smith')>=it.l;
const sc=it=>it.c==='w'?it.atk/it.sp:it.c==='a'?it.def*2+it.sh/2+it.hp/2+(it.cr||0)*2:it.pw*10;
function anvilAct(){
  const it=IT.find(x=>x.id===forgeSel);
  if(!it){say('Choose something to forge from the list below.');SFX.err();return}
  if(!hasMats(it)){forgeHits=0;say(missMsg('Smithing','smith',it.l,it.r,it.g,{q:qEff}));SFX.err();return}
  forgeHits++;SFX.forge();
  if(forgeHits>=hitsNeed(L('smith'))){
    forgeHits=0;it.r.forEach(x=>S.inv[x[0]]-=qEff(x[1]));S.coins-=it.g;
    const n=1+(Math.random()<.003*L('smith')+.06*S.up.bellows?1:0);S.items[it.id]=cnt(it.id)+n;
    let s='Forged '+(n>1?n+'x ':'')+it.n+'.';
    if(sc(it)>sc(item(it.c))){S.eq[it.c]=it.id;s+=' Equipped.'}
    addXp('smith',6+it.l*6);say(s);SFX.lvl();
  }else say('Keep hammering.');
}
function equip(id){const it=IT.find(x=>x.id===id);if(cnt(id)>0&&S.eq[it.c]!==id){S.eq[it.c]=id;say('Equipped '+it.n+'.');SFX.forge()}}
function sellItem(id){const it=IT.find(x=>x.id===id),free=cnt(id)-(S.eq[it.c]===id?1:0);if(!it.v||free<1){say('You can only sell spare copies.');SFX.err();return}S.items[id]--;const m=earn(it.v*(1+.04*S.up.furnace),'smith');S.coins+=m;say('Sold '+it.n+' for '+m+' coins.');SFX.coin()}
function sellMat(id,all){const n=all?inv(id):Math.min(1,inv(id));if(!n)return;S.inv[id]-=n;const m=earn(n*VAL[id]*(catOf(id)==='mine'?1+.04*S.up.cart:1),catOf(id));S.coins+=m;say('Sold '+n+' '+nm(id)+' for '+m+' coins.');SFX.coin()}

