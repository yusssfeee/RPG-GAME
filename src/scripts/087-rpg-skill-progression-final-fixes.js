
(()=>{
 const baseSpd={};
 Object.keys(CLS).forEach(k=>{baseSpd[k]=Number(CLS[k].spd)||1;});
 const syncCombatSpeed=()=>{const m=Math.floor(Math.max(0,L('combat'))/5);Object.keys(CLS).forEach(k=>{CLS[k].spd=baseSpd[k]*(1-.005*m)});};
 syncCombatSpeed();
 const _v=VIEWS.adv;
 VIEWS.adv=function(){const h=_v.apply(this,arguments);return typeof h==='string'?h.replace('bonusLines(S.cls)','combatClassLines(S.cls)'):h;};
 const _add=addXp;
 addXp=function(k,n){const r=_add.apply(this,arguments);if(k==='combat')syncCombatSpeed();return r;};
})();
