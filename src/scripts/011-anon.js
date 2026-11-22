
/* ---------- art: anime style, ink outlines, cel highlights ---------- */
const OL='<g stroke="#241a35" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round">';
const fishP=c=>`<ellipse cx="28" cy="32" rx="20" ry="13" fill="${c}"/><path d="M46 32l14-12v24z" fill="${c}"/><ellipse cx="24" cy="26" rx="10" ry="4" fill="#fff" opacity=".35" stroke="none"/><circle cx="17" cy="29" r="3.2" fill="#fff"/><circle cx="16" cy="29" r="1.6" fill="#111" stroke="none"/><path d="M27 20c5 5 5 19 0 24" stroke="#0004" stroke-width="2" fill="none"/>`;
const P={
 sprout:'<path d="M32 58V30" stroke="#3b8f3b" stroke-width="5"/><path d="M32 34C20 34 14 26 14 16c12 0 18 6 18 18zM32 30c0-10 6-16 18-16 0 10-6 16-18 16z" fill="#6fd45a"/>',
 leaf:'<path d="M32 58V24" stroke="#3b8f3b" stroke-width="5"/><path d="M32 42C16 42 8 32 8 18c16 0 24 8 24 24zM32 34c0-14 8-22 24-22 0 14-8 22-24 22z" fill="#6fd45a"/>',
 carrot:'<path d="M32 60L20 26a12 12 0 0124 0z" fill="#ff8f2a"/><path d="M25 34h8M26 44h8" stroke="#c96a10" stroke-width="2"/><path d="M32 24c-6-6-4-14 0-18 4 4 6 12 0 18zM26 24c-8-2-10-8-8-12 6 0 10 4 8 12zM38 24c8-2 10-8 8-12-6 0-10 4-8 12z" fill="#5fd05f"/>',
 wheat:'<path d="M32 60V16" stroke="#b8932a" stroke-width="3"/><g fill="#f0cc4a"><ellipse cx="32" cy="12" rx="5" ry="9"/><ellipse cx="23" cy="26" rx="4" ry="8" transform="rotate(-25 23 26)"/><ellipse cx="41" cy="26" rx="4" ry="8" transform="rotate(25 41 26)"/><ellipse cx="23" cy="42" rx="4" ry="8" transform="rotate(-25 23 42)"/><ellipse cx="41" cy="42" rx="4" ry="8" transform="rotate(25 41 42)"/></g>',
 pumpkin:'<ellipse cx="32" cy="38" rx="23" ry="18" fill="#ff9a2a"/><ellipse cx="21" cy="38" rx="9" ry="17" fill="#f08512"/><ellipse cx="43" cy="38" rx="9" ry="17" fill="#f08512"/><ellipse cx="32" cy="38" rx="9" ry="18" fill="#ffb347"/><path d="M32 20v-9" stroke="#3b7a2a" stroke-width="5"/>',
 tomato:'<circle cx="32" cy="37" r="22" fill="#ee3d3a"/><ellipse cx="24" cy="29" rx="6" ry="3" fill="#fff" opacity=".5" stroke="none" transform="rotate(-30 24 29)"/><path d="M32 14l-8 7 5 1-7 4 10 1 10-1-7-4 5-1z" fill="#5fd05f"/>',
 melon:'<path d="M5 24a27 27 0 0054 0z" fill="#ff4a62"/><path d="M5 24a27 27 0 0054 0" fill="none" stroke="#3fb050" stroke-width="6"/><g fill="#241a35" stroke="none"><circle cx="22" cy="36" r="2"/><circle cx="32" cy="42" r="2"/><circle cx="42" cy="36" r="2"/></g>',
 fish:fishP,
 puffer:'<circle cx="30" cy="32" r="20" fill="#f0d03a"/><path d="M50 32l10-8v16z" fill="#f0d03a"/><ellipse cx="24" cy="22" rx="8" ry="4" fill="#fff" opacity=".4" stroke="none"/><circle cx="20" cy="27" r="3.8" fill="#fff"/><circle cx="19" cy="27" r="1.9" fill="#111" stroke="none"/><path d="M12 38q6 5 12 0" fill="none"/><path d="M30 10V4M44 16l4-4M16 16l-4-4M30 54v6M46 46l4 4" stroke-width="3"/>',
 squid:'<path d="M32 6c14 0 20 14 16 26H16C12 20 18 6 32 6z" fill="#b86fe0"/><path d="M18 32l-4 24M26 32l-2 26M34 32l2 26M44 32l4 24" stroke="#b86fe0" stroke-width="5"/><ellipse cx="26" cy="14" rx="6" ry="3" fill="#fff" opacity=".4" stroke="none"/><circle cx="25" cy="24" r="4" fill="#fff"/><circle cx="39" cy="24" r="4" fill="#fff"/><circle cx="25" cy="25" r="2" fill="#111" stroke="none"/><circle cx="39" cy="25" r="2" fill="#111" stroke="none"/>',
 shark:'<path d="M4 40C14 22 38 18 60 36 44 36 40 46 26 46 14 46 8 44 4 40z" fill="#6d8aa3"/><path d="M30 24l6-14 6 16z" fill="#58758c"/><path d="M6 41q22 8 50-4v3q-24 12-50 1z" fill="#eef3f7"/><circle cx="16" cy="36" r="2.4" fill="#111" stroke="none"/>',
 ore:c=>`<path d="M8 46l8-24 16-9 20 10 4 22-14 12H22z" fill="#6b6b88"/><path d="M16 22l16-9 20 10-12 5z" fill="#9a9ab8"/><path d="M52 23l4 22-14 12 4-24z" fill="#000" opacity=".18" stroke="none"/><circle cx="26" cy="38" r="5" fill="${c}"/><circle cx="43" cy="31" r="4" fill="${c}"/><circle cx="36" cy="47" r="3.5" fill="${c}"/><circle cx="24" cy="26" r="2" fill="${c}"/>`,
 pick:c=>`<rect x="29" y="16" width="6" height="44" rx="2" fill="#8a5a2b"/><path d="M7 25C15 8 49 8 57 25l-8 2C43 17 21 17 15 27z" fill="${c}"/><path d="M16 21C26 12 40 12 48 21" stroke="#fff" stroke-opacity=".6" stroke-width="2" fill="none"/>`,
 dagger:c=>`<path d="M32 10l6 9v22H26V19z" fill="${c}"/><path d="M32 13v26" stroke="#fff" stroke-opacity=".7" stroke-width="2" fill="none"/><rect x="20" y="41" width="24" height="5" rx="2.5" fill="#8a5a2b"/><rect x="29" y="46" width="6" height="11" rx="2" fill="#3b2a55"/><circle cx="32" cy="59" r="3" fill="#e8b830"/>`,
 sword:c=>`<path d="M32 2l7 9v29H25V11z" fill="${c}"/><path d="M32 5v33" stroke="#fff" stroke-opacity=".7" stroke-width="2.5" fill="none"/><rect x="16" y="40" width="32" height="6" rx="3" fill="#8a5a2b"/><rect x="29" y="46" width="6" height="11" rx="2" fill="#3b2a55"/><circle cx="32" cy="59" r="3.5" fill="#e8b830"/>`,
 great:c=>`<path d="M32 1l10 12v32H22V13z" fill="${c}"/><path d="M32 4v38" stroke="#fff" stroke-opacity=".7" stroke-width="3" fill="none"/><path d="M11 45h42l-4 6H15z" fill="#8a5a2b"/><rect x="29" y="51" width="6" height="9" rx="2" fill="#3b2a55"/><circle cx="32" cy="45" r="3" fill="#ee3d3a"/>`,
 katana:c=>`<path d="M36 2c3 16 2 30-3 46h-6C31 32 33 18 36 2z" fill="${c}"/><path d="M35 6c1 12 0 26-4 38" stroke="#fff" stroke-opacity=".7" stroke-width="2" fill="none"/><ellipse cx="30" cy="49" rx="8" ry="3" fill="#e8b830"/><rect x="27" y="51" width="6" height="11" rx="2" fill="#2f2540"/><path d="M27 54h6M27 58h6" stroke="#8a74c7" stroke-width="1.5"/>`,
 axe:c=>`<rect x="29" y="8" width="6" height="52" rx="2" fill="#8a5a2b"/><path d="M35 10c14-5 24 3 24 12s-10 15-24 11z" fill="${c}"/><path d="M40 14c8-1 12 3 12 8" stroke="#fff" stroke-opacity=".7" stroke-width="2" fill="none"/><path d="M29 14c-8 0-12 6-10 12l10-4z" fill="${c}"/>`,
 spear:c=>`<rect x="30" y="14" width="4" height="48" rx="2" fill="#8a5a2b"/><path d="M32 1l8 15H24z" fill="${c}"/><path d="M32 4v10" stroke="#fff" stroke-opacity=".7" stroke-width="2"/><path d="M26 17l6 4 6-4-2 8h-8z" fill="#ee3d3a"/>`,
 hammer:c=>`<rect x="29" y="22" width="6" height="40" rx="2" fill="#8a5a2b"/><rect x="10" y="5" width="44" height="22" rx="5" fill="${c}"/><path d="M14 10h36" stroke="#fff" stroke-opacity=".7" stroke-width="2.5" fill="none"/><rect x="26" y="27" width="12" height="5" rx="1" fill="#e8b830"/>`,
 rapier:c=>`<path d="M32 1l3 9v32h-6V10z" fill="${c}"/><path d="M32 4v34" stroke="#fff" stroke-opacity=".7" stroke-width="2" fill="none"/><path d="M12 42c8 8 32 8 40 0l-4-5c-8 5-24 5-32 0z" fill="#e8b830"/><rect x="29" y="47" width="6" height="10" rx="2" fill="#3b2a55"/><circle cx="32" cy="59" r="3.5" fill="#ee3d3a"/>`,
 tunic:c=>`<path d="M16 12l16-6 16 6 12 12-9 9-6-5v32H19V28l-6 5-9-9z" fill="${c}"/><path d="M26 8q6 8 12 0" fill="#000" opacity=".25" stroke="none"/><path d="M19 52h26" stroke="#8a5a2b" stroke-width="4"/>`,
 mail:c=>`<path d="M10 14l12-6h20l12 6 6 18-10 4v22H14V36L4 32z" fill="${c}"/><path d="M22 8q10 10 20 0" fill="#000" opacity=".25" stroke="none"/><path d="M14 40h36M14 46h36M14 52h36" stroke="#000" stroke-opacity=".25" stroke-width="1.5"/><circle cx="32" cy="26" r="3" fill="#e8b830"/>`,
 plate:c=>`<path d="M8 16C12 6 22 8 24 10h16c2-2 12-4 16 6l-4 14-8 4v20H20V34l-8-4z" fill="${c}"/><circle cx="14" cy="18" r="8" fill="${c}"/><circle cx="50" cy="18" r="8" fill="${c}"/><path d="M32 12v46" stroke="#fff" stroke-opacity=".6" stroke-width="3" fill="none"/><path d="M22 34h20" stroke="#e8b830" stroke-width="4" fill="none"/><circle cx="32" cy="26" r="4" fill="#ee3d3a"/>`,
 anvil:'<path d="M6 20h50c0 9-10 11-17 11v8h9v11H16V39h8v-8C16 31 6 29 6 20z" fill="#5d6272"/><path d="M6 20h50v5H6z" fill="#9aa1b0"/>',
 rod:'<path d="M10 58L50 8" stroke="#8a5a2b" stroke-width="4"/><path d="M50 8q12 20 0 38" stroke="#fff" fill="none" stroke-width="2"/><circle cx="50" cy="48" r="4" fill="#ee3d3a"/>',
 bobber:'<path d="M32 12V2" stroke="#fff" stroke-width="2"/><circle cx="32" cy="36" r="15" fill="#fff"/><path d="M17 36a15 15 0 0130 0z" fill="#ee3d3a"/>',
 alert:'<circle cx="32" cy="32" r="28" fill="#ee3d3a"/><rect x="28" y="12" width="8" height="26" rx="4" fill="#fff"/><circle cx="32" cy="49" r="5" fill="#fff"/>',
 road:'<path d="M26 4h12l16 56H10z" fill="#9a8a6a"/><path d="M32 8v8M32 24v8M32 40v8" stroke="#f3e9c5" stroke-width="3"/>',
 bag:'<path d="M16 24h32l4 33H12z" fill="#b8803f"/><path d="M24 24c0-13 16-13 16 0" stroke="#8a5a2b" stroke-width="5" fill="none"/><rect x="24" y="38" width="16" height="9" rx="2" fill="#8a5a2b"/>',
 coin:'<circle cx="32" cy="32" r="26" fill="#f2b705"/><circle cx="32" cy="32" r="19" fill="#ffd84d"/><path d="M32 19v26M26 26h10a4 4 0 010 8h-8a4 4 0 000 8h10" stroke="#c98a00" stroke-width="3" fill="none"/>',
 lock:'<rect x="14" y="28" width="36" height="28" rx="5" fill="#9a9480"/><path d="M22 28v-8a10 10 0 0120 0v8" stroke="#9a9480" stroke-width="5" fill="none"/>',
 can:'<path d="M14 24h28l-3 28H17z" fill="#4aa3e8"/><path d="M42 30l14-12 4 4-12 14z" fill="#3d8fcf"/><path d="M14 28c-8-2-10 10 0 12" fill="none" stroke-width="3"/><path d="M20 29h16" stroke="#fff" stroke-opacity=".7" stroke-width="2.5" fill="none"/>',
 charm:'<g fill="#44c46a"><circle cx="24" cy="24" r="11"/><circle cx="40" cy="24" r="11"/><circle cx="24" cy="40" r="11"/><circle cx="40" cy="40" r="11"/></g><path d="M32 38l10 20" stroke="#2b8a45" stroke-width="4" fill="none"/><path d="M20 20q4-5 8 0" stroke="#fff" stroke-opacity=".7" fill="none" stroke-width="2"/>',
 boots:'<path d="M20 6h20v26l16 10v14H12V40l8-6z" fill="#b8803f"/><path d="M12 50h44v6H12z" fill="#5a3512"/><path d="M24 12h12" stroke="#fff" stroke-opacity=".6" stroke-width="3" fill="none"/>',
 ring:'<circle cx="32" cy="40" r="16" fill="none" stroke="#ffcc33" stroke-width="8"/><path d="M32 6l10 10-10 10-10-10z" fill="#53d4ff"/>',
 potion:'<path d="M26 6h12v12l11 18c4 12-3 24-17 24S11 48 15 36l11-18z" fill="#eaf6ff"/><path d="M19 36h26l5 4c2 12-6 20-18 20S11 52 14 40z" fill="#ff4a72" stroke="none"/><rect x="25" y="4" width="14" height="6" rx="2" fill="#b8803f"/>'
};
const icon=(n,c,cl)=>{
 const cm=String(n||'').match(/^pixelcrop:([a-z]+)(?::([0-3]))?$/);
 if(cm&&window.__RPG_PIXEL_CROP_ART&&window.__RPG_PIXEL_CROP_ART[cm[1]]){
  const src=window.__RPG_PIXEL_CROP_ART[cm[1]][cm[2]===undefined?3:Number(cm[2])];
  if(src){const stage=cm[2]!==undefined;return '<img class="'+(stage?'crop-stage-art':'crop-seed-art')+'" src="'+src+'" alt="" draggable="false" decoding="async">'}
 }
 const p=P[n];return '<svg class="'+(cl||'ic')+'" viewBox="0 0 64 64">'+OL+(typeof p==='function'?p(c):p)+'</g></svg>'
};
const mon=(b,cl)=>'<svg class="'+(cl||'art')+'" viewBox="0 0 100 100">'+OL+b+'</g></svg>';
const eye=(x,y,r,c)=>`<g stroke-width="1"><ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r*1.25}" fill="#fff"/><ellipse cx="${x}" cy="${y+r*.15}" rx="${r*.75}" ry="${r*1.05}" fill="${c||'#4a3fa0'}" stroke="none"/><ellipse cx="${x}" cy="${y+r*.25}" rx="${r*.35}" ry="${r*.55}" fill="#120c24" stroke="none"/><circle cx="${x-r*.3}" cy="${y-r*.4}" r="${r*.3}" fill="#fff" stroke="none"/><circle cx="${x+r*.25}" cy="${y+r*.45}" r="${r*.14}" fill="#fff" stroke="none"/></g>`;
const hl=(x,y,rx,ry,r)=>`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#fff" opacity=".35" stroke="none" transform="rotate(${r||-30} ${x} ${y})"/>`;
const SH='<ellipse cx="50" cy="93" rx="30" ry="5" fill="#000" opacity=".3" stroke="none"/>';
const slime=c=>SH+`<path d="M14 88C8 56 26 26 50 26s42 30 36 62z" fill="${c}"/>`+hl(32,46,9,5)+eye(38,58,7)+eye(62,58,7)+'<path d="M43 74q7 6 14 0" fill="none"/><ellipse cx="26" cy="70" rx="5" ry="3" fill="#ff8aa8" opacity=".7" stroke="none"/><ellipse cx="74" cy="70" rx="5" ry="3" fill="#ff8aa8" opacity=".7" stroke="none"/>';
const orc=SH+'<circle cx="50" cy="50" r="30" fill="#6aa043"/>'+hl(34,32,10,5)+'<path d="M34 70l-7 20 14-12zM66 70l7 20-14-12z" fill="#f8f3e0"/><path d="M26 38l22 9M74 38L52 47" stroke-width="6"/>'+eye(38,52,5,'#d62f2f')+eye(62,52,5,'#d62f2f')+'<ellipse cx="50" cy="63" rx="5" ry="3" fill="#2f4a1f"/>';
const FOES=[
 {n:'Slime',hp:8,atk:2,xp:4,c:3,l:1,a:slime('#58d36a')},
 {n:'Rat',hp:12,atk:3,xp:6,c:5,l:1,a:SH+'<path d="M80 80q16-6 10-26" stroke="#f2a9b5" stroke-width="4" fill="none"/><ellipse cx="46" cy="68" rx="32" ry="22" fill="#9a9aa8"/><circle cx="30" cy="46" r="11" fill="#9a9aa8"/><circle cx="58" cy="44" r="11" fill="#9a9aa8"/><circle cx="30" cy="46" r="6" fill="#f2a9b5"/><circle cx="58" cy="44" r="6" fill="#f2a9b5"/>'+hl(34,60,10,5)+eye(36,64,5)+eye(54,64,5)+'<circle cx="46" cy="75" r="4" fill="#f2a9b5"/><path d="M34 76H20M34 80l-12 5M58 76h14M58 80l12 5" stroke-width="2"/>'},
 {n:'Bat',hp:18,atk:4,xp:8,c:8,l:2,a:'<path d="M50 50L6 26c4 22 6 34 22 38l10-8zM50 50l44-24c-4 22-6 34-22 38l-10-8z" fill="#7a56b8"/><ellipse cx="50" cy="56" rx="16" ry="20" fill="#4a3478"/><path d="M38 40l-4-14 12 8zM62 40l4-14-12 8z" fill="#4a3478"/>'+hl(44,48,5,8,-10)+eye(44,52,4,'#f2b705')+eye(56,52,4,'#f2b705')+'<path d="M45 66l2 5 3-5 3 5 2-5" fill="#fff"/>'},
 {n:'Goblin',hp:22,atk:5,xp:10,c:10,l:3,a:SH+'<path d="M24 50L2 38l10 26zM76 50l22-12-10 26z" fill="#7cc356"/><circle cx="50" cy="52" r="26" fill="#86cf5e"/><rect x="26" y="76" width="48" height="14" rx="6" fill="#8a5a2b"/>'+hl(38,36,9,5)+eye(40,50,6,'#e8a020')+eye(60,50,6,'#e8a020')+'<path d="M38 66q12 10 24 0z" fill="#3a2a1a"/><path d="M42 66l3 5 3-5zM52 66l3 5 3-5z" fill="#fff"/>'},
 {n:'Spider',hp:28,atk:6,xp:13,c:13,l:4,a:'<g fill="none" stroke-width="5"><path d="M34 56L8 40v30M34 64L10 82M66 56l26-16v30M66 64l24 18M38 52L22 28M62 52l16-24"/></g><ellipse cx="50" cy="64" rx="24" ry="20" fill="#4a3a5c"/><circle cx="50" cy="42" r="14" fill="#5a4872"/>'+hl(44,58,8,4)+eye(44,40,4,'#ff3b3b')+eye(56,40,4,'#ff3b3b')+'<path d="M50 58l6 10H44z" fill="#d62f2f"/>'},
 {n:'Wolf',hp:34,atk:7,xp:16,c:16,l:5,a:SH+'<path d="M24 36L20 8l22 16zM76 36l4-28-22 16z" fill="#6c6f7c"/><path d="M14 52c0-26 72-26 72 0 0 24-12 40-36 40S14 76 14 52z" fill="#9296aa"/><path d="M34 62h32c0 18-8 26-16 26s-16-8-16-26z" fill="#e2e5ee"/>'+hl(34,38,10,5)+eye(36,48,5,'#f2b705')+eye(64,48,5,'#f2b705')+'<ellipse cx="50" cy="66" rx="7" ry="5" fill="#222"/><path d="M42 78l3 8 3-8zM52 78l3 8 3-8z" fill="#fff"/>'},
 {n:'Skeleton',hp:44,atk:9,xp:22,c:24,l:6,a:'<rect x="38" y="64" width="24" height="30" rx="4" fill="#efe9d6"/><path d="M38 72h24M38 80h24M38 88h24" stroke-width="3"/><path d="M26 44c0-24 48-24 48 0v14H26z" fill="#f6f1e2"/><rect x="36" y="58" width="28" height="10" rx="2" fill="#f6f1e2"/>'+hl(38,32,9,5)+'<circle cx="40" cy="46" r="8" fill="#1a1230"/><circle cx="60" cy="46" r="8" fill="#1a1230"/><circle cx="40" cy="46" r="3" fill="#ff4a4a" stroke="none"/><circle cx="60" cy="46" r="3" fill="#ff4a4a" stroke="none"/><path d="M48 54l2 6 2-6z" fill="#1a1230"/><path d="M42 62v6M50 62v6M58 62v6" stroke-width="2"/>'},
 {n:'Orc',hp:60,atk:11,xp:30,c:36,l:7,a:orc},
 {n:'Ghost',hp:70,atk:13,xp:38,c:48,l:8,a:'<path d="M16 92V48c0-42 68-42 68 0v44l-11-9-11 9-12-9-12 9-11-9z" fill="#eaf3ff"/>'+hl(36,32,9,6,-20)+'<ellipse cx="40" cy="48" rx="6" ry="9" fill="#2b3350"/><ellipse cx="60" cy="48" rx="6" ry="9" fill="#2b3350"/><circle cx="38" cy="44" r="2" fill="#fff" stroke="none"/><circle cx="58" cy="44" r="2" fill="#fff" stroke="none"/><ellipse cx="50" cy="68" rx="7" ry="9" fill="#2b3350"/>'},
 {n:'Golem',hp:100,atk:15,xp:55,c:70,l:9,a:SH+'<rect x="22" y="32" width="56" height="52" rx="10" fill="#8f8fa0"/><rect x="6" y="42" width="16" height="32" rx="6" fill="#7a7a8a"/><rect x="78" y="42" width="16" height="32" rx="6" fill="#7a7a8a"/><rect x="34" y="12" width="32" height="26" rx="8" fill="#a0a0b2"/>'+hl(42,20,8,4)+'<rect x="38" y="22" width="9" height="6" fill="#ffb02e" stroke="none"/><rect x="53" y="22" width="9" height="6" fill="#ffb02e" stroke="none"/><path d="M34 54l10 8-6 10M62 50l-8 12" stroke-width="3" fill="none"/>'},
 {n:'Troll',hp:130,atk:18,xp:75,c:100,l:10,a:SH+'<ellipse cx="50" cy="72" rx="34" ry="22" fill="#3f8a70"/><circle cx="50" cy="42" r="28" fill="#55a888"/><path d="M26 32l-14-6 10 18zM74 32l14-6-10 18z" fill="#55a888"/><circle cx="50" cy="50" r="7" fill="#3a6f5a"/>'+hl(38,26,9,5)+eye(38,38,5,'#e8a020')+eye(62,38,5,'#e8a020')+'<path d="M32 62q18 12 36 0z" fill="#2a2a2a"/><path d="M36 62l4 7 4-6zM56 63l4 6 4-7z" fill="#fff"/><path d="M40 16l6-10 4 8 4-8 6 10" fill="#8a5a2b"/>'},
 {n:'Imp',hp:170,atk:22,xp:100,c:140,l:11,a:SH+'<path d="M28 30L18 4l22 16zM72 30l10-26-22 16z" fill="#8a2020"/><path d="M6 62q10-26 26-12zM94 62q-10-26-26-12z" fill="#b33030"/><circle cx="50" cy="54" r="30" fill="#e04a3e"/>'+hl(36,36,10,5)+eye(38,50,6,'#f2b705')+eye(62,50,6,'#f2b705')+'<path d="M34 70q16 14 32 0z" fill="#3a0f0f"/><path d="M40 70l3 6 3-5zM54 71l3 5 3-6z" fill="#fff"/>'},
 {n:'Slime King',b:1,hp:36,atk:4,xp:30,c:40,l:3,a:slime('#4aa3e8')+'<path d="M30 30l6-16 7 10 7-14 7 14 7-10 6 16z" fill="#ffcc33"/>'},
 {n:'Orc Warlord',b:1,hp:160,atk:12,xp:90,c:120,l:8,a:orc+'<path d="M20 44C20 10 80 10 80 44z" fill="#6b6f7c"/><path d="M22 34Q8 30 6 8q16 4 20 20zM78 34q14-4 16-26-16 4-20 20z" fill="#f8f3e0"/>'},
 {n:'Dragon',b:1,hp:320,atk:20,xp:220,c:350,l:12,a:'<path d="M50 58L2 24c4 28 14 42 36 46zM50 58l48-34c-4 28-14 42-36 46z" fill="#b02a2a"/><circle cx="50" cy="58" r="28" fill="#e03a3a"/><path d="M30 38L20 8l24 18zM70 38l10-30-24 18z" fill="#f4e0aa"/><ellipse cx="50" cy="72" rx="17" ry="13" fill="#f07a52"/>'+hl(38,40,9,5)+'<circle cx="44" cy="72" r="2.5" fill="#331"/><circle cx="56" cy="72" r="2.5" fill="#331"/>'+eye(38,50,5,'#f2b705')+eye(62,50,5,'#f2b705')+'<path d="M40 82l3 6 3-6M54 82l3 6 3-6" fill="#fff"/>'},
 {n:'Lich',b:1,hp:600,atk:30,xp:500,c:900,l:15,a:'<path d="M10 94C12 40 28 12 50 12s38 28 40 82z" fill="#43307a"/><circle cx="50" cy="50" r="22" fill="#f4eedd"/>'+hl(42,38,8,5)+'<circle cx="42" cy="48" r="6" fill="#1a1230"/><circle cx="58" cy="48" r="6" fill="#1a1230"/><circle cx="42" cy="48" r="2.5" fill="#7cf" stroke="none"/><circle cx="58" cy="48" r="2.5" fill="#7cf" stroke="none"/><path d="M44 64h12M46 60v8M54 60v8" stroke-width="2"/><path d="M30 24l5-14 7 9 8-13 8 13 7-9 5 14z" fill="#a77bff"/>'}
];
FOES.forEach(f=>f.sp=f.b?2.2:Math.max(1.4,2.5-.1*f.l));
let HERO=SH+'<path d="M28 54C16 64 14 84 18 98h20z" fill="#c9303d"/><path d="M72 54c12 10 14 30 10 44H62z" fill="#c9303d"/><path d="M34 54h32l4 40H30z" fill="#2f6fd6"/><path d="M34 54h32l1 8H33z" fill="#fff" opacity=".35" stroke="none"/><rect x="31" y="72" width="38" height="6" fill="#8a5a2b"/><path d="M26 90h18v8H26zM56 90h18v8H56z" fill="#4a3320"/><path d="M64 58L86 50l2 10-20 10z" fill="#2f6fd6"/><circle cx="88" cy="52" r="5" fill="#ffd9b8"/><circle cx="50" cy="38" r="17" fill="#ffd9b8"/><path d="M30 38C26 14 48 4 58 10c10-2 18 10 12 28-4-10-12-14-20-12-8 0-14 4-20 12z" fill="#e8742a"/><path d="M32 28L20 20l16-2zM66 14l14-8-6 16zM50 8l-2-8 10 6z" fill="#e8742a"/>'+eye(43,41,4.6,'#2a8cff')+eye(58,41,4.6,'#2a8cff')+'<path d="M47 50q4 3 8 0" fill="none"/><path d="M36 54q14 10 28 0l-2 8q-12 6-24 0z" fill="#f2c14e"/>';

