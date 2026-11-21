
/* No grey-out or zoom on a dying goblin: strip those effects as they appear. */
(function(){
  function clean(){
    var eo=document.getElementById('eo');
    if(!eo) return;
    var dead = (typeof fight!=='undefined' && fight && (fight.dead || fight.hp<=0));
    if(!dead) return;
    eo.querySelectorAll('*').forEach(function(el){
      var st=el.style;
      if(!st) return;
      if(st.filter && /grayscale|saturate\(0/.test(st.filter)) st.filter='';
      if(st.transform && /scale\(1\.[2-9]|scale\([2-9]/.test(st.transform)) st.transform='';
      if(st.opacity && parseFloat(st.opacity) < 1 && !el.classList.contains('gws-hidden')) st.opacity='1';
    });
  }
  setInterval(clean, 90);
})();
