/* The Grounds — authored park paint. House-spirits, not Nintendo. */
(function (G) {
  const P = G.THData.PAL;

  var C = {
    sky: "#4aa8e8",
    sky2: "#7ec8f0",
    cloud: "#ffffff",
    cloud2: "#d8eef8",
    grass: "#4cb83c",
    grassA: "#6ad04c",
    grassB: "#3a9c2c",
    grassC: "#58c844",
    grassD: "#2e8a22",
    path: "#e6d09a",
    path2: "#d2b878",
    path3: "#c4a060",
    brick: "#c44832",
    brick2: "#a83828",
    brick3: "#e05a40",
    brick4: "#8a2c1c",
    mortar: "#d8b898",
    stone: "#9aa4a8",
    stone2: "#7a848c",
    stone3: "#c4ccc8",
    stone4: "#5a6468",
    wood: "#8b5a32",
    wood2: "#6a4020",
    wood3: "#c48a50",
    wood4: "#4a2c14",
    roof: "#3a7ec8",
    roof2: "#2a5ea0",
    roof3: "#5a9ae0",
    glass: "#c4eef8",
    glass2: "#8cd0e4",
    shine: "#eef8fc",
    tomato: "#e83020",
    leaf: "#2e9c38",
    leaf2: "#1e7a28",
    leaf3: "#5ad04a",
    fire1: "#ff3a00",
    fire2: "#ff8a10",
    fire3: "#ffe060",
    sand: "#e8d4a0",
    sand2: "#d4c080",
    sand3: "#c4a868",
    water: "#2ec4c4",
    water2: "#1a98b0",
    water3: "#7eefe8",
    gold: "#e8c428",
    gold2: "#c4a010",
    banner: "#3a6ec8",
    white: "#f6f0e4",
    ink: "#2a1c12",
  };

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
    var mw = a.map[0].length;
    var mh = a.map.length;
    var scale = Math.max(1, Math.floor(Math.min(canvas.width / mw, canvas.height / mh)));
    var ox = Math.floor((canvas.width - mw * scale) / 2);
    var oy = Math.floor((canvas.height - mh * scale) / 2);
    var bob = opt.sit ? 0 : frame % 2 ? Math.max(1, Math.floor(scale * 0.35)) : 0;
    ctx.save();
    if (opt.flip) {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }
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

  function R(ctx, x, y, w, h, col) {
    ctx.fillStyle = col;
    ctx.fillRect(x | 0, y | 0, w, h);
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

  function grassColor(wx, wy) {
    var n = hash2(wx, wy);
    if (n < 0.08) return C.grassB;
    if (n < 0.16) return C.grassA;
    if (n < 0.22) return "#c8c43a";
    if (n < 0.3) return C.grassD;
    if (n < 0.4) return C.grassC;
    return C.grass;
  }

  function paintGrass(ctx, x0, y0, w, h, seedX, seedY) {
    var x;
    var y;
    for (y = 0; y < h; y += 2) {
      for (x = 0; x < w; x += 2) {
        ctx.fillStyle = grassColor(x + seedX, y + seedY);
        ctx.fillRect(x0 + x, y0 + y, 2, 2);
      }
    }
  }

  function paintFlower(ctx, x, y, col) {
    R(ctx, x, y + 2, 1, 3, C.leaf2);
    R(ctx, x - 1, y, 3, 2, col);
    R(ctx, x, y - 1, 1, 1, C.white);
  }

  function paintFlowerBed(ctx, x, y, w) {
    var cols = ["#e83040", "#f4f0e8", "#e878b0", "#a858d0", "#f0d020"];
    var i;
    for (i = 0; i < w; i += 4) {
      paintFlower(ctx, x + i, y + ((i * 3) % 5), cols[(i + x + y) % cols.length]);
    }
  }

  function paintTree(ctx, x, y, hgt, seed) {
    var i;
    var j;
    var trunk = 3 + ((seed || 0) % 2);
    R(ctx, x - 1, y + hgt - 4, trunk, 10, C.wood2);
    R(ctx, x, y + hgt - 4, 1, 10, C.wood3);
    var layers = [
      [hgt * 0.15, hgt * 0.42, C.leaf2],
      [hgt * 0.28, hgt * 0.38, C.leaf],
      [hgt * 0.4, hgt * 0.3, C.leaf3],
    ];
    layers.forEach(function (L, li) {
      var cy = y + L[0];
      var rr = L[1];
      var col = L[2];
      for (j = -Math.floor(rr); j <= Math.floor(rr); j++) {
        for (i = -Math.floor(rr * 1.15); i <= Math.floor(rr * 1.15); i++) {
          var d = (i * i) / (rr * rr * 1.4) + (j * j) / (rr * rr);
          if (d > 1) continue;
          if (hash2(x + i + li * 9, y + j + seed) < 0.22) continue;
          ctx.fillStyle = hash2(i + seed, j + li) < 0.18 ? C.leaf3 : hash2(i, j + seed) < 0.12 ? C.leaf2 : col;
          ctx.fillRect(x + i, cy + j, 1, 1);
        }
      }
    });
    R(ctx, x - 2, y + 6, 2, 2, C.leaf3);
    R(ctx, x + 3, y + 10, 2, 2, C.white);
  }

  function paintCloud(ctx, x, y, w) {
    R(ctx, x + 4, y + 3, w - 6, 5, C.cloud);
    R(ctx, x + 8, y, w - 14, 5, C.cloud);
    R(ctx, x + 2, y + 5, w - 4, 4, C.cloud);
    R(ctx, x + w - 8, y + 4, 6, 3, C.cloud2);
  }

  function paintLantern(ctx, x, y) {
    R(ctx, x, y, 3, 18, C.wood4);
    R(ctx, x + 1, y, 1, 18, C.wood3);
    R(ctx, x - 1, y + 6, 5, 2, C.wood);
    R(ctx, x - 4, y - 3, 11, 3, C.wood2);
    R(ctx, x - 3, y - 11, 9, 9, C.ink);
    R(ctx, x - 2, y - 10, 7, 7, C.fire3);
    R(ctx, x - 1, y - 8, 5, 4, C.fire2);
    R(ctx, x, y - 7, 3, 2, C.white);
    R(ctx, x - 4, y - 12, 11, 2, C.wood);
    R(ctx, x - 2, y - 14, 7, 2, C.wood2);
    R(ctx, x, y - 15, 3, 1, C.wood4);
  }

  function paintPathStrip(ctx, x0, y0, x1, y1, wide) {
    var dx = x1 - x0;
    var dy = y1 - y0;
    var len = Math.hypot(dx, dy) || 1;
    var ux = dx / len;
    var uy = dy / len;
    var px = -uy;
    var py = ux;
    var hw = Math.floor((wide || 14) / 2);
    var i;
    var k;
    var x;
    var y;
    var n;
    for (i = 0; i <= len; i++) {
      x = Math.round(x0 + ux * i);
      y = Math.round(y0 + uy * i);
      for (k = -hw; k <= hw; k++) {
        n = Math.abs(k);
        ctx.fillStyle = n >= hw - 1 ? C.path3 : n === 0 ? "#f0e0b0" : hash2(x + k, y) < 0.12 ? C.path2 : C.path;
        ctx.fillRect(x + Math.round(px * k), y + Math.round(py * k), 1, 1);
      }
    }
  }

  function paintPark(canvas, opt) {
    opt = opt || {};
    var ctx = canvas.getContext("2d");
    var w = canvas.width;
    var h = canvas.height;
    var lot = opt.lot || 128;
    var bounds = opt.bounds || { minX: 0, minY: 0, maxX: 2, maxY: 1 };
    var owned = opt.owned || {};
    ctx.imageSmoothingEnabled = false;
    var northH = lot;
    var y;
    var x;
    for (y = 0; y < h; y++) {
      if (y < northH * 0.55) ctx.fillStyle = y < 18 ? C.sky : C.sky2;
      else ctx.fillStyle = C.grass;
      ctx.fillRect(0, y, w, 1);
    }
    paintCloud(ctx, 18, 8, 40);
    paintCloud(ctx, Math.floor(w * 0.38), 14, 52);
    paintCloud(ctx, w - 80, 6, 46);
    paintGrass(ctx, 0, Math.floor(northH * 0.48), w, h - Math.floor(northH * 0.48), bounds.minX * 17, bounds.minY * 13);
    for (x = 10; x < w; x += 36) {
      paintTree(ctx, x + ((hash2(x, 3) * 8) | 0), 16, 34 + ((x * 3) % 12), x);
    }
    for (y = Math.floor(northH * 0.4); y < h; y += 9) {
      for (x = 3; x < w; x += 11) {
        if (hash2(x + 4, y + 2) < 0.16) {
          ctx.fillStyle = hash2(x, y) < 0.5 ? C.leaf2 : "#e8d050";
          ctx.fillRect(x, y, 2, 1);
          ctx.fillRect(x + 1, y - 1, 1, 1);
        }
      }
    }
    Object.keys(owned).forEach(function (k) {
      var c = owned[k];
      if (!c) return;
      var ox = (c.x - bounds.minX) * lot;
      var oy = (bounds.maxY - c.y) * lot;
      var east = owned[c.x + 1 + "," + c.y];
      var north = owned[c.x + "," + (c.y + 1)];
      if (east) {
        paintPathStrip(ctx, ox + lot * 0.5, oy + lot * 0.72, ox + lot * 1.5, oy + lot * 0.72, 16);
        paintLantern(ctx, ox + lot - 2, oy + lot * 0.62);
      }
      if (north) {
        paintPathStrip(ctx, ox + lot * 0.5, oy + lot * 0.7, ox + lot * 0.5, oy - lot * 0.28, 16);
        paintLantern(ctx, ox + lot * 0.38, oy - 4);
      }
      if (c.room === "lobby") {
        paintPathStrip(ctx, ox + lot * 0.5, oy + lot * 0.78, ox + lot * 0.5, oy + lot + 2, 16);
      }
    });
    for (y = Math.floor(northH * 0.55); y < h - 20; y += 28) {
      for (x = 8; x < w - 12; x += 36) {
        if (hash2(x + 11, y + 7) < 0.28) paintFlowerBed(ctx, x, y, 14);
      }
    }
  }

  function paintPlaque(ctx, cx, y, kind, col) {
    R(ctx, cx - 7, y, 14, 11, C.ink);
    R(ctx, cx - 6, y + 1, 12, 9, C.wood);
    R(ctx, cx - 5, y + 2, 10, 7, col || C.gold);
    if (kind === "hearth") {
      R(ctx, cx - 1, y + 3, 3, 5, C.fire2);
      R(ctx, cx, y + 4, 1, 3, C.fire3);
    } else if (kind === "cistern") {
      R(ctx, cx - 3, y + 5, 7, 2, C.white);
      R(ctx, cx - 2, y + 4, 5, 1, C.white);
    } else if (kind === "conservatory") {
      R(ctx, cx, y + 3, 1, 5, C.leaf2);
      R(ctx, cx - 2, y + 4, 5, 2, C.leaf);
    } else {
      R(ctx, cx - 1, y + 4, 3, 3, C.white);
    }
  }

  function woodRail(ctx, x0, y0, x1, y1) {
    var dx = x1 - x0;
    var dy = y1 - y0;
    var len = Math.hypot(dx, dy) || 1;
    var ux = dx / len;
    var uy = dy / len;
    var i;
    for (i = 0; i <= len; i++) {
      var x = Math.round(x0 + ux * i);
      var y = Math.round(y0 + uy * i);
      R(ctx, x - 1, y - 1, 3, 3, C.wood4);
      R(ctx, x, y, 2, 2, C.wood);
      R(ctx, x, y, 1, 1, C.wood3);
    }
  }

  function paintRoundFence(ctx, cx, cy, r, col, opt) {
    opt = opt || {};
    var n = 18;
    var posts = [];
    var i;
    var a;
    var px;
    var py;
    var key;
    var edge;
    var postCol;
    for (i = 0; i < n; i++) {
      a = (i / n) * Math.PI * 2;
      if (a > 0.42 * Math.PI && a < 0.58 * Math.PI) continue;
      px = cx + Math.round(Math.cos(a) * r);
      py = cy + Math.round(Math.sin(a) * r);
      posts.push({ x: px, y: py, a: a });
    }
    for (i = 0; i < posts.length - 1; i++) {
      var a0 = posts[i];
      var a1 = posts[i + 1];
      if (Math.hypot(a1.x - a0.x, a1.y - a0.y) > r * 0.55) continue;
      woodRail(ctx, a0.x, a0.y - 3, a1.x, a1.y - 3);
      woodRail(ctx, a0.x, a0.y + 1, a1.x, a1.y + 1);
    }
    for (i = 0; i < posts.length; i++) {
      a = posts[i].a;
      px = posts[i].x;
      py = posts[i].y;
      key = Math.abs(Math.cos(a)) > Math.abs(Math.sin(a)) ? (Math.cos(a) > 0 ? "e" : "w") : Math.sin(a) > 0 ? "s" : "n";
      edge = (opt.edges || {})[key] || {};
      postCol = edge.friction ? "#e86a1c" : edge.nourish ? "#3db84a" : C.wood;
      R(ctx, px - 2, py - 9, 5, 14, C.ink);
      R(ctx, px - 1, py - 8, 3, 12, postCol);
      R(ctx, px, py - 7, 1, 10, C.wood3);
      if ((opt.level || 1) >= 3) R(ctx, px - 2, py - 9, 5, 2, C.gold2);
    }
    paintPlaque(ctx, cx, cy + r - 2, opt.kind, col);
  }

  function paintSandPatch(ctx, cx, cy, r) {
    var x;
    var y;
    var r2 = r * r;
    for (y = -r; y <= r; y++) {
      for (x = -r; x <= r; x++) {
        if (x * x + y * y > r2) continue;
        ctx.fillStyle = hash2(x + 3, y + 5) < 0.18 ? C.sand3 : hash2(x, y) < 0.22 ? C.sand2 : C.sand;
        ctx.fillRect(cx + x, cy + y, 1, 1);
      }
    }
  }

  function paintBrickWall(ctx, x, y, w, h) {
    R(ctx, x, y, w, h, C.brick);
    var row;
    var col;
    for (row = 0; row < h; row += 4) {
      R(ctx, x, y + row, w, 1, C.mortar);
      var off = (row / 4) % 2 ? 3 : 0;
      for (col = off; col < w; col += 6) {
        R(ctx, x + col, y + row, 1, Math.min(4, h - row), C.mortar);
        if (hash2(x + col, y + row) < 0.28) R(ctx, x + col + 1, y + row + 1, 4, 2, C.brick2);
        else if (hash2(x + col + 2, y + row) < 0.2) R(ctx, x + col + 1, y + row + 1, 3, 2, C.brick3);
      }
    }
    R(ctx, x, y, w, 1, C.brick4);
    R(ctx, x, y + h - 1, w, 1, C.brick4);
    R(ctx, x, y, 1, h, C.brick4);
    R(ctx, x + w - 1, y, 1, h, C.brick4);
  }

  function paintStoneWall(ctx, x, y, w, h) {
    R(ctx, x, y, w, h, C.stone);
    var i;
    var j;
    for (j = 0; j < h; j += 5) {
      R(ctx, x, y + j, w, 1, C.stone4);
      for (i = (j / 5) % 2 ? 4 : 0; i < w; i += 7) {
        R(ctx, x + i, y + j, 1, Math.min(5, h - j), C.stone4);
        if (hash2(x + i, y + j) < 0.35) R(ctx, x + i + 1, y + j + 1, 4, 3, C.stone2);
        else R(ctx, x + i + 1, y + j + 1, 3, 2, C.stone3);
      }
    }
    R(ctx, x, y, w, 1, C.stone4);
    R(ctx, x, y + h - 1, w, 1, C.stone4);
    R(ctx, x, y, 1, h, C.stone4);
    R(ctx, x + w - 1, y, 1, h, C.stone4);
  }

  function paintBlueRoof(ctx, x, y, w, h) {
    var i;
    var j;
    for (j = 0; j < h; j++) {
      var inset = Math.floor((j / h) * 2);
      R(ctx, x + inset, y + j, w - inset * 2, 1, j % 3 === 0 ? C.roof2 : C.roof);
      if (j % 3 === 1) {
        for (i = 2; i < w - 2; i += 4) R(ctx, x + i, y + j, 2, 1, C.roof3);
      }
    }
    R(ctx, x, y, w, 1, C.ink);
  }

  function paintKiln(ctx, cx, cy) {
    var x = cx - 20;
    var y = cy - 28;
    paintBrickWall(ctx, x + 12, y, 14, 14);
    R(ctx, x + 14, y - 4, 10, 5, C.brick2);
    R(ctx, x + 16, y - 6, 6, 3, C.brick4);
    R(ctx, x + 17, y - 8, 4, 3, C.ink);
    paintBrickWall(ctx, x, y + 12, 40, 30);
    var k;
    for (k = 0; k < 10; k++) {
      R(ctx, x + 10 + k, y + 22 + Math.floor((k * k) / 16), 20 - k * 2, 1, C.ink);
    }
    R(ctx, x + 12, y + 26, 16, 14, C.ink);
    R(ctx, x + 14, y + 28, 12, 12, C.fire1);
    R(ctx, x + 16, y + 30, 8, 9, C.fire2);
    R(ctx, x + 18, y + 32, 4, 6, C.fire3);
    R(ctx, x + 19, y + 34, 2, 3, C.white);
    R(ctx, x + 8, y + 40, 4, 3, C.wood2);
    R(ctx, x + 28, y + 40, 4, 3, C.wood2);
  }

  function paintWellAndPool(ctx, cx, cy) {
    var wx = cx - 18;
    var wy = cy - 22;
    paintBlueRoof(ctx, wx + 2, wy, 22, 8);
    R(ctx, wx + 4, wy + 7, 3, 8, C.wood2);
    R(ctx, wx + 19, wy + 7, 3, 8, C.wood2);
    R(ctx, wx + 3, wy + 6, 20, 2, C.wood);
    paintStoneWall(ctx, wx + 4, wy + 14, 18, 16);
    R(ctx, wx + 7, wy + 18, 12, 8, C.water2);
    R(ctx, wx + 8, wy + 19, 10, 3, C.water3);
    var px = cx + 4;
    var py = cy + 6;
    fillDisk(ctx, px + 10, py + 8, 14, C.water2);
    fillDisk(ctx, px + 9, py + 7, 11, C.water);
    R(ctx, px + 4, py + 4, 8, 1, C.water3);
    R(ctx, px + 12, py + 10, 6, 1, C.shine);
    R(ctx, wx + 20, wy + 28, 3, 8, C.water3);
    R(ctx, wx + 21, wy + 30, 2, 6, C.white);
    R(ctx, px + 4, py + 8, 4, 2, C.leaf);
    R(ctx, px + 14, py + 12, 3, 2, C.leaf2);
    R(ctx, px + 5, py + 8, 2, 1, C.white);
  }

  function paintTomatoPlant(ctx, x, y) {
    R(ctx, x + 2, y + 4, 2, 14, C.leaf2);
    R(ctx, x, y + 6, 6, 3, C.leaf);
    R(ctx, x - 1, y + 10, 8, 3, C.leaf3);
    R(ctx, x + 1, y + 8, 2, 2, C.tomato);
    R(ctx, x + 4, y + 12, 2, 2, C.tomato);
    R(ctx, x, y + 13, 2, 2, C.tomato);
  }

  function paintGreenhouse(ctx, cx, cy) {
    var x = cx - 24;
    var y = cy - 26;
    R(ctx, x + 20, y - 6, 6, 8, C.stone2);
    R(ctx, x + 21, y - 8, 4, 3, C.stone4);
    R(ctx, x + 6, y + 2, 36, 8, C.white);
    var i;
    for (i = 0; i < 8; i++) {
      R(ctx, x + 8 + i * 2, y + 2 - i, 36 - i * 4, 1, i % 2 ? C.white : C.glass);
    }
    R(ctx, x + 4, y + 10, 40, 28, C.white);
    R(ctx, x + 6, y + 12, 16, 10, C.glass);
    R(ctx, x + 24, y + 12, 16, 10, C.glass);
    R(ctx, x + 6, y + 24, 16, 10, C.glass2);
    R(ctx, x + 24, y + 24, 16, 10, C.glass);
    R(ctx, x + 7, y + 13, 5, 2, C.shine);
    R(ctx, x + 25, y + 13, 5, 2, C.shine);
    paintTomatoPlant(ctx, x + 10, y + 16);
    paintTomatoPlant(ctx, x + 28, y + 18);
    paintTomatoPlant(ctx, x + 18, y + 20);
    R(ctx, x + 22, y + 10, 2, 28, C.white);
    R(ctx, x + 4, y + 23, 40, 2, C.white);
    R(ctx, x - 6, y + 32, 10, 7, C.wood);
    R(ctx, x - 5, y + 33, 3, 3, C.tomato);
    R(ctx, x - 1, y + 33, 3, 3, C.tomato);
    R(ctx, x + 2, y + 34, 2, 2, C.tomato);
  }

  function paintCottage(ctx, cx, cy) {
    var x = cx - 26;
    var y = cy - 28;
    paintBlueRoof(ctx, x + 2, y, 48, 16);
    R(ctx, x + 38, y + 2, 8, 16, C.brick2);
    R(ctx, x + 40, y - 2, 4, 6, C.brick4);
    paintStoneWall(ctx, x + 6, y + 16, 40, 28);
    R(ctx, x + 20, y + 26, 12, 18, C.wood2);
    R(ctx, x + 22, y + 24, 8, 4, C.wood4);
    R(ctx, x + 24, y + 30, 4, 8, C.wood);
    fillDisk(ctx, cx, y + 22, 6, C.ink);
    fillDisk(ctx, cx, y + 22, 5, C.gold);
    fillDisk(ctx, cx, y + 22, 3, C.gold2);
    R(ctx, cx - 1, y + 20, 2, 5, C.ink);
    R(ctx, cx - 2, y + 22, 4, 1, C.ink);
    R(ctx, x + 10, y + 22, 6, 8, C.sky2);
    R(ctx, x + 36, y + 22, 6, 8, C.sky2);
    R(ctx, x + 10, y + 25, 6, 1, C.white);
    R(ctx, x + 36, y + 25, 6, 1, C.white);
    R(ctx, x + 8, y + 16, 5, 12, C.banner);
    R(ctx, x + 39, y + 16, 5, 12, C.banner);
    R(ctx, x + 9, y + 18, 3, 3, C.white);
    R(ctx, x + 40, y + 18, 3, 3, C.white);
    R(ctx, x + 40, y + 36, 12, 7, C.wood);
    R(ctx, x + 41, y + 37, 10, 5, C.white);
    R(ctx, x + 42, y + 38, 2, 3, C.ink);
    R(ctx, x + 45, y + 38, 2, 3, C.ink);
    R(ctx, x + 48, y + 38, 2, 3, C.ink);
  }

  function paintDynamo(ctx, cx, cy) {
    var x = cx - 16;
    var y = cy - 18;
    paintStoneWall(ctx, x + 4, y + 10, 24, 20);
    R(ctx, x + 8, y, 16, 12, C.gold);
    R(ctx, x + 10, y + 2, 12, 8, C.gold2);
    R(ctx, x + 14, y + 4, 4, 4, C.ink);
    R(ctx, x + 6, y + 14, 4, 10, C.wood2);
    R(ctx, x + 22, y + 14, 4, 10, C.wood2);
  }

  function paintLoft(ctx, cx, cy) {
    var x = cx - 18;
    var y = cy - 22;
    paintBlueRoof(ctx, x, y, 36, 12);
    paintStoneWall(ctx, x + 4, y + 12, 28, 22);
    R(ctx, x + 10, y + 16, 8, 8, C.sky2);
    R(ctx, x + 22, y + 20, 6, 10, C.wood2);
  }

  function paintYard(ctx, cx, cy) {
    var x = cx - 18;
    var y = cy - 12;
    R(ctx, x, y + 10, 16, 10, "#d86a2c");
    R(ctx, x + 2, y + 12, 12, 6, "#f08840");
    R(ctx, x + 18, y, 14, 16, "#c45c26");
    R(ctx, x + 20, y + 2, 10, 10, "#8b5a3c");
    R(ctx, x + 8, y + 6, 6, 4, C.wood);
  }

  function paintCase(ctx, cx, cy) {
    var x = cx - 16;
    var y = cy - 20;
    R(ctx, x, y, 32, 36, C.wood2);
    R(ctx, x + 3, y + 4, 26, 28, C.glass);
    R(ctx, x + 5, y + 6, 8, 8, C.gold);
    R(ctx, x + 16, y + 16, 8, 8, C.gold2);
    R(ctx, x + 6, y + 7, 3, 2, C.shine);
  }

  function paintShed(ctx, cx, cy) {
    var x = cx - 18;
    var y = cy - 16;
    paintBrickWall(ctx, x, y + 8, 36, 22);
    R(ctx, x - 2, y, 40, 10, C.wood);
    R(ctx, x + 4, y + 12, 10, 3, C.wood3);
    R(ctx, x + 4, y + 18, 10, 3, C.wood3);
    R(ctx, x + 22, y + 14, 8, 12, C.wood2);
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
    var col = type !== "none" ? G.THData.TYPE_COLOR[type] : C.wood;
    var cx = Math.floor(w / 2);
    var cy = Math.floor(h / 2) - 2;
    var fenceR = Math.floor(Math.min(w, h) * 0.42);

    if (kind === "lobby") {
      paintCottage(ctx, cx, cy);
      paintLantern(ctx, 18, h - 36);
      paintLantern(ctx, w - 22, h - 36);
    } else if (kind === "larder") {
      paintShed(ctx, cx, cy);
    } else if (kind === "transom") {
      paintPathStrip(ctx, cx, 8, cx, h - 8, 16);
      paintPathStrip(ctx, 10, Math.floor(h * 0.68), w - 10, Math.floor(h * 0.68), 14);
      paintLantern(ctx, Math.floor(w * 0.3), 22);
      paintLantern(ctx, Math.floor(w * 0.7), h - 28);
    } else {
      if (kind === "hearth") paintSandPatch(ctx, cx, cy + 6, fenceR - 8);
      else if (kind === "cistern") {
        fillDisk(ctx, cx, cy + 8, fenceR - 10, C.grass);
        fillDisk(ctx, cx + 8, cy + 14, 16, C.water2);
      } else {
        fillDisk(ctx, cx, cy + 6, fenceR - 10, C.grassA);
      }
      if (kind === "hearth") paintKiln(ctx, cx, cy - 4);
      else if (kind === "cistern") paintWellAndPool(ctx, cx, cy - 2);
      else if (kind === "conservatory") paintGreenhouse(ctx, cx, cy - 2);
      else if (kind === "dynamo") paintDynamo(ctx, cx, cy);
      else if (kind === "dormer") paintLoft(ctx, cx, cy);
      else if (kind === "scullery") paintYard(ctx, cx, cy);
      else if (kind === "vitrine") paintCase(ctx, cx, cy);
      else paintShed(ctx, cx, cy);
      paintRoundFence(ctx, cx, cy + 2, fenceR, col, { level: opt.level || 1, edges: opt.edges, kind: kind });
    }

    if (opt.leaking) R(ctx, cx - 18, cy, 3, 22, C.fire1);
    if (opt.haunted) fillDisk(ctx, cx, cy, fenceR, "rgba(90,50,120,0.2)");
    if (opt.unpowered) R(ctx, cx - 6, cy - 24, 12, 4, C.ink);
    if (opt.home) {
      R(ctx, cx - 12, cy + 18, 24, 6, col);
      R(ctx, cx - 10, cy + 19, 20, 4, shade(P.parchment, 0.7));
    }
    if (opt.selected) {
      R(ctx, 2, 2, w - 4, 2, C.gold);
      R(ctx, 2, h - 4, w - 4, 2, C.gold);
      R(ctx, 2, 2, 2, h - 4, C.gold);
      R(ctx, w - 4, 2, 2, h - 4, C.gold);
    }
  }

  function paintRoom(canvas, kind, opt) {
    paintHabitat(canvas, kind, opt);
  }

  function paintEmpty(canvas, opt) {
    opt = opt || {};
    var ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (hash2((opt.x || 1) * 5, (opt.y || 0) * 7) < 0.7) {
      paintFlowerBed(ctx, 16, canvas.height - 28, 18);
    }
    if (opt.selected) {
      R(ctx, 3, 3, canvas.width - 6, 2, C.gold);
      R(ctx, 3, canvas.height - 5, canvas.width - 6, 2, C.gold);
    }
  }

  var GLYPH = {
    B: ["11.", "1.1", "11.", "1.1", "11."],
    U: ["1.1", "1.1", "1.1", "1.1", "111"],
    Y: ["1.1", "1.1", ".1.", ".1.", ".1."],
    L: ["1..", "1..", "1..", "1..", "111"],
    A: [".1.", "1.1", "111", "1.1", "1.1"],
    N: ["1.1", "11.", "1.1", "1.1", "1.1"],
    D: ["11.", "1.1", "1.1", "1.1", "11."],
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

  function paintText(ctx, text, x, y, col) {
    ctx.fillStyle = col;
    var i;
    var r;
    var c;
    var glyph;
    var ox = x;
    for (i = 0; i < text.length; i++) {
      glyph = GLYPH[text.charAt(i)];
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

  function paintStake(ctx, cx, cy, cost) {
    R(ctx, cx - 1, cy + 10, 3, 20, C.ink);
    R(ctx, cx, cy + 11, 1, 18, C.wood3);
    R(ctx, cx - 18, cy - 18, 37, 30, C.ink);
    R(ctx, cx - 17, cy - 17, 35, 28, C.wood);
    R(ctx, cx - 15, cy - 15, 31, 24, C.wood4);
    paintText(ctx, "BUY", cx - 6, cy - 12, C.white);
    paintText(ctx, "LAND", cx - 8, cy - 5, C.white);
    paintText(ctx, String((cost && cost.scrap) || 12), cx - 4, cy + 3, C.gold);
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
    if ((opt.y || 0) >= 1) {
      var y;
      for (y = 0; y < 36; y++) {
        ctx.fillStyle = y < 16 ? C.sky : C.sky2;
        ctx.fillRect(0, y, w, 1);
      }
    }
    paintTree(ctx, 18, 8, 34, seedX);
    paintTree(ctx, w - 22, 4, 40, seedY + 3);
    paintTree(ctx, Math.floor(w * 0.42), 10, 28, seedX + 7);
    paintTree(ctx, 28, h - 52, 26, seedY + 11);
    paintTree(ctx, w - 30, h - 56, 30, seedX + 13);
    var i;
    var j;
    var n;
    for (i = 0; i < w; i += 2) {
      for (j = 0; j < h; j += 2) {
        n = hash2(i + seedX, j + seedY);
        if (n > 0.55) continue;
        ctx.fillStyle = n < 0.18 ? "rgba(220,240,210,0.35)" : "rgba(240,250,230,0.16)";
        ctx.fillRect(i, j, 2, 2);
      }
    }
    if (!opt.inert) paintStake(ctx, Math.floor(w / 2), Math.floor(h / 2) + 6, opt.cost);
    if (opt.selected) {
      R(ctx, 3, 3, w - 6, 2, C.gold);
      R(ctx, 3, h - 5, w - 6, 2, C.gold);
    }
  }

  function paintIcon(size) {
    var c = document.createElement("canvas");
    c.width = size;
    c.height = size;
    var ctx = c.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    var s = size / 16;
    function box(x, y, w, h, col) {
      ctx.fillStyle = col;
      ctx.fillRect(Math.floor(x * s), Math.floor(y * s), Math.ceil(w * s), Math.ceil(h * s));
    }
    box(0, 0, 16, 16, C.sky);
    box(1, 8, 14, 7, C.grass);
    box(3, 6, 10, 8, C.brick);
    box(6, 2, 4, 5, C.brick2);
    box(5, 9, 6, 5, C.fire2);
    box(7, 10, 2, 3, C.fire3);
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