/* scene backgrounds */
const BG=(d,x)=>'<div class="bgs"><svg viewBox="0 0 400 340" preserveAspectRatio="xMidYMid slice"><defs>'+d+'</defs>'+x+'</svg></div>';
const lg=(id,a,b,c)=>`<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/>${c?`<stop offset=".55" stop-color="${b}"/><stop offset="1" stop-color="${c}"/>`:`<stop offset="1" stop-color="${b}"/>`}</linearGradient>`;
function bgBase(k,boss){
 if(k==='fish')return BG(lg('b1','#ffd9a8','#8fd0ff','#3a8fd0'),'<rect width="400" height="340" fill="url(#b1)"/><circle cx="300" cy="90" r="34" fill="#fff6d6"/><path d="M0 160l70-70 60 44 80-74 90 84 100-54v110H0z" fill="#7a8fd4"/><path d="M0 172l90-40 70 30 90-50 150 70v28H0z" fill="#4f9a6a"/><rect y="180" width="400" height="160" fill="#2f86c8"/><path d="M30 230q15-8 30 0t30 0M240 270q15-8 30 0t30 0M120 305q15-8 30 0t30 0" stroke="#cdeeff" stroke-width="3" fill="none" opacity=".8"/><path d="M20 340V250M30 340V232M380 340V240M368 340V262" stroke="#2c6b3a" stroke-width="5"/>');
 if(k==='mine')return BG('<radialGradient id="b2"><stop offset="0" stop-color="#5a3f8a"/><stop offset="1" stop-color="#150f26"/></radialGradient>','<rect width="400" height="340" fill="url(#b2)"/><path d="M0 0h400v30l-30 40-30-40-40 60-40-60-50 30-40-30-50 50-40-50-40 40z" fill="#120b22"/><path d="M20 340l14-60 14 60zM60 340l10-40 10 40zM330 340l12-70 14 70zM360 340l8-34 10 34z" fill="#6be0ff" opacity=".85"/><path d="M290 340l8-36 8 36z" fill="#ff7ad9"/><ellipse cx="200" cy="330" rx="170" ry="26" fill="#0b0716"/>');
 if(k==='forge')return BG('','<rect width="400" height="340" fill="#2a1410"/><path d="M0 60h400M0 120h400M0 180h400M0 240h400M60 0v60M200 60v60M330 0v60M120 120v60M280 120v60M60 180v60" stroke="#3d1e16" stroke-width="3"/><path d="M110 340V190a90 90 0 01180 0v150z" fill="#5a2a14"/><path d="M140 340V200a60 60 0 01120 0v140z" fill="#ff7a22"/><path d="M165 340V225a35 35 0 0170 0v115z" fill="#ffd25a"/><g fill="#ffd25a"><circle cx="90" cy="150" r="3"/><circle cx="310" cy="120" r="2.5"/><circle cx="330" cy="190" r="3"/><circle cx="70" cy="220" r="2"/></g>');
 if(k==='road')return BG(lg('b3','#ffd9a8','#9bd6ff'),'<rect width="400" height="340" fill="url(#b3)"/><circle cx="90" cy="80" r="30" fill="#fff6d6"/><ellipse cx="290" cy="70" rx="50" ry="14" fill="#fff" opacity=".85"/><path d="M0 170l80-50 90 40 90-60 140 70v170H0z" fill="#6aa86a"/><path d="M0 200q100-30 200-10t200-20v170H0z" fill="#58a050"/><path d="M185 340C170 270 250 260 215 215S200 190 205 160" stroke="#e6cd94" stroke-width="40" fill="none"/><path d="M60 250l8-30 8 30zM330 240l8-34 8 34z" fill="#2f7a3a"/>');
 return BG(lg('b4',boss?'#3b0f2a':'#2a1650',boss?'#c43a3a':'#c0558a',boss?'#ffb36a':'#ffb98a'),'<rect width="400" height="340" fill="url(#b4)"/><circle cx="200" cy="170" r="56" fill="#fff" opacity=".18"/><path d="M0 220l60-70 50 50 60-90 60 80 60-60 70 90v100H0z" fill="'+(boss?'#5a1a2a':'#4a2a70')+'"/><rect x="40" y="170" width="16" height="90" fill="#3a2250"/><rect x="340" y="150" width="16" height="110" fill="#3a2250"/><path d="M0 270h400v70H0z" fill="'+(boss?'#2a0d18':'#2a1840')+'"/>');
}

/* title poster */
const POSTER=`<svg viewBox="0 0 400 800" preserveAspectRatio="xMidYMid slice"><defs>${lg('pk','#1c0f4a','#8a3fa8','#ffd58a').replace('.55','.62')}${lg('tg','#fff7d6','#ffb347')}<radialGradient id="gl"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>
<rect width="400" height="800" fill="url(#pk)"/>
<g fill="#fff"><circle class="tw" cx="40" cy="230" r="1.6"/><circle class="tw" cx="90" cy="280" r="1.2"/><circle class="tw" cx="350" cy="250" r="1.6"/><circle class="tw" cx="380" cy="330" r="1.2"/><circle class="tw" cx="25" cy="380" r="1.4"/><circle class="tw" cx="320" cy="200" r="1.2"/><circle class="tw" cx="160" cy="210" r="1.4"/></g>
<circle cx="200" cy="360" r="185" fill="url(#gl)"/><circle cx="200" cy="360" r="108" fill="#fff0c8"/>
<g class="spin" fill="none" stroke="#fff" stroke-opacity=".65"><circle cx="200" cy="360" r="150" stroke-width="2"/><circle cx="200" cy="360" r="138" stroke-width="1.5" stroke-dasharray="3 7"/><circle cx="200" cy="360" r="162" stroke-width="3" stroke-dasharray="40 14 6 14"/></g>
<path d="M0 560l60-70 50 40 70-90 60 70 60-60 70 80 50-40v170H0z" fill="#5b2f86"/>
<g transform="translate(262 250)"><path d="M0 40h110c-10 24-30 40-55 50C30 80 10 64 0 40z" fill="#3a2260" stroke="#1a0e33" stroke-width="3"/><path d="M0 40q55-16 110 0z" fill="#6fd68a" stroke="#1a0e33" stroke-width="3"/><rect x="40" y="6" width="30" height="34" fill="#efe0ff" stroke="#1a0e33" stroke-width="3"/><path d="M36 8l19-24 19 24z" fill="#e8587a" stroke="#1a0e33" stroke-width="3"/><rect x="52" y="22" width="6" height="12" fill="#4a3a7a"/></g>
<g fill="#fff" opacity=".85"><ellipse cx="70" cy="470" rx="60" ry="16"/><ellipse cx="110" cy="458" rx="36" ry="14"/><ellipse cx="330" cy="520" rx="64" ry="16"/><ellipse cx="360" cy="506" rx="34" ry="12"/></g>
<path d="M0 650q100-70 200-30t200-20v200H0z" fill="#2b1650"/>
<ellipse cx="200" cy="702" rx="96" ry="12" fill="#000" opacity=".4"/>
<circle cx="316" cy="438" r="70" fill="url(#gl)"/>
<g transform="translate(92 482) scale(2.16)">${OL}${HERO}</g></g>
<g transform="translate(280 584) rotate(24)"><path d="M0 -200l10 22v170h-20v-170z" fill="#eaf6ff" stroke="#241a35" stroke-width="3" stroke-linejoin="round"/><path d="M0 -190v150" stroke="#fff" stroke-width="3"/><rect x="-18" y="-10" width="36" height="9" rx="4" fill="#e8b830" stroke="#241a35" stroke-width="3"/></g>
<path d="M0 704q80-22 140 0t140-10 120 10v100H0z" fill="#1a0e33"/>
<text x="200" y="46" text-anchor="middle" font-family="Trebuchet MS,sans-serif" font-size="12" letter-spacing="5" fill="#ffe9b8">A NEW WORLD AWAITS</text>
<text x="200" y="120" text-anchor="middle" font-family="Georgia,serif" font-size="62" font-weight="700" fill="url(#tg)" stroke="#2b1055" stroke-width="7" paint-order="stroke" stroke-linejoin="round">TINY ACRE</text>
<text x="200" y="152" text-anchor="middle" font-family="Trebuchet MS,sans-serif" font-size="19" font-weight="700" letter-spacing="7" fill="#fff" stroke="#2b1055" stroke-width="4" paint-order="stroke">ISEKAI CHRONICLE</text>
<text x="200" y="182" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-size="13" fill="#ffe9b8">Reborn as a farmer. Destined to be a legend.</text>
</svg>`;

/* ---------- extra icons ---------- */
Object.assign(P,{
 gel:c=>`<path d="M32 8C22 24 14 32 14 42a18 18 0 0036 0C50 32 42 24 32 8z" fill="${c}"/><ellipse cx="25" cy="38" rx="4" ry="7" fill="#fff" opacity=".5" stroke="none"/>`,
 hide:c=>`<path d="M10 14l14 4 8-6 8 6 14-4 4 18-8 6 2 14-12 4-8-6-8 6-12-4 2-14-8-6z" fill="${c}"/><path d="M24 30h16M24 38h16" stroke="#0005" stroke-dasharray="3 3" stroke-width="2" fill="none"/>`,
 fang:'<path d="M20 10c14 0 24 8 24 20 0 10-6 18-8 24C30 44 18 30 20 10z" fill="#f4efe0"/><path d="M26 14c8 2 12 8 12 16" stroke="#fff" stroke-opacity=".7" fill="none" stroke-width="2"/>',
 bone:'<path d="M14 18a6 6 0 1110-4l26 26a6 6 0 11-4 10 6 6 0 11-10-4L10 24a6 6 0 014-6z" fill="#f4efdc"/>',
 wing:c=>`<path d="M6 12c16 0 30 8 34 24l-4 2-6-4-4 6-6-6-6 4-4-6z" fill="${c}"/><path d="M6 12c10 10 14 20 14 32" stroke="#0005" fill="none" stroke-width="2"/>`,
 silk:'<circle cx="32" cy="32" r="22" fill="#f1e6ff"/><path d="M14 26q18 10 36 0M12 34q20 12 40 0M18 44q14 6 28 0M24 14q8 18 0 36" stroke="#b79ee0" stroke-width="2" fill="none"/>',
 scale:c=>`<path d="M32 6l22 14v22L32 58 10 42V20z" fill="${c}"/><path d="M32 12v40M16 24l16 10 16-10" stroke="#0004" fill="none" stroke-width="2"/><path d="M18 22l14-9" stroke="#fff" stroke-opacity=".6" stroke-width="3" fill="none"/>`,
 wisp:'<path d="M32 4C44 18 52 28 48 42c-3 10-11 16-16 18-5-2-13-8-16-18C12 28 20 18 32 4z" fill="#9ee8ff"/><circle cx="26" cy="36" r="3" fill="#1a2a5a" stroke="none"/><circle cx="38" cy="36" r="3" fill="#1a2a5a" stroke="none"/>',
 core:c=>`<path d="M32 4l20 16-8 30-12 10-12-10-8-30z" fill="${c}"/><path d="M32 4l-8 22 8 34M32 4l8 22-8 34M12 20h40" stroke="#fff" stroke-opacity=".55" fill="none" stroke-width="2"/>`,
 horn:'<path d="M14 50C10 24 30 8 50 10 36 14 30 26 30 50z" fill="#efe3c4"/><path d="M20 44c-1-14 6-24 18-28" stroke="#0003" fill="none" stroke-width="2"/>',
 herb:'<path d="M32 58V28" stroke="#3b8f3b" stroke-width="4"/><path d="M32 40C20 40 12 32 12 20c12 0 20 6 20 20zM32 32C32 18 40 10 52 10c0 12-8 22-20 22zM32 50c-8-2-14-8-14-16 8 0 14 6 14 16z" fill="#6fd45a"/>',
 feather:'<path d="M52 8C26 8 12 26 12 52c14-2 24-8 30-18 4-8 8-14 10-26z" fill="#f4f0ff"/><path d="M12 52L44 20" stroke="#b9a8d8" stroke-width="2" fill="none"/>',
 egg:'<path d="M32 6C20 6 12 28 12 40c0 12 9 18 20 18s20-6 20-18C52 28 44 6 32 6z" fill="#fff4e0"/><ellipse cx="24" cy="30" rx="4" ry="8" fill="#fff" opacity=".7" stroke="none"/>',
 wool:'<g fill="#fffaf0"><circle cx="22" cy="26" r="12"/><circle cx="40" cy="24" r="12"/><circle cx="32" cy="40" r="14"/><circle cx="16" cy="40" r="9"/><circle cx="48" cy="40" r="9"/></g>',
 milk:'<path d="M20 8h24l-2 10 6 10v28H16V28l6-10z" fill="#fff"/><path d="M16 38h32v20H16z" fill="#9ad0ff" opacity=".5" stroke="none"/><rect x="22" y="4" width="20" height="6" rx="2" fill="#ee3d3a"/>',
 honey:'<path d="M18 22h28l4 8v22c0 4-4 6-8 6H22c-4 0-8-2-8-6V30z" fill="#f2b705"/><path d="M22 30c0 8 4 10 4 16" stroke="#fff" stroke-opacity=".6" fill="none" stroke-width="3"/><rect x="22" y="14" width="20" height="8" rx="2" fill="#b8803f"/>',
 flask:c=>`<path d="M26 6h12v12l11 18c4 12-3 24-17 24S11 48 15 36l11-18z" fill="#eaf6ff"/><path d="M19 36h26l5 4c2 12-6 20-18 20S11 52 14 40z" fill="${c}" stroke="none"/><rect x="25" y="4" width="14" height="6" rx="2" fill="#b8803f"/><path d="M22 24c-2 6-4 8-5 12" stroke="#fff" stroke-opacity=".6" fill="none" stroke-width="2"/>`,
 cauldron:'<path d="M10 30h44l-4 24c-2 4-8 6-18 6s-16-2-18-6z" fill="#3b3f52"/><ellipse cx="32" cy="30" rx="22" ry="6" fill="#6be08a"/><path d="M12 36c2 6 4 14 10 18" stroke="#fff" stroke-opacity=".3" fill="none" stroke-width="3"/><circle cx="26" cy="22" r="4" fill="#9affb4"/><circle cx="38" cy="16" r="3" fill="#9affb4"/>',
 club:c=>`<path d="M26 4h12l4 10-6 38H28L22 14z" fill="${c}"/><path d="M28 8l-2 40" stroke="#fff" stroke-opacity=".5" stroke-width="2" fill="none"/><rect x="28" y="50" width="8" height="10" rx="3" fill="#8a5a2b"/>`,
 bow:c=>`<path d="M20 4C48 12 48 52 20 60" stroke="${c}" stroke-width="5" fill="none"/><path d="M20 4v56" stroke="#f1e6ff" stroke-width="2"/><path d="M12 32h36" stroke="#8a5a2b" stroke-width="3"/><path d="M48 32l-8-5v10z" fill="#c9d6e4"/>`,
 staff:c=>`<rect x="30" y="20" width="5" height="42" rx="2" fill="#8a5a2b"/><circle cx="32" cy="14" r="10" fill="${c}"/><path d="M22 8q-4 8 2 14M42 8q4 8-2 14" stroke="#e8b830" stroke-width="3" fill="none"/><circle cx="29" cy="11" r="3" fill="#fff" opacity=".7" stroke="none"/>`,
 leather:c=>`<path d="M14 10l10-4 8 6 8-6 10 4 6 16-8 4v28H16V30l-8-4z" fill="${c}"/><path d="M32 12v46M20 34h24" stroke="#0005" stroke-dasharray="3 3" stroke-width="2" fill="none"/>`,
 robe:c=>`<path d="M22 6h20l8 14-6 4 6 34H14l6-34-6-4z" fill="${c}"/><path d="M32 6v52" stroke="#fff" stroke-opacity=".6" stroke-width="3" fill="none"/><path d="M20 38h24" stroke="#e8b830" stroke-width="4" fill="none"/>`,
 cloak:c=>`<path d="M16 8h32l10 44c-8 6-18 8-26 8s-18-2-26-8z" fill="${c}"/><path d="M16 8q16 12 32 0" fill="#fff" opacity=".35" stroke="none"/><circle cx="32" cy="14" r="4" fill="#e8b830"/>`
});
Object.assign(P,{
 manure:'<path d="M12 46c0-10 8-12 12-14 2-10 14-10 16 0 8 2 12 6 12 14 0 6-6 8-20 8S12 52 12 46z" fill="#7a4a2a"/><path d="M26 30c0-6 10-6 10 0" fill="#8a5a36"/><circle cx="24" cy="46" r="2" fill="#3a2010" stroke="none"/><circle cx="38" cy="44" r="2" fill="#3a2010" stroke="none"/>',
 sack:c=>`<path d="M20 14h24l6 10 4 26c0 6-10 10-22 10S6 56 10 50l4-26z" fill="${c}"/><path d="M20 14c4 6 20 6 24 0" fill="#fff" opacity=".3" stroke="none"/><path d="M22 14h20" stroke-width="4"/>`,
 jar:c=>`<rect x="16" y="22" width="32" height="34" rx="8" fill="${c}"/><rect x="20" y="12" width="24" height="10" rx="3" fill="#b8803f"/><path d="M22 30v16" stroke="#fff" stroke-opacity=".5" stroke-width="3" fill="none"/>`,
 roll:c=>`<rect x="10" y="22" width="44" height="26" rx="6" fill="${c}"/><ellipse cx="54" cy="35" rx="5" ry="13" fill="#fff" opacity=".5"/><path d="M16 28h30M16 34h30M16 40h30" stroke="#000" stroke-opacity=".2" stroke-width="2" fill="none"/>`,
 ingot:c=>`<path d="M8 40l8-18h32l8 18z" fill="${c}"/><path d="M8 40h48v10H8z" fill="#000" opacity=".2"/><path d="M18 27h28" stroke="#fff" stroke-opacity=".6" stroke-width="3" fill="none"/>`,
 bottle:c=>`<path d="M26 6h12v12l8 10v28c0 2-2 4-4 4H22c-2 0-4-2-4-4V28l8-10z" fill="${c}"/><rect x="26" y="4" width="12" height="6" rx="2" fill="#b8803f"/><path d="M24 32v18" stroke="#fff" stroke-opacity=".5" stroke-width="3" fill="none"/>`,
 wagon:'<rect x="8" y="22" width="40" height="22" rx="4" fill="#b8803f"/><path d="M8 22q20-14 40 0z" fill="#f4efe0"/><circle cx="18" cy="48" r="8" fill="#6d4a28"/><circle cx="40" cy="48" r="8" fill="#6d4a28"/><circle cx="18" cy="48" r="3" fill="#c9a227"/><circle cx="40" cy="48" r="3" fill="#c9a227"/><path d="M48 32h10" stroke-width="3"/>',
 town:'<rect x="12" y="28" width="40" height="28" fill="#d9c8a0"/><path d="M8 30L32 8l24 22z" fill="#c0503a"/><rect x="26" y="40" width="12" height="16" fill="#6d4a28"/><rect x="16" y="34" width="8" height="8" fill="#6ab0e0"/><rect x="40" y="34" width="8" height="8" fill="#6ab0e0"/>'
});
Object.assign(P,{
 chest:'<rect x="8" y="26" width="48" height="30" rx="4" fill="#b8803f"/><path d="M8 30q24-22 48 0v-2c0-12-12-18-24-18S8 16 8 28z" fill="#d9a05a"/><rect x="28" y="30" width="8" height="12" rx="2" fill="#ffd84d"/><path d="M8 42h48" stroke-width="3" fill="none"/>',
 door:'<path d="M12 60V24a20 20 0 0140 0v36z" fill="#6d4a28"/><path d="M18 60V26a14 14 0 0128 0v34z" fill="#8a5a2b"/><circle cx="40" cy="42" r="3" fill="#ffd84d"/><path d="M32 12v48" stroke-width="2" fill="none"/>',
 campfire:'<path d="M10 52h44M16 58l32-12M48 58L16 46" stroke="#8a5a2b" stroke-width="5" fill="none"/><path d="M32 8c10 10 16 18 10 30-2 4-6 6-10 6s-8-2-10-6C16 26 22 18 32 8z" fill="#ff7a22"/><path d="M32 22c5 6 8 10 5 16-1 2-3 3-5 3s-4-1-5-3c-3-6 0-10 5-16z" fill="#ffd25a"/>'
});
const ANIART={
 chicken:SH+'<ellipse cx="50" cy="62" rx="28" ry="24" fill="#fff"/><path d="M76 58q16-4 12-18-12 6-14 14z" fill="#f4efe0"/><circle cx="36" cy="40" r="16" fill="#fff"/><path d="M30 26q6-10 12 0 4-8 10 2" fill="#ee3d3a"/><path d="M20 42l-10 4 10 4z" fill="#f2a31a"/>'+hl(34,34,6,4)+eye(36,40,4,'#3a2a1a')+'<path d="M40 86v8M56 86v8" stroke="#f2a31a" stroke-width="3"/>',
 sheep:SH+'<g fill="#fffaf0"><circle cx="32" cy="58" r="18"/><circle cx="52" cy="52" r="20"/><circle cx="70" cy="60" r="16"/><circle cx="46" cy="72" r="16"/></g><ellipse cx="28" cy="48" rx="12" ry="14" fill="#f2d8c0"/>'+eye(26,46,3.6,'#3a2a1a')+'<path d="M22 58q4 3 8 0" fill="none"/><path d="M36 84v8M64 84v8" stroke-width="4"/>',
 cow:SH+'<rect x="22" y="44" width="58" height="34" rx="14" fill="#fff"/><path d="M34 46l14 4-4 14-14-2zM62 56l14-2 2 14-14 4z" fill="#3a3a48" stroke="none"/><rect x="10" y="34" width="26" height="26" rx="10" fill="#fff"/><ellipse cx="22" cy="54" rx="10" ry="6" fill="#f2b8c0"/><path d="M12 34l-4-10 8 4zM34 34l4-10-8 4z" fill="#e8dfc4"/>'+eye(18,44,3.6,'#3a2a1a')+'<path d="M32 78v14M68 78v14" stroke-width="5"/>',
 bee:'<ellipse cx="46" cy="56" rx="24" ry="20" fill="#ffd23a"/><path d="M38 38v36M52 38v36" stroke="#241a35" stroke-width="7" fill="none"/><ellipse cx="38" cy="32" rx="14" ry="10" fill="#cfeaff" opacity=".85" transform="rotate(-20 38 32)"/><ellipse cx="58" cy="32" rx="14" ry="10" fill="#cfeaff" opacity=".85" transform="rotate(20 58 32)"/>'+hl(36,46,8,4)+eye(28,52,4)+'<path d="M70 56l12 4-12 4z" fill="#241a35"/>'
};
function bg(k,boss){
 // Combat arenas inherit the biome of the active dungeon or chronicle region.
 if(k==='arena'){
  const dungeon=S.dg?DG.find(d=>d.id===S.dg.id):null;
  const region=(()=>{try{return CH_REGIONS.find(r=>r.id===S.region)||null}catch(e){return null}})();
  const key=dungeon?({slime:'slimecave',goblin:'warren',spider:'spidernest',wolf:'forest',crypt:'crypt',orc:'stronghold',golem:'crystal',inferno:'inferno'}[dungeon.id]||'dungeon'):
   (region?({meadow:'meadow',woods:'forest',ember:'inferno',frost:'frost'}[region.id]||'dungeon'):'road');
  return bg(key,boss);
 }
 if(k==='slimecave')return BG(lg('slimebg','#173c54','#236d78','#10232e'),'<rect width="400" height="340" fill="url(#slimebg)"/><path d="M0 0h400v65l-35 22-30-20-40 30-35-25-45 22-45-28-40 25-40-25-55 25z" fill="#102b3b"/><path d="M0 270q80-35 150 0t250-5v75H0z" fill="#163f4b"/><g fill="#60f0c2" opacity=".72"><path d="M55 90q-15 28 0 48q15-20 0-48z"/><path d="M335 125q-15 28 0 48q15-20 0-48z"/><circle cx="120" cy="230" r="4"/><circle cx="280" cy="210" r="3"/></g><path d="M0 315h400v25H0z" fill="#091820"/>');
 if(k==='warren')return BG(lg('warrenbg','#62452e','#30251e','#171319'),'<rect width="400" height="340" fill="url(#warrenbg)"/><path d="M0 0h400v45l-45 25-30-20-45 35-40-32-40 25-40-30-40 25-40-25-35 20z" fill="#201813"/><path d="M0 250l80-45 60 30 60-60 70 65 60-35 70 40v95H0z" fill="#45301f"/><g fill="#f7a94c" opacity=".75"><circle cx="70" cy="140" r="5"/><circle cx="330" cy="165" r="5"/></g><path d="M0 300h400v40H0z" fill="#21170f"/>');
 if(k==='spidernest')return BG(lg('spiderbg','#251936','#4c3156','#140e20'),'<rect width="400" height="340" fill="url(#spiderbg)"/><g stroke="#c6a5d8" stroke-width="2" opacity=".45" fill="none"><path d="M0 0L400 340M400 0L0 340M200 0v340M0 170h400M50 0L350 340M350 0L50 340"/><circle cx="200" cy="170" r="100"/><circle cx="200" cy="170" r="65"/></g><path d="M0 285l60-45 55 45 60-55 55 55 60-45 55 45v55H0z" fill="#1a1025"/><g fill="#d9c4ff" opacity=".6"><circle cx="60" cy="100" r="3"/><circle cx="330" cy="85" r="3"/><circle cx="290" cy="220" r="2"/></g>');
 if(k==='forest'||k==='meadow')return BG(lg('forestbg',k==='meadow'?'#8bd0ed':'#172d32',k==='meadow'?'#5f9c5b':'#315c43','#15271f'),'<rect width="400" height="340" fill="url(#forestbg)"/><circle cx="310" cy="65" r="30" fill="#ffe9a0" opacity=".8"/><g fill="#173d2a"><path d="M0 260L35 65 80 260zM55 270L100 95 145 270zM275 270L320 55 365 270zM330 275L370 120 410 275z"/><path d="M0 300q100-55 200 0t200-10v50H0z" fill="#244a30"/></g><path d="M0 315h400v25H0z" fill="#18291d"/>');
 if(k==='crypt')return BG(lg('cryptbg','#20283d','#101522','#080b13'),'<rect width="400" height="340" fill="url(#cryptbg)"/><path d="M0 0h400v40h-40v55h-35V40h-50v70h-35V40h-55v55h-35V40H70v60H35V40H0z" fill="#30364a"/><g fill="#7bdcff" opacity=".7"><path d="M65 240l12-35 12 35zM310 250l12-45 12 45z"/><circle cx="200" cy="125" r="28" opacity=".15"/></g><path d="M0 295h400v45H0z" fill="#080b13"/><path d="M120 295v-75a80 80 0 01160 0v75" stroke="#454c62" stroke-width="12" fill="none"/>');
 if(k==='stronghold')return BG(lg('orcBg','#513522','#281a17','#100d11'),'<rect width="400" height="340" fill="url(#orcBg)"/><path d="M0 0h400v110l-35-25-35 25-35-25-35 25-35-25-35 25-35-25-35 25-35-25-35 25z" fill="#211511"/><path d="M35 340V100h35v240M330 340V100h35v240" fill="#493020"/><path d="M100 340V190a100 100 0 01200 0v150z" fill="#1a1111"/><g fill="#ff9a3d" opacity=".75"><circle cx="70" cy="190" r="6"/><circle cx="330" cy="190" r="6"/></g><path d="M0 300h400v40H0z" fill="#140e0d"/>');
 if(k==='crystal')return BG(lg('crystalbg','#152c4b','#254f7a','#0b1325'),'<rect width="400" height="340" fill="url(#crystalbg)"/><g fill="#5fe4ff" stroke="#b8f5ff" stroke-width="2"><path d="M35 300l25-120 28 120z"/><path d="M80 300l18-75 20 75z"/><path d="M285 300l28-150 30 150z"/><path d="M335 300l18-90 20 90z"/><path d="M160 300l20-60 22 60z"/></g><g fill="#a5f5ff" opacity=".5"><circle cx="100" cy="95" r="3"/><circle cx="265" cy="80" r="4"/><circle cx="210" cy="150" r="2"/></g><path d="M0 310h400v30H0z" fill="#09101d"/>');
 if(k==='inferno')return BG(lg('infernbg','#421b24','#9b3825','#211015'),'<rect width="400" height="340" fill="url(#infernbg)"/><path d="M0 230l60-70 45 40 55-105 50 100 65-65 70 90 55-50v170H0z" fill="#32171b"/><path d="M0 300q80-20 140 0t130-5 130 5v40H0z" fill="#170d12"/><g fill="#ffb13b"><path d="M70 310q-20-35 0-55 20 25 0 55z"/><path d="M330 315q-20-35 0-55 20 25 0 55z"/></g><path d="M145 340l35-75 35 75z" fill="#ff572b" opacity=".75"/>');
 if(k==='frost')return BG(lg('frostbg','#b5e8ff','#477ba8','#172c50'),'<rect width="400" height="340" fill="url(#frostbg)"/><circle cx="300" cy="65" r="28" fill="#effcff" opacity=".85"/><path d="M0 220l65-90 45 55 65-105 60 110 55-70 110 100v120H0z" fill="#254665"/><g fill="#baf2ff" stroke="#e9ffff" stroke-width="2"><path d="M35 310l25-100 24 100zM310 310l30-130 28 130zM250 310l18-75 20 75z"/></g><path d="M0 310h400v30H0z" fill="#12223b"/>');
 if(k==='brew')return BG('','<rect width="400" height="340" fill="#2a1a4a"/><path d="M0 120h400M0 210h400" stroke="#4a3070" stroke-width="10"/><g stroke-width="0"><rect x="30" y="80" width="26" height="40" rx="6" fill="#ff6b8a"/><rect x="80" y="90" width="22" height="30" rx="6" fill="#4adfd0"/><rect x="300" y="76" width="28" height="44" rx="6" fill="#c46bff"/><rect x="350" y="92" width="22" height="28" rx="6" fill="#ffe14a"/><rect x="44" y="170" width="24" height="40" rx="6" fill="#6fd45a"/><rect x="322" y="172" width="26" height="38" rx="6" fill="#4aa3ff"/></g><circle cx="200" cy="260" r="130" fill="#7a3fd0" opacity=".28"/>');
 if(k==='dungeon')return BG(lg('d1','#2a2438','#15101f'),'<rect width="400" height="340" fill="url(#d1)"/><path d="M0 70h400M0 150h400M0 230h400M70 0v70M210 70v80M330 0v70M130 150v80M290 150v80M60 230v110M200 230v110M340 230v110" stroke="#3a3350" stroke-width="3"/><g><circle cx="60" cy="120" r="26" fill="#ff9a3d" opacity=".28"/><circle cx="340" cy="120" r="26" fill="#ff9a3d" opacity=".28"/><path d="M60 126c-8-10-4-18 0-24 4 6 8 14 0 24zM340 126c-8-10-4-18 0-24 4 6 8 14 0 24z" fill="#ffb84a"/></g><path d="M0 290h400v50H0z" fill="#0d0a14"/>');
 if(k==='camp')return BG('','<rect width="400" height="340" fill="#0f1a2a"/><g fill="#14301f"><path d="M20 300l30-120 30 120z"/><path d="M90 300l24-90 24 90z"/><path d="M280 300l30-130 30 130z"/><path d="M340 300l22-80 22 80z"/></g><circle cx="200" cy="250" r="110" fill="#ff7a22" opacity=".22"/><path d="M0 290h400v50H0z" fill="#0a1220"/><g fill="#fff"><circle cx="40" cy="40" r="1.5"/><circle cx="300" cy="60" r="1.5"/><circle cx="150" cy="30" r="1.5"/><circle cx="360" cy="110" r="1.5"/></g>');
 if(k==='treasure')return BG('<radialGradient id="t1"><stop offset="0" stop-color="#ffe9a0"/><stop offset=".5" stop-color="#8a5a1a"/><stop offset="1" stop-color="#1a1008"/></radialGradient>','<rect width="400" height="340" fill="url(#t1)"/><g fill="#fff"><circle class="tw" cx="80" cy="80" r="2"/><circle class="tw" cx="320" cy="100" r="2"/><circle class="tw" cx="60" cy="220" r="1.6"/><circle class="tw" cx="340" cy="240" r="2"/></g><path d="M0 290h400v50H0z" fill="#120a04"/>');
 return bgBase(k,boss);
}


