import { Link } from 'react-router-dom';
import { contatti, menu, orari } from '../data/site';

/* ------------------------------------------------------------------ *
 *  Footer (Tailwind)
 *  Le classi `foot-*` restano come "ganci" per useSiteAnimations
 *  (ingresso progressivo allo scroll, solo desktop).
 * ------------------------------------------------------------------ */

const listBase = 'flex list-none flex-col text-[.9rem] text-[rgba(255,255,255,.62)]';
const listLink =
  'inline-flex items-center gap-2 py-[.38rem] [transition:color_.25s,transform_.25s_var(--ease)] hover:text-white';

const h4 =
  'mb-[1.35rem] block font-text text-[.7rem] font-medium uppercase tracking-[.18em] text-[rgba(248,221,227,.5)]';

const socialLink =
  "group/s flex size-[2.6rem] items-center justify-center rounded-full border border-[rgba(255,255,255,.16)] bg-transparent " +
  "[transition:transform_.35s_var(--ease),background_.3s,border-color_.3s] motion-reduce:transition-none " +
  "hover:border-[rgba(255,255,255,.35)] hover:bg-[rgba(255,255,255,.08)] hover:[transform:translateY(-3px)] " +
  "hover:shadow-[0_14px_24px_-10px_rgba(217,106,146,.75)] active:[transform:scale(.93)]";
const socialSvg = 'size-4 opacity-80 [transition:opacity_.3s] group-hover/s:opacity-100';

const Pin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-[14px]">
    <path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11z" />
    <circle cx="12" cy="10" r="2.6" />
  </svg>
);
const Phone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-[14px]">
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.8a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.8 2.1z" />
  </svg>
);
const Mail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-[14px]">
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="m3.5 7 8.5 6 8.5-6" />
  </svg>
);

function ContactItem({ href, external, icon, children }) {
  return (
    <li>
      <a
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener' } : {})}
        className={`group/c ${listLink} items-start gap-3 py-[.42rem] leading-[1.55]`}
      >
        <span
          aria-hidden="true"
          className="mt-[.2rem] grid size-[1.05rem] flex-none place-items-center text-[rgba(230,203,149,.72)] [transition:color_.3s_ease] group-hover/c:text-champagne-light"
        >
          {icon}
        </span>
        <span>{children}</span>
      </a>
    </li>
  );
}

