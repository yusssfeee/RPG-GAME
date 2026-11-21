
/* Equipment sheet v2: real slot glyphs, clearer hierarchy, rarity ring. */
(()=>{
  'use strict';
  const G={
    w:'<path d="M19 3l2 2-9 9-2-2z" fill="currentColor"/><path d="M6 18l3-3" stroke="currentColor" stroke-width="2"/><path d="M4 21l2-2" stroke="currentColor" stroke-width="2"/>',
    p:'<path d="M4 20l6-6" stroke="currentColor" stroke-width="2"/><path d="M12 3c3 2 6 5 7 9-4-1-7-3-9-6z" fill="currentColor"/>',
    a:'<path d="M8 4h8l2 5-3 11h-6L6 9z" fill="currentColor"/>',
    h:'<path d="M6 12a6 6 0 0112 0v7h-3v-4h-6v4H6z" fill="currentColor"/>',
    g:'<path d="M7 7h4v6h2V9h4v8l-4 3-6-3z" fill="currentColor"/>',
    b:'<path d="M8 4h5v8h-1c0 2 1 3 3 3v4H5v-6l3-2z" fill="currentColor"/>'
  };
  const glyph=k=>'<svg class="eqs-glyph" viewBox="0 0 24 24">'+(G[k]||G.a)+'</svg>';
  const rarity=id=>{const r=rar(id);return r&&r[2]>=5?'epic':r&&r[2]>=3?'rare':''};
  window.eqSheet=()=>{
    const cls=(typeof CB!=='undefined'&&CB[S.cls])?CB[S.cls]:{ico:'hero_face'};
    const cell=(k,label)=>{
      const owned=IT.filter(i=>i.c===k&&cnt(i.id)>0);
      if(!owned.length)return '<div class="eqs-cell"><button class="eqs-slot empty" disabled><i>'+glyph(k)+'</i></button><span class="eqs-name">'+label+'</span></div>';
      const it=item(k);
      return '<div class="eqs-cell"><button class="eqs-slot '+rarity(it.id)+'" data-eqs="'+k+'"><i>'+iIcon(it)+'</i></button><span class="eqs-name">'+it.n+'</span></div>';
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
})();
