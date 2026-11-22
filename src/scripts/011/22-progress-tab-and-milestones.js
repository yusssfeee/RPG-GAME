/* ---------- progress tab and milestones ---------- */
const _ax2=addXp;addXp=function(k,n){const o=L(k);_ax2(k,n);const l=L(k);S.ms=S.ms||{};for(let m=o+1;m<=l;m++)if(m%5===0&&!S.ms[k+m]){S.ms[k+m]=1;S.coins+=m*20;toast('Milestone! <b>'+SKN[k]+' '+m+'</b> +'+m*20+' coins','reward')}};
const TIT=['Novice','Apprentice','Journeyman','Expert','Master','Grandmaster'];
VIEWS.prog=()=>'<div class="card2"><b>Total level '+SK.reduce((a,k)=>a+L(k),0)+'</b><span>'+S.kills+' wins, '+Object.values(S.clears).reduce((a,b)=>a+b,0)+' dungeons cleared</span></div>'+SK.map(k=>{const l=L(k),nx=(Math.floor(l/5)+1)*5;return skillBar(k)+'<p class="h">'+TIT[Math.min(5,Math.floor(l/5))]+'. Next milestone at level '+nx+': +'+nx*20+' coins</p>'}).join('');
{const b=document.createElement('button');b.dataset.k='prog';b.innerHTML=icon('ring')+'Progress';b.addEventListener('click',()=>{S.tab='prog';SFX.coin();save();render();window.scrollTo(0,0)});$('tabs').appendChild(b)}
RM.arcane.push(['focus','Crystal Focus',8,60,[['crystal',3],['mana',3]],1]);