/* ---------- AI painted environment pack: locally embedded, offline-ready ---------- */
const AI_BG = {
  slimecave:'{{BLOB:b0084.jpg}}',
  warren:'{{BLOB:b0085.jpg}}',
  spidernest:'{{BLOB:b0086.jpg}}',
  forest:'{{BLOB:b0087.jpg}}',
  crypt:'{{BLOB:b0088.jpg}}',
  stronghold:'{{BLOB:b0089.jpg}}',
  crystal:'{{BLOB:b0090.jpg}}',
  inferno:'{{BLOB:b0091.jpg}}',
  frost:'{{BLOB:b0092.jpg}}'
};
const AI_TITLE_BG = '{{BLOB:b0093.jpg}}';
const _bgSvgFallback = bg;
const _AI_DUNGEON_BG = {slime:'slimecave',goblin:'warren',spider:'spidernest',wolf:'forest',crypt:'crypt',orc:'stronghold',golem:'crystal',inferno:'inferno'};
function _aiBackgroundMarkup(key){
  const src = AI_BG[key] || AI_BG.forest;
  return '<div class="bgs ai-bgs ai-bg-'+key+'" style="background-image:url(\''+src+'\')"></div>';
}
bg = function(k,boss){
  if(k==='arena' || k==='dungeon' || k==='battle'){
    const dungeon = S.dg && typeof DG!=='undefined' ? DG.find(d=>d.id===S.dg.id) : null;
    const region = (()=>{try{return CH_REGIONS.find(r=>r.id===S.region)||null}catch(e){return null}})();
    let key;
    if(dungeon) key = _AI_DUNGEON_BG[dungeon.id] || 'crypt';
    else if(region) key = ({meadow:'forest',woods:'forest',ember:'inferno',frost:'frost'})[region.id] || 'forest';
    else key = 'forest';
    return _aiBackgroundMarkup(key);
  }
  if(AI_BG[k]) return _aiBackgroundMarkup(k);
  return _bgSvgFallback(k,boss);
};

/* ---------- data ---------- */
const TC=['#8f8579','#d9803f','#c9d6e4','#ffcc33','#f0f4ff','#7ad8ff','#ff6a5a','#eee6d0','#b8803f','#e9d9ff','#c9b8a0'];
const SK=['farm','barn','fish','mine','smith','alch','combat','trade','wood','arcane','tailor','leather'];
const SKN={farm:'Farming',barn:'Husbandry',fish:'Fishing',mine:'Mining',smith:'Smithing',alch:'Alchemy',combat:'Combat',trade:'Trading',wood:'Woodcutting',arcane:'Arcana',tailor:'Tailoring',leather:'Leatherworking'};
const SKI={farm:['sprout'],barn:['egg'],fish:['fish','#8fb3c9'],mine:['pick','#c9d6e4'],smith:['anvil'],alch:['flask','#7ad8ff'],combat:['sword','#c9d6e4'],trade:['coin'],wood:['axe','#b8803f'],arcane:['core','#b36bff'],tailor:['wool'],leather:['hide']};
const CROPS=[
 {n:'Radish',ic:'carrot',cost:2,t:6,sell:5,xp:2,l:1},
 {n:'Wheat',ic:'wheat',cost:6,t:16,sell:17,xp:5,l:1},
 {n:'Herbs',ic:'herb',cost:5,t:20,sell:0,xp:3,l:1,give:'herb',q:2},
 {n:'Pumpkin',ic:'pumpkin',cost:20,t:45,sell:68,xp:14,l:2},
 {n:'Tomato',ic:'tomato',cost:30,t:70,sell:120,xp:22,l:4},
 {n:'Melon',ic:'melon',cost:60,t:120,sell:270,xp:40,l:7},
 {n:'Hay',ic:'wheat',cost:3,t:12,sell:0,xp:2,l:1,give:'hay',q:3},
 {n:'Clover',ic:'leaf',cost:6,t:20,sell:0,xp:3,l:2,give:'clover',q:3},
 {n:'Corn',ic:'wheat',cost:10,t:35,sell:0,xp:6,l:4,give:'corn',q:3},
  {n:'Potato',ic:'spr:potato',cost:10,t:28,sell:36,xp:8,l:2},
  {n:'Turnip',ic:'spr:turnip',cost:14,t:36,sell:52,xp:11,l:3},
  {n:'Cabbage',ic:'spr:cabbage',cost:24,t:55,sell:92,xp:17,l:3},
  {n:'Garlic',ic:'spr:garlic',cost:34,t:75,sell:140,xp:23,l:5},
  {n:'Strawberry',ic:'spr:strawberry',cost:50,t:100,sell:215,xp:32,l:6},
  {n:'Rice',ic:'spr:rice',cost:70,t:140,sell:320,xp:46,l:8},
  {n:'Grapes',ic:'spr:grapes',cost:90,t:170,sell:430,xp:58,l:9},
  {n:'Apple',ic:'spr:apple',cost:130,t:230,sell:680,xp:85,l:11}
];
const CROP_ART_KEY_BY_NAME={"Radish":"radish","Wheat":"wheat","Herbs":"herb","Pumpkin":"pumpkin","Tomato":"tomato","Melon":"melon","Hay":"hay","Clover":"clover","Corn":"corn","Potato":"potato","Turnip":"turnip","Cabbage":"cabbage","Garlic":"garlic","Strawberry":"strawberry","Rice":"rice","Grapes":"grapes","Apple":"apple"};
CROPS.forEach(c=>{const k=CROP_ART_KEY_BY_NAME[c.n];if(k)c.ic="pixelcrop:"+k});
const FISH=[
 {id:'sardine',n:'Sardine',ic:'fish',col:'#8fb3c9',v:4,xp:3,l:1},
 {id:'bass',n:'Bass',ic:'fish',col:'#f0a23a',v:10,xp:6,l:3},
 {id:'puffer',n:'Pufferfish',ic:'puffer',v:24,xp:12,l:5},
 {id:'squid',n:'Squid',ic:'squid',v:40,xp:18,l:7},
 {id:'shark',n:'Shark',ic:'shark',v:85,xp:35,l:9}
];
const ORES=[{id:'copper',n:'Copper Ore',col:'#e0833f',v:4},{id:'iron',n:'Iron Ore',col:'#d6e0ec',v:9},{id:'silver',n:'Silver Ore',col:'#f2f6ff',v:20},{id:'gold',n:'Gold Ore',col:'#ffcc33',v:40},{id:'mithril',n:'Mithril Ore',col:'#7ad8ff',v:90}];
const ORE_L=[1,3,5,7,10];
const MATS={
 gel:{n:'Slime Gel',ic:'gel',col:'#5fe08a',v:3},hide:{n:'Hide',ic:'hide',col:'#b8803f',v:5},fur:{n:'Wolf Fur',ic:'hide',col:'#c9b8a0',v:8},
 fang:{n:'Fang',ic:'fang',v:7},bone:{n:'Bone',ic:'bone',v:6},wing:{n:'Bat Wing',ic:'wing',col:'#8a66cc',v:6},silk:{n:'Spider Silk',ic:'silk',v:9},
 horn:{n:'Horn',ic:'horn',v:14},wisp:{n:'Wisp Essence',ic:'wisp',v:14},core:{n:'Magic Core',ic:'core',col:'#53d4ff',v:30},scale:{n:'Dragon Scale',ic:'scale',col:'#ff6a5a',v:60},
 herb:{n:'Healing Herb',ic:'herb',v:4},egg:{n:'Egg',ic:'egg',v:6},feather:{n:'Feather',ic:'feather',v:3},wool:{n:'Wool',ic:'wool',v:18},milk:{n:'Milk',ic:'milk',v:30},honey:{n:'Honey',ic:'honey',v:28}
};
MATS.manure={n:'Manure',ic:'manure',v:2};
[['oak','Oak Log',4,'#8a5a2b'],['birch','Birch Log',7,'#e8e0c8'],['pine','Pine Log',10,'#3b7a4a'],['ironwood','Ironwood Log',16,'#8a8a9a'],['elder','Elderwood Log',36,'#b36bff'],['agem','Arcane Gem',90,'#b36bff'],['starstone','Starstone',260,'#ffa530']].forEach(m=>MATS[m[0]]={n:m[1],ic:m[0]==='agem'||m[0]==='starstone'?'core':'club',col:m[3],v:m[2]});
const W=(id,n,a,col,atk,sp,cr,l,g,r)=>({id,c:'w',n,a,col,atk,sp,cr,l,g,r});
const A=(id,n,a,col,def,sh,hp,l,g,r,cr)=>({id,c:'a',n,a,col,def,sh,hp,l,g,r,cr:cr||0});
const K=(id,n,col,pw,l,g,r)=>({id,c:'p',n,a:'pick',col,pw,l,g,r});
const IT=[
 W('w_rusty','Rusty Sword','sword',0,3,1,5),
 W('w_dagger','Dagger','dagger',1,4,.55,14,1,10,[['copper',4]]),
 W('w_club','Bone Club','club',7,6,1.1,6,1,8,[['bone',5],['hide',2]]),
 W('w_short','Short Sword','sword',1,7,.9,6,1,20,[['copper',6]]),
 W('w_bow','Hunter Bow','bow',8,9,.8,15,2,30,[['bone',3],['silk',3],['hide',2]]),
 W('w_axe','Hand Axe','axe',2,12,1.2,8,3,45,[['iron',6]]),
 W('w_katana','Katana','katana',2,11,.7,20,4,80,[['iron',8]]),
 W('w_spear','Spear','spear',2,16,1,10,5,110,[['iron',10],['fang',3]]),
 W('w_saber','Silver Saber','katana',4,18,.75,18,6,150,[['silver',8],['fang',4]]),
 W('w_hammer','War Hammer','hammer',3,30,1.8,8,7,160,[['gold',8]]),
 W('w_great','Greatsword','great',3,26,1.15,12,8,260,[['gold',10],['bone',6]]),
 W('w_staff','Mage Staff','staff',5,24,.9,22,9,300,[['silver',6],['core',2],['wisp',3]]),
 W('w_rapier','Golden Rapier','rapier',3,21,.5,26,10,400,[['gold',10],['core',1]]),
 W('w_mithril','Mithril Blade','sword',5,38,.8,24,11,600,[['mithril',10],['core',2]]),
 W('w_dragon','Dragonfang Blade','great',6,55,.9,28,13,1200,[['scale',8],['fang',6],['mithril',4],['gold',6]]),
 A('a_cloth','Cloth Tunic','tunic',0,0,0,0),
 A('a_leather','Leather Armor','leather',8,3,0,14,1,15,[['hide',6]]),
 A('a_copper','Copper Mail','mail',1,4,8,6,1,30,[['copper',8]]),
 A('a_fur','Wolf Fur Cloak','cloak',10,5,6,22,3,40,[['fur',6],['hide',3]]),
 A('a_iron','Iron Mail','mail',2,9,18,12,3,90,[['iron',10]]),
 A('a_silk','Spider Silk Robe','robe',9,4,28,8,4,80,[['silk',8],['wisp',1]],6),
 A('a_knight','Knight Plate','plate',2,15,30,20,5,180,[['iron',14],['hide',4]]),
 A('a_silver','Silver Mail','mail',4,17,34,22,6,220,[['silver',10],['hide',4]]),
 A('a_gold','Golden Armor','plate',3,22,45,30,7,300,[['gold',12]]),
 A('a_brute','Brute Armor','leather',7,20,20,60,8,250,[['hide',10],['horn',5],['fur',4]]),
 A('a_mithril','Mithril Armor','plate',5,30,60,40,10,520,[['mithril',12],['core',2]]),
 A('a_dragon','Dragon Scale Armor','plate',6,40,80,60,13,1000,[['scale',12],['horn',4],['mithril',4]]),
 K('p_stone','Stone Pick',0,1),
 K('p_copper','Copper Pick',1,1.5,1,10,[['copper',5]]),
 K('p_iron','Iron Pick',2,2,3,40,[['iron',7]]),
 K('p_silver','Silver Pick',4,2.5,6,100,[['silver',8]]),
 K('p_gold','Gold Pick',3,3,7,120,[['gold',10]]),
 K('p_mithril','Mithril Pick',5,3.5,10,400,[['mithril',10],['core',1]])
];
[['w_oakbow','Oak Bow','bow',8,11,.75,14,2,25,[['oak',6],['silk',2]],'archer'],['w_pinebow','Pine Longbow','bow',8,22,.8,18,5,70,[['pine',8],['feather',4]],'archer'],['w_elderbow','Elder Warbow','bow',9,40,.75,24,12,200,[['elder',10],['scale',2]],'archer'],
['w_oakstaff','Oak Staff','spear',8,10,1,8,2,25,[['oak',5],['wisp',2]],'mage'],['w_birchstaff','Birch Stave','spear',4,18,.95,10,4,60,[['birch',6],['core',1]],'mage'],['w_elderstaff','Elder Staff','spear',9,42,.9,12,12,220,[['elder',10],['core',3]],'mage'],
['w_birchdag','Birch Stiletto','dagger',4,8,.45,25,3,40,[['birch',4],['iron',2]],'rogue'],['w_ebon','Ironwood Fang','dagger',5,26,.45,30,8,140,[['ironwood',6],['fang',4]],'rogue']].forEach(a=>IT.push({...W(...a.slice(0,10)),x:'wood',k:a[10]}));
[['hay','Hay',1,'#d8c060','wheat'],['clover','Clover',2,'#5fd05f','herb'],['corn','Corn',3,'#ffcc33','wheat'],['truffle','Truffle',40,'#6b4a30','herb'],['gmilk','Goat Milk',22,'#fffdf4','milk'],['duckegg','Duck Egg',9,'#cfe8ff','egg'],['pelt','Rabbit Pelt',12,'#d9c8b8','hide'],['llama','Llama Wool',35,'#e8c9a0','wool'],['mana','Mana Dust',8,'#7ad8ff','core'],['rune','Rune Shard',22,'#b36bff','core'],['essence','Arcane Essence',55,'#ff7ad9','core'],['thread','Thread',4,'#e8e0c8','wool'],['cloth','Cloth',14,'#c9d6e4','wool'],['silkcloth','Silk Cloth',34,'#ffe9a8','silk'],['leather','Leather',9,'#b8803f','hide'],['cured','Cured Leather',22,'#8a5a2b','hide']].forEach(m=>MATS[m[0]]={n:m[1],ic:m[4],col:m[3],v:m[2]});
[['coal','Coal',6,'#3a3a44','ore'],['crystal','Crystal Shard',35,'#7ad8ff','core'],['obsidian','Obsidian',50,'#4a2a6a','ore'],['focus','Crystal Focus',90,'#7ad8ff','core']].forEach(m=>MATS[m[0]]={n:m[1],ic:m[4],col:m[3],v:m[2]});
[['cbar','Copper Bar',14,'#e0833f'],['ibar','Iron Bar',30,'#d6e0ec'],['sbar','Silver Bar',70,'#f2f6ff'],['gbar','Gold Bar',140,'#ffcc33'],['mbar','Mithril Bar',300,'#7ad8ff'],['steel','Steel Bar',90,'#aab4c4'],['obsal','Obsidian Alloy',150,'#6a3a9a'],['starsteel','Starsteel Bar',500,'#ffa530']].forEach(m=>MATS[m[0]]={n:m[1],ic:'ingot',col:m[3],v:m[2]});
MATS.pearl={n:'Pearl',ic:'core',col:'#f4f0ff',v:120};
FISH.push({id:'carp',n:'Carp',ic:'fish',col:'#c9a050',v:7,xp:4,l:1},{id:'trout',n:'Trout',ic:'fish',col:'#e08a7a',v:14,xp:8,l:4},{id:'salmon',n:'Salmon',ic:'fish',col:'#ff8a6a',v:24,xp:12,l:6},{id:'tuna',n:'Tuna',ic:'fish',col:'#4a78c0',v:52,xp:22,l:8},{id:'swordfish',n:'Swordfish',ic:'fish',col:'#7ab8e0',v:75,xp:28,l:9},{id:'eel',n:'Abyss Eel',ic:'fish',col:'#5fd0a0',v:100,xp:40,l:12},{id:'angler',n:'Anglerfish',ic:'fish',col:'#9a56d8',v:130,xp:50,l:13},{id:'kraken',n:'Baby Kraken',ic:'squid',col:'#a04adf',v:230,xp:80,l:16});
const VAL={};ORES.forEach(o=>VAL[o.id]=o.v);Object.keys(MATS).forEach(k=>VAL[k]=MATS[k].v);FISH.forEach(f=>VAL[f.id]=f.v);
IT.forEach(i=>i.v=i.r?Math.round(.8*(i.g+i.r.reduce((a,x)=>a+x[1]*VAL[x[0]],0))):0);
const POTS=[
 {id:'pot_hp1',n:'Minor Healing',col:'#ff6b8a',l:1,r:[['gel',2],['herb',1]],heal:40,d:'Heals 40 HP'},
 {id:'pot_hp2',n:'Healing Potion',col:'#ff3b6a',l:3,r:[['gel',4],['herb',3]],heal:100,d:'Heals 100 HP'},
 {id:'pot_hp3',n:'Greater Healing',col:'#d4144a',l:6,r:[['gel',6],['herb',5],['wisp',1]],heal:220,d:'Heals 220 HP'},
 {id:'pot_sh',n:'Shield Tonic',col:'#4aa3ff',l:2,r:[['silk',2],['gel',2]],sh:1,d:'Fully restores your shield'},
 {id:'pot_atk',n:'Attack Tonic',col:'#ff8a3a',l:2,r:[['fang',2],['bone',1]],buff:'atk',d:'+35% damage for 90s'},
 {id:'pot_spd',n:'Swift Draught',col:'#ffe14a',l:3,r:[['wing',2],['feather',2]],buff:'spd',d:'+30% attack speed for 90s'},
 {id:'pot_crit',n:'Sharp Eye',col:'#c46bff',l:4,r:[['core',1],['honey',1]],buff:'crit',d:'+20% crit chance for 90s'},
 {id:'pot_def',n:'Ironskin',col:'#9aa6b8',l:4,r:[['hide',2],['bone',2]],buff:'def',d:'+8 defense for 90s'},
 {id:'pot_grow',n:'Growth Tonic',col:'#6fd45a',l:2,r:[['herb',3],['milk',1]],buff:'grow',dur:180,d:'Crops planted grow 2x faster (3 min)'},
 {id:'pot_luck',n:'Angler’s Brew',col:'#4adfd0',l:2,r:[['egg',2],['herb',2]],buff:'fish',dur:120,d:'Fish appear 2x faster (2 min)'}
];
const FERTS=[
 {id:'manure',n:'Manure',col:'#7a4a2a',spd:.15,dbl:.2,tri:0},
 {id:'f_compost',n:'Compost',col:'#8a6a3a',l:1,r:[['manure',2],['herb',1]],d:'Crops grow 30% faster, 40% double yield',spd:.3,dbl:.4,tri:0},
 {id:'f_bone',n:'Bone Meal',col:'#eee6d0',l:5,r:[['bone',3],['manure',1]],d:'Crops grow 45% faster, 55% double yield',spd:.45,dbl:.55,tri:0},
 {id:'f_super',n:'Miracle Mix',col:'#7ad8ff',l:10,r:[['manure',3],['herb',3],['core',1]],d:'60% faster, always double, 30% triple',spd:.6,dbl:1,tri:.3}
];
const ALLR=POTS.concat(FERTS.filter(f=>f.r));
const TRADE=[
 {id:'t_grain',n:'Grain',ic:'sack',col:'#e6c34a',b:10},{id:'t_fish',n:'Salted Fish',ic:'fish',col:'#c9b8a0',b:14},
 {id:'t_cloth',n:'Wool Cloth',ic:'roll',col:'#f4efe0',b:22},{id:'t_iron',n:'Iron Ingots',ic:'ingot',col:'#c9d6e4',b:30},
 {id:'t_spice',n:'Spices',ic:'jar',col:'#e0603a',b:45},{id:'t_wine',n:'Wine',ic:'bottle',col:'#a04adf',b:50},
 {id:'t_silk',n:'Silk Rolls',ic:'roll',col:'#e9d9ff',b:60},{id:'t_gem',n:'Gems',ic:'core',col:'#ff7ad9',b:120}
];
const TOWNS=[
 {id:'green',n:'Greenvale',x:16,y:70,m:[.6,1.1,.7,1.5,1.5,1.1,1.3,1.5],c:[1,.9,1,.9]},
 {id:'iron',n:'Ironhold',x:74,y:24,m:[1.5,1.4,1.3,.6,1.2,1.5,1.2,.65],c:[1.3,.8,1.2,1.3]},
 {id:'port',n:'Seaport',x:80,y:74,m:[1.1,.6,1.5,1.4,.65,1.3,1.1,1.2],c:[.8,1.2,1,1.1]},
 {id:'mist',n:'Mistwood',x:32,y:22,m:[1.4,1.2,.9,1.1,1.6,.6,.65,1.1],c:[1.1,1.3,.9,1.2]},
 {id:'dunes',n:'Sandmoor',x:50,y:56,m:[1.3,1.5,1.2,1.3,.6,1.2,1.5,.7],c:[1.4,1.1,1.1,1.3]}
];
const BN={atk:'Attack',spd:'Speed',crit:'Crit',def:'Defense',grow:'Growth',fish:'Fishing'};
const ANI=[
 {id:'chicken',n:'Chicken',cost:30,t:20,give:['egg'],extra:['feather',.35]},
 {id:'sheep',n:'Sheep',cost:80,t:45,give:['wool']},
 {id:'bee',n:'Bees',cost:120,t:40,give:['honey']},
 {id:'cow',n:'Cow',cost:200,t:60,give:['milk'],extra:['hide',.15]},
 {id:'duck',n:'Duck',cost:45,t:25,give:['duckegg'],extra:['feather',.5]},
 {id:'rabbit',n:'Rabbit',cost:70,t:30,give:['pelt']},
 {id:'goat',n:'Goat',cost:110,t:50,give:['gmilk']},
 {id:'pig',n:'Pig',cost:150,t:55,give:['truffle'],extra:['hide',.25]},
 {id:'llama',n:'Llama',cost:260,t:75,give:['llama'],extra:['wool',.3]}
];
Object.assign(ANIART,{
 duck:SH+'<ellipse cx="52" cy="64" rx="28" ry="20" fill="#ffe45c"/><circle cx="34" cy="42" r="15" fill="#ffe45c"/><path d="M20 44q-12 2-12 6 10 4 14 0z" fill="#ff9a2a"/><path d="M74 60q14-6 10-16-10 4-12 14z" fill="#f2d040"/>'+eye(34,38,3.6),
 rabbit:SH+'<ellipse cx="50" cy="66" rx="26" ry="22" fill="#e8dccc"/><circle cx="36" cy="48" r="15" fill="#e8dccc"/><ellipse cx="30" cy="20" rx="6" ry="16" fill="#e8dccc"/><ellipse cx="44" cy="18" rx="6" ry="16" fill="#e8dccc"/><circle cx="76" cy="68" r="7" fill="#fff"/>'+eye(34,46,3.6),
 goat:SH+'<rect x="26" y="46" width="52" height="30" rx="12" fill="#f4efe6"/><rect x="10" y="32" width="26" height="26" rx="10" fill="#f4efe6"/><path d="M14 32l-4-14 10 10zM30 32l6-14 2 14z" fill="#8a7a60"/><path d="M16 56l4 10 4-10z" fill="#d8c8a8"/>'+eye(22,44,3.4),
 pig:SH+'<ellipse cx="50" cy="62" rx="30" ry="22" fill="#f6a7b8"/><circle cx="30" cy="48" r="16" fill="#f6a7b8"/><ellipse cx="20" cy="52" rx="7" ry="5" fill="#e98aa0"/><path d="M24 36l-6-10 12 4zM38 34l4-12 8 8z" fill="#e98aa0"/>'+eye(30,44,3.5),
 llama:SH+'<rect x="30" y="50" width="46" height="28" rx="12" fill="#e8c9a0"/><rect x="18" y="14" width="16" height="44" rx="8" fill="#e8c9a0"/><rect x="10" y="12" width="22" height="16" rx="7" fill="#f4dcb8"/><path d="M16 12l-2-10 6 8zM28 12l4-10 0 10z" fill="#c9a070"/>'+eye(20,18,3)
});
const DROPS={Slime:[['gel',1,1,2]],Rat:[['hide',.7,1,1],['fang',.2,1,1]],Bat:[['wing',.7,1,1],['fang',.25,1,1]],Goblin:[['hide',.6,1,2],['bone',.4,1,1],['copper',.25,1,2]],Spider:[['silk',.8,1,2],['fang',.3,1,1]],Wolf:[['fur',.8,1,2],['fang',.5,1,1],['hide',.3,1,1]],Skeleton:[['bone',.9,1,3],['iron',.25,1,1]],Orc:[['hide',.7,1,2],['horn',.4,1,1],['iron',.3,1,2]],Ghost:[['wisp',.8,1,1],['silk',.2,1,1]],Golem:[['core',.5,1,1],['iron',.6,1,3],['silver',.3,1,1]],Troll:[['hide',.8,1,3],['horn',.5,1,2],['fur',.4,1,2]],Imp:[['horn',.6,1,2],['core',.4,1,1],['wisp',.4,1,2],['gold',.3,1,1]],'Slime King':[['gel',1,5,8],['core',1,1,1]],'Orc Warlord':[['horn',1,3,3],['iron',1,3,4],['hide',1,4,4],['silver',.6,2,3]],Dragon:[['scale',1,5,8],['fang',1,3,3],['core',1,2,2],['gold',1,4,5],['mithril',.5,1,2]],Lich:[['wisp',1,6,6],['bone',1,6,6],['core',1,4,4],['mithril',1,3,4]]};
const CV=(base,name,reps,o)=>{const b=FOES.find(f=>f.n===base);let a=b.a;reps.forEach(r=>{a=a.split(r[0]).join(r[1])});const l=o.l||b.l;FOES.push({...b,...o,n:name,l,a:a+(o.x||''),sp:o.b?2.2:Math.max(1.4,2.5-.1*l)});if(!DROPS[name])DROPS[name]=DROPS[base]||[]};
const CR='<path d="M32 30l4-14 7 8 7-12 7 12 7-8 4 14z" fill="#ffcc33"/>';
CV('Slime','Blue Slime',[['#58d36a','#4aa3e8']],{hp:14,atk:3,xp:6,c:5,l:2});
CV('Slime','Acid Slime',[['#58d36a','#b8e03a']],{hp:20,atk:4,xp:9,c:8,l:3});
CV('Slime King','Ooze Titan',[['#4aa3e8','#a04adf'],['#ffcc33','#ff7ad9']],{b:1,hp:120,atk:9,xp:90,c:120,l:5,x:'<path d="M26 34L16 12l16 10zM74 34l10-22-16 10z" fill="#5a2a8a"/>'});
CV('Goblin','Goblin Shaman',[['#86cf5e','#b79ae0'],['#7cc356','#a280d0']],{hp:24,atk:6,xp:12,c:12,l:4});
CV('Goblin','Goblin Archer',[['#86cf5e','#d6b062'],['#7cc356','#c09a4a']],{hp:40,atk:11,xp:20,c:20,l:8});
CV('Goblin','Goblin Spear',[['#86cf5e','#b58a45'],['#7cc356','#9b7138']],{hp:48,atk:13,xp:24,c:24,l:8});
CV('Goblin','Goblin Chief',[['#86cf5e','#5f9f40']],{b:1,hp:90,atk:9,xp:60,c:70,l:4,x:CR});
CV('Goblin','Goblin King',[['#86cf5e','#3f7f38'],['#8a5a2b','#c0303d']],{b:1,hp:210,atk:14,xp:140,c:180,l:6,x:CR});
CV('Spider','Giant Spider',[['#4a3a5c','#7a2a3a'],['#5a4872','#8a3a4a']],{hp:60,atk:10,xp:30,c:30,l:5});
CV('Spider','Broodmother',[['#4a3a5c','#8a2a5a'],['#5a4872','#a04a7a']],{b:1,hp:140,atk:12,xp:90,c:100,l:6});
CV('Spider','Arachne Queen',[['#4a3a5c','#3a2a8a'],['#5a4872','#5a4aa8']],{b:1,hp:300,atk:17,xp:200,c:260,l:8,x:CR});
CV('Wolf','Dire Wolf',[['#9296aa','#555a6a'],['#6c6f7c','#3a3e4a']],{hp:60,atk:12,xp:28,c:28,l:8});
CV('Wolf','Alpha Wolf',[['#9296aa','#3a3a4a'],['#6c6f7c','#2a2a36'],['#f2b705','#ff4a4a']],{b:1,hp:200,atk:17,xp:120,c:150,l:9});
CV('Wolf','Fenrir',[['#9296aa','#e8f0ff'],['#6c6f7c','#b8c8e8'],['#f2b705','#4ac8ff']],{b:1,hp:420,atk:23,xp:280,c:380,l:11});
CV('Skeleton','Skeleton Knight',[['#efe9d6','#9aa6b8'],['#f6f1e2','#b8c4d6']],{hp:80,atk:15,xp:40,c:40,l:11});
CV('Skeleton','Bone Lord',[['#efe9d6','#e8c860'],['#f6f1e2','#f4e08a']],{b:1,hp:260,atk:20,xp:160,c:200,l:12,x:CR});
CV('Orc','Orc Berserker',[['#6aa043','#a04a3a']],{hp:120,atk:20,xp:60,c:60,l:14});
CV('Orc','Orc Emperor',[['#6aa043','#3a2a4a']],{b:1,hp:700,atk:34,xp:420,c:600,l:16,x:'<path d="M20 44C20 10 80 10 80 44z" fill="#ffcc33"/>'});
CV('Golem','Obsidian Golem',[['#8f8fa0','#5a4a7a'],['#7a7a8a','#4a3a6a'],['#a0a0b2','#6a5a8a']],{hp:260,atk:28,xp:100,c:120,l:18});
CV('Golem','Crystal Golem',[['#8f8fa0','#6bc8ff'],['#7a7a8a','#4aa8e0'],['#a0a0b2','#9ae0ff']],{b:1,hp:520,atk:34,xp:300,c:360,l:19});
CV('Golem','Titan Colossus',[['#8f8fa0','#ffd84d'],['#7a7a8a','#d9b020'],['#a0a0b2','#ffe680']],{b:1,hp:1100,atk:44,xp:600,c:900,l:21});
CV('Imp','Flame Imp',[['#e04a3e','#ff8a2a'],['#b33030','#d96a1a']],{hp:260,atk:38,xp:140,c:160,l:22});
CV('Imp','Infernal Duke',[['#e04a3e','#a01a4a'],['#b33030','#701036'],['#8a2020','#4a0a2a']],{b:1,hp:800,atk:46,xp:700,c:1100,l:23});
Object.assign(DROPS,{'Ooze Titan':[['gel',1,8,12],['core',1,2,3],['silver',1,2,3]],'Goblin Chief':[['hide',1,3,4],['iron',1,2,3]],'Goblin King':[['hide',1,5,6],['bone',1,4,5],['core',1,2,2],['silver',1,2,3]],'Broodmother':[['silk',1,4,5],['fang',1,3,3]],'Arachne Queen':[['silk',1,8,10],['fang',1,5,5],['core',1,3,3],['gold',1,2,3]],'Alpha Wolf':[['fur',1,4,5],['fang',1,4,4]],'Fenrir':[['fur',1,8,10],['fang',1,6,6],['core',1,3,3],['silver',1,4,5]],'Bone Lord':[['bone',1,6,8],['core',1,2,2],['silver',1,3,4]],'Orc Emperor':[['horn',1,5,6],['hide',1,8,8],['iron',1,6,8],['gold',1,3,4],['core',1,3,3]],'Crystal Golem':[['core',1,4,5],['silver',1,4,5],['iron',1,6,6]],'Titan Colossus':[['core',1,6,6],['gold',1,6,8],['mithril',1,3,4]],'Infernal Duke':[['horn',1,5,5],['wisp',1,5,5],['core',1,4,4],['gold',1,5,5]]});
const TR={Slime:{ab:'slow'},'Blue Slime':{ab:'slow'},'Acid Slime':{ab:'poison'},Rat:{ab:'bleed',dodge:.1},Bat:{dodge:.2,ab:'drain'},'Goblin Shaman':{ab:'burn'},'Goblin Archer':{dodge:.15,ab:'bleed'},Spider:{ab:'poison'},'Giant Spider':{ab:'poison',def:4},Broodmother:{ab:'poison',heavy:1},'Arachne Queen':{ab:'poison',heavy:1},Wolf:{ab:'bleed'},'Dire Wolf':{ab:'bleed',def:3},'Alpha Wolf':{ab:'bleed',heavy:1},Fenrir:{ab:'bleed',heavy:1,dodge:.1},Skeleton:{def:6},'Skeleton Knight':{def:10},Ghost:{dodge:.35,ab:'drain'},'Bone Lord':{def:10,heavy:1},Lich:{ab:'drain',heavy:1,dodge:.1},Orc:{def:4,heavy:1},'Orc Berserker':{ab:'bleed',heavy:1},'Orc Warlord':{def:8,heavy:1},'Orc Emperor':{def:12,heavy:1},Troll:{reg:.01,heavy:1},Golem:{def:14,heavy:1},'Obsidian Golem':{def:18,heavy:1},'Crystal Golem':{def:16,heavy:1},'Titan Colossus':{def:22,heavy:1},Imp:{dodge:.1,ab:'burn'},'Flame Imp':{dodge:.1,ab:'burn'},'Infernal Duke':{ab:'burn',heavy:1},Dragon:{ab:'burn',heavy:1,def:10},'Slime King':{ab:'slow',heavy:1},'Ooze Titan':{ab:'slow',heavy:1,reg:.005},'Goblin Chief':{heavy:1},'Goblin King':{heavy:1,ab:'burn'}};
const DG=[
 {id:'slime',n:'Slime Cave',l:1,mons:['Slime','Blue Slime','Acid Slime'],elite:'Acid Slime',boss:'Slime King',final:'Ooze Titan',dm:1,bm:1,ch:60},
 {id:'goblin',n:'Goblin Warren',l:3,mons:['Goblin','Rat','Goblin Shaman','Goblin Spear'],elite:'Goblin Shaman',boss:'Goblin Chief',final:'Goblin King',dm:1.3,bm:1,ch:140},
 {id:'spider',n:'Spider Nest',l:5,mons:['Bat','Spider','Rat'],elite:'Giant Spider',boss:'Broodmother',final:'Arachne Queen',dm:1.6,bm:1,ch:240},
 {id:'wolf',n:'Wolf Forest',l:8,mons:['Wolf','Dire Wolf','Goblin Archer'],elite:'Dire Wolf',boss:'Alpha Wolf',final:'Fenrir',dm:1.8,bm:1,ch:400},
 {id:'crypt',n:'Haunted Crypt',l:11,mons:['Skeleton','Ghost','Bat'],elite:'Skeleton Knight',boss:'Bone Lord',final:'Lich',dm:2.2,bm:1,fm:.8,ch:650},
 {id:'orc',n:'Orc Stronghold',l:14,mons:['Orc','Troll','Goblin Archer'],elite:'Orc Berserker',boss:'Orc Warlord',final:'Orc Emperor',dm:2.6,bm:2.4,ch:950},
 {id:'golem',n:'Crystal Mines',l:18,mons:['Golem','Imp','Troll'],elite:'Obsidian Golem',boss:'Crystal Golem',final:'Titan Colossus',dm:3,bm:1,ch:1400},
 {id:'inferno',n:'Dragon Inferno',l:22,mons:['Imp','Troll','Dire Wolf'],elite:'Flame Imp',boss:'Infernal Duke',final:'Dragon',dm:3.4,bm:1,fm:4,ch:2200}
];
const DGR=['f','f','e','r','b','f','z'];
const DGN={f:'Monsters',e:'Elite guard',r:'Campfire',b:'Dungeon boss',z:'Greater boss and treasure'};
const U=(k,n,ic,d,base,max,col)=>({k,n:n.split('|'),ic,d,max:max||6,col,cost:[...Array(max||6)].map((_,i)=>Math.round(base*Math.pow(1.6,i)))});
const UPG=[
 ['Farming',[U('can','Wooden Can|Copper Can|Sprinkler','can','Crops grow 8% faster',30),U('fert','Hand Spreader|Wheel Spreader|Mist Sprayer','sprout','+6% double harvest chance',50),U('scare','Scarecrow|Guardian Scarecrow|Golden Scarecrow','sprout','+4% crop sale value',60),U('plow','Hoe|Plow|Tractor','pick','Plots cost 8% less to unlock',70)]],
 ['Husbandry',[U('trough','Feed Trough|Grain Trough|Auto Feeder','milk','Animals produce 10% faster',60),U('stalls','Extra Stall|Big Stall','egg','+1 barn stall',120,8),U('brush','Brush|Grooming Kit|Spa Corner','wool','+6% double goods chance',70),U('bin','Manure Pile|Compost Bin|Fermenter','manure','+8% manure chance',50)]],
 ['Fishing',[U('rod','Bamboo Rod|Steel Rod|Master Rod','rod','Bigger fish targets, +4% extra fish',40),U('bait','Worms|Bait Box|Chum Barrel','bobber','Fish appear 8% faster',45),U('lure','Feather Lure|Glow Lure|Deep Lure','fish','Bigger fish show up more',65,5)]],
 ['Mining',[U('gloves','Work Gloves|Leather Gloves|Steel Gauntlets','pick','Rocks break 8% easier',40),U('lantern','Torch|Lantern|Crystal Lamp','ore','+6% double ore chance',55,6,'#ffcc33'),U('cart','Wheelbarrow|Mine Cart|Rail Cart','ingot','+4% ore sale value',60,6,'#c9d6e4')]],
 ['Smithing',[U('tongs','Tongs|Steel Tongs|Master Tongs','hammer','Recipes use 7% less material',70,6,'#c9d6e4'),U('bellows','Bellows|Twin Bellows|Dragon Bellows','anvil','+6% chance to forge 2 items',80),U('furnace','Forge|Blast Furnace|Magma Furnace','ingot','+4% gear sale value',90,6,'#ff9a3d')]],
 ['Alchemy',[U('cauldron','Pot|Cauldron|Grand Cauldron','cauldron','+8% double brew chance',70),U('alembic','Flask Rack|Alembic|Distillery','flask','Potion effects last 20% longer',60,6,'#7ad8ff'),U('pouch','Pouch|Satchel|Bag of Holding','sack','8% chance ingredients are kept',80,6,'#b8803f')]],
 ['Combat',[U('charm','Clover|Lucky Charm|Fate Charm','charm','+3% critical chance',60),U('boots','Sandals|Swift Boots|Wind Boots','boots','Attack 6% faster',50),U('whet','Whetstone|Honing Kit|Master Hone','sword','+8% damage',55,6,'#c9d6e4'),U('vigor','Bandage|Tonic Belt|Vital Charm','potion','+10 max HP',55,6,'#ff6b8a'),U('plating','Padding|Plating|Aegis','armor','+4% defense',65,6,'#c9d6e4')]],
 ['Trading',[U('wagon','Handcart|Wagon|Caravan','wagon','+10% caravan haul size',60),U('horse','Mule|Horse|Warhorse','boots','Caravans return 8% faster',70),U('guard','Hired Hand|Guard|Bodyguard','sword','Bandits strike caravans less often',80,6,'#c9d6e4'),U('ledger','Notebook|Ledger|Guild Seal','coin','+3% coins from caravans',90)]],
 ['General',[U('ring','Copper Band|Silver Band|Merchant Ring','ring','+8% coins from sales and loot',80)]]
];
UPG[6][1].push(U('fury','Ember|Blaze|Inferno','sword','+6% damage',90,6,'#ff9a3d'),U('pierce','Needle|Awl|Piercer','rapier','+5% chance a hit deals true damage',100,6,'#fff'),U('regen','Moss|Bloom|Lifebloom','herb','Regenerate 0.4 HP/s per star in fights',90,6,'#6fd45a'));
UPG[3][1].push(U('gemeye','Loupe|Prism|Third Eye','core','+0.5% arcane gem chance, fewer ambushes',110,6,'#b36bff'));
UPG.splice(8,0,['Woodcutting',[U('axeup','Hatchet|Felling Axe|Giant Axe','axe','Trees fall 8% faster',45,6,'#c9d6e4'),U('sawup','Hand Saw|Bow Saw|Sawmill','hammer','+6% bonus logs per star',60,6,'#b8803f')]]);
const N=12,START=6;
let S={coins:10,sel:0,fsel:0,asel:0,plots:[],barn:Array(12).fill(null),xp:Object.fromEntries(SK.map(k=>[k,0])),inv:{},items:{w_rusty:1,a_cloth:1,p_stone:1},eq:{w:'w_rusty',a:'a_cloth',p:'p_stone'},up:Object.fromEntries(UPG.flatMap(g=>g[1].map(u=>[u.k,0]))),buff:{},hp:30,sh:0,tab:'farm',mute:false,kills:0,dg:null,clears:{},trade:{at:'green',to:null,from:null,t0:0,dur:0,pr:null},cost:{},region:'meadow',story:{kills:0,bosses:0,harvests:0,quests:{},points:0,skills:{power:0,ward:0,focus:0,fortune:0},relics:[]}};
const S_DEFAULTS=JSON.parse(JSON.stringify(S));
// Independent campaign slots. Slot 1 also imports the previous single-save format.
const SAVE_SLOT_COUNT=5;
let activeSaveSlot=Math.max(1,Math.min(SAVE_SLOT_COUNT,Number(localStorage.getItem('tinyacre-active-slot')||1)));
const slotKey=n=>'tinyacre-save-slot-'+n;
const readSlot=n=>{try{return localStorage.getItem(slotKey(n))||(n===1?localStorage.getItem('tinyacre-save'):null)}catch(e){return null}};
let hasSave=false;
try{const legacy=readSlot(activeSaveSlot);const o=JSON.parse(legacy||'null');
 if(o&&o.plots&&o.plots.length===N){hasSave=true;
  if(!o.items){o.items={};Object.keys(o.own||{}).forEach(k=>o.items[k]=1)}
  o.inv=o.inv||{};if(o.inv.potion){o.inv.pot_hp1=(o.inv.pot_hp1||0)+o.inv.potion;delete o.inv.potion}
  S={...S,...o,xp:{...S.xp,...o.xp},inv:{...o.inv},items:{...S.items,...o.items},eq:{...S.eq,...o.eq},up:{...S.up,...o.up},buff:{...(o.buff||{})},barn:(o.barn&&o.barn.length>=8?o.barn.concat(Array(Math.max(0,12-o.barn.length)).fill(null)):S.barn),trade:{...S.trade,...(o.trade||{})},cost:{...(o.cost||{})},region:o.region||'meadow',story:{kills:0,bosses:0,harvests:0,quests:{},points:0,skills:{power:0,ward:0,focus:0,fortune:0},relics:[],...(o.story||{}),skills:{power:0,ward:0,focus:0,fortune:0,...((o.story||{}).skills||{})},quests:{...((o.story||{}).quests||{})},relics:[...(((o.story||{}).relics)||[])]}}}}catch(e){}
