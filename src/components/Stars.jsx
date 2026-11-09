const STAR = '12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2';

/* Cinque stelline (stile in styles.css → .stars) */
export default function Stars({ hidden = false }) {
  return (
    <span className="stars" aria-hidden={hidden ? 'true' : undefined}>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 24 24">
          <polygon points={STAR} />
        </svg>
      ))}
    </span>
  );
}
