import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { contatti, menu } from '../data/site';

/* ------------------------------------------------------------------ *
 *  Navbar + menu mobile (Tailwind)
 *  Stato "scrolled": header a pillola con vetro sfocato dopo 40px.
 * ------------------------------------------------------------------ */

const ease = 'var(--ease)';
const entra = 'anim:animate-nav-entra';

const headerBase =
  "group/h fixed " +
  "[transition:inset_.55s_var(--ease),border-radius_.55s_var(--ease),background_.4s_ease,box-shadow_.4s_ease,padding_.4s_var(--ease),border-color_.4s_ease] " +
  "motion-reduce:transition-none print:hidden";
const headerTop =
  "inset-[0_0_auto_0] border-0 py-[1.15rem] bg-[linear-gradient(180deg,rgba(31,15,24,.5),rgba(31,15,24,0))]";
const headerScrolled =
  "inset-[.5rem_.5rem_auto_.5rem] min-[768px]:inset-[.7rem_.7rem_auto_.7rem] rounded-full border " +
  "border-[rgba(173,58,96,.14)] py-[.45rem] bg-[rgba(251,246,244,.86)] min-[768px]:bg-[rgba(251,246,244,.8)] " +
  "[backdrop-filter:blur(12px)_saturate(1.3)] min-[768px]:[backdrop-filter:blur(20px)_saturate(1.5)] " +
  "shadow-[inset_0_1px_0_rgba(255,255,255,.75),0_20px_45px_-26px_rgba(58,26,43,.55)]";

const navLinkBase =
  "relative py-[.55rem] text-[.93rem] font-normal tracking-[.035em] transition-colors duration-300 motion-reduce:transition-none " +
  "after:absolute after:inset-x-0 after:bottom-[.2rem] after:h-px after:origin-center after:scale-x-0 after:opacity-65 after:content-[''] " +
  "after:[transition:scale_.4s_var(--ease),opacity_.3s_ease] hover:after:scale-x-100 " +
  "aria-[current=page]:after:scale-x-100";
const navLinkTop =
  "text-[rgba(255,255,255,.74)] hover:text-white aria-[current=page]:text-white after:bg-current";
const navLinkScrolled =
  "text-text-tertiary hover:text-rose-600 aria-[current=page]:text-rose-600 " +
  "after:bg-[linear-gradient(90deg,transparent,var(--color-rose-500),transparent)]";

const contactBase =
  "inline-flex size-11 items-center justify-center gap-[.55rem] whitespace-nowrap rounded-full border text-[0px] text-white " +
  "[transition:background_.3s_ease,border-color_.3s_ease,transform_.3s_var(--ease),box-shadow_.3s_ease] motion-reduce:transition-none " +
  "active:[transform:scale(.94)] " +
  "min-[1100px]:h-auto min-[1100px]:w-auto min-[1100px]:px-[1.1rem] min-[1100px]:py-[.68rem] min-[1100px]:text-[.82rem] min-[1100px]:tracking-[.02em]";
const contactTop =
  "border-[rgba(255,255,255,.3)] bg-[rgba(255,255,255,.09)] [backdrop-filter:blur(10px)] " +
  "hover:border-[rgba(255,255,255,.72)] hover:bg-[rgba(255,255,255,.2)] hover:[transform:translateY(-1px)] " +
  "hover:shadow-[0_10px_22px_-14px_rgba(31,15,24,.7)]";
const contactScrolled =
  "border-transparent bg-[linear-gradient(140deg,var(--color-rose-500),var(--color-rose-700))] " +
  "shadow-[0_12px_24px_-14px_rgba(173,58,96,.8)] " +
  "hover:bg-[linear-gradient(140deg,var(--color-rose-600),var(--color-rose-800))] hover:[transform:translateY(-2px)]";

const burgerBase =
  "relative z-70 inline-flex size-[46px] cursor-pointer flex-col items-center justify-center gap-[5px] rounded-full border min-[768px]:hidden " +
  "[backdrop-filter:blur(8px)] [transition:background_.35s,transform_.25s_var(--ease),border-color_.35s,box-shadow_.35s] motion-reduce:transition-none " +
  "active:[transform:scale(.9)]";
const burgerOff = "border-[rgba(255,255,255,.45)] bg-[rgba(255,255,255,.12)]";
const burgerOn =
  "border-transparent bg-[linear-gradient(180deg,var(--color-rose-500),var(--color-rose-700))] shadow-pulsante";
const barBase =
  "block h-[1.5px] w-[19px] rounded-[2px] bg-white [transition:transform_.38s_var(--ease),opacity_.25s,background_.35s] motion-reduce:transition-none";

