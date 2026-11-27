
(()=>{
  const art=window.__RPG_PIXEL_CROP_ART;
  if(!art)return;
  const byName={Radish:'radish',Wheat:'wheat',Herbs:'herb',Pumpkin:'pumpkin',Tomato:'tomato',Melon:'melon',Hay:'hay',Clover:'clover',Corn:'corn',Potato:'potato',Turnip:'turnip',Cabbage:'cabbage',Garlic:'garlic',Strawberry:'strawberry',Rice:'rice',Grapes:'grapes',Apple:'apple'};
  try{CROPS.forEach(c=>{const k=byName[c.n];if(k)c.ic='pixelcrop:'+k})}catch(e){}
  try{
    const svgFor=k=>'<image href="'+art[k][3]+'" x="0" y="0" width="64" height="64" preserveAspectRatio="xMidYMid meet" image-rendering="pixelated"/>';
    const aliases={carrot:'radish',wheat:'wheat',herb:'herb',pumpkin:'pumpkin',tomato:'tomato',melon:'melon',leaf:'clover',clover:'clover',hay:'hay',corn:'corn',potato:'potato',turnip:'turnip',cabbage:'cabbage',garlic:'garlic',strawberry:'strawberry',rice:'rice',grapes:'grapes',apple:'apple'};
    Object.entries(aliases).forEach(([alias,key])=>{
      if(!art[key])return;
      P[alias]=svgFor(key);P['spr:'+alias]=svgFor(key);
    });
    Object.entries(byName).forEach(([name,key])=>{
      const sid='c_'+key;
      P['spr:'+sid]=svgFor(key);P['spr:'+key]=svgFor(key);
    });
  }catch(e){}
  try{if(typeof render==='function')render()}catch(e){}
})();
