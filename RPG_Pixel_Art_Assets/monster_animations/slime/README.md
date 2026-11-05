# Semi-realistic Slime Family

Status: **Roster verified against `RPG_Game.html`; production artwork is pending.**

## Approved visual standard

Use the user-approved blue water slime and the five uploaded animation references in `references/` as the fixed visual standard: translucent glossy gelatin body, saturated inner color, strong white/blue specular reflections, visible refraction, internal bubbles, small droplets, and a grounded gel contact puddle. Preserve the same core face language, eye proportions, rounded gel silhouette, lighting quality, and material treatment across the elemental family. Change only the element-specific material, color, particles, and boss/rank details.

The blue `Slime` is a reference baseline only. Do not recreate it as a new asset. `Blue Slime` is excluded from separate art production to avoid duplicating the base water slime.

## Verified in-game roster

These names are present in the current `RPG_Game.html` data and are the only slime-family characters approved for this production pass:

| ID | Display name | Game role / rank | Element | Visual direction |
|---|---|---|---|---|
| `slime_acid` | Acid Slime | Uncommon elemental enemy | Acid | Translucent acid-lime gel, toxic bubbles and restrained corrosive droplets |
| `slime_frost` | Frost Slime | Uncommon elemental enemy | Ice | Icy cyan gel, frosted edges, internal cold refraction and tiny ice crystals |
| `slime_magma` | Magma Slime | Uncommon elemental enemy | Magma | Molten orange-red gel, glowing inner fissures and ember droplets |
| `slime_king` | Slime King | Boss | Royal water | Larger royal-water body with crown-like gel growths; preserve the same slime face language |
| `ooze_titan` | Ooze Titan | Slime Cave final boss | Arcane ooze | Massive evolved ooze silhouette, dense violet/iridescent core and heavy gel mass |
| `frost_titan` | Frost Titan | Frozen Hollow final boss | Ice | Massive crystalline gel body, prominent ice growths and cold core |
| `magma_colossus` | Magma Colossus | Magma Foundry final boss | Magma | Massive molten gel body, volcanic crust/fissures and intense ember glow |

## Explicit exclusions and future variants

- `Slime`: approved blue water reference only; no duplicate production sheet.
- `Blue Slime`: excluded as a separate art target to prevent duplication of the basic water slime.
- `Greater Acid Slime`, `Elite Acid Slime`, `Greater Frost Slime`, `Elite Frost Slime`, `Greater Magma Slime`, and `Elite Magma Slime`: these names do not currently exist in the game data. Do not create or integrate them as game entities until the corresponding monsters are added to `RPG_Game.html` and dungeon data.

## Required clips for every production character

- `idle`: stationary breathing/wobble in place; no translation or path movement.
- `attack_prepare`: in-place compression, anticipation, and elemental energy build-up.
- `attack`: attack release and recovery; keep the slime planted in its combat position.
- `hurt`: impact squash/recoil in place, with restrained droplets or particles.
- `death`: progressive collapse/dissolution into residue, puddle, and droplets.

Keep the eyes visible through idle, preparation, attack, and hurt frames. They may disappear only naturally during the final dissolution if the body fully melts.

## Per-character folder contract

Each character receives its own folder and its own independent sprite sheet:

- `source/`: original generated sheet, unchanged.
- `preview/`: review image; may include labels/background.
- `frames/idle/`, `frames/attack_prepare/`, `frames/attack/`, `frames/hurt/`, `frames/death/`: individually exported transparent PNG frames.
- `atlas/`: packed sprite sheet and machine-readable frame metadata.
- `manifest.json`: stable IDs, clip names, frame counts, frame dimensions, pivot, and QA status.

## Export and QA rules

- PNG frames with a real alpha channel; never use a checkerboard pattern painted into the image.
- Default frame canvas: 256 × 256 px; fixed pivot: (128, 224).
- Default target: 8 frames per clip; consistent dimensions and pivot across all clips of a character.
- Naming: `<character_id>_<clip>_<frame_3digits>.png`, for example `slime_acid_idle_001.png`.
- No walk, run, travel, or spatial movement animations.
- No external halo/outline, frame intersections, cropped droplets, or overlapping cells.
- A sheet is not production-ready until each frame is isolated, alpha is verified, the sequence is inspected, and the game integration is tested.
- Keep each character's source sheet separate; never combine different characters into one production sheet.

## Production status

The roster and export contract are now aligned to the current game data. All seven in-game slime characters remain `pending_art` until their individual assets pass visual and technical QA.
