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
