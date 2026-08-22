/* Typehouse sim — locked yield, grid, save, events. */
(function (G) {
  const D = G.THData;
  var state = null;
  var acc = 0;

  function now() {
    return Date.now();
  }

  function key(x, y) {
    return x + "," + y;
  }

  function parseQS() {
    var q = {};
    if (typeof location === "undefined") return q;
    var s = location.search.replace(/^\?/, "");
    if (!s) return q;
    s.split("&").forEach(function (pair) {
      var p = pair.split("=");
      q[decodeURIComponent(p[0])] = decodeURIComponent(p[1] || "1");
    });
    return q;
  }

  function emptyCell(x, y) {
    return {
      x: x,
      y: y,
      room: null,
      level: 1,
      denizen: null,
      haunted: false,
      leaking: false,
      unpowered: false,
    };
  }

  function makeGrid(w, h) {
    var cells = {};
    for (var y = 0; y < h; y++) {
      for (var x = 0; x < w; x++) cells[key(x, y)] = emptyCell(x, y);
    }
    return cells;
  }

  function cell(s, x, y) {
    return s.cells[key(x, y)] || null;
  }

  function fresh() {
    var t = now();
    var s = {
      v: 2,
      tally: 12,
      scrap: 6,
      dust: 0,
      lifetimeTally: 0,
      openSec: 0,
      lastSeen: t,
      gridW: 3,
      gridH: 2,
      lotsBought: 0,
      cells: makeGrid(3, 2),
      denizens: [],
      flags: {},
      unlocks: { hearth: true },
      onboard: 0,
      pendingEvent: null,
      queuedEvent: null,
      recap: null,
      nextArrival: D.ARRIVE_FAST,
      nextEvent: D.EVENT_EVERY,
      sootDue: true,
      blotter: "The night desk is open.",
      toast: null,
      pips: [],
      weather: null,
      silentUntil: 0,
      bathUntil: 0,
    };
    var lobby = cell(s, 1, 0);
    lobby.room = "lobby";
    lobby.level = 1;
    s.denizens.push({
      id: "Wicknoll",
      kind: "Wicknoll",
      stage: 0,
      progress: 0,
      x: null,
      y: null,
      exhaustedUntil: 0,
    });
    return s;
  }

  function waiting(s) {
    return s.denizens.filter(function (d) {
      return d.x == null;
    });
  }

  function denizen(s, id) {
    for (var i = 0; i < s.denizens.length; i++) {
      if (s.denizens[i].id === id) return s.denizens[i];
    }
    return null;
  }

  function roomCount(s) {
    var n = 0;
    eachCell(s, function (c) {
      if (c.room && c.room !== "lobby") n++;
    });
    return n;
  }

  function eachCell(s, fn) {
    Object.keys(s.cells).forEach(function (k) {
      fn(s.cells[k]);
    });
  }

  function roomsOf(s, kind) {
    var out = [];
    eachCell(s, function (c) {
      if (c.room === kind) out.push(c);
    });
    return out;
  }

  function hasKind(s, kind) {
    return s.denizens.some(function (d) {
      return d.kind === kind;
    });
  }

  function laterOpen(s) {
    return roomCount(s) >= 5 || s.lifetimeTally >= 200;
  }

  function canUnlock(s, kind) {
    var def = D.ROOMS[kind];
    if (!def || def.unbuildable) return false;
    if (kind === "hearth") return true;
    if (kind === "cistern" || kind === "conservatory") return !!s.flags.sootDone;
    if (kind === "dynamo") return s.lifetimeTally >= 40 || s.openSec >= 180;
    if (kind === "dormer" || kind === "scullery") return roomCount(s) >= 4;
    if (kind === "vitrine") return roomCount(s) >= 6 || s.lifetimeTally >= 200;
    if (kind === "transom") return roomCount(s) >= 3;
    if (kind === "larder") return roomCount(s) >= 5 && roomsOf(s, "larder").length === 0;
    return false;
  }

  function canPay(s, cost) {
    return s.tally >= (cost.tally || 0) && s.scrap >= (cost.scrap || 0) && s.dust >= (cost.dust || 0);
  }

  function pay(s, cost) {
    if (!canPay(s, cost)) return false;
    s.tally -= cost.tally || 0;
    s.scrap -= cost.scrap || 0;
    s.dust -= cost.dust || 0;
    return true;
  }

  function add(s, res, n) {
    if (!n) return;
    s[res] += n;
    if (s[res] < 0) s[res] = 0;
    if (res === "tally" && n > 0) s.lifetimeTally += n;
  }

  function defOf(d) {
    return D.DENIZENS[d.kind];
  }

  function isHome(d, c) {
    if (!c || !c.room) return false;
    var def = defOf(d);
    return def.wants.indexOf(c.room) !== -1;
  }

  function dirs() {
    return [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];
  }

  function ownedCount(s) {
    return Object.keys(s.cells).length;
  }

  function syncGrid(s) {
    var minX = Infinity;
    var minY = Infinity;
    var maxX = -Infinity;
    var maxY = -Infinity;
    eachCell(s, function (c) {
      if (c.x < minX) minX = c.x;
      if (c.y < minY) minY = c.y;
      if (c.x > maxX) maxX = c.x;
      if (c.y > maxY) maxY = c.y;
    });
    if (minX === Infinity) {
      s.gridW = 3;
      s.gridH = 2;
      return;
    }
    s.gridW = maxX - minX + 1;
    s.gridH = maxY - minY + 1;
  }

  function fogOf(s) {
    var out = [];
    var seen = {};
    eachCell(s, function (c) {
      dirs().forEach(function (dir) {
        var x = c.x + dir[0];
        var y = c.y + dir[1];
        var k = key(x, y);
        if (s.cells[k] || seen[k]) return;
        seen[k] = true;
        out.push({ x: x, y: y });
      });
    });
    return out;
  }

  function ownedBounds(s) {
    var minX = Infinity;
    var minY = Infinity;
    var maxX = -Infinity;
    var maxY = -Infinity;
    eachCell(s, function (c) {
      if (c.x < minX) minX = c.x;
      if (c.y < minY) minY = c.y;
      if (c.x > maxX) maxX = c.x;
      if (c.y > maxY) maxY = c.y;
    });
    if (minX === Infinity) return { minX: 0, minY: 0, maxX: 2, maxY: 1, w: 3, h: 2 };
    return { minX: minX, minY: minY, maxX: maxX, maxY: maxY, w: maxX - minX + 1, h: maxY - minY + 1 };
  }

  function parkBounds(s) {
    var minX = Infinity;
    var minY = Infinity;
    var maxX = -Infinity;
    var maxY = -Infinity;
    function acc(x, y) {
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
    eachCell(s, function (c) {
      acc(c.x, c.y);
    });
    fogOf(s).forEach(function (f) {
      acc(f.x, f.y);
    });
    if (minX === Infinity) return { minX: 0, minY: 0, maxX: 2, maxY: 1, w: 3, h: 2 };
    return { minX: minX, minY: minY, maxX: maxX, maxY: maxY, w: maxX - minX + 1, h: maxY - minY + 1 };
  }

  function isFenced(room) {
    return !!(room && room !== "lobby" && room !== "larder" && room !== "transom");
  }

  function buyUnlocked(s) {
    var w = denizen(s, "Wicknoll");
    if (!w || w.x == null) return false;
    var c = cell(s, w.x, w.y);
    return !!(c && c.room === "hearth");
  }

  function buyGeometry(s, x, y) {
    if (cell(s, x, y)) return "Already owned.";
    var adj = false;
    dirs().forEach(function (dir) {
      if (cell(s, x + dir[0], y + dir[1])) adj = true;
    });
    if (!adj) return "Only adjacent fog.";
    var minX = x;
    var minY = y;
    var maxX = x;
    var maxY = y;
    eachCell(s, function (c) {
      if (c.x < minX) minX = c.x;
      if (c.y < minY) minY = c.y;
      if (c.x > maxX) maxX = c.x;
      if (c.y > maxY) maxY = c.y;
    });
    if (maxX - minX + 1 > 6) return "The park will not stretch that wide.";
    if (maxY - minY + 1 > 4) return "The park will not stretch that far.";
    return "ok";
  }

  function buyLot(s, x, y) {
    if (!buyUnlocked(s)) return "Seat Wicknoll in Ember Grounds first.";
    if (ownedCount(s) >= 16) return "Sixteen lots is the fence.";
    var geo = buyGeometry(s, x, y);
    if (geo !== "ok") return geo;
    var cost = D.lotCost(s.lotsBought || 0);
    if (!canPay(s, cost)) return "The desk refuses the receipt.";
    pay(s, cost);
    s.cells[key(x, y)] = emptyCell(x, y);
    s.lotsBought = (s.lotsBought || 0) + 1;
    syncGrid(s);
    blot(s, "The fog lifts.");
    toast(s, "New grounds.");
    return "ok";
  }

  function grantLot(s, x, y) {
    if (cell(s, x, y)) return false;
    if (buyGeometry(s, x, y) !== "ok") return false;
    if (ownedCount(s) >= 16) return false;
    s.cells[key(x, y)] = emptyCell(x, y);
    s.lotsBought = (s.lotsBought || 0) + 1;
    syncGrid(s);
    return true;
  }

  function migrateV1(s) {
    if (!s) return s;
    if (s.v === 1) {
      s.v = 2;
      if (s.lotsBought == null) s.lotsBought = Math.max(0, Object.keys(s.cells).length - 6);
      delete s.expandRow;
      delete s.expandCol;
    }
    if (s.v !== 2) s.v = 2;
    if (s.lotsBought == null) s.lotsBought = Math.max(0, Object.keys(s.cells).length - 6);
    if (!s.flags) s.flags = {};
    if (!s.unlocks) s.unlocks = { hearth: true };
    syncGrid(s);
    return s;
  }

  function neighborWeather(s, x, y) {
    var nourish = 0;
    var friction = 0;
    var larder = false;
    var c0 = cell(s, x, y);
    var d = c0 && c0.denizen ? denizen(s, c0.denizen) : null;
    if (!d) return { nourish: 0, friction: 0, larder: false };
    var types = defOf(d).types;
    dirs().forEach(function (dir) {
      var n = cell(s, x + dir[0], y + dir[1]);
      if (!n || !n.room) return;
      var scored = scoreEdge(types, n.room);
      nourish += scored.nourish;
      friction += scored.friction;
      if (n.room === "larder") larder = true;
      if (n.room === "transom") {
        var f = cell(s, x + dir[0] * 2, y + dir[1] * 2);
        if (f && f.room) {
          var far = scoreEdge(types, f.room);
          nourish += far.nourish * 0.5;
          friction += far.friction * 0.5;
          if (f.room === "larder") larder = true;
        }
      }
    });
    return { nourish: nourish, friction: friction, larder: larder };
  }

  function scoreEdge(types, roomId) {
    var rt = D.ROOMS[roomId] ? D.ROOMS[roomId].type : "none";
    var bestN = 0;
    var worstF = 0;
    types.forEach(function (t) {
      if (D.presses(t, rt)) bestN = 1;
      if (D.presses(rt, t)) worstF = 1;
    });
    return { nourish: bestN, friction: worstF };
  }

  function sparkUnpowered(s, d, c) {
    if (defOf(d).types.indexOf("spark") === -1) return false;
    if (c.unpowered) return true;
    if (s.flags.fuseFamine && s.flags.fuseFamine > s.openSec) return true;
    return false;
  }

  function yieldMult(s, d, c) {
    if (!d || !c || !c.room || c.room === "lobby" || c.room === "larder") {
      return { m: 0, home: false, nourish: 0, friction: 0, larder: false };
    }
    if (d.exhaustedUntil && d.exhaustedUntil > s.openSec) {
      return { m: 0, home: isHome(d, c), nourish: 0, friction: 0, larder: false, exhausted: true };
    }
    if (s.silentUntil && s.silentUntil > s.openSec) {
      return { m: 0, home: isHome(d, c), nourish: 0, friction: 0, larder: false, silent: true };
    }
    var w = neighborWeather(s, c.x, c.y);
    var home = isHome(d, c);
    var m = home ? 1.5 : 0.7;
    m *= 1 + 0.2 * w.nourish;
    m *= Math.pow(0.85, w.friction);
    if (w.larder) m *= 1.1;
    if (c.leaking) m *= 0.7;
    if (c.haunted) m *= defOf(d).types.indexOf("hush") !== -1 ? 1.25 : 0.8;
    if (sparkUnpowered(s, d, c)) m *= 0.25;
    m *= D.LEVEL_YIELD[c.level] || 1;
    m *= D.STAGE_YIELD[d.stage] || 1;
    if (s.bathUntil && s.bathUntil > s.openSec) m *= 1.1;
    if (m < 0.35) m = 0.35;
    if (m > 4) m = 4;
    return { m: m, home: home, nourish: w.nourish, friction: w.friction, larder: w.larder };
  }

  function ratesFor(s, d) {
    var zero = { tally: 0, scrap: 0, dust: 0, info: { m: 0, home: false, nourish: 0, friction: 0 } };
    if (!d || d.x == null) return zero;
    var c = cell(s, d.x, d.y);
    if (!c) return zero;
    var info = yieldMult(s, d, c);
    var base = defOf(d).yield;
    var out = { tally: 0, scrap: 0, dust: 0, info: info };
    Object.keys(base).forEach(function (res) {
      out[res] = base[res] * info.m;
    });
    return out;
  }

  function sumYield(s) {
    var bag = { tally: 0, scrap: 0, dust: 0 };
    s.denizens.forEach(function (d) {
      var r = ratesFor(s, d);
      bag.tally += r.tally;
      bag.scrap += r.scrap;
      bag.dust += r.dust;
    });
    return bag;
  }

  function stageDelta(s, d, away) {
    if (d.x == null) return 0;
    var c = cell(s, d.x, d.y);
    if (!c || !c.room || c.room === "lobby" || c.room === "larder") return 0;
    var w = neighborWeather(s, c.x, c.y);
    var home = isHome(d, c);
    var delta = 1;
    delta *= home ? 1 : 0.25;
    delta *= 1 + 0.35 * w.nourish;
    if (w.friction > 0) delta *= 0.6;
    if (c.level >= 2) delta *= 1.15;
    if (w.larder) delta *= 1.1;
    if (away) delta *= 0.25;
    return delta;
  }

  function applyRates(s, secs, tax) {
    tax = tax == null ? 1 : tax;
    var bag = sumYield(s);
    add(s, "tally", bag.tally * secs * tax);
    add(s, "scrap", bag.scrap * secs * tax);
    add(s, "dust", bag.dust * secs * tax);
    return {
      tally: bag.tally * secs * tax,
      scrap: bag.scrap * secs * tax,
      dust: bag.dust * secs * tax,
    };
  }

  function stepStages(s, secs, away) {
    var ups = [];
    s.denizens.forEach(function (d) {
      if (d.stage >= 3) return;
      d.progress += stageDelta(s, d, away) * secs;
      while (d.stage < 3 && d.progress >= D.STAGE_NEED) {
        d.progress -= D.STAGE_NEED;
        d.stage += 1;
        ups.push(d.kind + " is now " + D.STAGES[d.stage] + ".");
      }
    });
    return ups;
  }

  function blot(s, text) {
    s.blotter = text;
  }

  function toast(s, text) {
    s.toast = { text: text, until: s.openSec + 3 };
  }

  function pip(s, x, y, res, amt) {
    if (amt <= 0) return;
    s.pips.push({ id: "p" + s.openSec + "-" + s.pips.length, x: x, y: y, res: res, amt: amt, t: s.openSec });
    if (s.pips.length > 20) s.pips.shift();
  }

  function arrive(s) {
    if (waiting(s).length >= 4) return null;
    var exist = {};
    s.denizens.forEach(function (d) {
      exist[d.kind] = true;
    });
    var pool = D.MVP_ORDER.filter(function (id) {
      return !exist[id];
    });
    if (laterOpen(s)) {
      pool = pool.concat(
        D.LATER_ORDER.filter(function (id) {
          return !exist[id];
        })
      );
    }
    if (!pool.length) return null;
    var kind = pool[Math.floor(Math.random() * pool.length)];
    s.denizens.push({
      id: kind,
      kind: kind,
      stage: 0,
      progress: 0,
      x: null,
      y: null,
      exhaustedUntil: 0,
    });
    blot(s, kind + " waits at the Gatehouse.");
    toast(s, kind + " in the void.");
    return kind;
  }

  function eventById(id) {
    for (var i = 0; i < D.EVENTS.length; i++) {
      if (D.EVENTS[i].id === id) return D.EVENTS[i];
    }
    return null;
  }

  function canFire(s, ev) {
    if (!ev) return false;
    var id = ev.id;
    if (id === "evt_soot_handshake") return !!s.sootDue && !s.flags.sootDone;
    if (id === "evt_leak_blotter") return roomsOf(s, "cistern").length > 0 || roomCount(s) >= 2;
    if (id === "evt_dry_inspector") return roomCount(s) >= 2 && s.openSec >= 80;
    if (id === "evt_type_bath") return roomsOf(s, "cistern").length > 0;
    if (id === "evt_haunted_sash") return roomCount(s) >= 2;
    if (id === "evt_fuse_famine") return roomsOf(s, "dynamo").length > 0 || hasKind(s, "Zitterplug");
    if (id === "evt_quiet_contest") return s.openSec >= 70;
    if (id === "evt_parade_speck") return hasKind(s, "Specktin") || roomCount(s) >= 4 || s.lifetimeTally >= 80;
    if (id === "uninvited_coat") return roomCount(s) >= 1;
    if (id === "moss_union") return roomsOf(s, "conservatory").length > 0 || hasKind(s, "Ledgerfrond");
    if (id === "rust_wedding") return roomsOf(s, "scullery").length > 0 || hasKind(s, "Flakesmith");
    if (id === "draft_census") return roomsOf(s, "transom").length > 0 || roomCount(s) >= 3;
    if (id === "floorboard") return roomCount(s) >= 1;
    if (id === "button_hoard") return s.openSec >= 40;
    if (id === "indoor_weather") return roomCount(s) >= 2;
    if (id === "ash_mail") return roomsOf(s, "hearth").length > 0;
    if (id === "bulb_famine") return roomCount(s) >= 2;
    if (id === "nest_claim") return s.denizens.length >= 2 && roomCount(s) >= 1;
    if (id === "tarnish_banquet") return roomsOf(s, "scullery").length > 0 || roomCount(s) >= 4;
    if (id === "crossbreeze_theft") return roomsOf(s, "transom").length > 0 || s.openSec >= 90;
    return true;
  }

  function pickEvent(s, forceRare) {
    var roll = Math.random();
    var rarity = forceRare ? "rare" : roll < 0.08 ? "rare" : roll < 0.3 ? "common" : null;
    if (!rarity) return null;
    var bag = D.EVENTS.filter(function (ev) {
      return ev.rarity === rarity && ev.id !== "evt_soot_handshake" && canFire(s, ev);
    });
    if (!bag.length) {
      bag = D.EVENTS.filter(function (ev) {
        return ev.rarity === "common" && ev.id !== "evt_soot_handshake" && canFire(s, ev);
      });
    }
    if (!bag.length) return null;
    return bag[Math.floor(Math.random() * bag.length)];
  }

  function queueEvent(s, ev) {
    if (!ev || s.pendingEvent) return false;
    s.pendingEvent = { id: ev.id, title: ev.title, body: ev.body, choices: ev.choices };
    return true;
  }

  function applyChoice(s, evId, choiceId) {
    var msg = "The blotter takes a note.";
    if (evId === "evt_soot_handshake") {
      s.flags.sootDone = true;
      s.sootDue = false;
      s.unlocks.cistern = true;
      s.unlocks.conservatory = true;
      if (choiceId === "keep") {
        add(s, "dust", 1);
        msg = "We keep the soot. Hush-dust: 1. Tide Basin and Moss Plot unlatch.";
      } else {
        add(s, "tally", 3);
        msg = "The grate shines. Tide Basin and Moss Plot unlatch anyway.";
      }
      blot(s, "The grounds will take water and leaf now.");
    } else if (evId === "evt_leak_blotter") {
      if (choiceId === "mop") {
        add(s, "scrap", 2);
        msg = "Two scrap in the rag. The blotter is only paper again.";
      } else {
        var c = roomsOf(s, "cistern")[0] || roomsOf(s, "hearth")[0];
        if (c) c.leaking = true;
        add(s, "tally", 4);
        msg = "The leak signs its name. A habitat drips ember. Four tally for the autograph.";
      }
    } else if (evId === "evt_dry_inspector") {
      var rooms = roomCount(s);
      var seated = s.denizens.filter(function (d) {
        return d.x != null;
      }).length;
      var grade = rooms + seated >= 6 ? "A" : rooms >= 3 ? "B" : "C";
      s.flags.grade = grade;
      if (choiceId === "tour") {
        if (grade === "A" || grade === "B") {
          add(s, "tally", grade === "A" ? 18 : 10);
          msg = "Grade " + grade + ". They leave tally like an apology.";
        } else {
          add(s, "tally", -6);
          msg = "Grade C. Tax: 6 tally. The badge was real.";
        }
      } else {
        if (roomsOf(s, "dormer").length || hasKind(s, "Napwisp")) {
          add(s, "dust", 1);
          msg = "The kettle is hush enough. They leave dust on the saucer.";
        } else {
          add(s, "tally", -4);
          msg = "Tea without a Hush Loft. They fine the thirst.";
        }
      }
    } else if (evId === "evt_type_bath") {
      if (choiceId === "soak") {
        s.bathUntil = s.openSec + 90;
        msg = "A type loosens. Neighbors nourish easier for a minute and a half.";
      } else {
        add(s, "tally", 5);
        msg = "Towel, five tally, weather stays put.";
      }
    } else if (evId === "evt_haunted_sash") {
      if (choiceId === "leave") {
        var rooms2 = [];
        eachCell(s, function (c) {
          if (c.room && c.room !== "lobby" && !c.haunted) rooms2.push(c);
        });
        var h = rooms2[Math.floor(Math.random() * rooms2.length)];
        if (h) h.haunted = true;
        msg = h ? D.ROOMS[h.room].name + " wears a second name. Hush likes it." : "No sash would take the extra name.";
      } else if (pay(s, { tally: 0, scrap: 4, dust: 0 })) {
        msg = "Four scrap and a quiet window.";
      } else {
        msg = "Not enough scrap. The sash keeps the rumor.";
        var any = roomsOf(s, "hearth")[0];
        if (any) any.haunted = true;
      }
    } else if (evId === "evt_fuse_famine") {
      if (choiceId === "ration") {
        s.flags.fuseFamine = s.openSec + 90;
        roomsOf(s, "dynamo").forEach(function (c) {
          c.unpowered = true;
        });
        add(s, "scrap", 3);
        msg = "Spark works at a quarter for 90s. Three scrap fall out of the fuse.";
      } else if (s.dust >= 1) {
        add(s, "dust", -1);
        add(s, "tally", 6);
        s.flags.fuseFamine = 0;
        roomsOf(s, "dynamo").forEach(function (c) {
          c.unpowered = false;
        });
        msg = "Dust in the contacts. Six tally, lights stay.";
      } else {
        s.flags.fuseFamine = s.openSec + 60;
        roomsOf(s, "dynamo").forEach(function (c) {
          c.unpowered = true;
        });
        msg = "No dust. The Spark Pen goes dim on its own.";
      }
    } else if (evId === "evt_quiet_contest") {
      if (choiceId === "honor") {
        s.silentUntil = s.openSec + 45;
        s.flags.quietJackpot = s.openSec + 45;
        msg = "No yield for 45s. Then hush-dust. Do not jingle the lamps.";
      } else {
        add(s, "tally", 5);
        msg = "Five tally and a little shame. The quiet files us.";
      }
    } else if (evId === "evt_parade_speck") {
      if (choiceId === "open") {
        add(s, "tally", 24);
        var victim =
          s.denizens.filter(function (d) {
            return defOf(d).types.indexOf("gleam") !== -1;
          })[0] || s.denizens[0];
        if (victim) victim.exhaustedUntil = s.openSec + 60;
        msg = "Twenty-four tally. " + (victim ? victim.kind : "Someone") + " needs the dark.";
      } else {
        add(s, "tally", 8);
        add(s, "dust", 1);
        msg = "A smaller parade. We keep a little night.";
      }
    } else if (evId === "uninvited_coat") {
      if (choiceId === "hang") {
        add(s, "scrap", 1);
        s.flags.hint = D.HINTS[0];
        msg = "The peg accepts it. Hint: " + s.flags.hint;
      } else {
        add(s, "tally", 3);
        msg = "The coat leaves. Three tally hide in a pocket it forgot.";
      }
    } else if (evId === "moss_union") {
      if (choiceId === "recognize") {
        s.flags.mossUnion = true;
        add(s, "scrap", 3);
        msg = "Recognized. Three scrap like dues.";
      } else {
        add(s, "tally", 6);
        s.flags.mossSulk = s.openSec + 80;
        msg = "Six tally. Moss plots take the minutes personally.";
      }
    } else if (evId === "rust_wedding") {
      if (choiceId === "lid") {
        add(s, "scrap", 4);
        msg = "A lid changes hands. Four scrap, one household.";
      } else {
        add(s, "tally", 10);
        msg = "We charge a fee. Ten tally. The pans will remember the clerk.";
      }
    } else if (evId === "draft_census") {
      if (choiceId === "window") {
        s.weather = { type: "draft", until: s.openSec + 90 };
        msg = "A window stays honest. Draft walks the lanes for 90s.";
      } else {
        add(s, "scrap", 2);
        msg = "Books closed. Two scrap for the trouble of counting.";
      }
    } else if (evId === "floorboard") {
      if (choiceId === "pry") {
        add(s, "scrap", 3);
        msg = "Three scrap and a colder toe.";
      } else {
        add(s, "tally", 4);
        msg = "Nailed. Four tally for not listening.";
      }
    } else if (evId === "button_hoard") {
      if (choiceId === "keep") {
        add(s, "dust", 1);
        msg = "The cup keeps its religion. One hush-dust.";
      } else {
        add(s, "tally", 8);
        msg = "Eight tally. The cup is just a cup again.";
      }
    } else if (evId === "indoor_weather") {
      if (choiceId === "curtains") {
        s.weather = { type: "ember", until: s.openSec + 80 };
        msg = "Indoor ember. The lamps lean in.";
      } else {
        add(s, "tally", 5);
        var leak = roomsOf(s, "hearth")[0] || roomsOf(s, "transom")[0];
        if (leak) leak.leaking = true;
        msg = "Sashes open. Five tally and a leak.";
      }
    } else if (evId === "ash_mail") {
      if (choiceId === "read") {
        s.flags.hint = D.HINTS[Math.floor(Math.random() * D.HINTS.length)];
        msg = s.flags.hint;
      } else {
        add(s, "tally", 4);
        msg = "We burn the mail. Four tally in the grate.";
      }
    } else if (evId === "bulb_famine") {
      if (choiceId === "dim") {
        s.weather = { type: "hush", until: s.openSec + 70 };
        add(s, "dust", 0.5);
        msg = "The grounds go hush-colored. Half a dust on the glass.";
      } else if (pay(s, { tally: 4, scrap: 0, dust: 0 })) {
        add(s, "scrap", 2);
        msg = "A wick for four tally. Two scrap change.";
      } else {
        msg = "Cannot afford a wick. We sit in honest dark.";
      }
    } else if (evId === "nest_claim") {
      var seatedRoom = null;
      eachCell(s, function (c) {
        if (c.room && c.room !== "lobby" && c.room !== "larder" && !seatedRoom) seatedRoom = c;
      });
      if (choiceId === "older") {
        var older = s.denizens.slice().sort(function (a, b) {
          return b.stage - a.stage;
        })[0];
        if (older && seatedRoom) {
          place(s, older.id, seatedRoom.x, seatedRoom.y, true);
          msg = older.kind + " takes the habitat. The other learns hallway.";
        } else msg = "No habitat would have them.";
      } else {
        s.flags.owedRoom = true;
        add(s, "tally", 3);
        msg = "A promise and three tally. The blotter writes OWE GROUNDS.";
      }
    } else if (evId === "tarnish_banquet") {
      if (choiceId === "serve") {
        add(s, "scrap", 6);
        var sc = roomsOf(s, "scullery")[0];
        if (sc) sc.leaking = true;
        msg = "Six scrap. The Rust Yard is a little worse and a little richer.";
      } else {
        add(s, "tally", 8);
        msg = "Door locked. Eight tally, no plates.";
      }
    } else if (evId === "crossbreeze_theft") {
      if (choiceId === "chase") {
        add(s, "tally", 5);
        msg = "We catch five tally in a curtain.";
      } else {
        add(s, "dust", 1);
        add(s, "tally", -3);
        msg = "It leaves. We keep a dust and lose three tally to weather.";
      }
    }
    s.flags["chose:" + evId] = choiceId;
    blot(s, msg);
    toast(s, msg);
    return msg;
  }

  function resolveEvent(s, index) {
    if (!s.pendingEvent) return "";
    var ev = s.pendingEvent;
    var choice = ev.choices[index] || ev.choices[0];
    s.pendingEvent = null;
    return applyChoice(s, ev.id, choice.id);
  }

  function stepSecond(s, away) {
    s.openSec += 1;
    if (s.toast && s.toast.until < s.openSec) s.toast = null;
    if (s.weather && s.weather.until < s.openSec) s.weather = null;
    if (s.flags.fuseFamine && s.flags.fuseFamine < s.openSec) {
      s.flags.fuseFamine = 0;
      roomsOf(s, "dynamo").forEach(function (c) {
        c.unpowered = false;
      });
    }
    if (s.flags.quietJackpot && s.openSec >= s.flags.quietJackpot) {
      add(s, "dust", 2);
      s.flags.quietJackpot = 0;
      blot(s, "The quiet pays: two hush-dust on the desk.");
      toast(s, "Hush-dust beads on the blotter.");
    }

    if (!away) {
      var gained = applyRates(s, 1, 1);
      eachCell(s, function (c) {
        if (!c.denizen) return;
        if (gained.tally > 0) pip(s, c.x, c.y, "tally", ratesFor(s, denizen(s, c.denizen)).tally);
      });
      stepStages(s, 1, false);

      if (s.sootDue && !s.flags.sootDone && s.openSec >= D.SOOT_AT && !s.pendingEvent && denizen(s, "Wicknoll") && denizen(s, "Wicknoll").x != null) {
        queueEvent(s, eventById("evt_soot_handshake"));
      }

      if (s.openSec >= s.nextArrival) {
        var n = s.denizens.length;
        s.nextArrival = s.openSec + (n >= 6 ? D.ARRIVE_SLOW : D.ARRIVE_FAST);
        if (s.debugFast) s.nextArrival = s.openSec + 12;
        arrive(s);
      }

      if (s.flags.sootDone && s.openSec >= s.nextEvent && !s.pendingEvent) {
        s.nextEvent = s.openSec + D.EVENT_EVERY;
        var ev = pickEvent(s);
        if (ev) queueEvent(s, ev);
      }
    }
  }

  function catchUp(s, secs, away) {
    secs = Math.max(0, Math.min(D.AWAY_CAP, Math.floor(secs)));
    var before = { tally: s.tally, scrap: s.scrap, dust: s.dust };
    var stages = [];
    if (away) {
      var gained = applyRates(s, secs, D.AWAY_TAX);
      stages = stepStages(s, secs, true);
      s.openSec += secs;
      return {
        secs: secs,
        tally: s.tally - before.tally,
        scrap: s.scrap - before.scrap,
        dust: s.dust - before.dust,
        stages: stages,
        gained: gained,
      };
    }
    for (var i = 0; i < secs; i++) stepSecond(s, false);
    return {
      secs: secs,
      tally: s.tally - before.tally,
      scrap: s.scrap - before.scrap,
      dust: s.dust - before.dust,
      stages: stages,
    };
  }

  function applyAway(s, ms) {
    var secs = Math.floor(Math.min(D.AWAY_CAP, Math.max(0, ms / 1000)));
    var recap = catchUp(s, secs, true);
    recap.arrival = null;
    recap.roomWeird = null;
    recap.event = null;
    eachCell(s, function (c) {
      if (c.haunted || c.leaking) recap.roomWeird = (D.ROOMS[c.room] ? D.ROOMS[c.room].name : "A habitat") + (c.haunted ? " is twice-named." : " is leaking.");
    });
    if (secs >= D.RECAP_AFTER) {
      if (!s.pendingEvent) {
        var ev = pickEvent(s);
        if (ev) recap.event = ev;
      }
      s.recap = recap;
    }
    return recap;
  }

  function preferredHearthLot(s) {
    var prefer = [
      [1, 1],
      [0, 0],
      [2, 0],
      [0, 1],
      [2, 1],
      [1, -1],
    ];
    var i;
    var x;
    var y;
    var c;
    for (i = 0; i < prefer.length; i++) {
      x = prefer[i][0];
      y = prefer[i][1];
      c = cell(s, x, y);
      if (c && !c.room && Math.abs(x - 1) + Math.abs(y - 0) === 1) return { x: x, y: y };
    }
    return null;
  }

  function buildPreferredHearth(s) {
    var lot = preferredHearthLot(s);
    if (!lot) return "No empty lot beside the Gatehouse.";
    return build(s, lot.x, lot.y, "hearth");
  }

  function build(s, x, y, kind) {
    var c = cell(s, x, y);
    var def = D.ROOMS[kind];
    if (!c || !def) return "No such lot.";
    if (c.room) return "Already a habitat.";
    if (def.unbuildable) return "The Gatehouse is not built. It simply is.";
    if (kind === "larder" && roomsOf(s, "larder").length) return "One Tack Shed.";
    if (!canUnlock(s, kind)) return "The grounds are not ready for that.";
    if (kind !== "lobby" && roomCount(s) >= 12) return "Twelve habitats is enough for now.";
    if (s.onboard === 0 && kind !== "hearth") return "Build Ember Grounds first.";
    if (s.onboard === 0 && kind === "hearth") {
      var adjLobby = Math.abs(x - 1) + Math.abs(y - 0) === 1;
      if (!adjLobby) return "First Ember Grounds wants a lot beside the Gatehouse.";
    }
    if (!canPay(s, def.cost)) return "The desk refuses the receipt.";
    pay(s, def.cost);
    c.room = kind;
    c.level = 1;
    if (kind === "hearth" && s.onboard === 0) {
      s.onboard = 1;
      blot(s, "Ember Grounds is open. Seat Wicknoll.");
    }
    toast(s, def.name + " stands.");
    return "ok";
  }

  function upgrade(s, x, y) {
    var c = cell(s, x, y);
    if (!c || !c.room || c.room === "lobby") return "Nothing to raise.";
    if (c.level >= 3) return "Already as far along as a habitat gets.";
    var cost = D.UPGRADE[c.level + 1];
    if (!canPay(s, cost)) return "Not enough leftovers.";
    pay(s, cost);
    c.level += 1;
    if (c.denizen) {
      var d = denizen(s, c.denizen);
      if (d && d.stage < c.level - 1) d.stage = Math.min(3, c.level - 1);
    }
    blot(s, D.ROOMS[c.room].name + " is now level " + c.level + ".");
    return "ok";
  }

  function clearSeat(s, d) {
    if (d.x == null) return;
    var c = cell(s, d.x, d.y);
    if (c && c.denizen === d.id) c.denizen = null;
    d.x = null;
    d.y = null;
  }

  function place(s, id, x, y, force) {
    var d = denizen(s, id);
    var c = cell(s, x, y);
    if (!d || !c || !c.room) return "No seat there.";
    if (c.room === "larder") return "The Tack Shed does not sit anyone.";
    if (c.room === "lobby") return "Gatehouse is for waiting, not sitting.";
    if (c.haunted && defOf(d).types.indexOf("hush") === -1 && !force && Math.random() < 0.5) {
      return d.kind + " refuses the twice-named habitat.";
    }
    if (c.denizen && c.denizen !== id) {
      if (!force) return "That habitat is taken.";
      clearSeat(s, denizen(s, c.denizen));
    }
    clearSeat(s, d);
    c.denizen = d.id;
    d.x = x;
    d.y = y;
    if (d.kind === "Wicknoll" && s.onboard < 2) {
      s.onboard = 2;
      blot(s, "It sat down.");
    }
    return "ok";
  }

  function persistable(s) {
    var copy = JSON.parse(JSON.stringify(s));
    delete copy.toast;
    delete copy.pips;
    return copy;
  }

  function save(s) {
    try {
      s.lastSeen = now();
      localStorage.setItem(D.SAVE_KEY, JSON.stringify(persistable(s)));
    } catch (e) {}
  }

  function loadRaw() {
    try {
      var raw = localStorage.getItem(D.SAVE_KEY);
      if (!raw) return null;
      var s = JSON.parse(raw);
      if (!s || (s.v !== 1 && s.v !== 2) || typeof s.tally !== "number" || !s.cells) return null;
      if (!s.denizens || !s.denizens.length) return null;
      return migrateV1(s);
    } catch (e) {
      return null;
    }
  }

  function ensureLot(s, x, y) {
    if (cell(s, x, y)) return true;
    if (ownedCount(s) >= 16) return false;
    s.cells[key(x, y)] = emptyCell(x, y);
    s.lotsBought = (s.lotsBought || 0) + 1;
    syncGrid(s);
    return true;
  }

  function seedRoom(s, x, y, kind) {
    ensureLot(s, x, y);
    var c = cell(s, x, y);
    if (!c) return;
    if (!c.room) c.room = kind;
  }

  function seedGuest(s, kind, x, y, stage) {
    if (!denizen(s, kind)) {
      s.denizens.push({
        id: kind,
        kind: kind,
        stage: stage || 1,
        progress: 20,
        x: null,
        y: null,
        exhaustedUntil: 0,
      });
    }
    var d = denizen(s, kind);
    if (stage != null && d.stage < stage) d.stage = stage;
    if (x != null && d.x == null) place(s, kind, x, y, true);
  }

  function seedMid(s) {
    s.flags.sootDone = true;
    s.sootDue = false;
    s.onboard = 2;
    s.openSec = Math.max(s.openSec, 480);
    s.lifetimeTally = Math.max(s.lifetimeTally, 90);
    s.tally = Math.max(s.tally, 64);
    s.scrap = Math.max(s.scrap, 22);
    s.dust = Math.max(s.dust, 3);
    s.unlocks = s.unlocks || {};
    s.unlocks.cistern = true;
    s.unlocks.conservatory = true;
    s.unlocks.dynamo = true;
    ensureLot(s, 0, 2);
    ensureLot(s, 1, 2);
    seedRoom(s, 1, 1, "hearth");
    seedRoom(s, 2, 1, "cistern");
    seedRoom(s, 0, 1, "conservatory");
    seedRoom(s, 1, 2, "dynamo");
    seedRoom(s, 0, 2, "dormer");
    seedGuest(s, "Wicknoll", 1, 1, 1);
    seedGuest(s, "Puddlewick", 2, 1, 1);
    seedGuest(s, "Ledgerfrond", 0, 1, 2);
    seedGuest(s, "Zitterplug", 1, 2, 1);
    s.nextArrival = s.openSec + 100000;
    s.nextEvent = s.openSec + 100000;
    s.pendingEvent = null;
    s.recap = null;
    blot(s, "A mid-morning zoo. Pens on the dirt.");
  }

  function seedLate(s) {
    s.flags.sootDone = true;
    s.sootDue = false;
    s.onboard = 2;
    s.openSec = Math.max(s.openSec, 2100);
    s.lifetimeTally = Math.max(s.lifetimeTally, 280);
    s.tally = Math.max(s.tally, 186);
    s.scrap = Math.max(s.scrap, 44);
    s.dust = Math.max(s.dust, 8);
    s.unlocks = {
      hearth: true,
      cistern: true,
      conservatory: true,
      dynamo: true,
      dormer: true,
      scullery: true,
      vitrine: true,
      transom: true,
      larder: true,
    };
    [
      [3, 0],
      [3, 1],
      [0, 2],
      [1, 2],
      [2, 2],
      [3, 2],
      [0, 3],
      [1, 3],
      [2, 3],
      [3, 3],
    ].forEach(function (xy) {
      ensureLot(s, xy[0], xy[1]);
    });
    seedRoom(s, 1, 1, "hearth");
    seedRoom(s, 0, 1, "conservatory");
    seedRoom(s, 2, 1, "cistern");
    seedRoom(s, 3, 1, "dynamo");
    seedRoom(s, 1, 2, "dormer");
    seedRoom(s, 2, 2, "scullery");
    seedRoom(s, 3, 2, "vitrine");
    seedRoom(s, 0, 2, "transom");
    seedRoom(s, 2, 0, "larder");
    seedRoom(s, 3, 0, "transom");
    seedGuest(s, "Wicknoll", 1, 1, 2);
    seedGuest(s, "Puddlewick", 2, 1, 2);
    seedGuest(s, "Ledgerfrond", 0, 1, 2);
    seedGuest(s, "Zitterplug", 3, 1, 1);
    seedGuest(s, "Napwisp", 1, 2, 1);
    seedGuest(s, "Flakesmith", 2, 2, 1);
    seedGuest(s, "Specktin", 3, 2, 1);
    seedGuest(s, "Fluekin", 0, 2, 1);
    s.nextArrival = s.openSec + 100000;
    s.nextEvent = s.openSec + 100000;
    s.pendingEvent = null;
    s.recap = null;
    blot(s, "The grounds filled in. Lamps on the dirt.");
  }

  function applyDebug(s) {
    var q = parseQS();
    if (q.debug || q.rich) {
      s.tally = Math.max(s.tally, 240);
      s.scrap = Math.max(s.scrap, 60);
      s.dust = Math.max(s.dust, 6);
      s.debugFast = true;
      s.nextArrival = s.openSec + 8;
    }
    if (q.catchup) {
      var n = parseInt(q.catchup, 10);
      if (n > 0) applyAway(s, n * 1000);
    }
    if (q.evt || q.event) {
      var ev = eventById(q.evt || q.event);
      if (ev) queueEvent(s, ev);
    }
    if (q.demo === "seated" || q.demo === "friction") {
      if (!cell(s, 1, 1).room) {
        s.tally = Math.max(s.tally, 8);
        build(s, 1, 1, "hearth");
      }
      if (denizen(s, "Wicknoll") && denizen(s, "Wicknoll").x == null) place(s, "Wicknoll", 1, 1, true);
    }
    if (q.demo === "friction") {
      s.flags.sootDone = true;
      s.sootDue = false;
      s.tally = Math.max(s.tally, 40);
      s.scrap = Math.max(s.scrap, 8);
      if (!cell(s, 2, 1).room) build(s, 2, 1, "cistern");
      if (!cell(s, 0, 1).room) build(s, 0, 1, "conservatory");
      if (!denizen(s, "Puddlewick")) {
        s.denizens.push({ id: "Puddlewick", kind: "Puddlewick", stage: 0, progress: 0, x: null, y: null, exhaustedUntil: 0 });
      }
      if (!denizen(s, "Ledgerfrond")) {
        s.denizens.push({ id: "Ledgerfrond", kind: "Ledgerfrond", stage: 0, progress: 0, x: null, y: null, exhaustedUntil: 0 });
      }
      if (denizen(s, "Puddlewick").x == null) place(s, "Puddlewick", 2, 1, true);
      if (denizen(s, "Ledgerfrond").x == null) place(s, "Ledgerfrond", 0, 1, true);
    }
    if (q.demo === "mid") seedMid(s);
    if (q.demo === "late") seedLate(s);
    if (q.lots) {
      var lotsN = parseInt(q.lots, 10);
      if (lotsN > 0) {
        for (var li = 0; li < lotsN; li++) {
          var legal = fogOf(s).filter(function (f) {
            return buyGeometry(s, f.x, f.y) === "ok" && ownedCount(s) < 16;
          });
          if (!legal.length) break;
          grantLot(s, legal[0].x, legal[0].y);
        }
      }
    }
  }

  function boot() {
    acc = 0;
    var saved = loadRaw();
    var t = now();
    if (saved) {
      state = saved;
      state.pips = [];
      state.toast = null;
      var away = t - (state.lastSeen || t);
      applyAway(state, away);
      state.lastSeen = t;
    } else {
      state = fresh();
    }
    applyDebug(state);
    save(state);
    return state;
  }

  function reset() {
    try {
      localStorage.removeItem(D.SAVE_KEY);
    } catch (e) {}
    acc = 0;
    state = fresh();
    applyDebug(state);
    save(state);
    return state;
  }

  function pump(dt) {
    if (!state) return;
    if (state.pendingEvent || state.recap) {
      acc = 0;
      return;
    }
    acc += dt;
    while (acc >= 1000) {
      acc -= 1000;
      stepSecond(state, false);
    }
  }

  function dismissRecap() {
    if (!state || !state.recap) return;
    var ev = state.recap.event;
    state.recap = null;
    if (ev && !state.pendingEvent) queueEvent(state, ev);
  }

  function getState() {
    return state;
  }

  /* 60s script + friction self-check */
  function selfCheck() {
    var report = { ok: true, notes: [] };
    function fail(m) {
      report.ok = false;
      report.notes.push("FAIL " + m);
    }
    function pass(m) {
      report.notes.push("OK " + m);
    }
    try {
      localStorage.removeItem(D.SAVE_KEY);
    } catch (e) {}
    var s = fresh();
    if (s.tally !== 12 || s.scrap !== 6 || s.dust !== 0) fail("wallet start");
    else pass("wallet 12/6/0");
    if (s.v !== 2) fail("fresh v=2");
    else pass("fresh v=2");
    if (ownedCount(s) !== 6 || s.gridW !== 3 || s.gridH !== 2) fail("3x2 owned " + ownedCount(s));
    else pass("3x2 owned");
    if (!cell(s, 1, 0) || cell(s, 1, 0).room !== "lobby") fail("gatehouse at 1,0");
    else pass("gatehouse at 1,0");
    if (!fogOf(s).length) fail("fog halo");
    else pass("fog halo " + fogOf(s).length);
    var earlyFog = fogOf(s)[0];
    var earlyBuy = buyLot(s, earlyFog.x, earlyFog.y);
    if (earlyBuy === "ok") fail("bought before Wicknoll seated");
    else pass("buy locked until Wicknoll seated");
    if (waiting(s).length !== 1 || waiting(s)[0].kind !== "Wicknoll") fail("Wicknoll waiting");
    else pass("Wicknoll waiting");
    var pref = preferredHearthLot(s);
    if (!pref || pref.x !== 1 || pref.y !== 1) fail("preferred hearth lot " + JSON.stringify(pref));
    else pass("preferred hearth lot 1,1");
    var b = buildPreferredHearth(s);
    if (b !== "ok") fail("build hearth: " + b);
    else pass("hearth at 1,1");
    if (!cell(s, 1, 1) || cell(s, 1, 1).room !== "hearth") fail("preferred build did not seat Ember at 1,1");
    else pass("BUILD EMBER GROUNDS places Ember at 1,1");
    if (s.tally !== 4) fail("tally after hearth " + s.tally);
    var a = place(s, "Wicknoll", 1, 1);
    if (a !== "ok") fail("assign: " + a);
    else pass("Wicknoll seated");
    var r1 = ratesFor(s, denizen(s, "Wicknoll"));
    if (r1.tally < 2.9 || r1.tally > 3.2) fail("home yield " + r1.tally + " expected ~3");
    else pass("home yield " + r1.tally.toFixed(2) + "/s");
    if (!r1.info.home) fail("HOME badge");
    else pass("HOME");
    for (var i = 0; i < 55; i++) stepSecond(s, false);
    if (!s.pendingEvent || s.pendingEvent.id !== "evt_soot_handshake") fail("soot at 55s: " + (s.pendingEvent && s.pendingEvent.id));
    else pass("evt_soot_handshake at 55s");
    resolveEvent(s, 0);
    if (s.dust < 1) fail("keep soot dust");
    else pass("KEEP THE SOOT +1 dust");
    if (!canUnlock(s, "cistern")) fail("cistern unlock");
    else pass("cistern unlocked");
    add(s, "tally", 20);
    add(s, "scrap", 4);
    var cist = build(s, 2, 1, "cistern");
    if (cist !== "ok") fail("build cistern: " + cist);
    else pass("cistern at 2,1 beside hearth");
    var r2 = ratesFor(s, denizen(s, "Wicknoll"));
    if (r2.info.friction < 1) fail("friction not shown " + JSON.stringify(r2.info));
    else pass("FRICTION visible");
    if (r2.tally >= r1.tally) fail("yield did not drop " + r1.tally + " -> " + r2.tally);
    else pass("yield dropped " + r1.tally.toFixed(2) + " -> " + r2.tally.toFixed(2));
    var awayY = sumYield(s);
    var expect = awayY.tally * 10 * D.AWAY_TAX;
    var before = s.tally;
    catchUp(s, 10, true);
    var got = s.tally - before;
    if (Math.abs(got - expect) > 0.05) fail("away math got " + got + " expect " + expect);
    else pass("away = sumYield*secs*0.85");
    save(s);
    var loaded = loadRaw();
    if (!loaded || loaded.v !== 2 || !cell(loaded, 1, 1) || cell(loaded, 1, 1).room !== "hearth") fail("save/load");
    else pass("save restores hearth");
    add(s, "scrap", 20);
    var lot0 = fogOf(s)[0];
    var cost0 = D.lotCost(s.lotsBought || 0);
    if (cost0.scrap !== 12) fail("first lot cost " + cost0.scrap);
    else pass("first lot 12 scrap");
    var bought = buyLot(s, lot0.x, lot0.y);
    if (bought !== "ok") fail("buyLot: " + bought);
    else pass("buyLot " + lot0.x + "," + lot0.y);
    if (!cell(s, lot0.x, lot0.y)) fail("owned after buy");
    var cost1 = D.lotCost(s.lotsBought || 0);
    if (cost1.scrap !== 20) fail("second lot cost " + cost1.scrap);
    else pass("next lot 20 scrap");
    var v1 = {
      v: 1,
      tally: 99,
      scrap: 7,
      dust: 2,
      lifetimeTally: 40,
      openSec: 10,
      lastSeen: now(),
      gridW: 4,
      gridH: 4,
      expandRow: false,
      expandCol: false,
      cells: makeGrid(4, 4),
      denizens: [{ id: "Wicknoll", kind: "Wicknoll", stage: 0, progress: 0, x: null, y: null, exhaustedUntil: 0 }],
      flags: {},
      unlocks: { hearth: true },
      onboard: 0,
    };
    v1.cells[key(1, 0)].room = "lobby";
    var migrated = migrateV1(JSON.parse(JSON.stringify(v1)));
    if (migrated.v !== 2) fail("migrate v");
    else pass("migrate v1→2");
    if (migrated.tally !== 99 || migrated.scrap !== 7 || migrated.dust !== 2) fail("migrate wiped wallet");
    else pass("migrate keeps wallet");
    if (Object.keys(migrated.cells).length !== 16) fail("v1 cells not owned");
    else pass("v1 4x4 becomes owned");
    if (!fogOf(migrated).length) fail("migrated fog halo");
    else pass("migrated fog halo");
    if (D.ROOMS.hearth.name !== "Ember Grounds" || D.ROOMS.lobby.name !== "Gatehouse") fail("display names");
    else pass("habitat display names");
    var mid = fresh();
    seedMid(mid);
    if (ownedCount(mid) < 6 || ownedCount(mid) > 8) fail("mid lots " + ownedCount(mid));
    else pass("mid lots " + ownedCount(mid));
    if (roomCount(mid) < 4 || roomCount(mid) > 5) fail("mid habitats " + roomCount(mid));
    else pass("mid habitats " + roomCount(mid));
    var seatedMid = mid.denizens.filter(function (d) { return d.x != null; }).length;
    if (seatedMid < 3) fail("mid seated " + seatedMid);
    else pass("mid seated " + seatedMid);
    var late = fresh();
    seedLate(late);
    if (ownedCount(late) < 12 || ownedCount(late) > 16) fail("late lots " + ownedCount(late));
    else pass("late lots " + ownedCount(late));
    if (roomCount(late) < 8 || roomCount(late) > 10) fail("late habitats " + roomCount(late));
    else pass("late habitats " + roomCount(late));
    var seatedLate = late.denizens.filter(function (d) { return d.x != null; }).length;
    if (seatedLate < 6) fail("late seated " + seatedLate);
    else pass("late seated " + seatedLate);
    state = s;
    return report;
  }

  G.Typehouse = {
    boot: boot,
    reset: reset,
    save: save,
    pump: pump,
    getState: getState,
    cell: cell,
    build: build,
    preferredHearthLot: preferredHearthLot,
    buildPreferredHearth: buildPreferredHearth,
    upgrade: upgrade,
    buyLot: buyLot,
    buyUnlocked: buyUnlocked,
    buyGeometry: buyGeometry,
    fogOf: fogOf,
    parkBounds: parkBounds,
    ownedBounds: ownedBounds,
    ownedCount: ownedCount,
    seedMid: seedMid,
    seedLate: seedLate,
    isFenced: isFenced,
    migrateV1: migrateV1,
    place: place,
    waiting: waiting,
    denizen: denizen,
    ratesFor: ratesFor,
    yieldMult: yieldMult,
    sumYield: sumYield,
    neighborWeather: neighborWeather,
    canUnlock: canUnlock,
    canPay: canPay,
    roomCount: roomCount,
    resolveEvent: resolveEvent,
    queueEvent: queueEvent,
    eventById: eventById,
    dismissRecap: dismissRecap,
    catchUp: catchUp,
    applyAway: applyAway,
    stepSecond: stepSecond,
    selfCheck: selfCheck,
    fresh: fresh,
    key: key,
    parseQS: parseQS,
  };
})(window);
