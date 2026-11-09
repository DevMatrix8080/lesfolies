import { Link } from 'react-router-dom';

/* Pulsante del sito (Tailwind). Varianti: primary · ghost · outline */
const base =
  "relative isolate inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 overflow-hidden " +
  "rounded-full border px-8 py-[.95rem] font-text text-[.98rem] font-medium tracking-[.02em] " +
  "[transition:transform_.35s_var(--ease),background_.3s,box-shadow_.35s_var(--ease),border-color_.3s,color_.3s] " +
  "motion-reduce:transition-none active:[transform:scale(.96)] " +
  // riflesso luminoso
  "after:absolute after:inset-0 after:-z-1 after:content-[''] " +
  "after:bg-[linear-gradient(105deg,transparent_30%,rgba(255,255,255,.38)_50%,transparent_70%)] " +
  "after:[transform:translateX(-120%)] after:[transition:transform_.75s_var(--ease)] " +
  "motion-reduce:after:transition-none hover:after:[transform:translateX(120%)]";

const varianti = {
  primary:
    "border-transparent bg-[linear-gradient(180deg,var(--color-rose-500),var(--color-rose-700))] text-white shadow-pulsante " +
    "hover:[transform:translateY(-3px)] hover:shadow-[0_2px_4px_rgba(107,33,57,.25),0_22px_34px_-14px_rgba(173,58,96,.75)]",
  ghost:
    "border-[rgba(255,255,255,.5)] bg-[rgba(255,255,255,.12)] text-white backdrop-blur-[8px] " +
    "hover:border-[rgba(255,255,255,.85)] hover:bg-[rgba(255,255,255,.24)] hover:[transform:translateY(-3px)]",
  outline:
    "border-rose-300 bg-[rgba(255,255,255,.5)] text-rose-700 " +
    "hover:border-rose-600 hover:bg-rose-600 hover:text-white hover:shadow-pulsante hover:[transform:translateY(-3px)]",
};

/* `to` → link interno (router) · `href` → link esterno / tel: / mailto: */
export default function Button({ variant = 'primary', className = '', external = false, to, children, ...props }) {
  const extra = external ? { target: '_blank', rel: 'noopener' } : {};
  const classe = `${base} ${varianti[variant]} ${className}`;
  if (to) {
    return (
      <Link to={to} className={classe} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <a className={classe} {...extra} {...props}>
      {children}
    </a>
  );
}