if(!S.plots.length)for(let i=0;i<N;i++)S.plots.push({open:i<START,c:-1,at:0,d:0,w:false});
function save(){try{mineSync()}catch(e){}try{const data=JSON.stringify(S);localStorage.setItem(slotKey(activeSaveSlot),data);if(activeSaveSlot===1)localStorage.setItem('tinyacre-save',data)}catch(e){}}
function freshCampaign(){const x=JSON.parse(JSON.stringify(S_DEFAULTS));x.cls=null;x.hp=30;x.sh=0;x.plots=Array.from({length:N},(_,i)=>({open:i<START,c:-1,at:0,d:0,w:false}));x.mines={};x.mineExp={cave:0,depth:{},resources:{},selected:false,encounter:null,pendingAdvance:false};return x}
function hydrateCampaign(n){let x=freshCampaign(),raw=readSlot(n);try{const o=JSON.parse(raw||'null');if(o&&o.plots&&o.plots.length===N){if(!o.items){o.items={};Object.keys(o.own||{}).forEach(k=>o.items[k]=1)}o.inv=o.inv||{};if(o.inv.potion){o.inv.pot_hp1=(o.inv.pot_hp1||0)+o.inv.potion;delete o.inv.potion}x={...x,...o,xp:{...x.xp,...o.xp},inv:{...o.inv},items:{...x.items,...o.items},eq:{...x.eq,...o.eq},up:{...x.up,...o.up},buff:{...(o.buff||{})},barn:(o.barn&&o.barn.length>=8?o.barn.concat(Array(Math.max(0,12-o.barn.length)).fill(null)):x.barn),trade:{...x.trade,...(o.trade||{})},cost:{...(o.cost||{})},region:o.region||'meadow',story:{...x.story,...(o.story||{}),skills:{...x.story.skills,...((o.story||{}).skills||{})},quests:{...((o.story||{}).quests||{})},relics:[...(((o.story||{}).relics)||[])]}}}}catch(e){}return x}
function activateCampaignSlot(n){
  const safe=(label,fn)=>{try{if(typeof fn==='function')fn()}catch(err){console.error('[RPG slot load] '+label,err)}};
  safe('save current slot',save);
  activeSaveSlot=Math.max(1,Math.min(SAVE_SLOT_COUNT,Number(n)||1));
  try{localStorage.setItem('tinyacre-active-slot',String(activeSaveSlot))}catch(e){}
  S=hydrateCampaign(activeSaveSlot);hasSave=!!readSlot(activeSaveSlot);
  // Always enter through the stable Farm screen; saved tab names can refer to removed/renamed views.
  S.tab='farm';
  fight=null;cd=0;ecd=0;eatk=0;tele=0;mom=0;focus=false;guardT=0;slowT=0;dot={t:0,dps:0,k:''};dotAcc=0;
  safe('clear combat effects',()=>{school.forEach(x=>x.el&&x.el.remove());school=[];combo=0;lastC=0;mgrid=null});
  // Optional extension initializers must never prevent the core campaign from opening.
  safe('Mine Expedition loader',()=>{if(window.__loadMineExpedition)window.__loadMineExpedition()});
  safe('mine state loader',()=>{if(typeof mineLoad==='function')mineLoad()});
  safe('wood/tree initializer',()=>{if(typeof newTree==='function')newTree()});
  safe('player stats',()=>{if(S.hp<=0)S.hp=maxHp();S.sh=Math.min(S.sh,maxSh())});
  safe('title screen refresh',showIntro);
  safe('main render',render);
  safe('HUD refresh',upd);
}
function beginFreshCampaign(){S=freshCampaign();fight=null;cd=0;ecd=0;eatk=0;tele=0;mom=0;focus=false;guardT=0;slowT=0;dot={t:0,dps:0,k:''};dotAcc=0;school.forEach(x=>x.el&&x.el.remove());school=[];combo=0;lastC=0;mgrid=null;if(window.__resetMineExpedition)window.__resetMineExpedition();if(typeof mineLoad==='function')mineLoad();if(typeof newTree==='function')newTree();S.hp=maxHp();S.sh=maxSh();hasSave=true;eraseArm=false;save();$('intro').hidden=true;render();upd();say('A new adventure begins! Your selected slot has been reset.')}
const $=id=>document.getElementById(id);
const rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const lvl=x=>1+Math.floor(Math.sqrt(x/10));
const L=k=>lvl(S.xp[k]);
const inv=k=>S.inv[k]||0;
const cnt=id=>S.items[id]||0;
const on=k=>(S.buff[k]||0)>Date.now();
const item=k=>IT.find(i=>i.id===S.eq[k])||IT.find(i=>i.id==={w:'w_rusty',a:'a_cloth',p:'p_stone'}[k]);
const CAB={mul:()=>1,add:()=>0,out:d=>d,fdef:()=>1,match:c=>!!(c.k&&(item('w').k||'')===c.k),dodge:()=>false,inc:d=>d,hurt(){},hit(){},tick(){},reset(){},kill(){},use:()=>false,btn:()=>'',lines:()=>[]};
const maxHp=()=>20+2*L('combat')+item('a').hp+10*S.up.vigor+cm('hp')+CAB.add('hp')+2*(S.story?.skills?.ward||0);
const maxSh=()=>Math.round(item('a').sh*CAB.mul('sh'));
const defn=()=>(item('a').def+(on('def')?8:0))*(1+.04*S.up.plating)*cm('def')*CAB.mul('def')*(1+.04*(S.story?.skills?.ward||0));
const wInt=()=>Math.max(.25,cm('spd')*item('w').sp*(1-.06*S.up.boots)/(on('spd')?1.3:1));
const critCh=()=>Math.min(80,cm('cr')+item('w').cr+(item('a').cr||0)+3*S.up.charm+L('combat')/10+(on('crit')?20:0)+2*(S.story?.skills?.focus||0));
const atkPow=()=>cm('atk')*(1+.06*S.up.fury)*(item('w').atk+L('combat')/10)*(1+.08*S.up.whet)*(on('atk')?1.35:1)*(1+.035*(S.story?.skills?.power||0))*CAB.mul('atk');
const critMul=()=>2+.05*L('combat')+CAB.add('cdm');
const catOf=id=>ORES.some(o=>o.id===id)?'mine':FISH.some(f=>f.id===id)?'fish':['egg','feather','wool','milk','honey','manure','hay','clover','corn','truffle','gmilk','duckegg','pelt','llama'].includes(id)?'barn':id==='herb'?'farm':'combat';
const earn=(n,k)=>Math.round(n*(1+.08*S.up.ring)*(1+.005*(k?L(k):0))*(1+.04*(S.story?.skills?.fortune||0)));
const nm=id=>(MATS[id]||ORES.find(o=>o.id===id)||FISH.find(f=>f.id===id)||ALLR.find(p=>p.id===id)||FERTS.find(f=>f.id===id)||TRADE.find(t=>t.id===id)||{}).n||id;
let oIcon=(o,cl)=>icon('ore',o.col,cl);
let fIcon=(f,cl)=>icon(f.ic,f.col,cl);
let iIcon=(it,cl)=>icon(it.a,TC[it.col],cl);
const MINE_ART_IDS={copper:1,iron:1,silver:1,gold:1,mithril:1,coal:1,crystal:1,obsidian:1,agem:1,stone:1,tin:1};
let mineIconUid=0;
const mineIcon=(id,cl)=>window.__oreArt('%s'.replace('%s',id)).replace(/oreSpec([a-z]+)/g,'oreSpec$1_i'+(++mineIconUid)).replace('<svg ','<svg class="'+(cl||'ic')+' ore-art" ');
const gIcon=(id,cl)=>{if(window.__oreArt&&MINE_ART_IDS[id]&&(MATS[id]||ORES.some(o=>o.id===id)))return mineIcon(id,cl);const m=MATS[id];if(m)return icon(m.ic,m.col,cl);const o=ORES.find(x=>x.id===id);if(o)return oIcon(o,cl);const f=FISH.find(x=>x.id===id);if(f)return fIcon(f,cl);const p=POTS.find(x=>x.id===id);if(p)return icon('flask',p.col,cl);const q=FERTS.find(x=>x.id===id);if(q)return icon(q.id==='manure'?'manure':'sack',q.col,cl);const t=TRADE.find(x=>x.id===id);return icon(t.ic,t.col,cl)};
const infoText=id=>{const t=TRADE.find(x=>x.id===id);return nm(id)+': '+inv(id)+' owned'+(t?', trade good, base price '+t.b:VAL[id]?', sells for about '+earn(VAL[id],catOf(id))+' each':'')};
let msgT;
function say(s){$('msg').textContent=s;clearTimeout(msgT);msgT=setTimeout(()=>{$('msg').textContent=''},3500)}

/* ---------- sound: ONE shared audio engine (single AudioContext for the whole game) ---------- */
const RA=window.RPGAudio=(()=>{
  const Native=window.AudioContext||window.webkitAudioContext;
  let ctx=null,bus=null;const nbufs=new WeakMap();
  const muted=()=>typeof S!=='undefined'&&!!S.mute;
  // browsers only allow a context to start after a tap/click; never create one before that
  const active=()=>!navigator.userActivation||navigator.userActivation.hasBeenActive;
  function make(){
    if(!Native)return null;
    try{ctx=new Native({latencyHint:'interactive'})}catch(e){try{ctx=new Native()}catch(_){ctx=null;return null}}
    // every sound goes through one master volume and one safety limiter, so stacked effects can never clip
    const lim=ctx.createDynamicsCompressor();
    lim.threshold.value=-9;lim.knee.value=6;lim.ratio.value=14;lim.attack.value=.002;lim.release.value=.2;
    bus=ctx.createGain();bus.gain.value=muted()?0:.9;
    bus.connect(lim);lim.connect(ctx.destination);
    return ctx}
  const get=()=>ctx||(active()?make():null);
  const api={
    vox:0,
    get ctx(){return ctx},
    out(){return bus},
    get(){return get()},
    resume(){const c=get();if(c&&c.state!=='running'&&!document.hidden){try{const p=c.resume();if(p&&p.catch)p.catch(()=>{})}catch(_){}}return c},
    /* context if it is running right now and sound is on, otherwise null (and a resume is requested) */
    ready(){if(muted())return null;const c=api.resume();return c&&c.state==='running'?c:null},
    /* run fn(ctx) now, or right after the context wakes up (sounds older than 0.4 s are dropped, never replayed in a burst) */
    run(fn){
      if(muted())return false;
      const c=get();if(!c)return false;
      const go=()=>{try{fn(c)}catch(e){(window.__audioErr=window.__audioErr||[]).push(String(e&&e.stack||e))}};
      if(c.state==='running'){go();return true}
      if(!document.hidden){let p;try{p=c.resume()}catch(_){}
        const t0=performance.now();
        if(p&&p.then)p.then(()=>{if(c.state==='running'&&!muted()&&performance.now()-t0<400)go()}).catch(()=>{})}
      return false},
    /* "Sound off" silences EVERYTHING instantly, including sounds that are already playing */
    sync(){if(!ctx)return;const t=ctx.currentTime;try{bus.gain.cancelScheduledValues(t);bus.gain.setTargetAtTime(muted()?0:.9,t,.03)}catch(_){}},
    /* loop-safe noise: the end is cross-faded into the start, so looping never clicks */
    noiseBuf(kind,c){
      c=c||ctx;if(!c)return null;
      let m=nbufs.get(c);if(!m){m={};nbufs.set(c,m)}
      if(m[kind])return m[kind];
      const sr=c.sampleRate,len=Math.floor(sr*3),fade=Math.floor(sr*.15),tot=len+fade,t=new Float32Array(tot);
      let b0=0,b1=0,b2=0,b3=0,b4=0,b5=0,b6=0,br=0;
      for(let i=0;i<tot;i++){const x=Math.random()*2-1;
        if(kind==='pink'){b0=.99886*b0+x*.0555179;b1=.99332*b1+x*.0750759;b2=.969*b2+x*.153852;b3=.8665*b3+x*.3104856;b4=.55*b4+x*.5329522;b5=-.7616*b5-x*.016898;t[i]=b0+b1+b2+b3+b4+b5+b6+x*.5362;b6=x*.115926}
        else if(kind==='brown'){br=(br+.02*x)/1.02;t[i]=br}
        else t[i]=x}
      const buf=c.createBuffer(1,len,sr),d=buf.getChannelData(0);
      for(let i=0;i<len;i++){
        if(i<fade){const a=i/fade*Math.PI/2;d[i]=t[i]*Math.sin(a)+t[len+i]*Math.cos(a)}else d[i]=t[i]}
      if(kind!=='white'){let e=0;for(let i=0;i<len;i++)e+=d[i]*d[i];const g=.25/Math.sqrt(e/len+1e-12);for(let i=0;i<len;i++)d[i]*=g}
      m[kind]=buf;return buf},
    /* stop repeat-spam (same sound within 55 ms) and avoid a double "hit + slash" on one blow */
    wrap(o){const last={};
      Object.keys(o).forEach(k=>{const f=o[k];if(typeof f!=='function'||f.__ra)return;
        const w=function(){const n=performance.now();
          if(n-(last[k]||-1e9)<55)return;
          if(k==='slash'&&(n-(last.hit||-1e9)<90||n-(last.crit||-1e9)<90))return;
          last[k]=n;return f.apply(this,arguments)};
        w.__ra=1;o[k]=w})}
  };
  const unlock=()=>{const c=get();if(c&&c.state!=='running'&&!document.hidden&&!muted()){try{const p=c.resume();if(p&&p.catch)p.catch(()=>{})}catch(_){}}};
  ['pointerdown','touchend','mousedown','keydown','click'].forEach(e=>document.addEventListener(e,unlock,{capture:true,passive:true}));
  document.addEventListener('visibilitychange',()=>{if(!ctx)return;
    if(document.hidden){try{ctx.suspend().catch(()=>{})}catch(_){}}
    else if(!muted()){try{ctx.resume().catch(()=>{})}catch(_){}}});
  setInterval(()=>api.sync(),300);
  return api})();
function tone(f,d,type,v,s,t0){
  if(!(f>0)||!(d>0))return;
  RA.run(c=>{
    if(RA.vox>=32)return;   // too many voices at once (fast fights): skip the extra ones instead of crackling
    const t=c.currentTime+(t0||0),vol=v||.06,att=Math.min(.006,d*.25);
    const o=c.createOscillator(),g=c.createGain();
    o.type=type||'square';o.frequency.setValueAtTime(f,t);
    if(s)o.frequency.exponentialRampToValueAtTime(Math.max(30,f+s),t+d);
    g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(vol,t+att);   // 6 ms attack: no click at the start of a note
    g.gain.exponentialRampToValueAtTime(.0001,t+d);
    o.connect(g);g.connect(RA.out());
    RA.vox++;o.onended=()=>{RA.vox--;try{g.disconnect()}catch(_){}};
    o.start(t);o.stop(t+d+.03)});
}
const seq=(a,type,d,v)=>a.forEach((f,i)=>tone(f,d,type,v,0,i*.08));
const SFX={
 plant:()=>tone(220,.12,'triangle',.08,120),
 water:()=>{tone(520,.13,'sine',.032,380);tone(690,.11,'sine',.018,300,.09)},
 harvest:()=>seq([523,659,784],'triangle',.12,.07),
 mine:()=>tone(300,.05,'square',.05,-120),
 brk:()=>{tone(140,.2,'sawtooth',.08,-80);tone(900,.1,'triangle',.05,0,.05)},
 splash:()=>tone(400,.15,'sine',.06,-250),
 bite:()=>{tone(880,.08,'square',.06);tone(880,.08,'square',.06,0,.12)},
 catch:()=>tone(700,.1,'triangle',.07,300),
 hit:()=>tone(160,.1,'sawtooth',.08,-100),
 crit:()=>{tone(1200,.08,'square',.07);tone(1800,.14,'triangle',.06,0,.05)},
 hurt:()=>tone(200,.25,'sawtooth',.08,-150),
 win:()=>seq([392,523,659,784],'square',.14,.05),
 boss:()=>{tone(110,.6,'sawtooth',.09,-30);tone(165,.6,'sawtooth',.06,-30,.12)},
 lvl:()=>seq([523,659,784,1046],'triangle',.18,.08),
 err:()=>tone(130,.15,'square',.05),
 forge:()=>{tone(200,.08,'square',.08,-60);tone(1200,.08,'triangle',.05,0,.08)},
 eat:()=>tone(350,.1,'sine',.06,200),
 coin:()=>seq([988,1318],'square',.1,.05),
 death:(f)=>{
   const n=String(f&&f.n||'').toLowerCase();
   if(/slime|ooze/.test(n)){seq([430,320,210],'sine',.13,.045);tone(150,.2,'sine',.04,-90,.18)}
   else if(/goblin|orc|imp|troll/.test(n)){tone(230,.15,'sawtooth',.065,-130);tone(115,.22,'square',.05,-65,.09)}
   else if(/spider|bat|wolf|dire/.test(n)){tone(740,.1,'triangle',.05,-430);tone(180,.2,'sawtooth',.04,-80,.07)}
   else if(/skeleton|ghost|lich|bone|wraith/.test(n)){seq([780,520,260],'sine',.14,.045)}
   else if(/golem|titan|colossus/.test(n)){tone(100,.25,'square',.075,-55);tone(320,.14,'triangle',.04,-220,.1)}
   else if(/dragon|wyrm|infernal|cinder/.test(n)){tone(145,.23,'sawtooth',.075,-90);tone(72,.28,'sawtooth',.055,-28,.08)}
   else{tone(330,.12,'triangle',.055,-180);tone(175,.18,'sine',.045,-90,.08)}
 }
};
function addXp(k,n){const o=L(k);S.xp[k]+=n;const l=L(k);if(l>o){say('Level up! '+SKN[k]+' is now level '+l+'.');SFX.lvl();if(k==='combat'){const nd=DG.filter(d=>d.l>o&&d.l<=l);if(nd.length)say('New dungeon discovered: '+nd.map(d=>d.n).join(', ')+'! Open the Fight tab.')}}}
function skillBar(k){const x=S.xp[k],l=lvl(x),a=10*(l-1)**2,b=10*l*l,i=SKI[k];return '<div class="sk"><span>'+icon(i[0],i[1])+SKN[k]+' '+l+'</span><div class="bar2"><i style="width:'+((x-a)/(b-a)*100)+'%"></i></div><small>'+(x-a)+'/'+(b-a)+'</small></div>'}
const hitsNeed=l=>l>=20?1:l>=10?2:3;

