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

  function paintGuest(canvas, id, frame) {
    var a = GUESTS[id];
    if (!a) return;
    var ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var scale = Math.max(1, Math.floor(canvas.width / 16));
    var bob = frame % 2 ? Math.max(1, Math.floor(scale * 0.4)) : 0;
    drawMap(ctx, a, scale, 0, bob);
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

  function paintRoom(canvas, kind, opt) {
    opt = opt || {};
    var ctx = canvas.getContext("2d");
    var w = canvas.width;
    var h = canvas.height;
    ctx.imageSmoothingEnabled = false;
    var def = G.THData.ROOMS[kind];
    var col = def && def.type !== "none" ? G.THData.TYPE_COLOR[def.type] : P.copper;

    ctx.fillStyle = "#241814";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#1e1612";
    for (var fy = Math.floor(h * 0.58); fy < h; fy += 3) ctx.fillRect(0, fy, w, 1);

    if (kind === "lobby") {
      ctx.fillStyle = P.timber;
      ctx.fillRect(3, Math.floor(h * 0.5), Math.floor(w * 0.62), 7);
      ctx.fillStyle = P.parchment;
      ctx.fillRect(5, Math.floor(h * 0.5) - 5, 9, 5);
      ctx.fillStyle = P.lamp;
      ctx.fillRect(w - 14, 6, 6, 8);
      ctx.fillStyle = P.ink;
      ctx.fillRect(18, Math.floor(h * 0.5) - 3, 7, 2);
    } else if (kind === "larder") {
      ctx.fillStyle = P.copper;
      ctx.fillRect(6, 8, w - 14, h - 18);
      ctx.fillStyle = P.timber;
      ctx.fillRect(8, 12, w - 18, 4);
      ctx.fillRect(8, 20, w - 18, 4);
      ctx.fillStyle = P.parchment;
      ctx.fillRect(10, 13, 4, 2);
    } else {
      ctx.fillStyle = shade(col, 0.32);
      ctx.fillRect(2, 2, w - 4, Math.floor(h * 0.54));
      ctx.fillStyle = opt.haunted ? P.timber : col;
      var wx = Math.floor(w * 0.6);
      var wy = Math.floor(h * 0.12);
      var ww = Math.max(6, Math.floor(w * 0.24));
      var wh = Math.max(6, Math.floor(h * 0.22));
      ctx.fillRect(wx, wy, ww, wh);
      ctx.fillStyle = "rgba(26,18,16,0.4)";
      ctx.fillRect(wx + Math.floor(ww / 2), wy, 1, wh);
      ctx.fillRect(wx, wy + Math.floor(wh / 2), ww, 1);
      furniture(ctx, kind, w, h, col, opt);
    }

    if (opt.leaking) {
      ctx.fillStyle = P.ember;
      ctx.fillRect(2, Math.floor(h * 0.3), 3, h - Math.floor(h * 0.4));
    }
    if (opt.haunted) {
      ctx.fillStyle = "rgba(61,42,36,0.4)";
      ctx.fillRect(0, 0, w, h);
    }
    if (opt.unpowered) {
      ctx.fillStyle = P.ink;
      ctx.fillRect(Math.floor(w * 0.4), 4, 8, 4);
    }
    if (opt.home) {
      ctx.fillStyle = col;
      ctx.fillRect(6, h - 6, w - 12, 4);
    }
    ctx.strokeStyle = P.ink;
    ctx.lineWidth = 2;
    ctx.strokeRect(1, 1, w - 2, h - 2);
  }

  function furniture(ctx, kind, w, h, col, opt) {
    var y = Math.floor(h * 0.5);
    ctx.fillStyle = col;
    if (kind === "hearth") {
      ctx.fillRect(6, y - 4, 16, 14);
      ctx.fillStyle = P.ember;
      ctx.fillRect(10, y, 8, 6);
      ctx.fillStyle = P.lamp;
      if (!opt.unpowered) ctx.fillRect(12, y + 2, 4, 3);
    } else if (kind === "cistern") {
      ctx.fillStyle = P.dusk;
      ctx.fillRect(8, y - 2, w - 18, 14);
      ctx.fillStyle = P.lamp;
      ctx.fillRect(10, y + 2, w - 22, 6);
    } else if (kind === "conservatory") {
      ctx.fillStyle = P.moss;
      ctx.fillRect(5, y + 6, w - 10, 5);
      ctx.fillRect(8, y - 4, 3, 12);
      ctx.fillRect(16, y - 8, 3, 16);
    } else if (kind === "dynamo") {
      ctx.fillStyle = P.lamp;
      ctx.fillRect(10, y - 6, 14, 14);
      ctx.fillStyle = P.copper;
      ctx.fillRect(14, y - 2, 6, 6);
    } else if (kind === "dormer") {
      ctx.fillStyle = P.timber;
      ctx.fillRect(6, y, 18, 8);
      ctx.fillStyle = P.parchment;
      ctx.fillRect(8, y - 6, 10, 6);
    } else if (kind === "scullery") {
      ctx.fillStyle = P.copper;
      ctx.fillRect(5, y, 14, 8);
      ctx.fillRect(w - 16, y - 6, 10, 12);
    } else if (kind === "vitrine") {
      ctx.fillStyle = P.parchment;
      ctx.fillRect(8, 8, w - 16, h - 20);
      ctx.fillStyle = P.lamp;
      ctx.fillRect(12, 14, 6, 6);
    } else if (kind === "transom") {
      ctx.fillStyle = P.dusk;
      ctx.fillRect(Math.floor(w * 0.35), 4, Math.floor(w * 0.3), h - 10);
      ctx.fillStyle = P.lamp;
      ctx.fillRect(Math.floor(w * 0.4), 8, Math.floor(w * 0.2), 3);
    }
  }

  function paintEmpty(canvas) {
    var ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = "#201612";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#2a1c18";
    for (var i = 5; i < canvas.width; i += 7) {
      for (var j = 5; j < canvas.height; j += 7) ctx.fillRect(i, j, 2, 2);
    }
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
    paintIcon: paintIcon,
    guestUrl: guestUrl,
    GUESTS: GUESTS,
  };
})(window);
