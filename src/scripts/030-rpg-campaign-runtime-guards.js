
/* Keep extension-owned campaign state available after every New Game / Continue.
   This is deliberately outside Mine Expedition V7; the V7 script is left intact. */
(function rpgCampaignRuntimeGuards(){
  'use strict';
  const extensionDefaults={
    cv:{runs:[],sel:'meadow',stance:'bal',done:{},log:[]},
    jobs:{smith:null,carp:null},
    contracts:[],tmode:'map',wx:null,wz:0,
    bbr:0,bsel:0,bmode:'pet',bfeed:'hay',
    mz:0,mf:1,mmode:'pick',ms:{},fz:0
  };
  const validObject=v=>!!v&&typeof v==='object'&&!Array.isArray(v);
  const normalizeCampaign=state=>{
    if(!validObject(state))return state;
    if(!validObject(state.xp))state.xp={};
    ['cook','carp'].forEach(k=>{
      const n=Number(state.xp[k]);
      state.xp[k]=Number.isFinite(n)&&n>=0?n:0;
    });
    const cv=validObject(state.cv)?state.cv:{};
    state.cv={runs:[],sel:'meadow',stance:'bal',done:{},log:[],...cv};
    const routeIds=['meadow','wood','copper','coast','sand','iron','ember','frost','star'];
    if(!Array.isArray(state.cv.runs))state.cv.runs=[];
    state.cv.runs=state.cv.runs.filter(r=>validObject(r)&&routeIds.includes(r.r)&&Number.isFinite(Number(r.t0))&&Number.isFinite(Number(r.dur))&&Number(r.dur)>0);
    state.cv.runs.forEach(r=>{if(!['safe','bal','bold'].includes(r.st))r.st='bal';});
    if(!validObject(state.cv.done))state.cv.done={};
    if(!Array.isArray(state.cv.log))state.cv.log=[];
    if(!routeIds.includes(state.cv.sel))state.cv.sel='meadow';
    if(!['safe','bal','bold'].includes(state.cv.stance))state.cv.stance='bal';
    const jobs=validObject(state.jobs)?state.jobs:{};
    state.jobs={smith:null,carp:null,...jobs};
    ['smith','carp'].forEach(k=>{const j=state.jobs[k];if(j&&(!validObject(j)||!Number.isFinite(Number(j.t0))||!Number.isFinite(Number(j.dur))||Number(j.dur)<=0))state.jobs[k]=null;});
    if(!Array.isArray(state.contracts))state.contracts=[];
    else state.contracts=state.contracts.filter(c=>validObject(c)&&typeof c.id==='string'&&typeof c.item==='string'&&Number.isFinite(Number(c.qty))&&Number(c.qty)>0&&Number.isFinite(Number(c.reward))&&Number.isFinite(Number(c.exp)));
    state.tmode=state.tmode==='market'?'market':'map';
    if(!validObject(state.wx)||!['clear','drizzle','mist','breeze'].includes(state.wx.k)||!Number.isFinite(Number(state.wx.t1)))state.wx=null;
    state.wz=Number.isInteger(Number(state.wz))&&Number(state.wz)>=0?Number(state.wz):0;
    state.bbr=Number.isFinite(Number(state.bbr))?Number(state.bbr):0;
    state.bsel=Number.isInteger(Number(state.bsel))&&Number(state.bsel)>=0?Number(state.bsel):0;
    state.bmode=state.bmode==='feed'?'feed':'pet';
    state.bfeed=typeof state.bfeed==='string'&&state.bfeed?state.bfeed:'hay';
    const zoneCount=(typeof ZN!=='undefined'&&Array.isArray(ZN))?ZN.length:1;
    state.mz=Number.isInteger(Number(state.mz))?Math.max(0,Math.min(zoneCount-1,Number(state.mz))):0;
    state.mf=Number.isFinite(Number(state.mf))&&Number(state.mf)>=1?Math.floor(Number(state.mf)):1;
    state.mmode=state.mmode==='blast'?'blast':'pick';
    if(!validObject(state.ms))state.ms={};
    const fishZoneCount=(typeof ZF!=='undefined'&&Array.isArray(ZF))?ZF.length:1;
    state.fz=Number.isInteger(Number(state.fz))?Math.max(0,Math.min(fishZoneCount-1,Number(state.fz))):0;
    if(!validObject(state.mines))state.mines={};
    if(!Array.isArray(state.barn))state.barn=Array(12).fill(null);
    return state;
  };
  // freshCampaign clones S_DEFAULTS; seed every extension-owned key there too.
  if(typeof S_DEFAULTS!=='undefined'&&validObject(S_DEFAULTS)){
    if(!validObject(S_DEFAULTS.xp))S_DEFAULTS.xp={};
    S_DEFAULTS.xp.cook=Number.isFinite(Number(S_DEFAULTS.xp.cook))?Number(S_DEFAULTS.xp.cook):0;
    S_DEFAULTS.xp.carp=Number.isFinite(Number(S_DEFAULTS.xp.carp))?Number(S_DEFAULTS.xp.carp):0;
    S_DEFAULTS.cv={runs:[],sel:'meadow',stance:'bal',done:{},log:[]};
    S_DEFAULTS.jobs={smith:null,carp:null};
    S_DEFAULTS.contracts=[];S_DEFAULTS.tmode='map';S_DEFAULTS.wx=null;S_DEFAULTS.wz=0;
    S_DEFAULTS.bbr=0;S_DEFAULTS.bsel=0;S_DEFAULTS.bmode='pet';S_DEFAULTS.bfeed='hay';
    S_DEFAULTS.mz=0;S_DEFAULTS.mf=1;S_DEFAULTS.mmode='pick';S_DEFAULTS.ms={};S_DEFAULTS.fz=0;
  }
  // Normalize the active save and future slot loads, including older/incomplete saves.
  if(typeof S!=='undefined')S=normalizeCampaign(S);
  if(typeof freshCampaign==='function'){
    const baseFreshCampaign=freshCampaign;
    freshCampaign=function(){return normalizeCampaign(baseFreshCampaign.apply(this,arguments));};
  }
  if(typeof hydrateCampaign==='function'){
    const baseHydrateCampaign=hydrateCampaign;
    hydrateCampaign=function(){return normalizeCampaign(baseHydrateCampaign.apply(this,arguments));};
  }
  window.__rpgCampaignRuntimeGuardsReady=true;
})();
