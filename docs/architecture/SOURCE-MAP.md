# Project X — Source Map (Phase 0)

## Snapshot and interpretation

- Baseline: `Project X.html`, branch `main`, commit `2252c12b57e81a3fe773e3c8b5a335f63a8c6097`.
- Source length: 9,179 lines; approximately 50,062,262 characters.
- 52 script elements and 41 style elements.
- Most of the file's byte size is embedded art/data payloads, not executable logic. The source contains large inline image/data blocks, including crop art and character animation frames.
- The map below records recognizable function declarations and arrow-function assignments. It is a navigation aid, not proof that a function is isolated or safe to extract.
- Line numbers are baseline line numbers and must be regenerated after any source change.

## Core, saves, state, audio and XP (approx. lines 900–1190)

`CV` (949), `U` (988), `slotKey` (1009), `readSlot` (1010), `save` (1018), `freshCampaign` (1019), `hydrateCampaign` (1020), `activateCampaignSlot` (1021), `safe` (1022), `beginFreshCampaign` (1040), `$` (1041), `rnd` (1042), `lvl` (1043), `L` (1044), `inv` (1045), `cnt` (1046), `on` (1047), `item` (1048), `maxHp` (1050), `maxSh` (1051), `defn` (1052), `wInt` (1053), `critCh` (1054), `atkPow` (1055), `critMul` (1056), `catOf` (1057), `earn` (1058), `nm` (1059), `oIcon` (1060), `fIcon` (1061), `iIcon` (1062), `mineIcon` (1065), `gIcon` (1066), `infoText` (1067), `say` (1069), `muted` (1075), `active` (1077), `make` (1078), `get` (1087), `go` (1100), `w` (1127), `unlock` (1133), `tone` (1140), `seq` (1154), `addXp` (1185), `skillBar` (1186), `hitsNeed` (1187)

## Farming and animal care (approx. lines 1190–1250)

`unlockCost` (1191), `farmGrow` (1192), `prog` (1205), `tapPlot` (1208), `cap` (1229), `aDur` (1232), `aProg` (1233), `tapStall` (1234)

## Mining, fishing, crafting, inventory and potions (approx. lines 1250–1355)

`newRock` (1251), `mineAct` (1253), `spawnFish` (1260), `catchFish` (1268), `spawnGap` (1277), `qEff` (1281), `stat` (1282), `hvCls` (1284), `reqText` (1285), `coinText` (1286), `need` (1287), `needHtml` (1288), `craftMiss` (1289), `missMsg` (1296), `hasMats` (1309), `sc` (1310), `anvilAct` (1311), `equip` (1324), `sellItem` (1325), `sellMat` (1326), `pOK` (1330), `cauldronAct` (1331), `drink` (1342), `healPots` (1350), `healCount` (1351), `useHeal` (1352), `buffText` (1353)

## Trading, combat and dungeons (approx. lines 1355–1518)

`cargoUsed` (1356), `cargoCap` (1357), `town` (1358), `tradePrices` (1359), `travelTime` (1360), `tradeGo` (1361), `arrive` (1362), `tradeBuy` (1367), `tradeSell` (1372), `catTotal` (1378), `tradeCat` (1379), `tradeTick` (1380), `buy` (1388), `anim` (1398), `fx` (1399), `statusText` (1400), `upd` (1401), `set` (1403), `mkFoe` (1410), `startFight` (1414), `explore` (1415), `dgDef` (1422), `dgEnter` (1423), `dgLeave` (1424), `dgDoor` (1425), `dgCamp` (1434), `dgChest` (1435), `foeDown` (1445), `playerDown` (1460), `strike` (1461), `attack` (1478), `power` (1479), `guardAct` (1480), `focusAct` (1481), `enemyAttack` (1482), `combatTick` (1495), `flee` (1508), `eat` (1509), `bar` (1512), `stage` (1513), `hb` (1514), `hud` (1515), `ownTag` (1516), `pc` (1517), `perks` (1518)

## UI rendering and main loop (approx. lines 1518–1735)

`perks` (1518), `row` (1579), `own` (1635), `rp` (1636), `r` (1639), `stall` (1645), `setT` (1646), `render` (1647), `loop` (1675), `showIntro` (1705), `rar` (1725), `toast` (1729), `drop` (1730), `CL` (1734), `cm` (1735)

## Woodcutting, animal actions and mine-grid state (approx. lines 1735–1837)

`cm` (1735), `dmgType` (1736), `gemRoll` (1737), `newTree` (1740), `chop` (1742), `wcraft` (1743), `bst` (1766), `feedA` (1767), `petA` (1768), `drawBx` (1776), `rcraft` (1787), `zOk` (1795), `newGrid` (1796), `collect` (1799), `caveKey` (1804), `mineSync` (1805), `mineFloorDone` (1806), `mineLoad` (1810), `mineSelect` (1815), `mineEnsure` (1816), `tapTile` (1817), `HUE` (1837)

