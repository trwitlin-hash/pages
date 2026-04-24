# Secret Unblocked Games — Session Memory
> Last updated: 2026-04-17
> Paste this at the start of a new session:
> "We're working on a secret unblocked games website. Read MEMORY.md at /Users/tylerwitlin/Documents/Claude/Secret Unblocked Games/MEMORY.md before doing anything."

---

## What This Project Is

A private, key-gated website of browser games deployed at **https://burnt.codeberg.page**.
Disguised as "Google Classroom" — the gate page (index.html) looks like a real GC dashboard.
Users enter an access key to unlock the games grid. All games are 100% self-hosted locally — no external game URLs, so Securly (school network filter) can't block them.

---

## File Locations

All files: `/Users/tylerwitlin/Documents/Claude/Secret Unblocked Games/`

| File | Purpose |
|---|---|
| `index.html` | Gate page — looks like Google Classroom, enter key here |
| `loading.html` | Games grid — shown after valid key is entered |
| `auth.js` | SHA-256 key hashing + sessionStorage auth logic |
| `keys.js` | Hashed key definitions (never plain text) |
| `style.css` | All styling |
| `js/load.js` | Stub file — prevents 404s from sems games that reference `/js/load.js` |
| `games/` | All self-hosted game folders |

---

## Deployment

- **Live site:** `https://burnt.codeberg.page`
- **Local path:** `/Users/tylerwitlin/Documents/Claude/Secret Unblocked Games/`
- **Git remote:** `codeberg` → `https://codeberg.org/burnt/pages.git`
- **Push command:** `git push codeberg main:pages`
  - Codeberg Pages serves the `pages` branch automatically
- GitHub remote (`origin`) also exists but is secondary

---

## Auth Flow

1. User lands on `index.html` — sees a fake Google Classroom UI
2. They type their key and hit Enter (or Enter key)
3. On success: games open in a **new tab** (`loading.html`), original tab → **classroom.google.com** as disguise
4. If popups are blocked (Securly): games open in the same tab instead (fallback)
5. **Refresh = re-entry required** — auth uses `sessionStorage`, which clears on refresh/tab close

### Key System (auth.js + keys.js)
- Keys are **never stored in plain text** — only SHA-256 hashes in `keys.js`
- `auth.js` hashes input with `raw.trim().toUpperCase()` before comparing
- `isUnlocked()` checks session + expiry. `tryUnlock()` hashes input and validates.
- `isMaster()` checks if the stored hash matches the master key hash exactly

### Current Keys

| Plaintext | Tier | Expiry | Notes |
|---|---|---|---|
| (master key — kept offline) | Pro | Permanent | Can see broken-game reports panel |
| ARCADE2026 | Pro | Permanent | Friends key |
| HOMEWORK | Free | Permanent | Easy default key for free games |
| (4 pro keys) | Pro | 2026-05-15 | 30-day passes |
| (4 free keys) | Free | 2026-05-15 | 30-day passes |

**Never store actual key values here — hashes only. Plaintext keys kept offline/verbal.**

---

## Game Catalog

Defined as a `GAMES` array inline in `loading.html`. Each entry:
```js
{ name:"Game Name", emoji:"🎮", cat:"arcade", tier:"free"|"pro", src:"games/folder/index.html" }
```

- `tier:"free"` → visible to all users
- `tier:"pro"` → pro keys only
- All `src` values are local paths (`games/...`) — **no external URLs**

### Game Sources (how we got them)
- **sems/pages repo** (Codeberg) — sparse checkout of `gamesource/` — ~86 games
  - `git sparse-checkout set gamesource`
- **onlinegames.io** — `wget -r` downloads of Unity WebGL games
- **GitHub** — Five Nights at Epstein's cloned from `https://github.com/n1yshi/Five-Nights-at-Epstein`
- **Manual fixes** — Retro Bowl, Retro Bowl College, Moto X3M (see below)

### Game Engine Detection (for auditing)
| Engine | Key file to check |
|---|---|
| Unity WebGL (new) | `Build/game.loader.js` |
| Unity WebGL (old) | `Build/UnityLoader.js` OR `{name}.js` + `{name}.json` in root |
| GameMaker HTML5 | `html5game/` directory |
| Construct 2/3 | `c2runtime.js` / `c3runtime.js` |
| Flash/Ruffle | `.swf` + `ruffle/` |

⚠️ **Old Unity format does NOT use a `Build/` subfolder** — files can be in root or a custom folder.
Tanuki Sunset uses `unity/`, Baldi's Basics uses `baldi.js` in root. Don't remove these by mistake.

---

## Fixed Games (important — don't break these again)

### Moto X3M
- Path: `games/motox3m/motox3m/index.html` (nested — only this subfolder has the level data)
- Fix: replaced `<script src="https://imasdk.googleapis.com/js/sdkloader/ima3.js">` with a local IMA SDK stub
- The stub provides dummy `window.google.ima` objects so the game loop doesn't crash on null

### Retro Bowl
- Path: `games/retro-bowl/index.html`
- Source: sems version — uses `window.onload = GameMaker_Init`, no Poki sitelock
- Also has `window.cpd = function(){};` stub for bare `cpd()` call in RetroBowl.js line 6434

### Retro Bowl College
- Path: `games/retrobowlcollege/index.html`
- Source: sems version with Poki sitelock stripped, replaced with `<script>window.onload = GameMaker_Init;</script>`

### Granny
- Fix: `checkScreenSize()` called `hiddenBlock.style.display` without null check → added `if (!hiddenBlock) return;`

---

## Known Broken Patterns (things Securly blocks)

| What | Why blocked | Fix applied |
|---|---|---|
| External game CDNs | Securly network filter | All games now 100% local |
| Google IMA SDK (`imasdk.googleapis.com`) | Securly | Local IMA stub in Moto X3M |
| Poki SDK sitelock | Domain check → redirect | Replaced with sems versions |
| `window.open` popups | Securly popup blocker | Fallback: navigate in place |
| Construct `c2runtime.js` from onlinegames.io | 403 blocked | Don't add Construct games from that source |

---

## What NOT to Do

- Don't add Construct 2/3 games from onlinegames.io — `c2runtime.js` returns 403
- Don't use old Unity format detection that only checks for `Build/game.loader.js` — old format uses `UnityLoader.js`
- Don't re-add the self-cloak IIFE to `loading.html` — it hid the page body, Securly blocked the popup, body stayed hidden = "spasms"
- Don't add external `src` URLs to the GAMES array — Securly blocks all external game domains
- Never store plaintext keys in any committed file

---

## How to Push

```bash
cd "/Users/tylerwitlin/Documents/Claude/Secret Unblocked Games"
git add -A
git commit -m "[Section] Description of change"
git push codeberg main:pages
```

Codeberg takes ~1 minute to deploy after push.
