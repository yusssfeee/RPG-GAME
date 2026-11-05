# RPG Game — Mandatory Project Instructions

This repository contains the user's browser-based RPG game. These instructions are authoritative for every AI coding agent working in this repository.

## Canonical working source
- The user supplied a newer game source file named `RPG Game .html` on 2026-11-05.
- This uploaded file is intended to replace the older `RPG_Game7_MOBILE_STABLE.html`.
- The user confirmed `RPG Game .html` is the latest source. It is preserved under its original filename and copied byte-for-byte to `RPG_Game.html` on `main`.
- `RPG_Game.html` is now the single canonical game entry point. Keep `RPG Game .html` as the preserved original upload and do not silently use the older `RPG_Game7_MOBILE_STABLE.html`.
- All future game edits must target `RPG_Game.html` and its required companion assets, not `RPG_Game7_MOBILE_STABLE.html`, unless the user explicitly instructs otherwise.
- Before editing, inspect the repository state and confirm the canonical file exists. Never reconstruct an older game from memory or stale attachments.

## Required workflow
1. Read this file before doing any work; inspect the latest commit and current branch.
2. Edit the canonical `RPG_Game.html` only after it is present.
3. Preserve existing gameplay systems, save/local storage compatibility, farming and crop growth, economy, inventory, quests, combat, navigation, responsive layouts, and established visual style unless explicitly asked to change them.
4. Preserve prior versions in Git history and avoid overwriting unrelated work.
5. Keep art/animation assets organized under `assets/monsters/` (or the existing project convention). Document frame order, dimensions, frame timing, and animation state.
6. Test the game after changes: syntax/boot, intro, navigation, and affected gameplay flow. Report only tests actually performed.
7. Keep source and assets in GitHub; temporary ChatGPT sandbox paths are not permanent project storage.
8. Update handoff documentation when canonical source or asset paths change.

## Slime animation requirements
- The blue common slime is a glossy translucent cobalt/azure slime with large dark oval eyes, cyan/white highlights, small surrounding bubbles, and a puddle base, matching the user's supplied reference.
- Preserve identity, proportions, palette, eye placement, lighting, and rendering style across frames.
- Idle: subtle breathing and battle-ready anticipation before an attack; remain planted.
- Include occasional natural blink frames (partially closed/closed eyes) with a pause between blinks; do not blink continuously on every breathing cycle.
- Keep edges crisp, backgrounds truly transparent, frame bounds aligned; avoid blur, halos, cropping, inconsistent anatomy, or unintended movement.
- Keep idle, move, hurt, attack, and death as separate states.

## Communication
- If the canonical file or an asset is missing, say exactly what is missing; never pretend it was integrated.
- Make the smallest safe change. Summarize paths, branch/commit, and tests.
- These requirements must be followed even when an AI session has no access to earlier chat history.
