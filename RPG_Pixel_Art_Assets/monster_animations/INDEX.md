# Monster Animation Asset Index

All newly generated concept sheets belong under this directory, grouped by family and character. The order follows the approved reference sheet.

## Family order
1. `slime/` — Slime, Greater, Elite, King Slime
2. `goblin/` — Goblin, Goblin Warrior, Goblin Archer, Goblin Chief
3. `golem/` — Rock Golem, Stone Golem, Crystal Golem, Ancient Golem
4. `undead/` — Skeleton, Skeleton Archer, Bone Knight, Lich
5. `spider/` — Spider, Giant Spider, Poison Spider, Spider Queen
6. `elemental/` — Fire Elemental, Ice Elemental, Storm Elemental, Earth Elemental
7. `demon/` — Imp, Demon, Hellknight, Demon Lord
8. `boss-monsters/` — Slime King, Goblin Warlord, Crystal Dragon, Lava Colossus

## File conventions
- `source/`: untouched generated source sheets, named descriptively.
- `preview/`: presentation previews; never treat a painted checkerboard as alpha transparency.
- `frames/<character>/<clip>/`: individually exported transparent PNG frames.
- `atlas/`: normalized sprite atlases plus metadata.
- Clip names: `idle`, `walk`, `attack`, `hurt`, `death`.

## Quality gate
A family is marked production-ready only after transparent alpha is verified, frames are independently drawn/exported (not cropped from the reference poster), frame bounds and pivots are consistent, and loops are checked. Concept sheets are not wired into the game automatically.
