const header = document.getElementById("header");
addEventListener(
  "scroll",
  () => header.classList.toggle("scrolled", scrollY > 40),
  { passive: true },
);

const burger = document.getElementById("burger");
const mm = document.getElementById("mobileMenu");
const menuLinks = [...mm.querySelectorAll(".mobile-nav a")];

function setMenu(open) {
  mm.classList.toggle("open", open);
  burger.classList.toggle("open", open);
  burger.setAttribute("aria-expanded", open);
  burger.setAttribute("aria-label", open ? "Chiudi il menu" : "Apri il menu");
  mm.setAttribute("aria-hidden", !open);
  document.body.classList.toggle("menu-open", open);
  if (open) menuLinks[0]?.focus({ preventScroll: true });
  else burger.focus({ preventScroll: true });
}

burger.addEventListener("click", () => setMenu(!mm.classList.contains("open")));
mm.querySelector("[data-close]").addEventListener("click", () =>
  setMenu(false),
);
menuLinks.forEach((a) => a.addEventListener("click", () => setMenu(false)));
mm.addEventListener("keydown", (e) => {
  if (e.key !== "Tab" || !mm.classList.contains("open")) return;
  const first = menuLinks[0];
  const last = mm.querySelector(".mobile-contact a");
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
});
addEventListener("keydown", (e) => {
  if (e.key === "Escape" && mm.classList.contains("open")) setMenu(false);
});
addEventListener("resize", () => {
  if (matchMedia("(min-width: 768px)").matches && mm.classList.contains("open"))
    setMenu(false);
});

/* SLIDER RECENSIONI */
(() => {
  const track = document.querySelector(".reviews-track");
  if (!track) return;
  const slides = [...track.children];
  const prev = document.getElementById("revPrev");
  const next = document.getElementById("revNext");
  const dotsBox = document.getElementById("revDots");
  let idx = 0;
  const gap = () => parseFloat(getComputedStyle(track).gap) || 0;
  const step = () => slides[0].getBoundingClientRect().width + gap();
  const perView = () =>
    Math.max(1, Math.floor((track.clientWidth + gap()) / step() + 0.001));
  const max = () => Math.max(0, slides.length - perView());
  slides.forEach((_, i) => {
    const d = document.createElement("button");
    d.type = "button";
    d.setAttribute("role", "tab");
    d.setAttribute("aria-label", "Vai alla recensione " + (i + 1));
    d.addEventListener("click", () => go(i));
    dotsBox.appendChild(d);
  });
  const dots = [...dotsBox.children];
  function go(i) {
    idx = Math.min(Math.max(i, 0), max());
    track.style.transform = "translate3d(" + -idx * step() + "px,0,0)";
    dots.forEach((d, j) => {
      d.classList.toggle("active", j === idx);
      d.setAttribute("aria-selected", j === idx);
    });
  }
  prev.addEventListener("click", () => go(idx - 1));
  next.addEventListener("click", () => go(idx + 1));
  let startX = null;
  track.addEventListener(
    "touchstart",
    (e) => {
      startX = e.touches[0].clientX;
    },
    { passive: true },
  );
  track.addEventListener(
    "touchend",
    (e) => {
      if (startX === null) return;
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) go(idx + (dx < 0 ? 1 : -1));
      startX = null;
    },
    { passive: true },
  );
  addEventListener("resize", () => go(idx));
  go(0);
})();

/* SERVIZI: la categoria visibile evidenzia il suo pulsante nella barra */
(() => {
  const nav = document.querySelector(".cat-nav");
  if (!nav || !("IntersectionObserver" in window)) return;
  const links = [...nav.querySelectorAll("a")];
  const sezioni = links
    .map((a) => document.getElementById(a.getAttribute("href").slice(1)))
    .filter(Boolean);
  const attiva = (id) => {
    links.forEach((a) => {
      const on = a.getAttribute("href") === "#" + id;
      if (on) {
        a.setAttribute("aria-current", "true");
        nav.scrollTo({
          left: a.offsetLeft - nav.clientWidth / 2 + a.clientWidth / 2,
        });
      } else a.removeAttribute("aria-current");
    });
  };
  const io = new IntersectionObserver(
    (voci) => voci.forEach((v) => v.isIntersecting && attiva(v.target.id)),
    { rootMargin: "-30% 0px -60% 0px" },
  );
  sezioni.forEach((s) => io.observe(s));
})();

