# Current continuation update — 2026-11-05

**Verified current main head:** `d496fec161fe136ea2368d33509e4d219c0b8148`.

## Canonical game source
- The user confirmed that `RPG Game .html` is the latest game source.
- It has been copied byte-for-byte to the canonical path `RPG_Game.html` on `main`; the original `RPG Game .html` remains preserved.
- `RPG_Game7_MOBILE_STABLE.html` is an older version and must not be used for new game edits.
- The GitHub connector can verify the canonical blob SHA and file metadata, but currently returns an empty body for this ~10 MB HTML file. Do not attempt code edits against a partial or reconstructed copy. Obtain the exact file bytes (for example, as a chat attachment) before changing game logic.

## Basic Slime QA pack — local only, not yet committed
- A QA-normalized test pack exists in the originating ChatGPT file library; it is **not yet in GitHub** and is not wired into the game.
- Verified: 24 individual PNG frames, all 256×256 RGBA with an alpha channel and transparent pixels.
- Clips: idle 6, attack_prepare 6, attack 6, hurt 1, death 5. There are no walk/travel frames, per the user's explicit direction.
- Shared pivot: (128, 224). Original source sheet is preserved in the pack.
- The pack includes a local HTML preview only; it is not a combat integration test. Production approval still requires in-game scale/timing/death-state review and final edge/halo inspection.
- Do not mark Basic Slime as integrated or production-ready until the individual frame files and metadata are committed and the game is tested.

## Slime family art direction
Use the user's approved glossy semi-realistic translucent gel style (not the older flat pixel-vector SVG prototype). Preserve the same visual language across types; vary material/element details. Keep idle stationary and use attack preparation, attack, hurt, and death states only. No walking or spatial travel.

---

# Monster Animation Project — Handoff

