import { useEffect, useRef, useState } from 'react';
import PageMeta from '../components/PageMeta';
import PageHero from '../components/PageHero';
import FallbackImg from '../components/FallbackImg';
import { categorie, categorieNav } from '../data/servizi';

/* Barra delle categorie: la sezione visibile evidenzia il suo pulsante e
   la barra prende lo sfondo "vetro" solo mentre è agganciata (come in script.js). */
function CatNav() {
  const wrapRef = useRef(null);
  const navRef = useRef(null);
  const linkRefs = useRef({});
  const [attiva, setAttiva] = useState(null);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined;
    const sezioni = categorieNav
      .map((c) => document.getElementById(c.href.slice(1)))
      .filter(Boolean);
    const io = new IntersectionObserver(
      (voci) => voci.forEach((v) => v.isIntersecting && setAttiva(v.target.id)),
      { rootMargin: '-30% 0px -60% 0px' },
    );
    sezioni.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // porta al centro della barra il pulsante attivo
  useEffect(() => {
    const nav = navRef.current;
    const a = attiva && linkRefs.current[attiva];
    if (nav && a) nav.scrollTo({ left: a.offsetLeft - nav.clientWidth / 2 + a.clientWidth / 2 });
  }, [attiva]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const aggiorna = () => {
      const top = parseFloat(getComputedStyle(wrap).top) || 0;
      setStuck(wrap.getBoundingClientRect().top <= top + 1);
    };
    addEventListener('scroll', aggiorna, { passive: true });
    aggiorna();
    return () => removeEventListener('scroll', aggiorna);
  }, []);

  return (
    <div className={`cat-nav-wrap${stuck ? ' is-stuck' : ''}`} ref={wrapRef}>
      <div className="contenitore">
        <nav className="cat-nav" aria-label="Categorie di trattamenti" ref={navRef}>
          {categorieNav.map((c) => {
            const id = c.href.slice(1);
            return (
              <a
                key={id}
                href={c.href}
                ref={(el) => (linkRefs.current[id] = el)}
                aria-current={attiva === id ? 'true' : undefined}
              >
                {c.label}
              </a>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

function Voce({ v }) {
  return (
    <article className="voce">
      <div>
        <h3>{v.titolo}</h3>
        <p>{v.desc}</p>
        <div className="voce-meta">
          <span className="chip-durata">{v.durata}</span>
          {v.nota && <span className="chip-nota">{v.nota}</span>}
        </div>
      </div>
      <div className="voce-prezzo">
        <span className="price">
          {v.prezzoDa && <small>da</small>}
          {v.prezzo}
        </span>
      </div>
    </article>
  );
}

export default function Servizi() {
  return (
    <>
      <PageMeta
        title="Servizi e prezzi · Les Folies Jesolo"
        description="Trattamenti viso e corpo, ricostruzione unghie, trucco semipermanente Biotek, extension ciglia ed epilazione a Lido di Jesolo. Durata e prezzi di ogni trattamento."
      />

      <PageHero
        title={
          <>
            Trattamenti e <em>prezzi</em>
          </>
        }
        lead="Ogni trattamento indica durata e prezzo. Per i percorsi più personali, come il trucco semipermanente, la ricostruzione e l'epilazione laser, il prezzo si definisce dopo la consulenza, che è sempre gratuita."
      />

      <section className="servizi-elenco">
        <CatNav />
        <div className="contenitore">
          {categorie.map((c) => (
            <section className="categoria" id={c.id} aria-labelledby={c.titleId} key={c.id}>
              <div className="categoria-intro">
                <div className="categoria-foto">
                  <FallbackImg src={c.foto.src.startsWith('http') ? c.foto.src : `/${c.foto.src}`} alt={c.foto.alt} fallback={c.foto.fallback} />
                </div>
                <h2 id={c.titleId}>{c.titolo}</h2>
                <p>{c.intro}</p>
              </div>
              <div className="voci">
                {c.voci.map((v) => (
                  <Voce key={v.titolo} v={v} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </>
  );
}