/* ---------- farm ---------- */
const grid=$('grid'),els=[],seedEls=[];
const unlockCost=()=>Math.round((25+15*(S.plots.filter(p=>p.open).length-START))*(1-.08*S.up.plow));
const farmGrow=()=>Math.min(.4,.005*L('farm'));
S.plots.forEach((p,i)=>{
  const b=document.createElement('button');b.className='plot';
  b.innerHTML='<span class="e"></span><span class="l"></span><div class="bar"><i></i></div>';
  b.addEventListener('click',()=>tapPlot(i));grid.appendChild(b);
  els.push({b,e:b.children[0],l:b.children[1],bar:b.children[2],fill:b.children[2].firstChild,k:null});
});
CROPS.forEach((c,i)=>{
  const b=document.createElement('button');b.className='seed';
  b.innerHTML=icon(c.ic)+'<div>'+c.n+'</div><span></span>';
  b.addEventListener('click',()=>{if(L('farm')<c.l){say(c.n+' needs Farming level '+c.l+'.');SFX.err();return}S.sel=i;SFX.plant();save();render()});
  $('seeds').appendChild(b);seedEls.push(b);
});
const prog=p=>!p||p.c<0?0:Math.min(1,(Date.now()-p.at)/(p.d*1000));
const fEls=[];
[null,...FERTS].forEach((f,i)=>{const b=document.createElement('button');b.className='seed';b.innerHTML=(f?icon(f.id==='manure'?'manure':'sack',f.col):'<b style="font-size:20px;line-height:34px">–</b>')+'<div>'+(f?f.n:'None')+'</div><span></span>';b.addEventListener('click',()=>{S.fsel=i;SFX.plant();save();render()});$('fchips').appendChild(b);fEls.push(b)});
function tapPlot(i){
  const p=S.plots[i];
  if(!p.open){const c=unlockCost();if(S.coins>=c){S.coins-=c;p.open=true;say('New plot unlocked.');SFX.coin()}else{say('Unlocking this plot costs '+c+' coins.');SFX.err()}}
  else if(p.c<0){const c=CROPS[S.sel];
    if(S.coins<c.cost){say('Not enough coins for '+c.n+' seeds.');SFX.err()}
    else{S.coins-=c.cost;let f=null;const fo=S.fsel?FERTS[S.fsel-1]:null;
      if(fo){if(inv(fo.id)>0){S.inv[fo.id]--;f=fo}else say('Out of '+fo.n+', planted without it.')}
      p.c=S.sel;p.at=Date.now();p.f=f?f.id:null;p.d=c.t*Math.max(.2,1-farmGrow()-.08*S.up.can-(f?f.spd:0))*(on('grow')?.5:1);p.w=false;SFX.plant()}}
  else{const g=prog(p),c=CROPS[p.c];
    if(g>=1){const fo=FERTS.find(x=>x.id===p.f)||{dbl:0,tri:0},sk=.004*L('farm')+.06*S.up.fert;
      let q=1;if(Math.random()<1-(1-fo.dbl)*(1-sk))q=2;if(fo.tri&&Math.random()<fo.tri)q=3;
      if(c.give){const n=c.q*q;S.inv[c.give]=inv(c.give)+n;say('Harvested '+n+' '+nm(c.give)+(q>1?' (x'+q+' yield)':'')+'.')}
      else{const m=Math.round(earn(c.sell,'farm')*(1+.04*S.up.scare))*q;S.coins+=m;say('Harvested '+c.n+(q>1?' (x'+q+' yield)':'')+' for '+m+' coins.')}
      addXp('farm',c.xp*q);p.c=-1;SFX.harvest()}
    else if(!p.w){p.w=true;p.at-=(p.d*1000-(Date.now()-p.at))*.35;say('Watered. It grows faster now.');if(!(window.__farmWater&&window.__farmWater.play(i)))SFX.water()}
    else say('Already watered. Give it time.')}
  save();render();
}

/* ---------- barn ---------- */
const bgrid=$('bgrid'),bEls=[],aEls=[];
const cap=()=>4+S.up.stalls;
for(let i=0;i<12;i++){const b=document.createElement('button');b.className='plot';b.innerHTML='<span class="e"></span><span class="l"></span><div class="bar"><i></i></div>';b.addEventListener('click',()=>tapStall(i));bgrid.appendChild(b);bEls.push({b,e:b.children[0],l:b.children[1],bar:b.children[2],fill:b.children[2].firstChild,k:null})}
ANI.forEach((a,i)=>{const b=document.createElement('button');b.className='seed';b.innerHTML=mon(ANIART[a.id],'ic')+'<div>'+a.n+'</div><span>'+a.cost+' coins</span>';b.addEventListener('click',()=>{S.asel=i;SFX.plant();save();render()});$('aseeds').appendChild(b);aEls.push(b)});
const aDur=a=>a.t*(1-Math.min(.4,.005*L('barn'))-.1*S.up.trough);
const aProg=p=>p?Math.min(1,(Date.now()-p.at)/(p.d*1000)):0;
function tapStall(i){
  if(i>=cap()){say('Buy an Extra Stall in the Shop to unlock this one.');SFX.err();return}
  const p=S.barn[i];
  if(!p){const a=ANI[S.asel];if(S.coins<a.cost){say('A '+a.n+' costs '+a.cost+' coins.');SFX.err()}else{S.coins-=a.cost;S.barn[i]={t:S.asel,at:Date.now(),d:aDur(a)};SFX.coin()}}
  else if(aProg(p)>=1){
    const a=ANI[p.t],q=Math.random()<.004*L('barn')+.06*S.up.brush?2:1;let s='Collected';
    a.give.forEach(id=>{S.inv[id]=inv(id)+q;s+=' '+q+' '+nm(id)});
    if(a.extra&&Math.random()<a.extra[1]){S.inv[a.extra[0]]=inv(a.extra[0])+1;s+=' and a '+nm(a.extra[0])}
    if(a.meat&&Math.random()<a.meat[1]*(1+.01*L('barn'))){S.inv[a.meat[0]]=inv(a.meat[0])+1;s+=' and '+nm(a.meat[0])}
    if(Math.random()<Math.min(1,.5+.08*S.up.bin)){S.inv.manure=inv('manure')+q;s+=' and '+q+' manure'}
    if(q>1)toast('Double harvest!','bonus');addXp('barn',3+ANI.indexOf(a)*2);say(s+'.');SFX.harvest();p.at=Date.now();p.d=aDur(a)}
  else say('Not ready yet.');
  save();render();
}

/* ---------- mining ---------- */
let rock=null;
function newRock(){const el=ORES.filter((o,i)=>L('mine')>=ORE_L[i]),t=ORES.indexOf(el[Math.floor(Math.pow(Math.random(),1.6)*el.length)]);const hp=Math.max(2,Math.round([5,9,12,16,22][t]*(1-Math.min(.4,.005*L('mine'))-.08*S.up.gloves)));rock={t,hp,max:hp}}
newRock();
function mineAct(){
  rock.hp-=item('p').pw;SFX.mine();
  if(rock.hp<=0){const o=ORES[rock.t],q=1+(Math.random()<.004*L('mine')+.06*S.up.lantern?1:0);S.inv[o.id]=inv(o.id)+q;addXp('mine',[3,7,11,16,26][rock.t]);say('Mined '+q+' '+o.n+'.');if(q>1)toast('Bonus ore! +1 '+o.n,'bonus');SFX.brk();newRock();gemRoll()}
}

/* ---------- fishing: a school of fish swims by, tap them ---------- */
let school=[],spawnT=0,combo=0,lastC=0;
function spawnFish(){
  const lk=$('lake');if(!lk)return;
  const el=poolFish(),f=el[Math.floor(Math.pow(Math.random(),.5/(1+.25*S.up.lure))*el.length)],w=lk.clientWidth||360,dir=Math.random()<.5?1:-1;
  const b=document.createElement('button');b.className='swim';b.dataset.a='catch';b.dataset.i=f.id+':'+Math.random().toString(36).slice(2,7);
  const sz=56+6*S.up.rod;b.style.width=b.style.height=sz+'px';b.style.top=(50+Math.random()*34)+'%';b.innerHTML=fIcon(f);
  const s={f,id:b.dataset.i,x:dir>0?-sz-10:w+10,v:dir*(70+f.l*12+Math.random()*40),el:b,dir};
  lk.appendChild(b);school.push(s);
}
function catchFish(key){
  const s=school.find(x=>x.id===key);if(!s)return false;
  school=school.filter(x=>x!==s);s.el.remove();
  const now=Date.now();combo=now-lastC<1500?combo+1:1;lastC=now;
  const q=1+(Math.random()<.004*L('fish')+.04*S.up.rod?1:0)+(combo%5===0?1:0);
  S.inv[s.f.id]=inv(s.f.id)+q;addXp('fish',s.f.xp);SFX.catch();fishBonus();
  fx('+'+q+' '+s.f.n,'info','foe');const c=$('combo');if(c)c.textContent='Combo x'+combo;
  return false;
}
const spawnGap=()=>Math.max(.35,1.5*(1-.005*L('fish'))*(1-.08*S.up.bait))/(on('fish')?2:1);

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

/* ---------- alchemy ---------- */
let brewSel=null,brewHits=0;
const pOK=p=>p.r.every(x=>inv(x[0])>=x[1])&&L('alch')>=p.l;
function cauldronAct(){
  const p=ALLR.find(x=>x.id===brewSel);
  if(!p){say('Choose a recipe below, then tap the cauldron.');SFX.err();return}
  if(!pOK(p)){brewHits=0;say(missMsg('Alchemy','alch',p.l,p.r,0));SFX.err();return}
  brewHits++;SFX.splash();
  if(brewHits>=hitsNeed(L('alch'))){
    brewHits=0;const kept=Math.random()<.08*S.up.pouch;if(!kept)p.r.forEach(x=>S.inv[x[0]]-=x[1]);
    const n=1+(Math.random()<.004*L('alch')+.08*S.up.cauldron?1:0);S.inv[p.id]=inv(p.id)+n;addXp('alch',6+p.l*6);
    say('Brewed '+(n>1?n+'x ':'')+p.n+(kept?' (ingredients kept)':'')+'.');SFX.lvl()}
  else say('Keep stirring.');
}
function drink(id){
  const p=POTS.find(x=>x.id===id);if(!inv(id)){say('You have none.');SFX.err();return}
  S.inv[id]--;
  if(p.heal){const h=Math.round(p.heal*(1+.005*L('alch')));S.hp=Math.min(maxHp(),S.hp+h);fx('+'+h,'heal','me')}
  if(p.sh)S.sh=maxSh();
  if(p.buff)S.buff[p.buff]=Date.now()+(p.dur||90)*1000*(1+.005*L('alch'))*(1+.2*S.up.alembic);
  say('Used '+p.n+'.');SFX.eat();upd();
}
const healPots=()=>POTS.filter(p=>p.heal);
const healCount=()=>healPots().reduce((a,p)=>a+inv(p.id),0);
function useHeal(){const p=healPots().find(p=>inv(p.id)>0);if(!p){say('No healing potions. Brew some or buy one in the shop.');SFX.err();return false}drink(p.id);return false}
const buffText=()=>{const a=Object.keys(BN).filter(on).map(k=>BN[k]+' '+Math.ceil((S.buff[k]-Date.now())/1000)+'s');return a.length?'Active: '+a.join('   '):'No active potion effects'};

/* ---------- trading caravan ---------- */
const cargoUsed=()=>TRADE.reduce((a,g)=>a+inv(g.id),0);
const cargoCap=()=>20+10*S.up.wagon+Math.floor(L('trade')/2);
const town=id=>TOWNS.find(t=>t.id===id);
function tradePrices(t){const pr={};TRADE.forEach((g,i)=>pr[g.id]=Math.max(1,Math.round(g.b*t.m[i]*(.9+Math.random()*.2))));return pr}
const travelTime=(a,b)=>Math.max(6,(Math.hypot(a.x-b.x,a.y-b.y)*.55+6)*(1-Math.min(.4,.005*L('trade'))-.08*S.up.horse));
function tradeGo(id){const T=S.trade;if(T.to||id===T.at)return false;const a=town(T.at),b=town(id);T.from=T.at;T.to=id;T.t0=Date.now();T.dur=travelTime(a,b);SFX.coin();say('Heading to '+b.n+' ('+Math.round(T.dur)+'s).')}
function arrive(){
  const T=S.trade;T.at=T.to;T.to=null;T.pr=tradePrices(town(T.at));addXp('trade',4);let s='Arrived in '+town(T.at).n+'.';
  if(cargoUsed()>0&&Math.random()<Math.max(0,.18-.03*S.up.guard-.001*L('trade'))){const lost=[];TRADE.forEach(g=>{const n=Math.floor(inv(g.id)*(.15+Math.random()*.15));if(n){S.inv[g.id]-=n;lost.push(n+' '+g.n)}});if(lost.length)s+=' Bandits raided your wagon and took '+lost.join(', ')+'.'}
  say(s);SFX.win();save();
}
function tradeBuy(id,n){
  const g=TRADE.find(x=>x.id===id),p=S.trade.pr[id],room=cargoCap()-cargoUsed();n=Math.min(n,room,Math.floor(S.coins/p));
  if(n<1){say(room<1?'Your wagon is full.':'Not enough coins.');SFX.err();return}
  const have=inv(id),c=S.cost[id]||0;S.cost[id]=(c*have+p*n)/(have+n);S.inv[id]=have+n;S.coins-=p*n;say('Bought '+n+' '+g.n+' for '+p*n+' coins.');SFX.coin();
}
function tradeSell(id){
  const g=TRADE.find(x=>x.id===id),n=inv(id);if(!n){say('You have no '+g.n+'.');SFX.err();return}
  const p=S.trade.pr[id],m=Math.round(p*n*(1+.004*L('trade'))*(1+.08*S.up.ring)*(1+.03*S.up.ledger)),profit=m-(S.cost[id]||0)*n;
  S.inv[id]=0;S.coins+=m;addXp('trade',Math.max(1,Math.round(profit/8)));say('Sold '+n+' '+g.n+' for '+m+' coins'+(profit>0?' (profit '+Math.round(profit)+')':'')+'.');SFX.coin();
}
const TCATS=[['fish','Fish','fish',FISH.map(f=>f.id)],['ore','Ore','mine',ORES.map(o=>o.id)],['mon','Monster loot','combat',['gel','hide','fur','fang','bone','wing','silk','horn','wisp','core','scale']],['farm','Farm goods','farm',['herb','egg','feather','wool','milk','honey','manure']]];
const catTotal=(c,i)=>{const cm=town(S.trade.at).c[i];return earn(c[3].reduce((a,id)=>a+inv(id)*VAL[id],0)*cm*(1+.004*L('trade')),c[2])};
function tradeCat(i){const c=TCATS[i],m=catTotal(c,i);if(!m){say('Nothing of that kind to sell.');SFX.err();return}c[3].forEach(id=>S.inv[id]=0);S.coins+=m;addXp('trade',Math.max(1,Math.round(m/20)));say('Sold '+c[1].toLowerCase()+' here for '+m+' coins.');SFX.coin()}
function tradeTick(){
  const T=S.trade;if(!T.to)return;const p=(Date.now()-T.t0)/(T.dur*1000);
  if(p>=1){arrive();render();return}
  if(S.tab==='trade'){const b=$('tbar');if(b)b.style.width=p*100+'%';const t=$('ttxt');if(t)t.textContent=Math.ceil(T.dur*(1-p))+'s left';const w=$('wagon');if(w){const a=town(T.from),c=town(T.to);w.style.left=(a.x+(c.x-a.x)*p)+'%';w.style.top=(a.y+(c.y-a.y)*p)+'%'}}
}

/* ---------- shop ---------- */
const ALLU=UPG.flatMap(g=>g[1]);
function buy(k){
  if(k==='pot'){if(S.coins<25){say('A potion costs 25 coins.');SFX.err();return}S.coins-=25;S.inv.pot_hp1=inv('pot_hp1')+1;say('Bought a Minor Healing potion.');SFX.coin();return}
  const u=ALLU.find(x=>x.k===k),l=S.up[k];
  if(l>=u.max){say('That upgrade is maxed out.');return}
  if(S.coins<u.cost[l]){say('You need '+u.cost[l]+' coins.');SFX.err();return}
  S.coins-=u.cost[l];S.up[k]++;say(u.n[Math.min(u.n.length-1,Math.floor(S.up[k]/2))]+' (level '+S.up[k]+') bought.');SFX.lvl();
}

/* ---------- combat: dungeons, abilities, statuses ---------- */
let fight=null,cd=0,ecd=0,shT=0,en=100,guardT=0,focus=false,slowT=0,eatk=0,tele=0,mom=0,dot={t:0,dps:0,k:''},dotAcc=0;
const anim=(e,c)=>{if(!e)return;e.classList.remove(c);void e.offsetWidth;e.classList.add(c)};
function fx(t,c,side){const s=$('stg');if(!s)return;const e=document.createElement('span');e.className='fx '+c;e.textContent=t;e.style.left=side==='me'?'18%':(30+Math.random()*34)+'%';e.style.top=side==='me'?'60%':'26%';s.appendChild(e);setTimeout(()=>e.remove(),900)}
const statusText=()=>[guardT>0?'Guarding':'',focus?'Focused':'',slowT>0?'Slowed '+Math.ceil(slowT)+'s':'',dot.t>0?dot.k+' '+Math.ceil(dot.t)+'s':'',mom>0?'Momentum x'+mom:''].filter(Boolean).join('   ')||'No status effects';
function upd(){
  S.sh=Math.min(S.sh,maxSh());S.hp=Math.min(S.hp,maxHp());
  const set=(id,w,t)=>{const e=$(id);if(!e)return;if(w!=null)e.style.width=Math.max(0,Math.min(1,w)*100)+'%';if(t!=null)e.textContent=t};
  set('php',S.hp/maxHp());set('pht',null,Math.ceil(S.hp)+' / '+maxHp());
  set('psh',maxSh()?S.sh/maxSh():0);set('psht',null,Math.ceil(S.sh)+' / '+maxSh());
  set('pen',en/100);set('pent',null,Math.floor(en)+' / 100');
  if(fight){const f=fight;set('ehp',f.hp/f.max);set('etxt',null,(f.fin?'GREATER BOSS ':f.b?'BOSS ':f.elite?'ELITE ':'')+f.n+' '+Math.max(0,Math.ceil(f.hp))+' / '+f.max+(f.def?'   Armor '+f.def:'')+(f.rage?'   ENRAGED':''))}
  set('bPot',null,'Heal potion ('+healCount()+')');set('bf',null,buffText());set('st',null,statusText());
}
function mkFoe(name,m,flag,bm){
  const f=FOES.find(x=>x.n===name),t=TR[name]||{},boss=flag==='b'||flag==='z',k=boss?(bm||1):m,hp=Math.round(f.hp*k);
  return {...f,...t,hp,max:hp,atk:f.atk*k,xp:Math.round(f.xp*(boss?1:m)),c:Math.round(f.c*(boss?1:m)),b:boss?1:0,fin:flag==='z',elite:flag==='e',sp:f.sp*(flag==='e'?.9:1),def:t.def||0,dodge:t.dodge||0};
}
function startFight(f){if(!f)return;f.dead=false;fight=f;CAB.reset();cd=0;ecd=f.sp*1.3;eatk=0;tele=0;mom=0;focus=false;guardT=0;slowT=0;dot={t:0,dps:0,k:''};dotAcc=0}
function explore(){
  const r=Math.random(),l=L('combat');
  if(r<.15){const c=earn(rnd(8,20)+l*6,'combat');S.coins+=c;addXp('combat',2);say('You found a chest with '+c+' coins.');SFX.coin()}
  else if(r<.25){S.hp=maxHp();S.sh=maxSh();say('You rested at a quiet shrine and healed fully.');SFX.eat()}
  else{const el=FOES.filter(x=>!x.b&&x.l<=l+1),f=el[Math.floor(Math.sqrt(Math.random())*el.length)];startFight(mkFoe(f.n,1,'f'));say('A '+f.n+' appears!');SFX.bite()}
}
/* dungeon flow */
const dgDef=()=>DG.find(d=>d.id===S.dg.id);
function dgEnter(id){const d=DG.find(x=>x.id===id);if(!d||L('combat')<d.l||S.dg)return false;S.dg={id,room:0,chest:false};say('You enter the '+d.n+'. '+DGR.length+' rooms await.');SFX.boss()}
function dgLeave(){S.dg=null;say('You left the dungeon. Progress in it is lost.');SFX.err()}
function dgDoor(){
  const d=dgDef(),r=DGR[S.dg.room],m=d.dm*(1+.1*S.dg.room);let f;
  if(r==='b')f=mkFoe(d.boss,1,'b',d.bm);
  else if(r==='z')f=mkFoe(d.final,1,'z',d.fm||1);
  else if(r==='e')f=mkFoe(d.elite,(1+.1*S.dg.room)*1.3,'e');
  else f=mkFoe((d.id==='goblin'&&S.dg.room===0)?'Goblin Spear':d.mons[rnd(0,d.mons.length-1)],m,'f');
  startFight(f);
  if(r==='z'){say('The greater boss guards the treasure: '+f.n+'!');SFX.boss()}else if(r==='b'){say('Dungeon boss: '+f.n+'!');SFX.boss()}else{say('A '+f.n+' attacks!');SFX.bite()}
}
function dgCamp(){S.hp=Math.min(maxHp(),S.hp+maxHp()*.4);S.sh=maxSh();S.dg.room++;say('You rest by the fire: 40% health and a full shield.');SFX.eat()}
function dgChest(){toast('Treasure chest opened!','reward');
  const d=dgDef(),first=!S.clears[d.id];
  const c=earn(d.ch*(first?2.5:1)*(.8+Math.random()*.4),'combat');S.coins+=c;const got=[];
  (DROPS[d.final]||[]).forEach(x=>{const q=rnd(x[2],x[3]);S.inv[x[0]]=inv(x[0])+q;got.push(q+' '+nm(x[0]))});
  if(Math.random()<.16){const pool=IT.filter(i=>i.r&&i.l<=d.l+3);const g=pool[rnd(0,pool.length-1)];S.items[g.id]=cnt(g.id)+1;got.push(g.n)}
  S.inv.pot_hp2=inv('pot_hp2')+1;got.push('Healing Potion');
  S.clears[d.id]=(S.clears[d.id]||0)+1;addXp('combat',d.l*25);
  say('Treasure! '+c+' coins'+(first?' (first clear bonus)':'')+', '+got.join(', ')+'.');SFX.lvl();S.dg=null;
}
/* fighting */
function foeDown(){
  const f=fight;
  if(!f || f.dead || f.hp>0) return false;
  f.dead=true; f.hp=0;CAB.kill(f);
  const c=earn(f.c,'combat');S.coins+=c;addXp('combat',f.xp);S.kills++;
  const got=[];(DROPS[f.n]||[]).forEach(d=>{if(f.b||Math.random()<Math.min(1,d[1]*(f.elite?1.5:1))){const q=rnd(d[2],d[3])*(f.elite?2:1);S.inv[d[0]]=inv(d[0])+q;got.push(q+' '+nm(d[0]));drop(d[0],q,f.elite||f.b)}});
  if(Math.random()<.1){S.inv.pot_hp1=inv('pot_hp1')+1;got.push('1 Minor Healing')}
  say('Defeated the '+f.n+': '+c+' coins'+(got.length?'. Loot: '+got.join(', '):'')+'.');
  SFX.death(f);
  try{if(window.__gwDeath)window.__gwDeath(f.n);}catch(_){}
  fight=null;cd=0;ecd=0;tele=0;dot={t:0,dps:0,k:''};dotAcc=0;guardT=0;focus=false;slowT=0;mom=0;
  SFX.win();
  if(S.dg){S.dg.room++;if(f.fin)S.dg.chest=true}
  return true;
}
function playerDown(){const was=!!S.dg;CAB.reset();S.hp=Math.ceil(maxHp()/2);S.sh=0;S.coins=Math.floor(S.coins*.8);fight=null;S.dg=null;dot.t=0;say('You were knocked out and lost 20% of your coins.'+(was?' The dungeon run is over.':''));render()}
function strike(mult,heavy){
  const f=fight;if(!f||f.dead||f.hp<=0)return false;
  const crit=focus||Math.random()*100<critCh();focus=false;
  cd=wInt()*(heavy?1.3:1);
  if(Math.random()<Math.max(0,f.dodge-CAB.add('acc'))){fx('Miss','info','foe');mom=0;SFX.err();upd();return false}
  let d=atkPow()*mult*(.85+Math.random()*.3)*(1+.04*mom)*(crit?critMul():1);
  const dt=dmgType();d=CAB.out(d,f);d=Math.max(1,Math.round(d*30/(30+(dt==='true'?0:dt==='magic'?f.def*.5:f.def)*CAB.fdef())));
  const hpBefore=f.hp;
  f.hp=Math.max(0,hpBefore-d);en=Math.min(100,en+8);mom=Math.min(5,mom+1);
  crit?SFX.crit():SFX.hit();
  fx(d,dt,'foe',crit);CAB.hit(d,crit,dt,heavy,f);anim($('me'),'slash');anim($('eo'),'hurt');
  // Resolve lethal damage before any life-drain effect; a dead monster can never revive.
  if(f.hp<=0){f.hp=0;return foeDown()}
  if(f.ab==='drain'){const dealt=Math.min(hpBefore,d);f.hp=Math.min(f.max,f.hp+Math.round(dealt*.3))}
  if(f.b&&!f.rage&&f.hp<f.max*.5){f.rage=true;f.atk*=1.3;say(f.n+' is enraged!');SFX.boss()}
  upd();return false;
}
function attack(){if(!fight||cd>0)return false;return strike(1,false)}
function power(){if(!fight)return false;if(en<30){say('Power Strike needs 30 energy.');SFX.err();return false}en-=30;return strike(2.2,true)}
function guardAct(){if(!fight)return false;if(en<20){say('Guard needs 20 energy.');SFX.err();return false}en-=20;guardT=2.2;say('You raise your guard.');SFX.hit();upd();return false}
function focusAct(){if(!fight)return false;if(en<40){say('Focus needs 40 energy.');SFX.err();return false}en-=40;focus=true;say('Focused: your next hit is a critical.');SFX.crit();upd();return false}
function enemyAttack(heavy){
  const f=fight;if(!f||f.dead||f.hp<=0)return;let d=Math.max(1,Math.round(f.atk*(.85+Math.random()*.3)*(heavy?2:1)*25/(25+defn())));
  if(CAB.dodge(f,heavy)){upd();return}const blocked=guardT>0;
  if(blocked){d=Math.max(1,Math.round(d*.25));en=Math.min(100,en+10);fx('Block!','info','me');SFX.hit();
    const r=Math.max(1,Math.round(atkPow()*.6*30/(30+f.def)));f.hp=Math.max(0,f.hp-r);fx(String(r),'phys','foe');if(f.hp<=0){f.hp=0;foeDown();render();return}}
  d=CAB.inc(d,f,heavy,blocked);const s=Math.min(S.sh,d);S.sh-=s;S.hp-=d-s;shT=3;mom=0;CAB.hurt(d,f);
  if(!blocked){SFX.hurt();fx((heavy?'HEAVY -':'-')+d,'taken','me');anim($('stg'),'ouch');anim($('me'),'hurt')}
  if(!blocked&&f.ab&&Math.random()<.5){
    if(f.ab==='slow'){slowT=4}else if(f.ab==='burn'){dot={t:3,dps:f.atk*.25,k:'Burning'}}else if(f.ab==='drain'){f.hp=Math.min(f.max,f.hp+Math.round(d*.5))}else{dot={t:f.ab==='poison'?5:4,dps:f.atk*.18,k:f.ab==='poison'?'Poisoned':'Bleeding'}}
  }
  if(S.hp<=0){playerDown();return}
  upd();
}
function combatTick(dt){
  const f=fight;if(!f||f.dead||f.hp<=0){if(f&&f.hp<=0&&foeDown())render();return}
  en=Math.min(100,en+8*dt);guardT=Math.max(0,guardT-dt);CAB.tick(dt);
  const sl=slowT>0?1.4:1;slowT=Math.max(0,slowT-dt);if(cd>0)cd=Math.max(0,cd-dt/sl);
  if(dot.t>0){dot.t-=dt;dotAcc+=dot.dps*dt;if(dotAcc>=1){const d=Math.floor(dotAcc);dotAcc-=d;S.hp-=d;if(S.hp<=0){playerDown();return}}}
  if(f.reg)f.hp=Math.min(f.max,f.hp+f.max*f.reg*dt);
  if(tele>0){tele-=dt;if(tele<=0){enemyAttack(true);if(fight!==f||f.dead)return}}
  else{ecd-=dt;if(ecd<=0){eatk++;ecd=f.sp*(f.rage?.8:1)*(.85+Math.random()*.3);if(f.heavy&&eatk%3===0){tele=.9;SFX.bite()}else{enemyAttack(false);if(fight!==f||f.dead)return}}}
  const cdf=$('cdf');if(cdf)cdf.style.width=(100-cd/wInt()*100)+'%';
  const ef=$('ef');if(ef)ef.style.width=(tele>0?100:Math.min(100,Math.max(0,(1-ecd/f.sp)*100)))+'%';
  const w=$('warn');if(w)w.textContent=tele>0?'HEAVY ATTACK incoming! Guard now!':'';
  upd();
}
function flee(){if(S.dg){say('You cannot flee inside a dungeon.');SFX.err();return false}if(Math.random()<.6){fight=null;dot.t=0;say('You got away.');return}say('You couldn’t escape.');enemyAttack(false);return false}
function eat(){const f=FISH.find(f=>inv(f.id)>0);if(!f){say('You have no fish to eat.');SFX.err();return false}S.inv[f.id]--;const h=Math.round(f.v*1.2)+4;S.hp=Math.min(maxHp(),S.hp+h);fx('+'+h,'heal','me');say('Ate a '+f.n+' and healed '+h+'.');SFX.eat();upd();return false}

