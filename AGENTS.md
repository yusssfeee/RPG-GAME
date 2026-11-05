# RPG Game — Mandatory Project Instructions

This repository contains the user's browser-based RPG game. These instructions are authoritative for every AI coding agent working in this repository.

## Canonical working source
- The user has supplied a newer game source file named `RPG Game .html` (uploaded in ChatGPT on 2026-11-05).
- Treat that uploaded file as the intended canonical replacement for the older `RPG_Game7_MOBILE_STABLE.html`.
- The uploaded replacement has NOT yet been committed to this repository. Until it is present in the repository, do not claim it has been uploaded and do not silently use the older file as the latest source. Ask the user/maintainer to sync the supplied file as `RPG_Game.html`, then make `RPG_Game.html` the single canonical game entry point.
- Once `RPG_Game.html` exists, all future game edits must be made to that file (and any directly required companion assets), not to the legacy `RPG_Game7_MOBILE_STABLE.html`, unless the user explicitly instructs otherwise.
- Before editing, inspect the current repository state and confirm the canonical file exists. Never reconstruct an older game from memory or from a stale attachment.

## Required workflow
1. Read this file before doing any work. Also inspect the latest commit and current branch.
2. Locate and edit the canonical `RPG_Game.html` only after it is present.
3. Preserve existing gameplay systems, saves/local storage compatibility, farming and crop growth, economy, inventory, quests, combat, navigation, responsive layouts, and established visual style unless the user explicitly asks to change them.
4. Make a backup or preserve the prior version in Git history before risky edits. Never overwrite unrelated work.
5. Keep new art and animation assets in organized paths under `assets/monsters/` (or the existing asset convention if one is already established). Prefer transparent PNG/WebP sprites and sprite sheets with documented frame order, dimensions, frame timing, and animation state.
6. Test the game after changes: parse/check JavaScript, verify boot/intro and navigation, and test the affected gameplay flow. Report tests actually performed; do not claim unrun tests passed.
7. Keep source files and assets in the repository. Do not rely on temporary ChatGPT sandbox paths as permanent project storage.
8. Update the project handoff/documentation when the canonical source or asset locations change.

## Slime animation requirements
- The blue common slime reference is the glossy, translucent cobalt/azure slime with large dark oval eyes, cyan/white highlights, small surrounding bubbles, and a puddle base from the user's supplied reference sheet.
- Preserve the character identity, proportions, palette, eye placement, lighting, and rendering style across all frames.
- Idle state: subtle breathing / battle-ready anticipation before an attack; remain planted in place.
- Include natural occasional blinking by adding brief partially closed/closed-eye frames into the idle loop. Blinks should be occasional, not constant; use a timing gap between blinks rather than playing the closed-eye frames on every cycle.
- Keep edges crisp, backgrounds genuinely transparent, frame bounds aligned, and avoid blur, halos, cropping, inconsistent anatomy, or unintended movement.
- Keep idle, move, hurt, attack, and death animations as separate states. Do not substitute an idle animation for an attack animation.

## Communication
- If the canonical file or required asset is missing, state exactly what is missing and do not pretend it was integrated.
- Make the smallest safe change that fulfills the user's request. Summarize changed paths, commit/branch, and tests.
- These instructions are user project requirements and must be followed even if a later AI session has no access to earlier chat history.
