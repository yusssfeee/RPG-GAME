
/* Regular Goblin (dagger goblin): idle/alert loop, attack, hurt and death animations. Embedded WebP frames, no external files.
   The previous sword-and-shield "warrior" frames are left untouched under the "warrior" key. */
(function(){
  var F=window.__RPG_GOBLIN_FRAMES=window.__RPG_GOBLIN_FRAMES||{};
  var A=window.__RPG_GOBLIN_ATTACK_FRAMES=window.__RPG_GOBLIN_ATTACK_FRAMES||{};
  if(A.goblin&&!A.warrior)A.warrior=A.goblin;
  F.goblin=["{{BLOB:b0399.webp}}", "{{BLOB:b0400.webp}}", "{{BLOB:b0401.webp}}", "{{BLOB:b0402.webp}}", "{{BLOB:b0403.webp}}", "{{BLOB:b0404.webp}}", "{{BLOB:b0405.webp}}", "{{BLOB:b0406.webp}}", "{{BLOB:b0407.webp}}", "{{BLOB:b0408.webp}}", "{{BLOB:b0409.webp}}", "{{BLOB:b0410.webp}}", "{{BLOB:b0411.webp}}", "{{BLOB:b0412.webp}}", "{{BLOB:b0413.webp}}", "{{BLOB:b0414.webp}}", "{{BLOB:b0415.webp}}", "{{BLOB:b0416.webp}}"];
  A.goblin={frames:["{{BLOB:b0417.webp}}", "{{BLOB:b0418.webp}}", "{{BLOB:b0419.webp}}", "{{BLOB:b0420.webp}}", "{{BLOB:b0421.webp}}", "{{BLOB:b0422.webp}}", "{{BLOB:b0423.webp}}", "{{BLOB:b0424.webp}}", "{{BLOB:b0425.webp}}", "{{BLOB:b0426.webp}}", "{{BLOB:b0427.webp}}", "{{BLOB:b0428.webp}}", "{{BLOB:b0429.webp}}", "{{BLOB:b0430.webp}}", "{{BLOB:b0431.webp}}", "{{BLOB:b0432.webp}}", "{{BLOB:b0417.webp}}"],ms:[50,50,50,50,50,65,65,65,65,65,95,95,70,70,70,70,70],hit:10,box:{"left": -5.6, "top": -4.2, "w": 676.5, "h": 517.0, "ref": 512}};
  var H=window.__RPG_GOBLIN_HURT_FRAMES=window.__RPG_GOBLIN_HURT_FRAMES||{};
  H.goblin=["{{BLOB:b0433.webp}}", "{{BLOB:b0434.webp}}", "{{BLOB:b0435.webp}}"];
  var D=window.__RPG_GOBLIN_DEATH_FRAMES=window.__RPG_GOBLIN_DEATH_FRAMES||{};
  D.goblin=["{{BLOB:b0436.webp}}", "{{BLOB:b0437.webp}}", "{{BLOB:b0438.webp}}", "{{BLOB:b0439.webp}}", "{{BLOB:b0440.webp}}"];
  /* Later data scripts replace these two globals; keep the goblin entries alive across that. */
  window.__RPG_GOBLIN_REGULAR={hurt:H.goblin,death:D.goblin};
})();
