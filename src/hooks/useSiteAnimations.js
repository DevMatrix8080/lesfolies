import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/* ------------------------------------------------------------------ *
 *  Animazioni "di contorno" del sito, portate 1:1 da script.js:
 *   · ingresso progressivo di titoli, media e gruppi (solo desktop)
 *   · spostamento leggero dell'hero legato al puntatore
 *   · inclinazione 3D delle card "atelier"
 *  Agganciano le classi legacy (.reveal, .anim-heading, .anim-media,
 *  .is-visible…) agli elementi della pagina corrente e le tolgono
 *  quando si cambia pagina.
 * ------------------------------------------------------------------ */

const lowPower =
  typeof navigator !== 'undefined' &&
  ((navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) ||
    (navigator.deviceMemory && navigator.deviceMemory <= 4));

if (lowPower && typeof document !== 'undefined') {
  document.documentElement.classList.add('low-power');
}

const DESKTOP = '(min-width: 900px) and (hover: hover) and (pointer: fine)';

function initReveal() {
  const riduci = matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = matchMedia(DESKTOP);
  if (riduci.matches || !desktop.matches) return () => {};

  const cleanups = [];
  const touched = new Set();
  const titoli = new Set(
    document.querySelectorAll(
      '.titolo-sezione, .features-intro h2, .pnei h2, .categoria h2, .info-card h2, .invito h2',
    ),
  );
  const media = new Set(document.querySelectorAll('.card-img, .categoria-foto, .mappa'));
  const elementi = new Set();

  const aggiungiReveal = (el, ritardo = 0) => {
    if (!el || titoli.has(el) || media.has(el) || elementi.has(el)) return;
    elementi.add(el);
    touched.add(el);
    el.style.setProperty('--reveal-delay', ritardo + 'ms');
    el.classList.add('reveal');
  };

  const aggiungiGruppo = (selettore, passo = 70, massimo = 6) => {
    document.querySelectorAll(selettore).forEach((gruppo) => {
      [...gruppo.children].forEach((el, i) => aggiungiReveal(el, Math.min(i, massimo) * passo));
    });
  };

  let indiceTitolo = 0;
  titoli.forEach((el) => {
    touched.add(el);
    el.style.setProperty('--reveal-delay', Math.min(indiceTitolo, 4) * 40 + 'ms');
    el.classList.add('anim-heading');
    indiceTitolo += 1;
  });

  let indiceMedia = 0;
  media.forEach((el) => {
    touched.add(el);
    el.style.setProperty('--reveal-delay', Math.min(indiceMedia, 3) * 55 + 'ms');
    el.classList.add('anim-media');
    indiceMedia += 1;
  });

  aggiungiGruppo('.features-grid', 70, 3);
  aggiungiGruppo('.cards-grid', 65, 5);
  aggiungiGruppo('.pnei-list', 65, 3);
  aggiungiGruppo('.team-grid', 80, 3);
  aggiungiGruppo('.voci', 55, 4);
  aggiungiGruppo('.vie-grid', 80, 2);
  aggiungiGruppo('.orari-lista', 35, 6);
  aggiungiGruppo('.foot-grid', 80, 4);

  document.querySelectorAll('.info-card').forEach((el, i) => aggiungiReveal(el, i * 80));

  document.querySelectorAll('.about-copy, .categoria-intro').forEach((gruppo) => {
    [...gruppo.children].forEach((el, i) => {
      if (titoli.has(el) || media.has(el)) return;
      aggiungiReveal(el, Math.min(i, 4) * 55);
    });
  });

  document.querySelectorAll('.pnei-grid > div:first-child > p').forEach((el, i) => {
    aggiungiReveal(el, Math.min(i, 4) * 55);
  });

  document
    .querySelectorAll('.sec-head .occhiello, .sec-head .sottotitolo, .features-kicker')
    .forEach((el, i) => aggiungiReveal(el, Math.min(i, 4) * 50));

  document.querySelectorAll('.center-cta').forEach((el) => aggiungiReveal(el, 80));

  [
    ['.reviews-slider', 0],
    ['.reviews-nav', 120],
    ['.google-badge', 180],
    ['.pnei-photo', 40],
    ['.about-photo', 0],
    ['.social-pills', 0],
    ['.foot-bottom', 380],
    ['.foot-giant', 470],
  ].forEach(([selettore, ritardo]) => {
    document.querySelectorAll(selettore).forEach((el) => aggiungiReveal(el, ritardo));
  });

  const contenitoriTitoli = new Map();
  titoli.forEach((el) => {
    const contenitore = el.parentElement || el;
    if (!contenitoriTitoli.has(contenitore)) contenitoriTitoli.set(contenitore, []);
    contenitoriTitoli.get(contenitore).push(el);
  });

  const animati = new Set([...contenitoriTitoli.keys(), ...media, ...elementi]);

  const undo = () => {
    touched.forEach((el) => {
      el.classList.remove('reveal', 'anim-heading', 'anim-media', 'is-visible');
      el.style.removeProperty('--reveal-delay');
    });
    contenitoriTitoli.forEach((_, el) => el.classList.remove('is-visible'));
  };
  cleanups.push(undo);
  if (!animati.size) return () => cleanups.forEach((f) => f());

  const segnaVisibile = (el) => {
    el.classList.add('is-visible');
    contenitoriTitoli.get(el)?.forEach((titolo) => titolo.classList.add('is-visible'));
  };

  const osservatore = new IntersectionObserver(
    (voci) => {
      voci.forEach((voce) => {
        if (!voce.isIntersecting) return;
        segnaVisibile(voce.target);
        osservatore.unobserve(voce.target);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -3% 0px' },
  );
  animati.forEach((el) => osservatore.observe(el));
  cleanups.push(() => osservatore.disconnect());

  let ticking = false;
  let raf = 0;
  const mostraSuperati = () => {
    titoli.forEach((el) => {
      if (el.getBoundingClientRect().bottom < 0) el.classList.add('is-visible');
    });
    animati.forEach((el) => {
      if (el.classList.contains('is-visible')) return;
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

  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll, { passive: true });
  addEventListener('load', mostraSuperati, { once: true });
  cleanups.push(() => {
    removeEventListener('scroll', onScroll);
    removeEventListener('resize', onScroll);
    removeEventListener('load', mostraSuperati);
    cancelAnimationFrame(raf);
  });
  mostraSuperati();
  raf = requestAnimationFrame(mostraSuperati);

  return () => cleanups.reverse().forEach((f) => f());
}

function initHeroPointer() {
  const hero = document.querySelector('.hero');
  if (!hero || lowPower) return () => {};
  if (!matchMedia(DESKTOP).matches || matchMedia('(prefers-reduced-motion: reduce)').matches)
    return () => {};

  let frame = 0;
  let x = 0;
  let y = 0;
  const props = ['--hero-bg-x', '--hero-bg-y', '--hero-x', '--hero-y'];

  const disegna = () => {
    frame = 0;
    hero.style.setProperty('--hero-bg-x', (x * 10).toFixed(2) + 'px');
    hero.style.setProperty('--hero-bg-y', (y * 8).toFixed(2) + 'px');
    hero.style.setProperty('--hero-x', (x * 4).toFixed(2) + 'px');
    hero.style.setProperty('--hero-y', (y * 3).toFixed(2) + 'px');
  };
  const onMove = (evento) => {
    const rect = hero.getBoundingClientRect();
    x = Math.min(1, Math.max(-1, ((evento.clientX - rect.left) / rect.width) * 2 - 1));
    y = Math.min(1, Math.max(-1, ((evento.clientY - rect.top) / rect.height) * 2 - 1));
    if (!frame) frame = requestAnimationFrame(disegna);
  };
  const onLeave = () => {
    if (frame) {
      cancelAnimationFrame(frame);
      frame = 0;
    }
    props.forEach((p) => hero.style.removeProperty(p));
  };
  hero.addEventListener('pointermove', onMove, { passive: true });
  hero.addEventListener('pointerleave', onLeave);
  return () => {
    hero.removeEventListener('pointermove', onMove);
    hero.removeEventListener('pointerleave', onLeave);
    onLeave();
  };
}

function initCardTilt() {
  const preciso = matchMedia(DESKTOP);
  const riduci = matchMedia('(prefers-reduced-motion: reduce)');
  if (lowPower || !preciso.matches || riduci.matches) return () => {};

  const cleanups = [];
  document.querySelectorAll('.features--atelier .feature-card').forEach((card) => {
    let frame = 0;
    const props = ['--rx', '--ry', '--mx', '--my'];

    const muovi = (evento) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const rect = card.getBoundingClientRect();
        const px = Math.min(1, Math.max(0, (evento.clientX - rect.left) / rect.width));
        const py = Math.min(1, Math.max(0, (evento.clientY - rect.top) / rect.height));
        card.style.setProperty('--mx', (px * 100).toFixed(2) + '%');
        card.style.setProperty('--my', (py * 100).toFixed(2) + '%');
        card.style.setProperty('--ry', ((px - 0.5) * 7).toFixed(2) + 'deg');
        card.style.setProperty('--rx', ((0.5 - py) * 7).toFixed(2) + 'deg');
        card.classList.add('is-tilting');
      });
    };
    const reset = () => {
      if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
      card.classList.remove('is-tilting');
      props.forEach((p) => card.style.removeProperty(p));
    };
    card.addEventListener('pointermove', muovi);
    card.addEventListener('pointerleave', reset);
    cleanups.push(() => {
      card.removeEventListener('pointermove', muovi);
      card.removeEventListener('pointerleave', reset);
      reset();
    });
  });
  return () => cleanups.forEach((f) => f());
}

/** Da montare una volta nel Layout: si riesegue a ogni cambio pagina. */
export default function useSiteAnimations() {
  const { pathname } = useLocation();
  useEffect(() => {
    const stops = [initReveal(), initHeroPointer(), initCardTilt()];
    return () => stops.forEach((stop) => stop());
  }, [pathname]);
}
