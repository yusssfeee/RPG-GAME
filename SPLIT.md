# Split layout (step 1 — lossless, reversible)

`Project X.html` stays the canonical file. `src/` is a mechanical, lossless decomposition of it:

- `src/scripts/NNN-<id>.js` — the 52 inline `<script>` blocks, in original load order (NNN = order).
- `src/styles/NNN-<id>.css` — the 41 inline `<style>` blocks, in original order.
- `src/index.template.html` — the page markup; each block is replaced by `<!--@@BLOCK:NNN@@-->`.
- `src/assets/embedded/` — the images that were base64-embedded (527 files); referenced as `{{BLOB:bNNNN.ext}}`.
- `src/manifest.json` — order, tag attributes and mime types.

`python3 tools/build.py . "Project X.html"` rebuilds the single file. Verified byte-identical to the original (SHA-256 4bddd8f2…293d).
`python3 tools/split.py "Project X.html" .` regenerates `src/` from the single file.

Load order matters: later scripts wrap/patch earlier globals (render, strike, startFight, foeDown...). Never reorder NNN.

## Phase 1 (main script split)
`src/scripts/011/NN-<section>.js` are the 26 sections of the old `011-anon.js` (+ a 1-line header), in load order. `build.py` joins them back into ONE script, so the single file is byte-identical. `python tools/build.py . out.html --separate` loads them as separate scripts, to test the split. Do not reorder NN.