/* CONTATTI: evidenzia il giorno corrente negli orari (fuso di Roma) */
(() => {
  const lista = document.querySelector(".orari-lista");
  if (!lista) return;
  const sigla = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    timeZone: "Europe/Rome",
  }).format(new Date());
  const n = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[sigla];
  const riga = lista.querySelector('[data-giorno="' + n + '"]');
  if (riga) riga.classList.add("oggi");
})();

/* ANIMAZIONI: ingresso progressivo, solo desktop e senza sprechi */
const animLowPower =
  (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) ||
  (navigator.deviceMemory && navigator.deviceMemory <= 4);

if (animLowPower) document.documentElement.classList.add("low-power");

(() => {
  const riduci = matchMedia("(prefers-reduced-motion: reduce)");
  const desktop = matchMedia(
    "(min-width: 900px) and (hover: hover) and (pointer: fine)",
  );
  if (riduci.matches || !desktop.matches) return;

  const titoli = new Set(
    document.querySelectorAll(
      ".titolo-sezione, .features-intro h2, .pnei h2, .categoria h2, .info-card h2, .invito h2",
    ),
  );
  const media = new Set(
    document.querySelectorAll(".card-img, .categoria-foto, .mappa"),
  );
  const elementi = new Set();

  const aggiungiReveal = (el, ritardo = 0) => {
    if (!el || titoli.has(el) || media.has(el) || elementi.has(el)) return;
    elementi.add(el);
    el.style.setProperty("--reveal-delay", ritardo + "ms");
    el.classList.add("reveal");
  };

  const aggiungiGruppo = (selettore, passo = 70, massimo = 6) => {
    document.querySelectorAll(selettore).forEach((gruppo) => {
      [...gruppo.children].forEach((el, i) => {
        aggiungiReveal(el, Math.min(i, massimo) * passo);
      });
    });
  };

  let indiceTitolo = 0;
  titoli.forEach((el) => {
    el.style.setProperty(
      "--reveal-delay",
      Math.min(indiceTitolo, 4) * 40 + "ms",
    );
    el.classList.add("anim-heading");
    indiceTitolo += 1;
  });

  let indiceMedia = 0;
  media.forEach((el) => {
    el.style.setProperty(
      "--reveal-delay",
      Math.min(indiceMedia, 3) * 55 + "ms",
    );
    el.classList.add("anim-media");
    indiceMedia += 1;
  });

  aggiungiGruppo(".features-grid", 70, 3);
  aggiungiGruppo(".cards-grid", 65, 5);
  aggiungiGruppo(".pnei-list", 65, 3);
  aggiungiGruppo(".team-grid", 80, 3);
  aggiungiGruppo(".voci", 55, 4);
  aggiungiGruppo(".vie-grid", 80, 2);
  aggiungiGruppo(".orari-lista", 35, 6);
  aggiungiGruppo(".foot-grid", 80, 4);

  document.querySelectorAll(".info-card").forEach((el, i) => {
    aggiungiReveal(el, i * 80);
  });

  document
    .querySelectorAll(".about-copy, .categoria-intro")
    .forEach((gruppo) => {
      [...gruppo.children].forEach((el, i) => {
        if (titoli.has(el) || media.has(el)) return;
        aggiungiReveal(el, Math.min(i, 4) * 55);
      });
    });

  document
    .querySelectorAll(".pnei-grid > div:first-child > p")
    .forEach((el, i) => {
      aggiungiReveal(el, Math.min(i, 4) * 55);
    });

  document
    .querySelectorAll(
      ".sec-head .occhiello, .sec-head .sottotitolo, .features-kicker",
    )
    .forEach((el, i) => {
      aggiungiReveal(el, Math.min(i, 4) * 50);
    });

  document.querySelectorAll(".center-cta").forEach((el) => {
    aggiungiReveal(el, 80);
  });

  [
    [".reviews-slider", 0],
    [".reviews-nav", 120],
    [".google-badge", 180],
    [".pnei-photo", 40],
    [".about-photo", 0],
    [".social-pills", 0],
    [".foot-bottom", 380],
    [".foot-giant", 470],
  ].forEach(([selettore, ritardo]) => {
    document.querySelectorAll(selettore).forEach((el) => {
      aggiungiReveal(el, ritardo);
    });
  });

  const contenitoriTitoli = new Map();
  titoli.forEach((el) => {
    const contenitore = el.parentElement || el;
    if (!contenitoriTitoli.has(contenitore)) {
      contenitoriTitoli.set(contenitore, []);
    }
    contenitoriTitoli.get(contenitore).push(el);
  });

  const animati = new Set([
    ...contenitoriTitoli.keys(),
    ...media,
    ...elementi,
  ]);
  if (!animati.size) return;

  const segnaVisibile = (el) => {
    el.classList.add("is-visible");
    contenitoriTitoli.get(el)?.forEach((titolo) => {
      titolo.classList.add("is-visible");
    });
  };

  let osservatore = null;

  if ("IntersectionObserver" in window) {
    osservatore = new IntersectionObserver(
      (voci) => {
        voci.forEach((voce) => {
          if (!voce.isIntersecting) return;
          segnaVisibile(voce.target);
          osservatore.unobserve(voce.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -3% 0px" },
    );
    animati.forEach((el) => osservatore.observe(el));
  } else {
    [...titoli].forEach((el) => el.classList.add("is-visible"));
    animati.forEach((el) => el.classList.add("is-visible"));
  }

  if (!osservatore) return;

  let ticking = false;
  const mostraSuperati = () => {
    titoli.forEach((el) => {
      if (el.getBoundingClientRect().bottom < 0) {
        el.classList.add("is-visible");
      }
    });
    animati.forEach((el) => {
      if (el.classList.contains("is-visible")) return;
      if (el.getBoundingClientRect().bottom < 0) {
        segnaVisibile(el);
        osservatore.unobserve(el);
      }
    });
  };
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      mostraSuperati();
    });
  };

  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll, { passive: true });
  addEventListener("load", mostraSuperati, { once: true });
  mostraSuperati();
  requestAnimationFrame(mostraSuperati);
})();

