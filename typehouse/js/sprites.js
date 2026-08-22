/* The Grounds — zoo exhibit pens. House-spirits inside the rails. */
(function (G) {
  const P = G.THData.PAL;

  function art(map, pal) {
    return { map: map, pal: pal };
  }

  const GUESTS = {
    Wicknoll: art(
      [
        "........................",
        ".........333333.........",
        "........32222223........",
        ".......3222222223.......",
        "......322111111223......",
        "......321144441123......",
        "......321144441123......",
        "......321111111123......",
        ".......3211111123.......",
        "........32222223........",
        ".......3322222233.......",
        "......3.3.2222.3.3......",
        ".....33.3..22..3.33.....",
        ".....3..3......3..3.....",
        "....33..3......3..33....",
        "....3...3......3...3....",
        "...33..............33...",
        "........................",
        "........................",
        "........................",
        "........................",
        "........................",
        "........................",
        "........................",
      ],
      ["#c47828", "#8a4a18", "#3a2010", "#ffe060"]
    ),
    Puddlewick: art(
      [
        "........................",
        "....3...................",
        "...323.....222222.......",
        "...32.2...22111122......",
        "....3.2..2211441122.....",
        ".....32..2114444112.....",
        "......3221144444112.....",
        "......22111444441122....",
        "......22111111111122....",
        ".......22222222222......",
        "........2.2....2.2......",
        "........3.3....3.3......",
        "........3.3....3.3......",
        ".......33.33..33.33.....",
        "........................",
        "........................",
        "........................",
        "........................",
        "........................",
        "........................",
        "........................",
        "........................",
        "........................",
        "........................",
      ],
      ["#f4f0e8", "#3a88c8", "#8b5a32", "#4ec8e8"]
    ),
    Ledgerfrond: art(
      [
        "........................",
        "......111.11.111........",
        ".....11211121121........",
        ".....11122112211........",
        "......112111211.........",
        ".......1111111..........",
        "......2211141112........",
        ".....221111111122.......",
        ".....2.111333111.2......",
        ".....2.113333311.2......",
        ".....2.113444311.2......",
        ".....2.113333311.2......",
        "......2.1133311.2.......",
        ".......2.11111.2........",
        "........22...22.........",
        "........2.....2.........",
        ".......11.....11........",
        "........................",
        "........................",
        "........................",
        "........................",
        "........................",
        "........................",
        "........................",
      ],
      ["#3db84a", "#1e6a28", "#c4a574", "#2a1c12"]
    ),
    Zitterplug: art(
      [
        "................",
        ".3.3......3.3...",
        "..3........3....",
        "...22111122.....",
        "..2211111122....",
        "..2114..4112....",
        "..2211111122....",
        "...22211222.....",
        "....221122......",
        "...22.22.22.....",
        "..22..2...22....",
        "..3.........3...",
        "................",
        "................",
        "................",
        "................",
      ],
      [P.lamp, P.copper, P.parchment, P.ink]
    ),
    Napwisp: art(
      [
        "................",
        "......33........",
        ".....2222.......",
        "....22..22......",
        "....2....2......",
        "...22....22.....",
        "...2.2222.2.....",
        "...2.2..2.2.....",
        "...2.2222.2.....",
        "...22....22.....",
        "....2.22.2......",
        "....2....2......",
        "...33....33.....",
        "................",
        "................",
        "................",
      ],
      [P.timber, P.ink, P.parchment, P.dusk]
    ),
    Flakesmith: art(
      [
        "................",
        "......33........",
        "......22........",
        "....221122......",
        "...22111122.....",
        "..33211411233...",
        "..3.2111112.3...",
        "...22111122.....",
        "....222222......",
        "....2.22.2......",
        "...22....22.....",
        "...2......2.....",
        "..33......33....",
        "................",
        "................",
        "................",
      ],
      [P.copper, P.ember, P.timber, P.lamp]
    ),
    Specktin: art(
      [
        "................",
        "......33........",
        ".....3223.......",
        "....321123......",
        "....214412......",
        "....321123......",
        ".....3223.......",
        "......22........",
        ".....2222.......",
        "....22..22......",
        "....2....2......",
        "...33....33.....",
        "................",
        "................",
        "................",
        "................",
      ],
      [P.parchment, P.lamp, P.copper, P.ink]
    ),
    Fluekin: art(
      [
        "................",
        ".3.3.3..3.3.3...",
        "..3.3....3.3....",
        "...22111122.....",
        "...21111112.....",
        "...21444112.....",
        "...21111112.....",
        "....211112......",
        "....221122......",
        ".....2222.......",
        ".....2..2.......",
        "....33..33......",
        "................",
        "................",
        "................",
        "................",
      ],
      [P.dusk, P.timber, P.parchment, P.ink]
    ),
    Ashletter: art(
      [
        "................",
        "....333333......",
        "...32222223.....",
        "...22111122.....",
        "...21144112.....",
        "...21111112.....",
        "...22111122.....",
        "....222222......",
        ".....2..2.......",
        "....22..22......",
        "................",
        "................",
        "................",
        "................",
        "................",
        "................",
      ],
      [P.ember, P.timber, P.parchment, P.ink]
    ),
    Jarfox: art(
      [
        "................",
        "....333333......",
        "...32222223.....",
        "...22111122.....",
        "...21144112.....",
        "...21111112.....",
        "...22133122.....",
        "....222222......",
        ".....2..233.....",
        ".....2...23.....",
        "....33....3.....",
        "................",
        "................",
        "................",
        "................",
        "................",
      ],
      [P.dusk, P.copper, P.lamp, P.ink]
    ),
    Roofself: art(
      [
        "................",
        "..3333333333....",
        "...32222223.....",
        "....2211122.....",
        "....2114112.....",
        "....2211122.....",
        ".....22222......",
        ".....2..2.......",
        "....22..22......",
        "....3....3......",
        "................",
        "................",
        "................",
        "................",
        "................",
        "................",
      ],
      [P.moss, P.timber, P.dusk, P.ink]
    ),
    Lampwyrm: art(
      [
        "................",
        "..........33....",
        "........3223....",
        ".......32113....",
        "....33321112....",
        "...322211112....",
        "...21114412.....",
        "...22111122.....",
        "....222222......",
        ".....2..2.......",
        "....33..33......",
        "................",
        "................",
        "................",
        "................",
        "................",
      ],
      [P.lamp, P.parchment, P.ember, P.ink]
    ),
  };

  var YARD = {
    hearth: "kiln",
    cistern: "well",
    conservatory: "greenhouse",
    lobby: "cottage",
  };

  var NAMES = [
    "kiln",
    "well",
    "greenhouse",
    "cottage",
    "grass",
    "path",
    "trees",
    "canopy",
    "wicknoll",
    "puddlewick",
    "ledgerfrond",
    "lantern",
    "buyland",
  ];
  var GUEST_PNG = {
    Wicknoll: "wicknoll",
    Puddlewick: "puddlewick",
    Ledgerfrond: "ledgerfrond",
  };
  var IMG = {};
  var readyCount = 0;
  var waiters = [];
  var cache = {};
  var punched = false;

  function isReady() {
    return readyCount >= NAMES.length;
  }

  function notify() {
    if (!isReady()) return;
    if (!punched) {
      punched = true;
      ["kiln", "well", "greenhouse"].forEach(function (n) {
        if (IMG[n] && srcW(IMG[n])) IMG[n] = punchRail(IMG[n]);
      });
      if (IMG.cottage && srcW(IMG.cottage)) IMG.cottage = punchCottagePlate(IMG.cottage);
    }
    waiters.splice(0).forEach(function (fn) {
      fn();
    });
  }

  function load(cb) {
    if (cb) {
      if (isReady()) cb();
      else waiters.push(cb);
    }
    if (readyCount) return;
    NAMES.forEach(function (n) {
      var im = new Image();
      im.onload = function () {
        readyCount++;
        notify();
      };
      im.onerror = function () {
        readyCount++;
        notify();
      };
      im.src = "img/" + n + ".png";
      IMG[n] = im;
    });
  }

  function srcW(im) {
    return im.naturalWidth || im.width || 0;
  }

  function srcH(im) {
    return im.naturalHeight || im.height || 0;
  }

  function isPlateLime(r, g, b, a) {
    return a > 8 && g > 100 && g >= r + 8 && g > b + 20 && b < 90;
  }

  /* Kill leftover lime grass plate. Keep the circular rail + south wood bridge. */
  function punchRail(im) {
    var w = srcW(im);
    var h = srcH(im);
    if (!w || !h) return im;
    var c = document.createElement("canvas");
    c.width = w;
    c.height = h;
    var ctx = c.getContext("2d");
    ctx.drawImage(im, 0, 0);
    var data = ctx.getImageData(0, 0, w, h);
    var px = data.data;
    var cx = w * 0.5;
    var cy = h * 0.49;
    var inner = Math.min(w, h) * 0.375;
    var outer = Math.min(w, h) * 0.42;
    var i;
    var x;
    var y;
    var r;
    var g;
    var b;
    var a;
    var dx;
    var dy;
    var d2;
    var lime;
    var bridge;
    for (y = 0; y < h; y++) {
      for (x = 0; x < w; x++) {
        i = (y * w + x) * 4;
        a = px[i + 3];
        if (a < 8) continue;
        r = px[i];
        g = px[i + 1];
        b = px[i + 2];
        dx = x - cx;
        dy = y - cy;
        d2 = dx * dx + dy * dy;
        lime = isPlateLime(r, g, b, a);
        if (d2 <= inner * inner) continue;
        if (lime) {
          px[i + 3] = 0;
          continue;
        }
        if (d2 <= outer * outer) continue;
        bridge = Math.abs(dx) <= 18 && y > h * 0.52 && y < h * 0.9 && r > 155 && b > 18 && g < 215;
        if (bridge) continue;
        px[i + 3] = 0;
      }
    }
    ctx.putImageData(data, 0, 0);
    return c;
  }

  /* Gatehouse: keep stone, wood, tickets, dirt stub. Lose the lime rectangle. */
  function punchCottagePlate(im) {
    var w = srcW(im);
    var h = srcH(im);
    if (!w || !h) return im;
    var c = document.createElement("canvas");
    c.width = w;
    c.height = h;
    var ctx = c.getContext("2d");
    ctx.drawImage(im, 0, 0);
    var data = ctx.getImageData(0, 0, w, h);
    var px = data.data;
    var i;
    for (i = 0; i < px.length; i += 4) {
      if (isPlateLime(px[i], px[i + 1], px[i + 2], px[i + 3])) px[i + 3] = 0;
    }
    ctx.putImageData(data, 0, 0);
    return c;
  }

  function blit(ctx, name, x, y, w, h) {
    var im = IMG[name];
    if (!im || !srcW(im)) return false;
    var sx = w / srcW(im);
    var sy = h / srcH(im);
    var integer =
      Math.abs(sx - Math.round(sx)) < 0.02 && Math.abs(sy - Math.round(sy)) < 0.02;
    ctx.imageSmoothingEnabled = !integer;
    ctx.drawImage(im, Math.round(x), Math.round(y), Math.round(w), Math.round(h));
    return true;
  }

  function blitCrisp(ctx, name, x, y, w, h) {
    var im = IMG[name];
    if (!im || !srcW(im)) return false;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(im, Math.round(x), Math.round(y), Math.round(w), Math.round(h));
    return true;
  }

  function paintVisitorPath(ctx, x1, y1, x2, y2) {
    ctx.save();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#5a3a18";
    ctx.lineWidth = 26;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.strokeStyle = "#b07a38";
    ctx.lineWidth = 20;
    ctx.stroke();
    ctx.strokeStyle = "#d4a05a";
    ctx.lineWidth = 12;
    ctx.stroke();
    ctx.restore();
  }

  function lotOrigin(c, bounds, lot) {
    return {
      x: (c.x - bounds.minX) * lot,
      y: (bounds.maxY - c.y) * lot,
    };
  }

  function drawMap(ctx, a, scale, ox, oy) {
    for (var y = 0; y < a.map.length; y++) {
      var row = a.map[y];
      for (var x = 0; x < row.length; x++) {
        var ch = row.charAt(x);
        if (ch === "." || ch === "0") continue;
        ctx.fillStyle = a.pal[parseInt(ch, 10) - 1] || P.lamp;
        ctx.fillRect(ox + x * scale, oy + y * scale, scale, scale);
      }
    }
  }

  function paintGuest(canvas, id, frame, opt) {
    opt = opt || {};
    var ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var bob = opt.sit ? 0 : frame % 2 ? 2 : 0;
    ctx.save();
    if (opt.flip) {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }
    var png = GUEST_PNG[id];
    if (png && IMG[png] && srcW(IMG[png])) {
      ctx.imageSmoothingEnabled = false;
      var pad = 1;
      ctx.drawImage(IMG[png], pad, pad + bob, canvas.width - pad * 2, canvas.height - pad * 2 - bob);
      ctx.restore();
      return;
    }
    var a = GUESTS[id];
    if (!a) {
      ctx.restore();
      return;
    }
    var mw = a.map[0].length;
    var mh = a.map.length;
    var scale = Math.max(1, Math.floor(Math.min(canvas.width / mw, canvas.height / mh)));
    var ox = Math.floor((canvas.width - mw * scale) / 2);
    var oy = Math.floor((canvas.height - mh * scale) / 2);
    drawMap(ctx, a, scale, ox, oy + bob);
    ctx.restore();
  }

  function guestUrl(id, scale) {
    scale = scale || 3;
    var key = id + ":" + scale;
    if (cache[key]) return cache[key];
    var a = GUESTS[id];
    if (!a) return "";
    var mw = a.map[0].length;
    var mh = a.map.length;
    var c = document.createElement("canvas");
    c.width = mw * scale;
    c.height = mh * scale;
    var ctx = c.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    drawMap(ctx, a, scale, 0, 0);
    cache[key] = c.toDataURL();
    return cache[key];
  }

  function paintPark(canvas, opt) {
    opt = opt || {};
    var ctx = canvas.getContext("2d");
    var w = canvas.width;
    var h = canvas.height;
    var lot = opt.lot || 192;
    var bounds = opt.bounds || { minX: 0, minY: 0, maxX: 2, maxY: 1 };
    var owned = opt.owned || {};
    var x;
    var y;
    ctx.imageSmoothingEnabled = false;
    if (IMG.grass && srcW(IMG.grass)) {
      var gw = srcW(IMG.grass);
      var gh = srcH(IMG.grass);
      for (y = 0; y < h; y += gh) {
        for (x = 0; x < w; x += gw) {
          ctx.drawImage(IMG.grass, x, y);
        }
      }
    } else {
      ctx.fillStyle = "#58b03c";
      ctx.fillRect(0, 0, w, h);
    }
    /* Sky + trees only on the north zoo edge, never under the pens. */
    var skyH = Math.floor(lot * 0.18);
    if (bounds.maxY >= 2) skyH = Math.floor(lot * 0.12);
    ctx.fillStyle = "#7ec8f0";
    ctx.fillRect(0, 0, w, skyH);
    ctx.fillStyle = "#4aa8e8";
    ctx.fillRect(0, 0, w, Math.floor(skyH * 0.45));
    if (IMG.trees && srcW(IMG.trees)) {
      ctx.drawImage(IMG.trees, 0, 0, w, Math.floor(lot * 0.28));
    }
    /* Grass only. Dirt spine is painted on #roads above the lots. */
  }

  function paintRoads(canvas, opt) {
    opt = opt || {};
    var ctx = canvas.getContext("2d");
    var lot = opt.lot || 192;
    var bounds = opt.bounds || { minX: 0, minY: 0, maxX: 2, maxY: 1 };
    var owned = opt.owned || {};
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    paintDirtSpine(ctx, lot, bounds, owned);
    ctx.save();
    ctx.globalCompositeOperation = "destination-out";
    Object.keys(owned).forEach(function (k) {
      var c = owned[k];
      if (!c || !c.room || c.room === "lobby" || c.room === "transom" || c.room === "larder") return;
      var o = lotOrigin(c, bounds, lot);
      /* Inner yard only. r=0.40 ate the south bridge (fy≈0.82). */
      ctx.beginPath();
      ctx.arc(o.x + lot * 0.5, o.y + lot * 0.49, lot * 0.28, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();
    paintForcedApproaches(ctx, lot, bounds, owned);
    paintParkLamps(ctx, lot, bounds, owned);
  }

  function paintLampPost(ctx, x, y) {
    ctx.save();
    ctx.fillStyle = "#2a1c10";
    ctx.fillRect(Math.round(x) - 2, Math.round(y) - 16, 4, 16);
    ctx.fillStyle = "#6a5030";
    ctx.fillRect(Math.round(x) - 1, Math.round(y) - 14, 2, 12);
    ctx.fillStyle = "rgba(255, 214, 70, 0.28)";
    ctx.beginPath();
    ctx.arc(x, y - 18, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#ffe060";
    ctx.beginPath();
    ctx.arc(x, y - 18, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function paintParkLamps(ctx, lot, bounds, owned) {
    var spots = [
      lotPt(1, 0, bounds, lot, 0.62, 0.78),
      lotPt(1, 0, bounds, lot, 0.38, 0.34),
    ];
    if (hasLot(owned, 1, 1)) spots.push(lotPt(1, 1, bounds, lot, 0.64, 0.86));
    if (hasLot(owned, 0, 1)) spots.push(lotPt(0, 1, bounds, lot, 0.5, 0.86));
    if (hasLot(owned, 2, 1)) spots.push(lotPt(2, 1, bounds, lot, 0.5, 0.86));
    if (hasLot(owned, 1, 2)) spots.push(lotPt(1, 2, bounds, lot, 0.64, 0.86));
    spots.forEach(function (p) {
      paintLampPost(ctx, p.x, p.y);
    });
  }

  /* After dest-out: one dirt figure from the gate mouth to each pen south bridge.
     South lips + a side bypass — never recross a punched yard. */
  function paintForcedApproaches(ctx, lot, bounds, owned) {
    var mouth = lotPt(1, 0, bounds, lot, 0.5, 0.96);
    var gateN = lotPt(1, 0, bounds, lot, 0.5, 0.16);
    var emberLip = lotPt(1, 1, bounds, lot, 0.5, 0.86);
    paintVisitorPath(ctx, mouth.x, mouth.y, gateN.x, gateN.y);
    paintVisitorPath(ctx, gateN.x, gateN.y, emberLip.x, emberLip.y);

    var rows = {};
    Object.keys(owned).forEach(function (k) {
      var c = owned[k];
      if (!c || !c.room || c.room === "lobby") return;
      if (!rows[c.y]) rows[c.y] = [];
      rows[c.y].push(c);
      var bridge = lotPt(c.x, c.y, bounds, lot, 0.5, 0.84);
      var lip = lotPt(c.x, c.y, bounds, lot, 0.5, 0.88);
      paintVisitorPath(ctx, bridge.x, bridge.y, lip.x, lip.y);
      if (c.x !== 1) {
        paintVisitorPath(ctx, lip.x, lip.y, lotPt(1, c.y, bounds, lot, 0.5, 0.88).x, lotPt(1, c.y, bounds, lot, 0.5, 0.88).y);
      }
    });

    Object.keys(rows)
      .map(Number)
      .sort(function (a, b) {
        return a - b;
      })
      .forEach(function (y) {
        if (y <= 1) return;
        var hi = lotPt(1, y, bounds, lot, 0.88, 0.88);
        var lo = lotPt(1, y - 1, bounds, lot, 0.88, 0.88);
        paintVisitorPath(ctx, hi.x, hi.y, lo.x, lo.y);
        paintVisitorPath(ctx, hi.x, hi.y, lotPt(1, y, bounds, lot, 0.5, 0.88).x, lotPt(1, y, bounds, lot, 0.5, 0.88).y);
        paintVisitorPath(ctx, lo.x, lo.y, lotPt(1, y - 1, bounds, lot, 0.5, 0.88).x, lotPt(1, y - 1, bounds, lot, 0.5, 0.88).y);
      });
  }

  function lotPt(x, y, bounds, lot, fx, fy) {
    return {
      x: (x - bounds.minX) * lot + lot * fx,
      y: (bounds.maxY - y) * lot + lot * fy,
    };
  }

  function hasLot(owned, x, y) {
    return !!(owned[x + "," + y]);
  }

  /* One packed-earth figure: gate mouth → north bridges. Lamps sit on the dirt. */
  function paintDirtSpine(ctx, lot, bounds, owned) {
    var mouth = lotPt(1, 0, bounds, lot, 0.5, 0.92);
    var fork = lotPt(1, 1, bounds, lot, 0.5, 0.8);
    var west = lotPt(0, 1, bounds, lot, 0.5, 0.8);
    var east = lotPt(2, 1, bounds, lot, 0.5, 0.8);
    var gateMid = lotPt(1, 0, bounds, lot, 0.5, 0.42);
    paintVisitorPath(ctx, mouth.x, mouth.y, gateMid.x, gateMid.y);
    paintVisitorPath(ctx, gateMid.x, gateMid.y, fork.x, fork.y);
    if (hasLot(owned, 0, 1) || hasLot(owned, 2, 1)) {
      paintVisitorPath(ctx, west.x, west.y, east.x, east.y);
    }
    Object.keys(owned).forEach(function (k) {
      var c = owned[k];
      if (!c || !c.room || c.room === "lobby") return;
      var bridge = lotPt(c.x, c.y, bounds, lot, 0.5, 0.8);
      var south = owned[c.x + "," + (c.y - 1)];
      var eastC = owned[c.x + 1 + "," + c.y];
      if (south) {
        var so = lotPt(south.x, south.y, bounds, lot, 0.5, south.room === "lobby" ? 0.28 : 0.8);
        paintVisitorPath(ctx, bridge.x, bridge.y, so.x, so.y);
      }
      if (eastC && eastC.room) {
        var eo = lotPt(eastC.x, eastC.y, bounds, lot, 0.5, 0.8);
        paintVisitorPath(ctx, bridge.x, bridge.y, eo.x, eo.y);
      }
    });
  }

  function fillDisk(ctx, cx, cy, r, col) {
    ctx.fillStyle = col;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
  }

  function paintFenceRing(ctx, cx, cy, r, col) {
    ctx.save();
    ctx.strokeStyle = "#2a1c10";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0.15 * Math.PI, 0.85 * Math.PI, true);
    ctx.stroke();
    ctx.strokeStyle = col || "#8a6030";
    ctx.lineWidth = 3;
    ctx.stroke();
    var i;
    var a;
    var px;
    var py;
    for (i = 0; i < 10; i++) {
      a = (i / 10) * Math.PI * 1.7 + 0.55 * Math.PI;
      px = Math.round(cx + Math.cos(a) * r);
      py = Math.round(cy + Math.sin(a) * r);
      ctx.fillStyle = "#3a2410";
      ctx.fillRect(px - 2, py - 3, 5, 8);
      ctx.fillStyle = "#a87838";
      ctx.fillRect(px - 1, py - 2, 3, 6);
    }
    ctx.restore();
  }

  function paintTypeBadge(ctx, cx, cy, type) {
    var x = cx + 18;
    var y = cy + 28;
    ctx.fillStyle = "#2a1c10";
    ctx.fillRect(x - 1, y - 1, 14, 14);
    ctx.fillStyle = G.THData.TYPE_COLOR[type] || P.copper;
    ctx.fillRect(x, y, 12, 12);
    ctx.fillStyle = "#fff6dc";
    if (type === "ember") {
      ctx.fillRect(x + 5, y + 3, 2, 7);
      ctx.fillRect(x + 3, y + 6, 6, 2);
    } else if (type === "tide") {
      ctx.fillRect(x + 5, y + 2, 2, 3);
      ctx.fillRect(x + 3, y + 6, 6, 4);
    } else if (type === "moss") {
      ctx.fillRect(x + 5, y + 2, 2, 8);
      ctx.fillRect(x + 2, y + 5, 8, 2);
    } else if (type === "spark") {
      ctx.fillRect(x + 5, y + 2, 2, 8);
      ctx.fillRect(x + 2, y + 5, 8, 2);
      ctx.fillRect(x + 3, y + 3, 2, 2);
    } else {
      ctx.fillRect(x + 3, y + 4, 6, 4);
    }
  }

  function paintProcPen(ctx, w, h, kind) {
    var def = G.THData.ROOMS[kind];
    var type = def && def.type ? def.type : "none";
    var col = type !== "none" ? G.THData.TYPE_COLOR[type] : P.copper;
    var cx = Math.floor(w / 2);
    var cy = Math.floor(h / 2) - 4;
    var r = Math.floor(w * 0.36);
    if (kind === "transom") {
      paintVisitorPath(ctx, cx, 8, cx, h - 8);
      paintVisitorPath(ctx, 16, h * 0.62, w - 16, h * 0.62);
      paintTypeBadge(ctx, cx + 10, cy + 10, "draft");
      return;
    }
    if (kind === "larder") {
      ctx.fillStyle = "#6a4220";
      ctx.fillRect(cx - 22, cy - 8, 44, 28);
      ctx.fillStyle = "#3a7ec8";
      ctx.fillRect(cx - 24, cy - 16, 48, 12);
      return;
    }
    fillDisk(ctx, cx, cy, r - 1, "#4a8c30");
    fillDisk(ctx, cx, cy, r - 6, kind === "dynamo" ? "#e8c428" : kind === "dormer" ? "#b48ad4" : kind === "scullery" ? "#c45c26" : kind === "vitrine" ? "#e8d060" : col);
    ctx.fillStyle = "rgba(42,28,16,0.2)";
    ctx.fillRect(cx - 8, cy - 6, 16, 10);
    paintFenceRing(ctx, cx, cy, r, "#8a6030");
    ctx.fillStyle = "#6a4220";
    ctx.fillRect(cx - 11, cy + r - 5, 22, 9);
    paintTypeBadge(ctx, cx, cy + r - 40, type);
  }

  function paintHabitat(canvas, kind, opt) {
    opt = opt || {};
    var ctx = canvas.getContext("2d");
    var w = canvas.width;
    var h = canvas.height;
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, w, h);
    var yard = YARD[kind];
    var drew = false;
    if (kind === "lobby") {
      drew = blitCrisp(ctx, "cottage", 0, 0, w, h);
    } else if (yard && srcW(IMG[yard])) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(w * 0.5, h * 0.49, Math.min(w, h) * 0.415, 0, Math.PI * 2);
      ctx.rect(w * 0.5 - 14, h * 0.74, 28, 26);
      ctx.clip();
      drew = blitCrisp(ctx, yard, 0, 0, w, h);
      ctx.restore();
    }
    if (!drew) paintProcPen(ctx, w, h, kind);
    if (opt.leaking) {
      ctx.fillStyle = "rgba(232,80,20,0.35)";
      ctx.fillRect(Math.floor(w * 0.3), Math.floor(h * 0.4), 6, Math.floor(h * 0.3));
    }
    if (opt.haunted) {
      ctx.fillStyle = "rgba(90,50,120,0.18)";
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, Math.min(w, h) * 0.4, 0, Math.PI * 2);
      ctx.fill();
    }
    if (opt.selected && kind !== "lobby") {
      /* Glow on the rail — not a yellow spreadsheet cell. */
      var hx = w * 0.5;
      var hy = h * 0.49;
      var hr = Math.min(w, h) * 0.405;
      ctx.strokeStyle = "rgba(255, 214, 90, 0.5)";
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(hx, hy, hr, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = "rgba(255, 236, 160, 0.85)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(hx, hy, hr, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  function paintRoom(canvas, kind, opt) {
    paintHabitat(canvas, kind, opt);
  }

  function paintEmpty(canvas, opt) {
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function paintFog(canvas, opt) {
    opt = opt || {};
    var ctx = canvas.getContext("2d");
    var w = canvas.width;
    var h = canvas.height;
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, w, h);
    if (!opt.inert) blitCrisp(ctx, "buyland", Math.floor(w * 0.3), Math.floor(h * 0.28), Math.floor(w * 0.4), Math.floor(h * 0.58));
  }

  function paintIcon(size) {
    var c = document.createElement("canvas");
    c.width = size;
    c.height = size;
    var ctx = c.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    if (IMG.cottage && srcW(IMG.cottage)) ctx.drawImage(IMG.cottage, 0, 0, size, size);
    else {
      ctx.fillStyle = P.ember;
      ctx.fillRect(0, 0, size, size);
    }
    return c;
  }

  load();

  G.THSprites = {
    load: load,
    ready: isReady,
    paintGuest: paintGuest,
    paintRoom: paintRoom,
    paintHabitat: paintHabitat,
    paintEmpty: paintEmpty,
    paintFog: paintFog,
    paintPark: paintPark,
    paintRoads: paintRoads,
    paintIcon: paintIcon,
    guestUrl: guestUrl,
    GUESTS: GUESTS,
  };
})(window);