/* ---------- scenes ---------- */
const bar=(p,c)=>'<div class="bar2 '+(c||'')+'"><i style="width:'+Math.max(0,p*100)+'%"></i></div>';
const stage=(cls,a,bgk,obj,extra,tip,boss)=>'<div class="stage '+cls+'" id="stg" data-a="'+a+'">'+bg(bgk,boss)+'<div class="obj '+(extra||'')+'" id="eo">'+obj+'</div>'+tip+'</div>';
const hb=(l,c,a,b)=>'<div class="hb"><span>'+l+'</span><div class="bar2 '+c+'"><i id="'+a+'"></i></div><b id="'+b+'"></b></div>';
const hud=f=>'<div class="hud">'+hb('HP','hp','php','pht')+(maxSh()?hb('Shield','sh','psh','psht'):'')+hb('Energy','en','pen','pent')+(f?hb('Attack','cd','cdf','cdt'):'')+'</div><p class="h" id="st"></p><p class="h">ATK '+atkPow().toFixed(1)+'   DEF '+defn().toFixed(1)+'   CRIT '+critCh().toFixed(1)+'%</p><p class="h" id="bf"></p>'+(f?'<div class="btns"><button class="btn" data-a="power">Power Strike 30</button><button class="btn" data-a="guard">Guard 20</button><button class="btn" data-a="focus">Focus 40</button></div>':'')+'<div class="btns"><button class="btn alt" data-a="eat">Eat food</button><button class="btn alt" id="bPot" data-a="potion"></button>'+(f&&!S.dg?'<button class="btn alt" data-a="flee">Flee</button>':'')+'</div>';
const ownTag=n=>n>0?'Own ×'+n:'';
const pc=x=>Math.round(x*10)/10;
const perks=()=>{const l=k=>L(k);return [
 ['farm','Grows '+pc((farmGrow()+.08*S.up.can)*100)+'% faster, '+pc((.4*l('farm')+6*S.up.fert))+'% double harvest, crops sell +'+pc(.5*l('farm')+4*S.up.scare)+'%'],
 ['barn','Animals '+pc((Math.min(.4,.005*l('barn'))+.1*S.up.trough)*100)+'% faster, '+pc(.4*l('barn')+6*S.up.brush)+'% double goods, goods sell +'+pc(.5*l('barn'))+'%'],
 ['fish',Math.round(60/spawnGap())+' fish/min, '+pc(.4*l('fish')+4*S.up.rod)+'% extra fish, fish sell +'+pc(.5*l('fish'))+'%'],
 ['mine','Rocks '+pc((Math.min(.4,.005*l('mine'))+.08*S.up.gloves)*100)+'% easier, '+pc(.4*l('mine')+6*S.up.lantern)+'% double ore, ore sells +'+pc(.5*l('mine')+4*S.up.cart)+'%'],
 ['smith',hitsNeed(l('smith'))+' hit(s) per item, recipes '+pc((Math.min(.3,.004*l('smith'))+.07*S.up.tongs)*100)+'% cheaper, '+pc(.3*l('smith')+6*S.up.bellows)+'% bonus item, gear sells +'+pc(.5*l('smith')+4*S.up.furnace)+'%'],
 ['alch',hitsNeed(l('alch'))+' stir(s) per brew, '+pc(.4*l('alch')+8*S.up.cauldron)+'% double brew, potions '+pc(.5*l('alch'))+'% stronger'],
 ['combat','Per 10 levels: +1 damage, +1% crit chance, +0.5 crit multiplier. Now +'+pc(l('combat')/10)+' dmg, +'+pc(l('combat')/10)+'% crit, x'+pc(critMul())+' crits, +'+2*l('combat')+' HP'],
 ['trade','Caravans '+pc((Math.min(.4,.005*l('trade'))+.08*S.up.horse)*100)+'% faster, hauls +'+pc(l('trade')+10*S.up.wagon)+'%, bandits -'+pc(3*S.up.guard+.1*l('trade'))+'%, +'+pc(3*S.up.ledger)+'% coins']]};
const VIEWS={
 fish(){
  school=[];combo=0;spawnT=0;
  return skillBar('fish')+'<div class="stage s-fish" id="stg" data-a="miss">'+bg('fish')+'<div id="lake"></div><div class="tip" id="combo" style="position:absolute;top:8px;left:0;right:0;z-index:3">Combo x0</div></div><p class="h">Tap the fish as they swim by. Chain catches for combo bonuses. Higher levels spawn fish faster and unlock bigger fish.</p>';
 },
 mine(){
  const o=ORES[rock.t];
  return skillBar('mine')+stage('s-mine','mine','mine',oIcon(o,'art'),'pop','<div class="tip">'+o.n+' vein</div><div class="mbar">'+bar(rock.hp/rock.max)+'</div><div class="tip">Tap the rock to mine it</div>')+'<p class="h">'+item('p').n+', mining power '+item('p').pw+'.</p>';
 },
 smith(){
  const cats=[['bar','Smelter'],['w','Weapons'],['a','Armor'],['p','Tools']];
  const chips='<div class="btns">'+cats.map(c=>'<button class="btn '+(c[0]===forgeCat?'':'alt')+'" data-a="cat" data-i="'+c[0]+'">'+c[1]+'</button>').join('')+'</div>';
  const sel=IT.find(x=>x.id===forgeSel&&x.r);
  const tip=sel?'<div class="tip">Forging '+sel.n+'</div><div class="tip">'+need(sel)+'</div><div class="tip">'+'●'.repeat(forgeHits)+'○'.repeat(hitsNeed(L('smith'))-forgeHits)+'  Tap the anvil to hammer</div>':'<div class="tip">Choose an item below, then tap the anvil</div>';
  const list=IT.filter(i=>i.c===forgeCat&&i.r&&!i.x).map(i=>'<button class="rec'+(sel&&sel.id===i.id?' on':'')+(L('smith')>=i.l?'':' dim')+'" data-a="rec" data-i="'+i.id+'">'+iIcon(i)+'<div><b>'+i.n+'</b><small>'+stat(i)+'</small><small>'+needHtml(i)+'</small></div><span class="tag">'+ownTag(cnt(i.id))+'</span></button>').join('');
  return skillBar('smith')+stage('s-forge','anvil','forge',icon('anvil',0,'art'),'pop',tip)+chips+'<div class="col">'+list+'</div><p class="h">You can craft the same item again and again. Spare copies go to your Pack, where you can sell them.</p>';
 },
 alch(){
  const sel=POTS.find(p=>p.id===brewSel);
  const tip=sel?'<div class="tip">Brewing '+sel.n+'</div><div class="tip">'+sel.r.map(x=>x[1]+' '+nm(x[0])).join(', ')+'</div><div class="tip">'+'●'.repeat(brewHits)+'○'.repeat(hitsNeed(L('alch'))-brewHits)+'  Tap the cauldron to stir</div>':'<div class="tip">Choose a recipe below, then tap the cauldron</div>';
  const list=POTS.map(p=>'<div class="rowd"><button class="rec'+(brewSel===p.id?' on':'')+(L('alch')>=p.l?'':' dim')+'" data-a="bsel" data-i="'+p.id+'">'+icon('flask',p.col)+'<div><b>'+p.n+'</b><small>'+p.d+'</small><small>Alchemy '+p.l+'</small><small><span class="reqs">'+p.r.map(x=>'<span class="rq">'+gIcon(x[0])+'<b>'+x[1]+'</b></span>').join('')+'</span></small></div><span class="tag">'+ownTag(inv(p.id))+'</span></button>'+(inv(p.id)?'<button class="btn alt" data-a="drink" data-i="'+p.id+'">Drink</button>':'')+'</div>').join('');
  return skillBar('alch')+'<p class="h">'+buffText()+'</p>'+stage('s-forge','cauldron','brew',icon('cauldron',0,'art'),'pop',tip)+'<div class="col">'+list+'</div>';
 },
 fight(){
  const h=skillBar('combat');
  if(!fight)return h+stage('s-road','explore','road',icon('road',0,'art'),'pop','<div class="tip">Tap the road to explore</div><div class="tip">'+(S.kills%6===5?'A boss awaits ahead!':'Boss in '+(5-S.kills%6)+' fights')+'</div>')+hud(false);
  return h+stage('s-fight','atk','arena',mon(fight.a),'','<div class="tip" id="etxt"></div><div class="mbar"><div class="bar2 hp"><i id="ehp"></i></div></div><div class="mbar"><div class="bar2 ec"><i id="ef"></i></div></div><div class="tip">Tap the enemy to attack</div>'+(window.V4&&V4.fightOverlay?V4.fightOverlay():'<div class="me" id="me">'+mon(HERO,'')+'</div>')+'',fight.b)+hud(true);
 },
 market(){
  const ids=[...ORES.map(o=>o.id),...Object.keys(MATS),...FISH.map(f=>f.id)].filter(id=>inv(id)>0);
  let h='<div class="ttl">Sell materials</div>'+(ids.length?ids.map(id=>'<div class="rowd"><div class="rec">'+gIcon(id)+'<div><b>'+nm(id)+' ×'+inv(id)+'</b><small>'+earn(VAL[id])+' coins each</small></div></div><button class="btn alt" data-a="s1" data-i="'+id+'">Sell 1</button><button class="btn alt" data-a="sa" data-i="'+id+'">All</button></div>').join(''):'<p class="h">Nothing to sell yet. Farm, fish, mine and fight to collect materials. Spare weapons and armor are sold from the Pack.</p>');
  h+='<div class="ttl">Supplies</div><button class="rec" data-a="buy" data-i="pot">'+icon('flask','#ff6b8a')+'<div><b>Minor Healing Potion</b><small>Heals 40 HP. You have '+inv('pot_hp1')+'</small></div><span class="tag">25 coins</span></button>';
  UPG.forEach(g=>{h+='<div class="ttl">'+g[0]+' upgrades</div>'+g[1].map(u=>{const l=S.up[u.k],mx=u.max||5;return '<button class="rec" data-a="buy" data-i="'+u.k+'">'+icon(u.ic,u.col)+'<div><b>'+u.n+' '+l+'/'+mx+'</b><small>'+u.d+'</small></div><span class="tag">'+(l>=mx?'Maxed':u.cost[l]+' coins')+'</span></button>'}).join('')});
  return h;
 },
 pack(){
  const eq=['w','a','p'].map(k=>{const it=item(k);return '<button class="slot" data-a="info" data-i="'+it.id+'">'+iIcon(it)+'<span>'+it.n+'</span></button>'}).join('');
  const st=[['ATK',atkPow()],['Speed',(1/wInt()).toFixed(1)+'/s'],['Crit',critCh()+'%'],['Defense',defn()],['HP',maxHp()],['Shield',maxSh()]].map(a=>'<div class="slot"><span>'+a[0]+'</span><b>'+a[1]+'</b></div>').join('');
  const gear=IT.filter(i=>cnt(i.id)>0).map(i=>{const e=S.eq[i.c]===i.id,free=cnt(i.id)-(e?1:0);return '<div class="rowd"><button class="rec'+(e?' eq':'')+'" data-a="equip" data-i="'+i.id+'">'+iIcon(i)+'<div><b>'+i.n+' ×'+cnt(i.id)+'</b><small>'+stat(i)+'</small></div><span class="tag">'+(e?'Equipped':'Equip')+'</span></button>'+(i.v&&free>0?'<button class="btn alt" data-a="selli" data-i="'+i.id+'">Sell '+earn(i.v)+'</button>':'')+'</div>'}).join('');
  const pots=POTS.filter(p=>inv(p.id)>0).map(p=>'<button class="slot" data-a="info" data-i="'+p.id+'">'+icon('flask',p.col)+'<span>'+p.n+' ×'+inv(p.id)+'</span></button>').join('');
  const mats=[...ORES.map(o=>o.id),...Object.keys(MATS),...FISH.map(f=>f.id)].filter(id=>inv(id)>0).map(id=>'<button class="slot" data-a="info" data-i="'+id+'">'+gIcon(id)+'<span>'+nm(id)+' ×'+inv(id)+'</span></button>').join('');
  return '<div class="hero">'+mon(HERO,'art')+'<div class="info"><div>Combat level '+L('combat')+', '+S.kills+' wins</div><div class="bar2 hp"><i id="php"></i></div><div id="pht"></div></div></div>'
   +'<div class="ttl">Stats</div><div class="slots">'+st+'</div><div class="ttl">Equipped</div><div class="slots">'+eq+'</div><div class="ttl">Gear in your bag</div><div class="col">'+gear+'</div>'
   +'<div class="ttl">Potions</div>'+(pots?'<div class="slots">'+pots+'</div>':'<p class="h">No potions yet. Brew some in the Brew tab.</p>')+'<p class="h">'+buffText()+'</p>'
   +'<div class="ttl">Materials</div>'+(mats?'<div class="slots">'+mats+'</div>':'<p class="h">Nothing yet.</p>')
   +'<div class="ttl">Skills and perks</div><div class="col">'+perks().map(p=>skillBar(p[0])+'<p class="h">'+p[1]+'</p>').join('')+'</div>';
 }
};
Object.assign(VIEWS,{
 alch(){
  const sel=ALLR.find(p=>p.id===brewSel),fmt=p=>reqText(p.r);
  const tip=sel?'<div class="tip">Brewing '+sel.n+'</div><div class="tip">'+fmt(sel)+'</div><div class="tip">'+'●'.repeat(brewHits)+'○'.repeat(hitsNeed(L('alch'))-brewHits)+'  Tap the cauldron to stir</div>':'<div class="tip">Choose a recipe below, then tap the cauldron</div>';
  const row=p=>'<div class="rowd"><button class="rec'+(brewSel===p.id?' on':'')+(L('alch')>=p.l?'':' dim')+'" data-a="bsel" data-i="'+p.id+'">'+gIcon(p.id)+'<div><b>'+p.n+'</b><small>'+p.d+'</small><small>Alchemy '+p.l+': '+fmt(p)+'</small></div><span class="tag">'+ownTag(inv(p.id))+'</span></button>'+((p.heal||p.sh||p.buff)&&inv(p.id)?'<button class="btn alt" data-a="drink" data-i="'+p.id+'">Drink</button>':'')+'</div>';
  return skillBar('alch')+'<p class="h">'+buffText()+'</p>'+stage('s-forge','cauldron','brew',icon('cauldron',0,'art'),'pop',tip)+'<div class="ttl">Potions</div><div class="col">'+POTS.map(row).join('')+'</div><div class="ttl">Fertilizers</div><p class="h">Spend them when planting in the Farm tab. Animals make manure, the base ingredient.</p><div class="col">'+FERTS.filter(f=>f.r).map(row).join('')+'</div>';
 },
 market(){
  const ids=[...ORES.map(o=>o.id),...Object.keys(MATS),...FISH.map(f=>f.id)].filter(id=>inv(id)>0);
  let h='<div class="ttl">Sell materials</div>'+(ids.length?ids.map(id=>'<div class="rowd"><div class="rec">'+gIcon(id)+'<div><b>'+nm(id)+' ×'+inv(id)+'</b><small>'+earn(VAL[id]*(catOf(id)==='mine'?1+.04*S.up.cart:1),catOf(id))+' coins each</small></div></div><button class="btn alt" data-a="s1" data-i="'+id+'">Sell 1</button><button class="btn alt" data-a="sa" data-i="'+id+'">All</button></div>').join(''):'<p class="h">Nothing to sell yet. Spare weapons and armor are sold from the Pack. Travelling merchants can sell for more in the Trade tab.</p>');
  h+='<div class="ttl">Supplies</div><button class="rec" data-a="buy" data-i="pot">'+icon('flask','#ff6b8a')+'<div><b>Minor Healing Potion</b><small>Heals 40 HP. You have '+inv('pot_hp1')+'</small></div><span class="tag">25 coins</span></button>';
  UPG.forEach(g=>{h+='<div class="ttl">'+g[0]+' upgrades</div>'+g[1].map(u=>{const l=S.up[u.k],nmx=u.n[Math.min(u.n.length-1,Math.floor(l/2))];return '<button class="rec" data-a="buy" data-i="'+u.k+'">'+icon(u.ic,u.col)+'<div><b>'+nmx+' '+l+'/'+u.max+'</b><small>'+u.d+'</small></div><span class="tag">'+(l>=u.max?'Maxed':u.cost[l]+' coins')+'</span></button>'}).join('')});
  return h;
 },
 pack(){
  const eq=['w','a','p'].map(k=>{const it=item(k);return '<button class="slot" data-a="info" data-i="'+it.id+'">'+iIcon(it)+'<span>'+it.n+'</span></button>'}).join('');
  const st=[['ATK',atkPow().toFixed(1)],['Speed',(1/wInt()).toFixed(1)+'/s'],['Crit',critCh().toFixed(1)+'%'],['Crit dmg','x'+pc(critMul())],['Defense',defn().toFixed(1)],['HP',maxHp()],['Shield',maxSh()]].map(a=>'<div class="slot"><span>'+a[0]+'</span><b>'+a[1]+'</b></div>').join('');
  const gear=IT.filter(i=>cnt(i.id)>0).map(i=>{const e=S.eq[i.c]===i.id,free=cnt(i.id)-(e?1:0);return '<div class="rowd"><button class="rec'+(e?' eq':'')+'" data-a="equip" data-i="'+i.id+'">'+iIcon(i)+'<div><b>'+i.n+' ×'+cnt(i.id)+'</b><small>'+stat(i)+'</small></div><span class="tag">'+(e?'Equipped':'Equip')+'</span></button>'+(i.v&&free>0?'<button class="btn alt" data-a="selli" data-i="'+i.id+'">Sell '+earn(i.v*(1+.04*S.up.furnace),'smith')+'</button>':'')+'</div>'}).join('');
  const ids=[...ORES.map(o=>o.id),...Object.keys(MATS),...FISH.map(f=>f.id),...POTS.map(p=>p.id),...FERTS.filter(f=>f.r).map(f=>f.id),...TRADE.map(t=>t.id)].filter(id=>inv(id)>0);
  const cells=ids.map(id=>'<button class="sq" data-a="info" data-i="'+id+'">'+gIcon(id)+'<span class="cnt">'+inv(id)+'</span></button>');
  while(cells.length<25||cells.length%5)cells.push('<div class="sq empty"></div>');
  return '<div class="hero">'+mon(HERO,'art')+'<div class="info"><div>Combat level '+L('combat')+', '+S.kills+' wins</div><div class="bar2 hp"><i id="php"></i></div><div id="pht"></div></div></div>'
   +'<div class="ttl">Stats</div><div class="slots">'+st+'</div><div class="ttl">Equipped</div><div class="slots">'+eq+'</div>'
   +'<div class="ttl">Backpack</div><div class="inv">'+cells.join('')+'</div><p class="h">Tap a square to see what it is and what it sells for. '+buffText()+'</p>'
   +'<div class="ttl">Gear in your bag</div><div class="col">'+gear+'</div>'
   +'<div class="ttl">Skills and perks</div><div class="col">'+perks().map(p=>skillBar(p[0])+'<p class="h">'+p[1]+'</p>').join('')+'</div>';
 },
 trade(){
  const T=S.trade,cur=town(T.at),trav=!!T.to;if(!T.pr)T.pr=tradePrices(cur);
  let wp=cur;if(trav){const a=town(T.from),b=town(T.to),p=Math.min(1,(Date.now()-T.t0)/(T.dur*1000));wp={x:a.x+(b.x-a.x)*p,y:a.y+(b.y-a.y)*p}}
  const lines=TOWNS.flatMap((a,i)=>TOWNS.slice(i+1).map(b=>'<line x1="'+a.x+'" y1="'+a.y+'" x2="'+b.x+'" y2="'+b.y+'" stroke="#a8743b" stroke-width="1.5" stroke-dasharray="4 4" vector-effect="non-scaling-stroke"/>')).join('');
  const mapbg='<div class="bgs"><img src="'+(window.V4MAP||'')+'" alt="" draggable="false"><svg viewBox="0 0 100 100" preserveAspectRatio="none">'+lines+'</svg></div>';
  const nodes=TOWNS.map(t=>'<button class="town'+(t.id===T.at&&!trav?' here':'')+'" style="left:'+t.x+'%;top:'+t.y+'%" data-a="go" data-i="'+t.id+'">'+icon('town')+'<span>'+t.n+'</span></button>').join('');
  const map='<div class="stage s-map" id="stg" data-a="miss">'+mapbg+nodes+'<div id="wagon" class="wagon" style="left:'+wp.x+'%;top:'+wp.y+'%">'+icon('wagon')+'</div><div class="tip" style="position:absolute;bottom:6px;left:0;right:0;z-index:3;color:#3a2a10;text-shadow:none">'+(trav?'On the road…':'Tap a town to travel there')+'</div></div>';
  if(trav)return skillBar('trade')+map+'<div class="card2">Traveling to '+town(T.to).n+'<div class="bar2"><i id="tbar" style="width:0"></i></div><span id="ttxt"></span></div>';
  const pr=T.pr,hint=g=>{const p=pr[g.id];return p<g.b*.85?'Cheap':p>g.b*1.2?'High':'Fair'};
  const goods=TRADE.map(g=>'<div class="rowd"><div class="rec">'+icon(g.ic,g.col)+'<div><b>'+g.n+' ×'+inv(g.id)+'</b><small>'+pr[g.id]+' coins, '+hint(g)+(inv(g.id)&&S.cost[g.id]?', paid ~'+Math.round(S.cost[g.id]):'')+'</small></div></div><button class="btn alt" data-a="tb" data-i="'+g.id+'">Buy</button><button class="btn alt" data-a="tb10" data-i="'+g.id+'">×10</button><button class="btn alt" data-a="ts" data-i="'+g.id+'">Sell all</button></div>').join('');
  const cats=TCATS.map((c,i)=>'<button class="rec" data-a="tc" data-i="'+i+'">'+gIcon(c[3][0])+'<div><b>Sell all '+c[1].toLowerCase()+'</b><small>Local demand x'+town(T.at).c[i]+'</small></div><span class="tag">'+catTotal(c,i)+' coins</span></button>').join('');
  const hints=TOWNS.filter(t=>t.id!==T.at).map(t=>{const lo=TRADE.filter((g,i)=>t.m[i]<.85).map(g=>g.n),hi=TRADE.filter((g,i)=>t.m[i]>1.25).map(g=>g.n);return '<div class="rec"><div><b>'+t.n+' ('+Math.round(travelTime(cur,t))+'s)</b><small>Cheap: '+(lo.join(', ')||'none')+'</small><small>Pays well for: '+(hi.join(', ')||'none')+'</small></div></div>'}).join('');
  return skillBar('trade')+map+'<div class="ttl">'+cur.n+' market</div><p class="h">Cargo '+cargoUsed()+' / '+cargoCap()+'. Buy cheap here, sell high in another town. Wagon upgrades are in the Shop.</p><div class="col">'+goods+'</div><div class="ttl">Sell your own goods here</div><div class="col">'+cats+'</div><div class="ttl">Other towns</div><div class="col">'+hints+'</div>';
 }
});
Object.assign(VIEWS,{
 fight(){
  const h=skillBar('combat');
  if(fight){const f=fight;return h+stage('s-fight','atk',S.dg?'dungeon':'arena',mon(f.a),'','<div class="tip" id="etxt"></div><div class="mbar"><div class="bar2 hp"><i id="ehp"></i></div></div><div class="mbar"><div class="bar2 ec"><i id="ef"></i></div></div><div class="tip" id="warn" style="color:#ff8a8a;font-weight:700"></div><div class="tip">Tap the enemy to attack</div>'+(window.V4&&V4.fightOverlay?V4.fightOverlay():'<div class="me" id="me">'+mon(HERO,'')+'</div>')+'',f.b)+hud(true)}
  if(S.dg){
    const d=dgDef(),r=DGR[S.dg.room],dots=DGR.map((x,i)=>i<S.dg.room?'●':(i===S.dg.room&&!S.dg.chest?'◆':'○')).join(' ')+(S.dg.chest?'  ★':'');
    let st;
    if(S.dg.chest)st=stage('s-fight','dgchest','treasure',icon('chest',0,'art'),'pop','<div class="tip">The greater boss is down! Tap the chest to open it</div>');
    else if(r==='r')st=stage('s-fight','camp','camp',icon('campfire',0,'art'),'pop','<div class="tip">A safe campfire. Tap it to rest (40% health, full shield)</div>');
    else st=stage('s-fight','dgdoor','dungeon',icon('door',0,'art'),'pop','<div class="tip">Room '+(S.dg.room+1)+' of '+DGR.length+': '+DGN[r]+'</div><div class="tip">Tap the door to enter</div>');
    return h+st+'<div class="card2"><b>'+d.n+'</b><span>'+dots+'</span></div>'+hud(false)+'<div class="btns"><button class="btn alt" data-a="dgout">Leave dungeon</button></div>';
  }
  const list=DG.filter(d=>L('combat')>=d.l).map(d=>'<button class="rec" data-a="dgin" data-i="'+d.id+'">'+mon(FOES.find(f=>f.n===d.final).a,'ic')+'<div><b>'+d.n+'</b><small>Recommended combat level '+d.l+'+. '+DGR.length+' rooms, a boss, a greater boss and a treasure chest.</small><small>Cleared ×'+(S.clears[d.id]||0)+'</small></div><span class="tag">Enter</span></button>').join('');
  return h+stage('s-road','explore','road',icon('road',0,'art'),'pop','<div class="tip">Tap the road to wander and fight</div>')+'<div class="ttl">Dungeons</div>'+(list?'<div class="col">'+list+'</div>':'<p class="h">Wander the road to grow stronger. Dungeons are discovered as your combat level rises.</p>')+hud(false);
 }
});
const TABS=[['farm','sprout','Farm'],['barn','egg','Barn'],['fish','fish','Fish','#8fb3c9'],['mine','pick','Mine','#c9d6e4'],['smith','anvil','Forge'],['alch','flask','Brew','#7ad8ff'],['fight','sword','Fight','#c9d6e4'],['trade','wagon','Trade'],['market','coin','Shop'],['pack','bag','Pack']];
TABS.forEach(([k,i,n,c])=>{const b=document.createElement('button');b.dataset.k=k;b.innerHTML=icon(i,c)+n;b.addEventListener('click',()=>{S.tab=k;SFX.coin();save();render();window.scrollTo(0,0)});$('tabs').appendChild(b)});
const own=()=>S.tab==='farm'||S.tab==='barn';
function rp(){if(!own()){try{$('pane').innerHTML=VIEWS[S.tab]?VIEWS[S.tab]():'';upd()}catch(e){if(window.__ready)throw e}}}
$('pane').addEventListener('click',e=>{
  const b=e.target.closest('[data-a]');if(!b)return;const a=b.dataset.a,i=b.dataset.i;
  const r=({catch:()=>catchFish(i),miss:()=>false,mine:mineAct,explore,atk:attack,eat,potion:useHeal,flee,buy:()=>buy(i),rec:()=>{forgeSel=i;forgeHits=0;SFX.coin()},anvil:anvilAct,cat:()=>{forgeCat=i;forgeSel=null;forgeHits=0},equip:()=>equip(i),selli:()=>sellItem(i),s1:()=>sellMat(i,false),sa:()=>sellMat(i,true),bsel:()=>{brewSel=i;brewHits=0;SFX.coin()},cauldron:cauldronAct,drink:()=>drink(i),go:()=>tradeGo(i),tb:()=>tradeBuy(i,1),tb10:()=>tradeBuy(i,10),ts:()=>tradeSell(i),tc:()=>tradeCat(+i),info:()=>{say(infoText(i));return false},power,guard:guardAct,focus:focusAct,cab:()=>CAB.use(),dgin:()=>dgEnter(i),dgdoor:dgDoor,dgout:dgLeave,dgchest:dgChest,camp:dgCamp,region:()=>chooseRegion(i),talent:()=>buyTalent(i),quest:()=>claimQuest(i),boss:()=>challengeBoss(i)})[a]();
  save();if(r!==false)render();
});
$('mute').addEventListener('click',()=>{S.mute=!S.mute;RA.sync();save();render();SFX.coin()});window.addEventListener('load',()=>RA.wrap(SFX));
$('title').addEventListener('click',()=>{showIntro();$('intro').hidden=false});

