# Slime Motion Lab

An isolated, mobile-friendly browser prototype for the Slime's five core motion states:

- Idle
- Walk
- Attack
- Hurt
- Death

## Preview

Open `slime-motion-lab.html` in a browser. The buttons replay each state.

## Scope and status

This is a **motion prototype**, not a production sprite animation set. It uses a custom SVG slime drawing with CSS motion to validate timing, squash/stretch, recoil, attack lunge, and death readability on desktop and mobile.

It is intentionally separate from `RPG_Game7_MOBILE_STABLE.html`. The main game has not been modified by this prototype. Do not mark the Slime family production-ready until independently drawn transparent PNG frames, consistent pivots/baselines, an atlas and metadata have been created and verified.

## Next production steps

1. Approve the slime silhouette and motion feel.
2. Produce true transparent per-frame art for all five clips.
3. Verify frame bounds, alpha, timing and loop continuity.
4. Integrate behind the existing monster renderer without changing combat math or save data.
5. Test the live campaign on desktop and mobile.
