
/* Adventurer equipment sheet: the hero is the class the player picked. */
(()=>{
  'use strict';
  const SLOTS=[['w','Weapon'],['p','Off-hand'],['a','Body'],['h','Head'],['g','Gloves'],['b','Boots']];
  const rarity=id=>{const r=rar(id);return r&&r[2]>=5?'epic':r&&r[2]>=3?'rare':''};
  window.eqSheet=()=>{
    const cls=(typeof CB!=='undefined'&&CB[S.cls])?CB[S.cls]:{ico:'hero_face'};
    const cell=(k,label)=>{
      const owned=(typeof IT!=='undefined')?IT.filter(i=>i.c===k&&cnt(i.id)>0):[];
      if(!owned.length)return '<button class="eqs-slot empty" disabled><i>'+label+'</i></button>';
      const it=item(k);
      return '<button class="eqs-slot '+rarity(it.id)+'" data-eqs="'+k+'"><i>'+iIcon(it)+'</i></button><span class="eqs-name">'+it.n+'</span>';
    };
    const stats=[['ATK',atkPow().toFixed(1)],['DEF',defn().toFixed(1)],['CRIT',critCh().toFixed(1)+'%'],['HP',maxHp()]]
      .map(a=>'<div class="eqs-st"><span>'+a[0]+'</span><b>'+a[1]+'</b></div>').join('');
    return '<div class="eqs">'
      +'<div class="eqs-banner">'+CLS[S.cls].n.toUpperCase()+'</div>'
      +'<div class="eqs-stage">'
        +'<div class="eqs-col">'+cell('w','Weapon')+cell('g','Gloves')+'</div>'
        +'<div class="eqs-hero"><span class="pic">'+icon('spr:'+(cls.ico||'hero_face'))+'</span></div>'
        +'<div class="eqs-col">'+cell('p','Off-hand')+cell('a','Body')+'</div>'
      +'</div>'
      +'<div class="eqs-quick">'+cell('h','Head')+cell('b','Boots')+'</div>'
      +'<div class="eqs-stats">'+stats+'</div>'
      +'</div>';
  };
  document.addEventListener('click',e=>{
    const t=e.target;
    if(t&&t.closest&&t.closest('[data-eqsclose]')){document.getElementById('eqs-pick')?.classList.remove('show');return}
    const pick=t&&t.closest?t.closest('[data-eqid]'):null;
    if(pick){try{equip(pick.dataset.eqid);render();document.getElementById('eqs-pick')?.classList.remove('show')}catch(_){} return}
    const b=t&&t.closest?t.closest('[data-eqs]'):null;
    if(!b)return;
    const k=b.dataset.eqs;
    const all=IT.filter(i=>i.c===k);
    const owned=all.filter(i=>cnt(i.id)>0);
    const cur=S.eq[k];
    const rows=owned.length?owned.map(i=>'<button class="eqs-row'+(i.id===cur?' on':'')+'" data-eqid="'+i.id+'">'
        +iIcon(i)+'<div>'+i.n+'<small>'+stat(i)+'</small></div><b>'+(i.id===cur?'EQUIPPED':'EQUIP')+'</b></button>').join('')
      :'<p class="doll-hint" style="text-align:center">No '+k+' items owned yet.</p>';
    let sheet=document.getElementById('eqs-pick');
    if(!sheet){sheet=document.createElement('div');sheet.id='eqs-pick';sheet.className='eqs-pick';document.body.appendChild(sheet)}
    sheet.innerHTML='<div class="eqs-panel"><h3>CHOOSE EQUIPMENT</h3>'+rows+'<button class="eqs-close" data-eqsclose="1">Close</button></div>';
    sheet.classList.add('show');
  });
})();
