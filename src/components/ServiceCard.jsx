import FallbackImg from './FallbackImg';

/* Card trattamento della home */
export default function ServiceCard({ img, alt, fallback, durata, title, children, prezzo, da }) {
  return (
    <article className="card">
      <div className="card-img">
        <FallbackImg src={img} alt={alt} fallback={fallback} />
        <span className="time-badge">{durata}</span>
      </div>
      <div className="card-body">
        <h3>{title}</h3>
        <p>{children}</p>
        <div className="card-foot">
          <span className="price">
            {da && <small>da</small>}
            {da ? ' ' : ''}
            {prezzo}
          </span>
        </div>
      </div>
    </article>
  );
}
