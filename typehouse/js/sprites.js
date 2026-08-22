/* 16×16 canvas silhouettes. Palette-locked. No Nintendo shapes. */
(function (G) {
  const P = G.THData.PAL;

  function art(map, pal) {
    return { map: map, pal: pal };
  }

  const GUESTS = {
    Wicknoll: art(
      [
        "................",
        "......33........",
        ".....3223.......",
        "....322223......",
        "....321123......",
        "...32111123.....",
        "...21144112.....",
        "...21111112.....",
        "...22111122.....",
        "....222222......",
        "....2.33.2......",
        "....2.22.2......",
        "...22....22.....",
        "...2......2.....",
        "..33......33....",
        "................",
      ],
      [P.ember, P.copper, P.timber, P.lamp]
    ),
    Puddlewick: art(
      [
        "................",
        ".3..............",
        ".23........3....",
        ".223......32....",
        "..223....322....",
        "...22111122.....",
        "...21144112.....",
        "...21111112.....",
        "....211112......",
        "....221122......",
        "...22.22.22.....",
        "...2..2...2.....",
        "..33......33....",
        "................",
        "................",
        "................",
      ],
      [P.dusk, P.copper, P.lamp, P.ink]
    ),
    Ledgerfrond: art(
      [
        "................",
        "....333333......",
        "...32222223.....",
        "...22111122.....",
        "...21133112.....",
        "...21111112.....",
        "...22111122.....",
        "....222222......",
        "...22111122.....",
        "...21144112.....",
        "...21111112.....",
        "...22111122.....",
        "....22..22......",
        "....3....3......",
        "................",
        "................",
      ],
      [P.moss, P.timber, P.parchment, P.ink]
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

  const cache = {};

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
    var a = GUESTS[id];
    if (!a) return;
    opt = opt || {};
    var ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var scale = Math.max(1, Math.floor(canvas.width / 16));
    var bob = opt.sit ? 0 : frame % 2 ? Math.max(1, Math.floor(scale * 0.4)) : 0;
    ctx.save();
    if (opt.flip) {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }
    drawMap(ctx, a, scale, 0, bob);
    ctx.restore();
  }

  function guestUrl(id, scale) {
    scale = scale || 3;
    var key = id + ":" + scale;
    if (cache[key]) return cache[key];
    var a = GUESTS[id];
    if (!a) return "";
    var c = document.createElement("canvas");
    c.width = 16 * scale;
    c.height = 16 * scale;
    var ctx = c.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    drawMap(ctx, a, scale, 0, 0);
    cache[key] = c.toDataURL();
    return cache[key];
  }

  function shade(hex, a) {
    var r = parseInt(hex.slice(1, 3), 16);
    var g = parseInt(hex.slice(3, 5), 16);
    var b = parseInt(hex.slice(5, 7), 16);
    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
  }

  function hash2(x, y) {
    var n = (Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263)) | 0;
    n = Math.imul(n ^ (n >>> 13), 1274126177);
    return ((n ^ (n >>> 16)) >>> 0) / 4294967296;
  }

  function dirtColor(wx, wy) {
    var n = hash2(wx, wy);
    if (n < 0.08) return "#1a1210";
    if (n < 0.16) return "#231610";
    if (n < 0.22) return "#2c1e16";
    if (n < 0.26) return "#1e2418";
    if (n < 0.3) return "#332218";
    return "#241810";
  }

  function fillDisk(ctx, cx, cy, r, col) {
    ctx.fillStyle = col;
    var y;
    var span;
    var r2 = r * r;
    for (y = -r; y <= r; y++) {
      span = Math.floor(Math.sqrt(Math.max(0, r2 - y * y)));
      ctx.fillRect(cx - span, cy + y, span * 2 + 1, 1);
    }
  }

  function strokeRing(ctx, cx, cy, r, col, thick, skipSouth) {
    ctx.fillStyle = col;
    var t = thick || 1;
    var outer = r + t * 0.55;
    var inner = r - t * 0.55;
    var o2 = outer * outer;
    var i2 = Math.max(0, inner) * Math.max(0, inner);
    var lim = Math.ceil(outer);
    var x;
    var y;
    var d2;
    for (y = -lim; y <= lim; y++) {
      for (x = -lim; x <= lim; x++) {
        if (skipSouth && y > 2 && Math.abs(x) < 8) continue;
        d2 = x * x + y * y;
        if (d2 <= o2 && d2 >= i2) ctx.fillRect(cx + x, cy + y, 1, 1);
      }
    }
  }

  function paintLantern(ctx, x, y) {
    ctx.fillStyle = shade(P.lamp, 0.28);
    ctx.fillRect(x - 5, y - 6, 12, 10);
    ctx.fillStyle = P.ink;
    ctx.fillRect(x, y - 1, 3, 11);
    ctx.fillStyle = P.timber;
    ctx.fillRect(x, y, 2, 9);
    ctx.fillStyle = P.lamp;
    ctx.fillRect(x - 3, y - 5, 8, 6);
    ctx.fillStyle = P.ember;
    ctx.fillRect(x, y - 3, 3, 3);
    ctx.fillStyle = P.parchment;
    ctx.fillRect(x - 1, y - 4, 2, 2);
  }

  function paintPathStrip(ctx, x0, y0, x1, y1, wide) {
    var dx = x1 - x0;
    var dy = y1 - y0;
    var len = Math.hypot(dx, dy) || 1;
    var ux = dx / len;
    var uy = dy / len;
    var px = -uy;
    var py = ux;
    var hw = Math.floor((wide || 12) / 2);
    var i;
    var k;
    var x;
    var y;
    for (i = 0; i <= len; i++) {
      x = Math.round(x0 + ux * i);
      y = Math.round(y0 + uy * i);
      for (k = -hw; k <= hw; k++) {
        ctx.fillStyle = Math.abs(k) >= hw - 1 ? "#2a1c14" : k === 0 ? "#3d2a1c" : "#342418";
        ctx.fillRect(x + Math.round(px * k), y + Math.round(py * k), 1, 1);
      }
    }
  }

  function paintPark(canvas, opt) {
    opt = opt || {};
    var ctx = canvas.getContext("2d");
    var w = canvas.width;
    var h = canvas.height;
    var lot = opt.lot || 96;
    var bounds = opt.bounds || { minX: 0, minY: 0, maxX: 2, maxY: 1 };
    var owned = opt.owned || {};
    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = "#1e1610";
    ctx.fillRect(0, 0, w, h);
    var x;
    var y;
    for (y = 0; y < h; y += 2) {
      for (x = 0; x < w; x += 2) {
        ctx.fillStyle = dirtColor(x + bounds.minX * 17, y + bounds.minY * 13);
        ctx.fillRect(x, y, 2, 2);
      }
    }
    for (y = 3; y < h; y += 7) {
      for (x = 2; x < w; x += 9) {
        if (hash2(x + 3, y + 5) < 0.22) {
          ctx.fillStyle = "#24301c";
          ctx.fillRect(x, y, 2, 1);
          ctx.fillRect(x + 1, y - 1, 1, 1);
        }
      }
    }
    Object.keys(owned).forEach(function (k) {
      var c = owned[k];
      if (!c) return;
      var east = owned[c.x + 1 + "," + c.y];
      var north = owned[c.x + "," + (c.y + 1)];
      var ox = (c.x - bounds.minX) * lot;
      var oy = (bounds.maxY - c.y) * lot;
      if (east) {
        paintPathStrip(ctx, ox + lot * 0.5, oy + lot * 0.56, ox + lot * 1.5, oy + lot * 0.56, 13);
        paintLantern(ctx, ox + lot - 1, oy + lot * 0.5);
      }
      if (north) {
        paintPathStrip(ctx, ox + lot * 0.5, oy + lot * 0.5, ox + lot * 0.5, oy - lot * 0.5, 13);
        paintLantern(ctx, ox + lot * 0.42, oy - 2);
      }
    });
  }

  function paintLampRing(ctx, cx, cy, r) {
    strokeRing(ctx, cx, cy, r, shade(P.lamp, 0.85), 2, false);
    var i;
    var a;
    for (i = 0; i < 8; i++) {
      a = (i * Math.PI) / 4 + 0.2;
      ctx.fillStyle = i % 2 ? P.ember : P.lamp;
      ctx.fillRect(cx + Math.round(Math.cos(a) * r) - 1, cy + Math.round(Math.sin(a) * r) - 1, 2, 2);
    }
  }

  function paintStuds(ctx, cx, cy, r) {
    var i;
    var a;
    var x;
    var y;
    for (i = 0; i < 8; i++) {
      a = (i * Math.PI) / 4 + 0.4;
      x = cx + Math.round(Math.cos(a) * (r - 4));
      y = cy + Math.round(Math.sin(a) * (r - 4));
      ctx.fillStyle = P.timber;
      ctx.fillRect(x, y, 2, 2);
      ctx.fillStyle = "#2a1c16";
      ctx.fillRect(x + 1, y + 1, 1, 1);
    }
  }

  function paintBanner(ctx, cx, y, col, kind) {
    ctx.fillStyle = P.ink;
    ctx.fillRect(cx - 5, y, 11, 9);
    ctx.fillStyle = col;
    ctx.fillRect(cx - 4, y + 1, 9, 7);
    ctx.fillStyle = P.lamp;
    if (kind === "hearth") {
      ctx.fillRect(cx - 1, y + 2, 3, 5);
      ctx.fillStyle = P.ember;
      ctx.fillRect(cx, y + 3, 1, 3);
    } else if (kind === "cistern") {
      ctx.fillRect(cx - 3, y + 4, 7, 2);
      ctx.fillRect(cx - 2, y + 3, 5, 1);
    } else if (kind === "conservatory") {
      ctx.fillStyle = P.moss;
      ctx.fillRect(cx, y + 2, 1, 5);
      ctx.fillRect(cx - 2, y + 4, 5, 2);
    } else if (kind === "dynamo") {
      ctx.fillRect(cx - 2, y + 3, 5, 3);
    } else if (kind === "vitrine") {
      ctx.fillRect(cx - 2, y + 3, 5, 4);
    } else {
      ctx.fillRect(cx - 1, y + 3, 3, 3);
    }
    ctx.fillStyle = P.ink;
    ctx.fillRect(cx, y + 9, 1, 3);
  }

  function paintCircleFence(ctx, cx, cy, r, col, opt) {
    opt = opt || {};
    var level = opt.level || 1;
    var edges = opt.edges || {};
    strokeRing(ctx, cx, cy, r, P.ink, 3, true);
    strokeRing(ctx, cx, cy, r, P.timber, 2, true);
    if (level >= 2) strokeRing(ctx, cx, cy, r - 3, P.copper, 1, true);
    var n = 12;
    var i;
    var a;
    var px;
    var py;
    var key;
    var edge;
    var post;
    for (i = 0; i < n; i++) {
      a = (i / n) * Math.PI * 2 - Math.PI / 2;
      if (Math.sin(a) > 0.72 && Math.abs(Math.cos(a)) < 0.35) continue;
      px = cx + Math.round(Math.cos(a) * r) - 1;
      py = cy + Math.round(Math.sin(a) * r) - 2;
      key = Math.abs(Math.cos(a)) > Math.abs(Math.sin(a)) ? (Math.cos(a) > 0 ? "e" : "w") : Math.sin(a) > 0 ? "s" : "n";
      edge = edges[key] || {};
      post = edge.friction ? P.ember : edge.nourish ? P.moss : col || P.timber;
      ctx.fillStyle = P.ink;
      ctx.fillRect(px - 1, py - 1, 5, 6);
      ctx.fillStyle = post;
      ctx.fillRect(px, py, 3, 5);
      ctx.fillStyle = P.ink;
      ctx.fillRect(px + 1, py + 1, 1, 2);
      if (level >= 3) {
        ctx.fillStyle = P.copper;
        ctx.fillRect(px - 1, py - 1, 5, 2);
      }
    }
    paintBanner(ctx, cx, cy + r - 3, col, opt.kind);
  }

  function paintTypeFloor(ctx, cx, cy, r, type) {
    var col = G.THData.TYPE_COLOR[type] || P.copper;
    fillDisk(ctx, cx, cy, r, "#2a1c14");
    fillDisk(ctx, cx, cy, r - 1, shade(col, type === "tide" ? 0.55 : 0.36));
    var x;
    var y;
    var d2;
    var r2 = (r - 2) * (r - 2);
    if (type === "ember") {
      for (y = -r + 3; y <= r - 3; y += 3) {
        for (x = -r + 3; x <= r - 3; x += 4) {
          if (x * x + y * y > r2) continue;
          ctx.fillStyle = hash2(x, y) < 0.45 ? P.ember : "#3d2010";
          ctx.fillRect(cx + x, cy + y, 2, 1);
        }
      }
      fillDisk(ctx, cx, cy + 2, 7, shade(P.ember, 0.45));
    } else if (type === "tide") {
      fillDisk(ctx, cx, cy + 1, r - 4, "#1a2836");
      fillDisk(ctx, cx - 1, cy, r - 8, shade(P.dusk, 0.8));
      ctx.fillStyle = shade(P.lamp, 0.35);
      ctx.fillRect(cx - 6, cy - 4, 8, 1);
      ctx.fillRect(cx + 2, cy + 5, 5, 1);
    } else if (type === "moss") {
      for (y = -r + 2; y <= r - 2; y += 3) {
        for (x = -r + 2; x <= r - 2; x += 3) {
          if (x * x + y * y > r2) continue;
          if (hash2(x + 2, y) < 0.55) {
            ctx.fillStyle = hash2(x, y + 1) < 0.4 ? P.moss : "#3d4a38";
            ctx.fillRect(cx + x, cy + y, 2, 2);
          }
        }
      }
    } else {
      for (y = -r + 4; y <= r - 4; y += 5) {
        for (x = -r + 4; x <= r - 4; x += 5) {
          d2 = x * x + y * y;
          if (d2 > r2) continue;
          if (hash2(x, y) < 0.4) {
            ctx.fillStyle = shade(col, 0.5);
            ctx.fillRect(cx + x, cy + y, 1, 2);
          }
        }
      }
    }
  }

  var PROPS = {
    hearth: art(
      [
        "................",
        ".....333333.....",
        "....32222223....",
        "...3222222223...",
        "...3211111123...",
        "...3211441123...",
        "...3211441123...",
        "...3211111123...",
        "...3222222223...",
        "....32222223....",
        "....22222222....",
        "...22.3333.22...",
        "................",
        "................",
        "................",
        "................",
      ],
      [P.ember, P.copper, P.timber, P.lamp]
    ),
    cistern: art(
      [
        "................",
        "......333.......",
        "......323.......",
        "....2222222.....",
        "...221111122....",
        "...214444412....",
        "...214444412....",
        "...221111122....",
        "....2222222.....",
        "......22........",
        "....333..33.....",
        "................",
        "................",
        "................",
        "................",
        "................",
      ],
      [P.dusk, P.copper, P.lamp, P.ink]
    ),
    conservatory: art(
      [
        "................",
        "......33........",
        ".....3223.......",
        "....321123......",
        "...32111123.....",
        "...21144112.....",
        "...21111112.....",
        "...22111122.....",
        "..3222222223....",
        ".322222222223...",
        ".333333333333...",
        "....2....2......",
        "................",
        "................",
        "................",
        "................",
      ],
      [P.moss, P.timber, P.parchment, P.ink]
    ),
    dynamo: art(
      [
        "................",
        "....333333......",
        "...32....23.....",
        "...2.3333.2.....",
        "...2.2112.2.....",
        "...2.2142.2.....",
        "...2.2112.2.....",
        "...2.3333.2.....",
        "...32....23.....",
        "....333333......",
        "......22........",
        "......22........",
        "................",
        "................",
        "................",
        "................",
      ],
      [P.lamp, P.copper, P.parchment, P.ink]
    ),
    dormer: art(
      [
        "................",
        "....333333......",
        "....3....3......",
        "....3.22.3......",
        "....3....3......",
        ".....2222.......",
        ".......2........",
        ".......2........",
        "......222.......",
        ".....2.2.2......",
        "....22.2.22.....",
        ".......2........",
        "................",
        "................",
        "................",
        "................",
      ],
      [P.timber, P.ink, P.parchment, P.dusk]
    ),
    scullery: art(
      [
        "................",
        "......33........",
        ".....3..3.......",
        "....222222......",
        "...22111122.....",
        ".332114411233...",
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
      [P.copper, P.ember, P.timber, P.lamp]
    ),
    vitrine: art(
      [
        "................",
        "...33333333.....",
        "...32222223.....",
        "...22111122.....",
        "...2114.4112....",
        "...22111122.....",
        "...21111112.....",
        "...2214.4122....",
        "...32222223.....",
        "...33333333.....",
        "....2....2......",
        "................",
        "................",
        "................",
        "................",
        "................",
      ],
      [P.parchment, P.lamp, P.copper, P.ink]
    ),
    lobby: art(
      [
        "................",
        ".....333333.....",
        "....32222223....",
        "...3222222223...",
        "...2211111122...",
        "...2111411112...",
        "...2111111112...",
        "...2211111122...",
        "...2222222222...",
        "...22.3333.22...",
        "...22.3333.22...",
        "....2......2....",
        "................",
        "................",
        "................",
        "................",
      ],
      [P.timber, P.copper, P.parchment, P.ink]
    ),
    larder: art(
      [
        "................",
        "......3333......",
        ".....322223.....",
        ".....221122.....",
        "..3333222233....",
        "..3222222223....",
        "..2211111122....",
        "..2222222222....",
        "..3333333333....",
        "................",
        "................",
        "................",
        "................",
        "................",
        "................",
        "................",
      ],
      [P.copper, P.timber, P.parchment, P.ink]
    ),
  };

  function paintProp(ctx, kind, cx, cy) {
    var a = PROPS[kind];
    if (!a) return;
    drawMap(ctx, a, 2, cx - 16, cy - 16);
  }

  function paintCottageExtras(ctx, w, h) {
    var cx = Math.floor(w / 2);
    var cy = Math.floor(h * 0.42);
    fillDisk(ctx, cx, cy + 10, 6, P.ink);
    fillDisk(ctx, cx, cy + 10, 5, P.copper);
    fillDisk(ctx, cx, cy + 10, 4, P.parchment);
    ctx.fillStyle = P.ink;
    ctx.fillRect(cx - 1, cy + 8, 2, 5);
    ctx.fillRect(cx - 2, cy + 10, 4, 1);
    paintLantern(ctx, 14, Math.floor(h * 0.38));
    paintLantern(ctx, w - 16, Math.floor(h * 0.38));
    ctx.fillStyle = P.timber;
    ctx.fillRect(10, cy + 8, 5, 7);
    ctx.fillRect(w - 15, cy + 8, 5, 7);
    ctx.fillStyle = P.parchment;
    ctx.fillRect(11, cy + 9, 3, 3);
    ctx.fillRect(w - 14, cy + 9, 3, 3);
    ctx.fillStyle = P.ink;
    ctx.fillRect(12, cy + 10, 1, 2);
    ctx.fillRect(w - 13, cy + 10, 1, 2);
  }

  function paintLane(ctx, w, h) {
    paintPathStrip(ctx, Math.floor(w / 2), 6, Math.floor(w / 2), h - 6, 14);
    paintPathStrip(ctx, 8, Math.floor(h * 0.56), w - 8, Math.floor(h * 0.56), 12);
    ctx.fillStyle = P.dusk;
    ctx.fillRect(Math.floor(w / 2) - 1, 10, 2, h - 20);
    paintLantern(ctx, Math.floor(w * 0.32), 16);
    paintLantern(ctx, Math.floor(w * 0.66), h - 22);
  }

  function paintHabitat(canvas, kind, opt) {
    opt = opt || {};
    var ctx = canvas.getContext("2d");
    var w = canvas.width;
    var h = canvas.height;
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, w, h);
    var def = G.THData.ROOMS[kind];
    var type = def && def.type ? def.type : "none";
    var col = type !== "none" ? G.THData.TYPE_COLOR[type] : P.copper;
    var cx = Math.floor(w / 2);
    var cy = Math.floor(h / 2) - 1;
    var floorR = 33;
    var fenceR = 39;

    if (kind === "lobby") {
      fillDisk(ctx, cx, cy + 2, 26, "#2a1c14");
      paintPathStrip(ctx, cx, cy + 8, cx, h - 2, 12);
      paintProp(ctx, "lobby", cx, cy - 2);
      paintCottageExtras(ctx, w, h);
    } else if (kind === "larder") {
      fillDisk(ctx, cx, cy + 4, 18, "#2a1c14");
      paintProp(ctx, "larder", cx, cy + 2);
    } else if (kind === "transom") {
      paintLane(ctx, w, h);
    } else {
      paintTypeFloor(ctx, cx, cy, floorR, type);
      paintProp(ctx, kind, cx, cy - 6);
      paintCircleFence(ctx, cx, cy, fenceR, col, { level: opt.level || 1, edges: opt.edges, kind: kind });
    }

    if (opt.leaking) {
      ctx.fillStyle = P.ember;
      ctx.fillRect(cx - 18, cy - 4, 3, 22);
    }
    if (opt.haunted) {
      ctx.fillStyle = "rgba(61,42,36,0.28)";
      fillDisk(ctx, cx, cy, floorR + 2, "rgba(61,42,36,0.28)");
    }
    if (opt.unpowered) {
      ctx.fillStyle = P.ink;
      ctx.fillRect(cx - 5, cy - 20, 10, 4);
    }
    if (opt.home) {
      ctx.fillStyle = col;
      ctx.fillRect(cx - 10, cy + 14, 20, 5);
      ctx.fillStyle = shade(P.parchment, 0.55);
      ctx.fillRect(cx - 8, cy + 15, 16, 3);
    }
    if (opt.selected) paintLampRing(ctx, cx, cy, kind === "lobby" || kind === "larder" || kind === "transom" ? 34 : fenceR + 4);
  }

  function paintRoom(canvas, kind, opt) {
    paintHabitat(canvas, kind, opt);
  }

  function paintEmpty(canvas, opt) {
    opt = opt || {};
    var ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    var w = canvas.width;
    var h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    var cx = Math.floor(w / 2);
    var cy = Math.floor(h / 2);
    fillDisk(ctx, cx, cy, 32, "#2a1c14");
    fillDisk(ctx, cx, cy, 29, "#261810");
    var i;
    var j;
    for (i = -20; i <= 20; i += 6) {
      for (j = -18; j <= 18; j += 7) {
        if (i * i + j * j > 700) continue;
        if (hash2(i + 4, j + 2) < 0.35) {
          ctx.fillStyle = "#1e1610";
          ctx.fillRect(cx + i, cy + j, 2, 2);
        }
      }
    }
    paintStuds(ctx, cx, cy, 30);
    if (opt.selected) paintLampRing(ctx, cx, cy, 34);
  }

  var DIGIT = {
    "0": ["111", "1.1", "1.1", "1.1", "111"],
    "1": [".1.", "11.", ".1.", ".1.", "111"],
    "2": ["111", "..1", "111", "1..", "111"],
    "3": ["111", "..1", "111", "..1", "111"],
    "4": ["1.1", "1.1", "111", "..1", "..1"],
    "5": ["111", "1..", "111", "..1", "111"],
    "6": ["111", "1..", "111", "1.1", "111"],
    "7": ["111", "..1", ".1.", ".1.", ".1."],
    "8": ["111", "1.1", "111", "1.1", "111"],
    "9": ["111", "1.1", "111", "..1", "111"],
  };

  function paintDigits(ctx, text, x, y, col) {
    ctx.fillStyle = col;
    var i;
    var r;
    var c;
    var glyph;
    var ox = x;
    for (i = 0; i < text.length; i++) {
      glyph = DIGIT[text.charAt(i)];
      if (!glyph) {
        ox += 3;
        continue;
      }
      for (r = 0; r < 5; r++) {
        for (c = 0; c < 3; c++) {
          if (glyph[r].charAt(c) === "1") ctx.fillRect(ox + c, y + r, 1, 1);
        }
      }
      ox += 4;
    }
  }

  function paintPine(ctx, x, y, hgt, col) {
    var i;
    var half;
    ctx.fillStyle = col;
    for (i = 0; i < hgt; i++) {
      half = Math.max(1, Math.floor(((hgt - i) / hgt) * (hgt * 0.45)));
      ctx.fillRect(x - half, y + i, half * 2 + 1, 1);
    }
    ctx.fillStyle = "#1a1210";
    ctx.fillRect(x, y + hgt - 1, 2, 5);
  }

  function paintStake(ctx, cx, cy, cost) {
    var x = cx - 10;
    var y = cy - 16;
    ctx.fillStyle = P.ink;
    ctx.fillRect(cx - 1, y + 18, 3, 16);
    ctx.fillStyle = P.timber;
    ctx.fillRect(cx, y + 18, 1, 15);
    ctx.fillStyle = P.ink;
    ctx.fillRect(x, y, 21, 20);
    ctx.fillStyle = "#2a1c14";
    ctx.fillRect(x + 1, y + 1, 19, 18);
    ctx.fillStyle = P.copper;
    ctx.fillRect(x + 2, y + 2, 17, 16);
    ctx.fillStyle = P.ink;
    ctx.fillRect(x + 3, y + 3, 15, 14);
    ctx.fillStyle = P.parchment;
    ctx.fillRect(cx - 2, y + 5, 5, 5);
    ctx.fillStyle = P.ink;
    ctx.fillRect(cx - 1, y + 6, 3, 3);
    ctx.fillStyle = P.ember;
    paintDigits(ctx, String((cost && cost.scrap) || 12), cx - 6, y + 12, P.lamp);
  }

  function paintFog(canvas, opt) {
    opt = opt || {};
    var ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    var w = canvas.width;
    var h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    var seedX = (opt.x || 0) * 19;
    var seedY = (opt.y || 0) * 23;
    var i;
    var j;
    var n;
    for (i = 0; i < w; i += 2) {
      for (j = 0; j < h; j += 2) {
        n = hash2(i + seedX, j + seedY);
        if (n > 0.62) continue;
        ctx.fillStyle = n < 0.2 ? "rgba(12,16,22,0.55)" : n < 0.4 ? "rgba(20,28,36,0.4)" : "rgba(26,18,16,0.28)";
        ctx.fillRect(i, j, 2, 2);
      }
    }
    var pines = [
      [16, 10, 22],
      [w - 20, 8, 26],
      [10, h - 36, 18],
      [w - 18, h - 40, 20],
      [Math.floor(w * 0.38), 6, 16],
    ];
    pines.forEach(function (p, idx) {
      var col = idx % 2 ? "#151c18" : "#101614";
      if (hash2(seedX + idx, seedY) > 0.18) paintPine(ctx, p[0], p[1], p[2], col);
    });
    if (!opt.inert) paintStake(ctx, Math.floor(w / 2), Math.floor(h / 2) + 4, opt.cost);
    if (opt.selected) paintLampRing(ctx, Math.floor(w / 2), Math.floor(h / 2), 30);
  }

  function paintIcon(size) {
    var c = document.createElement("canvas");
    c.width = size;
    c.height = size;
    var ctx = c.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    var s = size / 16;
    function R(x, y, w, h, col) {
      ctx.fillStyle = col;
      ctx.fillRect(Math.floor(x * s), Math.floor(y * s), Math.ceil(w * s), Math.ceil(h * s));
    }
    R(0, 0, 16, 16, P.ink);
    R(2, 7, 12, 8, P.timber);
    R(1, 6, 14, 2, P.copper);
    R(3, 4, 10, 3, P.ember);
    R(6, 2, 4, 3, P.copper);
    R(4, 9, 3, 3, P.lamp);
    R(9, 9, 3, 3, P.dusk);
    R(7, 12, 2, 3, P.ink);
    return c;
  }

  G.THSprites = {
    paintGuest: paintGuest,
    paintRoom: paintRoom,
    paintHabitat: paintHabitat,
    paintEmpty: paintEmpty,
    paintFog: paintFog,
    paintPark: paintPark,
    paintIcon: paintIcon,
    guestUrl: guestUrl,
    GUESTS: GUESTS,
  };
})(window);
