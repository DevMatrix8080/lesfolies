/* Card "atelier" numerata con icona */
export default function FeatureCard({ num, icon, title, children }) {
  return (
    <article className="feature-card">
      <span className="feature-num" aria-hidden="true">
        {num}
      </span>
      <div className="feature-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{children}</p>
    </article>
  );
}
