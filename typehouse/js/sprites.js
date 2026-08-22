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

  function isReady() {
    return readyCount >= NAMES.length;
  }

  function notify() {
    if (!isReady()) return;
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

  function blit(ctx, name, x, y, w, h) {
    var im = IMG[name];
    if (!im || !im.naturalWidth) return false;
    var sx = w / im.naturalWidth;
    var sy = h / im.naturalHeight;
    var integer =
      Math.abs(sx - Math.round(sx)) < 0.02 && Math.abs(sy - Math.round(sy)) < 0.02;
    ctx.imageSmoothingEnabled = !integer;
    ctx.drawImage(im, Math.round(x), Math.round(y), Math.round(w), Math.round(h));
    return true;
  }

  function blitCrisp(ctx, name, x, y, w, h) {
    var im = IMG[name];
    if (!im || !im.naturalWidth) return false;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(im, Math.round(x), Math.round(y), Math.round(w), Math.round(h));
    return true;
  }

  function paintVisitorPath(ctx, x1, y1, x2, y2) {
    ctx.save();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#6a4824";
    ctx.lineWidth = 20;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.strokeStyle = "#c4a05a";
    ctx.lineWidth = 14;
    ctx.stroke();
    ctx.strokeStyle = "#d8b46a";
    ctx.lineWidth = 8;
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
    if (png && IMG[png] && IMG[png].naturalWidth) {
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
    if (IMG.grass && IMG.grass.naturalWidth) {
      for (y = 0; y < h; y += IMG.grass.naturalHeight) {
        for (x = 0; x < w; x += IMG.grass.naturalWidth) {
          ctx.drawImage(IMG.grass, x, y);
        }
      }
    } else {
      ctx.fillStyle = "#58b03c";
      ctx.fillRect(0, 0, w, h);
    }
    /* Sky + trees only on the north zoo edge, never under the pens. */
    ctx.fillStyle = "#7ec8f0";
    ctx.fillRect(0, 0, w, Math.floor(lot * 0.22));
    ctx.fillStyle = "#4aa8e8";
    ctx.fillRect(0, 0, w, Math.floor(lot * 0.1));
    if (IMG.trees && IMG.trees.naturalWidth) {
      ctx.drawImage(IMG.trees, 0, 0, w, Math.floor(lot * 0.38));
    }
    Object.keys(owned).forEach(function (k) {
      var c = owned[k];
      if (!c) return;
      var o = lotOrigin(c, bounds, lot);
      var east = owned[c.x + 1 + "," + c.y];
      var south = owned[c.x + "," + (c.y - 1)];
      var southY = o.y + lot * 0.82;
      if (east) {
        var eo = lotOrigin(east, bounds, lot);
        paintVisitorPath(ctx, o.x + lot * 0.5, southY, eo.x + lot * 0.5, eo.y + lot * 0.82);
        blitCrisp(ctx, "lantern", o.x + lot - 16, southY - 44, 14, 40);
      }
      if (south) {
        var so = lotOrigin(south, bounds, lot);
        paintVisitorPath(ctx, o.x + lot * 0.5, o.y + lot * 0.78, so.x + lot * 0.5, so.y + lot * 0.22);
        blitCrisp(ctx, "lantern", o.x + lot * 0.5 + 10, o.y + lot - 22, 14, 40);
      }
      if (c.room === "lobby") {
        paintVisitorPath(ctx, o.x + lot * 0.5, o.y + lot * 0.96, o.x + lot * 0.5, o.y + lot * 0.28);
      }
    });
  }

  function paintHabitat(canvas, kind, opt) {
    opt = opt || {};
    var ctx = canvas.getContext("2d");
    var w = canvas.width;
    var h = canvas.height;
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, w, h);
    var yard = YARD[kind];
    if (yard && blitCrisp(ctx, yard, 0, 0, w, h)) {
      /* transparent exhibit on shared park grass */
    }
    if (opt.leaking) {
      ctx.fillStyle = "rgba(232,80,20,0.35)";
      ctx.fillRect(Math.floor(w * 0.3), Math.floor(h * 0.4), 6, Math.floor(h * 0.3));
    }
    if (opt.haunted) {
      ctx.fillStyle = "rgba(90,50,120,0.18)";
      ctx.fillRect(0, 0, w, h);
    }
    if (opt.selected) {
      ctx.strokeStyle = "#e8c428";
      ctx.lineWidth = 3;
      ctx.strokeRect(2, 2, w - 4, h - 4);
    }
  }

  function paintRoom(canvas, kind, opt) {
    paintHabitat(canvas, kind, opt);
  }

  function paintEmpty(canvas, opt) {
    opt = opt || {};
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (opt.selected) {
      ctx.strokeStyle = "#e8c428";
      ctx.lineWidth = 3;
      ctx.strokeRect(2, 2, canvas.width - 4, canvas.height - 4);
    }
  }

  function paintFog(canvas, opt) {
    opt = opt || {};
    var ctx = canvas.getContext("2d");
    var w = canvas.width;
    var h = canvas.height;
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, w, h);
    if (!opt.inert) blitCrisp(ctx, "buyland", Math.floor(w * 0.3), Math.floor(h * 0.28), Math.floor(w * 0.4), Math.floor(h * 0.58));
    if (opt.selected) {
      ctx.strokeStyle = "#e8c428";
      ctx.lineWidth = 3;
      ctx.strokeRect(2, 2, w - 4, h - 4);
    }
  }

  function paintIcon(size) {
    var c = document.createElement("canvas");
    c.width = size;
    c.height = size;
    var ctx = c.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    if (IMG.cottage && IMG.cottage.naturalWidth) ctx.drawImage(IMG.cottage, 0, 0, size, size);
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
    paintIcon: paintIcon,
    guestUrl: guestUrl,
    GUESTS: GUESTS,
  };
})(window);
