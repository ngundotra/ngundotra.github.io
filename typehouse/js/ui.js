/* Typehouse UI — Habitat Grounds park, sheets, dock, blotter. */
(function (G) {
  const T = G.Typehouse;
  const D = G.THData;
  const S = G.THSprites;
  const W = G.THWander;
  var selected = null;
  var mode = "none";
  var assignId = null;
  var frame = 0;
  var lastSave = 0;
  var lastHouse = 0;
  var lastWander = 0;
  var dirty = true;
  var pressTimer = 0;
  var lastWallet = { tally: 12, scrap: 6, dust: 0 };
  var LOT = 96;
  var Z_MIN = 0.7;
  var Z_MAX = 2.2;
  var Z_DEFAULT = 2;
  var view = { minX: 0, minY: 0, maxX: 2, maxY: 1, w: 3, h: 2 };
  var cam = { x: 0, y: 0, z: Z_DEFAULT };
  var camReady = false;
  var pointers = {};
  var pid = null;
  var pinch = null;
  var gesturing = false;
  var lastTapAt = 0;
  var lastTapX = 0;
  var lastTapY = 0;
  var pan = { sx: 0, sy: 0, cx: 0, cy: 0, moved: false };
  var lastBlotter = "";
  var lastWaitKey = "";
  var lastStripFrame = -1;

  function $(id) {
    return document.getElementById(id);
  }

  function int(n) {
    return Math.floor(Math.max(0, n));
  }

  function fmtRate(n) {
    if (!n) return "0";
    if (Math.abs(n) >= 10) return n.toFixed(1);
    return n.toFixed(2);
  }

  function selKey() {
    return selected ? T.key(selected.x, selected.y) : "";
  }

  function sheetOpen() {
    return $("sheet").classList.contains("open");
  }

  function markDirty() {
    dirty = true;
  }

  function roomName(id) {
    return D.ROOMS[id] ? D.ROOMS[id].name : id;
  }

  function wantsLine(def) {
    return def.wants
      .map(function (id) {
        return roomName(id);
      })
      .join(" / ");
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

  function edgeFlags(s, c) {
    var edges = {};
    if (!c || !c.denizen) return edges;
    var d = T.denizen(s, c.denizen);
    if (!d) return edges;
    var types = D.DENIZENS[d.kind].types;
    var map = { "1,0": "e", "-1,0": "w", "0,1": "n", "0,-1": "s" };
    [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ].forEach(function (dir) {
      var n = T.cell(s, c.x + dir[0], c.y + dir[1]);
      if (!n || !n.room) return;
      edges[map[dir[0] + "," + dir[1]]] = scoreEdge(types, n.room);
    });
    return edges;
  }

  function showSheet(html, cls) {
    var sh = $("sheet");
    sh.className = "sheet open" + (cls ? " " + cls : "");
    $("sheet-body").innerHTML = html;
    $("dim").classList.add("on");
  }

  function hideSheet() {
    var s = T.getState();
    if (s && (s.pendingEvent || s.recap)) return;
    $("sheet").className = "sheet";
    $("dim").classList.remove("on");
    mode = "none";
    assignId = null;
    renderDock();
  }

  function applyCam() {
    $("park").style.transform =
      "translate(" + Math.round(cam.x) + "px," + Math.round(cam.y) + "px) scale(" + cam.z + ")";
  }

  function syncZoomBtns() {
    var inn = $("btn-zoom-in");
    var out = $("btn-zoom-out");
    if (inn) inn.disabled = cam.z >= Z_MAX - 0.01;
    if (out) out.disabled = cam.z <= Z_MIN + 0.01;
  }

  function clampCam() {
    var wrap = $("house-wrap");
    var park = $("park");
    if (!wrap || !park) return;
    var ww = wrap.clientWidth;
    var wh = wrap.clientHeight;
    var z = cam.z || 1;
    var pw = view.w * LOT * z;
    var ph = view.h * LOT * z;
    if (pw <= ww) cam.x = Math.round((ww - pw) / 2);
    else cam.x = Math.min(0, Math.max(ww - pw, cam.x));
    if (ph <= wh) cam.y = Math.round((wh - ph) / 2);
    else cam.y = Math.min(0, Math.max(wh - ph, cam.y));
    applyCam();
    syncZoomBtns();
  }

  function setZoom(nz, fx, fy) {
    var wrap = $("house-wrap");
    if (!wrap) return;
    nz = Math.max(Z_MIN, Math.min(Z_MAX, nz));
    var old = cam.z || 1;
    if (!old) old = 1;
    if (fx == null) fx = wrap.clientWidth / 2;
    if (fy == null) fy = wrap.clientHeight / 2;
    var wx = (fx - cam.x) / old;
    var wy = (fy - cam.y) / old;
    cam.z = nz;
    cam.x = fx - wx * nz;
    cam.y = fy - wy * nz;
    clampCam();
  }

  function toggleZoom(ev) {
    var wrap = $("house-wrap");
    if (!wrap) return;
    var box = wrap.getBoundingClientRect();
    var next = cam.z >= 1.45 ? 1 : Z_DEFAULT;
    setZoom(next, ev.clientX - box.left, ev.clientY - box.top);
  }

  function centerOn(x, y) {
    var wrap = $("house-wrap");
    if (!wrap) return;
    var z = cam.z || 1;
    var left = ((x - view.minX) * LOT + LOT / 2) * z;
    var top = ((view.maxY - y) * LOT + LOT / 2) * z;
    cam.x = wrap.clientWidth / 2 - left;
    cam.y = wrap.clientHeight / 2 - top;
    clampCam();
  }

  function includeLot(x, y) {
    var wrap = $("house-wrap");
    if (!wrap) return;
    var z = cam.z || 1;
    var left = (x - view.minX) * LOT * z;
    var top = (view.maxY - y) * LOT * z;
    var sl = left + cam.x;
    var st = top + cam.y;
    var pad = 10;
    var lot = LOT * z;
    if (sl < pad) cam.x += pad - sl;
    if (st < pad) cam.y += pad - st;
    if (sl + lot > wrap.clientWidth - pad) cam.x -= sl + lot - (wrap.clientWidth - pad);
    if (st + lot > wrap.clientHeight - pad) cam.y -= st + lot - (wrap.clientHeight - pad);
    clampCam();
  }

  function ensureCam(s) {
    view = T.parkBounds(s);
    if (!camReady) {
      cam.z = Z_DEFAULT;
      centerOn(1, 0.5);
      camReady = true;
    } else {
      clampCam();
    }
  }

  function wrapBox() {
    var wrap = $("house-wrap");
    return wrap ? { w: wrap.clientWidth, h: wrap.clientHeight } : { w: 320, h: 320 };
  }

  function renderWallet(s) {
    ["tally", "scrap", "dust"].forEach(function (res) {
      var el = $(res);
      var n = int(s[res]);
      el.textContent = n;
      if (n !== lastWallet[res]) {
        el.classList.remove("punch");
        void el.offsetWidth;
        el.classList.add("punch");
      }
      lastWallet[res] = n;
    });
  }

  function renderWeather(s) {
    var el = $("weather");
    if (s.weather && s.weather.until > s.openSec) {
      el.hidden = false;
      el.textContent = "INDOOR " + s.weather.type.toUpperCase();
      el.style.color = D.TYPE_COLOR[s.weather.type] || D.PAL.lamp;
    } else if (s.silentUntil > s.openSec) {
      el.hidden = false;
      el.textContent = "QUIET CONTEST";
      el.style.color = D.PAL.parchment;
    } else {
      el.hidden = true;
    }
  }

  function lotNode(house, k, x, y, fog) {
    var node = house.querySelector('[data-k="' + k + '"]');
    if (node) return node;
    node = document.createElement("div");
    node.className = "lot" + (fog ? " fog" : "");
    node.dataset.k = k;
    node.dataset.x = String(x);
    node.dataset.y = String(y);
    node.innerHTML = '<canvas class="tile"></canvas>';
    house.appendChild(node);
    return node;
  }

  function renderHouse(s) {
    var bounds = T.parkBounds(s);
    view = bounds;
    var house = $("house");
    var park = $("park");
    var critters = $("critters");
    var pw = bounds.w * LOT;
    var ph = bounds.h * LOT;
    park.style.width = pw + "px";
    park.style.height = ph + "px";
    house.style.width = pw + "px";
    house.style.height = ph + "px";
    critters.width = pw;
    critters.height = ph;
    var grounds = $("grounds");
    if (grounds) {
      grounds.width = pw;
      grounds.height = ph;
      S.paintPark(grounds, { lot: LOT, bounds: bounds, owned: s.cells });
    }
    ensureCam(s);

    var keep = {};
    var fog = T.fogOf(s);
    var cost = D.lotCost(s.lotsBought || 0);

    Object.keys(s.cells).forEach(function (k) {
      var c = s.cells[k];
      keep[k] = true;
      var node = lotNode(house, k, c.x, c.y, false);
      node.className = "lot" + (selKey() === k ? " on" : "") + (c.room === "lobby" ? " gate" : "");
      node.style.left = (c.x - bounds.minX) * LOT + "px";
      node.style.top = (bounds.maxY - c.y) * LOT + "px";
      node.style.width = LOT + "px";
      node.style.height = LOT + "px";
      paintLot(s, node, c);
    });

    fog.forEach(function (f) {
      var k = "fog:" + T.key(f.x, f.y);
      keep[k] = true;
      var node = lotNode(house, k, f.x, f.y, true);
      node.className = "lot fog" + (selKey() === T.key(f.x, f.y) ? " on" : "");
      node.style.left = (f.x - bounds.minX) * LOT + "px";
      node.style.top = (bounds.maxY - f.y) * LOT + "px";
      node.style.width = LOT + "px";
      node.style.height = LOT + "px";
      var tile = node.querySelector(".tile");
      tile.width = LOT;
      tile.height = LOT;
      S.paintFog(tile, { cost: cost, x: f.x, y: f.y, selected: selKey() === T.key(f.x, f.y) });
    });

    var fogSet = {};
    fog.forEach(function (f) {
      fogSet[T.key(f.x, f.y)] = true;
    });
    for (var fy = bounds.minY; fy <= bounds.maxY; fy++) {
      for (var fx = bounds.minX; fx <= bounds.maxX; fx++) {
        var fk = T.key(fx, fy);
        if (s.cells[fk] || fogSet[fk]) continue;
        var vk = "void:" + fk;
        keep[vk] = true;
        var vnode = lotNode(house, vk, fx, fy, true);
        vnode.className = "lot fog void";
        vnode.style.left = (fx - bounds.minX) * LOT + "px";
        vnode.style.top = (bounds.maxY - fy) * LOT + "px";
        vnode.style.width = LOT + "px";
        vnode.style.height = LOT + "px";
        var vtile = vnode.querySelector(".tile");
        vtile.width = LOT;
        vtile.height = LOT;
        S.paintFog(vtile, { inert: true, x: fx, y: fy });
      }
    }

    Array.prototype.forEach.call(house.children, function (n) {
      if (!keep[n.dataset.k]) n.remove();
    });

    renderPips(s);
  }

  function paintLot(s, node, c) {
    var tile = node.querySelector(".tile");
    tile.width = LOT;
    tile.height = LOT;
    if (!c.room) {
      S.paintEmpty(tile, { selected: selKey() === T.key(c.x, c.y) });
      return;
    }
    var d = c.denizen ? T.denizen(s, c.denizen) : null;
    var info = d ? T.yieldMult(s, d, c) : { home: false, nourish: 0, friction: 0 };
    S.paintHabitat(tile, c.room, {
      level: c.level,
      haunted: c.haunted,
      leaking: c.leaking,
      unpowered: c.unpowered,
      home: !!(d && info.home),
      edges: edgeFlags(s, c),
      selected: selKey() === T.key(c.x, c.y),
    });
  }

  function renderPips(s) {
    var layer = $("pips");
    layer.innerHTML = "";
    s.pips.slice(-8).forEach(function (p) {
      var age = s.openSec - p.t;
      if (age > 2) return;
      var el = document.createElement("div");
      el.className = "pip " + p.res;
      el.textContent = (p.res === "tally" ? "+" : p.res === "scrap" ? "s+" : "h+") + fmtRate(p.amt);
      el.style.left = (p.x - view.minX) * LOT + LOT * 0.35 + "px";
      el.style.top = (view.maxY - p.y) * LOT + LOT * 0.15 - age * 10 + "px";
      layer.appendChild(el);
    });
  }

  function paintGuests(s) {
    var ctx = $("critters").getContext("2d");
    W.paint(ctx, view, cam, wrapBox());
  }

  function renderBlotter(s) {
    if ((s.blotter || "") !== lastBlotter) {
      $("blotter").textContent = s.blotter || "";
      lastBlotter = s.blotter || "";
    }
    var wait = T.waiting(s);
    var strip = $("lobby-strip");
    var key = wait
      .map(function (d) {
        return d.id;
      })
      .join(",") + "|" + (assignId || "");
    if (!wait.length) {
      strip.hidden = true;
      strip.innerHTML = "";
      lastWaitKey = key;
      return;
    }
    strip.hidden = false;
    if (key !== lastWaitKey) {
      lastWaitKey = key;
      strip.innerHTML = "";
      wait.forEach(function (d) {
        var b = document.createElement("button");
        b.type = "button";
        b.className = "wait" + (assignId === d.id ? " on" : "");
        var cv = document.createElement("canvas");
        cv.width = 32;
        cv.height = 32;
        S.paintGuest(cv, d.kind, frame);
        b.appendChild(cv);
        var lab = document.createElement("span");
        lab.textContent = d.kind;
        b.appendChild(lab);
        b.addEventListener("click", function () {
          assignId = d.id;
          mode = "assign";
          openAssignHint(s, d);
          renderDock();
          renderChrome(s);
        });
        strip.appendChild(b);
      });
      lastStripFrame = frame;
      return;
    }
    if (frame !== lastStripFrame) {
      lastStripFrame = frame;
      Array.prototype.forEach.call(strip.querySelectorAll("canvas"), function (cv, i) {
        if (wait[i]) S.paintGuest(cv, wait[i].kind, frame);
      });
    }
  }

  function openAssignHint(s, d) {
    var def = D.DENIZENS[d.kind];
    $("context").innerHTML = "<b>ASSIGN " + d.kind + "</b> · wants " + wantsLine(def) + " · tap a habitat";
  }

  function renderContext(s) {
    if (mode === "assign" && assignId) return;
    if (!selected) {
      $("context").innerHTML = "<b>HABITAT GROUNDS</b> · drag to pan · pinch or +/− to zoom";
      return;
    }
    var c = T.cell(s, selected.x, selected.y);
    if (!c) {
      var fogHit = T.fogOf(s).some(function (f) {
        return f.x === selected.x && f.y === selected.y;
      });
      $("context").innerHTML = fogHit
        ? "<b>FOG</b> " + selected.x + "," + selected.y + " · BUY LAND"
        : "<b>MIST</b> · not a lot yet";
      return;
    }
    if (!c.room) {
      $("context").innerHTML = "<b>GROUNDS</b> " + selected.x + "," + selected.y + " · BUILD";
      return;
    }
    var def = D.ROOMS[c.room];
    var line = "<b>" + def.name.toUpperCase() + "</b> lv" + c.level;
    if (c.room !== "lobby" && c.room !== "larder") line += " · " + def.type;
    if (c.denizen) {
      var d = T.denizen(s, c.denizen);
      var r = T.ratesFor(s, d);
      line += " · " + d.kind + " " + fmtRate(r.tally) + " t/s";
    } else if (c.room === "lobby") {
      line += " · " + T.waiting(s).length + " waiting";
    }
    $("context").innerHTML = line;
  }

  function renderDock() {
    $("btn-build").classList.toggle("on", mode === "build");
    $("btn-assign").classList.toggle("on", mode === "assign");
    $("btn-help").classList.toggle("on", mode === "help");
  }

  function parkToLot(px, py) {
    return {
      x: Math.floor(px / LOT) + view.minX,
      y: view.maxY - Math.floor(py / LOT),
    };
  }

  function onParkTap(ev) {
    var wrap = $("house-wrap").getBoundingClientRect();
    var z = cam.z || 1;
    var px = (ev.clientX - wrap.left - cam.x) / z;
    var py = (ev.clientY - wrap.top - cam.y) / z;
    if (px < 0 || py < 0 || px >= view.w * LOT || py >= view.h * LOT) return;
    var s = T.getState();
    var hit = W.hitTest(px, py, view);
    if (hit) {
      selected = { x: hit.x, y: hit.y };
      var hc = T.cell(s, hit.x, hit.y);
      if (hc && hc.room) openInspect(s, hc);
      markDirty();
      renderChrome(s);
      return;
    }
    var lot = parkToLot(px, py);
    var c = T.cell(s, lot.x, lot.y);
    selected = { x: lot.x, y: lot.y };
    if (!c) {
      var isFog = T.fogOf(s).some(function (f) {
        return f.x === lot.x && f.y === lot.y;
      });
      if (isFog) openBuy(s, lot.x, lot.y);
      markDirty();
      renderChrome(s);
      return;
    }
    if (mode === "assign" && assignId) {
      var msg = T.place(s, assignId, lot.x, lot.y);
      if (msg === "ok") {
        W.enter(assignId);
        assignId = null;
        mode = "none";
        openInspect(s, T.cell(s, lot.x, lot.y));
      } else {
        s.blotter = msg;
      }
      markDirty();
      renderChrome(s);
      renderHouse(s);
      return;
    }
    if (!c.room) openBuild(s, c);
    else openInspect(s, c);
    markDirty();
    renderChrome(s);
  }

  function costLine(cost) {
    var bits = [];
    if (cost.tally) bits.push(cost.tally + " tally");
    if (cost.scrap) bits.push(cost.scrap + " scrap");
    if (cost.dust) bits.push(cost.dust + " dust");
    return bits.join(" · ") || "free";
  }

  function openBuy(s, x, y) {
    var cost = D.lotCost(s.lotsBought || 0);
    var unlocked = T.buyUnlocked(s);
    var geo = T.buyGeometry(s, x, y);
    var ownedMax = T.ownedCount(s) >= 16;
    var ok = unlocked && geo === "ok" && !ownedMax && T.canPay(s, cost);
    var why = !unlocked
      ? "Seat Wicknoll in Ember Grounds first."
      : ownedMax
        ? "Sixteen lots is the fence."
        : geo !== "ok"
          ? geo
          : !T.canPay(s, cost)
            ? "Need " + costLine(cost) + "."
            : "";
    var html =
      '<div class="sheet-h">BUY LAND</div><p class="sheet-p">Fogged lot ' +
      x +
      "," +
      y +
      ". Adjacent grounds only.</p>";
    html += '<p class="sheet-p">' + costLine(cost) + "</p>";
    if (why) html += '<p class="sheet-p muted">' + why + "</p>";
    html += '<button class="fat" id="do-buy"' + (ok ? "" : " disabled") + ">BUY LOT · " + costLine(cost) + "</button>";
    showSheet(html);
    if ($("do-buy"))
      $("do-buy").onclick = function () {
        var msg = T.buyLot(s, x, y);
        if (msg === "ok") {
          hideSheet();
          selected = { x: x, y: y };
          view = T.parkBounds(s);
          includeLot(x, y);
          markDirty();
        } else s.blotter = msg;
        renderChrome(s);
        renderHouse(s);
      };
  }

  function openBuild(s, c) {
    var onboardHearth = s.onboard === 0;
    var rooms = Object.keys(D.ROOMS).filter(function (id) {
      if (id === "lobby") return false;
      if (onboardHearth) return id === "hearth";
      return T.canUnlock(s, id);
    });
    var html =
      '<div class="sheet-h">BUILD</div><p class="sheet-p">Empty grounds ' +
      c.x +
      "," +
      c.y +
      ". One habitat. No demolish.</p>";
    html += '<div class="build-list">';
    rooms.forEach(function (id) {
      var def = D.ROOMS[id];
      var ok = T.canPay(s, def.cost);
      var adjOk = true;
      if (onboardHearth && id === "hearth") adjOk = Math.abs(c.x - 1) + Math.abs(c.y - 0) === 1;
      var cap = T.roomCount(s) >= 12;
      html +=
        '<button class="build-card" data-kind="' +
        id +
        '" ' +
        (!ok || !adjOk || cap ? "disabled" : "") +
        '><span class="dot" style="background:' +
        (D.TYPE_COLOR[def.type] || D.PAL.copper) +
        '"></span><b>' +
        def.name.toUpperCase() +
        "</b><small>" +
        def.blurb +
        "</small><em>" +
        costLine(def.cost) +
        (!adjOk ? " · beside Gatehouse" : "") +
        (cap ? " · twelve habitats" : "") +
        "</em></button>";
    });
    html += "</div>";
    showSheet(html);
    Array.prototype.forEach.call(document.querySelectorAll(".build-card"), function (btn) {
      btn.addEventListener("click", function () {
        var msg = T.build(s, c.x, c.y, btn.dataset.kind);
        if (msg === "ok") {
          hideSheet();
          selected = { x: c.x, y: c.y };
          openInspect(s, T.cell(s, c.x, c.y));
        } else s.blotter = msg;
        markDirty();
        renderChrome(s);
        renderHouse(s);
      });
    });
  }

  function openInspect(s, c) {
    var def = D.ROOMS[c.room];
    if (c.room === "lobby" && s.onboard === 0) {
      showSheet(
        '<div class="sheet-h">GATEHOUSE</div><p class="sheet-p">The night desk is open. First job: Ember Grounds beside this lot. Prefer 1,1.</p><button class="fat" id="do-hearth">BUILD EMBER GROUNDS</button><button class="fat ghost" disabled>SEAT</button>'
      );
      $("do-hearth").onclick = function () {
        mode = "build";
        selected = null;
        hideSheet();
        $("context").innerHTML = "<b>BUILD EMBER GROUNDS</b> · tap a lot beside the Gatehouse";
        renderDock();
      };
      return;
    }
    var html = '<div class="sheet-h">' + def.name.toUpperCase() + " <small>lv " + c.level + "</small></div>";
    if (def.type !== "none") {
      html += '<div class="type-row"><i class="swatch" style="background:' + D.TYPE_COLOR[def.type] + '"></i>' + def.type + "</div>";
    }
    html += '<p class="sheet-p">' + def.blurb + "</p>";
    if (c.denizen) {
      var d = T.denizen(s, c.denizen);
      var r = T.ratesFor(s, d);
      var gdef = D.DENIZENS[d.kind];
      html += '<div class="who-card">';
      html += '<canvas id="who-big" width="64" height="64"></canvas>';
      html += "<div><b>" + d.kind + "</b><small>" + gdef.types.join("/") + " · " + D.STAGES[d.stage] + "</small>";
      html += "<small>wants " + wantsLine(gdef) + "</small></div></div>";
      var badges = [];
      if (r.info.home) badges.push('<span class="badge home">HOME</span>');
      if (r.info.nourish > 0) badges.push('<span class="badge nourish">NOURISH</span>');
      if (r.info.friction > 0) badges.push('<span class="badge friction">FRICTION</span>');
      if (c.haunted) badges.push('<span class="badge haunt">HAUNTED</span>');
      if (r.info.exhausted) badges.push('<span class="badge">TIRED</span>');
      html += '<div class="badges">' + badges.join("") + "</div>";
      html +=
        '<div class="rate">live ' +
        fmtRate(r.tally) +
        " tally/s · " +
        fmtRate(r.scrap) +
        " scrap/s · " +
        fmtRate(r.dust) +
        " dust/s</div>";
    } else if (c.room === "lobby") {
      html += "<p class='sheet-p'>" + T.waiting(s).length + " waiting. Tap a face below, then a habitat.</p>";
    } else if (c.room === "larder") {
      html += "<p class='sheet-p'>No seat. Neighbors ×1.10.</p>";
    } else {
      html += "<p class='sheet-p'>Empty seat. ASSIGN a waiting denizen.</p>";
    }
    html += '<div class="row">';
    if (c.room !== "lobby" && c.room !== "larder" && T.waiting(s).length) {
      html += '<button class="fat" id="do-seat">ASSIGN</button>';
    } else {
      html += '<button class="fat ghost" disabled>SEAT</button>';
    }
    if (c.room !== "lobby" && c.level < 3) {
      var uc = D.UPGRADE[c.level + 1];
      html +=
        '<button class="fat ghost" id="do-up"' +
        (T.canPay(s, uc) ? "" : " disabled") +
        ">UPGRADE · " +
        costLine(uc) +
        "</button>";
    }
    html += "</div>";
    showSheet(html);
    var big = $("who-big");
    if (big && c.denizen) S.paintGuest(big, c.denizen, frame);
    if ($("do-seat"))
      $("do-seat").onclick = function () {
        var w = T.waiting(s)[0];
        if (!w) return;
        var msg = T.place(s, w.id, c.x, c.y);
        if (msg === "ok") {
          W.enter(w.id);
          openInspect(s, T.cell(s, c.x, c.y));
        } else s.blotter = msg;
        markDirty();
        renderChrome(s);
        renderHouse(s);
      };
    if ($("do-up"))
      $("do-up").onclick = function () {
        var msg = T.upgrade(s, c.x, c.y);
        if (msg !== "ok") s.blotter = msg;
        openInspect(s, T.cell(s, c.x, c.y));
        markDirty();
        renderChrome(s);
        renderHouse(s);
      };
  }

  function openEvent(s) {
    var ev = s.pendingEvent;
    if (!ev) return;
    var html =
      '<div class="sheet-h">' +
      ev.title +
      '</div><p class="sheet-p">' +
      ev.body +
      "</p><div class='row col'>";
    ev.choices.forEach(function (ch, i) {
      html += '<button class="fat" data-i="' + i + '">' + ch.label + "</button>";
    });
    html += "</div>";
    showSheet(html, "event");
    Array.prototype.forEach.call(document.querySelectorAll("#sheet-body .fat"), function (btn) {
      btn.addEventListener("click", function () {
        T.resolveEvent(s, parseInt(btn.dataset.i, 10));
        hideSheet();
        markDirty();
        renderChrome(s);
        renderHouse(s);
      });
    });
  }

  function openRecap(s) {
    var r = s.recap;
    if (!r) return;
    var mins = Math.floor(r.secs / 60);
    var html =
      '<div class="sheet-h">NIGHT DESK</div><p class="sheet-p">While you were out (' +
      (mins >= 1 ? mins + " min" : r.secs + "s") +
      ", taxed 0.85): +" +
      int(r.tally) +
      " tally · +" +
      fmtRate(r.scrap) +
      " scrap · +" +
      fmtRate(r.dust) +
      " dust.</p>";
    if (r.stages && r.stages.length) html += '<p class="sheet-p">' + r.stages.join(" ") + "</p>";
    if (r.roomWeird) html += '<p class="sheet-p">' + r.roomWeird + "</p>";
    if (r.event) html += '<p class="sheet-p">The grounds kept an opinion.</p>';
    html += '<button class="fat" id="recap-ok">I SEE</button>';
    showSheet(html, "event");
    $("recap-ok").onclick = function () {
      T.dismissRecap();
      $("sheet").className = "sheet";
      $("dim").classList.remove("on");
      markDirty();
      renderChrome(s);
    };
  }

  function openHelp(s) {
    var bag = T.sumYield(s);
    var html =
      '<div class="sheet-h">BLOTTER</div><p class="sheet-p">We do not ask what they are. We ask which grounds.</p>' +
      '<p class="sheet-p">Tally / Scrap / Hush-dust. Types press types. HOME is a rug. FRICTION is an ember post. NOURISH is moss on the rail.</p>' +
      '<p class="sheet-p">Live grounds: ' +
      fmtRate(bag.tally) +
      " tally/s. Open " +
      Math.floor(s.openSec) +
      "s. Habitats " +
      T.roomCount(s) +
      ". Lots " +
      T.ownedCount(s) +
      ".</p>";
    if (s.flags.hint) html += '<p class="sheet-p">Hint: ' + s.flags.hint + "</p>";
    html +=
      '<p class="sheet-p muted">Pinch, double-tap, or the +/− buttons to zoom. Long-press TYPEHOUSE to reset. Offline. No accounts. Fogged lots are BUY LAND, not BUILD.</p>';
    html += '<button class="fat" id="help-ok">BACK TO THE DESK</button>';
    showSheet(html);
    $("help-ok").onclick = hideSheet;
  }

  function renderChrome(s) {
    if (!s) return;
    renderWallet(s);
    renderWeather(s);
    renderBlotter(s);
    renderContext(s);
    renderDock();
    var toast = $("toast");
    if (s.toast) {
      toast.hidden = false;
      toast.textContent = s.toast.text;
    } else toast.hidden = true;
    if (s.recap && !sheetOpen()) openRecap(s);
    else if (s.pendingEvent && !sheetOpen()) openEvent(s);
  }

  function loop(prev) {
    return function (t) {
      var s = T.getState();
      if (s && !s.pendingEvent && !s.recap) T.pump(t - prev);
      if ((t / 400) | 0 !== (prev / 400) | 0) frame++;
      if (t - lastSave > 5000) {
        T.save(T.getState());
        lastSave = t;
      }
      if (s) {
        renderChrome(s);
        if (dirty || t - lastHouse > 1000) {
          renderHouse(s);
          lastHouse = t;
          dirty = false;
        }
        if (t - lastWander > 125) {
          W.sync(s, LOT);
          W.step(s, LOT, t, cam, wrapBox(), view);
          paintGuests(s);
          lastWander = t;
        }
      }
      requestAnimationFrame(loop(t));
    };
  }

  function bind() {
    $("btn-build").onclick = function () {
      mode = mode === "build" ? "none" : "build";
      assignId = null;
      $("context").innerHTML = mode === "build" ? "<b>BUILD</b> · tap empty grounds" : "";
      renderDock();
    };
    $("btn-assign").onclick = function () {
      var s = T.getState();
      var w = T.waiting(s);
      if (!w.length) {
        s.blotter = "No one waiting at the Gatehouse.";
        renderChrome(s);
        return;
      }
      mode = "assign";
      assignId = w[0].id;
      openAssignHint(s, w[0]);
      renderDock();
      renderChrome(s);
    };
    $("btn-help").onclick = function () {
      mode = "help";
      openHelp(T.getState());
    };
    $("dim").onclick = function () {
      var s = T.getState();
      if (s && (s.pendingEvent || s.recap)) return;
      hideSheet();
    };
    var title = $("title");
    title.addEventListener("pointerdown", function () {
      pressTimer = setTimeout(function () {
        if (confirm("New grounds? The current park is forgotten.")) {
          T.reset();
          W.reset();
          selected = null;
          cam.z = Z_DEFAULT;
          camReady = false;
          lastBlotter = "";
          lastWaitKey = "";
          hideSheet();
          markDirty();
          renderChrome(T.getState());
          renderHouse(T.getState());
        }
      }, 1400);
    });
    ["pointerup", "pointerleave", "pointercancel"].forEach(function (ev) {
      title.addEventListener(ev, function () {
        clearTimeout(pressTimer);
      });
    });
    var wrap = $("house-wrap");
    function isZoomCtl(el) {
      return !!(el && el.closest && el.closest("#zoom-dock"));
    }
    function pointerList() {
      return Object.keys(pointers);
    }
    function pinchDist() {
      var ids = pointerList();
      if (ids.length < 2) return 0;
      var a = pointers[ids[0]];
      var b = pointers[ids[1]];
      return Math.hypot(a.x - b.x, a.y - b.y);
    }
    function pinchMid() {
      var ids = pointerList();
      var a = pointers[ids[0]];
      var b = pointers[ids[1]];
      var box = wrap.getBoundingClientRect();
      return { x: (a.x + b.x) / 2 - box.left, y: (a.y + b.y) / 2 - box.top };
    }
    function beginPanFrom(id) {
      var p = pointers[id];
      if (!p) return;
      pid = id;
      pan.sx = p.x;
      pan.sy = p.y;
      pan.cx = cam.x;
      pan.cy = cam.y;
    }
    wrap.addEventListener("pointerdown", function (ev) {
      if (isZoomCtl(ev.target)) return;
      if (sheetOpen()) return;
      pointers[ev.pointerId] = { x: ev.clientX, y: ev.clientY };
      try {
        wrap.setPointerCapture(ev.pointerId);
      } catch (e) {}
      var n = pointerList().length;
      if (n === 1) {
        beginPanFrom(ev.pointerId);
        pan.moved = false;
        gesturing = false;
      } else if (n >= 2) {
        gesturing = true;
        pan.moved = true;
        pid = null;
        pinch = { dist: Math.max(1, pinchDist()), z: cam.z };
      }
    });
    wrap.addEventListener("pointermove", function (ev) {
      if (!pointers[ev.pointerId]) return;
      if (sheetOpen()) return;
      pointers[ev.pointerId].x = ev.clientX;
      pointers[ev.pointerId].y = ev.clientY;
      if (pointerList().length >= 2 && pinch) {
        var dist = pinchDist();
        if (dist > 8) {
          var mid = pinchMid();
          setZoom(pinch.z * (dist / pinch.dist), mid.x, mid.y);
        }
        return;
      }
      if (ev.pointerId !== pid) return;
      var dx = ev.clientX - pan.sx;
      var dy = ev.clientY - pan.sy;
      if (!pan.moved && Math.hypot(dx, dy) > 8) pan.moved = true;
      if (pan.moved) {
        cam.x = pan.cx + dx;
        cam.y = pan.cy + dy;
        clampCam();
      }
    });
    function endPan(ev) {
      if (!pointers[ev.pointerId]) return;
      delete pointers[ev.pointerId];
      var left = pointerList();
      if (left.length < 2) pinch = null;
      if (left.length === 1) {
        beginPanFrom(left[0]);
        pan.moved = true;
        gesturing = true;
        return;
      }
      if (ev.pointerId !== pid && left.length) return;
      var was = pan.moved || gesturing;
      pid = null;
      gesturing = false;
      if (sheetOpen()) return;
      if (was) return;
      var now = performance.now();
      if (now - lastTapAt < 300 && Math.hypot(ev.clientX - lastTapX, ev.clientY - lastTapY) < 28) {
        lastTapAt = 0;
        toggleZoom(ev);
        return;
      }
      lastTapAt = now;
      lastTapX = ev.clientX;
      lastTapY = ev.clientY;
      onParkTap(ev);
    }
    wrap.addEventListener("pointerup", endPan);
    wrap.addEventListener("pointercancel", endPan);
    wrap.addEventListener(
      "wheel",
      function (ev) {
        if (sheetOpen() || isZoomCtl(ev.target)) return;
        ev.preventDefault();
        var box = wrap.getBoundingClientRect();
        var step = ev.deltaY < 0 ? 1.12 : 1 / 1.12;
        setZoom(cam.z * step, ev.clientX - box.left, ev.clientY - box.top);
      },
      { passive: false }
    );
    function zoomBy(dir, ev) {
      if (ev) ev.stopPropagation();
      var box = wrap.getBoundingClientRect();
      setZoom(cam.z + dir * 0.25, box.width / 2, box.height / 2);
    }
    if ($("btn-zoom-in")) {
      $("btn-zoom-in").onclick = function (ev) {
        zoomBy(1, ev);
      };
      $("btn-zoom-in").addEventListener("pointerdown", function (ev) {
        ev.stopPropagation();
      });
    }
    if ($("btn-zoom-out")) {
      $("btn-zoom-out").onclick = function (ev) {
        zoomBy(-1, ev);
      };
      $("btn-zoom-out").addEventListener("pointerdown", function (ev) {
        ev.stopPropagation();
      });
    }
    document.addEventListener("visibilitychange", function () {
      T.save(T.getState());
    });
    window.addEventListener("pagehide", function () {
      T.save(T.getState());
    });
    window.addEventListener("resize", function () {
      clampCam();
      markDirty();
    });
  }

  function bootUI() {
    T.boot();
    W.reset();
    bind();
    var s = T.getState();
    renderChrome(s);
    renderHouse(s);
    W.sync(s, LOT);
    paintGuests(s);
    lastSave = performance.now();
    requestAnimationFrame(loop(performance.now()));
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("sw.js").catch(function () {});
    }
  }

  G.THUI = { boot: bootUI, render: function () { markDirty(); } };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", bootUI);
  else bootUI();
})(window);
