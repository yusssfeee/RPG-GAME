# RGP-GAME — Project Instructions

## Canonical game source
- The sole canonical game source is `Project X.html` at the repository root.
- All future inspection, debugging, refactoring, and feature work must begin from this exact file on the current default branch.
- Do not use, merge from, copy from, or restore older HTML game copies. Legacy duplicate HTML files have been removed from the working tree.
- Do not rename or replace the canonical file unless the user explicitly requests it.
- Before editing, inspect the current branch head and read this file, then inspect `Project X.html` and confirm its commit/version.
- Preserve the existing game and its behavior. Do not rewrite it from scratch.

## Development direction
- Target architecture: Full, with Modular as the primary design priority.
- Use gradual, reversible extraction of systems from the existing game. Avoid a big-bang rewrite.
- First map dependencies, state ownership, initialization order, save/load behavior, and shared globals.
- Keep gameplay systems, save compatibility, farming, economy, inventory, quests, combat, navigation, responsive layouts, and visual direction intact unless the user explicitly approves changes.
- Prefer free/open-source tooling and workflows where practical.
- Keep source, documentation, and reusable assets in GitHub. Do not treat temporary chat attachments or sandbox files as permanent project storage.

## Assets
- Preserve the existing `RPG_Pixel_Art_Assets/` tree unless the user explicitly requests asset cleanup.
- Do not regenerate or redraw existing user artwork when asked to edit it; preserve its original style and lineart.
- Keep sprite sheets and animation groups separate, with transparent backgrounds and accurate frame bounds.

## Required workflow
1. Read this file and inspect the latest commit/branch.
2. Confirm `Project X.html` is the source being edited.
3. Analyze before changing architecture or data formats.
4. Make the smallest safe, modular change; do not overwrite unrelated work.
5. Test syntax, boot, navigation, and affected gameplay flows after edits. Report only tests actually performed.
6. Summarize changed paths, branch/commit, and test results.

## Communication
- If the canonical source or an asset is missing or inaccessible, say exactly what is missing and stop rather than reconstructing it from memory or an older copy.
- Ask before destructive changes to saves, assets, or project structure.
