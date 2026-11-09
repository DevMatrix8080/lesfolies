import { contatti } from '../data/site';

/* Pulsante WhatsApp fisso in basso a destra (Tailwind) */
export default function WhatsAppFloat() {
  return (
    <a
      href={contatti.whatsapp}
      target="_blank"
      rel="noopener"
      aria-label="WhatsApp"
      className={
        "fixed z-50 flex size-[3.6rem] items-center justify-center rounded-full " +
        "right-[calc(1.2rem_+_env(safe-area-inset-right,0px))] bottom-[calc(1.2rem_+_env(safe-area-inset-bottom,0px))] " +
        "bg-[linear-gradient(145deg,#34E27A,#128C4A)] " +
        "shadow-[inset_0_0_0_1px_rgba(255,255,255,.2),0_0_0_5px_rgba(251,246,244,.55),0_16px_30px_-10px_rgba(18,140,74,.6)] " +
        "[transition:transform_.35s_var(--ease)] motion-reduce:transition-none " +
        "hover:[transform:scale(1.08)_rotate(-6deg)] active:[transform:scale(.92)] " +
        "max-[380px]:right-[calc(.8rem_+_env(safe-area-inset-right,0px))] max-[380px]:bottom-[calc(.8rem_+_env(safe-area-inset-bottom,0px))] max-[380px]:size-[3.15rem] " +
        "print:hidden " +
        // anello pulsante
        "before:absolute before:-inset-[5px] before:rounded-[inherit] before:[border:1px_solid_rgba(43,219,114,.45)] before:content-[''] " +
        "anim:before:animate-impulso-wa"
      }
    >
      <svg viewBox="0 0 24 24" className="size-[26px] fill-white">
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.4-.7-2.9-1.2-4.7-4.1-4.9-4.3-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5s.8 1.9.8 2c.1.1.1.3 0 .5-.3.6-.6.8-.4 1.1.7 1.2 1.6 2 2.8 2.6.3.2.5.1.7-.1l.8-1c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.6.4 0 .1 0 .7-.4 1.4z" />
      </svg>
    </a>
  );
}
