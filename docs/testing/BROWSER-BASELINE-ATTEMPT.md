# Browser Baseline Attempt — Project X

**Date:** 2026-11-21  
**Repository:** `yusssfeee/RGP-GAME`  
**Branch:** `phase-0/baseline-audit`  
**Target:** pinned `Project X.html` copy (Git blob `5ade1cb528871ad410228697e21d317f80782160`)  
**Browser attempted:** Chromium 144.0.7559.96 (Debian GNU/Linux 13)  
**Test profile:** temporary, disposable profile under `/tmp/px-game-xvfb-profile`  
**Viewport:** 1365 × 900  
**Result:** **BLOCKED before the game document loaded**

## 1. Purpose

Attempt a real browser launch of the pinned game without modifying the repository source or using the user's normal browser profile/save data. This is a browser-environment validation attempt, not a code modification.

## 2. Exact attempt and observed result

A virtual X display was created with Xvfb because the execution container has no accessible physical X server at its advertised `:0` display. Chromium was launched as a regular windowed browser process inside that virtual display, using a brand-new temporary profile and the local pinned HTML file:

```bash
/usr/bin/Xvfb :98 -screen 0 1365x900x24 -nolisten tcp

DISPLAY=:98 /usr/bin/chromium \
  --no-sandbox \
  --disable-dev-shm-usage \
  --no-first-run \
  --no-default-browser-check \
  --disable-extensions \
  --user-data-dir=/tmp/px-game-xvfb-profile \
  --window-size=1365,900 \
  --new-window \
  'file:///mnt/data/files/Project%20X.html'
```

The browser window opened and reached the local file URL. A captured screenshot showed the browser's organization policy page:

> “file” links are blocked  
> Your organization doesn’t allow you to view this site

Therefore Chromium did **not** load or render the game. This is a host/browser policy block, not a JavaScript exception from `Project X.html`.

## 3. Other launch attempts

- A normal Chromium GUI launch against the same local file on the container's advertised `:0` display failed because no X server was actually available at that display.
- Headless Chromium attempts with separate temporary profiles did not produce a DOM dump before the execution command timed out. The logs contained graphics initialization, D-Bus and Mojo/zygote environment errors; no game-page DOM or game JavaScript console was obtained.
- Earlier baseline attempts against both `file://` and loopback HTTP were blocked with `net::ERR_BLOCKED_BY_ADMINISTRATOR`. This is also recorded in [STATIC-VALIDATION-RESULTS.md](STATIC-VALIDATION-RESULTS.md).

The later Xvfb run confirms that Chromium itself can start in a virtual display, but the local-file navigation is blocked by the organization policy. No attempt was made to tunnel, proxy, re-host, inject, or otherwise circumvent that restriction.

## 4. Test evidence and what it does / does not prove

| Check | Result | Interpretation |
|---|---|---|
| Chromium process startup in Xvfb | Started | Browser binary and virtual display can run |
| Navigation to local `file://` game URL | BLOCKED | Organization policy blocked local-file viewing |
| Game HTML document load | Not reached | No game startup result |
| Game JavaScript execution | Not reached / unknown | No application runtime claim |
| Game console errors | Not collected | The browser stopped before game load |
| Screenshots of game UI | None | The only screenshot shows the organization block page |
| Save data access | None | A new disposable browser profile was used; no user save was opened or changed |
| Gameplay interaction | Not possible | No game controls or screens were available |

Do not interpret browser D-Bus, GPU, EGL or Mojo startup messages as game JavaScript errors. They are environment/browser-process diagnostics.

## 5. Safe continuation

The next test requires an organization-approved browser surface that permits opening the local game file (or an explicitly approved local development origin). Ask the user or environment administrator to enable an allowed testing route. Do not bypass the organization block or attempt to reach the same page through an alternate browser surface, proxy, raw CDP or injected runtime.

Once an approved browser route exists:
1. Open the same frozen baseline in an empty disposable profile.
2. Record startup success/failure and the browser's actual Console output.
3. Capture the initial screen and navigation states.
4. Run the save-slot and gameplay regression checklist with disposable test data.
5. Test the legacy `S.trade` trip and V4 `S.cv.runs` caravan paths separately because their `tradeTick` implementation was replaced later in the source.
6. Save exact steps, expected/actual outcomes and evidence in [REGRESSION-BASELINE.md](REGRESSION-BASELINE.md).

**Conclusion:** Chromium was launched successfully in a virtual display, but organization policy blocked the local game file before it loaded. No game runtime or gameplay test is claimed as passed or failed.
