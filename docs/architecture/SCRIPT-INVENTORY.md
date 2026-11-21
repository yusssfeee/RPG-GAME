# Script-level Source Inventory

Baseline inspected: `Project X.html` at main commit `2252c12b57e81a3fe773e3c8b5a335f63a8c6097`.

## Verified file metrics

Measured directly from the 50,062,852-byte source file:

- 9,179 physical lines
- 52 script elements
- 41 style elements
- 5 literal `<img>` elements (this is not the total image count; images are also embedded in CSS/JS/data)
- The source contains several very large embedded data/art sections, so raw script size alone is not a measure of gameplay responsibility.

## Script map

The following map is based on script order and symbol names. It is a discovery index, not a final module ownership decision.

| Script | Approx. content size | Observed named function / symbol groups |
|---:|---:|---|
| 1 | 140 chars | Tiny bootstrap fragment |
| 2 | 3.16 MB | Large embedded data / generated content; no conventional named functions detected |
| 3 | 3.96 MB | Core game logic: save, campaign lifecycle, XP, plots, stalls, mining, fishing, crafting, equipment, selling, trading, buying |
| 4 | 1.22 MB | Creature art helpers and image markup |
| 5 | 0.95 MB | RPG enhancements, ore weighting, fish motion, item/detail art, mining helpers |
| 6 | 0.95 MB | Fishing loop, cast/reel, fish spotting, drops, combo and audio |
| 7 | 14 KB | Bat / cave / expedition and navigation helpers |
| 8 | 0.73 MB | Cooking, carpentry, woodcutting, trees, contracts, market, weather, pests, farm and barn synchronization, upgrades |
| 9 | 4 KB | Item rarity, icons, panel and push helpers |
| 10 | 16 KB | Mining expedition state, resource rolls, depth, advancement and persistence on exit |
| 11 | 3 KB | Bed/rest and ambient markup |
| 12 | 8 KB | Error display and slot UI |
| 13 | 4.7 KB | Campaign runtime guards and campaign normalization |
| 14 | 1.4 KB | Wood upgrade / campaign bridge |
| 15 | 15 KB | Fishing water map and map markup |
| 16 | 8 KB | Fishing HUD, discovery and catalog |
| 17 | 11 KB | Pond information, waves and audio |
| 18 | 18 KB | Water visual/audio effects |
| 19 | 1.2 KB | SVG helper |
| 20 | 2.1 KB | Small data / markup fragment |
| 21 | 4.6 KB | Selection, reveal, ordering and lock synchronization |
| 22 | 7.2 KB | Stability, preloading, cover and scrolling helpers |
| 23 | 7 KB | Measurement, placement, sweep/scan and startup helpers |
| 24 | 1.24 MB | Animation/tick/death/frame and layout logic |
| 25 | 3.3 KB | Icon/name/box/show/fade/take/check helpers |
| 26–28 | 1.9–2.9 MB each | Large embedded data / asset blocks; no conventional named functions detected |
| 29 | 2.9 KB | Audio oscillator/noise helpers |
| 30 | 9.94 MB | Large embedded data / asset block |
| 31 | 16 KB | Combat sprite frame pool, attack/hurt/death state and hit dispatch |
| 32–33 | under 300 chars each | Small fragments |
| 34 | 2.8 KB | Mobile/tab synchronization |
| 35 | 471 chars | Small fragment |
| 36–37 | 2.2 KB each | Rarity and item-cell rendering |
| 38–39 | 1.16 MB / 4.14 MB | Large embedded data / asset blocks |
| 40 | 9.4 KB | Sprite frame loading, idle/action/death and state transitions |
| 41 | 701 chars | Small cleanup helper |
| 42 | 16.01 MB | Large embedded data / asset block |
| 43 | 8.98 KB | Sprite idle/action/death handling, including spear-specific branch |
| 44 | 7.7 KB | Hit effects, tags, clear and heal |
| 45 | 3.7 KB | Class impact presentation |
| 46 | 9.6 KB | Class kit, equipment detail, weapon/armor UI |
| 47 | 9.6 KB | Class progression, XP/levels, stamina recovery and costs |
| 48 | 5.5 KB | Combat class lines, milestones and title |
| 49 | 547 chars | Combat speed synchronization |
| 50 | 5.1 KB | Metadata and UI placement/show/hide |
| 51 | 3.2 KB | Progress bar observation/update |
| 52 | 5 KB | Details/position/show/hide and target UI |

## Important architectural observations

1. The current HTML is a monolith in packaging, but its script blocks already contain recognizable functional seams (farming, animals, gathering, crafting, economy, inventory, combat, progression, UI, and effects).
2. Script order may be semantically significant: later blocks can depend on globals created earlier. Extraction must preserve initialization order or replace it with explicit imports and a controlled bootstrap.
3. Large script blocks contain embedded data/art. Do not mix asset extraction with logic extraction; treat them as a separate migration stream.
4. Several areas have bridge/guard scripts (campaign normalization and wood-upgrade bridge), suggesting shared state and compatibility behavior that must be documented before modularization.
5. Combat/sprite behavior is spread across multiple blocks (notably 24, 31, 40, 43–49). Do not treat any single block as the complete combat module.
6. Fishing is also distributed across multiple blocks (notably 3, 5, 6, 15–18). Its loop, map, HUD, discovery, ambience, and effects must be mapped together.

## Next source-analysis tasks

- Extract and catalog every top-level function and global declaration with line ranges.
- Trace all `localStorage`, `sessionStorage`, IndexedDB, and save/load access.
- Build a read/write map for shared campaign/player/inventory state.
- Identify DOM IDs and event listeners used by each system.
- Trace calls between scripts to produce a dependency graph.
- Inspect embedded data blocks and determine whether they are static catalogs, sprites, audio, or runtime-generated content.

No gameplay code or asset content was changed by this inventory.
