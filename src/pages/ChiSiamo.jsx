import PageMeta from '../components/PageMeta';
import PageHero from '../components/PageHero';
import AboutPhoto from '../components/AboutPhoto';
import FeaturesSection from '../components/FeaturesSection';
import FeatureCard from '../components/FeatureCard';
import SectionHead from '../components/SectionHead';

const svgProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: '2',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

const credenze = [
  {
    num: '01',
    title: 'Prima la persona',
    text: 'Ogni percorso comincia con una consulenza: capire la pelle e le abitudini di chi abbiamo davanti conta più del trattamento a listino.',
    icon: (
      <svg {...svgProps}>
        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Formule pulite',
    text: 'Cosmesi PNEI senza parabeni né petrolati, con ingredienti di origine naturale affini alla pelle.',
    icon: (
      <svg {...svgProps}>
        <path d="M12 2.7s6 6.2 6 10.8a6 6 0 0 1-12 0C6 8.9 12 2.7 12 2.7z" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Materiali certificati',
    text: 'Per il trucco semipermanente usiamo coloranti Biotek, con protocolli di igiene e monouso rigorosi.',
    icon: (
      <svg {...svgProps}>
        <path d="M12 22c5-2 8-6 8-11V5l-8-3-8 3v6c0 5 3 9 8 11z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Tecnologia aggiornata',
    text: 'Apparecchiature di ultima generazione per epilazione laser, pressoterapia e trattamenti viso.',
    icon: (
      <svg {...svgProps}>
        <rect x="5" y="5" width="14" height="14" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
      </svg>
    ),
  },
];

const team = [
  {
    sigla: 'SB',
    nome: 'Sandra Bensi',
    ruolo: 'titolare',
    testo:
      'Titolare di Les Folies, nel settore estetico dal 2016. Specializzata in trucco semipermanente con coloranti certificati Biotek e in trattamenti viso e corpo personalizzati con cosmesi PNEI.',
  },
  {
    sigla: 'C',
    nome: 'Collaboratrice',
    ruolo: 'collaboratrice',
    testo: 'Profilo da completare con nome, foto e specializzazioni.',
  },
];

export default function ChiSiamo() {
  return (
    <>
      <PageMeta
        title="Chi siamo · Les Folies Jesolo"
        description="Les Folies è il centro estetico di Sandra Bensi a Lido di Jesolo: dal 2016 trattamenti su misura con cosmesi PNEI e trucco semipermanente certificato Biotek."
      />

      <PageHero
        title={
          <>
            Un piccolo centro estetico,
            <br />
            <em>molta cura</em>
          </>
        }
        lead="Les Folies si trova in Piazza Nicolò Tommaseo, a due passi dal lungomare di Lido di Jesolo. È lo spazio di Sandra Bensi, che nell'estetica lavora dal 2016 e ha voluto un salone raccolto, dove ci si sente ospiti e non clienti in fila."
      />

      <section>
        <div className="contenitore about-grid">
          <AboutPhoto />
          <div className="about-copy">
            <h2 className="titolo-sezione">
              Come <em>lavoriamo</em>
            </h2>
            <p>
              Non esistono protocolli uguali per tutte. Prima di ogni trattamento viso o corpo dedichiamo tempo
              all'analisi della pelle e a capire cosa serve davvero: a volte è un percorso, a volte basta un gesto.
            </p>
            <p>
              Sul trucco semipermanente lavoriamo con la stessa logica. Si studia la forma insieme, si sceglie il
              pigmento in base all'incarnato e si mette in conto il ritocco di controllo: un semipermanente riuscito
              è quello che non si nota.
            </p>
            <p>
              Le apparecchiature, dal laser alla pressoterapia LinfoDerm, sono uno strumento e non il centro del
              discorso. Il risultato dipende da come vengono usate.
            </p>
          </div>
        </div>
      </section>

      <FeaturesSection
        titleId="credenze-title"
        kicker="IN COSA CREDIAMO"
        title={
          <>
            Quattro cose <em>non negoziabili</em>
          </>
        }
      >
        {credenze.map((c) => (
          <FeatureCard key={c.num} num={c.num} icon={c.icon} title={c.title}>
            {c.text}
          </FeatureCard>
        ))}
      </FeaturesSection>

      <section className="team">
        <div className="contenitore">
          <SectionHead
            occhiello="Il team"
            title={
              <>
                Chi ti <em>accoglie</em>
              </>
            }
          />
          <div className="team-grid">
            {team.map((m) => (
              <article className="team-card" key={m.sigla}>
                <div className="avatar" aria-hidden="true">
                  {m.sigla}
                </div>
                <div>
                  <h3>{m.nome}</h3>
                  <p className="ruolo">{m.ruolo}</p>
                  <p>{m.testo}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
