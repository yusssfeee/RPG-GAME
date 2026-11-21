
(function rpgGameEnhancements(){
  'use strict';
  const RPG_ENV_ART = {"fish":"{{BLOB:b0125.webp}}","mine":"{{BLOB:b0126.webp}}","road":"{{BLOB:b0127.webp}}"};
  document.documentElement.style.setProperty('--rpg-mine-bg', "url('"+RPG_ENV_ART.mine+"')");

  /* The old icon set was missing many material/weapon keys, which rendered as empty SVGs.
     Replace the missing silhouettes and polish the core weapon/resource art with native vector drawings. */
  const detailBlade=(c,wide)=>`<path d="M32 3 L${wide?45:40} 17 L${wide?40:36} 43 L32 51 L${wide?24:28} 43 L${wide?19:24} 17 Z" fill="${c||'#dfe9f5'}"/><path d="M32 6L36 20L32 42L28 20Z" fill="#ffffff" opacity=".68" stroke="none"/><path d="M22 21L32 27L42 21" fill="none" stroke="#8a9fb3" stroke-width="1.7"/><path d="M15 46Q32 40 49 46L46 52H18Z" fill="#e8ba5d"/><rect x="28" y="51" width="8" height="10" rx="2" fill="#73503d"/><path d="M29 54h6M29 58h6" stroke="#f2d6a0" stroke-width="1.5"/><circle cx="32" cy="61" r="2.5" fill="#6ad7f2"/>`;
  const detailWood=(c)=>`<rect x="29" y="9" width="6" height="50" rx="3" fill="#8a5a35"/><path d="M30 14h4M30 24h4M30 36h4M30 48h4" stroke="#d7a66c" stroke-width="1.5"/>`;
  Object.assign(P,{
    sword:c=>detailBlade(c,true),
    dagger:c=>`<path d="M32 7L42 29L32 42L22 29Z" fill="${c||'#dfe9f5'}"/><path d="M32 10L34 29L32 36L30 29Z" fill="#fff" opacity=".75" stroke="none"/><path d="M18 42L46 42L42 48L22 48Z" fill="#e9bf60"/><rect x="28" y="48" width="8" height="11" rx="2" fill="#6b4938"/><circle cx="32" cy="60" r="3" fill="#d9a441"/>`,
    great:c=>`<path d="M32 2L47 18L42 42L32 50L22 42L17 18Z" fill="${c||'#dfe9f5'}"/><path d="M32 6L37 20L32 43L27 20Z" fill="#fff" opacity=".65" stroke="none"/><path d="M15 45L49 45L46 52L18 52Z" fill="#e6b84c"/><rect x="28" y="52" width="8" height="8" rx="2" fill="#754c37"/><circle cx="32" cy="61" r="3" fill="#ebd28d"/>`,
    katana:c=>`<path d="M44 3Q49 24 34 47L27 45Q41 23 38 6Z" fill="${c||'#dfe9f5'}"/><path d="M42 8Q43 25 31 42" stroke="#fff" stroke-width="2" fill="none" opacity=".8"/><ellipse cx="30" cy="48" rx="10" ry="3.5" fill="#e9bf60"/><rect x="27" y="50" width="7" height="10" rx="2" fill="#3b2e52"/><path d="M27 53h7M27 57h7" stroke="#cf9cf3" stroke-width="1.5"/><circle cx="30" cy="61" r="2.5" fill="#e7ba59"/>`,
    rapier:c=>`<path d="M35 2L38 8L34 43L29 43L31 8Z" fill="${c||'#dfe9f5'}"/><path d="M34 8L33 37" stroke="#fff" stroke-width="1.7" fill="none"/><path d="M13 43Q32 49 51 43L47 48Q32 53 17 48Z" fill="#edc45e"/><rect x="29" y="49" width="6" height="11" rx="2" fill="#684735"/><circle cx="32" cy="61" r="3" fill="#6edcf4"/>`,
    axe:c=>detailWood(c)+`<path d="M33 10Q56 5 57 22Q56 38 35 35L32 29L43 23L34 19Z" fill="${c||'#c9d6e4'}"/><path d="M41 14Q51 16 51 23Q49 29 40 29L45 23Z" fill="#fff" opacity=".6" stroke="none"/><path d="M30 12L23 14L20 24L30 30Z" fill="${c||'#c9d6e4'}"/>`,
    spear:c=>detailWood(c)+`<path d="M32 2L43 20L37 27L27 27L21 20Z" fill="${c||'#dfe9f5'}"/><path d="M32 6L34 20L32 24L30 20Z" fill="#fff" opacity=".75" stroke="none"/><path d="M23 25L32 31L41 25L38 34H26Z" fill="#ddad50"/>`,
    hammer:c=>detailWood(c)+`<path d="M10 7H54V21Q54 27 48 27H16Q10 27 10 21Z" fill="${c||'#9eafc0'}"/><path d="M15 11H48V15H15Z" fill="#fff" opacity=".6" stroke="none"/><path d="M17 27H48L43 32H21Z" fill="#687b91"/><rect x="28" y="32" width="8" height="7" rx="2" fill="#d7ad59"/>`,
    club:c=>detailWood(c)+`<path d="M17 9Q28 1 43 9L51 20L43 29L21 27L13 18Z" fill="${c||'#99613a'}"/><path d="M21 13l5 4M32 8l4 7M40 16l5 4" stroke="#e7c18b" stroke-width="2.5"/>`,
    bow:c=>`<path d="M18 5Q56 26 18 59" fill="none" stroke="${c||'#b8803f'}" stroke-width="7"/><path d="M18 5L18 59" fill="none" stroke="#f5e3bc" stroke-width="1.7"/><path d="M11 31H49" stroke="#d5e6f2" stroke-width="2"/><path d="M43 25L54 31L43 37Z" fill="#d5e6f2"/><path d="M24 14Q37 30 24 49" stroke="#f2cd8a" stroke-width="2" fill="none"/>`,
    staff:c=>`<path d="M23 58L43 12" stroke="#8a5a35" stroke-width="6"/><path d="M23 58L43 12" stroke="#f1c58a" stroke-width="1.5"/><path d="M43 2L56 13L43 24L30 13Z" fill="${c||'#7ad8ff'}"/><path d="M43 6L47 13L43 20L39 13Z" fill="#fff" opacity=".75"/><circle cx="43" cy="13" r="18" fill="${c||'#7ad8ff'}" opacity=".14" stroke="none"/>`,
    pick:c=>`<path d="M27 21L34 21L39 61L29 61Z" fill="#84583c"/><path d="M9 19Q24 3 45 10Q55 14 58 25L48 29Q37 18 21 25L14 29Z" fill="${c||'#c9d6e4'}"/><path d="M18 18Q32 9 46 16" stroke="#fff" stroke-width="2.2" fill="none"/><path d="M28 37h8" stroke="#deb883" stroke-width="1.5"/>`,
    tunic:c=>`<path d="M21 9L31 5L42 9L54 20L47 31L42 27V59H22V27L17 31L10 20Z" fill="${c||'#7e9a74'}"/><path d="M31 7L32 58" stroke="#e2ca93" stroke-width="2"/><path d="M23 35H41" stroke="#7e5739" stroke-width="4"/><path d="M25 12Q32 19 39 12" stroke="#fff" stroke-width="2" fill="none" opacity=".7"/>`,
    leather:c=>`<path d="M21 8L31 5L42 8L54 20L47 31L42 26V59H22V26L17 31L10 20Z" fill="${c||'#a46d3d'}"/><path d="M23 13L41 13L38 25L26 25Z" fill="#d6a873"/><path d="M22 31H42M22 39H42M22 47H42" stroke="#583924" stroke-width="2"/><circle cx="32" cy="30" r="2" fill="#efcb78"/>`,
    cloak:c=>`<path d="M25 7L32 3L40 8L50 22L43 32L48 60L17 60L22 32L14 22Z" fill="${c||'#6d4a9e'}"/><path d="M32 7L32 57" stroke="#e7c76f" stroke-width="2"/><path d="M19 38L45 38" stroke="#fff" stroke-width="1.5" opacity=".4"/><circle cx="32" cy="17" r="4" fill="#f2d077"/>`,
    robe:c=>`<path d="M22 8L32 4L42 8L51 21L45 31L42 27L48 60H16L22 27L18 31L12 21Z" fill="${c||'#8366b8'}"/><path d="M32 7L24 23L32 52L40 23Z" fill="#d7caff" opacity=".7"/><path d="M22 43H42" stroke="#e9c568" stroke-width="3"/>`,
    plate:c=>`<path d="M19 10L29 5H36L45 10L53 23L45 31L42 58H22L19 31L11 23Z" fill="${c||'#b6c4d4'}"/><path d="M29 9L23 25L32 34L41 25L36 9Z" fill="#f6fbff" opacity=".75"/><path d="M22 36H42M22 43H42M22 50H42" stroke="#536577" stroke-width="2"/><circle cx="32" cy="30" r="4" fill="#e8be59"/>`,
    shield:c=>`<path d="M32 4L53 12V32Q49 49 32 60Q15 49 11 32V12Z" fill="${c||'#4f85c6'}"/><path d="M32 10L46 15V32Q43 43 32 51Q21 43 18 32V15Z" fill="#d5e4f1"/><path d="M32 14V48M20 30H44" stroke="#4b6b8d" stroke-width="4"/><circle cx="32" cy="30" r="5" fill="#edc25f"/>`,
    ore:c=>`<path d="M6 42L13 20L29 8L48 14L59 34L50 53L29 59L12 52Z" fill="#404c5d"/><path d="M13 20L29 8L48 14L36 28Z" fill="#8393a3"/><path d="M13 20L36 28L29 59L12 52Z" fill="#56697c"/><path d="M36 28L48 14L59 34L50 53L29 59Z" fill="#293849"/><path d="M17 25L29 16L40 21L33 32L21 37Z" fill="${c||'#dca56d'}"/><path d="M37 36L48 27L53 36L46 46L35 49Z" fill="${c||'#dca56d'}"/><path d="M23 43L29 40L34 49L28 53Z" fill="${c||'#dca56d'}"/><path d="M18 25L29 16L40 21" fill="none" stroke="#fff" stroke-width="2" opacity=".65"/><circle cx="46" cy="21" r="2" fill="#fff"/>`,
    fish:c=>`<path d="M7 32Q18 12 39 18Q48 20 51 32Q45 45 27 45Q14 43 7 32Z" fill="${c||'#8fb3c9'}"/><path d="M46 32L61 19L59 32L61 45Z" fill="${c||'#8fb3c9'}"/><path d="M25 20L34 8L41 21Z" fill="${c||'#8fb3c9'}"/><path d="M27 43L37 55L42 43Z" fill="${c||'#8fb3c9'}"/><path d="M23 22Q30 33 22 41" fill="none" stroke="#fff" stroke-width="2" opacity=".7"/><circle cx="17" cy="29" r="4" fill="#fff"/><circle cx="18" cy="29" r="2" fill="#173044" stroke="none"/><path d="M7 32Q14 36 20 33" fill="none" stroke="#fff" stroke-width="1.3" opacity=".6"/>`,
    puffer:c=>`<path d="M32 10L36 16L43 10L46 18L55 18L53 27L61 32L53 39L55 48L45 47L41 56L33 50L26 56L22 47L12 48L14 39L5 32L14 26L12 17L22 18L26 10Z" fill="${c||'#e8ba53'}"/><circle cx="32" cy="33" r="19" fill="${c||'#e8ba53'}"/><ellipse cx="27" cy="25" rx="7" ry="4" fill="#fff" opacity=".45"/><circle cx="25" cy="32" r="4" fill="#fff"/><circle cx="40" cy="32" r="4" fill="#fff"/><circle cx="26" cy="33" r="2" fill="#17202b" stroke="none"/><circle cx="41" cy="33" r="2" fill="#17202b" stroke="none"/><path d="M28 42Q32 46 36 42" fill="none"/>`,
    sardine:c=>`<path d="M5 33Q17 17 43 22Q51 24 54 32Q48 43 29 43Q15 43 5 33Z" fill="${c||'#8fb3c9'}"/><path d="M50 32L62 22L60 33L62 43Z" fill="#6f9cb7"/><path d="M26 22L35 14L41 24Z" fill="#cadbe7"/><path d="M25 43L35 51L40 42Z" fill="#779ab0"/><path d="M15 33h33" stroke="#fff" stroke-width="1.5" opacity=".55"/><circle cx="14" cy="30" r="3" fill="#fff"/><circle cx="14" cy="30" r="1.5" fill="#0c2334" stroke="none"/>`,
    bass:c=>`<path d="M5 33Q14 13 36 16Q50 19 53 33Q46 49 29 48Q13 47 5 33Z" fill="${c||'#dba75a'}"/><path d="M49 33L62 20L61 33L62 46Z" fill="#9e773f"/><path d="M19 19L31 8L39 19Z" fill="#ead19b"/><path d="M22 46L34 56L40 46Z" fill="#bd8b44"/><path d="M22 19L28 30L21 43M31 17L37 31L31 47M40 21L44 32L40 43" stroke="#704c26" stroke-width="1.5" fill="none"/><circle cx="14" cy="30" r="3.5" fill="#fff"/><circle cx="14" cy="30" r="1.6" fill="#182536" stroke="none"/>`,
    carp:c=>`<path d="M5 32Q13 10 37 15Q52 17 54 32Q49 48 31 49Q13 47 5 32Z" fill="${c||'#c9a050'}"/><path d="M50 32L62 19L60 32L62 45Z" fill="#9e783a"/><path d="M24 17L31 8L40 18Z" fill="#edd8a1"/><path d="M24 47L36 56L41 46Z" fill="#ab7d36"/><g fill="none" stroke="#f6df9e" stroke-width="1.1"><path d="M20 23l7 7-7 7M29 20l7 9-7 10M38 21l6 9-6 9"/></g><circle cx="14" cy="29" r="3.5" fill="#fff"/><circle cx="14" cy="29" r="1.5" fill="#182536" stroke="none"/>`,
    trout:c=>`<path d="M5 32Q17 13 39 20Q50 22 54 32Q46 44 29 43Q14 43 5 32Z" fill="${c||'#e08a7a'}"/><path d="M51 32L62 20L60 32L62 44Z" fill="#b7c9d7"/><path d="M25 21L34 12L40 22Z" fill="#d4e0e8"/><path d="M27 43L37 52L41 42Z" fill="#bc6c68"/><path d="M18 30h30" stroke="#f9d7ba" stroke-width="2"/><g fill="#8f514e" stroke="none"><circle cx="25" cy="25" r="1.2"/><circle cx="32" cy="35" r="1.2"/><circle cx="40" cy="27" r="1.2"/><circle cx="22" cy="37" r="1.2"/></g><circle cx="14" cy="29" r="3" fill="#fff"/><circle cx="14" cy="29" r="1.5" fill="#182536" stroke="none"/>`,
    salmon:c=>`<path d="M5 32Q16 12 38 18Q51 21 54 32Q47 46 29 45Q15 44 5 32Z" fill="${c||'#ff8a6a'}"/><path d="M50 32L62 20L61 32L62 44Z" fill="#d66d5d"/><path d="M24 20L33 10L40 22Z" fill="#f7d2c9"/><path d="M27 44L38 53L42 43Z" fill="#f2a39a"/><path d="M18 24Q29 32 18 40M27 21Q37 32 27 43M36 20Q46 31 36 43" stroke="#ffe4cd" stroke-width="2" fill="none"/><circle cx="14" cy="29" r="3" fill="#fff"/><circle cx="14" cy="29" r="1.4" fill="#182536" stroke="none"/>`,
    tuna:c=>`<path d="M4 33Q17 12 42 21Q51 23 54 32Q45 44 27 43Q13 42 4 33Z" fill="${c||'#4a78c0'}"/><path d="M50 32L63 20L62 32L63 44Z" fill="#315d9c"/><path d="M22 20L33 12L41 22Z" fill="#9fc5ed"/><path d="M26 43L40 50L42 42Z" fill="#8eb5df"/><path d="M16 27L46 27M17 34L47 34" stroke="#d9edff" stroke-width="1.3" opacity=".7"/><circle cx="13" cy="29" r="3" fill="#fff"/><circle cx="13" cy="29" r="1.4" fill="#182536" stroke="none"/>`,
    swordfish:c=>`<path d="M6 33Q20 15 43 22Q49 24 54 32Q45 45 28 44Q15 42 6 33Z" fill="${c||'#7ab8e0'}"/><path d="M49 31L64 7L59 34L64 47Z" fill="#bedbec"/><path d="M51 33L62 39L62 43Z" fill="#4a78a4"/><path d="M22 22L31 13L39 22Z" fill="#e9f6ff"/><path d="M24 42L36 50L40 42Z" fill="#78a4cc"/><circle cx="14" cy="29" r="3" fill="#fff"/><circle cx="14" cy="29" r="1.4" fill="#182536" stroke="none"/>`,
    eel:c=>`<path d="M5 44Q10 13 30 20Q44 26 33 38Q23 48 41 43Q56 39 58 22" fill="none" stroke="${c||'#5fd0a0'}" stroke-width="13" stroke-linecap="round"/><path d="M5 44Q10 13 30 20Q44 26 33 38Q23 48 41 43Q56 39 58 22" fill="none" stroke="#d6ffeb" stroke-width="2.4" opacity=".55" stroke-linecap="round"/><circle cx="8" cy="40" r="2.8" fill="#fff"/><circle cx="8" cy="40" r="1.4" fill="#18302e" stroke="none"/>`,
    angler:c=>`<path d="M7 34Q8 11 31 15Q50 17 54 33Q49 51 29 49Q12 47 7 34Z" fill="${c||'#9a56d8'}"/><path d="M49 33L63 21L61 33L63 46Z" fill="#6c3c9e"/><path d="M25 19Q19 5 33 4Q40 4 38 14" fill="none" stroke="#d9c0ff" stroke-width="3"/><circle cx="39" cy="7" r="5" fill="#e8fbff"/><circle cx="39" cy="7" r="2" fill="#fff6a3" stroke="none"/><path d="M27 30L30 40L35 30L40 40L45 30" fill="#f4eaff"/><circle cx="16" cy="29" r="3" fill="#fff"/><circle cx="16" cy="29" r="1.5" fill="#21172b" stroke="none"/>`,
    kraken:c=>`<path d="M21 21Q32 9 43 21L46 37Q32 45 18 37Z" fill="${c||'#a04adf'}"/><circle cx="27" cy="28" r="4" fill="#fff"/><circle cx="38" cy="28" r="4" fill="#fff"/><circle cx="28" cy="29" r="2" fill="#261337" stroke="none"/><circle cx="39" cy="29" r="2" fill="#261337" stroke="none"/><path d="M21 38Q13 45 19 53Q24 59 28 51M26 40Q26 49 31 56M36 40Q42 49 39 56M43 38Q54 45 48 53" fill="none" stroke="${c||'#a04adf'}" stroke-width="6" stroke-linecap="round"/>`,
    gel:c=>`<path d="M8 52Q10 23 32 20Q54 21 57 52Q49 61 17 58Z" fill="${c||'#5fe08a'}"/><ellipse cx="24" cy="31" rx="9" ry="5" fill="#fff" opacity=".55" stroke="none"/><circle cx="26" cy="42" r="3" fill="#fff"/><circle cx="39" cy="42" r="3" fill="#fff"/><circle cx="26" cy="42" r="1.6" fill="#163e32" stroke="none"/><circle cx="39" cy="42" r="1.6" fill="#163e32" stroke="none"/><path d="M28 50q5 3 10 0" fill="none"/>`,
    hide:c=>`<path d="M15 13Q22 6 30 13L36 9L44 15L52 22L48 38L55 49L41 57L26 52L12 55L8 40L13 28Z" fill="${c||'#b8803f'}"/><path d="M19 19Q29 13 34 20L42 18L46 29L41 45L28 47L17 41Z" fill="#e4b880"/><path d="M17 23L25 27L20 37M43 23L37 30L43 39" stroke="#81552f" stroke-width="2" fill="none"/>`,
    fur:c=>`<path d="M16 20L22 10L29 17L37 8L43 18L54 17L52 29L59 37L50 46L51 55L39 52L31 59L23 51L12 53L15 42L7 34Z" fill="${c||'#c9b8a0'}"/><path d="M19 24Q31 16 43 24L49 38L39 47L25 44L16 35Z" fill="#f4e6cf"/><path d="M23 26L27 39M31 23L33 40M40 25L39 40" stroke="#a28e72" stroke-width="1.5" fill="none"/>`,
    fang:c=>`<path d="M14 10Q25 17 31 25Q41 36 50 52L39 57L29 42Q17 27 14 10Z" fill="${c||'#f0e7d1'}"/><path d="M19 17Q28 31 43 49" stroke="#fff" stroke-width="3" fill="none"/><path d="M31 43L40 53L46 52L40 47Z" fill="#b3a58a"/>`,
    bone:c=>`<path d="M19 14Q10 9 8 19Q6 27 15 30L34 49Q34 59 44 58Q53 57 51 48Q49 42 42 43L25 25Q27 17 19 14Z" fill="${c||'#eee6d0'}"/><path d="M18 20L39 43" stroke="#fff" stroke-width="3" opacity=".65"/><circle cx="15" cy="20" r="3" fill="#b6a88f" stroke="none"/><circle cx="44" cy="52" r="3" fill="#b6a88f" stroke="none"/>`,
    wing:c=>`<path d="M7 17Q21 12 30 28L33 15Q43 18 45 33Q58 32 58 47L43 43L34 57L25 44L13 48L16 34Z" fill="${c||'#8a66cc'}"/><path d="M11 22L28 37L16 35M30 28L34 46M44 34L41 42M25 44L28 51" stroke="#eadbff" stroke-width="1.6" fill="none" opacity=".75"/><circle cx="32" cy="27" r="5" fill="#e7d9ff"/>`,
    silk:c=>`<path d="M18 16H47L44 50H21Z" fill="${c||'#f0e6fb'}"/><path d="M20 21Q32 26 45 21M20 28Q32 33 44 28M20 35Q32 40 44 35M20 42Q32 47 43 42" stroke="#a88ac8" stroke-width="1.6" fill="none"/><path d="M26 10h14v6H26z" fill="#e8d9f4"/><path d="M25 52L14 59M39 52L50 59" stroke="#d6c2eb" stroke-width="2"/>`,
    horn:c=>`<path d="M17 55Q10 40 22 30Q32 22 29 7Q44 13 44 30Q42 47 55 52Q40 63 17 55Z" fill="${c||'#d4c0a0'}"/><path d="M24 52Q16 40 27 31Q35 24 34 14Q40 25 37 35Q34 46 46 53Z" fill="#fff0c9" opacity=".7"/><path d="M22 44L36 45" stroke="#8e7651" stroke-width="2"/>`,
    wisp:c=>`<path d="M32 8Q46 25 49 39Q52 57 33 59Q14 57 16 40Q18 24 32 8Z" fill="${c||'#9a8cff'}"/><path d="M26 48Q31 43 36 48L43 55L35 53L29 58L23 54Z" fill="#e8f8ff"/><circle cx="26" cy="35" r="3" fill="#fff"/><circle cx="38" cy="35" r="3" fill="#fff"/><circle cx="26" cy="36" r="1.5" fill="#193146" stroke="none"/><circle cx="38" cy="36" r="1.5" fill="#193146" stroke="none"/><ellipse cx="32" cy="21" rx="8" ry="5" fill="#fff" opacity=".55" stroke="none"/>`,
    core:c=>`<path d="M32 3L49 19L44 45L32 61L20 45L15 19Z" fill="${c||'#53d4ff'}"/><path d="M32 3L32 61L20 45L15 19Z" fill="#fff" opacity=".22"/><path d="M32 3L49 19L32 28L15 19Z" fill="#fff" opacity=".5"/><path d="M24 31L32 25L40 31L32 47Z" fill="#e7fdff" opacity=".65"/><circle cx="32" cy="32" r="25" fill="${c||'#53d4ff'}" opacity=".14" stroke="none"/>`,
    scale:c=>`<path d="M32 5L51 17L55 42L32 60L9 42L13 17Z" fill="${c||'#ff6a5a'}"/><path d="M32 5L32 60L9 42L13 17Z" fill="#6b1926" opacity=".36"/><path d="M32 14L44 22L46 39L32 49L18 39L20 22Z" fill="none" stroke="#ffc1a5" stroke-width="2.2"/><path d="M22 19L32 13L42 19" stroke="#fff" stroke-width="2" fill="none" opacity=".8"/>`,
    herb:c=>`<path d="M32 57V17" stroke="#427b3a" stroke-width="4"/><path d="M31 39Q11 40 10 19Q27 19 31 39Z" fill="${c||'#6fd45a'}"/><path d="M33 31Q37 10 55 11Q55 29 33 31Z" fill="#3fb56b"/><path d="M31 50Q13 51 17 34Q31 37 31 50Z" fill="#91d86b"/><path d="M26 24L29 35M39 20L35 27M23 39L29 46" stroke="#e5ffc4" stroke-width="1.7" fill="none"/>`,
    egg:c=>`<path d="M32 7Q16 8 14 34Q12 55 32 59Q52 55 50 34Q48 8 32 7Z" fill="${c||'#f2e8cf'}"/><path d="M22 20Q29 12 35 16" stroke="#fff" stroke-width="4" fill="none"/><ellipse cx="28" cy="42" rx="8" ry="5" fill="#fff" opacity=".2" stroke="none"/>`,
    feather:c=>`<path d="M17 57Q9 27 47 7Q52 37 17 57Z" fill="${c||'#e8e0c8'}"/><path d="M17 57L45 15M25 45L18 34M32 36L25 26M39 27L35 20M25 47L35 46M32 36L43 37" stroke="#fff" stroke-width="1.8" fill="none" opacity=".8"/><path d="M12 59L20 51" stroke="#9b8261" stroke-width="3"/>`,
    wool:c=>`<g fill="${c||'#eee6d0'}"><circle cx="22" cy="25" r="11"/><circle cx="36" cy="19" r="12"/><circle cx="47" cy="29" r="11"/><circle cx="23" cy="39" r="12"/><circle cx="38" cy="40" r="13"/><circle cx="48" cy="43" r="9"/></g><g fill="#fff" opacity=".45" stroke="none"><circle cx="22" cy="22" r="4"/><circle cx="35" cy="15" r="4"/><circle cx="45" cy="25" r="3"/></g>`,
    milk:c=>`<path d="M25 7H39V17L46 25V54Q46 59 40 59H24Q18 59 18 54V25L25 17Z" fill="${c||'#f5f8ff'}"/><path d="M24 7H40V15H24Z" fill="#bf9763"/><path d="M22 32H42V51H22Z" fill="#bde9ff"/><path d="M27 36L31 32L35 36L31 43Z" fill="#fff"/><path d="M26 11H38" stroke="#fff" stroke-width="2"/>`,
    honey:c=>`<path d="M20 21H44L49 30V51Q49 57 43 57H21Q15 57 15 51V30Z" fill="${c||'#e7a52a'}"/><path d="M20 21V13H44V21Z" fill="#b57a32"/><path d="M19 33H45M19 42H45" stroke="#fff0a7" stroke-width="2"/><path d="M31 23Q38 29 32 34Q26 29 31 23Z" fill="#fff6bd"/>`,
    manure:c=>`<path d="M16 22Q32 13 48 22L53 53Q32 62 11 53Z" fill="${c||'#94734a'}"/><path d="M19 22Q32 31 45 22" fill="none" stroke="#e3c896" stroke-width="3"/><rect x="20" y="35" width="24" height="12" rx="3" fill="#e7d4a5"/><path d="M25 39h14M25 43h14" stroke="#795c3d" stroke-width="1.5"/>`,
    'oak-log':c=>`<path d="M10 18L47 13L54 20L49 48L13 53L7 45Z" fill="${c||'#9b6537'}"/><path d="M13 20L46 17L49 43L14 47Z" fill="#bc8650"/><ellipse cx="13" cy="34" rx="6" ry="15" fill="#e3b17a"/><ellipse cx="13" cy="34" rx="3" ry="10" fill="none" stroke="#8d5b31" stroke-width="1.5"/><path d="M24 21L24 45M37 20L37 44" stroke="#8c572d" stroke-width="2"/>`,
    'birch-log':c=>`<path d="M10 18L48 13L55 20L50 49L13 53L7 45Z" fill="${c||'#e8e0c8'}"/><path d="M13 20L46 17L49 43L14 47Z" fill="#fff7e7"/><ellipse cx="13" cy="34" rx="6" ry="15" fill="#d4cab2"/><ellipse cx="13" cy="34" rx="3" ry="10" fill="none" stroke="#8b8170" stroke-width="1.5"/><path d="M24 22L21 27L27 31L22 37L27 42M38 20L35 27L40 31L35 38L39 43" stroke="#6d6b63" stroke-width="2" fill="none"/>`,
    'pine-log':c=>`<path d="M10 18L47 13L54 20L49 48L13 53L7 45Z" fill="${c||'#3b7a4a'}"/><path d="M13 20L46 17L49 43L14 47Z" fill="#7d9c5b"/><ellipse cx="13" cy="34" rx="6" ry="15" fill="#b8a57d"/><ellipse cx="13" cy="34" rx="3" ry="10" fill="none" stroke="#5a3f27" stroke-width="1.5"/><path d="M24 21L24 45M37 20L37 44" stroke="#365c35" stroke-width="2"/>`,
    'ironwood-log':c=>`<path d="M10 18L47 13L54 20L49 48L13 53L7 45Z" fill="${c||'#8a8a9a'}"/><path d="M13 20L46 17L49 43L14 47Z" fill="#aeb8c8"/><ellipse cx="13" cy="34" rx="6" ry="15" fill="#dce3ec"/><ellipse cx="13" cy="34" rx="3" ry="10" fill="none" stroke="#546172" stroke-width="1.5"/><path d="M24 21L24 45M37 20L37 44" stroke="#66738a" stroke-width="2"/>`,
    'elderwood-log':c=>`<path d="M10 18L47 13L54 20L49 48L13 53L7 45Z" fill="${c||'#b36bff'}"/><path d="M13 20L46 17L49 43L14 47Z" fill="#d4a8ff"/><ellipse cx="13" cy="34" rx="6" ry="15" fill="#eedcff"/><ellipse cx="13" cy="34" rx="3" ry="10" fill="none" stroke="#8b43c2" stroke-width="1.5"/><path d="M24 21L24 45M37 20L37 44" stroke="#9041bc" stroke-width="2"/><circle cx="37" cy="28" r="2.5" fill="#fff"/>`,
    'arcane-gem':c=>`<path d="M32 4L47 16L55 31L43 52L32 60L20 52L8 31L17 16Z" fill="${c||'#b36bff'}"/><path d="M32 4L32 60L20 52L8 31L17 16Z" fill="#fff" opacity=".25"/><path d="M17 16L32 22L47 16M8 31L32 35L55 31M20 52L32 35L43 52" fill="none" stroke="#f2e5ff" stroke-width="2"/><path d="M32 10L38 17L32 25L26 17Z" fill="#fff" opacity=".7"/>`,
    starstone:c=>`<path d="M32 3L38 20L55 13L47 30L61 37L43 42L45 59L32 48L19 59L21 42L3 37L17 30L9 13L26 20Z" fill="${c||'#ffa530'}"/><path d="M32 10L36 29L49 25L40 36L49 40L35 42L32 51L28 42L15 40L24 36L15 25L28 29Z" fill="#fff1ad"/><circle cx="32" cy="36" r="5" fill="#fff"/>`,
    coal:c=>`<path d="M9 43L16 18L34 8L54 22L59 42L45 57L22 56Z" fill="${c||'#3a3a44'}"/><path d="M16 18L34 8L39 24L25 35Z" fill="#89909d"/><path d="M39 24L54 22L59 42L45 57L41 39Z" fill="#191d27"/><path d="M25 35L39 24L41 39L22 56Z" fill="#525b6c"/><path d="M18 22L31 15" stroke="#dfe8ff" stroke-width="2"/>`,
    crystal:c=>`<path d="M6 54L18 19L29 7L39 29L51 13L59 54Z" fill="${c||'#7ad8ff'}"/><path d="M18 19L29 7L29 54L6 54Z" fill="#e6fbff" opacity=".55"/><path d="M29 7L39 29L29 54Z" fill="#2b8cc7" opacity=".7"/><path d="M51 13L59 54H39L39 29Z" fill="#a4ecff" opacity=".65"/><path d="M29 11L29 48M49 19L49 48" stroke="#fff" stroke-width="2"/>`,
    obsidian:c=>`<path d="M8 45L15 18L32 5L51 16L58 39L44 58L19 55Z" fill="${c||'#4a2a6a'}"/><path d="M15 18L32 5L36 26L23 37Z" fill="#aa7bda"/><path d="M36 26L51 16L58 39L44 58L41 39Z" fill="#241435"/><path d="M23 37L36 26L41 39L19 55Z" fill="#5f3b83"/><path d="M19 20L31 10M42 31L53 37" stroke="#f3d9ff" stroke-width="2"/>`,
    focus:c=>`<path d="M32 4L50 22L43 45L32 59L21 45L14 22Z" fill="${c||'#7ad8ff'}"/><circle cx="32" cy="31" r="13" fill="#e2fbff" opacity=".7"/><circle cx="32" cy="31" r="6" fill="#357ec6"/><path d="M32 11V20M32 42V52M17 25L23 28M41 35L47 39" stroke="#fff" stroke-width="2"/>`,
    ingot:c=>`<path d="M8 24L17 11H47L57 24L51 52H13Z" fill="${c||'#c9d6e4'}"/><path d="M17 11L25 24L13 52L8 24Z" fill="#fff" opacity=".4"/><path d="M25 24H57L51 52H13Z" fill="#172638" opacity=".18"/><path d="M19 29H48M17 37H46" stroke="#fff" stroke-width="2" opacity=".65"/>`,
    'copper-bar':c=>`<path d="M8 24L17 11H47L57 24L51 52H13Z" fill="${c||'#e0833f'}"/><path d="M17 11L25 24L13 52L8 24Z" fill="#ffdaa4" opacity=".5"/><path d="M25 24H57L51 52H13Z" fill="#9a4d23" opacity=".3"/><path d="M19 29H48M17 37H46" stroke="#fff0d6" stroke-width="2" opacity=".65"/>`,
    'iron-bar':c=>`<path d="M8 24L17 11H47L57 24L51 52H13Z" fill="${c||'#cbd6e3'}"/><path d="M17 11L25 24L13 52L8 24Z" fill="#fff" opacity=".55"/><path d="M25 24H57L51 52H13Z" fill="#5b697c" opacity=".3"/><path d="M19 29H48M17 37H46" stroke="#fff" stroke-width="2" opacity=".8"/>`,
    'silver-bar':c=>`<path d="M8 24L17 11H47L57 24L51 52H13Z" fill="${c||'#f2f6ff'}"/><path d="M17 11L25 24L13 52L8 24Z" fill="#fff" opacity=".8"/><path d="M25 24H57L51 52H13Z" fill="#9cacc0" opacity=".25"/><path d="M19 29H48M17 37H46" stroke="#fff" stroke-width="2"/>`,
    'gold-bar':c=>`<path d="M8 24L17 11H47L57 24L51 52H13Z" fill="${c||'#ffcc33'}"/><path d="M17 11L25 24L13 52L8 24Z" fill="#fff0a6" opacity=".7"/><path d="M25 24H57L51 52H13Z" fill="#a96f12" opacity=".25"/><path d="M19 29H48M17 37H46" stroke="#fff6bd" stroke-width="2"/>`,
    'mithril-bar':c=>`<path d="M8 24L17 11H47L57 24L51 52H13Z" fill="${c||'#7ad8ff'}"/><path d="M17 11L25 24L13 52L8 24Z" fill="#fff" opacity=".8"/><path d="M25 24H57L51 52H13Z" fill="#2177a8" opacity=".22"/><path d="M19 29H48M17 37H46" stroke="#dffaff" stroke-width="2"/>`,
    flask:c=>`<path d="M25 5H39V18L50 36Q57 54 42 59H22Q7 54 14 36L25 18Z" fill="#eaf6ff"/><path d="M18 40H46L50 47Q48 57 34 57H24Q13 53 15 46Z" fill="${c||'#66d4ff'}"/><rect x="24" y="3" width="16" height="7" rx="2" fill="#c7965b"/><path d="M22 36L28 30L33 37L39 31L44 39" stroke="#fff" stroke-width="2" fill="none"/>`,
    bottle:c=>`<path d="M25 6H39V17L46 26V55Q46 59 41 59H23Q18 59 18 55V26L25 17Z" fill="${c||'#8bcbdf'}"/><rect x="24" y="4" width="16" height="7" rx="2" fill="#b8803f"/><path d="M22 31H42V52H22Z" fill="#fff" opacity=".35"/><path d="M23 42L30 36L36 43L42 39" stroke="#fff" stroke-width="2" fill="none"/>`,
    jar:c=>`<path d="M20 13H44V20L50 26V52Q50 58 44 58H20Q14 58 14 52V26L20 20Z" fill="${c||'#c8d3e2'}"/><path d="M18 30H46V50H18Z" fill="#fff" opacity=".28"/><rect x="19" y="7" width="26" height="7" rx="2" fill="#d7b16c"/><path d="M23 36H41M23 42H41" stroke="#fff" stroke-width="2"/>`,
    sack:c=>`<path d="M24 10Q32 17 40 10L45 20Q57 29 52 51Q32 63 12 51Q7 29 19 20Z" fill="${c||'#ba8c52'}"/><path d="M22 19Q32 24 42 19L44 26Q32 32 20 26Z" fill="#e6c28d"/><path d="M19 36Q32 41 45 36M20 44Q32 49 44 44" stroke="#6f4b2d" stroke-width="2" fill="none"/><rect x="28" y="31" width="8" height="10" rx="2" fill="#f3e2b4"/>`,
    town:c=>`<path d="M7 55V28L21 18V29L32 10L43 29V18L57 28V55Z" fill="${c||'#cba06a'}"/><path d="M4 56H60" stroke="#d7bd8c" stroke-width="4"/><rect x="27" y="39" width="10" height="17" rx="2" fill="#593b2b"/><rect x="12" y="34" width="8" height="9" fill="#a9e5ff"/><rect x="44" y="34" width="8" height="9" fill="#a9e5ff"/><path d="M32 10V3" stroke="#e7bf6b" stroke-width="2"/>`,
    door:c=>`<path d="M12 58V19Q12 4 32 4Q52 4 52 19V58Z" fill="${c||'#8c694a'}"/><path d="M20 58V21Q20 11 32 11Q44 11 44 21V58Z" fill="#49362b"/><path d="M25 27H39M25 36H39M25 45H39" stroke="#bd9663" stroke-width="2"/><circle cx="38" cy="40" r="2.5" fill="#f5d279"/>`,
    chest:c=>`<path d="M8 29Q8 9 32 9Q56 9 56 29V52H8Z" fill="${c||'#9b5a32'}"/><rect x="8" y="27" width="48" height="29" rx="4" fill="#c78a43"/><path d="M8 31H56M32 10V56" stroke="#f8d16e" stroke-width="4"/><rect x="25" y="31" width="14" height="14" rx="3" fill="#f2c15d"/><circle cx="32" cy="38" r="3" fill="#69432d"/><path d="M14 19Q32 1 50 19" fill="none" stroke="#f5d483" stroke-width="2"/>`,
    campfire:c=>`<path d="M32 5Q48 24 37 33Q52 29 49 46Q46 59 32 60Q15 59 13 46Q11 33 25 24Q25 38 32 37Q38 28 32 5Z" fill="${c||'#ff8a3d'}"/><path d="M32 31Q41 42 33 51Q24 49 27 41Z" fill="#fff3a1"/><path d="M12 54L52 54M19 48L45 59M45 48L19 59" stroke="#8c5936" stroke-width="4"/>`,
    cauldron:c=>`<path d="M12 25H52L48 48Q45 58 32 58Q19 58 16 48Z" fill="${c||'#55687b'}"/><path d="M18 31H46L43 44Q32 50 21 44Z" fill="#46d4be"/><path d="M20 23Q32 16 44 23" stroke="#b5d3e7" stroke-width="4" fill="none"/><path d="M20 50L15 58M44 50L49 58" stroke="#8b5e40" stroke-width="4"/><circle cx="25" cy="33" r="3" fill="#dcfff8"/><circle cx="39" cy="38" r="2" fill="#fff"/>`,
    'book-open':c=>`<path d="M7 16Q21 10 31 19V54Q19 45 7 50Z" fill="${c||'#b36bff'}"/><path d="M57 16Q43 10 33 19V54Q45 45 57 50Z" fill="#e5d7ff"/><path d="M31 19V54M13 24L25 25M13 31L25 32M40 25L51 24M40 32L51 31" stroke="#8063b4" stroke-width="2" fill="none"/><path d="M7 16Q20 10 31 19Q42 10 57 16V54Q44 46 31 54Q18 46 7 54Z" fill="none" stroke="#f2d18a" stroke-width="2"/>`,
    roll:c=>`<path d="M13 15H51V51H13Z" fill="${c||'#f0e2c1'}"/><path d="M18 21H46M18 29H42M18 37H44M18 45H38" stroke="#b19a6f" stroke-width="2"/><circle cx="13" cy="15" r="5" fill="#e2c48a"/><circle cx="51" cy="51" r="5" fill="#e2c48a"/>`,
    wagon:c=>`<path d="M9 18H44L50 41H15Z" fill="${c||'#b8803f'}"/><path d="M15 24H43M19 30H45" stroke="#e8c18a" stroke-width="2"/><circle cx="18" cy="47" r="7" fill="#6f5139"/><circle cx="43" cy="47" r="7" fill="#6f5139"/><circle cx="18" cy="47" r="3" fill="#d7c49d"/><circle cx="43" cy="47" r="3" fill="#d7c49d"/><path d="M46 21L57 14" stroke="#b8803f" stroke-width="4"/>`,
    llama:c=>`<path d="M22 38V17Q22 8 32 8Q42 8 42 17V38L49 44V59H42V48L32 43L25 48V59H18V44Z" fill="${c||'#dbd1bf'}"/><path d="M24 11L20 3L28 8M36 10L44 4L40 15" fill="#bda98a"/><circle cx="28" cy="20" r="2" fill="#332d26"/><circle cx="37" cy="20" r="2" fill="#332d26"/><path d="M28 27Q32 30 37 27" stroke="#7d6b58" stroke-width="1.5" fill="none"/>`
  });
  /* Fill out non-specialized materials with distinct, correctly named icons rather than blank SVGs. */
  const basicIcons=['egg','feather','wool','milk','honey','manure','oak-log','birch-log','pine-log','ironwood-log','elderwood-log','arcane-gem','starstone','coal','crystal','obsidian','focus','ingot','copper-bar','iron-bar','silver-bar','gold-bar','mithril-bar','steel','obsal','starsteel','pearl','bottle','jar','sack','town','door','chest','campfire','cauldron','book-open','roll','wagon','llama','cbar','ibar','sbar','gbar','mbar','copper-ingot','iron-ingot','silver-ingot','gold-ingot','mithril-ingot','steel-ingot','obsidian-alloy','starsteel-ingot','stone','radish','hay','clover','water','pond','river','sea','abyss','fish-art'];
  const genericIcon=c=>`<path d="M32 5L51 17L56 38L40 57H23L8 38L13 17Z" fill="${c||'#9eb4ca'}"/><path d="M32 5L32 57L23 57L8 38L13 17Z" fill="#fff" opacity=".18"/><path d="M13 17L32 24L51 17M8 38L32 32L56 38" fill="none" stroke="#fff" stroke-width="2" opacity=".6"/>`;
  basicIcons.forEach(k=>{if(!P[k])P[k]=genericIcon});
  /* Species-specific fish illustrations; the moving fish use their own shape/markings. */
  FISH.forEach(f=>{if(P[f.id])f.ic=f.id;});
  const matIcon={oak:'oak-log',birch:'birch-log',pine:'pine-log',ironwood:'ironwood-log',elder:'elderwood-log',agem:'arcane-gem',starstone:'starstone',coal:'coal',crystal:'crystal',obsidian:'obsidian',focus:'focus',cbar:'copper-bar',ibar:'iron-bar',sbar:'silver-bar',gbar:'gold-bar',mbar:'mithril-bar',steel:'ingot',obsal:'obsidian',starsteel:'starstone',pearl:'core',gel:'gel',hide:'hide',fur:'fur',fang:'fang',bone:'bone',wing:'wing',silk:'silk',horn:'horn',wisp:'wisp',core:'core',scale:'scale',herb:'herb',egg:'egg',feather:'feather',wool:'wool',milk:'milk',honey:'honey',manure:'manure'};
  Object.entries(matIcon).forEach(([id,ic])=>{if(MATS[id])MATS[id].ic=ic;});
  P.road=`<path d="M27 59Q7 49 19 36Q30 24 25 5H39Q34 25 45 36Q59 49 37 59Z" fill="#8e7452"/><path d="M32 7V16M31 27V32M35 42L39 48" stroke="#fff0c9" stroke-width="3.5" stroke-linecap="round"/><path d="M7 58L14 42L21 58M44 59L50 41L58 59" fill="#44834e"/><circle cx="14" cy="19" r="3" fill="#ffe5a1"/>`;
  Object.assign(P,{
    carrot:c=>`<path d="M27 25Q21 17 20 8Q29 12 31 21Q33 8 44 5Q45 17 35 26" fill="#3fa95b"/><path d="M25 24Q18 20 13 18Q14 28 25 31" fill="#62cd62"/><path d="M24 25L47 31L29 58Q24 62 22 55L17 32Z" fill="${c||'#f58b2c'}"/><path d="M23 34L35 37M25 42L32 44M25 50L29 51" stroke="#ffd09a" stroke-width="2" fill="none"/><path d="M24 26L30 31" stroke="#fff0c5" stroke-width="2" fill="none"/>`,
    wheat:c=>`<path d="M32 59V13" stroke="#7b9d3e" stroke-width="3"/><path d="M32 43Q19 42 20 31Q31 32 32 43M32 34Q45 32 44 22Q33 24 32 34M32 25Q20 23 23 13Q32 14 32 25M32 17Q42 14 39 6Q31 8 32 17" fill="${c||'#efbf43'}"/><g stroke="#ffea98" stroke-width="1.3" fill="none"><path d="M24 33l6 5M37 27l5-3M27 17l4 5M34 13l4-3"/></g><path d="M32 54Q19 52 15 44Q28 43 32 54M32 48Q45 47 49 38Q37 38 32 48" fill="#76b64d"/>`,
    pumpkin:c=>`<path d="M31 18Q30 11 36 7" stroke="#4d7e3e" stroke-width="5" fill="none"/><path d="M32 17Q11 12 10 34Q9 55 26 56Q31 56 33 52Q40 60 49 52Q59 45 53 28Q49 14 36 18Z" fill="${c||'#f28b25'}"/><path d="M32 20Q21 20 22 36Q22 49 31 52M35 20Q45 18 44 36Q45 48 36 53M16 27Q12 42 20 48M49 25Q56 39 47 49" stroke="#ffcd6c" stroke-width="2.5" fill="none"/><ellipse cx="24" cy="27" rx="5" ry="3" fill="#fff4bd" opacity=".6" stroke="none"/>`,
    tomato:c=>`<path d="M32 21Q14 13 10 30Q5 49 23 56Q33 60 41 54Q59 50 54 31Q50 15 32 21Z" fill="${c||'#ef4b3d'}"/><path d="M32 24L29 16L22 13L28 23L17 19L25 28L32 24L39 28L47 19L36 23L42 13L34 16Z" fill="#44a84c"/><ellipse cx="22" cy="32" rx="7" ry="4" fill="#ffb5a4" opacity=".75" stroke="none"/><path d="M17 40Q20 49 29 51" stroke="#ffb1a2" stroke-width="2" fill="none"/>`,
    melon:c=>`<path d="M9 40Q13 11 32 9Q51 12 55 40Q34 63 9 40Z" fill="${c||'#6abf52'}"/><path d="M15 39Q19 17 32 16Q45 18 49 39Q34 53 15 39Z" fill="#f5e9bd"/><path d="M19 39Q22 22 32 21Q42 23 45 39Q33 49 19 39Z" fill="#f59b75"/><g fill="#4b4736" stroke="none"><ellipse cx="25" cy="33" rx="1.6" ry="3"/><ellipse cx="32" cy="29" rx="1.6" ry="3"/><ellipse cx="38" cy="35" rx="1.6" ry="3"/><ellipse cx="31" cy="39" rx="1.6" ry="3"/></g>`,
    sprout:c=>`<path d="M32 59V32" stroke="#397e48" stroke-width="4"/><path d="M32 39Q7 40 10 15Q29 16 32 39Z" fill="${c||'#56bd67'}"/><path d="M33 31Q38 7 57 10Q57 29 33 31Z" fill="#78d96b"/><path d="M17 21L28 35M50 16L36 27" stroke="#d7ffc1" stroke-width="2" fill="none"/>`,
    leaf:c=>`<path d="M10 50Q6 16 51 9Q55 45 10 50Z" fill="${c||'#4cbb65'}"/><path d="M10 50L48 14" stroke="#d9ffb6" stroke-width="2.5"/><path d="M22 39L18 28M32 29L31 20M31 31L43 31" stroke="#8de27e" stroke-width="2" fill="none"/>`,
    squid:c=>`<path d="M23 13Q32 4 41 13L45 36Q32 45 19 36Z" fill="${c||'#b080e8'}"/><path d="M24 36Q14 42 17 54M29 39Q24 47 28 59M35 39Q40 48 37 58M41 36Q51 42 47 54" stroke="${c||'#b080e8'}" stroke-width="5" stroke-linecap="round" fill="none"/><path d="M26 22L22 29M38 22L42 29" stroke="#fff" stroke-width="2" fill="none"/><circle cx="28" cy="29" r="3" fill="#fff"/><circle cx="38" cy="29" r="3" fill="#fff"/><circle cx="28" cy="29" r="1.5" fill="#231833" stroke="none"/><circle cx="38" cy="29" r="1.5" fill="#231833" stroke="none"/>`,
    shark:c=>`<path d="M5 34Q16 15 39 20L48 16L47 25L61 32L48 39L39 45Q17 48 5 34Z" fill="${c||'#668daf'}"/><path d="M26 23L32 8L41 22Z" fill="#47708f"/><path d="M24 43L31 55L38 43Z" fill="#47708f"/><path d="M50 31L60 25L59 32L60 39Z" fill="#47708f"/><path d="M12 34H45" stroke="#d9edf7" stroke-width="2"/><circle cx="15" cy="29" r="3" fill="#fff"/><circle cx="15" cy="29" r="1.5" fill="#10283d" stroke="none"/><path d="M20 37L24 35L28 38L32 35L36 37" fill="none" stroke="#f8fdff" stroke-width="1.7"/>`
  });

  /* Put new environments into the same background mechanism used by the existing views. */
  const oldBg=bg;
  bg=function(key,boss){
    if(key==='road')return '<div class="bgs rpg-art-bg rpg-road-bg" style="background-image:linear-gradient(180deg,#0615240a,#07142238),url(\''+RPG_ENV_ART.road+'\')"></div>';
    if(key==='fish')return '<div class="bgs rpg-art-bg rpg-water-bg" style="background-image:linear-gradient(180deg,#08233213,#061c2b29),url(\''+RPG_ENV_ART.fish+'\')"></div>';
    if(key==='mine')return '<div class="bgs rpg-art-bg rpg-mine-bg" style="background-image:linear-gradient(180deg,#06152310,#07142230),url(\''+RPG_ENV_ART.mine+'\')"></div>';
    return oldBg(key,boss);
  };

  /* Make Farm compact: six columns gives twelve plots in two short rows. */
  /* Six caves, each with its own unlock level, mineral mix and rarity profile. */
  const caveDefs=[
    {id:'copper',tier:0,n:'Copperlight Quarry',l:1,special:'coal',color:'#a47c50',hue:0,tint:'#cf995044',desc:'Surface seams · common copper and coal',weights:[.91,.09,0,0,0],ore:.30,sp:.18,gem:.003,alt:null,metals:['copper','coal']},
    {id:'coalseam',tier:.5,n:'Coalseam Burrows',l:3,special:'coal',color:'#6d6258',hue:330,tint:'#8a7a6a44',desc:'Black seams · coal-rich with copper and iron',weights:[.62,.38,0,0,0],ore:.30,sp:.30,gem:.004,alt:null,metals:['coal','copper','iron']},
    {id:'iron',tier:1,n:'Ironheart Deep Mine',l:5,special:'coal',color:'#586776',hue:12,tint:'#8597a844',desc:'Deep veins · iron-rich with copper by-products',weights:[.24,.68,.08,0,0],ore:.34,sp:.16,gem:.006,alt:null,metals:['copper','iron','coal']},
    {id:'silverfall',tier:1.6,n:'Silverfall Tunnel',l:8,special:'coal',color:'#7a8aa0',hue:20,tint:'#b5c8e044',desc:'Glittering veins · silver and iron',weights:[.08,.35,.55,.02,0],ore:.35,sp:.15,gem:.01,alt:'crystal',metals:['iron','silver','coal']},
    {id:'moon',tier:2,n:'Moonstone Gallery',l:10,special:'crystal',color:'#685b98',hue:42,tint:'#9b7edc44',desc:'Silver seams · crystals and rare gold',weights:[.05,.25,.62,.08,0],ore:.36,sp:.15,gem:.014,alt:'coal',metals:['iron','silver','gold','crystal']},
    {id:'goldrush',tier:2.5,n:'Goldrush Gulch',l:13,special:'coal',color:'#a8873a',hue:55,tint:'#f2c85044',desc:'Golden seams · gold and silver nuggets',weights:[.05,.12,.33,.5,0],ore:.37,sp:.14,gem:.016,alt:'crystal',metals:['silver','gold','coal','crystal']},
    {id:'crystal',tier:3,n:'Crystal Veil Cavern',l:16,special:'crystal',color:'#345d9c',hue:82,tint:'#5dbbff38',desc:'Gold and silver · mithril traces',weights:[.02,.16,.43,.34,.05],ore:.39,sp:.16,gem:.025,alt:'coal',metals:['silver','gold','mithril','crystal']},
    {id:'frostvein',tier:3.5,n:'Frostvein Grotto',l:19,special:'crystal',color:'#5aa0c8',hue:110,tint:'#8fe0ff3a',desc:'Icy caverns · mithril and crystal',weights:[0,.08,.27,.38,.27],ore:.39,sp:.18,gem:.022,alt:'coal',metals:['gold','mithril','crystal']},
    {id:'magma',tier:4,n:'Magma Vault',l:22,special:'obsidian',color:'#9b4b37',hue:164,tint:'#fb743c3d',desc:'Volcanic minerals · gold, mithril and obsidian',weights:[0,.06,.18,.38,.38],ore:.41,sp:.17,gem:.03,alt:'crystal',metals:['gold','mithril','obsidian','crystal']},
    {id:'abyss',tier:5,n:'Obsidian Abyss',l:26,special:'starstone',color:'#623e8c',hue:220,tint:'#cf79ff35',desc:'Legendary depths · mithril, obsidian and starstone',weights:[0,.02,.12,.28,.58],ore:.43,sp:.13,gem:.035,alt:'obsidian',star:.008,metals:['mithril','gold','obsidian','starstone']},
    {id:'starfall',tier:5.5,n:'Starfall Crater',l:30,special:'obsidian',color:'#4a3f8a',hue:250,tint:'#a58cff3a',desc:'Meteor ruins · mithril and starstone',weights:[0,0,.08,.3,.62],ore:.44,sp:.13,gem:.04,alt:'crystal',star:.014,metals:['mithril','obsidian','starstone']},
    {id:'dragon',tier:6,n:'Dragon\u2019s Hoard',l:26,special:'obsidian',color:'#8a3a3a',hue:190,tint:'#ff5a4a3a',desc:'Treasure lair · gold, mithril and gems',weights:[0,0,.05,.4,.55],ore:.46,sp:.13,gem:.05,alt:'crystal',star:.006,metals:['gold','mithril','obsidian','agem']}
  ];
  ZN.splice(0,ZN.length,...caveDefs.map(c=>[c.n,c.l,c.special,c.color,c.id,c.tier]));
  {const legacy=['copper','iron','moon','crystal','magma','abyss'];
   if(!S.mzId)S.mzId=legacy[S.mz]||'copper';
   S.mz=Math.max(0,caveDefs.findIndex(c=>c.id===S.mzId));S.mzId=caveDefs[S.mz].id;}
  const mineLevelOK=i=>L('mine')>=ZN[i][1];
  function weightedOre(weights){
    let entries=weights.map((w,i)=>({i,w:(L('mine')>=ORE_L[i]?w:0)})).filter(x=>x.w>0);
    if(!entries.length)entries=[{i:0,w:1}];
    const total=entries.reduce((a,x)=>a+x.w,0);let r=Math.random()*total;
    for(const x of entries){r-=x.w;if(r<=0)return x.i}
    return entries[entries.length-1].i;
  }
  newGrid=function(){
    const z=Math.min(Math.max(0,S.mz||0),caveDefs.length-1),c=caveDefs[z],floor=Math.max(1,S.mf||1);
    const oreChance=Math.min(.57,c.ore+Math.min(.12,(floor-1)*.012));
    const gemChance=Math.min(.09,c.gem+Math.min(.04,(floor-1)*.002));
    mgrid=Array.from({length:MG_N},()=>{
      const r=Math.random();let kind='stone',rarity='common';
      if(c.star&&r<c.star){kind='starstone';rarity='legendary'}
      else if(r<oreChance){const oi=weightedOre(c.weights);kind='ore'+oi;rarity=oi>=3?'rare':oi===2?'uncommon':'common'}
      else if(r<oreChance+c.sp){kind=c.special;rarity=['crystal','obsidian','starstone'].includes(kind)?'rare':'common'}
      else if(r<oreChance+c.sp+gemChance){kind='gem';rarity='epic'}
      else if(c.alt&&r<oreChance+c.sp+gemChance+.035){kind=c.alt;rarity='uncommon'}
      const ore=kind.startsWith('ore');
      const base=2+c.tier*2+Math.floor((floor-1)/3);
      const hp=Math.max(1,Math.round(base*(ore?1.5:['gem','starstone'].includes(kind)?2.15:kind==='stone'?1:1.25)*(1-Math.min(.4,.005*L('mine'))-.08*S.up.gloves)));
      const vein=ore&&Math.random()<.14+.004*L('mine');const hv=vein?hp*3:hp;return {c:kind,hp:hv,max:hv,rarity,vein};
    });
  };
  /* Keep all existing reward/XP/drop math in collect(); only the encounter return is wrapped below. */
  let mineAmbushActive=false,mineAmbushFloor=1;
  const oldTapTile=tapTile;
  tapTile=function(i){
    const tabBefore=S.tab,hadFight=!!fight;
    const result=oldTapTile(i);
    if(tabBefore==='mine'&&!hadFight&&fight&&S.tab==='fight'){
      mineAmbushActive=true;mineAmbushFloor=S.mf;
      say('Ambush! Defeat the creature; your mining floor will be waiting when the fight ends.');
    }
    return result;
  };
  const oldFoeDown=foeDown;
  foeDown=function(){
    const mineReturn=mineAmbushActive;
    const result=oldFoeDown.apply(this,arguments);
    if(mineReturn&&!fight){mineAmbushActive=false;S.tab='mine';say('The tunnel is clear. Back to mining — floor '+mineAmbushFloor+'.');save();render();}
    return result;
  };
  const oldPlayerDown=playerDown;
  playerDown=function(){
    const mineReturn=mineAmbushActive;const result=oldPlayerDown.apply(this,arguments);
    if(mineReturn){mineAmbushActive=false;S.tab='mine';say('You recover and return to the mine. The floor is unchanged.');save();render();}
    return result;
  };
  const oldFlee=flee;
  flee=function(){
    const mineReturn=mineAmbushActive;const result=oldFlee.apply(this,arguments);
    if(mineReturn&&!fight){mineAmbushActive=false;S.tab='mine';say('You escaped the ambush and returned to the same mining floor.');save();render();}
    return result;
  };

  /* Replace the old road glyph with a clickable adventure panorama, preserving all dungeon flows. */
  const oldFightView=VIEWS.fight;
  VIEWS.fight=function(){
    if(fight){
      const html=oldFightView();
      return mineAmbushActive?'<div class="rpg-ambush-note">⚔ MINING AMBUSH · Victory, defeat or retreat returns you to your current cave floor.</div>'+html:html;
    }
    if(S.dg)return oldFightView();
    const list=DG.filter(d=>L('combat')>=d.l).map(d=>'<button class="rec rpg-dungeon-row" data-a="dgin" data-i="'+d.id+'">'+mon((FOES.find(f=>f.n===d.final)||FOES[0]).a,'ic')+'<div><b>'+d.n+'</b><small>Recommended combat level '+d.l+'+. '+DGR.length+' rooms, elite foes, a boss and a treasure chest.</small><small>Cleared ×'+(S.clears[d.id]||0)+'</small></div><span class="tag">Enter</span></button>').join('');
    return skillBar('combat')+'<div class="stage s-road rpg-road-stage" id="stg">'+bg('road')+'<div class="rpg-road-shade"></div><div class="rpg-road-badge">✦ EXPLORE · FIGHT · GROW ✦</div><div class="rpg-road-content"><div class="rpg-road-kicker">The world is calling</div><h2>Beyond the Old Road</h2><p>Follow the winding trail through wild valleys, forgotten ruins and dangerous places. Every step can reveal treasure — or a monster.</p><button class="btn" data-a="explore">Begin the journey ↗</button></div></div><div class="ttl">Choose a dungeon</div>'+(list?'<div class="col">'+list+'</div>':'<p class="h">Wander the road to grow stronger. Dungeons unlock as your Combat level rises.</p>')+hud(false);
  };

  /* Fishing becomes a proper riverside minigame with specific fish silhouettes and natural bobbing. */
  VIEWS.fish=function(){
    school=[];combo=0;spawnT=0;
    const idx=Math.min(Math.max(0,S.fz||0),ZF.length-1),z=ZF[idx];
    const labels=['Pond','Mountain River','Open Sea','Abyssal Trench'];
    const desc=['Small fish gather near the reeds.','Fast river fish dart around the dock.','Heavier sea fish swim in broader arcs.','Rare deepwater creatures glow below the surface.'];
    const zones='<div class="rpg-water-zones">'+ZF.map((q,i)=>'<button class="rpg-water-zone '+(idx===i?'on':'')+'" data-x="fz" data-i="'+i+'" '+(L('fish')>=q[1]?'':'disabled')+'>'+icon(['fish','river','shark','kraken'][i],['#8fd9ec','#5ab8d1','#8cb5e6','#b28bff'][i])+'<b>'+labels[i]+'</b><small>'+(L('fish')>=q[1]?'Fish Lv '+q[1]+'+':'Unlock at Lv '+q[1])+'</small></button>').join('')+'</div>';
    const names=poolFish().slice(0,4).map(f=>'<span class="rpg-fish-loot">'+fIcon(f,'ic')+' '+f.n+'</span>').join('');
    return '<div id="fskill">'+skillBar('fish')+'</div>'+zones+'<div class="stage s-fish rpg-fish-stage rpg-water-'+idx+'" id="stg" style="--rpg-water-hue:'+z[3]+'deg;--rpg-water-bright:'+z[4]+'">'+bg('fish').replace('rpg-water-bg','rpg-water-bg rpg-biome-'+idx)+'<div class="rpg-fish-atmosphere"></div><div class="rpg-fish-title"><span>🎣 '+labels[idx]+' fishing grounds</span><span>Fishing Lv '+L('fish')+'</span></div><div id="lake"></div><div class="rpg-fish-hint"><b>Watch the water</b><br>Tap a fish while it swims through the lake. Chain quick catches to build a combo.<br>'+names+'</div><div id="combo">Combo ×0</div></div>';
  };
  spawnFish=function(){
    const lk=$('lake');if(!lk||S.tab!=='fish')return;
    const available=poolFish();if(!available.length)return;
    const f=available[Math.floor(Math.pow(Math.random(),.62/(1+.25*S.up.lure))*available.length)];
    const w=lk.clientWidth||360,dir=Math.random()<.5?1:-1;
    const b=document.createElement('button');b.className='swim rpg-swimmer';b.dataset.a='catch';b.dataset.i=f.id+':'+Math.random().toString(36).slice(2,7);
    const sz=Math.min(94,68+S.up.rod*3.5+Math.max(0,f.l-1)*.65);b.style.width=b.style.height=sz+'px';
    const top=52+Math.random()*24;b.style.top=top+'%';b.style.animationDelay=(-Math.random()*1.2)+'s';b.setAttribute('aria-label','Catch '+f.n);b.title=f.n;
    b.innerHTML=fIcon(f,'fish-art');
    const s={f,id:b.dataset.i,x:dir>0?-sz-16:w+16,v:dir*(54+f.l*7+Math.random()*28),el:b,dir,baseTop:top,phase:Math.random()*Math.PI*2,sz,amp:1.8+Math.random()*2.4};
    lk.appendChild(b);school.push(s);
  };
  /* Separate animation layer gives fish a smooth swimming bob while the existing game loop handles horizontal travel. */
  function fishMotion(t){
    if(school.length){for(const f of school){if(f.el&&f.el.isConnected){f.el.style.top=(f.baseTop+Math.sin(t*.0023+f.phase)*f.amp+Math.sin(t*.0041+f.phase)*.7)+'%';f.el.style.setProperty('--rpg-swim-tilt',(Math.sin(t*.002+f.phase)*2)+'deg');}}}
    requestAnimationFrame(fishMotion);
  }
  requestAnimationFrame(fishMotion);

  const digChance=()=>Math.min(.4,.07+.004*L('mine')+.02*S.up.lantern);
  window.__mineDig=function(){
    if(Math.random()>digChance())return;
    const c=caveDefs[S.mz],r=Math.random();let id;
    if(r<.6)id=ORES[weightedOre(c.weights)].id;
    else if(r<.93)id=c.special==='starstone'?'obsidian':c.special;
    else id=(r<.97&&c.gem>=.014)?'agem':'coal';
    const q=Math.random()<.004*L('mine')+.06*S.up.lantern?2:1;
    S.inv[id]=inv(id)+q;addXp('mine',3);
    toast('Dug up <b>'+q+' '+nm(id)+'</b>','bonus',rar(id)[1]);say('Your strike dug up '+q+' '+nm(id)+'!');
  };
  /* Repaint mine view with cave cards, a cinematic cavern, and polished, clickable mineral tiles. */
  const mineWalk=(done)=>{const scene=document.querySelector('#pane');if(!scene){done();return}scene.classList.add('mine-walk-out');try{mineStepSound()}catch(_){}setTimeout(()=>{scene.classList.remove('mine-walk-out');done();},720)};
 window.__mineImpact=(el,breaks)=>{const scene=el.closest('.rpg-mine-scene');if(!scene)return;scene.classList.remove('mine-hit','mine-break');void scene.offsetWidth;scene.classList.add(breaks?'mine-break':'mine-hit');const box=el.getBoundingClientRect();for(let i=0;i<(breaks?18:9);i++){const q=document.createElement('i');q.className='mine-spark';q.style.left=(box.left+box.width/2)+'px';q.style.top=(box.top+box.height*.48)+'px';q.style.setProperty('--sx',(Math.random()*130-65)+'px');q.style.setProperty('--sy',(Math.random()*-100-12)+'px');q.style.setProperty('--h',(35+Math.random()*35)+'deg');document.body.appendChild(q);setTimeout(()=>q.remove(),650)}};
 const mineAudio=()=>RA.ready();
 const mineClink=(broken)=>{const c=mineAudio();if(!c)return;const t=c.currentTime,o=c.createOscillator(),g=c.createGain();o.type='triangle';o.frequency.setValueAtTime(broken?760:390,t);o.frequency.exponentialRampToValueAtTime(broken?190:125,t+.12);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.12,t+.008);g.gain.exponentialRampToValueAtTime(.0001,t+.19);o.connect(g).connect(RA.out());o.start(t);o.stop(t+.2);const n=c.createBufferSource(),b=c.createBuffer(1,c.sampleRate*.12,c.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/d.length,3);n.buffer=b;const f=c.createBiquadFilter(),ng=c.createGain();f.type='highpass';f.frequency.value=broken?1200:650;ng.gain.value=.055;n.connect(f).connect(ng).connect(RA.out());n.start(t)};
 const mineStepSound=()=>{const c=mineAudio();if(!c)return;const t=c.currentTime,o=c.createOscillator(),g=c.createGain();o.type='sine';o.frequency.setValueAtTime(115,t);o.frequency.exponentialRampToValueAtTime(65,t+.18);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.07,t+.02);g.gain.exponentialRampToValueAtTime(.0001,t+.22);o.connect(g).connect(RA.out());o.start(t);o.stop(t+.23)};
 VIEWS.mine=function(){
    mineEnsure();
    const zi=Math.min(Math.max(0,S.mz||0),caveDefs.length-1),z=caveDefs[zi];
    const caveCards=caveDefs.map((c,i)=>!mineLevelOK(i)?'':'<button class="rpg-cave-card '+(i===zi?'on':'')+'" data-x="mz" data-i="'+i+'" style="--cave-hue:'+c.hue+'deg;--cave-tint:'+c.tint+'" '+(mineLevelOK(i)?'':'disabled')+'><b>'+(mineLevelOK(i)?c.n:'🔒 '+c.n)+'</b><small>'+(mineLevelOK(i)?'Mining Lv '+c.l+'+':'Requires Mining Lv '+c.l)+'</small><span class="rpg-cave-metals">'+caveDefs[i].metals.map(id=>gIcon(id,'ic')).join('')+'</span></button>').join('');
    const tiles=mgrid.map((t,i)=>{
      const mined=t.hp<=0;
      const id=t.c.startsWith('ore')?ORES[+t.c.slice(3)].id:t.c==='stone'?null:t.c==='gem'?'agem':t.c;
      const kind=t.rarity==='epic'||t.rarity==='legendary'?'rare':t.c.startsWith('ore')?'ore':t.c==='stone'?'stone':'special';
      return '<button class="rpg-minetile '+(mined?'rpg-mined':'')+(t.vein?' v4vein':'')+'" data-x="mt" data-i="'+i+'" data-kind="'+kind+'" style="--cr:'+(mined?0:(1-Math.max(0,t.hp)/t.max).toFixed(2))+'" '+(mined?'disabled':'')+' title="'+(id?nm(id):'Rock')+' · '+(mined?'Mined':Math.max(1,t.hp)+' durability')+'">'+(id?gIcon(id,'ic'):icon('stone','#858b97','ic'))+(mined?'':'<span class="rpg-tile-hp"><i style="width:'+Math.max(0,t.hp/t.max*100)+'%"></i></span>')+'</button>';
    }).join('');
    
    return skillBar('mine')+'<div class="ttl">Choose your mine</div><div class="rpg-cave-picker">'+caveCards+'</div>'+(window.V4&&V4.nextMine?V4.nextMine():'')+'<div class="rpg-mine-scene" style="--mine-hue:'+z.hue+'deg;--mine-tint:'+z.tint+'"><div class="rpg-mine-art"></div><div class="rpg-mine-heading"><div><b>⛏ '+z.n+'</b><small>'+z.desc+'</small></div><span class="rpg-mine-floor">FLOOR '+S.mf+'</span></div><div class="rpg-mine-readout"><span>Mining power <b>'+item('p').pw+'</b></span><span>Dig chance <b>'+Math.round(digChance()*100)+'%</b></span><span>Veins: <b>'+z.metals.map(nm).join(' · ')+'</b></span></div><div class="rpg-mine-grid">'+tiles+'</div><div class="rpg-mine-tools"><button class="btn '+(S.mmode==='pick'?'':'alt')+'" data-x="mm" data-i="pick">⛏ Pickaxe</button><button class="btn '+(S.mmode==='blast'?'':'alt')+'" data-x="mm" data-i="blast">💥 Blast · Coal ×'+inv('coal')+'</button></div><p class="rpg-mine-help">Your cave floors are saved: switching shafts never resets them. Every strike has a chance to dig up an extra resource. Break every tile to descend. Harder caves contain less common copper and iron, but increase the chance of silver, gold, mithril, crystals, obsidian and legendary starstone.</p></div>';
  };

  /* Re-render only after the chosen cave/mining mode/tile event has been handled by its original listeners. */
  const oldCatchFish=catchFish;
  catchFish=function(key){
    const fish=school.find(x=>x.id===key);
    if(fish&&fish.el){fish.el.classList.add('rpg-caught');fish.el.setAttribute('aria-label','Caught '+fish.f.n);}
    return oldCatchFish(key);
  };

  if(typeof render==='function')render();
  window.__rpgGameEnhancementsReady=true;
})();
