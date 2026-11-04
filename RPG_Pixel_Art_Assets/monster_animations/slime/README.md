# Semi-realistic Slime Family

Status: **In production — concept direction approved, production frames pending QA**

## Approved visual standard
Match the approved blue water-slime reference: translucent glossy gel body, saturated inner color, bright specular highlights, visible refraction, subtle internal bubbles, small droplets and a grounded puddle/contact shadow. Preserve the same facial language and material quality across the family; vary silhouette, material, color, and effects to communicate type and rank.

## Roster and rank identity
| ID | Display name | Rank / role | Visual identity |
|---|---|---|---|
| `slime_basic` | Basic Slime | Common | Blue transparent gel, small rounded body, simple face |
| `slime_acid` | Acid Slime | Uncommon / elemental | Acid-lime gel, toxic bubbles, small corrosive droplets |
| `slime_frost` | Frost Slime | Uncommon / elemental | Icy cyan gel, frosted edges, tiny ice crystals |
| `slime_greater` | Greater Slime | Rare / evolved | Larger body, denser gel, brighter core and stronger splash effects |
| `slime_elite` | Elite Slime | Elite / mini-boss | Heavy silhouette, armor-like gel ridges, distinctive eye glow and aura |
| `slime_king` | King Slime | Boss | Much larger silhouette, ornate crown-like growths, royal glow and dramatic attack effects |

## Required clips for every character
- `idle`: stationary in-place animation only; gentle wobble, breathing/squash-stretch, bubbles or ambient particles. No walking, translation, or path movement.
- `attack`: anticipation, compression/energy build-up, attack release, recovery to idle.
- `hurt`: impact squash, recoil deformation in place, droplets/particles, recovery.
- `death`: progressive collapse/dissolution, residue/puddle, final disappearance.

## Folder contract
Each character receives:
- `source/`: original generated sheet, unchanged.
- `preview/`: review image; may include labels/background.
- `frames/idle/`, `frames/attack/`, `frames/hurt/`, `frames/death/`: individually exported transparent PNG frames.
- `atlas/`: packed sprite sheet and machine-readable frame metadata.
- `manifest.json`: stable IDs, clip names, frame counts, frame size, pivot, and QA status.

## Naming
Use lowercase snake_case: `slime_basic_idle_001.png`, `slime_basic_attack_001.png`, etc. Keep source sheets distinct from production exports.

## Production gate
Do not mark an asset production-ready until its PNG alpha channel is verified, each frame is isolated (not a poster crop), frame dimensions and pivots are consistent, and the animation has been visually checked in sequence.
