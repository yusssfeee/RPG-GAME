# Slime Family — Animation Assets

Original transparent SVG pixel-art assets for the game's four slime ranks. Each standalone SVG includes five named animation clips with multi-pose CSS keyframes.

## Characters
- slime.svg — common green slime
- greater-slime.svg — larger, tougher green slime
- elite-slime.svg — emerald elite with crystalline crest
- king-slime.svg — blue royal boss with gold crown and jewel

## Clips
Each SVG supports idle, walk, attack, hurt, and death through the data-clip attribute on .slime-unit. The canvas has a transparent background. No poster crops or external references are used as animation frames.

## Integration
The game embeds matching SVG markup and CSS directly so it remains offline-ready as one HTML file.
