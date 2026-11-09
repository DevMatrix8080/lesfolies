import PageMeta from '../components/PageMeta';
import Button from '../components/Button';
import Stars from '../components/Stars';
import FeaturesSection from '../components/FeaturesSection';
import FeatureCard from '../components/FeatureCard';
import SectionHead from '../components/SectionHead';
import ServiceCard from '../components/ServiceCard';
import AboutPhoto from '../components/AboutPhoto';
import ReviewsSlider from '../components/ReviewsSlider';
import { contatti } from '../data/site';

const svgProps = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' };

const atelier = [
  {
    num: '01',
    title: 'Dal 1995',
    text: "Sandra lavora nell'estetica dal 1995 e ha voluto un salone raccolto, dove ci si sente ospiti.",
    icon: (
      <svg {...svgProps}>
        <circle cx="12" cy="8" r="6" />
        <path d="M8.5 13.5 7 22l5-3 5 3-1.5-8.5" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Cosmesi PNEI',
    text: 'Senza parabeni né petrolati, con ingredienti di origine naturale affini alla pelle.',
    icon: (
      <svg {...svgProps}>
        <path d="M12 22c5-2 8-6 8-11V5l-8-3-8 3v6c0 5 3 9 8 11z" />
        <path d="M12 8v6M9 11h6" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Colori Biotek',
    text: 'Coloranti certificati per il trucco semipermanente, con protocolli di igiene e monouso rigorosi.',
    icon: (
      <svg {...svgProps}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Prenoti in un minuto',
    text: 'Prenota online quando vuoi, anche a salone chiuso. Ti bastano un minuto e un numero di telefono.',
    icon: (
      <svg {...svgProps}>
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    ),
  },
];

const U = (id, w = 800) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const trattamenti = [
  {
    img: '/images/pulizia-viso-idratante-e-detossinante.jpg',
    fallback: U('photo-1570172619644-dfd03ed5d881'),
    alt: 'Pulizia viso idratante e detossinante',
    durata: '1h',
    title: 'Pulizia viso idratante e detossinante',
    text: 'Consulenza e analisi della pelle, latte detergente, esfoliazione, estrazione delle impurità e crema idratante nutriente. Una pelle rigenerata, sana e luminosa.',
    prezzo: '50 €',
  },
  {
    img: '/images/trattamento-viso-personalizzato-PNEI.jpg',
    fallback: U('photo-1570172619644-dfd03ed5d881'),
    alt: 'Trattamento viso personalizzato PNEI',
    durata: '1h',
    title: 'Trattamento viso personalizzato PNEI',
    text: 'Protocollo costruito sulla tua pelle con la neurocosmesi PNEI: peptidi, fosfolipidi e aloina agiscono in sinergia con sistema nervoso, endocrino e immunitario.',
    prezzo: '55 €',
  },
  {
    img: '/images/pressoterapia-rimodellante-LinfoDerm.jpg',
    fallback: U('photo-1519823551278-64ac92734fb1'),
    alt: 'Pressoterapia rimodellante LinfoDerm',
    durata: '30 min',
    title: 'Pressoterapia rimodellante LinfoDerm',
    text: 'Gambali gonfiabili a pressioni differenziate agiscono sulla circolazione venosa e linfatica: effetto rimodellante, tonificante e drenante sui liquidi in eccesso.',
    prezzo: '40 €',
  },
  {
    img: U('photo-1604654894610-df63bc536371'),
    alt: 'Ricostruzione unghie in gel',
    durata: '1h 30min',
    title: 'Ricostruzione unghie in gel',
    text: 'Ricostruzione su misura con gel di qualità professionale: forma, lunghezza e finitura scelte insieme a te.',
    prezzo: '45 €',
    da: true,
  },
  {
    img: '/images/semipermanente-sopracciglia.jpg',
    fallback: U('photo-1512496015851-a90fb38ba796'),
    alt: 'Semipermanente sopracciglia',
    durata: '2h',
    title: 'Semipermanente sopracciglia',
    text: 'Dermopigmentazione a pelo o effetto sfumato con coloranti certificati Biotek. Include consulenza sulla forma e ritocco di controllo.',
    prezzo: '250 €',
    da: true,
  },
  {
    img: U('photo-1700760933574-9f0f4ea9aa3b'),
    alt: 'Trattamento di epilazione laser su una gamba',
    durata: '45 min',
    title: 'Laser',
    text: 'Valutazione di fototipo, zona e numero di sedute necessarie, con apparecchiature di ultima generazione. Consulenza gratuita e senza impegno.',
    prezzo: '80 €',
    da: true,
  },
];

const pnei = [
  ['Complex PNEI', 'Peptidi, fosfolipidi e aloina in sinergia'],
  ['Senza parabeni', 'Né petrolati: formule pulite'],
  ['Affinità cutanea', 'Ingredienti di origine naturale'],
  ['Biotek', 'Pigmenti certificati per il semipermanente'],
];

const recensioni = [
  {
    testo:
      '“Accoglienza squisita e grande professionalità. Durante il trattamento ho ricevuto anche un massaggio alle mani in omaggio, un pensiero che si è fatto notare.”',
    autore: 'Cliente Espevia',
    fonte: 'Espevia',
  },
  {
    testo:
      '“Servizio impeccabile e grande disponibilità. Sono uscita rilassata e con la pelle davvero rigenerata.”',
    autore: 'Cliente Espevia',
    fonte: 'Espevia',
  },
  {
    testo:
      '“Sopracciglia perfette, forma studiata sul mio viso e risultato naturalissimo. Non potevo chiedere di meglio.”',
    autore: 'Cliente verificata',
    fonte: 'Google',
  },
  {
    testo:
      '“Ambiente curato e rilassante, Sandra mette subito a proprio agio. La pulizia viso ha trasformato la mia pelle.”',
    autore: 'Cliente verificata',
    fonte: 'Google',
  },
  {
    testo:
      '“Unghie impeccabili anche dopo settimane. Precisione e gusto nei dettagli, tornerò sicuramente.”',
    autore: 'Cliente verificata',
    fonte: 'Google',
  },
];

export default function Home() {
  return (
    <>
      <PageMeta
        title="Les Folies · Centro estetico a Lido di Jesolo"
        description="Centro estetico a Lido di Jesolo: trucco semipermanente certificato Biotek, ricostruzione unghie in gel, trattamenti viso e corpo con cosmesi PNEI. Prenota online."
      />

      {/* HERO */}
      <section className="hero">
        <img
          className="hero-bg"
          fetchPriority="high"
          decoding="async"
          src="https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&w=2000&q=80"
          alt="Dettaglio di un trattamento estetico da Les Folies"
        />
        <div className="hero-veil"></div>
        <div className="contenitore hero-inner">
          <h1>
            Il tuo atelier
            <br />
            del <em>benessere</em>
          </h1>
          <p className="lead">
            Trucco semipermanente, ricostruzione unghie e trattamenti viso e corpo su misura, in Piazza Nicolò
            Tommaseo. Ogni percorso nasce da una consulenza, mai da un listino.
          </p>
          <div className="hero-cta">
            <Button variant="ghost" href={contatti.whatsapp} external className="max-[767px]:self-start">
              ✉ Scrivici su WhatsApp
            </Button>
          </div>
          <div className="hero-rating">
            <Stars hidden />
            <span>
              <b>5,0</b> · le clienti parlano di accoglienza e professionalità
            </span>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <FeaturesSection
        titleId="atelier-title"
        kicker="LES FOLIES · LIDO DI JESOLO"
        title={
          <>
            La bellezza, <em>fatta con cura.</em>
          </>
        }
      >
        {atelier.map((f) => (
          <FeatureCard key={f.num} num={f.num} icon={f.icon} title={f.title}>
            {f.text}
          </FeatureCard>
        ))}
      </FeaturesSection>

      {/* TRATTAMENTI */}
      <section className="trattamenti" id="servizi">
        <div className="contenitore">
          <SectionHead
            occhiello="I nostri trattamenti"
            title={
              <>
                Scelti insieme, <em>su di te</em>
              </>
            }
            sottotitolo="Dalla ricostruzione unghie al trucco semipermanente, dai rituali corpo alla cura del viso: ogni trattamento parte da una consulenza per capire di cosa ha davvero bisogno la tua pelle."
          />
          <div className="cards-grid">
            {trattamenti.map((t) => (
              <ServiceCard
                key={t.title}
                img={t.img}
                alt={t.alt}
                fallback={t.fallback}
                durata={t.durata}
                title={t.title}
                prezzo={t.prezzo}
                da={t.da}
              >
                {t.text}
              </ServiceCard>
            ))}
          </div>
          <div className="center-cta">
            <Button variant="outline" to="/servizi">
              Tutti i servizi e i prezzi
            </Button>
          </div>
        </div>
      </section>

      {/* CHI SIAMO */}
      <section id="chi-siamo">
        <div className="contenitore about-grid">
          <AboutPhoto badge={{ anno: '1995', testo: 'nel settore estetico' }} />
          <div className="about-copy">
            <p className="occhiello">Chi siamo</p>
            <h2 className="titolo-sezione">
              Sandra <em>Bensi</em>
            </h2>
            <p>
              Les Folies è un piccolo centro estetico a Lido di Jesolo, nato attorno a un'idea semplice: il benessere
              di chi entra viene prima del trattamento che ha prenotato.
            </p>
            <p>
              Sandra lavora nell'estetica dal 1995 e ha costruito il salone scegliendo apparecchiature di ultima
              generazione e cosmetici che rispettano la pelle. Nessun protocollo uguale per tutte: si parte sempre da
              una consulenza.
            </p>
            <div>
              <Button variant="primary" to="/chi-siamo">
                La nostra storia
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* PNEI */}
      <section className="pnei">
        <div className="contenitore pnei-grid">
          <div>
            <p className="occhiello">I prodotti che scegliamo</p>
            <h2>
              Cosmesi <em>PNEI</em>
            </h2>
            <p>
              PNEI sta per psiconeuroendocrinoimmunologia: la scienza che studia il legame fra psiche, sistema
              nervoso, endocrino e immunitario. Sono neurocosmetici che agiscono sull'inestetismo e, insieme, sul
              modo in cui ci si sente.
            </p>
            <p>
              Formulati con ingredienti di origine naturale affini alla pelle, senza parabeni e senza petrolati. Per
              il trucco semipermanente usiamo invece coloranti certificati Biotek.
            </p>
            <div className="pnei-list">
              {pnei.map(([t, d]) => (
                <div className="pnei-item" key={t}>
                  <b>{t}</b>
                  <span>{d}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="pnei-photo">
            <img
              loading="lazy"
              decoding="async"
              src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80"
              alt="Rituale viso con cosmesi PNEI"
            />
          </div>
        </div>
      </section>

      {/* RECENSIONI */}
      <section>
        <div className="contenitore">
          <SectionHead
            occhiello="Dicono di noi"
            title={
              <>
                Le parole delle <em>clienti</em>
              </>
            }
          />
          <ReviewsSlider reviews={recensioni} />
          <div className="center-cta">
            <span className="google-badge">★ 5,0 su Google · accoglienza e professionalità</span>
          </div>
        </div>
      </section>
    </>
  );
}
