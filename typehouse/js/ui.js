/* Typehouse UI — portrait phone, sheets, dock, blotter. */
(function (G) {
  const T = G.Typehouse;
  const D = G.THData;
  const S = G.THSprites;
  var selected = null;
  var mode = "none";
  var assignId = null;
  var frame = 0;
  var lastSave = 0;
  var pressTimer = 0;
  var lastWallet = { tally: 12, scrap: 6, dust: 0 };

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

  function cellSize(s) {
    var wrap = $("house-wrap");
    var maxW = Math.min(wrap.clientWidth - 16, 400);
    var maxH = wrap.clientHeight - 28;
    var cell = Math.floor(Math.min(maxW / s.gridW, maxH / s.gridH));
    return Math.max(56, Math.min(86, cell));
  }

  function renderHouse(s) {
    var house = $("house");
    var size = cellSize(s);
    house.style.width = s.gridW * size + "px";
    house.style.height = s.gridH * size + "px";
    house.style.gridTemplateColumns = "repeat(" + s.gridW + ", " + size + "px)";
    house.style.gridTemplateRows = "repeat(" + s.gridH + ", " + size + "px)";

    var existing = {};
    Array.prototype.forEach.call(house.children, function (n) {
      existing[n.dataset.k] = n;
    });
    var keep = {};

    for (var y = s.gridH - 1; y >= 0; y--) {
      for (var x = 0; x < s.gridW; x++) {
        var k = T.key(x, y);
        keep[k] = true;
        var node = existing[k];
        if (!node) {
          node = document.createElement("button");
          node.type = "button";
          node.className = "cell";
          node.dataset.k = k;
          node.dataset.x = x;
          node.dataset.y = y;
          node.innerHTML =
            '<canvas class="tile"></canvas><canvas class="who"></canvas><span class="plus">+</span><span class="ticks"></span>';
          node.addEventListener("click", onCell);
          house.appendChild(node);
        }
        node.style.order = s.gridH - 1 - y;
        node.style.width = size + "px";
        node.style.height = size + "px";
        paintCell(s, node, x, y, size);
      }
    }
    Object.keys(existing).forEach(function (k) {
      if (!keep[k]) existing[k].remove();
    });

    renderPips(s, size);
  }

  function paintCell(s, node, x, y, size) {
    var c = T.cell(s, x, y);
    var tile = node.querySelector(".tile");
    var who = node.querySelector(".who");
    var plus = node.querySelector(".plus");
    var ticks = node.querySelector(".ticks");
    tile.width = size;
    tile.height = size;
    var gsz = Math.max(24, Math.floor(size * 0.42));
    who.width = gsz;
    who.height = gsz;
    node.classList.toggle("on", selKey() === T.key(x, y));
    node.classList.toggle("lobby", c.room === "lobby");
    plus.hidden = !!c.room;

    if (!c.room) {
      S.paintEmpty(tile);
      who.hidden = true;
      ticks.innerHTML = "";
      return;
    }
    var d = c.denizen ? T.denizen(s, c.denizen) : null;
    var info = d ? T.yieldMult(s, d, c) : { home: false, nourish: 0, friction: 0 };
    S.paintRoom(tile, c.room, {
      level: c.level,
      haunted: c.haunted,
      leaking: c.leaking,
      unpowered: c.unpowered,
      home: !!(d && info.home),
    });
    if (d) {
      who.hidden = false;
      S.paintGuest(who, d.kind, frame);
    } else {
      who.hidden = true;
    }
    var bits = "";
    if (d && info.home) bits += '<i class="tick home" title="HOME"></i>';
    if (d && info.nourish > 0) bits += '<i class="tick nourish" title="NOURISH"></i>';
    if (d && info.friction > 0) bits += '<i class="tick friction" title="FRICTION"></i>';
    if (c.haunted) bits += '<i class="tick haunt" title="HAUNTED"></i>';
    ticks.innerHTML = bits;
  }

  function renderPips(s, size) {
    var layer = $("pips");
    layer.innerHTML = "";
    var house = $("house");
    var rect = house.getBoundingClientRect();
    var wrap = $("house-wrap").getBoundingClientRect();
    s.pips.slice(-8).forEach(function (p, i) {
      var age = s.openSec - p.t;
      if (age > 2) return;
      var el = document.createElement("div");
      el.className = "pip " + p.res;
      el.textContent = (p.res === "tally" ? "+" : p.res === "scrap" ? "s+" : "h+") + fmtRate(p.amt);
      el.style.left = rect.left - wrap.left + p.x * size + size * 0.35 + "px";
      el.style.top = rect.top - wrap.top + (s.gridH - 1 - p.y) * size + size * 0.15 - age * 10 + "px";
      layer.appendChild(el);
    });
  }

  function renderBlotter(s) {
    $("blotter").textContent = s.blotter || "";
    var wait = T.waiting(s);
    var strip = $("lobby-strip");
    strip.innerHTML = "";
    if (!wait.length) {
      strip.hidden = true;
      return;
    }
    strip.hidden = false;
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
        renderAll();
      });
      strip.appendChild(b);
    });
  }

  function openAssignHint(s, d) {
    var def = D.DENIZENS[d.kind];
    $("context").innerHTML =
      "<b>ASSIGN " +
      d.kind +
      "</b> · wants " +
      def.wants.join(" / ") +
      " · tap a room";
  }

  function renderContext(s) {
    if (mode === "assign" && assignId) return;
    if (!selected) {
      $("context").innerHTML = "<b>TYPEHOUSE</b> · tap a cell · we ask which room";
      return;
    }
    var c = T.cell(s, selected.x, selected.y);
    if (!c.room) {
      $("context").innerHTML = "<b>EMPTY</b> " + selected.x + "," + selected.y + " · BUILD";
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

  function onCell(ev) {
    var x = parseInt(ev.currentTarget.dataset.x, 10);
    var y = parseInt(ev.currentTarget.dataset.y, 10);
    var s = T.getState();
    selected = { x: x, y: y };
    var c = T.cell(s, x, y);
    if (mode === "assign" && assignId) {
      var msg = T.place(s, assignId, x, y);
      if (msg === "ok") {
        assignId = null;
        mode = "none";
        openInspect(s, c);
      } else {
        s.blotter = msg;
      }
      renderAll();
      return;
    }
    if (mode === "build" && !c.room) {
      openBuild(s, c);
      return;
    }
    if (!c.room) openBuild(s, c);
    else openInspect(s, c);
    renderAll();
  }

  function costLine(cost) {
    var bits = [];
    if (cost.tally) bits.push(cost.tally + " tally");
    if (cost.scrap) bits.push(cost.scrap + " scrap");
    if (cost.dust) bits.push(cost.dust + " dust");
    return bits.join(" · ") || "free";
  }

  function openBuild(s, c) {
    var onboardHearth = s.onboard === 0;
    var rooms = Object.keys(D.ROOMS).filter(function (id) {
      if (id === "lobby") return false;
      if (onboardHearth) return id === "hearth";
      return T.canUnlock(s, id);
    });
    var html = '<div class="sheet-h">BUILD</div><p class="sheet-p">Empty cell ' + c.x + "," + c.y + ". One room. No demolish.</p>";
    html += '<div class="build-list">';
    rooms.forEach(function (id) {
      var def = D.ROOMS[id];
      var ok = T.canPay(s, def.cost);
      var adjOk = true;
      if (onboardHearth && id === "hearth") adjOk = Math.abs(c.x - 1) + Math.abs(c.y - 0) === 1;
      html +=
        '<button class="build-card" data-kind="' +
        id +
        '" ' +
        (!ok || !adjOk ? "disabled" : "") +
        '><span class="dot" style="background:' +
        (D.TYPE_COLOR[def.type] || D.PAL.copper) +
        '"></span><b>' +
        def.name.toUpperCase() +
        "</b><small>" +
        def.blurb +
        "</small><em>" +
        costLine(def.cost) +
        (!adjOk ? " · beside lobby" : "") +
        "</em></button>";
    });
    html += "</div>";
    if (s.onboard > 0) {
      html += '<div class="row">';
      if (!s.expandRow) html += '<button class="fat ghost" id="exp-row">+ ROW · 40 scrap</button>';
      if (!s.expandCol) html += '<button class="fat ghost" id="exp-col">+ COL · 40 scrap</button>';
      html += "</div>";
    }
    showSheet(html);
    Array.prototype.forEach.call(document.querySelectorAll(".build-card"), function (btn) {
      btn.addEventListener("click", function () {
        var msg = T.build(s, c.x, c.y, btn.dataset.kind);
        if (msg === "ok") {
          hideSheet();
          selected = { x: c.x, y: c.y };
          openInspect(s, T.cell(s, c.x, c.y));
        } else s.blotter = msg;
        renderAll();
      });
    });
    if ($("exp-row"))
      $("exp-row").onclick = function () {
        s.blotter = T.expand(s, "row");
        hideSheet();
        renderAll();
      };
    if ($("exp-col"))
      $("exp-col").onclick = function () {
        s.blotter = T.expand(s, "col");
        hideSheet();
        renderAll();
      };
  }

  function openInspect(s, c) {
    var def = D.ROOMS[c.room];
    if (c.room === "lobby" && s.onboard === 0) {
      showSheet(
        '<div class="sheet-h">LOBBY</div><p class="sheet-p">The night desk is open. First job: a Hearth beside this cell. Prefer 1,1.</p><button class="fat" id="do-hearth">BUILD A HEARTH</button><button class="fat ghost" disabled>SEAT</button>'
      );
      $("do-hearth").onclick = function () {
        mode = "build";
        selected = null;
        hideSheet();
        $("context").innerHTML = "<b>BUILD HEARTH</b> · tap a cell beside the Lobby";
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
      html += "<small>wants " + gdef.wants.join(" / ") + "</small></div></div>";
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
      html += "<p class='sheet-p'>" + T.waiting(s).length + " waiting. Tap a face below, then a room.</p>";
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
        if (msg === "ok") openInspect(s, T.cell(s, c.x, c.y));
        else s.blotter = msg;
        renderAll();
      };
    if ($("do-up"))
      $("do-up").onclick = function () {
        var msg = T.upgrade(s, c.x, c.y);
        if (msg !== "ok") s.blotter = msg;
        openInspect(s, T.cell(s, c.x, c.y));
        renderAll();
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
        renderAll();
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
    if (r.event) html += '<p class="sheet-p">The house kept an opinion.</p>';
    html += '<button class="fat" id="recap-ok">I SEE</button>';
    showSheet(html, "event");
    $("recap-ok").onclick = function () {
      T.dismissRecap();
      $("sheet").className = "sheet";
      $("dim").classList.remove("on");
      renderAll();
    };
  }

  function openHelp(s) {
    var bag = T.sumYield(s);
    var html =
      '<div class="sheet-h">BLOTTER</div><p class="sheet-p">We do not ask what they are. We ask which room.</p>' +
      '<p class="sheet-p">Tally / Scrap / Hush-dust. Types press types. HOME is a rug. FRICTION is an ember tick. NOURISH is moss.</p>' +
      '<p class="sheet-p">Live house: ' +
      fmtRate(bag.tally) +
      " tally/s. Open " +
      Math.floor(s.openSec) +
      "s. Rooms " +
      T.roomCount(s) +
      ".</p>";
    if (s.flags.hint) html += '<p class="sheet-p">Hint: ' + s.flags.hint + "</p>";
    html += '<p class="sheet-p muted">Long-press TYPEHOUSE to reset. Offline. No accounts.</p>';
    html += '<button class="fat" id="help-ok">BACK TO THE DESK</button>';
    showSheet(html);
    $("help-ok").onclick = hideSheet;
  }

  function renderAll() {
    var s = T.getState();
    if (!s) return;
    renderWallet(s);
    renderWeather(s);
    renderHouse(s);
    renderBlotter(s);
    renderContext(s);
    renderDock();
    var toast = $("toast");
    if (s.toast) {
      toast.hidden = false;
      toast.textContent = s.toast.text;
    } else toast.hidden = true;
    if (s.recap) openRecap(s);
    else if (s.pendingEvent) openEvent(s);
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
      renderAll();
      requestAnimationFrame(loop(t));
    };
  }

  function bind() {
    $("btn-build").onclick = function () {
      mode = mode === "build" ? "none" : "build";
      assignId = null;
      $("context").innerHTML = mode === "build" ? "<b>BUILD</b> · tap an empty cell" : "";
      renderDock();
    };
    $("btn-assign").onclick = function () {
      var s = T.getState();
      var w = T.waiting(s);
      if (!w.length) {
        s.blotter = "No one waiting in the lobby void.";
        renderAll();
        return;
      }
      mode = "assign";
      assignId = w[0].id;
      openAssignHint(s, w[0]);
      renderDock();
      renderAll();
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
        if (confirm("New house? The current inn is forgotten.")) {
          T.reset();
          selected = null;
          hideSheet();
          renderAll();
        }
      }, 1400);
    });
    ["pointerup", "pointerleave", "pointercancel"].forEach(function (ev) {
      title.addEventListener(ev, function () {
        clearTimeout(pressTimer);
      });
    });
    document.addEventListener("visibilitychange", function () {
      T.save(T.getState());
    });
    window.addEventListener("pagehide", function () {
      T.save(T.getState());
    });
    window.addEventListener("resize", renderAll);
  }

  function bootUI() {
    T.boot();
    bind();
    renderAll();
    lastSave = performance.now();
    requestAnimationFrame(loop(performance.now()));
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("sw.js").catch(function () {});
    }
  }

  G.THUI = { boot: bootUI, render: renderAll };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", bootUI);
  else bootUI();
})(window);
