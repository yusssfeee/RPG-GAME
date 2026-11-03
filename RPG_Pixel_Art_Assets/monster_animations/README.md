# Monster Animation Assets

This directory stores original frame-by-frame monster animation sheets generated from the user's approved monster-family reference image.

## Animation standard
- Preserve the approved detailed dark-fantasy pixel-art style and each creature's distinctive silhouette, materials, equipment, and palette.
- Draw each animation pose independently; do not crop poses from the family reference sheet.
- Keep frame bounds, pivot points, baseline, and spacing consistent within each animation.
- Required clips: `idle`, `walk`, `attack`, `hurt`, and `death`.
- Transparent PNG output is preferred. Checkerboard patterns are previews only and must not be treated as transparency.
- Keep source sheets and extracted per-frame PNGs separate; do not wire assets into the game until reviewed.

## Families
1. Slime
2. Goblin
3. Golem
4. Undead
5. Spider
6. Elemental
7. Demon
8. Boss monsters

## Current status
- Slime: four transparent SVG variants with idle/walk/attack/hurt/death clips committed and integrated into the isolated feature branch; static checks passed, browser QA pending.
- Goblin: concept sheets only; not production-ready.
- Golem, Undead, Spider, Elemental, Demon, Boss Monsters: documentation only; animation assets pending.

No game code is changed by this asset-only directory.
