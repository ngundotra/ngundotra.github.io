(function () {
  const tickets = Array.from(document.querySelectorAll(".ticket"));
  const panels = Array.from(document.querySelectorAll(".panel[data-section]"));

  function setActive(id) {
    tickets.forEach((ticket) => {
      ticket.classList.toggle("is-active", ticket.dataset.section === id);
    });
  }

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.dataset.section);
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0.1, 0.25, 0.5] }
    );
    panels.forEach((panel) => observer.observe(panel));
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
})();
