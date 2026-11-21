# RGP-GAME

## Canonical source
The current and only canonical game source is **[`Project X.html`](./Project%20X.html)** at the repository root.

All future game development must start from this file. Older duplicate HTML game files have been removed from the working tree. Their historical Git commits are retained as a safety record; they are not active sources.

## Project direction
- Architecture target: Full.
- Primary priority: Modular.
- Migration strategy: gradual, reversible extraction of systems without rewriting the game from scratch.
- Preserve existing gameplay, save compatibility, and visual direction.

## Assets
Reusable game art and animation assets are kept under [`RPG_Pixel_Art_Assets/`](./RPG_Pixel_Art_Assets/).

## Contributor instructions
Read [`AGENTS.md`](./AGENTS.md) before making changes. Tool-specific instructions in `CLAUDE.md`, `GEMINI.md`, and `.github/copilot-instructions.md` defer to it.
