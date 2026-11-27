# ChatGPT / Codex project instructions

Always read the repository-root `AGENTS.md` first, then `HANDOFF.md`. `AGENTS.md` is authoritative.

The only canonical game source is root `Project X.html`. Do not use, merge from, copy from, or restore older game HTML files. Inspect the current branch and the canonical file before changing anything. Preserve game systems, save compatibility, visual direction, and existing assets. Follow the gradual Full + Modular architecture plan; do not rewrite the game from scratch.

After ANY edit to `Project X.html`, keep `src/` in sync and run the checks described in `AGENTS.md` ("Keeping `src/` in sync"):

    python tools/sync_src.py "Project X.html"
    python tools/sync_src.py "Project X.html" --check
    cd tests ; node run.js

Report only tests you actually performed. The owner is not a programmer: write replies in Arabic, give one clear step at a time, and state the expected output of each command.