export default function Footer() {
  return (
    <footer
      id="contatti"
      className={
        "relative isolate overflow-hidden pt-[clamp(4.5rem,8vw,6.5rem)] text-white " +
        "rounded-t-[clamp(1.75rem,4vw,3.25rem)] " +
        "bg-[radial-gradient(65%_65%_at_88%_0%,rgba(194,74,114,.17),transparent_68%),linear-gradient(180deg,#1B0D15_0%,var(--color-plum-dark)_48%,var(--color-plum)_100%)] " +
        "[&_:focus-visible]:outline-champagne-light " +
        // filetto dorato in alto
        "before:pointer-events-none before:absolute before:top-0 before:left-1/2 before:h-px before:w-[min(88%,68rem)] before:content-[''] " +
        "before:[transform:translateX(-50%)] before:bg-[linear-gradient(90deg,transparent,rgba(230,203,149,.55),transparent)] " +
        // alone che "respira"
        "after:pointer-events-none after:absolute after:-top-80 after:-right-48 after:-z-1 after:size-[36rem] after:rounded-full after:content-[''] " +
        "after:bg-[radial-gradient(circle,rgba(208,124,151,.16),transparent_70%)] after:blur-[24px] anim:after:animate-respiro-footer"
      }
    >
      <div className="contenitore relative z-1">
        <div
          className={
            "foot-grid relative grid grid-cols-1 gap-x-10 gap-y-[2.8rem] max-[767px]:gap-8 " +
            "min-[640px]:grid-cols-[repeat(2,minmax(0,1fr))] min-[980px]:grid-cols-[1.6fr_.8fr_1.15fr_1fr] min-[980px]:gap-[clamp(2rem,4vw,4rem)]"
          }
        >
          <div className="foot-brand min-[640px]:col-span-full min-[980px]:col-auto">
            <Link to="/" className="group/brand flex flex-none items-center">
              <img
                src="/images/logo/logo.png"
                alt="Les Folies"
                className="h-11 w-auto opacity-[.92] [filter:brightness(0)_invert(1)] [transition:filter_.35s_ease,height_.35s_var(--ease),transform_.35s_var(--ease)] group-hover/brand:[transform:translateY(-1px)_scale(1.015)]"
              />
              <span className="ml-[.8rem] inline-flex flex-col leading-[1.1]">
                <b className="font-display text-[1.65rem] font-normal">Les Folies</b>
                <span className="text-[.7rem] uppercase tracking-[.18em] opacity-50">estetica · jesolo</span>
              </span>
            </Link>
            <p className="mt-5 mb-[1.7rem] max-w-[26rem] text-[.93rem] leading-[1.9] text-[rgba(255,255,255,.56)]">
              Il tuo atelier del benessere a Lido di Jesolo. Trattamenti su misura con cosmesi PNEI e trucco
              semipermanente certificato Biotek.
            </p>
            <div className="flex gap-[.6rem]">
              <a href={contatti.instagram} target="_blank" rel="noopener" aria-label="Instagram" className={socialLink}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" className={socialSvg}>
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="#fff" />
                </svg>
              </a>
              <a href={contatti.facebook} target="_blank" rel="noopener" aria-label="Facebook" className={socialLink}>
                <svg viewBox="0 0 24 24" fill="#fff" className={socialSvg}>
                  <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.6-1.5h1.3V4.9c-.3 0-1.1-.1-2-.1-2 0-3.4 1.2-3.4 3.5V11H8.5v3H11v7h2.5z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="foot-col">
            <h4 className={h4}>Esplora</h4>
            <ul className={`${listBase} gap-[.08rem]`}>
              {menu.map((m) => (
                <li key={m.to}>
                  <Link
                    to={m.to}
                    className={
                      `${listLink} relative w-fit after:absolute after:bottom-1 after:left-0 after:h-px after:w-full after:origin-left ` +
                      "after:scale-x-0 after:bg-current after:opacity-50 after:content-[''] after:[transition:scale_.35s_var(--ease)] hover:after:scale-x-100"
                    }
                  >
                    {m.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="foot-col">
            <h4 className={h4}>Dove siamo</h4>
            <ul className={`${listBase} gap-[.3rem]`}>
              <ContactItem
                href="https://maps.google.com/?q=Piazza+Nicolò+Tommaseo+2A+Jesolo"
                external
                icon={<Pin />}
              >
                Piazza Nicolò Tommaseo, 2A
                <br />
                30016 Lido di Jesolo (VE)
              </ContactItem>
              <ContactItem href={contatti.telHref} icon={<Phone />}>
                {contatti.telefono}
              </ContactItem>
              <ContactItem href={`mailto:${contatti.email}`} icon={<Mail />}>
                {contatti.email}
              </ContactItem>
            </ul>
          </div>

          <div className="foot-col min-[640px]:col-span-full min-[980px]:col-auto">
            <h4 className={h4}>Orari</h4>
            <ul className={`${listBase} gap-0`}>
              {orari.map((o, i) => {
                const ultimo = i === orari.length - 1;
                return (
                  <li
                    key={o.giorno}
                    className={
                      'flex justify-between gap-4 border-[rgba(255,255,255,.07)] py-[.45rem] text-[.88rem] text-[rgba(255,255,255,.56)] ' +
                      (ultimo ? 'border-b-0' : 'border-b')
                    }
                  >
                    <span>{o.label}</span>
                    <span
                      className={`[font-variant-numeric:tabular-nums] ${
                        ultimo ? 'text-[rgba(248,221,227,.45)]' : 'text-[rgba(255,255,255,.9)]'
                      }`}
                    >
                      {o.ore}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div
          className={
            "foot-bottom relative mt-[clamp(3rem,6vw,4.5rem)] flex flex-col gap-[.7rem] border-t border-[rgba(255,255,255,.09)] " +
            "pt-[1.6rem] pb-[1.8rem] text-[.75rem] tracking-[.03em] text-[rgba(255,255,255,.4)] " +
            "min-[700px]:flex-row min-[700px]:items-center min-[700px]:justify-between"
          }
        >
          <span>© 2026 Les Folies di Sandra Bensi · P.IVA 04019240276</span>
          <span>Privacy e cookie</span>
        </div>

        <div
          aria-hidden="true"
          className={
            "foot-giant mt-[clamp(1.5rem,3vw,2.5rem)] select-none text-center font-display text-[clamp(3.5rem,16vw,11rem)] leading-[.85] tracking-[-.03em] " +
            "text-transparent [transform:translateY(.1em)] " +
            "bg-[linear-gradient(100deg,rgba(248,221,227,.08)_20%,rgba(248,221,227,.26)_50%,rgba(248,221,227,.08)_80%)] bg-[length:200%_100%] bg-clip-text " +
            "[-webkit-text-fill-color:transparent] forced-colors:bg-none forced-colors:[-webkit-text-fill-color:currentColor] " +
            "anim:animate-wordmark-luce " +
            "anim:[&.reveal.is-visible]:[animation:reveal-in_.9s_var(--ease)_both,wordmark-luce_14s_ease-in-out_infinite] " +
            "anim:[&.reveal.is-visible]:[animation-delay:var(--reveal-delay,0ms),calc(var(--reveal-delay,0ms)_+_.9s)]"
          }
        >
          Les Folies
        </div>
      </div>
    </footer>
  );
}