function stall(x,k,lab,show,ripe,g){x.b.classList.toggle('ripe',ripe);x.bar.style.display=show?'block':'none';if(show)x.fill.style.width=(g*100)+'%';if(x.k!==k){x.k=k;x.e.innerHTML=k===''?'':k.startsWith('A:')?mon(ANIART[k.slice(2)],'ic'):icon(k)}if(x.l.textContent!==lab)x.l.textContent=lab}
const setT=(el,t)=>{if(el&&el.textContent!==t)el.textContent=t};
function render(){
  $('coins').innerHTML=icon('coin')+S.coins;setT($('mute'),S.mute?'Sound off':'Sound on');
  [...$('tabs').children].forEach(b=>b.classList.toggle('on',b.dataset.k===S.tab));
  $('farm').hidden=S.tab!=='farm';$('barn').hidden=S.tab!=='barn';$('pane').hidden=own();
  if(!own()){rp();return}
  if(S.tab==='barn'){
    $('bsk').innerHTML=skillBar('barn');aEls.forEach((b,i)=>b.classList.toggle('on',i===S.asel));
    bEls.forEach((x,i)=>{const p=S.barn[i];x.b.classList.toggle('locked',i>=cap());
      if(i>=cap())stall(x,'lock','Locked',false,false,0);
      else if(!p)stall(x,'','Empty',false,false,0);
      else{const g=aProg(p);stall(x,'A:'+ANI[p.t].id,g>=1?'Collect':Math.ceil(p.d*(1-g))+'s',true,g>=1,g)}});
    return;
  }
  $('fsk').innerHTML=skillBar('farm');
  fEls.forEach((b,i)=>{b.classList.toggle('on',i===S.fsel);const f=i?FERTS[i-1]:null;setT(b.children[2],f?'×'+inv(f.id):'')});
  const FL=L('farm');
  seedEls.forEach((b,i)=>{b.classList.toggle('on',i===S.sel);setT(b.children[2],FL<CROPS[i].l?'Lv '+CROPS[i].l+' needed':(CROPS[i].give?CROPS[i].cost+' for '+CROPS[i].q+' items':CROPS[i].cost+' to '+CROPS[i].sell))});
  S.plots.forEach((p,i)=>{
    const x=els[i];x.b.classList.toggle('locked',!p.open);
    if(!p.open)stall(x,'lock',unlockCost()+' coins',false,false,0);
    else if(p.c<0)stall(x,'','Empty',false,false,0);
    else{const g=prog(p),crop=CROPS[p.c],artKey=CROP_ART_KEY_BY_NAME[crop.n],stage=Math.min(3,Math.floor(g*4));stall(x,artKey?('pixelcrop:'+artKey+':'+stage):crop.ic,g>=1?'Harvest':Math.ceil(p.d*(1-g))+'s',true,g>=1,g)}
  });
}
render();

