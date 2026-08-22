/* Habitat Grounds wander — visual only. Not persisted. */
(function (G) {
  const T = G.Typehouse;
  const D = G.THData;
  var actors = {};
  var seed = 0x6a09e667;
  var forceMeet = false;
  var last = 0;
  var frame = 0;
  var tmp = null;
  var LOT = 128;
  var GW = 28;
  var GH = 28;

  function rng() {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  }

  function parseMeet() {
    var q = T.parseQS();
    return !!(q.meet);
  }

  function walkPad(room) {
    return T.isFenced(room) ? 24 : 12;
  }

  function clamp(v, a, b) {
    return Math.max(a, Math.min(b, v));
  }

  function clampWalk(a, room) {
    var pad = walkPad(room);
    a.px = clamp(a.px, pad, LOT - pad - GW);
    a.py = clamp(a.py, pad, LOT - pad - GH);
  }

  function standPoint(room) {
    return { x: LOT * 0.5 - GW * 0.5, y: LOT * 0.64 };
  }

  function gatePoint() {
    return { x: LOT * 0.5 - GW * 0.5, y: LOT - walkPad(null) - GH };
  }

  function rugPoint() {
    return { x: LOT * 0.42, y: LOT * 0.72 - GH };
  }

  function propPoint() {
    return { x: LOT * 0.38, y: LOT * 0.42 };
  }

  function meetPoint(dir) {
    var pad = 24;
    var p = { x: LOT * 0.5 - GW * 0.5, y: LOT * 0.62 };
    if (dir[0] === 1) p.x = LOT - pad - GW;
    if (dir[0] === -1) p.x = pad;
    if (dir[1] === 1) p.y = pad;
    if (dir[1] === -1) p.y = LOT - pad - GH;
    return p;
  }

  function makeActor(d, room) {
    var gate = gatePoint();
    var stand = standPoint(room);
    return {
      id: d.id,
      kind: d.kind,
      x: d.x,
      y: d.y,
      px: gate.x,
      py: gate.y,
      tx: stand.x,
      ty: stand.y,
      state: "enter",
      face: 1,
      hold: 0,
      enterLeft: 0.4,
      meetWith: null,
      meetDir: null,
    };
  }

  function reset() {
    actors = {};
    seed = 0x6a09e667;
    forceMeet = parseMeet();
    last = 0;
    frame = 0;
  }

  function enter(id) {
    var s = T.getState();
    if (!s) return;
    var d = T.denizen(s, id);
    if (!d || d.x == null) return;
    var c = T.cell(s, d.x, d.y);
    actors[id] = makeActor(d, c && c.room);
  }

  function sync(s, lotSize) {
    if (lotSize) LOT = lotSize;
    var live = {};
    s.denizens.forEach(function (d) {
      if (d.x == null) return;
      live[d.id] = true;
      var a = actors[d.id];
      if (!a) {
        var c = T.cell(s, d.x, d.y);
        actors[d.id] = makeActor(d, c && c.room);
        return;
      }
      if (a.x !== d.x || a.y !== d.y) {
        var c2 = T.cell(s, d.x, d.y);
        actors[d.id] = makeActor(d, c2 && c2.room);
      }
      a.kind = d.kind;
    });
    Object.keys(actors).forEach(function (id) {
      if (!live[id]) delete actors[id];
    });
  }

  function lotOnscreen(x, y, cam, wrap, bounds) {
    if (!cam || !wrap || !bounds) return true;
    var z = cam.z || 1;
    var left = cam.x + (x - bounds.minX) * LOT * z;
    var top = cam.y + (bounds.maxY - y) * LOT * z;
    var size = LOT * z;
    return left < wrap.w && left + size > 0 && top < wrap.h && top + size > 0;
  }

  function nourishPairs(s, d) {
    var out = [];
    if (d.x == null) return out;
    var w = T.neighborWeather(s, d.x, d.y);
    if (w.nourish <= 0 && !forceMeet) return out;
    [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(function (dir) {
      var n = T.cell(s, d.x + dir[0], d.y + dir[1]);
      if (!n || !n.denizen) return;
      if (!forceMeet && w.nourish <= 0) return;
      out.push({ id: n.denizen, dir: dir });
    });
    return out;
  }

  function startWalk(a, room) {
    var pad = walkPad(room);
    a.state = "walk";
    a.tx = pad + rng() * (LOT - pad * 2 - GW);
    a.ty = pad + rng() * (LOT - pad * 2 - GH);
    a.hold = 0;
  }

  function startInteract(a) {
    var p = propPoint();
    a.state = "walk";
    a.tx = p.x;
    a.ty = p.y;
    a.hold = 0;
    a.after = "interact";
  }

  function startSit(a) {
    var p = rugPoint();
    a.state = "walk";
    a.tx = p.x;
    a.ty = p.y;
    a.hold = 0;
    a.after = "sit";
  }

  function startMeet(a, partner, dir, s) {
    var p = meetPoint(dir);
    a.state = "walk";
    a.tx = p.x;
    a.ty = p.y;
    a.after = "meet";
    a.meetWith = partner;
    a.meetDir = dir;
    a.face = dir[0] !== 0 ? dir[0] : a.face;
    var other = actors[partner];
    var od = T.denizen(s, partner);
    if (other && od && od.x != null) {
      var back = meetPoint([-dir[0], -dir[1]]);
      other.state = "walk";
      other.tx = back.x;
      other.ty = back.y;
      other.after = "meet";
      other.meetWith = a.id;
      other.meetDir = [-dir[0], -dir[1]];
      other.face = -dir[0] || other.face;
    }
    forceMeet = parseMeet();
  }

  function pickNext(a, s, d, room) {
    a.after = null;
    var pairs = nourishPairs(s, d);
    if ((forceMeet || rng() < 0.08) && pairs.length) {
      var pick = pairs[Math.floor(rng() * pairs.length)];
      startMeet(a, pick.id, pick.dir, s);
      return;
    }
    if (forceMeet) {
      var dirs = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ];
      var dir = dirs[Math.floor(rng() * 4)];
      for (var di = 0; di < 4; di++) {
        var ncell = T.cell(s, d.x + dirs[di][0], d.y + dirs[di][1]);
        if (ncell && ncell.room) {
          dir = dirs[di];
          break;
        }
      }
      var mp = meetPoint(dir);
      a.state = "walk";
      a.tx = mp.x;
      a.ty = mp.y;
      a.after = "meet";
      a.face = dir[0] || a.face;
      forceMeet = parseMeet();
      return;
    }
    var c = T.cell(s, d.x, d.y);
    var home = c && T.yieldMult(s, d, c).home;
    if (d.stage >= 1 && home && rng() < 0.28) {
      startSit(a);
      return;
    }
    if (rng() < 0.35) {
      startInteract(a);
      return;
    }
    startWalk(a, room);
  }

  function stepToward(a, dt) {
    var dx = a.tx - a.px;
    var dy = a.ty - a.py;
    var dist = Math.hypot(dx, dy);
    var spd = 56 * dt;
    if (dist <= spd || dist < 0.8) {
      a.px = a.tx;
      a.py = a.ty;
      return true;
    }
    a.px += (dx / dist) * spd;
    a.py += (dy / dist) * spd;
    if (dx) a.face = dx < 0 ? -1 : 1;
    return false;
  }

  function step(s, lotSize, now, cam, wrap, bounds) {
    if (lotSize) LOT = lotSize;
    if (!last) last = now;
    if (now - last < 125) return false;
    var dt = Math.min(0.25, (now - last) / 1000);
    last = now;
    frame++;
    if (parseMeet()) forceMeet = true;

    s.denizens.forEach(function (d) {
      if (d.x == null) return;
      var a = actors[d.id];
      if (!a) return;
      if (!lotOnscreen(d.x, d.y, cam, wrap, bounds)) return;
      var c = T.cell(s, d.x, d.y);
      var room = c && c.room;
      if (a.state === "enter") {
        var t = a.enterLeft / 0.4;
        var gate = gatePoint();
        var stand = standPoint(room);
        var u = 1 - Math.max(0, t);
        a.px = gate.x + (stand.x - gate.x) * u;
        a.py = gate.y + (stand.y - gate.y) * u;
        a.enterLeft -= dt;
        if (a.enterLeft <= 0) {
          a.px = stand.x;
          a.py = stand.y;
          a.state = "idle";
          a.hold = 0.6 + rng() * 1.4;
        }
        clampWalk(a, room);
        return;
      }
      if (a.state === "walk") {
        if (stepToward(a, dt)) {
          if (a.after === "interact") {
            a.state = "interact";
            a.hold = 1.2 + rng() * 1.2;
          } else if (a.after === "sit") {
            a.state = "sit";
            a.hold = 2 + rng() * 2;
          } else if (a.after === "meet") {
            a.state = "meet";
            a.hold = 1.6 + rng() * 0.8;
          } else {
            a.state = "idle";
            a.hold = 0.8 + rng() * 1.8;
          }
          a.after = null;
        }
        clampWalk(a, room);
        return;
      }
      a.hold -= dt;
      if (a.hold <= 0) pickNext(a, s, d, room);
      clampWalk(a, room);
    });
    return true;
  }

  function scratch() {
    if (!tmp) {
      tmp = document.createElement("canvas");
      tmp.width = 28;
      tmp.height = 28;
    }
    return tmp;
  }

  function lotOrigin(x, y, bounds) {
    return {
      left: (x - bounds.minX) * LOT,
      top: (bounds.maxY - y) * LOT,
    };
  }

  function paint(ctx, bounds, cam, wrap) {
    if (!ctx) return;
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    var S = G.THSprites;
    var buf = scratch();
    Object.keys(actors).forEach(function (id) {
      var a = actors[id];
      if (!lotOnscreen(a.x, a.y, cam, wrap, bounds)) return;
      var o = lotOrigin(a.x, a.y, bounds);
      S.paintGuest(buf, a.kind, frame, { flip: a.face < 0, sit: a.state === "sit" });
      ctx.drawImage(buf, Math.round(o.left + a.px), Math.round(o.top + a.py));
    });
  }

  function hitTest(px, py, bounds) {
    var ids = Object.keys(actors);
    for (var i = ids.length - 1; i >= 0; i--) {
      var a = actors[ids[i]];
      var o = lotOrigin(a.x, a.y, bounds);
      var x = o.left + a.px;
      var y = o.top + a.py;
      if (px >= x - 4 && px <= x + GW + 4 && py >= y - 4 && py <= y + GH + 4) return a;
    }
    return null;
  }

  function get(id) {
    return actors[id] || null;
  }

  reset();

  G.THWander = {
    reset: reset,
    sync: sync,
    step: step,
    paint: paint,
    enter: enter,
    hitTest: hitTest,
    get: get,
    each: function (fn) {
      Object.keys(actors).forEach(function (id) {
        fn(actors[id]);
      });
    },
  };
})(window);