## Later systems and extension scripts (approx. lines 1837–9179)

`HUE` (1837), `craftSec` (1849), `smV` (1850), `poolFish` (1862), `fishBonus` (1863), `chSvg` (1890), `chStory` (1918), `chQuestValue` (1919), `chQuestState` (1920), `chUnlocked` (1921), `chooseRegion` (1922), `chGrant` (1923), `claimQuest` (1924), `buyTalent` (1925), `challengeBoss` (1926), `imageMarkup` (1964), `artForFoe` (1971), `detailBlade` (2035), `detailWood` (2036), `genericIcon` (2120), `mineLevelOK` (2168), `weightedOre` (2169), `fishMotion` (2260), `digChance` (2266), `mineWalk` (2278), `mineAudio` (2280), `mineClink` (2281), `mineStepSound` (2282), `img` (2316), `hueOf` (2317), `alias` (2320), `potion` (2335), `T` (2349), `foeSprite` (2350), `spotFish` (2441), `place` (2442), `spawnSpot` (2447), `drop` (2456), `resetCombo` (2461), `drawLine` (2462), `cancelLine` (2470), `cast` (2475), `reel` (2482), `loop` (2499), `startPondLoop` (2523), `setNav` (2541), `batArt` (2552), `cvSlots` (2587), `cvSt` (2588), `cvDur` (2589), `cvYield` (2590), `cvRisk` (2591), `fmtT` (2592), `cvRoute` (2593), `cvSend` (2595), `cvCollect` (2603), `cvSellGoods` (2623), `cvPos` (2627), `lootTier` (2628), `esc` (2696), `alive` (2725), `itemMeta` (2726), `note` (2731), `arm` (2739), `bump` (2740), `flush` (2741), `upd` (2744), `done` (2749), `q0` (2775), `bonusLines` (2799), `clsPicker` (2849), `draw` (2852), `addMat` (2878), `spr100` (2898), `mk` (2919), `sync` (2927), `cookBuffLabel` (3081), `fishAsc` (3084), `resolve` (3085), `nmR` (3086), `haveR` (3087), `haveN` (3088), `canCook` (3089), `cookTick` (3091), `startCook` (3097), `finishCook` (3105), `useCookedDish` (3133), `lg` (3172), `cLv` (3194), `needTxt` (3195), `carpGood` (3201), `carpMake` (3206), `treeSvg` (3232), `pickTree` (3248), `newTree2` (3253), `wzOk` (3254), `woodLoop` (3265), `chopSwing` (3271), `addFish` (3353), `spf` (3437), `fmt` (3516), `jobLeft` (3517), `spd` (3518), `startJob` (3519), `finishJob` (3520), `jobCard` (3531), `minigame` (3556), `loop` (3561), `carpGood` (3569), `carpMake` (3576), `stgPos` (3702), `ab` (3798), `ringDur` (3849), `newRing` (3850), `fellTree` (3898), `hsh` (3916), `mmult` (3917), `mtrend` (3918), `marketIds` (3925), `genContract` (3926), `refreshContracts` (3931), `kLeft` (3932), `marketView` (3933), `haggle` (3945), `loop` (3954), `nowMs` (4018), `wxTick` (4026), `scareF` (4057), `pestTick` (4059), `shooCrow` (4072), `badge` (4082), `farmSync` (4084), `sync` (4100), `aInfo` (4105), `bInit` (4106), `hungry` (4107), `foxF` (4109), `barnTick` (4110), `moodCol` (4126), `barnSync` (4127), `act` (4165), `nl` (4194), `f1` (4195), `ani` (4196), `sfx` (4197), `ND` (4296), `installSkillTreeState` (4382), `xpBonus` (4400), `brPts` (4405), `nCost` (4406), `reqMiss` (4407), `buyNode` (4427), `foAt` (4456), `foOk` (4457), `$s` (4458), `pool5` (4459), `newTree5` (4465), `w5RingDur` (4473), `w5NewRing` (4475), `pickHTML` (4480), `logsRow` (4493), `sceneHTML` (4494), `wmsg` (4522), `wStreakUI` (4523), `wStatsUI` (4524), `wFly` (4525), `wText` (4526), `wBanner` (4527), `wSwing` (4529), `wFell` (4562), `wSpawnEv` (4601), `wEndEv` (4618), `wBranchFall` (4619), `wDoEv` (4624), `w5Loop` (4635), `wAct` (4674), `w8Get` (4708), `w8Tier` (4709), `w8Add` (4710), `w8Txt` (4711), `rl` (4725), `rbInstall` (4727), `rbLv` (4738), `rbGain` (4740), `pCost` (4741), `pFm` (4742), `doRebirth` (4753), `rarityName` (4795), `iconFor` (4796), `panel` (4801), `push` (4806), `aggregate` (4902), `redraw` (4907), `resIcon` (4919), `oreArt` (4920), `resName` (4922), `cave` (4931), `depth` (4932), `miningStrikePower` (4935), `rollResource` (4936), `advance` (4943), `expeditionWalk` (4944), `nextEvent` (4966), `minePersistOnExit` (4986), `ambientHTML` (5215), `wanted` (5221), `stopBed` (5222), `build` (5227), `startBed` (5238), `showError` (5316), `openSlots` (5322), `validObject` (5384), `normalizeCampaign` (5385), `obj` (5452), `normalize` (5455), `safeIndex` (5498), `locked` (5499), `mapMarkup` (5501), `isKnown` (5662), `catalogMarkup` (5663), `refreshCatalog` (5679), `markKnown` (5687), `wrappedCatchFish` (5718), `wrappedSpotReward` (5731), `enabled` (5924), `getAudio` (5925), `startAmbience` (5929), `stopAmbience` (5944), `splash` (5949), `makeNoise` (5953), `waterImpact` (5989), `fishChirp` (6000), `catchWaterDrops` (6008), `catchSfx` (6049), `wrapped` (6091), `audioWatch` (6096), `$` (6198), `fxScale` (6199), `syncLayer` (6204), `rnd` (6212), `fail` (6213), `el` (6214), `kill` (6215), `useCtx` (6220), `audio` (6231), `bus` (6233), `nz` (6236), `env` (6237), `layerN` (6240), `tick` (6248), `pat` (6252), `bloop` (6255), `shimmer` (6259), `bubble` (6264), `trickle` (6269), `thump` (6276), `tok` (6285), `rill` (6292), `sound` (6324), `ringAt` (6334), `arcAt` (6335), `mistAt` (6336), `streak` (6337), `mobileWater` (6376), `visual` (6385), `shift` (6392), `setWet` (6404), `makePlan` (6413), `play` (6416), `watch` (6425), `svgFor` (6448), `nameOf` (6566), `artOf` (6574), `info` (6576), `order` (6577), `show` (6602), `revealSelected` (6612), `syncLock` (6619), `$id` (6717), `syncPre` (6721), `dropCover` (6740), `finish` (6765), `pump` (6770), `guardHtml` (6790), `scroller` (6798), `wrapped` (6823), `idle` (6875), `sig` (6876), `hrefOf` (6877), `isData` (6878), `measure` (6880), `place` (6900), `handle` (6917), `vec` (6927), `sweep` (6946), `scan` (6947), `warm` (6958), `grab` (6960), `next` (6965), `start` (6975), `styleFor` (7015), `lay` (7016), `setFrame` (7018), `html` (7019), `ease` (7025), `tick` (7027), `endDeath` (7051), `esc` (7119), `iconOf` (7120), `nameOf` (7127), `ensureBox` (7132), `show` (7133), `fade` (7146), `take` (7147), `check` (7148), `RAe` (7216), `run` (7217), `noise` (7218), `osc` (7228), `at` (7239), `kindFor` (7297), `poolEl` (7300), `pushFrame` (7310), `prefillPool` (7315), `clearHit` (7319), `loadOne` (7320), `loadList` (7321), `setMode` (7322), `showFrame` (7335), `buildAttackStack` (7339), `showAtk` (7343), `showHurt` (7349), `showDeath` (7353), `decodeKind` (7357), `detach` (7385), `attach` (7390), `startAttack` (7412), `sum` (7414), `fireHit` (7424), `startHurt` (7429), `finishDeath` (7438), `mixBlendModeReset` (7445), `beginDeath` (7446), `armAttack` (7488), `sum` (7490), `tick` (7520), `isMobile` (7571), `apply` (7575), `syncTab` (7580), `hurry` (7591), `sync` (7614), `rarity` (7779), `cell` (7782), `glyph` (7864), `rarity` (7865), `cell` (7868), `isShaman` (7952), `clearAction` (7958), `stopFrames` (7959), `loadImage` (7960), `preload` (7961), `sourceFor` (7970), `imageFor` (7974), `playFrames` (7978), `advance` (7984), `setMode` (7992), `restoreLegacy` (8008), `detach` (8015), `attach` (8016), `clearDeathTimers` (8031), `finishDeath` (8032), `mixBlendModeReset` (8038), `beginDeath` (8039), `clean` (8074), `isSpear` (8120), `clearAction` (8124), `stopFrames` (8125), `loadImage` (8126), `preload` (8127), `setImage` (8137), `playIdle` (8143), `advance` (8146), `playAction` (8150), `advance` (8153), `setMode` (8157), `restoreLegacy` (8166), `detach` (8172), `attach` (8173), `mixBlendModeReset` (8188), `beginDeath` (8189), `advance` (8196), `tag` (8222), `it` (8238), `heal` (8243), `hitF` (8244), `showClassImpact` (8332), `addWeapon` (8362), `addArmor` (8366), `rarityColor` (8370), `applyClassKit` (8405), `esc` (8433), `chip` (8435), `getDetails` (8436), `place` (8469), `show` (8471), `hide` (8472), `target` (8473), `cancel` (8477), `safeObj` (8552), `ensure` (8553), `rank` (8562), `currentClass` (8563), `classXP` (8564), `classLevel` (8565), `nextXp` (8566), `prevXp` (8567), `progress` (8568), `recoverStamina` (8636), `esc` (8673), `costAt` (8674), `card` (8675), `combatClassLines` (8757), `combatMilestones` (8772), `titleFor` (8839), `syncCombatSpeed` (8861), `escape` (8925), `getMeta` (8926), `place` (8943), `show` (8949), `hide` (8958), `stage` (9020), `observeBar` (9059), `update` (9062), `scan` (9074), `esc` (9103), `details` (9104), `position` (9130), `show` (9137), `hide` (9149), `target` (9150), `cancel` (9164)