/* ---------- main loop and timers ---------- */
let last=0;
function loop(t){
  const dt=Math.min(.1,(t-last)/1000)||0;last=t;
  if($('intro').hidden){
    tradeTick();
    if(S.tab==='fish'&&!window.__pondMode){
      const lk=$('lake');
      if(lk){
        spawnT-=dt;if(spawnT<=0&&school.length<6){spawnFish();spawnT=spawnGap()}
        const w=lk.clientWidth;
        school=school.filter(s=>{s.x+=s.v*dt;s.el.style.transform='translateX('+s.x+'px) scaleX('+(s.dir>0?-1:1)+')';if(s.x<-100||s.x>w+100){s.el.remove();return false}return true});
      }
    }
    if(fight&&S.tab==='fight')combatTick(dt);
  }
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
let tk=0;
setInterval(()=>{
  tk++;
  if(own()&&$('intro').hidden)render();
  shT-=.25;
  if(shT<=0&&S.sh<maxSh()){S.sh=Math.min(maxSh(),S.sh+(fight?.5:1))}
  if(tk%8===0&&!fight&&S.hp<maxHp()){S.hp=Math.min(maxHp(),S.hp+1)}
  if(tk%4===0)upd();
  if(tk%40===0)save();
},250);

/* ---------- title screen ---------- */
let eraseArm=false;
function showIntro(){
  $('poster').innerHTML=POSTER;
  $('poster').style.backgroundImage='linear-gradient(180deg,rgba(3,7,19,.05) 0%,rgba(3,8,20,.10) 38%,rgba(3,8,20,.86) 100%),url(\"'+AI_TITLE_BG+'\")';
  $('play').textContent='Start';
  $('newg').hidden=false;$('newg').textContent=hasSave?'New game in Slot '+activeSaveSlot:'Reset this slot';eraseArm=false;
  let picker=$('save-slot-picker');
  if(picker)picker.style.display='none';
  if(!picker){picker=document.createElement('div');picker.id='save-slot-picker';picker.style.cssText='display:grid;grid-template-columns:repeat(5,minmax(48px,1fr));gap:7px;width:min(440px,92vw);margin:14px auto 4px';$('play').parentNode.insertBefore(picker,$('play').nextSibling)}
  picker.innerHTML=Array.from({length:SAVE_SLOT_COUNT},(_,i)=>{const n=i+1,exists=!!readSlot(n),active=n===activeSaveSlot;return '<button type="button" data-save-slot="'+n+'" style="padding:9px 3px;border-radius:9px;border:1px solid '+(active?'#e6bd70':'#65718b')+';background:'+(active?'#594326':'#202b40')+';color:#fff;font-weight:800;cursor:pointer">Slot '+n+'<small style="display:block;font-size:9px;opacity:.8">'+(exists?'Saved':'Empty')+(active?' · Active':'')+'</small></button>'}).join('');
  picker.querySelectorAll('[data-save-slot]').forEach(b=>b.addEventListener('click',()=>{const n=+b.dataset.saveSlot;if(n===activeSaveSlot)return;activateCampaignSlot(n)}));
}
$('play').addEventListener('click',()=>{$('intro').hidden=true;hasSave=true;SFX.win();render()});
$('newg').addEventListener('click',()=>{
  if(!eraseArm){eraseArm=true;$('newg').textContent='Confirm: erase Slot '+activeSaveSlot+' and start new?';return}
  try{localStorage.removeItem(slotKey(activeSaveSlot));if(activeSaveSlot===1)localStorage.removeItem('tinyacre-save')}catch(e){}
  beginFreshCampaign();
});

/* ---------- extension: classes, rarity, upgrades tree, woodcutting ---------- */
const RAR=[['Common','#cfcfc4',0],['Uncommon','#5fe08a',5],['Rare','#4aa8ff',12],['Epic','#b36bff',30],['Legendary','#ffa530',70]];
const rar=id=>{const v=VAL[id]||0;let r=RAR[0];RAR.forEach(x=>{if(v>=x[2])r=x});return r};
const BURST='<svg viewBox="0 0 24 24" width="24" height="24" style="vertical-align:-4px;margin-right:2px"><path d="M12 1l3 7 8 1-6 5 2 8-7-4-7 4 2-8-6-5 8-1z" fill="#ffd84d" stroke="#241a35" stroke-width="1.5"/></svg>';
fx=function(t,c,side,crit,col){const s=$('stg');if(!s)return;const e=document.createElement('span');e.className='fx '+c+(crit?' crit':'');e.innerHTML=(crit?BURST:'')+t;if(col)e.style.color=col;e.style.left=side==='me'?'18%':(30+Math.random()*34)+'%';e.style.top=side==='me'?'60%':'26%';s.appendChild(e);setTimeout(()=>e.remove(),900)};
let tBox,lastSnd=0;
function toast(t,kind,col){tBox=tBox||document.body.appendChild(Object.assign(document.createElement('div'),{id:'toasts'}));const e=document.createElement('div');e.className='toast';e.innerHTML=t;if(col)e.style.borderColor=col;tBox.appendChild(e);setTimeout(()=>e.remove(),2600);while(tBox.children.length>3)tBox.firstChild.remove();const n=Date.now();if(n-lastSnd>5000){lastSnd=n;const b=kind==='reward'?660:880;tone(b,.35,'sine',.025);tone(b*1.5,.4,'sine',.02,0,.12)}}
function drop(id,q,bonus){const r=rar(id);if(r[2]>=5||bonus)toast('<b style="color:'+r[1]+'">'+q+' '+nm(id)+'</b> <small>'+r[0]+(bonus?' bonus drop':'')+'</small>','drop',r[1]);fx('+'+q+' '+nm(id),'info','foe',false,r[1])}
const _ax=addXp;addXp=function(k,n){const o=L(k);_ax(k,n);if(L(k)>o)toast('Level up! <b>'+SKN[k]+'</b> '+L(k),'reward')};
const _uh=useHeal;useHeal=function(){const h=S.hp,r=_uh();if(S.hp>h)fx('+'+Math.round(S.hp-h),'heal','me');return r};
const CLS={warrior:{n:'Warrior',d:'Sword and shield. +10% damage, +15 HP, +10% defense.',atk:1.1,hp:15,def:1.1,cr:0,spd:1,dt:'phys'},tank:{n:'Tank',d:'+45 HP, +40% defense, slower strikes.',atk:.85,hp:45,def:1.4,cr:0,spd:1.15,dt:'phys'},archer:{n:'Archer',d:'Bows. +12% crit, fast shots.',atk:1.05,hp:0,def:1,cr:12,spd:.88,dt:'phys',k:'archer'},mage:{n:'Mage',d:'Staves. Magic damage ignores half of armor.',atk:1.2,hp:-5,def:.9,cr:4,spd:1.05,dt:'magic',k:'mage'},rogue:{n:'Rogue',d:'Daggers. +18% crit, 30% of hits are true damage (ignore armor).',atk:1,hp:0,def:1,cr:18,spd:.85,dt:'rogue',k:'rogue'},healer:{n:'Healer',d:'Staves. Magic damage, heals 3% max HP per hit.',atk:.85,hp:10,def:1,cr:3,spd:1,dt:'magic',heal:1,k:'mage'}};
const CL=()=>CLS[S.cls]||{atk:1,hp:0,def:1,cr:0,spd:1,dt:'phys'};
const cm=k=>{const c=CL();return k==='atk'?c.atk*(CAB.match(c)?1.15:1):c[k]};
const dmgType=()=>{const c=CL(),p=.05*S.up.pierce;return c.dt==='rogue'?(Math.random()<.3+p?'true':'phys'):c.dt==='phys'&&Math.random()<p?'true':c.dt};
function gemRoll(){const r=Math.random();if(r<.003+.001*S.up.gemeye){S.inv.starstone=inv('starstone')+1;toast('<b style="color:#ffa530">Starstone</b> <small>Legendary find!</small>','reward','#ffa530')}else if(r<.012+.005*S.up.gemeye){S.inv.agem=inv('agem')+1;toast('<b style="color:#b36bff">Arcane Gem</b> <small>Epic find</small>','bonus','#b36bff')}
 if(!fight&&Math.random()<.04*(1-.1*S.up.gemeye)){const el=FOES.filter(x=>!x.b&&x.l<=L('mine')/2+2),f=el[Math.floor(Math.random()*el.length)];if(f){S.tab='fight';startFight(mkFoe(f.n,1,'f'));say('A '+f.n+' ambushes you in the mine!');SFX.bite();window.V4&&V4.ambush&&V4.ambush(f)}}}
const TREES=[['oak','Oak',1],['birch','Birch',3],['pine','Pine',5],['ironwood','Ironwood',8],['elder','Elderwood',12]];let tree=null;
function newTree(){const el=TREES.filter(t=>L('wood')>=t[2]),t=TREES.indexOf(el[Math.floor(Math.pow(Math.random(),1.5)*el.length)]),b=4+t*3,hp=Math.max(2,Math.round(b*(1-.08*S.up.axeup)));tree={t,hp,max:hp}}
newTree();
function chop(){tree.hp-=1+Math.floor(L('wood')/8);SFX.mine();if(tree.hp<=0){const t=TREES[tree.t],q=1+(Math.random()<.06*S.up.sawup?1:0);S.inv[t[0]]=inv(t[0])+q;addXp('wood',[3,6,10,15,24][tree.t]);say('Chopped '+q+' '+t[1]+' log'+(q>1?'s':'')+'.');if(q>1)toast('Bonus log! +1 '+t[1],'bonus');SFX.brk();newTree()}}
function wcraft(id){const it=IT.find(x=>x.id===id);if(L('wood')<it.l||S.coins<it.g||!it.r.every(x=>inv(x[0])>=x[1])){say(missMsg('Woodcutting','wood',it.l,it.r,it.g));SFX.err();return}it.r.forEach(x=>S.inv[x[0]]-=x[1]);S.coins-=it.g;S.items[id]=cnt(id)+1;addXp('wood',8+it.l*3);say('Crafted '+it.n+'. Equip it in the Inventory.');SFX.forge();toast('Crafted <b>'+it.n+'</b>','reward')}
VIEWS.wood=()=>{const t=TREES[tree.t],cr=IT.filter(i=>i.x==='wood').map(i=>'<button class="rec'+(L('wood')>=i.l?'':' dim')+'" data-x="wc" data-i="'+i.id+'">'+iIcon(i)+'<div><b>'+i.n+'</b> <small>('+i.k+')</small><small>'+stat(i)+'</small><small>Woodcutting '+i.l+': '+i.r.map(x=>x[1]+' '+nm(x[0])).join(', ')+', '+i.g+' coins</small></div><span class="tag">'+ownTag(cnt(i.id))+'</span></button>').join('');
 return skillBar('wood')+stage('s-mine','miss','road','<span data-x="chop" style="display:block">'+icon('sprout',0,'art')+'</span>','pop','<div class="tip">'+t[1]+' tree</div><div class="mbar">'+bar(tree.hp/tree.max)+'</div><div class="tip">Tap the tree to chop it</div>')+'<p class="h">Logs: '+TREES.map(x=>x[1]+' '+inv(x[0])).join(', ')+'</p><div class="ttl">Carpentry: bows, staves and daggers</div><p class="h">Weapons matching your class give +15% damage.</p><div class="col">'+cr+'</div>'};
VIEWS.upg=()=>{let h='<div class="ttl">Class</div><div class="col">'+Object.keys(CLS).map(k=>'<button class="rec'+(S.cls===k?' on':'')+'" data-x="cls" data-i="'+k+'"><div><b>'+CLS[k].n+'</b><small>'+CLS[k].d+'</small></div></button>').join('')+'</div><p class="h">Each upgrade needs 2 stars in the one above it.</p>';
 UPG.forEach(g=>{h+='<div class="ttl">'+g[0]+'</div><div class="tree">'+g[1].map((u,i)=>{const l=S.up[u.k],pv=i?g[1][i-1]:null,lk=pv&&S.up[pv.k]<2;return '<button class="rec'+(lk?' dim':'')+'" data-x="up" data-i="'+u.k+'">'+icon(u.ic,u.col)+'<div><b>'+u.n[Math.min(u.n.length-1,Math.floor(l/2))]+'</b> <span class="stars">'+'★'.repeat(l)+'☆'.repeat(u.max-l)+'</span><small>'+u.d+(lk?' (needs '+pv.n[0]+' ★★)':'')+'</small></div><span class="tag">'+(l>=u.max?'Max':u.cost[l]+' coins')+'</span></button>'}).join('')+'</div>'});return h};
const _m=VIEWS.market;VIEWS.market=()=>{const h=_m(),i=h.indexOf('<div class="ttl">Farming upgrades');return i<0?h:h.slice(0,i)};
$('pane').addEventListener('click',e=>{const b=e.target.closest('[data-x]');if(!b)return;const a=b.dataset.x,i=b.dataset.i;
 if(a==='cls'){S.cls=i;S.hp=Math.min(S.hp,maxHp());SFX.lvl()}
 else if(a==='up'){const g=UPG.find(g=>g[1].some(u=>u.k===i))[1],ix=g.findIndex(u=>u.k===i);if(ix&&S.up[g[ix-1].k]<2){say('Raise the previous upgrade to 2 stars first.');SFX.err()}else buy(i)}
 else if(a==='chop')chop();else if(a==='wc')wcraft(i);
 save();render()});
[['wood','axe','Wood','#b8803f',8],['upg','charm','Upgrades',null,9]].forEach(([k,i,n,c,at])=>{const b=document.createElement('button');b.dataset.k=k;b.innerHTML=icon(i,c)+n;b.addEventListener('click',()=>{S.tab=k;SFX.coin();save();render();window.scrollTo(0,0)});$('tabs').insertBefore(b,$('tabs').children[at])});
setInterval(()=>{if(fight&&S.up.regen&&S.tab==='fight'){S.hp=Math.min(maxHp(),S.hp+.4*S.up.regen);upd()}},1000);
CV('Slime','Frost Slime',[['#58d36a','#9fe8ff']],{hp:34,atk:6,xp:14,c:14,l:5});CV('Slime','Magma Slime',[['#58d36a','#ff7a3a']],{hp:60,atk:10,xp:26,c:26,l:9});
CV('Goblin','Goblin Alchemist',[['#86cf5e','#e0b04a'],['#7cc356','#c9902f']],{hp:46,atk:9,xp:22,c:20,l:7});
CV('Bat','Crimson Bat',[['#7a56b8','#c9303d'],['#4a3478','#7a1a24']],{hp:30,atk:7,xp:12,c:11,l:4});CV('Bat','Void Bat',[['#7a56b8','#2a2a5a'],['#4a3478','#14143a']],{hp:70,atk:12,xp:30,c:28,l:10});
CV('Slime King','Frost Titan',[['#4aa3e8','#d8f6ff']],{b:1,hp:260,atk:14,xp:200,c:260,l:9});CV('Slime King','Magma Colossus',[['#4aa3e8','#ff5a2a']],{b:1,hp:420,atk:20,xp:380,c:480,l:12});
Object.assign(TR,{'Frost Slime':{ab:'slow'},'Magma Slime':{ab:'burn'},'Void Bat':{dodge:.3,ab:'drain'},'Goblin Alchemist':{ab:'burn'},'Frost Titan':{ab:'slow',heavy:1},'Magma Colossus':{ab:'burn',heavy:1,def:12}});
Object.assign(DROPS,{'Frost Slime':[['gel',1,1,3],['agem',.06,1,1]],'Magma Slime':[['gel',1,2,3],['core',.3,1,1],['agem',.08,1,1]],'Goblin Alchemist':[['herb',.6,1,2],['wisp',.3,1,1],['agem',.06,1,1]],'Void Bat':[['wing',.8,1,2],['wisp',.4,1,1],['agem',.1,1,1]],'Frost Titan':[['gel',1,6,9],['core',1,2,2],['agem',.6,1,2]],'Magma Colossus':[['core',1,3,3],['gold',1,4,6],['agem',.8,1,2],['starstone',.25,1,1]]});
DG.push({id:'frost',n:'Frozen Hollow',l:9,mons:['Frost Slime','Wolf','Crimson Bat'],elite:'Dire Wolf',boss:'Alpha Wolf',final:'Frost Titan',dm:1.9,bm:1,ch:320},{id:'magma',n:'Magma Foundry',l:12,mons:['Magma Slime','Goblin Alchemist','Void Bat'],elite:'Flame Imp',boss:'Infernal Duke',final:'Magma Colossus',dm:2.4,bm:1,ch:520});DG.sort((a,b)=>a.l-b.l);
/* ---------- barn v2: feeding, mood, petting ---------- */
const FEEDS=[['hay','Hay',35,0],['clover','Clover',50,10],['corn','Corn',70,5]];
S.bfeed=S.bfeed||'hay';S.bmode=S.bmode||'pet';
const bst=p=>{if(p.f==null){p.f=60;p.m=50}return p};
function feedA(p){const f=FEEDS.find(x=>x[0]===S.bfeed);if(inv(f[0])<1){say('No '+f[1]+'. Grow some in the Farm tab.');SFX.err();return}if(p.f>=98){say('It is full.');return}S.inv[f[0]]--;p.f=Math.min(100,p.f+f[2]);p.m=Math.min(100,p.m+f[3]);say('Fed the '+ANI[p.t].n+' with '+f[1]+'.');SFX.eat()}
function petA(p){const n=Date.now();if(n-(p.pc||0)<2500){say('Let it rest a moment.');return}p.pc=n;p.m=Math.min(100,p.m+6);if(p.f>0)p.at-=1500;say('You pet the '+ANI[p.t].n+(p.f>0?'. It works a little faster.':'. It looks hungry.'));SFX.water()}
tapStall=function(i){if(i>=cap()){say('Buy an Extra Stall in the Upgrades tab to unlock this one.');SFX.err();return}const p=S.barn[i];
 if(!p){const a=ANI[S.asel];if(S.coins<a.cost){say('A '+a.n+' costs '+a.cost+' coins.');SFX.err()}else{S.coins-=a.cost;S.barn[i]={t:S.asel,at:Date.now(),d:aDur(a),f:60,m:50};SFX.coin()}}
 else if(aProg(bst(p))>=1){const a=ANI[p.t],q=Math.random()<.004*L('barn')+.06*S.up.brush+(p.m>=60?.1:0)?2:1;let s='Collected';a.give.forEach(id=>{S.inv[id]=inv(id)+q;s+=' '+q+' '+nm(id)});if(a.extra&&Math.random()<a.extra[1]){S.inv[a.extra[0]]=inv(a.extra[0])+1;s+=' and a '+nm(a.extra[0])}if(Math.random()<Math.min(1,.5+.08*S.up.bin)){S.inv.manure=inv('manure')+q;s+=' and '+q+' manure'}if(q>1)toast('Double harvest!'+(p.m>=60?' (happy animal)':''),'bonus');addXp('barn',3+ANI.indexOf(a)*2);say(s+'.');SFX.harvest();p.at=Date.now();p.d=aDur(a);p.m=Math.max(0,p.m-10)}
 else if(S.bmode==='feed')feedA(bst(p));else petA(bst(p));
 save();render()};
setInterval(()=>{S.barn.forEach(p=>{if(!p)return;bst(p);if(aProg(p)>=1)return;if(p.f>0)p.f=Math.max(0,p.f-.5);else{p.at+=1000;p.m=Math.max(0,p.m-.4)}})},1000);
const _st=stall;stall=function(x,k,lab,show,ripe,g){const i=bEls.indexOf(x),p=i>=0&&k.startsWith('A:')?S.barn[i]:null;if(p){bst(p);lab+=p.f<=0&&!ripe?' Hungry':' '+'♥'.repeat(1+Math.floor(p.m/34))}_st(x,k,lab,show,ripe,g)};
function drawBx(){const b=$('bx');if(!b)return;b.innerHTML='<div class="btns"><button class="btn '+(S.bmode==='pet'?'':'alt')+'" data-x="bmode" data-i="pet">Pet</button><button class="btn '+(S.bmode==='feed'?'':'alt')+'" data-x="bmode" data-i="feed">Feed</button></div>'+(S.bmode==='feed'?'<div class="col">'+FEEDS.map(f=>'<button class="rec'+(S.bfeed===f[0]?' on':'')+'" data-x="bfeed" data-i="'+f[0]+'"><div><b>'+f[1]+' ×'+inv(f[0])+'</b><small>Food +'+f[2]+(f[3]?', mood +'+f[3]:'')+'</small></div></button>').join('')+'</div>':'')+'<p class="h">Pick an animal and tap a stall to buy it. Hungry animals stop working. Petting makes them faster and happier, and happy animals (♥♥♥) double their harvest more often. Grow Hay, Clover and Corn in the Farm tab.</p>'}
const _r=render;render=function(){_r();if(S.tab==='barn')drawBx()};
$('barn').addEventListener('click',e=>{const b=e.target.closest('[data-x]');if(!b)return;if(b.dataset.x==='bmode')S.bmode=b.dataset.i;else if(b.dataset.x==='bfeed')S.bfeed=b.dataset.i;else return;save();render()});
/* ---------- arcana, tailoring, leatherworking ---------- */
const RM={arcane:[['mana','Mana Dust',1,5,[['gel',3],['herb',1]],2],['rune','Rune Shard',3,15,[['mana',3],['bone',2]],1],['essence','Arcane Essence',6,40,[['mana',4],['agem',1]],1]],tailor:[['thread','Thread',1,3,[['wool',2]],2],['cloth','Cloth',2,8,[['thread',3],['feather',1]],1],['silkcloth','Silk Cloth',5,20,[['silk',4],['thread',2]],1]],leather:[['leather','Leather',1,3,[['hide',2]],1],['cured','Cured Leather',4,12,[['leather',2],['herb',1]],1]]};
IT.push(...[['k_wand','Mana Wand','rapier',7,14,.7,10,4,60,[['rune',3],['oak',2]]],['k_scepter','Arcane Scepter','rapier',9,30,.8,12,9,200,[['essence',3],['elder',4]]],['k_storm','Stormcaller','rapier',3,52,.75,15,14,500,[['essence',6],['starstone',1]]]].map(a=>({...W(...a),x:'arcane',k:'mage'})));
IT.push(...[['t_robe','Linen Robe','tunic',7,3,6,8,2,30,[['cloth',3]],0,'tailor'],['t_silk','Silk Robe','tunic',7,6,16,14,6,120,[['silkcloth',4]],0,'tailor'],['t_arch','Archmage Vestments','tunic',9,10,30,22,11,400,[['silkcloth',6],['essence',2]],4,'tailor'],['l_vest','Leather Vest','tunic',1,5,0,12,2,40,[['leather',4]],0,'leather'],['l_stud','Studded Jerkin','mail',1,9,0,20,6,140,[['cured',4],['iron',3]],0,'leather'],['l_cloak','Wolfhide Cloak','tunic',7,14,0,30,11,420,[['cured',6],['fur',6]],3,'leather']].map(a=>({...A(...a.slice(0,11)),x:a[11]})));
const SKT={arcane:'Arcana',tailor:'Tailoring',leather:'Leatherworking'},NOTE={arcane:'Refine mana dust, runes and essence, then craft spell kits for Mages and Healers (+15% damage with a class match).',tailor:'Spin thread, weave cloth and sew robes with big shields.',leather:'Tan hides into leather, cure it, then make sturdy armor with lots of HP.'};
VIEWS.arcane=VIEWS.tailor=VIEWS.leather=null;
['arcane','tailor','leather'].forEach(k=>VIEWS[k]=()=>{const rq=(r,g,l)=>SKT[k]+' '+l+': '+reqText(r)+', '+coinText(g);
 return skillBar(k)+'<p class="h">'+NOTE[k]+'</p><div class="ttl">Materials</div><div class="col">'+RM[k].map(r=>'<button class="rec'+(L(k)>=r[2]?'':' dim')+'" data-x="rc" data-i="'+k+':'+r[0]+'">'+gIcon(r[0])+'<div><b>'+r[1]+' ×'+inv(r[0])+'</b><small>'+rq(r[4],r[3],r[2])+' → '+r[5]+'</small></div></button>').join('')+'</div><div class="ttl">Gear</div><div class="col">'+IT.filter(i=>i.x===k).map(i=>'<button class="rec'+(L(k)>=i.l?'':' dim')+'" data-x="rc" data-i="'+k+':'+i.id+'">'+iIcon(i)+'<div><b>'+i.n+'</b><small>'+stat(i)+'</small><small>'+rq(i.r,i.g,i.l)+'</small></div><span class="tag">'+ownTag(cnt(i.id))+'</span></button>').join('')+'</div>'});
function rcraft(k,id){const m=RM[k].find(r=>r[0]===id),it=m?null:IT.find(x=>x.id===id),l=m?m[2]:it.l,g=m?m[3]:it.g,r=m?m[4]:it.r;
 if(L(k)<l||S.coins<g||!r.every(x=>inv(x[0])>=x[1])){say(missMsg(SKT[k],k,l,r,g));SFX.err();return}
 r.forEach(x=>S.inv[x[0]]-=x[1]);S.coins-=g;if(m)S.inv[id]=inv(id)+m[5];else S.items[id]=cnt(id)+1;addXp(k,6+l*3);say('Made '+(m?m[5]+' '+m[1]:it.n)+'.');SFX.forge();toast('Made <b>'+(m?m[1]:it.n)+'</b>','reward')}
$('pane').addEventListener('click',e=>{const b=e.target.closest('[data-x="rc"]');if(!b)return;const [k,id]=b.dataset.i.split(':');rcraft(k,id);save();render()});
[['arcane','core','Arcana','#b36bff'],['tailor','wool','Tailor',null],['leather','hide','Leather',null]].forEach(([k,i,n,c],j)=>{const b=document.createElement('button');b.dataset.k=k;b.innerHTML=icon(i,c)+n;b.addEventListener('click',()=>{S.tab=k;SFX.coin();save();render();window.scrollTo(0,0)});$('tabs').insertBefore(b,$('tabs').children[9+j])});
/* ---------- interactive mining: zones, floors, blasting ---------- */
const ZN=[['Quarry',1,'coal','#8a8070'],['Deep Mine',5,'coal','#5a5a72'],['Crystal Cavern',9,'crystal','#44509a'],['Magma Depths',13,'obsidian','#8a3a2a']];
S.mz=S.mz||0;S.mf=S.mf||1;S.mmode=S.mmode||'pick';let mgrid=null;
const zOk=i=>L('mine')>=ZN[i][1];
function newGrid(){const z=ZN[S.mz],pool=[0,1,2,3,4].filter(i=>L('mine')>=ORE_L[i]&&i>=S.mz-1&&i<=S.mz+1+Math.floor(S.mf/4));
 mgrid=Array.from({length:20},()=>{const r=Math.random();let c='stone';if(r<.36){const o=pool[Math.floor(Math.pow(Math.random(),1.3)*pool.length)];c='ore'+(o==null?0:o)}else if(r<.5)c=z[2];else if(r<.54)c='gem';
  const hp=Math.max(1,Math.round((2+S.mz*2+Math.floor(S.mf/3))*(c.startsWith('ore')?1.5:c==='gem'?2:1)*(1-.08*S.up.gloves)));return{c,hp,max:hp}})}
function collect(t){let id=null,q=1+(Math.random()<.004*L('mine')+.06*S.up.lantern?1:0),xp=2;
 if(t.c.startsWith('ore')){const k=+t.c.slice(3);id=ORES[k].id;xp=[3,7,11,16,26][k]}else if(t.c==='gem'){id='agem';q=1;xp=20}else if(t.c!=='stone'){id=t.c;xp=5}
 if(id){S.inv[id]=inv(id)+q;fx('+'+q+' '+nm(id),'info','foe',false,rar(id)[1]);if(q>1)toast('Bonus ore! +1 '+nm(id),'bonus')}
 addXp('mine',xp);SFX.brk();gemRoll()}
const MG_C=5,MG_N=20;
const caveKey=i=>(ZN[i]&&ZN[i][4])||('c'+i);
function mineSync(){if(mgrid&&ZN[S.mz]){S.mines=S.mines||{};S.mines[caveKey(S.mz)]={f:S.mf,g:mgrid}}}
function mineFloorDone(){
  if(fight||!mgrid||!mgrid.every(x=>x.hp<=0))return false;
  const tier=(ZN[S.mz]&&ZN[S.mz][5])||0,c=earn(Math.round(1.75*(15*S.mf+10*tier)),'mine');
  S.coins+=c;toast('Floor '+S.mf+' cleared! +'+c+' coins','reward');S.mf++;newGrid();mineSync();return true}
function mineLoad(){
  const m=(S.mines||{})[caveKey(S.mz)];
  if(m&&Array.isArray(m.g)&&m.g.length===MG_N){S.mf=m.f||1;mgrid=m.g;mineFloorDone()}
  else{const first=!S.mines||!Object.keys(S.mines).length;S.mf=(m&&m.f)||(first?(S.mf||1):1);newGrid()}
  mineSync()}
function mineSelect(i){if(i===S.mz&&mgrid)return;mineSync();S.mz=i;S.mzId=caveKey(i);mgrid=null;mineLoad()}
function mineEnsure(){if(!mgrid)mineLoad();else mineFloorDone()}
function tapTile(i){const t=mgrid[i];if(!t||t.hp<=0)return;
 if(S.mmode==='blast'){if(inv('coal')<1){say('Blasting needs 1 Coal. Break coal tiles first.');SFX.err();return}S.inv.coal--;
  const x=i%MG_C;[i,i-MG_C,i+MG_C,...(x?[i-1]:[]),...(x<MG_C-1?[i+1]:[])].forEach(j=>{const u=mgrid[j];if(u&&u.hp>0){u.hp-=6;if(u.hp<=0)collect(u)}});SFX.boss()}
 else{t.hp-=item('p').pw;SFX.mine();if(t.hp<=0)collect(t)}
 if(window.__mineDig)window.__mineDig();
 mineFloorDone();mineSync()}
VIEWS.mine=()=>{mineEnsure();const z=ZN[S.mz];
 const tiles=mgrid.map((t,i)=>{const st='aspect-ratio:1;border-radius:10px;border:2px solid #241a35;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:0;';if(t.hp<=0)return'<div style="'+st+'background:#2a2a30;opacity:.4"></div>';
  const id=t.c.startsWith('ore')?ORES[+t.c.slice(3)].id:t.c==='stone'?null:t.c==='gem'?'agem':t.c;
  return'<button data-x="mt" data-i="'+i+'" style="'+st+'background:#5a5a66;cursor:pointer">'+(id?gIcon(id,'ic'):'')+'<div style="width:70%;height:4px;background:#0006;border-radius:3px;margin-top:2px"><div style="height:4px;width:'+Math.max(0,t.hp/t.max*100)+'%;background:#ffd84d;border-radius:3px"></div></div></button>'}).join('');
 return skillBar('mine')+'<div class="btns">'+ZN.map((q,i)=>'<button class="btn '+(i===S.mz?'':'alt')+'" data-x="mz" data-i="'+i+'"'+(zOk(i)?'':' disabled')+'>'+(zOk(i)?q[0]:'Lv '+q[1])+'</button>').join('')+'</div><div class="ttl">'+z[0]+', floor '+S.mf+'</div><div style="display:grid;grid-template-columns:repeat(5,1fr);gap:6px;background:'+z[3]+';padding:8px;border-radius:14px;border:3px solid #241a35">'+tiles+'</div><div class="btns"><button class="btn '+(S.mmode==='pick'?'':'alt')+'" data-x="mm" data-i="pick">Pick</button><button class="btn '+(S.mmode==='blast'?'':'alt')+'" data-x="mm" data-i="blast">Blast (1 Coal) x'+inv('coal')+'</button></div><p class="h">Tap tiles to break them. Ores, coal, crystals and gems show on the tiles. Blast breaks a tile and its neighbors. Clear the whole floor to go deeper: ores get richer, but beware of ambushes. Deeper zones unlock with Mining level.</p>'};
$('pane').addEventListener('click',e=>{const b=e.target.closest('[data-x]');if(!b)return;const a=b.dataset.x,i=b.dataset.i;
 if(a==='mz'){if(zOk(+i))mineSelect(+i)}else if(a==='mm')S.mmode=i;else if(a==='mt')tapTile(+i);else return;save();render()});
/* ---------- progress tab and milestones ---------- */
const _ax2=addXp;addXp=function(k,n){const o=L(k);_ax2(k,n);const l=L(k);S.ms=S.ms||{};for(let m=o+1;m<=l;m++)if(m%5===0&&!S.ms[k+m]){S.ms[k+m]=1;S.coins+=m*20;toast('Milestone! <b>'+SKN[k]+' '+m+'</b> +'+m*20+' coins','reward')}};
const TIT=['Novice','Apprentice','Journeyman','Expert','Master','Grandmaster'];
VIEWS.prog=()=>'<div class="card2"><b>Total level '+SK.reduce((a,k)=>a+L(k),0)+'</b><span>'+S.kills+' wins, '+Object.values(S.clears).reduce((a,b)=>a+b,0)+' dungeons cleared</span></div>'+SK.map(k=>{const l=L(k),nx=(Math.floor(l/5)+1)*5;return skillBar(k)+'<p class="h">'+TIT[Math.min(5,Math.floor(l/5))]+'. Next milestone at level '+nx+': +'+nx*20+' coins</p>'}).join('');
{const b=document.createElement('button');b.dataset.k='prog';b.innerHTML=icon('ring')+'Progress';b.addEventListener('click',()=>{S.tab='prog';SFX.coin();save();render();window.scrollTo(0,0)});$('tabs').appendChild(b)}
RM.arcane.push(['focus','Crystal Focus',8,60,[['crystal',3],['mana',3]],1]);
/* ---------- more monsters and dungeons ---------- */
const HUE=(b,n,d,o)=>{CV(b,n,[],o);const f=FOES[FOES.length-1];f.a='<g style="filter:hue-rotate('+d+'deg)">'+f.a+'</g>'};
HUE('Skeleton','Drowned Bones',160,{hp:90,atk:15,xp:40,c:36,l:11});HUE('Wolf','Frost Wolf',180,{hp:80,atk:14,xp:34,c:30,l:10});HUE('Ghost','Banshee',280,{hp:85,atk:16,xp:42,c:38,l:12});
HUE('Orc','Orc Shaman',90,{hp:120,atk:18,xp:50,c:44,l:13});HUE('Golem','Sand Golem',40,{hp:180,atk:20,xp:70,c:60,l:15});HUE('Troll','Cave Troll',200,{hp:200,atk:22,xp:80,c:66,l:16});HUE('Imp','Shadow Imp',250,{hp:110,atk:24,xp:75,c:60,l:17});
HUE('Orc Warlord','Sea Warlord',170,{b:1,hp:420,atk:26,xp:300,c:420,l:12});HUE('Dragon','Frost Wyrm',190,{b:1,hp:900,atk:36,xp:700,c:900,l:20});HUE('Lich','Void Lich',260,{b:1,hp:1100,atk:42,xp:900,c:1200,l:23});
Object.assign(TR,{'Drowned Bones':{def:6},'Frost Wolf':{ab:'slow'},'Banshee':{dodge:.3,ab:'drain'},'Orc Shaman':{ab:'burn',heavy:1},'Sand Golem':{def:16,heavy:1},'Cave Troll':{reg:.01,heavy:1},'Shadow Imp':{dodge:.2,ab:'burn'},'Sea Warlord':{def:10,heavy:1},'Frost Wyrm':{ab:'slow',heavy:1,def:12},'Void Lich':{ab:'drain',heavy:1,dodge:.1}});
Object.assign(DROPS,{'Drowned Bones':[['bone',.9,2,3],['crystal',.2,1,1]],'Frost Wolf':[['fur',.8,1,3],['crystal',.2,1,1]],'Banshee':[['wisp',.8,1,2],['rune',.15,1,1]],'Orc Shaman':[['horn',.5,1,2],['rune',.2,1,1],['coal',.5,1,3]],'Sand Golem':[['iron',.6,2,3],['obsidian',.3,1,1]],'Cave Troll':[['hide',.8,2,3],['crystal',.3,1,2]],'Shadow Imp':[['wisp',.5,1,2],['obsidian',.3,1,2],['agem',.1,1,1]],'Sea Warlord':[['crystal',1,2,3],['mithril',.5,1,2],['agem',.5,1,1]],'Frost Wyrm':[['scale',1,6,9],['crystal',1,4,5],['agem',.8,1,2],['starstone',.3,1,1]],'Void Lich':[['wisp',1,6,8],['obsidian',1,3,4],['essence',1,1,2],['agem',1,1,2],['starstone',.4,1,1]]});
DG.push({id:'ruins',n:'Sunken Ruins',l:13,mons:['Drowned Bones','Banshee','Frost Wolf'],elite:'Orc Shaman',boss:'Sea Warlord',final:'Frost Wyrm',dm:2.8,bm:1,ch:700},{id:'tomb',n:'Sandstone Tomb',l:16,mons:['Sand Golem','Drowned Bones','Banshee'],elite:'Cave Troll',boss:'Bone Lord',final:'Void Lich',dm:3.2,bm:1,ch:900},{id:'abyss',n:'Obsidian Abyss',l:24,mons:['Shadow Imp','Cave Troll','Orc Shaman'],elite:'Obsidian Golem',boss:'Infernal Duke',final:'Titan Colossus',dm:4,bm:1,ch:1500});DG.sort((a,b)=>a.l-b.l);
/* ---------- smithing: smelter and deeper tiers ---------- */
const RB=[['cbar',1,2,[['copper',2]]],['ibar',3,5,[['iron',2],['coal',1]]],['sbar',6,10,[['silver',2],['coal',1]]],['gbar',7,20,[['gold',2],['coal',2]]],['mbar',10,40,[['mithril',2],['coal',2]]],['steel',12,60,[['ibar',2],['coal',3]]],['obsal',15,90,[['obsidian',3],['mbar',1]]],['starsteel',19,200,[['starstone',1],['mbar',2],['essence',1]]]].map(r=>[r[0],0,r[1],r[2],r[3]]);
IT.push(W('w_steel','Steel Sword','sword',2,30,.8,22,12,500,[['steel',6]]),A('a_steel','Steel Plate','plate',2,34,66,44,12,600,[['steel',10],['hide',4]]),K('p_steel','Steel Pick',2,4,12,300,[['steel',5]]),
 W('w_obs','Obsidian Cleaver','great',10,48,.85,26,15,900,[['obsal',6],['coal',6]]),A('a_obs','Obsidian Armor','plate',10,42,84,56,15,1200,[['obsal',10],['hide',5]]),K('p_obs','Obsidian Pick',10,4.5,15,800,[['obsal',5]]),
 W('w_star','Starsteel Edge','katana',3,68,.7,30,19,2200,[['starsteel',6],['scale',4]]),A('a_star','Starsteel Aegis','plate',3,54,110,80,19,2600,[['starsteel',10],['scale',6]]),K('p_star','Starsteel Pick',3,5,19,1500,[['starsteel',6]]));
const craftSec=lv=>Math.min(120,Math.round(10*Math.pow(1.18,(lv||1)-1)));
const smV=()=>skillBar('smith')+'<div class="btns">'+[['bar','Smelter'],['w','Weapons'],['a','Armor'],['p','Tools']].map(c=>'<button class="btn '+(c[0]===forgeCat?'':'alt')+'" data-a="cat" data-i="'+c[0]+'">'+c[1]+'</button>').join('')+'</div><p class="h">Smelt ore into bars using coal from the Mine. All weapons, armor and tools are forged from bars (1 bar = 2 ore).</p><div class="col">'+RB.map(r=>'<div class="smelt-row"><button class="rec'+(L('smith')>=r[2]?'':' dim')+'" data-x="sm" data-i="'+r[0]+'">'+gIcon(r[0])+'<div><b>'+nm(r[0])+' ×'+inv(r[0])+'</b><small>Smithing '+r[2]+': '+reqText(r[4])+', '+coinText(r[3])+'</small></div></button><button class="btn alt" data-x="sm" data-n="5" data-i="'+r[0]+'">×5</button></div>').join('')+'</div>';
const _sm=VIEWS.smith;VIEWS.smith=()=>forgeCat==='bar'?smV():_sm();
$('pane').addEventListener('click',e=>{const b=e.target.closest('[data-x="sm"]');if(!b)return;const r=RB.find(x=>x[0]===b.dataset.i),n=+(b.dataset.n||1);let done=0;
 const wait=Math.ceil(((S.smeltCd||0)-Date.now())/1000);
 if(wait>0){say('The forge is still hot — '+wait+'s left before the next bar.');SFX.err();return}
 for(let k=0;k<n;k++){
  if(L('smith')<r[2]||S.coins<r[3]||!r[4].every(x=>inv(x[0])>=x[1])){if(!done){say(missMsg('Smithing','smith',r[2],r[4],r[3]));SFX.err()}break}
  r[4].forEach(x=>S.inv[x[0]]-=x[1]);S.coins-=r[3];S.inv[r[0]]=inv(r[0])+1;addXp('smith',4+r[2]*2);done++}
 if(done){SFX.forge();S.smeltCd=Date.now()+craftSec(r[2])*1000;say('Smelted '+done+' '+nm(r[0])+'. Next bar in '+craftSec(r[2])+'s.')}save();render()});
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


/* ---------- Tiny Acre: Chronicle RPG expansion ---------- */
const CH_REGIONS=[
 {id:'meadow',n:'Sunmeadow Fields',sub:'The old road beyond your farm',l:1,foes:['Slime','Rat','Bat'],boss:'Meadow Guardian',col:'#83b96b',desc:'A gentle valley where the first signs of blight appeared.'},
 {id:'woods',n:'Whispering Woods',sub:'Ancient trees and hungry shadows',l:3,foes:['Goblin','Spider','Wolf','Ghost'],boss:'Thornfang Alpha',col:'#527d59',desc:'The trees whisper of a thorn-crowned beast guarding a lost shrine.'},
 {id:'ember',n:'Emberdeep Caverns',sub:'Ore veins beneath a sleeping volcano',l:7,foes:['Skeleton','Orc','Golem','Imp'],boss:'The Cinder Wyrm',col:'#b85b3c',desc:'A hot, echoing mine where something old stirs under the stone.'},
 {id:'frost',n:'Frostfall Ruins',sub:'A forgotten kingdom under blue ice',l:11,foes:['Ghost','Golem','Troll','Imp'],boss:'The Hollow Crown',col:'#779dc7',desc:'The final trail leads to a ruined throne and the source of the blight.'}
];
const CH_BOSSES=[
 {n:'Meadow Guardian',base:'Slime King',l:1,hp:1.5,atk:1.25,xp:36,c:55,desc:'A once-peaceful spirit twisted by the creeping blight.'},
 {n:'Thornfang Alpha',base:'Orc Warlord',l:3,hp:1.45,atk:1.25,xp:110,c:160,desc:'An ancient wolf-spirit wrapped in thorny roots.'},
 {n:'The Cinder Wyrm',base:'Dragon',l:7,hp:1.2,atk:1.15,xp:280,c:420,desc:'A volcanic dragon whose scales glow like a forge.'},
 {n:'The Hollow Crown',base:'Lich',l:11,hp:1.15,atk:1.1,xp:650,c:1100,desc:'The lost monarch that feeds the blight spreading across Tiny Acre.'}
];
// New hand-drawn SVG foes keep the original ink-outline/cel-shaded look.
const CH_ART={
 'Brambleling':'<g stroke="#241a35" stroke-width="3" stroke-linejoin="round"><path d="M18 70Q4 42 25 30L18 12 40 25Q52 8 62 25L83 12 76 38Q96 55 80 78L68 91 50 82 31 93Z" fill="#6c9b4c"/><path d="M24 58L42 63 36 70M76 58L58 63 64 70" fill="none"/><ellipse cx="39" cy="50" rx="5" ry="7" fill="#ffcf55"/><ellipse cx="61" cy="50" rx="5" ry="7" fill="#ffcf55"/><path d="M39 72Q50 79 61 72" fill="none"/></g>',
 'Cinder Wisp':'<g stroke="#241a35" stroke-width="3" stroke-linejoin="round"><path d="M50 8Q75 28 68 48Q88 69 62 88L51 77 38 94Q14 76 33 53Q17 29 50 8Z" fill="#ef7748"/><path d="M50 23Q65 42 49 58Q40 69 53 78Q27 70 43 50Q53 39 50 23Z" fill="#ffd56a" stroke="none"/><ellipse cx="42" cy="49" rx="4" ry="6" fill="#fff4bd"/><ellipse cx="59" cy="49" rx="4" ry="6" fill="#fff4bd"/></g>',
 'Frostling':'<g stroke="#241a35" stroke-width="3" stroke-linejoin="round"><path d="M50 9L61 28 81 20 72 41 91 54 69 62 73 85 51 74 31 91 31 68 9 60 28 45 18 25 39 31Z" fill="#8bd9f5"/><circle cx="41" cy="49" r="5" fill="#fff"/><circle cx="60" cy="49" r="5" fill="#fff"/><path d="M42 65h17" stroke="#4d8eb8"/></g>'
};
function chSvg(name){return '<svg class="art" viewBox="0 0 100 100" aria-label="'+name+'">'+(CH_ART[name]||CH_ART.Brambleling)+'</svg>'}
// Add original enemies to the existing encounter and loot systems.
FOES.push(
 {n:'Brambleling',hp:25,atk:5,xp:12,c:12,l:3,sp:2.2,a:CH_ART.Brambleling},
 {n:'Cinder Wisp',hp:88,atk:15,xp:48,c:58,l:7,sp:2.0,a:CH_ART['Cinder Wisp']},
 {n:'Frostling',hp:145,atk:21,xp:82,c:96,l:11,sp:1.8,a:CH_ART.Frostling},
 {n:'Meadow Guardian',b:1,hp:85,atk:9,xp:36,c:55,l:1,sp:2.3,a:CH_ART.Brambleling},
 {n:'Thornfang Alpha',b:1,hp:245,atk:18,xp:110,c:160,l:3,sp:2.1,a:CH_ART.Brambleling},
 {n:'The Cinder Wyrm',b:1,hp:480,atk:28,xp:280,c:420,l:7,sp:1.9,a:CH_ART['Cinder Wisp']},
 {n:'The Hollow Crown',b:1,hp:850,atk:38,xp:650,c:1100,l:11,sp:1.7,a:CH_ART.Frostling}
);
DROPS['Brambleling']=[['herb',.55,1,2],['hide',.25,1,1]];
DROPS['Cinder Wisp']=[['wisp',.7,1,2],['core',.2,1,1]];
DROPS['Frostling']=[['wisp',.5,1,2],['mithril',.22,1,1]];
DROPS['Meadow Guardian']=[['gel',1,4,8],['herb',1,3,5],['core',.5,1,1]];
DROPS['Thornfang Alpha']=[['fur',1,3,6],['horn',1,2,4],['core',.8,1,2]];
DROPS['The Cinder Wyrm']=[['scale',1,3,6],['core',1,2,4],['mithril',.8,2,4]];
DROPS['The Hollow Crown']=[['core',1,5,8],['scale',1,4,7],['starstone',.5,1,2]];
const CH_QUESTS=[
 {id:'first_steps',n:'A Road Beyond Home',d:'Defeat 3 creatures on your travels.',goal:3,key:'kills',reward:35,xp:15,story:'The road is no longer safe. Someone must discover what is poisoning the valley.'},
 {id:'field_warden',n:'The Field Warden',d:'Defeat the Meadow Guardian.',goal:1,key:'bosses',target:'Meadow Guardian',region:'meadow',reward:70,xp:35,story:'The guardian remembers a green light beneath the old shrine.'},
 {id:'wildwood',n:'Whispers in the Woods',d:'Defeat 8 creatures in the wilds.',goal:8,key:'kills',region:'woods',reward:95,xp:50,story:'The blight is spreading along roots that lead toward the mountains.'},
 {id:'thornfang',n:'The Thorn-Crowned Beast',d:'Defeat Thornfang Alpha.',goal:1,key:'bosses',target:'Thornfang Alpha',region:'woods',reward:150,xp:75,story:'A broken seal points to the ember caverns.'},
 {id:'embers',n:'Heart of the Mountain',d:'Defeat 15 creatures on your travels.',goal:15,key:'kills',region:'ember',reward:210,xp:100,story:'The forge-heart was stolen and carried north into the frozen ruins.'},
 {id:'wyrm',n:'Ashes to Ashes',d:'Defeat The Cinder Wyrm.',goal:1,key:'bosses',target:'The Cinder Wyrm',region:'ember',reward:350,xp:160,story:'The last seal is held by the Hollow Crown.'},
 {id:'crown',n:'Acre Restored',d:'Defeat The Hollow Crown.',goal:1,key:'bosses',target:'The Hollow Crown',region:'frost',reward:700,xp:300,story:'The blight fades. Your farm can grow in peace again.'},
 {id:'harvest',n:'A Farmer’s Promise',d:'Harvest 10 crops from your farm.',goal:10,key:'harvests',reward:45,xp:20,story:'A healthy harvest can sustain the journey ahead.'}
];
const chStory=()=>S.story||(S.story={kills:0,bosses:0,harvests:0,quests:{},points:0,skills:{power:0,ward:0,focus:0,fortune:0},relics:[]});
function chQuestValue(q){return q.key==='kills'?chStory().kills:q.key==='bosses'?(chStory().bossesByName?.[q.target]||0):chStory().harvests}
function chQuestState(q){return chStory().quests[q.id]||'open'}
function chUnlocked(r){return L('combat')>=r.l}
function chooseRegion(id){const r=CH_REGIONS.find(x=>x.id===id);if(!r)return false;if(!chUnlocked(r)){say('Reach combat level '+r.l+' to unlock '+r.n+'.');SFX.err();return false}S.region=id;say('Travel destination set: '+r.n+'.');SFX.coin();return true}
function chGrant(q){chStory().quests[q.id]='claimed';S.coins+=q.reward;addXp('combat',q.xp);chStory().points+=1;S.hp=maxHp();S.sh=maxSh();toast('Quest complete: <b>'+q.n+'</b><br>+'+q.reward+' coins · +1 skill point','reward');SFX.boss();save()}
function claimQuest(id){const q=CH_QUESTS.find(x=>x.id===id);if(!q||chQuestState(q)!=='ready')return false;chGrant(q);say('Quest reward claimed: '+q.n);return true}
function buyTalent(id){const st=chStory(),caps={power:5,ward:5,focus:5,fortune:5};if(!(id in caps)||st.points<1||st.skills[id]>=caps[id]){say(st.points<1?'Earn skill points by completing story quests.':'That talent is already maxed.');SFX.err();return false}st.points--;st.skills[id]++;say('Talent improved: '+({power:'Might',ward:'Warden',focus:'Focus',fortune:'Fortune'})[id]+' '+st.skills[id]+'/5');SFX.lvl();return true}
function challengeBoss(id){const b=CH_BOSSES.find(x=>x.n===id);if(!b)return false;const r=CH_REGIONS.find(x=>x.id===S.region);if(!r||L('combat')<b.l){say('You are not ready for this challenge.');SFX.err();return false}if(fight){say('Finish your current fight first.');return false}const base=FOES.find(x=>x.n===b.n);if(!base)return false;const k=1+.08*Math.max(0,L('combat')-b.l);startFight(mkFoe(b.n,k,'b',b.hp));fight.hp=Math.round(fight.hp);fight.max=fight.hp;fight.atk=Math.round(base.atk*b.atk*k);fight.xp=b.xp;fight.c=b.c;fight.sp=Math.max(1.3,base.sp||2);fight.heavy=true;S.tab='fight';say(b.n+' challenges you!');SFX.boss();return true}
const _chExplore=explore;
explore=function(){const r=CH_REGIONS.find(x=>x.id===S.region)||CH_REGIONS[0];if(!chUnlocked(r)){S.region='meadow';return _chExplore()}const roll=Math.random();if(roll<.12){const c=earn(rnd(10,22)+L('combat')*7,'combat');S.coins+=c;addXp('combat',3);say('You found a travel cache: '+c+' coins.');SFX.coin();return}if(roll<.19){S.hp=maxHp();S.sh=maxSh();say('You find a safe camp and recover.');SFX.eat();return}const pool=FOES.filter(f=>!f.b&&r.foes.includes(f.n)&&f.l<=L('combat')+1);const f=pool[Math.floor(Math.random()*pool.length)]||FOES.find(x=>x.n==='Slime');const scale=1+Math.max(0,L('combat')-f.l)*.07;startFight(mkFoe(f.n,scale,'f'));say(r.n+': a '+f.n+' blocks your path!');SFX.bite()};
const _chFoeDown=foeDown;
foeDown=function(){const f=fight;const wasBoss=!!(f&&f.b);const name=f&&f.n;const result=_chFoeDown();if(f){const st=chStory();st.kills++;if(wasBoss){st.bosses++;st.bossesByName=st.bossesByName||{};st.bossesByName[name]=(st.bossesByName[name]||0)+1;const b=CH_BOSSES.find(x=>x.n===name);if(b&&!st.relics.includes(name)){st.relics.push(name);st.points++;toast('Relic awakened: <b>'+name+'</b> · +1 skill point','reward')}}CH_QUESTS.forEach(q=>{if(chQuestState(q)==='open'&&chQuestValue(q)>=q.goal){st.quests[q.id]='ready';toast('Quest ready: <b>'+q.n+'</b>','reward')}});save()}return result};
const _chTapPlot=tapPlot;
tapPlot=function(i){const p=S.plots[i];const ready=p&&p.open&&p.c>=0&&prog(p)>=1;const before=chStory().harvests;const result=_chTapPlot(i);if(ready&&chStory().harvests===before){chStory().harvests++;CH_QUESTS.forEach(q=>{if(chQuestState(q)==='open'&&chQuestValue(q)>=q.goal){chStory().quests[q.id]='ready';toast('Quest ready: <b>'+q.n+'</b>','reward')}})}return result};
// A small, balanced talent layer supplements existing gear/levels without replacing them.
// Talent bonuses are integrated into the original stat formulas above to preserve their const bindings.
Object.assign(VIEWS,{
 chronicle(){
  const st=chStory(),reg=CH_REGIONS.find(r=>r.id===S.region)||CH_REGIONS[0];
  const active=CH_QUESTS.filter(q=>chQuestState(q)!=='claimed');
  const quests=active.map(q=>{const v=Math.min(q.goal,chQuestValue(q)),state=chQuestState(q),pct=v/q.goal;return '<div class="ch-quest '+(state==='claimed'?'done':'')+'"><div class="qhead">'+icon(q.key==='harvests'?'wheat':q.key==='bosses'?'crown':'sword')+'<div style="flex:1"><b>'+q.n+'</b><small>'+q.d+'</small></div><b>'+v+'/'+q.goal+'</b></div><div class="ch-progress"><i style="width:'+(pct*100)+'%"></i></div><small>'+(state==='ready'?q.story:'Reward: '+q.reward+' coins · '+q.xp+' Combat XP'+(q.region?' · '+(CH_REGIONS.find(r=>r.id===q.region)||{}).n:''))+'</small>'+(state==='ready'?'<button class="btn full" data-a="quest" data-i="'+q.id+'">Claim reward · +1 skill point</button>':'')+'</div>'}).join('');
  const regions=CH_REGIONS.map(r=>'<button class="ch-region '+(S.region===r.id?'on':'')+(!chUnlocked(r)?' lock':'')+'" data-a="region" data-i="'+r.id+'">'+icon(r.id==='meadow'?'sprout':r.id==='woods'?'tree':r.id==='ember'?'flame':'snowflake',r.col)+'<span><b>'+r.n+'</b><small>'+r.sub+'</small><small>'+(chUnlocked(r)?'Unlocked · Combat level '+r.l:'Locked · Requires combat level '+r.l)+'</small></span>'+(S.region===r.id?'✓':!chUnlocked(r)?'🔒':'→')+'</button>').join('');
  const boss=CH_BOSSES.find(b=>b.l===reg.l)||CH_BOSSES.filter(b=>b.l<=L('combat')).slice(-1)[0]||CH_BOSSES[0];
  const skills=[['power','Might','+3.5% attack damage per rank'],['ward','Warden','+4% defense and +2 max HP per rank'],['focus','Focus','+2% critical chance per rank'],['fortune','Fortune','+4% coins from rewards per rank']].map(([id,n,d])=>'<div class="ch-skill"><div><b>'+n+' · '+st.skills[id]+'/5</b><small>'+d+'</small></div><button data-a="talent" data-i="'+id+'" '+(st.points<1||st.skills[id]>=5?'disabled':'')+'>Upgrade</button></div>').join('');
  return '<div class="ch-hero"><div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;opacity:.8">The Blightbound Chronicle</div><h2 style="margin:5px 0 7px">A farm worth fighting for</h2><p style="margin:0;font-size:13px;max-width:280px">Follow the blight from the fields to the frozen throne. Grow stronger, uncover the lost seals, and bring the valley back to life.</p></div><div class="ch-kpis"><div class="ch-kpi"><b>'+L('combat')+'</b><small>Combat level</small></div><div class="ch-kpi"><b>'+st.kills+'</b><small>Creatures defeated</small></div><div class="ch-kpi"><b>'+st.points+'</b><small>Skill points</small></div></div><div class="ttl">Choose your destination</div><div class="col">'+regions+'</div><div class="card2"><b>'+reg.n+'</b><span>'+reg.desc+'</span><small>Enemies: '+reg.foes.join(', ')+'</small><div class="btns"><button class="btn" data-a="explore">Explore this region</button><button class="btn alt" data-a="boss" data-i="'+boss.n+'">Challenge: '+boss.n+'</button></div><small>Boss recommendation: combat level '+boss.l+'. Prepare with food, potions, armor, and a forged weapon.</small></div><div class="ttl">Talents</div><p class="ch-note">Skill points come from story quests and first-time boss victories. These bonuses stack with your existing equipment and skill levels.</p><div class="col">'+skills+'</div><div class="ttl">Story quests</div><div class="col">'+(quests||'<div class="card2">The valley is safe. Your chronicle is complete!</div>')+'</div><div class="ttl">Awakened relics</div><div class="card2">'+(st.relics.length?st.relics.map(x=>'✦ '+x).join('<br>'):'Defeat a regional boss to awaken your first relic.')+'</div><p class="ch-note">Your farm, barn, inventory, equipment, dungeons, crafting, and existing saves remain part of the same adventure.</p>';
 }
});
// Add the new tab without replacing the original navigation or views.
// Story Mode entry point and Chronicle tab removed; core RPG and Mine Expedition remain active.