const mobileLinkBase =
  "group/m grid grid-cols-[minmax(0,1fr)] items-center gap-3 border-b border-rose-100 px-1 py-[.6rem] " +
  "min-h-[clamp(4.6rem,12vh,6.4rem)] font-display text-[clamp(2.25rem,10vw,4.3rem)] leading-[1.05] tracking-[-.01em] text-plum " +
  "[transition:opacity_.35s_ease,transform_.5s_var(--ease),color_.25s,padding_.25s] motion-reduce:transition-none " +
  "hover:px-2 hover:text-rose-600 focus-visible:px-2 focus-visible:text-rose-600 active:px-2 active:text-rose-600 " +
  "max-[380px]:min-h-[4.35rem] max-[380px]:gap-2 max-[380px]:text-[clamp(2rem,10vw,2.6rem)] " +
  "landscape-sm:min-h-[3.6rem] landscape-sm:text-[clamp(2rem,7vw,3rem)]";
const mobileSvgBase =
  "size-[1.7rem] justify-self-end fill-none stroke-current [stroke-width:1.45] [stroke-linecap:round] [stroke-linejoin:round] " +
  "[transition:opacity_.3s_ease,transform_.45s_var(--ease),color_.3s_ease] motion-reduce:transition-none " +
  "group-hover/m:text-rose-600 group-hover/m:opacity-100 group-hover/m:[transform:translateX(0)_scale(1.08)] " +
  "group-focus-visible/m:text-rose-600 group-focus-visible/m:opacity-100 group-focus-visible/m:[transform:translateX(0)_scale(1.08)]";