/* HERO: spostamento leggerissimo legato al puntatore */
(() => {
  const hero = document.querySelector(".hero");
  if (!hero || animLowPower) return;
  if (
    !matchMedia("(min-width: 900px) and (hover: hover) and (pointer: fine)")
      .matches ||
    matchMedia("(prefers-reduced-motion: reduce)").matches
  )
    return;

  let frame = 0;
  let x = 0;
  let y = 0;

  const disegna = () => {
    frame = 0;
    hero.style.setProperty("--hero-bg-x", (x * 10).toFixed(2) + "px");
    hero.style.setProperty("--hero-bg-y", (y * 8).toFixed(2) + "px");
    hero.style.setProperty("--hero-x", (x * 4).toFixed(2) + "px");
    hero.style.setProperty("--hero-y", (y * 3).toFixed(2) + "px");
  };

  hero.addEventListener(
    "pointermove",
    (evento) => {
      const rect = hero.getBoundingClientRect();
      x = Math.min(
        1,
        Math.max(-1, ((evento.clientX - rect.left) / rect.width) * 2 - 1),
      );
      y = Math.min(
        1,
        Math.max(-1, ((evento.clientY - rect.top) / rect.height) * 2 - 1),
      );
      if (!frame) frame = requestAnimationFrame(disegna);
    },
    { passive: true },
  );

  hero.addEventListener("pointerleave", () => {
    if (frame) {
      cancelAnimationFrame(frame);
      frame = 0;
    }
    ["--hero-bg-x", "--hero-bg-y", "--hero-x", "--hero-y"].forEach((p) =>
      hero.style.removeProperty(p),
    );
  });
})();

(() => {
  const preciso = matchMedia(
    "(min-width: 900px) and (hover: hover) and (pointer: fine)",
  );
  const riduci = matchMedia("(prefers-reduced-motion: reduce)");
  if (animLowPower || !preciso.matches || riduci.matches) return;

  document
    .querySelectorAll(".features--atelier .feature-card")
    .forEach((card) => {
      let frame = 0;

      const muovi = (evento) => {
        if (frame) return;
        frame = requestAnimationFrame(() => {
          frame = 0;
          const rect = card.getBoundingClientRect();
          const px = Math.min(
            1,
            Math.max(0, (evento.clientX - rect.left) / rect.width),
          );
          const py = Math.min(
            1,
            Math.max(0, (evento.clientY - rect.top) / rect.height),
          );
          card.style.setProperty("--mx", (px * 100).toFixed(2) + "%");
          card.style.setProperty("--my", (py * 100).toFixed(2) + "%");
          card.style.setProperty("--ry", ((px - 0.5) * 7).toFixed(2) + "deg");
          card.style.setProperty("--rx", ((0.5 - py) * 7).toFixed(2) + "deg");
          card.classList.add("is-tilting");
        });
      };

      const reset = () => {
        if (frame) {
          cancelAnimationFrame(frame);
          frame = 0;
        }
        card.classList.remove("is-tilting");
        ["--rx", "--ry", "--mx", "--my"].forEach((p) =>
          card.style.removeProperty(p),
        );
      };

      card.addEventListener("pointermove", muovi);
      card.addEventListener("pointerleave", reset);
    });
})();
