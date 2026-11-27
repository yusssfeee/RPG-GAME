/* ---------- fishing: waters ---------- */
const ZF=[['Pond',1,['sardine','carp'],0,1],['River',4,['bass','trout','salmon','puffer'],25,1],['Sea',8,['puffer','squid','tuna','swordfish'],-45,.9],['Abyss',13,['shark','eel','angler','kraken'],70,.5]];
S.fz=S.fz||0;
function poolFish(){const e=FISH.filter(f=>f.l<=L('fish')&&ZF[S.fz||0][2].includes(f.id));return e.length?e:FISH.filter(f=>f.l<=L('fish'))}
function fishBonus(){const z=S.fz||0,r=Math.random();if(z>=2&&r<.04){S.inv.pearl=inv('pearl')+1;toast('<b style="color:#f4f0ff">Pearl</b> <small>'+rar('pearl')[0]+' find</small>','bonus','#f4f0ff')}else if(r<.04+.01*z){const c=earn(rnd(10,25)*(z+1),'fish');S.coins+=c;toast('Message in a bottle! +'+c+' coins','bonus')}}
const _fv=VIEWS.fish;VIEWS.fish=()=>{const z=ZF[S.fz||0],h=_fv().replace('<div class="bgs">','<div class="bgs" style="filter:hue-rotate('+z[3]+'deg) brightness('+z[4]+')">');return '<div class="btns">'+ZF.map((q,i)=>'<button class="btn '+(i===(S.fz||0)?'':'alt')+'" data-x="fz" data-i="'+i+'"'+(L('fish')>=q[1]?'':' disabled')+'>'+(L('fish')>=q[1]?q[0]:'Lv '+q[1])+'</button>').join('')+'</div>'+h};
$('pane').addEventListener('click',e=>{const b=e.target.closest('[data-x="fz"]');if(!b)return;if(L('fish')>=ZF[+b.dataset.i][1])S.fz=+b.dataset.i;save();render()});
window.__ready=1;
render();
showIntro();


