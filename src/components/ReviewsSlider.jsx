import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Stars from './Stars';

/* Slider recensioni: stessa logica di script.js (passo = larghezza slide + gap,
   n° di slide visibili ricalcolato al resize, swipe da touch > 40px). */
export default function ReviewsSlider({ reviews }) {
  const trackRef = useRef(null);
  const [idx, setIdx] = useState(0);
  const idxRef = useRef(0);

  const metrics = useCallback(() => {
    const track = trackRef.current;
    const slides = [...track.children];
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    const step = slides[0].getBoundingClientRect().width + gap;
    const perView = Math.max(1, Math.floor((track.clientWidth + gap) / step + 0.001));
    return { step, max: Math.max(0, slides.length - perView) };
  }, []);

  const go = useCallback(
    (i) => {
      const { max } = metrics();
      const next = Math.min(Math.max(i, 0), max);
      idxRef.current = next;
      setIdx(next);
      // anche se l'indice non cambia (es. dopo un resize) si riallinea la traccia
      const { step } = metrics();
      trackRef.current.style.transform = `translate3d(${-next * step}px,0,0)`;
    },
    [metrics],
  );

  useLayoutEffect(() => {
    go(0);
  }, [go]);

  useEffect(() => {
    const onResize = () => go(idxRef.current);
    addEventListener('resize', onResize);
    return () => removeEventListener('resize', onResize);
  }, [go]);

  const startX = useRef(null);
  const onTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (startX.current === null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    if (Math.abs(dx) > 40) go(idxRef.current + (dx < 0 ? 1 : -1));
    startX.current = null;
  };

  return (
    <div className="reviews-slider" id="reviewsSlider">
      <div
        className="reviews-track"
        ref={trackRef}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {reviews.map((r, i) => (
          <figure className="review" key={i}>
            <Stars />
            <blockquote>{r.testo}</blockquote>
            <figcaption>
              {r.autore} · via <b>{r.fonte}</b>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="reviews-nav">
        <button className="rev-arrow" id="revPrev" aria-label="Recensione precedente" onClick={() => go(idx - 1)}>
          &larr;
        </button>
        <div className="reviews-dots" id="revDots" role="tablist" aria-label="Scegli recensione">
          {reviews.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-label={`Vai alla recensione ${i + 1}`}
              aria-selected={i === idx}
              className={i === idx ? 'active' : undefined}
              onClick={() => go(i)}
            />
          ))}
        </div>
        <button className="rev-arrow" id="revNext" aria-label="Recensione successiva" onClick={() => go(idx + 1)}>
          &rarr;
        </button>
      </div>
    </div>
  );
}
