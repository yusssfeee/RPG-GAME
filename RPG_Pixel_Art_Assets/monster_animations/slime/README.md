# Slime Family — Animation Assets

<badge> </badge>
Original transparent-background SVG pixel-art assets for the game's four slime ranks. Each standalone SVG includes five named CSS keyframe animation clips.

## Characters
- [slime.svg](slime.svg) — common green slime
- [greater-slime.svg](greater-slime.svg) — larger, tougher green slime
- [elite-slime.svg](elite-slime.svg) — emerald elite with crystalline crest
- [king-slime.svg](king-slime.svg) — blue royal boss with gold crown and jewel

## Clips
Every character supports idle, walk, attack, hurt, and death. Each clip has multi-pose keyframes with squash/stretch, anticipation, movement, recoil, and defeat timing. The SVG canvas is transparent; no poster crops or external image references are used.

## In-game mapping
- Slime → Slime
- Greater Slime → Blue Slime
- Elite Slime → Acid Slime
- King Slime → Slime King and Ooze Titan

Existing enemy stats, drops, dungeon rules, and balance values are preserved. The art replacement is limited to the five slime/ooze combat entries.

## Integration status
Integrated into [RPG_Game7_MOBILE_STABLE.html](../../../../RPG_Game7_MOBILE_STABLE.html) on the isolated feature branch `feature/slime-family-animations`. The inline runtime keeps the game self-contained and offline-ready.

## QA status
Static HTML markers, inline JavaScript syntax, all five clip names, SVG source presence, and enemy-to-variant mapping were checked. A real browser/mobile visual play-through has not yet been run, so do that before merging into `main`.

## Technical note
These are animated SVG vector assets using CSS keyframes, not a raster PNG sprite atlas. They are directly usable in the existing inline-SVG monster renderer.
