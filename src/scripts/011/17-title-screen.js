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

