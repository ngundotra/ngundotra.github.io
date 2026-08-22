# The Grounds

A phone-first idle park. You are the clerk of a bright little zoo. Guests are slightly-wrong house-spirits. They walk inside fenced habitats. Types are weather in the walls.

We do not ask what they are. We ask which grounds.

This is original IP. Not a farm, not a battler, not Nintendo, not Pokémon, not 3D.

Yards are authored PNGs in `typehouse/img/` (kiln, well, greenhouse, cottage, grass, trees, Wicknoll). Exhibit PNGs are punched to the circular rail so they sit on the shared lawn, not a square grass plate. A packed-earth spine runs from the WELCOME gate mouth to each pen’s south bridge.

## Run locally

Zero build. Relative paths only.

- Open `typehouse/index.html` in a browser, or
- `npx serve typehouse`

After merge, the phone URL is https://ngundotra.github.io/typehouse/

Add to Home Screen: the folder ships a PWA manifest (`The Grounds`, theme `#6aaa48`) and apple-touch-icon. The files still live under `typehouse/` so the phone URL stays the same.

## How to play

1. The **Gatehouse** is already open at the front gate. **Wicknoll** waits. Wallet starts **12 Tally / 6 Scrap / 0 Hush-dust**. The park is a **3×2** deed with fogged lots around it.
2. Tap the wood **BUILD EMBER GROUNDS** pill (top-right). Ember Grounds is built on the lawn above the cottage (`1,1`) for 8 Tally. One tap. No second lot-hunt. The dirt path stays visible.
3. **ASSIGN WICKNOLL** from the pill, or tap Wicknoll at the gate then the pen. It walks inside the ring. Tally ticks.
4. After about a minute the grounds offer a **soot handshake**. Keep the soot.
5. Then **Tide Basin** and **Moss Plot** unlatch. Types press each other through the fence. HOME is a rug. FRICTION is an ember post. NOURISH is moss on the rail.
6. After Wicknoll is seated, tap fog to **BUY LAND**. First lot is 12 scrap, next is 20. Pan with one thumb. Pinch, double-tap, or the fat **+ / −** buttons to zoom (0.7×–2.2×). The park starts zoomed in on the Gatehouse.

Chrome is park furniture: one carved wallet plaque, **BUILD** / **ASSIGN** / **?** as wood/stone pills over the sky. Occupied pens answer on the map. Tap fog for BUY LAND, not BUILD. Long-press the title only if you truly want new grounds.

Away time keeps the park alive (capped at 8 hours, taxed 0.85). Come back after two minutes and the Night Desk has a recap.

## Debug (off by default)

- `?debug=1` — rich wallet and faster arrivals
- `?catchup=120` — apply 120 seconds of away catch-up
- `?evt=evt_soot_handshake` — fire a named event
- `?demo=seated` / `?demo=friction` — seed Ember Grounds+Wicknoll, or Tide Basin + Moss Plot beside it
- `?demo=mid` — ~8 lots, 5 habitats, several seated denizens, mid wallet, camera pulled back
- `?demo=late` — 16 lots, 8–10 habitats, many walkers, high wallet
- `?meet=1` — force the next fence-meet
- `?lots=3` — grant 3 legal fog lots free

Console: `Typehouse.selfCheck()` runs the 60s script (soot, friction drop, away tax, save, buyLot, v1 migrate).

## Save

`localStorage` key `typehouse.v1`. `s.v` 1→2 migrator turns old 4×4 cells into owned land plus a fog halo. Wallets are never wiped. Corrupt save starts new grounds. Offline-first. No accounts, no backend, no real money.