Last verified: 2026-11-03  
Repository: [yusssfeee/RGP-GAME](https://github.com/yusssfeee/RGP-GAME)  
Default branch: `main`  
Repository visibility: **Private**  
Latest verified commit before this handoff: `2b4a89675b8ce96d1001a13b1668958cfaa6a9c7`  
Latest commit: [Prepare boss-monsters monster animation asset folder](https://github.com/yusssfeee/RGP-GAME/commit/2b4a89675b8ce96d1001a13b1668958cfaa6a9c7)

> This document describes the repository state that was actually verified. Do not interpret generated concept posters or folder documentation as completed sprite animations. No game code has been changed as part of this animation-asset setup.

## 1. Start here

- [Monster animation directory](https://github.com/yusssfeee/RGP-GAME/tree/main/RPG_Pixel_Art_Assets/monster_animations)
- [Family index and naming conventions](https://github.com/yusssfeee/RGP-GAME/blob/main/RPG_Pixel_Art_Assets/monster_animations/INDEX.md)
- [Animation standards and quality gate](https://github.com/yusssfeee/RGP-GAME/blob/main/RPG_Pixel_Art_Assets/monster_animations/README.md)
- [Existing pixel-art asset pack overview](https://github.com/yusssfeee/RGP-GAME/blob/main/RPG_Pixel_Art_Assets/README.txt)

Family documentation:
- [Slime](https://github.com/yusssfeee/RGP-GAME/tree/main/RPG_Pixel_Art_Assets/monster_animations/slime)
- [Goblin](https://github.com/yusssfeee/RGP-GAME/tree/main/RPG_Pixel_Art_Assets/monster_animations/goblin/README.md)
- [Golem](https://github.com/yusssfeee/RGP-GAME/tree/main/RPG_Pixel_Art_Assets/monster_animations/golem/README.md)
- [Undead](https://github.com/yusssfeee/RGP-GAME/tree/main/RPG_Pixel_Art_Assets/monster_animations/undead/README.md)
- [Spider](https://github.com/yusssfeee/RGP-GAME/tree/main/RPG_Pixel_Art_Assets/monster_animations/spider/README.md)
- [Elemental](https://github.com/yusssfeee/RGP-GAME/tree/main/RPG_Pixel_Art_Assets/monster_animations/elemental/README.md)
- [Demon](https://github.com/yusssfeee/RGP-GAME/tree/main/RPG_Pixel_Art_Assets/monster_animations/demon/README.md)
- [Boss Monsters](https://github.com/yusssfeee/RGP-GAME/tree/main/RPG_Pixel_Art_Assets/monster_animations/boss-monsters/README.md)

## 2. Actual completion status (verified)

**No family currently has a complete, production-ready animation set committed to this repository.** The repository currently contains planning/index documentation and family README files; it does not yet contain the requested new per-frame transparent animation PNGs or normalized animation atlases.

| Family | Characters | Actual state | Remaining work |
|---|---|---|---|
| Slime | Slime, Greater, Elite, King Slime | A small experimental GIF preview was produced in the original ChatGPT conversation; it is not a production sprite set and is not committed here. | Redraw/export independent frames, true alpha PNGs, normalize pivots and timings, test all clips. |
| Goblin | Goblin, Goblin Warrior, Goblin Archer, Goblin Chief | Concept animation boards were generated in the conversation; not committed as production frames. Family README documents the limitations. | Create clean per-character frames and atlas; verify alpha and loops. |
| Golem | Rock Golem, Stone Golem, Crystal Golem, Ancient Golem | Family folder and README only. | Generate all frames and export/test. |
| Undead | Skeleton, Skeleton Archer, Bone Knight, Lich | Family folder and README only. | Generate all frames and export/test. |
| Spider | Spider, Giant Spider, Poison Spider, Spider Queen | Family folder and README only. | Generate all frames and export/test. |
| Elemental | Fire Elemental, Ice Elemental, Storm Elemental, Earth Elemental | Family folder and README only. | Generate all frames and export/test. |
| Demon | Imp, Demon, Hellknight, Demon Lord | Family folder and README only. | Generate all frames and export/test. |
| Boss Monsters | Slime King, Goblin Warlord, Crystal Dragon, Lava Colossus | Family folder and README only. | Generate all frames and export/test. |

There are generated family overview/poster images in the original conversation, but these are **visual concept references only**. They are not separate animation frames, and a checkerboard or dark painted background is not proof of transparency. The images generated in that conversation were not uploaded as binary image files to this repository. Do not claim they are present in GitHub.

The pre-existing asset-pack README says the pack contains monster art and source sheets. Treat those as pre-existing static art assets until their actual files and alpha channels are inspected; do not assume they provide the new five-clip animation set.

## 3. Approved art direction — follow exactly

Use only the user's approved monster-family reference image in the originating conversation as the design authority. Do not introduce external monster references or redesign the families from unrelated artwork.

Preserve the detailed dark-fantasy pixel-art look:
- strong, readable silhouettes and crisp pixel clusters;
- material-specific highlights (slime gloss, worn leather/metal, stone facets, bone, chitin, elemental light);
- clear visual power progression inside each family;
- distinct body proportions and anatomy, not simple palette swaps and not overly chibi;
- recognizable signature equipment and traits (goblin armor/bow/chief regalia, golem crystals, undead weapons and Lich magic, spider legs/webs/venom, elemental bodies, demon wings/horns, boss-scale silhouettes).

## 4. Required clips and production structure

For every character, create five separate clips:
- `idle`
- `walk`
- `attack`
- `hurt`
- `death`

Recommended repository structure:

```
RPG_Pixel_Art_Assets/monster_animations/
  <family>/
    README.md
    source/                 # untouched generated source, if useful
    preview/                # contact sheets/GIF previews, clearly labelled
    frames/
      <character>/
        idle/frame_000.png
        walk/frame_000.png
        attack/frame_000.png
        hurt/frame_000.png
        death/frame_000.png
    atlas/
      <character>.png
      <character>.json
```

Use consistent frame canvas dimensions per character/atlas, fixed pivot/anchor and ground baseline, documented frame order and frame duration. Keep effects (projectiles, webs, magic, debris) organized consistently and avoid accidental clipping.

**Important drawing rule:** draw/reconstruct each pose as a new frame. Do not crop animation poses out of the original family poster or treat poster miniatures as usable frames.

**Transparency rule:** deliver PNGs with a real alpha channel. Inspect alpha programmatically or in an editor. A painted checkerboard, black background, or purple background is not transparency.

## 5. Acceptance checklist before marking a family complete

- [ ] All four characters in the family are present.
- [ ] Each character has all five clips (idle, walk, attack, hurt, death).
- [ ] Frames are independently drawn/exported, not poster crops.
- [ ] PNG alpha is real and verified.
- [ ] Frame dimensions, pivot and baseline are consistent.
- [ ] Walk/idle loops do not visibly jump.
- [ ] Attack has anticipation, impact and recovery poses where appropriate.
- [ ] Hurt and death are readable and do not clip.
- [ ] Sprite atlas and metadata agree on frame order and timing.
- [ ] Preview GIF/video is generated from the committed frame files.
- [ ] Files are committed in the correct family/character/clip folders.
- [ ] Only after review, integrate into the game and test desktop and mobile.

## 6. Access and permissions

This repository was verified as **private**.

For another GitHub account to continue:
1. The repository owner must invite that GitHub account as a collaborator (or grant access through the appropriate organization/team).
2. **Read** access is sufficient to inspect and download the repository.
3. **Write** access is required to add images, create folders, and commit the animation assets. Maintain/Admin is not required for ordinary asset commits.
4. The receiving account must accept the invitation.
5. If using ChatGPT from the other account, that account must independently connect/authorize its own GitHub integration and grant it access to this private repository. Sharing a conversation link does not transfer the current account's GitHub, Runway, files-library, or other connected-app credentials.
6. Never put passwords, personal access tokens, API keys, or private credentials in this file or in chat. Use GitHub's own authorization/invitation flow.

The current connected GitHub integration in the originating account had push permission when this handoff was written. That permission is account-specific and does not automatically apply to another ChatGPT account.

## 7. Safe continuation procedure

1. Fetch the latest `main` branch before editing. Do not rely only on this handoff's commit SHA if newer commits exist.
2. Inspect the existing `RPG_Pixel_Art_Assets/monsters/` and `source_sheets/` content before generating duplicates.
3. Preserve existing files; do not delete or overwrite unrelated game assets.
4. Work one family at a time internally, but continue through all families without waiting for the user after each one.
5. Commit source sheets, frame PNGs, atlases, metadata, and previews into the correct folders with descriptive commit messages.
6. Update each family README and this handoff status as actual assets pass the checklist.
7. Do not wire incomplete assets into the game. When integration begins, back up the latest game file first and limit code changes to the monster asset loading/rendering system.
8. Test animation timing, clipping, and layout on desktop and mobile.

## 8. First next actions

1. Inspect the current repository tree and identify the existing monster source images that may be reused as design input.
2. Produce the Slime and Goblin frame sets properly (the conversation previews are not enough).
3. Continue Golem, Undead, Spider, Elemental, Demon, and Boss Monsters.
4. Upload every approved source image and every final frame/atlas to its correct GitHub folder.
5. Keep this document truthful: update status only after files have been committed and checked.
