/* ===== Imported non-mining skill tree + forestry systems (adapted) ===== */
/* ================================================================
   part G · v5 overhaul
   1) skill tree (no class section, lower percentages, many more nodes)
   2) bars are smelted on a timer, levels spread far apart, slower smithing XP
   3) woodcutting: choose forest + tree type first, new interactive chopping
   4) fishing animations that also run on phones
   ================================================================ */
const nl=k=>(S.sk&&S.sk[k])||0;
const f1=v=>Math.round(v*10)/10;
const ani=(el,kf,opt)=>{try{return el&&el.animate?el.animate(kf,opt):null}catch(_){return null}};
const sfx=n=>{try{SFX[n]&&SFX[n]()}catch(_){}};
const v5style=document.createElement('style');v5style.id='v5css';
v5style.textContent=`
/* ---- skill tree ---- */
.u5-intro{font-size:12px;color:var(--mute);margin:2px 0 6px;line-height:1.45}
.u5-chips{display:flex;gap:6px;overflow-x:auto;padding:2px 0 8px;-webkit-overflow-scrolling:touch}
.u5-chip{flex:0 0 auto;display:flex;flex-direction:column;align-items:center;gap:1px;min-width:76px;padding:6px 8px;border:2px solid var(--line);border-radius:12px;background:var(--card);color:inherit;font:inherit;font-size:11px;cursor:pointer}
.u5-chip .ic{width:26px;height:26px}.u5-chip small{color:var(--mute);font-size:10px}
.u5-chip.on{border-color:#ffd778;box-shadow:0 0 0 1px #ffd77866}
.u5-tl{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#ffd778;margin:6px 0 6px;display:flex;align-items:center;gap:8px}
.u5-tl:after{content:'';flex:1;height:1px;background:linear-gradient(90deg,#ffd77866,transparent)}
.u5-row{display:grid;grid-template-columns:repeat(auto-fit,minmax(175px,1fr));gap:8px}
.u5-link{height:16px;margin:2px auto 0;width:2px;background:linear-gradient(#ffd77899,#ffd77822)}
.u5-n{position:relative;border:2px solid var(--line);border-radius:12px;background:var(--card);padding:8px 9px;display:flex;flex-direction:column;gap:3px}
.u5-n.lock{opacity:.6}.u5-n.maxd{border-color:#ffd778;background:linear-gradient(160deg,#2a2013,#16110a)}
.u5-n .top{display:flex;align-items:center;gap:8px}.u5-n .top .ic{width:30px;height:30px;flex:none}
.u5-n .top b{font-size:13px;line-height:1.15}
.u5-pips{display:flex;gap:3px;flex-wrap:wrap}.u5-pips i{width:11px;height:11px;border-radius:50%;border:2px solid var(--line)}
.u5-pips i.f{background:#ffd778;border-color:#ffd778}
.u5-n .d{font-size:11.5px;color:var(--mute);line-height:1.3}
.u5-n .now{font-size:11.5px;color:#8fe3a2;font-weight:700}
.u5-n .rq{font-size:10.5px;color:#ff8a7a;line-height:1.3}
.u5-n .btn{padding:6px 8px;font-size:12px;margin-top:2px}
.u5-n .btn[disabled]{opacity:.5;cursor:default}
/* ---- woodcutting ---- */
.w5-head h3{margin:6px 0 2px;font-size:18px;color:#ffe0a0}
.w5-fgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:8px;margin:8px 0}
.w5-f{position:relative;overflow:hidden;border:2px solid var(--line);border-radius:14px;min-height:118px;padding:0;color:#fff;font:inherit;text-align:left;cursor:pointer;display:flex;flex-direction:column;justify-content:flex-end;background:#0a1220}
.w5-f .pic{position:absolute;inset:0;background-size:cover;background-position:center}
.w5-f .pic:after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,#0000 10%,#000d 100%)}
.w5-f .tx{position:relative;padding:8px 10px;display:flex;flex-direction:column;gap:2px}
.w5-f b{font-size:15px;text-shadow:0 1px 3px #000}
.w5-f .ty{font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:#ffe0a0}
.w5-f small{font-size:11px;color:#e6efe0;text-shadow:0 1px 2px #000;line-height:1.3}
.w5-f.on{border-color:#ffd778;box-shadow:0 0 0 2px #ffd77866,0 0 16px #ffc75b55}
.w5-f.lk{cursor:default}.w5-f.lk .pic{filter:grayscale(.9) brightness(.5)}
.w5-f .lv{position:absolute;right:8px;top:8px;z-index:1;font-size:11px;font-weight:800;background:#000a;border:1px solid #ffd77888;border-radius:8px;padding:2px 7px}
.w5-sel{border:2px solid #8a7049;border-radius:14px;background:linear-gradient(145deg,#2a2013,#16110a);padding:10px;margin:6px 0}
.w5-sel h4{margin:0 0 2px;font-size:15px;color:#ffe0a0}.w5-sel p{margin:0 0 8px;font-size:12px;color:var(--mute)}
.w5-sps{display:grid;grid-template-columns:repeat(auto-fill,minmax(112px,1fr));gap:6px;margin-bottom:10px}
.w5-sp{display:flex;align-items:center;gap:6px;text-align:left;border:2px solid var(--line);border-radius:10px;background:var(--card);color:inherit;font:inherit;font-size:12px;padding:5px 7px;cursor:pointer}
.w5-sp .ic{width:28px;height:28px;flex:none}.w5-sp small{display:block;color:var(--mute);font-size:10px}
.w5-sp.on{border-color:#ffd778;box-shadow:0 0 0 1px #ffd77866}.w5-sp.lk{opacity:.45;cursor:default}
.w5-bar{display:flex;align-items:center;gap:8px;margin:6px 0}
.w5-bar .info{flex:1;min-width:0;font-size:12px;color:var(--mute)}.w5-bar .info b{color:#ffe0a0}
.w5-bar .btn{padding:6px 10px;font-size:12px}
.w5-stage{position:relative;height:360px;border:3px solid #8a7049;border-radius:18px;overflow:hidden;background:#0a1220;touch-action:manipulation;-webkit-user-select:none;user-select:none;cursor:pointer;isolation:isolate;box-shadow:0 10px 28px #0006}
.w5-bg{position:absolute;inset:0;background-size:cover;background-position:center;z-index:0}
.w5-bg:after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,#07101d10 0%,#07101d30 55%,#07101d88 100%)}
.w5-rays{position:absolute;inset:0;z-index:1;pointer-events:none;background:linear-gradient(110deg,transparent 18%,#fff3b022 30%,transparent 42%,#fff3b016 56%,transparent 68%)}
.w5-amb{position:absolute;inset:0;z-index:2;pointer-events:none;overflow:hidden}
.w5-leaf{position:absolute;width:9px;height:6px;border-radius:50% 0;top:-10px;pointer-events:none}
.w5-hpbar{position:absolute;left:25%;right:25%;top:10px;height:12px;border-radius:7px;background:#0008;border:2px solid #241a35;overflow:hidden;z-index:5}
.w5-hpbar i{display:block;height:100%;background:linear-gradient(#7fe08a,#2f9b5a);transition:width .15s}
.w5-name{position:absolute;top:28px;left:0;right:0;text-align:center;color:#fff;font-weight:800;text-shadow:0 1px 3px #000;font-size:13px;z-index:5;pointer-events:none}
.w5-tree{position:absolute;left:50%;bottom:6px;width:210px;height:250px;margin-left:-105px;transform-origin:50% 100%;z-index:3;pointer-events:none}
.w5-tree svg{width:100%;height:100%;overflow:visible}
.w5-notches{position:absolute;inset:0;pointer-events:none}
.w5-notch{position:absolute;height:9px;border-radius:2px;background:linear-gradient(#2b1608,#8a5a2a 60%,#d9a868);box-shadow:inset 0 1px 2px #000a}
.w5-tgt{position:absolute;width:52px;height:52px;margin:-26px 0 0 -26px;pointer-events:none;z-index:6;display:none}
.w5-tgt:before{content:'';position:absolute;inset:14px;border-radius:50%;background:radial-gradient(circle,#fff,#ffd84d 60%,#ff8a1a);box-shadow:0 0 10px #ffd84d}
.w5-tgt .rg{position:absolute;inset:0;border-radius:50%;border:3px solid #fff;box-shadow:0 0 8px #fff;transform:scale(2.4)}
.w5-tgt .rg.go{border-color:#7dffb0;box-shadow:0 0 14px #7dffb0}
.w5-axe{position:absolute;right:6%;bottom:44px;width:120px;height:120px;transform:scaleX(-1) rotate(-12deg);transform-origin:80% 90%;pointer-events:none;z-index:7;filter:drop-shadow(0 4px 4px #0008)}
.w5-axe .ic{width:100%;height:100%}
.w5-streak{position:absolute;left:8px;top:40px;font-weight:900;font-size:13px;color:#ffd84d;text-shadow:0 2px 3px #000;z-index:6;pointer-events:none;line-height:1.35}
.w5-msg{position:absolute;left:0;right:0;bottom:8px;text-align:center;font-size:12px;color:#fff;text-shadow:0 1px 3px #000;z-index:6;pointer-events:none;padding:0 8px}
.w5-nest{position:absolute;z-index:8;width:46px;height:46px;margin:-23px 0 0 -23px;border:0;background:none;padding:0;cursor:pointer}
.w5-nest:before{content:'';position:absolute;inset:-5px;border-radius:50%;border:2px dashed #ffe9a8}
.w5-nest svg{width:100%;height:100%;filter:drop-shadow(0 2px 3px #000)}
.w5-dodge{position:absolute;z-index:8;left:10px;bottom:46px;padding:12px 18px;font:inherit;font-weight:900;border:3px solid #fff;border-radius:14px;background:#d6334f;color:#fff;font-size:16px;box-shadow:0 4px 0 #6a0f20;cursor:pointer}
.w5-warn{position:absolute;z-index:6;left:0;right:0;top:50px;text-align:center;font-weight:900;font-size:18px;color:#ff6b6b;text-shadow:0 2px 4px #000;pointer-events:none}
.w5-shadow{position:absolute;bottom:12px;width:70px;height:14px;border-radius:50%;background:#000b;z-index:2;pointer-events:none;margin-left:-35px}
.w5-branch{position:absolute;width:90px;height:12px;border-radius:6px;background:linear-gradient(#5a3a1e,#8a5a2a);z-index:7;pointer-events:none;margin-left:-45px;border:2px solid #241a35}
.w5-fx{position:absolute;pointer-events:none;font-weight:900;font-size:20px;color:#fff;text-shadow:0 2px 4px #000;z-index:9;white-space:nowrap}
.w5-fx.crit{color:#ffd84d;font-size:26px}
.w5-ban{position:absolute;left:0;right:0;text-align:center;font-weight:900;font-size:34px;color:#ffd84d;text-shadow:0 3px 0 #5a2a00,0 0 10px #000;z-index:9;pointer-events:none;letter-spacing:2px}
.w5-chip{position:absolute;width:8px;height:5px;border-radius:2px;pointer-events:none;z-index:6}
.w5-dust{position:absolute;width:26px;height:18px;border-radius:50%;background:#d9c7a0;opacity:.7;pointer-events:none;z-index:4}
.w5-log{position:absolute;width:34px;height:34px;pointer-events:none;z-index:9}.w5-log .ic{width:100%;height:100%}
.w5-enter{position:absolute;inset:0;z-index:20;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#050b14;color:#ffe0a0;text-align:center;pointer-events:none}
.w5-enter b{font-size:24px;letter-spacing:1px}.w5-enter small{color:#b9d2e3;margin-top:4px}
.w5-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0}
.w5-stats div{border:1px solid var(--line);border-radius:10px;background:var(--card);text-align:center;padding:5px 2px;font-size:10px;color:var(--mute)}
.w5-stats b{display:block;font-size:15px;color:var(--ink)}
.w5-logs{display:flex;flex-wrap:wrap;gap:6px}
.w5-logs span{display:inline-flex;align-items:center;gap:4px;font-size:11px;padding:3px 7px;border-radius:8px;background:#0006;border:1px solid var(--line)}
.w5-logs .ic{width:20px;height:20px}
/* ---- smelter ---- */
.s5-furn{border:2px solid #8a7049;border-radius:12px;background:linear-gradient(135deg,#2a2013,#16110a);padding:8px 10px;margin:6px 0;font-size:12px}
.s5-furn b{color:#ffe0a0}
.smelt-row .rec[disabled],.smelt-row .btn[disabled]{opacity:.5}
`;
document.head.appendChild(v5style);

