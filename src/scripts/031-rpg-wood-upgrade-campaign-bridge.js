
(function rpgWoodUpgradeCampaignBridge(){
  'use strict';
  const obj=v=>!!v&&typeof v==='object'&&!Array.isArray(v);
  const forests=['meadow','pine','marsh','ironwood','redwood','elder','frost','ash','spirit'];
  const trees=['any','oak','birch','maple','pine','willow','cedar','ironwood','redwood','elder','frostpine','ashwood','spiritwood'];
  const normalize=state=>{
    if(!obj(state))return state;
    if(!obj(state.w5))state.w5={f:'meadow',sp:'any'};
    if(!forests.includes(state.w5.f))state.w5.f='meadow';
    if(!trees.includes(state.w5.sp))state.w5.sp='any';
    if(window.V4&&V4.v5&&typeof V4.v5.installState==='function')V4.v5.installState(state);
    return state;
  };
  if(typeof S!=='undefined')S=normalize(S);
  if(typeof S_DEFAULTS!=='undefined'&&obj(S_DEFAULTS)){
    S_DEFAULTS.sk={};S_DEFAULTS.w5={f:'meadow',sp:'any'};
  }
  if(typeof freshCampaign==='function'){
    const base=freshCampaign;
    freshCampaign=function(){return normalize(base.apply(this,arguments));};
  }
  if(typeof hydrateCampaign==='function'){
    const base=hydrateCampaign;
    hydrateCampaign=function(){return normalize(base.apply(this,arguments));};
  }
  if(typeof activateCampaignSlot==='function'){
    const base=activateCampaignSlot;
    activateCampaignSlot=function(){const r=base.apply(this,arguments);if(typeof S!=='undefined')S=normalize(S);return r;};
  }
  window.__rpgWoodUpgradeBridgeReady=true;
})();