function Chevron({ open, current, index }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`${mobileSvgBase} ${
        current
          ? 'text-rose-600 opacity-100 [transform:translateX(0)_scale(1.08)]'
          : 'opacity-[.66] [transform:translateX(-.35rem)_scale(.88)]'
      }`}
      style={open ? { transitionDelay: `${0.14 + index * 0.06}s` } : undefined}
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const burgerRef = useRef(null);
  const menuRef = useRef(null);
  const firstLinkRef = useRef(null);
  const telRef = useRef(null);
  const { pathname } = useLocation();
  const skipFocus = useRef(true);

  // header "a pillola" dopo 40px di scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // il body non scorre a menu aperto + focus (come nello script originale)
  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    if (skipFocus.current) {
      skipFocus.current = false;
      return;
    }
    if (open) firstLinkRef.current?.focus({ preventScroll: true });
    else burgerRef.current?.focus({ preventScroll: true });
    return undefined;
  }, [open]);
  useEffect(() => () => document.body.classList.remove('menu-open'), []);

  // Esc chiude · oltre 768px il menu mobile si chiude da solo
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    const onResize = () => window.matchMedia('(min-width: 768px)').matches && setOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // cambio pagina → chiudi menu
  useEffect(() => setOpen(false), [pathname]);

  // focus trap dentro il pannello
  const onMenuKeyDown = (e) => {
    if (e.key !== 'Tab' || !open) return;
    const first = firstLinkRef.current;
    const last = telRef.current;
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last?.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first?.focus();
    }
  };

  const state = scrolled ? 'scrolled' : 'top';

  return (
    <>
      <header
        id="header"
        data-state={state}
        className={`${headerBase} ${scrolled ? headerScrolled : headerTop} ${open ? 'z-70' : 'z-50'}`}
      >
        <div className="contenitore flex min-h-12 max-w-6xl items-center justify-between gap-6">
          <Link
            to="/"
            aria-label="Les Folies, torna alla home"
            className={`group/brand flex flex-none items-center ${entra} anim:[animation-delay:.05s]`}
          >
            <img
              src="/images/logo/logo.png"
              alt="Les Folies"
              onError={(e) => (e.currentTarget.style.display = 'none')}
              className={
                "w-auto [transition:filter_.35s_ease,height_.35s_var(--ease),transform_.35s_var(--ease)] motion-reduce:transition-none " +
                "group-hover/brand:[transform:translateY(-1px)_scale(1.015)] " +
                (scrolled
                  ? 'h-10 [filter:none]'
                  : 'h-[42px] min-[768px]:h-12 [filter:brightness(0)_invert(1)_drop-shadow(0_4px_12px_rgba(31,15,24,.25))]')
              }
            />
          </Link>

          <nav className="hidden items-center gap-[clamp(1.3rem,2.6vw,2.4rem)] min-[768px]:flex">
            {menu.map((m, i) => (
              <NavLink
                key={m.to}
                to={m.to}
                end={m.to === '/'}
                className={`${navLinkBase} ${scrolled ? navLinkScrolled : navLinkTop} ${entra} ${
                  ['anim:[animation-delay:.12s]', 'anim:[animation-delay:.18s]', 'anim:[animation-delay:.24s]', 'anim:[animation-delay:.3s]'][i]
                }`}
              >
                {m.label}
              </NavLink>
            ))}
            <a
              href={contatti.telHref}
              aria-label={`Chiama Les Folies: ${contatti.telefono}`}
              className={`${contactBase} ${scrolled ? contactScrolled : contactTop} ${entra} anim:[animation-delay:.36s]`}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-4 flex-none [stroke-width:1.6]"
              >
                <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2z" />
              </svg>
              <span className="hidden min-[1100px]:inline">{contatti.telefono}</span>
            </a>
          </nav>

          <button
            ref={burgerRef}
            type="button"
            aria-label={open ? 'Chiudi il menu' : 'Apri il menu'}
            aria-expanded={open}
            aria-controls="mobileMenu"
            onClick={() => setOpen((o) => !o)}
            className={`${burgerBase} ${open || scrolled ? burgerOn : burgerOff} ${entra} anim:[animation-delay:.2s]`}
          >
            <span className={`${barBase} ${open ? '[transform:translateY(6.5px)_rotate(45deg)]' : ''}`} />
            <span className={`${barBase} ${open ? 'opacity-0 [transform:scaleX(0)]' : ''}`} />
            <span className={`${barBase} ${open ? '[transform:translateY(-6.5px)_rotate(-45deg)]' : ''}`} />
          </button>
        </div>
      </header>

      <div
        id="mobileMenu"
        ref={menuRef}
        aria-hidden={!open}
        onKeyDown={onMenuKeyDown}
        className={
          "fixed inset-0 z-60 motion-reduce:transition-none print:hidden " +
          (open
            ? 'visible opacity-100 [transition:opacity_.35s_ease]'
            : 'invisible opacity-0 [transition:opacity_.35s_ease,visibility_0s_linear_.35s]')
        }
      >
        <div
          className="absolute inset-0 bg-[linear-gradient(135deg,rgba(107,33,57,.6),rgba(31,15,24,.78))] [backdrop-filter:blur(8px)]"
          onClick={() => setOpen(false)}
        />
        <div
          role="dialog"
          aria-label="Menu di navigazione"
          className={
            "absolute inset-0 flex h-dvh min-h-[28rem] w-full flex-col overflow-y-auto " +
            "[background:radial-gradient(circle_at_85%_8%,rgba(208,124,151,.32)_0,transparent_50%),radial-gradient(circle_at_5%_95%,rgba(230,203,149,.22)_0,transparent_45%),var(--color-porcelain)] " +
            "[padding:max(6rem,calc(4.5rem_+_env(safe-area-inset-top,0px)))_max(1.8rem,calc(1.2rem_+_env(safe-area-inset-right,0px)))_max(2rem,calc(1.5rem_+_env(safe-area-inset-bottom,0px)))_max(1.8rem,calc(1.2rem_+_env(safe-area-inset-left,0px)))] " +
            "max-[380px]:pt-[max(5rem,calc(4rem_+_env(safe-area-inset-top,0px)))] " +
            "landscape-sm:pt-[max(4.75rem,calc(4rem_+_env(safe-area-inset-top,0px)))] " +
            "[transition:transform_.55s_var(--ease)] motion-reduce:transition-none " +
            (open ? '[transform:none]' : '[transform:translateY(-100%)]')
          }
        >
          <nav
            aria-label="Navigazione principale"
            className="mt-[1.2rem] flex flex-col max-[380px]:mt-2 "
          >
            {menu.map((m, i) => {
              const current = m.to === '/' ? pathname === '/' : pathname === m.to;
              return (
                <Link
                  key={m.to}
                  to={m.to}
                  ref={i === 0 ? firstLinkRef : undefined}
                  aria-current={current ? 'page' : undefined}
                  onClick={() => setOpen(false)}
                  className={`${mobileLinkBase} ${
                    open ? 'opacity-100 [transform:none]' : 'opacity-0 [transform:translateX(26px)]'
                  } ${current ? 'px-2 text-rose-600' : ''}`}
                  style={open ? { transitionDelay: `${0.09 + i * 0.06}s` } : undefined}
                >
                  <span>{m.label}</span>
                  <Chevron open={open} current={current} index={i} />
                </Link>
              );
            })}
          </nav>
          <div
            className={
              "mt-auto flex flex-col gap-[.35rem] pt-[1.8rem] text-[.92rem] text-text-tertiary " +
              "[transition:opacity_.4s_ease] motion-reduce:transition-none max-[380px]:text-[.82rem] landscape-sm:mt-6 " +
              (open ? 'opacity-100' : 'opacity-0')
            }
            style={open ? { transitionDelay: '.4s' } : undefined}
          >
            <a
              ref={telRef}
              href={contatti.telHref}
              className="text-[1.1rem] font-medium tracking-[.02em] text-rose-700"
            >
              {contatti.telefono}
            </a>
            <span className="max-[380px]:max-w-[29ch]">{contatti.indirizzoCorto}</span>
          </div>
        </div>
      </div>
    </>
  );
}
