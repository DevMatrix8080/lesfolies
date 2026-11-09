/* Testata delle pagine interne */
export default function PageHero({ title, lead }) {
  return (
    <section className="hero hero-pagina">
      <div className="contenitore hero-inner">
        <h1>{title}</h1>
        <p className="lead">{lead}</p>
      </div>
    </section>
  );
}
