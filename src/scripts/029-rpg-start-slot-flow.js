
(()=>{
 'use strict';
 const play=document.getElementById('play'), intro=document.getElementById('intro');
 if(!play||!intro)return;
 const style=document.createElement('style');
 style.textContent=`
 #rpg-slot-screen{position:fixed;inset:0;z-index:99999;background:radial-gradient(ellipse at 50% 8%,#355a78ed 0%,#14283bee 42%,#050d18fa 100%);display:flex;align-items:center;justify-content:center;padding:clamp(12px,3vw,28px);overflow:auto;color:#f7f2e7;pointer-events:auto}
 #rpg-slot-panel{width:min(960px,97vw);max-height:96vh;overflow:auto;padding:clamp(18px,3vw,34px);border:1px solid #d4ae6e;border-radius:24px;background:linear-gradient(150deg,#1d3449f7,#0b1726fa 72%);box-shadow:0 28px 100px #000d,inset 0 1px #ffffff20;text-align:center;position:relative;pointer-events:auto}
 #rpg-slot-panel h2{font:900 clamp(25px,4vw,36px) Georgia,serif;color:#ffe2a6;margin:0 0 9px}
 #rpg-slot-panel p{color:#c8d8e6;margin:0 auto 24px;max-width:560px;line-height:1.55;font-size:14px}
 .rpg-slot-grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px}
 .rpg-slot-card{border:1px solid #607b91;border-radius:17px;padding:16px 11px 13px;background:linear-gradient(155deg,#2a455d,#132438 78%);color:#fff;min-width:0;min-height:205px;display:flex;flex-direction:column;align-items:stretch;position:relative}
 .rpg-slot-emblem{width:48px;height:48px;border-radius:15px;margin:0 auto 10px;display:grid;place-items:center;font-size:25px;background:linear-gradient(145deg,#e8c47e,#936333)}
 .rpg-slot-card strong{display:block;color:#ffe0a0;font-size:17px;margin-bottom:5px}
 .rpg-slot-status{display:block;color:#c5d7e6;font-size:11px;line-height:1.4;min-height:31px;margin-bottom:12px}
 .rpg-slot-card button{display:block;width:100%;margin:4px 0;padding:10px 6px;border-radius:10px;border:1px solid #f0ce8d;background:linear-gradient(180deg,#d5a65c,#95602e);color:#1c1720;font-weight:900;font-size:12px;cursor:pointer;position:relative;z-index:2;pointer-events:auto}
 .rpg-slot-card button.secondary{background:linear-gradient(180deg,#55c69a,#217c65);border-color:#8ce2bd;color:#061b16}
 .rpg-slot-empty{border-style:dashed;background:linear-gradient(155deg,#1c3042,#101d2c)}
 #rpg-slot-back{margin-top:22px;background:#ffffff0b;color:#d8e5f1;border:1px solid #60788d;border-radius:10px;padding:10px 20px;cursor:pointer;pointer-events:auto}
 @media(max-width:760px){.rpg-slot-grid{grid-template-columns:repeat(3,minmax(0,1fr))}.rpg-slot-card{min-height:190px}}
 @media(max-width:520px){#rpg-slot-screen{align-items:flex-start}.rpg-slot-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}.rpg-slot-card{padding:13px 9px;min-height:184px}#rpg-slot-panel{margin:auto 0}}
 @media(max-width:350px){.rpg-slot-grid{grid-template-columns:1fr}.rpg-slot-card{min-height:0}}
 #intro:after{content:'';position:absolute;inset:0;z-index:1;pointer-events:none;background:linear-gradient(180deg,#050d1830 0%,#07111f12 38%,#07111f55 72%,#07111ff2 100%)}
 .intro-brand{top:clamp(34px,9vh,100px)}
 .intro-kicker{display:inline-block;padding:7px 13px;border:1px solid #f6d99a88;border-radius:30px;background:#07111f66}
 .intro-title{font-size:clamp(48px,12vw,86px);letter-spacing:2px}
 .intro-subtitle{letter-spacing:clamp(1px,.45vw,3px)}
 .intro-brand p{max-width:360px;font-size:clamp(13px,2vw,16px)}
 #intro .cta{padding-top:52px}
 #intro .cta .btn{min-height:58px;font-size:18px;letter-spacing:1px}
 #intro .cta .go{background:linear-gradient(180deg,#ffe7a5,#e7ae4f);color:#35210b;border-color:#fff0bd;box-shadow:0 5px 0 #76502a,0 12px 30px #0008}
 #intro .cta .go:before{content:'⚔  '}
 .intro-footnote{font-size:10px;letter-spacing:3px;color:#f5dcaeaa;margin:5px 0 0}
 `;
 document.head.appendChild(style);

 function showError(err){
   console.error('Campaign start flow:',err);
   let box=document.getElementById('rpg-start-error');
   if(!box){box=document.createElement('div');box.id='rpg-start-error';box.style.cssText='position:fixed;z-index:100000;left:12px;right:12px;bottom:12px;padding:12px;background:#541f25;color:white;border:1px solid #ff9b9b;border-radius:10px;text-align:center;font:14px system-ui';document.body.appendChild(box);}
   box.textContent='تعذر بدء اللعبة: '+(err&&err.message?err.message:'خطأ غير معروف')+' — أعد تحميل الصفحة وحاول مجددًا.';
 }
 function openSlots(){
   document.getElementById('rpg-slot-screen')?.remove();
   const screen=document.createElement('div');screen.id='rpg-slot-screen';
   const panel=document.createElement('div');panel.id='rpg-slot-panel';
   const cards=Array.from({length:SAVE_SLOT_COUNT},(_,i)=>{
     const n=i+1,raw=readSlot(n);let data=null,saved=false,stamp='A fresh world is waiting';
     try{data=JSON.parse(raw||'null');saved=!!(data&&data.plots&&data.plots.length===N);if(saved)stamp=(data.cls&&CLS[data.cls]?'Hero: '+CLS[data.cls].n+' · ':'')+'Saved adventure';}catch(e){}
     return `<article class="rpg-slot-card ${saved?'':'rpg-slot-empty'}"><div class="rpg-slot-emblem">${saved?'🛡️':'＋'}</div><strong>Save Slot ${n}</strong><small class="rpg-slot-status">${stamp}</small>${saved?`<button type="button" data-action="continue" data-slot="${n}">▶ Continue</button><button type="button" class="secondary" data-action="new" data-slot="${n}">Start New Game</button>`:`<button type="button" data-action="new" data-slot="${n}">＋ Create Adventure</button>`}</article>`;
   }).join('');
   panel.innerHTML=`<h2>Choose Your Adventure</h2><p>Pick one of your five worlds. Your progress is saved separately in each slot, so every adventure stays safe and independent.</p><div class="rpg-slot-grid">${cards}</div><button type="button" id="rpg-slot-back">← Back to title screen</button>`;
   screen.appendChild(panel);document.body.appendChild(screen);

   // Bind directly to each button; this avoids delegated-click conflicts with the game's global handlers.
   panel.querySelectorAll('[data-action]').forEach(btn=>{
     btn.addEventListener('click',e=>{
       e.preventDefault();e.stopPropagation();
       const n=Number(btn.dataset.slot),action=btn.dataset.action;
       try{
         if(!Number.isInteger(n)||n<1||n>SAVE_SLOT_COUNT)throw new Error('Invalid save slot');
         if(action==='continue'){
           activateCampaignSlot(n);
           screen.remove();
           intro.hidden=true;
           if(!S.cls||!CLS[S.cls]){S.cls=null;requestAnimationFrame(()=>clsPicker(true));}
           else {render();upd();}
           return;
         }
         if(readSlot(n)&&!window.confirm('Start a new adventure in Slot '+n+'? The saved progress in this slot will be replaced.'))return;
         try{save()}catch(_){}
         activeSaveSlot=n;
         try{localStorage.setItem('tinyacre-active-slot',String(n));localStorage.removeItem(slotKey(n));if(n===1)localStorage.removeItem('tinyacre-save');}catch(_){}
         S=freshCampaign();S.cls=null;hasSave=false;
         if(window.__resetMineExpedition)window.__resetMineExpedition();
         if(typeof mineLoad==='function')mineLoad();
         if(typeof newTree==='function')newTree();
         screen.remove();
         intro.hidden=true;
         requestAnimationFrame(()=>{try{clsPicker(true);}catch(err){showError(err);}});
       }catch(err){showError(err);}
     });
   });
   panel.querySelector('#rpg-slot-back').addEventListener('click',e=>{e.preventDefault();e.stopPropagation();screen.remove();});
 }
 // One capture handler only; do not stop propagation globally after opening the picker.
 play.addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();try{openSlots()}catch(err){showError(err)}},true);
 const oldNew=document.getElementById('newg');if(oldNew)oldNew.hidden=true;
 const picker=document.getElementById('save-slot-picker');if(picker)picker.style.display='none';
})();
