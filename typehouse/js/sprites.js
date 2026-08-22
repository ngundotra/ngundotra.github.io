/* The Grounds — PNG yards. House-spirits, not Nintendo. */
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

  var NAMES = ["kiln", "well", "greenhouse", "cottage", "grass", "path", "trees", "wicknoll", "lantern", "buyland"];
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
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(im, x, y, w, h);
    return true;
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
    if (id === "Wicknoll" && IMG.wicknoll && IMG.wicknoll.naturalWidth) {
      ctx.imageSmoothingEnabled = true;
      var pad = 2;
      ctx.drawImage(IMG.wicknoll, pad, pad + bob, canvas.width - pad * 2, canvas.height - pad * 2 - bob);
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
    ctx.imageSmoothingEnabled = true;
    ctx.fillStyle = "#4aa8e8";
    ctx.fillRect(0, 0, w, h);
    var skyH = Math.floor(lot * 0.42);
    ctx.fillStyle = "#7ec8f0";
    ctx.fillRect(0, Math.floor(skyH * 0.55), w, skyH);
    var x;
    var y;
    if (IMG.grass && IMG.grass.naturalWidth) {
      for (y = Math.floor(skyH * 0.72); y < h; y += 128) {
        for (x = 0; x < w; x += 128) {
          ctx.drawImage(IMG.grass, x, y, 128, 128);
        }
      }
    } else {
      ctx.fillStyle = "#4cb83c";
      ctx.fillRect(0, skyH, w, h - skyH);
    }
    if (IMG.trees && IMG.trees.naturalWidth) {
      for (x = -20; x < w; x += 110) {
        ctx.drawImage(IMG.trees, x, -8, 140, 140);
      }
    }
    Object.keys(owned).forEach(function (k) {
      var c = owned[k];
      if (!c) return;
      var ox = (c.x - bounds.minX) * lot;
      var oy = (bounds.maxY - c.y) * lot;
      var east = owned[c.x + 1 + "," + c.y];
      var north = owned[c.x + "," + (c.y + 1)];
      if (east && IMG.path && IMG.path.naturalWidth) {
        ctx.save();
        ctx.translate(ox + lot * 0.5, oy + lot * 0.72);
        ctx.rotate(0);
        ctx.drawImage(IMG.path, 0, -14, lot, 28);
        ctx.restore();
      }
      if (north && IMG.path && IMG.path.naturalWidth) {
        ctx.save();
        ctx.translate(ox + lot * 0.5, oy + lot * 0.2);
        ctx.rotate(-Math.PI / 2);
        ctx.drawImage(IMG.path, 0, -14, lot, 28);
        ctx.restore();
      }
      if (c.room === "lobby" && IMG.path && IMG.path.naturalWidth) {
        ctx.save();
        ctx.translate(ox + lot * 0.5, oy + lot * 0.78);
        ctx.rotate(-Math.PI / 2);
        ctx.drawImage(IMG.path, 0, -14, lot * 0.4, 28);
        ctx.restore();
      }
      if (east) blit(ctx, "lantern", ox + lot - 22, oy + lot * 0.52, 28, 46);
      if (north) blit(ctx, "lantern", ox + lot * 0.36, oy - 8, 28, 46);
    });
  }

  function paintHabitat(canvas, kind, opt) {
    opt = opt || {};
    var ctx = canvas.getContext("2d");
    var w = canvas.width;
    var h = canvas.height;
    ctx.imageSmoothingEnabled = true;
    ctx.clearRect(0, 0, w, h);
    var yard = YARD[kind];
    if (yard && blit(ctx, yard, 0, 0, w, h)) {
      /* authored PNG */
    } else if (IMG.grass && IMG.grass.naturalWidth) {
      ctx.drawImage(IMG.grass, 0, 0, w, h);
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
    ctx.imageSmoothingEnabled = true;
    ctx.clearRect(0, 0, w, h);
    blit(ctx, "trees", -10, -20, w + 20, Math.floor(h * 0.7));
    blit(ctx, "trees", Math.floor(w * 0.25), Math.floor(h * 0.15), Math.floor(w * 0.7), Math.floor(h * 0.7));
    if (!opt.inert) blit(ctx, "buyland", Math.floor(w * 0.22), Math.floor(h * 0.28), Math.floor(w * 0.56), Math.floor(h * 0.56));
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
    ctx.imageSmoothingEnabled = true;
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
