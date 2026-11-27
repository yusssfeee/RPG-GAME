
(()=>{
 'use strict';
 const art=window.__RPG_PIXEL_CROP_ART;
 if(!art)return;
 const byName={Radish:'radish',Wheat:'wheat',Herbs:'herb',Pumpkin:'pumpkin',Tomato:'tomato',Melon:'melon',Hay:'hay',Clover:'clover',Corn:'corn',Potato:'potato',Turnip:'turnip',Cabbage:'cabbage',Garlic:'garlic',Strawberry:'strawberry',Rice:'rice',Grapes:'grapes',Apple:'apple'};
 const aliases={carrot:'radish',radish:'radish',wheat:'wheat',herb:'herb',herbs:'herb',pumpkin:'pumpkin',tomato:'tomato',melon:'melon',hay:'hay',leaf:'clover',clover:'clover',corn:'corn',potato:'potato',turnip:'turnip',cabbage:'cabbage',garlic:'garlic',strawberry:'strawberry',rice:'rice',grapes:'grapes',apple:'apple'};
 const seedButtons=[...document.querySelectorAll('#seeds .seed')];
 seedButtons.forEach(b=>{
   const label=(b.querySelector('div')?.textContent||'').trim();
   const key=byName[label],seedKey=window.__RPG_SEED_ICON_BY_CROP&&window.__RPG_SEED_ICON_BY_CROP[label],src=(seedKey&&window.__RPG_SEED_ICON_ASSETS&&window.__RPG_SEED_ICON_ASSETS[seedKey])||(key&&art[key]&&art[key][0]);
   if(!src)return;
   const img=document.createElement('img');
   img.className='crop-seed-art';img.alt=label;img.draggable=false;img.decoding='async';img.src=src;
   const old=b.firstElementChild;
   if(old)old.replaceWith(img);else b.insertBefore(img,b.firstChild);
 });
 // Update the crop catalog after all legacy/V4 code has finished changing its icon ids.
 try{if(typeof CROPS!=='undefined')CROPS.forEach(c=>{const k=byName[c.n];if(k&&art[k])c.ic='pixelcrop:'+k})}catch(_){ }
 // Other inventory/crafting references use the same newly-created artwork, not the old crop glyphs.
 try{if(typeof P!=='undefined')Object.entries(aliases).forEach(([name,key])=>{
   if(!art[key]||!art[key][3])return;
   const body='<image href="'+art[key][3]+'" x="0" y="0" width="64" height="64" preserveAspectRatio="xMidYMid meet" image-rendering="pixelated"/>';
   P[name]=()=>body;P['spr:'+name]=()=>body;P['spr:c_'+key]=()=>body;P['spr:'+key]=()=>body;
 })}catch(_){ }
 // Re-render the active view so every occupied soil plot receives its four-stage sprite.
 try{if(typeof render==='function')render()}catch(_){ }
})();
