const header = document.getElementById('header');
addEventListener('scroll', () => header.classList.toggle('scrolled', scrollY > 40), { passive: true });

const burger = document.getElementById('burger');
const mm = document.getElementById('mobileMenu');

function setMenu(open) {
  mm.classList.toggle('open', open);
  burger.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
  burger.setAttribute('aria-label', open ? 'Chiudi il menu' : 'Apri il menu');
  mm.setAttribute('aria-hidden', !open);
  document.body.classList.toggle('menu-open', open);
}

burger.addEventListener('click', () => setMenu(!mm.classList.contains('open')));
mm.querySelector('[data-close]').addEventListener('click', () => setMenu(false));
mm.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
addEventListener('keydown', e => {
  if (e.key === 'Escape' && mm.classList.contains('open')) setMenu(false);
});

/* SLIDER RECENSIONI */
(() => {
  const track = document.querySelector('.reviews-track');
  if (!track) return;
  const slides = [...track.children];
  const prev = document.getElementById('revPrev');
  const next = document.getElementById('revNext');
  const dotsBox = document.getElementById('revDots');
  let idx = 0;
  const gap = () => parseFloat(getComputedStyle(track).gap) || 0;
  const step = () => slides[0].getBoundingClientRect().width + gap();
  const perView = () => Math.max(1, Math.floor((track.clientWidth + gap()) / step() + 0.001));
  const max = () => Math.max(0, slides.length - perView());
  slides.forEach((_, i) => {
    const d = document.createElement('button');
    d.type = 'button';
    d.setAttribute('role', 'tab');
    d.setAttribute('aria-label', 'Vai alla recensione ' + (i + 1));
    d.addEventListener('click', () => go(i));
    dotsBox.appendChild(d);
  });
  const dots = [...dotsBox.children];
  function go(i) {
    idx = Math.min(Math.max(i, 0), max());
    track.style.transform = 'translate3d(' + (-idx * step()) + 'px,0,0)';
    dots.forEach((d, j) => {
      d.classList.toggle('active', j === idx);
      d.setAttribute('aria-selected', j === idx);
    });
  }
  prev.addEventListener('click', () => go(idx - 1));
  next.addEventListener('click', () => go(idx + 1));
  let startX = null;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) go(idx + (dx < 0 ? 1 : -1));
    startX = null;
  }, { passive: true });
  addEventListener('resize', () => go(idx));
  go(0);
})();
