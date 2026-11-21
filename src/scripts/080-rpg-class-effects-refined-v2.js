
(()=>{
 'use strict';
 if(!window.CAB||typeof CAB.use!=='function')return;
 const css=document.createElement('style');
 css.textContent=`
  .fx{animation-duration:.56s!important}
  .fx.crit{animation-duration:.62s!important}
  .rpg-class-impact{position:absolute;z-index:7;pointer-events:none;width:116px;height:116px;display:grid;place-items:center;transform:translate(-50%,-50%);animation:rpgImpactOut .48s ease-out forwards;filter:drop-shadow(0 2px 4px #0008)}
  .rpg-class-impact svg{width:100%;height:100%;overflow:visible}
  .rpg-class-impact path,.rpg-class-impact circle,.rpg-class-impact ellipse{vector-effect:non-scaling-stroke}
  .rpg-class-impact.warrior{color:#ffc46b}.rpg-class-impact.tank{color:#82cfff}.rpg-class-impact.archer{color:#b7ef8c}.rpg-class-impact.mage{color:#caa1ff}.rpg-class-impact.rogue{color:#c7a0ff}.rpg-class-impact.healer{color:#8de9b6}
  @keyframes rpgImpactOut{0%{opacity:0;transform:translate(-50%,-50%) scale(.72)}22%{opacity:.95;transform:translate(-50%,-50%) scale(1)}100%{opacity:0;transform:translate(-50%,-50%) scale(1.12)}}
  .rpg-impact-target{animation:rpgTargetPulse .32s ease-out!important}
  @keyframes rpgTargetPulse{0%,100%{filter:none}35%{filter:brightness(1.35)}}
 `;
 document.head.appendChild(css);
 const marks={
  warrior:'<path d="M9 45L48 10M17 53L56 18" stroke="currentColor" stroke-width="4" stroke-linecap="round"/><path d="M7 33Q29 7 57 10" fill="none" stroke="currentColor" stroke-width="2" opacity=".65"/>',
  tank:'<path d="M32 7L53 15V31Q50 48 32 57Q14 48 11 31V15Z" fill="none" stroke="currentColor" stroke-width="3.5"/><path d="M32 16V47M17 31H47" stroke="currentColor" stroke-width="3"/>',
  archer:'<path d="M7 18L52 32L7 46M17 8L61 32L17 56" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>',
  mage:'<circle cx="32" cy="32" r="20" fill="none" stroke="currentColor" stroke-width="2.5"/><path d="M32 5L37 25L57 32L37 39L32 59L27 39L7 32L27 25Z" fill="none" stroke="currentColor" stroke-width="2.5"/>',
  rogue:'<path d="M12 10L48 50M24 7L55 38M8 26L38 56" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/>',
  healer:'<path d="M25 9H39V25H55V39H39V55H25V39H9V25H25Z" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="32" cy="32" r="25" fill="none" stroke="currentColor" stroke-width="1.5" opacity=".6"/>'
 };
 function showClassImpact(k){
  const stage=document.getElementById('stg');if(!stage)return;
  const side=k==='tank'||k==='healer'?'me':'foe';
  const target=document.getElementById(side==='me'?'me':'eo');
  const r=stage.getBoundingClientRect(),tr=target&&target.getBoundingClientRect();
  const x=tr?tr.left-r.left+tr.width/2:(k==='tank'||k==='healer'?r.width*.2:r.width*.68);
  const y=tr?tr.top-r.top+tr.height*.42:r.height*.43;
  const el=document.createElement('div');el.className='rpg-class-impact '+k;
  el.style.left=x+'px';el.style.top=y+'px';
  el.innerHTML='<svg viewBox="0 0 64 64" aria-hidden="true">'+marks[k]+'</svg>';
  stage.appendChild(el);setTimeout(()=>el.remove(),520);
  if(target&&k!=='tank'&&k!=='healer'){target.classList.remove('rpg-impact-target');void target.offsetWidth;target.classList.add('rpg-impact-target');setTimeout(()=>target.classList.remove('rpg-impact-target'),360)}
 }
 const oldUse=CAB.use;
 CAB.use=function(){
  const k=S&&S.cls,active=!!fight,energyBefore=en;
  const before=active&&fight?fight.hp:0;
  const result=oldUse.apply(this,arguments);
  if(active&&before>0&&en<energyBefore&&['warrior','tank','archer','mage','rogue','healer'].includes(k))showClassImpact(k);
  return result;
 };
 window.RPGClassEffects={version:2,durationMs:480,classes:Object.keys(marks)};
})();
