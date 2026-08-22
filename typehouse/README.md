# Typehouse

A phone-first idle boarding house. You are the night clerk. Guests are slightly-wrong house-spirits. Types are weather in the walls.

We do not ask what they are. We ask which room.

This is original IP. Not a farm, not a battler, not Nintendo, not Pokémon.

## Run locally

Zero build. Relative paths only.

- Open `typehouse/index.html` in a browser, or
- `npx serve typehouse`

After merge, the phone URL is https://ngundotra.github.io/typehouse/

Add to Home Screen: the folder ships a PWA manifest (`Typehouse`, theme `#1a1210`) and apple-touch-icon.

## How to play

1. The **Lobby** is already open at the front door. **Wicknoll** waits. Wallet starts **12 Tally / 6 Scrap / 0 Hush-dust**.
2. Tap the Lobby. **BUILD A HEARTH** on an adjacent empty cell (prefer the cell above, `1,1`) for 8 Tally.
3. **ASSIGN** Wicknoll. It sits down. Tally ticks.
4. After about a minute the house offers a **soot handshake**. Keep the soot.
5. Then **Cistern** and **Conservatory** unlatch. Types press each other through the walls. HOME is a rug. FRICTION is an ember tick. NOURISH is moss.

Dock: **BUILD** / **ASSIGN** / **?**. Tap a room for the sheet (guest, live tally/s, upgrade, assign). Long-press the title only if you truly want a new house.

Away time keeps the inn alive (capped at 8 hours, taxed 0.85). Come back after two minutes and the Night Desk has a recap.

## Debug (off by default)

- `?debug=1` — rich wallet and faster arrivals
- `?catchup=120` — apply 120 seconds of away catch-up
- `?evt=evt_soot_handshake` — fire a named event

## Save

`localStorage` key `typehouse.v1`. Corrupt save starts a new house. Offline-first. No accounts, no backend, no real money.
