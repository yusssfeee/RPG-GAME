from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
GAME = ROOT / "RPG_Game7_MOBILE_STABLE.html"
RUNTIME = ROOT / "RPG_Pixel_Art_Assets/monster_animations/slime/slime-family-runtime.js"
html = GAME.read_text(encoding="utf-8")
runtime = RUNTIME.read_text(encoding="utf-8")
css = """<style id="slime-family-animation-css">
.slime-unit{isolation:isolate}.slime-core{transform-box:fill-box;transform-origin:50% 90%;filter:drop-shadow(0 2px 0 rgba(0,0,0,.18))}
.slime-unit[data-clip="idle"] .slime-core{animation:slime-idle 2.25s ease-in-out infinite}
.slime-unit[data-clip="walk"] .slime-core{animation:slime-walk .72s ease-in-out infinite}
.slime-unit[data-clip="attack"] .slime-core{animation:slime-attack .62s ease-in-out 1}
.slime-unit[data-clip="hurt"] .slime-core{animation:slime-hurt .42s ease-in-out 1}
.slime-unit[data-clip="death"] .slime-core{animation:slime-death .9s ease-in-out 1 forwards}
@keyframes slime-idle{0%,100%{transform:translateY(0) scale(1)}25%{transform:translateY(-2px) scale(.99,1.025)}50%{transform:translateY(-3px) scale(1.025,.975)}75%{transform:translateY(-1px) scale(1.01,1)}}
@keyframes slime-walk{0%,100%{transform:translateX(-2px) scale(.96,1.04)}25%{transform:translateY(-5px) scale(1.04,.94)}50%{transform:translateX(2px) scale(.96,1.05)}75%{transform:translateY(-4px) scale(1.04,.95)}}
@keyframes slime-attack{0%{transform:translateX(0) scale(1)}20%{transform:translateX(-7px) scale(1.18,.82)}45%{transform:translate(15px,-4px) scale(.88,1.18)}70%{transform:translateX(9px) scale(1.1,.9)}100%{transform:translateX(0) scale(1)}}
@keyframes slime-hurt{0%,100%{transform:translateX(0) scale(1)}20%{transform:translateX(-6px) scale(.88,1.12)}45%{transform:translateX(5px) scale(1.08,.92)}70%{transform:translateX(-2px) scale(.96,1.04)}}
@keyframes slime-death{0%{transform:translateY(0) scale(1);opacity:1}20%{transform:translateY(-7px) scale(1.08,.9);opacity:1}50%{transform:translateY(7px) scale(1.2,.55);opacity:.9}80%{transform:translateY(9px) scale(1.35,.18);opacity:.45}100%{transform:translateY(12px) scale(1.45,.02);opacity:0}}
.slime-death-ghost{position:fixed!important;z-index:9999!important;pointer-events:none!important;overflow:visible!important}
.slime-death-ghost .slime-unit .slime-core{animation:slime-death .9s ease-in-out forwards!important}
@media(prefers-reduced-motion:reduce){.slime-unit .slime-core{animation-duration:1ms!important;animation-iteration-count:1!important}}
</style>"""
start = '<!-- SLIME_FAMILY_ANIMATION_V1 -->'
end = '<!-- /SLIME_FAMILY_ANIMATION_V1 -->'
block = start + "\n" + css + "\n<script id=\"slime-family-animation-v1\">\n" + runtime + "\n</script>\n" + end
if start in html and end in html:
    a = html.index(start)
    b = html.index(end, a) + len(end)
    html = html[:a] + block + html[b:]
else:
    pos = html.lower().rfind("</body>")
    if pos < 0:
        raise SystemExit("Could not locate </body>; refusing to modify game.")
    html = html[:pos] + block + "\n" + html[pos:]
GAME.write_text(html, encoding="utf-8")
print("Integrated slime family runtime into", GAME.name, "—", len(html), "characters")
