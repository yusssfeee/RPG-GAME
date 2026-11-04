# Monster Animation Asset Index

All monster families are organized by family and character. The approved slime family uses the semi-realistic glossy gel style approved on 2026-11-04.

## Family order
1. `slime/` — Basic Slime, Acid Slime, Frost Slime, Greater Slime, Elite Slime, King Slime
2. `goblin/` — Goblin, Goblin Warrior, Goblin Archer, Goblin Chief
3. `golem/` — Rock Golem, Stone Golem, Crystal Golem, Ancient Golem
4. `undead/` — Skeleton, Skeleton Archer, Bone Knight, Lich
5. `spider/` — Spider, Giant Spider, Poison Spider, Spider Queen
6. `elemental/` — Fire Elemental, Ice Elemental, Storm Elemental, Earth Elemental
7. `demon/` — Imp, Demon, Hellknight, Demon Lord
8. `boss-monsters/` — Slime King, Goblin Warlord, Crystal Dragon, Lava Colossus

## File conventions
- `source/`: untouched generated source sheets.
- `preview/`: presentation previews; never treat a painted checkerboard as alpha transparency.
- `frames/<character>/<clip>/`: individually exported transparent PNG frames.
- `atlas/`: normalized sprite atlases plus metadata.
- Approved clip names: `idle`, `attack`, `hurt`, `death`.
- **No walk or travel animation for monsters.** Idle is a stationary, in-place loop with subtle squash/stretch, breathing, wobble, bubbles, or ambient effects.

## Quality gate
A family is marked production-ready only after true transparent alpha is verified, frames are independently exported as separate PNGs, frame bounds and pivots are consistent, and loops are checked. Concept sheets are not wired into the game automatically.
