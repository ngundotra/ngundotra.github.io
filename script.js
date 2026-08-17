(function () {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const tickets = Array.from(document.querySelectorAll(".ticket"));
  const rooms = Array.from(document.querySelectorAll(".room[data-room]"));

  function setActive(id) {
    tickets.forEach((ticket) => {
      ticket.classList.toggle("is-active", ticket.dataset.room === id);
    });
  }

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.dataset.room);
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0.1, 0.25, 0.5] }
    );
    rooms.forEach((room) => observer.observe(room));
  }

  document.querySelectorAll("[data-gallery]").forEach((gallery) => {
    const hero = gallery.querySelector(".frame--hero img");
    const caption = gallery.querySelector(".frame--hero figcaption");
    const thumbs = Array.from(gallery.querySelectorAll(".thumb"));

    thumbs.forEach((thumb) => {
      thumb.addEventListener("click", () => {
        hero.src = thumb.dataset.src;
        hero.alt = thumb.dataset.alt;
        caption.textContent = thumb.dataset.caption;
        thumbs.forEach((other) => {
          const on = other === thumb;
          other.classList.toggle("is-active", on);
          other.setAttribute("aria-pressed", on ? "true" : "false");
        });
      });
    });
  });

  if (reduceMotion) return;

  const canvas = document.getElementById("ink");
  if (!canvas || !canvas.getContext) return;

  const ctx = canvas.getContext("2d");
  const points = [];
  let width = 0;
  let height = 0;
  let dpr = 1;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    const now = performance.now();
    for (let i = points.length - 1; i >= 0; i -= 1) {
      if (now - points[i].t > 1400) points.splice(i, 1);
    }
    if (points.length > 1) {
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      for (let i = 1; i < points.length; i += 1) {
        const prev = points[i - 1];
        const point = points[i];
        const age = (now - point.t) / 1400;
        ctx.strokeStyle = `rgba(212, 168, 83, ${0.42 * (1 - age)})`;
        ctx.lineWidth = 1.15 + (1 - age) * 1.1;
        ctx.beginPath();
        ctx.moveTo(prev.x, prev.y);
        ctx.lineTo(point.x, point.y);
        ctx.stroke();
      }
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener("pointermove", (event) => {
    points.push({ x: event.clientX, y: event.clientY, t: performance.now() });
    if (points.length > 80) points.shift();
  });

  window.addEventListener("resize", resize);
  resize();
  requestAnimationFrame(draw);
})();
