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

  function dirtFill(ctx, w, h, tint) {
    ctx.fillStyle = "#2a1c14";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#231610";
    var i;
    var j;
    for (i = 1; i < w; i += 4) {
      for (j = 1; j < h; j += 5) {
        if ((i * 13 + j * 7) % 11 < 4) ctx.fillRect(i, j, 2, 1);
      }
    }
    ctx.fillStyle = "#332218";
    for (i = 2; i < w; i += 6) {
      for (j = 3; j < h; j += 7) {
        if ((i + j) % 5 === 0) ctx.fillRect(i, j, 1, 2);
      }
    }
    if (tint) {
      ctx.fillStyle = shade(tint, 0.34);
      ctx.fillRect(0, 0, w, h);
    }
  }

  function paintPath(ctx, w, h, vertical) {
    ctx.fillStyle = "#3a2a1c";
    if (vertical) ctx.fillRect(Math.floor(w * 0.38), 0, Math.floor(w * 0.24), h);
    else ctx.fillRect(0, Math.floor(h * 0.42), w, Math.floor(h * 0.2));
    ctx.fillStyle = "#2e2118";
    if (vertical) {
      ctx.fillRect(Math.floor(w * 0.38), 0, 1, h);
      ctx.fillRect(Math.floor(w * 0.62), 0, 1, h);
    }
  }

  function paintLantern(ctx, x, y) {
    ctx.fillStyle = P.timber;
    ctx.fillRect(x, y, 2, 8);
    ctx.fillStyle = P.lamp;
    ctx.fillRect(x - 2, y - 4, 6, 5);
    ctx.fillStyle = P.ember;
    ctx.fillRect(x, y - 2, 2, 2);
  }

  function paintDeed(ctx, w, h, col) {
    var x = w - 16;
    var y = h - 24;
    ctx.fillStyle = P.ink;
    ctx.fillRect(x + 4, y + 2, 3, 16);
    ctx.fillStyle = P.timber;
    ctx.fillRect(x + 5, y + 3, 1, 14);
    ctx.fillStyle = P.ink;
    ctx.fillRect(x, y, 12, 9);
    ctx.fillStyle = col || P.parchment;
    ctx.fillRect(x + 2, y + 2, 8, 5);
  }

  function paintFence(ctx, w, h, col, edges) {
    var m = 5;
    ctx.strokeStyle = P.ink;
    ctx.lineWidth = 2;
    ctx.strokeRect(m, m, w - m * 2, h - m * 2);
    ctx.strokeStyle = shade(P.timber, 0.9);
    ctx.lineWidth = 1;
    ctx.strokeRect(m + 2, m + 2, w - m * 2 - 4, h - m * 2 - 4);
    var posts = [
      [m - 1, m - 1, "nw"],
      [w - m - 3, m - 1, "ne"],
      [m - 1, h - m - 3, "sw"],
      [w - m - 3, h - m - 3, "se"],
      [Math.floor(w / 2) - 1, m - 1, "n"],
      [Math.floor(w / 2) - 1, h - m - 3, "s"],
      [m - 1, Math.floor(h / 2) - 1, "w"],
      [w - m - 3, Math.floor(h / 2) - 1, "e"],
    ];
    edges = edges || {};
    posts.forEach(function (p) {
      var edge = edges[p[2]] || {};
      ctx.fillStyle = edge.friction ? P.ember : edge.nourish ? P.moss : col || P.timber;
      ctx.fillRect(p[0], p[1], 4, 4);
      ctx.fillStyle = P.ink;
      ctx.fillRect(p[0] + 1, p[1] + 1, 2, 2);
      if (edge.friction || edge.nourish) {
        ctx.fillStyle = edge.friction ? P.ember : P.moss;
        ctx.fillRect(p[0] - 1, p[1] - 1, 6, 2);
      }
    });
  }

  function paintRoom(canvas, kind, opt) {
    opt = opt || {};
    var ctx = canvas.getContext("2d");
    var w = canvas.width;
    var h = canvas.height;
    ctx.imageSmoothingEnabled = false;
    var def = G.THData.ROOMS[kind];
    var col = def && def.type !== "none" ? G.THData.TYPE_COLOR[def.type] : P.copper;

    dirtFill(ctx, w, h, kind === "lobby" || kind === "larder" || kind === "transom" ? null : col);

    if (kind === "lobby") {
      paintPath(ctx, w, h, true);
      ctx.fillStyle = P.timber;
      ctx.fillRect(Math.floor(w * 0.22), h - 18, Math.floor(w * 0.56), 12);
      ctx.fillStyle = P.ink;
      ctx.fillRect(Math.floor(w * 0.22), h - 18, Math.floor(w * 0.56), 2);
      ctx.fillStyle = P.copper;
      ctx.fillRect(Math.floor(w / 2) - 6, h - 28, 12, 12);
      ctx.fillStyle = P.parchment;
      ctx.fillRect(Math.floor(w / 2) - 3, h - 25, 6, 6);
      ctx.fillStyle = P.ink;
      ctx.fillRect(Math.floor(w / 2) - 1, h - 23, 2, 3);
      ctx.fillStyle = P.timber;
      ctx.fillRect(8, Math.floor(h * 0.42), Math.floor(w * 0.28), 8);
      ctx.fillStyle = P.parchment;
      ctx.fillRect(10, Math.floor(h * 0.42) - 4, 10, 4);
      paintLantern(ctx, 10, Math.floor(h * 0.28));
      paintLantern(ctx, w - 12, Math.floor(h * 0.28));
    } else if (kind === "larder") {
      ctx.fillStyle = P.copper;
      ctx.fillRect(14, 16, w - 28, h - 36);
      ctx.fillStyle = P.timber;
      ctx.fillRect(16, 20, w - 32, 5);
      ctx.fillRect(16, 30, w - 32, 5);
      ctx.fillStyle = P.ink;
      ctx.strokeStyle = P.ink;
      ctx.strokeRect(14, 16, w - 28, h - 36);
      paintDeed(ctx, w, h, P.copper);
    } else if (kind === "transom") {
      paintPath(ctx, w, h, true);
      paintPath(ctx, w, h, false);
      ctx.fillStyle = P.dusk;
      ctx.fillRect(Math.floor(w * 0.44), 8, 4, h - 16);
      paintLantern(ctx, Math.floor(w * 0.3), 14);
    } else {
      if (kind === "cistern") {
        ctx.fillStyle = "#1a2836";
        ctx.fillRect(Math.floor(w * 0.2), Math.floor(h * 0.38), Math.floor(w * 0.6), Math.floor(h * 0.32));
        ctx.fillRect(Math.floor(w * 0.26), Math.floor(h * 0.32), Math.floor(w * 0.48), Math.floor(h * 0.44));
        ctx.fillStyle = shade(P.dusk, 0.7);
        ctx.fillRect(Math.floor(w * 0.28), Math.floor(h * 0.42), Math.floor(w * 0.44), Math.floor(h * 0.2));
      } else if (kind === "conservatory") {
        ctx.fillStyle = shade(P.moss, 0.55);
        ctx.fillRect(10, 10, w - 20, h - 20);
      } else if (kind === "hearth") {
        ctx.fillStyle = shade(P.ember, 0.22);
        ctx.fillRect(Math.floor(w * 0.2), Math.floor(h * 0.4), Math.floor(w * 0.6), Math.floor(h * 0.3));
        ctx.fillRect(Math.floor(w * 0.26), Math.floor(h * 0.34), Math.floor(w * 0.48), Math.floor(h * 0.4));
      }
      furniture(ctx, kind, w, h, col, opt);
      paintFence(ctx, w, h, col, opt.edges);
      paintDeed(ctx, w, h, col);
    }

    if (opt.leaking) {
      ctx.fillStyle = P.ember;
      ctx.fillRect(8, Math.floor(h * 0.35), 3, h - Math.floor(h * 0.5));
    }
    if (opt.haunted) {
      ctx.fillStyle = "rgba(61,42,36,0.35)";
      ctx.fillRect(0, 0, w, h);
    }
    if (opt.unpowered) {
      ctx.fillStyle = P.ink;
      ctx.fillRect(Math.floor(w * 0.4), 8, 10, 4);
    }
    if (opt.home) {
      ctx.fillStyle = col;
      ctx.fillRect(Math.floor(w * 0.28), h - 18, Math.floor(w * 0.36), 5);
      ctx.fillStyle = shade(P.parchment, 0.5);
      ctx.fillRect(Math.floor(w * 0.3), h - 17, Math.floor(w * 0.32), 3);
    }
  }

  function furniture(ctx, kind, w, h, col, opt) {
    var y = Math.floor(h * 0.38);
    ctx.fillStyle = col;
    if (kind === "hearth") {
      ctx.fillRect(Math.floor(w / 2) - 10, y - 2, 20, 16);
      ctx.fillStyle = P.ink;
      ctx.fillRect(Math.floor(w / 2) - 6, y - 10, 12, 10);
      ctx.fillStyle = P.ember;
      ctx.fillRect(Math.floor(w / 2) - 6, y + 4, 12, 7);
      ctx.fillStyle = P.lamp;
      if (!opt.unpowered) ctx.fillRect(Math.floor(w / 2) - 3, y + 6, 6, 3);
    } else if (kind === "cistern") {
      ctx.fillStyle = P.copper;
      ctx.fillRect(Math.floor(w / 2) - 6, y - 8, 12, 8);
      ctx.fillStyle = P.dusk;
      ctx.fillRect(Math.floor(w / 2) - 8, y, 16, 6);
      ctx.fillStyle = P.timber;
      ctx.fillRect(w - 22, y + 8, 14, 3);
    } else if (kind === "conservatory") {
      ctx.fillStyle = P.ink;
      ctx.fillRect(Math.floor(w / 2) - 12, y - 6, 24, 18);
      ctx.fillStyle = shade(P.moss, 0.8);
      ctx.fillRect(Math.floor(w / 2) - 10, y - 4, 20, 14);
      ctx.fillStyle = P.moss;
      ctx.fillRect(12, y + 12, 4, 10);
      ctx.fillRect(w - 18, y + 8, 4, 14);
    } else if (kind === "dynamo") {
      ctx.fillStyle = P.lamp;
      ctx.fillRect(Math.floor(w / 2) - 8, y, 16, 16);
      ctx.fillStyle = P.copper;
      ctx.fillRect(Math.floor(w / 2) - 4, y + 4, 8, 8);
    } else if (kind === "dormer") {
      ctx.fillStyle = P.timber;
      ctx.fillRect(14, y + 4, w - 28, 14);
      ctx.fillStyle = P.parchment;
      ctx.fillRect(18, y - 4, 16, 8);
    } else if (kind === "scullery") {
      ctx.fillStyle = P.copper;
      ctx.fillRect(12, y + 6, 18, 10);
      ctx.fillRect(w - 28, y, 14, 14);
    } else if (kind === "vitrine") {
      ctx.fillStyle = P.parchment;
      ctx.fillRect(16, 16, w - 32, h - 40);
      ctx.fillStyle = P.lamp;
      ctx.fillRect(Math.floor(w / 2) - 4, 24, 8, 8);
      ctx.strokeStyle = P.ink;
      ctx.strokeRect(16, 16, w - 32, h - 40);
    }
  }

  function paintEmpty(canvas, opt) {
    opt = opt || {};
    var ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    var w = canvas.width;
    var h = canvas.height;
    dirtFill(ctx, w, h, null);
    if (opt.path) paintPath(ctx, w, h, true);
    ctx.strokeStyle = "#1a100c";
    ctx.lineWidth = 1;
    ctx.strokeRect(1, 1, w - 2, h - 2);
    ctx.fillStyle = P.timber;
    ctx.fillRect(Math.floor(w / 2) - 1, h - 16, 2, 10);
    ctx.fillStyle = P.parchment;
    ctx.fillRect(Math.floor(w / 2) - 4, h - 20, 8, 5);
  }

  function paintFog(canvas, opt) {
    opt = opt || {};
    var ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    var w = canvas.width;
    var h = canvas.height;
    ctx.fillStyle = "#12161c";
    ctx.fillRect(0, 0, w, h);
    var i;
    var j;
    for (i = 0; i < w; i += 2) {
      for (j = 0; j < h; j += 2) {
        var n = (i * 17 + j * 31 + (i ^ j)) % 7;
        if (n < 2) ctx.fillStyle = "#0c1016";
        else if (n < 4) ctx.fillStyle = "#1a2430";
        else ctx.fillStyle = "#151c26";
        ctx.fillRect(i, j, 2, 2);
      }
    }
    ctx.fillStyle = "rgba(20,28,40,0.45)";
    ctx.fillRect(0, 0, w, h);
    var lx = Math.floor(w / 2) - 6;
    var ly = Math.floor(h / 2) - 14;
    ctx.fillStyle = P.ink;
    ctx.fillRect(lx + 2, ly, 8, 6);
    ctx.fillRect(lx, ly + 5, 12, 10);
    ctx.fillStyle = P.parchment;
    ctx.fillRect(lx + 5, ly + 8, 2, 4);
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
    paintEmpty: paintEmpty,
    paintFog: paintFog,
    paintIcon: paintIcon,
    guestUrl: guestUrl,
    GUESTS: GUESTS,
  };
})(window);
