# RPG Game — Mandatory Project Instructions

These instructions are authoritative for every AI coding agent and contributor working in this repository.

## Canonical source of truth (highest priority)
- The user's newest authoritative game source is the uploaded file **`17l10.html`**, supplied on 2026-11-17 (22,689,281 bytes; 8,043 lines).
- Treat this exact upload as the sole source of truth for all future game work. Do not use, merge from, copy from, or revert to older copies such as `RPG_Game.html`, `RPG Game .html`, `RPG_Game7_MOBILE_STABLE.html`, or any other historical duplicate unless the user explicitly asks.
- The repository's historical files are not authoritative simply because their names look canonical. Verify the latest canonical file and this instruction before editing.
- The intended repository path for the canonical upload is `17l10.html` at the repository root. Once committed, all edits must start from that file and preserve it as the main working source. Do not silently substitute another file.
- If `17l10.html` is not present in the current checkout, stop and ask for/access the exact uploaded source. Never reconstruct it from memory or an older version.
- When another AI tool/session starts work, its first steps must be: read this `AGENTS.md`, open root `17l10.html`, and confirm its content/commit before making changes.

## Required workflow
1. Read this file and inspect the latest commit/branch before any edit.
2. Use root `17l10.html` as the starting point for every game change.
3. Preserve gameplay systems, save/local-storage compatibility, farming, economy, inventory, quests, combat, navigation, responsive layouts, and existing visual direction unless the user explicitly requests a change.
4. Do not overwrite unrelated work. Preserve prior versions in Git history.
5. Keep art/animation assets organized under the existing project conventions; document frame order, dimensions, timing, and state.
6. Test syntax/boot, intro, navigation, and the affected gameplay flow after edits. Report only tests actually performed.
7. Keep source and assets in GitHub; temporary chat attachments or sandbox files are not permanent project storage.
8. Update this file if the canonical source path changes, only with explicit user direction.

## Existing art and animation requirements
- For slime monsters, use the user's chosen semi-realistic glossy translucent gelatin style: strong reflections, bubbles, droplets, and consistent design language across elements/types.
- Slimes remain planted; do not create walking/travel frames. Use idle/breathing, hurt, attack, and death states.
- Keep edges crisp, backgrounds truly transparent, frame bounds aligned; avoid blur, halos, cropping, inconsistent anatomy, or unintended movement.

## Communication
- If the canonical source or an asset is missing, state exactly what is missing; never claim it was integrated.
- Make the smallest safe change. Summarize paths, branch/commit, and tests.
- These requirements apply even when an AI session has no access to earlier chat history.
