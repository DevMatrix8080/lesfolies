/* Sezione "atelier": kicker + titolo + griglia di FeatureCard */
export default function FeaturesSection({ titleId, kicker, title, children }) {
  return (
    <section className="features features--atelier" aria-labelledby={titleId}>
      <div className="contenitore">
        <div className="features-intro">
          <div>
            <p className="features-kicker">
              <span></span> {kicker}
            </p>
            <h2 id={titleId}>{title}</h2>
          </div>
        </div>
        <div className="features-grid">{children}</div>
      </div>
    </section>
  );
}