## Script block inventory

The source contains 52 script blocks. Several later blocks are feature patches layered over the original runtime. Important named blocks observed include:

- `rpg-crop-pixel-art-data` — large embedded crop-art data.
- `rpg-game-enhancements` — enhancement layer.
- `rpg-sprite-pack` — sprite/art resources.
- `rpg-v3-patch`, `rpg-v4` — successive patch layers.
- `battle-loot-audio-v6` — battle/loot/audio behavior.
- `mine-expedition-v7` — mining expedition behavior.
- `mine-cave-ambience-v2` — mining ambience.
- `rpg-start-slot-flow` — start/save-slot flow.
- `rpg-campaign-runtime-guards` — campaign state guards.
- `rpg-wood-upgrade-campaign-bridge` — wood upgrade bridge.
- `rpg-fishing-water-map`, `rpg-fishing-live-hud-and-discovery`, `rpg-fishing-pond-info-waves-audio` — fishing feature layers.
- `farm-water-fx`, `rpg-crop-legacy-icon-bridge`, `rpg-crop-art-actual-dom-repair`, `rpg-crop-compact-picker-v3` — farming/crop presentation and compatibility layers.
- `rpg-stability`, `rpg-icon-autofit` — stability and UI fitting.
- `rpg-goblin-anim`, `rpg-goblin-frames-data`, `rpg-goblin-attack-frames-data`, `rpg-goblin-regular-anim-data`, `rpg-goblin-combat-fix` — goblin animation/combat layers.
- `rpg-orc-chief-anim-data` — large embedded boss animation data.
- `rpg-goblin-shaman-webp-data`, `rpg-goblin-shaman-webp-controller` — shaman animation data/controller.
- `rpg-goblin-spear-animation-data`, `rpg-goblin-spear-animation-controller` — spear animation data/controller.
- `rpg-class-balance-v1`, `rpg-class-effects-refined-v2`, `rpg-weapon-class-system-v1` — class and weapon systems.
- `rpg-dungeon-clarity-training-v1`, `rpg-skill-progression-v2` — dungeon guidance and progression.
- `rpg-combat-floats-item-tooltip-v1`, `rpg-combat-feedback-v2`, `rpg-item-tooltip-fix-v2` — combat feedback and item tooltip patches.

## Critical shared-state observations

The legacy runtime is centered around a shared mutable campaign object `S`, with supporting global/closure state such as active save slot, combat/fight state, timers, selection state, and subsystem-specific runtime variables. The game loop and UI rendering read from this shared state. This makes direct file-by-file extraction unsafe until reads/writes and initialization order are mapped.

The save path serializes `S` to browser `localStorage`. Compatibility logic includes slot-key handling, legacy single-save fallback, fresh campaign defaults, hydration/normalization, and campaign activation. Preserve these semantics and old-save compatibility during all future changes.

## Next analysis needed

1. Trace every write to `S` and its nested fields.
2. Trace every `localStorage` key and every JSON parse/stringify call touching campaign data.
3. Identify event listeners, delegated `data-a` / `data-x` handlers, intervals, animation frames, and timers.
4. Identify dependencies between core runtime and later patch blocks.
5. Convert the provisional subsystem groups into dependency-backed extraction units.
