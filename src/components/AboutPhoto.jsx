/* Segnaposto fotografico del centro (con badge anno opzionale) */
export default function AboutPhoto({ badge }) {
  return (
    <div
      className="about-photo about-photo-placeholder"
      role="img"
      aria-label="Spazio per la fotografia del centro estetico"
    >
      <div className="placeholder-mark" aria-hidden="true">
        <svg viewBox="0 0 48 48" fill="none">
          <rect x="5" y="8" width="38" height="32" rx="5" />
          <circle cx="18" cy="20" r="4" />
          <path d="m8 35 11-10 7 6 5-5 9 10" />
        </svg>
      </div>
      <span>Uno spazio per la vostra storia</span>
      <i>LES FOLIES · JESOLO</i>
      {badge && (
        <div className="about-exp">
          <b>{badge.anno}</b>
          <span>{badge.testo}</span>
        </div>
      )}
    </div>
  );
}
