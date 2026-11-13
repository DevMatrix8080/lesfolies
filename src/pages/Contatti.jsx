import { useMemo } from 'react';
import PageMeta from '../components/PageMeta';
import PageHero from '../components/PageHero';
import Button from '../components/Button';
import { contatti, orari } from '../data/site';

const svgProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: '2',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

const vie = [
  {
    href: contatti.telHref,
    label: 'Telefono',
    valore: contatti.telefono,
    testo: 'Se siamo con una cliente, richiamiamo appena possibile.',
    icon: (
      <svg {...svgProps}>
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2z" />
      </svg>
    ),
  },
  {
    href: contatti.whatsappMsg,
    external: true,
    label: 'WhatsApp',
    valore: 'Scrivici un messaggio',
    testo: 'Il modo più rapido per una domanda veloce.',
    icon: (
      <svg {...svgProps}>
        <path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l1.9-5.4A8.4 8.4 0 1 1 21 11.5z" />
      </svg>
    ),
  },
  {
    href: `mailto:${contatti.email}`,
    label: 'Email',
    valore: contatti.email,
    testo: 'Per preventivi e informazioni dettagliate.',
    icon: (
      <svg {...svgProps}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    ),
  },
];

const MAPS_LINK =
  'https://maps.google.com/?q=Piazza+Nicol%C3%B2+Tommaseo+2A+30016+Lido+di+Jesolo+VE';
const MAPS_EMBED =
  'https://maps.google.com/maps?q=Piazza%20Nicol%C3%B2%20Tommaseo%2C%202A%2C%2030016%20Lido%20di%20Jesolo%20VE&output=embed';

/* Giorno corrente (fuso di Roma), 0 = domenica … 6 = sabato */
function giornoOggi() {
  const sigla = new Intl.DateTimeFormat('en-US', { weekday: 'short', timeZone: 'Europe/Rome' }).format(new Date());
  return { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[sigla];
}

export default function Contatti() {
  const oggi = useMemo(giornoOggi, []);

  return (
    <>
      <PageMeta
        title="Contatti · Les Folies Jesolo"
        description="Les Folies, Piazza Nicolò Tommaseo 2A, Lido di Jesolo (VE). Telefono, WhatsApp, orari di apertura e indicazioni per raggiungerci."
      />

      <PageHero
        title={
          <>
            Dove ci <em>trovi</em>
          </>
        }
        lead="Siamo in Piazza Nicolò Tommaseo, a Lido di Jesolo. Si lavora su appuntamento: scrivici, chiamaci o prenota direttamente online."
      />

      <section className="features vie">
        <div className="contenitore">
          <div className="vie-grid">
            {vie.map((v) => (
              <a
                className="contact-card"
                key={v.label}
                href={v.href}
                {...(v.external ? { target: '_blank', rel: 'noopener' } : {})}
              >
                <div className="feature-icon">{v.icon}</div>
                <span className="contact-label">{v.label}</span>
                <strong className="contact-valore">{v.valore}</strong>
                <p>{v.testo}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="info-sezione">
        <div className="contenitore info-grid">
          <div className="info-col">
            <div className="info-card">
              <h2>Indirizzo</h2>
              <address>
                Piazza Nicolò Tommaseo, 2A
                <br />
                30016 Lido di Jesolo (VE)
              </address>
              <Button variant="primary" href={MAPS_LINK} external>
                Apri in Google Maps
              </Button>
            </div>
            <div className="info-card">
              <h2>Orari</h2>
              <ul className="orari-lista">
                {orari.map((o) => (
                  <li key={o.giorno} data-giorno={o.giorno} className={[o.giorno === oggi && 'oggi', o.ore === 'Chiuso' && 'chiuso'].filter(Boolean).join(' ') || undefined}>
                    <span>{o.label}</span>
                    <span>{o.ore}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="social-pills">
              <Button variant="outline" href={contatti.instagram} external>
                Instagram
              </Button>
              <Button variant="outline" href={contatti.facebook} external>
                Facebook
              </Button>
            </div>
          </div>
          <div className="mappa">
            <iframe
              src={MAPS_EMBED}
              title="Mappa: Les Folies, Piazza Nicolò Tommaseo 2A, Lido di Jesolo"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
}
